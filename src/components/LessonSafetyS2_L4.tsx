import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Sécurité", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Safety", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Seguridad", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Segurança", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// SVG 1 — TIMED SEQUENCE SIMULATOR
function TimedSequenceSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, label:{fr:"Saisir l'EPIRB",en:"Grab the EPIRB",es:"Tomar el EPIRB",pt:"Agarrar o EPIRB"}, time:"🟢", desc:{fr:"Geste immédiat, sans réfléchir — la mémoire musculaire doit suffire.",en:"Immediate motion, no thinking — muscle memory must suffice.",es:"Gesto inmediato, sin pensar — la memoria muscular debe bastar.",pt:"Gesto imediato, sem pensar — a memória muscular deve bastar."} },
    { id:2, label:{fr:"Retirer du support",en:"Remove from bracket",es:"Retirar del soporte",pt:"Retirar do suporte"}, time:"🟢", desc:{fr:"Quelques secondes — un geste entraîné, pas improvisé.",en:"A few seconds — a trained motion, not improvised.",es:"Unos segundos — un gesto entrenado, no improvisado.",pt:"Alguns segundos — um gesto treinado, não improvisado."} },
    { id:3, label:{fr:"Déployer l'antenne",en:"Deploy the antenna",es:"Desplegar la antena",pt:"Desdobrar a antena"}, time:"🟡", desc:{fr:"Souvent bâclé sous stress — vérifier qu'elle est bien à la verticale.",en:"Often rushed under stress — check it's properly vertical.",es:"A menudo mal hecho bajo estrés — comprobar que esté bien vertical.",pt:"Muitas vezes mal feito sob stress — verificar que está bem vertical."} },
    { id:4, label:{fr:"Activer",en:"Activate",es:"Activar",pt:"Ativar"}, time:"🟢", desc:{fr:"Le geste le plus simple — mais sauté par certains en pleine panique.",en:"The simplest motion — yet skipped by some in full panic.",es:"El gesto más simple — pero saltado por algunos en pleno pánico.",pt:"O gesto mais simples — mas saltado por alguns em pleno pânico."} },
    { id:5, label:{fr:"Vérifier l'indicateur",en:"Check the indicator",es:"Comprobar el indicador",pt:"Verificar o indicador"}, time:"🔴", desc:{fr:"L'étape la plus souvent oubliée — sans elle, aucune confirmation que ça fonctionne.",en:"The most frequently skipped step — without it, no confirmation it's working.",es:"El paso más frecuentemente olvidado — sin él, ninguna confirmación de que funciona.",pt:"O passo mais frequentemente esquecido — sem ele, nenhuma confirmação de que funciona."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(201,146,42,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.gold:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:14}}>{s.time}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.id}. {s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.muted,textAlign:"center"}}>🟢 {lang==="fr"?"temps correct":"correct time"} · 🟡 {lang==="fr"?"acceptable":"acceptable"} · 🔴 {lang==="fr"?"trop lent / souvent oublié":"too slow / often skipped"}</div>
    </div>
  );
}

// SVG 2 — FINE MOTOR DEGRADATION UNDER STRESS
function MotorDegradationSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const levels = [
    { id:0, color:C.green, label:{fr:"Calme",en:"Calm",es:"Calma",pt:"Calma"}, desc:{fr:"Gestes fins précis : boutons, fixations, réglages.",en:"Precise fine motions: buttons, fasteners, adjustments.",es:"Gestos finos precisos: botones, fijaciones, ajustes.",pt:"Gestos finos precisos: botões, fixações, ajustes."} },
    { id:1, color:C.orange, label:{fr:"Stress modéré",en:"Moderate stress",es:"Estrés moderado",pt:"Stress moderado"}, desc:{fr:"Légère perte de précision — les gestes larges restent fiables.",en:"Slight loss of precision — large motions remain reliable.",es:"Ligera pérdida de precisión — los gestos amplios siguen siendo fiables.",pt:"Ligeira perda de precisão — os gestos amplos continuam fiáveis."} },
    { id:2, color:C.red, label:{fr:"Adrénaline forte",en:"High adrenaline",es:"Adrenalina alta",pt:"Adrenalina alta"}, desc:{fr:"Motricité fine fortement dégradée — seuls les gestes larges et entraînés restent exécutables.",en:"Fine motor skills heavily degraded — only large, trained motions remain executable.",es:"Motricidad fina fuertemente degradada — solo los gestos amplios y entrenados siguen siendo ejecutables.",pt:"Motricidade fina fortemente degradada — só os gestos amplos e treinados continuam executáveis."} },
  ];
  const sel_ = levels[sel];
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {levels.map(l=>(
          <div key={l.id} onClick={()=>setSel(sel===l.id?null:l.id)} style={{padding:"12px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",background:sel===l.id?`${l.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===l.id?l.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:10,fontWeight:700,color:sel===l.id?l.color:C.muted}}>{l.label[lang]||l.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>
        {lang==="fr"?"C'est pourquoi la mémoire musculaire (gestes larges répétés) compte plus que la théorie sous forte pression.":lang==="en"?"This is why muscle memory (repeated large motions) matters more than theory under high pressure.":lang==="es"?"Por eso la memoria muscular (gestos amplios repetidos) importa más que la teoría bajo alta presión.":"É por isso que a memória muscular (gestos amplos repetidos) importa mais do que a teoria sob alta pressão."}
      </div>
    </div>
  );
}

// SVG 3 — PANIC ERRORS
function PanicErrorsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const errors = [
    { id:"skip", icon:"⏭️", label:{fr:"Sauter une étape",en:"Skipping a step",es:"Saltar un paso",pt:"Saltar um passo"}, fix:{fr:"S'entraîner à verbaliser chaque étape, même seul, pour ne jamais en sauter une sous pression.",en:"Train to verbalize each step, even alone, to never skip one under pressure.",es:"Entrenarse a verbalizar cada paso, incluso solo, para nunca saltarse uno bajo presión.",pt:"Treinar para verbalizar cada passo, mesmo sozinho, para nunca saltar um sob pressão."} },
    { id:"antenna", icon:"📡", label:{fr:"Antenne mal déployée",en:"Poorly deployed antenna",es:"Antena mal desplegada",pt:"Antena mal desdobrada"}, fix:{fr:"Vérifier systématiquement la verticalité de l'antenne avant de considérer l'activation terminée.",en:"Systematically check the antenna is vertical before considering activation complete.",es:"Comprobar sistemáticamente la verticalidad de la antena antes de considerar completa la activación.",pt:"Verificar sistematicamente a verticalidade da antena antes de considerar a ativação concluída."} },
    { id:"order", icon:"🔀", label:{fr:"Mauvais ordre des gestes",en:"Wrong order of actions",es:"Orden incorrecto de acciones",pt:"Ordem errada das ações"}, fix:{fr:"Répéter la séquence à l'identique à chaque exercice, jamais dans le désordre, même 'pour gagner du temps'.",en:"Repeat the exact same sequence every drill, never out of order, even 'to save time'.",es:"Repetir la secuencia idéntica en cada ejercicio, nunca en desorden, ni siquiera 'para ganar tiempo'.",pt:"Repetir a sequência idêntica em cada exercício, nunca fora de ordem, mesmo 'para ganhar tempo'."} },
  ];
  const sel_ = errors.find(e=>e.id===sel);
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {errors.map(e=>(
          <div key={e.id} onClick={()=>setSel(sel===e.id?null:e.id)} style={{flex:1,padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",background:sel===e.id?"rgba(192,57,43,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===e.id?C.red:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18}}>{e.icon}</div>
            <div style={{fontSize:9,fontWeight:700,color:sel===e.id?C.red:C.muted,marginTop:3}}>{e.label[lang]||e.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.fix[lang]||sel_.fix.fr}</div>}
    </div>
  );
}

// SVG 4 — "IT'S NOT WORKING" DECISION TREE
function FallbackTreeSVG({ lang }) {
  const [step, setStep] = useState(null);
  const L = {
    q:{fr:"L'indicateur ne s'allume pas. Que fais-tu ?",en:"The indicator doesn't light up. What do you do?",es:"El indicador no se enciende. ¿Qué haces?",pt:"O indicador não acende. O que fazes?"},
    a:{fr:"Réessayer une fois la séquence complète",en:"Retry the full sequence once",es:"Reintentar la secuencia completa una vez",pt:"Tentar novamente a sequência completa uma vez"},
    b:{fr:"Basculer immédiatement sur le système de secours (2e EPIRB, VHF)",en:"Immediately switch to the backup system (2nd EPIRB, VHF)",es:"Cambiar inmediatamente al sistema de respaldo (2º EPIRB, VHF)",pt:"Mudar imediatamente para o sistema de reserva (2º EPIRB, VHF)"},
  };
  return (
    <div>
      <div style={{fontSize:12,color:C.white,textAlign:"center",marginBottom:10,fontWeight:600}}>{L.q[lang]||L.q.fr}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <div onClick={()=>setStep("a")} style={{padding:"10px 12px",borderRadius:10,cursor:"pointer",background:step==="a"?"rgba(230,126,34,0.2)":"rgba(255,255,255,0.04)",border:`1.5px solid ${step==="a"?C.orange:"rgba(255,255,255,0.08)"}`,fontSize:11,color:C.white}}>1️⃣ {L.a[lang]||L.a.fr}</div>
        <div onClick={()=>setStep("b")} style={{padding:"10px 12px",borderRadius:10,cursor:"pointer",background:step==="b"?"rgba(30,138,74,0.2)":"rgba(255,255,255,0.04)",border:`1.5px solid ${step==="b"?C.green:"rgba(255,255,255,0.08)"}`,fontSize:11,color:C.white}}>2️⃣ {L.b[lang]||L.b.fr}</div>
      </div>
      {step&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.gold2,lineHeight:1.7,fontStyle:"italic"}}>
        {step==="a"?(lang==="fr"?"Un seul nouvel essai — pas trois, pas cinq. Si ça ne fonctionne toujours pas, passer immédiatement au repli.":"One retry only — not three, not five. If it still doesn't work, switch immediately to the fallback."):(lang==="fr"?"Ne jamais rester bloqué sur un seul système en panne — la redondance (vue en L2) doit être activée sans délai.":"Never stay stuck on a single failed system — redundancy (seen in L2) must be activated without delay.")}
      </div>}
    </div>
  );
}

// EXERCISE — DEGRADED CONDITIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b",q5:"a"};
  const qs = {
    fr:[
      {id:"q1",q:"Obscurité totale, fumée, gants épais, alarme assourdissante, navire qui gîte fortement. Vous devez activer l'EPIRB. Quel principe appliquer en premier ?\na) Aller le plus vite possible, quitte à sauter une étape\nb) Slow is Smooth, Smooth is Fast — ralentir légèrement pour rester méthodique\nc) Attendre que la gîte se stabilise avant d'agir"},
      {id:"q2",q:"Dans ces conditions dégradées, pourquoi la mémoire musculaire prime-t-elle sur la réflexion ?",opts:["Parce que la motricité fine et le jugement se dégradent fortement sous adrénaline — seuls les gestes entraînés restent fiables","Parce que réfléchir est toujours inutile","Parce que la fumée améliore la concentration","Parce que la mémoire musculaire n'a aucun lien avec le stress"],correct:0},
      {id:"q3",q:"Vous ne pouvez pas voir clairement si l'antenne est bien déployée à la verticale. Que faites-vous ?\na) Continuer sans vérifier, ça ira probablement\nb) Abandonner l'activation\nc) Vérifier par le toucher, geste entraîné à l'avance justement pour ces conditions"},
      {id:"q4",q:"L'indicateur ne s'allume pas malgré la séquence suivie. Quelle est la bonne réaction ?\na) Répéter la séquence indéfiniment jusqu'à ce que ça marche\nb) Un seul nouvel essai, puis basculer immédiatement sur le système de secours\nc) Abandonner toute tentative de communication"},
      {id:"q5",q:"Quel est le principe le plus décisif dans ce scénario en conditions dégradées ?\na) Train the way you expect to perform — s'entraîner exactement comme en situation réelle\nb) La théorie technique de l'EPIRB\nc) La rapidité à tout prix, même désordonnée"},
    ],
    en:[
      {id:"q1",q:"Total darkness, smoke, thick gloves, deafening alarm, vessel listing heavily. You must activate the EPIRB. Which principle applies first?\na) Go as fast as possible, even if it means skipping a step\nb) Slow is Smooth, Smooth is Fast — slow down slightly to stay methodical\nc) Wait for the list to stabilize before acting"},
      {id:"q2",q:"In these degraded conditions, why does muscle memory take priority over reasoning?",opts:["Because fine motor skills and judgment degrade heavily under adrenaline — only trained motions stay reliable","Because thinking is always useless","Because smoke improves concentration","Because muscle memory has no link to stress"],correct:0},
      {id:"q3",q:"You can't clearly see whether the antenna is properly deployed vertically. What do you do?\na) Continue without checking, it'll probably be fine\nb) Abandon activation\nc) Check by touch, a motion trained in advance precisely for these conditions"},
      {id:"q4",q:"The indicator doesn't light up despite following the sequence. What is the correct reaction?\na) Repeat the sequence indefinitely until it works\nb) One retry only, then immediately switch to the backup system\nc) Abandon all attempt at communication"},
      {id:"q5",q:"What is the most decisive principle in this degraded-conditions scenario?\na) Train the way you expect to perform — drill exactly as in a real situation\nb) The technical theory of the EPIRB\nc) Speed at all costs, even disorderly"},
    ],
    es:[
      {id:"q1",q:"Oscuridad total, humo, guantes gruesos, alarma ensordecedora, buque escorando fuertemente. Debes activar el EPIRB. ¿Qué principio aplicar primero?\na) Ir lo más rápido posible, aunque sea saltando un paso\nb) Slow is Smooth, Smooth is Fast — reducir ligeramente el ritmo para ser metódico\nc) Esperar a que la escora se estabilice antes de actuar"},
      {id:"q2",q:"En estas condiciones degradadas, ¿por qué la memoria muscular prima sobre el razonamiento?",opts:["Porque la motricidad fina y el juicio se degradan mucho con la adrenalina — solo los gestos entrenados siguen siendo fiables","Porque pensar siempre es inútil","Porque el humo mejora la concentración","Porque la memoria muscular no tiene relación con el estrés"],correct:0},
      {id:"q3",q:"No puedes ver claramente si la antena está bien desplegada en vertical. ¿Qué haces?\na) Continuar sin comprobar, probablemente esté bien\nb) Abandonar la activación\nc) Comprobar al tacto, un gesto entrenado de antemano precisamente para estas condiciones"},
      {id:"q4",q:"El indicador no se enciende pese a seguir la secuencia. ¿Cuál es la reacción correcta?\na) Repetir la secuencia indefinidamente hasta que funcione\nb) Un solo nuevo intento, luego cambiar inmediatamente al sistema de respaldo\nc) Abandonar todo intento de comunicación"},
      {id:"q5",q:"¿Cuál es el principio más decisivo en este escenario de condiciones degradadas?\na) Train the way you expect to perform — entrenarse exactamente como en situación real\nb) La teoría técnica del EPIRB\nc) La velocidad a toda costa, aunque sea desordenada"},
    ],
    pt:[
      {id:"q1",q:"Escuridão total, fumo, luvas grossas, alarme ensurdecedor, navio a adornar fortemente. Deves ativar o EPIRB. Que princípio aplicar primeiro?\na) Ir o mais rápido possível, mesmo saltando um passo\nb) Slow is Smooth, Smooth is Fast — abrandar ligeiramente para ser metódico\nc) Esperar que o adornamento estabilize antes de agir"},
      {id:"q2",q:"Nestas condições degradadas, por que a memória muscular tem prioridade sobre o raciocínio?",opts:["Porque a motricidade fina e o julgamento degradam-se muito com a adrenalina — só os gestos treinados continuam fiáveis","Porque pensar é sempre inútil","Porque o fumo melhora a concentração","Porque a memória muscular não tem relação com o stress"],correct:0},
      {id:"q3",q:"Não consegues ver claramente se a antena está bem desdobrada na vertical. O que fazes?\na) Continuar sem verificar, provavelmente estará bem\nb) Abandonar a ativação\nc) Verificar pelo toque, um gesto treinado antecipadamente precisamente para estas condições"},
      {id:"q4",q:"O indicador não acende apesar de seguir a sequência. Qual é a reação correta?\na) Repetir a sequência indefinidamente até funcionar\nb) Uma só nova tentativa, depois mudar imediatamente para o sistema de reserva\nc) Abandonar toda a tentativa de comunicação"},
      {id:"q5",q:"Qual é o princípio mais decisivo neste cenário de condições degradadas?\na) Train the way you expect to perform — treinar exatamente como numa situação real\nb) A teoria técnica do EPIRB\nc) A velocidade a todo custo, mesmo desordenada"},
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
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ACCIDENT CASE — TRINITY II
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Trinity II — Baie de Campeche (8 septembre 2011)",teaser:"Liftboat · Tempête Nate · Radeaux gonflés sur le pont · EPIRB laissée à bord · 4 morts sur 10",
      what:"Frappé par la tempête Nate, le liftboat Trinity II subit une rupture de sa jambe de levage arrière et gîte dangereusement. Le commandant lance un Mayday et ordonne l'abandon du navire. Dans la panique de l'évacuation, les deux radeaux de survie neufs sont gonflés sur le pont au lieu d'être gonflés dans l'eau comme la procédure l'exige — les deux s'envolent aussitôt dans la tempête, hors d'atteinte. Personne ne pense à emporter l'EPIRB pourtant présente à bord. Les 10 personnes se retrouvent à s'accrocher à un seul flotteur de 12 places pendant trois jours en pleine mer. 4 personnes meurent, les 6 survivants souffrent de blessures graves.",
      cause:"• Radeaux de survie gonflés sur le pont au lieu de l'eau — erreur d'exécution sous panique, pas de choix d'équipement\n• EPIRB jamais emportée lors de l'abandon, alors que présente et fonctionnelle à bord\n• Absence d'entraînement suffisant à l'exécution exacte des gestes d'abandon en conditions réelles\n• Équipement adéquat et disponible, mais exécution physique défaillante au moment critique",
      lessons:"✓ Un bon choix d'équipement (L2) et une bonne préparation (L3) ne suffisent pas si l'exécution sous panique échoue\n✓ Les gestes d'urgence doivent être répétés jusqu'à devenir des réflexes, pas une procédure lue pour la première fois\n✓ Emporter l'équipement de détresse doit devenir un réflexe automatique, jamais une pensée secondaire dans la panique\n✓ Train the way you expect to perform : un exercice fait à moitié produit une exécution à moitié le jour où ça compte",
      link:"🔗 Distinct de SV Nina (L2, aucune activation possible) et Lady Mary (L3, préparation/enregistrement) : ici, l'équipement était présent et adéquat — c'est l'exécution physique sous la panique qui a échoué."},
    en:{title:"Trinity II — Bay of Campeche (September 8, 2011)",teaser:"Liftboat · Storm Nate · Liferafts inflated on deck · EPIRB left behind · 4 of 10 dead",
      what:"Struck by Tropical Storm Nate, the liftboat Trinity II suffers a failure of its stern jacking leg and lists dangerously. The master issues a Mayday and orders abandon ship. In the panic of the evacuation, the two brand-new liferafts are inflated on deck instead of in the water as procedure requires — both immediately blow away in the storm, out of reach. No one thinks to bring the EPIRB, though present on board. All 10 people end up clinging to a single 12-person lifefloat for three days at sea. 4 die, the 6 survivors suffer serious injuries.",
      cause:"• Liferafts inflated on deck instead of in the water — an execution error under panic, not an equipment choice issue\n• EPIRB never brought during abandon ship, though present and functional on board\n• Insufficient training in the exact execution of abandon-ship actions under real conditions\n• Adequate, available equipment, but failed physical execution at the critical moment",
      lessons:"✓ A good equipment choice (L2) and good preparation (L3) aren't enough if execution under panic fails\n✓ Emergency motions must be repeated until they become reflexes, not a procedure read for the first time\n✓ Bringing distress equipment must become an automatic reflex, never a secondary thought in panic\n✓ Train the way you expect to perform: a half-hearted drill produces half-hearted execution the day it counts",
      link:"🔗 Distinct from SV Nina (L2, no activation possible) and Lady Mary (L3, preparation/registration): here, the equipment was present and adequate — it was the physical execution under panic that failed."},
    es:{title:"Trinity II — Bahía de Campeche (8 de septiembre de 2011)",teaser:"Liftboat · Tormenta Nate · Balsas infladas en cubierta · EPIRB olvidado · 4 de 10 muertos",
      what:"Golpeado por la tormenta Nate, el liftboat Trinity II sufre la rotura de su pata de elevación de popa y escora peligrosamente. El capitán lanza un Mayday y ordena abandonar el buque. En el pánico de la evacuación, las dos balsas salvavidas nuevas se inflan en cubierta en lugar de en el agua como exige el procedimiento — ambas salen volando de inmediato en la tormenta, fuera de alcance. Nadie piensa en llevar el EPIRB, aunque estaba presente a bordo. Las 10 personas terminan aferradas a un solo flotador de 12 plazas durante tres días en alta mar. 4 mueren, los 6 supervivientes sufren heridas graves.",
      cause:"• Balsas infladas en cubierta en lugar de en el agua — error de ejecución bajo pánico, no de elección de equipo\n• EPIRB nunca llevado al abandonar el buque, pese a estar presente y funcional a bordo\n• Entrenamiento insuficiente en la ejecución exacta de las acciones de abandono en condiciones reales\n• Equipo adecuado y disponible, pero ejecución física fallida en el momento crítico",
      lessons:"✓ Una buena elección de equipo (L2) y una buena preparación (L3) no bastan si falla la ejecución bajo pánico\n✓ Los gestos de emergencia deben repetirse hasta convertirse en reflejos, no un procedimiento leído por primera vez\n✓ Llevar el equipo de socorro debe convertirse en un reflejo automático, nunca un pensamiento secundario en el pánico\n✓ Train the way you expect to perform: un ejercicio a medias produce una ejecución a medias el día que cuenta",
      link:"🔗 Distinto de SV Nina (L2, ninguna activación posible) y Lady Mary (L3, preparación/registro): aquí el equipo estaba presente y era adecuado — fue la ejecución física bajo pánico la que falló."},
    pt:{title:"Trinity II — Baía de Campeche (8 de setembro de 2011)",teaser:"Liftboat · Tempestade Nate · Jangadas infladas no convés · EPIRB esquecido · 4 de 10 mortos",
      what:"Atingido pela tempestade Nate, o liftboat Trinity II sofre a rutura da sua perna de elevação de popa e adorna perigosamente. O comandante emite um Mayday e ordena o abandono do navio. No pânico da evacuação, as duas jangadas salva-vidas novas são infladas no convés em vez de na água como o procedimento exige — ambas voam imediatamente na tempestade, fora de alcance. Ninguém pensa em levar o EPIRB, apesar de estar presente a bordo. As 10 pessoas acabam agarradas a um único flutuador de 12 lugares durante três dias em alto mar. 4 morrem, os 6 sobreviventes sofrem ferimentos graves.",
      cause:"• Jangadas infladas no convés em vez de na água — erro de execução sob pânico, não de escolha de equipamento\n• EPIRB nunca levado ao abandonar o navio, apesar de presente e funcional a bordo\n• Treino insuficiente na execução exata das ações de abandono em condições reais\n• Equipamento adequado e disponível, mas execução física falhada no momento crítico",
      lessons:"✓ Uma boa escolha de equipamento (L2) e uma boa preparação (L3) não bastam se a execução sob pânico falhar\n✓ Os gestos de emergência devem ser repetidos até se tornarem reflexos, não um procedimento lido pela primeira vez\n✓ Levar o equipamento de socorro deve tornar-se um reflexo automático, nunca um pensamento secundário no pânico\n✓ Train the way you expect to perform: um exercício a meio produz uma execução a meio no dia em que conta",
      link:"🔗 Distinto do SV Nina (L2, nenhuma ativação possível) e do Lady Mary (L3, preparação/registo): aqui o equipamento estava presente e adequado — foi a execução física sob pânico que falhou."},
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

// BANK — 15 QUESTIONS (scenario-only)
const BANK = {
  fr:[
    {q:"Sous adrénaline forte, pourquoi la motricité fine se dégrade-t-elle ?",opts:["Elle ne se dégrade jamais","L'adrénaline réduit la précision des gestes fins ; seuls les gestes larges entraînés restent fiables","Elle s'améliore toujours sous stress","Cela ne concerne que les débutants"],correct:1,expl:"Sous forte adrénaline, la motricité fine se dégrade fortement — c'est pourquoi la mémoire musculaire de gestes larges et répétés prime sur la précision réfléchie."},
    {q:"Que signifie 'Slow is Smooth, Smooth is Fast' ?",opts:["Il faut toujours agir le plus lentement possible","Ralentir légèrement pour rester méthodique produit en réalité une exécution plus efficace qu'une précipitation désordonnée","La vitesse n'a aucune importance","Ce principe ne s'applique qu'à la navigation"],correct:1,expl:"Ce principe naval/aviation/forces spéciales montre qu'une exécution méthodique, même légèrement plus lente, est en réalité plus rapide et fiable qu'une précipitation qui génère des erreurs."},
    {q:"Pourquoi verbaliser chaque étape d'activation, même seul ?",opts:["Ça n'a aucune utilité si personne n'écoute","Verbaliser force à confirmer consciemment chaque étape et réduit le risque d'en sauter une","C'est uniquement utile en équipe","Cela ralentit inutilement l'exécution"],correct:1,expl:"La verbalisation, même solitaire, agit comme une boucle de confirmation qui réduit le risque d'omission sous stress."},
    {q:"Quelle est l'erreur de panique la plus fréquente lors d'une activation d'urgence ?",opts:["Prendre trop de temps à vérifier chaque étape","Sauter une étape, mal déployer l'antenne, ou inverser l'ordre des gestes","Activer trop calmement","Utiliser les deux mains"],correct:1,expl:"Ces trois erreurs reviennent le plus fréquemment dans les cas réels d'activation sous panique."},
    {q:"L'indicateur d'activation ne s'allume pas après la séquence correcte. Quelle est la bonne réaction ?",opts:["Répéter indéfiniment la même séquence","Un seul nouvel essai, puis basculer immédiatement sur le système de secours","Abandonner toute tentative","Attendre plusieurs heures avant de réessayer"],correct:1,expl:"Un seul nouvel essai suffit à écarter une erreur ponctuelle ; au-delà, il faut activer la redondance sans délai."},
    {q:"Obscurité, fumée, gants épais : dans ces conditions, sur quoi faut-il compter le plus ?",opts:["La réflexion analytique précise","Les gestes entraînés à l'avance, répétés jusqu'à devenir automatiques","La chance","La rapidité désordonnée"],correct:1,expl:"En conditions dégradées, seuls les gestes suffisamment entraînés pour devenir automatiques restent réellement exécutables."},
    {q:"Que signifie 'Train the way you expect to perform' ?",opts:["Les exercices sont de simples formalités administratives","Chaque exercice doit être exécuté comme s'il s'agissait d'une vraie urgence, pour construire les bons réflexes","Il ne faut jamais s'entraîner à l'avance","Seuls les officiers doivent s'entraîner"],correct:1,expl:"Ce principe transversal de MAP rappelle que la qualité d'un exercice détermine directement la qualité de l'exécution réelle."},
    {q:"Dans le cas Trinity II, pourquoi les radeaux de survie n'ont-ils pas pu être utilisés ?",opts:["Ils étaient défectueux","Ils ont été gonflés sur le pont au lieu de l'eau, et se sont envolés dans la tempête","Il n'y avait pas de radeaux à bord","L'équipage a refusé de les utiliser"],correct:1,expl:"Une erreur d'exécution sous panique — gonfler sur le pont au lieu de l'eau — a rendu les deux radeaux inutilisables en quelques secondes."},
    {q:"Pourquoi personne n'a-t-il emporté l'EPIRB lors de l'abandon du Trinity II ?",opts:["Elle n'était pas fonctionnelle","Dans la panique de l'évacuation, ce geste n'était pas devenu un réflexe automatique","Elle était mal enregistrée","Le navire n'en possédait pas"],correct:1,expl:"L'EPIRB était présente et fonctionnelle, mais le réflexe de l'emporter n'avait pas été suffisamment entraîné pour survivre à la panique de l'évacuation."},
    {q:"Quelle est la différence entre le cas Trinity II (L4) et Lady Mary (L3) ?",opts:["Il n'y a aucune différence","Lady Mary illustre un manque de préparation en amont ; Trinity II illustre un échec d'exécution physique malgré un équipement adéquat","Les deux cas concernent uniquement la théorie GMDSS","Trinity II ne concerne pas l'EPIRB"],correct:1,expl:"L3 traite de la préparation (enregistrement, maintenance) ; L4 traite de l'exécution physique des gestes au moment critique, même quand la préparation était correcte."},
    {q:"Quel est l'objectif principal de la section 'Slow is Smooth, Smooth is Fast' ?",opts:["Encourager à toujours agir le plus lentement possible","Montrer que la méthode et la maîtrise produisent une exécution finalement plus rapide et fiable que la précipitation","Remplacer l'entraînement par la théorie","Cela ne concerne que les activations automatiques"],correct:1,expl:"Ce principe montre que ralentir légèrement pour rester méthodique évite les erreurs qui, elles, coûtent réellement du temps."},
    {q:"Face à un échec d'activation, pourquoi ne faut-il pas s'acharner indéfiniment sur le même système ?",opts:["Parce que s'acharner est toujours la bonne stratégie","Parce que la redondance existe justement pour basculer rapidement vers un système de secours en cas d'échec","Parce que les systèmes de secours ne servent jamais","Parce qu'il faut toujours attendre les instructions du capitaine"],correct:1,expl:"La redondance (vue en L2) n'a d'utilité que si elle est activée rapidement après un nombre limité d'essais infructueux sur le système principal."},
    {q:"Pourquoi l'exercice de cette leçon inclut-il l'obscurité, la fumée, les gants et le bruit ?",opts:["Pour rendre l'exercice inutilement difficile","Parce que l'activation réelle se fait rarement dans des conditions idéales, et l'entraînement doit refléter cette réalité","Ce sont des détails sans importance","Uniquement pour les navires militaires"],correct:1,expl:"Reproduire des conditions dégradées dans l'entraînement prépare à l'exécution réelle, qui se fait rarement dans un contexte confortable."},
    {q:"Quel est l'objectif principal de la leçon L4 dans le Safety Department ?",opts:["Réexpliquer le fonctionnement technique de l'EPIRB","Apprendre à exécuter correctement les gestes d'activation sous pression, même quand le choix (L2) et la préparation (L3) sont corrects","Étudier l'abandon du navire","Comparer les fabricants d'équipement"],correct:1,expl:"L4 se concentre uniquement sur l'exécution physique sous pression, sans réexpliquer la théorie déjà couverte ailleurs."},
    {q:"Pourquoi cette leçon ne développe-t-elle pas les procédures complètes d'abandon du navire ?",opts:["Parce que ce sujet appartient exclusivement au futur module s5","Parce que ce n'est jamais utile","Parce que ça a déjà été vu en L1","Parce que le format ne le permet pas"],correct:0,expl:"Conformément à la règle d'architecture MAP, l'abandon du navire reste le domaine exclusif du futur module s5."},
  ],
  en:[
    {q:"Under high adrenaline, why do fine motor skills degrade?",opts:["They never degrade","Adrenaline reduces precision of fine motions; only trained large motions remain reliable","They always improve under stress","This only concerns beginners"],correct:1,expl:"Under high adrenaline, fine motor skills degrade heavily — this is why muscle memory of repeated large motions takes priority over reasoned precision."},
    {q:"What does 'Slow is Smooth, Smooth is Fast' mean?",opts:["You must always act as slowly as possible","Slowing down slightly to stay methodical actually produces more effective execution than disorderly haste","Speed doesn't matter at all","This principle only applies to navigation"],correct:1,expl:"This naval/aviation/special-forces principle shows methodical execution, even slightly slower, is actually faster and more reliable than haste that generates errors."},
    {q:"Why verbalize each activation step, even alone?",opts:["It's useless if no one is listening","Verbalizing forces conscious confirmation of each step and reduces the risk of skipping one","It's only useful in a team","It unnecessarily slows down execution"],correct:1,expl:"Verbalization, even solo, acts as a confirmation loop that reduces the risk of omission under stress."},
    {q:"What is the most frequent panic error during an emergency activation?",opts:["Taking too long to check each step","Skipping a step, poorly deploying the antenna, or reversing the order of motions","Activating too calmly","Using both hands"],correct:1,expl:"These three errors recur most frequently in real cases of activation under panic."},
    {q:"The activation indicator doesn't light up after the correct sequence. What is the correct reaction?",opts:["Repeat the same sequence indefinitely","One retry only, then immediately switch to the backup system","Abandon all attempts","Wait several hours before retrying"],correct:1,expl:"One retry is enough to rule out a one-off glitch; beyond that, redundancy must be activated without delay."},
    {q:"Darkness, smoke, thick gloves: in these conditions, what should you rely on most?",opts:["Precise analytical reasoning","Motions trained in advance, repeated until automatic","Luck","Disorderly speed"],correct:1,expl:"In degraded conditions, only motions trained enough to become automatic remain actually executable."},
    {q:"What does 'Train the way you expect to perform' mean?",opts:["Drills are mere administrative formalities","Every drill must be executed as if it were a real emergency, to build the right reflexes","You should never train in advance","Only officers need to train"],correct:1,expl:"This MAP-wide principle reminds us that the quality of a drill directly determines the quality of real execution."},
    {q:"In the Trinity II case, why couldn't the liferafts be used?",opts:["They were defective","They were inflated on deck instead of in the water, and blew away in the storm","There were no liferafts on board","The crew refused to use them"],correct:1,expl:"An execution error under panic — inflating on deck instead of in the water — rendered both liferafts unusable within seconds."},
    {q:"Why did no one bring the EPIRB during the Trinity II abandonment?",opts:["It wasn't functional","In the panic of the evacuation, that motion had not become an automatic reflex","It was poorly registered","The vessel didn't have one"],correct:1,expl:"The EPIRB was present and functional, but the reflex to bring it hadn't been trained enough to survive the panic of evacuation."},
    {q:"What is the difference between the Trinity II case (L4) and Lady Mary (L3)?",opts:["There is no difference","Lady Mary illustrates a lack of upstream preparation; Trinity II illustrates a physical execution failure despite adequate equipment","Both cases only concern GMDSS theory","Trinity II doesn't concern the EPIRB"],correct:1,expl:"L3 deals with preparation (registration, maintenance); L4 deals with the physical execution of motions at the critical moment, even when preparation was correct."},
    {q:"What is the main goal of the 'Slow is Smooth, Smooth is Fast' section?",opts:["Encourage always acting as slowly as possible","Show that method and mastery ultimately produce faster, more reliable execution than haste","Replace training with theory","This only concerns automatic activations"],correct:1,expl:"This principle shows that slowing down slightly to stay methodical avoids errors that actually cost more time."},
    {q:"Facing an activation failure, why shouldn't you keep insisting indefinitely on the same system?",opts:["Because insisting is always the right strategy","Because redundancy exists precisely to switch quickly to a backup system in case of failure","Because backup systems never help","Because you must always wait for the Captain's instructions"],correct:1,expl:"Redundancy (seen in L2) is only useful if activated quickly after a limited number of failed attempts on the main system."},
    {q:"Why does this lesson's exercise include darkness, smoke, gloves, and noise?",opts:["To make the exercise unnecessarily hard","Because real activation rarely happens in ideal conditions, and training must reflect that reality","These are unimportant details","Only for military vessels"],correct:1,expl:"Reproducing degraded conditions in training prepares for real execution, which rarely happens in a comfortable context."},
    {q:"What is the main goal of lesson L4 in the Safety Department?",opts:["Re-explain the technical operation of the EPIRB","Learn to correctly execute activation motions under pressure, even when choice (L2) and preparation (L3) are correct","Study abandoning ship","Compare equipment manufacturers"],correct:1,expl:"L4 focuses solely on physical execution under pressure, without re-explaining theory already covered elsewhere."},
    {q:"Why doesn't this lesson develop full abandon-ship procedures?",opts:["Because that topic exclusively belongs to the future s5 module","Because it's never useful","Because it was already covered in L1","Because the format doesn't allow it"],correct:0,expl:"Per MAP's architecture rule, abandoning ship remains the exclusive domain of the future s5 module."},
  ],
  es:[
    {q:"Con adrenalina alta, ¿por qué se degrada la motricidad fina?",opts:["Nunca se degrada","La adrenalina reduce la precisión de los gestos finos; solo los gestos amplios entrenados siguen siendo fiables","Siempre mejora bajo estrés","Solo concierne a los principiantes"],correct:1,expl:"Con adrenalina alta, la motricidad fina se degrada mucho — por eso la memoria muscular de gestos amplios repetidos prima sobre la precisión razonada."},
    {q:"¿Qué significa 'Slow is Smooth, Smooth is Fast'?",opts:["Siempre hay que actuar lo más lento posible","Reducir ligeramente el ritmo para ser metódico produce en realidad una ejecución más eficaz que la prisa desordenada","La velocidad no importa en absoluto","Este principio solo se aplica a la navegación"],correct:1,expl:"Este principio naval/aviación/fuerzas especiales muestra que la ejecución metódica, aunque algo más lenta, es en realidad más rápida y fiable que la prisa que genera errores."},
    {q:"¿Por qué verbalizar cada paso de activación, incluso solo?",opts:["No sirve de nada si nadie escucha","Verbalizar obliga a confirmar conscientemente cada paso y reduce el riesgo de saltarse uno","Solo es útil en equipo","Ralentiza innecesariamente la ejecución"],correct:1,expl:"La verbalización, incluso en solitario, actúa como un bucle de confirmación que reduce el riesgo de omisión bajo estrés."},
    {q:"¿Cuál es el error de pánico más frecuente durante una activación de emergencia?",opts:["Tardar demasiado en comprobar cada paso","Saltarse un paso, desplegar mal la antena, o invertir el orden de los gestos","Activar con demasiada calma","Usar ambas manos"],correct:1,expl:"Estos tres errores se repiten con más frecuencia en casos reales de activación bajo pánico."},
    {q:"El indicador de activación no se enciende tras la secuencia correcta. ¿Cuál es la reacción correcta?",opts:["Repetir la misma secuencia indefinidamente","Un solo nuevo intento, luego cambiar inmediatamente al sistema de respaldo","Abandonar todo intento","Esperar varias horas antes de reintentar"],correct:1,expl:"Un solo nuevo intento basta para descartar un fallo puntual; más allá, hay que activar la redundancia sin demora."},
    {q:"Oscuridad, humo, guantes gruesos: en estas condiciones, ¿en qué hay que confiar más?",opts:["El razonamiento analítico preciso","Los gestos entrenados de antemano, repetidos hasta ser automáticos","La suerte","La rapidez desordenada"],correct:1,expl:"En condiciones degradadas, solo los gestos suficientemente entrenados para ser automáticos siguen siendo realmente ejecutables."},
    {q:"¿Qué significa 'Train the way you expect to perform'?",opts:["Los ejercicios son simples formalidades administrativas","Cada ejercicio debe ejecutarse como si fuera una emergencia real, para construir los reflejos correctos","Nunca hay que entrenarse de antemano","Solo los oficiales deben entrenarse"],correct:1,expl:"Este principio transversal de MAP recuerda que la calidad de un ejercicio determina directamente la calidad de la ejecución real."},
    {q:"En el caso Trinity II, ¿por qué no se pudieron usar las balsas salvavidas?",opts:["Estaban defectuosas","Se inflaron en cubierta en lugar de en el agua, y salieron volando en la tormenta","No había balsas a bordo","La tripulación se negó a usarlas"],correct:1,expl:"Un error de ejecución bajo pánico — inflar en cubierta en lugar de en el agua — inutilizó ambas balsas en segundos."},
    {q:"¿Por qué nadie llevó el EPIRB durante el abandono del Trinity II?",opts:["No era funcional","En el pánico de la evacuación, ese gesto no se había convertido en un reflejo automático","Estaba mal registrado","El buque no tenía uno"],correct:1,expl:"El EPIRB estaba presente y funcional, pero el reflejo de llevarlo no había sido entrenado lo suficiente para sobrevivir al pánico de la evacuación."},
    {q:"¿Cuál es la diferencia entre el caso Trinity II (L4) y Lady Mary (L3)?",opts:["No hay diferencia","Lady Mary ilustra una falta de preparación previa; Trinity II ilustra un fallo de ejecución física pese a un equipo adecuado","Ambos casos solo conciernen a la teoría GMDSS","Trinity II no concierne al EPIRB"],correct:1,expl:"L3 trata de la preparación (registro, mantenimiento); L4 trata de la ejecución física de los gestos en el momento crítico, incluso cuando la preparación fue correcta."},
    {q:"¿Cuál es el objetivo principal de la sección 'Slow is Smooth, Smooth is Fast'?",opts:["Fomentar actuar siempre lo más lento posible","Mostrar que el método y el dominio producen finalmente una ejecución más rápida y fiable que la prisa","Sustituir el entrenamiento por la teoría","Solo concierne a las activaciones automáticas"],correct:1,expl:"Este principio muestra que reducir ligeramente el ritmo para ser metódico evita errores que, en realidad, cuestan más tiempo."},
    {q:"Ante un fallo de activación, ¿por qué no hay que insistir indefinidamente en el mismo sistema?",opts:["Porque insistir siempre es la estrategia correcta","Porque la redundancia existe precisamente para cambiar rápido a un sistema de respaldo en caso de fallo","Porque los sistemas de respaldo nunca sirven","Porque siempre hay que esperar las instrucciones del Capitán"],correct:1,expl:"La redundancia (vista en L2) solo es útil si se activa rápidamente tras un número limitado de intentos fallidos en el sistema principal."},
    {q:"¿Por qué el ejercicio de esta lección incluye oscuridad, humo, guantes y ruido?",opts:["Para hacer el ejercicio innecesariamente difícil","Porque la activación real rara vez ocurre en condiciones ideales, y el entrenamiento debe reflejar esa realidad","Son detalles sin importancia","Solo para buques militares"],correct:1,expl:"Reproducir condiciones degradadas en el entrenamiento prepara para la ejecución real, que rara vez ocurre en un contexto cómodo."},
    {q:"¿Cuál es el objetivo principal de la lección L4 en el Safety Department?",opts:["Reexplicar el funcionamiento técnico del EPIRB","Aprender a ejecutar correctamente los gestos de activación bajo presión, incluso cuando la elección (L2) y la preparación (L3) son correctas","Estudiar el abandono del buque","Comparar fabricantes de equipos"],correct:1,expl:"L4 se centra únicamente en la ejecución física bajo presión, sin reexplicar la teoría ya cubierta en otro lugar."},
    {q:"¿Por qué esta lección no desarrolla los procedimientos completos de abandono del buque?",opts:["Porque ese tema pertenece exclusivamente al futuro módulo s5","Porque nunca es útil","Porque ya se vio en L1","Porque el formato no lo permite"],correct:0,expl:"Según la regla de arquitectura de MAP, abandonar el buque sigue siendo dominio exclusivo del futuro módulo s5."},
  ],
  pt:[
    {q:"Com adrenalina alta, por que a motricidade fina se degrada?",opts:["Nunca se degrada","A adrenalina reduz a precisão dos gestos finos; só os gestos amplos treinados continuam fiáveis","Melhora sempre sob stress","Só diz respeito aos principiantes"],correct:1,expl:"Com adrenalina alta, a motricidade fina degrada-se muito — por isso a memória muscular de gestos amplos repetidos tem prioridade sobre a precisão raciocinada."},
    {q:"O que significa 'Slow is Smooth, Smooth is Fast'?",opts:["Deve-se sempre agir o mais devagar possível","Abrandar ligeiramente para ser metódico produz na realidade uma execução mais eficaz do que a pressa desordenada","A velocidade não importa nada","Este princípio só se aplica à navegação"],correct:1,expl:"Este princípio naval/aviação/forças especiais mostra que a execução metódica, mesmo um pouco mais lenta, é na realidade mais rápida e fiável do que a pressa que gera erros."},
    {q:"Por que verbalizar cada passo de ativação, mesmo sozinho?",opts:["Não serve de nada se ninguém ouve","Verbalizar obriga a confirmar conscientemente cada passo e reduz o risco de saltar um","Só é útil em equipa","Atrasa desnecessariamente a execução"],correct:1,expl:"A verbalização, mesmo a solo, atua como um ciclo de confirmação que reduz o risco de omissão sob stress."},
    {q:"Qual é o erro de pânico mais frequente numa ativação de emergência?",opts:["Demorar demasiado a verificar cada passo","Saltar um passo, desdobrar mal a antena, ou inverter a ordem dos gestos","Ativar com demasiada calma","Usar ambas as mãos"],correct:1,expl:"Estes três erros repetem-se com mais frequência em casos reais de ativação sob pânico."},
    {q:"O indicador de ativação não acende após a sequência correta. Qual é a reação correta?",opts:["Repetir a mesma sequência indefinidamente","Uma só nova tentativa, depois mudar imediatamente para o sistema de reserva","Abandonar toda tentativa","Esperar várias horas antes de tentar novamente"],correct:1,expl:"Uma só nova tentativa basta para descartar uma falha pontual; além disso, deve-se ativar a redundância sem demora."},
    {q:"Escuridão, fumo, luvas grossas: nestas condições, no que se deve confiar mais?",opts:["No raciocínio analítico preciso","Nos gestos treinados antecipadamente, repetidos até se tornarem automáticos","Na sorte","Na rapidez desordenada"],correct:1,expl:"Em condições degradadas, só os gestos suficientemente treinados para se tornarem automáticos continuam realmente executáveis."},
    {q:"O que significa 'Train the way you expect to perform'?",opts:["Os exercícios são meras formalidades administrativas","Cada exercício deve ser executado como se fosse uma emergência real, para construir os reflexos certos","Nunca se deve treinar antecipadamente","Só os oficiais precisam de treinar"],correct:1,expl:"Este princípio transversal da MAP lembra que a qualidade de um exercício determina diretamente a qualidade da execução real."},
    {q:"No caso Trinity II, por que as jangadas salva-vidas não puderam ser usadas?",opts:["Estavam defeituosas","Foram infladas no convés em vez de na água, e voaram na tempestade","Não havia jangadas a bordo","A tripulação recusou-se a usá-las"],correct:1,expl:"Um erro de execução sob pânico — inflar no convés em vez de na água — inutilizou ambas as jangadas em segundos."},
    {q:"Por que ninguém levou o EPIRB durante o abandono do Trinity II?",opts:["Não era funcional","No pânico da evacuação, esse gesto não se tinha tornado um reflexo automático","Estava mal registado","O navio não tinha um"],correct:1,expl:"O EPIRB estava presente e funcional, mas o reflexo de o levar não tinha sido treinado o suficiente para sobreviver ao pânico da evacuação."},
    {q:"Qual é a diferença entre o caso Trinity II (L4) e Lady Mary (L3)?",opts:["Não há diferença","Lady Mary ilustra uma falta de preparação prévia; Trinity II ilustra uma falha de execução física apesar de equipamento adequado","Ambos os casos só dizem respeito à teoria GMDSS","Trinity II não diz respeito ao EPIRB"],correct:1,expl:"L3 trata da preparação (registo, manutenção); L4 trata da execução física dos gestos no momento crítico, mesmo quando a preparação estava correta."},
    {q:"Qual é o objetivo principal da secção 'Slow is Smooth, Smooth is Fast'?",opts:["Encorajar a agir sempre o mais devagar possível","Mostrar que o método e o domínio produzem finalmente uma execução mais rápida e fiável do que a pressa","Substituir o treino pela teoria","Só diz respeito às ativações automáticas"],correct:1,expl:"Este princípio mostra que abrandar ligeiramente para ser metódico evita erros que, na realidade, custam mais tempo."},
    {q:"Perante uma falha de ativação, por que não se deve insistir indefinidamente no mesmo sistema?",opts:["Porque insistir é sempre a estratégia certa","Porque a redundância existe precisamente para mudar rapidamente para um sistema de reserva em caso de falha","Porque os sistemas de reserva nunca ajudam","Porque se deve esperar sempre pelas instruções do Comandante"],correct:1,expl:"A redundância (vista em L2) só é útil se for ativada rapidamente após um número limitado de tentativas falhadas no sistema principal."},
    {q:"Por que o exercício desta lição inclui escuridão, fumo, luvas e ruído?",opts:["Para tornar o exercício desnecessariamente difícil","Porque a ativação real raramente acontece em condições ideais, e o treino deve refletir essa realidade","São detalhes sem importância","Só para navios militares"],correct:1,expl:"Reproduzir condições degradadas no treino prepara para a execução real, que raramente acontece num contexto confortável."},
    {q:"Qual é o objetivo principal da lição L4 no Safety Department?",opts:["Reexplicar o funcionamento técnico do EPIRB","Aprender a executar corretamente os gestos de ativação sob pressão, mesmo quando a escolha (L2) e a preparação (L3) estão corretas","Estudar o abandono do navio","Comparar fabricantes de equipamento"],correct:1,expl:"L4 foca-se unicamente na execução física sob pressão, sem reexplicar a teoria já coberta noutro lugar."},
    {q:"Por que esta lição não desenvolve os procedimentos completos de abandono do navio?",opts:["Porque esse tema pertence exclusivamente ao futuro módulo s5","Porque nunca é útil","Porque já foi visto em L1","Porque o formato não o permite"],correct:0,expl:"Segundo a regra de arquitetura da MAP, abandonar o navio continua a ser domínio exclusivo do futuro módulo s5."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
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

// QUIZ — FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Pourquoi la motricité fine se dégrade-t-elle sous forte adrénaline ?",opts:["Elle ne se dégrade jamais","Seuls les gestes larges entraînés restent fiables sous stress","Elle s'améliore toujours","Cela ne concerne que la théorie"],correct:1,expl:"Sous forte adrénaline, seule la mémoire musculaire de gestes larges et répétés reste réellement fiable."},
    {q:"Que signifie 'Slow is Smooth, Smooth is Fast' ?",opts:["Il faut toujours agir lentement","Ralentir légèrement pour rester méthodique produit une exécution plus rapide et fiable","La vitesse n'a pas d'importance","Cela concerne uniquement l'aviation"],correct:1,expl:"L'exécution méthodique, même légèrement plus lente, évite les erreurs qui coûtent plus de temps qu'un léger ralentissement."},
    {q:"L'indicateur ne s'allume pas après la séquence correcte. Que faire ?",opts:["Répéter indéfiniment","Un seul nouvel essai, puis basculer sur le système de secours","Abandonner","Attendre des heures"],correct:1,expl:"Un seul nouvel essai suffit avant d'activer la redondance sans délai."},
    {q:"Dans le cas Trinity II, pourquoi les radeaux étaient-ils inutilisables ?",opts:["Ils étaient défectueux","Gonflés sur le pont au lieu de l'eau, ils se sont envolés dans la tempête","Il n'y en avait pas à bord","L'équipage a refusé de les utiliser"],correct:1,expl:"Une erreur d'exécution sous panique a rendu les radeaux inutilisables en quelques secondes."},
    {q:"Que signifie 'Train the way you expect to perform' ?",opts:["Les exercices sont de simples formalités","Chaque exercice doit être exécuté comme une vraie urgence pour construire les bons réflexes","Il ne faut jamais s'entraîner","Seuls les officiers s'entraînent"],correct:1,expl:"La qualité de l'exercice détermine directement la qualité de l'exécution le jour où ça compte réellement."},
  ],
  en:[
    {q:"Why do fine motor skills degrade under high adrenaline?",opts:["They never degrade","Only trained large motions remain reliable under stress","They always improve","This only concerns theory"],correct:1,expl:"Under high adrenaline, only muscle memory of repeated large motions remains actually reliable."},
    {q:"What does 'Slow is Smooth, Smooth is Fast' mean?",opts:["You must always act slowly","Slowing down slightly to stay methodical produces faster, more reliable execution","Speed doesn't matter","This only concerns aviation"],correct:1,expl:"Methodical execution, even slightly slower, avoids errors that cost more time than a slight slowdown."},
    {q:"The indicator doesn't light up after the correct sequence. What do you do?",opts:["Repeat indefinitely","One retry only, then switch to the backup system","Give up","Wait for hours"],correct:1,expl:"One retry is enough before activating redundancy without delay."},
    {q:"In the Trinity II case, why were the liferafts unusable?",opts:["They were defective","Inflated on deck instead of in the water, they blew away in the storm","There were none on board","The crew refused to use them"],correct:1,expl:"An execution error under panic rendered the liferafts unusable within seconds."},
    {q:"What does 'Train the way you expect to perform' mean?",opts:["Drills are mere formalities","Every drill must be executed as a real emergency to build the right reflexes","You should never train","Only officers train"],correct:1,expl:"The quality of the drill directly determines the quality of execution the day it truly counts."},
  ],
  es:[
    {q:"¿Por qué se degrada la motricidad fina con adrenalina alta?",opts:["Nunca se degrada","Solo los gestos amplios entrenados siguen fiables bajo estrés","Siempre mejora","Solo concierne a la teoría"],correct:1,expl:"Con adrenalina alta, solo la memoria muscular de gestos amplios repetidos sigue siendo realmente fiable."},
    {q:"¿Qué significa 'Slow is Smooth, Smooth is Fast'?",opts:["Siempre hay que actuar lento","Reducir ligeramente el ritmo produce una ejecución más rápida y fiable","La velocidad no importa","Solo concierne a la aviación"],correct:1,expl:"La ejecución metódica, aunque algo más lenta, evita errores que cuestan más tiempo que una ligera desaceleración."},
    {q:"El indicador no se enciende tras la secuencia correcta. ¿Qué hacer?",opts:["Repetir indefinidamente","Un solo nuevo intento, luego cambiar al sistema de respaldo","Abandonar","Esperar horas"],correct:1,expl:"Un solo nuevo intento basta antes de activar la redundancia sin demora."},
    {q:"En el caso Trinity II, ¿por qué eran inutilizables las balsas?",opts:["Estaban defectuosas","Infladas en cubierta en lugar de en el agua, salieron volando en la tormenta","No había ninguna a bordo","La tripulación se negó a usarlas"],correct:1,expl:"Un error de ejecución bajo pánico inutilizó las balsas en segundos."},
    {q:"¿Qué significa 'Train the way you expect to perform'?",opts:["Los ejercicios son simples formalidades","Cada ejercicio debe ejecutarse como una emergencia real para construir los reflejos correctos","Nunca hay que entrenarse","Solo entrenan los oficiales"],correct:1,expl:"La calidad del ejercicio determina directamente la calidad de la ejecución el día que realmente cuenta."},
  ],
  pt:[
    {q:"Por que a motricidade fina se degrada com adrenalina alta?",opts:["Nunca se degrada","Só os gestos amplos treinados continuam fiáveis sob stress","Melhora sempre","Só diz respeito à teoria"],correct:1,expl:"Com adrenalina alta, só a memória muscular de gestos amplos repetidos continua realmente fiável."},
    {q:"O que significa 'Slow is Smooth, Smooth is Fast'?",opts:["Deve-se sempre agir devagar","Abrandar ligeiramente produz uma execução mais rápida e fiável","A velocidade não importa","Só diz respeito à aviação"],correct:1,expl:"A execução metódica, mesmo um pouco mais lenta, evita erros que custam mais tempo do que um ligeiro abrandamento."},
    {q:"O indicador não acende após a sequência correta. O que fazer?",opts:["Repetir indefinidamente","Uma só nova tentativa, depois mudar para o sistema de reserva","Desistir","Esperar horas"],correct:1,expl:"Uma só nova tentativa basta antes de ativar a redundância sem demora."},
    {q:"No caso Trinity II, por que as jangadas eram inutilizáveis?",opts:["Estavam defeituosas","Infladas no convés em vez de na água, voaram na tempestade","Não havia nenhuma a bordo","A tripulação recusou-se a usá-las"],correct:1,expl:"Um erro de execução sob pânico inutilizou as jangadas em segundos."},
    {q:"O que significa 'Train the way you expect to perform'?",opts:["Os exercícios são meras formalidades","Cada exercício deve ser executado como uma emergência real para construir os reflexos certos","Nunca se deve treinar","Só os oficiais treinam"],correct:1,expl:"A qualidade do exercício determina diretamente a qualidade da execução no dia em que realmente conta."},
  ],
};

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.red}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.red,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.red:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"À quand remonte ta dernière pratique d'un exercice d'activation d'urgence, exécutée exactement comme si des vies en dépendaient ? Tes mains sauraient-elles quoi faire aujourd'hui sans réfléchir ?",
    en:"When was the last time you practised an emergency activation exactly as if lives depended on it? Would your hands know what to do today without thinking?",
    es:"¿Cuándo fue la última vez que practicaste una activación de emergencia exactamente como si vidas dependieran de ello? ¿Tus manos sabrían qué hacer hoy sin pensar?",
    pt:"Quando foi a última vez que praticaste uma ativação de emergência exatamente como se vidas dependessem disso? As tuas mãos saberiam o que fazer hoje sem pensar?",
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

// SHARED UI
function Stars(){const s=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🆘 Safety · EPIRB, SART & GMDSS · Leçon 4/5 · ⭐ Premium",
      title:"Activate — Executing the Right Actions Under Pressure",
      intro:"L1 a appris à reconnaître la détresse. L2 à choisir le bon équipement. L3 à le préparer. Cette leçon répond à une quatrième question : comment exécuter correctement les gestes d'activation eux-mêmes, quand l'adrénaline dégrade la précision ?",
      p0:"LE MOMENT OÙ TOUT CE QUI A ÉTÉ PRÉPARÉ EST MIS À L'ÉPREUVE",s0t:"Le maillon final n'est pas toujours celui qu'on croit",
      s0:"Un bon choix (L2) et une bonne préparation (L3) ne servent à rien si l'exécution physique échoue sous la panique.\n\nQUAND UTILISER CE PRINCIPE ? Dès la première seconde de l'activation, sans exception.\nPOURQUOI L'EXÉCUTION COMPTE-T-ELLE AUTANT ? Parce que le corps sous adrénaline n'obéit plus à la réflexion, seulement à l'entraînement.\nQUELLE ERREUR COÛTE LE PLUS DE VIES ? Croire que 'je saurai le faire le moment venu' sans s'être jamais réellement entraîné.",
      p1:"MUSCLE MEMORY SOUS PRESSION",s1t:"Ce que le corps retient quand l'esprit panique",
      s1:"Sous forte adrénaline, la motricité fine se dégrade fortement. Seuls les gestes larges, répétés jusqu'à devenir automatiques, restent réellement exécutables.",
      p2:"SLOW IS SMOOTH. SMOOTH IS FAST.",s2t:"Le principe des marines, de l'aviation et des forces spéciales",
      s2:"Sous stress, beaucoup veulent aller trop vite et commettent des erreurs. Le vrai professionnel ralentit légèrement, reste méthodique, exécute correctement — et finit, en réalité, plus vite qu'en se précipitant dans le désordre.",
      p3:"VERBALISER EN ACTIVANT",s3t:"Une boucle fermée même seul",
      s3:"Dire à voix haute chaque étape en l'exécutant force une confirmation consciente et réduit fortement le risque d'en sauter une, même sans personne pour l'entendre.",
      p4:"ERREURS DE PANIQUE FRÉQUENTES",s4t:"Sauter, mal déployer, inverser",
      s4:"Sauter une étape, mal étendre l'antenne, inverser l'ordre des gestes : ces trois erreurs reviennent le plus souvent dans les cas réels d'activation sous panique.",
      p5:"ACTIVER À PLUSIEURS",s5t:"Une coordination minimale au moment précis de l'activation",
      s5:"Quand plusieurs personnes sont impliquées, une confirmation croisée rapide — 'activé', 'confirmé' — évite les doubles tentatives ou les oublis mutuels.",
      p6:"QUAND L'ACTIVATION NE SE PASSE PAS COMME PRÉVU",s6t:"Le réflexe de repli",
      s6:"Un seul nouvel essai suffit à écarter un raté ponctuel. Au-delà, basculer immédiatement sur le système de secours plutôt que de s'acharner.",
      p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"⚠️ CAS RÉEL",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 4",
      sumP:["Un bon choix et une bonne préparation ne suffisent pas si l'exécution échoue sous panique","Slow is Smooth, Smooth is Fast : la méthode bat la précipitation","Verbaliser chaque étape réduit le risque d'en sauter une","Sauter une étape, mal déployer l'antenne, inverser l'ordre : les 3 erreurs les plus fréquentes","Un seul nouvel essai, puis basculer sur la redondance sans s'acharner"],
      learnedP:["Muscle Memory sous pression","Slow is Smooth, Smooth is Fast","Verbaliser en activant","Erreurs de panique fréquentes","Le réflexe de repli quand ça ne marche pas"],
      safetyMsg:"Under pressure, you don't rise to the occasion—you fall to the level of your training.",
    },
    en:{
      badge:"🆘 Safety · EPIRB, SART & GMDSS · Lesson 4/5 · ⭐ Premium",
      title:"Activate — Executing the Right Actions Under Pressure",
      intro:"L1 taught recognizing distress. L2 taught choosing the right equipment. L3 taught preparing it. This lesson answers a fourth question: how do you correctly execute the activation motions themselves, when adrenaline degrades precision?",
      p0:"THE MOMENT EVERYTHING PREPARED IS PUT TO THE TEST",s0t:"The final link isn't always where you'd expect",
      s0:"A good choice (L2) and good preparation (L3) are useless if physical execution fails under panic.\n\nWHEN TO USE THIS PRINCIPLE? From the very first second of activation, no exception.\nWHY DOES EXECUTION MATTER SO MUCH? Because the body under adrenaline no longer obeys reasoning, only training.\nWHICH ERROR COSTS THE MOST LIVES? Believing 'I'll know how to do it when the time comes' without ever having actually trained.",
      p1:"MUSCLE MEMORY UNDER PRESSURE",s1t:"What the body remembers when the mind panics",
      s1:"Under high adrenaline, fine motor skills degrade heavily. Only large motions, repeated until automatic, remain actually executable.",
      p2:"SLOW IS SMOOTH. SMOOTH IS FAST.",s2t:"The naval, aviation, and special-forces principle",
      s2:"Under stress, many want to go too fast and make mistakes. The real professional slows down slightly, stays methodical, executes correctly — and ends up, in reality, faster than by rushing in disorder.",
      p3:"VERBALIZE WHILE ACTIVATING",s3t:"A closed loop even alone",
      s3:"Saying each step out loud while executing it forces conscious confirmation and greatly reduces the risk of skipping one, even with no one to hear it.",
      p4:"FREQUENT PANIC ERRORS",s4t:"Skipping, misdeploying, reversing",
      s4:"Skipping a step, poorly deploying the antenna, reversing the order of motions: these three errors recur most often in real cases of activation under panic.",
      p5:"ACTIVATING WITH OTHERS",s5t:"Minimal coordination at the precise moment of activation",
      s5:"When several people are involved, a quick cross-confirmation — 'activated', 'confirmed' — prevents double attempts or mutual omissions.",
      p6:"WHEN ACTIVATION DOESN'T GO AS PLANNED",s6t:"The fallback reflex",
      s6:"One retry is enough to rule out a one-off glitch. Beyond that, switch immediately to the backup system rather than insisting.",
      p7:"🎯 OPERATIONAL EXERCISE",p8:"⚠️ REAL ACCIDENT CASE",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 4",
      sumP:["A good choice and good preparation aren't enough if execution fails under panic","Slow is Smooth, Smooth is Fast: method beats haste","Verbalizing each step reduces the risk of skipping one","Skipping a step, misdeploying the antenna, reversing order: the 3 most frequent errors","One retry only, then switch to redundancy without insisting"],
      learnedP:["Muscle Memory under pressure","Slow is Smooth, Smooth is Fast","Verbalizing while activating","Frequent panic errors","The fallback reflex when it doesn't work"],
      safetyMsg:"Under pressure, you don't rise to the occasion—you fall to the level of your training.",
    },
    es:{
      badge:"🆘 Seguridad · EPIRB, SART y GMDSS · Lección 4/5 · ⭐ Premium",
      title:"Activate — Executing the Right Actions Under Pressure",
      intro:"L1 enseñó a reconocer la emergencia. L2 a elegir el equipo correcto. L3 a prepararlo. Esta lección responde a una cuarta pregunta: ¿cómo ejecutar correctamente los gestos de activación cuando la adrenalina degrada la precisión?",
      p0:"EL MOMENTO EN QUE TODO LO PREPARADO SE PONE A PRUEBA",s0t:"El eslabón final no siempre es el que se cree",
      s0:"Una buena elección (L2) y una buena preparación (L3) no sirven de nada si la ejecución física falla bajo pánico.\n\n¿CUÁNDO USAR ESTE PRINCIPIO? Desde el primer segundo de la activación, sin excepción.\n¿POR QUÉ IMPORTA TANTO LA EJECUCIÓN? Porque el cuerpo bajo adrenalina ya no obedece al razonamiento, solo al entrenamiento.\n¿QUÉ ERROR CUESTA MÁS VIDAS? Creer que 'sabré hacerlo cuando llegue el momento' sin haberse entrenado nunca de verdad.",
      p1:"MUSCLE MEMORY BAJO PRESIÓN",s1t:"Lo que el cuerpo recuerda cuando la mente entra en pánico",
      s1:"Con adrenalina alta, la motricidad fina se degrada mucho. Solo los gestos amplios, repetidos hasta ser automáticos, siguen siendo realmente ejecutables.",
      p2:"SLOW IS SMOOTH. SMOOTH IS FAST.",s2t:"El principio naval, de aviación y de fuerzas especiales",
      s2:"Bajo estrés, muchos quieren ir demasiado rápido y cometen errores. El verdadero profesional reduce ligeramente el ritmo, permanece metódico, ejecuta correctamente — y termina, en realidad, más rápido que precipitándose en el desorden.",
      p3:"VERBALIZAR AL ACTIVAR",s3t:"Un bucle cerrado incluso a solas",
      s3:"Decir en voz alta cada paso mientras se ejecuta obliga a una confirmación consciente y reduce mucho el riesgo de saltarse uno, incluso sin nadie que lo escuche.",
      p4:"ERRORES DE PÁNICO FRECUENTES",s4t:"Saltar, desplegar mal, invertir",
      s4:"Saltarse un paso, desplegar mal la antena, invertir el orden de los gestos: estos tres errores se repiten con más frecuencia en casos reales de activación bajo pánico.",
      p5:"ACTIVAR CON OTROS",s5t:"Coordinación mínima en el momento preciso de la activación",
      s5:"Cuando hay varias personas implicadas, una confirmación cruzada rápida — 'activado', 'confirmado' — evita dobles intentos u olvidos mutuos.",
      p6:"CUANDO LA ACTIVACIÓN NO SALE COMO SE ESPERABA",s6t:"El reflejo de repliegue",
      s6:"Un solo nuevo intento basta para descartar un fallo puntual. Más allá, cambiar inmediatamente al sistema de respaldo en lugar de insistir.",
      p7:"🎯 EJERCICIO OPERATIVO",p8:"⚠️ CASO REAL",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 4",
      sumP:["Una buena elección y una buena preparación no bastan si la ejecución falla bajo pánico","Slow is Smooth, Smooth is Fast: el método vence a la prisa","Verbalizar cada paso reduce el riesgo de saltarse uno","Saltarse un paso, desplegar mal la antena, invertir el orden: los 3 errores más frecuentes","Un solo nuevo intento, luego cambiar a la redundancia sin insistir"],
      learnedP:["Muscle Memory bajo presión","Slow is Smooth, Smooth is Fast","Verbalizar al activar","Errores de pánico frecuentes","El reflejo de repliegue cuando no funciona"],
      safetyMsg:"Under pressure, you don't rise to the occasion—you fall to the level of your training.",
    },
    pt:{
      badge:"🆘 Segurança · EPIRB, SART e GMDSS · Lição 4/5 · ⭐ Premium",
      title:"Activate — Executing the Right Actions Under Pressure",
      intro:"L1 ensinou a reconhecer a emergência. L2 a escolher o equipamento certo. L3 a prepará-lo. Esta lição responde a uma quarta pergunta: como executar corretamente os gestos de ativação quando a adrenalina degrada a precisão?",
      p0:"O MOMENTO EM QUE TUDO O QUE FOI PREPARADO É POSTO À PROVA",s0t:"O elo final nem sempre é onde se pensa",
      s0:"Uma boa escolha (L2) e uma boa preparação (L3) não servem de nada se a execução física falhar sob pânico.\n\nQUANDO USAR ESTE PRINCÍPIO? Desde o primeiro segundo da ativação, sem exceção.\nPOR QUE A EXECUÇÃO IMPORTA TANTO? Porque o corpo sob adrenalina já não obedece ao raciocínio, só ao treino.\nQUE ERRO CUSTA MAIS VIDAS? Acreditar que 'saberei fazê-lo quando chegar a hora' sem nunca se ter treinado de verdade.",
      p1:"MUSCLE MEMORY SOB PRESSÃO",s1t:"O que o corpo retém quando a mente entra em pânico",
      s1:"Com adrenalina alta, a motricidade fina degrada-se muito. Só os gestos amplos, repetidos até se tornarem automáticos, continuam realmente executáveis.",
      p2:"SLOW IS SMOOTH. SMOOTH IS FAST.",s2t:"O princípio naval, da aviação e das forças especiais",
      s2:"Sob stress, muitos querem ir depressa demais e cometem erros. O verdadeiro profissional abranda ligeiramente, mantém-se metódico, executa corretamente — e acaba, na realidade, mais rápido do que se precipitando na desordem.",
      p3:"VERBALIZAR AO ATIVAR",s3t:"Um ciclo fechado mesmo sozinho",
      s3:"Dizer em voz alta cada passo enquanto o executa obriga a uma confirmação consciente e reduz muito o risco de saltar um, mesmo sem ninguém a ouvir.",
      p4:"ERROS DE PÂNICO FREQUENTES",s4t:"Saltar, desdobrar mal, inverter",
      s4:"Saltar um passo, desdobrar mal a antena, inverter a ordem dos gestos: estes três erros repetem-se com mais frequência em casos reais de ativação sob pânico.",
      p5:"ATIVAR COM OUTROS",s5t:"Coordenação mínima no momento preciso da ativação",
      s5:"Quando várias pessoas estão envolvidas, uma confirmação cruzada rápida — 'ativado', 'confirmado' — evita duplas tentativas ou esquecimentos mútuos.",
      p6:"QUANDO A ATIVAÇÃO NÃO CORRE COMO PREVISTO",s6t:"O reflexo de recuo",
      s6:"Uma só nova tentativa basta para descartar uma falha pontual. Além disso, mudar imediatamente para o sistema de reserva em vez de insistir.",
      p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"⚠️ CASO REAL",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 4",
      sumP:["Uma boa escolha e uma boa preparação não bastam se a execução falhar sob pânico","Slow is Smooth, Smooth is Fast: o método vence a pressa","Verbalizar cada passo reduz o risco de saltar um","Saltar um passo, desdobrar mal a antena, inverter a ordem: os 3 erros mais frequentes","Uma só nova tentativa, depois mudar para a redundância sem insistir"],
      learnedP:["Muscle Memory sob pressão","Slow is Smooth, Smooth is Fast","Verbalizar ao ativar","Erros de pânico frequentes","O reflexo de recuo quando não funciona"],
      safetyMsg:"Under pressure, you don't rise to the occasion—you fall to the level of your training.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS2_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/5":lang==="en"?"Lesson 4/5":lang==="es"?"Lección 4/5":"Lição 4/5"}</div>
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

            <SL icon="🧠" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧠</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧠 {lang==="fr"?"DÉGRADATION MOTRICE — INTERACTIF":lang==="en"?"MOTOR DEGRADATION — INTERACTIVE":lang==="es"?"DEGRADACIÓN MOTORA — INTERACTIVO":"DEGRADAÇÃO MOTORA — INTERATIVO"}</div><MotorDegradationSVG lang={lang}/></Card>

            <SL icon="🐢" text={lc.p2} color={C.gold2}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🐢</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="🗣️" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🗣️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⏱️ {lang==="fr"?"SÉQUENCE CHRONOMÉTRÉE — INTERACTIF":lang==="en"?"TIMED SEQUENCE — INTERACTIVE":lang==="es"?"SECUENCIA CRONOMETRADA — INTERACTIVO":"SEQUÊNCIA CRONOMETRADA — INTERATIVO"}</div><TimedSequenceSVG lang={lang}/></Card>

            <SL icon="⚠️" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚠️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚠️ {lang==="fr"?"ERREURS DE PANIQUE — INTERACTIF":lang==="en"?"PANIC ERRORS — INTERACTIVE":lang==="es"?"ERRORES DE PÁNICO — INTERACTIVO":"ERROS DE PÂNICO — INTERATIVO"}</div><PanicErrorsSVG lang={lang}/></Card>

            <SL icon="🤝" text={lc.p5} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🤝</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="🔁" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔁</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌳 {lang==="fr"?"RÉFLEXE DE REPLI — INTERACTIF":lang==="en"?"FALLBACK REFLEX — INTERACTIVE":lang==="es"?"REFLEJO DE REPLIEGUE — INTERACTIVO":"REFLEXO DE RECUO — INTERATIVO"}</div><FallbackTreeSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p8} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>

            <SL icon="🪞" text={lc.p10} color={C.purple}/>
            <div style={{marginBottom:14}}><SafetyReflection lang={lang}/></div>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(192,57,43,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final — Activation Sous Pression":lang==="en"?"Final Quiz — Activation Under Pressure":lang==="es"?"Quiz Final — Activación Bajo Presión":"Quiz Final — Ativação Sob Pressão"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 4/5":"questions · Lesson 4/5"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🆘</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 5 — LEÇONS DU SAR RÉEL →":lang==="en"?"LESSON 5 — REAL SAR LESSONS →":lang==="es"?"LECCIÓN 5 — LECCIONES SAR REALES →":"LIÇÃO 5 — LIÇÕES SAR REAIS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
