import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - THE ROLE OF THE PATROLLER (FOUR RESPONSIBILITIES)
function PatrollerRoleSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🧑‍🤝‍🧑", label:{fr:"Protéger les personnes",en:"Protecting people",es:"Proteger a las personas",pt:"Proteger as pessoas"}, desc:{fr:"Chaque anomalie détectée à temps peut éviter une blessure ou pire, pour l'équipage ou pour soi-même.",en:"Every anomaly caught in time can prevent an injury or worse, for the crew or for oneself.",es:"Cada anomalía detectada a tiempo puede evitar una lesión o algo peor, para la tripulación o para uno mismo.",pt:"Cada anomalia detetada a tempo pode evitar uma lesão ou pior, para a tripulação ou para si próprio."} },
    { id:2, icon:"🚢", label:{fr:"Protéger le navire",en:"Protecting the ship",es:"Proteger el buque",pt:"Proteger o navio"}, desc:{fr:"Une fuite, une corrosion ou une vibration ignorée peut évoluer vers une avarie majeure, parfois irréversible.",en:"A leak, corrosion, or vibration left unnoticed can evolve into a major, sometimes irreversible failure.",es:"Una fuga, corrosión o vibración ignorada puede evolucionar hacia una avería mayor, a veces irreversible.",pt:"Uma fuga, corrosão ou vibração ignorada pode evoluir para uma avaria grave, por vezes irreversível."} },
    { id:3, icon:"📦", label:{fr:"Protéger les biens et la cargaison",en:"Protecting property and cargo",es:"Proteger los bienes y la carga",pt:"Proteger os bens e a carga"}, desc:{fr:"Un arrimage relâché ou une condition de stockage dégradée peut endommager ou perdre une cargaison entière.",en:"Loosened lashing or a degraded storage condition can damage or lose an entire cargo.",es:"Un estibado suelto o una condición de almacenamiento degradada puede dañar o perder toda una carga.",pt:"Uma estiva solta ou uma condição de armazenamento degradada pode danificar ou perder toda uma carga."} },
    { id:4, icon:"🌊", label:{fr:"Protéger l'environnement maritime",en:"Protecting the marine environment",es:"Proteger el medio marino",pt:"Proteger o ambiente marinho"}, desc:{fr:"Une fuite d'hydrocarbures ou de produit chimique non détectée à temps peut se transformer en pollution grave.",en:"An oil or chemical leak not detected in time can turn into serious pollution.",es:"Una fuga de hidrocarburos o de producto químico no detectada a tiempo puede convertirse en una contaminación grave.",pt:"Uma fuga de hidrocarbonetos ou de produto químico não detetada a tempo pode transformar-se numa poluição grave."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Le rondier n'est pas un simple surveillant : il est le premier acteur de la prévention.":lang==="en"?"The patroller is not a mere watchman: they are the first actor of prevention.":lang==="es"?"El rondador no es un simple vigilante: es el primer actor de la prevención.":"O rondista não é um simples vigilante: é o primeiro ator da prevenção."}</div>
    </div>
  );
}

// SVG 2 - PREPARING THE PATROL (CONTEXT BEFORE EQUIPMENT)
function PreparingPatrolSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🗺️", label:{fr:"Connaître son secteur",en:"Knowing your sector",es:"Conocer tu sector",pt:"Conhecer o seu setor"}, desc:{fr:"Savoir exactement quels espaces et équipements font partie de la ronde, sans zone oubliée.",en:"Knowing exactly which spaces and equipment are part of the round, with no zone forgotten.",es:"Saber exactamente qué espacios y equipos forman parte de la ronda, sin ninguna zona olvidada.",pt:"Saber exatamente que espaços e equipamentos fazem parte da ronda, sem nenhuma zona esquecida."} },
    { id:2, icon:"⚙️", label:{fr:"Connaître les opérations en cours",en:"Knowing ongoing operations",es:"Conocer las operaciones en curso",pt:"Conhecer as operações em curso"}, desc:{fr:"Un chargement, une maintenance ou un transfert en cours change ce qui est normal d'observer à ce moment précis.",en:"A loading operation, maintenance, or transfer in progress changes what is normal to observe at that specific moment.",es:"Una carga, un mantenimiento o una transferencia en curso cambia lo que es normal observar en ese momento preciso.",pt:"Um carregamento, uma manutenção ou uma transferência em curso muda o que é normal observar nesse momento preciso."} },
    { id:3, icon:"⚠️", label:{fr:"Connaître les risques propres à la zone",en:"Knowing the risks specific to the zone",es:"Conocer los riesgos propios de la zona",pt:"Conhecer os riscos próprios da zona"}, desc:{fr:"Une salle des machines, une cale à cargaison et un espace confiné n'exigent pas la même vigilance.",en:"An engine room, a cargo hold, and a confined space do not require the same vigilance.",es:"Una sala de máquinas, una bodega de carga y un espacio confinado no exigen la misma vigilancia.",pt:"Uma casa das máquinas, um porão de carga e um espaço confinado não exigem a mesma vigilância."} },
    { id:4, icon:"✅", label:{fr:"Savoir à quoi ressemble le normal",en:"Knowing what normal looks like",es:"Saber cómo es lo normal",pt:"Saber como é o normal"}, desc:{fr:"Impossible de reconnaître une anomalie sans une référence claire de ce qui est habituel dans cette zone précise.",en:"Impossible to recognize an anomaly without a clear reference of what is usual in that specific zone.",es:"Imposible reconocer una anomalía sin una referencia clara de lo que es habitual en esa zona precisa.",pt:"Impossível reconhecer uma anomalia sem uma referência clara do que é habitual nessa zona precisa."} },
    { id:5, icon:"🎒", label:{fr:"L'équipement vient ensuite",en:"Equipment comes after",es:"El equipo viene después",pt:"O equipamento vem depois"}, desc:{fr:"Lampe, radio, carnet : utiles, mais secondaires par rapport à la connaissance du contexte opérationnel.",en:"Torch, radio, notebook: useful, but secondary compared to knowing the operational context.",es:"Linterna, radio, cuaderno: útiles, pero secundarios frente al conocimiento del contexto operativo.",pt:"Lanterna, rádio, caderno: úteis, mas secundários face ao conhecimento do contexto operacional."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Le contexte opérationnel compte autant que le matériel.":lang==="en"?"The operational context matters as much as the equipment.":lang==="es"?"El contexto operativo importa tanto como el material.":"O contexto operacional importa tanto quanto o material."}</div>
    </div>
  );
}

// SVG 3 - THE FIVE SENSES (FIVE DETECTION FAMILIES)
function FiveSensesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const families = [
    { id:1, icon:"👁️", label:{fr:"Vue",en:"Sight",es:"Vista",pt:"Visão"}, items:{fr:"fumée, corrosion, fuite, gîte, éclairage défectueux",en:"smoke, corrosion, leak, list, faulty lighting",es:"humo, corrosión, fuga, escora, iluminación defectuosa",pt:"fumo, corrosão, fuga, adornamento, iluminação defeituosa"} },
    { id:2, icon:"👂", label:{fr:"Ouïe",en:"Hearing",es:"Oído",pt:"Audição"}, items:{fr:"vibration inhabituelle, bruit métallique, pompe anormale, sifflement",en:"unusual vibration, metallic noise, abnormal pump, hissing",es:"vibración inusual, ruido metálico, bomba anormal, silbido",pt:"vibração invulgar, ruído metálico, bomba anormal, silvo"} },
    { id:3, icon:"👃", label:{fr:"Odorat",en:"Smell",es:"Olfato",pt:"Olfato"}, items:{fr:"odeur de brûlé, carburant, gaz, huile",en:"burning smell, fuel, gas, oil",es:"olor a quemado, combustible, gas, aceite",pt:"cheiro a queimado, combustível, gás, óleo"} },
    { id:4, icon:"✋", label:{fr:"Toucher (avec prudence)",en:"Touch (with caution)",es:"Tacto (con prudencia)",pt:"Tato (com prudência)"}, items:{fr:"cloison chaude, vibration, humidité",en:"warm bulkhead, vibration, dampness",es:"mamparo caliente, vibración, humedad",pt:"anteparo quente, vibração, humidade"} },
    { id:5, icon:"🧠", label:{fr:"Perception professionnelle",en:"Professional perception",es:"Percepción profesional",pt:"Perceção profissional"}, items:{fr:"ambiance inhabituelle, comportement anormal d'un équipement, l'impression que quelque chose ne fonctionne plus comme d'habitude",en:"unusual atmosphere, abnormal equipment behavior, the feeling that something no longer works as usual",es:"ambiente inusual, comportamiento anormal de un equipo, la impresión de que algo ya no funciona como de costumbre",pt:"ambiente invulgar, comportamento anormal de um equipamento, a impressão de que algo já não funciona como habitual"} },
  ];
  const sel_ = families.find(f=>f.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {families.map(f=>(
          <div key={f.id} onClick={()=>setSel(sel===f.id?null:f.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===f.id?"rgba(30,138,74,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===f.id?C.green:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{f.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{f.label[lang]||f.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.items[lang]||sel_.items.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Un marin expérimenté développe progressivement cette perception globale.":lang==="en"?"An experienced sailor progressively develops this overall perception.":lang==="es"?"Un marino experimentado desarrolla progresivamente esta percepción global.":"Um marítimo experiente desenvolve progressivamente esta perceção global."}</div>
    </div>
  );
}

// SVG 4 - OBSERVE > CONFIRM > SIGNAL > FOLLOW
function ReportMethodSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, color:C.blue2, label:{fr:"Observer",en:"Observe",es:"Observar",pt:"Observar"}, desc:{fr:"Remarquer un écart par rapport à ce qui est normal, sans encore réagir précipitamment.",en:"Notice a deviation from what is normal, without reacting hastily yet.",es:"Notar una desviación respecto a lo normal, sin reaccionar aún de forma precipitada.",pt:"Notar um desvio em relação ao que é normal, sem ainda reagir precipitadamente."} },
    { id:2, color:C.orange, label:{fr:"Confirmer",en:"Confirm",es:"Confirmar",pt:"Confirmar"}, desc:{fr:"Vérifier que ce n'est pas une impression : s'approcher prudemment, regarder de plus près, écouter à nouveau.",en:"Verify it isn't just an impression: approach cautiously, look closer, listen again.",es:"Verificar que no es solo una impresión: acercarse con prudencia, mirar más de cerca, escuchar de nuevo.",pt:"Verificar que não é apenas uma impressão: aproximar-se com prudência, olhar mais de perto, ouvir novamente."} },
    { id:3, color:C.red, label:{fr:"Signaler",en:"Signal",es:"Señalar",pt:"Sinalizar"}, desc:{fr:"Transmettre une observation précise : où, quoi, gravité apparente, évolution, risques potentiels. Jamais un simple 'il y a une fuite'.",en:"Transmit a precise observation: where, what, apparent severity, evolution, potential risks. Never just 'there's a leak'.",es:"Transmitir una observación precisa: dónde, qué, gravedad aparente, evolución, riesgos potenciales. Nunca un simple 'hay una fuga'.",pt:"Transmitir uma observação precisa: onde, o quê, gravidade aparente, evolução, riscos potenciais. Nunca um simples 'há uma fuga'."} },
    { id:4, color:C.green, label:{fr:"Suivre",en:"Follow up",es:"Seguir",pt:"Seguir"}, desc:{fr:"Revenir vérifier l'évolution de l'anomalie signalée, jusqu'à ce qu'elle soit prise en charge ou confirmée résolue.",en:"Come back to check how the reported anomaly evolves, until it is taken care of or confirmed resolved.",es:"Volver a comprobar la evolución de la anomalía señalada, hasta que sea atendida o se confirme resuelta.",pt:"Voltar a verificar a evolução da anomalia sinalizada, até ser tratada ou confirmada como resolvida."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map((s,idx)=>(
          <div key={s.id}>
            <div onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:s.color,flexShrink:0}}/>
              <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
            </div>
            {idx<steps.length-1&&<div style={{textAlign:"center",fontSize:12,color:C.muted,padding:"2px 0"}}>↓</div>}
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// INTERACTIVE - FIND THE ABNORMALITY
function FindAbnormalitySVG({ lang }) {
  const [answers, setAnswers] = useState({});
  const [showC, setShowC] = useState(false);
  const items = [
    { id:1, correct:true, text:{fr:"Une légère odeur de brûlé près d'un tableau électrique",en:"A slight burning smell near an electrical panel",es:"Un ligero olor a quemado cerca de un cuadro eléctrico",pt:"Um leve cheiro a queimado perto de um quadro elétrico"} },
    { id:2, correct:false, text:{fr:"Le bruit régulier du moteur principal en marche",en:"The regular sound of the running main engine",es:"El ruido regular del motor principal en marcha",pt:"O ruído regular do motor principal em funcionamento"} },
    { id:3, correct:true, text:{fr:"Une pompe nettement plus bruyante que d'habitude",en:"A pump noticeably louder than usual",es:"Una bomba notablemente más ruidosa de lo habitual",pt:"Uma bomba claramente mais ruidosa do que o habitual"} },
    { id:4, correct:false, text:{fr:"Une légère vibration déjà connue et signalée sur une pompe",en:"A slight vibration already known and reported on a pump",es:"Una ligera vibración ya conocida y señalada en una bomba",pt:"Uma ligeira vibração já conhecida e sinalizada numa bomba"} },
    { id:5, correct:true, text:{fr:"Une petite flaque d'huile hydraulique sous un vérin",en:"A small puddle of hydraulic oil under a ram",es:"Un pequeño charco de aceite hidráulico bajo un gato",pt:"Uma pequena poça de óleo hidráulico sob um macaco"} },
    { id:6, correct:false, text:{fr:"Le ronronnement habituel d'un ventilateur de cale",en:"The usual hum of a hold ventilation fan",es:"El zumbido habitual de un ventilador de bodega",pt:"O zumbido habitual de um ventilador de porão"} },
    { id:7, correct:true, text:{fr:"Une chaîne d'ancre anormalement tendue au mouillage",en:"An anchor chain abnormally taut at anchorage",es:"Una cadena de ancla anormalmente tensa en el fondeo",pt:"Uma corrente de âncora anormalmente tensa no fundeadouro"} },
    { id:8, correct:true, text:{fr:"Un extincteur déplacé de son emplacement habituel",en:"A fire extinguisher moved from its usual location",es:"Un extintor desplazado de su ubicación habitual",pt:"Um extintor deslocado do seu lugar habitual"} },
  ];
  const setAns = (id,val) => setAnswers(a=>({...a,[id]:val}));
  return (
    <div>
      <div style={{fontSize:11,color:C.gold2,marginBottom:10,lineHeight:1.6}}>
        {lang==="fr"?"Pendant une ronde de nuit, vous observez ces huit éléments. Pour chacun, marquez s'il s'agit d'une situation normale ou d'une anomalie.":lang==="en"?"During a night round, you observe these eight elements. For each one, mark whether it's a normal situation or an abnormality.":lang==="es"?"Durante una ronda nocturna, observas estos ocho elementos. Para cada uno, marca si es una situación normal o una anomalía.":"Durante uma ronda noturna, observas estes oito elementos. Para cada um, marca se é uma situação normal ou uma anomalia."}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {items.map(it=>{
          const userAns = answers[it.id];
          const isCorrect = userAns===it.correct;
          return (
            <div key={it.id} style={{padding:"9px 12px",borderRadius:10,background:"rgba(255,255,255,0.04)",border:`1px solid ${showC?(isCorrect?C.green+"66":C.red+"66"):"rgba(255,255,255,0.08)"}`}}>
              <div style={{fontSize:11,color:C.white,marginBottom:8,lineHeight:1.5}}>{it.text[lang]||it.text.fr}</div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setAns(it.id,false)} style={{flex:1,padding:"6px 0",borderRadius:8,fontSize:10,fontWeight:700,cursor:"pointer",background:userAns===false?"rgba(30,138,74,0.25)":"rgba(255,255,255,0.05)",border:`1px solid ${userAns===false?C.green:"rgba(255,255,255,0.1)"}`,color:userAns===false?C.green:C.muted}}>{lang==="fr"?"Normal":lang==="en"?"Normal":lang==="es"?"Normal":"Normal"}</button>
                <button onClick={()=>setAns(it.id,true)} style={{flex:1,padding:"6px 0",borderRadius:8,fontSize:10,fontWeight:700,cursor:"pointer",background:userAns===true?"rgba(192,57,43,0.25)":"rgba(255,255,255,0.05)",border:`1px solid ${userAns===true?C.red:"rgba(255,255,255,0.1)"}`,color:userAns===true?C.red:C.muted}}>{lang==="fr"?"Anomalie":lang==="en"?"Abnormality":lang==="es"?"Anomalía":"Anomalia"}</button>
              </div>
              {showC&&<div style={{fontSize:10,marginTop:6,fontWeight:600,color:isCorrect?C.green:C.red}}>{isCorrect?"✓":`✗ -> ${it.correct?(lang==="fr"?"Anomalie":"Abnormality"):(lang==="fr"?"Normal":"Normal")}`}</div>}
            </div>
          );
        })}
      </div>
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,marginTop:10,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?(lang==="fr"?"Masquer les réponses":"Hide answers"):(lang==="fr"?"Vérifier mes réponses":"Check my answers")}
      </button>
    </div>
  );
}

// EXERCISE - PATROL DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"c",q2:"b",q3:"a",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous sentez une légère odeur inhabituelle mais n'êtes pas certain de sa source. Que faites-vous ?\na) Ignorer, ce n'est probablement rien\nb) Signaler immédiatement sans vérifier davantage\nc) Vous approcher prudemment pour confirmer avant de signaler précisément"},
      {id:"q2",q:"Vous transmettez une observation à la passerelle. Que devez-vous préciser au minimum ?\na) Uniquement que quelque chose semble anormal\nb) Où, quoi, gravité apparente, évolution, risques potentiels\nc) Seulement l'heure de l'observation"},
      {id:"q3",q:"Vous ne connaissez pas bien la zone où vous faites votre ronde ce soir. Que faites-vous avant de partir ?\na) Vous renseigner sur le secteur, les opérations en cours et les risques propres à cette zone\nb) Partir directement, l'équipement suffira\nc) Attendre le lendemain pour faire la ronde"},
      {id:"q4",q:"Quelle est l'idée centrale de cette leçon ?\na) Faire sa ronde le plus vite possible\nb) Les grandes catastrophes commencent presque toujours par une petite anomalie non remarquée ou ignorée\nc) Uniquement suivre un itinéraire fixe sans réfléchir"},
    ],
    en:[
      {id:"q1",q:"You smell a slight unusual odor but aren't sure of its source. What do you do?\na) Ignore it, it's probably nothing\nb) Report immediately without checking further\nc) Approach cautiously to confirm before reporting precisely"},
      {id:"q2",q:"You transmit an observation to the bridge. What must you specify at minimum?\na) Only that something seems abnormal\nb) Where, what, apparent severity, evolution, potential risks\nc) Only the time of the observation"},
      {id:"q3",q:"You don't know the area well where you're patrolling tonight. What do you do before leaving?\na) Learn about the sector, ongoing operations, and risks specific to that zone\nb) Leave directly, the equipment will be enough\nc) Wait until tomorrow to do the round"},
      {id:"q4",q:"What is the central idea of this lesson?\na) Doing the round as fast as possible\nb) Major disasters almost always begin as a small unnoticed or ignored abnormality\nc) Only following a fixed route without thinking"},
    ],
    es:[
      {id:"q1",q:"Hueles un ligero olor inusual pero no estás seguro de su origen. ¿Qué haces?\na) Ignorarlo, probablemente no es nada\nb) Informar de inmediato sin comprobar más\nc) Acercarte con prudencia para confirmar antes de informar con precisión"},
      {id:"q2",q:"Transmites una observación al puente. ¿Qué debes precisar como mínimo?\na) Solo que algo parece anormal\nb) Dónde, qué, gravedad aparente, evolución, riesgos potenciales\nc) Solo la hora de la observación"},
      {id:"q3",q:"No conoces bien la zona donde haces tu ronda esta noche. ¿Qué haces antes de salir?\na) Informarte sobre el sector, las operaciones en curso y los riesgos propios de esa zona\nb) Salir directamente, el equipo bastará\nc) Esperar hasta mañana para hacer la ronda"},
      {id:"q4",q:"¿Cuál es la idea central de esta lección?\na) Hacer la ronda lo más rápido posible\nb) Los grandes desastres casi siempre empiezan como una pequeña anomalía no notada o ignorada\nc) Solo seguir una ruta fija sin pensar"},
    ],
    pt:[
      {id:"q1",q:"Sentes um leve odor invulgar mas não tens certeza da sua origem. O que fazes?\na) Ignorar, provavelmente não é nada\nb) Reportar de imediato sem verificar mais\nc) Aproximar-te com prudência para confirmar antes de reportar com precisão"},
      {id:"q2",q:"Transmites uma observação ao passadiço. O que deves precisar no mínimo?\na) Só que algo parece anormal\nb) Onde, o quê, gravidade aparente, evolução, riscos potenciais\nc) Só a hora da observação"},
      {id:"q3",q:"Não conheces bem a zona onde fazes a tua ronda esta noite. O que fazes antes de sair?\na) Informar-te sobre o setor, as operações em curso e os riscos próprios dessa zona\nb) Sair diretamente, o equipamento vai bastar\nc) Esperar até amanhã para fazer a ronda"},
      {id:"q4",q:"Qual é a ideia central desta lição?\na) Fazer a ronda o mais rápido possível\nb) Os grandes desastres quase sempre começam como uma pequena anomalia não notada ou ignorada\nc) Só seguir um itinerário fixo sem pensar"},
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

// COMPOSITE SCENARIO - THE NIGHT ROUND
function CompositeCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Scénario - La ronde de nuit",teaser:"Scénario composite réaliste - cinq anomalies détectées avant qu'elles ne deviennent des urgences",
      what:"Pendant une ronde de nuit en salle des machines et sur le pont, un rondier remarque successivement : une légère odeur de brûlé près d'un tableau électrique, une pompe nettement plus bruyante que d'habitude, une petite flaque d'huile hydraulique sous un vérin, une chaîne d'ancre anormalement tendue au mouillage, et un extincteur déplacé de son emplacement habituel. Aucune de ces observations ne constitue une urgence à cet instant précis.",
      cause:"• Odeur de brûlé : pourrait annoncer un début d'échauffement électrique, bien avant tout départ de feu\n• Pompe bruyante : peut signaler une usure ou un problème mécanique naissant, avant une panne complète\n• Fuite d'huile hydraulique : peut évoluer vers une perte de pression ou un risque de glissade, avant un incident plus grave\n• Chaîne d'ancre tendue : peut indiquer que l'ancre commence à chasser, avant une dérive incontrôlée\n• Extincteur déplacé : peut signaler qu'il a été utilisé ou mal remis en place, compromettant sa disponibilité en cas de besoin réel",
      lessons:"✓ Every Major Accident Begins As A Small Abnormality : aucune de ces cinq observations n'est une urgence, mais chacune pourrait le devenir si elle passe inaperçue\n✓ La détection précoce de plusieurs petites anomalies dans une même ronde n'est jamais une coïncidence à ignorer\n✓ Chaque anomalie appelle la méthode Observer → Confirmer → Signaler → Suivre, pas une réaction improvisée\n✓ Ce scénario illustre exactement ce qu'un excellent rondier doit remarquer avant que quiconque n'ait besoin d'intervenir en urgence",
      link:"🔗 C'est précisément parce qu'un bon rondier détecte ce type de signaux faibles qu'aucun rapport d'enquête ne sera jamais nécessaire pour cette nuit-là."},
    en:{title:"Scenario - The Night Round",teaser:"Realistic composite scenario - five anomalies caught before they became emergencies",
      what:"During a night round in the engine room and on deck, a patroller successively notices: a slight burning smell near an electrical panel, a pump noticeably louder than usual, a small puddle of hydraulic oil under a ram, an anchor chain abnormally taut at anchorage, and a fire extinguisher moved from its usual location. None of these observations is an emergency at this precise moment.",
      cause:"• Burning smell: could announce the start of electrical overheating, well before any fire breaks out\n• Noisy pump: may signal wear or an emerging mechanical problem, before a complete breakdown\n• Hydraulic oil leak: may evolve into a pressure loss or a slipping hazard, before a more serious incident\n• Taut anchor chain: may indicate the anchor is starting to drag, before an uncontrolled drift\n• Moved extinguisher: may signal it was used or poorly put back, compromising its availability if genuinely needed",
      lessons:"✓ Every Major Accident Begins As A Small Abnormality: none of these five observations is an emergency, but each could become one if it goes unnoticed\n✓ Early detection of several small anomalies within the same round is never a coincidence to ignore\n✓ Each anomaly calls for the Observe → Confirm → Signal → Follow up method, never an improvised reaction\n✓ This scenario illustrates exactly what an excellent patroller must notice before anyone needs to intervene in an emergency",
      link:"🔗 It is precisely because a good patroller detects this kind of weak signal that no investigation report will ever be needed for that night."},
    es:{title:"Escenario - La ronda nocturna",teaser:"Escenario compuesto realista - cinco anomalías detectadas antes de convertirse en emergencias",
      what:"Durante una ronda nocturna en la sala de máquinas y en cubierta, un rondador observa sucesivamente: un ligero olor a quemado cerca de un cuadro eléctrico, una bomba notablemente más ruidosa de lo habitual, un pequeño charco de aceite hidráulico bajo un gato, una cadena de ancla anormalmente tensa en el fondeo, y un extintor desplazado de su ubicación habitual. Ninguna de estas observaciones constituye una emergencia en ese momento preciso.",
      cause:"• Olor a quemado: podría anunciar un principio de sobrecalentamiento eléctrico, mucho antes de cualquier inicio de fuego\n• Bomba ruidosa: puede señalar un desgaste o un problema mecánico incipiente, antes de una avería completa\n• Fuga de aceite hidráulico: puede evolucionar hacia una pérdida de presión o un riesgo de resbalón, antes de un incidente más grave\n• Cadena de ancla tensa: puede indicar que el ancla empieza a garrear, antes de una deriva incontrolada\n• Extintor desplazado: puede señalar que fue usado o mal repuesto, comprometiendo su disponibilidad si realmente se necesitara",
      lessons:"✓ Every Major Accident Begins As A Small Abnormality: ninguna de estas cinco observaciones es una emergencia, pero cada una podría llegar a serlo si pasa desapercibida\n✓ La deteccion temprana de varias pequeñas anomalías en una misma ronda nunca es una coincidencia a ignorar\n✓ Cada anomalía requiere el método Observar → Confirmar → Señalar → Seguir, nunca una reacción improvisada\n✓ Este escenario ilustra exactamente lo que un excelente rondador debe notar antes de que alguien necesite intervenir en una emergencia",
      link:"🔗 Es precisamente porque un buen rondador detecta este tipo de señales débiles que nunca será necesario un informe de investigación para esa noche."},
    pt:{title:"Cenário - A ronda noturna",teaser:"Cenário composto realista - cinco anomalias detetadas antes de se tornarem urgências",
      what:"Durante uma ronda noturna na casa das máquinas e no convés, um rondista observa sucessivamente: um leve cheiro a queimado perto de um quadro elétrico, uma bomba claramente mais ruidosa do que o habitual, uma pequena poça de óleo hidráulico sob um macaco, uma corrente de âncora anormalmente tensa no fundeadouro, e um extintor deslocado do seu lugar habitual. Nenhuma destas observações constitui uma urgência nesse momento preciso.",
      cause:"• Cheiro a queimado: pode anunciar um início de sobreaquecimento elétrico, bem antes de qualquer início de incêndio\n• Bomba ruidosa: pode sinalizar um desgaste ou um problema mecânico nascente, antes de uma avaria completa\n• Fuga de óleo hidráulico: pode evoluir para uma perda de pressão ou um risco de escorregamento, antes de um incidente mais grave\n• Corrente de âncora tensa: pode indicar que a âncora começa a arrastar, antes de uma deriva incontrolada\n• Extintor deslocado: pode sinalizar que foi usado ou mal recolocado, comprometendo a sua disponibilidade se for realmente necessário",
      lessons:"✓ Every Major Accident Begins As A Small Abnormality: nenhuma destas cinco observações é uma urgência, mas cada uma poderia tornar-se numa se passar despercebida\n✓ A deteção precoce de várias pequenas anomalias na mesma ronda nunca é uma coincidência a ignorar\n✓ Cada anomalia exige o método Observar → Confirmar → Sinalizar → Seguir, nunca uma reação improvisada\n✓ Este cenário ilustra exatamente o que um excelente rondista deve notar antes de alguém precisar de intervir numa urgência",
      link:"🔗 É precisamente porque um bom rondista deteta este tipo de sinais fracos que nunca será necessário um relatório de investigação para essa noite."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{background:"rgba(230,126,34,0.08)",border:`1.5px solid ${C.orange}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🔦</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.orange,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"POURQUOI CHAQUE SIGNE COMPTE":lang==="en"?"WHY EACH SIGN MATTERS":lang==="es"?"POR QUÉ CADA SEÑAL IMPORTA":"POR QUE CADA SINAL IMPORTA"}</div>
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
    {q:"Que signifie le principe 'Every Major Accident Begins As A Small Abnormality' ?",opts:["Les grandes catastrophes surviennent toujours sans aucun signe avant-coureur","Les grandes catastrophes commencent presque toujours par une petite anomalie non remarquée ou ignorée","Ce principe ne concerne que les incendies","Seuls les grands navires connaissent ce type de catastrophe"],correct:1,expl:"Le rôle du rondier est précisément de voir ces petites anomalies avant qu'elles ne deviennent de grands accidents."},
    {q:"Quelle est la mission exacte de cette leçon ?",opts:["Apprendre uniquement l'itinéraire d'une ronde","Répondre à la question : comment empêcher un incident de naître avant qu'il ne devienne une urgence","Enseigner les procédures d'urgence complètes","Présenter l'historique des rondes de sécurité"],correct:1,expl:"Le rondier est le premier maillon de toute la chaîne de sécurité du navire."},
    {q:"Quelles sont les quatre responsabilités fondamentales du rondier ?",opts:["Uniquement surveiller le pont","Protéger les personnes, le navire, les biens et la cargaison, l'environnement maritime","Uniquement remplir un registre","Uniquement vérifier l'heure des relèves"],correct:1,expl:"Le rondier n'est pas un simple surveillant, il protège simultanément ces quatre dimensions."},
    {q:"Que faut-il connaître avant de partir en ronde, selon cette leçon ?",opts:["Uniquement l'équipement à emporter","Son secteur, les opérations en cours, les risques propres à la zone, et à quoi ressemble le normal","Rien de particulier, l'expérience suffit toujours","Uniquement les horaires de repas"],correct:1,expl:"Le contexte opérationnel compte autant que le matériel emporté."},
    {q:"Pourquoi l'équipement (lampe, radio, carnet) vient-il après la connaissance du contexte ?",opts:["L'équipement n'a aucune utilité réelle","Sans connaître le secteur et le normal, l'équipement seul ne permet pas de détecter une anomalie","L'équipement doit toujours être vérifié en premier","Ce n'est pas vrai, l'équipement passe toujours en premier"],correct:1,expl:"Le contexte opérationnel est la base ; l'équipement soutient ensuite l'observation."},
    {q:"Que couvre la famille de détection 'Vue' ?",opts:["Uniquement la fumée","Fumée, corrosion, fuite, gîte, éclairage défectueux","Uniquement les bruits inhabituels","Uniquement les odeurs"],correct:1,expl:"Chaque famille de sens détecte un type d'anomalie différent."},
    {q:"Que couvre la famille de détection 'Ouïe' ?",opts:["Vibration inhabituelle, bruit métallique, pompe anormale, sifflement","Uniquement l'odeur de brûlé","Uniquement la gîte du navire","Uniquement la fatigue de l'équipage"],correct:1,expl:"L'ouïe détecte des signaux souvent invisibles à l'œil nu."},
    {q:"Pourquoi le toucher doit-il être utilisé avec prudence pendant une ronde ?",opts:["Le toucher n'apporte aucune information utile","Toucher une surface inconnue sans précaution peut être dangereux (chaleur, courant, produit)","Il faut toujours toucher toutes les surfaces suspectes directement","Le toucher est interdit dans toutes les circonstances"],correct:1,expl:"Le toucher reste un sens utile, mais jamais sans prudence face à une surface inconnue."},
    {q:"Que représente la perception professionnelle, la cinquième famille de détection ?",opts:["Une simple impression sans valeur réelle","L'impression qu'un élément ne fonctionne plus comme d'habitude, une ambiance inhabituelle, un comportement anormal d'équipement","Uniquement la vue et l'ouïe combinées","Un sens qui ne se développe jamais avec l'expérience"],correct:1,expl:"Un marin expérimenté développe progressivement cette perception globale au-delà des cinq sens classiques."},
    {q:"Que signifie la première étape 'Observer' de la méthode de signalement ?",opts:["Réagir immédiatement sans réfléchir","Remarquer un écart par rapport à ce qui est normal, sans encore réagir précipitamment","Ignorer ce qui semble mineur","Attendre la fin de la ronde pour tout regrouper"],correct:1,expl:"Observer précède toujours la réaction précipitée."},
    {q:"Que signifie l'étape 'Confirmer' ?",opts:["Signaler immédiatement sans vérification","Vérifier que ce n'est pas une impression, en s'approchant prudemment ou en regardant de plus près","Ignorer l'anomalie si elle semble mineure","Attendre qu'un collègue confirme à sa place"],correct:1,expl:"Confirmer évite de signaler une fausse alerte ou de sous-estimer un vrai risque."},
    {q:"Une observation transmise doit-elle se limiter à 'il y a une fuite' ?",opts:["Oui, c'est suffisant dans tous les cas","Non, il faut préciser où, quoi, gravité apparente, évolution, et risques potentiels","Oui, les détails ralentissent la transmission","Non, mais uniquement la localisation suffit"],correct:1,expl:"Une observation vague ne permet pas à la passerelle de réagir efficacement."},
    {q:"Que signifie la dernière étape 'Suivre' ?",opts:["La responsabilité du rondier s'arrête au signalement","Revenir vérifier l'évolution de l'anomalie signalée jusqu'à sa prise en charge ou sa résolution confirmée","Ignorer l'anomalie une fois signalée","Attendre que quelqu'un d'autre s'en charge sans jamais revérifier"],correct:1,expl:"Le suivi garantit que l'anomalie ne soit pas oubliée après son signalement."},
    {q:"Dans le scénario de la ronde de nuit, combien d'anomalies distinctes le rondier détecte-t-il ?",opts:["Une seule","Cinq anomalies distinctes, aucune n'étant encore une urgence","Aucune anomalie n'est détectée","Dix anomalies différentes"],correct:1,expl:"Odeur de brûlé, pompe bruyante, fuite d'huile, chaîne d'ancre tendue, extincteur déplacé."},
    {q:"Pourquoi ce scénario est-il composite plutôt qu'un cas réel documenté ?",opts:["Parce qu'aucun cas réel n'existe jamais dans ce domaine","Parce que le travail d'un excellent rondier consiste justement à empêcher qu'un événement devienne assez grave pour faire l'objet d'un rapport d'enquête","Parce que les cas composites sont toujours préférés dans MAP","Parce que cette leçon ne nécessite aucun exemple concret"],correct:1,expl:"Un rondier qui fait bien son travail empêche justement l'existence du rapport d'enquête qu'on pourrait citer."},
  ],
  en:[
    {q:"What does the principle 'Every Major Accident Begins As A Small Abnormality' mean?",opts:["Major disasters always occur with no warning signs at all","Major disasters almost always begin as a small abnormality that went unnoticed or was ignored","This principle only concerns fires","Only large ships experience this kind of disaster"],correct:1,expl:"The patroller's role is precisely to see these small abnormalities before they become major accidents."},
    {q:"What is the exact mission of this lesson?",opts:["Only learn the route of a round","Answer the question: how to prevent an incident from being born before it becomes an emergency","Teach complete emergency procedures","Present the history of safety rounds"],correct:1,expl:"The patroller is the first link in the whole safety chain of the ship."},
    {q:"What are the four fundamental responsibilities of the patroller?",opts:["Only watching the deck","Protecting people, the ship, property and cargo, the marine environment","Only filling out a logbook","Only checking watch handover times"],correct:1,expl:"The patroller is not a mere watchman, they protect these four dimensions simultaneously."},
    {q:"What must be known before going on patrol, according to this lesson?",opts:["Only the equipment to bring","Your sector, ongoing operations, risks specific to the zone, and what normal looks like","Nothing in particular, experience is always enough","Only meal times"],correct:1,expl:"The operational context matters as much as the equipment carried."},
    {q:"Why does equipment (torch, radio, notebook) come after knowing the context?",opts:["Equipment has no real use","Without knowing the sector and what's normal, equipment alone cannot detect an anomaly","Equipment must always be checked first","This isn't true, equipment always comes first"],correct:1,expl:"The operational context is the foundation; equipment then supports observation."},
    {q:"What does the 'Sight' detection family cover?",opts:["Only smoke","Smoke, corrosion, leak, list, faulty lighting","Only unusual noises","Only smells"],correct:1,expl:"Each sense family detects a different type of anomaly."},
    {q:"What does the 'Hearing' detection family cover?",opts:["Unusual vibration, metallic noise, abnormal pump, hissing","Only the smell of burning","Only the ship's list","Only crew fatigue"],correct:1,expl:"Hearing detects signals often invisible to the naked eye."},
    {q:"Why must touch be used with caution during a round?",opts:["Touch provides no useful information","Touching an unknown surface without precaution can be dangerous (heat, current, product)","You must always touch all suspicious surfaces directly","Touch is forbidden in all circumstances"],correct:1,expl:"Touch remains a useful sense, but never without caution facing an unknown surface."},
    {q:"What does professional perception, the fifth detection family, represent?",opts:["A simple impression with no real value","The feeling that something no longer works as usual, an unusual atmosphere, abnormal equipment behavior","Only sight and hearing combined","A sense that never develops with experience"],correct:1,expl:"An experienced sailor progressively develops this overall perception beyond the five classic senses."},
    {q:"What does the first step 'Observe' of the reporting method mean?",opts:["React immediately without thinking","Notice a deviation from what is normal, without reacting hastily yet","Ignore what seems minor","Wait until the end of the round to gather everything"],correct:1,expl:"Observing always precedes a hasty reaction."},
    {q:"What does the 'Confirm' step mean?",opts:["Report immediately without checking","Verify it isn't just an impression, by approaching cautiously or looking closer","Ignore the anomaly if it seems minor","Wait for a colleague to confirm instead"],correct:1,expl:"Confirming avoids reporting a false alarm or underestimating a real risk."},
    {q:"Should a transmitted observation be limited to 'there's a leak'?",opts:["Yes, that's always enough","No, you must specify where, what, apparent severity, evolution, and potential risks","Yes, details slow down transmission","No, but only the location is enough"],correct:1,expl:"A vague observation doesn't allow the bridge to react effectively."},
    {q:"What does the final step 'Follow up' mean?",opts:["The patroller's responsibility ends at reporting","Coming back to check how the reported anomaly evolves until it is handled or confirmed resolved","Ignoring the anomaly once reported","Waiting for someone else to handle it without ever rechecking"],correct:1,expl:"Follow-up ensures the anomaly isn't forgotten after being reported."},
    {q:"In the night round scenario, how many distinct anomalies does the patroller detect?",opts:["Just one","Five distinct anomalies, none yet an emergency","No anomaly is detected","Ten different anomalies"],correct:1,expl:"Burning smell, noisy pump, oil leak, taut anchor chain, moved extinguisher."},
    {q:"Why is this scenario composite rather than a real documented case?",opts:["Because no real case ever exists in this field","Because the work of an excellent patroller is precisely to prevent an event from becoming serious enough to be the subject of an investigation report","Because composite cases are always preferred in MAP","Because this lesson needs no concrete example"],correct:1,expl:"A patroller who does their job well precisely prevents the existence of the investigation report one could cite."},
  ],
  es:[
    {q:"¿Qué significa el principio 'Every Major Accident Begins As A Small Abnormality'?",opts:["Los grandes desastres siempre ocurren sin ningún signo de advertencia","Los grandes desastres casi siempre empiezan como una pequeña anomalía no notada o ignorada","Este principio solo concierne a los incendios","Solo los grandes buques sufren este tipo de desastre"],correct:1,expl:"El papel del rondador es precisamente ver estas pequeñas anomalías antes de que se conviertan en grandes accidentes."},
    {q:"¿Cuál es la misión exacta de esta lección?",opts:["Solo aprender el itinerario de una ronda","Responder a la pregunta: cómo impedir que un incidente nazca antes de convertirse en una urgencia","Enseñar procedimientos de emergencia completos","Presentar la historia de las rondas de seguridad"],correct:1,expl:"El rondador es el primer eslabón de toda la cadena de seguridad del buque."},
    {q:"¿Cuáles son las cuatro responsabilidades fundamentales del rondador?",opts:["Solo vigilar la cubierta","Proteger a las personas, el buque, los bienes y la carga, el medio marino","Solo rellenar un registro","Solo comprobar los horarios de relevo"],correct:1,expl:"El rondador no es un simple vigilante, protege simultáneamente estas cuatro dimensiones."},
    {q:"¿Qué hay que conocer antes de salir de ronda, según esta lección?",opts:["Solo el equipo a llevar","Tu sector, las operaciones en curso, los riesgos propios de la zona, y cómo es lo normal","Nada en particular, la experiencia siempre basta","Solo los horarios de comida"],correct:1,expl:"El contexto operativo importa tanto como el material llevado."},
    {q:"¿Por qué el equipo (linterna, radio, cuaderno) viene después de conocer el contexto?",opts:["El equipo no tiene ninguna utilidad real","Sin conocer el sector y lo normal, el equipo solo no permite detectar una anomalía","El equipo siempre debe comprobarse primero","No es cierto, el equipo siempre va primero"],correct:1,expl:"El contexto operativo es la base; el equipo luego apoya la observación."},
    {q:"¿Qué cubre la familia de detección 'Vista'?",opts:["Solo el humo","Humo, corrosión, fuga, escora, iluminación defectuosa","Solo los ruidos inusuales","Solo los olores"],correct:1,expl:"Cada familia de sentidos detecta un tipo de anomalía diferente."},
    {q:"¿Qué cubre la familia de detección 'Oído'?",opts:["Vibración inusual, ruido metálico, bomba anormal, silbido","Solo el olor a quemado","Solo la escora del buque","Solo la fatiga de la tripulación"],correct:1,expl:"El oído detecta señales a menudo invisibles a simple vista."},
    {q:"¿Por qué debe usarse el tacto con prudencia durante una ronda?",opts:["El tacto no aporta ninguna información útil","Tocar una superficie desconocida sin precaución puede ser peligroso (calor, corriente, producto)","Siempre hay que tocar directamente todas las superficies sospechosas","El tacto está prohibido en todas las circunstancias"],correct:1,expl:"El tacto sigue siendo un sentido útil, pero nunca sin prudencia ante una superficie desconocida."},
    {q:"¿Qué representa la percepción profesional, la quinta familia de detección?",opts:["Una simple impresión sin valor real","La impresión de que algo ya no funciona como de costumbre, un ambiente inusual, un comportamiento anormal de un equipo","Solo la vista y el oído combinados","Un sentido que nunca se desarrolla con la experiencia"],correct:1,expl:"Un marino experimentado desarrolla progresivamente esta percepción global más allá de los cinco sentidos clásicos."},
    {q:"¿Qué significa el primer paso 'Observar' del método de señalización?",opts:["Reaccionar de inmediato sin pensar","Notar una desviación respecto a lo normal, sin reaccionar aún de forma precipitada","Ignorar lo que parece menor","Esperar al final de la ronda para agrupar todo"],correct:1,expl:"Observar siempre precede a una reacción precipitada."},
    {q:"¿Qué significa el paso 'Confirmar'?",opts:["Informar de inmediato sin comprobar","Verificar que no es solo una impresión, acercándose con prudencia o mirando más de cerca","Ignorar la anomalía si parece menor","Esperar a que un compañero confirme en su lugar"],correct:1,expl:"Confirmar evita informar una falsa alarma o subestimar un riesgo real."},
    {q:"¿Debe una observación transmitida limitarse a 'hay una fuga'?",opts:["Sí, siempre basta","No, hay que precisar dónde, qué, gravedad aparente, evolución, y riesgos potenciales","Sí, los detalles ralentizan la transmisión","No, pero solo basta la ubicación"],correct:1,expl:"Una observación vaga no permite al puente reaccionar de forma eficaz."},
    {q:"¿Qué significa el último paso 'Seguir'?",opts:["La responsabilidad del rondador termina al informar","Volver a comprobar la evolución de la anomalía señalada hasta que sea atendida o confirmada resuelta","Ignorar la anomalía una vez señalada","Esperar a que otra persona se encargue sin volver a comprobar nunca"],correct:1,expl:"El seguimiento garantiza que la anomalía no se olvide tras ser señalada."},
    {q:"En el escenario de la ronda nocturna, ¿cuántas anomalías distintas detecta el rondador?",opts:["Solo una","Cinco anomalías distintas, ninguna todavía una emergencia","No se detecta ninguna anomalía","Diez anomalías diferentes"],correct:1,expl:"Olor a quemado, bomba ruidosa, fuga de aceite, cadena de ancla tensa, extintor desplazado."},
    {q:"¿Por qué este escenario es compuesto en lugar de un caso real documentado?",opts:["Porque nunca existe un caso real en este ámbito","Porque el trabajo de un excelente rondador consiste precisamente en impedir que un evento se vuelva lo bastante grave como para ser objeto de un informe de investigación","Porque los casos compuestos siempre se prefieren en MAP","Porque esta lección no necesita ningún ejemplo concreto"],correct:1,expl:"Un rondador que hace bien su trabajo impide precisamente la existencia del informe de investigación que se podría citar."},
  ],
  pt:[
    {q:"O que significa o princípio 'Every Major Accident Begins As A Small Abnormality'?",opts:["As grandes catástrofes ocorrem sempre sem qualquer sinal de aviso","As grandes catástrofes quase sempre começam como uma pequena anomalia não notada ou ignorada","Este princípio só diz respeito a incêndios","Só os grandes navios sofrem este tipo de catástrofe"],correct:1,expl:"O papel do rondista é precisamente ver estas pequenas anomalias antes de se tornarem grandes acidentes."},
    {q:"Qual é a missão exata desta lição?",opts:["Só aprender o itinerário de uma ronda","Responder à pergunta: como impedir que um incidente nasça antes de se tornar uma urgência","Ensinar procedimentos de emergência completos","Apresentar a história das rondas de segurança"],correct:1,expl:"O rondista é o primeiro elo de toda a cadeia de segurança do navio."},
    {q:"Quais são as quatro responsabilidades fundamentais do rondista?",opts:["Só vigiar o convés","Proteger as pessoas, o navio, os bens e a carga, o ambiente marinho","Só preencher um registo","Só verificar os horários de rendição"],correct:1,expl:"O rondista não é um simples vigilante, protege simultaneamente estas quatro dimensões."},
    {q:"O que deve ser conhecido antes de sair em ronda, segundo esta lição?",opts:["Só o equipamento a levar","O seu setor, as operações em curso, os riscos próprios da zona, e como é o normal","Nada em particular, a experiência basta sempre","Só os horários das refeições"],correct:1,expl:"O contexto operacional importa tanto quanto o material levado."},
    {q:"Por que o equipamento (lanterna, rádio, caderno) vem depois de conhecer o contexto?",opts:["O equipamento não tem qualquer utilidade real","Sem conhecer o setor e o normal, o equipamento sozinho não permite detetar uma anomalia","O equipamento deve sempre ser verificado primeiro","Não é verdade, o equipamento vem sempre primeiro"],correct:1,expl:"O contexto operacional é a base; o equipamento depois apoia a observação."},
    {q:"O que cobre a família de deteção 'Visão'?",opts:["Só o fumo","Fumo, corrosão, fuga, adornamento, iluminação defeituosa","Só os ruídos invulgares","Só os cheiros"],correct:1,expl:"Cada família de sentidos deteta um tipo de anomalia diferente."},
    {q:"O que cobre a família de deteção 'Audição'?",opts:["Vibração invulgar, ruído metálico, bomba anormal, silvo","Só o cheiro a queimado","Só o adornamento do navio","Só a fadiga da tripulação"],correct:1,expl:"A audição deteta sinais muitas vezes invisíveis a olho nu."},
    {q:"Por que o tato deve ser usado com prudência durante uma ronda?",opts:["O tato não traz qualquer informação útil","Tocar numa superfície desconhecida sem precaução pode ser perigoso (calor, corrente, produto)","Deve-se sempre tocar diretamente em todas as superfícies suspeitas","O tato é proibido em todas as circunstâncias"],correct:1,expl:"O tato continua a ser um sentido útil, mas nunca sem prudência perante uma superfície desconhecida."},
    {q:"O que representa a perceção profissional, a quinta família de deteção?",opts:["Uma simples impressão sem valor real","A impressão de que algo já não funciona como habitual, um ambiente invulgar, um comportamento anormal de um equipamento","Só a visão e a audição combinadas","Um sentido que nunca se desenvolve com a experiência"],correct:1,expl:"Um marítimo experiente desenvolve progressivamente esta perceção global além dos cinco sentidos clássicos."},
    {q:"O que significa a primeira etapa 'Observar' do método de sinalização?",opts:["Reagir de imediato sem pensar","Notar um desvio em relação ao que é normal, sem ainda reagir precipitadamente","Ignorar o que parece menor","Esperar pelo fim da ronda para agrupar tudo"],correct:1,expl:"Observar precede sempre uma reação precipitada."},
    {q:"O que significa a etapa 'Confirmar'?",opts:["Reportar de imediato sem verificar","Verificar que não é apenas uma impressão, aproximando-se com prudência ou olhando mais de perto","Ignorar a anomalia se parecer menor","Esperar que um colega confirme em seu lugar"],correct:1,expl:"Confirmar evita reportar um falso alarme ou subestimar um risco real."},
    {q:"Uma observação transmitida deve limitar-se a 'há uma fuga'?",opts:["Sim, basta sempre","Não, é preciso precisar onde, o quê, gravidade aparente, evolução, e riscos potenciais","Sim, os detalhes atrasam a transmissão","Não, mas só a localização basta"],correct:1,expl:"Uma observação vaga não permite ao passadiço reagir de forma eficaz."},
    {q:"O que significa a última etapa 'Seguir'?",opts:["A responsabilidade do rondista termina ao reportar","Voltar a verificar a evolução da anomalia sinalizada até ser tratada ou confirmada como resolvida","Ignorar a anomalia depois de sinalizada","Esperar que outra pessoa se encarregue sem nunca voltar a verificar"],correct:1,expl:"O seguimento garante que a anomalia não seja esquecida depois de sinalizada."},
    {q:"No cenário da ronda noturna, quantas anomalias distintas o rondista deteta?",opts:["Apenas uma","Cinco anomalias distintas, nenhuma ainda uma urgência","Nenhuma anomalia é detetada","Dez anomalias diferentes"],correct:1,expl:"Cheiro a queimado, bomba ruidosa, fuga de óleo, corrente de âncora tensa, extintor deslocado."},
    {q:"Por que este cenário é composto em vez de um caso real documentado?",opts:["Porque nunca existe um caso real neste domínio","Porque o trabalho de um excelente rondista consiste precisamente em impedir que um evento se torne suficientemente grave para ser objeto de um relatório de investigação","Porque os casos compostos são sempre preferidos na MAP","Porque esta lição não precisa de nenhum exemplo concreto"],correct:1,expl:"Um rondista que faz bem o seu trabalho impede precisamente a existência do relatório de investigação que se poderia citar."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'Every Major Accident Begins As A Small Abnormality' ?",opts:["Les catastrophes surviennent sans aucun signe","Elles commencent presque toujours par une petite anomalie non remarquée","Cela ne concerne que les incendies","Uniquement les grands navires sont concernés"],correct:1,expl:"Le rôle du rondier est de voir ces anomalies avant qu'elles ne deviennent des accidents."},
    {q:"Quelles sont les quatre responsabilités du rondier ?",opts:["Uniquement surveiller le pont","Personnes, navire, biens et cargaison, environnement","Uniquement remplir un registre","Uniquement les horaires"],correct:1,expl:"Le rondier protège ces quatre dimensions simultanément."},
    {q:"Que faut-il préciser en signalant une observation ?",opts:["Rien de spécifique","Où, quoi, gravité apparente, évolution, risques potentiels","Uniquement l'heure","Uniquement son nom"],correct:1,expl:"Une observation vague ne permet pas de réagir efficacement."},
    {q:"Que signifie l'étape 'Confirmer' de la méthode de signalement ?",opts:["Signaler sans vérifier","Vérifier prudemment avant de signaler précisément","Ignorer l'anomalie","Attendre qu'un collègue confirme"],correct:1,expl:"Confirmer évite une fausse alerte ou une sous-estimation du risque."},
    {q:"Pourquoi le cas de cette leçon est-il composite plutôt que réel ?",opts:["Aucun cas réel n'existe jamais","Un bon rondier empêche justement qu'un événement devienne assez grave pour un rapport d'enquête","Les cas composites sont toujours préférés","Cette leçon ne nécessite aucun exemple"],correct:1,expl:"C'est exactement l'objectif de la vigilance enseignée dans cette leçon."},
  ],
  en:[
    {q:"What does 'Every Major Accident Begins As A Small Abnormality' mean?",opts:["Disasters occur with no signs at all","They almost always begin as a small unnoticed abnormality","It only concerns fires","Only large ships are concerned"],correct:1,expl:"The patroller's role is to see these anomalies before they become accidents."},
    {q:"What are the four responsibilities of the patroller?",opts:["Only watching the deck","People, ship, property and cargo, environment","Only filling a logbook","Only schedules"],correct:1,expl:"The patroller protects these four dimensions simultaneously."},
    {q:"What must be specified when reporting an observation?",opts:["Nothing specific","Where, what, apparent severity, evolution, potential risks","Only the time","Only your name"],correct:1,expl:"A vague observation doesn't allow effective reaction."},
    {q:"What does the 'Confirm' step of the reporting method mean?",opts:["Report without checking","Cautiously verify before reporting precisely","Ignore the anomaly","Wait for a colleague to confirm"],correct:1,expl:"Confirming avoids a false alarm or underestimating the risk."},
    {q:"Why is this lesson's case composite rather than real?",opts:["No real case ever exists","A good patroller precisely prevents an event from becoming serious enough for an investigation report","Composite cases are always preferred","This lesson needs no example"],correct:1,expl:"This is exactly the goal of the vigilance taught in this lesson."},
  ],
  es:[
    {q:"¿Qué significa 'Every Major Accident Begins As A Small Abnormality'?",opts:["Las catástrofes ocurren sin ninguna señal","Casi siempre empiezan como una pequeña anomalía no notada","Solo concierne a los incendios","Solo los grandes buques están concernidos"],correct:1,expl:"El papel del rondador es ver estas anomalías antes de que se conviertan en accidentes."},
    {q:"¿Cuáles son las cuatro responsabilidades del rondador?",opts:["Solo vigilar la cubierta","Personas, buque, bienes y carga, medio ambiente","Solo rellenar un registro","Solo los horarios"],correct:1,expl:"El rondador protege estas cuatro dimensiones simultáneamente."},
    {q:"¿Qué hay que precisar al informar una observación?",opts:["Nada específico","Dónde, qué, gravedad aparente, evolución, riesgos potenciales","Solo la hora","Solo tu nombre"],correct:1,expl:"Una observación vaga no permite reaccionar de forma eficaz."},
    {q:"¿Qué significa el paso 'Confirmar' del método de señalización?",opts:["Informar sin comprobar","Verificar con prudencia antes de informar con precisión","Ignorar la anomalía","Esperar a que un compañero confirme"],correct:1,expl:"Confirmar evita una falsa alarma o una subestimación del riesgo."},
    {q:"¿Por qué el caso de esta lección es compuesto en lugar de real?",opts:["Nunca existe un caso real","Un buen rondador impide precisamente que un evento se vuelva lo bastante grave para un informe de investigación","Los casos compuestos siempre se prefieren","Esta lección no necesita ningún ejemplo"],correct:1,expl:"Este es exactamente el objetivo de la vigilancia enseñada en esta lección."},
  ],
  pt:[
    {q:"O que significa 'Every Major Accident Begins As A Small Abnormality'?",opts:["As catástrofes ocorrem sem qualquer sinal","Quase sempre começam como uma pequena anomalia não notada","Só diz respeito a incêndios","Só os grandes navios estão implicados"],correct:1,expl:"O papel do rondista é ver estas anomalias antes de se tornarem acidentes."},
    {q:"Quais são as quatro responsabilidades do rondista?",opts:["Só vigiar o convés","Pessoas, navio, bens e carga, ambiente","Só preencher um registo","Só os horários"],correct:1,expl:"O rondista protege estas quatro dimensões simultaneamente."},
    {q:"O que deve ser precisado ao reportar uma observação?",opts:["Nada específico","Onde, o quê, gravidade aparente, evolução, riscos potenciais","Só a hora","Só o teu nome"],correct:1,expl:"Uma observação vaga não permite reagir de forma eficaz."},
    {q:"O que significa a etapa 'Confirmar' do método de sinalização?",opts:["Reportar sem verificar","Verificar com prudência antes de reportar com precisão","Ignorar a anomalia","Esperar que um colega confirme"],correct:1,expl:"Confirmar evita um falso alarme ou uma subestimação do risco."},
    {q:"Por que o caso desta lição é composto em vez de real?",opts:["Nunca existe um caso real","Um bom rondista impede precisamente que um evento se torne suficientemente grave para um relatório de investigação","Os casos compostos são sempre preferidos","Esta lição não precisa de nenhum exemplo"],correct:1,expl:"Este é exatamente o objetivo da vigilância ensinada nesta lição."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Lors de ta derniere ronde, y a-t-il eu un detail que tu as remarque sans le signaler, en pensant que ce n'etait probablement rien ?",
    en:"During your last round, was there a detail you noticed without reporting it, thinking it was probably nothing?",
    es:"Durante tu ultima ronda, ¿hubo algun detalle que notaste sin informarlo, pensando que probablemente no era nada?",
    pt:"Durante a tua ultima ronda, houve algum detalhe que notaste sem o reportar, pensando que provavelmente nao era nada?",
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
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Leçon 1/6 · ⭐ Premium",
      title:"Safety Patrol & Hazard Recognition",
      intro:"Cette leçon ne traite pas encore d'une urgence déjà déclarée, ni des EPI, ni du format d'annonce d'urgence. Elle répond à une question plus fondamentale : comment empêcher un incident de naître avant qu'il ne devienne une urgence ?",
      p0:"EVERY MAJOR ACCIDENT BEGINS AS A SMALL ABNORMALITY.",s0t:"Le principe qui structure toute la leçon",
      s0:"Le rondier est le premier maillon de toute la chaîne de sécurité du navire. Son rôle n'est pas seulement d'observer : il protège simultanément les personnes, le navire, la cargaison et l'environnement.\n\nCOMMENT LE RECONNAÎTRE ? Un écart, même minime, par rapport à ce qui est normal dans une zone précise.\nQUE FAIRE IMMÉDIATEMENT ? Observer, confirmer prudemment, signaler avec précision, suivre l'évolution.\nQUELLE ERREUR L'AGGRAVE ? Ignorer un détail en pensant que ce n'est probablement rien.\nQUAND DEMANDER DE L'AIDE ? Dès qu'une anomalie confirmée dépasse ce que le rondier peut évaluer seul.",
      p1:"LE RÔLE DU RONDIER",s1t:"Quatre responsabilités simultanées",
      s1:"Protéger les personnes, le navire, les biens et la cargaison, l'environnement maritime : le rondier n'est pas un simple surveillant, il est le premier acteur de la prévention.",
      p2:"PRÉPARER SA RONDE",s2t:"Le contexte avant le matériel",
      s2:"Connaître son secteur, les opérations en cours, les risques propres à la zone, et à quoi ressemble le normal. L'équipement (lampe, radio, carnet) vient ensuite.",
      p3:"LES CINQ SENS EN VIGILANCE",s3t:"Cinq familles de détection",
      s3:"Vue, ouïe, odorat, toucher (avec prudence), perception professionnelle : chaque sens détecte un type d'anomalie différent. Un marin expérimenté développe progressivement cette perception globale.",
      p4:"RECONNAÎTRE ET TRANSMETTRE",s4t:"Observer → Confirmer → Signaler → Suivre",
      s4:"Jamais un simple 'il y a une fuite'. Une observation précise indique où, quoi, gravité apparente, évolution, et risques potentiels.",
      p5:"🔦 TROUVER L'ANOMALIE",p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"🔦 SCÉNARIO",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 1",
      sumP:["Every Major Accident Begins As A Small Abnormality : la vigilance quotidienne évite les grandes catastrophes","Le rondier protège simultanément personnes, navire, cargaison et environnement","Le contexte opérationnel précède toujours l'équipement","Cinq familles de détection : vue, ouïe, odorat, toucher prudent, perception professionnelle","Observer → Confirmer → Signaler → Suivre : jamais une observation vague"],
      learnedP:["Les quatre responsabilités fondamentales du rondier","La préparation complète d'une ronde","Les cinq familles de détection sensorielle","La méthode structurée de signalement d'une anomalie","Pourquoi les grandes catastrophes commencent par de petits signes"],
      transition:"Today, you prevented an emergency before it existed. But what if tomorrow you arrive too late... and the emergency has already begun?",
      safetyMsg:"Every major accident begins as a small abnormality.",
    },
    en:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lesson 1/6 · ⭐ Premium",
      title:"Safety Patrol & Hazard Recognition",
      intro:"This lesson does not yet cover an already declared emergency, PPE, or the emergency announcement format. It answers a more fundamental question: how do you prevent an incident from being born before it becomes an emergency?",
      p0:"EVERY MAJOR ACCIDENT BEGINS AS A SMALL ABNORMALITY.",s0t:"The principle that structures the whole lesson",
      s0:"The patroller is the first link in the ship's entire safety chain. Their role isn't just to observe: they simultaneously protect people, the ship, cargo, and the environment.\n\nHOW DO I RECOGNIZE IT? A deviation, even a minor one, from what is normal in a specific zone.\nWHAT DO I DO IMMEDIATELY? Observe, cautiously confirm, report precisely, follow up on the evolution.\nWHAT MISTAKE MAKES IT WORSE? Ignoring a detail while thinking it's probably nothing.\nWHEN MUST I ASK FOR HELP? As soon as a confirmed anomaly exceeds what the patroller can assess alone.",
      p1:"THE ROLE OF THE PATROLLER",s1t:"Four simultaneous responsibilities",
      s1:"Protecting people, the ship, property and cargo, the marine environment: the patroller is not a mere watchman, they are the first actor of prevention.",
      p2:"PREPARING THE PATROL",s2t:"Context before equipment",
      s2:"Knowing your sector, ongoing operations, risks specific to the zone, and what normal looks like. Equipment (torch, radio, notebook) comes after.",
      p3:"THE FIVE SENSES IN VIGILANCE",s3t:"Five detection families",
      s3:"Sight, hearing, smell, touch (with caution), professional perception: each sense detects a different type of anomaly. An experienced sailor progressively develops this overall perception.",
      p4:"RECOGNIZING AND REPORTING",s4t:"Observe → Confirm → Signal → Follow up",
      s4:"Never just 'there's a leak'. A precise observation indicates where, what, apparent severity, evolution, and potential risks.",
      p5:"🔦 FIND THE ABNORMALITY",p6:"🎯 OPERATIONAL EXERCISE",p7:"🔦 SCENARIO",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 1",
      sumP:["Every Major Accident Begins As A Small Abnormality: daily vigilance prevents major disasters","The patroller simultaneously protects people, ship, cargo, and environment","Operational context always comes before equipment","Five detection families: sight, hearing, smell, cautious touch, professional perception","Observe → Confirm → Signal → Follow up: never a vague observation"],
      learnedP:["The four fundamental responsibilities of the patroller","Complete preparation of a round","The five sensory detection families","The structured method for reporting an anomaly","Why major disasters begin as small signs"],
      transition:"Today, you prevented an emergency before it existed. But what if tomorrow you arrive too late... and the emergency has already begun?",
      safetyMsg:"Every major accident begins as a small abnormality.",
    },
    es:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lección 1/6 · ⭐ Premium",
      title:"Safety Patrol & Hazard Recognition",
      intro:"Esta lección todavía no aborda una emergencia ya declarada, el EPP, ni el formato de anuncio de emergencia. Responde a una pregunta más fundamental: ¿cómo impedir que un incidente nazca antes de convertirse en una urgencia?",
      p0:"EVERY MAJOR ACCIDENT BEGINS AS A SMALL ABNORMALITY.",s0t:"El principio que estructura toda la lección",
      s0:"El rondador es el primer eslabón de toda la cadena de seguridad del buque. Su papel no es solo observar: protege simultáneamente a las personas, el buque, la carga y el medio ambiente.\n\n¿CÓMO RECONOCERLO? Una desviación, incluso mínima, respecto a lo normal en una zona precisa.\n¿QUÉ HACER DE INMEDIATO? Observar, confirmar con prudencia, informar con precisión, seguir la evolución.\n¿QUÉ ERROR LO AGRAVA? Ignorar un detalle pensando que probablemente no es nada.\n¿CUÁNDO PEDIR AYUDA? En cuanto una anomalía confirmada supere lo que el rondador puede evaluar solo.",
      p1:"EL PAPEL DEL RONDADOR",s1t:"Cuatro responsabilidades simultáneas",
      s1:"Proteger a las personas, el buque, los bienes y la carga, el medio marino: el rondador no es un simple vigilante, es el primer actor de la prevención.",
      p2:"PREPARAR LA RONDA",s2t:"El contexto antes que el material",
      s2:"Conocer tu sector, las operaciones en curso, los riesgos propios de la zona, y cómo es lo normal. El equipo (linterna, radio, cuaderno) viene después.",
      p3:"LOS CINCO SENTIDOS EN VIGILANCIA",s3t:"Cinco familias de detección",
      s3:"Vista, oído, olfato, tacto (con prudencia), percepción profesional: cada sentido detecta un tipo de anomalía diferente. Un marino experimentado desarrolla progresivamente esta percepción global.",
      p4:"RECONOCER Y TRANSMITIR",s4t:"Observar → Confirmar → Señalar → Seguir",
      s4:"Nunca un simple 'hay una fuga'. Una observación precisa indica dónde, qué, gravedad aparente, evolución, y riesgos potenciales.",
      p5:"🔦 ENCONTRAR LA ANOMALÍA",p6:"🎯 EJERCICIO OPERATIVO",p7:"🔦 ESCENARIO",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 1",
      sumP:["Every Major Accident Begins As A Small Abnormality: la vigilancia diaria evita las grandes catástrofes","El rondador protege simultáneamente a personas, buque, carga y medio ambiente","El contexto operativo siempre precede al material","Cinco familias de detección: vista, oído, olfato, tacto prudente, percepción profesional","Observar → Confirmar → Señalar → Seguir: nunca una observación vaga"],
      learnedP:["Las cuatro responsabilidades fundamentales del rondador","La preparación completa de una ronda","Las cinco familias de detección sensorial","El método estructurado de señalización de una anomalía","Por qué las grandes catástrofes empiezan por pequeñas señales"],
      transition:"Today, you prevented an emergency before it existed. But what if tomorrow you arrive too late... and the emergency has already begun?",
      safetyMsg:"Every major accident begins as a small abnormality.",
    },
    pt:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lição 1/6 · ⭐ Premium",
      title:"Safety Patrol & Hazard Recognition",
      intro:"Esta lição ainda não aborda uma urgência já declarada, o EPI, nem o formato de anúncio de urgência. Responde a uma pergunta mais fundamental: como impedir que um incidente nasça antes de se tornar uma urgência?",
      p0:"EVERY MAJOR ACCIDENT BEGINS AS A SMALL ABNORMALITY.",s0t:"O princípio que estrutura toda a lição",
      s0:"O rondista é o primeiro elo de toda a cadeia de segurança do navio. O seu papel não é só observar: protege simultaneamente as pessoas, o navio, a carga e o ambiente.\n\nCOMO RECONHECER? Um desvio, mesmo mínimo, em relação ao que é normal numa zona precisa.\nO QUE FAZER IMEDIATAMENTE? Observar, confirmar com prudência, reportar com precisão, seguir a evolução.\nQUE ERRO O AGRAVA? Ignorar um detalhe pensando que provavelmente não é nada.\nQUANDO PEDIR AJUDA? Assim que uma anomalia confirmada ultrapassar o que o rondista pode avaliar sozinho.",
      p1:"O PAPEL DO RONDISTA",s1t:"Quatro responsabilidades simultâneas",
      s1:"Proteger as pessoas, o navio, os bens e a carga, o ambiente marinho: o rondista não é um simples vigilante, é o primeiro ator da prevenção.",
      p2:"PREPARAR A RONDA",s2t:"O contexto antes do material",
      s2:"Conhecer o seu setor, as operações em curso, os riscos próprios da zona, e como é o normal. O equipamento (lanterna, rádio, caderno) vem depois.",
      p3:"OS CINCO SENTIDOS EM VIGILÂNCIA",s3t:"Cinco famílias de deteção",
      s3:"Visão, audição, olfato, tato (com prudência), perceção profissional: cada sentido deteta um tipo de anomalia diferente. Um marítimo experiente desenvolve progressivamente esta perceção global.",
      p4:"RECONHECER E TRANSMITIR",s4t:"Observar → Confirmar → Sinalizar → Seguir",
      s4:"Nunca um simples 'há uma fuga'. Uma observação precisa indica onde, o quê, gravidade aparente, evolução, e riscos potenciais.",
      p5:"🔦 ENCONTRAR A ANOMALIA",p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"🔦 CENÁRIO",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 1",
      sumP:["Every Major Accident Begins As A Small Abnormality: a vigilância diária evita as grandes catástrofes","O rondista protege simultaneamente pessoas, navio, carga e ambiente","O contexto operacional precede sempre o equipamento","Cinco famílias de deteção: visão, audição, olfato, tato prudente, perceção profissional","Observar → Confirmar → Sinalizar → Seguir: nunca uma observação vaga"],
      learnedP:["As quatro responsabilidades fundamentais do rondista","A preparação completa de uma ronda","As cinco famílias de deteção sensorial","O método estruturado de sinalização de uma anomalia","Por que as grandes catástrofes começam por pequenos sinais"],
      transition:"Today, you prevented an emergency before it existed. But what if tomorrow you arrive too late... and the emergency has already begun?",
      safetyMsg:"Every major accident begins as a small abnormality.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS6_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/6":lang==="en"?"Lesson 1/6":lang==="es"?"Lección 1/6":"Lição 1/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.orange,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.orange},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}44`,fontSize:11,color:C.orange,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.orange}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="🛡️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🧑‍🤝‍🧑" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧑‍🤝‍🧑</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧑‍🤝‍🧑 {lang==="fr"?"RÔLE DU RONDIER - INTERACTIF":lang==="en"?"PATROLLER ROLE - INTERACTIVE":lang==="es"?"PAPEL DEL RONDADOR - INTERACTIVO":"PAPEL DO RONDISTA - INTERATIVO"}</div><PatrollerRoleSVG lang={lang}/></Card>

            <SL icon="🗺️" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🗺️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🗺️ {lang==="fr"?"PRÉPARATION - INTERACTIF":lang==="en"?"PREPARATION - INTERACTIVE":lang==="es"?"PREPARACIÓN - INTERACTIVO":"PREPARAÇÃO - INTERATIVO"}</div><PreparingPatrolSVG lang={lang}/></Card>

            <SL icon="👁️" text={lc.p3} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>👁️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>👁️ {lang==="fr"?"CINQ SENS - INTERACTIF":lang==="en"?"FIVE SENSES - INTERACTIVE":lang==="es"?"CINCO SENTIDOS - INTERACTIVO":"CINCO SENTIDOS - INTERATIVO"}</div><FiveSensesSVG lang={lang}/></Card>

            <SL icon="📡" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📡 {lang==="fr"?"MÉTHODE - INTERACTIF":lang==="en"?"METHOD - INTERACTIVE":lang==="es"?"MÉTODO - INTERACTIVO":"MÉTODO - INTERATIVO"}</div><ReportMethodSVG lang={lang}/></Card>

            <SL icon="🔦" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><FindAbnormalitySVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="🔦" text={lc.p7} color={C.orange}/>
            <div style={{marginBottom:14}}><CompositeCase lang={lang}/></div>

            <SL icon="📝" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p9} color={C.purple}/>
            <div style={{marginBottom:14}}><SafetyReflection lang={lang}/></div>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(230,126,34,0.35)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final - Ronde de Sécurité":lang==="en"?"Final Quiz - Safety Patrol":lang==="es"?"Quiz Final - Ronda de Seguridad":"Quiz Final - Ronda de Segurança"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 1/6":"questions · Lesson 1/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🛡️</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <div style={{textAlign:"center",fontSize:13,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>{lc.transition}</div>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.35)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 2 - URGENCES COURANTES →":lang==="en"?"LESSON 2 - COMMON EMERGENCIES →":lang==="es"?"LECCIÓN 2 - EMERGENCIAS COMUNES →":"LIÇÃO 2 - EMERGÊNCIAS COMUNS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
