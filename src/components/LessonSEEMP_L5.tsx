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

// All Engine Department lessons (7 modules, 43 lessons total) - used for real progress computation
const ENGINE_DEPT_LESSONS = [
  ...["l1","l2","l3","l4","l5","l6","l7","l8"].map(l=>`e1-${l}`),
  ...["l1","l2","l3","l4","l5","l6","l7"].map(l=>`e2-${l}`),
  ...["l1","l2","l3","l4","l5","l6"].map(l=>`e3-${l}`),
  ...["l1","l2","l3","l4","l5","l6"].map(l=>`e6-${l}`),
  ...["l1","l2","l3","l4","l5"].map(l=>`e7-${l}`),
  ...["l1","l2","l3","l4","l5","l6"].map(l=>`e4-${l}`),
  ...["l1","l2","l3","l4","l5"].map(l=>`e5-${l}`),
];
const ENGINE_MODULES_COUNT = 7;

function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<div><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></div>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.green}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════
// GROUP 1 - VOYAGE OPTIMIZATION
// ══════════════════════════════════════
function VoyageGroupSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"planning", icon:"🗺️", color:C.blue2,
      label:{fr:"Planification de voyage",en:"Voyage Planning",es:"Planificación de viaje",pt:"Planeamento de viagem"},
      desc:{fr:"Planifier la route dans son ensemble avant le depart - pas seulement le cap, mais la vitesse prevue a chaque segment, les points de passage et les marges de securite - permet d'eviter les corrections couteuses en cours de route.",en:"Planning the entire route before departure - not just the heading, but the planned speed for each segment, waypoints and safety margins - avoids costly corrections mid-voyage.",es:"Planificar toda la ruta antes de la salida - no solo el rumbo, sino la velocidad prevista en cada tramo, los puntos de paso y los margenes de seguridad - evita correcciones costosas durante el trayecto.",pt:"Planear toda a rota antes da partida - nao apenas o rumo, mas a velocidade prevista em cada segmento, os pontos de passagem e as margens de seguranca - evita correcoes custosas durante a viagem."} },
    { id:"weather", icon:"🌦️", color:C.teal,
      label:{fr:"Routage météo",en:"Weather Routing",es:"Ruteo meteorológico",pt:"Roteamento meteorológico"},
      desc:{fr:"Adapter la route pour eviter les zones de mauvais temps ou de courants defavorables reduit la resistance a l'avancement et donc la consommation, sans necessairement rallonger significativement la distance.",en:"Adapting the route to avoid bad weather or unfavorable currents reduces resistance and therefore fuel consumption, without necessarily significantly lengthening the distance.",es:"Adaptar la ruta para evitar zonas de mal tiempo o corrientes desfavorables reduce la resistencia y por tanto el consumo, sin necesariamente alargar significativamente la distancia.",pt:"Adaptar a rota para evitar zonas de mau tempo ou correntes desfavoraveis reduz a resistencia e, portanto, o consumo, sem necessariamente alongar significativamente a distancia."} },
    { id:"speed", icon:"⏱️", color:C.gold2,
      label:{fr:"Optimisation de vitesse",en:"Speed Optimisation",es:"Optimización de velocidad",pt:"Otimização de velocidade"},
      desc:{fr:"Adapter la vitesse au juste besoin operationnel (heure d'arrivee reelle requise) plutot que naviguer systematiquement a vitesse maximale reduit fortement la consommation - le slow steaming vu en Lecon 4 en est l'illustration directe.",en:"Adapting speed to the actual operational need (real required arrival time) rather than systematically sailing at maximum speed strongly reduces consumption - the slow steaming seen in Lesson 4 is a direct illustration.",es:"Adaptar la velocidad a la necesidad operativa real (hora de llegada realmente requerida) en lugar de navegar sistematicamente a velocidad maxima reduce fuertemente el consumo - el slow steaming visto en la Leccion 4 es una ilustracion directa.",pt:"Adaptar a velocidade a necessidade operacional real (hora de chegada realmente exigida) em vez de navegar sistematicamente a velocidade maxima reduz fortemente o consumo - o slow steaming visto na Licao 4 e uma ilustracao direta."} },
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
        {lang==="fr"?"Touche un levier pour les détails":lang==="en"?"Tap a lever for details":lang==="es"?"Toca una palanca para detalles":"Toque numa alavanca para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// GROUP 2 - HULL & PROPULSION
// ══════════════════════════════════════
function HullGroupSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"fouling", icon:"🦠", color:C.red,
      label:{fr:"Encrassement de coque",en:"Hull Fouling",es:"Incrustación del casco",pt:"Incrustação do casco"},
      desc:{fr:"Les organismes marins qui s'accumulent sur la coque augmentent directement la resistance a l'avancement - un des facteurs les plus significatifs de surconsommation, souvent sous-estime.",en:"Marine organisms accumulating on the hull directly increase resistance - one of the most significant, often underestimated, factors of excess consumption.",es:"Los organismos marinos que se acumulan en el casco aumentan directamente la resistencia - uno de los factores mas significativos de sobreconsumo, a menudo subestimado.",pt:"Os organismos marinhos que se acumulam no casco aumentam diretamente a resistencia - um dos fatores mais significativos de consumo excessivo, frequentemente subestimado."} },
    { id:"propeller", icon:"🌀", color:C.gold2,
      label:{fr:"Polissage de l'hélice",en:"Propeller Polishing",es:"Pulido de la hélice",pt:"Polimento da hélice"},
      desc:{fr:"Une helice lisse et bien entretenue transmet la puissance du moteur avec un minimum de pertes - un polissage regulier restaure l'efficacite propulsive perdue par l'usure et les depots.",en:"A smooth, well-maintained propeller transmits engine power with minimal losses - regular polishing restores propulsive efficiency lost to wear and deposits.",es:"Una helice lisa y bien mantenida transmite la potencia del motor con perdidas minimas - un pulido regular restaura la eficiencia propulsiva perdida por el desgaste y los depositos.",pt:"Uma helice lisa e bem mantida transmite a potencia do motor com perdas minimas - um polimento regular restaura a eficiencia propulsiva perdida pelo desgaste e depositos."} },
    { id:"trim", icon:"⚓", color:C.teal,
      label:{fr:"Optimisation d'assiette",en:"Trim Optimisation",es:"Optimización de asiento",pt:"Otimização de caimento"},
      desc:{fr:"Ajuster l'assiette du navire (repartition avant/arriere) selon la charge et le tirant d'eau reduit la resistance hydrodynamique - un levier souvent neglige car il ne coute rien a appliquer.",en:"Adjusting the vessel's trim (fore/aft distribution) according to load and draft reduces hydrodynamic resistance - a lever often overlooked because it costs nothing to apply.",es:"Ajustar el asiento del buque (distribucion proa/popa) segun la carga y el calado reduce la resistencia hidrodinamica - una palanca a menudo descuidada porque no cuesta nada aplicarla.",pt:"Ajustar o caimento do navio (distribuicao proa/popa) conforme a carga e o calado reduz a resistencia hidrodinamica - uma alavanca frequentemente negligenciada porque nao custa nada aplicar."} },
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
        {lang==="fr"?"Touche un levier pour les détails":lang==="en"?"Tap a lever for details":lang==="es"?"Toca una palanca para detalles":"Toque numa alavanca para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// GROUP 3 - DAILY ENGINE OPERATIONS
// ══════════════════════════════════════
function DailyOpsGroupSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"aux", icon:"🔧", color:C.blue2,
      label:{fr:"Gestion des auxiliaires",en:"Auxiliary Machinery Management",es:"Gestión de auxiliares",pt:"Gestão de auxiliares"},
      desc:{fr:"Ne faire fonctionner que les equipements auxiliaires reellement necessaires, au bon moment - exactement le principe pose en Lecon 1 (pompes, generateurs) applique de maniere systematique.",en:"Only running auxiliary equipment that is actually needed, at the right time - exactly the principle set out in Lesson 1 (pumps, generators) applied systematically.",es:"Solo hacer funcionar los equipos auxiliares realmente necesarios, en el momento adecuado - exactamente el principio planteado en la Leccion 1 (bombas, generadores) aplicado sistematicamente.",pt:"Fazer funcionar apenas os equipamentos auxiliares realmente necessarios, no momento certo - exatamente o principio estabelecido na Licao 1 (bombas, geradores) aplicado sistematicamente."} },
    { id:"shorepower", icon:"🔌", color:C.gold2,
      label:{fr:"Cold Ironing",en:"Shore Power / Cold Ironing",es:"Cold Ironing",pt:"Cold Ironing"},
      desc:{fr:"Se brancher a l'alimentation electrique du quai plutot que de faire tourner les generateurs du bord pendant l'escale elimine completement les emissions et la consommation liees a la production electrique au port, quand cette option est disponible.",en:"Connecting to shore power instead of running the ship's generators during a port call completely eliminates the emissions and consumption linked to electrical production in port, when this option is available.",es:"Conectarse a la alimentacion electrica del muelle en lugar de hacer funcionar los generadores del buque durante la escala elimina completamente las emisiones y el consumo ligados a la produccion electrica en puerto, cuando esta opcion esta disponible.",pt:"Ligar-se a alimentacao eletrica do cais em vez de fazer funcionar os geradores do navio durante a escala elimina completamente as emissoes e o consumo ligados a producao eletrica no porto, quando essa opcao esta disponivel."} },
    { id:"kpi", icon:"📈", color:C.teal,
      label:{fr:"KPIs de performance",en:"Performance KPIs",es:"KPIs de rendimiento",pt:"KPIs de desempenho"},
      desc:{fr:"Suivre des indicateurs simples (consommation par mille nautique, ecart par rapport au plan de voyage) permet de verifier concretement si les efforts d'efficacite portent leurs fruits - sans indicateur, aucune amelioration ne peut etre confirmee.",en:"Tracking simple indicators (consumption per nautical mile, deviation from the voyage plan) makes it possible to concretely verify whether efficiency efforts are paying off - without an indicator, no improvement can be confirmed.",es:"Seguir indicadores simples (consumo por milla nautica, desviacion respecto al plan de viaje) permite verificar concretamente si los esfuerzos de eficiencia estan dando frutos - sin un indicador, ninguna mejora puede confirmarse.",pt:"Acompanhar indicadores simples (consumo por milha nautica, desvio em relacao ao plano de viagem) permite verificar concretamente se os esforcos de eficiencia estao a dar frutos - sem um indicador, nenhuma melhoria pode ser confirmada."} },
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
        {lang==="fr"?"Touche un levier pour les détails":lang==="en"?"Tap a lever for details":lang==="es"?"Toca una palanca para detalles":"Toque numa alavanca para detalhes"}
      </div>}
      <div style={{marginTop:10,padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`}}>
        <div style={{fontSize:11,fontWeight:700,color:C.gold2,marginBottom:4}}>💡 {lang==="fr"?"État d'esprit d'efficacité énergétique":lang==="en"?"Energy Efficiency Mindset":lang==="es"?"Mentalidad de eficiencia energética":"Mentalidade de eficiência energética"}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,fontStyle:"italic"}}>
          {lang==="fr"?"La technologie économise du carburant. Les personnes en économisent encore plus.":lang==="en"?"Technology saves fuel. People save even more.":lang==="es"?"La tecnología ahorra combustible. Las personas ahorran aún más.":"A tecnologia poupa combustível. As pessoas poupam ainda mais."}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// PRACTICAL ENERGY EFFICIENCY CHECKLIST
// ══════════════════════════════════════
function PracticalChecklist({ lang }) {
  const items = {
    fr:["J'évite de faire tourner des auxiliaires sans nécessité","Je signale toute surconsommation anormale de carburant","Je surveille l'efficacité des machines","Je soutiens l'optimisation de voyage chaque fois que possible"],
    en:["I avoid unnecessary auxiliary engine running","I report excessive fuel consumption","I monitor machinery efficiency","I support voyage optimization whenever possible"],
    es:["Evito hacer funcionar auxiliares sin necesidad","Reporto cualquier consumo excesivo de combustible","Superviso la eficiencia de las máquinas","Apoyo la optimización de viaje siempre que sea posible"],
    pt:["Evito fazer funcionar auxiliares sem necessidade","Reporto qualquer consumo excessivo de combustível","Monitorizo a eficiência das máquinas","Apoio a otimização de viagem sempre que possível"],
  };
  const title = {fr:"Checklist - Efficacité énergétique pratique",en:"Practical Energy Efficiency Checklist",es:"Checklist - Eficiencia energética práctica",pt:"Checklist - Eficiência energética prática"};
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
// EXERCISE - IMMEDIATE vs INVESTMENT
// ══════════════════════════════════════
function InvestmentTable({ lang }) {
  const rows = {
    fr:[["Optimisation de vitesse","immediate"],["Nettoyage de coque","investment"],["Routage météo","immediate"],["Cold ironing","investment"],["Optimisation d'assiette","immediate"],["Polissage de l'hélice","investment"]],
    en:[["Speed optimisation","immediate"],["Hull cleaning","investment"],["Weather routing","immediate"],["Cold ironing","investment"],["Trim optimisation","immediate"],["Propeller polishing","investment"]],
    es:[["Optimización de velocidad","immediate"],["Limpieza del casco","investment"],["Ruteo meteorológico","immediate"],["Cold ironing","investment"],["Optimización de asiento","immediate"],["Pulido de la hélice","investment"]],
    pt:[["Otimização de velocidade","immediate"],["Limpeza do casco","investment"],["Roteamento meteorológico","immediate"],["Cold ironing","investment"],["Otimização de caimento","immediate"],["Polimento da hélice","investment"]],
  };
  const headers = {fr:["Action","Immédiat","Investissement"],en:["Action","Immediate","Investment"],es:["Acción","Inmediato","Inversión"],pt:["Ação","Imediato","Investimento"]};
  const h = headers[lang]||headers.fr;
  const list = rows[lang]||rows.fr;
  return (
    <div>
      <div style={{fontSize:11,color:C.muted,marginBottom:10,lineHeight:1.6,textAlign:"center"}}>
        {lang==="fr"?"Certains leviers ne coûtent rien à appliquer dès aujourd'hui - d'autres nécessitent un investissement de la compagnie.":lang==="en"?"Some levers cost nothing to apply today - others require company investment.":lang==="es"?"Algunas palancas no cuestan nada aplicarlas hoy - otras requieren inversión de la compañía.":"Algumas alavancas não custam nada aplicar hoje - outras exigem investimento da empresa."}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:6,marginBottom:6,paddingBottom:6,borderBottom:`1px solid ${C.border}`}}>
        <div style={{fontSize:10,fontWeight:700,color:C.gold2}}>{h[0]}</div>
        <div style={{fontSize:10,fontWeight:700,color:C.green,width:60,textAlign:"center"}}>{h[1]}</div>
        <div style={{fontSize:10,fontWeight:700,color:C.orange,width:70,textAlign:"center"}}>{h[2]}</div>
      </div>
      {list.map(([label,type],i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:6,alignItems:"center",padding:"7px 0",borderBottom:i<list.length-1?"1px solid rgba(255,255,255,0.05)":"none"}}>
          <div style={{fontSize:12,color:C.white}}>{label}</div>
          <div style={{width:60,textAlign:"center",fontSize:13}}>{type==="immediate"?"✅":""}</div>
          <div style={{width:70,textAlign:"center",fontSize:13}}>{type==="investment"?"✅":""}</div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// REAL CASE - LAURA MÆRSK (2023), 4-PART NARRATIVE
// ══════════════════════════════════════
function LauraMaersk({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Cas réel - Laura Mærsk (2023)",teaser:"Premier porte-conteneurs dual-fuel méthanol au monde · Jusqu'à 100 tonnes de CO2/jour économisées",
      why:"Maersk a investi dans le methanol pour disposer d'une solution de transition disponible immediatement, sans attendre une technologie encore inexistante a grande echelle - une methode de production connue, transportable et stockable comme liquide, avec un objectif affiche de 25% de cargaison transportee en carburant vert d'ici 2030.",
      challenge:"Le methanol impose des defis techniques reels : sa consommation est environ le double de celle du carburant conventionnel pour une meme energie fournie, ce qui exige des citernes plus grandes et une gestion rigoureuse de l'approvisionnement. Les moteurs dual-fuel doivent etre exploites avec precision par des equipes formees specifiquement.",
      benefit:"En fonctionnement methanol, le navire economise jusqu'a 100 tonnes de CO2 par jour compare a un navire sœur fonctionnant au fioul lourd, avec une reduction d'environ 65% des emissions sur le cycle de vie complet - potentiellement jusqu'a 95% selon le mode de production du methanol utilise.",
      lesson:"L'innovation ne reussit que si les officiers l'exploitent correctement. Un moteur dual-fuel methanol entre de mauvaises mains n'apporte aucun des benefices annonces - la technologie ne remplace jamais la competence et la discipline operationnelle de l'equipe machine."},
    en:{title:"Real Case - Laura Mærsk (2023)",teaser:"World's first dual-fuel methanol containership · Up to 100 tons of CO2/day saved",
      why:"Maersk invested in methanol to have a transition solution available immediately, without waiting for a technology not yet available at scale - a known production method, transportable and storable as a liquid, with a stated goal of 25% of cargo transported on green fuel by 2030.",
      challenge:"Methanol poses real technical challenges: its consumption is roughly double that of conventional fuel for the same energy delivered, requiring larger tanks and rigorous supply management. Dual-fuel engines must be operated precisely by specifically trained crews.",
      benefit:"Running on methanol, the vessel saves up to 100 tons of CO2 per day compared to a sister ship running on heavy fuel oil, with a reduction of roughly 65% in lifecycle emissions - potentially up to 95% depending on the methanol production method used.",
      lesson:"Innovation only succeeds when engineers operate it correctly. A dual-fuel methanol engine in the wrong hands delivers none of the announced benefits - technology never replaces the competence and operational discipline of the engine team."},
    es:{title:"Caso real - Laura Mærsk (2023)",teaser:"Primer portacontenedores dual-fuel metanol del mundo · Hasta 100 toneladas de CO2/día ahorradas",
      why:"Maersk invirtio en metanol para disponer de una solucion de transicion disponible de inmediato, sin esperar una tecnologia aun inexistente a gran escala - un metodo de produccion conocido, transportable y almacenable como liquido, con un objetivo declarado del 25% de carga transportada con combustible verde para 2030.",
      challenge:"El metanol plantea desafios tecnicos reales: su consumo es aproximadamente el doble del combustible convencional para la misma energia entregada, lo que exige tanques mas grandes y una gestion rigurosa del suministro. Los motores dual-fuel deben ser operados con precision por tripulaciones especificamente formadas.",
      benefit:"Funcionando con metanol, el buque ahorra hasta 100 toneladas de CO2 por dia en comparacion con un buque hermano que funciona con fuel oil pesado, con una reduccion de aproximadamente 65% en las emisiones del ciclo de vida - potencialmente hasta 95% segun el metodo de produccion del metanol utilizado.",
      lesson:"La innovacion solo tiene exito cuando los ingenieros la operan correctamente. Un motor dual-fuel de metanol en malas manos no aporta ninguno de los beneficios anunciados - la tecnologia nunca reemplaza la competencia y la disciplina operativa del equipo de maquinas."},
    pt:{title:"Caso real - Laura Mærsk (2023)",teaser:"Primeiro porta-contentores dual-fuel metanol do mundo · Até 100 toneladas de CO2/dia poupadas",
      why:"A Maersk investiu em metanol para dispor de uma solucao de transicao disponivel imediatamente, sem esperar por uma tecnologia ainda inexistente em grande escala - um metodo de producao conhecido, transportavel e armazenavel como liquido, com um objetivo declarado de 25% da carga transportada com combustivel verde ate 2030.",
      challenge:"O metanol impoe desafios tecnicos reais: seu consumo e aproximadamente o dobro do combustivel convencional para a mesma energia fornecida, exigindo tanques maiores e uma gestao rigorosa do abastecimento. Os motores dual-fuel devem ser operados com precisao por equipas especificamente formadas.",
      benefit:"Funcionando a metanol, o navio poupa ate 100 toneladas de CO2 por dia em comparacao com um navio irmao a funcionar com fuel oil pesado, com uma reducao de aproximadamente 65% nas emissoes do ciclo de vida - potencialmente ate 95% conforme o metodo de producao do metanol utilizado.",
      lesson:"A inovacao so tem sucesso quando os engenheiros a operam corretamente. Um motor dual-fuel de metanol em maos erradas nao traz nenhum dos beneficios anunciados - a tecnologia nunca substitui a competencia e a disciplina operacional da equipa de maquinas."},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(30,138,74,0.08)",border:`1.5px solid ${C.green}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🌊</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.green,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:11,color:C.blue2,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"POURQUOI CE CHOIX":lang==="en"?"WHY THIS CHOICE":lang==="es"?"POR QUÉ ESTA ELECCIÓN":"POR QUE ESTA ESCOLHA"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.why}</div>
        <div style={{fontSize:11,color:C.orange,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"DÉFIS TECHNIQUES":lang==="en"?"TECHNICAL CHALLENGES":lang==="es"?"DESAFÍOS TÉCNICOS":"DESAFIOS TÉCNICOS"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.challenge}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"BÉNÉFICES OBTENUS":lang==="en"?"BENEFITS ACHIEVED":lang==="es"?"BENEFICIOS OBTENIDOS":"BENEFÍCIOS OBTIDOS"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.benefit}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`}}>
          <div style={{fontSize:11,color:C.gold2,fontWeight:700,marginBottom:4,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇON POUR UN MÉCANICIEN":lang==="en"?"LESSON FOR AN ENGINEER":lang==="es"?"LECCIÓN PARA UN MECÁNICO":"LIÇÃO PARA UM MECÂNICO"}</div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.7,fontStyle:"italic"}}>{c.lesson}</div>
        </div>
      </div>}
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Quel levier consiste à adapter la vitesse au juste besoin plutôt qu'à naviguer systématiquement au maximum ?",opts:["Le routage météo","L'optimisation de vitesse (slow steaming)","Le cold ironing","Le polissage de l'hélice"],correct:1,expl:"L'optimisation de vitesse (slow steaming) consiste à adapter la vitesse au besoin opérationnel réel plutôt qu'à naviguer systématiquement au maximum."},
    {q:"Que se passe-t-il en cas d'encrassement de coque non traité ?",opts:["Aucun impact","La résistance à l'avancement augmente, entraînant une surconsommation","Le navire devient plus rapide","La coque s'auto-nettoie avec le temps"],correct:1,expl:"L'encrassement de coque augmente directement la résistance à l'avancement, l'un des facteurs les plus significatifs de surconsommation."},
    {q:"Qu'est-ce que le Cold Ironing ?",opts:["Un type de peinture de coque","Se brancher à l'alimentation électrique du quai plutôt que de faire tourner les générateurs du bord","Un carburant alternatif","Une procédure de sécurité incendie"],correct:1,expl:"Le Cold Ironing consiste à se brancher à l'alimentation électrique du quai pendant l'escale, éliminant les émissions liées à la production électrique au port."},
    {q:"Combien de tonnes de CO2 par jour la Laura Mærsk économise-t-elle en fonctionnement méthanol ?",opts:["Jusqu'à 10 tonnes","Jusqu'à 100 tonnes","Jusqu'à 1000 tonnes","Aucune économie mesurée"],correct:1,expl:"La Laura Mærsk économise jusqu'à 100 tonnes de CO2 par jour comparée à un navire sœur fonctionnant au fioul lourd."},
    {q:"Que faut-il retenir de la leçon tirée du cas Laura Mærsk ?",opts:["La technologie seule suffit toujours","L'innovation ne réussit que si les officiers l'exploitent correctement","Le méthanol est sans aucun défi technique","Les moteurs dual-fuel ne nécessitent aucune formation"],correct:1,expl:"L'innovation ne réussit que si les officiers l'exploitent correctement - la technologie ne remplace jamais la compétence opérationnelle."},
  ],
  en:[
    {q:"Which lever consists of adapting speed to actual need rather than systematically sailing at maximum?",opts:["Weather routing","Speed optimisation (slow steaming)","Cold ironing","Propeller polishing"],correct:1,expl:"Speed optimisation (slow steaming) consists of adapting speed to the actual operational need rather than systematically sailing at maximum."},
    {q:"What happens with untreated hull fouling?",opts:["No impact","Resistance increases, causing excess consumption","The vessel becomes faster","The hull self-cleans over time"],correct:1,expl:"Hull fouling directly increases resistance, one of the most significant factors of excess consumption."},
    {q:"What is Cold Ironing?",opts:["A type of hull paint","Connecting to shore power instead of running the ship's generators","An alternative fuel","A fire safety procedure"],correct:1,expl:"Cold Ironing consists of connecting to shore power during a port call, eliminating emissions linked to electrical production in port."},
    {q:"How many tons of CO2 per day does Laura Mærsk save running on methanol?",opts:["Up to 10 tons","Up to 100 tons","Up to 1000 tons","No measured savings"],correct:1,expl:"Laura Mærsk saves up to 100 tons of CO2 per day compared to a sister ship running on heavy fuel oil."},
    {q:"What should be remembered from the lesson drawn from the Laura Mærsk case?",opts:["Technology alone is always enough","Innovation only succeeds when engineers operate it correctly","Methanol has no technical challenges at all","Dual-fuel engines require no training"],correct:1,expl:"Innovation only succeeds when engineers operate it correctly - technology never replaces operational competence."},
  ],
  es:[
    {q:"¿Qué palanca consiste en adaptar la velocidad a la necesidad real en lugar de navegar sistemáticamente al máximo?",opts:["El ruteo meteorológico","La optimización de velocidad (slow steaming)","El cold ironing","El pulido de la hélice"],correct:1,expl:"La optimización de velocidad (slow steaming) consiste en adaptar la velocidad a la necesidad operativa real en lugar de navegar sistemáticamente al máximo."},
    {q:"¿Qué ocurre con una incrustación del casco no tratada?",opts:["Ningún impacto","La resistencia aumenta, causando sobreconsumo","El buque se vuelve más rápido","El casco se autolimpia con el tiempo"],correct:1,expl:"La incrustación del casco aumenta directamente la resistencia, uno de los factores más significativos de sobreconsumo."},
    {q:"¿Qué es el Cold Ironing?",opts:["Un tipo de pintura de casco","Conectarse a la alimentación eléctrica del muelle en lugar de hacer funcionar los generadores del buque","Un combustible alternativo","Un procedimiento de seguridad contra incendios"],correct:1,expl:"El Cold Ironing consiste en conectarse a la alimentación eléctrica del muelle durante la escala, eliminando las emisiones ligadas a la producción eléctrica en puerto."},
    {q:"¿Cuántas toneladas de CO2 al día ahorra Laura Mærsk funcionando con metanol?",opts:["Hasta 10 toneladas","Hasta 100 toneladas","Hasta 1000 toneladas","Ningún ahorro medido"],correct:1,expl:"Laura Mærsk ahorra hasta 100 toneladas de CO2 al día en comparación con un buque hermano que funciona con fuel oil pesado."},
    {q:"¿Qué debe recordarse de la lección extraída del caso Laura Mærsk?",opts:["La tecnología sola siempre basta","La innovación solo tiene éxito cuando los ingenieros la operan correctamente","El metanol no tiene ningún desafío técnico","Los motores dual-fuel no requieren ninguna formación"],correct:1,expl:"La innovación solo tiene éxito cuando los ingenieros la operan correctamente - la tecnología nunca reemplaza la competencia operativa."},
  ],
  pt:[
    {q:"Qual alavanca consiste em adaptar a velocidade à necessidade real em vez de navegar sistematicamente no máximo?",opts:["O roteamento meteorológico","A otimização de velocidade (slow steaming)","O cold ironing","O polimento da hélice"],correct:1,expl:"A otimização de velocidade (slow steaming) consiste em adaptar a velocidade à necessidade operacional real em vez de navegar sistematicamente no máximo."},
    {q:"O que acontece com uma incrustação de casco não tratada?",opts:["Nenhum impacto","A resistência aumenta, causando consumo excessivo","O navio torna-se mais rápido","O casco se autolimpa com o tempo"],correct:1,expl:"A incrustação do casco aumenta diretamente a resistência, um dos fatores mais significativos de consumo excessivo."},
    {q:"O que é o Cold Ironing?",opts:["Um tipo de tinta de casco","Ligar-se à alimentação elétrica do cais em vez de fazer funcionar os geradores do navio","Um combustível alternativo","Um procedimento de segurança contra incêndio"],correct:1,expl:"O Cold Ironing consiste em ligar-se à alimentação elétrica do cais durante a escala, eliminando as emissões ligadas à produção elétrica no porto."},
    {q:"Quantas toneladas de CO2 por dia a Laura Mærsk poupa a funcionar com metanol?",opts:["Até 10 toneladas","Até 100 toneladas","Até 1000 toneladas","Nenhuma economia medida"],correct:1,expl:"A Laura Mærsk poupa até 100 toneladas de CO2 por dia em comparação com um navio irmão a funcionar com fuel oil pesado."},
    {q:"O que deve ser lembrado da lição tirada do caso Laura Mærsk?",opts:["A tecnologia sozinha sempre basta","A inovação só tem sucesso quando os engenheiros a operam corretamente","O metanol não tem nenhum desafio técnico","Os motores dual-fuel não exigem nenhuma formação"],correct:1,expl:"A inovação só tem sucesso quando os engenheiros a operam corretamente - a tecnologia nunca substitui a competência operacional."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que la planification de voyage inclut au-delà du simple cap ?",opts:["Uniquement la destination finale","La vitesse prévue à chaque segment, les points de passage et les marges de sécurité","Uniquement le nom du navire","Le menu du restaurant à bord"],correct:1,expl:"La planification de voyage inclut la vitesse prévue à chaque segment, les points de passage et les marges de sécurité, pas seulement le cap."},
    {q:"Le routage météo peut-il réduire la consommation sans rallonger significativement la distance ?",opts:["Non, jamais","Oui, en évitant les zones de mauvais temps ou de courants défavorables","Non, il rallonge toujours fortement la route","Oui, mais uniquement en hiver"],correct:1,expl:"Le routage météo réduit la résistance à l'avancement en évitant le mauvais temps, sans nécessairement rallonger significativement la distance."},
    {q:"Le polissage de l'hélice a-t-il un effet sur l'efficacité propulsive ?",opts:["Non, aucun effet","Oui, il restaure l'efficacité perdue par l'usure et les dépôts","Non, seul le moteur compte","Oui, mais uniquement sur les petits navires"],correct:1,expl:"Le polissage de l'hélice restaure l'efficacité propulsive perdue par l'usure et les dépôts, transmettant la puissance avec un minimum de pertes."},
    {q:"Qu'est-ce que l'optimisation d'assiette ?",opts:["Repeindre la coque","Ajuster la répartition avant/arrière du navire selon la charge et le tirant d'eau","Changer le carburant utilisé","Réduire le nombre de membres d'équipage"],correct:1,expl:"L'optimisation d'assiette ajuste la répartition avant/arrière du navire selon la charge et le tirant d'eau, réduisant la résistance hydrodynamique."},
    {q:"L'optimisation d'assiette coûte-t-elle un investissement pour être appliquée ?",opts:["Oui, un investissement important","Non, elle ne coûte rien à appliquer, contrairement au nettoyage de coque","Oui, elle nécessite un nouveau moteur","Non, mais elle est rarement possible"],correct:1,expl:"L'optimisation d'assiette ne coûte rien à appliquer immédiatement, contrairement à des leviers nécessitant un investissement comme le nettoyage de coque."},
    {q:"La gestion des auxiliaires reprend-elle un principe déjà vu en Leçon 1 ?",opts:["Non, c'est un concept totalement nouveau","Oui, le principe de ne faire fonctionner que ce qui est réellement nécessaire","Non, cela concerne uniquement la cargaison","Oui, mais uniquement pour les generateurs de secours"],correct:1,expl:"La gestion des auxiliaires applique systématiquement le principe posé en Leçon 1 : ne faire fonctionner que ce qui est réellement nécessaire."},
    {q:"Le Cold Ironing est-il toujours disponible dans tous les ports ?",opts:["Oui, systématiquement","Non, il s'agit d'une option disponible selon les infrastructures du port","Oui, mais uniquement pour les tankers","Non, il n'existe dans aucun port"],correct:1,expl:"Le Cold Ironing est utilisé quand cette option est disponible, selon les infrastructures du port d'escale."},
    {q:"Pourquoi suivre des KPIs de performance est-il important ?",opts:["Ce n'est pas important","Sans indicateur, aucune amélioration ne peut être confirmée concrètement","Uniquement pour satisfaire les inspecteurs","Cela n'a aucun lien avec l'efficacité énergétique"],correct:1,expl:"Sans indicateur de suivi, aucune amélioration d'efficacité énergétique ne peut être concrètement confirmée."},
    {q:"Que résume la phrase \"La technologie économise du carburant, les personnes en économisent encore plus\" ?",opts:["Que la technologie est inutile","Que le facteur humain reste déterminant, même avec les meilleures technologies","Que les personnes doivent être remplacées par des machines","Que le carburant n'a aucune importance"],correct:1,expl:"Cette phrase résume que le facteur humain reste déterminant dans l'efficacité énergétique, même avec les meilleures technologies disponibles."},
    {q:"Pourquoi Maersk a-t-il investi dans le méthanol plutôt que d'attendre une autre technologie ?",opts:["Par hasard","Pour disposer d'une solution de transition disponible immédiatement, avec une méthode de production connue","Parce que c'est le carburant le moins cher","Parce que c'est obligatoire depuis 2020"],correct:1,expl:"Maersk a choisi le méthanol pour disposer d'une solution de transition disponible immédiatement, sans attendre une technologie non encore disponible à grande échelle."},
    {q:"Quel défi technique pose le méthanol par rapport au carburant conventionnel ?",opts:["Aucun défi particulier","Une consommation environ double pour une même énergie fournie, nécessitant des citernes plus grandes","Il est impossible à stocker","Il ne peut être utilisé que sur de très petits navires"],correct:1,expl:"Le méthanol nécessite environ le double de la consommation du carburant conventionnel pour une même énergie fournie, exigeant des citernes plus grandes."},
    {q:"Quelle réduction d'émissions sur cycle de vie le méthanol permet-il d'atteindre ?",opts:["Aucune réduction mesurée","Environ 65%, potentiellement jusqu'à 95% selon le mode de production","Exactement 10%","Une augmentation des émissions"],correct:1,expl:"Le méthanol permet une réduction d'environ 65% des émissions sur cycle de vie, potentiellement jusqu'à 95% selon le mode de production utilisé."},
    {q:"Un moteur dual-fuel méthanol apporte-t-il automatiquement tous ses bénéfices, quelle que soit l'équipe qui l'exploite ?",opts:["Oui, automatiquement","Non, il doit être exploité avec précision par des équipes formées spécifiquement","Oui, la technologie suffit toujours seule","Non, il ne fonctionne jamais correctement"],correct:1,expl:"Les moteurs dual-fuel doivent être exploités avec précision par des équipes formées spécifiquement pour obtenir les bénéfices annoncés."},
    {q:"Quels sont les trois groupes de leviers pratiques vus dans cette leçon ?",opts:["Sécurité, cargaison, navigation","Optimisation de voyage, coque & propulsion, exploitation quotidienne","Communication, droit maritime, assurance","Aucun groupe n'est défini"],correct:1,expl:"Les neuf leviers sont regroupés en trois catégories : optimisation de voyage, coque & propulsion, et exploitation quotidienne en salle des machines."},
    {q:"Quelle est la compétence principale que cette dernière leçon vise à transmettre ?",opts:["Savoir calculer des formules d'efficacité énergétique","Disposer d'une boîte à outils pratique de leviers concrets applicables au quotidien à bord","Savoir négocier un contrat de carburant vert","Savoir piloter un navire méthanol"],correct:1,expl:"Cette leçon vise à donner une boîte à outils pratique de leviers concrets, applicables au quotidien, clôturant tout le module SEEMP."},
  ],
  en:[
    {q:"What does voyage planning include beyond the simple heading?",opts:["Only the final destination","The planned speed for each segment, waypoints and safety margins","Only the vessel's name","The onboard restaurant menu"],correct:1,expl:"Voyage planning includes the planned speed for each segment, waypoints and safety margins, not just the heading."},
    {q:"Can weather routing reduce consumption without significantly lengthening the distance?",opts:["No, never","Yes, by avoiding bad weather zones or unfavorable currents","No, it always significantly lengthens the route","Yes, but only in winter"],correct:1,expl:"Weather routing reduces resistance by avoiding bad weather, without necessarily significantly lengthening the distance."},
    {q:"Does propeller polishing have an effect on propulsive efficiency?",opts:["No effect at all","Yes, it restores efficiency lost to wear and deposits","No, only the engine matters","Yes, but only on small vessels"],correct:1,expl:"Propeller polishing restores propulsive efficiency lost to wear and deposits, transmitting power with minimal losses."},
    {q:"What is trim optimisation?",opts:["Repainting the hull","Adjusting the vessel's fore/aft distribution according to load and draft","Changing the fuel used","Reducing the number of crew members"],correct:1,expl:"Trim optimisation adjusts the vessel's fore/aft distribution according to load and draft, reducing hydrodynamic resistance."},
    {q:"Does trim optimisation require investment to apply?",opts:["Yes, a significant investment","No, it costs nothing to apply, unlike hull cleaning","Yes, it requires a new engine","No, but it is rarely possible"],correct:1,expl:"Trim optimisation costs nothing to apply immediately, unlike levers requiring investment like hull cleaning."},
    {q:"Does auxiliary machinery management reuse a principle already seen in Lesson 1?",opts:["No, it is a completely new concept","Yes, the principle of only running what is actually needed","No, it only concerns cargo","Yes, but only for emergency generators"],correct:1,expl:"Auxiliary machinery management systematically applies the principle set out in Lesson 1: only running what is actually needed."},
    {q:"Is Cold Ironing always available in every port?",opts:["Yes, systematically","No, it is an option available depending on port infrastructure","Yes, but only for tankers","No, it does not exist in any port"],correct:1,expl:"Cold Ironing is used when this option is available, depending on the port call's infrastructure."},
    {q:"Why is tracking performance KPIs important?",opts:["It is not important","Without an indicator, no improvement can be concretely confirmed","Only to satisfy inspectors","It has no connection to energy efficiency"],correct:1,expl:"Without a tracking indicator, no energy efficiency improvement can be concretely confirmed."},
    {q:"What does the phrase \"Technology saves fuel, people save even more\" summarize?",opts:["That technology is useless","That the human factor remains decisive, even with the best technologies","That people must be replaced by machines","That fuel has no importance"],correct:1,expl:"This phrase summarizes that the human factor remains decisive in energy efficiency, even with the best available technologies."},
    {q:"Why did Maersk invest in methanol rather than waiting for another technology?",opts:["By chance","To have a transition solution available immediately, with a known production method","Because it is the cheapest fuel","Because it has been mandatory since 2020"],correct:1,expl:"Maersk chose methanol to have a transition solution available immediately, without waiting for a technology not yet available at scale."},
    {q:"What technical challenge does methanol pose compared to conventional fuel?",opts:["No particular challenge","Roughly double consumption for the same energy delivered, requiring larger tanks","It is impossible to store","It can only be used on very small vessels"],correct:1,expl:"Methanol requires roughly double the consumption of conventional fuel for the same energy delivered, requiring larger tanks."},
    {q:"What lifecycle emissions reduction does methanol achieve?",opts:["No measured reduction","About 65%, potentially up to 95% depending on the production method","Exactly 10%","An increase in emissions"],correct:1,expl:"Methanol achieves a lifecycle emissions reduction of about 65%, potentially up to 95% depending on the production method used."},
    {q:"Does a dual-fuel methanol engine automatically deliver all its benefits, regardless of the team operating it?",opts:["Yes, automatically","No, it must be operated precisely by specifically trained crews","Yes, technology alone is always enough","No, it never works correctly"],correct:1,expl:"Dual-fuel engines must be operated precisely by specifically trained crews to achieve the announced benefits."},
    {q:"What are the three groups of practical levers seen in this lesson?",opts:["Safety, cargo, navigation","Voyage optimization, hull & propulsion, daily operations","Communication, maritime law, insurance","No group is defined"],correct:1,expl:"The nine levers are grouped into three categories: voyage optimization, hull & propulsion, and daily engine room operations."},
    {q:"What is the main skill this final lesson aims to convey?",opts:["Knowing how to calculate energy efficiency formulas","Having a practical toolbox of concrete levers applicable daily on board","Knowing how to negotiate a green fuel contract","Knowing how to pilot a methanol vessel"],correct:1,expl:"This lesson aims to provide a practical toolbox of concrete levers, applicable daily, closing the entire SEEMP module."},
  ],
  es:[
    {q:"¿Qué incluye la planificación de viaje además del simple rumbo?",opts:["Solo el destino final","La velocidad prevista en cada tramo, los puntos de paso y los márgenes de seguridad","Solo el nombre del buque","El menú del restaurante a bordo"],correct:1,expl:"La planificación de viaje incluye la velocidad prevista en cada tramo, los puntos de paso y los márgenes de seguridad, no solo el rumbo."},
    {q:"¿Puede el ruteo meteorológico reducir el consumo sin alargar significativamente la distancia?",opts:["No, nunca","Sí, evitando zonas de mal tiempo o corrientes desfavorables","No, siempre alarga fuertemente la ruta","Sí, pero solo en invierno"],correct:1,expl:"El ruteo meteorológico reduce la resistencia evitando el mal tiempo, sin necesariamente alargar significativamente la distancia."},
    {q:"¿El pulido de la hélice tiene efecto en la eficiencia propulsiva?",opts:["Ningún efecto","Sí, restaura la eficiencia perdida por el desgaste y los depósitos","No, solo importa el motor","Sí, pero solo en buques pequeños"],correct:1,expl:"El pulido de la hélice restaura la eficiencia propulsiva perdida por el desgaste y los depósitos, transmitiendo la potencia con pérdidas mínimas."},
    {q:"¿Qué es la optimización de asiento?",opts:["Repintar el casco","Ajustar la distribución proa/popa del buque según la carga y el calado","Cambiar el combustible utilizado","Reducir el número de tripulantes"],correct:1,expl:"La optimización de asiento ajusta la distribución proa/popa del buque según la carga y el calado, reduciendo la resistencia hidrodinámica."},
    {q:"¿La optimización de asiento requiere inversión para aplicarse?",opts:["Sí, una inversión importante","No, no cuesta nada aplicarla, a diferencia de la limpieza del casco","Sí, requiere un motor nuevo","No, pero rara vez es posible"],correct:1,expl:"La optimización de asiento no cuesta nada aplicarla de inmediato, a diferencia de palancas que requieren inversión como la limpieza del casco."},
    {q:"¿La gestión de auxiliares retoma un principio ya visto en la Lección 1?",opts:["No, es un concepto totalmente nuevo","Sí, el principio de solo hacer funcionar lo realmente necesario","No, solo concierne a la carga","Sí, pero solo para generadores de emergencia"],correct:1,expl:"La gestión de auxiliares aplica sistemáticamente el principio planteado en la Lección 1: solo hacer funcionar lo realmente necesario."},
    {q:"¿El Cold Ironing está siempre disponible en todos los puertos?",opts:["Sí, sistemáticamente","No, es una opción disponible según la infraestructura del puerto","Sí, pero solo para petroleros","No, no existe en ningún puerto"],correct:1,expl:"El Cold Ironing se usa cuando esta opción está disponible, según la infraestructura del puerto de escala."},
    {q:"¿Por qué es importante seguir KPIs de rendimiento?",opts:["No es importante","Sin un indicador, ninguna mejora puede confirmarse concretamente","Solo para satisfacer a los inspectores","No tiene ninguna relación con la eficiencia energética"],correct:1,expl:"Sin un indicador de seguimiento, ninguna mejora de eficiencia energética puede confirmarse concretamente."},
    {q:"¿Qué resume la frase \"La tecnología ahorra combustible, las personas ahorran aún más\"?",opts:["Que la tecnología es inútil","Que el factor humano sigue siendo decisivo, incluso con las mejores tecnologías","Que las personas deben ser reemplazadas por máquinas","Que el combustible no tiene ninguna importancia"],correct:1,expl:"Esta frase resume que el factor humano sigue siendo decisivo en la eficiencia energética, incluso con las mejores tecnologías disponibles."},
    {q:"¿Por qué Maersk invirtió en metanol en lugar de esperar otra tecnología?",opts:["Por casualidad","Para disponer de una solución de transición disponible de inmediato, con un método de producción conocido","Porque es el combustible más barato","Porque es obligatorio desde 2020"],correct:1,expl:"Maersk eligió el metanol para disponer de una solución de transición disponible de inmediato, sin esperar una tecnología aún no disponible a gran escala."},
    {q:"¿Qué desafío técnico plantea el metanol respecto al combustible convencional?",opts:["Ningún desafío particular","Un consumo aproximadamente doble para la misma energía entregada, requiriendo tanques más grandes","Es imposible de almacenar","Solo puede usarse en buques muy pequeños"],correct:1,expl:"El metanol requiere aproximadamente el doble de consumo de combustible convencional para la misma energía entregada, exigiendo tanques más grandes."},
    {q:"¿Qué reducción de emisiones en el ciclo de vida permite alcanzar el metanol?",opts:["Ninguna reducción medida","Aproximadamente 65%, potencialmente hasta 95% según el método de producción","Exactamente 10%","Un aumento de las emisiones"],correct:1,expl:"El metanol permite una reducción de aproximadamente 65% de las emisiones en el ciclo de vida, potencialmente hasta 95% según el método de producción utilizado."},
    {q:"¿Un motor dual-fuel de metanol aporta automáticamente todos sus beneficios, sin importar el equipo que lo opere?",opts:["Sí, automáticamente","No, debe ser operado con precisión por tripulaciones específicamente formadas","Sí, la tecnología sola siempre basta","No, nunca funciona correctamente"],correct:1,expl:"Los motores dual-fuel deben ser operados con precisión por tripulaciones específicamente formadas para lograr los beneficios anunciados."},
    {q:"¿Cuáles son los tres grupos de palancas prácticas vistas en esta lección?",opts:["Seguridad, carga, navegación","Optimización de viaje, casco y propulsión, operaciones diarias","Comunicación, derecho marítimo, seguro","Ningún grupo está definido"],correct:1,expl:"Las nueve palancas se agrupan en tres categorías: optimización de viaje, casco y propulsión, y operaciones diarias en la sala de máquinas."},
    {q:"¿Cuál es la principal competencia que esta última lección busca transmitir?",opts:["Saber calcular fórmulas de eficiencia energética","Disponer de una caja de herramientas práctica de palancas concretas aplicables a diario a bordo","Saber negociar un contrato de combustible verde","Saber pilotar un buque de metanol"],correct:1,expl:"Esta lección busca dar una caja de herramientas práctica de palancas concretas, aplicables a diario, cerrando todo el módulo SEEMP."},
  ],
  pt:[
    {q:"O que o planeamento de viagem inclui além do simples rumo?",opts:["Apenas o destino final","A velocidade prevista em cada segmento, os pontos de passagem e as margens de segurança","Apenas o nome do navio","O menu do restaurante a bordo"],correct:1,expl:"O planeamento de viagem inclui a velocidade prevista em cada segmento, os pontos de passagem e as margens de segurança, não apenas o rumo."},
    {q:"O roteamento meteorológico pode reduzir o consumo sem alongar significativamente a distância?",opts:["Não, nunca","Sim, evitando zonas de mau tempo ou correntes desfavoráveis","Não, sempre alonga fortemente a rota","Sim, mas apenas no inverno"],correct:1,expl:"O roteamento meteorológico reduz a resistência evitando o mau tempo, sem necessariamente alongar significativamente a distância."},
    {q:"O polimento da hélice tem efeito na eficiência propulsiva?",opts:["Nenhum efeito","Sim, restaura a eficiência perdida pelo desgaste e depósitos","Não, só o motor importa","Sim, mas apenas em navios pequenos"],correct:1,expl:"O polimento da hélice restaura a eficiência propulsiva perdida pelo desgaste e depósitos, transmitindo a potência com perdas mínimas."},
    {q:"O que é a otimização de caimento?",opts:["Repintar o casco","Ajustar a distribuição proa/popa do navio conforme a carga e o calado","Mudar o combustível usado","Reduzir o número de tripulantes"],correct:1,expl:"A otimização de caimento ajusta a distribuição proa/popa do navio conforme a carga e o calado, reduzindo a resistência hidrodinâmica."},
    {q:"A otimização de caimento exige investimento para ser aplicada?",opts:["Sim, um investimento significativo","Não, não custa nada aplicar, ao contrário da limpeza do casco","Sim, exige um motor novo","Não, mas raramente é possível"],correct:1,expl:"A otimização de caimento não custa nada aplicar imediatamente, ao contrário de alavancas que exigem investimento como a limpeza do casco."},
    {q:"A gestão de auxiliares retoma um princípio já visto na Lição 1?",opts:["Não, é um conceito totalmente novo","Sim, o princípio de fazer funcionar apenas o realmente necessário","Não, diz respeito apenas à carga","Sim, mas apenas para geradores de emergência"],correct:1,expl:"A gestão de auxiliares aplica sistematicamente o princípio estabelecido na Lição 1: fazer funcionar apenas o realmente necessário."},
    {q:"O Cold Ironing está sempre disponível em todos os portos?",opts:["Sim, sistematicamente","Não, é uma opção disponível conforme a infraestrutura do porto","Sim, mas apenas para petroleiros","Não, não existe em nenhum porto"],correct:1,expl:"O Cold Ironing é usado quando essa opção está disponível, conforme a infraestrutura do porto de escala."},
    {q:"Por que é importante acompanhar KPIs de desempenho?",opts:["Não é importante","Sem um indicador, nenhuma melhoria pode ser confirmada concretamente","Apenas para satisfazer os inspetores","Não tem nenhuma relação com a eficiência energética"],correct:1,expl:"Sem um indicador de acompanhamento, nenhuma melhoria de eficiência energética pode ser concretamente confirmada."},
    {q:"O que a frase \"A tecnologia poupa combustível, as pessoas poupam ainda mais\" resume?",opts:["Que a tecnologia é inútil","Que o fator humano continua sendo decisivo, mesmo com as melhores tecnologias","Que as pessoas devem ser substituídas por máquinas","Que o combustível não tem nenhuma importância"],correct:1,expl:"Esta frase resume que o fator humano continua sendo decisivo na eficiência energética, mesmo com as melhores tecnologias disponíveis."},
    {q:"Por que a Maersk investiu em metanol em vez de esperar outra tecnologia?",opts:["Por acaso","Para dispor de uma solução de transição disponível imediatamente, com um método de produção conhecido","Porque é o combustível mais barato","Porque é obrigatório desde 2020"],correct:1,expl:"A Maersk escolheu o metanol para dispor de uma solução de transição disponível imediatamente, sem esperar por uma tecnologia ainda não disponível em grande escala."},
    {q:"Que desafio técnico o metanol impõe em relação ao combustível convencional?",opts:["Nenhum desafio particular","Um consumo aproximadamente o dobro para a mesma energia fornecida, exigindo tanques maiores","É impossível de armazenar","Só pode ser usado em navios muito pequenos"],correct:1,expl:"O metanol exige aproximadamente o dobro do consumo de combustível convencional para a mesma energia fornecida, exigindo tanques maiores."},
    {q:"Que redução de emissões no ciclo de vida o metanol permite alcançar?",opts:["Nenhuma redução medida","Cerca de 65%, potencialmente até 95% conforme o método de produção","Exatamente 10%","Um aumento das emissões"],correct:1,expl:"O metanol permite uma redução de cerca de 65% das emissões no ciclo de vida, potencialmente até 95% conforme o método de produção utilizado."},
    {q:"Um motor dual-fuel de metanol traz automaticamente todos os seus benefícios, independentemente da equipa que o opera?",opts:["Sim, automaticamente","Não, deve ser operado com precisão por equipas especificamente formadas","Sim, a tecnologia sozinha sempre basta","Não, nunca funciona corretamente"],correct:1,expl:"Os motores dual-fuel devem ser operados com precisão por equipas especificamente formadas para alcançar os benefícios anunciados."},
    {q:"Quais são os três grupos de alavancas práticas vistos nesta lição?",opts:["Segurança, carga, navegação","Otimização de viagem, casco e propulsão, operações diárias","Comunicação, direito marítimo, seguro","Nenhum grupo está definido"],correct:1,expl:"As nove alavancas são agrupadas em três categorias: otimização de viagem, casco e propulsão, e operações diárias na casa de máquinas."},
    {q:"Qual é a principal competência que esta última lição visa transmitir?",opts:["Saber calcular fórmulas de eficiência energética","Dispor de uma caixa de ferramentas prática de alavancas concretas aplicáveis diariamente a bordo","Saber negociar um contrato de combustível verde","Saber pilotar um navio de metanol"],correct:1,expl:"Esta lição visa dar uma caixa de ferramentas prática de alavancas concretas, aplicáveis diariamente, encerrando todo o módulo SEEMP."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);if(onComplete)onComplete();}};
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
      badge:"🍃 Module Machine · Leçon 5/5 · ⭐ Premium · 200 XP",
      title:"Efficacité énergétique pratique",
      intro:"Les Leçons 1 à 4 ont construit toute la théorie - pourquoi, SEEMP, EEXI, CII. Cette dernière leçon du module, et de tout l'Engine Department, rassemble neuf leviers pratiques que tu peux appliquer dès demain à bord.",
      p1:"PARTIE 1 - OPTIMISATION DE VOYAGE",
      p2:"PARTIE 2 - COQUE & PROPULSION",
      p3:"PARTIE 3 - EXPLOITATION QUOTIDIENNE",
      p4:"PARTIE 4 - EXERCICE",
      p5:"PARTIE 5 - CAS RÉEL",
      p6:"PARTIE 6 - BANQUE DE QUESTIONS",
      closingPhrase:"Le navire le plus efficace n'est pas celui qui a le moteur le plus récent, mais celui qui est exploité avec connaissance, discipline et amélioration continue.\n\nL'avenir du transport maritime commence dans chaque salle des machines.",
      sumT:"POINTS CLÉS",
      sumP:[
        "Optimisation de voyage : planification, routage météo, vitesse adaptée au besoin réel",
        "Coque & propulsion : encrassement, polissage d'hélice, optimisation d'assiette",
        "Exploitation quotidienne : gestion des auxiliaires, cold ironing, KPIs de performance",
        "Certains leviers sont immédiats et gratuits, d'autres nécessitent un investissement",
        "La technologie seule ne suffit jamais - la compétence humaine reste déterminante",
        "L'innovation (comme le méthanol) ne réussit que si les officiers l'exploitent correctement",
      ],
      learnedP:[
        "Identifier les neuf leviers pratiques d'efficacité énergétique",
        "Distinguer les actions immédiates des actions nécessitant un investissement",
        "Comprendre les défis et bénéfices réels du cas Laura Mærsk",
        "Adopter un état d'esprit d'amélioration continue au quotidien",
        "Je sais que mes décisions quotidiennes construisent la performance énergétique du navire, jour après jour",
      ],
      moduleCompleteTitle:"🏆 ENGINE DEPARTMENT COMPLETED",
      moduleCompleteGreeting:"Félicitations, Ingénieur !",
      moduleCompleteText:"Tu as terminé avec succès chaque module de l'Engine Department. Tu comprends désormais :",
      subjects:["Propulsion marine","Machines auxiliaires","Chaudières","Systèmes de cargaison","Systèmes électriques","Automatisation","Cybersécurité","MARPOL","Efficacité énergétique"],
      moduleCompleteFooter:"Chaque grand Chef Mécanicien a commencé par maîtriser ces fondamentaux.\n\nContinue d'apprendre. Continue de t'améliorer. Protège ton navire. Protège l'océan.",
      badgeName:"Diplômé de l'Engine Department",
      progressTitle:"Ta progression",
      progressModules:"Modules terminés",
      progressLessons:"Leçons",
      progressXP:"XP gagnés",
    },
    en:{
      badge:"🍃 Engine Module · Lesson 5/5 · ⭐ Premium · 200 XP",
      title:"Practical Energy Efficiency",
      intro:"Lessons 1 to 4 built the entire theory - why, SEEMP, EEXI, CII. This final lesson of the module, and of the entire Engine Department, brings together nine practical levers you can apply as soon as tomorrow on board.",
      p1:"PART 1 - VOYAGE OPTIMIZATION",
      p2:"PART 2 - HULL & PROPULSION",
      p3:"PART 3 - DAILY ENGINE OPERATIONS",
      p4:"PART 4 - EXERCISE",
      p5:"PART 5 - REAL CASE",
      p6:"PART 6 - QUESTION BANK",
      closingPhrase:"The most efficient ship is not the one with the newest engine, but the one operated with knowledge, discipline and continuous improvement.\n\nThe future of shipping begins in every engine room.",
      sumT:"KEY POINTS",
      sumP:[
        "Voyage optimization: planning, weather routing, speed adapted to actual need",
        "Hull & propulsion: fouling, propeller polishing, trim optimization",
        "Daily operations: auxiliary management, cold ironing, performance KPIs",
        "Some levers are immediate and free, others require investment",
        "Technology alone is never enough - human competence remains decisive",
        "Innovation (like methanol) only succeeds when officers operate it correctly",
      ],
      learnedP:[
        "Identify the nine practical energy efficiency levers",
        "Distinguish immediate actions from those requiring investment",
        "Understand the real challenges and benefits of the Laura Mærsk case",
        "Adopt a mindset of continuous improvement in daily practice",
        "I know my daily decisions build the vessel's energy performance, day after day",
      ],
      moduleCompleteTitle:"🏆 ENGINE DEPARTMENT COMPLETED",
      moduleCompleteGreeting:"Congratulations, Engineer!",
      moduleCompleteText:"You have successfully completed every module of the Engine Department. You now understand:",
      subjects:["Marine propulsion","Auxiliary machinery","Boilers","Cargo systems","Electrical systems","Automation","Cybersecurity","MARPOL","Energy efficiency"],
      moduleCompleteFooter:"Every great Chief Engineer started by mastering these fundamentals.\n\nKeep learning. Keep improving. Protect your ship. Protect the ocean.",
      badgeName:"Engine Department Graduate",
      progressTitle:"Your Progress",
      progressModules:"Modules Completed",
      progressLessons:"Lessons",
      progressXP:"XP Earned",
    },
    es:{
      badge:"🍃 Módulo Máquinas · Lección 5/5 · ⭐ Premium · 200 XP",
      title:"Eficiencia energética práctica",
      intro:"Las Lecciones 1 a 4 construyeron toda la teoría - por qué, SEEMP, EEXI, CII. Esta última lección del módulo, y de todo el Engine Department, reúne nueve palancas prácticas que puedes aplicar desde mañana a bordo.",
      p1:"PARTE 1 - OPTIMIZACIÓN DE VIAJE",
      p2:"PARTE 2 - CASCO Y PROPULSIÓN",
      p3:"PARTE 3 - OPERACIONES DIARIAS",
      p4:"PARTE 4 - EJERCICIO",
      p5:"PARTE 5 - CASO REAL",
      p6:"PARTE 6 - BANCO DE PREGUNTAS",
      closingPhrase:"El buque más eficiente no es el que tiene el motor más nuevo, sino el que se opera con conocimiento, disciplina y mejora continua.\n\nEl futuro del transporte marítimo comienza en cada sala de máquinas.",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "Optimización de viaje: planificación, ruteo meteorológico, velocidad adaptada a la necesidad real",
        "Casco y propulsión: incrustación, pulido de hélice, optimización de asiento",
        "Operaciones diarias: gestión de auxiliares, cold ironing, KPIs de rendimiento",
        "Algunas palancas son inmediatas y gratuitas, otras requieren inversión",
        "La tecnología sola nunca basta - la competencia humana sigue siendo decisiva",
        "La innovación (como el metanol) solo tiene éxito cuando los oficiales la operan correctamente",
      ],
      learnedP:[
        "Identificar las nueve palancas prácticas de eficiencia energética",
        "Distinguir las acciones inmediatas de las que requieren inversión",
        "Comprender los desafíos y beneficios reales del caso Laura Mærsk",
        "Adoptar una mentalidad de mejora continua en la práctica diaria",
        "Sé que mis decisiones diarias construyen el rendimiento energético del buque, día tras día",
      ],
      moduleCompleteTitle:"🏆 ENGINE DEPARTMENT COMPLETADO",
      moduleCompleteGreeting:"¡Felicidades, Ingeniero!",
      moduleCompleteText:"Has completado con éxito todos los módulos del Engine Department. Ahora comprendes:",
      subjects:["Propulsión marina","Máquinas auxiliares","Calderas","Sistemas de carga","Sistemas eléctricos","Automatización","Ciberseguridad","MARPOL","Eficiencia energética"],
      moduleCompleteFooter:"Todo gran Jefe de Máquinas comenzó dominando estos fundamentos.\n\nSigue aprendiendo. Sigue mejorando. Protege tu buque. Protege el océano.",
      badgeName:"Graduado del Engine Department",
      progressTitle:"Tu progreso",
      progressModules:"Módulos completados",
      progressLessons:"Lecciones",
      progressXP:"XP ganados",
    },
    pt:{
      badge:"🍃 Módulo Máquinas · Lição 5/5 · ⭐ Premium · 200 XP",
      title:"Eficiência energética prática",
      intro:"As Lições 1 a 4 construíram toda a teoria - por quê, SEEMP, EEXI, CII. Esta última lição do módulo, e de todo o Engine Department, reúne nove alavancas práticas que você pode aplicar já amanhã a bordo.",
      p1:"PARTE 1 - OTIMIZAÇÃO DE VIAGEM",
      p2:"PARTE 2 - CASCO E PROPULSÃO",
      p3:"PARTE 3 - OPERAÇÕES DIÁRIAS",
      p4:"PARTE 4 - EXERCÍCIO",
      p5:"PARTE 5 - CASO REAL",
      p6:"PARTE 6 - BANCO DE QUESTÕES",
      closingPhrase:"O navio mais eficiente não é aquele com o motor mais novo, mas aquele operado com conhecimento, disciplina e melhoria contínua.\n\nO futuro do transporte marítimo começa em cada casa de máquinas.",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "Otimização de viagem: planeamento, roteamento meteorológico, velocidade adaptada à necessidade real",
        "Casco e propulsão: incrustação, polimento da hélice, otimização de caimento",
        "Operações diárias: gestão de auxiliares, cold ironing, KPIs de desempenho",
        "Algumas alavancas são imediatas e gratuitas, outras exigem investimento",
        "A tecnologia sozinha nunca basta - a competência humana continua sendo decisiva",
        "A inovação (como o metanol) só tem sucesso quando os oficiais a operam corretamente",
      ],
      learnedP:[
        "Identificar as nove alavancas práticas de eficiência energética",
        "Distinguir as ações imediatas das que exigem investimento",
        "Compreender os desafios e benefícios reais do caso Laura Mærsk",
        "Adotar uma mentalidade de melhoria contínua na prática diária",
        "Sei que minhas decisões diárias constroem o desempenho energético do navio, dia após dia",
      ],
      moduleCompleteTitle:"🏆 ENGINE DEPARTMENT CONCLUÍDO",
      moduleCompleteGreeting:"Parabéns, Engenheiro!",
      moduleCompleteText:"Você concluiu com sucesso todos os módulos do Engine Department. Agora você compreende:",
      subjects:["Propulsão marinha","Máquinas auxiliares","Caldeiras","Sistemas de carga","Sistemas elétricos","Automação","Cibersegurança","MARPOL","Eficiência energética"],
      moduleCompleteFooter:"Todo grande Chefe de Máquinas começou dominando esses fundamentos.\n\nContinue aprendendo. Continue melhorando. Proteja seu navio. Proteja o oceano.",
      badgeName:"Graduado do Engine Department",
      progressTitle:"Seu Progresso",
      progressModules:"Módulos concluídos",
      progressLessons:"Lições",
      progressXP:"XP ganhos",
    },
  };
  return d[lang] || d.fr;
};

export default function LessonSEEMP_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, completedLessons=[], userXP=0 }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;

  // Real progress computation for the Engine Department completion screen
  const doneLessonsSet = new Set(completedLessons);
  // Include this lesson (e5-l5) as completed since the user is finishing it right now
  doneLessonsSet.add("e5-l5");
  const completedCount = ENGINE_DEPT_LESSONS.filter(id=>doneLessonsSet.has(id)).length;
  const totalLessons = ENGINE_DEPT_LESSONS.length;
  const modulePrefixes = ["e1","e2","e3","e6","e7","e4","e5"];
  const completedModulesCount = modulePrefixes.filter(p=>{
    const total = ENGINE_DEPT_LESSONS.filter(id=>id.startsWith(p+"-")).length;
    const done = ENGINE_DEPT_LESSONS.filter(id=>id.startsWith(p+"-")&&doneLessonsSet.has(id)).length;
    return total>0 && done>=total;
  }).length;
  const lessonsPct = Math.round((completedCount/totalLessons)*100);
  const finalXP = userXP + (quizScore>=4?200:quizScore===3?120:60);

  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#031a0a 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.green}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.green,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🍃 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 5/5":lang==="en"?"Lesson 5/5":lang==="es"?"Lección 5/5":"Lição 5/5"}</div>
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

            <SL icon="🌍" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}><VoyageGroupSVG lang={lang}/></Card>

            <SL icon="⚙️" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}><HullGroupSVG lang={lang}/></Card>

            <SL icon="🔋" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}><DailyOpsGroupSVG lang={lang}/></Card>

            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><PracticalChecklist lang={lang}/></Card>

            <SL icon="🎯" text={lc.p4} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`}}><InvestmentTable lang={lang}/></Card>

            <SL icon="🌊" text={lc.p5} color={C.green}/>
            <div style={{marginBottom:14}}><LauraMaersk lang={lang}/></div>

            <SL icon="📝" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(30,138,74,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(30,138,74,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </div>}

          {phase==="quiz"&&<div>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz - Efficacité pratique":lang==="en"?"Quiz - Practical Efficiency":lang==="es"?"Quiz - Eficiencia práctica":"Quiz - Eficiência prática"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 5":lang==="en"?"Lesson 5":lang==="es"?"Lección 5":"Lição 5"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </div>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            {/* SPECIAL ENGINE DEPARTMENT COMPLETION BANNER */}
            <div style={{textAlign:"center",marginBottom:18,padding:"22px 16px",borderRadius:20,background:"linear-gradient(135deg,rgba(30,138,74,0.18),rgba(201,146,42,0.15))",border:`2px solid ${C.gold}66`,boxShadow:`0 0 30px rgba(201,146,42,0.25)`}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:900,color:C.gold2,letterSpacing:1,marginBottom:10}}>{lc.moduleCompleteTitle}</div>
              <div style={{fontSize:15,fontWeight:700,color:C.white,marginBottom:8}}>{lc.moduleCompleteGreeting}</div>
              <div style={{fontSize:12,color:"rgba(240,244,255,0.85)",lineHeight:1.7,marginBottom:12}}>{lc.moduleCompleteText}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:12}}>
                {lc.subjects.map((s,i)=><div key={i} style={{fontSize:9,padding:"6px 4px",borderRadius:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.white}}>⚙️ {s}</div>)}
              </div>
              <div style={{fontSize:11,color:C.gold2,fontStyle:"italic",lineHeight:1.7,whiteSpace:"pre-line"}}>{lc.moduleCompleteFooter}</div>
            </div>

            {/* BADGE */}
            <div style={{textAlign:"center",marginBottom:18}}>
              <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:6,padding:"14px 24px",borderRadius:18,background:"rgba(201,146,42,0.12)",border:`1.5px solid ${C.gold}55`}}>
                <div style={{fontSize:36}}>🏅</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.gold2}}>{lc.badgeName}</div>
              </div>
            </div>

            {/* REAL PROGRESS (computed from actual props, no fabricated data) */}
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12,textAlign:"center"}}>{lc.progressTitle}</div>
              <div style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.muted,marginBottom:4}}>
                  <span>{lc.progressModules}</span><span style={{color:C.white,fontWeight:700}}>{completedModulesCount}/{modulePrefixes.length}</span>
                </div>
                <div style={{height:6,borderRadius:6,background:"rgba(255,255,255,0.08)",overflow:"hidden"}}><div style={{height:"100%",width:`${Math.round((completedModulesCount/modulePrefixes.length)*100)}%`,background:`linear-gradient(90deg,${C.green},${C.gold2})`}}/></div>
              </div>
              <div style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.muted,marginBottom:4}}>
                  <span>{lc.progressLessons}</span><span style={{color:C.white,fontWeight:700}}>{completedCount}/{totalLessons}</span>
                </div>
                <div style={{height:6,borderRadius:6,background:"rgba(255,255,255,0.08)",overflow:"hidden"}}><div style={{height:"100%",width:`${lessonsPct}%`,background:`linear-gradient(90deg,${C.blue2},${C.gold2})`}}/></div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.muted}}>
                <span>{lc.progressXP}</span><span style={{color:C.gold2,fontWeight:800,fontSize:14}}>⭐ {finalXP}</span>
              </div>
            </Card>

            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏆</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}55`,fontSize:14,color:C.green,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <div style={{textAlign:"center",padding:"14px 10px",marginBottom:16,fontSize:12,color:C.gold2,fontFamily:"Courier New",fontStyle:"italic",lineHeight:1.8,borderTop:"1px solid rgba(255,255,255,0.08)",borderBottom:"1px solid rgba(255,255,255,0.08)",whiteSpace:"pre-line"}}>{lc.closingPhrase}</div>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(30,138,74,0.4)",marginBottom:10}}>
              {lang==="fr"?"ENGINE DEPARTMENT TERMINÉ - RETOUR AU DASHBOARD →":lang==="en"?"ENGINE DEPARTMENT COMPLETE - BACK TO DASHBOARD →":lang==="es"?"ENGINE DEPARTMENT COMPLETADO - VOLVER AL PANEL →":"ENGINE DEPARTMENT CONCLUÍDO - VOLTAR AO PAINEL →"}
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
}
