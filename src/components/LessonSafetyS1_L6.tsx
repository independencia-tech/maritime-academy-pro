import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Sécurité", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 MODULE TERMINÉ!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Safety", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 MODULE COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Seguridad", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡MÓDULO COMPLETADO!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Segurança", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 MÓDULO CONCLUÍDO!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — CONSTELLATION OF 5 CASES
// ══════════════════════════════════════
function ConstellationSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const cases = [
    { id:"doria", lesson:"L1", color:C.blue2, pos:{x:40,y:60}, name:"Andrea Doria — Stockholm (1956)",
      factor:{fr:"Automation bias — confiance aveugle dans le radar",en:"Automation bias — blind trust in radar",es:"Sesgo de automatización — confianza ciega en el radar",pt:"Viés de automação — confiança cega no radar"} },
    { id:"mccain", lesson:"L2", color:C.teal, pos:{x:110,y:30}, name:"USS John S. McCain (2017)",
      factor:{fr:"Coordination d'équipe — confusion de contrôle de barre",en:"Team coordination — steering control confusion",es:"Coordinación de equipo — confusión de control de timón",pt:"Coordenação de equipa — confusão de controlo do leme"} },
    { id:"sanchi", lesson:"L3", color:C.orange, pos:{x:180,y:60}, name:"Sanchi — CF Crystal (2018)",
      factor:{fr:"Manœuvre décisive trop tardive",en:"Decisive maneuver too late",es:"Maniobra decisiva demasiado tardía",pt:"Manobra decisiva tardia demais"} },
    { id:"baltic", lesson:"L4", color:C.red, pos:{x:250,y:30}, name:"Baltic Ace — Corvus J (2012)",
      factor:{fr:"Fenêtre de décision extrêmement courte",en:"Extremely short decision window",es:"Ventana de decisión extremadamente corta",pt:"Janela de decisão extremamente curta"} },
    { id:"ever", lesson:"L5", color:C.purple, pos:{x:150,y:90}, name:"Ever Smart — Alexandra 1 (2015)",
      factor:{fr:"Hypothèse non vérifiée entre les deux passerelles",en:"Unverified assumption between the two bridges",es:"Hipótesis no verificada entre los dos puentes",pt:"Hipótese não verificada entre as duas pontes"} },
  ];
  const sel_ = sel?cases.find(c=>c.id===sel):null;
  return (
    <div>
      <svg width="100%" height="120" viewBox="0 0 300 120">
        {cases.map((c,i)=>cases.slice(i+1).map((c2,j)=>(
          <line key={`${c.id}-${c2.id}`} x1={c.pos.x} y1={c.pos.y} x2={c2.pos.x} y2={c2.pos.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        )))}
        {cases.map(c=>(
          <g key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)} style={{cursor:"pointer"}}>
            <circle cx={c.pos.x} cy={c.pos.y} r={sel===c.id?12:9} fill={sel===c.id?c.color:`${c.color}88`} stroke={c.color} strokeWidth="1.5"/>
            <text x={c.pos.x} y={c.pos.y+4} fontSize="8" fontWeight="800" textAnchor="middle" fill={C.white}>{c.lesson}</text>
          </g>
        ))}
      </svg>
      {sel_ ? (
        <div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>
          <div style={{fontWeight:700,marginBottom:3,color:sel_.color}}>{sel_.name}</div>
          {sel_.factor[lang]||sel_.factor.fr}
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche un cas pour revoir son facteur dominant":lang==="en"?"Tap a case to review its dominant factor":lang==="es"?"Toca un caso para revisar su factor dominante":"Toque num caso para rever o seu fator dominante"}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — CROSS-CAUSE MATRIX
// ══════════════════════════════════════
function CauseMatrixSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const factors = [
    { id:"human", label:{fr:"Facteur humain",en:"Human factor",es:"Factor humano",pt:"Fator humano"}, cases:"Andrea Doria, Ever Smart" },
    { id:"coord", label:{fr:"Coordination",en:"Coordination",es:"Coordinación",pt:"Coordenação"}, cases:"USS McCain, Ever Smart" },
    { id:"late", label:{fr:"Décision tardive",en:"Late decision",es:"Decisión tardía",pt:"Decisão tardia"}, cases:"Sanchi, Baltic Ace, Ever Smart" },
    { id:"assume", label:{fr:"Hypothèse non vérifiée",en:"Unverified assumption",es:"Hipótesis no verificada",pt:"Hipótese não verificada"}, cases:"Andrea Doria, Ever Smart" },
    { id:"time", label:{fr:"Pression temporelle",en:"Time pressure",es:"Presión temporal",pt:"Pressão temporal"}, cases:"Sanchi, Baltic Ace" },
    { id:"aware", label:{fr:"Perte de conscience situation",en:"Loss of situational awareness",es:"Pérdida de conciencia situacional",pt:"Perda de consciência situacional"}, cases:"USS McCain, Ever Smart" },
  ];
  const sel_ = sel?factors.find(f=>f.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {factors.map(f=>(
          <div key={f.id} onClick={()=>setSel(sel===f.id?null:f.id)}
            style={{padding:"9px 8px",borderRadius:10,cursor:"pointer",textAlign:"center",
              background:sel===f.id?"rgba(201,146,42,0.2)":"rgba(255,255,255,0.04)",
              border:`1px solid ${sel===f.id?C.gold:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:10,fontWeight:700,color:sel===f.id?C.gold2:C.muted}}>{f.label[lang]||f.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.white,lineHeight:1.7}}>
        <span style={{fontWeight:700,color:C.gold2}}>{lang==="fr"?"Présent dans : ":lang==="en"?"Present in: ":lang==="es"?"Presente en: ":"Presente em: "}</span>{sel_.cases}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — DECISION WINDOW COMPARATOR
// ══════════════════════════════════════
function DecisionWindowSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const bars = [
    { id:"doria", label:"Andrea Doria", w:90, color:C.blue2, time:{fr:"~minutes (interprétation erronée en amont)",en:"~minutes (misinterpretation upstream)",es:"~minutos (mala interpretación previa)",pt:"~minutos (má interpretação a montante)"} },
    { id:"mccain", label:"USS McCain", w:70, color:C.teal, time:{fr:"~quelques minutes de confusion",en:"~a few minutes of confusion",es:"~unos minutos de confusión",pt:"~alguns minutos de confusão"} },
    { id:"sanchi", label:"Sanchi", w:40, color:C.orange, time:{fr:"~1 minute avant l'impact",en:"~1 minute before impact",es:"~1 minuto antes del impacto",pt:"~1 minuto antes do impacto"} },
    { id:"baltic", label:"Baltic Ace", w:25, color:C.red, time:{fr:"~15 minutes pour tout le naufrage",en:"~15 minutes for the entire sinking",es:"~15 minutos para todo el hundimiento",pt:"~15 minutos para todo o naufrágio"} },
    { id:"ever", label:"Ever Smart", w:15, color:C.purple, time:{fr:"3 secondes pour l'ordre décisif",en:"3 seconds for the decisive order",es:"3 segundos para la orden decisiva",pt:"3 segundos para a ordem decisiva"} },
  ];
  const sel_ = sel?bars.find(b=>b.id===sel):null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {bars.map(b=>(
          <div key={b.id} onClick={()=>setSel(sel===b.id?null:b.id)} style={{cursor:"pointer"}}>
            <div style={{fontSize:9,color:C.muted,marginBottom:2}}>{b.label}</div>
            <div style={{height:14,borderRadius:7,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
              <div style={{height:"100%",width:`${b.w}%`,background:sel===b.id?b.color:`${b.color}88`,borderRadius:7}}/>
            </div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{marginTop:10,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.time[lang]||sel_.time.fr}</div>}
      {!sel_&&<div style={{textAlign:"center",marginTop:8,fontSize:10,color:C.muted}}>{lang==="fr"?"Touche une barre pour voir la fenêtre de décision réelle":lang==="en"?"Tap a bar to see the real decision window":lang==="es"?"Toca una barra para ver la ventana de decisión real":"Toque numa barra para ver a janela de decisão real"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SELF-ASSESSMENT WHEEL
// ══════════════════════════════════════
function SelfAssessSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"fatigue", icon:"😴", color:C.orange, q:{fr:"Est-ce que je reconnais mes signes de fatigue avant qu'ils n'affectent mon jugement ?",en:"Do I recognize my own fatigue signs before they affect my judgment?",es:"¿Reconozco mis señales de fatiga antes de que afecten mi juicio?",pt:"Reconheço os meus sinais de fadiga antes de afetarem o meu julgamento?"} },
    { id:"assert", icon:"🗣️", color:C.blue2, q:{fr:"Est-ce que j'ose signaler un danger même face à un supérieur ?",en:"Do I dare report a danger even to a senior officer?",es:"¿Me atrevo a señalar un peligro incluso ante un superior?",pt:"Atrevo-me a reportar um perigo mesmo perante um superior?"} },
    { id:"verify", icon:"🔍", color:C.teal, q:{fr:"Est-ce que je vérifie mes hypothèses avant d'agir sur elles ?",en:"Do I verify my assumptions before acting on them?",es:"¿Verifico mis hipótesis antes de actuar sobre ellas?",pt:"Verifico as minhas hipóteses antes de agir sobre elas?"} },
    { id:"prior", icon:"🎯", color:C.gold2, q:{fr:"Est-ce que je priorise correctement l'urgent avant l'important ?",en:"Do I correctly prioritize the urgent over the important?",es:"¿Priorizo correctamente lo urgente sobre lo importante?",pt:"Priorizo corretamente o urgente sobre o importante?"} },
    { id:"commit", icon:"⚡", color:C.red, q:{fr:"Est-ce que j'agis rapidement une fois la décision prise, sans hésitation résiduelle ?",en:"Do I act quickly once a decision is made, without residual hesitation?",es:"¿Actúo rápido una vez tomada la decisión, sin dudas residuales?",pt:"Ajo rapidamente depois de tomar uma decisão, sem hesitação residual?"} },
  ];
  const sel_ = sel?items.find(i=>i.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setSel(sel===it.id?null:it.id)}
            style={{padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===it.id?`${it.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===it.id?it.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20}}>{it.icon}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:12,color:C.white,lineHeight:1.7,fontStyle:"italic"}}>{sel_.q[lang]||sel_.q.fr}</div>}
      {!sel_&&<div style={{textAlign:"center",fontSize:10,color:C.muted}}>{lang==="fr"?"Touche une icône pour une question d'auto-évaluation":lang==="en"?"Tap an icon for a self-assessment question":lang==="es"?"Toca un icono para una pregunta de autoevaluación":"Toque num ícone para uma pergunta de autoavaliação"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// CASE RETROSPECTIVE (no new case — summary of the 5 already studied)
// ══════════════════════════════════════
function CaseRetrospective({ lang }) {
  const [open, setOpen] = useState(null);
  const cases = [
    { id:"doria", lesson:"L1", name:"Andrea Doria — Stockholm (1956)", color:C.blue2,
      lesson_text:{fr:"Le radar montre une position, pas une intention.",en:"Radar shows a position, not an intention.",es:"El radar muestra una posición, no una intención.",pt:"O radar mostra uma posição, não uma intenção."} },
    { id:"mccain", lesson:"L2", name:"USS John S. McCain (2017)", color:C.teal,
      lesson_text:{fr:"Une équipe n'est pas juste un groupe dans la même pièce.",en:"A team is not just a group in the same room.",es:"Un equipo no es solo un grupo en la misma sala.",pt:"Uma equipa não é apenas um grupo na mesma sala."} },
    { id:"sanchi", lesson:"L3", name:"Sanchi — CF Crystal (2018)", color:C.orange,
      lesson_text:{fr:"Une action tardive vaut mieux qu'aucune, mais agir tôt change tout.",en:"A late action beats no action, but acting early changes everything.",es:"Una acción tardía es mejor que ninguna, pero actuar pronto lo cambia todo.",pt:"Uma ação tardia é melhor que nenhuma, mas agir cedo muda tudo."} },
    { id:"baltic", lesson:"L4", name:"Baltic Ace — Corvus J (2012)", color:C.red,
      lesson_text:{fr:"Certaines situations évoluent en quelques minutes seulement.",en:"Some situations unfold in just a few minutes.",es:"Algunas situaciones evolucionan en solo unos minutos.",pt:"Algumas situações evoluem em apenas alguns minutos."} },
    { id:"ever", lesson:"L5", name:"Ever Smart — Alexandra 1 (2015)", color:C.purple,
      lesson_text:{fr:"Ne jamais s'attacher à sa première hypothèse sans la vérifier.",en:"Never fall in love with your first assumption without checking it.",es:"Nunca aferrarse a la primera hipótesis sin verificarla.",pt:"Nunca te apegares à primeira hipótese sem a verificar."} },
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {cases.map(c=>(
        <div key={c.id} style={{background:`${c.color}0d`,border:`1.5px solid ${c.color}33`,borderRadius:14,overflow:"hidden"}}>
          <div onClick={()=>setOpen(open===c.id?null:c.id)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:26,height:26,borderRadius:8,background:`${c.color}22`,border:`1px solid ${c.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:c.color,flexShrink:0}}>{c.lesson}</div>
            <div style={{flex:1,fontSize:12,fontWeight:700,color:c.color}}>{c.name}</div>
            <span style={{fontSize:12,color:C.muted}}>{open===c.id?"▲":"▼"}</span>
          </div>
          {open===c.id&&<div style={{padding:"0 14px 12px",fontSize:12,color:C.white,lineHeight:1.6,fontStyle:"italic"}}>{c.lesson_text[lang]||c.lesson_text.fr}</div>}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — PATTERN RECOGNITION
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [selfEval, setSelfEval] = useState("");
  const [showC, setShowC] = useState(false);
  const correct = {q1:"c",q2:"a",q3:"b",q4:"a"};
  const qs = {
    fr:[
      {id:"q1",q:"Deux navires supposent chacun une trajectoire de l'autre sans jamais la confirmer, jusqu'à la collision. À quel cas du module cela ressemble-t-il le plus ?\na) Baltic Ace\nb) USS John S. McCain\nc) Ever Smart / Alexandra 1"},
      {id:"q2",q:"Quel principe de quelle leçon s'applique directement à cette situation ?\na) L5 — ne jamais s'attacher à une hypothèse sans la vérifier\nb) L4 — l'alarme générale doit alerter tout le navire\nc) L2 — l'Authority Gradient"},
      {id:"q3",q:"Quelle action aurait le plus changé l'issue ?\na) Réduire la vitesse dix minutes plus tôt\nb) Un contact VHF direct et précoce entre les deux passerelles\nc) Fermer les portes étanches"},
      {id:"q4",q:"Quel schéma commun aux 5 cas du module cette situation illustre-t-elle le mieux ?\na) L'hypothèse non vérifiée\nb) La pression temporelle uniquement\nc) La perte de cargaison"},
    ],
    en:[
      {id:"q1",q:"Two vessels each assume the other's trajectory without ever confirming it, until they collide. Which case from the module does this most resemble?\na) Baltic Ace\nb) USS John S. McCain\nc) Ever Smart / Alexandra 1"},
      {id:"q2",q:"Which principle from which lesson applies directly to this situation?\na) L5 — never fall in love with an assumption without checking it\nb) L4 — the general alarm must alert the whole vessel\nc) L2 — the Authority Gradient"},
      {id:"q3",q:"Which action would have changed the outcome the most?\na) Reducing speed ten minutes earlier\nb) An early, direct VHF contact between the two bridges\nc) Closing watertight doors"},
      {id:"q4",q:"Which pattern common to the module's 5 cases does this situation best illustrate?\na) The unverified assumption\nb) Time pressure alone\nc) Cargo loss"},
    ],
    es:[
      {id:"q1",q:"Dos buques suponen cada uno la trayectoria del otro sin confirmarla nunca, hasta colisionar. ¿A qué caso del módulo se parece más?\na) Baltic Ace\nb) USS John S. McCain\nc) Ever Smart / Alexandra 1"},
      {id:"q2",q:"¿Qué principio de qué lección se aplica directamente a esta situación?\na) L5 — nunca aferrarse a una hipótesis sin verificarla\nb) L4 — la alarma general debe alertar a todo el buque\nc) L2 — el Authority Gradient"},
      {id:"q3",q:"¿Qué acción habría cambiado más el resultado?\na) Reducir la velocidad diez minutos antes\nb) Un contacto VHF directo y temprano entre los dos puentes\nc) Cerrar las puertas estancas"},
      {id:"q4",q:"¿Qué patrón común a los 5 casos del módulo ilustra mejor esta situación?\na) La hipótesis no verificada\nb) Solo la presión temporal\nc) La pérdida de carga"},
    ],
    pt:[
      {id:"q1",q:"Dois navios supõem cada um a trajetória do outro sem nunca a confirmar, até colidirem. A que caso do módulo isto mais se assemelha?\na) Baltic Ace\nb) USS John S. McCain\nc) Ever Smart / Alexandra 1"},
      {id:"q2",q:"Que princípio de que lição se aplica diretamente a esta situação?\na) L5 — nunca te apegares a uma hipótese sem a verificar\nb) L4 — o alarme geral deve alertar todo o navio\nc) L2 — o Authority Gradient"},
      {id:"q3",q:"Que ação teria mudado mais o resultado?\na) Reduzir a velocidade dez minutos antes\nb) Um contacto VHF direto e precoce entre as duas pontes\nc) Fechar as portas estanques"},
      {id:"q4",q:"Que padrão comum aos 5 casos do módulo esta situação melhor ilustra?\na) A hipótese não verificada\nb) Só a pressão temporal\nc) A perda de carga"},
    ],
  };
  const list = qs[lang]||qs.fr;
  const chk = (id,val) => val.trim().toLowerCase()===correct[id];
  const selfQ = {
    fr:"Quelle leçon de ce module appliques-tu déjà naturellement, et laquelle dois-tu encore améliorer ?",
    en:"Which lesson from this module do you already apply naturally, and which one do you still need to improve?",
    es:"¿Qué lección de este módulo ya aplicas de forma natural, y cuál todavía necesitas mejorar?",
    pt:"Que lição deste módulo já aplicas naturalmente, e qual ainda precisas de melhorar?",
  };
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
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.6,marginBottom:14}}>
        {lang==="fr"?"✅ Q1: c · Q2: a · Q3: b · Q4: a — cette situation reproduit exactement le schéma d'Ever Smart/Alexandra 1 : deux hypothèses jamais confirmées, un contact direct qui aurait tout changé.":
         lang==="en"?"✅ Q1: c · Q2: a · Q3: b · Q4: a — this situation exactly reproduces the Ever Smart/Alexandra 1 pattern: two never-confirmed assumptions, a direct contact that would have changed everything.":
         "✅ Q1: c · Q2: a · Q3: b · Q4: a"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif",marginBottom:16}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
      <div style={{padding:"14px",borderRadius:14,background:"rgba(142,68,173,0.08)",border:`1px solid ${C.purple}33`}}>
        <div style={{fontSize:11,color:C.purple,fontWeight:700,marginBottom:8,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"🪞 AUTO-ÉVALUATION":lang==="en"?"🪞 SELF-ASSESSMENT":lang==="es"?"🪞 AUTOEVALUACIÓN":"🪞 AUTOAVALIAÇÃO"}</div>
        <div style={{fontSize:12,color:C.white,marginBottom:8,lineHeight:1.6}}>{selfQ[lang]||selfQ.fr}</div>
        <textarea value={selfEval} onChange={e=>setSelfEval(e.target.value)} rows={3}
          placeholder={lang==="fr"?"Écris librement ta réponse...":lang==="en"?"Write your answer freely...":lang==="es"?"Escribe tu respuesta libremente...":"Escreve a tua resposta livremente..."}
          style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${C.border}`,color:C.white,fontSize:13,fontFamily:"'Nunito',sans-serif",boxSizing:"border-box",resize:"vertical"}}/>
        <div style={{fontSize:10,color:C.muted,marginTop:6}}>{lang==="fr"?"Pas de bonne réponse — c'est une réflexion personnelle.":lang==="en"?"No right answer — this is a personal reflection.":lang==="es"?"No hay respuesta correcta — es una reflexión personal.":"Não há resposta certa — é uma reflexão pessoal."}</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// BANK — 15 QUESTIONS (transversal synthesis, min. 5 scenario-based)
// ══════════════════════════════════════
const BANK = {
  fr:[
    {q:"Quel facteur relie Andrea Doria (L1) et Ever Smart/Alexandra 1 (L5) malgré 60 ans d'écart ?",opts:["La météo","Une hypothèse non vérifiée par les deux passerelles","La taille des navires","La cargaison transportée"],correct:1,expl:"Dans les deux cas, chaque passerelle a agi selon sa propre interprétation sans la confirmer directement avec l'autre navire."},
    {q:"Qu'ont en commun USS John S. McCain (L2) et Ever Smart/Alexandra 1 (L5) ?",opts:["Une panne totale d'électricité","Une perte de conscience partagée de la situation au sein de l'équipe ou entre les deux navires","Un incendie à bord","Un problème de cargaison"],correct:1,expl:"Les deux cas montrent une rupture de la conscience situationnelle — collective dans un cas, entre deux passerelles dans l'autre."},
    {q:"Quelle est la fenêtre de décision la plus courte parmi les 5 cas du module ?",opts:["Baltic Ace, environ 15 minutes","Sanchi, environ 1 minute","Ever Smart, 3 secondes pour l'ordre décisif","Andrea Doria, plusieurs heures"],correct:2,expl:"L'ordre 'hard to starboard' de l'Ever Smart n'est arrivé que 3 secondes avant l'impact — la fenêtre la plus courte du module."},
    {q:"Pourquoi le nom des navires change mais les causes profondes se répètent-elles selon cette leçon ?",opts:["Parce que les navires sont tous construits de la même façon","Parce que le facteur humain (fixation, communication, décision tardive) reste la constante derrière des contextes très différents","Parce que les règles COLREG changent souvent","Parce que la météo est toujours en cause"],correct:1,expl:"C'est la thèse centrale de L6 : les circonstances varient, mais les schémas humains qui mènent à l'accident se répètent."},
    {q:"Vous observez qu'un collègue persiste sur une hypothèse malgré des signaux contraires. À quel principe cela renvoie-t-il ?",opts:["L1 — automation bias uniquement","L5 — ne jamais s'attacher à sa première hypothèse sans la vérifier","L4 — contenir les dégâts avant de les combattre","L3 — réduire l'énergie de l'impact"],correct:1,expl:"La fixation sur une hypothèse non vérifiée, vue en profondeur en L5, est directement applicable à cette observation."},
    {q:"Un navire s'approche du vôtre sans réponse à vos appels VHF. Quel réflexe des leçons précédentes s'applique ?",opts:["Attendre passivement une réponse indéfiniment","Escalader vers une communication plus directe/insistante et se préparer à agir seul si besoin","Ignorer la situation","Changer immédiatement de route sans vérifier"],correct:1,expl:"Ce réflexe combine le Challenge & Response de L2 et la vérification active des hypothèses de L5."},
    {q:"Quelle évolution de culture sécurité est mentionnée après ces accidents, du point de vue Safety uniquement ?",opts:["Aucune évolution n'a eu lieu","Un renforcement des pratiques de vérification croisée et de communication directe entre passerelles","Une augmentation de la vitesse autorisée","Une réduction des équipages"],correct:1,expl:"Sans entrer dans l'angle juridique (Maritime Law), l'angle sécurité retient le renforcement des pratiques de vérification et de communication."},
    {q:"Quel est le point commun entre Sanchi (L3) et Baltic Ace (L4) ?",opts:["Les deux navires ont coulé instantanément","Une pression temporelle extrême qui a réduit la marge d'action utile","Un problème de cargaison identique","Une même route maritime"],correct:1,expl:"Sanchi (manœuvre décisive à 1 minute) et Baltic Ace (naufrage en 15 minutes) illustrent tous deux une pression temporelle extrême, à des échelles différentes."},
    {q:"Que signifie 'The Professional Safety Mindset' évoqué dans cette leçon ?",opts:["Un nouveau concept technique à apprendre","Un état d'esprit qui résume les réflexes de tout le module : vigilance, vérification, communication, écoute, apprentissage continu","Une certification STCW spécifique","Une procédure d'urgence supplémentaire"],correct:1,expl:"Ce n'est pas une nouvelle notion mais une synthèse d'attitude professionnelle intégrant tout ce qui a été appris en L1-L5."},
    {q:"Pourquoi L6 ne présente-t-elle pas de nouveau cas réel ?",opts:["Par manque de cas disponibles","Parce que l'objectif est de consolider les 5 cas déjà étudiés plutôt que de disperser l'attention sur un nouveau drame","Parce que les cas récents ne sont pas documentés","Parce que le format ne le permet pas"],correct:1,expl:"L6 est une leçon de synthèse — introduire un nouveau cas détournerait l'attention de la consolidation des acquis."},
    {q:"Face à une situation inédite en mer, quelle est la première question à se poser selon L6 ?",opts:["Quel est le prix du carburant ?","À quel schéma déjà rencontré cette situation ressemble-t-elle, et quel principe s'applique ?","Qui est responsable légalement ?","Quelle heure est-il ?"],correct:1,expl:"L'objectif de L6 est d'entraîner la reconnaissance de schémas familiers pour appliquer rapidement le bon principe."},
    {q:"Quel facteur du tableau croisé (L6) est présent dans le plus grand nombre de cas du module ?",opts:["La cargaison dangereuse","La décision tardive, présente dans Sanchi, Baltic Ace et Ever Smart","La météo extrême","La taille des navires"],correct:1,expl:"La décision tardive apparaît dans trois des cinq cas étudiés, en faisant le schéma le plus récurrent du module."},
    {q:"Quel est l'objectif de l'auto-évaluation proposée en fin de module ?",opts:["Remplir une formalité administrative","Permettre à chaque marin d'identifier ses propres points forts et axes d'amélioration face aux schémas identifiés","Comparer les marins entre eux","Remplacer l'évaluation STCW officielle"],correct:1,expl:"L'auto-évaluation est un outil personnel de progression, pas un outil de comparaison ou de certification."},
    {q:"Que retenir du fait que les 5 cas du module concernent des types de navires très différents (paquebot, destroyer, pétrolier, transporteur de véhicules, porte-conteneurs) ?",opts:["Le type de navire est le facteur principal des accidents","Les schémas humains identifiés dépassent le type de navire et concernent tout marin, quel que soit son secteur","Seuls les gros navires sont concernés","Les petits navires sont plus sûrs"],correct:1,expl:"La diversité des types de navires renforce le message central : ce sont les comportements humains, pas le type de navire, qui déterminent le risque."},
    {q:"Quel est l'objectif principal de la leçon L6 dans le Safety Department ?",opts:["Étudier un nouveau cas réel de collision","Transformer les 5 études de cas précédentes en une culture de sécurité applicable, et clôturer le module","Réexpliquer les règles COLREG","Introduire la théorie complète du GMDSS"],correct:1,expl:"L6 est la synthèse finale du module s1, conçue pour consolider les acquis de L1-L5 en réflexes durables, pas pour enseigner un nouveau contenu."},
  ],
  en:[
    {q:"What factor connects Andrea Doria (L1) and Ever Smart/Alexandra 1 (L5) despite 60 years apart?",opts:["The weather","An assumption never verified by both bridges","Vessel size","The cargo carried"],correct:1,expl:"In both cases, each bridge acted on its own interpretation without confirming it directly with the other vessel."},
    {q:"What do USS John S. McCain (L2) and Ever Smart/Alexandra 1 (L5) have in common?",opts:["A total power failure","A loss of shared situational awareness within the team or between the two vessels","An onboard fire","A cargo problem"],correct:1,expl:"Both cases show a breakdown of situational awareness — collective in one case, between two bridges in the other."},
    {q:"Which is the shortest decision window among the module's 5 cases?",opts:["Baltic Ace, about 15 minutes","Sanchi, about 1 minute","Ever Smart, 3 seconds for the decisive order","Andrea Doria, several hours"],correct:2,expl:"Ever Smart's 'hard to starboard' order came only 3 seconds before impact — the shortest window in the module."},
    {q:"Why do vessel names change but the underlying causes repeat, according to this lesson?",opts:["Because all vessels are built the same way","Because the human factor (fixation, communication, late decision) remains the constant behind very different contexts","Because COLREG rules change often","Because weather is always to blame"],correct:1,expl:"This is L6's central thesis: circumstances vary, but the human patterns leading to accidents recur."},
    {q:"You notice a colleague persisting with an assumption despite contrary signals. Which principle does this relate to?",opts:["L1 — automation bias only","L5 — never fall in love with your first assumption without checking it","L4 — contain the damage before fighting it","L3 — reduce impact energy"],correct:1,expl:"Fixation on an unverified assumption, covered in depth in L5, directly applies to this observation."},
    {q:"A vessel approaches yours without responding to your VHF calls. Which reflex from previous lessons applies?",opts:["Wait passively for a response indefinitely","Escalate to more direct/insistent communication and prepare to act alone if needed","Ignore the situation","Immediately change course without checking"],correct:1,expl:"This reflex combines L2's Challenge & Response and L5's active verification of assumptions."},
    {q:"What safety-culture evolution is mentioned after these accidents, from a Safety-only perspective?",opts:["No evolution occurred","Strengthened cross-verification and direct bridge-to-bridge communication practices","Increased authorized speed","Reduced crew sizes"],correct:1,expl:"Without entering the legal angle (Maritime Law), the safety angle retains strengthened verification and communication practices."},
    {q:"What is common between Sanchi (L3) and Baltic Ace (L4)?",opts:["Both vessels sank instantly","Extreme time pressure that reduced the useful margin for action","An identical cargo problem","The same shipping route"],correct:1,expl:"Sanchi (decisive maneuver at 1 minute) and Baltic Ace (sinking in 15 minutes) both illustrate extreme time pressure, at different scales."},
    {q:"What does 'The Professional Safety Mindset' mentioned in this lesson mean?",opts:["A new technical concept to learn","A mindset summarizing the module's reflexes: vigilance, verification, communication, listening, continuous learning","A specific STCW certification","An additional emergency procedure"],correct:1,expl:"This is not a new concept but a synthesis of professional attitude integrating everything learned in L1-L5."},
    {q:"Why doesn't L6 present a new real case?",opts:["Due to a lack of available cases","Because the goal is to consolidate the 5 already-studied cases rather than scatter attention on a new tragedy","Because recent cases aren't documented","Because the format doesn't allow it"],correct:1,expl:"L6 is a synthesis lesson — introducing a new case would divert attention from consolidating what was learned."},
    {q:"Facing an unfamiliar situation at sea, what is the first question to ask according to L6?",opts:["What is the price of fuel?","Which already-encountered pattern does this situation resemble, and which principle applies?","Who is legally responsible?","What time is it?"],correct:1,expl:"L6's goal is to train the recognition of familiar patterns to quickly apply the right principle."},
    {q:"Which factor from the L6 cross matrix appears in the most cases of the module?",opts:["Dangerous cargo","Late decision, present in Sanchi, Baltic Ace and Ever Smart","Extreme weather","Vessel size"],correct:1,expl:"Late decision appears in three of the five cases studied, making it the module's most recurring pattern."},
    {q:"What is the purpose of the self-assessment proposed at the end of the module?",opts:["Fulfilling an administrative formality","Allowing each sailor to identify their own strengths and areas to improve regarding the identified patterns","Comparing sailors against each other","Replacing official STCW assessment"],correct:1,expl:"Self-assessment is a personal progress tool, not a comparison or certification tool."},
    {q:"What should be retained from the fact that the module's 5 cases involve very different vessel types (liner, destroyer, tanker, car carrier, container ship)?",opts:["Vessel type is the main factor in accidents","The identified human patterns go beyond vessel type and concern any sailor, regardless of sector","Only large vessels are concerned","Small vessels are safer"],correct:1,expl:"The diversity of vessel types reinforces the central message: it is human behavior, not vessel type, that determines risk."},
    {q:"What is the main goal of lesson L6 in the Safety Department?",opts:["Study a new real collision case","Turn the 5 previous case studies into an applicable safety culture, and close the module","Re-explain COLREG rules","Introduce the full GMDSS theory"],correct:1,expl:"L6 is the final synthesis of module s1, designed to consolidate L1-L5 learning into lasting reflexes, not to teach new content."},
  ],
  es:[
    {q:"¿Qué factor conecta a Andrea Doria (L1) y Ever Smart/Alexandra 1 (L5) pese a 60 años de diferencia?",opts:["El tiempo meteorológico","Una hipótesis nunca verificada por ambos puentes","El tamaño del buque","La carga transportada"],correct:1,expl:"En ambos casos, cada puente actuó según su propia interpretación sin confirmarla directamente con el otro buque."},
    {q:"¿Qué tienen en común USS John S. McCain (L2) y Ever Smart/Alexandra 1 (L5)?",opts:["Un fallo total de energía","Una pérdida de conciencia situacional compartida dentro del equipo o entre los dos buques","Un incendio a bordo","Un problema de carga"],correct:1,expl:"Ambos casos muestran una ruptura de la conciencia situacional — colectiva en un caso, entre dos puentes en el otro."},
    {q:"¿Cuál es la ventana de decisión más corta entre los 5 casos del módulo?",opts:["Baltic Ace, unos 15 minutos","Sanchi, aproximadamente 1 minuto","Ever Smart, 3 segundos para la orden decisiva","Andrea Doria, varias horas"],correct:2,expl:"La orden 'hard to starboard' del Ever Smart llegó solo 3 segundos antes del impacto — la ventana más corta del módulo."},
    {q:"¿Por qué cambian los nombres de los buques pero se repiten las causas profundas, según esta lección?",opts:["Porque todos los buques se construyen igual","Porque el factor humano (fijación, comunicación, decisión tardía) sigue siendo la constante detrás de contextos muy diferentes","Porque las reglas COLREG cambian a menudo","Porque el tiempo siempre tiene la culpa"],correct:1,expl:"Esta es la tesis central de L6: las circunstancias varían, pero los patrones humanos que llevan al accidente se repiten."},
    {q:"Observas que un colega persiste en una hipótesis pese a señales contrarias. ¿A qué principio remite esto?",opts:["L1 — solo sesgo de automatización","L5 — nunca aferrarse a la primera hipótesis sin verificarla","L4 — contener el daño antes de combatirlo","L3 — reducir la energía del impacto"],correct:1,expl:"La fijación en una hipótesis no verificada, vista en profundidad en L5, se aplica directamente a esta observación."},
    {q:"Un buque se acerca al tuyo sin responder a tus llamadas VHF. ¿Qué reflejo de lecciones anteriores se aplica?",opts:["Esperar pasivamente una respuesta indefinidamente","Escalar hacia una comunicación más directa/insistente y prepararse para actuar solo si es necesario","Ignorar la situación","Cambiar de rumbo inmediatamente sin verificar"],correct:1,expl:"Este reflejo combina el Challenge & Response de L2 y la verificación activa de hipótesis de L5."},
    {q:"¿Qué evolución de la cultura de seguridad se menciona tras estos accidentes, desde una perspectiva solo de Safety?",opts:["No hubo ninguna evolución","Un refuerzo de las prácticas de verificación cruzada y comunicación directa entre puentes","Un aumento de la velocidad autorizada","Una reducción de las tripulaciones"],correct:1,expl:"Sin entrar en el ángulo legal (Maritime Law), el ángulo de seguridad retiene el refuerzo de las prácticas de verificación y comunicación."},
    {q:"¿Qué tienen en común Sanchi (L3) y Baltic Ace (L4)?",opts:["Ambos buques se hundieron instantáneamente","Una presión temporal extrema que redujo el margen útil de acción","Un problema de carga idéntico","La misma ruta marítima"],correct:1,expl:"Sanchi (maniobra decisiva a 1 minuto) y Baltic Ace (hundimiento en 15 minutos) ilustran ambos una presión temporal extrema, a escalas diferentes."},
    {q:"¿Qué significa 'The Professional Safety Mindset' mencionado en esta lección?",opts:["Un nuevo concepto técnico que aprender","Una mentalidad que resume los reflejos de todo el módulo: vigilancia, verificación, comunicación, escucha, aprendizaje continuo","Una certificación STCW específica","Un procedimiento de emergencia adicional"],correct:1,expl:"No es un concepto nuevo sino una síntesis de actitud profesional que integra todo lo aprendido en L1-L5."},
    {q:"¿Por qué L6 no presenta un nuevo caso real?",opts:["Por falta de casos disponibles","Porque el objetivo es consolidar los 5 casos ya estudiados en lugar de dispersar la atención en una nueva tragedia","Porque los casos recientes no están documentados","Porque el formato no lo permite"],correct:1,expl:"L6 es una lección de síntesis — introducir un nuevo caso desviaría la atención de la consolidación de lo aprendido."},
    {q:"Ante una situación desconocida en el mar, ¿cuál es la primera pregunta a hacerse según L6?",opts:["¿Cuál es el precio del combustible?","¿A qué patrón ya conocido se parece esta situación, y qué principio se aplica?","¿Quién es responsable legalmente?","¿Qué hora es?"],correct:1,expl:"El objetivo de L6 es entrenar el reconocimiento de patrones familiares para aplicar rápidamente el principio correcto."},
    {q:"¿Qué factor de la matriz cruzada (L6) está presente en más casos del módulo?",opts:["La carga peligrosa","La decisión tardía, presente en Sanchi, Baltic Ace y Ever Smart","El tiempo extremo","El tamaño del buque"],correct:1,expl:"La decisión tardía aparece en tres de los cinco casos estudiados, siendo el patrón más recurrente del módulo."},
    {q:"¿Cuál es el objetivo de la autoevaluación propuesta al final del módulo?",opts:["Cumplir una formalidad administrativa","Permitir que cada marino identifique sus propios puntos fuertes y áreas de mejora frente a los patrones identificados","Comparar a los marinos entre sí","Sustituir la evaluación STCW oficial"],correct:1,expl:"La autoevaluación es una herramienta personal de progreso, no una herramienta de comparación o certificación."},
    {q:"¿Qué se debe retener del hecho de que los 5 casos del módulo involucran tipos de buques muy diferentes (transatlántico, destructor, petrolero, transportador de vehículos, portacontenedores)?",opts:["El tipo de buque es el factor principal de los accidentes","Los patrones humanos identificados van más allá del tipo de buque y conciernen a cualquier marino, sea cual sea su sector","Solo los buques grandes están implicados","Los buques pequeños son más seguros"],correct:1,expl:"La diversidad de tipos de buques refuerza el mensaje central: es el comportamiento humano, no el tipo de buque, lo que determina el riesgo."},
    {q:"¿Cuál es el objetivo principal de la lección L6 en el Safety Department?",opts:["Estudiar un nuevo caso real de colisión","Transformar los 5 estudios de caso anteriores en una cultura de seguridad aplicable, y cerrar el módulo","Reexplicar las reglas COLREG","Introducir la teoría completa del GMDSS"],correct:1,expl:"L6 es la síntesis final del módulo s1, diseñada para consolidar el aprendizaje de L1-L5 en reflejos duraderos, no para enseñar contenido nuevo."},
  ],
  pt:[
    {q:"Que fator liga o Andrea Doria (L1) e o Ever Smart/Alexandra 1 (L5) apesar de 60 anos de diferença?",opts:["O tempo meteorológico","Uma hipótese nunca verificada por ambas as pontes","O tamanho do navio","A carga transportada"],correct:1,expl:"Em ambos os casos, cada ponte agiu segundo a sua própria interpretação sem a confirmar diretamente com o outro navio."},
    {q:"O que têm em comum o USS John S. McCain (L2) e o Ever Smart/Alexandra 1 (L5)?",opts:["Uma falha total de energia","Uma perda de consciência situacional partilhada dentro da equipa ou entre os dois navios","Um incêndio a bordo","Um problema de carga"],correct:1,expl:"Ambos os casos mostram uma quebra da consciência situacional — coletiva num caso, entre duas pontes no outro."},
    {q:"Qual é a janela de decisão mais curta entre os 5 casos do módulo?",opts:["Baltic Ace, cerca de 15 minutos","Sanchi, cerca de 1 minuto","Ever Smart, 3 segundos para a ordem decisiva","Andrea Doria, várias horas"],correct:2,expl:"A ordem 'hard to starboard' do Ever Smart só chegou 3 segundos antes do impacto — a janela mais curta do módulo."},
    {q:"Por que os nomes dos navios mudam mas as causas profundas se repetem, segundo esta lição?",opts:["Porque todos os navios são construídos da mesma forma","Porque o fator humano (fixação, comunicação, decisão tardia) continua a ser a constante por trás de contextos muito diferentes","Porque as regras COLREG mudam frequentemente","Porque o tempo é sempre o culpado"],correct:1,expl:"Esta é a tese central de L6: as circunstâncias variam, mas os padrões humanos que levam ao acidente repetem-se."},
    {q:"Reparas que um colega persiste numa hipótese apesar de sinais contrários. A que princípio isto remete?",opts:["L1 — só viés de automação","L5 — nunca te apegares à primeira hipótese sem a verificar","L4 — conter o dano antes de o combater","L3 — reduzir a energia do impacto"],correct:1,expl:"A fixação numa hipótese não verificada, vista em profundidade em L5, aplica-se diretamente a esta observação."},
    {q:"Um navio aproxima-se do teu sem responder às tuas chamadas VHF. Que reflexo de lições anteriores se aplica?",opts:["Esperar passivamente por uma resposta indefinidamente","Escalar para uma comunicação mais direta/insistente e preparar-se para agir sozinho se necessário","Ignorar a situação","Mudar de rumo imediatamente sem verificar"],correct:1,expl:"Este reflexo combina o Challenge & Response de L2 e a verificação ativa de hipóteses de L5."},
    {q:"Que evolução de cultura de segurança é mencionada após estes acidentes, numa perspetiva apenas de Safety?",opts:["Não houve evolução nenhuma","Um reforço das práticas de verificação cruzada e comunicação direta entre pontes","Um aumento da velocidade autorizada","Uma redução das tripulações"],correct:1,expl:"Sem entrar no ângulo legal (Maritime Law), o ângulo de segurança retém o reforço das práticas de verificação e comunicação."},
    {q:"O que têm em comum o Sanchi (L3) e o Baltic Ace (L4)?",opts:["Ambos os navios afundaram instantaneamente","Uma pressão temporal extrema que reduziu a margem útil de ação","Um problema de carga idêntico","A mesma rota marítima"],correct:1,expl:"O Sanchi (manobra decisiva a 1 minuto) e o Baltic Ace (afundamento em 15 minutos) ilustram ambos uma pressão temporal extrema, em escalas diferentes."},
    {q:"O que significa 'The Professional Safety Mindset' mencionado nesta lição?",opts:["Um novo conceito técnico a aprender","Uma mentalidade que resume os reflexos de todo o módulo: vigilância, verificação, comunicação, escuta, aprendizagem contínua","Uma certificação STCW específica","Um procedimento de emergência adicional"],correct:1,expl:"Não é um conceito novo mas uma síntese de atitude profissional que integra tudo o que foi aprendido em L1-L5."},
    {q:"Por que L6 não apresenta um novo caso real?",opts:["Por falta de casos disponíveis","Porque o objetivo é consolidar os 5 casos já estudados em vez de dispersar a atenção numa nova tragédia","Porque os casos recentes não estão documentados","Porque o formato não o permite"],correct:1,expl:"L6 é uma lição de síntese — introduzir um novo caso desviaria a atenção da consolidação do que foi aprendido."},
    {q:"Perante uma situação desconhecida no mar, qual é a primeira pergunta a fazer segundo L6?",opts:["Qual é o preço do combustível?","A que padrão já encontrado esta situação se assemelha, e que princípio se aplica?","Quem é responsável legalmente?","Que horas são?"],correct:1,expl:"O objetivo de L6 é treinar o reconhecimento de padrões familiares para aplicar rapidamente o princípio certo."},
    {q:"Que fator da matriz cruzada (L6) está presente no maior número de casos do módulo?",opts:["A carga perigosa","A decisão tardia, presente no Sanchi, Baltic Ace e Ever Smart","O tempo extremo","O tamanho do navio"],correct:1,expl:"A decisão tardia aparece em três dos cinco casos estudados, tornando-se o padrão mais recorrente do módulo."},
    {q:"Qual é o objetivo da autoavaliação proposta no final do módulo?",opts:["Cumprir uma formalidade administrativa","Permitir que cada marítimo identifique os seus próprios pontos fortes e áreas de melhoria face aos padrões identificados","Comparar os marítimos entre si","Substituir a avaliação STCW oficial"],correct:1,expl:"A autoavaliação é uma ferramenta pessoal de progresso, não uma ferramenta de comparação ou certificação."},
    {q:"O que se deve reter do facto de os 5 casos do módulo envolverem tipos de navios muito diferentes (transatlântico, destroyer, petroleiro, transportador de veículos, porta-contentores)?",opts:["O tipo de navio é o fator principal dos acidentes","Os padrões humanos identificados vão além do tipo de navio e dizem respeito a qualquer marítimo, seja qual for o seu setor","Só os navios grandes estão envolvidos","Os navios pequenos são mais seguros"],correct:1,expl:"A diversidade de tipos de navios reforça a mensagem central: é o comportamento humano, não o tipo de navio, que determina o risco."},
    {q:"Qual é o objetivo principal da lição L6 no Safety Department?",opts:["Estudar um novo caso real de colisão","Transformar os 5 estudos de caso anteriores numa cultura de segurança aplicável, e encerrar o módulo","Reexplicar as regras COLREG","Introduzir a teoria completa do GMDSS"],correct:1,expl:"L6 é a síntese final do módulo s1, concebida para consolidar a aprendizagem de L1-L5 em reflexos duradouros, não para ensinar conteúdo novo."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);if(onComplete)onComplete();}};
  if(done) return <div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48,marginBottom:8}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.red},${C.gold2})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.red},${C.blue})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ — FINAL (5 QUESTIONS, transversal)
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Quel schéma relie Andrea Doria et Ever Smart/Alexandra 1 malgré 60 ans d'écart ?",opts:["La météo","Une hypothèse jamais vérifiée directement entre les deux passerelles","La taille des navires","Le type de cargaison"],correct:1,expl:"Les deux cas montrent des passerelles agissant sur leur propre interprétation sans confirmation directe."},
    {q:"Quelle est la fenêtre de décision la plus courte parmi les 5 cas du module ?",opts:["Andrea Doria","Ever Smart, 3 secondes","Baltic Ace, 15 minutes","Sanchi, 1 minute"],correct:1,expl:"L'ordre décisif de l'Ever Smart est arrivé seulement 3 secondes avant l'impact — la fenêtre la plus courte du module."},
    {q:"Pourquoi les causes profondes des collisions se répètent-elles malgré des navires très différents ?",opts:["Parce que le facteur humain reste la constante derrière des contextes variés","Parce que tous les navires sont identiques","Parce que la météo est toujours en cause","Parce que les règles changent constamment"],correct:0,expl:"C'est la thèse centrale de L6 : les circonstances varient, les schémas humains se répètent."},
    {q:"Pourquoi L6 ne présente-t-elle aucun nouveau cas réel ?",opts:["Parce qu'il n'y a pas d'autres cas disponibles","Parce que l'objectif est de consolider les 5 cas déjà étudiés plutôt que d'en ajouter un nouveau","Parce que les nouveaux cas ne sont pas assez documentés","Parce que le format ne le permet pas"],correct:1,expl:"L6 est une leçon de synthèse et de consolidation, pas une nouvelle leçon de contenu."},
    {q:"Que résume 'The Professional Safety Mindset' ?",opts:["Un nouveau protocole d'urgence","Un état d'esprit intégrant vigilance, vérification, communication, écoute et apprentissage continu","Une certification supplémentaire","Une procédure de manœuvre"],correct:1,expl:"Ce n'est pas un nouveau concept mais la synthèse d'attitude professionnelle de tout le module."},
  ],
  en:[
    {q:"Which pattern connects Andrea Doria and Ever Smart/Alexandra 1 despite 60 years apart?",opts:["The weather","An assumption never directly verified between the two bridges","Vessel size","Cargo type"],correct:1,expl:"Both cases show bridges acting on their own interpretation without direct confirmation."},
    {q:"Which is the shortest decision window among the module's 5 cases?",opts:["Andrea Doria","Ever Smart, 3 seconds","Baltic Ace, 15 minutes","Sanchi, 1 minute"],correct:1,expl:"Ever Smart's decisive order came only 3 seconds before impact — the shortest window in the module."},
    {q:"Why do the underlying causes of collisions repeat despite very different vessels?",opts:["Because the human factor remains constant across varied contexts","Because all vessels are identical","Because weather is always to blame","Because rules constantly change"],correct:0,expl:"This is L6's central thesis: circumstances vary, human patterns repeat."},
    {q:"Why does L6 present no new real case?",opts:["Because no other cases are available","Because the goal is to consolidate the 5 already-studied cases rather than add a new one","Because new cases aren't documented enough","Because the format doesn't allow it"],correct:1,expl:"L6 is a synthesis and consolidation lesson, not a new content lesson."},
    {q:"What does 'The Professional Safety Mindset' summarize?",opts:["A new emergency protocol","A mindset integrating vigilance, verification, communication, listening, and continuous learning","An additional certification","A maneuvering procedure"],correct:1,expl:"This is not a new concept but the synthesis of professional attitude across the whole module."},
  ],
  es:[
    {q:"¿Qué patrón conecta a Andrea Doria y Ever Smart/Alexandra 1 pese a 60 años de diferencia?",opts:["El tiempo","Una hipótesis nunca verificada directamente entre los dos puentes","El tamaño del buque","El tipo de carga"],correct:1,expl:"Ambos casos muestran puentes actuando según su propia interpretación sin confirmación directa."},
    {q:"¿Cuál es la ventana de decisión más corta entre los 5 casos del módulo?",opts:["Andrea Doria","Ever Smart, 3 segundos","Baltic Ace, 15 minutos","Sanchi, 1 minuto"],correct:1,expl:"La orden decisiva del Ever Smart llegó solo 3 segundos antes del impacto — la ventana más corta del módulo."},
    {q:"¿Por qué las causas profundas de las colisiones se repiten pese a buques muy diferentes?",opts:["Porque el factor humano sigue siendo constante en contextos variados","Porque todos los buques son idénticos","Porque el tiempo siempre tiene la culpa","Porque las reglas cambian constantemente"],correct:0,expl:"Esta es la tesis central de L6: las circunstancias varían, los patrones humanos se repiten."},
    {q:"¿Por qué L6 no presenta ningún caso real nuevo?",opts:["Porque no hay más casos disponibles","Porque el objetivo es consolidar los 5 casos ya estudiados en lugar de añadir uno nuevo","Porque los nuevos casos no están suficientemente documentados","Porque el formato no lo permite"],correct:1,expl:"L6 es una lección de síntesis y consolidación, no una lección de contenido nuevo."},
    {q:"¿Qué resume 'The Professional Safety Mindset'?",opts:["Un nuevo protocolo de emergencia","Una mentalidad que integra vigilancia, verificación, comunicación, escucha y aprendizaje continuo","Una certificación adicional","Un procedimiento de maniobra"],correct:1,expl:"No es un concepto nuevo sino la síntesis de actitud profesional de todo el módulo."},
  ],
  pt:[
    {q:"Que padrão liga o Andrea Doria e o Ever Smart/Alexandra 1 apesar de 60 anos de diferença?",opts:["O tempo","Uma hipótese nunca verificada diretamente entre as duas pontes","O tamanho do navio","O tipo de carga"],correct:1,expl:"Ambos os casos mostram pontes a agir segundo a sua própria interpretação sem confirmação direta."},
    {q:"Qual é a janela de decisão mais curta entre os 5 casos do módulo?",opts:["Andrea Doria","Ever Smart, 3 segundos","Baltic Ace, 15 minutos","Sanchi, 1 minuto"],correct:1,expl:"A ordem decisiva do Ever Smart só chegou 3 segundos antes do impacto — a janela mais curta do módulo."},
    {q:"Por que as causas profundas das colisões se repetem apesar de navios muito diferentes?",opts:["Porque o fator humano continua constante em contextos variados","Porque todos os navios são idênticos","Porque o tempo é sempre o culpado","Porque as regras mudam constantemente"],correct:0,expl:"Esta é a tese central de L6: as circunstâncias variam, os padrões humanos repetem-se."},
    {q:"Por que L6 não apresenta nenhum caso real novo?",opts:["Porque não há mais casos disponíveis","Porque o objetivo é consolidar os 5 casos já estudados em vez de adicionar um novo","Porque os casos novos não estão suficientemente documentados","Porque o formato não o permite"],correct:1,expl:"L6 é uma lição de síntese e consolidação, não uma lição de conteúdo novo."},
    {q:"O que resume 'The Professional Safety Mindset'?",opts:["Um novo protocolo de emergência","Uma mentalidade que integra vigilância, verificação, comunicação, escuta e aprendizagem contínua","Uma certificação adicional","Um procedimento de manobra"],correct:1,expl:"Não é um conceito novo mas a síntese de atitude profissional de todo o módulo."},
  ],
};

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.red}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.red,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.red:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════
// SAFETY REFLECTION
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Parmi les schémas vus dans ce module (facteur humain, coordination, décision tardive, hypothèse non vérifiée, pression temporelle), lequel te semble le plus présent dans ta propre pratique aujourd'hui ?",
    en:"Among the patterns seen in this module (human factor, coordination, late decision, unverified assumption, time pressure), which one seems most present in your own practice today?",
    es:"Entre los patrones vistos en este módulo (factor humano, coordinación, decisión tardía, hipótesis no verificada, presión temporal), ¿cuál te parece más presente en tu propia práctica hoy?",
    pt:"Entre os padrões vistos neste módulo (fator humano, coordenação, decisão tardia, hipótese não verificada, pressão temporal), qual te parece mais presente na tua própria prática hoje?",
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
// SHARED UI
// ══════════════════════════════════════
function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Leçon 6/6 · ⭐ Premium · 🏁 FIN DU MODULE",
      title:"Lessons Learned from Maritime Collisions",
      intro:"Cette leçon n'introduit aucun nouveau concept de sécurité. Elle ne raconte aucun nouveau drame.\n\nElle rassemble les cinq cas déjà étudiés — Andrea Doria, USS John S. McCain, Sanchi/CF Crystal, Baltic Ace, Ever Smart/Alexandra 1 — pour révéler ce qu'ils ont en commun malgré des navires, des époques et des océans différents.\n\nLes noms changent. Les causes profondes se répètent.",
      p0:"POURQUOI ÉTUDIER LES LEÇONS DU PASSÉ",s0t:"Reconnaître un schéma avant qu'il ne se répète",
      s0:"La compétence finale de ce module n'est pas de connaître cinq histoires par cœur — c'est de reconnaître leurs schémas communs dans une situation nouvelle, avant qu'elle ne devienne un accident.\n\nCOMMENT PRÉVENIR L'ACCIDENT ? En reconnaissant tôt un schéma déjà rencontré.\nQUE FAIRE FACE À UNE SITUATION INÉDITE ? Se demander à quel cas connu elle ressemble et quel principe s'applique.\nQUELLE LEÇON RETENIR ? Les circonstances varient à l'infini ; les comportements humains qui mènent à l'accident, beaucoup moins.",
      p1:"LE FIL CONDUCTEUR DES 5 CAS DU MODULE",s1t:"Des navires très différents, des schémas qui se répètent",
      s1:"Paquebot, destroyer militaire, pétrolier, transporteur de véhicules, porte-conteneurs : cinq types de navires, cinq époques, cinq océans. Et pourtant, en les superposant, les mêmes schémas humains reviennent : facteur individuel, coordination d'équipe, décision tardive, hypothèse non vérifiée, pression temporelle.",
      p2:"RETOUR SUR LE FACTEUR HUMAIN INDIVIDUEL",s2t:"Le lien avec L1",
      s2:"L'automation bias d'Andrea Doria et la fixation sur une hypothèse d'Ever Smart/Alexandra 1 partagent la même racine : la confiance excessive dans une seule source d'information, sans vérification croisée.",
      p3:"RETOUR SUR LA COORDINATION D'ÉQUIPE",s3t:"Le lien avec L2",
      s3:"USS John S. McCain a montré qu'une équipe entière peut perdre la conscience partagée de la situation. Ever Smart/Alexandra 1 montre la même perte, mais entre deux navires plutôt qu'au sein d'une seule équipe.",
      p4:"RETOUR SUR LE TEMPS ET LA DÉCISION",s4t:"Le lien avec L3, L4 et L5",
      s4:"De Sanchi (manœuvre décisive à 1 minute) à Baltic Ace (naufrage complet en 15 minutes) jusqu'à Ever Smart (ordre décisif à 3 secondes), la fenêtre de décision utile n'a cessé de se réduire d'un cas à l'autre — un rappel constant que le temps disponible est presque toujours plus court qu'on ne le pense.",
      p5:"CE QUI A CHANGÉ APRÈS CES ACCIDENTS",s5t:"L'évolution de la culture sécurité",
      s5:"Sans entrer dans l'angle juridique, ces accidents ont, du point de vue sécurité, renforcé les pratiques de vérification croisée et de communication directe entre passerelles — la substance même de ce module.",
      p6:"CONSTRUIRE SON PROPRE RÉFLEXE SÉCURITÉ",s6t:"S'auto-évaluer honnêtement",
      s6:"Reconnaître ces schémas chez les autres est utile. Les reconnaître dans sa propre pratique est ce qui fait un marin réellement prêt à prévenir l'accident plutôt qu'à le regretter après coup.",
      p7:"THE PROFESSIONAL SAFETY MINDSET",s7t:"Ce que doit être l'état d'esprit d'un marin professionnel",
      s7:"Rester vigilant même lorsque tout semble normal. Toujours vérifier avant de supposer. Communiquer clairement. Écouter les autres membres de l'équipe. Apprendre continuellement des accidents passés — les siens et ceux des autres.\n\nCe n'est pas une nouvelle notion. C'est la synthèse de tout ce que ce module a enseigné.",
      p8:"🎯 EXERCICE DE RECONNAISSANCE DE SCHÉMAS",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 6 · FIN DU MODULE",
      sumP:["Les noms des navires changent, les causes profondes se répètent","Facteur humain, coordination, décision tardive, hypothèse non vérifiée, pression temporelle","La fenêtre de décision utile est presque toujours plus courte qu'on ne le pense","Reconnaître un schéma tôt permet de prévenir l'accident avant qu'il ne se produise","The Professional Safety Mindset : vigilance, vérification, communication, écoute, apprentissage continu"],
      learnedP:["Le fil conducteur entre les 5 cas du module","Facteur humain individuel et coordination d'équipe, revisités","Le temps de décision, du plus long au plus court","L'évolution de la culture sécurité après ces accidents","The Professional Safety Mindset"],
      safetyMsg:"Every collision teaches the same lesson in a different way: stay alert, communicate clearly, verify your assumptions, and never stop learning. The safest mariners are those who learn from the mistakes of others before making their own.",
      moduleComplete:{
        title:"COLREG SAFETY — MODULE TERMINÉ !",
        subtitle:"Collision Prevention & Response — 6 leçons maîtrisées 🛟",
        message:"Félicitations ! Tu as terminé le module COLREG Safety — Collision Prevention & Response. Tu as appris non seulement comment les collisions arrivent, mais comment les prévenir, y réagir, et en tirer des leçons. Continue ton parcours Safety. Chaque leçon apprise aujourd'hui pourrait sauver des vies demain.",
      },
    },
    en:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Lesson 6/6 · ⭐ Premium · 🏁 MODULE COMPLETE",
      title:"Lessons Learned from Maritime Collisions",
      intro:"This lesson introduces no new safety concept. It tells no new tragedy.\n\nIt brings together the five cases already studied — Andrea Doria, USS John S. McCain, Sanchi/CF Crystal, Baltic Ace, Ever Smart/Alexandra 1 — to reveal what they share despite different vessels, eras, and oceans.\n\nThe names change. The underlying causes repeat.",
      p0:"WHY STUDY THE LESSONS OF THE PAST",s0t:"Recognizing a pattern before it repeats",
      s0:"The final skill of this module is not to know five stories by heart — it is to recognize their common patterns in a new situation, before it becomes an accident.\n\nHOW TO PREVENT THE ACCIDENT? By recognizing an already-encountered pattern early.\nWHAT TO DO FACING AN UNFAMILIAR SITUATION? Ask which known case it resembles and which principle applies.\nWHAT LESSON TO RETAIN? Circumstances vary infinitely; the human behaviors that lead to accidents, much less so.",
      p1:"THE COMMON THREAD OF THE MODULE'S 5 CASES",s1t:"Very different vessels, repeating patterns",
      s1:"Liner, military destroyer, tanker, car carrier, container ship: five vessel types, five eras, five oceans. Yet overlaying them, the same human patterns recur: individual factor, team coordination, late decision, unverified assumption, time pressure.",
      p2:"REVISITING THE INDIVIDUAL HUMAN FACTOR",s2t:"The link to L1",
      s2:"Andrea Doria's automation bias and Ever Smart/Alexandra 1's fixation on an assumption share the same root: excessive trust in a single source of information, without cross-verification.",
      p3:"REVISITING TEAM COORDINATION",s3t:"The link to L2",
      s3:"USS John S. McCain showed that an entire team can lose shared situational awareness. Ever Smart/Alexandra 1 shows the same loss, but between two vessels rather than within a single team.",
      p4:"REVISITING TIME AND DECISION",s4t:"The link to L3, L4 and L5",
      s4:"From Sanchi (decisive maneuver at 1 minute) to Baltic Ace (complete sinking in 15 minutes) to Ever Smart (decisive order at 3 seconds), the useful decision window kept shrinking from one case to the next — a constant reminder that available time is almost always shorter than we think.",
      p5:"WHAT CHANGED AFTER THESE ACCIDENTS",s5t:"The evolution of safety culture",
      s5:"Without entering the legal angle, these accidents, from a safety perspective, strengthened cross-verification practices and direct bridge-to-bridge communication — the very substance of this module.",
      p6:"BUILDING YOUR OWN SAFETY REFLEX",s6t:"Honest self-assessment",
      s6:"Recognizing these patterns in others is useful. Recognizing them in your own practice is what makes a sailor genuinely ready to prevent an accident rather than regret it afterward.",
      p7:"THE PROFESSIONAL SAFETY MINDSET",s7t:"What a professional sailor's mindset should be",
      s7:"Stay alert even when everything seems normal. Always verify before assuming. Communicate clearly. Listen to other team members. Continuously learn from past accidents — your own and others'.\n\nThis is not a new concept. It is the synthesis of everything this module has taught.",
      p8:"🎯 PATTERN-RECOGNITION EXERCISE",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 6 · MODULE COMPLETE",
      sumP:["Vessel names change, underlying causes repeat","Human factor, coordination, late decision, unverified assumption, time pressure","The useful decision window is almost always shorter than we think","Recognizing a pattern early prevents the accident before it happens","The Professional Safety Mindset: vigilance, verification, communication, listening, continuous learning"],
      learnedP:["The common thread across the module's 5 cases","Individual human factor and team coordination, revisited","Decision time, from longest to shortest","The evolution of safety culture after these accidents","The Professional Safety Mindset"],
      safetyMsg:"Every collision teaches the same lesson in a different way: stay alert, communicate clearly, verify your assumptions, and never stop learning. The safest mariners are those who learn from the mistakes of others before making their own.",
      moduleComplete:{
        title:"COLREG SAFETY — MODULE COMPLETE!",
        subtitle:"Collision Prevention & Response — 6 lessons mastered 🛟",
        message:"Congratulations! You have completed the COLREG Safety — Collision Prevention & Response module. You have learned not only how collisions happen, but how to prevent them, respond to them, and learn from them. Continue your Safety journey. Every lesson learned today may save lives tomorrow.",
      },
    },
    es:{
      badge:"🛟 Seguridad · COLREG Safety — Prevención y Respuesta ante Abordajes · Lección 6/6 · ⭐ Premium · 🏁 MÓDULO COMPLETADO",
      title:"Lessons Learned from Maritime Collisions",
      intro:"Esta lección no introduce ningún concepto de seguridad nuevo. No cuenta ninguna tragedia nueva.\n\nReúne los cinco casos ya estudiados — Andrea Doria, USS John S. McCain, Sanchi/CF Crystal, Baltic Ace, Ever Smart/Alexandra 1 — para revelar lo que tienen en común pese a buques, épocas y océanos diferentes.\n\nLos nombres cambian. Las causas profundas se repiten.",
      p0:"POR QUÉ ESTUDIAR LAS LECCIONES DEL PASADO",s0t:"Reconocer un patrón antes de que se repita",
      s0:"La competencia final de este módulo no es conocer cinco historias de memoria — es reconocer sus patrones comunes en una situación nueva, antes de que se convierta en un accidente.\n\n¿CÓMO PREVENIR EL ACCIDENTE? Reconociendo pronto un patrón ya conocido.\n¿QUÉ HACER ANTE UNA SITUACIÓN DESCONOCIDA? Preguntarse a qué caso conocido se parece y qué principio se aplica.\n¿QUÉ LECCIÓN RETENER? Las circunstancias varían infinitamente; los comportamientos humanos que llevan al accidente, mucho menos.",
      p1:"EL HILO CONDUCTOR DE LOS 5 CASOS DEL MÓDULO",s1t:"Buques muy diferentes, patrones que se repiten",
      s1:"Transatlántico, destructor militar, petrolero, transportador de vehículos, portacontenedores: cinco tipos de buque, cinco épocas, cinco océanos. Y sin embargo, al superponerlos, los mismos patrones humanos regresan: factor individual, coordinación de equipo, decisión tardía, hipótesis no verificada, presión temporal.",
      p2:"REVISIÓN DEL FACTOR HUMANO INDIVIDUAL",s2t:"El vínculo con L1",
      s2:"El sesgo de automatización de Andrea Doria y la fijación en una hipótesis de Ever Smart/Alexandra 1 comparten la misma raíz: confianza excesiva en una única fuente de información, sin verificación cruzada.",
      p3:"REVISIÓN DE LA COORDINACIÓN DE EQUIPO",s3t:"El vínculo con L2",
      s3:"USS John S. McCain mostró que todo un equipo puede perder la conciencia situacional compartida. Ever Smart/Alexandra 1 muestra la misma pérdida, pero entre dos buques en lugar de dentro de un solo equipo.",
      p4:"REVISIÓN DEL TIEMPO Y LA DECISIÓN",s4t:"El vínculo con L3, L4 y L5",
      s4:"De Sanchi (maniobra decisiva a 1 minuto) a Baltic Ace (hundimiento completo en 15 minutos) hasta Ever Smart (orden decisiva a 3 segundos), la ventana de decisión útil no dejó de reducirse de un caso a otro — un recordatorio constante de que el tiempo disponible casi siempre es más corto de lo que creemos.",
      p5:"LO QUE CAMBIÓ TRAS ESTOS ACCIDENTES",s5t:"La evolución de la cultura de seguridad",
      s5:"Sin entrar en el ángulo legal, estos accidentes, desde una perspectiva de seguridad, reforzaron las prácticas de verificación cruzada y comunicación directa entre puentes — la misma esencia de este módulo.",
      p6:"CONSTRUIR TU PROPIO REFLEJO DE SEGURIDAD",s6t:"Autoevaluarse honestamente",
      s6:"Reconocer estos patrones en otros es útil. Reconocerlos en la propia práctica es lo que hace a un marino verdaderamente preparado para prevenir un accidente en lugar de lamentarlo después.",
      p7:"THE PROFESSIONAL SAFETY MINDSET",s7t:"Cuál debe ser la mentalidad de un marino profesional",
      s7:"Permanecer vigilante incluso cuando todo parece normal. Siempre verificar antes de suponer. Comunicar con claridad. Escuchar a los demás miembros del equipo. Aprender continuamente de accidentes pasados — los propios y los ajenos.\n\nEsto no es un concepto nuevo. Es la síntesis de todo lo que este módulo ha enseñado.",
      p8:"🎯 EJERCICIO DE RECONOCIMIENTO DE PATRONES",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 6 · MÓDULO COMPLETADO",
      sumP:["Los nombres de los buques cambian, las causas profundas se repiten","Factor humano, coordinación, decisión tardía, hipótesis no verificada, presión temporal","La ventana de decisión útil casi siempre es más corta de lo que creemos","Reconocer un patrón pronto permite prevenir el accidente antes de que ocurra","The Professional Safety Mindset: vigilancia, verificación, comunicación, escucha, aprendizaje continuo"],
      learnedP:["El hilo conductor entre los 5 casos del módulo","Factor humano individual y coordinación de equipo, revisitados","El tiempo de decisión, del más largo al más corto","La evolución de la cultura de seguridad tras estos accidentes","The Professional Safety Mindset"],
      safetyMsg:"Every collision teaches the same lesson in a different way: stay alert, communicate clearly, verify your assumptions, and never stop learning. The safest mariners are those who learn from the mistakes of others before making their own.",
      moduleComplete:{
        title:"COLREG SAFETY — ¡MÓDULO COMPLETADO!",
        subtitle:"Collision Prevention & Response — 6 lecciones dominadas 🛟",
        message:"¡Felicidades! Has completado el módulo COLREG Safety — Collision Prevention & Response. Has aprendido no solo cómo ocurren las colisiones, sino cómo prevenirlas, responder a ellas y aprender de ellas. Continúa tu camino de Seguridad. Cada lección aprendida hoy podría salvar vidas mañana.",
      },
    },
    pt:{
      badge:"🛟 Segurança · COLREG Safety — Prevenção e Resposta a Abalroamentos · Lição 6/6 · ⭐ Premium · 🏁 MÓDULO CONCLUÍDO",
      title:"Lessons Learned from Maritime Collisions",
      intro:"Esta lição não introduz nenhum conceito de segurança novo. Não conta nenhuma tragédia nova.\n\nReúne os cinco casos já estudados — Andrea Doria, USS John S. McCain, Sanchi/CF Crystal, Baltic Ace, Ever Smart/Alexandra 1 — para revelar o que têm em comum apesar de navios, épocas e oceanos diferentes.\n\nOs nomes mudam. As causas profundas repetem-se.",
      p0:"POR QUE ESTUDAR AS LIÇÕES DO PASSADO",s0t:"Reconhecer um padrão antes de ele se repetir",
      s0:"A competência final deste módulo não é saber cinco histórias de cor — é reconhecer os seus padrões comuns numa situação nova, antes de ela se tornar um acidente.\n\nCOMO PREVENIR O ACIDENTE? Reconhecendo cedo um padrão já encontrado.\nO QUE FAZER PERANTE UMA SITUAÇÃO DESCONHECIDA? Perguntar-se a que caso conhecido ela se assemelha e que princípio se aplica.\nQUE LIÇÃO RETER? As circunstâncias variam infinitamente; os comportamentos humanos que levam ao acidente, muito menos.",
      p1:"O FIO CONDUTOR DOS 5 CASOS DO MÓDULO",s1t:"Navios muito diferentes, padrões que se repetem",
      s1:"Transatlântico, destroyer militar, petroleiro, transportador de veículos, porta-contentores: cinco tipos de navio, cinco épocas, cinco oceanos. E, no entanto, ao sobrepô-los, os mesmos padrões humanos regressam: fator individual, coordenação de equipa, decisão tardia, hipótese não verificada, pressão temporal.",
      p2:"REVISÃO DO FATOR HUMANO INDIVIDUAL",s2t:"A ligação com L1",
      s2:"O viés de automação do Andrea Doria e a fixação numa hipótese do Ever Smart/Alexandra 1 partilham a mesma raiz: confiança excessiva numa única fonte de informação, sem verificação cruzada.",
      p3:"REVISÃO DA COORDENAÇÃO DE EQUIPA",s3t:"A ligação com L2",
      s3:"O USS John S. McCain mostrou que uma equipa inteira pode perder a consciência situacional partilhada. O Ever Smart/Alexandra 1 mostra a mesma perda, mas entre dois navios em vez de dentro de uma única equipa.",
      p4:"REVISÃO DO TEMPO E DA DECISÃO",s4t:"A ligação com L3, L4 e L5",
      s4:"Do Sanchi (manobra decisiva a 1 minuto) ao Baltic Ace (afundamento completo em 15 minutos) até ao Ever Smart (ordem decisiva a 3 segundos), a janela de decisão útil não parou de encolher de um caso para o outro — um lembrete constante de que o tempo disponível é quase sempre mais curto do que pensamos.",
      p5:"O QUE MUDOU APÓS ESTES ACIDENTES",s5t:"A evolução da cultura de segurança",
      s5:"Sem entrar no ângulo legal, estes acidentes, numa perspetiva de segurança, reforçaram as práticas de verificação cruzada e comunicação direta entre pontes — a própria substância deste módulo.",
      p6:"CONSTRUIR O TEU PRÓPRIO REFLEXO DE SEGURANÇA",s6t:"Autoavaliar-se honestamente",
      s6:"Reconhecer estes padrões nos outros é útil. Reconhecê-los na própria prática é o que torna um marítimo verdadeiramente pronto para prevenir um acidente em vez de o lamentar depois.",
      p7:"THE PROFESSIONAL SAFETY MINDSET",s7t:"Qual deve ser a mentalidade de um marítimo profissional",
      s7:"Permanecer vigilante mesmo quando tudo parece normal. Verificar sempre antes de supor. Comunicar claramente. Ouvir os outros membros da equipa. Aprender continuamente com acidentes passados — os próprios e os dos outros.\n\nIsto não é um conceito novo. É a síntese de tudo o que este módulo ensinou.",
      p8:"🎯 EXERCÍCIO DE RECONHECIMENTO DE PADRÕES",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 6 · MÓDULO CONCLUÍDO",
      sumP:["Os nomes dos navios mudam, as causas profundas repetem-se","Fator humano, coordenação, decisão tardia, hipótese não verificada, pressão temporal","A janela de decisão útil é quase sempre mais curta do que pensamos","Reconhecer um padrão cedo permite prevenir o acidente antes de ele acontecer","The Professional Safety Mindset: vigilância, verificação, comunicação, escuta, aprendizagem contínua"],
      learnedP:["O fio condutor entre os 5 casos do módulo","Fator humano individual e coordenação de equipa, revisitados","O tempo de decisão, do mais longo ao mais curto","A evolução da cultura de segurança após estes acidentes","The Professional Safety Mindset"],
      safetyMsg:"Every collision teaches the same lesson in a different way: stay alert, communicate clearly, verify your assumptions, and never stop learning. The safest mariners are those who learn from the mistakes of others before making their own.",
      moduleComplete:{
        title:"COLREG SAFETY — MÓDULO CONCLUÍDO!",
        subtitle:"Collision Prevention & Response — 6 lições dominadas 🛟",
        message:"Parabéns! Concluíste o módulo COLREG Safety — Collision Prevention & Response. Aprendeste não só como as colisões acontecem, mas como preveni-las, reagir a elas e aprender com elas. Continua o teu percurso de Segurança. Cada lição aprendida hoje pode salvar vidas amanhã.",
      },
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1_L6({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 6/6 🏁":lang==="en"?"Lesson 6/6 🏁":lang==="es"?"Lección 6/6 🏁":"Lição 6/6 🏁"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
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

            <SL icon="🔗" text={lc.p1} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔗</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:12}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌌 {lang==="fr"?"CONSTELLATION DES 5 CAS — INTERACTIF":lang==="en"?"CONSTELLATION OF THE 5 CASES — INTERACTIVE":lang==="es"?"CONSTELACIÓN DE LOS 5 CASOS — INTERACTIVO":"CONSTELAÇÃO DOS 5 CASOS — INTERATIVO"}</div><ConstellationSVG lang={lang}/></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📊 {lang==="fr"?"TABLEAU CROISÉ DES CAUSES — INTERACTIF":lang==="en"?"CROSS-CAUSE MATRIX — INTERACTIVE":lang==="es"?"MATRIZ CRUZADA DE CAUSAS — INTERACTIVO":"MATRIZ CRUZADA DE CAUSAS — INTERATIVO"}</div><CauseMatrixSVG lang={lang}/></Card>

            <SL icon="👤" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>👤</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="🤝" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🤝</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="⏱️" text={lc.p4} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏱️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⏱️ {lang==="fr"?"FENÊTRE DE DÉCISION COMPARÉE — INTERACTIF":lang==="en"?"DECISION WINDOW COMPARED — INTERACTIVE":lang==="es"?"VENTANA DE DECISIÓN COMPARADA — INTERACTIVO":"JANELA DE DECISÃO COMPARADA — INTERATIVO"}</div><DecisionWindowSVG lang={lang}/></Card>

            <SL icon="🌱" text={lc.p5} color={C.green}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌱</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="🪞" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🪞</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎡 {lang==="fr"?"AUTO-ÉVALUATION — INTERACTIF":lang==="en"?"SELF-ASSESSMENT — INTERACTIVE":lang==="es"?"AUTOEVALUACIÓN — INTERACTIVO":"AUTOAVALIAÇÃO — INTERATIVO"}</div><SelfAssessSVG lang={lang}/></Card>

            <SL icon="⭐" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.85))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⭐</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s7t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.9,whiteSpace:"pre-line"}}>{lc.s7}</div></Card>

            <SL icon="🎯" text={lc.p8} color={C.red}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}44`,background:"linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="🔎" text={lang==="fr"?"⚠️ RÉTROSPECTIVE DES 5 CAS DU MODULE":lang==="en"?"⚠️ RETROSPECTIVE OF THE MODULE'S 5 CASES":lang==="es"?"⚠️ RETROSPECTIVA DE LOS 5 CASOS DEL MÓDULO":"⚠️ RETROSPETIVA DOS 5 CASOS DO MÓDULO"} color={C.red}/>
            <Card style={{marginBottom:14}}><CaseRetrospective lang={lang}/></Card>

            <SL icon="📝" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p10} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final — Synthèse du Module":lang==="en"?"Final Quiz — Module Synthesis":lang==="es"?"Quiz Final — Síntesis del Módulo":"Quiz Final — Síntese do Módulo"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 6/6 · 🏁":"questions · Lesson 6/6 · 🏁"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            {/* Module completion celebration */}
            <div style={{textAlign:"center",marginBottom:20,padding:"20px 16px",borderRadius:20,background:"linear-gradient(135deg,rgba(192,57,43,0.15),rgba(201,146,42,0.1))",border:`1px solid ${C.red}44`}}>
              <div style={{fontSize:72,marginBottom:8}}>🏆</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.gold2,marginBottom:4}}>{lc.moduleComplete.title}</div>
              <div style={{fontSize:14,color:C.white,marginBottom:12}}>{lc.moduleComplete.subtitle}</div>
              <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap"}}>
                {["L1","L2","L3","L4","L5","L6"].map((l,i)=>(
                  <div key={i} style={{width:36,height:36,borderRadius:10,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:C.white}}>{l}</div>
                ))}
              </div>
            </div>

            <div style={{display:"inline-flex",width:"100%",justifyContent:"center",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}55`,fontSize:14,color:C.gold2,fontWeight:700,marginBottom:16,boxSizing:"border-box"}}>
              +300 {t.xp} ⭐ · {lang==="fr"?"Module":"Module"}: 6/6 · {lang==="fr"?"Quiz":"Quiz"} {quizScore}/5
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🛟</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <div style={{textAlign:"center",marginBottom:16,fontSize:13,color:C.gold2,fontStyle:"italic",lineHeight:1.7,maxWidth:340,marginLeft:"auto",marginRight:"auto"}}>
              {lc.moduleComplete.message}
            </div>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.gold},${C.red})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(201,146,42,0.4)",marginBottom:10}}>
              {lang==="fr"?"🎯 EXPLORER LES AUTRES MODULES →":lang==="en"?"🎯 EXPLORE OTHER MODULES →":lang==="es"?"🎯 EXPLORAR OTROS MÓDULOS →":"🎯 EXPLORAR OUTROS MÓDULOS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
