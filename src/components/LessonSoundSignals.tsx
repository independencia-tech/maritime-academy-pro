// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", yellow:"#f1c40f", fog:"rgba(180,200,220,0.18)",
};

const T = {
  fr:{ back:"◀ Retour", module:"Signalisation & Balisage", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Signaling & Buoyage", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Señalización y Balizamiento", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Sinalização e Balizagem", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SOUND VISUALIZER HELPER
// ══════════════════════════════════════
function SoundBars({ pattern, playing, color="#4da6ff" }) {
  // pattern: array of {type: "short"|"long", idx}
  const bars = pattern || [];
  return (
    <div style={{display:"flex",alignItems:"center",gap:3,height:32}}>
      {bars.map((b,i)=>(
        <div key={i} style={{
          width: b.type==="long" ? 28 : 10,
          height: playing ? (b.type==="long" ? 28 : 20) : (b.type==="long" ? 22 : 14),
          borderRadius: 4,
          background: playing ? color : `${color}66`,
          transition:"all 0.15s ease",
          boxShadow: playing ? `0 0 8px ${color}` : "none",
        }}/>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 1 — MANEUVER SIGNALS KEYBOARD
// ══════════════════════════════════════
function ManeuverSignalsSVG({ lang }) {
  const [active, setActive] = useState(null);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const signals = [
    { id:"1s", code:"•", label:{fr:"1 son court",en:"1 short blast",es:"1 sonido corto",pt:"1 som curto"},
      pattern:[{type:"short"}],
      meaning:{fr:"Je vire à TRIBORD\n(I am altering my course to starboard)\n\nUtilisé en visibilité normale uniquement\nSignal = décision de manœuvre\n\nRÈGLE :\nNavire sur tribord = cède le passage\nNavire sur bâbord = peut maintenir son cap\n\nDans un chenal :\n1 son = je veux dépasser PAR TRIBORD",
               en:"I am altering my course to STARBOARD\n\nUsed in normal visibility only\nSignal = maneuver decision\n\nRULE:\nVessel on starboard = gives way\nVessel on port = may maintain course\n\nIn a channel:\n1 blast = I wish to overtake on STARBOARD",
               es:"Viro a ESTRIBOR\n\nSolo en visibilidad normal\nSeñal = decisión de maniobra\n\nEN UN CANAL:\n1 sonido = quiero adelantar por ESTRIBOR",
               pt:"Estou a virar para ESTIBORDO\n\nUsado apenas em visibilidade normal\nSinal = decisão de manobra\n\nNum canal:\n1 som = quero ultrapassar por ESTIBORDO"},
      color:C.blue2 },
    { id:"2s", code:"• •", label:{fr:"2 sons courts",en:"2 short blasts",es:"2 sonidos cortos",pt:"2 sons curtos"},
      pattern:[{type:"short"},{type:"short"}],
      meaning:{fr:"Je vire à BÂBORD\n(I am altering my course to port)\n\nUtilisé en visibilité normale uniquement\nSignal envoyé AVANT ou PENDANT la manœuvre\n\nATTENTION :\nVirer à bâbord est souvent plus dangereux\ncar on présente son flanc droit au trafic\n\nDans un chenal :\n2 sons = je veux dépasser PAR BÂBORD",
               en:"I am altering my course to PORT\n\nUsed in normal visibility only\nSignal sent BEFORE or DURING the maneuver\n\nCAUTION:\nAltering to port is often more dangerous\nas you present your starboard flank to traffic\n\nIn a channel:\n2 blasts = I wish to overtake on PORT side",
               es:"Viro a BABOR\n\nSolo en visibilidad normal\nATENCIÓN: virar a babor es a menudo más peligroso\n\nEN UN CANAL:\n2 sonidos = quiero adelantar por BABOR",
               pt:"Estou a virar para BOMBORDO\n\nUsado apenas em visibilidade normal\nATENÇÃO: virar a bombordo é geralmente mais perigoso\n\nNum canal:\n2 sons = quero ultrapassar por BOMBORDO"},
      color:C.green },
    { id:"3s", code:"• • •", label:{fr:"3 sons courts",en:"3 short blasts",es:"3 sonidos cortos",pt:"3 sons curtos"},
      pattern:[{type:"short"},{type:"short"},{type:"short"}],
      meaning:{fr:"Je bats en ARRIÈRE\n(My engines are going astern)\n\nATTENTION : ne signifie PAS que le navire\nrecule nécessairement — les machines\nsont en marche arrière mais l'inertie\npeut maintenir le navire en avant\n\nSignal critique lors de manœuvres portuaires\nPilote ou officier informe les autres\n\nÉquipe à bord : préparer les aussières",
               en:"My engines are going ASTERN\n\nCAUTION: does NOT mean the vessel\nis necessarily moving backward — engines\nare going astern but inertia\nmay keep vessel moving forward\n\nCritical signal during port maneuvers\nPilot or officer informs others",
               es:"Mis máquinas están dando ATRÁS\n\nATENCIÓN: no significa que el buque\nnecesariamente retrocede — las máquinas\nestán en marcha atrás pero la inercia\npuede mantener el buque hacia adelante",
               pt:"As minhas máquinas estão a trabalhar para RÉ\n\nATENÇÃO: não significa que o navio\nestá necessariamente a recuar — os motores\nestão a trabalhar à ré mas a inércia\npode manter o navio a avançar"},
      color:C.orange },
    { id:"5s", code:"• • • • •", label:{fr:"5 sons courts",en:"5 short blasts",es:"5 sonidos cortos",pt:"5 sons curtos"},
      pattern:[{type:"short"},{type:"short"},{type:"short"},{type:"short"},{type:"short"}],
      meaning:{fr:"DANGER / DOUTE\n(I am in doubt whether sufficient action\nis being taken by the other vessel)\n\nSignal d'ALARME et d'URGENCE\nÀ émettre SI :\n→ Vous ne comprenez pas les intentions de l'autre\n→ Vous pensez que l'autre navire ne prend pas\n  de mesures suffisantes pour éviter l'abordage\n→ Situation dangereuse imminente\n\nRÉPONSE REQUISE : l'autre navire doit\nimmédiatement répondre et manœuvrer",
               en:"DANGER / DOUBT\n(I am in doubt whether sufficient action\nis being taken by the other vessel)\n\nALARM and URGENCY signal\nUse IF:\n→ You don't understand other vessel's intentions\n→ You believe other vessel is NOT taking\n  sufficient action to avoid collision\n→ Imminent dangerous situation\n\nRESPONSE REQUIRED: other vessel must\nimmediately respond and maneuver",
               es:"PELIGRO / DUDA\n\nSeñal de ALARMA y URGENCIA\nUsar SI:\n→ No entiendes las intenciones del otro\n→ Crees que el otro buque no toma\n  medidas suficientes para evitar el abordaje\n→ Situación peligrosa inminente",
               pt:"PERIGO / DÚVIDA\n\nSinal de ALARME e URGÊNCIA\nUsar SE:\n→ Não compreende as intenções do outro\n→ Acredita que o outro navio não está\n  a tomar medidas suficientes para evitar abalroamento\n→ Situação perigosa iminente"},
      color:C.red },
    { id:"1L", code:"—", label:{fr:"1 son long (tête de chenal)",en:"1 long blast (channel head)",es:"1 sonido largo (entrada canal)",pt:"1 som longo (entrada canal)"},
      pattern:[{type:"long"}],
      meaning:{fr:"SIGNAL D'APPROCHE\nNavire approchant un virage ou une zone\noù d'autres navires peuvent être cachés\n\nUTILISATION :\n→ Avant d'arriver à un coude de rivière\n→ Approche d'un chenal avec mauvaise visibilité\n→ Sortie d'un port ou d'un bassin\n\nRÉPONSE :\nNavire sur place = répond par 1 son long\n\nPERMET :\nd'établir la communication sonore\navant de manœuvrer en zone aveugle",
               en:"APPROACH SIGNAL\nVessel approaching a bend or area\nwhere other vessels may be hidden\n\nUSE:\n→ Before arriving at a river bend\n→ Approaching channel with poor visibility\n→ Leaving a port or basin\n\nRESPONSE:\nVessel on site = replies with 1 long blast\n\nPURPOSE:\nestablish sound communication\nbefore maneuvering in blind zone",
               es:"SEÑAL DE APROXIMACIÓN\nBuque aproximándose a una curva o zona\ndonde otros buques pueden estar ocultos\n\nUSO:\n→ Antes de llegar a un recodo del río\n→ Aproximación a un canal con poca visibilidad\n→ Salida de un puerto o dársena",
               pt:"SINAL DE APROXIMAÇÃO\nNavio a aproximar-se de uma curva ou zona\nonde outros navios podem estar ocultos\n\nUSO:\n→ Antes de chegar a uma curva de rio\n→ Aproximação de um canal com má visibilidade\n→ Saída de um porto ou bacia"},
      color:C.gold2 },
    { id:"1L1S", code:"— •", label:{fr:"1 long + 1 court (dépassement tribord)",en:"1 long + 1 short (overtake stbd)",es:"1 largo + 1 corto (adelantamiento estribor)",pt:"1 longo + 1 curto (ultrapassagem estibordob)"},
      pattern:[{type:"long"},{type:"short"}],
      meaning:{fr:"DEMANDE DE DÉPASSEMENT PAR TRIBORD\n(chenal étroit — Règle 9)\n\nVOUS SIGNALEZ :\n'Je veux vous dépasser par votre tribord'\n\nRÉPONSE ACCORD :\n— • — • = accord · je vous laisse passer\nRÉPONSE REFUS :\n• • • • • = 5 sons = danger/refus\n\nÀ NE PAS CONFONDRE avec :\n1 son court = virer à tribord (en mer ouverte)",
               en:"REQUEST TO OVERTAKE ON STARBOARD\n(narrow channel — Rule 9)\n\nYOU SIGNAL:\n'I wish to overtake you on your starboard'\n\nAGREEMENT RESPONSE:\n— • — • = agreement · I let you pass\nREFUSAL RESPONSE:\n• • • • • = 5 blasts = danger/refusal",
               es:"SOLICITUD DE ADELANTAMIENTO POR ESTRIBOR\n(canal estrecho — Regla 9)\n\nSEÑALAS:\n'Quiero adelantarle por su estribor'\n\nRESPUESTA ACUERDO:\n— • — • = acuerdo · le dejo pasar\nRESPUESTA RECHAZO:\n• • • • • = 5 sonidos = peligro/rechazo",
               pt:"PEDIDO DE ULTRAPASSAGEM POR ESTIBORDO\n(canal estreito — Regra 9)\n\nSINALIZA:\n'Quero ultrapassá-lo pelo seu estibordo'\n\nRESPOSTA ACORDO:\n— • — • = acordo · deixo-o passar\nRESPOSTA RECUSA:\n• • • • • = 5 sons = perigo/recusa"},
      color:C.teal },
  ];

  const handlePress = (sig) => {
    if(timerRef.current) clearTimeout(timerRef.current);
    setActive(sig.id);
    setPlaying(true);
    timerRef.current = setTimeout(()=>setPlaying(false), 1200);
  };

  useEffect(()=>()=>{if(timerRef.current) clearTimeout(timerRef.current);},[]);

  const act = signals.find(s=>s.id===active);

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {signals.map((sig)=>(
          <div key={sig.id} onClick={()=>handlePress(sig)} style={{
            padding:"10px 8px",borderRadius:14,cursor:"pointer",textAlign:"center",
            background:active===sig.id?`${sig.color}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${active===sig.id?sig.color:"rgba(255,255,255,0.08)"}`,
            transition:"all 0.2s"}}>
            <div style={{fontFamily:"monospace",fontSize:16,fontWeight:900,color:sig.color,letterSpacing:4,marginBottom:4}}>{sig.code}</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:4}}>
              <SoundBars pattern={sig.pattern} playing={active===sig.id&&playing} color={sig.color}/>
            </div>
            <div style={{fontSize:8,color:active===sig.id?sig.color:C.muted,fontWeight:700,lineHeight:1.3}}>{sig.label[lang]||sig.label.fr}</div>
          </div>
        ))}
      </div>
      {act&&<div style={{padding:"12px",borderRadius:14,background:`${act.color}12`,border:`1.5px solid ${act.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
          <div style={{fontFamily:"monospace",fontSize:18,fontWeight:900,color:act.color}}>{act.code}</div>
          <div style={{fontSize:12,fontWeight:700,color:act.color}}>{act.label[lang]||act.label.fr}</div>
        </div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{act.meaning[lang]||act.meaning.fr}</div>
      </div>}
      {!act&&<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un signal pour le détail":lang==="en"?"Tap a signal for details":lang==="es"?"Toca una señal para los detalles":"Toque num sinal para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — FOG SIGNALS SIMULATOR
// ══════════════════════════════════════
function FogSignalsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(()=>{
    const interval = setInterval(()=>setTick(t=>(t+1)%120), 1000);
    return ()=>clearInterval(interval);
  },[]);

  const vessels = [
    { id:"motor_way", icon:"🚢", color:C.blue2,
      label:{fr:"Navire à moteur en route",en:"Power vessel underway",es:"Buque a motor navegando",pt:"Navio a motor em rota"},
      signal:{fr:"1 SON LONG\nTous les 2 minutes",en:"1 LONG BLAST\nEvery 2 minutes",es:"1 SONIDO LARGO\nCada 2 minutos",pt:"1 SOM LONGO\nA cada 2 minutos"},
      pattern:[{type:"long"}], interval:120,
      desc:{fr:"NAVIRE À MOTEUR EN ROUTE\nFaisant route (en mouvement)\n\nSignal : — (un son long)\nDurée du son : 4-6 secondes\nIntervalle : toutes les 2 minutes (max)\n\nÀ RETENIR :\nNavire faisant route = 1 long\nSimple et mémorisable",
           en:"POWER VESSEL UNDERWAY\nMaking way (moving)\n\nSignal: — (one long blast)\nSound duration: 4-6 seconds\nInterval: every 2 minutes (max)\n\nREMEMBER:\nVessel making way = 1 long\nSimple and memorable",
           es:"BUQUE A MOTOR NAVEGANDO\nHaciendo camino (en movimiento)\n\nSeñal: — (un sonido largo)\nDuración: 4-6 segundos\nIntervalo: cada 2 minutos (máx.)",
           pt:"NAVIO A MOTOR EM ROTA\nA fazer caminho (em movimento)\n\nSinal: — (um som longo)\nDuração: 4-6 segundos\nIntervalo: a cada 2 minutos (máx.)"},},
    { id:"motor_stop", icon:"⛴️", color:C.steel,
      label:{fr:"Navire à moteur stoppé",en:"Power vessel stopped",es:"Buque a motor parado",pt:"Navio a motor parado"},
      signal:{fr:"2 SONS LONGS\nTous les 2 minutes",en:"2 LONG BLASTS\nEvery 2 minutes",es:"2 SONIDOS LARGOS\nCada 2 minutos",pt:"2 SONS LONGOS\nA cada 2 minutos"},
      pattern:[{type:"long"},{type:"long"}], interval:120,
      desc:{fr:"NAVIRE À MOTEUR — STOPPÉ\nSans erre (vitesse nulle)\nMachines arrêtées\n\nSignal : — — (deux sons longs)\nDurée de chaque son : 4-6 secondes\nIntervalle entre les 2 sons : ~2 secondes\nIntervalle global : 2 minutes\n\nDIFFÉRENCE AVEC EN ROUTE :\n1 long = faisant route\n2 longs = stoppé (ne se déplace pas)\n\nATTENTION : peut quand même dériver",
           en:"POWER VESSEL — STOPPED\nNot making way (zero speed)\nEngines stopped\n\nSignal: — — (two long blasts)\nEach sound: 4-6 seconds\nInterval between 2 sounds: ~2 seconds\nOverall interval: 2 minutes\n\nDIFFERENCE FROM UNDERWAY:\n1 long = making way\n2 longs = stopped (not moving)\n\nCAUTION: may still be drifting",
           es:"BUQUE A MOTOR — PARADO\nSin arrancada (velocidad nula)\nMáquinas paradas\n\nSeñal: — — (dos sonidos largos)\nDuración de cada sonido: 4-6 segundos\nIntervalo global: 2 minutos\n\nDIFERENCIA CON NAVEGANDO:\n1 largo = haciendo camino\n2 largos = parado (no se mueve)",
           pt:"NAVIO A MOTOR — PARADO\nSem arrancada (velocidade nula)\nMotores parados\n\nSinal: — — (dois sons longos)\nDuração de cada som: 4-6 segundos\nIntervalo global: 2 minutos\n\nDIFERENCE COM EM ROTA:\n1 longo = a fazer caminho\n2 longos = parado (sem movimento)"},},
    { id:"sailing", icon:"⛵", color:C.green,
      label:{fr:"Voilier en route",en:"Sailing vessel underway",es:"Velero navegando",pt:"Veleiro em rota"},
      signal:{fr:"1 long + 2 courts\nTous les 2 minutes",en:"1 long + 2 short\nEvery 2 minutes",es:"1 largo + 2 cortos\nCada 2 minutos",pt:"1 longo + 2 curtos\nA cada 2 minutos"},
      pattern:[{type:"long"},{type:"short"},{type:"short"}], interval:120,
      desc:{fr:"VOILIER EN ROUTE\n(naviguant à la voile)\n\nSignal : — • • (1 long + 2 courts)\nIntervalle : 2 minutes\n\nMÊME SIGNAL POUR :\n→ Navire NUC (sans gouverne)\n→ Navire RAM (manœuvrabilité restreinte)\n→ Navire CBD (contraint par son tirant d'eau)\n→ Navire de pêche\n→ Remorqueur (remorquant)\n\nMOYEN MNÉMOTECHNIQUE :\n'1 long 2 courts = situation spéciale'\n'Voilier + NUC + RAM + pêche'",
           en:"SAILING VESSEL UNDERWAY\n(navigating under sail)\n\nSignal: — • • (1 long + 2 short)\nInterval: 2 minutes\n\nSAME SIGNAL FOR:\n→ NUC vessel (not under command)\n→ RAM vessel (restricted maneuverability)\n→ CBD vessel (constrained by draught)\n→ Fishing vessel\n→ Tug (when towing)\n\nMNEMONIC:\n'1 long 2 short = special situation'\n'Sailing + NUC + RAM + fishing'",
           es:"VELERO NAVEGANDO\n(navegando a vela)\n\nSeñal: — • • (1 largo + 2 cortos)\nIntervalo: 2 minutos\n\nMISMA SEÑAL PARA:\n→ Buque NUC (sin gobierno)\n→ Buque RAM (maniobrabilidad restringida)\n→ Buque pesquero · Remolcador\n\nRECORDATORIO:\n'1 largo 2 cortos = situación especial'",
           pt:"VELEIRO EM ROTA\n(a navegar à vela)\n\nSinal: — • • (1 longo + 2 curtos)\nIntervalo: 2 minutos\n\nMESMO SINAL PARA:\n→ Navio NUC (sem governo)\n→ Navio RAM (manobabilidade restrita)\n→ Navio de pesca · Rebocador\n\nMNEMÓNICA:\n'1 longo 2 curtos = situação especial'"},},
    { id:"anchor", icon:"⚓", color:C.gold2,
      label:{fr:"Navire au mouillage",en:"Vessel at anchor",es:"Buque fondeado",pt:"Navio fundeado"},
      signal:{fr:"Cloche rapide 5s\nToutes les 1 minute",en:"Rapid bell 5s\nEvery 1 minute",es:"Campana rápida 5s\nCada 1 minuto",pt:"Sino rápido 5s\nA cada 1 minuto"},
      pattern:[{type:"short"},{type:"short"},{type:"short"}], interval:60,
      desc:{fr:"NAVIRE AU MOUILLAGE\n\nSignal : CLOCHE battue rapidement 5 secondes\nIntervalle : 1 MINUTE (plus court que les autres !)\n\nGRAND NAVIRE (> 100m) :\nCLOCHE à l'avant + GONG à l'arrière\n\nNAVIRE EN DÉTRESSE :\nPeut ajouter 3 coups (• • —) avant/après\npour indiquer sa détresse\n\nATTENTION : navire immobile en zone de navigation\n= danger pour les navires en route",
           en:"VESSEL AT ANCHOR\n\nSignal: BELL rung rapidly for 5 seconds\nInterval: 1 MINUTE (shorter than others!)\n\nLARGE VESSEL (> 100m):\nBELL at bow + GONG at stern\n\nDISTRESS AT ANCHOR:\nMay add 3 strokes (• • —) before/after\nto indicate distress\n\nCAUTION: stationary vessel in navigation area\n= danger for underway vessels",
           es:"BUQUE FONDEADO\n\nSeñal: CAMPANA repicada rápidamente 5 segundos\nIntervalo: 1 MINUTO (¡más corto que los demás!)\n\nBUQUE GRANDE (> 100m):\nCAMPANA en proa + GONG en popa\n\nEN PELIGRO FONDEADO:\nPuede añadir 3 golpes antes/después",
           pt:"NAVIO FUNDEADO\n\nSinal: SINO repicado rapidamente 5 segundos\nIntervalo: 1 MINUTO (mais curto que os outros!)\n\nNAVIO GRANDE (> 100m):\nSINO à proa + GONGO à popa\n\nEM PERIGO FUNDEADO:\nPode adicionar 3 toques antes/depois"},},
    { id:"aground", icon:"🏔️", color:C.red,
      label:{fr:"Navire échoué",en:"Vessel aground",es:"Buque varado",pt:"Navio encalhado"},
      signal:{fr:"3 coups + cloche rapide + 3 coups\nToutes les 1 minute",en:"3 strokes + rapid bell + 3 strokes\nEvery 1 minute",es:"3 golpes + campana rápida + 3 golpes\nCada 1 minuto",pt:"3 toques + sino rápido + 3 toques\nA cada 1 minuto"},
      pattern:[{type:"short"},{type:"short"},{type:"short"},{type:"long"},{type:"short"},{type:"short"},{type:"short"}], interval:60,
      desc:{fr:"NAVIRE ÉCHOUÉ\n\nSignal :\n• • • + CLOCHE RAPIDE + • • •\n(3 coups distincts avant ET après la cloche rapide)\nIntervalle : 1 MINUTE\n\nNAVIRE ÉCHOUÉ = DANGER EXTRÊME\n→ Risque d'obstruction du chenal\n→ Risque de dispersion de cargaison\n→ Risque de pollution\n→ Signal de détresse possible en plus\n\nPEUT AUSSI utiliser sifflet si disponible",
           en:"VESSEL AGROUND\n\nSignal:\n• • • + RAPID BELL + • • •\n(3 distinct strokes before AND after rapid bell)\nInterval: 1 MINUTE\n\nVESSEL AGROUND = EXTREME DANGER\n→ Risk of channel obstruction\n→ Risk of cargo dispersal\n→ Risk of pollution\n→ Possible additional distress signal",
           es:"BUQUE VARADO\n\nSeñal:\n• • • + CAMPANA RÁPIDA + • • •\n(3 golpes distintos antes Y después de la campana rápida)\nIntervalo: 1 MINUTO\n\nBUQUE VARADO = PELIGRO EXTREMO",
           pt:"NAVIO ENCALHADO\n\nSinal:\n• • • + SINO RÁPIDO + • • •\n(3 toques distintos antes E depois do sino rápido)\nIntervalo: 1 MINUTO\n\nNAVIO ENCALHADO = PERIGO EXTREMO"},},
    { id:"pilot", icon:"🧭", color:C.purple,
      label:{fr:"Navire pilote en service",en:"Pilot vessel on duty",es:"Buque práctico en servicio",pt:"Navio de práticos em serviço"},
      signal:{fr:"4 sons courts • • • •\nEn plus du signal normal",en:"4 short blasts • • • •\nIn addition to normal signal",es:"4 sonidos cortos • • • •\nAdemás de la señal normal",pt:"4 sons curtos • • • •\nAlém do sinal normal"},
      pattern:[{type:"short"},{type:"short"},{type:"short"},{type:"short"}], interval:120,
      desc:{fr:"NAVIRE PILOTE EN SERVICE\n(Règle 35h)\n\nSignal spécifique :\n4 SONS COURTS en plus du signal habituel\n\nEN ROUTE EN BROUILLARD :\nSignal de brouillard normal + 4 sons courts\n\nAU MOUILLAGE :\nSignal de mouillage + 4 sons courts\n\nIDENTIFICATION AUDITIVE :\n'4 sons courts = pilote à l'œuvre'\nInformation pour les autres navires",
           en:"PILOT VESSEL ON DUTY\n(Rule 35h)\n\nSpecific signal:\n4 SHORT BLASTS in addition to normal signal\n\nUNDERWAY IN FOG:\nNormal fog signal + 4 short blasts\n\nAT ANCHOR:\nAnchor signal + 4 short blasts\n\nAUDITORY IDENTIFICATION:\n'4 short blasts = pilot in operation'\nInformation for other vessels",
           es:"BUQUE PRÁCTICO EN SERVICIO\n(Regla 35h)\n\nSeñal específica:\n4 SONIDOS CORTOS además de la señal habitual\n\nEN RUTA CON NIEBLA:\nSeñal de niebla normal + 4 sonidos cortos",
           pt:"NAVIO DE PRÁTICOS EM SERVIÇO\n(Regra 35h)\n\nSinal específico:\n4 SONS CURTOS além do sinal habitual\n\nEM ROTA COM NEVOEIRO:\nSinal de nevoeiro normal + 4 sons curtos"},},
  ];

  const sel_ = sel!==null ? vessels[sel] : null;

  return (
    <div>
      {/* Fog effect header */}
      <div style={{background:"linear-gradient(180deg,rgba(180,200,220,0.15) 0%,transparent 100%)",borderRadius:12,padding:"10px 12px",marginBottom:10,border:"1px solid rgba(180,200,220,0.2)",textAlign:"center"}}>
        <div style={{fontSize:12,color:"rgba(180,200,220,0.8)",fontWeight:700}}>
          🌫️ {lang==="fr"?"BROUILLARD — Règle 35 COLREG":lang==="en"?"FOG — COLREG Rule 35":lang==="es"?"NIEBLA — Regla 35 COLREG":"NEVOEIRO — Regra 35 COLREG"}
        </div>
        <div style={{fontSize:9,color:C.muted,marginTop:4}}>
          {lang==="fr"?"Visibilité < 1 mille marin — Signaux obligatoires":lang==="en"?"Visibility < 1 nautical mile — Mandatory signals":lang==="es"?"Visibilidad < 1 milla náutica — Señales obligatorias":"Visibilidade < 1 milha náutica — Sinais obrigatórios"}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {vessels.map((v,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${v.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?v.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18,marginBottom:3}}>{v.icon}</div>
            <div style={{fontSize:8,color:sel===i?v.color:C.muted,fontWeight:700,lineHeight:1.3,marginBottom:4}}>{v.label[lang]||v.label.fr}</div>
            <div style={{fontSize:8,color:v.color,fontFamily:"monospace",fontWeight:700}}>{v.signal[lang]||v.signal.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:4}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:10,color:sel_.color,fontFamily:"monospace",fontWeight:700,marginBottom:8}}>📣 {sel_.signal[lang]||sel_.signal.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — SOUND EQUIPMENT
// ══════════════════════════════════════
function SoundEquipmentSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const equipment = [
    { id:"whistle", icon:"📯", color:C.blue2,
      label:{fr:"Sifflet / Corne de brume",en:"Whistle / Foghorn",es:"Pito / Bocina de niebla",pt:"Apito / Corneta de nevoeiro"},
      req:{fr:"OBLIGATOIRE pour tous les navires",en:"MANDATORY for all vessels",es:"OBLIGATORIO para todos los buques",pt:"OBRIGATÓRIO para todos os navios"},
      desc:{fr:"SIFFLET / CORNE DE BRUME (COLREG Règle 33)\n\nOBLIGATOIRE pour tous les navires\n\nPORTÉES MINIMALES :\n→ Navire ≥ 200m : 2 milles\n→ Navire 75-200m : 1,5 mille\n→ Navire 20-75m : 1 mille\n→ Navire 12-20m : 0,5 mille\n→ Navire < 12m : signal quelconque audible\n\nFRÉQUENCES :\n→ ≥ 200m : 70-200 Hz\n→ 75-200m : 130-350 Hz\n→ < 75m : 250-700 Hz\n\nDURÉE DES SONS :\nCourt = 1 seconde · Long = 4-6 secondes",en:"WHISTLE / FOGHORN (COLREG Rule 33)\n\nMANDATORY for all vessels\n\nMINIMUM RANGES:\n→ Vessel ≥ 200m: 2 miles\n→ Vessel 75-200m: 1.5 miles\n→ Vessel 20-75m: 1 mile\n→ Vessel 12-20m: 0.5 mile\n→ Vessel < 12m: any audible signal\n\nFREQUENCIES:\n→ ≥ 200m: 70-200 Hz\n→ 75-200m: 130-350 Hz\n→ < 75m: 250-700 Hz",es:"PITO / BOCINA DE NIEBLA (COLREG Regla 33)\n\nOBLIGATORIO para todos los buques\n\nALCANCES MÍNIMOS:\n→ Buque ≥ 200m: 2 millas\n→ Buque 75-200m: 1,5 millas\n→ Buque 20-75m: 1 milla\n→ Buque 12-20m: 0,5 millas\n→ Buque < 12m: cualquier señal audible",pt:"APITO / CORNETA DE NEVOEIRO (COLREG Regra 33)\n\nOBRIGATÓRIO para todos os navios\n\nALCANCES MÍNIMOS:\n→ Navio ≥ 200m: 2 milhas\n→ Navio 75-200m: 1,5 milhas\n→ Navio 20-75m: 1 milha\n→ Navio 12-20m: 0,5 milhas\n→ Navio < 12m: qualquer sinal audível"},},
    { id:"bell", icon:"🔔", color:C.gold2,
      label:{fr:"Cloche",en:"Bell",es:"Campana",pt:"Sino"},
      req:{fr:"Navires ≥ 12m (au mouillage)",en:"Vessels ≥ 12m (at anchor)",es:"Buques ≥ 12m (fondeados)",pt:"Navios ≥ 12m (fundeados)"},
      desc:{fr:"CLOCHE (COLREG Règle 33)\n\nOBLIGATOIRE pour navires ≥ 12m\n\nUTILISATION :\n→ Navire au mouillage (en brouillard)\n→ Navire échoué (signal spécial)\n\nSIGNAL :\nBattue RAPIDEMENT pendant 5 secondes\nToutes les 1 MINUTE\n\nGRAND NAVIRE (≥ 100m) :\nUNE cloche à l'AVANT\n+ UN GONG à l'arrière\n\nBATTEMENT DISTINCT :\n3 coups distincts avant = navire échoué\nCloche rapide = mouillage",en:"BELL (COLREG Rule 33)\n\nMANDATORY for vessels ≥ 12m\n\nUSE:\n→ Vessel at anchor (in fog)\n→ Vessel aground (special signal)\n\nSIGNAL:\nRung RAPIDLY for 5 seconds\nEvery 1 MINUTE\n\nLARGE VESSEL (≥ 100m):\nONE bell at BOW\n+ ONE GONG at stern",es:"CAMPANA (COLREG Regla 33)\n\nOBLIGATORIA para buques ≥ 12m\n\nUSO:\n→ Buque fondeado (en niebla)\n→ Buque varado (señal especial)\n\nSeñal: Repicada RÁPIDAMENTE durante 5 segundos\nCada 1 MINUTO\n\nBUQUE GRANDE (≥ 100m):\nUNA campana a PROA + UN GONG a popa",pt:"SINO (COLREG Regra 33)\n\nOBRIGATÓRIO para navios ≥ 12m\n\nUSO:\n→ Navio fundeado (em nevoeiro)\n→ Navio encalhado (sinal especial)\n\nSinal: Repicado RAPIDAMENTE durante 5 segundos\nA cada 1 MINUTO\n\nNAVIO GRANDE (≥ 100m):\nUM sino à PROA + UM GONGO à popa"},},
    { id:"gong", icon:"🎵", color:C.orange,
      label:{fr:"Gong",en:"Gong",es:"Gong",pt:"Gongo"},
      req:{fr:"Navires ≥ 100m (à l'arrière)",en:"Vessels ≥ 100m (at stern)",es:"Buques ≥ 100m (a popa)",pt:"Navios ≥ 100m (a popa)"},
      desc:{fr:"GONG (COLREG Règle 33)\n\nOBLIGATOIRE pour navires ≥ 100m\nPositionné à l'ARRIÈRE du navire\n\nUTILISATION :\nEn COMPLÉMENT de la cloche\nPendant les signaux de mouillage et d'échouage\n\nSON DIFFÉRENT :\nSon plus grave/profond que la cloche\nPermet l'identification directionnelle\n(cloche = avant · gong = arrière)\n\nPETITS NAVIRES < 12m :\nDispensés de cloche et gong\nMais doivent avoir un moyen\nde produire un signal sonore efficace",en:"GONG (COLREG Rule 33)\n\nMANDATORY for vessels ≥ 100m\nPositioned at the STERN of the vessel\n\nUSE:\nIn ADDITION to the bell\nDuring anchor and grounding signals\n\nDIFFERENT SOUND:\nDeeper/lower than bell\nAllows directional identification\n(bell = bow · gong = stern)\n\nSMALL VESSELS < 12m:\nExempt from bell and gong\nBut must have means\nof producing effective sound signal",es:"GONG (COLREG Regla 33)\n\nOBLIGATORIO para buques ≥ 100m\nSituado a POPA del buque\n\nUSO:\nEn COMPLEMENTO de la campana\nDurante las señales de fondeo y varada\n\nSONIDO DIFERENTE:\nMás grave que la campana\nPermite identificación direccional\n(campana = proa · gong = popa)",pt:"GONGO (COLREG Regra 33)\n\nOBRIGATÓRIO para navios ≥ 100m\nPositionado à POPA do navio\n\nUSO:\nEm COMPLEMENTO do sino\nDurante os sinais de fundeamento e encalhe\n\nSOM DIFERENTE:\nMais grave do que o sino\nPermite identificação direcional\n(sino = proa · gongo = popa)"},},
  ];

  const sel_ = sel!==null ? equipment[sel] : null;
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {equipment.map((eq,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            flex:1,padding:"12px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${eq.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?eq.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:26,marginBottom:4}}>{eq.icon}</div>
            <div style={{fontSize:9,color:sel===i?eq.color:C.muted,fontWeight:700,lineHeight:1.3}}>{eq.label[lang]||eq.label.fr}</div>
            <div style={{fontSize:7,color:eq.color,marginTop:3,lineHeight:1.2}}>{eq.req[lang]||eq.req.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SOUND SIGNALS QUIZ
// ══════════════════════════════════════
function SoundQuizSVG({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const qs = {
    fr:[
      { signal:"• •", q:"Quel est ce signal ?", opts:["Je vire à tribord","Je vire à bâbord","Je bats en arrière","Signal de danger"], correct:1 },
      { signal:"— — — — —", q:"5 sons longs en brouillard =", opts:["Navire au mouillage","Signal de détresse","Signal d'urgence","Navire échoué"], correct:1 },
      { signal:"— • •", q:"Signal de brouillard pour :", opts:["Navire à moteur en route","Navire stoppé","Voilier / NUC / RAM / Pêche","Navire au mouillage"], correct:2 },
      { signal:"🔔🔔🔔🔔🔔", q:"Cloche rapide 5s toutes les minutes =", opts:["Navire en route","Navire au mouillage (brouillard)","Navire échoué","Navire à moteur stoppé"], correct:1 },
      { signal:"• • • • •", q:"5 sons courts = ?", opts:["5 virements à tribord","Signal DANGER / incompréhension","Navire pilote","Dépassement accordé"], correct:1 },
    ],
    en:[
      { signal:"• •", q:"What is this signal?", opts:["I am altering to starboard","I am altering to port","My engines going astern","Danger signal"], correct:1 },
      { signal:"— — — — —", q:"5 long blasts in fog =", opts:["Vessel at anchor","Distress signal","Urgency signal","Vessel aground"], correct:1 },
      { signal:"— • •", q:"Fog signal for:", opts:["Power vessel underway","Stopped vessel","Sailing / NUC / RAM / Fishing","Vessel at anchor"], correct:2 },
      { signal:"🔔🔔🔔🔔🔔", q:"Rapid bell 5s every minute =", opts:["Vessel underway","Vessel at anchor (fog)","Vessel aground","Stopped power vessel"], correct:1 },
      { signal:"• • • • •", q:"5 short blasts = ?", opts:["5 turns to starboard","DANGER / doubt signal","Pilot vessel","Overtaking agreed"], correct:1 },
    ],
    es:[
      { signal:"• •", q:"¿Cuál es esta señal?", opts:["Viro a estribor","Viro a babor","Máquinas atrás","Señal de peligro"], correct:1 },
      { signal:"— — — — —", q:"5 sonidos largos en niebla =", opts:["Buque fondeado","Señal de socorro","Señal de urgencia","Buque varado"], correct:1 },
      { signal:"— • •", q:"Señal de niebla para:", opts:["Buque a motor navegando","Buque parado","Velero / NUC / RAM / Pesquero","Buque fondeado"], correct:2 },
      { signal:"🔔🔔🔔🔔🔔", q:"Campana rápida 5s cada minuto =", opts:["Buque en ruta","Buque fondeado (niebla)","Buque varado","Buque a motor parado"], correct:1 },
      { signal:"• • • • •", q:"¿5 sonidos cortos = ?", opts:["5 cambios a estribor","Señal de PELIGRO / duda","Buque práctico","Adelantamiento acordado"], correct:1 },
    ],
    pt:[
      { signal:"• •", q:"Qual é este sinal?", opts:["Estou a virar a estibordo","Estou a virar a bombordo","Motores a trabalhar à ré","Sinal de perigo"], correct:1 },
      { signal:"— — — — —", q:"5 sons longos em nevoeiro =", opts:["Navio fundeado","Sinal de socorro","Sinal de urgência","Navio encalhado"], correct:1 },
      { signal:"— • •", q:"Sinal de nevoeiro para:", opts:["Navio a motor em rota","Navio parado","Veleiro / NUC / RAM / Pesca","Navio fundeado"], correct:2 },
      { signal:"🔔🔔🔔🔔🔔", q:"Sino rápido 5s a cada minuto =", opts:["Navio em rota","Navio fundeado (nevoeiro)","Navio encalhado","Navio a motor parado"], correct:1 },
      { signal:"• • • • •", q:"5 sons curtos = ?", opts:["5 viragens a estibordo","Sinal de PERIGO / dúvida","Navio de práticos","Ultrapassagem acordada"], correct:1 },
    ],
  };

  const list = qs[lang]||qs.fr;
  const [shuffled]=useState(()=>list.map(shuffleQuestionOptions));
  const q = shuffled[qIdx];

  const pick = (i) => {
    if(ans!==null) return;
    setAns(i);
    if(i===q.correct) setScore(s=>s+1);
  };
  const next = () => {
    if(qIdx<list.length-1){setQIdx(q=>q+1);setAns(null);}
    else setDone(true);
  };

  if(done) return (
    <div style={{textAlign:"center",padding:"16px 0"}}>
      <div style={{fontSize:48,marginBottom:8}}>{score>=4?"🏆":score>=3?"🎖️":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white}}>{score}/{list.length}</div>
      <button onClick={()=>{setDone(false);setQIdx(0);setAns(null);setScore(0);}} style={{marginTop:10,padding:"8px 16px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer",fontSize:11}}>
        🔄 {lang==="fr"?"Recommencer":"Restart"}
      </button>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {list.map((_,i)=>(
          <div key={i} style={{flex:1,height:3,borderRadius:3,background:i<qIdx?(i<qIdx?(ans===q.correct&&i===qIdx-1?C.green:C.red):C.green):i===qIdx?C.orange:"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"12px",marginBottom:12,textAlign:"center",border:"1px solid rgba(255,255,255,0.1)"}}>
        <div style={{fontFamily:"monospace",fontSize:24,fontWeight:900,color:C.gold2,letterSpacing:6,marginBottom:4}}>{q.signal}</div>
        <div style={{fontSize:12,color:C.white,fontWeight:600}}>{q.q}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(ans!==null){
            if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}
            else if(i===ans){bg="rgba(192,57,43,0.2)";bd=C.red;}
          }
          return(
            <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:ans!==null?"default":"pointer"}}>
              {opt}
            </button>
          );
        })}
      </div>
      {ans!==null&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.white,cursor:"pointer"}}>
        {qIdx<list.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"SEGUINTE →"):(lang==="fr"?"RÉSULTAT":lang==="en"?"RESULT":lang==="es"?"RESULTADO":"RESULTADO")}
      </button>}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Collision Baltic Carrier / Tern — Détroit du Grand Belt (2001)",teaser:"Pétrolier · cargo · brouillard épais · signaux sonores ignorés · 27 000t fuel · Danemark",what:"Le 29 mars 2001, le pétrolier MV Baltic Carrier (27 000 tonnes de fuel) entre en collision avec le cargo MV Tern dans le détroit du Grand Belt (Danemark) par brouillard épais. Le Baltic Carrier perd 2 700 tonnes de fuel lourd en mer. Deux membres d'équipage du Tern meurent.",cause:"• Brouillard épais — visibilité < 0,1 mille\n• Le Tern n'émettait PAS ses signaux sonores de brouillard\n• Le Baltic Carrier n'avait pas réduit sa vitesse\n• Pas de veille radar efficace sur les deux navires\n• Communication radio insuffisante entre les navires\n• COLREG Règle 35 non respectée (signaux brouillard)",lessons:"✓ COLREG Règle 35 = signaux sonores OBLIGATOIRES en visibilité réduite\n✓ COLREG Règle 6 = vitesse de sécurité en brouillard\n✓ COLREG Règle 19 = conduite par visibilité réduite\n✓ Radar seul ne suffit pas = veille sonore essentielle\n✓ Signal de brouillard navire à moteur = 1 son long toutes les 2 minutes\n✓ Si vous entendez un signal devant vous = réduire la vitesse",link:"🔗 Lien L3 : Les signaux sonores de brouillard ne sont pas optionnels. L'affaire Baltic Carrier illustre que même avec radar, la non-émission des signaux sonores est une faute grave. En brouillard : émettre les signaux + écouter activement + réduire la vitesse = règles de survie."},
    en:{title:"Baltic Carrier / Tern Collision — Great Belt Strait (2001)",teaser:"Tanker · cargo vessel · thick fog · sound signals ignored · 27,000t fuel · Denmark",what:"On March 29, 2001, tanker MV Baltic Carrier (27,000 tonnes of fuel) collides with cargo vessel MV Tern in the Great Belt Strait (Denmark) in thick fog. Baltic Carrier loses 2,700 tonnes of heavy fuel at sea. Two Tern crew members die.",cause:"• Thick fog — visibility < 0.1 miles\n• Tern was NOT emitting its fog sound signals\n• Baltic Carrier had not reduced speed\n• No effective radar watch on either vessel\n• Insufficient radio communication between vessels\n• COLREG Rule 35 not complied with (fog signals)",lessons:"✓ COLREG Rule 35 = MANDATORY sound signals in restricted visibility\n✓ COLREG Rule 6 = safe speed in fog\n✓ COLREG Rule 19 = conduct in restricted visibility\n✓ Radar alone is not enough = active sound watch essential\n✓ Fog signal for power vessel = 1 long blast every 2 minutes\n✓ If you hear a signal ahead = reduce speed",link:"🔗 L3 Link: Fog sound signals are not optional. The Baltic Carrier case illustrates that even with radar, failure to emit sound signals is a serious fault. In fog: emit signals + actively listen + reduce speed = survival rules."},
    es:{title:"Colisión Baltic Carrier / Tern — Estrecho del Gran Belt (2001)",teaser:"Petrolero · carga · niebla espesa · señales sonoras ignoradas · 27.000t fuel · Dinamarca",what:"El 29 de marzo de 2001, el petrolero MV Baltic Carrier (27.000 toneladas de fuel) colisiona con el carguero MV Tern en el estrecho del Gran Belt (Dinamarca) con niebla espesa. El Baltic Carrier pierde 2.700 toneladas de fuel pesado en el mar. Dos tripulantes del Tern mueren.",cause:"• Niebla espesa — visibilidad < 0,1 millas\n• El Tern NO emitía sus señales sonoras de niebla\n• El Baltic Carrier no había reducido la velocidad\n• Sin vigilancia de radar eficaz en ninguno de los dos buques\n• Comunicación de radio insuficiente entre los buques\n• COLREG Regla 35 no respetada",lessons:"✓ COLREG Regla 35 = señales sonoras OBLIGATORIAS con visibilidad reducida\n✓ COLREG Regla 6 = velocidad de seguridad en niebla\n✓ Señal de niebla buque a motor = 1 sonido largo cada 2 minutos\n✓ Si oyes una señal por delante = reducir la velocidad",link:"🔗 Vínculo L3: Las señales sonoras de niebla no son opcionales. El caso Baltic Carrier ilustra que incluso con radar, no emitir señales sonoras es una falta grave. En niebla: emitir señales + escuchar activamente + reducir la velocidad."},
    pt:{title:"Colisão Baltic Carrier / Tern — Estreito do Grande Belt (2001)",teaser:"Petroleiro · carga · nevoeiro espesso · sinais sonoros ignorados · 27.000t fuel · Dinamarca",what:"A 29 de março de 2001, o petroleiro MV Baltic Carrier (27.000 toneladas de fuel) colide com o cargueiro MV Tern no Estreito do Grande Belt (Dinamarca) com nevoeiro espesso. O Baltic Carrier perde 2.700 toneladas de fuelóleo pesado no mar. Dois membros da tripulação do Tern morrem.",cause:"• Nevoeiro espesso — visibilidade < 0,1 milhas\n• O Tern NÃO emitia os seus sinais sonoros de nevoeiro\n• O Baltic Carrier não tinha reduzido a velocidade\n• Sem vigia de radar eficaz em nenhum dos navios\n• Comunicação por rádio insuficiente entre os navios\n• COLREG Regra 35 não cumprida",lessons:"✓ COLREG Regra 35 = sinais sonoros OBRIGATÓRIOS em visibilidade reduzida\n✓ COLREG Regra 6 = velocidade segura em nevoeiro\n✓ Sinal de nevoeiro navio a motor = 1 som longo a cada 2 minutos\n✓ Se ouvir um sinal à frente = reduzir a velocidade",link:"🔗 Vínculo L3: Os sinais sonoros de nevoeiro não são opcionais. O caso Baltic Carrier ilustra que mesmo com radar, não emitir sinais sonoros é uma falta grave."},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🌫️</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>CAUSES</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:""});
  const [showC,setShowC]=useState(false);
  const qs={
    fr:[
      {id:"q1",q:"En brouillard, un navire à moteur EN ROUTE émet quel signal ?\n(Répondre : nombre + type de son)",correct:"1 son long"},
      {id:"q2",q:"5 sons courts = ?\n(Répondre : 2 mots)",correct:"danger doute"},
      {id:"q3",q:"Signal de brouillard d'un VOILIER naviguant à la voile ?\n(Répondre : le code)",correct:"1 long 2 courts"},
    ],
    en:[
      {id:"q1",q:"In fog, a power vessel UNDERWAY sounds what signal?\n(Answer: number + type of blast)",correct:"1 long blast"},
      {id:"q2",q:"5 short blasts = ?\n(Answer: 2 words)",correct:"danger doubt"},
      {id:"q3",q:"Fog signal of a SAILING vessel under sail?\n(Answer: the code)",correct:"1 long 2 short"},
    ],
    es:[
      {id:"q1",q:"En niebla, ¿un buque a motor EN RUTA emite qué señal?\n(Responder: número + tipo de sonido)",correct:"1 sonido largo"},
      {id:"q2",q:"¿5 sonidos cortos = ?\n(Responder: 2 palabras)",correct:"peligro duda"},
      {id:"q3",q:"¿Señal de niebla de un VELERO navegando a vela?\n(Responder: el código)",correct:"1 largo 2 cortos"},
    ],
    pt:[
      {id:"q1",q:"Em nevoeiro, um navio a motor EM ROTA emite que sinal?\n(Responder: número + tipo de som)",correct:"1 som longo"},
      {id:"q2",q:"5 sons curtos = ?\n(Responder: 2 palavras)",correct:"perigo dúvida"},
      {id:"q3",q:"Sinal de nevoeiro de um VELEIRO navegando à vela?\n(Responder: o código)",correct:"1 longo 2 curtos"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("1")&&(v.includes("long")||v.includes("largo")||v.includes("longo"));
    if(q.id==="q2") return (v.includes("danger")||v.includes("peligro")||v.includes("perigo"))&&(v.includes("doute")||v.includes("doubt")||v.includes("duda")||v.includes("dúvida")||v.includes("doubt"));
    if(q.id==="q3") return v.includes("1")&&(v.includes("long")||v.includes("largo")||v.includes("longo"))&&v.includes("2")&&(v.includes("court")||v.includes("short")||v.includes("corto")||v.includes("curto"));
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.orange}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Moteur en route = 1 long · 5 courts = danger · Voilier = 1 long + 2 courts"
        :lang==="en"?"💡 Reminders: Power underway = 1 long · 5 short = danger · Sailing = 1 long + 2 short"
        :lang==="es"?"💡 Recordatorios: Motor navegando = 1 largo · 5 cortos = peligro · Velero = 1 largo + 2 cortos"
        :"💡 Lembretes: Motor em rota = 1 longo · 5 curtos = perigo · Veleiro = 1 longo + 2 curtos"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:13,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: 1 SON LONG toutes les 2 minutes (navire à moteur faisant route en brouillard · Règle 35)\n✅ Q2: DANGER / DOUTE (5 sons courts = signal d'alarme quand l'autre navire ne manœuvre pas)\n✅ Q3: 1 LONG + 2 COURTS (voilier · mais aussi NUC · RAM · pêche · remorqueur)"
        :lang==="en"?"✅ Q1: 1 LONG BLAST every 2 minutes (power vessel making way in fog · Rule 35)\n✅ Q2: DANGER / DOUBT (5 short blasts = alarm signal when other vessel not maneuvering)\n✅ Q3: 1 LONG + 2 SHORT (sailing · but also NUC · RAM · fishing · tug)"
        :"✅ Q1: 1 SONIDO LARGO cada 2 minutos · Q2: PELIGRO / DUDA · Q3: 1 LARGO + 2 CORTOS"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"En visibilité normale, que signifie 1 son court émis par un navire ?",opts:["Il bat en arrière","Il vire à TRIBORD (COLREG Règle 34)","Il demande un pilote","Signal de danger"],correct:1,expl:"COLREG Règle 34 (signaux de manœuvres et d'avertissement) : 1 son court = je vire à TRIBORD. 2 sons courts = je vire à BÂBORD. 3 sons courts = mes machines battent en ARRIÈRE. Ces signaux s'utilisent UNIQUEMENT en bonne visibilité, lors de manœuvres. En brouillard, les signaux sont différents (Règle 35). Durée d'un son court : environ 1 seconde."},
    {q:"En visibilité réduite (brouillard), un navire à moteur STOPPÉ émet quel signal ?",opts:["1 son long","2 sons longs toutes les 2 minutes","3 sons courts","Cloche rapide"],correct:1,expl:"COLREG Règle 35 : Navire à moteur STOPPÉ (sans erre) = 2 SONS LONGS (— —) toutes les 2 minutes. Navire à moteur FAISANT ROUTE = 1 son long (—) toutes les 2 minutes. ATTENTION : 'stoppé' ne signifie pas immobile — le navire peut dériver. La différence 1 long vs 2 longs permet d'identifier si le navire est en mouvement ou non."},
    {q:"Quel signal sonore de brouillard est commun au voilier, au navire NUC et au navire de pêche ?",opts:["1 son long","2 sons longs","1 son long + 2 sons courts","3 sons courts"],correct:2,expl:"COLREG Règle 35 : Le signal 1 SON LONG + 2 SONS COURTS (— • •) est utilisé par : voilier en route (sous voile), navire NUC (sans gouverne), navire RAM (manœuvrabilité restreinte), navire CBD (contraint par tirant d'eau), navire de pêche (engins déployés), remorqueur en remorquage. Ce signal unique pour plusieurs situations = tous sont en situation spéciale/restreinte."},
    {q:"Quand un navire au mouillage entend 5 sons courts, que doit-il faire ?",opts:["Ne rien faire — il est à l'arrêt","Répondre par 5 sons courts","Émettre son signal de mouillage ET être prêt à manœuvrer en urgence","Allumer ses feux de mouillage"],correct:2,expl:"5 sons courts = signal de DANGER / DOUTE émis par un navire en mouvement qui n'est pas sûr des actions de l'autre. Si vous l'entendez : TOUTE LA VIGILANCE est requise. Si vous êtes au mouillage, vous devez : émettre vos signaux sonores de mouillage pour indiquer votre position, être prêt à manœuvrer pour dégager si nécessaire, utiliser le VHF pour communiquer, éventuellement mouiller une ancre supplémentaire."},
    {q:"Quelle est la portée minimale du sifflet d'un navire de 80 mètres ?",opts:["0,5 mille","1 mille","1,5 milles","2 milles"],correct:2,expl:"COLREG Règle 22 + Annexe III : portées minimales des sifflets. Navire 75-200m = 1,5 MILES. Navire ≥ 200m = 2 miles. Navire 20-75m = 1 mile. Navire 12-20m = 0,5 mile. Navire < 12m = signal quelconque audible. Un navire de 80m est dans la catégorie 75-200m donc portée minimale = 1,5 milles."},
  ],
  en:[
    {q:"In normal visibility, what does 1 short blast from a vessel mean?",opts:["Engines going astern","It is altering to STARBOARD (COLREG Rule 34)","Requesting a pilot","Danger signal"],correct:1,expl:"COLREG Rule 34 (maneuvering and warning signals): 1 short blast = I am altering to STARBOARD. 2 short blasts = I am altering to PORT. 3 short blasts = my engines are going ASTERN. These signals are used ONLY in good visibility during maneuvers. In fog, signals are different (Rule 35). Duration of a short blast: approximately 1 second."},
    {q:"In restricted visibility (fog), a STOPPED power vessel sounds what signal?",opts:["1 long blast","2 long blasts every 2 minutes","3 short blasts","Rapid bell"],correct:1,expl:"COLREG Rule 35: STOPPED power vessel (not making way) = 2 LONG BLASTS (— —) every 2 minutes. Power vessel MAKING WAY = 1 long blast (—) every 2 minutes. CAUTION: 'stopped' doesn't mean stationary — vessel may be drifting. The difference 1 long vs 2 longs allows identification of whether vessel is moving or not."},
    {q:"Which fog sound signal is common to sailing vessel, NUC vessel and fishing vessel?",opts:["1 long blast","2 long blasts","1 long blast + 2 short blasts","3 short blasts"],correct:2,expl:"COLREG Rule 35: The signal 1 LONG + 2 SHORT BLASTS (— • •) is used by: sailing vessel underway (under sail), NUC vessel (not under command), RAM vessel (restricted maneuverability), CBD vessel (constrained by draught), fishing vessel (gear deployed), tug when towing. This single signal for multiple situations = all are in special/restricted situations."},
    {q:"When an anchored vessel hears 5 short blasts, what should it do?",opts:["Do nothing — it's stationary","Reply with 5 short blasts","Sound its anchor signal AND be ready to maneuver urgently","Turn on its anchor lights"],correct:2,expl:"5 short blasts = DANGER/DOUBT signal from a moving vessel unsure about the other's actions. If you hear it: ALL VIGILANCE is required. If you are at anchor: sound your anchor signals to indicate position, be ready to maneuver to clear if necessary, use VHF to communicate, possibly deploy extra anchor."},
    {q:"What is the minimum range of the whistle of an 80-meter vessel?",opts:["0.5 mile","1 mile","1.5 miles","2 miles"],correct:2,expl:"COLREG Rule 22 + Annex III: minimum whistle ranges. Vessel 75-200m = 1.5 MILES. Vessel ≥ 200m = 2 miles. Vessel 20-75m = 1 mile. Vessel 12-20m = 0.5 mile. Vessel < 12m = any audible signal. An 80m vessel is in the 75-200m category, therefore minimum range = 1.5 miles."},
  ],
  es:[
    {q:"¿En visibilidad normal, qué significa 1 sonido corto emitido por un buque?",opts:["Máquinas dando atrás","Vira a ESTRIBOR (COLREG Regla 34)","Solicita un práctico","Señal de peligro"],correct:1,expl:"COLREG Regla 34 (señales de maniobra y advertencia): 1 sonido corto = viro a ESTRIBOR. 2 sonidos cortos = viro a BABOR. 3 sonidos cortos = mis máquinas dan ATRÁS. Estas señales se usan SOLO con buena visibilidad, durante maniobras. En niebla, las señales son diferentes (Regla 35). Duración de un sonido corto: aproximadamente 1 segundo."},
    {q:"¿Con visibilidad reducida (niebla), un buque a motor PARADO emite qué señal?",opts:["1 sonido largo","2 sonidos largos cada 2 minutos","3 sonidos cortos","Campana rápida"],correct:1,expl:"COLREG Regla 35: Buque a motor PARADO (sin arrancada) = 2 SONIDOS LARGOS (— —) cada 2 minutos. Buque a motor HACIENDO CAMINO = 1 sonido largo (—) cada 2 minutos. ATENCIÓN: 'parado' no significa inmóvil — el buque puede derivar. La diferencia 1 largo vs 2 largos permite identificar si el buque está en movimiento o no."},
    {q:"¿Qué señal sonora de niebla es común al velero, al buque NUC y al buque pesquero?",opts:["1 sonido largo","2 sonidos largos","1 sonido largo + 2 cortos","3 sonidos cortos"],correct:2,expl:"COLREG Regla 35: La señal 1 LARGO + 2 CORTOS (— • •) la usan: velero navegando (a vela), buque NUC (sin gobierno), buque RAM (maniobrabilidad restringida), buque CBD, buque pesquero (artes calados), remolcador remolcando. Esta señal única para varias situaciones = todos están en situación especial/restringida."},
    {q:"Cuando un buque fondeado escucha 5 sonidos cortos, ¿qué debe hacer?",opts:["No hacer nada — está parado","Responder con 5 sonidos cortos","Emitir su señal de fondeo Y estar listo para maniobrar de urgencia","Encender sus luces de fondeo"],correct:2,expl:"5 sonidos cortos = señal de PELIGRO / DUDA de un buque en movimiento que no está seguro de las acciones del otro. Si lo escuchas: SE REQUIERE TODA LA VIGILANCIA. Si estás fondeado: emite tus señales de fondeo para indicar tu posición, prepárate para maniobrar, usa el VHF para comunicarte."},
    {q:"¿Cuál es el alcance mínimo del pito de un buque de 80 metros?",opts:["0,5 millas","1 milla","1,5 millas","2 millas"],correct:2,expl:"COLREG Regla 22 + Anexo III: alcances mínimos de los pitos. Buque 75-200m = 1,5 MILLAS. Buque ≥ 200m = 2 millas. Buque 20-75m = 1 milla. Buque 12-20m = 0,5 millas. Un buque de 80m está en la categoría 75-200m, por lo que el alcance mínimo = 1,5 millas."},
  ],
  pt:[
    {q:"Em visibilidade normal, o que significa 1 som curto emitido por um navio?",opts:["Motores a trabalhar à ré","Está a virar para ESTIBORDO (COLREG Regra 34)","Solicitando um prático","Sinal de perigo"],correct:1,expl:"COLREG Regra 34 (sinais de manobra e aviso): 1 som curto = estou a virar para ESTIBORDO. 2 sons curtos = estou a virar para BOMBORDO. 3 sons curtos = os meus motores estão a trabalhar à RÉ. Estes sinais são usados APENAS com boa visibilidade, durante manobras. Em nevoeiro, os sinais são diferentes (Regra 35). Duração de um som curto: aproximadamente 1 segundo."},
    {q:"Em visibilidade reduzida (nevoeiro), um navio a motor PARADO emite que sinal?",opts:["1 som longo","2 sons longos a cada 2 minutos","3 sons curtos","Sino rápido"],correct:1,expl:"COLREG Regra 35: Navio a motor PARADO (sem arrancada) = 2 SONS LONGOS (— —) a cada 2 minutos. Navio a motor A FAZER CAMINHO = 1 som longo (—) a cada 2 minutos. ATENÇÃO: 'parado' não significa imóvel — o navio pode estar a derivar. A diferença 1 longo vs 2 longos permite identificar se o navio está em movimento ou não."},
    {q:"Que sinal sonoro de nevoeiro é comum ao veleiro, ao navio NUC e ao navio de pesca?",opts:["1 som longo","2 sons longos","1 som longo + 2 sons curtos","3 sons curtos"],correct:2,expl:"COLREG Regra 35: O sinal 1 LONGO + 2 CURTOS (— • •) é usado por: veleiro em rota (à vela), navio NUC (sem governo), navio RAM (manobabilidade restrita), navio CBD, navio de pesca (aparelhos calados), rebocador a rebocar. Este sinal único para várias situações = todos estão em situação especial/restrita."},
    {q:"Quando um navio fundeado ouve 5 sons curtos, o que deve fazer?",opts:["Nada — está parado","Responder com 5 sons curtos","Emitir o seu sinal de fundeamento E estar pronto para manobrar urgentemente","Acender as suas luzes de fundeamento"],correct:2,expl:"5 sons curtos = sinal de PERIGO/DÚVIDA de um navio em movimento que não tem certeza das ações do outro. Se ouvir: TODA A VIGILÂNCIA é necessária. Se estiver fundeado: emita os seus sinais de fundeamento para indicar posição, esteja pronto para manobrar, use o VHF para comunicar."},
    {q:"Qual é o alcance mínimo do apito de um navio de 80 metros?",opts:["0,5 milhas","1 milha","1,5 milhas","2 milhas"],correct:2,expl:"COLREG Regra 22 + Anexo III: alcances mínimos dos apitos. Navio 75-200m = 1,5 MILHAS. Navio ≥ 200m = 2 milhas. Navio 20-75m = 1 milha. Navio 12-20m = 0,5 milhas. Um navio de 80m está na categoria 75-200m, portanto alcance mínimo = 1,5 milhas."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que la 'vitesse de sécurité' en brouillard (COLREG Règle 6) ?",opts:["La vitesse maximale autorisée","Vitesse permettant de prendre des mesures efficaces pour éviter une collision et s'arrêter dans une distance appropriée aux circonstances","La vitesse du vent","La vitesse du courant"],correct:1,expl:"COLREG Règle 6 (vitesse de sécurité) = vitesse adaptée aux circonstances permettant de s'arrêter et manœuvrer à temps. Facteurs : visibilité, densité du trafic, manœuvrabilité, état de la mer, courant, fonds, tirant d'eau. En brouillard : souvent réduction drastique de la vitesse. Principe : être capable de s'arrêter dans la moitié de la distance de visibilité. Si 200m de visibilité → pouvoir s'arrêter en 100m."},
    {q:"Qu'est-ce que la Règle 19 COLREG sur la 'conduite par visibilité réduite' ?",opts:["Une règle météo","Règle imposant marche à la vitesse de sécurité + radar veille + signaux sonores + évitement si contact radar à l'avant du travers","Une règle de mouillage","Une règle de port"],correct:1,expl:"COLREG Règle 19 = conduite par visibilité réduite. Obligations : aller à vitesse de sécurité (Règle 6), veille radar continue, être prêt à stopper. Si contact radar : déterminer s'il y a risque d'abordage. Si contact radar par l'avant du travers : RÉDUIRE LA VITESSE au minimum ou stopper. Éviter les manœuvres vers le bâbord si contact à gauche."},
    {q:"Dans un chenal étroit (Règle 9), comment un navire signal-t-il son intention de dépasser ?",opts:["Radio VHF uniquement","1 son long + 1 court = dépasser par tribord · 1 long + 2 courts = dépasser par bâbord · Réponse: — • — • si accord","Par signaux lumineux","Par pavillons"],correct:1,expl:"Chenal étroit (Règle 9) + dépassement : signal sonore AVANT de dépasser. — • = je veux vous dépasser par votre tribord. — • • = je veux vous dépasser par votre bâbord. ACCORD du navire dépassé : — • — • (1 long + 1 court + 1 long + 1 court). REFUS : 5 sons courts (signal de doute/danger). Ce protocole s'utilise dans les chenaux étroits ou voies navigables."},
    {q:"Qu'est-ce que le signal sonore 'approche d'un angle mort' (COLREG Règle 9b) ?",opts:["Signal de détresse","1 son long émis par un navire approchant un coude ou une zone où d'autres navires peuvent être cachés — réponse par 1 son long","Signal de mouillage","Signal de remorquage"],correct:1,expl:"COLREG Règle 9b : Dans les chenaux et voies d'eau étroits où d'autres navires peuvent être cachés (virages, obstructions), le navire en approche émet 1 SON LONG. Si un navire est présent de l'autre côté : il répond par 1 SON LONG. Le premier navire peut alors savoir si la voie est libre ou non. Utilisé dans les rivières, les canaux, les bras de port, les passes étroites."},
    {q:"Quel équipement sonore est OBLIGATOIRE pour un navire de 150 mètres de long au mouillage ?",opts:["Sifflet uniquement","Sifflet + Cloche à l'avant + Gong à l'arrière","Sifflet + Cloche uniquement","Gong uniquement"],correct:1,expl:"Navire ≥ 100m au mouillage = CLOCHE à l'avant + GONG à l'arrière (COLREG Annexe III + Règle 33). Le signal de mouillage = cloche rapide 5s toutes les minutes (avant) + gong rapide 5s immédiatement après (arrière). Un navire de 150m doit obligatoirement les deux. Le SIFFLET est également obligatoire pour les signaux de brouillard en route."},
    {q:"Comment un navire en détresse AU MOUILLAGE en brouillard signale-t-il sa situation ?",opts:["5 sons courts uniquement","Signal de mouillage (cloche rapide) + AJOUT de 3 coups distincts avant et/ou après la cloche pour signaler la détresse","Mayday radio uniquement","2 sons longs"],correct:1,expl:"Navire AU MOUILLAGE EN DÉTRESSE : signal de mouillage normal (cloche 5s/1 min) + 3 coups DISTINCTS avant ET après la cloche rapide. Ces 3 coups additionnels signifient 'je suis en détresse — venez m'aider'. En parallèle : Mayday sur VHF 16, signaux pyrotechniques si de nuit, MF/HF si équipé. Le signal sonore seul permet la localisation auditive."},
    {q:"Qu'est-ce que le signal sonore 'je bats en arrière' et sa durée ?",opts:["1 son long","3 sons courts d'environ 1 seconde chacun","3 sons longs","5 sons courts"],correct:1,expl:"3 sons courts = 'mes machines battent en arrière'. DURÉE : 1 son court = environ 1 seconde. Utilisé en visibilité normale seulement (manœuvres). ATTENTION : ne signifie pas que le navire recule. L'inertie d'un grand navire peut maintenir une vitesse en avant même avec les machines en arrière. En port : signal important lors des manœuvres d'accostage. Souvent émis par le pilote comme information à l'équipage des remorqueurs."},
    {q:"Quel est l'intervalle maximum entre deux signaux de brouillard pour un navire à moteur en route ?",opts:["30 secondes","1 minute","2 minutes","5 minutes"],correct:2,expl:"COLREG Règle 35a : navire à moteur faisant route (making way) = 1 son long toutes les 2 MINUTES au maximum. Navire à moteur stoppé = 2 sons longs toutes les 2 minutes. Navire au mouillage = cloche rapide 5s toutes les 1 MINUTE (interval plus court !). Note : l'intervalle de 2 minutes est un MAXIMUM — le navire peut émettre plus souvent si les circonstances l'exigent."},
    {q:"Dans quelle situation un navire émet-il 5 sons courts ?",opts:["Pour saluer un port","Signal de danger/doute quand l'autre navire ne semble pas prendre de mesures suffisantes — ou signal d'incompréhension","Pour annoncer son départ","Signal de mouillage"],correct:1,expl:"5 sons courts = signal de DANGER / DOUTE (Rule 34d). À utiliser quand : vous ne comprenez pas les intentions d'un autre navire, vous estimez que l'autre navire ne prend pas de mesures suffisantes pour éviter la collision, la situation devient dangereuse. Peut aussi être émis par un navire ancré si un navire entrant présente un risque. Ce n'est PAS un signal de détresse — c'est un signal d'alarme entre navires."},
    {q:"En visibilité réduite, qu'est-ce qu'un navire doit faire en entendant un signal de brouillard par l'avant du travers ?",opts:["Accélérer pour dépasser","Réduire sa vitesse au minimum, voire stopper, et naviguer avec extrême prudence","Ne rien changer","Émettre 5 sons courts"],correct:1,expl:"COLREG Règle 19d : Si contact sonore (ou radar) par l'avant du travers → RÉDUIRE LA VITESSE au minimum ou STOPPER. Manœuvrer avec extrême prudence. NE PAS virer à bâbord si contact à gauche. NE PAS accélérer. Cette règle est fondamentale : en brouillard, accélérer pour dépasser = faute grave. Baltic Carrier vs Tern (2001) : non-réduction de vitesse = facteur d'accident."},
    {q:"Qu'est-ce que le signal sonore d'un remorqueur en train de remorquer dans le brouillard ?",opts:["1 son long","2 sons longs","1 son long + 2 sons courts (même signal que voilier)","3 sons courts"],correct:2,expl:"COLREG Règle 35c : remorqueur EN REMORQUAGE = 1 SON LONG + 2 SONS COURTS (— • •) toutes les 2 minutes. Même signal que voilier, NUC, RAM, pêche. Le navire REMORQUÉ (s'il est habité) émet aussi 1 son long + 2 sons courts juste après le remorqueur. Attention : en visibilité réduite, la chaîne de sons (remorqueur + remorqué) permet d'identifier la longueur de la remorque."},
    {q:"Qu'est-ce que la 'veille sonore' obligatoire en navigation ?",opts:["Une obligation optionnelle","Obligation COLREG Règle 5 d'écouter attentivement les signaux sonores pour détecter les navires non visibles — microphone ou personnel de quart dédié","Une obligation météo","Un équipement optionnel"],correct:1,expl:"Veille sonore = obligation COLREG Règle 5 (veille permanente). En brouillard : écoute permanente des signaux sonores OBLIGATOIRE. Permet de : détecter un navire avant de le voir sur le radar, identifier le type de navire (1 long = moteur en route, etc.), localiser approximativement la direction. Moyens : personnel de quart à l'écoute, VHF canal 16, cornes de brume si équipées d'un récepteur, système de veille sonore électronique."},
    {q:"Un voilier peut-il substituer son sifflet pour un autre dispositif sonore en brouillard ?",opts:["Non — sifflet obligatoire","Oui — un navire < 12m peut utiliser tout dispositif sonore efficace à la place des équipements réglementaires","Non — uniquement corne de brume","Oui — mais uniquement dans les ports"],correct:1,expl:"COLREG Règle 33 : Navire < 12m = peut avoir un autre moyen sonore audible efficace (pas forcément un sifflet réglementaire). Peut inclure : corne à bouche, corne à pression, klaxon, etc. Doit être AUDIBLE à distance raisonnable. Navires ≥ 12m : cloche obligatoire. Navires ≥ 20m : sifflet obligatoire avec portée réglementaire. Plus le navire est grand, plus les exigences sont strictes."},
    {q:"Qu'est-ce que le signal 'maison de garde' (watchman signal) émis la nuit par un navire au mouillage ?",opts:["Un signal radio","Faculté pour un navire au mouillage d'émettre JUSQU'À 3 sons courts · 1 son long · 3 sons courts pour signaler sa présence","Un signal lumineux","Un signal de détresse"],correct:1,expl:"COLREG Règle 35g : navire au mouillage peut émettre en PLUS du signal normal de mouillage : jusqu'à 3 sons courts + 1 son long + 3 sons courts (• • • — • • •) pour signaler sa position à un navire approchant et lui permettre de localiser le danger. Ce signal supplémentaire n'est PAS obligatoire mais fortement recommandé si un navire approchant est détecté."},
    {q:"Dans un environnement maritime en brouillard, quelle règle de priorité s'applique aux signaux sonores ?",opts:["Le plus grand navire a la priorité","COLREG Règle 35 : priorité absolue aux navires NUC et RAM pour les signaux — les autres navires doivent s'écarter","Le navire avec le plus fort signal a la priorité","La règle de la route s'applique sans changement"],correct:1,expl:"En visibilité réduite, les règles de priorité classiques s'appliquent ENCORE : navires NUC, RAM, pêche, CBD conservent leur priorité. Cependant : TOUS doivent émettre leurs signaux. La priorité ne dispense pas de signaler sa présence. En brouillard, les signaux sonores servent à : détecter la présence, identifier le type, évaluer la direction. La Règle 19 (conduite par VR) s'applique à TOUS sans exception."},
  ],
  en:[
    {q:"What is 'safe speed' in fog (COLREG Rule 6)?",opts:["Maximum permitted speed","Speed allowing effective action to avoid collision and stop in appropriate distance given the circumstances","Wind speed","Current speed"],correct:1,expl:"COLREG Rule 6 (safe speed) = speed adapted to circumstances allowing stopping and maneuvering in time. Factors: visibility, traffic density, maneuverability, sea state, current, depth, draught. In fog: often drastic speed reduction. Principle: be able to stop within half the visibility distance. If 200m visibility → must stop in 100m."},
    {q:"What is COLREG Rule 19 on 'conduct in restricted visibility'?",opts:["A weather rule","Rule requiring safe speed + radar watch + sound signals + avoiding if radar contact ahead of beam","An anchor rule","A port rule"],correct:1,expl:"COLREG Rule 19 = conduct in restricted visibility. Obligations: safe speed (Rule 6), continuous radar watch, ready to stop. If radar contact: determine if collision risk. If radar contact ahead of beam: REDUCE SPEED to minimum or stop. Avoid maneuvers to port if contact on port side."},
    {q:"In a narrow channel (Rule 9), how does a vessel signal intention to overtake?",opts:["VHF radio only","1 long + 1 short = overtake on starboard · 1 long + 2 short = overtake on port · Response: — • — • if agreed","By light signals","By flags"],correct:1,expl:"Narrow channel (Rule 9) + overtaking: sound signal BEFORE overtaking. — • = I wish to overtake on your starboard. — • • = I wish to overtake on your port. AGREEMENT from overtaken vessel: — • — • (1 long + 1 short + 1 long + 1 short). REFUSAL: 5 short blasts (doubt/danger signal). This protocol is used in narrow channels and waterways."},
    {q:"What is the 'blind bend' sound signal (COLREG Rule 9b)?",opts:["Distress signal","1 long blast emitted by vessel approaching a bend or area where other vessels may be hidden — response by 1 long blast","Anchor signal","Towing signal"],correct:1,expl:"COLREG Rule 9b: In narrow channels and waterways where other vessels may be hidden (bends, obstructions), the approaching vessel sounds 1 LONG BLAST. If a vessel is present on the other side: it responds with 1 LONG BLAST. The first vessel then knows if the way is clear or not. Used in rivers, canals, port arms, narrow passages."},
    {q:"What sound equipment is MANDATORY for a 150-meter vessel at anchor?",opts:["Whistle only","Whistle + Bell at bow + Gong at stern","Whistle + Bell only","Gong only"],correct:1,expl:"Vessel ≥ 100m at anchor = BELL at bow + GONG at stern (COLREG Annex III + Rule 33). Anchor signal = rapid bell 5s every minute (forward) + rapid gong 5s immediately after (aft). A 150m vessel must have both. The WHISTLE is also mandatory for underway fog signals."},
    {q:"How does a vessel in distress AT ANCHOR in fog signal its situation?",opts:["5 short blasts only","Anchor signal (rapid bell) + ADD 3 distinct strokes before and/or after the bell to signal distress","Mayday radio only","2 long blasts"],correct:1,expl:"Vessel AT ANCHOR IN DISTRESS: normal anchor signal (bell 5s/1 min) + 3 DISTINCT strokes before AND after the rapid bell. These 3 additional strokes mean 'I am in distress — come help me'. In parallel: Mayday on VHF 16, pyrotechnics if nighttime, MF/HF if equipped. Sound signal alone allows auditory localization."},
    {q:"What is the 'engines going astern' sound signal and its duration?",opts:["1 long blast","3 short blasts of approximately 1 second each","3 long blasts","5 short blasts"],correct:1,expl:"3 short blasts = 'my engines are going astern'. DURATION: 1 short blast = approximately 1 second. Used in normal visibility only (maneuvers). CAUTION: doesn't mean the vessel is reversing. The inertia of a large vessel may maintain forward speed even with engines astern. In port: important signal during berthing maneuvers. Often emitted by pilot as information to tug crews."},
    {q:"What is the maximum interval between two fog signals for an underway power vessel?",opts:["30 seconds","1 minute","2 minutes","5 minutes"],correct:2,expl:"COLREG Rule 35a: power vessel making way = 1 long blast every 2 MINUTES maximum. Stopped power vessel = 2 long blasts every 2 minutes. Vessel at anchor = rapid bell 5s every 1 MINUTE (shorter interval!). Note: 2-minute interval is a MAXIMUM — vessel may signal more often if circumstances require."},
    {q:"In what situation does a vessel emit 5 short blasts?",opts:["To greet a port","Danger/doubt signal when other vessel doesn't seem to be taking sufficient action — or signal of misunderstanding","To announce departure","Anchor signal"],correct:1,expl:"5 short blasts = DANGER/DOUBT signal (Rule 34d). Use when: you don't understand another vessel's intentions, you believe the other vessel is not taking sufficient action to avoid collision, situation is becoming dangerous. May also be emitted by anchored vessel if entering vessel poses a risk. This is NOT a distress signal — it's an alarm signal between vessels."},
    {q:"In restricted visibility, what must a vessel do upon hearing a fog signal ahead of the beam?",opts:["Accelerate to pass","Reduce speed to minimum, even stop, and navigate with extreme caution","Change nothing","Sound 5 short blasts"],correct:1,expl:"COLREG Rule 19d: If sound (or radar) contact ahead of beam → REDUCE SPEED to minimum or STOP. Maneuver with extreme caution. DO NOT alter to port if contact on left. DO NOT accelerate. This rule is fundamental: in fog, accelerating to overtake = serious fault. Baltic Carrier vs Tern (2001): failure to reduce speed = accident factor."},
    {q:"What is the fog sound signal of a tug when towing?",opts:["1 long blast","2 long blasts","1 long blast + 2 short blasts (same signal as sailing vessel)","3 short blasts"],correct:2,expl:"COLREG Rule 35c: tug WHEN TOWING = 1 LONG + 2 SHORT BLASTS (— • •) every 2 minutes. Same signal as sailing vessel, NUC, RAM, fishing. The TOWED VESSEL (if manned) also emits 1 long + 2 short just after the tug. Note: in restricted visibility, the sound sequence (tug + towed) allows identification of tow length."},
    {q:"What is the mandatory 'sound watch' in navigation?",opts:["An optional obligation","COLREG Rule 5 obligation to listen carefully for sound signals to detect non-visible vessels — dedicated microphone or watch personnel","A weather obligation","Optional equipment"],correct:1,expl:"Sound watch = COLREG Rule 5 obligation (permanent lookout). In fog: MANDATORY continuous listening for sound signals. Allows: detecting a vessel before seeing it on radar, identifying vessel type (1 long = power underway, etc.), approximately locating direction. Means: watch personnel listening, VHF channel 16, foghorn with receiver if equipped, electronic sound monitoring system."},
    {q:"Can a sailing vessel substitute its whistle for another sound device in fog?",opts:["No — whistle mandatory","Yes — a vessel < 12m may use any effective sound device instead of regulatory equipment","No — only foghorn","Yes — but only in ports"],correct:1,expl:"COLREG Rule 33: Vessel < 12m = may have another effective audible means (not necessarily a regulatory whistle). May include: mouth horn, pressure horn, klaxon, etc. Must be AUDIBLE at reasonable distance. Vessels ≥ 12m: bell mandatory. Vessels ≥ 20m: whistle mandatory with regulatory range. The larger the vessel, the stricter the requirements."},
    {q:"What is the 'watchman signal' emitted at night by an anchored vessel?",opts:["A radio signal","Option for anchored vessel to sound UP TO 3 short · 1 long · 3 short to signal presence","A light signal","A distress signal"],correct:1,expl:"COLREG Rule 35g: anchored vessel may emit IN ADDITION to normal anchor signal: up to 3 short + 1 long + 3 short (• • • — • • •) to signal its position to an approaching vessel. This optional additional signal is strongly recommended if an approaching vessel is detected."},
    {q:"In a foggy maritime environment, what priority rule applies to sound signals?",opts:["Largest vessel has priority","COLREG Rule 35: absolute priority to NUC and RAM vessels for signals — other vessels must give way","Vessel with strongest signal has priority","Road rules apply unchanged"],correct:1,expl:"In restricted visibility, classic priority rules STILL apply: NUC, RAM, fishing, CBD vessels retain their priority. However: ALL must emit their signals. Priority doesn't exempt from signaling presence. In fog, sound signals serve to: detect presence, identify type, assess direction. Rule 19 (conduct in RV) applies to ALL without exception."},
  ],
  es:[
    {q:"¿Qué es la 'velocidad de seguridad' en niebla (COLREG Regla 6)?",opts:["La velocidad máxima permitida","Velocidad que permite tomar medidas eficaces para evitar una colisión y detenerse en una distancia apropiada a las circunstancias","La velocidad del viento","La velocidad de la corriente"],correct:1,expl:"COLREG Regla 6 (velocidad de seguridad) = velocidad adaptada a las circunstancias. Factores: visibilidad, densidad del tráfico, maniobrabilidad, estado del mar, corriente, fondos, calado. En niebla: a menudo reducción drástica de velocidad. Principio: poder detenerse en la mitad de la distancia de visibilidad."},
    {q:"¿Qué es la Regla 19 del COLREG sobre la 'conducta con visibilidad reducida'?",opts:["Una regla meteorológica","Regla que impone marcha a velocidad de seguridad + radar de guardia + señales sonoras + evitación si contacto radar por delante del través","Una regla de fondeo","Una regla de puerto"],correct:1,expl:"COLREG Regla 19 = conducta con visibilidad reducida. Obligaciones: ir a velocidad de seguridad, guardia de radar continua, preparado para parar. Si contacto radar: determinar si hay riesgo de abordaje. Si contacto radar por delante del través: REDUCIR LA VELOCIDAD al mínimo o parar."},
    {q:"¿En un canal estrecho (Regla 9), cómo señala un buque su intención de adelantar?",opts:["Solo radio VHF","1 largo + 1 corto = adelantar por estribor · 1 largo + 2 cortos = adelantar por babor · Respuesta: — • — • si acuerdo","Por señales luminosas","Por banderas"],correct:1,expl:"Canal estrecho (Regla 9) + adelantamiento: señal sonora ANTES de adelantar. — • = quiero adelantarle por su estribor. — • • = quiero adelantarle por su babor. ACUERDO del buque adelantado: — • — • . RECHAZO: 5 sonidos cortos."},
    {q:"¿Qué es la señal sonora de 'aproximación a un ángulo muerto' (COLREG Regla 9b)?",opts:["Señal de socorro","1 sonido largo emitido por un buque aproximándose a una curva o zona donde otros buques pueden estar ocultos — respuesta con 1 sonido largo","Señal de fondeo","Señal de remolque"],correct:1,expl:"COLREG Regla 9b: En canales y vías de agua estrechos, el buque en aproximación emite 1 SONIDO LARGO. Si hay un buque al otro lado: responde con 1 SONIDO LARGO. El primer buque puede saber si la vía está libre o no."},
    {q:"¿Qué equipamiento sonoro es OBLIGATORIO para un buque de 150 metros fondeado?",opts:["Solo pito","Pito + Campana a proa + Gong a popa","Pito + Campana solo","Solo Gong"],correct:1,expl:"Buque ≥ 100m fondeado = CAMPANA a proa + GONG a popa (COLREG Anexo III + Regla 33). La señal de fondeo = campana rápida 5s cada minuto (proa) + gong rápido 5s inmediatamente después (popa). Un buque de 150m debe tener ambos."},
    {q:"¿Cómo señala su situación un buque en peligro FONDEADO en niebla?",opts:["Solo 5 sonidos cortos","Señal de fondeo (campana rápida) + AÑADIR 3 golpes distintos antes y/o después de la campana para señalar la situación de peligro","Solo Mayday por radio","2 sonidos largos"],correct:1,expl:"Buque FONDEADO EN PELIGRO: señal de fondeo normal (campana 5s/1 min) + 3 golpes DISTINTOS antes Y después de la campana rápida. Estos 3 golpes adicionales significan 'estoy en peligro — vengan a ayudarme'. En paralelo: Mayday en VHF 16."},
    {q:"¿Cuál es la señal sonora 'máquinas dando atrás' y su duración?",opts:["1 sonido largo","3 sonidos cortos de aproximadamente 1 segundo cada uno","3 sonidos largos","5 sonidos cortos"],correct:1,expl:"3 sonidos cortos = 'mis máquinas dan atrás'. DURACIÓN: 1 sonido corto = aproximadamente 1 segundo. Se usa solo con buena visibilidad. ATENCIÓN: no significa que el buque retroceda. La inercia puede mantener el buque hacia adelante incluso con las máquinas dando atrás."},
    {q:"¿Cuál es el intervalo máximo entre dos señales de niebla para un buque a motor en ruta?",opts:["30 segundos","1 minuto","2 minutos","5 minutos"],correct:2,expl:"COLREG Regla 35a: buque a motor haciendo camino = 1 sonido largo cada 2 MINUTOS como máximo. Buque a motor parado = 2 sonidos largos cada 2 minutos. Buque fondeado = campana rápida 5s cada 1 MINUTO (¡intervalo más corto!). Nota: el intervalo de 2 minutos es un MÁXIMO."},
    {q:"¿En qué situación emite un buque 5 sonidos cortos?",opts:["Para saludar un puerto","Señal de peligro/duda cuando el otro buque no parece tomar medidas suficientes — o señal de incomprensión","Para anunciar su salida","Señal de fondeo"],correct:1,expl:"5 sonidos cortos = señal de PELIGRO/DUDA (Regla 34d). Usar cuando: no entiendes las intenciones del otro buque, estimas que el otro no toma medidas suficientes para evitar la colisión. No es una señal de socorro — es una señal de alarma entre buques."},
    {q:"¿Con visibilidad reducida, qué debe hacer un buque al escuchar una señal de niebla por delante del través?",opts:["Acelerar para adelantar","Reducir la velocidad al mínimo, o incluso parar, y navegar con extrema precaución","No cambiar nada","Emitir 5 sonidos cortos"],correct:1,expl:"COLREG Regla 19d: Si contacto sonoro (o radar) por delante del través → REDUCIR LA VELOCIDAD al mínimo o PARAR. Maniobrar con extrema precaución. NO virar a babor si el contacto está a la izquierda. Baltic Carrier vs Tern (2001): no reducción de velocidad = factor de accidente."},
    {q:"¿Cuál es la señal sonora de niebla de un remolcador remolcando?",opts:["1 sonido largo","2 sonidos largos","1 sonido largo + 2 cortos (igual que el velero)","3 sonidos cortos"],correct:2,expl:"COLREG Regla 35c: remolcador REMOLCANDO = 1 LARGO + 2 CORTOS (— • •) cada 2 minutos. Misma señal que velero, NUC, RAM, pesquero. El buque REMOLCADO (si está tripulado) también emite 1 largo + 2 cortos justo después del remolcador."},
    {q:"¿Qué es la 'guardia auditiva' obligatoria en la navegación?",opts:["Una obligación optativa","Obligación COLREG Regla 5 de escuchar atentamente las señales sonoras para detectar buques no visibles — micrófono dedicado o personal de guardia","Una obligación meteorológica","Un equipo optativo"],correct:1,expl:"Guardia auditiva = obligación COLREG Regla 5 (guardia permanente). En niebla: escucha permanente de las señales sonoras OBLIGATORIA. Permite: detectar un buque antes de verlo en el radar, identificar el tipo de buque, localizar aproximadamente la dirección."},
    {q:"¿Puede un velero sustituir su pito por otro dispositivo sonoro en niebla?",opts:["No — el pito es obligatorio","Sí — un buque < 12m puede usar cualquier dispositivo sonoro eficaz en lugar del equipo reglamentario","No — solo bocina de niebla","Sí — pero solo en los puertos"],correct:1,expl:"COLREG Regla 33: Buque < 12m = puede tener otro medio sonoro audible eficaz. Puede incluir: bocina de boca, bocina de presión, claxon, etc. Buques ≥ 12m: campana obligatoria. Buques ≥ 20m: pito obligatorio con alcance reglamentario."},
    {q:"¿Qué es la señal de 'centinela' (watchman signal) emitida de noche por un buque fondeado?",opts:["Una señal de radio","Facultad del buque fondeado de emitir HASTA 3 cortos · 1 largo · 3 cortos para señalar su presencia","Una señal luminosa","Una señal de socorro"],correct:1,expl:"COLREG Regla 35g: buque fondeado puede emitir ADEMÁS de la señal normal de fondeo: hasta 3 cortos + 1 largo + 3 cortos (• • • — • • •) para señalar su posición a un buque en aproximación."},
    {q:"En un entorno marítimo con niebla, ¿qué regla de prioridad se aplica a las señales sonoras?",opts:["El buque más grande tiene prioridad","COLREG Regla 35: prioridad absoluta a los buques NUC y RAM — los demás buques deben apartarse","El buque con la señal más fuerte tiene prioridad","Las reglas de la vía se aplican sin cambios"],correct:1,expl:"Con visibilidad reducida, las reglas de prioridad clásicas SIGUEN aplicando: NUC, RAM, pesquero, CBD conservan su prioridad. Sin embargo: TODOS deben emitir sus señales. La prioridad no exime de señalar la presencia. La Regla 19 (conducta en VR) se aplica a TODOS sin excepción."},
  ],
  pt:[
    {q:"O que é a 'velocidade segura' em nevoeiro (COLREG Regra 6)?",opts:["A velocidade máxima permitida","Velocidade que permite tomar medidas eficazes para evitar um abalroamento e parar numa distância apropriada às circunstâncias","A velocidade do vento","A velocidade da corrente"],correct:1,expl:"COLREG Regra 6 (velocidade segura) = velocidade adaptada às circunstâncias. Fatores: visibilidade, densidade do tráfego, manobabilidade, estado do mar, corrente, fundos, calado. Em nevoeiro: frequentemente redução drástica de velocidade. Princípio: poder parar a metade da distância de visibilidade."},
    {q:"O que é a Regra 19 do COLREG sobre a 'conduta em visibilidade reduzida'?",opts:["Uma regra meteorológica","Regra que impõe marcha a velocidade segura + vigilância de radar + sinais sonoros + evitar se contacto de radar à frente do través","Uma regra de fundeamento","Uma regra de porto"],correct:1,expl:"COLREG Regra 19 = conduta em visibilidade reduzida. Obrigações: velocidade segura (Regra 6), vigilância contínua de radar, pronto a parar. Se contacto de radar: determinar se há risco de abalroamento. Se contacto de radar à frente do través: REDUZIR A VELOCIDADE ao mínimo ou parar."},
    {q:"Num canal estreito (Regra 9), como sinaliza um navio a intenção de ultrapassar?",opts:["Rádio VHF apenas","1 longo + 1 curto = ultrapassar por estibordo · 1 longo + 2 curtos = ultrapassar por bombordo · Resposta: — • — • se acordo","Por sinais luminosos","Por bandeiras"],correct:1,expl:"Canal estreito (Regra 9) + ultrapassagem: sinal sonoro ANTES de ultrapassar. — • = quero ultrapassá-lo pelo seu estibordo. — • • = quero ultrapassá-lo pelo seu bombordo. ACORDO do navio ultrapassado: — • — • . RECUSA: 5 sons curtos."},
    {q:"O que é o sinal sonoro de 'aproximação a uma curva cega' (COLREG Regra 9b)?",opts:["Sinal de socorro","1 som longo emitido por navio a aproximar-se de uma curva ou zona onde outros navios podem estar ocultos — resposta com 1 som longo","Sinal de fundeamento","Sinal de reboque"],correct:1,expl:"COLREG Regra 9b: Em canais e vias de água estreitas, o navio em aproximação emite 1 SOM LONGO. Se há um navio do outro lado: responde com 1 SOM LONGO. O primeiro navio pode saber se a via está livre ou não."},
    {q:"Que equipamento sonoro é OBRIGATÓRIO para um navio de 150 metros fundeado?",opts:["Apenas apito","Apito + Sino à proa + Gongo à popa","Apito + Sino apenas","Apenas Gongo"],correct:1,expl:"Navio ≥ 100m fundeado = SINO à proa + GONGO à popa (COLREG Anexo III + Regra 33). O sinal de fundeamento = sino rápido 5s a cada minuto (proa) + gongo rápido 5s imediatamente depois (popa). Um navio de 150m deve ter ambos."},
    {q:"Como sinaliza a sua situação um navio em perigo FUNDEADO em nevoeiro?",opts:["Apenas 5 sons curtos","Sinal de fundeamento (sino rápido) + ADICIONAR 3 toques distintos antes e/ou depois do sino para sinalizar o perigo","Apenas Mayday por rádio","2 sons longos"],correct:1,expl:"Navio FUNDEADO EM PERIGO: sinal de fundeamento normal (sino 5s/1 min) + 3 toques DISTINTOS antes E depois do sino rápido. Estes 3 toques adicionais significam 'estou em perigo — venham ajudar-me'. Em paralelo: Mayday no VHF 16."},
    {q:"Qual é o sinal sonoro 'motores a trabalhar à ré' e a sua duração?",opts:["1 som longo","3 sons curtos de aproximadamente 1 segundo cada","3 sons longos","5 sons curtos"],correct:1,expl:"3 sons curtos = 'os meus motores estão a trabalhar à ré'. DURAÇÃO: 1 som curto = aproximadamente 1 segundo. Usado apenas em visibilidade normal. ATENÇÃO: não significa que o navio está a recuar. A inércia pode manter o navio a avançar mesmo com os motores à ré."},
    {q:"Qual é o intervalo máximo entre dois sinais de nevoeiro para um navio a motor em rota?",opts:["30 segundos","1 minuto","2 minutos","5 minutos"],correct:2,expl:"COLREG Regra 35a: navio a motor a fazer caminho = 1 som longo a cada 2 MINUTOS no máximo. Navio a motor parado = 2 sons longos a cada 2 minutos. Navio fundeado = sino rápido 5s a cada 1 MINUTO (intervalo mais curto!). Nota: o intervalo de 2 minutos é um MÁXIMO."},
    {q:"Em que situação emite um navio 5 sons curtos?",opts:["Para saudar um porto","Sinal de perigo/dúvida quando o outro navio não parece estar a tomar medidas suficientes — ou sinal de incompreensão","Para anunciar a sua partida","Sinal de fundeamento"],correct:1,expl:"5 sons curtos = sinal de PERIGO/DÚVIDA (Regra 34d). Usar quando: não compreende as intenções do outro navio, considera que o outro não está a tomar medidas suficientes para evitar o abalroamento. Não é um sinal de socorro — é um sinal de alarme entre navios."},
    {q:"Em visibilidade reduzida, o que deve fazer um navio ao ouvir um sinal de nevoeiro à frente do través?",opts:["Acelerar para ultrapassar","Reduzir a velocidade ao mínimo, ou mesmo parar, e navegar com extrema cautela","Não mudar nada","Emitir 5 sons curtos"],correct:1,expl:"COLREG Regra 19d: Se contacto sonoro (ou radar) à frente do través → REDUZIR A VELOCIDADE ao mínimo ou PARAR. Manobrar com extrema cautela. NÃO virar a bombordo se contacto à esquerda. Baltic Carrier vs Tern (2001): não redução de velocidade = fator de acidente."},
    {q:"Qual é o sinal sonoro de nevoeiro de um rebocador a rebocar?",opts:["1 som longo","2 sons longos","1 som longo + 2 curtos (mesmo sinal que o veleiro)","3 sons curtos"],correct:2,expl:"COLREG Regra 35c: rebocador A REBOCAR = 1 LONGO + 2 CURTOS (— • •) a cada 2 minutos. Mesmo sinal que veleiro, NUC, RAM, pesca. O navio REBOCADO (se tripulado) também emite 1 longo + 2 curtos imediatamente após o rebocador."},
    {q:"O que é a 'vigia sonora' obrigatória na navegação?",opts:["Uma obrigação opcional","Obrigação COLREG Regra 5 de ouvir atentamente os sinais sonoros para detetar navios não visíveis — microfone dedicado ou pessoal de quarto","Uma obrigação meteorológica","Equipamento opcional"],correct:1,expl:"Vigia sonora = obrigação COLREG Regra 5 (vigia permanente). Em nevoeiro: escuta permanente dos sinais sonoros OBRIGATÓRIA. Permite: detetar um navio antes de o ver no radar, identificar o tipo de navio, localizar aproximadamente a direção."},
    {q:"Pode um veleiro substituir o apito por outro dispositivo sonoro em nevoeiro?",opts:["Não — apito obrigatório","Sim — um navio < 12m pode usar qualquer dispositivo sonoro eficaz em vez do equipamento regulamentar","Não — apenas corneta de nevoeiro","Sim — mas apenas nos portos"],correct:1,expl:"COLREG Regra 33: Navio < 12m = pode ter outro meio sonoro audível eficaz. Pode incluir: corneta de boca, corneta de pressão, klaxon, etc. Navios ≥ 12m: sino obrigatório. Navios ≥ 20m: apito obrigatório com alcance regulamentar."},
    {q:"O que é o sinal de 'sentinela' (watchman signal) emitido à noite por um navio fundeado?",opts:["Um sinal rádio","Faculdade do navio fundeado de emitir ATÉ 3 curtos · 1 longo · 3 curtos para sinalizar a sua presença","Um sinal luminoso","Um sinal de socorro"],correct:1,expl:"COLREG Regra 35g: navio fundeado pode emitir ALÉM do sinal normal de fundeamento: até 3 curtos + 1 longo + 3 curtos (• • • — • • •) para sinalizar a sua posição a um navio em aproximação."},
    {q:"Num ambiente marítimo com nevoeiro, que regra de prioridade se aplica aos sinais sonoros?",opts:["O maior navio tem prioridade","COLREG Regra 35: prioridade absoluta aos navios NUC e RAM — os outros navios devem afastar-se","O navio com o sinal mais forte tem prioridade","As regras de trânsito aplicam-se sem alteração"],correct:1,expl:"Em visibilidade reduzida, as regras de prioridade clássicas AINDA se aplicam: NUC, RAM, pesca, CBD conservam a sua prioridade. No entanto: TODOS devem emitir os seus sinais. A Regra 19 (conduta em VR) aplica-se a TODOS sem exceção."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.orange},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.orange},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:12},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.25}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.orange}33,${C.gold2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.orange}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.orange,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.orange:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    fr:{
      badge:"🔊 Signalisation & Balisage · Leçon 3/7 · ⭐ Premium · 200 XP",
      title:"Signaux Sonores & Brouillard (COLREG)",
      intro:"En mer, quand la visibilité tombe à zéro, les yeux ne servent plus — les oreilles prennent le relais. Les signaux sonores sont le langage de la mer par temps de brouillard. Les connaître peut éviter une collision mortelle.\n\nCette leçon couvre les signaux de manœuvre (Règle 34), les signaux de brouillard (Règle 35) et les équipements sonores.",
      p1:"PARTIE 1 — SIGNAUX DE MANŒUVRE (Règle 34)",s1t:"• tribord · •• bâbord · ••• arrière · ••••• danger",
      s1:"SIGNAUX DE MANŒUVRE (bonne visibilité) :\n\n• (1 court) → Je vire à TRIBORD\n•• (2 courts) → Je vire à BÂBORD\n••• (3 courts) → Machines en ARRIÈRE\n••••• (5 courts) → DANGER / DOUTE\n\nSIGNAUX DE DÉPASSEMENT (chenal étroit) :\n— • = dépasser par tribord\n— •• = dépasser par bâbord\n— • — • = accord accordé\n\nSIGNAL D'APPROCHE ANGLE MORT :\n— (1 long) = j'approche d'un virage caché",
      p2:"PARTIE 2 — SIGNAUX DE BROUILLARD (Règle 35)",s2t:"Moteur en route · Stoppé · Voilier · Mouillage · Échoué",
      s2:"SIGNAUX DE BROUILLARD (visibilité réduite) :\n\nMoteur EN ROUTE → — (1 long) / 2 min\nMoteur STOPPÉ → — — (2 longs) / 2 min\nVoilier / NUC / RAM / Pêche → — •• / 2 min\n\nMOUILLAGE → Cloche rapide 5s / 1 MIN\nGrand navire (>100m) : cloche + gong\n\nÉCHOUÉ → ••• + Cloche rapide + ••• / 1 min\nPILOTE → + 4 sons courts en plus",
      p3:"PARTIE 3 — ÉQUIPEMENTS SONORES",s1t:"Sifflet · Cloche · Gong · Portées obligatoires",
      s3:"ÉQUIPEMENTS RÉGLEMENTAIRES :\n\nSIFFLET (obligatoire tous navires)\n→ ≥ 200m : portée 2 milles\n→ 75-200m : portée 1,5 milles\n→ 20-75m : portée 1 mille\n→ 12-20m : portée 0,5 mille\n→ < 12m : signal quelconque audible\n\nCLOCHE (obligatoire ≥ 12m)\nGONG (obligatoire ≥ 100m)",
      p4:"PARTIE 4 — QUIZ SONORE INTERACTIF",s2t:"4 scénarios · Identifier le signal entendu",
      s4:"MÉTHODE D'IDENTIFICATION :\n\nEn brouillard :\n1 son long = moteur en route\n2 sons longs = moteur stoppé\n1 long + 2 courts = voilier / NUC / RAM\nCloche rapide = au mouillage\n\nEn bonne visibilité :\n1 court = vire tribord\n2 courts = vire bâbord\n3 courts = arrière\n5 courts = DANGER\n\nPRINCIPE : si vous entendez 5 courts\n→ RÉDUIRE VITESSE + surveiller TOUT autour",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"🌫️ CAS RÉEL — BALTIC CARRIER",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — SIGNAUX SONORES L3",
      sumP:["Règle 34 (bonne visibilité) : • tribord · •• bâbord · ••• arrière · ••••• danger","Règle 35 (brouillard) : — moteur route · — — moteur stoppé · — •• voilier","Mouillage : cloche rapide 5s/1 min · Grand navire : +gong arrière","Échoué : ••• + cloche rapide + ••• toutes les minutes","Portées sifflet : ≥200m=2mi · 75-200m=1,5mi · 20-75m=1mi","Chenal étroit : — • = dépasser tribord · — •• = dépasser bâbord","Baltic Carrier 2001 = signaux absents → 2 morts · 2700t fuel","Règle 19 : si signal brouillard devant = RÉDUIRE VITESSE immédiatement"],
      learnedP:["Signaux manœuvre : 1·2·3·5 sons courts","Signaux brouillard : 1 long · 2 longs · 1+2 courts · cloche","Équipements sonores : sifflet · cloche · gong · portées","Chenal étroit : signaux de dépassement","Baltic Carrier 2001 : signaux absents = faute grave"],
    },
    en:{
      badge:"🔊 Signaling & Buoyage · Lesson 3/7 · ⭐ Premium · 200 XP",
      title:"Sound Signals & Fog (COLREG)",
      intro:"At sea, when visibility drops to zero, eyes are useless — ears take over. Sound signals are the language of the sea in foggy weather. Knowing them can prevent a fatal collision.",
      p1:"PART 1 — MANEUVERING SIGNALS (Rule 34)",s1t:"• stbd · •• port · ••• astern · ••••• danger",
      s1:"MANEUVERING SIGNALS (good visibility):\n\n• (1 short) → Altering to STARBOARD\n•• (2 short) → Altering to PORT\n••• (3 short) → Engines going ASTERN\n••••• (5 short) → DANGER / DOUBT\n\nOVERTAKING SIGNALS (narrow channel):\n— • = overtake on starboard\n— •• = overtake on port\n— • — • = agreement\n\nBLIND BEND APPROACH:\n— (1 long) = approaching hidden bend",
      p2:"PART 2 — FOG SIGNALS (Rule 35)",s1t:"Motor underway · Stopped · Sailing · Anchor · Aground",
      s2:"FOG SIGNALS (restricted visibility):\n\nMotor UNDERWAY → — (1 long) / 2 min\nMotor STOPPED → — — (2 longs) / 2 min\nSailing / NUC / RAM / Fishing → — •• / 2 min\n\nANCHOR → Rapid bell 5s / 1 MIN\nLarge vessel (>100m): bell + gong\n\nAGROUND → ••• + Rapid bell + ••• / 1 min\nPILOT → + 4 short blasts additional",
      p3:"PART 3 — SOUND EQUIPMENT",s1t:"Whistle · Bell · Gong · Mandatory ranges",
      s3:"REGULATORY EQUIPMENT:\n\nWHISTLE (mandatory all vessels)\n→ ≥ 200m: range 2 miles\n→ 75-200m: range 1.5 miles\n→ 20-75m: range 1 mile\n→ 12-20m: range 0.5 mile\n→ < 12m: any audible signal\n\nBELL (mandatory ≥ 12m)\nGONG (mandatory ≥ 100m)",
      p4:"PART 4 — INTERACTIVE SOUND QUIZ",s1t:"4 scenarios · Identify the signal heard",
      s4:"IDENTIFICATION METHOD:\n\nIn fog:\n1 long = motor underway\n2 longs = motor stopped\n1 long + 2 short = sailing / NUC / RAM\nRapid bell = at anchor\n\nIn good visibility:\n1 short = altering stbd\n2 short = altering port\n3 short = astern\n5 short = DANGER\n\nPRINCIPLE: if you hear 5 short\n→ REDUCE SPEED + watch ALL around",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"🌫️ REAL CASE — BALTIC CARRIER",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — SOUND SIGNALS L3",
      sumP:["Rule 34 (good visibility): • stbd · •• port · ••• astern · ••••• danger","Rule 35 (fog): — motor underway · — — motor stopped · — •• sailing","Anchor: rapid bell 5s/1 min · Large vessel: +aft gong","Aground: ••• + rapid bell + ••• every minute","Whistle ranges: ≥200m=2mi · 75-200m=1.5mi · 20-75m=1mi","Narrow channel: — • = overtake stbd · — •• = overtake port","Baltic Carrier 2001 = missing signals → 2 dead · 2,700t fuel","Rule 19: if fog signal ahead = REDUCE SPEED immediately"],
      learnedP:["Maneuvering signals: 1·2·3·5 short blasts","Fog signals: 1 long · 2 longs · 1+2 short · bell","Sound equipment: whistle · bell · gong · ranges","Narrow channel: overtaking signals","Baltic Carrier 2001: missing signals = serious fault"],
    },
    es:{
      badge:"🔊 Señalización y Balizamiento · Lección 3/7 · ⭐ Premium · 200 XP",
      title:"Señales Sonoras y Niebla (COLREG)",
      intro:"En el mar, cuando la visibilidad cae a cero, los ojos no sirven — los oídos toman el relevo. Las señales sonoras son el lenguaje del mar con tiempo de niebla.",
      p1:"PARTE 1 — SEÑALES DE MANIOBRA (Regla 34)",s1t:"• estribor · •• babor · ••• atrás · ••••• peligro",
      s1:"SEÑALES DE MANIOBRA (buena visibilidad):\n• → Viro a ESTRIBOR\n•• → Viro a BABOR\n••• → Máquinas ATRÁS\n••••• → PELIGRO / DUDA\nCanal estrecho: — • = adelantar estribor · — •• = adelantar babor",
      p2:"PARTE 2 — SEÑALES DE NIEBLA (Regla 35)",s1t:"Motor navegando · Parado · Velero · Fondeo · Varado",
      s2:"SEÑALES DE NIEBLA:\nMotor NAVEGANDO → — (1 largo) / 2 min\nMotor PARADO → — — (2 largos) / 2 min\nVelero / NUC / RAM / Pesca → — •• / 2 min\nFONDEO → Campana rápida 5s / 1 MIN\nVARADO → ••• + Campana rápida + ••• / 1 min",
      p3:"PARTE 3 — EQUIPOS SONOROS",s1t:"Pito · Campana · Gong · Alcances obligatorios",
      s3:"PITO (obligatorio todos): ≥200m=2mi · 75-200m=1,5mi · 20-75m=1mi\nCAMPANA (obligatoria ≥ 12m)\nGONG (obligatorio ≥ 100m)",
      p4:"PARTE 4 — QUIZ SONORO INTERACTIVO",s1t:"4 escenarios · Identificar la señal oída",
      s4:"Niebla: 1 largo=motor ruta · 2 largos=motor parado · 1+2 cortos=velero/NUC\nBuena visibilidad: 1=estribor · 2=babor · 3=atrás · 5=PELIGRO",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"🌫️ CASO REAL — BALTIC CARRIER",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — SEÑALES SONORAS L3",
      sumP:["Regla 34 (buena visibilidad): • estribor · •• babor · ••• atrás · ••••• peligro","Regla 35 (niebla): — motor ruta · — — motor parado · — •• velero","Fondeo: campana rápida 5s/1 min · Buque grande: +gong popa","Varado: ••• + campana rápida + ••• cada minuto","Alcances pito: ≥200m=2mi · 75-200m=1,5mi · 20-75m=1mi","Canal estrecho: — • = adelantar estribor · — •• = adelantar babor","Baltic Carrier 2001 = señales ausentes → 2 muertos · 2.700t fuel","Regla 19: señal niebla por delante = REDUCIR VELOCIDAD inmediatamente"],
      learnedP:["Señales maniobra: 1·2·3·5 sonidos cortos","Señales niebla: 1 largo · 2 largos · 1+2 cortos · campana","Equipos sonoros: pito · campana · gong · alcances","Canal estrecho: señales de adelantamiento","Baltic Carrier 2001: señales ausentes = falta grave"],
    },
    pt:{
      badge:"🔊 Sinalização e Balizagem · Lição 3/7 · ⭐ Premium · 200 XP",
      title:"Sinais Sonoros e Nevoeiro (COLREG)",
      intro:"No mar, quando a visibilidade cai a zero, os olhos não servem — os ouvidos assumem. Os sinais sonoros são a linguagem do mar com tempo de nevoeiro.",
      p1:"PARTE 1 — SINAIS DE MANOBRA (Regra 34)",s1t:"• estibordo · •• bombordo · ••• ré · ••••• perigo",
      s1:"SINAIS DE MANOBRA (boa visibilidade):\n• → Viro para ESTIBORDO\n•• → Viro para BOMBORDO\n••• → Motores À RÉ\n••••• → PERIGO / DÚVIDA\nCanal estreito: — • = ultrapassar estibordo · — •• = ultrapassar bombordo",
      p2:"PARTE 2 — SINAIS DE NEVOEIRO (Regra 35)",s1t:"Motor em rota · Parado · Veleiro · Fundeado · Encalhado",
      s2:"SINAIS DE NEVOEIRO:\nMotor EM ROTA → — (1 longo) / 2 min\nMotor PARADO → — — (2 longos) / 2 min\nVeleiro / NUC / RAM / Pesca → — •• / 2 min\nFUNDEADO → Sino rápido 5s / 1 MIN\nENCALHADO → ••• + Sino rápido + ••• / 1 min",
      p3:"PARTE 3 — EQUIPAMENTOS SONOROS",s1t:"Apito · Sino · Gongo · Alcances obrigatórios",
      s3:"APITO (obrigatório todos): ≥200m=2mi · 75-200m=1,5mi · 20-75m=1mi\nSINO (obrigatório ≥ 12m)\nGONGO (obrigatório ≥ 100m)",
      p4:"PARTE 4 — QUIZ SONORO INTERATIVO",s1t:"4 cenários · Identificar o sinal ouvido",
      s4:"Nevoeiro: 1 longo=motor rota · 2 longos=motor parado · 1+2 curtos=veleiro/NUC\nBoa visibilidade: 1=estibordo · 2=bombordo · 3=ré · 5=PERIGO",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"🌫️ CASO REAL — BALTIC CARRIER",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — SINAIS SONOROS L3",
      sumP:["Regra 34 (boa visibilidade): • estibordo · •• bombordo · ••• ré · ••••• perigo","Regra 35 (nevoeiro): — motor rota · — — motor parado · — •• veleiro","Fundeado: sino rápido 5s/1 min · Navio grande: +gongo popa","Encalhado: ••• + sino rápido + ••• a cada minuto","Alcances apito: ≥200m=2mi · 75-200m=1,5mi · 20-75m=1mi","Canal estreito: — • = ultrapassar estibordo · — •• = ultrapassar bombordo","Baltic Carrier 2001 = sinais ausentes → 2 mortos · 2.700t fuel","Regra 19: sinal nevoeiro à frente = REDUZIR VELOCIDADE imediatamente"],
      learnedP:["Sinais manobra: 1·2·3·5 sons curtos","Sinais nevoeiro: 1 longo · 2 longos · 1+2 curtos · sino","Equipamentos sonoros: apito · sino · gongo · alcances","Canal estreito: sinais de ultrapassagem","Baltic Carrier 2001: sinais ausentes = falta grave"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonSoundSignals({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#04080e 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.orange}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.orange,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🔊 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/7":lang==="en"?"Lesson 3/7":lang==="es"?"Lección 3/7":"Lição 3/7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.orange,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.orange},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}44`,fontSize:11,color:C.orange,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.orange}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="📯" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📯 {lang==="fr"?"SIGNAUX DE MANŒUVRE — CLAVIER INTERACTIF":lang==="en"?"MANEUVERING SIGNALS — INTERACTIVE KEYBOARD":lang==="es"?"SEÑALES DE MANIOBRA — TECLADO INTERACTIVO":"SINAIS DE MANOBRA — TECLADO INTERATIVO"}</div>
              <ManeuverSignalsSVG lang={lang}/>
            </Card>
            <SL icon="🌫️" text={lc.p2} color={C.steel}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid rgba(180,200,220,0.2)`}}>
              <div style={{fontSize:11,color:"rgba(180,200,220,0.8)",letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🌫️ {lang==="fr"?"SIGNAUX DE BROUILLARD (Règle 35)":lang==="en"?"FOG SIGNALS (Rule 35)":lang==="es"?"SEÑALES DE NIEBLA (Regla 35)":"SINAIS DE NEVOEIRO (Regra 35)"}</div>
              <FogSignalsSVG lang={lang}/>
            </Card>
            <SL icon="🔔" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔔 {lang==="fr"?"ÉQUIPEMENTS SONORES — INTERACTIF":lang==="en"?"SOUND EQUIPMENT — INTERACTIVE":lang==="es"?"EQUIPOS SONOROS — INTERACTIVO":"EQUIPAMENTOS SONOROS — INTERATIVO"}</div>
              <SoundEquipmentSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p4} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎯 {lang==="fr"?"QUIZ SONORE — IDENTIFIER LES SIGNAUX":lang==="en"?"SOUND QUIZ — IDENTIFY THE SIGNALS":lang==="es"?"QUIZ SONORO — IDENTIFICAR LAS SEÑALES":"QUIZ SONORO — IDENTIFICAR OS SINAIS"}</div>
              <SoundQuizSVG lang={lang}/>
            </Card>
            <SL icon="📝" text={lang==="fr"?"EXERCICES AVANCÉS":lang==="en"?"ADVANCED EXERCISES":lang==="es"?"EJERCICIOS AVANZADOS":"EXERCÍCIOS AVANÇADOS"} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="🌫️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.orange,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(230,126,34,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Signaux Sonores & Brouillard</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 3":lang==="en"?"Lesson 3":lang==="es"?"Lección 3":"Lição 3"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}55`,fontSize:14,color:C.orange,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.orange,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 4 — PAVILLONS & COMMUNICATION →":lang==="en"?"LESSON 4 — FLAGS & COMMUNICATION →":lang==="es"?"LECCIÓN 4 — BANDERAS Y COMUNICACIÓN →":"LIÇÃO 4 — BANDEIRAS E COMUNICAÇÃO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
