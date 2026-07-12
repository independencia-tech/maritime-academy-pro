import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - PRE-LAUNCH READINESS (EACH CHECK PREVENTS A DIFFERENT CATASTROPHE)
function PreLaunchReadinessSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔌", label:{fr:"Bouchon de vidange",en:"Drain plug",es:"Tapón de achique",pt:"Bujão de esgoto"}, desc:{fr:"Absent ou mal serré, il laisse l'embarcation prendre l'eau dès la mise à flot, souvent sans que personne ne s'en aperçoive immédiatement.",en:"Missing or loose, it lets the boat take on water as soon as it's afloat, often without anyone noticing right away.",es:"Ausente o mal apretado, deja que la embarcación entre agua nada más flotar, a menudo sin que nadie lo note de inmediato.",pt:"Ausente ou mal apertado, deixa a embarcação entrar água assim que fica a flutuar, muitas vezes sem que ninguém repare de imediato."} },
    { id:2, icon:"⚙️", label:{fr:"Moteur testé",en:"Tested engine",es:"Motor probado",pt:"Motor testado"}, desc:{fr:"Un moteur non testé avant l'embarquement rend impossible de s'éloigner du navire au moment critique, exactement quand cela compte le plus.",en:"An untested engine makes it impossible to move away from the ship at the critical moment, exactly when it matters most.",es:"Un motor no probado imposibilita alejarse del buque en el momento crítico, justo cuando más importa.",pt:"Um motor não testado torna impossível afastar-se do navio no momento crítico, exatamente quando mais importa."} },
    { id:3, icon:"🪢", label:{fr:"Sea painter préparé",en:"Sea painter prepared",es:"Sea painter preparado",pt:"Sea painter preparado"}, desc:{fr:"Mal préparé, il crée un problème une fois à l'eau, précisément au moment où l'embarcation doit s'écarter rapidement de la coque.",en:"Poorly prepared, it creates a problem once in the water, precisely when the boat must move quickly away from the hull.",es:"Mal preparado, crea un problema una vez en el agua, justo cuando la embarcación debe alejarse rápidamente del casco.",pt:"Mal preparado, cria um problema uma vez na água, precisamente quando a embarcação deve afastar-se rapidamente do casco."} },
    { id:4, icon:"🪝", label:{fr:"Crochets de largage",en:"Release hooks",es:"Ganchos de largada",pt:"Ganchos de largada"}, desc:{fr:"Non vérifiés ou mal réarmés, ils peuvent se désolidariser de façon imprévue pendant la descente, la cause la plus fréquente d'accidents graves.",en:"Unchecked or poorly reset, they can separate unexpectedly during lowering, the most frequent cause of serious accidents.",es:"No comprobados o mal rearmados, pueden desprenderse inesperadamente durante el descenso, la causa más frecuente de accidentes graves.",pt:"Não verificados ou mal rearmados, podem desprender-se inesperadamente durante a descida, a causa mais frequente de acidentes graves."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Chaque vérification empêche une catastrophe différente, ce n'est jamais une simple formalité.":lang==="en"?"Each check prevents a different catastrophe, never a simple formality.":lang==="es"?"Cada comprobación impide una catástrofe diferente, nunca una simple formalidad.":"Cada verificação impede uma catástrofe diferente, nunca uma simples formalidade."}</div>
    </div>
  );
}

// SVG 2 - BOARDING DISCIPLINE (NORMAL DRILL/PREPARATION CONTEXT, NOT ABANDON SHIP)
function BoardingDisciplineSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔢", label:{fr:"Ordre d'embarquement",en:"Boarding order",es:"Orden de embarque",pt:"Ordem de embarque"}, desc:{fr:"Un ordre défini évite la précipitation et la surcharge d'un côté de l'embarcation pendant l'entrée.",en:"A defined order avoids rushing and overloading one side of the boat while boarding.",es:"Un orden definido evita las prisas y la sobrecarga de un lado de la embarcación al entrar.",pt:"Uma ordem definida evita a pressa e a sobrecarga de um lado da embarcação ao entrar."} },
    { id:2, icon:"🦺", label:{fr:"Harnais et ceintures",en:"Harnesses and seatbelts",es:"Arneses y cinturones",pt:"Arneses e cintos"}, desc:{fr:"Chaque personne sécurisée avant que la descente ne commence, pas après : un mouvement brusque pendant la manœuvre reste toujours possible.",en:"Everyone secured before the descent begins, not after: a sudden movement during the maneuver is always possible.",es:"Cada persona asegurada antes de que empiece el descenso, no después: un movimiento brusco durante la maniobra siempre es posible.",pt:"Cada pessoa presa antes de a descida começar, não depois: um movimento brusco durante a manobra é sempre possível."} },
    { id:3, icon:"📋", label:{fr:"Appel nominal avant la mise à l'eau",en:"Head count before entering the water",es:"Recuento nominal antes de la puesta a flote",pt:"Chamada nominal antes de pôr a flutuar"}, desc:{fr:"Confirmer que toutes les personnes attendues sont bien à bord avant que la descente ne débute, jamais après.",en:"Confirming that everyone expected is actually on board before the descent begins, never after.",es:"Confirmar que todas las personas esperadas están realmente a bordo antes de que empiece el descenso, nunca después.",pt:"Confirmar que todas as pessoas esperadas estão realmente a bordo antes de a descida começar, nunca depois."} },
    { id:4, icon:"🎯", label:{fr:"Un contexte d'exercice, pas d'abandon",en:"A drill context, not abandonment",es:"Un contexto de ejercicio, no de abandono",pt:"Um contexto de exercício, não de abandono"}, desc:{fr:"Cette discipline s'applique à tout exercice ou préparation normale. Le scénario complet d'abandon du navire sera vu plus tard dans ce module.",en:"This discipline applies to any drill or normal preparation. The full abandon ship scenario will be covered later in this module.",es:"Esta disciplina se aplica a cualquier ejercicio o preparación normal. El escenario completo de abandono del buque se verá más adelante en este módulo.",pt:"Esta disciplina aplica-se a qualquer exercício ou preparação normal. O cenário completo de abandono do navio será visto mais adiante neste módulo."} },
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

// SVG 3 - LAUNCH SEQUENCE (MOST ACCIDENT-PRONE PHASE)
function LaunchSequenceSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"📻", label:{fr:"Communication avec l'opérateur du bossoir",en:"Communication with the davit operator",es:"Comunicación con el operador del pescante",pt:"Comunicação com o operador do bossó"}, desc:{fr:"Un contact clair et constant entre l'équipage à bord de l'embarcation et l'opérateur reste indispensable pendant toute la descente.",en:"Clear, constant contact between the crew in the boat and the operator remains essential throughout the descent.",es:"Un contacto claro y constante entre la tripulación a bordo y el operador sigue siendo indispensable durante todo el descenso.",pt:"Um contacto claro e constante entre a tripulação a bordo e o operador continua a ser indispensável durante toda a descida."} },
    { id:2, icon:"🐌", label:{fr:"Descente contrôlée",en:"Controlled descent",es:"Descenso controlado",pt:"Descida controlada"}, desc:{fr:"Une vitesse régulière et maîtrisée, jamais précipitée, jusqu'à la surface de l'eau.",en:"A steady, controlled speed, never rushed, all the way to the water's surface.",es:"Una velocidad regular y controlada, nunca precipitada, hasta la superficie del agua.",pt:"Uma velocidade regular e controlada, nunca precipitada, até à superfície da água."} },
    { id:3, icon:"🪝", label:{fr:"Le crochet de largage : la zone la plus critique",en:"The release hook: the most critical zone",es:"El gancho de largada: la zona más crítica",pt:"O gancho de largada: a zona mais crítica"}, desc:{fr:"On-load ou off-load, ce mécanisme concentre le plus grand nombre d'accidents graves documentés dans toute la manœuvre. Une discipline de séquence stricte, jamais improvisée, s'impose ici.",en:"On-load or off-load, this mechanism concentrates the largest number of serious documented accidents in the whole maneuver. A strict, never improvised sequence discipline is required here.",es:"On-load u off-load, este mecanismo concentra el mayor número de accidentes graves documentados en toda la maniobra. Aquí se impone una disciplina de secuencia estricta, nunca improvisada.",pt:"On-load ou off-load, este mecanismo concentra o maior número de acidentes graves documentados em toda a manobra. Aqui impõe-se uma disciplina de sequência estrita, nunca improvisada."} },
    { id:4, icon:"✅", label:{fr:"Confirmation avant largage",en:"Confirmation before release",es:"Confirmación antes de la largada",pt:"Confirmação antes da largada"}, desc:{fr:"Vérifier que l'embarcation est réellement à flot et stable avant d'actionner le mécanisme de largage, jamais par anticipation.",en:"Confirming the boat is truly afloat and stable before actuating the release mechanism, never in anticipation.",es:"Confirmar que la embarcación está realmente a flote y estable antes de accionar el mecanismo de largada, nunca por anticipación.",pt:"Confirmar que a embarcação está realmente a flutuar e estável antes de acionar o mecanismo de largada, nunca por antecipação."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map((s,idx)=>(
          <div key={s.id}>
            <div onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(192,57,43,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.red:"rgba(255,255,255,0.08)"}`}}>
              <div style={{fontSize:16}}>{s.icon}</div>
              <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
            </div>
            {idx<steps.length-1&&<div style={{textAlign:"center",fontSize:12,color:C.muted,padding:"2px 0"}}>↓</div>}
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 4 - FIRST MINUTES AFTER WATER ENTRY
function FirstMinutesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔍", label:{fr:"Contrôle rapide de l'embarcation",en:"Quick check of the boat",es:"Control rápido de la embarcación",pt:"Controlo rápido da embarcação"}, desc:{fr:"Vérifier immédiatement l'absence de voie d'eau et le bon fonctionnement du moteur, avant toute autre action.",en:"Immediately check for no water ingress and that the engine runs properly, before any other action.",es:"Comprobar de inmediato que no hay entrada de agua y que el motor funciona bien, antes de cualquier otra acción.",pt:"Verificar de imediato a ausência de entrada de água e o bom funcionamento do motor, antes de qualquer outra ação."} },
    { id:2, icon:"👥", label:{fr:"Vérification des personnes",en:"Checking people",es:"Verificación de las personas",pt:"Verificação das pessoas"}, desc:{fr:"Un second appel nominal une fois à flot confirme qu'aucune blessure ni problème n'est passé inaperçu pendant la descente.",en:"A second head count once afloat confirms no injury or problem went unnoticed during the descent.",es:"Un segundo recuento nominal una vez a flote confirma que ninguna lesión o problema pasó desapercibido durante el descenso.",pt:"Uma segunda chamada nominal uma vez a flutuar confirma que nenhuma lesão ou problema passou despercebido durante a descida."} },
    { id:3, icon:"↔️", label:{fr:"Éloignement du navire",en:"Moving away from the ship",es:"Alejamiento del buque",pt:"Afastamento do navio"}, desc:{fr:"S'écarter rapidement de la coque : risque de succion, de gîte du navire, ou de chute d'objets depuis le pont.",en:"Moving quickly away from the hull: risk of suction, ship listing, or objects falling from the deck.",es:"Alejarse rápidamente del casco: riesgo de succión, escora del buque, o caída de objetos desde la cubierta.",pt:"Afastar-se rapidamente do casco: risco de sucção, adornamento do navio, ou queda de objetos do convés."} },
    { id:4, icon:"⚖️", label:{fr:"Stabilisation avant toute autre action",en:"Stabilizing before any other action",es:"Estabilización antes de cualquier otra acción",pt:"Estabilização antes de qualquer outra ação"}, desc:{fr:"Le lancement ne marque pas la fin de la manœuvre. Il marque le début de la survie : se stabiliser d'abord, agir ensuite.",en:"The launch does not mark the end of the maneuver. It marks the beginning of survival: stabilize first, act afterward.",es:"El lanzamiento no marca el final de la maniobra. Marca el comienzo de la supervivencia: estabilizarse primero, actuar después.",pt:"O lançamento não marca o fim da manobra. Marca o início da sobrevivência: estabilizar primeiro, agir depois."} },
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
    </div>
  );
}

// EXERCISE - LIFEBOAT LAUNCHING DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous préparez une embarcation avant un exercice. Que représente le bouchon de vidange ?\na) Un détail sans importance pratique\nb) Un point de vérification qui empêche l'embarcation de prendre l'eau dès la mise à flot\nc) Un élément vérifié uniquement une fois par an"},
      {id:"q2",q:"Quelle est la zone la plus critique de toute la manœuvre de mise à l'eau ?\na) Le mécanisme de largage (crochets)\nb) L'embarquement des personnes\nc) Le démarrage du moteur"},
      {id:"q3",q:"L'embarcation vient de toucher l'eau. Que faites-vous en priorité ?\na) Actionner immédiatement le crochet de largage\nb) Attendre les instructions du pont supérieur\nc) Contrôler rapidement l'embarcation et vérifier les personnes avant toute autre action"},
      {id:"q4",q:"Que signifie 'Most Lifeboat Accidents Happen Before Reaching the Water' ?\na) Une fois à l'eau, aucun risque ne subsiste\nb) La phase la plus dangereuse se situe pendant la descente et le largage, avant même que l'embarcation ne touche la mer\nc) Cette phrase ne concerne que les radeaux de sauvetage"},
    ],
    en:[
      {id:"q1",q:"You are preparing a lifeboat before a drill. What does the drain plug represent?\na) A detail with no practical importance\nb) A checkpoint that prevents the boat from taking on water as soon as it's afloat\nc) Something checked only once a year"},
      {id:"q2",q:"What is the most critical zone of the entire launching maneuver?\na) The release mechanism (hooks)\nb) Boarding people\nc) Starting the engine"},
      {id:"q3",q:"The boat has just touched the water. What do you do as a priority?\na) Immediately actuate the release hook\nb) Wait for instructions from the deck above\nc) Quickly check the boat and check the people before any other action"},
      {id:"q4",q:"What does 'Most Lifeboat Accidents Happen Before Reaching the Water' mean?\na) Once in the water, no risk remains\nb) The most dangerous phase is during descent and release, before the boat even touches the sea\nc) This phrase only concerns liferafts"},
    ],
    es:[
      {id:"q1",q:"Estás preparando una embarcación antes de un ejercicio. ¿Qué representa el tapón de achique?\na) Un detalle sin importancia práctica\nb) Un punto de comprobación que impide que la embarcación entre agua nada más flotar\nc) Algo que se comprueba solo una vez al año"},
      {id:"q2",q:"¿Cuál es la zona más crítica de toda la maniobra de puesta a flote?\na) El mecanismo de largada (ganchos)\nb) El embarque de las personas\nc) El arranque del motor"},
      {id:"q3",q:"La embarcación acaba de tocar el agua. ¿Qué haces con prioridad?\na) Accionar de inmediato el gancho de largada\nb) Esperar instrucciones de la cubierta superior\nc) Comprobar rápidamente la embarcación y verificar a las personas antes de cualquier otra acción"},
      {id:"q4",q:"¿Qué significa 'Most Lifeboat Accidents Happen Before Reaching the Water'?\na) Una vez en el agua, no queda ningún riesgo\nb) La fase más peligrosa ocurre durante el descenso y la largada, antes incluso de que la embarcación toque el mar\nc) Esta frase solo concierne a las balsas salvavidas"},
    ],
    pt:[
      {id:"q1",q:"Estás a preparar uma embarcação antes de um exercício. O que representa o bujão de esgoto?\na) Um detalhe sem importância prática\nb) Um ponto de verificação que impede a embarcação de entrar água assim que fica a flutuar\nc) Algo verificado apenas uma vez por ano"},
      {id:"q2",q:"Qual é a zona mais crítica de toda a manobra de lançamento?\na) O mecanismo de largada (ganchos)\nb) O embarque das pessoas\nc) O arranque do motor"},
      {id:"q3",q:"A embarcação acabou de tocar na água. O que fazes com prioridade?\na) Acionar de imediato o gancho de largada\nb) Esperar instruções do convés superior\nc) Controlar rapidamente a embarcação e verificar as pessoas antes de qualquer outra ação"},
      {id:"q4",q:"O que significa 'Most Lifeboat Accidents Happen Before Reaching the Water'?\na) Uma vez na água, não resta nenhum risco\nb) A fase mais perigosa ocorre durante a descida e a largada, antes mesmo de a embarcação tocar no mar\nc) Esta frase só diz respeito às jangadas salva-vidas"},
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

// ACCIDENT CASE - REAL DOCUMENTED CASE (PACMONARCH, ENGLISH BAY, 2000)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Le Pacmonarch",teaser:"Cas réel documenté - défaillance du crochet de largage, 3 marins décédés",
      what:"En octobre 2000, dans l'English Bay de Vancouver, quatre membres d'équipage embarquent dans une embarcation de sauvetage fermée du vraquier Pacmonarch pour un exercice de mise à l'eau. La descente commence normalement. Peu après que les bossoirs ont atteint leur butée, les crochets se désolidarisent brusquement des garants. L'embarcation tombe à la poupe d'environ 15 mètres dans la mer. Trois des quatre hommes à bord meurent, le quatrième est blessé à l'épaule.",
      cause:"• Défaillance du mécanisme de crochets de largage peu après que les bossoirs ont atteint leur butée\n• L'embarcation était pourtant récente, le modèle de crochet existait cependant depuis les années 1980\n• L'enquête du Bureau de la sécurité des transports du Canada s'est concentrée sur la conception et le fonctionnement du mécanisme de largage\n• Le fabricant du crochet a cessé de produire ce modèle après l'accident",
      lessons:"✓ Most Lifeboat Accidents Happen Before Reaching the Water : cet accident est survenu pendant la descente, avant même que l'embarcation ne touche l'eau\n✓ Le crochet de largage reste la zone la plus critique de toute la manœuvre, comme le confirment les données de sécurité maritime sur une décennie\n✓ Une vérification rigoureuse du mécanisme avant chaque exercice est indispensable, jamais une formalité\n✓ Ce cas illustre pourquoi une discipline de séquence stricte au moment du largage est une question de survie, pas de procédure",
      link:"🔗 Ce cas rappelle directement pourquoi le lancement d'une embarcation exige la même rigueur que n'importe quelle manœuvre à haut risque, même en exercice de routine."},
    en:{title:"Case Study - The Pacmonarch",teaser:"Real documented case - release hook failure, 3 seafarers died",
      what:"In October 2000, in Vancouver's English Bay, four crew members boarded an enclosed lifeboat from the bulk carrier Pacmonarch for a launching drill. The descent began normally. Shortly after the davits reached their stops, the hooks suddenly separated from the falls. The boat fell stern-first about 15 meters into the sea. Three of the four men on board died, the fourth was injured in the shoulder.",
      cause:"• Failure of the release hook mechanism shortly after the davits reached their stops\n• The boat was fairly new, though the hook model had existed since the 1980s\n• The Transportation Safety Board of Canada's investigation focused on the design and operation of the release mechanism\n• The hook manufacturer stopped producing this model after the accident",
      lessons:"✓ Most Lifeboat Accidents Happen Before Reaching the Water: this accident occurred during the descent, before the boat even touched the water\n✓ The release hook remains the most critical zone of the entire maneuver, as confirmed by a decade of maritime safety data\n✓ A rigorous check of the mechanism before every drill is essential, never a formality\n✓ This case illustrates why strict sequence discipline at the moment of release is a matter of survival, not procedure",
      link:"🔗 This case directly reminds why launching a lifeboat demands the same rigor as any high-risk maneuver, even during a routine drill."},
    es:{title:"Caso de estudio - El Pacmonarch",teaser:"Caso real documentado - fallo del gancho de largada, 3 marinos muertos",
      what:"En octubre de 2000, en la bahía English Bay de Vancouver, cuatro tripulantes embarcaron en un bote salvavidas cerrado del granelero Pacmonarch para un ejercicio de puesta a flote. El descenso empezó con normalidad. Poco después de que los pescantes llegaran a su tope, los ganchos se desprendieron bruscamente de los aparejos. La embarcación cayó de popa unos 15 metros al mar. Tres de los cuatro hombres a bordo murieron, el cuarto resultó herido en el hombro.",
      cause:"• Fallo del mecanismo de ganchos de largada poco después de que los pescantes llegaran a su tope\n• La embarcación era bastante reciente, aunque el modelo de gancho existía desde los años 80\n• La investigación del Consejo de Seguridad del Transporte de Canadá se centró en el diseño y funcionamiento del mecanismo de largada\n• El fabricante del gancho dejó de producir este modelo tras el accidente",
      lessons:"✓ Most Lifeboat Accidents Happen Before Reaching the Water: este accidente ocurrió durante el descenso, antes de que la embarcación tocara siquiera el agua\n✓ El gancho de largada sigue siendo la zona más crítica de toda la maniobra, como confirman datos de seguridad marítima de una década\n✓ Una comprobación rigurosa del mecanismo antes de cada ejercicio es indispensable, nunca una formalidad\n✓ Este caso ilustra por qué la disciplina estricta de secuencia en el momento de la largada es una cuestión de supervivencia, no de procedimiento",
      link:"🔗 Este caso recuerda directamente por qué el lanzamiento de una embarcación exige el mismo rigor que cualquier maniobra de alto riesgo, incluso en un ejercicio de rutina."},
    pt:{title:"Caso de estudo - O Pacmonarch",teaser:"Caso real documentado - falha do gancho de largada, 3 marítimos mortos",
      what:"Em outubro de 2000, na baía English Bay de Vancouver, quatro tripulantes embarcaram num bote salva-vidas fechado do graneleiro Pacmonarch para um exercício de lançamento. A descida começou normalmente. Pouco depois de os bossós atingirem o seu batente, os ganchos separaram-se bruscamente dos cabos. A embarcação caiu de popa cerca de 15 metros no mar. Três dos quatro homens a bordo morreram, o quarto ficou ferido no ombro.",
      cause:"• Falha do mecanismo de ganchos de largada pouco depois de os bossós atingirem o seu batente\n• A embarcação era bastante recente, embora o modelo de gancho existisse desde os anos 80\n• A investigação do Conselho de Segurança dos Transportes do Canadá centrou-se na conceção e funcionamento do mecanismo de largada\n• O fabricante do gancho deixou de produzir este modelo após o acidente",
      lessons:"✓ Most Lifeboat Accidents Happen Before Reaching the Water: este acidente ocorreu durante a descida, antes de a embarcação sequer tocar na água\n✓ O gancho de largada continua a ser a zona mais crítica de toda a manobra, como confirmam dados de segurança marítima de uma década\n✓ Uma verificação rigorosa do mecanismo antes de cada exercício é indispensável, nunca uma formalidade\n✓ Este caso ilustra por que a disciplina estrita de sequência no momento da largada é uma questão de sobrevivência, não de procedimento",
      link:"🔗 Este caso lembra diretamente por que o lançamento de uma embarcação exige o mesmo rigor que qualquer manobra de alto risco, mesmo num exercício de rotina."},
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
    {q:"Quelle est la mission exacte de cette leçon ?",opts:["Expliquer uniquement comment lancer une embarcation","Transformer une embarcation de sauvetage en un moyen réellement opérationnel : le canot existe, mais est-il prêt à sauver des vies ?","Enseigner le signal d'abandon du navire","Présenter l'historique des embarcations de sauvetage"],correct:1,expl:"L1 dépasse la simple manœuvre : elle enseigne à rendre l'embarcation véritablement opérationnelle."},
    {q:"Pourquoi le bouchon de vidange est-il vérifié avant tout exercice ?",opts:["Par pure formalité administrative","Son absence ou son mauvais serrage laisse l'embarcation prendre l'eau dès la mise à flot","Il n'a aucune importance réelle","Il concerne uniquement les embarcations anciennes"],correct:1,expl:"Chaque vérification empêche une catastrophe différente, ici l'envahissement par l'eau."},
    {q:"Pourquoi tester le moteur avant l'embarquement ?",opts:["Ce n'est pas nécessaire si le moteur a démarré la veille","Un moteur non testé rend impossible de s'éloigner du navire au moment critique","Le moteur ne sert qu'après le largage complet","Cela ralentit inutilement la préparation"],correct:1,expl:"Un moteur non testé peut faire défaut exactement quand il est le plus nécessaire."},
    {q:"Que risque un sea painter mal préparé ?",opts:["Rien de particulier","Un problème une fois à l'eau, précisément quand l'embarcation doit s'écarter rapidement de la coque","Il retarde uniquement l'embarquement","Il concerne uniquement les radeaux de sauvetage"],correct:1,expl:"Un sea painter mal préparé crée un risque au moment où l'éloignement rapide est le plus nécessaire."},
    {q:"Cette leçon couvre-t-elle le signal d'abandon du navire et la discipline au poste de rassemblement ?",opts:["Oui, en détail","Non, ces sujets sont réservés à la dernière leçon du module, consacrée au scénario complet d'abandon","Oui, mais uniquement pour les officiers","Non, ces sujets ne sont jamais traités dans ce module"],correct:1,expl:"Cette leçon reste dans un contexte d'exercice ou de préparation normale, pas d'abandon du navire."},
    {q:"Pourquoi un ordre d'embarquement défini est-il important ?",opts:["Il n'a aucune utilité réelle","Il évite la précipitation et la surcharge d'un côté de l'embarcation","Il ralentit toujours l'exercice sans raison","Il concerne uniquement les grandes embarcations"],correct:1,expl:"Un ordre défini structure l'embarquement et évite les déséquilibres dangereux."},
    {q:"Quand les harnais et ceintures doivent-ils être sécurisés ?",opts:["Après le début de la descente","Avant que la descente ne commence, jamais après","Uniquement en cas de mauvais temps","Ce n'est pas nécessaire pour un exercice de routine"],correct:1,expl:"Chaque personne doit être sécurisée avant la descente, un mouvement brusque restant toujours possible."},
    {q:"Quelle est la zone la plus critique de toute la manœuvre de mise à l'eau ?",opts:["L'embarquement des personnes","Le mécanisme de largage (crochets on-load/off-load)","Le démarrage du moteur","La communication radio avec le port"],correct:1,expl:"Les données de sécurité maritime confirment que le mécanisme de largage concentre le plus grand nombre d'accidents graves."},
    {q:"Que faut-il confirmer avant d'actionner le mécanisme de largage ?",opts:["Rien, il peut être actionné par anticipation","Que l'embarcation est réellement à flot et stable","Uniquement que le moteur tourne","Que le navire a arrêté sa machine"],correct:1,expl:"Le largage ne doit jamais être anticipé : l'embarcation doit être confirmée à flot et stable."},
    {q:"Une fois à flot, que faut-il vérifier en priorité ?",opts:["Rien, la manœuvre est terminée","L'absence de voie d'eau et le bon fonctionnement du moteur, avant toute autre action","Uniquement la météo","Le nombre d'heures de la journée"],correct:1,expl:"Un contrôle rapide de l'embarcation précède toute autre décision une fois à flot."},
    {q:"Pourquoi s'écarter rapidement de la coque du navire après la mise à l'eau ?",opts:["Ce n'est pas nécessaire si la mer est calme","Risque de succion, de gîte du navire, ou de chute d'objets depuis le pont","Uniquement pour des raisons de confort","Cela retarde toujours l'exercice"],correct:1,expl:"S'écarter rapidement de la coque limite plusieurs risques distincts liés à la proximité du navire."},
    {q:"Que signifie 'le lancement ne marque pas la fin de la manœuvre, il marque le début de la survie' ?",opts:["Une fois lancée, l'embarcation ne présente plus aucun risque","La vigilance et la discipline doivent continuer après la mise à l'eau, pas seulement pendant la descente","Cela ne concerne que les situations de mauvais temps","La survie commence uniquement après plusieurs heures en mer"],correct:1,expl:"Stabilisation et vérification restent nécessaires immédiatement après la mise à l'eau."},
    {q:"Dans le cas du Pacmonarch, à quel moment l'accident s'est-il produit ?",opts:["Après plusieurs heures en mer","Peu après que les bossoirs ont atteint leur butée, pendant la descente","Au moment de l'embarquement uniquement","Après le retour de l'embarcation à bord"],correct:1,expl:"L'accident est survenu pendant la descente, confirmant que la phase de largage est la plus critique."},
    {q:"Que confirme le cas du Pacmonarch sur le principe 'Most Lifeboat Accidents Happen Before Reaching the Water' ?",opts:["Que ce principe est théorique et rarement vérifié","Que l'accident est survenu avant même que l'embarcation ne touche la mer, confirmant le principe","Que les accidents surviennent uniquement après la mise à l'eau","Que ce cas ne concerne pas le largage"],correct:1,expl:"L'accident du Pacmonarch illustre directement ce principe : la chute a eu lieu avant que la coque ne touche l'eau."},
    {q:"Ce module enseigne-t-il un substitut à une formation SOLAS pratique certifiée au maniement réel d'une embarcation de sauvetage ?",opts:["Oui, il équivaut à une certification complète","Non, il enseigne des principes de vérification et de décision, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne les principes de décision, jamais un remplacement de la formation pratique certifiée."},
  ],
  en:[
    {q:"What is the exact mission of this lesson?",opts:["Only explain how to launch a boat","Turn a lifeboat into a truly operational means of survival: the boat exists, but is it ready to save lives?","Teach the abandon ship signal","Present the history of lifeboats"],correct:1,expl:"L1 goes beyond the simple maneuver: it teaches how to make the boat truly operational."},
    {q:"Why is the drain plug checked before every drill?",opts:["Pure administrative formality","Its absence or looseness lets the boat take on water as soon as it's afloat","It has no real importance","It only concerns old boats"],correct:1,expl:"Each check prevents a different catastrophe, here water ingress."},
    {q:"Why test the engine before boarding?",opts:["Not necessary if the engine started the day before","An untested engine makes it impossible to move away from the ship at the critical moment","The engine is only used after full release","It unnecessarily slows down preparation"],correct:1,expl:"An untested engine can fail exactly when it's needed most."},
    {q:"What does a poorly prepared sea painter risk?",opts:["Nothing in particular","A problem once in the water, precisely when the boat must move quickly away from the hull","It only delays boarding","It only concerns liferafts"],correct:1,expl:"A poorly prepared sea painter creates a risk exactly when quick clearance is needed most."},
    {q:"Does this lesson cover the abandon ship signal and muster station discipline?",opts:["Yes, in detail","No, these topics are reserved for the module's last lesson, dedicated to the full abandon ship scenario","Yes, but only for officers","No, these topics are never covered in this module"],correct:1,expl:"This lesson stays in a drill or normal preparation context, not ship abandonment."},
    {q:"Why is a defined boarding order important?",opts:["It has no real use","It avoids rushing and overloading one side of the boat","It always unnecessarily slows down the drill","It only concerns large boats"],correct:1,expl:"A defined order structures boarding and avoids dangerous imbalance."},
    {q:"When must harnesses and seatbelts be secured?",opts:["After the descent begins","Before the descent begins, never after","Only in bad weather","It isn't necessary for a routine drill"],correct:1,expl:"Everyone must be secured before descent, as a sudden movement is always possible."},
    {q:"What is the most critical zone of the entire launching maneuver?",opts:["Boarding people","The release mechanism (on-load/off-load hooks)","Starting the engine","Radio communication with the port"],correct:1,expl:"Maritime safety data confirms the release mechanism concentrates the largest number of serious accidents."},
    {q:"What must be confirmed before actuating the release mechanism?",opts:["Nothing, it can be actuated in anticipation","That the boat is truly afloat and stable","Only that the engine is running","That the ship has stopped its engine"],correct:1,expl:"Release must never be anticipated: the boat must be confirmed afloat and stable."},
    {q:"Once afloat, what must be checked as a priority?",opts:["Nothing, the maneuver is over","No water ingress and the engine running properly, before any other action","Only the weather","The number of hours in the day"],correct:1,expl:"A quick check of the boat precedes any other decision once afloat."},
    {q:"Why move quickly away from the ship's hull after entering the water?",opts:["Not necessary if the sea is calm","Risk of suction, ship listing, or objects falling from the deck","Only for comfort reasons","It always delays the drill"],correct:1,expl:"Moving quickly away from the hull limits several distinct risks linked to proximity to the ship."},
    {q:"What does 'the launch does not mark the end of the maneuver, it marks the beginning of survival' mean?",opts:["Once launched, the boat presents no more risk at all","Vigilance and discipline must continue after entering the water, not just during descent","This only concerns bad weather situations","Survival only begins after several hours at sea"],correct:1,expl:"Stabilizing and checking remain necessary immediately after entering the water."},
    {q:"In the Pacmonarch case, when did the accident occur?",opts:["After several hours at sea","Shortly after the davits reached their stops, during descent","Only at the moment of boarding","After the boat returned aboard"],correct:1,expl:"The accident occurred during descent, confirming the release phase is the most critical."},
    {q:"What does the Pacmonarch case confirm about the principle 'Most Lifeboat Accidents Happen Before Reaching the Water'?",opts:["That this principle is theoretical and rarely verified","That the accident occurred before the boat even touched the sea, confirming the principle","That accidents only occur after entering the water","That this case doesn't concern release"],correct:1,expl:"The Pacmonarch accident directly illustrates this principle: the fall happened before the hull touched the water."},
    {q:"Does this module teach a replacement for certified practical SOLAS training in actual lifeboat handling?",opts:["Yes, it is equivalent to a full certification","No, it teaches checking and decision principles, never a replacement for certified practical training","Yes, but only for officers","No, it is useless without equipment"],correct:1,expl:"MAP teaches decision principles, never a replacement for certified practical training."},
  ],
  es:[
    {q:"¿Cuál es la misión exacta de esta lección?",opts:["Solo explicar cómo lanzar una embarcación","Convertir un bote salvavidas en un medio realmente operativo: la embarcación existe, ¿pero está lista para salvar vidas?","Enseñar la señal de abandono del buque","Presentar la historia de los botes salvavidas"],correct:1,expl:"L1 va más allá de la simple maniobra: enseña a hacer que la embarcación sea realmente operativa."},
    {q:"¿Por qué se comprueba el tapón de achique antes de cada ejercicio?",opts:["Pura formalidad administrativa","Su ausencia o mal ajuste deja que la embarcación entre agua nada más flotar","No tiene ninguna importancia real","Solo concierne a embarcaciones antiguas"],correct:1,expl:"Cada comprobación impide una catástrofe diferente, aquí la entrada de agua."},
    {q:"¿Por qué probar el motor antes de embarcar?",opts:["No es necesario si el motor arrancó el día anterior","Un motor no probado imposibilita alejarse del buque en el momento crítico","El motor solo se usa después de la largada completa","Ralentiza innecesariamente la preparación"],correct:1,expl:"Un motor no probado puede fallar justo cuando más se necesita."},
    {q:"¿Qué arriesga un sea painter mal preparado?",opts:["Nada en particular","Un problema una vez en el agua, justo cuando la embarcación debe alejarse rápidamente del casco","Solo retrasa el embarque","Solo concierne a las balsas salvavidas"],correct:1,expl:"Un sea painter mal preparado crea un riesgo justo cuando más se necesita el alejamiento rápido."},
    {q:"¿Esta lección cubre la señal de abandono del buque y la disciplina en el puesto de reunión?",opts:["Sí, en detalle","No, estos temas se reservan para la última lección del módulo, dedicada al escenario completo de abandono","Sí, pero solo para oficiales","No, estos temas nunca se tratan en este módulo"],correct:1,expl:"Esta lección permanece en un contexto de ejercicio o preparación normal, no de abandono del buque."},
    {q:"¿Por qué es importante un orden de embarque definido?",opts:["No tiene ninguna utilidad real","Evita las prisas y la sobrecarga de un lado de la embarcación","Siempre ralentiza el ejercicio sin razón","Solo concierne a embarcaciones grandes"],correct:1,expl:"Un orden definido estructura el embarque y evita desequilibrios peligrosos."},
    {q:"¿Cuándo deben asegurarse los arneses y cinturones?",opts:["Después de que empiece el descenso","Antes de que empiece el descenso, nunca después","Solo con mal tiempo","No es necesario para un ejercicio de rutina"],correct:1,expl:"Cada persona debe estar asegurada antes del descenso, ya que un movimiento brusco siempre es posible."},
    {q:"¿Cuál es la zona más crítica de toda la maniobra de puesta a flote?",opts:["El embarque de las personas","El mecanismo de largada (ganchos on-load/off-load)","El arranque del motor","La comunicación por radio con el puerto"],correct:1,expl:"Los datos de seguridad marítima confirman que el mecanismo de largada concentra el mayor número de accidentes graves."},
    {q:"¿Qué hay que confirmar antes de accionar el mecanismo de largada?",opts:["Nada, puede accionarse por anticipación","Que la embarcación está realmente a flote y estable","Solo que el motor está en marcha","Que el buque ha parado su máquina"],correct:1,expl:"La largada nunca debe anticiparse: la embarcación debe confirmarse a flote y estable."},
    {q:"Una vez a flote, ¿qué hay que comprobar con prioridad?",opts:["Nada, la maniobra ha terminado","Que no hay entrada de agua y que el motor funciona bien, antes de cualquier otra acción","Solo el tiempo meteorológico","El número de horas del día"],correct:1,expl:"Una comprobación rápida de la embarcación precede a cualquier otra decisión una vez a flote."},
    {q:"¿Por qué alejarse rápidamente del casco del buque tras entrar en el agua?",opts:["No es necesario si el mar está en calma","Riesgo de succión, escora del buque, o caída de objetos desde la cubierta","Solo por razones de comodidad","Siempre retrasa el ejercicio"],correct:1,expl:"Alejarse rápidamente del casco limita varios riesgos distintos vinculados a la proximidad del buque."},
    {q:"¿Qué significa 'el lanzamiento no marca el final de la maniobra, marca el comienzo de la supervivencia'?",opts:["Una vez lanzada, la embarcación no presenta ya ningún riesgo","La vigilancia y la disciplina deben continuar tras entrar en el agua, no solo durante el descenso","Esto solo concierne a situaciones de mal tiempo","La supervivencia solo empieza tras varias horas en el mar"],correct:1,expl:"Estabilizarse y comprobar siguen siendo necesarios inmediatamente después de entrar en el agua."},
    {q:"En el caso del Pacmonarch, ¿en qué momento ocurrió el accidente?",opts:["Tras varias horas en el mar","Poco después de que los pescantes llegaran a su tope, durante el descenso","Solo en el momento del embarque","Tras el regreso de la embarcación a bordo"],correct:1,expl:"El accidente ocurrió durante el descenso, confirmando que la fase de largada es la más crítica."},
    {q:"¿Qué confirma el caso del Pacmonarch sobre el principio 'Most Lifeboat Accidents Happen Before Reaching the Water'?",opts:["Que este principio es teórico y rara vez se verifica","Que el accidente ocurrió antes incluso de que la embarcación tocara el mar, confirmando el principio","Que los accidentes solo ocurren después de entrar en el agua","Que este caso no concierne a la largada"],correct:1,expl:"El accidente del Pacmonarch ilustra directamente este principio: la caída ocurrió antes de que el casco tocara el agua."},
    {q:"¿Este módulo enseña un sustituto de una formación SOLAS práctica certificada en el manejo real de un bote salvavidas?",opts:["Sí, equivale a una certificación completa","No, enseña principios de comprobación y decisión, nunca un sustituto de una formación práctica certificada","Sí, pero solo para oficiales","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña principios de decisión, nunca un sustituto de la formación práctica certificada."},
  ],
  pt:[
    {q:"Qual é a missão exata desta lição?",opts:["Apenas explicar como lançar uma embarcação","Transformar um bote salva-vidas num meio realmente operacional: a embarcação existe, mas está pronta para salvar vidas?","Ensinar o sinal de abandono do navio","Apresentar a história dos botes salva-vidas"],correct:1,expl:"L1 vai além da simples manobra: ensina a tornar a embarcação realmente operacional."},
    {q:"Por que o bujão de esgoto é verificado antes de cada exercício?",opts:["Pura formalidade administrativa","A sua ausência ou mau aperto deixa a embarcação entrar água assim que fica a flutuar","Não tem qualquer importância real","Só diz respeito a embarcações antigas"],correct:1,expl:"Cada verificação impede uma catástrofe diferente, aqui a entrada de água."},
    {q:"Por que testar o motor antes do embarque?",opts:["Não é necessário se o motor arrancou no dia anterior","Um motor não testado torna impossível afastar-se do navio no momento crítico","O motor só é usado depois da largada completa","Atrasa desnecessariamente a preparação"],correct:1,expl:"Um motor não testado pode falhar exatamente quando é mais necessário."},
    {q:"O que arrisca um sea painter mal preparado?",opts:["Nada em particular","Um problema uma vez na água, precisamente quando a embarcação deve afastar-se rapidamente do casco","Só atrasa o embarque","Só diz respeito às jangadas salva-vidas"],correct:1,expl:"Um sea painter mal preparado cria um risco exatamente quando o afastamento rápido é mais necessário."},
    {q:"Esta lição cobre o sinal de abandono do navio e a disciplina no posto de reunião?",opts:["Sim, em detalhe","Não, estes temas são reservados para a última lição do módulo, dedicada ao cenário completo de abandono","Sim, mas só para oficiais","Não, estes temas nunca são tratados neste módulo"],correct:1,expl:"Esta lição mantém-se num contexto de exercício ou preparação normal, não de abandono do navio."},
    {q:"Por que é importante uma ordem de embarque definida?",opts:["Não tem qualquer utilidade real","Evita a pressa e a sobrecarga de um lado da embarcação","Atrasa sempre o exercício sem razão","Só diz respeito a grandes embarcações"],correct:1,expl:"Uma ordem definida estrutura o embarque e evita desequilíbrios perigosos."},
    {q:"Quando devem os arneses e cintos ser presos?",opts:["Depois de a descida começar","Antes de a descida começar, nunca depois","Só com mau tempo","Não é necessário para um exercício de rotina"],correct:1,expl:"Cada pessoa deve estar presa antes da descida, pois um movimento brusco é sempre possível."},
    {q:"Qual é a zona mais crítica de toda a manobra de lançamento?",opts:["O embarque das pessoas","O mecanismo de largada (ganchos on-load/off-load)","O arranque do motor","A comunicação rádio com o porto"],correct:1,expl:"Os dados de segurança marítima confirmam que o mecanismo de largada concentra o maior número de acidentes graves."},
    {q:"O que deve ser confirmado antes de acionar o mecanismo de largada?",opts:["Nada, pode ser acionado por antecipação","Que a embarcação está realmente a flutuar e estável","Só que o motor está a funcionar","Que o navio parou a máquina"],correct:1,expl:"A largada nunca deve ser antecipada: a embarcação deve ser confirmada a flutuar e estável."},
    {q:"Uma vez a flutuar, o que deve ser verificado com prioridade?",opts:["Nada, a manobra terminou","A ausência de entrada de água e o bom funcionamento do motor, antes de qualquer outra ação","Só o tempo meteorológico","O número de horas do dia"],correct:1,expl:"Um controlo rápido da embarcação precede qualquer outra decisão uma vez a flutuar."},
    {q:"Por que afastar-se rapidamente do casco do navio após entrar na água?",opts:["Não é necessário se o mar estiver calmo","Risco de sucção, adornamento do navio, ou queda de objetos do convés","Só por razões de conforto","Atrasa sempre o exercício"],correct:1,expl:"Afastar-se rapidamente do casco limita vários riscos distintos ligados à proximidade do navio."},
    {q:"O que significa 'o lançamento não marca o fim da manobra, marca o início da sobrevivência'?",opts:["Uma vez lançada, a embarcação não apresenta mais nenhum risco","A vigilância e a disciplina devem continuar após entrar na água, não só durante a descida","Isto só diz respeito a situações de mau tempo","A sobrevivência só começa após várias horas no mar"],correct:1,expl:"Estabilizar e verificar continuam a ser necessários imediatamente após entrar na água."},
    {q:"No caso do Pacmonarch, em que momento ocorreu o acidente?",opts:["Após várias horas no mar","Pouco depois de os bossós atingirem o seu batente, durante a descida","Só no momento do embarque","Após o regresso da embarcação a bordo"],correct:1,expl:"O acidente ocorreu durante a descida, confirmando que a fase de largada é a mais crítica."},
    {q:"O que confirma o caso do Pacmonarch sobre o princípio 'Most Lifeboat Accidents Happen Before Reaching the Water'?",opts:["Que este princípio é teórico e raramente verificado","Que o acidente ocorreu antes mesmo de a embarcação tocar no mar, confirmando o princípio","Que os acidentes só ocorrem depois de entrar na água","Que este caso não diz respeito à largada"],correct:1,expl:"O acidente do Pacmonarch ilustra diretamente este princípio: a queda ocorreu antes de o casco tocar na água."},
    {q:"Este módulo ensina um substituto de uma formação SOLAS prática certificada no manuseamento real de um bote salva-vidas?",opts:["Sim, equivale a uma certificação completa","Não, ensina princípios de verificação e decisão, nunca um substituto de uma formação prática certificada","Sim, mas só para oficiais","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina princípios de decisão, nunca um substituto da formação prática certificada."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'Most Lifeboat Accidents Happen Before Reaching the Water' ?",opts:["Une fois à l'eau, il n'y a plus aucun risque","La phase la plus dangereuse est la descente et le largage, avant de toucher la mer","Cela ne concerne que les radeaux","Les accidents surviennent uniquement après plusieurs heures en mer"],correct:1,expl:"La phase de descente et de largage concentre le plus grand nombre d'accidents graves."},
    {q:"Quelle est la zone la plus critique de toute la manœuvre ?",opts:["L'embarquement","Le mécanisme de largage (crochets)","Le démarrage moteur","La communication radio"],correct:1,expl:"Les crochets de largage concentrent le plus grand nombre d'accidents documentés."},
    {q:"Que faut-il confirmer avant d'actionner le largage ?",opts:["Rien, on peut anticiper","Que l'embarcation est réellement à flot et stable","Uniquement que le moteur tourne","Que le navire est arrêté"],correct:1,expl:"Le largage ne doit jamais être anticipé."},
    {q:"Une fois à flot, que faire en priorité ?",opts:["Rien, la manœuvre est finie","Contrôler l'embarcation et vérifier les personnes avant toute autre action","Attendre les instructions du pont","Ventiler l'embarcation"],correct:1,expl:"La vigilance continue après la mise à l'eau : c'est le début de la survie."},
    {q:"Dans le cas du Pacmonarch, qu'est-ce qui a causé l'accident ?",opts:["Une tempête soudaine","Une défaillance du mécanisme de crochets de largage pendant la descente","Un problème de moteur","Une erreur d'embarquement"],correct:1,expl:"Les crochets se sont désolidarisés des garants peu après que les bossoirs ont atteint leur butée."},
  ],
  en:[
    {q:"What does 'Most Lifeboat Accidents Happen Before Reaching the Water' mean?",opts:["Once in the water, there's no more risk","The most dangerous phase is descent and release, before touching the sea","It only concerns liferafts","Accidents only occur after several hours at sea"],correct:1,expl:"The descent and release phase concentrates the largest number of serious accidents."},
    {q:"What is the most critical zone of the entire maneuver?",opts:["Boarding","The release mechanism (hooks)","Starting the engine","Radio communication"],correct:1,expl:"Release hooks concentrate the largest number of documented accidents."},
    {q:"What must be confirmed before actuating release?",opts:["Nothing, it can be anticipated","That the boat is truly afloat and stable","Only that the engine is running","That the ship is stopped"],correct:1,expl:"Release must never be anticipated."},
    {q:"Once afloat, what to do as a priority?",opts:["Nothing, the maneuver is over","Check the boat and check people before any other action","Wait for instructions from the deck","Ventilate the boat"],correct:1,expl:"Vigilance continues after entering the water: it's the beginning of survival."},
    {q:"In the Pacmonarch case, what caused the accident?",opts:["A sudden storm","A failure of the release hook mechanism during descent","An engine problem","A boarding error"],correct:1,expl:"The hooks separated from the falls shortly after the davits reached their stops."},
  ],
  es:[
    {q:"¿Qué significa 'Most Lifeboat Accidents Happen Before Reaching the Water'?",opts:["Una vez en el agua, no queda ningún riesgo","La fase más peligrosa es el descenso y la largada, antes de tocar el mar","Solo concierne a las balsas salvavidas","Los accidentes solo ocurren tras varias horas en el mar"],correct:1,expl:"La fase de descenso y largada concentra el mayor número de accidentes graves."},
    {q:"¿Cuál es la zona más crítica de toda la maniobra?",opts:["El embarque","El mecanismo de largada (ganchos)","El arranque del motor","La comunicación por radio"],correct:1,expl:"Los ganchos de largada concentran el mayor número de accidentes documentados."},
    {q:"¿Qué hay que confirmar antes de accionar la largada?",opts:["Nada, se puede anticipar","Que la embarcación está realmente a flote y estable","Solo que el motor está en marcha","Que el buque está parado"],correct:1,expl:"La largada nunca debe anticiparse."},
    {q:"Una vez a flote, ¿qué hacer con prioridad?",opts:["Nada, la maniobra ha terminado","Comprobar la embarcación y verificar a las personas antes de cualquier otra acción","Esperar instrucciones de la cubierta","Ventilar la embarcación"],correct:1,expl:"La vigilancia continúa tras entrar en el agua: es el comienzo de la supervivencia."},
    {q:"En el caso del Pacmonarch, ¿qué causó el accidente?",opts:["Una tormenta repentina","Un fallo del mecanismo de ganchos de largada durante el descenso","Un problema de motor","Un error de embarque"],correct:1,expl:"Los ganchos se desprendieron de los aparejos poco después de que los pescantes llegaran a su tope."},
  ],
  pt:[
    {q:"O que significa 'Most Lifeboat Accidents Happen Before Reaching the Water'?",opts:["Uma vez na água, não resta nenhum risco","A fase mais perigosa é a descida e a largada, antes de tocar no mar","Só diz respeito às jangadas salva-vidas","Os acidentes só ocorrem após várias horas no mar"],correct:1,expl:"A fase de descida e largada concentra o maior número de acidentes graves."},
    {q:"Qual é a zona mais crítica de toda a manobra?",opts:["O embarque","O mecanismo de largada (ganchos)","O arranque do motor","A comunicação rádio"],correct:1,expl:"Os ganchos de largada concentram o maior número de acidentes documentados."},
    {q:"O que deve ser confirmado antes de acionar a largada?",opts:["Nada, pode ser antecipado","Que a embarcação está realmente a flutuar e estável","Só que o motor está a funcionar","Que o navio está parado"],correct:1,expl:"A largada nunca deve ser antecipada."},
    {q:"Uma vez a flutuar, o que fazer com prioridade?",opts:["Nada, a manobra terminou","Controlar a embarcação e verificar as pessoas antes de qualquer outra ação","Esperar instruções do convés","Ventilar a embarcação"],correct:1,expl:"A vigilância continua após entrar na água: é o início da sobrevivência."},
    {q:"No caso do Pacmonarch, o que causou o acidente?",opts:["Uma tempestade súbita","Uma falha do mecanismo de ganchos de largada durante a descida","Um problema de motor","Um erro de embarque"],correct:1,expl:"Os ganchos separaram-se dos cabos pouco depois de os bossós atingirem o seu batente."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si tu devais verifier une embarcation de sauvetage aujourd'hui, saurais-tu expliquer pourquoi chaque point de controle existe, pas seulement le cocher ?",
    en:"If you had to check a lifeboat today, would you be able to explain why each checkpoint exists, not just tick it off?",
    es:"Si tuvieras que revisar un bote salvavidas hoy, ¿sabrias explicar por que existe cada punto de control, no solo marcarlo?",
    pt:"Se tivesses de verificar um bote salva-vidas hoje, saberias explicar por que existe cada ponto de controlo, nao apenas marca-lo?",
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
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Leçon 1/4 · ⭐ Premium",
      title:"Lifeboats: Launching & Handling",
      intro:"Cette leçon ne traite pas encore du signal d'abandon ni de la discipline au poste de rassemblement, réservés au scénario final du module. Elle répond à une question plus simple : le canot existe, mais est-il prêt à sauver des vies ?",
      p0:"MOST LIFEBOAT ACCIDENTS HAPPEN BEFORE REACHING THE WATER",s0t:"Le principe qui structure toute la leçon",
      s0:"Les données de sécurité maritime confirment que la majorité des accidents graves surviennent pendant la préparation et la descente, pas une fois l'embarcation à la mer.\n\nCOMMENT LE RECONNAÎTRE ? Une vérification incomplète avant lancement, une précipitation à l'embarquement, un largage anticipé.\nQUE FAIRE IMMÉDIATEMENT ? Vérifier systématiquement chaque point critique, respecter la discipline de séquence au largage.\nQUELLE ERREUR L'AGGRAVE ? Considérer la vérification comme une formalité plutôt qu'une protection réelle.\nQUAND DEMANDER DE L'AIDE ? Dès le moindre doute sur l'état de l'embarcation ou du mécanisme de largage.",
      p1:"VÉRIFICATIONS AVANT LANCEMENT",s1t:"Chaque vérification empêche une catastrophe différente",
      s1:"Bouchon de vidange, moteur testé, sea painter préparé, crochets vérifiés : ce n'est jamais une simple check-list, chaque point répond à un risque précis.",
      p2:"DISCIPLINE D'EMBARQUEMENT",s2t:"Un contexte d'exercice, pas d'abandon",
      s2:"Ordre d'embarquement, harnais sécurisés avant la descente, appel nominal avant la mise à l'eau. La discipline d'abandon du navire sera vue dans la dernière leçon du module.",
      p3:"SÉQUENCE DE LANCEMENT",s3t:"La zone la plus accidentogène de la manœuvre",
      s3:"Communication constante avec l'opérateur, descente contrôlée, et le crochet de largage : la phase qui concentre le plus grand nombre d'accidents graves documentés.",
      p4:"LES PREMIÈRES MINUTES APRÈS LA MISE À L'EAU",s4t:"Le lancement marque le début de la survie",
      s4:"Contrôle rapide de l'embarcation, vérification des personnes, éloignement de la coque, stabilisation avant toute autre action.",
      p5:"🎯 EXERCICE OPÉRATIONNEL",p6:"⚠️ CAS D'ÉTUDE",p7:"📝 BANQUE DE 15 QUESTIONS",p8:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 1",
      sumP:["Most Lifeboat Accidents Happen Before Reaching the Water : la phase la plus critique précède la mer","Chaque vérification avant lancement empêche une catastrophe différente, jamais une formalité","Discipline d'embarquement dans un contexte d'exercice, l'abandon du navire viendra plus tard","Le crochet de largage concentre le plus grand nombre d'accidents documentés","Le lancement marque le début de la survie, pas la fin de la manœuvre"],
      learnedP:["Les vérifications essentielles avant tout lancement","La discipline d'embarquement en contexte d'exercice","La séquence de mise à l'eau et ses risques","Les priorités des premières minutes après la mise à l'eau","Pourquoi la majorité des accidents surviennent avant la mer"],
      transition:"Launching the lifeboat is only the first step. What if no lifeboat is available?",
      safetyMsg:"A lifeboat saves lives only if it is launched safely.",
    },
    en:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lesson 1/4 · ⭐ Premium",
      title:"Lifeboats: Launching & Handling",
      intro:"This lesson does not yet cover the abandon ship signal or muster station discipline, reserved for the module's final scenario. It answers a simpler question: the boat exists, but is it ready to save lives?",
      p0:"MOST LIFEBOAT ACCIDENTS HAPPEN BEFORE REACHING THE WATER",s0t:"The principle that structures the whole lesson",
      s0:"Maritime safety data confirms that most serious accidents occur during preparation and descent, not once the boat is at sea.\n\nHOW DO I RECOGNIZE IT? An incomplete check before launch, rushed boarding, an anticipated release.\nWHAT DO I DO IMMEDIATELY? Systematically check every critical point, respect sequence discipline at release.\nWHAT MISTAKE MAKES IT WORSE? Treating the check as a formality rather than real protection.\nWHEN MUST I ASK FOR HELP? At the slightest doubt about the boat's condition or the release mechanism.",
      p1:"PRE-LAUNCH CHECKS",s1t:"Each check prevents a different catastrophe",
      s1:"Drain plug, tested engine, prepared sea painter, checked hooks: never a simple checklist, each point answers a precise risk.",
      p2:"BOARDING DISCIPLINE",s2t:"A drill context, not abandonment",
      s2:"Boarding order, harnesses secured before descent, head count before entering the water. Ship abandonment discipline will be covered in the module's last lesson.",
      p3:"LAUNCH SEQUENCE",s3t:"The most accident-prone zone of the maneuver",
      s3:"Constant communication with the operator, controlled descent, and the release hook: the phase concentrating the largest number of documented serious accidents.",
      p4:"THE FIRST MINUTES AFTER WATER ENTRY",s4t:"The launch marks the beginning of survival",
      s4:"Quick check of the boat, checking people, moving away from the hull, stabilizing before any other action.",
      p5:"🎯 OPERATIONAL EXERCISE",p6:"⚠️ CASE STUDY",p7:"📝 15-QUESTION BANK",p8:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 1",
      sumP:["Most Lifeboat Accidents Happen Before Reaching the Water: the most critical phase precedes the sea","Every pre-launch check prevents a different catastrophe, never a formality","Boarding discipline in a drill context, ship abandonment comes later","The release hook concentrates the largest number of documented accidents","The launch marks the beginning of survival, not the end of the maneuver"],
      learnedP:["Essential checks before any launch","Boarding discipline in a drill context","The launch sequence and its risks","Priorities in the first minutes after water entry","Why most accidents happen before reaching the sea"],
      transition:"Launching the lifeboat is only the first step. What if no lifeboat is available?",
      safetyMsg:"A lifeboat saves lives only if it is launched safely.",
    },
    es:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lección 1/4 · ⭐ Premium",
      title:"Lifeboats: Launching & Handling",
      intro:"Esta lección no aborda todavía la señal de abandono del buque ni la disciplina en el puesto de reunión, reservadas al escenario final del módulo. Responde a una pregunta más simple: la embarcación existe, ¿pero está lista para salvar vidas?",
      p0:"MOST LIFEBOAT ACCIDENTS HAPPEN BEFORE REACHING THE WATER",s0t:"El principio que estructura toda la lección",
      s0:"Los datos de seguridad marítima confirman que la mayoría de los accidentes graves ocurren durante la preparación y el descenso, no una vez la embarcación está en el mar.\n\n¿CÓMO RECONOCERLO? Una comprobación incompleta antes del lanzamiento, un embarque precipitado, una largada anticipada.\n¿QUÉ HACER DE INMEDIATO? Comprobar sistemáticamente cada punto crítico, respetar la disciplina de secuencia en la largada.\n¿QUÉ ERROR LO AGRAVA? Considerar la comprobación como una formalidad en lugar de una protección real.\n¿CUÁNDO PEDIR AYUDA? Ante la más mínima duda sobre el estado de la embarcación o el mecanismo de largada.",
      p1:"COMPROBACIONES ANTES DEL LANZAMIENTO",s1t:"Cada comprobación impide una catástrofe diferente",
      s1:"Tapón de achique, motor probado, sea painter preparado, ganchos comprobados: nunca una simple checklist, cada punto responde a un riesgo preciso.",
      p2:"DISCIPLINA DE EMBARQUE",s2t:"Un contexto de ejercicio, no de abandono",
      s2:"Orden de embarque, arneses asegurados antes del descenso, recuento nominal antes de la puesta a flote. La disciplina de abandono del buque se verá en la última lección del módulo.",
      p3:"SECUENCIA DE LANZAMIENTO",s3t:"La zona más propensa a accidentes de la maniobra",
      s3:"Comunicación constante con el operador, descenso controlado, y el gancho de largada: la fase que concentra el mayor número de accidentes graves documentados.",
      p4:"LOS PRIMEROS MINUTOS TRAS LA PUESTA A FLOTE",s4t:"El lanzamiento marca el comienzo de la supervivencia",
      s4:"Comprobación rápida de la embarcación, verificación de las personas, alejamiento del casco, estabilización antes de cualquier otra acción.",
      p5:"🎯 EJERCICIO OPERATIVO",p6:"⚠️ CASO DE ESTUDIO",p7:"📝 BANCO DE 15 PREGUNTAS",p8:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 1",
      sumP:["Most Lifeboat Accidents Happen Before Reaching the Water: la fase más crítica precede al mar","Cada comprobación antes del lanzamiento impide una catástrofe diferente, nunca una formalidad","Disciplina de embarque en contexto de ejercicio, el abandono del buque llegará después","El gancho de largada concentra el mayor número de accidentes documentados","El lanzamiento marca el comienzo de la supervivencia, no el final de la maniobra"],
      learnedP:["Las comprobaciones esenciales antes de cualquier lanzamiento","La disciplina de embarque en contexto de ejercicio","La secuencia de puesta a flote y sus riesgos","Las prioridades de los primeros minutos tras la puesta a flote","Por qué la mayoría de los accidentes ocurren antes del mar"],
      transition:"Launching the lifeboat is only the first step. What if no lifeboat is available?",
      safetyMsg:"A lifeboat saves lives only if it is launched safely.",
    },
    pt:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lição 1/4 · ⭐ Premium",
      title:"Lifeboats: Launching & Handling",
      intro:"Esta lição ainda não aborda o sinal de abandono do navio nem a disciplina no posto de reunião, reservados ao cenário final do módulo. Responde a uma pergunta mais simples: a embarcação existe, mas está pronta para salvar vidas?",
      p0:"MOST LIFEBOAT ACCIDENTS HAPPEN BEFORE REACHING THE WATER",s0t:"O princípio que estrutura toda a lição",
      s0:"Os dados de segurança marítima confirmam que a maioria dos acidentes graves ocorre durante a preparação e a descida, não uma vez a embarcação no mar.\n\nCOMO RECONHECER? Uma verificação incompleta antes do lançamento, um embarque precipitado, uma largada antecipada.\nO QUE FAZER IMEDIATAMENTE? Verificar sistematicamente cada ponto crítico, respeitar a disciplina de sequência na largada.\nQUE ERRO O AGRAVA? Considerar a verificação como uma formalidade em vez de uma proteção real.\nQUANDO PEDIR AJUDA? Perante a mínima dúvida sobre o estado da embarcação ou do mecanismo de largada.",
      p1:"VERIFICAÇÕES ANTES DO LANÇAMENTO",s1t:"Cada verificação impede uma catástrofe diferente",
      s1:"Bujão de esgoto, motor testado, sea painter preparado, ganchos verificados: nunca uma simples checklist, cada ponto responde a um risco preciso.",
      p2:"DISCIPLINA DE EMBARQUE",s2t:"Um contexto de exercício, não de abandono",
      s2:"Ordem de embarque, arneses presos antes da descida, chamada nominal antes de pôr a flutuar. A disciplina de abandono do navio será vista na última lição do módulo.",
      p3:"SEQUÊNCIA DE LANÇAMENTO",s3t:"A zona mais propensa a acidentes da manobra",
      s3:"Comunicação constante com o operador, descida controlada, e o gancho de largada: a fase que concentra o maior número de acidentes graves documentados.",
      p4:"OS PRIMEIROS MINUTOS APÓS ENTRAR NA ÁGUA",s4t:"O lançamento marca o início da sobrevivência",
      s4:"Controlo rápido da embarcação, verificação das pessoas, afastamento do casco, estabilização antes de qualquer outra ação.",
      p5:"🎯 EXERCÍCIO OPERACIONAL",p6:"⚠️ CASO DE ESTUDO",p7:"📝 BANCO DE 15 PERGUNTAS",p8:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 1",
      sumP:["Most Lifeboat Accidents Happen Before Reaching the Water: a fase mais crítica precede o mar","Cada verificação antes do lançamento impede uma catástrofe diferente, nunca uma formalidade","Disciplina de embarque em contexto de exercício, o abandono do navio virá mais tarde","O gancho de largada concentra o maior número de acidentes documentados","O lançamento marca o início da sobrevivência, não o fim da manobra"],
      learnedP:["As verificações essenciais antes de qualquer lançamento","A disciplina de embarque em contexto de exercício","A sequência de lançamento e os seus riscos","As prioridades dos primeiros minutos após entrar na água","Por que a maioria dos acidentes ocorre antes do mar"],
      transition:"Launching the lifeboat is only the first step. What if no lifeboat is available?",
      safetyMsg:"A lifeboat saves lives only if it is launched safely.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS5_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/4":lang==="en"?"Lesson 1/4":lang==="es"?"Lección 1/4":"Lição 1/4"}</div>
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

            <SL icon="🔍" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔍</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔍 {lang==="fr"?"VÉRIFICATIONS - INTERACTIF":lang==="en"?"CHECKS - INTERACTIVE":lang==="es"?"COMPROBACIONES - INTERACTIVO":"VERIFICAÇÕES - INTERATIVO"}</div><PreLaunchReadinessSVG lang={lang}/></Card>

            <SL icon="🦺" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🦺</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🦺 {lang==="fr"?"DISCIPLINE D'EMBARQUEMENT - INTERACTIF":lang==="en"?"BOARDING DISCIPLINE - INTERACTIVE":lang==="es"?"DISCIPLINA DE EMBARQUE - INTERACTIVO":"DISCIPLINA DE EMBARQUE - INTERATIVO"}</div><BoardingDisciplineSVG lang={lang}/></Card>

            <SL icon="🪝" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🪝</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🪝 {lang==="fr"?"SÉQUENCE DE LANCEMENT - INTERACTIF":lang==="en"?"LAUNCH SEQUENCE - INTERACTIVE":lang==="es"?"SECUENCIA DE LANZAMIENTO - INTERACTIVO":"SEQUÊNCIA DE LANÇAMENTO - INTERATIVO"}</div><LaunchSequenceSVG lang={lang}/></Card>

            <SL icon="⚖️" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚖️ {lang==="fr"?"PREMIÈRES MINUTES - INTERACTIF":lang==="en"?"FIRST MINUTES - INTERACTIVE":lang==="es"?"PRIMEROS MINUTOS - INTERACTIVO":"PRIMEIROS MINUTOS - INTERATIVO"}</div><FirstMinutesSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
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
                {lang==="fr"?"Quiz Final - Lancement d'Embarcation":lang==="en"?"Final Quiz - Lifeboat Launching":lang==="es"?"Quiz Final - Lanzamiento de Embarcación":"Quiz Final - Lançamento de Embarcação"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 1/4":"questions · Lesson 1/4"}</div>
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
              {lang==="fr"?"LEÇON 2 - RADEAUX DE SAUVETAGE →":lang==="en"?"LESSON 2 - LIFERAFTS →":lang==="es"?"LECCIÓN 2 - BALSAS SALVAVIDAS →":"LIÇÃO 2 - JANGADAS SALVA-VIDAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
