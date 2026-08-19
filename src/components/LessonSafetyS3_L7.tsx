import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - MEDICINE CHEST CATEGORIES
function MedicineChestSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"💊", label:{fr:"Analgésiques & fièvre",en:"Analgesics & fever",es:"Analgésicos y fiebre",pt:"Analgésicos e febre"}, desc:{fr:"Catégorie pour la douleur et la fièvre, dosages toujours définis par le TMAS ou selon le guide médical de bord, jamais improvisés.",en:"Category for pain and fever, dosages always set by TMAS or the onboard medical guide, never improvised.",es:"Categoría para el dolor y la fiebre, dosis siempre definidas por el TMAS o la guía médica de a bordo, nunca improvisadas.",pt:"Categoria para a dor e a febre, doses sempre definidas pelo TMAS ou pelo guia médico de bordo, nunca improvisadas."} },
    { id:2, icon:"❤️", label:{fr:"Urgences cardiovasculaires",en:"Cardiovascular emergencies",es:"Urgencias cardiovasculares",pt:"Urgências cardiovasculares"}, desc:{fr:"Médicaments réservés aux situations vitales, sous instruction du TMAS uniquement.",en:"Medications reserved for vital situations, only under TMAS instruction.",es:"Medicamentos reservados para situaciones vitales, solo bajo instrucción del TMAS.",pt:"Medicamentos reservados para situações vitais, apenas sob instrução do TMAS."} },
    { id:3, icon:"🫁", label:{fr:"Respiratoire",en:"Respiratory",es:"Respiratorio",pt:"Respiratório"}, desc:{fr:"Traitements pour les difficultés respiratoires, incluant l'auto-injecteur d'adrénaline vu en Leçon 6.",en:"Treatments for breathing difficulties, including the epinephrine auto-injector seen in Lesson 6.",es:"Tratamientos para las dificultades respiratorias, incluido el autoinyector de adrenalina visto en la Lección 6.",pt:"Tratamentos para as dificuldades respiratórias, incluindo o autoinjetor de adrenalina visto na Lição 6."} },
    { id:4, icon:"🩹", label:{fr:"Soins de plaies",en:"Wound care",es:"Cuidado de heridas",pt:"Cuidados de feridas"}, desc:{fr:"Pansements, antiseptiques, matériel de suture de base pour compléter les gestes des Leçons 3 et 4.",en:"Dressings, antiseptics, basic suturing material to complement the actions from Lessons 3 and 4.",es:"Vendajes, antisépticos, material básico de sutura para completar los gestos de las Lecciones 3 y 4.",pt:"Pensos, antisséticos, material básico de sutura para complementar os gestos das Lições 3 e 4."} },
    { id:5, icon:"🚨", label:{fr:"Réanimation",en:"Resuscitation",es:"Reanimación",pt:"Reanimação"}, desc:{fr:"Matériel et produits utilisés uniquement dans les situations vitales déjà vues en Leçon 2.",en:"Equipment and products used only in the vital situations already seen in Lesson 2.",es:"Material y productos usados solo en las situaciones vitales ya vistas en la Lección 2.",pt:"Material e produtos usados apenas nas situações vitais já vistas na Lição 2."} },
    { id:6, icon:"🔒", label:{fr:"Substances contrôlées",en:"Controlled substances",es:"Sustancias controladas",pt:"Substâncias controladas"}, desc:{fr:"Sous double-verrouillage et registre obligatoire, chaque utilisation tracée avec heure et quantité exacte.",en:"Under double-lock and a mandatory logbook, every use tracked with exact time and quantity.",es:"Bajo doble cierre y registro obligatorio, cada uso rastreado con hora y cantidad exactas.",pt:"Sob duplo trancamento e registo obrigatório, cada utilização rastreada com hora e quantidade exatas."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.muted,textAlign:"center"}}>{lang==="fr"?"Catégories seulement : aucun nom de médicament ni dosage précis n'est enseigné ici.":lang==="en"?"Categories only: no specific drug name or dosage is taught here.":lang==="es"?"Solo categorías: no se enseña ningún nombre de medicamento ni dosis precisa aquí.":"Apenas categorias: nenhum nome de medicamento nem dose precisa é ensinado aqui."}</div>
    </div>
  );
}

// SVG 2 - STORAGE & EXPIRY DISCIPLINE
function StorageExpirySVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"📅", label:{fr:"Inventaire régulier",en:"Regular inventory",es:"Inventario regular",pt:"Inventário regular"}, desc:{fr:"Contrôler périodiquement le contenu complet de la pharmacie, pas seulement au moment d'une urgence.",en:"Periodically check the full contents of the chest, not only at the moment of an emergency.",es:"Comprobar periódicamente el contenido completo del botiquín, no solo en el momento de una urgencia.",pt:"Verificar periodicamente o conteúdo completo da farmácia, não apenas no momento de uma urgência."} },
    { id:2, icon:"⏳", label:{fr:"Dates de péremption",en:"Expiry dates",es:"Fechas de caducidad",pt:"Datas de validade"}, desc:{fr:"Un produit périmé peut être inefficace voire dangereux : il doit être identifié et remplacé avant d'en avoir besoin.",en:"An expired product can be ineffective or even dangerous: it must be identified and replaced before it's needed.",es:"Un producto caducado puede ser ineficaz o incluso peligroso: debe identificarse y sustituirse antes de necesitarlo.",pt:"Um produto fora de validade pode ser ineficaz ou mesmo perigoso: deve ser identificado e substituído antes de ser necessário."} },
    { id:3, icon:"🌡️", label:{fr:"Conditions de conservation",en:"Storage conditions",es:"Condiciones de conservación",pt:"Condições de conservação"}, desc:{fr:"Certains produits, comme l'auto-injecteur d'adrénaline (Leçon 6), exigent une température précise pour rester efficaces.",en:"Some products, like the epinephrine auto-injector (Lesson 6), require a precise temperature to remain effective.",es:"Algunos productos, como el autoinyector de adrenalina (Lección 6), exigen una temperatura precisa para seguir siendo eficaces.",pt:"Alguns produtos, como o autoinjetor de adrenalina (Lição 6), exigem uma temperatura precisa para continuarem eficazes."} },
    { id:4, icon:"🔐", label:{fr:"Double-verrouillage & registre",en:"Double-lock & logbook",es:"Doble cierre y registro",pt:"Duplo trancamento e registo"}, desc:{fr:"Les substances contrôlées sont sous double clé, avec un registre où chaque prélèvement est noté : date, heure, quantité, personne.",en:"Controlled substances are under double lock, with a logbook where every withdrawal is recorded: date, time, quantity, person.",es:"Las sustancias controladas están bajo doble llave, con un registro donde se anota cada extracción: fecha, hora, cantidad, persona.",pt:"As substâncias controladas estão sob dupla chave, com um registo onde cada retirada é anotada: data, hora, quantidade, pessoa."} },
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

// SVG 3 - BEFORE CALLING TMAS CHECKLIST
function TMASChecklistSVG({ lang }) {
  const [checked, setChecked] = useState({});
  const items = [
    { id:1, label:{fr:"SAMPLE",en:"SAMPLE",es:"SAMPLE",pt:"SAMPLE"} },
    { id:2, label:{fr:"Évolution des constantes vitales",en:"Vital signs trend",es:"Evolución de las constantes vitales",pt:"Evolução das constantes vitais"} },
    { id:3, label:{fr:"Traitement déjà administré",en:"Treatment already given",es:"Tratamiento ya administrado",pt:"Tratamento já administrado"} },
    { id:4, label:{fr:"Heure de chaque observation",en:"Time of each observation",es:"Hora de cada observación",pt:"Hora de cada observação"} },
    { id:5, label:{fr:"Identification du patient",en:"Patient identification",es:"Identificación del paciente",pt:"Identificação do paciente"} },
    { id:6, label:{fr:"Position du navire",en:"Position of the vessel",es:"Posición del buque",pt:"Posição do navio"} },
    { id:7, label:{fr:"Moyen de communication prêt",en:"Communication method ready",es:"Método de comunicación listo",pt:"Método de comunicação pronto"} },
  ];
  const toggle = id => setChecked(c=>({...c,[id]:!c[id]}));
  const allDone = items.every(i=>checked[i.id]);
  return (
    <div>
      <div style={{fontSize:11,color:C.gold2,fontFamily:"'Cinzel',serif",letterSpacing:1,marginBottom:10,textAlign:"center"}}>{lang==="fr"?"BEFORE CALLING TMAS":lang==="en"?"BEFORE CALLING TMAS":lang==="es"?"BEFORE CALLING TMAS":"BEFORE CALLING TMAS"}</div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>toggle(i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:checked[i.id]?"rgba(30,138,74,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${checked[i.id]?C.green:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:20,height:20,borderRadius:6,background:checked[i.id]?C.green:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:C.white,flexShrink:0}}>{checked[i.id]?"✓":""}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {allDone&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.12)",border:`1px solid ${C.green}44`,fontSize:11,color:C.green,fontWeight:700,textAlign:"center"}}>{lang==="fr"?"Prêt à appeler le TMAS.":lang==="en"?"Ready to call TMAS.":lang==="es"?"Listo para llamar al TMAS.":"Pronto para chamar o TMAS."}</div>}
    </div>
  );
}

// SVG 4 - RECEIVING INSTRUCTIONS: READ BACK
function ReadBackSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"📥", label:{fr:"Recevoir l'instruction",en:"Receive the instruction",es:"Recibir la instrucción",pt:"Receber a instrução"}, desc:{fr:"Écouter entièrement l'instruction du médecin TMAS avant de réagir, sans l'interrompre.",en:"Listen to the TMAS doctor's instruction fully before reacting, without interrupting.",es:"Escuchar por completo la instrucción del médico del TMAS antes de reaccionar, sin interrumpir.",pt:"Ouvir por completo a instrução do médico do TMAS antes de reagir, sem interromper."} },
    { id:2, icon:"🔁", label:{fr:"Read Back",en:"Read Back",es:"Read Back",pt:"Read Back"}, desc:{fr:"Répéter mot pour mot l'instruction reçue, comme en aviation, avant de l'exécuter. Cela permet de détecter une incompréhension avant qu'elle ne devienne une erreur.",en:"Repeat the instruction received word for word, as in aviation, before executing it. This catches a misunderstanding before it becomes a mistake.",es:"Repetir palabra por palabra la instrucción recibida, como en aviación, antes de ejecutarla. Esto permite detectar un malentendido antes de que se convierta en un error.",pt:"Repetir palavra por palavra a instrução recebida, como na aviação, antes de a executar. Isto permite detetar um mal-entendido antes que se torne um erro."} },
    { id:3, icon:"✅", label:{fr:"Confirmer",en:"Confirm",es:"Confirmar",pt:"Confirmar"}, desc:{fr:"Le médecin confirme que le Read Back est exact, ou corrige immédiatement si nécessaire.",en:"The doctor confirms the Read Back is correct, or corrects it immediately if needed.",es:"El médico confirma que el Read Back es correcto, o lo corrige de inmediato si es necesario.",pt:"O médico confirma que o Read Back está correto, ou corrige de imediato se necessário."} },
    { id:4, icon:"📝", label:{fr:"Documenter",en:"Document",es:"Documentar",pt:"Documentar"}, desc:{fr:"Consigner immédiatement dans le Medical Log : produit, quantité, heure, instruction reçue, qui l'a exécutée.",en:"Immediately record in the Medical Log: product, quantity, time, instruction received, who carried it out.",es:"Registrar de inmediato en el Medical Log: producto, cantidad, hora, instrucción recibida, quién la ejecutó.",pt:"Registar de imediato no Medical Log: produto, quantidade, hora, instrução recebida, quem a executou."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(77,166,255,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.blue2:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{s.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(77,166,255,0.1)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// EXERCISE - MEDICINE CHEST & TMAS DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"c",q3:"a",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous trouvez un produit périmé dans la pharmacie de bord. Que faites-vous ?\na) L'utiliser quand même s'il reste efficace visuellement\nb) L'identifier et le remplacer avant d'en avoir besoin\nc) Le laisser en place, ça ne change rien"},
      {id:"q2",q:"Le médecin TMAS vous donne une instruction de dosage. Que faites-vous avant de l'exécuter ?\na) L'exécuter immédiatement sans rien redire\nb) Demander un deuxième avis médical avant d'agir\nc) Répéter mot pour mot l'instruction (Read Back) et attendre sa confirmation"},
      {id:"q3",q:"Vous vous apprêtez à appeler le TMAS. Que devez-vous avoir préparé ?\na) SAMPLE, évolution des constantes, position du navire, traitements déjà donnés\nb) Rien, le médecin posera toutes les questions nécessaires\nc) Uniquement le nom de la victime"},
      {id:"q4",q:"Vous venez d'administrer un médicament sous instruction du TMAS. Que faites-vous immédiatement après ?\na) Rien, l'administration suffit\nb) Consigner dans le Medical Log : produit, quantité, heure, instruction reçue\nc) Attendre la fin du voyage pour tout noter d'un coup"},
    ],
    en:[
      {id:"q1",q:"You find an expired product in the medicine chest. What do you do?\na) Use it anyway if it still looks effective\nb) Identify it and replace it before it's needed\nc) Leave it in place, it doesn't change anything"},
      {id:"q2",q:"The TMAS doctor gives you a dosage instruction. What do you do before executing it?\na) Execute it immediately without saying anything\nb) Ask for a second medical opinion before acting\nc) Repeat the instruction word for word (Read Back) and wait for confirmation"},
      {id:"q3",q:"You are about to call TMAS. What should you have prepared?\na) SAMPLE, vitals trend, vessel position, treatments already given\nb) Nothing, the doctor will ask all the necessary questions\nc) Only the casualty's name"},
      {id:"q4",q:"You just administered a medication under TMAS instruction. What do you do immediately after?\na) Nothing, administering is enough\nb) Record in the Medical Log: product, quantity, time, instruction received\nc) Wait until the end of the voyage to note everything at once"},
    ],
    es:[
      {id:"q1",q:"Encuentras un producto caducado en el botiquín. ¿Qué haces?\na) Usarlo de todos modos si parece eficaz visualmente\nb) Identificarlo y sustituirlo antes de necesitarlo\nc) Dejarlo en su sitio, no cambia nada"},
      {id:"q2",q:"El médico del TMAS te da una instrucción de dosis. ¿Qué haces antes de ejecutarla?\na) Ejecutarla de inmediato sin decir nada\nb) Pedir una segunda opinión médica antes de actuar\nc) Repetir la instrucción palabra por palabra (Read Back) y esperar su confirmación"},
      {id:"q3",q:"Estás a punto de llamar al TMAS. ¿Qué debes haber preparado?\na) SAMPLE, evolución de las constantes, posición del buque, tratamientos ya administrados\nb) Nada, el médico hará todas las preguntas necesarias\nc) Solo el nombre de la víctima"},
      {id:"q4",q:"Acabas de administrar un medicamento bajo instrucción del TMAS. ¿Qué haces inmediatamente después?\na) Nada, administrarlo basta\nb) Registrar en el Medical Log: producto, cantidad, hora, instrucción recibida\nc) Esperar al final del viaje para anotarlo todo de una vez"},
    ],
    pt:[
      {id:"q1",q:"Encontras um produto fora de validade na farmácia de bordo. O que fazes?\na) Usá-lo mesmo assim se ainda parecer eficaz visualmente\nb) Identificá-lo e substituí-lo antes de ser necessário\nc) Deixá-lo no lugar, não muda nada"},
      {id:"q2",q:"O médico do TMAS dá-te uma instrução de dose. O que fazes antes de a executar?\na) Executá-la de imediato sem dizer nada\nb) Pedir uma segunda opinião médica antes de agir\nc) Repetir a instrução palavra por palavra (Read Back) e esperar pela confirmação"},
      {id:"q3",q:"Estás prestes a chamar o TMAS. O que deves ter preparado?\na) SAMPLE, evolução das constantes, posição do navio, tratamentos já administrados\nb) Nada, o médico fará todas as perguntas necessárias\nc) Apenas o nome da vítima"},
      {id:"q4",q:"Acabaste de administrar um medicamento sob instrução do TMAS. O que fazes imediatamente a seguir?\na) Nada, administrar basta\nb) Registar no Medical Log: produto, quantidade, hora, instrução recebida\nc) Esperar pelo fim da viagem para anotar tudo de uma vez"},
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

// ACCIDENT CASE - COMPOSITE CASE (THE INCOMPLETE CALL)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - L'Appel Incomplet",teaser:"Cas composite - un appel au TMAS sans préparation, qui coûte de précieuses minutes",
      what:"Un membre d'équipage se sent mal et l'équipage contacte le TMAS sans avoir préparé la moindre information. Le médecin demande la fréquence respiratoire, le pouls, et leur évolution dans le temps. L'équipage répond : 'Nous ne savons pas.' Le médecin doit alors guider l'équipage pas à pas pour obtenir les informations de base, perdant plusieurs minutes précieuses avant de pouvoir donner un avis utile.",
      cause:"• Aucun SAMPLE préparé avant l'appel\n• Aucune constante prise ni horodatée depuis le début de l'incident (Leçon 5 non appliquée)\n• Aucun traitement déjà donné n'a été noté\n• L'équipage a appelé par réflexe, sans se donner le temps de rassembler l'information d'abord",
      lessons:"✓ Good Information Saves Lives : le meilleur médecin du monde ne peut rien faire avec de mauvaises informations\n✓ La check-list Before Calling TMAS existe précisément pour éviter ce scénario\n✓ Ce cas montre directement pourquoi la Leçon 5 (bilan secondaire et surveillance) existait : sans elle, il n'y a rien à transmettre\n✓ The Ship Never Prescribes. It Assesses, Reports and Executes : sans un rapport de qualité, l'exécution ne peut pas suivre",
      link:"🔗 Ce cas illustre directement pourquoi la préparation de l'appel TMAS n'est jamais optionnelle, même dans l'urgence, surtout dans l'urgence."},
    en:{title:"Case Study - The Incomplete Call",teaser:"Composite case - a TMAS call made without preparation, costing precious minutes",
      what:"A crew member feels unwell and the crew contacts TMAS without having prepared any information at all. The doctor asks for the breathing rate, the pulse, and how they have evolved over time. The crew answers: 'We don't know.' The doctor then has to guide the crew step by step to obtain basic information, losing several precious minutes before being able to give useful advice.",
      cause:"• No SAMPLE prepared before the call\n• No vitals taken or time-stamped since the incident began (Lesson 5 not applied)\n• No treatment already given was recorded\n• The crew called on reflex, without taking the time to gather information first",
      lessons:"✓ Good Information Saves Lives: the best doctor in the world can do nothing with poor information\n✓ The Before Calling TMAS checklist exists precisely to prevent this scenario\n✓ This case directly shows why Lesson 5 (secondary assessment and monitoring) existed: without it, there is nothing to hand over\n✓ The Ship Never Prescribes. It Assesses, Reports and Executes: without a quality report, execution cannot follow",
      link:"🔗 This case directly illustrates why preparing the TMAS call is never optional, even in an emergency, especially in an emergency."},
    es:{title:"Caso de estudio - La Llamada Incompleta",teaser:"Caso compuesto - una llamada al TMAS sin preparación, que cuesta minutos preciosos",
      what:"Un tripulante se siente mal y la tripulación contacta con el TMAS sin haber preparado ninguna información. El médico pide la frecuencia respiratoria, el pulso, y su evolución en el tiempo. La tripulación responde: 'No lo sabemos.' El médico debe entonces guiar a la tripulación paso a paso para obtener información básica, perdiendo varios minutos preciosos antes de poder dar un consejo útil.",
      cause:"• Ningún SAMPLE preparado antes de la llamada\n• Ninguna constante tomada ni con hora desde el inicio del incidente (Lección 5 no aplicada)\n• Ningún tratamiento ya administrado fue anotado\n• La tripulación llamó por reflejo, sin darse tiempo para reunir la información primero",
      lessons:"✓ Good Information Saves Lives: el mejor médico del mundo no puede hacer nada con mala información\n✓ La checklist Before Calling TMAS existe precisamente para evitar este escenario\n✓ Este caso muestra directamente por qué existía la Lección 5 (bilan secundario y vigilancia): sin ella, no hay nada que transmitir\n✓ The Ship Never Prescribes. It Assesses, Reports and Executes: sin un informe de calidad, la ejecución no puede seguir",
      link:"🔗 Este caso ilustra directamente por qué preparar la llamada al TMAS nunca es opcional, incluso en la urgencia, sobre todo en la urgencia."},
    pt:{title:"Caso de estudo - A Chamada Incompleta",teaser:"Caso composto - uma chamada ao TMAS sem preparação, que custa minutos preciosos",
      what:"Um tripulante sente-se mal e a tripulação contacta o TMAS sem ter preparado qualquer informação. O médico pede a frequência respiratória, o pulso, e a sua evolução no tempo. A tripulação responde: 'Não sabemos.' O médico tem então de guiar a tripulação passo a passo para obter informação básica, perdendo vários minutos preciosos antes de poder dar um conselho útil.",
      cause:"• Nenhum SAMPLE preparado antes da chamada\n• Nenhuma constante tirada nem com hora desde o início do incidente (Lição 5 não aplicada)\n• Nenhum tratamento já administrado foi anotado\n• A tripulação ligou por reflexo, sem se dar tempo para reunir a informação primeiro",
      lessons:"✓ Good Information Saves Lives: o melhor médico do mundo não pode fazer nada com má informação\n✓ A checklist Before Calling TMAS existe precisamente para evitar este cenário\n✓ Este caso mostra diretamente por que a Lição 5 (exame secundário e vigilância) existia: sem ela, não há nada para transmitir\n✓ The Ship Never Prescribes. It Assesses, Reports and Executes: sem um relatório de qualidade, a execução não pode seguir",
      link:"🔗 Este caso ilustra diretamente por que preparar a chamada ao TMAS nunca é opcional, mesmo na urgência, sobretudo na urgência."},
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
    {q:"Que signifie le principe 'The Ship Never Prescribes. It Assesses, Reports and Executes' ?",opts:["Le navire choisit lui-même le traitement approprié","Le navire évalue, transmet l'information, puis exécute les instructions reçues, sans jamais décider seul du traitement","Il ne faut jamais contacter de médecin","Le navire n'a aucun rôle dans la prise en charge médicale"],correct:1,expl:"L'autorité médicale reste toujours au médecin distant ; le navire assess, reports puis executes."},
    {q:"Ce module enseigne-t-il des noms de médicaments et des dosages précis ?",opts:["Oui, un guide clinique complet","Non, uniquement des catégories et des principes de décision, jamais de dosage précis","Oui, mais uniquement pour les analgésiques","Non, il ne mentionne aucune catégorie non plus"],correct:1,expl:"MAP reste au niveau des catégories et de la procédure, jamais de la pharmacologie clinique détaillée."},
    {q:"Un produit est périmé dans la pharmacie de bord. Que faire ?",opts:["L'utiliser s'il semble encore correct visuellement","L'identifier et le remplacer avant d'en avoir besoin","Le garder au cas où","Le jeter sans le noter nulle part"],correct:1,expl:"Un produit périmé peut être inefficace ou dangereux ; il doit être identifié et remplacé à l'avance."},
    {q:"Pourquoi certains produits comme l'auto-injecteur d'adrénaline nécessitent-ils une attention particulière de stockage ?",opts:["Ce n'est pas nécessaire","Ils exigent une température précise pour rester efficaces","Uniquement pour des raisons esthétiques","Parce qu'ils sont rarement utilisés"],correct:1,expl:"Certains produits sensibles à la température perdent leur efficacité s'ils ne sont pas stockés correctement."},
    {q:"Que faut-il pour les substances contrôlées à bord ?",opts:["Aucune précaution particulière","Double-verrouillage et registre où chaque prélèvement est noté","Un simple tiroir fermé à clé","Une déclaration en fin de voyage uniquement"],correct:1,expl:"Les substances contrôlées exigent une traçabilité stricte : double clé et registre détaillé."},
    {q:"Que doit-on préparer avant d'appeler le TMAS, selon la check-list Before Calling TMAS ?",opts:["Rien, le médecin posera toutes les questions","SAMPLE, évolution des constantes, traitement déjà donné, heure des observations, identification du patient, position du navire, moyen de communication prêt","Uniquement le nom du patient","Uniquement la position du navire"],correct:1,expl:"La check-list complète garantit un appel efficace, sans perte de temps sur les informations de base."},
    {q:"Dans le cas d'étude de l'Appel Incomplet, pourquoi l'équipage ne pouvait-il pas répondre aux questions du TMAS ?",opts:["Le médecin posait des questions trop compliquées","Aucun SAMPLE ni constante n'avait été préparé ou pris avant l'appel","La communication radio était mauvaise","Le patient refusait de répondre"],correct:1,expl:"L'absence totale de préparation a empêché de répondre aux questions de base du médecin."},
    {q:"Que signifie le principe 'Good Information Saves Lives' ?",opts:["Il suffit d'appeler un médecin pour que tout se résolve","Le meilleur médecin du monde ne peut rien faire avec de mauvaises informations","L'information n'a pas d'impact réel sur la prise en charge","Seule la rapidité de l'appel compte, pas son contenu"],correct:1,expl:"Une information de qualité est indispensable pour que le médecin distant puisse agir efficacement."},
    {q:"Que faire immédiatement après avoir reçu une instruction du médecin TMAS ?",opts:["L'exécuter immédiatement sans rien dire","Répéter mot pour mot l'instruction (Read Back) avant de l'exécuter","Demander un deuxième avis avant d'agir","Ignorer l'instruction si elle semble étrange"],correct:1,expl:"Le Read Back, comme en aviation, permet de détecter une incompréhension avant qu'elle ne devienne une erreur."},
    {q:"Qui confirme que le Read Back est exact ?",opts:["Personne, ce n'est pas nécessaire","Le médecin TMAS lui-même","Un autre membre d'équipage au hasard","Le capitaine uniquement"],correct:1,expl:"Le médecin confirme ou corrige immédiatement le Read Back avant l'exécution."},
    {q:"Qu'est-ce que le Medical Log ?",opts:["Un simple carnet de bord du navire, sans lien avec la santé","La discipline de consigner chaque observation, chaque médicament administré, chaque heure, chaque instruction TMAS","Un document rempli uniquement en fin de voyage","Une formalité administrative sans utilité pratique"],correct:1,expl:"Le Medical Log documente systématiquement tout ce qui concerne la prise en charge, en temps réel."},
    {q:"Pourquoi le Medical Log est-il important pour la suite d'une prise en charge (par exemple un MEDEVAC) ?",opts:["Il ne sert à rien pour la suite","Il permet à toute équipe médicale prenant le relais de comprendre l'historique complet",  "Il ne concerne que l'équipage, jamais les secours extérieurs","Il remplace le besoin d'appeler un médecin"],correct:1,expl:"Un historique complet et horodaté facilite énormément la prise en charge par l'équipe suivante."},
    {q:"Un membre d'équipage décide seul d'un dosage sans consulter le TMAS. Est-ce conforme à la philosophie du module ?",opts:["Oui, si la situation semble simple","Non, le navire n'est jamais autorisé à prescrire seul au-delà des premiers secours de base","Oui, si le membre d'équipage a de l'expérience","Non, mais seulement pour les substances contrôlées"],correct:1,expl:"The Ship Never Prescribes : la décision médicale reste toujours du ressort du médecin distant."},
    {q:"Ce module remplace-t-il une formation médicale complète ou une pharmacie professionnelle ?",opts:["Oui, il est équivalent à une formation médicale complète","Non, il enseigne l'organisation et la procédure, jamais un substitut à une compétence médicale professionnelle","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans un médecin à bord"],correct:1,expl:"MAP enseigne l'organisation et la communication, jamais un remplacement de la compétence médicale."},
    {q:"Quel est le lien entre cette leçon et la Leçon 5 (bilan secondaire) ?",opts:["Aucun lien direct","Sans les constantes horodatées et le SAMPLE de la Leçon 5, il n'y a rien à transmettre au TMAS","La Leçon 5 remplace le besoin d'appeler le TMAS","Ce sont deux sujets totalement indépendants"],correct:1,expl:"Le cas d'étude de cette leçon montre directement que sans la discipline de L5, l'appel TMAS échoue."},
  ],
  en:[
    {q:"What does the principle 'The Ship Never Prescribes. It Assesses, Reports and Executes' mean?",opts:["The ship chooses the appropriate treatment itself","The ship assesses, reports the information, then executes the instructions received, never deciding on treatment alone","A doctor should never be contacted","The ship has no role in medical care"],correct:1,expl:"Medical authority always stays with the remote doctor; the ship assesses, reports, then executes."},
    {q:"Does this module teach specific drug names and precise dosages?",opts:["Yes, a complete clinical guide","No, only categories and decision principles, never precise dosages","Yes, but only for analgesics","No, it doesn't mention categories either"],correct:1,expl:"MAP stays at the level of categories and procedure, never detailed clinical pharmacology."},
    {q:"A product is expired in the medicine chest. What do you do?",opts:["Use it if it still looks fine visually","Identify it and replace it before it's needed","Keep it just in case","Throw it away without recording it anywhere"],correct:1,expl:"An expired product can be ineffective or dangerous; it must be identified and replaced in advance."},
    {q:"Why do some products like the epinephrine auto-injector need special storage attention?",opts:["It isn't necessary","They require a precise temperature to remain effective","Only for aesthetic reasons","Because they are rarely used"],correct:1,expl:"Some temperature-sensitive products lose effectiveness if not stored properly."},
    {q:"What is required for controlled substances on board?",opts:["No particular precaution","Double-lock and a logbook where every withdrawal is recorded","A simple locked drawer","A declaration only at the end of the voyage"],correct:1,expl:"Controlled substances require strict traceability: double lock and a detailed logbook."},
    {q:"What should be prepared before calling TMAS, according to the Before Calling TMAS checklist?",opts:["Nothing, the doctor will ask all the questions","SAMPLE, vitals trend, treatment already given, time of observations, patient identification, vessel position, communication method ready","Only the patient's name","Only the vessel's position"],correct:1,expl:"The full checklist ensures an effective call, without wasting time on basic information."},
    {q:"In the Incomplete Call case study, why couldn't the crew answer the TMAS doctor's questions?",opts:["The doctor asked overly complicated questions","No SAMPLE or vitals had been prepared or taken before the call","Radio communication was poor","The patient refused to answer"],correct:1,expl:"The total lack of preparation prevented answering the doctor's basic questions."},
    {q:"What does the principle 'Good Information Saves Lives' mean?",opts:["Just calling a doctor solves everything","The best doctor in the world can do nothing with poor information","Information has no real impact on care","Only the speed of the call matters, not its content"],correct:1,expl:"Quality information is essential for the remote doctor to act effectively."},
    {q:"What should be done immediately after receiving an instruction from the TMAS doctor?",opts:["Execute it immediately without saying anything","Repeat the instruction word for word (Read Back) before executing it","Ask for a second opinion before acting","Ignore the instruction if it seems strange"],correct:1,expl:"Read Back, as in aviation, catches a misunderstanding before it becomes a mistake."},
    {q:"Who confirms that the Read Back is correct?",opts:["No one, it isn't necessary","The TMAS doctor themselves","Any random other crew member","Only the Captain"],correct:1,expl:"The doctor immediately confirms or corrects the Read Back before execution."},
    {q:"What is the Medical Log?",opts:["A simple ship's logbook, unrelated to health","The discipline of recording every observation, every medication given, every time, every TMAS instruction","A document filled out only at the end of the voyage","An administrative formality with no practical use"],correct:1,expl:"The Medical Log systematically documents everything related to care, in real time."},
    {q:"Why is the Medical Log important for what follows in care (for example a MEDEVAC)?",opts:["It's useless for what follows","It lets any medical team taking over understand the full history","It only concerns the crew, never outside rescue teams","It replaces the need to call a doctor"],correct:1,expl:"A complete, time-stamped history greatly helps the handover to the next team."},
    {q:"A crew member decides on a dosage alone without consulting TMAS. Is this consistent with the module's philosophy?",opts:["Yes, if the situation seems simple","No, the ship is never authorized to prescribe alone beyond basic first aid","Yes, if the crew member has experience","No, but only for controlled substances"],correct:1,expl:"The Ship Never Prescribes: medical decisions always remain with the remote doctor."},
    {q:"Does this module replace complete medical training or a professional pharmacy?",opts:["Yes, it is equivalent to complete medical training","No, it teaches organization and procedure, never a replacement for professional medical competence","Yes, but only for officers","No, it is useless without a doctor on board"],correct:1,expl:"MAP teaches organization and communication, never a replacement for medical competence."},
    {q:"What is the link between this lesson and Lesson 5 (secondary assessment)?",opts:["No direct link","Without the time-stamped vitals and SAMPLE from Lesson 5, there is nothing to hand over to TMAS","Lesson 5 replaces the need to call TMAS","They are two completely independent subjects"],correct:1,expl:"This lesson's case study directly shows that without L5's discipline, the TMAS call fails."},
  ],
  es:[
    {q:"¿Qué significa el principio 'The Ship Never Prescribes. It Assesses, Reports and Executes'?",opts:["El buque elige por sí mismo el tratamiento adecuado","El buque evalúa, transmite la información, y luego ejecuta las instrucciones recibidas, sin decidir nunca el tratamiento por sí solo","Nunca hay que contactar a un médico","El buque no tiene ningún papel en la atención médica"],correct:1,expl:"La autoridad médica siempre permanece en el médico remoto; el buque assess, reports y luego executes."},
    {q:"¿Este módulo enseña nombres de medicamentos y dosis precisas?",opts:["Sí, una guía clínica completa","No, solo categorías y principios de decisión, nunca dosis precisas","Sí, pero solo para analgésicos","No, tampoco menciona categorías"],correct:1,expl:"MAP se mantiene en el nivel de categorías y procedimiento, nunca farmacología clínica detallada."},
    {q:"Un producto está caducado en el botiquín. ¿Qué haces?",opts:["Usarlo si aún parece estar bien visualmente","Identificarlo y sustituirlo antes de necesitarlo","Guardarlo por si acaso","Tirarlo sin registrarlo en ningún sitio"],correct:1,expl:"Un producto caducado puede ser ineficaz o peligroso; debe identificarse y sustituirse con antelación."},
    {q:"¿Por qué algunos productos como el autoinyector de adrenalina necesitan atención especial de almacenamiento?",opts:["No es necesario","Exigen una temperatura precisa para seguir siendo eficaces","Solo por razones estéticas","Porque se usan raramente"],correct:1,expl:"Algunos productos sensibles a la temperatura pierden eficacia si no se almacenan correctamente."},
    {q:"¿Qué se necesita para las sustancias controladas a bordo?",opts:["Ninguna precaución particular","Doble cierre y un registro donde se anota cada extracción","Un simple cajón cerrado con llave","Una declaración solo al final del viaje"],correct:1,expl:"Las sustancias controladas exigen trazabilidad estricta: doble llave y registro detallado."},
    {q:"¿Qué hay que preparar antes de llamar al TMAS, según la checklist Before Calling TMAS?",opts:["Nada, el médico hará todas las preguntas","SAMPLE, evolución de las constantes, tratamiento ya administrado, hora de las observaciones, identificación del paciente, posición del buque, método de comunicación listo","Solo el nombre del paciente","Solo la posición del buque"],correct:1,expl:"La checklist completa garantiza una llamada eficaz, sin perder tiempo en información básica."},
    {q:"En el caso de estudio de la Llamada Incompleta, ¿por qué la tripulación no pudo responder a las preguntas del TMAS?",opts:["El médico hacía preguntas demasiado complicadas","No se había preparado ni tomado ningún SAMPLE o constante antes de la llamada","La comunicación por radio era mala","El paciente se negaba a responder"],correct:1,expl:"La falta total de preparación impidió responder a las preguntas básicas del médico."},
    {q:"¿Qué significa el principio 'Good Information Saves Lives'?",opts:["Basta con llamar a un médico para que todo se resuelva","El mejor médico del mundo no puede hacer nada con mala información","La información no tiene impacto real en la atención","Solo importa la rapidez de la llamada, no su contenido"],correct:1,expl:"La información de calidad es esencial para que el médico remoto pueda actuar eficazmente."},
    {q:"¿Qué hacer inmediatamente después de recibir una instrucción del médico del TMAS?",opts:["Ejecutarla de inmediato sin decir nada","Repetir la instrucción palabra por palabra (Read Back) antes de ejecutarla","Pedir una segunda opinión antes de actuar","Ignorar la instrucción si parece extraña"],correct:1,expl:"El Read Back, como en aviación, permite detectar un malentendido antes de que se convierta en un error."},
    {q:"¿Quién confirma que el Read Back es correcto?",opts:["Nadie, no es necesario","El propio médico del TMAS","Cualquier otro tripulante al azar","Solo el Capitán"],correct:1,expl:"El médico confirma o corrige de inmediato el Read Back antes de la ejecución."},
    {q:"¿Qué es el Medical Log?",opts:["Un simple diario de a bordo del buque, sin relación con la salud","La disciplina de registrar cada observación, cada medicamento administrado, cada hora, cada instrucción del TMAS","Un documento que se rellena solo al final del viaje","Una formalidad administrativa sin utilidad práctica"],correct:1,expl:"El Medical Log documenta sistemáticamente todo lo relacionado con la atención, en tiempo real."},
    {q:"¿Por qué es importante el Medical Log para lo que sigue en la atención (por ejemplo un MEDEVAC)?",opts:["No sirve para lo que sigue","Permite que cualquier equipo médico que tome el relevo entienda el historial completo","Solo concierne a la tripulación, nunca a los equipos de rescate externos","Sustituye la necesidad de llamar a un médico"],correct:1,expl:"Un historial completo y con hora ayuda enormemente al relevo del siguiente equipo."},
    {q:"Un tripulante decide una dosis solo sin consultar al TMAS. ¿Es esto conforme a la filosofía del módulo?",opts:["Sí, si la situación parece simple","No, el buque nunca está autorizado a prescribir solo más allá de los primeros auxilios básicos","Sí, si el tripulante tiene experiencia","No, pero solo para sustancias controladas"],correct:1,expl:"The Ship Never Prescribes: la decisión médica siempre permanece en el médico remoto."},
    {q:"¿Este módulo sustituye una formación médica completa o una farmacia profesional?",opts:["Sí, equivale a una formación médica completa","No, enseña organización y procedimiento, nunca un sustituto de la competencia médica profesional","Sí, pero solo para oficiales","No, no sirve de nada sin un médico a bordo"],correct:1,expl:"MAP enseña organización y comunicación, nunca un sustituto de la competencia médica."},
    {q:"¿Cuál es la relación entre esta lección y la Lección 5 (bilan secundario)?",opts:["Ninguna relación directa","Sin las constantes con hora y el SAMPLE de la Lección 5, no hay nada que transmitir al TMAS","La Lección 5 sustituye la necesidad de llamar al TMAS","Son dos temas totalmente independientes"],correct:1,expl:"El caso de estudio de esta lección muestra directamente que sin la disciplina de L5, la llamada al TMAS falla."},
  ],
  pt:[
    {q:"O que significa o princípio 'The Ship Never Prescribes. It Assesses, Reports and Executes'?",opts:["O navio escolhe por si só o tratamento adequado","O navio avalia, transmite a informação, e depois executa as instruções recebidas, nunca decidindo o tratamento sozinho","Nunca se deve contactar um médico","O navio não tem qualquer papel na assistência médica"],correct:1,expl:"A autoridade médica permanece sempre com o médico remoto; o navio assess, reports e depois executes."},
    {q:"Este módulo ensina nomes de medicamentos e doses precisas?",opts:["Sim, um guia clínico completo","Não, apenas categorias e princípios de decisão, nunca doses precisas","Sim, mas só para analgésicos","Não, também não menciona categorias"],correct:1,expl:"A MAP mantém-se ao nível de categorias e procedimento, nunca farmacologia clínica detalhada."},
    {q:"Um produto está fora de validade na farmácia de bordo. O que fazes?",opts:["Usá-lo se ainda parecer bem visualmente","Identificá-lo e substituí-lo antes de ser necessário","Guardá-lo por precaução","Deitá-lo fora sem o registar em lado nenhum"],correct:1,expl:"Um produto fora de validade pode ser ineficaz ou perigoso; deve ser identificado e substituído com antecedência."},
    {q:"Por que alguns produtos como o autoinjetor de adrenalina precisam de atenção especial de armazenamento?",opts:["Não é necessário","Exigem uma temperatura precisa para continuarem eficazes","Só por razões estéticas","Porque são raramente usados"],correct:1,expl:"Alguns produtos sensíveis à temperatura perdem eficácia se não forem armazenados corretamente."},
    {q:"O que é necessário para as substâncias controladas a bordo?",opts:["Nenhuma precaução particular","Duplo trancamento e um registo onde cada retirada é anotada","Uma simples gaveta trancada","Uma declaração apenas no final da viagem"],correct:1,expl:"As substâncias controladas exigem rastreabilidade estrita: dupla chave e registo detalhado."},
    {q:"O que deve ser preparado antes de chamar o TMAS, segundo a checklist Before Calling TMAS?",opts:["Nada, o médico fará todas as perguntas","SAMPLE, evolução das constantes, tratamento já administrado, hora das observações, identificação do paciente, posição do navio, método de comunicação pronto","Apenas o nome do paciente","Apenas a posição do navio"],correct:1,expl:"A checklist completa garante uma chamada eficaz, sem perder tempo em informação básica."},
    {q:"No caso de estudo da Chamada Incompleta, por que a tripulação não conseguiu responder às perguntas do TMAS?",opts:["O médico fazia perguntas demasiado complicadas","Nenhum SAMPLE ou constante tinha sido preparado ou tirado antes da chamada","A comunicação por rádio era má","O paciente recusava-se a responder"],correct:1,expl:"A falta total de preparação impediu responder às perguntas básicas do médico."},
    {q:"O que significa o princípio 'Good Information Saves Lives'?",opts:["Basta chamar um médico para tudo se resolver","O melhor médico do mundo não pode fazer nada com má informação","A informação não tem impacto real nos cuidados","Só importa a rapidez da chamada, não o seu conteúdo"],correct:1,expl:"A informação de qualidade é essencial para que o médico remoto possa agir eficazmente."},
    {q:"O que fazer imediatamente após receber uma instrução do médico do TMAS?",opts:["Executá-la de imediato sem dizer nada","Repetir a instrução palavra por palavra (Read Back) antes de a executar","Pedir uma segunda opinião antes de agir","Ignorar a instrução se parecer estranha"],correct:1,expl:"O Read Back, como na aviação, permite detetar um mal-entendido antes que se torne um erro."},
    {q:"Quem confirma que o Read Back está correto?",opts:["Ninguém, não é necessário","O próprio médico do TMAS","Qualquer outro tripulante ao acaso","Só o Comandante"],correct:1,expl:"O médico confirma ou corrige de imediato o Read Back antes da execução."},
    {q:"O que é o Medical Log?",opts:["Um simples diário de bordo do navio, sem relação com a saúde","A disciplina de registar cada observação, cada medicamento administrado, cada hora, cada instrução do TMAS","Um documento preenchido apenas no final da viagem","Uma formalidade administrativa sem utilidade prática"],correct:1,expl:"O Medical Log documenta sistematicamente tudo o que diz respeito aos cuidados, em tempo real."},
    {q:"Por que o Medical Log é importante para o que se segue nos cuidados (por exemplo um MEDEVAC)?",opts:["Não serve para o que se segue","Permite que qualquer equipa médica que assuma o caso compreenda o historial completo","Só diz respeito à tripulação, nunca às equipas de resgate externas","Substitui a necessidade de chamar um médico"],correct:1,expl:"Um historial completo e com hora ajuda imenso a transferência para a equipa seguinte."},
    {q:"Um tripulante decide uma dose sozinho sem consultar o TMAS. Isto está de acordo com a filosofia do módulo?",opts:["Sim, se a situação parecer simples","Não, o navio nunca está autorizado a prescrever sozinho além dos primeiros socorros básicos","Sim, se o tripulante tiver experiência","Não, mas só para substâncias controladas"],correct:1,expl:"The Ship Never Prescribes: a decisão médica permanece sempre com o médico remoto."},
    {q:"Este módulo substitui uma formação médica completa ou uma farmácia profissional?",opts:["Sim, equivale a uma formação médica completa","Não, ensina organização e procedimento, nunca um substituto da competência médica profissional","Sim, mas só para oficiais","Não, não serve de nada sem um médico a bordo"],correct:1,expl:"A MAP ensina organização e comunicação, nunca um substituto da competência médica."},
    {q:"Qual é a ligação entre esta lição e a Lição 5 (exame secundário)?",opts:["Nenhuma ligação direta","Sem as constantes com hora e o SAMPLE da Lição 5, não há nada para transmitir ao TMAS","A Lição 5 substitui a necessidade de chamar o TMAS","São dois temas totalmente independentes"],correct:1,expl:"O caso de estudo desta lição mostra diretamente que sem a disciplina de L5, a chamada ao TMAS falha."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'The Ship Never Prescribes. It Assesses, Reports and Executes' ?",opts:["Le navire choisit le traitement seul","Le navire évalue, transmet, puis exécute les instructions reçues","Il ne faut jamais appeler de médecin","Le navire n'a aucun rôle médical"],correct:1,expl:"L'autorité médicale reste au médecin distant ; le navire assess, reports, executes."},
    {q:"Que faut-il préparer avant d'appeler le TMAS ?",opts:["Rien, le médecin posera les questions","SAMPLE, constantes horodatées, traitement déjà donné, position du navire","Uniquement le nom du patient","Uniquement l'heure de l'appel"],correct:1,expl:"La check-list Before Calling TMAS évite de perdre un temps précieux."},
    {q:"Que faire dès réception d'une instruction du médecin TMAS ?",opts:["L'exécuter sans rien dire","Read Back : répéter mot pour mot avant d'exécuter","Demander un deuxième avis d'abord","L'ignorer si elle semble étrange"],correct:1,expl:"Le Read Back permet de détecter une incompréhension avant l'erreur."},
    {q:"Qu'est-ce que le Medical Log ?",opts:["Un simple carnet de bord sans lien avec la santé","La discipline de consigner chaque observation, médicament, heure et instruction","Un document rempli en fin de voyage seulement","Une formalité sans utilité"],correct:1,expl:"Le Medical Log documente tout en temps réel, utile aussi pour un futur MEDEVAC."},
    {q:"Que signifie 'Good Information Saves Lives' ?",opts:["Appeler un médecin suffit toujours","Le meilleur médecin ne peut rien faire avec de mauvaises informations","L'information n'a pas d'impact","Seule la vitesse de l'appel compte"],correct:1,expl:"Une information de qualité est indispensable pour une prise en charge efficace à distance."},
  ],
  en:[
    {q:"What does 'The Ship Never Prescribes. It Assesses, Reports and Executes' mean?",opts:["The ship chooses treatment alone","The ship assesses, reports, then executes the instructions received","A doctor should never be called","The ship has no medical role"],correct:1,expl:"Medical authority stays with the remote doctor; the ship assesses, reports, executes."},
    {q:"What should be prepared before calling TMAS?",opts:["Nothing, the doctor will ask","SAMPLE, time-stamped vitals, treatment already given, vessel position","Only the patient's name","Only the time of the call"],correct:1,expl:"The Before Calling TMAS checklist avoids wasting precious time."},
    {q:"What do you do as soon as you receive an instruction from the TMAS doctor?",opts:["Execute it without saying anything","Read Back: repeat word for word before executing","Ask for a second opinion first","Ignore it if it seems strange"],correct:1,expl:"Read Back catches a misunderstanding before it becomes a mistake."},
    {q:"What is the Medical Log?",opts:["A simple logbook unrelated to health","The discipline of recording every observation, medication, time, and instruction","A document filled out only at the end of the voyage","A formality with no use"],correct:1,expl:"The Medical Log documents everything in real time, also useful for a future MEDEVAC."},
    {q:"What does 'Good Information Saves Lives' mean?",opts:["Calling a doctor always suffices","The best doctor can do nothing with poor information","Information has no impact","Only the speed of the call matters"],correct:1,expl:"Quality information is essential for effective remote care."},
  ],
  es:[
    {q:"¿Qué significa 'The Ship Never Prescribes. It Assesses, Reports and Executes'?",opts:["El buque elige el tratamiento solo","El buque evalúa, transmite, y luego ejecuta las instrucciones recibidas","Nunca hay que llamar a un médico","El buque no tiene ningún papel médico"],correct:1,expl:"La autoridad médica permanece en el médico remoto; el buque assess, reports, executes."},
    {q:"¿Qué hay que preparar antes de llamar al TMAS?",opts:["Nada, el médico preguntará","SAMPLE, constantes con hora, tratamiento ya administrado, posición del buque","Solo el nombre del paciente","Solo la hora de la llamada"],correct:1,expl:"La checklist Before Calling TMAS evita perder tiempo precioso."},
    {q:"¿Qué hacer en cuanto se recibe una instrucción del médico del TMAS?",opts:["Ejecutarla sin decir nada","Read Back: repetir palabra por palabra antes de ejecutar","Pedir una segunda opinión primero","Ignorarla si parece extraña"],correct:1,expl:"El Read Back detecta un malentendido antes de que se convierta en error."},
    {q:"¿Qué es el Medical Log?",opts:["Un simple diario sin relación con la salud","La disciplina de registrar cada observación, medicamento, hora e instrucción","Un documento que se rellena solo al final del viaje","Una formalidad sin utilidad"],correct:1,expl:"El Medical Log documenta todo en tiempo real, útil también para un futuro MEDEVAC."},
    {q:"¿Qué significa 'Good Information Saves Lives'?",opts:["Llamar a un médico siempre basta","El mejor médico no puede hacer nada con mala información","La información no tiene impacto","Solo importa la rapidez de la llamada"],correct:1,expl:"La información de calidad es esencial para una atención remota eficaz."},
  ],
  pt:[
    {q:"O que significa 'The Ship Never Prescribes. It Assesses, Reports and Executes'?",opts:["O navio escolhe o tratamento sozinho","O navio avalia, transmite, e depois executa as instruções recebidas","Nunca se deve chamar um médico","O navio não tem qualquer papel médico"],correct:1,expl:"A autoridade médica permanece com o médico remoto; o navio assess, reports, executes."},
    {q:"O que deve ser preparado antes de chamar o TMAS?",opts:["Nada, o médico perguntará","SAMPLE, constantes com hora, tratamento já administrado, posição do navio","Apenas o nome do paciente","Apenas a hora da chamada"],correct:1,expl:"A checklist Before Calling TMAS evita perder tempo precioso."},
    {q:"O que fazer assim que se recebe uma instrução do médico do TMAS?",opts:["Executá-la sem dizer nada","Read Back: repetir palavra por palavra antes de executar","Pedir uma segunda opinião primeiro","Ignorá-la se parecer estranha"],correct:1,expl:"O Read Back deteta um mal-entendido antes que se torne um erro."},
    {q:"O que é o Medical Log?",opts:["Um simples diário sem relação com a saúde","A disciplina de registar cada observação, medicamento, hora e instrução","Um documento preenchido apenas no final da viagem","Uma formalidade sem utilidade"],correct:1,expl:"O Medical Log documenta tudo em tempo real, útil também para um futuro MEDEVAC."},
    {q:"O que significa 'Good Information Saves Lives'?",opts:["Chamar um médico basta sempre","O melhor médico não pode fazer nada com má informação","A informação não tem impacto","Só importa a rapidez da chamada"],correct:1,expl:"A informação de qualidade é essencial para uma assistência remota eficaz."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si tu devais appeler un medecin radio aujourd'hui, quelle information serais-tu incapable de fournir avec confiance ?",
    en:"If you had to call a radio doctor today, what information would you be unable to provide with confidence?",
    es:"Si tuvieras que llamar hoy a un medico de radio, ¿que informacion serias incapaz de proporcionar con confianza?",
    pt:"Se tivesses de chamar um medico de radio hoje, que informacao serias incapaz de fornecer com confianca?",
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
      badge:"🩺 Safety · STCW First Aid · Leçon 7/8 · ⭐ Premium",
      title:"Ship's Medicine Chest & Radio Medical Advice",
      intro:"Cette leçon enseigne une compétence souvent négligée : bien communiquer avec un médecin qui peut être à des heures, voire des jours, de distance. Le navire n'est jamais celui qui décide du traitement.",
      p0:"THE SHIP NEVER PRESCRIBES. IT ASSESSES, REPORTS AND EXECUTES.",s0t:"Assess, puis Report, puis Execute",
      s0:"Le rôle de l'équipage n'est jamais de choisir un traitement seul. Il évalue la situation, la transmet avec précision au médecin distant, puis exécute exactement les instructions reçues.\n\nCOMMENT LE RECONNAÎTRE ? Toute situation nécessitant plus qu'un premier secours de base impose ce cycle, sans exception.\nQUE FAIRE IMMÉDIATEMENT ? Préparer l'information avant l'appel, exécuter précisément après.\nQUELLE ERREUR L'AGGRAVE ? Décider seul d'un dosage, ou appeler sans préparation.\nQUAND DEMANDER DE L'AIDE MÉDICALE ? Systématiquement avant toute administration au-delà des gestes de base déjà vus dans ce module.",
      p1:"CATÉGORIES DE LA PHARMACIE DE BORD",s1t:"Des catégories, jamais des dosages",
      s1:"Analgésiques, cardiovasculaire, respiratoire, soins de plaies, réanimation, substances contrôlées : six grandes catégories réglementaires, enseignées ici sans aucun nom de médicament ni dosage précis.",
      p2:"DISCIPLINE DE STOCKAGE & PÉREMPTION",s2t:"Une pharmacie n'est utile que si elle est à jour",
      s2:"Inventaire régulier, suivi des dates de péremption, conditions de conservation précises pour certains produits comme l'auto-injecteur d'adrénaline (L6), double-verrouillage et registre pour les substances contrôlées.",
      p3:"GOOD INFORMATION SAVES LIVES",s3t:"Le meilleur médecin ne peut rien faire sans données",
      s3:"Un médecin distant, même excellent, ne peut donner un avis utile qu'avec des informations précises et complètes. C'est l'équipage qui fournit ces informations, jamais l'inverse.",
      p4:"AVANT D'APPELER LE TMAS",s4t:"Une check-list opérationnelle, pas une simple idée",
      s4:"SAMPLE, évolution des constantes, traitement déjà donné, heure de chaque observation, identification du patient, position du navire, moyen de communication prêt : sept éléments à avoir en main avant de décrocher.",
      p5:"RECEVOIR LES INSTRUCTIONS : READ BACK",s5t:"Répéter, confirmer, documenter",
      s5:"Comme en aviation, chaque instruction reçue est répétée mot pour mot avant d'être exécutée. Le médecin confirme, puis tout est consigné dans le Medical Log.",
      p6:"LE MEDICAL LOG",s6t:"Une discipline, pas un simple document",
      s6:"Chaque observation, chaque médicament administré, chaque heure, chaque instruction TMAS : tout est consigné en temps réel. Cette habitude sert aussi de base à la prochaine leçon : parfois, le meilleur traitement n'est pas à bord. La Leçon 8 explique comment préparer une victime pour une évacuation médicale et sa transmission.",
      p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"⚠️ CAS D'ÉTUDE",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 7",
      sumP:["The Ship Never Prescribes. It Assesses, Reports and Executes : jamais de décision médicale autonome","Catégories de pharmacie enseignées, jamais de dosages précis","Discipline de stockage et péremption, y compris pour l'auto-injecteur d'adrénaline","Before Calling TMAS : check-list de 7 éléments avant tout appel","Read Back et Medical Log : répéter, confirmer, documenter systématiquement"],
      learnedP:["Les catégories de la pharmacie de bord","La discipline de stockage et péremption","La check-list Before Calling TMAS","La méthode Read Back","Le Medical Log comme discipline permanente"],
      safetyMsg:"The quality of medical advice depends on the quality of the information you provide. Calm observations save more lives than rushed assumptions.",
    },
    en:{
      badge:"🩺 Safety · STCW First Aid · Lesson 7/8 · ⭐ Premium",
      title:"Ship's Medicine Chest & Radio Medical Advice",
      intro:"This lesson teaches an often overlooked skill: communicating well with a doctor who may be hours, even days, away. The ship is never the one who decides on treatment.",
      p0:"THE SHIP NEVER PRESCRIBES. IT ASSESSES, REPORTS AND EXECUTES.",s0t:"Assess, then Report, then Execute",
      s0:"The crew's role is never to choose a treatment alone. They assess the situation, report it precisely to the remote doctor, then execute exactly the instructions received.\n\nHOW DO I RECOGNIZE IT? Any situation requiring more than basic first aid follows this cycle, without exception.\nWHAT DO I DO IMMEDIATELY? Prepare the information before the call, execute precisely afterward.\nWHAT MISTAKE MAKES IT WORSE? Deciding on a dosage alone, or calling without preparation.\nWHEN MUST I ASK FOR MEDICAL ASSISTANCE? Systematically before any administration beyond the basic actions already covered in this module.",
      p1:"MEDICINE CHEST CATEGORIES",s1t:"Categories, never dosages",
      s1:"Analgesics, cardiovascular, respiratory, wound care, resuscitation, controlled substances: six major regulatory categories, taught here with no drug name or precise dosage.",
      p2:"STORAGE & EXPIRY DISCIPLINE",s2t:"A chest is only useful if it's up to date",
      s2:"Regular inventory, tracking expiry dates, precise storage conditions for some products like the epinephrine auto-injector (L6), double-lock and logbook for controlled substances.",
      p3:"GOOD INFORMATION SAVES LIVES",s3t:"The best doctor can do nothing without data",
      s3:"A remote doctor, however excellent, can only give useful advice with precise, complete information. It's the crew who provides this information, never the other way around.",
      p4:"BEFORE CALLING TMAS",s4t:"An operational checklist, not just an idea",
      s4:"SAMPLE, vitals trend, treatment already given, time of each observation, patient identification, vessel position, communication method ready: seven items to have in hand before picking up.",
      p5:"RECEIVING INSTRUCTIONS: READ BACK",s5t:"Repeat, confirm, document",
      s5:"As in aviation, every instruction received is repeated word for word before being executed. The doctor confirms, then everything is recorded in the Medical Log.",
      p6:"THE MEDICAL LOG",s6t:"A discipline, not just a document",
      s6:"Every observation, every medication given, every time, every TMAS instruction: everything is recorded in real time. This habit also lays the foundation for the next lesson: sometimes the best treatment is not on board. Lesson 8 explains how to prepare a casualty for medical evacuation and handover.",
      p7:"🎯 OPERATIONAL EXERCISE",p8:"⚠️ CASE STUDY",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 7",
      sumP:["The Ship Never Prescribes. It Assesses, Reports and Executes: never an autonomous medical decision","Medicine chest categories taught, never precise dosages","Storage and expiry discipline, including for the epinephrine auto-injector","Before Calling TMAS: a 7-item checklist before any call","Read Back and Medical Log: repeat, confirm, document systematically"],
      learnedP:["The medicine chest categories","Storage and expiry discipline","The Before Calling TMAS checklist","The Read Back method","The Medical Log as a permanent discipline"],
      safetyMsg:"The quality of medical advice depends on the quality of the information you provide. Calm observations save more lives than rushed assumptions.",
    },
    es:{
      badge:"🩺 Safety · STCW First Aid · Lección 7/8 · ⭐ Premium",
      title:"Ship's Medicine Chest & Radio Medical Advice",
      intro:"Esta lección enseña una habilidad a menudo descuidada: comunicarse bien con un médico que puede estar a horas, incluso días, de distancia. El buque nunca es quien decide el tratamiento.",
      p0:"THE SHIP NEVER PRESCRIBES. IT ASSESSES, REPORTS AND EXECUTES.",s0t:"Assess, luego Report, luego Execute",
      s0:"El papel de la tripulación nunca es elegir un tratamiento sola. Evalúa la situación, la transmite con precisión al médico remoto, y luego ejecuta exactamente las instrucciones recibidas.\n\n¿CÓMO RECONOCERLO? Toda situación que requiera más que primeros auxilios básicos sigue este ciclo, sin excepción.\n¿QUÉ HACER DE INMEDIATO? Preparar la información antes de la llamada, ejecutar con precisión después.\n¿QUÉ ERROR LO AGRAVA? Decidir una dosis solo, o llamar sin preparación.\n¿CUÁNDO PEDIR AYUDA MÉDICA? Sistemáticamente antes de cualquier administración más allá de los gestos básicos ya vistos en este módulo.",
      p1:"CATEGORÍAS DEL BOTIQUÍN",s1t:"Categorías, nunca dosis",
      s1:"Analgésicos, cardiovascular, respiratorio, cuidado de heridas, reanimación, sustancias controladas: seis grandes categorías reglamentarias, enseñadas aquí sin ningún nombre de medicamento ni dosis precisa.",
      p2:"DISCIPLINA DE ALMACENAMIENTO Y CADUCIDAD",s2t:"Un botiquín solo es útil si está al día",
      s2:"Inventario regular, seguimiento de fechas de caducidad, condiciones de conservación precisas para algunos productos como el autoinyector de adrenalina (L6), doble cierre y registro para sustancias controladas.",
      p3:"GOOD INFORMATION SAVES LIVES",s3t:"El mejor médico no puede hacer nada sin datos",
      s3:"Un médico remoto, por excelente que sea, solo puede dar un consejo útil con información precisa y completa. Es la tripulación quien proporciona esta información, nunca al revés.",
      p4:"ANTES DE LLAMAR AL TMAS",s4t:"Una checklist operativa, no solo una idea",
      s4:"SAMPLE, evolución de las constantes, tratamiento ya administrado, hora de cada observación, identificación del paciente, posición del buque, método de comunicación listo: siete elementos que tener a mano antes de descolgar.",
      p5:"RECIBIR INSTRUCCIONES: READ BACK",s5t:"Repetir, confirmar, documentar",
      s5:"Como en aviación, cada instrucción recibida se repite palabra por palabra antes de ejecutarla. El médico confirma, luego todo se registra en el Medical Log.",
      p6:"EL MEDICAL LOG",s6t:"Una disciplina, no solo un documento",
      s6:"Cada observación, cada medicamento administrado, cada hora, cada instrucción del TMAS: todo se registra en tiempo real. Este hábito también sienta las bases de la próxima lección: a veces el mejor tratamiento no está a bordo. La Lección 8 explica cómo preparar a una víctima para una evacuación médica y su transmisión.",
      p7:"🎯 EJERCICIO OPERATIVO",p8:"⚠️ CASO DE ESTUDIO",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 7",
      sumP:["The Ship Never Prescribes. It Assesses, Reports and Executes: nunca una decisión médica autónoma","Categorías del botiquín enseñadas, nunca dosis precisas","Disciplina de almacenamiento y caducidad, incluido el autoinyector de adrenalina","Before Calling TMAS: checklist de 7 elementos antes de cualquier llamada","Read Back y Medical Log: repetir, confirmar, documentar sistemáticamente"],
      learnedP:["Las categorías del botiquín","La disciplina de almacenamiento y caducidad","La checklist Before Calling TMAS","El método Read Back","El Medical Log como disciplina permanente"],
      safetyMsg:"The quality of medical advice depends on the quality of the information you provide. Calm observations save more lives than rushed assumptions.",
    },
    pt:{
      badge:"🩺 Safety · STCW First Aid · Lição 7/8 · ⭐ Premium",
      title:"Ship's Medicine Chest & Radio Medical Advice",
      intro:"Esta lição ensina uma competência muitas vezes negligenciada: comunicar bem com um médico que pode estar a horas, mesmo dias, de distância. O navio nunca é quem decide o tratamento.",
      p0:"THE SHIP NEVER PRESCRIBES. IT ASSESSES, REPORTS AND EXECUTES.",s0t:"Assess, depois Report, depois Execute",
      s0:"O papel da tripulação nunca é escolher um tratamento sozinha. Avalia a situação, transmite-a com precisão ao médico remoto, depois executa exatamente as instruções recebidas.\n\nCOMO RECONHECER? Toda a situação que exija mais do que primeiros socorros básicos segue este ciclo, sem exceção.\nO QUE FAZER IMEDIATAMENTE? Preparar a informação antes da chamada, executar com precisão depois.\nQUE ERRO O AGRAVA? Decidir uma dose sozinho, ou chamar sem preparação.\nQUANDO PEDIR AJUDA MÉDICA? Sistematicamente antes de qualquer administração além dos gestos básicos já vistos neste módulo.",
      p1:"CATEGORIAS DA FARMÁCIA DE BORDO",s1t:"Categorias, nunca doses",
      s1:"Analgésicos, cardiovascular, respiratório, cuidados de feridas, reanimação, substâncias controladas: seis grandes categorias regulamentares, ensinadas aqui sem qualquer nome de medicamento nem dose precisa.",
      p2:"DISCIPLINA DE ARMAZENAMENTO E VALIDADE",s2t:"Uma farmácia só é útil se estiver atualizada",
      s2:"Inventário regular, acompanhamento das datas de validade, condições de conservação precisas para alguns produtos como o autoinjetor de adrenalina (L6), duplo trancamento e registo para substâncias controladas.",
      p3:"GOOD INFORMATION SAVES LIVES",s3t:"O melhor médico não pode fazer nada sem dados",
      s3:"Um médico remoto, por mais excelente que seja, só pode dar um conselho útil com informação precisa e completa. É a tripulação quem fornece esta informação, nunca o contrário.",
      p4:"ANTES DE CHAMAR O TMAS",s4t:"Uma checklist operacional, não apenas uma ideia",
      s4:"SAMPLE, evolução das constantes, tratamento já administrado, hora de cada observação, identificação do paciente, posição do navio, método de comunicação pronto: sete elementos a ter em mãos antes de atender.",
      p5:"RECEBER INSTRUÇÕES: READ BACK",s5t:"Repetir, confirmar, documentar",
      s5:"Como na aviação, cada instrução recebida é repetida palavra por palavra antes de ser executada. O médico confirma, depois tudo é registado no Medical Log.",
      p6:"O MEDICAL LOG",s6t:"Uma disciplina, não apenas um documento",
      s6:"Cada observação, cada medicamento administrado, cada hora, cada instrução do TMAS: tudo é registado em tempo real. Este hábito também serve de base para a próxima lição: às vezes o melhor tratamento não está a bordo. A Lição 8 explica como preparar uma vítima para uma evacuação médica e a sua transferência.",
      p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"⚠️ CASO DE ESTUDO",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 7",
      sumP:["The Ship Never Prescribes. It Assesses, Reports and Executes: nunca uma decisão médica autónoma","Categorias da farmácia ensinadas, nunca doses precisas","Disciplina de armazenamento e validade, incluindo o autoinjetor de adrenalina","Before Calling TMAS: checklist de 7 elementos antes de qualquer chamada","Read Back e Medical Log: repetir, confirmar, documentar sistematicamente"],
      learnedP:["As categorias da farmácia de bordo","A disciplina de armazenamento e validade","A checklist Before Calling TMAS","O método Read Back","O Medical Log como disciplina permanente"],
      safetyMsg:"The quality of medical advice depends on the quality of the information you provide. Calm observations save more lives than rushed assumptions.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS3_L7({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 7/8":lang==="en"?"Lesson 7/8":lang==="es"?"Lección 7/8":"Lição 7/8"}</div>
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

            <SL icon="💊" text={lc.p1} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💊</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>💊 {lang==="fr"?"PHARMACIE DE BORD - INTERACTIF":lang==="en"?"MEDICINE CHEST - INTERACTIVE":lang==="es"?"BOTIQUÍN - INTERACTIVO":"FARMÁCIA DE BORDO - INTERATIVO"}</div><MedicineChestSVG lang={lang}/></Card>

            <SL icon="⏳" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏳</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⏳ {lang==="fr"?"STOCKAGE & PÉREMPTION - INTERACTIF":lang==="en"?"STORAGE & EXPIRY - INTERACTIVE":lang==="es"?"ALMACENAMIENTO Y CADUCIDAD - INTERACTIVO":"ARMAZENAMENTO E VALIDADE - INTERATIVO"}</div><StorageExpirySVG lang={lang}/></Card>

            <SL icon="📡" text={lc.p3} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="✅" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>✅</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>✅ {lang==="fr"?"CHECK-LIST INTERACTIVE":lang==="en"?"INTERACTIVE CHECKLIST":lang==="es"?"CHECKLIST INTERACTIVA":"CHECKLIST INTERATIVA"}</div><TMASChecklistSVG lang={lang}/></Card>

            <SL icon="🔁" text={lc.p5} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔁</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔁 {lang==="fr"?"READ BACK - INTERACTIF":lang==="en"?"READ BACK - INTERACTIVE":lang==="es"?"READ BACK - INTERACTIVO":"READ BACK - INTERATIVO"}</div><ReadBackSVG lang={lang}/></Card>

            <SL icon="📓" text={lc.p6} color={C.gold2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📓</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>

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
                {lang==="fr"?"Quiz Final - Pharmacie & TMAS":lang==="en"?"Final Quiz - Medicine Chest & TMAS":lang==="es"?"Quiz Final - Botiquín y TMAS":"Quiz Final - Farmácia e TMAS"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 7/8":"questions · Lesson 7/8"}</div>
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
              {lang==="fr"?"LEÇON 8 - MEDEVAC →":lang==="en"?"LESSON 8 - MEDEVAC →":lang==="es"?"LECCIÓN 8 - MEDEVAC →":"LIÇÃO 8 - MEDEVAC →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
