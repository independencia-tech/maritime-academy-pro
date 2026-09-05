import { useState, useEffect } from "react";
import { shuffleQuestionOptions, C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — ENGINE ROOM ROLES MAP
// ══════════════════════════════════════
function RolesMapSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const roles = [
    { id:"eow", icon:"👷", color:C.blue2, label:{fr:"Officier de Quart Machine",en:"Engineer of the Watch",es:"Oficial de Guardia de Máquinas",pt:"Oficial de Quarto de Máquinas"},
      desc:{fr:"Surveille en continu les paramètres, effectue les rondes, réagit en premier à toute alarme, décide d'alerter le second ou le chef.",en:"Continuously monitors parameters, performs rounds, is the first to react to any alarm, decides when to alert the second or chief engineer.",es:"Vigila continuamente los parámetros, realiza las rondas, es el primero en reaccionar ante cualquier alarma, decide cuándo avisar al segundo o al jefe.",pt:"Vigia continuamente os parâmetros, faz as rondas, é o primeiro a reagir a qualquer alarme, decide quando avisar o segundo ou o chefe."} },
    { id:"eto", icon:"🔌", color:C.teal, label:{fr:"ETO",en:"ETO",es:"ETO",pt:"ETO"},
      desc:{fr:"Responsable des systèmes électriques, automation et diagnostics. Point de référence pour toute anomalie électrique ou de contrôle-commande.",en:"Responsible for electrical systems, automation and diagnostics. Reference point for any electrical or control-system anomaly.",es:"Responsable de los sistemas eléctricos, automatización y diagnósticos. Punto de referencia para cualquier anomalía eléctrica o de control.",pt:"Responsável pelos sistemas elétricos, automação e diagnósticos. Ponto de referência para qualquer anomalia elétrica ou de controlo."} },
    { id:"oiler", icon:"🛢️", color:C.orange, label:{fr:"Graisseur / Motorman",en:"Oiler / Motorman",es:"Engrasador / Motorman",pt:"Lubrificador / Motorman"},
      desc:{fr:"Exécute les rondes physiques, les tâches de graissage et de nettoyage, souvent le premier à percevoir un bruit ou une odeur anormale.",en:"Performs physical rounds, greasing and cleaning tasks, often the first to notice an abnormal noise or smell.",es:"Realiza las rondas físicas, tareas de engrase y limpieza, a menudo el primero en notar un ruido u olor anormal.",pt:"Executa as rondas físicas, tarefas de lubrificação e limpeza, muitas vezes o primeiro a notar um ruído ou cheiro anormal."} },
    { id:"2eng", icon:"🔧", color:C.purple, label:{fr:"Second Mécanicien",en:"Second Engineer",es:"Segundo Maquinista",pt:"Segundo Maquinista"},
      desc:{fr:"Coordonne le quart, arbitre les priorités opérationnelles, sert d'intermédiaire entre l'équipe de quart et le chef mécanicien.",en:"Coordinates the watch, arbitrates operational priorities, acts as the link between the watch team and the chief engineer.",es:"Coordina la guardia, arbitra las prioridades operativas, actúa de enlace entre el equipo de guardia y el jefe de máquinas.",pt:"Coordena o quarto, arbitra as prioridades operacionais, faz a ligação entre a equipa de quarto e o chefe de máquinas."} },
    { id:"ceng", icon:"⭐", color:C.gold2, label:{fr:"Chef Mécanicien",en:"Chief Engineer",es:"Jefe de Máquinas",pt:"Chefe de Máquinas"},
      desc:{fr:"Responsable final de la sécurité machine, arbitre les décisions à fort enjeu, informe le commandant des situations critiques.",en:"Final responsibility for machinery safety, arbitrates high-stakes decisions, informs the Master of critical situations.",es:"Responsabilidad final de la seguridad de la maquinaria, arbitra las decisiones de alto riesgo, informa al Capitán de las situaciones críticas.",pt:"Responsabilidade final pela segurança da maquinaria, arbitra decisões de grande impacto, informa o Comandante de situações críticas."} },
  ];
  const sel_ = sel?roles.find(r=>r.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {roles.map(r=>(
          <div key={r.id} onClick={()=>setSel(sel===r.id?null:r.id)}
            style={{padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===r.id?`${r.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===r.id?r.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:3}}>{r.icon}</div>
            <div style={{fontSize:8,color:sel===r.id?r.color:C.muted,fontWeight:700,lineHeight:1.3}}>{r.label[lang]||r.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?(
        <div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      ):(
        <div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche un rôle pour voir sa responsabilité":lang==="en"?"Tap a role to see its responsibility":lang==="es"?"Toca un rol para ver su responsabilidad":"Toque numa função para ver a sua responsabilidade"}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — CHALLENGE & RESPONSE LADDER
// ══════════════════════════════════════
function ChallengeResponseSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, label:{fr:"1. Observer et signaler",en:"1. Observe and report",es:"1. Observar y señalar",pt:"1. Observar e reportar"},
      desc:{fr:"\"Chef, je vois une température anormale sur le palier n°3.\" — une observation factuelle, sans attendre.",en:"\"Chief, I see an abnormal temperature on bearing #3.\" — a factual observation, without waiting.",es:"\"Jefe, veo una temperatura anormal en el cojinete n.º 3.\" — una observación factual, sin esperar.",pt:"\"Chefe, vejo uma temperatura anormal no chumaceiro n.º 3.\" — uma observação factual, sem esperar."} },
    { id:2, label:{fr:"2. Répéter et proposer",en:"2. Repeat and propose",es:"2. Repetir y proponer",pt:"2. Repetir e propor"},
      desc:{fr:"Si la première alerte ne provoque pas de réaction claire : \"Je répète — la température continue de monter, je recommande un arrêt contrôlé.\"",en:"If the first alert gets no clear reaction: \"I repeat — the temperature keeps rising, I recommend a controlled shutdown.\"",es:"Si la primera alerta no provoca una reacción clara: \"Repito — la temperatura sigue subiendo, recomiendo una parada controlada.\"",pt:"Se o primeiro alerta não provocar uma reação clara: \"Repito — a temperatura continua a subir, recomendo uma paragem controlada.\""} },
    { id:3, label:{fr:"3. Escalader",en:"3. Escalate",es:"3. Escalar",pt:"3. Escalar"},
      desc:{fr:"Si toujours aucune réaction : agir selon la procédure d'urgence et informer immédiatement le niveau supérieur (second, chef, commandant).",en:"If still no reaction: act according to the emergency procedure and immediately inform the next level up (second, chief, master).",es:"Si sigue sin haber reacción: actuar según el procedimiento de emergencia e informar de inmediato al nivel superior (segundo, jefe, capitán).",pt:"Se ainda não houver reação: agir de acordo com o procedimento de emergência e informar imediatamente o nível superior (segundo, chefe, comandante)."} },
  ];
  const sel_ = sel!==null?steps.find(s=>s.id===sel):null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{padding:"10px 12px",borderRadius:12,cursor:"pointer",
              background:sel===s.id?`${C.blue2}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?C.blue2:"rgba(255,255,255,0.1)"}`}}>
            <div style={{fontSize:12,fontWeight:700,color:sel===s.id?C.blue2:C.white}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${C.blue2}15`,border:`1px solid ${C.blue2}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      {!sel_&&<div style={{textAlign:"center",fontSize:10,color:C.muted}}>{lang==="fr"?"Touche une étape de l'échelle d'escalade":lang==="en"?"Tap a step of the escalation ladder":lang==="es"?"Toca un paso de la escalera de escalado":"Toque num passo da escada de escalonamento"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — SHARED SITUATIONAL AWARENESS
// ══════════════════════════════════════
function SharedAwarenessSVG({ lang }) {
  const [revealed, setRevealed] = useState([]);
  const pieces = [
    { id:"a", icon:"📈", holder:{fr:"Officier de quart",en:"Officer of the watch",es:"Oficial de guardia",pt:"Oficial de quarto"}, info:{fr:"Vibration légère mais inhabituelle sur le moteur n°2 depuis 30 minutes.",en:"Slight but unusual vibration on engine #2 for the past 30 minutes.",es:"Vibración ligera pero inusual en el motor n.º 2 desde hace 30 minutos.",pt:"Vibração ligeira mas invulgar no motor n.º 2 há 30 minutos."} },
    { id:"b", icon:"🌡️", holder:{fr:"ETO",en:"ETO",es:"ETO",pt:"ETO"}, info:{fr:"Température d'un palier en légère hausse, encore dans la tolérance officielle.",en:"A bearing temperature slightly rising, still within official tolerance.",es:"Temperatura de un cojinete en ligero aumento, aún dentro de la tolerancia oficial.",pt:"Temperatura de um chumaceiro em ligeira subida, ainda dentro da tolerância oficial."} },
    { id:"c", icon:"👂", holder:{fr:"Graisseur",en:"Oiler",es:"Engrasador",pt:"Lubrificador"}, info:{fr:"Bruit métallique discret entendu pendant la ronde, non signalé car 'probablement rien'.",en:"A faint metallic noise heard during the round, not reported because 'probably nothing'.",es:"Ruido metálico discreto oído durante la ronda, no reportado porque 'probablemente no es nada'.",pt:"Ruído metálico discreto ouvido durante a ronda, não reportado porque 'provavelmente não é nada'."} },
  ];
  const allRevealed = revealed.length===pieces.length;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {pieces.map(p=>(
          <div key={p.id} onClick={()=>setRevealed(r=>r.includes(p.id)?r:[...r,p.id])}
            style={{padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:revealed.includes(p.id)?`${C.teal}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${revealed.includes(p.id)?C.teal:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:3}}>{p.icon}</div>
            <div style={{fontSize:8,color:revealed.includes(p.id)?C.teal:C.muted,fontWeight:700}}>{p.holder[lang]||p.holder.fr}</div>
          </div>
        ))}
      </div>
      {revealed.map(id=>{
        const p = pieces.find(pp=>pp.id===id);
        return <div key={id} style={{padding:"8px 10px",borderRadius:10,background:`${C.teal}12`,border:`1px solid ${C.teal}33`,fontSize:11,color:C.white,lineHeight:1.6,marginBottom:6}}>{p.info[lang]||p.info.fr}</div>;
      })}
      {allRevealed?(
        <div style={{marginTop:6,padding:"10px 12px",borderRadius:12,background:"rgba(192,57,43,0.12)",border:`1px solid ${C.red}44`,fontSize:11,color:C.gold2,lineHeight:1.7,fontStyle:"italic"}}>
          {lang==="fr"?"⚡ Isolément, aucune de ces trois observations n'est alarmante. Combinées, elles dessinent le signal d'alerte précoce d'un roulement en train de céder. C'est exactement ce que la conscience de situation partagée doit révéler.":
           lang==="en"?"⚡ In isolation, none of these three observations is alarming. Combined, they draw the early warning sign of a failing bearing. This is exactly what shared situational awareness is meant to reveal.":
           lang==="es"?"⚡ Aisladas, ninguna de estas tres observaciones es alarmante. Combinadas, dibujan la señal de alerta temprana de un rodamiento que está fallando. Esto es exactamente lo que debe revelar la conciencia de situación compartida.":
           "⚡ Isoladamente, nenhuma destas três observações é alarmante. Combinadas, desenham o sinal de alerta precoce de um rolamento em falha. É exatamente isto que a consciência de situação partilhada deve revelar."}
        </div>
      ):(
        <div style={{textAlign:"center",fontSize:10,color:C.muted}}>{lang==="fr"?"Touche les trois cartes pour révéler le tableau complet":lang==="en"?"Tap all three cards to reveal the full picture":lang==="es"?"Toca las tres tarjetas para revelar el panorama completo":"Toque nos três cartões para revelar o panorama completo"}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — OPERATIONAL SCENARIO
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"a"};
  const qs = {
    fr:[
      {id:"q1",q:"Trois membres de l'équipe machine ont chacun une observation mineure et isolée sur le même équipement, mais ne se les partagent pas. Quel est le risque principal ?\na) Aucun, chaque observation est mineure\nb) Le signal d'alerte global n'apparaît jamais si personne ne combine les observations\nc) Le chef mécanicien s'en rendra compte tout seul"},
      {id:"q2",q:"Tu signales une anomalie au second, qui ne réagit pas clairement. Que fais-tu selon l'échelle Challenge & Response ?\na) Tu répètes clairement l'observation et proposes une action précise\nb) Tu abandonnes, tu as fait ta part\nc) Tu attends la fin du quart"},
      {id:"q3",q:"Quel rôle sert typiquement d'intermédiaire entre l'équipe de quart et le chef mécanicien ?\na) L'ETO\nb) Le graisseur\nc) Le second mécanicien"},
      {id:"q4",q:"Pourquoi la 'conscience de situation partagée' est-elle importante en salle des machines ?\na) Parce qu'un danger réel peut n'apparaître qu'en combinant plusieurs observations isolées\nb) Parce qu'elle remplace les procédures écrites\nc) Parce qu'elle concerne uniquement le chef mécanicien"},
    ],
    en:[
      {id:"q1",q:"Three engine team members each have a minor, isolated observation about the same equipment, but do not share them. What is the main risk?\na) None, each observation is minor\nb) The overall warning signal never appears if no one combines the observations\nc) The chief engineer will notice on his own"},
      {id:"q2",q:"You report an anomaly to the second engineer, who does not react clearly. What do you do according to the Challenge & Response ladder?\na) Clearly repeat the observation and propose a specific action\nb) Give up, you did your part\nc) Wait until the end of the watch"},
      {id:"q3",q:"Which role typically acts as the link between the watch team and the chief engineer?\na) The ETO\nb) The oiler\nc) The second engineer"},
      {id:"q4",q:"Why is 'shared situational awareness' important in the engine room?\na) Because a real danger may only appear when several isolated observations are combined\nb) Because it replaces written procedures\nc) Because it only concerns the chief engineer"},
    ],
    es:[
      {id:"q1",q:"Tres miembros del equipo de máquinas tienen cada uno una observación menor y aislada sobre el mismo equipo, pero no las comparten. ¿Cuál es el riesgo principal?\na) Ninguno, cada observación es menor\nb) La señal de alerta global nunca aparece si nadie combina las observaciones\nc) El jefe de máquinas se dará cuenta solo"},
      {id:"q2",q:"Informas de una anomalía al segundo maquinista, que no reacciona claramente. ¿Qué haces según la escalera Challenge & Response?\na) Repites claramente la observación y propones una acción concreta\nb) Te rindes, ya has hecho tu parte\nc) Esperas al final de la guardia"},
      {id:"q3",q:"¿Qué rol suele servir de enlace entre el equipo de guardia y el jefe de máquinas?\na) El ETO\nb) El engrasador\nc) El segundo maquinista"},
      {id:"q4",q:"¿Por qué es importante la 'conciencia de situación compartida' en la sala de máquinas?\na) Porque un peligro real puede aparecer solo al combinar varias observaciones aisladas\nb) Porque sustituye a los procedimientos escritos\nc) Porque solo concierne al jefe de máquinas"},
    ],
    pt:[
      {id:"q1",q:"Três membros da equipa de máquinas têm cada um uma observação menor e isolada sobre o mesmo equipamento, mas não as partilham. Qual é o risco principal?\na) Nenhum, cada observação é menor\nb) O sinal de alerta global nunca aparece se ninguém combinar as observações\nc) O chefe de máquinas vai reparar sozinho"},
      {id:"q2",q:"Reportas uma anomalia ao segundo maquinista, que não reage claramente. O que fazes segundo a escada Challenge & Response?\na) Repetes claramente a observação e propões uma ação concreta\nb) Desistes, já fizeste a tua parte\nc) Esperas pelo fim do quarto"},
      {id:"q3",q:"Que função serve tipicamente de ligação entre a equipa de quarto e o chefe de máquinas?\na) O ETO\nb) O lubrificador\nc) O segundo maquinista"},
      {id:"q4",q:"Por que é importante a 'consciência de situação partilhada' na casa das máquinas?\na) Porque um perigo real pode só aparecer ao combinar várias observações isoladas\nb) Porque substitui os procedimentos escritos\nc) Porque só diz respeito ao chefe de máquinas"},
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
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.6,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: b — sans partage, le signal global n'émerge jamais\n✅ Q2: a — l'échelle Challenge & Response impose de répéter et proposer avant d'abandonner\n✅ Q3: c — le second mécanicien coordonne le quart et fait le lien avec le chef\n✅ Q4: a — c'est la combinaison des observations, pas une seule, qui révèle le danger":
         lang==="en"?"✅ Q1: b — without sharing, the overall signal never emerges\n✅ Q2: a — the Challenge & Response ladder requires repeating and proposing before giving up\n✅ Q3: c — the second engineer coordinates the watch and links to the chief\n✅ Q4: a — it is the combination of observations, not a single one, that reveals the danger":
         "✅ Q1: b · Q2: a · Q3: c · Q4: a"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — FERRY KAITAKI
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Ferry Kaitaki — Détroit de Cook, Nouvelle-Zélande (28 janvier 2023)",teaser:"Blackout total · Coordination désorganisée · 4 moteurs immobilisés · Enquête TAIC",
      what:"En transit entre Picton et Wellington, le ferry Kaitaki subit un blackout total à environ un mille nautique au large de Sinclair Head. Peu après, une garniture d'expansion dégradée cède sur le circuit de refroidissement à haute température, coupant le refroidissement des quatre moteurs principaux — aucun ne peut être redémarré en sécurité. Un ingénieur présent décrira la réponse de l'équipe comme un 'chaos organisé, tout le monde était partout à essayer de tout faire'. Le navire reste sans propulsion pendant environ une heure avant que le contrôle ne soit rendu à la passerelle.",
      cause:"• Une garniture d'expansion ayant dépassé sa durée de vie prévue a cédé sous la panne initiale\n• Absence de structure claire des rôles pendant l'urgence — plusieurs membres tentent la même action sans coordination\n• Perte de refroidissement empêchant le redémarrage de l'ensemble des moteurs principaux, un effet domino technique\n• Communication non structurée entre les membres de l'équipe pendant la phase critique",
      lessons:"✓ Une avarie technique gérable devient une crise prolongée sans structure d'équipe claire\n✓ 'Tout le monde essaie de tout faire' est le signe d'une coordination absente, pas d'un effort collectif efficace\n✓ Un composant ayant dépassé sa durée de vie prévue peut transformer un incident isolé en panne généralisée\n✓ Désigner clairement qui fait quoi, même dans l'urgence, accélère la résolution plus qu'improviser à plusieurs",
      link:"🔗 L'enquête officielle (TAIC, Nouvelle-Zélande) a formulé 6 constats de sécurité — la coordination d'équipe, pas la seule panne technique, est identifiée comme facteur central de la durée de l'incident."},
    en:{title:"Ferry Kaitaki — Cook Strait, New Zealand (28 January 2023)",teaser:"Total blackout · Disorganized coordination · 4 engines down · TAIC investigation",
      what:"While in transit from Picton to Wellington, the ferry Kaitaki suffered a total blackout about one nautical mile off Sinclair Head. Shortly after, a degraded expansion joint on the high-temperature cooling circuit ruptured, cutting cooling to all four main engines — none could be safely restarted. An engineer on board described the team's response as 'organised chaos, everybody was everywhere trying to do everything'. The vessel remained without propulsion for about an hour before control was returned to the bridge.",
      cause:"• An expansion joint that had exceeded its expected service life failed under the initial fault\n• No clear structure of roles during the emergency — several crew members attempted the same action without coordination\n• Loss of cooling preventing the restart of all main engines, a technical domino effect\n• Unstructured communication between team members during the critical phase",
      lessons:"✓ A manageable technical fault becomes a prolonged crisis without a clear team structure\n✓ 'Everyone trying to do everything' is a sign of absent coordination, not effective collective effort\n✓ A component past its expected service life can turn an isolated fault into a widespread failure\n✓ Clearly assigning who does what, even under pressure, resolves the situation faster than several people improvising",
      link:"🔗 The official investigation (TAIC, New Zealand) issued 6 safety findings — team coordination, not the technical fault alone, was identified as a central factor in how long the incident lasted."},
    es:{title:"Ferry Kaitaki — Estrecho de Cook, Nueva Zelanda (28 de enero de 2023)",teaser:"Apagón total · Coordinación desorganizada · 4 motores parados · Investigación TAIC",
      what:"En tránsito de Picton a Wellington, el ferry Kaitaki sufrió un apagón total a aproximadamente una milla náutica de Sinclair Head. Poco después, una junta de expansión degradada del circuito de refrigeración de alta temperatura falló, cortando la refrigeración de los cuatro motores principales — ninguno pudo reiniciarse con seguridad. Un ingeniero a bordo describió la respuesta del equipo como 'caos organizado, todo el mundo estaba en todas partes intentando hacerlo todo'. El buque permaneció sin propulsión durante aproximadamente una hora antes de que el control volviera al puente.",
      cause:"• Una junta de expansión que había superado su vida útil prevista falló ante el fallo inicial\n• Ausencia de una estructura clara de roles durante la emergencia — varios tripulantes intentaron la misma acción sin coordinación\n• La pérdida de refrigeración impidió reiniciar todos los motores principales, un efecto dominó técnico\n• Comunicación no estructurada entre los miembros del equipo durante la fase crítica",
      lessons:"✓ Una avería técnica manejable se convierte en una crisis prolongada sin una estructura de equipo clara\n✓ 'Todos intentando hacerlo todo' es señal de coordinación ausente, no de un esfuerzo colectivo eficaz\n✓ Un componente que ha superado su vida útil puede convertir un fallo aislado en una avería generalizada\n✓ Asignar claramente quién hace qué, incluso bajo presión, resuelve la situación más rápido que improvisar entre varios",
      link:"🔗 La investigación oficial (TAIC, Nueva Zelanda) formuló 6 constataciones de seguridad — la coordinación de equipo, no solo el fallo técnico, fue identificada como factor central en la duración del incidente."},
    pt:{title:"Ferry Kaitaki — Estreito de Cook, Nova Zelândia (28 de janeiro de 2023)",teaser:"Blackout total · Coordenação desorganizada · 4 motores parados · Investigação TAIC",
      what:"Em trânsito de Picton para Wellington, o ferry Kaitaki sofreu um blackout total a cerca de uma milha náutica de Sinclair Head. Pouco depois, uma junta de expansão degradada no circuito de arrefecimento de alta temperatura rompeu-se, cortando o arrefecimento dos quatro motores principais — nenhum pôde ser reiniciado com segurança. Um maquinista a bordo descreveu a resposta da equipa como 'caos organizado, toda a gente estava em todo o lado a tentar fazer tudo'. O navio ficou sem propulsão durante cerca de uma hora antes de o controlo ser devolvido à ponte.",
      cause:"• Uma junta de expansão que tinha excedido a sua vida útil prevista falhou perante a avaria inicial\n• Ausência de uma estrutura clara de funções durante a emergência — vários tripulantes tentaram a mesma ação sem coordenação\n• A perda de arrefecimento impediu o reinício de todos os motores principais, um efeito dominó técnico\n• Comunicação não estruturada entre os membros da equipa durante a fase crítica",
      lessons:"✓ Uma avaria técnica gerível torna-se uma crise prolongada sem uma estrutura de equipa clara\n✓ 'Todos a tentar fazer tudo' é sinal de coordenação ausente, não de um esforço coletivo eficaz\n✓ Um componente que excedeu a sua vida útil pode transformar uma falha isolada numa avaria generalizada\n✓ Atribuir claramente quem faz o quê, mesmo sob pressão, resolve a situação mais depressa do que vários a improvisar",
      link:"🔗 A investigação oficial (TAIC, Nova Zelândia) emitiu 6 constatações de segurança — a coordenação de equipa, não apenas a falha técnica, foi identificada como fator central na duração do incidente."},
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

// ══════════════════════════════════════
// BANK — 15 QUESTIONS
// ══════════════════════════════════════
export const BANK = {
  fr:[
    {q:"Que montre principalement le cas du ferry Kaitaki (2023) ?",opts:["Qu'un composant technique ne peut jamais être en cause","Qu'une avarie technique gérable peut devenir une crise prolongée sans coordination d'équipe claire","Que la coordination d'équipe n'a aucun effet sur la durée d'un incident","Que le blackout était inévitable quoi qu'il arrive"],correct:1,expl:"Le rapport TAIC identifie l'absence de structure de rôles claire pendant l'urgence, pas uniquement la panne technique, comme facteur central de la durée de l'incident."},
    {q:"Quel rôle sert typiquement d'intermédiaire entre l'équipe de quart machine et le chef mécanicien ?",opts:["L'ETO","Le graisseur","Le second mécanicien","Le commandant"],correct:2,expl:"Le second mécanicien coordonne le quart et arbitre les priorités, faisant le lien entre l'équipe et le chef mécanicien."},
    {q:"Qu'est-ce que la conscience de situation partagée ?",opts:["Le fait qu'un seul membre de l'équipe garde toutes les informations","La combinaison des observations individuelles de plusieurs membres pour révéler un danger que personne ne voit seul","Une checklist officielle à remplir en fin de quart","Un système d'alarme automatique"],correct:1,expl:"Un danger réel peut n'apparaître qu'en combinant plusieurs observations isolées et mineures — c'est l'objet de la conscience de situation partagée."},
    {q:"Selon l'échelle Challenge & Response, que faire si une première alerte ne provoque aucune réaction claire ?",opts:["Abandonner, l'information a été transmise","Répéter clairement l'observation et proposer une action précise","Attendre la fin du quart pour reformuler","Changer de sujet"],correct:1,expl:"L'échelle impose de répéter et de proposer une action avant d'escalader ou d'abandonner — le silence après une première tentative n'est jamais la bonne réponse."},
    {q:"Quelle est la dernière étape de l'échelle Challenge & Response si aucune réaction n'est obtenue ?",opts:["Se taire définitivement","Escalader vers le niveau supérieur et agir selon la procédure d'urgence","Réparer soi-même sans en parler à personne","Noter l'incident pour le rapport de fin de mois"],correct:1,expl:"Si la répétition et la proposition n'obtiennent toujours aucune réaction, l'étape suivante est d'escalader immédiatement vers le niveau hiérarchique supérieur."},
    {q:"Pourquoi une équipe en 'chaos organisé' (chacun essayant de tout faire) est-elle plus lente qu'une équipe coordonnée ?",opts:["Parce que plus de personnes signifie toujours plus de rapidité","Parce que l'absence de rôles clairs entraîne des actions redondantes ou contradictoires","Parce que le chaos organisé est en réalité une méthode reconnue","Parce que cela n'a aucun effet sur la vitesse de résolution"],correct:1,expl:"Sans répartition claire des rôles, plusieurs personnes peuvent tenter la même action ou s'annuler mutuellement, ce qui ralentit la résolution au lieu de l'accélérer."},
    {q:"Quel est le rôle principal du graisseur/motorman dans l'équipe machine ?",opts:["Décider des arrêts d'urgence","Exécuter les rondes physiques et signaler bruits ou odeurs anormaux","Gérer les systèmes électriques","Informer le commandant"],correct:1,expl:"Le graisseur/motorman effectue les tâches physiques et les rondes, ce qui en fait souvent le premier à percevoir une anomalie sensorielle (bruit, odeur, vibration)."},
    {q:"Pourquoi un composant ayant dépassé sa durée de vie prévue est-il un facteur aggravant dans le cas Kaitaki ?",opts:["Il n'a joué aucun rôle dans l'incident","Il a cédé au moment le plus critique, transformant une panne initiale en effet domino sur les quatre moteurs","Il a été remplacé juste avant l'incident","Il concernait un système sans lien avec la propulsion"],correct:1,expl:"La garniture d'expansion dégradée a cédé sous la panne initiale, coupant le refroidissement des quatre moteurs principaux et empêchant tout redémarrage rapide."},
    {q:"Quel est l'objectif principal de la leçon L2 de ce module ?",opts:["Réexpliquer la maintenance préventive","Comprendre comment la coordination d'équipe, les rôles clairs et la conscience de situation partagée préviennent l'aggravation d'une avarie","Étudier la responsabilité juridique en cas de panne","Apprendre à réparer une garniture d'expansion"],correct:1,expl:"L2 se concentre sur la dimension collective de la gestion d'une avarie — au-delà du facteur individuel déjà vu en L1."},
    {q:"Un ingénieur junior repère une observation mineure mais ne la juge pas assez importante pour la signaler. Quel est le risque ?",opts:["Aucun, une observation mineure isolée est sans conséquence","Cette observation pourrait être la pièce manquante pour révéler un danger combiné avec d'autres observations","Le chef mécanicien la remarquera de toute façon","Signaler une observation mineure nuit à la crédibilité"],correct:1,expl:"C'est précisément la combinaison de plusieurs observations mineures qui révèle un danger — ne pas signaler prive l'équipe de cette information."},
    {q:"Que doit faire un membre de l'équipe machine avant d'escalader une préoccupation vers le niveau supérieur ?",opts:["Rien, escalader directement est toujours la première étape","Observer et signaler clairement, puis répéter et proposer une action si la première alerte reste sans réponse","Attendre 24 heures avant d'agir","Consulter le manuel du fabricant en priorité"],correct:1,expl:"L'échelle Challenge & Response suit un ordre précis : observer/signaler, puis répéter/proposer, et seulement ensuite escalader si nécessaire."},
    {q:"Pourquoi la communication non structurée a-t-elle aggravé la situation à bord du Kaitaki ?",opts:["Elle n'a eu aucun effet documenté","Elle a contribué à l'absence de coordination claire pendant la phase critique, prolongeant l'incident","Elle a permis une résolution plus rapide","Elle concernait uniquement la passerelle, pas la salle des machines"],correct:1,expl:"Le rapport d'enquête relie l'absence de communication structurée à la difficulté de coordonner une réponse efficace pendant l'urgence."},
    {q:"Quel principe l'ETO incarne-t-il typiquement dans l'équipe machine ?",opts:["La coordination générale du quart","Le point de référence pour toute anomalie électrique ou de contrôle-commande","La décision finale en cas d'urgence majeure","L'exécution des rondes physiques"],correct:1,expl:"L'ETO est responsable des systèmes électriques, de l'automation et des diagnostics, et constitue le point de référence pour ces domaines."},
    {q:"En quoi la coordination d'équipe en salle des machines (L2) complète-t-elle le facteur humain individuel vu en L1 ?",opts:["Elle le remplace entièrement","Elle ajoute la dimension collective : même des individus vigilants peuvent échouer si l'équipe ne coordonne pas ses informations et ses actions","Elle n'a aucun lien avec L1","Elle concerne uniquement les officiers seniors"],correct:1,expl:"L1 traite du facteur humain individuel (fatigue, biais, assertivité) ; L2 montre que même des individus compétents peuvent échouer collectivement sans coordination structurée."},
    {q:"Quelle est la bonne pratique si deux membres de l'équipe machine commencent à effectuer la même action sans le savoir pendant une urgence ?",opts:["Continuer chacun de son côté, cela ne fait pas de mal","Communiquer immédiatement pour clarifier qui fait quoi et éviter la redondance ou la contradiction","Laisser le plus rapide terminer en premier","Arrêter toute action jusqu'à nouvel ordre"],correct:1,expl:"La redondance ou la contradiction d'actions non coordonnées ralentit la résolution — clarifier immédiatement les rôles évite cette perte de temps critique."},
  ],
  en:[
    {q:"What does the Kaitaki ferry case (2023) mainly show?",opts:["That a technical component can never be at fault","That a manageable technical fault can become a prolonged crisis without clear team coordination","That team coordination has no effect on how long an incident lasts","That the blackout was unavoidable regardless"],correct:1,expl:"The TAIC report identifies the absence of a clear role structure during the emergency, not the technical fault alone, as a central factor in how long the incident lasted."},
    {q:"Which role typically acts as the link between the engine watch team and the chief engineer?",opts:["The ETO","The oiler","The second engineer","The master"],correct:2,expl:"The second engineer coordinates the watch and arbitrates priorities, linking the team and the chief engineer."},
    {q:"What is shared situational awareness?",opts:["The fact that only one team member holds all the information","The combination of individual observations from several members to reveal a danger no one sees alone","An official checklist filled at the end of watch","An automatic alarm system"],correct:1,expl:"A real danger may only appear when several isolated, minor observations are combined — that is the purpose of shared situational awareness."},
    {q:"According to the Challenge & Response ladder, what should you do if a first alert gets no clear reaction?",opts:["Give up, the information was transmitted","Clearly repeat the observation and propose a specific action","Wait until the end of the watch to rephrase","Change the subject"],correct:1,expl:"The ladder requires repeating and proposing an action before escalating or giving up — silence after a first attempt is never the right response."},
    {q:"What is the last step of the Challenge & Response ladder if no reaction is obtained?",opts:["Stay silent permanently","Escalate to the next level up and act according to the emergency procedure","Fix it yourself without telling anyone","Note the incident for the end-of-month report"],correct:1,expl:"If repeating and proposing still get no reaction, the next step is to immediately escalate to the next hierarchical level."},
    {q:"Why is a team in 'organised chaos' (everyone trying to do everything) slower than a coordinated team?",opts:["Because more people always means more speed","Because the absence of clear roles leads to redundant or contradictory actions","Because organised chaos is actually a recognized method","Because it has no effect on resolution speed"],correct:1,expl:"Without a clear division of roles, several people may attempt the same action or cancel each other out, slowing resolution instead of speeding it up."},
    {q:"What is the oiler/motorman's main role in the engine team?",opts:["Deciding on emergency shutdowns","Performing physical rounds and reporting abnormal noises or smells","Managing electrical systems","Informing the master"],correct:1,expl:"The oiler/motorman performs physical tasks and rounds, often making them the first to notice a sensory anomaly (noise, smell, vibration)."},
    {q:"Why was a component past its expected service life an aggravating factor in the Kaitaki case?",opts:["It played no role in the incident","It failed at the most critical moment, turning an initial fault into a domino effect on all four engines","It had just been replaced before the incident","It concerned a system unrelated to propulsion"],correct:1,expl:"The degraded expansion joint failed under the initial fault, cutting cooling to all four main engines and preventing any quick restart."},
    {q:"What is the main goal of lesson L2 in this module?",opts:["Re-explain preventive maintenance","Understand how team coordination, clear roles, and shared situational awareness prevent a fault from worsening","Study legal liability in case of a failure","Learn how to repair an expansion joint"],correct:1,expl:"L2 focuses on the collective dimension of managing a casualty — beyond the individual factor already covered in L1."},
    {q:"A junior engineer notices a minor observation but doesn't think it's important enough to report. What is the risk?",opts:["None, an isolated minor observation has no consequence","This observation could be the missing piece that reveals a danger when combined with others","The chief engineer will notice it anyway","Reporting a minor observation harms credibility"],correct:1,expl:"It is precisely the combination of several minor observations that reveals a danger — not reporting deprives the team of that information."},
    {q:"What should an engine team member do before escalating a concern to the next level?",opts:["Nothing, escalating directly is always the first step","Observe and clearly report, then repeat and propose an action if the first alert gets no response","Wait 24 hours before acting","Consult the manufacturer's manual first"],correct:1,expl:"The Challenge & Response ladder follows a precise order: observe/report, then repeat/propose, and only then escalate if necessary."},
    {q:"Why did unstructured communication worsen the situation aboard the Kaitaki?",opts:["It had no documented effect","It contributed to the lack of clear coordination during the critical phase, prolonging the incident","It allowed a faster resolution","It only concerned the bridge, not the engine room"],correct:1,expl:"The investigation report links the lack of structured communication to the difficulty of coordinating an effective response during the emergency."},
    {q:"What principle does the ETO typically embody in the engine team?",opts:["Overall watch coordination","The reference point for any electrical or control-system anomaly","The final decision in a major emergency","Performing physical rounds"],correct:1,expl:"The ETO is responsible for electrical systems, automation, and diagnostics, and is the reference point in these areas."},
    {q:"How does engine room team coordination (L2) complement the individual human factor seen in L1?",opts:["It fully replaces it","It adds the collective dimension: even vigilant individuals can fail if the team does not coordinate its information and actions","It has no link to L1","It only concerns senior officers"],correct:1,expl:"L1 covers the individual human factor (fatigue, bias, assertiveness); L2 shows that even competent individuals can fail collectively without structured coordination."},
    {q:"What is the correct practice if two engine team members unknowingly start performing the same action during an emergency?",opts:["Each continues on their own, it does no harm","Communicate immediately to clarify who does what and avoid redundancy or contradiction","Let the faster one finish first","Stop all action until further notice"],correct:1,expl:"Uncoordinated redundant or contradictory actions slow resolution — immediately clarifying roles avoids this critical loss of time."},
  ],
  es:[
    {q:"¿Qué muestra principalmente el caso del ferry Kaitaki (2023)?",opts:["Que un componente técnico nunca puede ser la causa","Que una avería técnica manejable puede convertirse en una crisis prolongada sin una coordinación de equipo clara","Que la coordinación de equipo no tiene efecto en la duración de un incidente","Que el apagón era inevitable de todos modos"],correct:1,expl:"El informe TAIC identifica la ausencia de una estructura clara de roles durante la emergencia, no solo la avería técnica, como factor central en la duración del incidente."},
    {q:"¿Qué rol suele servir de enlace entre el equipo de guardia de máquinas y el jefe de máquinas?",opts:["El ETO","El engrasador","El segundo maquinista","El capitán"],correct:2,expl:"El segundo maquinista coordina la guardia y arbitra las prioridades, sirviendo de enlace entre el equipo y el jefe de máquinas."},
    {q:"¿Qué es la conciencia de situación compartida?",opts:["Que solo un miembro del equipo tenga toda la información","La combinación de observaciones individuales de varios miembros para revelar un peligro que nadie ve solo","Una lista de verificación oficial al final de la guardia","Un sistema de alarma automático"],correct:1,expl:"Un peligro real puede aparecer solo al combinar varias observaciones aisladas y menores — ese es el propósito de la conciencia de situación compartida."},
    {q:"Según la escalera Challenge & Response, ¿qué hacer si una primera alerta no provoca ninguna reacción clara?",opts:["Rendirse, la información se transmitió","Repetir claramente la observación y proponer una acción concreta","Esperar al final de la guardia para reformular","Cambiar de tema"],correct:1,expl:"La escalera exige repetir y proponer una acción antes de escalar o rendirse — el silencio tras un primer intento nunca es la respuesta correcta."},
    {q:"¿Cuál es el último paso de la escalera Challenge & Response si no se obtiene reacción?",opts:["Callarse definitivamente","Escalar al nivel superior y actuar según el procedimiento de emergencia","Repararlo uno mismo sin decírselo a nadie","Anotar el incidente para el informe de fin de mes"],correct:1,expl:"Si repetir y proponer siguen sin obtener reacción, el siguiente paso es escalar de inmediato al nivel jerárquico superior."},
    {q:"¿Por qué un equipo en 'caos organizado' (todos intentando hacerlo todo) es más lento que un equipo coordinado?",opts:["Porque más personas siempre significa más rapidez","Porque la ausencia de roles claros provoca acciones redundantes o contradictorias","Porque el caos organizado es en realidad un método reconocido","Porque no tiene efecto en la velocidad de resolución"],correct:1,expl:"Sin una división clara de roles, varias personas pueden intentar la misma acción o anularse mutuamente, ralentizando la resolución en lugar de acelerarla."},
    {q:"¿Cuál es el papel principal del engrasador/motorman en el equipo de máquinas?",opts:["Decidir las paradas de emergencia","Realizar las rondas físicas y reportar ruidos u olores anormales","Gestionar los sistemas eléctricos","Informar al capitán"],correct:1,expl:"El engrasador/motorman realiza las tareas físicas y las rondas, lo que a menudo le convierte en el primero en notar una anomalía sensorial (ruido, olor, vibración)."},
    {q:"¿Por qué un componente que había superado su vida útil prevista fue un factor agravante en el caso Kaitaki?",opts:["No jugó ningún papel en el incidente","Falló en el momento más crítico, convirtiendo un fallo inicial en un efecto dominó sobre los cuatro motores","Había sido reemplazado justo antes del incidente","Concernía a un sistema sin relación con la propulsión"],correct:1,expl:"La junta de expansión degradada falló ante el fallo inicial, cortando la refrigeración de los cuatro motores principales e impidiendo un reinicio rápido."},
    {q:"¿Cuál es el objetivo principal de la lección L2 de este módulo?",opts:["Reexplicar el mantenimiento preventivo","Comprender cómo la coordinación de equipo, los roles claros y la conciencia de situación compartida evitan que una avería empeore","Estudiar la responsabilidad jurídica en caso de fallo","Aprender a reparar una junta de expansión"],correct:1,expl:"L2 se centra en la dimensión colectiva de la gestión de una avería, más allá del factor individual ya visto en L1."},
    {q:"Un maquinista junior nota una observación menor pero no la considera lo bastante importante para reportarla. ¿Cuál es el riesgo?",opts:["Ninguno, una observación menor aislada no tiene consecuencias","Esa observación podría ser la pieza que falta para revelar un peligro combinado con otras","El jefe de máquinas la notará de todos modos","Reportar una observación menor perjudica la credibilidad"],correct:1,expl:"Es precisamente la combinación de varias observaciones menores lo que revela un peligro — no reportarla priva al equipo de esa información."},
    {q:"¿Qué debe hacer un miembro del equipo de máquinas antes de escalar una preocupación al nivel superior?",opts:["Nada, escalar directamente es siempre el primer paso","Observar y reportar claramente, luego repetir y proponer una acción si la primera alerta no obtiene respuesta","Esperar 24 horas antes de actuar","Consultar primero el manual del fabricante"],correct:1,expl:"La escalera Challenge & Response sigue un orden preciso: observar/reportar, luego repetir/proponer, y solo entonces escalar si es necesario."},
    {q:"¿Por qué la comunicación no estructurada agravó la situación a bordo del Kaitaki?",opts:["No tuvo ningún efecto documentado","Contribuyó a la falta de coordinación clara durante la fase crítica, prolongando el incidente","Permitió una resolución más rápida","Solo concernía al puente, no a la sala de máquinas"],correct:1,expl:"El informe de investigación relaciona la falta de comunicación estructurada con la dificultad de coordinar una respuesta eficaz durante la emergencia."},
    {q:"¿Qué principio encarna típicamente el ETO en el equipo de máquinas?",opts:["La coordinación general de la guardia","El punto de referencia para cualquier anomalía eléctrica o de control","La decisión final en una emergencia mayor","La ejecución de las rondas físicas"],correct:1,expl:"El ETO es responsable de los sistemas eléctricos, la automatización y los diagnósticos, y es el punto de referencia en estos ámbitos."},
    {q:"¿Cómo complementa la coordinación de equipo en la sala de máquinas (L2) al factor humano individual visto en L1?",opts:["Lo sustituye por completo","Añade la dimensión colectiva: incluso individuos vigilantes pueden fallar si el equipo no coordina su información y acciones","No tiene relación con L1","Solo concierne a los oficiales sénior"],correct:1,expl:"L1 trata el factor humano individual (fatiga, sesgo, asertividad); L2 muestra que incluso individuos competentes pueden fallar colectivamente sin coordinación estructurada."},
    {q:"¿Cuál es la buena práctica si dos miembros del equipo de máquinas empiezan a realizar la misma acción sin saberlo durante una emergencia?",opts:["Cada uno sigue por su lado, no hace daño","Comunicarse de inmediato para aclarar quién hace qué y evitar redundancia o contradicción","Dejar que el más rápido termine primero","Detener toda acción hasta nueva orden"],correct:1,expl:"La redundancia o contradicción de acciones no coordinadas ralentiza la resolución — aclarar de inmediato los roles evita esta pérdida crítica de tiempo."},
  ],
  pt:[
    {q:"O que mostra principalmente o caso do ferry Kaitaki (2023)?",opts:["Que um componente técnico nunca pode ser a causa","Que uma avaria técnica gerível pode tornar-se uma crise prolongada sem uma coordenação de equipa clara","Que a coordenação de equipa não tem efeito na duração de um incidente","Que o blackout era inevitável de qualquer forma"],correct:1,expl:"O relatório TAIC identifica a ausência de uma estrutura clara de funções durante a emergência, não apenas a avaria técnica, como fator central na duração do incidente."},
    {q:"Que função serve tipicamente de ligação entre a equipa de quarto de máquinas e o chefe de máquinas?",opts:["O ETO","O lubrificador","O segundo maquinista","O comandante"],correct:2,expl:"O segundo maquinista coordena o quarto e arbitra as prioridades, fazendo a ligação entre a equipa e o chefe de máquinas."},
    {q:"O que é a consciência de situação partilhada?",opts:["O facto de apenas um membro da equipa ter toda a informação","A combinação de observações individuais de vários membros para revelar um perigo que ninguém vê sozinho","Uma checklist oficial preenchida no fim do quarto","Um sistema de alarme automático"],correct:1,expl:"Um perigo real pode só aparecer ao combinar várias observações isoladas e menores — é esse o propósito da consciência de situação partilhada."},
    {q:"Segundo a escada Challenge & Response, o que fazer se um primeiro alerta não provocar reação clara?",opts:["Desistir, a informação foi transmitida","Repetir claramente a observação e propor uma ação concreta","Esperar pelo fim do quarto para reformular","Mudar de assunto"],correct:1,expl:"A escada exige repetir e propor uma ação antes de escalar ou desistir — o silêncio após uma primeira tentativa nunca é a resposta certa."},
    {q:"Qual é o último passo da escada Challenge & Response se não se obtiver reação?",opts:["Ficar calado definitivamente","Escalar para o nível superior e agir segundo o procedimento de emergência","Reparar sozinho sem dizer a ninguém","Anotar o incidente para o relatório de fim de mês"],correct:1,expl:"Se repetir e propor continuarem sem obter reação, o passo seguinte é escalar imediatamente para o nível hierárquico superior."},
    {q:"Por que é que uma equipa em 'caos organizado' (todos a tentar fazer tudo) é mais lenta do que uma equipa coordenada?",opts:["Porque mais pessoas significa sempre mais rapidez","Porque a ausência de funções claras leva a ações redundantes ou contraditórias","Porque o caos organizado é na realidade um método reconhecido","Porque não tem efeito na velocidade de resolução"],correct:1,expl:"Sem uma divisão clara de funções, várias pessoas podem tentar a mesma ação ou anular-se mutuamente, atrasando a resolução em vez de a acelerar."},
    {q:"Qual é o papel principal do lubrificador/motorman na equipa de máquinas?",opts:["Decidir as paragens de emergência","Executar as rondas físicas e reportar ruídos ou cheiros anormais","Gerir os sistemas elétricos","Informar o comandante"],correct:1,expl:"O lubrificador/motorman executa as tarefas físicas e as rondas, o que muitas vezes o torna o primeiro a notar uma anomalia sensorial (ruído, cheiro, vibração)."},
    {q:"Por que é que um componente que tinha excedido a sua vida útil prevista foi um fator agravante no caso Kaitaki?",opts:["Não teve qualquer papel no incidente","Falhou no momento mais crítico, transformando uma falha inicial num efeito dominó sobre os quatro motores","Tinha sido substituído mesmo antes do incidente","Dizia respeito a um sistema sem relação com a propulsão"],correct:1,expl:"A junta de expansão degradada falhou perante a avaria inicial, cortando o arrefecimento dos quatro motores principais e impedindo um reinício rápido."},
    {q:"Qual é o objetivo principal da lição L2 deste módulo?",opts:["Reexplicar a manutenção preventiva","Compreender como a coordenação de equipa, funções claras e a consciência de situação partilhada evitam o agravamento de uma avaria","Estudar a responsabilidade jurídica em caso de falha","Aprender a reparar uma junta de expansão"],correct:1,expl:"L2 foca-se na dimensão coletiva da gestão de uma avaria, para além do fator individual já visto em L1."},
    {q:"Um maquinista júnior repara numa observação menor mas não a considera suficientemente importante para reportar. Qual é o risco?",opts:["Nenhum, uma observação menor isolada não tem consequências","Essa observação pode ser a peça em falta para revelar um perigo combinado com outras","O chefe de máquinas vai reparar de qualquer forma","Reportar uma observação menor prejudica a credibilidade"],correct:1,expl:"É precisamente a combinação de várias observações menores que revela um perigo — não reportar priva a equipa dessa informação."},
    {q:"O que deve fazer um membro da equipa de máquinas antes de escalar uma preocupação para o nível superior?",opts:["Nada, escalar diretamente é sempre o primeiro passo","Observar e reportar claramente, depois repetir e propor uma ação se o primeiro alerta não obtiver resposta","Esperar 24 horas antes de agir","Consultar primeiro o manual do fabricante"],correct:1,expl:"A escada Challenge & Response segue uma ordem precisa: observar/reportar, depois repetir/propor, e só depois escalar se necessário."},
    {q:"Por que é que a comunicação não estruturada agravou a situação a bordo do Kaitaki?",opts:["Não teve qualquer efeito documentado","Contribuiu para a falta de coordenação clara durante a fase crítica, prolongando o incidente","Permitiu uma resolução mais rápida","Só dizia respeito à ponte, não à casa das máquinas"],correct:1,expl:"O relatório de investigação liga a falta de comunicação estruturada à dificuldade de coordenar uma resposta eficaz durante a emergência."},
    {q:"Que princípio o ETO tipicamente incarna na equipa de máquinas?",opts:["A coordenação geral do quarto","O ponto de referência para qualquer anomalia elétrica ou de controlo","A decisão final numa emergência maior","A execução das rondas físicas"],correct:1,expl:"O ETO é responsável pelos sistemas elétricos, automação e diagnósticos, e constitui o ponto de referência nestas áreas."},
    {q:"Como é que a coordenação de equipa na casa das máquinas (L2) complementa o fator humano individual visto em L1?",opts:["Substitui-o completamente","Acrescenta a dimensão coletiva: mesmo indivíduos vigilantes podem falhar se a equipa não coordenar as suas informações e ações","Não tem relação com L1","Só diz respeito aos oficiais seniores"],correct:1,expl:"L1 trata do fator humano individual (fadiga, viés, assertividade); L2 mostra que mesmo indivíduos competentes podem falhar coletivamente sem coordenação estruturada."},
    {q:"Qual é a boa prática se dois membros da equipa de máquinas começarem a executar a mesma ação sem saberem durante uma emergência?",opts:["Cada um continua por seu lado, não faz mal","Comunicar imediatamente para esclarecer quem faz o quê e evitar redundância ou contradição","Deixar o mais rápido terminar primeiro","Parar toda a ação até nova ordem"],correct:1,expl:"A redundância ou contradição de ações não coordenadas atrasa a resolução — esclarecer imediatamente as funções evita esta perda crítica de tempo."},
  ],
};

// ══════════════════════════════════════
// QUIZ — FINAL (5 QUESTIONS)
// ══════════════════════════════════════
export const QUIZ = {
  fr:[
    {q:"Que montre principalement le cas du ferry Kaitaki (2023) ?",opts:["Qu'un composant technique ne peut jamais être en cause","Qu'une avarie technique gérable peut devenir une crise prolongée sans coordination d'équipe claire","Que la coordination n'a aucun effet sur la durée d'un incident","Que le blackout était inévitable"],correct:1,expl:"Le rapport TAIC identifie l'absence de structure de rôles claire pendant l'urgence comme facteur central de la durée de l'incident."},
    {q:"Selon l'échelle Challenge & Response, que faire si une première alerte ne provoque aucune réaction claire ?",opts:["Abandonner","Répéter clairement l'observation et proposer une action précise","Attendre la fin du quart","Changer de sujet"],correct:1,expl:"L'échelle impose de répéter et de proposer une action avant d'escalader ou d'abandonner."},
    {q:"Qu'est-ce que la conscience de situation partagée ?",opts:["Une checklist officielle","La combinaison des observations individuelles pour révéler un danger que personne ne voit seul","Un système d'alarme automatique","Une règle STCW"],correct:1,expl:"Un danger réel peut n'apparaître qu'en combinant plusieurs observations isolées et mineures."},
    {q:"Quel rôle sert typiquement d'intermédiaire entre l'équipe de quart machine et le chef mécanicien ?",opts:["L'ETO","Le graisseur","Le second mécanicien","Le commandant"],correct:2,expl:"Le second mécanicien coordonne le quart et fait le lien avec le chef mécanicien."},
    {q:"Pourquoi une équipe en 'chaos organisé' est-elle plus lente qu'une équipe coordonnée ?",opts:["Plus de personnes signifie toujours plus de rapidité","L'absence de rôles clairs entraîne des actions redondantes ou contradictoires","Le chaos organisé est une méthode reconnue","Cela n'a aucun effet"],correct:1,expl:"Sans répartition claire des rôles, plusieurs personnes peuvent tenter la même action ou s'annuler mutuellement."},
  ],
  en:[
    {q:"What does the Kaitaki ferry case (2023) mainly show?",opts:["That a technical component can never be at fault","That a manageable technical fault can become a prolonged crisis without clear team coordination","That coordination has no effect on incident duration","That the blackout was unavoidable"],correct:1,expl:"The TAIC report identifies the absence of a clear role structure during the emergency as a central factor in how long the incident lasted."},
    {q:"According to the Challenge & Response ladder, what should you do if a first alert gets no clear reaction?",opts:["Give up","Clearly repeat the observation and propose a specific action","Wait until the end of the watch","Change the subject"],correct:1,expl:"The ladder requires repeating and proposing an action before escalating or giving up."},
    {q:"What is shared situational awareness?",opts:["An official checklist","The combination of individual observations to reveal a danger no one sees alone","An automatic alarm system","An STCW rule"],correct:1,expl:"A real danger may only appear when several isolated, minor observations are combined."},
    {q:"Which role typically acts as the link between the engine watch team and the chief engineer?",opts:["The ETO","The oiler","The second engineer","The master"],correct:2,expl:"The second engineer coordinates the watch and links to the chief engineer."},
    {q:"Why is a team in 'organised chaos' slower than a coordinated team?",opts:["More people always means more speed","The absence of clear roles leads to redundant or contradictory actions","Organised chaos is a recognized method","It has no effect"],correct:1,expl:"Without clear role division, several people may attempt the same action or cancel each other out."},
  ],
  es:[
    {q:"¿Qué muestra principalmente el caso del ferry Kaitaki (2023)?",opts:["Que un componente técnico nunca puede ser la causa","Que una avería técnica manejable puede convertirse en una crisis prolongada sin coordinación de equipo clara","Que la coordinación no tiene efecto en la duración de un incidente","Que el apagón era inevitable"],correct:1,expl:"El informe TAIC identifica la ausencia de una estructura clara de roles durante la emergencia como factor central en la duración del incidente."},
    {q:"Según la escalera Challenge & Response, ¿qué hacer si una primera alerta no provoca reacción clara?",opts:["Rendirse","Repetir claramente la observación y proponer una acción concreta","Esperar al final de la guardia","Cambiar de tema"],correct:1,expl:"La escalera exige repetir y proponer una acción antes de escalar o rendirse."},
    {q:"¿Qué es la conciencia de situación compartida?",opts:["Una lista de verificación oficial","La combinación de observaciones individuales para revelar un peligro que nadie ve solo","Un sistema de alarma automático","Una regla STCW"],correct:1,expl:"Un peligro real puede aparecer solo al combinar varias observaciones aisladas y menores."},
    {q:"¿Qué rol suele servir de enlace entre el equipo de guardia de máquinas y el jefe de máquinas?",opts:["El ETO","El engrasador","El segundo maquinista","El capitán"],correct:2,expl:"El segundo maquinista coordina la guardia y sirve de enlace con el jefe de máquinas."},
    {q:"¿Por qué un equipo en 'caos organizado' es más lento que un equipo coordinado?",opts:["Más personas siempre significa más rapidez","La ausencia de roles claros provoca acciones redundantes o contradictorias","El caos organizado es un método reconocido","No tiene efecto"],correct:1,expl:"Sin una división clara de roles, varias personas pueden intentar la misma acción o anularse mutuamente."},
  ],
  pt:[
    {q:"O que mostra principalmente o caso do ferry Kaitaki (2023)?",opts:["Que um componente técnico nunca pode ser a causa","Que uma avaria técnica gerível pode tornar-se uma crise prolongada sem coordenação de equipa clara","Que a coordenação não tem efeito na duração de um incidente","Que o blackout era inevitável"],correct:1,expl:"O relatório TAIC identifica a ausência de uma estrutura clara de funções durante a emergência como fator central na duração do incidente."},
    {q:"Segundo a escada Challenge & Response, o que fazer se um primeiro alerta não provocar reação clara?",opts:["Desistir","Repetir claramente a observação e propor uma ação concreta","Esperar pelo fim do quarto","Mudar de assunto"],correct:1,expl:"A escada exige repetir e propor uma ação antes de escalar ou desistir."},
    {q:"O que é a consciência de situação partilhada?",opts:["Uma checklist oficial","A combinação de observações individuais para revelar um perigo que ninguém vê sozinho","Um sistema de alarme automático","Uma regra STCW"],correct:1,expl:"Um perigo real pode só aparecer ao combinar várias observações isoladas e menores."},
    {q:"Que função serve tipicamente de ligação entre a equipa de quarto de máquinas e o chefe de máquinas?",opts:["O ETO","O lubrificador","O segundo maquinista","O comandante"],correct:2,expl:"O segundo maquinista coordena o quarto e faz a ligação com o chefe de máquinas."},
    {q:"Por que é que uma equipa em 'caos organizado' é mais lenta do que uma equipa coordenada?",opts:["Mais pessoas significa sempre mais rapidez","A ausência de funções claras leva a ações redundantes ou contraditórias","O caos organizado é um método reconhecido","Não tem efeito"],correct:1,expl:"Sem uma divisão clara de funções, várias pessoas podem tentar a mesma ação ou anular-se mutuamente."},
  ],
};

// ══════════════════════════════════════
// SAFETY REFLECTION (permanent Safety Dept feature)
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Repense à un quart machine où plusieurs personnes travaillaient en même temps. Les rôles étaient-ils clairs ? Qu'aurait changé une meilleure conscience de situation partagée ?",
    en:"Think of an engine watch where several people were working at the same time. Were roles clear? What would better shared situational awareness have changed?",
    es:"Piensa en una guardia de máquinas en la que varias personas trabajaban al mismo tiempo. ¿Estaban claros los roles? ¿Qué habría cambiado una mejor conciencia de situación compartida?",
    pt:"Pensa num quarto de máquinas em que várias pessoas trabalhavam ao mesmo tempo. As funções estavam claras? O que teria mudado uma melhor consciência de situação partilhada?",
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
        {lang==="fr"?"Il n'y a pas de bonne réponse — prends un instant pour y réfléchir.":lang==="en"?"There is no right answer — take a moment to reflect.":lang==="es"?"No hay una respuesta correcta — tómate un momento para reflexionar.":"Não há uma resposta certa — reserva um momento para refletir."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"⚙️ Safety · Engine Room Resource Management · Leçon 2/6 · ⭐ Premium",
      title:"Coordination d'Équipe en Salle des Machines",
      intro:"L1 a montré comment un individu peut échouer — fatigue, biais d'alarme, silence hiérarchique. Cette leçon montre qu'une équipe entière peut échouer collectivement, même quand chaque membre pris isolément est compétent.\n\nC'est le deuxième pilier de l'ERM : la coordination, les rôles clairs, et la conscience de situation partagée entre tous les membres de la salle des machines.",
      p0:"POURQUOI LA COORDINATION COMPTE AUTANT QUE LA COMPÉTENCE",s0t:"Une équipe de spécialistes n'est pas automatiquement une équipe coordonnée",
      s0:"Avoir les bonnes compétences individuelles ne suffit pas si l'équipe ne partage pas l'information et ne coordonne pas ses actions.\n\nCOMMENT PRÉVENIR L'AGGRAVATION ? En structurant clairement qui fait quoi avant que l'urgence ne survienne.\nQUE FAIRE QUAND PLUSIEURS PERSONNES RÉAGISSENT EN MÊME TEMPS ? Clarifier immédiatement les rôles pour éviter la redondance.\nQUELLE LEÇON RETENIR ? Une équipe désorganisée peut transformer une avarie gérable en crise prolongée.",
      p1:"LA CARTE DES RÔLES EN SALLE DES MACHINES",s1t:"Qui fait quoi, et pourquoi ça compte",
      s1:"Chaque rôle en salle des machines a une responsabilité précise dans la détection et la remontée d'une anomalie. Connaître clairement ces rôles évite la confusion au moment critique.",
      p2:"L'ÉCHELLE CHALLENGE & RESPONSE",s2t:"Observer, répéter, escalader",
      s2:"Face à une dérive qui ne provoque pas de réaction claire, l'échelle Challenge & Response structure la façon de faire remonter l'information : observer et signaler, puis répéter et proposer une action, puis escalader si nécessaire.",
      p3:"LA CONSCIENCE DE SITUATION PARTAGÉE",s3t:"Le danger que personne ne voit seul",
      s3:"Plusieurs observations mineures, prises isolément, semblent sans conséquence. Combinées, elles peuvent révéler un danger réel. C'est pourquoi partager activement ses observations, même mineures, fait partie du travail d'équipe.",
      p4:"🎯 EXERCICE OPÉRATIONNEL",p5:"⚠️ CAS RÉEL",p6:"📝 BANQUE DE 15 QUESTIONS",p7:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 2",
      sumP:["Une équipe compétente individuellement peut échouer collectivement sans coordination","Chaque rôle en salle des machines a une responsabilité précise dans la remontée d'une anomalie","L'échelle Challenge & Response structure l'escalade d'une préoccupation","La conscience de situation partagée révèle un danger que personne ne voit seul","Le chaos organisé (tout le monde fait tout) ralentit la résolution plutôt que de l'accélérer"],
      learnedP:["La carte des rôles en salle des machines","L'échelle Challenge & Response","La conscience de situation partagée","Le cas du ferry Kaitaki (2023)","Pourquoi la coordination complète le facteur humain individuel"],
      safetyMsg:"Une équipe compétente sans coordination n'est qu'une collection d'individus qui espèrent. La coordination transforme des compétences individuelles en sécurité collective.",
    },
    en:{
      badge:"⚙️ Safety · Engine Room Resource Management · Lesson 2/6 · ⭐ Premium",
      title:"Engine Room Team Coordination",
      intro:"L1 showed how an individual can fail — fatigue, alarm bias, hierarchical silence. This lesson shows that an entire team can fail collectively, even when each member taken alone is competent.\n\nThis is the second pillar of ERM: coordination, clear roles, and shared situational awareness among all engine room team members.",
      p0:"WHY COORDINATION MATTERS AS MUCH AS COMPETENCE",s0t:"A team of specialists is not automatically a coordinated team",
      s0:"Having the right individual skills is not enough if the team does not share information and coordinate its actions.\n\nHOW TO PREVENT ESCALATION? By clearly structuring who does what before the emergency occurs.\nWHAT TO DO WHEN SEVERAL PEOPLE REACT AT THE SAME TIME? Immediately clarify roles to avoid redundancy.\nWHAT LESSON TO RETAIN? A disorganized team can turn a manageable fault into a prolonged crisis.",
      p1:"THE ENGINE ROOM ROLES MAP",s1t:"Who does what, and why it matters",
      s1:"Each role in the engine room has a specific responsibility in detecting and reporting an anomaly. Clearly knowing these roles avoids confusion at the critical moment.",
      p2:"THE CHALLENGE & RESPONSE LADDER",s2t:"Observe, repeat, escalate",
      s2:"Facing a drift that gets no clear reaction, the Challenge & Response ladder structures how to raise information: observe and report, then repeat and propose an action, then escalate if necessary.",
      p3:"SHARED SITUATIONAL AWARENESS",s3t:"The danger no one sees alone",
      s3:"Several minor observations, taken in isolation, seem inconsequential. Combined, they can reveal a real danger. This is why actively sharing observations, even minor ones, is part of teamwork.",
      p4:"🎯 OPERATIONAL EXERCISE",p5:"⚠️ REAL CASUALTY CASE",p6:"📝 15-QUESTION BANK",p7:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 2",
      sumP:["An individually competent team can fail collectively without coordination","Each role in the engine room has a specific responsibility in reporting an anomaly","The Challenge & Response ladder structures the escalation of a concern","Shared situational awareness reveals a danger no one sees alone","Organised chaos (everyone doing everything) slows resolution instead of speeding it up"],
      learnedP:["The engine room roles map","The Challenge & Response ladder","Shared situational awareness","The Kaitaki ferry case (2023)","How coordination complements the individual human factor"],
      safetyMsg:"A competent team without coordination is just a collection of individuals hoping for the best. Coordination turns individual skills into collective safety.",
    },
    es:{
      badge:"⚙️ Seguridad · Engine Room Resource Management · Lección 2/6 · ⭐ Premium",
      title:"Coordinación de Equipo en la Sala de Máquinas",
      intro:"L1 mostró cómo un individuo puede fallar — fatiga, sesgo de alarma, silencio jerárquico. Esta lección muestra que todo un equipo puede fallar colectivamente, incluso cuando cada miembro por separado es competente.\n\nEste es el segundo pilar del ERM: la coordinación, los roles claros y la conciencia de situación compartida entre todos los miembros de la sala de máquinas.",
      p0:"POR QUÉ LA COORDINACIÓN IMPORTA TANTO COMO LA COMPETENCIA",s0t:"Un equipo de especialistas no es automáticamente un equipo coordinado",
      s0:"Tener las habilidades individuales adecuadas no basta si el equipo no comparte información y no coordina sus acciones.\n\n¿CÓMO PREVENIR EL AGRAVAMIENTO? Estructurando claramente quién hace qué antes de que ocurra la emergencia.\n¿QUÉ HACER CUANDO VARIAS PERSONAS REACCIONAN AL MISMO TIEMPO? Aclarar de inmediato los roles para evitar redundancia.\n¿QUÉ LECCIÓN RETENER? Un equipo desorganizado puede convertir una avería manejable en una crisis prolongada.",
      p1:"EL MAPA DE ROLES EN LA SALA DE MÁQUINAS",s1t:"Quién hace qué, y por qué importa",
      s1:"Cada rol en la sala de máquinas tiene una responsabilidad precisa en la detección y el reporte de una anomalía. Conocer claramente estos roles evita la confusión en el momento crítico.",
      p2:"LA ESCALERA CHALLENGE & RESPONSE",s2t:"Observar, repetir, escalar",
      s2:"Ante una deriva que no provoca una reacción clara, la escalera Challenge & Response estructura cómo elevar la información: observar y reportar, luego repetir y proponer una acción, luego escalar si es necesario.",
      p3:"LA CONCIENCIA DE SITUACIÓN COMPARTIDA",s3t:"El peligro que nadie ve solo",
      s3:"Varias observaciones menores, tomadas aisladamente, parecen intrascendentes. Combinadas, pueden revelar un peligro real. Por eso compartir activamente las observaciones, incluso las menores, forma parte del trabajo en equipo.",
      p4:"🎯 EJERCICIO OPERATIVO",p5:"⚠️ CASO REAL",p6:"📝 BANCO DE 15 PREGUNTAS",p7:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 2",
      sumP:["Un equipo individualmente competente puede fallar colectivamente sin coordinación","Cada rol en la sala de máquinas tiene una responsabilidad precisa en el reporte de una anomalía","La escalera Challenge & Response estructura la escalada de una preocupación","La conciencia de situación compartida revela un peligro que nadie ve solo","El caos organizado (todos hacen todo) ralentiza la resolución en lugar de acelerarla"],
      learnedP:["El mapa de roles en la sala de máquinas","La escalera Challenge & Response","La conciencia de situación compartida","El caso del ferry Kaitaki (2023)","Cómo la coordinación complementa el factor humano individual"],
      safetyMsg:"Un equipo competente sin coordinación es solo una colección de individuos que esperan lo mejor. La coordinación convierte las habilidades individuales en seguridad colectiva.",
    },
    pt:{
      badge:"⚙️ Segurança · Engine Room Resource Management · Lição 2/6 · ⭐ Premium",
      title:"Coordenação da Equipa na Casa das Máquinas",
      intro:"A L1 mostrou como um indivíduo pode falhar — fadiga, viés de alarme, silêncio hierárquico. Esta lição mostra que uma equipa inteira pode falhar coletivamente, mesmo quando cada membro isoladamente é competente.\n\nEste é o segundo pilar do ERM: a coordenação, as funções claras e a consciência de situação partilhada entre todos os membros da casa das máquinas.",
      p0:"POR QUE A COORDENAÇÃO IMPORTA TANTO COMO A COMPETÊNCIA",s0t:"Uma equipa de especialistas não é automaticamente uma equipa coordenada",
      s0:"Ter as competências individuais certas não basta se a equipa não partilhar informação e não coordenar as suas ações.\n\nCOMO PREVENIR O AGRAVAMENTO? Estruturando claramente quem faz o quê antes de a emergência ocorrer.\nO QUE FAZER QUANDO VÁRIAS PESSOAS REAGEM AO MESMO TEMPO? Esclarecer imediatamente as funções para evitar redundância.\nQUE LIÇÃO RETER? Uma equipa desorganizada pode transformar uma avaria gerível numa crise prolongada.",
      p1:"O MAPA DE FUNÇÕES NA CASA DAS MÁQUINAS",s1t:"Quem faz o quê, e por que importa",
      s1:"Cada função na casa das máquinas tem uma responsabilidade precisa na deteção e no reporte de uma anomalia. Conhecer claramente estas funções evita confusão no momento crítico.",
      p2:"A ESCADA CHALLENGE & RESPONSE",s2t:"Observar, repetir, escalar",
      s2:"Perante um desvio que não provoca reação clara, a escada Challenge & Response estrutura a forma de fazer subir a informação: observar e reportar, depois repetir e propor uma ação, depois escalar se necessário.",
      p3:"A CONSCIÊNCIA DE SITUAÇÃO PARTILHADA",s3t:"O perigo que ninguém vê sozinho",
      s3:"Várias observações menores, tomadas isoladamente, parecem sem consequência. Combinadas, podem revelar um perigo real. É por isso que partilhar ativamente as observações, mesmo as menores, faz parte do trabalho de equipa.",
      p4:"🎯 EXERCÍCIO OPERACIONAL",p5:"⚠️ CASO REAL",p6:"📝 BANCO DE 15 PERGUNTAS",p7:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 2",
      sumP:["Uma equipa individualmente competente pode falhar coletivamente sem coordenação","Cada função na casa das máquinas tem uma responsabilidade precisa no reporte de uma anomalia","A escada Challenge & Response estrutura o escalonamento de uma preocupação","A consciência de situação partilhada revela um perigo que ninguém vê sozinho","O caos organizado (todos fazem tudo) atrasa a resolução em vez de a acelerar"],
      learnedP:["O mapa de funções na casa das máquinas","A escada Challenge & Response","A consciência de situação partilhada","O caso do ferry Kaitaki (2023)","Como a coordenação complementa o fator humano individual"],
      safetyMsg:"Uma equipa competente sem coordenação é apenas uma coleção de indivíduos à espera do melhor. A coordenação transforma competências individuais em segurança coletiva.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1E_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/6":lang==="en"?"Lesson 2/6":lang==="es"?"Lección 2/6":"Lição 2/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold2,fontWeight:700}}>⭐</div>
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

            <SL icon="🗺️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🗺️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🗺️ {lang==="fr"?"CARTE DES RÔLES — INTERACTIF":lang==="en"?"ROLES MAP — INTERACTIVE":lang==="es"?"MAPA DE ROLES — INTERACTIVO":"MAPA DE FUNÇÕES — INTERATIVO"}</div><RolesMapSVG lang={lang}/></Card>

            <SL icon="🪜" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🪜</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🪜 {lang==="fr"?"CHALLENGE & RESPONSE — INTERACTIF":lang==="en"?"CHALLENGE & RESPONSE — INTERACTIVE":lang==="es"?"CHALLENGE & RESPONSE — INTERACTIVO":"CHALLENGE & RESPONSE — INTERATIVO"}</div><ChallengeResponseSVG lang={lang}/></Card>

            <SL icon="🧩" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧩</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧩 {lang==="fr"?"CONSCIENCE PARTAGÉE — INTERACTIF":lang==="en"?"SHARED AWARENESS — INTERACTIVE":lang==="es"?"CONCIENCIA COMPARTIDA — INTERACTIVO":"CONSCIÊNCIA PARTILHADA — INTERATIVO"}</div><SharedAwarenessSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p4} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p5} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p7} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final — Coordination d'Équipe":lang==="en"?"Final Quiz — Team Coordination":lang==="es"?"Quiz Final — Coordinación de Equipo":"Quiz Final — Coordenação de Equipa"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 2/6":lang==="en"?"questions · Lesson 2/6":lang==="es"?"preguntas · Lección 2/6":"perguntas · Lição 2/6"}</div>
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
                <span style={{fontSize:20}}>⚙️</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 — ACTIONS D'URGENCE →":lang==="en"?"LESSON 3 — EMERGENCY ACTIONS →":lang==="es"?"LECCIÓN 3 — ACCIONES DE EMERGENCIA →":"LIÇÃO 3 — AÇÕES DE EMERGÊNCIA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
