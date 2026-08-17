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
// SVG 1 - THE THREE PARTS OF THE SEEMP
// ══════════════════════════════════════
function SEEMPPartsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"part1", icon:"📘", color:C.blue2,
      label:{fr:"Part I",en:"Part I",es:"Part I",pt:"Part I"},
      desc:{fr:"Decrit les mesures d'amelioration de l'efficacite energetique adoptees par le navire - optimisation de vitesse, entretien de coque, gestion de la puissance, entre autres leviers detailles en Lecon 5.",en:"Describes the energy efficiency improvement measures adopted by the vessel - speed optimization, hull maintenance, power management, among other levers detailed in Lesson 5.",es:"Describe las medidas de mejora de la eficiencia energetica adoptadas por el buque - optimizacion de velocidad, mantenimiento del casco, gestion de potencia, entre otras palancas detalladas en la Leccion 5.",pt:"Descreve as medidas de melhoria da eficiencia energetica adotadas pelo navio - otimizacao de velocidade, manutencao do casco, gestao de potencia, entre outras alavancas detalhadas na Licao 5."} },
    { id:"part2", icon:"📊", color:C.gold2,
      label:{fr:"Part II",en:"Part II",es:"Part II",pt:"Part II"},
      desc:{fr:"Organise la collecte des donnees de consommation de carburant, obligatoire pour le systeme de collecte de donnees (DCS) de l'OMI. C'est ici que les releves quotidiens de l'equipage machine trouvent leur utilite reglementaire.",en:"Organizes the collection of fuel consumption data, mandatory for the IMO Data Collection System (DCS). This is where the engine crew's daily readings find their regulatory purpose.",es:"Organiza la recopilacion de datos de consumo de combustible, obligatoria para el sistema de recopilacion de datos (DCS) de la OMI. Aqui es donde las lecturas diarias de la tripulacion de maquinas encuentran su utilidad reglamentaria.",pt:"Organiza a recolha de dados de consumo de combustivel, obrigatoria para o sistema de recolha de dados (DCS) da OMI. E aqui que as leituras diarias da tripulacao de maquinas encontram sua utilidade regulamentar."} },
    { id:"part3", icon:"📋", color:C.teal,
      label:{fr:"Part III",en:"Part III",es:"Part III",pt:"Part III"},
      desc:{fr:"Contient le plan de mise en oeuvre lie au CII et le Corrective Action Plan en cas de notation insuffisante - un simple apercu ici, le detail complet arrive en Lecon 4.",en:"Contains the CII implementation plan and the Corrective Action Plan in case of an insufficient rating - just a brief overview here, full detail comes in Lesson 4.",es:"Contiene el plan de implementacion vinculado al CII y el Corrective Action Plan en caso de calificacion insuficiente - solo una vista general aqui, el detalle completo llega en la Leccion 4.",pt:"Contem o plano de implementacao ligado ao CII e o Corrective Action Plan em caso de classificacao insuficiente - apenas uma visao geral aqui, o detalhe completo vem na Licao 4."} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <div style={{padding:"10px 12px",marginBottom:10,borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,fontSize:12,color:C.gold2,lineHeight:1.6,fontWeight:600,textAlign:"center"}}>
        {lang==="fr"?"Le SEEMP est obligatoire pour la plupart des navires effectuant des voyages internationaux, conformément à MARPOL Annexe VI.":lang==="en"?"The SEEMP is mandatory for most ships engaged on international voyages under MARPOL Annex VI.":lang==="es"?"El SEEMP es obligatorio para la mayoría de los buques en viajes internacionales, conforme al Anexo VI de MARPOL.":"O SEEMP é obrigatório para a maioria dos navios em viagens internacionais, conforme o Anexo VI do MARPOL."}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"12px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{it.icon}</div>
            <div style={{fontSize:11,color:sel===it.id?it.color:C.muted,fontWeight:700}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une partie pour les détails":lang==="en"?"Tap a part for details":lang==="es"?"Toca una parte para detalles":"Toque numa parte para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// ROLES CHAIN - WHO KEEPS THE SEEMP UPDATED
// ══════════════════════════════════════
function RolesChain({ lang }) {
  const roles = [
    { icon:"🏢", label:{fr:"Compagnie",en:"Company",es:"Compañía",pt:"Empresa"}, desc:{fr:"Rédige et fait approuver le SEEMP",en:"Drafts and gets the SEEMP approved",es:"Redacta y hace aprobar el SEEMP",pt:"Redige e faz aprovar o SEEMP"} },
    { icon:"👨‍✈️", label:{fr:"Capitaine",en:"Master",es:"Capitán",pt:"Comandante"}, desc:{fr:"Supervise l'application à bord",en:"Oversees application on board",es:"Supervisa la aplicación a bordo",pt:"Supervisiona a aplicação a bordo"} },
    { icon:"⚙️", label:{fr:"Chef Mécanicien",en:"Chief Engineer",es:"Jefe de Máquinas",pt:"Chefe de Máquinas"}, desc:{fr:"Coordonne la collecte de données machine",en:"Coordinates engine data collection",es:"Coordina la recopilación de datos de máquinas",pt:"Coordena a recolha de dados de máquinas"} },
    { icon:"👨‍🔧", label:{fr:"Officiers machine",en:"Engine Officers",es:"Oficiales de máquinas",pt:"Oficiais de máquinas"}, desc:{fr:"Effectuent les relevés quotidiens",en:"Perform daily readings",es:"Realizan las lecturas diarias",pt:"Realizam as leituras diárias"} },
    { icon:"👷", label:{fr:"Équipage",en:"Crew",es:"Tripulación",pt:"Tripulação"}, desc:{fr:"Applique les mesures au quotidien",en:"Applies the measures daily",es:"Aplica las medidas a diario",pt:"Aplica as medidas diariamente"} },
  ];
  return (
    <div>
      {roles.map((r,i)=>(
        <div key={i}>
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
            <span style={{fontSize:24,flexShrink:0}}>{r.icon}</span>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:C.white}}>{r.label[lang]||r.label.fr}</div>
              <div style={{fontSize:10,color:C.muted,lineHeight:1.4}}>{r.desc[lang]||r.desc.fr}</div>
            </div>
          </div>
          {i<roles.length-1&&<div style={{textAlign:"center",fontSize:14,color:C.gold,padding:"2px 0"}}>↓</div>}
        </div>
      ))}
      <div style={{marginTop:8,textAlign:"center",fontSize:11,color:C.gold2,fontStyle:"italic"}}>
        {lang==="fr"?"Le SEEMP est un travail collectif, pas la responsabilité d'une seule personne.":lang==="en"?"The SEEMP is collective work, not one person's sole responsibility.":lang==="es"?"El SEEMP es un trabajo colectivo, no la responsabilidad de una sola persona.":"O SEEMP é um trabalho coletivo, não a responsabilidade de uma única pessoa."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 - CONTINUOUS IMPROVEMENT CYCLE (CIRCULAR)
// ══════════════════════════════════════
function CycleSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:"plan", icon:"🎯", color:C.blue2, pos:{top:0,left:"50%",transform:"translate(-50%,0)"},
      label:{fr:"PLAN",en:"PLAN",es:"PLAN",pt:"PLAN"},
      desc:{fr:"Fixer un objectif mesurable - par exemple, reduire la consommation moyenne de carburant sur une route donnee, ou ameliorer un aspect specifique du SEEMP Part I.",en:"Set a measurable goal - for example, reducing average fuel consumption on a given route, or improving a specific aspect of SEEMP Part I.",es:"Fijar un objetivo medible - por ejemplo, reducir el consumo promedio de combustible en una ruta dada, o mejorar un aspecto especifico del SEEMP Part I.",pt:"Fixar um objetivo mensuravel - por exemplo, reduzir o consumo medio de combustivel numa rota dada, ou melhorar um aspeto especifico do SEEMP Part I."} },
    { id:"monitor", icon:"📡", color:C.teal, pos:{top:"50%",right:0,transform:"translate(0,-50%)"},
      label:{fr:"MONITOR",en:"MONITOR",es:"MONITOR",pt:"MONITOR"},
      desc:{fr:"Collecter les donnees reelles au quotidien - releves de consommation, conditions meteo, vitesse - exactement ce qu'alimente le SEEMP Part II.",en:"Collect real data daily - consumption readings, weather conditions, speed - exactly what feeds SEEMP Part II.",es:"Recopilar datos reales a diario - lecturas de consumo, condiciones meteorologicas, velocidad - exactamente lo que alimenta el SEEMP Part II.",pt:"Recolher dados reais diariamente - leituras de consumo, condicoes meteorologicas, velocidade - exatamente o que alimenta o SEEMP Part II."} },
    { id:"evaluate", icon:"🔍", color:C.gold2, pos:{bottom:0,left:"50%",transform:"translate(-50%,0)"},
      label:{fr:"EVALUATE",en:"EVALUATE",es:"EVALUATE",pt:"EVALUATE"},
      desc:{fr:"Comparer les donnees collectees a l'objectif fixe et aux periodes precedentes - identifier ce qui fonctionne et ce qui ne fonctionne pas.",en:"Compare the collected data to the set goal and to previous periods - identify what works and what does not.",es:"Comparar los datos recopilados con el objetivo fijado y con periodos anteriores - identificar que funciona y que no.",pt:"Comparar os dados recolhidos com o objetivo fixado e com periodos anteriores - identificar o que funciona e o que nao funciona."} },
    { id:"improve", icon:"🔄", color:C.red, pos:{top:"50%",left:0,transform:"translate(0,-50%)"},
      label:{fr:"IMPROVE",en:"IMPROVE",es:"IMPROVE",pt:"IMPROVE"},
      desc:{fr:"Ajuster les procedures en fonction de l'evaluation - puis repartir vers un nouveau Plan. Le cycle ne s'arrete jamais, c'est ce qui en fait une methode d'amelioration continue.",en:"Adjust procedures based on the evaluation - then move back to a new Plan. The cycle never stops, which is what makes it a continuous improvement method.",es:"Ajustar los procedimientos segun la evaluacion - luego volver a un nuevo Plan. El ciclo nunca se detiene, eso es lo que lo convierte en un metodo de mejora continua.",pt:"Ajustar os procedimentos com base na avaliacao - depois voltar a um novo Plan. O ciclo nunca para, e isso que o torna um metodo de melhoria continua."} },
  ];
  const sel_ = sel ? steps.find(s=>s.id===sel) : null;
  return (
    <div>
      <div style={{position:"relative",width:220,height:220,margin:"10px auto 16px"}}>
        <div style={{position:"absolute",inset:20,borderRadius:"50%",border:`2px dashed ${C.gold}33`}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:22,color:C.gold,opacity:0.5}}>↺</div>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{
            position:"absolute",...s.pos,width:76,height:76,borderRadius:"50%",
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            cursor:"pointer",textAlign:"center",
            background:sel===s.id?`${s.color}33`:"rgba(13,31,60,0.9)",
            border:`2px solid ${sel===s.id?s.color:s.color+"66"}`,
            boxShadow:sel===s.id?`0 0 16px ${s.color}66`:"none",
          }}>
            <div style={{fontSize:18}}>{s.icon}</div>
            <div style={{fontSize:8,fontWeight:800,color:s.color,letterSpacing:0.5,marginTop:2}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une étape du cycle pour les détails":lang==="en"?"Tap a cycle step for details":lang==="es"?"Toca una etapa del ciclo para detalles":"Toque numa etapa do ciclo para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SECTION 4 - GOOD vs POOR SEEMP TABLE
// ══════════════════════════════════════
function SEEMPCompareTable({ lang }) {
  const rows = {
    fr:[["Mis à jour régulièrement","Jamais mis à jour"],["Équipage impliqué","Simple exercice papier"],["Données analysées","Données ignorées"],["Actions mises en œuvre","Aucun suivi"]],
    en:[["Updated regularly","Never updated"],["Crew involved","Paper exercise"],["Data analysed","Data ignored"],["Actions implemented","No follow-up"]],
    es:[["Actualizado regularmente","Nunca actualizado"],["Tripulación involucrada","Simple ejercicio de papel"],["Datos analizados","Datos ignorados"],["Acciones implementadas","Sin seguimiento"]],
    pt:[["Atualizado regularmente","Nunca atualizado"],["Tripulação envolvida","Simples exercício de papel"],["Dados analisados","Dados ignorados"],["Ações implementadas","Sem acompanhamento"]],
  };
  const list = rows[lang]||rows.fr;
  const headers = {fr:["✅ Bon SEEMP","❌ SEEMP défaillant"],en:["✅ Good SEEMP","❌ Poor SEEMP"],es:["✅ Buen SEEMP","❌ SEEMP deficiente"],pt:["✅ Bom SEEMP","❌ SEEMP deficiente"]};
  const h = headers[lang]||headers.fr;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        <div style={{fontSize:11,fontWeight:700,color:C.green,textAlign:"center",padding:"6px 0"}}>{h[0]}</div>
        <div style={{fontSize:11,fontWeight:700,color:C.red,textAlign:"center",padding:"6px 0"}}>{h[1]}</div>
      </div>
      {list.map((row,i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:6}}>
          <div style={{padding:"8px 10px",borderRadius:10,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}33`,fontSize:11,color:C.white,textAlign:"center"}}>{row[0]}</div>
          <div style={{padding:"8px 10px",borderRadius:10,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}33`,fontSize:11,color:C.white,textAlign:"center"}}>{row[1]}</div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// SEEMP ENGAGEMENT CHECKLIST
// ══════════════════════════════════════
function SEEMPChecklist({ lang }) {
  const items = {
    fr:["Je sais où trouver le SEEMP à bord","Je comprends à quelle partie appartiennent mes données de consommation","Je participe activement au cycle d'amélioration continue","Je sais qui est responsable de la mise à jour du SEEMP à bord"],
    en:["I know where to find the SEEMP on board","I understand which part my consumption data belongs to","I actively participate in the continuous improvement cycle","I know who is responsible for updating the SEEMP onboard"],
    es:["Sé dónde encontrar el SEEMP a bordo","Entiendo a qué parte pertenecen mis datos de consumo","Participo activamente en el ciclo de mejora continua","Sé quién es responsable de actualizar el SEEMP a bordo"],
    pt:["Sei onde encontrar o SEEMP a bordo","Entendo a que parte pertencem meus dados de consumo","Participo ativamente do ciclo de melhoria contínua","Sei quem é responsável por atualizar o SEEMP a bordo"],
  };
  const title = {fr:"Checklist - Engagement SEEMP",en:"SEEMP Engagement Checklist",es:"Checklist - Compromiso SEEMP",pt:"Checklist - Compromisso SEEMP"};
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
// EXERCISE - CLASSIFY 5 ACTIONS INTO THE CYCLE
// ══════════════════════════════════════
function Exercise2({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC,setShowC]=useState(false);
  const correct={q1:"plan",q2:"monitor",q3:"evaluate",q4:"improve",q5:"monitor"};
  const qs={
    fr:[
      {id:"q1",q:"Fixer un objectif de réduction de consommation de 5% sur la prochaine traversée."},
      {id:"q2",q:"Relever quotidiennement la consommation de carburant et la vitesse du navire."},
      {id:"q3",q:"Comparer les données du mois avec celles du mois précédent."},
      {id:"q4",q:"Ajuster la procédure de démarrage des pompes suite à une analyse."},
      {id:"q5",q:"Enregistrer les conditions météo rencontrées durant le voyage."},
    ],
    en:[
      {id:"q1",q:"Setting a 5% consumption reduction target for the next crossing."},
      {id:"q2",q:"Recording fuel consumption and vessel speed daily."},
      {id:"q3",q:"Comparing this month's data with last month's."},
      {id:"q4",q:"Adjusting the pump start-up procedure following an analysis."},
      {id:"q5",q:"Logging the weather conditions encountered during the voyage."},
    ],
    es:[
      {id:"q1",q:"Fijar un objetivo de reducción de consumo del 5% para la próxima travesía."},
      {id:"q2",q:"Registrar diariamente el consumo de combustible y la velocidad del buque."},
      {id:"q3",q:"Comparar los datos del mes con los del mes anterior."},
      {id:"q4",q:"Ajustar el procedimiento de arranque de bombas tras un análisis."},
      {id:"q5",q:"Registrar las condiciones meteorológicas encontradas durante el viaje."},
    ],
    pt:[
      {id:"q1",q:"Fixar um objetivo de redução de consumo de 5% para a próxima travessia."},
      {id:"q2",q:"Registar diariamente o consumo de combustível e a velocidade do navio."},
      {id:"q3",q:"Comparar os dados do mês com os do mês anterior."},
      {id:"q4",q:"Ajustar o procedimento de arranque das bombas após uma análise."},
      {id:"q5",q:"Registar as condições meteorológicas encontradas durante a viagem."},
    ],
  };
  const list=qs[lang]||qs.fr;
  const opts=["plan","monitor","evaluate","improve"];
  const optLabels={plan:"PLAN",monitor:"MONITOR",evaluate:"EVALUATE",improve:"IMPROVE"};
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.green}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Classe chaque action dans l'étape du cycle qui lui correspond":lang==="en"?"💡 Classify each action into the matching cycle step":lang==="es"?"💡 Clasifica cada acción en la etapa del ciclo correspondiente":"💡 Classifique cada ação na etapa do ciclo correspondente"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:14}}>
          <div style={{fontSize:12,color:C.white,marginBottom:8,lineHeight:1.5,fontWeight:600}}>{i+1}. {q.q}</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {opts.map(o=>(
              <button key={o} onClick={()=>setAns(a=>({...a,[q.id]:o}))} style={{
                padding:"7px 12px",borderRadius:10,fontSize:10,fontWeight:700,cursor:"pointer",
                background:ans[q.id]===o?`${C.gold}33`:"rgba(255,255,255,0.05)",
                border:`1.5px solid ${ans[q.id]===o?C.gold:"rgba(255,255,255,0.1)"}`,
                color:ans[q.id]===o?C.gold2:C.muted,
              }}>{optLabels[o]}</button>
            ))}
          </div>
          {showC&&<div style={{fontSize:11,marginTop:6,fontWeight:600,color:ans[q.id]===correct[q.id]?C.green:C.red}}>{ans[q.id]===correct[q.id]?"✓ Correct":`✗ → ${optLabels[correct[q.id]]}`}</div>}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// OPERATIONAL EXAMPLE (replaces AccidentCase)
// ══════════════════════════════════════
function OperationalExample({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Exemple opérationnel",teaser:"Un navire constate une hausse de 8% de sa consommation de carburant sur trois mois",
      what:"Un navire constate que sa consommation de carburant a augmente de 8% sur les trois derniers mois, sans changement evident de route ou de charge. Comment le cycle d'amelioration continue s'applique-t-il a cette situation ?",
      cause:"• PLAN : quel objectif l'equipe machine devrait-elle fixer face a cette derive ?\n• MONITOR : quelles donnees supplementaires faudrait-il collecter pour comprendre la cause ?\n• EVALUATE : a quelles periodes ou conditions comparer ces chiffres ?\n• IMPROVE : quelles actions correctives pourraient etre envisagees une fois la cause identifiee (encrassement de coque ? derive d'un equipement ? changement de conditions meteo non compense ?) ",
      lessons:"✓ Une derive de consommation n'est jamais anodine - elle doit toujours declencher le cycle Plan-Monitor-Evaluate-Improve\n✓ Le SEEMP prend tout son sens quand il permet de transformer une simple observation en action corrective concrete\n✓ Les leviers pratiques pour repondre a ce type de situation seront detailles en Lecon 5 (encrassement de coque, optimisation de vitesse...)"},
    en:{title:"Operational Example",teaser:"A vessel notices fuel consumption has increased by 8% over three months",
      what:"A vessel notices its fuel consumption has increased by 8% over the last three months, with no obvious change in route or load. How does the continuous improvement cycle apply to this situation?",
      cause:"• PLAN: what goal should the engine team set in response to this drift?\n• MONITOR: what additional data should be collected to understand the cause?\n• EVALUATE: which periods or conditions should these figures be compared against?\n• IMPROVE: what corrective actions could be considered once the cause is identified (hull fouling? equipment drift? uncompensated weather change?)",
      lessons:"✓ A consumption drift is never trivial - it should always trigger the Plan-Monitor-Evaluate-Improve cycle\n✓ The SEEMP takes on its full meaning when it turns a simple observation into a concrete corrective action\n✓ Practical levers to address this type of situation will be detailed in Lesson 5 (hull fouling, speed optimization...)"},
    es:{title:"Ejemplo operativo",teaser:"Un buque nota que su consumo de combustible ha aumentado un 8% en tres meses",
      what:"Un buque nota que su consumo de combustible ha aumentado un 8% en los ultimos tres meses, sin un cambio evidente de ruta o carga. ¿Como se aplica el ciclo de mejora continua a esta situacion?",
      cause:"• PLAN: ¿que objetivo deberia fijar el equipo de maquinas ante esta deriva?\n• MONITOR: ¿que datos adicionales habria que recopilar para entender la causa?\n• EVALUATE: ¿con que periodos o condiciones comparar estas cifras?\n• IMPROVE: ¿que acciones correctivas podrian considerarse una vez identificada la causa (incrustacion del casco? deriva de un equipo? cambio meteorologico no compensado?)",
      lessons:"✓ Una deriva de consumo nunca es trivial - siempre deberia activar el ciclo Plan-Monitor-Evaluate-Improve\n✓ El SEEMP cobra todo su sentido cuando transforma una simple observacion en una accion correctiva concreta\n✓ Las palancas practicas para abordar este tipo de situacion se detallaran en la Leccion 5 (incrustacion del casco, optimizacion de velocidad...)"},
    pt:{title:"Exemplo operacional",teaser:"Um navio nota que o consumo de combustível aumentou 8% em três meses",
      what:"Um navio nota que seu consumo de combustivel aumentou 8% nos ultimos tres meses, sem uma mudanca evidente de rota ou carga. Como o ciclo de melhoria continua se aplica a esta situacao?",
      cause:"• PLAN: que objetivo a equipa de maquinas deveria fixar perante este desvio?\n• MONITOR: que dados adicionais deveriam ser recolhidos para entender a causa?\n• EVALUATE: com que periodos ou condicoes comparar esses numeros?\n• IMPROVE: que acoes corretivas poderiam ser consideradas uma vez identificada a causa (incrustacao do casco? desvio de um equipamento? mudanca meteorologica nao compensada?)",
      lessons:"✓ Um desvio de consumo nunca e trivial - deveria sempre desencadear o ciclo Plan-Monitor-Evaluate-Improve\n✓ O SEEMP ganha todo o seu sentido quando transforma uma simples observacao numa acao corretiva concreta\n✓ As alavancas praticas para abordar este tipo de situacao serao detalhadas na Licao 5 (incrustacao do casco, otimizacao de velocidade...)"},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(26,111,212,0.08)",border:`1.5px solid ${C.blue2}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🔧</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.blue2,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
        <div style={{fontSize:11,color:C.blue2,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"QUESTIONS À SE POSER":lang==="en"?"QUESTIONS TO ASK":lang==="es"?"PREGUNTAS A HACERSE":"PERGUNTAS A FAZER"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"À RETENIR":lang==="en"?"KEY TAKEAWAYS":lang==="es"?"A RECORDAR":"A LEMBRAR"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
      </div>}
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Quelle partie du SEEMP organise la collecte des données de consommation pour le DCS de l'OMI ?",opts:["Part I","Part II","Part III","Aucune partie"],correct:1,expl:"La Part II organise la collecte des données de consommation de carburant, obligatoire pour le Data Collection System de l'OMI."},
    {q:"Le SEEMP est-il obligatoire ?",opts:["Non, il est purement volontaire","Oui, pour la plupart des navires en voyage international sous MARPOL Annexe VI","Oui, mais uniquement pour les tankers","Non, seulement recommandé par l'OMI"],correct:1,expl:"Le SEEMP est obligatoire pour la plupart des navires effectuant des voyages internationaux, conformément à MARPOL Annexe VI."},
    {q:"Quelle est la première étape du cycle d'amélioration continue ?",opts:["Monitor","Evaluate","Plan","Improve"],correct:2,expl:"Le cycle commence par Plan - fixer un objectif mesurable avant de collecter et analyser les données."},
    {q:"Qu'est-ce qui distingue un bon SEEMP d'un SEEMP défaillant ?",opts:["Le nombre de pages du document","Mise à jour régulière, implication de l'équipage, données analysées et actions mises en œuvre","La couleur de la couverture","Rien, tous les SEEMP se valent"],correct:1,expl:"Un bon SEEMP est régulièrement mis à jour, implique l'équipage, analyse les données et débouche sur des actions concrètes - contrairement à un simple exercice papier."},
    {q:"Dans l'exemple opérationnel, que faire une fois la cause d'une dérive de consommation identifiée ?",opts:["Ignorer le problème","Passer à l'étape Improve pour ajuster les procédures","Attendre le prochain audit","Changer immédiatement de navire"],correct:1,expl:"Une fois la cause identifiée via Evaluate, l'étape Improve consiste à ajuster les procédures avant de revenir à un nouveau Plan."},
  ],
  en:[
    {q:"Which part of the SEEMP organizes fuel consumption data collection for IMO DCS?",opts:["Part I","Part II","Part III","No part"],correct:1,expl:"Part II organizes fuel consumption data collection, mandatory for the IMO Data Collection System."},
    {q:"Is the SEEMP mandatory?",opts:["No, it is purely voluntary","Yes, for most ships on international voyages under MARPOL Annex VI","Yes, but only for tankers","No, only recommended by IMO"],correct:1,expl:"The SEEMP is mandatory for most ships engaged on international voyages under MARPOL Annex VI."},
    {q:"What is the first step of the Continuous Improvement Cycle?",opts:["Monitor","Evaluate","Plan","Improve"],correct:2,expl:"The cycle starts with Plan - setting a measurable goal before collecting and analyzing data."},
    {q:"What distinguishes a good SEEMP from a poor one?",opts:["The number of pages in the document","Regular updates, crew involvement, analysed data and implemented actions","The color of the cover","Nothing, all SEEMPs are equal"],correct:1,expl:"A good SEEMP is regularly updated, involves the crew, analyses data, and leads to concrete actions - unlike a mere paper exercise."},
    {q:"In the operational example, what to do once the cause of a consumption drift is identified?",opts:["Ignore the problem","Move to the Improve step to adjust procedures","Wait for the next audit","Immediately change vessels"],correct:1,expl:"Once the cause is identified via Evaluate, the Improve step consists of adjusting procedures before returning to a new Plan."},
  ],
  es:[
    {q:"¿Qué parte del SEEMP organiza la recopilación de datos de consumo para el DCS de la OMI?",opts:["Part I","Part II","Part III","Ninguna parte"],correct:1,expl:"La Part II organiza la recopilación de datos de consumo de combustible, obligatoria para el Data Collection System de la OMI."},
    {q:"¿Es obligatorio el SEEMP?",opts:["No, es puramente voluntario","Sí, para la mayoría de los buques en viaje internacional bajo el Anexo VI de MARPOL","Sí, pero solo para petroleros","No, solo recomendado por la OMI"],correct:1,expl:"El SEEMP es obligatorio para la mayoría de los buques en viajes internacionales, conforme al Anexo VI de MARPOL."},
    {q:"¿Cuál es la primera etapa del ciclo de mejora continua?",opts:["Monitor","Evaluate","Plan","Improve"],correct:2,expl:"El ciclo comienza con Plan - fijar un objetivo medible antes de recopilar y analizar los datos."},
    {q:"¿Qué distingue un buen SEEMP de un SEEMP deficiente?",opts:["El número de páginas del documento","Actualización regular, implicación de la tripulación, datos analizados y acciones implementadas","El color de la portada","Nada, todos los SEEMP son iguales"],correct:1,expl:"Un buen SEEMP se actualiza regularmente, implica a la tripulación, analiza los datos y desemboca en acciones concretas - a diferencia de un simple ejercicio de papel."},
    {q:"En el ejemplo operativo, ¿qué hacer una vez identificada la causa de una deriva de consumo?",opts:["Ignorar el problema","Pasar a la etapa Improve para ajustar los procedimientos","Esperar la próxima auditoría","Cambiar inmediatamente de buque"],correct:1,expl:"Una vez identificada la causa vía Evaluate, la etapa Improve consiste en ajustar los procedimientos antes de volver a un nuevo Plan."},
  ],
  pt:[
    {q:"Qual parte do SEEMP organiza a recolha de dados de consumo para o DCS da OMI?",opts:["Part I","Part II","Part III","Nenhuma parte"],correct:1,expl:"A Part II organiza a recolha de dados de consumo de combustível, obrigatória para o Data Collection System da OMI."},
    {q:"O SEEMP é obrigatório?",opts:["Não, é puramente voluntário","Sim, para a maioria dos navios em viagem internacional sob o Anexo VI do MARPOL","Sim, mas apenas para petroleiros","Não, apenas recomendado pela OMI"],correct:1,expl:"O SEEMP é obrigatório para a maioria dos navios em viagens internacionais, conforme o Anexo VI do MARPOL."},
    {q:"Qual é a primeira etapa do ciclo de melhoria contínua?",opts:["Monitor","Evaluate","Plan","Improve"],correct:2,expl:"O ciclo começa com Plan - fixar um objetivo mensurável antes de recolher e analisar os dados."},
    {q:"O que distingue um bom SEEMP de um SEEMP deficiente?",opts:["O número de páginas do documento","Atualização regular, envolvimento da tripulação, dados analisados e ações implementadas","A cor da capa","Nada, todos os SEEMP são iguais"],correct:1,expl:"Um bom SEEMP é atualizado regularmente, envolve a tripulação, analisa os dados e leva a ações concretas - diferente de um simples exercício de papel."},
    {q:"No exemplo operacional, o que fazer após identificar a causa de um desvio de consumo?",opts:["Ignorar o problema","Passar à etapa Improve para ajustar os procedimentos","Esperar a próxima auditoria","Mudar imediatamente de navio"],correct:1,expl:"Uma vez identificada a causa via Evaluate, a etapa Improve consiste em ajustar os procedimentos antes de voltar a um novo Plan."},
  ],
};

const BANK = {
  fr:[
    {q:"Que couvre la Part I du SEEMP ?",opts:["Les données de consommation","Les mesures d'amélioration de l'efficacité énergétique adoptées par le navire","Le plan CII uniquement","Les certificats environnementaux"],correct:1,expl:"La Part I décrit les mesures d'amélioration de l'efficacité énergétique adoptées par le navire."},
    {q:"Que couvre la Part III du SEEMP ?",opts:["Le plan de mise en œuvre CII et le Corrective Action Plan","La liste de l'équipage","Les procédures d'urgence incendie","Le certificat IAPP"],correct:0,expl:"La Part III contient le plan de mise en œuvre lié au CII et le Corrective Action Plan en cas de notation insuffisante."},
    {q:"Qui rédige et fait approuver le SEEMP ?",opts:["Uniquement le Capitaine","La compagnie","Un inspecteur PSC","L'affréteur"],correct:1,expl:"La compagnie rédige le SEEMP et le fait approuver, avant que le navire l'applique au quotidien."},
    {q:"Qui coordonne la collecte de données machine pour le SEEMP ?",opts:["Le Chef Mécanicien","Le steward","L'agent portuaire","L'assureur"],correct:0,expl:"Le Chef Mécanicien coordonne la collecte des données de consommation et de performance machine."},
    {q:"Le SEEMP est-il la responsabilité d'une seule personne à bord ?",opts:["Oui, uniquement le Capitaine","Non, c'est un travail collectif impliquant compagnie, Capitaine, Chef Mécanicien, officiers et équipage","Oui, uniquement le Chef Mécanicien","Non, c'est uniquement la responsabilité de l'armateur"],correct:1,expl:"Le SEEMP est un travail collectif - de la compagnie jusqu'à l'équipage, chacun a un rôle à jouer."},
    {q:"Que signifie l'étape MONITOR du cycle d'amélioration continue ?",opts:["Fixer un objectif","Collecter les données réelles au quotidien","Ajuster les procédures","Rédiger un rapport final"],correct:1,expl:"MONITOR consiste à collecter les données réelles au quotidien - consommation, météo, vitesse."},
    {q:"Que signifie l'étape EVALUATE du cycle ?",opts:["Fixer un nouvel objectif","Comparer les données collectées à l'objectif et aux périodes précédentes","Former l'équipage","Réparer un équipement"],correct:1,expl:"EVALUATE consiste à comparer les données collectées à l'objectif fixé et aux périodes précédentes."},
    {q:"Le cycle Plan-Monitor-Evaluate-Improve s'arrête-t-il une fois Improve atteint ?",opts:["Oui, c'est la dernière étape","Non, le cycle repart vers un nouveau Plan - il ne s'arrête jamais","Oui, sauf en cas d'urgence","Non, il repart directement à Monitor"],correct:1,expl:"Le cycle ne s'arrête jamais - après Improve, on repart vers un nouveau Plan, ce qui en fait une amélioration continue."},
    {q:"Un SEEMP jamais mis à jour est-il conforme à l'esprit du document ?",opts:["Oui, tant qu'il existe sur le papier","Non, un SEEMP jamais mis à jour est un signe de SEEMP défaillant","Oui, la mise à jour n'a pas d'importance","Non, mais cela n'a aucune conséquence pratique"],correct:1,expl:"Un SEEMP jamais mis à jour est l'un des signes clairs d'un document défaillant, qui reste un simple exercice papier."},
    {q:"L'implication de l'équipage est-elle un critère d'un bon SEEMP ?",opts:["Non, seule la compagnie compte","Oui, un équipage impliqué est un signe de bon SEEMP","Non, cela ralentit le processus","Oui, mais uniquement pour les officiers seniors"],correct:1,expl:"Un équipage impliqué est l'un des signes distinctifs d'un SEEMP réellement appliqué, contrairement à un simple exercice papier."},
    {q:"Dans l'exemple opérationnel, quelles causes possibles peuvent expliquer une hausse de consommation ?",opts:["Uniquement une erreur de calcul","Encrassement de coque, dérive d'un équipement, conditions météo non compensées","Uniquement un changement d'équipage","Aucune cause possible n'existe"],correct:1,expl:"Plusieurs causes sont possibles : encrassement de coque, dérive d'un équipement, ou conditions météo non compensées - à explorer via Evaluate."},
    {q:"Que doit faire l'équipe machine face à une dérive de consommation de 8% ?",opts:["Ignorer la dérive si elle est légère","Appliquer le cycle Plan-Monitor-Evaluate-Improve pour comprendre et corriger la cause","Changer immédiatement de carburant","Réduire la vitesse du navire à zéro"],correct:1,expl:"Une dérive de consommation doit toujours déclencher le cycle complet pour identifier la cause et agir en conséquence."},
    {q:"Le SEEMP doit-il rester identique pendant toute la vie du navire ?",opts:["Oui, il ne doit jamais changer","Non, c'est un document vivant qui évolue avec l'expérience du navire","Oui, sauf en cas de changement de pavillon","Non, il doit changer chaque semaine"],correct:1,expl:"Le SEEMP est un processus vivant qui doit évoluer avec l'expérience opérationnelle du navire, pas un document figé."},
    {q:"Quel est le principal message à retenir de cette leçon ?",opts:["Le SEEMP est un simple classeur administratif","Le SEEMP est une méthode de travail, pas un document rangé dans une armoire","Le SEEMP ne concerne que la compagnie","Le SEEMP est optionnel pour la plupart des navires"],correct:1,expl:"Le message central de cette leçon est que le SEEMP est une méthode de travail vivante, pas un simple document administratif."},
    {q:"Que se passe-t-il si les données collectées via Monitor ne sont jamais analysées ?",opts:["Rien, cela n'a aucune importance","Le SEEMP devient un simple exercice papier sans valeur réelle","Cela améliore automatiquement la performance","Cela accélère le cycle d'amélioration"],correct:1,expl:"Des données jamais analysées transforment le SEEMP en simple exercice papier, sans valeur d'amélioration réelle."},
  ],
  en:[
    {q:"What does SEEMP Part I cover?",opts:["Consumption data","Energy efficiency improvement measures adopted by the vessel","The CII plan only","Environmental certificates"],correct:1,expl:"Part I describes the energy efficiency improvement measures adopted by the vessel."},
    {q:"What does SEEMP Part III cover?",opts:["The CII implementation plan and the Corrective Action Plan","The crew list","Fire emergency procedures","The IAPP certificate"],correct:0,expl:"Part III contains the CII implementation plan and the Corrective Action Plan for an insufficient rating."},
    {q:"Who drafts and gets the SEEMP approved?",opts:["Only the Master","The company","A PSC inspector","The charterer"],correct:1,expl:"The company drafts the SEEMP and gets it approved, before the vessel applies it daily."},
    {q:"Who coordinates engine data collection for the SEEMP?",opts:["The Chief Engineer","The steward","The port agent","The insurer"],correct:0,expl:"The Chief Engineer coordinates the collection of consumption and engine performance data."},
    {q:"Is the SEEMP the responsibility of a single person on board?",opts:["Yes, only the Master","No, it is collective work involving the company, Master, Chief Engineer, officers and crew","Yes, only the Chief Engineer","No, it is only the shipowner's responsibility"],correct:1,expl:"The SEEMP is collective work - from the company to the crew, everyone has a role to play."},
    {q:"What does the MONITOR step of the continuous improvement cycle mean?",opts:["Setting a goal","Collecting real data daily","Adjusting procedures","Writing a final report"],correct:1,expl:"MONITOR consists of collecting real data daily - consumption, weather, speed."},
    {q:"What does the EVALUATE step of the cycle mean?",opts:["Setting a new goal","Comparing collected data to the goal and previous periods","Training the crew","Repairing equipment"],correct:1,expl:"EVALUATE consists of comparing collected data to the set goal and to previous periods."},
    {q:"Does the Plan-Monitor-Evaluate-Improve cycle stop once Improve is reached?",opts:["Yes, it is the last step","No, the cycle moves back to a new Plan - it never stops","Yes, except in emergencies","No, it moves directly back to Monitor"],correct:1,expl:"The cycle never stops - after Improve, it moves back to a new Plan, which makes it continuous improvement."},
    {q:"Is a SEEMP that is never updated in line with the spirit of the document?",opts:["Yes, as long as it exists on paper","No, a never-updated SEEMP is a sign of a poor SEEMP","Yes, updates don't matter","No, but it has no practical consequence"],correct:1,expl:"A never-updated SEEMP is one of the clear signs of a poor document that remains a mere paper exercise."},
    {q:"Is crew involvement a criterion of a good SEEMP?",opts:["No, only the company matters","Yes, an involved crew is a sign of a good SEEMP","No, it slows down the process","Yes, but only for senior officers"],correct:1,expl:"An involved crew is one of the distinctive signs of a truly applied SEEMP, unlike a mere paper exercise."},
    {q:"In the operational example, what possible causes could explain increased consumption?",opts:["Only a calculation error","Hull fouling, equipment drift, uncompensated weather conditions","Only a crew change","No possible cause exists"],correct:1,expl:"Several causes are possible: hull fouling, equipment drift, or uncompensated weather conditions - to be explored via Evaluate."},
    {q:"What should the engine team do facing an 8% consumption drift?",opts:["Ignore the drift if it is slight","Apply the Plan-Monitor-Evaluate-Improve cycle to understand and correct the cause","Immediately change fuel","Reduce the vessel's speed to zero"],correct:1,expl:"A consumption drift should always trigger the full cycle to identify the cause and act accordingly."},
    {q:"Should the SEEMP remain identical throughout the vessel's life?",opts:["Yes, it should never change","No, it is a living document that evolves with the vessel's experience","Yes, except upon flag change","No, it should change every week"],correct:1,expl:"The SEEMP is a living process that must evolve with the vessel's operational experience, not a fixed document."},
    {q:"What is the main takeaway from this lesson?",opts:["The SEEMP is a simple administrative folder","The SEEMP is a working method, not a document stored in a cabinet","The SEEMP only concerns the company","The SEEMP is optional for most vessels"],correct:1,expl:"The central message of this lesson is that the SEEMP is a living working method, not a mere administrative document."},
    {q:"What happens if data collected via Monitor is never analysed?",opts:["Nothing, it does not matter","The SEEMP becomes a mere paper exercise with no real value","It automatically improves performance","It speeds up the improvement cycle"],correct:1,expl:"Never-analysed data turns the SEEMP into a mere paper exercise, with no real improvement value."},
  ],
  es:[
    {q:"¿Qué cubre la Part I del SEEMP?",opts:["Datos de consumo","Las medidas de mejora de la eficiencia energética adoptadas por el buque","Solo el plan CII","Certificados ambientales"],correct:1,expl:"La Part I describe las medidas de mejora de la eficiencia energética adoptadas por el buque."},
    {q:"¿Qué cubre la Part III del SEEMP?",opts:["El plan de implementación del CII y el Corrective Action Plan","La lista de la tripulación","Procedimientos de emergencia de incendio","El certificado IAPP"],correct:0,expl:"La Part III contiene el plan de implementación vinculado al CII y el Corrective Action Plan para una calificación insuficiente."},
    {q:"¿Quién redacta y hace aprobar el SEEMP?",opts:["Solo el Capitán","La compañía","Un inspector PSC","El fletador"],correct:1,expl:"La compañía redacta el SEEMP y lo hace aprobar, antes de que el buque lo aplique a diario."},
    {q:"¿Quién coordina la recopilación de datos de máquinas para el SEEMP?",opts:["El Jefe de Máquinas","El camarero","El agente portuario","El asegurador"],correct:0,expl:"El Jefe de Máquinas coordina la recopilación de datos de consumo y rendimiento de máquinas."},
    {q:"¿El SEEMP es responsabilidad de una sola persona a bordo?",opts:["Sí, solo el Capitán","No, es un trabajo colectivo que involucra a la compañía, Capitán, Jefe de Máquinas, oficiales y tripulación","Sí, solo el Jefe de Máquinas","No, es solo responsabilidad del armador"],correct:1,expl:"El SEEMP es un trabajo colectivo - desde la compañía hasta la tripulación, todos tienen un papel que desempeñar."},
    {q:"¿Qué significa la etapa MONITOR del ciclo de mejora continua?",opts:["Fijar un objetivo","Recopilar datos reales a diario","Ajustar procedimientos","Redactar un informe final"],correct:1,expl:"MONITOR consiste en recopilar datos reales a diario - consumo, clima, velocidad."},
    {q:"¿Qué significa la etapa EVALUATE del ciclo?",opts:["Fijar un nuevo objetivo","Comparar los datos recopilados con el objetivo y periodos anteriores","Formar a la tripulación","Reparar un equipo"],correct:1,expl:"EVALUATE consiste en comparar los datos recopilados con el objetivo fijado y con periodos anteriores."},
    {q:"¿El ciclo Plan-Monitor-Evaluate-Improve se detiene al llegar a Improve?",opts:["Sí, es la última etapa","No, el ciclo vuelve a un nuevo Plan - nunca se detiene","Sí, salvo en emergencias","No, vuelve directamente a Monitor"],correct:1,expl:"El ciclo nunca se detiene - después de Improve, vuelve a un nuevo Plan, lo que lo convierte en mejora continua."},
    {q:"¿Un SEEMP nunca actualizado está en línea con el espíritu del documento?",opts:["Sí, mientras exista en papel","No, un SEEMP nunca actualizado es señal de un SEEMP deficiente","Sí, la actualización no importa","No, pero no tiene consecuencia práctica"],correct:1,expl:"Un SEEMP nunca actualizado es uno de los signos claros de un documento deficiente que sigue siendo un simple ejercicio de papel."},
    {q:"¿La implicación de la tripulación es un criterio de un buen SEEMP?",opts:["No, solo importa la compañía","Sí, una tripulación implicada es señal de un buen SEEMP","No, ralentiza el proceso","Sí, pero solo para oficiales senior"],correct:1,expl:"Una tripulación implicada es uno de los signos distintivos de un SEEMP realmente aplicado, a diferencia de un simple ejercicio de papel."},
    {q:"En el ejemplo operativo, ¿qué posibles causas explicarían un aumento del consumo?",opts:["Solo un error de cálculo","Incrustación del casco, deriva de un equipo, condiciones meteorológicas no compensadas","Solo un cambio de tripulación","No existe ninguna causa posible"],correct:1,expl:"Varias causas son posibles: incrustación del casco, deriva de un equipo, o condiciones meteorológicas no compensadas - a explorar vía Evaluate."},
    {q:"¿Qué debería hacer el equipo de máquinas ante una deriva de consumo del 8%?",opts:["Ignorar la deriva si es leve","Aplicar el ciclo Plan-Monitor-Evaluate-Improve para entender y corregir la causa","Cambiar inmediatamente de combustible","Reducir la velocidad del buque a cero"],correct:1,expl:"Una deriva de consumo siempre debería activar el ciclo completo para identificar la causa y actuar en consecuencia."},
    {q:"¿Debe el SEEMP permanecer idéntico durante toda la vida del buque?",opts:["Sí, nunca debe cambiar","No, es un documento vivo que evoluciona con la experiencia del buque","Sí, salvo cambio de pabellón","No, debe cambiar cada semana"],correct:1,expl:"El SEEMP es un proceso vivo que debe evolucionar con la experiencia operativa del buque, no un documento fijo."},
    {q:"¿Cuál es el principal mensaje a retener de esta lección?",opts:["El SEEMP es una simple carpeta administrativa","El SEEMP es un método de trabajo, no un documento guardado en un armario","El SEEMP solo concierne a la compañía","El SEEMP es opcional para la mayoría de los buques"],correct:1,expl:"El mensaje central de esta lección es que el SEEMP es un método de trabajo vivo, no un simple documento administrativo."},
    {q:"¿Qué ocurre si los datos recopilados vía Monitor nunca se analizan?",opts:["Nada, no importa","El SEEMP se convierte en un simple ejercicio de papel sin valor real","Mejora automáticamente el rendimiento","Acelera el ciclo de mejora"],correct:1,expl:"Datos nunca analizados convierten el SEEMP en un simple ejercicio de papel, sin valor de mejora real."},
  ],
  pt:[
    {q:"O que a Part I do SEEMP cobre?",opts:["Dados de consumo","As medidas de melhoria da eficiência energética adotadas pelo navio","Apenas o plano CII","Certificados ambientais"],correct:1,expl:"A Part I descreve as medidas de melhoria da eficiência energética adotadas pelo navio."},
    {q:"O que a Part III do SEEMP cobre?",opts:["O plano de implementação do CII e o Corrective Action Plan","A lista da tripulação","Procedimentos de emergência de incêndio","O certificado IAPP"],correct:0,expl:"A Part III contém o plano de implementação ligado ao CII e o Corrective Action Plan para uma classificação insuficiente."},
    {q:"Quem redige e faz aprovar o SEEMP?",opts:["Apenas o Comandante","A empresa","Um inspetor PSC","O afretador"],correct:1,expl:"A empresa redige o SEEMP e o faz aprovar, antes de o navio aplicá-lo diariamente."},
    {q:"Quem coordena a recolha de dados de máquinas para o SEEMP?",opts:["O Chefe de Máquinas","O comissário","O agente portuário","O segurador"],correct:0,expl:"O Chefe de Máquinas coordena a recolha de dados de consumo e desempenho de máquinas."},
    {q:"O SEEMP é responsabilidade de uma única pessoa a bordo?",opts:["Sim, apenas o Comandante","Não, é um trabalho coletivo envolvendo a empresa, Comandante, Chefe de Máquinas, oficiais e tripulação","Sim, apenas o Chefe de Máquinas","Não, é apenas responsabilidade do armador"],correct:1,expl:"O SEEMP é um trabalho coletivo - da empresa até a tripulação, todos têm um papel a desempenhar."},
    {q:"O que significa a etapa MONITOR do ciclo de melhoria contínua?",opts:["Fixar um objetivo","Recolher dados reais diariamente","Ajustar procedimentos","Redigir um relatório final"],correct:1,expl:"MONITOR consiste em recolher dados reais diariamente - consumo, clima, velocidade."},
    {q:"O que significa a etapa EVALUATE do ciclo?",opts:["Fixar um novo objetivo","Comparar os dados recolhidos com o objetivo e períodos anteriores","Formar a tripulação","Reparar um equipamento"],correct:1,expl:"EVALUATE consiste em comparar os dados recolhidos com o objetivo fixado e com períodos anteriores."},
    {q:"O ciclo Plan-Monitor-Evaluate-Improve para ao chegar a Improve?",opts:["Sim, é a última etapa","Não, o ciclo volta a um novo Plan - nunca para","Sim, exceto em emergências","Não, volta diretamente a Monitor"],correct:1,expl:"O ciclo nunca para - após Improve, volta a um novo Plan, o que o torna melhoria contínua."},
    {q:"Um SEEMP nunca atualizado está de acordo com o espírito do documento?",opts:["Sim, enquanto existir no papel","Não, um SEEMP nunca atualizado é sinal de um SEEMP deficiente","Sim, a atualização não importa","Não, mas não tem consequência prática"],correct:1,expl:"Um SEEMP nunca atualizado é um dos sinais claros de um documento deficiente que continua sendo um simples exercício de papel."},
    {q:"O envolvimento da tripulação é um critério de um bom SEEMP?",opts:["Não, só importa a empresa","Sim, uma tripulação envolvida é sinal de um bom SEEMP","Não, atrasa o processo","Sim, mas apenas para oficiais seniores"],correct:1,expl:"Uma tripulação envolvida é um dos sinais distintivos de um SEEMP verdadeiramente aplicado, diferente de um simples exercício de papel."},
    {q:"No exemplo operacional, que possíveis causas explicariam um aumento de consumo?",opts:["Apenas um erro de cálculo","Incrustação do casco, desvio de um equipamento, condições meteorológicas não compensadas","Apenas uma troca de tripulação","Nenhuma causa possível existe"],correct:1,expl:"Várias causas são possíveis: incrustação do casco, desvio de um equipamento, ou condições meteorológicas não compensadas - a explorar via Evaluate."},
    {q:"O que a equipa de máquinas deveria fazer perante um desvio de consumo de 8%?",opts:["Ignorar o desvio se for leve","Aplicar o ciclo Plan-Monitor-Evaluate-Improve para entender e corrigir a causa","Mudar imediatamente de combustível","Reduzir a velocidade do navio a zero"],correct:1,expl:"Um desvio de consumo deveria sempre desencadear o ciclo completo para identificar a causa e agir em conformidade."},
    {q:"O SEEMP deve permanecer idêntico durante toda a vida do navio?",opts:["Sim, nunca deve mudar","Não, é um documento vivo que evolui com a experiência do navio","Sim, exceto em mudança de bandeira","Não, deve mudar toda semana"],correct:1,expl:"O SEEMP é um processo vivo que deve evoluir com a experiência operacional do navio, não um documento fixo."},
    {q:"Qual é a principal mensagem a reter desta lição?",opts:["O SEEMP é uma simples pasta administrativa","O SEEMP é um método de trabalho, não um documento guardado num armário","O SEEMP só diz respeito à empresa","O SEEMP é opcional para a maioria dos navios"],correct:1,expl:"A mensagem central desta lição é que o SEEMP é um método de trabalho vivo, não um simples documento administrativo."},
    {q:"O que acontece se os dados recolhidos via Monitor nunca forem analisados?",opts:["Nada, não importa","O SEEMP torna-se um simples exercício de papel sem valor real","Melhora automaticamente o desempenho","Acelera o ciclo de melhoria"],correct:1,expl:"Dados nunca analisados transformam o SEEMP num simples exercício de papel, sem valor de melhoria real."},
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
      badge:"🍃 Module Machine · Leçon 2/5 · ⭐ Premium · 200 XP",
      title:"Le SEEMP",
      intro:"La Leçon 1 a expliqué pourquoi l'efficacité énergétique est devenue une obligation réglementaire. Cette leçon présente le premier outil concret : le SEEMP - un document vivant, pas un classeur qu'on range dans une armoire.",
      p1:"PARTIE 1 - LES TROIS PARTIES DU SEEMP",
      s1:"Chaque partie du SEEMP a un rôle précis - les confondre revient à mal comprendre l'outil dans son ensemble.",
      p2:"PARTIE 2 - QUI TIENT LE SEEMP À JOUR",
      s2:"Le SEEMP fonctionne comme le SMS vu en MARPOL Leçon 5 : ce n'est jamais la responsabilité d'une seule personne, mais d'une chaîne complète.",
      p3:"PARTIE 3 - LE CYCLE D'AMÉLIORATION CONTINUE",
      s3:"Le cœur de cette leçon. Ce cycle en 4 étapes ne s'arrête jamais - c'est exactement ce qui distingue un SEEMP vivant d'un document mort.",
      p4:"PARTIE 4 - BON SEEMP vs SEEMP DÉFAILLANT",
      s4:"La différence ne se voit pas sur la couverture du document, mais dans la façon dont il est réellement utilisé au quotidien.",
      p5:"PARTIE 5 - EXERCICE",
      p6:"PARTIE 6 - EXEMPLE OPÉRATIONNEL",
      p7:"PARTIE 7 - BANQUE DE QUESTIONS",
      closingPhrase:"Un SEEMP ne fait pas économiser du carburant tout seul. Ce sont les personnes qui l'appliquent qui le font.",
      sumT:"POINTS CLÉS",
      sumP:[
        "Le SEEMP est obligatoire pour la plupart des navires en voyage international (MARPOL Annexe VI)",
        "Part I = mesures d'efficacité · Part II = données de consommation · Part III = plan CII/Corrective Action Plan",
        "Le SEEMP est un travail collectif, de la compagnie jusqu'à l'équipage",
        "Le cycle Plan → Monitor → Evaluate → Improve ne s'arrête jamais",
        "Un bon SEEMP est régulièrement mis à jour, avec un équipage impliqué et des données analysées",
        "Une dérive de consommation doit toujours déclencher le cycle complet",
      ],
      learnedP:[
        "Identifier le contenu des trois parties du SEEMP",
        "Comprendre la chaîne de responsabilité collective du SEEMP",
        "Appliquer le cycle Plan-Monitor-Evaluate-Improve",
        "Distinguer un bon SEEMP d'un SEEMP défaillant",
        "Je sais que le SEEMP est une méthode de travail vivante, pas un document administratif figé",
      ],
    },
    en:{
      badge:"🍃 Engine Module · Lesson 2/5 · ⭐ Premium · 200 XP",
      title:"The SEEMP",
      intro:"Lesson 1 explained why energy efficiency became a regulatory obligation. This lesson introduces the first concrete tool: the SEEMP - a living document, not a folder stored in a cabinet.",
      p1:"PART 1 - THE THREE PARTS OF THE SEEMP",
      s1:"Each part of the SEEMP has a specific role - confusing them means misunderstanding the tool as a whole.",
      p2:"PART 2 - WHO KEEPS THE SEEMP UPDATED",
      s2:"The SEEMP works like the SMS seen in MARPOL Lesson 5: it is never the responsibility of a single person, but of a full chain.",
      p3:"PART 3 - THE CONTINUOUS IMPROVEMENT CYCLE",
      s3:"The heart of this lesson. This 4-step cycle never stops - exactly what distinguishes a living SEEMP from a dead document.",
      p4:"PART 4 - GOOD SEEMP vs POOR SEEMP",
      s4:"The difference is not visible on the document's cover, but in how it is actually used daily.",
      p5:"PART 5 - EXERCISE",
      p6:"PART 6 - OPERATIONAL EXAMPLE",
      p7:"PART 7 - QUESTION BANK",
      closingPhrase:"A SEEMP does not save fuel by itself. People who apply it do.",
      sumT:"KEY POINTS",
      sumP:[
        "The SEEMP is mandatory for most ships on international voyages (MARPOL Annex VI)",
        "Part I = efficiency measures · Part II = consumption data · Part III = CII plan/Corrective Action Plan",
        "The SEEMP is collective work, from the company to the crew",
        "The Plan → Monitor → Evaluate → Improve cycle never stops",
        "A good SEEMP is regularly updated, with an involved crew and analysed data",
        "A consumption drift should always trigger the full cycle",
      ],
      learnedP:[
        "Identify the content of the SEEMP's three parts",
        "Understand the SEEMP's collective chain of responsibility",
        "Apply the Plan-Monitor-Evaluate-Improve cycle",
        "Distinguish a good SEEMP from a poor SEEMP",
        "I know the SEEMP is a living working method, not a fixed administrative document",
      ],
    },
    es:{
      badge:"🍃 Módulo Máquinas · Lección 2/5 · ⭐ Premium · 200 XP",
      title:"El SEEMP",
      intro:"La Lección 1 explicó por qué la eficiencia energética se convirtió en una obligación reglamentaria. Esta lección presenta la primera herramienta concreta: el SEEMP - un documento vivo, no una carpeta guardada en un armario.",
      p1:"PARTE 1 - LAS TRES PARTES DEL SEEMP",
      s1:"Cada parte del SEEMP tiene un rol específico - confundirlas equivale a malentender la herramienta en su conjunto.",
      p2:"PARTE 2 - QUIÉN MANTIENE EL SEEMP ACTUALIZADO",
      s2:"El SEEMP funciona como el SMS visto en MARPOL Lección 5: nunca es responsabilidad de una sola persona, sino de una cadena completa.",
      p3:"PARTE 3 - EL CICLO DE MEJORA CONTINUA",
      s3:"El corazón de esta lección. Este ciclo de 4 etapas nunca se detiene - exactamente lo que distingue un SEEMP vivo de un documento muerto.",
      p4:"PARTE 4 - BUEN SEEMP vs SEEMP DEFICIENTE",
      s4:"La diferencia no se ve en la portada del documento, sino en cómo se usa realmente a diario.",
      p5:"PARTE 5 - EJERCICIO",
      p6:"PARTE 6 - EJEMPLO OPERATIVO",
      p7:"PARTE 7 - BANCO DE PREGUNTAS",
      closingPhrase:"Un SEEMP no ahorra combustible por sí solo. Las personas que lo aplican sí lo hacen.",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "El SEEMP es obligatorio para la mayoría de los buques en viaje internacional (Anexo VI MARPOL)",
        "Part I = medidas de eficiencia · Part II = datos de consumo · Part III = plan CII/Corrective Action Plan",
        "El SEEMP es un trabajo colectivo, de la compañía hasta la tripulación",
        "El ciclo Plan → Monitor → Evaluate → Improve nunca se detiene",
        "Un buen SEEMP se actualiza regularmente, con una tripulación implicada y datos analizados",
        "Una deriva de consumo siempre debería activar el ciclo completo",
      ],
      learnedP:[
        "Identificar el contenido de las tres partes del SEEMP",
        "Comprender la cadena de responsabilidad colectiva del SEEMP",
        "Aplicar el ciclo Plan-Monitor-Evaluate-Improve",
        "Distinguir un buen SEEMP de un SEEMP deficiente",
        "Sé que el SEEMP es un método de trabajo vivo, no un documento administrativo fijo",
      ],
    },
    pt:{
      badge:"🍃 Módulo Máquinas · Lição 2/5 · ⭐ Premium · 200 XP",
      title:"O SEEMP",
      intro:"A Lição 1 explicou por que a eficiência energética se tornou uma obrigação regulamentar. Esta lição apresenta a primeira ferramenta concreta: o SEEMP - um documento vivo, não uma pasta guardada num armário.",
      p1:"PARTE 1 - AS TRÊS PARTES DO SEEMP",
      s1:"Cada parte do SEEMP tem um papel específico - confundi-las significa entender mal a ferramenta como um todo.",
      p2:"PARTE 2 - QUEM MANTÉM O SEEMP ATUALIZADO",
      s2:"O SEEMP funciona como o SMS visto na Lição 5 do MARPOL: nunca é responsabilidade de uma única pessoa, mas de uma cadeia completa.",
      p3:"PARTE 3 - O CICLO DE MELHORIA CONTÍNUA",
      s3:"O coração desta lição. Este ciclo de 4 etapas nunca para - exatamente o que distingue um SEEMP vivo de um documento morto.",
      p4:"PARTE 4 - BOM SEEMP vs SEEMP DEFICIENTE",
      s4:"A diferença não se vê na capa do documento, mas na forma como é realmente usado diariamente.",
      p5:"PARTE 5 - EXERCÍCIO",
      p6:"PARTE 6 - EXEMPLO OPERACIONAL",
      p7:"PARTE 7 - BANCO DE QUESTÕES",
      closingPhrase:"Um SEEMP não economiza combustível sozinho. As pessoas que o aplicam sim.",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "O SEEMP é obrigatório para a maioria dos navios em viagem internacional (Anexo VI MARPOL)",
        "Part I = medidas de eficiência · Part II = dados de consumo · Part III = plano CII/Corrective Action Plan",
        "O SEEMP é um trabalho coletivo, da empresa até a tripulação",
        "O ciclo Plan → Monitor → Evaluate → Improve nunca para",
        "Um bom SEEMP é atualizado regularmente, com uma tripulação envolvida e dados analisados",
        "Um desvio de consumo deveria sempre desencadear o ciclo completo",
      ],
      learnedP:[
        "Identificar o conteúdo das três partes do SEEMP",
        "Compreender a cadeia de responsabilidade coletiva do SEEMP",
        "Aplicar o ciclo Plan-Monitor-Evaluate-Improve",
        "Distinguir um bom SEEMP de um SEEMP deficiente",
        "Sei que o SEEMP é um método de trabalho vivo, não um documento administrativo fixo",
      ],
    },
  };
  return d[lang] || d.fr;
};

export default function LessonSEEMP_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/5":lang==="en"?"Lesson 2/5":lang==="es"?"Lección 2/5":"Lição 2/5"}</div>
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

            <SL icon="📘" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📘 {lang==="fr"?"LES 3 PARTIES - INTERACTIF":lang==="en"?"THE 3 PARTS - INTERACTIVE":lang==="es"?"LAS 3 PARTES - INTERACTIVO":"AS 3 PARTES - INTERATIVO"}</div>
              <SEEMPPartsSVG lang={lang}/>
            </Card>

            <SL icon="👥" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>👥 {lang==="fr"?"CHAÎNE DE RESPONSABILITÉ":lang==="en"?"CHAIN OF RESPONSIBILITY":lang==="es"?"CADENA DE RESPONSABILIDAD":"CADEIA DE RESPONSABILIDADE"}</div>
              <RolesChain lang={lang}/>
            </Card>

            <SL icon="🔄" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔄 {lang==="fr"?"CYCLE D'AMÉLIORATION - INTERACTIF":lang==="en"?"IMPROVEMENT CYCLE - INTERACTIVE":lang==="es"?"CICLO DE MEJORA - INTERACTIVO":"CICLO DE MELHORIA - INTERATIVO"}</div>
              <CycleSVG lang={lang}/>
            </Card>

            <SL icon="⚖️" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <SEEMPCompareTable lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><SEEMPChecklist lang={lang}/></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise2 lang={lang} t={t}/></Card>

            <SL icon="🔧" text={lc.p6} color={C.blue2}/>
            <div style={{marginBottom:14}}><OperationalExample lang={lang}/></div>

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
                {lang==="fr"?"Quiz - Le SEEMP":lang==="en"?"Quiz - The SEEMP":lang==="es"?"Quiz - El SEEMP":"Quiz - O SEEMP"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 2":lang==="en"?"Lesson 2":lang==="es"?"Lección 2":"Lição 2"}</div>
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
              {lang==="fr"?"LEÇON 3 - L'EEXI →":lang==="en"?"LESSON 3 - THE EEXI →":lang==="es"?"LECCIÓN 3 - EL EEXI →":"LIÇÃO 3 - O EEXI →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
