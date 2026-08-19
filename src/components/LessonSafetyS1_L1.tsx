import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  amber:"#e8963f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Sécurité", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Safety", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Seguridad", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Segurança", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — SWISS CHEESE MODEL
// ══════════════════════════════════════
function SwissCheeseSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const layers = [
    { id:"org", color:C.purple,
      label:{fr:"Organisation",en:"Organization",es:"Organización",pt:"Organização"},
      desc:{fr:"Décisions lointaines : planning irréaliste, sous-effectif, pression commerciale sur les délais.\nCe niveau crée les conditions qui rendent l'erreur possible bien avant que le marin ne soit en quart.",
            en:"Distant decisions: unrealistic scheduling, understaffing, commercial pressure on deadlines.\nThis level creates the conditions that make error possible long before the mariner is even on watch.",
            es:"Decisiones lejanas: planificación irreal, falta de personal, presión comercial sobre los plazos.\nEste nivel crea las condiciones que hacen posible el error mucho antes de que el marino esté de guardia.",
            pt:"Decisões distantes: planeamento irrealista, falta de pessoal, pressão comercial sobre prazos.\nEste nível cria as condições que tornam o erro possível muito antes do marítimo estar de quarto."} },
    { id:"sup", color:C.blue2,
      label:{fr:"Supervision",en:"Supervision",es:"Supervisión",pt:"Supervisão"},
      desc:{fr:"Manque de contrôle réel : plannings de quart mal équilibrés, formation insuffisante, tolérance silencieuse aux raccourcis.",
            en:"Lack of real oversight: poorly balanced watch schedules, insufficient training, silent tolerance of shortcuts.",
            es:"Falta de control real: horarios de guardia mal equilibrados, formación insuficiente, tolerancia silenciosa a los atajos.",
            pt:"Falta de controlo real: escalas de quarto mal equilibradas, formação insuficiente, tolerância silenciosa a atalhos."} },
    { id:"cond", color:C.orange,
      label:{fr:"Conditions",en:"Conditions",es:"Condiciones",pt:"Condições"},
      desc:{fr:"L'environnement du moment : fatigue accumulée, nuit noire, mauvais temps, charge de travail élevée, stress.",
            en:"The environment at the moment: accumulated fatigue, dark night, bad weather, high workload, stress.",
            es:"El entorno del momento: fatiga acumulada, noche oscura, mal tiempo, alta carga de trabajo, estrés.",
            pt:"O ambiente do momento: fadiga acumulada, noite escura, mau tempo, carga de trabalho elevada, stress."} },
    { id:"act", color:C.red,
      label:{fr:"Acte actif",en:"Active act",es:"Acto activo",pt:"Ato ativo"},
      desc:{fr:"L'erreur visible : une mauvaise lecture radar, une décision tardive, un silence au mauvais moment.\nC'est la seule couche que l'on voit — mais elle n'est presque jamais la seule cause.",
            en:"The visible error: a misread radar, a late decision, silence at the wrong moment.\nThis is the only layer we usually see — but it is almost never the only cause.",
            es:"El error visible: una mala lectura del radar, una decisión tardía, un silencio en el momento equivocado.\nEs la única capa que solemos ver, pero casi nunca es la única causa.",
            pt:"O erro visível: uma má leitura do radar, uma decisão tardia, um silêncio no momento errado.\nÉ a única camada que normalmente vemos, mas quase nunca é a única causa."} },
  ];
  const sel_ = sel!==null ? layers[sel] : null;
  return (
    <div>
      <div style={{position:"relative",height:150,marginBottom:10}}>
        <svg width="100%" height="150" viewBox="0 0 300 150" style={{overflow:"visible"}}>
          {layers.map((l,i)=>{
            const y = 10+i*32;
            const holes = [[40+i*14,10],[150-i*10,16],[230+i*6,8]];
            return (
              <g key={l.id} onClick={()=>setSel(sel===i?null:i)} style={{cursor:"pointer"}}>
                <rect x="10" y={y} width="280" height="24" rx="6"
                  fill={sel===i?`${l.color}33`:"rgba(255,255,255,0.05)"}
                  stroke={sel===i?l.color:"rgba(255,255,255,0.15)"} strokeWidth={sel===i?2:1}/>
                {holes.map((h,hi)=><circle key={hi} cx={h[0]} cy={y+12} r={h[1]} fill={C.navy}/>)}
                <text x="20" y={y+16} fontSize="9" fontWeight="700" fill={sel===i?l.color:C.muted}>{l.label[lang]||l.label.fr}</text>
              </g>
            );
          })}
          <line x1="270" y1="14" x2="30" y2="130" stroke={C.red} strokeWidth="2" strokeDasharray="3,3" opacity="0.7"/>
          <circle cx="270" cy="14" r="3" fill={C.red}/>
          <circle cx="30" cy="130" r="3" fill={C.red}/>
        </svg>
      </div>
      {sel_ ? (
        <div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      ) : (
        <div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche une couche pour voir comment l'accident traverse les défenses":lang==="en"?"Tap a layer to see how the accident travels through the defenses":lang==="es"?"Toca una capa para ver cómo el accidente atraviesa las defensas":"Toque numa camada para ver como o acidente atravessa as defesas"}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — FATIGUE & SLEEP DEBT CURVE
// ══════════════════════════════════════
function FatigueSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const pts = [
    { h:"00h", risk:55, note:{fr:"Début de quart de nuit — vigilance encore correcte",en:"Start of night watch — alertness still acceptable",es:"Inicio de guardia nocturna — vigilancia aún aceptable",pt:"Início do quarto de noite — vigilância ainda aceitável"} },
    { h:"02h", risk:80, note:{fr:"Creux circadien — le corps réclame le sommeil, micro-sommeil possible",en:"Circadian low — the body demands sleep, micro-sleep possible",es:"Bajón circadiano — el cuerpo exige dormir, posible microsueño",pt:"Vale circadiano — o corpo exige sono, micro-sono possível"} },
    { h:"04h", risk:95, note:{fr:"Zone la plus dangereuse : temps de réaction dégradé comme après plusieurs verres d'alcool",en:"Most dangerous zone: reaction time degraded like after several alcoholic drinks",es:"Zona más peligrosa: tiempo de reacción degradado como tras varias copas de alcohol",pt:"Zona mais perigosa: tempo de reação degradado como após várias doses de álcool"} },
    { h:"06h", risk:65, note:{fr:"Fin de quart — fatigue encore élevée malgré la fin apparente du danger",en:"End of watch — fatigue still high despite the apparent end of danger",es:"Fin de guardia — fatiga aún alta pese al aparente fin del peligro",pt:"Fim do quarto — fadiga ainda alta apesar do fim aparente do perigo"} },
  ];
  const W=280,H=110;
  const sel_ = sel!==null ? pts[sel] : null;
  return (
    <div>
      <svg width="100%" height={H+30} viewBox={`0 0 ${W} ${H+30}`}>
        <line x1="0" y1={H} x2={W} y2={H} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <path d={`M0,${H-pts[0].risk*0.7} ${pts.map((p,i)=>`L${i*(W/3)},${H-p.risk*0.7}`).join(" ")}`} fill="none" stroke={C.orange} strokeWidth="2"/>
        {pts.map((p,i)=>(
          <g key={i} onClick={()=>setSel(sel===i?null:i)} style={{cursor:"pointer"}}>
            <circle cx={i*(W/3)} cy={H-p.risk*0.7} r={sel===i?7:5} fill={sel===i?C.red:C.orange}/>
            <text x={i*(W/3)} y={H+18} fontSize="10" textAnchor="middle" fill={C.muted}>{p.h}</text>
          </g>
        ))}
        <text x="4" y="12" fontSize="8" fill={C.muted}>{lang==="fr"?"RISQUE":lang==="en"?"RISK":lang==="es"?"RIESGO":"RISCO"}</text>
      </svg>
      {sel_ ? (
        <div style={{padding:"10px 12px",borderRadius:12,background:`${C.orange}15`,border:`1px solid ${C.orange}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.note[lang]||sel_.note.fr}</div>
      ) : (
        <div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche un point de la courbe":lang==="en"?"Tap a point on the curve":lang==="es"?"Toca un punto de la curva":"Toque num ponto da curva"}</div>
      )}
      <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,fontSize:11,color:C.white,lineHeight:1.7}}>
        {lang==="fr"?"💤 DETTE DE SOMMEIL : dormir 4h une nuit ne se \"rattrape\" pas le lendemain. La dette s'accumule sur plusieurs jours de quart et dégrade le jugement même quand on se sent \"habitué\".":
         lang==="en"?"💤 SLEEP DEBT: sleeping 4h one night is not \"made up for\" the next day. Debt accumulates over several days on watch and degrades judgment even when you feel \"used to it\".":
         lang==="es"?"💤 DEUDA DE SUEÑO: dormir 4h una noche no se \"recupera\" al día siguiente. La deuda se acumula durante varios días de guardia y degrada el juicio incluso cuando uno se siente \"acostumbrado\".":
         "💤 DÍVIDA DE SONO: dormir 4h numa noite não é \"compensado\" no dia seguinte. A dívida acumula-se ao longo de vários dias de quarto e degrada o julgamento mesmo quando nos sentimos \"habituados\"."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — AUTOMATION BIAS (Radar vs Reality)
// ══════════════════════════════════════
function AutomationBiasSVG({ lang }) {
  const [side, setSide] = useState("radar");
  const d = {
    radar:{fr:"L'ARPA affiche un CPA confortable de 1.2 mille. Vecteur stable depuis 3 minutes. Rien ne semble anormal sur l'écran.",
           en:"ARPA shows a comfortable CPA of 1.2 miles. Vector stable for 3 minutes. Nothing looks abnormal on screen.",
           es:"El ARPA muestra un CPA cómodo de 1.2 millas. Vector estable desde hace 3 minutos. Nada parece anormal en pantalla.",
           pt:"O ARPA mostra um CPA confortável de 1.2 milhas. Vetor estável há 3 minutos. Nada parece anormal no ecrã."},
    reality:{fr:"L'autre navire vient d'altérer sa route de 15° sans que le vecteur ARPA se soit encore stabilisé sur la nouvelle trajectoire — l'écran affiche encore l'ancienne route.",
             en:"The other vessel just altered course by 15° before the ARPA vector had stabilized on the new track — the screen still shows the old course.",
             es:"El otro buque acaba de alterar el rumbo 15° antes de que el vector ARPA se estabilizara en la nueva trayectoria — la pantalla aún muestra el rumbo anterior.",
             pt:"O outro navio acabou de alterar o rumo em 15° antes de o vetor ARPA estabilizar na nova trajetória — o ecrã ainda mostra o rumo antigo."},
  };
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["radar","reality"].map(k=>(
          <button key={k} onClick={()=>setSide(k)} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${side===k?C.blue2:"rgba(255,255,255,0.12)"}`,background:side===k?`${C.blue2}22`:"rgba(255,255,255,0.04)",color:side===k?C.blue2:C.muted,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {k==="radar"?(lang==="fr"?"📟 CE QUE DIT L'ARPA":lang==="en"?"📟 WHAT ARPA SAYS":lang==="es"?"📟 LO QUE DICE EL ARPA":"📟 O QUE DIZ O ARPA"):(lang==="fr"?"👁️ CE QUI SE PASSE VRAIMENT":lang==="en"?"👁️ WHAT IS REALLY HAPPENING":lang==="es"?"👁️ LO QUE REALMENTE OCURRE":"👁️ O QUE REALMENTE ACONTECE")}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:12,background:side==="radar"?"rgba(26,111,212,0.1)":"rgba(192,57,43,0.1)",border:`1px solid ${side==="radar"?C.blue2:C.red}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{d[side][lang]||d[side].fr}</div>
      <div style={{marginTop:8,fontSize:11,color:C.gold2,lineHeight:1.6,fontStyle:"italic"}}>
        {lang==="fr"?"⚡ Automation bias = faire confiance à l'écran plus qu'à ses propres yeux et à une vérification croisée. Le radar est un outil, pas une preuve absolue.":
         lang==="en"?"⚡ Automation bias = trusting the screen more than your own eyes and cross-checking. Radar is a tool, not absolute proof.":
         lang==="es"?"⚡ Sesgo de automatización = confiar más en la pantalla que en los propios ojos y en la verificación cruzada. El radar es una herramienta, no una prueba absoluta.":
         "⚡ Viés de automação = confiar mais no ecrã do que nos próprios olhos e na verificação cruzada. O radar é uma ferramenta, não uma prova absoluta."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — COMMUNICATION & ASSERTIVENESS
// ══════════════════════════════════════
function CommAssertivenessSVG({ lang }) {
  const [open, setOpen] = useState(null);
  const pairs = [
    { id:"p1", bad:{fr:"\"Euh... vous êtes sûr de ce cap, Capitaine ?\"",en:"\"Uh... are you sure about that heading, Captain?\"",es:"\"Eh... ¿está seguro de ese rumbo, Capitán?\"",pt:"\"Hã... tem a certeza desse rumo, Comandante?\""},
      good:{fr:"\"Capitaine, je vois un contact à l'ARPA avec un CPA de 0.3 mille dans 6 minutes — je recommande une réduction de vitesse immédiate.\"",en:"\"Captain, I have an ARPA contact with a CPA of 0.3 miles in 6 minutes — I recommend an immediate speed reduction.\"",es:"\"Capitán, tengo un contacto ARPA con un CPA de 0.3 millas en 6 minutos — recomiendo una reducción de velocidad inmediata.\"",pt:"\"Comandante, tenho um contacto ARPA com um CPA de 0.3 milhas em 6 minutos — recomendo uma redução de velocidade imediata.\""} },
    { id:"p2", bad:{fr:"\"OK\" (sans répéter l'ordre reçu)",en:"\"OK\" (without repeating the order received)",es:"\"Vale\" (sin repetir la orden recibida)",pt:"\"OK\" (sem repetir a ordem recebida)"},
      good:{fr:"\"Compris : cap au 090, réduction à 8 nœuds.\" (boucle fermée : je répète pour confirmer)",en:"\"Understood: heading 090, reducing to 8 knots.\" (closed loop: I repeat back to confirm)",es:"\"Entendido: rumbo 090, reduciendo a 8 nudos.\" (bucle cerrado: repito para confirmar)",pt:"\"Entendido: rumo 090, reduzindo a 8 nós.\" (ciclo fechado: repito para confirmar)"} },
  ];
  return (
    <div>
      {pairs.map((p,i)=>(
        <div key={p.id} style={{marginBottom:10}}>
          <div onClick={()=>setOpen(open===p.id?null:p.id)} style={{padding:"10px 12px",borderRadius:12,cursor:"pointer",background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}33`,marginBottom:open===p.id?6:0}}>
            <div style={{fontSize:9,color:C.red,fontWeight:700,marginBottom:3}}>{lang==="fr"?"❌ AMBIGU / HÉSITANT":lang==="en"?"❌ AMBIGUOUS / HESITANT":lang==="es"?"❌ AMBIGUO / DUBITATIVO":"❌ AMBÍGUO / HESITANTE"}</div>
            <div style={{fontSize:12,color:C.white,lineHeight:1.5}}>{p.bad[lang]||p.bad.fr}</div>
          </div>
          {open===p.id&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1.5px solid ${C.green}44`,animation:"fadeUp 0.3s ease"}}>
            <div style={{fontSize:9,color:C.green,fontWeight:700,marginBottom:3}}>{lang==="fr"?"✅ ASSERTIF / BOUCLE FERMÉE":lang==="en"?"✅ ASSERTIVE / CLOSED LOOP":lang==="es"?"✅ ASERTIVO / BUCLE CERRADO":"✅ ASSERTIVO / CICLO FECHADO"}</div>
            <div style={{fontSize:12,color:C.white,lineHeight:1.5}}>{p.good[lang]||p.good.fr}</div>
          </div>}
        </div>
      ))}
      {!open&&<div style={{textAlign:"center",fontSize:10,color:C.muted,marginTop:4}}>{lang==="fr"?"Touche une phrase pour voir la version assertive":lang==="en"?"Tap a phrase to see the assertive version":lang==="es"?"Toca una frase para ver la versión asertiva":"Toque numa frase para ver a versão assertiva"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 5 — HUMAN FACTORS WHEEL
// ══════════════════════════════════════
function HumanFactorsWheel({ lang }) {
  const [sel, setSel] = useState(null);
  const factors = [
    { id:"fatigue", icon:"😴", color:C.orange, label:{fr:"Fatigue",en:"Fatigue",es:"Fatiga",pt:"Fadiga"} },
    { id:"distract", icon:"👀", color:C.blue2, label:{fr:"Distraction",en:"Distraction",es:"Distracción",pt:"Distração"} },
    { id:"bias", icon:"📟", color:C.teal, label:{fr:"Automation Bias",en:"Automation Bias",es:"Sesgo Automatización",pt:"Viés de Automação"} },
    { id:"comm", icon:"🗣️", color:C.purple, label:{fr:"Communication",en:"Communication",es:"Comunicación",pt:"Comunicação"} },
    { id:"pressure", icon:"⏱️", color:C.red, label:{fr:"Pression Opérationnelle",en:"Operational Pressure",es:"Presión Operativa",pt:"Pressão Operacional"} },
    { id:"culture", icon:"🛡️", color:C.gold2, label:{fr:"Culture Sécurité",en:"Safety Culture",es:"Cultura Seguridad",pt:"Cultura de Segurança"} },
  ];
  const descs = {
    fatigue:{fr:"Baisse mesurable du temps de réaction et du jugement après un manque de sommeil prolongé.",en:"Measurable drop in reaction time and judgment after prolonged lack of sleep.",es:"Caída medible del tiempo de reacción y del juicio tras una falta de sueño prolongada.",pt:"Queda mensurável no tempo de reação e no julgamento após falta de sono prolongada."},
    distract:{fr:"Attention détournée de la veille par une tâche annexe (paperasse, téléphone, conversation).",en:"Attention diverted from lookout by a side task (paperwork, phone, conversation).",es:"Atención desviada de la vigilancia por una tarea secundaria (papeleo, teléfono, conversación).",pt:"Atenção desviada da vigilância por uma tarefa secundária (papelada, telefone, conversa)."},
    bias:{fr:"Confiance excessive dans radar/AIS sans vérification visuelle croisée.",en:"Excessive trust in radar/AIS without visual cross-check.",es:"Confianza excesiva en radar/AIS sin verificación visual cruzada.",pt:"Confiança excessiva no radar/AIS sem verificação visual cruzada."},
    comm:{fr:"Ambiguïté ou silence au moment critique, absence de boucle fermée.",en:"Ambiguity or silence at the critical moment, absence of closed-loop communication.",es:"Ambigüedad o silencio en el momento crítico, ausencia de bucle cerrado.",pt:"Ambiguidade ou silêncio no momento crítico, ausência de ciclo fechado."},
    pressure:{fr:"Pression des horaires ou du planning commercial qui pousse à prendre des raccourcis.",en:"Schedule or commercial pressure that pushes toward shortcuts.",es:"Presión de horarios o del calendario comercial que empuja a tomar atajos.",pt:"Pressão de horários ou do calendário comercial que empurra para atalhos."},
    culture:{fr:"Climat où signaler une erreur ou un doute est valorisé plutôt que puni.",en:"Climate where reporting an error or a doubt is valued rather than punished.",es:"Clima donde señalar un error o una duda se valora en lugar de castigarse.",pt:"Clima onde reportar um erro ou uma dúvida é valorizado em vez de punido."},
  };
  const sel_ = sel?factors.find(f=>f.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {factors.map(f=>(
          <div key={f.id} onClick={()=>setSel(sel===f.id?null:f.id)}
            style={{padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===f.id?`${f.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===f.id?f.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:3}}>{f.icon}</div>
            <div style={{fontSize:8,color:sel===f.id?f.color:C.muted,fontWeight:700,lineHeight:1.3}}>{f.label[lang]||f.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{descs[sel_.id][lang]||descs[sel_.id].fr}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — OPERATIONAL SCENARIO
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"c",q2:"a",q3:"b",q4:"a"};
  const qs = {
    fr:[
      {id:"q1",q:"Quart de nuit, 04h00. Tu as dormi 4h aujourd'hui, et environ 4h/nuit depuis 3 jours.\nUn contact ARPA apparaît, CPA affiché confortable. Que fais-tu EN PREMIER ?\na) Tu fais confiance à l'ARPA et continues ta tâche annexe\nb) Tu attends que le CPA se dégrade pour agir\nc) Tu vérifies visuellement le contact ET son relèvement à la jumelle"},
      {id:"q2",q:"Le second capitaine ne réagit pas à ton signalement du contact.\nQuelle est la décision la plus sûre ?\na) Tu répètes clairement ton observation et proposes une action précise (ex: réduction de vitesse)\nb) Tu te tais, il est plus expérimenté\nc) Tu attends 10 minutes de plus"},
      {id:"q3",q:"Quel équipement/action permet de vérifier si l'ARPA se trompe ?\na) Éteindre le radar\nb) Vérification visuelle croisée (jumelles, relèvement à la main)\nc) Attendre l'alarme automatique"},
      {id:"q4",q:"Quel facteur humain est le PLUS dangereux dans cette situation précise ?\na) La combinaison fatigue + confiance excessive dans l'ARPA (automation bias)\nb) Le mauvais temps\nc) Le manque de carburant"},
    ],
    en:[
      {id:"q1",q:"Night watch, 04:00. You slept 4h today, and roughly 4h/night for 3 days.\nAn ARPA contact appears, CPA shown looks comfortable. What do you do FIRST?\na) Trust the ARPA and continue your side task\nb) Wait until the CPA worsens to act\nc) Visually verify the contact AND its bearing with binoculars"},
      {id:"q2",q:"The Master does not react to your report of the contact.\nWhat is the safest decision?\na) Clearly repeat your observation and propose a specific action (e.g. speed reduction)\nb) Stay quiet, he is more experienced\nc) Wait 10 more minutes"},
      {id:"q3",q:"What equipment/action lets you check if the ARPA is wrong?\na) Turn off the radar\nb) Visual cross-check (binoculars, hand bearing)\nc) Wait for the automatic alarm"},
      {id:"q4",q:"Which human factor is MOST dangerous in this exact situation?\na) The combination of fatigue + automation bias\nb) Bad weather\nc) Lack of fuel"},
    ],
    es:[
      {id:"q1",q:"Guardia nocturna, 04:00. Has dormido 4h hoy, y unas 4h/noche desde hace 3 días.\nAparece un contacto ARPA, el CPA mostrado parece cómodo. ¿Qué haces PRIMERO?\na) Confías en el ARPA y sigues con tu tarea secundaria\nb) Esperas a que el CPA empeore para actuar\nc) Verificas visualmente el contacto Y su marcación con prismáticos"},
      {id:"q2",q:"El Capitán no reacciona a tu aviso sobre el contacto.\n¿Cuál es la decisión más segura?\na) Repites claramente tu observación y propones una acción concreta (ej: reducir velocidad)\nb) Te callas, él tiene más experiencia\nc) Esperas 10 minutos más"},
      {id:"q3",q:"¿Qué equipo/acción permite comprobar si el ARPA se equivoca?\na) Apagar el radar\nb) Verificación visual cruzada (prismáticos, marcación manual)\nc) Esperar la alarma automática"},
      {id:"q4",q:"¿Qué factor humano es el MÁS peligroso en esta situación exacta?\na) La combinación de fatiga + confianza excesiva en el ARPA\nb) El mal tiempo\nc) La falta de combustible"},
    ],
    pt:[
      {id:"q1",q:"Quarto de noite, 04h00. Dormiste 4h hoje, e cerca de 4h/noite há 3 dias.\nAparece um contacto ARPA, o CPA mostrado parece confortável. O que fazes PRIMEIRO?\na) Confias no ARPA e continuas a tua tarefa secundária\nb) Esperas que o CPA piore para agir\nc) Verificas visualmente o contacto E a sua marcação com binóculos"},
      {id:"q2",q:"O Comandante não reage ao teu aviso sobre o contacto.\nQual é a decisão mais segura?\na) Repetes claramente a tua observação e propões uma ação concreta (ex: reduzir velocidade)\nb) Ficas calado, ele tem mais experiência\nc) Esperas mais 10 minutos"},
      {id:"q3",q:"Que equipamento/ação permite verificar se o ARPA está errado?\na) Desligar o radar\nb) Verificação visual cruzada (binóculos, marcação manual)\nc) Esperar pelo alarme automático"},
      {id:"q4",q:"Que fator humano é o MAIS perigoso nesta situação exata?\na) A combinação de fadiga + confiança excessiva no ARPA\nb) O mau tempo\nc) A falta de combustível"},
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
        {lang==="fr"?"✅ Q1: c — toujours vérifier visuellement, l'écran seul ne suffit pas\n✅ Q2: a — l'assertivité structurée sauve des vies, le silence tue\n✅ Q3: b — la vérification croisée humaine reste la meilleure protection\n✅ Q4: a — c'est la combinaison des facteurs qui crée le risque maximal, pas un facteur isolé":
         lang==="en"?"✅ Q1: c — always verify visually, the screen alone is not enough\n✅ Q2: a — structured assertiveness saves lives, silence kills\n✅ Q3: b — human cross-check remains the best protection\n✅ Q4: a — it is the combination of factors that creates maximum risk, not one factor alone":
         "✅ Q1: c · Q2: a · Q3: b · Q4: a"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — ANDREA DORIA / STOCKHOLM
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Andrea Doria — Stockholm, Atlantique Nord (1956)",teaser:"Deux navires équipés de radar · Brouillard · 46 morts · Confiance excessive dans l'électronique",
      what:"Par nuit de brouillard dense, le paquebot italien Andrea Doria et le cargo suédois Stockholm se détectent mutuellement au radar bien avant le contact visuel. Les deux passerelles suivent leurs écrans respectifs — mais interprètent différemment la même situation de rencontre. Les deux navires manœuvrent, chacun persuadé d'agir correctement selon SA lecture du radar. Ils finissent par se percuter presque perpendiculairement. 46 morts, l'Andrea Doria coule 11 heures plus tard.",
      cause:"• Confiance excessive dans l'interprétation radar sans double vérification\n• Absence de communication VHF entre les deux passerelles avant la manœuvre\n• Chaque officier a agi seul sur SA propre lecture de l'écran\n• Aucune confirmation croisée des intentions de manœuvre\n• Vitesse maintenue élevée malgré le brouillard dense",
      lessons:"✓ Le radar montre une position, pas une intention — il faut communiquer\n✓ Deux lectures différentes du même écran peuvent mener à des manœuvres contradictoires\n✓ Par visibilité réduite, ralentir et vérifier prime sur la confiance dans l'écran\n✓ Un contact VHF direct avant manœuvre peut désamorcer une lecture radar erronée",
      link:"🔗 Cet accident reste la référence historique de l'automation bias — bien avant que ce terme n'existe. Deux équipages compétents, deux radars fonctionnels, et pourtant une collision."},
    en:{title:"Andrea Doria — Stockholm, North Atlantic (1956)",teaser:"Two radar-equipped vessels · Fog · 46 dead · Excessive trust in electronics",
      what:"On a night of dense fog, the Italian liner Andrea Doria and the Swedish cargo ship Stockholm detect each other on radar well before visual contact. Both bridges follow their own screens — but interpret the same encounter differently. Both vessels maneuver, each convinced they are acting correctly according to THEIR radar reading. They end up colliding almost at right angles. 46 dead, the Andrea Doria sinks 11 hours later.",
      cause:"• Excessive trust in radar interpretation without double-checking\n• No VHF communication between the two bridges before maneuvering\n• Each officer acted alone on THEIR own screen reading\n• No cross-confirmation of maneuvering intentions\n• High speed maintained despite dense fog",
      lessons:"✓ Radar shows a position, not an intention — communication is required\n✓ Two different readings of the same screen can lead to contradictory maneuvers\n✓ In restricted visibility, slowing down and verifying beats trusting the screen\n✓ Direct VHF contact before maneuvering can defuse a wrong radar reading",
      link:"🔗 This accident remains the historical reference case for automation bias — long before the term existed. Two competent crews, two working radars, yet a collision."},
    es:{title:"Andrea Doria — Stockholm, Atlántico Norte (1956)",teaser:"Dos buques con radar · Niebla · 46 muertos · Confianza excesiva en la electrónica",
      what:"En una noche de niebla densa, el transatlántico italiano Andrea Doria y el carguero sueco Stockholm se detectan mutuamente por radar mucho antes del contacto visual. Ambos puentes siguen sus propias pantallas, pero interpretan de forma diferente el mismo encuentro. Ambos buques maniobran, cada uno convencido de actuar correctamente según SU lectura del radar. Terminan colisionando casi perpendicularmente. 46 muertos, el Andrea Doria se hunde 11 horas después.",
      cause:"• Confianza excesiva en la interpretación del radar sin doble verificación\n• Sin comunicación VHF entre los dos puentes antes de maniobrar\n• Cada oficial actuó solo según SU propia lectura de la pantalla\n• Sin confirmación cruzada de las intenciones de maniobra\n• Velocidad alta mantenida pese a la niebla densa",
      lessons:"✓ El radar muestra una posición, no una intención — hay que comunicar\n✓ Dos lecturas distintas de la misma pantalla pueden llevar a maniobras contradictorias\n✓ Con visibilidad reducida, reducir velocidad y verificar prima sobre confiar en la pantalla\n✓ Un contacto VHF directo antes de maniobrar puede evitar una lectura de radar errónea",
      link:"🔗 Este accidente sigue siendo la referencia histórica del sesgo de automatización, mucho antes de que el término existiera. Dos tripulaciones competentes, dos radares funcionando, y aun así una colisión."},
    pt:{title:"Andrea Doria — Stockholm, Atlântico Norte (1956)",teaser:"Dois navios com radar · Nevoeiro · 46 mortos · Confiança excessiva na eletrónica",
      what:"Numa noite de nevoeiro denso, o transatlântico italiano Andrea Doria e o cargueiro sueco Stockholm detetam-se mutuamente por radar muito antes do contacto visual. Ambas as pontes seguem os seus próprios ecrãs, mas interpretam de forma diferente o mesmo encontro. Ambos os navios manobram, cada um convencido de agir corretamente segundo A SUA leitura do radar. Acabam por colidir quase perpendicularmente. 46 mortos, o Andrea Doria afunda 11 horas depois.",
      cause:"• Confiança excessiva na interpretação do radar sem dupla verificação\n• Sem comunicação VHF entre as duas pontes antes de manobrar\n• Cada oficial agiu sozinho segundo A SUA própria leitura do ecrã\n• Sem confirmação cruzada das intenções de manobra\n• Velocidade alta mantida apesar do nevoeiro denso",
      lessons:"✓ O radar mostra uma posição, não uma intenção — é preciso comunicar\n✓ Duas leituras diferentes do mesmo ecrã podem levar a manobras contraditórias\n✓ Com visibilidade reduzida, reduzir velocidade e verificar vale mais que confiar no ecrã\n✓ Um contacto VHF direto antes de manobrar pode evitar uma leitura de radar errada",
      link:"🔗 Este acidente continua a ser a referência histórica do viés de automação — muito antes de o termo existir. Duas tripulações competentes, dois radares funcionais, e ainda assim uma colisão."},
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
// BANK — 15 QUESTIONS (min. 5 scenario-based)
// ══════════════════════════════════════
const BANK = {
  fr:[
    {q:"Pourquoi un navire 'en règle' peut-il quand même être impliqué dans une collision ?",opts:["Les règles COLREG sont incomplètes","Les défenses de sécurité s'alignent rarement, mais le facteur humain reste la cause la plus fréquente","Le radar est toujours en panne","C'est toujours la faute du plus petit navire"],correct:1,expl:"Même un navire techniquement conforme peut être impliqué dans une collision si le facteur humain (fatigue, communication, biais) échoue. Les règles ne remplacent pas la vigilance humaine."},
    {q:"Le modèle des couches de défense (Swiss Cheese) montre que :",opts:["Un accident vient toujours d'une seule cause","Un accident résulte généralement de plusieurs petites failles alignées","Les accidents sont imprévisibles","Seule la couche organisationnelle compte"],correct:1,expl:"Le modèle de Reason montre qu'un accident traverse plusieurs couches de défense (organisation, supervision, conditions, acte) qui s'alignent rarement — mais qui, quand elles s'alignent, laissent passer l'accident."},
    {q:"Qu'est-ce que la dette de sommeil ?",opts:["Dormir exactement 8h chaque nuit","L'accumulation progressive de fatigue sur plusieurs jours de manque de sommeil","Un système de gestion des quarts","Une règle STCW sur les heures de repos"],correct:1,expl:"La dette de sommeil s'accumule sur plusieurs jours : dormir 4h une nuit et penser que 'ça va' le lendemain ignore l'effet cumulatif sur le jugement et le temps de réaction."},
    {q:"Vous êtes officier de quart, fatigué, et le radar affiche un CPA confortable. Que faites-vous ?",opts:["Vous faites confiance à l'écran et continuez votre tâche","Vous vérifiez visuellement le contact avant de conclure qu'il n'y a pas de danger","Vous éteignez l'alarme radar pour vous concentrer","Vous attendez que le contact se rapproche pour agir"],correct:1,expl:"L'automation bias pousse à faire confiance à l'écran sans vérification. La vérification visuelle croisée reste indispensable, surtout en état de fatigue."},
    {q:"Un jeune officier voit un danger mais hésite à en parler au capitaine par respect de la hiérarchie. Quelle est la bonne pratique ?",opts:["Rester silencieux, le capitaine est responsable","Communiquer de façon claire et assertive, avec une observation factuelle et une action proposée","Attendre que le capitaine s'en aperçoive seul","Envoyer un message écrit après le quart"],correct:1,expl:"L'assertivité structurée (observation factuelle + action proposée) permet de faire remonter un danger sans compromettre le respect de la hiérarchie. Le silence a causé de nombreux accidents maritimes."},
    {q:"Vous entendez un ordre donné à la radio VHF mais n'êtes pas sûr d'avoir bien compris. Que faites-vous ?",opts:["Vous supposez avoir compris et agissez","Vous répétez l'ordre reçu pour confirmation (communication en boucle fermée)","Vous ignorez l'ordre","Vous demandez à un collègue plus tard"],correct:1,expl:"La communication en boucle fermée (répéter ce qu'on a compris) élimine l'ambiguïté immédiatement, contrairement à une supposition silencieuse."},
    {q:"Quelle est la principale différence entre distraction et fatigue comme facteurs de risque ?",opts:["Il n'y en a aucune, ce sont les mêmes","La distraction détourne l'attention d'une tâche active ; la fatigue dégrade la capacité globale de réaction",  "La fatigue ne concerne que le quart de nuit","La distraction est toujours volontaire"],correct:1,expl:"La distraction est une perte d'attention ponctuelle (tâche annexe), tandis que la fatigue dégrade en continu la vigilance et le temps de réaction, même sans distraction active."},
    {q:"Pourquoi la pression opérationnelle (délais, planning commercial) est-elle un facteur de risque ?",opts:["Elle n'a aucun impact sur la sécurité","Elle pousse à prendre des raccourcis ou à ignorer des signaux d'alerte pour tenir les délais","Elle concerne uniquement les armateurs, pas l'équipage","Elle améliore la concentration"],correct:1,expl:"La pression des délais peut pousser un équipage à minimiser un doute ou un signal faible pour ne pas retarder l'opération — un facteur direct dans de nombreux accidents analysés."},
    {q:"Qu'est-ce qu'une 'culture de sécurité' positive à bord ?",opts:["Punir systématiquement toute erreur signalée","Un climat où signaler une erreur ou un doute est valorisé plutôt que sanctionné","Ne jamais parler des incidents","Réserver la sécurité aux officiers seniors"],correct:1,expl:"Une culture de sécurité positive encourage le signalement proactif des erreurs et des doutes, ce qui permet de corriger les problèmes avant qu'ils ne deviennent des accidents."},
    {q:"Vous constatez que votre collègue de quart montre des signes de fatigue extrême (micro-sommeil). Quelle est la priorité ?",opts:["Ne rien dire pour ne pas le vexer","Signaler la situation et proposer une relève ou un soutien immédiat","Attendre la fin du quart","Prendre une photo comme preuve"],correct:1,expl:"La sécurité collective prime sur la gêne individuelle. Signaler un collègue en état de micro-sommeil et organiser une relève est une action de prévention directe."},
    {q:"Quel est le rôle du radar/AIS dans la prévention des collisions selon cette leçon ?",opts:["Ils remplacent totalement la veille visuelle","Ce sont des outils d'aide à la décision, pas des preuves absolues qui dispensent de vérification","Ils sont inutiles en cas de bon temps","Ils ne servent qu'en haute mer"],correct:1,expl:"Le radar et l'AIS sont des aides précieuses mais ne remplacent jamais la vérification visuelle et le jugement humain — c'est l'essence de l'automation bias à éviter."},
    {q:"Vous devez décider en urgence face à un contact ARPA ambigu ET un chef qui ne répond pas. Quelle est la priorité d'action ?",opts:["Attendre une nouvelle instruction avant tout","Vérifier visuellement, communiquer clairement le danger perçu, et proposer une action concrète",  "Changer de fréquence radio","Réduire l'éclairage de la passerelle"],correct:1,expl:"Dans l'urgence, la priorité est : vérifier (visuel), communiquer (assertivité claire), agir (proposition concrète) — sans attendre passivement une validation qui tarde."},
    {q:"Pourquoi Andrea Doria et Stockholm sont-ils entrés en collision malgré deux radars fonctionnels ?",opts:["Les radars étaient mal calibrés","Chaque équipage a agi seul sur sa propre lecture, sans communication VHF entre les deux passerelles","Il n'y avait pas de radar à bord d'un des deux navires","Un des deux navires était en panne moteur"],correct:1,expl:"Les deux passerelles ont interprété différemment la même situation radar et ont manœuvré sans se coordonner par VHF, illustrant parfaitement l'automation bias combiné à un défaut de communication."},
    {q:"Quel est l'objectif principal de la leçon L1 dans le Safety Department ?",opts:["Réexpliquer les règles COLREG de navigation","Comprendre les facteurs humains qui mènent à une collision malgré des règles connues",  "Apprendre à réparer un radar","Étudier la responsabilité juridique en cas de collision"],correct:1,expl:"L1 se concentre exclusivement sur le facteur humain — pourquoi des marins compétents commettent des erreurs — sans réexpliquer la navigation (Deck) ni le droit maritime (Maritime Law)."},
    {q:"Quelle est l'action prioritaire pour réduire le risque lié à la fatigue en quart de nuit ?",opts:["Boire plus de café","Reconnaître les signes de fatigue tôt et organiser des relèves ou pauses avant la zone de risque maximal (creux circadien)","Ignorer la fatigue, elle passe avec l'habitude","Réduire l'éclairage de la passerelle"],correct:1,expl:"La reconnaissance précoce des signes de fatigue et l'organisation proactive de relèves avant le creux circadien (souvent 2h-5h) reste la mesure préventive la plus efficace."},
  ],
  en:[
    {q:"Why can a vessel 'in compliance with the rules' still be involved in a collision?",opts:["COLREG rules are incomplete","Safety defenses rarely align, but the human factor remains the most frequent cause","Radar is always broken","It's always the smaller vessel's fault"],correct:1,expl:"Even a technically compliant vessel can be involved in a collision if the human factor (fatigue, communication, bias) fails. Rules do not replace human vigilance."},
    {q:"What does the Swiss Cheese defense-layer model show?",opts:["An accident always has a single cause","An accident usually results from several small failures aligning","Accidents are unpredictable","Only the organizational layer matters"],correct:1,expl:"Reason's model shows that an accident passes through several defense layers (organization, supervision, conditions, act) that rarely align — but when they do, the accident gets through."},
    {q:"What is sleep debt?",opts:["Sleeping exactly 8h every night","The progressive accumulation of fatigue over several days of insufficient sleep","A watch management system","An STCW rule on rest hours"],correct:1,expl:"Sleep debt accumulates over several days: sleeping 4h one night and thinking 'it's fine' the next day ignores the cumulative effect on judgment and reaction time."},
    {q:"You are OOW, tired, and the radar shows a comfortable CPA. What do you do?",opts:["Trust the screen and continue your task","Visually verify the contact before concluding there is no danger","Turn off the radar alarm to focus","Wait for the contact to get closer before acting"],correct:1,expl:"Automation bias pushes toward trusting the screen without verification. Visual cross-checking remains essential, especially when fatigued."},
    {q:"A junior officer sees a danger but hesitates to tell the Captain out of respect for hierarchy. What is the correct practice?",opts:["Stay silent, the Captain is responsible","Communicate clearly and assertively, with a factual observation and a proposed action","Wait for the Captain to notice on his own","Send a written message after the watch"],correct:1,expl:"Structured assertiveness (factual observation + proposed action) allows a danger to be raised without undermining respect for hierarchy. Silence has caused many maritime accidents."},
    {q:"You hear an order on VHF but are not sure you understood it correctly. What do you do?",opts:["Assume you understood and act","Repeat the order back for confirmation (closed-loop communication)","Ignore the order","Ask a colleague later"],correct:1,expl:"Closed-loop communication (repeating what was understood) eliminates ambiguity immediately, unlike a silent assumption."},
    {q:"What is the main difference between distraction and fatigue as risk factors?",opts:["There is none, they are the same","Distraction diverts attention from an active task; fatigue degrades overall reaction capacity",  "Fatigue only applies to night watch","Distraction is always intentional"],correct:1,expl:"Distraction is a momentary loss of attention (side task), while fatigue continuously degrades vigilance and reaction time, even without active distraction."},
    {q:"Why is operational pressure (deadlines, commercial schedule) a risk factor?",opts:["It has no impact on safety","It pushes toward shortcuts or ignoring warning signals to meet deadlines","It only concerns owners, not the crew","It improves concentration"],correct:1,expl:"Schedule pressure can push a crew to minimize a doubt or a weak signal so as not to delay the operation — a direct factor in many analyzed accidents."},
    {q:"What is a positive 'safety culture' on board?",opts:["Systematically punishing every reported error","A climate where reporting an error or a doubt is valued rather than punished","Never discussing incidents","Reserving safety to senior officers"],correct:1,expl:"A positive safety culture encourages proactive reporting of errors and doubts, allowing problems to be corrected before they become accidents."},
    {q:"You notice your watch colleague shows signs of extreme fatigue (micro-sleep). What is the priority?",opts:["Say nothing to avoid offending them","Report the situation and propose an immediate relief or support","Wait until the end of the watch","Take a photo as evidence"],correct:1,expl:"Collective safety takes priority over individual discomfort. Reporting a colleague experiencing micro-sleep and organizing a relief is a direct preventive action."},
    {q:"According to this lesson, what is the role of radar/AIS in collision prevention?",opts:["They fully replace visual lookout","They are decision-support tools, not absolute proof that removes the need for verification","They are useless in good weather","They only matter offshore"],correct:1,expl:"Radar and AIS are valuable aids but never replace visual verification and human judgment — that is the essence of automation bias to avoid."},
    {q:"You must decide urgently facing an ambiguous ARPA contact AND an unresponsive senior officer. What is the priority of action?",opts:["Wait for new instructions before anything else","Verify visually, clearly communicate the perceived danger, and propose a concrete action",  "Change radio frequency","Reduce bridge lighting"],correct:1,expl:"In an emergency, the priority is: verify (visual), communicate (clear assertiveness), act (concrete proposal) — without passively waiting for a delayed validation."},
    {q:"Why did Andrea Doria and Stockholm collide despite two working radars?",opts:["The radars were miscalibrated","Each crew acted alone on their own reading, without VHF communication between the two bridges","One of the two vessels had no radar on board","One of the two vessels had engine failure"],correct:1,expl:"Both bridges interpreted the same radar situation differently and maneuvered without coordinating by VHF — a perfect illustration of automation bias combined with a communication failure."},
    {q:"What is the main goal of lesson L1 in the Safety Department?",opts:["Re-explain COLREG navigation rules","Understand the human factors that lead to a collision despite known rules",  "Learn how to repair a radar","Study legal liability in case of collision"],correct:1,expl:"L1 focuses exclusively on the human factor — why competent mariners make mistakes — without re-explaining navigation (Deck) or maritime law."},
    {q:"What is the priority action to reduce fatigue-related risk during night watch?",opts:["Drink more coffee","Recognize signs of fatigue early and organize reliefs or breaks before the highest-risk zone (circadian low)","Ignore fatigue, it passes with habit","Reduce bridge lighting"],correct:1,expl:"Early recognition of fatigue signs and proactive organization of reliefs before the circadian low (often 02:00-05:00) remains the most effective preventive measure."},
  ],
  es:[
    {q:"¿Por qué un buque 'en regla' puede aun así verse implicado en una colisión?",opts:["Las reglas COLREG son incompletas","Las defensas de seguridad rara vez se alinean, pero el factor humano sigue siendo la causa más frecuente","El radar siempre está averiado","Siempre es culpa del buque más pequeño"],correct:1,expl:"Incluso un buque técnicamente conforme puede verse implicado en una colisión si el factor humano (fatiga, comunicación, sesgo) falla. Las reglas no sustituyen la vigilancia humana."},
    {q:"¿Qué muestra el modelo de capas de defensa (queso suizo)?",opts:["Un accidente siempre tiene una única causa","Un accidente suele resultar de varios pequeños fallos alineados","Los accidentes son imprevisibles","Solo importa la capa organizativa"],correct:1,expl:"El modelo de Reason muestra que un accidente atraviesa varias capas de defensa que rara vez se alinean, pero cuando lo hacen, el accidente pasa."},
    {q:"¿Qué es la deuda de sueño?",opts:["Dormir exactamente 8h cada noche","La acumulación progresiva de fatiga durante varios días de falta de sueño","Un sistema de gestión de guardias","Una regla STCW sobre horas de descanso"],correct:1,expl:"La deuda de sueño se acumula durante varios días: dormir 4h una noche y pensar que 'está bien' al día siguiente ignora el efecto acumulativo sobre el juicio."},
    {q:"Eres OOW, estás cansado, y el radar muestra un CPA cómodo. ¿Qué haces?",opts:["Confías en la pantalla y continúas tu tarea","Verificas visualmente el contacto antes de concluir que no hay peligro","Apagas la alarma del radar para concentrarte","Esperas a que el contacto se acerque para actuar"],correct:1,expl:"El sesgo de automatización empuja a confiar en la pantalla sin verificación. La verificación visual cruzada sigue siendo esencial, sobre todo con fatiga."},
    {q:"Un oficial joven ve un peligro pero duda en decírselo al Capitán por respeto a la jerarquía. ¿Cuál es la práctica correcta?",opts:["Quedarse callado, el Capitán es responsable","Comunicar de forma clara y asertiva, con una observación factual y una acción propuesta","Esperar a que el Capitán se dé cuenta solo","Enviar un mensaje escrito después de la guardia"],correct:1,expl:"La asertividad estructurada permite plantear un peligro sin comprometer el respeto a la jerarquía. El silencio ha causado muchos accidentes marítimos."},
    {q:"Oyes una orden por VHF pero no estás seguro de haberla entendido bien. ¿Qué haces?",opts:["Supones que entendiste y actúas","Repites la orden recibida para confirmar (comunicación en bucle cerrado)","Ignoras la orden","Preguntas a un colega más tarde"],correct:1,expl:"La comunicación en bucle cerrado elimina la ambigüedad de inmediato, a diferencia de una suposición silenciosa."},
    {q:"¿Cuál es la principal diferencia entre distracción y fatiga como factores de riesgo?",opts:["No hay ninguna, son lo mismo","La distracción desvía la atención de una tarea activa; la fatiga degrada la capacidad general de reacción","La fatiga solo afecta a la guardia nocturna","La distracción siempre es voluntaria"],correct:1,expl:"La distracción es una pérdida puntual de atención, mientras que la fatiga degrada continuamente la vigilancia y el tiempo de reacción."},
    {q:"¿Por qué la presión operativa es un factor de riesgo?",opts:["No tiene ningún impacto en la seguridad","Empuja a tomar atajos o ignorar señales de alerta para cumplir plazos","Solo concierne a los armadores, no a la tripulación","Mejora la concentración"],correct:1,expl:"La presión de plazos puede llevar a una tripulación a minimizar una duda o una señal débil para no retrasar la operación."},
    {q:"¿Qué es una 'cultura de seguridad' positiva a bordo?",opts:["Castigar sistemáticamente cualquier error reportado","Un clima donde señalar un error o una duda se valora en lugar de sancionarse","No hablar nunca de los incidentes","Reservar la seguridad a los oficiales sénior"],correct:1,expl:"Una cultura de seguridad positiva fomenta el reporte proactivo de errores y dudas, permitiendo corregir problemas antes de que se conviertan en accidentes."},
    {q:"Notas que tu compañero de guardia muestra signos de fatiga extrema (microsueño). ¿Cuál es la prioridad?",opts:["No decir nada para no ofenderlo","Reportar la situación y proponer un relevo o apoyo inmediato","Esperar al final de la guardia","Tomar una foto como prueba"],correct:1,expl:"La seguridad colectiva prima sobre la incomodidad individual. Reportar a un compañero en microsueño y organizar un relevo es una acción preventiva directa."},
    {q:"Según esta lección, ¿cuál es el papel del radar/AIS en la prevención de colisiones?",opts:["Sustituyen totalmente la vigilancia visual","Son herramientas de ayuda a la decisión, no pruebas absolutas que eximan de verificación","Son inútiles con buen tiempo","Solo sirven en alta mar"],correct:1,expl:"El radar y el AIS son ayudas valiosas pero nunca sustituyen la verificación visual y el juicio humano."},
    {q:"Debes decidir con urgencia ante un contacto ARPA ambiguo Y un superior que no responde. ¿Cuál es la prioridad de acción?",opts:["Esperar nuevas instrucciones antes que nada","Verificar visualmente, comunicar claramente el peligro percibido, y proponer una acción concreta","Cambiar de frecuencia de radio","Reducir la iluminación del puente"],correct:1,expl:"En una emergencia, la prioridad es: verificar, comunicar, actuar — sin esperar pasivamente una validación que tarda."},
    {q:"¿Por qué colisionaron Andrea Doria y Stockholm pese a tener dos radares funcionando?",opts:["Los radares estaban mal calibrados","Cada tripulación actuó sola según su propia lectura, sin comunicación VHF entre los dos puentes","Uno de los dos buques no tenía radar a bordo","Uno de los dos buques tenía avería de motor"],correct:1,expl:"Ambos puentes interpretaron de forma diferente la misma situación de radar y maniobraron sin coordinarse por VHF."},
    {q:"¿Cuál es el objetivo principal de la lección L1 en el Safety Department?",opts:["Reexplicar las reglas de navegación COLREG","Comprender los factores humanos que llevan a una colisión pese a reglas conocidas","Aprender a reparar un radar","Estudiar la responsabilidad jurídica en caso de colisión"],correct:1,expl:"L1 se centra exclusivamente en el factor humano, sin reexplicar la navegación ni el derecho marítimo."},
    {q:"¿Cuál es la acción prioritaria para reducir el riesgo de fatiga en guardia nocturna?",opts:["Beber más café","Reconocer los signos de fatiga pronto y organizar relevos o pausas antes de la zona de riesgo máximo","Ignorar la fatiga, pasa con la costumbre","Reducir la iluminación del puente"],correct:1,expl:"El reconocimiento temprano de los signos de fatiga y la organización proactiva de relevos siguen siendo la medida preventiva más eficaz."},
  ],
  pt:[
    {q:"Por que um navio 'em conformidade' ainda pode estar envolvido numa colisão?",opts:["As regras COLREG são incompletas","As defesas de segurança raramente se alinham, mas o fator humano continua a ser a causa mais frequente","O radar está sempre avariado","É sempre culpa do navio mais pequeno"],correct:1,expl:"Mesmo um navio tecnicamente conforme pode estar envolvido numa colisão se o fator humano falhar. As regras não substituem a vigilância humana."},
    {q:"O que mostra o modelo de camadas de defesa (queijo suíço)?",opts:["Um acidente tem sempre uma única causa","Um acidente resulta geralmente de várias pequenas falhas alinhadas","Os acidentes são imprevisíveis","Só a camada organizacional importa"],correct:1,expl:"O modelo de Reason mostra que um acidente atravessa várias camadas de defesa que raramente se alinham — mas quando se alinham, o acidente passa."},
    {q:"O que é a dívida de sono?",opts:["Dormir exatamente 8h todas as noites","A acumulação progressiva de fadiga ao longo de vários dias de falta de sono","Um sistema de gestão de quartos","Uma regra STCW sobre horas de descanso"],correct:1,expl:"A dívida de sono acumula-se ao longo de vários dias: dormir 4h numa noite e pensar que 'está tudo bem' no dia seguinte ignora o efeito cumulativo."},
    {q:"És OOW, estás cansado, e o radar mostra um CPA confortável. O que fazes?",opts:["Confias no ecrã e continuas a tua tarefa","Verificas visualmente o contacto antes de concluir que não há perigo","Desligas o alarme do radar para te concentrares","Esperas que o contacto se aproxime para agir"],correct:1,expl:"O viés de automação empurra para confiar no ecrã sem verificação. A verificação visual cruzada continua a ser essencial, sobretudo com fadiga."},
    {q:"Um oficial júnior vê um perigo mas hesita em falar com o Comandante por respeito à hierarquia. Qual é a prática correta?",opts:["Ficar calado, o Comandante é responsável","Comunicar de forma clara e assertiva, com uma observação factual e uma ação proposta","Esperar que o Comandante repare sozinho","Enviar uma mensagem escrita depois do quarto"],correct:1,expl:"A assertividade estruturada permite levantar um perigo sem comprometer o respeito à hierarquia. O silêncio já causou muitos acidentes marítimos."},
    {q:"Ouves uma ordem no VHF mas não tens certeza se a entendeste corretamente. O que fazes?",opts:["Supões que entendeste e ages","Repetes a ordem recebida para confirmar (comunicação em ciclo fechado)","Ignoras a ordem","Perguntas a um colega mais tarde"],correct:1,expl:"A comunicação em ciclo fechado elimina a ambiguidade imediatamente, ao contrário de uma suposição silenciosa."},
    {q:"Qual é a principal diferença entre distração e fadiga como fatores de risco?",opts:["Não há nenhuma, são o mesmo","A distração desvia a atenção de uma tarefa ativa; a fadiga degrada a capacidade geral de reação","A fadiga só se aplica ao quarto de noite","A distração é sempre voluntária"],correct:1,expl:"A distração é uma perda pontual de atenção, enquanto a fadiga degrada continuamente a vigilância e o tempo de reação."},
    {q:"Por que a pressão operacional é um fator de risco?",opts:["Não tem impacto na segurança","Empurra para atalhos ou para ignorar sinais de alerta para cumprir prazos","Só diz respeito aos armadores, não à tripulação","Melhora a concentração"],correct:1,expl:"A pressão de prazos pode levar uma tripulação a minimizar uma dúvida ou um sinal fraco para não atrasar a operação."},
    {q:"O que é uma 'cultura de segurança' positiva a bordo?",opts:["Punir sistematicamente qualquer erro reportado","Um clima onde reportar um erro ou uma dúvida é valorizado em vez de punido","Nunca falar dos incidentes","Reservar a segurança aos oficiais seniores"],correct:1,expl:"Uma cultura de segurança positiva incentiva o reporte proativo de erros e dúvidas, permitindo corrigir problemas antes que se tornem acidentes."},
    {q:"Reparas que o teu colega de quarto mostra sinais de fadiga extrema (micro-sono). Qual é a prioridade?",opts:["Não dizer nada para não o ofender","Reportar a situação e propor um alívio ou apoio imediato","Esperar pelo fim do quarto","Tirar uma foto como prova"],correct:1,expl:"A segurança coletiva tem prioridade sobre o desconforto individual. Reportar um colega em micro-sono e organizar um alívio é uma ação preventiva direta."},
    {q:"Segundo esta lição, qual é o papel do radar/AIS na prevenção de colisões?",opts:["Substituem totalmente a vigilância visual","São ferramentas de apoio à decisão, não provas absolutas que dispensem verificação","São inúteis com bom tempo","Só servem em alto mar"],correct:1,expl:"O radar e o AIS são ajudas valiosas mas nunca substituem a verificação visual e o julgamento humano."},
    {q:"Tens de decidir com urgência perante um contacto ARPA ambíguo E um superior que não responde. Qual é a prioridade de ação?",opts:["Esperar novas instruções antes de tudo","Verificar visualmente, comunicar claramente o perigo percebido, e propor uma ação concreta","Mudar de frequência de rádio","Reduzir a iluminação da ponte"],correct:1,expl:"Numa emergência, a prioridade é: verificar, comunicar, agir — sem esperar passivamente por uma validação que demora."},
    {q:"Por que o Andrea Doria e o Stockholm colidiram apesar de terem dois radares a funcionar?",opts:["Os radares estavam mal calibrados","Cada tripulação agiu sozinha segundo a sua própria leitura, sem comunicação VHF entre as duas pontes","Um dos dois navios não tinha radar a bordo","Um dos dois navios tinha avaria de motor"],correct:1,expl:"Ambas as pontes interpretaram de forma diferente a mesma situação de radar e manobraram sem se coordenar por VHF."},
    {q:"Qual é o objetivo principal da lição L1 no Safety Department?",opts:["Reexplicar as regras de navegação COLREG","Compreender os fatores humanos que levam a uma colisão apesar de regras conhecidas","Aprender a reparar um radar","Estudar a responsabilidade jurídica em caso de colisão"],correct:1,expl:"L1 foca-se exclusivamente no fator humano, sem reexplicar a navegação nem o direito marítimo."},
    {q:"Qual é a ação prioritária para reduzir o risco relacionado com a fadiga no quarto de noite?",opts:["Beber mais café","Reconhecer os sinais de fadiga cedo e organizar alívios ou pausas antes da zona de risco máximo","Ignorar a fadiga, passa com o hábito","Reduzir a iluminação da ponte"],correct:1,expl:"O reconhecimento precoce dos sinais de fadiga e a organização proativa de alívios continuam a ser a medida preventiva mais eficaz."},
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
    {q:"Vous êtes fatigué, seul face à un contact ARPA ambigu. Quelle est la première action ?",opts:["Continuer votre tâche, l'ARPA gère","Vérifier visuellement le contact et son relèvement","Attendre l'alarme automatique","Réduire l'éclairage pour mieux voir l'écran"],correct:1,expl:"La vérification visuelle croisée reste la première ligne de défense contre l'automation bias, surtout en état de fatigue."},
    {q:"Un jeune officier hésite à contredire le capitaine malgré un danger perçu. Quelle est l'attitude correcte ?",opts:["Se taire par respect","Communiquer clairement et proposer une action concrète","Attendre la fin du quart pour en parler","Écrire un rapport après coup"],correct:1,expl:"L'assertivité structurée permet de signaler un danger sans rompre le respect hiérarchique — le silence a coûté des vies dans l'histoire maritime."},
    {q:"Pourquoi Andrea Doria et Stockholm sont-ils entrés en collision malgré deux radars fonctionnels ?",opts:["Manque de communication VHF entre les deux passerelles avant la manœuvre","Panne des deux radars","Absence de tout équipage sur l'un des deux navires","Erreur de carte marine"],correct:0,expl:"Chaque équipage a agi seul selon sa propre lecture radar, sans coordination — le cas de référence historique de l'automation bias combiné à une communication défaillante."},
    {q:"Que représente la dette de sommeil ?",opts:["Un jour de repos obligatoire toutes les semaines","L'accumulation de fatigue sur plusieurs jours de sommeil insuffisant","Le nombre d'heures travaillées","Une clause du contrat d'engagement"],correct:1,expl:"La dette de sommeil s'accumule progressivement — 'ça va, j'ai dormi 4h' ignore l'effet cumulé des jours précédents sur le jugement."},
    {q:"Quel facteur est généralement le plus déterminant dans un accident maritime selon cette leçon ?",opts:["Une seule défaillance technique isolée","La combinaison de plusieurs facteurs humains (fatigue, biais, communication) alignés","Le mauvais temps uniquement","Un radar hors service"],correct:1,expl:"Le modèle des couches de défense montre que c'est presque toujours l'alignement de plusieurs facteurs humains, pas une cause unique, qui mène à l'accident."},
  ],
  en:[
    {q:"You are tired, alone facing an ambiguous ARPA contact. What is the first action?",opts:["Continue your task, ARPA handles it","Visually verify the contact and its bearing","Wait for the automatic alarm","Reduce lighting to see the screen better"],correct:1,expl:"Visual cross-checking remains the first line of defense against automation bias, especially when fatigued."},
    {q:"A junior officer hesitates to contradict the Captain despite a perceived danger. What is the correct attitude?",opts:["Stay silent out of respect","Communicate clearly and propose a concrete action","Wait until the end of the watch to discuss it","Write a report afterward"],correct:1,expl:"Structured assertiveness allows a danger to be reported without breaking hierarchical respect — silence has cost lives in maritime history."},
    {q:"Why did Andrea Doria and Stockholm collide despite two working radars?",opts:["Lack of VHF communication between the two bridges before maneuvering","Both radars failed","No crew present on one of the two vessels","Navigational chart error"],correct:0,expl:"Each crew acted alone based on their own radar reading, without coordination — the historical reference case for automation bias combined with a communication failure."},
    {q:"What does sleep debt represent?",opts:["A mandatory day off every week","The accumulation of fatigue over several days of insufficient sleep","The number of hours worked","A clause in the employment contract"],correct:1,expl:"Sleep debt accumulates progressively — 'it's fine, I slept 4h' ignores the cumulative effect of previous days on judgment."},
    {q:"According to this lesson, what factor is generally most decisive in a maritime accident?",opts:["A single isolated technical failure","The combination of several aligned human factors (fatigue, bias, communication)","Bad weather alone","An out-of-service radar"],correct:1,expl:"The defense-layer model shows it is almost always the alignment of several human factors, not a single cause, that leads to the accident."},
  ],
  es:[
    {q:"Estás cansado, solo ante un contacto ARPA ambiguo. ¿Cuál es la primera acción?",opts:["Continuar tu tarea, el ARPA lo gestiona","Verificar visualmente el contacto y su marcación","Esperar la alarma automática","Reducir la iluminación para ver mejor la pantalla"],correct:1,expl:"La verificación visual cruzada sigue siendo la primera línea de defensa contra el sesgo de automatización, sobre todo con fatiga."},
    {q:"Un oficial joven duda en contradecir al Capitán pese a un peligro percibido. ¿Cuál es la actitud correcta?",opts:["Callarse por respeto","Comunicar claramente y proponer una acción concreta","Esperar al final de la guardia para hablarlo","Escribir un informe después"],correct:1,expl:"La asertividad estructurada permite señalar un peligro sin romper el respeto jerárquico — el silencio ha costado vidas en la historia marítima."},
    {q:"¿Por qué colisionaron Andrea Doria y Stockholm pese a tener dos radares funcionando?",opts:["Falta de comunicación VHF entre los dos puentes antes de maniobrar","Ambos radares fallaron","No había tripulación en uno de los dos buques","Error de carta náutica"],correct:0,expl:"Cada tripulación actuó sola según su propia lectura del radar, sin coordinación — el caso de referencia histórico del sesgo de automatización."},
    {q:"¿Qué representa la deuda de sueño?",opts:["Un día libre obligatorio cada semana","La acumulación de fatiga durante varios días de sueño insuficiente","El número de horas trabajadas","Una cláusula del contrato de embarque"],correct:1,expl:"La deuda de sueño se acumula progresivamente — 'está bien, dormí 4h' ignora el efecto acumulado de los días anteriores."},
    {q:"Según esta lección, ¿qué factor suele ser el más determinante en un accidente marítimo?",opts:["Un único fallo técnico aislado","La combinación de varios factores humanos alineados (fatiga, sesgo, comunicación)","El mal tiempo únicamente","Un radar fuera de servicio"],correct:1,expl:"El modelo de capas de defensa muestra que casi siempre es la alineación de varios factores humanos, no una causa única, la que lleva al accidente."},
  ],
  pt:[
    {q:"Estás cansado, sozinho perante um contacto ARPA ambíguo. Qual é a primeira ação?",opts:["Continuar a tua tarefa, o ARPA trata disso","Verificar visualmente o contacto e a sua marcação","Esperar pelo alarme automático","Reduzir a iluminação para ver melhor o ecrã"],correct:1,expl:"A verificação visual cruzada continua a ser a primeira linha de defesa contra o viés de automação, sobretudo com fadiga."},
    {q:"Um oficial júnior hesita em contradizer o Comandante apesar de um perigo percebido. Qual é a atitude correta?",opts:["Ficar calado por respeito","Comunicar claramente e propor uma ação concreta","Esperar pelo fim do quarto para falar sobre isso","Escrever um relatório depois"],correct:1,expl:"A assertividade estruturada permite reportar um perigo sem quebrar o respeito hierárquico — o silêncio já custou vidas na história marítima."},
    {q:"Por que o Andrea Doria e o Stockholm colidiram apesar de terem dois radares a funcionar?",opts:["Falta de comunicação VHF entre as duas pontes antes de manobrar","Ambos os radares falharam","Não havia tripulação num dos dois navios","Erro de carta náutica"],correct:0,expl:"Cada tripulação agiu sozinha segundo a sua própria leitura do radar, sem coordenação — o caso de referência histórico do viés de automação."},
    {q:"O que representa a dívida de sono?",opts:["Um dia de folga obrigatório por semana","A acumulação de fadiga ao longo de vários dias de sono insuficiente","O número de horas trabalhadas","Uma cláusula do contrato de embarque"],correct:1,expl:"A dívida de sono acumula-se progressivamente — 'está tudo bem, dormi 4h' ignora o efeito cumulativo dos dias anteriores."},
    {q:"Segundo esta lição, que fator costuma ser o mais determinante num acidente marítimo?",opts:["Uma única falha técnica isolada","A combinação de vários fatores humanos alinhados (fadiga, viés, comunicação)","O mau tempo apenas","Um radar fora de serviço"],correct:1,expl:"O modelo de camadas de defesa mostra que é quase sempre o alinhamento de vários fatores humanos, não uma causa única, que leva ao acidente."},
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
// SAFETY REFLECTION (permanent Safety Dept feature)
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Repense à ton dernier quart en mer. Quel facteur humain (fatigue, distraction, confiance excessive dans l'électronique, communication) représentait le plus grand risque, et pourquoi ?",
    en:"Think about your last watch at sea. Which human factor (fatigue, distraction, over-reliance on electronics, communication) represented the greatest risk, and why?",
    es:"Piensa en tu última guardia en el mar. ¿Qué factor humano (fatiga, distracción, confianza excesiva en la electrónica, comunicación) representó el mayor riesgo, y por qué?",
    pt:"Pensa no teu último quarto no mar. Que fator humano (fadiga, distração, confiança excessiva na eletrónica, comunicação) representou o maior risco, e porquê?",
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
function Stars(){const s=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Leçon 1/6 · Free",
      title:"Facteurs Humains : Pourquoi les Collisions Arrivent Vraiment",
      intro:"Les navires modernes sont équipés de radars fiables, d'AIS, d'ECDIS. Les règles COLREG sont connues de tous les officiers depuis leur formation.\n\nEt pourtant, des navires 'en règle', avec des équipages compétents, continuent d'entrer en collision. Pourquoi ?\n\nCette leçon ne réexplique pas les règles de navigation — elle explique ce qu'aucune règle ne peut couvrir seule : le facteur humain.",
      p0:"POURQUOI LA SÉCURITÉ CONCERNE LES PERSONNES, PAS LES NAVIRES",s0t:"Des navires performants, des équipages qui échouent",
      s0:"Un navire moderne est rarement en cause techniquement. La très grande majorité des collisions étudiées par les enquêtes maritimes pointent vers une chaîne de décisions humaines — pas une panne d'équipement.\n\nCOMMENT PRÉVENIR L'ACCIDENT ? En comprenant que la technologie n'élimine pas le risque humain, elle le déplace.\nQUE FAIRE QUAND LE RISQUE APPARAÎT ? Reconnaître que la cause est probablement humaine avant de blâmer l'équipement.\nQUELLE LEÇON RETENIR ? La vigilance humaine reste la dernière ligne de défense, quelle que soit la technologie à bord.",
      p1:"LE MODÈLE DES COUCHES DE DÉFENSE",s1t:"Un accident traverse rarement une seule barrière",
      s1:"Un accident n'est presque jamais causé par une seule erreur. Il est généralement le résultat de plusieurs petites failles qui se produisent en même temps, à différents niveaux : organisation, supervision, conditions du moment, acte individuel.\n\nQuand ces failles s'alignent — comme des trous dans des tranches de gruyère empilées — le danger traverse toutes les défenses et l'accident se produit.",
      p2:"FATIGUE ET DETTE DE SOMMEIL",s2t:"Le facteur le plus sous-estimé à bord",
      s2:"La fatigue dégrade le temps de réaction et le jugement de façon mesurable — parfois comparable à un taux d'alcoolémie élevé après une nuit blanche.\n\nLa dette de sommeil s'accumule sur plusieurs jours. Penser 'j'ai dormi 4h aujourd'hui donc ça va' ignore que le corps porte encore la fatigue des jours précédents.",
      p3:"AUTOMATION BIAS — LA CONFIANCE AVEUGLE DANS L'ÉLECTRONIQUE",s3t:"Le problème n'est pas le radar, c'est la confiance sans vérification",
      s3:"Radar, ARPA, AIS sont des outils précieux — mais ce sont des aides à la décision, pas des preuves absolues.\n\nL'automation bias, c'est faire confiance à l'écran plus qu'à ses propres yeux et à une vérification croisée. De nombreuses enquêtes maritimes pointent ce biais comme facteur central de collisions récentes.",
      p4:"COMMUNICATION ET ASSERTIVITÉ",s4t:"Voir le danger ne suffit pas — il faut le dire clairement",
      s4:"Beaucoup d'accidents surviennent lorsqu'un officier junior voit un danger... mais n'ose pas le signaler clairement par respect de la hiérarchie.\n\nLa communication en boucle fermée (répéter ce qu'on a compris) et l'assertivité structurée (observation + action proposée) permettent de faire remonter un danger sans rompre le respect hiérarchique.",
      p5:"PRESSION OPÉRATIONNELLE ET CULTURE DE SÉCURITÉ",s5t:"Le contexte qui pousse à ignorer les signaux faibles",
      s5:"La pression des délais et du planning commercial pousse parfois à minimiser un doute pour ne pas retarder l'opération.\n\nUne culture de sécurité positive valorise le signalement d'une erreur ou d'un doute plutôt que de le sanctionner — c'est ce climat qui permet de corriger un problème avant qu'il ne devienne un accident.",
      p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"⚠️ CAS RÉEL",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 1",
      sumP:["Un accident résulte de plusieurs petites failles alignées, rarement d'une seule cause","La fatigue et la dette de sommeil dégradent le jugement de façon mesurable","L'automation bias = confiance aveugle dans l'écran sans vérification visuelle","La communication en boucle fermée et l'assertivité sauvent des vies","La culture de sécurité valorise le signalement plutôt que la sanction"],
      learnedP:["Le modèle des couches de défense (Swiss Cheese)","Fatigue et dette de sommeil","Automation bias : radar vs réalité","Communication et assertivité en situation critique","Culture de sécurité et pression opérationnelle"],
      safetyMsg:"Collisions are rarely caused by the absence of rules. They are caused when people stop applying them. Stay alert. Stay prepared. Protect lives.",
    },
    en:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Lesson 1/6 · Free",
      title:"Human Factors: Why Collisions Really Happen",
      intro:"Modern vessels are equipped with reliable radar, AIS, ECDIS. COLREG rules have been known to every officer since training.\n\nAnd yet, vessels 'in compliance', with competent crews, still collide. Why?\n\nThis lesson does not re-explain navigation rules — it explains what no rule alone can cover: the human factor.",
      p0:"WHY SAFETY IS ABOUT PEOPLE, NOT SHIPS",s0t:"High-performing vessels, crews that fail",
      s0:"A modern vessel is rarely at fault technically. The vast majority of collisions studied by marine accident investigations point to a chain of human decisions — not equipment failure.\n\nHOW TO PREVENT THE ACCIDENT? By understanding that technology does not eliminate human risk, it relocates it.\nWHAT TO DO WHEN THE RISK APPEARS? Recognize that the cause is probably human before blaming the equipment.\nWHAT LESSON TO RETAIN? Human vigilance remains the last line of defense, regardless of the technology on board.",
      p1:"THE SWISS CHEESE DEFENSE MODEL",s1t:"An accident rarely passes through a single barrier",
      s1:"An accident is rarely caused by a single mistake. It is usually the result of several small failures occurring at the same time, at different levels: organization, supervision, conditions, individual act.\n\nWhen these failures align — like holes in stacked slices of cheese — the danger passes through all the defenses and the accident occurs.",
      p2:"FATIGUE AND SLEEP DEBT",s2t:"The most underestimated factor on board",
      s2:"Fatigue measurably degrades reaction time and judgment — sometimes comparable to a high blood alcohol level after a sleepless night.\n\nSleep debt accumulates over several days. Thinking 'I slept 4h today so I'm fine' ignores that the body still carries the fatigue from previous days.",
      p3:"AUTOMATION BIAS — BLIND TRUST IN ELECTRONICS",s3t:"The problem is not the radar, it is trust without verification",
      s3:"Radar, ARPA, AIS are valuable tools — but they are decision-support aids, not absolute proof.\n\nAutomation bias is trusting the screen more than your own eyes and cross-checking. Many marine accident investigations point to this bias as a central factor in recent collisions.",
      p4:"COMMUNICATION AND ASSERTIVENESS",s4t:"Seeing the danger is not enough — it must be clearly stated",
      s4:"Many accidents happen when a junior officer sees a danger... but hesitates to clearly report it out of respect for hierarchy.\n\nClosed-loop communication (repeating back what was understood) and structured assertiveness (observation + proposed action) allow a danger to be raised without breaking hierarchical respect.",
      p5:"OPERATIONAL PRESSURE AND SAFETY CULTURE",s5t:"The context that pushes toward ignoring weak signals",
      s5:"Schedule and commercial pressure sometimes pushes toward minimizing a doubt so as not to delay the operation.\n\nA positive safety culture values reporting an error or a doubt rather than punishing it — this climate allows a problem to be corrected before it becomes an accident.",
      p6:"🎯 OPERATIONAL EXERCISE",p7:"⚠️ REAL ACCIDENT CASE",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 1",
      sumP:["An accident results from several small failures aligning, rarely a single cause","Fatigue and sleep debt measurably degrade judgment","Automation bias = blind trust in the screen without visual verification","Closed-loop communication and assertiveness save lives","Safety culture values reporting over punishment"],
      learnedP:["The Swiss Cheese defense-layer model","Fatigue and sleep debt","Automation bias: radar vs reality","Communication and assertiveness in critical situations","Safety culture and operational pressure"],
      safetyMsg:"Collisions are rarely caused by the absence of rules. They are caused when people stop applying them. Stay alert. Stay prepared. Protect lives.",
    },
    es:{
      badge:"🛟 Seguridad · COLREG Safety — Prevención y Respuesta ante Abordajes · Lección 1/6 · Free",
      title:"Factores Humanos: Por Qué Ocurren Realmente las Colisiones",
      intro:"Los buques modernos cuentan con radar fiable, AIS, ECDIS. Las reglas COLREG las conocen todos los oficiales desde su formación.\n\nY sin embargo, buques 'en regla', con tripulaciones competentes, siguen colisionando. ¿Por qué?\n\nEsta lección no reexplica las reglas de navegación — explica lo que ninguna regla por sí sola puede cubrir: el factor humano.",
      p0:"POR QUÉ LA SEGURIDAD TRATA DE LAS PERSONAS, NO DE LOS BUQUES",s0t:"Buques de alto rendimiento, tripulaciones que fallan",
      s0:"Un buque moderno rara vez falla técnicamente. La gran mayoría de las colisiones estudiadas por las investigaciones marítimas apuntan a una cadena de decisiones humanas, no a un fallo del equipo.\n\n¿CÓMO PREVENIR EL ACCIDENTE? Entendiendo que la tecnología no elimina el riesgo humano, lo desplaza.\n¿QUÉ HACER CUANDO APARECE EL RIESGO? Reconocer que la causa es probablemente humana antes de culpar al equipo.\n¿QUÉ LECCIÓN RETENER? La vigilancia humana sigue siendo la última línea de defensa, sea cual sea la tecnología a bordo.",
      p1:"EL MODELO DE CAPAS DE DEFENSA (QUESO SUIZO)",s1t:"Un accidente rara vez atraviesa una sola barrera",
      s1:"Un accidente rara vez es causado por un único error. Suele ser el resultado de varios pequeños fallos que ocurren al mismo tiempo, en distintos niveles: organización, supervisión, condiciones del momento, acto individual.\n\nCuando estos fallos se alinean — como agujeros en lonchas de queso apiladas — el peligro atraviesa todas las defensas y ocurre el accidente.",
      p2:"FATIGA Y DEUDA DE SUEÑO",s2t:"El factor más subestimado a bordo",
      s2:"La fatiga degrada de forma medible el tiempo de reacción y el juicio — a veces comparable a un nivel alto de alcohol en sangre tras una noche sin dormir.\n\nLa deuda de sueño se acumula durante varios días. Pensar 'dormí 4h hoy así que estoy bien' ignora que el cuerpo aún carga la fatiga de los días anteriores.",
      p3:"SESGO DE AUTOMATIZACIÓN — CONFIANZA CIEGA EN LA ELECTRÓNICA",s3t:"El problema no es el radar, es la confianza sin verificación",
      s3:"Radar, ARPA, AIS son herramientas valiosas, pero son ayudas a la decisión, no pruebas absolutas.\n\nEl sesgo de automatización es confiar más en la pantalla que en los propios ojos y en la verificación cruzada. Muchas investigaciones marítimas señalan este sesgo como factor central en colisiones recientes.",
      p4:"COMUNICACIÓN Y ASERTIVIDAD",s4t:"Ver el peligro no basta — hay que decirlo claramente",
      s4:"Muchos accidentes ocurren cuando un oficial junior ve un peligro... pero duda en señalarlo claramente por respeto a la jerarquía.\n\nLa comunicación en bucle cerrado y la asertividad estructurada (observación + acción propuesta) permiten plantear un peligro sin romper el respeto jerárquico.",
      p5:"PRESIÓN OPERATIVA Y CULTURA DE SEGURIDAD",s5t:"El contexto que empuja a ignorar señales débiles",
      s5:"La presión de plazos y del calendario comercial a veces empuja a minimizar una duda para no retrasar la operación.\n\nUna cultura de seguridad positiva valora señalar un error o una duda en lugar de castigarlo — este clima permite corregir un problema antes de que se convierta en accidente.",
      p6:"🎯 EJERCICIO OPERATIVO",p7:"⚠️ CASO REAL",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 1",
      sumP:["Un accidente resulta de varios pequeños fallos alineados, rara vez una única causa","La fatiga y la deuda de sueño degradan el juicio de forma medible","Sesgo de automatización = confianza ciega en la pantalla sin verificación visual","La comunicación en bucle cerrado y la asertividad salvan vidas","La cultura de seguridad valora señalar en lugar de castigar"],
      learnedP:["El modelo de capas de defensa (queso suizo)","Fatiga y deuda de sueño","Sesgo de automatización: radar vs realidad","Comunicación y asertividad en situaciones críticas","Cultura de seguridad y presión operativa"],
      safetyMsg:"Collisions are rarely caused by the absence of rules. They are caused when people stop applying them. Stay alert. Stay prepared. Protect lives.",
    },
    pt:{
      badge:"🛟 Segurança · COLREG Safety — Prevenção e Resposta a Abalroamentos · Lição 1/6 · Free",
      title:"Fatores Humanos: Por Que as Colisões Realmente Acontecem",
      intro:"Os navios modernos têm radar fiável, AIS, ECDIS. As regras COLREG são conhecidas por todos os oficiais desde a formação.\n\nE, no entanto, navios 'em conformidade', com tripulações competentes, continuam a colidir. Porquê?\n\nEsta lição não reexplica as regras de navegação — explica o que nenhuma regra sozinha consegue cobrir: o fator humano.",
      p0:"POR QUE A SEGURANÇA É SOBRE PESSOAS, NÃO NAVIOS",s0t:"Navios de alto desempenho, tripulações que falham",
      s0:"Um navio moderno raramente falha tecnicamente. A grande maioria das colisões estudadas pelas investigações marítimas aponta para uma cadeia de decisões humanas — não uma falha de equipamento.\n\nCOMO PREVENIR O ACIDENTE? Entendendo que a tecnologia não elimina o risco humano, apenas o desloca.\nO QUE FAZER QUANDO O RISCO APARECE? Reconhecer que a causa é provavelmente humana antes de culpar o equipamento.\nQUE LIÇÃO RETER? A vigilância humana continua a ser a última linha de defesa, seja qual for a tecnologia a bordo.",
      p1:"O MODELO DE CAMADAS DE DEFESA (QUEIJO SUÍÇO)",s1t:"Um acidente raramente atravessa uma única barreira",
      s1:"Um acidente raramente é causado por um único erro. É geralmente o resultado de várias pequenas falhas que ocorrem ao mesmo tempo, em diferentes níveis: organização, supervisão, condições do momento, ato individual.\n\nQuando estas falhas se alinham — como buracos em fatias de queijo empilhadas — o perigo atravessa todas as defesas e o acidente acontece.",
      p2:"FADIGA E DÍVIDA DE SONO",s2t:"O fator mais subestimado a bordo",
      s2:"A fadiga degrada de forma mensurável o tempo de reação e o julgamento — por vezes comparável a uma taxa elevada de álcool no sangue após uma noite sem dormir.\n\nA dívida de sono acumula-se ao longo de vários dias. Pensar 'dormi 4h hoje, logo está tudo bem' ignora que o corpo ainda carrega a fadiga dos dias anteriores.",
      p3:"VIÉS DE AUTOMAÇÃO — CONFIANÇA CEGA NA ELETRÓNICA",s3t:"O problema não é o radar, é a confiança sem verificação",
      s3:"Radar, ARPA, AIS são ferramentas valiosas — mas são apoios à decisão, não provas absolutas.\n\nO viés de automação é confiar mais no ecrã do que nos próprios olhos e na verificação cruzada. Muitas investigações marítimas apontam este viés como fator central em colisões recentes.",
      p4:"COMUNICAÇÃO E ASSERTIVIDADE",s4t:"Ver o perigo não basta — é preciso dizê-lo claramente",
      s4:"Muitos acidentes acontecem quando um oficial júnior vê um perigo... mas hesita em reportá-lo claramente por respeito à hierarquia.\n\nA comunicação em ciclo fechado e a assertividade estruturada (observação + ação proposta) permitem levantar um perigo sem quebrar o respeito hierárquico.",
      p5:"PRESSÃO OPERACIONAL E CULTURA DE SEGURANÇA",s5t:"O contexto que empurra para ignorar sinais fracos",
      s5:"A pressão de prazos e do calendário comercial por vezes empurra para minimizar uma dúvida para não atrasar a operação.\n\nUma cultura de segurança positiva valoriza reportar um erro ou uma dúvida em vez de o punir — este clima permite corrigir um problema antes que se torne um acidente.",
      p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"⚠️ CASO REAL",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 1",
      sumP:["Um acidente resulta de várias pequenas falhas alinhadas, raramente uma única causa","A fadiga e a dívida de sono degradam o julgamento de forma mensurável","Viés de automação = confiança cega no ecrã sem verificação visual","A comunicação em ciclo fechado e a assertividade salvam vidas","A cultura de segurança valoriza reportar em vez de punir"],
      learnedP:["O modelo de camadas de defesa (queijo suíço)","Fadiga e dívida de sono","Viés de automação: radar vs realidade","Comunicação e assertividade em situações críticas","Cultura de segurança e pressão operacional"],
      safetyMsg:"Collisions are rarely caused by the absence of rules. They are caused when people stop applying them. Stay alert. Stay prepared. Protect lives.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/6":lang==="en"?"Lesson 1/6":lang==="es"?"Lección 1/6":"Lição 1/6"}</div>
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

            <SL icon="🧭" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🧀" text={lc.p1} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧀</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧀 {lang==="fr"?"SWISS CHEESE MODEL — INTERACTIF":lang==="en"?"SWISS CHEESE MODEL — INTERACTIVE":lang==="es"?"MODELO QUESO SUIZO — INTERACTIVO":"MODELO QUEIJO SUÍÇO — INTERATIVO"}</div><SwissCheeseSVG lang={lang}/></Card>

            <SL icon="😴" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>😴</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>😴 {lang==="fr"?"FATIGUE & DETTE DE SOMMEIL — INTERACTIF":lang==="en"?"FATIGUE & SLEEP DEBT — INTERACTIVE":lang==="es"?"FATIGA Y DEUDA DE SUEÑO — INTERACTIVO":"FADIGA E DÍVIDA DE SONO — INTERATIVO"}</div><FatigueSVG lang={lang}/></Card>

            <SL icon="📟" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📟</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📟 {lang==="fr"?"RADAR VS RÉALITÉ — INTERACTIF":lang==="en"?"RADAR VS REALITY — INTERACTIVE":lang==="es"?"RADAR VS REALIDAD — INTERACTIVO":"RADAR VS REALIDADE — INTERATIVO"}</div><AutomationBiasSVG lang={lang}/></Card>

            <SL icon="🗣️" text={lc.p4} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🗣️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🗣️ {lang==="fr"?"COMMUNICATION — INTERACTIF":lang==="en"?"COMMUNICATION — INTERACTIVE":lang==="es"?"COMUNICACIÓN — INTERACTIVO":"COMUNICAÇÃO — INTERATIVO"}</div><CommAssertivenessSVG lang={lang}/></Card>

            <SL icon="⏱️" text={lc.p5} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏱️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎡 {lang==="fr"?"ROUE DES FACTEURS HUMAINS — INTERACTIF":lang==="en"?"HUMAN FACTORS WHEEL — INTERACTIVE":lang==="es"?"RUEDA DE FACTORES HUMANOS — INTERACTIVO":"RODA DOS FATORES HUMANOS — INTERATIVO"}</div><HumanFactorsWheel lang={lang}/></Card>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p7} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p9} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final — Facteurs Humains":lang==="en"?"Final Quiz — Human Factors":lang==="es"?"Quiz Final — Factores Humanos":"Quiz Final — Fatores Humanos"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 1/6":"questions · Lesson 1/6"}</div>
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
                <span style={{fontSize:20}}>🛟</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 2 — COORDINATION PASSERELLE →":lang==="en"?"LESSON 2 — BRIDGE TEAM COORDINATION →":lang==="es"?"LECCIÓN 2 — COORDINACIÓN DEL PUENTE →":"LIÇÃO 2 — COORDENAÇÃO DA PONTE →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
