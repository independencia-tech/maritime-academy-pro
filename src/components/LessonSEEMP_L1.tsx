import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

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
// SVG 1 - FROM VOLUNTARY ECONOMY TO REGULATORY OBLIGATION
// ══════════════════════════════════════
function TimelineSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"before", icon:"⛽", color:C.blue2,
      label:{fr:"Avant : simple économie",en:"Before: simple economy",es:"Antes: simple economía",pt:"Antes: simples economia"},
      desc:{fr:"Pendant des decennies, reduire la consommation de carburant relevait uniquement d'un choix economique de la compagnie - une bonne pratique, jamais une obligation legale.",en:"For decades, reducing fuel consumption was purely an economic choice made by the company - good practice, never a legal obligation.",es:"Durante decadas, reducir el consumo de combustible fue puramente una eleccion economica de la compania - una buena practica, nunca una obligacion legal.",pt:"Durante decadas, reduzir o consumo de combustivel foi puramente uma escolha economica da empresa - uma boa pratica, nunca uma obrigacao legal."} },
    { id:"2021", icon:"📜", color:C.teal,
      label:{fr:"2021 : amendements MARPOL",en:"2021: MARPOL amendments",es:"2021: enmiendas MARPOL",pt:"2021: emendas MARPOL"},
      desc:{fr:"L'OMI adopte des amendements a l'Annexe VI rendant obligatoires l'EEXI et le CII pour les navires existants - la premiere fois que la performance energetique devient une exigence reglementaire, pas seulement une recommandation.",en:"IMO adopts amendments to Annex VI making EEXI and CII mandatory for existing ships - the first time energy performance becomes a regulatory requirement, not just a recommendation.",es:"La OMI adopta enmiendas al Anexo VI que hacen obligatorios el EEXI y el CII para buques existentes - la primera vez que el rendimiento energetico se convierte en una exigencia reglamentaria.",pt:"A OMI adota emendas ao Anexo VI tornando obrigatorios o EEXI e o CII para navios existentes - a primeira vez que o desempenho energetico se torna uma exigencia regulamentar."} },
    { id:"2023", icon:"⚙️", color:C.gold2,
      label:{fr:"2023 : entrée en vigueur",en:"2023: entry into force",es:"2023: entrada en vigor",pt:"2023: entrada em vigor"},
      desc:{fr:"L'EEXI et le CII deviennent effectivement obligatoires pour tous les navires concernes. A partir de cette date, un navire non conforme s'expose a des restrictions operationnelles - detaillees en Lecons 3 et 4.",en:"EEXI and CII become effectively mandatory for all applicable ships. From this date, a non-compliant vessel faces operational restrictions - detailed in Lessons 3 and 4.",es:"El EEXI y el CII se vuelven efectivamente obligatorios para todos los buques aplicables. Desde esta fecha, un buque no conforme se expone a restricciones operativas.",pt:"O EEXI e o CII tornam-se efetivamente obrigatorios para todos os navios aplicaveis. A partir desta data, um navio nao conforme enfrenta restricoes operacionais."} },
    { id:"today", icon:"🌍", color:C.red,
      label:{fr:"Aujourd'hui : responsabilité partagée",en:"Today: shared responsibility",es:"Hoy: responsabilidad compartida",pt:"Hoje: responsabilidade compartilhada"},
      desc:{fr:"L'efficacite energetique n'est plus l'affaire du seul armateur - chaque officier machine contribue directement, par ses decisions quotidiennes, a la conformite reglementaire du navire.",en:"Energy efficiency is no longer the shipowner's concern alone - every engine officer directly contributes, through daily decisions, to the vessel's regulatory compliance.",es:"La eficiencia energetica ya no es asunto exclusivo del armador - cada oficial de maquinas contribuye directamente, con sus decisiones diarias, al cumplimiento reglamentario del buque.",pt:"A eficiencia energetica ja nao e apenas assunto do armador - cada oficial de maquinas contribui diretamente, atraves das decisoes diarias, para a conformidade regulamentar do navio."} },
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
        {lang==="fr"?"Touche une étape pour les détails":lang==="en"?"Tap a step for details":lang==="es"?"Toca una etapa para detalles":"Toque numa etapa para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 - IMO NET ZERO STRATEGY + BUSINESS CASE
// ══════════════════════════════════════
function NetZeroSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"strategy", icon:"🎯", color:C.blue2,
      label:{fr:"Stratégie Net Zero de l'OMI",en:"IMO Net Zero Strategy",es:"Estrategia Net Zero de la OMI",pt:"Estratégia Net Zero da OMI"},
      desc:{fr:"L'OMI vise une reduction significative des emissions d'ici 2030, une acceleration d'ici 2040, et la neutralite carbone du transport maritime aux alentours de 2050. Les chiffres precis evoluent avec les revisions - retiens la trajectoire, pas un pourcentage fige.",en:"IMO aims for a significant emissions reduction by 2030, acceleration by 2040, and carbon neutrality of shipping around 2050. Precise figures evolve with revisions - remember the trajectory, not a fixed percentage.",es:"La OMI busca una reduccion significativa de emisiones para 2030, una aceleracion para 2040, y la neutralidad de carbono del transporte maritimo hacia 2050. Las cifras precisas evolucionan - recuerda la trayectoria, no un porcentaje fijo.",pt:"A OMI visa uma reducao significativa das emissoes ate 2030, uma aceleracao ate 2040, e a neutralidade de carbono do transporte maritimo por volta de 2050. Os numeros precisos evoluem - lembre-se da trajetoria, nao de uma percentagem fixa."} },
    { id:"cost", icon:"💰", color:C.gold2,
      label:{fr:"Réduction des coûts d'exploitation",en:"Reduced operating costs",es:"Reducción de costos operativos",pt:"Redução de custos operacionais"},
      desc:{fr:"Le carburant reste le poste de depense operationnelle le plus important pour la plupart des compagnies. Chaque amelioration d'efficacite energetique se traduit directement par des economies mesurables.",en:"Fuel remains the largest operating expense for most companies. Every energy efficiency improvement translates directly into measurable savings.",es:"El combustible sigue siendo el mayor gasto operativo para la mayoria de las companias. Cada mejora de eficiencia energetica se traduce directamente en ahorros medibles.",pt:"O combustivel continua sendo a maior despesa operacional para a maioria das empresas. Cada melhoria de eficiencia energetica se traduz diretamente em economias mensuraveis."} },
    { id:"competitive", icon:"📈", color:C.teal,
      label:{fr:"Compétitivité & attractivité",en:"Competitiveness & attractiveness",es:"Competitividad y atractivo",pt:"Competitividade e atratividade"},
      desc:{fr:"Un navire performant sur le plan energetique est plus attractif pour les affreteurs et repond mieux aux attentes des clients finaux, de plus en plus sensibles a l'empreinte carbone de leur chaine logistique.",en:"An energy-efficient vessel is more attractive to charterers and better meets the expectations of end clients, increasingly sensitive to their supply chain's carbon footprint.",es:"Un buque energeticamente eficiente resulta mas atractivo para los fletadores y responde mejor a las expectativas de los clientes finales, cada vez mas sensibles a la huella de carbono de su cadena logistica.",pt:"Um navio energeticamente eficiente e mais atraente para os afretadores e atende melhor as expectativas dos clientes finais, cada vez mais sensiveis a pegada de carbono de sua cadeia logistica."} },
    { id:"charterers", icon:"🤝", color:C.orange,
      label:{fr:"Exigences des affréteurs",en:"Charterer requirements",es:"Exigencias de los fletadores",pt:"Exigências dos afretadores"},
      desc:{fr:"De plus en plus d'affreteurs integrent desormais la notation CII et les performances energetiques dans leurs criteres de selection de navires - un mauvais score peut directement fermer l'acces a certains contrats commerciaux.",en:"More and more charterers now factor CII rating and energy performance into their vessel selection criteria - a poor score can directly close access to certain commercial contracts.",es:"Cada vez mas fletadores integran la calificacion CII y el rendimiento energetico en sus criterios de seleccion de buques - una mala puntuacion puede cerrar directamente el acceso a ciertos contratos comerciales.",pt:"Cada vez mais afretadores integram a classificacao CII e o desempenho energetico em seus criterios de selecao de navios - uma pontuacao ruim pode fechar diretamente o acesso a certos contratos comerciais."} },
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
// SVG 3 - EEXI / CII OVERVIEW (BRIEF, NO DEPTH)
// ══════════════════════════════════════
function EEXICIISVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"eexi", icon:"🏗️", color:C.blue2,
      label:{fr:"EEXI",en:"EEXI",es:"EEXI",pt:"EEXI"},
      desc:{fr:"L'Energy Efficiency Existing Ship Index evalue la conception technique du navire - sa capacite theorique a etre efficace, calculee une fois. Detail complet en Lecon 3.",en:"The Energy Efficiency Existing Ship Index assesses the vessel's technical design - its theoretical capacity to be efficient, calculated once. Full detail in Lesson 3.",es:"El Energy Efficiency Existing Ship Index evalua el diseno tecnico del buque - su capacidad teorica de ser eficiente, calculada una vez. Detalle completo en la Leccion 3.",pt:"O Energy Efficiency Existing Ship Index avalia o design tecnico do navio - sua capacidade teorica de ser eficiente, calculada uma vez. Detalhe completo na Licao 3."} },
    { id:"cii", icon:"📊", color:C.gold2,
      label:{fr:"CII",en:"CII",es:"CII",pt:"CII"},
      desc:{fr:"Le Carbon Intensity Indicator evalue la performance operationnelle reelle du navire, annee apres annee - il depend directement des decisions prises a bord au quotidien. Detail complet en Lecon 4.",en:"The Carbon Intensity Indicator assesses the vessel's actual operational performance, year after year - it depends directly on daily decisions made on board. Full detail in Lesson 4.",es:"El Carbon Intensity Indicator evalua el rendimiento operativo real del buque, ano tras ano - depende directamente de las decisiones tomadas a bordo cada dia. Detalle completo en la Leccion 4.",pt:"O Carbon Intensity Indicator avalia o desempenho operacional real do navio, ano apos ano - depende diretamente das decisoes tomadas a bordo diariamente. Detalhe completo na Licao 4."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"14px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:24,marginBottom:6}}>{it.icon}</div>
            <div style={{fontSize:13,color:sel===it.id?it.color:C.muted,fontWeight:700}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche EEXI ou CII pour un aperçu":lang==="en"?"Tap EEXI or CII for an overview":lang==="es"?"Toca EEXI o CII para una vista general":"Toque em EEXI ou CII para uma visão geral"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 - EVERY DECISION MATTERS
// ══════════════════════════════════════
function EveryDecisionSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"pumps", icon:"💧", color:C.blue2,
      label:{fr:"Démarrer les pompes seulement si nécessaire",en:"Start pumps only when needed",es:"Arrancar bombas solo si es necesario",pt:"Ligar bombas apenas quando necessário"},
      desc:{fr:"Chaque pompe auxiliaire en fonctionnement inutile consomme du carburant sans aucun benefice operationnel. Verifier reguliement quels equipements tournent réellement pour rien.",en:"Every auxiliary pump running unnecessarily consumes fuel with no operational benefit. Regularly check which equipment is really running for nothing.",es:"Cada bomba auxiliar funcionando innecesariamente consume combustible sin ningun beneficio operativo. Verificar regularmente que equipos funcionan realmente en vano.",pt:"Cada bomba auxiliar funcionando desnecessariamente consome combustivel sem nenhum beneficio operacional. Verificar regularmente quais equipamentos estao realmente funcionando a toa."} },
    { id:"idling", icon:"⏸️", color:C.teal,
      label:{fr:"Éviter le ralenti inutile",en:"Avoid unnecessary idling",es:"Evitar el ralentí innecesario",pt:"Evitar marcha lenta desnecessária"},
      desc:{fr:"Laisser un moteur ou un generateur tourner au ralenti par habitude, sans besoin operationnel reel, est une des sources de gaspillage les plus courantes et les plus faciles a corriger.",en:"Leaving an engine or generator idling out of habit, without a real operational need, is one of the most common and easiest sources of waste to fix.",es:"Dejar un motor o generador en ralenti por costumbre, sin necesidad operativa real, es una de las fuentes de desperdicio mas comunes y faciles de corregir.",pt:"Deixar um motor ou gerador em marcha lenta por habito, sem necessidade operacional real, e uma das fontes de desperdicio mais comuns e faceis de corrigir."} },
    { id:"leaks", icon:"🔧", color:C.gold2,
      label:{fr:"Signaler les fuites de carburant",en:"Report fuel leaks",es:"Reportar fugas de combustible",pt:"Reportar fugas de combustível"},
      desc:{fr:"Une petite fuite non signalee represente une perte continue de carburant et souvent un risque de securite - la signaler rapidement est une action simple a fort impact.",en:"A small unreported leak represents a continuous fuel loss and often a safety risk - reporting it quickly is a simple, high-impact action.",es:"Una pequena fuga no reportada representa una perdida continua de combustible y a menudo un riesgo de seguridad - reportarla rapidamente es una accion simple de alto impacto.",pt:"Uma pequena fuga nao reportada representa uma perda continua de combustivel e muitas vezes um risco de seguranca - reporta-la rapidamente e uma acao simples de alto impacto."} },
    { id:"maintain", icon:"🛠️", color:C.orange,
      label:{fr:"Maintenir les équipements",en:"Maintain equipment",es:"Mantener los equipos",pt:"Manter os equipamentos"},
      desc:{fr:"Un equipement mal entretenu (filtre encrasse, echangeur sale) consomme plus d'energie pour un meme resultat. La maintenance preventive est une action d'efficacite energetique a part entiere.",en:"Poorly maintained equipment (clogged filter, dirty exchanger) consumes more energy for the same result. Preventive maintenance is an energy efficiency action in its own right.",es:"Un equipo mal mantenido (filtro obstruido, intercambiador sucio) consume mas energia para el mismo resultado. El mantenimiento preventivo es una accion de eficiencia energetica en si misma.",pt:"Um equipamento mal mantido (filtro entupido, permutador sujo) consome mais energia para o mesmo resultado. A manutencao preventiva e uma acao de eficiencia energetica por si so."} },
    { id:"voyage", icon:"🗺️", color:C.red,
      label:{fr:"Suivre les plans de voyage",en:"Follow voyage plans",es:"Seguir los planes de viaje",pt:"Seguir os planos de viagem"},
      desc:{fr:"S'ecarter d'un plan de voyage optimise sans raison operationnelle valable annule les benefices du travail de planification - un lien direct avec l'optimisation de voyage detaillee en Lecon 5.",en:"Deviating from an optimized voyage plan without a valid operational reason cancels out the benefits of the planning work - a direct link to voyage optimization detailed in Lesson 5.",es:"Desviarse de un plan de viaje optimizado sin una razon operativa valida anula los beneficios del trabajo de planificacion - un vinculo directo con la optimizacion de viaje detallada en la Leccion 5.",pt:"Desviar-se de um plano de viagem otimizado sem uma razao operacional valida anula os beneficios do trabalho de planejamento - uma ligacao direta com a otimizacao de viagem detalhada na Licao 5."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",gridColumn: it.id==="voyage"?"1 / span 2":"auto",
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
        {lang==="fr"?"Touche une action pour les détails":lang==="en"?"Tap an action for details":lang==="es"?"Toca una acción para detalles":"Toque numa ação para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// ENERGY EFFICIENCY AWARENESS CHECKLIST
// ══════════════════════════════════════
function AwarenessChecklist({ lang }) {
  const items = {
    fr:["Je comprends pourquoi l'efficacité énergétique compte","Je reconnais que chaque action d'économie de carburant réduit les émissions","Je sais que l'efficacité énergétique fait partie de la réglementation maritime moderne","Je suis prêt à appliquer ces principes à bord"],
    en:["I understand why fuel efficiency matters","I recognize that every fuel-saving action reduces emissions","I know that energy efficiency is part of modern maritime regulations","I am ready to apply these principles onboard"],
    es:["Entiendo por qué importa la eficiencia del combustible","Reconozco que cada acción de ahorro de combustible reduce las emisiones","Sé que la eficiencia energética forma parte de la regulación marítima moderna","Estoy listo para aplicar estos principios a bordo"],
    pt:["Entendo por que a eficiência de combustível importa","Reconheço que cada ação de economia de combustível reduz as emissões","Sei que a eficiência energética faz parte da regulamentação marítima moderna","Estou pronto para aplicar esses princípios a bordo"],
  };
  const title = {fr:"Checklist - Prise de conscience énergétique",en:"Energy Efficiency Awareness Checklist",es:"Checklist - Concienciación energética",pt:"Checklist - Consciência energética"};
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
function Exercise1({ lang, t }) {
  const [ans,setAns]=useState("");
  const [showC,setShowC]=useState(false);
  const d = {
    fr:{ q:"Nomme trois actions à bord qui peuvent réduire la consommation de carburant.", model:"Exemples possibles : arrêter les pompes auxiliaires non nécessaires, éviter le ralenti inutile des moteurs/générateurs, entretenir régulièrement les équipements (filtres, échangeurs), suivre le plan de voyage optimisé sans écart injustifié, signaler rapidement toute fuite de carburant. Les Leçons 3 à 5 détailleront des leviers encore plus précis." },
    en:{ q:"Name three onboard actions that can reduce fuel consumption.", model:"Possible examples: stopping unnecessary auxiliary pumps, avoiding unnecessary engine/generator idling, regularly maintaining equipment (filters, exchangers), following the optimized voyage plan without unjustified deviation, quickly reporting any fuel leak. Lessons 3 to 5 will detail even more precise levers." },
    es:{ q:"Nombra tres acciones a bordo que pueden reducir el consumo de combustible.", model:"Ejemplos posibles: detener bombas auxiliares innecesarias, evitar el ralentí innecesario de motores/generadores, mantener regularmente los equipos (filtros, intercambiadores), seguir el plan de viaje optimizado sin desviación injustificada, reportar rápidamente cualquier fuga de combustible. Las Lecciones 3 a 5 detallarán palancas aún más precisas." },
    pt:{ q:"Nomeie três ações a bordo que podem reduzir o consumo de combustível.", model:"Exemplos possíveis: parar bombas auxiliares desnecessárias, evitar marcha lenta desnecessária de motores/geradores, manter regularmente os equipamentos (filtros, permutadores), seguir o plano de viagem otimizado sem desvio injustificado, reportar rapidamente qualquer fuga de combustível. As Lições 3 a 5 detalharão alavancas ainda mais precisas." },
  };
  const c = d[lang]||d.fr;
  return(
    <div>
      <div style={{fontSize:13,color:C.white,marginBottom:8,lineHeight:1.6,fontWeight:600}}>{c.q}</div>
      <textarea value={ans} onChange={e=>setAns(e.target.value)} placeholder={lang==="fr"?"Tes 3 actions...":lang==="en"?"Your 3 actions...":lang==="es"?"Tus 3 acciones...":"Suas 3 ações..."}
        rows={3} style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${C.border}`,color:C.white,fontSize:13,fontFamily:"inherit",marginBottom:10,boxSizing:"border-box",resize:"vertical"}}/>
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.model}</div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// MARITIME MILESTONE - 2023 IMO GHG Strategy
// ══════════════════════════════════════
function MaritimeMilestone({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Repère maritime - 2023 IMO GHG Strategy",teaser:"Adoption de la stratégie révisée · Objectif Net Zero · Nouvelle ère pour armateurs et marins",
      what:"En juillet 2023, l'Organisation Maritime Internationale adopte sa Strategie GES revisee, marquant un tournant pour l'ensemble du secteur maritime. Pour la premiere fois, l'OMI fixe une trajectoire claire vers la neutralite carbone du transport maritime international, avec des jalons intermediaires a 2030 et 2040.",
      cause:"• Pression croissante des Etats membres et de la societe civile pour accelerer la decarbonation\n• Constat que les mesures volontaires precedentes ne suffisaient pas a infléchir la trajectoire d'emissions\n• Necessite d'aligner le transport maritime sur les objectifs climatiques internationaux plus larges",
      lessons:"✓ Ce n'est pas un accident mais un tournant historique - la premiere fois que le secteur maritime se fixe une trajectoire Net Zero contraignante\n✓ Cette strategie est directement a l'origine du renforcement de l'EEXI et du CII vus dans ce module\n✓ Chaque marin en poste aujourd'hui exerce sa carriere dans la periode de transition la plus importante de l'histoire du transport maritime"},
    en:{title:"Maritime Milestone - 2023 IMO GHG Strategy",teaser:"Adoption of the revised strategy · Net Zero target · New era for shipowners and seafarers",
      what:"In July 2023, the International Maritime Organization adopted its revised GHG Strategy, marking a turning point for the entire maritime sector. For the first time, IMO set a clear trajectory toward carbon neutrality for international shipping, with intermediate milestones for 2030 and 2040.",
      cause:"• Growing pressure from member states and civil society to accelerate decarbonization\n• Recognition that previous voluntary measures were insufficient to bend the emissions trajectory\n• Need to align shipping with broader international climate goals",
      lessons:"✓ This is not an accident but a historic turning point - the first time the maritime sector has set a binding Net Zero trajectory\n✓ This strategy directly gave rise to the strengthened EEXI and CII seen in this module\n✓ Every seafarer working today is building their career during the most important transition period in shipping history"},
    es:{title:"Hito marítimo - 2023 IMO GHG Strategy",teaser:"Adopción de la estrategia revisada · Objetivo Net Zero · Nueva era para armadores y marinos",
      what:"En julio de 2023, la Organizacion Maritima Internacional adopto su Estrategia GEI revisada, marcando un punto de inflexion para todo el sector maritimo. Por primera vez, la OMI fijo una trayectoria clara hacia la neutralidad de carbono del transporte maritimo internacional, con hitos intermedios para 2030 y 2040.",
      cause:"• Presion creciente de los Estados miembros y la sociedad civil para acelerar la descarbonizacion\n• Constatacion de que las medidas voluntarias anteriores no bastaban para cambiar la trayectoria de emisiones\n• Necesidad de alinear el transporte maritimo con los objetivos climaticos internacionales mas amplios",
      lessons:"✓ No es un accidente sino un punto de inflexion historico - la primera vez que el sector maritimo se fija una trayectoria Net Zero vinculante\n✓ Esta estrategia esta directamente en el origen del refuerzo del EEXI y el CII vistos en este modulo\n✓ Cada marino en activo hoy desarrolla su carrera durante el periodo de transicion mas importante de la historia del transporte maritimo"},
    pt:{title:"Marco marítimo - 2023 IMO GHG Strategy",teaser:"Adoção da estratégia revista · Objetivo Net Zero · Nova era para armadores e marinheiros",
      what:"Em julho de 2023, a Organizacao Maritima Internacional adotou sua Estrategia GEE revista, marcando um ponto de viragem para todo o setor maritimo. Pela primeira vez, a OMI fixou uma trajetoria clara rumo a neutralidade de carbono do transporte maritimo internacional, com marcos intermediarios para 2030 e 2040.",
      cause:"• Pressao crescente dos Estados membros e da sociedade civil para acelerar a descarbonizacao\n• Constatacao de que as medidas voluntarias anteriores nao bastavam para mudar a trajetoria de emissoes\n• Necessidade de alinhar o transporte maritimo com os objetivos climaticos internacionais mais amplos",
      lessons:"✓ Nao e um acidente mas um ponto de viragem historico - a primeira vez que o setor maritimo fixa uma trajetoria Net Zero vinculativa\n✓ Esta estrategia esta diretamente na origem do reforco do EEXI e do CII vistos neste modulo\n✓ Todo marinheiro em atividade hoje constroi sua carreira durante o periodo de transicao mais importante da historia do transporte maritimo"},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(26,111,212,0.08)",border:`1.5px solid ${C.blue2}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>📅</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.blue2,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
        <div style={{fontSize:11,color:C.blue2,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"CONTEXTE":lang==="en"?"CONTEXT":lang==="es"?"CONTEXTO":"CONTEXTO"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"À RETENIR":lang==="en"?"KEY TAKEAWAYS":lang==="es"?"A RECORDAR":"A LEMBRAR"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
      </div>}
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Qu'est-ce qui a fait passer l'efficacité énergétique d'un choix économique à une obligation légale ?",opts:["Une décision unilatérale d'un armateur","Les amendements MARPOL Annexe VI (2021), entrés en vigueur en 2023","Une norme ISO volontaire","Aucun changement réglementaire n'a eu lieu"],correct:1,expl:"Les amendements de 2021 à l'Annexe VI, entrés en vigueur en 2023, ont rendu l'EEXI et le CII obligatoires pour la première fois."},
    {q:"Que mesure l'EEXI ?",opts:["La performance opérationnelle réelle année après année","La conception technique du navire, calculée une fois","Le prix du carburant","Le nombre de membres d'équipage"],correct:1,expl:"L'EEXI évalue la conception technique et la capacité théorique d'efficacité du navire - un calcul réalisé une seule fois."},
    {q:"Que mesure le CII ?",opts:["La conception technique du navire","La performance opérationnelle réelle du navire, année après année","Le tonnage du navire","La distance parcourue uniquement"],correct:1,expl:"Le CII évalue la performance opérationnelle réelle, recalculée chaque année selon les décisions prises à bord."},
    {q:"Quel événement de 2023 a fixé une trajectoire Net Zero pour le transport maritime ?",opts:["Un accident majeur","L'adoption de la stratégie GES révisée de l'OMI","Une grève internationale des marins","Un sommet économique privé"],correct:1,expl:"En juillet 2023, l'OMI a adopté sa stratégie GES révisée, fixant pour la première fois une trajectoire Net Zero contraignante."},
    {q:"En dehors de la réglementation, pourquoi les compagnies investissent-elles aujourd'hui dans l'efficacité énergétique ?",opts:["Cela n'a aucun intérêt économique","Réduction des coûts, compétitivité et exigences des affréteurs","Uniquement pour l'image publique","Parce que c'est gratuit"],correct:1,expl:"Au-delà de l'obligation légale, l'efficacité énergétique réduit les coûts d'exploitation et améliore la compétitivité auprès des affréteurs."},
  ],
  en:[
    {q:"What changed energy efficiency from an economic choice to a legal obligation?",opts:["A unilateral shipowner decision","The MARPOL Annex VI amendments (2021), entering into force in 2023","A voluntary ISO standard","No regulatory change occurred"],correct:1,expl:"The 2021 amendments to Annex VI, effective in 2023, made EEXI and CII mandatory for the first time."},
    {q:"What does EEXI measure?",opts:["Actual operational performance year after year","The vessel's technical design, calculated once","The fuel price","The number of crew members"],correct:1,expl:"EEXI assesses the technical design and theoretical efficiency capacity of the vessel - a one-time calculation."},
    {q:"What does CII measure?",opts:["The vessel's technical design","The vessel's actual operational performance, year after year","The vessel's tonnage","Distance traveled only"],correct:1,expl:"CII assesses actual operational performance, recalculated every year based on decisions made on board."},
    {q:"What 2023 event set a Net Zero trajectory for shipping?",opts:["A major accident","The adoption of IMO's revised GHG Strategy","An international seafarers' strike","A private economic summit"],correct:1,expl:"In July 2023, IMO adopted its revised GHG Strategy, setting for the first time a binding Net Zero trajectory."},
    {q:"Besides regulation, why do companies invest in energy efficiency today?",opts:["It has no economic interest","Cost reduction, competitiveness and charterer requirements","Only for public image","Because it is free"],correct:1,expl:"Beyond the legal obligation, energy efficiency reduces operating costs and improves competitiveness with charterers."},
  ],
  es:[
    {q:"¿Qué cambió la eficiencia energética de una elección económica a una obligación legal?",opts:["Una decisión unilateral de un armador","Las enmiendas al Anexo VI de MARPOL (2021), en vigor desde 2023","Una norma ISO voluntaria","No ocurrió ningún cambio reglamentario"],correct:1,expl:"Las enmiendas de 2021 al Anexo VI, en vigor desde 2023, hicieron obligatorios el EEXI y el CII por primera vez."},
    {q:"¿Qué mide el EEXI?",opts:["El rendimiento operativo real año tras año","El diseño técnico del buque, calculado una vez","El precio del combustible","El número de tripulantes"],correct:1,expl:"El EEXI evalúa el diseño técnico y la capacidad teórica de eficiencia del buque - un cálculo realizado una sola vez."},
    {q:"¿Qué mide el CII?",opts:["El diseño técnico del buque","El rendimiento operativo real del buque, año tras año","El tonelaje del buque","Solo la distancia recorrida"],correct:1,expl:"El CII evalúa el rendimiento operativo real, recalculado cada año según las decisiones tomadas a bordo."},
    {q:"¿Qué evento de 2023 fijó una trayectoria Net Zero para el transporte marítimo?",opts:["Un accidente mayor","La adopción de la estrategia GEI revisada de la OMI","Una huelga internacional de marinos","Una cumbre económica privada"],correct:1,expl:"En julio de 2023, la OMI adoptó su estrategia GEI revisada, fijando por primera vez una trayectoria Net Zero vinculante."},
    {q:"Aparte de la reglamentación, ¿por qué las compañías invierten hoy en eficiencia energética?",opts:["No tiene ningún interés económico","Reducción de costos, competitividad y exigencias de los fletadores","Solo por imagen pública","Porque es gratis"],correct:1,expl:"Más allá de la obligación legal, la eficiencia energética reduce los costos operativos y mejora la competitividad con los fletadores."},
  ],
  pt:[
    {q:"O que mudou a eficiência energética de uma escolha econômica para uma obrigação legal?",opts:["Uma decisão unilateral do armador","As emendas ao Anexo VI do MARPOL (2021), em vigor desde 2023","Uma norma ISO voluntária","Nenhuma mudança regulamentar ocorreu"],correct:1,expl:"As emendas de 2021 ao Anexo VI, em vigor desde 2023, tornaram o EEXI e o CII obrigatórios pela primeira vez."},
    {q:"O que o EEXI mede?",opts:["O desempenho operacional real ano após ano","O design técnico do navio, calculado uma vez","O preço do combustível","O número de tripulantes"],correct:1,expl:"O EEXI avalia o design técnico e a capacidade teórica de eficiência do navio - um cálculo realizado uma única vez."},
    {q:"O que o CII mede?",opts:["O design técnico do navio","O desempenho operacional real do navio, ano após ano","A tonelagem do navio","Apenas a distância percorrida"],correct:1,expl:"O CII avalia o desempenho operacional real, recalculado a cada ano com base nas decisões tomadas a bordo."},
    {q:"Que evento de 2023 fixou uma trajetória Net Zero para o transporte marítimo?",opts:["Um acidente grave","A adoção da estratégia GEE revista da OMI","Uma greve internacional de marinheiros","Uma cúpula econômica privada"],correct:1,expl:"Em julho de 2023, a OMI adotou sua estratégia GEE revista, fixando pela primeira vez uma trajetória Net Zero vinculativa."},
    {q:"Além da regulamentação, por que as empresas investem hoje em eficiência energética?",opts:["Não tem nenhum interesse econômico","Redução de custos, competitividade e exigências dos afretadores","Apenas por imagem pública","Porque é grátis"],correct:1,expl:"Além da obrigação legal, a eficiência energética reduz os custos operacionais e melhora a competitividade junto aos afretadores."},
  ],
};

const BANK = {
  fr:[
    {q:"Avant les amendements MARPOL de 2021, comment était perçue la réduction de consommation de carburant ?",opts:["Comme une obligation légale stricte","Comme un choix économique volontaire de la compagnie","Comme une exigence syndicale","Comme une norme de sécurité"],correct:1,expl:"Pendant des décennies, réduire la consommation de carburant relevait uniquement d'un choix économique, jamais d'une obligation légale."},
    {q:"En quelle année les amendements rendant l'EEXI et le CII obligatoires ont-ils été adoptés par l'OMI ?",opts:["2015","2021","2025","2010"],correct:1,expl:"L'OMI a adopté ces amendements à l'Annexe VI en 2021, avant leur entrée en vigueur en 2023."},
    {q:"En quelle année l'EEXI et le CII sont-ils entrés en vigueur ?",opts:["2019","2023","2030","2040"],correct:1,expl:"L'EEXI et le CII sont devenus effectivement obligatoires en 2023."},
    {q:"La stratégie Net Zero de l'OMI fixe-t-elle des pourcentages précis et définitifs de réduction ?",opts:["Oui, des pourcentages fixes et immuables","Une trajectoire avec des jalons 2030/2040/2050, dont les chiffres précis peuvent évoluer","Non, aucun objectif n'est fixé","Oui, mais uniquement pour 2050"],correct:1,expl:"La stratégie fixe une trajectoire avec des jalons intermédiaires - les pourcentages précis peuvent évoluer avec les révisions successives."},
    {q:"Le carburant représente-t-il un poste de dépense important pour les compagnies maritimes ?",opts:["Non, une dépense mineure","Oui, souvent le poste de dépense opérationnelle le plus important","Non, il est toujours gratuit","Cela dépend uniquement du pavillon"],correct:1,expl:"Le carburant reste généralement le poste de dépense opérationnelle le plus important pour la plupart des compagnies maritimes."},
    {q:"Les affréteurs intègrent-ils désormais la performance énergétique dans leurs critères de sélection ?",opts:["Non, jamais","Oui, de plus en plus, notamment via la notation CII","Uniquement pour les navires de croisière","Non, seul le prix du fret compte"],correct:1,expl:"De plus en plus d'affréteurs intègrent la notation CII et la performance énergétique dans leurs critères de sélection de navires."},
    {q:"Que se passe-t-il pour l'attractivité commerciale d'un navire énergétiquement performant ?",opts:["Aucun effet","Il devient plus attractif pour les affréteurs et répond mieux aux attentes clients","Il devient automatiquement plus cher à opérer","Il perd de la valeur"],correct:1,expl:"Un navire performant sur le plan énergétique est plus attractif pour les affréteurs et répond mieux aux attentes des clients finaux."},
    {q:"L'EEXI est-il recalculé chaque année ?",opts:["Oui, chaque année","Non, il s'agit d'un calcul unique lié à la conception technique du navire","Oui, tous les mois","Non, il n'est jamais calculé"],correct:1,expl:"Contrairement au CII, l'EEXI est un calcul réalisé une fois, lié à la conception technique du navire."},
    {q:"Le CII dépend-il des décisions prises à bord au quotidien ?",opts:["Non, il ne dépend que de la conception du navire","Oui, il dépend directement des décisions opérationnelles quotidiennes","Non, il est fixe pour toute la durée de vie du navire","Oui, mais uniquement de la vitesse maximale"],correct:1,expl:"Le CII évalue la performance opérationnelle réelle, qui dépend directement des décisions prises à bord chaque jour."},
    {q:"Démarrer une pompe auxiliaire sans nécessité opérationnelle a-t-il un impact énergétique ?",opts:["Non, aucun impact","Oui, cela consomme du carburant sans aucun bénéfice opérationnel","Non, les pompes ne consomment jamais d'énergie","Cela dépend uniquement de la météo"],correct:1,expl:"Chaque pompe auxiliaire en fonctionnement inutile consomme du carburant sans aucun bénéfice opérationnel réel."},
    {q:"Le ralenti inutile d'un moteur ou générateur est-il une source de gaspillage fréquente ?",opts:["Non, c'est rarissime","Oui, c'est l'une des sources de gaspillage les plus courantes et faciles à corriger","Non, cela n'existe pas en pratique","Oui, mais uniquement sur les tankers"],correct:1,expl:"Laisser un moteur ou générateur au ralenti par habitude est une des sources de gaspillage les plus courantes à bord."},
    {q:"Pourquoi signaler rapidement une fuite de carburant est-il important pour l'efficacité énergétique ?",opts:["Cela n'a aucun rapport avec l'efficacité énergétique","Une fuite non signalée représente une perte continue de carburant et souvent un risque de sécurité","Cela ne concerne que la maintenance, jamais l'énergie","Les fuites de carburant n'existent pas en pratique"],correct:1,expl:"Une fuite non signalée entraîne une perte continue de carburant en plus d'un risque de sécurité potentiel."},
    {q:"Un équipement mal entretenu (filtre encrassé, échangeur sale) a-t-il un impact énergétique ?",opts:["Non, aucun impact","Oui, il consomme plus d'énergie pour un même résultat","Non, seul l'âge de l'équipement compte","Cela dépend uniquement du fabricant"],correct:1,expl:"Un équipement mal entretenu consomme davantage d'énergie pour produire le même résultat - la maintenance préventive est une action d'efficacité énergétique."},
    {q:"S'écarter d'un plan de voyage optimisé sans raison valable a-t-il un impact ?",opts:["Aucun impact","Cela annule les bénéfices du travail de planification énergétique","Cela améliore toujours l'efficacité","Cela ne concerne que la sécurité de navigation"],correct:1,expl:"S'écarter d'un plan de voyage optimisé sans raison opérationnelle valable annule les bénéfices attendus de la planification."},
    {q:"Qu'est-ce que la stratégie GES révisée de l'OMI (2023) a directement provoqué ?",opts:["Aucune conséquence réglementaire","Le renforcement de l'EEXI et du CII abordés dans ce module","La suppression de MARPOL Annexe VI","Une réduction des contrôles PSC"],correct:1,expl:"La stratégie GES révisée de 2023 est directement à l'origine du renforcement des exigences EEXI et CII."},
  ],
  en:[
    {q:"Before the 2021 MARPOL amendments, how was reducing fuel consumption perceived?",opts:["As a strict legal obligation","As a voluntary economic choice by the company","As a union requirement","As a safety standard"],correct:1,expl:"For decades, reducing fuel consumption was purely an economic choice, never a legal obligation."},
    {q:"In what year were the amendments making EEXI and CII mandatory adopted by IMO?",opts:["2015","2021","2025","2010"],correct:1,expl:"IMO adopted these amendments to Annex VI in 2021, before their entry into force in 2023."},
    {q:"In what year did EEXI and CII enter into force?",opts:["2019","2023","2030","2040"],correct:1,expl:"EEXI and CII effectively became mandatory in 2023."},
    {q:"Does IMO's Net Zero strategy set precise, fixed reduction percentages?",opts:["Yes, fixed and unchangeable percentages","A trajectory with 2030/2040/2050 milestones, whose precise figures may evolve","No, no target is set at all","Yes, but only for 2050"],correct:1,expl:"The strategy sets a trajectory with intermediate milestones - precise percentages may evolve with successive revisions."},
    {q:"Does fuel represent a major expense item for shipping companies?",opts:["No, a minor expense","Yes, often the largest operating expense item","No, it is always free","It depends solely on the flag"],correct:1,expl:"Fuel generally remains the largest operating expense item for most shipping companies."},
    {q:"Do charterers now factor energy performance into their selection criteria?",opts:["No, never","Yes, increasingly, notably via CII rating","Only for cruise ships","No, only freight price matters"],correct:1,expl:"More and more charterers factor CII rating and energy performance into their vessel selection criteria."},
    {q:"What happens to the commercial attractiveness of an energy-efficient vessel?",opts:["No effect","It becomes more attractive to charterers and better meets client expectations","It automatically becomes more expensive to operate","It loses value"],correct:1,expl:"An energy-efficient vessel is more attractive to charterers and better meets end clients' expectations."},
    {q:"Is EEXI recalculated every year?",opts:["Yes, every year","No, it is a one-time calculation linked to the vessel's technical design","Yes, every month","No, it is never calculated"],correct:1,expl:"Unlike CII, EEXI is a one-time calculation linked to the vessel's technical design."},
    {q:"Does CII depend on daily decisions made on board?",opts:["No, it only depends on vessel design","Yes, it directly depends on daily operational decisions","No, it is fixed for the vessel's whole lifetime","Yes, but only on maximum speed"],correct:1,expl:"CII assesses actual operational performance, which directly depends on decisions made on board every day."},
    {q:"Does starting an auxiliary pump without operational need have an energy impact?",opts:["No impact at all","Yes, it consumes fuel with no operational benefit","No, pumps never consume energy","It depends solely on the weather"],correct:1,expl:"Every auxiliary pump running unnecessarily consumes fuel with no real operational benefit."},
    {q:"Is unnecessary idling of an engine or generator a frequent source of waste?",opts:["No, it is extremely rare","Yes, it is one of the most common and easiest sources of waste to fix","No, it does not happen in practice","Yes, but only on tankers"],correct:1,expl:"Leaving an engine or generator idling out of habit is one of the most common sources of waste on board."},
    {q:"Why is quickly reporting a fuel leak important for energy efficiency?",opts:["It has nothing to do with energy efficiency","An unreported leak represents a continuous fuel loss and often a safety risk","It only concerns maintenance, never energy","Fuel leaks do not happen in practice"],correct:1,expl:"An unreported leak causes a continuous fuel loss in addition to a potential safety risk."},
    {q:"Does poorly maintained equipment (clogged filter, dirty exchanger) have an energy impact?",opts:["No impact at all","Yes, it consumes more energy for the same result","No, only the equipment's age matters","It depends solely on the manufacturer"],correct:1,expl:"Poorly maintained equipment consumes more energy to produce the same result - preventive maintenance is an energy efficiency action."},
    {q:"Does deviating from an optimized voyage plan without a valid reason have an impact?",opts:["No impact","It cancels out the benefits of the energy planning work","It always improves efficiency","It only concerns navigation safety"],correct:1,expl:"Deviating from an optimized voyage plan without a valid operational reason cancels out the expected benefits of the planning."},
    {q:"What did IMO's revised GHG Strategy (2023) directly cause?",opts:["No regulatory consequence","The strengthening of EEXI and CII covered in this module","The removal of MARPOL Annex VI","A reduction in PSC controls"],correct:1,expl:"The 2023 revised GHG Strategy directly gave rise to the strengthened EEXI and CII requirements."},
  ],
  es:[
    {q:"Antes de las enmiendas MARPOL de 2021, ¿cómo se percibía la reducción del consumo de combustible?",opts:["Como una obligación legal estricta","Como una elección económica voluntaria de la compañía","Como una exigencia sindical","Como una norma de seguridad"],correct:1,expl:"Durante décadas, reducir el consumo de combustible fue puramente una elección económica, nunca una obligación legal."},
    {q:"¿En qué año se adoptaron las enmiendas que hacen obligatorios el EEXI y el CII?",opts:["2015","2021","2025","2010"],correct:1,expl:"La OMI adoptó estas enmiendas al Anexo VI en 2021, antes de su entrada en vigor en 2023."},
    {q:"¿En qué año entraron en vigor el EEXI y el CII?",opts:["2019","2023","2030","2040"],correct:1,expl:"El EEXI y el CII se volvieron efectivamente obligatorios en 2023."},
    {q:"¿La estrategia Net Zero de la OMI fija porcentajes precisos y definitivos?",opts:["Sí, porcentajes fijos e inmutables","Una trayectoria con hitos 2030/2040/2050, cuyas cifras precisas pueden evolucionar","No, no se fija ningún objetivo","Sí, pero solo para 2050"],correct:1,expl:"La estrategia fija una trayectoria con hitos intermedios - las cifras precisas pueden evolucionar con las revisiones sucesivas."},
    {q:"¿El combustible representa un gasto importante para las compañías marítimas?",opts:["No, un gasto menor","Sí, a menudo el mayor gasto operativo","No, siempre es gratis","Depende únicamente del pabellón"],correct:1,expl:"El combustible suele seguir siendo el mayor gasto operativo para la mayoría de las compañías marítimas."},
    {q:"¿Los fletadores integran ahora el rendimiento energético en sus criterios de selección?",opts:["No, nunca","Sí, cada vez más, especialmente mediante la calificación CII","Solo para cruceros","No, solo importa el precio del flete"],correct:1,expl:"Cada vez más fletadores integran la calificación CII y el rendimiento energético en sus criterios de selección de buques."},
    {q:"¿Qué ocurre con el atractivo comercial de un buque energéticamente eficiente?",opts:["Ningún efecto","Se vuelve más atractivo para los fletadores y responde mejor a las expectativas de los clientes","Automáticamente se vuelve más caro de operar","Pierde valor"],correct:1,expl:"Un buque energéticamente eficiente resulta más atractivo para los fletadores y responde mejor a las expectativas de los clientes finales."},
    {q:"¿Se recalcula el EEXI cada año?",opts:["Sí, cada año","No, es un cálculo único vinculado al diseño técnico del buque","Sí, cada mes","No, nunca se calcula"],correct:1,expl:"A diferencia del CII, el EEXI es un cálculo único vinculado al diseño técnico del buque."},
    {q:"¿El CII depende de las decisiones tomadas a bordo cada día?",opts:["No, solo depende del diseño del buque","Sí, depende directamente de las decisiones operativas diarias","No, es fijo durante toda la vida del buque","Sí, pero solo de la velocidad máxima"],correct:1,expl:"El CII evalúa el rendimiento operativo real, que depende directamente de las decisiones tomadas a bordo cada día."},
    {q:"¿Arrancar una bomba auxiliar sin necesidad operativa tiene un impacto energético?",opts:["Ningún impacto","Sí, consume combustible sin ningún beneficio operativo","No, las bombas nunca consumen energía","Depende únicamente del clima"],correct:1,expl:"Cada bomba auxiliar funcionando innecesariamente consume combustible sin ningún beneficio operativo real."},
    {q:"¿El ralentí innecesario de un motor o generador es una fuente frecuente de desperdicio?",opts:["No, es rarísimo","Sí, es una de las fuentes de desperdicio más comunes y fáciles de corregir","No, no ocurre en la práctica","Sí, pero solo en petroleros"],correct:1,expl:"Dejar un motor o generador en ralentí por costumbre es una de las fuentes de desperdicio más comunes a bordo."},
    {q:"¿Por qué es importante reportar rápidamente una fuga de combustible para la eficiencia energética?",opts:["No tiene relación con la eficiencia energética","Una fuga no reportada representa una pérdida continua de combustible y a menudo un riesgo de seguridad","Solo concierne al mantenimiento, nunca a la energía","Las fugas de combustible no ocurren en la práctica"],correct:1,expl:"Una fuga no reportada provoca una pérdida continua de combustible además de un riesgo de seguridad potencial."},
    {q:"¿Un equipo mal mantenido (filtro obstruido, intercambiador sucio) tiene un impacto energético?",opts:["Ningún impacto","Sí, consume más energía para el mismo resultado","No, solo importa la antigüedad del equipo","Depende únicamente del fabricante"],correct:1,expl:"Un equipo mal mantenido consume más energía para producir el mismo resultado - el mantenimiento preventivo es una acción de eficiencia energética."},
    {q:"¿Desviarse de un plan de viaje optimizado sin razón válida tiene un impacto?",opts:["Ningún impacto","Anula los beneficios del trabajo de planificación energética","Siempre mejora la eficiencia","Solo concierne a la seguridad de navegación"],correct:1,expl:"Desviarse de un plan de viaje optimizado sin una razón operativa válida anula los beneficios esperados de la planificación."},
    {q:"¿Qué provocó directamente la estrategia GEI revisada de la OMI (2023)?",opts:["Ninguna consecuencia reglamentaria","El refuerzo del EEXI y el CII abordados en este módulo","La eliminación del Anexo VI de MARPOL","Una reducción de los controles PSC"],correct:1,expl:"La estrategia GEI revisada de 2023 está directamente en el origen del refuerzo de las exigencias EEXI y CII."},
  ],
  pt:[
    {q:"Antes das emendas MARPOL de 2021, como era percebida a redução do consumo de combustível?",opts:["Como uma obrigação legal estrita","Como uma escolha econômica voluntária da empresa","Como uma exigência sindical","Como uma norma de segurança"],correct:1,expl:"Durante décadas, reduzir o consumo de combustível foi puramente uma escolha econômica, nunca uma obrigação legal."},
    {q:"Em que ano as emendas que tornam o EEXI e o CII obrigatórios foram adotadas pela OMI?",opts:["2015","2021","2025","2010"],correct:1,expl:"A OMI adotou essas emendas ao Anexo VI em 2021, antes de sua entrada em vigor em 2023."},
    {q:"Em que ano o EEXI e o CII entraram em vigor?",opts:["2019","2023","2030","2040"],correct:1,expl:"O EEXI e o CII tornaram-se efetivamente obrigatórios em 2023."},
    {q:"A estratégia Net Zero da OMI fixa percentagens precisas e definitivas?",opts:["Sim, percentagens fixas e imutáveis","Uma trajetória com marcos 2030/2040/2050, cujos números precisos podem evoluir","Não, nenhum objetivo é fixado","Sim, mas apenas para 2050"],correct:1,expl:"A estratégia fixa uma trajetória com marcos intermediários - os números precisos podem evoluir com as revisões sucessivas."},
    {q:"O combustível representa uma despesa importante para as companhias marítimas?",opts:["Não, uma despesa menor","Sim, frequentemente a maior despesa operacional","Não, é sempre grátis","Depende apenas da bandeira"],correct:1,expl:"O combustível geralmente continua sendo a maior despesa operacional para a maioria das companhias marítimas."},
    {q:"Os afretadores integram atualmente o desempenho energético em seus critérios de seleção?",opts:["Não, nunca","Sim, cada vez mais, notadamente via classificação CII","Apenas para cruzeiros","Não, apenas o preço do frete importa"],correct:1,expl:"Cada vez mais afretadores integram a classificação CII e o desempenho energético em seus critérios de seleção de navios."},
    {q:"O que acontece com a atratividade comercial de um navio energeticamente eficiente?",opts:["Nenhum efeito","Torna-se mais atraente para os afretadores e atende melhor às expectativas dos clientes","Automaticamente se torna mais caro de operar","Perde valor"],correct:1,expl:"Um navio energeticamente eficiente é mais atraente para os afretadores e atende melhor às expectativas dos clientes finais."},
    {q:"O EEXI é recalculado a cada ano?",opts:["Sim, todo ano","Não, é um cálculo único ligado ao design técnico do navio","Sim, todo mês","Não, nunca é calculado"],correct:1,expl:"Ao contrário do CII, o EEXI é um cálculo único ligado ao design técnico do navio."},
    {q:"O CII depende das decisões tomadas a bordo todos os dias?",opts:["Não, depende apenas do design do navio","Sim, depende diretamente das decisões operacionais diárias","Não, é fixo durante toda a vida do navio","Sim, mas apenas da velocidade máxima"],correct:1,expl:"O CII avalia o desempenho operacional real, que depende diretamente das decisões tomadas a bordo todos os dias."},
    {q:"Ligar uma bomba auxiliar sem necessidade operacional tem impacto energético?",opts:["Nenhum impacto","Sim, consome combustível sem nenhum benefício operacional","Não, as bombas nunca consomem energia","Depende apenas do clima"],correct:1,expl:"Cada bomba auxiliar funcionando desnecessariamente consome combustível sem nenhum benefício operacional real."},
    {q:"A marcha lenta desnecessária de um motor ou gerador é uma fonte frequente de desperdício?",opts:["Não, é raríssimo","Sim, é uma das fontes de desperdício mais comuns e fáceis de corrigir","Não, não ocorre na prática","Sim, mas apenas em petroleiros"],correct:1,expl:"Deixar um motor ou gerador em marcha lenta por hábito é uma das fontes de desperdício mais comuns a bordo."},
    {q:"Por que reportar rapidamente uma fuga de combustível é importante para a eficiência energética?",opts:["Não tem relação com a eficiência energética","Uma fuga não reportada representa uma perda contínua de combustível e frequentemente um risco de segurança","Diz respeito apenas à manutenção, nunca à energia","Fugas de combustível não ocorrem na prática"],correct:1,expl:"Uma fuga não reportada causa uma perda contínua de combustível além de um risco de segurança potencial."},
    {q:"Um equipamento mal mantido (filtro entupido, permutador sujo) tem impacto energético?",opts:["Nenhum impacto","Sim, consome mais energia para o mesmo resultado","Não, só importa a idade do equipamento","Depende apenas do fabricante"],correct:1,expl:"Um equipamento mal mantido consome mais energia para produzir o mesmo resultado - a manutenção preventiva é uma ação de eficiência energética."},
    {q:"Desviar-se de um plano de viagem otimizado sem razão válida tem impacto?",opts:["Nenhum impacto","Anula os benefícios do trabalho de planejamento energético","Sempre melhora a eficiência","Diz respeito apenas à segurança de navegação"],correct:1,expl:"Desviar-se de um plano de viagem otimizado sem uma razão operacional válida anula os benefícios esperados do planejamento."},
    {q:"O que a estratégia GEE revista da OMI (2023) causou diretamente?",opts:["Nenhuma consequência regulamentar","O reforço do EEXI e do CII abordados neste módulo","A eliminação do Anexo VI do MARPOL","Uma redução dos controlos PSC"],correct:1,expl:"A estratégia GEE revista de 2023 está diretamente na origem do reforço das exigências EEXI e CII."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
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
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.green}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.green,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.green:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d = {
    fr:{
      badge:"🍃 Module Machine · Leçon 1/5 · ⭐ Premium · 200 XP",
      title:"Pourquoi l'efficacité énergétique compte",
      intro:"La Leçon 4 du module MARPOL a brièvement mentionné l'EEXI et le CII. Ce nouveau module leur consacre 5 leçons complètes. Cette première leçon explique pourquoi l'efficacité énergétique est devenue une obligation réglementaire - pas encore comment calculer quoi que ce soit, cela viendra en Leçons 3 et 4.\n\nObjectif : comprendre le changement de statut de l'efficacité énergétique, situer les grandes échéances, et se préparer aux leviers pratiques détaillés dans les leçons suivantes.",
      p1:"PARTIE 1 - D'UNE ÉCONOMIE VOLONTAIRE À UNE OBLIGATION",
      s1:"Comprendre ce changement de statut légal est la clé de tout ce module - ce qui était autrefois un choix de gestion est devenu une exigence réglementaire mesurée chaque année.",
      p2:"PARTIE 2 - STRATÉGIE NET ZERO & ENJEU ÉCONOMIQUE",
      s2:"Au-delà de la réglementation, l'efficacité énergétique répond aussi à une logique économique concrète pour les compagnies maritimes.",
      p3:"PARTIE 3 - APERÇU EEXI & CII",
      s3:"Un simple aperçu ici - EEXI et CII seront chacun détaillés dans leur propre leçon (3 et 4). Retiens simplement la distinction de base : conception vs performance réelle.",
      p4:"PARTIE 4 - CHAQUE DÉCISION COMPTE",
      s4:"Cette section fait le lien direct avec les leviers pratiques que tu retrouveras en détail en Leçon 5 - retiens dès maintenant que rien n'est trop petit pour compter.",
      p5:"PARTIE 5 - EXERCICE",
      p6:"PARTIE 6 - REPÈRE MARITIME",
      p7:"PARTIE 7 - BANQUE DE QUESTIONS",
      closingPhrase:"L'efficacité énergétique n'est plus seulement une question d'économie de carburant. C'est une question de protection de l'environnement, d'amélioration de la performance du navire, et de construction de l'avenir du transport maritime.",
      sumT:"POINTS CLÉS",
      sumP:[
        "L'efficacité énergétique est passée d'un choix économique volontaire à une obligation réglementaire (MARPOL Annexe VI, 2021/2023)",
        "La stratégie Net Zero de l'OMI fixe une trajectoire 2030/2040/2050, sans pourcentages figés",
        "L'EEXI évalue la conception technique du navire, calculée une fois",
        "Le CII évalue la performance opérationnelle réelle, recalculée chaque année",
        "Les compagnies investissent aussi pour réduire leurs coûts et rester compétitives auprès des affréteurs",
        "Chaque décision quotidienne à bord a un impact mesurable sur la conformité du navire",
      ],
      learnedP:[
        "Comprendre pourquoi l'efficacité énergétique est devenue une obligation réglementaire",
        "Situer les grandes échéances de la stratégie Net Zero de l'OMI",
        "Distinguer en une phrase ce que mesurent l'EEXI et le CII",
        "Identifier des actions quotidiennes qui réduisent la consommation de carburant",
        "Je sais pourquoi mes décisions à bord comptent pour la conformité énergétique du navire",
      ],
    },
    en:{
      badge:"🍃 Engine Module · Lesson 1/5 · ⭐ Premium · 200 XP",
      title:"Why Energy Efficiency Matters",
      intro:"MARPOL Lesson 4 briefly mentioned EEXI and CII. This new module dedicates 5 full lessons to them. This first lesson explains why energy efficiency has become a regulatory obligation - not yet how to calculate anything, that comes in Lessons 3 and 4.\n\nGoal: understand the change in status of energy efficiency, place the major milestones, and prepare for the practical levers detailed in the following lessons.",
      p1:"PART 1 - FROM VOLUNTARY ECONOMY TO OBLIGATION",
      s1:"Understanding this change in legal status is the key to this whole module - what was once a management choice has become a regulatory requirement measured every year.",
      p2:"PART 2 - NET ZERO STRATEGY & ECONOMIC STAKES",
      s2:"Beyond regulation, energy efficiency also responds to a concrete economic logic for shipping companies.",
      p3:"PART 3 - EEXI & CII OVERVIEW",
      s3:"Just a brief overview here - EEXI and CII will each be detailed in their own lesson (3 and 4). Just remember the basic distinction: design vs actual performance.",
      p4:"PART 4 - EVERY DECISION MATTERS",
      s4:"This section directly links to the practical levers you'll find detailed in Lesson 5 - remember from now on that nothing is too small to count.",
      p5:"PART 5 - EXERCISE",
      p6:"PART 6 - MARITIME MILESTONE",
      p7:"PART 7 - QUESTION BANK",
      closingPhrase:"Energy efficiency is no longer just about saving fuel. It is about protecting the environment, improving ship performance and shaping the future of shipping.",
      sumT:"KEY POINTS",
      sumP:[
        "Energy efficiency shifted from a voluntary economic choice to a regulatory obligation (MARPOL Annex VI, 2021/2023)",
        "IMO's Net Zero strategy sets a 2030/2040/2050 trajectory, with no fixed percentages",
        "EEXI assesses the vessel's technical design, calculated once",
        "CII assesses actual operational performance, recalculated every year",
        "Companies also invest to reduce costs and stay competitive with charterers",
        "Every daily decision on board has a measurable impact on vessel compliance",
      ],
      learnedP:[
        "Understand why energy efficiency became a regulatory obligation",
        "Place the major milestones of IMO's Net Zero strategy",
        "Distinguish in one sentence what EEXI and CII measure",
        "Identify daily actions that reduce fuel consumption",
        "I know why my decisions on board matter for the vessel's energy compliance",
      ],
    },
    es:{
      badge:"🍃 Módulo Máquinas · Lección 1/5 · ⭐ Premium · 200 XP",
      title:"Por qué importa la eficiencia energética",
      intro:"La Lección 4 de MARPOL mencionó brevemente el EEXI y el CII. Este nuevo módulo les dedica 5 lecciones completas. Esta primera lección explica por qué la eficiencia energética se ha convertido en una obligación reglamentaria - todavía no cómo calcular nada, eso llega en las Lecciones 3 y 4.\n\nObjetivo: comprender el cambio de estatus de la eficiencia energética, situar los grandes hitos, y prepararse para las palancas prácticas detalladas en las lecciones siguientes.",
      p1:"PARTE 1 - DE UNA ECONOMÍA VOLUNTARIA A UNA OBLIGACIÓN",
      s1:"Comprender este cambio de estatus legal es la clave de todo este módulo - lo que antes era una elección de gestión se ha convertido en una exigencia reglamentaria medida cada año.",
      p2:"PARTE 2 - ESTRATEGIA NET ZERO Y ENFOQUE ECONÓMICO",
      s2:"Más allá de la reglamentación, la eficiencia energética también responde a una lógica económica concreta para las compañías marítimas.",
      p3:"PARTE 3 - VISIÓN GENERAL EEXI Y CII",
      s3:"Solo una vista general aquí - el EEXI y el CII se detallarán cada uno en su propia lección (3 y 4). Recuerda simplemente la distinción básica: diseño vs rendimiento real.",
      p4:"PARTE 4 - CADA DECISIÓN CUENTA",
      s4:"Esta sección conecta directamente con las palancas prácticas que encontrarás detalladas en la Lección 5 - recuerda desde ahora que nada es demasiado pequeño para contar.",
      p5:"PARTE 5 - EJERCICIO",
      p6:"PARTE 6 - HITO MARÍTIMO",
      p7:"PARTE 7 - BANCO DE PREGUNTAS",
      closingPhrase:"La eficiencia energética ya no se trata solo de ahorrar combustible. Se trata de proteger el medio ambiente, mejorar el rendimiento del buque y construir el futuro del transporte marítimo.",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "La eficiencia energética pasó de ser una elección económica voluntaria a una obligación reglamentaria (Anexo VI MARPOL, 2021/2023)",
        "La estrategia Net Zero de la OMI fija una trayectoria 2030/2040/2050, sin porcentajes fijos",
        "El EEXI evalúa el diseño técnico del buque, calculado una vez",
        "El CII evalúa el rendimiento operativo real, recalculado cada año",
        "Las compañías también invierten para reducir costos y mantenerse competitivas ante los fletadores",
        "Cada decisión diaria a bordo tiene un impacto medible en el cumplimiento del buque",
      ],
      learnedP:[
        "Comprender por qué la eficiencia energética se convirtió en una obligación reglamentaria",
        "Situar los grandes hitos de la estrategia Net Zero de la OMI",
        "Distinguir en una frase qué miden el EEXI y el CII",
        "Identificar acciones diarias que reducen el consumo de combustible",
        "Sé por qué mis decisiones a bordo importan para el cumplimiento energético del buque",
      ],
    },
    pt:{
      badge:"🍃 Módulo Máquinas · Lição 1/5 · ⭐ Premium · 200 XP",
      title:"Por que a eficiência energética importa",
      intro:"A Lição 4 do MARPOL mencionou brevemente o EEXI e o CII. Este novo módulo dedica 5 lições completas a eles. Esta primeira lição explica por que a eficiência energética se tornou uma obrigação regulamentar - ainda não como calcular nada, isso vem nas Lições 3 e 4.\n\nObjetivo: compreender a mudança de status da eficiência energética, situar os grandes marcos, e preparar-se para as alavancas práticas detalhadas nas lições seguintes.",
      p1:"PARTE 1 - DE UMA ECONOMIA VOLUNTÁRIA A UMA OBRIGAÇÃO",
      s1:"Compreender essa mudança de status legal é a chave para todo este módulo - o que antes era uma escolha de gestão tornou-se uma exigência regulamentar medida a cada ano.",
      p2:"PARTE 2 - ESTRATÉGIA NET ZERO E LÓGICA ECONÔMICA",
      s2:"Além da regulamentação, a eficiência energética também responde a uma lógica econômica concreta para as companhias marítimas.",
      p3:"PARTE 3 - VISÃO GERAL EEXI E CII",
      s3:"Apenas uma visão geral aqui - o EEXI e o CII serão detalhados cada um em sua própria lição (3 e 4). Lembre-se apenas da distinção básica: design vs desempenho real.",
      p4:"PARTE 4 - CADA DECISÃO CONTA",
      s4:"Esta seção liga diretamente às alavancas práticas que você encontrará detalhadas na Lição 5 - lembre-se desde já que nada é pequeno demais para contar.",
      p5:"PARTE 5 - EXERCÍCIO",
      p6:"PARTE 6 - MARCO MARÍTIMO",
      p7:"PARTE 7 - BANCO DE QUESTÕES",
      closingPhrase:"A eficiência energética não é mais apenas uma questão de economizar combustível. É uma questão de proteger o ambiente, melhorar o desempenho do navio e construir o futuro do transporte marítimo.",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "A eficiência energética passou de uma escolha econômica voluntária a uma obrigação regulamentar (Anexo VI MARPOL, 2021/2023)",
        "A estratégia Net Zero da OMI fixa uma trajetória 2030/2040/2050, sem percentagens fixas",
        "O EEXI avalia o design técnico do navio, calculado uma vez",
        "O CII avalia o desempenho operacional real, recalculado a cada ano",
        "As empresas também investem para reduzir custos e permanecer competitivas junto aos afretadores",
        "Cada decisão diária a bordo tem um impacto mensurável na conformidade do navio",
      ],
      learnedP:[
        "Compreender por que a eficiência energética se tornou uma obrigação regulamentar",
        "Situar os grandes marcos da estratégia Net Zero da OMI",
        "Distinguir em uma frase o que o EEXI e o CII medem",
        "Identificar ações diárias que reduzem o consumo de combustível",
        "Sei por que minhas decisões a bordo importam para a conformidade energética do navio",
      ],
    },
  };
  return d[lang] || d.fr;
};

export default function LessonSEEMP_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
            <div style={{fontSize:10,color:C.green,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🍃 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/5":lang==="en"?"Lesson 1/5":lang==="es"?"Lección 1/5":"Lição 1/5"}</div>
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

            <SL icon="📈" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📈 {lang==="fr"?"CHRONOLOGIE - INTERACTIF":lang==="en"?"TIMELINE - INTERACTIVE":lang==="es"?"CRONOLOGÍA - INTERACTIVO":"CRONOLOGIA - INTERATIVO"}</div>
              <TimelineSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎯 {lang==="fr"?"NET ZERO - INTERACTIF":lang==="en"?"NET ZERO - INTERACTIVE":lang==="es"?"NET ZERO - INTERACTIVO":"NET ZERO - INTERATIVO"}</div>
              <NetZeroSVG lang={lang}/>
            </Card>

            <SL icon="📊" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📊 {lang==="fr"?"EEXI vs CII":lang==="en"?"EEXI vs CII":lang==="es"?"EEXI vs CII":"EEXI vs CII"}</div>
              <EEXICIISVG lang={lang}/>
            </Card>

            <SL icon="⚙️" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚙️ {lang==="fr"?"CHAQUE DÉCISION COMPTE - INTERACTIF":lang==="en"?"EVERY DECISION MATTERS - INTERACTIVE":lang==="es"?"CADA DECISIÓN CUENTA - INTERACTIVO":"CADA DECISÃO CONTA - INTERATIVO"}</div>
              <EveryDecisionSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><AwarenessChecklist lang={lang}/></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="📅" text={lc.p6} color={C.blue2}/>
            <div style={{marginBottom:14}}><MaritimeMilestone lang={lang}/></div>

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
                {lang==="fr"?"Quiz - Efficacité énergétique":lang==="en"?"Quiz - Energy Efficiency":lang==="es"?"Quiz - Eficiencia energética":"Quiz - Eficiência energética"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 1":lang==="en"?"Lesson 1":lang==="es"?"Lección 1":"Lição 1"}</div>
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
              {lang==="fr"?"LEÇON 2 - LE SEEMP →":lang==="en"?"LESSON 2 - THE SEEMP →":lang==="es"?"LECCIÓN 2 - EL SEEMP →":"LIÇÃO 2 - O SEEMP →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
