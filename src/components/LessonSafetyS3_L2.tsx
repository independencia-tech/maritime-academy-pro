import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - RECOGNIZING CARDIAC ARREST
function RecognizeCardiacArrestSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"👤", label:{fr:"Aucune réponse",en:"Unresponsive",es:"Sin respuesta",pt:"Sem resposta"}, desc:{fr:"Aucune réaction à la voix ni à la douleur, comme vu au niveau U de l'échelle AVPU (Leçon 1).",en:"No reaction to voice or pain, matching the U level of the AVPU scale (Lesson 1).",es:"Ninguna reacción a la voz ni al dolor, como el nivel U de la escala AVPU (Lección 1).",pt:"Nenhuma reação à voz nem à dor, como o nível U da escala AVPU (Lição 1)."} },
    { id:2, icon:"🚫", label:{fr:"Aucune respiration",en:"No breathing at all",es:"Ninguna respiración",pt:"Nenhuma respiração"}, desc:{fr:"Le thorax ne se soulève pas, aucun souffle audible ni senti pendant les 10 secondes de vérification.",en:"The chest does not rise, no breath sound or air felt during the 10-second check.",es:"El pecho no se eleva, no se oye ni se siente aire durante los 10 segundos de comprobación.",pt:"O peito não sobe, nenhum som ou ar sentido durante os 10 segundos de verificação."} },
    { id:3, icon:"⚠️", label:{fr:"Le piège : les gasps agoniques",en:"The trap: agonal gasps",es:"La trampa: los jadeos agónicos",pt:"A armadilha: os suspiros agónicos"}, desc:{fr:"Des inspirations bruyantes, irrégulières et espacées peuvent ressembler à de la respiration. Ce ne sont PAS des signes de respiration normale : elles imposent de commencer la RCP immédiatement, sans attendre.",en:"Noisy, irregular, widely spaced gasps can look like breathing. These are NOT signs of normal breathing: they mean CPR must start immediately, without waiting.",es:"Inspiraciones ruidosas, irregulares y espaciadas pueden parecer respiración. NO son signos de respiración normal: exigen empezar la RCP de inmediato, sin esperar.",pt:"Inspirações ruidosas, irregulares e espaçadas podem parecer respiração. NÃO são sinais de respiração normal: exigem começar a RCP de imediato, sem esperar."} },
    { id:4, icon:"🔵", label:{fr:"Changement de couleur",en:"Color change",es:"Cambio de color",pt:"Mudança de cor"}, desc:{fr:"Lèvres ou visage grisâtres ou bleutés : un signe supplémentaire qui confirme l'urgence, mais qui ne doit jamais retarder le début de la RCP si les deux premiers signes sont déjà présents.",en:"Grayish or bluish lips or face: an additional sign confirming the emergency, but one that must never delay starting CPR once the first two signs are already present.",es:"Labios o rostro grisáceos o azulados: un signo adicional que confirma la urgencia, pero que nunca debe retrasar el inicio de la RCP si ya están presentes los dos primeros signos.",pt:"Lábios ou rosto acinzentados ou azulados: um sinal adicional que confirma a urgência, mas que nunca deve atrasar o início da RCP se os dois primeiros sinais já estiverem presentes."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(192,57,43,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.red:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 2 - CALL FOR HELP THEN START CPR (sequence)
function CallAndStartSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, label:{fr:"Crier pour de l'aide",en:"Shout for help",es:"Gritar pidiendo ayuda",pt:"Gritar por ajuda"}, desc:{fr:"Alerter immédiatement toute personne à proximité, avant tout autre geste.",en:"Immediately alert anyone nearby, before any other action.",es:"Alertar de inmediato a cualquier persona cercana, antes de cualquier otro gesto.",pt:"Alertar de imediato qualquer pessoa próxima, antes de qualquer outro gesto."} },
    { id:2, label:{fr:"Déclencher l'alerte médicale",en:"Trigger the medical alert",es:"Activar la alerta médica",pt:"Acionar o alerta médico"}, desc:{fr:"Faire prévenir la passerelle / le TMAS et demander l'AED sans délai, idéalement pendant qu'une autre personne commence déjà les compressions.",en:"Have the bridge / TMAS notified and ask for the AED without delay, ideally while someone else already starts compressions.",es:"Avisar al puente / TMAS y pedir el DEA sin demora, idealmente mientras otra persona ya empieza las compresiones.",pt:"Avisar a ponte / TMAS e pedir o DAE sem demora, idealmente enquanto outra pessoa já começa as compressões."} },
    { id:3, label:{fr:"Commencer les compressions",en:"Start compressions",es:"Empezar las compresiones",pt:"Começar as compressões"}, desc:{fr:"Ne pas attendre une position parfaite : commencer tout de suite, au centre du thorax, et ajuster en cours de route.",en:"Do not wait for a perfect position: start right away, at the center of the chest, and adjust as you go.",es:"No esperar una posición perfecta: empezar de inmediato, en el centro del pecho, y ajustar sobre la marcha.",pt:"Não esperar por uma posição perfeita: começar de imediato, no centro do peito, e ajustar ao longo do processo."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(230,126,34,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.orange:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:sel===s.id?C.orange:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:C.white,flexShrink:0}}>{s.id}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(230,126,34,0.1)",border:`1px solid ${C.orange}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 3 - COMPRESSION RHYTHM SIMULATOR (metronome + tap-along)
function CompressionRhythmSVG({ lang }) {
  const [taps, setTaps] = useState([]);
  const [bpm, setBpm] = useState(null);
  const [pulseKey, setPulseKey] = useState(0);
  const L = {
    fr:{tap:"TAPER AU RYTHME",reset:"Réinitialiser",instr:"Regarde le point pulser, puis tape le bouton a ce rythme pour t'entrainer.",target:"Cible : 100 a 120 / min",good:"Bon rythme",slow:"Trop lent",fast:"Trop rapide",need:"Tape au moins 3 fois pour mesurer"},
    en:{tap:"TAP THE RHYTHM",reset:"Reset",instr:"Watch the dot pulse, then tap the button at that rhythm to practice.",target:"Target: 100 to 120 / min",good:"Good rhythm",slow:"Too slow",fast:"Too fast",need:"Tap at least 3 times to measure"},
    es:{tap:"TOCA EL RITMO",reset:"Reiniciar",instr:"Observa el punto pulsar, luego toca el boton a ese ritmo para practicar.",target:"Objetivo: 100 a 120 / min",good:"Buen ritmo",slow:"Demasiado lento",fast:"Demasiado rapido",need:"Toca al menos 3 veces para medir"},
    pt:{tap:"TOCA NO RITMO",reset:"Reiniciar",instr:"Observa o ponto a pulsar, depois toca no botao nesse ritmo para praticar.",target:"Alvo: 100 a 120 / min",good:"Bom ritmo",slow:"Demasiado lento",fast:"Demasiado rapido",need:"Toca pelo menos 3 vezes para medir"},
  };
  const l = L[lang]||L.fr;
  const handleTap = () => {
    const now = Date.now();
    setPulseKey(k=>k+1);
    setTaps(prev => {
      const updated = [...prev, now].slice(-6);
      if (updated.length >= 2) {
        const intervals = [];
        for (let i=1;i<updated.length;i++) intervals.push(updated[i]-updated[i-1]);
        const avg = intervals.reduce((a,b)=>a+b,0)/intervals.length;
        setBpm(Math.round(60000/avg));
      }
      return updated;
    });
  };
  const zone = bpm===null?null: bpm>=100&&bpm<=120?"good":bpm<100?"slow":"fast";
  const zoneColor = zone==="good"?C.green:zone==="slow"?C.blue2:zone==="fast"?C.red:C.muted;
  const zoneLabel = zone==="good"?l.good:zone==="slow"?l.slow:zone==="fast"?l.fast:l.need;
  return (
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:11,color:C.muted,marginBottom:12,lineHeight:1.6}}>{l.instr}</div>
      <div key={pulseKey} style={{width:18,height:18,borderRadius:"50%",background:C.blue2,margin:"0 auto 14px",animation:"tapPulse 0.35s ease-out"}}/>
      <button onClick={handleTap} style={{width:110,height:110,borderRadius:"50%",border:`2px solid ${C.blue2}`,background:"rgba(77,166,255,0.12)",color:C.white,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:1,cursor:"pointer",marginBottom:14}}>{l.tap}</button>
      <div style={{fontSize:11,color:C.muted,marginBottom:6}}>{l.target}</div>
      <div style={{fontSize:20,fontWeight:900,color:zoneColor,marginBottom:4}}>{bpm!==null?`${bpm} bpm`:"--"}</div>
      <div style={{fontSize:12,fontWeight:700,color:zoneColor,marginBottom:10}}>{zoneLabel}</div>
      <button onClick={()=>{setTaps([]);setBpm(null);}} style={{padding:"7px 16px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.15)",color:C.muted,fontSize:11,cursor:"pointer"}}>{l.reset}</button>
      <style>{`@keyframes tapPulse{0%{transform:scale(1);opacity:1}100%{transform:scale(2.4);opacity:0}}`}</style>
    </div>
  );
}

// SVG 4 - AED STEPS
function AEDStepsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"🔌", label:{fr:"Allumer l'appareil",en:"Turn it on",es:"Encender el aparato",pt:"Ligar o aparelho"}, desc:{fr:"Ouvrir le boitier et appuyer sur le bouton marche : l'appareil guide ensuite chaque étape a voix haute.",en:"Open the case and press the power button: the device then guides every step out loud.",es:"Abrir la caja y pulsar el boton de encendido: el aparato guia luego cada paso en voz alta.",pt:"Abrir a caixa e premir o botao de ligar: o aparelho guia depois cada passo em voz alta."} },
    { id:2, icon:"🩹", label:{fr:"Coller les électrodes",en:"Attach the pads",es:"Pegar los electrodos",pt:"Colar os elétrodos"}, desc:{fr:"Suivre les images sur les électrodes, sur peau nue et sèche, sans interrompre les compressions plus que nécessaire.",en:"Follow the pictures on the pads, on bare dry skin, without interrupting compressions longer than necessary.",es:"Seguir las imagenes de los electrodos, sobre piel desnuda y seca, sin interrumpir las compresiones mas de lo necesario.",pt:"Seguir as imagens dos eletrodos, sobre pele nua e seca, sem interromper as compressoes mais do que o necessario."} },
    { id:3, icon:"🙅", label:{fr:"Ne toucher personne pendant l'analyse",en:"Stand clear during analysis",es:"No tocar a nadie durante el analisis",pt:"Nao tocar em ninguem durante a analise"}, desc:{fr:"L'appareil demande de s'écarter : personne ne doit toucher la victime pendant l'analyse du rythme ni pendant le choc.",en:"The device asks everyone to stand clear: no one should touch the casualty during rhythm analysis or during the shock.",es:"El aparato pide apartarse: nadie debe tocar a la victima durante el analisis del ritmo ni durante la descarga.",pt:"O aparelho pede para se afastarem: ninguem deve tocar na vitima durante a analise do ritmo nem durante o choque."} },
    { id:4, icon:"▶️", label:{fr:"Reprendre la RCP immédiatement",en:"Resume CPR immediately",es:"Reanudar la RCP de inmediato",pt:"Retomar a RCP de imediato"}, desc:{fr:"Choc délivré ou non conseillé : les compressions reprennent tout de suite, sans vérifier le pouls, en suivant les instructions de l'appareil.",en:"Shock delivered or not advised: compressions resume right away, without checking the pulse, following the device's instructions.",es:"Descarga administrada o no aconsejada: las compresiones se reanudan de inmediato, sin comprobar el pulso, siguiendo las instrucciones del aparato.",pt:"Choque administrado ou nao aconselhado: as compressoes retomam de imediato, sem verificar o pulso, seguindo as instrucoes do aparelho."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(77,166,255,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.blue2:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{s.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(77,166,255,0.1)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// EXERCISE - CPR/AED DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"c",q3:"a",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Une victime inconsciente émet des sons rauques et irréguliers, espacés de plusieurs secondes. Que faites-vous ?\na) Attendre de voir si ça s'améliore\nb) Considérer que ce ne sont pas des signes de respiration normale et commencer la RCP\nc) Lui donner à boire"},
      {id:"q2",q:"L'AED vient d'arriver. Que faites-vous en priorité ?\na) Arrêter les compressions pour vérifier le pouls d'abord\nb) Attendre l'arrivée d'un médecin avant de l'utiliser\nc) L'allumer immédiatement et suivre ses instructions sans arrêter les compressions plus que nécessaire"},
      {id:"q3",q:"L'AED annonce 'Choc délivré'. Que faites-vous immédiatement après ?\na) Reprendre les compressions tout de suite, sans vérifier le pouls\nb) Vérifier le pouls pendant une minute avant de reprendre\nc) Arrêter toute intervention, le choc a réglé le problème"},
      {id:"q4",q:"Vous faites les compressions seul depuis 2 minutes. Un collègue est disponible. Que faites-vous ?\na) Continuer seul jusqu'à épuisement complet\nb) Faire une rotation rapide avec le collègue pour maintenir la qualité des compressions\nc) Arrêter les compressions le temps de se reposer"},
    ],
    en:[
      {id:"q1",q:"An unconscious casualty makes rough, irregular sounds, several seconds apart. What do you do?\na) Wait to see if it improves\nb) Consider these are not signs of normal breathing and start CPR\nc) Give them something to drink"},
      {id:"q2",q:"The AED has just arrived. What is your priority action?\na) Stop compressions to check the pulse first\nb) Wait for a doctor to arrive before using it\nc) Turn it on immediately and follow its instructions without stopping compressions longer than necessary"},
      {id:"q3",q:"The AED announces 'Shock delivered'. What do you do immediately after?\na) Resume compressions right away, without checking the pulse\nb) Check the pulse for a full minute before resuming\nc) Stop all intervention, the shock has fixed the problem"},
      {id:"q4",q:"You have been doing compressions alone for 2 minutes. A colleague is available. What do you do?\na) Continue alone until fully exhausted\nb) Rotate quickly with the colleague to maintain compression quality\nc) Stop compressions to rest for a moment"},
    ],
    es:[
      {id:"q1",q:"Una víctima inconsciente hace sonidos roncos e irregulares, separados varios segundos. ¿Qué haces?\na) Esperar a ver si mejora\nb) Considerar que no son signos de respiración normal y empezar la RCP\nc) Darle de beber"},
      {id:"q2",q:"El DEA acaba de llegar. ¿Cuál es tu acción prioritaria?\na) Detener las compresiones para comprobar el pulso primero\nb) Esperar a que llegue un médico antes de usarlo\nc) Encenderlo de inmediato y seguir sus instrucciones sin detener las compresiones más de lo necesario"},
      {id:"q3",q:"El DEA anuncia 'Descarga administrada'. ¿Qué haces inmediatamente después?\na) Reanudar las compresiones de inmediato, sin comprobar el pulso\nb) Comprobar el pulso durante un minuto entero antes de reanudar\nc) Detener toda intervención, la descarga ha resuelto el problema"},
      {id:"q4",q:"Llevas 2 minutos haciendo las compresiones solo. Un compañero está disponible. ¿Qué haces?\na) Continuar solo hasta el agotamiento total\nb) Rotar rápidamente con el compañero para mantener la calidad de las compresiones\nc) Detener las compresiones un momento para descansar"},
    ],
    pt:[
      {id:"q1",q:"Uma vítima inconsciente emite sons roucos e irregulares, espaçados vários segundos. O que fazes?\na) Esperar para ver se melhora\nb) Considerar que não são sinais de respiração normal e começar a RCP\nc) Dar-lhe algo para beber"},
      {id:"q2",q:"O DAE acabou de chegar. Qual é a tua ação prioritária?\na) Parar as compressões para verificar o pulso primeiro\nb) Esperar que chegue um médico antes de o usar\nc) Ligá-lo de imediato e seguir as instruções sem parar as compressões mais do que o necessário"},
      {id:"q3",q:"O DAE anuncia 'Choque administrado'. O que fazes imediatamente a seguir?\na) Retomar as compressões de imediato, sem verificar o pulso\nb) Verificar o pulso durante um minuto inteiro antes de retomar\nc) Parar toda a intervenção, o choque resolveu o problema"},
      {id:"q4",q:"Estás a fazer as compressões sozinho há 2 minutos. Um colega está disponível. O que fazes?\na) Continuar sozinho até à exaustão total\nb) Rodar rapidamente com o colega para manter a qualidade das compressões\nc) Parar as compressões um momento para descansar"},
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
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ -> ${correct[q.id]}`}</div>}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ACCIDENT CASE - COMPOSITE CASE (THE FISHERMAN)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Le Pêcheur Inconscient",teaser:"Cas composite basé sur des schémas récurrents en mer - des secondes perdues qui comptent",
      what:"Un pêcheur est retrouvé inconscient sur le pont, faisant entendre des inspirations rauques et espacées. L'équipage hésite : 'il respire encore un peu, non ?'. Cette hésitation retarde le début des compressions de plusieurs minutes précieuses. Quand l'AED arrive enfin, un membre d'équipage veut d'abord vérifier le pouls manuellement avant de l'allumer, retardant encore l'analyse. Aucune rotation n'est organisée : la même personne effectue les compressions pendant plus de huit minutes, sans que personne ne remarque que leur profondeur a nettement diminué avec la fatigue.",
      cause:"• Gasps agoniques confondus avec une respiration normale, retardant le début de la RCP\n• Hésitation à allumer l'AED par crainte de mal faire, alors qu'il doit être utilisé sans délai\n• Aucune rotation organisée malgré un collègue disponible : la qualité des compressions a chuté sans que le sauveteur s'en aperçoive\n• Chaque minute perdue a réduit les chances de survie, conformément au principe Time is Muscle",
      lessons:"✓ Des gasps bruyants et espacés ne sont jamais un signe de respiration normale : ils imposent de commencer la RCP immédiatement\n✓ L'AED complète la RCP, il ne la remplace jamais - il doit être allumé sans délai, la vérification du pouls ne doit jamais retarder son utilisation\n✓ La qualité des compressions chute après quelques minutes sans que le sauveteur s'en rende compte : la rotation toutes les 2 minutes n'est pas optionnelle\n✓ CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives",
      link:"🔗 Ce cas illustre directement les concepts Time is Muscle et AED complète la RCP, jamais elle ne la remplace, introduits dans cette leçon."},
    en:{title:"Case Study - The Unconscious Fisherman",teaser:"Composite case based on recurring patterns at sea - seconds lost that matter",
      what:"A fisherman is found unconscious on deck, making rough, widely spaced gasping sounds. The crew hesitates: 'he's still breathing a little, right?'. This hesitation delays the start of compressions by several precious minutes. When the AED finally arrives, a crew member wants to check the pulse manually first before turning it on, delaying the analysis further. No rotation is organized: the same person performs compressions for over eight minutes, with no one noticing their depth has clearly dropped with fatigue.",
      cause:"• Agonal gasps mistaken for normal breathing, delaying the start of CPR\n• Hesitation to turn on the AED for fear of doing it wrong, when it must be used without delay\n• No rotation organized despite an available colleague: compression quality dropped without the rescuer noticing\n• Every minute lost reduced the chances of survival, consistent with the Time is Muscle principle",
      lessons:"✓ Loud, widely spaced gasps are never a sign of normal breathing: they mean CPR must start immediately\n✓ The AED complements CPR, it never replaces it - it must be turned on without delay, checking the pulse must never delay its use\n✓ Compression quality drops after a few minutes without the rescuer noticing: rotating every 2 minutes is not optional\n✓ CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives",
      link:"🔗 This case directly illustrates the Time is Muscle concept and the AED complements CPR, never replaces it principle introduced in this lesson."},
    es:{title:"Caso de estudio - El Pescador Inconsciente",teaser:"Caso compuesto basado en patrones recurrentes en el mar - segundos perdidos que cuentan",
      what:"Un pescador es encontrado inconsciente en cubierta, emitiendo sonidos roncos y muy espaciados. La tripulación duda: '¿todavía respira un poco, no?'. Esta duda retrasa el inicio de las compresiones varios minutos preciosos. Cuando el DEA por fin llega, un tripulante quiere comprobar el pulso manualmente antes de encenderlo, retrasando aún más el análisis. No se organiza ninguna rotación: la misma persona realiza las compresiones durante más de ocho minutos, sin que nadie note que su profundidad ha bajado claramente con el cansancio.",
      cause:"• Jadeos agónicos confundidos con respiración normal, retrasando el inicio de la RCP\n• Duda en encender el DEA por miedo a hacerlo mal, cuando debe usarse sin demora\n• Ninguna rotación organizada pese a un compañero disponible: la calidad de las compresiones bajó sin que el socorrista lo notara\n• Cada minuto perdido redujo las posibilidades de supervivencia, conforme al principio Time is Muscle",
      lessons:"✓ Jadeos ruidosos y espaciados nunca son un signo de respiración normal: exigen empezar la RCP de inmediato\n✓ El DEA complementa la RCP, nunca la sustituye - debe encenderse sin demora, comprobar el pulso nunca debe retrasar su uso\n✓ La calidad de las compresiones baja tras unos minutos sin que el socorrista lo note: rotar cada 2 minutos no es opcional\n✓ CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives",
      link:"🔗 Este caso ilustra directamente los conceptos Time is Muscle y el DEA complementa la RCP, nunca la sustituye, presentados en esta lección."},
    pt:{title:"Caso de estudo - O Pescador Inconsciente",teaser:"Caso composto baseado em padrões recorrentes no mar - segundos perdidos que contam",
      what:"Um pescador é encontrado inconsciente no convés, emitindo sons roucos e muito espaçados. A tripulação hesita: 'ainda respira um pouco, não é?'. Esta hesitação atrasa o início das compressões vários minutos preciosos. Quando o DAE finalmente chega, um tripulante quer verificar o pulso manualmente antes de o ligar, atrasando ainda mais a análise. Nenhuma rotação é organizada: a mesma pessoa realiza as compressões durante mais de oito minutos, sem que ninguém note que a profundidade baixou claramente com o cansaço.",
      cause:"• Suspiros agónicos confundidos com respiração normal, atrasando o início da RCP\n• Hesitação em ligar o DAE por medo de errar, quando deve ser usado sem demora\n• Nenhuma rotação organizada apesar de um colega disponível: a qualidade das compressões baixou sem que o socorrista notasse\n• Cada minuto perdido reduziu as chances de sobrevivência, conforme o princípio Time is Muscle",
      lessons:"✓ Suspiros ruidosos e espaçados nunca são um sinal de respiração normal: exigem começar a RCP de imediato\n✓ O DAE complementa a RCP, nunca a substitui - deve ser ligado sem demora, verificar o pulso nunca deve atrasar o seu uso\n✓ A qualidade das compressões baixa após alguns minutos sem que o socorrista note: rodar a cada 2 minutos não é opcional\n✓ CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives",
      link:"🔗 Este caso ilustra diretamente os conceitos Time is Muscle e o DAE complementa a RCP, nunca a substitui, apresentados nesta lição."},
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

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Pourquoi dit-on que 'chaque minute compte' en cas d'arrêt cardiaque ?",opts:["Ça ne compte pas vraiment","Les chances de survie diminuent rapidement à chaque minute sans RCP ni défibrillation","C'est juste une expression sans fondement","Seule la première heure compte"],correct:1,expl:"Time is Muscle : les chances de survie chutent vite avec chaque minute sans compressions ni choc."},
    {q:"Une victime inconsciente émet des inspirations bruyantes, irrégulières et espacées. Que représentent-elles ?",opts:["Une respiration normale, tout va bien","Des gasps agoniques : ce ne sont pas des signes de respiration normale","Un ronflement sans gravité","Un signe que la victime va se réveiller"],correct:1,expl:"Les gasps agoniques imitent la respiration mais imposent de commencer la RCP immédiatement, sans attendre."},
    {q:"Quelle est la toute première action face à une suspicion d'arrêt cardiaque ?",opts:["Chercher le pouls pendant une minute","Crier pour de l'aide et déclencher l'alerte médicale","Donner à boire à la victime","Attendre l'arrivée d'un médecin"],correct:1,expl:"Alerter immédiatement permet de mobiliser l'AED et l'aide médicale pendant que les compressions commencent."},
    {q:"Faut-il attendre une position parfaite des mains avant de commencer les compressions ?",opts:["Oui, sinon ça ne sert à rien","Non, il faut commencer tout de suite au centre du thorax et ajuster en cours de route","Oui, il faut d'abord consulter un manuel","Non, la position n'a aucune importance"],correct:1,expl:"Commencer vite prime sur la perfection immédiate ; la position s'ajuste en cours de compressions."},
    {q:"Quel est le rythme cible des compressions thoraciques ?",opts:["60 à 80 par minute","100 à 120 par minute","150 à 180 par minute","Il n'y a pas de rythme cible"],correct:1,expl:"Les recommandations internationales actuelles fixent la cible à 100-120 compressions par minute."},
    {q:"Quelle est la profondeur recommandée des compressions chez l'adulte ?",opts:["1 à 2 cm","Environ 5 à 6 cm","10 cm minimum","La profondeur n'est jamais précisée"],correct:1,expl:"Une profondeur de 5 à 6 cm est recommandée chez l'adulte, sans dépasser cette limite."},
    {q:"L'AED complète-t-il la RCP ou la remplace-t-il ?",opts:["Il la remplace entièrement une fois allumé","Il la complète : la RCP continue autour de son utilisation","Il ne sert à rien si la RCP est bien faite","Il faut choisir entre les deux, jamais les deux ensemble"],correct:1,expl:"L'AED est un complément essentiel de la RCP, jamais un substitut : les deux fonctionnent ensemble."},
    {q:"Quand faut-il allumer l'AED dès qu'il est disponible ?",opts:["Seulement après validation d'un médecin à distance","Sans délai, en suivant simplement ses instructions vocales","Seulement si on est certain à 100% du diagnostic","Après avoir vérifié le pouls pendant une minute"],correct:1,expl:"L'AED est conçu pour guider le sauveteur ; il doit être allumé sans délai dès qu'il est disponible."},
    {q:"Que faire immédiatement après un choc délivré par l'AED ?",opts:["Vérifier le pouls avant toute chose","Reprendre les compressions tout de suite, sans vérifier le pouls","Arrêter toute intervention, le choc suffit","Attendre les instructions d'un médecin avant de continuer"],correct:1,expl:"Les recommandations actuelles imposent une reprise immédiate des compressions après le choc, sans délai de vérification du pouls."},
    {q:"Pourquoi faut-il faire une rotation des sauveteurs toutes les 2 minutes environ ?",opts:["Ce n'est pas nécessaire si le sauveteur se sent bien","La qualité des compressions chute avec la fatigue, souvent sans que le sauveteur s'en rende compte","Uniquement pour respecter une règle administrative","Seulement si plus de 3 personnes sont disponibles"],correct:1,expl:"La fatigue dégrade la profondeur et le rythme des compressions de façon souvent imperceptible pour le sauveteur lui-même."},
    {q:"Dans le cas d'étude du Pêcheur Inconscient, qu'est-ce qui a retardé le début de la RCP ?",opts:["Le manque d'AED à bord","La confusion entre gasps agoniques et respiration normale","Un problème de communication radio","La météo"],correct:1,expl:"L'équipage a hésité en pensant que la victime respirait encore, alors qu'il s'agissait de gasps agoniques."},
    {q:"Dans le même cas, quelle erreur a retardé l'utilisation de l'AED ?",opts:["L'appareil était en panne","Vouloir vérifier le pouls manuellement avant de l'allumer","L'appareil n'était pas chargé","Personne ne savait où il se trouvait"],correct:1,expl:"Vouloir vérifier le pouls avant d'allumer l'AED a fait perdre un temps précieux, alors qu'il doit être utilisé sans délai."},
    {q:"Que garantit réellement la RCP, selon le message de sécurité de cette leçon ?",opts:["Elle garantit la survie de la victime dans tous les cas","Elle garantit que la victime reçoit toutes ses chances jusqu'à la prise en charge médicale professionnelle","Elle ne garantit rien du tout","Elle remplace entièrement l'intervention médicale"],correct:1,expl:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives."},
    {q:"Que signifie un pouls absent après 10 secondes de vérification, selon les recommandations actuelles ?",opts:["Il faut attendre encore une minute avant d'agir","Les compressions thoraciques doivent continuer immédiatement","Il faut arrêter toute intervention","Il faut d'abord vérifier la respiration à nouveau"],correct:1,expl:"L'absence de pouls dans la fenêtre de 10 secondes impose la poursuite immédiate des compressions de haute qualité."},
    {q:"Ce module de secourisme STCW remplace-t-il une formation RCP certifiée en présentiel ?",opts:["Oui, il est équivalent à une certification pratique","Non, il enseigne uniquement les principes et la stabilisation initiale, jamais un remplacement de formation pratique certifiée","Oui, mais seulement pour les officiers","Non, il ne sert à rien sans formation pratique"],correct:1,expl:"MAP enseigne les principes et la préparation mentale, mais ne remplace jamais une formation RCP pratique certifiée."},
  ],
  en:[
    {q:"Why is it said that 'every minute counts' in cardiac arrest?",opts:["It doesn't really count","Survival chances drop quickly with every minute without CPR or defibrillation","It's just an expression with no real basis","Only the first hour matters"],correct:1,expl:"Time is Muscle: survival chances fall fast with every minute without compressions or a shock."},
    {q:"An unconscious casualty makes loud, irregular, widely spaced gasps. What do these represent?",opts:["Normal breathing, everything is fine","Agonal gasps: these are not signs of normal breathing","Harmless snoring","A sign the casualty will wake up soon"],correct:1,expl:"Agonal gasps mimic breathing but require starting CPR immediately, without waiting."},
    {q:"What is the very first action facing a suspected cardiac arrest?",opts:["Check the pulse for a full minute","Shout for help and trigger the medical alert","Give the casualty something to drink","Wait for a doctor to arrive"],correct:1,expl:"Alerting immediately mobilizes the AED and medical help while compressions start."},
    {q:"Must you wait for a perfect hand position before starting compressions?",opts:["Yes, otherwise it's useless","No, start right away at the center of the chest and adjust as you go","Yes, you must first consult a manual","No, position has no importance at all"],correct:1,expl:"Starting fast takes priority over immediate perfection; position adjusts as compressions continue."},
    {q:"What is the target rate for chest compressions?",opts:["60 to 80 per minute","100 to 120 per minute","150 to 180 per minute","There is no target rate"],correct:1,expl:"Current international recommendations set the target at 100-120 compressions per minute."},
    {q:"What is the recommended compression depth for adults?",opts:["1 to 2 cm","About 5 to 6 cm","10 cm minimum","Depth is never specified"],correct:1,expl:"A depth of 5 to 6 cm is recommended for adults, without exceeding this limit."},
    {q:"Does the AED complement CPR or replace it?",opts:["It replaces it entirely once turned on","It complements it: CPR continues around its use","It's useless if CPR is done well","You must choose between the two, never both together"],correct:1,expl:"The AED is an essential complement to CPR, never a substitute: both work together."},
    {q:"When should the AED be turned on once available?",opts:["Only after remote validation by a doctor","Without delay, simply following its voice instructions","Only if 100% certain of the diagnosis","After checking the pulse for a full minute"],correct:1,expl:"The AED is designed to guide the rescuer; it must be turned on without delay once available."},
    {q:"What should be done immediately after a shock delivered by the AED?",opts:["Check the pulse before anything else","Resume compressions right away, without checking the pulse","Stop all intervention, the shock is enough","Wait for a doctor's instructions before continuing"],correct:1,expl:"Current guidelines require immediate resumption of compressions after the shock, without a pulse-check delay."},
    {q:"Why should rescuers rotate roughly every 2 minutes?",opts:["It's not necessary if the rescuer feels fine","Compression quality drops with fatigue, often without the rescuer noticing","Only to follow an administrative rule","Only if more than 3 people are available"],correct:1,expl:"Fatigue degrades compression depth and rate in a way that is often imperceptible to the rescuer themselves."},
    {q:"In the Unconscious Fisherman case study, what delayed the start of CPR?",opts:["The lack of an AED on board","Confusing agonal gasps with normal breathing","A radio communication issue","The weather"],correct:1,expl:"The crew hesitated, thinking the casualty was still breathing, when it was actually agonal gasps."},
    {q:"In the same case, what mistake delayed AED use?",opts:["The device was broken","Wanting to check the pulse manually before turning it on","The device was not charged","No one knew where it was"],correct:1,expl:"Wanting to check the pulse before turning on the AED wasted precious time, when it must be used without delay."},
    {q:"What does CPR actually guarantee, according to this lesson's safety message?",opts:["It guarantees the casualty's survival in all cases","It guarantees the casualty is given every possible chance until professional medical care arrives","It guarantees nothing at all","It entirely replaces medical intervention"],correct:1,expl:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives."},
    {q:"What does an absent pulse after a 10-second check mean, according to current guidelines?",opts:["Wait another minute before acting","Chest compressions must continue immediately","All intervention must stop","Breathing must be checked again first"],correct:1,expl:"An absent pulse within the 10-second window requires immediate continuation of high-quality compressions."},
    {q:"Does this STCW first aid module replace a certified in-person CPR course?",opts:["Yes, it is equivalent to a practical certification","No, it teaches principles and initial stabilization only, never a replacement for certified practical training","Yes, but only for officers","No, it is useless without practical training"],correct:1,expl:"MAP teaches principles and mental preparation but never replaces certified practical CPR training."},
  ],
  es:[
    {q:"¿Por qué se dice que 'cada minuto cuenta' en un paro cardíaco?",opts:["En realidad no cuenta","Las posibilidades de supervivencia bajan rápido con cada minuto sin RCP ni desfibrilación","Es solo una expresión sin fundamento","Solo cuenta la primera hora"],correct:1,expl:"Time is Muscle: las posibilidades de supervivencia caen rápido con cada minuto sin compresiones ni descarga."},
    {q:"Una víctima inconsciente hace inspiraciones ruidosas, irregulares y espaciadas. ¿Qué representan?",opts:["Respiración normal, todo va bien","Jadeos agónicos: no son signos de respiración normal","Un ronquido sin gravedad","Un signo de que la víctima despertará pronto"],correct:1,expl:"Los jadeos agónicos imitan la respiración pero exigen empezar la RCP de inmediato, sin esperar."},
    {q:"¿Cuál es la primerísima acción ante una sospecha de paro cardíaco?",opts:["Comprobar el pulso durante un minuto entero","Gritar pidiendo ayuda y activar la alerta médica","Darle de beber a la víctima","Esperar a que llegue un médico"],correct:1,expl:"Alertar de inmediato moviliza el DEA y la ayuda médica mientras empiezan las compresiones."},
    {q:"¿Hay que esperar una posición perfecta de las manos antes de empezar las compresiones?",opts:["Sí, si no, no sirve de nada","No, hay que empezar de inmediato en el centro del pecho y ajustar sobre la marcha","Sí, primero hay que consultar un manual","No, la posición no tiene ninguna importancia"],correct:1,expl:"Empezar rápido prima sobre la perfección inmediata; la posición se ajusta durante las compresiones."},
    {q:"¿Cuál es el ritmo objetivo de las compresiones torácicas?",opts:["60 a 80 por minuto","100 a 120 por minuto","150 a 180 por minuto","No hay ritmo objetivo"],correct:1,expl:"Las recomendaciones internacionales actuales fijan el objetivo en 100-120 compresiones por minuto."},
    {q:"¿Cuál es la profundidad recomendada de las compresiones en el adulto?",opts:["1 a 2 cm","Unos 5 a 6 cm","10 cm como mínimo","La profundidad nunca se especifica"],correct:1,expl:"Se recomienda una profundidad de 5 a 6 cm en el adulto, sin superar este límite."},
    {q:"¿El DEA complementa la RCP o la sustituye?",opts:["La sustituye por completo una vez encendido","La complementa: la RCP continúa alrededor de su uso","No sirve de nada si la RCP está bien hecha","Hay que elegir entre las dos, nunca juntas"],correct:1,expl:"El DEA es un complemento esencial de la RCP, nunca un sustituto: ambos funcionan juntos."},
    {q:"¿Cuándo hay que encender el DEA en cuanto esté disponible?",opts:["Solo tras validación de un médico a distancia","Sin demora, simplemente siguiendo sus instrucciones de voz","Solo si se está 100% seguro del diagnóstico","Después de comprobar el pulso durante un minuto entero"],correct:1,expl:"El DEA está diseñado para guiar al socorrista; debe encenderse sin demora en cuanto esté disponible."},
    {q:"¿Qué hacer inmediatamente después de una descarga administrada por el DEA?",opts:["Comprobar el pulso antes que nada","Reanudar las compresiones de inmediato, sin comprobar el pulso","Detener toda intervención, la descarga basta","Esperar instrucciones de un médico antes de continuar"],correct:1,expl:"Las recomendaciones actuales exigen reanudar de inmediato las compresiones tras la descarga, sin demora de comprobación del pulso."},
    {q:"¿Por qué hay que rotar a los socorristas aproximadamente cada 2 minutos?",opts:["No es necesario si el socorrista se siente bien","La calidad de las compresiones baja con el cansancio, a menudo sin que el socorrista lo note","Solo para cumplir una regla administrativa","Solo si hay más de 3 personas disponibles"],correct:1,expl:"El cansancio degrada la profundidad y el ritmo de las compresiones de forma a menudo imperceptible para el propio socorrista."},
    {q:"En el caso de estudio del Pescador Inconsciente, ¿qué retrasó el inicio de la RCP?",opts:["La falta de un DEA a bordo","Confundir jadeos agónicos con respiración normal","Un problema de comunicación por radio","El clima"],correct:1,expl:"La tripulación dudó pensando que la víctima aún respiraba, cuando en realidad eran jadeos agónicos."},
    {q:"En el mismo caso, ¿qué error retrasó el uso del DEA?",opts:["El aparato estaba averiado","Querer comprobar el pulso manualmente antes de encenderlo","El aparato no estaba cargado","Nadie sabía dónde estaba"],correct:1,expl:"Querer comprobar el pulso antes de encender el DEA hizo perder tiempo precioso, cuando debe usarse sin demora."},
    {q:"¿Qué garantiza realmente la RCP, según el mensaje de seguridad de esta lección?",opts:["Garantiza la supervivencia de la víctima en todos los casos","Garantiza que la víctima recibe todas sus oportunidades hasta la atención médica profesional","No garantiza nada en absoluto","Sustituye por completo la intervención médica"],correct:1,expl:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives."},
    {q:"¿Qué significa un pulso ausente tras 10 segundos de comprobación, según las recomendaciones actuales?",opts:["Hay que esperar otro minuto antes de actuar","Las compresiones torácicas deben continuar de inmediato","Hay que detener toda intervención","Hay que comprobar de nuevo la respiración primero"],correct:1,expl:"La ausencia de pulso en la ventana de 10 segundos exige continuar de inmediato con compresiones de alta calidad."},
    {q:"¿Este módulo de primeros auxilios STCW sustituye a una formación de RCP certificada presencial?",opts:["Sí, equivale a una certificación práctica","No, enseña únicamente los principios y la estabilización inicial, nunca sustituye a una formación práctica certificada","Sí, pero solo para los oficiales","No, no sirve de nada sin formación práctica"],correct:1,expl:"MAP enseña los principios y la preparación mental, pero nunca sustituye a una formación práctica de RCP certificada."},
  ],
  pt:[
    {q:"Por que se diz que 'cada minuto conta' numa paragem cardíaca?",opts:["Na verdade não conta","As chances de sobrevivência baixam rápido a cada minuto sem RCP nem desfibrilhação","É só uma expressão sem fundamento","Só conta a primeira hora"],correct:1,expl:"Time is Muscle: as chances de sobrevivência caem rápido a cada minuto sem compressões nem choque."},
    {q:"Uma vítima inconsciente faz inspirações ruidosas, irregulares e espaçadas. O que representam?",opts:["Respiração normal, está tudo bem","Suspiros agónicos: não são sinais de respiração normal","Um ressonar sem gravidade","Um sinal de que a vítima vai acordar em breve"],correct:1,expl:"Os suspiros agónicos imitam a respiração mas exigem começar a RCP de imediato, sem esperar."},
    {q:"Qual é a primeiríssima ação perante uma suspeita de paragem cardíaca?",opts:["Verificar o pulso durante um minuto inteiro","Gritar por ajuda e acionar o alerta médico","Dar-lhe algo para beber","Esperar que chegue um médico"],correct:1,expl:"Alertar de imediato mobiliza o DAE e a ajuda médica enquanto começam as compressões."},
    {q:"É preciso esperar por uma posição perfeita das mãos antes de começar as compressões?",opts:["Sim, senão não serve de nada","Não, deve-se começar de imediato no centro do peito e ajustar ao longo do processo","Sim, primeiro é preciso consultar um manual","Não, a posição não tem qualquer importância"],correct:1,expl:"Começar depressa tem prioridade sobre a perfeição imediata; a posição ajusta-se ao longo das compressões."},
    {q:"Qual é o ritmo alvo das compressões torácicas?",opts:["60 a 80 por minuto","100 a 120 por minuto","150 a 180 por minuto","Não há ritmo alvo"],correct:1,expl:"As recomendações internacionais atuais fixam o alvo em 100-120 compressões por minuto."},
    {q:"Qual é a profundidade recomendada das compressões no adulto?",opts:["1 a 2 cm","Cerca de 5 a 6 cm","10 cm no mínimo","A profundidade nunca é especificada"],correct:1,expl:"Recomenda-se uma profundidade de 5 a 6 cm no adulto, sem ultrapassar este limite."},
    {q:"O DAE complementa a RCP ou substitui-a?",opts:["Substitui-a inteiramente assim que ligado","Complementa-a: a RCP continua à volta do seu uso","Não serve de nada se a RCP estiver bem feita","É preciso escolher entre os dois, nunca juntos"],correct:1,expl:"O DAE é um complemento essencial da RCP, nunca um substituto: os dois funcionam juntos."},
    {q:"Quando se deve ligar o DAE assim que disponível?",opts:["Só após validação de um médico à distância","Sem demora, seguindo simplesmente as suas instruções de voz","Só se houver 100% de certeza do diagnóstico","Depois de verificar o pulso durante um minuto inteiro"],correct:1,expl:"O DAE foi concebido para guiar o socorrista; deve ser ligado sem demora assim que disponível."},
    {q:"O que fazer imediatamente após um choque administrado pelo DAE?",opts:["Verificar o pulso antes de tudo","Retomar as compressões de imediato, sem verificar o pulso","Parar toda a intervenção, o choque basta","Esperar instruções de um médico antes de continuar"],correct:1,expl:"As recomendações atuais exigem retomar de imediato as compressões após o choque, sem demora de verificação do pulso."},
    {q:"Por que se deve rodar os socorristas aproximadamente a cada 2 minutos?",opts:["Não é necessário se o socorrista se sentir bem","A qualidade das compressões baixa com o cansaço, muitas vezes sem o socorrista notar","Só para cumprir uma regra administrativa","Só se houver mais de 3 pessoas disponíveis"],correct:1,expl:"O cansaço degrada a profundidade e o ritmo das compressões de forma muitas vezes impercetível para o próprio socorrista."},
    {q:"No caso de estudo do Pescador Inconsciente, o que atrasou o início da RCP?",opts:["A falta de um DAE a bordo","Confundir suspiros agónicos com respiração normal","Um problema de comunicação por rádio","O tempo meteorológico"],correct:1,expl:"A tripulação hesitou pensando que a vítima ainda respirava, quando na verdade eram suspiros agónicos."},
    {q:"No mesmo caso, que erro atrasou o uso do DAE?",opts:["O aparelho estava avariado","Querer verificar o pulso manualmente antes de o ligar","O aparelho não estava carregado","Ninguém sabia onde estava"],correct:1,expl:"Querer verificar o pulso antes de ligar o DAE fez perder tempo precioso, quando deve ser usado sem demora."},
    {q:"O que garante realmente a RCP, segundo a mensagem de segurança desta lição?",opts:["Garante a sobrevivência da vítima em todos os casos","Garante que a vítima recebe todas as suas chances até à assistência médica profissional","Não garante nada de todo","Substitui inteiramente a intervenção médica"],correct:1,expl:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives."},
    {q:"O que significa um pulso ausente após 10 segundos de verificação, segundo as recomendações atuais?",opts:["É preciso esperar mais um minuto antes de agir","As compressões torácicas devem continuar de imediato","É preciso parar toda a intervenção","É preciso verificar a respiração novamente primeiro"],correct:1,expl:"A ausência de pulso na janela de 10 segundos exige continuar de imediato com compressões de alta qualidade."},
    {q:"Este módulo de primeiros socorros STCW substitui uma formação de RCP certificada presencial?",opts:["Sim, equivale a uma certificação prática","Não, ensina apenas os princípios e a estabilização inicial, nunca substitui uma formação prática certificada","Sim, mas só para os oficiais","Não, não serve de nada sem formação prática"],correct:1,expl:"A MAP ensina os princípios e a preparação mental, mas nunca substitui uma formação prática de RCP certificada."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Une victime inconsciente fait des gasps bruyants et espacés. Que faites-vous ?",opts:["Rien, elle respire","Considérer que ce n'est pas une respiration normale et commencer la RCP","Attendre 2 minutes pour voir","Lui parler pour la réveiller"],correct:1,expl:"Les gasps agoniques ne sont pas une respiration normale : la RCP doit commencer immédiatement."},
    {q:"L'AED est-il un remplacement de la RCP ?",opts:["Oui, une fois allumé la RCP n'est plus utile","Non, il la complète, les deux fonctionnent ensemble","Oui, mais seulement pour les officiers","Non, il ne sert jamais à rien"],correct:1,expl:"L'AED complète la RCP, il ne la remplace jamais."},
    {q:"Quel est le rythme cible des compressions ?",opts:["60-80/min","100-120/min","150-180/min","Aucun rythme précis"],correct:1,expl:"100 à 120 compressions par minute est la cible recommandée."},
    {q:"Pourquoi rotationner les sauveteurs toutes les 2 minutes ?",opts:["Ce n'est pas nécessaire","La qualité des compressions chute avec la fatigue, souvent sans s'en rendre compte","Uniquement par confort","Seulement si demandé par un médecin"],correct:1,expl:"La fatigue dégrade la qualité des compressions de façon souvent imperceptible."},
    {q:"Que garantit la RCP selon le message de sécurité de cette leçon ?",opts:["La survie certaine de la victime","Que la victime reçoit toutes ses chances jusqu'à la prise en charge médicale","Rien du tout","Le remplacement complet des secours médicaux"],correct:1,expl:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives."},
  ],
  en:[
    {q:"An unconscious casualty makes loud, widely spaced gasps. What do you do?",opts:["Nothing, they're breathing","Consider this is not normal breathing and start CPR","Wait 2 minutes to see","Talk to them to wake them up"],correct:1,expl:"Agonal gasps are not normal breathing: CPR must start immediately."},
    {q:"Is the AED a replacement for CPR?",opts:["Yes, once turned on CPR is no longer needed","No, it complements CPR, both work together","Yes, but only for officers","No, it is never useful"],correct:1,expl:"The AED complements CPR, it never replaces it."},
    {q:"What is the target compression rate?",opts:["60-80/min","100-120/min","150-180/min","No specific rate"],correct:1,expl:"100 to 120 compressions per minute is the recommended target."},
    {q:"Why rotate rescuers every 2 minutes?",opts:["It's not necessary","Compression quality drops with fatigue, often without noticing","Only for comfort","Only if requested by a doctor"],correct:1,expl:"Fatigue degrades compression quality in a way that is often imperceptible."},
    {q:"What does CPR guarantee according to this lesson's safety message?",opts:["The casualty's certain survival","That the casualty is given every chance until medical care arrives","Nothing at all","The complete replacement of medical help"],correct:1,expl:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives."},
  ],
  es:[
    {q:"Una víctima inconsciente hace jadeos ruidosos y espaciados. ¿Qué haces?",opts:["Nada, está respirando","Considerar que no es respiración normal y empezar la RCP","Esperar 2 minutos a ver","Hablarle para despertarla"],correct:1,expl:"Los jadeos agónicos no son respiración normal: la RCP debe empezar de inmediato."},
    {q:"¿Es el DEA un sustituto de la RCP?",opts:["Sí, una vez encendido la RCP ya no es necesaria","No, la complementa, ambos funcionan juntos","Sí, pero solo para oficiales","No, nunca sirve de nada"],correct:1,expl:"El DEA complementa la RCP, nunca la sustituye."},
    {q:"¿Cuál es el ritmo objetivo de las compresiones?",opts:["60-80/min","100-120/min","150-180/min","Sin ritmo específico"],correct:1,expl:"100 a 120 compresiones por minuto es el objetivo recomendado."},
    {q:"¿Por qué rotar a los socorristas cada 2 minutos?",opts:["No es necesario","La calidad de las compresiones baja con el cansancio, a menudo sin notarlo","Solo por comodidad","Solo si lo pide un médico"],correct:1,expl:"El cansancio degrada la calidad de las compresiones de forma a menudo imperceptible."},
    {q:"¿Qué garantiza la RCP según el mensaje de seguridad de esta lección?",opts:["La supervivencia segura de la víctima","Que la víctima recibe todas sus oportunidades hasta la atención médica","Nada en absoluto","La sustitución completa de la ayuda médica"],correct:1,expl:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives."},
  ],
  pt:[
    {q:"Uma vítima inconsciente faz suspiros ruidosos e espaçados. O que fazes?",opts:["Nada, está a respirar","Considerar que não é respiração normal e começar a RCP","Esperar 2 minutos para ver","Falar com ela para a acordar"],correct:1,expl:"Os suspiros agónicos não são respiração normal: a RCP deve começar de imediato."},
    {q:"O DAE é um substituto da RCP?",opts:["Sim, assim que ligado a RCP deixa de ser necessária","Não, complementa-a, os dois funcionam juntos","Sim, mas só para oficiais","Não, nunca serve de nada"],correct:1,expl:"O DAE complementa a RCP, nunca a substitui."},
    {q:"Qual é o ritmo alvo das compressões?",opts:["60-80/min","100-120/min","150-180/min","Sem ritmo específico"],correct:1,expl:"100 a 120 compressões por minuto é o alvo recomendado."},
    {q:"Por que rodar os socorristas a cada 2 minutos?",opts:["Não é necessário","A qualidade das compressões baixa com o cansaço, muitas vezes sem se notar","Só por conforto","Só se pedido por um médico"],correct:1,expl:"O cansaço degrada a qualidade das compressões de forma muitas vezes impercetível."},
    {q:"O que garante a RCP segundo a mensagem de segurança desta lição?",opts:["A sobrevivência certa da vítima","Que a vítima recebe todas as suas chances até à assistência médica","Nada de todo","A substituição completa da ajuda médica"],correct:1,expl:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si quelqu'un s'effondrait a cote de toi aujourd'hui, ta premiere reaction serait-elle de reflechir... ou d'agir ?",
    en:"If someone collapsed beside you today, would your first reaction be to think... or to act?",
    es:"Si alguien se desplomara a tu lado hoy, ¿tu primera reaccion seria pensar... o actuar?",
    pt:"Se alguem desmaiasse ao teu lado hoje, a tua primeira reacao seria pensar... ou agir?",
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
        {lang==="fr"?"Il n'y a pas de bonne réponse - prends un instant pour y réfléchir.":lang==="en"?"There is no right answer - take a moment to reflect.":lang==="es"?"No hay una respuesta correcta - tómate un momento para reflexionar.":"Não há uma resposta certa - reserva um momento para refletir."}
      </div>
    </div>
  );
}

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🩺 Safety · STCW First Aid · Leçon 2/8 · ⭐ Premium",
      title:"CPR & AED - Cardiac Arrest Response",
      intro:"Cette leçon est probablement la plus critique du module. Elle répond à une question simple mais vitale : que faire dans les premières minutes face à un arrêt cardiaque, avant que l'aide médicale professionnelle n'arrive ?",
      p0:"TIME IS MUSCLE",s0t:"Chaque minute sans action réduit les chances",
      s0:"L'arrêt cardiaque diffère de toutes les autres urgences de ce module : il n'y a pas de temps pour lire une liste. Les chances de survie chutent rapidement à chaque minute sans compressions ni défibrillation. La rapidité compte, mais jamais au prix de gestes mal exécutés.\n\nCOMMENT LE RECONNAÎTRE ? Aucune réponse, aucune respiration normale, ou seulement des gasps.\nQUE FAIRE IMMÉDIATEMENT ? Crier pour de l'aide, déclencher l'alerte médicale, commencer les compressions sans délai.\nQUELLE ERREUR L'AGGRAVE ? Attendre d'être certain à 100%, ou interrompre trop longtemps les compressions pour vérifier le pouls.\nQUAND DEMANDER DE L'AIDE MÉDICALE ? Immédiatement, avant même de commencer les compressions si possible.",
      p1:"RECONNAÎTRE L'ARRÊT CARDIAQUE",s1t:"Aucune réponse, aucune respiration normale",
      s1:"Après le bilan primaire (Leçon 1), une victime qui ne répond pas et ne respire pas normalement doit être considérée en arrêt cardiaque. Le piège le plus fréquent : confondre les gasps agoniques avec une respiration normale.",
      p2:"APPELER PUIS COMMENCER LA RCP",s2t:"L'ordre qui sauve des minutes précieuses",
      s2:"Crier pour de l'aide, déclencher l'alerte médicale, puis commencer les compressions sans attendre une position parfaite : cet ordre permet de mobiliser l'AED et l'aide médicale pendant que les compressions débutent déjà.",
      p3:"MAINTENIR UNE RCP EFFICACE",s3t:"Le rythme qui fait la différence",
      s3:"100 à 120 compressions par minute, une profondeur de 5 à 6 cm, au centre du thorax, en laissant le thorax remonter complètement entre chaque compression. Le rythme se ressent, il ne se mémorise pas seulement en chiffres.",
      p4:"AED - IL COMPLÈTE, IL NE REMPLACE JAMAIS",s4t:"L'erreur la plus fréquente à éviter",
      s4:"Beaucoup pensent qu'il suffit de poser l'appareil. En réalité, l'AED fonctionne autour de la RCP : il s'allume sans délai, guide chaque étape à voix haute, et les compressions reprennent immédiatement après son analyse ou son choc, sans vérifier le pouls.",
      p5:"UTILISER L'AED SANS DÉLAI",s5t:"Les étapes qui minimisent chaque interruption",
      s5:"Allumer, coller les électrodes, s'écarter pendant l'analyse, reprendre la RCP immédiatement après : chaque seconde d'interruption compte, l'objectif est de la réduire au minimum.",
      p6:"LA FATIGUE ET LA ROTATION",s6t:"Un déclin souvent invisible pour le sauveteur",
      s6:"Après environ 2 minutes, la profondeur et le rythme des compressions chutent, souvent sans que le sauveteur s'en aperçoive lui-même. Rotationner avec un collègue disponible n'est pas une option, c'est une nécessité.",
      p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"⚠️ CAS D'ÉTUDE",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 2",
      sumP:["Gasps agoniques = pas une respiration normale, commencer la RCP immédiatement","Crier pour de l'aide et déclencher l'alerte médicale avant même de commencer les compressions","Rythme cible : 100 à 120/min, profondeur 5 à 6 cm","L'AED complète la RCP, il ne la remplace jamais - reprendre les compressions immédiatement après un choc","Rotationner toutes les 2 minutes : la fatigue dégrade la qualité sans que le sauveteur s'en rende compte"],
      learnedP:["Reconnaître l'arrêt cardiaque et le piège des gasps agoniques","La séquence Appeler puis Commencer la RCP","Le rythme et la profondeur des compressions","L'AED comme complément, jamais un remplacement","La nécessité de la rotation des sauveteurs"],
      safetyMsg:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives.",
    },
    en:{
      badge:"🩺 Safety · STCW First Aid · Lesson 2/8 · ⭐ Premium",
      title:"CPR & AED - Cardiac Arrest Response",
      intro:"This lesson is likely the most critical in the module. It answers a simple but vital question: what to do in the first minutes facing a cardiac arrest, before professional medical care arrives?",
      p0:"TIME IS MUSCLE",s0t:"Every minute without action reduces the odds",
      s0:"Cardiac arrest differs from every other emergency in this module: there is no time to read a checklist. Survival chances drop fast with every minute without compressions or defibrillation. Speed matters, but never at the cost of poorly executed actions.\n\nHOW DO I RECOGNIZE IT? No response, no normal breathing, or only gasps.\nWHAT DO I DO IMMEDIATELY? Shout for help, trigger the medical alert, start compressions without delay.\nWHAT MISTAKE MAKES IT WORSE? Waiting to be 100% certain, or interrupting compressions too long to check the pulse.\nWHEN MUST I ASK FOR MEDICAL ASSISTANCE? Immediately, ideally even before starting compressions.",
      p1:"RECOGNIZING CARDIAC ARREST",s1t:"No response, no normal breathing",
      s1:"After the Primary Survey (Lesson 1), a casualty who does not respond and does not breathe normally must be considered in cardiac arrest. The most frequent trap: mistaking agonal gasps for normal breathing.",
      p2:"CALL FOR HELP THEN START CPR",s2t:"The order that saves precious minutes",
      s2:"Shout for help, trigger the medical alert, then start compressions without waiting for a perfect position: this order mobilizes the AED and medical help while compressions are already starting.",
      p3:"MAINTAINING EFFECTIVE CPR",s3t:"The rhythm that makes the difference",
      s3:"100 to 120 compressions per minute, a depth of 5 to 6 cm, at the center of the chest, allowing the chest to fully recoil between compressions. The rhythm is felt, not just memorized as numbers.",
      p4:"AED - IT COMPLEMENTS, IT NEVER REPLACES",s4t:"The most frequent mistake to avoid",
      s4:"Many think it's enough to just attach the device. In reality, the AED works around CPR: it turns on without delay, guides every step out loud, and compressions resume immediately after its analysis or shock, without checking the pulse.",
      p5:"USING THE AED WITHOUT DELAY",s5t:"The steps that minimize every interruption",
      s5:"Turn on, attach the pads, stand clear during analysis, resume CPR immediately after: every second of interruption counts, the goal is to keep it to a minimum.",
      p6:"FATIGUE AND ROTATION",s6t:"A decline often invisible to the rescuer",
      s6:"After about 2 minutes, compression depth and rate drop, often without the rescuer noticing it themselves. Rotating with an available colleague is not an option, it is a necessity.",
      p7:"🎯 OPERATIONAL EXERCISE",p8:"⚠️ CASE STUDY",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 2",
      sumP:["Agonal gasps = not normal breathing, start CPR immediately","Shout for help and trigger the medical alert even before starting compressions","Target rhythm: 100 to 120/min, depth 5 to 6 cm","The AED complements CPR, it never replaces it - resume compressions immediately after a shock","Rotate every 2 minutes: fatigue degrades quality without the rescuer noticing"],
      learnedP:["Recognizing cardiac arrest and the agonal gasps trap","The Call then Start CPR sequence","Compression rhythm and depth","The AED as a complement, never a replacement","The need for rescuer rotation"],
      safetyMsg:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives.",
    },
    es:{
      badge:"🩺 Safety · STCW First Aid · Lección 2/8 · ⭐ Premium",
      title:"CPR & AED - Cardiac Arrest Response",
      intro:"Esta lección es probablemente la más crítica del módulo. Responde a una pregunta simple pero vital: ¿qué hacer en los primeros minutos ante un paro cardíaco, antes de que llegue la atención médica profesional?",
      p0:"TIME IS MUSCLE",s0t:"Cada minuto sin actuar reduce las posibilidades",
      s0:"El paro cardíaco es distinto de todas las demás urgencias de este módulo: no hay tiempo para leer una lista. Las posibilidades de supervivencia bajan rápido con cada minuto sin compresiones ni desfibrilación. La rapidez importa, pero nunca a costa de gestos mal ejecutados.\n\n¿CÓMO RECONOCERLO? Ninguna respuesta, ninguna respiración normal, o solo jadeos.\n¿QUÉ HACER DE INMEDIATO? Gritar pidiendo ayuda, activar la alerta médica, empezar las compresiones sin demora.\n¿QUÉ ERROR LO AGRAVA? Esperar a estar 100% seguro, o interrumpir demasiado tiempo las compresiones para comprobar el pulso.\n¿CUÁNDO PEDIR AYUDA MÉDICA? De inmediato, idealmente incluso antes de empezar las compresiones.",
      p1:"RECONOCER EL PARO CARDÍACO",s1t:"Ninguna respuesta, ninguna respiración normal",
      s1:"Tras el bilan primario (Lección 1), una víctima que no responde y no respira con normalidad debe considerarse en paro cardíaco. La trampa más frecuente: confundir los jadeos agónicos con respiración normal.",
      p2:"LLAMAR Y LUEGO EMPEZAR LA RCP",s2t:"El orden que ahorra minutos preciosos",
      s2:"Gritar pidiendo ayuda, activar la alerta médica, luego empezar las compresiones sin esperar una posición perfecta: este orden moviliza el DEA y la ayuda médica mientras las compresiones ya están empezando.",
      p3:"MANTENER UNA RCP EFICAZ",s3t:"El ritmo que marca la diferencia",
      s3:"100 a 120 compresiones por minuto, una profundidad de 5 a 6 cm, en el centro del pecho, dejando que el pecho se expanda por completo entre cada compresión. El ritmo se siente, no solo se memoriza en cifras.",
      p4:"DEA - COMPLEMENTA, NUNCA SUSTITUYE",s4t:"El error más frecuente a evitar",
      s4:"Muchos piensan que basta con colocar el aparato. En realidad, el DEA funciona alrededor de la RCP: se enciende sin demora, guía cada paso en voz alta, y las compresiones se reanudan de inmediato tras su análisis o descarga, sin comprobar el pulso.",
      p5:"USAR EL DEA SIN DEMORA",s5t:"Los pasos que minimizan cada interrupción",
      s5:"Encender, pegar los electrodos, apartarse durante el análisis, reanudar la RCP de inmediato después: cada segundo de interrupción cuenta, el objetivo es reducirlo al mínimo.",
      p6:"EL CANSANCIO Y LA ROTACIÓN",s6t:"Un declive a menudo invisible para el socorrista",
      s6:"Tras unos 2 minutos, la profundidad y el ritmo de las compresiones bajan, a menudo sin que el propio socorrista lo note. Rotar con un compañero disponible no es una opción, es una necesidad.",
      p7:"🎯 EJERCICIO OPERATIVO",p8:"⚠️ CASO DE ESTUDIO",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 2",
      sumP:["Jadeos agónicos = no es respiración normal, empezar la RCP de inmediato","Gritar pidiendo ayuda y activar la alerta médica incluso antes de empezar las compresiones","Ritmo objetivo: 100 a 120/min, profundidad 5 a 6 cm","El DEA complementa la RCP, nunca la sustituye - reanudar las compresiones de inmediato tras una descarga","Rotar cada 2 minutos: el cansancio degrada la calidad sin que el socorrista lo note"],
      learnedP:["Reconocer el paro cardíaco y la trampa de los jadeos agónicos","La secuencia Llamar y luego Empezar la RCP","El ritmo y la profundidad de las compresiones","El DEA como complemento, nunca un sustituto","La necesidad de rotar a los socorristas"],
      safetyMsg:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives.",
    },
    pt:{
      badge:"🩺 Safety · STCW First Aid · Lição 2/8 · ⭐ Premium",
      title:"CPR & AED - Cardiac Arrest Response",
      intro:"Esta lição é provavelmente a mais crítica do módulo. Responde a uma pergunta simples mas vital: o que fazer nos primeiros minutos perante uma paragem cardíaca, antes de a assistência médica profissional chegar?",
      p0:"TIME IS MUSCLE",s0t:"Cada minuto sem agir reduz as hipóteses",
      s0:"A paragem cardíaca é diferente de todas as outras emergências deste módulo: não há tempo para ler uma lista. As hipóteses de sobrevivência baixam rápido a cada minuto sem compressões nem desfibrilhação. A rapidez importa, mas nunca à custa de gestos mal executados.\n\nCOMO RECONHECER? Nenhuma resposta, nenhuma respiração normal, ou apenas suspiros.\nO QUE FAZER IMEDIATAMENTE? Gritar por ajuda, acionar o alerta médico, começar as compressões sem demora.\nQUE ERRO O AGRAVA? Esperar para ter 100% de certeza, ou interromper demasiado tempo as compressões para verificar o pulso.\nQUANDO PEDIR AJUDA MÉDICA? De imediato, idealmente ainda antes de começar as compressões.",
      p1:"RECONHECER A PARAGEM CARDÍACA",s1t:"Nenhuma resposta, nenhuma respiração normal",
      s1:"Após o exame primário (Lição 1), uma vítima que não responde e não respira normalmente deve ser considerada em paragem cardíaca. A armadilha mais frequente: confundir suspiros agónicos com respiração normal.",
      p2:"CHAMAR E DEPOIS COMEÇAR A RCP",s2t:"A ordem que poupa minutos preciosos",
      s2:"Gritar por ajuda, acionar o alerta médico, depois começar as compressões sem esperar por uma posição perfeita: esta ordem mobiliza o DAE e a ajuda médica enquanto as compressões já começam.",
      p3:"MANTER UMA RCP EFICAZ",s3t:"O ritmo que faz a diferença",
      s3:"100 a 120 compressões por minuto, uma profundidade de 5 a 6 cm, no centro do peito, deixando o peito subir completamente entre cada compressão. O ritmo sente-se, não se memoriza apenas em números.",
      p4:"DAE - COMPLEMENTA, NUNCA SUBSTITUI",s4t:"O erro mais frequente a evitar",
      s4:"Muitos pensam que basta colocar o aparelho. Na realidade, o DAE funciona à volta da RCP: liga-se sem demora, guia cada passo em voz alta, e as compressões retomam de imediato após a sua análise ou choque, sem verificar o pulso.",
      p5:"USAR O DAE SEM DEMORA",s5t:"Os passos que minimizam cada interrupção",
      s5:"Ligar, colar os elétrodos, afastar-se durante a análise, retomar a RCP de imediato depois: cada segundo de interrupção conta, o objetivo é reduzi-lo ao mínimo.",
      p6:"O CANSAÇO E A ROTAÇÃO",s6t:"Um declínio muitas vezes invisível para o socorrista",
      s6:"Após cerca de 2 minutos, a profundidade e o ritmo das compressões baixam, muitas vezes sem que o próprio socorrista note. Rodar com um colega disponível não é uma opção, é uma necessidade.",
      p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"⚠️ CASO DE ESTUDO",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 2",
      sumP:["Suspiros agónicos = não é respiração normal, começar a RCP de imediato","Gritar por ajuda e acionar o alerta médico mesmo antes de começar as compressões","Ritmo alvo: 100 a 120/min, profundidade 5 a 6 cm","O DAE complementa a RCP, nunca a substitui - retomar as compressões de imediato após um choque","Rodar a cada 2 minutos: o cansaço degrada a qualidade sem o socorrista notar"],
      learnedP:["Reconhecer a paragem cardíaca e a armadilha dos suspiros agónicos","A sequência Chamar e depois Começar a RCP","O ritmo e a profundidade das compressões","O DAE como complemento, nunca um substituto","A necessidade da rotação dos socorristas"],
      safetyMsg:"CPR does not guarantee survival. It guarantees that the victim is given every possible chance until professional medical care arrives.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS3_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/8":lang==="en"?"Lesson 2/8":lang==="es"?"Lección 2/8":"Lição 2/8"}</div>
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

            <SL icon="⏱️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏱️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="👤" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>👤</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>👤 {lang==="fr"?"SIGNES D'ARRÊT CARDIAQUE - INTERACTIF":lang==="en"?"CARDIAC ARREST SIGNS - INTERACTIVE":lang==="es"?"SIGNOS DE PARO CARDÍACO - INTERACTIVO":"SINAIS DE PARAGEM CARDÍACA - INTERATIVO"}</div><RecognizeCardiacArrestSVG lang={lang}/></Card>

            <SL icon="📣" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📣</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📣 {lang==="fr"?"SÉQUENCE APPELER & COMMENCER - INTERACTIF":lang==="en"?"CALL & START SEQUENCE - INTERACTIVE":lang==="es"?"SECUENCIA LLAMAR Y EMPEZAR - INTERACTIVO":"SEQUÊNCIA CHAMAR E COMEÇAR - INTERATIVO"}</div><CallAndStartSVG lang={lang}/></Card>

            <SL icon="💓" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💓</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>💓 {lang==="fr"?"SIMULATEUR DE RYTHME - INTERACTIF":lang==="en"?"RHYTHM SIMULATOR - INTERACTIVE":lang==="es"?"SIMULADOR DE RITMO - INTERACTIVO":"SIMULADOR DE RITMO - INTERATIVO"}</div><CompressionRhythmSVG lang={lang}/></Card>

            <SL icon="⚡" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>

            <SL icon="🔌" text={lc.p5} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔌</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔌 {lang==="fr"?"ÉTAPES AED - INTERACTIF":lang==="en"?"AED STEPS - INTERACTIVE":lang==="es"?"PASOS DEA - INTERACTIVO":"PASSOS DAE - INTERATIVO"}</div><AEDStepsSVG lang={lang}/></Card>

            <SL icon="🔄" text={lc.p6} color={C.gold2}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔄</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>

            <SL icon="🎯" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p8} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

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
                {lang==="fr"?"Quiz Final - RCP & AED":lang==="en"?"Final Quiz - CPR & AED":lang==="es"?"Quiz Final - RCP y DEA":"Quiz Final - RCP e DAE"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 2/8":"questions · Lesson 2/8"}</div>
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
                <span style={{fontSize:20}}>🩺</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 - HÉMORRAGIES & CHOC →":lang==="en"?"LESSON 3 - BLEEDING & SHOCK →":lang==="es"?"LECCIÓN 3 - HEMORRAGIAS Y SHOCK →":"LIÇÃO 3 - HEMORRAGIAS E CHOQUE →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
