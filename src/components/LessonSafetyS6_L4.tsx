import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - REPORTING AN EMERGENCY (WHAT-WHERE-WHO-RISK-ACTION)
function ReportingMethodSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, color:C.blue2, label:{fr:"WHAT",en:"WHAT",es:"WHAT",pt:"WHAT"}, desc:{fr:"Que se passe-t-il ? Nommer précisément la nature de l'urgence, jamais une description vague ou incertaine.",en:"What is happening? Precisely name the nature of the emergency, never a vague or uncertain description.",es:"¿Qué está pasando? Nombrar con precisión la naturaleza de la urgencia, nunca una descripción vaga o incierta.",pt:"O que está a acontecer? Nomear com precisão a natureza da urgência, nunca uma descrição vaga ou incerta."} },
    { id:2, color:C.orange, label:{fr:"WHERE",en:"WHERE",es:"WHERE",pt:"WHERE"}, desc:{fr:"Où exactement ? Un compartiment, un pont, un côté du navire : la localisation précise permet d'orienter l'intervention sans perte de temps.",en:"Where exactly? A compartment, a deck, a side of the ship: the precise location allows the intervention to be directed without wasting time.",es:"¿Dónde exactamente? Un compartimento, una cubierta, un lado del buque: la localización precisa permite orientar la intervención sin perder tiempo.",pt:"Onde exatamente? Um compartimento, um convés, um lado do navio: a localização precisa permite orientar a intervenção sem perder tempo."} },
    { id:3, color:C.red, label:{fr:"WHO",en:"WHO",es:"WHO",pt:"WHO"}, desc:{fr:"Qui est concerné ? Personnes blessées, présentes, ou en danger immédiat, pour permettre de mobiliser l'aide adaptée.",en:"Who is concerned? People injured, present, or in immediate danger, to allow mobilizing the appropriate help.",es:"¿Quién está implicado? Personas heridas, presentes, o en peligro inmediato, para poder movilizar la ayuda adecuada.",pt:"Quem está envolvido? Pessoas feridas, presentes, ou em perigo imediato, para permitir mobilizar a ajuda adequada."} },
    { id:4, color:C.gold2, label:{fr:"RISK",en:"RISK",es:"RISK",pt:"RISK"}, desc:{fr:"Quel danger immédiat ? Ce qui menace de s'aggraver, pour que la passerelle comprenne l'urgence réelle de la situation.",en:"What immediate danger? What threatens to worsen, so the bridge understands the real urgency of the situation.",es:"¿Qué peligro inmediato? Lo que amenaza con empeorar, para que el puente comprenda la urgencia real de la situación.",pt:"Que perigo imediato? O que ameaça agravar-se, para que o passadiço compreenda a urgência real da situação."} },
    { id:5, color:C.green, label:{fr:"ACTION",en:"ACTION",es:"ACTION",pt:"ACTION"}, desc:{fr:"Que faites-vous actuellement ? Préciser les gestes déjà entrepris évite les doublons et guide la suite de la réponse.",en:"What are you currently doing? Specifying actions already taken avoids duplication and guides the rest of the response.",es:"¿Qué estás haciendo actualmente? Precisar los gestos ya realizados evita duplicaciones y guía el resto de la respuesta.",pt:"O que estás a fazer atualmente? Precisar os gestos já realizados evita duplicações e orienta o resto da resposta."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map((s,idx)=>(
          <div key={s.id}>
            <div onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:s.color,flexShrink:0}}/>
              <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1,fontFamily:"'Cinzel',serif"}}>{s.label[lang]||s.label.fr}</div>
            </div>
            {idx<steps.length-1&&<div style={{textAlign:"center",fontSize:12,color:C.muted,padding:"2px 0"}}>↓</div>}
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Une structure simple et mémorisable, même sous le stress d'une urgence.":lang==="en"?"A simple, memorable structure, even under the stress of an emergency.":lang==="es"?"Una estructura simple y memorable, incluso bajo el estrés de una urgencia.":"Uma estrutura simples e memorável, mesmo sob o stress de uma urgência."}</div>
    </div>
  );
}

// SVG 2 - EMERGENCY COMMUNICATION CHAIN (ESCALATION LOGIC)
function CommunicationChainSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"🧑", label:{fr:"Premier intervenant",en:"First responder",es:"Primer interviniente",pt:"Primeiro interveniente"}, desc:{fr:"Découvre la situation et déclenche la chaîne : sa responsabilité n'est pas de résoudre seul, mais d'alerter correctement.",en:"Discovers the situation and triggers the chain: their responsibility is not to solve it alone, but to alert correctly.",es:"Descubre la situación y desencadena la cadena: su responsabilidad no es resolverla solo, sino alertar correctamente.",pt:"Descobre a situação e desencadeia a cadeia: a sua responsabilidade não é resolvê-la sozinho, mas alertar corretamente."} },
    { id:2, icon:"🎖️", label:{fr:"Officier de quart",en:"Officer of the watch",es:"Oficial de guardia",pt:"Oficial de quarto"}, desc:{fr:"Reçoit l'information, l'évalue rapidement, et décide de la faire remonter à la passerelle selon sa gravité.",en:"Receives the information, quickly assesses it, and decides whether to escalate it to the bridge based on severity.",es:"Recibe la información, la evalúa rápidamente, y decide si la escala al puente según su gravedad.",pt:"Recebe a informação, avalia-a rapidamente, e decide se a escala ao passadiço consoante a sua gravidade."} },
    { id:3, icon:"🧭", label:{fr:"Passerelle",en:"Bridge",es:"Puente",pt:"Passadiço"}, desc:{fr:"Centralise l'information, coordonne les premières réponses, et informe le commandant si la situation l'exige.",en:"Centralizes the information, coordinates initial responses, and informs the captain if the situation requires it.",es:"Centraliza la información, coordina las primeras respuestas, e informa al capitán si la situación lo exige.",pt:"Centraliza a informação, coordena as primeiras respostas, e informa o comandante se a situação o exigir."} },
    { id:4, icon:"⚓", label:{fr:"Commandant",en:"Captain",es:"Capitán",pt:"Comandante"}, desc:{fr:"Prend les décisions majeures : mobilisation complète des équipes, demande d'assistance extérieure si nécessaire.",en:"Makes the major decisions: full mobilization of teams, request for outside assistance if necessary.",es:"Toma las decisiones importantes: movilización completa de los equipos, solicitud de asistencia exterior si es necesario.",pt:"Toma as decisões importantes: mobilização completa das equipas, pedido de assistência exterior se necessário."} },
    { id:5, icon:"👥", label:{fr:"Équipes spécialisées",en:"Specialized teams",es:"Equipos especializados",pt:"Equipas especializadas"}, desc:{fr:"Interviennent avec les compétences et le matériel adaptés, une fois l'information complète transmise.",en:"Intervene with the appropriate skills and equipment, once the complete information has been transmitted.",es:"Intervienen con las habilidades y el material adecuados, una vez transmitida la información completa.",pt:"Intervêm com as competências e o material adequados, uma vez transmitida a informação completa."} },
    { id:6, icon:"🌍", label:{fr:"Secours extérieurs (si nécessaire)",en:"Outside rescue (if necessary)",es:"Socorro exterior (si es necesario)",pt:"Socorro exterior (se necessário)"}, desc:{fr:"Mobilisés lorsque les moyens du bord ne suffisent pas : garde-côtes, autres navires, secours médicaux à terre.",en:"Mobilized when the ship's own means aren't enough: coast guard, other vessels, shore-based medical rescue.",es:"Movilizados cuando los medios del buque no bastan: guardacostas, otros buques, socorro médico en tierra.",pt:"Mobilizados quando os meios do navio não bastam: guarda costeira, outros navios, socorro médico em terra."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map((s,idx)=>(
          <div key={s.id}>
            <div onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(77,166,255,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.blue2:"rgba(255,255,255,0.08)"}`}}>
              <div style={{fontSize:16}}>{s.icon}</div>
              <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
            </div>
            {idx<steps.length-1&&<div style={{textAlign:"center",fontSize:12,color:C.muted,padding:"2px 0"}}>↓</div>}
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(77,166,255,0.1)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Chaque information transmise déclenche une nouvelle étape de la chaîne.":lang==="en"?"Each piece of information transmitted triggers a new step in the chain.":lang==="es"?"Cada información transmitida desencadena una nueva etapa de la cadena.":"Cada informação transmitida desencadeia uma nova etapa da cadeia."}</div>
    </div>
  );
}

// SVG 3 - SECURING THE SCENE (THREE PRIORITIES)
function SecuringSceneSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🧑‍🤝‍🧑", label:{fr:"Protéger les personnes",en:"Protecting people",es:"Proteger a las personas",pt:"Proteger as pessoas"}, desc:{fr:"Écarter toute personne du danger immédiat avant toute autre considération, y compris avant de préserver le navire.",en:"Move everyone away from immediate danger before any other consideration, including before preserving the ship.",es:"Alejar a cualquier persona del peligro inmediato antes de cualquier otra consideración, incluso antes de preservar el buque.",pt:"Afastar qualquer pessoa do perigo imediato antes de qualquer outra consideração, incluindo antes de preservar o navio."} },
    { id:2, icon:"🚫", label:{fr:"Empêcher l'aggravation",en:"Preventing worsening",es:"Impedir el agravamiento",pt:"Impedir o agravamento"}, desc:{fr:"Agir pour que la situation ne se dégrade pas davantage, sans jamais tenter une action hors de sa formation.",en:"Act so the situation doesn't worsen further, without ever attempting an action beyond one's training.",es:"Actuar para que la situación no empeore más, sin intentar nunca una acción fuera de la propia formación.",pt:"Agir para que a situação não piore mais, sem nunca tentar uma ação fora da própria formação."} },
    { id:3, icon:"🔒", label:{fr:"Préserver la zone",en:"Preserving the scene",es:"Preservar la zona",pt:"Preservar a zona"}, desc:{fr:"Empêcher l'accès non nécessaire, baliser si possible, pour permettre une intervention efficace des équipes spécialisées.",en:"Prevent unnecessary access, mark off the area if possible, to allow specialized teams to intervene effectively.",es:"Impedir el acceso innecesario, señalizar si es posible, para permitir una intervención eficaz de los equipos especializados.",pt:"Impedir o acesso desnecessário, sinalizar se possível, para permitir uma intervenção eficaz das equipas especializadas."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Le premier intervenant ne doit jamais créer une seconde urgence.":lang==="en"?"The first responder must never create a second emergency.":lang==="es"?"El primer interviniente nunca debe crear una segunda urgencia.":"O primeiro interveniente nunca deve criar uma segunda urgência."}</div>
    </div>
  );
}

// SVG 4 - SAFE INITIAL RESPONSE (WHAT I CAN DO VS WHAT I MUST NEVER DO)
function SafeInitialResponseSVG({ lang }) {
  const [tab, setTab] = useState("can");
  const canDo = {
    fr:["Écarter les personnes du danger immédiat","Effectuer les premiers secours de base si formé et certifié","Signaler en continu l'évolution de la situation","Guider les équipes spécialisées à leur arrivée"],
    en:["Move people away from immediate danger","Perform basic first aid if trained and certified","Continuously report how the situation evolves","Guide specialized teams upon their arrival"],
    es:["Alejar a las personas del peligro inmediato","Realizar primeros auxilios básicos si está formado y certificado","Informar continuamente de la evolución de la situación","Guiar a los equipos especializados a su llegada"],
    pt:["Afastar as pessoas do perigo imediato","Realizar primeiros socorros básicos se formado e certificado","Reportar continuamente a evolução da situação","Guiar as equipas especializadas na sua chegada"],
  };
  const neverDo = {
    fr:["Improviser une intervention technique hors de sa formation","Dépasser son niveau de compétence par excès de confiance","Entrer dans une zone dangereuse sans équipement adapté","Quitter les lieux sans nécessité absolue avant le relais"],
    en:["Improvise a technical intervention beyond one's training","Exceed one's skill level out of overconfidence","Enter a dangerous zone without suitable equipment","Leave the scene without absolute necessity before being relieved"],
    es:["Improvisar una intervención técnica fuera de su formación","Superar su nivel de competencia por exceso de confianza","Entrar en una zona peligrosa sin equipo adecuado","Abandonar el lugar sin necesidad absoluta antes del relevo"],
    pt:["Improvisar uma intervenção técnica fora da sua formação","Ultrapassar o seu nível de competência por excesso de confiança","Entrar numa zona perigosa sem equipamento adequado","Deixar o local sem necessidade absoluta antes do revezamento"],
  };
  const list = tab==="can" ? (canDo[lang]||canDo.fr) : (neverDo[lang]||neverDo.fr);
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <button onClick={()=>setTab("can")} style={{flex:1,padding:"9px 0",borderRadius:10,fontSize:11,fontWeight:700,cursor:"pointer",background:tab==="can"?"rgba(30,138,74,0.2)":"rgba(255,255,255,0.05)",border:`1.5px solid ${tab==="can"?C.green:"rgba(255,255,255,0.1)"}`,color:tab==="can"?C.green:C.muted}}>{lang==="fr"?"✅ Ce que je peux faire":lang==="en"?"✅ What I can do":lang==="es"?"✅ Lo que puedo hacer":"✅ O que posso fazer"}</button>
        <button onClick={()=>setTab("never")} style={{flex:1,padding:"9px 0",borderRadius:10,fontSize:11,fontWeight:700,cursor:"pointer",background:tab==="never"?"rgba(192,57,43,0.2)":"rgba(255,255,255,0.05)",border:`1.5px solid ${tab==="never"?C.red:"rgba(255,255,255,0.1)"}`,color:tab==="never"?C.red:C.muted}}>{lang==="fr"?"🚫 Ce que je ne dois jamais faire":lang==="en"?"🚫 What I must never do":lang==="es"?"🚫 Lo que nunca debo hacer":"🚫 O que nunca devo fazer"}</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {list.map((item,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,background:tab==="can"?"rgba(30,138,74,0.08)":"rgba(192,57,43,0.08)",border:`1px solid ${tab==="can"?C.green:C.red}33`}}>
            <span style={{fontSize:13}}>{tab==="can"?"✓":"✗"}</span>
            <div style={{fontSize:11,color:C.white,lineHeight:1.5}}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// NEVER ASSUME BOX
function NeverAssumeBox({ lang }) {
  const d = {
    fr:{title:"NE JAMAIS SUPPOSER QUE QUELQU'UN D'AUTRE L'A DÉJÀ SIGNALÉ",text:"Beaucoup d'accidents s'aggravent parce que plusieurs personnes pensent : 'Quelqu'un a certainement déjà prévenu.' En cas de doute, il vaut toujours mieux signaler une urgence une seconde fois que de ne jamais la signaler."},
    en:{title:"NEVER ASSUME SOMEONE ELSE HAS ALREADY REPORTED IT",text:"Many accidents worsen because several people think: 'Someone has surely already reported it.' In case of doubt, it is always better to report an emergency a second time than to never report it at all."},
    es:{title:"NUNCA SUPONGAS QUE ALGUIEN MÁS YA LO HA INFORMADO",text:"Muchos accidentes empeoran porque varias personas piensan: 'Seguro que alguien ya avisó.' Ante la duda, siempre es mejor informar una urgencia por segunda vez que no informarla nunca."},
    pt:{title:"NUNCA PRESSUPOR QUE ALGUÉM JÁ REPORTOU",text:"Muitos acidentes agravam-se porque várias pessoas pensam: 'Alguém certamente já avisou.' Em caso de dúvida, é sempre melhor reportar uma urgência uma segunda vez do que nunca a reportar."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{padding:"14px 16px",borderRadius:14,background:"linear-gradient(135deg,rgba(192,57,43,0.12),rgba(13,31,60,0.85))",border:`1.5px solid ${C.red}55`}}>
      <div style={{fontSize:12,color:C.red,fontWeight:700,marginBottom:8,fontFamily:"'Cinzel',serif",letterSpacing:1}}>⚠️ {c.title}</div>
      <div style={{fontSize:12,color:C.white,lineHeight:1.7}}>{c.text}</div>
    </div>
  );
}

// EXERCISE - BUILD YOUR REPORT (CHOOSE THE BEST MESSAGE)
function BuildReportExercise({ lang }) {
  const [sel, setSel] = useState(null);
  const [showC, setShowC] = useState(false);
  const d = {
    fr:{scenario:"Vous découvrez une petite fuite d'huile hydraulique sous une machine en salle des machines, pont inférieur bâbord. Aucune personne blessée, mais la flaque s'agrandit lentement.",
      options:[
        {id:"a",text:"'Il y a un problème en bas, il faudrait venir voir.'",correct:false,expl:"Aucune localisation précise, aucune nature du danger, aucune action déjà entreprise. Cette annonce ne permet aucune réponse efficace."},
        {id:"b",text:"'Fuite d'huile hydraulique, salle des machines pont inférieur bâbord, sous la machine principale. Personne blessée. La flaque s'agrandit lentement. Je surveille et je reste sur place.'",correct:true,expl:"WHAT (fuite d'huile), WHERE (localisation précise), WHO (personne blessée), RISK (la flaque s'agrandit), ACTION (je surveille et reste sur place) : les cinq éléments sont présents."},
        {id:"c",text:"'Urgence en salle des machines, quelqu'un doit intervenir immédiatement.'",correct:false,expl:"Aucune localisation précise, aucune nature exacte du danger, aucune indication sur la gravité réelle ni sur ce qui est déjà fait."},
      ]},
    en:{scenario:"You discover a small hydraulic oil leak under a machine in the engine room, lower deck port side. No one is injured, but the puddle is slowly growing.",
      options:[
        {id:"a",text:"'There's a problem downstairs, someone should come look.'",correct:false,expl:"No precise location, no nature of the danger, no action already taken. This announcement allows no effective response."},
        {id:"b",text:"'Hydraulic oil leak, engine room lower deck port side, under the main engine. No one injured. The puddle is slowly growing. I'm monitoring and staying on site.'",correct:true,expl:"WHAT (oil leak), WHERE (precise location), WHO (no one injured), RISK (puddle growing), ACTION (monitoring and staying): all five elements are present."},
        {id:"c",text:"'Emergency in the engine room, someone needs to intervene immediately.'",correct:false,expl:"No precise location, no exact nature of the danger, no indication of actual severity or of what's already being done."},
      ]},
    es:{scenario:"Descubres una pequeña fuga de aceite hidráulico bajo una máquina en la sala de máquinas, cubierta inferior a babor. Nadie está herido, pero el charco crece lentamente.",
      options:[
        {id:"a",text:"'Hay un problema abajo, alguien debería venir a ver.'",correct:false,expl:"Sin localización precisa, sin naturaleza del peligro, sin acción ya realizada. Este anuncio no permite ninguna respuesta eficaz."},
        {id:"b",text:"'Fuga de aceite hidráulico, sala de máquinas cubierta inferior a babor, bajo la máquina principal. Nadie herido. El charco crece lentamente. Estoy vigilando y me quedo en el lugar.'",correct:true,expl:"WHAT (fuga de aceite), WHERE (localización precisa), WHO (nadie herido), RISK (el charco crece), ACTION (vigilando y quedándose): los cinco elementos están presentes."},
        {id:"c",text:"'Urgencia en la sala de máquinas, alguien debe intervenir de inmediato.'",correct:false,expl:"Sin localización precisa, sin naturaleza exacta del peligro, sin indicación de la gravedad real ni de lo que ya se está haciendo."},
      ]},
    pt:{scenario:"Descobres uma pequena fuga de óleo hidráulico sob uma máquina na casa das máquinas, convés inferior bombordo. Ninguém ferido, mas a poça aumenta lentamente.",
      options:[
        {id:"a",text:"'Há um problema lá em baixo, alguém devia vir ver.'",correct:false,expl:"Sem localização precisa, sem natureza do perigo, sem ação já realizada. Este anúncio não permite nenhuma resposta eficaz."},
        {id:"b",text:"'Fuga de óleo hidráulico, casa das máquinas convés inferior bombordo, sob a máquina principal. Ninguém ferido. A poça aumenta lentamente. Estou a vigiar e fico no local.'",correct:true,expl:"WHAT (fuga de óleo), WHERE (localização precisa), WHO (ninguém ferido), RISK (a poça aumenta), ACTION (a vigiar e a ficar): os cinco elementos estão presentes."},
        {id:"c",text:"'Urgência na casa das máquinas, alguém tem de intervir de imediato.'",correct:false,expl:"Sem localização precisa, sem natureza exata do perigo, sem indicação da gravidade real nem do que já está a ser feito."},
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
              <div style={{fontSize:12,color:C.white,fontStyle:"italic",lineHeight:1.6}}>{opt.text}</div>
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

// EXERCISE - FIRST RESPONSE DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous découvrez une urgence mais n'êtes pas certain qu'elle a déjà été signalée. Que faites-vous ?\na) Ne rien dire, quelqu'un l'a probablement déjà fait\nb) Signaler quand même, mieux vaut un doublon qu'un oubli\nc) Attendre de voir si une alarme se déclenche"},
      {id:"q2",q:"Vous êtes le premier intervenant sur une situation dangereuse. Quel est votre rôle réel ?\na) Déclencher correctement la chaîne de secours, pas résoudre seul l'urgence\nb) Résoudre l'urgence par tous les moyens disponibles\nc) Attendre les équipes spécialisées sans rien faire"},
      {id:"q3",q:"Une situation dépasse clairement votre niveau de compétence. Que faites-vous ?\na) Improviser une intervention technique pour gagner du temps\nb) Tenter malgré tout, l'intention compte\nc) Sécuriser la zone, alerter, et attendre les spécialistes sans dépasser vos compétences"},
      {id:"q4",q:"Que signifie le principe 'The Quality of the Response Depends on the Quality of the First Report' ?\na) Le contenu d'une annonce d'urgence n'a pas vraiment d'importance\nb) La qualité de toute la réponse d'urgence dépend directement de la précision du premier signalement\nc) Ce principe ne concerne que les officiers de passerelle"},
    ],
    en:[
      {id:"q1",q:"You discover an emergency but aren't sure it has already been reported. What do you do?\na) Say nothing, someone has probably already done it\nb) Report it anyway, better a duplicate than a missed report\nc) Wait to see if an alarm sounds"},
      {id:"q2",q:"You are the first responder to a dangerous situation. What is your real role?\na) Correctly trigger the rescue chain, not solve the emergency alone\nb) Solve the emergency by any means available\nc) Wait for specialized teams without doing anything"},
      {id:"q3",q:"A situation clearly exceeds your skill level. What do you do?\na) Improvise a technical intervention to save time\nb) Attempt it anyway, intention matters\nc) Secure the area, alert, and wait for specialists without exceeding your competence"},
      {id:"q4",q:"What does the principle 'The Quality of the Response Depends on the Quality of the First Report' mean?\na) The content of an emergency announcement doesn't really matter\nb) The quality of the entire emergency response directly depends on the precision of the first report\nc) This principle only concerns bridge officers"},
    ],
    es:[
      {id:"q1",q:"Descubres una urgencia pero no estás seguro de que ya se haya informado. ¿Qué haces?\na) No decir nada, probablemente alguien ya lo hizo\nb) Informar de todos modos, mejor duplicar que olvidar\nc) Esperar a ver si suena una alarma"},
      {id:"q2",q:"Eres el primer interviniente ante una situación peligrosa. ¿Cuál es tu papel real?\na) Desencadenar correctamente la cadena de socorro, no resolver solo la urgencia\nb) Resolver la urgencia por cualquier medio disponible\nc) Esperar a los equipos especializados sin hacer nada"},
      {id:"q3",q:"Una situación supera claramente tu nivel de competencia. ¿Qué haces?\na) Improvisar una intervención técnica para ganar tiempo\nb) Intentarlo de todos modos, la intención cuenta\nc) Asegurar la zona, alertar, y esperar a los especialistas sin superar tus competencias"},
      {id:"q4",q:"¿Qué significa el principio 'The Quality of the Response Depends on the Quality of the First Report'?\na) El contenido de un aviso de urgencia realmente no importa\nb) La calidad de toda la respuesta de emergencia depende directamente de la precisión del primer aviso\nc) Este principio solo concierne a los oficiales de puente"},
    ],
    pt:[
      {id:"q1",q:"Descobres uma urgência mas não tens certeza de que já foi reportada. O que fazes?\na) Não dizer nada, provavelmente alguém já o fez\nb) Reportar mesmo assim, melhor duplicar do que esquecer\nc) Esperar para ver se um alarme dispara"},
      {id:"q2",q:"És o primeiro interveniente numa situação perigosa. Qual é o teu papel real?\na) Desencadear corretamente a cadeia de socorro, não resolver sozinho a urgência\nb) Resolver a urgência por qualquer meio disponível\nc) Esperar pelas equipas especializadas sem fazer nada"},
      {id:"q3",q:"Uma situação ultrapassa claramente o teu nível de competência. O que fazes?\na) Improvisar uma intervenção técnica para ganhar tempo\nb) Tentar mesmo assim, a intenção conta\nc) Assegurar a zona, alertar, e esperar pelos especialistas sem ultrapassar as tuas competências"},
      {id:"q4",q:"O que significa o princípio 'The Quality of the Response Depends on the Quality of the First Report'?\na) O conteúdo de um aviso de urgência não importa realmente\nb) A qualidade de toda a resposta de urgência depende diretamente da precisão do primeiro aviso\nc) Este princípio só diz respeito aos oficiais de passadiço"},
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

// ACCIDENT CASE - REAL DOCUMENTED CASE (EVER SMART / ALEXANDRA 1, MAIB)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Ever Smart / Alexandra 1",teaser:"Cas réel documenté (MAIB) - communication VHF incomplète et supposition erronée",
      what:"Au large de Jebel Ali, aux Émirats arabes unis, le pétrolier Alexandra 1 et le porte-conteneurs Ever Smart entrent en collision. Le commandant de l'Alexandra 1 se fonde sur une information VHF fragmentaire et suppose que l'Ever Smart va modifier sa route pour passer derrière son propre navire. Ce changement de cap n'a pas lieu. Constatant que l'Ever Smart ne dévie pas comme prévu, le commandant de l'Alexandra 1 choisit d'appeler le contrôle du port plutôt que de contacter directement l'autre navire, un choix qui fait perdre des secondes précieuses. De son côté, l'équipe de passerelle de l'Ever Smart ne surveille pas activement la position de l'Alexandra 1 et ne réalise sa proximité que quelques secondes avant la collision, alertée par le contrôle du port.",
      cause:"• Une information VHF fragmentaire a servi de base à une supposition non confirmée sur les intentions de l'autre navire\n• Le commandant de l'Alexandra 1 a contacté le contrôle du port plutôt que directement le navire concerné, perdant des secondes critiques\n• L'équipe de passerelle de l'Ever Smart n'a pas surveillé activement la position de l'autre navire\n• Aucune confirmation mutuelle claire des intentions respectives n'a été établie entre les deux navires",
      lessons:"✓ The Quality of the Response Depends on the Quality of the First Report : une information incomplète a conduit à une supposition erronée, avec des conséquences graves\n✓ Contacter le bon interlocuteur, directement et sans détour, peut faire gagner les secondes qui évitent un accident\n✓ Ne jamais supposer qu'une situation est comprise ou gérée par l'autre partie sans confirmation explicite\n✓ Ce cas illustre directement pourquoi la précision et la destination correcte d'un message comptent autant que son contenu",
      link:"🔗 Ce cas, documenté par le MAIB, reste une référence sur les conséquences d'une communication d'urgence incomplète et mal dirigée."},
    en:{title:"Case Study - Ever Smart / Alexandra 1",teaser:"Real documented case (MAIB) - incomplete VHF communication and a mistaken assumption",
      what:"Off Jebel Ali, United Arab Emirates, the tanker Alexandra 1 and the container ship Ever Smart collided. The master of Alexandra 1 relied on fragmentary VHF information and assumed Ever Smart would alter course to pass astern of his own ship. That course change never happened. Noticing that Ever Smart wasn't deviating as expected, the master of Alexandra 1 chose to call port control rather than contact the other ship directly, a choice that cost precious seconds. Meanwhile, Ever Smart's bridge team wasn't actively monitoring Alexandra 1's position and only realized the proximity seconds before the collision, alerted by port control.",
      cause:"• Fragmentary VHF information served as the basis for an unconfirmed assumption about the other ship's intentions\n• Alexandra 1's master contacted port control rather than the ship concerned directly, losing critical seconds\n• Ever Smart's bridge team did not actively monitor the other ship's position\n• No clear mutual confirmation of respective intentions was established between the two ships",
      lessons:"✓ The Quality of the Response Depends on the Quality of the First Report: incomplete information led to a mistaken assumption, with serious consequences\n✓ Contacting the right party, directly and without detour, can win the seconds that prevent an accident\n✓ Never assume a situation is understood or handled by the other party without explicit confirmation\n✓ This case directly illustrates why the precision and correct destination of a message matter as much as its content",
      link:"🔗 This MAIB-documented case remains a reference on the consequences of incomplete and poorly directed emergency communication."},
    es:{title:"Caso de estudio - Ever Smart / Alexandra 1",teaser:"Caso real documentado (MAIB) - comunicación VHF incompleta y una suposición equivocada",
      what:"Frente a Jebel Ali, Emiratos Árabes Unidos, el petrolero Alexandra 1 y el portacontenedores Ever Smart colisionaron. El capitán del Alexandra 1 se basó en información VHF fragmentaria y supuso que el Ever Smart cambiaría de rumbo para pasar por la popa de su propio buque. Ese cambio de rumbo nunca ocurrió. Al notar que el Ever Smart no se desviaba como esperaba, el capitán del Alexandra 1 optó por llamar al control del puerto en lugar de contactar directamente con el otro buque, una elección que costó segundos preciosos. Mientras tanto, el equipo de puente del Ever Smart no vigilaba activamente la posición del Alexandra 1 y solo se dio cuenta de la proximidad segundos antes de la colisión, alertado por el control del puerto.",
      cause:"• Una información VHF fragmentaria sirvió de base para una suposición no confirmada sobre las intenciones del otro buque\n• El capitán del Alexandra 1 contactó al control del puerto en lugar de al buque implicado directamente, perdiendo segundos críticos\n• El equipo de puente del Ever Smart no vigiló activamente la posición del otro buque\n• No se estableció ninguna confirmación mutua clara de las intenciones respectivas entre los dos buques",
      lessons:"✓ The Quality of the Response Depends on the Quality of the First Report: una información incompleta condujo a una suposición equivocada, con graves consecuencias\n✓ Contactar con el interlocutor correcto, directamente y sin rodeos, puede ganar los segundos que evitan un accidente\n✓ Nunca suponer que una situación es comprendida o gestionada por la otra parte sin confirmación explícita\n✓ Este caso ilustra directamente por qué la precisión y el destino correcto de un mensaje importan tanto como su contenido",
      link:"🔗 Este caso, documentado por el MAIB, sigue siendo una referencia sobre las consecuencias de una comunicación de emergencia incompleta y mal dirigida."},
    pt:{title:"Caso de estudo - Ever Smart / Alexandra 1",teaser:"Caso real documentado (MAIB) - comunicação VHF incompleta e uma suposição errada",
      what:"Ao largo de Jebel Ali, Emirados Árabes Unidos, o petroleiro Alexandra 1 e o porta-contentores Ever Smart colidiram. O comandante do Alexandra 1 baseou-se em informação VHF fragmentária e presumiu que o Ever Smart mudaria de rumo para passar pela popa do seu próprio navio. Essa mudança de rumo nunca aconteceu. Ao notar que o Ever Smart não se estava a desviar como esperado, o comandante do Alexandra 1 optou por chamar o controlo do porto em vez de contactar diretamente o outro navio, uma escolha que custou segundos preciosos. Entretanto, a equipa de passadiço do Ever Smart não vigiava ativamente a posição do Alexandra 1 e só percebeu a proximidade segundos antes da colisão, alertada pelo controlo do porto.",
      cause:"• Uma informação VHF fragmentária serviu de base a uma suposição não confirmada sobre as intenções do outro navio\n• O comandante do Alexandra 1 contactou o controlo do porto em vez de diretamente o navio em causa, perdendo segundos críticos\n• A equipa de passadiço do Ever Smart não vigiou ativamente a posição do outro navio\n• Não foi estabelecida nenhuma confirmação mútua clara das intenções respetivas entre os dois navios",
      lessons:"✓ The Quality of the Response Depends on the Quality of the First Report: uma informação incompleta levou a uma suposição errada, com consequências graves\n✓ Contactar o interlocutor certo, diretamente e sem rodeios, pode ganhar os segundos que evitam um acidente\n✓ Nunca presumir que uma situação é compreendida ou gerida pela outra parte sem confirmação explícita\n✓ Este caso ilustra diretamente por que a precisão e o destino correto de uma mensagem importam tanto como o seu conteúdo",
      link:"🔗 Este caso, documentado pelo MAIB, continua a ser uma referência sobre as consequências de uma comunicação de urgência incompleta e mal dirigida."},
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
    {q:"Que signifie le principe 'The Quality of the Response Depends on the Quality of the First Report' ?",opts:["Le contenu d'une annonce n'a pas vraiment d'importance","La qualité de toute la réponse d'urgence dépend directement de la précision du premier signalement","Ce principe ne concerne que les officiers","Il ne faut jamais annoncer une urgence rapidement"],correct:1,expl:"Une annonce vague compromet toute la chaîne de réponse qui suit."},
    {q:"Quelle est la mission exacte de cette leçon ?",opts:["Apprendre à résoudre seul une urgence","Répondre à la question : comment transformer une découverte individuelle en une réponse d'urgence collective","Enseigner les procédures de chaque type d'urgence","Présenter l'historique des communications maritimes"],correct:1,expl:"Le premier intervenant n'est pas celui qui résout l'urgence, il est celui qui déclenche correctement toute la chaîne de secours."},
    {q:"Que signifie WHAT dans la méthode d'annonce d'urgence ?",opts:["L'heure exacte de l'incident","Nommer précisément la nature de l'urgence, jamais une description vague","Le nom de la personne qui signale","Aucune information particulière"],correct:1,expl:"WHAT établit la nature exacte de ce qui se passe, base de toute la suite de l'annonce."},
    {q:"Que signifie WHERE dans cette méthode ?",opts:["Où se trouve le commandant","La localisation précise pour orienter l'intervention sans perte de temps","Le nom du navire uniquement","Cette information n'est jamais nécessaire"],correct:1,expl:"Une localisation précise permet d'orienter directement les secours vers le bon endroit."},
    {q:"Que signifie WHO dans cette méthode ?",opts:["Qui a découvert l'urgence en premier","Les personnes concernées, blessées, présentes ou en danger immédiat","Le nom du commandant uniquement","Cette information est secondaire"],correct:1,expl:"WHO permet de mobiliser l'aide adaptée aux personnes réellement concernées."},
    {q:"Que signifie RISK dans cette méthode ?",opts:["Le risque financier pour la compagnie","Le danger immédiat qui menace de s'aggraver","Un élément optionnel de l'annonce","Uniquement pertinent pour les incendies"],correct:1,expl:"RISK permet à la passerelle de comprendre la véritable urgence de la situation."},
    {q:"Que signifie ACTION dans cette méthode ?",opts:["Ce que la passerelle doit faire immédiatement","Ce que le premier intervenant fait déjà, pour éviter les doublons et guider la suite","Une étape facultative de l'annonce","Uniquement l'heure de l'action prévue"],correct:1,expl:"Préciser l'action en cours évite les doublons et guide la réponse suivante."},
    {q:"Quelle est la logique de la chaîne de communication d'urgence ?",opts:["Chaque personne peut agir isolément sans en informer personne","Premier intervenant → officier de quart → passerelle → commandant → équipes spécialisées → secours extérieurs si nécessaire","Uniquement le commandant peut recevoir une alerte","La chaîne ne concerne que les grandes urgences"],correct:1,expl:"Chaque information transmise déclenche une nouvelle étape de cette chaîne."},
    {q:"Quelles sont les trois priorités pour sécuriser une zone d'urgence ?",opts:["Uniquement protéger le navire","Protéger les personnes, empêcher l'aggravation, préserver la zone pour une intervention efficace","Uniquement empêcher l'accès du public","Ces priorités ne s'appliquent qu'aux grandes urgences"],correct:1,expl:"Le premier intervenant ne doit jamais créer une seconde urgence en négligeant ces trois priorités."},
    {q:"Que ne doit jamais faire un premier intervenant, selon cette leçon ?",opts:["Écarter les personnes du danger immédiat","Improviser une intervention technique hors de sa formation","Signaler l'évolution de la situation","Guider les équipes spécialisées à leur arrivée"],correct:1,expl:"Dépasser son niveau de compétence peut transformer un sauveteur en victime supplémentaire."},
    {q:"Que signifie l'encadré 'Never Assume Someone Else Has Already Reported It' ?",opts:["Il ne faut jamais signaler une urgence deux fois","En cas de doute, mieux vaut signaler une seconde fois que ne jamais signaler","Cette règle ne concerne que les officiers","Il faut toujours attendre la confirmation d'un collègue avant de signaler"],correct:1,expl:"Beaucoup d'accidents s'aggravent parce que plusieurs personnes pensent que quelqu'un d'autre a déjà prévenu."},
    {q:"Dans l'exercice de construction d'annonce, pourquoi le message vague est-il incorrect ?",opts:["Il est trop long","Il ne contient aucune localisation précise, aucune nature du danger, aucune action déjà entreprise","Il contient trop de détails inutiles","Il n'y a aucun problème avec ce message"],correct:1,expl:"Une annonce vague ne permet aucune réponse efficace, quelle que soit l'urgence réelle."},
    {q:"Dans le cas Ever Smart / Alexandra 1, quelle décision a fait perdre des secondes critiques ?",opts:["Appeler directement l'autre navire","Appeler le contrôle du port plutôt que directement le navire concerné","Ne rien faire du tout","Attendre les instructions du commandant"],correct:1,expl:"Contacter le bon interlocuteur directement aurait pu faire gagner ces secondes critiques."},
    {q:"Que confirme le cas Ever Smart / Alexandra 1 sur les suppositions non confirmées ?",opts:["Elles sont toujours sans conséquence","Une information fragmentaire ayant servi de base à une supposition non confirmée a contribué directement à la collision","Elles ne concernent que les erreurs de navigation mineures","Elles n'ont aucun lien avec la communication d'urgence"],correct:1,expl:"Ce cas illustre directement pourquoi ne jamais supposer qu'une situation est comprise sans confirmation explicite."},
    {q:"Ce module enseigne-t-il un substitut à une formation certifiée aux premiers secours ou aux procédures d'urgence de la compagnie ?",opts:["Oui, il équivaut à une certification complète","Non, il enseigne des principes de communication et de décision, jamais un substitut à une formation certifiée","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne les principes de communication, jamais un remplacement de la formation certifiée."},
  ],
  en:[
    {q:"What does the principle 'The Quality of the Response Depends on the Quality of the First Report' mean?",opts:["The content of an announcement doesn't really matter","The quality of the entire emergency response directly depends on the precision of the first report","This principle only concerns officers","You should never announce an emergency quickly"],correct:1,expl:"A vague announcement compromises the entire response chain that follows."},
    {q:"What is the exact mission of this lesson?",opts:["Learn to solve an emergency alone","Answer the question: how to turn an individual discovery into a collective emergency response","Teach the procedures for every type of emergency","Present the history of maritime communications"],correct:1,expl:"The first responder doesn't solve the emergency, they correctly trigger the whole rescue chain."},
    {q:"What does WHAT mean in the emergency announcement method?",opts:["The exact time of the incident","Precisely naming the nature of the emergency, never a vague description","The name of the person reporting","No particular information"],correct:1,expl:"WHAT establishes the exact nature of what's happening, the basis of the rest of the report."},
    {q:"What does WHERE mean in this method?",opts:["Where the captain is located","The precise location to direct the intervention without wasting time","Only the ship's name","This information is never necessary"],correct:1,expl:"A precise location allows help to be directed straight to the right place."},
    {q:"What does WHO mean in this method?",opts:["Who discovered the emergency first","The people concerned, injured, present, or in immediate danger","Only the captain's name","This information is secondary"],correct:1,expl:"WHO allows mobilizing the help suited to the people actually concerned."},
    {q:"What does RISK mean in this method?",opts:["The financial risk for the company","The immediate danger threatening to worsen","An optional element of the report","Only relevant for fires"],correct:1,expl:"RISK allows the bridge to understand the real urgency of the situation."},
    {q:"What does ACTION mean in this method?",opts:["What the bridge must do immediately","What the first responder is already doing, to avoid duplication and guide what follows","An optional step of the report","Only the time of the planned action"],correct:1,expl:"Specifying the ongoing action avoids duplication and guides the following response."},
    {q:"What is the logic of the emergency communication chain?",opts:["Each person can act in isolation without informing anyone","First responder → officer of the watch → bridge → captain → specialized teams → outside rescue if necessary","Only the captain can receive an alert","The chain only concerns major emergencies"],correct:1,expl:"Each piece of information transmitted triggers a new step in this chain."},
    {q:"What are the three priorities for securing an emergency scene?",opts:["Only protecting the ship","Protecting people, preventing worsening, preserving the scene for effective intervention","Only preventing public access","These priorities only apply to major emergencies"],correct:1,expl:"The first responder must never create a second emergency by neglecting these three priorities."},
    {q:"What must a first responder never do, according to this lesson?",opts:["Move people away from immediate danger","Improvise a technical intervention beyond their training","Report how the situation evolves","Guide specialized teams upon their arrival"],correct:1,expl:"Exceeding one's skill level can turn a rescuer into an additional victim."},
    {q:"What does the 'Never Assume Someone Else Has Already Reported It' box mean?",opts:["You should never report an emergency twice","In case of doubt, it's better to report a second time than to never report it","This rule only concerns officers","You should always wait for a colleague's confirmation before reporting"],correct:1,expl:"Many accidents worsen because several people think someone else has already alerted."},
    {q:"In the report-building exercise, why is the vague message incorrect?",opts:["It's too long","It contains no precise location, no nature of the danger, no action already taken","It contains too many unnecessary details","There is no problem with this message"],correct:1,expl:"A vague announcement allows no effective response, whatever the real emergency."},
    {q:"In the Ever Smart / Alexandra 1 case, what decision cost critical seconds?",opts:["Calling the other ship directly","Calling port control rather than the ship concerned directly","Doing nothing at all","Waiting for the captain's instructions"],correct:1,expl:"Contacting the right party directly could have won those critical seconds."},
    {q:"What does the Ever Smart / Alexandra 1 case confirm about unconfirmed assumptions?",opts:["They are always without consequence","Fragmentary information used as the basis for an unconfirmed assumption directly contributed to the collision","They only concern minor navigation errors","They have no link with emergency communication"],correct:1,expl:"This case directly illustrates why one should never assume a situation is understood without explicit confirmation."},
    {q:"Does this module teach a replacement for certified first aid or company emergency procedure training?",opts:["Yes, it is equivalent to a full certification","No, it teaches communication and decision principles, never a replacement for certified training","Yes, but only for officers","No, it is useless without equipment"],correct:1,expl:"MAP teaches communication principles, never a replacement for certified training."},
  ],
  es:[
    {q:"¿Qué significa el principio 'The Quality of the Response Depends on the Quality of the First Report'?",opts:["El contenido de un aviso realmente no importa","La calidad de toda la respuesta de emergencia depende directamente de la precisión del primer aviso","Este principio solo concierne a los oficiales","Nunca hay que anunciar una urgencia rápidamente"],correct:1,expl:"Un aviso vago compromete toda la cadena de respuesta que sigue."},
    {q:"¿Cuál es la misión exacta de esta lección?",opts:["Aprender a resolver solo una urgencia","Responder a la pregunta: cómo transformar un descubrimiento individual en una respuesta de emergencia colectiva","Enseñar los procedimientos de cada tipo de urgencia","Presentar la historia de las comunicaciones marítimas"],correct:1,expl:"El primer interviniente no resuelve la urgencia, desencadena correctamente toda la cadena de socorro."},
    {q:"¿Qué significa WHAT en el método de aviso de urgencia?",opts:["La hora exacta del incidente","Nombrar con precisión la naturaleza de la urgencia, nunca una descripción vaga","El nombre de la persona que informa","Ninguna información particular"],correct:1,expl:"WHAT establece la naturaleza exacta de lo que está pasando, base de todo el resto del aviso."},
    {q:"¿Qué significa WHERE en este método?",opts:["Dónde está el capitán","La localización precisa para orientar la intervención sin perder tiempo","Solo el nombre del buque","Esta información nunca es necesaria"],correct:1,expl:"Una localización precisa permite dirigir el socorro directamente al lugar correcto."},
    {q:"¿Qué significa WHO en este método?",opts:["Quién descubrió la urgencia primero","Las personas implicadas, heridas, presentes o en peligro inmediato","Solo el nombre del capitán","Esta información es secundaria"],correct:1,expl:"WHO permite movilizar la ayuda adecuada a las personas realmente implicadas."},
    {q:"¿Qué significa RISK en este método?",opts:["El riesgo financiero para la compañía","El peligro inmediato que amenaza con empeorar","Un elemento opcional del aviso","Solo pertinente para los incendios"],correct:1,expl:"RISK permite al puente comprender la verdadera urgencia de la situación."},
    {q:"¿Qué significa ACTION en este método?",opts:["Lo que el puente debe hacer de inmediato","Lo que el primer interviniente ya está haciendo, para evitar duplicaciones y guiar lo que sigue","Una etapa facultativa del aviso","Solo la hora de la acción prevista"],correct:1,expl:"Precisar la acción en curso evita duplicaciones y guía la respuesta siguiente."},
    {q:"¿Cuál es la lógica de la cadena de comunicación de emergencia?",opts:["Cada persona puede actuar aisladamente sin informar a nadie","Primer interviniente → oficial de guardia → puente → capitán → equipos especializados → socorro exterior si es necesario","Solo el capitán puede recibir una alerta","La cadena solo concierne a las grandes urgencias"],correct:1,expl:"Cada información transmitida desencadena una nueva etapa de esta cadena."},
    {q:"¿Cuáles son las tres prioridades para asegurar una zona de urgencia?",opts:["Solo proteger el buque","Proteger a las personas, impedir el agravamiento, preservar la zona para una intervención eficaz","Solo impedir el acceso del público","Estas prioridades solo se aplican a las grandes urgencias"],correct:1,expl:"El primer interviniente nunca debe crear una segunda urgencia descuidando estas tres prioridades."},
    {q:"¿Qué nunca debe hacer un primer interviniente, según esta lección?",opts:["Alejar a las personas del peligro inmediato","Improvisar una intervención técnica fuera de su formación","Informar de la evolución de la situación","Guiar a los equipos especializados a su llegada"],correct:1,expl:"Superar su nivel de competencia puede convertir a un rescatador en una víctima adicional."},
    {q:"¿Qué significa el recuadro 'Never Assume Someone Else Has Already Reported It'?",opts:["Nunca hay que informar una urgencia dos veces","Ante la duda, es mejor informar una segunda vez que no informarla nunca","Esta regla solo concierne a los oficiales","Siempre hay que esperar la confirmación de un compañero antes de informar"],correct:1,expl:"Muchos accidentes empeoran porque varias personas piensan que alguien más ya avisó."},
    {q:"En el ejercicio de construcción de aviso, ¿por qué es incorrecto el mensaje vago?",opts:["Es demasiado largo","No contiene ninguna localización precisa, ninguna naturaleza del peligro, ninguna acción ya realizada","Contiene demasiados detalles innecesarios","No hay ningún problema con este mensaje"],correct:1,expl:"Un aviso vago no permite ninguna respuesta eficaz, sea cual sea la urgencia real."},
    {q:"En el caso Ever Smart / Alexandra 1, ¿qué decisión hizo perder segundos críticos?",opts:["Llamar directamente al otro buque","Llamar al control del puerto en lugar de al buque implicado directamente","No hacer nada en absoluto","Esperar las instrucciones del capitán"],correct:1,expl:"Contactar directamente con el interlocutor correcto podría haber ganado esos segundos críticos."},
    {q:"¿Qué confirma el caso Ever Smart / Alexandra 1 sobre las suposiciones no confirmadas?",opts:["Siempre son sin consecuencia","Una información fragmentaria usada como base de una suposición no confirmada contribuyó directamente a la colisión","Solo conciernen a errores menores de navegación","No tienen ninguna relación con la comunicación de emergencia"],correct:1,expl:"Este caso ilustra directamente por qué nunca hay que suponer que una situación se comprende sin confirmación explícita."},
    {q:"¿Este módulo enseña un sustituto de una formación certificada en primeros auxilios o procedimientos de emergencia de la compañía?",opts:["Sí, equivale a una certificación completa","No, enseña principios de comunicación y decisión, nunca un sustituto de una formación certificada","Sí, pero solo para oficiales","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña principios de comunicación, nunca un sustituto de la formación certificada."},
  ],
  pt:[
    {q:"O que significa o princípio 'The Quality of the Response Depends on the Quality of the First Report'?",opts:["O conteúdo de um aviso não importa realmente","A qualidade de toda a resposta de urgência depende diretamente da precisão do primeiro aviso","Este princípio só diz respeito aos oficiais","Nunca se deve anunciar uma urgência rapidamente"],correct:1,expl:"Um aviso vago compromete toda a cadeia de resposta que se segue."},
    {q:"Qual é a missão exata desta lição?",opts:["Aprender a resolver sozinho uma urgência","Responder à pergunta: como transformar uma descoberta individual numa resposta de urgência coletiva","Ensinar os procedimentos de cada tipo de urgência","Apresentar a história das comunicações marítimas"],correct:1,expl:"O primeiro interveniente não resolve a urgência, desencadeia corretamente toda a cadeia de socorro."},
    {q:"O que significa WHAT no método de aviso de urgência?",opts:["A hora exata do incidente","Nomear com precisão a natureza da urgência, nunca uma descrição vaga","O nome da pessoa que reporta","Nenhuma informação particular"],correct:1,expl:"WHAT estabelece a natureza exata do que está a acontecer, base de todo o resto do aviso."},
    {q:"O que significa WHERE neste método?",opts:["Onde está o comandante","A localização precisa para orientar a intervenção sem perder tempo","Só o nome do navio","Esta informação nunca é necessária"],correct:1,expl:"Uma localização precisa permite orientar o socorro diretamente para o local certo."},
    {q:"O que significa WHO neste método?",opts:["Quem descobriu a urgência primeiro","As pessoas envolvidas, feridas, presentes ou em perigo imediato","Só o nome do comandante","Esta informação é secundária"],correct:1,expl:"WHO permite mobilizar a ajuda adequada às pessoas realmente envolvidas."},
    {q:"O que significa RISK neste método?",opts:["O risco financeiro para a companhia","O perigo imediato que ameaça agravar-se","Um elemento opcional do aviso","Só pertinente para incêndios"],correct:1,expl:"RISK permite ao passadiço compreender a verdadeira urgência da situação."},
    {q:"O que significa ACTION neste método?",opts:["O que o passadiço deve fazer de imediato","O que o primeiro interveniente já está a fazer, para evitar duplicações e orientar o que se segue","Uma etapa facultativa do aviso","Só a hora da ação prevista"],correct:1,expl:"Precisar a ação em curso evita duplicações e orienta a resposta seguinte."},
    {q:"Qual é a lógica da cadeia de comunicação de urgência?",opts:["Cada pessoa pode agir isoladamente sem informar ninguém","Primeiro interveniente → oficial de quarto → passadiço → comandante → equipas especializadas → socorro exterior se necessário","Só o comandante pode receber um alerta","A cadeia só diz respeito a grandes urgências"],correct:1,expl:"Cada informação transmitida desencadeia uma nova etapa desta cadeia."},
    {q:"Quais são as três prioridades para assegurar uma zona de urgência?",opts:["Só proteger o navio","Proteger as pessoas, impedir o agravamento, preservar a zona para uma intervenção eficaz","Só impedir o acesso do público","Estas prioridades só se aplicam a grandes urgências"],correct:1,expl:"O primeiro interveniente nunca deve criar uma segunda urgência negligenciando estas três prioridades."},
    {q:"O que nunca deve fazer um primeiro interveniente, segundo esta lição?",opts:["Afastar as pessoas do perigo imediato","Improvisar uma intervenção técnica fora da sua formação","Reportar a evolução da situação","Guiar as equipas especializadas na sua chegada"],correct:1,expl:"Ultrapassar o seu nível de competência pode transformar um socorrista numa vítima adicional."},
    {q:"O que significa o quadro 'Never Assume Someone Else Has Already Reported It'?",opts:["Nunca se deve reportar uma urgência duas vezes","Em caso de dúvida, é melhor reportar uma segunda vez do que nunca a reportar","Esta regra só diz respeito aos oficiais","Deve-se sempre esperar pela confirmação de um colega antes de reportar"],correct:1,expl:"Muitos acidentes agravam-se porque várias pessoas pensam que outra pessoa já avisou."},
    {q:"No exercício de construção de aviso, por que a mensagem vaga está incorreta?",opts:["É demasiado longa","Não contém nenhuma localização precisa, nenhuma natureza do perigo, nenhuma ação já realizada","Contém demasiados detalhes desnecessários","Não há nenhum problema com esta mensagem"],correct:1,expl:"Um aviso vago não permite nenhuma resposta eficaz, seja qual for a urgência real."},
    {q:"No caso Ever Smart / Alexandra 1, que decisão fez perder segundos críticos?",opts:["Chamar diretamente o outro navio","Chamar o controlo do porto em vez de diretamente o navio em causa","Não fazer nada de todo","Esperar pelas instruções do comandante"],correct:1,expl:"Contactar diretamente o interlocutor certo poderia ter ganho esses segundos críticos."},
    {q:"O que confirma o caso Ever Smart / Alexandra 1 sobre as suposições não confirmadas?",opts:["São sempre sem consequência","Uma informação fragmentária usada como base de uma suposição não confirmada contribuiu diretamente para a colisão","Só dizem respeito a erros menores de navegação","Não têm nenhuma relação com a comunicação de urgência"],correct:1,expl:"Este caso ilustra diretamente por que nunca se deve presumir que uma situação é compreendida sem confirmação explícita."},
    {q:"Este módulo ensina um substituto de uma formação certificada em primeiros socorros ou procedimentos de urgência da companhia?",opts:["Sim, equivale a uma certificação completa","Não, ensina princípios de comunicação e decisão, nunca um substituto de uma formação certificada","Sim, mas só para oficiais","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina princípios de comunicação, nunca um substituto da formação certificada."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'The Quality of the Response Depends on the Quality of the First Report' ?",opts:["Le contenu d'une annonce n'a pas d'importance","La qualité de la réponse dépend directement de la précision du premier signalement","Cela ne concerne que les officiers","Il ne faut jamais annoncer rapidement"],correct:1,expl:"Une annonce vague compromet toute la chaîne de réponse."},
    {q:"Quels sont les cinq éléments de la méthode d'annonce d'urgence ?",opts:["Uniquement le nom et l'heure","WHAT, WHERE, WHO, RISK, ACTION","Uniquement WHAT et WHERE","Il n'existe pas de méthode structurée"],correct:1,expl:"Ces cinq éléments structurent une annonce complète et exploitable."},
    {q:"Quelles sont les trois priorités pour sécuriser une zone d'urgence ?",opts:["Uniquement protéger le navire","Protéger les personnes, empêcher l'aggravation, préserver la zone","Uniquement empêcher l'accès du public","Ces priorités ne s'appliquent qu'aux grandes urgences"],correct:1,expl:"Le premier intervenant ne doit jamais créer une seconde urgence."},
    {q:"Que signifie 'Never Assume Someone Else Has Already Reported It' ?",opts:["Il ne faut jamais signaler deux fois","Mieux vaut signaler une seconde fois que ne jamais signaler","Cela ne concerne que les officiers","Il faut attendre confirmation avant de signaler"],correct:1,expl:"Beaucoup d'accidents s'aggravent à cause de cette fausse supposition."},
    {q:"Dans le cas Ever Smart / Alexandra 1, quelle décision a coûté des secondes critiques ?",opts:["Appeler directement l'autre navire","Appeler le contrôle du port plutôt que le navire concerné","Ne rien faire","Attendre les instructions"],correct:1,expl:"Contacter le bon interlocuteur directement aurait pu éviter la collision."},
  ],
  en:[
    {q:"What does 'The Quality of the Response Depends on the Quality of the First Report' mean?",opts:["The content of an announcement doesn't matter","The quality of the response directly depends on the precision of the first report","It only concerns officers","You should never announce quickly"],correct:1,expl:"A vague announcement compromises the entire response chain."},
    {q:"What are the five elements of the emergency announcement method?",opts:["Only name and time","WHAT, WHERE, WHO, RISK, ACTION","Only WHAT and WHERE","There is no structured method"],correct:1,expl:"These five elements structure a complete, usable report."},
    {q:"What are the three priorities for securing an emergency scene?",opts:["Only protecting the ship","Protecting people, preventing worsening, preserving the scene","Only preventing public access","These priorities only apply to major emergencies"],correct:1,expl:"The first responder must never create a second emergency."},
    {q:"What does 'Never Assume Someone Else Has Already Reported It' mean?",opts:["You should never report twice","It's better to report a second time than never report","It only concerns officers","You must wait for confirmation before reporting"],correct:1,expl:"Many accidents worsen because of this false assumption."},
    {q:"In the Ever Smart / Alexandra 1 case, what decision cost critical seconds?",opts:["Calling the other ship directly","Calling port control rather than the ship concerned","Doing nothing","Waiting for instructions"],correct:1,expl:"Contacting the right party directly could have prevented the collision."},
  ],
  es:[
    {q:"¿Qué significa 'The Quality of the Response Depends on the Quality of the First Report'?",opts:["El contenido de un aviso no importa","La calidad de la respuesta depende directamente de la precisión del primer aviso","Solo concierne a los oficiales","Nunca hay que anunciar rápido"],correct:1,expl:"Un aviso vago compromete toda la cadena de respuesta."},
    {q:"¿Cuáles son los cinco elementos del método de aviso de urgencia?",opts:["Solo nombre y hora","WHAT, WHERE, WHO, RISK, ACTION","Solo WHAT y WHERE","No existe un método estructurado"],correct:1,expl:"Estos cinco elementos estructuran un aviso completo y utilizable."},
    {q:"¿Cuáles son las tres prioridades para asegurar una zona de urgencia?",opts:["Solo proteger el buque","Proteger a las personas, impedir el agravamiento, preservar la zona","Solo impedir el acceso del público","Estas prioridades solo se aplican a grandes urgencias"],correct:1,expl:"El primer interviniente nunca debe crear una segunda urgencia."},
    {q:"¿Qué significa 'Never Assume Someone Else Has Already Reported It'?",opts:["Nunca hay que informar dos veces","Es mejor informar una segunda vez que no informar nunca","Solo concierne a los oficiales","Hay que esperar confirmación antes de informar"],correct:1,expl:"Muchos accidentes empeoran por esta falsa suposición."},
    {q:"En el caso Ever Smart / Alexandra 1, ¿qué decisión costó segundos críticos?",opts:["Llamar directamente al otro buque","Llamar al control del puerto en lugar del buque implicado","No hacer nada","Esperar instrucciones"],correct:1,expl:"Contactar directamente con el interlocutor correcto podría haber evitado la colisión."},
  ],
  pt:[
    {q:"O que significa 'The Quality of the Response Depends on the Quality of the First Report'?",opts:["O conteúdo de um aviso não importa","A qualidade da resposta depende diretamente da precisão do primeiro aviso","Só diz respeito aos oficiais","Nunca se deve anunciar rapidamente"],correct:1,expl:"Um aviso vago compromete toda a cadeia de resposta."},
    {q:"Quais são os cinco elementos do método de aviso de urgência?",opts:["Só nome e hora","WHAT, WHERE, WHO, RISK, ACTION","Só WHAT e WHERE","Não existe um método estruturado"],correct:1,expl:"Estes cinco elementos estruturam um aviso completo e utilizável."},
    {q:"Quais são as três prioridades para assegurar uma zona de urgência?",opts:["Só proteger o navio","Proteger as pessoas, impedir o agravamento, preservar a zona","Só impedir o acesso do público","Estas prioridades só se aplicam a grandes urgências"],correct:1,expl:"O primeiro interveniente nunca deve criar uma segunda urgência."},
    {q:"O que significa 'Never Assume Someone Else Has Already Reported It'?",opts:["Nunca se deve reportar duas vezes","É melhor reportar uma segunda vez do que nunca reportar","Só diz respeito aos oficiais","Deve-se esperar confirmação antes de reportar"],correct:1,expl:"Muitos acidentes agravam-se por causa desta falsa suposição."},
    {q:"No caso Ever Smart / Alexandra 1, que decisão custou segundos críticos?",opts:["Chamar diretamente o outro navio","Chamar o controlo do porto em vez do navio em causa","Não fazer nada","Esperar instruções"],correct:1,expl:"Contactar diretamente o interlocutor certo poderia ter evitado a colisão."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si tu devais annoncer une urgence maintenant, saurais-tu construire ton message avec les cinq elements WHAT-WHERE-WHO-RISK-ACTION sans hesiter ?",
    en:"If you had to announce an emergency right now, would you be able to build your message with the five elements WHAT-WHERE-WHO-RISK-ACTION without hesitating?",
    es:"Si tuvieras que anunciar una urgencia ahora mismo, ¿sabrias construir tu mensaje con los cinco elementos WHAT-WHERE-WHO-RISK-ACTION sin dudar?",
    pt:"Se tivesses de anunciar uma urgencia agora, saberias construir a tua mensagem com os cinco elementos WHAT-WHERE-WHO-RISK-ACTION sem hesitar?",
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
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Leçon 4/6 · ⭐ Premium",
      title:"Emergency Reporting & Initial Response",
      intro:"Cette leçon ne traite pas de la communication en général. Elle répond à une seule question : comment transformer une découverte individuelle en une réponse d'urgence collective ? Le premier intervenant ne résout pas l'urgence, il déclenche correctement toute la chaîne de secours.",
      p0:"THE QUALITY OF THE RESPONSE DEPENDS ON THE QUALITY OF THE FIRST REPORT.",s0t:"Le principe qui structure toute la leçon",
      s0:"Une urgence mal annoncée devient souvent une urgence plus grave. Le premier intervenant n'est pas seulement celui qui découvre le problème : il est celui qui donne aux équipes les moyens d'intervenir rapidement, correctement et en toute sécurité.\n\nCOMMENT LE RECONNAÎTRE ? Une situation nécessitant une alerte immédiate, quelle que soit sa gravité apparente.\nQUE FAIRE IMMÉDIATEMENT ? Annoncer selon la méthode structurée, sécuriser la zone, ne jamais dépasser ses compétences.\nQUELLE ERREUR L'AGGRAVE ? Une annonce vague, ou supposer que quelqu'un d'autre a déjà signalé.\nQUAND DEMANDER DE L'AIDE ? Dès la découverte, sans attendre d'avoir toutes les réponses.",
      p1:"REPORTING AN EMERGENCY",s1t:"WHAT → WHERE → WHO → RISK → ACTION",
      s1:"Une méthode simple et mémorisable, même sous le stress d'une urgence : nature de l'urgence, localisation exacte, personnes concernées, danger immédiat, actions déjà entreprises.",
      p2:"EMERGENCY COMMUNICATION CHAIN",s2t:"Chaque information déclenche une nouvelle étape",
      s2:"Premier intervenant → officier de quart → passerelle → commandant → équipes spécialisées → secours extérieurs si nécessaire. Comprendre cette logique d'escalade, pas seulement les moyens de communication.",
      p3:"SECURING THE SCENE",s3t:"Trois priorités",
      s3:"Protéger les personnes, empêcher l'aggravation, préserver la zone pour une intervention efficace. Le premier intervenant ne doit jamais créer une seconde urgence.",
      p4:"SAFE INITIAL RESPONSE",s4t:"Ce que je peux faire, ce que je ne dois jamais faire",
      s4:"Ne jamais improviser une intervention technique, ne jamais dépasser son niveau de compétence, attendre les spécialistes lorsque le risque dépasse ses capacités.",
      p5:"⚠️ NE JAMAIS SUPPOSER",p6:"🎯 CONSTRUISEZ VOTRE ANNONCE",p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"⚠️ CAS D'ÉTUDE",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 4",
      sumP:["The Quality of the Response Depends on the Quality of the First Report","WHAT, WHERE, WHO, RISK, ACTION : les cinq éléments d'une annonce complète","La chaîne d'escalade : chaque information déclenche une nouvelle étape","Trois priorités pour sécuriser une zone : personnes, aggravation, préservation","Ne jamais supposer que quelqu'un d'autre a déjà signalé"],
      learnedP:["La méthode structurée d'annonce d'urgence","La logique d'escalade de la chaîne de communication","Les trois priorités pour sécuriser une zone","La frontière entre ce que je peux faire et ce que je ne dois jamais faire","Pourquoi ne jamais supposer qu'une urgence a déjà été signalée"],
      transition:"Good emergency reporting limits the consequences of an accident. But the safest accident is still the one that never happens.",
      safetyMsg:"The quality of the response depends on the quality of the first report.",
    },
    en:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lesson 4/6 · ⭐ Premium",
      title:"Emergency Reporting & Initial Response",
      intro:"This lesson does not cover communication in general. It answers a single question: how do you turn an individual discovery into a collective emergency response? The first responder doesn't solve the emergency, they correctly trigger the whole rescue chain.",
      p0:"THE QUALITY OF THE RESPONSE DEPENDS ON THE QUALITY OF THE FIRST REPORT.",s0t:"The principle that structures the whole lesson",
      s0:"A poorly announced emergency often becomes a more serious emergency. The first responder isn't just the one who discovers the problem: they are the one who gives the teams the means to intervene quickly, correctly, and safely.\n\nHOW DO I RECOGNIZE IT? A situation requiring immediate alerting, whatever its apparent severity.\nWHAT DO I DO IMMEDIATELY? Report using the structured method, secure the area, never exceed your competence.\nWHAT MISTAKE MAKES IT WORSE? A vague announcement, or assuming someone else has already reported it.\nWHEN MUST I ASK FOR HELP? As soon as the discovery is made, without waiting to have all the answers.",
      p1:"REPORTING AN EMERGENCY",s1t:"WHAT → WHERE → WHO → RISK → ACTION",
      s1:"A simple, memorable method, even under the stress of an emergency: nature of the emergency, exact location, people concerned, immediate danger, actions already taken.",
      p2:"EMERGENCY COMMUNICATION CHAIN",s2t:"Each piece of information triggers a new step",
      s2:"First responder → officer of the watch → bridge → captain → specialized teams → outside rescue if necessary. Understand this escalation logic, not just the means of communication.",
      p3:"SECURING THE SCENE",s3t:"Three priorities",
      s3:"Protecting people, preventing worsening, preserving the scene for effective intervention. The first responder must never create a second emergency.",
      p4:"SAFE INITIAL RESPONSE",s4t:"What I can do, what I must never do",
      s4:"Never improvise a technical intervention, never exceed your skill level, wait for specialists when the risk exceeds your capabilities.",
      p5:"⚠️ NEVER ASSUME",p6:"🎯 BUILD YOUR REPORT",p7:"🎯 OPERATIONAL EXERCISE",p8:"⚠️ CASE STUDY",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 4",
      sumP:["The Quality of the Response Depends on the Quality of the First Report","WHAT, WHERE, WHO, RISK, ACTION: the five elements of a complete report","The escalation chain: each piece of information triggers a new step","Three priorities for securing a scene: people, worsening, preservation","Never assume someone else has already reported it"],
      learnedP:["The structured emergency reporting method","The escalation logic of the communication chain","The three priorities for securing a scene","The boundary between what I can do and what I must never do","Why never assume an emergency has already been reported"],
      transition:"Good emergency reporting limits the consequences of an accident. But the safest accident is still the one that never happens.",
      safetyMsg:"The quality of the response depends on the quality of the first report.",
    },
    es:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lección 4/6 · ⭐ Premium",
      title:"Emergency Reporting & Initial Response",
      intro:"Esta lección no trata de la comunicación en general. Responde a una sola pregunta: ¿cómo transformar un descubrimiento individual en una respuesta de emergencia colectiva? El primer interviniente no resuelve la urgencia, desencadena correctamente toda la cadena de socorro.",
      p0:"THE QUALITY OF THE RESPONSE DEPENDS ON THE QUALITY OF THE FIRST REPORT.",s0t:"El principio que estructura toda la lección",
      s0:"Una urgencia mal anunciada suele convertirse en una urgencia más grave. El primer interviniente no es solo quien descubre el problema: es quien da a los equipos los medios para intervenir rápida, correcta y seguramente.\n\n¿CÓMO RECONOCERLO? Una situación que exige una alerta inmediata, sea cual sea su gravedad aparente.\n¿QUÉ HACER DE INMEDIATO? Informar según el método estructurado, asegurar la zona, nunca superar tu competencia.\n¿QUÉ ERROR LO AGRAVA? Un aviso vago, o suponer que alguien más ya lo informó.\n¿CUÁNDO PEDIR AYUDA? En cuanto se descubre, sin esperar a tener todas las respuestas.",
      p1:"REPORTING AN EMERGENCY",s1t:"WHAT → WHERE → WHO → RISK → ACTION",
      s1:"Un método simple y memorable, incluso bajo el estrés de una urgencia: naturaleza de la urgencia, localización exacta, personas implicadas, peligro inmediato, acciones ya realizadas.",
      p2:"EMERGENCY COMMUNICATION CHAIN",s2t:"Cada información desencadena una nueva etapa",
      s2:"Primer interviniente → oficial de guardia → puente → capitán → equipos especializados → socorro exterior si es necesario. Comprender esta lógica de escalada, no solo los medios de comunicación.",
      p3:"SECURING THE SCENE",s3t:"Tres prioridades",
      s3:"Proteger a las personas, impedir el agravamiento, preservar la zona para una intervención eficaz. El primer interviniente nunca debe crear una segunda urgencia.",
      p4:"SAFE INITIAL RESPONSE",s4t:"Lo que puedo hacer, lo que nunca debo hacer",
      s4:"Nunca improvisar una intervención técnica, nunca superar tu nivel de competencia, esperar a los especialistas cuando el riesgo supera tus capacidades.",
      p5:"⚠️ NUNCA SUPONER",p6:"🎯 CONSTRUYE TU AVISO",p7:"🎯 EJERCICIO OPERATIVO",p8:"⚠️ CASO DE ESTUDIO",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 4",
      sumP:["The Quality of the Response Depends on the Quality of the First Report","WHAT, WHERE, WHO, RISK, ACTION: los cinco elementos de un aviso completo","La cadena de escalada: cada información desencadena una nueva etapa","Tres prioridades para asegurar una zona: personas, agravamiento, preservación","Nunca suponer que alguien más ya lo informó"],
      learnedP:["El método estructurado de aviso de urgencia","La lógica de escalada de la cadena de comunicación","Las tres prioridades para asegurar una zona","La frontera entre lo que puedo hacer y lo que nunca debo hacer","Por qué nunca suponer que una urgencia ya ha sido informada"],
      transition:"Good emergency reporting limits the consequences of an accident. But the safest accident is still the one that never happens.",
      safetyMsg:"The quality of the response depends on the quality of the first report.",
    },
    pt:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lição 4/6 · ⭐ Premium",
      title:"Emergency Reporting & Initial Response",
      intro:"Esta lição não trata da comunicação em geral. Responde a uma única pergunta: como transformar uma descoberta individual numa resposta de urgência coletiva? O primeiro interveniente não resolve a urgência, desencadeia corretamente toda a cadeia de socorro.",
      p0:"THE QUALITY OF THE RESPONSE DEPENDS ON THE QUALITY OF THE FIRST REPORT.",s0t:"O princípio que estrutura toda a lição",
      s0:"Uma urgência mal anunciada torna-se muitas vezes numa urgência mais grave. O primeiro interveniente não é só quem descobre o problema: é quem dá às equipas os meios para intervir rápida, correta e seguramente.\n\nCOMO RECONHECER? Uma situação que exige um alerta imediato, seja qual for a sua gravidade aparente.\nO QUE FAZER IMEDIATAMENTE? Reportar segundo o método estruturado, assegurar a zona, nunca ultrapassar as tuas competências.\nQUE ERRO O AGRAVA? Um aviso vago, ou presumir que outra pessoa já o reportou.\nQUANDO PEDIR AJUDA? Assim que a descoberta é feita, sem esperar ter todas as respostas.",
      p1:"REPORTING AN EMERGENCY",s1t:"WHAT → WHERE → WHO → RISK → ACTION",
      s1:"Um método simples e memorável, mesmo sob o stress de uma urgência: natureza da urgência, localização exata, pessoas envolvidas, perigo imediato, ações já realizadas.",
      p2:"EMERGENCY COMMUNICATION CHAIN",s2t:"Cada informação desencadeia uma nova etapa",
      s2:"Primeiro interveniente → oficial de quarto → passadiço → comandante → equipas especializadas → socorro exterior se necessário. Compreender esta lógica de escalada, não apenas os meios de comunicação.",
      p3:"SECURING THE SCENE",s3t:"Três prioridades",
      s3:"Proteger as pessoas, impedir o agravamento, preservar a zona para uma intervenção eficaz. O primeiro interveniente nunca deve criar uma segunda urgência.",
      p4:"SAFE INITIAL RESPONSE",s4t:"O que posso fazer, o que nunca devo fazer",
      s4:"Nunca improvisar uma intervenção técnica, nunca ultrapassar o teu nível de competência, esperar pelos especialistas quando o risco ultrapassa as tuas capacidades.",
      p5:"⚠️ NUNCA PRESSUPOR",p6:"🎯 CONSTRÓI O TEU AVISO",p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"⚠️ CASO DE ESTUDO",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 4",
      sumP:["The Quality of the Response Depends on the Quality of the First Report","WHAT, WHERE, WHO, RISK, ACTION: os cinco elementos de um aviso completo","A cadeia de escalada: cada informação desencadeia uma nova etapa","Três prioridades para assegurar uma zona: pessoas, agravamento, preservação","Nunca presumir que outra pessoa já reportou"],
      learnedP:["O método estruturado de aviso de urgência","A lógica de escalada da cadeia de comunicação","As três prioridades para assegurar uma zona","A fronteira entre o que posso fazer e o que nunca devo fazer","Por que nunca presumir que uma urgência já foi reportada"],
      transition:"Good emergency reporting limits the consequences of an accident. But the safest accident is still the one that never happens.",
      safetyMsg:"The quality of the response depends on the quality of the first report.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS6_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/6":lang==="en"?"Lesson 4/6":lang==="es"?"Lección 4/6":"Lição 4/6"}</div>
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

            <SL icon="📡" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📡 {lang==="fr"?"MÉTHODE D'ANNONCE - INTERACTIF":lang==="en"?"REPORTING METHOD - INTERACTIVE":lang==="es"?"MÉTODO DE AVISO - INTERACTIVO":"MÉTODO DE AVISO - INTERATIVO"}</div><ReportingMethodSVG lang={lang}/></Card>

            <SL icon="🔗" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔗</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔗 {lang==="fr"?"CHAÎNE DE COMMUNICATION - INTERACTIF":lang==="en"?"COMMUNICATION CHAIN - INTERACTIVE":lang==="es"?"CADENA DE COMUNICACIÓN - INTERACTIVO":"CADEIA DE COMUNICAÇÃO - INTERATIVO"}</div><CommunicationChainSVG lang={lang}/></Card>

            <SL icon="🔒" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔒</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔒 {lang==="fr"?"SÉCURISER LA ZONE - INTERACTIF":lang==="en"?"SECURING THE SCENE - INTERACTIVE":lang==="es"?"ASEGURAR LA ZONA - INTERACTIVO":"ASSEGURAR A ZONA - INTERATIVO"}</div><SecuringSceneSVG lang={lang}/></Card>

            <SL icon="⚖️" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚖️ {lang==="fr"?"RÉPONSE SÛRE - INTERACTIF":lang==="en"?"SAFE RESPONSE - INTERACTIVE":lang==="es"?"RESPUESTA SEGURA - INTERACTIVO":"RESPOSTA SEGURA - INTERATIVO"}</div><SafeInitialResponseSVG lang={lang}/></Card>

            <SL icon="⚠️" text={lc.p5} color={C.red}/>
            <div style={{marginBottom:14}}><NeverAssumeBox lang={lang}/></div>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><BuildReportExercise lang={lang}/></Card>

            <SL icon="🎯" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p8} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank}/></Card>

            <SL icon="🪞" text={lc.p10} color={C.purple}/>
            <div style={{marginBottom:14}}><SafetyReflection lang={lang}/></div>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(230,126,34,0.35)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final - Communication d'Urgence":lang==="en"?"Final Quiz - Emergency Communication":lang==="es"?"Quiz Final - Comunicación de Emergencia":"Quiz Final - Comunicação de Urgência"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 4/6":"questions · Lesson 4/6"}</div>
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

            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.35)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 5 - PERMIT TO WORK →":lang==="en"?"LESSON 5 - PERMIT TO WORK →":lang==="es"?"LECCIÓN 5 - PERMIT TO WORK →":"LIÇÃO 5 - PERMIT TO WORK →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
