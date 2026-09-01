import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - PERMIT TO WORK (A CONTRACT BETWEEN THREE PARTIES)
function PermitToWorkSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"✍️", label:{fr:"Celui qui autorise",en:"The one who authorizes",es:"Quien autoriza",pt:"Quem autoriza"}, desc:{fr:"Évalue le risque avant de signer, engage sa responsabilité sur les conditions dans lesquelles le travail est permis.",en:"Assesses the risk before signing, commits their responsibility on the conditions under which the work is permitted.",es:"Evalúa el riesgo antes de firmar, compromete su responsabilidad sobre las condiciones en las que se permite el trabajo.",pt:"Avalia o risco antes de assinar, compromete a sua responsabilidade sobre as condições em que o trabalho é permitido."} },
    { id:2, icon:"🔧", label:{fr:"Celui qui exécute",en:"The one who executes",es:"Quien ejecuta",pt:"Quem executa"}, desc:{fr:"S'engage à respecter exactement les conditions du permis, jamais à les interpréter ou à les adapter seul.",en:"Commits to respecting exactly the permit's conditions, never interpreting or adapting them alone.",es:"Se compromete a respetar exactamente las condiciones del permiso, nunca a interpretarlas o adaptarlas solo.",pt:"Compromete-se a respeitar exatamente as condições do permiso, nunca a interpretá-las ou adaptá-las sozinho."} },
    { id:3, icon:"👁️", label:{fr:"Celui qui supervise",en:"The one who supervises",es:"Quien supervisa",pt:"Quem supervisiona"}, desc:{fr:"Vérifie en continu que les conditions du permis restent valables pendant toute la durée du travail, pas seulement au début.",en:"Continuously checks that the permit's conditions remain valid throughout the work, not just at the start.",es:"Comprueba continuamente que las condiciones del permiso siguen siendo válidas durante todo el trabajo, no solo al principio.",pt:"Verifica continuamente que as condições do permiso continuam válidas durante todo o trabalho, não só no início."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Un PTW n'est pas seulement une autorisation : c'est un contrat entre trois personnes, toutes responsables.":lang==="en"?"A PTW is not just an authorization: it is a contract between three people, all responsible.":lang==="es"?"Un PTW no es solo una autorización: es un contrato entre tres personas, todas responsables.":"Um PTW não é apenas uma autorização: é um contrato entre três pessoas, todas responsáveis."}</div>
    </div>
  );
}

// SVG 2 - TOOLBOX TALK & JSA (SYNCHRONIZATION, NOT A MEETING)
function ToolboxJsaSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🗣️", label:{fr:"Toolbox Talk : une synchronisation",en:"Toolbox Talk: a synchronization",es:"Toolbox Talk: una sincronización",pt:"Toolbox Talk: uma sincronização"}, desc:{fr:"Ne consiste pas à lire un papier à voix haute. Consiste à vérifier que toute l'équipe a compris le travail exactement de la même manière.",en:"Does not consist of reading a paper out loud. Consists of verifying that the whole team has understood the work in exactly the same way.",es:"No consiste en leer un papel en voz alta. Consiste en comprobar que todo el equipo ha entendido el trabajo exactamente de la misma manera.",pt:"Não consiste em ler um papel em voz alta. Consiste em verificar que toda a equipa compreendeu o trabalho exatamente da mesma forma."} },
    { id:2, icon:"🪜", label:{fr:"JSA : décomposer la tâche en étapes",en:"JSA: breaking the task into steps",es:"JSA: descomponer la tarea en etapas",pt:"JSA: decompor a tarefa em etapas"}, desc:{fr:"Chaque étape du travail est isolée, et le danger propre à cette étape précise est identifié, pas seulement un danger général vague.",en:"Each step of the work is isolated, and the danger specific to that precise step is identified, not just a vague general danger.",es:"Cada etapa del trabajo se aísla, y se identifica el peligro propio de esa etapa precisa, no solo un peligro general vago.",pt:"Cada etapa do trabalho é isolada, e o perigo próprio dessa etapa precisa é identificado, não apenas um perigo geral vago."} },
    { id:3, icon:"✅", label:{fr:"Vérifier la compréhension partagée",en:"Verifying shared understanding",es:"Comprobar la comprensión compartida",pt:"Verificar a compreensão partilhada"}, desc:{fr:"Chaque membre de l'équipe doit pouvoir reformuler sa propre tâche et le danger associé, pas seulement hocher la tête en silence.",en:"Every team member must be able to restate their own task and the associated danger, not just nod silently.",es:"Cada miembro del equipo debe poder reformular su propia tarea y el peligro asociado, no solo asentir en silencio.",pt:"Cada membro da equipa deve conseguir reformular a sua própria tarefa e o perigo associado, não apenas acenar em silêncio."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Ce n'est pas une réunion. C'est une synchronisation.":lang==="en"?"It is not a meeting. It is a synchronization.":lang==="es"?"No es una reunión. Es una sincronización.":"Não é uma reunião. É uma sincronização."}</div>
    </div>
  );
}

// SVG 3 - LMRA (LAST MINUTE RISK ASSESSMENT)
function LmraSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"📍", label:{fr:"Le lieu est-il toujours identique ?",en:"Is the place still the same?",es:"¿El lugar sigue siendo el mismo?",pt:"O local continua igual?"}, desc:{fr:"Une zone peut avoir changé depuis la planification : matériel déplacé, accès modifié, autre travail en cours.",en:"An area may have changed since planning: equipment moved, access modified, other work underway.",es:"Una zona puede haber cambiado desde la planificación: material desplazado, acceso modificado, otro trabajo en curso.",pt:"Uma zona pode ter mudado desde o planeamento: material deslocado, acesso modificado, outro trabalho em curso."} },
    { id:2, icon:"🌦️", label:{fr:"La météo a-t-elle changé ?",en:"Has the weather changed?",es:"¿Ha cambiado el tiempo?",pt:"O tempo mudou?"}, desc:{fr:"Pluie, vent, houle : des conditions qui étaient acceptables à la planification peuvent devenir dangereuses au moment d'exécuter.",en:"Rain, wind, swell: conditions that were acceptable at planning time can become dangerous at execution time.",es:"Lluvia, viento, marejada: condiciones que eran aceptables en la planificación pueden volverse peligrosas al ejecutar.",pt:"Chuva, vento, ondulação: condições que eram aceitáveis no planeamento podem tornar-se perigosas na execução."} },
    { id:3, icon:"👥", label:{fr:"Une autre équipe travaille-t-elle à proximité ?",en:"Is another team working nearby now?",es:"¿Trabaja otro equipo cerca ahora?",pt:"Outra equipa trabalha perto agora?"}, desc:{fr:"Un travail simultané non prévu peut créer une interaction dangereuse qui n'existait pas au moment de la signature du permis.",en:"Unplanned simultaneous work can create a dangerous interaction that didn't exist when the permit was signed.",es:"Un trabajo simultáneo no previsto puede crear una interacción peligrosa que no existía al firmar el permiso.",pt:"Um trabalho simultâneo não previsto pode criar uma interação perigosa que não existia ao assinar o permiso."} },
    { id:4, icon:"🧰", label:{fr:"Un nouvel équipement est-il arrivé ?",en:"Has new equipment arrived?",es:"¿Ha llegado nuevo equipo?",pt:"Chegou novo equipamento?"}, desc:{fr:"Un équipement non prévu dans le permis initial peut introduire un danger qui n'a jamais été évalué.",en:"Equipment not planned in the original permit can introduce a danger that was never assessed.",es:"Un equipo no previsto en el permiso inicial puede introducir un peligro que nunca se evaluó.",pt:"Um equipamento não previsto no permiso inicial pode introduzir um perigo que nunca foi avaliado."} },
    { id:5, icon:"⚡", label:{fr:"Une nouvelle source d'énergie est-elle apparue ?",en:"Has a new energy source appeared?",es:"¿Ha aparecido una nueva fuente de energía?",pt:"Surgiu uma nova fonte de energia?"}, desc:{fr:"Une ligne réactivée, une pression rétablie : ce qui était isolé pendant la planification peut ne plus l'être au moment d'exécuter.",en:"A reactivated line, restored pressure: what was isolated during planning may no longer be isolated at execution time.",es:"Una línea reactivada, presión restablecida: lo que estaba aislado durante la planificación puede dejar de estarlo al ejecutar.",pt:"Uma linha reativada, pressão restabelecida: o que estava isolado durante o planeamento pode já não o estar na execução."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Même si un permis existe déjà, les conditions peuvent changer entre la planification et l'exécution.":lang==="en"?"Even if a permit already exists, conditions can change between planning and execution.":lang==="es"?"Aunque ya exista un permiso, las condiciones pueden cambiar entre la planificación y la ejecución.":"Mesmo que já exista um permiso, as condições podem mudar entre o planeamento e a execução."}</div>
    </div>
  );
}

// SVG 4 - STOP WORK AUTHORITY
function StopWorkAuthoritySVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🛡️", label:{fr:"Ce n'est pas désobéir",en:"It is not disobeying",es:"No es desobedecer",pt:"Não é desobedecer"}, desc:{fr:"Arrêter un travail dangereux n'est jamais un acte de rébellion : c'est l'exercice d'une responsabilité reconnue et attendue.",en:"Stopping dangerous work is never an act of rebellion: it is the exercise of a recognized, expected responsibility.",es:"Detener un trabajo peligroso nunca es un acto de rebelión: es el ejercicio de una responsabilidad reconocida y esperada.",pt:"Parar um trabalho perigoso nunca é um ato de rebelião: é o exercício de uma responsabilidade reconhecida e esperada."} },
    { id:2, icon:"👥", label:{fr:"C'est protéger son équipe",en:"It is protecting your team",es:"Es proteger a tu equipo",pt:"É proteger a sua equipa"}, desc:{fr:"N'importe qui, quel que soit son rang, a le devoir d'arrêter un travail dès qu'une situation semble dangereuse.",en:"Anyone, whatever their rank, has the duty to stop a job as soon as a situation seems dangerous.",es:"Cualquiera, sea cual sea su rango, tiene el deber de detener un trabajo en cuanto una situación parezca peligrosa.",pt:"Qualquer pessoa, seja qual for o seu posto, tem o dever de parar um trabalho assim que uma situação parecer perigosa."} },
    { id:3, icon:"⚖️", label:{fr:"Jugé sur les deux capacités",en:"Judged on both abilities",es:"Juzgado por ambas capacidades",pt:"Julgado pelas duas capacidades"}, desc:{fr:"Un professionnel est jugé autant sur sa capacité à arrêter un travail dangereux que sur sa capacité à le réaliser.",en:"A professional is judged as much on their ability to stop dangerous work as on their ability to carry it out.",es:"Un profesional es juzgado tanto por su capacidad de detener un trabajo peligroso como por su capacidad de realizarlo.",pt:"Um profissional é julgado tanto pela sua capacidade de parar um trabalho perigoso como pela sua capacidade de o realizar."} },
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

// FIVE SECOND PAUSE CHECKLIST
function FiveSecondPauseSVG({ lang }) {
  const items = {
    fr:["Est-ce toujours sûr ?","Est-ce que tout le monde est prêt ?","Est-ce que quelque chose a changé ?","Ai-je oublié un danger ?"],
    en:["Is it still safe?","Is everyone ready?","Has something changed?","Have I forgotten a danger?"],
    es:["¿Sigue siendo seguro?","¿Está todo el mundo listo?","¿Ha cambiado algo?","¿He olvidado un peligro?"],
    pt:["Continua seguro?","Está toda a gente pronta?","Algo mudou?","Esqueci-me de um perigo?"],
  };
  const list = items[lang]||items.fr;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {list.map((q,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`}}>
          <div style={{width:22,height:22,borderRadius:"50%",background:C.gold,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#1a1a1a"}}>{i+1}</div>
          <div style={{fontSize:12,color:C.white,fontWeight:600}}>{q}</div>
        </div>
      ))}
      <div style={{textAlign:"center",fontSize:11,color:C.gold2,fontStyle:"italic",marginTop:6}}>
        {lang==="fr"?"Si non à toutes ces questions... alors seulement, commencer.":lang==="en"?"If no to all these questions... only then, begin.":lang==="es"?"Si no a todas estas preguntas... solo entonces, empezar.":"Se não a todas estas perguntas... só então, começar."}
      </div>
    </div>
  );
}

// EXERCISE - THE CHANGED WORKSITE (CONTINUE / SUSPEND / STOP WORK)
function ChangedWorksiteExercise({ lang }) {
  const [sel, setSel] = useState(null);
  const [showC, setShowC] = useState(false);
  const d = {
    fr:{scenario:"Vous avez un PTW signé pour un travail à chaud sur le pont. Juste avant de commencer, vous remarquez : une pluie fine s'est mise à tomber, une petite fuite d'huile est visible non loin, une nouvelle équipe travaille maintenant juste à côté, et la ventilation de la zone semble insuffisante.",
      options:[
        {id:"a",text:"Continuer le travail tel que prévu, le permis est déjà signé",correct:false,expl:"Un permis signé ne remplace jamais une réévaluation au moment de l'exécution. Continuer ici ignore quatre changements significatifs à la fois."},
        {id:"b",text:"Suspendre le travail, réévaluer chaque changement, et ne reprendre que si tout est confirmé sûr",correct:true,expl:"C'est la réponse attendue : plusieurs conditions ont changé depuis la signature du permis. Une suspension permet de tout réévaluer avant de décider de continuer ou non."},
        {id:"c",text:"Utiliser le Stop Work Authority et annuler définitivement le travail",correct:false,expl:"Une réponse extrême n'est pas nécessairement justifiée avant même d'avoir réévalué la situation. Le Stop Work Authority reste disponible si la réévaluation confirme un danger réel, mais suspendre pour réévaluer est la première étape logique."},
      ]},
    en:{scenario:"You have a signed PTW for hot work on deck. Just before starting, you notice: a light rain has begun, a small oil leak is visible nearby, a new team is now working right next to you, and the area's ventilation seems insufficient.",
      options:[
        {id:"a",text:"Continue the work as planned, the permit is already signed",correct:false,expl:"A signed permit never replaces a reassessment at execution time. Continuing here ignores four significant changes at once."},
        {id:"b",text:"Suspend the work, reassess each change, and only resume if everything is confirmed safe",correct:true,expl:"This is the expected answer: several conditions have changed since the permit was signed. A suspension allows everything to be reassessed before deciding whether to continue."},
        {id:"c",text:"Use Stop Work Authority and permanently cancel the work",correct:false,expl:"An extreme response isn't necessarily justified before even reassessing the situation. Stop Work Authority remains available if the reassessment confirms a real danger, but suspending to reassess is the logical first step."},
      ]},
    es:{scenario:"Tienes un PTW firmado para un trabajo en caliente en cubierta. Justo antes de empezar, notas: ha empezado a caer una lluvia fina, se ve una pequeña fuga de aceite cerca, un nuevo equipo trabaja ahora justo al lado, y la ventilación de la zona parece insuficiente.",
      options:[
        {id:"a",text:"Continuar el trabajo según lo previsto, el permiso ya está firmado",correct:false,expl:"Un permiso firmado nunca sustituye una reevaluación en el momento de la ejecución. Continuar aquí ignora cuatro cambios significativos a la vez."},
        {id:"b",text:"Suspender el trabajo, reevaluar cada cambio, y reanudar solo si todo se confirma seguro",correct:true,expl:"Esta es la respuesta esperada: varias condiciones han cambiado desde que se firmó el permiso. Una suspensión permite reevaluarlo todo antes de decidir si continuar o no."},
        {id:"c",text:"Usar el Stop Work Authority y cancelar definitivamente el trabajo",correct:false,expl:"Una respuesta extrema no está necesariamente justificada antes incluso de reevaluar la situación. El Stop Work Authority sigue disponible si la reevaluación confirma un peligro real, pero suspender para reevaluar es el primer paso lógico."},
      ]},
    pt:{scenario:"Tens um PTW assinado para um trabalho a quente no convés. Mesmo antes de começar, reparas: começou a cair uma chuva fina, vê-se uma pequena fuga de óleo perto, uma nova equipa trabalha agora mesmo ao lado, e a ventilação da zona parece insuficiente.",
      options:[
        {id:"a",text:"Continuar o trabalho como previsto, o permiso já está assinado",correct:false,expl:"Um permiso assinado nunca substitui uma reavaliação no momento da execução. Continuar aqui ignora quatro mudanças significativas ao mesmo tempo."},
        {id:"b",text:"Suspender o trabalho, reavaliar cada mudança, e só retomar se tudo for confirmado seguro",correct:true,expl:"Esta é a resposta esperada: várias condições mudaram desde que o permiso foi assinado. Uma suspensão permite reavaliar tudo antes de decidir se continuar ou não."},
        {id:"c",text:"Usar o Stop Work Authority e cancelar definitivamente o trabalho",correct:false,expl:"Uma resposta extrema não está necessariamente justificada mesmo antes de reavaliar a situação. O Stop Work Authority continua disponível se a reavaliação confirmar um perigo real, mas suspender para reavaliar é o primeiro passo lógico."},
      ]},
  };
  const c = d[lang]||d.fr;
  return (
    <div>
      <div style={{fontSize:11,color:C.gold2,marginBottom:12,lineHeight:1.6,fontStyle:"italic"}}>{c.scenario}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {c.options.map(opt=>{
          const isSel = sel===opt.id;
          return (
            <div key={opt.id} onClick={()=>setSel(opt.id)} style={{padding:"10px 12px",borderRadius:10,cursor:"pointer",background:isSel?(showC?(opt.correct?"rgba(30,138,74,0.2)":"rgba(192,57,43,0.2)"):"rgba(77,166,255,0.15)"):"rgba(255,255,255,0.04)",border:`1.5px solid ${isSel?(showC?(opt.correct?C.green:C.red):C.blue2):"rgba(255,255,255,0.08)"}`}}>
              <div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{opt.text}</div>
              {showC&&isSel&&<div style={{fontSize:11,marginTop:8,color:opt.correct?C.green:C.red,lineHeight:1.6}}>{opt.correct?"✓ ":"✗ "}{opt.expl}</div>}
            </div>
          );
        })}
      </div>
      <button onClick={()=>setShowC(v=>!v)} disabled={!sel} style={{width:"100%",padding:"11px 0",borderRadius:12,marginTop:10,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:sel?"pointer":"not-allowed",fontFamily:"'Cinzel',serif",opacity:sel?1:0.5}}>
        {showC?(lang==="fr"?"Masquer l'analyse":"Hide analysis"):(lang==="fr"?"Analyser mon choix":"Analyze my choice")}
      </button>
    </div>
  );
}

// EXERCISE - RISK ASSESSMENT DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"c",q2:"b",q3:"a",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Un permis de travail a été signé il y a deux heures. Le travail commence maintenant. Que faites-vous ?\na) Commencer directement, le permis reste valable\nb) Ignorer le LMRA, ce n'est utile qu'en théorie\nc) Effectuer un LMRA avant de commencer, même si le permis existe déjà"},
      {id:"q2",q:"Pendant le Toolbox Talk, un membre de l'équipe hoche simplement la tête sans rien dire. Que faites-vous ?\na) Continuer, le hochement de tête suffit\nb) Lui demander de reformuler sa tâche et le danger associé pour confirmer sa compréhension\nc) L'exclure du travail immédiatement"},
      {id:"q3",q:"Vous remarquez une situation qui vous semble dangereuse pendant un travail en cours, mais vous n'êtes pas certain à 100%. Que faites-vous ?\na) Utiliser votre Stop Work Authority sans hésiter\nb) Ne rien dire par peur de déranger l'équipe\nc) Attendre d'être certain à 100% avant d'agir"},
      {id:"q4",q:"Que signifie le principe 'Paper Doesn't Prevent Accidents. People Who Follow It Do' ?\na) Un permis signé suffit toujours, quel que soit le comportement de l'équipe\nb) Le document seul ne protège personne ; c'est le respect rigoureux de ses conditions par les personnes qui prévient l'accident\nc) Ce principe ne concerne que les officiers superviseurs"},
    ],
    en:[
      {id:"q1",q:"A work permit was signed two hours ago. Work is starting now. What do you do?\na) Start directly, the permit remains valid\nb) Ignore the LMRA, it's only useful in theory\nc) Perform an LMRA before starting, even though the permit already exists"},
      {id:"q2",q:"During the Toolbox Talk, a team member simply nods without saying anything. What do you do?\na) Continue, the nod is enough\nb) Ask them to restate their task and the associated danger to confirm understanding\nc) Exclude them from the work immediately"},
      {id:"q3",q:"You notice a situation that seems dangerous during ongoing work, but you aren't 100% sure. What do you do?\na) Use your Stop Work Authority without hesitation\nb) Say nothing for fear of disturbing the team\nc) Wait to be 100% sure before acting"},
      {id:"q4",q:"What does the principle 'Paper Doesn't Prevent Accidents. People Who Follow It Do' mean?\na) A signed permit is always enough, whatever the team's behavior\nb) The document alone protects no one; it's people's rigorous compliance with its conditions that prevents the accident\nc) This principle only concerns supervising officers"},
    ],
    es:[
      {id:"q1",q:"Un permiso de trabajo se firmó hace dos horas. El trabajo empieza ahora. ¿Qué haces?\na) Empezar directamente, el permiso sigue siendo válido\nb) Ignorar el LMRA, solo sirve en teoría\nc) Realizar un LMRA antes de empezar, aunque el permiso ya exista"},
      {id:"q2",q:"Durante el Toolbox Talk, un miembro del equipo simplemente asiente sin decir nada. ¿Qué haces?\na) Continuar, el asentimiento basta\nb) Pedirle que reformule su tarea y el peligro asociado para confirmar su comprensión\nc) Excluirlo del trabajo de inmediato"},
      {id:"q3",q:"Notas una situación que te parece peligrosa durante un trabajo en curso, pero no estás seguro al 100%. ¿Qué haces?\na) Usar tu Stop Work Authority sin dudar\nb) No decir nada por miedo a molestar al equipo\nc) Esperar a estar seguro al 100% antes de actuar"},
      {id:"q4",q:"¿Qué significa el principio 'Paper Doesn't Prevent Accidents. People Who Follow It Do'?\na) Un permiso firmado siempre basta, sea cual sea el comportamiento del equipo\nb) El documento por sí solo no protege a nadie; es el cumplimiento riguroso de sus condiciones por las personas lo que previene el accidente\nc) Este principio solo concierne a los oficiales supervisores"},
    ],
    pt:[
      {id:"q1",q:"Um permiso de trabalho foi assinado há duas horas. O trabalho começa agora. O que fazes?\na) Começar diretamente, o permiso continua válido\nb) Ignorar o LMRA, só serve em teoria\nc) Realizar um LMRA antes de começar, mesmo que o permiso já exista"},
      {id:"q2",q:"Durante o Toolbox Talk, um membro da equipa apenas acena com a cabeça sem dizer nada. O que fazes?\na) Continuar, o aceno basta\nb) Pedir-lhe para reformular a sua tarefa e o perigo associado para confirmar a compreensão\nc) Excluí-lo do trabalho de imediato"},
      {id:"q3",q:"Reparas numa situação que te parece perigosa durante um trabalho em curso, mas não tens certeza a 100%. O que fazes?\na) Usar o teu Stop Work Authority sem hesitar\nb) Não dizer nada com medo de incomodar a equipa\nc) Esperar ter certeza a 100% antes de agir"},
      {id:"q4",q:"O que significa o princípio 'Paper Doesn't Prevent Accidents. People Who Follow It Do'?\na) Um permiso assinado sempre basta, seja qual for o comportamento da equipa\nb) O documento sozinho não protege ninguém; é o cumprimento rigoroso das suas condições pelas pessoas que previne o acidente\nc) Este princípio só diz respeito aos oficiais supervisores"},
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

// COMPOSITE CASE - THE SIGNED PERMIT THAT WASN'T ENOUGH
function CompositeCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Scénario - Le permis signé qui n'a pas suffi",teaser:"Scénario composite réaliste - PTW valide, mais barrières successives disparues",
      what:"Un permis de travail à chaud est signé le matin pour une réparation sur un pont extérieur. Le travail est prévu pour l'après-midi. Au moment de commencer, personne n'effectue de LMRA : le permis est considéré comme suffisant à lui seul. Entre-temps, une petite fuite d'huile hydraulique est apparue à proximité sans que personne ne la remarque activement, et le vent s'est renforcé, dispersant des étincelles dans une direction non prévue lors de la signature. Un membre de l'équipe remarque la fuite mais suppose qu'elle sera signalée par quelqu'un d'autre. Aucun Stop Work n'est déclenché. Le travail se poursuit jusqu'à ce qu'un début d'inflammation localisée soit détecté et rapidement maîtrisé, sans blessure grave mais avec des dégâts matériels limités.",
      cause:"• Le permis de travail existait et était parfaitement valide au moment de sa signature\n• Aucun LMRA n'a été réalisé juste avant de commencer, alors que plusieurs heures s'étaient écoulées depuis la signature\n• Une fuite d'huile hydraulique est apparue après la signature, sans être intégrée à l'évaluation initiale\n• Le vent s'est renforcé, changeant la trajectoire des étincelles par rapport aux conditions prévues\n• Un membre de l'équipe a remarqué un danger mais a supposé, à tort, que quelqu'un d'autre s'en chargerait\n• Personne n'a exercé son Stop Work Authority malgré ces changements cumulés",
      lessons:"✓ Paper Doesn't Prevent Accidents. People Who Follow It Do : le permis signé n'a jamais été la garantie de sécurité, seule son application rigoureuse l'aurait été\n✓ Plusieurs barrières de sécurité ont disparu simultanément : LMRA absent, changement de conditions non intégré, Stop Work non utilisé\n✓ Ce cas illustre exactement pourquoi un permis signé n'élimine jamais le besoin de vigilance continue jusqu'à la fin du travail\n✓ La combinaison de plusieurs défaillances mineures rend un incident presque inévitable, même sans une seule erreur grave isolée",
      link:"🔗 Ce scénario illustre une vérité centrale de cette leçon : ce n'est jamais une seule barrière qui manque, mais l'accumulation silencieuse de plusieurs absences simultanées."},
    en:{title:"Scenario - The Signed Permit That Wasn't Enough",teaser:"Realistic composite scenario - valid PTW, but successive barriers disappeared",
      what:"A hot work permit is signed in the morning for a repair on an outside deck. The work is scheduled for the afternoon. When it's time to start, no one performs an LMRA: the permit is considered sufficient on its own. Meanwhile, a small hydraulic oil leak has appeared nearby without anyone actively noticing it, and the wind has picked up, scattering sparks in a direction not anticipated when the permit was signed. A team member notices the leak but assumes someone else will report it. No Stop Work is triggered. The work continues until a localized ignition is detected and quickly brought under control, with no serious injury but limited material damage.",
      cause:"• The work permit existed and was perfectly valid at the time it was signed\n• No LMRA was performed just before starting, even though several hours had passed since signing\n• A hydraulic oil leak appeared after signing, without being included in the initial assessment\n• The wind picked up, changing the trajectory of sparks compared to the planned conditions\n• A team member noticed a danger but wrongly assumed someone else would handle it\n• No one exercised their Stop Work Authority despite these accumulated changes",
      lessons:"✓ Paper Doesn't Prevent Accidents. People Who Follow It Do: the signed permit was never the safety guarantee, only its rigorous application would have been\n✓ Several safety barriers disappeared simultaneously: no LMRA, changed conditions not accounted for, Stop Work not used\n✓ This case illustrates exactly why a signed permit never eliminates the need for continuous vigilance until the work is complete\n✓ The combination of several minor failures makes an incident almost inevitable, even without a single serious isolated error",
      link:"🔗 This scenario illustrates a central truth of this lesson: it is never a single missing barrier, but the silent accumulation of several simultaneous absences."},
    es:{title:"Escenario - El permiso firmado que no bastó",teaser:"Escenario compuesto realista - PTW válido, pero barreras sucesivas desaparecidas",
      what:"Un permiso de trabajo en caliente se firma por la mañana para una reparación en una cubierta exterior. El trabajo está previsto para la tarde. Al empezar, nadie realiza un LMRA: el permiso se considera suficiente por sí solo. Mientras tanto, ha aparecido una pequeña fuga de aceite hidráulico cerca sin que nadie la note activamente, y el viento ha arreciado, dispersando chispas en una dirección no prevista al firmar el permiso. Un miembro del equipo nota la fuga pero supone que otra persona la informará. No se activa ningún Stop Work. El trabajo continúa hasta que se detecta un inicio de ignición localizada, que se controla rápidamente, sin lesiones graves pero con daños materiales limitados.",
      cause:"• El permiso de trabajo existía y era perfectamente válido en el momento de su firma\n• No se realizó ningún LMRA justo antes de empezar, aunque habían pasado varias horas desde la firma\n• Apareció una fuga de aceite hidráulico después de la firma, sin ser incluida en la evaluación inicial\n• El viento arreció, cambiando la trayectoria de las chispas respecto a las condiciones previstas\n• Un miembro del equipo notó un peligro pero supuso, erróneamente, que otra persona se encargaría\n• Nadie ejerció su Stop Work Authority pese a estos cambios acumulados",
      lessons:"✓ Paper Doesn't Prevent Accidents. People Who Follow It Do: el permiso firmado nunca fue la garantía de seguridad, solo su aplicación rigurosa lo habría sido\n✓ Varias barreras de seguridad desaparecieron simultáneamente: sin LMRA, cambio de condiciones no integrado, Stop Work no usado\n✓ Este caso ilustra exactamente por qué un permiso firmado nunca elimina la necesidad de vigilancia continua hasta el final del trabajo\n✓ La combinación de varios fallos menores hace que un incidente sea casi inevitable, incluso sin un único error grave aislado",
      link:"🔗 Este escenario ilustra una verdad central de esta lección: nunca falta una sola barrera, sino la acumulación silenciosa de varias ausencias simultáneas."},
    pt:{title:"Cenário - O permiso assinado que não bastou",teaser:"Cenário composto realista - PTW válido, mas barreiras sucessivas desaparecidas",
      what:"Um permiso de trabalho a quente é assinado de manhã para uma reparação num convés exterior. O trabalho está previsto para a tarde. Ao começar, ninguém realiza um LMRA: o permiso é considerado suficiente por si só. Entretanto, surgiu uma pequena fuga de óleo hidráulico perto sem que ninguém a notasse ativamente, e o vento intensificou-se, dispersando faíscas numa direção não prevista ao assinar o permiso. Um membro da equipa nota a fuga mas presume que outra pessoa a reportará. Nenhum Stop Work é acionado. O trabalho continua até ser detetada uma ignição localizada, rapidamente controlada, sem ferimentos graves mas com danos materiais limitados.",
      cause:"• O permiso de trabalho existia e era perfeitamente válido no momento da sua assinatura\n• Nenhum LMRA foi realizado mesmo antes de começar, apesar de terem passado várias horas desde a assinatura\n• Surgiu uma fuga de óleo hidráulico depois da assinatura, sem ser incluída na avaliação inicial\n• O vento intensificou-se, mudando a trajetória das faíscas em relação às condições previstas\n• Um membro da equipa notou um perigo mas presumiu, erradamente, que outra pessoa trataria disso\n• Ninguém exerceu o seu Stop Work Authority apesar destas mudanças acumuladas",
      lessons:"✓ Paper Doesn't Prevent Accidents. People Who Follow It Do: o permiso assinado nunca foi a garantia de segurança, só a sua aplicação rigorosa o teria sido\n✓ Várias barreiras de segurança desapareceram simultaneamente: sem LMRA, mudança de condições não integrada, Stop Work não usado\n✓ Este caso ilustra exatamente por que um permiso assinado nunca elimina a necessidade de vigilância contínua até ao fim do trabalho\n✓ A combinação de várias falhas menores torna um incidente quase inevitável, mesmo sem um único erro grave isolado",
      link:"🔗 Este cenário ilustra uma verdade central desta lição: nunca falta uma única barreira, mas sim a acumulação silenciosa de várias ausências simultâneas."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{background:"rgba(230,126,34,0.08)",border:`1.5px solid ${C.orange}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>📋</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.orange,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
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
    {q:"Que signifie le principe 'Paper Doesn't Prevent Accidents. People Who Follow It Do' ?",opts:["Un document signé suffit toujours à garantir la sécurité","Le document seul ne protège personne ; c'est le respect rigoureux de ses conditions par les personnes qui prévient l'accident","Ce principe ne concerne que les permis de travail à chaud","Il ne faut jamais utiliser de documents formels"],correct:1,expl:"Un PTW, un JSA, un Toolbox Talk ou un LMRA ne sont jamais des formalités : ce sont des barrières de sécurité successives."},
    {q:"Quelle est la mission exacte de cette leçon ?",opts:["Éliminer complètement tout danger avant un travail","Transformer un travail dangereux en un travail maîtrisé","Remplacer la formation pratique aux permis de travail","Présenter l'historique des systèmes de permis"],correct:1,expl:"Certains travaux resteront toujours dangereux ; l'objectif n'est pas de supprimer le danger, mais de le contrôler."},
    {q:"Un Permit to Work est-il seulement une autorisation administrative ?",opts:["Oui, uniquement un document à signer","Non, c'est un contrat entre celui qui autorise, celui qui exécute, et celui qui supervise, tous responsables","Non, il ne concerne que la personne qui exécute le travail","Oui, sans aucune responsabilité partagée"],correct:1,expl:"Les trois parties deviennent responsables, pas seulement le signataire initial."},
    {q:"Que vérifie réellement celui qui supervise un PTW ?",opts:["Uniquement que le document est bien signé","Que les conditions du permis restent valables pendant toute la durée du travail, pas seulement au début","Rien après la signature initiale","Uniquement la présence de l'équipe"],correct:1,expl:"La supervision est continue, pas limitée au moment de la signature."},
    {q:"En quoi consiste réellement le Toolbox Talk ?",opts:["Lire un document à voix haute devant l'équipe","Vérifier que toute l'équipe a compris le travail exactement de la même manière","Une réunion administrative sans réel impact sur la sécurité","Un briefing réservé uniquement aux officiers"],correct:1,expl:"Ce n'est pas une réunion, c'est une synchronisation de la compréhension collective."},
    {q:"Que fait le JSA (Job Safety Analysis) ?",opts:["Évalue le danger global du navire","Décompose la tâche en étapes et identifie le danger propre à chaque étape précise","Remplace entièrement le besoin d'un permis de travail","Ne concerne que les travaux en hauteur"],correct:1,expl:"Le JSA structure l'analyse étape par étape, pas une évaluation vague et globale."},
    {q:"Pourquoi un LMRA est-il nécessaire même si un permis existe déjà ?",opts:["Il ne l'est jamais si le permis est valide","Les conditions peuvent changer entre la planification et l'exécution du travail","Le LMRA remplace entièrement le permis de travail","Il ne concerne que les travaux de nuit"],correct:1,expl:"Un permis signé ne remplace jamais une réévaluation au moment de l'exécution."},
    {q:"Parmi les questions du LMRA, laquelle concerne les changements d'environnement de travail ?",opts:["Le lieu est-il toujours identique et la météo a-t-elle changé","Uniquement le prix du matériel utilisé","Uniquement l'heure prévue de fin de travail","Aucune question ne concerne l'environnement"],correct:0,expl:"Le lieu et la météo font partie des conditions qui peuvent évoluer entre planification et exécution."},
    {q:"Que signifie exercer son Stop Work Authority ?",opts:["Désobéir à la hiérarchie sans justification","Protéger son équipe en arrêtant un travail dès qu'une situation semble dangereuse, quel que soit son rang","Une action réservée uniquement au commandant","Une décision qui n'a jamais de justification légitime"],correct:1,expl:"N'importe qui a le devoir d'arrêter un travail dangereux, ce n'est jamais un acte de rébellion."},
    {q:"Sur quoi un professionnel est-il jugé, selon cette leçon, concernant le Stop Work Authority ?",opts:["Uniquement sur sa capacité à réaliser le travail rapidement","Autant sur sa capacité à arrêter un travail dangereux que sur sa capacité à le réaliser","Uniquement sur son ancienneté à bord","Le Stop Work Authority n'est jamais évalué"],correct:1,expl:"Les deux capacités sont également valorisées dans une véritable culture de sécurité."},
    {q:"Que propose la mini check-list 'The Five Second Pause' ?",opts:["Une évaluation complète remplaçant le LMRA","Quatre questions rapides avant de commencer : sécurité, préparation de l'équipe, changement, danger oublié","Une pause obligatoire d'une heure avant chaque travail","Une check-list réservée aux travaux à chaud uniquement"],correct:1,expl:"Ces quatre questions rapides deviennent un réflexe professionnel avant toute action."},
    {q:"Que représentent ensemble le PTW, le JSA, le Toolbox Talk et le LMRA ?",opts:["Des formalités administratives sans lien entre elles","Des barrières de sécurité successives ; si plusieurs disparaissent simultanément, l'accident devient une question de temps","Des documents à remplir uniquement pour la conformité réglementaire","Des étapes interchangeables sans ordre particulier"],correct:1,expl:"C'est le fil conducteur central de toute la leçon."},
    {q:"Dans le scénario du permis signé qui n'a pas suffi, combien de barrières de sécurité ont disparu simultanément ?",opts:["Une seule, le LMRA","Plusieurs à la fois : absence de LMRA, changement de conditions non intégré, Stop Work non utilisé","Aucune barrière n'a réellement disparu","Uniquement la supervision du permis"],correct:1,expl:"C'est l'accumulation silencieuse de plusieurs absences simultanées qui rend l'incident presque inévitable."},
    {q:"Dans ce scénario, le permis de travail initial était-il incorrect ?",opts:["Oui, il n'aurait jamais dû être signé","Non, il était parfaitement valide au moment de sa signature ; c'est l'absence de réévaluation continue qui a posé problème","Oui, il manquait des informations essentielles dès le départ","Non, aucun problème n'est survenu dans ce scénario"],correct:1,expl:"Le permis était correct ; c'est le manque de vigilance après la signature qui a créé le risque."},
    {q:"Ce module enseigne-t-il un substitut aux procédures Permit to Work réelles de la compagnie ou à une formation certifiée ?",opts:["Oui, il équivaut à une certification complète","Non, il enseigne des principes de prévention et de décision, jamais un substitut aux procédures réelles de la compagnie","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne les principes de prévention, jamais un remplacement des procédures réelles certifiées."},
  ],
  en:[
    {q:"What does the principle 'Paper Doesn't Prevent Accidents. People Who Follow It Do' mean?",opts:["A signed document always guarantees safety","The document alone protects no one; it's people's rigorous compliance with its conditions that prevents the accident","This principle only concerns hot work permits","Formal documents should never be used"],correct:1,expl:"A PTW, a JSA, a Toolbox Talk, or an LMRA are never formalities: they are successive safety barriers."},
    {q:"What is the exact mission of this lesson?",opts:["Completely eliminate all danger before a job","Turn a dangerous job into a controlled job","Replace practical training in work permits","Present the history of permit systems"],correct:1,expl:"Some jobs will always remain dangerous; the goal isn't to eliminate danger, but to control it."},
    {q:"Is a Permit to Work just an administrative authorization?",opts:["Yes, only a document to sign","No, it's a contract between the one who authorizes, the one who executes, and the one who supervises, all responsible","No, it only concerns the person carrying out the work","Yes, with no shared responsibility"],correct:1,expl:"All three parties become responsible, not just the initial signatory."},
    {q:"What does the one who supervises a PTW actually check?",opts:["Only that the document is properly signed","That the permit's conditions remain valid throughout the work, not just at the start","Nothing after the initial signing","Only the team's presence"],correct:1,expl:"Supervision is continuous, not limited to the moment of signing."},
    {q:"What does the Toolbox Talk actually consist of?",opts:["Reading a document aloud in front of the team","Verifying that the whole team understood the work in exactly the same way","An administrative meeting with no real impact on safety","A briefing reserved only for officers"],correct:1,expl:"It is not a meeting, it is a synchronization of collective understanding."},
    {q:"What does the JSA (Job Safety Analysis) do?",opts:["Assesses the ship's overall danger","Breaks the task into steps and identifies the danger specific to each precise step","Entirely replaces the need for a work permit","Only concerns work at height"],correct:1,expl:"The JSA structures the analysis step by step, not a vague, global assessment."},
    {q:"Why is an LMRA necessary even when a permit already exists?",opts:["It never is if the permit is valid","Conditions can change between planning and execution of the work","The LMRA entirely replaces the work permit","It only concerns night work"],correct:1,expl:"A signed permit never replaces a reassessment at execution time."},
    {q:"Among the LMRA questions, which concerns changes in the work environment?",opts:["Is the place still the same and has the weather changed","Only the cost of the equipment used","Only the expected end time of the work","No question concerns the environment"],correct:0,expl:"The place and weather are among the conditions that can evolve between planning and execution."},
    {q:"What does exercising Stop Work Authority mean?",opts:["Disobeying the hierarchy without justification","Protecting your team by stopping a job as soon as a situation seems dangerous, whatever your rank","An action reserved only for the captain","A decision that never has legitimate justification"],correct:1,expl:"Anyone has the duty to stop dangerous work, it is never an act of rebellion."},
    {q:"What is a professional judged on, according to this lesson, regarding Stop Work Authority?",opts:["Only on their ability to carry out the work quickly","As much on their ability to stop dangerous work as on their ability to carry it out","Only on their seniority on board","Stop Work Authority is never assessed"],correct:1,expl:"Both abilities are equally valued in a genuine safety culture."},
    {q:"What does the 'Five Second Pause' mini checklist offer?",opts:["A complete assessment replacing the LMRA","Four quick questions before starting: safety, team readiness, change, forgotten danger","A mandatory one-hour pause before every job","A checklist reserved only for hot work"],correct:1,expl:"These four quick questions become a professional reflex before any action."},
    {q:"What do the PTW, JSA, Toolbox Talk, and LMRA together represent?",opts:["Administrative formalities with no link between them","Successive safety barriers; if several disappear simultaneously, the accident becomes a matter of time","Documents to fill out only for regulatory compliance","Interchangeable steps with no particular order"],correct:1,expl:"This is the central thread running through the whole lesson."},
    {q:"In the scenario of the signed permit that wasn't enough, how many safety barriers disappeared simultaneously?",opts:["Only one, the LMRA","Several at once: no LMRA, changed conditions not accounted for, Stop Work not used","No barrier actually disappeared","Only the permit's supervision"],correct:1,expl:"It's the silent accumulation of several simultaneous absences that makes the incident almost inevitable."},
    {q:"In this scenario, was the original work permit incorrect?",opts:["Yes, it should never have been signed","No, it was perfectly valid when signed; it was the lack of continuous reassessment that caused the problem","Yes, it was missing essential information from the start","No, nothing went wrong in this scenario"],correct:1,expl:"The permit was correct; it was the lack of vigilance after signing that created the risk."},
    {q:"Does this module teach a replacement for the company's actual Permit to Work procedures or certified training?",opts:["Yes, it is equivalent to a full certification","No, it teaches prevention and decision principles, never a replacement for the company's actual procedures","Yes, but only for officers","No, it is useless without equipment"],correct:1,expl:"MAP teaches prevention principles, never a replacement for certified actual procedures."},
  ],
  es:[
    {q:"¿Qué significa el principio 'Paper Doesn't Prevent Accidents. People Who Follow It Do'?",opts:["Un documento firmado siempre garantiza la seguridad","El documento por sí solo no protege a nadie; es el cumplimiento riguroso de sus condiciones por las personas lo que previene el accidente","Este principio solo concierne a los permisos de trabajo en caliente","Nunca hay que usar documentos formales"],correct:1,expl:"Un PTW, un JSA, un Toolbox Talk o un LMRA nunca son formalidades: son barreras de seguridad sucesivas."},
    {q:"¿Cuál es la misión exacta de esta lección?",opts:["Eliminar por completo todo peligro antes de un trabajo","Transformar un trabajo peligroso en un trabajo controlado","Sustituir la formación práctica en permisos de trabajo","Presentar la historia de los sistemas de permisos"],correct:1,expl:"Algunos trabajos siempre seguirán siendo peligrosos; el objetivo no es eliminar el peligro, sino controlarlo."},
    {q:"¿Es un Permit to Work solo una autorización administrativa?",opts:["Sí, solo un documento para firmar","No, es un contrato entre quien autoriza, quien ejecuta, y quien supervisa, todos responsables","No, solo concierne a la persona que ejecuta el trabajo","Sí, sin ninguna responsabilidad compartida"],correct:1,expl:"Las tres partes se vuelven responsables, no solo el firmante inicial."},
    {q:"¿Qué comprueba realmente quien supervisa un PTW?",opts:["Solo que el documento está bien firmado","Que las condiciones del permiso siguen siendo válidas durante todo el trabajo, no solo al principio","Nada después de la firma inicial","Solo la presencia del equipo"],correct:1,expl:"La supervisión es continua, no limitada al momento de la firma."},
    {q:"¿En qué consiste realmente el Toolbox Talk?",opts:["Leer un documento en voz alta frente al equipo","Comprobar que todo el equipo ha entendido el trabajo exactamente de la misma manera","Una reunión administrativa sin impacto real en la seguridad","Un briefing reservado solo a los oficiales"],correct:1,expl:"No es una reunión, es una sincronización de la comprensión colectiva."},
    {q:"¿Qué hace el JSA (Job Safety Analysis)?",opts:["Evalúa el peligro global del buque","Descompone la tarea en etapas e identifica el peligro propio de cada etapa precisa","Sustituye por completo la necesidad de un permiso de trabajo","Solo concierne a los trabajos en altura"],correct:1,expl:"El JSA estructura el análisis paso a paso, no una evaluación vaga y global."},
    {q:"¿Por qué es necesario un LMRA aunque ya exista un permiso?",opts:["Nunca lo es si el permiso es válido","Las condiciones pueden cambiar entre la planificación y la ejecución del trabajo","El LMRA sustituye por completo al permiso de trabajo","Solo concierne a los trabajos nocturnos"],correct:1,expl:"Un permiso firmado nunca sustituye una reevaluación en el momento de la ejecución."},
    {q:"Entre las preguntas del LMRA, ¿cuál concierne a los cambios del entorno de trabajo?",opts:["El lugar sigue siendo el mismo y ha cambiado el tiempo","Solo el precio del material usado","Solo la hora prevista de fin del trabajo","Ninguna pregunta concierne al entorno"],correct:0,expl:"El lugar y el tiempo forman parte de las condiciones que pueden evolucionar entre la planificación y la ejecución."},
    {q:"¿Qué significa ejercer el Stop Work Authority?",opts:["Desobedecer a la jerarquía sin justificación","Proteger a tu equipo deteniendo un trabajo en cuanto una situación parezca peligrosa, sea cual sea tu rango","Una acción reservada solo al capitán","Una decisión que nunca tiene justificación legítima"],correct:1,expl:"Cualquiera tiene el deber de detener un trabajo peligroso, nunca es un acto de rebelión."},
    {q:"¿Por qué se juzga a un profesional, según esta lección, respecto al Stop Work Authority?",opts:["Solo por su capacidad de realizar el trabajo rápidamente","Tanto por su capacidad de detener un trabajo peligroso como por su capacidad de realizarlo","Solo por su antigüedad a bordo","El Stop Work Authority nunca se evalúa"],correct:1,expl:"Ambas capacidades se valoran igualmente en una verdadera cultura de seguridad."},
    {q:"¿Qué propone la mini lista de verificación 'The Five Second Pause'?",opts:["Una evaluación completa que sustituye al LMRA","Cuatro preguntas rápidas antes de empezar: seguridad, preparación del equipo, cambio, peligro olvidado","Una pausa obligatoria de una hora antes de cada trabajo","Una lista reservada solo a los trabajos en caliente"],correct:1,expl:"Estas cuatro preguntas rápidas se convierten en un reflejo profesional antes de cualquier acción."},
    {q:"¿Qué representan juntos el PTW, el JSA, el Toolbox Talk y el LMRA?",opts:["Formalidades administrativas sin relación entre ellas","Barreras de seguridad sucesivas; si varias desaparecen simultáneamente, el accidente se vuelve cuestión de tiempo","Documentos que rellenar solo para el cumplimiento normativo","Etapas intercambiables sin orden particular"],correct:1,expl:"Este es el hilo conductor central de toda la lección."},
    {q:"En el escenario del permiso firmado que no bastó, ¿cuántas barreras de seguridad desaparecieron simultáneamente?",opts:["Solo una, el LMRA","Varias a la vez: sin LMRA, cambio de condiciones no integrado, Stop Work no usado","Ninguna barrera desapareció realmente","Solo la supervisión del permiso"],correct:1,expl:"Es la acumulación silenciosa de varias ausencias simultáneas lo que hace casi inevitable el incidente."},
    {q:"En este escenario, ¿era incorrecto el permiso de trabajo inicial?",opts:["Sí, nunca debería haberse firmado","No, era perfectamente válido en el momento de su firma; fue la falta de reevaluación continua lo que causó el problema","Sí, le faltaba información esencial desde el principio","No, no ocurrió ningún problema en este escenario"],correct:1,expl:"El permiso era correcto; fue la falta de vigilancia después de la firma lo que creó el riesgo."},
    {q:"¿Este módulo enseña un sustituto de los procedimientos Permit to Work reales de la compañía o de una formación certificada?",opts:["Sí, equivale a una certificación completa","No, enseña principios de prevención y decisión, nunca un sustituto de los procedimientos reales de la compañía","Sí, pero solo para oficiales","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña principios de prevención, nunca un sustituto de los procedimientos reales certificados."},
  ],
  pt:[
    {q:"O que significa o princípio 'Paper Doesn't Prevent Accidents. People Who Follow It Do'?",opts:["Um documento assinado sempre garante a segurança","O documento sozinho não protege ninguém; é o cumprimento rigoroso das suas condições pelas pessoas que previne o acidente","Este princípio só diz respeito aos permisos de trabalho a quente","Nunca se devem usar documentos formais"],correct:1,expl:"Um PTW, um JSA, um Toolbox Talk ou um LMRA nunca são formalidades: são barreiras de segurança sucessivas."},
    {q:"Qual é a missão exata desta lição?",opts:["Eliminar completamente todo o perigo antes de um trabalho","Transformar um trabalho perigoso num trabalho controlado","Substituir a formação prática em permisos de trabalho","Apresentar a história dos sistemas de permisos"],correct:1,expl:"Alguns trabalhos continuarão sempre perigosos; o objetivo não é eliminar o perigo, mas controlá-lo."},
    {q:"Um Permit to Work é apenas uma autorização administrativa?",opts:["Sim, só um documento para assinar","Não, é um contrato entre quem autoriza, quem executa, e quem supervisiona, todos responsáveis","Não, só diz respeito à pessoa que executa o trabalho","Sim, sem qualquer responsabilidade partilhada"],correct:1,expl:"As três partes tornam-se responsáveis, não apenas o signatário inicial."},
    {q:"O que verifica realmente quem supervisiona um PTW?",opts:["Só que o documento está bem assinado","Que as condições do permiso continuam válidas durante todo o trabalho, não só no início","Nada depois da assinatura inicial","Só a presença da equipa"],correct:1,expl:"A supervisão é contínua, não limitada ao momento da assinatura."},
    {q:"Em que consiste realmente o Toolbox Talk?",opts:["Ler um documento em voz alta perante a equipa","Verificar que toda a equipa compreendeu o trabalho exatamente da mesma forma","Uma reunião administrativa sem impacto real na segurança","Um briefing reservado só aos oficiais"],correct:1,expl:"Não é uma reunião, é uma sincronização da compreensão coletiva."},
    {q:"O que faz o JSA (Job Safety Analysis)?",opts:["Avalia o perigo global do navio","Decompõe a tarefa em etapas e identifica o perigo próprio de cada etapa precisa","Substitui inteiramente a necessidade de um permiso de trabalho","Só diz respeito ao trabalho em altura"],correct:1,expl:"O JSA estrutura a análise etapa por etapa, não uma avaliação vaga e global."},
    {q:"Por que é necessário um LMRA mesmo quando já existe um permiso?",opts:["Nunca é, se o permiso for válido","As condições podem mudar entre o planeamento e a execução do trabalho","O LMRA substitui inteiramente o permiso de trabalho","Só diz respeito ao trabalho noturno"],correct:1,expl:"Um permiso assinado nunca substitui uma reavaliação no momento da execução."},
    {q:"Entre as perguntas do LMRA, qual diz respeito às mudanças no ambiente de trabalho?",opts:["O local continua igual e o tempo mudou","Só o preço do material usado","Só a hora prevista de fim do trabalho","Nenhuma pergunta diz respeito ao ambiente"],correct:0,expl:"O local e o tempo fazem parte das condições que podem evoluir entre o planeamento e a execução."},
    {q:"O que significa exercer o Stop Work Authority?",opts:["Desobedecer à hierarquia sem justificação","Proteger a sua equipa parando um trabalho assim que uma situação parecer perigosa, seja qual for o seu posto","Uma ação reservada só ao comandante","Uma decisão que nunca tem justificação legítima"],correct:1,expl:"Qualquer pessoa tem o dever de parar um trabalho perigoso, nunca é um ato de rebelião."},
    {q:"Sobre o que é julgado um profissional, segundo esta lição, quanto ao Stop Work Authority?",opts:["Só pela sua capacidade de realizar o trabalho rapidamente","Tanto pela sua capacidade de parar um trabalho perigoso como pela sua capacidade de o realizar","Só pela sua antiguidade a bordo","O Stop Work Authority nunca é avaliado"],correct:1,expl:"Ambas as capacidades são igualmente valorizadas numa verdadeira cultura de segurança."},
    {q:"O que propõe a mini checklist 'The Five Second Pause'?",opts:["Uma avaliação completa que substitui o LMRA","Quatro perguntas rápidas antes de começar: segurança, preparação da equipa, mudança, perigo esquecido","Uma pausa obrigatória de uma hora antes de cada trabalho","Uma checklist reservada só ao trabalho a quente"],correct:1,expl:"Estas quatro perguntas rápidas tornam-se um reflexo profissional antes de qualquer ação."},
    {q:"O que representam juntos o PTW, o JSA, o Toolbox Talk e o LMRA?",opts:["Formalidades administrativas sem ligação entre elas","Barreiras de segurança sucessivas; se várias desaparecerem simultaneamente, o acidente torna-se uma questão de tempo","Documentos a preencher só para conformidade regulamentar","Etapas intercambiáveis sem ordem particular"],correct:1,expl:"Este é o fio condutor central de toda a lição."},
    {q:"No cenário do permiso assinado que não bastou, quantas barreiras de segurança desapareceram simultaneamente?",opts:["Só uma, o LMRA","Várias ao mesmo tempo: sem LMRA, mudança de condições não integrada, Stop Work não usado","Nenhuma barreira desapareceu realmente","Só a supervisão do permiso"],correct:1,expl:"É a acumulação silenciosa de várias ausências simultâneas que torna o incidente quase inevitável."},
    {q:"Neste cenário, o permiso de trabalho inicial estava incorreto?",opts:["Sim, nunca deveria ter sido assinado","Não, estava perfeitamente válido no momento da sua assinatura; foi a falta de reavaliação contínua que causou o problema","Sim, faltava-lhe informação essencial desde o início","Não, nenhum problema ocorreu neste cenário"],correct:1,expl:"O permiso estava correto; foi a falta de vigilância depois da assinatura que criou o risco."},
    {q:"Este módulo ensina um substituto dos procedimentos Permit to Work reais da companhia ou de uma formação certificada?",opts:["Sim, equivale a uma certificação completa","Não, ensina princípios de prevenção e decisão, nunca um substituto dos procedimentos reais da companhia","Sim, mas só para oficiais","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina princípios de prevenção, nunca um substituto dos procedimentos reais certificados."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'Paper Doesn't Prevent Accidents. People Who Follow It Do' ?",opts:["Un document signé suffit toujours","Le respect rigoureux des conditions par les personnes prévient l'accident, pas le document seul","Cela ne concerne que les permis à chaud","Il ne faut jamais de documents formels"],correct:1,expl:"PTW, JSA, Toolbox Talk et LMRA sont des barrières successives, jamais de simples formalités."},
    {q:"Un PTW est-il seulement une autorisation ?",opts:["Oui, uniquement un document","Non, un contrat entre celui qui autorise, exécute, et supervise, tous responsables","Non, il ne concerne que l'exécutant","Oui, sans responsabilité partagée"],correct:1,expl:"Les trois parties deviennent responsables."},
    {q:"Pourquoi un LMRA reste-t-il nécessaire même avec un permis déjà signé ?",opts:["Il ne l'est jamais","Les conditions peuvent changer entre planification et exécution","Il remplace le permis","Uniquement pour les travaux de nuit"],correct:1,expl:"Un permis signé ne remplace jamais une réévaluation au moment T."},
    {q:"Que signifie exercer son Stop Work Authority ?",opts:["Désobéir sans justification","Protéger son équipe en arrêtant un travail dangereux, quel que soit son rang","Une action réservée au commandant","Jamais légitime"],correct:1,expl:"N'importe qui a le devoir d'arrêter un travail dangereux."},
    {q:"Dans le scénario du permis signé qui n'a pas suffi, qu'est-ce qui a réellement posé problème ?",opts:["Le permis initial était incorrect","Plusieurs barrières ont disparu simultanément : LMRA absent, changements non intégrés, Stop Work non utilisé","Aucun problème n'est survenu","Uniquement la météo"],correct:1,expl:"C'est l'accumulation silencieuse de plusieurs absences qui rend l'incident presque inévitable."},
  ],
  en:[
    {q:"What does 'Paper Doesn't Prevent Accidents. People Who Follow It Do' mean?",opts:["A signed document always suffices","Rigorous compliance by people prevents the accident, not the document alone","It only concerns hot work permits","Formal documents should never be used"],correct:1,expl:"PTW, JSA, Toolbox Talk, and LMRA are successive barriers, never simple formalities."},
    {q:"Is a PTW just an authorization?",opts:["Yes, only a document","No, a contract between the one who authorizes, executes, and supervises, all responsible","No, it only concerns the one executing","Yes, with no shared responsibility"],correct:1,expl:"All three parties become responsible."},
    {q:"Why does an LMRA remain necessary even with an already signed permit?",opts:["It never is","Conditions can change between planning and execution","It replaces the permit","Only for night work"],correct:1,expl:"A signed permit never replaces a reassessment at execution time."},
    {q:"What does exercising Stop Work Authority mean?",opts:["Disobeying without justification","Protecting your team by stopping dangerous work, whatever your rank","An action reserved for the captain","Never legitimate"],correct:1,expl:"Anyone has the duty to stop dangerous work."},
    {q:"In the scenario of the signed permit that wasn't enough, what actually caused the problem?",opts:["The original permit was incorrect","Several barriers disappeared simultaneously: no LMRA, changes not accounted for, Stop Work not used","No problem occurred","Only the weather"],correct:1,expl:"It's the silent accumulation of several absences that makes the incident almost inevitable."},
  ],
  es:[
    {q:"¿Qué significa 'Paper Doesn't Prevent Accidents. People Who Follow It Do'?",opts:["Un documento firmado siempre basta","El cumplimiento riguroso por las personas previene el accidente, no el documento solo","Solo concierne a los permisos en caliente","Nunca hay que usar documentos formales"],correct:1,expl:"PTW, JSA, Toolbox Talk y LMRA son barreras sucesivas, nunca simples formalidades."},
    {q:"¿Es un PTW solo una autorización?",opts:["Sí, solo un documento","No, un contrato entre quien autoriza, ejecuta, y supervisa, todos responsables","No, solo concierne al ejecutante","Sí, sin responsabilidad compartida"],correct:1,expl:"Las tres partes se vuelven responsables."},
    {q:"¿Por qué un LMRA sigue siendo necesario incluso con un permiso ya firmado?",opts:["Nunca lo es","Las condiciones pueden cambiar entre la planificación y la ejecución","Sustituye al permiso","Solo para trabajos nocturnos"],correct:1,expl:"Un permiso firmado nunca sustituye una reevaluación en el momento de la ejecución."},
    {q:"¿Qué significa ejercer el Stop Work Authority?",opts:["Desobedecer sin justificación","Proteger a tu equipo deteniendo un trabajo peligroso, sea cual sea tu rango","Una acción reservada al capitán","Nunca legítimo"],correct:1,expl:"Cualquiera tiene el deber de detener un trabajo peligroso."},
    {q:"En el escenario del permiso firmado que no bastó, ¿qué causó realmente el problema?",opts:["El permiso inicial era incorrecto","Varias barreras desaparecieron simultáneamente: sin LMRA, cambios no integrados, Stop Work no usado","No ocurrió ningún problema","Solo el tiempo"],correct:1,expl:"Es la acumulación silenciosa de varias ausencias lo que hace casi inevitable el incidente."},
  ],
  pt:[
    {q:"O que significa 'Paper Doesn't Prevent Accidents. People Who Follow It Do'?",opts:["Um documento assinado sempre basta","O cumprimento rigoroso pelas pessoas previne o acidente, não o documento sozinho","Só diz respeito aos permisos a quente","Nunca se devem usar documentos formais"],correct:1,expl:"PTW, JSA, Toolbox Talk e LMRA são barreiras sucessivas, nunca simples formalidades."},
    {q:"Um PTW é apenas uma autorização?",opts:["Sim, só um documento","Não, um contrato entre quem autoriza, executa, e supervisiona, todos responsáveis","Não, só diz respeito a quem executa","Sim, sem responsabilidade partilhada"],correct:1,expl:"As três partes tornam-se responsáveis."},
    {q:"Por que um LMRA continua necessário mesmo com um permiso já assinado?",opts:["Nunca é","As condições podem mudar entre o planeamento e a execução","Substitui o permiso","Só para trabalho noturno"],correct:1,expl:"Um permiso assinado nunca substitui uma reavaliação no momento da execução."},
    {q:"O que significa exercer o Stop Work Authority?",opts:["Desobedecer sem justificação","Proteger a sua equipa parando um trabalho perigoso, seja qual for o seu posto","Uma ação reservada ao comandante","Nunca legítimo"],correct:1,expl:"Qualquer pessoa tem o dever de parar um trabalho perigoso."},
    {q:"No cenário do permiso assinado que não bastou, o que causou realmente o problema?",opts:["O permiso inicial estava incorreto","Várias barreiras desapareceram simultaneamente: sem LMRA, mudanças não integradas, Stop Work não usado","Nenhum problema ocorreu","Só o tempo"],correct:1,expl:"É a acumulação silenciosa de várias ausências que torna o incidente quase inevitável."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"La derniere fois qu'un permis de travail existait deja, as-tu quand meme pris le temps de faire un LMRA avant de commencer ?",
    en:"The last time a work permit already existed, did you still take the time to do an LMRA before starting?",
    es:"La ultima vez que ya existia un permiso de trabajo, ¿te tomaste igualmente el tiempo de hacer un LMRA antes de empezar?",
    pt:"Da ultima vez que ja existia um permiso de trabalho, tiraste na mesma o tempo para fazer um LMRA antes de começar?",
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
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Leçon 5/6 · ⭐ Premium",
      title:"Permit to Work & Risk Assessment",
      intro:"Cette leçon change de nature par rapport aux quatre précédentes. Les leçons 1 à 4 enseignent la réaction : détecter, réagir, se protéger, annoncer. Celle-ci enseigne la prévention planifiée, avant même que le travail ne commence.",
      p0:"PAPER DOESN'T PREVENT ACCIDENTS. PEOPLE WHO FOLLOW IT DO.",s0t:"Le principe qui structure toute la leçon",
      s0:"Un PTW, un JSA, un Toolbox Talk et un LMRA ne sont jamais des formalités administratives. Ce sont des barrières de sécurité successives. Si l'une d'elles disparaît, le risque augmente. Si plusieurs disparaissent en même temps, l'accident devient souvent une question de temps.\n\nCOMMENT LE RECONNAÎTRE ? Un travail présentant un risque suffisant pour exiger une autorisation formelle.\nQUE FAIRE IMMÉDIATEMENT ? Permis, Toolbox Talk et JSA, puis LMRA juste avant de commencer.\nQUELLE ERREUR L'AGGRAVE ? Considérer le permis comme suffisant sans réévaluation au moment T.\nQUAND DEMANDER DE L'AIDE ? Dès qu'une condition a changé depuis la délivrance du permis, ou dès le moindre doute, via le Stop Work Authority.",
      p1:"PERMIT TO WORK",s1t:"Un contrat entre trois personnes, toutes responsables",
      s1:"Celui qui autorise, celui qui exécute, celui qui supervise : le PTW n'est pas seulement une signature, c'est un engagement partagé qui reste valable pendant toute la durée du travail.",
      p2:"TOOLBOX TALK & JSA",s2t:"Une synchronisation, pas une réunion",
      s2:"Le Toolbox Talk vérifie que toute l'équipe a compris le travail exactement de la même manière. Le JSA décompose la tâche en étapes et identifie le danger propre à chacune.",
      p3:"LMRA - LAST MINUTE RISK ASSESSMENT",s3t:"Le dernier contrôle, même si un permis existe déjà",
      s3:"Le lieu est-il toujours identique ? La météo a-t-elle changé ? Une autre équipe travaille-t-elle à proximité ? Un nouvel équipement est-il arrivé ? Une nouvelle source d'énergie est-elle apparue ? Les conditions peuvent changer entre planification et exécution.",
      p4:"STOP WORK AUTHORITY",s4t:"Protéger son équipe, pas désobéir",
      s4:"N'importe qui, quel que soit son rang, a le devoir d'arrêter un travail dès qu'une situation semble dangereuse. Un professionnel est jugé autant sur sa capacité à arrêter un travail dangereux que sur sa capacité à le réaliser.",
      p5:"⏱️ THE FIVE SECOND PAUSE",p6:"🎯 LE CHANTIER QUI A CHANGÉ",p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"📋 CAS D'ÉTUDE",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 5",
      sumP:["Paper Doesn't Prevent Accidents. People Who Follow It Do","Le PTW est un contrat entre trois personnes, toutes responsables","Le Toolbox Talk synchronise, le JSA décompose la tâche en dangers précis","Le LMRA reste nécessaire même avec un permis déjà signé","Le Stop Work Authority protège l'équipe, ce n'est jamais désobéir"],
      learnedP:["La nature réelle d'un Permit to Work","La différence entre Toolbox Talk, JSA et LMRA","Les questions essentielles d'un LMRA avant de commencer","Le Stop Work Authority comme responsabilité, pas comme rébellion","Pourquoi plusieurs barrières disparues ensemble rendent l'accident presque inévitable"],
      transition:"You now know how to prevent an accident before it happens. But even with the best prevention system, procedures create safety. People create a safety culture.",
      safetyMsg:"Paper doesn't prevent accidents. People who follow it do.",
    },
    en:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lesson 5/6 · ⭐ Premium",
      title:"Permit to Work & Risk Assessment",
      intro:"This lesson changes in nature compared to the previous four. Lessons 1 to 4 teach reaction: detecting, reacting, protecting oneself, reporting. This one teaches planned prevention, before the work even begins.",
      p0:"PAPER DOESN'T PREVENT ACCIDENTS. PEOPLE WHO FOLLOW IT DO.",s0t:"The principle that structures the whole lesson",
      s0:"A PTW, a JSA, a Toolbox Talk, and an LMRA are never administrative formalities. They are successive safety barriers. If one disappears, the risk increases. If several disappear at once, the accident often becomes a matter of time.\n\nHOW DO I RECOGNIZE IT? A job presenting enough risk to require formal authorization.\nWHAT DO I DO IMMEDIATELY? Permit, Toolbox Talk and JSA, then LMRA just before starting.\nWHAT MISTAKE MAKES IT WORSE? Considering the permit sufficient without reassessment at execution time.\nWHEN MUST I ASK FOR HELP? As soon as a condition has changed since the permit was issued, or at the slightest doubt, via Stop Work Authority.",
      p1:"PERMIT TO WORK",s1t:"A contract between three people, all responsible",
      s1:"The one who authorizes, the one who executes, the one who supervises: the PTW is not just a signature, it's a shared commitment that remains valid throughout the work.",
      p2:"TOOLBOX TALK & JSA",s2t:"A synchronization, not a meeting",
      s2:"The Toolbox Talk checks that the whole team understood the work in exactly the same way. The JSA breaks the task into steps and identifies the danger specific to each.",
      p3:"LMRA - LAST MINUTE RISK ASSESSMENT",s3t:"The last check, even if a permit already exists",
      s3:"Is the place still the same? Has the weather changed? Is another team working nearby? Has new equipment arrived? Has a new energy source appeared? Conditions can change between planning and execution.",
      p4:"STOP WORK AUTHORITY",s4t:"Protecting your team, not disobeying",
      s4:"Anyone, whatever their rank, has the duty to stop a job as soon as a situation seems dangerous. A professional is judged as much on their ability to stop dangerous work as on their ability to carry it out.",
      p5:"⏱️ THE FIVE SECOND PAUSE",p6:"🎯 THE WORKSITE THAT CHANGED",p7:"🎯 OPERATIONAL EXERCISE",p8:"📋 CASE STUDY",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 5",
      sumP:["Paper Doesn't Prevent Accidents. People Who Follow It Do","The PTW is a contract between three people, all responsible","The Toolbox Talk synchronizes, the JSA breaks the task into precise dangers","The LMRA remains necessary even with an already signed permit","Stop Work Authority protects the team, it is never disobeying"],
      learnedP:["The real nature of a Permit to Work","The difference between Toolbox Talk, JSA, and LMRA","The essential questions of an LMRA before starting","Stop Work Authority as a responsibility, not a rebellion","Why several barriers disappearing together makes an accident almost inevitable"],
      transition:"You now know how to prevent an accident before it happens. But even with the best prevention system, procedures create safety. People create a safety culture.",
      safetyMsg:"Paper doesn't prevent accidents. People who follow it do.",
    },
    es:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lección 5/6 · ⭐ Premium",
      title:"Permit to Work & Risk Assessment",
      intro:"Esta lección cambia de naturaleza respecto a las cuatro anteriores. Las lecciones 1 a 4 enseñan la reacción: detectar, reaccionar, protegerse, informar. Esta enseña la prevención planificada, antes incluso de que empiece el trabajo.",
      p0:"PAPER DOESN'T PREVENT ACCIDENTS. PEOPLE WHO FOLLOW IT DO.",s0t:"El principio que estructura toda la lección",
      s0:"Un PTW, un JSA, un Toolbox Talk y un LMRA nunca son formalidades administrativas. Son barreras de seguridad sucesivas. Si una desaparece, el riesgo aumenta. Si varias desaparecen a la vez, el accidente suele convertirse en cuestión de tiempo.\n\n¿CÓMO RECONOCERLO? Un trabajo con riesgo suficiente como para exigir autorización formal.\n¿QUÉ HACER DE INMEDIATO? Permiso, Toolbox Talk y JSA, luego LMRA justo antes de empezar.\n¿QUÉ ERROR LO AGRAVA? Considerar el permiso suficiente sin reevaluación en el momento de la ejecución.\n¿CUÁNDO PEDIR AYUDA? En cuanto una condición haya cambiado desde que se emitió el permiso, o ante la más mínima duda, mediante el Stop Work Authority.",
      p1:"PERMIT TO WORK",s1t:"Un contrato entre tres personas, todas responsables",
      s1:"Quien autoriza, quien ejecuta, quien supervisa: el PTW no es solo una firma, es un compromiso compartido que sigue siendo válido durante todo el trabajo.",
      p2:"TOOLBOX TALK & JSA",s2t:"Una sincronización, no una reunión",
      s2:"El Toolbox Talk comprueba que todo el equipo entendió el trabajo exactamente de la misma manera. El JSA descompone la tarea en etapas e identifica el peligro propio de cada una.",
      p3:"LMRA - LAST MINUTE RISK ASSESSMENT",s3t:"El último control, aunque ya exista un permiso",
      s3:"¿El lugar sigue siendo el mismo? ¿Ha cambiado el tiempo? ¿Trabaja otro equipo cerca? ¿Ha llegado nuevo equipo? ¿Ha aparecido una nueva fuente de energía? Las condiciones pueden cambiar entre la planificación y la ejecución.",
      p4:"STOP WORK AUTHORITY",s4t:"Proteger a tu equipo, no desobedecer",
      s4:"Cualquiera, sea cual sea su rango, tiene el deber de detener un trabajo en cuanto una situación parezca peligrosa. Un profesional es juzgado tanto por su capacidad de detener un trabajo peligroso como por su capacidad de realizarlo.",
      p5:"⏱️ THE FIVE SECOND PAUSE",p6:"🎯 LA OBRA QUE CAMBIÓ",p7:"🎯 EJERCICIO OPERATIVO",p8:"📋 CASO DE ESTUDIO",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 5",
      sumP:["Paper Doesn't Prevent Accidents. People Who Follow It Do","El PTW es un contrato entre tres personas, todas responsables","El Toolbox Talk sincroniza, el JSA descompone la tarea en peligros precisos","El LMRA sigue siendo necesario incluso con un permiso ya firmado","El Stop Work Authority protege al equipo, nunca es desobedecer"],
      learnedP:["La verdadera naturaleza de un Permit to Work","La diferencia entre Toolbox Talk, JSA y LMRA","Las preguntas esenciales de un LMRA antes de empezar","El Stop Work Authority como responsabilidad, no como rebelión","Por qué varias barreras desaparecidas juntas hacen casi inevitable un accidente"],
      transition:"You now know how to prevent an accident before it happens. But even with the best prevention system, procedures create safety. People create a safety culture.",
      safetyMsg:"Paper doesn't prevent accidents. People who follow it do.",
    },
    pt:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lição 5/6 · ⭐ Premium",
      title:"Permit to Work & Risk Assessment",
      intro:"Esta lição muda de natureza em relação às quatro anteriores. As lições 1 a 4 ensinam a reação: detetar, reagir, proteger-se, reportar. Esta ensina a prevenção planeada, mesmo antes de o trabalho começar.",
      p0:"PAPER DOESN'T PREVENT ACCIDENTS. PEOPLE WHO FOLLOW IT DO.",s0t:"O princípio que estrutura toda a lição",
      s0:"Um PTW, um JSA, um Toolbox Talk e um LMRA nunca são formalidades administrativas. São barreiras de segurança sucessivas. Se uma desaparecer, o risco aumenta. Se várias desaparecerem ao mesmo tempo, o acidente torna-se muitas vezes uma questão de tempo.\n\nCOMO RECONHECER? Um trabalho com risco suficiente para exigir autorização formal.\nO QUE FAZER IMEDIATAMENTE? Permiso, Toolbox Talk e JSA, depois LMRA mesmo antes de começar.\nQUE ERRO O AGRAVA? Considerar o permiso suficiente sem reavaliação no momento da execução.\nQUANDO PEDIR AJUDA? Assim que uma condição tiver mudado desde a emissão do permiso, ou perante a mínima dúvida, através do Stop Work Authority.",
      p1:"PERMIT TO WORK",s1t:"Um contrato entre três pessoas, todas responsáveis",
      s1:"Quem autoriza, quem executa, quem supervisiona: o PTW não é só uma assinatura, é um compromisso partilhado que continua válido durante todo o trabalho.",
      p2:"TOOLBOX TALK & JSA",s2t:"Uma sincronização, não uma reunião",
      s2:"O Toolbox Talk verifica que toda a equipa compreendeu o trabalho exatamente da mesma forma. O JSA decompõe a tarefa em etapas e identifica o perigo próprio de cada uma.",
      p3:"LMRA - LAST MINUTE RISK ASSESSMENT",s3t:"O último controlo, mesmo que já exista um permiso",
      s3:"O local continua igual? O tempo mudou? Outra equipa trabalha perto? Chegou novo equipamento? Surgiu uma nova fonte de energia? As condições podem mudar entre o planeamento e a execução.",
      p4:"STOP WORK AUTHORITY",s4t:"Proteger a sua equipa, não desobedecer",
      s4:"Qualquer pessoa, seja qual for o seu posto, tem o dever de parar um trabalho assim que uma situação parecer perigosa. Um profissional é julgado tanto pela sua capacidade de parar um trabalho perigoso como pela sua capacidade de o realizar.",
      p5:"⏱️ THE FIVE SECOND PAUSE",p6:"🎯 A OBRA QUE MUDOU",p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"📋 CASO DE ESTUDO",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 5",
      sumP:["Paper Doesn't Prevent Accidents. People Who Follow It Do","O PTW é um contrato entre três pessoas, todas responsáveis","O Toolbox Talk sincroniza, o JSA decompõe a tarefa em perigos precisos","O LMRA continua necessário mesmo com um permiso já assinado","O Stop Work Authority protege a equipa, nunca é desobedecer"],
      learnedP:["A verdadeira natureza de um Permit to Work","A diferença entre Toolbox Talk, JSA e LMRA","As perguntas essenciais de um LMRA antes de começar","O Stop Work Authority como responsabilidade, não como rebelião","Por que várias barreiras desaparecidas juntas tornam um acidente quase inevitável"],
      transition:"You now know how to prevent an accident before it happens. But even with the best prevention system, procedures create safety. People create a safety culture.",
      safetyMsg:"Paper doesn't prevent accidents. People who follow it do.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS6_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 5/6":lang==="en"?"Lesson 5/6":lang==="es"?"Lección 5/6":"Lição 5/6"}</div>
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
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="📋" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📋</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📋 {lang==="fr"?"PERMIT TO WORK - INTERACTIF":lang==="en"?"PERMIT TO WORK - INTERACTIVE":lang==="es"?"PERMIT TO WORK - INTERACTIVO":"PERMIT TO WORK - INTERATIVO"}</div><PermitToWorkSVG lang={lang}/></Card>

            <SL icon="🗣️" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🗣️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🗣️ {lang==="fr"?"TOOLBOX TALK & JSA - INTERACTIF":lang==="en"?"TOOLBOX TALK & JSA - INTERACTIVE":lang==="es"?"TOOLBOX TALK Y JSA - INTERACTIVO":"TOOLBOX TALK E JSA - INTERATIVO"}</div><ToolboxJsaSVG lang={lang}/></Card>

            <SL icon="⏱️" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏱️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⏱️ {lang==="fr"?"LMRA - INTERACTIF":lang==="en"?"LMRA - INTERACTIVE":lang==="es"?"LMRA - INTERACTIVO":"LMRA - INTERATIVO"}</div><LmraSVG lang={lang}/></Card>

            <SL icon="🛑" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛑</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🛑 {lang==="fr"?"STOP WORK AUTHORITY - INTERACTIF":lang==="en"?"STOP WORK AUTHORITY - INTERACTIVE":lang==="es"?"STOP WORK AUTHORITY - INTERACTIVO":"STOP WORK AUTHORITY - INTERATIVO"}</div><StopWorkAuthoritySVG lang={lang}/></Card>

            <SL icon="⏱️" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><FiveSecondPauseSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><ChangedWorksiteExercise lang={lang}/></Card>

            <SL icon="🎯" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="📋" text={lc.p8} color={C.orange}/>
            <div style={{marginBottom:14}}><CompositeCase lang={lang}/></div>

            <SL icon="📝" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p10} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final - Permit to Work":lang==="en"?"Final Quiz - Permit to Work":lang==="es"?"Quiz Final - Permit to Work":"Quiz Final - Permit to Work"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 5/6":"questions · Lesson 5/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
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
              {lang==="fr"?"LEÇON 6 - SAFETY CULTURE →":lang==="en"?"LESSON 6 - SAFETY CULTURE →":lang==="es"?"LECCIÓN 6 - SAFETY CULTURE →":"LIÇÃO 6 - SAFETY CULTURE →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
