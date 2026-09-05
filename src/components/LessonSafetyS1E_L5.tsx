import { useState, useEffect } from "react";
import { shuffleQuestionOptions, C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — THE TRADE-OFF (RUN VS STOP)
// ══════════════════════════════════════
function TradeoffSVG({ lang }) {
  const [side, setSide] = useState("run");
  const d = {
    run:{fr:"Continuer à faire tourner le moteur quelques minutes de plus pour terminer une manœuvre en cours, malgré un paramètre légèrement anormal.",en:"Keep the engine running a few more minutes to finish an ongoing maneuver, despite a slightly abnormal parameter.",es:"Seguir haciendo funcionar el motor unos minutos más para terminar una maniobra en curso, pese a un parámetro ligeramente anormal.",pt:"Continuar a fazer funcionar o motor mais alguns minutos para terminar uma manobra em curso, apesar de um parâmetro ligeiramente anormal."},
    stop:{fr:"Arrêter immédiatement, quitte à perdre le contrôle de la manœuvre en cours, pour éviter tout risque d'aggravation du défaut.",en:"Stop immediately, even at the cost of losing control of the ongoing maneuver, to avoid any risk of the fault worsening.",es:"Detener de inmediato, aunque suponga perder el control de la maniobra en curso, para evitar cualquier riesgo de que el fallo empeore.",pt:"Parar imediatamente, mesmo que isso signifique perder o controlo da manobra em curso, para evitar qualquer risco de agravamento da falha."},
  };
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["run","stop"].map(k=>(
          <button key={k} onClick={()=>setSide(k)} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${side===k?C.blue2:"rgba(255,255,255,0.12)"}`,background:side===k?`${C.blue2}22`:"rgba(255,255,255,0.04)",color:side===k?C.blue2:C.muted,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {k==="run"?(lang==="fr"?"⚙️ CONTINUER":lang==="en"?"⚙️ KEEP RUNNING":lang==="es"?"⚙️ CONTINUAR":"⚙️ CONTINUAR"):(lang==="fr"?"🛑 ARRÊTER":lang==="en"?"🛑 STOP":lang==="es"?"🛑 DETENER":"🛑 PARAR")}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:12,background:side==="run"?"rgba(230,126,34,0.1)":"rgba(26,111,212,0.1)",border:`1px solid ${side==="run"?C.orange:C.blue2}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{d[side][lang]||d[side].fr}</div>
      <div style={{marginTop:8,fontSize:11,color:C.gold2,lineHeight:1.6,fontStyle:"italic"}}>
        {lang==="fr"?"⚡ Il n'y a pas de réponse universelle — la bonne décision dépend de la gravité réelle du paramètre, du contexte de manœuvre, et de la marge de sécurité restante. Le vrai risque est de décider sans avoir évalué ces trois éléments.":
         lang==="en"?"⚡ There is no universal answer — the right decision depends on the actual severity of the parameter, the maneuvering context, and the remaining safety margin. The real risk is deciding without having assessed these three elements.":
         lang==="es"?"⚡ No hay una respuesta universal — la decisión correcta depende de la gravedad real del parámetro, del contexto de maniobra y del margen de seguridad restante. El verdadero riesgo es decidir sin haber evaluado estos tres elementos.":
         "⚡ Não há uma resposta universal — a decisão certa depende da gravidade real do parâmetro, do contexto de manobra e da margem de segurança restante. O verdadeiro risco é decidir sem ter avaliado estes três elementos."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — DECIDE ALONE OR ESCALATE
// ══════════════════════════════════════
function AuthorityEscalationSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const levels = [
    { id:1, icon:"👷", color:C.green, label:{fr:"Décision seule",en:"Decide alone",es:"Decidir solo",pt:"Decidir sozinho"},
      desc:{fr:"Actions réversibles et sans risque immédiat pour le navire ou les personnes : ajuster un paramètre de routine, réarmer une alarme après vérification physique.",en:"Reversible actions with no immediate risk to the ship or people: adjusting a routine parameter, resetting an alarm after physical verification.",es:"Acciones reversibles y sin riesgo inmediato para el buque o las personas: ajustar un parámetro de rutina, reiniciar una alarma tras verificación física.",pt:"Ações reversíveis e sem risco imediato para o navio ou pessoas: ajustar um parâmetro de rotina, reiniciar um alarme após verificação física."} },
    { id:2, icon:"🔧", color:C.orange, label:{fr:"Informer et proposer",en:"Inform and propose",es:"Informar y proponer",pt:"Informar e propor"},
      desc:{fr:"Situations ambiguës avec conséquences potentielles modérées : informer le supérieur immédiat, proposer une action, agir si aucune réponse rapide.",en:"Ambiguous situations with moderate potential consequences: inform the immediate superior, propose an action, act if no quick response comes.",es:"Situaciones ambiguas con consecuencias potenciales moderadas: informar al superior inmediato, proponer una acción, actuar si no hay respuesta rápida.",pt:"Situações ambíguas com consequências potenciais moderadas: informar o superior imediato, propor uma ação, agir se não houver resposta rápida."} },
    { id:3, icon:"⭐", color:C.red, label:{fr:"Escalader avant d'agir",en:"Escalate before acting",es:"Escalar antes de actuar",pt:"Escalar antes de agir"},
      desc:{fr:"Décisions à fort enjeu (sécurité du navire, des personnes, arrêt de propulsion en zone à risque) : informer immédiatement le chef mécanicien ou le commandant avant toute action irréversible, sauf urgence vitale immédiate.",en:"High-stakes decisions (ship safety, personnel safety, stopping propulsion in a risk area): immediately inform the chief engineer or master before any irreversible action, unless there is an immediate life-threatening emergency.",es:"Decisiones de alto riesgo (seguridad del buque, de las personas, parada de propulsión en zona de riesgo): informar de inmediato al jefe de máquinas o al capitán antes de cualquier acción irreversible, salvo emergencia vital inmediata.",pt:"Decisões de grande impacto (segurança do navio, das pessoas, paragem de propulsão em zona de risco): informar imediatamente o chefe de máquinas ou o comandante antes de qualquer ação irreversível, salvo emergência vital imediata."} },
  ];
  const sel_ = sel!==null?levels.find(l=>l.id===sel):null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {levels.map(l=>(
          <div key={l.id} onClick={()=>setSel(sel===l.id?null:l.id)}
            style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,cursor:"pointer",
              background:sel===l.id?`${l.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===l.id?l.color:"rgba(255,255,255,0.1)"}`}}>
            <div style={{fontSize:20}}>{l.icon}</div>
            <div style={{fontSize:12,fontWeight:700,color:sel===l.id?l.color:C.white}}>{l.label[lang]||l.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      {!sel_&&<div style={{textAlign:"center",fontSize:10,color:C.muted}}>{lang==="fr"?"Touche un niveau pour voir le seuil de décision":lang==="en"?"Tap a level to see the decision threshold":lang==="es"?"Toca un nivel para ver el umbral de decisión":"Toque num nível para ver o limiar de decisão"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — TUNNEL VISION (FIRST HYPOTHESIS VS ALTERNATIVE)
// ══════════════════════════════════════
function TunnelVisionSVG({ lang }) {
  const [side, setSide] = useState("first");
  const d = {
    first:{fr:"\"Le moteur vient de s'arrêter tout seul en pleine manœuvre — c'est forcément une panne mécanique grave.\"",en:"\"The engine just stopped by itself mid-maneuver — it must be a serious mechanical failure.\"",es:"\"El motor se ha parado solo en plena maniobra — tiene que ser un fallo mecánico grave.\"",pt:"\"O motor parou sozinho a meio da manobra — tem de ser uma falha mecânica grave.\""},
    alt:{fr:"\"Une maintenance a été faite récemment par temps humide — est-ce que ça pourrait être une fausse alarme du détecteur, pas une vraie panne mécanique ?\"",en:"\"Maintenance was recently done in humid weather — could this be a false detector alarm, not an actual mechanical failure?\"",es:"\"Se hizo mantenimiento recientemente con tiempo húmedo — ¿podría ser una falsa alarma del detector, no un fallo mecánico real?\"",pt:"\"Foi feita manutenção recentemente com tempo húmido — será que pode ser um falso alarme do detetor, e não uma falha mecânica real?\""},
  };
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["first","alt"].map(k=>(
          <button key={k} onClick={()=>setSide(k)} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${side===k?C.teal:"rgba(255,255,255,0.12)"}`,background:side===k?`${C.teal}22`:"rgba(255,255,255,0.04)",color:side===k?C.teal:C.muted,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {k==="first"?(lang==="fr"?"🎯 PREMIÈRE HYPOTHÈSE":lang==="en"?"🎯 FIRST HYPOTHESIS":lang==="es"?"🎯 PRIMERA HIPÓTESIS":"🎯 PRIMEIRA HIPÓTESE"):(lang==="fr"?"🔍 HYPOTHÈSE ALTERNATIVE":lang==="en"?"🔍 ALTERNATIVE HYPOTHESIS":lang==="es"?"🔍 HIPÓTESIS ALTERNATIVA":"🔍 HIPÓTESE ALTERNATIVA")}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:12,background:side==="first"?"rgba(192,57,43,0.1)":"rgba(10,138,108,0.1)",border:`1px solid ${side==="first"?C.red:C.teal}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{d[side][lang]||d[side].fr}</div>
      <div style={{marginTop:8,fontSize:11,color:C.gold2,lineHeight:1.6,fontStyle:"italic"}}>
        {lang==="fr"?"⚡ Tunnel vision = s'accrocher à la première explication venue sans envisager d'alternative. Se poser rapidement la question 'et si c'était autre chose ?' évite de perdre du temps sur la mauvaise piste.":
         lang==="en"?"⚡ Tunnel vision = clinging to the first explanation that comes to mind without considering an alternative. Quickly asking 'what if it's something else?' avoids wasting time on the wrong track.":
         lang==="es"?"⚡ Visión de túnel = aferrarse a la primera explicación que viene a la mente sin considerar una alternativa. Preguntarse rápidamente '¿y si es otra cosa?' evita perder tiempo en la pista equivocada.":
         "⚡ Visão em túnel = agarrar-se à primeira explicação que surge sem considerar uma alternativa. Perguntar rapidamente 'e se for outra coisa?' evita perder tempo na pista errada."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — OPERATIONAL SCENARIO
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"c",q3:"a",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Le moteur principal s'arrête automatiquement en plein chenal étroit suite à une alarme de détecteur, juste après une maintenance récente en conditions humides. Quelle est ta première réflexion ?\na) C'est forcément une panne mécanique grave, il faut tout démonter\nb) Envisager aussi la possibilité d'une fausse alarme liée à l'humidité post-maintenance\nc) Ignorer l'alarme et relancer immédiatement sans vérification"},
      {id:"q2",q:"Le paramètre est ambigu et les conséquences d'une mauvaise décision sont potentiellement sérieuses (zone resserrée). Que fais-tu ?\na) Décider seul sans en parler à personne\nb) Attendre indéfiniment sans agir ni informer\nc) Informer immédiatement le niveau supérieur avant toute action irréversible"},
      {id:"q3",q:"Pourquoi éviter de s'accrocher à la première explication venue face à un arrêt automatique inattendu ?\na) Parce que la vraie cause peut être différente et l'action corrective doit correspondre à la vraie cause\nb) Parce que la première explication est toujours fausse\nc) Cela n'a aucune importance pratique"},
      {id:"q4",q:"Quelle action relève typiquement d'une décision que tu peux prendre seul, sans escalade ?\na) Arrêter la propulsion en zone resserrée\nb) Réarmer une alarme de routine après vérification physique complète\nc) Décider de dérouter le navire"},
    ],
    en:[
      {id:"q1",q:"The main engine shuts down automatically in a narrow channel following a detector alarm, right after recent maintenance in humid conditions. What is your first thought?\na) It must be a serious mechanical failure, everything needs to be dismantled\nb) Also consider the possibility of a false alarm linked to post-maintenance humidity\nc) Ignore the alarm and restart immediately without checking"},
      {id:"q2",q:"The parameter is ambiguous and the consequences of a wrong decision are potentially serious (narrow area). What do you do?\na) Decide alone without telling anyone\nb) Wait indefinitely without acting or informing\nc) Immediately inform the next level up before any irreversible action"},
      {id:"q3",q:"Why avoid clinging to the first explanation that comes to mind facing an unexpected automatic shutdown?\na) Because the real cause may be different and the corrective action must match the real cause\nb) Because the first explanation is always wrong\nc) It has no practical importance"},
      {id:"q4",q:"Which action typically falls under a decision you can make alone, without escalation?\na) Stopping propulsion in a narrow area\nb) Resetting a routine alarm after full physical verification\nc) Deciding to divert the ship"},
    ],
    es:[
      {id:"q1",q:"El motor principal se detiene automáticamente en un canal estrecho tras una alarma del detector, justo después de un mantenimiento reciente en condiciones húmedas. ¿Cuál es tu primera reflexión?\na) Tiene que ser un fallo mecánico grave, hay que desmontar todo\nb) Considerar también la posibilidad de una falsa alarma ligada a la humedad tras el mantenimiento\nc) Ignorar la alarma y reiniciar de inmediato sin verificar"},
      {id:"q2",q:"El parámetro es ambiguo y las consecuencias de una decisión equivocada son potencialmente graves (zona estrecha). ¿Qué haces?\na) Decidir solo sin hablar con nadie\nb) Esperar indefinidamente sin actuar ni informar\nc) Informar de inmediato al nivel superior antes de cualquier acción irreversible"},
      {id:"q3",q:"¿Por qué evitar aferrarse a la primera explicación que viene a la mente ante una parada automática inesperada?\na) Porque la causa real puede ser distinta y la acción correctiva debe corresponder a la causa real\nb) Porque la primera explicación siempre es falsa\nc) No tiene ninguna importancia práctica"},
      {id:"q4",q:"¿Qué acción corresponde típicamente a una decisión que puedes tomar solo, sin escalar?\na) Detener la propulsión en zona estrecha\nb) Reiniciar una alarma de rutina tras verificación física completa\nc) Decidir desviar el buque"},
    ],
    pt:[
      {id:"q1",q:"O motor principal para automaticamente num canal estreito na sequência de um alarme do detetor, logo após uma manutenção recente em condições húmidas. Qual é a tua primeira reflexão?\na) Tem de ser uma falha mecânica grave, é preciso desmontar tudo\nb) Considerar também a possibilidade de um falso alarme ligado à humidade pós-manutenção\nc) Ignorar o alarme e reiniciar de imediato sem verificar"},
      {id:"q2",q:"O parâmetro é ambíguo e as consequências de uma decisão errada são potencialmente sérias (zona estreita). O que fazes?\na) Decidir sozinho sem falar com ninguém\nb) Esperar indefinidamente sem agir nem informar\nc) Informar imediatamente o nível superior antes de qualquer ação irreversível"},
      {id:"q3",q:"Por que evitar agarrar-se à primeira explicação que surge perante uma paragem automática inesperada?\na) Porque a causa real pode ser diferente e a ação corretiva deve corresponder à causa real\nb) Porque a primeira explicação é sempre falsa\nc) Não tem qualquer importância prática"},
      {id:"q4",q:"Que ação corresponde tipicamente a uma decisão que podes tomar sozinho, sem escalar?\na) Parar a propulsão em zona estreita\nb) Reiniciar um alarme de rotina após verificação física completa\nc) Decidir desviar o navio"},
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
        {lang==="fr"?"✅ Q1: b — envisager une fausse alarme évite le tunnel vision\n✅ Q2: c — informer avant toute action irréversible en cas d'enjeu fort\n✅ Q3: a — la vraie cause détermine la bonne action corrective\n✅ Q4: b — une vérification de routine déjà validée physiquement reste une décision autonome":
         lang==="en"?"✅ Q1: b — considering a false alarm avoids tunnel vision\n✅ Q2: c — inform before any irreversible action when stakes are high\n✅ Q3: a — the real cause determines the correct corrective action\n✅ Q4: b — a routine check already physically validated remains an autonomous decision":
         "✅ Q1: b · Q2: c · Q3: a · Q4: b"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — DAMGRACHT / AP REVELIN
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Damgracht / AP Revelin — Sabine Pass, Texas (21 août 2022)",teaser:"Fausse alarme détecteur · Perte de propulsion en chenal · Collision · Rapport NTSB MIR-23-16",
      what:"Le cargo Damgracht remonte le chenal étroit de Sabine Pass lorsque son moteur principal s'arrête automatiquement suite à une alarme du détecteur de brouillard d'huile. L'enquête établira que cette alarme était probablement une fausse alerte, déclenchée par de la vapeur d'eau confondue avec du brouillard d'huile — une conséquence directe d'une maintenance récente (remplacement d'un joint de culasse) effectuée par forte humidité. Privé de propulsion en plein chenal, le Damgracht entre en collision avec l'AP Revelin qui naviguait en sens inverse.",
      cause:"• Arrêt automatique déclenché par une alarme de détecteur de brouillard d'huile probablement fausse\n• Vapeur d'eau, issue d'une maintenance récente en conditions humides, confondue avec du brouillard d'huile\n• Perte de propulsion au pire moment possible : en plein chenal étroit, sans marge de manœuvre\n• Système de sécurité automatique retirant le contrôle humain à un moment critique de navigation",
      lessons:"✓ Un système de sécurité automatique peut retirer le contrôle humain au pire moment possible — l'équipe machine doit être prête à réagir instantanément à une décision qu'elle n'a pas prise\n✓ Une maintenance récente change le contexte de fiabilité de certains capteurs — en tenir compte dans l'interprétation d'une alarme qui suit\n✓ Le contexte de navigation (chenal étroit) transforme une perte de propulsion ordinaire en situation à très haut risque\n✓ Documenter et comprendre la cause réelle après coup permet d'éviter la répétition d'un même scénario",
      link:"🔗 Le rapport officiel NTSB MIR-23-16 (publié le 1er août 2023) documente la séquence complète de l'incident et sa cause probable."},
    en:{title:"Damgracht / AP Revelin — Sabine Pass, Texas (21 August 2022)",teaser:"False detector alarm · Loss of propulsion in a channel · Collision · NTSB Report MIR-23-16",
      what:"The cargo ship Damgracht was transiting the narrow Sabine Pass channel when its main engine automatically shut down following an oil mist detector alarm. The investigation would establish that this alarm was likely a false alert, triggered by water vapor mistaken for oil mist — a direct consequence of recent maintenance (a cylinder head gasket replacement) carried out in high-humidity conditions. Deprived of propulsion in the middle of the channel, the Damgracht collided with the AP Revelin, which was navigating in the opposite direction.",
      cause:"• Automatic shutdown triggered by a likely false oil mist detector alarm\n• Water vapor, resulting from recent maintenance in humid conditions, mistaken for oil mist\n• Loss of propulsion at the worst possible moment: in the middle of a narrow channel, with no maneuvering margin\n• An automatic safety system removing human control at a critical navigation moment",
      lessons:"✓ An automatic safety system can remove human control at the worst possible moment — the engine team must be ready to react instantly to a decision it did not make\n✓ Recent maintenance changes the reliability context of certain sensors — this must be factored into interpreting a subsequent alarm\n✓ The navigation context (narrow channel) turns an ordinary loss of propulsion into a very high-risk situation\n✓ Documenting and understanding the real cause afterward helps prevent the same scenario from repeating",
      link:"🔗 The official NTSB report MIR-23-16 (published August 1, 2023) documents the full sequence of the incident and its probable cause."},
    es:{title:"Damgracht / AP Revelin — Sabine Pass, Texas (21 de agosto de 2022)",teaser:"Falsa alarma del detector · Pérdida de propulsión en un canal · Colisión · Informe NTSB MIR-23-16",
      what:"El buque de carga Damgracht transitaba el estrecho canal de Sabine Pass cuando su motor principal se detuvo automáticamente tras una alarma del detector de brumas de aceite. La investigación establecería que esta alarma fue probablemente una falsa alerta, provocada por vapor de agua confundido con bruma de aceite — una consecuencia directa de un mantenimiento reciente (sustitución de una junta de culata) realizado en condiciones de alta humedad. Privado de propulsión en pleno canal, el Damgracht colisionó con el AP Revelin, que navegaba en sentido contrario.",
      cause:"• Parada automática provocada por una alarma del detector de bruma de aceite probablemente falsa\n• Vapor de agua, resultado de un mantenimiento reciente en condiciones húmedas, confundido con bruma de aceite\n• Pérdida de propulsión en el peor momento posible: en pleno canal estrecho, sin margen de maniobra\n• Un sistema de seguridad automático que retira el control humano en un momento crítico de navegación",
      lessons:"✓ Un sistema de seguridad automático puede retirar el control humano en el peor momento posible — el equipo de máquinas debe estar preparado para reaccionar al instante ante una decisión que no tomó él\n✓ Un mantenimiento reciente cambia el contexto de fiabilidad de ciertos sensores — hay que tenerlo en cuenta al interpretar una alarma posterior\n✓ El contexto de navegación (canal estrecho) convierte una pérdida de propulsión ordinaria en una situación de muy alto riesgo\n✓ Documentar y comprender la causa real después ayuda a evitar que se repita el mismo escenario",
      link:"🔗 El informe oficial NTSB MIR-23-16 (publicado el 1 de agosto de 2023) documenta la secuencia completa del incidente y su causa probable."},
    pt:{title:"Damgracht / AP Revelin — Sabine Pass, Texas (21 de agosto de 2022)",teaser:"Falso alarme do detetor · Perda de propulsão num canal · Colisão · Relatório NTSB MIR-23-16",
      what:"O navio de carga Damgracht transitava pelo canal estreito de Sabine Pass quando o seu motor principal parou automaticamente na sequência de um alarme do detetor de nevoeiro de óleo. A investigação estabeleceria que este alarme foi provavelmente um falso alerta, provocado por vapor de água confundido com nevoeiro de óleo — uma consequência direta de uma manutenção recente (substituição de uma junta de cabeça) realizada em condições de humidade elevada. Privado de propulsão a meio do canal, o Damgracht colidiu com o AP Revelin, que navegava em sentido contrário.",
      cause:"• Paragem automática provocada por um alarme do detetor de nevoeiro de óleo provavelmente falso\n• Vapor de água, resultante de uma manutenção recente em condições húmidas, confundido com nevoeiro de óleo\n• Perda de propulsão no pior momento possível: a meio de um canal estreito, sem margem de manobra\n• Um sistema de segurança automático que retira o controlo humano num momento crítico de navegação",
      lessons:"✓ Um sistema de segurança automático pode retirar o controlo humano no pior momento possível — a equipa de máquinas deve estar pronta para reagir instantaneamente a uma decisão que não tomou\n✓ Uma manutenção recente muda o contexto de fiabilidade de certos sensores — isso deve ser tido em conta ao interpretar um alarme seguinte\n✓ O contexto de navegação (canal estreito) transforma uma perda de propulsão comum numa situação de altíssimo risco\n✓ Documentar e compreender a causa real depois ajuda a evitar a repetição do mesmo cenário",
      link:"🔗 O relatório oficial NTSB MIR-23-16 (publicado a 1 de agosto de 2023) documenta a sequência completa do incidente e a sua causa provável."},
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
    {q:"Que montre le cas Damgracht/AP Revelin (2022) ?",opts:["Qu'une fausse alarme n'a jamais de conséquence réelle","Qu'un système de sécurité automatique peut retirer le contrôle humain au pire moment possible, avec des conséquences graves","Que les détecteurs de brouillard d'huile sont toujours fiables à 100%","Que les collisions n'ont jamais de lien avec la salle des machines"],correct:1,expl:"L'arrêt automatique du moteur, déclenché par une probable fausse alarme, a privé le navire de propulsion en plein chenal étroit, menant à la collision."},
    {q:"Pourquoi une maintenance récente doit-elle être prise en compte dans l'interprétation d'une alarme qui suit ?",opts:["Elle n'a aucun rapport avec la fiabilité des capteurs","Elle peut temporairement modifier les conditions (ex : humidité) qui rendent un capteur plus susceptible de déclencher une fausse alarme","La maintenance élimine toujours tout risque de fausse alarme","Seule la météo compte, jamais la maintenance"],correct:1,expl:"Dans le cas Damgracht, une maintenance récente en conditions humides a créé de la vapeur d'eau confondue avec du brouillard d'huile par le détecteur."},
    {q:"Qu'est-ce que le 'tunnel vision' dans une décision sous pression ?",opts:["Une technique d'éclairage en salle des machines","S'accrocher à la première explication venue sans envisager d'alternative","Une procédure officielle de diagnostic","Un type de vision nocturne"],correct:1,expl:"Le tunnel vision consiste à se fixer sur la première hypothèse sans envisager d'autres causes possibles, ce qui peut retarder la bonne action corrective."},
    {q:"Quelle question permet d'éviter le tunnel vision face à un arrêt automatique inattendu ?",opts:["'Qui est responsable de cette panne ?'","'Et si c'était autre chose ?' — envisager activement une hypothèse alternative","'Combien de temps cela va-t-il prendre ?'","Aucune question n'est utile dans l'urgence"],correct:1,expl:"Se demander activement s'il existe une explication alternative (ex : fausse alarme) évite de perdre du temps sur une mauvaise piste."},
    {q:"Quelle action relève typiquement d'une décision que l'on peut prendre seul, sans escalade ?",opts:["Arrêter la propulsion en zone resserrée","Réarmer une alarme de routine après vérification physique complète","Décider de dérouter le navire","Modifier la route du navire"],correct:1,expl:"Les actions réversibles et sans risque immédiat, comme réarmer une alarme après vérification physique, peuvent être décidées sans escalade."},
    {q:"À partir de quel niveau d'enjeu faut-il escalader avant d'agir, sauf urgence vitale immédiate ?",opts:["Jamais, il faut toujours agir seul pour gagner du temps","Quand la décision comporte un enjeu fort pour la sécurité du navire ou des personnes","Uniquement si un supérieur est physiquement présent","Uniquement en fin de quart"],correct:1,expl:"Les décisions à fort enjeu (sécurité du navire, arrêt de propulsion en zone à risque) doivent être remontées avant toute action irréversible, sauf urgence vitale."},
    {q:"Pourquoi n'existe-t-il pas de réponse universelle entre 'continuer' et 'arrêter' face à un paramètre légèrement anormal ?",opts:["Parce que la réponse est toujours 'continuer'","Parce que la bonne décision dépend de la gravité réelle, du contexte de manœuvre, et de la marge de sécurité restante","Parce que la réponse est toujours 'arrêter'","Parce que cela ne dépend que de l'expérience individuelle, sans autre critère"],correct:1,expl:"La décision doit intégrer plusieurs facteurs contextuels — gravité, contexte de manœuvre, marge de sécurité — plutôt qu'appliquer une règle fixe."},
    {q:"Quel est le principal danger de décider seul dans une situation à fort enjeu sans en informer personne ?",opts:["Aucun danger particulier","Priver l'équipe et la hiérarchie d'une information cruciale pour anticiper les conséquences","Cela accélère toujours la bonne décision","La hiérarchie n'a jamais besoin d'être informée"],correct:1,expl:"Décider seul dans une situation à fort enjeu, sans en informer la hiérarchie, prive l'équipe de la possibilité d'anticiper ou de corriger une décision risquée."},
    {q:"Quel est l'objectif principal de la leçon L5 de ce module ?",opts:["Réexpliquer la checklist d'urgence déjà vue en L3","Structurer la prise de décision individuelle sous pression, entre agir seul et escalader","Étudier la responsabilité juridique en cas d'avarie","Apprendre à réparer un détecteur de brouillard d'huile"],correct:1,expl:"L5 se concentre sur l'arbitrage individuel sous pression — quand décider seul, quand escalader, comment éviter le tunnel vision."},
    {q:"Pourquoi un système de sécurité automatique peut-il être source de risque, pas seulement de protection ?",opts:["Un système automatique n'est jamais source de risque","Il peut retirer le contrôle humain à un moment critique, sur la base d'une information parfois erronée (fausse alarme)","Les systèmes automatiques sont toujours désactivés en zone resserrée","Cela ne concerne que les vieux navires"],correct:1,expl:"Le cas Damgracht illustre qu'un système automatique fiable en théorie peut déclencher une action au pire moment, sur la base d'une fausse alarme."},
    {q:"Que doit faire l'équipe machine si un système automatique déclenche un arrêt inattendu en zone à risque ?",opts:["Ignorer l'arrêt et continuer comme si de rien n'était","Réagir instantanément selon la checklist d'urgence, quelle que soit la cause exacte encore incertaine","Attendre une explication complète avant toute action","Redémarrer immédiatement sans aucune vérification"],correct:1,expl:"L'équipe doit réagir selon la procédure d'urgence établie, même si la cause exacte (panne réelle ou fausse alarme) n'est pas encore confirmée."},
    {q:"Pourquoi documenter la décision prise et sa justification est-il utile après une situation sous pression ?",opts:["Cela n'apporte rien de concret","Cela permet le retour d'expérience et d'améliorer les décisions futures dans des situations similaires","La documentation ralentit toujours l'équipe sans bénéfice","Seule la documentation officielle obligatoire compte"],correct:1,expl:"Documenter la décision et son contexte permet un retour d'expérience utile pour la formation et l'amélioration continue de l'équipe."},
    {q:"En quoi la leçon L5 s'appuie-t-elle sur les leçons précédentes du module ?",opts:["Elle n'a aucun lien avec elles","Elle suppose les facteurs humains (L1), la coordination (L2) et l'action d'urgence (L3, L4) maîtrisés, pour se concentrer sur l'arbitrage individuel final","Elle contredit entièrement L1 à L4","Elle remplace entièrement les leçons précédentes"],correct:1,expl:"L5 s'appuie sur les fondations des leçons précédentes pour aborder la dimension la plus fine : la décision individuelle sous pression elle-même."},
    {q:"Quel facteur transforme une perte de propulsion ordinaire en situation à très haut risque, comme dans le cas Damgracht ?",opts:["La couleur du navire","Le contexte de navigation, ici un chenal étroit sans marge de manœuvre","Le nombre de membres d'équipage à bord","La nationalité du navire"],correct:1,expl:"Une perte de propulsion en haute mer et une perte de propulsion en chenal étroit ne comportent pas le même niveau de risque — le contexte change tout."},
    {q:"Quelle est la bonne pratique face à une alarme ambiguë juste après une opération de maintenance ?",opts:["Ignorer systématiquement l'alarme car la maintenance vient d'être faite","Envisager que la maintenance récente puisse elle-même être à l'origine d'une fausse alerte, sans l'assumer non plus par défaut","Toujours supposer que la maintenance a résolu tous les problèmes possibles","Ne jamais faire confiance à un équipement récemment entretenu"],correct:1,expl:"La maintenance récente est un facteur contextuel à prendre en compte, ni pour ignorer l'alarme ni pour l'assumer automatiquement comme fausse."},
  ],
  en:[
    {q:"What does the Damgracht/AP Revelin case (2022) show?",opts:["That a false alarm never has real consequences","That an automatic safety system can remove human control at the worst possible moment, with serious consequences","That oil mist detectors are always 100% reliable","That collisions never relate to the engine room"],correct:1,expl:"The automatic engine shutdown, triggered by a likely false alarm, deprived the ship of propulsion in a narrow channel, leading to the collision."},
    {q:"Why must recent maintenance be factored into interpreting a subsequent alarm?",opts:["It has no relation to sensor reliability","It can temporarily change conditions (e.g. humidity) that make a sensor more prone to trigger a false alarm","Maintenance always eliminates any risk of false alarm","Only weather matters, never maintenance"],correct:1,expl:"In the Damgracht case, recent maintenance in humid conditions created water vapor mistaken by the detector for oil mist."},
    {q:"What is 'tunnel vision' in a decision under pressure?",opts:["A lighting technique in the engine room","Clinging to the first explanation that comes to mind without considering an alternative","An official diagnostic procedure","A type of night vision"],correct:1,expl:"Tunnel vision means fixating on the first hypothesis without considering other possible causes, which can delay the correct corrective action."},
    {q:"What question helps avoid tunnel vision facing an unexpected automatic shutdown?",opts:["'Who is responsible for this failure?'","'What if it's something else?' — actively consider an alternative hypothesis","'How long will this take?'","No question is useful in an emergency"],correct:1,expl:"Actively asking whether an alternative explanation exists (e.g. a false alarm) avoids wasting time on the wrong track."},
    {q:"Which action typically falls under a decision you can make alone, without escalation?",opts:["Stopping propulsion in a narrow area","Resetting a routine alarm after full physical verification","Deciding to divert the ship","Changing the ship's route"],correct:1,expl:"Reversible actions with no immediate risk, like resetting an alarm after physical verification, can be decided without escalation."},
    {q:"From what level of stakes should you escalate before acting, barring an immediate life-threatening emergency?",opts:["Never, you should always act alone to save time","When the decision carries high stakes for ship or personnel safety","Only if a superior is physically present","Only at the end of the watch"],correct:1,expl:"High-stakes decisions (ship safety, stopping propulsion in a risk area) must be escalated before any irreversible action, barring a life-threatening emergency."},
    {q:"Why is there no universal answer between 'continue' and 'stop' facing a slightly abnormal parameter?",opts:["Because the answer is always 'continue'","Because the right decision depends on actual severity, maneuvering context, and remaining safety margin","Because the answer is always 'stop'","Because it only depends on individual experience, with no other criteria"],correct:1,expl:"The decision must factor in several contextual elements — severity, maneuvering context, safety margin — rather than applying a fixed rule."},
    {q:"What is the main danger of deciding alone in a high-stakes situation without informing anyone?",opts:["No particular danger","Depriving the team and hierarchy of crucial information to anticipate consequences","It always speeds up the right decision","The hierarchy never needs to be informed"],correct:1,expl:"Deciding alone in a high-stakes situation without informing the hierarchy deprives the team of the chance to anticipate or correct a risky decision."},
    {q:"What is the main goal of lesson L5 in this module?",opts:["Re-explain the emergency checklist already covered in L3","Structure individual decision-making under pressure, between acting alone and escalating","Study legal liability in case of a casualty","Learn how to repair an oil mist detector"],correct:1,expl:"L5 focuses on individual arbitration under pressure — when to decide alone, when to escalate, how to avoid tunnel vision."},
    {q:"Why can an automatic safety system be a source of risk, not only of protection?",opts:["An automatic system is never a source of risk","It can remove human control at a critical moment, based on sometimes-incorrect information (a false alarm)","Automatic systems are always disabled in narrow areas","This only concerns old ships"],correct:1,expl:"The Damgracht case illustrates that a system reliable in theory can trigger an action at the worst moment, based on a false alarm."},
    {q:"What should the engine team do if an automatic system triggers an unexpected shutdown in a risk area?",opts:["Ignore the shutdown and continue as if nothing happened","React instantly according to the emergency checklist, whatever the exact still-uncertain cause","Wait for a full explanation before any action","Restart immediately without any verification"],correct:1,expl:"The team must react according to the established emergency procedure, even if the exact cause (real failure or false alarm) is not yet confirmed."},
    {q:"Why is documenting the decision made and its justification useful after a pressure situation?",opts:["It brings nothing concrete","It enables lessons learned and improves future decisions in similar situations","Documentation always slows the team with no benefit","Only mandatory official documentation matters"],correct:1,expl:"Documenting the decision and its context enables useful lessons learned for training and continuous improvement of the team."},
    {q:"How does lesson L5 build on the module's previous lessons?",opts:["It has no link to them","It assumes the human factors (L1), coordination (L2), and emergency action (L3, L4) are under control, to focus on the final individual arbitration","It fully contradicts L1 through L4","It fully replaces the previous lessons"],correct:1,expl:"L5 builds on the foundations of the previous lessons to address the finest dimension: the individual decision under pressure itself."},
    {q:"What factor turns an ordinary loss of propulsion into a very high-risk situation, as in the Damgracht case?",opts:["The ship's color","The navigation context, here a narrow channel with no maneuvering margin","The number of crew members on board","The ship's nationality"],correct:1,expl:"A loss of propulsion on open sea and one in a narrow channel do not carry the same level of risk — context changes everything."},
    {q:"What is the correct practice facing an ambiguous alarm right after a maintenance operation?",opts:["Systematically ignore the alarm because maintenance was just done","Consider that recent maintenance could itself be the source of a false alert, without assuming it by default either","Always assume maintenance solved all possible problems","Never trust recently maintained equipment"],correct:1,expl:"Recent maintenance is a contextual factor to consider, neither to ignore the alarm nor to automatically assume it is false."},
  ],
  es:[
    {q:"¿Qué muestra el caso Damgracht/AP Revelin (2022)?",opts:["Que una falsa alarma nunca tiene consecuencias reales","Que un sistema de seguridad automático puede retirar el control humano en el peor momento posible, con consecuencias graves","Que los detectores de bruma de aceite siempre son 100% fiables","Que las colisiones nunca se relacionan con la sala de máquinas"],correct:1,expl:"La parada automática del motor, provocada por una probable falsa alarma, privó al buque de propulsión en un canal estrecho, llevando a la colisión."},
    {q:"¿Por qué hay que tener en cuenta un mantenimiento reciente al interpretar una alarma posterior?",opts:["No tiene relación con la fiabilidad de los sensores","Puede cambiar temporalmente condiciones (p. ej. humedad) que hacen a un sensor más propenso a disparar una falsa alarma","El mantenimiento siempre elimina cualquier riesgo de falsa alarma","Solo importa el tiempo meteorológico, nunca el mantenimiento"],correct:1,expl:"En el caso Damgracht, un mantenimiento reciente en condiciones húmedas generó vapor de agua confundido por el detector con bruma de aceite."},
    {q:"¿Qué es la 'visión de túnel' en una decisión bajo presión?",opts:["Una técnica de iluminación en la sala de máquinas","Aferrarse a la primera explicación que viene a la mente sin considerar una alternativa","Un procedimiento oficial de diagnóstico","Un tipo de visión nocturna"],correct:1,expl:"La visión de túnel consiste en fijarse en la primera hipótesis sin considerar otras causas posibles, lo que puede retrasar la acción correctiva adecuada."},
    {q:"¿Qué pregunta ayuda a evitar la visión de túnel ante una parada automática inesperada?",opts:["'¿Quién es responsable de este fallo?'","'¿Y si es otra cosa?' — considerar activamente una hipótesis alternativa","'¿Cuánto tiempo llevará esto?'","Ninguna pregunta es útil en la emergencia"],correct:1,expl:"Preguntarse activamente si existe una explicación alternativa (p. ej. una falsa alarma) evita perder tiempo en la pista equivocada."},
    {q:"¿Qué acción corresponde típicamente a una decisión que puedes tomar solo, sin escalar?",opts:["Detener la propulsión en zona estrecha","Reiniciar una alarma de rutina tras verificación física completa","Decidir desviar el buque","Cambiar la ruta del buque"],correct:1,expl:"Las acciones reversibles y sin riesgo inmediato, como reiniciar una alarma tras verificación física, pueden decidirse sin escalar."},
    {q:"¿A partir de qué nivel de riesgo hay que escalar antes de actuar, salvo emergencia vital inmediata?",opts:["Nunca, siempre hay que actuar solo para ganar tiempo","Cuando la decisión implica un alto riesgo para la seguridad del buque o de las personas","Solo si un superior está físicamente presente","Solo al final de la guardia"],correct:1,expl:"Las decisiones de alto riesgo (seguridad del buque, parada de propulsión en zona de riesgo) deben escalarse antes de cualquier acción irreversible, salvo emergencia vital."},
    {q:"¿Por qué no existe una respuesta universal entre 'continuar' y 'detener' ante un parámetro ligeramente anormal?",opts:["Porque la respuesta siempre es 'continuar'","Porque la decisión correcta depende de la gravedad real, el contexto de maniobra y el margen de seguridad restante","Porque la respuesta siempre es 'detener'","Porque solo depende de la experiencia individual, sin otro criterio"],correct:1,expl:"La decisión debe integrar varios factores contextuales — gravedad, contexto de maniobra, margen de seguridad — en lugar de aplicar una regla fija."},
    {q:"¿Cuál es el principal peligro de decidir solo en una situación de alto riesgo sin informar a nadie?",opts:["Ningún peligro particular","Privar al equipo y a la jerarquía de información crucial para anticipar consecuencias","Siempre acelera la decisión correcta","La jerarquía nunca necesita ser informada"],correct:1,expl:"Decidir solo en una situación de alto riesgo sin informar a la jerarquía priva al equipo de la posibilidad de anticipar o corregir una decisión arriesgada."},
    {q:"¿Cuál es el objetivo principal de la lección L5 de este módulo?",opts:["Reexplicar la checklist de emergencia ya vista en L3","Estructurar la toma de decisiones individual bajo presión, entre actuar solo y escalar","Estudiar la responsabilidad jurídica en caso de avería","Aprender a reparar un detector de bruma de aceite"],correct:1,expl:"L5 se centra en el arbitraje individual bajo presión — cuándo decidir solo, cuándo escalar, cómo evitar la visión de túnel."},
    {q:"¿Por qué puede un sistema de seguridad automático ser fuente de riesgo, no solo de protección?",opts:["Un sistema automático nunca es fuente de riesgo","Puede retirar el control humano en un momento crítico, basándose en información a veces errónea (una falsa alarma)","Los sistemas automáticos siempre están desactivados en zonas estrechas","Solo concierne a buques antiguos"],correct:1,expl:"El caso Damgracht ilustra que un sistema fiable en teoría puede desencadenar una acción en el peor momento, basándose en una falsa alarma."},
    {q:"¿Qué debe hacer el equipo de máquinas si un sistema automático provoca una parada inesperada en zona de riesgo?",opts:["Ignorar la parada y continuar como si nada","Reaccionar de inmediato según la checklist de emergencia, sea cual sea la causa exacta aún incierta","Esperar una explicación completa antes de cualquier acción","Reiniciar de inmediato sin ninguna verificación"],correct:1,expl:"El equipo debe reaccionar según el procedimiento de emergencia establecido, aunque la causa exacta (fallo real o falsa alarma) no esté aún confirmada."},
    {q:"¿Por qué es útil documentar la decisión tomada y su justificación tras una situación bajo presión?",opts:["No aporta nada concreto","Permite el retorno de experiencia y mejorar decisiones futuras en situaciones similares","La documentación siempre ralentiza al equipo sin beneficio","Solo importa la documentación oficial obligatoria"],correct:1,expl:"Documentar la decisión y su contexto permite un retorno de experiencia útil para la formación y la mejora continua del equipo."},
    {q:"¿En qué se apoya la lección L5 en las lecciones anteriores del módulo?",opts:["No tiene relación con ellas","Supone que los factores humanos (L1), la coordinación (L2) y la acción de emergencia (L3, L4) están controlados, para centrarse en el arbitraje individual final","Contradice completamente L1 a L4","Sustituye completamente a las lecciones anteriores"],correct:1,expl:"L5 se apoya en los fundamentos de las lecciones anteriores para abordar la dimensión más fina: la propia decisión individual bajo presión."},
    {q:"¿Qué factor convierte una pérdida de propulsión ordinaria en una situación de muy alto riesgo, como en el caso Damgracht?",opts:["El color del buque","El contexto de navegación, aquí un canal estrecho sin margen de maniobra","El número de tripulantes a bordo","La nacionalidad del buque"],correct:1,expl:"Una pérdida de propulsión en alta mar y una en un canal estrecho no conllevan el mismo nivel de riesgo — el contexto lo cambia todo."},
    {q:"¿Cuál es la buena práctica ante una alarma ambigua justo después de una operación de mantenimiento?",opts:["Ignorar sistemáticamente la alarma porque el mantenimiento acaba de hacerse","Considerar que el mantenimiento reciente podría ser en sí mismo el origen de una falsa alerta, sin asumirlo tampoco por defecto","Asumir siempre que el mantenimiento resolvió todos los problemas posibles","No confiar nunca en un equipo recientemente mantenido"],correct:1,expl:"El mantenimiento reciente es un factor contextual a considerar, ni para ignorar la alarma ni para asumirla automáticamente como falsa."},
  ],
  pt:[
    {q:"O que mostra o caso Damgracht/AP Revelin (2022)?",opts:["Que um falso alarme nunca tem consequências reais","Que um sistema de segurança automático pode retirar o controlo humano no pior momento possível, com consequências graves","Que os detetores de nevoeiro de óleo são sempre 100% fiáveis","Que as colisões nunca se relacionam com a casa das máquinas"],correct:1,expl:"A paragem automática do motor, provocada por um provável falso alarme, privou o navio de propulsão num canal estreito, levando à colisão."},
    {q:"Por que uma manutenção recente deve ser considerada na interpretação de um alarme seguinte?",opts:["Não tem relação com a fiabilidade dos sensores","Pode mudar temporariamente condições (ex: humidade) que tornam um sensor mais propenso a disparar um falso alarme","A manutenção elimina sempre qualquer risco de falso alarme","Só importa o tempo meteorológico, nunca a manutenção"],correct:1,expl:"No caso Damgracht, uma manutenção recente em condições húmidas gerou vapor de água confundido pelo detetor com nevoeiro de óleo."},
    {q:"O que é a 'visão em túnel' numa decisão sob pressão?",opts:["Uma técnica de iluminação na casa das máquinas","Agarrar-se à primeira explicação que surge sem considerar uma alternativa","Um procedimento oficial de diagnóstico","Um tipo de visão noturna"],correct:1,expl:"A visão em túnel consiste em fixar-se na primeira hipótese sem considerar outras causas possíveis, o que pode atrasar a ação corretiva certa."},
    {q:"Que pergunta ajuda a evitar a visão em túnel perante uma paragem automática inesperada?",opts:["'Quem é responsável por esta falha?'","'E se for outra coisa?' — considerar ativamente uma hipótese alternativa","'Quanto tempo vai demorar isto?'","Nenhuma pergunta é útil na emergência"],correct:1,expl:"Perguntar ativamente se existe uma explicação alternativa (ex: um falso alarme) evita perder tempo na pista errada."},
    {q:"Que ação corresponde tipicamente a uma decisão que podes tomar sozinho, sem escalar?",opts:["Parar a propulsão em zona estreita","Reiniciar um alarme de rotina após verificação física completa","Decidir desviar o navio","Mudar a rota do navio"],correct:1,expl:"As ações reversíveis e sem risco imediato, como reiniciar um alarme após verificação física, podem ser decididas sem escalar."},
    {q:"A partir de que nível de risco se deve escalar antes de agir, salvo emergência vital imediata?",opts:["Nunca, deve-se sempre agir sozinho para ganhar tempo","Quando a decisão implica um risco elevado para a segurança do navio ou das pessoas","Só se um superior estiver fisicamente presente","Só no fim do quarto"],correct:1,expl:"As decisões de grande impacto (segurança do navio, paragem de propulsão em zona de risco) devem ser escaladas antes de qualquer ação irreversível, salvo emergência vital."},
    {q:"Por que não existe uma resposta universal entre 'continuar' e 'parar' perante um parâmetro ligeiramente anormal?",opts:["Porque a resposta é sempre 'continuar'","Porque a decisão certa depende da gravidade real, do contexto de manobra e da margem de segurança restante","Porque a resposta é sempre 'parar'","Porque só depende da experiência individual, sem outro critério"],correct:1,expl:"A decisão deve integrar vários fatores contextuais — gravidade, contexto de manobra, margem de segurança — em vez de aplicar uma regra fixa."},
    {q:"Qual é o principal perigo de decidir sozinho numa situação de grande impacto sem informar ninguém?",opts:["Nenhum perigo particular","Privar a equipa e a hierarquia de informação crucial para antecipar consequências","Acelera sempre a decisão certa","A hierarquia nunca precisa de ser informada"],correct:1,expl:"Decidir sozinho numa situação de grande impacto sem informar a hierarquia priva a equipa da possibilidade de antecipar ou corrigir uma decisão arriscada."},
    {q:"Qual é o objetivo principal da lição L5 deste módulo?",opts:["Reexplicar a checklist de emergência já vista em L3","Estruturar a tomada de decisão individual sob pressão, entre agir sozinho e escalar","Estudar a responsabilidade jurídica em caso de avaria","Aprender a reparar um detetor de nevoeiro de óleo"],correct:1,expl:"L5 foca-se no arbítrio individual sob pressão — quando decidir sozinho, quando escalar, como evitar a visão em túnel."},
    {q:"Por que pode um sistema de segurança automático ser fonte de risco, não só de proteção?",opts:["Um sistema automático nunca é fonte de risco","Pode retirar o controlo humano num momento crítico, com base em informação por vezes errada (um falso alarme)","Os sistemas automáticos estão sempre desativados em zonas estreitas","Só diz respeito a navios antigos"],correct:1,expl:"O caso Damgracht ilustra que um sistema fiável em teoria pode desencadear uma ação no pior momento, com base num falso alarme."},
    {q:"O que deve fazer a equipa de máquinas se um sistema automático provocar uma paragem inesperada numa zona de risco?",opts:["Ignorar a paragem e continuar como se nada fosse","Reagir instantaneamente segundo a checklist de emergência, seja qual for a causa exata ainda incerta","Esperar por uma explicação completa antes de qualquer ação","Reiniciar de imediato sem qualquer verificação"],correct:1,expl:"A equipa deve reagir segundo o procedimento de emergência estabelecido, mesmo que a causa exata (falha real ou falso alarme) ainda não esteja confirmada."},
    {q:"Por que é útil documentar a decisão tomada e a sua justificação após uma situação sob pressão?",opts:["Não traz nada de concreto","Permite o retorno de experiência e melhorar decisões futuras em situações semelhantes","A documentação atrasa sempre a equipa sem benefício","Só importa a documentação oficial obrigatória"],correct:1,expl:"Documentar a decisão e o seu contexto permite um retorno de experiência útil para a formação e a melhoria contínua da equipa."},
    {q:"Como é que a lição L5 se apoia nas lições anteriores do módulo?",opts:["Não tem relação com elas","Assume que os fatores humanos (L1), a coordenação (L2) e a ação de emergência (L3, L4) estão controlados, para se focar no arbítrio individual final","Contradiz completamente L1 a L4","Substitui completamente as lições anteriores"],correct:1,expl:"L5 apoia-se nas bases das lições anteriores para abordar a dimensão mais fina: a própria decisão individual sob pressão."},
    {q:"Que fator transforma uma perda de propulsão comum numa situação de altíssimo risco, como no caso Damgracht?",opts:["A cor do navio","O contexto de navegação, aqui um canal estreito sem margem de manobra","O número de tripulantes a bordo","A nacionalidade do navio"],correct:1,expl:"Uma perda de propulsão em alto mar e uma num canal estreito não têm o mesmo nível de risco — o contexto muda tudo."},
    {q:"Qual é a boa prática perante um alarme ambíguo logo após uma operação de manutenção?",opts:["Ignorar sistematicamente o alarme porque a manutenção acabou de ser feita","Considerar que a manutenção recente pode ela própria estar na origem de um falso alerta, sem também a assumir por defeito","Assumir sempre que a manutenção resolveu todos os problemas possíveis","Nunca confiar num equipamento recentemente mantido"],correct:1,expl:"A manutenção recente é um fator contextual a considerar, nem para ignorar o alarme nem para o assumir automaticamente como falso."},
  ],
};

// ══════════════════════════════════════
// QUIZ — FINAL (5 QUESTIONS)
// ══════════════════════════════════════
export const QUIZ = {
  fr:[
    {q:"Que montre le cas Damgracht/AP Revelin (2022) ?",opts:["Qu'une fausse alarme n'a jamais de conséquence","Qu'un système de sécurité automatique peut retirer le contrôle humain au pire moment, avec des conséquences graves","Que les détecteurs sont toujours fiables à 100%","Que les collisions n'ont jamais de lien avec la salle des machines"],correct:1,expl:"L'arrêt automatique déclenché par une probable fausse alarme a privé le navire de propulsion en plein chenal, menant à la collision."},
    {q:"Qu'est-ce que le 'tunnel vision' dans une décision sous pression ?",opts:["Une technique d'éclairage","S'accrocher à la première explication venue sans envisager d'alternative","Une procédure officielle","Un type de vision nocturne"],correct:1,expl:"Le tunnel vision consiste à se fixer sur la première hypothèse sans envisager d'autres causes possibles."},
    {q:"Quelle action relève d'une décision que l'on peut prendre seul, sans escalade ?",opts:["Arrêter la propulsion en zone resserrée","Réarmer une alarme de routine après vérification physique complète","Décider de dérouter le navire","Modifier la route du navire"],correct:1,expl:"Les actions réversibles et sans risque immédiat peuvent être décidées sans escalade."},
    {q:"Pourquoi n'existe-t-il pas de réponse universelle entre 'continuer' et 'arrêter' ?",opts:["La réponse est toujours 'continuer'","La bonne décision dépend de la gravité réelle, du contexte, et de la marge de sécurité","La réponse est toujours 'arrêter'","Cela ne dépend que de l'expérience individuelle"],correct:1,expl:"La décision doit intégrer plusieurs facteurs contextuels plutôt qu'appliquer une règle fixe."},
    {q:"Pourquoi une maintenance récente doit-elle être prise en compte dans l'interprétation d'une alarme ?",opts:["Elle n'a aucun rapport avec la fiabilité des capteurs","Elle peut temporairement modifier les conditions qui rendent un capteur plus susceptible de fausse alarme","La maintenance élimine toujours tout risque","Seule la météo compte"],correct:1,expl:"Une maintenance récente en conditions humides a créé de la vapeur d'eau confondue avec du brouillard d'huile dans le cas Damgracht."},
  ],
  en:[
    {q:"What does the Damgracht/AP Revelin case (2022) show?",opts:["That a false alarm never has consequences","That an automatic safety system can remove human control at the worst moment, with serious consequences","That detectors are always 100% reliable","That collisions never relate to the engine room"],correct:1,expl:"The automatic shutdown triggered by a likely false alarm deprived the ship of propulsion in a channel, leading to the collision."},
    {q:"What is 'tunnel vision' in a decision under pressure?",opts:["A lighting technique","Clinging to the first explanation without considering an alternative","An official procedure","A type of night vision"],correct:1,expl:"Tunnel vision means fixating on the first hypothesis without considering other possible causes."},
    {q:"Which action falls under a decision you can make alone, without escalation?",opts:["Stopping propulsion in a narrow area","Resetting a routine alarm after full physical verification","Deciding to divert the ship","Changing the ship's route"],correct:1,expl:"Reversible actions with no immediate risk can be decided without escalation."},
    {q:"Why is there no universal answer between 'continue' and 'stop'?",opts:["The answer is always 'continue'","The right decision depends on actual severity, context, and safety margin","The answer is always 'stop'","It only depends on individual experience"],correct:1,expl:"The decision must factor in several contextual elements rather than applying a fixed rule."},
    {q:"Why must recent maintenance be factored into interpreting an alarm?",opts:["It has no relation to sensor reliability","It can temporarily change conditions that make a sensor more prone to false alarm","Maintenance always eliminates any risk","Only weather matters"],correct:1,expl:"Recent maintenance in humid conditions created water vapor mistaken for oil mist in the Damgracht case."},
  ],
  es:[
    {q:"¿Qué muestra el caso Damgracht/AP Revelin (2022)?",opts:["Que una falsa alarma nunca tiene consecuencias","Que un sistema de seguridad automático puede retirar el control humano en el peor momento, con consecuencias graves","Que los detectores siempre son 100% fiables","Que las colisiones nunca se relacionan con la sala de máquinas"],correct:1,expl:"La parada automática provocada por una probable falsa alarma privó al buque de propulsión en un canal, llevando a la colisión."},
    {q:"¿Qué es la 'visión de túnel' en una decisión bajo presión?",opts:["Una técnica de iluminación","Aferrarse a la primera explicación sin considerar una alternativa","Un procedimiento oficial","Un tipo de visión nocturna"],correct:1,expl:"La visión de túnel consiste en fijarse en la primera hipótesis sin considerar otras causas posibles."},
    {q:"¿Qué acción corresponde a una decisión que puedes tomar solo, sin escalar?",opts:["Detener la propulsión en zona estrecha","Reiniciar una alarma de rutina tras verificación física completa","Decidir desviar el buque","Cambiar la ruta del buque"],correct:1,expl:"Las acciones reversibles y sin riesgo inmediato pueden decidirse sin escalar."},
    {q:"¿Por qué no existe una respuesta universal entre 'continuar' y 'detener'?",opts:["La respuesta siempre es 'continuar'","La decisión correcta depende de la gravedad real, el contexto y el margen de seguridad","La respuesta siempre es 'detener'","Solo depende de la experiencia individual"],correct:1,expl:"La decisión debe integrar varios factores contextuales en lugar de aplicar una regla fija."},
    {q:"¿Por qué hay que tener en cuenta un mantenimiento reciente al interpretar una alarma?",opts:["No tiene relación con la fiabilidad de los sensores","Puede cambiar temporalmente condiciones que hacen a un sensor más propenso a falsa alarma","El mantenimiento siempre elimina cualquier riesgo","Solo importa el tiempo meteorológico"],correct:1,expl:"Un mantenimiento reciente en condiciones húmedas generó vapor de agua confundido con bruma de aceite en el caso Damgracht."},
  ],
  pt:[
    {q:"O que mostra o caso Damgracht/AP Revelin (2022)?",opts:["Que um falso alarme nunca tem consequências","Que um sistema de segurança automático pode retirar o controlo humano no pior momento, com consequências graves","Que os detetores são sempre 100% fiáveis","Que as colisões nunca se relacionam com a casa das máquinas"],correct:1,expl:"A paragem automática provocada por um provável falso alarme privou o navio de propulsão num canal, levando à colisão."},
    {q:"O que é a 'visão em túnel' numa decisão sob pressão?",opts:["Uma técnica de iluminação","Agarrar-se à primeira explicação sem considerar uma alternativa","Um procedimento oficial","Um tipo de visão noturna"],correct:1,expl:"A visão em túnel consiste em fixar-se na primeira hipótese sem considerar outras causas possíveis."},
    {q:"Que ação corresponde a uma decisão que podes tomar sozinho, sem escalar?",opts:["Parar a propulsão em zona estreita","Reiniciar um alarme de rotina após verificação física completa","Decidir desviar o navio","Mudar a rota do navio"],correct:1,expl:"As ações reversíveis e sem risco imediato podem ser decididas sem escalar."},
    {q:"Por que não existe uma resposta universal entre 'continuar' e 'parar'?",opts:["A resposta é sempre 'continuar'","A decisão certa depende da gravidade real, do contexto e da margem de segurança","A resposta é sempre 'parar'","Só depende da experiência individual"],correct:1,expl:"A decisão deve integrar vários fatores contextuais em vez de aplicar uma regra fixa."},
    {q:"Por que uma manutenção recente deve ser considerada na interpretação de um alarme?",opts:["Não tem relação com a fiabilidade dos sensores","Pode mudar temporariamente condições que tornam um sensor mais propenso a falso alarme","A manutenção elimina sempre qualquer risco","Só importa o tempo meteorológico"],correct:1,expl:"Uma manutenção recente em condições húmidas gerou vapor de água confundido com nevoeiro de óleo no caso Damgracht."},
  ],
};

// ══════════════════════════════════════
// SAFETY REFLECTION (permanent Safety Dept feature)
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Repense à une décision que tu as prise (ou vue prendre) sous pression en salle des machines. As-tu envisagé une hypothèse alternative avant de conclure ? Aurais-tu dû escalader plus tôt ?",
    en:"Think of a decision you made (or saw made) under pressure in the engine room. Did you consider an alternative hypothesis before concluding? Should you have escalated sooner?",
    es:"Piensa en una decisión que tomaste (o viste tomar) bajo presión en la sala de máquinas. ¿Consideraste una hipótesis alternativa antes de concluir? ¿Deberías haber escalado antes?",
    pt:"Pensa numa decisão que tomaste (ou viste tomar) sob pressão na casa das máquinas. Consideraste uma hipótese alternativa antes de concluir? Deverias ter escalado mais cedo?",
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
      badge:"⚙️ Safety · Engine Room Resource Management · Leçon 5/6 · ⭐ Premium",
      title:"Prise de Décision Sous Pression en Salle des Machines",
      intro:"Les leçons précédentes ont couvert le facteur humain, la coordination, et l'action d'urgence structurée. Cette leçon aborde ce qu'il reste une fois tout cela en place : l'arbitrage individuel, dans l'instant, quand l'information est incomplète et le temps compté.\n\nC'est le cinquième pilier de l'ERM : décider juste sous pression, sans certitude complète.",
      p0:"POURQUOI LA DÉCISION SOUS PRESSION EST DIFFÉRENTE",s0t:"L'information incomplète est la norme, pas l'exception",
      s0:"Dans l'urgence, on ne dispose presque jamais de toutes les informations souhaitées. La compétence ne consiste pas à attendre la certitude, mais à décider intelligemment avec ce qu'on sait déjà.\n\nCOMMENT PRÉVENIR UNE MAUVAISE DÉCISION ? En évitant de se fixer sur la première explication venue.\nQUE FAIRE QUAND LES ENJEUX SONT ÉLEVÉS ? Escalader avant d'agir, sauf urgence vitale immédiate.\nQUELLE LEÇON RETENIR ? Une bonne décision sous pression n'est pas une décision parfaite — c'est une décision raisonnée avec l'information disponible.",
      p1:"CONTINUER OU ARRÊTER : PAS DE RÈGLE UNIVERSELLE",s1t:"La bonne décision dépend du contexte, pas d'un réflexe fixe",
      s1:"Face à un paramètre légèrement anormal, la tentation est de vouloir une règle simple. Il n'y en a pas : la gravité réelle, le contexte de manœuvre, et la marge de sécurité restante doivent tous être pris en compte.",
      p2:"DÉCIDER SEUL OU ESCALADER",s2t:"Trois niveaux d'enjeu, trois seuils de décision",
      s2:"Certaines actions relèvent d'une décision autonome. D'autres exigent d'informer et de proposer. Les décisions à fort enjeu doivent être escaladées avant toute action irréversible, sauf urgence vitale immédiate.",
      p3:"ÉVITER LE TUNNEL VISION",s3t:"Et si c'était autre chose ?",
      s3:"S'accrocher à la première explication venue peut faire perdre un temps précieux sur la mauvaise piste. Se poser activement la question d'une hypothèse alternative fait partie de la décision elle-même.",
      p4:"🎯 EXERCICE OPÉRATIONNEL",p5:"⚠️ CAS RÉEL",p6:"📝 BANQUE DE 15 QUESTIONS",p7:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 5",
      sumP:["L'information incomplète est la norme en situation d'urgence, pas l'exception","Il n'existe pas de règle universelle entre continuer et arrêter — le contexte détermine la bonne décision","Trois niveaux d'enjeu déterminent quand décider seul et quand escalader","Le tunnel vision fait perdre du temps sur la mauvaise piste — envisager une alternative fait partie de la décision","Documenter une décision prise sous pression permet le retour d'expérience"],
      learnedP:["Le compromis continuer/arrêter selon le contexte","Les trois niveaux de décision : seul, informer, escalader","Le tunnel vision et comment l'éviter","Le cas Damgracht/AP Revelin (2022)","Pourquoi une bonne décision sous pression n'est pas une décision parfaite"],
      safetyMsg:"Sous pression, la meilleure décision n'est pas celle qui attend la certitude parfaite — c'est celle qui utilise honnêtement l'information disponible, sans s'enfermer dans la première idée venue.",
    },
    en:{
      badge:"⚙️ Safety · Engine Room Resource Management · Lesson 5/6 · ⭐ Premium",
      title:"Decision-Making Under Pressure in the Engine Room",
      intro:"The previous lessons covered the human factor, coordination, and structured emergency action. This lesson addresses what remains once all that is in place: individual judgment, in the moment, when information is incomplete and time is short.\n\nThis is the fifth pillar of ERM: deciding well under pressure, without full certainty.",
      p0:"WHY DECIDING UNDER PRESSURE IS DIFFERENT",s0t:"Incomplete information is the norm, not the exception",
      s0:"In an emergency, you almost never have all the information you would want. Competence is not waiting for certainty — it is deciding intelligently with what you already know.\n\nHOW TO PREVENT A WRONG DECISION? By avoiding fixation on the first explanation that comes to mind.\nWHAT TO DO WHEN STAKES ARE HIGH? Escalate before acting, barring an immediate life-threatening emergency.\nWHAT LESSON TO RETAIN? A good decision under pressure is not a perfect decision — it is a reasoned decision made with the information available.",
      p1:"CONTINUE OR STOP: NO UNIVERSAL RULE",s1t:"The right decision depends on context, not a fixed reflex",
      s1:"Facing a slightly abnormal parameter, the temptation is to want a simple rule. There isn't one: actual severity, maneuvering context, and remaining safety margin must all be factored in.",
      p2:"DECIDE ALONE OR ESCALATE",s2t:"Three levels of stakes, three decision thresholds",
      s2:"Some actions fall under autonomous decision-making. Others require informing and proposing. High-stakes decisions must be escalated before any irreversible action, barring an immediate life-threatening emergency.",
      p3:"AVOIDING TUNNEL VISION",s3t:"What if it's something else?",
      s3:"Clinging to the first explanation that comes to mind can waste precious time on the wrong track. Actively asking whether an alternative hypothesis exists is part of the decision itself.",
      p4:"🎯 OPERATIONAL EXERCISE",p5:"⚠️ REAL CASUALTY CASE",p6:"📝 15-QUESTION BANK",p7:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 5",
      sumP:["Incomplete information is the norm in an emergency, not the exception","There is no universal rule between continuing and stopping — context determines the right decision","Three levels of stakes determine when to decide alone and when to escalate","Tunnel vision wastes time on the wrong track — considering an alternative is part of the decision","Documenting a decision made under pressure enables lessons learned"],
      learnedP:["The continue/stop trade-off depending on context","The three decision levels: alone, inform, escalate","Tunnel vision and how to avoid it","The Damgracht/AP Revelin case (2022)","Why a good decision under pressure is not a perfect decision"],
      safetyMsg:"Under pressure, the best decision is not the one that waits for perfect certainty — it is the one that honestly uses the information available, without locking onto the first idea that comes to mind.",
    },
    es:{
      badge:"⚙️ Seguridad · Engine Room Resource Management · Lección 5/6 · ⭐ Premium",
      title:"Toma de Decisiones Bajo Presión en la Sala de Máquinas",
      intro:"Las lecciones anteriores cubrieron el factor humano, la coordinación y la acción de emergencia estructurada. Esta lección aborda lo que queda una vez todo eso está en su lugar: el juicio individual, en el momento, cuando la información es incompleta y el tiempo escaso.\n\nEste es el quinto pilar del ERM: decidir bien bajo presión, sin certeza completa.",
      p0:"POR QUÉ DECIDIR BAJO PRESIÓN ES DIFERENTE",s0t:"La información incompleta es la norma, no la excepción",
      s0:"En una emergencia, casi nunca se dispone de toda la información deseada. La competencia no consiste en esperar la certeza, sino en decidir inteligentemente con lo que ya se sabe.\n\n¿CÓMO PREVENIR UNA MALA DECISIÓN? Evitando fijarse en la primera explicación que viene a la mente.\n¿QUÉ HACER CUANDO EL RIESGO ES ALTO? Escalar antes de actuar, salvo emergencia vital inmediata.\n¿QUÉ LECCIÓN RETENER? Una buena decisión bajo presión no es una decisión perfecta — es una decisión razonada con la información disponible.",
      p1:"CONTINUAR O DETENER: SIN REGLA UNIVERSAL",s1t:"La decisión correcta depende del contexto, no de un reflejo fijo",
      s1:"Ante un parámetro ligeramente anormal, la tentación es querer una regla simple. No la hay: la gravedad real, el contexto de maniobra y el margen de seguridad restante deben tenerse en cuenta.",
      p2:"DECIDIR SOLO O ESCALAR",s2t:"Tres niveles de riesgo, tres umbrales de decisión",
      s2:"Algunas acciones corresponden a una decisión autónoma. Otras exigen informar y proponer. Las decisiones de alto riesgo deben escalarse antes de cualquier acción irreversible, salvo emergencia vital inmediata.",
      p3:"EVITAR LA VISIÓN DE TÚNEL",s3t:"¿Y si es otra cosa?",
      s3:"Aferrarse a la primera explicación que viene a la mente puede hacer perder un tiempo precioso en la pista equivocada. Plantearse activamente una hipótesis alternativa forma parte de la propia decisión.",
      p4:"🎯 EJERCICIO OPERATIVO",p5:"⚠️ CASO REAL",p6:"📝 BANCO DE 15 PREGUNTAS",p7:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 5",
      sumP:["La información incompleta es la norma en una emergencia, no la excepción","No existe una regla universal entre continuar y detener — el contexto determina la decisión correcta","Tres niveles de riesgo determinan cuándo decidir solo y cuándo escalar","La visión de túnel hace perder tiempo en la pista equivocada — considerar una alternativa forma parte de la decisión","Documentar una decisión tomada bajo presión permite el retorno de experiencia"],
      learnedP:["El compromiso continuar/detener según el contexto","Los tres niveles de decisión: solo, informar, escalar","La visión de túnel y cómo evitarla","El caso Damgracht/AP Revelin (2022)","Por qué una buena decisión bajo presión no es una decisión perfecta"],
      safetyMsg:"Bajo presión, la mejor decisión no es la que espera la certeza perfecta — es la que usa honestamente la información disponible, sin encerrarse en la primera idea que viene a la mente.",
    },
    pt:{
      badge:"⚙️ Segurança · Engine Room Resource Management · Lição 5/6 · ⭐ Premium",
      title:"Tomada de Decisão Sob Pressão na Casa das Máquinas",
      intro:"As lições anteriores cobriram o fator humano, a coordenação e a ação de emergência estruturada. Esta lição aborda o que resta uma vez tudo isso implementado: o julgamento individual, no momento, quando a informação é incompleta e o tempo escasso.\n\nEste é o quinto pilar do ERM: decidir bem sob pressão, sem certeza completa.",
      p0:"POR QUE DECIDIR SOB PRESSÃO É DIFERENTE",s0t:"A informação incompleta é a norma, não a exceção",
      s0:"Numa emergência, quase nunca se dispõe de toda a informação desejada. A competência não consiste em esperar pela certeza, mas em decidir inteligentemente com o que já se sabe.\n\nCOMO PREVENIR UMA MÁ DECISÃO? Evitando fixar-se na primeira explicação que surge.\nO QUE FAZER QUANDO O RISCO É ELEVADO? Escalar antes de agir, salvo emergência vital imediata.\nQUE LIÇÃO RETER? Uma boa decisão sob pressão não é uma decisão perfeita — é uma decisão fundamentada com a informação disponível.",
      p1:"CONTINUAR OU PARAR: SEM REGRA UNIVERSAL",s1t:"A decisão certa depende do contexto, não de um reflexo fixo",
      s1:"Perante um parâmetro ligeiramente anormal, a tentação é querer uma regra simples. Não existe: a gravidade real, o contexto de manobra e a margem de segurança restante devem todos ser considerados.",
      p2:"DECIDIR SOZINHO OU ESCALAR",s2t:"Três níveis de risco, três limiares de decisão",
      s2:"Algumas ações correspondem a uma decisão autónoma. Outras exigem informar e propor. As decisões de grande impacto devem ser escaladas antes de qualquer ação irreversível, salvo emergência vital imediata.",
      p3:"EVITAR A VISÃO EM TÚNEL",s3t:"E se for outra coisa?",
      s3:"Agarrar-se à primeira explicação que surge pode fazer perder um tempo precioso na pista errada. Colocar-se ativamente a questão de uma hipótese alternativa faz parte da própria decisão.",
      p4:"🎯 EXERCÍCIO OPERACIONAL",p5:"⚠️ CASO REAL",p6:"📝 BANCO DE 15 PERGUNTAS",p7:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 5",
      sumP:["A informação incompleta é a norma numa emergência, não a exceção","Não existe uma regra universal entre continuar e parar — o contexto determina a decisão certa","Três níveis de risco determinam quando decidir sozinho e quando escalar","A visão em túnel faz perder tempo na pista errada — considerar uma alternativa faz parte da decisão","Documentar uma decisão tomada sob pressão permite o retorno de experiência"],
      learnedP:["O compromisso continuar/parar segundo o contexto","Os três níveis de decisão: sozinho, informar, escalar","A visão em túnel e como evitá-la","O caso Damgracht/AP Revelin (2022)","Por que uma boa decisão sob pressão não é uma decisão perfeita"],
      safetyMsg:"Sob pressão, a melhor decisão não é a que espera pela certeza perfeita — é a que usa honestamente a informação disponível, sem se fechar na primeira ideia que surge.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1E_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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

            <SL icon="⚖️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚖️ {lang==="fr"?"CONTINUER OU ARRÊTER — INTERACTIF":lang==="en"?"CONTINUE OR STOP — INTERACTIVE":lang==="es"?"CONTINUAR O DETENER — INTERACTIVO":"CONTINUAR OU PARAR — INTERATIVO"}</div><TradeoffSVG lang={lang}/></Card>

            <SL icon="🪜" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🪜</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🪜 {lang==="fr"?"SEUILS DE DÉCISION — INTERACTIF":lang==="en"?"DECISION THRESHOLDS — INTERACTIVE":lang==="es"?"UMBRALES DE DECISIÓN — INTERACTIVO":"LIMIARES DE DECISÃO — INTERATIVO"}</div><AuthorityEscalationSVG lang={lang}/></Card>

            <SL icon="🔍" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔍</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔍 {lang==="fr"?"TUNNEL VISION — INTERACTIF":lang==="en"?"TUNNEL VISION — INTERACTIVE":lang==="es"?"VISIÓN DE TÚNEL — INTERACTIVO":"VISÃO EM TÚNEL — INTERATIVO"}</div><TunnelVisionSVG lang={lang}/></Card>

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
                {lang==="fr"?"Quiz Final — Décision Sous Pression":lang==="en"?"Final Quiz — Decision Under Pressure":lang==="es"?"Quiz Final — Decisión Bajo Presión":"Quiz Final — Decisão Sob Pressão"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 5/6":lang==="en"?"questions · Lesson 5/6":lang==="es"?"preguntas · Lección 5/6":"perguntas · Lição 5/6"}</div>
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
              {lang==="fr"?"LEÇON 6 — RETOURS D'EXPÉRIENCE →":lang==="en"?"LESSON 6 — LESSONS LEARNED →":lang==="es"?"LECCIÓN 6 — LECCIONES APRENDIDAS →":"LIÇÃO 6 — LIÇÕES APRENDIDAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
