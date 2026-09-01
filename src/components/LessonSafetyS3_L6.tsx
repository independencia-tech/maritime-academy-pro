import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - HEAT EXHAUSTION VS HEAT STROKE
function HeatIllnessSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, color:C.gold2, label:{fr:"Épuisement par la chaleur",en:"Heat exhaustion",es:"Agotamiento por calor",pt:"Exaustão pelo calor"}, desc:{fr:"Transpiration abondante, faiblesse, nausées, la victime reste orientée. Premières mesures : ombre, retirer l'excès de vêtements, hydrater, surveiller. Si aucune amélioration ou dégradation, escalader immédiatement vers une prise en charge active.",en:"Heavy sweating, weakness, nausea, the casualty stays oriented. First measures: shade, remove excess clothing, hydrate, monitor. If no improvement or deterioration, escalate immediately to active management.",es:"Sudoración abundante, debilidad, náuseas, la víctima permanece orientada. Primeras medidas: sombra, retirar el exceso de ropa, hidratar, vigilar. Si no hay mejora o hay deterioro, escalar de inmediato a un manejo activo.",pt:"Transpiração abundante, fraqueza, náuseas, a vítima permanece orientada. Primeiras medidas: sombra, retirar o excesso de roupa, hidratar, vigiar. Se não houver melhoria ou houver deterioração, escalar de imediato para uma gestão ativa."} },
    { id:2, color:C.red, label:{fr:"Coup de chaleur",en:"Heat stroke",es:"Golpe de calor",pt:"Golpe de calor"}, desc:{fr:"Confusion, agitation, désorientation, convulsions ou inconscience. Urgence vitale : retirer immédiatement de la chaleur, commencer le refroidissement actif sans délai, immersion corporelle en eau froide si réalisable, sinon linges mouillés froids sur cou/aisselles/aine avec ventilation. Appel médical urgent.",en:"Confusion, agitation, disorientation, seizures, or unresponsiveness. A vital emergency: remove from the heat immediately, begin active cooling without delay, whole-body cold water immersion if feasible, otherwise cold wet cloths on neck/armpits/groin with fanning. Urgent medical call.",es:"Confusión, agitación, desorientación, convulsiones o inconsciencia. Urgencia vital: retirar del calor de inmediato, comenzar el enfriamiento activo sin demora, inmersión corporal en agua fría si es factible, si no paños fríos mojados en cuello/axilas/ingle con ventilación. Llamada médica urgente.",pt:"Confusão, agitação, desorientação, convulsões ou inconsciência. Urgência vital: retirar do calor de imediato, começar o arrefecimento ativo sem demora, imersão corporal em água fria se exequível, senão panos frios molhados no pescoço/axilas/virilha com ventilação. Chamada médica urgente."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?`${i.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?i.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:22,height:22,borderRadius:"50%",background:i.color,flexShrink:0}}/>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 2 - HYPOTHERMIA / COLD EXPOSURE
function HypothermiaSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"🌬️", label:{fr:"Sortir du vent et du froid",en:"Get out of wind and cold",es:"Salir del viento y del frío",pt:"Sair do vento e do frio"}, desc:{fr:"Abriter la victime dès que possible, avant tout autre geste.",en:"Shelter the casualty as soon as possible, before any other action.",es:"Refugiar a la víctima lo antes posible, antes de cualquier otro gesto.",pt:"Abrigar a vítima o mais depressa possível, antes de qualquer outro gesto."} },
    { id:2, icon:"👕", label:{fr:"Retirer les vêtements mouillés",en:"Remove wet clothing",es:"Retirar la ropa mojada",pt:"Retirar a roupa molhada"}, desc:{fr:"Remplacer par des vêtements secs, un vêtement mouillé accélère la perte de chaleur.",en:"Replace with dry clothing, wet clothing accelerates heat loss.",es:"Sustituir por ropa seca, la ropa mojada acelera la pérdida de calor.",pt:"Substituir por roupa seca, roupa molhada acelera a perda de calor."} },
    { id:3, icon:"🧊", label:{fr:"Isoler du sol froid",en:"Insulate from cold ground",es:"Aislar del suelo frío",pt:"Isolar do chão frio"}, desc:{fr:"Placer une couverture ou tout isolant entre la victime et une surface froide.",en:"Place a blanket or any insulating material between the casualty and a cold surface.",es:"Colocar una manta o cualquier aislante entre la víctima y una superficie fría.",pt:"Colocar um cobertor ou qualquer isolante entre a vítima e uma superfície fria."} },
    { id:4, icon:"🤲", label:{fr:"Manipuler avec douceur",en:"Handle gently",es:"Manipular con suavidad",pt:"Manusear com suavidade"}, desc:{fr:"Un cœur en hypothermie sévère est irritable : un mouvement brusque peut déclencher un trouble du rythme grave.",en:"A severely hypothermic heart is irritable: a sudden movement can trigger a serious rhythm disturbance.",es:"Un corazón en hipotermia grave es irritable: un movimiento brusco puede desencadenar un trastorno del ritmo grave.",pt:"Um coração em hipotermia grave é irritável: um movimento brusco pode desencadear uma perturbação grave do ritmo."} },
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

// SVG 3 - NON-FATAL DROWNING
function DrowningSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"🛟", label:{fr:"Flottaison puis sortie de l'eau",en:"Flotation then removal from water",es:"Flotación y salida del agua",pt:"Flutuação e saída da água"}, desc:{fr:"Offrir un flotteur si possible avant de sortir la victime, sans se mettre soi-même en danger.",en:"Offer flotation if possible before removing the casualty, without putting yourself in danger.",es:"Ofrecer flotación si es posible antes de sacar a la víctima, sin ponerse uno mismo en peligro.",pt:"Oferecer flutuação se possível antes de retirar a vítima, sem se colocar a si próprio em perigo."} },
    { id:2, icon:"🫁", label:{fr:"5 insufflations initiales",en:"5 initial rescue breaths",es:"5 insuflaciones iniciales",pt:"5 insuflações iniciais"}, desc:{fr:"Si inconsciente et ne respire pas normalement : 5 insufflations avant de passer à la RCP standard (Leçon 2).",en:"If unconscious and not breathing normally: 5 rescue breaths before moving to standard CPR (Lesson 2).",es:"Si está inconsciente y no respira con normalidad: 5 insuflaciones antes de pasar a la RCP estándar (Lección 2).",pt:"Se inconsciente e não respirar normalmente: 5 insuflações antes de passar à RCP padrão (Lição 2)."} },
    { id:3, icon:"💓", label:{fr:"RCP standard ensuite",en:"Standard CPR afterward",es:"RCP estándar después",pt:"RCP padrão a seguir"}, desc:{fr:"Poursuivre selon le rythme et la profondeur vus en Leçon 2, sans changement de méthode après les 5 insufflations.",en:"Continue at the rate and depth seen in Lesson 2, with no change in method after the 5 breaths.",es:"Continuar con el ritmo y la profundidad vistos en la Lección 2, sin cambiar de método tras las 5 insuflaciones.",pt:"Continuar com o ritmo e a profundidade vistos na Lição 2, sem mudança de método após as 5 insuflações."} },
    { id:4, icon:"🧻", label:{fr:"Sécher le thorax avant l'AED",en:"Dry the chest before the AED",es:"Secar el tórax antes del DEA",pt:"Secar o tórax antes do DAE"}, desc:{fr:"Toujours sécher rapidement la peau avant de coller les électrodes, l'eau peut gêner leur efficacité.",en:"Always dry the skin quickly before attaching the pads, water can interfere with their effectiveness.",es:"Siempre secar rápidamente la piel antes de pegar los electrodos, el agua puede afectar su eficacia.",pt:"Secar sempre rapidamente a pele antes de colar os elétrodos, a água pode afetar a sua eficácia."} },
    { id:5, icon:"👁️", label:{fr:"Surveillance même si elle semble se rétablir",en:"Monitoring even if she seems to recover",es:"Vigilancia incluso si parece recuperarse",pt:"Vigilância mesmo que pareça recuperar"}, desc:{fr:"Toute noyade non mortelle nécessite une évaluation médicale, même en cas de récupération apparente.",en:"Any non-fatal drowning requires medical evaluation, even with apparent recovery.",es:"Cualquier ahogamiento no mortal requiere evaluación médica, incluso con recuperación aparente.",pt:"Qualquer afogamento não fatal exige avaliação médica, mesmo com recuperação aparente."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(30,138,74,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.green:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{s.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 4 - SEVERE ALLERGIC REACTION (ANAPHYLAXIS)
function AnaphylaxisSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"👀", label:{fr:"Reconnaître immédiatement",en:"Recognize immediately",es:"Reconocer de inmediato",pt:"Reconhecer de imediato"}, desc:{fr:"Gonflement du visage ou de la gorge, difficulté à respirer, urticaire généralisée, vertiges ou malaise après une exposition connue.",en:"Swelling of the face or throat, difficulty breathing, widespread hives, dizziness or feeling faint after a known exposure.",es:"Hinchazón de la cara o la garganta, dificultad para respirar, urticaria generalizada, mareos o desmayo tras una exposición conocida.",pt:"Inchaço da face ou da garganta, dificuldade em respirar, urticária generalizada, tonturas ou mal-estar após uma exposição conhecida."} },
    { id:2, icon:"📡", label:{fr:"Appel médical urgent",en:"Urgent medical call",es:"Llamada médica urgente",pt:"Chamada médica urgente"}, desc:{fr:"Déclencher l'alerte médicale immédiatement, en parallèle des autres gestes, jamais après.",en:"Trigger the medical alert immediately, alongside the other actions, never after.",es:"Activar la alerta médica de inmediato, junto con los otros gestos, nunca después.",pt:"Acionar o alerta médico de imediato, em paralelo com os outros gestos, nunca depois."} },
    { id:3, icon:"🚫", label:{fr:"Retirer le déclencheur si possible",en:"Remove the trigger if possible",es:"Retirar el desencadenante si es posible",pt:"Remover o gatilho se possível"}, desc:{fr:"Dard d'insecte, aliment en bouche, contact avec un produit identifié : retirer sans perdre de temps sur les autres gestes.",en:"Insect stinger, food still in the mouth, contact with an identified product: remove without losing time on the other actions.",es:"Aguijón de insecto, alimento en la boca, contacto con un producto identificado: retirar sin perder tiempo con los demás gestos.",pt:"Ferrão de inseto, alimento na boca, contacto com um produto identificado: remover sem perder tempo com os outros gestos."} },
    { id:4, icon:"💉", label:{fr:"Auto-injecteur sans délai",en:"Auto-injector without delay",es:"Autoinyector sin demora",pt:"Autoinjetor sem demora"}, desc:{fr:"Utilisé par la victime elle-même ou par une personne formée, dès que la réaction sévère est reconnue. Ne jamais attendre de voir si ça passe.",en:"Used by the casualty themselves or by a trained person, as soon as the severe reaction is recognized. Never wait to see if it passes.",es:"Usado por la propia víctima o por una persona formada, en cuanto se reconoce la reacción grave. Nunca esperar a ver si pasa.",pt:"Usado pela própria vítima ou por uma pessoa formada, assim que a reação grave é reconhecida. Nunca esperar para ver se passa."} },
    { id:5, icon:"🔄", label:{fr:"Surveillance continue",en:"Continuous monitoring",es:"Vigilancia continua",pt:"Vigilância contínua"}, desc:{fr:"Même après l'auto-injecteur, une deuxième vague est possible. Continuer à surveiller jusqu'à la prise en charge médicale (Leçon 5).",en:"Even after the auto-injector, a second wave is possible. Keep monitoring until medical care takes over (Lesson 5).",es:"Incluso después del autoinyector, es posible una segunda oleada. Seguir vigilando hasta la atención médica (Lección 5).",pt:"Mesmo depois do autoinjetor, uma segunda vaga é possível. Continuar a vigiar até à assistência médica (Lição 5)."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(142,68,173,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.purple:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{s.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(142,68,173,0.1)",border:`1px solid ${C.purple}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Le stockage et la gestion de l'auto-injecteur dans la pharmacie de bord seront vus en Leçon 7.":lang==="en"?"Storing and managing the auto-injector in the medicine chest will be covered in Lesson 7.":lang==="es"?"El almacenamiento y la gestión del autoinyector en el botiquín se verán en la Lección 7.":"O armazenamento e a gestão do autoinjetor na farmácia de bordo serão vistos na Lição 7."}</div>
    </div>
  );
}

// EXERCISE - MEDICAL EMERGENCIES DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"c",q3:"a",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Un marin en pleine chaleur devient confus et désorienté. Que suspectez-vous en priorité ?\na) Un simple épuisement par la chaleur, rien d'urgent\nb) Un coup de chaleur : urgence vitale nécessitant un refroidissement actif immédiat\nc) Une simple fatigue de fin de quart"},
      {id:"q2",q:"Une victime inconsciente est sortie de l'eau et ne respire pas normalement. Que faites-vous ?\na) Commencer directement les compressions sans insufflation\nb) Attendre l'arrivée du DAE avant tout geste\nc) 5 insufflations initiales puis RCP standard"},
      {id:"q3",q:"Une victime présente un gonflement du visage et une difficulté à respirer après une piqûre d'insecte, avec un auto-injecteur disponible et une personne formée présente. Que faites-vous ?\na) Utiliser l'auto-injecteur sans délai et déclencher l'alerte médicale\nb) Attendre de voir si les symptômes s'aggravent avant d'agir\nc) Donner d'abord un antihistaminique oral et surveiller"},
      {id:"q4",q:"Une victime hypothermique doit être déplacée. Comment procédez-vous ?\na) Rapidement, la vitesse compte plus que la douceur\nb) Avec douceur, un mouvement brusque peut déclencher un trouble du rythme cardiaque grave\nc) En la faisant marcher pour la réchauffer plus vite"},
    ],
    en:[
      {id:"q1",q:"A sailor in intense heat becomes confused and disoriented. What do you suspect first?\na) Simple heat exhaustion, nothing urgent\nb) Heat stroke: a vital emergency requiring immediate active cooling\nc) Simple end-of-watch fatigue"},
      {id:"q2",q:"An unconscious casualty is pulled from the water and is not breathing normally. What do you do?\na) Start compressions directly with no breaths\nb) Wait for the AED to arrive before any action\nc) 5 initial rescue breaths then standard CPR"},
      {id:"q3",q:"A casualty shows facial swelling and difficulty breathing after an insect sting, with an auto-injector available and a trained person present. What do you do?\na) Use the auto-injector without delay and trigger the medical alert\nb) Wait to see if symptoms worsen before acting\nc) Give an oral antihistamine first and monitor"},
      {id:"q4",q:"A hypothermic casualty needs to be moved. How do you proceed?\na) Quickly, speed matters more than gentleness\nb) Gently, a sudden movement can trigger a serious cardiac rhythm disturbance\nc) By having them walk to warm up faster"},
    ],
    es:[
      {id:"q1",q:"Un marinero con calor intenso se vuelve confuso y desorientado. ¿Qué sospechas primero?\na) Un simple agotamiento por calor, nada urgente\nb) Un golpe de calor: urgencia vital que requiere enfriamiento activo inmediato\nc) Simple cansancio de fin de guardia"},
      {id:"q2",q:"Una víctima inconsciente es sacada del agua y no respira con normalidad. ¿Qué haces?\na) Empezar directamente las compresiones sin insuflaciones\nb) Esperar a que llegue el DEA antes de cualquier gesto\nc) 5 insuflaciones iniciales y luego RCP estándar"},
      {id:"q3",q:"Una víctima presenta hinchazón facial y dificultad para respirar tras una picadura de insecto, con un autoinyector disponible y una persona formada presente. ¿Qué haces?\na) Usar el autoinyector sin demora y activar la alerta médica\nb) Esperar a ver si los síntomas empeoran antes de actuar\nc) Dar primero un antihistamínico oral y vigilar"},
      {id:"q4",q:"Hay que mover a una víctima hipotérmica. ¿Cómo procedes?\na) Rápidamente, la velocidad importa más que la suavidad\nb) Con suavidad, un movimiento brusco puede desencadenar un trastorno grave del ritmo cardíaco\nc) Haciéndola caminar para calentarse más rápido"},
    ],
    pt:[
      {id:"q1",q:"Um marinheiro em calor intenso fica confuso e desorientado. O que suspeitas primeiro?\na) Uma simples exaustão pelo calor, nada urgente\nb) Um golpe de calor: urgência vital que exige arrefecimento ativo imediato\nc) Simples cansaço de fim de turno"},
      {id:"q2",q:"Uma vítima inconsciente é retirada da água e não respira normalmente. O que fazes?\na) Começar diretamente as compressões sem insuflações\nb) Esperar que chegue o DAE antes de qualquer gesto\nc) 5 insuflações iniciais e depois RCP padrão"},
      {id:"q3",q:"Uma vítima apresenta inchaço facial e dificuldade em respirar após uma picada de inseto, com um autoinjetor disponível e uma pessoa formada presente. O que fazes?\na) Usar o autoinjetor sem demora e acionar o alerta médico\nb) Esperar para ver se os sintomas pioram antes de agir\nc) Dar primeiro um anti-histamínico oral e vigiar"},
      {id:"q4",q:"Uma vítima hipotérmica precisa de ser movida. Como procedes?\na) Rapidamente, a velocidade importa mais do que a suavidade\nb) Com suavidade, um movimento brusco pode desencadear uma perturbação grave do ritmo cardíaco\nc) Fazendo-a caminhar para aquecer mais depressa"},
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

// ACCIDENT CASE - COMPOSITE CASE (GULF HEAT STROKE)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Golfe Persique",teaser:"Cas composite - un coup de chaleur d'abord pris pour une simple fatigue",
      what:"En plein Golfe Persique, un marin travaillant sur le pont en pleine chaleur devient soudainement confus, agité, puis s'effondre. L'équipage, pensant à une simple fatigue de fin de quart, le fait s'asseoir à l'ombre et lui donne de l'eau, sans le sortir complètement de la chaleur ambiante ni commencer de refroidissement actif. Sa confusion s'aggrave dans les minutes qui suivent.",
      cause:"• La confusion a été prise pour de la fatigue plutôt que pour un signe de coup de chaleur\n• La victime est restée trop longtemps exposée à la chaleur ambiante avant d'être réellement mise à l'abri\n• Un refroidissement passif (ombre, eau à boire) a été jugé suffisant alors que les signes imposaient un refroidissement actif immédiat\n• Aucun appel médical urgent n'a été déclenché dans les premières minutes",
      lessons:"✓ The Environment Is Still Attacking. Stop It First : sortir la victime de la chaleur reste toujours le tout premier geste\n✓ Confusion, agitation ou désorientation en pleine chaleur signent un coup de chaleur, pas une simple fatigue\n✓ Le refroidissement actif (immersion en eau froide ou linges froids sur cou/aisselles/aine) ne doit jamais être retardé face à ces signes\n✓ Un appel médical urgent doit être déclenché dès la reconnaissance, en parallèle du refroidissement",
      link:"🔗 Ce cas illustre directement pourquoi la confusion doit toujours faire suspecter le pire, jamais le plus rassurant, dans un environnement qui continue d'agir contre la victime."},
    en:{title:"Case Study - The Persian Gulf",teaser:"Composite case - a heat stroke first mistaken for simple fatigue",
      what:"In the middle of the Persian Gulf, a sailor working on deck in intense heat suddenly becomes confused, agitated, then collapses. The crew, thinking it's simple end-of-watch fatigue, sits him in the shade and gives him water, without fully removing him from the ambient heat or starting active cooling. His confusion worsens over the following minutes.",
      cause:"• Confusion was mistaken for fatigue rather than a sign of heat stroke\n• The casualty remained exposed to ambient heat too long before being truly sheltered\n• Passive cooling (shade, water to drink) was judged sufficient when the signs required immediate active cooling\n• No urgent medical call was triggered in the first minutes",
      lessons:"✓ The Environment Is Still Attacking. Stop It First: removing the casualty from the heat is always the very first action\n✓ Confusion, agitation, or disorientation in intense heat signals heat stroke, not simple fatigue\n✓ Active cooling (cold water immersion or cold cloths on neck/armpits/groin) must never be delayed facing these signs\n✓ An urgent medical call must be triggered as soon as it's recognized, alongside cooling",
      link:"🔗 This case directly illustrates why confusion should always suggest the worst, never the most reassuring explanation, in an environment that keeps acting against the casualty."},
    es:{title:"Caso de estudio - Golfo Pérsico",teaser:"Caso compuesto - un golpe de calor confundido primero con simple fatiga",
      what:"En pleno Golfo Pérsico, un marinero que trabaja en cubierta con calor intenso se vuelve de repente confuso, agitado, y luego se desploma. La tripulación, pensando en un simple cansancio de fin de guardia, lo sienta a la sombra y le da agua, sin sacarlo por completo del calor ambiente ni empezar el enfriamiento activo. Su confusión empeora en los minutos siguientes.",
      cause:"• La confusión se confundió con cansancio en lugar de un signo de golpe de calor\n• La víctima permaneció expuesta al calor ambiente demasiado tiempo antes de ser realmente resguardada\n• Se consideró suficiente un enfriamiento pasivo (sombra, agua para beber) cuando los signos exigían un enfriamiento activo inmediato\n• No se activó ninguna llamada médica urgente en los primeros minutos",
      lessons:"✓ The Environment Is Still Attacking. Stop It First: sacar a la víctima del calor es siempre el primerísimo gesto\n✓ Confusión, agitación o desorientación con calor intenso indican golpe de calor, no simple cansancio\n✓ El enfriamiento activo (inmersión en agua fría o paños fríos en cuello/axilas/ingle) nunca debe retrasarse ante estos signos\n✓ Debe activarse una llamada médica urgente en cuanto se reconoce, junto con el enfriamiento",
      link:"🔗 Este caso ilustra directamente por qué la confusión debe hacer siempre sospechar lo peor, nunca la explicación más tranquilizadora, en un entorno que sigue actuando contra la víctima."},
    pt:{title:"Caso de estudo - Golfo Pérsico",teaser:"Caso composto - um golpe de calor confundido primeiro com simples fadiga",
      what:"No meio do Golfo Pérsico, um marinheiro a trabalhar no convés com calor intenso fica de repente confuso, agitado, e depois desmaia. A tripulação, pensando tratar-se de simples cansaço de fim de turno, senta-o à sombra e dá-lhe água, sem o retirar totalmente do calor ambiente nem começar o arrefecimento ativo. A sua confusão agrava-se nos minutos seguintes.",
      cause:"• A confusão foi confundida com cansaço em vez de um sinal de golpe de calor\n• A vítima permaneceu exposta ao calor ambiente demasiado tempo antes de ser realmente abrigada\n• Um arrefecimento passivo (sombra, água para beber) foi considerado suficiente quando os sinais exigiam um arrefecimento ativo imediato\n• Nenhuma chamada médica urgente foi acionada nos primeiros minutos",
      lessons:"✓ The Environment Is Still Attacking. Stop It First: retirar a vítima do calor é sempre o primeiríssimo gesto\n✓ Confusão, agitação ou desorientação em calor intenso assinalam golpe de calor, não simples cansaço\n✓ O arrefecimento ativo (imersão em água fria ou panos frios no pescoço/axilas/virilha) nunca deve ser atrasado perante estes sinais\n✓ Uma chamada médica urgente deve ser acionada assim que reconhecido, em paralelo com o arrefecimento",
      link:"🔗 Este caso ilustra diretamente por que a confusão deve sempre fazer suspeitar do pior, nunca da explicação mais tranquilizadora, num ambiente que continua a agir contra a vítima."},
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
    {q:"Que signifie le principe 'The Environment Is Still Attacking. Stop It First' ?",opts:["L'environnement n'a aucune influence sur la victime","Tant que la victime reste exposée à la chaleur, au froid ou à l'eau, la cause continue d'agir : la retirer est toujours le premier geste","Il faut toujours appeler les secours avant d'agir","Ce principe ne concerne que la noyade"],correct:1,expl:"Contrairement à un traumatisme ponctuel, ces urgences ont une cause qui continue d'agir tant que l'exposition persiste."},
    {q:"Quels signes évoquent un coup de chaleur plutôt qu'un simple épuisement par la chaleur ?",opts:["Transpiration abondante et soif uniquement","Confusion, agitation, désorientation, convulsions ou inconscience","Une légère fatigue en fin de quart","Aucun signe ne permet de les distinguer"],correct:1,expl:"Les troubles neurologiques signent le coup de chaleur, une urgence vitale."},
    {q:"Face à un coup de chaleur confirmé, quelle est l'action prioritaire ?",opts:["Attendre de voir si la victime récupère seule","Retirer immédiatement de la chaleur et commencer un refroidissement actif sans délai","Donner uniquement de l'eau à boire","Faire marcher la victime pour la faire transpirer"],correct:1,expl:"Le refroidissement actif immédiat est la priorité absolue face à un coup de chaleur."},
    {q:"Pour l'épuisement par la chaleur, le refroidissement passif et l'hydratation suffisent-ils toujours ?",opts:["Oui, systématiquement, sans surveillance nécessaire","Ce sont les premières mesures, mais une surveillance est nécessaire avec escalade si absence d'amélioration ou dégradation","Non, il faut toujours un refroidissement actif d'emblée","Non, ces mesures ne servent à rien"],correct:1,expl:"Les premières mesures doivent être associées à une surveillance active, jamais considérées comme suffisantes sans suite."},
    {q:"Que faire face à une victime hypothermique avant tout autre geste ?",opts:["La faire courir pour se réchauffer","La sortir du vent et du froid, retirer les vêtements mouillés","Lui donner immédiatement une boisson chaude","Utiliser une source de chaleur directe et intense sur la peau"],correct:1,expl:"Sortir de l'environnement froid et retirer les vêtements mouillés sont les tout premiers gestes."},
    {q:"Pourquoi manipuler une victime hypothermique avec douceur ?",opts:["Pour ne pas la réveiller","Un cœur en hypothermie sévère est irritable, un mouvement brusque peut déclencher un trouble du rythme grave","Ce n'est pas nécessaire","Uniquement par respect pour la victime"],correct:1,expl:"Un cœur hypothermique sévère peut développer une arythmie grave suite à une manipulation brusque."},
    {q:"Quel terme utilise cette leçon plutôt que 'quasi-noyade' ?",opts:["Noyade partielle","Noyade non mortelle","Noyade sèche","Pré-noyade"],correct:1,expl:"Le terme actuel recommandé est noyade non mortelle."},
    {q:"Une victime de noyade est inconsciente et ne respire pas normalement. Que faites-vous ?",opts:["Commencer directement les compressions sans insufflation","5 insufflations initiales puis RCP standard","Attendre le DAE avant tout geste","Ne rien faire tant qu'elle n'a pas recraché l'eau"],correct:1,expl:"La spécificité de la noyade est de commencer par 5 insufflations avant la RCP standard."},
    {q:"Pourquoi sécher le thorax avant d'utiliser l'AED après une noyade ?",opts:["Ce n'est pas nécessaire","L'eau peut gêner l'efficacité des électrodes","Pour des raisons esthétiques uniquement","Pour réchauffer la victime"],correct:1,expl:"Un thorax mouillé peut réduire l'efficacité du contact des électrodes de l'AED."},
    {q:"Une noyade non mortelle avec récupération apparente nécessite-t-elle une évaluation médicale ?",opts:["Non, si la victime semble bien aller, ce n'est pas nécessaire","Oui, systématiquement, même en cas de récupération apparente","Seulement si la victime le demande","Seulement en cas de perte de connaissance prolongée"],correct:1,expl:"Toute noyade non mortelle nécessite une évaluation médicale, quelle que soit l'apparence de récupération."},
    {q:"Quels signes évoquent une réaction allergique sévère (anaphylaxie) ?",opts:["Une légère rougeur locale uniquement","Gonflement du visage ou de la gorge, difficulté à respirer, urticaire généralisée, vertiges","Une toux isolée sans autre symptôme","Aucun signe visible n'existe"],correct:1,expl:"Ces signes combinés, en particulier respiratoires, signent une réaction sévère nécessitant une action immédiate."},
    {q:"Que faire dès qu'une anaphylaxie est reconnue et qu'un auto-injecteur est disponible ?",opts:["Attendre de voir si les symptômes s'aggravent","Utiliser l'auto-injecteur sans délai, par la victime ou une personne formée, et déclencher l'alerte médicale","Donner uniquement un antihistaminique oral d'abord","Attendre l'avis médical avant toute action"],correct:1,expl:"L'auto-injecteur doit être utilisé sans délai dès la reconnaissance de la réaction sévère."},
    {q:"Après l'utilisation de l'auto-injecteur, la surveillance est-elle terminée ?",opts:["Oui, l'auto-injecteur règle définitivement le problème","Non, une deuxième vague est possible, la surveillance continue jusqu'à la prise en charge médicale","Oui, sauf si la victime se sent mal à nouveau","Non, mais uniquement pendant 5 minutes"],correct:1,expl:"Une réaction biphasique est possible ; la surveillance continue (Leçon 5) reste indispensable."},
    {q:"Que couvrira la Leçon 7 concernant l'auto-injecteur, sans répéter cette leçon ?",opts:["La technique d'injection elle-même","Le stockage, le contrôle et la gestion dans la pharmacie de bord","Les signes de l'anaphylaxie","Rien de plus, tout est déjà vu ici"],correct:1,expl:"L7 approfondit la gestion de la pharmacie de bord, sans répéter l'urgence déjà enseignée ici."},
    {q:"Ce module enseigne-t-il un protocole clinique complet pour chaque urgence médicale environnementale ?",opts:["Oui, un protocole clinique détaillé pour chacune","Non, il enseigne la reconnaissance et les premiers gestes de décision, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour le coup de chaleur","Non, il ne sert à rien sans matériel médical"],correct:1,expl:"MAP reste au niveau décisionnel, conformément à la philosophie du module."},
  ],
  en:[
    {q:"What does the principle 'The Environment Is Still Attacking. Stop It First' mean?",opts:["The environment has no influence on the casualty","As long as the casualty remains exposed to heat, cold, or water, the cause keeps acting: removing them is always the first action","You must always call for help before acting","This principle only applies to drowning"],correct:1,expl:"Unlike a one-time trauma, these emergencies have a cause that keeps acting as long as exposure continues."},
    {q:"Which signs suggest heat stroke rather than simple heat exhaustion?",opts:["Heavy sweating and thirst only","Confusion, agitation, disorientation, seizures, or unresponsiveness","Slight fatigue at the end of a watch","No sign allows telling them apart"],correct:1,expl:"Neurological disturbances signal heat stroke, a vital emergency."},
    {q:"Facing confirmed heat stroke, what is the priority action?",opts:["Wait to see if the casualty recovers on their own","Remove from the heat immediately and begin active cooling without delay","Only give water to drink","Have the casualty walk to sweat it out"],correct:1,expl:"Immediate active cooling is the absolute priority facing heat stroke."},
    {q:"For heat exhaustion, are passive cooling and hydration always enough?",opts:["Yes, systematically, with no monitoring needed","They are the first measures, but monitoring is needed with escalation if no improvement or deterioration","No, active cooling is always needed from the start","No, these measures are useless"],correct:1,expl:"First measures must be paired with active monitoring, never assumed sufficient without follow-up."},
    {q:"What do you do for a hypothermic casualty before any other action?",opts:["Have them run to warm up","Get them out of wind and cold, remove wet clothing","Give them a hot drink immediately","Use a direct, intense heat source on the skin"],correct:1,expl:"Getting out of the cold environment and removing wet clothing are the very first actions."},
    {q:"Why handle a hypothermic casualty gently?",opts:["To avoid waking them up","A severely hypothermic heart is irritable, a sudden movement can trigger a serious rhythm disturbance","It isn't necessary","Only out of respect for the casualty"],correct:1,expl:"A severely hypothermic heart can develop a serious arrhythmia following rough handling."},
    {q:"What term does this lesson use instead of 'near-drowning'?",opts:["Partial drowning","Non-fatal drowning","Dry drowning","Pre-drowning"],correct:1,expl:"The currently recommended term is non-fatal drowning."},
    {q:"A drowning casualty is unconscious and not breathing normally. What do you do?",opts:["Start compressions directly with no breaths","5 initial rescue breaths then standard CPR","Wait for the AED before any action","Do nothing until they cough up the water"],correct:1,expl:"The specificity of drowning is starting with 5 rescue breaths before standard CPR."},
    {q:"Why dry the chest before using the AED after a drowning?",opts:["It isn't necessary","Water can interfere with the effectiveness of the pads","For aesthetic reasons only","To warm the casualty"],correct:1,expl:"A wet chest can reduce the effectiveness of the AED pads' contact."},
    {q:"Does a non-fatal drowning with apparent recovery require medical evaluation?",opts:["No, if the casualty seems fine, it isn't necessary","Yes, systematically, even with apparent recovery","Only if the casualty asks for it","Only in case of prolonged loss of consciousness"],correct:1,expl:"Any non-fatal drowning requires medical evaluation, regardless of apparent recovery."},
    {q:"Which signs suggest a severe allergic reaction (anaphylaxis)?",opts:["Slight local redness only","Swelling of the face or throat, difficulty breathing, widespread hives, dizziness","An isolated cough with no other symptom","No visible sign exists"],correct:1,expl:"These combined signs, especially respiratory ones, signal a severe reaction requiring immediate action."},
    {q:"What do you do as soon as anaphylaxis is recognized and an auto-injector is available?",opts:["Wait to see if symptoms worsen","Use the auto-injector without delay, by the casualty or a trained person, and trigger the medical alert","Only give an oral antihistamine first","Wait for medical advice before any action"],correct:1,expl:"The auto-injector must be used without delay as soon as the severe reaction is recognized."},
    {q:"After using the auto-injector, is monitoring over?",opts:["Yes, the auto-injector settles the problem for good","No, a second wave is possible, monitoring continues until medical care takes over","Yes, unless the casualty feels ill again","No, but only for 5 minutes"],correct:1,expl:"A biphasic reaction is possible; continuous monitoring (Lesson 5) remains essential."},
    {q:"What will Lesson 7 cover regarding the auto-injector, without repeating this lesson?",opts:["The injection technique itself","Storage, control, and management in the medicine chest","The signs of anaphylaxis","Nothing more, everything is already covered here"],correct:1,expl:"L7 deepens medicine chest management, without repeating the emergency already taught here."},
    {q:"Does this module teach a complete clinical protocol for each environmental medical emergency?",opts:["Yes, a detailed clinical protocol for each","No, it teaches recognition and decision-level first actions, never a replacement for certified practical training","Yes, but only for heat stroke","No, it is useless without medical equipment"],correct:1,expl:"MAP stays at the decision level, consistent with the module's philosophy."},
  ],
  es:[
    {q:"¿Qué significa el principio 'The Environment Is Still Attacking. Stop It First'?",opts:["El entorno no influye en la víctima","Mientras la víctima siga expuesta al calor, al frío o al agua, la causa sigue actuando: retirarla es siempre el primer gesto","Siempre hay que pedir ayuda antes de actuar","Este principio solo se aplica al ahogamiento"],correct:1,expl:"A diferencia de un trauma puntual, estas urgencias tienen una causa que sigue actuando mientras persiste la exposición."},
    {q:"¿Qué signos sugieren un golpe de calor en lugar de un simple agotamiento por calor?",opts:["Solo sudoración abundante y sed","Confusión, agitación, desorientación, convulsiones o inconsciencia","Ligero cansancio al final de una guardia","Ningún signo permite distinguirlos"],correct:1,expl:"Los trastornos neurológicos indican golpe de calor, una urgencia vital."},
    {q:"Ante un golpe de calor confirmado, ¿cuál es la acción prioritaria?",opts:["Esperar a ver si la víctima se recupera sola","Retirar de inmediato del calor y comenzar el enfriamiento activo sin demora","Solo dar agua para beber","Hacer caminar a la víctima para que sude"],correct:1,expl:"El enfriamiento activo inmediato es la prioridad absoluta ante un golpe de calor."},
    {q:"Para el agotamiento por calor, ¿bastan siempre el enfriamiento pasivo y la hidratación?",opts:["Sí, siempre, sin necesidad de vigilancia","Son las primeras medidas, pero se necesita vigilancia con escalada si no hay mejora o hay deterioro","No, siempre hace falta enfriamiento activo desde el principio","No, estas medidas no sirven de nada"],correct:1,expl:"Las primeras medidas deben ir acompañadas de vigilancia activa, nunca considerarse suficientes sin seguimiento."},
    {q:"¿Qué hacer ante una víctima hipotérmica antes de cualquier otro gesto?",opts:["Hacerla correr para calentarse","Sacarla del viento y del frío, retirar la ropa mojada","Darle inmediatamente una bebida caliente","Usar una fuente de calor directa e intensa sobre la piel"],correct:1,expl:"Salir del entorno frío y retirar la ropa mojada son los primerísimos gestos."},
    {q:"¿Por qué manipular con suavidad a una víctima hipotérmica?",opts:["Para no despertarla","Un corazón en hipotermia grave es irritable, un movimiento brusco puede desencadenar un trastorno grave del ritmo","No es necesario","Solo por respeto a la víctima"],correct:1,expl:"Un corazón hipotérmico grave puede desarrollar una arritmia grave tras una manipulación brusca."},
    {q:"¿Qué término usa esta lección en lugar de 'casi ahogamiento'?",opts:["Ahogamiento parcial","Ahogamiento no mortal","Ahogamiento seco","Pre-ahogamiento"],correct:1,expl:"El término actualmente recomendado es ahogamiento no mortal."},
    {q:"Una víctima de ahogamiento está inconsciente y no respira con normalidad. ¿Qué haces?",opts:["Empezar directamente las compresiones sin insuflaciones","5 insuflaciones iniciales y luego RCP estándar","Esperar al DEA antes de cualquier gesto","No hacer nada hasta que expulse el agua"],correct:1,expl:"La particularidad del ahogamiento es empezar con 5 insuflaciones antes de la RCP estándar."},
    {q:"¿Por qué secar el tórax antes de usar el DEA tras un ahogamiento?",opts:["No es necesario","El agua puede afectar la eficacia de los electrodos","Solo por razones estéticas","Para calentar a la víctima"],correct:1,expl:"Un tórax mojado puede reducir la eficacia del contacto de los electrodos del DEA."},
    {q:"¿Un ahogamiento no mortal con recuperación aparente requiere evaluación médica?",opts:["No, si la víctima parece estar bien, no es necesario","Sí, sistemáticamente, incluso con recuperación aparente","Solo si la víctima lo pide","Solo en caso de pérdida de conciencia prolongada"],correct:1,expl:"Todo ahogamiento no mortal requiere evaluación médica, sea cual sea la apariencia de recuperación."},
    {q:"¿Qué signos sugieren una reacción alérgica grave (anafilaxia)?",opts:["Solo un ligero enrojecimiento local","Hinchazón de la cara o la garganta, dificultad para respirar, urticaria generalizada, mareos","Una tos aislada sin otro síntoma","No existe ningún signo visible"],correct:1,expl:"Estos signos combinados, especialmente los respiratorios, indican una reacción grave que requiere acción inmediata."},
    {q:"¿Qué hacer en cuanto se reconoce una anafilaxia y hay un autoinyector disponible?",opts:["Esperar a ver si los síntomas empeoran","Usar el autoinyector sin demora, por la víctima o una persona formada, y activar la alerta médica","Dar solo un antihistamínico oral primero","Esperar el consejo médico antes de actuar"],correct:1,expl:"El autoinyector debe usarse sin demora en cuanto se reconoce la reacción grave."},
    {q:"Tras usar el autoinyector, ¿termina la vigilancia?",opts:["Sí, el autoinyector resuelve el problema definitivamente","No, es posible una segunda oleada, la vigilancia continúa hasta la atención médica","Sí, salvo que la víctima se sienta mal de nuevo","No, pero solo durante 5 minutos"],correct:1,expl:"Es posible una reacción bifásica; la vigilancia continua (Lección 5) sigue siendo esencial."},
    {q:"¿Qué cubrirá la Lección 7 sobre el autoinyector, sin repetir esta lección?",opts:["La técnica de inyección en sí","El almacenamiento, el control y la gestión en el botiquín","Los signos de la anafilaxia","Nada más, todo ya se ve aquí"],correct:1,expl:"L7 profundiza en la gestión del botiquín, sin repetir la urgencia ya enseñada aquí."},
    {q:"¿Este módulo enseña un protocolo clínico completo para cada urgencia médica ambiental?",opts:["Sí, un protocolo clínico detallado para cada una","No, enseña reconocimiento y primeros gestos de decisión, nunca un sustituto de una formación práctica certificada","Sí, pero solo para el golpe de calor","No, no sirve de nada sin material médico"],correct:1,expl:"MAP se mantiene en el nivel decisional, conforme a la filosofía del módulo."},
  ],
  pt:[
    {q:"O que significa o princípio 'The Environment Is Still Attacking. Stop It First'?",opts:["O ambiente não tem influência na vítima","Enquanto a vítima permanecer exposta ao calor, ao frio ou à água, a causa continua a agir: retirá-la é sempre o primeiro gesto","É preciso sempre pedir ajuda antes de agir","Este princípio só se aplica ao afogamento"],correct:1,expl:"Ao contrário de um trauma pontual, estas urgências têm uma causa que continua a agir enquanto a exposição persistir."},
    {q:"Que sinais sugerem golpe de calor em vez de simples exaustão pelo calor?",opts:["Apenas transpiração abundante e sede","Confusão, agitação, desorientação, convulsões ou inconsciência","Ligeiro cansaço no final de um turno","Nenhum sinal permite distingui-los"],correct:1,expl:"As perturbações neurológicas assinalam golpe de calor, uma urgência vital."},
    {q:"Perante um golpe de calor confirmado, qual é a ação prioritária?",opts:["Esperar para ver se a vítima recupera sozinha","Retirar de imediato do calor e começar o arrefecimento ativo sem demora","Dar apenas água para beber","Fazer a vítima caminhar para transpirar"],correct:1,expl:"O arrefecimento ativo imediato é a prioridade absoluta perante um golpe de calor."},
    {q:"Para a exaustão pelo calor, o arrefecimento passivo e a hidratação bastam sempre?",opts:["Sim, sempre, sem necessidade de vigilância","São as primeiras medidas, mas é necessária vigilância com escalada se não houver melhoria ou houver deterioração","Não, é sempre necessário arrefecimento ativo desde o início","Não, estas medidas não servem de nada"],correct:1,expl:"As primeiras medidas devem ser acompanhadas de vigilância ativa, nunca consideradas suficientes sem seguimento."},
    {q:"O que fazer perante uma vítima hipotérmica antes de qualquer outro gesto?",opts:["Fazê-la correr para aquecer","Tirá-la do vento e do frio, retirar a roupa molhada","Dar-lhe imediatamente uma bebida quente","Usar uma fonte de calor direta e intensa na pele"],correct:1,expl:"Sair do ambiente frio e retirar a roupa molhada são os primeiríssimos gestos."},
    {q:"Por que manusear com suavidade uma vítima hipotérmica?",opts:["Para não a acordar","Um coração em hipotermia grave é irritável, um movimento brusco pode desencadear uma perturbação grave do ritmo","Não é necessário","Só por respeito à vítima"],correct:1,expl:"Um coração hipotérmico grave pode desenvolver uma arritmia grave após um manuseamento brusco."},
    {q:"Que termo usa esta lição em vez de 'quase afogamento'?",opts:["Afogamento parcial","Afogamento não fatal","Afogamento seco","Pré-afogamento"],correct:1,expl:"O termo atualmente recomendado é afogamento não fatal."},
    {q:"Uma vítima de afogamento está inconsciente e não respira normalmente. O que fazes?",opts:["Começar diretamente as compressões sem insuflações","5 insuflações iniciais e depois RCP padrão","Esperar pelo DAE antes de qualquer gesto","Não fazer nada até expelir a água"],correct:1,expl:"A particularidade do afogamento é começar com 5 insuflações antes da RCP padrão."},
    {q:"Por que secar o tórax antes de usar o DAE após um afogamento?",opts:["Não é necessário","A água pode afetar a eficácia dos elétrodos","Só por razões estéticas","Para aquecer a vítima"],correct:1,expl:"Um tórax molhado pode reduzir a eficácia do contacto dos elétrodos do DAE."},
    {q:"Um afogamento não fatal com recuperação aparente exige avaliação médica?",opts:["Não, se a vítima parecer bem, não é necessário","Sim, sistematicamente, mesmo com recuperação aparente","Só se a vítima o pedir","Só em caso de perda de consciência prolongada"],correct:1,expl:"Todo afogamento não fatal exige avaliação médica, seja qual for a aparência de recuperação."},
    {q:"Que sinais sugerem uma reação alérgica grave (anafilaxia)?",opts:["Apenas um ligeiro rubor local","Inchaço da face ou da garganta, dificuldade em respirar, urticária generalizada, tonturas","Uma tosse isolada sem outro sintoma","Não existe nenhum sinal visível"],correct:1,expl:"Estes sinais combinados, especialmente os respiratórios, assinalam uma reação grave que exige ação imediata."},
    {q:"O que fazer assim que uma anafilaxia é reconhecida e há um autoinjetor disponível?",opts:["Esperar para ver se os sintomas pioram","Usar o autoinjetor sem demora, pela vítima ou uma pessoa formada, e acionar o alerta médico","Dar primeiro apenas um anti-histamínico oral","Esperar pelo conselho médico antes de agir"],correct:1,expl:"O autoinjetor deve ser usado sem demora assim que a reação grave é reconhecida."},
    {q:"Após usar o autoinjetor, a vigilância termina?",opts:["Sim, o autoinjetor resolve o problema definitivamente","Não, uma segunda vaga é possível, a vigilância continua até à assistência médica","Sim, salvo se a vítima se sentir mal novamente","Não, mas só durante 5 minutos"],correct:1,expl:"Uma reação bifásica é possível; a vigilância contínua (Lição 5) continua a ser essencial."},
    {q:"O que a Lição 7 cobrirá sobre o autoinjetor, sem repetir esta lição?",opts:["A técnica de injeção em si","O armazenamento, o controlo e a gestão na farmácia de bordo","Os sinais da anafilaxia","Nada mais, tudo já foi visto aqui"],correct:1,expl:"A L7 aprofunda a gestão da farmácia de bordo, sem repetir a urgência já ensinada aqui."},
    {q:"Este módulo ensina um protocolo clínico completo para cada urgência médica ambiental?",opts:["Sim, um protocolo clínico detalhado para cada uma","Não, ensina reconhecimento e primeiros gestos de decisão, nunca um substituto de uma formação prática certificada","Sim, mas só para o golpe de calor","Não, não serve de nada sem material médico"],correct:1,expl:"A MAP mantém-se ao nível decisional, conforme a filosofia do módulo."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'The Environment Is Still Attacking. Stop It First' ?",opts:["Il faut appeler les secours d'abord","Retirer la victime de l'environnement en cause est toujours le premier geste","Ce principe ne concerne que la chaleur","L'environnement n'a pas d'influence"],correct:1,expl:"La cause continue d'agir tant que l'exposition persiste : la retirer prime sur tout autre geste."},
    {q:"Confusion et désorientation en pleine chaleur évoquent :",opts:["Une simple fatigue","Un coup de chaleur, urgence vitale","Une déshydratation légère sans gravité","Rien de particulier"],correct:1,expl:"Ces signes neurologiques signent un coup de chaleur, à traiter en urgence."},
    {q:"Une victime de noyade inconsciente ne respire pas normalement. Que faites-vous ?",opts:["Compressions directes sans insufflation","5 insufflations initiales puis RCP standard","Attendre le DAE avant tout","Rien tant qu'elle n'a pas recraché l'eau"],correct:1,expl:"La spécificité de la noyade impose 5 insufflations avant la RCP standard."},
    {q:"Anaphylaxie reconnue, auto-injecteur disponible : que faites-vous ?",opts:["Attendre de voir l'évolution","L'utiliser sans délai et déclencher l'alerte médicale","Donner un antihistaminique d'abord","Attendre l'avis médical"],correct:1,expl:"L'auto-injecteur s'utilise sans délai dès la reconnaissance de la réaction sévère."},
    {q:"Après l'auto-injecteur, la surveillance est-elle terminée ?",opts:["Oui, définitivement","Non, une deuxième vague est possible","Oui, sauf en cas de piqûre multiple","Non, mais pas plus de 2 minutes"],correct:1,expl:"Une réaction biphasique reste possible ; la surveillance continue jusqu'à la prise en charge médicale."},
  ],
  en:[
    {q:"What does 'The Environment Is Still Attacking. Stop It First' mean?",opts:["You must call for help first","Removing the casualty from the causal environment is always the first action","This principle only applies to heat","The environment has no influence"],correct:1,expl:"The cause keeps acting as long as exposure persists: removing it takes priority over any other action."},
    {q:"Confusion and disorientation in intense heat suggest:",opts:["Simple fatigue","Heat stroke, a vital emergency","Mild dehydration, nothing serious","Nothing in particular"],correct:1,expl:"These neurological signs signal heat stroke, to be treated as an emergency."},
    {q:"An unconscious drowning casualty is not breathing normally. What do you do?",opts:["Direct compressions with no breaths","5 initial rescue breaths then standard CPR","Wait for the AED before anything","Nothing until they cough up the water"],correct:1,expl:"The specificity of drowning requires 5 rescue breaths before standard CPR."},
    {q:"Recognized anaphylaxis, auto-injector available: what do you do?",opts:["Wait to see how it evolves","Use it without delay and trigger the medical alert","Give an antihistamine first","Wait for medical advice"],correct:1,expl:"The auto-injector is used without delay as soon as the severe reaction is recognized."},
    {q:"After the auto-injector, is monitoring over?",opts:["Yes, for good","No, a second wave is possible","Yes, unless there was multiple stings","No, but no more than 2 minutes"],correct:1,expl:"A biphasic reaction remains possible; monitoring continues until medical care takes over."},
  ],
  es:[
    {q:"¿Qué significa 'The Environment Is Still Attacking. Stop It First'?",opts:["Hay que pedir ayuda primero","Retirar a la víctima del entorno causante es siempre el primer gesto","Este principio solo se aplica al calor","El entorno no tiene influencia"],correct:1,expl:"La causa sigue actuando mientras persiste la exposición: retirarla prima sobre cualquier otro gesto."},
    {q:"Confusión y desorientación con calor intenso sugieren:",opts:["Simple cansancio","Golpe de calor, urgencia vital","Deshidratación leve, sin gravedad","Nada en particular"],correct:1,expl:"Estos signos neurológicos indican golpe de calor, a tratar con urgencia."},
    {q:"Una víctima de ahogamiento inconsciente no respira con normalidad. ¿Qué haces?",opts:["Compresiones directas sin insuflaciones","5 insuflaciones iniciales y luego RCP estándar","Esperar al DEA antes de nada","Nada hasta que expulse el agua"],correct:1,expl:"La particularidad del ahogamiento exige 5 insuflaciones antes de la RCP estándar."},
    {q:"Anafilaxia reconocida, autoinyector disponible: ¿qué haces?",opts:["Esperar a ver la evolución","Usarlo sin demora y activar la alerta médica","Dar primero un antihistamínico","Esperar el consejo médico"],correct:1,expl:"El autoinyector se usa sin demora en cuanto se reconoce la reacción grave."},
    {q:"Tras el autoinyector, ¿termina la vigilancia?",opts:["Sí, definitivamente","No, es posible una segunda oleada","Sí, salvo picadura múltiple","No, pero no más de 2 minutos"],correct:1,expl:"Una reacción bifásica sigue siendo posible; la vigilancia continúa hasta la atención médica."},
  ],
  pt:[
    {q:"O que significa 'The Environment Is Still Attacking. Stop It First'?",opts:["É preciso pedir ajuda primeiro","Retirar a vítima do ambiente causador é sempre o primeiro gesto","Este princípio só se aplica ao calor","O ambiente não tem influência"],correct:1,expl:"A causa continua a agir enquanto a exposição persiste: retirá-la tem prioridade sobre qualquer outro gesto."},
    {q:"Confusão e desorientação em calor intenso sugerem:",opts:["Simples cansaço","Golpe de calor, urgência vital","Desidratação ligeira, sem gravidade","Nada em particular"],correct:1,expl:"Estes sinais neurológicos assinalam golpe de calor, a tratar com urgência."},
    {q:"Uma vítima de afogamento inconsciente não respira normalmente. O que fazes?",opts:["Compressões diretas sem insuflações","5 insuflações iniciais e depois RCP padrão","Esperar pelo DAE antes de tudo","Nada até expelir a água"],correct:1,expl:"A particularidade do afogamento exige 5 insuflações antes da RCP padrão."},
    {q:"Anafilaxia reconhecida, autoinjetor disponível: o que fazes?",opts:["Esperar para ver a evolução","Usá-lo sem demora e acionar o alerta médico","Dar primeiro um anti-histamínico","Esperar pelo conselho médico"],correct:1,expl:"O autoinjetor usa-se sem demora assim que a reação grave é reconhecida."},
    {q:"Após o autoinjetor, a vigilância termina?",opts:["Sim, definitivamente","Não, uma segunda vaga é possível","Sim, exceto em caso de picada múltipla","Não, mas no máximo 2 minutos"],correct:1,expl:"Uma reação bifásica continua a ser possível; a vigilância continua até à assistência médica."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Face a une victime confuse par forte chaleur, ta premiere pensee serait-elle 'fatigue' ou 'urgence vitale' ?",
    en:"Facing a confused casualty in intense heat, would your first thought be 'fatigue' or 'vital emergency'?",
    es:"Ante una victima confusa por calor intenso, ¿tu primer pensamiento seria 'cansancio' o 'urgencia vital'?",
    pt:"Perante uma vitima confusa por calor intenso, o teu primeiro pensamento seria 'cansaco' ou 'urgencia vital'?",
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
      badge:"🩺 Safety · STCW First Aid · Leçon 6/8 · ⭐ Premium",
      title:"Medical Emergencies at Sea",
      intro:"Chaleur, froid, eau, allergène : quatre urgences différentes, un seul point commun. L'environnement continue d'agir tant que la victime y reste exposée.",
      p0:"THE ENVIRONMENT IS STILL ATTACKING. STOP IT FIRST.",s0t:"Le principe qui structure toute la leçon",
      s0:"Contrairement à un traumatisme ponctuel, ces urgences ont une cause qui continue d'agir tant que l'exposition persiste. Retirer la victime de la chaleur, du froid ou de l'eau est toujours le tout premier geste, avant tout autre soin.\n\nCOMMENT LE RECONNAÎTRE ? Signes spécifiques à chaque urgence : confusion en pleine chaleur, tremblements et confusion au froid, absence de respiration après une noyade, gonflement et difficulté respiratoire en anaphylaxie.\nQUE FAIRE IMMÉDIATEMENT ? Retirer de l'environnement en cause en premier, puis agir selon l'urgence spécifique.\nQUELLE ERREUR L'AGGRAVE ? Traiter sans avoir retiré la victime de l'exposition continue.\nQUAND DEMANDER DE L'AIDE MÉDICALE ? Immédiatement pour chacune de ces quatre urgences, sans exception.",
      p1:"COUP DE CHALEUR VS ÉPUISEMENT",s1t:"Deux gravités, deux réponses",
      s1:"L'épuisement se traite par des mesures simples sous surveillance. Le coup de chaleur, avec confusion ou inconscience, est une urgence vitale imposant un refroidissement actif immédiat.",
      p2:"HYPOTHERMIE & EXPOSITION AU FROID",s2t:"Sortir du froid avant tout",
      s2:"Abriter, sécher, isoler du sol froid, manipuler avec douceur : un cœur en hypothermie sévère est irritable et réagit mal à un mouvement brusque.",
      p3:"NOYADE NON MORTELLE",s3t:"Une spécificité : les 5 insufflations initiales",
      s3:"Flottaison, sortie de l'eau, puis si inconsciente et ne respire pas normalement : 5 insufflations initiales avant la RCP standard. Sécher le thorax avant tout AED.",
      p4:"RÉACTION ALLERGIQUE SÉVÈRE",s4t:"Reconnaître et agir sans délai",
      s4:"Gonflement, difficulté respiratoire, urticaire généralisée : appel médical urgent, retrait du déclencheur si possible, auto-injecteur utilisé sans délai, puis surveillance continue.",
      p5:"🎯 EXERCICE OPÉRATIONNEL",p6:"⚠️ CAS D'ÉTUDE",p7:"📝 BANQUE DE 15 QUESTIONS",p8:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 6",
      sumP:["The Environment Is Still Attacking. Stop It First : retirer de l'exposition avant tout autre geste","Coup de chaleur : confusion/inconscience = refroidissement actif immédiat, pas seulement passif","Hypothermie : manipuler avec douceur, un cœur sévèrement hypothermique est irritable","Noyade non mortelle : 5 insufflations initiales puis RCP standard, sécher avant l'AED","Anaphylaxie : auto-injecteur sans délai par la victime ou une personne formée, puis surveillance continue"],
      learnedP:["Distinguer coup de chaleur et épuisement par la chaleur","Les gestes prioritaires face à l'hypothermie","La spécificité de la RCP en cas de noyade non mortelle","La reconnaissance et l'action immédiate face à l'anaphylaxie","Le principe The Environment Is Still Attacking"],
      safetyMsg:"When the environment itself is the threat, removing the casualty from it is not one step among others. It is always the first.",
    },
    en:{
      badge:"🩺 Safety · STCW First Aid · Lesson 6/8 · ⭐ Premium",
      title:"Medical Emergencies at Sea",
      intro:"Heat, cold, water, allergen: four different emergencies, one common thread. The environment keeps acting as long as the casualty remains exposed to it.",
      p0:"THE ENVIRONMENT IS STILL ATTACKING. STOP IT FIRST.",s0t:"The principle that structures the whole lesson",
      s0:"Unlike a one-time trauma, these emergencies have a cause that keeps acting as long as exposure continues. Removing the casualty from heat, cold, or water is always the very first action, before any other care.\n\nHOW DO I RECOGNIZE IT? Signs specific to each emergency: confusion in intense heat, shivering and confusion in cold, no breathing after drowning, swelling and breathing difficulty in anaphylaxis.\nWHAT DO I DO IMMEDIATELY? Remove from the causal environment first, then act according to the specific emergency.\nWHAT MISTAKE MAKES IT WORSE? Treating without having removed the casualty from ongoing exposure.\nWHEN MUST I ASK FOR MEDICAL ASSISTANCE? Immediately for each of these four emergencies, without exception.",
      p1:"HEAT STROKE VS HEAT EXHAUSTION",s1t:"Two severities, two responses",
      s1:"Exhaustion is treated with simple measures under monitoring. Heat stroke, with confusion or unresponsiveness, is a vital emergency requiring immediate active cooling.",
      p2:"HYPOTHERMIA & COLD EXPOSURE",s2t:"Get out of the cold first",
      s2:"Shelter, dry, insulate from cold ground, handle gently: a severely hypothermic heart is irritable and reacts poorly to sudden movement.",
      p3:"NON-FATAL DROWNING",s3t:"One specificity: the 5 initial rescue breaths",
      s3:"Flotation, removal from water, then if unconscious and not breathing normally: 5 initial rescue breaths before standard CPR. Dry the chest before any AED.",
      p4:"SEVERE ALLERGIC REACTION",s4t:"Recognize and act without delay",
      s4:"Swelling, breathing difficulty, widespread hives: urgent medical call, remove the trigger if possible, auto-injector used without delay, then continuous monitoring.",
      p5:"🎯 OPERATIONAL EXERCISE",p6:"⚠️ CASE STUDY",p7:"📝 15-QUESTION BANK",p8:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 6",
      sumP:["The Environment Is Still Attacking. Stop It First: remove from exposure before any other action","Heat stroke: confusion/unresponsiveness = immediate active cooling, not just passive","Hypothermia: handle gently, a severely hypothermic heart is irritable","Non-fatal drowning: 5 initial rescue breaths then standard CPR, dry before the AED","Anaphylaxis: auto-injector without delay by the casualty or a trained person, then continuous monitoring"],
      learnedP:["Telling apart heat stroke and heat exhaustion","Priority actions facing hypothermia","The specificity of CPR after non-fatal drowning","Recognition and immediate action facing anaphylaxis","The Environment Is Still Attacking principle"],
      safetyMsg:"When the environment itself is the threat, removing the casualty from it is not one step among others. It is always the first.",
    },
    es:{
      badge:"🩺 Safety · STCW First Aid · Lección 6/8 · ⭐ Premium",
      title:"Medical Emergencies at Sea",
      intro:"Calor, frío, agua, alérgeno: cuatro urgencias distintas, un solo punto en común. El entorno sigue actuando mientras la víctima permanezca expuesta a él.",
      p0:"THE ENVIRONMENT IS STILL ATTACKING. STOP IT FIRST.",s0t:"El principio que estructura toda la lección",
      s0:"A diferencia de un trauma puntual, estas urgencias tienen una causa que sigue actuando mientras persiste la exposición. Retirar a la víctima del calor, el frío o el agua es siempre el primerísimo gesto, antes de cualquier otro cuidado.\n\n¿CÓMO RECONOCERLO? Signos específicos de cada urgencia: confusión con calor intenso, temblores y confusión con frío, ausencia de respiración tras un ahogamiento, hinchazón y dificultad respiratoria en anafilaxia.\n¿QUÉ HACER DE INMEDIATO? Retirar del entorno causante primero, luego actuar según la urgencia específica.\n¿QUÉ ERROR LO AGRAVA? Tratar sin haber retirado a la víctima de la exposición continua.\n¿CUÁNDO PEDIR AYUDA MÉDICA? De inmediato para cada una de estas cuatro urgencias, sin excepción.",
      p1:"GOLPE DE CALOR VS AGOTAMIENTO",s1t:"Dos gravedades, dos respuestas",
      s1:"El agotamiento se trata con medidas simples bajo vigilancia. El golpe de calor, con confusión o inconsciencia, es una urgencia vital que exige enfriamiento activo inmediato.",
      p2:"HIPOTERMIA Y EXPOSICIÓN AL FRÍO",s2t:"Salir del frío antes que nada",
      s2:"Resguardar, secar, aislar del suelo frío, manipular con suavidad: un corazón en hipotermia grave es irritable y reacciona mal a un movimiento brusco.",
      p3:"AHOGAMIENTO NO MORTAL",s3t:"Una particularidad: las 5 insuflaciones iniciales",
      s3:"Flotación, salida del agua, y si está inconsciente y no respira con normalidad: 5 insuflaciones iniciales antes de la RCP estándar. Secar el tórax antes de cualquier DEA.",
      p4:"REACCIÓN ALÉRGICA GRAVE",s4t:"Reconocer y actuar sin demora",
      s4:"Hinchazón, dificultad respiratoria, urticaria generalizada: llamada médica urgente, retirar el desencadenante si es posible, autoinyector usado sin demora, luego vigilancia continua.",
      p5:"🎯 EJERCICIO OPERATIVO",p6:"⚠️ CASO DE ESTUDIO",p7:"📝 BANCO DE 15 PREGUNTAS",p8:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 6",
      sumP:["The Environment Is Still Attacking. Stop It First: retirar de la exposición antes de cualquier otro gesto","Golpe de calor: confusión/inconsciencia = enfriamiento activo inmediato, no solo pasivo","Hipotermia: manipular con suavidad, un corazón gravemente hipotérmico es irritable","Ahogamiento no mortal: 5 insuflaciones iniciales y luego RCP estándar, secar antes del DEA","Anafilaxia: autoinyector sin demora por la víctima o una persona formada, luego vigilancia continua"],
      learnedP:["Distinguir golpe de calor y agotamiento por calor","Los gestos prioritarios ante la hipotermia","La particularidad de la RCP en caso de ahogamiento no mortal","El reconocimiento y la acción inmediata ante la anafilaxia","El principio The Environment Is Still Attacking"],
      safetyMsg:"When the environment itself is the threat, removing the casualty from it is not one step among others. It is always the first.",
    },
    pt:{
      badge:"🩺 Safety · STCW First Aid · Lição 6/8 · ⭐ Premium",
      title:"Medical Emergencies at Sea",
      intro:"Calor, frio, água, alergénio: quatro urgências diferentes, um único ponto em comum. O ambiente continua a agir enquanto a vítima permanecer exposta a ele.",
      p0:"THE ENVIRONMENT IS STILL ATTACKING. STOP IT FIRST.",s0t:"O princípio que estrutura toda a lição",
      s0:"Ao contrário de um trauma pontual, estas urgências têm uma causa que continua a agir enquanto a exposição persistir. Retirar a vítima do calor, do frio ou da água é sempre o primeiríssimo gesto, antes de qualquer outro cuidado.\n\nCOMO RECONHECER? Sinais específicos de cada urgência: confusão em calor intenso, tremores e confusão com frio, ausência de respiração após afogamento, inchaço e dificuldade respiratória em anafilaxia.\nO QUE FAZER IMEDIATAMENTE? Retirar do ambiente causador primeiro, depois agir segundo a urgência específica.\nQUE ERRO O AGRAVA? Tratar sem ter retirado a vítima da exposição contínua.\nQUANDO PEDIR AJUDA MÉDICA? De imediato para cada uma destas quatro urgências, sem exceção.",
      p1:"GOLPE DE CALOR VS EXAUSTÃO",s1t:"Duas gravidades, duas respostas",
      s1:"A exaustão trata-se com medidas simples sob vigilância. O golpe de calor, com confusão ou inconsciência, é uma urgência vital que exige arrefecimento ativo imediato.",
      p2:"HIPOTERMIA E EXPOSIÇÃO AO FRIO",s2t:"Sair do frio antes de tudo",
      s2:"Abrigar, secar, isolar do chão frio, manusear com suavidade: um coração em hipotermia grave é irritável e reage mal a um movimento brusco.",
      p3:"AFOGAMENTO NÃO FATAL",s3t:"Uma particularidade: as 5 insuflações iniciais",
      s3:"Flutuação, saída da água, e se inconsciente e não respirar normalmente: 5 insuflações iniciais antes da RCP padrão. Secar o tórax antes de qualquer DAE.",
      p4:"REAÇÃO ALÉRGICA GRAVE",s4t:"Reconhecer e agir sem demora",
      s4:"Inchaço, dificuldade respiratória, urticária generalizada: chamada médica urgente, remover o gatilho se possível, autoinjetor usado sem demora, depois vigilância contínua.",
      p5:"🎯 EXERCÍCIO OPERACIONAL",p6:"⚠️ CASO DE ESTUDO",p7:"📝 BANCO DE 15 PERGUNTAS",p8:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 6",
      sumP:["The Environment Is Still Attacking. Stop It First: retirar da exposição antes de qualquer outro gesto","Golpe de calor: confusão/inconsciência = arrefecimento ativo imediato, não apenas passivo","Hipotermia: manusear com suavidade, um coração gravemente hipotérmico é irritável","Afogamento não fatal: 5 insuflações iniciais e depois RCP padrão, secar antes do DAE","Anafilaxia: autoinjetor sem demora pela vítima ou uma pessoa formada, depois vigilância contínua"],
      learnedP:["Distinguir golpe de calor e exaustão pelo calor","Os gestos prioritários perante a hipotermia","A particularidade da RCP em caso de afogamento não fatal","O reconhecimento e a ação imediata perante a anafilaxia","O princípio The Environment Is Still Attacking"],
      safetyMsg:"When the environment itself is the threat, removing the casualty from it is not one step among others. It is always the first.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS3_L6({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 6/8":lang==="en"?"Lesson 6/8":lang==="es"?"Lección 6/8":"Lição 6/8"}</div>
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

            <SL icon="🌍" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌍</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🌡️" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌡️ {lang==="fr"?"CHALEUR - INTERACTIF":lang==="en"?"HEAT - INTERACTIVE":lang==="es"?"CALOR - INTERACTIVO":"CALOR - INTERATIVO"}</div><HeatIllnessSVG lang={lang}/></Card>

            <SL icon="❄️" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>❄️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>❄️ {lang==="fr"?"HYPOTHERMIE - INTERACTIF":lang==="en"?"HYPOTHERMIA - INTERACTIVE":lang==="es"?"HIPOTERMIA - INTERACTIVO":"HIPOTERMIA - INTERATIVO"}</div><HypothermiaSVG lang={lang}/></Card>

            <SL icon="🌊" text={lc.p3} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌊</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌊 {lang==="fr"?"NOYADE NON MORTELLE - INTERACTIF":lang==="en"?"NON-FATAL DROWNING - INTERACTIVE":lang==="es"?"AHOGAMIENTO NO MORTAL - INTERACTIVO":"AFOGAMENTO NÃO FATAL - INTERATIVO"}</div><DrowningSVG lang={lang}/></Card>

            <SL icon="🤧" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🤧</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🤧 {lang==="fr"?"ANAPHYLAXIE - INTERACTIF":lang==="en"?"ANAPHYLAXIS - INTERACTIVE":lang==="es"?"ANAFILAXIA - INTERACTIVO":"ANAFILAXIA - INTERATIVO"}</div><AnaphylaxisSVG lang={lang}/></Card>

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
                {lang==="fr"?"Quiz Final - Urgences Médicales en Mer":lang==="en"?"Final Quiz - Medical Emergencies at Sea":lang==="es"?"Quiz Final - Urgencias Médicas en el Mar":"Quiz Final - Emergências Médicas no Mar"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 6/8":"questions · Lesson 6/8"}</div>
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
              {lang==="fr"?"LEÇON 7 - PHARMACIE DE BORD →":lang==="en"?"LESSON 7 - SHIP'S MEDICINE CHEST →":lang==="es"?"LECCIÓN 7 - BOTIQUÍN DEL BUQUE →":"LIÇÃO 7 - FARMÁCIA DE BORDO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
