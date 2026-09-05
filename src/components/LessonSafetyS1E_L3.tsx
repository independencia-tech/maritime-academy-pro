import { useState, useEffect } from "react";
import { shuffleQuestionOptions, C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — EMERGENCY CHECKLIST (BLACKOUT / CRITICAL FAILURE)
// ══════════════════════════════════════
function EmergencyChecklistSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"🛑", label:{fr:"Isoler le défaut",en:"Isolate the fault",es:"Aislar el fallo",pt:"Isolar a falha"},
      desc:{fr:"Identifier rapidement quel équipement a déclenché la panne et l'isoler pour éviter qu'il n'endommage le reste du système.",en:"Quickly identify which equipment triggered the fault and isolate it to prevent it from damaging the rest of the system.",es:"Identificar rápidamente qué equipo provocó el fallo y aislarlo para evitar que dañe el resto del sistema.",pt:"Identificar rapidamente que equipamento provocou a falha e isolá-lo para evitar que danifique o resto do sistema."} },
    { id:2, icon:"🔄", label:{fr:"Séquence de redémarrage",en:"Restart sequence",es:"Secuencia de reinicio",pt:"Sequência de reinício"},
      desc:{fr:"Appliquer la séquence de redémarrage dans l'ordre prévu — brûler les étapes pour aller plus vite crée souvent une seconde panne.",en:"Apply the restart sequence in the intended order — skipping steps to go faster often causes a second failure.",es:"Aplicar la secuencia de reinicio en el orden previsto — saltarse pasos para ir más rápido suele causar un segundo fallo.",pt:"Aplicar a sequência de reinício na ordem prevista — saltar passos para ir mais depressa muitas vezes causa uma segunda falha."} },
    { id:3, icon:"⚡", label:{fr:"Bascule sur secours",en:"Switch to emergency backup",es:"Cambio a respaldo de emergencia",pt:"Mudança para reserva de emergência"},
      desc:{fr:"Si le redémarrage échoue, basculer sans délai sur le générateur de secours ou la source d'énergie alternative disponible.",en:"If the restart fails, switch without delay to the emergency generator or the available alternative power source.",es:"Si el reinicio falla, cambiar sin demora al generador de emergencia o a la fuente de energía alternativa disponible.",pt:"Se o reinício falhar, mudar sem demora para o gerador de emergência ou para a fonte de energia alternativa disponível."} },
    { id:4, icon:"📢", label:{fr:"Informer la passerelle",en:"Inform the bridge",es:"Informar al puente",pt:"Informar a ponte"},
      desc:{fr:"Envoyer immédiatement un rapport d'urgence structuré à la passerelle — ne pas attendre d'avoir résolu le problème pour prévenir.",en:"Immediately send a structured emergency report to the bridge — do not wait until the problem is solved to notify.",es:"Enviar de inmediato un informe de emergencia estructurado al puente — no esperar a resolver el problema para avisar.",pt:"Enviar imediatamente um relatório de emergência estruturado à ponte — não esperar resolver o problema para avisar."} },
  ];
  const sel_ = sel!==null?steps.find(s=>s.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{padding:"12px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===s.id?`${C.red}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?C.red:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:22,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:9,color:sel===s.id?C.red:C.muted,fontWeight:700,lineHeight:1.3}}>{s.id}. {s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?(
        <div style={{padding:"10px 12px",borderRadius:12,background:`${C.red}15`,border:`1px solid ${C.red}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      ):(
        <div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche une étape pour voir le détail":lang==="en"?"Tap a step to see the detail":lang==="es"?"Toca un paso para ver el detalle":"Toque num passo para ver o detalhe"}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — HOW MUCH TIME DO YOU ACTUALLY HAVE
// ══════════════════════════════════════
function UrgencyContextSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const contexts = [
    { id:"open", icon:"🌊", color:C.green, label:{fr:"Haute mer, temps calme",en:"Open sea, calm weather",es:"Alta mar, tiempo calmo",pt:"Alto mar, tempo calmo"},
      note:{fr:"Marge de manœuvre la plus large : le temps disponible pour diagnostiquer avant de basculer sur le secours est le plus long.",en:"Widest margin: the time available to diagnose before switching to backup is the longest.",es:"El margen más amplio: el tiempo disponible para diagnosticar antes de cambiar al respaldo es el más largo.",pt:"Margem mais ampla: o tempo disponível para diagnosticar antes de mudar para a reserva é o mais longo."} },
    { id:"coastal", icon:"🏝️", color:C.orange, label:{fr:"Zone côtière ou chenal étroit",en:"Coastal area or narrow channel",es:"Zona costera o canal estrecho",pt:"Zona costeira ou canal estreito"},
      note:{fr:"Marge réduite : la proximité de dangers de navigation impose une bascule sur secours plus rapide, sans attendre un diagnostic complet.",en:"Reduced margin: proximity to navigational hazards requires a faster switch to backup, without waiting for a full diagnosis.",es:"Margen reducido: la proximidad de peligros de navegación exige un cambio más rápido al respaldo, sin esperar un diagnóstico completo.",pt:"Margem reduzida: a proximidade de perigos de navegação exige uma mudança mais rápida para a reserva, sem esperar um diagnóstico completo."} },
    { id:"storm", icon:"⛈️", color:C.red, label:{fr:"Gros temps ou proximité immédiate d'un danger",en:"Heavy weather or immediate proximity to a hazard",es:"Mal tiempo o proximidad inmediata a un peligro",pt:"Mau tempo ou proximidade imediata de um perigo"},
      note:{fr:"Marge quasi nulle : chaque minute sans propulsion ou gouverne rapproche le navire du danger. La bascule sur secours devient la priorité absolue, avant tout diagnostic approfondi.",en:"Near-zero margin: every minute without propulsion or steering brings the ship closer to danger. Switching to backup becomes the absolute priority, before any thorough diagnosis.",es:"Margen casi nulo: cada minuto sin propulsión o gobierno acerca el buque al peligro. Cambiar al respaldo se convierte en la prioridad absoluta, antes de cualquier diagnóstico profundo.",pt:"Margem quase nula: cada minuto sem propulsão ou governo aproxima o navio do perigo. Mudar para a reserva torna-se a prioridade absoluta, antes de qualquer diagnóstico aprofundado."} },
  ];
  const sel_ = sel?contexts.find(c=>c.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {contexts.map(c=>(
          <div key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)}
            style={{padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===c.id?`${c.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===c.id?c.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:3}}>{c.icon}</div>
            <div style={{fontSize:8,color:sel===c.id?c.color:C.muted,fontWeight:700,lineHeight:1.3}}>{c.label[lang]||c.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.note[lang]||sel_.note.fr}</div>}
      {!sel_&&<div style={{textAlign:"center",fontSize:10,color:C.muted}}>{lang==="fr"?"Touche un contexte pour voir l'impact sur le temps disponible":lang==="en"?"Tap a context to see the impact on available time":lang==="es"?"Toca un contexto para ver el impacto en el tiempo disponible":"Toque num contexto para ver o impacto no tempo disponível"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — STRUCTURED EMERGENCY REPORT
// ══════════════════════════════════════
function EmergencyReportSVG({ lang }) {
  const [open, setOpen] = useState(null);
  const pairs = [
    { id:"p1", bad:{fr:"\"Passerelle, il y a un problème en bas, on gère.\"",en:"\"Bridge, there's a problem down here, we're handling it.\"",es:"\"Puente, hay un problema abajo, lo estamos gestionando.\"",pt:"\"Ponte, há um problema aqui em baixo, estamos a tratar disso.\""},
      good:{fr:"\"Passerelle, blackout total à 04h12. Cause probable : défaillance générateur n°1. Bascule sur secours en cours. Propulsion attendue sous 5 minutes.\"",en:"\"Bridge, total blackout at 04:12. Probable cause: generator #1 failure. Switching to backup in progress. Propulsion expected within 5 minutes.\"",es:"\"Puente, apagón total a las 04:12. Causa probable: fallo del generador n.º 1. Cambio a respaldo en curso. Propulsión esperada en 5 minutos.\"",pt:"\"Ponte, blackout total às 04h12. Causa provável: falha do gerador n.º 1. Mudança para reserva em curso. Propulsão esperada em 5 minutos.\""} },
    { id:"p2", bad:{fr:"\"On y arrivera, pas besoin de vous inquiéter.\"",en:"\"We'll manage, no need to worry.\"",es:"\"Nos las arreglaremos, no hace falta preocuparse.\"",pt:"\"Vamos conseguir, não é preciso preocupar-se.\""},
      good:{fr:"\"Mise à jour à 04h17 : redémarrage échoué une première fois, nouvelle tentative en cours. Si échec à 04h20, passage au plan B (générateur de secours seul).\"",en:"\"Update at 04:17: restart failed once, new attempt in progress. If it fails at 04:20, moving to plan B (emergency generator alone).\"",es:"\"Actualización a las 04:17: el reinicio falló una vez, nuevo intento en curso. Si falla a las 04:20, se pasa al plan B (solo generador de emergencia).\"",pt:"\"Atualização às 04h17: reinício falhou uma vez, nova tentativa em curso. Se falhar às 04h20, passa-se ao plano B (apenas gerador de emergência).\""} },
  ];
  return (
    <div>
      {pairs.map((p,i)=>(
        <div key={p.id} style={{marginBottom:10}}>
          <div onClick={()=>setOpen(open===p.id?null:p.id)} style={{padding:"10px 12px",borderRadius:12,cursor:"pointer",background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}33`,marginBottom:open===p.id?6:0}}>
            <div style={{fontSize:9,color:C.red,fontWeight:700,marginBottom:3}}>{lang==="fr"?"❌ VAGUE / RASSURANT SANS INFORMATION":lang==="en"?"❌ VAGUE / REASSURING WITHOUT INFORMATION":lang==="es"?"❌ VAGO / TRANQUILIZADOR SIN INFORMACIÓN":"❌ VAGO / TRANQUILIZADOR SEM INFORMAÇÃO"}</div>
            <div style={{fontSize:12,color:C.white,lineHeight:1.5}}>{p.bad[lang]||p.bad.fr}</div>
          </div>
          {open===p.id&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1.5px solid ${C.green}44`,animation:"fadeUp 0.3s ease"}}>
            <div style={{fontSize:9,color:C.green,fontWeight:700,marginBottom:3}}>{lang==="fr"?"✅ STRUCTURÉ / EXPLOITABLE":lang==="en"?"✅ STRUCTURED / ACTIONABLE":lang==="es"?"✅ ESTRUCTURADO / ACCIONABLE":"✅ ESTRUTURADO / ACIONÁVEL"}</div>
            <div style={{fontSize:12,color:C.white,lineHeight:1.5}}>{p.good[lang]||p.good.fr}</div>
          </div>}
        </div>
      ))}
      {!open&&<div style={{textAlign:"center",fontSize:10,color:C.muted,marginTop:4}}>{lang==="fr"?"Touche un message pour voir la version structurée":lang==="en"?"Tap a message to see the structured version":lang==="es"?"Toca un mensaje para ver la versión estructurada":"Toque numa mensagem para ver a versão estruturada"}</div>}
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
      {id:"q1",q:"Blackout total en zone côtière resserrée. Que fais-tu EN PREMIER ?\na) Chercher la cause exacte avant toute autre action\nb) Isoler le défaut visible et lancer la séquence de redémarrage sans délai\nc) Attendre les instructions de la passerelle avant d'agir"},
      {id:"q2",q:"Le premier redémarrage échoue. Que fais-tu ?\na) Basculer sur le générateur de secours sans attendre un second essai prolongé, vu le contexte côtier\nb) Réessayer indéfiniment la même procédure\nc) Couper toutes les alarmes pour te concentrer"},
      {id:"q3",q:"Quand dois-tu informer la passerelle de la situation ?\na) Seulement une fois le problème résolu\nb) Seulement si on te le demande\nc) Immédiatement, avec un rapport structuré, sans attendre la résolution"},
      {id:"q4",q:"Pourquoi le contexte (haute mer vs chenal étroit) change-t-il la priorité d'action ?\na) Parce que le temps disponible avant qu'un danger réel n'apparaisse n'est pas le même\nb) Parce que les procédures techniques changent selon la zone\nc) Cela ne change rien, la procédure est toujours identique"},
    ],
    en:[
      {id:"q1",q:"Total blackout in a narrow coastal area. What do you do FIRST?\na) Look for the exact cause before any other action\nb) Isolate the visible fault and start the restart sequence without delay\nc) Wait for bridge instructions before acting"},
      {id:"q2",q:"The first restart fails. What do you do?\na) Switch to the emergency generator without waiting for a prolonged second attempt, given the coastal context\nb) Keep retrying the same procedure indefinitely\nc) Silence all alarms to focus"},
      {id:"q3",q:"When should you inform the bridge of the situation?\na) Only once the problem is solved\nb) Only if asked\nc) Immediately, with a structured report, without waiting for resolution"},
      {id:"q4",q:"Why does the context (open sea vs narrow channel) change the priority of action?\na) Because the time available before a real danger appears is not the same\nb) Because technical procedures change depending on the area\nc) It changes nothing, the procedure is always identical"},
    ],
    es:[
      {id:"q1",q:"Apagón total en una zona costera estrecha. ¿Qué haces PRIMERO?\na) Buscar la causa exacta antes de cualquier otra acción\nb) Aislar el fallo visible y lanzar la secuencia de reinicio sin demora\nc) Esperar las instrucciones del puente antes de actuar"},
      {id:"q2",q:"El primer reinicio falla. ¿Qué haces?\na) Cambiar al generador de emergencia sin esperar un segundo intento prolongado, dado el contexto costero\nb) Volver a intentar la misma operación indefinidamente\nc) Silenciar todas las alarmas para concentrarte"},
      {id:"q3",q:"¿Cuándo debes informar al puente de la situación?\na) Solo una vez resuelto el problema\nb) Solo si te lo piden\nc) De inmediato, con un informe estructurado, sin esperar a la resolución"},
      {id:"q4",q:"¿Por qué el contexto (alta mar vs canal estrecho) cambia la prioridad de acción?\na) Porque el tiempo disponible antes de que aparezca un peligro real no es el mismo\nb) Porque los procedimientos técnicos cambian según la zona\nc) No cambia nada, el procedimiento es siempre idéntico"},
    ],
    pt:[
      {id:"q1",q:"Blackout total numa zona costeira estreita. O que fazes PRIMEIRO?\na) Procurar a causa exata antes de qualquer outra ação\nb) Isolar a falha visível e iniciar a sequência de reinício sem demora\nc) Esperar pelas instruções da ponte antes de agir"},
      {id:"q2",q:"O primeiro reinício falha. O que fazes?\na) Mudar para o gerador de emergência sem esperar por uma segunda tentativa prolongada, dado o contexto costeiro\nb) Voltar a tentar o mesmo procedimento indefinidamente\nc) Silenciar todos os alarmes para te concentrares"},
      {id:"q3",q:"Quando deves informar a ponte da situação?\na) Só depois de o problema estar resolvido\nb) Só se te pedirem\nc) Imediatamente, com um relatório estruturado, sem esperar pela resolução"},
      {id:"q4",q:"Por que é que o contexto (alto mar vs canal estreito) muda a prioridade de ação?\na) Porque o tempo disponível antes de aparecer um perigo real não é o mesmo\nb) Porque os procedimentos técnicos mudam consoante a zona\nc) Não muda nada, o procedimento é sempre idêntico"},
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
        {lang==="fr"?"✅ Q1: b — isoler et lancer la séquence sans délai, ne pas chercher un diagnostic complet d'abord\n✅ Q2: a — le contexte côtier impose une bascule rapide sur secours\n✅ Q3: c — informer immédiatement, même sans solution encore trouvée\n✅ Q4: a — le temps disponible avant qu'un danger réel n'apparaisse change tout":
         lang==="en"?"✅ Q1: b — isolate and start the sequence without delay, don't seek a full diagnosis first\n✅ Q2: a — the coastal context requires a fast switch to backup\n✅ Q3: c — inform immediately, even without a solution yet\n✅ Q4: a — the time available before a real danger appears changes everything":
         "✅ Q1: b · Q2: a · Q3: c · Q4: a"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — FINLANDIA SEAWAYS
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Finlandia Seaways — Mer du Nord (avril 2018)",teaser:"Rupture de bielle · Incendie en salle des machines · Rapport MAIB 2/2021",
      what:"À bord de ce navire roulier, une bielle du moteur principal se rompt en service. Des fragments traversent la paroi du carter et sont projetés dans la salle des machines, où ils provoquent un incendie. L'équipe machine doit exécuter dans l'urgence les actions d'arrêt, d'isolement du combustible et de lutte contre l'incendie, dans un espace soudainement rempli de fumée et de débris.",
      cause:"• Rupture catastrophique d'une bielle de moteur principal en service normal\n• Projection de fragments à travers le carter, provoquant un incendie en salle des machines\n• Cause racine identifiée par l'enquête : qualité de la maintenance assurée par le sous-traitant de l'armateur, pas un défaut isolé et imprévisible\n• Nécessité d'une réaction immédiate et correctement séquencée dans un environnement soudainement dangereux",
      lessons:"✓ Une checklist d'urgence claire évite l'improvisation dans un environnement enfumé et bruyant\n✓ L'isolement rapide de l'alimentation combustible limite l'aggravation d'un incendie machine\n✓ Une avarie catastrophique a souvent une cause de fond (ici la gestion de la maintenance), pas seulement un événement isolé\n✓ La coordination d'équipe pendant l'urgence elle-même compte autant que la préparation en amont",
      link:"🔗 Le rapport officiel UK MAIB 2/2021 documente en détail la séquence de l'incident et les recommandations de sécurité qui en découlent."},
    en:{title:"Finlandia Seaways — North Sea (April 2018)",teaser:"Connecting rod failure · Engine room fire · MAIB Report 2/2021",
      what:"Aboard this ro-ro vessel, a main engine connecting rod broke in service. Fragments went through the crankcase wall and were thrown into the engine room, causing a fire. The engine team had to urgently carry out shutdown, fuel isolation, and firefighting actions, in a space suddenly filled with smoke and debris.",
      cause:"• Catastrophic failure of a main engine connecting rod during normal service\n• Fragments thrown through the crankcase, causing an engine room fire\n• Root cause identified by the investigation: the quality of maintenance carried out by the operator's contractor, not an isolated, unpredictable defect\n• Need for an immediate and correctly sequenced reaction in a suddenly hazardous environment",
      lessons:"✓ A clear emergency checklist avoids improvisation in a smoke-filled, noisy environment\n✓ Quickly isolating the fuel supply limits an engine room fire from worsening\n✓ A catastrophic failure often has an underlying cause (here, maintenance management), not just an isolated event\n✓ Team coordination during the emergency itself matters as much as upfront preparation",
      link:"🔗 The official UK MAIB Report 2/2021 documents in detail the sequence of the incident and the resulting safety recommendations."},
    es:{title:"Finlandia Seaways — Mar del Norte (abril de 2018)",teaser:"Rotura de biela · Incendio en sala de máquinas · Informe MAIB 2/2021",
      what:"A bordo de este buque ro-ro, una biela del motor principal se rompió en servicio. Los fragmentos atravesaron la pared del cárter y fueron proyectados en la sala de máquinas, provocando un incendio. El equipo de máquinas tuvo que ejecutar con urgencia las acciones de parada, aislamiento de combustible y lucha contra incendios, en un espacio repentinamente lleno de humo y escombros.",
      cause:"• Rotura catastrófica de una biela del motor principal en servicio normal\n• Proyección de fragmentos a través del cárter, provocando un incendio en la sala de máquinas\n• Causa raíz identificada por la investigación: la calidad del mantenimiento realizado por el contratista del armador, no un defecto aislado e imprevisible\n• Necesidad de una reacción inmediata y correctamente secuenciada en un entorno repentinamente peligroso",
      lessons:"✓ Una checklist de emergencia clara evita la improvisación en un entorno lleno de humo y ruido\n✓ Aislar rápidamente el suministro de combustible limita el agravamiento de un incendio de máquinas\n✓ Una avería catastrófica suele tener una causa de fondo (aquí, la gestión del mantenimiento), no solo un evento aislado\n✓ La coordinación de equipo durante la propia emergencia importa tanto como la preparación previa",
      link:"🔗 El informe oficial UK MAIB 2/2021 documenta en detalle la secuencia del incidente y las recomendaciones de seguridad resultantes."},
    pt:{title:"Finlandia Seaways — Mar do Norte (abril de 2018)",teaser:"Rutura de biela · Incêndio na casa das máquinas · Relatório MAIB 2/2021",
      what:"A bordo deste navio ro-ro, uma biela do motor principal partiu-se em serviço. Fragmentos atravessaram a parede do cárter e foram projetados para a casa das máquinas, provocando um incêndio. A equipa de máquinas teve de executar com urgência as ações de paragem, isolamento de combustível e combate ao incêndio, num espaço subitamente cheio de fumo e destroços.",
      cause:"• Rutura catastrófica de uma biela do motor principal em serviço normal\n• Projeção de fragmentos através do cárter, provocando um incêndio na casa das máquinas\n• Causa raiz identificada pela investigação: a qualidade da manutenção assegurada pelo subcontratado do armador, não um defeito isolado e imprevisível\n• Necessidade de uma reação imediata e corretamente sequenciada num ambiente subitamente perigoso",
      lessons:"✓ Uma checklist de emergência clara evita a improvisação num ambiente cheio de fumo e ruído\n✓ Isolar rapidamente a alimentação de combustível limita o agravamento de um incêndio de máquinas\n✓ Uma avaria catastrófica tem muitas vezes uma causa de fundo (aqui, a gestão da manutenção), não apenas um evento isolado\n✓ A coordenação de equipa durante a própria emergência importa tanto quanto a preparação prévia",
      link:"🔗 O relatório oficial UK MAIB 2/2021 documenta em detalhe a sequência do incidente e as recomendações de segurança resultantes."},
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
    {q:"Quelle est la première priorité face à une avarie machine critique en cours ?",opts:["Trouver la cause exacte avant toute action","Isoler le défaut visible et suivre la séquence d'urgence sans délai","Attendre les instructions de la passerelle","Documenter l'incident pour le rapport"],correct:1,expl:"L'urgence impose d'agir selon la checklist établie — isoler puis suivre la séquence — plutôt que d'attendre un diagnostic complet."},
    {q:"Pourquoi ne faut-il pas 'brûler les étapes' de la séquence de redémarrage pour aller plus vite ?",opts:["Cela n'a aucune conséquence","Sauter une étape crée souvent une seconde panne, aggravant la situation","La séquence est purement indicative","Cela accélère toujours la résolution sans risque"],correct:1,expl:"La séquence de redémarrage suit un ordre précis pour une raison technique — la brûler pour gagner du temps cause souvent une seconde défaillance."},
    {q:"Quand faut-il informer la passerelle d'une avarie machine critique ?",opts:["Seulement une fois le problème résolu","Immédiatement, avec un rapport structuré, sans attendre la résolution","Seulement si la passerelle le demande explicitement","Jamais, cela relève uniquement de la salle des machines"],correct:1,expl:"Un rapport d'urgence immédiat et structuré permet à la passerelle d'anticiper — attendre la résolution prive l'équipe de navigation d'informations vitales."},
    {q:"Que doit contenir un rapport d'urgence structuré à la passerelle ?",opts:["Une phrase rassurante sans détail","Ce qui s'est passé, la cause probable, l'action en cours, le délai estimé","Uniquement l'heure de l'incident","Une liste de excuses"],correct:1,expl:"Un rapport exploitable donne à la passerelle de quoi anticiper : faits, cause probable, action en cours, délai estimé."},
    {q:"Pourquoi le contexte du navire (haute mer vs chenal étroit) change-t-il la priorité d'action lors d'une avarie ?",opts:["Il ne change rien, la procédure est identique","Le temps disponible avant qu'un danger réel n'apparaisse varie fortement selon le contexte","Seule la météo compte, pas la position","Le contexte ne concerne que la passerelle"],correct:1,expl:"En zone resserrée ou par gros temps, la marge de manœuvre avant qu'un danger réel n'apparaisse est bien plus courte qu'en haute mer par temps calme."},
    {q:"Que montre le cas du Finlandia Seaways (2018) ?",opts:["Qu'un incendie machine est toujours imprévisible et sans cause identifiable","Qu'une avarie catastrophique (rupture de bielle) peut provoquer un incendie nécessitant une checklist d'urgence claire","Que la maintenance n'a aucun lien avec les avaries catastrophiques","Que l'équipage n'a aucun rôle à jouer face à un incendie moteur"],correct:1,expl:"L'enquête MAIB relie la rupture catastrophique à la qualité de la maintenance, et souligne l'importance d'une réaction d'urgence bien séquencée."},
    {q:"Quelle est la première action recommandée face à un début d'incendie en salle des machines lié à une avarie moteur ?",opts:["Chercher la source exacte avant d'agir","Isoler l'alimentation combustible pour limiter l'aggravation","Évacuer immédiatement sans autre action","Continuer les opérations normalement"],correct:1,expl:"Isoler rapidement l'alimentation combustible limite l'aggravation d'un incendie machine, une priorité immédiate avant tout diagnostic complet."},
    {q:"Pourquoi une checklist d'urgence claire est-elle particulièrement utile dans un environnement enfumé et bruyant ?",opts:["Elle n'apporte rien dans ce contexte","Elle évite l'improvisation quand la réflexion posée devient difficile sous stress et conditions dégradées","Elle remplace la formation de l'équipe","Elle concerne uniquement les officiers seniors"],correct:1,expl:"Sous stress, fumée et bruit, une checklist claire structure l'action et évite l'improvisation dangereuse."},
    {q:"Quel est l'objectif principal de la leçon L3 de ce module ?",opts:["Réexpliquer la théorie des moteurs diesel","Structurer les actions d'urgence immédiates face à une avarie machine critique","Étudier la responsabilité juridique en cas d'avarie","Apprendre à remplacer une bielle"],correct:1,expl:"L3 se concentre sur l'action immédiate et structurée pendant l'urgence elle-même, après les facteurs humains (L1) et la coordination (L2)."},
    {q:"Une avarie catastrophique a-t-elle généralement une cause unique et imprévisible ?",opts:["Oui, toujours","Non, elle a souvent une cause de fond (maintenance, procédure, décision) identifiable après enquête","Cela dépend uniquement du hasard","Seule la météo peut expliquer une avarie catastrophique"],correct:1,expl:"Le cas Finlandia Seaways montre qu'une rupture catastrophique a souvent une cause de fond identifiable, ici la gestion de la maintenance."},
    {q:"Que risque une équipe qui tente plusieurs fois le même redémarrage sans succès, dans un contexte à risque élevé (chenal étroit) ?",opts:["Rien, persévérer est toujours la bonne stratégie","Perdre un temps précieux qui aurait dû être consacré à basculer sur le secours","Cela accélère toujours la résolution","La passerelle prendra le relais automatiquement"],correct:1,expl:"S'obstiner sur une même tentative dans un contexte à risque élevé consomme un temps que le navire n'a pas forcément — basculer sur secours devient prioritaire."},
    {q:"Quelle information est LA PLUS importante à transmettre en premier dans un rapport d'urgence ?",opts:["Une longue liste de détails techniques secondaires","Ce qui s'est passé et l'action en cours, de façon concise et exploitable","Le nom de la personne responsable de l'avarie","Rien, il vaut mieux ne rien dire tant que ce n'est pas résolu"],correct:1,expl:"Un rapport d'urgence efficace va à l'essentiel : ce qui s'est passé et ce qui est fait, pour permettre une décision rapide côté passerelle."},
    {q:"Pourquoi isoler le défaut avant de tenter un redémarrage ?",opts:["Ce n'est pas nécessaire, on peut redémarrer directement","Redémarrer sans isoler le défaut initial peut aggraver l'avarie ou en créer une seconde","Isoler prend toujours plus de temps que ça n'en vaut la peine","Cela ne concerne que les gros navires"],correct:1,expl:"Redémarrer sans avoir isolé la cause initiale peut réintroduire le même défaut ou en provoquer un nouveau, aggravant la situation."},
    {q:"En quoi la leçon L3 s'appuie-t-elle sur L1 et L2 ?",opts:["Elle n'a aucun lien avec elles","Elle suppose que le facteur humain (L1) et la coordination d'équipe (L2) sont maîtrisés pour se concentrer sur l'action d'urgence elle-même","Elle les contredit","Elle les remplace entièrement"],correct:1,expl:"L3 s'appuie sur les fondations posées par L1 (facteur humain) et L2 (coordination) pour aborder l'exécution concrète de l'urgence."},
    {q:"Quel est le principal danger de vouloir résoudre complètement le problème avant d'en informer la passerelle ?",opts:["Aucun danger particulier","La passerelle perd un temps précieux pour anticiper les conséquences (navigation, sécurité) de l'avarie en cours","Cela accélère la résolution technique","La passerelle n'a pas besoin de cette information de toute façon"],correct:1,expl:"Attendre la résolution complète prive la passerelle du temps nécessaire pour anticiper les conséquences opérationnelles de l'avarie."},
  ],
  en:[
    {q:"What is the first priority when facing a critical machinery failure in progress?",opts:["Find the exact cause before any action","Isolate the visible fault and follow the emergency sequence without delay","Wait for bridge instructions","Document the incident for the report"],correct:1,expl:"The emergency requires acting according to the established checklist — isolate then follow the sequence — rather than waiting for a full diagnosis."},
    {q:"Why should you not 'skip steps' of the restart sequence to go faster?",opts:["It has no consequence","Skipping a step often causes a second failure, worsening the situation","The sequence is purely indicative","It always speeds up resolution without risk"],correct:1,expl:"The restart sequence follows a precise order for a technical reason — skipping it to save time often causes a second failure."},
    {q:"When should the bridge be informed of a critical machinery failure?",opts:["Only once the problem is solved","Immediately, with a structured report, without waiting for resolution","Only if the bridge explicitly asks","Never, it is purely an engine room matter"],correct:1,expl:"An immediate, structured emergency report allows the bridge to anticipate — waiting for resolution deprives the navigation team of vital information."},
    {q:"What should a structured emergency report to the bridge contain?",opts:["A reassuring sentence without detail","What happened, the probable cause, the ongoing action, the estimated timeframe","Only the time of the incident","A list of excuses"],correct:1,expl:"An actionable report gives the bridge what it needs to anticipate: facts, probable cause, ongoing action, estimated timeframe."},
    {q:"Why does the ship's context (open sea vs narrow channel) change the priority of action during a casualty?",opts:["It changes nothing, the procedure is identical","The time available before a real danger appears varies greatly depending on the context","Only the weather matters, not the position","The context only concerns the bridge"],correct:1,expl:"In a restricted area or heavy weather, the margin before a real danger appears is much shorter than in open sea in calm weather."},
    {q:"What does the Finlandia Seaways case (2018) show?",opts:["That an engine fire is always unpredictable with no identifiable cause","That a catastrophic failure (connecting rod rupture) can cause a fire requiring a clear emergency checklist","That maintenance has no link to catastrophic failures","That the crew has no role to play facing an engine fire"],correct:1,expl:"The MAIB investigation links the catastrophic failure to maintenance quality, and highlights the importance of a well-sequenced emergency reaction."},
    {q:"What is the first recommended action facing a starting engine room fire linked to an engine failure?",opts:["Look for the exact source before acting","Isolate the fuel supply to limit escalation","Evacuate immediately without any other action","Continue normal operations"],correct:1,expl:"Quickly isolating the fuel supply limits an engine fire from worsening, an immediate priority before any full diagnosis."},
    {q:"Why is a clear emergency checklist especially useful in a smoke-filled, noisy environment?",opts:["It brings nothing in this context","It avoids improvisation when calm reasoning becomes difficult under stress and degraded conditions","It replaces team training","It only concerns senior officers"],correct:1,expl:"Under stress, smoke, and noise, a clear checklist structures action and avoids dangerous improvisation."},
    {q:"What is the main goal of lesson L3 in this module?",opts:["Re-explain diesel engine theory","Structure the immediate emergency actions facing a critical machinery failure","Study legal liability in case of a casualty","Learn how to replace a connecting rod"],correct:1,expl:"L3 focuses on immediate, structured action during the emergency itself, after the human factors (L1) and coordination (L2)."},
    {q:"Does a catastrophic failure generally have a single, unpredictable cause?",opts:["Yes, always","No, it often has an underlying cause (maintenance, procedure, decision) identifiable after investigation","It depends purely on chance","Only weather can explain a catastrophic failure"],correct:1,expl:"The Finlandia Seaways case shows that a catastrophic failure often has an identifiable underlying cause, here maintenance management."},
    {q:"What does a team risk by repeatedly attempting the same failed restart in a high-risk context (narrow channel)?",opts:["Nothing, persistence is always the right strategy","Losing precious time that should have been spent switching to backup","It always speeds up resolution","The bridge will automatically take over"],correct:1,expl:"Persisting on the same attempt in a high-risk context consumes time the ship may not have — switching to backup becomes the priority."},
    {q:"What information is MOST important to convey first in an emergency report?",opts:["A long list of minor technical details","What happened and the ongoing action, concisely and actionably","The name of the person responsible for the fault","Nothing, better to say nothing until it's solved"],correct:1,expl:"An effective emergency report gets to the point: what happened and what is being done, to enable a fast decision from the bridge."},
    {q:"Why isolate the fault before attempting a restart?",opts:["It's not necessary, you can restart directly","Restarting without isolating the initial fault can worsen the casualty or cause a second one","Isolating always takes more time than it's worth","It only concerns large vessels"],correct:1,expl:"Restarting without having isolated the initial cause can reintroduce the same fault or cause a new one, worsening the situation."},
    {q:"How does lesson L3 build on L1 and L2?",opts:["It has no link to them","It assumes the human factor (L1) and team coordination (L2) are under control, to focus on the emergency action itself","It contradicts them","It fully replaces them"],correct:1,expl:"L3 builds on the foundations laid by L1 (human factor) and L2 (coordination) to address the concrete execution of the emergency."},
    {q:"What is the main danger of wanting to fully solve the problem before informing the bridge?",opts:["No particular danger","The bridge loses precious time to anticipate the consequences (navigation, safety) of the ongoing casualty","It speeds up the technical resolution","The bridge doesn't need this information anyway"],correct:1,expl:"Waiting for full resolution deprives the bridge of the time needed to anticipate the operational consequences of the casualty."},
  ],
  es:[
    {q:"¿Cuál es la primera prioridad ante una avería crítica de maquinaria en curso?",opts:["Encontrar la causa exacta antes de cualquier acción","Aislar el fallo visible y seguir la secuencia de emergencia sin demora","Esperar las instrucciones del puente","Documentar el incidente para el informe"],correct:1,expl:"La emergencia exige actuar según la checklist establecida — aislar y luego seguir la secuencia — en lugar de esperar un diagnóstico completo."},
    {q:"¿Por qué no hay que 'saltarse pasos' de la secuencia de reinicio para ir más rápido?",opts:["No tiene ninguna consecuencia","Saltarse un paso suele causar un segundo fallo, agravando la situación","La secuencia es puramente indicativa","Siempre acelera la resolución sin riesgo"],correct:1,expl:"La secuencia de reinicio sigue un orden preciso por una razón técnica — saltársela para ganar tiempo suele causar un segundo fallo."},
    {q:"¿Cuándo hay que informar al puente de una avería crítica de maquinaria?",opts:["Solo una vez resuelto el problema","De inmediato, con un informe estructurado, sin esperar a la resolución","Solo si el puente lo pide explícitamente","Nunca, es un asunto exclusivo de la sala de máquinas"],correct:1,expl:"Un informe de emergencia inmediato y estructurado permite al puente anticiparse — esperar a la resolución priva al equipo de navegación de información vital."},
    {q:"¿Qué debe contener un informe de emergencia estructurado al puente?",opts:["Una frase tranquilizadora sin detalles","Lo que ocurrió, la causa probable, la acción en curso, el plazo estimado","Solo la hora del incidente","Una lista de excusas"],correct:1,expl:"Un informe accionable da al puente lo necesario para anticipar: hechos, causa probable, acción en curso, plazo estimado."},
    {q:"¿Por qué el contexto del buque (alta mar vs canal estrecho) cambia la prioridad de acción durante una avería?",opts:["No cambia nada, el procedimiento es idéntico","El tiempo disponible antes de que aparezca un peligro real varía mucho según el contexto","Solo importa el tiempo meteorológico, no la posición","El contexto solo concierne al puente"],correct:1,expl:"En una zona restringida o con mal tiempo, el margen antes de que aparezca un peligro real es mucho más corto que en alta mar con tiempo calmo."},
    {q:"¿Qué muestra el caso del Finlandia Seaways (2018)?",opts:["Que un incendio de máquinas siempre es imprevisible y sin causa identificable","Que una avería catastrófica (rotura de biela) puede provocar un incendio que requiere una checklist de emergencia clara","Que el mantenimiento no tiene relación con las averías catastróficas","Que la tripulación no tiene ningún papel ante un incendio de motor"],correct:1,expl:"La investigación MAIB relaciona la avería catastrófica con la calidad del mantenimiento, y destaca la importancia de una reacción de emergencia bien secuenciada."},
    {q:"¿Cuál es la primera acción recomendada ante un inicio de incendio en la sala de máquinas ligado a una avería de motor?",opts:["Buscar la fuente exacta antes de actuar","Aislar el suministro de combustible para limitar el agravamiento","Evacuar de inmediato sin ninguna otra acción","Continuar las operaciones con normalidad"],correct:1,expl:"Aislar rápidamente el suministro de combustible limita el agravamiento de un incendio de máquinas, una prioridad inmediata antes de cualquier diagnóstico completo."},
    {q:"¿Por qué es especialmente útil una checklist de emergencia clara en un entorno lleno de humo y ruido?",opts:["No aporta nada en ese contexto","Evita la improvisación cuando el razonamiento calmado se vuelve difícil bajo estrés y condiciones degradadas","Sustituye la formación del equipo","Solo concierne a los oficiales sénior"],correct:1,expl:"Bajo estrés, humo y ruido, una checklist clara estructura la acción y evita la improvisación peligrosa."},
    {q:"¿Cuál es el objetivo principal de la lección L3 de este módulo?",opts:["Reexplicar la teoría de los motores diésel","Estructurar las acciones de emergencia inmediatas ante una avería crítica de maquinaria","Estudiar la responsabilidad jurídica en caso de avería","Aprender a sustituir una biela"],correct:1,expl:"L3 se centra en la acción inmediata y estructurada durante la propia emergencia, tras los factores humanos (L1) y la coordinación (L2)."},
    {q:"¿Tiene una avería catastrófica generalmente una causa única e imprevisible?",opts:["Sí, siempre","No, suele tener una causa de fondo (mantenimiento, procedimiento, decisión) identificable tras la investigación","Depende únicamente del azar","Solo el mal tiempo puede explicar una avería catastrófica"],correct:1,expl:"El caso Finlandia Seaways muestra que una avería catastrófica suele tener una causa de fondo identificable, aquí la gestión del mantenimiento."},
    {q:"¿Qué arriesga un equipo que intenta repetidamente el mismo reinicio fallido en un contexto de alto riesgo (canal estrecho)?",opts:["Nada, perseverar siempre es la estrategia correcta","Perder un tiempo precioso que debería haberse dedicado a cambiar al respaldo","Siempre acelera la resolución","El puente tomará el relevo automáticamente"],correct:1,expl:"Insistir en el mismo intento en un contexto de alto riesgo consume un tiempo que el buque quizá no tenga — cambiar al respaldo se vuelve prioritario."},
    {q:"¿Qué información es LA MÁS importante para transmitir primero en un informe de emergencia?",opts:["Una larga lista de detalles técnicos secundarios","Lo que ocurrió y la acción en curso, de forma concisa y accionable","El nombre de la persona responsable de la avería","Nada, es mejor no decir nada hasta que esté resuelto"],correct:1,expl:"Un informe de emergencia eficaz va al grano: lo que ocurrió y lo que se está haciendo, para permitir una decisión rápida desde el puente."},
    {q:"¿Por qué aislar el fallo antes de intentar un reinicio?",opts:["No es necesario, se puede reiniciar directamente","Reiniciar sin aislar el fallo inicial puede agravar la avería o causar una segunda","Aislar siempre lleva más tiempo del que vale la pena","Solo concierne a los buques grandes"],correct:1,expl:"Reiniciar sin haber aislado la causa inicial puede reintroducir el mismo fallo o causar uno nuevo, agravando la situación."},
    {q:"¿En qué se apoya la lección L3 en L1 y L2?",opts:["No tiene relación con ellas","Supone que el factor humano (L1) y la coordinación de equipo (L2) están controlados, para centrarse en la propia acción de emergencia","Las contradice","Las sustituye por completo"],correct:1,expl:"L3 se apoya en los fundamentos establecidos por L1 (factor humano) y L2 (coordinación) para abordar la ejecución concreta de la emergencia."},
    {q:"¿Cuál es el principal peligro de querer resolver completamente el problema antes de informar al puente?",opts:["Ningún peligro particular","El puente pierde un tiempo precioso para anticipar las consecuencias (navegación, seguridad) de la avería en curso","Acelera la resolución técnica","El puente no necesita esa información de todos modos"],correct:1,expl:"Esperar a la resolución completa priva al puente del tiempo necesario para anticipar las consecuencias operativas de la avería."},
  ],
  pt:[
    {q:"Qual é a primeira prioridade perante uma avaria crítica de maquinaria em curso?",opts:["Encontrar a causa exata antes de qualquer ação","Isolar a falha visível e seguir a sequência de emergência sem demora","Esperar pelas instruções da ponte","Documentar o incidente para o relatório"],correct:1,expl:"A emergência exige agir segundo a checklist estabelecida — isolar e depois seguir a sequência — em vez de esperar por um diagnóstico completo."},
    {q:"Por que não se deve 'saltar passos' da sequência de reinício para ir mais depressa?",opts:["Não tem qualquer consequência","Saltar um passo muitas vezes causa uma segunda falha, agravando a situação","A sequência é puramente indicativa","Acelera sempre a resolução sem risco"],correct:1,expl:"A sequência de reinício segue uma ordem precisa por uma razão técnica — saltá-la para ganhar tempo muitas vezes causa uma segunda falha."},
    {q:"Quando se deve informar a ponte de uma avaria crítica de maquinaria?",opts:["Só depois de o problema estar resolvido","Imediatamente, com um relatório estruturado, sem esperar pela resolução","Só se a ponte pedir explicitamente","Nunca, é um assunto exclusivo da casa das máquinas"],correct:1,expl:"Um relatório de emergência imediato e estruturado permite à ponte antecipar-se — esperar pela resolução priva a equipa de navegação de informação vital."},
    {q:"O que deve conter um relatório de emergência estruturado à ponte?",opts:["Uma frase tranquilizadora sem detalhes","O que aconteceu, a causa provável, a ação em curso, o prazo estimado","Só a hora do incidente","Uma lista de desculpas"],correct:1,expl:"Um relatório acionável dá à ponte o necessário para antecipar: factos, causa provável, ação em curso, prazo estimado."},
    {q:"Por que é que o contexto do navio (alto mar vs canal estreito) muda a prioridade de ação durante uma avaria?",opts:["Não muda nada, o procedimento é idêntico","O tempo disponível antes de aparecer um perigo real varia muito consoante o contexto","Só importa o tempo meteorológico, não a posição","O contexto só diz respeito à ponte"],correct:1,expl:"Numa zona restrita ou com mau tempo, a margem antes de aparecer um perigo real é muito mais curta do que em alto mar com tempo calmo."},
    {q:"O que mostra o caso do Finlandia Seaways (2018)?",opts:["Que um incêndio de máquinas é sempre imprevisível e sem causa identificável","Que uma avaria catastrófica (rutura de biela) pode provocar um incêndio que exige uma checklist de emergência clara","Que a manutenção não tem relação com as avarias catastróficas","Que a tripulação não tem qualquer papel perante um incêndio de motor"],correct:1,expl:"A investigação MAIB relaciona a avaria catastrófica com a qualidade da manutenção, e destaca a importância de uma reação de emergência bem sequenciada."},
    {q:"Qual é a primeira ação recomendada perante um início de incêndio na casa das máquinas ligado a uma avaria de motor?",opts:["Procurar a fonte exata antes de agir","Isolar a alimentação de combustível para limitar o agravamento","Evacuar imediatamente sem qualquer outra ação","Continuar as operações normalmente"],correct:1,expl:"Isolar rapidamente a alimentação de combustível limita o agravamento de um incêndio de máquinas, uma prioridade imediata antes de qualquer diagnóstico completo."},
    {q:"Por que é especialmente útil uma checklist de emergência clara num ambiente cheio de fumo e ruído?",opts:["Não traz nada nesse contexto","Evita a improvisação quando o raciocínio calmo se torna difícil sob stress e condições degradadas","Substitui a formação da equipa","Só diz respeito aos oficiais seniores"],correct:1,expl:"Sob stress, fumo e ruído, uma checklist clara estrutura a ação e evita a improvisação perigosa."},
    {q:"Qual é o objetivo principal da lição L3 deste módulo?",opts:["Reexplicar a teoria dos motores diesel","Estruturar as ações de emergência imediatas perante uma avaria crítica de maquinaria","Estudar a responsabilidade jurídica em caso de avaria","Aprender a substituir uma biela"],correct:1,expl:"L3 foca-se na ação imediata e estruturada durante a própria emergência, após os fatores humanos (L1) e a coordenação (L2)."},
    {q:"Uma avaria catastrófica tem geralmente uma causa única e imprevisível?",opts:["Sim, sempre","Não, tem muitas vezes uma causa de fundo (manutenção, procedimento, decisão) identificável após investigação","Depende unicamente do acaso","Só o mau tempo pode explicar uma avaria catastrófica"],correct:1,expl:"O caso Finlandia Seaways mostra que uma avaria catastrófica tem muitas vezes uma causa de fundo identificável, aqui a gestão da manutenção."},
    {q:"O que arrisca uma equipa que tenta repetidamente o mesmo reinício falhado num contexto de alto risco (canal estreito)?",opts:["Nada, perseverar é sempre a estratégia certa","Perder um tempo precioso que deveria ter sido dedicado a mudar para a reserva","Acelera sempre a resolução","A ponte assumirá automaticamente"],correct:1,expl:"Insistir na mesma tentativa num contexto de alto risco consome um tempo que o navio pode não ter — mudar para a reserva torna-se prioritário."},
    {q:"Que informação é A MAIS importante a transmitir primeiro num relatório de emergência?",opts:["Uma longa lista de detalhes técnicos secundários","O que aconteceu e a ação em curso, de forma concisa e acionável","O nome da pessoa responsável pela avaria","Nada, é melhor não dizer nada até estar resolvido"],correct:1,expl:"Um relatório de emergência eficaz vai direto ao essencial: o que aconteceu e o que está a ser feito, para permitir uma decisão rápida da ponte."},
    {q:"Por que isolar a falha antes de tentar um reinício?",opts:["Não é necessário, pode-se reiniciar diretamente","Reiniciar sem isolar a falha inicial pode agravar a avaria ou causar uma segunda","Isolar leva sempre mais tempo do que vale a pena","Só diz respeito a navios grandes"],correct:1,expl:"Reiniciar sem ter isolado a causa inicial pode reintroduzir a mesma falha ou causar uma nova, agravando a situação."},
    {q:"Como é que a lição L3 se apoia em L1 e L2?",opts:["Não tem relação com elas","Assume que o fator humano (L1) e a coordenação de equipa (L2) estão controlados, para se focar na própria ação de emergência","Contradiz-as","Substitui-as completamente"],correct:1,expl:"L3 apoia-se nas bases estabelecidas por L1 (fator humano) e L2 (coordenação) para abordar a execução concreta da emergência."},
    {q:"Qual é o principal perigo de querer resolver completamente o problema antes de informar a ponte?",opts:["Nenhum perigo particular","A ponte perde um tempo precioso para antecipar as consequências (navegação, segurança) da avaria em curso","Acelera a resolução técnica","A ponte não precisa dessa informação de qualquer forma"],correct:1,expl:"Esperar pela resolução completa priva a ponte do tempo necessário para antecipar as consequências operacionais da avaria."},
  ],
};

// ══════════════════════════════════════
// QUIZ — FINAL (5 QUESTIONS)
// ══════════════════════════════════════
export const QUIZ = {
  fr:[
    {q:"Quelle est la première priorité face à une avarie machine critique en cours ?",opts:["Trouver la cause exacte avant toute action","Isoler le défaut visible et suivre la séquence d'urgence sans délai","Attendre les instructions de la passerelle","Documenter l'incident pour le rapport"],correct:1,expl:"L'urgence impose d'agir selon la checklist établie plutôt que d'attendre un diagnostic complet."},
    {q:"Quand faut-il informer la passerelle d'une avarie machine critique ?",opts:["Seulement une fois le problème résolu","Immédiatement, avec un rapport structuré","Seulement si la passerelle le demande","Jamais"],correct:1,expl:"Un rapport d'urgence immédiat et structuré permet à la passerelle d'anticiper les conséquences opérationnelles."},
    {q:"Pourquoi le contexte du navire change-t-il la priorité d'action lors d'une avarie ?",opts:["Il ne change rien","Le temps disponible avant qu'un danger réel n'apparaisse varie fortement selon le contexte","Seule la météo compte","Le contexte ne concerne que la passerelle"],correct:1,expl:"En zone resserrée ou par gros temps, la marge de manœuvre est bien plus courte qu'en haute mer par temps calme."},
    {q:"Que montre le cas du Finlandia Seaways (2018) ?",opts:["Qu'un incendie machine est toujours imprévisible et sans cause","Qu'une avarie catastrophique peut provoquer un incendie nécessitant une checklist d'urgence claire","Que la maintenance n'a aucun lien avec les avaries","Que l'équipage n'a aucun rôle à jouer"],correct:1,expl:"L'enquête MAIB relie la rupture catastrophique à la qualité de la maintenance et à l'importance d'une réaction bien séquencée."},
    {q:"Pourquoi ne faut-il pas brûler les étapes de la séquence de redémarrage ?",opts:["Cela n'a aucune conséquence","Sauter une étape crée souvent une seconde panne","La séquence est purement indicative","Cela accélère toujours la résolution sans risque"],correct:1,expl:"La séquence suit un ordre précis pour une raison technique — la brûler cause souvent une seconde défaillance."},
  ],
  en:[
    {q:"What is the first priority when facing a critical machinery failure in progress?",opts:["Find the exact cause before any action","Isolate the visible fault and follow the emergency sequence without delay","Wait for bridge instructions","Document the incident for the report"],correct:1,expl:"The emergency requires acting according to the established checklist rather than waiting for a full diagnosis."},
    {q:"When should the bridge be informed of a critical machinery failure?",opts:["Only once the problem is solved","Immediately, with a structured report","Only if the bridge asks","Never"],correct:1,expl:"An immediate, structured emergency report allows the bridge to anticipate operational consequences."},
    {q:"Why does the ship's context change the priority of action during a casualty?",opts:["It changes nothing","The time available before a real danger appears varies greatly depending on the context","Only the weather matters","The context only concerns the bridge"],correct:1,expl:"In a restricted area or heavy weather, the margin is much shorter than in open sea in calm weather."},
    {q:"What does the Finlandia Seaways case (2018) show?",opts:["That an engine fire is always unpredictable with no cause","That a catastrophic failure can cause a fire requiring a clear emergency checklist","That maintenance has no link to casualties","That the crew has no role to play"],correct:1,expl:"The MAIB investigation links the catastrophic failure to maintenance quality and to the importance of a well-sequenced reaction."},
    {q:"Why should you not skip steps of the restart sequence?",opts:["It has no consequence","Skipping a step often causes a second failure","The sequence is purely indicative","It always speeds up resolution without risk"],correct:1,expl:"The sequence follows a precise order for a technical reason — skipping it often causes a second failure."},
  ],
  es:[
    {q:"¿Cuál es la primera prioridad ante una avería crítica de maquinaria en curso?",opts:["Encontrar la causa exacta antes de cualquier acción","Aislar el fallo visible y seguir la secuencia de emergencia sin demora","Esperar las instrucciones del puente","Documentar el incidente para el informe"],correct:1,expl:"La emergencia exige actuar según la checklist establecida en lugar de esperar un diagnóstico completo."},
    {q:"¿Cuándo hay que informar al puente de una avería crítica de maquinaria?",opts:["Solo una vez resuelto el problema","De inmediato, con un informe estructurado","Solo si el puente lo pide","Nunca"],correct:1,expl:"Un informe de emergencia inmediato y estructurado permite al puente anticipar las consecuencias operativas."},
    {q:"¿Por qué el contexto del buque cambia la prioridad de acción durante una avería?",opts:["No cambia nada","El tiempo disponible antes de que aparezca un peligro real varía mucho según el contexto","Solo importa el tiempo meteorológico","El contexto solo concierne al puente"],correct:1,expl:"En una zona restringida o con mal tiempo, el margen es mucho más corto que en alta mar con tiempo calmo."},
    {q:"¿Qué muestra el caso del Finlandia Seaways (2018)?",opts:["Que un incendio de máquinas siempre es imprevisible y sin causa","Que una avería catastrófica puede provocar un incendio que requiere una checklist de emergencia clara","Que el mantenimiento no tiene relación con las averías","Que la tripulación no tiene ningún papel"],correct:1,expl:"La investigación MAIB relaciona la avería catastrófica con la calidad del mantenimiento y la importancia de una reacción bien secuenciada."},
    {q:"¿Por qué no hay que saltarse pasos de la secuencia de reinicio?",opts:["No tiene ninguna consecuencia","Saltarse un paso suele causar un segundo fallo","La secuencia es puramente indicativa","Siempre acelera la resolución sin riesgo"],correct:1,expl:"La secuencia sigue un orden preciso por una razón técnica — saltársela suele causar un segundo fallo."},
  ],
  pt:[
    {q:"Qual é a primeira prioridade perante uma avaria crítica de maquinaria em curso?",opts:["Encontrar a causa exata antes de qualquer ação","Isolar a falha visível e seguir a sequência de emergência sem demora","Esperar pelas instruções da ponte","Documentar o incidente para o relatório"],correct:1,expl:"A emergência exige agir segundo a checklist estabelecida em vez de esperar por um diagnóstico completo."},
    {q:"Quando se deve informar a ponte de uma avaria crítica de maquinaria?",opts:["Só depois de o problema estar resolvido","Imediatamente, com um relatório estruturado","Só se a ponte pedir","Nunca"],correct:1,expl:"Um relatório de emergência imediato e estruturado permite à ponte antecipar as consequências operacionais."},
    {q:"Por que é que o contexto do navio muda a prioridade de ação durante uma avaria?",opts:["Não muda nada","O tempo disponível antes de aparecer um perigo real varia muito consoante o contexto","Só importa o tempo meteorológico","O contexto só diz respeito à ponte"],correct:1,expl:"Numa zona restrita ou com mau tempo, a margem é muito mais curta do que em alto mar com tempo calmo."},
    {q:"O que mostra o caso do Finlandia Seaways (2018)?",opts:["Que um incêndio de máquinas é sempre imprevisível e sem causa","Que uma avaria catastrófica pode provocar um incêndio que exige uma checklist de emergência clara","Que a manutenção não tem relação com as avarias","Que a tripulação não tem qualquer papel"],correct:1,expl:"A investigação MAIB relaciona a avaria catastrófica com a qualidade da manutenção e a importância de uma reação bem sequenciada."},
    {q:"Por que não se deve saltar passos da sequência de reinício?",opts:["Não tem qualquer consequência","Saltar um passo muitas vezes causa uma segunda falha","A sequência é puramente indicativa","Acelera sempre a resolução sem risco"],correct:1,expl:"A sequência segue uma ordem precisa por uma razão técnica — saltá-la muitas vezes causa uma segunda falha."},
  ],
};

// ══════════════════════════════════════
// SAFETY REFLECTION (permanent Safety Dept feature)
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Repense à une avarie machine que tu as vécue ou observée. La séquence d'urgence a-t-elle été suivie sans dévier ? La passerelle a-t-elle été informée assez tôt ?",
    en:"Think of a machinery casualty you experienced or observed. Was the emergency sequence followed without deviation? Was the bridge informed early enough?",
    es:"Piensa en una avería de maquinaria que hayas vivido u observado. ¿Se siguió la secuencia de emergencia sin desviarse? ¿Se informó al puente con suficiente antelación?",
    pt:"Pensa numa avaria de maquinaria que tenhas vivido ou observado. A sequência de emergência foi seguida sem desviar? A ponte foi informada cedo o suficiente?",
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
      badge:"⚙️ Safety · Engine Room Resource Management · Leçon 3/6 · ⭐ Premium",
      title:"Actions d'Urgence Pendant une Avarie Machine Critique",
      intro:"L1 et L2 ont posé les fondations : le facteur humain individuel, puis la coordination d'équipe. Cette leçon aborde ce qui se passe concrètement dans les premières minutes d'une avarie critique — quand il faut agir, pas seulement comprendre.\n\nC'est le troisième pilier de l'ERM : l'exécution structurée de l'action d'urgence elle-même.",
      p0:"POURQUOI L'ACTION IMMÉDIATE DOIT ÊTRE STRUCTURÉE",s0t:"L'improvisation est l'ennemi de l'urgence",
      s0:"Face à une avarie critique, le stress pousse à improviser. Or c'est précisément dans ces moments que suivre une séquence connue à l'avance fait la différence.\n\nCOMMENT PRÉVENIR L'AGGRAVATION ? En suivant une checklist établie plutôt qu'en réinventant une réponse sous pression.\nQUE FAIRE QUAND LE TEMPS MANQUE ? Prioriser selon le contexte réel du navire, pas selon une procédure générique figée.\nQUELLE LEÇON RETENIR ? Une action rapide et structurée limite l'aggravation mieux qu'une action rapide mais désordonnée.",
      p1:"LA CHECKLIST D'URGENCE",s1t:"Isoler, redémarrer, basculer, informer",
      s1:"Face à un blackout ou une avarie critique, quatre actions structurent la réponse immédiate : isoler le défaut, suivre la séquence de redémarrage, basculer sur le secours si nécessaire, et informer la passerelle sans délai.",
      p2:"LE TEMPS DISPONIBLE DÉPEND DU CONTEXTE",s2t:"Haute mer, zone côtière, gros temps : trois urgences différentes",
      s2:"La même avarie n'a pas la même urgence selon le contexte du navire au moment où elle survient. Reconnaître ce contexte fait partie de la décision d'urgence elle-même.",
      p3:"LE RAPPORT D'URGENCE STRUCTURÉ",s3t:"Informer vite, informer utile",
      s3:"Un rapport d'urgence efficace ne rassure pas vaguement — il donne à la passerelle ce qu'elle a besoin de savoir pour anticiper : ce qui s'est passé, la cause probable, l'action en cours, le délai estimé.",
      p4:"🎯 EXERCICE OPÉRATIONNEL",p5:"⚠️ CAS RÉEL",p6:"📝 BANQUE DE 15 QUESTIONS",p7:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 3",
      sumP:["Une checklist d'urgence structurée évite l'improvisation dangereuse","Isoler le défaut avant de redémarrer évite d'aggraver l'avarie","Le temps disponible avant qu'un danger réel n'apparaisse dépend du contexte du navire","Un rapport d'urgence structuré permet à la passerelle d'anticiper","Une avarie catastrophique a souvent une cause de fond identifiable, pas un hasard isolé"],
      learnedP:["La checklist d'urgence en 4 étapes","Le temps disponible selon le contexte du navire","Le rapport d'urgence structuré","Le cas du Finlandia Seaways (2018)","Pourquoi l'action structurée prime sur l'improvisation rapide"],
      safetyMsg:"Dans l'urgence, la vitesse sans structure n'est pas de l'efficacité — c'est du hasard. Une action rapide et structurée est ce qui protège réellement l'équipage.",
    },
    en:{
      badge:"⚙️ Safety · Engine Room Resource Management · Lesson 3/6 · ⭐ Premium",
      title:"Emergency Actions During a Critical Machinery Failure",
      intro:"L1 and L2 laid the foundations: the individual human factor, then team coordination. This lesson addresses what actually happens in the first minutes of a critical casualty — when it's time to act, not just to understand.\n\nThis is the third pillar of ERM: the structured execution of the emergency action itself.",
      p0:"WHY IMMEDIATE ACTION MUST BE STRUCTURED",s0t:"Improvisation is the enemy of emergencies",
      s0:"Facing a critical casualty, stress pushes toward improvisation. Yet it is precisely in these moments that following a sequence known in advance makes the difference.\n\nHOW TO PREVENT ESCALATION? By following an established checklist rather than reinventing a response under pressure.\nWHAT TO DO WHEN TIME IS SHORT? Prioritize according to the ship's actual context, not a fixed generic procedure.\nWHAT LESSON TO RETAIN? A fast, structured action limits escalation better than a fast but disorganized one.",
      p1:"THE EMERGENCY CHECKLIST",s1t:"Isolate, restart, switch, inform",
      s1:"Facing a blackout or a critical casualty, four actions structure the immediate response: isolate the fault, follow the restart sequence, switch to backup if needed, and inform the bridge without delay.",
      p2:"AVAILABLE TIME DEPENDS ON CONTEXT",s2t:"Open sea, coastal area, heavy weather: three different emergencies",
      s2:"The same casualty does not carry the same urgency depending on the ship's context when it occurs. Recognizing this context is part of the emergency decision itself.",
      p3:"THE STRUCTURED EMERGENCY REPORT",s3t:"Inform fast, inform usefully",
      s3:"An effective emergency report does not vaguely reassure — it gives the bridge what it needs to anticipate: what happened, the probable cause, the ongoing action, the estimated timeframe.",
      p4:"🎯 OPERATIONAL EXERCISE",p5:"⚠️ REAL CASUALTY CASE",p6:"📝 15-QUESTION BANK",p7:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 3",
      sumP:["A structured emergency checklist avoids dangerous improvisation","Isolating the fault before restarting avoids worsening the casualty","The time available before a real danger appears depends on the ship's context","A structured emergency report allows the bridge to anticipate","A catastrophic failure often has an identifiable underlying cause, not isolated chance"],
      learnedP:["The 4-step emergency checklist","Available time depending on the ship's context","The structured emergency report","The Finlandia Seaways case (2018)","Why structured action beats fast improvisation"],
      safetyMsg:"In an emergency, speed without structure is not efficiency — it is chance. A fast, structured action is what actually protects the crew.",
    },
    es:{
      badge:"⚙️ Seguridad · Engine Room Resource Management · Lección 3/6 · ⭐ Premium",
      title:"Acciones de Emergencia Durante una Avería Crítica de Maquinaria",
      intro:"L1 y L2 sentaron las bases: el factor humano individual, luego la coordinación de equipo. Esta lección aborda lo que realmente ocurre en los primeros minutos de una avería crítica — cuando hay que actuar, no solo comprender.\n\nEste es el tercer pilar del ERM: la ejecución estructurada de la propia acción de emergencia.",
      p0:"POR QUÉ LA ACCIÓN INMEDIATA DEBE SER ESTRUCTURADA",s0t:"La improvisación es la enemiga de la emergencia",
      s0:"Ante una avería crítica, el estrés empuja a improvisar. Sin embargo, es precisamente en esos momentos cuando seguir una secuencia conocida de antemano marca la diferencia.\n\n¿CÓMO PREVENIR EL AGRAVAMIENTO? Siguiendo una checklist establecida en lugar de reinventar una respuesta bajo presión.\n¿QUÉ HACER CUANDO FALTA TIEMPO? Priorizar según el contexto real del buque, no según un procedimiento genérico fijo.\n¿QUÉ LECCIÓN RETENER? Una acción rápida y estructurada limita el agravamiento mejor que una acción rápida pero desordenada.",
      p1:"LA CHECKLIST DE EMERGENCIA",s1t:"Aislar, reiniciar, cambiar, informar",
      s1:"Ante un apagón o una avería crítica, cuatro acciones estructuran la respuesta inmediata: aislar el fallo, seguir la secuencia de reinicio, cambiar al respaldo si es necesario, e informar al puente sin demora.",
      p2:"EL TIEMPO DISPONIBLE DEPENDE DEL CONTEXTO",s2t:"Alta mar, zona costera, mal tiempo: tres emergencias distintas",
      s2:"La misma avería no tiene la misma urgencia según el contexto del buque en el momento en que ocurre. Reconocer este contexto forma parte de la propia decisión de emergencia.",
      p3:"EL INFORME DE EMERGENCIA ESTRUCTURADO",s3t:"Informar rápido, informar útil",
      s3:"Un informe de emergencia eficaz no tranquiliza vagamente — da al puente lo que necesita saber para anticipar: lo que ocurrió, la causa probable, la acción en curso, el plazo estimado.",
      p4:"🎯 EJERCICIO OPERATIVO",p5:"⚠️ CASO REAL",p6:"📝 BANCO DE 15 PREGUNTAS",p7:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 3",
      sumP:["Una checklist de emergencia estructurada evita la improvisación peligrosa","Aislar el fallo antes de reiniciar evita agravar la avería","El tiempo disponible antes de que aparezca un peligro real depende del contexto del buque","Un informe de emergencia estructurado permite al puente anticiparse","Una avería catastrófica suele tener una causa de fondo identificable, no un azar aislado"],
      learnedP:["La checklist de emergencia en 4 pasos","El tiempo disponible según el contexto del buque","El informe de emergencia estructurado","El caso del Finlandia Seaways (2018)","Por qué la acción estructurada prima sobre la improvisación rápida"],
      safetyMsg:"En la emergencia, la velocidad sin estructura no es eficacia — es azar. Una acción rápida y estructurada es lo que realmente protege a la tripulación.",
    },
    pt:{
      badge:"⚙️ Segurança · Engine Room Resource Management · Lição 3/6 · ⭐ Premium",
      title:"Ações de Emergência Durante uma Avaria Crítica de Maquinaria",
      intro:"A L1 e a L2 lançaram as bases: o fator humano individual, depois a coordenação de equipa. Esta lição aborda o que realmente acontece nos primeiros minutos de uma avaria crítica — quando é preciso agir, não apenas compreender.\n\nEste é o terceiro pilar do ERM: a execução estruturada da própria ação de emergência.",
      p0:"POR QUE A AÇÃO IMEDIATA DEVE SER ESTRUTURADA",s0t:"A improvisação é a inimiga da emergência",
      s0:"Perante uma avaria crítica, o stress empurra para a improvisação. No entanto, é precisamente nesses momentos que seguir uma sequência conhecida de antemão faz a diferença.\n\nCOMO PREVENIR O AGRAVAMENTO? Seguindo uma checklist estabelecida em vez de reinventar uma resposta sob pressão.\nO QUE FAZER QUANDO FALTA TEMPO? Priorizar segundo o contexto real do navio, não um procedimento genérico fixo.\nQUE LIÇÃO RETER? Uma ação rápida e estruturada limita o agravamento melhor do que uma ação rápida mas desorganizada.",
      p1:"A CHECKLIST DE EMERGÊNCIA",s1t:"Isolar, reiniciar, mudar, informar",
      s1:"Perante um blackout ou uma avaria crítica, quatro ações estruturam a resposta imediata: isolar a falha, seguir a sequência de reinício, mudar para a reserva se necessário, e informar a ponte sem demora.",
      p2:"O TEMPO DISPONÍVEL DEPENDE DO CONTEXTO",s2t:"Alto mar, zona costeira, mau tempo: três emergências diferentes",
      s2:"A mesma avaria não tem a mesma urgência consoante o contexto do navio no momento em que ocorre. Reconhecer este contexto faz parte da própria decisão de emergência.",
      p3:"O RELATÓRIO DE EMERGÊNCIA ESTRUTURADO",s3t:"Informar depressa, informar útil",
      s3:"Um relatório de emergência eficaz não tranquiliza vagamente — dá à ponte o que precisa de saber para antecipar: o que aconteceu, a causa provável, a ação em curso, o prazo estimado.",
      p4:"🎯 EXERCÍCIO OPERACIONAL",p5:"⚠️ CASO REAL",p6:"📝 BANCO DE 15 PERGUNTAS",p7:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 3",
      sumP:["Uma checklist de emergência estruturada evita a improvisação perigosa","Isolar a falha antes de reiniciar evita agravar a avaria","O tempo disponível antes de aparecer um perigo real depende do contexto do navio","Um relatório de emergência estruturado permite à ponte antecipar","Uma avaria catastrófica tem muitas vezes uma causa de fundo identificável, não um acaso isolado"],
      learnedP:["A checklist de emergência em 4 passos","O tempo disponível segundo o contexto do navio","O relatório de emergência estruturado","O caso do Finlandia Seaways (2018)","Por que a ação estruturada prevalece sobre a improvisação rápida"],
      safetyMsg:"Na emergência, a velocidade sem estrutura não é eficácia — é acaso. Uma ação rápida e estruturada é o que realmente protege a tripulação.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1E_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/6":lang==="en"?"Lesson 3/6":lang==="es"?"Lección 3/6":"Lição 3/6"}</div>
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

            <SL icon="✅" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>✅</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>✅ {lang==="fr"?"CHECKLIST D'URGENCE — INTERACTIF":lang==="en"?"EMERGENCY CHECKLIST — INTERACTIVE":lang==="es"?"CHECKLIST DE EMERGENCIA — INTERACTIVO":"CHECKLIST DE EMERGÊNCIA — INTERATIVO"}</div><EmergencyChecklistSVG lang={lang}/></Card>

            <SL icon="⏱️" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏱️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⏱️ {lang==="fr"?"CONTEXTE ET URGENCE — INTERACTIF":lang==="en"?"CONTEXT AND URGENCY — INTERACTIVE":lang==="es"?"CONTEXTO Y URGENCIA — INTERACTIVO":"CONTEXTO E URGÊNCIA — INTERATIVO"}</div><UrgencyContextSVG lang={lang}/></Card>

            <SL icon="📢" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📢</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📢 {lang==="fr"?"RAPPORT D'URGENCE — INTERACTIF":lang==="en"?"EMERGENCY REPORT — INTERACTIVE":lang==="es"?"INFORME DE EMERGENCIA — INTERACTIVO":"RELATÓRIO DE EMERGÊNCIA — INTERATIVO"}</div><EmergencyReportSVG lang={lang}/></Card>

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
                {lang==="fr"?"Quiz Final — Actions d'Urgence":lang==="en"?"Final Quiz — Emergency Actions":lang==="es"?"Quiz Final — Acciones de Emergencia":"Quiz Final — Ações de Emergência"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 3/6":lang==="en"?"questions · Lesson 3/6":lang==="es"?"preguntas · Lección 3/6":"perguntas · Lição 3/6"}</div>
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
              {lang==="fr"?"LEÇON 4 — LES MINUTES CRITIQUES →":lang==="en"?"LESSON 4 — THE CRITICAL FIRST MINUTES →":lang==="es"?"LECCIÓN 4 — LOS MINUTOS CRÍTICOS →":"LIÇÃO 4 — OS MINUTOS CRÍTICOS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
