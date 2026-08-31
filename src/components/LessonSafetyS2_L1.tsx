import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Sécurité", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Safety", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Seguridad", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Segurança", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — POINT OF NO RETURN
// ══════════════════════════════════════
function PointOfNoReturnSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:0, color:C.green, label:{fr:"Normal",en:"Normal",es:"Normal",pt:"Normal"},
      desc:{fr:"Fonctionnement habituel. Aucun signal ne sort de l'ordinaire.",en:"Normal operation. No signal is out of the ordinary.",es:"Funcionamiento habitual. Ninguna señal fuera de lo común.",pt:"Funcionamento habitual. Nenhum sinal fora do comum."} },
    { id:1, color:C.teal, label:{fr:"Incident",en:"Incident",es:"Incidente",pt:"Incidente"},
      desc:{fr:"Un événement isolé et gérable — une alarme ponctuelle, un bruit inhabituel.",en:"An isolated, manageable event — a one-off alarm, an unusual noise.",es:"Un evento aislado y manejable — una alarma puntual, un ruido inusual.",pt:"Um evento isolado e gerível — um alarme pontual, um ruído invulgar."} },
    { id:2, color:C.blue2, label:{fr:"Situation anormale",en:"Abnormal situation",es:"Situación anormal",pt:"Situação anormal"},
      desc:{fr:"Plusieurs signaux persistent ou s'accumulent. Ce n'est plus isolé, mais pas encore critique.",en:"Several signals persist or accumulate. No longer isolated, not yet critical.",es:"Varias señales persisten o se acumulan. Ya no es aislado, pero aún no es crítico.",pt:"Vários sinais persistem ou acumulam-se. Já não é isolado, mas ainda não é crítico."} },
    { id:3, color:C.orange, label:{fr:"Urgence",en:"Emergency",es:"Emergencia",pt:"Emergência"},
      desc:{fr:"La situation exige une action immédiate. Le temps de réflexion se réduit fortement.",en:"The situation demands immediate action. Time to think shrinks sharply.",es:"La situación exige una acción inmediata. El tiempo para pensar se reduce drásticamente.",pt:"A situação exige ação imediata. O tempo para pensar reduz-se drasticamente."} },
    { id:4, color:C.red, label:{fr:"Détresse",en:"Distress",es:"Socorro",pt:"Perigo"},
      desc:{fr:"Danger grave et imminent pour des vies humaines. L'alerte doit être déclarée maintenant.",en:"Grave and imminent danger to human life. The alert must be declared now.",es:"Peligro grave e inminente para vidas humanas. La alerta debe declararse ahora.",pt:"Perigo grave e iminente para vidas humanas. O alerta deve ser declarado agora."} },
    { id:5, color:"#7a1f1f", label:{fr:"Point de non-retour",en:"Point of No Return",es:"Punto de no retorno",pt:"Ponto sem retorno"},
      desc:{fr:"Le temps disponible pour agir efficacement s'est épuisé. Ce qui suit dépend de décisions déjà prises — ou non prises.",en:"The available time to act effectively has run out. What follows depends on decisions already made — or not made.",es:"El tiempo disponible para actuar eficazmente se ha agotado. Lo que sigue depende de decisiones ya tomadas — o no tomadas.",pt:"O tempo disponível para agir eficazmente esgotou-se. O que se segue depende de decisões já tomadas — ou não tomadas."} },
  ];
  const sel_ = sel!==null ? steps[sel] : null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        {steps.map((s,i)=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",
              marginLeft:i*10,
              background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:s.color,flexShrink:0}}/>
            <div style={{fontSize:11,fontWeight:700,color:s.color}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      {!sel_&&<div style={{textAlign:"center",marginTop:6,fontSize:10,color:C.muted}}>{lang==="fr"?"Touche un palier pour comprendre la bascule":lang==="en"?"Tap a stage to understand the shift":lang==="es"?"Toca una etapa para entender el cambio":"Toque num estágio para entender a mudança"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — COST ASYMMETRY
// ══════════════════════════════════════
function CostAsymmetrySVG({ lang }) {
  const [side, setSide] = useState("false");
  const d = {
    false:{fr:"Une fausse alerte corrigée coûte quelques minutes de vérification, une légère gêne administrative, et parfois un peu d'amour-propre. Rien d'irréversible.",
           en:"A corrected false alarm costs a few minutes of verification, minor administrative hassle, and sometimes a bit of pride. Nothing irreversible.",
           es:"Una falsa alarma corregida cuesta unos minutos de verificación, una ligera molestia administrativa y a veces un poco de orgullo. Nada irreversible.",
           pt:"Um falso alarme corrigido custa alguns minutos de verificação, um leve incómodo administrativo e por vezes algum orgulho. Nada irreversível."},
    real:{fr:"Une détresse réelle non déclarée à temps réduit chaque minute la marge de sauvetage possible — jusqu'à ce qu'elle disparaisse complètement.",
          en:"A real distress not declared in time reduces the rescue margin every minute — until it disappears completely.",
          es:"Una emergencia real no declarada a tiempo reduce cada minuto el margen de rescate posible — hasta que desaparece por completo.",
          pt:"Uma emergência real não declarada a tempo reduz a cada minuto a margem de resgate possível — até desaparecer completamente."},
  };
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["false","real"].map(k=>(
          <button key={k} onClick={()=>setSide(k)} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${side===k?(k==="false"?C.teal:C.red):"rgba(255,255,255,0.12)"}`,background:side===k?`${k==="false"?C.teal:C.red}22`:"rgba(255,255,255,0.04)",color:side===k?(k==="false"?C.teal:C.red):C.muted,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {k==="false"?(lang==="fr"?"FAUSSE ALERTE":lang==="en"?"FALSE ALARM":lang==="es"?"FALSA ALARMA":"FALSO ALARME"):(lang==="fr"?"DÉTRESSE NON DÉCLARÉE":lang==="en"?"UNDECLARED DISTRESS":lang==="es"?"EMERGENCIA NO DECLARADA":"EMERGÊNCIA NÃO DECLARADA")}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:12,background:side==="false"?"rgba(10,138,108,0.1)":"rgba(192,57,43,0.1)",border:`1px solid ${side==="false"?C.teal:C.red}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{d[side][lang]||d[side].fr}</div>
      <div style={{marginTop:8,fontSize:10,color:C.gold2,lineHeight:1.6,fontStyle:"italic",textAlign:"center"}}>
        {lang==="fr"?"Mariners are trained to avoid false alarms. They must also be trained not to fear them.":
         lang==="en"?"Mariners are trained to avoid false alarms. They must also be trained not to fear them.":
         lang==="es"?"Mariners are trained to avoid false alarms. They must also be trained not to fear them.":
         "Mariners are trained to avoid false alarms. They must also be trained not to fear them."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — WARNING SIGNS
// ══════════════════════════════════════
function WarningSignsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const signs = [
    { id:"smoke", icon:"💨", color:C.orange, label:{fr:"Odeur croissante",en:"Growing smell",es:"Olor creciente",pt:"Cheiro crescente"},
      desc:{fr:"Une odeur de fumée ou de brûlé qui augmente, même légèrement, ne doit jamais être ignorée ou remise à plus tard.",en:"A smell of smoke or burning that increases, even slightly, must never be ignored or postponed.",es:"Un olor a humo o quemado que aumenta, aunque sea levemente, nunca debe ignorarse ni posponerse.",pt:"Um cheiro a fumo ou queimado que aumenta, mesmo ligeiramente, nunca deve ser ignorado ou adiado."} },
    { id:"pump", icon:"🔧", color:C.blue2, label:{fr:"Pompe en continu",en:"Continuous pump",es:"Bomba continua",pt:"Bomba contínua"},
      desc:{fr:"Une pompe de cale qui tourne sans interruption prolongée indique une entrée d'eau qui dépasse le régime normal.",en:"A bilge pump running without prolonged interruption indicates water ingress beyond the normal rate.",es:"Una bomba de sentina que funciona sin interrupción prolongada indica una entrada de agua que supera el ritmo normal.",pt:"Uma bomba de porão a funcionar sem interrupção prolongada indica uma entrada de água acima do ritmo normal."} },
    { id:"list", icon:"📐", color:C.gold2, label:{fr:"Gîte progressive",en:"Progressive list",es:"Escora progresiva",pt:"Adornamento progressivo"},
      desc:{fr:"Une gîte qui s'accentue lentement, même de quelques degrés, signale un déséquilibre qui continuera de croître sans intervention.",en:"A list that slowly increases, even by a few degrees, signals an imbalance that will keep growing without intervention.",es:"Una escora que aumenta lentamente, aunque sea unos grados, señala un desequilibrio que seguirá creciendo sin intervención.",pt:"Um adornamento que aumenta lentamente, mesmo que poucos graus, sinaliza um desequilíbrio que continuará a crescer sem intervenção."} },
    { id:"radio", icon:"📻", color:C.purple, label:{fr:"Communication difficile",en:"Difficult communication",es:"Comunicación difícil",pt:"Comunicação difícil"},
      desc:{fr:"Une radio qui grésille, une liaison qui se dégrade au pire moment, prive l'équipage de sa capacité à alerter rapidement plus tard.",en:"A crackling radio, a link degrading at the worst moment, deprives the crew of its ability to alert quickly later.",es:"Una radio con interferencias, un enlace que se degrada en el peor momento, priva a la tripulación de poder alertar rápido después.",pt:"Um rádio com interferências, uma ligação que se degrada no pior momento, priva a tripulação da capacidade de alertar rapidamente depois."} },
  ];
  const sel_ = sel?signs.find(s=>s.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {signs.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{padding:"12px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:10,fontWeight:700,color:sel===s.id?s.color:C.muted}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — DECISION REFLEX (Observe/Decide/Act/Reassess for distress)
// ══════════════════════════════════════
function DecisionReflexSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"👁️", color:C.blue2, label:{fr:"Observer",en:"Observe",es:"Observar",pt:"Observar"},
      desc:{fr:"Quels signaux vérifiés ai-je réellement, indépendamment de ce que je préfère croire ?",en:"What verified signals do I actually have, regardless of what I'd prefer to believe?",es:"¿Qué señales verificadas tengo realmente, más allá de lo que prefiero creer?",pt:"Que sinais verificados tenho realmente, independentemente do que prefiro acreditar?"} },
    { id:2, icon:"⚖️", color:C.gold2, label:{fr:"Décider",en:"Decide",es:"Decidir",pt:"Decidir"},
      desc:{fr:"Ces signaux, pris ensemble, correspondent-ils à un incident isolé ou à une détresse en formation ?",en:"Taken together, do these signals match an isolated incident or a distress developing?",es:"En conjunto, ¿estas señales corresponden a un incidente aislado o a una emergencia en formación?",pt:"Em conjunto, estes sinais correspondem a um incidente isolado ou a uma emergência em formação?"} },
    { id:3, icon:"⚡", color:C.orange, label:{fr:"Agir",en:"Act",es:"Actuar",pt:"Agir"},
      desc:{fr:"Si le doute persiste, agir comme si c'était une détresse — jamais l'inverse.",en:"If doubt remains, act as if it is a distress — never the other way around.",es:"Si la duda persiste, actuar como si fuera una emergencia — nunca al revés.",pt:"Se a dúvida persistir, agir como se fosse uma emergência — nunca o contrário."} },
    { id:4, icon:"🔄", color:C.green, label:{fr:"Réévaluer",en:"Reassess",es:"Reevaluar",pt:"Reavaliar"},
      desc:{fr:"La situation continue d'évoluer : vérifier en continu si le niveau de gravité a changé.",en:"The situation keeps evolving: continuously check whether the severity level has changed.",es:"La situación sigue evolucionando: comprobar continuamente si el nivel de gravedad ha cambiado.",pt:"A situação continua a evoluir: verificar continuamente se o nível de gravidade mudou."} },
  ];
  const sel_ = sel!==null ? steps.find(s=>s.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{padding:"12px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:sel===s.id?s.color:C.muted}}>{s.id}. {s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — MULTI-SIGNAL SCENARIO
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"c",q2:"a",q3:"b",q4:"a",q5:"c"};
  const qs = {
    fr:[
      {id:"q1",q:"Légère gîte, bruit inhabituel en salle des machines, pompe de cale qui tourne depuis 20 minutes, météo qui se dégrade, radio qui grésille. Pris séparément, chaque signal semble mineur. Pris ensemble, que représentent-ils ?\na) Une routine de mauvais temps, rien d'anormal\nb) Un incident isolé sans lien entre les signaux\nc) Une situation anormale qui s'accumule vers une possible détresse"},
      {id:"q2",q:"Quelle est la première action face à cette accumulation de signaux ?\na) Vérifier activement chaque signal au lieu d'attendre qu'il se confirme seul\nb) Attendre la fin du quart pour voir si ça s'arrange\nc) Ignorer la météo, elle n'est pas liée aux autres signaux"},
      {id:"q3",q:"Le second dit : 'cette pompe tourne toujours un peu, c'est normal ici.' Quel est le risque de ce raisonnement ?\na) Il n'y a aucun risque, c'est une observation d'expérience valable\nb) C'est un exemple de normalisation de la déviance — une anomalie tolérée trop longtemps devient invisible\nc) C'est toujours vrai, les pompes de cale tournent souvent"},
      {id:"q4",q:"En cas de doute persistant sur la gravité réelle de la situation, quelle est la bonne pratique ?\na) Agir comme si c'était une détresse, jamais l'inverse\nb) Attendre une confirmation certaine avant toute action\nc) Attendre que la situation se résolve d'elle-même"},
      {id:"q5",q:"Quelle est l'erreur la plus coûteuse dans ce scénario ?\na) Déclarer une détresse qui s'avère finalement mineure\nb) Vérifier trop de signaux avant de conclure\nc) Attendre une certitude absolue avant de déclarer, pendant que la fenêtre de sauvetage se réduit"},
    ],
    en:[
      {id:"q1",q:"Slight list, unusual noise in the engine room, bilge pump running for 20 minutes, worsening weather, crackling radio. Taken separately, each signal seems minor. Taken together, what do they represent?\na) Normal bad-weather routine, nothing abnormal\nb) An isolated incident with no link between signals\nc) An abnormal situation accumulating toward possible distress"},
      {id:"q2",q:"What is the first action facing this accumulation of signals?\na) Actively verify each signal instead of waiting for it to confirm itself\nb) Wait until the end of the watch to see if it improves\nc) Ignore the weather, it's unrelated to the other signals"},
      {id:"q3",q:"The chief mate says: 'that pump always runs a bit, it's normal here.' What is the risk of this reasoning?\na) There is no risk, it's a valid experience-based observation\nb) It's an example of normalization of deviance — an anomaly tolerated too long becomes invisible\nc) It's always true, bilge pumps often run"},
      {id:"q4",q:"When doubt persists about the real severity of the situation, what is the correct practice?\na) Act as if it is a distress, never the other way around\nb) Wait for absolute confirmation before any action\nc) Wait for the situation to resolve itself"},
      {id:"q5",q:"What is the costliest error in this scenario?\na) Declaring a distress that turns out to be minor\nb) Checking too many signals before concluding\nc) Waiting for absolute certainty before declaring, while the rescue window shrinks"},
    ],
    es:[
      {id:"q1",q:"Ligera escora, ruido inusual en la sala de máquinas, bomba de sentina funcionando desde hace 20 minutos, tiempo que empeora, radio con interferencias. Por separado, cada señal parece menor. En conjunto, ¿qué representan?\na) Rutina de mal tiempo, nada anormal\nb) Un incidente aislado sin relación entre las señales\nc) Una situación anormal que se acumula hacia una posible emergencia"},
      {id:"q2",q:"¿Cuál es la primera acción ante esta acumulación de señales?\na) Verificar activamente cada señal en lugar de esperar que se confirme sola\nb) Esperar al final de la guardia para ver si mejora\nc) Ignorar el tiempo, no está relacionado con las otras señales"},
      {id:"q3",q:"El segundo oficial dice: 'esa bomba siempre funciona un poco, es normal aquí.' ¿Cuál es el riesgo de este razonamiento?\na) No hay riesgo, es una observación de experiencia válida\nb) Es un ejemplo de normalización de la desviación — una anomalía tolerada demasiado tiempo se vuelve invisible\nc) Siempre es cierto, las bombas de sentina suelen funcionar"},
      {id:"q4",q:"Cuando persiste la duda sobre la gravedad real de la situación, ¿cuál es la práctica correcta?\na) Actuar como si fuera una emergencia, nunca al revés\nb) Esperar confirmación absoluta antes de cualquier acción\nc) Esperar a que la situación se resuelva sola"},
      {id:"q5",q:"¿Cuál es el error más costoso en este escenario?\na) Declarar una emergencia que resulta ser menor\nb) Verificar demasiadas señales antes de concluir\nc) Esperar certeza absoluta antes de declarar, mientras la ventana de rescate se reduce"},
    ],
    pt:[
      {id:"q1",q:"Ligeiro adornamento, ruído invulgar na casa das máquinas, bomba de porão a funcionar há 20 minutos, tempo a piorar, rádio com interferências. Separadamente, cada sinal parece menor. Em conjunto, o que representam?\na) Rotina de mau tempo, nada anormal\nb) Um incidente isolado sem relação entre os sinais\nc) Uma situação anormal que se acumula rumo a uma possível emergência"},
      {id:"q2",q:"Qual é a primeira ação perante esta acumulação de sinais?\na) Verificar ativamente cada sinal em vez de esperar que se confirme sozinho\nb) Esperar pelo fim do quarto para ver se melhora\nc) Ignorar o tempo, não está relacionado com os outros sinais"},
      {id:"q3",q:"O imediato diz: 'essa bomba funciona sempre um pouco, é normal aqui.' Qual é o risco deste raciocínio?\na) Não há risco, é uma observação de experiência válida\nb) É um exemplo de normalização do desvio — uma anomalia tolerada por tempo demais torna-se invisível\nc) É sempre verdade, as bombas de porão costumam funcionar"},
      {id:"q4",q:"Quando a dúvida persiste sobre a gravidade real da situação, qual é a prática correta?\na) Agir como se fosse uma emergência, nunca o contrário\nb) Esperar confirmação absoluta antes de qualquer ação\nc) Esperar que a situação se resolva sozinha"},
      {id:"q5",q:"Qual é o erro mais dispendioso neste cenário?\na) Declarar uma emergência que afinal é menor\nb) Verificar sinais a mais antes de concluir\nc) Esperar certeza absoluta antes de declarar, enquanto a janela de resgate diminui"},
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
        {lang==="fr"?"✅ Q1: c — l'accumulation compte plus que chaque signal isolé\n✅ Q2: a — vérifier activement, ne jamais attendre passivement\n✅ Q3: b — normalisation de la déviance classique\n✅ Q4: a — dans le doute, agir comme en détresse\n✅ Q5: c — la fenêtre de sauvetage se réduit à chaque minute perdue à attendre une certitude qui ne viendra peut-être jamais":
         lang==="en"?"✅ Q1: c — accumulation matters more than any single isolated signal\n✅ Q2: a — actively verify, never wait passively\n✅ Q3: b — classic normalization of deviance\n✅ Q4: a — when in doubt, act as in distress\n✅ Q5: c — the rescue window shrinks with every minute spent waiting for a certainty that may never come":
         "✅ Q1: c · Q2: a · Q3: b · Q4: a · Q5: c"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — EL FARO
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"El Faro — Bahamas (1er octobre 2015)",teaser:"Cargo américain · Ouragan Joaquin · 33 morts · Message de détresse retardé de 42 minutes",
      what:"Le cargo El Faro navigue droit dans la trajectoire de l'ouragan Joaquin (catégorie 3-4). Dès l'aube, une gîte progressive et une voie d'eau importante dans une cale sont identifiées. À 6h31, le second officier rédige déjà le message de détresse — mais le capitaine ne le fait envoyer que 42 minutes plus tard, à 7h13, après avoir déclaré à 6h44 qu'il n'y avait \"pas besoin de sonner l'alarme générale pour l'instant\" malgré une voie d'eau déjà qualifiée de significative. L'alarme générale ne sonne qu'à 7h27, l'ordre d'abandon vers 7h29. Le navire coule vers 7h40. Les 33 membres d'équipage périssent, aucun survivant.",
      cause:"• Message de détresse rédigé à 6h31 mais envoyé seulement à 7h13 — 42 minutes perdues\n• Déclaration explicite qu'il n'y avait \"pas besoin\" de l'alarme générale malgré une voie d'eau significative déjà identifiée\n• Signes avant-coureurs multiples ignorés ou minimisés pendant des heures (gîte, météo, appels d'officiers inquiets)\n• Un officier avait exprimé son doute la veille (\"peut-être que je m'inquiète pour rien\") sans qu'il soit pris au sérieux",
      lessons:"✓ Un message de détresse rédigé doit être envoyé sans délai, pas gardé \"en réserve\"\n✓ \"Pas besoin d'alarme pour l'instant\" est une phrase à haut risque quand plusieurs signaux s'accumulent déjà\n✓ Le doute exprimé par un membre d'équipage mérite d'être pris au sérieux, pas minimisé\n✓ Chaque minute d'hésitation réduit directement la marge de sauvetage possible",
      link:"🔗 Contrairement aux cas déjà vus en s1 (facteur humain individuel face à une collision), El Faro illustre la reconnaissance tardive d'une détresse qui n'était pas soudaine — elle s'est construite progressivement, signal après signal, pendant des heures."},
    en:{title:"El Faro — Bahamas (October 1, 2015)",teaser:"US cargo ship · Hurricane Joaquin · 33 dead · Distress message delayed by 42 minutes",
      what:"The cargo ship El Faro sails directly into the path of Hurricane Joaquin (category 3-4). By dawn, a progressive list and significant flooding in a cargo hold are identified. At 6:31am, the second mate already drafts the distress message — but the captain only has it sent 42 minutes later, at 7:13am, after declaring at 6:44am there was \"no need to ring the general alarm yet\" despite flooding already described as significant. The general alarm doesn't sound until 7:27am, the abandon-ship order around 7:29am. The vessel sinks around 7:40am. All 33 crew members die; no survivors.",
      cause:"• Distress message drafted at 6:31am but only sent at 7:13am — 42 minutes lost\n• Explicit statement that there was \"no need\" for the general alarm despite already-significant flooding\n• Multiple warning signs ignored or minimized for hours (list, weather, calls from concerned officers)\n• An officer had voiced doubt the night before (\"maybe I'm just being a Chicken Little\") without being taken seriously",
      lessons:"✓ A drafted distress message must be sent without delay, not held \"in reserve\"\n✓ \"No need for the alarm yet\" is a high-risk phrase when several signals are already accumulating\n✓ Doubt voiced by a crew member deserves to be taken seriously, not minimized\n✓ Every minute of hesitation directly reduces the possible rescue margin",
      link:"🔗 Unlike the cases already seen in s1 (individual human factor facing a collision), El Faro illustrates the late recognition of a distress that was not sudden — it built up progressively, signal after signal, over hours."},
    es:{title:"El Faro — Bahamas (1 de octubre de 2015)",teaser:"Carguero estadounidense · Huracán Joaquin · 33 muertos · Mensaje de socorro retrasado 42 minutos",
      what:"El carguero El Faro navega directo hacia la trayectoria del huracán Joaquin (categoría 3-4). Al amanecer, se identifica una escora progresiva y una vía de agua importante en una bodega. A las 6:31, el segundo oficial ya redacta el mensaje de socorro — pero el capitán solo lo hace enviar 42 minutos después, a las 7:13, tras declarar a las 6:44 que no había \"necesidad de tocar la alarma general por ahora\" pese a una vía de agua ya calificada de significativa. La alarma general no suena hasta las 7:27, la orden de abandono hacia las 7:29. El buque se hunde hacia las 7:40. Los 33 tripulantes mueren, sin supervivientes.",
      cause:"• Mensaje de socorro redactado a las 6:31 pero enviado solo a las 7:13 — 42 minutos perdidos\n• Declaración explícita de que no había \"necesidad\" de la alarma general pese a una vía de agua ya significativa\n• Múltiples señales de advertencia ignoradas o minimizadas durante horas (escora, tiempo, llamadas de oficiales preocupados)\n• Un oficial había expresado sus dudas la noche anterior sin ser tomado en serio",
      lessons:"✓ Un mensaje de socorro redactado debe enviarse sin demora, no guardarse \"en reserva\"\n✓ \"No hay necesidad de la alarma todavía\" es una frase de alto riesgo cuando ya se acumulan varias señales\n✓ La duda expresada por un tripulante merece tomarse en serio, no minimizarse\n✓ Cada minuto de duda reduce directamente el margen de rescate posible",
      link:"🔗 A diferencia de los casos ya vistos en s1, El Faro ilustra el reconocimiento tardío de una emergencia que no fue súbita — se construyó progresivamente, señal tras señal, durante horas."},
    pt:{title:"El Faro — Bahamas (1 de outubro de 2015)",teaser:"Cargueiro americano · Furacão Joaquin · 33 mortos · Mensagem de socorro atrasada 42 minutos",
      what:"O cargueiro El Faro navega diretamente para a trajetória do furacão Joaquin (categoria 3-4). Ao amanhecer, identifica-se um adornamento progressivo e uma via de água importante num porão. Às 6h31, o imediato já redige a mensagem de socorro — mas o comandante só a manda enviar 42 minutos depois, às 7h13, após declarar às 6h44 que não havia \"necessidade de tocar o alarme geral por agora\" apesar de uma via de água já classificada como significativa. O alarme geral só soa às 7h27, a ordem de abandono por volta das 7h29. O navio afunda-se por volta das 7h40. Os 33 tripulantes morrem, sem sobreviventes.",
      cause:"• Mensagem de socorro redigida às 6h31 mas só enviada às 7h13 — 42 minutos perdidos\n• Declaração explícita de que não havia \"necessidade\" do alarme geral apesar de uma via de água já significativa\n• Múltiplos sinais de aviso ignorados ou minimizados durante horas (adornamento, tempo, chamadas de oficiais preocupados)\n• Um oficial tinha expressado dúvidas na noite anterior sem ser levado a sério",
      lessons:"✓ Uma mensagem de socorro redigida deve ser enviada sem demora, não guardada \"em reserva\"\n✓ \"Não há necessidade do alarme ainda\" é uma frase de alto risco quando já se acumulam vários sinais\n✓ A dúvida expressa por um tripulante merece ser levada a sério, não minimizada\n✓ Cada minuto de hesitação reduz diretamente a margem de resgate possível",
      link:"🔗 Ao contrário dos casos já vistos em s1, o El Faro ilustra o reconhecimento tardio de uma emergência que não foi súbita — construiu-se progressivamente, sinal após sinal, ao longo de horas."},
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
// BANK — 15 QUESTIONS (min. 5-6 scenario-based)
// ══════════════════════════════════════
const BANK = {
  fr:[
    {q:"Qu'est-ce qui distingue un 'incident' d'une 'détresse' selon cette leçon ?",opts:["La taille du navire","Le danger grave et imminent pour des vies humaines, pas la gêne matérielle seule","La météo du moment","Le nombre de membres d'équipage"],correct:1,expl:"Une détresse implique un danger grave et imminent pour des vies humaines — un incident isolé et gérable n'atteint pas ce seuil."},
    {q:"Pourquoi le coût d'une fausse alerte et celui d'une détresse non déclarée sont-ils asymétriques ?",opts:["Ils sont en réalité identiques","Une fausse alerte coûte peu et se corrige ; une détresse non déclarée réduit irréversiblement la marge de sauvetage","Une fausse alerte coûte toujours plus cher","Cela dépend uniquement du type de navire"],correct:1,expl:"L'asymétrie est fondamentale : corriger une fausse alerte prend quelques minutes, tandis qu'une détresse non déclarée à temps peut coûter des vies de façon irréversible."},
    {q:"Qu'est-ce que la 'normalisation de la déviance' ?",opts:["Un protocole d'urgence officiel","Le fait de tolérer une anomalie répétée jusqu'à ce qu'elle devienne invisible aux yeux de l'équipage","Une règle SOLAS sur les pompes de cale","Un type de signal de détresse"],correct:1,expl:"La normalisation de la déviance décrit comment une anomalie tolérée trop longtemps ('ça a toujours été comme ça') finit par ne plus être perçue comme un risque."},
    {q:"Pourquoi les catastrophes maritimes commencent-elles rarement par une explosion soudaine ?",opts:["Ce n'est pas vrai, elles sont toujours soudaines","Elles résultent souvent d'une accumulation progressive de petits signaux (odeur, bruit, gîte, alarme)","Les navires modernes n'ont pas d'explosions","Cela ne concerne que les vieux navires"],correct:1,expl:"La plupart des urgences maritimes graves se construisent progressivement à partir de signaux faibles accumulés, pas d'un événement brutal isolé."},
    {q:"Vous constatez une légère gîte, un bruit inhabituel et une pompe de cale qui tourne depuis 20 minutes. Que faites-vous ?",opts:["Vous attendez la fin du quart pour voir si ça s'arrange","Vous vérifiez activement chaque signal et évaluez leur accumulation, sans attendre passivement","Vous ignorez, chaque signal pris seul est mineur","Vous informez uniquement à la relève suivante"],correct:1,expl:"L'accumulation de plusieurs signaux, même mineurs individuellement, exige une vérification active immédiate plutôt qu'une attente passive."},
    {q:"Un collègue dit 'cette pompe tourne toujours un peu, c'est normal ici'. Quelle est la bonne réaction ?",opts:["Accepter, c'est l'expérience qui parle","Reconnaître le risque de normalisation de la déviance et vérifier objectivement si le régime a changé","Ignorer complètement la remarque","Changer immédiatement de navire"],correct:1,expl:"Cette phrase est un signal classique de normalisation de la déviance — elle mérite une vérification objective, pas une acceptation automatique."},
    {q:"Dans le cadre Observer-Décider-Agir-Réévaluer appliqué à la détresse, que signifie 'Observer' ?",opts:["Attendre que la situation se résolve","Rassembler les signaux réellement vérifiés, indépendamment de ce qu'on préfère croire","Demander l'avis de l'armateur","Vérifier uniquement la météo"],correct:1,expl:"Observer signifie ici collecter des faits vérifiés, sans se laisser influencer par le désir que la situation ne soit pas grave."},
    {q:"En cas de doute persistant sur la gravité d'une situation, quelle est la règle à suivre ?",opts:["Attendre une certitude absolue avant d'agir","Agir comme si c'était une détresse — jamais l'inverse","Consulter d'abord tous les membres d'équipage un par un","Attendre le prochain rapport météo"],correct:1,expl:"Dans le doute, la règle est d'agir comme en situation de détresse — l'inverse (attendre une certitude) coûte un temps qu'on ne peut pas récupérer."},
    {q:"Dans le cas El Faro, combien de temps s'est écoulé entre la rédaction du message de détresse et son envoi réel ?",opts:["Quelques secondes","42 minutes","6 heures","Il n'a jamais été envoyé"],correct:1,expl:"Le message a été rédigé à 6h31 mais n'a été envoyé qu'à 7h13, soit 42 minutes plus tard — un délai déterminant vu la suite des événements."},
    {q:"Quelle phrase du capitaine d'El Faro illustre le risque de minimiser une situation qui s'aggrave ?",opts:["'Envoyez le message immédiatement'","'Pas besoin de sonner l'alarme générale pour l'instant'","'Alertez tout l'équipage maintenant'","'Nous abandonnons le navire'"],correct:1,expl:"Cette déclaration, faite alors qu'une voie d'eau était déjà qualifiée de significative, illustre le décalage entre la gravité réelle et la perception qu'en avait le commandant."},
    {q:"Pourquoi le doute exprimé par un officier junior doit-il être pris au sérieux ?",opts:["Il ne doit jamais l'être, l'expérience prime toujours","Parce qu'ignorer un doute légitime peut retarder la reconnaissance d'une détresse réelle","Uniquement s'il est capitaine","Cela n'a aucune importance opérationnelle"],correct:1,expl:"Un doute exprimé, même par un membre junior, est un signal à vérifier — l'ignorer peut retarder une décision vitale."},
    {q:"Quel est le principal facteur de risque décrit dans cette leçon, distinct du facteur humain individuel vu en s1 ?",opts:["La météo uniquement","L'accumulation progressive de signaux faibles combinée à la tendance à les normaliser","La panne d'équipement","La taille de l'équipage"],correct:1,expl:"Contrairement à s1 (facteur humain isolé face à une collision), s2-L1 se concentre sur la reconnaissance progressive de la détresse et la normalisation de la déviance."},
    {q:"Quelle est la conséquence directe de chaque minute d'hésitation avant de déclarer une détresse ?",opts:["Aucune, le temps n'a pas d'impact réel","Une réduction directe de la marge de sauvetage disponible","Une amélioration de la précision de l'alerte","Un gain de temps pour vérifier plus de détails"],correct:1,expl:"Chaque minute perdue à hésiter réduit mécaniquement le temps restant pour organiser un sauvetage efficace."},
    {q:"Quel est l'objectif principal de cette leçon dans le Safety Department ?",opts:["Réexpliquer le fonctionnement du GMDSS et des zones A1-A4","Apprendre à reconnaître le moment où une situation devient réellement une détresse, avant qu'il ne soit trop tard","Étudier la procédure d'abandon du navire","Comparer les équipements EPIRB et SART"],correct:1,expl:"Cette leçon ne réexplique aucune théorie déjà couverte ailleurs — elle se concentre uniquement sur le jugement de reconnaissance de la détresse."},
    {q:"Pourquoi cette leçon ne développe-t-elle pas la procédure d'abandon du navire ?",opts:["Parce que ce sujet appartient exclusivement à un futur module dédié (Lifeboats, Liferafts & HRU)","Parce que ce n'est pas important","Parce que ça a déjà été couvert dans le quiz","Parce que le format ne le permet pas"],correct:0,expl:"Selon la règle d'architecture MAP, l'abandon du navire est le domaine exclusif du futur module s5 — s2 se limite à la reconnaissance et à la déclaration de la détresse."},
  ],
  en:[
    {q:"What distinguishes an 'incident' from 'distress' according to this lesson?",opts:["The size of the vessel","Grave and imminent danger to human life, not material inconvenience alone","The current weather","The number of crew members"],correct:1,expl:"Distress implies grave and imminent danger to human life — an isolated, manageable incident does not reach that threshold."},
    {q:"Why are the cost of a false alarm and an undeclared distress asymmetric?",opts:["They are actually identical","A false alarm costs little and is correctable; undeclared distress irreversibly reduces the rescue margin","A false alarm always costs more","It only depends on vessel type"],correct:1,expl:"The asymmetry is fundamental: correcting a false alarm takes a few minutes, while distress not declared in time can cost lives irreversibly."},
    {q:"What is 'normalization of deviance'?",opts:["An official emergency protocol","Tolerating a repeated anomaly until it becomes invisible to the crew","A SOLAS rule about bilge pumps","A type of distress signal"],correct:1,expl:"Normalization of deviance describes how a tolerated anomaly ('it's always been like this') eventually stops being perceived as a risk."},
    {q:"Why do maritime disasters rarely begin with a sudden explosion?",opts:["That's not true, they are always sudden","They often result from a progressive accumulation of small signals (smell, noise, list, alarm)","Modern vessels don't have explosions","This only concerns old vessels"],correct:1,expl:"Most serious maritime emergencies build up progressively from accumulated weak signals, not a single sudden event."},
    {q:"You notice a slight list, unusual noise and a bilge pump running for 20 minutes. What do you do?",opts:["Wait until the end of the watch to see if it improves","Actively verify each signal and assess their accumulation, without passively waiting","Ignore it, each signal alone is minor","Only report it at the next handover"],correct:1,expl:"The accumulation of several signals, even individually minor, requires immediate active verification rather than passive waiting."},
    {q:"A colleague says 'that pump always runs a bit, it's normal here'. What is the correct reaction?",opts:["Accept it, that's experience talking","Recognize the risk of normalization of deviance and objectively check if the rate has changed","Completely ignore the remark","Immediately change vessels"],correct:1,expl:"This phrase is a classic signal of normalization of deviance — it deserves objective verification, not automatic acceptance."},
    {q:"In the Observe-Decide-Act-Reassess framework applied to distress, what does 'Observe' mean?",opts:["Wait for the situation to resolve","Gather actually verified signals, regardless of what one prefers to believe","Ask the owner's opinion","Only check the weather"],correct:1,expl:"Observe here means collecting verified facts, without letting the desire for the situation not to be serious influence the assessment."},
    {q:"When doubt persists about the severity of a situation, what rule should be followed?",opts:["Wait for absolute certainty before acting","Act as if it is a distress — never the other way around","First consult every crew member one by one","Wait for the next weather report"],correct:1,expl:"When in doubt, the rule is to act as in a distress situation — the opposite (waiting for certainty) costs time that cannot be recovered."},
    {q:"In the El Faro case, how much time passed between drafting the distress message and actually sending it?",opts:["A few seconds","42 minutes","6 hours","It was never sent"],correct:1,expl:"The message was drafted at 6:31am but only sent at 7:13am, 42 minutes later — a decisive delay given what followed."},
    {q:"Which statement by El Faro's captain illustrates the risk of minimizing a worsening situation?",opts:["'Send the message immediately'","'No need to ring the general alarm yet'","'Alert the whole crew now'","'We are abandoning ship'"],correct:1,expl:"This statement, made while flooding was already described as significant, illustrates the gap between actual severity and the captain's perception of it."},
    {q:"Why must doubt expressed by a junior officer be taken seriously?",opts:["It never should be, experience always comes first","Because ignoring legitimate doubt can delay recognizing a real distress","Only if he is the captain","It has no operational importance"],correct:1,expl:"A doubt expressed, even by a junior member, is a signal worth checking — ignoring it can delay a vital decision."},
    {q:"What is the main risk factor described in this lesson, distinct from the individual human factor seen in s1?",opts:["Weather alone","The progressive accumulation of weak signals combined with the tendency to normalize them","Equipment failure","Crew size"],correct:1,expl:"Unlike s1 (isolated human factor facing a collision), s2-L1 focuses on the progressive recognition of distress and normalization of deviance."},
    {q:"What is the direct consequence of every minute of hesitation before declaring distress?",opts:["None, time has no real impact","A direct reduction of the available rescue margin","An improvement in alert accuracy","Extra time to check more details"],correct:1,expl:"Every minute lost hesitating mechanically reduces the time remaining to organize an effective rescue."},
    {q:"What is the main goal of this lesson in the Safety Department?",opts:["Re-explain how GMDSS and A1-A4 zones work","Learn to recognize the moment a situation becomes real distress, before it's too late","Study the abandon-ship procedure","Compare EPIRB and SART equipment"],correct:1,expl:"This lesson does not re-explain any theory already covered elsewhere — it focuses solely on the judgment of recognizing distress."},
    {q:"Why doesn't this lesson develop the abandon-ship procedure?",opts:["Because that topic exclusively belongs to a future dedicated module (Lifeboats, Liferafts & HRU)","Because it isn't important","Because it was already covered in the quiz","Because the format doesn't allow it"],correct:0,expl:"Per MAP's architecture rule, abandoning ship is the exclusive domain of the future s5 module — s2 limits itself to recognizing and declaring distress."},
  ],
  es:[
    {q:"¿Qué distingue un 'incidente' de una 'emergencia' según esta lección?",opts:["El tamaño del buque","El peligro grave e inminente para vidas humanas, no solo la molestia material","El tiempo del momento","El número de tripulantes"],correct:1,expl:"Una emergencia implica peligro grave e inminente para vidas humanas — un incidente aislado y manejable no alcanza ese umbral."},
    {q:"¿Por qué el coste de una falsa alarma y el de una emergencia no declarada son asimétricos?",opts:["En realidad son idénticos","Una falsa alarma cuesta poco y es corregible; una emergencia no declarada reduce irreversiblemente el margen de rescate","Una falsa alarma siempre cuesta más","Solo depende del tipo de buque"],correct:1,expl:"La asimetría es fundamental: corregir una falsa alarma toma unos minutos, mientras que una emergencia no declarada a tiempo puede costar vidas de forma irreversible."},
    {q:"¿Qué es la 'normalización de la desviación'?",opts:["Un protocolo de emergencia oficial","Tolerar una anomalía repetida hasta que se vuelve invisible para la tripulación","Una regla SOLAS sobre bombas de sentina","Un tipo de señal de socorro"],correct:1,expl:"La normalización de la desviación describe cómo una anomalía tolerada ('siempre ha sido así') deja de percibirse como un riesgo."},
    {q:"¿Por qué los desastres marítimos rara vez comienzan con una explosión repentina?",opts:["No es cierto, siempre son repentinos","A menudo resultan de una acumulación progresiva de pequeñas señales (olor, ruido, escora, alarma)","Los buques modernos no tienen explosiones","Esto solo concierne a buques antiguos"],correct:1,expl:"La mayoría de las emergencias marítimas graves se acumulan progresivamente a partir de señales débiles, no de un evento repentino."},
    {q:"Notas una ligera escora, ruido inusual y una bomba de sentina funcionando desde hace 20 minutos. ¿Qué haces?",opts:["Esperas al final de la guardia para ver si mejora","Verificas activamente cada señal y evalúas su acumulación, sin esperar pasivamente","Lo ignoras, cada señal por separado es menor","Solo lo informas en el próximo relevo"],correct:1,expl:"La acumulación de varias señales, aunque menores por separado, exige verificación activa inmediata en lugar de espera pasiva."},
    {q:"Un colega dice 'esa bomba siempre funciona un poco, es normal aquí'. ¿Cuál es la reacción correcta?",opts:["Aceptarlo, es la experiencia hablando","Reconocer el riesgo de normalización de la desviación y comprobar objetivamente si el ritmo ha cambiado","Ignorar completamente el comentario","Cambiar de buque inmediatamente"],correct:1,expl:"Esta frase es una señal clásica de normalización de la desviación — merece verificación objetiva, no aceptación automática."},
    {q:"En el marco Observar-Decidir-Actuar-Reevaluar aplicado a la emergencia, ¿qué significa 'Observar'?",opts:["Esperar a que la situación se resuelva","Reunir señales realmente verificadas, más allá de lo que se prefiera creer","Pedir la opinión del armador","Comprobar solo el tiempo"],correct:1,expl:"Observar significa aquí recopilar hechos verificados, sin dejarse influir por el deseo de que la situación no sea grave."},
    {q:"Cuando persiste la duda sobre la gravedad de una situación, ¿qué regla debe seguirse?",opts:["Esperar certeza absoluta antes de actuar","Actuar como si fuera una emergencia — nunca al revés","Consultar primero a cada tripulante uno por uno","Esperar el próximo parte meteorológico"],correct:1,expl:"En caso de duda, la regla es actuar como en una situación de emergencia — lo contrario (esperar certeza) cuesta un tiempo que no se puede recuperar."},
    {q:"En el caso El Faro, ¿cuánto tiempo pasó entre redactar el mensaje de socorro y enviarlo realmente?",opts:["Unos segundos","42 minutos","6 horas","Nunca se envió"],correct:1,expl:"El mensaje se redactó a las 6:31 pero solo se envió a las 7:13, 42 minutos después — un retraso decisivo dado lo que siguió."},
    {q:"¿Qué frase del capitán del El Faro ilustra el riesgo de minimizar una situación que empeora?",opts:["'Envíen el mensaje inmediatamente'","'No hay necesidad de tocar la alarma general por ahora'","'Alerten a toda la tripulación ahora'","'Abandonamos el buque'"],correct:1,expl:"Esta declaración, hecha cuando la vía de agua ya se calificaba de significativa, ilustra la brecha entre la gravedad real y la percepción del capitán."},
    {q:"¿Por qué la duda expresada por un oficial junior debe tomarse en serio?",opts:["Nunca debe serlo, la experiencia siempre prima","Porque ignorar una duda legítima puede retrasar el reconocimiento de una emergencia real","Solo si es el capitán","No tiene ninguna importancia operativa"],correct:1,expl:"Una duda expresada, incluso por un miembro junior, es una señal que vale la pena verificar — ignorarla puede retrasar una decisión vital."},
    {q:"¿Cuál es el principal factor de riesgo descrito en esta lección, distinto del factor humano individual visto en s1?",opts:["Solo el tiempo","La acumulación progresiva de señales débiles combinada con la tendencia a normalizarlas","El fallo de equipo","El tamaño de la tripulación"],correct:1,expl:"A diferencia de s1 (factor humano aislado frente a una colisión), s2-L1 se centra en el reconocimiento progresivo de la emergencia y la normalización de la desviación."},
    {q:"¿Cuál es la consecuencia directa de cada minuto de duda antes de declarar una emergencia?",opts:["Ninguna, el tiempo no tiene impacto real","Una reducción directa del margen de rescate disponible","Una mejora de la precisión de la alerta","Un tiempo extra para verificar más detalles"],correct:1,expl:"Cada minuto perdido dudando reduce mecánicamente el tiempo restante para organizar un rescate eficaz."},
    {q:"¿Cuál es el objetivo principal de esta lección en el Safety Department?",opts:["Reexplicar el funcionamiento del GMDSS y las zonas A1-A4","Aprender a reconocer el momento en que una situación se convierte en una emergencia real, antes de que sea demasiado tarde","Estudiar el procedimiento de abandono del buque","Comparar los equipos EPIRB y SART"],correct:1,expl:"Esta lección no reexplica ninguna teoría ya cubierta en otro lugar — se centra únicamente en el juicio de reconocimiento de la emergencia."},
    {q:"¿Por qué esta lección no desarrolla el procedimiento de abandono del buque?",opts:["Porque ese tema pertenece exclusivamente a un futuro módulo dedicado (Lifeboats, Liferafts & HRU)","Porque no es importante","Porque ya se cubrió en el quiz","Porque el formato no lo permite"],correct:0,expl:"Según la regla de arquitectura de MAP, abandonar el buque es dominio exclusivo del futuro módulo s5 — s2 se limita a reconocer y declarar la emergencia."},
  ],
  pt:[
    {q:"O que distingue um 'incidente' de uma 'emergência' segundo esta lição?",opts:["O tamanho do navio","O perigo grave e iminente para vidas humanas, não apenas o incómodo material","O tempo do momento","O número de tripulantes"],correct:1,expl:"Uma emergência implica perigo grave e iminente para vidas humanas — um incidente isolado e gerível não atinge esse limiar."},
    {q:"Por que o custo de um falso alarme e o de uma emergência não declarada são assimétricos?",opts:["Na realidade são idênticos","Um falso alarme custa pouco e é corrigível; uma emergência não declarada reduz irreversivelmente a margem de resgate","Um falso alarme custa sempre mais","Só depende do tipo de navio"],correct:1,expl:"A assimetria é fundamental: corrigir um falso alarme demora alguns minutos, enquanto uma emergência não declarada a tempo pode custar vidas de forma irreversível."},
    {q:"O que é a 'normalização do desvio'?",opts:["Um protocolo de emergência oficial","Tolerar uma anomalia repetida até que se torne invisível para a tripulação","Uma regra SOLAS sobre bombas de porão","Um tipo de sinal de socorro"],correct:1,expl:"A normalização do desvio descreve como uma anomalia tolerada ('sempre foi assim') deixa de ser percebida como um risco."},
    {q:"Por que os desastres marítimos raramente começam com uma explosão súbita?",opts:["Não é verdade, são sempre súbitos","Muitas vezes resultam de uma acumulação progressiva de pequenos sinais (cheiro, ruído, adornamento, alarme)","Os navios modernos não têm explosões","Isto só diz respeito a navios antigos"],correct:1,expl:"A maioria das emergências marítimas graves acumula-se progressivamente a partir de sinais fracos, não de um evento súbito isolado."},
    {q:"Reparas num ligeiro adornamento, ruído invulgar e uma bomba de porão a funcionar há 20 minutos. O que fazes?",opts:["Esperas pelo fim do quarto para ver se melhora","Verificas ativamente cada sinal e avalias a sua acumulação, sem esperar passivamente","Ignoras, cada sinal isolado é menor","Só reportas na próxima rendição"],correct:1,expl:"A acumulação de vários sinais, mesmo menores individualmente, exige verificação ativa imediata em vez de espera passiva."},
    {q:"Um colega diz 'essa bomba funciona sempre um pouco, é normal aqui'. Qual é a reação correta?",opts:["Aceitar, é a experiência a falar","Reconhecer o risco de normalização do desvio e verificar objetivamente se o ritmo mudou","Ignorar completamente o comentário","Mudar de navio imediatamente"],correct:1,expl:"Esta frase é um sinal clássico de normalização do desvio — merece verificação objetiva, não aceitação automática."},
    {q:"No quadro Observar-Decidir-Agir-Reavaliar aplicado à emergência, o que significa 'Observar'?",opts:["Esperar que a situação se resolva","Reunir sinais realmente verificados, independentemente do que se prefere acreditar","Pedir a opinião do armador","Verificar só o tempo"],correct:1,expl:"Observar significa aqui recolher factos verificados, sem se deixar influenciar pelo desejo de que a situação não seja grave."},
    {q:"Quando a dúvida persiste sobre a gravidade de uma situação, que regra deve seguir-se?",opts:["Esperar certeza absoluta antes de agir","Agir como se fosse uma emergência — nunca o contrário","Consultar primeiro cada tripulante um a um","Esperar pelo próximo boletim meteorológico"],correct:1,expl:"Em caso de dúvida, a regra é agir como numa situação de emergência — o contrário (esperar certeza) custa um tempo que não se recupera."},
    {q:"No caso El Faro, quanto tempo passou entre a redação da mensagem de socorro e o seu envio real?",opts:["Alguns segundos","42 minutos","6 horas","Nunca foi enviada"],correct:1,expl:"A mensagem foi redigida às 6h31 mas só foi enviada às 7h13, 42 minutos depois — um atraso decisivo dado o que se seguiu."},
    {q:"Que frase do comandante do El Faro ilustra o risco de minimizar uma situação que piora?",opts:["'Enviem a mensagem imediatamente'","'Não há necessidade de tocar o alarme geral por agora'","'Alertem toda a tripulação agora'","'Vamos abandonar o navio'"],correct:1,expl:"Esta declaração, feita quando a via de água já era classificada como significativa, ilustra o desfasamento entre a gravidade real e a perceção do comandante."},
    {q:"Por que a dúvida expressa por um oficial júnior deve ser levada a sério?",opts:["Nunca deve ser, a experiência prevalece sempre","Porque ignorar uma dúvida legítima pode atrasar o reconhecimento de uma emergência real","Só se for o comandante","Não tem importância operacional"],correct:1,expl:"Uma dúvida expressa, mesmo por um membro júnior, é um sinal que vale a pena verificar — ignorá-la pode atrasar uma decisão vital."},
    {q:"Qual é o principal fator de risco descrito nesta lição, distinto do fator humano individual visto em s1?",opts:["Só o tempo","A acumulação progressiva de sinais fracos combinada com a tendência de os normalizar","A falha de equipamento","O tamanho da tripulação"],correct:1,expl:"Ao contrário de s1 (fator humano isolado perante uma colisão), s2-L1 foca-se no reconhecimento progressivo da emergência e na normalização do desvio."},
    {q:"Qual é a consequência direta de cada minuto de hesitação antes de declarar uma emergência?",opts:["Nenhuma, o tempo não tem impacto real","Uma redução direta da margem de resgate disponível","Uma melhoria na precisão do alerta","Tempo extra para verificar mais detalhes"],correct:1,expl:"Cada minuto perdido a hesitar reduz mecanicamente o tempo restante para organizar um resgate eficaz."},
    {q:"Qual é o objetivo principal desta lição no Safety Department?",opts:["Reexplicar o funcionamento do GMDSS e das zonas A1-A4","Aprender a reconhecer o momento em que uma situação se torna uma emergência real, antes que seja tarde demais","Estudar o procedimento de abandono do navio","Comparar os equipamentos EPIRB e SART"],correct:1,expl:"Esta lição não reexplica nenhuma teoria já coberta noutro lugar — foca-se unicamente no julgamento de reconhecimento da emergência."},
    {q:"Por que esta lição não desenvolve o procedimento de abandono do navio?",opts:["Porque esse tema pertence exclusivamente a um futuro módulo dedicado (Lifeboats, Liferafts & HRU)","Porque não é importante","Porque já foi coberto no quiz","Porque o formato não o permite"],correct:0,expl:"Segundo a regra de arquitetura da MAP, abandonar o navio é domínio exclusivo do futuro módulo s5 — s2 limita-se a reconhecer e declarar a emergência."},
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
// QUIZ — FINAL (5 QUESTIONS)
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Qu'est-ce qui définit réellement une détresse par rapport à un simple incident ?",opts:["Le danger grave et imminent pour des vies humaines","Le coût matériel","La durée de l'événement","Le nombre de témoins"],correct:0,expl:"Seul le danger grave et imminent pour des vies humaines qualifie une véritable détresse."},
    {q:"Pourquoi ne faut-il pas craindre une fausse alerte ?",opts:["Parce qu'elle n'a aucune conséquence","Parce que son coût est faible comparé à celui d'une détresse non déclarée à temps","Parce qu'elle est toujours justifiée","Parce que les autorités préfèrent les fausses alertes"],correct:1,expl:"L'asymétrie des coûts justifie de préférer une fausse alerte corrigible à une détresse non déclarée, potentiellement irréversible."},
    {q:"Qu'illustre la 'normalisation de la déviance' ?",opts:["Un protocole officiel à suivre","Comment une anomalie tolérée trop longtemps finit par ne plus être perçue comme un risque","Un type de signal radar","Une règle de navigation"],correct:1,expl:"C'est le mécanisme par lequel une anomalie répétée devient invisible aux yeux de ceux qui la côtoient chaque jour."},
    {q:"Dans le cas El Faro, quelle a été l'erreur décisive concernant le message de détresse ?",opts:["Il n'a jamais été rédigé","Il a été rédigé mais envoyé 42 minutes plus tard","Il a été envoyé trop tôt","Il a été envoyé à la mauvaise fréquence"],correct:1,expl:"Le message rédigé à 6h31 n'a été envoyé qu'à 7h13 — un délai qui a directement réduit la marge de sauvetage."},
    {q:"En cas de doute persistant sur la gravité d'une situation, quelle est la règle ?",opts:["Attendre une certitude absolue","Agir comme si c'était une détresse","Consulter d'abord l'armateur","Attendre le prochain quart"],correct:1,expl:"Dans le doute, il faut agir comme en situation de détresse — l'attente coûte un temps qu'on ne récupère jamais."},
  ],
  en:[
    {q:"What actually defines distress compared to a simple incident?",opts:["Grave and imminent danger to human life","Material cost","The duration of the event","The number of witnesses"],correct:0,expl:"Only grave and imminent danger to human life qualifies as true distress."},
    {q:"Why should a false alarm not be feared?",opts:["Because it has no consequences","Because its cost is low compared to a distress not declared in time","Because it is always justified","Because authorities prefer false alarms"],correct:1,expl:"The cost asymmetry justifies preferring a correctable false alarm over an undeclared, potentially irreversible distress."},
    {q:"What does 'normalization of deviance' illustrate?",opts:["An official protocol to follow","How an anomaly tolerated too long stops being perceived as a risk","A type of radar signal","A navigation rule"],correct:1,expl:"It's the mechanism by which a repeated anomaly becomes invisible to those who encounter it daily."},
    {q:"In the El Faro case, what was the decisive error regarding the distress message?",opts:["It was never drafted","It was drafted but sent 42 minutes later","It was sent too early","It was sent on the wrong frequency"],correct:1,expl:"The message drafted at 6:31am was only sent at 7:13am — a delay that directly reduced the rescue margin."},
    {q:"When doubt persists about the severity of a situation, what is the rule?",opts:["Wait for absolute certainty","Act as if it is a distress","First consult the owner","Wait for the next watch"],correct:1,expl:"When in doubt, act as in a distress situation — waiting costs time that can never be recovered."},
  ],
  es:[
    {q:"¿Qué define realmente una emergencia frente a un simple incidente?",opts:["El peligro grave e inminente para vidas humanas","El coste material","La duración del evento","El número de testigos"],correct:0,expl:"Solo el peligro grave e inminente para vidas humanas califica como verdadera emergencia."},
    {q:"¿Por qué no hay que temer una falsa alarma?",opts:["Porque no tiene consecuencias","Porque su coste es bajo comparado con una emergencia no declarada a tiempo","Porque siempre está justificada","Porque las autoridades prefieren las falsas alarmas"],correct:1,expl:"La asimetría de costes justifica preferir una falsa alarma corregible a una emergencia no declarada, potencialmente irreversible."},
    {q:"¿Qué ilustra la 'normalización de la desviación'?",opts:["Un protocolo oficial a seguir","Cómo una anomalía tolerada demasiado tiempo deja de percibirse como riesgo","Un tipo de señal de radar","Una regla de navegación"],correct:1,expl:"Es el mecanismo por el cual una anomalía repetida se vuelve invisible para quienes la enfrentan a diario."},
    {q:"En el caso El Faro, ¿cuál fue el error decisivo respecto al mensaje de socorro?",opts:["Nunca se redactó","Se redactó pero se envió 42 minutos después","Se envió demasiado pronto","Se envió en la frecuencia equivocada"],correct:1,expl:"El mensaje redactado a las 6:31 solo se envió a las 7:13 — un retraso que redujo directamente el margen de rescate."},
    {q:"Cuando persiste la duda sobre la gravedad de una situación, ¿cuál es la regla?",opts:["Esperar certeza absoluta","Actuar como si fuera una emergencia","Consultar primero al armador","Esperar la próxima guardia"],correct:1,expl:"En caso de duda, hay que actuar como en una emergencia — esperar cuesta un tiempo que nunca se recupera."},
  ],
  pt:[
    {q:"O que define realmente uma emergência face a um simples incidente?",opts:["O perigo grave e iminente para vidas humanas","O custo material","A duração do evento","O número de testemunhas"],correct:0,expl:"Só o perigo grave e iminente para vidas humanas qualifica uma verdadeira emergência."},
    {q:"Por que não se deve temer um falso alarme?",opts:["Porque não tem consequências","Porque o seu custo é baixo comparado com uma emergência não declarada a tempo","Porque está sempre justificado","Porque as autoridades preferem falsos alarmes"],correct:1,expl:"A assimetria de custos justifica preferir um falso alarme corrigível a uma emergência não declarada, potencialmente irreversível."},
    {q:"O que ilustra a 'normalização do desvio'?",opts:["Um protocolo oficial a seguir","Como uma anomalia tolerada por tempo demais deixa de ser percebida como risco","Um tipo de sinal de radar","Uma regra de navegação"],correct:1,expl:"É o mecanismo pelo qual uma anomalia repetida se torna invisível para quem a enfrenta diariamente."},
    {q:"No caso El Faro, qual foi o erro decisivo quanto à mensagem de socorro?",opts:["Nunca foi redigida","Foi redigida mas enviada 42 minutos depois","Foi enviada cedo demais","Foi enviada na frequência errada"],correct:1,expl:"A mensagem redigida às 6h31 só foi enviada às 7h13 — um atraso que reduziu diretamente a margem de resgate."},
    {q:"Quando a dúvida persiste sobre a gravidade de uma situação, qual é a regra?",opts:["Esperar certeza absoluta","Agir como se fosse uma emergência","Consultar primeiro o armador","Esperar pelo próximo quarto"],correct:1,expl:"Em caso de dúvida, deve agir-se como numa emergência — esperar custa um tempo que nunca se recupera."},
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
    fr:"Repense à la dernière situation anormale que tu as vécue en mer. À quel moment précis la classerais-tu aujourd'hui comme une détresse ?",
    en:"Think about the last abnormal situation you experienced at sea. At what exact moment would you now classify it as a distress?",
    es:"Piensa en la última situación anormal que viviste en el mar. ¿En qué momento exacto la clasificarías ahora como una emergencia?",
    pt:"Pensa na última situação anormal que viveste no mar. Em que momento exato a classificarias agora como uma emergência?",
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
      badge:"🆘 Safety · EPIRB, SART & GMDSS · Leçon 1/5 · Free",
      title:"Every Maritime Emergency Begins with One Decision",
      intro:"Cette leçon ne réexplique pas le fonctionnement du GMDSS, des zones A1-A4, ni des équipements EPIRB/SART — tout cela est déjà couvert en profondeur dans le module Deck (Signalisation & Balisage).\n\nIci, la question est différente : à quel moment précis une situation devient-elle une détresse réelle, et pourquoi hésite-t-on parfois à la reconnaître alors que des vies sont en jeu ?",
      p0:"EVERY MARITIME EMERGENCY BEGINS WITH ONE DECISION",s0t:"La compétence la plus sous-estimée en mer",
      s0:"Aucun accident grave ne commence par une catastrophe. Il commence par une décision — ou une absence de décision — au moment où un signal aurait dû être pris au sérieux.\n\nCOMMENT PRÉVENIR L'ACCIDENT ? En sachant reconnaître tôt le moment où une situation change de nature.\nQUE FAIRE FACE AU DOUTE ? Vérifier activement plutôt qu'attendre passivement.\nQUELLE LEÇON RETENIR ? La compétence qui sauve des vies n'est pas de connaître le GMDSS par cœur, mais de savoir quand l'utiliser.",
      p1:"LE SEUIL DE DÉTRESSE",s1t:"Ce qui distingue un incident d'une détresse",
      s1:"Un incident est gérable, isolé, sans danger immédiat pour des vies. Une détresse implique un danger grave et imminent. Le seuil n'est pas toujours évident sur le moment — c'est justement pour cela qu'il faut apprendre à le reconnaître, plutôt que de compter sur l'instinct seul.",
      p2:"LE COÛT DE L'HÉSITATION",s2t:"Chaque minute perdue réduit la marge de sauvetage",
      s2:"Attendre d'être sûr avant d'agir semble prudent. En réalité, chaque minute d'hésitation réduit mécaniquement le temps disponible pour organiser un sauvetage efficace — un temps qu'on ne récupère jamais ensuite.",
      p3:"PROGRESSIVE EMERGENCIES",s3t:"La catastrophe est rarement une explosion — c'est une accumulation",
      s3:"La plupart des urgences maritimes graves ne commencent pas par un événement brutal. Elles commencent par une odeur, une vibration, une petite fuite, une alarme, une pompe qui tourne un peu plus longtemps que d'habitude. C'est exactement ce schéma qu'on retrouve dans des catastrophes bien documentées comme El Faro, l'Estonia, l'Herald of Free Enterprise ou le Sewol : jamais une explosion soudaine, toujours une accumulation de signaux qui, pris ensemble, auraient dû alerter bien plus tôt.",
      p4:"FAUSSE ALERTE VS DÉTRESSE RÉELLE",s4t:"L'asymétrie des coûts",
      s4:"Mariners are trained to avoid false alarms. They must also be trained not to fear them.\n\nUne fausse alerte corrigée coûte quelques minutes et un peu d'amour-propre. Une détresse non déclarée à temps peut coûter des vies, de façon irréversible. Ces deux coûts ne sont jamais comparables.",
      p5:"NORMALIZATION OF DEVIANCE",s5t:"Quand l'anormal devient invisible",
      s5:"Popularisé après la catastrophe de la navette Challenger, ce concept s'applique parfaitement au maritime : \"cette pompe tourne toujours un peu\", \"cette porte ferme mal depuis des mois\", \"cette gîte est normale ici\". Chaque tolérance répétée rend l'anomalie suivante un peu plus acceptable — jusqu'au jour où elle ne l'est plus.",
      p6:"LA DÉCISION DE DÉCLARER",s6t:"Observer, décider, agir, réévaluer — appliqué à la détresse",
      s6:"Face à un doute sur la gravité d'une situation, un cadre simple aide à trancher : observer les signaux réellement vérifiés, décider en fonction de leur accumulation, agir comme en détresse si le doute persiste, puis réévaluer en continu.",
      p7:"ERREURS FRÉQUENTES DANS LA RECONNAISSANCE DE LA DÉTRESSE",s7t:"Attendre une confirmation qui ne vient jamais",
      s7:"Attendre l'aval d'un supérieur avant d'agir, minimiser par crainte du ridicule, espérer que quelqu'un d'autre prenne la décision à sa place — ces réflexes reviennent dans la plupart des cas étudiés de reconnaissance tardive.",
      p8:"🎯 EXERCICE OPÉRATIONNEL",p9:"⚠️ CAS RÉEL",p10:"📝 BANQUE DE 15 QUESTIONS",p11:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 1",
      sumP:["Une détresse = danger grave et imminent pour des vies, pas une simple gêne","Chaque minute d'hésitation réduit la marge de sauvetage disponible","Les urgences graves s'accumulent progressivement, elles n'explosent pas soudainement","Une fausse alerte corrigée coûte peu ; une détresse non déclarée peut coûter des vies","La normalisation de la déviance rend l'anormal invisible avec le temps"],
      learnedP:["Le seuil de détresse et son coût d'hésitation","Progressive Emergencies : l'accumulation de signaux faibles","L'asymétrie fausse alerte vs détresse réelle","Normalization of Deviance appliquée au maritime","Le cadre de décision pour déclarer une détresse"],
      safetyMsg:"The sea rarely gives a second chance. The hardest part of saving lives is recognizing the moment when hesitation must end and action must begin.",
    },
    en:{
      badge:"🆘 Safety · EPIRB, SART & GMDSS · Lesson 1/5 · Free",
      title:"Every Maritime Emergency Begins with One Decision",
      intro:"This lesson does not re-explain how GMDSS, A1-A4 zones, or EPIRB/SART equipment work — all of that is already covered in depth in the Deck module (Signaling & Buoyage).\n\nHere, the question is different: at what exact moment does a situation become real distress, and why do mariners sometimes hesitate to recognize it while lives are at stake?",
      p0:"EVERY MARITIME EMERGENCY BEGINS WITH ONE DECISION",s0t:"The most underestimated skill at sea",
      s0:"No serious accident begins with a catastrophe. It begins with a decision — or the absence of one — at the moment a signal should have been taken seriously.\n\nHOW TO PREVENT THE ACCIDENT? By recognizing early the moment a situation changes nature.\nWHAT TO DO FACING DOUBT? Actively verify rather than passively wait.\nWHAT LESSON TO RETAIN? The skill that saves lives is not knowing GMDSS by heart — it is knowing when to use it.",
      p1:"THE DISTRESS THRESHOLD",s1t:"What distinguishes an incident from distress",
      s1:"An incident is manageable, isolated, with no immediate danger to life. Distress implies grave and imminent danger. The threshold is not always obvious in the moment — which is exactly why it must be learned to recognize, rather than relying on instinct alone.",
      p2:"THE COST OF HESITATION",s2t:"Every lost minute shrinks the rescue margin",
      s2:"Waiting to be sure before acting feels prudent. In reality, every minute of hesitation mechanically reduces the time available to organize an effective rescue — time that can never be recovered afterward.",
      p3:"PROGRESSIVE EMERGENCIES",s3t:"Disaster is rarely an explosion — it's an accumulation",
      s3:"Most serious maritime emergencies do not begin with a sudden event. They begin with a smell, a vibration, a small leak, an alarm, a pump running a little longer than usual. This exact pattern appears in well-documented disasters like El Faro, the Estonia, the Herald of Free Enterprise, or the Sewol: never a sudden explosion, always an accumulation of signals that, taken together, should have raised the alarm much earlier.",
      p4:"FALSE ALARM VS REAL DISTRESS",s4t:"The cost asymmetry",
      s4:"Mariners are trained to avoid false alarms. They must also be trained not to fear them.\n\nA corrected false alarm costs a few minutes and a little pride. Distress not declared in time can cost lives, irreversibly. These two costs are never comparable.",
      p5:"NORMALIZATION OF DEVIANCE",s5t:"When the abnormal becomes invisible",
      s5:"Popularized after the Challenger shuttle disaster, this concept applies perfectly to the maritime world: \"that pump always runs a bit\", \"that door has closed badly for months\", \"this list is normal here\". Each repeated tolerance makes the next anomaly a little more acceptable — until the day it no longer is.",
      p6:"THE DECISION TO DECLARE",s6t:"Observe, decide, act, reassess — applied to distress",
      s6:"Facing doubt about the severity of a situation, a simple framework helps decide: observe the actually verified signals, decide based on their accumulation, act as in distress if doubt persists, then continuously reassess.",
      p7:"FREQUENT ERRORS IN RECOGNIZING DISTRESS",s7t:"Waiting for a confirmation that never comes",
      s7:"Waiting for a senior's approval before acting, minimizing out of fear of ridicule, hoping someone else will make the decision instead — these reflexes recur in most studied cases of late recognition.",
      p8:"🎯 OPERATIONAL EXERCISE",p9:"⚠️ REAL ACCIDENT CASE",p10:"📝 15-QUESTION BANK",p11:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 1",
      sumP:["Distress = grave and imminent danger to life, not mere inconvenience","Every minute of hesitation reduces the available rescue margin","Serious emergencies accumulate progressively, they don't explode suddenly","A corrected false alarm costs little; undeclared distress can cost lives","Normalization of deviance makes the abnormal invisible over time"],
      learnedP:["The distress threshold and the cost of hesitation","Progressive Emergencies: the accumulation of weak signals","The false alarm vs real distress asymmetry","Normalization of Deviance applied to the maritime world","The decision framework for declaring distress"],
      safetyMsg:"The sea rarely gives a second chance. The hardest part of saving lives is recognizing the moment when hesitation must end and action must begin.",
    },
    es:{
      badge:"🆘 Seguridad · EPIRB, SART y GMDSS · Lección 1/5 · Free",
      title:"Every Maritime Emergency Begins with One Decision",
      intro:"Esta lección no reexplica el funcionamiento del GMDSS, las zonas A1-A4, ni el equipo EPIRB/SART — todo eso ya está cubierto en profundidad en el módulo Deck (Señalización y Balizamiento).\n\nAquí, la pregunta es diferente: ¿en qué momento exacto una situación se convierte en una emergencia real, y por qué a veces se duda en reconocerla mientras hay vidas en juego?",
      p0:"EVERY MARITIME EMERGENCY BEGINS WITH ONE DECISION",s0t:"La habilidad más subestimada en el mar",
      s0:"Ningún accidente grave comienza con una catástrofe. Comienza con una decisión — o la ausencia de una — en el momento en que una señal debería haberse tomado en serio.\n\n¿CÓMO PREVENIR EL ACCIDENTE? Reconociendo pronto el momento en que una situación cambia de naturaleza.\n¿QUÉ HACER ANTE LA DUDA? Verificar activamente en lugar de esperar pasivamente.\n¿QUÉ LECCIÓN RETENER? La habilidad que salva vidas no es conocer el GMDSS de memoria, sino saber cuándo usarlo.",
      p1:"EL UMBRAL DE EMERGENCIA",s1t:"Lo que distingue un incidente de una emergencia",
      s1:"Un incidente es manejable, aislado, sin peligro inmediato para la vida. Una emergencia implica peligro grave e inminente. El umbral no siempre es obvio en el momento — precisamente por eso hay que aprender a reconocerlo, en lugar de confiar solo en el instinto.",
      p2:"EL COSTE DE LA DUDA",s2t:"Cada minuto perdido reduce el margen de rescate",
      s2:"Esperar a estar seguro antes de actuar parece prudente. En realidad, cada minuto de duda reduce mecánicamente el tiempo disponible para organizar un rescate eficaz — tiempo que nunca se recupera después.",
      p3:"PROGRESSIVE EMERGENCIES",s3t:"El desastre rara vez es una explosión — es una acumulación",
      s3:"La mayoría de las emergencias marítimas graves no comienzan con un evento repentino. Comienzan con un olor, una vibración, una pequeña fuga, una alarma, una bomba que funciona un poco más de lo habitual. Este mismo patrón aparece en desastres bien documentados como El Faro, el Estonia, el Herald of Free Enterprise o el Sewol: nunca una explosión repentina, siempre una acumulación de señales que, juntas, deberían haber alertado mucho antes.",
      p4:"FALSA ALARMA VS EMERGENCIA REAL",s4t:"La asimetría de costes",
      s4:"Mariners are trained to avoid false alarms. They must also be trained not to fear them.\n\nUna falsa alarma corregida cuesta unos minutos y algo de orgullo. Una emergencia no declarada a tiempo puede costar vidas, de forma irreversible. Estos dos costes nunca son comparables.",
      p5:"NORMALIZATION OF DEVIANCE",s5t:"Cuando lo anormal se vuelve invisible",
      s5:"Popularizado tras el desastre del transbordador Challenger, este concepto se aplica perfectamente al ámbito marítimo: \"esa bomba siempre funciona un poco\", \"esa puerta cierra mal desde hace meses\", \"esta escora es normal aquí\". Cada tolerancia repetida hace que la siguiente anomalía sea un poco más aceptable — hasta que deja de serlo.",
      p6:"LA DECISIÓN DE DECLARAR",s6t:"Observar, decidir, actuar, reevaluar — aplicado a la emergencia",
      s6:"Ante la duda sobre la gravedad de una situación, un marco simple ayuda a decidir: observar las señales realmente verificadas, decidir según su acumulación, actuar como en emergencia si la duda persiste, luego reevaluar continuamente.",
      p7:"ERRORES FRECUENTES EN EL RECONOCIMIENTO DE LA EMERGENCIA",s7t:"Esperar una confirmación que nunca llega",
      s7:"Esperar la aprobación de un superior antes de actuar, minimizar por miedo al ridículo, esperar que otro tome la decisión — estos reflejos se repiten en la mayoría de los casos estudiados de reconocimiento tardío.",
      p8:"🎯 EJERCICIO OPERATIVO",p9:"⚠️ CASO REAL",p10:"📝 BANCO DE 15 PREGUNTAS",p11:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 1",
      sumP:["Emergencia = peligro grave e inminente para la vida, no una simple molestia","Cada minuto de duda reduce el margen de rescate disponible","Las emergencias graves se acumulan progresivamente, no explotan de repente","Una falsa alarma corregida cuesta poco; una emergencia no declarada puede costar vidas","La normalización de la desviación vuelve invisible lo anormal con el tiempo"],
      learnedP:["El umbral de emergencia y el coste de la duda","Progressive Emergencies: la acumulación de señales débiles","La asimetría falsa alarma vs emergencia real","Normalization of Deviance aplicada al ámbito marítimo","El marco de decisión para declarar una emergencia"],
      safetyMsg:"The sea rarely gives a second chance. The hardest part of saving lives is recognizing the moment when hesitation must end and action must begin.",
    },
    pt:{
      badge:"🆘 Segurança · EPIRB, SART e GMDSS · Lição 1/5 · Free",
      title:"Every Maritime Emergency Begins with One Decision",
      intro:"Esta lição não reexplica o funcionamento do GMDSS, das zonas A1-A4, nem do equipamento EPIRB/SART — tudo isso já está coberto em profundidade no módulo Deck (Sinalização e Balizamento).\n\nAqui, a pergunta é diferente: em que momento exato uma situação se torna uma emergência real, e por que às vezes se hesita em reconhecê-la enquanto vidas estão em jogo?",
      p0:"EVERY MARITIME EMERGENCY BEGINS WITH ONE DECISION",s0t:"A competência mais subestimada no mar",
      s0:"Nenhum acidente grave começa com uma catástrofe. Começa com uma decisão — ou a ausência de uma — no momento em que um sinal deveria ter sido levado a sério.\n\nCOMO PREVENIR O ACIDENTE? Reconhecendo cedo o momento em que uma situação muda de natureza.\nO QUE FAZER PERANTE A DÚVIDA? Verificar ativamente em vez de esperar passivamente.\nQUE LIÇÃO RETER? A competência que salva vidas não é conhecer o GMDSS de cor, mas saber quando usá-lo.",
      p1:"O LIMIAR DA EMERGÊNCIA",s1t:"O que distingue um incidente de uma emergência",
      s1:"Um incidente é gerível, isolado, sem perigo imediato para a vida. Uma emergência implica perigo grave e iminente. O limiar nem sempre é óbvio no momento — precisamente por isso é preciso aprender a reconhecê-lo, em vez de contar apenas com o instinto.",
      p2:"O CUSTO DA HESITAÇÃO",s2t:"Cada minuto perdido reduz a margem de resgate",
      s2:"Esperar ter a certeza antes de agir parece prudente. Na realidade, cada minuto de hesitação reduz mecanicamente o tempo disponível para organizar um resgate eficaz — tempo que nunca se recupera depois.",
      p3:"PROGRESSIVE EMERGENCIES",s3t:"O desastre raramente é uma explosão — é uma acumulação",
      s3:"A maioria das emergências marítimas graves não começa com um evento súbito. Começam com um cheiro, uma vibração, uma pequena fuga, um alarme, uma bomba a funcionar um pouco mais do que o habitual. Este mesmo padrão aparece em desastres bem documentados como o El Faro, o Estonia, o Herald of Free Enterprise ou o Sewol: nunca uma explosão súbita, sempre uma acumulação de sinais que, juntos, deveriam ter alertado muito antes.",
      p4:"FALSO ALARME VS EMERGÊNCIA REAL",s4t:"A assimetria dos custos",
      s4:"Mariners are trained to avoid false alarms. They must also be trained not to fear them.\n\nUm falso alarme corrigido custa alguns minutos e algum orgulho. Uma emergência não declarada a tempo pode custar vidas, de forma irreversível. Estes dois custos nunca são comparáveis.",
      p5:"NORMALIZATION OF DEVIANCE",s5t:"Quando o anormal se torna invisível",
      s5:"Popularizado após o desastre do vaivém Challenger, este conceito aplica-se perfeitamente ao meio marítimo: \"essa bomba funciona sempre um pouco\", \"essa porta fecha mal há meses\", \"este adornamento é normal aqui\". Cada tolerância repetida torna a próxima anomalia um pouco mais aceitável — até deixar de o ser.",
      p6:"A DECISÃO DE DECLARAR",s6t:"Observar, decidir, agir, reavaliar — aplicado à emergência",
      s6:"Perante a dúvida sobre a gravidade de uma situação, um quadro simples ajuda a decidir: observar os sinais realmente verificados, decidir com base na sua acumulação, agir como numa emergência se a dúvida persistir, depois reavaliar continuamente.",
      p7:"ERROS FREQUENTES NO RECONHECIMENTO DA EMERGÊNCIA",s7t:"Esperar por uma confirmação que nunca chega",
      s7:"Esperar pela aprovação de um superior antes de agir, minimizar por medo do ridículo, esperar que outra pessoa tome a decisão — estes reflexos repetem-se na maioria dos casos estudados de reconhecimento tardio.",
      p8:"🎯 EXERCÍCIO OPERACIONAL",p9:"⚠️ CASO REAL",p10:"📝 BANCO DE 15 PERGUNTAS",p11:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 1",
      sumP:["Emergência = perigo grave e iminente para a vida, não um simples incómodo","Cada minuto de hesitação reduz a margem de resgate disponível","As emergências graves acumulam-se progressivamente, não explodem subitamente","Um falso alarme corrigido custa pouco; uma emergência não declarada pode custar vidas","A normalização do desvio torna o anormal invisível com o tempo"],
      learnedP:["O limiar da emergência e o custo da hesitação","Progressive Emergencies: a acumulação de sinais fracos","A assimetria falso alarme vs emergência real","Normalization of Deviance aplicada ao meio marítimo","O quadro de decisão para declarar uma emergência"],
      safetyMsg:"The sea rarely gives a second chance. The hardest part of saving lives is recognizing the moment when hesitation must end and action must begin.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS2_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/5":lang==="en"?"Lesson 1/5":lang==="es"?"Lección 1/5":"Lição 1/5"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(30,138,74,0.2)",border:`1px solid ${C.green}44`,color:C.green,fontWeight:700}}>FREE</div>
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

            <SL icon="⚡" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🚨" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚨</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🪜 {lang==="fr"?"POINT OF NO RETURN — INTERACTIF":lang==="en"?"POINT OF NO RETURN — INTERACTIVE":lang==="es"?"PUNTO DE NO RETORNO — INTERACTIVO":"PONTO SEM RETORNO — INTERATIVO"}</div><PointOfNoReturnSVG lang={lang}/></Card>

            <SL icon="⏱️" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏱️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="📈" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📈</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔍 {lang==="fr"?"SIGNAUX AVANT-COUREURS — INTERACTIF":lang==="en"?"WARNING SIGNS — INTERACTIVE":lang==="es"?"SEÑALES DE ADVERTENCIA — INTERACTIVO":"SINAIS DE AVISO — INTERATIVO"}</div><WarningSignsSVG lang={lang}/></Card>

            <SL icon="⚖️" text={lc.p4} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚖️ {lang==="fr"?"COÛT ASYMÉTRIQUE — INTERACTIF":lang==="en"?"COST ASYMMETRY — INTERACTIVE":lang==="es"?"ASIMETRÍA DE COSTES — INTERACTIVO":"ASSIMETRIA DE CUSTOS — INTERATIVO"}</div><CostAsymmetrySVG lang={lang}/></Card>

            <SL icon="🌀" text={lc.p5} color={C.purple}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌀</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="🔄" text={lc.p6} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔄</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔄 {lang==="fr"?"RÉFLEXE DE DÉCISION — INTERACTIF":lang==="en"?"DECISION REFLEX — INTERACTIVE":lang==="es"?"REFLEJO DE DECISIÓN — INTERACTIVO":"REFLEXO DE DECISÃO — INTERATIVO"}</div><DecisionReflexSVG lang={lang}/></Card>

            <SL icon="⚠️" text={lc.p7} color={C.red}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚠️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s7t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s7}</div></Card>

            <SL icon="🎯" text={lc.p8} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p9} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p10} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p11} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final — Reconnaître la Détresse":lang==="en"?"Final Quiz — Recognizing Distress":lang==="es"?"Quiz Final — Reconocer la Emergencia":"Quiz Final — Reconhecer a Emergência"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 1/5":"questions · Lesson 1/5"}</div>
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

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 2 — CHOISIR LE BON ÉQUIPEMENT →":lang==="en"?"LESSON 2 — SELECTING THE RIGHT EQUIPMENT →":lang==="es"?"LECCIÓN 2 — SELECCIONAR EL EQUIPO ADECUADO →":"LIÇÃO 2 — SELECIONAR O EQUIPAMENTO CERTO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
