import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - TYPES OF BLEEDING
function BleedingTypesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"💧", color:C.green, label:{fr:"Capillaire",en:"Capillary",es:"Capilar",pt:"Capilar"}, desc:{fr:"Suintement lent et régulier depuis la surface de la peau. Rarement grave. Action : nettoyer et couvrir d'un pansement propre.",en:"Slow, steady oozing from the skin surface. Rarely serious. Action: clean and cover with a clean dressing.",es:"Rezumado lento y constante desde la superficie de la piel. Rara vez grave. Acción: limpiar y cubrir con un vendaje limpio.",pt:"Exsudação lenta e constante da superfície da pele. Raramente grave. Ação: limpar e cobrir com um penso limpo."} },
    { id:2, icon:"🩸", color:C.blue2, label:{fr:"Veineuse",en:"Venous",es:"Venosa",pt:"Venosa"}, desc:{fr:"Écoulement régulier et abondant, de couleur sombre. Peut entraîner une perte de sang importante. Action : pression directe immédiate.",en:"Steady, heavy flow, dark in color. Can lead to major blood loss. Action: immediate direct pressure.",es:"Flujo constante y abundante, de color oscuro. Puede provocar una pérdida de sangre importante. Acción: presión directa inmediata.",pt:"Fluxo constante e abundante, de cor escura. Pode causar uma perda de sangue importante. Ação: pressão direta imediata."} },
    { id:3, icon:"🔴", color:C.red, label:{fr:"Artérielle",en:"Arterial",es:"Arterial",pt:"Arterial"}, desc:{fr:"Jaillissement pulsé, rouge vif, au rythme du cœur. Une hémorragie qui menace la vie en quelques minutes. Action : pression directe immédiate, envisager un garrot sans délai si elle ne s'arrête pas.",en:"Pulsing, bright red spurts, in rhythm with the heartbeat. A hemorrhage that can be life-threatening within minutes. Action: immediate direct pressure, consider a tourniquet without delay if it doesn't stop.",es:"Chorro pulsátil, rojo brillante, al ritmo del corazón. Una hemorragia que amenaza la vida en minutos. Acción: presión directa inmediata, considerar un torniquete sin demora si no se detiene.",pt:"Jato pulsátil, vermelho vivo, ao ritmo do coração. Uma hemorragia que ameaça a vida em minutos. Ação: pressão direta imediata, considerar um torniquete sem demora se não parar."} },
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
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 2 - DIRECT PRESSURE
function DirectPressureSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, label:{fr:"Se protéger d'abord",en:"Protect yourself first",es:"Protegerse primero",pt:"Proteger-se primeiro"}, desc:{fr:"Gants ou protection improvisée avant tout contact avec le sang. Un sauveteur exposé devient une seconde victime.",en:"Gloves or improvised protection before any contact with blood. An exposed rescuer becomes a second casualty.",es:"Guantes o protección improvisada antes de cualquier contacto con la sangre. Un socorrista expuesto se convierte en una segunda víctima.",pt:"Luvas ou proteção improvisada antes de qualquer contacto com o sangue. Um socorrista exposto torna-se uma segunda vítima."} },
    { id:2, label:{fr:"Appuyer fermement sur la plaie",en:"Press firmly on the wound",es:"Presionar firmemente la herida",pt:"Pressionar firmemente a ferida"}, desc:{fr:"Avec un pansement propre, directement sur la source du saignement, pas à côté.",en:"With a clean dressing, directly on the source of the bleeding, not next to it.",es:"Con un vendaje limpio, directamente sobre la fuente del sangrado, no al lado.",pt:"Com um penso limpo, diretamente sobre a fonte do sangramento, não ao lado."} },
    { id:3, label:{fr:"Ne jamais soulever pour vérifier",en:"Never lift it to check",es:"Nunca levantarlo para comprobar",pt:"Nunca levantar para verificar"}, desc:{fr:"Si le pansement est imbibé, ajouter une couche par-dessus, sans retirer la première. Soulever relance le saignement.",en:"If the dressing soaks through, add another layer on top, without removing the first. Lifting it restarts the bleeding.",es:"Si el vendaje se empapa, añadir otra capa encima, sin retirar la primera. Levantarlo reactiva el sangrado.",pt:"Se o penso ficar encharcado, adicionar outra camada por cima, sem retirar a primeira. Levantá-lo reinicia o sangramento."} },
    { id:4, label:{fr:"Maintenir en appelant de l'aide",en:"Maintain while calling for help",es:"Mantener mientras se pide ayuda",pt:"Manter enquanto se pede ajuda"}, desc:{fr:"La pression continue pendant qu'une autre personne déclenche l'alerte médicale, sans interrompre le geste.",en:"Pressure continues while someone else triggers the medical alert, without interrupting the action.",es:"La presión continúa mientras otra persona activa la alerta médica, sin interrumpir el gesto.",pt:"A pressão continua enquanto outra pessoa aciona o alerta médico, sem interromper o gesto."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(192,57,43,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.red:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:sel===s.id?C.red:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:C.white,flexShrink:0}}>{s.id}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 3 - TOURNIQUET DECISION AND SEQUENCE
function TourniquetSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"❓", label:{fr:"Quand ? La pression directe échoue",en:"When? Direct pressure fails",es:"¿Cuándo? La presión directa falla",pt:"Quando? A pressão direta falha"}, desc:{fr:"Uniquement pour une hémorragie de membre qui menace la vie et que la pression directe ne parvient pas à arrêter.",en:"Only for a life-threatening limb hemorrhage that direct pressure fails to stop.",es:"Solo para una hemorragia de miembro que amenaza la vida y que la presión directa no logra detener.",pt:"Apenas para uma hemorragia de membro que ameaça a vida e que a pressão direta não consegue parar."} },
    { id:2, icon:"📏", label:{fr:"Placement",en:"Placement",es:"Colocación",pt:"Colocação"}, desc:{fr:"5 à 8 cm au-dessus de la plaie, jamais sur une articulation. Serrer jusqu'à l'arrêt complet du saignement.",en:"5 to 8 cm above the wound, never on a joint. Tighten until the bleeding stops completely.",es:"5 a 8 cm por encima de la herida, nunca sobre una articulación. Apretar hasta que el sangrado se detenga por completo.",pt:"5 a 8 cm acima da ferida, nunca sobre uma articulação. Apertar até o sangramento parar completamente."} },
    { id:3, icon:"🕐", label:{fr:"Heure notée",en:"Time noted",es:"Hora anotada",pt:"Hora anotada"}, desc:{fr:"Écrire l'heure de pose sur la peau ou un vêtement proche, visible pour tout relais médical.",en:"Write the application time on the skin or nearby clothing, visible for any medical handover.",es:"Anotar la hora de colocación en la piel o en una prenda cercana, visible para cualquier relevo médico.",pt:"Escrever a hora de colocação na pele ou numa peça de roupa próxima, visível para qualquer transferência médica."} },
    { id:4, icon:"👁️", label:{fr:"Garrot visible",en:"Tourniquet visible",es:"Torniquete visible",pt:"Torniquete visível"}, desc:{fr:"Ne jamais le couvrir avec un vêtement ou un pansement : il doit rester visible pour tout intervenant suivant.",en:"Never cover it with clothing or a dressing: it must stay visible for anyone who takes over.",es:"Nunca cubrirlo con ropa o un vendaje: debe permanecer visible para cualquier interviniente siguiente.",pt:"Nunca o cobrir com roupa ou um penso: deve permanecer visível para qualquer interveniente seguinte."} },
    { id:5, icon:"🚫", label:{fr:"Ne jamais desserrer",en:"Never loosen",es:"Nunca aflojar",pt:"Nunca desapertar"}, desc:{fr:"Une fois posé, il reste en place jusqu'à la prise en charge médicale professionnelle. Le desserrer soi-même peut relancer une hémorragie fatale.",en:"Once applied, it stays in place until professional medical care takes over. Loosening it yourself can restart a fatal hemorrhage.",es:"Una vez colocado, permanece en su sitio hasta la atención médica profesional. Aflojarlo tú mismo puede reactivar una hemorragia fatal.",pt:"Uma vez colocado, permanece no lugar até à assistência médica profissional. Desapertá-lo sozinho pode reiniciar uma hemorragia fatal."} },
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

// SVG 4 - SHOCK PROGRESSION
function ShockProgressionSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const stages = [
    { id:0, color:C.green, label:{fr:"Normal",en:"Normal",es:"Normal",pt:"Normal"}, desc:{fr:"Constantes normales, victime alerte et cohérente.",en:"Normal vital signs, casualty alert and coherent.",es:"Constantes normales, víctima alerta y coherente.",pt:"Constantes normais, vítima alerta e coerente."} },
    { id:1, color:C.gold2, label:{fr:"Choc compensé",en:"Compensated shock",es:"Shock compensado",pt:"Choque compensado"}, desc:{fr:"Le corps compense encore : pouls plus rapide, peau pâle, anxiété légère. C'est le moment d'agir, avant que ça n'empire.",en:"The body is still compensating: faster pulse, pale skin, mild anxiety. This is the moment to act, before it worsens.",es:"El cuerpo todavía compensa: pulso más rápido, piel pálida, ansiedad leve. Es el momento de actuar, antes de que empeore.",pt:"O corpo ainda compensa: pulso mais rápido, pele pálida, ansiedade ligeira. É o momento de agir, antes que piore."} },
    { id:2, color:C.orange, label:{fr:"Choc décompensé",en:"Decompensated shock",es:"Shock descompensado",pt:"Choque descompensado"}, desc:{fr:"Le corps ne compense plus : chute de tension, confusion, peau moite et grisâtre, soif intense. Urgence vitale.",en:"The body no longer compensates: falling blood pressure, confusion, clammy grayish skin, intense thirst. A vital emergency.",es:"El cuerpo ya no compensa: caída de la tensión, confusión, piel húmeda y grisácea, sed intensa. Urgencia vital.",pt:"O corpo já não compensa: queda de tensão, confusão, pele húmida e acinzentada, sede intensa. Urgência vital."} },
    { id:3, color:C.red, label:{fr:"Arrêt cardiaque",en:"Cardiac arrest",es:"Paro cardíaco",pt:"Paragem cardíaca"}, desc:{fr:"Sans intervention, le choc non traité mène à l'arrêt cardiaque (Leçon 2). Chaque étape précédente est une occasion d'agir avant celle-ci.",en:"Without intervention, untreated shock leads to cardiac arrest (Lesson 2). Every previous stage is a chance to act before this one.",es:"Sin intervención, el shock no tratado lleva al paro cardíaco (Lección 2). Cada etapa anterior es una oportunidad de actuar antes de esta.",pt:"Sem intervenção, o choque não tratado leva à paragem cardíaca (Lição 2). Cada etapa anterior é uma oportunidade de agir antes desta."} },
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
        {lang==="fr"?"Le choc est un processus évolutif, pas un état figé.":lang==="en"?"Shock is an evolving process, not a fixed state.":lang==="es"?"El shock es un proceso evolutivo, no un estado fijo.":"O choque é um processo evolutivo, não um estado fixo."}
      </div>
    </div>
  );
}

// EXERCISE - BLEEDING & SHOCK DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous appliquez une pression directe sur une plaie qui saigne beaucoup. Le pansement est imbibé. Que faites-vous ?\na) Le retirer pour vérifier l'ampleur de la plaie\nb) Ajouter une couche par-dessus sans retirer la première\nc) Élever le membre et arrêter la pression"},
      {id:"q2",q:"Une hémorragie de bras jaillit par pulsations rouge vif malgré une pression directe ferme et continue. Que faites-vous ?\na) Envisager un garrot sans délai\nb) Continuer à presser encore 10 minutes avant d'agir autrement\nc) Utiliser un point de pression sur l'artère"},
      {id:"q3",q:"Une victime présente une hémorragie ET des signes de choc compensé (pouls rapide, pâleur, anxiété légère). Que traitez-vous en premier ?\na) Le choc uniquement, l'hémorragie peut attendre\nb) Les deux en même temps sans priorité\nc) L'hémorragie d'abord : traiter la cause avant la conséquence"},
      {id:"q4",q:"Vous venez de poser un garrot et le saignement s'est arrêté. Que faites-vous ensuite ?\na) Le desserrer un peu pour vérifier que la circulation revient\nb) Noter l'heure de pose et ne jamais le desserrer avant la prise en charge médicale\nc) Le retirer dès que la victime dit se sentir mieux"},
    ],
    en:[
      {id:"q1",q:"You are applying direct pressure to a heavily bleeding wound. The dressing has soaked through. What do you do?\na) Remove it to check how bad the wound is\nb) Add another layer on top without removing the first\nc) Elevate the limb and stop the pressure"},
      {id:"q2",q:"An arm hemorrhage spurts in bright red pulses despite firm, continuous direct pressure. What do you do?\na) Consider a tourniquet without delay\nb) Keep pressing for another 10 minutes before trying anything else\nc) Use a pressure point on the artery"},
      {id:"q3",q:"A casualty has bleeding AND signs of compensated shock (fast pulse, pallor, mild anxiety). What do you treat first?\na) Shock only, the bleeding can wait\nb) Both at the same time with no priority\nc) The bleeding first: treat the cause before the consequence"},
      {id:"q4",q:"You just applied a tourniquet and the bleeding stopped. What do you do next?\na) Loosen it slightly to check circulation returns\nb) Note the application time and never loosen it before medical handover\nc) Remove it as soon as the casualty says they feel better"},
    ],
    es:[
      {id:"q1",q:"Estás aplicando presión directa a una herida que sangra mucho. El vendaje se ha empapado. ¿Qué haces?\na) Retirarlo para comprobar la gravedad de la herida\nb) Añadir otra capa encima sin retirar la primera\nc) Elevar el miembro y dejar de presionar"},
      {id:"q2",q:"Una hemorragia de brazo brota en chorros rojo vivo pese a una presión directa firme y continua. ¿Qué haces?\na) Considerar un torniquete sin demora\nb) Seguir presionando 10 minutos más antes de actuar de otra forma\nc) Usar un punto de presión en la arteria"},
      {id:"q3",q:"Una víctima presenta hemorragia Y signos de shock compensado (pulso rápido, palidez, ansiedad leve). ¿Qué tratas primero?\na) Solo el shock, la hemorragia puede esperar\nb) Ambos a la vez sin prioridad\nc) La hemorragia primero: tratar la causa antes que la consecuencia"},
      {id:"q4",q:"Acabas de colocar un torniquete y el sangrado se detuvo. ¿Qué haces después?\na) Aflojarlo un poco para comprobar que vuelve la circulación\nb) Anotar la hora de colocación y nunca aflojarlo antes de la atención médica\nc) Retirarlo en cuanto la víctima diga que se siente mejor"},
    ],
    pt:[
      {id:"q1",q:"Estás a aplicar pressão direta numa ferida que sangra muito. O penso ficou encharcado. O que fazes?\na) Retirá-lo para verificar a gravidade da ferida\nb) Adicionar outra camada por cima sem retirar a primeira\nc) Elevar o membro e parar a pressão"},
      {id:"q2",q:"Uma hemorragia de braço jorra em jatos vermelho vivo apesar de pressão direta firme e contínua. O que fazes?\na) Considerar um torniquete sem demora\nb) Continuar a pressionar mais 10 minutos antes de agir de outra forma\nc) Usar um ponto de pressão na artéria"},
      {id:"q3",q:"Uma vítima apresenta hemorragia E sinais de choque compensado (pulso rápido, palidez, ansiedade ligeira). O que tratas primeiro?\na) Apenas o choque, a hemorragia pode esperar\nb) Ambos ao mesmo tempo sem prioridade\nc) A hemorragia primeiro: tratar a causa antes da consequência"},
      {id:"q4",q:"Acabaste de colocar um torniquete e o sangramento parou. O que fazes a seguir?\na) Desapertá-lo um pouco para verificar se a circulação volta\nb) Anotar a hora de colocação e nunca o desapertar antes da assistência médica\nc) Retirá-lo assim que a vítima disser que se sente melhor"},
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

// ACCIDENT CASE - COMPOSITE CASE (THE WINCH)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Le Treuil",teaser:"Cas composite immersif - pont mouillé, victime confuse, collègues paniqués",
      what:"Un marin se blesse gravement au bras dans un treuil. Le pont est mouillé, l'hémorragie est importante, et la victime, encore consciente, devient confuse. Autour, plusieurs collègues paniquent, crient, se bousculent pour aider sans coordination. Le secouriste doit, dans cet ordre : sécuriser la scène (arrêter le treuil, attention au pont glissant), se protéger (gants avant tout contact avec le sang), contrôler l'hémorragie par pression directe puis garrot si nécessaire, et organiser l'appel médical au milieu du chaos en désignant clairement une personne pour alerter la passerelle.",
      cause:"• Environnement dégradé : pont mouillé, risque de chute supplémentaire pour le sauveteur\n• Panique du groupe qui aurait pu retarder l'action si personne n'avait pris le contrôle de la scène\n• Risque d'exposition au sang sans protection si le geste est précipité\n• Signes de choc (confusion) qui auraient pu détourner l'attention de la cause réelle : l'hémorragie",
      lessons:"✓ Every casualty has two patients : ici sous deux formes, le pont glissant et le risque d'exposition au sang\n✓ Treat the cause before the consequence : contrôler l'hémorragie prime sur le traitement des signes de choc\n✓ Dans le chaos, désigner clairement qui alerte la passerelle évite qu'aucune alerte ne parte réellement\n✓ The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss",
      link:"🔗 Ce cas mobilise l'ensemble des compétences du module : sécurité de la scène (L1), reconnaissance de l'urgence, et maintenant contrôle de l'hémorragie et gestion du choc."},
    en:{title:"Case Study - The Winch",teaser:"Immersive composite case - wet deck, confused casualty, panicking colleagues",
      what:"A sailor is severely injured in the arm by a winch. The deck is wet, the hemorrhage is severe, and the casualty, still conscious, becomes confused. Around them, several colleagues panic, shout, and jostle to help without coordination. The rescuer must, in this order: secure the scene (stop the winch, watch for the slippery deck), protect themselves (gloves before any contact with blood), control the hemorrhage with direct pressure then a tourniquet if needed, and organize the medical call amid the chaos by clearly designating one person to alert the bridge.",
      cause:"• Degraded environment: wet deck, additional fall risk for the rescuer\n• Group panic that could have delayed action if no one had taken control of the scene\n• Risk of blood exposure without protection if the action is rushed\n• Signs of shock (confusion) that could have distracted from the real cause: the hemorrhage",
      lessons:"✓ Every casualty has two patients: here in two forms, the slippery deck and the risk of blood exposure\n✓ Treat the cause before the consequence: controlling the hemorrhage takes priority over treating shock signs\n✓ In chaos, clearly designating who alerts the bridge prevents no alert from actually going out\n✓ The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss",
      link:"🔗 This case mobilizes all the module's skills so far: scene safety (Lesson 1), recognizing the emergency, and now hemorrhage control and shock management."},
    es:{title:"Caso de estudio - El Winche",teaser:"Caso compuesto inmersivo - cubierta mojada, víctima confusa, compañeros en pánico",
      what:"Un marinero se lesiona gravemente el brazo en un winche. La cubierta está mojada, la hemorragia es importante, y la víctima, todavía consciente, se vuelve confusa. Alrededor, varios compañeros entran en pánico, gritan, se empujan para ayudar sin coordinación. El socorrista debe, en este orden: asegurar la escena (detener el winche, cuidado con la cubierta resbaladiza), protegerse (guantes antes de cualquier contacto con la sangre), controlar la hemorragia con presión directa y luego torniquete si es necesario, y organizar la llamada médica en medio del caos designando claramente a una persona para alertar al puente.",
      cause:"• Entorno degradado: cubierta mojada, riesgo adicional de caída para el socorrista\n• Pánico del grupo que podría haber retrasado la acción si nadie hubiera tomado el control de la escena\n• Riesgo de exposición a la sangre sin protección si el gesto se precipita\n• Signos de shock (confusión) que podrían haber desviado la atención de la causa real: la hemorragia",
      lessons:"✓ Every casualty has two patients: aquí en dos formas, la cubierta resbaladiza y el riesgo de exposición a la sangre\n✓ Treat the cause before the consequence: controlar la hemorragia prima sobre tratar los signos de shock\n✓ En el caos, designar claramente quién alerta al puente evita que ninguna alerta salga realmente\n✓ The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss",
      link:"🔗 Este caso moviliza todas las competencias del módulo hasta ahora: seguridad de la escena (Lección 1), reconocimiento de la urgencia, y ahora control de la hemorragia y gestión del shock."},
    pt:{title:"Caso de estudo - O Guincho",teaser:"Caso composto imersivo - convés molhado, vítima confusa, colegas em pânico",
      what:"Um marinheiro fere-se gravemente no braço num guincho. O convés está molhado, a hemorragia é importante, e a vítima, ainda consciente, fica confusa. À volta, vários colegas entram em pânico, gritam, empurram-se para ajudar sem coordenação. O socorrista deve, por esta ordem: garantir a segurança da cena (parar o guincho, cuidado com o convés escorregadio), proteger-se (luvas antes de qualquer contacto com o sangue), controlar a hemorragia com pressão direta e depois torniquete se necessário, e organizar a chamada médica em meio ao caos designando claramente uma pessoa para alertar a ponte.",
      cause:"• Ambiente degradado: convés molhado, risco adicional de queda para o socorrista\n• Pânico do grupo que poderia ter atrasado a ação se ninguém tivesse assumido o controlo da cena\n• Risco de exposição ao sangue sem proteção se o gesto for precipitado\n• Sinais de choque (confusão) que poderiam ter desviado a atenção da causa real: a hemorragia",
      lessons:"✓ Every casualty has two patients: aqui em duas formas, o convés escorregadio e o risco de exposição ao sangue\n✓ Treat the cause before the consequence: controlar a hemorragia tem prioridade sobre tratar os sinais de choque\n✓ No caos, designar claramente quem alerta a ponte evita que nenhum alerta saia realmente\n✓ The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss",
      link:"🔗 Este caso mobiliza todas as competências do módulo até agora: segurança da cena (Lição 1), reconhecimento da urgência, e agora controlo da hemorragia e gestão do choque."},
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
    {q:"Pourquoi faut-il se protéger (gants) avant de traiter une hémorragie ?",opts:["Ce n'est pas nécessaire","Un sauveteur exposé au sang sans protection devient une seconde victime","Seulement pour rester propre","Uniquement si la victime le demande"],correct:1,expl:"Every casualty has two patients : l'exposition au sang non protégée transforme le sauveteur en victime."},
    {q:"Une hémorragie jaillit en pulsations rouge vif au rythme du cœur. De quel type s'agit-il ?",opts:["Capillaire","Veineuse","Artérielle","Aucune de ces réponses"],correct:2,expl:"Le jaillissement pulsé et la couleur rouge vif sont caractéristiques d'une hémorragie artérielle."},
    {q:"Que faire en priorité absolue face à une hémorragie sévère ?",opts:["Élever le membre uniquement","Appliquer une pression directe sur la plaie","Chercher un point de pression indirect","Attendre les secours sans intervenir"],correct:1,expl:"La pression directe reste le geste n#1, plus efficace que l'élévation seule ou les points de pression."},
    {q:"Le pansement de pression est imbibé de sang. Que faites-vous ?",opts:["Le retirer pour en poser un nouveau","Ajouter une couche supplémentaire par-dessus, sans le retirer","Élever le membre à la place","Arrêter la pression, ça ne sert à rien"],correct:1,expl:"Retirer un pansement déjà en place relance le saignement ; on ajoute toujours par-dessus."},
    {q:"Quand envisager un garrot ?",opts:["Dès la moindre coupure","Uniquement si la pression directe ne parvient pas à arrêter une hémorragie de membre qui menace la vie","Systématiquement avant la pression directe","Jamais, c'est toujours dangereux"],correct:1,expl:"Le garrot est une solution de second recours quand la pression directe échoue sur une hémorragie vitale de membre."},
    {q:"Où placer un garrot ?",opts:["Directement sur la plaie","5 à 8 cm au-dessus de la plaie, jamais sur une articulation","Sur l'articulation la plus proche","N'importe où sur le membre"],correct:1,expl:"Le placement précis évite l'inefficacité et les complications inutiles."},
    {q:"Une fois un garrot posé et le saignement arrêté, que faire ?",opts:["Le desserrer pour vérifier la circulation","Noter l'heure de pose et ne jamais le desserrer avant la prise en charge médicale","Le retirer si la victime se sent mieux","Le couvrir avec un vêtement"],correct:1,expl:"Un garrot ne se desserre ni ne se retire soi-même : cela peut relancer une hémorragie fatale."},
    {q:"Pourquoi le garrot doit-il rester visible, jamais couvert ?",opts:["Pour des raisons esthétiques uniquement","Pour que tout intervenant suivant sache immédiatement qu'il est en place","Ce n'est pas nécessaire","Pour éviter les infections"],correct:1,expl:"La visibilité du garrot informe instantanément tout relais médical de sa présence et de son heure de pose."},
    {q:"Le choc est-il un état figé ou un processus évolutif ?",opts:["Un état figé, toujours identique","Un processus évolutif : Normal, Choc compensé, Choc décompensé, Arrêt cardiaque","Il n'existe qu'une seule forme de choc","Le choc ne concerne jamais les hémorragies"],correct:1,expl:"Le choc évolue par étapes ; agir tôt, au stade compensé, change tout."},
    {q:"Une victime a une hémorragie ET des signes de choc compensé. Que traiter en premier ?",opts:["Le choc uniquement","Les deux en même temps, sans priorité","L'hémorragie : traiter la cause avant la conséquence","Aucun des deux, attendre les secours"],correct:2,expl:"Treat the cause before the consequence : contrôler l'hémorragie règle aussi le choc à sa source."},
    {q:"Dans le cas d'étude du Treuil, quels étaient les deux risques pour le sauveteur lui-même ?",opts:["Le froid et la faim","Le pont mouillé (chute) et l'exposition au sang sans protection","Le bruit et la fatigue","Aucun risque, seule la victime était concernée"],correct:1,expl:"Le pont glissant et le sang non protégé illustrent deux façons différentes de devenir une seconde victime."},
    {q:"Dans ce même cas, pourquoi désigner clairement une personne pour alerter la passerelle ?",opts:["Ce n'est pas nécessaire dans le chaos","Dans la panique collective, sans désignation claire, aucune alerte réelle ne part parfois","Uniquement pour respecter la hiérarchie","Pour que tout le monde appelle en même temps"],correct:1,expl:"Le chaos de groupe peut faire croire à chacun qu'un autre a déjà alerté, retardant l'aide médicale réelle."},
    {q:"Que garantit réellement le contrôle d'une hémorragie, selon le message de sécurité de cette leçon ?",opts:["Il garantit la survie certaine de la victime","Il vise à empêcher la victime de mourir à cause de la perte de sang, chaque seconde comptant","Il remplace toute prise en charge médicale","Il n'a aucun impact réel"],correct:1,expl:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss."},
    {q:"Les points de pression indirects sont-ils recommandés pour une hémorragie sévère ?",opts:["Oui, en priorité avant la pression directe","Non, la pression directe sur la plaie reste la méthode recommandée","Oui, mais uniquement pour les jambes","Seulement en l'absence de gants"],correct:1,expl:"Les recommandations actuelles ne préconisent plus les points de pression indirects pour l'hémorragie sévère."},
    {q:"Ce module enseigne-t-il un protocole médical clinique complet sur le contrôle des hémorragies ?",opts:["Oui, il remplace une formation médicale complète","Non, il enseigne les principes de décision STCW, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour les officiers médicaux","Non, il ne sert à rien sans matériel médical"],correct:1,expl:"MAP enseigne des principes de décision, pas un manuel clinique détaillé, et ne remplace jamais une formation pratique certifiée."},
  ],
  en:[
    {q:"Why must you protect yourself (gloves) before treating a hemorrhage?",opts:["It isn't necessary","A rescuer exposed to blood without protection becomes a second casualty","Only to stay clean","Only if the casualty asks for it"],correct:1,expl:"Every casualty has two patients: unprotected blood exposure turns the rescuer into a casualty."},
    {q:"A hemorrhage spurts in bright red pulses in rhythm with the heartbeat. What type is this?",opts:["Capillary","Venous","Arterial","None of these"],correct:2,expl:"Pulsing spurts and bright red color are characteristic of an arterial hemorrhage."},
    {q:"What is the absolute priority action facing a severe hemorrhage?",opts:["Elevate the limb only","Apply direct pressure on the wound","Look for an indirect pressure point","Wait for help without intervening"],correct:1,expl:"Direct pressure remains action number one, more effective than elevation alone or pressure points."},
    {q:"The pressure dressing has soaked through with blood. What do you do?",opts:["Remove it and apply a new one","Add another layer on top, without removing it","Elevate the limb instead","Stop the pressure, it's useless"],correct:1,expl:"Removing an already applied dressing restarts the bleeding; always add on top."},
    {q:"When should a tourniquet be considered?",opts:["At the slightest cut","Only if direct pressure fails to stop a life-threatening limb hemorrhage","Systematically before direct pressure","Never, it's always dangerous"],correct:1,expl:"A tourniquet is a second-line solution when direct pressure fails on a life-threatening limb hemorrhage."},
    {q:"Where should a tourniquet be placed?",opts:["Directly on the wound","5 to 8 cm above the wound, never on a joint","On the nearest joint","Anywhere on the limb"],correct:1,expl:"Precise placement avoids ineffectiveness and unnecessary complications."},
    {q:"Once a tourniquet is applied and bleeding has stopped, what do you do?",opts:["Loosen it to check circulation","Note the application time and never loosen it before medical handover","Remove it if the casualty feels better","Cover it with clothing"],correct:1,expl:"A tourniquet is never loosened or removed by yourself: it can restart a fatal hemorrhage."},
    {q:"Why must a tourniquet stay visible, never covered?",opts:["For aesthetic reasons only","So anyone taking over immediately knows it's in place","It isn't necessary","To prevent infections"],correct:1,expl:"Visibility instantly informs any medical handover of its presence and application time."},
    {q:"Is shock a fixed state or an evolving process?",opts:["A fixed state, always identical","An evolving process: Normal, Compensated shock, Decompensated shock, Cardiac arrest","There is only one form of shock","Shock never relates to hemorrhage"],correct:1,expl:"Shock evolves in stages; acting early, at the compensated stage, changes everything."},
    {q:"A casualty has bleeding AND signs of compensated shock. What do you treat first?",opts:["Shock only","Both at once, with no priority","The bleeding: treat the cause before the consequence","Neither, wait for help"],correct:2,expl:"Treat the cause before the consequence: controlling the hemorrhage also resolves the shock at its source."},
    {q:"In the Winch case study, what were the two risks to the rescuer themselves?",opts:["Cold and hunger","The wet deck (fall) and unprotected blood exposure","Noise and fatigue","No risk, only the casualty was concerned"],correct:1,expl:"The slippery deck and unprotected blood illustrate two different ways of becoming a second casualty."},
    {q:"In the same case, why clearly designate one person to alert the bridge?",opts:["It isn't necessary in chaos","In collective panic, without clear designation, sometimes no real alert goes out","Only to respect the hierarchy","So everyone calls at once"],correct:1,expl:"Group chaos can make everyone assume someone else has already alerted, delaying real medical help."},
    {q:"What does controlling a hemorrhage actually guarantee, according to this lesson's safety message?",opts:["It guarantees the casualty's certain survival","It aims to stop the casualty from dying because of blood loss, every second mattering","It replaces all medical care","It has no real impact"],correct:1,expl:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss."},
    {q:"Are indirect pressure points recommended for severe hemorrhage?",opts:["Yes, as priority before direct pressure","No, direct pressure on the wound remains the recommended method","Yes, but only for legs","Only in the absence of gloves"],correct:1,expl:"Current guidelines no longer recommend indirect pressure points for severe hemorrhage."},
    {q:"Does this module teach a complete clinical protocol for hemorrhage control?",opts:["Yes, it replaces complete medical training","No, it teaches STCW decision principles, never a replacement for certified practical training","Yes, but only for medical officers","No, it is useless without medical equipment"],correct:1,expl:"MAP teaches decision principles, not a detailed clinical manual, and never replaces certified practical training."},
  ],
  es:[
    {q:"¿Por qué hay que protegerse (guantes) antes de tratar una hemorragia?",opts:["No es necesario","Un socorrista expuesto a la sangre sin protección se convierte en una segunda víctima","Solo para mantenerse limpio","Solo si la víctima lo pide"],correct:1,expl:"Every casualty has two patients: la exposición a la sangre sin protección convierte al socorrista en víctima."},
    {q:"Una hemorragia brota en chorros rojo vivo al ritmo del corazón. ¿De qué tipo se trata?",opts:["Capilar","Venosa","Arterial","Ninguna de estas"],correct:2,expl:"El chorro pulsátil y el color rojo vivo son característicos de una hemorragia arterial."},
    {q:"¿Cuál es la acción de prioridad absoluta ante una hemorragia grave?",opts:["Elevar el miembro solamente","Aplicar presión directa sobre la herida","Buscar un punto de presión indirecto","Esperar ayuda sin intervenir"],correct:1,expl:"La presión directa sigue siendo la acción número uno, más eficaz que la elevación sola o los puntos de presión."},
    {q:"El vendaje de presión se ha empapado de sangre. ¿Qué haces?",opts:["Retirarlo y poner uno nuevo","Añadir otra capa encima, sin retirarlo","Elevar el miembro en su lugar","Detener la presión, no sirve de nada"],correct:1,expl:"Retirar un vendaje ya colocado reactiva el sangrado; siempre se añade encima."},
    {q:"¿Cuándo hay que considerar un torniquete?",opts:["Ante el más mínimo corte","Solo si la presión directa no logra detener una hemorragia de miembro que amenaza la vida","Sistemáticamente antes de la presión directa","Nunca, siempre es peligroso"],correct:1,expl:"El torniquete es una solución de segunda línea cuando la presión directa falla en una hemorragia vital de miembro."},
    {q:"¿Dónde colocar un torniquete?",opts:["Directamente sobre la herida","5 a 8 cm por encima de la herida, nunca sobre una articulación","Sobre la articulación más cercana","En cualquier parte del miembro"],correct:1,expl:"La colocación precisa evita la ineficacia y complicaciones innecesarias."},
    {q:"Una vez colocado un torniquete y detenido el sangrado, ¿qué hacer?",opts:["Aflojarlo para comprobar la circulación","Anotar la hora de colocación y nunca aflojarlo antes de la atención médica","Retirarlo si la víctima se siente mejor","Cubrirlo con ropa"],correct:1,expl:"Un torniquete nunca se afloja ni se retira uno mismo: puede reactivar una hemorragia fatal."},
    {q:"¿Por qué el torniquete debe permanecer visible, nunca cubierto?",opts:["Solo por razones estéticas","Para que cualquier interviniente siguiente sepa de inmediato que está colocado","No es necesario","Para prevenir infecciones"],correct:1,expl:"La visibilidad informa instantáneamente a cualquier relevo médico de su presencia y hora de colocación."},
    {q:"¿El shock es un estado fijo o un proceso evolutivo?",opts:["Un estado fijo, siempre idéntico","Un proceso evolutivo: Normal, Shock compensado, Shock descompensado, Paro cardíaco","Solo existe una forma de shock","El shock nunca se relaciona con las hemorragias"],correct:1,expl:"El shock evoluciona por etapas; actuar pronto, en la etapa compensada, cambia todo."},
    {q:"Una víctima tiene hemorragia Y signos de shock compensado. ¿Qué tratar primero?",opts:["Solo el shock","Ambos a la vez, sin prioridad","La hemorragia: tratar la causa antes que la consecuencia","Ninguno de los dos, esperar ayuda"],correct:2,expl:"Treat the cause before the consequence: controlar la hemorragia también resuelve el shock en su origen."},
    {q:"En el caso de estudio del Winche, ¿cuáles fueron los dos riesgos para el propio socorrista?",opts:["El frío y el hambre","La cubierta mojada (caída) y la exposición a la sangre sin protección","El ruido y el cansancio","Ningún riesgo, solo concernía a la víctima"],correct:1,expl:"La cubierta resbaladiza y la sangre sin protección ilustran dos formas distintas de convertirse en una segunda víctima."},
    {q:"En el mismo caso, ¿por qué designar claramente a una persona para alertar al puente?",opts:["No es necesario en el caos","En el pánico colectivo, sin designación clara, a veces no sale ninguna alerta real","Solo para respetar la jerarquía","Para que todos llamen a la vez"],correct:1,expl:"El caos grupal puede hacer que todos asuman que alguien más ya alertó, retrasando la ayuda médica real."},
    {q:"¿Qué garantiza realmente el control de una hemorragia, según el mensaje de seguridad de esta lección?",opts:["Garantiza la supervivencia segura de la víctima","Busca evitar que la víctima muera por la pérdida de sangre, contando cada segundo","Sustituye toda atención médica","No tiene ningún impacto real"],correct:1,expl:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss."},
    {q:"¿Se recomiendan los puntos de presión indirectos para una hemorragia grave?",opts:["Sí, con prioridad antes de la presión directa","No, la presión directa sobre la herida sigue siendo el método recomendado","Sí, pero solo para las piernas","Solo en ausencia de guantes"],correct:1,expl:"Las recomendaciones actuales ya no aconsejan los puntos de presión indirectos para la hemorragia grave."},
    {q:"¿Este módulo enseña un protocolo clínico completo sobre el control de hemorragias?",opts:["Sí, sustituye una formación médica completa","No, enseña principios de decisión STCW, nunca un sustituto de una formación práctica certificada","Sí, pero solo para oficiales médicos","No, no sirve de nada sin material médico"],correct:1,expl:"MAP enseña principios de decisión, no un manual clínico detallado, y nunca sustituye a una formación práctica certificada."},
  ],
  pt:[
    {q:"Por que é preciso proteger-se (luvas) antes de tratar uma hemorragia?",opts:["Não é necessário","Um socorrista exposto ao sangue sem proteção torna-se uma segunda vítima","Só para se manter limpo","Só se a vítima o pedir"],correct:1,expl:"Every casualty has two patients: a exposição ao sangue sem proteção transforma o socorrista em vítima."},
    {q:"Uma hemorragia jorra em jatos vermelho vivo ao ritmo do coração. De que tipo se trata?",opts:["Capilar","Venosa","Arterial","Nenhuma destas"],correct:2,expl:"O jato pulsátil e a cor vermelho vivo são característicos de uma hemorragia arterial."},
    {q:"Qual é a ação de prioridade absoluta perante uma hemorragia grave?",opts:["Elevar o membro apenas","Aplicar pressão direta sobre a ferida","Procurar um ponto de pressão indireto","Esperar por ajuda sem intervir"],correct:1,expl:"A pressão direta continua a ser a ação número um, mais eficaz do que a elevação sozinha ou os pontos de pressão."},
    {q:"O penso de pressão ficou encharcado de sangue. O que fazes?",opts:["Retirá-lo e colocar um novo","Adicionar outra camada por cima, sem o retirar","Elevar o membro em vez disso","Parar a pressão, não serve de nada"],correct:1,expl:"Retirar um penso já colocado reinicia o sangramento; adiciona-se sempre por cima."},
    {q:"Quando considerar um torniquete?",opts:["Ao mínimo corte","Só se a pressão direta não conseguir parar uma hemorragia de membro que ameaça a vida","Sistematicamente antes da pressão direta","Nunca, é sempre perigoso"],correct:1,expl:"O torniquete é uma solução de segunda linha quando a pressão direta falha numa hemorragia vital de membro."},
    {q:"Onde colocar um torniquete?",opts:["Diretamente sobre a ferida","5 a 8 cm acima da ferida, nunca sobre uma articulação","Sobre a articulação mais próxima","Em qualquer parte do membro"],correct:1,expl:"A colocação precisa evita a ineficácia e complicações desnecessárias."},
    {q:"Uma vez colocado um torniquete e parado o sangramento, o que fazer?",opts:["Desapertá-lo para verificar a circulação","Anotar a hora de colocação e nunca o desapertar antes da assistência médica","Retirá-lo se a vítima se sentir melhor","Cobri-lo com roupa"],correct:1,expl:"Um torniquete nunca se desaperta nem se retira sozinho: pode reiniciar uma hemorragia fatal."},
    {q:"Por que o torniquete deve permanecer visível, nunca coberto?",opts:["Só por razões estéticas","Para que qualquer interveniente seguinte saiba de imediato que está colocado","Não é necessário","Para prevenir infeções"],correct:1,expl:"A visibilidade informa instantaneamente qualquer transferência médica da sua presença e hora de colocação."},
    {q:"O choque é um estado fixo ou um processo evolutivo?",opts:["Um estado fixo, sempre idêntico","Um processo evolutivo: Normal, Choque compensado, Choque descompensado, Paragem cardíaca","Só existe uma forma de choque","O choque nunca se relaciona com hemorragias"],correct:1,expl:"O choque evolui por etapas; agir cedo, na etapa compensada, muda tudo."},
    {q:"Uma vítima tem hemorragia E sinais de choque compensado. O que tratar primeiro?",opts:["Só o choque","Ambos ao mesmo tempo, sem prioridade","A hemorragia: tratar a causa antes da consequência","Nenhum dos dois, esperar ajuda"],correct:2,expl:"Treat the cause before the consequence: controlar a hemorragia também resolve o choque na sua origem."},
    {q:"No caso de estudo do Guincho, quais foram os dois riscos para o próprio socorrista?",opts:["O frio e a fome","O convés molhado (queda) e a exposição ao sangue sem proteção","O ruído e o cansaço","Nenhum risco, só dizia respeito à vítima"],correct:1,expl:"O convés escorregadio e o sangue sem proteção ilustram duas formas diferentes de se tornar uma segunda vítima."},
    {q:"No mesmo caso, por que designar claramente uma pessoa para alertar a ponte?",opts:["Não é necessário no caos","No pânico coletivo, sem designação clara, às vezes nenhum alerta real sai","Só para respeitar a hierarquia","Para que todos liguem ao mesmo tempo"],correct:1,expl:"O caos do grupo pode fazer com que todos assumam que outra pessoa já alertou, atrasando a ajuda médica real."},
    {q:"O que garante realmente o controlo de uma hemorragia, segundo a mensagem de segurança desta lição?",opts:["Garante a sobrevivência certa da vítima","Visa impedir que a vítima morra por causa da perda de sangue, cada segundo contando","Substitui toda a assistência médica","Não tem qualquer impacto real"],correct:1,expl:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss."},
    {q:"Os pontos de pressão indiretos são recomendados para uma hemorragia grave?",opts:["Sim, com prioridade antes da pressão direta","Não, a pressão direta sobre a ferida continua a ser o método recomendado","Sim, mas só para as pernas","Só na ausência de luvas"],correct:1,expl:"As recomendações atuais já não aconselham os pontos de pressão indiretos para a hemorragia grave."},
    {q:"Este módulo ensina um protocolo clínico completo sobre o controlo de hemorragias?",opts:["Sim, substitui uma formação médica completa","Não, ensina princípios de decisão STCW, nunca um substituto de uma formação prática certificada","Sim, mas só para oficiais médicos","Não, não serve de nada sem material médico"],correct:1,expl:"A MAP ensina princípios de decisão, não um manual clínico detalhado, e nunca substitui uma formação prática certificada."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Quel est le geste n#1 face à une hémorragie sévère ?",opts:["Élever le membre","Pression directe sur la plaie","Point de pression indirect","Attendre les secours"],correct:1,expl:"La pression directe reste le geste prioritaire recommandé."},
    {q:"Que faire si le pansement de pression est imbibé ?",opts:["Le retirer et en poser un nouveau","Ajouter une couche par-dessus sans le retirer","Arrêter la pression","Élever le membre à la place"],correct:1,expl:"On ajoute toujours par-dessus, jamais on ne retire un pansement déjà en place."},
    {q:"Une fois un garrot posé, que ne faut-il jamais faire ?",opts:["Noter l'heure","Le laisser visible","Le desserrer soi-même","Attendre la prise en charge médicale"],correct:2,expl:"Un garrot ne se desserre jamais soi-même : cela peut relancer une hémorragie fatale."},
    {q:"Hémorragie ET choc compensé en même temps : que traiter en premier ?",opts:["Le choc uniquement","L'hémorragie, la cause avant la conséquence","Les deux au hasard","Aucun des deux"],correct:1,expl:"Treat the cause before the consequence : traiter l'hémorragie règle aussi le choc à sa source."},
    {q:"Que garantit le contrôle d'une hémorragie selon le message de sécurité de cette leçon ?",opts:["La survie certaine","Empêcher la victime de mourir de la perte de sang, chaque seconde comptant","Rien du tout","Le remplacement des secours médicaux"],correct:1,expl:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss."},
  ],
  en:[
    {q:"What is action number one facing a severe hemorrhage?",opts:["Elevate the limb","Direct pressure on the wound","Indirect pressure point","Wait for help"],correct:1,expl:"Direct pressure remains the recommended priority action."},
    {q:"What if the pressure dressing has soaked through?",opts:["Remove it and apply a new one","Add another layer on top without removing it","Stop the pressure","Elevate the limb instead"],correct:1,expl:"Always add on top, never remove a dressing already in place."},
    {q:"Once a tourniquet is applied, what must never be done?",opts:["Note the time","Leave it visible","Loosen it yourself","Wait for medical handover"],correct:2,expl:"A tourniquet is never loosened by yourself: it can restart a fatal hemorrhage."},
    {q:"Hemorrhage AND compensated shock at the same time: what do you treat first?",opts:["Shock only","The hemorrhage, the cause before the consequence","Both at random","Neither"],correct:1,expl:"Treat the cause before the consequence: treating the hemorrhage also resolves the shock at its source."},
    {q:"What does controlling a hemorrhage guarantee according to this lesson's safety message?",opts:["Certain survival","Stopping the casualty from dying from blood loss, every second mattering","Nothing at all","Replacing medical care"],correct:1,expl:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss."},
  ],
  es:[
    {q:"¿Cuál es la acción número uno ante una hemorragia grave?",opts:["Elevar el miembro","Presión directa sobre la herida","Punto de presión indirecto","Esperar ayuda"],correct:1,expl:"La presión directa sigue siendo la acción prioritaria recomendada."},
    {q:"¿Qué hacer si el vendaje de presión se ha empapado?",opts:["Retirarlo y poner uno nuevo","Añadir otra capa encima sin retirarlo","Detener la presión","Elevar el miembro en su lugar"],correct:1,expl:"Siempre se añade encima, nunca se retira un vendaje ya colocado."},
    {q:"Una vez colocado un torniquete, ¿qué no se debe hacer nunca?",opts:["Anotar la hora","Dejarlo visible","Aflojarlo uno mismo","Esperar la atención médica"],correct:2,expl:"Un torniquete nunca se afloja uno mismo: puede reactivar una hemorragia fatal."},
    {q:"Hemorragia Y shock compensado a la vez: ¿qué tratar primero?",opts:["Solo el shock","La hemorragia, la causa antes que la consecuencia","Ambos al azar","Ninguno de los dos"],correct:1,expl:"Treat the cause before the consequence: tratar la hemorragia también resuelve el shock en su origen."},
    {q:"¿Qué garantiza el control de una hemorragia según el mensaje de seguridad de esta lección?",opts:["La supervivencia segura","Evitar que la víctima muera por la pérdida de sangre, contando cada segundo","Nada en absoluto","La sustitución de la ayuda médica"],correct:1,expl:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss."},
  ],
  pt:[
    {q:"Qual é a ação número um perante uma hemorragia grave?",opts:["Elevar o membro","Pressão direta sobre a ferida","Ponto de pressão indireto","Esperar por ajuda"],correct:1,expl:"A pressão direta continua a ser a ação prioritária recomendada."},
    {q:"O que fazer se o penso de pressão ficou encharcado?",opts:["Retirá-lo e colocar um novo","Adicionar outra camada por cima sem o retirar","Parar a pressão","Elevar o membro em vez disso"],correct:1,expl:"Adiciona-se sempre por cima, nunca se retira um penso já colocado."},
    {q:"Uma vez colocado um torniquete, o que nunca se deve fazer?",opts:["Anotar a hora","Deixá-lo visível","Desapertá-lo sozinho","Esperar pela assistência médica"],correct:2,expl:"Um torniquete nunca se desaperta sozinho: pode reiniciar uma hemorragia fatal."},
    {q:"Hemorragia E choque compensado ao mesmo tempo: o que tratar primeiro?",opts:["Só o choque","A hemorragia, a causa antes da consequência","Ambos ao acaso","Nenhum dos dois"],correct:1,expl:"Treat the cause before the consequence: tratar a hemorragia também resolve o choque na sua origem."},
    {q:"O que garante o controlo de uma hemorragia segundo a mensagem de segurança desta lição?",opts:["A sobrevivência certa","Impedir que a vítima morra por perda de sangue, cada segundo contando","Nada de todo","A substituição da assistência médica"],correct:1,expl:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Aurais-tu confiance aujourd'hui pour poser un garrot si la vie d'un collegue en dependait ? Sinon, quelle formation te manque encore ?",
    en:"Would you have the confidence to apply a tourniquet today if a crewmate's life depended on it? If not, what training do you still need?",
    es:"¿Tendrias hoy la confianza para aplicar un torniquete si la vida de un companero dependiera de ello? Si no, ¿que formacion te falta aun?",
    pt:"Terias hoje a confianca para aplicar um torniquete se a vida de um colega dependesse disso? Se nao, que formacao ainda te falta?",
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
      badge:"🩺 Safety · STCW First Aid · Leçon 3/8 · ⭐ Premium",
      title:"Bleeding Control & Shock Management",
      intro:"Cette leçon traite d'une urgence où chaque seconde compte autant qu'en arrêt cardiaque. Elle applique directement la règle des deux patients introduite en Leçon 1, cette fois sous l'angle du risque biologique.",
      p0:"EVERY CASUALTY HAS TWO PATIENTS - REVISITÉ",s0t:"Le sang expose le sauveteur autant que le danger physique",
      s0:"En Leçon 1, cette règle concernait surtout les dangers physiques (électricité, machines, espaces confinés). Ici, elle prend une autre forme : un sauveteur qui touche du sang sans protection s'expose lui-même à un risque, et un sauveteur qui se précipite sans évaluer peut glisser, se blesser, et devenir une seconde victime.\n\nCOMMENT LE RECONNAÎTRE ? Type de saignement (capillaire, veineux, artériel) et signes de choc qui évoluent.\nQUE FAIRE IMMÉDIATEMENT ? Se protéger, puis pression directe sans délai.\nQUELLE ERREUR L'AGGRAVE ? Soulever le pansement pour vérifier, ou desserrer un garrot déjà posé.\nQUAND DEMANDER DE L'AIDE MÉDICALE ? Immédiatement pour toute hémorragie sévère ou signe de choc.",
      p1:"RECONNAÎTRE LE TYPE D'HÉMORRAGIE",s1t:"Capillaire, veineuse, artérielle",
      s1:"L'aspect et le débit du saignement orientent immédiatement la gravité de la situation et l'urgence de l'action.",
      p2:"LA PRESSION DIRECTE",s2t:"Le geste n#1, sans exception",
      s2:"Appuyer fermement sur la source du saignement, avec un pansement propre, sans jamais soulever pour vérifier. Les points de pression indirects ne sont plus recommandés : la pression directe est plus efficace.",
      p3:"TREAT THE CAUSE BEFORE THE CONSEQUENCE",s3t:"Traiter l'hémorragie, pas seulement ses effets",
      s3:"Face à une victime en choc à cause d'une hémorragie, l'erreur serait de traiter le choc en premier. Contrôler la cause, l'hémorragie, règle aussi la conséquence, le choc, à sa source.",
      p4:"LE GARROT",s4t:"Quand la pression directe ne suffit pas",
      s4:"Réservé aux hémorragies de membre qui menacent la vie et que la pression directe ne parvient pas à arrêter. Une fois posé, il ne se retire jamais sur place.",
      p5:"LA PROGRESSION DU CHOC",s5t:"Un processus évolutif, pas un état figé",
      s5:"Normal, choc compensé, choc décompensé, arrêt cardiaque : chaque étape est une occasion d'agir avant la suivante. Le repérer tôt, au stade compensé, change tout.",
      p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"⚠️ CAS D'ÉTUDE",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 3",
      sumP:["Every casualty has two patients : se protéger du sang avant tout contact","Pression directe = geste n#1, ne jamais soulever un pansement déjà en place","Treat the cause before the consequence : l'hémorragie avant le choc","Garrot : seulement si pression directe insuffisante, jamais desserré une fois posé","Le choc est un processus évolutif : agir tôt au stade compensé change tout"],
      learnedP:["Reconnaître les 3 types d'hémorragie","La pression directe sans interruption","Le principe Treat the cause before the consequence","La décision et la pose du garrot","La progression du choc en 4 étapes"],
      safetyMsg:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss. Every second matters, every decision matters.",
    },
    en:{
      badge:"🩺 Safety · STCW First Aid · Lesson 3/8 · ⭐ Premium",
      title:"Bleeding Control & Shock Management",
      intro:"This lesson deals with an emergency where every second counts just as much as in cardiac arrest. It directly applies the two-patients rule introduced in Lesson 1, this time from the angle of biological risk.",
      p0:"EVERY CASUALTY HAS TWO PATIENTS - REVISITED",s0t:"Blood exposes the rescuer just as much as physical danger",
      s0:"In Lesson 1, this rule mainly concerned physical dangers (electricity, machinery, confined spaces). Here it takes another form: a rescuer who touches blood without protection exposes themselves to a risk, and a rescuer who rushes without assessing can slip, get hurt, and become a second casualty.\n\nHOW DO I RECOGNIZE IT? Type of bleeding (capillary, venous, arterial) and evolving signs of shock.\nWHAT DO I DO IMMEDIATELY? Protect myself, then direct pressure without delay.\nWHAT MISTAKE MAKES IT WORSE? Lifting the dressing to check, or loosening a tourniquet already applied.\nWHEN MUST I ASK FOR MEDICAL ASSISTANCE? Immediately for any severe hemorrhage or sign of shock.",
      p1:"RECOGNIZING THE TYPE OF BLEEDING",s1t:"Capillary, venous, arterial",
      s1:"The appearance and flow of the bleeding immediately indicate the severity of the situation and the urgency of action.",
      p2:"DIRECT PRESSURE",s2t:"Action number one, no exceptions",
      s2:"Press firmly on the source of the bleeding, with a clean dressing, never lifting it to check. Indirect pressure points are no longer recommended: direct pressure is more effective.",
      p3:"TREAT THE CAUSE BEFORE THE CONSEQUENCE",s3t:"Treat the hemorrhage, not just its effects",
      s3:"Facing a casualty in shock because of a hemorrhage, the mistake would be to treat the shock first. Controlling the cause, the hemorrhage, also resolves the consequence, the shock, at its source.",
      p4:"THE TOURNIQUET",s4t:"When direct pressure isn't enough",
      s4:"Reserved for life-threatening limb hemorrhages that direct pressure fails to stop. Once applied, it is never removed on the spot.",
      p5:"THE PROGRESSION OF SHOCK",s5t:"An evolving process, not a fixed state",
      s5:"Normal, compensated shock, decompensated shock, cardiac arrest: each stage is a chance to act before the next. Catching it early, at the compensated stage, changes everything.",
      p6:"🎯 OPERATIONAL EXERCISE",p7:"⚠️ CASE STUDY",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 3",
      sumP:["Every casualty has two patients: protect yourself from blood before any contact","Direct pressure = action number one, never lift a dressing already in place","Treat the cause before the consequence: the hemorrhage before the shock","Tourniquet: only if direct pressure is insufficient, never loosened once applied","Shock is an evolving process: acting early at the compensated stage changes everything"],
      learnedP:["Recognizing the 3 types of bleeding","Uninterrupted direct pressure","The Treat the cause before the consequence principle","Tourniquet decision and application","The 4-stage progression of shock"],
      safetyMsg:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss. Every second matters, every decision matters.",
    },
    es:{
      badge:"🩺 Safety · STCW First Aid · Lección 3/8 · ⭐ Premium",
      title:"Bleeding Control & Shock Management",
      intro:"Esta lección trata una urgencia donde cada segundo cuenta tanto como en un paro cardíaco. Aplica directamente la regla de los dos pacientes presentada en la Lección 1, esta vez desde el ángulo del riesgo biológico.",
      p0:"EVERY CASUALTY HAS TWO PATIENTS - REVISITADO",s0t:"La sangre expone al socorrista tanto como el peligro físico",
      s0:"En la Lección 1, esta regla concernía sobre todo a los peligros físicos (electricidad, maquinaria, espacios confinados). Aquí toma otra forma: un socorrista que toca sangre sin protección se expone a un riesgo, y uno que se precipita sin evaluar puede resbalar, lesionarse, y convertirse en una segunda víctima.\n\n¿CÓMO RECONOCERLO? Tipo de sangrado (capilar, venoso, arterial) y signos de shock que evolucionan.\n¿QUÉ HACER DE INMEDIATO? Protegerse, luego presión directa sin demora.\n¿QUÉ ERROR LO AGRAVA? Levantar el vendaje para comprobar, o aflojar un torniquete ya colocado.\n¿CUÁNDO PEDIR AYUDA MÉDICA? De inmediato ante cualquier hemorragia grave o signo de shock.",
      p1:"RECONOCER EL TIPO DE HEMORRAGIA",s1t:"Capilar, venosa, arterial",
      s1:"El aspecto y el caudal del sangrado indican de inmediato la gravedad de la situación y la urgencia de actuar.",
      p2:"LA PRESIÓN DIRECTA",s2t:"La acción número uno, sin excepciones",
      s2:"Presionar firmemente sobre la fuente del sangrado, con un vendaje limpio, sin levantarlo nunca para comprobar. Los puntos de presión indirectos ya no se recomiendan: la presión directa es más eficaz.",
      p3:"TREAT THE CAUSE BEFORE THE CONSEQUENCE",s3t:"Tratar la hemorragia, no solo sus efectos",
      s3:"Ante una víctima en shock a causa de una hemorragia, el error sería tratar el shock primero. Controlar la causa, la hemorragia, también resuelve la consecuencia, el shock, en su origen.",
      p4:"EL TORNIQUETE",s4t:"Cuando la presión directa no basta",
      s4:"Reservado para hemorragias de miembro que amenazan la vida y que la presión directa no logra detener. Una vez colocado, nunca se retira en el lugar.",
      p5:"LA PROGRESIÓN DEL SHOCK",s5t:"Un proceso evolutivo, no un estado fijo",
      s5:"Normal, shock compensado, shock descompensado, paro cardíaco: cada etapa es una oportunidad de actuar antes de la siguiente. Detectarlo pronto, en la etapa compensada, lo cambia todo.",
      p6:"🎯 EJERCICIO OPERATIVO",p7:"⚠️ CASO DE ESTUDIO",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 3",
      sumP:["Every casualty has two patients: protegerse de la sangre antes de cualquier contacto","Presión directa = acción número uno, nunca levantar un vendaje ya colocado","Treat the cause before the consequence: la hemorragia antes que el shock","Torniquete: solo si la presión directa es insuficiente, nunca se afloja una vez colocado","El shock es un proceso evolutivo: actuar pronto en la etapa compensada lo cambia todo"],
      learnedP:["Reconocer los 3 tipos de hemorragia","La presión directa sin interrupción","El principio Treat the cause before the consequence","La decisión y colocación del torniquete","La progresión del shock en 4 etapas"],
      safetyMsg:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss. Every second matters, every decision matters.",
    },
    pt:{
      badge:"🩺 Safety · STCW First Aid · Lição 3/8 · ⭐ Premium",
      title:"Bleeding Control & Shock Management",
      intro:"Esta lição trata de uma urgência onde cada segundo conta tanto como numa paragem cardíaca. Aplica diretamente a regra dos dois pacientes apresentada na Lição 1, desta vez sob o ângulo do risco biológico.",
      p0:"EVERY CASUALTY HAS TWO PATIENTS - REVISITADO",s0t:"O sangue expõe o socorrista tanto quanto o perigo físico",
      s0:"Na Lição 1, esta regra dizia respeito sobretudo a perigos físicos (eletricidade, maquinaria, espaços confinados). Aqui toma outra forma: um socorrista que toca no sangue sem proteção expõe-se a um risco, e um que se precipita sem avaliar pode escorregar, magoar-se, e tornar-se uma segunda vítima.\n\nCOMO RECONHECER? Tipo de sangramento (capilar, venoso, arterial) e sinais de choque que evoluem.\nO QUE FAZER IMEDIATAMENTE? Proteger-se, depois pressão direta sem demora.\nQUE ERRO O AGRAVA? Levantar o penso para verificar, ou desapertar um torniquete já colocado.\nQUANDO PEDIR AJUDA MÉDICA? De imediato perante qualquer hemorragia grave ou sinal de choque.",
      p1:"RECONHECER O TIPO DE HEMORRAGIA",s1t:"Capilar, venosa, arterial",
      s1:"O aspeto e o caudal do sangramento indicam de imediato a gravidade da situação e a urgência da ação.",
      p2:"A PRESSÃO DIRETA",s2t:"A ação número um, sem exceções",
      s2:"Pressionar firmemente sobre a fonte do sangramento, com um penso limpo, nunca o levantando para verificar. Os pontos de pressão indiretos já não são recomendados: a pressão direta é mais eficaz.",
      p3:"TREAT THE CAUSE BEFORE THE CONSEQUENCE",s3t:"Tratar a hemorragia, não só os seus efeitos",
      s3:"Perante uma vítima em choque devido a uma hemorragia, o erro seria tratar o choque primeiro. Controlar a causa, a hemorragia, também resolve a consequência, o choque, na sua origem.",
      p4:"O TORNIQUETE",s4t:"Quando a pressão direta não basta",
      s4:"Reservado para hemorragias de membro que ameaçam a vida e que a pressão direta não consegue parar. Uma vez colocado, nunca se retira no local.",
      p5:"A PROGRESSÃO DO CHOQUE",s5t:"Um processo evolutivo, não um estado fixo",
      s5:"Normal, choque compensado, choque descompensado, paragem cardíaca: cada etapa é uma oportunidade de agir antes da seguinte. Detetá-lo cedo, na etapa compensada, muda tudo.",
      p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"⚠️ CASO DE ESTUDO",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 3",
      sumP:["Every casualty has two patients: proteger-se do sangue antes de qualquer contacto","Pressão direta = ação número um, nunca levantar um penso já colocado","Treat the cause before the consequence: a hemorragia antes do choque","Torniquete: só se a pressão direta for insuficiente, nunca desapertado uma vez colocado","O choque é um processo evolutivo: agir cedo na etapa compensada muda tudo"],
      learnedP:["Reconhecer os 3 tipos de hemorragia","A pressão direta sem interrupção","O princípio Treat the cause before the consequence","A decisão e colocação do torniquete","A progressão do choque em 4 etapas"],
      safetyMsg:"The first priority is not to stop the blood. It is to stop the person from dying because of the blood loss. Every second matters, every decision matters.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS3_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/8":lang==="en"?"Lesson 3/8":lang==="es"?"Lección 3/8":"Lição 3/8"}</div>
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

            <SL icon="🤝" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🤝</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🩸" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🩸</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🩸 {lang==="fr"?"TYPES D'HÉMORRAGIE - INTERACTIF":lang==="en"?"BLEEDING TYPES - INTERACTIVE":lang==="es"?"TIPOS DE HEMORRAGIA - INTERACTIVO":"TIPOS DE HEMORRAGIA - INTERATIVO"}</div><BleedingTypesSVG lang={lang}/></Card>

            <SL icon="✋" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>✋</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>✋ {lang==="fr"?"PRESSION DIRECTE - INTERACTIF":lang==="en"?"DIRECT PRESSURE - INTERACTIVE":lang==="es"?"PRESIÓN DIRECTA - INTERACTIVO":"PRESSÃO DIRETA - INTERATIVO"}</div><DirectPressureSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎯</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="🔧" text={lc.p4} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔧</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔧 {lang==="fr"?"GARROT - DÉCISION ET SÉQUENCE":lang==="en"?"TOURNIQUET - DECISION AND SEQUENCE":lang==="es"?"TORNIQUETE - DECISIÓN Y SECUENCIA":"TORNIQUETE - DECISÃO E SEQUÊNCIA"}</div><TourniquetSVG lang={lang}/></Card>

            <SL icon="📉" text={lc.p5} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📉</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📉 {lang==="fr"?"PROGRESSION DU CHOC - INTERACTIF":lang==="en"?"SHOCK PROGRESSION - INTERACTIVE":lang==="es"?"PROGRESIÓN DEL SHOCK - INTERACTIVO":"PROGRESSÃO DO CHOQUE - INTERATIVO"}</div><ShockProgressionSVG lang={lang}/></Card>

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
                {lang==="fr"?"Quiz Final - Hémorragies & Choc":lang==="en"?"Final Quiz - Bleeding & Shock":lang==="es"?"Quiz Final - Hemorragias y Shock":"Quiz Final - Hemorragias e Choque"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 3/8":"questions · Lesson 3/8"}</div>
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
              {lang==="fr"?"LEÇON 4 - BRÛLURES & FRACTURES →":lang==="en"?"LESSON 4 - BURNS & FRACTURES →":lang==="es"?"LECCIÓN 4 - QUEMADURAS Y FRACTURAS →":"LIÇÃO 4 - QUEIMADURAS E FRATURAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
