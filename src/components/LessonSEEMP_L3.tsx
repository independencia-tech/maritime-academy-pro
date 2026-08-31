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

function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<div><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></div>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.green}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════
// SVG 1 - WHAT EEXI MEASURES
// ══════════════════════════════════════
function EEXIMeasureSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"design", icon:"🏗️", color:C.blue2,
      label:{fr:"Conception technique",en:"Technical design",es:"Diseño técnico",pt:"Design técnico"},
      desc:{fr:"L'EEXI evalue la capacite theorique d'efficacite energetique du navire telle que concue - coque, moteur, systeme de propulsion - independamment de la maniere dont il est ensuite exploite au quotidien.",en:"EEXI assesses the vessel's theoretical energy efficiency capacity as designed - hull, engine, propulsion system - independent of how it is later operated day to day.",es:"El EEXI evalua la capacidad teorica de eficiencia energetica del buque tal como fue disenado - casco, motor, sistema de propulsion - independientemente de como se opere despues a diario.",pt:"O EEXI avalia a capacidade teorica de eficiencia energetica do navio tal como projetado - casco, motor, sistema de propulsao - independentemente de como e depois operado no dia a dia."} },
    { id:"once", icon:"1️⃣", color:C.gold2,
      label:{fr:"Un calcul unique",en:"A one-time calculation",es:"Un cálculo único",pt:"Um cálculo único"},
      desc:{fr:"L'EEXI ne s'applique qu'aux navires existants et est verifie une seule fois pour etablir la conformite - contrairement au CII qui est evalue chaque annee, comme tu le verras en Lecon 4.",en:"EEXI applies only to existing ships and is verified once for compliance - unlike the CII which is assessed every year, as you'll see in Lesson 4.",es:"El EEXI se aplica solo a buques existentes y se verifica una sola vez para establecer el cumplimiento - a diferencia del CII que se evalua cada año, como veras en la Leccion 4.",pt:"O EEXI aplica-se apenas a navios existentes e e verificado uma unica vez para estabelecer a conformidade - ao contrario do CII que e avaliado a cada ano, como vera na Licao 4."} },
    { id:"threshold", icon:"📏", color:C.teal,
      label:{fr:"Comparaison à un seuil",en:"Comparison to a threshold",es:"Comparación con un umbral",pt:"Comparação com um limite"},
      desc:{fr:"L'indice calcule pour le navire est compare a un seuil de reference qui varie selon le type et la taille du navire. Plus l'indice est bas, plus la conception est consideree efficace.",en:"The vessel's calculated index is compared to a reference threshold that varies by vessel type and size. The lower the index, the more efficient the design is considered.",es:"El indice calculado para el buque se compara con un umbral de referencia que varia segun el tipo y tamaño del buque. Cuanto mas bajo el indice, mas eficiente se considera el diseño.",pt:"O indice calculado para o navio e comparado a um limite de referencia que varia conforme o tipo e tamanho do navio. Quanto mais baixo o indice, mais eficiente e considerado o design."} },
    { id:"noformula", icon:"🚫", color:C.red,
      label:{fr:"Pas un calcul d'officier",en:"Not an officer's calculation",es:"No es un cálculo del oficial",pt:"Não é um cálculo do oficial"},
      desc:{fr:"Le calcul precis de l'EEXI releve des logiciels des societes de classification, pas de l'officier machine. Ton role est de comprendre ce que l'indice signifie et comment le navire reste conforme - pas de le calculer toi-meme.",en:"The precise EEXI calculation belongs to classification society software, not the engine officer. Your role is to understand what the index means and how the vessel stays compliant - not to calculate it yourself.",es:"El calculo preciso del EEXI corresponde al software de las sociedades de clasificacion, no al oficial de maquinas. Tu rol es entender que significa el indice y como el buque se mantiene conforme - no calcularlo tu mismo.",pt:"O calculo preciso do EEXI cabe ao software das sociedades de classificacao, nao ao oficial de maquinas. Seu papel e entender o que o indice significa e como o navio se mantem conforme - nao calcula-lo voce mesmo."} },
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
// SVG 2 - BEFORE / AFTER COMPLIANCE
// ══════════════════════════════════════
function BeforeAfterSVG({ lang }) {
  const steps = [
    { icon:"🚢", color:C.red, label:{fr:"Navire existant - non conforme",en:"Old ship - non-compliant",es:"Buque existente - no conforme",pt:"Navio existente - não conforme"} },
    { icon:"⚡", color:C.orange, label:{fr:"Limitation de puissance (EPL)",en:"Engine Power Limitation (EPL)",es:"Limitación de potencia (EPL)",pt:"Limitação de potência (EPL)"} },
    { icon:"🌀", color:C.gold2, label:{fr:"Optimisation de l'hélice",en:"Propeller optimization",es:"Optimización de la hélice",pt:"Otimização da hélice"} },
    { icon:"🔧", color:C.teal, label:{fr:"Dispositif d'économie d'énergie",en:"Energy Saving Device",es:"Dispositivo de ahorro de energía",pt:"Dispositivo de poupança de energia"} },
    { icon:"✅", color:C.green, label:{fr:"Conforme EEXI",en:"EEXI Compliant",es:"Conforme EEXI",pt:"Conforme EEXI"} },
  ];
  return (
    <div>
      {steps.map((s,i)=>(
        <div key={i}>
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:12,background:`${s.color}12`,border:`1px solid ${s.color}44`}}>
            <span style={{fontSize:22,flexShrink:0}}>{s.icon}</span>
            <div style={{fontSize:12,fontWeight:700,color:s.color}}>{s.label[lang]||s.label.fr}</div>
          </div>
          {i<steps.length-1&&<div style={{textAlign:"center",fontSize:14,color:C.gold,padding:"2px 0"}}>↓</div>}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// WHY NOT SIMPLY REMOVE THE EPL / INCREASE POWER AGAIN
// ══════════════════════════════════════
function WhyNotRemoveEPL({ lang }) {
  const d = {
    fr:{title:"Pourquoi ne pas simplement retirer la limitation de puissance ?",
      text:"Retirer ou contourner un EPL sans autorisation ferait immediatement perdre au navire sa conformite EEXI certifiee - avec des consequences reglementaires directes (non-conformite documentaire, risque de detention). Cela pourrait aussi creer un risque de securite si la modification n'a pas ete etudiee par la societe de classification. Toute modification touchant l'EEXI - dans un sens comme dans l'autre - doit systematiquement etre approuvee au prealable, jamais decidee seul a bord."},
    en:{title:"Why not simply remove the power limitation?",
      text:"Removing or bypassing an EPL without authorization would immediately cause the vessel to lose its certified EEXI compliance - with direct regulatory consequences (documentary non-conformity, detention risk). It could also create a safety risk if the modification hasn't been reviewed by the classification society. Any modification affecting EEXI - in either direction - must always be approved beforehand, never decided alone on board."},
    es:{title:"¿Por qué no simplemente quitar la limitación de potencia?",
      text:"Quitar o eludir un EPL sin autorización haría que el buque perdiera inmediatamente su cumplimiento EEXI certificado - con consecuencias reglamentarias directas (no conformidad documental, riesgo de detención). También podría crear un riesgo de seguridad si la modificación no ha sido revisada por la sociedad de clasificación. Cualquier modificación que afecte al EEXI - en cualquier sentido - siempre debe aprobarse previamente, nunca decidirse solo a bordo."},
    pt:{title:"Por que não simplesmente remover a limitação de potência?",
      text:"Remover ou contornar um EPL sem autorização faria o navio perder imediatamente sua conformidade EEXI certificada - com consequencias regulamentares diretas (nao conformidade documental, risco de detencao). Tambem poderia criar um risco de seguranca se a modificacao nao tiver sido revista pela sociedade de classificacao. Qualquer modificacao que afete o EEXI - em qualquer sentido - deve sempre ser aprovada previamente, nunca decidida sozinha a bordo."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{padding:"12px 14px",borderRadius:12,background:"rgba(192,57,43,0.08)",border:`1px solid ${C.red}33`}}>
      <div style={{fontSize:12,fontWeight:700,color:C.red,marginBottom:6}}>⚠️ {c.title}</div>
      <div style={{fontSize:12,color:C.white,lineHeight:1.7}}>{c.text}</div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 - HOW TO STAY COMPLIANT
// ══════════════════════════════════════
function StayCompliantSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"certification", icon:"📜", color:C.blue2,
      label:{fr:"Vérification à la certification",en:"Verification at certification",es:"Verificación en la certificación",pt:"Verificação na certificação"},
      desc:{fr:"La conformite EEXI est verifiee par la societe de classification au moment de la certification du navire, sur la base de sa conception technique reelle et des mesures adoptees.",en:"EEXI compliance is verified by the classification society at the time of vessel certification, based on the actual technical design and adopted measures.",es:"El cumplimiento del EEXI es verificado por la sociedad de clasificacion en el momento de la certificacion del buque, en base a su diseno tecnico real y las medidas adoptadas.",pt:"A conformidade EEXI e verificada pela sociedade de classificacao no momento da certificacao do navio, com base no seu design tecnico real e nas medidas adotadas."} },
    { id:"inspection", icon:"🔍", color:C.gold2,
      label:{fr:"Contrôle documentaire en inspection",en:"Documentary check during inspections",es:"Control documental en inspecciones",pt:"Verificação documental em inspeções"},
      desc:{fr:"Lors des inspections (PSC, vetting), le certificat EEXI et les mesures techniques associees (EPL, dispositifs installes) sont verifies documentairement - pas recalcules, mais controles pour coherence.",en:"During inspections (PSC, vetting), the EEXI certificate and associated technical measures (EPL, installed devices) are checked documentarily - not recalculated, but checked for consistency.",es:"Durante las inspecciones (PSC, vetting), el certificado EEXI y las medidas tecnicas asociadas (EPL, dispositivos instalados) se verifican documentalmente - no se recalculan, pero se controla su coherencia.",pt:"Durante as inspecoes (PSC, vetting), o certificado EEXI e as medidas tecnicas associadas (EPL, dispositivos instalados) sao verificados documentalmente - nao recalculados, mas controlados quanto a coerencia."} },
    { id:"maintain", icon:"🛠️", color:C.teal,
      label:{fr:"Maintien de la conformité",en:"Maintaining compliance",es:"Mantenimiento del cumplimiento",pt:"Manutenção da conformidade"},
      desc:{fr:"Au quotidien, la conformite se maintient en respectant les limitations techniques en place (EPL) et en ne modifiant jamais un dispositif lie a l'EEXI sans passer par une approbation formelle prealable.",en:"Day to day, compliance is maintained by respecting the technical limitations in place (EPL) and never modifying an EEXI-related device without prior formal approval.",es:"En el dia a dia, el cumplimiento se mantiene respetando las limitaciones tecnicas vigentes (EPL) y nunca modificando un dispositivo relacionado con el EEXI sin una aprobacion formal previa.",pt:"No dia a dia, a conformidade e mantida respeitando as limitacoes tecnicas em vigor (EPL) e nunca modificando um dispositivo ligado ao EEXI sem aprovacao formal previa."} },
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
// SVG 4 - EEXI vs CII (DRIVING LICENCE ANALOGY)
// ══════════════════════════════════════
function EEXIvsCIISVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"eexi", icon:"🪪", color:C.blue2,
      label:{fr:"EEXI = Permis de conduire",en:"EEXI = Driving Licence",es:"EEXI = Carné de conducir",pt:"EEXI = Carta de condução"},
      desc:{fr:"Comme un permis de conduire, l'EEXI atteste une fois pour toutes que le navire est techniquement apte a naviguer efficacement - il ne change pas d'une annee sur l'autre, sauf modification technique majeure.",en:"Like a driving licence, EEXI certifies once and for all that the vessel is technically capable of sailing efficiently - it does not change year to year, except for a major technical modification.",es:"Como un carne de conducir, el EEXI certifica de una vez por todas que el buque es tecnicamente capaz de navegar eficientemente - no cambia de un ano a otro, salvo una modificacion tecnica mayor.",pt:"Como uma carta de conducao, o EEXI certifica de uma vez por todas que o navio e tecnicamente capaz de navegar eficientemente - nao muda de um ano para o outro, exceto por uma modificacao tecnica maior."} },
    { id:"cii", icon:"📋", color:C.gold2,
      label:{fr:"CII = Bulletin de conduite",en:"CII = Driving Record",es:"CII = Historial de conducción",pt:"CII = Histórico de condução"},
      desc:{fr:"Comme un bulletin de conduite, le CII evalue chaque annee comment le navire a reellement ete exploite - il peut s'ameliorer ou se degrader selon les decisions operationnelles prises a bord, detaillees en Lecon 4.",en:"Like a driving record, CII assesses every year how the vessel was actually operated - it can improve or worsen depending on the operational decisions made on board, detailed in Lesson 4.",es:"Como un historial de conduccion, el CII evalua cada ano como se opero realmente el buque - puede mejorar o empeorar segun las decisiones operativas tomadas a bordo, detalladas en la Leccion 4.",pt:"Como um historico de conducao, o CII avalia a cada ano como o navio foi realmente operado - pode melhorar ou piorar conforme as decisoes operacionais tomadas a bordo, detalhadas na Licao 4."} },
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
            <div style={{fontSize:11,color:sel===it.id?it.color:C.muted,fontWeight:700}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche EEXI ou CII pour l'analogie":lang==="en"?"Tap EEXI or CII for the analogy":lang==="es"?"Toca EEXI o CII para la analogía":"Toque em EEXI ou CII para a analogia"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// EEXI AWARENESS CHECKLIST
// ══════════════════════════════════════
function EEXIChecklist({ lang }) {
  const items = {
    fr:["Je sais que mon navire dispose d'un certificat EEXI","Je comprends pourquoi une limitation de puissance a pu être installée","Je ne modifie jamais un dispositif lié à l'EEXI sans autorisation","Je comprends pourquoi l'EPL ne doit jamais être contourné sans autorisation"],
    en:["I know my vessel has an EEXI certificate","I understand why a power limitation may have been installed","I never modify an EEXI-related device without authorization","I understand why Engine Power Limitation (EPL) must never be bypassed without authorization"],
    es:["Sé que mi buque cuenta con un certificado EEXI","Entiendo por qué se pudo instalar una limitación de potencia","Nunca modifico un dispositivo relacionado con el EEXI sin autorización","Entiendo por qué el EPL nunca debe eludirse sin autorización"],
    pt:["Sei que meu navio possui um certificado EEXI","Entendo por que uma limitação de potência pode ter sido instalada","Nunca modifico um dispositivo ligado ao EEXI sem autorização","Entendo por que o EPL nunca deve ser contornado sem autorização"],
  };
  const title = {fr:"Checklist - Conscience EEXI",en:"EEXI Awareness Checklist",es:"Checklist - Conciencia EEXI",pt:"Checklist - Consciência EEXI"};
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
function Exercise3({ lang, t }) {
  const [ans,setAns]=useState("");
  const [showC,setShowC]=useState(false);
  const d = {
    fr:{ q:"Ton navire a reçu une limitation de puissance moteur (EPL) pour respecter l'EEXI. Quelles précautions dois-tu garder en tête au quotidien ?", model:"Ne jamais contourner ou désactiver l'EPL sans autorisation formelle - cela ferait perdre la conformité EEXI et pourrait créer un risque de sécurité. Comprendre que cette limitation a été étudiée et approuvée par la société de classification, pas décidée arbitrairement. Signaler immédiatement toute anomalie ou tentative de contournement observée à bord. Toute modification future doit repasser par une approbation formelle avant d'être appliquée." },
    en:{ q:"Your vessel received an Engine Power Limitation (EPL) to comply with EEXI. What precautions should you keep in mind daily?", model:"Never bypass or disable the EPL without formal authorization - this would cause loss of EEXI compliance and could create a safety risk. Understand that this limitation was studied and approved by the classification society, not arbitrarily decided. Immediately report any anomaly or bypass attempt observed on board. Any future modification must go through formal approval before being applied." },
    es:{ q:"Tu buque recibió una limitación de potencia del motor (EPL) para cumplir con el EEXI. ¿Qué precauciones debes tener en cuenta a diario?", model:"Nunca eludir o desactivar el EPL sin autorización formal - esto haría perder el cumplimiento EEXI y podría crear un riesgo de seguridad. Comprender que esta limitación fue estudiada y aprobada por la sociedad de clasificación, no decidida arbitrariamente. Reportar inmediatamente cualquier anomalía o intento de elusión observado a bordo. Cualquier modificación futura debe pasar por una aprobación formal antes de aplicarse." },
    pt:{ q:"Seu navio recebeu uma limitação de potência do motor (EPL) para cumprir o EEXI. Que precauções você deve ter em mente diariamente?", model:"Nunca contornar ou desativar o EPL sem autorização formal - isso faria perder a conformidade EEXI e poderia criar um risco de segurança. Entender que essa limitação foi estudada e aprovada pela sociedade de classificação, não decidida arbitrariamente. Reportar imediatamente qualquer anomalia ou tentativa de contorno observada a bordo. Qualquer modificação futura deve passar por aprovação formal antes de ser aplicada." },
  };
  const c = d[lang]||d.fr;
  return(
    <div>
      <div style={{fontSize:13,color:C.white,marginBottom:8,lineHeight:1.6,fontWeight:600}}>{c.q}</div>
      <textarea value={ans} onChange={e=>setAns(e.target.value)} placeholder={lang==="fr"?"Tes précautions...":lang==="en"?"Your precautions...":lang==="es"?"Tus precauciones...":"Suas precauções..."}
        rows={3} style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${C.border}`,color:C.white,fontSize:13,fontFamily:"inherit",marginBottom:10,boxSizing:"border-box",resize:"vertical"}}/>
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.model}</div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// OPERATIONAL EXAMPLE - NON-COMPLIANT SHIP
// ══════════════════════════════════════
function OperationalExample({ lang }) {
  const [exp,setExp]=useState(false);
  const [sel,setSel]=useState([]);
  const toggle=(id)=>setSel(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const d={
    fr:{title:"Exemple opérationnel",teaser:"Un navire est déclaré non conforme EEXI - le chantier propose trois solutions",
      what:"Un navire existant est declare non conforme a l'EEXI lors de sa verification. Le chantier naval propose trois solutions techniques possibles. Question : laquelle (ou lesquelles) ameliore(nt) reellement la conformite EEXI ?",
      options:[
        {id:"epl",label:{fr:"Installer un EPL (limitation de puissance)",en:"Install an EPL (power limitation)",es:"Instalar un EPL (limitación de potencia)",pt:"Instalar um EPL (limitação de potência)"},correct:true},
        {id:"prop",label:{fr:"Optimiser l'hélice",en:"Optimize the propeller",es:"Optimizar la hélice",pt:"Otimizar a hélice"},correct:true},
        {id:"esd",label:{fr:"Ajouter un dispositif d'économie d'énergie",en:"Add an Energy Saving Device",es:"Añadir un dispositivo de ahorro de energía",pt:"Adicionar um dispositivo de poupança de energia"},correct:true},
      ],
      lessons:"✓ Les trois solutions proposees par le chantier ameliorent effectivement la conformite EEXI - elles agissent chacune sur un aspect different (puissance, propulsion, dispositif technique)\n✓ Le choix final depend d'une etude technique et economique menee avec la societe de classification, pas d'une decision arbitraire\n✓ Aucune de ces solutions ne doit etre installee ou retiree sans validation formelle prealable"},
    en:{title:"Operational Example",teaser:"A vessel is declared EEXI non-compliant - the yard proposes three solutions",
      what:"An existing vessel is declared non-compliant with EEXI during verification. The shipyard proposes three possible technical solutions. Question: which one(s) actually improve EEXI compliance?",
      options:[
        {id:"epl",label:{fr:"Installer un EPL (limitation de puissance)",en:"Install an EPL (power limitation)",es:"Instalar un EPL (limitación de potencia)",pt:"Instalar um EPL (limitação de potência)"},correct:true},
        {id:"prop",label:{fr:"Optimiser l'hélice",en:"Optimize the propeller",es:"Optimizar la hélice",pt:"Otimizar a hélice"},correct:true},
        {id:"esd",label:{fr:"Ajouter un dispositif d'économie d'énergie",en:"Add an Energy Saving Device",es:"Añadir un dispositivo de ahorro de energía",pt:"Adicionar um dispositivo de poupança de energia"},correct:true},
      ],
      lessons:"✓ All three solutions proposed by the yard do actually improve EEXI compliance - each acts on a different aspect (power, propulsion, technical device)\n✓ The final choice depends on a technical and economic study conducted with the classification society, not an arbitrary decision\n✓ None of these solutions should be installed or removed without prior formal validation"},
    es:{title:"Ejemplo operativo",teaser:"Un buque es declarado no conforme con el EEXI - el astillero propone tres soluciones",
      what:"Un buque existente es declarado no conforme con el EEXI durante su verificacion. El astillero propone tres posibles soluciones tecnicas. Pregunta: ¿cual(es) mejora(n) realmente el cumplimiento del EEXI?",
      options:[
        {id:"epl",label:{fr:"Installer un EPL (limitation de puissance)",en:"Install an EPL (power limitation)",es:"Instalar un EPL (limitación de potencia)",pt:"Instalar um EPL (limitação de potência)"},correct:true},
        {id:"prop",label:{fr:"Optimiser l'hélice",en:"Optimize the propeller",es:"Optimizar la hélice",pt:"Otimizar a hélice"},correct:true},
        {id:"esd",label:{fr:"Ajouter un dispositif d'économie d'énergie",en:"Add an Energy Saving Device",es:"Añadir un dispositivo de ahorro de energía",pt:"Adicionar um dispositivo de poupança de energia"},correct:true},
      ],
      lessons:"✓ Las tres soluciones propuestas por el astillero efectivamente mejoran el cumplimiento del EEXI - cada una actua sobre un aspecto diferente (potencia, propulsion, dispositivo tecnico)\n✓ La eleccion final depende de un estudio tecnico y economico realizado con la sociedad de clasificacion, no de una decision arbitraria\n✓ Ninguna de estas soluciones debe instalarse o retirarse sin validacion formal previa"},
    pt:{title:"Exemplo operacional",teaser:"Um navio é declarado não conforme com o EEXI - o estaleiro propõe três soluções",
      what:"Um navio existente e declarado nao conforme com o EEXI durante sua verificacao. O estaleiro propoe tres possiveis solucoes tecnicas. Pergunta: qual(is) melhora(m) realmente a conformidade EEXI?",
      options:[
        {id:"epl",label:{fr:"Installer un EPL (limitation de puissance)",en:"Install an EPL (power limitation)",es:"Instalar un EPL (limitación de potencia)",pt:"Instalar um EPL (limitação de potência)"},correct:true},
        {id:"prop",label:{fr:"Optimiser l'hélice",en:"Optimize the propeller",es:"Optimizar la hélice",pt:"Otimizar a hélice"},correct:true},
        {id:"esd",label:{fr:"Ajouter un dispositif d'économie d'énergie",en:"Add an Energy Saving Device",es:"Añadir un dispositivo de ahorro de energía",pt:"Adicionar um dispositivo de poupança de energia"},correct:true},
      ],
      lessons:"✓ As tres solucoes propostas pelo estaleiro efetivamente melhoram a conformidade EEXI - cada uma atua num aspeto diferente (potencia, propulsao, dispositivo tecnico)\n✓ A escolha final depende de um estudo tecnico e economico realizado com a sociedade de classificacao, nao de uma decisao arbitraria\n✓ Nenhuma dessas solucoes deve ser instalada ou removida sem validacao formal previa"},
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
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:12}}>{c.what}</div>
        <div style={{fontSize:11,color:C.blue2,fontWeight:700,marginBottom:8,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"WHICH ACTIONS IMPROVE EEXI COMPLIANCE?":lang==="en"?"WHICH ACTIONS IMPROVE EEXI COMPLIANCE?":lang==="es"?"WHICH ACTIONS IMPROVE EEXI COMPLIANCE?":"WHICH ACTIONS IMPROVE EEXI COMPLIANCE?"}</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
          {c.options.map(o=>(
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
    {q:"Qu'évalue l'EEXI ?",opts:["La performance opérationnelle annuelle","La conception technique du navire, calculée une seule fois","Le prix du carburant","Le nombre de membres d'équipage"],correct:1,expl:"L'EEXI évalue la conception technique du navire - un calcul réalisé une seule fois, contrairement au CII."},
    {q:"L'EEXI est-il recalculé chaque année comme le CII ?",opts:["Oui, chaque année","Non, il est vérifié une seule fois pour établir la conformité","Oui, tous les mois","Non, il n'est jamais vérifié"],correct:1,expl:"Contrairement au CII évalué chaque année, l'EEXI est vérifié une seule fois pour établir la conformité du navire."},
    {q:"Quelle est une solution technique possible pour améliorer la conformité EEXI ?",opts:["Changer l'équipage","Installer une limitation de puissance (EPL)","Peindre la coque d'une autre couleur","Réduire le nombre de canots de sauvetage"],correct:1,expl:"L'installation d'un EPL (Engine Power Limitation) est une des solutions techniques reconnues pour améliorer la conformité EEXI."},
    {q:"Un officier peut-il retirer un EPL sans autorisation ?",opts:["Oui, s'il estime que c'est nécessaire","Non, jamais sans autorisation formelle préalable","Oui, en cas d'urgence uniquement","Oui, si le Capitaine l'autorise verbalement"],correct:1,expl:"Retirer ou contourner un EPL sans autorisation formelle ferait perdre la conformité EEXI et créerait un risque de sécurité."},
    {q:"Dans l'analogie du permis de conduire, à quoi correspond l'EEXI ?",opts:["Au bulletin de conduite (CII)","Au permis de conduire, délivré une fois","À l'assurance du véhicule","Au carburant utilisé"],correct:1,expl:"L'EEXI correspond au permis de conduire - une certification technique délivrée une fois, contrairement au CII qui est le bulletin de conduite annuel."},
  ],
  en:[
    {q:"What does EEXI assess?",opts:["Annual operational performance","The vessel's technical design, calculated once","The fuel price","The number of crew members"],correct:1,expl:"EEXI assesses the vessel's technical design - a one-time calculation, unlike CII."},
    {q:"Is EEXI recalculated every year like CII?",opts:["Yes, every year","No, it is verified once to establish compliance","Yes, every month","No, it is never verified"],correct:1,expl:"Unlike CII which is assessed every year, EEXI is verified once to establish the vessel's compliance."},
    {q:"What is one possible technical solution to improve EEXI compliance?",opts:["Changing the crew","Installing an Engine Power Limitation (EPL)","Painting the hull a different color","Reducing the number of lifeboats"],correct:1,expl:"Installing an EPL is one of the recognized technical solutions to improve EEXI compliance."},
    {q:"Can an officer remove an EPL without authorization?",opts:["Yes, if they think it's necessary","No, never without prior formal authorization","Yes, only in an emergency","Yes, if the Master verbally allows it"],correct:1,expl:"Removing or bypassing an EPL without formal authorization would cause loss of EEXI compliance and create a safety risk."},
    {q:"In the driving licence analogy, what does EEXI correspond to?",opts:["The driving record (CII)","The driving licence, issued once","The vehicle insurance","The fuel used"],correct:1,expl:"EEXI corresponds to the driving licence - a technical certification issued once, unlike CII which is the annual driving record."},
  ],
  es:[
    {q:"¿Qué evalúa el EEXI?",opts:["El rendimiento operativo anual","El diseño técnico del buque, calculado una sola vez","El precio del combustible","El número de tripulantes"],correct:1,expl:"El EEXI evalúa el diseño técnico del buque - un cálculo realizado una sola vez, a diferencia del CII."},
    {q:"¿Se recalcula el EEXI cada año como el CII?",opts:["Sí, cada año","No, se verifica una sola vez para establecer el cumplimiento","Sí, cada mes","No, nunca se verifica"],correct:1,expl:"A diferencia del CII evaluado cada año, el EEXI se verifica una sola vez para establecer el cumplimiento del buque."},
    {q:"¿Cuál es una posible solución técnica para mejorar el cumplimiento del EEXI?",opts:["Cambiar la tripulación","Instalar una limitación de potencia (EPL)","Pintar el casco de otro color","Reducir el número de botes salvavidas"],correct:1,expl:"Instalar un EPL es una de las soluciones técnicas reconocidas para mejorar el cumplimiento del EEXI."},
    {q:"¿Puede un oficial retirar un EPL sin autorización?",opts:["Sí, si lo considera necesario","No, nunca sin autorización formal previa","Sí, solo en caso de emergencia","Sí, si el Capitán lo autoriza verbalmente"],correct:1,expl:"Retirar o eludir un EPL sin autorización formal haría perder el cumplimiento del EEXI y crearía un riesgo de seguridad."},
    {q:"En la analogía del carné de conducir, ¿a qué corresponde el EEXI?",opts:["Al historial de conducción (CII)","Al carné de conducir, emitido una vez","Al seguro del vehículo","Al combustible utilizado"],correct:1,expl:"El EEXI corresponde al carné de conducir - una certificación técnica emitida una vez, a diferencia del CII que es el historial anual."},
  ],
  pt:[
    {q:"O que o EEXI avalia?",opts:["O desempenho operacional anual","O design técnico do navio, calculado uma única vez","O preço do combustível","O número de tripulantes"],correct:1,expl:"O EEXI avalia o design técnico do navio - um cálculo realizado uma única vez, ao contrário do CII."},
    {q:"O EEXI é recalculado a cada ano como o CII?",opts:["Sim, todo ano","Não, é verificado uma única vez para estabelecer a conformidade","Sim, todo mês","Não, nunca é verificado"],correct:1,expl:"Ao contrário do CII avaliado a cada ano, o EEXI é verificado uma única vez para estabelecer a conformidade do navio."},
    {q:"Qual é uma possível solução técnica para melhorar a conformidade EEXI?",opts:["Trocar a tripulação","Instalar uma limitação de potência (EPL)","Pintar o casco de outra cor","Reduzir o número de botes salva-vidas"],correct:1,expl:"Instalar um EPL é uma das soluções técnicas reconhecidas para melhorar a conformidade EEXI."},
    {q:"Um oficial pode remover um EPL sem autorização?",opts:["Sim, se achar necessário","Não, nunca sem autorização formal prévia","Sim, apenas em emergência","Sim, se o Comandante autorizar verbalmente"],correct:1,expl:"Remover ou contornar um EPL sem autorização formal faria perder a conformidade EEXI e criaria um risco de segurança."},
    {q:"Na analogia da carta de condução, a que corresponde o EEXI?",opts:["Ao histórico de condução (CII)","À carta de condução, emitida uma vez","Ao seguro do veículo","Ao combustível usado"],correct:1,expl:"O EEXI corresponde à carta de condução - uma certificação técnica emitida uma vez, ao contrário do CII que é o histórico anual."},
  ],
};

const BANK = {
  fr:[
    {q:"L'EEXI concerne-t-il les navires neufs ou existants ?",opts:["Uniquement les navires neufs","Principalement les navires existants","Uniquement les tankers","Uniquement les navires de croisière"],correct:1,expl:"L'EEXI s'applique principalement aux navires existants, pour vérifier leur conformité aux standards actuels."},
    {q:"Que se passe-t-il si l'indice EEXI calculé dépasse le seuil de référence ?",opts:["Rien, c'est automatiquement accepté","Le navire doit adopter des mesures techniques pour se conformer","Le navire est immédiatement détruit","Le certificat est délivré sans condition"],correct:1,expl:"Si l'indice dépasse le seuil, le navire doit adopter des mesures techniques (EPL, optimisation hélice, ESD) pour se conformer."},
    {q:"Qui calcule précisément l'indice EEXI d'un navire ?",opts:["L'officier machine lui-même","Les logiciels des sociétés de classification","Le Capitaine","L'affréteur"],correct:1,expl:"Le calcul précis de l'EEXI relève des logiciels des sociétés de classification, pas de l'officier machine."},
    {q:"Qu'est-ce qu'un EPL (Engine Power Limitation) ?",opts:["Un type de carburant","Une limitation technique de la puissance moteur du navire","Un certificat de sécurité incendie","Un dispositif de navigation"],correct:1,expl:"L'EPL est une limitation technique de la puissance moteur, l'une des solutions pour respecter l'EEXI."},
    {q:"L'optimisation de l'hélice peut-elle contribuer à la conformité EEXI ?",opts:["Non, cela n'a aucun rapport","Oui, c'est l'une des solutions techniques reconnues","Non, uniquement pour la vitesse maximale","Oui, mais uniquement sur les voiliers"],correct:1,expl:"L'optimisation de l'hélice est l'une des solutions techniques reconnues pour améliorer la conformité EEXI."},
    {q:"Qu'est-ce qu'un dispositif d'économie d'énergie (Energy Saving Device) ?",opts:["Un type de peinture de coque uniquement","Un équipement technique (ailerons, becquets...) réduisant la résistance ou améliorant la propulsion","Un logiciel de navigation","Un carburant alternatif"],correct:1,expl:"Un Energy Saving Device est un équipement technique conçu pour réduire la résistance ou améliorer l'efficacité de la propulsion."},
    {q:"Pourquoi ne faut-il jamais simplement retirer un EPL sans autorisation ?",opts:["Cela n'a aucune conséquence","Cela ferait perdre la conformité EEXI certifiée et pourrait créer un risque de sécurité","Cela améliore automatiquement la conformité","Cela n'est jamais possible techniquement"],correct:1,expl:"Retirer un EPL sans autorisation ferait perdre la conformité EEXI certifiée, avec des conséquences réglementaires et un risque de sécurité potentiel."},
    {q:"Toute modification touchant l'EEXI doit-elle être approuvée au préalable ?",opts:["Non, l'équipage peut décider seul","Oui, systématiquement, avant toute application","Non, seulement pour les gros navires","Oui, mais seulement après coup"],correct:1,expl:"Toute modification touchant l'EEXI - dans un sens comme dans l'autre - doit être approuvée au préalable, jamais décidée seule à bord."},
    {q:"À quel moment la conformité EEXI est-elle vérifiée par la société de classification ?",opts:["Jamais, elle n'est pas vérifiée","Au moment de la certification du navire","Uniquement lors d'un accident","Tous les jours"],correct:1,expl:"La conformité EEXI est vérifiée par la société de classification au moment de la certification du navire."},
    {q:"Que vérifient les inspecteurs PSC ou de vetting concernant l'EEXI ?",opts:["Ils recalculent l'indice EEXI eux-mêmes","Ils vérifient documentairement le certificat et la cohérence des mesures techniques","Ils ignorent totalement l'EEXI","Ils vérifient uniquement le carburant utilisé"],correct:1,expl:"Les inspecteurs vérifient documentairement le certificat EEXI et la cohérence des mesures techniques associées, sans recalculer l'indice."},
    {q:"Le maintien de la conformité EEXI au quotidien repose-t-il sur le respect des limitations techniques en place ?",opts:["Non, cela n'a aucun rapport avec le quotidien","Oui, notamment en respectant l'EPL et en ne modifiant rien sans approbation","Non, la conformité est acquise à vie sans effort","Oui, mais uniquement pendant les inspections"],correct:1,expl:"Le maintien de la conformité repose sur le respect quotidien des limitations techniques en place, comme l'EPL."},
    {q:"Dans l'analogie proposée, à quoi correspond le CII ?",opts:["Au permis de conduire","Au bulletin de conduite annuel","À l'immatriculation du véhicule","Au prix de l'essence"],correct:1,expl:"Le CII correspond au bulletin de conduite - une évaluation annuelle de la façon dont le navire est réellement exploité."},
    {q:"Dans l'exemple opérationnel, les trois solutions proposées par le chantier (EPL, hélice, ESD) sont-elles toutes valables ?",opts:["Non, une seule est valable","Oui, chacune agit sur un aspect différent et peut contribuer à la conformité","Non, aucune n'est valable","Oui, mais seulement l'EPL fonctionne réellement"],correct:1,expl:"Les trois solutions sont valables - chacune agit sur un aspect différent (puissance, propulsion, dispositif technique)."},
    {q:"Le choix final entre les solutions techniques pour l'EEXI est-il purement arbitraire ?",opts:["Oui, le Capitaine choisit seul","Non, il dépend d'une étude technique et économique avec la société de classification","Oui, c'est un choix aléatoire","Non, c'est toujours l'option la moins chère qui est choisie"],correct:1,expl:"Le choix final dépend d'une étude technique et économique menée avec la société de classification, pas d'une décision arbitraire."},
    {q:"Quelle est la compétence principale que cette leçon vise à transmettre ?",opts:["Savoir calculer soi-même l'indice EEXI","Comprendre ce que mesure l'EEXI et comment le navire reste conforme au quotidien","Savoir réparer un moteur","Savoir négocier un contrat d'affrètement"],correct:1,expl:"Cette leçon vise à faire comprendre ce que mesure l'EEXI et comment un officier machine contribue à maintenir la conformité, sans jamais calculer l'indice lui-même."},
  ],
  en:[
    {q:"Does EEXI concern new or existing ships?",opts:["Only new ships","Mainly existing ships","Only tankers","Only cruise ships"],correct:1,expl:"EEXI mainly applies to existing ships, to check their compliance with current standards."},
    {q:"What happens if the calculated EEXI index exceeds the reference threshold?",opts:["Nothing, it is automatically accepted","The vessel must adopt technical measures to comply","The vessel is immediately scrapped","The certificate is issued unconditionally"],correct:1,expl:"If the index exceeds the threshold, the vessel must adopt technical measures (EPL, propeller optimization, ESD) to comply."},
    {q:"Who precisely calculates a vessel's EEXI index?",opts:["The engine officer themselves","Classification society software","The Master","The charterer"],correct:1,expl:"The precise EEXI calculation belongs to classification society software, not the engine officer."},
    {q:"What is an EPL (Engine Power Limitation)?",opts:["A type of fuel","A technical limitation of the vessel's engine power","A fire safety certificate","A navigation device"],correct:1,expl:"An EPL is a technical limitation of engine power, one of the solutions to comply with EEXI."},
    {q:"Can propeller optimization contribute to EEXI compliance?",opts:["No, it is unrelated","Yes, it is one of the recognized technical solutions","No, only for maximum speed","Yes, but only on sailboats"],correct:1,expl:"Propeller optimization is one of the recognized technical solutions to improve EEXI compliance."},
    {q:"What is an Energy Saving Device?",opts:["Only a type of hull paint","A technical equipment (fins, ducts...) reducing resistance or improving propulsion","A navigation software","An alternative fuel"],correct:1,expl:"An Energy Saving Device is technical equipment designed to reduce resistance or improve propulsion efficiency."},
    {q:"Why should an EPL never simply be removed without authorization?",opts:["It has no consequence","It would cause loss of certified EEXI compliance and could create a safety risk","It automatically improves compliance","It is never technically possible"],correct:1,expl:"Removing an EPL without authorization would cause loss of certified EEXI compliance, with regulatory consequences and a potential safety risk."},
    {q:"Must any modification affecting EEXI be approved beforehand?",opts:["No, the crew can decide alone","Yes, systematically, before any application","No, only for large vessels","Yes, but only after the fact"],correct:1,expl:"Any modification affecting EEXI - in either direction - must be approved beforehand, never decided alone on board."},
    {q:"When is EEXI compliance verified by the classification society?",opts:["Never, it is not verified","At the time of vessel certification","Only after an accident","Every day"],correct:1,expl:"EEXI compliance is verified by the classification society at the time of vessel certification."},
    {q:"What do PSC or vetting inspectors check regarding EEXI?",opts:["They recalculate the EEXI index themselves","They document-check the certificate and consistency of technical measures","They completely ignore EEXI","They only check the fuel used"],correct:1,expl:"Inspectors document-check the EEXI certificate and the consistency of associated technical measures, without recalculating the index."},
    {q:"Does maintaining EEXI compliance daily rely on respecting technical limitations in place?",opts:["No, it has nothing to do with daily operations","Yes, notably by respecting the EPL and not modifying anything without approval","No, compliance is acquired for life effortlessly","Yes, but only during inspections"],correct:1,expl:"Maintaining compliance relies on daily respect for the technical limitations in place, such as the EPL."},
    {q:"In the proposed analogy, what does CII correspond to?",opts:["The driving licence","The annual driving record","The vehicle registration","The fuel price"],correct:1,expl:"CII corresponds to the driving record - an annual assessment of how the vessel is actually operated."},
    {q:"In the operational example, are all three solutions proposed by the yard (EPL, propeller, ESD) valid?",opts:["No, only one is valid","Yes, each acts on a different aspect and can contribute to compliance","No, none is valid","Yes, but only the EPL actually works"],correct:1,expl:"All three solutions are valid - each acts on a different aspect (power, propulsion, technical device)."},
    {q:"Is the final choice between technical solutions for EEXI purely arbitrary?",opts:["Yes, the Master decides alone","No, it depends on a technical and economic study with the classification society","Yes, it's a random choice","No, it's always the cheapest option that is chosen"],correct:1,expl:"The final choice depends on a technical and economic study conducted with the classification society, not an arbitrary decision."},
    {q:"What is the main skill this lesson aims to convey?",opts:["Knowing how to calculate the EEXI index yourself","Understanding what EEXI measures and how the vessel stays compliant daily","Knowing how to repair an engine","Knowing how to negotiate a charter contract"],correct:1,expl:"This lesson aims to convey what EEXI measures and how an engine officer contributes to maintaining compliance, without ever calculating the index themselves."},
  ],
  es:[
    {q:"¿El EEXI concierne a buques nuevos o existentes?",opts:["Solo buques nuevos","Principalmente buques existentes","Solo petroleros","Solo cruceros"],correct:1,expl:"El EEXI se aplica principalmente a buques existentes, para verificar su cumplimiento con los estándares actuales."},
    {q:"¿Qué ocurre si el índice EEXI calculado supera el umbral de referencia?",opts:["Nada, se acepta automáticamente","El buque debe adoptar medidas técnicas para cumplir","El buque se desguaza inmediatamente","El certificado se emite sin condiciones"],correct:1,expl:"Si el índice supera el umbral, el buque debe adoptar medidas técnicas (EPL, optimización de hélice, ESD) para cumplir."},
    {q:"¿Quién calcula precisamente el índice EEXI de un buque?",opts:["El propio oficial de máquinas","El software de las sociedades de clasificación","El Capitán","El fletador"],correct:1,expl:"El cálculo preciso del EEXI corresponde al software de las sociedades de clasificación, no al oficial de máquinas."},
    {q:"¿Qué es un EPL (Engine Power Limitation)?",opts:["Un tipo de combustible","Una limitación técnica de la potencia del motor del buque","Un certificado de seguridad contra incendios","Un dispositivo de navegación"],correct:1,expl:"El EPL es una limitación técnica de la potencia del motor, una de las soluciones para cumplir con el EEXI."},
    {q:"¿Puede la optimización de la hélice contribuir al cumplimiento del EEXI?",opts:["No, no tiene relación","Sí, es una de las soluciones técnicas reconocidas","No, solo para la velocidad máxima","Sí, pero solo en veleros"],correct:1,expl:"La optimización de la hélice es una de las soluciones técnicas reconocidas para mejorar el cumplimiento del EEXI."},
    {q:"¿Qué es un dispositivo de ahorro de energía (Energy Saving Device)?",opts:["Solo un tipo de pintura del casco","Un equipo técnico (aletas, conductos...) que reduce la resistencia o mejora la propulsión","Un software de navegación","Un combustible alternativo"],correct:1,expl:"Un Energy Saving Device es un equipo técnico diseñado para reducir la resistencia o mejorar la eficiencia de la propulsión."},
    {q:"¿Por qué nunca se debe simplemente retirar un EPL sin autorización?",opts:["No tiene ninguna consecuencia","Haría perder el cumplimiento EEXI certificado y podría crear un riesgo de seguridad","Mejora automáticamente el cumplimiento","Nunca es técnicamente posible"],correct:1,expl:"Retirar un EPL sin autorización haría perder el cumplimiento EEXI certificado, con consecuencias reglamentarias y un riesgo de seguridad potencial."},
    {q:"¿Toda modificación que afecte al EEXI debe aprobarse previamente?",opts:["No, la tripulación puede decidir sola","Sí, sistemáticamente, antes de cualquier aplicación","No, solo para buques grandes","Sí, pero solo después de aplicarla"],correct:1,expl:"Cualquier modificación que afecte al EEXI - en cualquier sentido - debe aprobarse previamente, nunca decidirse sola a bordo."},
    {q:"¿En qué momento se verifica el cumplimiento del EEXI por la sociedad de clasificación?",opts:["Nunca, no se verifica","En el momento de la certificación del buque","Solo tras un accidente","Todos los días"],correct:1,expl:"El cumplimiento del EEXI es verificado por la sociedad de clasificación en el momento de la certificación del buque."},
    {q:"¿Qué verifican los inspectores PSC o de vetting respecto al EEXI?",opts:["Recalculan el índice EEXI ellos mismos","Verifican documentalmente el certificado y la coherencia de las medidas técnicas","Ignoran completamente el EEXI","Solo verifican el combustible usado"],correct:1,expl:"Los inspectores verifican documentalmente el certificado EEXI y la coherencia de las medidas técnicas asociadas, sin recalcular el índice."},
    {q:"¿El mantenimiento del cumplimiento del EEXI a diario se basa en respetar las limitaciones técnicas vigentes?",opts:["No, no tiene relación con el día a día","Sí, especialmente respetando el EPL y no modificando nada sin aprobación","No, el cumplimiento se adquiere de por vida sin esfuerzo","Sí, pero solo durante las inspecciones"],correct:1,expl:"El mantenimiento del cumplimiento se basa en el respeto diario de las limitaciones técnicas vigentes, como el EPL."},
    {q:"En la analogía propuesta, ¿a qué corresponde el CII?",opts:["Al carné de conducir","Al historial de conducción anual","A la matrícula del vehículo","Al precio del combustible"],correct:1,expl:"El CII corresponde al historial de conducción - una evaluación anual de cómo se opera realmente el buque."},
    {q:"En el ejemplo operativo, ¿son válidas las tres soluciones propuestas por el astillero (EPL, hélice, ESD)?",opts:["No, solo una es válida","Sí, cada una actúa sobre un aspecto diferente y puede contribuir al cumplimiento","No, ninguna es válida","Sí, pero solo el EPL funciona realmente"],correct:1,expl:"Las tres soluciones son válidas - cada una actúa sobre un aspecto diferente (potencia, propulsión, dispositivo técnico)."},
    {q:"¿Es la elección final entre las soluciones técnicas para el EEXI puramente arbitraria?",opts:["Sí, el Capitán decide solo","No, depende de un estudio técnico y económico con la sociedad de clasificación","Sí, es una elección aleatoria","No, siempre se elige la opción más barata"],correct:1,expl:"La elección final depende de un estudio técnico y económico realizado con la sociedad de clasificación, no de una decisión arbitraria."},
    {q:"¿Cuál es la principal competencia que esta lección busca transmitir?",opts:["Saber calcular uno mismo el índice EEXI","Comprender qué mide el EEXI y cómo el buque se mantiene conforme a diario","Saber reparar un motor","Saber negociar un contrato de fletamento"],correct:1,expl:"Esta lección busca transmitir qué mide el EEXI y cómo un oficial de máquinas contribuye a mantener el cumplimiento, sin calcular él mismo el índice."},
  ],
  pt:[
    {q:"O EEXI diz respeito a navios novos ou existentes?",opts:["Apenas navios novos","Principalmente navios existentes","Apenas petroleiros","Apenas cruzeiros"],correct:1,expl:"O EEXI aplica-se principalmente a navios existentes, para verificar sua conformidade com os padrões atuais."},
    {q:"O que acontece se o índice EEXI calculado exceder o limite de referência?",opts:["Nada, é automaticamente aceito","O navio deve adotar medidas técnicas para cumprir","O navio é imediatamente sucateado","O certificado é emitido sem condições"],correct:1,expl:"Se o índice exceder o limite, o navio deve adotar medidas técnicas (EPL, otimização de hélice, ESD) para cumprir."},
    {q:"Quem calcula precisamente o índice EEXI de um navio?",opts:["O próprio oficial de máquinas","O software das sociedades de classificação","O Comandante","O afretador"],correct:1,expl:"O cálculo preciso do EEXI cabe ao software das sociedades de classificação, não ao oficial de máquinas."},
    {q:"O que é um EPL (Engine Power Limitation)?",opts:["Um tipo de combustível","Uma limitação técnica da potência do motor do navio","Um certificado de segurança contra incêndio","Um dispositivo de navegação"],correct:1,expl:"O EPL é uma limitação técnica da potência do motor, uma das soluções para cumprir o EEXI."},
    {q:"A otimização da hélice pode contribuir para a conformidade EEXI?",opts:["Não, não tem relação","Sim, é uma das soluções técnicas reconhecidas","Não, apenas para a velocidade máxima","Sim, mas apenas em veleiros"],correct:1,expl:"A otimização da hélice é uma das soluções técnicas reconhecidas para melhorar a conformidade EEXI."},
    {q:"O que é um dispositivo de poupança de energia (Energy Saving Device)?",opts:["Apenas um tipo de tinta do casco","Um equipamento técnico (aletas, dutos...) que reduz a resistência ou melhora a propulsão","Um software de navegação","Um combustível alternativo"],correct:1,expl:"Um Energy Saving Device é um equipamento técnico projetado para reduzir a resistência ou melhorar a eficiência da propulsão."},
    {q:"Por que nunca se deve simplesmente remover um EPL sem autorização?",opts:["Não tem nenhuma consequência","Faria perder a conformidade EEXI certificada e poderia criar um risco de segurança","Melhora automaticamente a conformidade","Nunca é tecnicamente possível"],correct:1,expl:"Remover um EPL sem autorização faria perder a conformidade EEXI certificada, com consequências regulamentares e um risco de segurança potencial."},
    {q:"Toda modificação que afete o EEXI deve ser aprovada previamente?",opts:["Não, a tripulação pode decidir sozinha","Sim, sistematicamente, antes de qualquer aplicação","Não, apenas para navios grandes","Sim, mas apenas depois de aplicada"],correct:1,expl:"Qualquer modificação que afete o EEXI - em qualquer sentido - deve ser aprovada previamente, nunca decidida sozinha a bordo."},
    {q:"Em que momento a conformidade EEXI é verificada pela sociedade de classificação?",opts:["Nunca, não é verificada","No momento da certificação do navio","Apenas após um acidente","Todos os dias"],correct:1,expl:"A conformidade EEXI é verificada pela sociedade de classificação no momento da certificação do navio."},
    {q:"O que os inspetores PSC ou de vetting verificam quanto ao EEXI?",opts:["Recalculam o índice EEXI eles mesmos","Verificam documentalmente o certificado e a coerência das medidas técnicas","Ignoram completamente o EEXI","Verificam apenas o combustível usado"],correct:1,expl:"Os inspetores verificam documentalmente o certificado EEXI e a coerência das medidas técnicas associadas, sem recalcular o índice."},
    {q:"A manutenção da conformidade EEXI no dia a dia depende do respeito às limitações técnicas em vigor?",opts:["Não, não tem relação com o dia a dia","Sim, notadamente respeitando o EPL e não modificando nada sem aprovação","Não, a conformidade é adquirida para toda a vida sem esforço","Sim, mas apenas durante as inspeções"],correct:1,expl:"A manutenção da conformidade depende do respeito diário às limitações técnicas em vigor, como o EPL."},
    {q:"Na analogia proposta, a que corresponde o CII?",opts:["À carta de condução","Ao histórico de condução anual","À matrícula do veículo","Ao preço do combustível"],correct:1,expl:"O CII corresponde ao histórico de condução - uma avaliação anual de como o navio é realmente operado."},
    {q:"No exemplo operacional, as três soluções propostas pelo estaleiro (EPL, hélice, ESD) são todas válidas?",opts:["Não, apenas uma é válida","Sim, cada uma atua num aspeto diferente e pode contribuir para a conformidade","Não, nenhuma é válida","Sim, mas só o EPL funciona de fato"],correct:1,expl:"As três soluções são válidas - cada uma atua num aspeto diferente (potência, propulsão, dispositivo técnico)."},
    {q:"A escolha final entre as soluções técnicas para o EEXI é puramente arbitrária?",opts:["Sim, o Comandante decide sozinho","Não, depende de um estudo técnico e econômico com a sociedade de classificação","Sim, é uma escolha aleatória","Não, é sempre escolhida a opção mais barata"],correct:1,expl:"A escolha final depende de um estudo técnico e econômico realizado com a sociedade de classificação, não de uma decisão arbitrária."},
    {q:"Qual é a principal competência que esta lição visa transmitir?",opts:["Saber calcular sozinho o índice EEXI","Compreender o que o EEXI mede e como o navio se mantém conforme no dia a dia","Saber reparar um motor","Saber negociar um contrato de afretamento"],correct:1,expl:"Esta lição visa transmitir o que o EEXI mede e como um oficial de máquinas contribui para manter a conformidade, sem nunca calcular o índice sozinho."},
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
      badge:"🍃 Module Machine · Leçon 3/5 · ⭐ Premium · 200 XP",
      title:"L'EEXI",
      intro:"Les Leçons 1 et 2 ont introduit l'EEXI et sa place dans le SEEMP Part III. Cette leçon lui consacre le détail complet - mais aucune formule, aucun calcul. Ton rôle en tant qu'officier machine est de comprendre ce que l'indice mesure et comment le navire reste conforme, pas de le calculer toi-même.",
      p1:"PARTIE 1 - CE QUE L'EEXI MESURE",
      s1:"Un indice technique, calculé une fois, qui évalue la conception du navire plutôt que son exploitation réelle.",
      p2:"PARTIE 2 - POURQUOI CERTAINS NAVIRES DOIVENT ÊTRE MODIFIÉS",
      s2:"Trois solutions techniques courantes permettent à un navire existant de devenir conforme - chacune approuvée formellement avant application.",
      p3:"PARTIE 3 - COMMENT RESTER CONFORME",
      s3:"La conformité EEXI se vérifie à des moments précis et se maintient par des gestes simples au quotidien.",
      p4:"PARTIE 4 - EEXI vs CII",
      s4:"Une analogie simple pour ancrer durablement la différence entre les deux outils vus dans ce module.",
      p5:"PARTIE 5 - EXERCICE",
      p6:"PARTIE 6 - EXEMPLE OPÉRATIONNEL",
      p7:"PARTIE 7 - BANQUE DE QUESTIONS",
      closingPhrase:"Le navire le plus efficace n'est pas toujours le plus récent. C'est celui qui est exploité et entretenu en gardant l'efficacité énergétique à l'esprit.",
      sumT:"POINTS CLÉS",
      sumP:[
        "L'EEXI évalue la conception technique du navire, calculée une seule fois",
        "L'EEXI s'applique principalement aux navires existants, contrairement au CII évalué chaque année",
        "EPL, optimisation d'hélice et dispositifs d'économie d'énergie sont des solutions techniques reconnues",
        "Toute modification touchant l'EEXI doit être approuvée au préalable, jamais décidée seule à bord",
        "La conformité se vérifie à la certification et se contrôle documentairement en inspection",
        "EEXI = permis de conduire (une fois) · CII = bulletin de conduite (chaque année)",
      ],
      learnedP:[
        "Comprendre ce que mesure l'EEXI, sans avoir besoin de le calculer",
        "Identifier les solutions techniques courantes pour la conformité EEXI",
        "Comprendre pourquoi un EPL ne doit jamais être contourné sans autorisation",
        "Distinguer clairement l'EEXI et le CII grâce à l'analogie du permis de conduire",
        "Je sais reconnaître les signes de conformité EEXI d'un navire et agir en conséquence au quotidien",
      ],
    },
    en:{
      badge:"🍃 Engine Module · Lesson 3/5 · ⭐ Premium · 200 XP",
      title:"The EEXI",
      intro:"Lessons 1 and 2 introduced EEXI and its place in SEEMP Part III. This lesson gives it full detail - but no formula, no calculation. Your role as an engine officer is to understand what the index measures and how the vessel stays compliant, not to calculate it yourself.",
      p1:"PART 1 - WHAT EEXI MEASURES",
      s1:"A technical index, calculated once, that assesses the vessel's design rather than its actual operation.",
      p2:"PART 2 - WHY SOME SHIPS MUST BE MODIFIED",
      s2:"Three common technical solutions allow an existing vessel to become compliant - each formally approved before application.",
      p3:"PART 3 - HOW TO STAY COMPLIANT",
      s3:"EEXI compliance is checked at specific moments and maintained through simple daily actions.",
      p4:"PART 4 - EEXI vs CII",
      s4:"A simple analogy to firmly anchor the difference between the two tools covered in this module.",
      p5:"PART 5 - EXERCISE",
      p6:"PART 6 - OPERATIONAL EXAMPLE",
      p7:"PART 7 - QUESTION BANK",
      closingPhrase:"The most efficient ship is not always the newest one. It is the one that is operated and maintained with energy efficiency in mind.",
      sumT:"KEY POINTS",
      sumP:[
        "EEXI assesses the vessel's technical design, calculated once",
        "EEXI mainly applies to existing ships, unlike CII which is assessed every year",
        "EPL, propeller optimization and energy saving devices are recognized technical solutions",
        "Any modification affecting EEXI must be approved beforehand, never decided alone on board",
        "Compliance is checked at certification and document-checked during inspections",
        "EEXI = driving licence (once) · CII = driving record (every year)",
      ],
      learnedP:[
        "Understand what EEXI measures, without needing to calculate it",
        "Identify common technical solutions for EEXI compliance",
        "Understand why an EPL must never be bypassed without authorization",
        "Clearly distinguish EEXI and CII through the driving licence analogy",
        "I know how to recognize a vessel's EEXI compliance signs and act accordingly day to day",
      ],
    },
    es:{
      badge:"🍃 Módulo Máquinas · Lección 3/5 · ⭐ Premium · 200 XP",
      title:"El EEXI",
      intro:"Las Lecciones 1 y 2 introdujeron el EEXI y su lugar en el SEEMP Part III. Esta lección le da el detalle completo - pero sin fórmulas, sin cálculos. Tu rol como oficial de máquinas es entender qué mide el índice y cómo el buque se mantiene conforme, no calcularlo tú mismo.",
      p1:"PARTE 1 - LO QUE MIDE EL EEXI",
      s1:"Un índice técnico, calculado una vez, que evalúa el diseño del buque más que su explotación real.",
      p2:"PARTE 2 - POR QUÉ ALGUNOS BUQUES DEBEN SER MODIFICADOS",
      s2:"Tres soluciones técnicas comunes permiten que un buque existente se vuelva conforme - cada una aprobada formalmente antes de su aplicación.",
      p3:"PARTE 3 - CÓMO MANTENERSE CONFORME",
      s3:"El cumplimiento del EEXI se verifica en momentos precisos y se mantiene mediante gestos simples diarios.",
      p4:"PARTE 4 - EEXI vs CII",
      s4:"Una analogía simple para anclar duraderamente la diferencia entre las dos herramientas vistas en este módulo.",
      p5:"PARTE 5 - EJERCICIO",
      p6:"PARTE 6 - EJEMPLO OPERATIVO",
      p7:"PARTE 7 - BANCO DE PREGUNTAS",
      closingPhrase:"El buque más eficiente no siempre es el más nuevo. Es el que se opera y mantiene teniendo en cuenta la eficiencia energética.",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "El EEXI evalúa el diseño técnico del buque, calculado una sola vez",
        "El EEXI se aplica principalmente a buques existentes, a diferencia del CII evaluado cada año",
        "EPL, optimización de hélice y dispositivos de ahorro de energía son soluciones técnicas reconocidas",
        "Cualquier modificación que afecte al EEXI debe aprobarse previamente, nunca decidirse sola a bordo",
        "El cumplimiento se verifica en la certificación y se controla documentalmente en inspección",
        "EEXI = carné de conducir (una vez) · CII = historial de conducción (cada año)",
      ],
      learnedP:[
        "Comprender qué mide el EEXI, sin necesidad de calcularlo",
        "Identificar las soluciones técnicas comunes para el cumplimiento del EEXI",
        "Comprender por qué un EPL nunca debe eludirse sin autorización",
        "Distinguir claramente el EEXI y el CII mediante la analogía del carné de conducir",
        "Sé cómo reconocer las señales de cumplimiento EEXI de un buque y actuar en consecuencia a diario",
      ],
    },
    pt:{
      badge:"🍃 Módulo Máquinas · Lição 3/5 · ⭐ Premium · 200 XP",
      title:"O EEXI",
      intro:"As Lições 1 e 2 introduziram o EEXI e seu lugar no SEEMP Part III. Esta lição dá-lhe o detalhe completo - mas sem fórmulas, sem cálculos. Seu papel como oficial de máquinas é entender o que o índice mede e como o navio se mantém conforme, não calculá-lo você mesmo.",
      p1:"PARTE 1 - O QUE O EEXI MEDE",
      s1:"Um índice técnico, calculado uma vez, que avalia o design do navio em vez de sua operação real.",
      p2:"PARTE 2 - POR QUE ALGUNS NAVIOS DEVEM SER MODIFICADOS",
      s2:"Três soluções técnicas comuns permitem que um navio existente se torne conforme - cada uma formalmente aprovada antes da aplicação.",
      p3:"PARTE 3 - COMO PERMANECER CONFORME",
      s3:"A conformidade EEXI é verificada em momentos precisos e mantida através de gestos simples diários.",
      p4:"PARTE 4 - EEXI vs CII",
      s4:"Uma analogia simples para ancorar duradouramente a diferença entre as duas ferramentas vistas neste módulo.",
      p5:"PARTE 5 - EXERCÍCIO",
      p6:"PARTE 6 - EXEMPLO OPERACIONAL",
      p7:"PARTE 7 - BANCO DE QUESTÕES",
      closingPhrase:"O navio mais eficiente nem sempre é o mais novo. É aquele que é operado e mantido com a eficiência energética em mente.",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "O EEXI avalia o design técnico do navio, calculado uma única vez",
        "O EEXI aplica-se principalmente a navios existentes, ao contrário do CII avaliado a cada ano",
        "EPL, otimização de hélice e dispositivos de poupança de energia são soluções técnicas reconhecidas",
        "Qualquer modificação que afete o EEXI deve ser aprovada previamente, nunca decidida sozinha a bordo",
        "A conformidade é verificada na certificação e controlada documentalmente em inspeção",
        "EEXI = carta de condução (uma vez) · CII = histórico de condução (a cada ano)",
      ],
      learnedP:[
        "Compreender o que o EEXI mede, sem precisar calculá-lo",
        "Identificar as soluções técnicas comuns para a conformidade EEXI",
        "Compreender por que um EPL nunca deve ser contornado sem autorização",
        "Distinguir claramente o EEXI e o CII através da analogia da carta de condução",
        "Sei reconhecer os sinais de conformidade EEXI de um navio e agir em conformidade no dia a dia",
      ],
    },
  };
  return d[lang] || d.fr;
};

export default function LessonSEEMP_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/5":lang==="en"?"Lesson 3/5":lang==="es"?"Lección 3/5":"Lição 3/5"}</div>
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

            <SL icon="🏗️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🏗️ {lang==="fr"?"EEXI - INTERACTIF":lang==="en"?"EEXI - INTERACTIVE":lang==="es"?"EEXI - INTERACTIVO":"EEXI - INTERATIVO"}</div>
              <EEXIMeasureSVG lang={lang}/>
            </Card>

            <SL icon="🔧" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔧 {lang==="fr"?"AVANT → APRÈS CONFORMITÉ":lang==="en"?"BEFORE → AFTER COMPLIANCE":lang==="es"?"ANTES → DESPUÉS CONFORMIDAD":"ANTES → DEPOIS CONFORMIDADE"}</div>
              <BeforeAfterSVG lang={lang}/>
            </Card>
            <div style={{marginBottom:14}}><WhyNotRemoveEPL lang={lang}/></div>

            <SL icon="📜" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📜 {lang==="fr"?"RESTER CONFORME - INTERACTIF":lang==="en"?"STAYING COMPLIANT - INTERACTIVE":lang==="es"?"MANTENERSE CONFORME - INTERACTIVO":"MANTER-SE CONFORME - INTERATIVO"}</div>
              <StayCompliantSVG lang={lang}/>
            </Card>

            <SL icon="🪪" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <EEXIvsCIISVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><EEXIChecklist lang={lang}/></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise3 lang={lang} t={t}/></Card>

            <SL icon="🔧" text={lc.p6} color={C.blue2}/>
            <div style={{marginBottom:14}}><OperationalExample lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
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
                {lang==="fr"?"Quiz - L'EEXI":lang==="en"?"Quiz - The EEXI":lang==="es"?"Quiz - El EEXI":"Quiz - O EEXI"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 3":lang==="en"?"Lesson 3":lang==="es"?"Lección 3":"Lição 3"}</div>
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
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(30,138,74,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 4 - LE CII →":lang==="en"?"LESSON 4 - THE CII →":lang==="es"?"LECCIÓN 4 - EL CII →":"LIÇÃO 4 - O CII →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
