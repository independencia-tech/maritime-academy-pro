import { useState, useEffect } from "react";
import { shuffleQuestionOptions, C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - DRABC SEQUENCE
function DRABCSequenceSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:"D", letter:"D", label:{fr:"Danger",en:"Danger",es:"Peligro",pt:"Perigo"}, desc:{fr:"Observer la scène avant d'approcher : machines en marche, électricité, feu, fumées, mer, gîte. Ne jamais foncer vers la victime sans regarder autour.",en:"Scan the scene before approaching: running machinery, electricity, fire, fumes, sea state, listing deck. Never rush to the casualty without looking around first.",es:"Observar la escena antes de acercarse: maquinaria en marcha, electricidad, fuego, humos, mar, escora. Nunca correr hacia la víctima sin mirar alrededor.",pt:"Observar a cena antes de se aproximar: maquinaria em funcionamento, eletricidade, fogo, fumos, mar, adornamento. Nunca correr para a vítima sem olhar em volta."} },
    { id:"R", letter:"R", label:{fr:"Réponse",en:"Response",es:"Respuesta",pt:"Resposta"}, desc:{fr:"Parler fort et toucher les épaules : 'Est-ce que vous m'entendez ?'. Observer si la victime répond à la voix, à la douleur, ou ne répond pas du tout.",en:"Speak loudly and tap the shoulders: 'Can you hear me?'. Observe whether the casualty responds to voice, to pain, or not at all.",es:"Hablar fuerte y tocar los hombros: '¿Me oye?'. Observar si la víctima responde a la voz, al dolor, o no responde en absoluto.",pt:"Falar alto e tocar nos ombros: 'Consegue ouvir-me?'. Observar se a vítima responde à voz, à dor, ou não responde de todo."} },
    { id:"A", letter:"A", label:{fr:"Voies aériennes",en:"Airway",es:"Vía aérea",pt:"Via aérea"}, desc:{fr:"Basculer légèrement la tête en arrière et soulever le menton pour dégager les voies aériennes, sauf suspicion de blessure au cou ou au dos.",en:"Gently tilt the head back and lift the chin to open the airway, unless a neck or spinal injury is suspected.",es:"Inclinar suavemente la cabeza hacia atrás y levantar el mentón para abrir la vía aérea, salvo sospecha de lesión cervical o de espalda.",pt:"Inclinar suavemente a cabeça para trás e levantar o queixo para abrir a via aérea, exceto se houver suspeita de lesão no pescoço ou nas costas."} },
    { id:"B", letter:"B", label:{fr:"Respiration",en:"Breathing",es:"Respiración",pt:"Respiração"}, desc:{fr:"Regarder le thorax, écouter le souffle, sentir l'air sur la joue, pendant 10 secondes maximum, pas plus.",en:"Look at the chest, listen for breath sounds, feel for air on your cheek, for no more than 10 seconds.",es:"Mirar el pecho, escuchar la respiración, sentir el aire en la mejilla, durante 10 segundos como máximo.",pt:"Olhar para o peito, ouvir a respiração, sentir o ar na bochecha, durante no máximo 10 segundos."} },
    { id:"C", letter:"C", label:{fr:"Circulation",en:"Circulation",es:"Circulación",pt:"Circulação"}, desc:{fr:"Rechercher une hémorragie sévère en priorité, puis observer les signes de circulation (couleur, mouvement, réaction).",en:"Look for severe bleeding first, then observe signs of circulation (color, movement, reaction).",es:"Buscar primero una hemorragia grave, luego observar signos de circulación (color, movimiento, reacción).",pt:"Procurar primeiro uma hemorragia grave, depois observar sinais de circulação (cor, movimento, reação)."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(192,57,43,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.red:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:sel===s.id?C.red:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.white,flexShrink:0}}>{s.letter}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 2 - DANGER TYPES
function DangerTypesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"⚡", label:{fr:"Électricité",en:"Electricity",es:"Electricidad",pt:"Eletricidade"}, desc:{fr:"Panneau ouvert, câble dénudé, eau proche d'une installation électrique : couper le courant avant d'approcher si possible.",en:"Open panel, exposed cable, water near an electrical installation: isolate power before approaching if possible.",es:"Panel abierto, cable pelado, agua cerca de una instalación eléctrica: cortar la corriente antes de acercarse si es posible.",pt:"Painel aberto, cabo exposto, água perto de uma instalação elétrica: cortar a corrente antes de se aproximar se possível."} },
    { id:2, icon:"⚙️", label:{fr:"Machines en marche",en:"Running machinery",es:"Maquinaria en marcha",pt:"Maquinaria em funcionamento"}, desc:{fr:"Un treuil, un winch ou un arbre qui tourne encore peut créer une deuxième victime en une seconde. Arrêter ou signaler avant d'intervenir.",en:"A winch or shaft still turning can create a second casualty in one second. Stop or flag it before intervening.",es:"Un winche o eje que sigue girando puede crear una segunda víctima en un segundo. Detener o señalar antes de intervenir.",pt:"Um guincho ou veio ainda a girar pode criar uma segunda vítima num segundo. Parar ou sinalizar antes de intervir."} },
    { id:3, icon:"🔥", label:{fr:"Feu / fumée",en:"Fire / smoke",es:"Fuego / humo",pt:"Fogo / fumo"}, desc:{fr:"Ne jamais entrer dans un espace enfumé sans protection respiratoire. La fumée tue plus vite que les flammes.",en:"Never enter a smoke-filled space without respiratory protection. Smoke kills faster than flames.",es:"Nunca entrar en un espacio con humo sin protección respiratoria. El humo mata más rápido que las llamas.",pt:"Nunca entrar num espaço com fumo sem proteção respiratória. O fumo mata mais rápido do que as chamas."} },
    { id:4, icon:"☁️", label:{fr:"Gaz / espace confiné",en:"Gas / confined space",es:"Gas / espacio confinado",pt:"Gás / espaço confinado"}, desc:{fr:"Une cale, une citerne ou un local pompe peut manquer d'oxygène sans aucun signe visible. Ne jamais entrer sans test d'atmosphère et sans surveillant à l'extérieur.",en:"A hold, tank, or pump room can lack oxygen with no visible sign. Never enter without an atmosphere test and a stand-by person outside.",es:"Una bodega, tanque o sala de bombas puede carecer de oxígeno sin ninguna señal visible. Nunca entrar sin prueba de atmósfera y sin vigilante fuera.",pt:"Um porão, tanque ou casa de bombas pode ter falta de oxigénio sem qualquer sinal visível. Nunca entrar sem teste de atmosfera e sem vigia no exterior."} },
    { id:5, icon:"🌊", label:{fr:"Mer / gîte du navire",en:"Sea state / vessel list",es:"Mar / escora del buque",pt:"Mar / adornamento do navio"}, desc:{fr:"Pont mouillé, forte gîte, houle : le secouriste peut lui-même tomber ou passer par-dessus bord en voulant secourir vite.",en:"Wet deck, heavy list, swell: the rescuer can fall or go overboard themselves while rushing to help.",es:"Cubierta mojada, fuerte escora, mar de fondo: el socorrista puede caer o caer por la borda al querer socorrer rápido.",pt:"Convés molhado, forte adornamento, ondulação: o socorrista pode cair ou ir ao mar ao tentar socorrer depressa."} },
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

// SVG 3 - AVPU RESPONSE SCALE
function AVPUResponseSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const levels = [
    { id:0, letter:"A", color:C.green, label:{fr:"Alerte",en:"Alert",es:"Alerta",pt:"Alerta"}, desc:{fr:"La victime ouvre les yeux spontanément, parle, réagit normalement à votre présence.",en:"The casualty opens their eyes spontaneously, speaks, reacts normally to your presence.",es:"La víctima abre los ojos espontáneamente, habla, reacciona con normalidad a tu presencia.",pt:"A vítima abre os olhos espontaneamente, fala, reage normalmente à tua presença."} },
    { id:1, letter:"V", color:C.gold2, label:{fr:"Voix",en:"Voice",es:"Voz",pt:"Voz"}, desc:{fr:"La victime ne réagit que si vous parlez fort ou l'appelez par son nom, elle ne s'exprime pas spontanément.",en:"The casualty only reacts when you speak loudly or call their name, they do not respond on their own.",es:"La víctima solo reacciona si hablas fuerte o la llamas por su nombre, no se expresa espontáneamente.",pt:"A vítima só reage se falares alto ou a chamares pelo nome, não se expressa espontaneamente."} },
    { id:2, letter:"P", color:C.orange, label:{fr:"Douleur",en:"Pain",es:"Dolor",pt:"Dor"}, desc:{fr:"La victime ne réagit qu'à un stimulus douloureux (pincement du trapèze), aucune réaction à la voix.",en:"The casualty only reacts to a painful stimulus (trapezius pinch), no reaction to voice.",es:"La víctima solo reacciona a un estímulo doloroso (pellizco del trapecio), ninguna reacción a la voz.",pt:"A vítima só reage a um estímulo doloroso (beliscão no trapézio), nenhuma reação à voz."} },
    { id:3, letter:"U", color:C.red, label:{fr:"Aucune réponse",en:"Unresponsive",es:"Sin respuesta",pt:"Sem resposta"}, desc:{fr:"Aucune réaction, ni à la voix ni à la douleur. Situation la plus critique : passer immédiatement à la vérification des voies aériennes et de la respiration, et demander de l'aide médicale sans délai.",en:"No reaction at all, neither to voice nor to pain. The most critical status: move immediately to checking airway and breathing, and call for medical assistance without delay.",es:"Ninguna reacción, ni a la voz ni al dolor. La situación más crítica: pasar de inmediato a comprobar vía aérea y respiración, y pedir ayuda médica sin demora.",pt:"Nenhuma reação, nem à voz nem à dor. A situação mais crítica: passar de imediato a verificar a via aérea e a respiração, e pedir ajuda médica sem demora."} },
  ];
  const sel_ = levels.find(l=>l.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {levels.map(l=>(
          <div key={l.id} onClick={()=>setSel(sel===l.id?null:l.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===l.id?`${l.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===l.id?l.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:sel===l.id?l.color:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:C.white,flexShrink:0}}>{l.letter}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{l.label[lang]||l.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 4 - ABC QUICK CHECK
function ABCQuickCheckSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"🌬️", label:{fr:"Ouvrir les voies aériennes",en:"Open the airway",es:"Abrir la vía aérea",pt:"Abrir a via aérea"}, desc:{fr:"Une main sur le front, deux doigts sous le menton, basculer doucement la tête en arrière.",en:"One hand on the forehead, two fingers under the chin, gently tilt the head back.",es:"Una mano en la frente, dos dedos bajo el mentón, inclinar suavemente la cabeza hacia atrás.",pt:"Uma mão na testa, dois dedos sob o queixo, inclinar suavemente a cabeça para trás."} },
    { id:2, icon:"👁️", label:{fr:"Voir, écouter, sentir",en:"Look, listen, feel",es:"Ver, escuchar, sentir",pt:"Ver, ouvir, sentir"}, desc:{fr:"Joue au-dessus de la bouche du blessé, regarder le thorax se soulever, écouter le souffle, sentir l'air. 10 secondes maximum.",en:"Cheek above the casualty's mouth, watch the chest rise, listen for breath sounds, feel for air. 10 seconds maximum.",es:"Mejilla sobre la boca del herido, mirar el pecho subir, escuchar la respiración, sentir el aire. 10 segundos como máximo.",pt:"Bochecha sobre a boca do ferido, ver o peito subir, ouvir a respiração, sentir o ar. 10 segundos no máximo."} },
    { id:3, icon:"🩸", label:{fr:"Vérifier la circulation",en:"Check circulation",es:"Comprobar la circulación",pt:"Verificar a circulação"}, desc:{fr:"Chercher une hémorragie visible en priorité absolue, elle se traite avant toute autre vérification.",en:"Look for visible bleeding as absolute priority, it is treated before any other check.",es:"Buscar una hemorragia visible como prioridad absoluta, se trata antes que cualquier otra comprobación.",pt:"Procurar uma hemorragia visível como prioridade absoluta, trata-se antes de qualquer outra verificação."} },
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

// EXERCISE - SCENE ASSESSMENT DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous trouvez un collègue inconscient à côté d'un panneau électrique ouvert. Quelle est votre toute première action ?\na) Le tirer immédiatement hors de la zone\nb) Évaluer le danger et couper le courant avant d'approcher si possible\nc) Commencer la respiration artificielle sur place"},
      {id:"q2",q:"La victime ne réagit ni à la voix ni à la douleur. Selon l'échelle AVPU, que faites-vous immédiatement après ?\na) Passer à la vérification des voies aériennes et de la respiration, et demander de l'aide médicale\nb) Attendre 10 minutes pour voir si elle se réveille\nc) La laisser seule pour aller chercher un café"},
      {id:"q3",q:"Vous devez ouvrir les voies aériennes d'un inconscient, mais vous suspectez une chute avec choc à la tête et au cou. Que faites-vous ?\na) Basculer fortement la tête en arrière comme d'habitude\nb) Ne rien faire du tout\nc) Adapter le geste avec une extrême prudence, en minimisant tout mouvement du cou"},
      {id:"q4",q:"Vous vérifiez la respiration : combien de temps maximum devez-vous regarder, écouter, sentir ?\na) 60 secondes\nb) 10 secondes maximum\nc) Il n'y a pas de limite de temps"},
    ],
    en:[
      {id:"q1",q:"You find a colleague unconscious next to an open electrical panel. What is your very first action?\na) Pull them out of the area immediately\nb) Assess the danger and isolate power before approaching if possible\nc) Start artificial respiration on the spot"},
      {id:"q2",q:"The casualty does not react to voice or to pain. According to the AVPU scale, what do you do immediately next?\na) Move to checking airway and breathing, and call for medical assistance\nb) Wait 10 minutes to see if they wake up\nc) Leave them alone to go get a coffee"},
      {id:"q3",q:"You must open the airway of an unconscious person, but you suspect a fall with head and neck impact. What do you do?\na) Tilt the head back strongly as usual\nb) Do nothing at all\nc) Adapt the motion with extreme care, minimizing any neck movement"},
      {id:"q4",q:"You are checking breathing: what is the maximum time to look, listen, feel?\na) 60 seconds\nb) 10 seconds maximum\nc) There is no time limit"},
    ],
    es:[
      {id:"q1",q:"Encuentras a un compañero inconsciente junto a un panel eléctrico abierto. ¿Cuál es tu primera acción?\na) Sacarlo inmediatamente de la zona\nb) Evaluar el peligro y cortar la corriente antes de acercarte si es posible\nc) Empezar la respiración artificial en el sitio"},
      {id:"q2",q:"La víctima no reacciona ni a la voz ni al dolor. Según la escala AVPU, ¿qué haces inmediatamente después?\na) Pasar a comprobar la vía aérea y la respiración, y pedir ayuda médica\nb) Esperar 10 minutos para ver si despierta\nc) Dejarla sola para ir a buscar un café"},
      {id:"q3",q:"Debes abrir la vía aérea de un inconsciente, pero sospechas una caída con golpe en la cabeza y el cuello. ¿Qué haces?\na) Inclinar fuertemente la cabeza hacia atrás como de costumbre\nb) No hacer nada en absoluto\nc) Adaptar el gesto con extrema precaución, minimizando cualquier movimiento del cuello"},
      {id:"q4",q:"Estás comprobando la respiración: ¿cuál es el tiempo máximo para ver, escuchar, sentir?\na) 60 segundos\nb) 10 segundos como máximo\nc) No hay límite de tiempo"},
    ],
    pt:[
      {id:"q1",q:"Encontras um colega inconsciente junto a um painel elétrico aberto. Qual é a tua primeira ação?\na) Puxá-lo imediatamente para fora da zona\nb) Avaliar o perigo e cortar a corrente antes de te aproximares se possível\nc) Começar a respiração artificial no local"},
      {id:"q2",q:"A vítima não reage nem à voz nem à dor. Segundo a escala AVPU, o que fazes imediatamente a seguir?\na) Passar a verificar a via aérea e a respiração, e pedir ajuda médica\nb) Esperar 10 minutos para ver se acorda\nc) Deixá-la sozinha para ir buscar um café"},
      {id:"q3",q:"Precisas de abrir a via aérea de um inconsciente, mas suspeitas de uma queda com impacto na cabeça e no pescoço. O que fazes?\na) Inclinar fortemente a cabeça para trás como de costume\nb) Não fazer nada\nc) Adaptar o gesto com extrema precaução, minimizando qualquer movimento do pescoço"},
      {id:"q4",q:"Estás a verificar a respiração: qual é o tempo máximo para ver, ouvir, sentir?\na) 60 segundos\nb) 10 segundos no máximo\nc) Não há limite de tempo"},
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

// ACCIDENT CASE - COMPOSITE CASE (THE SECOND CASUALTY)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Le Second Blessé",teaser:"Cas composite basé sur des schémas récurrents en mer - un sauveteur devenu victime",
      what:"Un membre d'équipage tombe dans la cale d'un espace de stockage après avoir été retrouvé inconscient au sol. Un collègue, voyant la scène depuis l'écoutille, descend immédiatement par l'échelle pour lui porter secours, sans vérifier l'atmosphère du compartiment. Quelques secondes plus tard, le sauveteur perd connaissance à son tour. Ce schéma - descendre vite sans évaluer le danger d'abord - revient régulièrement dans les rapports d'incidents en espace confiné à bord des navires.",
      cause:"• Aucune vérification de l'atmosphère avant d'entrer dans l'espace confiné\n• Réflexe d'urgence (aller vite) ayant pris le pas sur l'étape Danger du DRABC\n• Aucun surveillant resté à l'extérieur pour donner l'alerte ou empêcher une deuxième entrée\n• Intention excellente (porter secours), méthode absente (évaluer avant d'agir)",
      lessons:"✓ Le réflexe de vouloir aider vite est normal, mais il doit toujours passer par l'étape Danger en premier\n✓ Un espace confiné peut sembler sûr sans l'être : l'absence d'oxygène ne se voit pas\n✓ Un sauveteur qui devient une deuxième victime aggrave la situation au lieu de la résoudre\n✓ Every casualty has two patients : la victime, et le sauveteur qui doit rester en sécurité pour pouvoir aider",
      link:"🔗 Ce cas illustre directement la règle des deux patients introduite dans cette leçon : Protect vient toujours avant Act."},
    en:{title:"Case Study - The Second Casualty",teaser:"Composite case based on recurring patterns at sea - a rescuer who became a victim",
      what:"A crew member falls in a storage hold after being found unconscious on the floor. A colleague, seeing the scene from the hatch, immediately climbs down the ladder to help, without checking the compartment's atmosphere. A few seconds later, the rescuer loses consciousness too. This pattern - rushing down without assessing danger first - recurs regularly in confined-space incident reports aboard ships.",
      cause:"• No atmosphere check before entering the confined space\n• The urge to act fast overriding the Danger step of DRABC\n• No stand-by person left outside to raise the alarm or prevent a second entry\n• Good intention (helping), missing method (assessing before acting)",
      lessons:"✓ The instinct to help fast is normal, but it must always go through the Danger step first\n✓ A confined space can look safe without being safe: lack of oxygen is invisible\n✓ A rescuer who becomes a second casualty worsens the situation instead of resolving it\n✓ Every casualty has two patients: the victim, and the rescuer who must stay safe to be able to help",
      link:"🔗 This case directly illustrates the two-patients rule introduced in this lesson: Protect always comes before Act."},
    es:{title:"Caso de estudio - La Segunda Víctima",teaser:"Caso compuesto basado en patrones recurrentes en el mar - un socorrista que se convirtió en víctima",
      what:"Un miembro de la tripulación cae en una bodega de almacenamiento tras ser encontrado inconsciente en el suelo. Un compañero, al ver la escena desde la escotilla, baja de inmediato por la escalera para ayudar, sin comprobar la atmósfera del compartimento. Segundos después, el socorrista pierde también el conocimiento. Este patrón - bajar rápido sin evaluar el peligro primero - se repite con frecuencia en los informes de incidentes en espacios confinados a bordo.",
      cause:"• Ninguna comprobación de la atmósfera antes de entrar en el espacio confinado\n• El impulso de actuar rápido superó el paso Danger del DRABC\n• Ningún vigilante quedó fuera para dar la alarma o impedir una segunda entrada\n• Buena intención (ayudar), método ausente (evaluar antes de actuar)",
      lessons:"✓ El instinto de ayudar rápido es normal, pero siempre debe pasar primero por el paso Danger\n✓ Un espacio confinado puede parecer seguro sin serlo: la falta de oxígeno es invisible\n✓ Un socorrista que se convierte en segunda víctima empeora la situación en lugar de resolverla\n✓ Every casualty has two patients: la víctima, y el socorrista que debe mantenerse seguro para poder ayudar",
      link:"🔗 Este caso ilustra directamente la regla de los dos pacientes presentada en esta lección: Protect siempre viene antes que Act."},
    pt:{title:"Caso de estudo - A Segunda Vítima",teaser:"Caso composto baseado em padrões recorrentes no mar - um socorrista que se tornou vítima",
      what:"Um tripulante cai num porão de armazenamento depois de ser encontrado inconsciente no chão. Um colega, ao ver a cena a partir da escotilha, desce imediatamente pela escada para ajudar, sem verificar a atmosfera do compartimento. Segundos depois, o socorrista perde também os sentidos. Este padrão - descer depressa sem avaliar o perigo primeiro - repete-se com frequência nos relatórios de incidentes em espaços confinados a bordo.",
      cause:"• Nenhuma verificação da atmosfera antes de entrar no espaço confinado\n• O impulso de agir depressa sobrepôs-se ao passo Danger do DRABC\n• Nenhum vigia ficou no exterior para dar o alarme ou impedir uma segunda entrada\n• Boa intenção (ajudar), método ausente (avaliar antes de agir)",
      lessons:"✓ O instinto de ajudar depressa é normal, mas deve sempre passar primeiro pelo passo Danger\n✓ Um espaço confinado pode parecer seguro sem o ser: a falta de oxigénio é invisível\n✓ Um socorrista que se torna uma segunda vítima agrava a situação em vez de a resolver\n✓ Every casualty has two patients: a vítima, e o socorrista que deve manter-se seguro para poder ajudar",
      link:"🔗 Este caso ilustra diretamente a regra dos dois pacientes apresentada nesta lição: Protect vem sempre antes de Act."},
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
    {q:"Que signifie le 'D' de DRABC, et pourquoi vient-il en premier ?",opts:["Douleur - car il faut d'abord évaluer la souffrance","Danger - car vérifier la sécurité de la scène évite de créer une deuxième victime","Diagnostic - car il faut identifier la maladie avant tout","Dispatch - car il faut d'abord appeler les secours"],correct:1,expl:"Le Danger est vérifié en premier car agir sans évaluer la scène peut transformer le sauveteur en une deuxième victime."},
    {q:"Un collègue se précipite vers un inconscient situé près d'une machine encore en marche, sans rien vérifier. Quelle erreur commet-il ?",opts:["Aucune, il agit vite et c'est bien","Il saute l'étape Danger, au risque de devenir lui-même une victime","Il aurait dû commencer par la respiration","Il aurait dû appeler le Capitaine avant tout"],correct:1,expl:"Foncer sans vérifier le danger est l'erreur la plus fréquente et la plus grave dans une situation d'urgence."},
    {q:"Pourquoi utilise-t-on l'échelle AVPU pendant l'étape Réponse ?",opts:["Pour mesurer la tension artérielle","Pour classer rapidement et simplement le niveau de conscience de la victime","Pour compter le nombre de blessures","Pour déterminer l'heure de l'accident"],correct:1,expl:"AVPU (Alerte, Voix, Douleur, Aucune réponse) permet une évaluation rapide et standardisée de la conscience."},
    {q:"Une victime ne réagit que lorsque vous criez fort son nom. Quel niveau AVPU cela représente-t-il ?",opts:["Alerte","Voix","Douleur","Aucune réponse"],correct:1,expl:"Une réaction uniquement à la voix, sans réaction spontanée, correspond au niveau Voix de l'échelle AVPU."},
    {q:"Pourquoi le geste tête basculée / menton soulevé doit-il être adapté ou évité dans certains cas ?",opts:["Il ne doit jamais être adapté","En cas de suspicion de blessure au cou ou au dos, pour éviter d'aggraver une lésion","Il est toujours interdit en mer","Seuls les médecins peuvent le faire"],correct:1,expl:"Un traumatisme cervical suspecté impose une extrême prudence pour ne pas aggraver une lésion de la colonne."},
    {q:"Combien de temps maximum doit durer la vérification de la respiration (voir, écouter, sentir) ?",opts:["60 secondes","Environ 10 secondes maximum","5 minutes","Il n'y a pas de limite"],correct:1,expl:"Une vérification trop longue retarde l'action utile ; 10 secondes suffisent pour un jugement fiable."},
    {q:"Pendant l'étape Circulation, qu'est-ce qui doit être traité en priorité absolue avant tout autre contrôle ?",opts:["La couleur de la peau","Une hémorragie sévère visible","La température corporelle","Le rythme respiratoire"],correct:1,expl:"Une hémorragie sévère peut tuer en quelques minutes ; elle prime sur toute autre vérification de circulation."},
    {q:"Pourquoi l'étape Danger reste-t-elle essentielle même dans une situation qui semble simple ?",opts:["Elle ne l'est pas, on peut la sauter si la scène paraît calme","Un danger peut être présent sans être visible immédiatement : électrique, chimique, structurel","Elle ne concerne que les incendies","Elle ne s'applique qu'aux officiers"],correct:1,expl:"Un danger invisible au premier regard (gaz, électricité, structure instable) reste un danger réel."},
    {q:"Qu'est-ce que la règle 'Every casualty has two patients' ?",opts:["Il y a toujours exactement deux blessés dans un accident","Toute situation de secours implique la victime ET le sauveteur, qui doit rester en sécurité pour pouvoir aider","Il faut toujours appeler deux secouristes","Les deux patients doivent être traités en même temps"],correct:1,expl:"Un sauveteur blessé devient une seconde victime ; c'est pourquoi Protect vient toujours avant Act."},
    {q:"Pourquoi le DRABC est-il toujours exécuté dans le même ordre, jamais dans le désordre ?",opts:["L'ordre n'a aucune importance réelle","Sauter une étape peut faire traiter le mauvais problème en premier, ou ignorer un danger","C'est une tradition sans justification pratique","Seul l'ordre alphabétique compte"],correct:1,expl:"Chaque étape dépend de la précédente ; changer l'ordre peut faire manquer un danger ou traiter un mauvais problème en premier."},
    {q:"Une victime ne répond ni à la voix ni à la douleur. Quelle est la bonne action immédiate suivante ?",opts:["Attendre qu'elle se réveille seule","Passer à la vérification des voies aériennes et de la respiration, et demander de l'aide médicale sans délai","La laisser en position et revenir plus tard","Commencer immédiatement un massage cardiaque sans vérifier la respiration"],correct:1,expl:"L'absence totale de réponse impose de poursuivre le DRABC sans délai et de déclencher l'alerte médicale."},
    {q:"Dans le cas d'étude du Second Blessé (espace confiné), quelle étape critique a été omise ?",opts:["La vérification de l'identité de la victime","La vérification de l'atmosphère et du danger avant d'entrer dans l'espace","Le remplissage du rapport d'incident","La vérification de la météo"],correct:1,expl:"Le sauveteur est descendu sans vérifier l'atmosphère, ce qui l'a transformé en deuxième victime."},
    {q:"Pourquoi un surveillant doit-il rester à l'extérieur d'un espace confiné pendant une intervention ?",opts:["Ce n'est pas nécessaire si le sauveteur est expérimenté","Pour donner l'alerte ou empêcher une deuxième entrée si la situation tourne mal","Pour prendre des photos de la scène","Pour surveiller le matériel resté sur le pont"],correct:1,expl:"Un surveillant extérieur est la seule protection si le premier sauveteur devient lui-même une victime."},
    {q:"Quel est l'objectif principal du bilan primaire (DRABC) ?",opts:["Traiter immédiatement toutes les blessures visibles","Évaluer la situation de façon méthodique et dans le bon ordre avant toute action de traitement","Identifier le responsable de l'accident","Calculer le temps d'arrivée des secours"],correct:1,expl:"Le DRABC est une méthode d'évaluation, pas de traitement : il structure la prise d'information avant d'agir."},
    {q:"Selon le MAP Medical Mindset, que faire une fois la victime surveillée et stabilisée ?",opts:["Considérer que la mission est terminée","Assurer le relais vers un niveau de soin supérieur (radio-médecin, MEDEVAC, hôpital) - ne jamais s'arrêter à la stabilisation","Retourner immédiatement au travail habituel","Ne rien noter, la mémoire suffit"],correct:1,expl:"Handover est une étape à part entière : la stabilisation n'est jamais une fin en soi."},
  ],
  en:[
    {q:"What does the 'D' in DRABC stand for, and why does it come first?",opts:["Diagnosis - because the illness must be identified first","Danger - because checking the scene's safety prevents creating a second casualty","Dispatch - because emergency services must be called first","Dressing - because wounds must be covered first"],correct:1,expl:"Danger is checked first because acting without assessing the scene can turn the rescuer into a second casualty."},
    {q:"A colleague rushes to an unconscious casualty near still-running machinery without checking anything first. What mistake is this?",opts:["None, acting fast is always correct","Skipping the Danger step, risking becoming a casualty themselves","They should have started with breathing","They should have called the Captain first"],correct:1,expl:"Rushing in without checking for danger is the most frequent and serious mistake in an emergency."},
    {q:"Why is the AVPU scale used during the Response step?",opts:["To measure blood pressure","To quickly and simply classify the casualty's level of consciousness","To count the number of injuries","To determine the time of the accident"],correct:1,expl:"AVPU (Alert, Voice, Pain, Unresponsive) allows a fast, standardized assessment of consciousness."},
    {q:"A casualty only reacts when you shout their name loudly. Which AVPU level is this?",opts:["Alert","Voice","Pain","Unresponsive"],correct:1,expl:"Reacting only to voice, with no spontaneous reaction, matches the Voice level of the AVPU scale."},
    {q:"Why must the head-tilt chin-lift motion be adapted or avoided in some cases?",opts:["It should never be adapted","When a neck or spinal injury is suspected, to avoid worsening the injury","It is always forbidden at sea","Only doctors are allowed to perform it"],correct:1,expl:"A suspected spinal injury requires extreme care to avoid worsening a spinal injury."},
    {q:"What is the maximum time for checking breathing (look, listen, feel)?",opts:["60 seconds","About 10 seconds maximum","5 minutes","There is no limit"],correct:1,expl:"An overly long check delays useful action; 10 seconds is enough for a reliable judgment."},
    {q:"During the Circulation step, what must be treated as absolute priority before any other check?",opts:["Skin color","Severe visible bleeding","Body temperature","Breathing rate"],correct:1,expl:"Severe bleeding can kill within minutes; it takes priority over any other circulation check."},
    {q:"Why does the Danger step remain essential even in a situation that seems simple?",opts:["It isn't, it can be skipped if the scene looks calm","A danger can be present without being immediately visible: electrical, chemical, structural","It only concerns fires","It only applies to officers"],correct:1,expl:"A danger invisible at first glance (gas, electricity, unstable structure) remains a real danger."},
    {q:"What is the 'Every casualty has two patients' rule?",opts:["There are always exactly two injured people in an accident","Every rescue situation involves the victim AND the rescuer, who must stay safe to be able to help","Two rescuers must always be called","Both patients must be treated at the same time"],correct:1,expl:"An injured rescuer becomes a second casualty; this is why Protect always comes before Act."},
    {q:"Why is DRABC always performed in the same order, never out of sequence?",opts:["The order has no real importance","Skipping a step can lead to treating the wrong problem first, or missing a danger","It's a tradition with no practical justification","Only alphabetical order matters"],correct:1,expl:"Each step depends on the previous one; changing the order can cause a missed danger or a wrongly prioritized action."},
    {q:"A casualty responds neither to voice nor to pain. What is the correct next immediate action?",opts:["Wait for them to wake up on their own","Move on to checking airway and breathing, and call for medical assistance without delay","Leave them in position and come back later","Start chest compressions immediately without checking breathing"],correct:1,expl:"A total lack of response means DRABC must continue without delay and medical assistance must be raised."},
    {q:"In the Second Casualty case study (confined space), which critical step was missing?",opts:["Checking the casualty's identity","Checking the atmosphere and danger before entering the space","Filling out the incident report","Checking the weather"],correct:1,expl:"The rescuer went down without checking the atmosphere, which turned them into a second casualty."},
    {q:"Why must a stand-by person remain outside a confined space during a rescue?",opts:["It isn't necessary if the rescuer is experienced","To raise the alarm or prevent a second entry if things go wrong","To take photos of the scene","To watch equipment left on deck"],correct:1,expl:"An outside stand-by person is the only protection if the first rescuer becomes a casualty themselves."},
    {q:"What is the main objective of the Primary Survey (DRABC)?",opts:["Immediately treat every visible injury","Assess the situation methodically and in the right order before any treatment action","Identify who is responsible for the accident","Calculate the arrival time of rescue services"],correct:1,expl:"DRABC is an assessment method, not treatment: it structures information gathering before acting."},
    {q:"According to the MAP Medical Mindset, what should you do once the casualty is monitored and stabilized?",opts:["Consider the mission complete","Ensure handover to a higher level of care (radio-medical, MEDEVAC, hospital) - never stop at stabilization","Return immediately to normal duties","No need to record anything, memory is enough"],correct:1,expl:"Handover is a full step in itself: stabilization is never an endpoint."},
  ],
  es:[
    {q:"¿Qué significa la 'D' de DRABC, y por qué va primero?",opts:["Diagnóstico - porque hay que identificar la enfermedad primero","Peligro - porque comprobar la seguridad de la escena evita crear una segunda víctima","Despacho - porque hay que llamar primero a emergencias","Vendaje - porque hay que cubrir las heridas primero"],correct:1,expl:"El Peligro se comprueba primero porque actuar sin evaluar la escena puede convertir al socorrista en una segunda víctima."},
    {q:"Un compañero corre hacia un inconsciente cerca de maquinaria todavía en marcha sin comprobar nada. ¿Qué error comete?",opts:["Ninguno, actuar rápido siempre es correcto","Se salta el paso Danger, arriesgándose a convertirse él mismo en víctima","Debería haber empezado por la respiración","Debería haber llamado primero al Capitán"],correct:1,expl:"Correr sin comprobar el peligro es el error más frecuente y grave en una emergencia."},
    {q:"¿Por qué se usa la escala AVPU durante el paso Response?",opts:["Para medir la presión arterial","Para clasificar rápida y sencillamente el nivel de conciencia de la víctima","Para contar el número de heridas","Para determinar la hora del accidente"],correct:1,expl:"AVPU (Alerta, Voz, Dolor, Sin respuesta) permite una evaluación rápida y estandarizada de la conciencia."},
    {q:"Una víctima solo reacciona cuando gritas fuerte su nombre. ¿Qué nivel AVPU representa esto?",opts:["Alerta","Voz","Dolor","Sin respuesta"],correct:1,expl:"Reaccionar solo a la voz, sin reacción espontánea, corresponde al nivel Voz de la escala AVPU."},
    {q:"¿Por qué el gesto de inclinar la cabeza y levantar el mentón debe adaptarse o evitarse en algunos casos?",opts:["Nunca debe adaptarse","Ante sospecha de lesión cervical o de espalda, para no agravar la lesión","Siempre está prohibido en el mar","Solo los médicos pueden hacerlo"],correct:1,expl:"Una sospecha de lesión cervical exige extrema precaución para no agravar una lesión de columna."},
    {q:"¿Cuál es el tiempo máximo para comprobar la respiración (ver, escuchar, sentir)?",opts:["60 segundos","Unos 10 segundos como máximo","5 minutos","No hay límite"],correct:1,expl:"Una comprobación demasiado larga retrasa la acción útil; 10 segundos bastan para un juicio fiable."},
    {q:"Durante el paso Circulation, ¿qué debe tratarse con prioridad absoluta antes de cualquier otra comprobación?",opts:["El color de la piel","Una hemorragia grave visible","La temperatura corporal","El ritmo respiratorio"],correct:1,expl:"Una hemorragia grave puede matar en minutos; tiene prioridad sobre cualquier otra comprobación de circulación."},
    {q:"¿Por qué el paso Danger sigue siendo esencial incluso en una situación que parece simple?",opts:["No lo es, se puede saltar si la escena parece tranquila","Un peligro puede estar presente sin ser visible de inmediato: eléctrico, químico, estructural","Solo concierne a los incendios","Solo aplica a los oficiales"],correct:1,expl:"Un peligro invisible a primera vista (gas, electricidad, estructura inestable) sigue siendo un peligro real."},
    {q:"¿Qué es la regla 'Every casualty has two patients'?",opts:["Siempre hay exactamente dos heridos en un accidente","Toda situación de rescate implica a la víctima Y al socorrista, que debe mantenerse seguro para poder ayudar","Siempre hay que llamar a dos socorristas","Ambos pacientes deben tratarse al mismo tiempo"],correct:1,expl:"Un socorrista herido se convierte en una segunda víctima; por eso Protect siempre va antes que Act."},
    {q:"¿Por qué el DRABC se ejecuta siempre en el mismo orden, nunca desordenado?",opts:["El orden no tiene ninguna importancia real","Saltarse un paso puede hacer que se trate primero el problema equivocado, o pasar por alto un peligro","Es una tradición sin justificación práctica","Solo importa el orden alfabético"],correct:1,expl:"Cada paso depende del anterior; cambiar el orden puede hacer que se pase por alto un peligro o se priorice mal una acción."},
    {q:"Una víctima no responde ni a la voz ni al dolor. ¿Cuál es la acción inmediata correcta siguiente?",opts:["Esperar a que despierte sola","Pasar a comprobar vía aérea y respiración, y pedir ayuda médica sin demora","Dejarla en posición y volver más tarde","Empezar compresiones torácicas de inmediato sin comprobar la respiración"],correct:1,expl:"La ausencia total de respuesta obliga a continuar el DRABC sin demora y a activar la ayuda médica."},
    {q:"En el caso de estudio de la Segunda Víctima (espacio confinado), ¿qué paso crítico faltó?",opts:["Comprobar la identidad de la víctima","Comprobar la atmósfera y el peligro antes de entrar en el espacio","Rellenar el informe de incidente","Comprobar el tiempo meteorológico"],correct:1,expl:"El socorrista bajó sin comprobar la atmósfera, lo que lo convirtió en una segunda víctima."},
    {q:"¿Por qué un vigilante debe permanecer fuera de un espacio confinado durante un rescate?",opts:["No es necesario si el socorrista tiene experiencia","Para dar la alarma o impedir una segunda entrada si algo sale mal","Para fotografiar la escena","Para vigilar el equipo dejado en cubierta"],correct:1,expl:"Un vigilante en el exterior es la única protección si el primer socorrista se convierte él mismo en víctima."},
    {q:"¿Cuál es el objetivo principal del bilan primario (DRABC)?",opts:["Tratar de inmediato todas las heridas visibles","Evaluar la situación de forma metódica y en el orden correcto antes de cualquier tratamiento","Identificar al responsable del accidente","Calcular el tiempo de llegada de los servicios de rescate"],correct:1,expl:"El DRABC es un método de evaluación, no de tratamiento: estructura la recogida de información antes de actuar."},
    {q:"Según el MAP Medical Mindset, ¿qué hacer una vez que la víctima está vigilada y estabilizada?",opts:["Considerar la misión terminada","Asegurar el relevo hacia un nivel de cuidado superior (radio-médico, MEDEVAC, hospital) - nunca detenerse en la estabilización","Volver de inmediato al trabajo habitual","No anotar nada, la memoria basta"],correct:1,expl:"Handover es una etapa por derecho propio: la estabilización nunca es un punto final."},
  ],
  pt:[
    {q:"O que significa o 'D' de DRABC, e por que vem primeiro?",opts:["Diagnóstico - porque é preciso identificar a doença primeiro","Perigo - porque verificar a segurança da cena evita criar uma segunda vítima","Despacho - porque é preciso chamar primeiro os socorros","Penso - porque é preciso cobrir as feridas primeiro"],correct:1,expl:"O Perigo é verificado primeiro porque agir sem avaliar a cena pode transformar o socorrista numa segunda vítima."},
    {q:"Um colega corre para um inconsciente perto de maquinaria ainda em funcionamento sem verificar nada. Que erro comete?",opts:["Nenhum, agir depressa está sempre certo","Salta o passo Danger, arriscando-se a tornar-se ele próprio vítima","Devia ter começado pela respiração","Devia ter chamado primeiro o Comandante"],correct:1,expl:"Correr sem verificar o perigo é o erro mais frequente e grave numa emergência."},
    {q:"Por que se usa a escala AVPU durante o passo Response?",opts:["Para medir a pressão arterial","Para classificar rápida e simplesmente o nível de consciência da vítima","Para contar o número de ferimentos","Para determinar a hora do acidente"],correct:1,expl:"AVPU (Alerta, Voz, Dor, Sem resposta) permite uma avaliação rápida e padronizada da consciência."},
    {q:"Uma vítima só reage quando gritas alto o seu nome. Que nível AVPU representa isto?",opts:["Alerta","Voz","Dor","Sem resposta"],correct:1,expl:"Reagir apenas à voz, sem reação espontânea, corresponde ao nível Voz da escala AVPU."},
    {q:"Por que o gesto de inclinar a cabeça e levantar o queixo deve ser adaptado ou evitado em alguns casos?",opts:["Nunca deve ser adaptado","Perante suspeita de lesão no pescoço ou nas costas, para não agravar a lesão","Está sempre proibido no mar","Só os médicos podem fazê-lo"],correct:1,expl:"Uma suspeita de lesão cervical exige extrema precaução para não agravar uma lesão na coluna."},
    {q:"Qual é o tempo máximo para verificar a respiração (ver, ouvir, sentir)?",opts:["60 segundos","Cerca de 10 segundos no máximo","5 minutos","Não há limite"],correct:1,expl:"Uma verificação demasiado longa atrasa a ação útil; 10 segundos bastam para um julgamento fiável."},
    {q:"Durante o passo Circulation, o que deve ser tratado com prioridade absoluta antes de qualquer outra verificação?",opts:["A cor da pele","Uma hemorragia grave visível","A temperatura corporal","O ritmo respiratório"],correct:1,expl:"Uma hemorragia grave pode matar em minutos; tem prioridade sobre qualquer outra verificação de circulação."},
    {q:"Por que o passo Danger continua essencial mesmo numa situação que parece simples?",opts:["Não continua, pode ser saltado se a cena parecer calma","Um perigo pode estar presente sem ser imediatamente visível: elétrico, químico, estrutural","Só diz respeito a incêndios","Só se aplica a oficiais"],correct:1,expl:"Um perigo invisível à primeira vista (gás, eletricidade, estrutura instável) continua a ser um perigo real."},
    {q:"O que é a regra 'Every casualty has two patients'?",opts:["Há sempre exatamente dois feridos num acidente","Toda a situação de socorro envolve a vítima E o socorrista, que deve manter-se seguro para poder ajudar","Devem ser sempre chamados dois socorristas","Ambos os pacientes devem ser tratados ao mesmo tempo"],correct:1,expl:"Um socorrista ferido torna-se uma segunda vítima; por isso Protect vem sempre antes de Act."},
    {q:"Por que o DRABC é sempre executado pela mesma ordem, nunca fora de sequência?",opts:["A ordem não tem qualquer importância real","Saltar um passo pode levar a tratar primeiro o problema errado, ou a ignorar um perigo","É uma tradição sem justificação prática","Só importa a ordem alfabética"],correct:1,expl:"Cada passo depende do anterior; mudar a ordem pode levar a ignorar um perigo ou a priorizar mal uma ação."},
    {q:"Uma vítima não responde nem à voz nem à dor. Qual é a ação imediata correta seguinte?",opts:["Esperar que acorde sozinha","Passar a verificar a via aérea e a respiração, e pedir ajuda médica sem demora","Deixá-la na posição e voltar mais tarde","Começar compressões torácicas de imediato sem verificar a respiração"],correct:1,expl:"A ausência total de resposta obriga a continuar o DRABC sem demora e a acionar a ajuda médica."},
    {q:"No caso de estudo da Segunda Vítima (espaço confinado), que passo crítico faltou?",opts:["Verificar a identidade da vítima","Verificar a atmosfera e o perigo antes de entrar no espaço","Preencher o relatório de incidente","Verificar o estado do tempo"],correct:1,expl:"O socorrista desceu sem verificar a atmosfera, o que o transformou numa segunda vítima."},
    {q:"Por que um vigia deve permanecer fora de um espaço confinado durante um resgate?",opts:["Não é necessário se o socorrista tiver experiência","Para dar o alarme ou impedir uma segunda entrada se algo correr mal","Para fotografar a cena","Para vigiar o equipamento deixado no convés"],correct:1,expl:"Um vigia no exterior é a única proteção caso o primeiro socorrista se torne ele próprio vítima."},
    {q:"Qual é o objetivo principal do exame primário (DRABC)?",opts:["Tratar de imediato todos os ferimentos visíveis","Avaliar a situação de forma metódica e pela ordem certa antes de qualquer tratamento","Identificar o responsável pelo acidente","Calcular o tempo de chegada dos socorros"],correct:1,expl:"O DRABC é um método de avaliação, não de tratamento: estrutura a recolha de informação antes de agir."},
    {q:"Segundo o MAP Medical Mindset, o que fazer assim que a vítima está monitorizada e estabilizada?",opts:["Considerar a missão terminada","Assegurar a transferência para um nível de cuidado superior (rádio-médico, MEDEVAC, hospital) - nunca parar na estabilização","Voltar de imediato ao trabalho habitual","Não é preciso anotar nada, a memória basta"],correct:1,expl:"Handover é uma etapa de pleno direito: a estabilização nunca é um ponto final."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
export const QUIZ = {
  fr:[
    {q:"Que faut-il toujours vérifier en premier, avant tout geste de secourisme ?",opts:["La respiration","Le Danger de la scène","Le pouls","L'identité de la victime"],correct:1,expl:"Le Danger est la toute première étape du DRABC : sans elle, le sauveteur risque de devenir une deuxième victime."},
    {q:"Que signifie la règle 'Every casualty has two patients' ?",opts:["Il y a toujours deux blessés","La victime et le sauveteur comptent tous les deux : le sauveteur doit rester en sécurité","Il faut appeler deux secouristes","Les blessures sont toujours doubles"],correct:1,expl:"Protect vient avant Act précisément parce qu'un sauveteur blessé aggrave la situation."},
    {q:"Une victime ne réagit ni à la voix ni à la douleur (AVPU = Aucune réponse). Que faire ?",opts:["Attendre son réveil","Poursuivre vers voies aériennes/respiration et appeler de l'aide médicale sans délai","Noter l'heure et repartir","Lui donner à boire"],correct:1,expl:"L'absence totale de réponse impose de continuer le DRABC et de déclencher l'alerte médicale immédiatement."},
    {q:"Combien de temps maximum pour vérifier la respiration (voir, écouter, sentir) ?",opts:["10 secondes maximum","1 minute","5 minutes","Pas de limite"],correct:0,expl:"10 secondes suffisent pour un jugement fiable, sans retarder l'action utile."},
    {q:"Dans le cas d'étude du Second Blessé, quelle erreur a transformé le sauveteur en victime ?",opts:["Il portait les mauvais gants","Il est entré dans l'espace confiné sans vérifier l'atmosphère","Il a appelé le Capitaine trop tard","Il n'a pas noté l'heure de l'accident"],correct:1,expl:"L'étape Danger a été sautée : entrer sans vérifier l'atmosphère a créé une deuxième victime."},
  ],
  en:[
    {q:"What must always be checked first, before any first aid action?",opts:["Breathing","The Danger of the scene","Pulse","The casualty's identity"],correct:1,expl:"Danger is the very first step of DRABC: without it, the rescuer risks becoming a second casualty."},
    {q:"What does the 'Every casualty has two patients' rule mean?",opts:["There are always two injured people","Both the victim and the rescuer matter: the rescuer must stay safe","Two rescuers must be called","Injuries are always doubled"],correct:1,expl:"Protect comes before Act precisely because an injured rescuer makes the situation worse."},
    {q:"A casualty reacts neither to voice nor to pain (AVPU = Unresponsive). What do you do?",opts:["Wait for them to wake up","Continue to airway/breathing and call for medical assistance without delay","Note the time and leave","Give them something to drink"],correct:1,expl:"A total lack of response requires continuing DRABC and raising the medical alert immediately."},
    {q:"What is the maximum time to check breathing (look, listen, feel)?",opts:["10 seconds maximum","1 minute","5 minutes","No limit"],correct:0,expl:"10 seconds is enough for a reliable judgment, without delaying useful action."},
    {q:"In the Second Casualty case study, what mistake turned the rescuer into a victim?",opts:["They wore the wrong gloves","They entered the confined space without checking the atmosphere","They called the Captain too late","They failed to record the time of the accident"],correct:1,expl:"The Danger step was skipped: entering without checking the atmosphere created a second casualty."},
  ],
  es:[
    {q:"¿Qué debe comprobarse siempre primero, antes de cualquier acción de primeros auxilios?",opts:["La respiración","El Peligro de la escena","El pulso","La identidad de la víctima"],correct:1,expl:"El Peligro es el primer paso del DRABC: sin él, el socorrista corre el riesgo de convertirse en una segunda víctima."},
    {q:"¿Qué significa la regla 'Every casualty has two patients'?",opts:["Siempre hay dos heridos","La víctima y el socorrista importan por igual: el socorrista debe mantenerse seguro","Hay que llamar a dos socorristas","Las lesiones siempre son dobles"],correct:1,expl:"Protect va antes que Act precisamente porque un socorrista herido empeora la situación."},
    {q:"Una víctima no reacciona ni a la voz ni al dolor (AVPU = Sin respuesta). ¿Qué hacer?",opts:["Esperar a que despierte","Continuar hacia vía aérea/respiración y pedir ayuda médica sin demora","Anotar la hora e irse","Darle de beber"],correct:1,expl:"La ausencia total de respuesta exige continuar el DRABC y activar la alerta médica de inmediato."},
    {q:"¿Cuál es el tiempo máximo para comprobar la respiración (ver, escuchar, sentir)?",opts:["10 segundos como máximo","1 minuto","5 minutos","Sin límite"],correct:0,expl:"10 segundos bastan para un juicio fiable, sin retrasar la acción útil."},
    {q:"En el caso de estudio de la Segunda Víctima, ¿qué error convirtió al socorrista en víctima?",opts:["Llevaba los guantes equivocados","Entró en el espacio confinado sin comprobar la atmósfera","Llamó al Capitán demasiado tarde","No anotó la hora del accidente"],correct:1,expl:"Se saltó el paso Danger: entrar sin comprobar la atmósfera creó una segunda víctima."},
  ],
  pt:[
    {q:"O que deve ser sempre verificado primeiro, antes de qualquer ação de primeiros socorros?",opts:["A respiração","O Perigo da cena","O pulso","A identidade da vítima"],correct:1,expl:"O Perigo é o primeiro passo do DRABC: sem ele, o socorrista arrisca-se a tornar-se numa segunda vítima."},
    {q:"O que significa a regra 'Every casualty has two patients'?",opts:["Há sempre dois feridos","A vítima e o socorrista importam igualmente: o socorrista deve manter-se seguro","Devem ser chamados dois socorristas","Os ferimentos são sempre duplos"],correct:1,expl:"Protect vem antes de Act precisamente porque um socorrista ferido agrava a situação."},
    {q:"Uma vítima não reage nem à voz nem à dor (AVPU = Sem resposta). O que fazer?",opts:["Esperar que acorde","Continuar para via aérea/respiração e pedir ajuda médica sem demora","Anotar a hora e sair","Dar-lhe algo para beber"],correct:1,expl:"A ausência total de resposta exige continuar o DRABC e acionar o alerta médico de imediato."},
    {q:"Qual é o tempo máximo para verificar a respiração (ver, ouvir, sentir)?",opts:["10 segundos no máximo","1 minuto","5 minutos","Sem limite"],correct:0,expl:"10 segundos bastam para um julgamento fiável, sem atrasar a ação útil."},
    {q:"No caso de estudo da Segunda Vítima, que erro transformou o socorrista em vítima?",opts:["Usava as luvas erradas","Entrou no espaço confinado sem verificar a atmosfera","Chamou o Comandante tarde demais","Não registou a hora do acidente"],correct:1,expl:"O passo Danger foi saltado: entrar sem verificar a atmosfera criou uma segunda vítima."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Repense a la derniere fois ou tu es entre en urgence dans un espace inconnu a bord. As-tu vraiment pris le temps d'observer le danger avant d'agir, ou ton reflexe a-t-il ete de foncer ?",
    en:"Think back to the last time you rushed into an unfamiliar space on board during an emergency. Did you really take the time to observe the danger before acting, or was your instinct to just rush in?",
    es:"Piensa en la ultima vez que entraste con urgencia en un espacio desconocido a bordo. ¿De verdad te tomaste el tiempo de observar el peligro antes de actuar, o tu instinto fue simplemente correr hacia adentro?",
    pt:"Pensa na ultima vez que entraste com urgencia num espaco desconhecido a bordo. Tiraste mesmo tempo para observar o perigo antes de agir, ou o teu instinto foi simplesmente avancar?",
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
      badge:"🩺 Safety · STCW First Aid · Leçon 1/8 · ⭐ Premium",
      title:"Scene Safety & Primary Survey (DRABC)",
      intro:"Avant de soigner, il faut évaluer. Cette leçon pose la première pierre de tout le module Secourisme STCW : la méthode DRABC, qui structure les toutes premières secondes face à une victime, avant même de penser au traitement.",
      p0:"AVANT DE SOIGNER, ÉVALUER",s0t:"Le geste qui précède tous les autres",
      s0:"Chaque geste de secourisme commence de la même façon : pas par le traitement, mais par l'évaluation. Le bilan primaire, DRABC, existe car agir avant d'évaluer peut transformer un blessé en deux, ou gaspiller les seules minutes qui comptent.\n\nCOMMENT LE RECONNAÎTRE ? Toute situation où une personne est trouvée blessée, inconsciente ou en détresse impose ce même point de départ, sans exception.\nQUE FAIRE IMMÉDIATEMENT ? Suivre DRABC dans l'ordre, sans en sauter une étape.\nQUELLE ERREUR L'AGGRAVE ? Croire qu'on sait déjà ce qui ne va pas avant d'avoir réellement vérifié.\nQUAND DEMANDER DE L'AIDE MÉDICALE ? Dès que la victime ne répond pas normalement, ou dès le moindre doute sur son état.",
      p1:"LA SÉQUENCE DRABC",s1t:"Cinq lettres, un ordre qui ne change jamais",
      s1:"Danger, Réponse, Voies aériennes, Breathing (respiration), Circulation. Chaque étape dépend de la précédente : sauter l'une d'elles peut faire manquer un danger réel ou traiter le mauvais problème en premier.",
      p2:"EVERY CASUALTY HAS TWO PATIENTS",s2t:"La victime, et le sauveteur",
      s2:"Un sauveteur qui se blesse en voulant aider ne devient pas un héros : il devient une deuxième victime, et complique le sauvetage au lieu de le faciliter. C'est exactement pour cela que Protect vient toujours avant Act dans le MAP Medical Mindset.",
      p3:"RECONNAÎTRE LE DANGER",s3t:"Ce qu'il faut observer avant d'approcher",
      s3:"Électricité, machines en marche, feu, gaz, mer agitée : le danger n'est pas toujours visible au premier regard. Observer la scène quelques secondes avant d'agir peut éviter un deuxième accident.",
      p4:"ÉVALUER LA RÉPONSE - AVPU",s4t:"Alerte, Voix, Douleur, Aucune réponse",
      s4:"AVPU permet de classer en quelques secondes le niveau de conscience d'une victime, sans matériel, juste par l'observation et le contact verbal.",
      p5:"LES 4 QUESTIONS DU MODULE",s5t:"Le cadre permanent de chaque leçon de secourisme",
      s5:"Chaque leçon de ce module répond systématiquement à quatre questions : Comment le reconnaître ? Que faire immédiatement ? Quelle erreur l'aggrave ? Quand demander de l'aide médicale professionnelle ?\n\nCe module ne remplace jamais un médecin, un infirmier ou le TMAS/MEDEVAC. MAP enseigne uniquement la stabilisation initiale.",
      p6:"VOIES AÉRIENNES, RESPIRATION, CIRCULATION",s6t:"Le contrôle rapide qui suit la Réponse",
      s6:"Ouvrir les voies aériennes, vérifier la respiration en 10 secondes maximum, rechercher une hémorragie sévère en priorité : trois gestes rapides qui déterminent l'action suivante.",
      p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"⚠️ CAS D'ÉTUDE",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 1",
      sumP:["DRABC : Danger, Réponse, Voies aériennes, Breathing, Circulation, toujours dans cet ordre","Every casualty has two patients : le sauveteur doit rester en sécurité pour pouvoir aider","AVPU classe la conscience en quelques secondes : Alerte, Voix, Douleur, Aucune réponse","Vérifier la respiration ne prend jamais plus de 10 secondes","Ce module enseigne la stabilisation, jamais le remplacement d'un médecin"],
      learnedP:["La méthode DRABC dans l'ordre","La règle des deux patients","L'échelle AVPU","Reconnaître les dangers à bord","Le cadre des 4 questions du module"],
      safetyMsg:"The objective is not to save every casualty. The objective is to give every casualty the best possible chance of survival until professional medical care takes over.",
    },
    en:{
      badge:"🩺 Safety · STCW First Aid · Lesson 1/8 · ⭐ Premium",
      title:"Scene Safety & Primary Survey (DRABC)",
      intro:"Before treating, you must assess. This lesson lays the first stone of the entire STCW First Aid module: the DRABC method, which structures the very first seconds facing a casualty, before even thinking about treatment.",
      p0:"BEFORE TREATING, ASSESS",s0t:"The motion that comes before all others",
      s0:"Every first aid action starts the same way: not with treatment, but with assessment. The Primary Survey, DRABC, exists because acting before assessing can turn one casualty into two, or waste the only minutes that matter.\n\nHOW DO I RECOGNIZE IT? Any situation where someone is found injured, unconscious, or in distress calls for this same starting point, without exception.\nWHAT DO I DO IMMEDIATELY? Follow DRABC in order, without skipping a step.\nWHAT MISTAKE MAKES IT WORSE? Assuming you already know what's wrong before you have actually checked.\nWHEN MUST I ASK FOR PROFESSIONAL MEDICAL ASSISTANCE? As soon as the casualty does not respond normally, or at the slightest doubt about their condition.",
      p1:"THE DRABC SEQUENCE",s1t:"Five letters, an order that never changes",
      s1:"Danger, Response, Airway, Breathing, Circulation. Each step depends on the previous one: skipping one can mean missing a real danger or treating the wrong problem first.",
      p2:"EVERY CASUALTY HAS TWO PATIENTS",s2t:"The victim, and the rescuer",
      s2:"A rescuer who gets hurt while trying to help does not become a hero: they become a second casualty, complicating the rescue instead of helping it. This is exactly why Protect always comes before Act in the MAP Medical Mindset.",
      p3:"RECOGNIZING DANGER",s3t:"What to observe before approaching",
      s3:"Electricity, running machinery, fire, gas, rough sea: danger is not always visible at first glance. Observing the scene for a few seconds before acting can prevent a second accident.",
      p4:"ASSESSING RESPONSE - AVPU",s4t:"Alert, Voice, Pain, Unresponsive",
      s4:"AVPU allows classifying a casualty's level of consciousness within seconds, with no equipment, just observation and verbal contact.",
      p5:"THE MODULE'S 4 QUESTIONS",s5t:"The permanent framework of every first aid lesson",
      s5:"Every lesson in this module systematically answers four questions: How do I recognize it? What do I do immediately? What mistake makes it worse? When must I ask for professional medical assistance?\n\nThis module never replaces a doctor, a nurse, or the TMAS/MEDEVAC chain. MAP teaches initial stabilization only.",
      p6:"AIRWAY, BREATHING, CIRCULATION",s6t:"The quick check that follows Response",
      s6:"Open the airway, check breathing within 10 seconds maximum, look for severe bleeding first: three quick actions that determine what comes next.",
      p7:"🎯 OPERATIONAL EXERCISE",p8:"⚠️ CASE STUDY",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 1",
      sumP:["DRABC: Danger, Response, Airway, Breathing, Circulation, always in this order","Every casualty has two patients: the rescuer must stay safe to be able to help","AVPU classifies consciousness in seconds: Alert, Voice, Pain, Unresponsive","Checking breathing never takes more than 10 seconds","This module teaches stabilization, never a replacement for a doctor"],
      learnedP:["The DRABC method in order","The two-patients rule","The AVPU scale","Recognizing dangers on board","The module's 4-question framework"],
      safetyMsg:"The objective is not to save every casualty. The objective is to give every casualty the best possible chance of survival until professional medical care takes over.",
    },
    es:{
      badge:"🩺 Safety · STCW First Aid · Lección 1/8 · ⭐ Premium",
      title:"Scene Safety & Primary Survey (DRABC)",
      intro:"Antes de tratar, hay que evaluar. Esta lección coloca la primera piedra de todo el módulo de Primeros Auxilios STCW: el método DRABC, que estructura los primeros segundos frente a una víctima, incluso antes de pensar en el tratamiento.",
      p0:"ANTES DE TRATAR, EVALUAR",s0t:"El gesto que precede a todos los demás",
      s0:"Toda acción de primeros auxilios empieza igual: no con el tratamiento, sino con la evaluación. El bilan primario, DRABC, existe porque actuar antes de evaluar puede convertir un herido en dos, o desperdiciar los únicos minutos que cuentan.\n\n¿CÓMO RECONOCERLO? Toda situación en la que alguien se encuentra herido, inconsciente o en apuros exige este mismo punto de partida, sin excepción.\n¿QUÉ HACER DE INMEDIATO? Seguir DRABC en orden, sin saltarse ningún paso.\n¿QUÉ ERROR LO AGRAVA? Creer que ya se sabe qué pasa antes de haber comprobado realmente.\n¿CUÁNDO PEDIR AYUDA MÉDICA PROFESIONAL? En cuanto la víctima no responda con normalidad, o ante la menor duda sobre su estado.",
      p1:"LA SECUENCIA DRABC",s1t:"Cinco letras, un orden que nunca cambia",
      s1:"Danger, Response, Airway, Breathing, Circulation. Cada paso depende del anterior: saltarse uno puede hacer que se pase por alto un peligro real o se trate primero el problema equivocado.",
      p2:"EVERY CASUALTY HAS TWO PATIENTS",s2t:"La víctima, y el socorrista",
      s2:"Un socorrista que se lesiona intentando ayudar no se convierte en un héroe: se convierte en una segunda víctima, complicando el rescate en lugar de facilitarlo. Por eso Protect siempre va antes que Act en el MAP Medical Mindset.",
      p3:"RECONOCER EL PELIGRO",s3t:"Qué observar antes de acercarse",
      s3:"Electricidad, maquinaria en marcha, fuego, gas, mar agitado: el peligro no siempre es visible a primera vista. Observar la escena unos segundos antes de actuar puede evitar un segundo accidente.",
      p4:"EVALUAR LA RESPUESTA - AVPU",s4t:"Alerta, Voz, Dolor, Sin respuesta",
      s4:"AVPU permite clasificar en segundos el nivel de conciencia de una víctima, sin material, solo con observación y contacto verbal.",
      p5:"LAS 4 PREGUNTAS DEL MÓDULO",s5t:"El marco permanente de cada lección de primeros auxilios",
      s5:"Cada lección de este módulo responde sistemáticamente a cuatro preguntas: ¿Cómo reconocerlo? ¿Qué hacer de inmediato? ¿Qué error lo agrava? ¿Cuándo pedir ayuda médica profesional?\n\nEste módulo nunca sustituye a un médico, un enfermero o la cadena TMAS/MEDEVAC. MAP enseña únicamente la estabilización inicial.",
      p6:"VÍA AÉREA, RESPIRACIÓN, CIRCULACIÓN",s6t:"La comprobación rápida que sigue a Response",
      s6:"Abrir la vía aérea, comprobar la respiración en 10 segundos como máximo, buscar una hemorragia grave en primer lugar: tres gestos rápidos que determinan la siguiente acción.",
      p7:"🎯 EJERCICIO OPERATIVO",p8:"⚠️ CASO DE ESTUDIO",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 1",
      sumP:["DRABC: Danger, Response, Airway, Breathing, Circulation, siempre en este orden","Every casualty has two patients: el socorrista debe mantenerse seguro para poder ayudar","AVPU clasifica la conciencia en segundos: Alerta, Voz, Dolor, Sin respuesta","Comprobar la respiración nunca lleva más de 10 segundos","Este módulo enseña estabilización, nunca sustituye a un médico"],
      learnedP:["El método DRABC en orden","La regla de los dos pacientes","La escala AVPU","Reconocer peligros a bordo","El marco de las 4 preguntas del módulo"],
      safetyMsg:"The objective is not to save every casualty. The objective is to give every casualty the best possible chance of survival until professional medical care takes over.",
    },
    pt:{
      badge:"🩺 Safety · STCW First Aid · Lição 1/8 · ⭐ Premium",
      title:"Scene Safety & Primary Survey (DRABC)",
      intro:"Antes de tratar, é preciso avaliar. Esta lição lança a primeira pedra de todo o módulo de Primeiros Socorros STCW: o método DRABC, que estrutura os primeiros segundos perante uma vítima, mesmo antes de pensar no tratamento.",
      p0:"ANTES DE TRATAR, AVALIAR",s0t:"O gesto que precede todos os outros",
      s0:"Toda a ação de primeiros socorros começa da mesma forma: não com o tratamento, mas com a avaliação. O exame primário, DRABC, existe porque agir antes de avaliar pode transformar um ferido em dois, ou desperdiçar os únicos minutos que contam.\n\nCOMO RECONHECER? Toda a situação em que alguém é encontrado ferido, inconsciente ou em perigo exige este mesmo ponto de partida, sem exceção.\nO QUE FAZER IMEDIATAMENTE? Seguir o DRABC pela ordem, sem saltar nenhum passo.\nQUE ERRO O AGRAVA? Achar que já se sabe o que se passa antes de ter verificado realmente.\nQUANDO PEDIR AJUDA MÉDICA PROFISSIONAL? Assim que a vítima não responder normalmente, ou perante a mínima dúvida sobre o seu estado.",
      p1:"A SEQUÊNCIA DRABC",s1t:"Cinco letras, uma ordem que nunca muda",
      s1:"Danger, Response, Airway, Breathing, Circulation. Cada passo depende do anterior: saltar um pode significar ignorar um perigo real ou tratar primeiro o problema errado.",
      p2:"EVERY CASUALTY HAS TWO PATIENTS",s2t:"A vítima, e o socorrista",
      s2:"Um socorrista que se magoa ao tentar ajudar não se torna um herói: torna-se uma segunda vítima, complicando o resgate em vez de o facilitar. É exatamente por isso que Protect vem sempre antes de Act no MAP Medical Mindset.",
      p3:"RECONHECER O PERIGO",s3t:"O que observar antes de se aproximar",
      s3:"Eletricidade, maquinaria em funcionamento, fogo, gás, mar agitado: o perigo nem sempre é visível à primeira vista. Observar a cena por alguns segundos antes de agir pode evitar um segundo acidente.",
      p4:"AVALIAR A RESPOSTA - AVPU",s4t:"Alerta, Voz, Dor, Sem resposta",
      s4:"AVPU permite classificar em segundos o nível de consciência de uma vítima, sem material, apenas com observação e contacto verbal.",
      p5:"AS 4 PERGUNTAS DO MÓDULO",s5t:"O quadro permanente de cada lição de primeiros socorros",
      s5:"Cada lição deste módulo responde sistematicamente a quatro perguntas: Como reconhecer? O que fazer imediatamente? Que erro o agrava? Quando pedir ajuda médica profissional?\n\nEste módulo nunca substitui um médico, um enfermeiro ou a cadeia TMAS/MEDEVAC. A MAP ensina apenas a estabilização inicial.",
      p6:"VIA AÉREA, RESPIRAÇÃO, CIRCULAÇÃO",s6t:"A verificação rápida que se segue à Response",
      s6:"Abrir a via aérea, verificar a respiração em 10 segundos no máximo, procurar uma hemorragia grave em primeiro lugar: três gestos rápidos que determinam a ação seguinte.",
      p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"⚠️ CASO DE ESTUDO",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 1",
      sumP:["DRABC: Danger, Response, Airway, Breathing, Circulation, sempre por esta ordem","Every casualty has two patients: o socorrista deve manter-se seguro para poder ajudar","AVPU classifica a consciência em segundos: Alerta, Voz, Dor, Sem resposta","Verificar a respiração nunca demora mais de 10 segundos","Este módulo ensina estabilização, nunca substitui um médico"],
      learnedP:["O método DRABC pela ordem","A regra dos dois pacientes","A escala AVPU","Reconhecer perigos a bordo","O quadro das 4 perguntas do módulo"],
      safetyMsg:"The objective is not to save every casualty. The objective is to give every casualty the best possible chance of survival until professional medical care takes over.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS3_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/8":lang==="en"?"Lesson 1/8":lang==="es"?"Lección 1/8":"Lição 1/8"}</div>
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

            <SL icon="🧭" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🔤" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔤</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔤 {lang==="fr"?"SÉQUENCE DRABC - INTERACTIF":lang==="en"?"DRABC SEQUENCE - INTERACTIVE":lang==="es"?"SECUENCIA DRABC - INTERACTIVO":"SEQUÊNCIA DRABC - INTERATIVO"}</div><DRABCSequenceSVG lang={lang}/></Card>

            <SL icon="🤝" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🤝</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="⚠️" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚠️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚠️ {lang==="fr"?"TYPES DE DANGERS - INTERACTIF":lang==="en"?"DANGER TYPES - INTERACTIVE":lang==="es"?"TIPOS DE PELIGRO - INTERACTIVO":"TIPOS DE PERIGO - INTERATIVO"}</div><DangerTypesSVG lang={lang}/></Card>

            <SL icon="👀" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>👀</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>👀 {lang==="fr"?"ÉCHELLE AVPU - INTERACTIF":lang==="en"?"AVPU SCALE - INTERACTIVE":lang==="es"?"ESCALA AVPU - INTERACTIVO":"ESCALA AVPU - INTERATIVO"}</div><AVPUResponseSVG lang={lang}/></Card>

            <SL icon="📋" text={lc.p5} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📋</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="🌬️" text={lc.p6} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌬️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌬️ {lang==="fr"?"CONTRÔLE RAPIDE ABC - INTERACTIF":lang==="en"?"QUICK ABC CHECK - INTERACTIVE":lang==="es"?"COMPROBACIÓN RÁPIDA ABC - INTERACTIVO":"VERIFICAÇÃO RÁPIDA ABC - INTERATIVO"}</div><ABCQuickCheckSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p8} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p10} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final - Bilan Primaire":lang==="en"?"Final Quiz - Primary Survey":lang==="es"?"Quiz Final - Bilan Primario":"Quiz Final - Exame Primário"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 1/8":"questions · Lesson 1/8"}</div>
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

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 2 - CPR & AED →":lang==="en"?"LESSON 2 - CPR & AED →":lang==="es"?"LECCIÓN 2 - RCP Y DEA →":"LIÇÃO 2 - RCP E DAE →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
