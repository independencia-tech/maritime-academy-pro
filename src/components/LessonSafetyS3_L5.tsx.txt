import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - SAMPLE HISTORY
function SampleHistorySVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, letter:"S", label:{fr:"Signes & symptômes",en:"Signs & symptoms",es:"Signos y síntomas",pt:"Sinais e sintomas"}, desc:{fr:"Ce que le sauveteur observe (signes) et ce que la victime décrit (symptômes) : douleur, gêne, sensation inhabituelle.",en:"What the rescuer observes (signs) and what the casualty describes (symptoms): pain, discomfort, unusual sensation.",es:"Lo que el socorrista observa (signos) y lo que la víctima describe (síntomas): dolor, molestia, sensación inusual.",pt:"O que o socorrista observa (sinais) e o que a vítima descreve (sintomas): dor, desconforto, sensação invulgar."} },
    { id:2, letter:"A", label:{fr:"Allergies",en:"Allergies",es:"Alergias",pt:"Alergias"}, desc:{fr:"Allergies connues, médicamenteuses ou autres, à signaler avant toute prise en charge médicale ultérieure.",en:"Known allergies, to medication or otherwise, to flag before any further medical care.",es:"Alergias conocidas, a medicamentos u otras, a señalar antes de cualquier atención médica posterior.",pt:"Alergias conhecidas, a medicamentos ou outras, a assinalar antes de qualquer assistência médica posterior."} },
    { id:3, letter:"M", label:{fr:"Médicaments",en:"Medications",es:"Medicamentos",pt:"Medicamentos"}, desc:{fr:"Traitements en cours, prescrits ou non, qui peuvent influencer l'état de la victime ou sa prise en charge.",en:"Current medications, prescribed or not, that can influence the casualty's condition or care.",es:"Tratamientos en curso, prescritos o no, que pueden influir en el estado de la víctima o su atención.",pt:"Tratamentos em curso, prescritos ou não, que podem influenciar o estado da vítima ou os cuidados."} },
    { id:4, letter:"P", label:{fr:"Passé médical",en:"Past medical history",es:"Historial médico",pt:"Historial médico"}, desc:{fr:"Antécédents pertinents : maladies chroniques, chirurgies récentes, épisodes similaires déjà vécus.",en:"Relevant history: chronic conditions, recent surgery, similar episodes already experienced.",es:"Antecedentes relevantes: enfermedades crónicas, cirugías recientes, episodios similares ya vividos.",pt:"Antecedentes relevantes: doenças crónicas, cirurgias recentes, episódios semelhantes já vividos."} },
    { id:5, letter:"L", label:{fr:"Dernier repas",en:"Last meal",es:"Última comida",pt:"Última refeição"}, desc:{fr:"Heure et contenu du dernier repas ou boisson, information utile pour tout relais médical ultérieur.",en:"Time and content of the last meal or drink, useful information for any further medical handover.",es:"Hora y contenido de la última comida o bebida, información útil para cualquier relevo médico posterior.",pt:"Hora e conteúdo da última refeição ou bebida, informação útil para qualquer transferência médica posterior."} },
    { id:6, letter:"E", label:{fr:"Événements",en:"Events",es:"Eventos",pt:"Eventos"}, desc:{fr:"Ce qui s'est passé juste avant : mécanisme de la blessure, contexte, circonstances précises.",en:"What happened just before: mechanism of injury, context, precise circumstances.",es:"Lo que sucedió justo antes: mecanismo de la lesión, contexto, circunstancias precisas.",pt:"O que aconteceu mesmo antes: mecanismo da lesão, contexto, circunstâncias precisas."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(142,68,173,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.purple:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:sel===i.id?C.purple:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.white,flexShrink:0}}>{i.letter}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(142,68,173,0.1)",border:`1px solid ${C.purple}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 2 - HEAD TO TOE SURVEY
function HeadToToeSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🧠", label:{fr:"Tête & cou",en:"Head & neck",es:"Cabeza y cuello",pt:"Cabeça e pescoço"}, desc:{fr:"Chercher plaies, bosses, sensibilité anormale, sans mobiliser le cou en cas de doute sur une lésion cervicale.",en:"Look for wounds, bumps, abnormal tenderness, without moving the neck if a cervical injury is suspected.",es:"Buscar heridas, bultos, sensibilidad anormal, sin mover el cuello si se sospecha una lesión cervical.",pt:"Procurar feridas, saliências, sensibilidade anormal, sem mobilizar o pescoço se houver suspeita de lesão cervical."} },
    { id:2, icon:"🫁", label:{fr:"Thorax & abdomen",en:"Chest & abdomen",es:"Tórax y abdomen",pt:"Tórax e abdómen"}, desc:{fr:"Observer la respiration, palper doucement à la recherche d'une douleur, d'une rigidité ou d'une distension anormale.",en:"Observe breathing, gently palpate for pain, rigidity, or abnormal distension.",es:"Observar la respiración, palpar suavemente en busca de dolor, rigidez o distensión anormal.",pt:"Observar a respiração, palpar suavemente à procura de dor, rigidez ou distensão anormal."} },
    { id:3, icon:"🦴", label:{fr:"Bassin & membres",en:"Pelvis & limbs",es:"Pelvis y miembros",pt:"Bacia e membros"}, desc:{fr:"Vérifier chaque membre un par un, sans forcer aucun mouvement, en comparant les deux côtés du corps.",en:"Check each limb one by one, without forcing any movement, comparing both sides of the body.",es:"Comprobar cada miembro uno por uno, sin forzar ningún movimiento, comparando ambos lados del cuerpo.",pt:"Verificar cada membro um por um, sem forçar qualquer movimento, comparando os dois lados do corpo."} },
    { id:4, icon:"🔄", label:{fr:"Dos",en:"Back",es:"Espalda",pt:"Costas"}, desc:{fr:"Ne pas oublier le dos, souvent négligé, en mobilisant la victime avec la plus grande précaution si nécessaire.",en:"Don't forget the back, often overlooked, moving the casualty with the greatest care if needed.",es:"No olvidar la espalda, a menudo pasada por alto, movilizando a la víctima con la mayor precaución si es necesario.",pt:"Não esquecer as costas, muitas vezes negligenciadas, mobilizando a vítima com o maior cuidado se necessário."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Après le bilan primaire (L1), avant de considérer le tableau complet.":lang==="en"?"After the primary survey (L1), before considering the picture complete.":lang==="es"?"Después del bilan primario (L1), antes de considerar el cuadro completo.":"Após o exame primário (L1), antes de considerar o quadro completo."}</div>
    </div>
  );
}

// SVG 3 - VITAL SIGNS & TRENDING
function VitalSignsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"👁️", label:{fr:"Conscience (LOC)",en:"Consciousness (LOC)",es:"Conciencia (LOC)",pt:"Consciência (LOC)"}, desc:{fr:"Reprendre l'échelle AVPU de la Leçon 1 : Alerte, Voix, Douleur, Aucune réponse.",en:"Reuse the AVPU scale from Lesson 1: Alert, Voice, Pain, Unresponsive.",es:"Retomar la escala AVPU de la Lección 1: Alerta, Voz, Dolor, Sin respuesta.",pt:"Retomar a escala AVPU da Lição 1: Alerta, Voz, Dor, Sem resposta."} },
    { id:2, icon:"🫁", label:{fr:"Respiration : 12 à 20/min (repère)",en:"Breathing: 12 to 20/min (reference)",es:"Respiración: 12 a 20/min (referencia)",pt:"Respiração: 12 a 20/min (referência)"}, desc:{fr:"Compter les mouvements du thorax sur 30 secondes puis multiplier par deux. Un repère, jamais une vérité isolée.",en:"Count chest movements over 30 seconds then multiply by two. A reference point, never an isolated truth.",es:"Contar los movimientos del pecho durante 30 segundos y multiplicar por dos. Una referencia, nunca una verdad aislada.",pt:"Contar os movimentos do peito durante 30 segundos e multiplicar por dois. Uma referência, nunca uma verdade isolada."} },
    { id:3, icon:"💓", label:{fr:"Pouls : 60 à 100/min (repère)",en:"Pulse: 60 to 100/min (reference)",es:"Pulso: 60 a 100/min (referencia)",pt:"Pulso: 60 a 100/min (referência)"}, desc:{fr:"Compter sur 30 secondes puis multiplier par deux, au poignet ou au cou. Un chiffre isolé ne raconte jamais toute l'histoire.",en:"Count over 30 seconds then multiply by two, at the wrist or neck. An isolated number never tells the whole story.",es:"Contar durante 30 segundos y multiplicar por dos, en la muñeca o el cuello. Un número aislado nunca cuenta toda la historia.",pt:"Contar durante 30 segundos e multiplicar por dois, no pulso ou no pescoço. Um número isolado nunca conta toda a história."} },
    { id:4, icon:"🖐️", label:{fr:"Peau : couleur, chaleur, humidité",en:"Skin: color, warmth, moisture",es:"Piel: color, calor, humedad",pt:"Pele: cor, calor, humidade"}, desc:{fr:"Pâle, moite et froide évoque un choc (Leçon 3). À lire toujours avec les autres constantes, jamais seule.",en:"Pale, clammy, and cold suggests shock (Lesson 3). Always read together with the other vitals, never alone.",es:"Pálida, húmeda y fría sugiere shock (Lección 3). Leer siempre junto con las otras constantes, nunca sola.",pt:"Pálida, húmida e fria sugere choque (Lição 3). Ler sempre em conjunto com as outras constantes, nunca sozinha."} },
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
      <div style={{marginTop:10,padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6,textAlign:"center"}}>
        {lang==="fr"?"Une valeur isolée ne suffit jamais : elle se lit toujours avec la conscience, la respiration, la peau et le contexte. La tendance dans le temps compte plus que le chiffre seul.":lang==="en"?"An isolated value is never enough: it is always read together with consciousness, breathing, skin, and context. The trend over time matters more than the number alone.":lang==="es"?"Un valor aislado nunca basta: siempre se lee junto con la conciencia, la respiración, la piel y el contexto. La tendencia en el tiempo importa más que la cifra sola.":"Um valor isolado nunca basta: lê-se sempre em conjunto com a consciência, a respiração, a pele e o contexto. A tendência ao longo do tempo importa mais do que o número isolado."}
      </div>
    </div>
  );
}

// SVG 4 - DOCUMENT & HANDOVER
function DocumentHandoverSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"🕐", label:{fr:"Horodater chaque mesure",en:"Time-stamp every measurement",es:"Poner hora a cada medición",pt:"Registar a hora de cada medição"}, desc:{fr:"Chaque constante notée avec l'heure exacte : sans ça, impossible de voir une tendance se dessiner.",en:"Every vital noted with the exact time: without this, impossible to see a trend emerge.",es:"Cada constante anotada con la hora exacta: sin esto, es imposible ver una tendencia surgir.",pt:"Cada constante anotada com a hora exata: sem isso, é impossível ver uma tendência surgir."} },
    { id:2, icon:"📋", label:{fr:"Résumer le SAMPLE",en:"Summarize SAMPLE",es:"Resumir el SAMPLE",pt:"Resumir o SAMPLE"}, desc:{fr:"Transmettre l'historique complet, pas seulement les constantes du moment.",en:"Pass on the full history, not just the current vitals.",es:"Transmitir el historial completo, no solo las constantes del momento.",pt:"Transmitir o historial completo, não apenas as constantes do momento."} },
    { id:3, icon:"✅", label:{fr:"Lister les gestes déjà faits",en:"List actions already taken",es:"Enumerar los gestos ya realizados",pt:"Listar os gestos já feitos"}, desc:{fr:"Pression directe posée, garrot, attelle : le relais médical doit savoir ce qui a déjà été fait et à quelle heure.",en:"Direct pressure applied, tourniquet, splint: the medical handover must know what has already been done and when.",es:"Presión directa aplicada, torniquete, férula: el relevo médico debe saber qué se ha hecho ya y a qué hora.",pt:"Pressão direta aplicada, torniquete, tala: a transferência médica deve saber o que já foi feito e a que horas."} },
    { id:4, icon:"📡", label:{fr:"Transmettre de façon structurée",en:"Communicate in a structured way",es:"Transmitir de forma estructurada",pt:"Transmitir de forma estruturada"}, desc:{fr:"Un rapport clair et ordonné au TMAS ou à l'équipe MEDEVAC fait gagner un temps précieux à la prise en charge.",en:"A clear, ordered report to the TMAS or MEDEVAC team saves precious time for the care that follows.",es:"Un informe claro y ordenado al TMAS o al equipo MEDEVAC ahorra tiempo precioso a la atención posterior.",pt:"Um relatório claro e ordenado ao TMAS ou à equipa MEDEVAC poupa tempo precioso à assistência seguinte."} },
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

// EXERCISE - MONITORING DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"c",q3:"a",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Une victime a un pouls à 88/min qui semble normal lors du premier contrôle. Que faites-vous ensuite ?\na) Considérer le cas réglé, un seul contrôle suffit\nb) Recontrôler régulièrement pour voir si une tendance se dessine\nc) Ne plus rien noter puisque le chiffre est normal"},
      {id:"q2",q:"Vous venez d'immobiliser une fracture (Leçon 4). Que faites-vous ensuite selon la règle de cette leçon ?\na) Rien, l'intervention est terminée\nb) Attendre 30 minutes avant de reprendre contact avec la victime\nc) Recommencer l'évaluation : l'intervention peut avoir changé l'état de la victime"},
      {id:"q3",q:"Vous transmettez la victime à l'équipe MEDEVAC. Que devez-vous inclure ?\na) Le SAMPLE, l'évolution horodatée des constantes et les gestes déjà faits\nb) Uniquement la dernière constante mesurée\nc) Rien, l'équipe médicale évaluera tout elle-même à l'arrivée"},
      {id:"q4",q:"La peau de la victime devient plus pâle et moite qu'au dernier contrôle. Que faites-vous ?\na) Attendre le prochain contrôle prévu sans rien changer\nb) Considérer cela comme une dégradation et redemander de l'aide médicale sans délai\nc) Ignorer ce changement si le pouls reste dans la norme"},
    ],
    en:[
      {id:"q1",q:"A casualty has a pulse of 88/min that looks normal at the first check. What do you do next?\na) Consider the case settled, one check is enough\nb) Recheck regularly to see if a trend appears\nc) Stop recording since the number is normal"},
      {id:"q2",q:"You just splinted a fracture (Lesson 4). What do you do next according to this lesson's rule?\na) Nothing, the intervention is complete\nb) Wait 30 minutes before checking on the casualty again\nc) Restart the assessment: the intervention may have changed the casualty's condition"},
      {id:"q3",q:"You are handing the casualty over to the MEDEVAC team. What should you include?\na) The SAMPLE, the time-stamped trend of vitals, and actions already taken\nb) Only the last measured vital\nc) Nothing, the medical team will assess everything themselves on arrival"},
      {id:"q4",q:"The casualty's skin becomes paler and clammier than at the last check. What do you do?\na) Wait for the next scheduled check without changing anything\nb) Consider this a deterioration and ask for medical assistance again without delay\nc) Ignore this change if the pulse stays within normal range"},
    ],
    es:[
      {id:"q1",q:"Una víctima tiene un pulso de 88/min que parece normal en el primer control. ¿Qué haces después?\na) Considerar el caso resuelto, un solo control basta\nb) Volver a comprobar regularmente para ver si aparece una tendencia\nc) Dejar de anotar ya que la cifra es normal"},
      {id:"q2",q:"Acabas de entablillar una fractura (Lección 4). ¿Qué haces después según la regla de esta lección?\na) Nada, la intervención terminó\nb) Esperar 30 minutos antes de volver a revisar a la víctima\nc) Reiniciar la evaluación: la intervención puede haber cambiado el estado de la víctima"},
      {id:"q3",q:"Estás entregando la víctima al equipo MEDEVAC. ¿Qué debes incluir?\na) El SAMPLE, la evolución horaria de las constantes y los gestos ya realizados\nb) Solo la última constante medida\nc) Nada, el equipo médico evaluará todo por sí mismo a su llegada"},
      {id:"q4",q:"La piel de la víctima se vuelve más pálida y húmeda que en el último control. ¿Qué haces?\na) Esperar al próximo control previsto sin cambiar nada\nb) Considerarlo una degradación y volver a pedir ayuda médica sin demora\nc) Ignorar este cambio si el pulso se mantiene normal"},
    ],
    pt:[
      {id:"q1",q:"Uma vítima tem um pulso de 88/min que parece normal no primeiro controlo. O que fazes a seguir?\na) Considerar o caso resolvido, um único controlo basta\nb) Voltar a verificar regularmente para ver se surge uma tendência\nc) Deixar de anotar já que o número é normal"},
      {id:"q2",q:"Acabaste de entalar uma fratura (Lição 4). O que fazes a seguir segundo a regra desta lição?\na) Nada, a intervenção terminou\nb) Esperar 30 minutos antes de voltar a verificar a vítima\nc) Recomeçar a avaliação: a intervenção pode ter mudado o estado da vítima"},
      {id:"q3",q:"Estás a entregar a vítima à equipa MEDEVAC. O que deves incluir?\na) O SAMPLE, a evolução horária das constantes e os gestos já feitos\nb) Apenas a última constante medida\nc) Nada, a equipa médica avaliará tudo sozinha à chegada"},
      {id:"q4",q:"A pele da vítima fica mais pálida e húmida do que no último controlo. O que fazes?\na) Esperar pelo próximo controlo previsto sem mudar nada\nb) Considerar isto uma degradação e voltar a pedir ajuda médica sem demora\nc) Ignorar esta mudança se o pulso se mantiver normal"},
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

// ACCIDENT CASE - COMPOSITE CASE (THE APPARENTLY STABLE SAILOR)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Le Marin Stable en Apparence",teaser:"Cas composite - une seule mesure a rassuré tout le monde, à tort",
      what:"Un marin fait une chute et se cogne au flanc. Le bilan primaire (L1) ne trouve rien d'alarmant, ses constantes semblent normales, il est envoyé se reposer dans sa cabine. Personne ne reprend ses constantes ensuite. Une heure plus tard, on le retrouve pâle, confus, avec un pouls devenu rapide et faible : les signes d'un choc décompensé (L3) qui s'est installé progressivement, sans que personne ne le voie venir faute de second contrôle.",
      cause:"• Une seule mesure de constantes a été prise, jugée rassurante, puis plus rien\n• Personne n'a programmé de nouveau contrôle après l'intervention initiale\n• Le marin a été considéré comme 'stable' de façon définitive, alors qu'aucun état ne l'est jamais\n• Une heure sans surveillance a suffi à masquer une dégradation progressive",
      lessons:"✓ A Snapshot Lies. A Trend Tells the Truth : une mesure isolée n'aurait jamais dû clore le suivi\n✓ Après toute intervention ou tout changement d'état, on recommence l'évaluation, sans exception\n✓ Aucun patient n'est stable définitivement, ce mot n'existe pas en secourisme\n✓ Le choc progresse par étapes (L3) : seule une surveillance répétée permet de le voir venir avant l'urgence vitale",
      link:"🔗 Ce cas illustre directement pourquoi la surveillance répétée et l'horodatage des constantes ne sont jamais optionnels, même quand tout semble aller bien au premier regard."},
    en:{title:"Case Study - The Apparently Stable Sailor",teaser:"Composite case - a single measurement reassured everyone, wrongly",
      what:"A sailor falls and hits his side. The primary survey (L1) finds nothing alarming, his vitals seem normal, he is sent to rest in his cabin. No one rechecks his vitals afterward. An hour later, he is found pale, confused, with a fast and weak pulse: the signs of decompensated shock (L3) that set in progressively, with no one seeing it coming because of the missing second check.",
      cause:"• Only one vital signs measurement was taken, judged reassuring, then nothing more\n• No one scheduled a further check after the initial intervention\n• The sailor was considered 'stable' for good, when no state ever truly is\n• One hour without monitoring was enough to hide a gradual deterioration",
      lessons:"✓ A Snapshot Lies. A Trend Tells the Truth: a single reading should never have closed the follow-up\n✓ After any intervention or change in condition, the assessment restarts, without exception\n✓ No patient is ever stable for good, that word doesn't exist in first aid\n✓ Shock progresses in stages (L3): only repeated monitoring lets you see it coming before it becomes a vital emergency",
      link:"🔗 This case directly illustrates why repeated monitoring and time-stamping vitals are never optional, even when everything seems fine at first glance."},
    es:{title:"Caso de estudio - El Marinero Aparentemente Estable",teaser:"Caso compuesto - una única medición tranquilizó a todos, erróneamente",
      what:"Un marinero se cae y se golpea el costado. El bilan primario (L1) no encuentra nada alarmante, sus constantes parecen normales, lo envían a descansar a su camarote. Nadie vuelve a comprobar sus constantes después. Una hora después, lo encuentran pálido, confuso, con un pulso rápido y débil: los signos de un shock descompensado (L3) que se instaló progresivamente, sin que nadie lo viera venir por falta de un segundo control.",
      cause:"• Solo se tomó una medición de constantes, considerada tranquilizadora, y luego nada más\n• Nadie programó un nuevo control tras la intervención inicial\n• El marinero fue considerado 'estable' de forma definitiva, cuando ningún estado lo es jamás\n• Una hora sin vigilancia bastó para ocultar una degradación progresiva",
      lessons:"✓ A Snapshot Lies. A Trend Tells the Truth: una medición aislada nunca debería haber cerrado el seguimiento\n✓ Tras cualquier intervención o cambio de estado, se reinicia la evaluación, sin excepción\n✓ Ningún paciente está jamás estable de forma definitiva, esa palabra no existe en primeros auxilios\n✓ El shock progresa por etapas (L3): solo la vigilancia repetida permite verlo venir antes de la urgencia vital",
      link:"🔗 Este caso ilustra directamente por qué la vigilancia repetida y el registro horario de las constantes nunca son opcionales, incluso cuando todo parece ir bien a primera vista."},
    pt:{title:"Caso de estudo - O Marinheiro Aparentemente Estável",teaser:"Caso composto - uma única medição tranquilizou todos, erradamente",
      what:"Um marinheiro cai e bate no flanco. O exame primário (L1) não encontra nada alarmante, as suas constantes parecem normais, é enviado para descansar na cabine. Ninguém volta a verificar as suas constantes depois. Uma hora depois, é encontrado pálido, confuso, com um pulso rápido e fraco: os sinais de um choque descompensado (L3) que se instalou progressivamente, sem que ninguém o visse chegar por falta de um segundo controlo.",
      cause:"• Foi feita apenas uma medição de constantes, considerada tranquilizadora, e depois nada mais\n• Ninguém agendou um novo controlo após a intervenção inicial\n• O marinheiro foi considerado 'estável' de forma definitiva, quando nenhum estado o é alguma vez\n• Uma hora sem vigilância bastou para esconder uma degradação progressiva",
      lessons:"✓ A Snapshot Lies. A Trend Tells the Truth: uma medição isolada nunca deveria ter encerrado o acompanhamento\n✓ Após qualquer intervenção ou mudança de estado, a avaliação recomeça, sem exceção\n✓ Nenhum paciente está alguma vez estável de forma definitiva, essa palavra não existe em primeiros socorros\n✓ O choque progride por etapas (L3): só a vigilância repetida permite vê-lo chegar antes da urgência vital",
      link:"🔗 Este caso ilustra diretamente por que a vigilância repetida e o registo horário das constantes nunca são opcionais, mesmo quando tudo parece correr bem à primeira vista."},
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
    {q:"Que signifie le principe 'A Snapshot Lies. A Trend Tells the Truth' ?",opts:["Une seule mesure suffit toujours à juger de l'état d'une victime","Une mesure isolée peut rassurer à tort ; seule l'évolution dans le temps révèle une dégradation","Il ne faut jamais prendre de constantes","Les instruments de mesure sont toujours faux"],correct:1,expl:"Une mesure isolée peut sembler normale alors même qu'une dégradation est en cours."},
    {q:"Que signifie SAMPLE ?",opts:["Un protocole de premiers secours pour les brûlures","Signes/Symptômes, Allergies, Médicaments, Passé médical, Last meal, Événements","Une échelle de gravité des blessures","Un type d'attelle"],correct:1,expl:"SAMPLE est le mnémonique standard pour recueillir l'historique d'une victime."},
    {q:"Quand réalise-t-on le bilan tête-aux-pieds ?",opts:["Avant le bilan primaire (DRABC)","Après le bilan primaire, une fois les urgences vitales écartées","Uniquement si la victime le demande","Jamais en mer, faute de matériel"],correct:1,expl:"Le bilan secondaire vient après le DRABC, pour chercher ce qui aurait pu être manqué."},
    {q:"Quelle est la fréquence respiratoire normale de repère chez l'adulte au repos ?",opts:["5 à 10/min","12 à 20/min","30 à 40/min","Il n'existe aucun repère utile"],correct:1,expl:"12 à 20 respirations par minute est le repère standard chez l'adulte au repos."},
    {q:"Le pouls normal de repère chez l'adulte se situe autour de :",opts:["20 à 40/min","60 à 100/min","150 à 180/min","Il n'existe aucun repère utile"],correct:1,expl:"60 à 100/min est le repère pédagogique standard, à interpréter avec le reste du tableau."},
    {q:"Une valeur de pouls dans la norme signifie-t-elle que tout va bien ?",opts:["Oui, systématiquement","Pas nécessairement : elle doit être interprétée avec la conscience, la respiration, la peau et le contexte","Oui, c'est le seul indicateur qui compte","Non, le pouls n'a aucune utilité"],correct:1,expl:"Une valeur isolée, même normale, ne remplace jamais une lecture globale et répétée."},
    {q:"Que faut-il faire après toute intervention (attelle, pression, garrot) selon la règle opérationnelle de cette leçon ?",opts:["Rien, l'intervention suffit","Recommencer l'évaluation : l'état de la victime peut avoir changé","Attendre une heure avant de revérifier","Considérer le patient stable définitivement"],correct:1,expl:"Toute intervention ou tout changement d'état impose de reprendre l'évaluation depuis le début."},
    {q:"Un patient peut-il être considéré comme 'stable définitivement' ?",opts:["Oui, une fois les premiers gestes faits","Non, cet état n'existe pas : la surveillance doit continuer jusqu'à la prise en charge médicale","Oui, si le pouls est normal","Oui, après le bilan tête-aux-pieds"],correct:1,expl:"Aucun état n'est figé ; la surveillance continue est indispensable jusqu'au relais médical."},
    {q:"Que faut-il inclure dans la transmission à un relais médical (TMAS, MEDEVAC) ?",opts:["Uniquement la dernière constante mesurée","Le SAMPLE, l'évolution horodatée des constantes, et les gestes déjà faits","Rien, l'équipe médicale évaluera tout à l'arrivée","Seulement l'heure de l'accident"],correct:1,expl:"Une transmission complète permet au relais médical de comprendre l'évolution, pas seulement l'instant présent."},
    {q:"Pourquoi horodater chaque mesure de constantes ?",opts:["Ce n'est pas nécessaire","Sans l'heure exacte, impossible de voir une tendance se dessiner","Uniquement pour respecter une procédure administrative","Pour remplir le temps"],correct:1,expl:"L'horodatage est ce qui transforme une série de chiffres isolés en une tendance interprétable."},
    {q:"Dans le cas d'étude du Marin Stable en Apparence, quelle a été l'erreur principale ?",opts:["Un mauvais bilan primaire initial","Une seule mesure de constantes suivie d'aucun recontrôle avant la dégradation","Un manque de matériel médical à bord","Une mauvaise communication radio"],correct:1,expl:"L'absence totale de recontrôle a masqué une dégradation progressive vers un choc décompensé."},
    {q:"Une victime dont la peau devient plus pâle et plus moite qu'au dernier contrôle : que faire ?",opts:["Attendre le prochain contrôle prévu sans rien changer","Considérer cela comme une dégradation et redemander de l'aide médicale sans délai","Ignorer si le pouls reste dans la norme","Ne rien noter, ce n'est pas mesurable précisément"],correct:1,expl:"Tout changement de tendance, même sans chiffre alarmant isolé, impose une réévaluation immédiate."},
    {q:"Le bilan tête-aux-pieds inclut-il l'examen du dos ?",opts:["Non, le dos n'est jamais examiné","Oui, souvent négligé, à examiner avec précaution si nécessaire","Non, uniquement si la victime le signale","Oui, mais uniquement chez les officiers"],correct:1,expl:"Le dos est une zone fréquemment oubliée du bilan secondaire, à ne pas négliger."},
    {q:"Ce module enseigne-t-il l'interprétation clinique experte des constantes vitales ?",opts:["Oui, un niveau clinique complet","Non, il enseigne une surveillance structurée, jamais un substitut à un professionnel médical","Oui, mais uniquement pour les cas graves","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne la discipline de la surveillance, pas l'interprétation clinique experte."},
    {q:"Quel est l'objectif principal de cette leçon dans le MAP Medical Mindset ?",opts:["Remplacer le bilan primaire","Approfondir l'étape Monitor et préparer un Handover structuré","Remplacer l'étape Protect","Éviter tout contact avec la victime"],correct:1,expl:"Cette leçon développe en détail l'étape Monitor, essentielle avant un Handover réussi."},
  ],
  en:[
    {q:"What does the principle 'A Snapshot Lies. A Trend Tells the Truth' mean?",opts:["A single measurement is always enough to judge a casualty's condition","An isolated measurement can wrongly reassure; only the trend over time reveals deterioration","Vitals should never be taken","Measuring instruments are always wrong"],correct:1,expl:"An isolated reading can look normal even while a deterioration is underway."},
    {q:"What does SAMPLE stand for?",opts:["A first aid protocol for burns","Signs/Symptoms, Allergies, Medications, Past medical history, Last meal, Events","A severity scale for injuries","A type of splint"],correct:1,expl:"SAMPLE is the standard mnemonic for gathering a casualty's history."},
    {q:"When is the head-to-toe survey performed?",opts:["Before the primary survey (DRABC)","After the primary survey, once life-threats are ruled out","Only if the casualty asks for it","Never at sea, for lack of equipment"],correct:1,expl:"The secondary survey comes after DRABC, to look for what could have been missed."},
    {q:"What is the normal reference breathing rate for an adult at rest?",opts:["5 to 10/min","12 to 20/min","30 to 40/min","There is no useful reference"],correct:1,expl:"12 to 20 breaths per minute is the standard reference for an adult at rest."},
    {q:"The normal reference pulse for an adult is around:",opts:["20 to 40/min","60 to 100/min","150 to 180/min","There is no useful reference"],correct:1,expl:"60 to 100/min is the standard pedagogical reference, to be interpreted with the rest of the picture."},
    {q:"Does a normal pulse value mean everything is fine?",opts:["Yes, systematically","Not necessarily: it must be interpreted with consciousness, breathing, skin, and context","Yes, it's the only indicator that matters","No, pulse has no use at all"],correct:1,expl:"An isolated value, even normal, never replaces a full, repeated reading."},
    {q:"What should be done after any intervention (splint, pressure, tourniquet) according to this lesson's operational rule?",opts:["Nothing, the intervention is enough","Restart the assessment: the casualty's condition may have changed","Wait an hour before rechecking","Consider the patient stable for good"],correct:1,expl:"Any intervention or change in condition requires restarting the assessment from the beginning."},
    {q:"Can a patient ever be considered 'stable for good'?",opts:["Yes, once the first actions are done","No, that state doesn't exist: monitoring must continue until medical care takes over","Yes, if the pulse is normal","Yes, after the head-to-toe survey"],correct:1,expl:"No state is ever fixed; continuous monitoring is essential until medical handover."},
    {q:"What should be included when handing over to a medical relay (TMAS, MEDEVAC)?",opts:["Only the last measured vital","The SAMPLE, the time-stamped trend of vitals, and actions already taken","Nothing, the medical team will assess everything on arrival","Only the time of the accident"],correct:1,expl:"A complete handover lets the medical relay understand the evolution, not just the current instant."},
    {q:"Why time-stamp every vital sign measurement?",opts:["It isn't necessary","Without the exact time, it's impossible to see a trend emerge","Only to follow an administrative procedure","To fill time"],correct:1,expl:"Time-stamping is what turns a series of isolated numbers into an interpretable trend."},
    {q:"In the Apparently Stable Sailor case study, what was the main mistake?",opts:["A poor initial primary survey","A single vitals measurement followed by no recheck before the deterioration","A lack of medical equipment on board","Poor radio communication"],correct:1,expl:"The total absence of a recheck hid a gradual deterioration into decompensated shock."},
    {q:"A casualty whose skin becomes paler and clammier than at the last check: what do you do?",opts:["Wait for the next scheduled check without changing anything","Consider this a deterioration and ask for medical assistance again without delay","Ignore it if the pulse stays within normal range","Don't note it, it isn't precisely measurable"],correct:1,expl:"Any change in trend, even without an isolated alarming number, requires immediate reassessment."},
    {q:"Does the head-to-toe survey include examining the back?",opts:["No, the back is never examined","Yes, often overlooked, to be examined carefully if needed","No, only if the casualty mentions it","Yes, but only for officers"],correct:1,expl:"The back is a frequently forgotten area of the secondary survey, not to be neglected."},
    {q:"Does this module teach expert clinical interpretation of vital signs?",opts:["Yes, a full clinical level","No, it teaches structured monitoring, never a replacement for a medical professional","Yes, but only for severe cases","No, it is useless without equipment"],correct:1,expl:"MAP teaches the discipline of monitoring, not expert clinical interpretation."},
    {q:"What is the main goal of this lesson within the MAP Medical Mindset?",opts:["Replace the primary survey","Deepen the Monitor step and prepare for a structured Handover","Replace the Protect step","Avoid all contact with the casualty"],correct:1,expl:"This lesson develops the Monitor step in detail, essential before a successful Handover."},
  ],
  es:[
    {q:"¿Qué significa el principio 'A Snapshot Lies. A Trend Tells the Truth'?",opts:["Una sola medición siempre basta para juzgar el estado de una víctima","Una medición aislada puede tranquilizar erróneamente; solo la evolución en el tiempo revela una degradación","Nunca hay que tomar constantes","Los instrumentos de medición siempre se equivocan"],correct:1,expl:"Una lectura aislada puede parecer normal aunque haya una degradación en curso."},
    {q:"¿Qué significa SAMPLE?",opts:["Un protocolo de primeros auxilios para quemaduras","Signos/Síntomas, Alergias, Medicamentos, Historial médico, Última comida, Eventos","Una escala de gravedad de lesiones","Un tipo de férula"],correct:1,expl:"SAMPLE es el mnemónico estándar para recoger el historial de una víctima."},
    {q:"¿Cuándo se realiza el bilan tête-aux-pieds?",opts:["Antes del bilan primario (DRABC)","Después del bilan primario, una vez descartadas las urgencias vitales","Solo si la víctima lo pide","Nunca en el mar, por falta de material"],correct:1,expl:"El bilan secundario viene después del DRABC, para buscar lo que se pudo haber pasado por alto."},
    {q:"¿Cuál es la frecuencia respiratoria normal de referencia en el adulto en reposo?",opts:["5 a 10/min","12 a 20/min","30 a 40/min","No existe ninguna referencia útil"],correct:1,expl:"12 a 20 respiraciones por minuto es la referencia estándar en el adulto en reposo."},
    {q:"El pulso normal de referencia en el adulto se sitúa alrededor de:",opts:["20 a 40/min","60 a 100/min","150 a 180/min","No existe ninguna referencia útil"],correct:1,expl:"60 a 100/min es la referencia pedagógica estándar, a interpretar junto con el resto del cuadro."},
    {q:"¿Un valor de pulso dentro de la norma significa que todo va bien?",opts:["Sí, siempre","No necesariamente: debe interpretarse junto con la conciencia, la respiración, la piel y el contexto","Sí, es el único indicador que importa","No, el pulso no sirve de nada"],correct:1,expl:"Un valor aislado, aunque normal, nunca sustituye una lectura global y repetida."},
    {q:"¿Qué hay que hacer tras cualquier intervención (férula, presión, torniquete) según la regla operativa de esta lección?",opts:["Nada, la intervención basta","Reiniciar la evaluación: el estado de la víctima puede haber cambiado","Esperar una hora antes de volver a comprobar","Considerar al paciente estable de forma definitiva"],correct:1,expl:"Cualquier intervención o cambio de estado exige reiniciar la evaluación desde el principio."},
    {q:"¿Puede considerarse a un paciente 'estable de forma definitiva'?",opts:["Sí, una vez hechos los primeros gestos","No, ese estado no existe: la vigilancia debe continuar hasta la atención médica","Sí, si el pulso es normal","Sí, después del bilan tête-aux-pieds"],correct:1,expl:"Ningún estado es fijo; la vigilancia continua es indispensable hasta el relevo médico."},
    {q:"¿Qué hay que incluir en la transmisión a un relevo médico (TMAS, MEDEVAC)?",opts:["Solo la última constante medida","El SAMPLE, la evolución horaria de las constantes, y los gestos ya realizados","Nada, el equipo médico evaluará todo a su llegada","Solo la hora del accidente"],correct:1,expl:"Una transmisión completa permite al relevo médico entender la evolución, no solo el instante presente."},
    {q:"¿Por qué poner hora a cada medición de constantes?",opts:["No es necesario","Sin la hora exacta, es imposible ver una tendencia surgir","Solo para cumplir un procedimiento administrativo","Para llenar el tiempo"],correct:1,expl:"Poner la hora es lo que convierte una serie de cifras aisladas en una tendencia interpretable."},
    {q:"En el caso de estudio del Marinero Aparentemente Estable, ¿cuál fue el error principal?",opts:["Un mal bilan primario inicial","Una sola medición de constantes seguida de ningún recontrol antes de la degradación","Falta de material médico a bordo","Mala comunicación por radio"],correct:1,expl:"La ausencia total de recontrol ocultó una degradación progresiva hacia un shock descompensado."},
    {q:"Una víctima cuya piel se vuelve más pálida y húmeda que en el último control: ¿qué haces?",opts:["Esperar al próximo control previsto sin cambiar nada","Considerarlo una degradación y volver a pedir ayuda médica sin demora","Ignorarlo si el pulso se mantiene normal","No anotarlo, no es medible con precisión"],correct:1,expl:"Cualquier cambio de tendencia, aunque no haya una cifra aislada alarmante, exige una reevaluación inmediata."},
    {q:"¿El bilan tête-aux-pieds incluye el examen de la espalda?",opts:["No, la espalda nunca se examina","Sí, a menudo pasada por alto, a examinar con cuidado si es necesario","No, solo si la víctima lo menciona","Sí, pero solo para oficiales"],correct:1,expl:"La espalda es una zona frecuentemente olvidada del bilan secundario, que no debe descuidarse."},
    {q:"¿Este módulo enseña la interpretación clínica experta de las constantes vitales?",opts:["Sí, un nivel clínico completo","No, enseña una vigilancia estructurada, nunca un sustituto de un profesional médico","Sí, pero solo para casos graves","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña la disciplina de la vigilancia, no la interpretación clínica experta."},
    {q:"¿Cuál es el objetivo principal de esta lección en el MAP Medical Mindset?",opts:["Sustituir el bilan primario","Profundizar en la etapa Monitor y preparar un Handover estructurado","Sustituir la etapa Protect","Evitar todo contacto con la víctima"],correct:1,expl:"Esta lección desarrolla en detalle la etapa Monitor, esencial antes de un Handover exitoso."},
  ],
  pt:[
    {q:"O que significa o princípio 'A Snapshot Lies. A Trend Tells the Truth'?",opts:["Uma única medição basta sempre para julgar o estado de uma vítima","Uma medição isolada pode tranquilizar erradamente; só a evolução no tempo revela uma degradação","Nunca se devem tirar constantes","Os instrumentos de medição estão sempre errados"],correct:1,expl:"Uma leitura isolada pode parecer normal mesmo havendo uma degradação em curso."},
    {q:"O que significa SAMPLE?",opts:["Um protocolo de primeiros socorros para queimaduras","Sinais/Sintomas, Alergias, Medicamentos, Historial médico, Última refeição, Eventos","Uma escala de gravidade de lesões","Um tipo de tala"],correct:1,expl:"SAMPLE é o mnemónico padrão para recolher o historial de uma vítima."},
    {q:"Quando se realiza o exame tête-aux-pieds?",opts:["Antes do exame primário (DRABC)","Depois do exame primário, uma vez afastadas as urgências vitais","Só se a vítima o pedir","Nunca no mar, por falta de material"],correct:1,expl:"O exame secundário vem depois do DRABC, para procurar o que possa ter sido esquecido."},
    {q:"Qual é a frequência respiratória normal de referência no adulto em repouso?",opts:["5 a 10/min","12 a 20/min","30 a 40/min","Não existe nenhuma referência útil"],correct:1,expl:"12 a 20 respirações por minuto é a referência padrão no adulto em repouso."},
    {q:"O pulso normal de referência no adulto situa-se por volta de:",opts:["20 a 40/min","60 a 100/min","150 a 180/min","Não existe nenhuma referência útil"],correct:1,expl:"60 a 100/min é a referência pedagógica padrão, a interpretar com o resto do quadro."},
    {q:"Um valor de pulso dentro da norma significa que está tudo bem?",opts:["Sim, sempre","Não necessariamente: deve ser interpretado com a consciência, a respiração, a pele e o contexto","Sim, é o único indicador que importa","Não, o pulso não serve de nada"],correct:1,expl:"Um valor isolado, mesmo normal, nunca substitui uma leitura global e repetida."},
    {q:"O que fazer após qualquer intervenção (tala, pressão, torniquete) segundo a regra operacional desta lição?",opts:["Nada, a intervenção basta","Recomeçar a avaliação: o estado da vítima pode ter mudado","Esperar uma hora antes de reverificar","Considerar o paciente estável de forma definitiva"],correct:1,expl:"Qualquer intervenção ou mudança de estado exige recomeçar a avaliação desde o início."},
    {q:"Pode um paciente ser considerado 'estável de forma definitiva'?",opts:["Sim, assim que feitos os primeiros gestos","Não, esse estado não existe: a vigilância deve continuar até à assistência médica","Sim, se o pulso for normal","Sim, depois do exame tête-aux-pieds"],correct:1,expl:"Nenhum estado é fixo; a vigilância contínua é indispensável até à transferência médica."},
    {q:"O que deve ser incluído na transferência para um relevo médico (TMAS, MEDEVAC)?",opts:["Apenas a última constante medida","O SAMPLE, a evolução horária das constantes, e os gestos já feitos","Nada, a equipa médica avaliará tudo à chegada","Apenas a hora do acidente"],correct:1,expl:"Uma transferência completa permite ao relevo médico compreender a evolução, não só o instante presente."},
    {q:"Por que registar a hora de cada medição de constantes?",opts:["Não é necessário","Sem a hora exata, é impossível ver uma tendência surgir","Só para cumprir um procedimento administrativo","Para preencher o tempo"],correct:1,expl:"Registar a hora é o que transforma uma série de números isolados numa tendência interpretável."},
    {q:"No caso de estudo do Marinheiro Aparentemente Estável, qual foi o erro principal?",opts:["Um mau exame primário inicial","Uma única medição de constantes seguida de nenhum recontrolo antes da degradação","Falta de material médico a bordo","Má comunicação por rádio"],correct:1,expl:"A ausência total de recontrolo escondeu uma degradação progressiva para um choque descompensado."},
    {q:"Uma vítima cuja pele fica mais pálida e húmida do que no último controlo: o que fazes?",opts:["Esperar pelo próximo controlo previsto sem mudar nada","Considerar isto uma degradação e voltar a pedir ajuda médica sem demora","Ignorar se o pulso se mantiver normal","Não anotar, não é mensurável com precisão"],correct:1,expl:"Qualquer mudança de tendência, mesmo sem um número isolado alarmante, exige uma reavaliação imediata."},
    {q:"O exame tête-aux-pieds inclui o exame das costas?",opts:["Não, as costas nunca são examinadas","Sim, muitas vezes negligenciado, a examinar com cuidado se necessário","Não, só se a vítima o mencionar","Sim, mas só para oficiais"],correct:1,expl:"As costas são uma zona frequentemente esquecida do exame secundário, que não deve ser negligenciada."},
    {q:"Este módulo ensina a interpretação clínica especializada dos sinais vitais?",opts:["Sim, um nível clínico completo","Não, ensina uma vigilância estruturada, nunca um substituto de um profissional médico","Sim, mas só para casos graves","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina a disciplina da vigilância, não a interpretação clínica especializada."},
    {q:"Qual é o objetivo principal desta lição no MAP Medical Mindset?",opts:["Substituir o exame primário","Aprofundar a etapa Monitor e preparar um Handover estruturado","Substituir a etapa Protect","Evitar todo o contacto com a vítima"],correct:1,expl:"Esta lição desenvolve em detalhe a etapa Monitor, essencial antes de um Handover bem-sucedido."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'A Snapshot Lies. A Trend Tells the Truth' ?",opts:["Une seule mesure suffit toujours","Une mesure isolée peut rassurer à tort ; la tendance dans le temps révèle la réalité","Il ne faut jamais mesurer les constantes","Les appareils de mesure sont peu fiables"],correct:1,expl:"Seule l'évolution dans le temps permet de détecter une dégradation."},
    {q:"Que signifie SAMPLE ?",opts:["Un type de pansement","Signes/Symptômes, Allergies, Médicaments, Passé médical, Last meal, Événements","Une échelle de douleur","Un protocole de RCP"],correct:1,expl:"SAMPLE structure le recueil de l'historique de la victime."},
    {q:"Que faire après toute intervention selon la règle de cette leçon ?",opts:["Rien, l'intervention suffit","Recommencer l'évaluation depuis le début","Attendre une heure sans agir","Considérer le patient stable définitivement"],correct:1,expl:"Toute intervention ou changement d'état impose de reprendre l'évaluation."},
    {q:"Un patient peut-il être 'stable définitivement' ?",opts:["Oui, après le premier contrôle","Non, la surveillance doit continuer jusqu'à la prise en charge médicale","Oui, si le pouls est normal","Oui, dès que les gestes sont faits"],correct:1,expl:"Aucun état n'est figé ; la surveillance continue est indispensable."},
    {q:"Que faut-il transmettre à un relais médical ?",opts:["Uniquement la dernière constante","Le SAMPLE, l'évolution horodatée et les gestes déjà faits","Rien de précis","Seulement l'heure de l'accident"],correct:1,expl:"Une transmission complète permet de comprendre l'évolution, pas seulement l'instant présent."},
  ],
  en:[
    {q:"What does 'A Snapshot Lies. A Trend Tells the Truth' mean?",opts:["A single measurement is always enough","An isolated measurement can wrongly reassure; the trend over time reveals reality","Vitals should never be measured","Measuring devices are unreliable"],correct:1,expl:"Only the trend over time reveals a deterioration."},
    {q:"What does SAMPLE stand for?",opts:["A type of dressing","Signs/Symptoms, Allergies, Medications, Past medical history, Last meal, Events","A pain scale","A CPR protocol"],correct:1,expl:"SAMPLE structures gathering the casualty's history."},
    {q:"What should be done after any intervention according to this lesson's rule?",opts:["Nothing, the intervention is enough","Restart the assessment from the beginning","Wait an hour without acting","Consider the patient stable for good"],correct:1,expl:"Any intervention or change in condition requires restarting the assessment."},
    {q:"Can a patient ever be 'stable for good'?",opts:["Yes, after the first check","No, monitoring must continue until medical care takes over","Yes, if the pulse is normal","Yes, as soon as actions are taken"],correct:1,expl:"No state is ever fixed; continuous monitoring is essential."},
    {q:"What should be handed over to a medical relay?",opts:["Only the last vital","The SAMPLE, the time-stamped trend, and actions already taken","Nothing specific","Only the time of the accident"],correct:1,expl:"A complete handover allows understanding the evolution, not just the current instant."},
  ],
  es:[
    {q:"¿Qué significa 'A Snapshot Lies. A Trend Tells the Truth'?",opts:["Una sola medición siempre basta","Una medición aislada puede tranquilizar erróneamente; la tendencia en el tiempo revela la realidad","Nunca hay que medir las constantes","Los aparatos de medición no son fiables"],correct:1,expl:"Solo la evolución en el tiempo permite detectar una degradación."},
    {q:"¿Qué significa SAMPLE?",opts:["Un tipo de vendaje","Signos/Síntomas, Alergias, Medicamentos, Historial médico, Última comida, Eventos","Una escala de dolor","Un protocolo de RCP"],correct:1,expl:"SAMPLE estructura la recogida del historial de la víctima."},
    {q:"¿Qué hacer tras cualquier intervención según la regla de esta lección?",opts:["Nada, la intervención basta","Reiniciar la evaluación desde el principio","Esperar una hora sin actuar","Considerar al paciente estable de forma definitiva"],correct:1,expl:"Cualquier intervención o cambio de estado exige reiniciar la evaluación."},
    {q:"¿Puede un paciente estar 'estable de forma definitiva'?",opts:["Sí, tras el primer control","No, la vigilancia debe continuar hasta la atención médica","Sí, si el pulso es normal","Sí, en cuanto se hacen los gestos"],correct:1,expl:"Ningún estado es fijo; la vigilancia continua es indispensable."},
    {q:"¿Qué hay que transmitir a un relevo médico?",opts:["Solo la última constante","El SAMPLE, la evolución horaria y los gestos ya realizados","Nada concreto","Solo la hora del accidente"],correct:1,expl:"Una transmisión completa permite entender la evolución, no solo el instante presente."},
  ],
  pt:[
    {q:"O que significa 'A Snapshot Lies. A Trend Tells the Truth'?",opts:["Uma única medição basta sempre","Uma medição isolada pode tranquilizar erradamente; a tendência no tempo revela a realidade","Nunca se devem medir as constantes","Os aparelhos de medição não são fiáveis"],correct:1,expl:"Só a evolução no tempo permite detetar uma degradação."},
    {q:"O que significa SAMPLE?",opts:["Um tipo de penso","Sinais/Sintomas, Alergias, Medicamentos, Historial médico, Última refeição, Eventos","Uma escala de dor","Um protocolo de RCP"],correct:1,expl:"SAMPLE estrutura a recolha do historial da vítima."},
    {q:"O que fazer após qualquer intervenção segundo a regra desta lição?",opts:["Nada, a intervenção basta","Recomeçar a avaliação desde o início","Esperar uma hora sem agir","Considerar o paciente estável de forma definitiva"],correct:1,expl:"Qualquer intervenção ou mudança de estado exige recomeçar a avaliação."},
    {q:"Pode um paciente estar 'estável de forma definitiva'?",opts:["Sim, após o primeiro controlo","Não, a vigilância deve continuar até à assistência médica","Sim, se o pulso for normal","Sim, assim que os gestos são feitos"],correct:1,expl:"Nenhum estado é fixo; a vigilância contínua é indispensável."},
    {q:"O que deve ser transmitido a um relevo médico?",opts:["Apenas a última constante","O SAMPLE, a evolução horária e os gestos já feitos","Nada de concreto","Apenas a hora do acidente"],correct:1,expl:"Uma transferência completa permite compreender a evolução, não só o instante presente."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"As-tu deja considere qu'une victime allait bien apres un seul controle, sans jamais revenir verifier ?",
    en:"Have you ever assumed a casualty was fine after a single check, without ever coming back to verify?",
    es:"¿Alguna vez has asumido que una victima estaba bien tras un solo control, sin volver nunca a comprobarlo?",
    pt:"Ja alguma vez assumiste que uma vitima estava bem apos um unico controlo, sem nunca voltar a verificar?",
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
      badge:"🩺 Safety · STCW First Aid · Leçon 5/8 · ⭐ Premium",
      title:"Secondary Assessment & Patient Monitoring",
      intro:"Cette leçon ne traite pas une urgence précise : elle enseigne la discipline qui protège toutes les autres. Surveiller, documenter, ne jamais s'arrêter à une seule mesure.",
      p0:"A SNAPSHOT LIES. A TREND TELLS THE TRUTH.",s0t:"Le principe qui structure toute la leçon",
      s0:"Une mesure isolée peut sembler rassurante alors qu'une dégradation est déjà en cours. Seule la répétition dans le temps révèle la vérité.\n\nCOMMENT LE RECONNAÎTRE ? Un changement entre deux mesures, même léger, même si chaque valeur prise seule semble normale.\nQUE FAIRE IMMÉDIATEMENT ? Recueillir le SAMPLE, faire le bilan tête-aux-pieds, prendre les constantes et les horodater.\nQUELLE ERREUR L'AGGRAVE ? Se contenter d'un seul contrôle et considérer le cas clos.\nQUAND DEMANDER DE L'AIDE MÉDICALE ? Dès qu'une tendance négative apparaît, même si la dernière valeur semble normale.",
      p1:"SAMPLE HISTORY",s1t:"Recueillir l'historique complet",
      s1:"Signes/Symptômes, Allergies, Médicaments, Passé médical, Last meal, Événements : six catégories d'information qui orientent la prise en charge et la transmission.",
      p2:"LE BILAN TÊTE-AUX-PIEDS",s2t:"Ce que le bilan primaire n'a pas eu le temps de voir",
      s2:"Une fois les urgences vitales écartées (L1), un examen systématique de la tête aux pieds permet de découvrir des blessures secondaires, y compris au dos, souvent oublié.",
      p3:"LES CONSTANTES VITALES",s3t:"Des repères, jamais des verdicts",
      s3:"Conscience, respiration (12 à 20/min chez l'adulte au repos), pouls (60 à 100/min chez l'adulte), état de la peau : quatre indicateurs à toujours lire ensemble et jamais isolément.",
      p4:"NEVER STABLE FOR GOOD",s4t:"La règle opérationnelle de cette leçon",
      s4:"Après toute intervention ou tout changement de l'état de la victime, on recommence l'évaluation. Aucun patient n'est jamais considéré comme stable de façon définitive.",
      p5:"DOCUMENTER & TRANSMETTRE",s5t:"Ce qui rend le relais médical vraiment utile",
      s5:"Horodater chaque mesure, résumer le SAMPLE, lister les gestes déjà faits, transmettre de façon structurée : c'est ce qui permet à un professionnel de comprendre l'évolution, pas seulement l'instant présent.",
      p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"⚠️ CAS D'ÉTUDE",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 5",
      sumP:["A Snapshot Lies. A Trend Tells the Truth : une mesure isolée ne suffit jamais","SAMPLE : Signes/Symptômes, Allergies, Médicaments, Passé médical, Last meal, Événements","Bilan tête-aux-pieds après le bilan primaire, sans oublier le dos","Respiration 12-20/min, pouls 60-100/min : des repères à lire avec le contexte, jamais seuls","Never Stable For Good : toute intervention ou changement d'état impose de recommencer l'évaluation"],
      learnedP:["Le recueil du SAMPLE","Le bilan tête-aux-pieds","La lecture des constantes en contexte, jamais isolément","La règle Never Stable For Good","La documentation horodatée et la transmission structurée"],
      safetyMsg:"A single measurement can reassure. Only repeated, honest monitoring over time protects the casualty until professional medical care takes over.",
    },
    en:{
      badge:"🩺 Safety · STCW First Aid · Lesson 5/8 · ⭐ Premium",
      title:"Secondary Assessment & Patient Monitoring",
      intro:"This lesson doesn't deal with one specific emergency: it teaches the discipline that protects every other one. Monitor, document, never stop at a single measurement.",
      p0:"A SNAPSHOT LIES. A TREND TELLS THE TRUTH.",s0t:"The principle that structures the whole lesson",
      s0:"An isolated measurement can look reassuring while a deterioration is already underway. Only repetition over time reveals the truth.\n\nHOW DO I RECOGNIZE IT? A change between two measurements, even a slight one, even if each value alone seems normal.\nWHAT DO I DO IMMEDIATELY? Gather the SAMPLE, perform the head-to-toe survey, take vitals and time-stamp them.\nWHAT MISTAKE MAKES IT WORSE? Settling for a single check and considering the case closed.\nWHEN MUST I ASK FOR MEDICAL ASSISTANCE? As soon as a negative trend appears, even if the last value seems normal.",
      p1:"SAMPLE HISTORY",s1t:"Gathering the full history",
      s1:"Signs/Symptoms, Allergies, Medications, Past medical history, Last meal, Events: six categories of information that guide care and handover.",
      p2:"THE HEAD-TO-TOE SURVEY",s2t:"What the primary survey didn't have time to see",
      s2:"Once life threats are ruled out (L1), a systematic head-to-toe examination reveals secondary injuries, including on the back, often forgotten.",
      p3:"VITAL SIGNS",s3t:"Reference points, never verdicts",
      s3:"Consciousness, breathing (12 to 20/min for an adult at rest), pulse (60 to 100/min for an adult), skin condition: four indicators always to be read together, never in isolation.",
      p4:"NEVER STABLE FOR GOOD",s4t:"This lesson's operational rule",
      s4:"After any intervention or any change in the casualty's condition, the assessment restarts. No patient is ever considered stable for good.",
      p5:"DOCUMENT & HANDOVER",s5t:"What makes a medical handover truly useful",
      s5:"Time-stamping every measurement, summarizing the SAMPLE, listing actions already taken, communicating in a structured way: this is what lets a professional understand the evolution, not just the current instant.",
      p6:"🎯 OPERATIONAL EXERCISE",p7:"⚠️ CASE STUDY",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 5",
      sumP:["A Snapshot Lies. A Trend Tells the Truth: an isolated measurement is never enough","SAMPLE: Signs/Symptoms, Allergies, Medications, Past medical history, Last meal, Events","Head-to-toe survey after the primary survey, not forgetting the back","Breathing 12-20/min, pulse 60-100/min: reference points to read with context, never alone","Never Stable For Good: any intervention or change in condition requires restarting the assessment"],
      learnedP:["Gathering the SAMPLE","The head-to-toe survey","Reading vitals in context, never in isolation","The Never Stable For Good rule","Time-stamped documentation and structured handover"],
      safetyMsg:"A single measurement can reassure. Only repeated, honest monitoring over time protects the casualty until professional medical care takes over.",
    },
    es:{
      badge:"🩺 Safety · STCW First Aid · Lección 5/8 · ⭐ Premium",
      title:"Secondary Assessment & Patient Monitoring",
      intro:"Esta lección no trata una urgencia concreta: enseña la disciplina que protege a todas las demás. Vigilar, documentar, no detenerse nunca en una sola medición.",
      p0:"A SNAPSHOT LIES. A TREND TELLS THE TRUTH.",s0t:"El principio que estructura toda la lección",
      s0:"Una medición aislada puede parecer tranquilizadora aunque ya haya una degradación en curso. Solo la repetición en el tiempo revela la verdad.\n\n¿CÓMO RECONOCERLO? Un cambio entre dos mediciones, aunque sea leve, aunque cada valor por separado parezca normal.\n¿QUÉ HACER DE INMEDIATO? Recoger el SAMPLE, hacer el bilan tête-aux-pieds, tomar las constantes y ponerles la hora.\n¿QUÉ ERROR LO AGRAVA? Conformarse con un solo control y considerar el caso cerrado.\n¿CUÁNDO PEDIR AYUDA MÉDICA? En cuanto aparezca una tendencia negativa, incluso si el último valor parece normal.",
      p1:"SAMPLE HISTORY",s1t:"Recoger el historial completo",
      s1:"Signos/Síntomas, Alergias, Medicamentos, Historial médico, Última comida, Eventos: seis categorías de información que orientan la atención y la transmisión.",
      p2:"EL BILAN TÊTE-AUX-PIEDS",s2t:"Lo que el bilan primario no tuvo tiempo de ver",
      s2:"Una vez descartadas las urgencias vitales (L1), un examen sistemático de la cabeza a los pies revela lesiones secundarias, incluida la espalda, a menudo olvidada.",
      p3:"LAS CONSTANTES VITALES",s3t:"Referencias, nunca veredictos",
      s3:"Conciencia, respiración (12 a 20/min en el adulto en reposo), pulso (60 a 100/min en el adulto), estado de la piel: cuatro indicadores que siempre deben leerse juntos, nunca de forma aislada.",
      p4:"NEVER STABLE FOR GOOD",s4t:"La regla operativa de esta lección",
      s4:"Tras cualquier intervención o cambio en el estado de la víctima, se reinicia la evaluación. Ningún paciente se considera nunca estable de forma definitiva.",
      p5:"DOCUMENTAR Y TRANSMITIR",s5t:"Lo que hace que un relevo médico sea realmente útil",
      s5:"Poner hora a cada medición, resumir el SAMPLE, enumerar los gestos ya realizados, transmitir de forma estructurada: esto es lo que permite a un profesional entender la evolución, no solo el instante presente.",
      p6:"🎯 EJERCICIO OPERATIVO",p7:"⚠️ CASO DE ESTUDIO",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 5",
      sumP:["A Snapshot Lies. A Trend Tells the Truth: una medición aislada nunca basta","SAMPLE: Signos/Síntomas, Alergias, Medicamentos, Historial médico, Última comida, Eventos","Bilan tête-aux-pieds después del bilan primario, sin olvidar la espalda","Respiración 12-20/min, pulso 60-100/min: referencias a leer con el contexto, nunca solas","Never Stable For Good: cualquier intervención o cambio de estado exige reiniciar la evaluación"],
      learnedP:["La recogida del SAMPLE","El bilan tête-aux-pieds","La lectura de las constantes en contexto, nunca aisladas","La regla Never Stable For Good","La documentación horaria y la transmisión estructurada"],
      safetyMsg:"A single measurement can reassure. Only repeated, honest monitoring over time protects the casualty until professional medical care takes over.",
    },
    pt:{
      badge:"🩺 Safety · STCW First Aid · Lição 5/8 · ⭐ Premium",
      title:"Secondary Assessment & Patient Monitoring",
      intro:"Esta lição não trata de uma urgência específica: ensina a disciplina que protege todas as outras. Vigiar, documentar, nunca parar numa única medição.",
      p0:"A SNAPSHOT LIES. A TREND TELLS THE TRUTH.",s0t:"O princípio que estrutura toda a lição",
      s0:"Uma medição isolada pode parecer tranquilizadora quando já existe uma degradação em curso. Só a repetição no tempo revela a verdade.\n\nCOMO RECONHECER? Uma mudança entre duas medições, mesmo ligeira, mesmo que cada valor isolado pareça normal.\nO QUE FAZER IMEDIATAMENTE? Recolher o SAMPLE, fazer o exame tête-aux-pieds, tirar as constantes e registar a hora.\nQUE ERRO O AGRAVA? Contentar-se com um único controlo e considerar o caso encerrado.\nQUANDO PEDIR AJUDA MÉDICA? Assim que surgir uma tendência negativa, mesmo que o último valor pareça normal.",
      p1:"SAMPLE HISTORY",s1t:"Recolher o historial completo",
      s1:"Sinais/Sintomas, Alergias, Medicamentos, Historial médico, Última refeição, Eventos: seis categorias de informação que orientam os cuidados e a transferência.",
      p2:"O EXAME TÊTE-AUX-PIEDS",s2t:"O que o exame primário não teve tempo de ver",
      s2:"Uma vez afastadas as urgências vitais (L1), um exame sistemático da cabeça aos pés revela lesões secundárias, incluindo nas costas, muitas vezes esquecidas.",
      p3:"AS CONSTANTES VITAIS",s3t:"Referências, nunca veredictos",
      s3:"Consciência, respiração (12 a 20/min no adulto em repouso), pulso (60 a 100/min no adulto), estado da pele: quatro indicadores a ler sempre em conjunto, nunca isoladamente.",
      p4:"NEVER STABLE FOR GOOD",s4t:"A regra operacional desta lição",
      s4:"Após qualquer intervenção ou mudança do estado da vítima, recomeça-se a avaliação. Nenhum paciente é alguma vez considerado estável de forma definitiva.",
      p5:"DOCUMENTAR E TRANSMITIR",s5t:"O que torna uma transferência médica realmente útil",
      s5:"Registar a hora de cada medição, resumir o SAMPLE, listar os gestos já feitos, transmitir de forma estruturada: é isto que permite a um profissional compreender a evolução, não apenas o instante presente.",
      p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"⚠️ CASO DE ESTUDO",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 5",
      sumP:["A Snapshot Lies. A Trend Tells the Truth: uma medição isolada nunca basta","SAMPLE: Sinais/Sintomas, Alergias, Medicamentos, Historial médico, Última refeição, Eventos","Exame tête-aux-pieds depois do exame primário, sem esquecer as costas","Respiração 12-20/min, pulso 60-100/min: referências a ler com o contexto, nunca sozinhas","Never Stable For Good: qualquer intervenção ou mudança de estado exige recomeçar a avaliação"],
      learnedP:["A recolha do SAMPLE","O exame tête-aux-pieds","A leitura das constantes em contexto, nunca isoladamente","A regra Never Stable For Good","A documentação horária e a transferência estruturada"],
      safetyMsg:"A single measurement can reassure. Only repeated, honest monitoring over time protects the casualty until professional medical care takes over.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS3_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 5/8":lang==="en"?"Lesson 5/8":lang==="es"?"Lección 5/8":"Lição 5/8"}</div>
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

            <SL icon="📈" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📈</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="📋" text={lc.p1} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📋</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📋 {lang==="fr"?"SAMPLE - INTERACTIF":lang==="en"?"SAMPLE - INTERACTIVE":lang==="es"?"SAMPLE - INTERACTIVO":"SAMPLE - INTERATIVO"}</div><SampleHistorySVG lang={lang}/></Card>

            <SL icon="🧍" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧍</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧍 {lang==="fr"?"BILAN TÊTE-AUX-PIEDS - INTERACTIF":lang==="en"?"HEAD-TO-TOE SURVEY - INTERACTIVE":lang==="es"?"BILAN TÊTE-AUX-PIEDS - INTERACTIVO":"EXAME TÊTE-AUX-PIEDS - INTERATIVO"}</div><HeadToToeSVG lang={lang}/></Card>

            <SL icon="💓" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💓</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>💓 {lang==="fr"?"CONSTANTES VITALES - INTERACTIF":lang==="en"?"VITAL SIGNS - INTERACTIVE":lang==="es"?"CONSTANTES VITALES - INTERACTIVO":"CONSTANTES VITAIS - INTERATIVO"}</div><VitalSignsSVG lang={lang}/></Card>

            <SL icon="🔁" text={lc.p4} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔁</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>

            <SL icon="📡" text={lc.p5} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📡 {lang==="fr"?"DOCUMENTER & TRANSMETTRE - INTERACTIF":lang==="en"?"DOCUMENT & HANDOVER - INTERACTIVE":lang==="es"?"DOCUMENTAR Y TRANSMITIR - INTERACTIVO":"DOCUMENTAR E TRANSMITIR - INTERATIVO"}</div><DocumentHandoverSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p7} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank}/></Card>

            <SL icon="🪞" text={lc.p9} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final - Bilan Secondaire":lang==="en"?"Final Quiz - Secondary Assessment":lang==="es"?"Quiz Final - Evaluación Secundaria":"Quiz Final - Avaliação Secundária"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 5/8":"questions · Lesson 5/8"}</div>
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

            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 6 - URGENCES MÉDICALES EN MER →":lang==="en"?"LESSON 6 - MEDICAL EMERGENCIES AT SEA →":lang==="es"?"LECCIÓN 6 - URGENCIAS MÉDICAS EN EL MAR →":"LIÇÃO 6 - EMERGÊNCIAS MÉDICAS NO MAR →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
