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
// SVG 1 - CIVIL vs CRIMINAL RESPONSIBILITY
// ══════════════════════════════════════
function ResponsibilitySVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"criminal", icon:"⚖️", color:C.red,
      label:{fr:"Responsabilité pénale",en:"Criminal liability",es:"Responsabilidad penal",pt:"Responsabilidade penal"},
      desc:{fr:"Engagee lorsqu'une infraction reglementaire est commise deliberement - falsification de registre, magic pipe, rejet illegal. Peut viser des individus (officiers, gestionnaires) autant que la compagnie, avec amendes et parfois prison. Vu dans le cas Ocean Princess (Lecon 4).",en:"Triggered when a regulatory offense is committed deliberately - falsifying a record, magic pipe, illegal discharge. Can target individuals (officers, managers) as well as the company, with fines and sometimes prison. Seen in the Ocean Princess case (Lesson 4).",es:"Se activa cuando se comete deliberadamente una infraccion reglamentaria - falsificacion de registro, magic pipe, descarga ilegal. Puede dirigirse a individuos (oficiales, gestores) asi como a la compania, con multas y a veces prision. Visto en el caso Ocean Princess (Leccion 4).",pt:"Acionada quando uma infracao regulamentar e cometida deliberadamente - falsificacao de registo, magic pipe, descarga ilegal. Pode visar individuos (oficiais, gestores) assim como a empresa, com multas e por vezes prisao. Visto no caso Ocean Princess (Licao 4)."} },
    { id:"civil", icon:"📜", color:C.blue2,
      label:{fr:"Responsabilité civile",en:"Civil liability",es:"Responsabilidad civil",pt:"Responsabilidade civil"},
      desc:{fr:"Decoule d'un manquement contractuel ou d'un dommage economique, sans infraction penale necessairement. Se traduit par des dommages et interets entre parties privees - vu dans l'affaire Rowan (Lecon 5), ou aucune poursuite penale n'a ete engagee.",en:"Arises from a contractual failure or economic damage, without necessarily involving a criminal offense. Results in damages between private parties - seen in the Rowan case (Lesson 5), where no criminal prosecution was involved.",es:"Deriva de un incumplimiento contractual o un dano economico, sin necesariamente una infraccion penal. Se traduce en danos y perjuicios entre partes privadas - visto en el caso Rowan (Leccion 5), donde no hubo proceso penal.",pt:"Decorre de um incumprimento contratual ou dano economico, sem necessariamente uma infracao penal. Traduz-se em indemnizacoes entre partes privadas - visto no caso Rowan (Licao 5), onde nao houve processo penal."} },
    { id:"both", icon:"🔗", color:C.gold2,
      label:{fr:"Les deux peuvent se cumuler",en:"Both can accumulate",es:"Ambas pueden acumularse",pt:"Ambas podem se acumular"},
      desc:{fr:"Un meme evenement peut declencher les deux : une poursuite penale de l'Etat ET une action civile d'un affreteur ou d'un assureur lese. La compagnie et l'individu impliques peuvent faire face aux deux fronts simultanement.",en:"A single event can trigger both: a criminal prosecution by the state AND a civil action from an injured charterer or insurer. The company and the individual involved can face both fronts simultaneously.",es:"Un mismo evento puede desencadenar ambas: un proceso penal del Estado Y una accion civil de un fletador o asegurador perjudicado. La compania y el individuo implicados pueden enfrentar ambos frentes simultaneamente.",pt:"Um mesmo evento pode desencadear ambas: um processo penal do Estado E uma acao civil de um afretador ou segurador prejudicado. A empresa e o individuo envolvidos podem enfrentar ambas as frentes simultaneamente."} },
    { id:"individual", icon:"👤", color:C.orange,
      label:{fr:"Responsabilité individuelle",en:"Individual responsibility",es:"Responsabilidad individual",pt:"Responsabilidade individual"},
      desc:{fr:"Suivre un ordre illegal ne protege jamais l'officier qui l'execute. Le cas Ocean Princess (Lecon 4) l'a montre : chef mecanicien, second capitaine et capitaine ont tous ete poursuivis individuellement, malgre la chaine de commandement.",en:"Following an illegal order never protects the officer who carries it out. The Ocean Princess case (Lesson 4) showed this: the chief engineer, chief officer and master were all individually prosecuted, despite the chain of command.",es:"Seguir una orden ilegal nunca protege al oficial que la ejecuta. El caso Ocean Princess (Leccion 4) lo demostro: el jefe de maquinas, el primer oficial y el capitan fueron todos procesados individualmente, a pesar de la cadena de mando.",pt:"Seguir uma ordem ilegal nunca protege o oficial que a executa. O caso Ocean Princess (Licao 4) mostrou isso: o chefe de maquinas, o imediato e o comandante foram todos processados individualmente, apesar da cadeia de comando."} },
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
// SVG 2 - ENVIRONMENTAL CULTURE ONBOARD
// ══════════════════════════════════════
function CultureSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"noblame", icon:"🗣️", color:C.blue2,
      label:{fr:"Culture du signalement sans blâme",en:"No-blame reporting culture",es:"Cultura de reporte sin culpa",pt:"Cultura de reporte sem culpa"},
      desc:{fr:"Un equipage qui craint la sanction pour avoir signale une erreur cache ses erreurs au lieu de les corriger. Une culture saine distingue l'erreur honnete (a corriger et apprendre) de la faute deliberee (a sanctionner).",en:"A crew that fears punishment for reporting a mistake hides its mistakes instead of correcting them. A healthy culture distinguishes an honest mistake (to correct and learn from) from a deliberate wrongdoing (to sanction).",es:"Una tripulacion que teme el castigo por reportar un error oculta sus errores en lugar de corregirlos. Una cultura sana distingue el error honesto (a corregir y aprender) de la falta deliberada (a sancionar).",pt:"Uma tripulacao que teme punicao por reportar um erro esconde seus erros em vez de corrigi-los. Uma cultura saudavel distingue o erro honesto (a corrigir e aprender) da falta deliberada (a sancionar)."} },
    { id:"junior", icon:"🧑‍🎓", color:C.teal,
      label:{fr:"Encourager les officiers juniors",en:"Encouraging junior officers",es:"Fomentar a los oficiales junior",pt:"Incentivar oficiais juniores"},
      desc:{fr:"Le cas Ocean Princess (Lecon 4) a montre qu'un second capitaine peut recevoir l'ordre de mentir aux inspecteurs. Une culture forte donne aux juniors la capacite reelle de refuser un ordre non conforme, sans craindre de represailles hierarchiques.",en:"The Ocean Princess case (Lesson 4) showed that a chief officer can be ordered to lie to inspectors. A strong culture gives juniors the real ability to refuse a non-compliant order, without fearing hierarchical retaliation.",es:"El caso Ocean Princess (Leccion 4) mostro que a un primer oficial se le puede ordenar mentir a los inspectores. Una cultura fuerte da a los junior la capacidad real de rechazar una orden no conforme, sin temer represalias jerarquicas.",pt:"O caso Ocean Princess (Licao 4) mostrou que um imediato pode receber ordem de mentir aos inspetores. Uma cultura forte da aos juniores a capacidade real de recusar uma ordem nao conforme, sem temer represalias hierarquicas."} },
    { id:"example", icon:"🎖️", color:C.gold2,
      label:{fr:"Le rôle d'exemple du Chief Engineer",en:"The Chief Engineer's role as an example",es:"El papel de ejemplo del Chief Engineer",pt:"O papel de exemplo do Chief Engineer"},
      desc:{fr:"L'equipage observe ce que fait le Chief Engineer bien plus que ce qu'il dit. Un chef qui contourne une procedure sous pression enseigne implicitement que la conformite est negociable.",en:"The crew watches what the Chief Engineer does far more than what they say. A chief who bypasses a procedure under pressure implicitly teaches that compliance is negotiable.",es:"La tripulacion observa lo que hace el Chief Engineer mucho mas que lo que dice. Un jefe que elude un procedimiento bajo presion ensena implicitamente que el cumplimiento es negociable.",pt:"A tripulacao observa o que o Chief Engineer faz muito mais do que o que diz. Um chefe que contorna um procedimento sob pressao ensina implicitamente que a conformidade e negociavel."} },
    { id:"companyculture", icon:"🏢", color:C.red,
      label:{fr:"Culture d'entreprise",en:"Corporate culture",es:"Cultura corporativa",pt:"Cultura corporativa"},
      desc:{fr:"La recidive Princess/Carnival (voir cas reels) a ete explicitement attribuee par un juge federal a une 'culture qui cherche a minimiser ou eviter les informations negatives'. La culture ne se decrete pas au niveau du navire seul - elle doit venir de la direction.",en:"The Princess/Carnival recidivism (see real cases) was explicitly attributed by a federal judge to 'a culture that seeks to minimize or avoid information that is negative'. Culture cannot be decreed at the vessel level alone - it must come from the top.",es:"La reincidencia de Princess/Carnival (ver casos reales) fue atribuida explicitamente por un juez federal a 'una cultura que busca minimizar o evitar informacion negativa'. La cultura no se decreta solo a nivel del buque - debe venir de la direccion.",pt:"A reincidencia da Princess/Carnival (ver casos reais) foi explicitamente atribuida por um juiz federal a 'uma cultura que busca minimizar ou evitar informacoes negativas'. A cultura nao se decreta apenas ao nivel do navio - deve vir da direcao."} },
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
// SECTION 3 - THREE CASES: CORPORATE CULTURE, RISK MANAGEMENT, SYSTEMIC FAILURE
// ══════════════════════════════════════
function ThreeCasesGrid({ lang }) {
  const [sel, setSel] = useState(null);
  const cases = {
    fr:[
      {id:"princess",icon:"🚢",color:C.red,name:"Princess / Carnival - récidive (2019-2022)",
       angle:"Culture d'entreprise et récidive",
       text:"Apres sa condamnation initiale de 40 millions $ en 2017 (voir Lecon 2), Carnival etait placee sous probation avec un plan de conformite environnementale supervise par un tribunal. En 2019, l'entreprise plaide a nouveau coupable de 6 violations de probation : envoi d'equipes secretes pour preparer les navires avant les audits independants, falsification de registres de formation environnementale, et rejet de plastique melange a des dechets alimentaires aux Bahamas. Amende supplementaire de 20 millions $. Une nouvelle violation en 2022 porte le total a 61 millions $. Le juge federal a explicitement attribue cette recidive a une culture d'entreprise qui cherche a 'minimiser ou eviter les informations negatives, inconfortables ou menacantes'.",
       lesson:"Une seule condamnation ne suffit pas a changer une culture d'entreprise defaillante - la conformite doit etre reconstruite en profondeur, pas simulee pour les audits."},
      {id:"exxon",icon:"🛢️",color:C.orange,name:"Exxon Valdez (1989)",
       angle:"Défaillance de gestion des risques",
       text:"Le petrolier Exxon Valdez s'est echoue en Alaska en 1989, provoquant une des plus grandes marees noires de l'histoire. L'enquete a revele qu'un troisieme officier tenait la barre dans un chenal exigeant une experience specifique, pendant que le Capitaine avait quitte la passerelle - une defaillance de gestion des ressources et des risques, pas un simple accident technique.",
       lesson:"Un certificat valide sur le papier ne remplace jamais l'experience specifique requise pour une tache donnee - la gestion des risques commence par une repartition realiste des responsabilites."},
      {id:"dwh",icon:"🔥",color:C.gold2,name:"Deepwater Horizon (2010)",
       angle:"Défaillance systémique de la culture sécurité/environnement",
       text:"L'explosion de la plateforme Deepwater Horizon dans le Golfe du Mexique en 2010 a cause 11 morts et la plus grande maree noire de l'histoire des Etats-Unis. L'enquete a identifie une serie de decisions prises pour gagner du temps et reduire les couts, au detriment de plusieurs alertes de securite ignorees a differents niveaux de la chaine de decision.",
       lesson:"Une defaillance systemique n'est jamais le fait d'une seule personne - elle resulte d'une accumulation de compromis acceptes a chaque niveau, jusqu'a ce que plus personne ne dise non."},
    ],
    en:[
      {id:"princess",icon:"🚢",color:C.red,name:"Princess / Carnival - recidivism (2019-2022)",
       angle:"Corporate culture and recidivism",
       text:"After its initial $40 million conviction in 2017 (see Lesson 2), Carnival was placed on probation with a court-supervised environmental compliance plan. In 2019, the company pleaded guilty again to 6 probation violations: sending undisclosed teams to prepare ships before independent audits, falsifying environmental training records, and discharging plastic mixed with food waste in Bahamian waters. An additional $20 million fine followed. A further violation in 2022 brought the total to $61 million. The federal judge explicitly attributed this recidivism to a corporate culture that 'seeks to minimize or avoid information that is negative, uncomfortable, or threatening'.",
       lesson:"A single conviction is not enough to change a failing corporate culture - compliance must be rebuilt in depth, not simulated for audits."},
      {id:"exxon",icon:"🛢️",color:C.orange,name:"Exxon Valdez (1989)",
       angle:"Risk management failure",
       text:"The oil tanker Exxon Valdez ran aground in Alaska in 1989, causing one of the largest oil spills in history. The investigation revealed that a third mate was at the helm in a channel requiring specific experience, while the Master had left the bridge - a failure of resource and risk management, not a simple technical accident.",
       lesson:"A certificate valid on paper never replaces the specific experience required for a given task - risk management starts with a realistic allocation of responsibilities."},
      {id:"dwh",icon:"🔥",color:C.gold2,name:"Deepwater Horizon (2010)",
       angle:"Systemic safety/environmental culture failure",
       text:"The explosion of the Deepwater Horizon platform in the Gulf of Mexico in 2010 caused 11 deaths and the largest oil spill in US history. The investigation identified a series of decisions made to save time and reduce costs, at the expense of several safety warnings ignored at different levels of the decision chain.",
       lesson:"A systemic failure is never the fault of one person alone - it results from an accumulation of accepted compromises at every level, until no one says no anymore."},
    ],
    es:[
      {id:"princess",icon:"🚢",color:C.red,name:"Princess / Carnival - reincidencia (2019-2022)",
       angle:"Cultura corporativa y reincidencia",
       text:"Tras su condena inicial de 40 millones $ en 2017 (ver Leccion 2), Carnival quedo bajo libertad condicional con un plan de cumplimiento ambiental supervisado por un tribunal. En 2019, la empresa se declaro culpable nuevamente de 6 violaciones de la condicional: envio de equipos secretos para preparar los buques antes de las auditorias independientes, falsificacion de registros de formacion ambiental, y descarga de plastico mezclado con residuos alimentarios en aguas de las Bahamas. Multa adicional de 20 millones $. Una nueva violacion en 2022 elevo el total a 61 millones $. El juez federal atribuyo explicitamente esta reincidencia a una cultura corporativa que 'busca minimizar o evitar informacion negativa, incomoda o amenazante'.",
       lesson:"Una sola condena no basta para cambiar una cultura corporativa deficiente - el cumplimiento debe reconstruirse en profundidad, no simularse para las auditorias."},
      {id:"exxon",icon:"🛢️",color:C.orange,name:"Exxon Valdez (1989)",
       angle:"Fallo de gestión de riesgos",
       text:"El petrolero Exxon Valdez encallo en Alaska en 1989, causando uno de los mayores derrames de petroleo de la historia. La investigacion revelo que un tercer oficial estaba al timon en un canal que requeria experiencia especifica, mientras el Capitan habia abandonado el puente - un fallo de gestion de recursos y riesgos, no un simple accidente tecnico.",
       lesson:"Un certificado valido en el papel nunca sustituye la experiencia especifica requerida para una tarea dada - la gestion de riesgos comienza con una asignacion realista de responsabilidades."},
      {id:"dwh",icon:"🔥",color:C.gold2,name:"Deepwater Horizon (2010)",
       angle:"Fallo sistémico de la cultura de seguridad/ambiente",
       text:"La explosion de la plataforma Deepwater Horizon en el Golfo de Mexico en 2010 causo 11 muertes y el mayor derrame de petroleo de la historia de EE.UU. La investigacion identifico una serie de decisiones tomadas para ahorrar tiempo y reducir costos, a expensas de varias alertas de seguridad ignoradas en diferentes niveles de la cadena de decision.",
       lesson:"Un fallo sistemico nunca es culpa de una sola persona - resulta de una acumulacion de compromisos aceptados en cada nivel, hasta que ya nadie dice que no."},
    ],
    pt:[
      {id:"princess",icon:"🚢",color:C.red,name:"Princess / Carnival - reincidência (2019-2022)",
       angle:"Cultura corporativa e reincidência",
       text:"Apos sua condenacao inicial de 40 milhoes $ em 2017 (ver Licao 2), a Carnival ficou em liberdade condicional com um plano de conformidade ambiental supervisionado por tribunal. Em 2019, a empresa se declarou culpada novamente de 6 violacoes da condicional: envio de equipes secretas para preparar os navios antes das auditorias independentes, falsificacao de registos de treinamento ambiental, e descarga de plastico misturado com residuos alimentares em aguas das Bahamas. Multa adicional de 20 milhoes $. Uma nova violacao em 2022 elevou o total a 61 milhoes $. O juiz federal atribuiu explicitamente essa reincidencia a uma cultura corporativa que 'busca minimizar ou evitar informacoes negativas, desconfortaveis ou ameacadoras'.",
       lesson:"Uma unica condenacao nao basta para mudar uma cultura corporativa deficiente - a conformidade deve ser reconstruida em profundidade, nao simulada para as auditorias."},
      {id:"exxon",icon:"🛢️",color:C.orange,name:"Exxon Valdez (1989)",
       angle:"Falha de gestão de riscos",
       text:"O petroleiro Exxon Valdez encalhou no Alasca em 1989, causando um dos maiores derramamentos de petroleo da historia. A investigacao revelou que um terceiro oficial estava ao leme num canal que exigia experiencia especifica, enquanto o Comandante havia deixado o passadico - uma falha de gestao de recursos e riscos, nao um simples acidente tecnico.",
       lesson:"Um certificado valido no papel nunca substitui a experiencia especifica exigida para uma tarefa dada - a gestao de riscos comeca com uma distribuicao realista de responsabilidades."},
      {id:"dwh",icon:"🔥",color:C.gold2,name:"Deepwater Horizon (2010)",
       angle:"Falha sistêmica da cultura de segurança/ambiente",
       text:"A explosao da plataforma Deepwater Horizon no Golfo do Mexico em 2010 causou 11 mortes e o maior derramamento de petroleo da historia dos EUA. A investigacao identificou uma serie de decisoes tomadas para economizar tempo e reduzir custos, a custa de varios alertas de seguranca ignorados em diferentes niveis da cadeia de decisao.",
       lesson:"Uma falha sistemica nunca e culpa de uma unica pessoa - resulta de um acumulo de compromissos aceitos em cada nivel, ate que ninguem mais diga nao."},
    ],
  };
  const list = cases[lang]||cases.fr;
  const sel_ = sel!==null ? list.find(c=>c.id===sel) : null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:8}}>
        {list.map(c=>(
          <div key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)}
            style={{padding:"12px 14px",borderRadius:14,cursor:"pointer",
              background:sel===c.id?`${c.color}18`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===c.id?c.color:"rgba(255,255,255,0.1)"}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>{c.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:sel===c.id?c.color:C.white}}>{c.name}</div>
                <div style={{fontSize:10,color:C.muted}}>{c.angle}</div>
              </div>
              <span style={{fontSize:12,color:C.muted}}>{sel===c.id?"▲":"▼"}</span>
            </div>
            {sel===c.id&&<div style={{marginTop:10,animation:"fadeUp 0.3s ease"}}>
              <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:8}}>{c.text}</div>
              <div style={{padding:"8px 10px",borderRadius:8,background:"rgba(30,138,74,0.1)",borderLeft:`3px solid ${C.green}`,fontSize:11,color:C.white,lineHeight:1.6}}>
                <strong style={{color:C.green}}>{lang==="fr"?"Leçon : ":lang==="en"?"Lesson: ":lang==="es"?"Lección: ":"Lição: "}</strong>{c.lesson}
              </div>
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SECTION 4 - QUALITIES OF AN ENVIRONMENTAL LEADER
// ══════════════════════════════════════
function LeaderSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"integrity", icon:"🧭", color:C.blue2,
      label:{fr:"Intégrité",en:"Integrity",es:"Integridad",pt:"Integridade"},
      desc:{fr:"Faire ce qui est reglementairement correct meme quand personne ne regarde, meme si cela ralentit une operation. C'est la base sur laquelle tout le reste repose.",en:"Doing what is regulatorily correct even when no one is watching, even if it slows down an operation. This is the foundation everything else rests on.",es:"Hacer lo que es reglamentariamente correcto incluso cuando nadie observa, incluso si eso ralentiza una operacion. Es la base sobre la que descansa todo lo demas.",pt:"Fazer o que e regulamentarmente correto mesmo quando ninguem esta observando, mesmo que isso atrase uma operacao. E a base sobre a qual tudo o resto se apoia."} },
    { id:"transparency", icon:"🔍", color:C.teal,
      label:{fr:"Transparence",en:"Transparency",es:"Transparencia",pt:"Transparência"},
      desc:{fr:"Documenter honnetement ce qui s'est reellement passe, meme quand c'est inconfortable. La transparence est exactement ce que le juge federal a reproche a Carnival de ne pas avoir.",en:"Honestly documenting what actually happened, even when uncomfortable. Transparency is exactly what the federal judge criticized Carnival for lacking.",es:"Documentar honestamente lo que realmente ocurrio, incluso cuando es incomodo. La transparencia es exactamente lo que el juez federal reprocho a Carnival por no tener.",pt:"Documentar honestamente o que realmente aconteceu, mesmo quando e desconfortavel. A transparencia e exatamente o que o juiz federal criticou a Carnival por nao ter."} },
    { id:"accountability", icon:"✋", color:C.gold2,
      label:{fr:"Responsabilité assumée",en:"Accountability",es:"Responsabilidad asumida",pt:"Responsabilidade assumida"},
      desc:{fr:"Assumer les consequences de ses propres decisions, sans chercher a rejeter la faute sur un subordonne ou une procedure. Le Chief Engineer reste responsable meme quand une tache est deleguee.",en:"Owning the consequences of one's own decisions, without shifting blame onto a subordinate or a procedure. The Chief Engineer remains responsible even when a task is delegated.",es:"Asumir las consecuencias de las propias decisiones, sin buscar culpar a un subordinado o a un procedimiento. El Chief Engineer sigue siendo responsable incluso cuando una tarea se delega.",pt:"Assumir as consequencias das proprias decisoes, sem procurar culpar um subordinado ou um procedimento. O Chief Engineer permanece responsavel mesmo quando uma tarefa e delegada."} },
    { id:"courage", icon:"🦁", color:C.red,
      label:{fr:"Courage",en:"Courage",es:"Valentía",pt:"Coragem"},
      desc:{fr:"Le courage de dire non lorsqu'un ordre met en danger l'environnement ou viole la reglementation - meme face a une pression hierarchique ou commerciale. C'est la qualite la plus difficile a exercer, et la plus determinante.",en:"The courage to say no when an order endangers the environment or violates regulations - even under hierarchical or commercial pressure. This is the hardest quality to exercise, and the most decisive.",es:"El valor de decir no cuando una orden pone en peligro el medio ambiente o viola la reglamentacion - incluso ante presion jerarquica o comercial. Es la cualidad mas dificil de ejercer, y la mas decisiva.",pt:"A coragem de dizer nao quando uma ordem coloca em risco o ambiente ou viola a regulamentacao - mesmo sob pressao hierarquica ou comercial. E a qualidade mais dificil de exercer, e a mais decisiva."} },
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
        {lang==="fr"?"Touche une qualité pour les détails":lang==="en"?"Tap a quality for details":lang==="es"?"Toca una cualidad para detalles":"Toque numa qualidade para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// ENVIRONMENTAL LEADERSHIP COMMITMENTS
// ══════════════════════════════════════
function LeadershipCommitments({ lang }) {
  const items = {
    fr:["Je signale les non-conformités honnêtement","Je ne falsifie jamais un registre environnemental","J'encourage les officiers juniors à s'exprimer","Je protège l'environnement même sous pression opérationnelle","Je refuse un ordre qui viole la réglementation environnementale","Je considère l'environnement comme une valeur, pas une contrainte"],
    en:["I report non-conformities honestly","I never falsify environmental records","I encourage junior crew to speak up","I protect the environment even under operational pressure","I refuse an order that violates environmental regulations","I treat the environment as a value, not a constraint"],
    es:["Reporto las no conformidades con honestidad","Nunca falsifico un registro ambiental","Animo a los oficiales junior a expresarse","Protejo el medio ambiente incluso bajo presión operativa","Rechazo una orden que viole la reglamentación ambiental","Considero el medio ambiente un valor, no una restricción"],
    pt:["Reporto as não conformidades com honestidade","Nunca falsifico um registo ambiental","Incentivo os oficiais juniores a se expressarem","Protejo o ambiente mesmo sob pressão operacional","Recuso uma ordem que viole a regulamentação ambiental","Considero o ambiente um valor, não uma restrição"],
  };
  const title = {fr:"Engagements de leadership environnemental",en:"Environmental Leadership Commitments",es:"Compromisos de liderazgo ambiental",pt:"Compromissos de liderança ambiental"};
  const list = items[lang]||items.fr;
  const [checked,setChecked]=useState(Array(list.length).fill(false));
  const toggle=i=>setChecked(c=>c.map((v,j)=>j===i?!v:v));
  const done=checked.filter(Boolean).length;
  return(
    <div>
      <div style={{fontSize:12,fontWeight:700,color:C.gold2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎖️ {title[lang]||title.fr}</div>
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
// ETHICAL SCENARIO EXERCISE
// ══════════════════════════════════════
function EthicalScenario({ lang, t }) {
  const [ans,setAns]=useState("");
  const [showC,setShowC]=useState(false);
  const d = {
    fr:{
      q:"Ton Chef Mécanicien te demande de falsifier une entrée de l'Oil Record Book pour éviter un retard au port. Que fais-tu ?",
      model:"Refuser poliment mais fermement, en expliquant que l'ORB est un document légal et que la falsification expose personnellement les deux parties à des poursuites pénales - comme vu dans le cas Ocean Princess (Leçon 4). Proposer une solution alternative conforme (documenter honnêtement le retard réel). Si la pression persiste, remonter la situation au DPA (Leçon 5), qui a un accès direct à la direction sans filtre hiérarchique. Le courage de dire non protège autant le navire que la carrière de l'officier lui-même.",
    },
    en:{
      q:"Your Chief Engineer asks you to falsify an Oil Record Book entry to avoid a delay in port. What do you do?",
      model:"Refuse politely but firmly, explaining that the ORB is a legal document and that falsification personally exposes both parties to criminal prosecution - as seen in the Ocean Princess case (Lesson 4). Propose a compliant alternative solution (honestly documenting the actual delay). If pressure persists, escalate to the DPA (Lesson 5), who has direct access to management without hierarchical filtering. The courage to say no protects both the vessel and the officer's own career.",
    },
    es:{
      q:"Tu Jefe de Máquinas te pide falsificar una entrada del Oil Record Book para evitar un retraso en puerto. ¿Qué haces?",
      model:"Negarse educada pero firmemente, explicando que el ORB es un documento legal y que la falsificación expone personalmente a ambas partes a procesos penales - como se vio en el caso Ocean Princess (Lección 4). Proponer una solución alternativa conforme (documentar honestamente el retraso real). Si la presión persiste, escalar la situación al DPA (Lección 5), que tiene acceso directo a la dirección sin filtro jerárquico. El valor de decir no protege tanto al buque como a la carrera del propio oficial.",
    },
    pt:{
      q:"Seu Chefe de Máquinas pede que você falsifique uma entrada do Oil Record Book para evitar um atraso no porto. O que você faz?",
      model:"Recusar educada mas firmemente, explicando que o ORB é um documento legal e que a falsificação expõe pessoalmente ambas as partes a processos penais - como visto no caso Ocean Princess (Lição 4). Propor uma solução alternativa conforme (documentar honestamente o atraso real). Se a pressão persistir, escalar a situação ao DPA (Lição 5), que tem acesso direto à direção sem filtro hierárquico. A coragem de dizer não protege tanto o navio quanto a carreira do próprio oficial.",
    },
  };
  const c = d[lang]||d.fr;
  return(
    <div>
      <div style={{background:"rgba(192,57,43,0.1)",borderRadius:12,padding:"14px",marginBottom:12,border:`1px solid ${C.red}44`}}>
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:6,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"SCÉNARIO ÉTHIQUE":lang==="en"?"ETHICAL SCENARIO":lang==="es"?"ESCENARIO ÉTICO":"CENÁRIO ÉTICO"}</div>
        <div style={{fontSize:13,color:C.white,lineHeight:1.6}}>{c.q}</div>
      </div>
      <textarea value={ans} onChange={e=>setAns(e.target.value)} placeholder={lang==="fr"?"Ta réponse...":lang==="en"?"Your answer...":lang==="es"?"Tu respuesta...":"Sua resposta..."}
        rows={4} style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${C.border}`,color:C.white,fontSize:13,fontFamily:"inherit",marginBottom:10,boxSizing:"border-box",resize:"vertical"}}/>
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>
        <strong style={{color:C.green}}>{lang==="fr"?"Piste de réflexion : ":lang==="en"?"Suggested approach: ":lang==="es"?"Enfoque sugerido: ":"Abordagem sugerida: "}</strong>{c.model}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Quelle est la différence essentielle entre responsabilité civile et pénale ?",opts:["Aucune différence","La responsabilité pénale sanctionne une infraction réglementaire, la civile répare un dommage économique ou contractuel","La civile est toujours plus grave","La pénale ne concerne que les compagnies"],correct:1,expl:"La responsabilité pénale sanctionne une infraction (comme dans le cas Ocean Princess), tandis que la responsabilité civile répare un préjudice économique ou contractuel (comme dans l'affaire Rowan)."},
    {q:"Suivre un ordre illégal protège-t-il un officier de toute poursuite ?",opts:["Oui, toujours","Non, comme l'a montré le cas Ocean Princess où plusieurs officiers ont été poursuivis individuellement","Oui, si l'ordre vient du Capitaine","Non, sauf si l'officier est junior"],correct:1,expl:"Le cas Ocean Précédent a montré que suivre un ordre illégal n'exonère jamais l'officier qui l'exécute de sa responsabilité individuelle."},
    {q:"À quoi le juge fédéral a-t-il attribué la récidive de Carnival ?",opts:["Un manque de moyens financiers","Une culture d'entreprise cherchant à minimiser ou éviter les informations négatives","Une erreur administrative isolée","Un problème purement technique"],correct:1,expl:"Le juge a explicitement attribué la récidive à une culture d'entreprise évitant les informations négatives, inconfortables ou menaçantes."},
    {q:"Quelle qualité de leadership consiste à dire non à un ordre qui viole la réglementation environnementale ?",opts:["Intégrité","Transparence","Courage","Responsabilité assumée"],correct:2,expl:"Le courage est spécifiquement la qualité qui permet de refuser un ordre dangereux ou non conforme, même sous pression."},
    {q:"Quelle est la phrase de clôture de ce module MARPOL ?",opts:["La conformité coûte toujours trop cher","Le futur Chef Mécanicien n'est pas seulement responsable des machines - il est responsable de la protection de l'océan","Les amendes sont le seul moyen de dissuasion","Personne n'est jamais responsable individuellement"],correct:1,expl:"Cette phrase résume l'esprit de tout le module : la responsabilité d'un Chef Mécanicien dépasse la seule maîtrise technique."},
  ],
  en:[
    {q:"What is the essential difference between civil and criminal liability?",opts:["No difference","Criminal liability sanctions a regulatory offense, civil liability repairs an economic or contractual damage","Civil is always more serious","Criminal only concerns companies"],correct:1,expl:"Criminal liability sanctions an offense (as in the Ocean Princess case), while civil liability repairs an economic or contractual damage (as in the Rowan case)."},
    {q:"Does following an illegal order protect an officer from any prosecution?",opts:["Yes, always","No, as shown by the Ocean Princess case where several officers were individually prosecuted","Yes, if the order comes from the Master","No, except for junior officers"],correct:1,expl:"The Ocean Princess case showed that following an illegal order never exempts the officer who carries it out from individual responsibility."},
    {q:"What did the federal judge attribute Carnival's recidivism to?",opts:["A lack of financial resources","A corporate culture seeking to minimize or avoid negative information","An isolated administrative error","A purely technical problem"],correct:1,expl:"The judge explicitly attributed the recidivism to a corporate culture avoiding negative, uncomfortable, or threatening information."},
    {q:"Which leadership quality involves saying no to an order that violates environmental regulations?",opts:["Integrity","Transparency","Courage","Accountability"],correct:2,expl:"Courage is specifically the quality that allows refusing a dangerous or non-compliant order, even under pressure."},
    {q:"What is the closing phrase of this MARPOL module?",opts:["Compliance always costs too much","The future Chief Engineer is not only responsible for machinery - he is responsible for protecting the ocean","Fines are the only deterrent","No one is ever individually responsible"],correct:1,expl:"This phrase sums up the spirit of the whole module: a Chief Engineer's responsibility goes beyond technical mastery alone."},
  ],
  es:[
    {q:"¿Cuál es la diferencia esencial entre responsabilidad civil y penal?",opts:["Ninguna diferencia","La responsabilidad penal sanciona una infracción reglamentaria, la civil repara un daño económico o contractual","La civil siempre es más grave","La penal solo concierne a las compañías"],correct:1,expl:"La responsabilidad penal sanciona una infracción (como en el caso Ocean Princess), mientras que la civil repara un perjuicio económico o contractual (como en el caso Rowan)."},
    {q:"¿Seguir una orden ilegal protege a un oficial de cualquier proceso?",opts:["Sí, siempre","No, como mostró el caso Ocean Princess donde varios oficiales fueron procesados individualmente","Sí, si la orden viene del Capitán","No, excepto para los oficiales junior"],correct:1,expl:"El caso Ocean Princess mostró que seguir una orden ilegal nunca exime al oficial que la ejecuta de su responsabilidad individual."},
    {q:"¿A qué atribuyó el juez federal la reincidencia de Carnival?",opts:["Falta de recursos financieros","Una cultura corporativa que busca minimizar o evitar información negativa","Un error administrativo aislado","Un problema puramente técnico"],correct:1,expl:"El juez atribuyó explícitamente la reincidencia a una cultura corporativa que evita información negativa, incómoda o amenazante."},
    {q:"¿Qué cualidad de liderazgo consiste en decir no a una orden que viola la reglamentación ambiental?",opts:["Integridad","Transparencia","Valentía","Responsabilidad asumida"],correct:2,expl:"La valentía es específicamente la cualidad que permite rechazar una orden peligrosa o no conforme, incluso bajo presión."},
    {q:"¿Cuál es la frase de cierre de este módulo MARPOL?",opts:["El cumplimiento siempre cuesta demasiado","El futuro Jefe de Máquinas no solo es responsable de la maquinaria - es responsable de proteger el océano","Las multas son el único elemento disuasorio","Nadie es nunca responsable individualmente"],correct:1,expl:"Esta frase resume el espíritu de todo el módulo: la responsabilidad de un Jefe de Máquinas va más allá del mero dominio técnico."},
  ],
  pt:[
    {q:"Qual é a diferença essencial entre responsabilidade civil e penal?",opts:["Nenhuma diferença","A responsabilidade penal sanciona uma infração regulamentar, a civil repara um dano económico ou contratual","A civil é sempre mais grave","A penal só diz respeito às empresas"],correct:1,expl:"A responsabilidade penal sanciona uma infração (como no caso Ocean Princess), enquanto a civil repara um prejuízo económico ou contratual (como no caso Rowan)."},
    {q:"Seguir uma ordem ilegal protege um oficial de qualquer processo?",opts:["Sim, sempre","Não, como mostrou o caso Ocean Princess onde vários oficiais foram processados individualmente","Sim, se a ordem vier do Comandante","Não, exceto para oficiais juniores"],correct:1,expl:"O caso Ocean Princess mostrou que seguir uma ordem ilegal nunca isenta o oficial que a executa de sua responsabilidade individual."},
    {q:"A que o juiz federal atribuiu a reincidência da Carnival?",opts:["Falta de recursos financeiros","Uma cultura corporativa que busca minimizar ou evitar informações negativas","Um erro administrativo isolado","Um problema puramente técnico"],correct:1,expl:"O juiz atribuiu explicitamente a reincidência a uma cultura corporativa que evita informações negativas, desconfortáveis ou ameaçadoras."},
    {q:"Qual qualidade de liderança consiste em dizer não a uma ordem que viola a regulamentação ambiental?",opts:["Integridade","Transparência","Coragem","Responsabilidade assumida"],correct:2,expl:"A coragem é especificamente a qualidade que permite recusar uma ordem perigosa ou não conforme, mesmo sob pressão."},
    {q:"Qual é a frase de encerramento deste módulo MARPOL?",opts:["A conformidade sempre custa demais","O futuro Chefe de Máquinas não é apenas responsável pela maquinaria - é responsável por proteger o oceano","As multas são o único elemento dissuasor","Ninguém é nunca responsável individualmente"],correct:1,expl:"Esta frase resume o espírito de todo o módulo: a responsabilidade de um Chefe de Máquinas vai além do simples domínio técnico."},
  ],
};

const BANK = {
  fr:[
    {q:"Quel document légal fait le lien entre l'Annexe I et la responsabilité pénale individuelle ?",opts:["Le Garbage Record Book","L'Oil Record Book","Le BDN","Le certificat IAPP"],correct:1,expl:"L'Oil Record Book, falsifié dans le cas Ocean Princess (Leçon 4), a directement conduit à des poursuites pénales individuelles."},
    {q:"Le vetting SIRE peut-il entraîner une conséquence purement commerciale, sans amende ?",opts:["Non, il y a toujours une amende","Oui, comme dans l'affaire Rowan où la sanction fut purement commerciale","Non, le vetting n'a aucune conséquence","Oui, mais uniquement pour les tankers gaziers"],correct:1,expl:"L'affaire Rowan (Leçon 5) a montré qu'une mauvaise conformité peut fermer l'accès au marché commercial sans aucune amende ni poursuite pénale."},
    {q:"Quel est le rôle du DPA face à une non-conformité grave ?",opts:["Il n'a aucun rôle","Il doit être notifié et a un accès direct à la direction, sans filtre hiérarchique","Il ne s'occupe que des questions de sécurité, jamais d'environnement","Il remplace le Capitaine en cas de non-conformité"],correct:1,expl:"Le DPA, exigé par le Code ISM, doit être notifié des non-conformités graves et dispose d'un accès direct à la direction générale."},
    {q:"Combien de temps l'Oil Record Book doit-il être conservé à bord ?",opts:["1 an","3 ans minimum","10 ans","Aucune durée fixée"],correct:1,expl:"Comme vu en Leçon 2, l'Oil Record Book doit être conservé à bord au minimum 3 ans."},
    {q:"Quel type de responsabilité a été engagé dans le cas Ocean Princess ?",opts:["Uniquement civile","Pénale, avec poursuites individuelles contre plusieurs officiers","Aucune responsabilité","Uniquement administrative"],correct:1,expl:"Le cas Ocean Princess a engagé la responsabilité pénale du Chef mécanicien, du Second capitaine, du Capitaine et même du gestionnaire commercial."},
    {q:"Pourquoi la récidive de Carnival est-elle un cas d'école pour cette leçon ?",opts:["Parce qu'elle montre qu'une seule condamnation suffit à corriger une culture","Parce qu'elle illustre qu'une culture d'entreprise défaillante ne se corrige pas par une seule sanction","Parce qu'elle ne concerne que des questions techniques","Parce qu'elle n'a eu aucune conséquence financière"],correct:1,expl:"La récidive de Carnival illustre parfaitement qu'un changement de culture réel prend du temps et une volonté sincère, pas seulement une amende."},
    {q:"Quelle pratique spécifique Carnival a-t-elle utilisée pour tromper les auditeurs indépendants ?",opts:["Aucune pratique frauduleuse","L'envoi d'équipes secrètes pour préparer les navires avant les audits","La falsification de tous les certificats IAPP","Le remplacement des inspecteurs par des employés"],correct:1,expl:"Carnival a envoyé des équipes non déclarées pour préparer les navires avant les inspections indépendantes requises durant la probation."},
    {q:"Dans le cas Exxon Valdez, quelle était la défaillance principale ?",opts:["Une panne mécanique du gouvernail","Un troisième officier tenant la barre sans l'expérience spécifique requise, en l'absence du Capitaine","Un défaut de fabrication de la coque","Une erreur de météorologie"],correct:1,expl:"Le troisième officier ne disposait pas de l'expérience spécifique pour ce chenal, et le Capitaine avait quitté la passerelle."},
    {q:"Dans le cas Deepwater Horizon, qu'est-ce qui a principalement contribué à la catastrophe ?",opts:["Une tempête imprévisible","Une série de décisions pour gagner du temps et réduire les coûts, au détriment d'alertes de sécurité ignorées","Un sabotage externe","Un défaut isolé d'un seul employé"],correct:1,expl:"L'enquête a identifié une accumulation de compromis acceptés à plusieurs niveaux de décision, chacun ignorant des alertes de sécurité."},
    {q:"Quelle qualité de leadership correspond à assumer les conséquences de ses propres décisions ?",opts:["Courage","Transparence","Responsabilité assumée (Accountability)","Intégrité"],correct:2,expl:"L'Accountability consiste précisément à assumer les conséquences de ses décisions, sans rejeter la faute sur un subordonné."},
    {q:"Qu'est-ce qu'une culture du signalement sans blâme (no-blame reporting culture) ?",opts:["Une culture qui ignore toutes les erreurs","Une culture qui distingue l'erreur honnête à corriger de la faute délibérée à sanctionner","Une culture qui sanctionne systématiquement toute erreur","Une culture réservée aux officiers seniors"],correct:1,expl:"Une culture saine encourage le signalement des erreurs honnêtes pour les corriger, sans confondre cela avec une faute délibérée à sanctionner."},
    {q:"Le Chief Engineer influence-t-il la culture environnementale d'un navire par ses paroles ou par ses actes ?",opts:["Uniquement par ses paroles","Principalement par ses actes - l'équipage observe ce qu'il fait plus que ce qu'il dit","Aucun des deux","Uniquement lors des réunions officielles"],correct:1,expl:"L'équipage observe le comportement réel du Chief Engineer bien plus que ses discours - un chef qui contourne une procédure enseigne implicitement que la conformité est négociable."},
    {q:"Une compagnie peut-elle être poursuivie en plus des individus impliqués dans une infraction MARPOL ?",opts:["Non, seuls les individus peuvent être poursuivis","Oui, la compagnie et les individus peuvent être poursuivis simultanément","Non, la compagnie est toujours protégée","Oui, mais uniquement la compagnie, jamais les individus"],correct:1,expl:"Les cas Ocean Princess et Princess/Carnival montrent que la compagnie ET les individus impliqués peuvent être poursuivis simultanément."},
    {q:"Quelle est la compétence finale que cette leçon vise à transmettre ?",opts:["Savoir uniquement remplir les registres obligatoires","Savoir montrer l'exemple en matière de responsabilité environnementale, y compris sous pression","Savoir éviter toute inspection PSC","Savoir négocier une réduction d'amende"],correct:1,expl:"Cette leçon vise à donner à l'élève la capacité de montrer l'exemple en matière de responsabilité environnementale, et de savoir agir quand la conformité entre en conflit avec la pression."},
    {q:"Quel est le message final de tout le module MARPOL Engine Room ?",opts:["Les amendes sont le seul vrai risque à éviter","La protection de l'environnement marin est autant une obligation internationale qu'un engagement professionnel partagé par chaque marin","Seuls les officiers seniors sont responsables de l'environnement","La conformité environnementale n'a aucun impact commercial"],correct:1,expl:"Ce message de clôture rappelle que la conformité environnementale est à la fois une obligation légale et un engagement professionnel individuel."},
  ],
  en:[
    {q:"Which legal document links Annex I to individual criminal liability?",opts:["The Garbage Record Book","The Oil Record Book","The BDN","The IAPP certificate"],correct:1,expl:"The Oil Record Book, falsified in the Ocean Princess case (Lesson 4), directly led to individual criminal prosecutions."},
    {q:"Can SIRE vetting result in a purely commercial consequence, without a fine?",opts:["No, there is always a fine","Yes, as in the Rowan case where the sanction was purely commercial","No, vetting has no consequence","Yes, but only for gas tankers"],correct:1,expl:"The Rowan case (Lesson 5) showed that poor compliance can close access to the commercial market without any fine or criminal prosecution."},
    {q:"What is the DPA's role facing a serious non-conformity?",opts:["No role at all","They must be notified and have direct access to management, without hierarchical filtering","They only handle safety matters, never environment","They replace the Master in case of non-conformity"],correct:1,expl:"The DPA, required by the ISM Code, must be notified of serious non-conformities and has direct access to top management."},
    {q:"How long must the Oil Record Book be kept on board?",opts:["1 year","Minimum 3 years","10 years","No set period"],correct:1,expl:"As seen in Lesson 2, the Oil Record Book must be kept on board for a minimum of 3 years."},
    {q:"What type of liability was engaged in the Ocean Princess case?",opts:["Only civil","Criminal, with individual prosecutions against several officers","No liability","Only administrative"],correct:1,expl:"The Ocean Princess case engaged the criminal liability of the Chief Engineer, Chief Officer, Master and even the commercial manager."},
    {q:"Why is Carnival's recidivism a textbook case for this lesson?",opts:["Because it shows one conviction is enough to fix a culture","Because it illustrates that a failing corporate culture cannot be fixed by a single sanction","Because it only concerns technical issues","Because it had no financial consequence"],correct:1,expl:"Carnival's recidivism perfectly illustrates that real culture change takes time and genuine commitment, not just a fine."},
    {q:"What specific practice did Carnival use to deceive independent auditors?",opts:["No fraudulent practice at all","Sending undisclosed teams to prepare ships before audits","Falsifying all IAPP certificates","Replacing inspectors with employees"],correct:1,expl:"Carnival sent undisclosed teams to prepare ships before the independent inspections required during probation."},
    {q:"In the Exxon Valdez case, what was the main failure?",opts:["A mechanical rudder failure","A third mate at the helm without the specific experience required, in the Master's absence","A hull manufacturing defect","A weather forecasting error"],correct:1,expl:"The third mate lacked the specific experience for that channel, and the Master had left the bridge."},
    {q:"In the Deepwater Horizon case, what mainly contributed to the disaster?",opts:["An unpredictable storm","A series of decisions to save time and cut costs, at the expense of ignored safety warnings","External sabotage","An isolated fault of a single employee"],correct:1,expl:"The investigation identified an accumulation of compromises accepted at several decision levels, each ignoring safety warnings."},
    {q:"Which leadership quality corresponds to owning the consequences of one's own decisions?",opts:["Courage","Transparency","Accountability","Integrity"],correct:2,expl:"Accountability specifically consists of owning the consequences of one's decisions, without shifting blame onto a subordinate."},
    {q:"What is a no-blame reporting culture?",opts:["A culture that ignores all mistakes","A culture that distinguishes honest mistakes to correct from deliberate wrongdoing to sanction","A culture that systematically sanctions any mistake","A culture reserved for senior officers"],correct:1,expl:"A healthy culture encourages reporting honest mistakes to correct them, without confusing this with deliberate wrongdoing to be sanctioned."},
    {q:"Does the Chief Engineer influence a vessel's environmental culture through words or actions?",opts:["Only through words","Mainly through actions - the crew watches what they do more than what they say","Neither","Only during official meetings"],correct:1,expl:"The crew watches the Chief Engineer's actual behavior far more than their speeches - a chief who bypasses a procedure implicitly teaches that compliance is negotiable."},
    {q:"Can a company be prosecuted in addition to the individuals involved in a MARPOL offense?",opts:["No, only individuals can be prosecuted","Yes, the company and individuals can be prosecuted simultaneously","No, the company is always protected","Yes, but only the company, never individuals"],correct:1,expl:"The Ocean Princess and Princess/Carnival cases show that the company AND the individuals involved can be prosecuted simultaneously."},
    {q:"What is the final skill this lesson aims to convey?",opts:["Only knowing how to fill out mandatory records","Knowing how to lead by example on environmental responsibility, including under pressure","Only knowing how to avoid any PSC inspection","Knowing how to negotiate a fine reduction"],correct:1,expl:"This lesson aims to give the learner the ability to lead by example on environmental responsibility, and to know how to act when compliance conflicts with pressure."},
    {q:"What is the closing message of the entire MARPOL Engine Room module?",opts:["Fines are the only real risk to avoid","Protecting the marine environment is as much an international obligation as a professional commitment shared by every seafarer","Only senior officers are responsible for the environment","Environmental compliance has no commercial impact"],correct:1,expl:"This closing message reminds that environmental compliance is both a legal obligation and an individual professional commitment."},
  ],
  es:[
    {q:"¿Qué documento legal vincula el Anexo I con la responsabilidad penal individual?",opts:["El Garbage Record Book","El Oil Record Book","El BDN","El certificado IAPP"],correct:1,expl:"El Oil Record Book, falsificado en el caso Ocean Princess (Lección 4), llevó directamente a procesos penales individuales."},
    {q:"¿Puede el vetting SIRE tener una consecuencia puramente comercial, sin multa?",opts:["No, siempre hay multa","Sí, como en el caso Rowan donde la sanción fue puramente comercial","No, el vetting no tiene ninguna consecuencia","Sí, pero solo para los gaseros"],correct:1,expl:"El caso Rowan (Lección 5) mostró que un mal cumplimiento puede cerrar el acceso al mercado comercial sin ninguna multa ni proceso penal."},
    {q:"¿Cuál es el rol del DPA ante una no conformidad grave?",opts:["Ningún rol","Debe ser notificado y tiene acceso directo a la dirección, sin filtro jerárquico","Solo se ocupa de temas de seguridad, nunca de ambiente","Sustituye al Capitán en caso de no conformidad"],correct:1,expl:"El DPA, exigido por el Código ISM, debe ser notificado de las no conformidades graves y tiene acceso directo a la alta dirección."},
    {q:"¿Cuánto tiempo debe conservarse el Oil Record Book a bordo?",opts:["1 año","Mínimo 3 años","10 años","Sin plazo fijado"],correct:1,expl:"Como se vio en la Lección 2, el Oil Record Book debe conservarse a bordo un mínimo de 3 años."},
    {q:"¿Qué tipo de responsabilidad se activó en el caso Ocean Princess?",opts:["Solo civil","Penal, con procesos individuales contra varios oficiales","Ninguna responsabilidad","Solo administrativa"],correct:1,expl:"El caso Ocean Princess activó la responsabilidad penal del Jefe de Máquinas, el Primer Oficial, el Capitán e incluso el gestor comercial."},
    {q:"¿Por qué la reincidencia de Carnival es un caso de estudio para esta lección?",opts:["Porque muestra que una sola condena basta para corregir una cultura","Porque ilustra que una cultura corporativa deficiente no se corrige con una sola sanción","Porque solo concierne a cuestiones técnicas","Porque no tuvo ninguna consecuencia financiera"],correct:1,expl:"La reincidencia de Carnival ilustra perfectamente que un cambio de cultura real requiere tiempo y un compromiso genuino, no solo una multa."},
    {q:"¿Qué práctica específica usó Carnival para engañar a los auditores independientes?",opts:["Ninguna práctica fraudulenta","Enviar equipos secretos para preparar los buques antes de las auditorías","Falsificar todos los certificados IAPP","Sustituir a los inspectores por empleados"],correct:1,expl:"Carnival envió equipos no declarados para preparar los buques antes de las inspecciones independientes requeridas durante la condicional."},
    {q:"En el caso Exxon Valdez, ¿cuál fue el fallo principal?",opts:["Un fallo mecánico del timón","Un tercer oficial al timón sin la experiencia específica requerida, en ausencia del Capitán","Un defecto de fabricación del casco","Un error meteorológico"],correct:1,expl:"El tercer oficial no tenía la experiencia específica para ese canal, y el Capitán había abandonado el puente."},
    {q:"En el caso Deepwater Horizon, ¿qué contribuyó principalmente al desastre?",opts:["Una tormenta imprevisible","Una serie de decisiones para ahorrar tiempo y reducir costos, a costa de alertas de seguridad ignoradas","Un sabotaje externo","Un fallo aislado de un solo empleado"],correct:1,expl:"La investigación identificó una acumulación de compromisos aceptados en varios niveles de decisión, cada uno ignorando alertas de seguridad."},
    {q:"¿Qué cualidad de liderazgo corresponde a asumir las consecuencias de las propias decisiones?",opts:["Valentía","Transparencia","Responsabilidad asumida (Accountability)","Integridad"],correct:2,expl:"El Accountability consiste precisamente en asumir las consecuencias de las propias decisiones, sin culpar a un subordinado."},
    {q:"¿Qué es una cultura de reporte sin culpa (no-blame reporting culture)?",opts:["Una cultura que ignora todos los errores","Una cultura que distingue el error honesto a corregir de la falta deliberada a sancionar","Una cultura que sanciona sistemáticamente cualquier error","Una cultura reservada a los oficiales senior"],correct:1,expl:"Una cultura sana fomenta reportar los errores honestos para corregirlos, sin confundirlo con una falta deliberada a sancionar."},
    {q:"¿El Chief Engineer influye en la cultura ambiental de un buque por sus palabras o por sus actos?",opts:["Solo por sus palabras","Principalmente por sus actos - la tripulación observa lo que hace más que lo que dice","Ninguno de los dos","Solo en las reuniones oficiales"],correct:1,expl:"La tripulación observa el comportamiento real del Chief Engineer mucho más que sus discursos - un jefe que elude un procedimiento ensena implicitamente que el cumplimiento es negociable."},
    {q:"¿Puede una compañía ser procesada además de los individuos implicados en una infracción MARPOL?",opts:["No, solo los individuos pueden ser procesados","Sí, la compañía y los individuos pueden ser procesados simultáneamente","No, la compañía siempre está protegida","Sí, pero solo la compañía, nunca los individuos"],correct:1,expl:"Los casos Ocean Princess y Princess/Carnival muestran que la compañía Y los individuos implicados pueden ser procesados simultáneamente."},
    {q:"¿Cuál es la competencia final que esta lección busca transmitir?",opts:["Solo saber completar los registros obligatorios","Saber dar ejemplo en materia de responsabilidad ambiental, incluso bajo presión","Solo saber evitar cualquier inspección PSC","Saber negociar una reducción de multa"],correct:1,expl:"Esta lección busca dar al alumno la capacidad de dar ejemplo en materia de responsabilidad ambiental, y saber actuar cuando el cumplimiento entra en conflicto con la presión."},
    {q:"¿Cuál es el mensaje final de todo el módulo MARPOL Engine Room?",opts:["Las multas son el único riesgo real a evitar","Proteger el medio ambiente marino es tanto una obligación internacional como un compromiso profesional compartido por cada marino","Solo los oficiales senior son responsables del medio ambiente","El cumplimiento ambiental no tiene ningún impacto comercial"],correct:1,expl:"Este mensaje final recuerda que el cumplimiento ambiental es a la vez una obligación legal y un compromiso profesional individual."},
  ],
  pt:[
    {q:"Qual documento legal liga o Anexo I à responsabilidade penal individual?",opts:["O Garbage Record Book","O Oil Record Book","O BDN","O certificado IAPP"],correct:1,expl:"O Oil Record Book, falsificado no caso Ocean Princess (Lição 4), levou diretamente a processos penais individuais."},
    {q:"O vetting SIRE pode resultar numa consequência puramente comercial, sem multa?",opts:["Não, sempre há multa","Sim, como no caso Rowan onde a sanção foi puramente comercial","Não, o vetting não tem nenhuma consequência","Sim, mas apenas para os gaseiros"],correct:1,expl:"O caso Rowan (Lição 5) mostrou que uma má conformidade pode fechar o acesso ao mercado comercial sem nenhuma multa ou processo penal."},
    {q:"Qual é o papel do DPA perante uma não conformidade grave?",opts:["Nenhum papel","Deve ser notificado e tem acesso direto à direção, sem filtro hierárquico","Só trata de questões de segurança, nunca de ambiente","Substitui o Comandante em caso de não conformidade"],correct:1,expl:"O DPA, exigido pelo Código ISM, deve ser notificado das não conformidades graves e tem acesso direto à alta direção."},
    {q:"Por quanto tempo o Oil Record Book deve ser conservado a bordo?",opts:["1 ano","Mínimo 3 anos","10 anos","Sem prazo definido"],correct:1,expl:"Como visto na Lição 2, o Oil Record Book deve ser conservado a bordo por no mínimo 3 anos."},
    {q:"Que tipo de responsabilidade foi acionada no caso Ocean Princess?",opts:["Apenas civil","Penal, com processos individuais contra vários oficiais","Nenhuma responsabilidade","Apenas administrativa"],correct:1,expl:"O caso Ocean Princess acionou a responsabilidade penal do Chefe de Máquinas, do Imediato, do Comandante e até do gestor comercial."},
    {q:"Por que a reincidência da Carnival é um caso de estudo para esta lição?",opts:["Porque mostra que uma única condenação basta para corrigir uma cultura","Porque ilustra que uma cultura corporativa deficiente não se corrige com uma única sanção","Porque só diz respeito a questões técnicas","Porque não teve nenhuma consequência financeira"],correct:1,expl:"A reincidência da Carnival ilustra perfeitamente que uma mudança de cultura real exige tempo e um compromisso genuíno, não apenas uma multa."},
    {q:"Que prática específica a Carnival usou para enganar os auditores independentes?",opts:["Nenhuma prática fraudulenta","Enviar equipes secretas para preparar os navios antes das auditorias","Falsificar todos os certificados IAPP","Substituir os inspetores por funcionários"],correct:1,expl:"A Carnival enviou equipes não declaradas para preparar os navios antes das inspeções independentes exigidas durante a condicional."},
    {q:"No caso Exxon Valdez, qual foi a principal falha?",opts:["Uma falha mecânica do leme","Um terceiro oficial ao leme sem a experiência específica exigida, na ausência do Comandante","Um defeito de fabricação do casco","Um erro meteorológico"],correct:1,expl:"O terceiro oficial não tinha a experiência específica para aquele canal, e o Comandante havia deixado o passadiço."},
    {q:"No caso Deepwater Horizon, o que principalmente contribuiu para o desastre?",opts:["Uma tempestade imprevisível","Uma série de decisões para economizar tempo e reduzir custos, à custa de alertas de segurança ignorados","Uma sabotagem externa","Uma falha isolada de um único funcionário"],correct:1,expl:"A investigação identificou um acúmulo de compromissos aceitos em vários níveis de decisão, cada um ignorando alertas de segurança."},
    {q:"Qual qualidade de liderança corresponde a assumir as consequências das próprias decisões?",opts:["Coragem","Transparência","Responsabilidade assumida (Accountability)","Integridade"],correct:2,expl:"O Accountability consiste precisamente em assumir as consequências das próprias decisões, sem culpar um subordinado."},
    {q:"O que é uma cultura de reporte sem culpa (no-blame reporting culture)?",opts:["Uma cultura que ignora todos os erros","Uma cultura que distingue o erro honesto a corrigir da falta deliberada a sancionar","Uma cultura que sanciona sistematicamente qualquer erro","Uma cultura reservada aos oficiais seniores"],correct:1,expl:"Uma cultura saudável incentiva reportar os erros honestos para corrigi-los, sem confundir isso com uma falta deliberada a ser sancionada."},
    {q:"O Chief Engineer influencia a cultura ambiental de um navio por suas palavras ou por seus atos?",opts:["Apenas por suas palavras","Principalmente por seus atos - a tripulação observa o que ele faz mais do que o que diz","Nenhum dos dois","Apenas em reuniões oficiais"],correct:1,expl:"A tripulação observa o comportamento real do Chief Engineer muito mais do que seus discursos - um chefe que contorna um procedimento ensina implicitamente que a conformidade é negociável."},
    {q:"Uma empresa pode ser processada além dos indivíduos envolvidos numa infração MARPOL?",opts:["Não, apenas os indivíduos podem ser processados","Sim, a empresa e os indivíduos podem ser processados simultaneamente","Não, a empresa está sempre protegida","Sim, mas apenas a empresa, nunca os indivíduos"],correct:1,expl:"Os casos Ocean Princess e Princess/Carnival mostram que a empresa E os indivíduos envolvidos podem ser processados simultaneamente."},
    {q:"Qual é a competência final que esta lição visa transmitir?",opts:["Apenas saber preencher os registos obrigatórios","Saber liderar pelo exemplo em matéria de responsabilidade ambiental, mesmo sob pressão","Apenas saber evitar qualquer inspeção PSC","Saber negociar uma redução de multa"],correct:1,expl:"Esta lição visa dar ao aluno a capacidade de liderar pelo exemplo em matéria de responsabilidade ambiental, e saber agir quando a conformidade entra em conflito com a pressão."},
    {q:"Qual é a mensagem final de todo o módulo MARPOL Engine Room?",opts:["As multas são o único risco real a evitar","Proteger o ambiente marinho é tanto uma obrigação internacional quanto um compromisso profissional compartilhado por todo marinheiro","Apenas os oficiais seniores são responsáveis pelo ambiente","A conformidade ambiental não tem nenhum impacto comercial"],correct:1,expl:"Esta mensagem final lembra que a conformidade ambiental é ao mesmo tempo uma obrigação legal e um compromisso profissional individual."},
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
      badge:"🎖️ Module Machine · Leçon 6/6 · ⭐ Premium · 200 XP",
      title:"Leadership environnemental",
      intro:"Les Leçons 2 à 5 ont couvert la réglementation, l'opérationnel et le système de conformité. Cette dernière leçon change une dernière fois de niveau : de la conformité au leadership - ce que signifie être le type d'officier qui construit une culture environnementale saine, particulièrement en tant que futur Chief Engineer.",
      p1:"PARTIE 1 - RESPONSABILITÉ CIVILE vs PÉNALE",
      s1:"Une mise en perspective des cas déjà vus dans ce module - pas de nouveau contenu réglementaire, juste la distinction qui les relie tous.",
      p2:"PARTIE 2 - CULTURE ENVIRONNEMENTALE À BORD",
      s2:"La culture d'un navire ne se décrète pas - elle se construit au quotidien, à travers les choix visibles de chaque officier.",
      p3:"PARTIE 3 - TROIS PRÉCÉDENTS",
      s3:"Trois histoires différentes, une même leçon : la conformité environnementale se joue autant dans la culture que dans la réglementation.",
      p4:"PARTIE 4 - QUALITÉS D'UN LEADER ENVIRONNEMENTAL",
      s4:"Quatre qualités concrètes, illustrées par les cas de tout le module - pas de théorie abstraite du leadership.",
      p5:"PARTIE 5 - SCÉNARIO ÉTHIQUE",
      p6:"PARTIE 6 - TROIS CAS RÉELS",
      p7:"PARTIE 7 - BANQUE DE QUESTIONS",
      sumT:"POINTS CLÉS",
      sumP:[
        "La responsabilité pénale sanctionne une infraction, la civile répare un dommage - les deux peuvent se cumuler",
        "Suivre un ordre illégal n'exonère jamais la responsabilité individuelle d'un officier",
        "Une culture d'entreprise défaillante ne se corrige pas par une seule condamnation",
        "Le Chief Engineer influence la culture du navire par ses actes bien plus que par ses paroles",
        "Le courage de dire non est la qualité de leadership la plus déterminante",
        "La conformité environnementale est à la fois une obligation légale et un engagement professionnel individuel",
      ],
      learnedP:[
        "Distinguer responsabilité civile et pénale, et comprendre qu'elles peuvent se cumuler",
        "Comprendre l'importance d'une culture du signalement sans blâme",
        "Tirer les leçons de trois précédents majeurs (Princess/Carnival, Exxon Valdez, Deepwater Horizon)",
        "Identifier les quatre qualités d'un leader environnemental : intégrité, transparence, responsabilité assumée, courage",
        "Je sais montrer l'exemple en matière de responsabilité environnementale, et agir quand la conformité entre en conflit avec la pression",
      ],
      moduleCompleteTitle:"Félicitations !",
      moduleCompleteText:"Tu as terminé le module MARPOL Engine Room. La protection du milieu marin n'est pas seulement une obligation internationale - c'est un engagement professionnel partagé par chaque marin.",
      closingPhrase:"Le futur Chef Mécanicien n'est pas seulement responsable des machines. Il est responsable de la protection de l'océan.",
    },
    en:{
      badge:"🎖️ Engine Module · Lesson 6/6 · ⭐ Premium · 200 XP",
      title:"Environmental Leadership",
      intro:"Lessons 2 to 5 covered regulation, operations and the compliance system. This final lesson shifts level one last time: from compliance to leadership - what it means to be the kind of officer who builds a healthy environmental culture, especially as a future Chief Engineer.",
      p1:"PART 1 - CIVIL vs CRIMINAL LIABILITY",
      s1:"A perspective on the cases already seen in this module - no new regulatory content, just the distinction that connects them all.",
      p2:"PART 2 - ENVIRONMENTAL CULTURE ONBOARD",
      s2:"A vessel's culture cannot be decreed - it is built daily, through every officer's visible choices.",
      p3:"PART 3 - THREE PRECEDENTS",
      s3:"Three different stories, one shared lesson: environmental compliance is as much about culture as it is about regulation.",
      p4:"PART 4 - QUALITIES OF AN ENVIRONMENTAL LEADER",
      s4:"Four concrete qualities, illustrated through the cases of the entire module - no abstract leadership theory.",
      p5:"PART 5 - ETHICAL SCENARIO",
      p6:"PART 6 - THREE REAL CASES",
      p7:"PART 7 - QUESTION BANK",
      sumT:"KEY POINTS",
      sumP:[
        "Criminal liability sanctions an offense, civil liability repairs a damage - both can accumulate",
        "Following an illegal order never exempts an officer's individual liability",
        "A failing corporate culture cannot be fixed by a single conviction",
        "The Chief Engineer influences the vessel's culture through actions far more than words",
        "The courage to say no is the most decisive leadership quality",
        "Environmental compliance is both a legal obligation and an individual professional commitment",
      ],
      learnedP:[
        "Distinguish civil and criminal liability, and understand they can accumulate",
        "Understand the importance of a no-blame reporting culture",
        "Draw lessons from three major precedents (Princess/Carnival, Exxon Valdez, Deepwater Horizon)",
        "Identify the four qualities of an environmental leader: integrity, transparency, accountability, courage",
        "I know how to lead by example on environmental responsibility, and what to do when compliance conflicts with pressure",
      ],
      moduleCompleteTitle:"Congratulations!",
      moduleCompleteText:"You have completed the MARPOL Engine Room module. Protecting the marine environment is not only an international obligation - it is a professional commitment shared by every seafarer.",
      closingPhrase:"The future Chief Engineer is not only responsible for machinery. He is responsible for protecting the ocean.",
    },
    es:{
      badge:"🎖️ Módulo Máquinas · Lección 6/6 · ⭐ Premium · 200 XP",
      title:"Liderazgo ambiental",
      intro:"Las Lecciones 2 a 5 cubrieron la reglamentación, lo operativo y el sistema de cumplimiento. Esta última lección cambia de nivel una vez más: del cumplimiento al liderazgo - lo que significa ser el tipo de oficial que construye una cultura ambiental sana, especialmente como futuro Chief Engineer.",
      p1:"PARTE 1 - RESPONSABILIDAD CIVIL vs PENAL",
      s1:"Una perspectiva sobre los casos ya vistos en este módulo - sin nuevo contenido reglamentario, solo la distinción que los conecta a todos.",
      p2:"PARTE 2 - CULTURA AMBIENTAL A BORDO",
      s2:"La cultura de un buque no se decreta - se construye a diario, a través de las decisiones visibles de cada oficial.",
      p3:"PARTE 3 - TRES PRECEDENTES",
      s3:"Tres historias diferentes, una misma lección: el cumplimiento ambiental depende tanto de la cultura como de la reglamentación.",
      p4:"PARTE 4 - CUALIDADES DE UN LÍDER AMBIENTAL",
      s4:"Cuatro cualidades concretas, ilustradas a través de los casos de todo el módulo - sin teoría abstracta del liderazgo.",
      p5:"PARTE 5 - ESCENARIO ÉTICO",
      p6:"PARTE 6 - TRES CASOS REALES",
      p7:"PARTE 7 - BANCO DE PREGUNTAS",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "La responsabilidad penal sanciona una infracción, la civil repara un daño - ambas pueden acumularse",
        "Seguir una orden ilegal nunca exime la responsabilidad individual de un oficial",
        "Una cultura corporativa deficiente no se corrige con una sola condena",
        "El Chief Engineer influye en la cultura del buque mucho más por sus actos que por sus palabras",
        "El valor de decir no es la cualidad de liderazgo más decisiva",
        "El cumplimiento ambiental es a la vez una obligación legal y un compromiso profesional individual",
      ],
      learnedP:[
        "Distinguir responsabilidad civil y penal, y comprender que pueden acumularse",
        "Comprender la importancia de una cultura de reporte sin culpa",
        "Extraer lecciones de tres precedentes mayores (Princess/Carnival, Exxon Valdez, Deepwater Horizon)",
        "Identificar las cuatro cualidades de un líder ambiental: integridad, transparencia, responsabilidad asumida, valentía",
        "Sé cómo dar ejemplo en materia de responsabilidad ambiental, y qué hacer cuando el cumplimiento entra en conflicto con la presión",
      ],
      moduleCompleteTitle:"¡Felicidades!",
      moduleCompleteText:"Has completado el módulo MARPOL Engine Room. Proteger el medio ambiente marino no es solo una obligación internacional - es un compromiso profesional compartido por cada marino.",
      closingPhrase:"El futuro Jefe de Máquinas no solo es responsable de la maquinaria. Es responsable de proteger el océano.",
    },
    pt:{
      badge:"🎖️ Módulo Máquinas · Lição 6/6 · ⭐ Premium · 200 XP",
      title:"Liderança ambiental",
      intro:"As Lições 2 a 5 cobriram a regulamentação, o operacional e o sistema de conformidade. Esta última lição muda de nível mais uma vez: da conformidade para a liderança - o que significa ser o tipo de oficial que constrói uma cultura ambiental saudável, especialmente como futuro Chief Engineer.",
      p1:"PARTE 1 - RESPONSABILIDADE CIVIL vs PENAL",
      s1:"Uma perspectiva sobre os casos já vistos neste módulo - sem novo conteúdo regulamentar, apenas a distinção que os conecta a todos.",
      p2:"PARTE 2 - CULTURA AMBIENTAL A BORDO",
      s2:"A cultura de um navio não se decreta - constrói-se diariamente, através das escolhas visíveis de cada oficial.",
      p3:"PARTE 3 - TRÊS PRECEDENTES",
      s3:"Três histórias diferentes, uma mesma lição: a conformidade ambiental depende tanto da cultura quanto da regulamentação.",
      p4:"PARTE 4 - QUALIDADES DE UM LÍDER AMBIENTAL",
      s4:"Quatro qualidades concretas, ilustradas através dos casos de todo o módulo - sem teoria abstrata de liderança.",
      p5:"PARTE 5 - CENÁRIO ÉTICO",
      p6:"PARTE 6 - TRÊS CASOS REAIS",
      p7:"PARTE 7 - BANCO DE QUESTÕES",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "A responsabilidade penal sanciona uma infração, a civil repara um dano - ambas podem se acumular",
        "Seguir uma ordem ilegal nunca isenta a responsabilidade individual de um oficial",
        "Uma cultura corporativa deficiente não se corrige com uma única condenação",
        "O Chief Engineer influencia a cultura do navio muito mais por seus atos do que por suas palavras",
        "A coragem de dizer não é a qualidade de liderança mais decisiva",
        "A conformidade ambiental é ao mesmo tempo uma obrigação legal e um compromisso profissional individual",
      ],
      learnedP:[
        "Distinguir responsabilidade civil e penal, e compreender que podem se acumular",
        "Compreender a importância de uma cultura de reporte sem culpa",
        "Tirar lições de três precedentes maiores (Princess/Carnival, Exxon Valdez, Deepwater Horizon)",
        "Identificar as quatro qualidades de um líder ambiental: integridade, transparência, responsabilidade assumida, coragem",
        "Sei liderar pelo exemplo em matéria de responsabilidade ambiental, e o que fazer quando a conformidade entra em conflito com a pressão",
      ],
      moduleCompleteTitle:"Parabéns!",
      moduleCompleteText:"Você concluiu o módulo MARPOL Engine Room. Proteger o ambiente marinho não é apenas uma obrigação internacional - é um compromisso profissional compartilhado por todo marinheiro.",
      closingPhrase:"O futuro Chefe de Máquinas não é apenas responsável pela maquinaria. Ele é responsável por proteger o oceano.",
    },
  };
  return d[lang] || d.fr;
};

export default function LessonMARPOL_L6({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
            <div style={{fontSize:10,color:C.green,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🎖️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 6/6":lang==="en"?"Lesson 6/6":lang==="es"?"Lección 6/6":"Lição 6/6"}</div>
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
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚖️ {lang==="fr"?"RESPONSABILITÉS - INTERACTIF":lang==="en"?"LIABILITIES - INTERACTIVE":lang==="es"?"RESPONSABILIDADES - INTERACTIVO":"RESPONSABILIDADES - INTERATIVO"}</div>
              <ResponsibilitySVG lang={lang}/>
            </Card>

            <SL icon="🗣️" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🗣️ {lang==="fr"?"CULTURE À BORD - INTERACTIF":lang==="en"?"ONBOARD CULTURE - INTERACTIVE":lang==="es"?"CULTURA A BORDO - INTERACTIVO":"CULTURA A BORDO - INTERATIVO"}</div>
              <CultureSVG lang={lang}/>
            </Card>

            <SL icon="📚" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="🎖️" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎖️ {lang==="fr"?"QUALITÉS DE LEADERSHIP - INTERACTIF":lang==="en"?"LEADERSHIP QUALITIES - INTERACTIVE":lang==="es"?"CUALIDADES DE LIDERAZGO - INTERACTIVO":"QUALIDADES DE LIDERANÇA - INTERATIVO"}</div>
              <LeaderSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><LeadershipCommitments lang={lang}/></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><EthicalScenario lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}><ThreeCasesGrid lang={lang}/></Card>

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
                {lang==="fr"?"Quiz final - Module MARPOL":lang==="en"?"Final Quiz - MARPOL Module":lang==="es"?"Quiz final - Módulo MARPOL":"Quiz final - Módulo MARPOL"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 6":lang==="en"?"Lesson 6":lang==="es"?"Lección 6":"Lição 6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </div>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:16,padding:"18px 14px",borderRadius:18,background:"linear-gradient(135deg,rgba(30,138,74,0.15),rgba(201,146,42,0.12))",border:`1.5px solid ${C.gold}55`}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:19,fontWeight:700,color:C.gold2,marginBottom:8}}>🌊 {lc.moduleCompleteTitle}</div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.7}}>{lc.moduleCompleteText}</div>
            </div>

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
              {lang==="fr"?"MODULE TERMINÉ - RETOUR AU DASHBOARD →":lang==="en"?"MODULE COMPLETE - BACK TO DASHBOARD →":lang==="es"?"MÓDULO COMPLETADO - VOLVER AL PANEL →":"MÓDULO CONCLUÍDO - VOLTAR AO PAINEL →"}
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
}
