import { useState, useEffect } from "react";
import { shuffleQuestionOptions, C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — SWISS CHEESE MODEL (ENGINE ROOM)
// ══════════════════════════════════════
function SwissCheeseSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const layers = [
    { id:"org", color:C.purple,
      label:{fr:"Organisation",en:"Organization",es:"Organización",pt:"Organização"},
      desc:{fr:"Décisions lointaines : planning de maintenance irréaliste, sous-effectif en salle des machines, pression commerciale sur les escales.\nCe niveau crée les conditions qui rendent l'erreur possible bien avant que le mécanicien ne soit de quart.",
            en:"Distant decisions: unrealistic maintenance scheduling, understaffing in the engine room, commercial pressure on port calls.\nThis level creates the conditions that make error possible long before the engineer is even on watch.",
            es:"Decisiones lejanas: planificación de mantenimiento irreal, falta de personal en la sala de máquinas, presión comercial sobre las escalas.\nEste nivel crea las condiciones que hacen posible el error mucho antes de que el maquinista esté de guardia.",
            pt:"Decisões distantes: planeamento de manutenção irrealista, falta de pessoal na casa das máquinas, pressão comercial sobre as escalas.\nEste nível cria as condições que tornam o erro possível muito antes do maquinista estar de quarto."} },
    { id:"sup", color:C.blue2,
      label:{fr:"Supervision",en:"Supervision",es:"Supervisión",pt:"Supervisão"},
      desc:{fr:"Manque de contrôle réel : rondes machine mal suivies, formation insuffisante sur un équipement récent, tolérance silencieuse à une dérive connue ('ça tient depuis des semaines').",
            en:"Lack of real oversight: poorly followed engine rounds, insufficient training on recent equipment, silent tolerance of a known drift ('it's been holding for weeks').",
            es:"Falta de control real: rondas de máquinas mal seguidas, formación insuficiente en un equipo reciente, tolerancia silenciosa a una deriva conocida ('lleva semanas aguantando').",
            pt:"Falta de controlo real: rondas de máquinas mal seguidas, formação insuficiente num equipamento recente, tolerância silenciosa a um desvio conhecido ('está a aguentar há semanas')."} },
    { id:"cond", color:C.orange,
      label:{fr:"Conditions",en:"Conditions",es:"Condiciones",pt:"Condições"},
      desc:{fr:"L'environnement du moment : fatigue accumulée, chaleur et bruit constants, gros temps qui complique chaque geste, charge de travail élevée après une avarie mineure déjà en cours de traitement.",
            en:"The environment at the moment: accumulated fatigue, constant heat and noise, heavy weather complicating every task, high workload after a minor fault already being handled.",
            es:"El entorno del momento: fatiga acumulada, calor y ruido constantes, mal tiempo que complica cada gesto, alta carga de trabajo tras una avería menor ya en curso de tratamiento.",
            pt:"O ambiente do momento: fadiga acumulada, calor e ruído constantes, mau tempo que complica cada gesto, carga de trabalho elevada após uma avaria menor já em tratamento."} },
    { id:"act", color:C.red,
      label:{fr:"Acte actif",en:"Active act",es:"Acto activo",pt:"Ato ativo"},
      desc:{fr:"L'erreur visible : une alarme réarmée sans vérification, un paramètre mal lu, un silence au mauvais moment.\nC'est la seule couche que l'on voit — mais elle n'est presque jamais la seule cause.",
            en:"The visible error: an alarm silenced without checking, a misread parameter, silence at the wrong moment.\nThis is the only layer we usually see — but it is almost never the only cause.",
            es:"El error visible: una alarma silenciada sin comprobar, un parámetro mal leído, un silencio en el momento equivocado.\nEs la única capa que solemos ver, pero casi nunca es la única causa.",
            pt:"O erro visível: um alarme silenciado sem verificar, um parâmetro mal lido, um silêncio no momento errado.\nÉ a única camada que normalmente vemos, mas quase nunca é a única causa."} },
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
        <div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche une couche pour voir comment l'avarie traverse les défenses":lang==="en"?"Tap a layer to see how the casualty travels through the defenses":lang==="es"?"Toca una capa para ver cómo la avería atraviesa las defensas":"Toque numa camada para ver como a avaria atravessa as defesas"}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — FATIGUE & SLEEP DEBT CURVE (ENGINE WATCH)
// ══════════════════════════════════════
function FatigueSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const pts = [
    { h:"00h", risk:55, note:{fr:"Début de quart machine de nuit — vigilance encore correcte",en:"Start of night engine watch — alertness still acceptable",es:"Inicio de guardia de máquinas nocturna — vigilancia aún aceptable",pt:"Início do quarto de máquinas noturno — vigilância ainda aceitável"} },
    { h:"02h", risk:80, note:{fr:"Creux circadien — le corps réclame le sommeil, micro-sommeil possible devant un panneau d'alarmes",en:"Circadian low — the body demands sleep, micro-sleep possible in front of an alarm panel",es:"Bajón circadiano — el cuerpo exige dormir, posible microsueño frente a un panel de alarmas",pt:"Vale circadiano — o corpo exige sono, micro-sono possível em frente a um painel de alarmes"} },
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
        {lang==="fr"?"💤 DETTE DE SOMMEIL : dormir 4h une nuit ne se \"rattrape\" pas le lendemain. La dette s'accumule sur plusieurs jours de quart machine et dégrade le jugement même quand on se sent \"habitué\" au bruit et à la chaleur.":
         lang==="en"?"💤 SLEEP DEBT: sleeping 4h one night is not \"made up for\" the next day. Debt accumulates over several days on engine watch and degrades judgment even when you feel \"used to\" the noise and heat.":
         lang==="es"?"💤 DEUDA DE SUEÑO: dormir 4h una noche no se \"recupera\" al día siguiente. La deuda se acumula durante varios días de guardia de máquinas y degrada el juicio incluso cuando uno se siente \"acostumbrado\" al ruido y al calor.":
         "💤 DÍVIDA DE SONO: dormir 4h numa noite não é \"compensado\" no dia seguinte. A dívida acumula-se ao longo de vários dias de quarto de máquinas e degrada o julgamento mesmo quando nos sentimos \"habituados\" ao ruído e ao calor."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — ALARM BIAS (Panel vs Reality)
// ══════════════════════════════════════
function AlarmBiasSVG({ lang }) {
  const [side, setSide] = useState("panel");
  const d = {
    panel:{fr:"Le panneau affiche une alarme de niveau bas d'huile de graissage. C'est la troisième fois cette semaine. L'ingénieur de quart la réarme sans plus y penser, comme les fois précédentes.",
           en:"The panel shows a lubricating-oil low-level alarm. It's the third time this week. The engineer on watch resets it without much thought, like the previous times.",
           es:"El panel muestra una alarma de nivel bajo de aceite de lubricación. Es la tercera vez esta semana. El ingeniero de guardia la reinicia sin pensarlo mucho, como las veces anteriores.",
           pt:"O painel mostra um alarme de nível baixo de óleo de lubrificação. É a terceira vez esta semana. O maquinista de quarto reinicia-o sem pensar muito, como das vezes anteriores."},
    reality:{fr:"Le niveau réel dans le carter est passé sous le seuil critique recommandé par le fabricant depuis plusieurs heures — pas seulement au moment de l'alarme. La marge de sécurité a disparu bien avant que quiconque ne s'en inquiète.",
             en:"The actual level in the sump has been below the manufacturer's critical threshold for several hours — not just at the moment of the alarm. The safety margin disappeared long before anyone grew concerned.",
             es:"El nivel real en el cárter ha estado por debajo del umbral crítico recomendado por el fabricante durante varias horas, no solo en el momento de la alarma. El margen de seguridad desapareció mucho antes de que alguien se preocupara.",
             pt:"O nível real no cárter está abaixo do limite crítico recomendado pelo fabricante há várias horas — não só no momento do alarme. A margem de segurança desapareceu muito antes de alguém se preocupar."},
  };
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["panel","reality"].map(k=>(
          <button key={k} onClick={()=>setSide(k)} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${side===k?C.blue2:"rgba(255,255,255,0.12)"}`,background:side===k?`${C.blue2}22`:"rgba(255,255,255,0.04)",color:side===k?C.blue2:C.muted,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {k==="panel"?(lang==="fr"?"📟 CE QUE DIT LE PANNEAU":lang==="en"?"📟 WHAT THE PANEL SAYS":lang==="es"?"📟 LO QUE DICE EL PANEL":"📟 O QUE DIZ O PAINEL"):(lang==="fr"?"👁️ CE QUI SE PASSE VRAIMENT":lang==="en"?"👁️ WHAT IS REALLY HAPPENING":lang==="es"?"👁️ LO QUE REALMENTE OCURRE":"👁️ O QUE REALMENTE ACONTECE")}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:12,background:side==="panel"?"rgba(26,111,212,0.1)":"rgba(192,57,43,0.1)",border:`1px solid ${side==="panel"?C.blue2:C.red}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{d[side][lang]||d[side].fr}</div>
      <div style={{marginTop:8,fontSize:11,color:C.gold2,lineHeight:1.6,fontStyle:"italic"}}>
        {lang==="fr"?"⚡ Alarm bias = traiter une alarme répétée comme un bruit de fond plutôt que comme une information. Une alarme qui revient n'est pas 'normale', elle est ignorée.":
         lang==="en"?"⚡ Alarm bias = treating a repeated alarm as background noise rather than information. A recurring alarm is not \"normal\", it is being ignored.":
         lang==="es"?"⚡ Sesgo de alarma = tratar una alarma repetida como ruido de fondo en lugar de información. Una alarma recurrente no es \"normal\", está siendo ignorada.":
         "⚡ Viés de alarme = tratar um alarme repetido como ruído de fundo em vez de informação. Um alarme recorrente não é \"normal\", está a ser ignorado."}
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
    { id:"p1", bad:{fr:"\"Euh... le palier n°3 vous semble normal, chef ?\"",en:"\"Uh... does bearing #3 look normal to you, Chief?\"",es:"\"Eh... ¿el cojinete n.º 3 le parece normal, jefe?\"",pt:"\"Hã... o chumaceiro n.º 3 parece-lhe normal, chefe?\""},
      good:{fr:"\"Chef, la température du palier n°3 est de 15° au-dessus de la normale depuis 20 minutes et continue de monter — je recommande un arrêt contrôlé pour inspection.\"",en:"\"Chief, bearing #3 temperature has been 15° above normal for 20 minutes and is still rising — I recommend a controlled shutdown for inspection.\"",es:"\"Jefe, la temperatura del cojinete n.º 3 lleva 20 minutos 15° por encima de lo normal y sigue subiendo — recomiendo una parada controlada para inspección.\"",pt:"\"Chefe, a temperatura do chumaceiro n.º 3 está 15° acima do normal há 20 minutos e continua a subir — recomendo uma paragem controlada para inspeção.\""} },
    { id:"p2", bad:{fr:"\"OK\" (sans répéter l'ordre reçu)",en:"\"OK\" (without repeating the order received)",es:"\"Vale\" (sin repetir la orden recibida)",pt:"\"OK\" (sem repetir a ordem recebida)"},
      good:{fr:"\"Compris : je bascule sur le générateur n°2 et je maintiens la charge sous 70%.\" (boucle fermée : je répète pour confirmer)",en:"\"Understood: switching to generator #2 and keeping load under 70%.\" (closed loop: I repeat back to confirm)",es:"\"Entendido: paso al generador n.º 2 y mantengo la carga por debajo del 70%.\" (bucle cerrado: repito para confirmar)",pt:"\"Entendido: mudo para o gerador n.º 2 e mantenho a carga abaixo de 70%.\" (ciclo fechado: repito para confirmar)"} },
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
    { id:"bias", icon:"📟", color:C.teal, label:{fr:"Alarm Bias",en:"Alarm Bias",es:"Sesgo de Alarma",pt:"Viés de Alarme"} },
    { id:"comm", icon:"🗣️", color:C.purple, label:{fr:"Communication",en:"Communication",es:"Comunicación",pt:"Comunicação"} },
    { id:"pressure", icon:"⏱️", color:C.red, label:{fr:"Pression Opérationnelle",en:"Operational Pressure",es:"Presión Operativa",pt:"Pressão Operacional"} },
    { id:"culture", icon:"🛡️", color:C.gold2, label:{fr:"Culture Sécurité",en:"Safety Culture",es:"Cultura Seguridad",pt:"Cultura de Segurança"} },
  ];
  const descs = {
    fatigue:{fr:"Baisse mesurable du temps de réaction et du jugement après un manque de sommeil prolongé en salle des machines.",en:"Measurable drop in reaction time and judgment after prolonged lack of sleep in the engine room.",es:"Caída medible del tiempo de reacción y del juicio tras una falta de sueño prolongada en la sala de máquinas.",pt:"Queda mensurável no tempo de reação e no julgamento após falta de sono prolongada na casa das máquinas."},
    distract:{fr:"Attention détournée d'une ronde ou d'un paramètre par une tâche annexe (paperasse, réparation en cours, conversation).",en:"Attention diverted from a round or a parameter by a side task (paperwork, ongoing repair, conversation).",es:"Atención desviada de una ronda o un parámetro por una tarea secundaria (papeleo, reparación en curso, conversación).",pt:"Atenção desviada de uma ronda ou de um parâmetro por uma tarefa secundária (papelada, reparação em curso, conversa)."},
    bias:{fr:"Confiance excessive dans le panneau d'alarmes sans vérification physique du paramètre réel.",en:"Excessive trust in the alarm panel without physically checking the actual parameter.",es:"Confianza excesiva en el panel de alarmas sin verificación física del parámetro real.",pt:"Confiança excessiva no painel de alarmes sem verificação física do parâmetro real."},
    comm:{fr:"Ambiguïté ou silence au moment critique, absence de boucle fermée entre membres de l'équipe machine.",en:"Ambiguity or silence at the critical moment, absence of closed-loop communication between engine team members.",es:"Ambigüedad o silencio en el momento crítico, ausencia de bucle cerrado entre miembros del equipo de máquinas.",pt:"Ambiguidade ou silêncio no momento crítico, ausência de ciclo fechado entre membros da equipa de máquinas."},
    pressure:{fr:"Pression des horaires ou de l'escale qui pousse à reporter une inspection ou à ignorer un doute.",en:"Schedule or port-call pressure that pushes toward postponing an inspection or ignoring a doubt.",es:"Presión de horarios o de la escala que empuja a posponer una inspección o ignorar una duda.",pt:"Pressão de horários ou da escala que empurra para adiar uma inspeção ou ignorar uma dúvida."},
    culture:{fr:"Climat où signaler une anomalie ou un doute est valorisé plutôt que puni.",en:"Climate where reporting an anomaly or a doubt is valued rather than punished.",es:"Clima donde señalar una anomalía o una duda se valora en lugar de castigarse.",pt:"Clima onde reportar uma anomalia ou uma dúvida é valorizado em vez de punido."},
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
      {id:"q1",q:"Quart machine de nuit, 04h00. Tu as dormi 4h aujourd'hui, et environ 4h/nuit depuis 3 jours.\nL'alarme de niveau bas d'huile se déclenche pour la 3e fois cette semaine. Que fais-tu EN PREMIER ?\na) Tu réarmes l'alarme comme les fois précédentes et continues ta tâche annexe\nb) Tu attends qu'elle se déclenche une 4e fois pour agir\nc) Tu vérifies physiquement le niveau réel dans le carter avant de réarmer"},
      {id:"q2",q:"Le second mécanicien ne réagit pas à ton signalement de la dérive.\nQuelle est la décision la plus sûre ?\na) Tu répètes clairement ton observation et proposes une action précise (ex: arrêt contrôlé)\nb) Tu te tais, il est plus expérimenté\nc) Tu attends 10 minutes de plus"},
      {id:"q3",q:"Quelle action permet de vérifier si le panneau d'alarmes se trompe ?\na) Couper l'alarme sonore\nb) Vérification physique du paramètre réel (jauge, sonde manuelle)\nc) Attendre l'alarme suivante"},
      {id:"q4",q:"Quel facteur humain est le PLUS dangereux dans cette situation précise ?\na) La combinaison fatigue + confiance excessive dans le panneau (alarm bias)\nb) Le mauvais temps\nc) Le manque de pièces détachées"},
    ],
    en:[
      {id:"q1",q:"Night engine watch, 04:00. You slept 4h today, and roughly 4h/night for 3 days.\nThe low oil-level alarm triggers for the 3rd time this week. What do you do FIRST?\na) Reset it like the previous times and continue your side task\nb) Wait until it triggers a 4th time to act\nc) Physically check the actual sump level before resetting"},
      {id:"q2",q:"The second engineer does not react to your report of the drift.\nWhat is the safest decision?\na) Clearly repeat your observation and propose a specific action (e.g. controlled shutdown)\nb) Stay quiet, he is more experienced\nc) Wait 10 more minutes"},
      {id:"q3",q:"What action lets you check if the alarm panel is wrong?\na) Silence the audible alarm\nb) Physical verification of the actual parameter (gauge, manual dip)\nc) Wait for the next alarm"},
      {id:"q4",q:"Which human factor is MOST dangerous in this exact situation?\na) The combination of fatigue + alarm bias\nb) Bad weather\nc) Lack of spare parts"},
    ],
    es:[
      {id:"q1",q:"Guardia de máquinas nocturna, 04:00. Has dormido 4h hoy, y unas 4h/noche desde hace 3 días.\nLa alarma de nivel bajo de aceite se dispara por 3ª vez esta semana. ¿Qué haces PRIMERO?\na) La reinicias como las veces anteriores y sigues con tu tarea secundaria\nb) Esperas a que se dispare una 4ª vez para actuar\nc) Verificas físicamente el nivel real en el cárter antes de reiniciar"},
      {id:"q2",q:"El segundo maquinista no reacciona a tu aviso sobre la deriva.\n¿Cuál es la decisión más segura?\na) Repites claramente tu observación y propones una acción concreta (ej: parada controlada)\nb) Te callas, él tiene más experiencia\nc) Esperas 10 minutos más"},
      {id:"q3",q:"¿Qué acción permite comprobar si el panel de alarmas se equivoca?\na) Silenciar la alarma sonora\nb) Verificación física del parámetro real (indicador, varilla manual)\nc) Esperar la siguiente alarma"},
      {id:"q4",q:"¿Qué factor humano es el MÁS peligroso en esta situación exacta?\na) La combinación de fatiga + sesgo de alarma\nb) El mal tiempo\nc) La falta de repuestos"},
    ],
    pt:[
      {id:"q1",q:"Quarto de máquinas noturno, 04h00. Dormiste 4h hoje, e cerca de 4h/noite há 3 dias.\nO alarme de nível baixo de óleo dispara pela 3ª vez esta semana. O que fazes PRIMEIRO?\na) Reinicias como das vezes anteriores e continuas a tua tarefa secundária\nb) Esperas que dispare uma 4ª vez para agir\nc) Verificas fisicamente o nível real no cárter antes de reiniciar"},
      {id:"q2",q:"O segundo maquinista não reage ao teu aviso sobre o desvio.\nQual é a decisão mais segura?\na) Repetes claramente a tua observação e propões uma ação concreta (ex: paragem controlada)\nb) Ficas calado, ele tem mais experiência\nc) Esperas mais 10 minutos"},
      {id:"q3",q:"Que ação permite verificar se o painel de alarmes está errado?\na) Silenciar o alarme sonoro\nb) Verificação física do parâmetro real (indicador, vareta manual)\nc) Esperar pelo alarme seguinte"},
      {id:"q4",q:"Que fator humano é o MAIS perigoso nesta situação exata?\na) A combinação de fadiga + viés de alarme\nb) O mau tempo\nc) A falta de peças sobresselentes"},
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
        {lang==="fr"?"✅ Q1: c — toujours vérifier physiquement, le panneau seul ne suffit pas\n✅ Q2: a — l'assertivité structurée sauve des vies, le silence tue\n✅ Q3: b — la vérification physique reste la meilleure protection\n✅ Q4: a — c'est la combinaison des facteurs qui crée le risque maximal, pas un facteur isolé":
         lang==="en"?"✅ Q1: c — always verify physically, the panel alone is not enough\n✅ Q2: a — structured assertiveness saves lives, silence kills\n✅ Q3: b — physical verification remains the best protection\n✅ Q4: a — it is the combination of factors that creates maximum risk, not one factor alone":
         "✅ Q1: c · Q2: a · Q3: b · Q4: a"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — VIKING SKY
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Viking Sky — Hustadvika, Norvège (23 mars 2019)",teaser:"1 374 personnes à bord · Tempête · Quasi-échouement · Alarmes ignorées pendant des heures",
      what:"Par gros temps au large de la Norvège, les trois groupes diesel en service du Viking Sky tombent en panne presque simultanément : le niveau d'huile de graissage dans leurs carters était maintenu entre 28 et 40% de la capacité, alors que le fabricant recommandait 68 à 75%. Entre 05h00 et 09h04 ce matin-là, 18 alarmes de niveau bas ou de faible volume d'huile s'étaient déclenchées sans qu'une action corrective décisive ne soit prise. Le navire perd toute propulsion et toute direction en pleine tempête, dérive vers la côte, et passe à quelques longueurs de bateau de l'échouement avant que l'équipage ne parvienne à relancer la propulsion, 39 minutes après le blackout.",
      cause:"• Niveaux d'huile de graissage maintenus largement sous le seuil recommandé par le fabricant\n• 18 alarmes de niveau bas enregistrées en quelques heures sans réaction corrective décisive\n• Une dérive technique connue et tolérée dans la durée plutôt que traitée immédiatement\n• Conception des caisses de service d'huile non conforme aux exigences applicables\n• Mer forte amplifiant l'effet du niveau bas (ballottement de l'huile dans les carters)",
      lessons:"✓ Une alarme répétée n'est pas un bruit de fond, c'est une information qui s'aggrave\n✓ Un paramètre maintenu 'limite' pendant des semaines n'est plus une marge de sécurité, c'est une dérive tolérée\n✓ Le gros temps peut transformer une marge insuffisante en panne totale au pire moment possible\n✓ La vérification physique périodique reste indispensable, même quand le panneau semble 'gérable'",
      link:"🔗 Cet accident est aujourd'hui la référence pour la fatigue d'alarme et la normalisation d'une dérive connue en salle des machines — un rapport d'enquête officiel complet (NSIA, Norvège) documente chaque étape."},
    en:{title:"Viking Sky — Hustadvika, Norway (23 March 2019)",teaser:"1,374 people on board · Storm · Near-grounding · Alarms ignored for hours",
      what:"In heavy weather off Norway, the three diesel generators in service on the Viking Sky failed almost simultaneously: the lubricating-oil level in their sump tanks was maintained at 28-40% of capacity, while the manufacturer recommended 68-75%. Between 05:00 and 09:04 that morning, 18 low-level or low-volume oil alarms had been triggered without decisive corrective action being taken. The ship lost all propulsion and steering in the middle of the storm, drifted toward the coast, and came within a ship's length of grounding before the crew managed to restore propulsion, 39 minutes after the blackout.",
      cause:"• Lubricating-oil levels maintained well below the manufacturer's recommended threshold\n• 18 low-level alarms recorded within a few hours without decisive corrective action\n• A known technical drift tolerated over time rather than addressed immediately\n• Sump tank design non-compliant with applicable requirements\n• Heavy seas amplifying the effect of the low level (oil sloshing in the sumps)",
      lessons:"✓ A repeated alarm is not background noise, it is worsening information\n✓ A parameter kept 'borderline' for weeks is no longer a safety margin, it is a tolerated drift\n✓ Heavy weather can turn an insufficient margin into a total failure at the worst possible moment\n✓ Periodic physical verification remains essential, even when the panel seems 'manageable'",
      link:"🔗 This accident is now the reference case for alarm fatigue and normalization of a known drift in the engine room — a full official investigation report (NSIA, Norway) documents every step."},
    es:{title:"Viking Sky — Hustadvika, Noruega (23 de marzo de 2019)",teaser:"1 374 personas a bordo · Tormenta · Casi encalla · Alarmas ignoradas durante horas",
      what:"Con mal tiempo frente a Noruega, los tres generadores diésel en servicio del Viking Sky fallaron casi simultáneamente: el nivel de aceite de lubricación en sus cárteres se mantenía entre el 28 y el 40% de la capacidad, cuando el fabricante recomendaba entre el 68 y el 75%. Entre las 05:00 y las 09:04 de esa mañana se habían disparado 18 alarmas de nivel bajo o volumen bajo de aceite sin que se tomara una acción correctiva decisiva. El buque perdió toda propulsión y gobierno en plena tormenta, derivó hacia la costa, y quedó a pocas esloras de encallar antes de que la tripulación lograra restablecer la propulsión, 39 minutos después del apagón.",
      cause:"• Niveles de aceite de lubricación mantenidos muy por debajo del umbral recomendado por el fabricante\n• 18 alarmas de nivel bajo registradas en pocas horas sin acción correctiva decisiva\n• Una deriva técnica conocida y tolerada en el tiempo en lugar de tratarse de inmediato\n• Diseño de los tanques de servicio de aceite no conforme con los requisitos aplicables\n• Mar gruesa amplificando el efecto del nivel bajo (oleaje del aceite en los cárteres)",
      lessons:"✓ Una alarma repetida no es ruido de fondo, es información que empeora\n✓ Un parámetro mantenido 'al límite' durante semanas ya no es un margen de seguridad, es una deriva tolerada\n✓ El mal tiempo puede convertir un margen insuficiente en un fallo total en el peor momento posible\n✓ La verificación física periódica sigue siendo indispensable, incluso cuando el panel parece 'manejable'",
      link:"🔗 Este accidente es hoy la referencia de la fatiga de alarma y la normalización de una deriva conocida en la sala de máquinas — un informe de investigación oficial completo (NSIA, Noruega) documenta cada etapa."},
    pt:{title:"Viking Sky — Hustadvika, Noruega (23 de março de 2019)",teaser:"1 374 pessoas a bordo · Tempestade · Quase encalhe · Alarmes ignorados durante horas",
      what:"Com mau tempo ao largo da Noruega, os três geradores diesel em serviço do Viking Sky falharam quase simultaneamente: o nível de óleo de lubrificação nos seus cárteres era mantido entre 28 e 40% da capacidade, quando o fabricante recomendava 68 a 75%. Entre as 05h00 e as 09h04 dessa manhã, dispararam-se 18 alarmes de nível baixo ou volume baixo de óleo sem que fosse tomada uma ação corretiva decisiva. O navio perdeu toda a propulsão e governo em plena tempestade, derivou em direção à costa, e ficou a poucos comprimentos de navio de encalhar antes de a tripulação conseguir restabelecer a propulsão, 39 minutos após o blackout.",
      cause:"• Níveis de óleo de lubrificação mantidos bem abaixo do limite recomendado pelo fabricante\n• 18 alarmes de nível baixo registados em poucas horas sem ação corretiva decisiva\n• Um desvio técnico conhecido e tolerado ao longo do tempo em vez de tratado de imediato\n• Design dos tanques de serviço de óleo não conforme com os requisitos aplicáveis\n• Mar grosso a amplificar o efeito do nível baixo (o óleo a agitar-se nos cárteres)",
      lessons:"✓ Um alarme repetido não é ruído de fundo, é informação que piora\n✓ Um parâmetro mantido 'no limite' durante semanas já não é uma margem de segurança, é um desvio tolerado\n✓ O mau tempo pode transformar uma margem insuficiente numa falha total no pior momento possível\n✓ A verificação física periódica continua a ser indispensável, mesmo quando o painel parece 'controlável'",
      link:"🔗 Este acidente é hoje a referência da fadiga de alarme e da normalização de um desvio conhecido na casa das máquinas — um relatório de investigação oficial completo (NSIA, Noruega) documenta cada etapa."},
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
// BANK — 15 QUESTIONS
// ══════════════════════════════════════
export const BANK = {
  fr:[
    {q:"Pourquoi une salle des machines 'en règle' peut-elle quand même subir une avarie critique ?",opts:["Les procédures de maintenance sont incomplètes","Les défenses de sécurité s'alignent rarement, mais le facteur humain reste la cause la plus fréquente","Le panneau d'alarmes est toujours en panne","C'est toujours la faute d'une pièce défectueuse"],correct:1,expl:"Même une salle des machines techniquement conforme peut subir une avarie critique si le facteur humain (fatigue, communication, biais) échoue. Les procédures ne remplacent pas la vigilance humaine."},
    {q:"Le modèle des couches de défense (Swiss Cheese) montre que :",opts:["Une avarie vient toujours d'une seule cause","Une avarie résulte généralement de plusieurs petites failles alignées","Les avaries sont imprévisibles","Seule la couche organisationnelle compte"],correct:1,expl:"Le modèle de Reason montre qu'une avarie traverse plusieurs couches de défense (organisation, supervision, conditions, acte) qui s'alignent rarement — mais qui, quand elles s'alignent, laissent passer l'accident."},
    {q:"Qu'est-ce que la dette de sommeil ?",opts:["Dormir exactement 8h chaque nuit","L'accumulation progressive de fatigue sur plusieurs jours de manque de sommeil","Un système de gestion des quarts machine","Une règle sur les heures de repos"],correct:1,expl:"La dette de sommeil s'accumule sur plusieurs jours : dormir 4h une nuit et penser que 'ça va' le lendemain ignore l'effet cumulatif sur le jugement et le temps de réaction."},
    {q:"Vous êtes ingénieur de quart, fatigué, et une alarme de niveau bas se déclenche pour la 3e fois cette semaine. Que faites-vous ?",opts:["Vous réarmez l'alarme comme d'habitude et continuez votre tâche","Vous vérifiez physiquement le niveau réel avant de conclure qu'il n'y a pas de danger","Vous coupez l'alarme sonore pour vous concentrer","Vous attendez qu'elle se déclenche à nouveau pour agir"],correct:1,expl:"L'alarm bias pousse à traiter une alarme répétée comme un bruit de fond. La vérification physique reste indispensable, surtout en état de fatigue."},
    {q:"Un jeune mécanicien voit une dérive mais hésite à en parler au chef par respect de la hiérarchie. Quelle est la bonne pratique ?",opts:["Rester silencieux, le chef est responsable","Communiquer de façon claire et assertive, avec une observation factuelle et une action proposée","Attendre que le chef s'en aperçoive seul","Envoyer un message écrit après le quart"],correct:1,expl:"L'assertivité structurée (observation factuelle + action proposée) permet de faire remonter un danger sans compromettre le respect de la hiérarchie. Le silence a causé de nombreuses avaries majeures."},
    {q:"Vous recevez une consigne critique par radio interne mais n'êtes pas sûr d'avoir bien compris. Que faites-vous ?",opts:["Vous supposez avoir compris et agissez","Vous répétez la consigne reçue pour confirmation (communication en boucle fermée)","Vous ignorez la consigne","Vous demandez à un collègue plus tard"],correct:1,expl:"La communication en boucle fermée (répéter ce qu'on a compris) élimine l'ambiguïté immédiatement, contrairement à une supposition silencieuse."},
    {q:"Quelle est la principale différence entre distraction et fatigue comme facteurs de risque ?",opts:["Il n'y en a aucune, ce sont les mêmes","La distraction détourne l'attention d'une tâche active ; la fatigue dégrade la capacité globale de réaction","La fatigue ne concerne que le quart de nuit","La distraction est toujours volontaire"],correct:1,expl:"La distraction est une perte d'attention ponctuelle (tâche annexe), tandis que la fatigue dégrade en continu la vigilance et le temps de réaction, même sans distraction active."},
    {q:"Pourquoi la pression opérationnelle (délais d'escale, planning commercial) est-elle un facteur de risque ?",opts:["Elle n'a aucun impact sur la sécurité","Elle pousse à reporter une inspection ou à ignorer un signal d'alerte pour tenir les délais","Elle concerne uniquement les armateurs, pas l'équipage","Elle améliore la concentration"],correct:1,expl:"La pression des délais peut pousser une équipe machine à minimiser un doute ou un signal faible pour ne pas retarder l'escale — un facteur direct dans de nombreuses avaries analysées."},
    {q:"Qu'est-ce qu'une 'culture de sécurité' positive en salle des machines ?",opts:["Punir systématiquement toute anomalie signalée","Un climat où signaler une anomalie ou un doute est valorisé plutôt que sanctionné","Ne jamais parler des incidents","Réserver la sécurité aux officiers seniors"],correct:1,expl:"Une culture de sécurité positive encourage le signalement proactif des anomalies et des doutes, ce qui permet de corriger les problèmes avant qu'ils ne deviennent des avaries majeures."},
    {q:"Vous constatez que votre collègue de quart montre des signes de fatigue extrême (micro-sommeil). Quelle est la priorité ?",opts:["Ne rien dire pour ne pas le vexer","Signaler la situation et proposer une relève ou un soutien immédiat","Attendre la fin du quart","Noter l'incident pour en parler plus tard"],correct:1,expl:"La sécurité collective prime sur la gêne individuelle. Signaler un collègue en état de micro-sommeil et organiser une relève est une action de prévention directe."},
    {q:"Quel est le rôle du panneau d'alarmes/monitoring dans la prévention des avaries selon cette leçon ?",opts:["Il remplace totalement la vérification physique","C'est un outil d'aide à la décision, pas une preuve absolue qui dispense de vérification","Il est inutile en escale","Il ne sert qu'en haute mer"],correct:1,expl:"Le panneau d'alarmes est une aide précieuse mais ne remplace jamais la vérification physique et le jugement humain — c'est l'essence de l'alarm bias à éviter."},
    {q:"Vous devez décider en urgence face à un paramètre ambigu ET un chef qui ne répond pas. Quelle est la priorité d'action ?",opts:["Attendre une nouvelle instruction avant tout","Vérifier physiquement, communiquer clairement le danger perçu, et proposer une action concrète","Changer de canal radio","Réduire l'éclairage de la salle des machines"],correct:1,expl:"Dans l'urgence, la priorité est : vérifier (physique), communiquer (assertivité claire), agir (proposition concrète) — sans attendre passivement une validation qui tarde."},
    {q:"Pourquoi le Viking Sky a-t-il subi un blackout total malgré trois groupes diesel en service ?",opts:["Les groupes étaient mal calibrés","Les niveaux d'huile de graissage étaient maintenus sous le seuil recommandé, malgré 18 alarmes en quelques heures","Il n'y avait pas de mécanicien de quart","Un des groupes était en révision"],correct:1,expl:"Les trois groupes ont manqué d'huile de graissage en même temps par gros temps, après des alarmes répétées traitées comme un bruit de fond plutôt que comme une information qui s'aggravait."},
    {q:"Quel est l'objectif principal de la leçon L1 de ce module ?",opts:["Réexpliquer la maintenance des moteurs diesel","Comprendre les facteurs humains qui mènent à une avarie critique malgré des procédures connues","Apprendre à réparer un panneau d'alarmes","Étudier la responsabilité juridique en cas d'avarie"],correct:1,expl:"L1 se concentre exclusivement sur le facteur humain — pourquoi des mécaniciens compétents commettent des erreurs — sans réexpliquer la maintenance technique elle-même."},
    {q:"Quelle est l'action prioritaire pour réduire le risque lié à la fatigue en quart machine de nuit ?",opts:["Boire plus de café","Reconnaître les signes de fatigue tôt et organiser des relèves ou pauses avant la zone de risque maximal (creux circadien)","Ignorer la fatigue, elle passe avec l'habitude","Réduire l'éclairage de la salle des machines"],correct:1,expl:"La reconnaissance précoce des signes de fatigue et l'organisation proactive de relèves avant le creux circadien (souvent 2h-5h) reste la mesure préventive la plus efficace."},
  ],
  en:[
    {q:"Why can an engine room 'in compliance' still suffer a critical casualty?",opts:["Maintenance procedures are incomplete","Safety defenses rarely align, but the human factor remains the most frequent cause","The alarm panel is always broken","It's always a faulty part's fault"],correct:1,expl:"Even a technically compliant engine room can suffer a critical casualty if the human factor (fatigue, communication, bias) fails. Procedures do not replace human vigilance."},
    {q:"What does the Swiss Cheese defense-layer model show?",opts:["A casualty always has a single cause","A casualty usually results from several small failures aligning","Casualties are unpredictable","Only the organizational layer matters"],correct:1,expl:"Reason's model shows that a casualty passes through several defense layers (organization, supervision, conditions, act) that rarely align — but when they do, the accident gets through."},
    {q:"What is sleep debt?",opts:["Sleeping exactly 8h every night","The progressive accumulation of fatigue over several days of insufficient sleep","An engine watch management system","A rule on rest hours"],correct:1,expl:"Sleep debt accumulates over several days: sleeping 4h one night and thinking 'it's fine' the next day ignores the cumulative effect on judgment and reaction time."},
    {q:"You are the engineer on watch, tired, and a low-level alarm triggers for the 3rd time this week. What do you do?",opts:["Reset it as usual and continue your task","Physically check the actual level before concluding there is no danger","Silence the audible alarm to focus","Wait for it to trigger again before acting"],correct:1,expl:"Alarm bias pushes toward treating a repeated alarm as background noise. Physical verification remains essential, especially when fatigued."},
    {q:"A junior engineer sees a drift but hesitates to tell the Chief out of respect for hierarchy. What is the correct practice?",opts:["Stay silent, the Chief is responsible","Communicate clearly and assertively, with a factual observation and a proposed action","Wait for the Chief to notice on his own","Send a written message after the watch"],correct:1,expl:"Structured assertiveness (factual observation + proposed action) allows a danger to be raised without undermining respect for hierarchy. Silence has caused many major casualties."},
    {q:"You receive a critical instruction on the internal radio but are not sure you understood it correctly. What do you do?",opts:["Assume you understood and act","Repeat the instruction back for confirmation (closed-loop communication)","Ignore the instruction","Ask a colleague later"],correct:1,expl:"Closed-loop communication (repeating what was understood) eliminates ambiguity immediately, unlike a silent assumption."},
    {q:"What is the main difference between distraction and fatigue as risk factors?",opts:["There is none, they are the same","Distraction diverts attention from an active task; fatigue degrades overall reaction capacity","Fatigue only applies to night watch","Distraction is always intentional"],correct:1,expl:"Distraction is a momentary loss of attention (side task), while fatigue continuously degrades vigilance and reaction time, even without active distraction."},
    {q:"Why is operational pressure (port-call deadlines, commercial schedule) a risk factor?",opts:["It has no impact on safety","It pushes toward postponing an inspection or ignoring a warning signal to meet deadlines","It only concerns owners, not the crew","It improves concentration"],correct:1,expl:"Schedule pressure can push an engine team to minimize a doubt or a weak signal so as not to delay the port call — a direct factor in many analyzed casualties."},
    {q:"What is a positive 'safety culture' in the engine room?",opts:["Systematically punishing every reported anomaly","A climate where reporting an anomaly or a doubt is valued rather than punished","Never discussing incidents","Reserving safety to senior officers"],correct:1,expl:"A positive safety culture encourages proactive reporting of anomalies and doubts, allowing problems to be corrected before they become major casualties."},
    {q:"You notice your watch colleague shows signs of extreme fatigue (micro-sleep). What is the priority?",opts:["Say nothing to avoid offending them","Report the situation and propose an immediate relief or support","Wait until the end of the watch","Note the incident to discuss later"],correct:1,expl:"Collective safety takes priority over individual discomfort. Reporting a colleague experiencing micro-sleep and organizing a relief is a direct preventive action."},
    {q:"According to this lesson, what is the role of the alarm/monitoring panel in preventing casualties?",opts:["It fully replaces physical verification","It is a decision-support tool, not absolute proof that removes the need for verification","It is useless in port","It only matters offshore"],correct:1,expl:"The alarm panel is a valuable aid but never replaces physical verification and human judgment — that is the essence of alarm bias to avoid."},
    {q:"You must decide urgently facing an ambiguous parameter AND an unresponsive Chief. What is the priority of action?",opts:["Wait for new instructions before anything else","Verify physically, clearly communicate the perceived danger, and propose a concrete action","Change radio channel","Reduce engine room lighting"],correct:1,expl:"In an emergency, the priority is: verify (physical), communicate (clear assertiveness), act (concrete proposal) — without passively waiting for a delayed validation."},
    {q:"Why did Viking Sky suffer a total blackout despite three diesel generators in service?",opts:["The generators were miscalibrated","Lubricating-oil levels were kept below the recommended threshold, despite 18 alarms within a few hours","There was no engineer on watch","One generator was under overhaul"],correct:1,expl:"All three generators ran short of lubricating oil at the same time in heavy weather, after repeated alarms were treated as background noise rather than as worsening information."},
    {q:"What is the main goal of lesson L1 in this module?",opts:["Re-explain diesel engine maintenance","Understand the human factors that lead to a critical casualty despite known procedures","Learn how to repair an alarm panel","Study legal liability in case of a casualty"],correct:1,expl:"L1 focuses exclusively on the human factor — why competent engineers make mistakes — without re-explaining the technical maintenance itself."},
    {q:"What is the priority action to reduce fatigue-related risk during night engine watch?",opts:["Drink more coffee","Recognize signs of fatigue early and organize reliefs or breaks before the highest-risk zone (circadian low)","Ignore fatigue, it passes with habit","Reduce engine room lighting"],correct:1,expl:"Early recognition of fatigue signs and proactive organization of reliefs before the circadian low (often 02:00-05:00) remains the most effective preventive measure."},
  ],
  es:[
    {q:"¿Por qué una sala de máquinas 'en regla' puede aun así sufrir una avería crítica?",opts:["Los procedimientos de mantenimiento son incompletos","Las defensas de seguridad rara vez se alinean, pero el factor humano sigue siendo la causa más frecuente","El panel de alarmas siempre está averiado","Siempre es culpa de una pieza defectuosa"],correct:1,expl:"Incluso una sala de máquinas técnicamente conforme puede sufrir una avería crítica si el factor humano falla. Los procedimientos no sustituyen la vigilancia humana."},
    {q:"¿Qué muestra el modelo de capas de defensa (queso suizo)?",opts:["Una avería siempre tiene una única causa","Una avería suele resultar de varios pequeños fallos alineados","Las averías son imprevisibles","Solo importa la capa organizativa"],correct:1,expl:"El modelo de Reason muestra que una avería atraviesa varias capas de defensa que rara vez se alinean, pero cuando lo hacen, el accidente pasa."},
    {q:"¿Qué es la deuda de sueño?",opts:["Dormir exactamente 8h cada noche","La acumulación progresiva de fatiga durante varios días de falta de sueño","Un sistema de gestión de guardias de máquinas","Una regla sobre horas de descanso"],correct:1,expl:"La deuda de sueño se acumula durante varios días: dormir 4h una noche y pensar que 'está bien' al día siguiente ignora el efecto acumulativo sobre el juicio."},
    {q:"Eres el ingeniero de guardia, cansado, y una alarma de nivel bajo se dispara por 3ª vez esta semana. ¿Qué haces?",opts:["La reinicias como siempre y sigues con tu tarea","Verificas físicamente el nivel real antes de concluir que no hay peligro","Silencias la alarma sonora para concentrarte","Esperas a que se dispare de nuevo para actuar"],correct:1,expl:"El sesgo de alarma empuja a tratar una alarma repetida como ruido de fondo. La verificación física sigue siendo esencial, sobre todo con fatiga."},
    {q:"Un maquinista joven ve una deriva pero duda en decírselo al jefe por respeto a la jerarquía. ¿Cuál es la práctica correcta?",opts:["Quedarse callado, el jefe es responsable","Comunicar de forma clara y asertiva, con una observación factual y una acción propuesta","Esperar a que el jefe se dé cuenta solo","Enviar un mensaje escrito después de la guardia"],correct:1,expl:"La asertividad estructurada permite plantear un peligro sin comprometer el respeto a la jerarquía. El silencio ha causado muchas averías importantes."},
    {q:"Recibes una consigna crítica por radio interna pero no estás seguro de haberla entendido bien. ¿Qué haces?",opts:["Supones que entendiste y actúas","Repites la consigna recibida para confirmar (comunicación en bucle cerrado)","Ignoras la consigna","Preguntas a un colega más tarde"],correct:1,expl:"La comunicación en bucle cerrado elimina la ambigüedad de inmediato, a diferencia de una suposición silenciosa."},
    {q:"¿Cuál es la principal diferencia entre distracción y fatiga como factores de riesgo?",opts:["No hay ninguna, son lo mismo","La distracción desvía la atención de una tarea activa; la fatiga degrada la capacidad general de reacción","La fatiga solo afecta a la guardia nocturna","La distracción siempre es voluntaria"],correct:1,expl:"La distracción es una pérdida puntual de atención, mientras que la fatiga degrada continuamente la vigilancia y el tiempo de reacción."},
    {q:"¿Por qué la presión operativa es un factor de riesgo?",opts:["No tiene ningún impacto en la seguridad","Empuja a posponer una inspección o ignorar señales de alerta para cumplir plazos","Solo concierne a los armadores, no a la tripulación","Mejora la concentración"],correct:1,expl:"La presión de plazos puede llevar a un equipo de máquinas a minimizar una duda o una señal débil para no retrasar la escala."},
    {q:"¿Qué es una 'cultura de seguridad' positiva en la sala de máquinas?",opts:["Castigar sistemáticamente cualquier anomalía reportada","Un clima donde señalar una anomalía o una duda se valora en lugar de sancionarse","No hablar nunca de los incidentes","Reservar la seguridad a los oficiales sénior"],correct:1,expl:"Una cultura de seguridad positiva fomenta el reporte proactivo de anomalías y dudas, permitiendo corregir problemas antes de que se conviertan en averías importantes."},
    {q:"Notas que tu compañero de guardia muestra signos de fatiga extrema (microsueño). ¿Cuál es la prioridad?",opts:["No decir nada para no ofenderlo","Reportar la situación y proponer un relevo o apoyo inmediato","Esperar al final de la guardia","Anotar el incidente para hablarlo más tarde"],correct:1,expl:"La seguridad colectiva prima sobre la incomodidad individual. Reportar a un compañero en microsueño y organizar un relevo es una acción preventiva directa."},
    {q:"Según esta lección, ¿cuál es el papel del panel de alarmas/monitoreo en la prevención de averías?",opts:["Sustituye totalmente la verificación física","Es una herramienta de ayuda a la decisión, no una prueba absoluta que exima de verificación","Es inútil en puerto","Solo sirve en alta mar"],correct:1,expl:"El panel de alarmas es una ayuda valiosa pero nunca sustituye la verificación física y el juicio humano."},
    {q:"Debes decidir con urgencia ante un parámetro ambiguo Y un jefe que no responde. ¿Cuál es la prioridad de acción?",opts:["Esperar nuevas instrucciones antes que nada","Verificar físicamente, comunicar claramente el peligro percibido, y proponer una acción concreta","Cambiar de canal de radio","Reducir la iluminación de la sala de máquinas"],correct:1,expl:"En una emergencia, la prioridad es: verificar, comunicar, actuar — sin esperar pasivamente una validación que tarda."},
    {q:"¿Por qué el Viking Sky sufrió un apagón total pese a tener tres generadores diésel en servicio?",opts:["Los generadores estaban mal calibrados","Los niveles de aceite de lubricación se mantenían bajo el umbral recomendado, pese a 18 alarmas en pocas horas","No había maquinista de guardia","Uno de los generadores estaba en revisión"],correct:1,expl:"Los tres generadores se quedaron sin aceite de lubricación al mismo tiempo con mal tiempo, tras alarmas repetidas tratadas como ruido de fondo en lugar de información que empeoraba."},
    {q:"¿Cuál es el objetivo principal de la lección L1 de este módulo?",opts:["Reexplicar el mantenimiento de motores diésel","Comprender los factores humanos que llevan a una avería crítica pese a procedimientos conocidos","Aprender a reparar un panel de alarmas","Estudiar la responsabilidad jurídica en caso de avería"],correct:1,expl:"L1 se centra exclusivamente en el factor humano, sin reexplicar el mantenimiento técnico en sí."},
    {q:"¿Cuál es la acción prioritaria para reducir el riesgo de fatiga en guardia de máquinas nocturna?",opts:["Beber más café","Reconocer los signos de fatiga pronto y organizar relevos o pausas antes de la zona de riesgo máximo","Ignorar la fatiga, pasa con la costumbre","Reducir la iluminación de la sala de máquinas"],correct:1,expl:"El reconocimiento temprano de los signos de fatiga y la organización proactiva de relevos siguen siendo la medida preventiva más eficaz."},
  ],
  pt:[
    {q:"Por que uma casa das máquinas 'em conformidade' ainda pode sofrer uma avaria crítica?",opts:["Os procedimentos de manutenção são incompletos","As defesas de segurança raramente se alinham, mas o fator humano continua a ser a causa mais frequente","O painel de alarmes está sempre avariado","É sempre culpa de uma peça defeituosa"],correct:1,expl:"Mesmo uma casa das máquinas tecnicamente conforme pode sofrer uma avaria crítica se o fator humano falhar. Os procedimentos não substituem a vigilância humana."},
    {q:"O que mostra o modelo de camadas de defesa (queijo suíço)?",opts:["Uma avaria tem sempre uma única causa","Uma avaria resulta geralmente de várias pequenas falhas alinhadas","As avarias são imprevisíveis","Só a camada organizacional importa"],correct:1,expl:"O modelo de Reason mostra que uma avaria atravessa várias camadas de defesa que raramente se alinham — mas quando se alinham, o acidente passa."},
    {q:"O que é a dívida de sono?",opts:["Dormir exatamente 8h todas as noites","A acumulação progressiva de fadiga ao longo de vários dias de falta de sono","Um sistema de gestão de quartos de máquinas","Uma regra sobre horas de descanso"],correct:1,expl:"A dívida de sono acumula-se ao longo de vários dias: dormir 4h numa noite e pensar que 'está tudo bem' no dia seguinte ignora o efeito cumulativo."},
    {q:"És o maquinista de quarto, cansado, e um alarme de nível baixo dispara pela 3ª vez esta semana. O que fazes?",opts:["Reinicias como sempre e continuas a tua tarefa","Verificas fisicamente o nível real antes de concluir que não há perigo","Silencias o alarme sonoro para te concentrares","Esperas que dispare novamente para agir"],correct:1,expl:"O viés de alarme empurra para tratar um alarme repetido como ruído de fundo. A verificação física continua a ser essencial, sobretudo com fadiga."},
    {q:"Um maquinista júnior vê um desvio mas hesita em falar com o chefe por respeito à hierarquia. Qual é a prática correta?",opts:["Ficar calado, o chefe é responsável","Comunicar de forma clara e assertiva, com uma observação factual e uma ação proposta","Esperar que o chefe repare sozinho","Enviar uma mensagem escrita depois do quarto"],correct:1,expl:"A assertividade estruturada permite levantar um perigo sem comprometer o respeito à hierarquia. O silêncio já causou muitas avarias importantes."},
    {q:"Recebes uma instrução crítica pelo rádio interno mas não tens certeza se a entendeste corretamente. O que fazes?",opts:["Supões que entendeste e ages","Repetes a instrução recebida para confirmar (comunicação em ciclo fechado)","Ignoras a instrução","Perguntas a um colega mais tarde"],correct:1,expl:"A comunicação em ciclo fechado elimina a ambiguidade imediatamente, ao contrário de uma suposição silenciosa."},
    {q:"Qual é a principal diferença entre distração e fadiga como fatores de risco?",opts:["Não há nenhuma, são o mesmo","A distração desvia a atenção de uma tarefa ativa; a fadiga degrada a capacidade geral de reação","A fadiga só se aplica ao quarto de noite","A distração é sempre voluntária"],correct:1,expl:"A distração é uma perda pontual de atenção, enquanto a fadiga degrada continuamente a vigilância e o tempo de reação."},
    {q:"Por que a pressão operacional é um fator de risco?",opts:["Não tem impacto na segurança","Empurra para adiar uma inspeção ou ignorar sinais de alerta para cumprir prazos","Só diz respeito aos armadores, não à tripulação","Melhora a concentração"],correct:1,expl:"A pressão de prazos pode levar uma equipa de máquinas a minimizar uma dúvida ou um sinal fraco para não atrasar a escala."},
    {q:"O que é uma 'cultura de segurança' positiva na casa das máquinas?",opts:["Punir sistematicamente qualquer anomalia reportada","Um clima onde reportar uma anomalia ou uma dúvida é valorizado em vez de punido","Nunca falar dos incidentes","Reservar a segurança aos oficiais seniores"],correct:1,expl:"Uma cultura de segurança positiva incentiva o reporte proativo de anomalias e dúvidas, permitindo corrigir problemas antes que se tornem avarias importantes."},
    {q:"Reparas que o teu colega de quarto mostra sinais de fadiga extrema (micro-sono). Qual é a prioridade?",opts:["Não dizer nada para não o ofender","Reportar a situação e propor um alívio ou apoio imediato","Esperar pelo fim do quarto","Anotar o incidente para falar depois"],correct:1,expl:"A segurança coletiva tem prioridade sobre o desconforto individual. Reportar um colega em micro-sono e organizar um alívio é uma ação preventiva direta."},
    {q:"Segundo esta lição, qual é o papel do painel de alarmes/monitorização na prevenção de avarias?",opts:["Substitui totalmente a verificação física","É uma ferramenta de apoio à decisão, não uma prova absoluta que dispense verificação","É inútil em porto","Só serve em alto mar"],correct:1,expl:"O painel de alarmes é uma ajuda valiosa mas nunca substitui a verificação física e o julgamento humano."},
    {q:"Tens de decidir com urgência perante um parâmetro ambíguo E um chefe que não responde. Qual é a prioridade de ação?",opts:["Esperar novas instruções antes de tudo","Verificar fisicamente, comunicar claramente o perigo percebido, e propor uma ação concreta","Mudar de canal de rádio","Reduzir a iluminação da casa das máquinas"],correct:1,expl:"Numa emergência, a prioridade é: verificar, comunicar, agir — sem esperar passivamente por uma validação que demora."},
    {q:"Por que o Viking Sky sofreu um blackout total apesar de ter três geradores diesel em serviço?",opts:["Os geradores estavam mal calibrados","Os níveis de óleo de lubrificação eram mantidos abaixo do limite recomendado, apesar de 18 alarmes em poucas horas","Não havia maquinista de quarto","Um dos geradores estava em revisão"],correct:1,expl:"Os três geradores ficaram sem óleo de lubrificação ao mesmo tempo com mau tempo, depois de alarmes repetidos tratados como ruído de fundo em vez de informação que piorava."},
    {q:"Qual é o objetivo principal da lição L1 deste módulo?",opts:["Reexplicar a manutenção de motores diesel","Compreender os fatores humanos que levam a uma avaria crítica apesar de procedimentos conhecidos","Aprender a reparar um painel de alarmes","Estudar a responsabilidade jurídica em caso de avaria"],correct:1,expl:"L1 foca-se exclusivamente no fator humano, sem reexplicar a manutenção técnica em si."},
    {q:"Qual é a ação prioritária para reduzir o risco relacionado com a fadiga no quarto de máquinas noturno?",opts:["Beber mais café","Reconhecer os sinais de fadiga cedo e organizar alívios ou pausas antes da zona de risco máximo","Ignorar a fadiga, passa com o hábito","Reduzir a iluminação da casa das máquinas"],correct:1,expl:"O reconhecimento precoce dos sinais de fadiga e a organização proativa de alívios continuam a ser a medida preventiva mais eficaz."},
  ],
};

// ══════════════════════════════════════
// QUIZ — FINAL (5 QUESTIONS)
// ══════════════════════════════════════
export const QUIZ = {
  fr:[
    {q:"Vous êtes fatigué, seul face à une alarme de niveau bas ambiguë. Quelle est la première action ?",opts:["Continuer votre tâche, le panneau gère","Vérifier physiquement le paramètre réel","Attendre l'alarme suivante","Réduire l'éclairage pour mieux voir l'écran"],correct:1,expl:"La vérification physique reste la première ligne de défense contre l'alarm bias, surtout en état de fatigue."},
    {q:"Un jeune mécanicien hésite à contredire le chef malgré une dérive perçue. Quelle est l'attitude correcte ?",opts:["Se taire par respect","Communiquer clairement et proposer une action concrète","Attendre la fin du quart pour en parler","Écrire un rapport après coup"],correct:1,expl:"L'assertivité structurée permet de signaler un danger sans rompre le respect hiérarchique — le silence a coûté cher dans l'histoire maritime."},
    {q:"Pourquoi le Viking Sky a-t-il subi un blackout total malgré trois groupes diesel en service ?",opts:["Niveaux d'huile de graissage maintenus sous le seuil recommandé, malgré 18 alarmes en quelques heures","Panne des trois groupes simultanément par défaut de fabrication","Absence de tout mécanicien à bord","Erreur de navigation"],correct:0,expl:"Une dérive connue et tolérée pendant des semaines, combinée à des alarmes traitées comme un bruit de fond — le cas de référence de l'alarm bias en salle des machines."},
    {q:"Que représente la dette de sommeil ?",opts:["Un jour de repos obligatoire toutes les semaines","L'accumulation de fatigue sur plusieurs jours de sommeil insuffisant","Le nombre d'heures travaillées","Une clause du contrat d'engagement"],correct:1,expl:"La dette de sommeil s'accumule progressivement — 'ça va, j'ai dormi 4h' ignore l'effet cumulé des jours précédents sur le jugement."},
    {q:"Quel facteur est généralement le plus déterminant dans une avarie machine majeure selon cette leçon ?",opts:["Une seule défaillance technique isolée","La combinaison de plusieurs facteurs humains (fatigue, biais, communication) alignés","Le mauvais temps uniquement","Un panneau d'alarmes hors service"],correct:1,expl:"Le modèle des couches de défense montre que c'est presque toujours l'alignement de plusieurs facteurs humains, pas une cause unique, qui mène à l'avarie."},
  ],
  en:[
    {q:"You are tired, alone facing an ambiguous low-level alarm. What is the first action?",opts:["Continue your task, the panel handles it","Physically verify the actual parameter","Wait for the next alarm","Reduce lighting to see the screen better"],correct:1,expl:"Physical verification remains the first line of defense against alarm bias, especially when fatigued."},
    {q:"A junior engineer hesitates to contradict the Chief despite a perceived drift. What is the correct attitude?",opts:["Stay silent out of respect","Communicate clearly and propose a concrete action","Wait until the end of the watch to discuss it","Write a report afterward"],correct:1,expl:"Structured assertiveness allows a danger to be reported without breaking hierarchical respect — silence has been costly in maritime history."},
    {q:"Why did Viking Sky suffer a total blackout despite three diesel generators in service?",opts:["Lubricating-oil levels kept below the recommended threshold, despite 18 alarms within a few hours","All three generators failed simultaneously due to a manufacturing defect","No engineer was on board","Navigation error"],correct:0,expl:"A known drift tolerated for weeks, combined with alarms treated as background noise — the reference case for alarm bias in the engine room."},
    {q:"What does sleep debt represent?",opts:["A mandatory day off every week","The accumulation of fatigue over several days of insufficient sleep","The number of hours worked","A clause in the employment contract"],correct:1,expl:"Sleep debt accumulates progressively — 'it's fine, I slept 4h' ignores the cumulative effect of previous days on judgment."},
    {q:"According to this lesson, what factor is generally most decisive in a major machinery casualty?",opts:["A single isolated technical failure","The combination of several aligned human factors (fatigue, bias, communication)","Bad weather alone","An out-of-service alarm panel"],correct:1,expl:"The defense-layer model shows it is almost always the alignment of several human factors, not a single cause, that leads to the casualty."},
  ],
  es:[
    {q:"Estás cansado, solo ante una alarma de nivel bajo ambigua. ¿Cuál es la primera acción?",opts:["Continuar tu tarea, el panel lo gestiona","Verificar físicamente el parámetro real","Esperar la siguiente alarma","Reducir la iluminación para ver mejor la pantalla"],correct:1,expl:"La verificación física sigue siendo la primera línea de defensa contra el sesgo de alarma, sobre todo con fatiga."},
    {q:"Un maquinista joven duda en contradecir al jefe pese a una deriva percibida. ¿Cuál es la actitud correcta?",opts:["Callarse por respeto","Comunicar claramente y proponer una acción concreta","Esperar al final de la guardia para hablarlo","Escribir un informe después"],correct:1,expl:"La asertividad estructurada permite señalar un peligro sin romper el respeto jerárquico — el silencio ha costado caro en la historia marítima."},
    {q:"¿Por qué el Viking Sky sufrió un apagón total pese a tener tres generadores diésel en servicio?",opts:["Niveles de aceite de lubricación mantenidos bajo el umbral recomendado, pese a 18 alarmas en pocas horas","Los tres generadores fallaron simultáneamente por un defecto de fabricación","No había ningún maquinista a bordo","Error de navegación"],correct:0,expl:"Una deriva conocida y tolerada durante semanas, combinada con alarmas tratadas como ruido de fondo — el caso de referencia del sesgo de alarma."},
    {q:"¿Qué representa la deuda de sueño?",opts:["Un día libre obligatorio cada semana","La acumulación de fatiga durante varios días de sueño insuficiente","El número de horas trabajadas","Una cláusula del contrato de embarque"],correct:1,expl:"La deuda de sueño se acumula progresivamente — 'está bien, dormí 4h' ignora el efecto acumulado de los días anteriores."},
    {q:"Según esta lección, ¿qué factor suele ser el más determinante en una avería mayor de maquinaria?",opts:["Un único fallo técnico aislado","La combinación de varios factores humanos alineados (fatiga, sesgo, comunicación)","El mal tiempo únicamente","Un panel de alarmas fuera de servicio"],correct:1,expl:"El modelo de capas de defensa muestra que casi siempre es la alineación de varios factores humanos, no una causa única, la que lleva a la avería."},
  ],
  pt:[
    {q:"Estás cansado, sozinho perante um alarme de nível baixo ambíguo. Qual é a primeira ação?",opts:["Continuar a tua tarefa, o painel trata disso","Verificar fisicamente o parâmetro real","Esperar pelo alarme seguinte","Reduzir a iluminação para ver melhor o ecrã"],correct:1,expl:"A verificação física continua a ser a primeira linha de defesa contra o viés de alarme, sobretudo com fadiga."},
    {q:"Um maquinista júnior hesita em contradizer o chefe apesar de um desvio percebido. Qual é a atitude correta?",opts:["Ficar calado por respeito","Comunicar claramente e propor uma ação concreta","Esperar pelo fim do quarto para falar sobre isso","Escrever um relatório depois"],correct:1,expl:"A assertividade estruturada permite reportar um perigo sem quebrar o respeito hierárquico — o silêncio já custou caro na história marítima."},
    {q:"Por que o Viking Sky sofreu um blackout total apesar de ter três geradores diesel em serviço?",opts:["Níveis de óleo de lubrificação mantidos abaixo do limite recomendado, apesar de 18 alarmes em poucas horas","Os três geradores falharam simultaneamente por um defeito de fabrico","Não havia nenhum maquinista a bordo","Erro de navegação"],correct:0,expl:"Um desvio conhecido e tolerado durante semanas, combinado com alarmes tratados como ruído de fundo — o caso de referência do viés de alarme."},
    {q:"O que representa a dívida de sono?",opts:["Um dia de folga obrigatório por semana","A acumulação de fadiga ao longo de vários dias de sono insuficiente","O número de horas trabalhadas","Uma cláusula do contrato de embarque"],correct:1,expl:"A dívida de sono acumula-se progressivamente — 'está tudo bem, dormi 4h' ignora o efeito cumulativo dos dias anteriores."},
    {q:"Segundo esta lição, que fator costuma ser o mais determinante numa avaria maior de maquinaria?",opts:["Uma única falha técnica isolada","A combinação de vários fatores humanos alinhados (fadiga, viés, comunicação)","O mau tempo apenas","Um painel de alarmes fora de serviço"],correct:1,expl:"O modelo de camadas de defesa mostra que é quase sempre o alinhamento de vários fatores humanos, não uma causa única, que leva à avaria."},
  ],
};

// ══════════════════════════════════════
// SAFETY REFLECTION (permanent Safety Dept feature)
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Repense à ton dernier quart machine en mer. Quel facteur humain (fatigue, distraction, confiance excessive dans les alarmes, communication) représentait le plus grand risque, et pourquoi ?",
    en:"Think about your last engine watch at sea. Which human factor (fatigue, distraction, over-reliance on alarms, communication) represented the greatest risk, and why?",
    es:"Piensa en tu última guardia de máquinas en el mar. ¿Qué factor humano (fatiga, distracción, confianza excesiva en las alarmas, comunicación) representó el mayor riesgo, y por qué?",
    pt:"Pensa no teu último quarto de máquinas no mar. Que fator humano (fadiga, distração, confiança excessiva nos alarmes, comunicação) representou o maior risco, e porquê?",
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
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"⚙️ Safety · Engine Room Resource Management · Leçon 1/6 · Free",
      title:"Facteurs Humains dans les Avaries Machine : Pourquoi les Pannes Arrivent Vraiment",
      intro:"Les salles des machines modernes sont équipées de panneaux de surveillance fiables, d'alarmes automatiques, de systèmes de diagnostic. Les procédures de maintenance sont connues de tous les mécaniciens depuis leur formation.\n\nEt pourtant, des salles des machines 'en règle', avec des équipes compétentes, continuent de subir des avaries critiques. Pourquoi ?\n\nCette leçon ne réexplique pas la maintenance technique — elle explique ce qu'aucune procédure ne peut couvrir seule : le facteur humain. C'est le premier pilier de l'Engine Room Resource Management (ERM), l'équivalent en salle des machines du Bridge Resource Management enseigné côté pont — un concept de gestion des ressources d'équipe reconnu dans la formation maritime.",
      p0:"POURQUOI LA SÉCURITÉ CONCERNE LES PERSONNES, PAS LES MACHINES",s0t:"Des équipements fiables, des équipes qui échouent",
      s0:"Un moteur ou un générateur moderne est rarement en cause techniquement dès le départ. La très grande majorité des avaries critiques étudiées par les enquêtes maritimes pointent vers une chaîne de décisions humaines — pas une panne d'équipement isolée et imprévisible.\n\nCOMMENT PRÉVENIR L'AVARIE ? En comprenant que la technologie n'élimine pas le risque humain, elle le déplace.\nQUE FAIRE QUAND LE RISQUE APPARAÎT ? Reconnaître que la cause est probablement humaine avant de blâmer l'équipement.\nQUELLE LEÇON RETENIR ? La vigilance humaine reste la dernière ligne de défense, quelle que soit la technologie à bord.",
      p1:"LE MODÈLE DES COUCHES DE DÉFENSE",s1t:"Une avarie traverse rarement une seule barrière",
      s1:"Une avarie critique n'est presque jamais causée par une seule erreur. Elle est généralement le résultat de plusieurs petites failles qui se produisent en même temps, à différents niveaux : organisation, supervision, conditions du moment, acte individuel.\n\nQuand ces failles s'alignent — comme des trous dans des tranches de gruyère empilées — le danger traverse toutes les défenses et l'avarie se produit.",
      p2:"FATIGUE ET DETTE DE SOMMEIL",s2t:"Le facteur le plus sous-estimé en salle des machines",
      s2:"La fatigue dégrade le temps de réaction et le jugement de façon mesurable — parfois comparable à un taux d'alcoolémie élevé après une nuit blanche.\n\nLa dette de sommeil s'accumule sur plusieurs jours. Penser 'j'ai dormi 4h aujourd'hui donc ça va' ignore que le corps porte encore la fatigue des jours précédents — d'autant plus en salle des machines, où la chaleur et le bruit ajoutent une fatigue physique constante.",
      p3:"ALARM BIAS — LA CONFIANCE AVEUGLE DANS LE PANNEAU",s3t:"Le problème n'est pas l'alarme, c'est la confiance sans vérification",
      s3:"Panneaux de surveillance, capteurs, systèmes de diagnostic sont des outils précieux — mais ce sont des aides à la décision, pas des preuves absolues.\n\nL'alarm bias, c'est traiter une alarme répétée comme un bruit de fond plutôt que comme une information qui s'aggrave. De nombreuses enquêtes maritimes pointent ce biais comme facteur central d'avaries récentes.",
      p4:"COMMUNICATION ET ASSERTIVITÉ",s4t:"Voir la dérive ne suffit pas — il faut le dire clairement",
      s4:"Beaucoup d'avaries surviennent lorsqu'un mécanicien junior voit une dérive... mais n'ose pas la signaler clairement par respect de la hiérarchie.\n\nLa communication en boucle fermée (répéter ce qu'on a compris) et l'assertivité structurée (observation + action proposée) permettent de faire remonter un danger sans rompre le respect hiérarchique.",
      p5:"PRESSION OPÉRATIONNELLE ET CULTURE DE SÉCURITÉ",s5t:"Le contexte qui pousse à ignorer les signaux faibles",
      s5:"La pression des délais d'escale et du planning commercial pousse parfois à minimiser un doute pour ne pas retarder l'opération.\n\nUne culture de sécurité positive valorise le signalement d'une anomalie ou d'un doute plutôt que de le sanctionner — c'est ce climat qui permet de corriger un problème avant qu'il ne devienne une avarie critique.",
      p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"⚠️ CAS RÉEL",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 1",
      sumP:["Une avarie résulte de plusieurs petites failles alignées, rarement d'une seule cause","La fatigue et la dette de sommeil dégradent le jugement de façon mesurable","L'alarm bias = confiance aveugle dans le panneau sans vérification physique","La communication en boucle fermée et l'assertivité préviennent les avaries majeures","La culture de sécurité valorise le signalement plutôt que la sanction"],
      learnedP:["Le modèle des couches de défense (Swiss Cheese)","Fatigue et dette de sommeil","Alarm bias : panneau vs réalité","Communication et assertivité en situation critique","Culture de sécurité et pression opérationnelle"],
      safetyMsg:"Les avaries critiques sont rarement causées par l'absence de procédures. Elles surviennent quand une équipe cesse de les appliquer avec rigueur. Reste vigilant. Reste préparé. Protège l'équipage.",
    },
    en:{
      badge:"⚙️ Safety · Engine Room Resource Management · Lesson 1/6 · Free",
      title:"Human Factors in Machinery Casualties: Why Failures Really Happen",
      intro:"Modern engine rooms are equipped with reliable monitoring panels, automatic alarms, diagnostic systems. Maintenance procedures have been known to every engineer since training.\n\nAnd yet, engine rooms 'in compliance', with competent teams, still suffer critical casualties. Why?\n\nThis lesson does not re-explain technical maintenance — it explains what no procedure alone can cover: the human factor. This is the first pillar of Engine Room Resource Management (ERM), the engine-room equivalent of the Bridge Resource Management taught on the deck side — a recognized team-resource-management concept in maritime training.",
      p0:"WHY SAFETY IS ABOUT PEOPLE, NOT MACHINES",s0t:"Reliable equipment, teams that fail",
      s0:"A modern engine or generator is rarely at fault technically from the start. The vast majority of critical casualties studied by marine accident investigations point to a chain of human decisions — not an isolated, unpredictable equipment failure.\n\nHOW TO PREVENT THE CASUALTY? By understanding that technology does not eliminate human risk, it relocates it.\nWHAT TO DO WHEN THE RISK APPEARS? Recognize that the cause is probably human before blaming the equipment.\nWHAT LESSON TO RETAIN? Human vigilance remains the last line of defense, regardless of the technology on board.",
      p1:"THE SWISS CHEESE DEFENSE MODEL",s1t:"A casualty rarely passes through a single barrier",
      s1:"A critical casualty is rarely caused by a single mistake. It is usually the result of several small failures occurring at the same time, at different levels: organization, supervision, conditions, individual act.\n\nWhen these failures align — like holes in stacked slices of cheese — the danger passes through all the defenses and the casualty occurs.",
      p2:"FATIGUE AND SLEEP DEBT",s2t:"The most underestimated factor in the engine room",
      s2:"Fatigue measurably degrades reaction time and judgment — sometimes comparable to a high blood alcohol level after a sleepless night.\n\nSleep debt accumulates over several days. Thinking 'I slept 4h today so I'm fine' ignores that the body still carries the fatigue from previous days — even more so in the engine room, where heat and noise add constant physical fatigue.",
      p3:"ALARM BIAS — BLIND TRUST IN THE PANEL",s3t:"The problem is not the alarm, it is trust without verification",
      s3:"Monitoring panels, sensors, diagnostic systems are valuable tools — but they are decision-support aids, not absolute proof.\n\nAlarm bias is treating a repeated alarm as background noise rather than as worsening information. Many marine accident investigations point to this bias as a central factor in recent casualties.",
      p4:"COMMUNICATION AND ASSERTIVENESS",s4t:"Seeing the drift is not enough — it must be clearly stated",
      s4:"Many casualties happen when a junior engineer sees a drift... but hesitates to clearly report it out of respect for hierarchy.\n\nClosed-loop communication (repeating back what was understood) and structured assertiveness (observation + proposed action) allow a danger to be raised without breaking hierarchical respect.",
      p5:"OPERATIONAL PRESSURE AND SAFETY CULTURE",s5t:"The context that pushes toward ignoring weak signals",
      s5:"Port-call and commercial schedule pressure sometimes pushes toward minimizing a doubt so as not to delay the operation.\n\nA positive safety culture values reporting an anomaly or a doubt rather than punishing it — this climate allows a problem to be corrected before it becomes a critical casualty.",
      p6:"🎯 OPERATIONAL EXERCISE",p7:"⚠️ REAL CASUALTY CASE",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 1",
      sumP:["A casualty results from several small failures aligning, rarely a single cause","Fatigue and sleep debt measurably degrade judgment","Alarm bias = blind trust in the panel without physical verification","Closed-loop communication and assertiveness prevent major casualties","Safety culture values reporting over punishment"],
      learnedP:["The Swiss Cheese defense-layer model","Fatigue and sleep debt","Alarm bias: panel vs reality","Communication and assertiveness in critical situations","Safety culture and operational pressure"],
      safetyMsg:"Critical casualties are rarely caused by the absence of procedures. They happen when a team stops applying them with rigor. Stay alert. Stay prepared. Protect the crew.",
    },
    es:{
      badge:"⚙️ Seguridad · Engine Room Resource Management · Lección 1/6 · Free",
      title:"Factores Humanos en las Averías de Maquinaria: Por Qué Ocurren Realmente los Fallos",
      intro:"Las salas de máquinas modernas cuentan con paneles de monitoreo fiables, alarmas automáticas, sistemas de diagnóstico. Los procedimientos de mantenimiento los conocen todos los maquinistas desde su formación.\n\nY sin embargo, salas de máquinas 'en regla', con equipos competentes, siguen sufriendo averías críticas. ¿Por qué?\n\nEsta lección no reexplica el mantenimiento técnico — explica lo que ningún procedimiento por sí solo puede cubrir: el factor humano. Es el primer pilar del Engine Room Resource Management (ERM), el equivalente en sala de máquinas del Bridge Resource Management enseñado en el lado de puente — un concepto de gestión de recursos de equipo reconocido en la formación marítima.",
      p0:"POR QUÉ LA SEGURIDAD TRATA DE LAS PERSONAS, NO DE LAS MÁQUINAS",s0t:"Equipos fiables, equipos humanos que fallan",
      s0:"Un motor o un generador moderno rara vez falla técnicamente desde el principio. La gran mayoría de las averías críticas estudiadas por las investigaciones marítimas apuntan a una cadena de decisiones humanas, no a un fallo del equipo aislado e imprevisible.\n\n¿CÓMO PREVENIR LA AVERÍA? Entendiendo que la tecnología no elimina el riesgo humano, lo desplaza.\n¿QUÉ HACER CUANDO APARECE EL RIESGO? Reconocer que la causa es probablemente humana antes de culpar al equipo.\n¿QUÉ LECCIÓN RETENER? La vigilancia humana sigue siendo la última línea de defensa, sea cual sea la tecnología a bordo.",
      p1:"EL MODELO DE CAPAS DE DEFENSA (QUESO SUIZO)",s1t:"Una avería rara vez atraviesa una sola barrera",
      s1:"Una avería crítica rara vez es causada por un único error. Suele ser el resultado de varios pequeños fallos que ocurren al mismo tiempo, en distintos niveles: organización, supervisión, condiciones del momento, acto individual.\n\nCuando estos fallos se alinean — como agujeros en lonchas de queso apiladas — el peligro atraviesa todas las defensas y ocurre la avería.",
      p2:"FATIGA Y DEUDA DE SUEÑO",s2t:"El factor más subestimado en la sala de máquinas",
      s2:"La fatiga degrada de forma medible el tiempo de reacción y el juicio — a veces comparable a un nivel alto de alcohol en sangre tras una noche sin dormir.\n\nLa deuda de sueño se acumula durante varios días. Pensar 'dormí 4h hoy así que estoy bien' ignora que el cuerpo aún carga la fatiga de los días anteriores — más aún en la sala de máquinas, donde el calor y el ruido añaden una fatiga física constante.",
      p3:"SESGO DE ALARMA — CONFIANZA CIEGA EN EL PANEL",s3t:"El problema no es la alarma, es la confianza sin verificación",
      s3:"Paneles de monitoreo, sensores, sistemas de diagnóstico son herramientas valiosas, pero son ayudas a la decisión, no pruebas absolutas.\n\nEl sesgo de alarma es tratar una alarma repetida como ruido de fondo en lugar de como información que empeora. Muchas investigaciones marítimas señalan este sesgo como factor central en averías recientes.",
      p4:"COMUNICACIÓN Y ASERTIVIDAD",s4t:"Ver la deriva no basta — hay que decirlo claramente",
      s4:"Muchas averías ocurren cuando un maquinista junior ve una deriva... pero duda en señalarla claramente por respeto a la jerarquía.\n\nLa comunicación en bucle cerrado y la asertividad estructurada (observación + acción propuesta) permiten plantear un peligro sin romper el respeto jerárquico.",
      p5:"PRESIÓN OPERATIVA Y CULTURA DE SEGURIDAD",s5t:"El contexto que empuja a ignorar señales débiles",
      s5:"La presión de los plazos de escala y del calendario comercial a veces empuja a minimizar una duda para no retrasar la operación.\n\nUna cultura de seguridad positiva valora señalar una anomalía o una duda en lugar de castigarlo — este clima permite corregir un problema antes de que se convierta en una avería crítica.",
      p6:"🎯 EJERCICIO OPERATIVO",p7:"⚠️ CASO REAL",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 1",
      sumP:["Una avería resulta de varios pequeños fallos alineados, rara vez una única causa","La fatiga y la deuda de sueño degradan el juicio de forma medible","Sesgo de alarma = confianza ciega en el panel sin verificación física","La comunicación en bucle cerrado y la asertividad previenen averías importantes","La cultura de seguridad valora señalar en lugar de castigar"],
      learnedP:["El modelo de capas de defensa (queso suizo)","Fatiga y deuda de sueño","Sesgo de alarma: panel vs realidad","Comunicación y asertividad en situaciones críticas","Cultura de seguridad y presión operativa"],
      safetyMsg:"Las averías críticas rara vez son causadas por la ausencia de procedimientos. Ocurren cuando un equipo deja de aplicarlos con rigor. Mantente alerta. Mantente preparado. Protege a la tripulación.",
    },
    pt:{
      badge:"⚙️ Segurança · Engine Room Resource Management · Lição 1/6 · Free",
      title:"Fatores Humanos nas Avarias de Maquinaria: Por Que as Falhas Realmente Acontecem",
      intro:"As casas das máquinas modernas têm painéis de monitorização fiáveis, alarmes automáticos, sistemas de diagnóstico. Os procedimentos de manutenção são conhecidos por todos os maquinistas desde a formação.\n\nE, no entanto, casas das máquinas 'em conformidade', com equipas competentes, continuam a sofrer avarias críticas. Porquê?\n\nEsta lição não reexplica a manutenção técnica — explica o que nenhum procedimento sozinho consegue cobrir: o fator humano. É o primeiro pilar do Engine Room Resource Management (ERM), o equivalente na casa das máquinas do Bridge Resource Management ensinado do lado da ponte — um conceito de gestão de recursos de equipa reconhecido na formação marítima.",
      p0:"POR QUE A SEGURANÇA É SOBRE PESSOAS, NÃO MÁQUINAS",s0t:"Equipamentos fiáveis, equipas que falham",
      s0:"Um motor ou um gerador moderno raramente falha tecnicamente desde o início. A grande maioria das avarias críticas estudadas pelas investigações marítimas aponta para uma cadeia de decisões humanas — não uma falha de equipamento isolada e imprevisível.\n\nCOMO PREVENIR A AVARIA? Entendendo que a tecnologia não elimina o risco humano, apenas o desloca.\nO QUE FAZER QUANDO O RISCO APARECE? Reconhecer que a causa é provavelmente humana antes de culpar o equipamento.\nQUE LIÇÃO RETER? A vigilância humana continua a ser a última linha de defesa, seja qual for a tecnologia a bordo.",
      p1:"O MODELO DE CAMADAS DE DEFESA (QUEIJO SUÍÇO)",s1t:"Uma avaria raramente atravessa uma única barreira",
      s1:"Uma avaria crítica raramente é causada por um único erro. É geralmente o resultado de várias pequenas falhas que ocorrem ao mesmo tempo, em diferentes níveis: organização, supervisão, condições do momento, ato individual.\n\nQuando estas falhas se alinham — como buracos em fatias de queijo empilhadas — o perigo atravessa todas as defesas e a avaria acontece.",
      p2:"FADIGA E DÍVIDA DE SONO",s2t:"O fator mais subestimado na casa das máquinas",
      s2:"A fadiga degrada de forma mensurável o tempo de reação e o julgamento — por vezes comparável a uma taxa elevada de álcool no sangue após uma noite sem dormir.\n\nA dívida de sono acumula-se ao longo de vários dias. Pensar 'dormi 4h hoje, logo está tudo bem' ignora que o corpo ainda carrega a fadiga dos dias anteriores — ainda mais na casa das máquinas, onde o calor e o ruído acrescentam uma fadiga física constante.",
      p3:"VIÉS DE ALARME — CONFIANÇA CEGA NO PAINEL",s3t:"O problema não é o alarme, é a confiança sem verificação",
      s3:"Painéis de monitorização, sensores, sistemas de diagnóstico são ferramentas valiosas — mas são apoios à decisão, não provas absolutas.\n\nO viés de alarme é tratar um alarme repetido como ruído de fundo em vez de informação que piora. Muitas investigações marítimas apontam este viés como fator central em avarias recentes.",
      p4:"COMUNICAÇÃO E ASSERTIVIDADE",s4t:"Ver o desvio não basta — é preciso dizê-lo claramente",
      s4:"Muitas avarias acontecem quando um maquinista júnior vê um desvio... mas hesita em reportá-lo claramente por respeito à hierarquia.\n\nA comunicação em ciclo fechado e a assertividade estruturada (observação + ação proposta) permitem levantar um perigo sem quebrar o respeito hierárquico.",
      p5:"PRESSÃO OPERACIONAL E CULTURA DE SEGURANÇA",s5t:"O contexto que empurra para ignorar sinais fracos",
      s5:"A pressão dos prazos de escala e do calendário comercial por vezes empurra para minimizar uma dúvida para não atrasar a operação.\n\nUma cultura de segurança positiva valoriza reportar uma anomalia ou uma dúvida em vez de a punir — este clima permite corrigir um problema antes que se torne uma avaria crítica.",
      p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"⚠️ CASO REAL",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 1",
      sumP:["Uma avaria resulta de várias pequenas falhas alinhadas, raramente uma única causa","A fadiga e a dívida de sono degradam o julgamento de forma mensurável","Viés de alarme = confiança cega no painel sem verificação física","A comunicação em ciclo fechado e a assertividade previnem avarias importantes","A cultura de segurança valoriza reportar em vez de punir"],
      learnedP:["O modelo de camadas de defesa (queijo suíço)","Fadiga e dívida de sono","Viés de alarme: painel vs realidade","Comunicação e assertividade em situações críticas","Cultura de segurança e pressão operacional"],
      safetyMsg:"As avarias críticas raramente são causadas pela ausência de procedimentos. Acontecem quando uma equipa deixa de os aplicar com rigor. Mantém-te alerta. Mantém-te preparado. Protege a tripulação.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1E_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
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
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📟 {lang==="fr"?"PANNEAU VS RÉALITÉ — INTERACTIF":lang==="en"?"PANEL VS REALITY — INTERACTIVE":lang==="es"?"PANEL VS REALIDAD — INTERACTIVO":"PAINEL VS REALIDADE — INTERATIVO"}</div><AlarmBiasSVG lang={lang}/></Card>

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
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

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
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 1/6":lang==="en"?"questions · Lesson 1/6":lang==="es"?"preguntas · Lección 1/6":"perguntas · Lição 1/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>⚙️</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 2 — COORDINATION D'ÉQUIPE MACHINE →":lang==="en"?"LESSON 2 — ENGINE ROOM TEAM COORDINATION →":lang==="es"?"LECCIÓN 2 — COORDINACIÓN DE EQUIPO DE MÁQUINAS →":"LIÇÃO 2 — COORDENAÇÃO DA EQUIPA DE MÁQUINAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
