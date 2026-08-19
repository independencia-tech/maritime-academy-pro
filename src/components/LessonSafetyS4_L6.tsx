import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - FIREFIGHTER PPE (EACH ELEMENT AGAINST A PRECISE RISK)
function FirefighterPPESVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🧥", label:{fr:"Combinaison résistante à la chaleur",en:"Heat-resistant suit",es:"Traje resistente al calor",pt:"Fato resistente ao calor"}, desc:{fr:"Protège contre le contact direct avec la chaleur et les flammes. Sans elle, une exposition de quelques secondes suffit à causer des brûlures graves.",en:"Protects against direct contact with heat and flames. Without it, a few seconds of exposure is enough to cause serious burns.",es:"Protege contra el contacto directo con el calor y las llamas. Sin ella, unos segundos de exposición bastan para causar quemaduras graves.",pt:"Protege contra o contacto direto com o calor e as chamas. Sem ela, alguns segundos de exposição bastam para causar queimaduras graves."} },
    { id:2, icon:"🥾", label:{fr:"Bottes",en:"Boots",es:"Botas",pt:"Botas"}, desc:{fr:"Protègent contre les surfaces chaudes au sol, les objets tranchants et l'eau accumulée, souvent négligées mais essentielles.",en:"Protect against hot surfaces underfoot, sharp objects, and accumulated water, often overlooked but essential.",es:"Protegen contra superficies calientes en el suelo, objetos afilados y agua acumulada, a menudo pasadas por alto pero esenciales.",pt:"Protegem contra superfícies quentes no chão, objetos afiados e água acumulada, muitas vezes negligenciadas mas essenciais."} },
    { id:3, icon:"🧤", label:{fr:"Gants",en:"Gloves",es:"Guantes",pt:"Luvas"}, desc:{fr:"Protègent les mains d'un contact direct avec des surfaces chaudes, tout en conservant la dextérité nécessaire pour manipuler le matériel.",en:"Protect hands from direct contact with hot surfaces, while keeping the dexterity needed to handle equipment.",es:"Protegen las manos del contacto directo con superficies calientes, manteniendo la destreza necesaria para manejar el material.",pt:"Protegem as mãos do contacto direto com superfícies quentes, mantendo a destreza necessária para manusear o material."} },
    { id:4, icon:"⛑️", label:{fr:"Casque et cagoule",en:"Helmet and hood",es:"Casco y capucha",pt:"Capacete e capuz"}, desc:{fr:"Le casque protège contre les chutes d'objets, la cagoule protège les zones du visage et du cou non couvertes par le masque de l'ARI.",en:"The helmet protects against falling objects, the hood protects the areas of face and neck not covered by the BA mask.",es:"El casco protege contra la caída de objetos, la capucha protege las zonas de la cara y el cuello no cubiertas por la máscara del ARI.",pt:"O capacete protege contra a queda de objetos, o capuz protege as zonas da face e do pescoço não cobertas pela máscara do ARI."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Chaque élément protège contre un risque précis, ce n'est jamais un simple uniforme.":lang==="en"?"Each element protects against a precise risk, it is never just a uniform.":lang==="es"?"Cada elemento protege contra un riesgo preciso, nunca es solo un uniforme.":"Cada elemento protege contra um risco preciso, nunca é apenas um uniforme."}</div>
    </div>
  );
}

// SVG 2 - SCBA READINESS
function ScbaReadinessSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"👥", label:{fr:"Buddy check",en:"Buddy check",es:"Buddy check",pt:"Buddy check"}, desc:{fr:"Chaque membre du binôme vérifie l'équipement de l'autre avant l'entrée. Un ARI mal ajusté peut échouer au pire moment.",en:"Each member of the pair checks the other's equipment before entry. A poorly fitted BA can fail at the worst moment.",es:"Cada miembro del binomio comprueba el equipo del otro antes de entrar. Un ARI mal ajustado puede fallar en el peor momento.",pt:"Cada membro do binómio verifica o equipamento do outro antes de entrar. Um ARI mal ajustado pode falhar no pior momento."} },
    { id:2, icon:"🎭", label:{fr:"Étanchéité du masque",en:"Mask seal",es:"Estanqueidad de la máscara",pt:"Vedação da máscara"}, desc:{fr:"Un test d'étanchéité confirme qu'aucun air extérieur contaminé ne peut pénétrer dans le masque.",en:"A seal test confirms that no contaminated outside air can enter the mask.",es:"Una prueba de estanqueidad confirma que ningún aire exterior contaminado puede entrar en la máscara.",pt:"Um teste de vedação confirma que nenhum ar exterior contaminado pode entrar na máscara."} },
    { id:3, icon:"📊", label:{fr:"Pression de la bouteille",en:"Cylinder pressure",es:"Presión de la botella",pt:"Pressão do cilindro"}, desc:{fr:"Vérifier que la pression est complète avant l'entrée : une bouteille partiellement chargée réduit dangereusement l'autonomie réelle.",en:"Check that the pressure is full before entry: a partially charged cylinder dangerously reduces the actual duration.",es:"Comprobar que la presión está completa antes de entrar: una botella parcialmente cargada reduce peligrosamente la autonomía real.",pt:"Verificar que a pressão está completa antes de entrar: um cilindro parcialmente carregado reduz perigosamente a autonomia real."} },
    { id:4, icon:"✅", label:{fr:"Contrôle final avant entrée",en:"Final check before entry",es:"Control final antes de entrar",pt:"Controlo final antes de entrar"}, desc:{fr:"Un dernier contrôle croisé, juste avant de franchir le seuil : alarme fonctionnelle, sangles ajustées, communication établie.",en:"One last cross-check, right before crossing the threshold: functional alarm, adjusted straps, communication established.",es:"Un último control cruzado, justo antes de cruzar el umbral: alarma funcional, correas ajustadas, comunicación establecida.",pt:"Um último controlo cruzado, mesmo antes de atravessar o limiar: alarme funcional, correias ajustadas, comunicação estabelecida."} },
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

// SVG 3 - ENTRY TEAM DISCIPLINE
function EntryTeamSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🚫", label:{fr:"Jamais entrer seul",en:"Never enter alone",es:"Nunca entrar solo",pt:"Nunca entrar sozinho"}, desc:{fr:"L'entrée en binôme minimum n'est jamais négociable, quelle que soit l'urgence apparente de la situation.",en:"Entering as a minimum pair is never negotiable, whatever the apparent urgency of the situation.",es:"Entrar como mínimo en pareja nunca es negociable, sea cual sea la urgencia aparente de la situación.",pt:"Entrar no mínimo em dupla nunca é negociável, seja qual for a urgência aparente da situação."} },
    { id:2, icon:"📻", label:{fr:"Communication constante",en:"Constant communication",es:"Comunicación constante",pt:"Comunicação constante"}, desc:{fr:"Un contact permanent avec l'extérieur permet de suivre la progression et de réagir immédiatement en cas de problème.",en:"Constant contact with the outside allows progress to be tracked and immediate reaction if a problem arises.",es:"Un contacto permanente con el exterior permite seguir el progreso y reaccionar de inmediato ante un problema.",pt:"Um contacto permanente com o exterior permite acompanhar o progresso e reagir de imediato perante um problema."} },
    { id:3, icon:"🧭", label:{fr:"Orientation",en:"Orientation",es:"Orientación",pt:"Orientação"}, desc:{fr:"Garder une conscience constante du chemin parcouru et de la direction de sortie, même en visibilité nulle.",en:"Maintaining constant awareness of the path taken and the exit direction, even in zero visibility.",es:"Mantener una conciencia constante del camino recorrido y de la dirección de salida, incluso con visibilidad nula.",pt:"Manter uma consciência constante do caminho percorrido e da direção de saída, mesmo com visibilidade nula."} },
    { id:4, icon:"📋", label:{fr:"Registre d'entrée",en:"Entry log",es:"Registro de entrada",pt:"Registo de entrada"}, desc:{fr:"Nom, heure d'entrée, pression d'air au départ : ce registre tenu à l'extérieur permet de savoir en permanence qui est à l'intérieur.",en:"Name, entry time, starting air pressure: this log kept outside allows constant knowledge of who is inside.",es:"Nombre, hora de entrada, presión de aire al inicio: este registro llevado en el exterior permite saber en todo momento quién está dentro.",pt:"Nome, hora de entrada, pressão de ar inicial: este registo mantido no exterior permite saber em permanência quem está dentro."} },
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

// SVG 4 - AIR MANAGEMENT (RULE OF THIRDS)
function AirManagementSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const stages = [
    { id:0, color:C.green, label:{fr:"Premier tiers - Entrer",en:"First third - Entering",es:"Primer tercio - Entrar",pt:"Primeiro terço - Entrar"}, desc:{fr:"Utilisé pour progresser vers l'objectif. Dès cette phase, la sortie doit déjà être une pensée constante, pas une réflexion pour plus tard.",en:"Used to advance toward the objective. From this phase on, exiting must already be a constant thought, not something to think about later.",es:"Usado para avanzar hacia el objetivo. Desde esta fase, la salida ya debe ser un pensamiento constante, no algo para reflexionar más tarde.",pt:"Usado para avançar em direção ao objetivo. Já a partir desta fase, a saída deve ser um pensamento constante, não algo para pensar mais tarde."} },
    { id:1, color:C.gold2, label:{fr:"Deuxième tiers - Sortir",en:"Second third - Exiting",es:"Segundo tercio - Salir",pt:"Segundo terço - Sair"}, desc:{fr:"Réservé exclusivement au trajet de retour. Si les conditions de sortie sont plus difficiles qu'à l'entrée, ce tiers peut ne pas suffire seul.",en:"Reserved exclusively for the return trip. If exit conditions are harder than entry conditions, this third alone may not be enough.",es:"Reservado exclusivamente para el trayecto de vuelta. Si las condiciones de salida son más difíciles que las de entrada, este tercio solo puede no bastar.",pt:"Reservado exclusivamente para o trajeto de regresso. Se as condições de saída forem mais difíceis do que as de entrada, este terço sozinho pode não bastar."} },
    { id:2, color:C.red, label:{fr:"Troisième tiers - Réserve d'urgence",en:"Third third - Emergency reserve",es:"Tercer tercio - Reserva de emergencia",pt:"Terceiro terço - Reserva de emergência"}, desc:{fr:"Ne doit jamais être utilisé en situation normale. C'est la marge qui existe pour un obstacle imprévu, une désorientation, ou un coéquipier à assister.",en:"Should never be used in a normal situation. This is the margin that exists for an unexpected obstacle, disorientation, or a teammate needing assistance.",es:"Nunca debe usarse en una situación normal. Es el margen que existe para un obstáculo imprevisto, una desorientación, o un compañero al que asistir.",pt:"Nunca deve ser usado numa situação normal. É a margem que existe para um obstáculo imprevisto, uma desorientação, ou um colega a assistir."} },
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
        {lang==="fr"?"L'alarme basse pression n'est pas un signal pour commencer à sortir : c'est la confirmation que la règle des tiers n'a pas été respectée.":lang==="en"?"The low-air alarm is not a signal to start exiting: it's confirmation that the rule of thirds was not followed.":lang==="es"?"La alarma de baja presión no es una señal para empezar a salir: es la confirmación de que la regla de los tercios no se siguió.":"O alarme de baixa pressão não é um sinal para começar a sair: é a confirmação de que a regra dos terços não foi seguida."}
      </div>
    </div>
  );
}

// EXERCISE - FIREFIGHTER SURVIVAL DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Votre coéquipier n'a pas vérifié votre ARI avant l'entrée. Que faites-vous ?\na) Entrer quand même, il n'y a probablement rien à signaler\nb) Réaliser le buddy check avant toute entrée, sans exception\nc) Vérifier vous-même rapidement en entrant"},
      {id:"q2",q:"Vous entendez l'alarme basse pression de votre ARI. Que signifie ce signal ?\na) Vous êtes déjà en retard sur votre sortie, la règle des tiers n'a pas été respectée\nb) Il vous reste encore beaucoup de temps pour continuer\nc) C'est un simple rappel sans urgence particulière"},
      {id:"q3",q:"Vous êtes désorienté dans une fumée épaisse, sans repère clair. Que faites-vous ?\na) Continuer à avancer dans la direction qui semble la plus logique\nb) Accélérer pour sortir plus vite de la zone enfumée\nc) Rester en contact avec votre coéquipier, communiquer immédiatement la situation"},
      {id:"q4",q:"Quel est l'objectif final de cette leçon, selon le principe central ?\na) Éteindre le feu le plus vite possible, coûte que coûte\nb) S'assurer que chaque pompier rentre vivant, le feu pouvant être maîtrisé plus tard\nc) Utiliser le maximum d'équipement disponible"},
    ],
    en:[
      {id:"q1",q:"Your teammate didn't check your BA before entry. What do you do?\na) Enter anyway, there's probably nothing to report\nb) Perform the buddy check before any entry, without exception\nc) Quickly check it yourself while entering"},
      {id:"q2",q:"You hear your BA's low-air alarm. What does this signal mean?\na) You are already behind on your exit, the rule of thirds was not followed\nb) You still have plenty of time to continue\nc) It's a simple reminder with no particular urgency"},
      {id:"q3",q:"You are disoriented in thick smoke, with no clear landmark. What do you do?\na) Keep moving in the direction that seems most logical\nb) Speed up to get out of the smoky area faster\nc) Stay in contact with your teammate, communicate the situation immediately"},
      {id:"q4",q:"What is the ultimate goal of this lesson, according to the central principle?\na) Extinguish the fire as fast as possible, no matter what\nb) Ensure every firefighter returns alive, the fire can be controlled later\nc) Use the maximum equipment available"},
    ],
    es:[
      {id:"q1",q:"Tu compañero no comprobó tu ARI antes de entrar. ¿Qué haces?\na) Entrar de todos modos, probablemente no hay nada que señalar\nb) Realizar el buddy check antes de cualquier entrada, sin excepción\nc) Comprobarlo tú mismo rápidamente al entrar"},
      {id:"q2",q:"Oyes la alarma de baja presión de tu ARI. ¿Qué significa esta señal?\na) Ya vas retrasado en tu salida, la regla de los tercios no se siguió\nb) Todavía te queda mucho tiempo para continuar\nc) Es un simple recordatorio sin urgencia particular"},
      {id:"q3",q:"Estás desorientado en humo espeso, sin ninguna referencia clara. ¿Qué haces?\na) Seguir avanzando en la dirección que parece más lógica\nb) Acelerar para salir más rápido de la zona con humo\nc) Mantener contacto con tu compañero, comunicar la situación de inmediato"},
      {id:"q4",q:"¿Cuál es el objetivo final de esta lección, según el principio central?\na) Apagar el fuego lo más rápido posible, cueste lo que cueste\nb) Asegurar que cada bombero regrese con vida, el fuego se puede controlar después\nc) Usar el máximo equipo disponible"},
    ],
    pt:[
      {id:"q1",q:"O teu colega não verificou o teu ARI antes de entrar. O que fazes?\na) Entrar mesmo assim, provavelmente não há nada a reportar\nb) Realizar o buddy check antes de qualquer entrada, sem exceção\nc) Verificar tu mesmo rapidamente ao entrar"},
      {id:"q2",q:"Ouves o alarme de baixa pressão do teu ARI. O que significa este sinal?\na) Já estás atrasado na tua saída, a regra dos terços não foi seguida\nb) Ainda tens muito tempo para continuar\nc) É um simples lembrete sem urgência particular"},
      {id:"q3",q:"Estás desorientado num fumo espesso, sem nenhuma referência clara. O que fazes?\na) Continuar a avançar na direção que parece mais lógica\nb) Acelerar para sair mais depressa da zona enfumada\nc) Manter contacto com o teu colega, comunicar a situação de imediato"},
      {id:"q4",q:"Qual é o objetivo final desta lição, segundo o princípio central?\na) Apagar o fogo o mais depressa possível, custe o que custar\nb) Garantir que cada bombeiro regressa vivo, o fogo pode ser controlado depois\nc) Usar o máximo de equipamento disponível"},
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

// ACCIDENT CASE - REAL DOCUMENTED CASE (ROAM / AIR MANAGEMENT TRAINING REFERENCE)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Le cas fondateur de la gestion de l'air",teaser:"Référence internationale de formation - désorientation, alarme basse pression, transfert d'air d'urgence",
      what:"Un officier d'échelle et son coéquipier progressent au troisième étage d'un bâtiment, en visibilité nulle à cause d'une fumée épaisse. La configuration inhabituelle des lieux les désoriente complètement. L'alarme basse pression de l'officier se déclenche. Peu après, il épuise entièrement son air et tente de filtrer sa respiration à travers le tuyau basse pression glissé dans son manteau. L'alarme de son coéquipier se déclenche à son tour. Les deux comprennent la gravité de leur situation en continuant à avancer dans le couloir, jusqu'à croiser une autre équipe qui reconnaît immédiatement leur détresse et leur fournit un transfert d'air d'urgence. Les deux hommes survivent.",
      cause:"• Désorientation complète dans une fumée épaisse, dans une configuration de lieux inhabituelle\n• L'alarme basse pression s'est déclenchée après que la règle des tiers a déjà été dépassée\n• Aucune décision de sortie anticipée n'a été prise avant que l'alarme ne retentisse\n• La situation n'a été résolue que grâce à la rencontre fortuite d'une autre équipe",
      lessons:"✓ Exit Before the Alarm Decides for You : l'alarme basse pression a confirmé un retard déjà installé, pas annoncé un danger à venir\n✓ The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive\n✓ Ce cas a directement inspiré la discipline moderne de gestion de l'air (Rule of Air Management) enseignée dans le monde entier\n✓ La désorientation peut survenir même chez des intervenants expérimentés, dans des configurations inhabituelles",
      link:"🔗 Ce cas, bien que non maritime, est devenu une référence internationale de la formation ARI et reste parfaitement pertinent pour tout marin formé au BST."},
    en:{title:"The founding case of air management",teaser:"International training reference - disorientation, low-air alarm, emergency air transfill",
      what:"A ladder officer and his partner advance on the third floor of a building, in zero visibility due to thick smoke. The unusual layout of the premises disorients them completely. The officer's low-air alarm activates. Shortly after, he fully exhausts his air and attempts to filter his breathing through the low-pressure hose tucked into his coat. His partner's alarm activates in turn. Both understand the severity of their situation as they keep moving down the hallway, until they encounter another crew who immediately recognizes their distress and provides an emergency air transfill. Both men survive.",
      cause:"• Complete disorientation in thick smoke, in an unusual layout of the premises\n• The low-air alarm activated after the rule of thirds had already been exceeded\n• No early exit decision was made before the alarm sounded\n• The situation was only resolved thanks to a chance encounter with another crew",
      lessons:"✓ Exit Before the Alarm Decides for You: the low-air alarm confirmed a delay that had already set in, not a coming danger\n✓ The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive\n✓ This case directly inspired the modern air management discipline (Rule of Air Management) taught worldwide\n✓ Disorientation can happen even to experienced responders, in unusual layouts",
      link:"🔗 This case, though not maritime, has become an international reference in BA training and remains fully relevant for any BST-trained mariner."},
    es:{title:"El caso fundador de la gestión del aire",teaser:"Referencia internacional de formación - desorientación, alarma de baja presión, transferencia de aire de emergencia",
      what:"Un oficial de escalera y su compañero avanzan en el tercer piso de un edificio, con visibilidad nula por el humo espeso. La disposición inusual del lugar los desorienta por completo. La alarma de baja presión del oficial se activa. Poco después, agota por completo su aire e intenta filtrar su respiración a través de la manguera de baja presión metida en su chaqueta. La alarma de su compañero se activa a su vez. Ambos comprenden la gravedad de su situación mientras siguen avanzando por el pasillo, hasta encontrarse con otro equipo que reconoce de inmediato su apuro y les proporciona una transferencia de aire de emergencia. Ambos hombres sobreviven.",
      cause:"• Desorientación completa en humo espeso, en una disposición inusual del lugar\n• La alarma de baja presión se activó después de que ya se había superado la regla de los tercios\n• No se tomó ninguna decisión anticipada de salida antes de que sonara la alarma\n• La situación solo se resolvió gracias al encuentro fortuito con otro equipo",
      lessons:"✓ Exit Before the Alarm Decides for You: la alarma de baja presión confirmó un retraso ya instalado, no anunció un peligro futuro\n✓ The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive\n✓ Este caso inspiró directamente la disciplina moderna de gestión del aire (Rule of Air Management) enseñada en todo el mundo\n✓ La desorientación puede ocurrir incluso a intervinientes experimentados, en disposiciones inusuales",
      link:"🔗 Este caso, aunque no marítimo, se ha convertido en una referencia internacional de la formación en ARI y sigue siendo plenamente pertinente para cualquier marino formado en BST."},
    pt:{title:"O caso fundador da gestão do ar",teaser:"Referência internacional de formação - desorientação, alarme de baixa pressão, transferência de ar de emergência",
      what:"Um oficial de escada e o seu colega avançam no terceiro piso de um edifício, com visibilidade nula devido a fumo espesso. A disposição invulgar do local desorienta-os por completo. O alarme de baixa pressão do oficial ativa-se. Pouco depois, esgota por completo o seu ar e tenta filtrar a respiração através da mangueira de baixa pressão enfiada no casaco. O alarme do seu colega ativa-se por sua vez. Ambos compreendem a gravidade da situação enquanto continuam a avançar pelo corredor, até encontrarem outra equipa que reconhece de imediato a sua aflição e lhes faz uma transferência de ar de emergência. Ambos sobrevivem.",
      cause:"• Desorientação completa em fumo espesso, numa disposição invulgar do local\n• O alarme de baixa pressão ativou-se depois de a regra dos terços já ter sido ultrapassada\n• Nenhuma decisão antecipada de saída foi tomada antes de o alarme soar\n• A situação só foi resolvida graças ao encontro fortuito com outra equipa",
      lessons:"✓ Exit Before the Alarm Decides for You: o alarme de baixa pressão confirmou um atraso já instalado, não anunciou um perigo futuro\n✓ The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive\n✓ Este caso inspirou diretamente a disciplina moderna de gestão do ar (Rule of Air Management) ensinada em todo o mundo\n✓ A desorientação pode acontecer mesmo a intervenientes experientes, em disposições invulgares",
      link:"🔗 Este caso, embora não marítimo, tornou-se uma referência internacional na formação em ARI e continua plenamente pertinente para qualquer marinheiro formado em BST."},
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
    {q:"Que signifie le principe 'The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive' ?",opts:["Éteindre le feu passe toujours avant la sécurité de l'équipe","Le feu peut être maîtrisé plus tard, mais un pompier perdu ne revient jamais","Ce principe ne concerne que les feux électriques","Il ne faut jamais entrer dans un feu"],correct:1,expl:"L'objectif central de cette leçon est la survie de l'intervenant, pas la victoire sur le feu à tout prix."},
    {q:"Pourquoi ne pas présenter les EPI comme un simple catalogue d'équipements ?",opts:["Parce que les EPI ne sont pas importants","Parce que chaque élément protège contre un risque précis et sert un seul objectif : la survie","Parce que MAP ne traite jamais l'équipement","Parce que les EPI changent trop souvent"],correct:1,expl:"Le matériel n'est enseigné que parce qu'il permet de survivre, jamais pour lui-même."},
    {q:"Qu'est-ce que le buddy check ?",opts:["Une vérification optionnelle si le temps le permet","Chaque membre du binôme vérifie l'équipement de l'autre avant toute entrée","Une vérification réservée aux officiers uniquement","Un contrôle effectué après la sortie"],correct:1,expl:"Le buddy check est systématique et non négociable avant toute entrée."},
    {q:"Pourquoi entrer au minimum en binôme, jamais seul ?",opts:["Ce n'est qu'une préférence, pas une règle stricte","Un intervenant seul n'a personne pour l'assister en cas de problème ou de désorientation","Cela accélère toujours l'intervention","Cela ne concerne que les grands compartiments"],correct:1,expl:"L'entrée en binôme minimum garantit une assistance immédiate en cas de problème."},
    {q:"Que doit contenir un registre d'entrée tenu à l'extérieur ?",opts:["Rien de précis","Nom, heure d'entrée, pression d'air au départ, pour savoir en permanence qui est à l'intérieur","Uniquement le nom du commandant","Une simple estimation du nombre de personnes entrées"],correct:1,expl:"Ce registre permet un suivi précis et immédiat de chaque personne engagée dans l'espace."},
    {q:"Que signifie la règle des tiers en gestion de l'air ?",opts:["Un tiers pour entrer, un tiers pour sortir, un tiers de réserve d'urgence","Utiliser l'air sans distinction jusqu'à l'alarme","Un tiers réservé uniquement aux officiers","Cette règle ne s'applique qu'aux grands espaces"],correct:1,expl:"La règle des tiers structure l'usage de l'air en trois phases distinctes, dont une réserve jamais utilisée en situation normale."},
    {q:"Que signifie le déclenchement de l'alarme basse pression de l'ARI ?",opts:["Il reste encore beaucoup de temps pour continuer","La règle des tiers n'a pas été respectée : le retard est déjà là, pas à venir","C'est un simple rappel sans conséquence","Il faut immédiatement retirer le masque"],correct:1,expl:"L'alarme confirme un retard déjà installé, elle n'annonce pas un danger futur."},
    {q:"Pourquoi le troisième tiers d'air ne doit-il jamais être utilisé en situation normale ?",opts:["Il n'a aucune utilité réelle","Il constitue la marge de sécurité pour un imprévu, une désorientation, ou un coéquipier à assister","Il est réservé uniquement au retour au poste de commandement","Il doit toujours être utilisé en priorité"],correct:1,expl:"Cette réserve existe uniquement pour l'imprévu, jamais pour prolonger l'intervention normale."},
    {q:"Que protège spécifiquement la combinaison résistante à la chaleur ?",opts:["Uniquement contre la fumée","Contre le contact direct avec la chaleur et les flammes","Contre la désorientation","Contre le bruit"],correct:1,expl:"Chaque élément de la tenue protège contre un risque précis, ici le contact direct chaleur/flamme."},
    {q:"Que vérifie le test d'étanchéité du masque de l'ARI ?",opts:["La couleur du masque","Qu'aucun air extérieur contaminé ne peut pénétrer à l'intérieur","La pression de la bouteille uniquement","La taille du masque uniquement"],correct:1,expl:"Le test d'étanchéité garantit que l'air respiré reste protégé de toute contamination extérieure."},
    {q:"Dans le cas fondateur de la gestion de l'air, qu'est-ce qui a permis aux deux hommes de survivre ?",opts:["Ils ont continué à progresser seuls jusqu'à la sortie","Une rencontre fortuite avec une autre équipe qui a fourni un transfert d'air d'urgence","Ils ont retiré leur masque pour mieux respirer","Ils ont attendu sans bouger que la fumée se dissipe"],correct:1,expl:"La situation n'a été résolue que grâce à la rencontre fortuite d'une autre équipe."},
    {q:"Ce cas est-il d'origine maritime ?",opts:["Oui, entièrement","Non, mais il est devenu une référence internationale de formation ARI pleinement pertinente pour le BST","Oui, mais seulement partiellement","Cette information n'est pas précisée"],correct:1,expl:"Le cas n'est pas maritime, mais sa pertinence pour la gestion de l'air en BST est universelle."},
    {q:"Quelle est la frontière entre ce module (S4 Firefighting) et le futur module S6 (Emergency Response) ?",opts:["Il n'y a aucune différence entre les deux","S4 enseigne comment survivre à un incendie ; S6 enseignera comment répondre à n'importe quelle urgence","S6 remplace entièrement S4","S4 ne concerne que les officiers"],correct:1,expl:"S4 reste centré exclusivement sur la survie en contexte incendie, S6 sera transversal à toutes les urgences."},
    {q:"Quelle étape du MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) cette leçon développe-t-elle ?",opts:["Une nouvelle étape ajoutée spécialement pour cette leçon","Protect, développé ici pour la protection de l'intervenant, après L5 qui protégeait le navire","Command, la coordination des équipes","Recover, le retour en service du navire"],correct:1,expl:"Protect se développe sur deux leçons : L5 protège le navire, L6 protège l'intervenant, sans ajouter de nouveau mot au Mindset."},
    {q:"Ce module enseigne-t-il un substitut à une formation BST pratique certifiée au port et à l'usage réel de l'ARI ?",opts:["Oui, il équivaut à un entraînement pratique complet","Non, il enseigne des principes de décision et un état d'esprit, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne l'état d'esprit et les principes de décision, jamais un remplacement de la formation BST pratique."},
  ],
  en:[
    {q:"What does the principle 'The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive' mean?",opts:["Extinguishing the fire always comes before the team's safety","The fire can be controlled later, but a lost firefighter never comes back","This principle only concerns electrical fires","You should never enter a fire"],correct:1,expl:"The central goal of this lesson is the responder's survival, not victory over the fire at any cost."},
    {q:"Why not present PPE as a simple equipment catalog?",opts:["Because PPE isn't important","Because each element protects against a precise risk and serves one goal: survival","Because MAP never covers equipment","Because PPE changes too often"],correct:1,expl:"Equipment is taught only because it enables survival, never for its own sake."},
    {q:"What is the buddy check?",opts:["An optional check if time allows","Each member of the pair checks the other's equipment before any entry","A check reserved for officers only","A check performed after exiting"],correct:1,expl:"The buddy check is systematic and non-negotiable before any entry."},
    {q:"Why enter as a minimum pair, never alone?",opts:["It's only a preference, not a strict rule","A lone responder has no one to assist them in case of trouble or disorientation","It always speeds up the intervention","It only concerns large compartments"],correct:1,expl:"Entering as a minimum pair guarantees immediate assistance in case of a problem."},
    {q:"What should an entry log kept outside contain?",opts:["Nothing specific","Name, entry time, starting air pressure, to know at all times who is inside","Only the captain's name","A rough estimate of the number of people who entered"],correct:1,expl:"This log allows precise, immediate tracking of everyone engaged in the space."},
    {q:"What does the rule of thirds in air management mean?",opts:["One third to enter, one third to exit, one third emergency reserve","Using air without distinction until the alarm sounds","One third reserved only for officers","This rule only applies to large spaces"],correct:1,expl:"The rule of thirds structures air use into three distinct phases, including a reserve never used in normal conditions."},
    {q:"What does the BA's low-air alarm activating mean?",opts:["There's still plenty of time to continue","The rule of thirds was not followed: the delay has already happened, not something coming","It's a simple reminder with no consequence","You must immediately remove the mask"],correct:1,expl:"The alarm confirms a delay that has already set in, it does not announce a future danger."},
    {q:"Why should the third portion of air never be used in a normal situation?",opts:["It has no real use","It is the safety margin for an unexpected event, disorientation, or a teammate needing assistance","It is reserved only for returning to the command post","It should always be used first"],correct:1,expl:"This reserve exists solely for the unexpected, never to extend a normal intervention."},
    {q:"What does the heat-resistant suit specifically protect against?",opts:["Only against smoke","Against direct contact with heat and flames","Against disorientation","Against noise"],correct:1,expl:"Each element of the outfit protects against a precise risk, here direct heat/flame contact."},
    {q:"What does the BA mask's seal test check?",opts:["The color of the mask","That no contaminated outside air can enter","Only the cylinder pressure","Only the mask size"],correct:1,expl:"The seal test guarantees that breathed air remains protected from any outside contamination."},
    {q:"In the founding air management case, what allowed the two men to survive?",opts:["They kept advancing alone to the exit","A chance encounter with another crew that provided an emergency air transfill","They removed their masks to breathe more easily","They waited motionless for the smoke to clear"],correct:1,expl:"The situation was only resolved thanks to a chance encounter with another crew."},
    {q:"Is this case of maritime origin?",opts:["Yes, entirely","No, but it has become an international BA training reference fully relevant to BST","Yes, but only partially","This information isn't specified"],correct:1,expl:"The case isn't maritime, but its relevance to BST air management is universal."},
    {q:"What is the boundary between this module (S4 Firefighting) and the future S6 module (Emergency Response)?",opts:["There is no difference between the two","S4 teaches how to survive a fire; S6 will teach how to respond to any emergency","S6 entirely replaces S4","S4 only concerns officers"],correct:1,expl:"S4 stays exclusively focused on surviving in a fire context, S6 will be transversal to all emergencies."},
    {q:"Which step of the MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) does this lesson develop?",opts:["A new step added specially for this lesson","Protect, developed here for protecting the responder, after L5 which protected the ship","Command, team coordination","Recover, returning the ship to service"],correct:1,expl:"Protect is developed over two lessons: L5 protects the ship, L6 protects the responder, with no new word added to the Mindset."},
    {q:"Does this module teach a replacement for certified practical BST training in donning and actually using BA?",opts:["Yes, it is equivalent to complete practical training","No, it teaches decision principles and a mindset, never a replacement for certified practical training","Yes, but only for officers","No, it is useless without equipment"],correct:1,expl:"MAP teaches mindset and decision principles, never a replacement for practical BST training."},
  ],
  es:[
    {q:"¿Qué significa el principio 'The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive'?",opts:["Apagar el fuego siempre viene antes que la seguridad del equipo","El fuego se puede controlar después, pero un bombero perdido nunca vuelve","Este principio solo concierne a los fuegos eléctricos","Nunca se debe entrar en un fuego"],correct:1,expl:"El objetivo central de esta lección es la supervivencia del interviniente, no la victoria sobre el fuego a cualquier precio."},
    {q:"¿Por qué no presentar el EPP como un simple catálogo de equipos?",opts:["Porque el EPP no es importante","Porque cada elemento protege contra un riesgo preciso y sirve un solo objetivo: la supervivencia","Porque MAP nunca trata el equipo","Porque el EPP cambia demasiado a menudo"],correct:1,expl:"El material se enseña solo porque permite sobrevivir, nunca por sí mismo."},
    {q:"¿Qué es el buddy check?",opts:["Una comprobación opcional si el tiempo lo permite","Cada miembro del binomio comprueba el equipo del otro antes de cualquier entrada","Una comprobación reservada solo a los oficiales","Un control realizado después de salir"],correct:1,expl:"El buddy check es sistemático y no negociable antes de cualquier entrada."},
    {q:"¿Por qué entrar como mínimo en pareja, nunca solo?",opts:["Es solo una preferencia, no una regla estricta","Un interviniente solo no tiene a nadie que lo asista en caso de problema o desorientación","Siempre acelera la intervención","Solo concierne a grandes compartimentos"],correct:1,expl:"Entrar como mínimo en pareja garantiza asistencia inmediata en caso de problema."},
    {q:"¿Qué debe contener un registro de entrada mantenido en el exterior?",opts:["Nada específico","Nombre, hora de entrada, presión de aire inicial, para saber en todo momento quién está dentro","Solo el nombre del capitán","Una estimación aproximada del número de personas que entraron"],correct:1,expl:"Este registro permite un seguimiento preciso e inmediato de cada persona dentro del espacio."},
    {q:"¿Qué significa la regla de los tercios en la gestión del aire?",opts:["Un tercio para entrar, un tercio para salir, un tercio de reserva de emergencia","Usar el aire sin distinción hasta la alarma","Un tercio reservado solo para los oficiales","Esta regla solo se aplica a grandes espacios"],correct:1,expl:"La regla de los tercios estructura el uso del aire en tres fases distintas, incluida una reserva nunca usada en condiciones normales."},
    {q:"¿Qué significa la activación de la alarma de baja presión del ARI?",opts:["Todavía queda mucho tiempo para continuar","La regla de los tercios no se siguió: el retraso ya ha ocurrido, no algo que va a venir","Es un simple recordatorio sin consecuencia","Hay que retirar de inmediato la máscara"],correct:1,expl:"La alarma confirma un retraso ya instalado, no anuncia un peligro futuro."},
    {q:"¿Por qué el tercer tercio de aire nunca debe usarse en una situación normal?",opts:["No tiene ninguna utilidad real","Constituye el margen de seguridad para un imprevisto, una desorientación, o un compañero al que asistir","Está reservado solo para el regreso al puesto de mando","Siempre debe usarse en primer lugar"],correct:1,expl:"Esta reserva existe únicamente para lo imprevisto, nunca para prolongar la intervención normal."},
    {q:"¿Contra qué protege específicamente el traje resistente al calor?",opts:["Solo contra el humo","Contra el contacto directo con el calor y las llamas","Contra la desorientación","Contra el ruido"],correct:1,expl:"Cada elemento del traje protege contra un riesgo preciso, aquí el contacto directo calor/llama."},
    {q:"¿Qué comprueba la prueba de estanqueidad de la máscara del ARI?",opts:["El color de la máscara","Que ningún aire exterior contaminado puede entrar","Solo la presión de la botella","Solo el tamaño de la máscara"],correct:1,expl:"La prueba de estanqueidad garantiza que el aire respirado permanece protegido de cualquier contaminación exterior."},
    {q:"En el caso fundador de la gestión del aire, ¿qué permitió a los dos hombres sobrevivir?",opts:["Siguieron avanzando solos hasta la salida","Un encuentro fortuito con otro equipo que proporcionó una transferencia de aire de emergencia","Se quitaron las máscaras para respirar más fácilmente","Esperaron inmóviles a que el humo se disipara"],correct:1,expl:"La situación solo se resolvió gracias al encuentro fortuito con otro equipo."},
    {q:"¿Es este caso de origen marítimo?",opts:["Sí, totalmente","No, pero se ha convertido en una referencia internacional de formación en ARI plenamente pertinente para el BST","Sí, pero solo parcialmente","Esta información no se especifica"],correct:1,expl:"El caso no es marítimo, pero su pertinencia para la gestión del aire en BST es universal."},
    {q:"¿Cuál es la frontera entre este módulo (S4 Firefighting) y el futuro módulo S6 (Emergency Response)?",opts:["No hay ninguna diferencia entre ambos","S4 enseña cómo sobrevivir a un incendio; S6 enseñará cómo responder a cualquier emergencia","S6 sustituye por completo a S4","S4 solo concierne a los oficiales"],correct:1,expl:"S4 se mantiene centrado exclusivamente en la supervivencia en contexto de incendio, S6 será transversal a todas las emergencias."},
    {q:"¿Qué etapa del MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) desarrolla esta lección?",opts:["Una nueva etapa añadida especialmente para esta lección","Protect, desarrollado aquí para la protección del interviniente, después de L5 que protegía el buque","Command, la coordinación de los equipos","Recover, el regreso en servicio del buque"],correct:1,expl:"Protect se desarrolla en dos lecciones: L5 protege el buque, L6 protege al interviniente, sin añadir una nueva palabra al Mindset."},
    {q:"¿Este módulo enseña un sustituto de una formación BST práctica certificada en la colocación y el uso real del ARI?",opts:["Sí, equivale a un entrenamiento práctico completo","No, enseña principios de decisión y un estado de ánimo, nunca un sustituto de una formación práctica certificada","Sí, pero solo para oficiales","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña el estado de ánimo y los principios de decisión, nunca un sustituto de la formación BST práctica."},
  ],
  pt:[
    {q:"O que significa o princípio 'The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive'?",opts:["Apagar o fogo vem sempre antes da segurança da equipa","O fogo pode ser controlado depois, mas um bombeiro perdido nunca regressa","Este princípio só diz respeito a incêndios elétricos","Nunca se deve entrar num fogo"],correct:1,expl:"O objetivo central desta lição é a sobrevivência do interveniente, não a vitória sobre o fogo a qualquer custo."},
    {q:"Por que não apresentar o EPI como um simples catálogo de equipamentos?",opts:["Porque o EPI não é importante","Porque cada elemento protege contra um risco preciso e serve um único objetivo: a sobrevivência","Porque a MAP nunca trata do equipamento","Porque o EPI muda demasiadas vezes"],correct:1,expl:"O material é ensinado apenas porque permite sobreviver, nunca por si mesmo."},
    {q:"O que é o buddy check?",opts:["Uma verificação opcional se o tempo permitir","Cada membro do binómio verifica o equipamento do outro antes de qualquer entrada","Uma verificação reservada apenas aos oficiais","Um controlo feito depois de sair"],correct:1,expl:"O buddy check é sistemático e não negociável antes de qualquer entrada."},
    {q:"Por que entrar no mínimo em dupla, nunca sozinho?",opts:["É apenas uma preferência, não uma regra estrita","Um interveniente sozinho não tem ninguém para o assistir em caso de problema ou desorientação","Acelera sempre a intervenção","Só diz respeito a grandes compartimentos"],correct:1,expl:"Entrar no mínimo em dupla garante assistência imediata em caso de problema."},
    {q:"O que deve conter um registo de entrada mantido no exterior?",opts:["Nada específico","Nome, hora de entrada, pressão de ar inicial, para saber em permanência quem está dentro","Só o nome do comandante","Uma estimativa aproximada do número de pessoas que entraram"],correct:1,expl:"Este registo permite um acompanhamento preciso e imediato de cada pessoa dentro do espaço."},
    {q:"O que significa a regra dos terços na gestão do ar?",opts:["Um terço para entrar, um terço para sair, um terço de reserva de emergência","Usar o ar sem distinção até ao alarme","Um terço reservado só para os oficiais","Esta regra só se aplica a grandes espaços"],correct:1,expl:"A regra dos terços estrutura o uso do ar em três fases distintas, incluindo uma reserva nunca usada em condições normais."},
    {q:"O que significa a ativação do alarme de baixa pressão do ARI?",opts:["Ainda resta muito tempo para continuar","A regra dos terços não foi seguida: o atraso já aconteceu, não é algo que vem a seguir","É um simples lembrete sem consequência","É preciso retirar de imediato a máscara"],correct:1,expl:"O alarme confirma um atraso já instalado, não anuncia um perigo futuro."},
    {q:"Por que o terceiro terço de ar nunca deve ser usado numa situação normal?",opts:["Não tem qualquer utilidade real","Constitui a margem de segurança para um imprevisto, uma desorientação, ou um colega a assistir","Está reservado apenas para o regresso ao posto de comando","Deve ser sempre usado primeiro"],correct:1,expl:"Esta reserva existe unicamente para o imprevisto, nunca para prolongar a intervenção normal."},
    {q:"Contra o que protege especificamente o fato resistente ao calor?",opts:["Só contra o fumo","Contra o contacto direto com o calor e as chamas","Contra a desorientação","Contra o ruído"],correct:1,expl:"Cada elemento do fato protege contra um risco preciso, aqui o contacto direto calor/chama."},
    {q:"O que verifica o teste de vedação da máscara do ARI?",opts:["A cor da máscara","Que nenhum ar exterior contaminado pode entrar","Só a pressão do cilindro","Só o tamanho da máscara"],correct:1,expl:"O teste de vedação garante que o ar respirado permanece protegido de qualquer contaminação exterior."},
    {q:"No caso fundador da gestão do ar, o que permitiu aos dois homens sobreviver?",opts:["Continuaram a avançar sozinhos até à saída","Um encontro fortuito com outra equipa que forneceu uma transferência de ar de emergência","Retiraram as máscaras para respirar mais facilmente","Esperaram imóveis que o fumo se dissipasse"],correct:1,expl:"A situação só foi resolvida graças ao encontro fortuito com outra equipa."},
    {q:"Este caso é de origem marítima?",opts:["Sim, totalmente","Não, mas tornou-se uma referência internacional de formação em ARI plenamente pertinente para o BST","Sim, mas só parcialmente","Esta informação não é especificada"],correct:1,expl:"O caso não é marítimo, mas a sua pertinência para a gestão do ar em BST é universal."},
    {q:"Qual é a fronteira entre este módulo (S4 Firefighting) e o futuro módulo S6 (Emergency Response)?",opts:["Não há nenhuma diferença entre os dois","S4 ensina como sobreviver a um incêndio; S6 ensinará como responder a qualquer urgência","S6 substitui inteiramente S4","S4 só diz respeito a oficiais"],correct:1,expl:"S4 mantém-se centrado exclusivamente na sobrevivência em contexto de incêndio, S6 será transversal a todas as urgências."},
    {q:"Que etapa do MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) esta lição desenvolve?",opts:["Uma nova etapa acrescentada especialmente para esta lição","Protect, desenvolvido aqui para a proteção do interveniente, depois de L5 que protegia o navio","Command, a coordenação das equipas","Recover, o regresso em serviço do navio"],correct:1,expl:"Protect desenvolve-se em duas lições: L5 protege o navio, L6 protege o interveniente, sem acrescentar nenhuma nova palavra ao Mindset."},
    {q:"Este módulo ensina um substituto de uma formação BST prática certificada na colocação e no uso real do ARI?",opts:["Sim, equivale a um treino prático completo","Não, ensina princípios de decisão e um estado de espírito, nunca um substituto de uma formação prática certificada","Sim, mas só para oficiais","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina o estado de espírito e os princípios de decisão, nunca um substituto da formação BST prática."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive' ?",opts:["Éteindre le feu passe toujours en premier","Le feu peut être maîtrisé plus tard, un pompier perdu ne revient jamais","Cela ne concerne que l'électricité","Il ne faut jamais entrer dans un feu"],correct:1,expl:"L'objectif central est la survie de l'intervenant."},
    {q:"Qu'est-ce que le buddy check ?",opts:["Une vérification optionnelle","Chaque membre du binôme vérifie l'équipement de l'autre avant l'entrée","Réservé aux officiers","Fait après la sortie"],correct:1,expl:"Systématique et non négociable avant toute entrée."},
    {q:"Que signifie la règle des tiers ?",opts:["Un tiers entrer, un tiers sortir, un tiers réserve d'urgence","Utiliser l'air librement","Réservé aux officiers","Ne s'applique qu'aux grands espaces"],correct:1,expl:"Trois phases distinctes de gestion de l'air."},
    {q:"Que signifie l'alarme basse pression de l'ARI ?",opts:["Il reste du temps","La règle des tiers n'a pas été respectée, le retard est déjà là","Un simple rappel","Retirer le masque immédiatement"],correct:1,expl:"L'alarme confirme un retard déjà installé."},
    {q:"Quelle étape du MAP Fire Mindset cette leçon développe-t-elle ?",opts:["Une étape nouvelle","Protect, pour la protection de l'intervenant, après L5 (le navire)","Command","Recover"],correct:1,expl:"Protect se développe sur deux leçons, sans nouveau mot ajouté au Mindset."},
  ],
  en:[
    {q:"What does 'The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive' mean?",opts:["Extinguishing the fire always comes first","The fire can be controlled later, a lost firefighter never comes back","It only concerns electricity","You should never enter a fire"],correct:1,expl:"The central goal is the responder's survival."},
    {q:"What is the buddy check?",opts:["An optional check","Each member of the pair checks the other's equipment before entry","Reserved for officers","Done after exiting"],correct:1,expl:"Systematic and non-negotiable before any entry."},
    {q:"What does the rule of thirds mean?",opts:["One third in, one third out, one third emergency reserve","Using air freely","Reserved for officers","Only applies to large spaces"],correct:1,expl:"Three distinct phases of air management."},
    {q:"What does the BA's low-air alarm mean?",opts:["There's still time","The rule of thirds wasn't followed, the delay has already happened","A simple reminder","Remove the mask immediately"],correct:1,expl:"The alarm confirms a delay that has already set in."},
    {q:"Which step of the MAP Fire Mindset does this lesson develop?",opts:["A new step","Protect, for protecting the responder, after L5 (the ship)","Command","Recover"],correct:1,expl:"Protect is developed over two lessons, with no new word added to the Mindset."},
  ],
  es:[
    {q:"¿Qué significa 'The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive'?",opts:["Apagar el fuego siempre viene primero","El fuego se puede controlar después, un bombero perdido nunca vuelve","Solo concierne a la electricidad","Nunca hay que entrar en un fuego"],correct:1,expl:"El objetivo central es la supervivencia del interviniente."},
    {q:"¿Qué es el buddy check?",opts:["Una comprobación opcional","Cada miembro del binomio comprueba el equipo del otro antes de entrar","Reservado a oficiales","Se hace después de salir"],correct:1,expl:"Sistemático y no negociable antes de cualquier entrada."},
    {q:"¿Qué significa la regla de los tercios?",opts:["Un tercio entrar, un tercio salir, un tercio reserva de emergencia","Usar el aire libremente","Reservado a oficiales","Solo se aplica a grandes espacios"],correct:1,expl:"Tres fases distintas de gestión del aire."},
    {q:"¿Qué significa la alarma de baja presión del ARI?",opts:["Todavía queda tiempo","La regla de los tercios no se siguió, el retraso ya ha ocurrido","Un simple recordatorio","Retirar la máscara de inmediato"],correct:1,expl:"La alarma confirma un retraso ya instalado."},
    {q:"¿Qué etapa del MAP Fire Mindset desarrolla esta lección?",opts:["Una etapa nueva","Protect, para la protección del interviniente, después de L5 (el buque)","Command","Recover"],correct:1,expl:"Protect se desarrolla en dos lecciones, sin nueva palabra añadida al Mindset."},
  ],
  pt:[
    {q:"O que significa 'The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive'?",opts:["Apagar o fogo vem sempre primeiro","O fogo pode ser controlado depois, um bombeiro perdido nunca regressa","Só diz respeito à eletricidade","Nunca se deve entrar num fogo"],correct:1,expl:"O objetivo central é a sobrevivência do interveniente."},
    {q:"O que é o buddy check?",opts:["Uma verificação opcional","Cada membro do binómio verifica o equipamento do outro antes de entrar","Reservado a oficiais","Feito depois de sair"],correct:1,expl:"Sistemático e não negociável antes de qualquer entrada."},
    {q:"O que significa a regra dos terços?",opts:["Um terço entrar, um terço sair, um terço reserva de emergência","Usar o ar livremente","Reservado a oficiais","Só se aplica a grandes espaços"],correct:1,expl:"Três fases distintas de gestão do ar."},
    {q:"O que significa o alarme de baixa pressão do ARI?",opts:["Ainda resta tempo","A regra dos terços não foi seguida, o atraso já aconteceu","Um simples lembrete","Retirar a máscara de imediato"],correct:1,expl:"O alarme confirma um atraso já instalado."},
    {q:"Que etapa do MAP Fire Mindset esta lição desenvolve?",opts:["Uma etapa nova","Protect, para a proteção do interveniente, depois de L5 (o navio)","Command","Recover"],correct:1,expl:"Protect desenvolve-se em duas lições, sem nova palavra acrescentada ao Mindset."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Serais-tu capable de decider de sortir avant meme que l'alarme basse pression ne se declenche, plutot que d'attendre ce signal ?",
    en:"Would you be able to decide to exit even before the low-air alarm sounds, rather than waiting for that signal?",
    es:"¿Serias capaz de decidir salir incluso antes de que suene la alarma de baja presion, en lugar de esperar esa senal?",
    pt:"Serias capaz de decidir sair mesmo antes de o alarme de baixa pressao soar, em vez de esperar por esse sinal?",
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
      badge:"🔥 Safety · Firefighting · Leçon 6/7 · ⭐ Premium",
      title:"Firefighter Survival - PPE & SCBA",
      intro:"Cette leçon n'est pas une présentation d'équipements. Elle forme un pompier capable de rentrer vivant d'une intervention incendie : le matériel n'est enseigné que parce qu'il rend cette survie possible.",
      p0:"THE OBJECTIVE IS NOT TO DEFEAT THE FIRE. THE OBJECTIVE IS TO ENSURE EVERY FIREFIGHTER RETURNS ALIVE.",s0t:"Le principe qui structure toute la leçon",
      s0:"Le feu peut être maîtrisé plus tard. Un pompier perdu ne revient jamais. Toute décision, tout équipement, toute discipline enseignée ici sert cet unique objectif.\n\nCOMMENT LE RECONNAÎTRE ? Un contexte de fumée, de chaleur, de flammes ou d'atmosphère irrespirable exigeant une protection complète.\nQUE FAIRE IMMÉDIATEMENT ? Vérifier l'équipement, ne jamais entrer seul, gérer l'air selon la règle des tiers.\nQUELLE ERREUR L'AGGRAVE ? Attendre l'alarme basse pression pour décider de sortir.\nQUAND DEMANDER DE L'AIDE ? Dès la moindre désorientation, dès le premier signe de difficulté, jamais après épuisement complet.",
      p1:"LA TENUE DU POMPIER",s1t:"Chaque élément contre un risque précis",
      s1:"Combinaison résistante à la chaleur, bottes, gants, casque et cagoule : ce n'est jamais un simple uniforme, chaque pièce répond à un danger identifié.",
      p2:"L'APPAREIL RESPIRATOIRE (ARI)",s2t:"Prêt avant d'entrer, jamais après",
      s2:"Buddy check, étanchéité du masque, pression de la bouteille, contrôle final avant le seuil : la préparation de l'ARI conditionne toute la suite de l'intervention.",
      p3:"DISCIPLINE DE L'ÉQUIPE D'ENTRÉE",s3t:"Jamais seul, toujours suivi",
      s3:"Binôme minimum, communication constante, conscience de l'orientation, registre d'entrée tenu à l'extérieur : cette discipline protège chaque intervenant engagé dans l'espace.",
      p4:"GESTION DE L'AIR",s4t:"La règle des tiers",
      s4:"Un tiers pour entrer, un tiers pour sortir, un tiers de réserve d'urgence jamais utilisé en situation normale. L'alarme basse pression confirme un retard déjà installé, elle ne l'annonce pas.",
      p5:"🎯 EXERCICE OPÉRATIONNEL",p6:"⚠️ CAS D'ÉTUDE",p7:"📝 BANQUE DE 15 QUESTIONS",p8:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 6",
      sumP:["The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive","Chaque élément de la tenue protège contre un risque précis, jamais un simple uniforme","Buddy check et contrôle complet de l'ARI avant toute entrée, sans exception","Jamais entrer seul : binôme minimum, communication, orientation, registre d'entrée","Règle des tiers : sortir avant l'alarme basse pression, pas à cause d'elle"],
      learnedP:["Le rôle précis de chaque élément de la tenue","La préparation complète de l'ARI avant l'entrée","La discipline de l'équipe d'entrée","La règle des tiers en gestion de l'air","Le sens de Protect appliqué à l'intervenant, après L5 sur le navire"],
      safetyMsg:"The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive.",
    },
    en:{
      badge:"🔥 Safety · Firefighting · Lesson 6/7 · ⭐ Premium",
      title:"Firefighter Survival - PPE & SCBA",
      intro:"This lesson is not an equipment presentation. It trains a firefighter capable of coming back alive from a fire intervention: the equipment is taught only because it makes that survival possible.",
      p0:"THE OBJECTIVE IS NOT TO DEFEAT THE FIRE. THE OBJECTIVE IS TO ENSURE EVERY FIREFIGHTER RETURNS ALIVE.",s0t:"The principle that structures the whole lesson",
      s0:"The fire can be controlled later. A lost firefighter never comes back. Every decision, every piece of equipment, every discipline taught here serves this one objective.\n\nHOW DO I RECOGNIZE IT? A context of smoke, heat, flames, or unbreathable atmosphere requiring full protection.\nWHAT DO I DO IMMEDIATELY? Check the equipment, never enter alone, manage air according to the rule of thirds.\nWHAT MISTAKE MAKES IT WORSE? Waiting for the low-air alarm to decide to exit.\nWHEN MUST I ASK FOR HELP? At the slightest disorientation, at the first sign of difficulty, never after complete exhaustion.",
      p1:"THE FIREFIGHTER'S OUTFIT",s1t:"Each element against a precise risk",
      s1:"Heat-resistant suit, boots, gloves, helmet and hood: never just a uniform, each piece answers an identified danger.",
      p2:"THE BREATHING APPARATUS (BA)",s2t:"Ready before entering, never after",
      s2:"Buddy check, mask seal, cylinder pressure, final check before the threshold: preparing the BA conditions the entire rest of the intervention.",
      p3:"ENTRY TEAM DISCIPLINE",s3t:"Never alone, always tracked",
      s3:"Minimum pair, constant communication, orientation awareness, entry log kept outside: this discipline protects every responder engaged in the space.",
      p4:"AIR MANAGEMENT",s4t:"The rule of thirds",
      s4:"One third to enter, one third to exit, one third emergency reserve never used in normal conditions. The low-air alarm confirms a delay that has already set in, it does not announce it.",
      p5:"🎯 OPERATIONAL EXERCISE",p6:"⚠️ CASE STUDY",p7:"📝 15-QUESTION BANK",p8:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 6",
      sumP:["The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive","Every element of the outfit protects against a precise risk, never just a uniform","Buddy check and full BA check before any entry, without exception","Never enter alone: minimum pair, communication, orientation, entry log","Rule of thirds: exit before the low-air alarm, not because of it"],
      learnedP:["The precise role of each element of the outfit","Complete BA preparation before entry","Entry team discipline","The rule of thirds in air management","The meaning of Protect applied to the responder, after L5 on the ship"],
      safetyMsg:"The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive.",
    },
    es:{
      badge:"🔥 Safety · Firefighting · Lección 6/7 · ⭐ Premium",
      title:"Firefighter Survival - PPE & SCBA",
      intro:"Esta lección no es una presentación de equipos. Forma a un bombero capaz de regresar vivo de una intervención de incendio: el material se enseña solo porque hace posible esa supervivencia.",
      p0:"THE OBJECTIVE IS NOT TO DEFEAT THE FIRE. THE OBJECTIVE IS TO ENSURE EVERY FIREFIGHTER RETURNS ALIVE.",s0t:"El principio que estructura toda la lección",
      s0:"El fuego se puede controlar después. Un bombero perdido nunca vuelve. Toda decisión, todo equipo, toda disciplina enseñada aquí sirve a este único objetivo.\n\n¿CÓMO RECONOCERLO? Un contexto de humo, calor, llamas o atmósfera irrespirable que exige protección completa.\n¿QUÉ HACER DE INMEDIATO? Comprobar el equipo, nunca entrar solo, gestionar el aire según la regla de los tercios.\n¿QUÉ ERROR LO AGRAVA? Esperar a la alarma de baja presión para decidir salir.\n¿CUÁNDO PEDIR AYUDA? Ante la más mínima desorientación, ante el primer signo de dificultad, nunca después de agotarlo por completo.",
      p1:"EL TRAJE DEL BOMBERO",s1t:"Cada elemento contra un riesgo preciso",
      s1:"Traje resistente al calor, botas, guantes, casco y capucha: nunca es un simple uniforme, cada pieza responde a un peligro identificado.",
      p2:"EL APARATO RESPIRATORIO (ARI)",s2t:"Listo antes de entrar, nunca después",
      s2:"Buddy check, estanqueidad de la máscara, presión de la botella, control final antes del umbral: preparar el ARI condiciona todo el resto de la intervención.",
      p3:"DISCIPLINA DEL EQUIPO DE ENTRADA",s3t:"Nunca solo, siempre seguido",
      s3:"Binomio mínimo, comunicación constante, conciencia de la orientación, registro de entrada mantenido en el exterior: esta disciplina protege a cada interviniente dentro del espacio.",
      p4:"GESTIÓN DEL AIRE",s4t:"La regla de los tercios",
      s4:"Un tercio para entrar, un tercio para salir, un tercio de reserva de emergencia nunca usado en condiciones normales. La alarma de baja presión confirma un retraso ya instalado, no lo anuncia.",
      p5:"🎯 EJERCICIO OPERATIVO",p6:"⚠️ CASO DE ESTUDIO",p7:"📝 BANCO DE 15 PREGUNTAS",p8:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 6",
      sumP:["The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive","Cada elemento del traje protege contra un riesgo preciso, nunca un simple uniforme","Buddy check y control completo del ARI antes de cualquier entrada, sin excepción","Nunca entrar solo: binomio mínimo, comunicación, orientación, registro de entrada","Regla de los tercios: salir antes de la alarma de baja presión, no por causa de ella"],
      learnedP:["El papel preciso de cada elemento del traje","La preparación completa del ARI antes de entrar","La disciplina del equipo de entrada","La regla de los tercios en la gestión del aire","El sentido de Protect aplicado al interviniente, después de L5 sobre el buque"],
      safetyMsg:"The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive.",
    },
    pt:{
      badge:"🔥 Safety · Firefighting · Lição 6/7 · ⭐ Premium",
      title:"Firefighter Survival - PPE & SCBA",
      intro:"Esta lição não é uma apresentação de equipamentos. Forma um bombeiro capaz de regressar vivo de uma intervenção de incêndio: o material só é ensinado porque torna essa sobrevivência possível.",
      p0:"THE OBJECTIVE IS NOT TO DEFEAT THE FIRE. THE OBJECTIVE IS TO ENSURE EVERY FIREFIGHTER RETURNS ALIVE.",s0t:"O princípio que estrutura toda a lição",
      s0:"O fogo pode ser controlado depois. Um bombeiro perdido nunca regressa. Toda decisão, todo equipamento, toda disciplina ensinada aqui serve este único objetivo.\n\nCOMO RECONHECER? Um contexto de fumo, calor, chamas ou atmosfera irrespirável que exige proteção completa.\nO QUE FAZER IMEDIATAMENTE? Verificar o equipamento, nunca entrar sozinho, gerir o ar segundo a regra dos terços.\nQUE ERRO O AGRAVA? Esperar pelo alarme de baixa pressão para decidir sair.\nQUANDO PEDIR AJUDA? Perante a mínima desorientação, ao primeiro sinal de dificuldade, nunca depois de o esgotar por completo.",
      p1:"O FATO DO BOMBEIRO",s1t:"Cada elemento contra um risco preciso",
      s1:"Fato resistente ao calor, botas, luvas, capacete e capuz: nunca é um simples uniforme, cada peça responde a um perigo identificado.",
      p2:"O APARELHO RESPIRATÓRIO (ARI)",s2t:"Pronto antes de entrar, nunca depois",
      s2:"Buddy check, vedação da máscara, pressão do cilindro, controlo final antes do limiar: preparar o ARI condiciona todo o resto da intervenção.",
      p3:"DISCIPLINA DA EQUIPA DE ENTRADA",s3t:"Nunca sozinho, sempre acompanhado",
      s3:"Dupla mínima, comunicação constante, consciência da orientação, registo de entrada mantido no exterior: esta disciplina protege cada interveniente dentro do espaço.",
      p4:"GESTÃO DO AR",s4t:"A regra dos terços",
      s4:"Um terço para entrar, um terço para sair, um terço de reserva de emergência nunca usado em condições normais. O alarme de baixa pressão confirma um atraso já instalado, não o anuncia.",
      p5:"🎯 EXERCÍCIO OPERACIONAL",p6:"⚠️ CASO DE ESTUDO",p7:"📝 BANCO DE 15 PERGUNTAS",p8:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 6",
      sumP:["The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive","Cada elemento do fato protege contra um risco preciso, nunca um simples uniforme","Buddy check e controlo completo do ARI antes de qualquer entrada, sem exceção","Nunca entrar sozinho: dupla mínima, comunicação, orientação, registo de entrada","Regra dos terços: sair antes do alarme de baixa pressão, não por causa dele"],
      learnedP:["O papel preciso de cada elemento do fato","A preparação completa do ARI antes de entrar","A disciplina da equipa de entrada","A regra dos terços na gestão do ar","O sentido de Protect aplicado ao interveniente, depois de L5 sobre o navio"],
      safetyMsg:"The objective is not to defeat the fire. The objective is to ensure every firefighter returns alive.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS4_L6({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 6/7":lang==="en"?"Lesson 6/7":lang==="es"?"Lección 6/7":"Lição 6/7"}</div>
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

            <SL icon="🎗️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎗️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🧥" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧥</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧥 {lang==="fr"?"TENUE INCENDIE - INTERACTIF":lang==="en"?"FIREFIGHTER PPE - INTERACTIVE":lang==="es"?"EPI DE BOMBERO - INTERACTIVO":"EPI DE BOMBEIRO - INTERATIVO"}</div><FirefighterPPESVG lang={lang}/></Card>

            <SL icon="🫁" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🫁</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🫁 {lang==="fr"?"PRÉPARATION ARI - INTERACTIF":lang==="en"?"SCBA READINESS - INTERACTIVE":lang==="es"?"PREPARACIÓN ARI - INTERACTIVO":"PREPARAÇÃO ARI - INTERATIVO"}</div><ScbaReadinessSVG lang={lang}/></Card>

            <SL icon="👥" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>👥</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>👥 {lang==="fr"?"ÉQUIPE D'ENTRÉE - INTERACTIF":lang==="en"?"ENTRY TEAM - INTERACTIVE":lang==="es"?"EQUIPO DE ENTRADA - INTERACTIVO":"EQUIPA DE ENTRADA - INTERATIVO"}</div><EntryTeamSVG lang={lang}/></Card>

            <SL icon="💨" text={lc.p4} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>💨 {lang==="fr"?"GESTION DE L'AIR - INTERACTIF":lang==="en"?"AIR MANAGEMENT - INTERACTIVE":lang==="es"?"GESTIÓN DEL AIRE - INTERACTIVO":"GESTÃO DO AR - INTERATIVO"}</div><AirManagementSVG lang={lang}/></Card>

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
                {lang==="fr"?"Quiz Final - Survie du Pompier":lang==="en"?"Final Quiz - Firefighter Survival":lang==="es"?"Quiz Final - Supervivencia del Bombero":"Quiz Final - Sobrevivência do Bombeiro"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 6/7":"questions · Lesson 6/7"}</div>
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
              {lang==="fr"?"LEÇON 7 - COMMANDEMENT & DAMAGE CONTROL →":lang==="en"?"LESSON 7 - COMMAND & DAMAGE CONTROL →":lang==="es"?"LECCIÓN 7 - MANDO Y DAMAGE CONTROL →":"LIÇÃO 7 - COMANDO E DAMAGE CONTROL →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
