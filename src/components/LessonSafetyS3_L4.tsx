import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - TYPES OF BURNS
function BurnTypesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔴", color:C.gold2, label:{fr:"1er degré",en:"1st degree",es:"1er grado",pt:"1º grau"}, desc:{fr:"Peau rouge, douloureuse, sans cloque. Superficielle. Refroidir 20 minutes suffit généralement.",en:"Red, painful skin, no blister. Superficial. Cooling for 20 minutes is generally enough.",es:"Piel roja, dolorosa, sin ampolla. Superficial. Enfriar 20 minutos suele bastar.",pt:"Pele vermelha, dolorosa, sem bolha. Superficial. Arrefecer 20 minutos geralmente basta."} },
    { id:2, icon:"🟠", color:C.orange, label:{fr:"2e degré",en:"2nd degree",es:"2º grado",pt:"2º grau"}, desc:{fr:"Cloques, peau très douloureuse et humide. Ne jamais percer les cloques : elles protègent contre l'infection.",en:"Blisters, very painful and moist skin. Never pop the blisters: they protect against infection.",es:"Ampollas, piel muy dolorosa y húmeda. Nunca perforar las ampollas: protegen contra la infección.",pt:"Bolhas, pele muito dolorosa e húmida. Nunca perfurar as bolhas: protegem contra a infeção."} },
    { id:3, icon:"⚫", color:C.red, label:{fr:"3e degré",en:"3rd degree",es:"3er grado",pt:"3º grau"}, desc:{fr:"Peau carbonisée, blanchâtre ou cireuse, souvent indolore car les nerfs sont détruits. La plus grave, même sans douleur apparente. Aide médicale immédiate.",en:"Charred, whitish or waxy skin, often painless because the nerves are destroyed. The most severe, even with no apparent pain. Immediate medical help required.",es:"Piel carbonizada, blanquecina o cérea, a menudo indolora porque los nervios están destruidos. La más grave, incluso sin dolor aparente. Ayuda médica inmediata.",pt:"Pele carbonizada, esbranquiçada ou cérea, muitas vezes indolor porque os nervos estão destruídos. A mais grave, mesmo sem dor aparente. Ajuda médica imediata."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.muted,textAlign:"center"}}>{lang==="fr"?"Origine thermique, chimique ou électrique : l'origine change les précautions, pas ce principe.":lang==="en"?"Thermal, chemical, or electrical origin: the origin changes the precautions, not this principle.":lang==="es"?"Origen térmico, químico o eléctrico: el origen cambia las precauciones, no este principio.":"Origem térmica, química ou elétrica: a origem muda as precauções, não este princípio."}</div>
    </div>
  );
}

// SVG 2 - COOL & COVER
function CoolAndCoverSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"💧", label:{fr:"Eau courante fraîche, 20 minutes",en:"Cool running water, 20 minutes",es:"Agua corriente fresca, 20 minutos",pt:"Água corrente fresca, 20 minutos"}, desc:{fr:"Jamais glacée, jamais de glace directe. Jusqu'à 3h après la brûlure, le plus tôt est le mieux.",en:"Never ice-cold, never direct ice. Up to 3 hours after the burn, the sooner the better.",es:"Nunca helada, nunca hielo directo. Hasta 3 horas después de la quemadura, cuanto antes mejor.",pt:"Nunca gelada, nunca gelo direto. Até 3 horas após a queimadura, quanto mais cedo melhor."} },
    { id:2, icon:"💍", label:{fr:"Retirer bagues et vêtements non collés",en:"Remove rings and non-stuck clothing",es:"Retirar anillos y ropa no pegada",pt:"Retirar anéis e roupa não colada"}, desc:{fr:"Avant que le gonflement ne commence. Ne jamais arracher un vêtement collé à la peau.",en:"Before swelling begins. Never pull off clothing stuck to the skin.",es:"Antes de que empiece la hinchazón. Nunca arrancar ropa pegada a la piel.",pt:"Antes de o inchaço começar. Nunca arrancar roupa colada à pele."} },
    { id:3, icon:"🚫", label:{fr:"Jamais de pommade, glace ou percer",en:"Never ointment, ice, or popping",es:"Nunca pomada, hielo o perforar",pt:"Nunca pomada, gelo ou perfurar"}, desc:{fr:"Aucune crème, beurre ou pommade. Aucune glace directe. Ne jamais percer une cloque.",en:"No cream, butter, or ointment. No direct ice. Never pop a blister.",es:"Ninguna crema, mantequilla o pomada. Ningún hielo directo. Nunca perforar una ampolla.",pt:"Nenhum creme, manteiga ou pomada. Nenhum gelo direto. Nunca perfurar uma bolha."} },
    { id:4, icon:"🩹", label:{fr:"Couvrir sans serrer",en:"Cover loosely",es:"Cubrir sin apretar",pt:"Cobrir sem apertar"}, desc:{fr:"Film alimentaire ou pansement propre non pelucheux, posé sans l'enrouler serré autour d'un membre.",en:"Cling film or a clean, non-fluffy dressing, laid on without wrapping tightly around a limb.",es:"Film alimentario o un vendaje limpio no peludo, colocado sin envolverlo apretado alrededor de un miembro.",pt:"Película aderente ou um penso limpo não felpudo, colocado sem o enrolar apertado à volta de um membro."} },
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

// SVG 3 - SUSPECTED FRACTURE
function FractureSignsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"👁️", label:{fr:"Déformation visible",en:"Visible deformity",es:"Deformidad visible",pt:"Deformidade visível"}, desc:{fr:"Un angle ou une forme anormale par rapport à l'autre membre. Un signe fort, mais pas obligatoire.",en:"An abnormal angle or shape compared to the other limb. A strong sign, but not required.",es:"Un ángulo o forma anormal en comparación con el otro miembro. Un signo fuerte, pero no obligatorio.",pt:"Um ângulo ou forma anormal em comparação com o outro membro. Um sinal forte, mas não obrigatório."} },
    { id:2, icon:"😖", label:{fr:"Douleur vive et localisée",en:"Sharp, localized pain",es:"Dolor agudo y localizado",pt:"Dor aguda e localizada"}, desc:{fr:"Souvent augmentée par le moindre mouvement ou la pression directe sur l'os.",en:"Often worsened by the slightest movement or direct pressure on the bone.",es:"A menudo aumentada por el más mínimo movimiento o presión directa sobre el hueso.",pt:"Muitas vezes agravada pelo mínimo movimento ou pressão direta sobre o osso."} },
    { id:3, icon:"🚫", label:{fr:"Incapacité fonctionnelle",en:"Functional inability",es:"Incapacidad funcional",pt:"Incapacidade funcional"}, desc:{fr:"La victime ne peut plus utiliser normalement le membre, même sans déformation visible.",en:"The casualty can no longer use the limb normally, even without visible deformity.",es:"La víctima ya no puede usar el miembro con normalidad, incluso sin deformidad visible.",pt:"A vítima já não consegue usar o membro normalmente, mesmo sem deformidade visível."} },
    { id:4, icon:"🎈", label:{fr:"Gonflement rapide",en:"Rapid swelling",es:"Hinchazón rápida",pt:"Inchaço rápido"}, desc:{fr:"Apparaît souvent en quelques minutes autour de la zone touchée.",en:"Often appears within minutes around the affected area.",es:"A menudo aparece en minutos alrededor de la zona afectada.",pt:"Muitas vezes aparece em minutos à volta da zona afetada."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Règle d'or : ne jamais réaligner, immobiliser dans la position trouvée.":lang==="en"?"Golden rule: never realign, immobilize in the position found.":lang==="es"?"Regla de oro: nunca realinear, inmovilizar en la posición encontrada.":"Regra de ouro: nunca realinhar, imobilizar na posição encontrada."}</div>
    </div>
  );
}

// SVG 4 - IMMOBILIZE THEN RECHECK
function ImmobilizeRecheckSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"1", label:{fr:"Vérifier CSM avant l'attelle",en:"Check CSM before splinting",es:"Comprobar CSM antes de entablillar",pt:"Verificar CSM antes de entalar"}, desc:{fr:"Circulation, Sensation, Mouvement : couleur de la peau, capacité à sentir un contact, capacité à bouger si approprié.",en:"Circulation, Sensation, Movement: skin color, ability to feel a touch, ability to move if appropriate.",es:"Circulación, Sensibilidad, Movimiento: color de la piel, capacidad de sentir un contacto, capacidad de mover si procede.",pt:"Circulação, Sensibilidade, Movimento: cor da pele, capacidade de sentir um toque, capacidade de mover se apropriado."} },
    { id:2, icon:"2", label:{fr:"Immobiliser au-dessus et en dessous",en:"Immobilize above and below",es:"Inmovilizar por encima y por debajo",pt:"Imobilizar acima e abaixo"}, desc:{fr:"L'attelle doit couvrir l'articulation au-dessus ET en dessous de la fracture suspectée, sans serrer excessivement.",en:"The splint must cover the joint above AND below the suspected fracture, without over-tightening.",es:"La férula debe cubrir la articulación por encima Y por debajo de la fractura sospechada, sin apretar en exceso.",pt:"A tala deve cobrir a articulação acima E abaixo da fratura suspeita, sem apertar em excesso."} },
    { id:3, icon:"3", label:{fr:"Revérifier CSM après l'attelle",en:"Recheck CSM after splinting",es:"Volver a comprobar CSM tras entablillar",pt:"Reverificar CSM após entalar"}, desc:{fr:"L'immobilisation n'est jamais terminée sans ce contrôle : une attelle trop serrée peut couper la circulation en quelques minutes.",en:"Immobilization is never complete without this check: a splint too tight can cut off circulation within minutes.",es:"La inmovilización nunca está completa sin esta comprobación: una férula demasiado apretada puede cortar la circulación en minutos.",pt:"A imobilização nunca está completa sem esta verificação: uma tala demasiado apertada pode cortar a circulação em minutos."} },
    { id:4, icon:"4", label:{fr:"Surveiller régulièrement",en:"Monitor regularly",es:"Vigilar regularmente",pt:"Monitorizar regularmente"}, desc:{fr:"Recontrôler la circulation à intervalles réguliers jusqu'à la prise en charge médicale : ça peut changer après la pose.",en:"Recheck circulation at regular intervals until medical care takes over: it can change after application.",es:"Volver a comprobar la circulación a intervalos regulares hasta la atención médica: puede cambiar tras la colocación.",pt:"Reverificar a circulação a intervalos regulares até à assistência médica: pode mudar após a colocação."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(77,166,255,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.blue2:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:sel===s.id?C.blue2:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:C.white,flexShrink:0}}>{s.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(77,166,255,0.1)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Immobiliser n'est jamais la fin du travail.":lang==="en"?"Immobilizing is never the end of the job.":lang==="es"?"Inmovilizar nunca es el final del trabajo.":"Imobilizar nunca é o fim do trabalho."}</div>
    </div>
  );
}

// EXERCISE - BURNS & FRACTURES DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"c",q3:"a",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Une victime a une brûlure avec des cloques. Que faites-vous ?\na) Percer les cloques pour évacuer le liquide\nb) Refroidir 20 minutes à l'eau courante et ne jamais percer les cloques\nc) Appliquer une pommade grasse pour apaiser"},
      {id:"q2",q:"Un vêtement est collé à une brûlure. Que faites-vous ?\na) Le retirer rapidement d'un coup sec\nb) Le tremper puis tirer doucement jusqu'à ce qu'il se détache\nc) Ne jamais l'arracher, couper autour et laisser en place"},
      {id:"q3",q:"Un bras présente une déformation visible après une chute. Que faites-vous ?\na) L'immobiliser dans la position trouvée, sans tenter de le redresser\nb) Le redresser doucement pour qu'il ait l'air normal\nc) Demander à la victime de le bouger pour tester la douleur"},
      {id:"q4",q:"Vous venez de poser une attelle. Que faites-vous immédiatement après ?\na) Rien, l'attelle suffit\nb) Vérifier la circulation, la sensation et le mouvement (CSM)\nc) Serrer davantage pour plus de sécurité"},
    ],
    en:[
      {id:"q1",q:"A casualty has a burn with blisters. What do you do?\na) Pop the blisters to drain the fluid\nb) Cool for 20 minutes under running water and never pop the blisters\nc) Apply a greasy ointment to soothe it"},
      {id:"q2",q:"Clothing is stuck to a burn. What do you do?\na) Pull it off quickly in one motion\nb) Soak it then gently pull until it comes off\nc) Never pull it off, cut around it and leave it in place"},
      {id:"q3",q:"An arm shows visible deformity after a fall. What do you do?\na) Immobilize it in the position found, without trying to straighten it\nb) Gently straighten it so it looks normal\nc) Ask the casualty to move it to test the pain"},
      {id:"q4",q:"You just applied a splint. What do you do immediately after?\na) Nothing, the splint is enough\nb) Check circulation, sensation, and movement (CSM)\nc) Tighten it further for extra safety"},
    ],
    es:[
      {id:"q1",q:"Una víctima tiene una quemadura con ampollas. ¿Qué haces?\na) Perforar las ampollas para drenar el líquido\nb) Enfriar 20 minutos bajo agua corriente y nunca perforar las ampollas\nc) Aplicar una pomada grasa para calmar"},
      {id:"q2",q:"Hay ropa pegada a una quemadura. ¿Qué haces?\na) Retirarla rápidamente de un tirón\nb) Remojarla y luego tirar suavemente hasta que se desprenda\nc) Nunca arrancarla, cortar alrededor y dejarla en su sitio"},
      {id:"q3",q:"Un brazo muestra deformidad visible tras una caída. ¿Qué haces?\na) Inmovilizarlo en la posición encontrada, sin intentar enderezarlo\nb) Enderezarlo suavemente para que parezca normal\nc) Pedir a la víctima que lo mueva para probar el dolor"},
      {id:"q4",q:"Acabas de colocar una férula. ¿Qué haces inmediatamente después?\na) Nada, la férula basta\nb) Comprobar circulación, sensibilidad y movimiento (CSM)\nc) Apretarla más para mayor seguridad"},
    ],
    pt:[
      {id:"q1",q:"Uma vítima tem uma queimadura com bolhas. O que fazes?\na) Perfurar as bolhas para drenar o líquido\nb) Arrefecer 20 minutos em água corrente e nunca perfurar as bolhas\nc) Aplicar uma pomada gordurosa para acalmar"},
      {id:"q2",q:"Há roupa colada a uma queimadura. O que fazes?\na) Retirá-la rapidamente de um puxão\nb) Molhá-la e depois puxar suavemente até se soltar\nc) Nunca a arrancar, cortar à volta e deixá-la no lugar"},
      {id:"q3",q:"Um braço apresenta deformidade visível após uma queda. O que fazes?\na) Imobilizá-lo na posição encontrada, sem tentar endireitá-lo\nb) Endireitá-lo suavemente para parecer normal\nc) Pedir à vítima para o mover para testar a dor"},
      {id:"q4",q:"Acabaste de colocar uma tala. O que fazes imediatamente a seguir?\na) Nada, a tala basta\nb) Verificar circulação, sensibilidade e movimento (CSM)\nc) Apertar mais para maior segurança"},
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

// ACCIDENT CASE - COMPOSITE CASE (THE ENGINE ROOM EXPLOSION)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - L'Explosion en Salle des Machines",teaser:"Cas composite immersif - fumée, deux victimes, local pas encore sécurisé",
      what:"Une explosion se produit en salle des machines. De la fumée envahit encore le local, qui n'est pas totalement sécurisé. Une première victime présente une brûlure importante au bras, une seconde une déformation visible de la jambe après avoir été projetée contre une cloison. Le secouriste doit décider dans cet ordre : sécuriser la scène (vérifier que le risque d'explosion et la fumée sont sous contrôle avant d'entrer plus avant), se protéger, prioriser entre les deux victimes, puis commencer les gestes appropriés à chacune, sans jamais tenter de redresser la jambe ni percer les cloques du bras brûlé.",
      cause:"• Local pas encore totalement sécurisé au moment de l'intervention : risque de fumée et de nouvelle explosion\n• Deux victimes simultanées, avec un risque de vouloir tout faire à la fois sans prioriser\n• Tentation de redresser la jambe déformée pour 'faire quelque chose' de visible\n• Tentation de percer les cloques par réflexe, en pensant bien faire",
      lessons:"✓ Do No Further Harm : ne jamais réaligner un membre, ne jamais percer une cloque, ne jamais arracher un vêtement collé\n✓ Stabilize. Never improvise : chaque geste vise à stabiliser, jamais à 'réparer'\n✓ La sécurité de la scène reste prioritaire même face à des victimes visibles et en détresse\n✓ Good first aid is not about doing more. It is about doing the right things, and avoiding the wrong ones, until professional medical care takes over",
      link:"🔗 Ce cas mobilise l'ensemble du module : sécurité de la scène (L1), priorisation entre victimes, et maintenant les bons gestes pour brûlures et fractures sans jamais aggraver la situation."},
    en:{title:"Case Study - The Engine Room Explosion",teaser:"Immersive composite case - smoke, two casualties, area not yet secured",
      what:"An explosion occurs in the engine room. Smoke still fills the space, which is not fully secured. One casualty has a significant burn on the arm, a second shows visible deformity of the leg after being thrown against a bulkhead. The rescuer must decide, in this order: secure the scene (confirm the explosion risk and smoke are under control before going further in), protect themselves, prioritize between the two casualties, then begin the appropriate actions for each, never attempting to straighten the leg or pop the blisters on the burned arm.",
      cause:"• Area not yet fully secured at the time of intervention: risk of smoke and a further explosion\n• Two simultaneous casualties, with a risk of trying to do everything at once without prioritizing\n• Temptation to straighten the deformed leg to 'do something' visible\n• Temptation to pop the blisters out of reflex, thinking it helps",
      lessons:"✓ Do No Further Harm: never realign a limb, never pop a blister, never pull off stuck clothing\n✓ Stabilize. Never improvise: every action aims to stabilize, never to 'fix'\n✓ Scene safety remains the priority even facing visible, distressed casualties\n✓ Good first aid is not about doing more. It is about doing the right things, and avoiding the wrong ones, until professional medical care takes over",
      link:"🔗 This case mobilizes the whole module so far: scene safety (Lesson 1), prioritizing between casualties, and now the right actions for burns and fractures without ever making things worse."},
    es:{title:"Caso de estudio - La Explosión en la Sala de Máquinas",teaser:"Caso compuesto inmersivo - humo, dos víctimas, zona aún no asegurada",
      what:"Se produce una explosión en la sala de máquinas. El humo todavía llena el espacio, que no está totalmente asegurado. Una primera víctima presenta una quemadura importante en el brazo, una segunda muestra una deformidad visible en la pierna tras ser lanzada contra un mamparo. El socorrista debe decidir, en este orden: asegurar la escena (confirmar que el riesgo de explosión y el humo están bajo control antes de avanzar más), protegerse, priorizar entre las dos víctimas, y luego iniciar las acciones adecuadas para cada una, sin intentar nunca enderezar la pierna ni perforar las ampollas del brazo quemado.",
      cause:"• Zona aún no totalmente asegurada en el momento de la intervención: riesgo de humo y de una nueva explosión\n• Dos víctimas simultáneas, con el riesgo de querer hacerlo todo a la vez sin priorizar\n• Tentación de enderezar la pierna deformada para 'hacer algo' visible\n• Tentación de perforar las ampollas por reflejo, pensando que ayuda",
      lessons:"✓ Do No Further Harm: nunca realinear un miembro, nunca perforar una ampolla, nunca arrancar ropa pegada\n✓ Stabilize. Never improvise: cada gesto busca estabilizar, nunca 'arreglar'\n✓ La seguridad de la escena sigue siendo prioritaria incluso ante víctimas visibles y angustiadas\n✓ Good first aid is not about doing more. It is about doing the right things, and avoiding the wrong ones, until professional medical care takes over",
      link:"🔗 Este caso moviliza todo el módulo hasta ahora: seguridad de la escena (Lección 1), priorización entre víctimas, y ahora las acciones correctas para quemaduras y fracturas sin agravar nunca la situación."},
    pt:{title:"Caso de estudo - A Explosão na Casa das Máquinas",teaser:"Caso composto imersivo - fumo, duas vítimas, zona ainda não segura",
      what:"Ocorre uma explosão na casa das máquinas. O fumo ainda enche o espaço, que não está totalmente seguro. Uma primeira vítima apresenta uma queimadura importante no braço, uma segunda mostra uma deformidade visível na perna depois de ser projetada contra uma anteparo. O socorrista deve decidir, por esta ordem: garantir a segurança da cena (confirmar que o risco de explosão e o fumo estão sob controlo antes de avançar mais), proteger-se, priorizar entre as duas vítimas, e depois iniciar as ações adequadas para cada uma, nunca tentando endireitar a perna nem perfurar as bolhas do braço queimado.",
      cause:"• Zona ainda não totalmente segura no momento da intervenção: risco de fumo e de nova explosão\n• Duas vítimas simultâneas, com o risco de querer fazer tudo ao mesmo tempo sem priorizar\n• Tentação de endireitar a perna deformada para 'fazer algo' visível\n• Tentação de perfurar as bolhas por reflexo, pensando que ajuda",
      lessons:"✓ Do No Further Harm: nunca realinhar um membro, nunca perfurar uma bolha, nunca arrancar roupa colada\n✓ Stabilize. Never improvise: cada gesto visa estabilizar, nunca 'consertar'\n✓ A segurança da cena continua a ser prioritária mesmo perante vítimas visíveis e angustiadas\n✓ Good first aid is not about doing more. It is about doing the right things, and avoiding the wrong ones, until professional medical care takes over",
      link:"🔗 Este caso mobiliza todo o módulo até agora: segurança da cena (Lição 1), priorização entre vítimas, e agora as ações corretas para queimaduras e fraturas sem nunca agravar a situação."},
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
    {q:"Que signifie le principe 'Do No Further Harm' dans cette leçon ?",opts:["Il faut soigner rapidement quoi qu'il en coûte","Éviter d'aggraver la blessure par un geste inapproprié, même bien intentionné","Il ne concerne que les brûlures","Il faut toujours faire le maximum de gestes possibles"],correct:1,expl:"Do No Further Harm résume l'objectif : stabiliser sans jamais aggraver, même par excès de zèle."},
    {q:"Une brûlure présente des cloques et une peau très douloureuse. De quel degré s'agit-il ?",opts:["1er degré","2e degré","3e degré","Aucun degré ne correspond"],correct:1,expl:"Les cloques et la douleur intense sont caractéristiques du 2e degré."},
    {q:"Une brûlure au 3e degré est-elle toujours douloureuse ?",opts:["Oui, toujours très douloureuse","Pas nécessairement : les nerfs détruits peuvent la rendre indolore, ce qui ne réduit pas sa gravité","Non, elle ne fait jamais mal","Seulement si elle est petite"],correct:1,expl:"Une brûlure au 3e degré peut être indolore car les terminaisons nerveuses sont détruites, mais elle reste la plus grave."},
    {q:"Pendant combien de temps faut-il refroidir une brûlure à l'eau courante ?",opts:["2 minutes","20 minutes","2 heures","Il ne faut jamais refroidir une brûlure"],correct:1,expl:"20 minutes d'eau courante fraîche, jusqu'à 3h après la brûlure, est la recommandation actuelle."},
    {q:"Faut-il utiliser de la glace pour refroidir une brûlure ?",opts:["Oui, c'est le plus efficace","Non, jamais de glace directe, cela peut aggraver les tissus","Oui, mais seulement pour les petites brûlures","Seulement en dernier recours"],correct:1,expl:"La glace directe peut endommager davantage les tissus déjà fragilisés."},
    {q:"Que faire face à un vêtement collé à une brûlure ?",opts:["Le retirer rapidement","Ne jamais l'arracher : couper autour et laisser en place","Le tremper puis tirer fort","Le brûler avec une flamme pour le détacher"],correct:1,expl:"Arracher un vêtement collé aggrave la blessure ; on coupe autour sans y toucher."},
    {q:"Les brûlures peuvent-elles avoir des origines différentes ?",opts:["Non, toujours uniquement thermiques","Oui : thermique, chimique ou électrique, ce qui influence les précautions à prendre","Non, seule l'origine électrique existe à bord","Oui, mais cela ne change jamais rien"],correct:1,expl:"L'origine (chaleur, produit chimique, électricité) change certaines précautions initiales, sans changer les principes de base."},
    {q:"Quelle est la règle d'or face à une déformation évoquant une fracture ?",opts:["Redresser doucement le membre","Ne jamais réaligner, immobiliser dans la position trouvée","Demander à la victime de bouger le membre pour vérifier","Appliquer une pression forte sur la déformation"],correct:1,expl:"On immobilise toujours dans la position trouvée, sans jamais tenter de réaligner."},
    {q:"Que signifie CSM lors de la pose d'une attelle ?",opts:["Contrôle, Sécurité, Mobilité","Circulation, Sensation, Mouvement","Compression, Stabilisation, Maintien","Ce sigle n'existe pas en secourisme"],correct:1,expl:"CSM = Circulation, Sensation, Mouvement, à vérifier avant ET après la pose."},
    {q:"Une attelle doit-elle immobiliser uniquement la zone fracturée ?",opts:["Oui, uniquement la zone exacte","Non, elle doit couvrir l'articulation au-dessus ET en dessous de la fracture suspectée","Non, elle doit couvrir tout le membre sans exception","Oui, et rien d'autre n'est nécessaire"],correct:1,expl:"Immobiliser les deux articulations adjacentes stabilise réellement le membre."},
    {q:"La vérification CSM doit-elle se faire uniquement avant la pose de l'attelle ?",opts:["Oui, avant suffit","Non, elle doit être faite avant ET après, l'immobilisation n'est jamais terminée sans ce contrôle","Non, uniquement après","Ce contrôle n'est pas nécessaire"],correct:1,expl:"Immobilize then Recheck : une attelle trop serrée peut couper la circulation après coup."},
    {q:"Face à une fracture ouverte avec l'os visible, que faire ?",opts:["Repousser l'os sous la peau","Contrôler l'hémorragie et couvrir sans appuyer sur l'os visible","Nettoyer directement l'os avec de l'eau","Tirer sur le membre pour le redresser"],correct:1,expl:"On ne repousse jamais un os visible ; on contrôle le saignement et on protège la plaie sans pression sur l'os."},
    {q:"Dans le cas d'étude de l'explosion en salle des machines, quelle était la priorité avant de traiter les victimes ?",opts:["Traiter immédiatement la brûlure la plus visible","Sécuriser la scène : vérifier que le risque de fumée et de nouvelle explosion est sous contrôle","Interroger les victimes sur les causes de l'explosion","Nettoyer le local avant toute intervention"],correct:1,expl:"La sécurité de la scène (Leçon 1) reste prioritaire même face à des victimes visibles et en détresse."},
    {q:"Que garantissent réellement de bons premiers secours, selon le message de sécurité de cette leçon ?",opts:["La guérison complète de la victime","Faire les bonnes choses et éviter les mauvaises, jusqu'à la prise en charge médicale professionnelle","Le remplacement total des soins médicaux","Rien de concret"],correct:1,expl:"Good first aid is not about doing more. It is about doing the right things - and avoiding the wrong ones - until professional medical care takes over."},
    {q:"Ce module enseigne-t-il un protocole médical détaillé de traitement des brûlures et fractures ?",opts:["Oui, un protocole clinique complet","Non, il enseigne les principes de décision STCW : stabiliser sans aggraver, jamais un manuel médical","Oui, mais uniquement pour les brûlures graves","Non, il ne sert à rien sans matériel médical"],correct:1,expl:"MAP enseigne Stabilize. Never improvise, pas un protocole clinique détaillé."},
  ],
  en:[
    {q:"What does the 'Do No Further Harm' principle mean in this lesson?",opts:["Treat quickly no matter the cost","Avoid worsening the injury through an inappropriate action, even a well-intentioned one","It only concerns burns","You must always perform the maximum number of actions"],correct:1,expl:"Do No Further Harm sums up the goal: stabilize without ever worsening, even out of good intentions."},
    {q:"A burn shows blisters and very painful skin. What degree is this?",opts:["1st degree","2nd degree","3rd degree","No degree matches"],correct:1,expl:"Blisters and intense pain are characteristic of 2nd degree burns."},
    {q:"Is a 3rd degree burn always painful?",opts:["Yes, always very painful","Not necessarily: destroyed nerves can make it painless, which does not reduce its severity","No, it never hurts","Only if it's small"],correct:1,expl:"A 3rd degree burn can be painless because nerve endings are destroyed, but it remains the most severe."},
    {q:"How long should a burn be cooled under running water?",opts:["2 minutes","20 minutes","2 hours","A burn should never be cooled"],correct:1,expl:"20 minutes of cool running water, up to 3 hours after the burn, is the current recommendation."},
    {q:"Should ice be used to cool a burn?",opts:["Yes, it's the most effective","No, never direct ice, it can worsen the tissue","Yes, but only for small burns","Only as a last resort"],correct:1,expl:"Direct ice can further damage already fragile tissue."},
    {q:"What do you do with clothing stuck to a burn?",opts:["Remove it quickly","Never pull it off: cut around it and leave it in place","Soak it then pull hard","Burn it off with a flame"],correct:1,expl:"Pulling off stuck clothing worsens the injury; cut around it without touching it."},
    {q:"Can burns have different origins?",opts:["No, always thermal only","Yes: thermal, chemical, or electrical, which influences the precautions to take","No, only electrical origin exists on board","Yes, but it never changes anything"],correct:1,expl:"The origin (heat, chemical, electricity) changes certain initial precautions, without changing the basic principles."},
    {q:"What is the golden rule facing a deformity suggesting a fracture?",opts:["Gently straighten the limb","Never realign, immobilize in the position found","Ask the casualty to move the limb to check","Apply firm pressure on the deformity"],correct:1,expl:"You always immobilize in the position found, never attempting to realign."},
    {q:"What does CSM mean when applying a splint?",opts:["Control, Security, Mobility","Circulation, Sensation, Movement","Compression, Stabilization, Maintenance","This acronym doesn't exist in first aid"],correct:1,expl:"CSM = Circulation, Sensation, Movement, to check BEFORE and AFTER application."},
    {q:"Should a splint immobilize only the fractured area?",opts:["Yes, only the exact area","No, it must cover the joint above AND below the suspected fracture","No, it must cover the whole limb without exception","Yes, and nothing else is needed"],correct:1,expl:"Immobilizing both adjacent joints truly stabilizes the limb."},
    {q:"Should CSM checking be done only before applying the splint?",opts:["Yes, before is enough","No, it must be done before AND after, immobilization is never complete without this check","No, only after","This check isn't necessary"],correct:1,expl:"Immobilize then Recheck: an overly tight splint can cut off circulation afterward."},
    {q:"Facing an open fracture with visible bone, what do you do?",opts:["Push the bone back under the skin","Control the bleeding and cover without pressing on the visible bone","Clean the bone directly with water","Pull on the limb to straighten it"],correct:1,expl:"Never push a visible bone back; control bleeding and protect the wound without pressure on the bone."},
    {q:"In the engine room explosion case study, what was the priority before treating the casualties?",opts:["Immediately treat the most visible burn","Secure the scene: confirm the smoke and further explosion risk is under control","Question the casualties about the causes of the explosion","Clean the space before any intervention"],correct:1,expl:"Scene safety (Lesson 1) remains the priority even facing visible, distressed casualties."},
    {q:"What does good first aid actually guarantee, according to this lesson's safety message?",opts:["The casualty's complete recovery","Doing the right things and avoiding the wrong ones, until professional medical care takes over","The complete replacement of medical care","Nothing concrete"],correct:1,expl:"Good first aid is not about doing more. It is about doing the right things - and avoiding the wrong ones - until professional medical care takes over."},
    {q:"Does this module teach a detailed clinical protocol for treating burns and fractures?",opts:["Yes, a complete clinical protocol","No, it teaches STCW decision principles: stabilize without worsening, never a medical manual","Yes, but only for severe burns","No, it is useless without medical equipment"],correct:1,expl:"MAP teaches Stabilize. Never improvise, not a detailed clinical protocol."},
  ],
  es:[
    {q:"¿Qué significa el principio 'Do No Further Harm' en esta lección?",opts:["Hay que tratar rápido cueste lo que cueste","Evitar agravar la lesión con un gesto inapropiado, aunque sea bien intencionado","Solo concierne a las quemaduras","Hay que hacer siempre el máximo de gestos posibles"],correct:1,expl:"Do No Further Harm resume el objetivo: estabilizar sin agravar nunca, incluso por exceso de celo."},
    {q:"Una quemadura presenta ampollas y piel muy dolorosa. ¿De qué grado se trata?",opts:["1er grado","2º grado","3er grado","Ningún grado corresponde"],correct:1,expl:"Las ampollas y el dolor intenso son características del 2º grado."},
    {q:"¿Una quemadura de 3er grado es siempre dolorosa?",opts:["Sí, siempre muy dolorosa","No necesariamente: los nervios destruidos pueden hacerla indolora, lo que no reduce su gravedad","No, nunca duele","Solo si es pequeña"],correct:1,expl:"Una quemadura de 3er grado puede ser indolora porque las terminaciones nerviosas están destruidas, pero sigue siendo la más grave."},
    {q:"¿Durante cuánto tiempo hay que enfriar una quemadura con agua corriente?",opts:["2 minutos","20 minutos","2 horas","Nunca hay que enfriar una quemadura"],correct:1,expl:"20 minutos de agua corriente fresca, hasta 3h después de la quemadura, es la recomendación actual."},
    {q:"¿Hay que usar hielo para enfriar una quemadura?",opts:["Sí, es lo más eficaz","No, nunca hielo directo, puede agravar el tejido","Sí, pero solo para quemaduras pequeñas","Solo como último recurso"],correct:1,expl:"El hielo directo puede dañar aún más el tejido ya frágil."},
    {q:"¿Qué hacer ante ropa pegada a una quemadura?",opts:["Retirarla rápidamente","Nunca arrancarla: cortar alrededor y dejarla en su sitio","Remojarla y tirar fuerte","Quemarla con una llama para soltarla"],correct:1,expl:"Arrancar ropa pegada agrava la lesión; se corta alrededor sin tocarla."},
    {q:"¿Las quemaduras pueden tener orígenes diferentes?",opts:["No, siempre solo térmicas","Sí: térmica, química o eléctrica, lo que influye en las precauciones a tomar","No, a bordo solo existe el origen eléctrico","Sí, pero nunca cambia nada"],correct:1,expl:"El origen (calor, producto químico, electricidad) cambia ciertas precauciones iniciales, sin cambiar los principios básicos."},
    {q:"¿Cuál es la regla de oro ante una deformidad que sugiere fractura?",opts:["Enderezar suavemente el miembro","Nunca realinear, inmovilizar en la posición encontrada","Pedir a la víctima que mueva el miembro para comprobar","Aplicar presión fuerte sobre la deformidad"],correct:1,expl:"Siempre se inmoviliza en la posición encontrada, sin intentar nunca realinear."},
    {q:"¿Qué significa CSM al colocar una férula?",opts:["Control, Seguridad, Movilidad","Circulación, Sensibilidad, Movimiento","Compresión, Estabilización, Mantenimiento","Esta sigla no existe en primeros auxilios"],correct:1,expl:"CSM = Circulación, Sensibilidad, Movimiento, a comprobar ANTES Y DESPUÉS de la colocación."},
    {q:"¿Una férula debe inmovilizar solo la zona fracturada?",opts:["Sí, solo la zona exacta","No, debe cubrir la articulación por encima Y por debajo de la fractura sospechada","No, debe cubrir todo el miembro sin excepción","Sí, y no se necesita nada más"],correct:1,expl:"Inmovilizar ambas articulaciones adyacentes estabiliza realmente el miembro."},
    {q:"¿La comprobación CSM debe hacerse solo antes de colocar la férula?",opts:["Sí, antes basta","No, debe hacerse antes Y después, la inmovilización nunca está completa sin esta comprobación","No, solo después","Esta comprobación no es necesaria"],correct:1,expl:"Immobilize then Recheck: una férula demasiado apretada puede cortar la circulación después."},
    {q:"Ante una fractura abierta con el hueso visible, ¿qué hacer?",opts:["Volver a meter el hueso bajo la piel","Controlar la hemorragia y cubrir sin presionar el hueso visible","Limpiar el hueso directamente con agua","Tirar del miembro para enderezarlo"],correct:1,expl:"Nunca se vuelve a meter un hueso visible; se controla el sangrado y se protege la herida sin presión sobre el hueso."},
    {q:"En el caso de estudio de la explosión en la sala de máquinas, ¿cuál era la prioridad antes de tratar a las víctimas?",opts:["Tratar de inmediato la quemadura más visible","Asegurar la escena: confirmar que el riesgo de humo y nueva explosión está bajo control","Interrogar a las víctimas sobre las causas de la explosión","Limpiar el local antes de cualquier intervención"],correct:1,expl:"La seguridad de la escena (Lección 1) sigue siendo prioritaria incluso ante víctimas visibles y angustiadas."},
    {q:"¿Qué garantizan realmente unos buenos primeros auxilios, según el mensaje de seguridad de esta lección?",opts:["La curación completa de la víctima","Hacer las cosas correctas y evitar las incorrectas, hasta la atención médica profesional","La sustitución total de la atención médica","Nada concreto"],correct:1,expl:"Good first aid is not about doing more. It is about doing the right things - and avoiding the wrong ones - until professional medical care takes over."},
    {q:"¿Este módulo enseña un protocolo médico detallado sobre el tratamiento de quemaduras y fracturas?",opts:["Sí, un protocolo clínico completo","No, enseña principios de decisión STCW: estabilizar sin agravar, nunca un manual médico","Sí, pero solo para quemaduras graves","No, no sirve de nada sin material médico"],correct:1,expl:"MAP enseña Stabilize. Never improvise, no un protocolo clínico detallado."},
  ],
  pt:[
    {q:"O que significa o princípio 'Do No Further Harm' nesta lição?",opts:["É preciso tratar depressa custe o que custar","Evitar agravar a lesão com um gesto inapropriado, mesmo bem intencionado","Só diz respeito a queimaduras","É preciso fazer sempre o máximo de gestos possíveis"],correct:1,expl:"Do No Further Harm resume o objetivo: estabilizar sem nunca agravar, mesmo por excesso de zelo."},
    {q:"Uma queimadura apresenta bolhas e pele muito dolorosa. De que grau se trata?",opts:["1º grau","2º grau","3º grau","Nenhum grau corresponde"],correct:1,expl:"As bolhas e a dor intensa são características do 2º grau."},
    {q:"Uma queimadura de 3º grau é sempre dolorosa?",opts:["Sim, sempre muito dolorosa","Não necessariamente: os nervos destruídos podem torná-la indolor, o que não reduz a sua gravidade","Não, nunca dói","Só se for pequena"],correct:1,expl:"Uma queimadura de 3º grau pode ser indolor porque as terminações nervosas estão destruídas, mas continua a ser a mais grave."},
    {q:"Durante quanto tempo se deve arrefecer uma queimadura em água corrente?",opts:["2 minutos","20 minutos","2 horas","Nunca se deve arrefecer uma queimadura"],correct:1,expl:"20 minutos de água corrente fresca, até 3h após a queimadura, é a recomendação atual."},
    {q:"Deve usar-se gelo para arrefecer uma queimadura?",opts:["Sim, é o mais eficaz","Não, nunca gelo direto, pode agravar o tecido","Sim, mas só para queimaduras pequenas","Só em último recurso"],correct:1,expl:"O gelo direto pode danificar ainda mais o tecido já frágil."},
    {q:"O que fazer perante roupa colada a uma queimadura?",opts:["Retirá-la rapidamente","Nunca a arrancar: cortar à volta e deixá-la no lugar","Molhá-la e puxar com força","Queimá-la com uma chama para a soltar"],correct:1,expl:"Arrancar roupa colada agrava a lesão; corta-se à volta sem lhe tocar."},
    {q:"As queimaduras podem ter origens diferentes?",opts:["Não, sempre apenas térmicas","Sim: térmica, química ou elétrica, o que influencia as precauções a tomar","Não, a bordo só existe a origem elétrica","Sim, mas nunca muda nada"],correct:1,expl:"A origem (calor, produto químico, eletricidade) muda certas precauções iniciais, sem mudar os princípios básicos."},
    {q:"Qual é a regra de ouro perante uma deformidade que sugere fratura?",opts:["Endireitar suavemente o membro","Nunca realinhar, imobilizar na posição encontrada","Pedir à vítima para mover o membro para verificar","Aplicar pressão forte sobre a deformidade"],correct:1,expl:"Imobiliza-se sempre na posição encontrada, nunca tentando realinhar."},
    {q:"O que significa CSM ao colocar uma tala?",opts:["Controlo, Segurança, Mobilidade","Circulação, Sensibilidade, Movimento","Compressão, Estabilização, Manutenção","Esta sigla não existe em primeiros socorros"],correct:1,expl:"CSM = Circulação, Sensibilidade, Movimento, a verificar ANTES E DEPOIS da colocação."},
    {q:"Uma tala deve imobilizar apenas a zona fraturada?",opts:["Sim, só a zona exata","Não, deve cobrir a articulação acima E abaixo da fratura suspeita","Não, deve cobrir todo o membro sem exceção","Sim, e nada mais é necessário"],correct:1,expl:"Imobilizar ambas as articulações adjacentes estabiliza realmente o membro."},
    {q:"A verificação CSM deve ser feita apenas antes de colocar a tala?",opts:["Sim, antes basta","Não, deve ser feita antes E depois, a imobilização nunca está completa sem esta verificação","Não, só depois","Esta verificação não é necessária"],correct:1,expl:"Immobilize then Recheck: uma tala demasiado apertada pode cortar a circulação depois."},
    {q:"Perante uma fratura exposta com o osso visível, o que fazer?",opts:["Empurrar o osso de volta sob a pele","Controlar a hemorragia e cobrir sem pressionar o osso visível","Limpar o osso diretamente com água","Puxar o membro para o endireitar"],correct:1,expl:"Nunca se empurra de volta um osso visível; controla-se o sangramento e protege-se a ferida sem pressão sobre o osso."},
    {q:"No caso de estudo da explosão na casa das máquinas, qual era a prioridade antes de tratar as vítimas?",opts:["Tratar de imediato a queimadura mais visível","Garantir a segurança da cena: confirmar que o risco de fumo e nova explosão está sob controlo","Interrogar as vítimas sobre as causas da explosão","Limpar o local antes de qualquer intervenção"],correct:1,expl:"A segurança da cena (Lição 1) continua a ser prioritária mesmo perante vítimas visíveis e angustiadas."},
    {q:"O que garantem realmente bons primeiros socorros, segundo a mensagem de segurança desta lição?",opts:["A cura completa da vítima","Fazer as coisas certas e evitar as erradas, até à assistência médica profissional","A substituição total da assistência médica","Nada concreto"],correct:1,expl:"Good first aid is not about doing more. It is about doing the right things - and avoiding the wrong ones - until professional medical care takes over."},
    {q:"Este módulo ensina um protocolo médico detalhado sobre o tratamento de queimaduras e fraturas?",opts:["Sim, um protocolo clínico completo","Não, ensina princípios de decisão STCW: estabilizar sem agravar, nunca um manual médico","Sim, mas só para queimaduras graves","Não, não serve de nada sem material médico"],correct:1,expl:"A MAP ensina Stabilize. Never improvise, não um protocolo clínico detalhado."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Pendant combien de temps faut-il refroidir une brûlure à l'eau courante ?",opts:["2 minutes","20 minutes","2 heures","Jamais"],correct:1,expl:"20 minutes d'eau courante fraîche est la recommandation actuelle."},
    {q:"Que faire face à un vêtement collé à une brûlure ?",opts:["Le retirer rapidement","Ne jamais l'arracher, couper autour","Le tremper puis tirer fort","Le laisser tel quel sans y toucher, même autour"],correct:1,expl:"On coupe autour du vêtement collé, sans jamais l'arracher."},
    {q:"Quelle est la règle d'or face à une déformation évoquant une fracture ?",opts:["Redresser doucement","Ne jamais réaligner, immobiliser dans la position trouvée","Faire bouger le membre pour tester","Appuyer fermement dessus"],correct:1,expl:"On immobilise toujours dans la position trouvée, sans réaligner."},
    {q:"Que signifie 'Immobilize then Recheck' ?",opts:["Il suffit d'immobiliser une fois","Vérifier CSM avant ET après la pose de l'attelle","Recommencer la pose plusieurs fois","Ne vérifier qu'après, jamais avant"],correct:1,expl:"L'immobilisation n'est jamais complète sans revérifier circulation, sensation et mouvement après la pose."},
    {q:"Que garantissent de bons premiers secours selon le message de sécurité de cette leçon ?",opts:["La guérison complète","Faire les bonnes choses et éviter les mauvaises jusqu'à la prise en charge médicale","Le remplacement des soins médicaux","Rien de concret"],correct:1,expl:"Good first aid is not about doing more. It is about doing the right things, and avoiding the wrong ones, until professional medical care takes over."},
  ],
  en:[
    {q:"How long should a burn be cooled under running water?",opts:["2 minutes","20 minutes","2 hours","Never"],correct:1,expl:"20 minutes of cool running water is the current recommendation."},
    {q:"What do you do with clothing stuck to a burn?",opts:["Remove it quickly","Never pull it off, cut around it","Soak it then pull hard","Leave it exactly as is, without touching even around it"],correct:1,expl:"You cut around stuck clothing, never pulling it off."},
    {q:"What is the golden rule facing a deformity suggesting a fracture?",opts:["Gently straighten it","Never realign, immobilize in the position found","Move the limb to test it","Press firmly on it"],correct:1,expl:"Always immobilize in the position found, never realigning."},
    {q:"What does 'Immobilize then Recheck' mean?",opts:["Immobilizing once is enough","Check CSM before AND after applying the splint","Reapply the splint several times","Only check after, never before"],correct:1,expl:"Immobilization is never complete without rechecking circulation, sensation, and movement after application."},
    {q:"What does good first aid guarantee according to this lesson's safety message?",opts:["Complete recovery","Doing the right things and avoiding the wrong ones until medical care takes over","Replacing medical care","Nothing concrete"],correct:1,expl:"Good first aid is not about doing more. It is about doing the right things, and avoiding the wrong ones, until professional medical care takes over."},
  ],
  es:[
    {q:"¿Durante cuánto tiempo hay que enfriar una quemadura con agua corriente?",opts:["2 minutos","20 minutos","2 horas","Nunca"],correct:1,expl:"20 minutos de agua corriente fresca es la recomendación actual."},
    {q:"¿Qué hacer ante ropa pegada a una quemadura?",opts:["Retirarla rápidamente","Nunca arrancarla, cortar alrededor","Remojarla y tirar fuerte","Dejarla tal cual, sin tocarla ni alrededor"],correct:1,expl:"Se corta alrededor de la ropa pegada, sin arrancarla nunca."},
    {q:"¿Cuál es la regla de oro ante una deformidad que sugiere fractura?",opts:["Enderezarla suavemente","Nunca realinear, inmovilizar en la posición encontrada","Mover el miembro para probar","Presionar firmemente sobre ella"],correct:1,expl:"Siempre se inmoviliza en la posición encontrada, sin realinear."},
    {q:"¿Qué significa 'Immobilize then Recheck'?",opts:["Basta con inmovilizar una vez","Comprobar CSM antes Y después de colocar la férula","Volver a colocar la férula varias veces","Solo comprobar después, nunca antes"],correct:1,expl:"La inmovilización nunca está completa sin volver a comprobar circulación, sensibilidad y movimiento tras la colocación."},
    {q:"¿Qué garantizan unos buenos primeros auxilios según el mensaje de seguridad de esta lección?",opts:["La curación completa","Hacer las cosas correctas y evitar las incorrectas hasta la atención médica","La sustitución de la atención médica","Nada concreto"],correct:1,expl:"Good first aid is not about doing more. It is about doing the right things, and avoiding the wrong ones, until professional medical care takes over."},
  ],
  pt:[
    {q:"Durante quanto tempo se deve arrefecer uma queimadura em água corrente?",opts:["2 minutos","20 minutos","2 horas","Nunca"],correct:1,expl:"20 minutos de água corrente fresca é a recomendação atual."},
    {q:"O que fazer perante roupa colada a uma queimadura?",opts:["Retirá-la rapidamente","Nunca a arrancar, cortar à volta","Molhá-la e puxar com força","Deixá-la tal como está, sem lhe tocar nem à volta"],correct:1,expl:"Corta-se à volta da roupa colada, nunca a arrancando."},
    {q:"Qual é a regra de ouro perante uma deformidade que sugere fratura?",opts:["Endireitá-la suavemente","Nunca realinhar, imobilizar na posição encontrada","Mover o membro para testar","Pressionar firmemente sobre ela"],correct:1,expl:"Imobiliza-se sempre na posição encontrada, nunca realinhando."},
    {q:"O que significa 'Immobilize then Recheck'?",opts:["Basta imobilizar uma vez","Verificar CSM antes E depois de colocar a tala","Voltar a colocar a tala várias vezes","Só verificar depois, nunca antes"],correct:1,expl:"A imobilização nunca está completa sem reverificar circulação, sensibilidade e movimento após a colocação."},
    {q:"O que garantem bons primeiros socorros segundo a mensagem de segurança desta lição?",opts:["A cura completa","Fazer as coisas certas e evitar as erradas até à assistência médica","A substituição da assistência médica","Nada concreto"],correct:1,expl:"Good first aid is not about doing more. It is about doing the right things, and avoiding the wrong ones, until professional medical care takes over."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Saurais-tu faire la difference entre aider un collegue blesse... et aggraver involontairement sa blessure ?",
    en:"Would you know the difference between helping an injured crewmate... and unintentionally making the injury worse?",
    es:"¿Sabrias distinguir entre ayudar a un companero herido... y agravar involuntariamente su lesion?",
    pt:"Saberias distinguir entre ajudar um colega ferido... e agravar involuntariamente a sua lesao?",
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
      badge:"🩺 Safety · STCW First Aid · Leçon 4/8 · ⭐ Premium",
      title:"Burns, Fractures & Trauma Immobilization",
      intro:"Cette leçon introduit une nouvelle philosophie pour tout le reste du module médical : dans le doute, ne rien faire de trop est souvent plus sûr que d'en faire trop. Do No Further Harm.",
      p0:"DO NO FURTHER HARM",s0t:"Le principe qui résume toute la leçon",
      s0:"Ne jamais aggraver une blessure par un geste inapproprié, même bien intentionné : ne pas retirer un vêtement collé, ne pas réaligner un membre, ne pas percer une cloque, ne pas repousser un os visible.\n\nCOMMENT LE RECONNAÎTRE ? Type et degré de brûlure, ou signes évocateurs d'une fracture.\nQUE FAIRE IMMÉDIATEMENT ? Refroidir une brûlure 20 minutes, immobiliser une fracture dans la position trouvée.\nQUELLE ERREUR L'AGGRAVE ? Percer une cloque, arracher un vêtement collé, réaligner un membre, repousser un os.\nQUAND DEMANDER DE L'AIDE MÉDICALE ? Immédiatement pour toute brûlure étendue ou profonde, toute fracture ouverte, ou perte de circulation après une attelle.",
      p1:"TYPES DE BRÛLURES",s1t:"1er, 2e, 3e degré",
      s1:"La gravité ne se limite pas à la douleur ressentie : une brûlure au 3e degré peut être indolore et rester la plus grave. L'origine, thermique, chimique ou électrique, influence les précautions initiales.",
      p2:"REFROIDIR & COUVRIR",s2t:"Le geste qui limite les dégâts",
      s2:"Eau courante fraîche pendant 20 minutes, jamais de glace, jamais de pommade, jamais de cloque percée. Couvrir sans serrer une fois refroidi.",
      p3:"STABILIZE. NEVER IMPROVISE.",s3t:"La philosophie de tout le module médical",
      s3:"Le rôle du secouriste n'est jamais de 'réparer' mais de stabiliser sans aggraver. Cette phrase résume l'attitude à adopter face à toute blessure traumatique jusqu'à la fin du module.",
      p4:"SUSPICION DE FRACTURE",s4t:"Reconnaître sans confirmer par l'imagerie",
      s4:"Déformation, douleur vive, incapacité fonctionnelle, gonflement : ces signes suffisent à agir, sans attendre une confirmation qu'on ne peut pas obtenir en mer.",
      p5:"IMMOBILISER PUIS REVÉRIFIER",s5t:"L'attelle n'est jamais la fin du travail",
      s5:"Vérifier la circulation, la sensation et le mouvement avant la pose, immobiliser l'articulation au-dessus et en dessous, puis revérifier après : une attelle trop serrée peut couper la circulation en quelques minutes.",
      p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"⚠️ CAS D'ÉTUDE",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 4",
      sumP:["Do No Further Harm : le principe qui résume toute la leçon","Brûlures : refroidir 20 minutes, jamais de glace, jamais percer une cloque","Fractures : ne jamais réaligner, immobiliser dans la position trouvée","Immobilize then Recheck : vérifier CSM avant ET après la pose de l'attelle","Stabilize. Never improvise : la philosophie de tout le module médical"],
      learnedP:["Reconnaître les degrés de brûlure","Refroidir et couvrir correctement","Reconnaître les signes de fracture sans réaligner","La vérification CSM avant et après l'attelle","Le principe Do No Further Harm"],
      safetyMsg:"Good first aid is not about doing more. It is about doing the right things - and avoiding the wrong ones - until professional medical care takes over.",
    },
    en:{
      badge:"🩺 Safety · STCW First Aid · Lesson 4/8 · ⭐ Premium",
      title:"Burns, Fractures & Trauma Immobilization",
      intro:"This lesson introduces a new philosophy for the rest of the medical module: when in doubt, doing less is often safer than doing too much. Do No Further Harm.",
      p0:"DO NO FURTHER HARM",s0t:"The principle that sums up the whole lesson",
      s0:"Never worsen an injury through an inappropriate action, even a well-intentioned one: don't pull off stuck clothing, don't realign a limb, don't pop a blister, don't push a visible bone back.\n\nHOW DO I RECOGNIZE IT? Type and degree of burn, or signs suggestive of a fracture.\nWHAT DO I DO IMMEDIATELY? Cool a burn for 20 minutes, immobilize a fracture in the position found.\nWHAT MISTAKE MAKES IT WORSE? Popping a blister, pulling off stuck clothing, realigning a limb, pushing back a bone.\nWHEN MUST I ASK FOR MEDICAL ASSISTANCE? Immediately for any extensive or deep burn, any open fracture, or lost circulation after a splint.",
      p1:"TYPES OF BURNS",s1t:"1st, 2nd, 3rd degree",
      s1:"Severity isn't limited to the pain felt: a 3rd degree burn can be painless and remain the most severe. The origin, thermal, chemical, or electrical, influences initial precautions.",
      p2:"COOL & COVER",s2t:"The action that limits the damage",
      s2:"Cool running water for 20 minutes, never ice, never ointment, never a popped blister. Cover loosely once cooled.",
      p3:"STABILIZE. NEVER IMPROVISE.",s3t:"The philosophy of the entire medical module",
      s3:"The rescuer's role is never to 'fix' but to stabilize without worsening. This phrase sums up the attitude to adopt facing any traumatic injury for the rest of the module.",
      p4:"SUSPECTED FRACTURE",s4t:"Recognizing without imaging confirmation",
      s4:"Deformity, sharp pain, functional inability, swelling: these signs are enough to act, without waiting for confirmation that cannot be obtained at sea.",
      p5:"IMMOBILIZE THEN RECHECK",s5t:"The splint is never the end of the job",
      s5:"Check circulation, sensation, and movement before applying, immobilize the joint above and below, then recheck after: an overly tight splint can cut off circulation within minutes.",
      p6:"🎯 OPERATIONAL EXERCISE",p7:"⚠️ CASE STUDY",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 4",
      sumP:["Do No Further Harm: the principle that sums up the whole lesson","Burns: cool for 20 minutes, never ice, never pop a blister","Fractures: never realign, immobilize in the position found","Immobilize then Recheck: check CSM before AND after splinting","Stabilize. Never improvise: the philosophy of the entire medical module"],
      learnedP:["Recognizing burn degrees","Cooling and covering correctly","Recognizing fracture signs without realigning","CSM checking before and after splinting","The Do No Further Harm principle"],
      safetyMsg:"Good first aid is not about doing more. It is about doing the right things - and avoiding the wrong ones - until professional medical care takes over.",
    },
    es:{
      badge:"🩺 Safety · STCW First Aid · Lección 4/8 · ⭐ Premium",
      title:"Burns, Fractures & Trauma Immobilization",
      intro:"Esta lección introduce una nueva filosofía para el resto del módulo médico: ante la duda, hacer menos suele ser más seguro que hacer demasiado. Do No Further Harm.",
      p0:"DO NO FURTHER HARM",s0t:"El principio que resume toda la lección",
      s0:"Nunca agravar una lesión con un gesto inapropiado, aunque sea bien intencionado: no arrancar ropa pegada, no realinear un miembro, no perforar una ampolla, no volver a meter un hueso visible.\n\n¿CÓMO RECONOCERLO? Tipo y grado de la quemadura, o signos sugestivos de una fractura.\n¿QUÉ HACER DE INMEDIATO? Enfriar una quemadura 20 minutos, inmovilizar una fractura en la posición encontrada.\n¿QUÉ ERROR LO AGRAVA? Perforar una ampolla, arrancar ropa pegada, realinear un miembro, volver a meter un hueso.\n¿CUÁNDO PEDIR AYUDA MÉDICA? De inmediato ante cualquier quemadura extensa o profunda, cualquier fractura abierta, o pérdida de circulación tras una férula.",
      p1:"TIPOS DE QUEMADURAS",s1t:"1er, 2º, 3er grado",
      s1:"La gravedad no se limita al dolor sentido: una quemadura de 3er grado puede ser indolora y seguir siendo la más grave. El origen, térmico, químico o eléctrico, influye en las precauciones iniciales.",
      p2:"ENFRIAR Y CUBRIR",s2t:"El gesto que limita el daño",
      s2:"Agua corriente fresca durante 20 minutos, nunca hielo, nunca pomada, nunca una ampolla perforada. Cubrir sin apretar una vez enfriado.",
      p3:"STABILIZE. NEVER IMPROVISE.",s3t:"La filosofía de todo el módulo médico",
      s3:"El papel del socorrista nunca es 'arreglar' sino estabilizar sin agravar. Esta frase resume la actitud a adoptar ante cualquier lesión traumática durante el resto del módulo.",
      p4:"SOSPECHA DE FRACTURA",s4t:"Reconocer sin confirmación por imagen",
      s4:"Deformidad, dolor agudo, incapacidad funcional, hinchazón: estos signos bastan para actuar, sin esperar una confirmación que no se puede obtener en el mar.",
      p5:"INMOVILIZAR Y VOLVER A COMPROBAR",s5t:"La férula nunca es el final del trabajo",
      s5:"Comprobar circulación, sensibilidad y movimiento antes de colocarla, inmovilizar la articulación por encima y por debajo, luego volver a comprobar después: una férula demasiado apretada puede cortar la circulación en minutos.",
      p6:"🎯 EJERCICIO OPERATIVO",p7:"⚠️ CASO DE ESTUDIO",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 4",
      sumP:["Do No Further Harm: el principio que resume toda la lección","Quemaduras: enfriar 20 minutos, nunca hielo, nunca perforar una ampolla","Fracturas: nunca realinear, inmovilizar en la posición encontrada","Immobilize then Recheck: comprobar CSM antes Y después de entablillar","Stabilize. Never improvise: la filosofía de todo el módulo médico"],
      learnedP:["Reconocer los grados de quemadura","Enfriar y cubrir correctamente","Reconocer signos de fractura sin realinear","La comprobación CSM antes y después de la férula","El principio Do No Further Harm"],
      safetyMsg:"Good first aid is not about doing more. It is about doing the right things - and avoiding the wrong ones - until professional medical care takes over.",
    },
    pt:{
      badge:"🩺 Safety · STCW First Aid · Lição 4/8 · ⭐ Premium",
      title:"Burns, Fractures & Trauma Immobilization",
      intro:"Esta lição introduz uma nova filosofia para o resto do módulo médico: na dúvida, fazer menos costuma ser mais seguro do que fazer demasiado. Do No Further Harm.",
      p0:"DO NO FURTHER HARM",s0t:"O princípio que resume toda a lição",
      s0:"Nunca agravar uma lesão com um gesto inapropriado, mesmo bem intencionado: não arrancar roupa colada, não realinhar um membro, não perfurar uma bolha, não empurrar de volta um osso visível.\n\nCOMO RECONHECER? Tipo e grau da queimadura, ou sinais sugestivos de uma fratura.\nO QUE FAZER IMEDIATAMENTE? Arrefecer uma queimadura 20 minutos, imobilizar uma fratura na posição encontrada.\nQUE ERRO O AGRAVA? Perfurar uma bolha, arrancar roupa colada, realinhar um membro, empurrar de volta um osso.\nQUANDO PEDIR AJUDA MÉDICA? De imediato perante qualquer queimadura extensa ou profunda, qualquer fratura exposta, ou perda de circulação após uma tala.",
      p1:"TIPOS DE QUEIMADURAS",s1t:"1º, 2º, 3º grau",
      s1:"A gravidade não se limita à dor sentida: uma queimadura de 3º grau pode ser indolor e continuar a ser a mais grave. A origem, térmica, química ou elétrica, influencia as precauções iniciais.",
      p2:"ARREFECER E COBRIR",s2t:"O gesto que limita os danos",
      s2:"Água corrente fresca durante 20 minutos, nunca gelo, nunca pomada, nunca uma bolha perfurada. Cobrir sem apertar depois de arrefecida.",
      p3:"STABILIZE. NEVER IMPROVISE.",s3t:"A filosofia de todo o módulo médico",
      s3:"O papel do socorrista nunca é 'consertar' mas estabilizar sem agravar. Esta frase resume a atitude a adotar perante qualquer lesão traumática durante o resto do módulo.",
      p4:"SUSPEITA DE FRATURA",s4t:"Reconhecer sem confirmação por imagem",
      s4:"Deformidade, dor aguda, incapacidade funcional, inchaço: estes sinais bastam para agir, sem esperar por uma confirmação que não se pode obter no mar.",
      p5:"IMOBILIZAR E REVERIFICAR",s5t:"A tala nunca é o fim do trabalho",
      s5:"Verificar circulação, sensibilidade e movimento antes de colocar, imobilizar a articulação acima e abaixo, depois reverificar depois: uma tala demasiado apertada pode cortar a circulação em minutos.",
      p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"⚠️ CASO DE ESTUDO",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 4",
      sumP:["Do No Further Harm: o princípio que resume toda a lição","Queimaduras: arrefecer 20 minutos, nunca gelo, nunca perfurar uma bolha","Fraturas: nunca realinhar, imobilizar na posição encontrada","Immobilize then Recheck: verificar CSM antes E depois de entalar","Stabilize. Never improvise: a filosofia de todo o módulo médico"],
      learnedP:["Reconhecer os graus de queimadura","Arrefecer e cobrir corretamente","Reconhecer sinais de fratura sem realinhar","A verificação CSM antes e depois da tala","O princípio Do No Further Harm"],
      safetyMsg:"Good first aid is not about doing more. It is about doing the right things - and avoiding the wrong ones - until professional medical care takes over.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS3_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/8":lang==="en"?"Lesson 4/8":lang==="es"?"Lección 4/8":"Lição 4/8"}</div>
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

            <SL icon="🛡️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🔥" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔥</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔥 {lang==="fr"?"TYPES DE BRÛLURES - INTERACTIF":lang==="en"?"BURN TYPES - INTERACTIVE":lang==="es"?"TIPOS DE QUEMADURAS - INTERACTIVO":"TIPOS DE QUEIMADURAS - INTERATIVO"}</div><BurnTypesSVG lang={lang}/></Card>

            <SL icon="💧" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💧</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>💧 {lang==="fr"?"REFROIDIR & COUVRIR - INTERACTIF":lang==="en"?"COOL & COVER - INTERACTIVE":lang==="es"?"ENFRIAR Y CUBRIR - INTERACTIVO":"ARREFECER E COBRIR - INTERATIVO"}</div><CoolAndCoverSVG lang={lang}/></Card>

            <SL icon="🧭" text={lc.p3} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="🦴" text={lc.p4} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🦴</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🦴 {lang==="fr"?"SIGNES DE FRACTURE - INTERACTIF":lang==="en"?"FRACTURE SIGNS - INTERACTIVE":lang==="es"?"SIGNOS DE FRACTURA - INTERACTIVO":"SINAIS DE FRATURA - INTERATIVO"}</div><FractureSignsSVG lang={lang}/></Card>

            <SL icon="🩹" text={lc.p5} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🩹</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🩹 {lang==="fr"?"IMMOBILISER PUIS REVÉRIFIER - INTERACTIF":lang==="en"?"IMMOBILIZE THEN RECHECK - INTERACTIVE":lang==="es"?"INMOVILIZAR Y VOLVER A COMPROBAR - INTERACTIVO":"IMOBILIZAR E REVERIFICAR - INTERATIVO"}</div><ImmobilizeRecheckSVG lang={lang}/></Card>

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
                {lang==="fr"?"Quiz Final - Brûlures & Fractures":lang==="en"?"Final Quiz - Burns & Fractures":lang==="es"?"Quiz Final - Quemaduras y Fracturas":"Quiz Final - Queimaduras e Fraturas"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 4/8":"questions · Lesson 4/8"}</div>
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
              {lang==="fr"?"LEÇON 5 - BILAN SECONDAIRE →":lang==="en"?"LESSON 5 - SECONDARY ASSESSMENT →":lang==="es"?"LECCIÓN 5 - EVALUACIÓN SECUNDARIA →":"LIÇÃO 5 - AVALIAÇÃO SECUNDÁRIA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
