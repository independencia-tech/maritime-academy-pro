import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", yellow:"#f1c40f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module Machine", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Engine Module", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo Máquinas", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo Máquinas", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

function Stars(){const s=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<div><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></div>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.green}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════
// SVG 1 - PSC vs FLAG STATE
// ══════════════════════════════════════
function PSCFlagSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"psc", icon:"⚓", color:C.blue2,
      label:{fr:"Port State Control",en:"Port State Control",es:"Port State Control",pt:"Port State Control"},
      desc:{fr:"Controle exerce par les autorites du pays d'escale, de maniere ponctuelle a chaque arrivee au port. Verifie la conformite aux conventions internationales au moment precis de l'inspection - une photographie, pas un suivi continu.",en:"Control exercised by the authorities of the port country, on a one-off basis at each port arrival. Checks compliance with international conventions at the precise moment of inspection - a snapshot, not continuous monitoring.",es:"Control ejercido por las autoridades del pais de escala, de forma puntual en cada llegada al puerto. Verifica el cumplimiento de los convenios internacionales en el momento preciso de la inspeccion - una fotografia, no un seguimiento continuo.",pt:"Controlo exercido pelas autoridades do pais de escala, de forma pontual em cada chegada ao porto. Verifica o cumprimento das convencoes internacionais no momento preciso da inspecao - uma fotografia, nao um acompanhamento continuo."} },
    { id:"flag", icon:"🏳️", color:C.gold2,
      label:{fr:"Flag State",en:"Flag State",es:"Flag State",pt:"Flag State"},
      desc:{fr:"Responsabilite continue de l'Etat d'immatriculation du navire, tout au long de sa vie operationnelle. Delivre les certificats (IAPP, IOPP...), audite periodiquement, et reste responsable de la conformite du navire independamment de sa position geographique.",en:"Continuous responsibility of the vessel's flag state, throughout its operational life. Issues certificates (IAPP, IOPP...), audits periodically, and remains responsible for the vessel's compliance regardless of its geographic position.",es:"Responsabilidad continua del Estado de abanderamiento del buque, durante toda su vida operativa. Emite los certificados (IAPP, IOPP...), audita periodicamente, y sigue siendo responsable de la conformidad del buque independientemente de su posicion geografica.",pt:"Responsabilidade continua do Estado de bandeira do navio, durante toda a sua vida operacional. Emite os certificados (IAPP, IOPP...), audita periodicamente, e permanece responsavel pela conformidade do navio independentemente da sua posicao geografica."} },
    { id:"complement", icon:"🔗", color:C.teal,
      label:{fr:"Deux niveaux complémentaires",en:"Two complementary levels",es:"Dos niveles complementarios",pt:"Dois níveis complementares"},
      desc:{fr:"PSC et Flag State ne se substituent pas l'un a l'autre : le PSC verifie ponctuellement ce que le Flag State est cense garantir en continu. Un navire peut echouer une inspection PSC meme si son pavillon est reconnu comme rigoureux.",en:"PSC and Flag State do not replace one another: PSC checks periodically what the Flag State is supposed to guarantee continuously. A vessel can fail a PSC inspection even if its flag is recognized as rigorous.",es:"El PSC y el Flag State no se sustituyen mutuamente: el PSC verifica puntualmente lo que el Flag State se supone que garantiza de forma continua. Un buque puede fallar una inspeccion PSC incluso si su pabellon es reconocido como riguroso.",pt:"O PSC e o Flag State nao se substituem: o PSC verifica pontualmente o que o Flag State supostamente garante de forma continua. Um navio pode falhar numa inspecao PSC mesmo que a sua bandeira seja reconhecida como rigorosa."} },
    { id:"detention", icon:"🚫", color:C.red,
      label:{fr:"Conséquence d'une détention PSC",en:"Consequence of a PSC detention",es:"Consecuencia de una detención PSC",pt:"Consequência de uma detenção PSC"},
      desc:{fr:"Une detention PSC bloque le navire au port jusqu'a correction des deficiences - couts directs (retard, pénalites de charte-partie) et indirects (reputation, ciblage accru lors des prochaines escales).",en:"A PSC detention holds the vessel in port until deficiencies are corrected - direct costs (delay, charterparty penalties) and indirect costs (reputation, increased targeting at future port calls).",es:"Una detencion PSC retiene el buque en puerto hasta que se corrigen las deficiencias - costes directos (retraso, penalizaciones de fletamento) e indirectos (reputacion, mayor focalizacion en futuras escalas).",pt:"Uma detencao PSC retem o navio no porto ate que as deficiencias sejam corrigidas - custos diretos (atraso, penalidades de afretamento) e indiretos (reputacao, maior direcionamento em futuras escalas)."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{it.icon}</div>
            <div style={{fontSize:10,color:sel===it.id?it.color:C.muted,fontWeight:700,lineHeight:1.3}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un élément pour les détails":lang==="en"?"Tap an item for details":lang==="es"?"Toca un elemento para detalles":"Toque num item para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 - ISM CODE & ENVIRONMENTAL COMPLIANCE
// ══════════════════════════════════════
function ISMSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"sms", icon:"📘", color:C.blue2,
      label:{fr:"SMS - un seul système",en:"SMS - one single system",es:"SMS - un solo sistema",pt:"SMS - um único sistema"},
      desc:{fr:"La protection de l'environnement fait partie du Safety Management System (SMS), ce n'est pas un systeme separe. Les procedures MARPOL vues dans cette leçon (ORB, GRB, BDN, changeover) sont integrees au meme systeme documentaire que la securite.",en:"Environmental protection is part of the Safety Management System (SMS), not a separate system. The MARPOL procedures seen in this lesson (ORB, GRB, BDN, changeover) are integrated into the same documentary system as safety.",es:"La proteccion del medio ambiente forma parte del Safety Management System (SMS), no es un sistema separado. Los procedimientos MARPOL vistos en esta leccion (ORB, GRB, BDN, changeover) estan integrados en el mismo sistema documental que la seguridad.",pt:"A protecao do ambiente faz parte do Safety Management System (SMS), nao e um sistema separado. Os procedimentos MARPOL vistos nesta licao (ORB, GRB, BDN, changeover) estao integrados no mesmo sistema documental que a seguranca."} },
    { id:"dpa", icon:"👤", color:C.teal,
      label:{fr:"Designated Person Ashore (DPA)",en:"Designated Person Ashore (DPA)",es:"Designated Person Ashore (DPA)",pt:"Designated Person Ashore (DPA)"},
      desc:{fr:"Le DPA est le point de contact a terre entre le navire et la direction de la compagnie, exige par le Code ISM. Toute non-conformite environnementale grave a bord doit lui etre remontee - il a un acces direct a la direction generale, sans filtre hierarchique.",en:"The DPA is the shore-based point of contact between the vessel and the company's management, required by the ISM Code. Any serious environmental non-conformity on board must be reported to them - they have direct access to top management, without hierarchical filtering.",es:"El DPA es el punto de contacto en tierra entre el buque y la direccion de la compania, exigido por el Codigo ISM. Cualquier no conformidad ambiental grave a bordo debe ser reportada a el - tiene acceso directo a la alta direccion, sin filtro jerarquico.",pt:"O DPA e o ponto de contacto em terra entre o navio e a direcao da empresa, exigido pelo Codigo ISM. Qualquer nao conformidade ambiental grave a bordo deve ser reportada a ele - tem acesso direto a alta direcao, sem filtro hierarquico."} },
    { id:"report", icon:"📤", color:C.gold2,
      label:{fr:"Remontée des non-conformités",en:"Reporting non-conformities",es:"Reporte de no conformidades",pt:"Reporte de não conformidades"},
      desc:{fr:"Le SMS impose un canal clair pour signaler une non-conformite environnementale des sa detection a bord, sans attendre un controle externe. Un equipage qui attend l'inspection PSC pour signaler un probleme a deja failli au systeme.",en:"The SMS requires a clear channel to report an environmental non-conformity as soon as it is detected on board, without waiting for an external inspection. A crew that waits for the PSC inspection to report an issue has already failed the system.",es:"El SMS exige un canal claro para reportar una no conformidad ambiental en cuanto se detecta a bordo, sin esperar un control externo. Una tripulacion que espera la inspeccion PSC para reportar un problema ya ha fallado al sistema.",pt:"O SMS exige um canal claro para reportar uma nao conformidade ambiental assim que detetada a bordo, sem esperar por uma inspecao externa. Uma tripulacao que espera pela inspecao PSC para reportar um problema ja falhou ao sistema."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",gridColumn: it.id==="report"?"1 / span 2":"auto",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{it.icon}</div>
            <div style={{fontSize:10,color:sel===it.id?it.color:C.muted,fontWeight:700,lineHeight:1.3}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un élément pour les détails":lang==="en"?"Tap an item for details":lang==="es"?"Toca un elemento para detalles":"Toque num item para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 - INTERNAL AUDIT & CORRECTIVE ACTIONS
// ══════════════════════════════════════
function AuditSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"proactive", icon:"🔎", color:C.blue2,
      label:{fr:"Audit interne vs inspection externe",en:"Internal audit vs external inspection",es:"Auditoría interna vs inspección externa",pt:"Auditoria interna vs inspeção externa"},
      desc:{fr:"L'audit interne est proactif, mene par la compagnie elle-meme avant qu'un probleme ne devienne visible de l'exterieur. L'inspection externe (PSC, vetting) est reactive - elle constate ce que l'audit interne aurait du corriger en amont.",en:"The internal audit is proactive, conducted by the company itself before a problem becomes visible from the outside. The external inspection (PSC, vetting) is reactive - it finds what the internal audit should have corrected beforehand.",es:"La auditoria interna es proactiva, realizada por la propia compania antes de que un problema se haga visible desde el exterior. La inspeccion externa (PSC, vetting) es reactiva - constata lo que la auditoria interna deberia haber corregido antes.",pt:"A auditoria interna e proativa, conduzida pela propria empresa antes que um problema se torne visivel do exterior. A inspecao externa (PSC, vetting) e reativa - constata o que a auditoria interna deveria ter corrigido antes."} },
    { id:"observation", icon:"👁️", color:C.teal,
      label:{fr:"1. Observation",en:"1. Observation",es:"1. Observación",pt:"1. Observação"},
      desc:{fr:"Un ecart est constate lors de l'audit - une procedure non suivie, un registre incomplet, un equipement mal entretenu. A ce stade, ce n'est qu'un constat, pas encore une non-conformite formelle.",en:"A gap is noted during the audit - a procedure not followed, an incomplete record, poorly maintained equipment. At this stage, it is just a finding, not yet a formal non-conformity.",es:"Se constata una brecha durante la auditoria - un procedimiento no seguido, un registro incompleto, un equipo mal mantenido. En esta etapa, es solo una constatacion, no aun una no conformidad formal.",pt:"Uma lacuna e constatada durante a auditoria - um procedimento nao seguido, um registo incompleto, um equipamento mal mantido. Nesta fase, e apenas uma constatacao, ainda nao uma nao conformidade formal."} },
    { id:"nc", icon:"⚠️", color:C.orange,
      label:{fr:"2. Non-conformity",en:"2. Non-conformity",es:"2. No conformidad",pt:"2. Não conformidade"},
      desc:{fr:"L'ecart est formellement qualifie de non-conformite lorsqu'il represente un manquement a une exigence reglementaire ou procedurale du SMS - il est enregistre officiellement et engage une action corrective.",en:"The gap is formally classified as a non-conformity when it represents a failure to meet a regulatory or procedural SMS requirement - it is officially logged and triggers a corrective action.",es:"La brecha se clasifica formalmente como no conformidad cuando representa un incumplimiento de un requisito reglamentario o procedimental del SMS - se registra oficialmente y activa una accion correctiva.",pt:"A lacuna e formalmente classificada como nao conformidade quando representa um incumprimento de um requisito regulamentar ou procedimental do SMS - e registada oficialmente e desencadeia uma acao corretiva."} },
    { id:"ca", icon:"🛠️", color:C.gold2,
      label:{fr:"3. Corrective Action",en:"3. Corrective Action",es:"3. Acción correctiva",pt:"3. Ação corretiva"},
      desc:{fr:"Une action concrete est mise en place pour corriger la non-conformite et empecher sa repetition - reformation de l'equipage, modification d'une procedure, remplacement d'un equipement.",en:"A concrete action is put in place to correct the non-conformity and prevent its recurrence - crew retraining, procedure amendment, equipment replacement.",es:"Se implementa una accion concreta para corregir la no conformidad y evitar su repeticion - reentrenamiento de la tripulacion, modificacion de un procedimiento, sustitucion de un equipo.",pt:"Uma acao concreta e implementada para corrigir a nao conformidade e evitar sua repeticao - retreinamento da tripulacao, alteracao de um procedimento, substituicao de um equipamento."} },
    { id:"verify", icon:"✅", color:C.green,
      label:{fr:"4. Verification of effectiveness",en:"4. Verification of effectiveness",es:"4. Verificación de eficacia",pt:"4. Verificação de eficácia"},
      desc:{fr:"Le cycle ne se termine pas a la mise en place de l'action corrective - il faut verifier, lors d'un audit ulterieur, que l'action a reellement resolu le probleme et qu'il ne s'est pas reproduit.",en:"The cycle does not end once the corrective action is implemented - a later audit must verify that the action actually resolved the problem and that it has not recurred.",es:"El ciclo no termina al implementar la accion correctiva - una auditoria posterior debe verificar que la accion realmente resolvio el problema y que no se ha repetido.",pt:"O ciclo nao termina com a implementacao da acao corretiva - uma auditoria posterior deve verificar que a acao realmente resolveu o problema e que ele nao se repetiu."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",gridColumn: it.id==="proactive"?"1 / span 2":"auto",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{it.icon}</div>
            <div style={{fontSize:10,color:sel===it.id?it.color:C.muted,fontWeight:700,lineHeight:1.3}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un élément pour les détails - cycle en 4 étapes":lang==="en"?"Tap an item for details - 4-step cycle":lang==="es"?"Toca un elemento para detalles - ciclo de 4 pasos":"Toque num item para detalhes - ciclo de 4 etapas"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 - VETTING (SIRE)
// ══════════════════════════════════════
function VettingSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"what", icon:"🔍", color:C.blue2,
      label:{fr:"Qu'est-ce que le SIRE ?",en:"What is SIRE?",es:"¿Qué es el SIRE?",pt:"O que é o SIRE?"},
      desc:{fr:"Le Ship Inspection Report Programme (SIRE), gere par l'OCIMF, est une base de donnees partagee d'inspections de navires-citernes utilisee par les compagnies petrolieres pour decider si elles affretent un navire.",en:"The Ship Inspection Report Programme (SIRE), managed by OCIMF, is a shared database of tanker inspections used by oil companies to decide whether to charter a vessel.",es:"El Ship Inspection Report Programme (SIRE), gestionado por la OCIMF, es una base de datos compartida de inspecciones de buques tanque utilizada por las companias petroleras para decidir si fletan un buque.",pt:"O Ship Inspection Report Programme (SIRE), gerido pela OCIMF, e uma base de dados partilhada de inspecoes de navios-tanque utilizada pelas empresas petroliferas para decidir se afretam um navio."} },
    { id:"commercial", icon:"💼", color:C.gold2,
      label:{fr:"Exigence commerciale, pas légale",en:"Commercial, not legal, requirement",es:"Exigencia comercial, no legal",pt:"Exigência comercial, não legal"},
      desc:{fr:"Une inspection de vetting reussie est souvent une exigence commerciale plutot qu'une exigence legale. Contrairement au PSC, personne n'est oblige par la loi de se soumettre au SIRE - mais sans un bon resultat, l'acces a de nombreux contrats commerciaux se ferme.",en:"A successful vetting inspection is often a commercial requirement rather than a legal requirement. Unlike PSC, no one is legally required to undergo SIRE - but without a good result, access to many commercial contracts closes.",es:"Una inspeccion de vetting exitosa es a menudo una exigencia comercial mas que una exigencia legal. A diferencia del PSC, nadie esta legalmente obligado a someterse al SIRE - pero sin un buen resultado, el acceso a muchos contratos comerciales se cierra.",pt:"Uma inspecao de vetting bem-sucedida e frequentemente uma exigencia comercial em vez de uma exigencia legal. Ao contrario do PSC, ninguem e legalmente obrigado a submeter-se ao SIRE - mas sem um bom resultado, o acesso a muitos contratos comerciais se fecha."} },
    { id:"confusion", icon:"❓", color:C.orange,
      label:{fr:"Ne pas confondre avec le PSC",en:"Not to be confused with PSC",es:"No confundir con el PSC",pt:"Não confundir com o PSC"},
      desc:{fr:"De nombreux jeunes marins confondent vetting et PSC. Le PSC est un controle etatique obligatoire ; le vetting est une evaluation commerciale volontaire mais quasi indispensable pour operer sur le marche petrolier et chimique.",en:"Many young seafarers confuse vetting with PSC. PSC is a mandatory state control; vetting is a voluntary but near-essential commercial assessment for operating in the oil and chemical market.",es:"Muchos marinos jovenes confunden el vetting con el PSC. El PSC es un control estatal obligatorio; el vetting es una evaluacion comercial voluntaria pero casi indispensable para operar en el mercado petrolero y quimico.",pt:"Muitos marinheiros jovens confundem o vetting com o PSC. O PSC e um controlo estatal obrigatorio; o vetting e uma avaliacao comercial voluntaria mas quase indispensavel para operar no mercado petrolifero e quimico."} },
    { id:"consequence", icon:"📉", color:C.red,
      label:{fr:"Conséquence d'un mauvais résultat",en:"Consequence of a poor result",es:"Consecuencia de un mal resultado",pt:"Consequência de um mau resultado"},
      desc:{fr:"Une observation grave ('Immediate') peut fermer l'acces aux affretements premium jusqu'a correction verifiee. Contrairement a une amende PSC, cette consequence n'a pas de montant fixe - elle se mesure en opportunites commerciales perdues.",en:"A serious ('Immediate') observation can close access to premium charters until verified correction. Unlike a PSC fine, this consequence has no fixed amount - it is measured in lost commercial opportunities.",es:"Una observacion grave ('Immediate') puede cerrar el acceso a fletamentos premium hasta que se verifique la correccion. A diferencia de una multa PSC, esta consecuencia no tiene un monto fijo - se mide en oportunidades comerciales perdidas.",pt:"Uma observacao grave ('Immediate') pode fechar o acesso a afretamentos premium ate a correcao ser verificada. Ao contrario de uma multa PSC, essa consequencia nao tem um valor fixo - e medida em oportunidades comerciais perdidas."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{it.icon}</div>
            <div style={{fontSize:10,color:sel===it.id?it.color:C.muted,fontWeight:700,lineHeight:1.3}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un élément pour les détails":lang==="en"?"Tap an item for details":lang==="es"?"Toca un elemento para detalles":"Toque num item para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// ENVIRONMENTAL COMPLIANCE READINESS CHECKLIST
// ══════════════════════════════════════
function ComplianceChecklist({ lang }) {
  const items = {
    fr:["Tous les registres à jour et signés (ORB, GRB, BDN)","DPA notifié des non-conformités en cours","Dernier audit interne disponible et consultable","Certificats environnementaux tous valides (IAPP...)","Dernier rapport de vetting consulté","Actions correctives closes","Procédures environnementales disponibles dans le SMS","Équipage familier avec les procédures MARPOL"],
    en:["All records up to date and signed (ORB, GRB, BDN)","DPA notified of ongoing non-conformities","Latest internal audit available and reviewed","All environmental certificates valid (IAPP...)","Latest vetting report reviewed","Corrective actions closed","Environmental procedures available in SMS","Crew familiar with MARPOL procedures"],
    es:["Todos los registros actualizados y firmados (ORB, GRB, BDN)","DPA notificado de las no conformidades en curso","Última auditoría interna disponible y revisada","Todos los certificados ambientales vigentes (IAPP...)","Último informe de vetting revisado","Acciones correctivas cerradas","Procedimientos ambientales disponibles en el SMS","Tripulación familiarizada con los procedimientos MARPOL"],
    pt:["Todos os registos atualizados e assinados (ORB, GRB, BDN)","DPA notificado das não conformidades em curso","Última auditoria interna disponível e revista","Todos os certificados ambientais válidos (IAPP...)","Último relatório de vetting revisto","Ações corretivas fechadas","Procedimentos ambientais disponíveis no SMS","Tripulação familiarizada com os procedimentos MARPOL"],
  };
  const title = {fr:"Checklist - Préparation à la conformité",en:"Environmental Compliance Readiness Checklist",es:"Checklist - Preparación para el cumplimiento",pt:"Checklist - Preparação para a conformidade"};
  const list = items[lang]||items.fr;
  const [checked,setChecked]=useState(Array(list.length).fill(false));
  const toggle=i=>setChecked(c=>c.map((v,j)=>j===i?!v:v));
  const done=checked.filter(Boolean).length;
  return(
    <div>
      <div style={{fontSize:12,fontWeight:700,color:C.gold2,fontFamily:"'Cinzel',serif",marginBottom:10}}>✅ {title[lang]||title.fr}</div>
      {list.map((it,i)=>(
        <div key={i} onClick={()=>toggle(i)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:10,marginBottom:6,cursor:"pointer",background:checked[i]?"rgba(30,138,74,0.15)":"rgba(255,255,255,0.04)",border:`1px solid ${checked[i]?C.green:"rgba(255,255,255,0.1)"}`}}>
          <div style={{width:18,height:18,borderRadius:4,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${checked[i]?C.green:"rgba(255,255,255,0.3)"}`,background:checked[i]?C.green:"transparent",fontSize:11,color:"#fff"}}>{checked[i]?"✓":""}</div>
          <div style={{fontSize:12,color:checked[i]?C.white:C.muted,lineHeight:1.4}}>{it}</div>
        </div>
      ))}
      <div style={{marginTop:8,fontSize:11,color:C.gold2,textAlign:"right"}}>{done}/{list.length}</div>
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
function Exercise5({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:""});
  const [showC,setShowC]=useState(false);
  const correct={q1:"flag state",q2:"dpa",q3:"commerciale"};
  const qs={
    fr:[
      {id:"q1",q:"Qui exerce une responsabilité continue sur un navire tout au long de sa vie : le Port State ou le Flag State ?"},
      {id:"q2",q:"Quel acronyme désigne la personne à terre qui reçoit les non-conformités remontées par le navire ?"},
      {id:"q3",q:"Le vetting SIRE est-il une exigence légale ou commerciale ?"},
    ],
    en:[
      {id:"q1",q:"Who exercises continuous responsibility over a vessel throughout its life: the Port State or the Flag State?"},
      {id:"q2",q:"Which acronym designates the shore-based person who receives non-conformities reported from the vessel?"},
      {id:"q3",q:"Is SIRE vetting a legal or a commercial requirement?"},
    ],
    es:[
      {id:"q1",q:"¿Quién ejerce una responsabilidad continua sobre un buque durante toda su vida: el Port State o el Flag State?"},
      {id:"q2",q:"¿Qué acrónimo designa a la persona en tierra que recibe las no conformidades reportadas por el buque?"},
      {id:"q3",q:"¿El vetting SIRE es una exigencia legal o comercial?"},
    ],
    pt:[
      {id:"q1",q:"Quem exerce uma responsabilidade contínua sobre um navio durante toda a sua vida: o Port State ou o Flag State?"},
      {id:"q2",q:"Que acrónimo designa a pessoa em terra que recebe as não conformidades reportadas pelo navio?"},
      {id:"q3",q:"O vetting SIRE é uma exigência legal ou comercial?"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase();
    if(id==="q1") return v.includes("flag");
    if(id==="q2") return v==="dpa";
    if(id==="q3") return v.includes("commercial");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.green}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Flag State = continu · DPA = point de contact terre · Vetting SIRE = commercial, pas légal"
        :lang==="en"?"💡 Reminders: Flag State = continuous · DPA = shore contact point · SIRE vetting = commercial, not legal"
        :lang==="es"?"💡 Recordatorios: Flag State = continuo · DPA = punto de contacto en tierra · Vetting SIRE = comercial, no legal"
        :"💡 Lembretes: Flag State = contínuo · DPA = ponto de contacto em terra · Vetting SIRE = comercial, não legal"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:14,fontFamily:"inherit",fontWeight:600,textAlign:"left",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: le Flag State exerce une responsabilité continue, le PSC est ponctuel\n✅ Q2: DPA (Designated Person Ashore)\n✅ Q3: Commerciale - le vetting n'est pas une obligation légale mais conditionne l'accès à de nombreux contrats"
        :lang==="en"?"✅ Q1: the Flag State exercises continuous responsibility, PSC is periodic\n✅ Q2: DPA (Designated Person Ashore)\n✅ Q3: Commercial - vetting is not a legal obligation but conditions access to many contracts"
        :"✅ Q1: Flag State · Q2: DPA · Q3: Commercial"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE - "Rowan" (2007)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Perte commerciale - Affaire \"Rowan\" (2007)",teaser:"Perte des approbations Oil Majors · Cargaison vendue à perte · 3,2 millions $ de dommages réclamés · Aucune amende, aucune poursuite pénale",
      what:"En juin 2007, la societe SJB affrete le navire Rowan pour transporter une cargaison de VGO (Vacuum Gas Oil) d'Odessa, via Anvers, vers le Golfe du Mexique americain. A la suite d'une inspection de vetting realisee a Anvers, le navire perd l'ensemble de ses approbations Oil Majors (BP, Exxon, Lukoil, Statoil...). Sans ces approbations, SJB se retrouve dans l'incapacite de livrer la cargaison aux conditions prevues et doit la vendre avec une decote importante. SJB reclame 3 247 000 dollars de dommages et interets au proprietaire du navire, invoquant une clause de la charte-partie garantissant le maintien des approbations Oil Majors pendant toute la duree du contrat. L'affaire est portee devant les tribunaux anglais.",
      cause:"• Inspection de vetting a Anvers ayant revele des deficiences suffisantes pour faire perdre les approbations\n• Charte-partie contenant une clause de garantie de maintien des approbations Oil Majors\n• Aucune infraction penale ni amende - la sanction est purement commerciale\n• Impact direct sur la valeur de la cargaison, independamment de tout controle PSC",
      lessons:"✓ Une deficience detectee en vetting peut couter plus cher qu'une amende MARPOL classique\n✓ Le vetting est une exigence commerciale, pas une obligation legale - mais ses consequences sont bien reelles\n✓ Une charte-partie peut transformer un mauvais resultat de vetting en litige contractuel direct\n✓ Maintenir les approbations Oil Majors est aussi important que d'eviter une amende reglementaire\n\nLesson learned : La conformite environnementale n'est pas seulement une question d'evitement d'amendes - c'est une condition d'acces au marche commercial lui-meme."},
    en:{title:"Commercial Loss - The \"Rowan\" Case (2007)",teaser:"Loss of Oil Majors approvals · Cargo sold at a loss · $3.2 million in damages claimed · No fine, no criminal prosecution",
      what:"In June 2007, SJB chartered the vessel Rowan to carry a cargo of VGO (Vacuum Gas Oil) from Odessa, via Antwerp, to the US Gulf. Following a vetting inspection carried out in Antwerp, the vessel lost all of its Oil Majors approvals (BP, Exxon, Lukoil, Statoil...). Without these approvals, SJB was unable to deliver the cargo under the planned terms and had to sell it at a significant discount. SJB claimed damages of US$3,247,000 from the vessel owner, invoking a charterparty clause warranting the maintenance of Oil Majors approvals throughout the contract. The case went before the English courts.",
      cause:"• Vetting inspection in Antwerp revealed deficiencies sufficient to cause loss of approvals\n• Charterparty contained a warranty clause on maintaining Oil Majors approvals\n• No criminal offense or fine - the sanction was purely commercial\n• Direct impact on cargo value, independent of any PSC control",
      lessons:"✓ A deficiency detected in vetting can cost more than a standard MARPOL fine\n✓ Vetting is a commercial requirement, not a legal obligation - but its consequences are very real\n✓ A charterparty can turn a poor vetting result into a direct contractual dispute\n✓ Maintaining Oil Majors approvals matters as much as avoiding a regulatory fine\n\nLesson learned: Environmental compliance is not just about avoiding fines - it is a condition of access to the commercial market itself."},
    es:{title:"Pérdida comercial - Caso \"Rowan\" (2007)",teaser:"Pérdida de aprobaciones Oil Majors · Carga vendida con pérdidas · 3,2 millones $ de daños reclamados · Sin multa, sin proceso penal",
      what:"En junio de 2007, SJB fleto el buque Rowan para transportar una carga de VGO (Vacuum Gas Oil) desde Odessa, via Amberes, hasta el Golfo de Mexico estadounidense. Tras una inspeccion de vetting realizada en Amberes, el buque perdio todas sus aprobaciones Oil Majors (BP, Exxon, Lukoil, Statoil...). Sin estas aprobaciones, SJB no pudo entregar la carga en los terminos previstos y tuvo que venderla con un importante descuento. SJB reclamo 3.247.000 dolares en danos y perjuicios al propietario del buque, invocando una clausula de la charter-party que garantizaba el mantenimiento de las aprobaciones Oil Majors durante todo el contrato. El caso llego a los tribunales ingleses.",
      cause:"• Inspeccion de vetting en Amberes revelo deficiencias suficientes para causar la perdida de aprobaciones\n• La charter-party contenia una clausula de garantia sobre el mantenimiento de las aprobaciones Oil Majors\n• Ninguna infraccion penal ni multa - la sancion fue puramente comercial\n• Impacto directo en el valor de la carga, independiente de cualquier control PSC",
      lessons:"✓ Una deficiencia detectada en vetting puede costar mas que una multa MARPOL estandar\n✓ El vetting es una exigencia comercial, no una obligacion legal - pero sus consecuencias son muy reales\n✓ Una charter-party puede convertir un mal resultado de vetting en un litigio contractual directo\n✓ Mantener las aprobaciones Oil Majors importa tanto como evitar una multa reglamentaria\n\nLesson learned: El cumplimiento ambiental no se trata solo de evitar multas - es una condicion de acceso al propio mercado comercial."},
    pt:{title:"Perda comercial - Caso \"Rowan\" (2007)",teaser:"Perda das aprovações Oil Majors · Carga vendida com prejuízo · 3,2 milhões $ de danos reclamados · Sem multa, sem processo penal",
      what:"Em junho de 2007, a SJB afretou o navio Rowan para transportar uma carga de VGO (Vacuum Gas Oil) de Odessa, via Antuerpia, para o Golfo do Mexico americano. Apos uma inspecao de vetting realizada em Antuerpia, o navio perdeu todas as suas aprovacoes Oil Majors (BP, Exxon, Lukoil, Statoil...). Sem essas aprovacoes, a SJB ficou incapaz de entregar a carga nos termos previstos e teve que vende-la com um desconto significativo. A SJB reclamou 3.247.000 dolares em danos ao proprietario do navio, invocando uma clausula da charter-party que garantia a manutencao das aprovacoes Oil Majors durante todo o contrato. O caso foi parar nos tribunais ingleses.",
      cause:"• Inspecao de vetting em Antuerpia revelou deficiencias suficientes para causar a perda das aprovacoes\n• A charter-party continha uma clausula de garantia sobre a manutencao das aprovacoes Oil Majors\n• Nenhuma infracao penal nem multa - a sancao foi puramente comercial\n• Impacto direto no valor da carga, independente de qualquer controlo PSC",
      lessons:"✓ Uma deficiencia detetada em vetting pode custar mais do que uma multa MARPOL padrao\n✓ O vetting e uma exigencia comercial, nao uma obrigacao legal - mas suas consequencias sao bem reais\n✓ Uma charter-party pode transformar um mau resultado de vetting em um litigio contratual direto\n✓ Manter as aprovacoes Oil Majors importa tanto quanto evitar uma multa regulamentar\n\nLesson learned: A conformidade ambiental nao se trata apenas de evitar multas - e uma condicao de acesso ao proprio mercado comercial."},
  };
  const c=d[lang]||d.fr;
  return(
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
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>CAUSES</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
      </div>}
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Quelle est la différence essentielle entre PSC et Flag State ?",opts:["Aucune différence","Le PSC contrôle ponctuellement, le Flag State est responsable en continu","Le PSC est plus strict que le Flag State","Le Flag State n'existe que pour les tankers"],correct:1,expl:"Le PSC exerce un contrôle ponctuel à chaque escale, tandis que le Flag State porte une responsabilité continue tout au long de la vie du navire."},
    {q:"Que signifie l'affirmation \"la protection de l'environnement fait partie du SMS\" ?",opts:["Ce sont deux systèmes séparés","Les procédures environnementales sont intégrées au même système documentaire que la sécurité","Seul le DPA gère l'environnement","Le SMS ne couvre pas MARPOL"],correct:1,expl:"L'ISM Code intègre la protection de l'environnement dans le Safety Management System - ce n'est pas un système distinct."},
    {q:"Dans le cycle d'audit interne, que vient faire la \"Verification of effectiveness\" ?",opts:["Rien, le cycle s'arrête à l'action corrective","Vérifier lors d'un audit ultérieur que l'action corrective a réellement résolu le problème","Remplacer l'action corrective","Signaler la non-conformité aux autorités"],correct:1,expl:"Le cycle ne se termine pas à l'action corrective - il faut vérifier ultérieurement que le problème est bien résolu et ne s'est pas reproduit."},
    {q:"Le vetting SIRE est-il une obligation légale ?",opts:["Oui, comme le PSC","Non, c'est une exigence commerciale plutôt que légale","Oui, mais uniquement pour les navires de plus de 20 ans","Non, il n'a aucune conséquence"],correct:1,expl:"Contrairement au PSC, personne n'est légalement obligé de se soumettre au SIRE - mais l'accès à de nombreux contrats commerciaux en dépend."},
    {q:"Dans l'affaire \"Rowan\" (2007), quelle a été la sanction ?",opts:["Une amende pénale de plusieurs millions","Aucune amende ni poursuite pénale - une perte purement commerciale suite à la perte des approbations Oil Majors","Une détention du navire par les autorités","Une suspension du certificat IAPP"],correct:1,expl:"L'affaire Rowan n'a impliqué aucune amende ni poursuite pénale - la conséquence a été purement commerciale, via la perte des approbations Oil Majors."},
  ],
  en:[
    {q:"What is the essential difference between PSC and Flag State?",opts:["No difference","PSC checks periodically, the Flag State bears continuous responsibility","PSC is always stricter than the Flag State","Flag State only exists for tankers"],correct:1,expl:"PSC exercises a periodic check at each port call, while the Flag State bears continuous responsibility throughout the vessel's life."},
    {q:"What does the statement \"environmental protection is part of the SMS\" mean?",opts:["They are two separate systems","Environmental procedures are integrated into the same documentary system as safety","Only the DPA manages the environment","The SMS does not cover MARPOL"],correct:1,expl:"The ISM Code integrates environmental protection into the Safety Management System - it is not a separate system."},
    {q:"In the internal audit cycle, what is the role of \"Verification of effectiveness\"?",opts:["Nothing, the cycle stops at the corrective action","Verifying during a later audit that the corrective action actually resolved the problem","Replacing the corrective action","Reporting the non-conformity to authorities"],correct:1,expl:"The cycle does not end at the corrective action - a later audit must verify the problem is truly resolved and has not recurred."},
    {q:"Is SIRE vetting a legal obligation?",opts:["Yes, like PSC","No, it is a commercial requirement rather than a legal one","Yes, but only for vessels over 20 years old","No, it has no consequences"],correct:1,expl:"Unlike PSC, no one is legally required to undergo SIRE - but access to many commercial contracts depends on it."},
    {q:"In the \"Rowan\" case (2007), what was the sanction?",opts:["A criminal fine of several million","No fine or criminal prosecution - a purely commercial loss following the loss of Oil Majors approvals","A vessel detention by the authorities","A suspension of the IAPP certificate"],correct:1,expl:"The Rowan case involved no fine or criminal prosecution - the consequence was purely commercial, through the loss of Oil Majors approvals."},
  ],
  es:[
    {q:"¿Cuál es la diferencia esencial entre PSC y Flag State?",opts:["Ninguna diferencia","El PSC controla puntualmente, el Flag State tiene responsabilidad continua","El PSC siempre es más estricto que el Flag State","El Flag State solo existe para los tanqueros"],correct:1,expl:"El PSC ejerce un control puntual en cada escala, mientras que el Flag State tiene una responsabilidad continua durante toda la vida del buque."},
    {q:"¿Qué significa la afirmación \"la protección ambiental forma parte del SMS\"?",opts:["Son dos sistemas separados","Los procedimientos ambientales están integrados en el mismo sistema documental que la seguridad","Solo el DPA gestiona el medio ambiente","El SMS no cubre MARPOL"],correct:1,expl:"El Código ISM integra la protección ambiental en el Safety Management System - no es un sistema separado."},
    {q:"En el ciclo de auditoría interna, ¿qué papel cumple la \"Verificación de eficacia\"?",opts:["Nada, el ciclo termina en la acción correctiva","Verificar en una auditoría posterior que la acción correctiva realmente resolvió el problema","Sustituir la acción correctiva","Reportar la no conformidad a las autoridades"],correct:1,expl:"El ciclo no termina en la acción correctiva - una auditoría posterior debe verificar que el problema se resolvió realmente y no se ha repetido."},
    {q:"¿El vetting SIRE es una obligación legal?",opts:["Sí, como el PSC","No, es una exigencia comercial más que legal","Sí, pero solo para buques de más de 20 años","No, no tiene ninguna consecuencia"],correct:1,expl:"A diferencia del PSC, nadie está legalmente obligado a someterse al SIRE - pero el acceso a muchos contratos comerciales depende de ello."},
    {q:"En el caso \"Rowan\" (2007), ¿cuál fue la sanción?",opts:["Una multa penal de varios millones","Ninguna multa ni proceso penal - una pérdida puramente comercial tras la pérdida de las aprobaciones Oil Majors","Una detención del buque por las autoridades","Una suspensión del certificado IAPP"],correct:1,expl:"El caso Rowan no implicó ninguna multa ni proceso penal - la consecuencia fue puramente comercial, a través de la pérdida de las aprobaciones Oil Majors."},
  ],
  pt:[
    {q:"Qual é a diferença essencial entre PSC e Flag State?",opts:["Nenhuma diferença","O PSC controla pontualmente, o Flag State tem responsabilidade contínua","O PSC é sempre mais rigoroso que o Flag State","O Flag State só existe para petroleiros"],correct:1,expl:"O PSC exerce um controlo pontual em cada escala, enquanto o Flag State tem uma responsabilidade contínua durante toda a vida do navio."},
    {q:"O que significa a afirmação \"a proteção ambiental faz parte do SMS\"?",opts:["São dois sistemas separados","Os procedimentos ambientais estão integrados no mesmo sistema documental que a segurança","Só o DPA gerencia o ambiente","O SMS não cobre o MARPOL"],correct:1,expl:"O Código ISM integra a proteção ambiental no Safety Management System - não é um sistema separado."},
    {q:"No ciclo de auditoria interna, qual é o papel da \"Verificação de eficácia\"?",opts:["Nada, o ciclo termina na ação corretiva","Verificar numa auditoria posterior que a ação corretiva realmente resolveu o problema","Substituir a ação corretiva","Reportar a não conformidade às autoridades"],correct:1,expl:"O ciclo não termina na ação corretiva - uma auditoria posterior deve verificar que o problema foi realmente resolvido e não se repetiu."},
    {q:"O vetting SIRE é uma obrigação legal?",opts:["Sim, como o PSC","Não, é uma exigência comercial em vez de legal","Sim, mas apenas para navios com mais de 20 anos","Não, não tem nenhuma consequência"],correct:1,expl:"Ao contrário do PSC, ninguém é legalmente obrigado a submeter-se ao SIRE - mas o acesso a muitos contratos comerciais depende disso."},
    {q:"No caso \"Rowan\" (2007), qual foi a sanção?",opts:["Uma multa penal de vários milhões","Nenhuma multa ou processo penal - uma perda puramente comercial após a perda das aprovações Oil Majors","Uma detenção do navio pelas autoridades","Uma suspensão do certificado IAPP"],correct:1,expl:"O caso Rowan não envolveu nenhuma multa nem processo penal - a consequência foi puramente comercial, através da perda das aprovações Oil Majors."},
  ],
};

const BANK = {
  fr:[
    {q:"Qui délivre les certificats environnementaux d'un navire (IAPP, etc.) ?",opts:["Le Port State Control","Le Flag State (administration du pavillon)","L'OCIMF","Le DPA"],correct:1,expl:"Les certificats environnementaux sont délivrés par l'administration du pavillon (Flag State), pas par le PSC."},
    {q:"Un navire peut-il échouer une inspection PSC même avec un pavillon reconnu comme rigoureux ?",opts:["Non, jamais","Oui, le PSC vérifie ponctuellement l'état réel du navire, indépendamment de la réputation du pavillon","Non, sauf en cas de fraude","Oui, mais uniquement pour les tankers"],correct:1,expl:"Le PSC et le Flag State sont deux niveaux complémentaires ; un pavillon rigoureux ne garantit pas l'absence de déficiences ponctuelles."},
    {q:"Que signifie DPA ?",opts:["Deck Personnel Authority","Designated Person Ashore","Department Pollution Analyst","Direct Port Authority"],correct:1,expl:"DPA = Designated Person Ashore, le point de contact à terre exigé par le Code ISM."},
    {q:"Le DPA a-t-il un accès direct à la direction générale de la compagnie ?",opts:["Non, il doit passer par plusieurs échelons","Oui, sans filtre hiérarchique, c'est une exigence du Code ISM","Non, il ne communique qu'avec le capitaine","Oui, mais uniquement une fois par an"],correct:1,expl:"Le Code ISM exige que le DPA ait un accès direct à la direction générale, sans filtre hiérarchique."},
    {q:"Quelle est la première étape du cycle d'audit interne ?",opts:["Corrective Action","Observation","Verification of effectiveness","Non-conformity"],correct:1,expl:"Le cycle commence par l'Observation - un simple constat, avant qu'il ne soit qualifié de non-conformité."},
    {q:"À quel moment un écart devient-il une \"non-conformité\" formelle ?",opts:["Dès qu'il est observé","Lorsqu'il représente un manquement à une exigence réglementaire ou procédurale du SMS","Uniquement après une inspection PSC","Jamais formellement"],correct:1,expl:"Un écart devient une non-conformité formelle lorsqu'il constitue un manquement documenté à une exigence du SMS."},
    {q:"Le cycle d'audit s'arrête-t-il une fois l'action corrective mise en place ?",opts:["Oui, c'est la dernière étape","Non, il faut encore vérifier l'efficacité de l'action lors d'un audit ultérieur","Oui, sauf en cas de récidive","Non, il faut recommencer tout l'audit"],correct:1,expl:"La Verification of effectiveness est une étape distincte et indispensable après la Corrective Action."},
    {q:"Qu'est-ce que le programme SIRE ?",opts:["Un programme de formation des officiers","Une base de données partagée d'inspections de navires-citernes gérée par l'OCIMF","Un certificat délivré par le Flag State","Un type d'audit interne"],correct:1,expl:"SIRE (Ship Inspection Report Programme) est géré par l'OCIMF et rassemble les inspections de navires-citernes."},
    {q:"Qui utilise principalement les rapports SIRE pour prendre leurs décisions ?",opts:["Les autorités portuaires","Les compagnies pétrolières et chimiques pour décider d'affréter un navire","Les syndicats de marins","Les assureurs uniquement"],correct:1,expl:"Les compagnies pétrolières et chimiques consultent les rapports SIRE pour décider d'affréter ou non un navire."},
    {q:"Que risque un navire ayant reçu une observation de catégorie \"Immediate\" lors d'une inspection SIRE ?",opts:["Rien de particulier","Voir son accès aux affrètements premium fermé jusqu'à correction vérifiée","Une amende automatique de l'OCIMF","La révocation de son certificat IAPP"],correct:1,expl:"Une observation \"Immediate\" ferme généralement l'accès aux affrètements premium jusqu'à ce que la correction soit vérifiée."},
    {q:"Le vetting concerne-t-il uniquement les aspects environnementaux d'un navire ?",opts:["Oui, uniquement l'environnement","Non, il couvre aussi la sécurité, les procédures opérationnelles et l'état matériel","Oui, mais uniquement sur les tankers chimiques","Non, il ne concerne que la cargaison"],correct:1,expl:"Le vetting SIRE évalue l'ensemble des standards opérationnels et de sécurité du navire, pas seulement l'environnement."},
    {q:"Dans l'affaire Rowan (2007), quelle clause contractuelle a été centrale au litige ?",opts:["Une clause de vitesse minimale","Une clause de garantie du maintien des approbations Oil Majors pendant la charte-partie","Une clause de partage des bénéfices","Une clause de sécurité incendie"],correct:1,expl:"Le litige portait sur une clause de la charte-partie garantissant le maintien des approbations Oil Majors pendant toute la durée du contrat."},
    {q:"Pourquoi SJB a-t-il dû vendre sa cargaison à perte dans l'affaire Rowan ?",opts:["À cause d'une avarie de cargaison","Parce que le navire avait perdu ses approbations Oil Majors après l'inspection de vetting","À cause d'une grève portuaire","Parce que le carburant était non conforme"],correct:1,expl:"La perte des approbations Oil Majors a empêché SJB de livrer la cargaison aux conditions prévues, l'obligeant à la vendre à perte."},
    {q:"Quel montant de dommages SJB a-t-il réclamé dans l'affaire Rowan ?",opts:["275 000 $","1,5 million $","3 247 000 $","40 millions $"],correct:2,expl:"SJB a réclamé 3 247 000 dollars de dommages et intérêts au propriétaire du navire."},
    {q:"Quelle compétence un officier machine doit-il retenir de cette leçon ?",opts:["Savoir uniquement éviter les amendes PSC","Savoir maintenir la conformité environnementale tout au long de l'exploitation du navire, pas seulement lors d'une inspection","Savoir remplir uniquement l'Oil Record Book","Savoir négocier une charte-partie"],correct:1,expl:"Cette leçon vise à faire comprendre que la conformité est un système continu, pas un événement ponctuel lié à une seule inspection."},
  ],
  en:[
    {q:"Who issues a vessel's environmental certificates (IAPP, etc.)?",opts:["Port State Control","The Flag State (flag administration)","OCIMF","The DPA"],correct:1,expl:"Environmental certificates are issued by the flag administration (Flag State), not by PSC."},
    {q:"Can a vessel fail a PSC inspection even with a flag recognized as rigorous?",opts:["No, never","Yes, PSC checks the actual state of the vessel periodically, regardless of the flag's reputation","No, except in case of fraud","Yes, but only for tankers"],correct:1,expl:"PSC and Flag State are two complementary levels; a rigorous flag does not guarantee the absence of periodic deficiencies."},
    {q:"What does DPA stand for?",opts:["Deck Personnel Authority","Designated Person Ashore","Department Pollution Analyst","Direct Port Authority"],correct:1,expl:"DPA = Designated Person Ashore, the shore-based contact point required by the ISM Code."},
    {q:"Does the DPA have direct access to the company's top management?",opts:["No, they must go through several levels","Yes, without hierarchical filtering, as required by the ISM Code","No, they only communicate with the Master","Yes, but only once a year"],correct:1,expl:"The ISM Code requires the DPA to have direct access to top management, without hierarchical filtering."},
    {q:"What is the first step of the internal audit cycle?",opts:["Corrective Action","Observation","Verification of effectiveness","Non-conformity"],correct:1,expl:"The cycle starts with Observation - a simple finding, before it is classified as a non-conformity."},
    {q:"At what point does a gap become a formal \"non-conformity\"?",opts:["As soon as it is observed","When it represents a failure to meet a regulatory or procedural SMS requirement","Only after a PSC inspection","Never formally"],correct:1,expl:"A gap becomes a formal non-conformity when it constitutes a documented failure to meet an SMS requirement."},
    {q:"Does the audit cycle stop once the corrective action is implemented?",opts:["Yes, it is the last step","No, the effectiveness of the action must still be verified during a later audit","Yes, unless it recurs","No, the whole audit must restart"],correct:1,expl:"Verification of effectiveness is a distinct and essential step after the Corrective Action."},
    {q:"What is the SIRE programme?",opts:["An officer training programme","A shared database of tanker inspections managed by OCIMF","A certificate issued by the Flag State","A type of internal audit"],correct:1,expl:"SIRE (Ship Inspection Report Programme) is managed by OCIMF and gathers tanker inspections."},
    {q:"Who mainly uses SIRE reports to make their decisions?",opts:["Port authorities","Oil and chemical companies deciding whether to charter a vessel","Seafarer unions","Insurers only"],correct:1,expl:"Oil and chemical companies consult SIRE reports to decide whether to charter a vessel."},
    {q:"What does a vessel risk after receiving an \"Immediate\" category observation in a SIRE inspection?",opts:["Nothing in particular","Having its access to premium charters closed until verified correction","An automatic fine from OCIMF","Revocation of its IAPP certificate"],correct:1,expl:"An \"Immediate\" observation generally closes access to premium charters until the correction is verified."},
    {q:"Does vetting only concern a vessel's environmental aspects?",opts:["Yes, only the environment","No, it also covers safety, operational procedures and material condition","Yes, but only on chemical tankers","No, it only concerns cargo"],correct:1,expl:"SIRE vetting assesses the vessel's overall operational and safety standards, not only the environment."},
    {q:"In the Rowan case (2007), which contractual clause was central to the dispute?",opts:["A minimum speed clause","A warranty clause on maintaining Oil Majors approvals during the charterparty","A profit-sharing clause","A fire safety clause"],correct:1,expl:"The dispute centered on a charterparty clause warranting the maintenance of Oil Majors approvals throughout the contract."},
    {q:"Why did SJB have to sell its cargo at a loss in the Rowan case?",opts:["Due to cargo damage","Because the vessel lost its Oil Majors approvals after the vetting inspection","Due to a port strike","Because the fuel was non-compliant"],correct:1,expl:"The loss of Oil Majors approvals prevented SJB from delivering the cargo under the planned terms, forcing a sale at a loss."},
    {q:"How much in damages did SJB claim in the Rowan case?",opts:["$275,000","$1.5 million","$3,247,000","$40 million"],correct:2,expl:"SJB claimed US$3,247,000 in damages from the vessel owner."},
    {q:"What skill should an engine officer take away from this lesson?",opts:["Only knowing how to avoid PSC fines","Knowing how to maintain environmental compliance throughout the ship's operation, not only during an inspection","Only knowing how to fill out the Oil Record Book","Knowing how to negotiate a charterparty"],correct:1,expl:"This lesson aims to show that compliance is a continuous system, not a one-off event tied to a single inspection."},
  ],
  es:[
    {q:"¿Quién emite los certificados ambientales de un buque (IAPP, etc.)?",opts:["El Port State Control","El Flag State (administración del pabellón)","La OCIMF","El DPA"],correct:1,expl:"Los certificados ambientales son emitidos por la administración del pabellón (Flag State), no por el PSC."},
    {q:"¿Puede un buque fallar una inspección PSC aunque tenga un pabellón reconocido como riguroso?",opts:["No, nunca","Sí, el PSC verifica puntualmente el estado real del buque, independientemente de la reputación del pabellón","No, salvo en caso de fraude","Sí, pero solo para tanqueros"],correct:1,expl:"El PSC y el Flag State son dos niveles complementarios; un pabellón riguroso no garantiza la ausencia de deficiencias puntuales."},
    {q:"¿Qué significa DPA?",opts:["Deck Personnel Authority","Designated Person Ashore","Department Pollution Analyst","Direct Port Authority"],correct:1,expl:"DPA = Designated Person Ashore, el punto de contacto en tierra exigido por el Código ISM."},
    {q:"¿El DPA tiene acceso directo a la alta dirección de la compañía?",opts:["No, debe pasar por varios niveles","Sí, sin filtro jerárquico, según exige el Código ISM","No, solo se comunica con el Capitán","Sí, pero solo una vez al año"],correct:1,expl:"El Código ISM exige que el DPA tenga acceso directo a la alta dirección, sin filtro jerárquico."},
    {q:"¿Cuál es la primera etapa del ciclo de auditoría interna?",opts:["Acción correctiva","Observación","Verificación de eficacia","No conformidad"],correct:1,expl:"El ciclo comienza con la Observación - una simple constatación, antes de ser clasificada como no conformidad."},
    {q:"¿En qué momento una brecha se convierte en una \"no conformidad\" formal?",opts:["En cuanto se observa","Cuando representa un incumplimiento de un requisito reglamentario o procedimental del SMS","Solo tras una inspección PSC","Nunca formalmente"],correct:1,expl:"Una brecha se convierte en no conformidad formal cuando constituye un incumplimiento documentado de un requisito del SMS."},
    {q:"¿El ciclo de auditoría se detiene una vez implementada la acción correctiva?",opts:["Sí, es la última etapa","No, todavía hay que verificar la eficacia de la acción en una auditoría posterior","Sí, salvo en caso de reincidencia","No, hay que reiniciar toda la auditoría"],correct:1,expl:"La Verificación de eficacia es una etapa distinta e indispensable después de la Acción correctiva."},
    {q:"¿Qué es el programa SIRE?",opts:["Un programa de formación de oficiales","Una base de datos compartida de inspecciones de buques tanque gestionada por la OCIMF","Un certificado emitido por el Flag State","Un tipo de auditoría interna"],correct:1,expl:"SIRE (Ship Inspection Report Programme) es gestionado por la OCIMF y reúne las inspecciones de buques tanque."},
    {q:"¿Quién usa principalmente los informes SIRE para tomar sus decisiones?",opts:["Las autoridades portuarias","Las compañías petroleras y químicas para decidir si fletan un buque","Los sindicatos de marinos","Solo las aseguradoras"],correct:1,expl:"Las compañías petroleras y químicas consultan los informes SIRE para decidir si fletan un buque."},
    {q:"¿Qué riesgo corre un buque que recibió una observación de categoría \"Immediate\" en una inspección SIRE?",opts:["Nada en particular","Ver cerrado su acceso a fletamentos premium hasta que se verifique la corrección","Una multa automática de la OCIMF","La revocación de su certificado IAPP"],correct:1,expl:"Una observación \"Immediate\" generalmente cierra el acceso a fletamentos premium hasta que se verifique la corrección."},
    {q:"¿El vetting concierne solo a los aspectos ambientales de un buque?",opts:["Sí, solo el medio ambiente","No, también cubre la seguridad, los procedimientos operativos y el estado material","Sí, pero solo en tanqueros químicos","No, solo concierne a la carga"],correct:1,expl:"El vetting SIRE evalúa el conjunto de estándares operativos y de seguridad del buque, no solo el medio ambiente."},
    {q:"En el caso Rowan (2007), ¿qué cláusula contractual fue central en el litigio?",opts:["Una cláusula de velocidad mínima","Una cláusula de garantía sobre el mantenimiento de las aprobaciones Oil Majors durante la charter-party","Una cláusula de reparto de beneficios","Una cláusula de seguridad contra incendios"],correct:1,expl:"El litigio giró en torno a una cláusula de la charter-party que garantizaba el mantenimiento de las aprobaciones Oil Majors durante todo el contrato."},
    {q:"¿Por qué SJB tuvo que vender su carga con pérdidas en el caso Rowan?",opts:["Por daños en la carga","Porque el buque perdió sus aprobaciones Oil Majors tras la inspección de vetting","Por una huelga portuaria","Porque el combustible no era conforme"],correct:1,expl:"La pérdida de las aprobaciones Oil Majors impidió a SJB entregar la carga en los términos previstos, obligándola a venderla con pérdidas."},
    {q:"¿Qué monto de daños reclamó SJB en el caso Rowan?",opts:["275.000 $","1,5 millones $","3.247.000 $","40 millones $"],correct:2,expl:"SJB reclamó 3.247.000 dólares en daños y perjuicios al propietario del buque."},
    {q:"¿Qué competencia debe llevarse un oficial de máquinas de esta lección?",opts:["Solo saber evitar las multas PSC","Saber mantener el cumplimiento ambiental durante toda la operación del buque, no solo durante una inspección","Solo saber completar el Oil Record Book","Saber negociar una charter-party"],correct:1,expl:"Esta lección busca que se comprenda que el cumplimiento es un sistema continuo, no un evento puntual ligado a una única inspección."},
  ],
  pt:[
    {q:"Quem emite os certificados ambientais de um navio (IAPP, etc.)?",opts:["O Port State Control","O Flag State (administração da bandeira)","A OCIMF","O DPA"],correct:1,expl:"Os certificados ambientais são emitidos pela administração da bandeira (Flag State), não pelo PSC."},
    {q:"Um navio pode falhar numa inspeção PSC mesmo com uma bandeira reconhecida como rigorosa?",opts:["Não, nunca","Sim, o PSC verifica pontualmente o estado real do navio, independentemente da reputação da bandeira","Não, exceto em caso de fraude","Sim, mas apenas para petroleiros"],correct:1,expl:"O PSC e o Flag State são dois níveis complementares; uma bandeira rigorosa não garante a ausência de deficiências pontuais."},
    {q:"O que significa DPA?",opts:["Deck Personnel Authority","Designated Person Ashore","Department Pollution Analyst","Direct Port Authority"],correct:1,expl:"DPA = Designated Person Ashore, o ponto de contacto em terra exigido pelo Código ISM."},
    {q:"O DPA tem acesso direto à alta direção da empresa?",opts:["Não, deve passar por vários níveis","Sim, sem filtro hierárquico, conforme exige o Código ISM","Não, só comunica com o Comandante","Sim, mas apenas uma vez por ano"],correct:1,expl:"O Código ISM exige que o DPA tenha acesso direto à alta direção, sem filtro hierárquico."},
    {q:"Qual é a primeira etapa do ciclo de auditoria interna?",opts:["Ação corretiva","Observação","Verificação de eficácia","Não conformidade"],correct:1,expl:"O ciclo começa com a Observação - uma simples constatação, antes de ser classificada como não conformidade."},
    {q:"Em que momento uma lacuna se torna uma \"não conformidade\" formal?",opts:["Assim que é observada","Quando representa um incumprimento de um requisito regulamentar ou procedimental do SMS","Apenas após uma inspeção PSC","Nunca formalmente"],correct:1,expl:"Uma lacuna torna-se não conformidade formal quando constitui um incumprimento documentado de um requisito do SMS."},
    {q:"O ciclo de auditoria para assim que a ação corretiva é implementada?",opts:["Sim, é a última etapa","Não, ainda é preciso verificar a eficácia da ação numa auditoria posterior","Sim, exceto em caso de reincidência","Não, é preciso recomeçar toda a auditoria"],correct:1,expl:"A Verificação de eficácia é uma etapa distinta e indispensável após a Ação corretiva."},
    {q:"O que é o programa SIRE?",opts:["Um programa de formação de oficiais","Uma base de dados partilhada de inspeções de navios-tanque gerida pela OCIMF","Um certificado emitido pelo Flag State","Um tipo de auditoria interna"],correct:1,expl:"O SIRE (Ship Inspection Report Programme) é gerido pela OCIMF e reúne as inspeções de navios-tanque."},
    {q:"Quem usa principalmente os relatórios SIRE para tomar suas decisões?",opts:["As autoridades portuárias","As empresas petrolíferas e químicas para decidir se afretam um navio","Os sindicatos de marinheiros","Apenas as seguradoras"],correct:1,expl:"As empresas petrolíferas e químicas consultam os relatórios SIRE para decidir se afretam um navio."},
    {q:"Que risco corre um navio que recebeu uma observação de categoria \"Immediate\" numa inspeção SIRE?",opts:["Nada em particular","Ver seu acesso a afretamentos premium fechado até a correção ser verificada","Uma multa automática da OCIMF","A revogação do seu certificado IAPP"],correct:1,expl:"Uma observação \"Immediate\" geralmente fecha o acesso a afretamentos premium até a correção ser verificada."},
    {q:"O vetting diz respeito apenas aos aspetos ambientais de um navio?",opts:["Sim, apenas ao ambiente","Não, também cobre a segurança, os procedimentos operacionais e o estado material","Sim, mas apenas em petroleiros químicos","Não, diz respeito apenas à carga"],correct:1,expl:"O vetting SIRE avalia o conjunto de padrões operacionais e de segurança do navio, não apenas o ambiente."},
    {q:"No caso Rowan (2007), qual cláusula contratual foi central no litígio?",opts:["Uma cláusula de velocidade mínima","Uma cláusula de garantia sobre a manutenção das aprovações Oil Majors durante a charter-party","Uma cláusula de partilha de lucros","Uma cláusula de segurança contra incêndio"],correct:1,expl:"O litígio centrou-se numa cláusula da charter-party que garantia a manutenção das aprovações Oil Majors durante todo o contrato."},
    {q:"Por que a SJB teve que vender sua carga com prejuízo no caso Rowan?",opts:["Devido a danos na carga","Porque o navio perdeu suas aprovações Oil Majors após a inspeção de vetting","Devido a uma greve portuária","Porque o combustível não era conforme"],correct:1,expl:"A perda das aprovações Oil Majors impediu a SJB de entregar a carga nos termos previstos, obrigando-a a vendê-la com prejuízo."},
    {q:"Qual valor de danos a SJB reclamou no caso Rowan?",opts:["275.000 $","1,5 milhões $","3.247.000 $","40 milhões $"],correct:2,expl:"A SJB reclamou 3.247.000 dólares em danos ao proprietário do navio."},
    {q:"Que competência um oficial de máquinas deve levar desta lição?",opts:["Apenas saber evitar multas PSC","Saber manter a conformidade ambiental durante toda a operação do navio, não apenas durante uma inspeção","Apenas saber preencher o Oil Record Book","Saber negociar uma charter-party"],correct:1,expl:"Esta lição visa mostrar que a conformidade é um sistema contínuo, não um evento pontual ligado a uma única inspeção."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.green},${C.gold2})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<div><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.green},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":"FINISH")}</button></div>}
    </div>
  );
}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.green}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.green,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.green:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d = {
    fr:{
      badge:"🧭 Module Machine · Leçon 5/6 · ⭐ Premium · 200 XP",
      title:"Conformité environnementale à bord",
      intro:"Les Leçons 2 à 4 ont couvert le contenu réglementaire - quoi faire pour chaque annexe MARPOL. Cette leçon change de perspective : elle couvre le système de vérification - qui contrôle, comment la compagnie s'organise en interne, et comment rester conforme en continu, pas seulement le jour d'une inspection.",
      p1:"PARTIE 1 - PORT STATE CONTROL vs FLAG STATE",
      s1:"Deux niveaux de contrôle bien distincts, souvent confondus par les jeunes marins - comprendre leur complémentarité est la base de cette leçon.",
      p2:"PARTIE 2 - ISM CODE & CONFORMITÉ ENVIRONNEMENTALE",
      s2:"Le Code ISM structure la gestion de la sécurité et de l'environnement au sein d'un seul et même système, avec un point de contact clairement identifié à terre.",
      p3:"PARTIE 3 - AUDIT INTERNE",
      s3:"Un audit interne bien mené permet de détecter une non-conformité avant qu'un inspecteur externe ne la trouve - le cycle complet compte autant que la détection initiale.",
      p4:"PARTIE 4 - VETTING (SIRE)",
      s4:"Le vetting est souvent confondu avec le PSC. Cette section clarifie sa nature réellement commerciale et ses conséquences bien réelles.",
      p5:"PARTIE 5 - EXERCICE",
      p6:"PARTIE 6 - CAS RÉEL",
      p7:"PARTIE 7 - BANQUE DE QUESTIONS",
      transitionPhrase:"Une non-conformité qui coûte le plus cher n'est pas toujours celle qui déclenche une amende - c'est parfois celle qui ferme l'accès à un marché commercial entier.",
      closingPhrase:"La véritable conformité environnementale se construit chaque jour, par la discipline, la transparence et le travail d'équipe. Chaque membre d'équipage contribue à protéger à la fois le navire et la réputation de la compagnie.",
      sumT:"POINTS CLÉS",
      sumP:[
        "Le PSC contrôle ponctuellement, le Flag State porte une responsabilité continue",
        "La protection environnementale fait partie du SMS, ce n'est pas un système séparé",
        "Le DPA reçoit les non-conformités remontées de bord, avec un accès direct à la direction",
        "Le cycle d'audit ne s'arrête pas à l'action corrective - il faut vérifier son efficacité",
        "Le vetting SIRE est une exigence commerciale, pas une obligation légale",
        "Une mauvaise conformité peut fermer l'accès au marché commercial, indépendamment de toute amende",
      ],
      learnedP:[
        "Distinguer les rôles de Port State Control et de Flag State",
        "Comprendre l'intégration de l'environnement dans le SMS et le rôle du DPA",
        "Appliquer le cycle complet de l'audit interne",
        "Comprendre le vetting SIRE et sa nature commerciale",
        "Je sais maintenir la conformité environnementale tout au long de l'exploitation du navire",
      ],
    },
    en:{
      badge:"🧭 Engine Module · Lesson 5/6 · ⭐ Premium · 200 XP",
      title:"Environmental Compliance Onboard",
      intro:"Lessons 2 to 4 covered the regulatory content - what to do for each MARPOL annex. This lesson shifts perspective: it covers the verification system - who checks, how the company organizes internally, and how to remain compliant continuously, not just on inspection day.",
      p1:"PART 1 - PORT STATE CONTROL vs FLAG STATE",
      s1:"Two clearly distinct levels of control, often confused by young seafarers - understanding their complementarity is the foundation of this lesson.",
      p2:"PART 2 - ISM CODE & ENVIRONMENTAL COMPLIANCE",
      s2:"The ISM Code structures safety and environmental management within one single system, with a clearly identified shore contact point.",
      p3:"PART 3 - INTERNAL AUDIT",
      s3:"A well-conducted internal audit detects a non-conformity before an external inspector finds it - the full cycle matters as much as the initial detection.",
      p4:"PART 4 - VETTING (SIRE)",
      s4:"Vetting is often confused with PSC. This section clarifies its truly commercial nature and its very real consequences.",
      p5:"PART 5 - EXERCISE",
      p6:"PART 6 - REAL CASE",
      p7:"PART 7 - QUESTION BANK",
      transitionPhrase:"The most costly non-conformity is not always the one that triggers a fine - sometimes it is the one that closes access to an entire commercial market.",
      closingPhrase:"True environmental compliance is built every day through discipline, transparency and teamwork. Every crew member contributes to protecting both the ship and the company's reputation.",
      sumT:"KEY POINTS",
      sumP:[
        "PSC checks periodically, the Flag State bears continuous responsibility",
        "Environmental protection is part of the SMS, not a separate system",
        "The DPA receives non-conformities reported from on board, with direct access to management",
        "The audit cycle does not stop at the corrective action - its effectiveness must be verified",
        "SIRE vetting is a commercial requirement, not a legal obligation",
        "Poor compliance can close access to the commercial market, regardless of any fine",
      ],
      learnedP:[
        "Distinguish the roles of Port State Control and Flag State",
        "Understand the integration of environment into the SMS and the DPA's role",
        "Apply the full internal audit cycle",
        "Understand SIRE vetting and its commercial nature",
        "I know how to maintain environmental compliance throughout the ship's operation",
      ],
    },
    es:{
      badge:"🧭 Módulo Máquinas · Lección 5/6 · ⭐ Premium · 200 XP",
      title:"Cumplimiento ambiental a bordo",
      intro:"Las Lecciones 2 a 4 cubrieron el contenido reglamentario - qué hacer para cada anexo MARPOL. Esta lección cambia de perspectiva: cubre el sistema de verificación - quién controla, cómo se organiza la compañía internamente, y cómo mantenerse conforme de manera continua, no solo el día de una inspección.",
      p1:"PARTE 1 - PORT STATE CONTROL vs FLAG STATE",
      s1:"Dos niveles de control claramente distintos, a menudo confundidos por los marinos jóvenes - comprender su complementariedad es la base de esta lección.",
      p2:"PARTE 2 - CÓDIGO ISM Y CUMPLIMIENTO AMBIENTAL",
      s2:"El Código ISM estructura la gestión de la seguridad y el medio ambiente dentro de un único sistema, con un punto de contacto en tierra claramente identificado.",
      p3:"PARTE 3 - AUDITORÍA INTERNA",
      s3:"Una auditoría interna bien realizada detecta una no conformidad antes de que un inspector externo la encuentre - el ciclo completo importa tanto como la detección inicial.",
      p4:"PARTE 4 - VETTING (SIRE)",
      s4:"El vetting a menudo se confunde con el PSC. Esta sección aclara su naturaleza realmente comercial y sus consecuencias muy reales.",
      p5:"PARTE 5 - EJERCICIO",
      p6:"PARTE 6 - CASO REAL",
      p7:"PARTE 7 - BANCO DE PREGUNTAS",
      transitionPhrase:"La no conformidad más costosa no siempre es la que desencadena una multa - a veces es la que cierra el acceso a todo un mercado comercial.",
      closingPhrase:"El verdadero cumplimiento ambiental se construye cada día mediante la disciplina, la transparencia y el trabajo en equipo. Cada tripulante contribuye a proteger tanto el buque como la reputación de la compañía.",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "El PSC controla puntualmente, el Flag State tiene una responsabilidad continua",
        "La protección ambiental forma parte del SMS, no es un sistema separado",
        "El DPA recibe las no conformidades reportadas desde a bordo, con acceso directo a la dirección",
        "El ciclo de auditoría no termina en la acción correctiva - hay que verificar su eficacia",
        "El vetting SIRE es una exigencia comercial, no una obligación legal",
        "Un mal cumplimiento puede cerrar el acceso al mercado comercial, independientemente de cualquier multa",
      ],
      learnedP:[
        "Distinguir los roles del Port State Control y el Flag State",
        "Comprender la integración del medio ambiente en el SMS y el rol del DPA",
        "Aplicar el ciclo completo de la auditoría interna",
        "Comprender el vetting SIRE y su naturaleza comercial",
        "Sé cómo mantener el cumplimiento ambiental durante toda la operación del buque",
      ],
    },
    pt:{
      badge:"🧭 Módulo Máquinas · Lição 5/6 · ⭐ Premium · 200 XP",
      title:"Conformidade ambiental a bordo",
      intro:"As Lições 2 a 4 cobriram o conteúdo regulamentar - o que fazer para cada anexo MARPOL. Esta lição muda de perspectiva: cobre o sistema de verificação - quem controla, como a empresa se organiza internamente, e como permanecer conforme continuamente, não apenas no dia de uma inspeção.",
      p1:"PARTE 1 - PORT STATE CONTROL vs FLAG STATE",
      s1:"Dois níveis de controlo claramente distintos, frequentemente confundidos pelos marinheiros jovens - compreender sua complementaridade é a base desta lição.",
      p2:"PARTE 2 - CÓDIGO ISM E CONFORMIDADE AMBIENTAL",
      s2:"O Código ISM estrutura a gestão da segurança e do ambiente dentro de um único sistema, com um ponto de contacto em terra claramente identificado.",
      p3:"PARTE 3 - AUDITORIA INTERNA",
      s3:"Uma auditoria interna bem conduzida deteta uma não conformidade antes que um inspetor externo a encontre - o ciclo completo importa tanto quanto a deteção inicial.",
      p4:"PARTE 4 - VETTING (SIRE)",
      s4:"O vetting é frequentemente confundido com o PSC. Esta secção esclarece sua natureza verdadeiramente comercial e suas consequências bem reais.",
      p5:"PARTE 5 - EXERCÍCIO",
      p6:"PARTE 6 - CASO REAL",
      p7:"PARTE 7 - BANCO DE QUESTÕES",
      transitionPhrase:"A não conformidade mais cara nem sempre é aquela que desencadeia uma multa - às vezes é aquela que fecha o acesso a todo um mercado comercial.",
      closingPhrase:"A verdadeira conformidade ambiental é construída todos os dias através da disciplina, da transparência e do trabalho em equipa. Cada membro da tripulação contribui para proteger tanto o navio quanto a reputação da empresa.",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "O PSC controla pontualmente, o Flag State tem uma responsabilidade contínua",
        "A proteção ambiental faz parte do SMS, não é um sistema separado",
        "O DPA recebe as não conformidades reportadas de bordo, com acesso direto à direção",
        "O ciclo de auditoria não termina na ação corretiva - é preciso verificar sua eficácia",
        "O vetting SIRE é uma exigência comercial, não uma obrigação legal",
        "Uma má conformidade pode fechar o acesso ao mercado comercial, independentemente de qualquer multa",
      ],
      learnedP:[
        "Distinguir os papéis do Port State Control e do Flag State",
        "Compreender a integração do ambiente no SMS e o papel do DPA",
        "Aplicar o ciclo completo da auditoria interna",
        "Compreender o vetting SIRE e sua natureza comercial",
        "Sei manter a conformidade ambiental durante toda a operação do navio",
      ],
    },
  };
  return d[lang] || d.fr;
};

export default function LessonMARPOL_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#031a0a 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.green}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.green,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🧭 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 5/6":lang==="en"?"Lesson 5/6":lang==="es"?"Lección 5/6":"Lição 5/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.green,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.green},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<div>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}44`,fontSize:11,color:C.green,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.green}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="⚓" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚓ {lang==="fr"?"PSC vs FLAG STATE - INTERACTIF":lang==="en"?"PSC vs FLAG STATE - INTERACTIVE":lang==="es"?"PSC vs FLAG STATE - INTERACTIVO":"PSC vs FLAG STATE - INTERATIVO"}</div>
              <PSCFlagSVG lang={lang}/>
            </Card>

            <SL icon="📘" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📘 {lang==="fr"?"ISM & DPA - INTERACTIF":lang==="en"?"ISM & DPA - INTERACTIVE":lang==="es"?"ISM Y DPA - INTERACTIVO":"ISM & DPA - INTERATIVO"}</div>
              <ISMSVG lang={lang}/>
            </Card>

            <SL icon="🔎" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔎 {lang==="fr"?"CYCLE D'AUDIT - INTERACTIF":lang==="en"?"AUDIT CYCLE - INTERACTIVE":lang==="es"?"CICLO DE AUDITORÍA - INTERACTIVO":"CICLO DE AUDITORIA - INTERATIVO"}</div>
              <AuditSVG lang={lang}/>
            </Card>

            <SL icon="💼" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💼 {lang==="fr"?"VETTING SIRE - INTERACTIF":lang==="en"?"SIRE VETTING - INTERACTIVE":lang==="es"?"VETTING SIRE - INTERACTIVO":"VETTING SIRE - INTERATIVO"}</div>
              <VettingSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><ComplianceChecklist lang={lang}/></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise5 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{padding:"10px 14px",marginBottom:10,borderRadius:10,background:"rgba(255,255,255,0.04)",fontSize:12,color:C.gold2,fontStyle:"italic",lineHeight:1.6,textAlign:"center"}}>{lc.transitionPhrase}</div>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(30,138,74,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(30,138,74,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </div>}

          {phase==="quiz"&&<div>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz - Conformité environnementale":lang==="en"?"Quiz - Environmental Compliance":lang==="es"?"Quiz - Cumplimiento ambiental":"Quiz - Conformidade ambiental"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 5":lang==="en"?"Lesson 5":lang==="es"?"Lección 5":"Lição 5"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </div>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}55`,fontSize:14,color:C.green,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <div style={{textAlign:"center",padding:"14px 10px",marginBottom:16,fontSize:12,color:C.gold2,fontFamily:"Courier New",fontStyle:"italic",lineHeight:1.7,borderTop:"1px solid rgba(255,255,255,0.08)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>{lc.closingPhrase}</div>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(30,138,74,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 6 - LEADERSHIP ENVIRONNEMENTAL →":lang==="en"?"LESSON 6 - ENVIRONMENTAL LEADERSHIP →":lang==="es"?"LECCIÓN 6 - LIDERAZGO AMBIENTAL →":"LIÇÃO 6 - LIDERANÇA AMBIENTAL →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
