import { useState, useEffect } from "react";
import { shuffleQuestionOptions, C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — PRIORITY RESTORE ORDER
// ══════════════════════════════════════
function PriorityRestoreSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🕹️", label:{fr:"Gouverne",en:"Steering",es:"Gobierno",pt:"Governo"},
      desc:{fr:"Sans gouverne, le navire ne peut pas être manœuvré même si la propulsion revient — c'est souvent la toute première priorité, surtout près de dangers.",en:"Without steering, the ship cannot be maneuvered even if propulsion returns — this is often the very first priority, especially near hazards.",es:"Sin gobierno, el buque no puede maniobrarse aunque vuelva la propulsión — suele ser la primerísima prioridad, sobre todo cerca de peligros.",pt:"Sem governo, o navio não pode ser manobrado mesmo que a propulsão regresse — é muitas vezes a primeiríssima prioridade, sobretudo perto de perigos."} },
    { id:2, icon:"⚙️", label:{fr:"Propulsion",en:"Propulsion",es:"Propulsión",pt:"Propulsão"},
      desc:{fr:"Restaurer un minimum de puissance propulsive permet de reprendre le contrôle de la position du navire.",en:"Restoring a minimum of propulsive power allows regaining control of the ship's position.",es:"Restaurar un mínimo de potencia propulsiva permite recuperar el control de la posición del buque.",pt:"Restaurar um mínimo de potência propulsiva permite recuperar o controlo da posição do navio."} },
    { id:3, icon:"🚒", label:{fr:"Pompes incendie",en:"Fire pumps",es:"Bombas contra incendios",pt:"Bombas de incêndio"},
      desc:{fr:"Si l'avarie initiale comportait un risque incendie, la capacité de lutte doit être rétablie avant de considérer la situation stabilisée.",en:"If the initial casualty involved a fire risk, firefighting capability must be restored before considering the situation stabilized.",es:"Si la avería inicial implicaba riesgo de incendio, la capacidad de lucha debe restablecerse antes de considerar la situación estabilizada.",pt:"Se a avaria inicial envolvia risco de incêndio, a capacidade de combate deve ser restabelecida antes de considerar a situação estabilizada."} },
    { id:4, icon:"💧", label:{fr:"Assèchement / autres services",en:"Bilge / other services",es:"Achique / otros servicios",pt:"Esgoto / outros serviços"},
      desc:{fr:"Une fois les trois priorités précédentes couvertes, les autres services essentiels (assèchement, ventilation, énergie de confort) peuvent être restaurés dans l'ordre de leur criticité propre.",en:"Once the first three priorities are covered, other essential services (bilge, ventilation, hotel power) can be restored in order of their own criticality.",es:"Una vez cubiertas las tres prioridades anteriores, los demás servicios esenciales (achique, ventilación, energía de confort) pueden restablecerse según su propia criticidad.",pt:"Uma vez cobertas as três prioridades anteriores, os restantes serviços essenciais (esgoto, ventilação, energia de conforto) podem ser restabelecidos pela sua própria criticidade."} },
  ];
  const sel_ = sel!==null?items.find(i=>i.id===sel):null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,cursor:"pointer",
              background:sel===it.id?`${C.gold}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?C.gold:"rgba(255,255,255,0.1)"}`}}>
            <div style={{fontSize:20}}>{it.icon}</div>
            <div style={{fontSize:12,fontWeight:700,color:sel===it.id?C.gold2:C.white}}>{it.id}. {it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${C.gold}15`,border:`1px solid ${C.gold}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      {!sel_&&<div style={{textAlign:"center",fontSize:10,color:C.muted}}>{lang==="fr"?"Touche une priorité pour voir pourquoi elle vient à ce rang":lang==="en"?"Tap a priority to see why it ranks there":lang==="es"?"Toca una prioridad para ver por qué ocupa ese lugar":"Toque numa prioridade para ver por que ocupa esse lugar"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — CASCADING FAILURE (DOMINO EFFECT)
// ══════════════════════════════════════
function CascadingFailureSVG({ lang }) {
  const [step, setStep] = useState(0);
  const stages = [
    { label:{fr:"Générateur n°1 en surcharge",en:"Generator #1 overloaded",es:"Generador n.º 1 sobrecargado",pt:"Gerador n.º 1 sobrecarregado"}, color:C.orange },
    { label:{fr:"Générateur n°1 se déclenche (trip)",en:"Generator #1 trips",es:"El generador n.º 1 se dispara",pt:"O gerador n.º 1 dispara"}, color:C.red },
    { label:{fr:"Charge transférée brutalement sur le n°2",en:"Load abruptly transferred to #2",es:"Carga transferida bruscamente al n.º 2",pt:"Carga transferida bruscamente para o n.º 2"}, color:C.orange },
    { label:{fr:"Générateur n°2 surchargé à son tour, se déclenche",en:"Generator #2 overloaded in turn, trips",es:"El generador n.º 2 se sobrecarga a su vez y se dispara",pt:"O gerador n.º 2 sobrecarrega-se por sua vez e dispara"}, color:C.red },
    { label:{fr:"Blackout total",en:"Total blackout",es:"Apagón total",pt:"Blackout total"}, color:C.red },
  ];
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {stages.map((s,i)=>(
          <div key={i} onClick={()=>setStep(i)}
            style={{padding:"8px 12px",borderRadius:10,cursor:"pointer",
              background:step>=i?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1px solid ${step>=i?s.color:"rgba(255,255,255,0.08)"}`,
              opacity:step>=i?1:0.5, fontSize:11, color:step>=i?C.white:C.muted, fontWeight:step===i?700:400}}>
            {i+1}. {s.label[lang]||s.label.fr}
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",fontSize:10,color:C.muted,marginBottom:8}}>{lang==="fr"?"Touche chaque étape pour voir la chaîne se dérouler":lang==="en"?"Tap each step to see the chain unfold":lang==="es"?"Toca cada paso para ver la cadena desarrollarse":"Toque em cada passo para ver a cadeia a desenrolar-se"}</div>
      {step>=4&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(192,57,43,0.12)",border:`1px solid ${C.red}44`,fontSize:11,color:C.gold2,lineHeight:1.7,fontStyle:"italic"}}>
        {lang==="fr"?"⚡ Un seul générateur en surcharge non anticipée peut entraîner l'ensemble du réseau électrique en quelques secondes — c'est pourquoi surveiller la répartition de charge après une première panne est aussi critique que traiter la panne elle-même.":
         lang==="en"?"⚡ A single unanticipated generator overload can bring down the entire electrical network within seconds — this is why monitoring load distribution after a first failure is as critical as handling the failure itself.":
         lang==="es"?"⚡ Un solo generador sobrecargado de forma imprevista puede derribar toda la red eléctrica en segundos — por eso vigilar la distribución de carga tras un primer fallo es tan crítico como gestionar el propio fallo.":
         "⚡ Um único gerador sobrecarregado de forma imprevista pode derrubar toda a rede elétrica em segundos — por isso vigiar a distribuição de carga após uma primeira falha é tão crítico como tratar a própria falha."}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — SUSTAINED EMERGENCY TIMELINE
// ══════════════════════════════════════
function SustainedTimelineSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const phases = [
    { id:"h0", label:{fr:"Heure 0",en:"Hour 0",es:"Hora 0",pt:"Hora 0"}, note:{fr:"Danger immédiat : incendie, blackout. Priorité absolue : stabiliser et sécuriser.",en:"Immediate danger: fire, blackout. Absolute priority: stabilize and secure.",es:"Peligro inmediato: incendio, apagón. Prioridad absoluta: estabilizar y asegurar.",pt:"Perigo imediato: incêndio, blackout. Prioridade absoluta: estabilizar e assegurar."} },
    { id:"h24", label:{fr:"Jour 1",en:"Day 1",es:"Día 1",pt:"Dia 1"}, note:{fr:"Le danger immédiat est écarté, mais la propulsion reste indisponible. Priorité : gestion prolongée des ressources (énergie, eau, sanitaires).",en:"The immediate danger has passed, but propulsion remains unavailable. Priority: prolonged resource management (power, water, sanitation).",es:"El peligro inmediato ha pasado, pero la propulsión sigue indisponible. Prioridad: gestión prolongada de recursos (energía, agua, saneamiento).",pt:"O perigo imediato passou, mas a propulsão continua indisponível. Prioridade: gestão prolongada de recursos (energia, água, saneamento)."} },
    { id:"d5", label:{fr:"Jour 5",en:"Day 5",es:"Día 5",pt:"Dia 5"}, note:{fr:"Remorquage et gestion de la fatigue de l'équipage sur la durée deviennent les enjeux principaux, bien après la phase d'urgence initiale.",en:"Towing and managing crew fatigue over time become the main challenges, well after the initial emergency phase.",es:"El remolque y la gestión de la fatiga de la tripulación a lo largo del tiempo se convierten en los principales retos, mucho después de la fase de emergencia inicial.",pt:"O reboque e a gestão da fadiga da tripulação ao longo do tempo tornam-se os principais desafios, muito depois da fase de emergência inicial."} },
  ];
  const sel_ = sel?phases.find(p=>p.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {phases.map(p=>(
          <div key={p.id} onClick={()=>setSel(sel===p.id?null:p.id)}
            style={{padding:"12px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===p.id?`${C.teal}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===p.id?C.teal:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:12,fontWeight:700,color:sel===p.id?C.teal:C.white}}>{p.label[lang]||p.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?(
        <div style={{padding:"10px 12px",borderRadius:12,background:`${C.teal}15`,border:`1px solid ${C.teal}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.note[lang]||sel_.note.fr}</div>
      ):(
        <div style={{textAlign:"center",fontSize:10,color:C.muted}}>{lang==="fr"?"Touche une phase pour voir comment les priorités évoluent avec le temps":lang==="en"?"Tap a phase to see how priorities shift over time":lang==="es"?"Toca una fase para ver cómo evolucionan las prioridades con el tiempo":"Toque numa fase para ver como as prioridades evoluem com o tempo"}</div>
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
  const correct = {q1:"a",q2:"c",q3:"b",q4:"a"};
  const qs = {
    fr:[
      {id:"q1",q:"Le blackout vient d'être résolu et le générateur de secours alimente le réseau. Quelle est la toute première priorité de restauration ?\na) La gouverne, indispensable pour manœuvrer même à faible puissance\nb) L'éclairage de confort dans les cabines\nc) La climatisation"},
      {id:"q2",q:"Le générateur de secours seul alimente maintenant tout le réseau. Que dois-tu surveiller en priorité ?\na) Rien, le plus dur est passé\nb) Uniquement la température moteur\nc) La charge totale, pour éviter qu'il ne se surcharge et ne déclenche à son tour"},
      {id:"q3",q:"Une avarie initiale comportait un départ de feu maîtrisé. Avant de considérer la situation stabilisée, que faut-il vérifier ?\na) Rien de plus, le feu est éteint\nb) Que la capacité de lutte incendie (pompes) est bien restaurée\nc) Uniquement l'état du moteur principal"},
      {id:"q4",q:"Pourquoi les priorités d'une avarie prolongée (plusieurs jours) diffèrent-elles de celles des premières minutes ?\na) Parce que l'enjeu passe de la stabilisation immédiate à la gestion prolongée des ressources et de l'équipage\nb) Elles ne diffèrent jamais\nc) Seule la météo détermine les priorités"},
    ],
    en:[
      {id:"q1",q:"The blackout has just been resolved and the emergency generator is powering the network. What is the very first restoration priority?\na) Steering, essential to maneuver even at low power\nb) Comfort lighting in cabins\nc) Air conditioning"},
      {id:"q2",q:"The emergency generator alone now powers the whole network. What should you monitor as a priority?\na) Nothing, the hardest part is over\nb) Only engine temperature\nc) The total load, to avoid it overloading and tripping in turn"},
      {id:"q3",q:"An initial casualty involved a contained fire outbreak. Before considering the situation stabilized, what must be checked?\na) Nothing more, the fire is out\nb) That firefighting capability (pumps) has been properly restored\nc) Only the main engine's condition"},
      {id:"q4",q:"Why do the priorities of a prolonged casualty (several days) differ from those of the first minutes?\na) Because the challenge shifts from immediate stabilization to prolonged resource and crew management\nb) They never differ\nc) Only the weather determines priorities"},
    ],
    es:[
      {id:"q1",q:"El apagón acaba de resolverse y el generador de emergencia alimenta la red. ¿Cuál es la primerísima prioridad de restauración?\na) El gobierno, esencial para maniobrar aunque sea a baja potencia\nb) La iluminación de confort en los camarotes\nc) El aire acondicionado"},
      {id:"q2",q:"El generador de emergencia solo alimenta ahora toda la red. ¿Qué debes vigilar como prioridad?\na) Nada, lo más difícil ya pasó\nb) Solo la temperatura del motor\nc) La carga total, para evitar que se sobrecargue y se dispare también"},
      {id:"q3",q:"Una avería inicial implicó un conato de incendio controlado. Antes de considerar la situación estabilizada, ¿qué hay que verificar?\na) Nada más, el fuego está apagado\nb) Que la capacidad de lucha contra incendios (bombas) esté bien restaurada\nc) Solo el estado del motor principal"},
      {id:"q4",q:"¿Por qué las prioridades de una avería prolongada (varios días) difieren de las de los primeros minutos?\na) Porque el reto pasa de la estabilización inmediata a la gestión prolongada de recursos y tripulación\nb) Nunca difieren\nc) Solo el tiempo meteorológico determina las prioridades"},
    ],
    pt:[
      {id:"q1",q:"O blackout acabou de ser resolvido e o gerador de emergência alimenta a rede. Qual é a primeiríssima prioridade de restauração?\na) O governo, essencial para manobrar mesmo com pouca potência\nb) A iluminação de conforto nas cabines\nc) O ar condicionado"},
      {id:"q2",q:"O gerador de emergência sozinho alimenta agora toda a rede. O que deves vigiar prioritariamente?\na) Nada, a parte mais difícil já passou\nb) Só a temperatura do motor\nc) A carga total, para evitar que se sobrecarregue e dispare também"},
      {id:"q3",q:"Uma avaria inicial envolveu um início de incêndio controlado. Antes de considerar a situação estabilizada, o que deve ser verificado?\na) Nada mais, o fogo está apagado\nb) Que a capacidade de combate a incêndios (bombas) foi bem restaurada\nc) Só o estado do motor principal"},
      {id:"q4",q:"Por que é que as prioridades de uma avaria prolongada (vários dias) diferem das dos primeiros minutos?\na) Porque o desafio passa da estabilização imediata para a gestão prolongada de recursos e tripulação\nb) Nunca diferem\nc) Só o tempo meteorológico determina as prioridades"},
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
        {lang==="fr"?"✅ Q1: a — la gouverne prime, sans elle aucune manœuvre n'est possible\n✅ Q2: c — surveiller la charge évite un second blackout par surcharge\n✅ Q3: b — la capacité de lutte incendie doit être vérifiée avant de conclure à la stabilisation\n✅ Q4: a — l'enjeu se déplace de la stabilisation immédiate vers la gestion prolongée":
         lang==="en"?"✅ Q1: a — steering comes first, without it no maneuver is possible\n✅ Q2: c — monitoring load avoids a second blackout from overload\n✅ Q3: b — firefighting capability must be checked before concluding stabilization\n✅ Q4: a — the challenge shifts from immediate stabilization to prolonged management":
         "✅ Q1: a · Q2: c · Q3: b · Q4: a"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — CARNIVAL TRIUMPH
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Carnival Triumph — Golfe du Mexique (10 février 2013)",teaser:"Incendie en salle des machines · Perte totale d'électricité · 5 jours sans propulsion · 4 200 personnes à bord",
      what:"Une fuite sur une conduite de retour de fuel projette du carburant sur une surface chaude du moteur n°6, déclenchant un incendie en salle des machines. Le système d'extinction se déclenche immédiatement et l'équipe machine réagit rapidement, mais le navire perd toute alimentation électrique et toute propulsion. Contrairement à un blackout de quelques minutes, le Carnival Triumph reste sans propulsion pendant environ 5 jours, nécessitant un remorquage jusqu'au port, pendant que l'équipage gère l'absence prolongée d'électricité et de sanitaires pour 4 200 personnes à bord.",
      cause:"• Fuite sur une conduite de retour de fuel entre le moteur n°6 et la caisse de service\n• Projection de carburant sur une surface chaude, déclenchant l'incendie\n• Perte totale d'alimentation électrique consécutive à l'incendie\n• Absence de solution de propulsion de secours suffisante pour une remise en route rapide",
      lessons:"✓ Le système d'extinction automatique et la réaction rapide de l'équipe ont empêché l'incendie de s'aggraver davantage\n✓ Toutes les avaries majeures ne se résolvent pas en quelques minutes — certaines exigent une gestion prolongée sur plusieurs jours\n✓ Les priorités évoluent avec le temps : la stabilisation immédiate cède la place à la gestion des ressources (énergie, eau, sanitaires) sur la durée\n✓ La coordination entre salle des machines, passerelle et gestion de crise à terre devient centrale dans une avarie prolongée",
      link:"🔗 L'enquête conjointe USCG/NTSB/Bahamas Maritime Authority documente la séquence de l'incendie et souligne la qualité de la réponse initiale de l'équipage malgré l'ampleur de l'avarie."},
    en:{title:"Carnival Triumph — Gulf of Mexico (10 February 2013)",teaser:"Engine room fire · Total loss of electrical power · 5 days without propulsion · 4,200 people on board",
      what:"A leak in a fuel oil return line sprayed fuel onto a hot surface on engine #6, triggering an engine room fire. The suppression system activated immediately and the engine team reacted quickly, but the ship lost all electrical power and propulsion. Unlike a blackout lasting minutes, the Carnival Triumph remained without propulsion for about 5 days, requiring a tow to port, while the crew managed the prolonged absence of power and sanitation for 4,200 people on board.",
      cause:"• A leak in a fuel oil return line between engine #6 and the service tank\n• Fuel sprayed onto a hot surface, triggering the fire\n• Total loss of electrical power following the fire\n• No sufficient backup propulsion solution for a quick restart",
      lessons:"✓ The automatic suppression system and the team's fast reaction prevented the fire from worsening further\n✓ Not all major casualties resolve within minutes — some require prolonged management over several days\n✓ Priorities shift over time: immediate stabilization gives way to sustained resource management (power, water, sanitation)\n✓ Coordination between the engine room, the bridge, and shore-based crisis management becomes central in a prolonged casualty",
      link:"🔗 The joint USCG/NTSB/Bahamas Maritime Authority investigation documents the sequence of the fire and highlights the quality of the crew's initial response despite the scale of the casualty."},
    es:{title:"Carnival Triumph — Golfo de México (10 de febrero de 2013)",teaser:"Incendio en sala de máquinas · Pérdida total de electricidad · 5 días sin propulsión · 4 200 personas a bordo",
      what:"Una fuga en una tubería de retorno de fuel roció combustible sobre una superficie caliente del motor n.º 6, provocando un incendio en la sala de máquinas. El sistema de extinción se activó de inmediato y el equipo de máquinas reaccionó rápidamente, pero el buque perdió toda la alimentación eléctrica y la propulsión. A diferencia de un apagón de minutos, el Carnival Triumph permaneció sin propulsión durante unos 5 días, necesitando remolque hasta puerto, mientras la tripulación gestionaba la ausencia prolongada de electricidad y saneamiento para 4 200 personas a bordo.",
      cause:"• Fuga en una tubería de retorno de fuel entre el motor n.º 6 y el tanque de servicio\n• Combustible rociado sobre una superficie caliente, provocando el incendio\n• Pérdida total de alimentación eléctrica tras el incendio\n• Falta de una solución de propulsión de respaldo suficiente para un reinicio rápido",
      lessons:"✓ El sistema de extinción automático y la rápida reacción del equipo impidieron que el incendio se agravara más\n✓ No todas las averías mayores se resuelven en minutos — algunas exigen una gestión prolongada durante varios días\n✓ Las prioridades evolucionan con el tiempo: la estabilización inmediata da paso a la gestión sostenida de recursos (energía, agua, saneamiento)\n✓ La coordinación entre la sala de máquinas, el puente y la gestión de crisis en tierra se vuelve central en una avería prolongada",
      link:"🔗 La investigación conjunta USCG/NTSB/Bahamas Maritime Authority documenta la secuencia del incendio y destaca la calidad de la respuesta inicial de la tripulación pese a la magnitud de la avería."},
    pt:{title:"Carnival Triumph — Golfo do México (10 de fevereiro de 2013)",teaser:"Incêndio na casa das máquinas · Perda total de eletricidade · 5 dias sem propulsão · 4 200 pessoas a bordo",
      what:"Uma fuga numa tubagem de retorno de fuel projetou combustível sobre uma superfície quente do motor n.º 6, provocando um incêndio na casa das máquinas. O sistema de extinção ativou-se de imediato e a equipa de máquinas reagiu rapidamente, mas o navio perdeu toda a alimentação elétrica e a propulsão. Ao contrário de um blackout de minutos, o Carnival Triumph permaneceu sem propulsão durante cerca de 5 dias, necessitando de reboque até ao porto, enquanto a tripulação geria a ausência prolongada de eletricidade e saneamento para 4 200 pessoas a bordo.",
      cause:"• Fuga numa tubagem de retorno de fuel entre o motor n.º 6 e o tanque de serviço\n• Combustível projetado sobre uma superfície quente, provocando o incêndio\n• Perda total de alimentação elétrica na sequência do incêndio\n• Ausência de uma solução de propulsão de reserva suficiente para um reinício rápido",
      lessons:"✓ O sistema de extinção automático e a reação rápida da equipa impediram que o incêndio se agravasse mais\n✓ Nem todas as avarias maiores se resolvem em minutos — algumas exigem uma gestão prolongada ao longo de vários dias\n✓ As prioridades evoluem com o tempo: a estabilização imediata dá lugar à gestão sustentada de recursos (energia, água, saneamento)\n✓ A coordenação entre a casa das máquinas, a ponte e a gestão de crise em terra torna-se central numa avaria prolongada",
      link:"🔗 A investigação conjunta USCG/NTSB/Bahamas Maritime Authority documenta a sequência do incêndio e destaca a qualidade da resposta inicial da tripulação apesar da dimensão da avaria."},
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
    {q:"Une fois le danger immédiat écarté après un blackout, quelle est la toute première priorité de restauration ?",opts:["L'éclairage de confort","La gouverne, indispensable pour manœuvrer même à faible puissance","La climatisation","Les systèmes de divertissement"],correct:1,expl:"Sans gouverne, le navire ne peut pas être manœuvré même si la propulsion revient — c'est la toute première priorité."},
    {q:"Pourquoi la propulsion vient-elle juste après la gouverne dans l'ordre de priorité ?",opts:["Elle n'a pas d'importance particulière","Elle permet de reprendre le contrôle de la position du navire","Elle est toujours plus rapide à restaurer que la gouverne","Ce n'est jamais une priorité en pratique"],correct:1,expl:"Restaurer un minimum de puissance propulsive permet de reprendre le contrôle de la position du navire, juste après la gouverne."},
    {q:"Si l'avarie initiale comportait un risque incendie, que doit-on vérifier avant de conclure à la stabilisation ?",opts:["Rien de plus","Que la capacité de lutte incendie (pompes) est bien restaurée","Uniquement l'état du moteur principal","La météo prévue"],correct:1,expl:"La capacité de lutte incendie doit être rétablie avant de considérer la situation comme stabilisée, en particulier si un feu était en cause."},
    {q:"Qu'est-ce qu'un effet domino (cascading failure) en salle des machines ?",opts:["Un jeu de société pratiqué par l'équipe machine","Une panne initiale qui, non contenue, en déclenche une seconde puis une troisième","Une procédure de maintenance préventive","Un type de moteur"],correct:1,expl:"Une panne initiale (ex : surcharge d'un générateur) peut déclencher une chaîne de défaillances si elle n'est pas surveillée et contenue à temps."},
    {q:"Pourquoi surveiller la charge du générateur de secours après un blackout ?",opts:["Ce n'est pas nécessaire une fois qu'il fonctionne","Pour éviter qu'il ne se surcharge et ne déclenche à son tour, provoquant un second blackout","Uniquement pour des raisons esthétiques d'affichage","La charge ne varie jamais après un blackout"],correct:1,expl:"Un générateur de secours peut lui-même se surcharger si la charge n'est pas surveillée et répartie correctement, provoquant un second blackout."},
    {q:"Que montre le cas du Carnival Triumph (2013) ?",opts:["Que toutes les avaries se résolvent en quelques minutes","Que certaines avaries majeures exigent une gestion prolongée sur plusieurs jours, avec des priorités qui évoluent dans le temps","Que l'équipage n'a aucun rôle après l'extinction d'un incendie","Que le remorquage est toujours immédiat"],correct:1,expl:"Le Carnival Triumph est resté sans propulsion environ 5 jours, illustrant qu'une avarie majeure peut nécessiter une gestion de crise prolongée, pas seulement une réponse d'urgence immédiate."},
    {q:"Comment les priorités évoluent-elles entre l'heure 0 d'une avarie majeure et le jour 5 ?",opts:["Elles restent identiques du début à la fin","Elles passent de la stabilisation immédiate à la gestion prolongée des ressources et de l'équipage","Elles deviennent moins importantes avec le temps","Seule la passerelle a des priorités, jamais la salle des machines"],correct:1,expl:"L'enjeu se déplace de la stabilisation immédiate (heure 0) vers la gestion prolongée de l'énergie, de l'eau et de la fatigue de l'équipage (jours suivants)."},
    {q:"Pourquoi le système d'extinction automatique a-t-il été crucial dans le cas Carnival Triumph ?",opts:["Il n'a joué aucun rôle","Il s'est déclenché immédiatement, empêchant l'incendie de s'aggraver davantage",  "Il a provoqué l'incendie","Il a retardé l'intervention de l'équipage"],correct:1,expl:"Le système d'extinction s'est déclenché immédiatement, contribuant à limiter l'ampleur de l'incendie malgré la perte totale d'électricité qui a suivi."},
    {q:"Quel est l'objectif principal de la leçon L4 de ce module ?",opts:["Réexpliquer les procédures d'urgence immédiate déjà vues en L3","Structurer la phase de stabilisation qui suit l'urgence immédiate, y compris sur une durée prolongée","Étudier la responsabilité juridique en cas d'avarie","Apprendre à remplacer un générateur"],correct:1,expl:"L4 se concentre sur ce qui vient après l'action d'urgence immédiate (L3) : la stabilisation, la priorisation des services, et la gestion prolongée si nécessaire."},
    {q:"Pourquoi une avarie prolongée nécessite-t-elle une coordination différente d'une urgence de quelques minutes ?",opts:["Elle n'en nécessite aucune différence","Elle implique une gestion des ressources humaines et matérielles sur la durée, incluant la fatigue de l'équipage","Seule la technique compte, jamais l'équipage","La coordination s'arrête après la première heure"],correct:1,expl:"Une avarie prolongée mobilise l'équipage sur plusieurs jours, ce qui introduit des enjeux de fatigue, de moral et de gestion des ressources absents d'une urgence de quelques minutes."},
    {q:"Que risque une équipe qui néglige de surveiller la répartition de charge après avoir rétabli un générateur de secours ?",opts:["Rien, une fois rétabli le risque a disparu","Un second blackout provoqué par la surcharge du générateur de secours lui-même","Une amélioration automatique de la situation","Cela ne concerne que la passerelle"],correct:1,expl:"Le générateur de secours peut lui-même se surcharger et se déclencher s'il n'est pas surveillé, provoquant un second blackout évitable."},
    {q:"Dans quel ordre les priorités de restauration se déclinent-elles généralement après un blackout ?",opts:["Confort, propulsion, gouverne, incendie","Gouverne, propulsion, lutte incendie, autres services essentiels","Divertissement, sanitaire, gouverne, propulsion","Il n'existe aucun ordre standard"],correct:1,expl:"L'ordre logique privilégie d'abord la maîtrise du navire (gouverne, propulsion), puis la sécurité (lutte incendie), puis les autres services essentiels."},
    {q:"Pourquoi ne faut-il pas considérer une avarie 'résolue' dès que l'alimentation électrique revient ?",opts:["Parce que le retour d'électricité règle systématiquement tous les problèmes","Parce que d'autres priorités (gouverne, lutte incendie, répartition de charge) doivent encore être vérifiées avant de conclure à la stabilisation","Parce que l'électricité n'a aucun rapport avec la stabilisation","Parce qu'il faut toujours attendre 24h avant de conclure quoi que ce soit"],correct:1,expl:"Le retour de l'alimentation électrique est une étape, pas la fin du processus — d'autres vérifications restent nécessaires avant de conclure à la stabilisation réelle."},
    {q:"En quoi la leçon L4 s'appuie-t-elle sur L3 ?",opts:["Elle n'a aucun lien avec L3","Elle prend le relais après l'action d'urgence immédiate de L3, pour structurer la phase de stabilisation et de gestion prolongée","Elle contredit entièrement L3","Elle remplace L3 dans les cas prolongés uniquement"],correct:1,expl:"L3 couvre l'action d'urgence immédiate ; L4 couvre ce qui vient après, une fois le danger immédiat écarté."},
    {q:"Que signifie 'stabiliser' une situation après une avarie majeure ?",opts:["Redémarrer immédiatement toutes les opérations normales sans vérification","Confirmer que les priorités essentielles (gouverne, propulsion, sécurité) sont couvertes avant de considérer le danger immédiat écarté","Attendre que la passerelle donne l'ordre de reprendre","Documenter l'incident sans autre action"],correct:1,expl:"Stabiliser signifie confirmer méthodiquement que les priorités essentielles sont couvertes, pas simplement reprendre les opérations sans vérification."},
  ],
  en:[
    {q:"Once the immediate danger has passed after a blackout, what is the very first restoration priority?",opts:["Comfort lighting","Steering, essential to maneuver even at low power","Air conditioning","Entertainment systems"],correct:1,expl:"Without steering, the ship cannot be maneuvered even if propulsion returns — this is the very first priority."},
    {q:"Why does propulsion come right after steering in the priority order?",opts:["It has no particular importance","It allows regaining control of the ship's position","It is always faster to restore than steering","It is never a priority in practice"],correct:1,expl:"Restoring a minimum of propulsive power allows regaining control of the ship's position, right after steering."},
    {q:"If the initial casualty involved a fire risk, what must be checked before concluding stabilization?",opts:["Nothing more","That firefighting capability (pumps) has been properly restored","Only the main engine's condition","The forecast weather"],correct:1,expl:"Firefighting capability must be restored before considering the situation stabilized, especially if a fire was involved."},
    {q:"What is a cascading failure in the engine room?",opts:["A board game played by the engine team","An initial failure that, left uncontained, triggers a second and then a third","A preventive maintenance procedure","A type of engine"],correct:1,expl:"An initial failure (e.g. a generator overload) can trigger a chain of failures if not monitored and contained in time."},
    {q:"Why monitor the emergency generator's load after a blackout?",opts:["It's not necessary once it's running","To prevent it from overloading and tripping in turn, causing a second blackout","Only for display purposes","Load never changes after a blackout"],correct:1,expl:"An emergency generator can itself overload if the load is not monitored and distributed correctly, causing a second blackout."},
    {q:"What does the Carnival Triumph case (2013) show?",opts:["That all casualties resolve within minutes","That some major casualties require prolonged management over several days, with priorities shifting over time","That the crew has no role once a fire is extinguished","That towing is always immediate"],correct:1,expl:"Carnival Triumph remained without propulsion for about 5 days, illustrating that a major casualty can require prolonged crisis management, not just an immediate emergency response."},
    {q:"How do priorities shift between hour 0 of a major casualty and day 5?",opts:["They remain identical from start to end","They shift from immediate stabilization to prolonged resource and crew management","They become less important over time","Only the bridge has priorities, never the engine room"],correct:1,expl:"The challenge shifts from immediate stabilization (hour 0) to prolonged management of power, water, and crew fatigue (following days)."},
    {q:"Why was the automatic suppression system crucial in the Carnival Triumph case?",opts:["It played no role","It activated immediately, preventing the fire from worsening further","It caused the fire","It delayed the crew's intervention"],correct:1,expl:"The suppression system activated immediately, helping limit the extent of the fire despite the total loss of power that followed."},
    {q:"What is the main goal of lesson L4 in this module?",opts:["Re-explain the immediate emergency procedures already covered in L3","Structure the stabilization phase that follows the immediate emergency, including over a prolonged period","Study legal liability in case of a casualty","Learn how to replace a generator"],correct:1,expl:"L4 focuses on what comes after the immediate emergency action (L3): stabilization, service prioritization, and prolonged management if needed."},
    {q:"Why does a prolonged casualty require different coordination than a few-minutes emergency?",opts:["It requires no difference at all","It involves managing human and material resources over time, including crew fatigue","Only technical matters count, never the crew","Coordination stops after the first hour"],correct:1,expl:"A prolonged casualty engages the crew over several days, introducing fatigue, morale, and resource management issues absent from a few-minutes emergency."},
    {q:"What does a team risk by neglecting to monitor load distribution after restoring an emergency generator?",opts:["Nothing, once restored the risk is gone","A second blackout caused by the emergency generator itself overloading","An automatic improvement of the situation","It only concerns the bridge"],correct:1,expl:"The emergency generator can itself overload and trip if not monitored, causing an avoidable second blackout."},
    {q:"In what order do restoration priorities generally unfold after a blackout?",opts:["Comfort, propulsion, steering, fire","Steering, propulsion, firefighting, other essential services","Entertainment, sanitation, steering, propulsion","There is no standard order"],correct:1,expl:"The logical order favors first regaining control of the ship (steering, propulsion), then safety (firefighting), then other essential services."},
    {q:"Why should a casualty not be considered 'resolved' as soon as electrical power returns?",opts:["Because power returning systematically solves all problems","Because other priorities (steering, firefighting, load distribution) still need to be checked before concluding stabilization","Because electricity has no relation to stabilization","Because you must always wait 24h before concluding anything"],correct:1,expl:"Power returning is one step, not the end of the process — other checks remain necessary before concluding actual stabilization."},
    {q:"How does lesson L4 build on L3?",opts:["It has no link to L3","It takes over after L3's immediate emergency action, to structure the stabilization and prolonged management phase","It fully contradicts L3","It replaces L3 only in prolonged cases"],correct:1,expl:"L3 covers the immediate emergency action; L4 covers what comes after, once the immediate danger has passed."},
    {q:"What does 'stabilizing' a situation after a major casualty mean?",opts:["Immediately resuming all normal operations without checks","Confirming that essential priorities (steering, propulsion, safety) are covered before considering the immediate danger passed","Waiting for the bridge to give the order to resume","Documenting the incident without further action"],correct:1,expl:"Stabilizing means methodically confirming that essential priorities are covered, not simply resuming operations without verification."},
  ],
  es:[
    {q:"Una vez que el peligro inmediato ha pasado tras un apagón, ¿cuál es la primerísima prioridad de restauración?",opts:["La iluminación de confort","El gobierno, esencial para maniobrar aunque sea a baja potencia","El aire acondicionado","Los sistemas de entretenimiento"],correct:1,expl:"Sin gobierno, el buque no puede maniobrarse aunque vuelva la propulsión — es la primerísima prioridad."},
    {q:"¿Por qué la propulsión viene justo después del gobierno en el orden de prioridad?",opts:["No tiene ninguna importancia particular","Permite recuperar el control de la posición del buque","Siempre es más rápida de restaurar que el gobierno","Nunca es una prioridad en la práctica"],correct:1,expl:"Restaurar un mínimo de potencia propulsiva permite recuperar el control de la posición del buque, justo después del gobierno."},
    {q:"Si la avería inicial implicaba riesgo de incendio, ¿qué hay que verificar antes de concluir la estabilización?",opts:["Nada más","Que la capacidad de lucha contra incendios (bombas) esté bien restaurada","Solo el estado del motor principal","El tiempo meteorológico previsto"],correct:1,expl:"La capacidad de lucha contra incendios debe restablecerse antes de considerar la situación estabilizada, especialmente si hubo fuego."},
    {q:"¿Qué es un fallo en cascada (cascading failure) en la sala de máquinas?",opts:["Un juego de mesa practicado por el equipo de máquinas","Un fallo inicial que, sin contener, desencadena un segundo y luego un tercero","Un procedimiento de mantenimiento preventivo","Un tipo de motor"],correct:1,expl:"Un fallo inicial (p. ej. sobrecarga de un generador) puede desencadenar una cadena de fallos si no se vigila y contiene a tiempo."},
    {q:"¿Por qué vigilar la carga del generador de emergencia después de un apagón?",opts:["No es necesario una vez que funciona","Para evitar que se sobrecargue y se dispare también, provocando un segundo apagón","Solo por razones estéticas de visualización","La carga nunca cambia después de un apagón"],correct:1,expl:"Un generador de emergencia puede sobrecargarse él mismo si la carga no se vigila y distribuye correctamente, provocando un segundo apagón."},
    {q:"¿Qué muestra el caso del Carnival Triumph (2013)?",opts:["Que todas las averías se resuelven en minutos","Que algunas averías mayores exigen una gestión prolongada durante varios días, con prioridades que evolucionan con el tiempo","Que la tripulación no tiene ningún papel tras extinguir un incendio","Que el remolque siempre es inmediato"],correct:1,expl:"El Carnival Triumph permaneció sin propulsión unos 5 días, ilustrando que una avería mayor puede requerir una gestión de crisis prolongada, no solo una respuesta de emergencia inmediata."},
    {q:"¿Cómo evolucionan las prioridades entre la hora 0 de una avería mayor y el día 5?",opts:["Permanecen idénticas de principio a fin","Pasan de la estabilización inmediata a la gestión prolongada de recursos y tripulación","Se vuelven menos importantes con el tiempo","Solo el puente tiene prioridades, nunca la sala de máquinas"],correct:1,expl:"El reto pasa de la estabilización inmediata (hora 0) a la gestión prolongada de energía, agua y fatiga de la tripulación (días siguientes)."},
    {q:"¿Por qué fue crucial el sistema de extinción automático en el caso Carnival Triumph?",opts:["No jugó ningún papel","Se activó de inmediato, impidiendo que el incendio se agravara más","Provocó el incendio","Retrasó la intervención de la tripulación"],correct:1,expl:"El sistema de extinción se activó de inmediato, ayudando a limitar la magnitud del incendio pese a la pérdida total de electricidad que siguió."},
    {q:"¿Cuál es el objetivo principal de la lección L4 de este módulo?",opts:["Reexplicar los procedimientos de emergencia inmediata ya vistos en L3","Estructurar la fase de estabilización que sigue a la emergencia inmediata, incluso durante un periodo prolongado","Estudiar la responsabilidad jurídica en caso de avería","Aprender a sustituir un generador"],correct:1,expl:"L4 se centra en lo que viene después de la acción de emergencia inmediata (L3): estabilización, priorización de servicios y gestión prolongada si es necesario."},
    {q:"¿Por qué una avería prolongada requiere una coordinación distinta a una emergencia de minutos?",opts:["No requiere ninguna diferencia","Implica gestionar recursos humanos y materiales a lo largo del tiempo, incluyendo la fatiga de la tripulación","Solo cuenta lo técnico, nunca la tripulación","La coordinación se detiene tras la primera hora"],correct:1,expl:"Una avería prolongada moviliza a la tripulación durante varios días, introduciendo cuestiones de fatiga, moral y gestión de recursos ausentes en una emergencia de minutos."},
    {q:"¿Qué arriesga un equipo que descuida vigilar la distribución de carga tras restablecer un generador de emergencia?",opts:["Nada, una vez restablecido el riesgo desaparece","Un segundo apagón provocado por la sobrecarga del propio generador de emergencia","Una mejora automática de la situación","Solo concierne al puente"],correct:1,expl:"El generador de emergencia puede sobrecargarse él mismo y dispararse si no se vigila, provocando un segundo apagón evitable."},
    {q:"¿En qué orden se despliegan generalmente las prioridades de restauración tras un apagón?",opts:["Confort, propulsión, gobierno, incendio","Gobierno, propulsión, lucha contra incendios, otros servicios esenciales","Entretenimiento, saneamiento, gobierno, propulsión","No existe un orden estándar"],correct:1,expl:"El orden lógico prioriza primero el control del buque (gobierno, propulsión), luego la seguridad (lucha contra incendios), luego otros servicios esenciales."},
    {q:"¿Por qué no hay que considerar una avería 'resuelta' en cuanto vuelve la electricidad?",opts:["Porque el regreso de la electricidad soluciona sistemáticamente todos los problemas","Porque otras prioridades (gobierno, lucha contra incendios, distribución de carga) aún deben verificarse antes de concluir la estabilización","Porque la electricidad no tiene relación con la estabilización","Porque siempre hay que esperar 24h antes de concluir cualquier cosa"],correct:1,expl:"El regreso de la electricidad es una etapa, no el final del proceso — otras verificaciones siguen siendo necesarias antes de concluir la estabilización real."},
    {q:"¿En qué se apoya la lección L4 en L3?",opts:["No tiene relación con L3","Toma el relevo tras la acción de emergencia inmediata de L3, para estructurar la fase de estabilización y gestión prolongada","Contradice completamente a L3","Sustituye a L3 solo en casos prolongados"],correct:1,expl:"L3 cubre la acción de emergencia inmediata; L4 cubre lo que viene después, una vez pasado el peligro inmediato."},
    {q:"¿Qué significa 'estabilizar' una situación tras una avería mayor?",opts:["Reanudar de inmediato todas las operaciones normales sin verificación","Confirmar que las prioridades esenciales (gobierno, propulsión, seguridad) están cubiertas antes de considerar el peligro inmediato superado","Esperar a que el puente dé la orden de reanudar","Documentar el incidente sin ninguna otra acción"],correct:1,expl:"Estabilizar significa confirmar metódicamente que las prioridades esenciales están cubiertas, no simplemente reanudar operaciones sin verificación."},
  ],
  pt:[
    {q:"Uma vez passado o perigo imediato após um blackout, qual é a primeiríssima prioridade de restauração?",opts:["A iluminação de conforto","O governo, essencial para manobrar mesmo com pouca potência","O ar condicionado","Os sistemas de entretenimento"],correct:1,expl:"Sem governo, o navio não pode ser manobrado mesmo que a propulsão regresse — é a primeiríssima prioridade."},
    {q:"Por que é que a propulsão vem logo a seguir ao governo na ordem de prioridade?",opts:["Não tem qualquer importância particular","Permite recuperar o controlo da posição do navio","É sempre mais rápida de restaurar do que o governo","Nunca é uma prioridade na prática"],correct:1,expl:"Restaurar um mínimo de potência propulsiva permite recuperar o controlo da posição do navio, logo a seguir ao governo."},
    {q:"Se a avaria inicial envolvia risco de incêndio, o que deve ser verificado antes de concluir a estabilização?",opts:["Nada mais","Que a capacidade de combate a incêndios (bombas) foi bem restaurada","Só o estado do motor principal","O tempo meteorológico previsto"],correct:1,expl:"A capacidade de combate a incêndios deve ser restabelecida antes de considerar a situação estabilizada, sobretudo se houve fogo."},
    {q:"O que é uma falha em cascata (cascading failure) na casa das máquinas?",opts:["Um jogo de tabuleiro praticado pela equipa de máquinas","Uma falha inicial que, não contida, desencadeia uma segunda e depois uma terceira","Um procedimento de manutenção preventiva","Um tipo de motor"],correct:1,expl:"Uma falha inicial (ex: sobrecarga de um gerador) pode desencadear uma cadeia de falhas se não for vigiada e contida a tempo."},
    {q:"Por que vigiar a carga do gerador de emergência após um blackout?",opts:["Não é necessário depois de funcionar","Para evitar que se sobrecarregue e dispare também, provocando um segundo blackout","Só por razões estéticas de visualização","A carga nunca muda depois de um blackout"],correct:1,expl:"Um gerador de emergência pode sobrecarregar-se a si próprio se a carga não for vigiada e distribuída corretamente, provocando um segundo blackout."},
    {q:"O que mostra o caso do Carnival Triumph (2013)?",opts:["Que todas as avarias se resolvem em minutos","Que algumas avarias maiores exigem uma gestão prolongada ao longo de vários dias, com prioridades que evoluem com o tempo","Que a tripulação não tem qualquer papel depois de extinguir um incêndio","Que o reboque é sempre imediato"],correct:1,expl:"O Carnival Triumph ficou sem propulsão cerca de 5 dias, ilustrando que uma avaria maior pode exigir uma gestão de crise prolongada, não apenas uma resposta de emergência imediata."},
    {q:"Como evoluem as prioridades entre a hora 0 de uma avaria maior e o dia 5?",opts:["Permanecem idênticas do início ao fim","Passam da estabilização imediata para a gestão prolongada de recursos e tripulação","Tornam-se menos importantes com o tempo","Só a ponte tem prioridades, nunca a casa das máquinas"],correct:1,expl:"O desafio passa da estabilização imediata (hora 0) para a gestão prolongada de energia, água e fadiga da tripulação (dias seguintes)."},
    {q:"Por que foi crucial o sistema de extinção automático no caso Carnival Triumph?",opts:["Não teve qualquer papel","Ativou-se de imediato, impedindo que o incêndio se agravasse mais","Provocou o incêndio","Atrasou a intervenção da tripulação"],correct:1,expl:"O sistema de extinção ativou-se de imediato, ajudando a limitar a dimensão do incêndio apesar da perda total de eletricidade que se seguiu."},
    {q:"Qual é o objetivo principal da lição L4 deste módulo?",opts:["Reexplicar os procedimentos de emergência imediata já vistos em L3","Estruturar a fase de estabilização que se segue à emergência imediata, incluindo ao longo de um período prolongado","Estudar a responsabilidade jurídica em caso de avaria","Aprender a substituir um gerador"],correct:1,expl:"L4 foca-se no que vem depois da ação de emergência imediata (L3): estabilização, priorização de serviços, e gestão prolongada se necessário."},
    {q:"Por que uma avaria prolongada exige uma coordenação diferente de uma emergência de minutos?",opts:["Não exige qualquer diferença","Implica gerir recursos humanos e materiais ao longo do tempo, incluindo a fadiga da tripulação","Só conta o técnico, nunca a tripulação","A coordenação para após a primeira hora"],correct:1,expl:"Uma avaria prolongada mobiliza a tripulação durante vários dias, introduzindo questões de fadiga, moral e gestão de recursos ausentes numa emergência de minutos."},
    {q:"O que arrisca uma equipa que negligencia vigiar a distribuição de carga após restabelecer um gerador de emergência?",opts:["Nada, uma vez restabelecido o risco desaparece","Um segundo blackout provocado pela sobrecarga do próprio gerador de emergência","Uma melhoria automática da situação","Só diz respeito à ponte"],correct:1,expl:"O gerador de emergência pode sobrecarregar-se a si próprio e disparar se não for vigiado, provocando um segundo blackout evitável."},
    {q:"Em que ordem se desenrolam geralmente as prioridades de restauração após um blackout?",opts:["Conforto, propulsão, governo, incêndio","Governo, propulsão, combate a incêndios, outros serviços essenciais","Entretenimento, saneamento, governo, propulsão","Não existe uma ordem padrão"],correct:1,expl:"A ordem lógica privilegia primeiro o controlo do navio (governo, propulsão), depois a segurança (combate a incêndios), depois outros serviços essenciais."},
    {q:"Por que não se deve considerar uma avaria 'resolvida' assim que a eletricidade regressa?",opts:["Porque o regresso da eletricidade resolve sistematicamente todos os problemas","Porque outras prioridades (governo, combate a incêndios, distribuição de carga) ainda precisam de ser verificadas antes de concluir a estabilização","Porque a eletricidade não tem relação com a estabilização","Porque é preciso esperar sempre 24h antes de concluir seja o que for"],correct:1,expl:"O regresso da eletricidade é uma etapa, não o fim do processo — outras verificações continuam necessárias antes de concluir a estabilização real."},
    {q:"Como é que a lição L4 se apoia em L3?",opts:["Não tem relação com L3","Assume o relevo após a ação de emergência imediata de L3, para estruturar a fase de estabilização e gestão prolongada","Contradiz completamente L3","Substitui L3 apenas em casos prolongados"],correct:1,expl:"L3 cobre a ação de emergência imediata; L4 cobre o que vem depois, uma vez passado o perigo imediato."},
    {q:"O que significa 'estabilizar' uma situação após uma avaria maior?",opts:["Retomar imediatamente todas as operações normais sem verificação","Confirmar que as prioridades essenciais (governo, propulsão, segurança) estão cobertas antes de considerar o perigo imediato ultrapassado","Esperar que a ponte dê a ordem de retomar","Documentar o incidente sem qualquer outra ação"],correct:1,expl:"Estabilizar significa confirmar metodicamente que as prioridades essenciais estão cobertas, não apenas retomar operações sem verificação."},
  ],
};

// ══════════════════════════════════════
// QUIZ — FINAL (5 QUESTIONS)
// ══════════════════════════════════════
export const QUIZ = {
  fr:[
    {q:"Une fois le danger immédiat écarté après un blackout, quelle est la toute première priorité de restauration ?",opts:["L'éclairage de confort","La gouverne, indispensable pour manœuvrer même à faible puissance","La climatisation","Les systèmes de divertissement"],correct:1,expl:"Sans gouverne, le navire ne peut pas être manœuvré même si la propulsion revient."},
    {q:"Qu'est-ce qu'un effet domino (cascading failure) en salle des machines ?",opts:["Un jeu de société","Une panne initiale qui, non contenue, en déclenche une seconde puis une troisième","Une procédure de maintenance","Un type de moteur"],correct:1,expl:"Une panne initiale peut déclencher une chaîne de défaillances si elle n'est pas surveillée et contenue à temps."},
    {q:"Que montre le cas du Carnival Triumph (2013) ?",opts:["Que toutes les avaries se résolvent en minutes","Que certaines avaries majeures exigent une gestion prolongée sur plusieurs jours","Que l'équipage n'a aucun rôle","Que le remorquage est toujours immédiat"],correct:1,expl:"Le Carnival Triumph est resté sans propulsion environ 5 jours, illustrant la gestion de crise prolongée."},
    {q:"Comment les priorités évoluent-elles entre l'heure 0 et le jour 5 d'une avarie majeure ?",opts:["Elles restent identiques","Elles passent de la stabilisation immédiate à la gestion prolongée des ressources","Elles deviennent moins importantes","Seule la passerelle a des priorités"],correct:1,expl:"L'enjeu se déplace de la stabilisation immédiate vers la gestion prolongée sur plusieurs jours."},
    {q:"Pourquoi surveiller la charge du générateur de secours après un blackout ?",opts:["Ce n'est pas nécessaire","Pour éviter qu'il ne se surcharge et provoque un second blackout","Pour des raisons esthétiques","La charge ne varie jamais"],correct:1,expl:"Un générateur de secours peut lui-même se surcharger s'il n'est pas surveillé, provoquant un second blackout."},
  ],
  en:[
    {q:"Once the immediate danger has passed after a blackout, what is the very first restoration priority?",opts:["Comfort lighting","Steering, essential to maneuver even at low power","Air conditioning","Entertainment systems"],correct:1,expl:"Without steering, the ship cannot be maneuvered even if propulsion returns."},
    {q:"What is a cascading failure in the engine room?",opts:["A board game","An initial failure that, left uncontained, triggers a second and then a third","A maintenance procedure","A type of engine"],correct:1,expl:"An initial failure can trigger a chain of failures if not monitored and contained in time."},
    {q:"What does the Carnival Triumph case (2013) show?",opts:["That all casualties resolve in minutes","That some major casualties require prolonged management over several days","That the crew has no role","That towing is always immediate"],correct:1,expl:"Carnival Triumph remained without propulsion for about 5 days, illustrating prolonged crisis management."},
    {q:"How do priorities shift between hour 0 and day 5 of a major casualty?",opts:["They remain identical","They shift from immediate stabilization to prolonged resource management","They become less important","Only the bridge has priorities"],correct:1,expl:"The challenge shifts from immediate stabilization to prolonged management over several days."},
    {q:"Why monitor the emergency generator's load after a blackout?",opts:["It's not necessary","To prevent it from overloading and causing a second blackout","For aesthetic reasons","Load never changes"],correct:1,expl:"An emergency generator can itself overload if not monitored, causing a second blackout."},
  ],
  es:[
    {q:"Una vez pasado el peligro inmediato tras un apagón, ¿cuál es la primerísima prioridad de restauración?",opts:["La iluminación de confort","El gobierno, esencial para maniobrar aunque sea a baja potencia","El aire acondicionado","Los sistemas de entretenimiento"],correct:1,expl:"Sin gobierno, el buque no puede maniobrarse aunque vuelva la propulsión."},
    {q:"¿Qué es un fallo en cascada en la sala de máquinas?",opts:["Un juego de mesa","Un fallo inicial que, sin contener, desencadena un segundo y luego un tercero","Un procedimiento de mantenimiento","Un tipo de motor"],correct:1,expl:"Un fallo inicial puede desencadenar una cadena de fallos si no se vigila y contiene a tiempo."},
    {q:"¿Qué muestra el caso del Carnival Triumph (2013)?",opts:["Que todas las averías se resuelven en minutos","Que algunas averías mayores exigen una gestión prolongada durante varios días","Que la tripulación no tiene ningún papel","Que el remolque siempre es inmediato"],correct:1,expl:"El Carnival Triumph permaneció sin propulsión unos 5 días, ilustrando la gestión de crisis prolongada."},
    {q:"¿Cómo evolucionan las prioridades entre la hora 0 y el día 5 de una avería mayor?",opts:["Permanecen idénticas","Pasan de la estabilización inmediata a la gestión prolongada de recursos","Se vuelven menos importantes","Solo el puente tiene prioridades"],correct:1,expl:"El reto pasa de la estabilización inmediata a la gestión prolongada durante varios días."},
    {q:"¿Por qué vigilar la carga del generador de emergencia después de un apagón?",opts:["No es necesario","Para evitar que se sobrecargue y provoque un segundo apagón","Por razones estéticas","La carga nunca cambia"],correct:1,expl:"Un generador de emergencia puede sobrecargarse él mismo si no se vigila, provocando un segundo apagón."},
  ],
  pt:[
    {q:"Uma vez passado o perigo imediato após um blackout, qual é a primeiríssima prioridade de restauração?",opts:["A iluminação de conforto","O governo, essencial para manobrar mesmo com pouca potência","O ar condicionado","Os sistemas de entretenimento"],correct:1,expl:"Sem governo, o navio não pode ser manobrado mesmo que a propulsão regresse."},
    {q:"O que é uma falha em cascata na casa das máquinas?",opts:["Um jogo de tabuleiro","Uma falha inicial que, não contida, desencadeia uma segunda e depois uma terceira","Um procedimento de manutenção","Um tipo de motor"],correct:1,expl:"Uma falha inicial pode desencadear uma cadeia de falhas se não for vigiada e contida a tempo."},
    {q:"O que mostra o caso do Carnival Triumph (2013)?",opts:["Que todas as avarias se resolvem em minutos","Que algumas avarias maiores exigem uma gestão prolongada ao longo de vários dias","Que a tripulação não tem qualquer papel","Que o reboque é sempre imediato"],correct:1,expl:"O Carnival Triumph ficou sem propulsão cerca de 5 dias, ilustrando a gestão de crise prolongada."},
    {q:"Como evoluem as prioridades entre a hora 0 e o dia 5 de uma avaria maior?",opts:["Permanecem idênticas","Passam da estabilização imediata para a gestão prolongada de recursos","Tornam-se menos importantes","Só a ponte tem prioridades"],correct:1,expl:"O desafio passa da estabilização imediata para a gestão prolongada ao longo de vários dias."},
    {q:"Por que vigiar a carga do gerador de emergência após um blackout?",opts:["Não é necessário","Para evitar que se sobrecarregue e provoque um segundo blackout","Por razões estéticas","A carga nunca muda"],correct:1,expl:"Um gerador de emergência pode sobrecarregar-se a si próprio se não for vigiado, provocando um segundo blackout."},
  ],
};

// ══════════════════════════════════════
// SAFETY REFLECTION (permanent Safety Dept feature)
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Repense à une situation où l'urgence immédiate est passée mais où le travail était loin d'être terminé. Comment les priorités ont-elles changé dans les heures ou jours suivants ?",
    en:"Think of a situation where the immediate emergency had passed but the work was far from over. How did priorities change in the following hours or days?",
    es:"Piensa en una situación donde la emergencia inmediata había pasado pero el trabajo estaba lejos de terminar. ¿Cómo cambiaron las prioridades en las horas o días siguientes?",
    pt:"Pensa numa situação em que a emergência imediata tinha passado mas o trabalho estava longe de terminar. Como mudaram as prioridades nas horas ou dias seguintes?",
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
      badge:"⚙️ Safety · Engine Room Resource Management · Leçon 4/6 · ⭐ Premium",
      title:"Les Minutes Critiques Après une Avarie Majeure",
      intro:"L3 a couvert l'action d'urgence immédiate. Cette leçon aborde ce qui vient juste après : le danger immédiat est écarté, mais rien n'est encore réellement stabilisé.\n\nC'est le quatrième pilier de l'ERM : confirmer méthodiquement que les priorités essentielles sont couvertes, et reconnaître qu'une avarie majeure peut exiger une gestion sur plusieurs heures, voire plusieurs jours.",
      p0:"LE DANGER IMMÉDIAT ÉCARTÉ N'EST PAS LA FIN DE L'HISTOIRE",s0t:"Stabiliser, ce n'est pas 'ça a l'air d'aller'",
      s0:"Une fois l'action d'urgence effectuée, l'équipe peut être tentée de considérer le problème résolu. Or plusieurs vérifications essentielles restent nécessaires avant de conclure réellement à la stabilisation.\n\nCOMMENT PRÉVENIR UNE RECHUTE ? En vérifiant méthodiquement les priorités essentielles avant de relâcher la vigilance.\nQUE FAIRE SI L'AVARIE SE PROLONGE AU-DELÀ DES PREMIÈRES MINUTES ? Reconnaître que les priorités changent avec le temps.\nQUELLE LEÇON RETENIR ? Une situation qui semble calme peut encore basculer si les vérifications essentielles n'ont pas été faites.",
      p1:"L'ORDRE DE PRIORITÉ DE RESTAURATION",s1t:"Gouverne, propulsion, incendie, puis le reste",
      s1:"Après une avarie majeure, un ordre logique structure la restauration des services essentiels : d'abord la maîtrise du navire (gouverne, propulsion), puis la sécurité (lutte incendie), puis les autres services.",
      p2:"L'EFFET DOMINO",s2t:"Une panne non contenue en déclenche une seconde",
      s2:"Un générateur de secours qui n'est pas surveillé peut lui-même se surcharger et déclencher un second blackout. Surveiller la répartition de charge après une première panne est aussi critique que traiter la panne initiale elle-même.",
      p3:"QUAND L'AVARIE SE PROLONGE SUR PLUSIEURS JOURS",s3t:"Les priorités changent avec le temps",
      s3:"Toutes les avaries majeures ne se résolvent pas en quelques minutes. Certaines exigent une gestion de crise prolongée, où l'enjeu se déplace de la stabilisation immédiate vers la gestion des ressources et de la fatigue de l'équipage sur la durée.",
      p4:"🎯 EXERCICE OPÉRATIONNEL",p5:"⚠️ CAS RÉEL",p6:"📝 BANQUE DE 15 QUESTIONS",p7:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 4",
      sumP:["Le danger immédiat écarté n'est pas la fin de l'histoire — la stabilisation exige des vérifications méthodiques","L'ordre de priorité privilégie la maîtrise du navire, puis la sécurité, puis les autres services","Un générateur de secours non surveillé peut lui-même provoquer un second blackout","Certaines avaries majeures exigent une gestion prolongée sur plusieurs jours","Les priorités évoluent avec le temps : de la stabilisation immédiate à la gestion des ressources"],
      learnedP:["L'ordre de priorité de restauration","L'effet domino (cascading failure)","La gestion d'une avarie prolongée sur plusieurs jours","Le cas du Carnival Triumph (2013)","Pourquoi la stabilisation exige plus qu'un simple retour du courant"],
      safetyMsg:"Le silence après une avarie n'est pas toujours la preuve d'une situation stabilisée. Vérifie méthodiquement avant de relâcher la vigilance.",
    },
    en:{
      badge:"⚙️ Safety · Engine Room Resource Management · Lesson 4/6 · ⭐ Premium",
      title:"The Critical First Minutes After a Major Breakdown",
      intro:"L3 covered the immediate emergency action. This lesson addresses what comes right after: the immediate danger has passed, but nothing is truly stabilized yet.\n\nThis is the fourth pillar of ERM: methodically confirming that essential priorities are covered, and recognizing that a major casualty may require management over several hours, or even several days.",
      p0:"THE IMMEDIATE DANGER PASSING IS NOT THE END OF THE STORY",s0t:"Stabilizing is not 'it looks fine'",
      s0:"Once the emergency action has been carried out, the team may be tempted to consider the problem solved. Yet several essential checks remain necessary before truly concluding stabilization.\n\nHOW TO PREVENT A RELAPSE? By methodically checking essential priorities before easing vigilance.\nWHAT TO DO IF THE CASUALTY EXTENDS BEYOND THE FIRST MINUTES? Recognize that priorities change over time.\nWHAT LESSON TO RETAIN? A situation that looks calm can still turn if essential checks have not been done.",
      p1:"THE RESTORATION PRIORITY ORDER",s1t:"Steering, propulsion, fire, then the rest",
      s1:"After a major casualty, a logical order structures the restoration of essential services: first regaining control of the ship (steering, propulsion), then safety (firefighting), then other services.",
      p2:"THE DOMINO EFFECT",s2t:"An uncontained failure triggers a second",
      s2:"An unmonitored emergency generator can itself overload and trigger a second blackout. Monitoring load distribution after a first failure is as critical as handling the initial failure itself.",
      p3:"WHEN THE CASUALTY EXTENDS OVER SEVERAL DAYS",s3t:"Priorities change over time",
      s3:"Not all major casualties resolve within minutes. Some require prolonged crisis management, where the challenge shifts from immediate stabilization to managing resources and crew fatigue over time.",
      p4:"🎯 OPERATIONAL EXERCISE",p5:"⚠️ REAL CASUALTY CASE",p6:"📝 15-QUESTION BANK",p7:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 4",
      sumP:["The immediate danger passing is not the end of the story — stabilization requires methodical checks","The priority order favors regaining control of the ship, then safety, then other services","An unmonitored emergency generator can itself cause a second blackout","Some major casualties require prolonged management over several days","Priorities shift over time: from immediate stabilization to resource management"],
      learnedP:["The restoration priority order","The domino effect (cascading failure)","Managing a casualty prolonged over several days","The Carnival Triumph case (2013)","Why stabilization requires more than power simply returning"],
      safetyMsg:"Silence after a casualty is not always proof of a stabilized situation. Check methodically before easing vigilance.",
    },
    es:{
      badge:"⚙️ Seguridad · Engine Room Resource Management · Lección 4/6 · ⭐ Premium",
      title:"Los Minutos Críticos Después de una Avería Mayor",
      intro:"L3 cubrió la acción de emergencia inmediata. Esta lección aborda lo que viene justo después: el peligro inmediato ha pasado, pero nada está realmente estabilizado todavía.\n\nEste es el cuarto pilar del ERM: confirmar metódicamente que las prioridades esenciales están cubiertas, y reconocer que una avería mayor puede exigir gestión durante varias horas, o incluso varios días.",
      p0:"QUE EL PELIGRO INMEDIATO HAYA PASADO NO ES EL FIN DE LA HISTORIA",s0t:"Estabilizar no es 'parece que va bien'",
      s0:"Una vez realizada la acción de emergencia, el equipo puede sentirse tentado a considerar resuelto el problema. Sin embargo, varias verificaciones esenciales siguen siendo necesarias antes de concluir realmente la estabilización.\n\n¿CÓMO PREVENIR UNA RECAÍDA? Verificando metódicamente las prioridades esenciales antes de relajar la vigilancia.\n¿QUÉ HACER SI LA AVERÍA SE PROLONGA MÁS ALLÁ DE LOS PRIMEROS MINUTOS? Reconocer que las prioridades cambian con el tiempo.\n¿QUÉ LECCIÓN RETENER? Una situación que parece tranquila aún puede empeorar si no se han hecho las verificaciones esenciales.",
      p1:"EL ORDEN DE PRIORIDAD DE RESTAURACIÓN",s1t:"Gobierno, propulsión, incendio, y luego el resto",
      s1:"Tras una avería mayor, un orden lógico estructura la restauración de los servicios esenciales: primero el control del buque (gobierno, propulsión), luego la seguridad (lucha contra incendios), luego otros servicios.",
      p2:"EL EFECTO DOMINÓ",s2t:"Un fallo no contenido desencadena un segundo",
      s2:"Un generador de emergencia no vigilado puede sobrecargarse él mismo y desencadenar un segundo apagón. Vigilar la distribución de carga tras un primer fallo es tan crítico como gestionar el fallo inicial.",
      p3:"CUANDO LA AVERÍA SE PROLONGA VARIOS DÍAS",s3t:"Las prioridades cambian con el tiempo",
      s3:"No todas las averías mayores se resuelven en minutos. Algunas exigen una gestión de crisis prolongada, donde el reto pasa de la estabilización inmediata a la gestión de recursos y de la fatiga de la tripulación con el tiempo.",
      p4:"🎯 EJERCICIO OPERATIVO",p5:"⚠️ CASO REAL",p6:"📝 BANCO DE 15 PREGUNTAS",p7:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 4",
      sumP:["Que el peligro inmediato haya pasado no es el fin de la historia — la estabilización exige verificaciones metódicas","El orden de prioridad favorece el control del buque, luego la seguridad, luego otros servicios","Un generador de emergencia no vigilado puede provocar él mismo un segundo apagón","Algunas averías mayores exigen una gestión prolongada durante varios días","Las prioridades evolucionan con el tiempo: de la estabilización inmediata a la gestión de recursos"],
      learnedP:["El orden de prioridad de restauración","El efecto dominó (cascading failure)","La gestión de una avería prolongada durante varios días","El caso del Carnival Triumph (2013)","Por qué la estabilización exige más que el simple regreso de la corriente"],
      safetyMsg:"El silencio tras una avería no siempre es prueba de una situación estabilizada. Verifica metódicamente antes de relajar la vigilancia.",
    },
    pt:{
      badge:"⚙️ Segurança · Engine Room Resource Management · Lição 4/6 · ⭐ Premium",
      title:"Os Minutos Críticos Após uma Avaria Maior",
      intro:"A L3 cobriu a ação de emergência imediata. Esta lição aborda o que vem logo a seguir: o perigo imediato passou, mas nada está ainda realmente estabilizado.\n\nEste é o quarto pilar do ERM: confirmar metodicamente que as prioridades essenciais estão cobertas, e reconhecer que uma avaria maior pode exigir gestão ao longo de várias horas, ou mesmo vários dias.",
      p0:"O PERIGO IMEDIATO TER PASSADO NÃO É O FIM DA HISTÓRIA",s0t:"Estabilizar não é 'parece estar bem'",
      s0:"Uma vez realizada a ação de emergência, a equipa pode ser tentada a considerar o problema resolvido. No entanto, várias verificações essenciais continuam necessárias antes de concluir realmente a estabilização.\n\nCOMO PREVENIR UMA RECAÍDA? Verificando metodicamente as prioridades essenciais antes de relaxar a vigilância.\nO QUE FAZER SE A AVARIA SE PROLONGAR PARA ALÉM DOS PRIMEIROS MINUTOS? Reconhecer que as prioridades mudam com o tempo.\nQUE LIÇÃO RETER? Uma situação que parece calma ainda pode piorar se as verificações essenciais não tiverem sido feitas.",
      p1:"A ORDEM DE PRIORIDADE DE RESTAURAÇÃO",s1t:"Governo, propulsão, incêndio, depois o resto",
      s1:"Após uma avaria maior, uma ordem lógica estrutura a restauração dos serviços essenciais: primeiro o controlo do navio (governo, propulsão), depois a segurança (combate a incêndios), depois outros serviços.",
      p2:"O EFEITO DOMINÓ",s2t:"Uma falha não contida desencadeia uma segunda",
      s2:"Um gerador de emergência não vigiado pode sobrecarregar-se a si próprio e desencadear um segundo blackout. Vigiar a distribuição de carga após uma primeira falha é tão crítico como tratar a falha inicial.",
      p3:"QUANDO A AVARIA SE PROLONGA POR VÁRIOS DIAS",s3t:"As prioridades mudam com o tempo",
      s3:"Nem todas as avarias maiores se resolvem em minutos. Algumas exigem uma gestão de crise prolongada, onde o desafio passa da estabilização imediata para a gestão de recursos e da fadiga da tripulação ao longo do tempo.",
      p4:"🎯 EXERCÍCIO OPERACIONAL",p5:"⚠️ CASO REAL",p6:"📝 BANCO DE 15 PERGUNTAS",p7:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 4",
      sumP:["O perigo imediato ter passado não é o fim da história — a estabilização exige verificações metódicas","A ordem de prioridade privilegia o controlo do navio, depois a segurança, depois outros serviços","Um gerador de emergência não vigiado pode provocar ele próprio um segundo blackout","Algumas avarias maiores exigem uma gestão prolongada ao longo de vários dias","As prioridades evoluem com o tempo: da estabilização imediata para a gestão de recursos"],
      learnedP:["A ordem de prioridade de restauração","O efeito dominó (cascading failure)","A gestão de uma avaria prolongada ao longo de vários dias","O caso do Carnival Triumph (2013)","Por que a estabilização exige mais do que o simples regresso da corrente"],
      safetyMsg:"O silêncio após uma avaria nem sempre é prova de uma situação estabilizada. Verifica metodicamente antes de relaxar a vigilância.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1E_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/6":lang==="en"?"Lesson 4/6":lang==="es"?"Lección 4/6":"Lição 4/6"}</div>
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

            <SL icon="🔢" text={lc.p1} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔢</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔢 {lang==="fr"?"ORDRE DE PRIORITÉ — INTERACTIF":lang==="en"?"PRIORITY ORDER — INTERACTIVE":lang==="es"?"ORDEN DE PRIORIDAD — INTERACTIVO":"ORDEM DE PRIORIDADE — INTERATIVO"}</div><PriorityRestoreSVG lang={lang}/></Card>

            <SL icon="🎲" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎲</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎲 {lang==="fr"?"EFFET DOMINO — INTERACTIF":lang==="en"?"DOMINO EFFECT — INTERACTIVE":lang==="es"?"EFECTO DOMINÓ — INTERACTIVO":"EFEITO DOMINÓ — INTERATIVO"}</div><CascadingFailureSVG lang={lang}/></Card>

            <SL icon="📅" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📅</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📅 {lang==="fr"?"TIMELINE PROLONGÉE — INTERACTIF":lang==="en"?"PROLONGED TIMELINE — INTERACTIVE":lang==="es"?"LÍNEA DE TIEMPO PROLONGADA — INTERACTIVO":"LINHA TEMPORAL PROLONGADA — INTERATIVO"}</div><SustainedTimelineSVG lang={lang}/></Card>

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
                {lang==="fr"?"Quiz Final — Minutes Critiques":lang==="en"?"Final Quiz — Critical Minutes":lang==="es"?"Quiz Final — Minutos Críticos":"Quiz Final — Minutos Críticos"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 4/6":lang==="en"?"questions · Lesson 4/6":lang==="es"?"preguntas · Lección 4/6":"perguntas · Lição 4/6"}</div>
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
              {lang==="fr"?"LEÇON 5 — DÉCISION SOUS PRESSION →":lang==="en"?"LESSON 5 — DECISION UNDER PRESSURE →":lang==="es"?"LECCIÓN 5 — DECISIÓN BAJO PRESIÓN →":"LIÇÃO 5 — DECISÃO SOB PRESSÃO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
