import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - STOP THINK ACT
function StopThinkActSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const stages = [
    { id:0, color:C.gold2, letter:"S", label:{fr:"STOP",en:"STOP",es:"STOP",pt:"STOP"}, desc:{fr:"Suis-je en sécurité ? Avant tout geste, s'assurer que la scène ne présente pas de danger immédiat pour soi-même.",en:"Am I safe? Before any action, make sure the scene presents no immediate danger to yourself.",es:"¿Estoy seguro? Antes de cualquier gesto, asegurarse de que la escena no presenta un peligro inmediato para uno mismo.",pt:"Estou seguro? Antes de qualquer gesto, garantir que a cena não apresenta perigo imediato para si próprio."} },
    { id:1, color:C.orange, letter:"T", label:{fr:"THINK",en:"THINK",es:"THINK",pt:"THINK"}, desc:{fr:"Quel est le combustible ? Y a-t-il de l'électricité impliquée ? Des personnes en danger ? Un espace confiné ? Un risque de propagation ?",en:"What is the fuel? Is electricity involved? Are people in danger? A confined space? A spread risk?",es:"¿Cuál es el combustible? ¿Hay electricidad implicada? ¿Personas en peligro? ¿Un espacio confinado? ¿Riesgo de propagación?",pt:"Qual é o combustível? Há eletricidade envolvida? Pessoas em perigo? Um espaço confinado? Risco de propagação?"} },
    { id:2, color:C.red, letter:"A", label:{fr:"ACT",en:"ACT",es:"ACT",pt:"ACT"}, desc:{fr:"Alarme, isolement de la source si nécessaire, choix de l'agent compatible, puis attaque. Toujours dans cet ordre.",en:"Alarm, isolate the source if needed, choose the compatible agent, then attack. Always in this order.",es:"Alarma, aislamiento de la fuente si es necesario, elección del agente compatible, luego ataque. Siempre en este orden.",pt:"Alarme, isolamento da fonte se necessário, escolha do agente compatível, depois ataque. Sempre por esta ordem."} },
  ];
  const sel_ = stages.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {stages.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:sel===s.id?s.color:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.white,flexShrink:0}}>{s.letter}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Cette méthode s'applique à chaque leçon suivante du module.":lang==="en"?"This method applies to every following lesson of the module.":lang==="es"?"Este método se aplica a cada lección siguiente del módulo.":"Este método aplica-se a cada lição seguinte do módulo."}</div>
    </div>
  );
}

// SVG 2 - ELECTRIC FIRE SEQUENCE
function ElectricFireSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"📣", label:{fr:"Donner l'alerte",en:"Raise the alarm",es:"Dar la alarma",pt:"Dar o alarme"}, desc:{fr:"Signaler immédiatement, avant tout autre geste, même si le feu semble petit.",en:"Report immediately, before any other action, even if the fire seems small.",es:"Informar de inmediato, antes de cualquier otro gesto, aunque el fuego parezca pequeño.",pt:"Reportar de imediato, antes de qualquer outro gesto, mesmo que o fogo pareça pequeno."} },
    { id:2, icon:"🔌", label:{fr:"Isoler le courant",en:"Isolate the power",es:"Aislar la corriente",pt:"Isolar a corrente"}, desc:{fr:"Couper l'alimentation électrique de la zone si possible, avant de choisir un agent extincteur.",en:"Cut the electrical supply to the area if possible, before choosing an extinguishing agent.",es:"Cortar la alimentación eléctrica de la zona si es posible, antes de elegir un agente extintor.",pt:"Cortar a alimentação elétrica da zona se possível, antes de escolher um agente extintor."} },
    { id:3, icon:"🧯", label:{fr:"Choisir l'agent correct",en:"Select the correct agent",es:"Elegir el agente correcto",pt:"Escolher o agente correto"}, desc:{fr:"Une fois le courant coupé, un feu électrique redevient un feu classique. Choisir l'agent adapté au combustible réel.",en:"Once power is cut, an electrical fire becomes an ordinary fire again. Choose the agent suited to the actual fuel.",es:"Una vez cortada la corriente, un fuego eléctrico vuelve a ser un fuego normal. Elegir el agente adecuado al combustible real.",pt:"Depois de cortada a corrente, um fogo elétrico volta a ser um fogo normal. Escolher o agente adequado ao combustível real."} },
    { id:4, icon:"🎯", label:{fr:"Attaquer",en:"Attack",es:"Atacar",pt:"Atacar"}, desc:{fr:"Intervenir avec l'agent choisi, à bonne distance, en gardant une voie de retrait dégagée.",en:"Intervene with the chosen agent, at a safe distance, keeping a clear retreat path.",es:"Intervenir con el agente elegido, a una distancia segura, manteniendo una vía de retirada despejada.",pt:"Intervir com o agente escolhido, a uma distância segura, mantendo uma via de recuo desimpedida."} },
    { id:5, icon:"👁️", label:{fr:"Surveiller",en:"Monitor",es:"Vigilar",pt:"Vigiar"}, desc:{fr:"Rester attentif après extinction apparente : une reprise de feu reste possible.",en:"Stay alert after apparent extinction: reignition remains possible.",es:"Permanecer atento tras la extinción aparente: la reignición sigue siendo posible.",pt:"Permanecer atento após a extinção aparente: a reignição continua a ser possível."} },
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

// SVG 3 - WRONG AGENT CONSEQUENCES (VISUAL)
function WrongAgentSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🟥", label:{fr:"Eau sur feu d'huile",en:"Water on oil fire",es:"Agua sobre fuego de aceite",pt:"Água sobre fogo de óleo"}, desc:{fr:"Eau → Feu d'huile → Projection violente de gouttelettes enflammées → Propagation immédiate dans toute la zone. L'eau ne doit jamais être utilisée sur un feu d'hydrocarbure.",en:"Water → Oil fire → Violent splashing of burning droplets → Immediate spread across the area. Water must never be used on a hydrocarbon fire.",es:"Agua → Fuego de aceite → Proyección violenta de gotas ardiendo → Propagación inmediata por toda la zona. El agua nunca debe usarse en un fuego de hidrocarburo.",pt:"Água → Fogo de óleo → Projeção violenta de gotículas em chamas → Propagação imediata por toda a zona. A água nunca deve ser usada num fogo de hidrocarboneto."} },
    { id:2, icon:"🟥", label:{fr:"Eau sur tableau électrique",en:"Water on electrical panel",es:"Agua sobre cuadro eléctrico",pt:"Água sobre quadro elétrico"}, desc:{fr:"Eau → Tableau électrique → Risque d'électrocution du sauveteur → Incendie aggravé au lieu d'être maîtrisé. Toujours isoler le courant avant tout agent liquide.",en:"Water → Electrical panel → Risk of electrocuting the rescuer → Fire made worse instead of controlled. Always isolate power before any liquid agent.",es:"Agua → Cuadro eléctrico → Riesgo de electrocución del socorrista → Incendio agravado en lugar de controlado. Aislar siempre la corriente antes de cualquier agente líquido.",pt:"Água → Quadro elétrico → Risco de eletrocussão do socorrista → Incêndio agravado em vez de controlado. Isolar sempre a corrente antes de qualquer agente líquido."} },
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
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}44`,fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 4 - QUICK DECISION TREE
function DecisionTreeSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🪵", label:{fr:"Matériaux solides",en:"Solid materials",es:"Materiales sólidos",pt:"Materiais sólidos"}, desc:{fr:"Bois, papier, tissus : risque principal, la propagation. Agent à privilégier : eau ou agents polyvalents, si aucune électricité n'est impliquée.",en:"Wood, paper, fabric: main risk is spread. Preferred agent: water or multipurpose agents, if no electricity is involved.",es:"Madera, papel, tela: riesgo principal, la propagación. Agente a priorizar: agua o agentes polivalentes, si no hay electricidad implicada.",pt:"Madeira, papel, tecido: risco principal, a propagação. Agente a privilegiar: água ou agentes polivalentes, se não houver eletricidade envolvida."} },
    { id:2, icon:"🛢️", label:{fr:"Liquides inflammables",en:"Flammable liquids",es:"Líquidos inflamables",pt:"Líquidos inflamáveis"}, desc:{fr:"Huile, carburant : risque principal, la projection et la propagation. Jamais d'eau. Agent à privilégier : mousse ou CO2.",en:"Oil, fuel: main risk is splashing and spread. Never water. Preferred agent: foam or CO2.",es:"Aceite, combustible: riesgo principal, la proyección y la propagación. Nunca agua. Agente a priorizar: espuma o CO2.",pt:"Óleo, combustível: risco principal, a projeção e a propagação. Nunca água. Agente a privilegiar: espuma ou CO2."} },
    { id:3, icon:"⚡", label:{fr:"Origine électrique",en:"Electrical origin",es:"Origen eléctrico",pt:"Origem elétrica"}, desc:{fr:"Risque principal, l'électrocution. Isoler le courant en priorité absolue avant tout agent. Agent à privilégier : CO2 ou poudre, jamais d'eau tant que le courant n'est pas coupé.",en:"Main risk is electrocution. Isolate power as the absolute priority before any agent. Preferred agent: CO2 or powder, never water while power is still on.",es:"Riesgo principal, la electrocución. Aislar la corriente como prioridad absoluta antes de cualquier agente. Agente a priorizar: CO2 o polvo, nunca agua mientras la corriente esté conectada.",pt:"Risco principal, a eletrocussão. Isolar a corrente como prioridade absoluta antes de qualquer agente. Agente a privilegiar: CO2 ou pó, nunca água enquanto a corrente estiver ligada."} },
    { id:4, icon:"🚪", label:{fr:"Espace confiné",en:"Confined space",es:"Espacio confinado",pt:"Espaço confinado"}, desc:{fr:"Risque principal, la fumée et la réduction d'oxygène. Priorité à l'alarme et à l'évaluation avant toute attaque directe.",en:"Main risk is smoke and reduced oxygen. Priority to alarm and assessment before any direct attack.",es:"Riesgo principal, el humo y la reducción de oxígeno. Prioridad a la alarma y la evaluación antes de cualquier ataque directo.",pt:"Risco principal, o fumo e a redução de oxigénio. Prioridade ao alarme e à avaliação antes de qualquer ataque direto."} },
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

// KNOW YOUR PORTABLE FIRE EXTINGUISHERS
function PortableExtinguishersSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"💧", color:C.blue2, label:{fr:"Water (rouge)",en:"Water (red)",es:"Agua (rojo)",pt:"Água (vermelho)"}, role:{fr:"Refroidit le combustible",en:"Cools the fuel",es:"Enfría el combustible",pt:"Arrefece o combustível"}, classes:{fr:"Classe A - bois, papier, textiles",en:"Class A - wood, paper, textiles",es:"Clase A - madera, papel, textiles",pt:"Classe A - madeira, papel, têxteis"} },
    { id:2, icon:"🫧", color:C.gold2, label:{fr:"Foam (crème)",en:"Foam (cream)",es:"Espuma (crema)",pt:"Espuma (creme)"}, role:{fr:"Étouffe et refroidit",en:"Smothers and cools",es:"Sofoca y enfría",pt:"Sufoca e arrefece"}, classes:{fr:"Classes A & B - solides et liquides inflammables",en:"Classes A & B - solids and flammable liquids",es:"Clases A y B - sólidos y líquidos inflamables",pt:"Classes A e B - sólidos e líquidos inflamáveis"} },
    { id:3, icon:"🌫️", color:C.orange, label:{fr:"Dry Powder (bleu)",en:"Dry Powder (blue)",es:"Polvo seco (azul)",pt:"Pó seco (azul)"}, role:{fr:"Interrompt la réaction chimique",en:"Interrupts the chemical reaction",es:"Interrumpe la reacción química",pt:"Interrompe a reação química"}, classes:{fr:"Classes A, B, C (et D selon le type) - feux polyvalents",en:"Classes A, B, C (and D depending on type) - multipurpose fires",es:"Clases A, B, C (y D según el tipo) - fuegos polivalentes",pt:"Classes A, B, C (e D consoante o tipo) - fogos polivalentes"} },
    { id:4, icon:"❄️", color:C.red, label:{fr:"CO2 (noir)",en:"CO2 (black)",es:"CO2 (negro)",pt:"CO2 (preto)"}, role:{fr:"Déplace l'oxygène, ne laisse aucun résidu",en:"Displaces oxygen, leaves no residue",es:"Desplaza el oxígeno, no deja ningún residuo",pt:"Desloca o oxigénio, não deixa qualquer resíduo"}, classes:{fr:"Classe B et équipements électriques sous tension",en:"Class B and live electrical equipment",es:"Clase B y equipos eléctricos bajo tensión",pt:"Classe B e equipamentos elétricos sob tensão"} },
    { id:5, icon:"🍳", color:C.green, label:{fr:"Wet Chemical (jaune)",en:"Wet Chemical (yellow)",es:"Químico húmedo (amarillo)",pt:"Químico húmido (amarelo)"}, role:{fr:"Saponifie et étouffe",en:"Saponifies and smothers",es:"Saponifica y sofoca",pt:"Saponifica e sufoca"}, classes:{fr:"Classe F/K - huiles et graisses de cuisson",en:"Class F/K - cooking oils and fats",es:"Clase F/K - aceites y grasas de cocina",pt:"Classe F/K - óleos e gorduras de cozinha"} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?`${i.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?i.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>
        <div style={{marginBottom:4}}><strong>{lang==="fr"?"Rôle :":lang==="en"?"Role:":lang==="es"?"Función:":"Papel:"}</strong> {sel_.role[lang]||sel_.role.fr}</div>
        <div><strong>{lang==="fr"?"Classes compatibles :":lang==="en"?"Compatible classes:":lang==="es"?"Clases compatibles:":"Classes compatíveis:"}</strong> {sel_.classes[lang]||sel_.classes.fr}</div>
      </div>}
      <div style={{marginTop:10,padding:"9px 12px",borderRadius:10,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`,fontSize:10,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"⚠️ Always read the label on the extinguisher before use. The extinguishing agent, fire classes and operating instructions are clearly indicated on every approved extinguisher carried on board.":lang==="en"?"⚠️ Always read the label on the extinguisher before use. The extinguishing agent, fire classes and operating instructions are clearly indicated on every approved extinguisher carried on board.":lang==="es"?"⚠️ Always read the label on the extinguisher before use. The extinguishing agent, fire classes and operating instructions are clearly indicated on every approved extinguisher carried on board.":"⚠️ Always read the label on the extinguisher before use. The extinguishing agent, fire classes and operating instructions are clearly indicated on every approved extinguisher carried on board."}
      </div>
    </div>
  );
}

// EXERCISE - STRATEGY DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Un feu se déclare près d'un tableau électrique. Que faites-vous avant tout ?\na) Prendre le premier extincteur disponible et attaquer\nb) Couper le courant si possible avant de choisir un agent\nc) Utiliser de l'eau immédiatement pour aller vite"},
      {id:"q2",q:"Un feu d'huile se déclare en cuisine. Quel agent ne devez-vous jamais utiliser ?\na) L'eau\nb) La mousse\nc) Le CO2"},
      {id:"q3",q:"Selon la méthode STOP-THINK-ACT, que faites-vous en tout premier ?\na) Choisir l'agent extincteur\nb) Donner l'alerte\nc) Vérifier que vous êtes en sécurité (STOP)"},
      {id:"q4",q:"Votre instinct vous pousse à prendre de l'eau immédiatement face à un feu inconnu. Que faites-vous ?\na) Suivre votre instinct, c'est souvent le bon réflexe\nb) Vous arrêter, identifier le combustible et le contexte avant de choisir un agent\nc) Utiliser l'eau par défaut dans tous les cas"},
    ],
    en:[
      {id:"q1",q:"A fire breaks out near an electrical panel. What do you do first?\na) Grab the first extinguisher available and attack\nb) Cut the power if possible before choosing an agent\nc) Use water immediately to be fast"},
      {id:"q2",q:"An oil fire breaks out in the galley. Which agent must you never use?\na) Water\nb) Foam\nc) CO2"},
      {id:"q3",q:"According to the STOP-THINK-ACT method, what do you do first?\na) Choose the extinguishing agent\nb) Raise the alarm\nc) Check that you are safe (STOP)"},
      {id:"q4",q:"Your instinct pushes you to grab water immediately facing an unknown fire. What do you do?\na) Follow your instinct, it's usually the right reflex\nb) Stop, identify the fuel and context before choosing an agent\nc) Use water by default in all cases"},
    ],
    es:[
      {id:"q1",q:"Se declara un fuego cerca de un cuadro eléctrico. ¿Qué haces primero?\na) Coger el primer extintor disponible y atacar\nb) Cortar la corriente si es posible antes de elegir un agente\nc) Usar agua de inmediato para ir rápido"},
      {id:"q2",q:"Se declara un fuego de aceite en la cocina. ¿Qué agente nunca debes usar?\na) Agua\nb) Espuma\nc) CO2"},
      {id:"q3",q:"Según el método STOP-THINK-ACT, ¿qué haces primero?\na) Elegir el agente extintor\nb) Dar la alarma\nc) Comprobar que estás seguro (STOP)"},
      {id:"q4",q:"Tu instinto te empuja a coger agua de inmediato ante un fuego desconocido. ¿Qué haces?\na) Seguir tu instinto, suele ser el reflejo correcto\nb) Detenerte, identificar el combustible y el contexto antes de elegir un agente\nc) Usar agua por defecto en todos los casos"},
    ],
    pt:[
      {id:"q1",q:"Um fogo declara-se perto de um quadro elétrico. O que fazes primeiro?\na) Pegar no primeiro extintor disponível e atacar\nb) Cortar a corrente se possível antes de escolher um agente\nc) Usar água de imediato para ser rápido"},
      {id:"q2",q:"Um fogo de óleo declara-se na cozinha. Que agente nunca deves usar?\na) Água\nb) Espuma\nc) CO2"},
      {id:"q3",q:"Segundo o método STOP-THINK-ACT, o que fazes primeiro?\na) Escolher o agente extintor\nb) Dar o alarme\nc) Verificar que estás seguro (STOP)"},
      {id:"q4",q:"O teu instinto empurra-te a pegar em água de imediato perante um fogo desconhecido. O que fazes?\na) Seguir o teu instinto, costuma ser o reflexo certo\nb) Parar, identificar o combustível e o contexto antes de escolher um agente\nc) Usar água por defeito em todos os casos"},
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

// ACCIDENT CASE - COMPOSITE CASE (THE WRONG REFLEX)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Le Mauvais Réflexe",teaser:"Cas composite - un feu simple aggravé par un choix d'agent instinctif",
      what:"En salle des machines, un feu se déclare près d'un tableau électrique après une petite fuite d'huile. Un membre d'équipage, voyant les flammes, attrape le tuyau d'eau le plus proche et l'utilise directement sur le foyer, sans vérifier ni le courant ni la nature exacte du combustible. Le contact de l'eau avec le tableau électrique provoque une projection dangereuse et le feu, alimenté par l'huile, se propage davantage au lieu de s'éteindre.",
      cause:"• Aucune vérification du courant électrique avant d'utiliser l'eau\n• Combustible réel (huile) non identifié avant le choix de l'agent\n• Réaction instinctive (prendre de l'eau) plutôt qu'une décision structurée\n• Aucune application de la méthode STOP-THINK-ACT avant d'agir",
      lessons:"✓ Fight the Fire. Not Your Instinct : l'eau semblait être le réflexe évident, mais c'était la pire décision possible ici\n✓ STOP-THINK-ACT aurait révélé la présence d'électricité et d'huile avant tout geste\n✓ Isoler le courant reste toujours prioritaire avant tout agent liquide\n✓ A firefighter does not choose the extinguisher first. A firefighter understands the fire first",
      link:"🔗 Ce cas illustre directement pourquoi la méthode STOP-THINK-ACT doit primer sur le réflexe instinctif, même en situation de stress."},
    en:{title:"Case Study - The Wrong Reflex",teaser:"Composite case - a simple fire worsened by an instinctive agent choice",
      what:"In the engine room, a fire breaks out near an electrical panel after a small oil leak. A crew member, seeing the flames, grabs the nearest water hose and uses it directly on the fire, without checking either the power or the exact nature of the fuel. The water contacting the electrical panel causes a dangerous splash, and the fire, fed by the oil, spreads further instead of going out.",
      cause:"• No check of the electrical power before using water\n• The actual fuel (oil) not identified before choosing the agent\n• Instinctive reaction (grabbing water) rather than a structured decision\n• No application of the STOP-THINK-ACT method before acting",
      lessons:"✓ Fight the Fire. Not Your Instinct: water seemed like the obvious reflex, but it was the worst possible decision here\n✓ STOP-THINK-ACT would have revealed the presence of electricity and oil before any action\n✓ Isolating power always remains a priority before any liquid agent\n✓ A firefighter does not choose the extinguisher first. A firefighter understands the fire first",
      link:"🔗 This case directly illustrates why the STOP-THINK-ACT method must take priority over instinctive reflex, even under stress."},
    es:{title:"Caso de estudio - El Reflejo Equivocado",teaser:"Caso compuesto - un fuego simple agravado por una elección de agente instintiva",
      what:"En la sala de máquinas, se declara un fuego cerca de un cuadro eléctrico tras una pequeña fuga de aceite. Un tripulante, al ver las llamas, coge la manguera de agua más cercana y la usa directamente sobre el foco, sin comprobar ni la corriente ni la naturaleza exacta del combustible. El contacto del agua con el cuadro eléctrico provoca una proyección peligrosa, y el fuego, alimentado por el aceite, se propaga más en lugar de apagarse.",
      cause:"• Ninguna comprobación de la corriente eléctrica antes de usar agua\n• Combustible real (aceite) no identificado antes de elegir el agente\n• Reacción instintiva (coger agua) en lugar de una decisión estructurada\n• Ninguna aplicación del método STOP-THINK-ACT antes de actuar",
      lessons:"✓ Fight the Fire. Not Your Instinct: el agua parecía el reflejo obvio, pero era la peor decisión posible aquí\n✓ STOP-THINK-ACT habría revelado la presencia de electricidad y aceite antes de cualquier gesto\n✓ Aislar la corriente sigue siendo siempre prioritario antes de cualquier agente líquido\n✓ A firefighter does not choose the extinguisher first. A firefighter understands the fire first",
      link:"🔗 Este caso ilustra directamente por qué el método STOP-THINK-ACT debe primar sobre el reflejo instintivo, incluso bajo estrés."},
    pt:{title:"Caso de estudo - O Reflexo Errado",teaser:"Caso composto - um fogo simples agravado por uma escolha de agente instintiva",
      what:"Na casa das máquinas, um fogo declara-se perto de um quadro elétrico após uma pequena fuga de óleo. Um tripulante, ao ver as chamas, agarra na mangueira de água mais próxima e usa-a diretamente sobre o foco, sem verificar nem a corrente nem a natureza exata do combustível. O contacto da água com o quadro elétrico provoca uma projeção perigosa, e o fogo, alimentado pelo óleo, propaga-se ainda mais em vez de se apagar.",
      cause:"• Nenhuma verificação da corrente elétrica antes de usar água\n• Combustível real (óleo) não identificado antes de escolher o agente\n• Reação instintiva (agarrar em água) em vez de uma decisão estruturada\n• Nenhuma aplicação do método STOP-THINK-ACT antes de agir",
      lessons:"✓ Fight the Fire. Not Your Instinct: a água parecia o reflexo óbvio, mas era a pior decisão possível aqui\n✓ STOP-THINK-ACT teria revelado a presença de eletricidade e óleo antes de qualquer gesto\n✓ Isolar a corrente continua sempre a ser prioritário antes de qualquer agente líquido\n✓ A firefighter does not choose the extinguisher first. A firefighter understands the fire first",
      link:"🔗 Este caso ilustra diretamente por que o método STOP-THINK-ACT deve ter prioridade sobre o reflexo instintivo, mesmo sob stress."},
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
    {q:"Que signifie le principe 'Fight the Fire. Not Your Instinct' ?",opts:["L'instinct est toujours le meilleur guide en urgence","La décision doit suivre une méthode structurée, pas un réflexe automatique comme prendre de l'eau par défaut","Il ne faut jamais agir vite face à un feu","Ce principe ne concerne que les feux électriques"],correct:1,expl:"L'instinct pousse souvent vers l'eau, alors qu'une méthode structurée évite les erreurs graves."},
    {q:"Que signifie la première lettre de STOP dans la méthode STOP-THINK-ACT ?",opts:["Éteindre le feu immédiatement","S'assurer d'être en sécurité avant tout autre geste","Signaler l'incendie","Choisir un agent extincteur"],correct:1,expl:"STOP consiste à vérifier sa propre sécurité avant toute action."},
    {q:"Dans l'étape THINK, quelles questions se pose-t-on ?",opts:["Uniquement le prix de l'extincteur","Combustible, électricité, personnes en danger, espace confiné, risque de propagation","Uniquement la couleur des flammes","Rien de particulier, on passe directement à l'action"],correct:1,expl:"THINK structure l'évaluation de la situation avant de choisir un agent."},
    {q:"Que faut-il faire en priorité face à un feu près d'un tableau électrique ?",opts:["Utiliser de l'eau immédiatement","Isoler le courant si possible avant de choisir un agent","Attendre que le feu s'éteigne seul","Ouvrir toutes les issues"],correct:1,expl:"Isoler le courant transforme un feu électrique dangereux en feu classique plus simple à traiter."},
    {q:"Pourquoi ne jamais utiliser d'eau sur un feu d'huile ?",opts:["L'eau n'a aucun effet, ni bon ni mauvais","L'eau provoque une projection violente de gouttelettes enflammées et une propagation immédiate","L'eau éteint le feu plus vite que tout autre agent","Il n'y a aucune raison particulière"],correct:1,expl:"L'eau sur un feu d'hydrocarbure aggrave la situation par projection et propagation."},
    {q:"Pourquoi ne jamais utiliser d'eau sur un tableau électrique sous tension ?",opts:["Ce n'est pas dangereux si le feu est petit","Risque d'électrocution du sauveteur et aggravation de l'incendie","L'eau protège contre l'électrocution","Il n'y a aucun risque particulier"],correct:1,expl:"L'eau conduit l'électricité, exposant le sauveteur à un risque mortel."},
    {q:"Pour un feu de matériaux solides (bois, papier) sans électricité impliquée, quel agent est généralement approprié ?",opts:["Uniquement de la poudre spéciale D","Eau ou agents polyvalents","Jamais aucun agent liquide","Uniquement du CO2"],correct:1,expl:"Sans risque électrique, l'eau ou les agents polyvalents conviennent aux matériaux solides."},
    {q:"Pour un liquide inflammable comme l'huile ou le carburant, quel est le risque principal ?",opts:["Aucun risque particulier","La projection et la propagation rapide","Uniquement la fumée","Le bruit"],correct:1,expl:"Les liquides inflammables projettent et propagent le feu rapidement si l'agent est incompatible."},
    {q:"Dans un espace confiné, quelle est la priorité avant toute attaque directe ?",opts:["Attaquer immédiatement le feu","L'alarme et l'évaluation de la situation, à cause du risque de fumée et de réduction d'oxygène","Ouvrir toutes les portes en même temps","Aucune priorité particulière"],correct:1,expl:"Un espace confiné amplifie les risques de fumée et de manque d'oxygène, imposant prudence avant action."},
    {q:"Dans le cas d'étude du Mauvais Réflexe, quelle a été l'erreur principale ?",opts:["Avoir donné l'alerte trop tôt","Avoir utilisé de l'eau sur un feu électrique et d'huile sans vérification préalable","Avoir attendu trop longtemps avant d'agir","Avoir utilisé un agent trop puissant"],correct:1,expl:"L'eau a été utilisée par réflexe, sans vérifier le courant ni le combustible réel."},
    {q:"Que signifie 'A firefighter does not choose the extinguisher first. A firefighter understands the fire first' ?",opts:["Il faut toujours choisir l'extincteur le plus proche","Comprendre la nature du feu doit précéder le choix de l'agent, jamais l'inverse","L'extincteur n'a aucune importance","Il faut deviner l'agent au hasard"],correct:1,expl:"La compréhension du feu précède toujours le choix de l'agent, jamais l'inverse."},
    {q:"Quelle étape du MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) cette leçon couvre-t-elle principalement ?",opts:["Detect","Alarm","Recover","Command"],correct:1,expl:"Cette leçon développe la décision et l'alerte, avant que Contain ne soit développé dans la leçon suivante."},
    {q:"La méthode STOP-THINK-ACT est-elle réutilisable dans les leçons suivantes du module ?",opts:["Non, elle ne concerne que cette leçon","Oui, elle s'applique à chaque situation d'incendie abordée dans le reste du module","Non, chaque leçon a sa propre méthode indépendante","Oui, mais uniquement pour les feux électriques"],correct:1,expl:"STOP-THINK-ACT est une méthode transversale, réutilisable à chaque leçon incendie."},
    {q:"Cette leçon enseigne-t-elle les classes de feu en détail (A, B, C, D, F) ?",opts:["Oui, en profondeur","Non, l'accent est mis sur le raisonnement de décision, pas sur la mémorisation des classes déjà couvertes ailleurs","Oui, mais uniquement pour la classe B","Non, aucune classe n'est jamais mentionnée dans MAP"],correct:1,expl:"Cette leçon privilégie la logique de décision plutôt que la mémorisation déjà couverte dans Engine."},
    {q:"Ce module enseigne-t-il un substitut à une formation BST pratique certifiée ?",opts:["Oui, il équivaut à une certification complète","Non, il enseigne le raisonnement de décision, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne des principes de décision, jamais un remplacement de la formation BST pratique."},
  ],
  en:[
    {q:"What does the principle 'Fight the Fire. Not Your Instinct' mean?",opts:["Instinct is always the best guide in an emergency","Decisions must follow a structured method, not an automatic reflex like grabbing water by default","You should never act fast facing a fire","This principle only concerns electrical fires"],correct:1,expl:"Instinct often pushes toward water, while a structured method avoids serious mistakes."},
    {q:"What does the first letter of STOP mean in the STOP-THINK-ACT method?",opts:["Extinguish the fire immediately","Make sure you are safe before any other action","Report the fire","Choose an extinguishing agent"],correct:1,expl:"STOP means checking your own safety before any action."},
    {q:"In the THINK step, what questions do you ask yourself?",opts:["Only the price of the extinguisher","Fuel, electricity, people in danger, confined space, spread risk","Only the color of the flames","Nothing in particular, you move straight to action"],correct:1,expl:"THINK structures the assessment of the situation before choosing an agent."},
    {q:"What must be done as a priority facing a fire near an electrical panel?",opts:["Use water immediately","Isolate the power if possible before choosing an agent","Wait for the fire to go out on its own","Open all exits"],correct:1,expl:"Isolating power turns a dangerous electrical fire into an ordinary fire, easier to handle."},
    {q:"Why never use water on an oil fire?",opts:["Water has no effect, good or bad","Water causes violent splashing of burning droplets and immediate spread","Water extinguishes faster than any other agent","There is no particular reason"],correct:1,expl:"Water on a hydrocarbon fire worsens the situation through splashing and spread."},
    {q:"Why never use water on a live electrical panel?",opts:["It isn't dangerous if the fire is small","Risk of electrocuting the rescuer and worsening the fire","Water protects against electrocution","There is no particular risk"],correct:1,expl:"Water conducts electricity, exposing the rescuer to a deadly risk."},
    {q:"For a fire of solid materials (wood, paper) with no electricity involved, what agent is generally appropriate?",opts:["Only special D powder","Water or multipurpose agents","Never any liquid agent","Only CO2"],correct:1,expl:"With no electrical risk, water or multipurpose agents suit solid materials."},
    {q:"For a flammable liquid like oil or fuel, what is the main risk?",opts:["No particular risk","Splashing and rapid spread","Only smoke","Noise"],correct:1,expl:"Flammable liquids splash and spread fire quickly if the agent is incompatible."},
    {q:"In a confined space, what is the priority before any direct attack?",opts:["Attack the fire immediately","The alarm and assessing the situation, due to smoke and reduced oxygen risk","Opening all doors at once","No particular priority"],correct:1,expl:"A confined space amplifies smoke and oxygen risks, requiring caution before action."},
    {q:"In the Wrong Reflex case study, what was the main mistake?",opts:["Raising the alarm too early","Using water on an electrical and oil fire without prior checking","Waiting too long before acting","Using too powerful an agent"],correct:1,expl:"Water was used by reflex, without checking the power or the actual fuel."},
    {q:"What does 'A firefighter does not choose the extinguisher first. A firefighter understands the fire first' mean?",opts:["You should always choose the nearest extinguisher","Understanding the fire's nature must precede choosing the agent, never the reverse","The extinguisher has no importance","You should guess the agent at random"],correct:1,expl:"Understanding the fire always precedes choosing the agent, never the reverse."},
    {q:"Which step of the MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) does this lesson mainly cover?",opts:["Detect","Alarm","Recover","Command"],correct:1,expl:"This lesson develops decision-making and alerting, before Contain is developed in the next lesson."},
    {q:"Is the STOP-THINK-ACT method reusable in the module's following lessons?",opts:["No, it only concerns this lesson","Yes, it applies to every fire situation covered in the rest of the module","No, each lesson has its own independent method","Yes, but only for electrical fires"],correct:1,expl:"STOP-THINK-ACT is a cross-cutting method, reusable in every fire lesson."},
    {q:"Does this lesson teach fire classes in detail (A, B, C, D, F)?",opts:["Yes, in depth","No, the focus is on decision reasoning, not memorizing classes already covered elsewhere","Yes, but only for class B","No, classes are never mentioned anywhere in MAP"],correct:1,expl:"This lesson favors decision logic over memorization already covered in Engine."},
    {q:"Does this module teach a replacement for certified practical BST training?",opts:["Yes, it is equivalent to a full certification","No, it teaches decision reasoning, never a replacement for certified practical training","Yes, but only for officers","No, it is useless without equipment"],correct:1,expl:"MAP teaches decision principles, never a replacement for practical BST training."},
  ],
  es:[
    {q:"¿Qué significa el principio 'Fight the Fire. Not Your Instinct'?",opts:["El instinto siempre es la mejor guía en una emergencia","Las decisiones deben seguir un método estructurado, no un reflejo automático como coger agua por defecto","Nunca hay que actuar rápido ante un fuego","Este principio solo concierne a los fuegos eléctricos"],correct:1,expl:"El instinto suele empujar hacia el agua, mientras que un método estructurado evita errores graves."},
    {q:"¿Qué significa la primera letra de STOP en el método STOP-THINK-ACT?",opts:["Apagar el fuego de inmediato","Asegurarse de estar seguro antes de cualquier otro gesto","Informar del incendio","Elegir un agente extintor"],correct:1,expl:"STOP consiste en comprobar la propia seguridad antes de cualquier acción."},
    {q:"En la etapa THINK, ¿qué preguntas te haces?",opts:["Solo el precio del extintor","Combustible, electricidad, personas en peligro, espacio confinado, riesgo de propagación","Solo el color de las llamas","Nada en particular, se pasa directamente a la acción"],correct:1,expl:"THINK estructura la evaluación de la situación antes de elegir un agente."},
    {q:"¿Qué hay que hacer con prioridad ante un fuego cerca de un cuadro eléctrico?",opts:["Usar agua de inmediato","Aislar la corriente si es posible antes de elegir un agente","Esperar a que el fuego se apague solo","Abrir todas las salidas"],correct:1,expl:"Aislar la corriente convierte un fuego eléctrico peligroso en un fuego normal, más fácil de tratar."},
    {q:"¿Por qué nunca usar agua en un fuego de aceite?",opts:["El agua no tiene ningún efecto, ni bueno ni malo","El agua provoca una proyección violenta de gotas ardiendo y una propagación inmediata","El agua apaga más rápido que cualquier otro agente","No hay ninguna razón particular"],correct:1,expl:"El agua sobre un fuego de hidrocarburo agrava la situación por proyección y propagación."},
    {q:"¿Por qué nunca usar agua en un cuadro eléctrico bajo tensión?",opts:["No es peligroso si el fuego es pequeño","Riesgo de electrocución del socorrista y agravación del incendio","El agua protege contra la electrocución","No hay ningún riesgo particular"],correct:1,expl:"El agua conduce la electricidad, exponiendo al socorrista a un riesgo mortal."},
    {q:"Para un fuego de materiales sólidos (madera, papel) sin electricidad implicada, ¿qué agente suele ser apropiado?",opts:["Solo polvo especial D","Agua o agentes polivalentes","Nunca ningún agente líquido","Solo CO2"],correct:1,expl:"Sin riesgo eléctrico, el agua o los agentes polivalentes son adecuados para materiales sólidos."},
    {q:"Para un líquido inflamable como el aceite o el combustible, ¿cuál es el riesgo principal?",opts:["Ningún riesgo particular","La proyección y la propagación rápida","Solo el humo","El ruido"],correct:1,expl:"Los líquidos inflamables proyectan y propagan el fuego rápidamente si el agente es incompatible."},
    {q:"En un espacio confinado, ¿cuál es la prioridad antes de cualquier ataque directo?",opts:["Atacar el fuego de inmediato","La alarma y la evaluación de la situación, por el riesgo de humo y reducción de oxígeno","Abrir todas las puertas a la vez","Ninguna prioridad particular"],correct:1,expl:"Un espacio confinado amplifica los riesgos de humo y falta de oxígeno, exigiendo prudencia antes de actuar."},
    {q:"En el caso de estudio del Reflejo Equivocado, ¿cuál fue el error principal?",opts:["Haber dado la alarma demasiado pronto","Haber usado agua en un fuego eléctrico y de aceite sin comprobación previa","Haber esperado demasiado antes de actuar","Haber usado un agente demasiado potente"],correct:1,expl:"El agua se usó por reflejo, sin comprobar la corriente ni el combustible real."},
    {q:"¿Qué significa 'A firefighter does not choose the extinguisher first. A firefighter understands the fire first'?",opts:["Siempre hay que elegir el extintor más cercano","Comprender la naturaleza del fuego debe preceder a la elección del agente, nunca al revés","El extintor no tiene ninguna importancia","Hay que adivinar el agente al azar"],correct:1,expl:"Comprender el fuego siempre precede a la elección del agente, nunca al revés."},
    {q:"¿Qué etapa del MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) cubre principalmente esta lección?",opts:["Detect","Alarm","Recover","Command"],correct:1,expl:"Esta lección desarrolla la decisión y la alerta, antes de que Contain se desarrolle en la siguiente lección."},
    {q:"¿Es reutilizable el método STOP-THINK-ACT en las siguientes lecciones del módulo?",opts:["No, solo concierne a esta lección","Sí, se aplica a cada situación de incendio abordada en el resto del módulo","No, cada lección tiene su propio método independiente","Sí, pero solo para fuegos eléctricos"],correct:1,expl:"STOP-THINK-ACT es un método transversal, reutilizable en cada lección de incendio."},
    {q:"¿Esta lección enseña las clases de fuego en detalle (A, B, C, D, F)?",opts:["Sí, en profundidad","No, el énfasis está en el razonamiento de decisión, no en memorizar clases ya cubiertas en otro lugar","Sí, pero solo para la clase B","No, las clases nunca se mencionan en MAP"],correct:1,expl:"Esta lección prioriza la lógica de decisión sobre la memorización ya cubierta en Engine."},
    {q:"¿Este módulo enseña un sustituto de una formación BST práctica certificada?",opts:["Sí, equivale a una certificación completa","No, enseña razonamiento de decisión, nunca un sustituto de una formación práctica certificada","Sí, pero solo para oficiales","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña principios de decisión, nunca un sustituto de la formación BST práctica."},
  ],
  pt:[
    {q:"O que significa o princípio 'Fight the Fire. Not Your Instinct'?",opts:["O instinto é sempre o melhor guia numa emergência","As decisões devem seguir um método estruturado, não um reflexo automático como pegar em água por defeito","Nunca se deve agir depressa perante um fogo","Este princípio só diz respeito a incêndios elétricos"],correct:1,expl:"O instinto muitas vezes empurra para a água, enquanto um método estruturado evita erros graves."},
    {q:"O que significa a primeira letra de STOP no método STOP-THINK-ACT?",opts:["Apagar o fogo de imediato","Garantir que estás seguro antes de qualquer outro gesto","Reportar o incêndio","Escolher um agente extintor"],correct:1,expl:"STOP consiste em verificar a própria segurança antes de qualquer ação."},
    {q:"Na etapa THINK, que perguntas fazes a ti próprio?",opts:["Só o preço do extintor","Combustível, eletricidade, pessoas em perigo, espaço confinado, risco de propagação","Só a cor das chamas","Nada em particular, passa-se diretamente à ação"],correct:1,expl:"THINK estrutura a avaliação da situação antes de escolher um agente."},
    {q:"O que fazer com prioridade perante um fogo perto de um quadro elétrico?",opts:["Usar água de imediato","Isolar a corrente se possível antes de escolher um agente","Esperar que o fogo se apague sozinho","Abrir todas as saídas"],correct:1,expl:"Isolar a corrente transforma um fogo elétrico perigoso num fogo normal, mais fácil de tratar."},
    {q:"Por que nunca usar água num fogo de óleo?",opts:["A água não tem qualquer efeito, bom ou mau","A água provoca uma projeção violenta de gotículas em chamas e propagação imediata","A água apaga mais depressa do que qualquer outro agente","Não há nenhuma razão particular"],correct:1,expl:"A água sobre um fogo de hidrocarboneto agrava a situação por projeção e propagação."},
    {q:"Por que nunca usar água num quadro elétrico sob tensão?",opts:["Não é perigoso se o fogo for pequeno","Risco de eletrocussão do socorrista e agravamento do incêndio","A água protege contra a eletrocussão","Não há nenhum risco particular"],correct:1,expl:"A água conduz eletricidade, expondo o socorrista a um risco mortal."},
    {q:"Para um fogo de materiais sólidos (madeira, papel) sem eletricidade envolvida, que agente é geralmente apropriado?",opts:["Só pó especial D","Água ou agentes polivalentes","Nunca nenhum agente líquido","Só CO2"],correct:1,expl:"Sem risco elétrico, a água ou os agentes polivalentes são adequados para materiais sólidos."},
    {q:"Para um líquido inflamável como óleo ou combustível, qual é o risco principal?",opts:["Nenhum risco particular","A projeção e a propagação rápida","Só o fumo","O ruído"],correct:1,expl:"Os líquidos inflamáveis projetam e propagam o fogo rapidamente se o agente for incompatível."},
    {q:"Num espaço confinado, qual é a prioridade antes de qualquer ataque direto?",opts:["Atacar o fogo de imediato","O alarme e a avaliação da situação, devido ao risco de fumo e redução de oxigénio","Abrir todas as portas ao mesmo tempo","Nenhuma prioridade particular"],correct:1,expl:"Um espaço confinado amplifica os riscos de fumo e falta de oxigénio, exigindo cautela antes de agir."},
    {q:"No caso de estudo do Reflexo Errado, qual foi o erro principal?",opts:["Ter dado o alarme cedo demais","Ter usado água num fogo elétrico e de óleo sem verificação prévia","Ter esperado demasiado antes de agir","Ter usado um agente demasiado potente"],correct:1,expl:"A água foi usada por reflexo, sem verificar a corrente nem o combustível real."},
    {q:"O que significa 'A firefighter does not choose the extinguisher first. A firefighter understands the fire first'?",opts:["Deve-se escolher sempre o extintor mais próximo","Compreender a natureza do fogo deve preceder a escolha do agente, nunca o contrário","O extintor não tem qualquer importância","Deve-se adivinhar o agente ao acaso"],correct:1,expl:"Compreender o fogo precede sempre a escolha do agente, nunca o contrário."},
    {q:"Que etapa do MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) esta lição cobre principalmente?",opts:["Detect","Alarm","Recover","Command"],correct:1,expl:"Esta lição desenvolve a decisão e o alerta, antes de Contain ser desenvolvido na próxima lição."},
    {q:"O método STOP-THINK-ACT é reutilizável nas lições seguintes do módulo?",opts:["Não, só diz respeito a esta lição","Sim, aplica-se a cada situação de incêndio abordada no resto do módulo","Não, cada lição tem o seu próprio método independente","Sim, mas só para incêndios elétricos"],correct:1,expl:"STOP-THINK-ACT é um método transversal, reutilizável em cada lição de incêndio."},
    {q:"Esta lição ensina as classes de fogo em detalhe (A, B, C, D, F)?",opts:["Sim, em profundidade","Não, o foco está no raciocínio de decisão, não em memorizar classes já cobertas noutro lugar","Sim, mas só para a classe B","Não, as classes nunca são mencionadas na MAP"],correct:1,expl:"Esta lição privilegia a lógica de decisão em vez da memorização já coberta em Engine."},
    {q:"Este módulo ensina um substituto de uma formação BST prática certificada?",opts:["Sim, equivale a uma certificação completa","Não, ensina raciocínio de decisão, nunca um substituto de uma formação prática certificada","Sim, mas só para oficiais","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina princípios de decisão, nunca um substituto da formação BST prática."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'Fight the Fire. Not Your Instinct' ?",opts:["Suivre toujours son instinct","Suivre une méthode structurée plutôt qu'un réflexe automatique","Ne jamais agir vite","Ça ne concerne que l'électricité"],correct:1,expl:"L'instinct pousse souvent vers l'eau, une méthode structurée évite les erreurs graves."},
    {q:"Face à un feu près d'un tableau électrique, que faire en priorité ?",opts:["Utiliser de l'eau","Isoler le courant avant de choisir un agent","Attendre","Ouvrir les issues"],correct:1,expl:"Isoler le courant transforme le feu électrique en feu classique plus simple à traiter."},
    {q:"Pourquoi ne jamais utiliser d'eau sur un feu d'huile ?",opts:["Aucun effet","Projection violente et propagation immédiate","Extinction plus rapide","Aucune raison"],correct:1,expl:"L'eau sur un feu d'hydrocarbure aggrave la situation."},
    {q:"Que signifie STOP dans STOP-THINK-ACT ?",opts:["Éteindre le feu","S'assurer d'être en sécurité avant tout geste","Signaler l'incendie","Choisir un agent"],correct:1,expl:"STOP consiste à vérifier sa propre sécurité en premier."},
    {q:"Quelle étape du MAP Fire Mindset cette leçon couvre-t-elle principalement ?",opts:["Detect","Alarm","Command","Recover"],correct:1,expl:"Cette leçon développe la décision et l'alerte, Contain viendra dans la leçon suivante."},
  ],
  en:[
    {q:"What does 'Fight the Fire. Not Your Instinct' mean?",opts:["Always follow your instinct","Follow a structured method rather than an automatic reflex","Never act fast","It only concerns electricity"],correct:1,expl:"Instinct often pushes toward water, a structured method avoids serious mistakes."},
    {q:"Facing a fire near an electrical panel, what to do first?",opts:["Use water","Isolate power before choosing an agent","Wait","Open exits"],correct:1,expl:"Isolating power turns the electrical fire into an ordinary fire, easier to handle."},
    {q:"Why never use water on an oil fire?",opts:["No effect","Violent splashing and immediate spread","Faster extinguishing","No reason"],correct:1,expl:"Water on a hydrocarbon fire worsens the situation."},
    {q:"What does STOP mean in STOP-THINK-ACT?",opts:["Extinguish the fire","Make sure you're safe before any action","Report the fire","Choose an agent"],correct:1,expl:"STOP means checking your own safety first."},
    {q:"Which step of the MAP Fire Mindset does this lesson mainly cover?",opts:["Detect","Alarm","Command","Recover"],correct:1,expl:"This lesson develops decision-making and alerting, Contain comes in the next lesson."},
  ],
  es:[
    {q:"¿Qué significa 'Fight the Fire. Not Your Instinct'?",opts:["Seguir siempre el instinto","Seguir un método estructurado en lugar de un reflejo automático","Nunca actuar rápido","Solo concierne a la electricidad"],correct:1,expl:"El instinto suele empujar hacia el agua, un método estructurado evita errores graves."},
    {q:"Ante un fuego cerca de un cuadro eléctrico, ¿qué hacer primero?",opts:["Usar agua","Aislar la corriente antes de elegir un agente","Esperar","Abrir las salidas"],correct:1,expl:"Aislar la corriente convierte el fuego eléctrico en un fuego normal, más fácil de tratar."},
    {q:"¿Por qué nunca usar agua en un fuego de aceite?",opts:["Ningún efecto","Proyección violenta y propagación inmediata","Extinción más rápida","Ninguna razón"],correct:1,expl:"El agua sobre un fuego de hidrocarburo agrava la situación."},
    {q:"¿Qué significa STOP en STOP-THINK-ACT?",opts:["Apagar el fuego","Asegurarse de estar seguro antes de cualquier gesto","Informar del incendio","Elegir un agente"],correct:1,expl:"STOP consiste en comprobar la propia seguridad primero."},
    {q:"¿Qué etapa del MAP Fire Mindset cubre principalmente esta lección?",opts:["Detect","Alarm","Command","Recover"],correct:1,expl:"Esta lección desarrolla la decisión y la alerta, Contain llegará en la siguiente lección."},
  ],
  pt:[
    {q:"O que significa 'Fight the Fire. Not Your Instinct'?",opts:["Seguir sempre o instinto","Seguir um método estruturado em vez de um reflexo automático","Nunca agir depressa","Só diz respeito à eletricidade"],correct:1,expl:"O instinto muitas vezes empurra para a água, um método estruturado evita erros graves."},
    {q:"Perante um fogo perto de um quadro elétrico, o que fazer primeiro?",opts:["Usar água","Isolar a corrente antes de escolher um agente","Esperar","Abrir as saídas"],correct:1,expl:"Isolar a corrente transforma o fogo elétrico num fogo normal, mais fácil de tratar."},
    {q:"Por que nunca usar água num fogo de óleo?",opts:["Nenhum efeito","Projeção violenta e propagação imediata","Extinção mais rápida","Nenhuma razão"],correct:1,expl:"A água sobre um fogo de hidrocarboneto agrava a situação."},
    {q:"O que significa STOP em STOP-THINK-ACT?",opts:["Apagar o fogo","Garantir que estás seguro antes de qualquer gesto","Reportar o incêndio","Escolher um agente"],correct:1,expl:"STOP consiste em verificar a própria segurança primeiro."},
    {q:"Que etapa do MAP Fire Mindset esta lição cobre principalmente?",opts:["Detect","Alarm","Command","Recover"],correct:1,expl:"Esta lição desenvolve a decisão e o alerta, Contain virá na próxima lição."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Ton premier reflexe face au feu serait-il toujours le plus sur ? Sinon, qu'est-ce qui devrait guider ta decision a la place ?",
    en:"Would your first instinct during a fire always be the safest one? If not, what should guide your decision instead?",
    es:"¿Tu primer instinto ante un fuego seria siempre el mas seguro? Si no, ¿que deberia guiar tu decision en su lugar?",
    pt:"O teu primeiro instinto perante um fogo seria sempre o mais seguro? Se nao, o que deveria guiar a tua decisao em vez disso?",
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
      badge:"🔥 Safety · Firefighting · Leçon 2/7 · ⭐ Premium",
      title:"Choosing the Right Firefighting Strategy",
      intro:"Cette leçon n'enseigne pas les classes de feu, déjà couvertes dans Engine. Elle enseigne à décider : face à un feu, quelles questions se poser avant de choisir un agent, pour ne jamais transformer un petit feu en catastrophe par un mauvais réflexe.",
      p0:"FIGHT THE FIRE. NOT YOUR INSTINCT.",s0t:"Le principe qui structure toute la leçon",
      s0:"L'instinct pousse souvent vers l'eau. Mais l'eau est parfois la pire décision possible. Une méthode structurée protège contre ce réflexe.\n\nCOMMENT LE RECONNAÎTRE ? Un feu impliquant électricité, liquide inflammable, ou espace confiné exige une décision réfléchie, jamais un réflexe.\nQUE FAIRE IMMÉDIATEMENT ? Appliquer STOP-THINK-ACT avant tout choix d'agent.\nQUELLE ERREUR L'AGGRAVE ? Utiliser un agent incompatible par réflexe, sans avoir identifié le combustible ni le contexte.\nQUAND DEMANDER DE L'AIDE ? Dès que le doute existe sur la nature du feu ou les moyens disponibles.",
      p1:"STOP - THINK - ACT",s1t:"Une méthode réutilisable dans tout le module",
      s1:"STOP : suis-je en sécurité ? THINK : combustible, électricité, personnes en danger, espace confiné, propagation. ACT : alarme, isolement, agent, attaque. Cette méthode structure toute décision face à un feu.",
      p2:"FEU ÉLECTRIQUE",s2t:"Couper avant d'éteindre",
      s2:"Alarme, isolement du courant, choix de l'agent correct, attaque, surveillance : une fois le courant coupé, un feu électrique redevient un feu classique.",
      p3:"LES ERREURS D'AGENT QUI AGGRAVENT",s3t:"Des conséquences concrètes, pas une liste théorique",
      s3:"Eau sur feu d'huile : projection et propagation. Eau sur tableau électrique : électrocution et aggravation. Deux erreurs fréquentes, deux conséquences graves.",
      p4:"DÉCISION RAPIDE SOUS PRESSION",s4t:"Combustible, risque associé, agent compatible",
      s4:"Matériaux solides, liquides inflammables, origine électrique, espace confiné : chaque catégorie a son risque principal et son agent adapté.",
      p4b:"KNOW YOUR PORTABLE FIRE EXTINGUISHERS",s4bt:"Reconnaître, pas mémoriser la chimie",
      s4b:"Cinq extincteurs portatifs équipent la plupart des navires. L'objectif ici n'est pas d'en connaître la composition, mais de savoir reconnaître chacun, sa fonction principale, et les classes de feu sur lesquelles il peut être utilisé.",
      transition:"Knowing which extinguisher to choose is only the first step. In the next lesson, you'll learn how to inspect it, operate it correctly, and recognize when a portable extinguisher is no longer enough.",
      p5:"🎯 EXERCICE OPÉRATIONNEL",p6:"⚠️ CAS D'ÉTUDE",p7:"📝 BANQUE DE 15 QUESTIONS",p8:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 2",
      sumP:["Fight the Fire. Not Your Instinct : une méthode structurée prime toujours sur le réflexe automatique","STOP-THINK-ACT : suis-je en sécurité, quel est le contexte, quelle action structurée","Feu électrique : toujours isoler le courant avant de choisir un agent","Jamais d'eau sur un feu d'huile ni sur un tableau électrique sous tension","MAP Fire Mindset : cette leçon couvre principalement Alarm, avant Contain dans la leçon suivante"],
      learnedP:["La méthode STOP-THINK-ACT","La séquence complète face à un feu électrique","Les conséquences concrètes d'un mauvais choix d'agent","Le raisonnement de décision par type de combustible","Le lien entre décision réfléchie et MAP Fire Mindset"],
      safetyMsg:"A firefighter does not choose the extinguisher first. A firefighter understands the fire first.",
    },
    en:{
      badge:"🔥 Safety · Firefighting · Lesson 2/7 · ⭐ Premium",
      title:"Choosing the Right Firefighting Strategy",
      intro:"This lesson does not teach fire classes, already covered in Engine. It teaches how to decide: facing a fire, what questions to ask before choosing an agent, so a small fire never becomes a catastrophe through a wrong reflex.",
      p0:"FIGHT THE FIRE. NOT YOUR INSTINCT.",s0t:"The principle that structures the whole lesson",
      s0:"Instinct often pushes toward water. But water is sometimes the worst possible decision. A structured method protects against this reflex.\n\nHOW DO I RECOGNIZE IT? A fire involving electricity, flammable liquid, or a confined space requires a thought-out decision, never a reflex.\nWHAT DO I DO IMMEDIATELY? Apply STOP-THINK-ACT before any agent choice.\nWHAT MISTAKE MAKES IT WORSE? Using an incompatible agent by reflex, without identifying the fuel or the context.\nWHEN MUST I ASK FOR HELP? As soon as doubt exists about the nature of the fire or available means.",
      p1:"STOP - THINK - ACT",s1t:"A method reusable throughout the module",
      s1:"STOP: am I safe? THINK: fuel, electricity, people in danger, confined space, spread. ACT: alarm, isolation, agent, attack. This method structures every decision facing a fire.",
      p2:"ELECTRICAL FIRE",s2t:"Isolate before extinguishing",
      s2:"Alarm, power isolation, correct agent choice, attack, monitoring: once power is cut, an electrical fire becomes an ordinary fire again.",
      p3:"AGENT MISTAKES THAT MAKE THINGS WORSE",s3t:"Concrete consequences, not a theoretical list",
      s3:"Water on oil fire: splashing and spread. Water on electrical panel: electrocution and worsening. Two frequent mistakes, two serious consequences.",
      p4:"QUICK DECISION UNDER PRESSURE",s4t:"Fuel, associated risk, compatible agent",
      s4:"Solid materials, flammable liquids, electrical origin, confined space: each category has its main risk and suited agent.",
      p4b:"KNOW YOUR PORTABLE FIRE EXTINGUISHERS",s4bt:"Recognize, don't memorize the chemistry",
      s4b:"Five portable extinguishers equip most ships. The goal here is not to know their composition, but to recognize each one, its main function, and the fire classes it can be used on.",
      transition:"Knowing which extinguisher to choose is only the first step. In the next lesson, you'll learn how to inspect it, operate it correctly, and recognize when a portable extinguisher is no longer enough.",
      p5:"🎯 OPERATIONAL EXERCISE",p6:"⚠️ CASE STUDY",p7:"📝 15-QUESTION BANK",p8:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 2",
      sumP:["Fight the Fire. Not Your Instinct: a structured method always takes priority over automatic reflex","STOP-THINK-ACT: am I safe, what is the context, what structured action","Electrical fire: always isolate power before choosing an agent","Never water on an oil fire nor on a live electrical panel","MAP Fire Mindset: this lesson mainly covers Alarm, before Contain in the next lesson"],
      learnedP:["The STOP-THINK-ACT method","The full sequence facing an electrical fire","The concrete consequences of a wrong agent choice","Decision reasoning by fuel type","The link between thought-out decisions and the MAP Fire Mindset"],
      safetyMsg:"A firefighter does not choose the extinguisher first. A firefighter understands the fire first.",
    },
    es:{
      badge:"🔥 Safety · Firefighting · Lección 2/7 · ⭐ Premium",
      title:"Choosing the Right Firefighting Strategy",
      intro:"Esta lección no enseña las clases de fuego, ya cubiertas en Engine. Enseña a decidir: ante un fuego, qué preguntas hacerse antes de elegir un agente, para que un pequeño fuego nunca se convierta en una catástrofe por un reflejo equivocado.",
      p0:"FIGHT THE FIRE. NOT YOUR INSTINCT.",s0t:"El principio que estructura toda la lección",
      s0:"El instinto suele empujar hacia el agua. Pero el agua a veces es la peor decisión posible. Un método estructurado protege contra este reflejo.\n\n¿CÓMO RECONOCERLO? Un fuego que implique electricidad, líquido inflamable, o un espacio confinado exige una decisión reflexionada, nunca un reflejo.\n¿QUÉ HACER DE INMEDIATO? Aplicar STOP-THINK-ACT antes de cualquier elección de agente.\n¿QUÉ ERROR LO AGRAVA? Usar un agente incompatible por reflejo, sin identificar el combustible ni el contexto.\n¿CUÁNDO PEDIR AYUDA? En cuanto exista duda sobre la naturaleza del fuego o los medios disponibles.",
      p1:"STOP - THINK - ACT",s1t:"Un método reutilizable en todo el módulo",
      s1:"STOP: ¿estoy seguro? THINK: combustible, electricidad, personas en peligro, espacio confinado, propagación. ACT: alarma, aislamiento, agente, ataque. Este método estructura toda decisión ante un fuego.",
      p2:"FUEGO ELÉCTRICO",s2t:"Aislar antes de apagar",
      s2:"Alarma, aislamiento de la corriente, elección del agente correcto, ataque, vigilancia: una vez cortada la corriente, un fuego eléctrico vuelve a ser un fuego normal.",
      p3:"LOS ERRORES DE AGENTE QUE AGRAVAN",s3t:"Consecuencias concretas, no una lista teórica",
      s3:"Agua sobre fuego de aceite: proyección y propagación. Agua sobre cuadro eléctrico: electrocución y agravamiento. Dos errores frecuentes, dos consecuencias graves.",
      p4:"DECISIÓN RÁPIDA BAJO PRESIÓN",s4t:"Combustible, riesgo asociado, agente compatible",
      s4:"Materiales sólidos, líquidos inflamables, origen eléctrico, espacio confinado: cada categoría tiene su riesgo principal y su agente adecuado.",
      p4b:"KNOW YOUR PORTABLE FIRE EXTINGUISHERS",s4bt:"Reconocer, no memorizar la química",
      s4b:"Cinco extintores portátiles equipan la mayoría de los buques. El objetivo aquí no es conocer su composición, sino saber reconocer cada uno, su función principal, y las clases de fuego en las que puede usarse.",
      transition:"Knowing which extinguisher to choose is only the first step. In the next lesson, you'll learn how to inspect it, operate it correctly, and recognize when a portable extinguisher is no longer enough.",
      p5:"🎯 EJERCICIO OPERATIVO",p6:"⚠️ CASO DE ESTUDIO",p7:"📝 BANCO DE 15 PREGUNTAS",p8:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 2",
      sumP:["Fight the Fire. Not Your Instinct: un método estructurado siempre prima sobre el reflejo automático","STOP-THINK-ACT: ¿estoy seguro?, cuál es el contexto, qué acción estructurada","Fuego eléctrico: aislar siempre la corriente antes de elegir un agente","Nunca agua sobre un fuego de aceite ni sobre un cuadro eléctrico bajo tensión","MAP Fire Mindset: esta lección cubre principalmente Alarm, antes de Contain en la siguiente lección"],
      learnedP:["El método STOP-THINK-ACT","La secuencia completa ante un fuego eléctrico","Las consecuencias concretas de una mala elección de agente","El razonamiento de decisión por tipo de combustible","El vínculo entre decisiones reflexionadas y el MAP Fire Mindset"],
      safetyMsg:"A firefighter does not choose the extinguisher first. A firefighter understands the fire first.",
    },
    pt:{
      badge:"🔥 Safety · Firefighting · Lição 2/7 · ⭐ Premium",
      title:"Choosing the Right Firefighting Strategy",
      intro:"Esta lição não ensina as classes de fogo, já cobertas em Engine. Ensina a decidir: perante um fogo, que perguntas fazer antes de escolher um agente, para que um pequeno fogo nunca se torne numa catástrofe por um reflexo errado.",
      p0:"FIGHT THE FIRE. NOT YOUR INSTINCT.",s0t:"O princípio que estrutura toda a lição",
      s0:"O instinto muitas vezes empurra para a água. Mas a água por vezes é a pior decisão possível. Um método estruturado protege contra este reflexo.\n\nCOMO RECONHECER? Um fogo que envolva eletricidade, líquido inflamável, ou um espaço confinado exige uma decisão pensada, nunca um reflexo.\nO QUE FAZER IMEDIATAMENTE? Aplicar STOP-THINK-ACT antes de qualquer escolha de agente.\nQUE ERRO O AGRAVA? Usar um agente incompatível por reflexo, sem identificar o combustível nem o contexto.\nQUANDO PEDIR AJUDA? Assim que existir dúvida sobre a natureza do fogo ou os meios disponíveis.",
      p1:"STOP - THINK - ACT",s1t:"Um método reutilizável em todo o módulo",
      s1:"STOP: estou seguro? THINK: combustível, eletricidade, pessoas em perigo, espaço confinado, propagação. ACT: alarme, isolamento, agente, ataque. Este método estrutura toda decisão perante um fogo.",
      p2:"FOGO ELÉTRICO",s2t:"Isolar antes de apagar",
      s2:"Alarme, isolamento da corrente, escolha do agente correto, ataque, vigilância: depois de cortada a corrente, um fogo elétrico volta a ser um fogo normal.",
      p3:"OS ERROS DE AGENTE QUE AGRAVAM",s3t:"Consequências concretas, não uma lista teórica",
      s3:"Água sobre fogo de óleo: projeção e propagação. Água sobre quadro elétrico: eletrocussão e agravamento. Dois erros frequentes, duas consequências graves.",
      p4:"DECISÃO RÁPIDA SOB PRESSÃO",s4t:"Combustível, risco associado, agente compatível",
      s4:"Materiais sólidos, líquidos inflamáveis, origem elétrica, espaço confinado: cada categoria tem o seu risco principal e o seu agente adequado.",
      p4b:"KNOW YOUR PORTABLE FIRE EXTINGUISHERS",s4bt:"Reconhecer, não memorizar a química",
      s4b:"Cinco extintores portáteis equipam a maioria dos navios. O objetivo aqui não é conhecer a sua composição, mas saber reconhecer cada um, a sua função principal, e as classes de fogo em que pode ser usado.",
      transition:"Knowing which extinguisher to choose is only the first step. In the next lesson, you'll learn how to inspect it, operate it correctly, and recognize when a portable extinguisher is no longer enough.",
      p5:"🎯 EXERCÍCIO OPERACIONAL",p6:"⚠️ CASO DE ESTUDO",p7:"📝 BANCO DE 15 PERGUNTAS",p8:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 2",
      sumP:["Fight the Fire. Not Your Instinct: um método estruturado tem sempre prioridade sobre o reflexo automático","STOP-THINK-ACT: estou seguro?, qual é o contexto, que ação estruturada","Fogo elétrico: isolar sempre a corrente antes de escolher um agente","Nunca água sobre um fogo de óleo nem sobre um quadro elétrico sob tensão","MAP Fire Mindset: esta lição cobre principalmente Alarm, antes de Contain na próxima lição"],
      learnedP:["O método STOP-THINK-ACT","A sequência completa perante um fogo elétrico","As consequências concretas de uma má escolha de agente","O raciocínio de decisão por tipo de combustível","A ligação entre decisões pensadas e o MAP Fire Mindset"],
      safetyMsg:"A firefighter does not choose the extinguisher first. A firefighter understands the fire first.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS4_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/7":lang==="en"?"Lesson 2/7":lang==="es"?"Lección 2/7":"Lição 2/7"}</div>
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

            <SL icon="🔥" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔥</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🧭" text={lc.p1} color={C.gold}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧭 {lang==="fr"?"STOP-THINK-ACT - INTERACTIF":lang==="en"?"STOP-THINK-ACT - INTERACTIVE":lang==="es"?"STOP-THINK-ACT - INTERACTIVO":"STOP-THINK-ACT - INTERATIVO"}</div><StopThinkActSVG lang={lang}/></Card>

            <SL icon="⚡" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚡ {lang==="fr"?"FEU ÉLECTRIQUE - INTERACTIF":lang==="en"?"ELECTRICAL FIRE - INTERACTIVE":lang==="es"?"FUEGO ELÉCTRICO - INTERACTIVO":"FOGO ELÉTRICO - INTERATIVO"}</div><ElectricFireSVG lang={lang}/></Card>

            <SL icon="🚫" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚫</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🚫 {lang==="fr"?"ERREURS D'AGENT - INTERACTIF":lang==="en"?"AGENT MISTAKES - INTERACTIVE":lang==="es"?"ERRORES DE AGENTE - INTERACTIVO":"ERROS DE AGENTE - INTERATIVO"}</div><WrongAgentSVG lang={lang}/></Card>

            <SL icon="🌳" text={lc.p4} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌳 {lang==="fr"?"ARBRE DE DÉCISION - INTERACTIF":lang==="en"?"DECISION TREE - INTERACTIVE":lang==="es"?"ÁRBOL DE DECISIÓN - INTERACTIVO":"ÁRVORE DE DECISÃO - INTERATIVO"}</div><DecisionTreeSVG lang={lang}/></Card>

            <SL icon="🧯" text={lc.p4b} color={C.gold}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧯</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4bt}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4b}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧯 {lang==="fr"?"EXTINCTEURS PORTATIFS - INTERACTIF":lang==="en"?"PORTABLE EXTINGUISHERS - INTERACTIVE":lang==="es"?"EXTINTORES PORTÁTILES - INTERACTIVO":"EXTINTORES PORTÁTEIS - INTERATIVO"}</div><PortableExtinguishersSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank}/></Card>

            <SL icon="🪞" text={lc.p8} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final - Stratégie d'Extinction":lang==="en"?"Final Quiz - Firefighting Strategy":lang==="es"?"Quiz Final - Estrategia de Extinción":"Quiz Final - Estratégia de Extinção"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 2/7":"questions · Lesson 2/7"}</div>
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

            <div style={{textAlign:"center",fontSize:13,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>{lc.transition}</div>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 - EXTINCTEURS PORTATIFS →":lang==="en"?"LESSON 3 - PORTABLE FIREFIGHTING →":lang==="es"?"LECCIÓN 3 - EXTINCIÓN PORTÁTIL →":"LIÇÃO 3 - EXTINÇÃO PORTÁTIL →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
