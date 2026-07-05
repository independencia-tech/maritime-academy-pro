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
// SVG 1 - HOW THE CII WORKS
// ══════════════════════════════════════
function CIIOverviewSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"ratio", icon:"⚖️", color:C.blue2,
      label:{fr:"Un ratio, pas un chiffre absolu",en:"A ratio, not an absolute number",es:"Una razón, no un número absoluto",pt:"Uma razão, não um número absoluto"},
      desc:{fr:"Le CII compare les emissions reelles du navire au travail de transport qu'il a effectivement realise sur l'annee - pas un chiffre isole, mais un rapport entre deux grandeurs.",en:"CII compares the vessel's actual emissions to the transport work it actually carried out over the year - not an isolated figure, but a ratio between two quantities.",es:"El CII compara las emisiones reales del buque con el trabajo de transporte que realmente realizo durante el ano - no una cifra aislada, sino una relacion entre dos magnitudes.",pt:"O CII compara as emissoes reais do navio com o trabalho de transporte que efetivamente realizou durante o ano - nao um numero isolado, mas uma relacao entre duas grandezas."} },
    { id:"yearly", icon:"📅", color:C.gold2,
      label:{fr:"Une année d'exploitation, pas le navire",en:"A year of operation, not the ship itself",es:"Un año de explotación, no el buque",pt:"Um ano de operação, não o navio"},
      desc:{fr:"Le CII reflete la maniere dont un navire a ete exploite pendant une annee precise, pas seulement la facon dont il a ete concu. Un meme navire peut obtenir des notations differentes d'une annee sur l'autre selon la maniere dont il a ete exploite.",en:"The CII reflects how efficiently a ship has been operated during a specific year, not just how it was designed. The same vessel can receive different ratings from one year to the next depending on how it was operated.",es:"El CII refleja como se ha explotado un buque durante un ano especifico, no solo como fue disenado. El mismo buque puede recibir calificaciones diferentes de un ano a otro segun como fue operado.",pt:"O CII reflete como um navio foi operado durante um ano especifico, nao apenas como foi projetado. O mesmo navio pode receber classificacoes diferentes de um ano para o outro conforme foi operado."} },
    { id:"threshold", icon:"📉", color:C.teal,
      label:{fr:"Un seuil de plus en plus strict",en:"An increasingly strict threshold",es:"Un umbral cada vez más estricto",pt:"Um limite cada vez mais rigoroso"},
      desc:{fr:"Le seuil annuel de reference se resserre progressivement d'annee en annee, dans la logique de la trajectoire Net Zero vue en Lecon 1 - rester conforme demande donc un effort continu, pas ponctuel.",en:"The annual reference threshold progressively tightens year after year, in line with the Net Zero trajectory seen in Lesson 1 - staying compliant therefore requires continuous, not one-off, effort.",es:"El umbral de referencia anual se estrecha progresivamente ano tras ano, en linea con la trayectoria Net Zero vista en la Leccion 1 - mantenerse conforme requiere entonces un esfuerzo continuo, no puntual.",pt:"O limite de referencia anual se estreita progressivamente ano apos ano, alinhado com a trajetoria Net Zero vista na Licao 1 - manter a conformidade exige portanto um esforco continuo, nao pontual."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"12px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{it.icon}</div>
            <div style={{fontSize:9,color:sel===it.id?it.color:C.muted,fontWeight:700,lineHeight:1.3}}>{it.label[lang]||it.label.fr}</div>
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
// SVG 2 - A-E RATINGS
// ══════════════════════════════════════
function RatingsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const ratings = [
    { id:"a", letter:"A", color:"#1e8a4a", label:{fr:"Excellent",en:"Excellent",es:"Excelente",pt:"Excelente"},
      desc:{fr:"Le navire dépasse largement les exigences de l'année - performance énergétique exemplaire.",en:"The vessel largely exceeds the year's requirements - exemplary energy performance.",es:"El buque supera ampliamente las exigencias del año - rendimiento energético ejemplar.",pt:"O navio supera amplamente as exigências do ano - desempenho energético exemplar."} },
    { id:"b", letter:"B", color:"#4da6ff", label:{fr:"Très bien",en:"Very Good",es:"Muy bien",pt:"Muito bom"},
      desc:{fr:"Le navire est au-dessus des exigences de l'année, avec une marge confortable.",en:"The vessel is above the year's requirements, with a comfortable margin.",es:"El buque está por encima de las exigencias del año, con un margen cómodo.",pt:"O navio está acima das exigências do ano, com uma margem confortável."} },
    { id:"c", letter:"C", color:"#c9922a", label:{fr:"Conforme",en:"Compliant",es:"Conforme",pt:"Conforme"},
      desc:{fr:"Le navire respecte les exigences de l'année - conforme, sans marge particulière.",en:"The vessel meets the year's requirements - compliant, with no particular margin.",es:"El buque cumple las exigencias del año - conforme, sin margen particular.",pt:"O navio cumpre as exigências do ano - conforme, sem margem particular."} },
    { id:"d", letter:"D", color:"#e67e22", label:{fr:"Amélioration requise",en:"Improvement Required",es:"Mejora requerida",pt:"Melhoria necessária"},
      desc:{fr:"Le navire est sous les exigences de l'année. Une notation D deux années de suite déclenche un Corrective Action Plan obligatoire.",en:"The vessel is below the year's requirements. A D rating two years in a row triggers a mandatory Corrective Action Plan.",es:"El buque está por debajo de las exigencias del año. Una calificación D dos años seguidos activa un Corrective Action Plan obligatorio.",pt:"O navio está abaixo das exigências do ano. Uma classificação D dois anos seguidos desencadeia um Corrective Action Plan obrigatório."} },
    { id:"e", letter:"E", color:"#c0392b", label:{fr:"Amélioration sérieuse requise",en:"Serious Improvement Required",es:"Mejora seria requerida",pt:"Melhoria séria necessária"},
      desc:{fr:"Le navire est nettement sous les exigences de l'année. Un Corrective Action Plan est obligatoire dès la première notation E.",en:"The vessel is significantly below the year's requirements. A Corrective Action Plan is mandatory from the very first E rating.",es:"El buque está claramente por debajo de las exigencias del año. Un Corrective Action Plan es obligatorio desde la primera calificación E.",pt:"O navio está claramente abaixo das exigências do ano. Um Corrective Action Plan é obrigatório desde a primeira classificação E."} },
  ];
  const sel_ = sel ? ratings.find(r=>r.id===sel) : null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:8}}>
        {ratings.map(r=>(
          <div key={r.id} onClick={()=>setSel(sel===r.id?null:r.id)} style={{
            display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:12,cursor:"pointer",
            background:sel===r.id?`${r.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===r.id?r.color:"rgba(255,255,255,0.08)"}`,
          }}>
            <div style={{width:32,height:32,borderRadius:"50%",flexShrink:0,background:r.color,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:16,color:"#fff"}}>{r.letter}</div>
            <div style={{fontSize:12,fontWeight:700,color:sel===r.id?r.color:C.white}}>{r.label[lang]||r.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une notation pour les détails":lang==="en"?"Tap a rating for details":lang==="es"?"Toca una calificación para detalles":"Toque numa classificação para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SECTION 3 - DAILY DECISION -> EFFECT ON CII TABLE
// ══════════════════════════════════════
function DecisionTable({ lang }) {
  const rows = {
    fr:[["Vitesse réduite (slow steaming)",true],["Nettoyage de coque",true],["Polissage de l'hélice",true],["Optimisation de voyage",true],["Long voyage en ballast inutile",false],["Vitesse excessive",false],["Maintenance négligée",false],["Inefficacité moteur",false]],
    en:[["Slow steaming",true],["Hull cleaning",true],["Propeller polishing",true],["Voyage optimisation",true],["Long ballast voyage",false],["Excessive speed",false],["Poor maintenance",false],["Engine inefficiency",false]],
    es:[["Reducción de velocidad (slow steaming)",true],["Limpieza del casco",true],["Pulido de la hélice",true],["Optimización de viaje",true],["Viaje en lastre innecesario",false],["Velocidad excesiva",false],["Mantenimiento deficiente",false],["Ineficiencia del motor",false]],
    pt:[["Redução de velocidade (slow steaming)",true],["Limpeza do casco",true],["Polimento da hélice",true],["Otimização de viagem",true],["Viagem em lastro desnecessária",false],["Velocidade excessiva",false],["Manutenção deficiente",false],["Ineficiência do motor",false]],
  };
  const headers = {fr:["Décision quotidienne","Effet sur le CII"],en:["Daily Decision","Effect on CII"],es:["Decisión diaria","Efecto en el CII"],pt:["Decisão diária","Efeito no CII"]};
  const h = headers[lang]||headers.fr;
  const list = rows[lang]||rows.fr;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:8,marginBottom:8,paddingBottom:6,borderBottom:`1px solid ${C.border}`}}>
        <div style={{fontSize:11,fontWeight:700,color:C.gold2}}>{h[0]}</div>
        <div style={{fontSize:11,fontWeight:700,color:C.gold2}}>{h[1]}</div>
      </div>
      {list.map(([label,improves],i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"center",padding:"7px 0",borderBottom:i<list.length-1?"1px solid rgba(255,255,255,0.05)":"none"}}>
          <div style={{fontSize:12,color:C.white}}>{label}</div>
          <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:700,color:improves?C.green:C.red,whiteSpace:"nowrap"}}>
            {improves?"✅":"❌"} {improves?(lang==="fr"?"Améliore":lang==="en"?"Improves":lang==="es"?"Mejora":"Melhora"):(lang==="fr"?"Dégrade":lang==="en"?"Worsens":lang==="es"?"Empeora":"Piora")}
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// WHAT YOU CAN INFLUENCE
// ══════════════════════════════════════
function InfluenceColumns({ lang }) {
  const outside = {
    fr:["Météo","Demande de cargaison","Ordres de l'affréteur","Congestion portuaire"],
    en:["Weather","Cargo demand","Charter orders","Port congestion"],
    es:["Clima","Demanda de carga","Órdenes del fletador","Congestión portuaria"],
    pt:["Clima","Demanda de carga","Ordens do afretador","Congestionamento portuário"],
  };
  const within = {
    fr:["Maintenance","Gestion du carburant","Efficacité machine","Exécution du voyage","Rapports quotidiens"],
    en:["Maintenance","Fuel management","Machinery efficiency","Voyage execution","Daily reporting"],
    es:["Mantenimiento","Gestión de combustible","Eficiencia de máquinas","Ejecución del viaje","Reportes diarios"],
    pt:["Manutenção","Gestão de combustível","Eficiência de máquinas","Execução da viagem","Relatórios diários"],
  };
  const titles = {
    fr:["Hors de ton contrôle","Sous ton contrôle"],
    en:["Outside your control","Within your control"],
    es:["Fuera de tu control","Bajo tu control"],
    pt:["Fora do teu controlo","Sob o teu controlo"],
  };
  const o = outside[lang]||outside.fr, w = within[lang]||within.fr, ti = titles[lang]||titles.fr;
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div>
        <div style={{fontSize:11,fontWeight:700,color:C.muted,textAlign:"center",marginBottom:8}}>❔ {ti[0]}</div>
        {o.map((item,i)=><div key={i} style={{padding:"7px 8px",borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",fontSize:11,color:C.muted,textAlign:"center",marginBottom:6}}>{item}</div>)}
      </div>
      <div>
        <div style={{fontSize:11,fontWeight:700,color:C.green,textAlign:"center",marginBottom:8}}>✅ {ti[1]}</div>
        {w.map((item,i)=><div key={i} style={{padding:"7px 8px",borderRadius:8,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}33`,fontSize:11,color:C.white,textAlign:"center",marginBottom:6}}>{item}</div>)}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// CORRECTIVE ACTION PLAN (POSITIVE FRAMING)
// ══════════════════════════════════════
function CorrectiveActionPlan({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"opportunity", icon:"🌱", color:C.green,
      label:{fr:"Une opportunité, pas une sanction",en:"An opportunity, not a punishment",es:"Una oportunidad, no un castigo",pt:"Uma oportunidade, não uma punição"},
      desc:{fr:"Le Corrective Action Plan est une opportunité de restaurer la conformité grace a des ameliorations structurees - pas une sanction punitive. Il transforme une notation insuffisante en plan d'action concret.",en:"The Corrective Action Plan is an opportunity to restore compliance through structured improvements - not a punitive sanction. It turns an insufficient rating into a concrete action plan.",es:"El Corrective Action Plan es una oportunidad de restaurar el cumplimiento mediante mejoras estructuradas - no una sancion punitiva. Convierte una calificacion insuficiente en un plan de accion concreto.",pt:"O Corrective Action Plan e uma oportunidade de restaurar a conformidade atraves de melhorias estruturadas - nao uma sancao punitiva. Transforma uma classificacao insuficiente num plano de acao concreto."} },
    { id:"content", icon:"📋", color:C.blue2,
      label:{fr:"Contenu du plan",en:"Plan content",es:"Contenido del plan",pt:"Conteúdo do plano"},
      desc:{fr:"Inscrit dans le SEEMP Part III (vu en Lecon 2), le plan identifie les causes de la notation insuffisante et propose des mesures concretes et mesurables pour l'annee suivante.",en:"Recorded in SEEMP Part III (seen in Lesson 2), the plan identifies the causes of the insufficient rating and proposes concrete, measurable measures for the following year.",es:"Inscrito en el SEEMP Part III (visto en la Leccion 2), el plan identifica las causas de la calificacion insuficiente y propone medidas concretas y medibles para el ano siguiente.",pt:"Inscrito no SEEMP Part III (visto na Licao 2), o plano identifica as causas da classificacao insuficiente e propoe medidas concretas e mensuraveis para o ano seguinte."} },
    { id:"who", icon:"👥", color:C.gold2,
      label:{fr:"Qui le prépare",en:"Who prepares it",es:"Quién lo prepara",pt:"Quem o prepara"},
      desc:{fr:"La compagnie prepare le plan, mais le Chief Engineer et son equipe machine y contribuent directement - ce sont eux qui connaissent le mieux les causes operationnelles reelles d'une mauvaise notation.",en:"The company prepares the plan, but the Chief Engineer and the engine team contribute directly - they know best the real operational causes of a poor rating.",es:"La compania prepara el plan, pero el Jefe de Maquinas y su equipo contribuyen directamente - son quienes mejor conocen las causas operativas reales de una mala calificacion.",pt:"A empresa prepara o plano, mas o Chefe de Maquinas e sua equipa contribuem diretamente - sao eles que melhor conhecem as causas operacionais reais de uma classificacao ruim."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"12px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{it.icon}</div>
            <div style={{fontSize:9,color:sel===it.id?it.color:C.muted,fontWeight:700,lineHeight:1.3}}>{it.label[lang]||it.label.fr}</div>
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
// INTERACTIVE SIMULATOR - TODAY'S DECISIONS
// ══════════════════════════════════════
function DecisionsSimulator({ lang }) {
  const options = [
    { id:"slow", icon:"⚓", impact:2, label:{fr:"Vitesse réduite",en:"Slow steaming",es:"Velocidad reducida",pt:"Velocidade reduzida"} },
    { id:"hull", icon:"⚓", impact:1, label:{fr:"Coque nettoyée",en:"Hull cleaned",es:"Casco limpiado",pt:"Casco limpo"} },
    { id:"engine", icon:"⚓", impact:2, label:{fr:"Moteur réglé",en:"Engine tuned",es:"Motor ajustado",pt:"Motor ajustado"} },
    { id:"idle", icon:"⚓", impact:-2, label:{fr:"Ralenti prolongé",en:"Long idle running",es:"Ralentí prolongado",pt:"Marcha lenta prolongada"} },
  ];
  const [checked,setChecked]=useState({});
  const toggle=id=>setChecked(c=>({...c,[id]:!c[id]}));
  const total = options.reduce((sum,o)=>sum+(checked[o.id]?o.impact:0),0);
  const title = {fr:"Décisions du jour",en:"Today's decisions",es:"Decisiones de hoy",pt:"Decisões de hoje"};
  const impactLbl = {fr:"Impact CII estimé",en:"Estimated CII Impact",es:"Impacto CII estimado",pt:"Impacto CII estimado"};
  const anySelected = Object.values(checked).some(Boolean);
  return (
    <div>
      <div style={{fontSize:12,fontWeight:700,color:C.gold2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎮 {title[lang]||title.fr}</div>
      {options.map(o=>(
        <div key={o.id} onClick={()=>toggle(o.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,marginBottom:6,cursor:"pointer",background:checked[o.id]?(o.impact>0?"rgba(30,138,74,0.15)":"rgba(192,57,43,0.15)"):"rgba(255,255,255,0.04)",border:`1px solid ${checked[o.id]?(o.impact>0?C.green:C.red):"rgba(255,255,255,0.1)"}`}}>
          <span style={{fontSize:16}}>{o.icon}</span>
          <div style={{flex:1,fontSize:12,color:C.white}}>{o.label[lang]||o.label.fr}</div>
          <div style={{fontSize:12,fontWeight:700,color:o.impact>0?C.green:C.red}}>{o.impact>0?"+":""}{o.impact}</div>
        </div>
      ))}
      <GLine/>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:4}}>{impactLbl[lang]||impactLbl.fr}</div>
        <div style={{fontSize:16,fontWeight:800,color:!anySelected?C.muted:total>0?C.green:total<0?C.red:C.gold2}}>
          {!anySelected?" - ":total>0?`🟢 ${lang==="fr"?"Positif":lang==="en"?"Positive":lang==="es"?"Positivo":"Positivo"} (+${total})`:total<0?`🔴 ${lang==="fr"?"Négatif":lang==="en"?"Negative":lang==="es"?"Negativo":"Negativo"} (${total})`:`🟡 ${lang==="fr"?"Neutre":lang==="en"?"Neutral":lang==="es"?"Neutral":"Neutro"}`}
        </div>
      </div>
      <div style={{marginTop:8,fontSize:9,color:C.muted,textAlign:"center",fontStyle:"italic"}}>
        {lang==="fr"?"Simulation pédagogique - pas un calcul réglementaire":lang==="en"?"Educational simulation - not a regulatory calculation":lang==="es"?"Simulación pedagógica - no un cálculo reglamentario":"Simulação pedagógica - não um cálculo regulamentar"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// CII AWARENESS CHECKLIST
// ══════════════════════════════════════
function CIIChecklist({ lang }) {
  const items = {
    fr:["Je sais que ma conduite quotidienne du navire influence sa notation CII","Je signale l'encrassement de coque que j'observe","Je comprends ce qu'implique un Corrective Action Plan","Je comprends que de petites décisions quotidiennes s'accumulent dans la notation CII annuelle du navire"],
    en:["I know that my daily operation of the vessel influences its CII rating","I report hull fouling that I observe","I understand what a Corrective Action Plan involves","I understand that small daily operational decisions accumulate into the ship's annual CII rating"],
    es:["Sé que mi operación diaria del buque influye en su calificación CII","Reporto la incrustación del casco que observo","Entiendo lo que implica un Corrective Action Plan","Entiendo que pequeñas decisiones operativas diarias se acumulan en la calificación CII anual del buque"],
    pt:["Sei que a minha operação diária do navio influencia a sua classificação CII","Reporto a incrustação do casco que observo","Entendo o que envolve um Corrective Action Plan","Entendo que pequenas decisões operacionais diárias se acumulam na classificação CII anual do navio"],
  };
  const title = {fr:"Checklist - Conscience CII",en:"CII Awareness Checklist",es:"Checklist - Conciencia CII",pt:"Checklist - Consciência CII"};
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
// OPERATIONAL EXAMPLE - D RATING, TEAM MEETING
// ══════════════════════════════════════
function OperationalExample({ lang }) {
  const [exp,setExp]=useState(false);
  const [sel,setSel]=useState([]);
  const toggle=(id)=>setSel(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const opts = [
    {id:"hull",label:{fr:"Nettoyer la coque",en:"Clean the hull",es:"Limpiar el casco",pt:"Limpar o casco"}},
    {id:"prop",label:{fr:"Polir l'hélice",en:"Polish the propeller",es:"Pulir la hélice",pt:"Polir a hélice"}},
    {id:"speed",label:{fr:"Optimiser la vitesse",en:"Optimize speed",es:"Optimizar la velocidad",pt:"Otimizar a velocidade"}},
    {id:"idle",label:{fr:"Réduire les périodes de ralenti",en:"Reduce idle periods",es:"Reducir los periodos de ralentí",pt:"Reduzir os períodos de marcha lenta"}},
  ];
  const d={
    fr:{title:"Exemple opérationnel",teaser:"Le navire reçoit une notation D - le Chief Engineer réunit son équipe",
      what:"Le navire recoit une notation D pour l'annee ecoulee. Le Chief Engineer reunit son equipe machine pour construire le Corrective Action Plan. Quatre actions sont proposees. Question : lesquelles sont susceptibles d'ameliorer la notation CII de l'annee suivante ?",
      lessons:"✓ Les quatre actions proposees agissent chacune sur un levier reel de la performance operationnelle\n✓ Un Corrective Action Plan efficace combine plusieurs leviers plutot qu'une seule mesure isolee\n✓ Le Chief Engineer joue un role central : il connait les causes operationnelles reelles mieux que quiconque a terre"},
    en:{title:"Operational Example",teaser:"The vessel receives a D rating - the Chief Engineer gathers the team",
      what:"The vessel receives a D rating for the past year. The Chief Engineer gathers the engine team to build the Corrective Action Plan. Four actions are proposed. Question: which ones are likely to improve next year's CII rating?",
      lessons:"✓ Each of the four proposed actions acts on a real operational performance lever\n✓ An effective Corrective Action Plan combines several levers rather than a single isolated measure\n✓ The Chief Engineer plays a central role: they know the real operational causes better than anyone ashore"},
    es:{title:"Ejemplo operativo",teaser:"El buque recibe una calificación D - el Jefe de Máquinas reúne al equipo",
      what:"El buque recibe una calificacion D para el ano transcurrido. El Jefe de Maquinas reune a su equipo para construir el Corrective Action Plan. Se proponen cuatro acciones. Pregunta: ¿cuales podrian mejorar la calificacion CII del ano siguiente?",
      lessons:"✓ Cada una de las cuatro acciones propuestas actua sobre una palanca real de rendimiento operativo\n✓ Un Corrective Action Plan eficaz combina varias palancas en lugar de una unica medida aislada\n✓ El Jefe de Maquinas juega un rol central: conoce las causas operativas reales mejor que nadie en tierra"},
    pt:{title:"Exemplo operacional",teaser:"O navio recebe uma classificação D - o Chefe de Máquinas reúne a equipa",
      what:"O navio recebe uma classificacao D para o ano decorrido. O Chefe de Maquinas reune a sua equipa para construir o Corrective Action Plan. Quatro acoes sao propostas. Pergunta: quais sao suscetiveis de melhorar a classificacao CII do ano seguinte?",
      lessons:"✓ Cada uma das quatro acoes propostas atua sobre uma alavanca real de desempenho operacional\n✓ Um Corrective Action Plan eficaz combina varias alavancas em vez de uma unica medida isolada\n✓ O Chefe de Maquinas desempenha um papel central: conhece as causas operacionais reais melhor do que ninguem em terra"},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(26,111,212,0.08)",border:`1.5px solid ${C.blue2}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>👥</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.blue2,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:12}}>{c.what}</div>
        <div style={{fontSize:11,color:C.blue2,fontWeight:700,marginBottom:8,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"QUELLES ACTIONS AMÉLIORENT LA NOTATION ?":"WHICH ACTIONS ARE LIKELY TO IMPROVE NEXT YEAR'S CII RATING?"}</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
          {opts.map(o=>(
            <div key={o.id} onClick={()=>toggle(o.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel.includes(o.id)?"rgba(30,138,74,0.15)":"rgba(255,255,255,0.04)",border:`1px solid ${sel.includes(o.id)?C.green:"rgba(255,255,255,0.1)"}`}}>
              <div style={{width:18,height:18,borderRadius:4,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${sel.includes(o.id)?C.green:"rgba(255,255,255,0.3)"}`,background:sel.includes(o.id)?C.green:"transparent",fontSize:11,color:"#fff"}}>{sel.includes(o.id)?"✓":""}</div>
              <div style={{fontSize:12,color:C.white}}>{o.label[lang]||o.label.fr}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"À RETENIR":lang==="en"?"KEY TAKEAWAYS":lang==="es"?"A RECORDAR":"A LEMBRAR"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{c.lessons}</div>
      </div>}
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Que reflète le CII ?",opts:["Uniquement la conception du navire","La façon dont le navire a été exploité durant une année précise, pas seulement sa conception","Le prix du carburant utilisé","Le nombre de membres d'équipage"],correct:1,expl:"Le CII reflète la manière dont un navire a été exploité pendant une année précise, pas seulement la façon dont il a été conçu."},
    {q:"Quelle notation déclenche un Corrective Action Plan dès la première année ?",opts:["A","C","D","E"],correct:3,expl:"Un Corrective Action Plan est obligatoire dès la première notation E, alors qu'une notation D ne le déclenche qu'après deux années consécutives."},
    {q:"Laquelle de ces actions améliore le CII ?",opts:["Vitesse excessive","Vitesse réduite (slow steaming)","Ralenti prolongé","Maintenance négligée"],correct:1,expl:"Le slow steaming (vitesse réduite) améliore le CII, contrairement à la vitesse excessive qui le dégrade."},
    {q:"Le Corrective Action Plan est-il une sanction punitive ?",opts:["Oui, c'est une punition","Non, c'est une opportunité de restaurer la conformité par des améliorations structurées","Oui, il entraîne toujours une amende","Non, il n'a aucune conséquence"],correct:1,expl:"Le Corrective Action Plan est une opportunité de restaurer la conformité grâce à des améliorations structurées, pas une sanction punitive."},
    {q:"Lequel de ces facteurs est sous le contrôle direct de l'équipe machine ?",opts:["La météo","La gestion du carburant","La demande de cargaison","La congestion portuaire"],correct:1,expl:"La gestion du carburant est directement sous le contrôle de l'équipe machine, contrairement à la météo ou la congestion portuaire."},
  ],
  en:[
    {q:"What does the CII reflect?",opts:["Only the vessel's design","How efficiently the vessel has been operated during a specific year, not just its design","The price of fuel used","The number of crew members"],correct:1,expl:"The CII reflects how efficiently a ship has been operated during a specific year, not just how it was designed."},
    {q:"Which rating triggers a Corrective Action Plan from the very first year?",opts:["A","C","D","E"],correct:3,expl:"A Corrective Action Plan is mandatory from the very first E rating, while a D rating only triggers it after two consecutive years."},
    {q:"Which of these actions improves CII?",opts:["Excessive speed","Slow steaming","Long idle running","Poor maintenance"],correct:1,expl:"Slow steaming improves CII, unlike excessive speed which worsens it."},
    {q:"Is the Corrective Action Plan a punitive sanction?",opts:["Yes, it's a punishment","No, it's an opportunity to restore compliance through structured improvements","Yes, it always leads to a fine","No, it has no consequence at all"],correct:1,expl:"The Corrective Action Plan is an opportunity to restore compliance through structured improvements, not a punitive sanction."},
    {q:"Which of these factors is directly under the engine team's control?",opts:["Weather","Fuel management","Cargo demand","Port congestion"],correct:1,expl:"Fuel management is directly under the engine team's control, unlike weather or port congestion."},
  ],
  es:[
    {q:"¿Qué refleja el CII?",opts:["Solo el diseño del buque","Cómo se ha operado el buque durante un año específico, no solo su diseño","El precio del combustible utilizado","El número de tripulantes"],correct:1,expl:"El CII refleja cómo se ha operado un buque durante un año específico, no solo cómo fue diseñado."},
    {q:"¿Qué calificación activa un Corrective Action Plan desde el primer año?",opts:["A","C","D","E"],correct:3,expl:"Un Corrective Action Plan es obligatorio desde la primera calificación E, mientras que una calificación D solo lo activa después de dos años consecutivos."},
    {q:"¿Cuál de estas acciones mejora el CII?",opts:["Velocidad excesiva","Reducción de velocidad (slow steaming)","Ralentí prolongado","Mantenimiento deficiente"],correct:1,expl:"El slow steaming (reducción de velocidad) mejora el CII, a diferencia de la velocidad excesiva que lo empeora."},
    {q:"¿Es el Corrective Action Plan una sanción punitiva?",opts:["Sí, es un castigo","No, es una oportunidad de restaurar el cumplimiento mediante mejoras estructuradas","Sí, siempre conlleva una multa","No, no tiene ninguna consecuencia"],correct:1,expl:"El Corrective Action Plan es una oportunidad de restaurar el cumplimiento mediante mejoras estructuradas, no una sanción punitiva."},
    {q:"¿Cuál de estos factores está directamente bajo el control del equipo de máquinas?",opts:["El clima","La gestión del combustible","La demanda de carga","La congestión portuaria"],correct:1,expl:"La gestión del combustible está directamente bajo el control del equipo de máquinas, a diferencia del clima o la congestión portuaria."},
  ],
  pt:[
    {q:"O que o CII reflete?",opts:["Apenas o design do navio","Como o navio foi operado durante um ano específico, não apenas seu design","O preço do combustível usado","O número de tripulantes"],correct:1,expl:"O CII reflete como um navio foi operado durante um ano específico, não apenas como foi projetado."},
    {q:"Qual classificação desencadeia um Corrective Action Plan desde o primeiro ano?",opts:["A","C","D","E"],correct:3,expl:"Um Corrective Action Plan é obrigatório desde a primeira classificação E, enquanto uma classificação D só o desencadeia após dois anos consecutivos."},
    {q:"Qual dessas ações melhora o CII?",opts:["Velocidade excessiva","Redução de velocidade (slow steaming)","Marcha lenta prolongada","Manutenção deficiente"],correct:1,expl:"O slow steaming (redução de velocidade) melhora o CII, ao contrário da velocidade excessiva que o piora."},
    {q:"O Corrective Action Plan é uma sanção punitiva?",opts:["Sim, é uma punição","Não, é uma oportunidade de restaurar a conformidade através de melhorias estruturadas","Sim, sempre resulta em multa","Não, não tem nenhuma consequência"],correct:1,expl:"O Corrective Action Plan é uma oportunidade de restaurar a conformidade através de melhorias estruturadas, não uma sanção punitiva."},
    {q:"Qual desses fatores está diretamente sob o controlo da equipa de máquinas?",opts:["O clima","A gestão de combustível","A demanda de carga","O congestionamento portuário"],correct:1,expl:"A gestão de combustível está diretamente sob o controlo da equipa de máquinas, ao contrário do clima ou do congestionamento portuário."},
  ],
};

const BANK = {
  fr:[
    {q:"Le CII est-il un chiffre isolé ou un ratio ?",opts:["Un chiffre isolé","Un ratio entre les émissions réelles et le travail de transport effectué","Le poids du navire","La vitesse maximale du navire"],correct:1,expl:"Le CII est un ratio entre les émissions réelles du navire et le travail de transport qu'il a effectivement réalisé sur l'année."},
    {q:"Le seuil annuel de référence du CII reste-t-il identique chaque année ?",opts:["Oui, il ne change jamais","Non, il se resserre progressivement d'année en année","Non, il s'assouplit chaque année","Oui, sauf pour les tankers"],correct:1,expl:"Le seuil se resserre progressivement, dans la logique de la trajectoire Net Zero vue en Leçon 1."},
    {q:"Que signifie une notation A ou B ?",opts:["Le navire est en dessous des exigences","Le navire dépasse ou est au-dessus des exigences de l'année","Le navire doit être détruit","Le navire n'a aucune notation"],correct:1,expl:"Les notations A et B signifient que le navire dépasse largement ou est au-dessus des exigences de l'année."},
    {q:"Que signifie une notation C ?",opts:["Le navire est excellent","Le navire respecte les exigences de l'année, sans marge particulière","Le navire est non conforme","Le navire nécessite une amélioration sérieuse"],correct:1,expl:"La notation C signifie que le navire respecte les exigences de l'année, sans marge particulière."},
    {q:"Une notation D deux années de suite déclenche-t-elle un Corrective Action Plan ?",opts:["Non, jamais","Oui, elle déclenche un Corrective Action Plan obligatoire","Non, seulement une notation E le déclenche","Oui, mais uniquement pour les tankers"],correct:1,expl:"Une notation D deux années consécutives déclenche un Corrective Action Plan obligatoire."},
    {q:"Le nettoyage de coque a-t-il un effet sur le CII ?",opts:["Non, aucun effet","Oui, il améliore le CII","Non, cela ne concerne que l'esthétique du navire","Oui, mais il dégrade le CII"],correct:1,expl:"Le nettoyage de coque améliore le CII en réduisant la résistance à l'avancement et donc la consommation."},
    {q:"L'optimisation de voyage a-t-elle un effet sur le CII ?",opts:["Non, aucun effet","Oui, elle améliore le CII","Non, seule la vitesse compte","Oui, mais uniquement sur les longs courriers"],correct:1,expl:"L'optimisation de voyage améliore le CII en réduisant les émissions pour un même travail de transport effectué."},
    {q:"Un long voyage en ballast inutile a-t-il un effet sur le CII ?",opts:["Non, aucun effet","Oui, il dégrade le CII","Non, le ballast n'a jamais d'impact","Oui, mais il améliore toujours le CII"],correct:1,expl:"Un long voyage en ballast inutile dégrade le CII car il génère des émissions sans travail de transport correspondant."},
    {q:"La météo est-elle un facteur sous le contrôle de l'équipage ?",opts:["Oui, totalement","Non, elle est hors du contrôle direct de l'équipage","Oui, si le Capitaine décide autrement","Non, mais elle n'a aucun impact sur le CII"],correct:1,expl:"La météo est un facteur hors du contrôle direct de l'équipage, contrairement à la gestion du carburant ou la maintenance."},
    {q:"La gestion du carburant est-elle un facteur sous le contrôle de l'équipe machine ?",opts:["Non, jamais","Oui, elle est directement sous le contrôle de l'équipe machine","Non, uniquement l'affréteur la contrôle","Oui, mais seulement en zone ECA"],correct:1,expl:"La gestion du carburant est directement sous le contrôle de l'équipe machine au quotidien."},
    {q:"Le Corrective Action Plan doit-il être compris comme une punition ?",opts:["Oui, c'est toujours punitif","Non, c'est une opportunité de restaurer la conformité par des améliorations structurées","Oui, il entraîne systématiquement un changement d'équipage","Non, il n'a aucun contenu concret"],correct:1,expl:"Le Corrective Action Plan doit être compris comme une opportunité professionnelle, pas comme une sanction."},
    {q:"Dans quelle partie du SEEMP le Corrective Action Plan est-il inscrit ?",opts:["Part I","Part II","Part III","Aucune partie spécifique"],correct:2,expl:"Le Corrective Action Plan est inscrit dans la Part III du SEEMP, vue en Leçon 2."},
    {q:"Qui contribue directement à l'identification des causes d'une mauvaise notation CII ?",opts:["Uniquement la direction à terre","Le Chief Engineer et son équipe machine, qui connaissent les causes opérationnelles réelles","Uniquement l'affréteur","Uniquement l'assureur"],correct:1,expl:"Le Chief Engineer et son équipe machine connaissent le mieux les causes opérationnelles réelles d'une mauvaise notation."},
    {q:"Dans l'exemple opérationnel, combien d'actions le Chief Engineer propose-t-il à son équipe ?",opts:["Une seule","Deux","Quatre","Dix"],correct:2,expl:"Le Chief Engineer propose quatre actions concrètes : nettoyer la coque, polir l'hélice, optimiser la vitesse, réduire les périodes de ralenti."},
    {q:"Quelle est la compétence principale que cette leçon vise à transmettre ?",opts:["Savoir calculer soi-même le CII","Reconnaître les décisions quotidiennes qui influencent la notation CII, positivement ou négativement","Savoir réparer un moteur","Savoir négocier un contrat d'affrètement"],correct:1,expl:"Cette leçon vise à faire reconnaître les décisions quotidiennes qui influencent la notation CII, dans un sens ou dans l'autre."},
  ],
  en:[
    {q:"Is CII an isolated figure or a ratio?",opts:["An isolated figure","A ratio between actual emissions and the transport work carried out","The vessel's weight","The vessel's maximum speed"],correct:1,expl:"CII is a ratio between the vessel's actual emissions and the transport work it actually carried out over the year."},
    {q:"Does the annual CII reference threshold stay the same every year?",opts:["Yes, it never changes","No, it progressively tightens year after year","No, it loosens every year","Yes, except for tankers"],correct:1,expl:"The threshold progressively tightens, in line with the Net Zero trajectory seen in Lesson 1."},
    {q:"What does an A or B rating mean?",opts:["The vessel is below requirements","The vessel exceeds or is above the year's requirements","The vessel must be scrapped","The vessel has no rating at all"],correct:1,expl:"A and B ratings mean the vessel largely exceeds or is above the year's requirements."},
    {q:"What does a C rating mean?",opts:["The vessel is excellent","The vessel meets the year's requirements, with no particular margin","The vessel is non-compliant","The vessel requires serious improvement"],correct:1,expl:"A C rating means the vessel meets the year's requirements, with no particular margin."},
    {q:"Does a D rating two years in a row trigger a Corrective Action Plan?",opts:["No, never","Yes, it triggers a mandatory Corrective Action Plan","No, only an E rating triggers it","Yes, but only for tankers"],correct:1,expl:"A D rating two consecutive years triggers a mandatory Corrective Action Plan."},
    {q:"Does hull cleaning have an effect on CII?",opts:["No effect at all","Yes, it improves CII","No, it only concerns the vessel's appearance","Yes, but it worsens CII"],correct:1,expl:"Hull cleaning improves CII by reducing resistance and therefore fuel consumption."},
    {q:"Does voyage optimisation have an effect on CII?",opts:["No effect at all","Yes, it improves CII","No, only speed matters","Yes, but only on long voyages"],correct:1,expl:"Voyage optimisation improves CII by reducing emissions for the same transport work performed."},
    {q:"Does an unnecessary long ballast voyage have an effect on CII?",opts:["No effect at all","Yes, it worsens CII","No, ballast never has an impact","Yes, but it always improves CII"],correct:1,expl:"An unnecessary long ballast voyage worsens CII as it generates emissions without corresponding transport work."},
    {q:"Is weather a factor under the crew's control?",opts:["Yes, entirely","No, it is outside the crew's direct control","Yes, if the Master decides otherwise","No, but it has no impact on CII"],correct:1,expl:"Weather is a factor outside the crew's direct control, unlike fuel management or maintenance."},
    {q:"Is fuel management a factor under the engine team's control?",opts:["No, never","Yes, it is directly under the engine team's control","No, only the charterer controls it","Yes, but only in ECA zones"],correct:1,expl:"Fuel management is directly under the engine team's daily control."},
    {q:"Should the Corrective Action Plan be understood as a punishment?",opts:["Yes, it is always punitive","No, it is an opportunity to restore compliance through structured improvements","Yes, it always leads to a crew change","No, it has no concrete content"],correct:1,expl:"The Corrective Action Plan should be understood as a professional opportunity, not a sanction."},
    {q:"In which part of the SEEMP is the Corrective Action Plan recorded?",opts:["Part I","Part II","Part III","No specific part"],correct:2,expl:"The Corrective Action Plan is recorded in SEEMP Part III, seen in Lesson 2."},
    {q:"Who directly contributes to identifying the causes of a poor CII rating?",opts:["Only management ashore","The Chief Engineer and the engine team, who know the real operational causes","Only the charterer","Only the insurer"],correct:1,expl:"The Chief Engineer and the engine team know best the real operational causes of a poor rating."},
    {q:"In the operational example, how many actions does the Chief Engineer propose to the team?",opts:["Only one","Two","Four","Ten"],correct:2,expl:"The Chief Engineer proposes four concrete actions: cleaning the hull, polishing the propeller, optimizing speed, reducing idle periods."},
    {q:"What is the main skill this lesson aims to convey?",opts:["Knowing how to calculate CII yourself","Recognizing the daily decisions that influence CII rating, positively or negatively","Knowing how to repair an engine","Knowing how to negotiate a charter contract"],correct:1,expl:"This lesson aims to help recognize the daily decisions that influence CII rating, in either direction."},
  ],
  es:[
    {q:"¿Es el CII una cifra aislada o una razón?",opts:["Una cifra aislada","Una razón entre las emisiones reales y el trabajo de transporte realizado","El peso del buque","La velocidad máxima del buque"],correct:1,expl:"El CII es una razón entre las emisiones reales del buque y el trabajo de transporte que realmente realizó durante el año."},
    {q:"¿El umbral de referencia anual del CII permanece igual cada año?",opts:["Sí, nunca cambia","No, se estrecha progresivamente año tras año","No, se relaja cada año","Sí, excepto para petroleros"],correct:1,expl:"El umbral se estrecha progresivamente, en línea con la trayectoria Net Zero vista en la Lección 1."},
    {q:"¿Qué significa una calificación A o B?",opts:["El buque está por debajo de las exigencias","El buque supera o está por encima de las exigencias del año","El buque debe ser desguazado","El buque no tiene ninguna calificación"],correct:1,expl:"Las calificaciones A y B significan que el buque supera ampliamente o está por encima de las exigencias del año."},
    {q:"¿Qué significa una calificación C?",opts:["El buque es excelente","El buque cumple las exigencias del año, sin margen particular","El buque no es conforme","El buque necesita una mejora seria"],correct:1,expl:"La calificación C significa que el buque cumple las exigencias del año, sin margen particular."},
    {q:"¿Una calificación D dos años seguidos activa un Corrective Action Plan?",opts:["No, nunca","Sí, activa un Corrective Action Plan obligatorio","No, solo una calificación E lo activa","Sí, pero solo para petroleros"],correct:1,expl:"Una calificación D dos años consecutivos activa un Corrective Action Plan obligatorio."},
    {q:"¿La limpieza del casco tiene efecto en el CII?",opts:["Ningún efecto","Sí, mejora el CII","No, solo concierne a la apariencia del buque","Sí, pero empeora el CII"],correct:1,expl:"La limpieza del casco mejora el CII al reducir la resistencia y por tanto el consumo de combustible."},
    {q:"¿La optimización de viaje tiene efecto en el CII?",opts:["Ningún efecto","Sí, mejora el CII","No, solo importa la velocidad","Sí, pero solo en viajes largos"],correct:1,expl:"La optimización de viaje mejora el CII al reducir las emisiones para el mismo trabajo de transporte realizado."},
    {q:"¿Un viaje largo en lastre innecesario tiene efecto en el CII?",opts:["Ningún efecto","Sí, empeora el CII","No, el lastre nunca tiene impacto","Sí, pero siempre mejora el CII"],correct:1,expl:"Un viaje largo en lastre innecesario empeora el CII porque genera emisiones sin trabajo de transporte correspondiente."},
    {q:"¿El clima es un factor bajo el control de la tripulación?",opts:["Sí, totalmente","No, está fuera del control directo de la tripulación","Sí, si el Capitán decide lo contrario","No, pero no tiene impacto en el CII"],correct:1,expl:"El clima es un factor fuera del control directo de la tripulación, a diferencia de la gestión del combustible o el mantenimiento."},
    {q:"¿La gestión del combustible es un factor bajo el control del equipo de máquinas?",opts:["No, nunca","Sí, está directamente bajo el control del equipo de máquinas","No, solo el fletador lo controla","Sí, pero solo en zonas ECA"],correct:1,expl:"La gestión del combustible está directamente bajo el control diario del equipo de máquinas."},
    {q:"¿Debe entenderse el Corrective Action Plan como un castigo?",opts:["Sí, siempre es punitivo","No, es una oportunidad de restaurar el cumplimiento mediante mejoras estructuradas","Sí, siempre conlleva un cambio de tripulación","No, no tiene contenido concreto"],correct:1,expl:"El Corrective Action Plan debe entenderse como una oportunidad profesional, no como una sanción."},
    {q:"¿En qué parte del SEEMP se registra el Corrective Action Plan?",opts:["Part I","Part II","Part III","Ninguna parte específica"],correct:2,expl:"El Corrective Action Plan se registra en el SEEMP Part III, visto en la Lección 2."},
    {q:"¿Quién contribuye directamente a identificar las causas de una mala calificación CII?",opts:["Solo la dirección en tierra","El Jefe de Máquinas y su equipo, que conocen las causas operativas reales","Solo el fletador","Solo el asegurador"],correct:1,expl:"El Jefe de Máquinas y su equipo conocen mejor las causas operativas reales de una mala calificación."},
    {q:"En el ejemplo operativo, ¿cuántas acciones propone el Jefe de Máquinas a su equipo?",opts:["Solo una","Dos","Cuatro","Diez"],correct:2,expl:"El Jefe de Máquinas propone cuatro acciones concretas: limpiar el casco, pulir la hélice, optimizar la velocidad, reducir los periodos de ralentí."},
    {q:"¿Cuál es la principal competencia que esta lección busca transmitir?",opts:["Saber calcular uno mismo el CII","Reconocer las decisiones diarias que influyen en la calificación CII, positiva o negativamente","Saber reparar un motor","Saber negociar un contrato de fletamento"],correct:1,expl:"Esta lección busca ayudar a reconocer las decisiones diarias que influyen en la calificación CII, en cualquier sentido."},
  ],
  pt:[
    {q:"O CII é um número isolado ou uma razão?",opts:["Um número isolado","Uma razão entre as emissões reais e o trabalho de transporte realizado","O peso do navio","A velocidade máxima do navio"],correct:1,expl:"O CII é uma razão entre as emissões reais do navio e o trabalho de transporte que efetivamente realizou durante o ano."},
    {q:"O limite de referência anual do CII permanece igual todo ano?",opts:["Sim, nunca muda","Não, se estreita progressivamente ano após ano","Não, se relaxa a cada ano","Sim, exceto para petroleiros"],correct:1,expl:"O limite se estreita progressivamente, alinhado com a trajetória Net Zero vista na Lição 1."},
    {q:"O que significa uma classificação A ou B?",opts:["O navio está abaixo das exigências","O navio supera ou está acima das exigências do ano","O navio deve ser sucateado","O navio não tem nenhuma classificação"],correct:1,expl:"As classificações A e B significam que o navio supera amplamente ou está acima das exigências do ano."},
    {q:"O que significa uma classificação C?",opts:["O navio é excelente","O navio cumpre as exigências do ano, sem margem particular","O navio não é conforme","O navio precisa de melhoria séria"],correct:1,expl:"A classificação C significa que o navio cumpre as exigências do ano, sem margem particular."},
    {q:"Uma classificação D dois anos seguidos desencadeia um Corrective Action Plan?",opts:["Não, nunca","Sim, desencadeia um Corrective Action Plan obrigatório","Não, apenas uma classificação E o desencadeia","Sim, mas apenas para petroleiros"],correct:1,expl:"Uma classificação D dois anos consecutivos desencadeia um Corrective Action Plan obrigatório."},
    {q:"A limpeza do casco tem efeito no CII?",opts:["Nenhum efeito","Sim, melhora o CII","Não, diz respeito apenas à aparência do navio","Sim, mas piora o CII"],correct:1,expl:"A limpeza do casco melhora o CII ao reduzir a resistência e, portanto, o consumo de combustível."},
    {q:"A otimização de viagem tem efeito no CII?",opts:["Nenhum efeito","Sim, melhora o CII","Não, só a velocidade importa","Sim, mas apenas em viagens longas"],correct:1,expl:"A otimização de viagem melhora o CII ao reduzir as emissões para o mesmo trabalho de transporte realizado."},
    {q:"Uma longa viagem em lastro desnecessária tem efeito no CII?",opts:["Nenhum efeito","Sim, piora o CII","Não, o lastro nunca tem impacto","Sim, mas sempre melhora o CII"],correct:1,expl:"Uma longa viagem em lastro desnecessária piora o CII porque gera emissões sem trabalho de transporte correspondente."},
    {q:"O clima é um fator sob o controlo da tripulação?",opts:["Sim, totalmente","Não, está fora do controlo direto da tripulação","Sim, se o Comandante decidir de outra forma","Não, mas não tem impacto no CII"],correct:1,expl:"O clima é um fator fora do controlo direto da tripulação, ao contrário da gestão de combustível ou manutenção."},
    {q:"A gestão de combustível é um fator sob o controlo da equipa de máquinas?",opts:["Não, nunca","Sim, está diretamente sob o controlo da equipa de máquinas","Não, só o afretador o controla","Sim, mas apenas em zonas ECA"],correct:1,expl:"A gestão de combustível está diretamente sob o controlo diário da equipa de máquinas."},
    {q:"O Corrective Action Plan deve ser entendido como uma punição?",opts:["Sim, é sempre punitivo","Não, é uma oportunidade de restaurar a conformidade através de melhorias estruturadas","Sim, sempre leva a uma troca de tripulação","Não, não tem conteúdo concreto"],correct:1,expl:"O Corrective Action Plan deve ser entendido como uma oportunidade profissional, não como uma sanção."},
    {q:"Em qual parte do SEEMP o Corrective Action Plan é registado?",opts:["Part I","Part II","Part III","Nenhuma parte específica"],correct:2,expl:"O Corrective Action Plan é registado na Part III do SEEMP, vista na Lição 2."},
    {q:"Quem contribui diretamente para identificar as causas de uma classificação CII ruim?",opts:["Apenas a direção em terra","O Chefe de Máquinas e sua equipa, que conhecem as causas operacionais reais","Apenas o afretador","Apenas o segurador"],correct:1,expl:"O Chefe de Máquinas e sua equipa conhecem melhor as causas operacionais reais de uma classificação ruim."},
    {q:"No exemplo operacional, quantas ações o Chefe de Máquinas propõe à equipa?",opts:["Apenas uma","Duas","Quatro","Dez"],correct:2,expl:"O Chefe de Máquinas propõe quatro ações concretas: limpar o casco, polir a hélice, otimizar a velocidade, reduzir os períodos de marcha lenta."},
    {q:"Qual é a principal competência que esta lição visa transmitir?",opts:["Saber calcular sozinho o CII","Reconhecer as decisões diárias que influenciam a classificação CII, positiva ou negativamente","Saber reparar um motor","Saber negociar um contrato de afretamento"],correct:1,expl:"Esta lição visa ajudar a reconhecer as decisões diárias que influenciam a classificação CII, em qualquer sentido."},
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
      badge:"🍃 Module Machine · Leçon 4/5 · ⭐ Premium · 200 XP",
      title:"Le CII & les notations A-E",
      intro:"La Leçon 3 a comparé l'EEXI à un permis de conduire - figé, obtenu une fois. Cette leçon détaille le CII, le bulletin de conduite annuel du navire, qui dépend directement des décisions opérationnelles prises chaque jour à bord.",
      p1:"PARTIE 1 - COMMENT FONCTIONNE LE CII",
      s1:"Aucune formule ici - seulement le principe et une nuance essentielle : le CII évalue une année d'exploitation, pas le navire lui-même.",
      p2:"PARTIE 2 - LES NOTATIONS A À E",
      s2:"Cinq lettres, cinq niveaux de conformité - à retenir durablement grâce à leurs couleurs distinctes.",
      p3:"PARTIE 3 - CHAQUE DÉCISION OPÉRATIONNELLE INFLUENCE LE CII",
      s3:"Le cœur de cette leçon. Ce tableau résume exactement ce qu'un officier machine rencontre au quotidien.",
      p4:"PARTIE 4 - CE QUE TU PEUX INFLUENCER",
      s4:"Distinguer ce qui dépend de toi de ce qui n'en dépend pas évite la frustration et concentre l'énergie là où elle compte.",
      p5:"PARTIE 5 - LE CORRECTIVE ACTION PLAN",
      s5:"Une notation insuffisante n'est pas une fin en soi - c'est le point de départ d'un plan d'action structuré.",
      p6:"PARTIE 6 - SIMULATEUR",
      p7:"PARTIE 7 - EXERCICE",
      p8:"PARTIE 8 - EXEMPLE OPÉRATIONNEL",
      p9:"PARTIE 9 - BANQUE DE QUESTIONS",
      closingPhrase:"Chaque voyage écrit une partie de l'histoire CII de ton navire. Chaque décision laisse une trace.",
      sumT:"POINTS CLÉS",
      sumP:[
        "Le CII reflète une année d'exploitation, pas seulement la conception du navire",
        "Cinq notations : A/B (au-dessus des exigences), C (conforme), D/E (amélioration requise)",
        "Une notation D deux années de suite, ou une notation E une seule fois, déclenche un Corrective Action Plan",
        "Slow steaming, nettoyage de coque, polissage d'hélice et optimisation de voyage améliorent le CII",
        "Vitesse excessive, ballast inutile, mauvaise maintenance et inefficacité moteur dégradent le CII",
        "Le Corrective Action Plan est une opportunité professionnelle, pas une sanction punitive",
      ],
      learnedP:[
        "Comprendre ce que le CII évalue réellement, année après année",
        "Distinguer les cinq notations A à E et leurs conséquences",
        "Identifier les décisions quotidiennes qui améliorent ou dégradent le CII",
        "Distinguer ce qui dépend de moi de ce qui n'en dépend pas",
        "Je sais que mes décisions quotidiennes s'accumulent dans la notation CII annuelle du navire",
      ],
    },
    en:{
      badge:"🍃 Engine Module · Lesson 4/5 · ⭐ Premium · 200 XP",
      title:"The CII & A-E Ratings",
      intro:"Lesson 3 compared EEXI to a driving licence - fixed, obtained once. This lesson details the CII, the vessel's annual driving record, which directly depends on the operational decisions made every day on board.",
      p1:"PART 1 - HOW THE CII WORKS",
      s1:"No formula here - just the principle and an essential nuance: CII assesses a year of operation, not the vessel itself.",
      p2:"PART 2 - THE A TO E RATINGS",
      s2:"Five letters, five levels of compliance - firmly memorable thanks to their distinct colors.",
      p3:"PART 3 - EVERY OPERATIONAL DECISION INFLUENCES CII",
      s3:"The heart of this lesson. This table summarizes exactly what an engine officer faces daily.",
      p4:"PART 4 - WHAT YOU CAN INFLUENCE",
      s4:"Distinguishing what depends on you from what doesn't avoids frustration and focuses energy where it matters.",
      p5:"PART 5 - THE CORRECTIVE ACTION PLAN",
      s5:"An insufficient rating is not an end in itself - it is the starting point of a structured action plan.",
      p6:"PART 6 - SIMULATOR",
      p7:"PART 7 - EXERCISE",
      p8:"PART 8 - OPERATIONAL EXAMPLE",
      p9:"PART 9 - QUESTION BANK",
      closingPhrase:"Every voyage writes part of your ship's CII story. Every decision leaves a mark.",
      sumT:"KEY POINTS",
      sumP:[
        "CII reflects a year of operation, not just the vessel's design",
        "Five ratings: A/B (above requirements), C (compliant), D/E (improvement required)",
        "A D rating two years in a row, or a single E rating, triggers a Corrective Action Plan",
        "Slow steaming, hull cleaning, propeller polishing and voyage optimisation improve CII",
        "Excessive speed, unnecessary ballast, poor maintenance and engine inefficiency worsen CII",
        "The Corrective Action Plan is a professional opportunity, not a punitive sanction",
      ],
      learnedP:[
        "Understand what CII actually assesses, year after year",
        "Distinguish the five A to E ratings and their consequences",
        "Identify the daily decisions that improve or worsen CII",
        "Distinguish what depends on me from what doesn't",
        "I know my daily decisions accumulate into the ship's annual CII rating",
      ],
    },
    es:{
      badge:"🍃 Módulo Máquinas · Lección 4/5 · ⭐ Premium · 200 XP",
      title:"El CII y las calificaciones A-E",
      intro:"La Lección 3 comparó el EEXI con un carné de conducir - fijo, obtenido una vez. Esta lección detalla el CII, el historial de conducción anual del buque, que depende directamente de las decisiones operativas tomadas cada día a bordo.",
      p1:"PARTE 1 - CÓMO FUNCIONA EL CII",
      s1:"Sin fórmulas aquí - solo el principio y un matiz esencial: el CII evalúa un año de explotación, no el buque en sí.",
      p2:"PARTE 2 - LAS CALIFICACIONES A A E",
      s2:"Cinco letras, cinco niveles de cumplimiento - fáciles de recordar gracias a sus colores distintos.",
      p3:"PARTE 3 - CADA DECISIÓN OPERATIVA INFLUYE EN EL CII",
      s3:"El corazón de esta lección. Esta tabla resume exactamente lo que un oficial de máquinas enfrenta a diario.",
      p4:"PARTE 4 - LO QUE PUEDES INFLUIR",
      s4:"Distinguir lo que depende de ti de lo que no depende evita la frustración y concentra la energía donde importa.",
      p5:"PARTE 5 - EL CORRECTIVE ACTION PLAN",
      s5:"Una calificación insuficiente no es un fin en sí mismo - es el punto de partida de un plan de acción estructurado.",
      p6:"PARTE 6 - SIMULADOR",
      p7:"PARTE 7 - EJERCICIO",
      p8:"PARTE 8 - EJEMPLO OPERATIVO",
      p9:"PARTE 9 - BANCO DE PREGUNTAS",
      closingPhrase:"Cada viaje escribe una parte de la historia CII de tu buque. Cada decisión deja una marca.",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "El CII refleja un año de explotación, no solo el diseño del buque",
        "Cinco calificaciones: A/B (por encima de exigencias), C (conforme), D/E (mejora requerida)",
        "Una calificación D dos años seguidos, o una sola calificación E, activa un Corrective Action Plan",
        "Slow steaming, limpieza de casco, pulido de hélice y optimización de viaje mejoran el CII",
        "Velocidad excesiva, lastre innecesario, mal mantenimiento e ineficiencia del motor empeoran el CII",
        "El Corrective Action Plan es una oportunidad profesional, no una sanción punitiva",
      ],
      learnedP:[
        "Comprender qué evalúa realmente el CII, año tras año",
        "Distinguir las cinco calificaciones A a E y sus consecuencias",
        "Identificar las decisiones diarias que mejoran o empeoran el CII",
        "Distinguir lo que depende de mí de lo que no depende",
        "Sé que mis decisiones diarias se acumulan en la calificación CII anual del buque",
      ],
    },
    pt:{
      badge:"🍃 Módulo Máquinas · Lição 4/5 · ⭐ Premium · 200 XP",
      title:"O CII e as classificações A-E",
      intro:"A Lição 3 comparou o EEXI a uma carta de condução - fixa, obtida uma vez. Esta lição detalha o CII, o histórico de condução anual do navio, que depende diretamente das decisões operacionais tomadas todos os dias a bordo.",
      p1:"PARTE 1 - COMO FUNCIONA O CII",
      s1:"Sem fórmulas aqui - apenas o princípio e uma nuance essencial: o CII avalia um ano de operação, não o navio em si.",
      p2:"PARTE 2 - AS CLASSIFICAÇÕES A A E",
      s2:"Cinco letras, cinco níveis de conformidade - fáceis de memorizar graças às suas cores distintas.",
      p3:"PARTE 3 - CADA DECISÃO OPERACIONAL INFLUENCIA O CII",
      s3:"O coração desta lição. Esta tabela resume exatamente o que um oficial de máquinas enfrenta diariamente.",
      p4:"PARTE 4 - O QUE VOCÊ PODE INFLUENCIAR",
      s4:"Distinguir o que depende de você do que não depende evita a frustração e concentra a energia onde importa.",
      p5:"PARTE 5 - O CORRECTIVE ACTION PLAN",
      s5:"Uma classificação insuficiente não é um fim em si mesma - é o ponto de partida de um plano de ação estruturado.",
      p6:"PARTE 6 - SIMULADOR",
      p7:"PARTE 7 - EXERCÍCIO",
      p8:"PARTE 8 - EXEMPLO OPERACIONAL",
      p9:"PARTE 9 - BANCO DE QUESTÕES",
      closingPhrase:"Cada viagem escreve parte da história CII do seu navio. Cada decisão deixa uma marca.",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "O CII reflete um ano de operação, não apenas o design do navio",
        "Cinco classificações: A/B (acima das exigências), C (conforme), D/E (melhoria necessária)",
        "Uma classificação D dois anos seguidos, ou uma única classificação E, desencadeia um Corrective Action Plan",
        "Slow steaming, limpeza do casco, polimento da hélice e otimização de viagem melhoram o CII",
        "Velocidade excessiva, lastro desnecessário, má manutenção e ineficiência do motor pioram o CII",
        "O Corrective Action Plan é uma oportunidade profissional, não uma sanção punitiva",
      ],
      learnedP:[
        "Compreender o que o CII realmente avalia, ano após ano",
        "Distinguir as cinco classificações A a E e suas consequências",
        "Identificar as decisões diárias que melhoram ou pioram o CII",
        "Distinguir o que depende de mim do que não depende",
        "Sei que minhas decisões diárias se acumulam na classificação CII anual do navio",
      ],
    },
  };
  return d[lang] || d.fr;
};

export default function LessonSEEMP_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/5":lang==="en"?"Lesson 4/5":lang==="es"?"Lección 4/5":"Lição 4/5"}</div>
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

            <SL icon="⚖️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚖️ {lang==="fr"?"CII - INTERACTIF":lang==="en"?"CII - INTERACTIVE":"CII - INTERACTIVO"}</div>
              <CIIOverviewSVG lang={lang}/>
            </Card>

            <SL icon="🎖️" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <RatingsSVG lang={lang}/>
            </Card>

            <SL icon="📊" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <DecisionTable lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,marginBottom:12}}>{lc.s4}</div>
              <InfluenceColumns lang={lang}/>
            </Card>

            <SL icon="🌱" text={lc.p5} color={C.green}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,marginBottom:12}}>{lc.s5}</div>
              <CorrectiveActionPlan lang={lang}/>
            </Card>

            <SL icon="🎮" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><DecisionsSimulator lang={lang}/></Card>

            <SL icon="🎯" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><CIIChecklist lang={lang}/></Card>

            <SL icon="👥" text={lc.p8} color={C.blue2}/>
            <div style={{marginBottom:14}}><OperationalExample lang={lang}/></div>

            <SL icon="📝" text={lc.p9} color={C.purple}/>
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
                {lang==="fr"?"Quiz - Le CII":lang==="en"?"Quiz - The CII":lang==="es"?"Quiz - El CII":"Quiz - O CII"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 4":lang==="en"?"Lesson 4":lang==="es"?"Lección 4":"Lição 4"}</div>
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
              {lang==="fr"?"LEÇON 5 - EFFICACITÉ ÉNERGÉTIQUE PRATIQUE →":lang==="en"?"LESSON 5 - PRACTICAL ENERGY EFFICIENCY →":lang==="es"?"LECCIÓN 5 - EFICIENCIA ENERGÉTICA PRÁCTICA →":"LIÇÃO 5 - EFICIÊNCIA ENERGÉTICA PRÁTICA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
