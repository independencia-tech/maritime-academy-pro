// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", yellow:"#f1c40f", radio:"#00ff88",
};

const T = {
  fr:{ back:"◀ Retour", module:"Signalisation & Balisage", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Signaling & Buoyage", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Señalización y Balizamiento", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Sinalização e Balizagem", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — VHF CHANNEL SELECTOR
// ══════════════════════════════════════
function VHFChannelSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const channels = [
    { ch:"16", color:C.red, priority:true,
      label:{fr:"Canal 16 — VEILLE OBLIGATOIRE",en:"Channel 16 — MANDATORY WATCH",es:"Canal 16 — ESCUCHA OBLIGATORIA",pt:"Canal 16 — ESCUTA OBRIGATÓRIA"},
      use:{fr:"DÉTRESSE · URGENCE · SÉCURITÉ\nAppels initiaux tous navires\nVEILLE PERMANENTE obligatoire\n\nFRÉQUENCE : 156.800 MHz\nPUSSANCE : 25W max\n\nLOI : tout navire GMDSS doit\nmaintenir veille permanente ch.16\n24h/24 en mer\n\nAprès contact ch.16 :\n→ Basculer sur canal de travail\n(67, 68, 72 selon zone/port)",en:"DISTRESS · URGENCY · SAFETY\nInitial calls all vessels\nMANDATORY PERMANENT WATCH\n\nFREQUENCY: 156.800 MHz\nPOWER: 25W max\n\nLAW: every GMDSS vessel must\nmaintain permanent watch ch.16\n24h/24 at sea\n\nAfter ch.16 contact:\n→ Switch to working channel\n(67, 68, 72 per area/port)",es:"SOCORRO · URGENCIA · SEGURIDAD\nLlamadas iniciales todos los buques\nESCUCHA PERMANENTE obligatoria\n\nFRECUENCIA: 156.800 MHz\nPOTENCIA: 25W máx.\n\nLEY: todo buque GMDSS debe\nmantener escucha permanente ch.16\n24h/24 en el mar",pt:"SOCORRO · URGÊNCIA · SEGURANÇA\nChamadas iniciais todos os navios\nESCUTA PERMANENTE obrigatória\n\nFREQUÊNCIA: 156.800 MHz\nPOTÊNCIA: 25W máx.\n\nLEI: todo navio GMDSS deve\nmanter escuta permanente ch.16\n24h/24 no mar"},},
    { ch:"70", color:C.purple,
      label:{fr:"Canal 70 — DSC (Appel Sélectif Numérique)",en:"Channel 70 — DSC (Digital Selective Calling)",es:"Canal 70 — LSD (Llamada Selectiva Digital)",pt:"Canal 70 — ASN (Chamada Seletiva Digital)"},
      use:{fr:"DSC — Appel Sélectif Numérique\nFREQUENCE : 156.525 MHz\nUSAGE EXCLUSIF DSC\nNe pas émettre voix sur ce canal !\n\nFONCTIONS :\n→ Alerte de détresse numérique\n→ Appel sélectif vers un MMSI\n→ Appel de groupe\n→ Accusé de réception\n\nMMSI = 9 chiffres d'identification\nEnregistré avant utilisation\n\nPRIORITÉ : Alerte détresse DSC\nprioritaire sur tout autre signal",en:"DSC — Digital Selective Calling\nFREQUENCY: 156.525 MHz\nEXCLUSIVE DSC USE\nDo NOT transmit voice on this channel!\n\nFUNCTIONS:\n→ Digital distress alert\n→ Selective call to a MMSI\n→ Group call\n→ Acknowledgment\n\nMMSI = 9-digit identification number\nRegistered before use",es:"LSD — Llamada Selectiva Digital\nFRECUENCIA: 156.525 MHz\nUSO EXCLUSIVO LSD\n¡No transmitir voz en este canal!\n\nFUNCIONES:\n→ Alerta de socorro digital\n→ Llamada selectiva a un MMSI\n→ Llamada de grupo\n→ Acuse de recibo",pt:"ASN — Chamada Seletiva Digital\nFREQUÊNCIA: 156.525 MHz\nUSO EXCLUSIVO ASN\nNão transmitir voz neste canal!\n\nFUNÇÕES:\n→ Alerta de socorro digital\n→ Chamada seletiva para MMSI\n→ Chamada de grupo\n→ Acuse de recebimento"},},
    { ch:"67", color:C.blue2,
      label:{fr:"Canal 67 — Travail côtier",en:"Channel 67 — Coastal working",es:"Canal 67 — Trabajo costero",pt:"Canal 67 — Trabalho costeiro"},
      use:{fr:"CANAL DE TRAVAIL CÔTIER\nFrance : CROSS · Capitaineries\nUK : Coastguard working channel\n\nFRÉQUENCE : 156.375 MHz\nPUISSANCE : 1W en port / 25W en mer\n\nUTILISATION :\n→ Communications navire-côte\n→ Messages de sécurité maritime\n→ Trafic portuaire (certains ports)\n→ Météo en France (alternance)\n\nEN FRANCE :\nCROSS diffuse bulletins météo\nsur ce canal selon zone",en:"COASTAL WORKING CHANNEL\nFrance: CROSS · Port authorities\nUK: Coastguard working channel\n\nFREQUENCY: 156.375 MHz\nPOWER: 1W in port / 25W at sea\n\nUSE:\n→ Ship-coast communications\n→ Maritime safety messages\n→ Port traffic (some ports)\n→ Weather in France (alternating)",es:"CANAL DE TRABAJO COSTERO\nFrancia: CROSS · Capitanías\nRU: Canal de trabajo de guardacostas\n\nFRECUENCIA: 156.375 MHz\nPOTENCIA: 1W en puerto / 25W en mar",pt:"CANAL DE TRABALHO COSTEIRO\nFrança: CROSS · Capitanias\nRU: Canal de trabalho guardas costeiros\n\nFREQUÊNCIA: 156.375 MHz\nPOTÊNCIA: 1W em porto / 25W no mar"},},
    { ch:"09", color:C.teal,
      label:{fr:"Canal 09 — Travail (plaisance)",en:"Channel 09 — Working (leisure)",es:"Canal 09 — Trabajo (náutica recreativa)",pt:"Canal 09 — Trabalho (náutica recreativa)"},
      use:{fr:"CANAL DE TRAVAIL PLAISANCE\nFréquence : 156.450 MHz\n\nUTILISATION :\n→ Communications entre plaisanciers\n→ Marinas et ports de plaisance\n→ Canal de travail secondaire\n→ Non utilisé pour le commerce\n\nFRANCE :\nCertaines marinas maintiennent\nveille sur canal 09 en plus du 16\n\nATTENTION : ne pas confondre\ncanal 09 et canal 9 (différents !)",en:"LEISURE WORKING CHANNEL\nFrequency: 156.450 MHz\n\nUSE:\n→ Communications between leisure vessels\n→ Marinas and pleasure ports\n→ Secondary working channel\n→ Not used for commercial traffic\n\nFRANCE:\nSome marinas maintain\nwatch on channel 09 in addition to 16",es:"CANAL DE TRABAJO NÁUTICA RECREATIVA\nFrecuencia: 156.450 MHz\n\nUSO:\n→ Comunicaciones entre embarcaciones de recreo\n→ Puertos deportivos y marinas\n→ Canal de trabajo secundario\n→ No se usa para el tráfico comercial",pt:"CANAL DE TRABALHO NÁUTICA RECREATIVA\nFrequência: 156.450 MHz\n\nUSO:\n→ Comunicações entre embarcações de recreio\n→ Marinas e portos de recreio\n→ Canal de trabalho secundário\n→ Não usado para tráfego comercial"},},
    { ch:"12", color:C.orange,
      label:{fr:"Canal 12 — Port / Trafic",en:"Channel 12 — Port / Traffic",es:"Canal 12 — Puerto / Tráfico",pt:"Canal 12 — Porto / Tráfego"},
      use:{fr:"CANAL DE TRAFIC PORTUAIRE\nFréquence : 156.600 MHz\n\nUTILISATION :\n→ Communication navire-port\n→ VTS (Vessel Traffic Service)\n→ Mouvement des navires\n→ Annonce d'entrée en port\n\nIMPORTANT :\nCertains ports utilisent canal 11, 12 ou 14\nVérifier toujours les Instructions Nautiques\nAvant d'entrer dans un port\n\nSe signaler : 'Port de X, ici MV NOM'\nVitesse réduite en chenal portuaire",en:"PORT TRAFFIC CHANNEL\nFrequency: 156.600 MHz\n\nUSE:\n→ Vessel-port communication\n→ VTS (Vessel Traffic Service)\n→ Vessel movements\n→ Port entry announcement\n\nIMPORTANT:\nSome ports use channel 11, 12 or 14\nAlways check Sailing Directions\nBefore entering a port",es:"CANAL DE TRÁFICO PORTUARIO\nFrecuencia: 156.600 MHz\n\nUSO:\n→ Comunicación buque-puerto\n→ VTS (Servicio de Tráfico de Buques)\n→ Movimientos de buques\n→ Aviso de entrada al puerto",pt:"CANAL DE TRÁFEGO PORTUÁRIO\nFrequência: 156.600 MHz\n\nUSO:\n→ Comunicação navio-porto\n→ VTS (Serviço de Tráfego de Navios)\n→ Movimentos de navios\n→ Anúncio de entrada em porto"},},
    { ch:"WX", color:C.yellow,
      label:{fr:"Météo — Canaux WX / 68",en:"Weather — WX / Channel 68",es:"Meteorología — Canales WX / 68",pt:"Meteorologia — Canais WX / 68"},
      use:{fr:"DIFFUSION MÉTÉO MARITIME\n\nFRANCE :\nCROSS diffuse bulletins météo\nCanaux 79 · 80 · 67 selon zones\nHoraires fixes (ex: 07h15, 15h15)\n\nINTERNATIONAL :\nNavtex (518 kHz MF) = texte\nSAFETYNET (satellite) = EGC\nCanal 16 = annonce SafetyNET\n\nBULLETINS MÉTÉO COMPLETS :\n→ SMRB (Sécurité Maritime\n   des Régions du Bord) France\n→ Met Office UK: VHF + website\n→ MSI (Maritime Safety Information)\n\nÉCOUTER AVANT TOUTE NAVIGATION",en:"MARITIME WEATHER BROADCAST\n\nFRANCE:\nCROSS broadcasts weather bulletins\nChannels 79 · 80 · 67 by zone\nFixed times (e.g.: 07:15, 15:15)\n\nINTERNATIONAL:\nNavtex (518 kHz MF) = text\nSAFETYNET (satellite) = EGC\nChannel 16 = SafetyNET announcement\n\nLISTEN BEFORE ANY NAVIGATION",es:"DIFUSIÓN METEOROLÓGICA MARÍTIMA\n\nFRANCIA:\nCROSS difunde boletines meteorológicos\nCanales 79 · 80 · 67 según zonas\nHorarios fijos (ej.: 07:15, 15:15)\n\nINTERNACIONAL:\nNavtex (518 kHz MF) = texto\nSAFETYNET (satélite) = EGC",pt:"DIFUSÃO METEOROLÓGICA MARÍTIMA\n\nFRANÇA:\nCROSS difunde boletins meteorológicos\nCanais 79 · 80 · 67 por zona\nHorários fixos (ex.: 07h15, 15h15)\n\nINTERNACIONAL:\nNavtex (518 kHz MF) = texto\nSAFETYNET (satélite) = EGC"},},
  ];

  const sel_ = sel!==null ? channels[sel] : null;

  return (
    <div>
      {/* Radio display mockup */}
      <div style={{background:"#000a04",borderRadius:14,padding:"12px",marginBottom:12,border:`1px solid ${C.radio}22`,display:"flex",alignItems:"center",gap:12}}>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:32,fontWeight:900,color:C.radio,minWidth:60,textAlign:"center",textShadow:`0 0 12px ${C.radio}`}}>
          {sel_?sel_.ch:"16"}
        </div>
        <div>
          <div style={{fontSize:9,color:C.radio,letterSpacing:2,marginBottom:2}}>VHF MARINE</div>
          <div style={{fontSize:10,color:"rgba(0,255,136,0.6)"}}>
            {sel_?(sel_.label[lang]||sel_.label.fr):(lang==="fr"?"Canal de veille obligatoire":lang==="en"?"Mandatory watch channel":lang==="es"?"Canal de escucha obligatoria":"Canal de escuta obrigatório")}
          </div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {channels.map((ch,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${ch.color}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${sel===i?ch.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:20,fontWeight:900,color:ch.color,
              textShadow:sel===i?`0 0 8px ${ch.color}`:"none"}}>{ch.ch}</div>
            {ch.priority&&<div style={{fontSize:7,color:C.red,fontWeight:700,marginTop:2}}>⚠️ PRIORITÉ</div>}
            <div style={{fontSize:8,color:sel===i?ch.color:C.muted,fontWeight:700,marginTop:2,lineHeight:1.2}}>
              {(ch.label[lang]||ch.label.fr).split('—')[0].trim()}
            </div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:16,fontWeight:900,color:sel_.color,marginBottom:4}}>CH {sel_.ch}</div>
        <div style={{fontSize:12,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.use[lang]||sel_.use.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — VHF COMMUNICATION SIMULATOR
// ══════════════════════════════════════
function VHFSimulatorSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState("call"); // "call" | "response"

  const calls = {
    fr:{
      title:"Exemple d'appel VHF standard",
      steps:[
        { role:"navire", ch:"16", text:"Port de Marseille, Port de Marseille, Port de Marseille.\nIci MV Delta Sierra, MV Delta Sierra, MV Delta Sierra.\nJe suis à 3 miles à l'ouest de l'entrée du port.\nDemande autorisation d'entrée.\nTerminé.", label:"Appel initial (CH 16)"},
        { role:"port", ch:"16", text:"MV Delta Sierra, ici Port de Marseille.\nPassez sur le canal 12.\nTerminé.", label:"Réponse port (CH 16)"},
        { role:"navire", ch:"12", text:"[Bascule canal 12]\n\nPort de Marseille, ici MV Delta Sierra.\nSur canal 12.\nTerminé.", label:"Reprise sur canal travail (CH 12)"},
        { role:"port", ch:"12", text:"MV Delta Sierra, ici Port de Marseille.\nVotre position reçue.\nAutorisé à entrer.\nVitesse maximum 5 nœuds en chenal.\nTerminé.", label:"Autorisation accordée (CH 12)"},
        { role:"navire", ch:"12", text:"Port de Marseille, ici MV Delta Sierra.\nBien reçu. Entrons dans le chenal.\nVitesse 5 nœuds.\nTerminé.", label:"Accusé de réception (CH 12)"},
      ]},
    en:{
      title:"Standard VHF call example",
      steps:[
        { role:"vessel", ch:"16", text:"Marseille Port, Marseille Port, Marseille Port.\nThis is MV Delta Sierra, MV Delta Sierra, MV Delta Sierra.\nI am 3 miles west of the port entrance.\nRequesting entry authorization.\nOver.", label:"Initial call (CH 16)"},
        { role:"port", ch:"16", text:"MV Delta Sierra, this is Marseille Port.\nSwitch to channel 12.\nOver.", label:"Port response (CH 16)"},
        { role:"vessel", ch:"12", text:"[Switch to channel 12]\n\nMarseille Port, this is MV Delta Sierra.\nOn channel 12.\nOver.", label:"Resume on working channel (CH 12)"},
        { role:"port", ch:"12", text:"MV Delta Sierra, this is Marseille Port.\nPosition received.\nYou are authorized to enter.\nMaximum speed 5 knots in channel.\nOver.", label:"Authorization granted (CH 12)"},
        { role:"vessel", ch:"12", text:"Marseille Port, this is MV Delta Sierra.\nUnderstood. Entering channel.\nSpeed 5 knots.\nOut.", label:"Acknowledgment (CH 12)"},
      ]},
    es:{
      title:"Ejemplo de llamada VHF estándar",
      steps:[
        { role:"buque", ch:"16", text:"Puerto de Marsella, Puerto de Marsella, Puerto de Marsella.\nAquí MV Delta Sierra, MV Delta Sierra, MV Delta Sierra.\nEstoy a 3 millas al oeste de la entrada del puerto.\nSolicito autorización de entrada.\nCambio.", label:"Llamada inicial (CH 16)"},
        { role:"puerto", ch:"16", text:"MV Delta Sierra, aquí Puerto de Marsella.\nPase al canal 12.\nCambio.", label:"Respuesta puerto (CH 16)"},
        { role:"buque", ch:"12", text:"[Cambia al canal 12]\n\nPuerto de Marsella, aquí MV Delta Sierra.\nEn canal 12.\nCambio.", label:"Reanudación canal trabajo (CH 12)"},
        { role:"puerto", ch:"12", text:"MV Delta Sierra, aquí Puerto de Marsella.\nPosición recibida.\nAutorizado a entrar.\nVelocidad máxima 5 nudos en el canal.\nCambio.", label:"Autorización concedida (CH 12)"},
        { role:"buque", ch:"12", text:"Puerto de Marsella, aquí MV Delta Sierra.\nEntendido. Entrando al canal.\nVelocidad 5 nudos.\nCambio y fuera.", label:"Acuse de recibo (CH 12)"},
      ]},
    pt:{
      title:"Exemplo de chamada VHF padrão",
      steps:[
        { role:"navio", ch:"16", text:"Porto de Marselha, Porto de Marselha, Porto de Marselha.\nAqui MV Delta Sierra, MV Delta Sierra, MV Delta Sierra.\nEstou a 3 milhas a oeste da entrada do porto.\nSolicito autorização de entrada.\nMudança.", label:"Chamada inicial (CH 16)"},
        { role:"porto", ch:"16", text:"MV Delta Sierra, aqui Porto de Marselha.\nPasse para o canal 12.\nMudança.", label:"Resposta porto (CH 16)"},
        { role:"navio", ch:"12", text:"[Muda para canal 12]\n\nPorto de Marselha, aqui MV Delta Sierra.\nNo canal 12.\nMudança.", label:"Retoma no canal de trabalho (CH 12)"},
        { role:"porto", ch:"12", text:"MV Delta Sierra, aqui Porto de Marselha.\nPosição recebida.\nAutorizado a entrar.\nVelocidade máxima 5 nós no canal.\nMudança.", label:"Autorização concedida (CH 12)"},
        { role:"navio", ch:"12", text:"Porto de Marselha, aqui MV Delta Sierra.\nEntendido. Entrando no canal.\nVelocidade 5 nós.\nMudança e fora.", label:"Acuse de receção (CH 12)"},
      ]},
  };

  const c = calls[lang]||calls.fr;
  const s = c.steps[step];
  const isVessel = ["navire","vessel","buque","navio"].includes(s.role);

  return (
    <div>
      <div style={{fontSize:11,color:C.muted,textAlign:"center",marginBottom:10,fontWeight:600}}>{c.title}</div>
      {/* Progress */}
      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {c.steps.map((_,i)=>(
          <div key={i} onClick={()=>setStep(i)} style={{
            flex:1,height:4,borderRadius:4,cursor:"pointer",
            background:i<=step?(i===step?C.radio:"rgba(0,255,136,0.4)"):"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      {/* Step label */}
      <div style={{fontSize:9,color:C.radio,letterSpacing:2,textAlign:"center",marginBottom:8,fontFamily:"'Cinzel',serif"}}>{s.label}</div>
      {/* Radio message */}
      <div style={{
        background:isVessel?"rgba(0,20,50,0.8)":"rgba(30,0,50,0.8)",
        borderRadius:14,padding:"14px",marginBottom:12,
        border:`1px solid ${isVessel?C.blue2:C.purple}44`}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <div style={{fontFamily:"'Courier New',monospace",fontSize:14,fontWeight:900,
            color:isVessel?C.blue2:C.purple}}>CH {s.ch}</div>
          <div style={{fontSize:11,color:isVessel?C.blue2:C.purple,fontWeight:700}}>
            {isVessel?"🚢":"🏢"} {s.role.toUpperCase()}
          </div>
          <div style={{marginLeft:"auto",width:8,height:8,borderRadius:"50%",background:C.radio,
            animation:"tw 1s ease-in-out infinite"}}/>
        </div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:C.white,lineHeight:1.8,whiteSpace:"pre-line"}}>{s.text}</div>
      </div>
      {/* Navigation */}
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          style={{flex:1,padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":lang==="es"?"Anterior":"Anterior"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(c.steps.length-1,s+1))} disabled={step===c.steps.length-1}
          style={{flex:1,padding:"10px",borderRadius:10,background:step===c.steps.length-1?"rgba(255,255,255,0.06)":`${C.radio}22`,border:`1px solid ${step===c.steps.length-1?"rgba(255,255,255,0.1)":C.radio}`,color:C.white,cursor:step===c.steps.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":lang==="es"?"Siguiente":"Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — MAYDAY PROCEDURE
// ══════════════════════════════════════
function MaydayProcedureSVG({ lang }) {
  const [sel, setSel] = useState(0);

  const procedures = [
    { id:"mayday", color:C.red, icon:"🆘",
      label:{fr:"MAYDAY — Détresse",en:"MAYDAY — Distress",es:"MAYDAY — Socorro",pt:"MAYDAY — Perigo"},
      trigger:{fr:"Danger IMMÉDIAT de mort ou de naufrage",en:"IMMEDIATE danger of death or sinking",es:"Peligro INMEDIATO de muerte o naufragio",pt:"Perigo IMEDIATO de morte ou naufrágio"},
      procedure:{fr:"PROCÉDURE MAYDAY COMPLÈTE\n\n1. Sélectionner CH 16\n2. Puissance MAXIMALE (25W)\n3. Appuyer sur PTT et dire :\n\n'MAYDAY MAYDAY MAYDAY\nICI [NOM DU NAVIRE 3 fois]\nMAYDAY [NOM DU NAVIRE]\nMa position est [LAT/LONG ou relèvement]\nJe suis [nature de la détresse]\nJ'ai [nombre de personnes] personnes à bord\nJ'abandonne le navire (ou : navire en perdition)\nJe demande assistance immédiate\nTerminé'\n\n4. Attendre réponse 1 minute\n5. Si pas de réponse : répéter\n6. Activer EPIRB / SART\n7. Préparer canots de sauvetage",
               en:"COMPLETE MAYDAY PROCEDURE\n\n1. Select CH 16\n2. MAXIMUM power (25W)\n3. Press PTT and say:\n\n'MAYDAY MAYDAY MAYDAY\nTHIS IS [VESSEL NAME 3 times]\nMAYDAY [VESSEL NAME]\nMy position is [LAT/LONG or bearing]\nI am [nature of distress]\nI have [number of persons] on board\nI am abandoning ship (or: vessel in distress)\nI require immediate assistance\nOver'\n\n4. Wait for response 1 minute\n5. If no response: repeat\n6. Activate EPIRB / SART\n7. Prepare life rafts",
               es:"PROCEDIMIENTO MAYDAY COMPLETO\n\n1. Seleccionar CH 16\n2. Potencia MÁXIMA (25W)\n3. Pulsar PTT y decir:\n\n'MAYDAY MAYDAY MAYDAY\nAQUÍ [NOMBRE DEL BUQUE 3 veces]\nMAYDAY [NOMBRE DEL BUQUE]\nMi posición es [LAT/LONG o marcación]\nEstoy [naturaleza de la emergencia]\nTengo [número de personas] a bordo\nAbandono el buque\nSolicito asistencia inmediata\nCambio'\n\n4. Esperar respuesta 1 minuto\n5. Si no hay respuesta: repetir\n6. Activar EPIRB / SART",
               pt:"PROCEDIMENTO MAYDAY COMPLETO\n\n1. Selecionar CH 16\n2. Potência MÁXIMA (25W)\n3. Premir PTT e dizer:\n\n'MAYDAY MAYDAY MAYDAY\nAQUI [NOME DO NAVIO 3 vezes]\nMAYDAY [NOME DO NAVIO]\nA minha posição é [LAT/LONG ou marcação]\nEstou [natureza do perigo]\nTenho [número de pessoas] a bordo\nEstou a abandonar o navio\nSolicito assistência imediata\nMudança'\n\n4. Aguardar resposta 1 minuto\n5. Se sem resposta: repetir\n6. Ativar EPIRB / SART"},},
    { id:"panpan", color:C.orange, icon:"⚠️",
      label:{fr:"PAN-PAN — Urgence",en:"PAN-PAN — Urgency",es:"PAN-PAN — Urgencia",pt:"PAN-PAN — Urgência"},
      trigger:{fr:"Situation URGENTE ne mettant pas (encore) la vie en danger",en:"URGENT situation not (yet) life-threatening",es:"Situación URGENTE que no pone (todavía) en peligro la vida",pt:"Situação URGENTE que não coloca (ainda) a vida em perigo"},
      procedure:{fr:"PROCÉDURE PAN-PAN\n\n1. Canal 16 (ou ch. côtier)\n2. Puissance 25W\n3. Appuyer sur PTT :\n\n'PAN-PAN PAN-PAN PAN-PAN\nTOUT STATION (ou nom station)\nICI [NOM NAVIRE]\nMa position est [position]\n[Description de l'urgence]\n[Nombre de personnes]\n[Assistance requise]\nTerminé'\n\nEXEMPLES :\n→ Blessé à bord (PAN-PAN MEDICO)\n→ Panne moteur sans danger immédiat\n→ Personne malade non urgente\n→ Problème de navigation",
               en:"PAN-PAN PROCEDURE\n\n1. Channel 16 (or coastal ch.)\n2. Power 25W\n3. Press PTT:\n\n'PAN-PAN PAN-PAN PAN-PAN\nALL STATIONS (or station name)\nTHIS IS [VESSEL NAME]\nMy position is [position]\n[Description of urgency]\n[Number of persons]\n[Assistance required]\nOver'\n\nEXAMPLES:\n→ Injured on board (PAN-PAN MEDICO)\n→ Engine failure without immediate danger\n→ Non-urgent sick person\n→ Navigation problem",
               es:"PROCEDIMIENTO PAN-PAN\n\n'PAN-PAN PAN-PAN PAN-PAN\nTODAS LAS ESTACIONES\nAQUÍ [NOMBRE BUQUE]\nMi posición es [posición]\n[Descripción de la urgencia]\nCambio'\n\nEJEMPLOS:\n→ Herido a bordo (PAN-PAN MEDICO)\n→ Avería motor sin peligro inmediato\n→ Persona enferma no urgente\n→ Problema de navegación",
               pt:"PROCEDIMENTO PAN-PAN\n\n'PAN-PAN PAN-PAN PAN-PAN\nTODAS AS ESTAÇÕES\nAQUI [NOME NAVIO]\nA minha posição é [posição]\n[Descrição da urgência]\nMudança'\n\nEXEMPLOS:\n→ Ferido a bordo (PAN-PAN MEDICO)\n→ Avaria motor sem perigo imediato\n→ Pessoa doente não urgente\n→ Problema de navegação"},},
    { id:"securite", color:C.yellow, icon:"📢",
      label:{fr:"SÉCURITÉ — Information",en:"SÉCURITÉ — Safety info",es:"SÉCURITÉ — Información",pt:"SÉCURITÉ — Informação"},
      trigger:{fr:"Information de SÉCURITÉ MARITIME (météo · navigation · danger)",en:"MARITIME SAFETY information (weather · navigation · danger)",es:"Información de SEGURIDAD MARÍTIMA (meteorología · navegación · peligro)",pt:"Informação de SEGURANÇA MARÍTIMA (meteorologia · navegação · perigo)"},
      procedure:{fr:"PROCÉDURE SÉCURITÉ\n\n1. Canal 16 puis canal météo/trafic\n2. Appuyer sur PTT :\n\n'SÉCURITÉ SÉCURITÉ SÉCURITÉ\nTOUT STATION\nICI [ÉMETTEUR]\nUn message de sécurité suit\nPassez sur le canal [X]\nTerminé'\n\n[Basculer canal X]\n'SÉCURITÉ [répéter l'information]'\n\nÉMIS PAR :\n→ CROSS / Coastguard\n→ Navires signalant un danger\n→ Ports pour trafic\n→ Capitaineries\n\nEXEMPLES :\n→ Epave signalée non cartographiée\n→ Bulletin météo spécial\n→ Navire avarie en dérive",
               en:"SÉCURITÉ PROCEDURE\n\n1. Channel 16 then weather/traffic channel\n2. Press PTT:\n\n'SÉCURITÉ SÉCURITÉ SÉCURITÉ\nALL STATIONS\nTHIS IS [TRANSMITTER]\nA safety message follows\nSwitch to channel [X]\nOver'\n\n[Switch to channel X]\n'SÉCURITÉ [repeat the information]'\n\nISSUED BY:\n→ CROSS / Coastguard\n→ Vessels reporting a danger\n→ Ports for traffic\n→ Port authorities",
               es:"PROCEDIMIENTO SÉCURITÉ\n\n'SÉCURITÉ SÉCURITÉ SÉCURITÉ\nTODAS LAS ESTACIONES\nAQUÍ [EMISOR]\nSigue un mensaje de seguridad\nPase al canal [X]\nCambio'\n\nEMITIDO POR:\n→ CROSS / Guardacostas\n→ Buques que señalan un peligro\n→ Puertos para tráfico\n→ Capitanías",
               pt:"PROCEDIMENTO SÉCURITÉ\n\n'SÉCURITÉ SÉCURITÉ SÉCURITÉ\nTODAS AS ESTAÇÕES\nAQUI [EMISSOR]\nSeguirá uma mensagem de segurança\nPasse para o canal [X]\nMudança'\n\nEMITIDO POR:\n→ CROSS / Guardas costeiros\n→ Navios a sinalizar um perigo\n→ Portos para tráfego\n→ Capitanias"},},
    { id:"dsc", color:C.purple, icon:"📡",
      label:{fr:"DSC — Alerte numérique",en:"DSC — Digital alert",es:"LSD — Alerta digital",pt:"ASN — Alerta digital"},
      trigger:{fr:"Toujours activer DSC EN PREMIER avant MAYDAY vocal",en:"Always activate DSC FIRST before vocal MAYDAY",es:"Siempre activar LSD PRIMERO antes del MAYDAY vocal",pt:"Sempre ativar ASN PRIMEIRO antes do MAYDAY vocal"},
      procedure:{fr:"PROCÉDURE DSC (CANAL 70)\n\nÉTAPE 1 : Appui bouton DÉTRESSE\n(souvent rouge avec couvercle)\n\nÉTAPE 2 : Confirmation (5 secondes)\nPour éviter les fausses alertes\n\nÉTAPE 3 : Transmission automatique\nLe VHF envoie automatiquement :\n→ MMSI du navire (9 chiffres)\n→ Nature de la détresse\n→ Position GPS (si connecté)\n→ Heure UTC\n\nÉTAPE 4 : Après DSC\nPasser sur CH 16 pour MAYDAY vocal\n\nRÉPONSE CROSS :\nAccusé de réception DSC\npuis demande de confirmation vocale",
               en:"DSC PROCEDURE (CHANNEL 70)\n\nSTEP 1: Press DISTRESS button\n(usually red with cover)\n\nSTEP 2: Confirmation (5 seconds)\nTo avoid false alerts\n\nSTEP 3: Automatic transmission\nVHF automatically sends:\n→ Vessel MMSI (9 digits)\n→ Nature of distress\n→ GPS position (if connected)\n→ UTC time\n\nSTEP 4: After DSC\nSwitch to CH 16 for vocal MAYDAY\n\nCROSS RESPONSE:\nDSC acknowledgment\nthen request for vocal confirmation",
               es:"PROCEDIMIENTO LSD (CANAL 70)\n\nPASO 1: Pulsar botón SOCORRO\n(normalmente rojo con tapa)\n\nPASO 2: Confirmación (5 segundos)\n\nPASO 3: Transmisión automática\nEl VHF envía automáticamente:\n→ MMSI del buque (9 dígitos)\n→ Naturaleza de la emergencia\n→ Posición GPS (si conectado)\n→ Hora UTC\n\nPASO 4: Tras LSD\nPasar al CH 16 para MAYDAY vocal",
               pt:"PROCEDIMENTO ASN (CANAL 70)\n\nPASSO 1: Premir botão SOCORRO\n(geralmente vermelho com tampa)\n\nPASSO 2: Confirmação (5 segundos)\n\nPASSO 3: Transmissão automática\nO VHF envia automaticamente:\n→ MMSI do navio (9 dígitos)\n→ Natureza do perigo\n→ Posição GPS (se conectado)\n→ Hora UTC\n\nPASSO 4: Após ASN\nPassar para CH 16 para MAYDAY vocal"},},
  ];

  const sel_ = procedures[sel];
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {procedures.map((p,i)=>(
          <div key={i} onClick={()=>setSel(i)} style={{
            padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${p.color}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${sel===i?p.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:22,marginBottom:3}}>{p.icon}</div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:11,fontWeight:900,color:p.color,marginBottom:2}}>
              {p.id.toUpperCase()}
            </div>
            <div style={{fontSize:8,color:sel===i?p.color:C.muted,fontWeight:700,lineHeight:1.2}}>{p.label[lang]||p.label.fr}</div>
          </div>
        ))}
      </div>
      <div style={{padding:"8px 12px",borderRadius:10,background:`${sel_.color}12`,border:`1px solid ${sel_.color}33`,marginBottom:10}}>
        <div style={{fontSize:10,color:sel_.color,fontWeight:700}}>
          {lang==="fr"?"⚡ DÉCLENCHER QUAND :":lang==="en"?"⚡ TRIGGER WHEN:":lang==="es"?"⚡ ACTIVAR CUANDO:":"⚡ ATIVAR QUANDO:"} {sel_.trigger[lang]||sel_.trigger.fr}
        </div>
      </div>
      <div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}33`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",fontFamily:"'Courier New',monospace"}}>{sel_.procedure[lang]||sel_.procedure.fr}</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — PHONETIC ALPHABET RADIO
// ══════════════════════════════════════
function PhoneticAlphabetSVG({ lang }) {
  const [quiz, setQuiz] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const alpha = [
    ["A","Alpha"],["B","Bravo"],["C","Charlie"],["D","Delta"],["E","Echo"],
    ["F","Foxtrot"],["G","Golf"],["H","Hotel"],["I","India"],["J","Juliet"],
    ["K","Kilo"],["L","Lima"],["M","Mike"],["N","November"],["O","Oscar"],
    ["P","Papa"],["Q","Quebec"],["R","Romeo"],["S","Sierra"],["T","Tango"],
    ["U","Uniform"],["V","Victor"],["W","Whiskey"],["X","X-ray"],["Y","Yankee"],["Z","Zulu"],
  ];

  const quizQs = [
    {q:"L",opts:["Lima","Kilo","India","Mike"],correct:0},
    {q:"S",opts:["Sierra","Tango","Oscar","Romeo"],correct:0},
    {q:"N",opts:["Nemo","Oscar","November","Mike"],correct:2},
    {q:"G",opts:["Foxtrot","Golf","Hotel","India"],correct:1},
    {q:"W",opts:["Victor","Whiskey","X-ray","Yankee"],correct:1},
  ];

  const [shuffled]=useState(()=>quizQs.map(shuffleQuestionOptions));
  const q = shuffled[qIdx];

  if(!quiz) return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4,marginBottom:10}}>
        {alpha.map(([l,w])=>(
          <div key={l} style={{padding:"5px 3px",borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:900,color:C.gold2}}>{l}</div>
            <div style={{fontSize:8,color:C.muted,lineHeight:1.2}}>{w}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>setQuiz(true)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:`${C.radio}22`,border:`1px solid ${C.radio}44`,color:C.radio,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        🎯 {lang==="fr"?"TESTER MA MÉMOIRE":lang==="en"?"TEST MY MEMORY":lang==="es"?"PROBAR MI MEMORIA":"TESTAR A MINHA MEMÓRIA"}
      </button>
    </div>
  );

  if(done) return (
    <div style={{textAlign:"center",padding:"16px"}}>
      <div style={{fontSize:40}}>{score>=4?"🏆":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:C.white,margin:"8px 0"}}>{score}/{quizQs.length}</div>
      <button onClick={()=>{setDone(false);setQIdx(0);setAns(null);setScore(0);setQuiz(false);}} style={{padding:"8px 16px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer",fontSize:11}}>
        🔄 {lang==="fr"?"Recommencer":lang==="en"?"Restart":lang==="es"?"Reiniciar":"Recomeçar"}
      </button>
    </div>
  );

  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"16px",marginBottom:12,textAlign:"center",border:`1px solid ${C.radio}33`}}>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:40,fontWeight:900,color:C.radio,textShadow:`0 0 20px ${C.radio}`}}>{q.q}</div>
        <div style={{fontSize:11,color:C.muted,marginTop:4}}>
          {lang==="fr"?"Quel est le mot phonétique ?":lang==="en"?"What is the phonetic word?":lang==="es"?"¿Cuál es la palabra fonética?":"Qual é a palavra fonética?"}
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(ans!==null){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===ans){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>{if(ans!==null)return;setAns(i);if(i===q.correct)setScore(s=>s+1);}} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:13,cursor:ans!==null?"default":"pointer",fontFamily:"'Courier New',monospace"}}>{opt}</button>;
        })}
      </div>
      {ans!==null&&<button onClick={()=>{if(qIdx<quizQs.length-1){setQIdx(q=>q+1);setAns(null);}else setDone(true);}} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`${C.radio}22`,border:`1px solid ${C.radio}44`,color:C.radio,fontSize:12,fontWeight:700,cursor:"pointer"}}>
        {qIdx<quizQs.length-1?"NEXT →":"FINISH"}
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
    fr:{title:"Naufrage MV Le Joola — Sénégal (2002)",teaser:"Bac · 1 863 morts · pas de MAYDAY transmis · chavirage en 5 minutes · radio non utilisée",what:"Le 26 septembre 2002, le ferry sénégalais MV Le Joola chavire au large de la Gambie. Il transportait plus de 1 900 passagers (pour une capacité de 536). Le navire chavire en 5 minutes lors d'une tempête. Seulement 64 survivants. C'est l'une des plus grandes catastrophes maritimes de l'histoire.",cause:"• AUCUN signal MAYDAY émis sur VHF\n• L'officier radio n'a pas transmis d'alerte\n• Surcharge massive (1 900+ pour 536 places)\n• Tempête prévisible non prise en compte\n• Stabilité du navire déjà compromise\n• Pas de coordination avec les autorités maritimes\n• Gilets de sauvetage insuffisants et inaccessibles",lessons:"✓ MAYDAY VHF = obligation légale en détresse\n✓ Canal 16 doit être surveillé en permanence\n✓ DSC ch.70 = alerte automatique avec position GPS\n✓ L'officier radio doit émettre l'alerte en PRIORITÉ\n✓ Une alerte à temps = secours en 30-60 minutes\n✓ Sans alerte = personne ne sait où chercher",link:"🔗 Lien L5 : Le MV Le Joola aurait pu être secouru si un MAYDAY avait été émis à temps. Les secours auraient eu 5 minutes pour se mobiliser. Sans signal radio, personne ne savait que le navire coulait. Le VHF n'est pas un outil de communication — c'est un outil de survie."},
    en:{title:"MV Le Joola Sinking — Senegal (2002)",teaser:"Ferry · 1,863 dead · no MAYDAY transmitted · capsized in 5 minutes · radio unused",what:"On September 26, 2002, the Senegalese ferry MV Le Joola capsizes off Gambia. It carried over 1,900 passengers (for a capacity of 536). The vessel capsizes in 5 minutes during a storm. Only 64 survivors. It is one of the greatest maritime disasters in history.",cause:"• NO MAYDAY signal sent on VHF\n• Radio officer did not transmit alert\n• Massive overloading (1,900+ for 536 capacity)\n• Foreseeable storm not taken into account\n• Vessel stability already compromised\n• No coordination with maritime authorities\n• Life jackets insufficient and inaccessible",lessons:"✓ MAYDAY VHF = legal obligation in distress\n✓ Channel 16 must be monitored permanently\n✓ DSC ch.70 = automatic alert with GPS position\n✓ Radio officer must transmit alert as PRIORITY\n✓ A timely alert = rescue in 30-60 minutes\n✓ Without alert = no one knows where to search",link:"🔗 L5 Link: The MV Le Joola could have been rescued if a MAYDAY had been transmitted in time. Rescuers would have had 5 minutes to mobilize. Without a radio signal, no one knew the vessel was sinking. VHF is not a communication tool — it is a survival tool."},
    es:{title:"Hundimiento MV Le Joola — Senegal (2002)",teaser:"Ferry · 1.863 muertos · sin MAYDAY transmitido · vuelco en 5 minutos · radio sin usar",what:"El 26 de septiembre de 2002, el ferry senegalés MV Le Joola vuelca frente a Gambia. Transportaba más de 1.900 pasajeros (para una capacidad de 536). El buque vuelca en 5 minutos durante una tormenta. Solo 64 supervivientes.",cause:"• NINGUNA señal MAYDAY emitida por VHF\n• El oficial de radio no transmitió ninguna alerta\n• Sobrecarga masiva (1.900+ para 536 plazas)\n• Tormenta previsible no tenida en cuenta\n• Estabilidad del buque ya comprometida\n• Sin coordinación con las autoridades marítimas",lessons:"✓ MAYDAY VHF = obligación legal en situación de socorro\n✓ Canal 16 debe vigilarse de forma permanente\n✓ LSD ch.70 = alerta automática con posición GPS\n✓ El oficial de radio debe transmitir la alerta CON PRIORIDAD",link:"🔗 Vínculo L5: El MV Le Joola podría haber sido rescatado si se hubiera emitido un MAYDAY a tiempo. Sin señal de radio, nadie sabía que el buque se hundía. El VHF no es una herramienta de comunicación — es una herramienta de supervivencia."},
    pt:{title:"Naufrágio MV Le Joola — Senegal (2002)",teaser:"Ferry · 1.863 mortos · sem MAYDAY transmitido · capotagem em 5 minutos · rádio não usado",what:"A 26 de setembro de 2002, o ferry senegalês MV Le Joola capsiza ao largo da Gâmbia. Transportava mais de 1.900 passageiros (para uma capacidade de 536). O navio capsize em 5 minutos durante uma tempestade. Apenas 64 sobreviventes.",cause:"• NENHUM sinal MAYDAY emitido no VHF\n• O oficial de rádio não transmitiu o alerta\n• Sobrecarga massiva (1.900+ para 536 lugares)\n• Tempestade previsível não tomada em conta\n• Estabilidade do navio já comprometida\n• Sem coordenação com as autoridades marítimas",lessons:"✓ MAYDAY VHF = obrigação legal em perigo\n✓ Canal 16 deve ser monitorizado permanentemente\n✓ ASN ch.70 = alerta automático com posição GPS\n✓ O oficial de rádio deve transmitir o alerta PRIORITARIAMENTE",link:"🔗 Vínculo L5: O MV Le Joola poderia ter sido salvo se um MAYDAY tivesse sido transmitido a tempo. Sem sinal rádio, ninguém sabia que o navio estava a afundar. O VHF não é uma ferramenta de comunicação — é uma ferramenta de sobrevivência."},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>📻</span>
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
      {id:"q1",q:"Quel canal VHF doit être surveillé en permanence par tout navire en mer ?\n(Répondre : numéro de canal)",correct:"16"},
      {id:"q2",q:"MAYDAY · PAN-PAN · SÉCURITÉ — lequel indique DANGER DE MORT IMMÉDIAT ?\n(Répondre : 1 mot)",correct:"MAYDAY"},
      {id:"q3",q:"Le canal DSC (Appel Sélectif Numérique) = canal ?\n(Répondre : numéro)",correct:"70"},
    ],
    en:[
      {id:"q1",q:"Which VHF channel must be monitored permanently by any vessel at sea?\n(Answer: channel number)",correct:"16"},
      {id:"q2",q:"MAYDAY · PAN-PAN · SÉCURITÉ — which one signals IMMEDIATE DANGER OF DEATH?\n(Answer: 1 word)",correct:"MAYDAY"},
      {id:"q3",q:"The DSC (Digital Selective Calling) channel = channel?\n(Answer: number)",correct:"70"},
    ],
    es:[
      {id:"q1",q:"¿Qué canal VHF debe vigilarse de forma permanente por cualquier buque en el mar?\n(Responder: número de canal)",correct:"16"},
      {id:"q2",q:"MAYDAY · PAN-PAN · SÉCURITÉ — ¿cuál indica PELIGRO DE MUERTE INMEDIATO?\n(Responder: 1 palabra)",correct:"MAYDAY"},
      {id:"q3",q:"¿El canal LSD (Llamada Selectiva Digital) = canal?\n(Responder: número)",correct:"70"},
    ],
    pt:[
      {id:"q1",q:"Que canal VHF deve ser monitorizado permanentemente por qualquer navio no mar?\n(Responder: número de canal)",correct:"16"},
      {id:"q2",q:"MAYDAY · PAN-PAN · SÉCURITÉ — qual indica PERIGO DE MORTE IMEDIATO?\n(Responder: 1 palavra)",correct:"MAYDAY"},
      {id:"q3",q:"O canal ASN (Chamada Seletiva Digital) = canal?\n(Responder: número)",correct:"70"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v==="16"||v.includes("16");
    if(q.id==="q2") return v.includes("mayday");
    if(q.id==="q3") return v==="70"||v.includes("70");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.radio}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Canal 16 = veille permanente · MAYDAY = danger de mort · Canal 70 = DSC numérique"
        :lang==="en"?"💡 Reminders: Channel 16 = permanent watch · MAYDAY = danger of death · Channel 70 = digital DSC"
        :lang==="es"?"💡 Recordatorios: Canal 16 = escucha permanente · MAYDAY = peligro de muerte · Canal 70 = LSD digital"
        :"💡 Lembretes: Canal 16 = escuta permanente · MAYDAY = perigo de morte · Canal 70 = ASN digital"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:14,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: Canal 16 (156.800 MHz · veille permanente obligatoire GMDSS · appels initiaux)\n✅ Q2: MAYDAY (danger de mort immédiat · à prononcer 3 fois · canal 16 · 25W)\n✅ Q3: Canal 70 (156.525 MHz · DSC · exclusif numérique · activer avant MAYDAY vocal)"
        :lang==="en"?"✅ Q1: Channel 16 (156.800 MHz · mandatory permanent GMDSS watch · initial calls)\n✅ Q2: MAYDAY (immediate danger of death · say 3 times · channel 16 · 25W)\n✅ Q3: Channel 70 (156.525 MHz · DSC · digital exclusive · activate before vocal MAYDAY)"
        :"✅ Q1: Canal 16 · Q2: MAYDAY · Q3: Canal 70"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.radio}12`,border:`1px solid ${showC?C.green:C.radio}44`,color:showC?C.green:C.radio,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Quel est le canal VHF de veille obligatoire pour tous les navires en mer ?",opts:["Canal 9","Canal 12","Canal 16 — fréquence 156.800 MHz · appels de détresse · urgence · sécurité","Canal 70"],correct:2,expl:"Canal 16 (156.800 MHz) = canal de VEILLE OBLIGATOIRE pour tous les navires soumis au GMDSS (en mer). Obligations : maintenir une écoute permanente 24h/24 pendant la navigation. Utilisation : appels initiaux, détresse (MAYDAY), urgence (PAN-PAN), sécurité (SÉCURITÉ). Après contact établi : basculer sur un canal de travail. En port : canal 16 + canal du port (12, 67, etc. selon le port). La veille peut être effectuée par scanner automatique (dual watch)."},
    {q:"Quelle est la procédure correcte pour un MAYDAY ?",opts:["Radio VHF canal 12 · dire MAYDAY une fois · donner position","Canal 16 · puissance 25W · MAYDAY 3 fois · nom navire 3 fois · position · nature détresse · nombre personnes · assistance requise · Terminé","Canal 70 uniquement","Canal 67 · MAYDAY 2 fois"],correct:1,expl:"MAYDAY procédure (COLREG + SOLAS) : Canal 16, puissance maximale 25W. Dire : MAYDAY MAYDAY MAYDAY, puis NOM DU NAVIRE 3 fois, puis MAYDAY + nom navire, puis : POSITION (lat/long ou relèvement), NATURE DE LA DÉTRESSE, NOMBRE DE PERSONNES, ASSISTANCE REQUISE, 'Terminé'. Toujours activer DSC canal 70 EN PREMIER si disponible. Attendre réponse 1 min. Si pas de réponse : répéter. Activer EPIRB."},
    {q:"Quelle est la différence entre MAYDAY, PAN-PAN et SÉCURITÉ ?",opts:["Ils sont identiques","MAYDAY = danger de mort immédiat · PAN-PAN = situation urgente sans danger de mort immédiat · SÉCURITÉ = information de sécurité navigation","PAN-PAN = plus grave que MAYDAY","SÉCURITÉ = signal de détresse"],correct:1,expl:"Hiérarchie des signaux radio VHF : MAYDAY (du français 'm'aidez') = danger IMMÉDIAT de mort ou de naufrage. Priorité absolue. Canal 16. PAN-PAN (du français 'panne') = situation URGENTE ne mettant pas encore la vie en danger. Canal 16. SÉCURITÉ (de l'anglais 'safety') = information de sécurité maritime (météo, danger navigation). Annoncé sur ch.16 puis diffusé sur canal de trafic. Exemples : MAYDAY = navire coule · PAN-PAN = blessé grave · SÉCURITÉ = épave non cartographiée."},
    {q:"À quoi sert le canal 70 sur une radio VHF marine ?",opts:["Canal de travail général","Canal exclusivement réservé au DSC (Appel Sélectif Numérique) — aucune communication vocale sur ce canal","Canal météo","Canal de port"],correct:1,expl:"Canal 70 (156.525 MHz) = usage EXCLUSIF pour le DSC (Digital Selective Calling / Appel Sélectif Numérique). Ne JAMAIS émettre de voix sur ce canal. Le VHF envoie automatiquement des signaux numériques codés sur ch.70. Lors d'une détresse : appuyer sur le bouton DSC distress → le VHF envoie automatiquement MMSI + position GPS + nature détresse sur ch.70. Les stations côtières surveillent ch.70 en permanence."},
    {q:"Qu'est-ce que le MMSI sur une radio VHF marine ?",opts:["Un canal radio","Maritime Mobile Service Identity — numéro d'identification à 9 chiffres unique attribué à chaque navire pour le DSC et l'AIS","Un certificat radio","Un signal de détresse"],correct:1,expl:"MMSI (Maritime Mobile Service Identity) = 9 chiffres d'identification UNIQUE attribués à chaque navire. Format : 9 chiffres (ex: 227123456 pour un navire français). Inclus automatiquement dans les appels DSC. Permet aux secours d'identifier immédiatement le navire en détresse. ENREGISTREMENT : obligatoire avant utilisation, auprès de l'autorité de télécommunications (ANFR en France). Différent du MMSI personnel pour balises individuelles (commence par 0)."},
  ],
  en:[
    {q:"What is the mandatory VHF watch channel for all vessels at sea?",opts:["Channel 9","Channel 12","Channel 16 — frequency 156.800 MHz · distress · urgency · safety calls","Channel 70"],correct:2,expl:"Channel 16 (156.800 MHz) = MANDATORY WATCH channel for all vessels subject to GMDSS (at sea). Obligations: maintain permanent 24h/24 watch during navigation. Use: initial calls, distress (MAYDAY), urgency (PAN-PAN), safety (SÉCURITÉ). After contact established: switch to working channel. In port: channel 16 + port channel (12, 67, etc. per port). Watch may be maintained by automatic scanner (dual watch)."},
    {q:"What is the correct procedure for a MAYDAY?",opts:["VHF radio channel 12 · say MAYDAY once · give position","Channel 16 · 25W power · MAYDAY 3 times · vessel name 3 times · position · nature of distress · number of persons · assistance required · Over","Channel 70 only","Channel 67 · MAYDAY twice"],correct:1,expl:"MAYDAY procedure (COLREG + SOLAS): Channel 16, maximum power 25W. Say: MAYDAY MAYDAY MAYDAY, then VESSEL NAME 3 times, then MAYDAY + vessel name, then: POSITION (lat/long or bearing), NATURE OF DISTRESS, NUMBER OF PERSONS, ASSISTANCE REQUIRED, 'Over'. Always activate DSC channel 70 FIRST if available. Wait for response 1 min. If no response: repeat. Activate EPIRB."},
    {q:"What is the difference between MAYDAY, PAN-PAN and SÉCURITÉ?",opts:["They are identical","MAYDAY = immediate danger of death · PAN-PAN = urgent situation without immediate danger of death · SÉCURITÉ = navigation safety information","PAN-PAN = more serious than MAYDAY","SÉCURITÉ = distress signal"],correct:1,expl:"VHF radio signal hierarchy: MAYDAY (from French 'm'aidez' = help me) = IMMEDIATE danger of death or sinking. Absolute priority. Channel 16. PAN-PAN (from French 'panne' = breakdown) = URGENT situation not yet life-threatening. Channel 16. SÉCURITÉ (from English 'safety') = maritime safety information (weather, navigation danger). Announced on ch.16 then broadcast on traffic channel. Examples: MAYDAY = vessel sinking · PAN-PAN = serious injury · SÉCURITÉ = uncharted wreck."},
    {q:"What is channel 70 used for on a marine VHF radio?",opts:["General working channel","Channel exclusively reserved for DSC (Digital Selective Calling) — no voice communication on this channel","Weather channel","Port channel"],correct:1,expl:"Channel 70 (156.525 MHz) = EXCLUSIVE use for DSC (Digital Selective Calling). NEVER transmit voice on this channel. The VHF automatically sends coded digital signals on ch.70. In distress: press DSC distress button → VHF automatically sends MMSI + GPS position + nature of distress on ch.70. Coastal stations permanently monitor ch.70."},
    {q:"What is the MMSI on a marine VHF radio?",opts:["A radio channel","Maritime Mobile Service Identity — unique 9-digit identification number assigned to each vessel for DSC and AIS","A radio certificate","A distress signal"],correct:1,expl:"MMSI (Maritime Mobile Service Identity) = 9 unique identification digits assigned to each vessel. Format: 9 digits (e.g. 227123456 for a French vessel). Automatically included in DSC calls. Allows rescue services to immediately identify the vessel in distress. REGISTRATION: mandatory before use, with telecommunications authority (ANFR in France). Different from personal MMSI for individual beacons (starts with 0)."},
  ],
  es:[
    {q:"¿Cuál es el canal VHF de escucha obligatoria para todos los buques en el mar?",opts:["Canal 9","Canal 12","Canal 16 — frecuencia 156.800 MHz · socorro · urgencia · seguridad","Canal 70"],correct:2,expl:"Canal 16 (156.800 MHz) = canal de ESCUCHA OBLIGATORIA para todos los buques sujetos al GMDSS. Obligaciones: mantener escucha permanente 24h/24 durante la navegación. Uso: llamadas iniciales, socorro (MAYDAY), urgencia (PAN-PAN), seguridad (SÉCURITÉ). Después del contacto: cambiar al canal de trabajo. En puerto: canal 16 + canal del puerto."},
    {q:"¿Cuál es el procedimiento correcto para un MAYDAY?",opts:["Radio VHF canal 12 · decir MAYDAY una vez · dar posición","Canal 16 · potencia 25W · MAYDAY 3 veces · nombre del buque 3 veces · posición · naturaleza de la emergencia · número de personas · asistencia requerida · Cambio","Solo canal 70","Canal 67 · MAYDAY 2 veces"],correct:1,expl:"Procedimiento MAYDAY (COLREG + SOLAS): Canal 16, potencia máxima 25W. Decir: MAYDAY MAYDAY MAYDAY, luego NOMBRE DEL BUQUE 3 veces, luego MAYDAY + nombre del buque, luego: POSICIÓN, NATURALEZA DE LA EMERGENCIA, NÚMERO DE PERSONAS, ASISTENCIA REQUERIDA, 'Cambio'. Siempre activar LSD canal 70 PRIMERO si disponible. Esperar respuesta 1 min. Si no hay respuesta: repetir. Activar EPIRB."},
    {q:"¿Cuál es la diferencia entre MAYDAY, PAN-PAN y SÉCURITÉ?",opts:["Son idénticos","MAYDAY = peligro de muerte inmediato · PAN-PAN = situación urgente sin peligro de muerte inmediato · SÉCURITÉ = información de seguridad de la navegación","PAN-PAN = más grave que MAYDAY","SÉCURITÉ = señal de socorro"],correct:1,expl:"Jerarquía de señales VHF: MAYDAY = peligro INMEDIATO de muerte o naufragio. Prioridad absoluta. Canal 16. PAN-PAN = situación URGENTE sin poner todavía la vida en peligro. Canal 16. SÉCURITÉ = información de seguridad marítima (meteorología, peligro de navegación). Ejemplos: MAYDAY = buque hunde · PAN-PAN = herido grave · SÉCURITÉ = naufragio no cartografiado."},
    {q:"¿Para qué sirve el canal 70 en una radio VHF marina?",opts:["Canal de trabajo general","Canal reservado exclusivamente para LSD (Llamada Selectiva Digital) — ninguna comunicación de voz en este canal","Canal meteorológico","Canal de puerto"],correct:1,expl:"Canal 70 (156.525 MHz) = uso EXCLUSIVO para LSD (Digital Selective Calling). NUNCA transmitir voz en este canal. El VHF envía automáticamente señales digitales codificadas en el ch.70. En emergencia: pulsar botón de socorro LSD → el VHF envía automáticamente MMSI + posición GPS + naturaleza de la emergencia. Las estaciones costeras vigilan el ch.70 de forma permanente."},
    {q:"¿Qué es el MMSI en una radio VHF marina?",opts:["Un canal de radio","Maritime Mobile Service Identity — número de identificación único de 9 dígitos asignado a cada buque para LSD y AIS","Un certificado de radio","Una señal de socorro"],correct:1,expl:"MMSI (Maritime Mobile Service Identity) = 9 dígitos de identificación ÚNICOS asignados a cada buque. Formato: 9 dígitos. Incluido automáticamente en las llamadas LSD. Permite a los servicios de rescate identificar inmediatamente el buque en peligro. REGISTRO: obligatorio antes de su uso, ante la autoridad de telecomunicaciones."},
  ],
  pt:[
    {q:"Qual é o canal VHF de escuta obrigatória para todos os navios no mar?",opts:["Canal 9","Canal 12","Canal 16 — frequência 156.800 MHz · socorro · urgência · segurança","Canal 70"],correct:2,expl:"Canal 16 (156.800 MHz) = canal de ESCUTA OBRIGATÓRIA para todos os navios sujeitos ao GMDSS. Obrigações: manter escuta permanente 24h/24 durante a navegação. Uso: chamadas iniciais, socorro (MAYDAY), urgência (PAN-PAN), segurança (SÉCURITÉ). Após contacto: mudar para canal de trabalho. Em porto: canal 16 + canal do porto."},
    {q:"Qual é o procedimento correto para um MAYDAY?",opts:["Rádio VHF canal 12 · dizer MAYDAY uma vez · dar posição","Canal 16 · potência 25W · MAYDAY 3 vezes · nome do navio 3 vezes · posição · natureza do perigo · número de pessoas · assistência requerida · Mudança","Apenas canal 70","Canal 67 · MAYDAY 2 vezes"],correct:1,expl:"Procedimento MAYDAY (COLREG + SOLAS): Canal 16, potência máxima 25W. Dizer: MAYDAY MAYDAY MAYDAY, depois NOME DO NAVIO 3 vezes, depois MAYDAY + nome do navio, depois: POSIÇÃO, NATUREZA DO PERIGO, NÚMERO DE PESSOAS, ASSISTÊNCIA REQUERIDA, 'Mudança'. Sempre ativar ASN canal 70 PRIMEIRO se disponível. Aguardar resposta 1 min. Se sem resposta: repetir. Ativar EPIRB."},
    {q:"Qual é a diferença entre MAYDAY, PAN-PAN e SÉCURITÉ?",opts:["São idênticos","MAYDAY = perigo de morte imediato · PAN-PAN = situação urgente sem perigo de morte imediato · SÉCURITÉ = informação de segurança de navegação","PAN-PAN = mais grave que MAYDAY","SÉCURITÉ = sinal de socorro"],correct:1,expl:"Hierarquia dos sinais VHF: MAYDAY = perigo IMEDIATO de morte ou naufrágio. Prioridade absoluta. Canal 16. PAN-PAN = situação URGENTE sem pôr ainda a vida em perigo. Canal 16. SÉCURITÉ = informação de segurança marítima (meteorologia, perigo de navegação). Exemplos: MAYDAY = navio a afundar · PAN-PAN = ferido grave · SÉCURITÉ = naufrágio não cartografado."},
    {q:"Para que serve o canal 70 num rádio VHF marítimo?",opts:["Canal de trabalho geral","Canal exclusivamente reservado ao ASN (Chamada Seletiva Digital) — nenhuma comunicação de voz neste canal","Canal meteorológico","Canal de porto"],correct:1,expl:"Canal 70 (156.525 MHz) = uso EXCLUSIVO para ASN (Digital Selective Calling). NUNCA transmitir voz neste canal. O VHF envia automaticamente sinais digitais codificados no ch.70. Em perigo: premir botão de socorro ASN → o VHF envia automaticamente MMSI + posição GPS + natureza do perigo. As estações costeiras monitorizam o ch.70 permanentemente."},
    {q:"O que é o MMSI num rádio VHF marítimo?",opts:["Um canal de rádio","Maritime Mobile Service Identity — número de identificação único de 9 dígitos atribuído a cada navio para ASN e AIS","Um certificado de rádio","Um sinal de socorro"],correct:1,expl:"MMSI (Maritime Mobile Service Identity) = 9 dígitos de identificação ÚNICOS atribuídos a cada navio. Formato: 9 dígitos. Incluído automaticamente nas chamadas ASN. Permite aos serviços de resgate identificar imediatamente o navio em perigo. REGISTO: obrigatório antes de usar, junto da autoridade de telecomunicações."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que le GMDSS (Système Mondial de Détresse et de Sécurité en Mer) ?",opts:["Un système de navigation","Système international de communications maritimes de sécurité requis par SOLAS — couvre toutes les zones de navigation — intègre VHF DSC · MF/HF · NAVTEX · EPIRB · SART","Un système de cartes","Un système de pilotage"],correct:1,expl:"GMDSS (Global Maritime Distress and Safety System) = système requis par SOLAS pour navires > 300 TB en voyages internationaux. Zones : A1 (VHF), A2 (MF + VHF), A3 (Inmarsat + MF/HF + VHF), A4 (HF + toutes). Composants : VHF DSC canal 70 + 16 · MF DSC 2187.5 kHz · HF DSC · NAVTEX 518 kHz · EPIRB · SART · RLS · répondeur radar. Objective: sauvetage en moins de 30 min grâce à l'alerte automatique."},
    {q:"Qu'est-ce qu'un EPIRB (Emergency Position-Indicating Radio Beacon) ?",opts:["Un système de navigation","Balise de détresse maritime transmettant position GPS sur 406 MHz aux satellites COSPAS-SARSAT — déclenchement manuel ou automatique à l'eau","Un radar","Un VHF portable"],correct:1,expl:"EPIRB (Emergency Position Indicating Radio Beacon) = balise de détresse individuelle/navire. Fréquence : 406 MHz (signal numérique avec MMSI) + 121.5 MHz (radiobalise de localisation). Satellites COSPAS-SARSAT reçoivent le signal. Centre MRCC alerté en 30-90 min. Durée signal : 48h minimum. Activation : manuelle (pull) ou automatique si immersion dans l'eau (libération hydrostatique). OBLIGATOIRE sur navires SOLAS. MMSI gravé dedans = identification immédiate."},
    {q:"Qu'est-ce qu'un SART (Search And Rescue Transponder) ?",opts:["Un type de radar","Répondeur radar de recherche et sauvetage — répond aux signaux radar en X-band (9 GHz) des navires et aéronefs de sauvetage — détectable à 10 milles","Un VHF","Un signal lumineux"],correct:1,expl:"SART = répondeur actif radar. Activé manuellement. Quand un radar X-band envoie une impulsion, le SART répond et apparaît sur l'écran radar comme une ligne de 12 points s'étendant vers l'émetteur. Portée : 10 milles (navire) / 30 milles (aéronef). Durée batterie : 96h. Doit être tenu ÉLEVÉ (hors de l'eau) pour maximiser la portée. Remplacé progressivement par AIS-SART (répondeur AIS de survie)."},
    {q:"Qu'est-ce que le NAVTEX et quel est son canal ?",opts:["Un type de radar","Système automatique de réception de messages de sécurité maritime sur 518 kHz (international) ou 490 kHz (national) — texte imprimé automatiquement","Un canal VHF","Un satellite"],correct:1,expl:"NAVTEX (Navigational Telex) = système de diffusion automatique de messages de sécurité maritime. Fréquences : 518 kHz (international en anglais) · 490 kHz (national en langue locale) · 4209.5 kHz (zone étendue). Portée : environ 400 miles. Messages : météo (A), glaces (B), SAR (C), avis aux navigateurs (D), etc. Réception automatique 24h/24. Le récepteur filtre par zones géographiques. Imprimé ou affiché automatiquement. SOLAS : obligatoire en zone A2 et plus."},
    {q:"Qu'est-ce que le certificat opérateur de radiotéléphonie (CRR / LRC / GOC) ?",opts:["Un permis de conduire","Certificat autorisant l'utilisation des installations radio sur un navire — LRC pour zone côtière · GOC pour zone hauturière et GMDSS complet","Un certificat de sécurité","Un document de navigation"],correct:1,expl:"Certificats opérateurs radio : CRR (Certificat Restreint de Radiotéléphoniste) = zone côtière A1/A2, navires non SOLAS. LRC (Long Range Certificate) = navigation hauturière, ancienne norme. GOC (General Operator's Certificate) = GMDSS complet, navigation internationale, navires SOLAS. SRC (Short Range Certificate) = équivalent CRR en anglais. Formation et examen obligatoires. En France : délivré par l'ANFR. Sur les navires SOLAS : au moins un officier GOC qualifié à bord."},
    {q:"Comment appelle-t-on la procédure pour contacter un navire spécifique par VHF ?",opts:["Appel général","Appel sélectif numérique (DSC) par MMSI sur canal 70 · ou appel vocal sur canal 16 : 'NOM NOM NOM, ici MON NOM, sur quel canal ?' puis basculer sur canal de travail","Appel de détresse","Appel SÉCURITÉ"],correct:1,expl:"Appel d'un navire spécifique : DSC = envoyer un appel DSC individuel avec le MMSI du navire destinataire sur canal 70. Appel vocal : canal 16, répéter le nom 3 fois (ou 1 fois selon urgence), identifier son navire, proposer un canal de travail. Le navire destinataire répond sur canal 16 en acceptant ou proposant un autre canal. Basculer sur le canal de travail. Les échanges commerciaux se font toujours sur canal de travail, jamais sur 16."},
    {q:"Qu'est-ce que la 'puissance réduite' (1W) sur un VHF marine et quand l'utiliser ?",opts:["Toujours utiliser 1W","1 Watt = portée réduite à ~1-2 milles · utiliser pour communications LOCALES (ancrage · entre navires proches) pour éviter d'encombrer le réseau · 25W pour longue portée","Utiliser 1W pour la détresse","1W seulement en zone A1"],correct:1,expl:"VHF puissance : 1W (faible) = portée 1-2 milles. 25W (maximale) = portée 15-20 milles. Règle : utiliser la puissance MINIMUM nécessaire. 1W pour : communications locales entre navires au mouillage, communications dans un port fermé, radio tests. 25W pour : détresse (MAYDAY), communications à longue distance, conditions difficiles. ÉCONOMIE : utiliser 1W réduit l'interférence sur le réseau maritime régional."},
    {q:"Qu'est-ce qu'un 'faux MAYDAY' et quelles sont ses conséquences ?",opts:["Un MAYDAY pour test","Déclenchement volontaire ou accidentel d'une alerte MAYDAY sans réelle détresse — sanctions légales lourdes · mobilisation inutile des secours · coût énorme","Une simulation d'exercice","Un MAYDAY en retard"],correct:1,expl:"Faux MAYDAY (false distress alert) = infraction grave au droit maritime international. Conséquences : coût des opérations de sauvetage déclenchées (plusieurs dizaines de milliers d'euros), risque de perturber une vraie urgence, sanctions pénales (amende + emprisonnement possible). En France : article L5261-5 du Code des Transports. FAUSSE ALERTE DSC : si déclenchement accidentel sur ch.70, annuler immédiatement sur ch.16 : 'MAYDAY annulé · MAYDAY annulé · [nom navire] · fausse alerte accidentelle · terminé'."},
    {q:"Qu'est-ce que le 'test radio' recommandé avant de prendre la mer ?",opts:["Appeler le CROSS pour tester","Appeler une station connue (port · capitainerie · autre navire) sur ch.16 · identifier son navire · demander un test · noter l'heure et résultat dans le journal de bord","Test sur ch.70 uniquement","Pas de test nécessaire"],correct:1,expl:"Test radio avant appareillage : appeler une station côtière connue (CROSS, capitainerie, marina) ou un autre navire sur ch.16. Demander confirmation de la réception ('radio check'). Noter dans le journal de bord : heure, canal, résultat. Vérifier : microphone, haut-parleur, affichage canal, puissance 1W et 25W. Test DSC : vérifier que le MMSI est programmé. Test EPIRB : vérifier DEL verte clignotante (batterie OK). Règle : si la radio ne fonctionne pas → NE PAS PARTIR."},
    {q:"Qu'est-ce que le 'radio silence' imposé lors d'une opération de sauvetage SAR ?",opts:["Interdiction de parler","Obligation pour tous les navires de cesser toute émission radio non urgente dans une zone SAR afin de ne pas perturber les communications de sauvetage · imposé par MAYDAY RELAY","Un silence obligatoire","Un canal bloqué"],correct:1,expl:"Silence radio SAR : lors d'une opération SAR (Search And Rescue), la station coordonnatrice peut imposer 'SILENCE MAYDAY' ou 'SILENCE DISTRESS' sur ch.16. Signifie : aucun navire ne doit émettre sur ch.16 sauf pour la détresse en cours. But : éviter les interférences qui pourraient masquer les communications de sauvetage. Levée par : 'SILENCE FINI' ou 'SEELONCE FEENEE' en anglais. Obligation légale de respecter le silence radio SAR."},
    {q:"Qu'est-ce que le 'MAYDAY RELAY' ?",opts:["Un MAYDAY répété","Transmission d'un MAYDAY reçu par un navire qui n'est pas lui-même en détresse mais qui sert de relais pour le navire en détresse non entendu par les secours","Un MAYDAY annulé","Un PAN-PAN amélioré"],correct:1,expl:"MAYDAY RELAY = transmission relais d'une alerte de détresse. Utilisé quand : un navire entend un MAYDAY mais les secours semblent ne pas avoir répondu. Procédure : 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY · TOUT STATION · ICI [NOM NAVIRE RELAIS] · MAYDAY DU NAVIRE [NOM EN DÉTRESSE] À [HEURE] · [RÉPÉTER CONTENU DU MAYDAY] · TERMINÉ'. Le navire relais surveille ch.16 et assiste si possible. Obligation morale et légale de relayer un MAYDAY non répondu."},
    {q:"Qu'est-ce que le 'dual watch' sur un VHF marin ?",opts:["Deux radios VHF","Fonction permettant au VHF de surveiller simultanément le canal 16 et un canal de travail — bascule automatiquement si signal sur 16","Deux officiers radio","Deux antennes"],correct:1,expl:"Dual watch (double veille) = fonction présente sur la plupart des VHF marins modernes. Permet de surveiller CH 16 (obligatoire) ET un canal de travail (ex: 12, 67) simultanément. Si signal détecté sur ch.16 : la radio bascule automatiquement sur 16. Avantage : permet de maintenir la veille obligatoire ch.16 tout en écoutant les communications du port ou du chenal. Triple watch : certains VHF font ch.16 + ch.70 DSC + canal de travail simultanément."},
    {q:"Quand utiliser le VHF portable (GMDSS) vs le VHF fixe à bord ?",opts:["Toujours le portable","VHF fixe pour communications normales (25W · antenne haute) · VHF portable = équipement de survie obligatoire (1W · portatif · étanche · pour canots de sauvetage)","Jamais le portable","Seulement en port"],correct:1,expl:"VHF fixe : puissance 1-25W, antenne haute (portée 15-20 milles), connecté à l'alimentation bord, DSC intégré. Usage : navigation normale, appels station côtière. VHF portable GMDSS (SART radio) : puissance 1W, batterie autonome, étanche IP68, dimensions réduites. Usage : canot de sauvetage, homme à la mer, situation où le VHF fixe est inutilisable. SOLAS : nombre minimum de VHF portables selon la taille du navire. Toujours charger les portables avant appareillage."},
    {q:"Qu'est-ce que le 'MRCC' (Maritime Rescue Coordination Centre) ?",opts:["Un navire de sauvetage","Centre de Coordination du Sauvetage Maritime — coordonne les opérations SAR dans une zone de responsabilité · reçoit les alertes MAYDAY DSC et VHF","Un système radio","Un port de refuge"],correct:1,expl:"MRCC (Maritime Rescue Coordination Centre) = centre national de coordination SAR maritime. Reçoit : alertes MAYDAY VHF et DSC, signaux EPIRB, alertes SART, rapports de navires en détresse. Coordonne : navires de sauvetage (SNSM en France), hélicoptères (Marine nationale, Sécurité civile), garde-côtes. En France = CROSS (Centre Régional Opérationnel de Surveillance et de Sauvetage). CROSS France : 5 centres couvrant toutes les côtes françaises + DOM-TOM. Contact : ch.16 ou numéro 196."},
    {q:"Que signifie 'Terminé' vs 'Terminé à vous' dans les communications radio ?",opts:["Ils sont identiques","'Terminé' (Over) = j'ai fini de parler, j'attends votre réponse · 'Terminé à vous' (Out) = fin de la communication, pas de réponse attendue","'Terminé' = fin totale","'Terminé à vous' = j'attends une réponse"],correct:1,expl:"Terminologie radio maritime : 'TERMINÉ' (Over) = fin d'une transmission, j'attends une réponse de l'autre partie. 'TERMINÉ À VOUS' ou simplement 'OUT' = fin totale de la communication, aucune réponse attendue. ERREUR COURANTE : dire 'Over and Out' = contradiction (je parle encore / je finis). AUTRES TERMES : 'REÇU' (Roger) = message reçu et compris. 'WILCO' = compris, je vais exécuter. 'BIEN COMPRIS' = j'ai compris le message. 'RÉPÉTEZ' (Say again) = répétez votre message."},
  ],
  en:[
    {q:"What is GMDSS (Global Maritime Distress and Safety System)?",opts:["A navigation system","International maritime safety communications system required by SOLAS — covers all navigation zones — integrates VHF DSC · MF/HF · NAVTEX · EPIRB · SART","A chart system","A piloting system"],correct:1,expl:"GMDSS = system required by SOLAS for vessels > 300 GT on international voyages. Zones: A1 (VHF), A2 (MF + VHF), A3 (Inmarsat + MF/HF + VHF), A4 (HF + all). Components: VHF DSC channel 70 + 16 · MF DSC 2187.5 kHz · HF DSC · NAVTEX 518 kHz · EPIRB · SART · EPIRB · radar transponder. Objective: rescue in less than 30 min thanks to automatic alert."},
    {q:"What is an EPIRB (Emergency Position-Indicating Radio Beacon)?",opts:["A navigation system","Maritime distress beacon transmitting GPS position on 406 MHz to COSPAS-SARSAT satellites — manual or automatic water activation","A radar","A portable VHF"],correct:1,expl:"EPIRB = individual/vessel distress beacon. Frequency: 406 MHz (digital signal with MMSI) + 121.5 MHz (homing beacon). COSPAS-SARSAT satellites receive the signal. MRCC center alerted in 30-90 min. Signal duration: 48h minimum. Activation: manual (pull) or automatic if submerged in water (hydrostatic release). MANDATORY on SOLAS vessels. MMSI engraved inside = immediate identification."},
    {q:"What is a SART (Search And Rescue Transponder)?",opts:["A type of radar","Radar search and rescue transponder — responds to X-band (9 GHz) radar signals from rescue vessels and aircraft — detectable at 10 miles","A VHF","A light signal"],correct:1,expl:"SART = active radar transponder. Manually activated. When an X-band radar sends a pulse, the SART responds and appears on the radar screen as a line of 12 dots extending toward the transmitter. Range: 10 miles (vessel) / 30 miles (aircraft). Battery life: 96h. Must be held HIGH (out of water) to maximize range. Progressively replaced by AIS-SART (survival AIS transponder)."},
    {q:"What is NAVTEX and what is its channel?",opts:["A type of radar","Automatic reception system for maritime safety messages on 518 kHz (international) or 490 kHz (national) — text automatically printed","A VHF channel","A satellite"],correct:1,expl:"NAVTEX (Navigational Telex) = automatic maritime safety message broadcasting system. Frequencies: 518 kHz (international in English) · 490 kHz (national in local language) · 4209.5 kHz (extended zone). Range: approximately 400 miles. Messages: weather (A), ice (B), SAR (C), notices to mariners (D), etc. Automatic 24h/24 reception. Receiver filters by geographic zones. Automatically printed or displayed. SOLAS: mandatory in zone A2 and above."},
    {q:"What is the radio operator certificate (SRC / LRC / GOC)?",opts:["A driving license","Certificate authorizing use of radio installations on a vessel — SRC for coastal area · GOC for offshore and full GMDSS","A safety certificate","A navigation document"],correct:1,expl:"Radio operator certificates: SRC (Short Range Certificate) = coastal navigation A1/A2, non-SOLAS vessels. LRC (Long Range Certificate) = offshore navigation, older standard. GOC (General Operator's Certificate) = full GMDSS, international navigation, SOLAS vessels. Training and examination mandatory. On SOLAS vessels: at least one GOC-qualified officer on board."},
    {q:"What is the procedure called for contacting a specific vessel by VHF?",opts:["General call","Digital Selective Calling (DSC) by MMSI on channel 70 · or voice call on channel 16: 'NAME NAME NAME, this is MY NAME, which channel?' then switch to working channel","Distress call","SÉCURITÉ call"],correct:1,expl:"Calling a specific vessel: DSC = send individual DSC call with destination vessel's MMSI on channel 70. Voice call: channel 16, repeat name 3 times (or once depending on urgency), identify your vessel, propose a working channel. Destination vessel responds on channel 16 accepting or proposing another channel. Switch to working channel. Commercial exchanges always on working channel, never on 16."},
    {q:"What is 'reduced power' (1W) on a marine VHF and when to use it?",opts:["Always use 1W","1 Watt = reduced range ~1-2 miles · use for LOCAL communications (anchorage · between nearby vessels) to avoid clogging the network · 25W for long range","Use 1W for distress","1W only in zone A1"],correct:1,expl:"VHF power: 1W (low) = range 1-2 miles. 25W (maximum) = range 15-20 miles. Rule: use the MINIMUM necessary power. 1W for: local communications between anchored vessels, communications in a closed port, radio tests. 25W for: distress (MAYDAY), long-distance communications, difficult conditions. ECONOMY: using 1W reduces interference on the regional maritime network."},
    {q:"What is a 'false MAYDAY' and what are its consequences?",opts:["A test MAYDAY","Voluntary or accidental triggering of a MAYDAY alert without real distress — heavy legal penalties · unnecessary rescue mobilization · enormous cost","An exercise simulation","A late MAYDAY"],correct:1,expl:"False distress alert = serious infraction under international maritime law. Consequences: cost of triggered rescue operations (tens of thousands of euros), risk of disrupting a real emergency, criminal penalties (fine + possible imprisonment). FALSE DSC ALERT: if accidentally triggered on ch.70, immediately cancel on ch.16: 'MAYDAY cancel · MAYDAY cancel · [vessel name] · accidental false alert · out'."},
    {q:"What is the recommended 'radio test' before putting to sea?",opts:["Call MRCC to test","Call a known station (port · harbourmaster · another vessel) on ch.16 · identify your vessel · request a test · note time and result in logbook","Test on ch.70 only","No test needed"],correct:1,expl:"Radio test before departure: call a known coastal station (MRCC, harbourmaster, marina) or another vessel on ch.16. Request reception confirmation ('radio check'). Note in logbook: time, channel, result. Check: microphone, speaker, channel display, power 1W and 25W. DSC test: verify MMSI is programmed. EPIRB test: check green blinking LED (battery OK). Rule: if radio doesn't work → DO NOT DEPART."},
    {q:"What is the 'radio silence' imposed during a SAR rescue operation?",opts:["Prohibition to speak","Obligation for all vessels to cease all non-urgent radio transmission in a SAR zone to avoid disrupting rescue communications · imposed by MAYDAY RELAY","A compulsory silence","A blocked channel"],correct:1,expl:"SAR radio silence: during a SAR (Search And Rescue) operation, the coordinating station may impose 'SILENCE MAYDAY' or 'SILENCE DISTRESS' on ch.16. Means: no vessel may transmit on ch.16 except for the ongoing distress. Purpose: avoid interference that could mask rescue communications. Lifted by: 'SILENCE FINISHED' or 'SEELONCE FEENEE'. Legal obligation to respect SAR radio silence."},
    {q:"What is a 'MAYDAY RELAY'?",opts:["A repeated MAYDAY","Transmission of a MAYDAY received by a vessel not itself in distress but which acts as relay for a distress vessel unheard by rescue services","A cancelled MAYDAY","An improved PAN-PAN"],correct:1,expl:"MAYDAY RELAY = relay transmission of a distress alert. Used when: a vessel hears a MAYDAY but rescue services seem not to have responded. Procedure: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY · ALL STATIONS · THIS IS [RELAY VESSEL NAME] · MAYDAY FROM VESSEL [DISTRESS VESSEL NAME] AT [TIME] · [REPEAT MAYDAY CONTENT] · OVER'. Relay vessel monitors ch.16 and assists if possible. Moral and legal obligation to relay an unanswered MAYDAY."},
    {q:"What is 'dual watch' on a marine VHF?",opts:["Two VHF radios","Function allowing VHF to simultaneously monitor channel 16 and a working channel — automatically switches if signal on 16","Two radio officers","Two antennas"],correct:1,expl:"Dual watch = function on most modern marine VHF radios. Allows monitoring CH 16 (mandatory) AND a working channel (e.g. 12, 67) simultaneously. If signal detected on ch.16: radio automatically switches to 16. Advantage: allows maintaining mandatory ch.16 watch while listening to port or channel communications. Triple watch: some VHF sets do ch.16 + ch.70 DSC + working channel simultaneously."},
    {q:"When to use portable VHF (GMDSS) vs fixed VHF on board?",opts:["Always portable","Fixed VHF for normal communications (25W · high antenna) · portable VHF = mandatory survival equipment (1W · handheld · waterproof · for life rafts)","Never portable","Only in port"],correct:1,expl:"Fixed VHF: power 1-25W, high antenna (range 15-20 miles), connected to ship's power, integrated DSC. Use: normal navigation, coastal station calls. Portable GMDSS VHF: power 1W, autonomous battery, waterproof IP68, compact dimensions. Use: life raft, man overboard, situation where fixed VHF is unusable. SOLAS: minimum number of portable VHF radios per vessel size. Always charge portables before departure."},
    {q:"What is an MRCC (Maritime Rescue Coordination Centre)?",opts:["A rescue vessel","Maritime Rescue Coordination Centre — coordinates SAR operations in an area of responsibility · receives MAYDAY DSC and VHF alerts","A radio system","A port of refuge"],correct:1,expl:"MRCC = national maritime SAR coordination center. Receives: VHF and DSC MAYDAY alerts, EPIRB signals, SART alerts, distress vessel reports. Coordinates: rescue vessels (RNLI in UK), helicopters (Royal Navy, coastguard), coastguards. In France = CROSS (Centre Régional Opérationnel de Surveillance et de Sauvetage). UK: HM Coastguard MRCC. Contact: ch.16 or emergency number."},
    {q:"What does 'Over' vs 'Out' mean in radio communications?",opts:["They are identical","'Over' = I have finished speaking, awaiting your response · 'Out' = end of communication, no response expected","'Over' = total end","'Out' = I await a response"],correct:1,expl:"Maritime radio terminology: 'OVER' = end of a transmission, awaiting response from other party. 'OUT' = total end of communication, no response expected. COMMON ERROR: saying 'Over and Out' = contradiction (I'm still speaking / I'm finishing). OTHER TERMS: 'ROGER' = message received and understood. 'WILCO' = understood, I will comply. 'SAY AGAIN' = repeat your message. 'CORRECTION' = I made an error, the correct version is..."},
  ],
  es:[
    {q:"¿Qué es el SMSSM (Sistema Mundial de Socorro y Seguridad Marítimos)?",opts:["Un sistema de navegación","Sistema internacional de comunicaciones de seguridad marítima requerido por el SOLAS — cubre todas las zonas de navegación — integra VHF LSD · OM/OC · NAVTEX · EPIRB · SART","Un sistema de cartas","Un sistema de pilotaje"],correct:1,expl:"SMSSM (Sistema Mundial de Socorro y Seguridad Marítimos) = sistema requerido por el SOLAS para buques > 300 GT en viajes internacionales. Zonas: A1 (VHF), A2 (OM + VHF), A3 (Inmarsat + OM/OC + VHF), A4 (OC + todas). Componentes: VHF LSD canal 70 + 16 · LSD OM 2187,5 kHz · NAVTEX 518 kHz · EPIRB · SART. Objetivo: rescate en menos de 30 min gracias a la alerta automática."},
    {q:"¿Qué es un EPIRB (Radiobalizas de Indicación de Posición de Emergencia)?",opts:["Un sistema de navegación","Baliza de socorro marítima que transmite la posición GPS en 406 MHz a los satélites COSPAS-SARSAT — activación manual o automática en el agua","Un radar","Un VHF portátil"],correct:1,expl:"EPIRB = baliza de socorro individual/buque. Frecuencia: 406 MHz (señal digital con MMSI) + 121,5 MHz (radiobaliza de localización). Los satélites COSPAS-SARSAT reciben la señal. El centro MRCC es alertado en 30-90 min. Duración de la señal: 48h mínimo. Activación: manual o automática si se sumerge en el agua. OBLIGATORIO en buques SOLAS."},
    {q:"¿Qué es un SART (Search And Rescue Transponder)?",opts:["Un tipo de radar","Respondedor de radar de búsqueda y salvamento — responde a las señales de radar en banda X (9 GHz) de los buques y aeronaves de rescate — detectable a 10 millas","Un VHF","Una señal luminosa"],correct:1,expl:"SART = respondedor de radar activo. Activado manualmente. Cuando un radar de banda X envía un impulso, el SART responde y aparece en la pantalla del radar como una línea de 12 puntos que se extiende hacia el emisor. Alcance: 10 millas (buque) / 30 millas (aeronave). Duración de la batería: 96h. Debe mantenerse ELEVADO para maximizar el alcance."},
    {q:"¿Qué es el NAVTEX y cuál es su canal?",opts:["Un tipo de radar","Sistema automático de recepción de mensajes de seguridad marítima en 518 kHz (internacional) o 490 kHz (nacional) — texto impreso automáticamente","Un canal VHF","Un satélite"],correct:1,expl:"NAVTEX = sistema de difusión automática de mensajes de seguridad marítima. Frecuencias: 518 kHz (internacional en inglés) · 490 kHz (nacional en lengua local). Alcance: unos 400 millas. Mensajes: meteorología (A), hielos (B), SAR (C), avisos a los navegantes (D), etc. Recepción automática 24h/24. SOLAS: obligatorio en zona A2 y superiores."},
    {q:"¿Qué es el certificado de operador de radiotelefonía (ROC / LRC / GOC)?",opts:["Un permiso de conducir","Certificado que autoriza el uso de las instalaciones de radio en un buque — ROC para zona costera · GOC para zona de altura y SMSSM completo","Un certificado de seguridad","Un documento de navegación"],correct:1,expl:"Certificados de operadores de radio: ROC (Restricted Operator's Certificate) = zona costera. LRC (Long Range Certificate) = navegación de altura. GOC (General Operator's Certificate) = SMSSM completo, navegación internacional, buques SOLAS. Formación y examen obligatorios. En buques SOLAS: al menos un oficial con GOC a bordo."},
    {q:"¿Cómo se llama el procedimiento para contactar un buque específico por VHF?",opts:["Llamada general","Llamada Selectiva Digital (LSD) por MMSI en canal 70 · o llamada de voz en canal 16: 'NOMBRE NOMBRE NOMBRE, aquí MI NOMBRE, ¿en qué canal?' y cambiar al canal de trabajo","Llamada de socorro","Llamada SÉCURITÉ"],correct:1,expl:"Llamada a un buque específico: LSD = enviar una llamada LSD individual con el MMSI del buque destinatario en canal 70. Llamada de voz: canal 16, repetir el nombre 3 veces, identificar su buque, proponer un canal de trabajo. El buque destinatario responde en canal 16. Cambiar al canal de trabajo. Los intercambios comerciales se realizan siempre en el canal de trabajo, nunca en el 16."},
    {q:"¿Qué es la 'potencia reducida' (1W) en un VHF marino y cuándo usarla?",opts:["Usar siempre 1W","1 Vatio = alcance reducido a ~1-2 millas · usar para comunicaciones LOCALES (fondeadero · entre buques cercanos) para no saturar la red · 25W para larga distancia","Usar 1W para el socorro","1W solo en zona A1"],correct:1,expl:"Potencia VHF: 1W (baja) = alcance 1-2 millas. 25W (máxima) = alcance 15-20 millas. Regla: usar la potencia MÍNIMA necesaria. 1W para: comunicaciones locales, pruebas de radio. 25W para: socorro (MAYDAY), comunicaciones de larga distancia. ECONOMÍA: usar 1W reduce las interferencias en la red marítima regional."},
    {q:"¿Qué es un 'MAYDAY falso' y cuáles son sus consecuencias?",opts:["Un MAYDAY de prueba","Activación voluntaria o accidental de una alerta MAYDAY sin emergencia real — sanciones legales graves · movilización innecesaria de los servicios de rescate · coste enorme","Una simulación de ejercicio","Un MAYDAY tardío"],correct:1,expl:"MAYDAY falso = infracción grave del derecho marítimo internacional. Consecuencias: coste de las operaciones de rescate activadas (decenas de miles de euros), riesgo de perturbar una emergencia real, sanciones penales. ALERTA LSD FALSA: si se activa accidentalmente en ch.70, anular inmediatamente en ch.16: 'MAYDAY anulado · [nombre del buque] · falsa alerta accidental · cambio y fuera'."},
    {q:"¿Qué es la 'prueba de radio' recomendada antes de salir al mar?",opts:["Llamar al MRCC para probar","Llamar a una estación conocida (puerto · capitanía · otro buque) en ch.16 · identificar su buque · solicitar una prueba · anotar hora y resultado en el diario de navegación","Prueba solo en ch.70","No es necesaria ninguna prueba"],correct:1,expl:"Prueba de radio antes de salir: llamar a una estación costera conocida o a otro buque en ch.16. Solicitar confirmación de recepción ('radio check'). Anotar en el diario: hora, canal, resultado. Verificar: micrófono, altavoz, pantalla de canal, potencia 1W y 25W. Regla: si la radio no funciona → NO SALIR."},
    {q:"¿Qué es el 'silencio de radio' impuesto durante una operación de salvamento SAR?",opts:["Prohibición de hablar","Obligación de todos los buques de cesar toda emisión de radio no urgente en una zona SAR para no perturbar las comunicaciones de salvamento · impuesto por MAYDAY RELAY","Un silencio obligatorio","Un canal bloqueado"],correct:1,expl:"Silencio de radio SAR: durante una operación SAR, la estación coordinadora puede imponer 'SILENCE MAYDAY' en ch.16. Significa: ningún buque puede emitir en ch.16 excepto para la emergencia en curso. Levantado por: 'SEELONCE FEENEE'. Obligación legal de respetar el silencio de radio SAR."},
    {q:"¿Qué es un 'MAYDAY RELAY'?",opts:["Un MAYDAY repetido","Transmisión de un MAYDAY recibido por un buque que no está en peligro pero que sirve de relevo para el buque en peligro no oído por los servicios de rescate","Un MAYDAY anulado","Un PAN-PAN mejorado"],correct:1,expl:"MAYDAY RELAY = transmisión de relevo de una alerta de socorro. Se usa cuando: un buque escucha un MAYDAY pero los servicios de rescate no parecen haber respondido. Procedimiento: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY · TODAS LAS ESTACIONES · AQUÍ [NOMBRE BUQUE RELEVO] · MAYDAY DEL BUQUE [NOMBRE EN PELIGRO] A [HORA] · [REPETIR CONTENIDO DEL MAYDAY] · CAMBIO'. Obligación moral y legal de transmitir en relevo un MAYDAY sin respuesta."},
    {q:"¿Qué es la 'doble escucha' (dual watch) en un VHF marino?",opts:["Dos radios VHF","Función que permite al VHF vigilar simultáneamente el canal 16 y un canal de trabajo — cambia automáticamente si hay señal en el 16","Dos oficiales de radio","Dos antenas"],correct:1,expl:"Doble escucha (dual watch) = función presente en la mayoría de los VHF marinos modernos. Permite vigilar CH 16 (obligatorio) Y un canal de trabajo (ej.: 12, 67) simultáneamente. Si se detecta señal en ch.16: la radio cambia automáticamente al 16. Ventaja: permite mantener la escucha obligatoria del ch.16 mientras se escuchan las comunicaciones del puerto o del canal."},
    {q:"¿Cuándo usar el VHF portátil (SMSSM) vs el VHF fijo a bordo?",opts:["Siempre el portátil","VHF fijo para comunicaciones normales (25W · antena alta) · VHF portátil = equipo de supervivencia obligatorio (1W · portátil · estanco · para balsas salvavidas)","Nunca el portátil","Solo en puerto"],correct:1,expl:"VHF fijo: potencia 1-25W, antena alta (alcance 15-20 millas), conectado a la alimentación del buque, LSD integrado. VHF portátil SMSSM: potencia 1W, batería autónoma, estanco IP68. Uso: balsa salvavidas, hombre al agua, situación donde el VHF fijo no puede utilizarse. SOLAS: número mínimo de VHF portátiles según el tamaño del buque."},
    {q:"¿Qué es un MRCC (Centro Coordinador de Rescate Marítimo)?",opts:["Un buque de salvamento","Centro de Coordinación del Rescate Marítimo — coordina las operaciones SAR en una zona de responsabilidad · recibe las alertas MAYDAY LSD y VHF","Un sistema de radio","Un puerto de refugio"],correct:1,expl:"MRCC = centro nacional de coordinación SAR marítima. Recibe: alertas MAYDAY VHF y LSD, señales EPIRB, alertas SART, informes de buques en peligro. Coordina: buques de rescate, helicópteros, guardacostas. En Francia = CROSS. En España = Salvamento Marítimo. Contacto: ch.16 o número 900 202 202 (España)."},
    {q:"¿Qué significa 'Cambio' vs 'Cambio y fuera' en las comunicaciones de radio?",opts:["Son idénticos","'Cambio' (Over) = he terminado de hablar, espero su respuesta · 'Cambio y fuera' (Out) = fin de la comunicación, no se espera respuesta","'Cambio' = fin total","'Cambio y fuera' = espero una respuesta"],correct:1,expl:"Terminología radio marítima: 'CAMBIO' (Over) = fin de una transmisión, esperando respuesta. 'CAMBIO Y FUERA' (Out) = fin total de la comunicación, sin respuesta esperada. ERROR COMÚN: decir 'Cambio y fuera' cuando se espera una respuesta. OTROS TÉRMINOS: 'RECIBIDO' (Roger) = mensaje recibido y comprendido. 'ENTENDIDO, EJECUTARÉ' (Wilco) = comprendido, lo voy a ejecutar. 'REPITA' (Say again) = repita su mensaje."},
  ],
  pt:[
    {q:"O que é o GMDSS (Sistema Mundial de Socorro e Segurança Marítima)?",opts:["Um sistema de navegação","Sistema internacional de comunicações de segurança marítima exigido pelo SOLAS — cobre todas as zonas de navegação — integra VHF ASN · OM/OC · NAVTEX · EPIRB · SART","Um sistema de cartas","Um sistema de pilotagem"],correct:1,expl:"GMDSS = sistema exigido pelo SOLAS para navios > 300 TB em viagens internacionais. Zonas: A1 (VHF), A2 (OM + VHF), A3 (Inmarsat + OM/OC + VHF), A4 (OC + todas). Componentes: VHF ASN canal 70 + 16 · ASN OM 2187,5 kHz · NAVTEX 518 kHz · EPIRB · SART. Objetivo: socorro em menos de 30 min graças ao alerta automático."},
    {q:"O que é um EPIRB (Radiobaliza de Posição de Emergência)?",opts:["Um sistema de navegação","Baliza de socorro marítima que transmite posição GPS em 406 MHz para satélites COSPAS-SARSAT — ativação manual ou automática na água","Um radar","Um VHF portátil"],correct:1,expl:"EPIRB = baliza de socorro individual/navio. Frequência: 406 MHz (sinal digital com MMSI) + 121,5 MHz (radiobaliza de localização). Satélites COSPAS-SARSAT recebem o sinal. Centro MRCC alertado em 30-90 min. Duração do sinal: 48h mínimo. Ativação: manual ou automática se submersa na água. OBRIGATÓRIO em navios SOLAS."},
    {q:"O que é um SART (Search And Rescue Transponder)?",opts:["Um tipo de radar","Respondedor de radar de busca e salvamento — responde a sinais de radar em banda X (9 GHz) de navios e aeronaves de socorro — detetável a 10 milhas","Um VHF","Um sinal luminoso"],correct:1,expl:"SART = respondedor de radar ativo. Ativado manualmente. Quando um radar de banda X envia um impulso, o SART responde e aparece no ecrã de radar como uma linha de 12 pontos que se estende para o emissor. Alcance: 10 milhas (navio) / 30 milhas (aeronave). Duração da bateria: 96h. Deve ser mantido ELEVADO para maximizar o alcance."},
    {q:"O que é o NAVTEX e qual é o seu canal?",opts:["Um tipo de radar","Sistema automático de receção de mensagens de segurança marítima em 518 kHz (internacional) ou 490 kHz (nacional) — texto impresso automaticamente","Um canal VHF","Um satélite"],correct:1,expl:"NAVTEX = sistema de difusão automática de mensagens de segurança marítima. Frequências: 518 kHz (internacional em inglês) · 490 kHz (nacional na língua local). Alcance: aproximadamente 400 milhas. Mensagens: meteorologia (A), gelo (B), SAR (C), avisos aos navegadores (D), etc. Receção automática 24h/24. SOLAS: obrigatório na zona A2 e superiores."},
    {q:"O que é o certificado de operador de radiotelegrafia (ROC / LRC / GOC)?",opts:["Uma carta de condução","Certificado que autoriza a utilização das instalações de rádio num navio — ROC para zona costeira · GOC para zona oceânica e GMDSS completo","Um certificado de segurança","Um documento de navegação"],correct:1,expl:"Certificados de operadores de rádio: ROC (Restricted Operator's Certificate) = zona costeira. LRC (Long Range Certificate) = navegação oceânica. GOC (General Operator's Certificate) = GMDSS completo, navegação internacional, navios SOLAS. Formação e exame obrigatórios. Em navios SOLAS: pelo menos um oficial GOC qualificado a bordo."},
    {q:"Como se chama o procedimento para contactar um navio específico por VHF?",opts:["Chamada geral","Chamada Seletiva Digital (ASN) por MMSI no canal 70 · ou chamada de voz no canal 16: 'NOME NOME NOME, aqui MEU NOME, em que canal?' e mudar para canal de trabalho","Chamada de socorro","Chamada SÉCURITÉ"],correct:1,expl:"Chamada a um navio específico: ASN = enviar uma chamada ASN individual com o MMSI do navio destinatário no canal 70. Chamada de voz: canal 16, repetir o nome 3 vezes, identificar o seu navio, propor um canal de trabalho. O navio destinatário responde no canal 16. Mudar para canal de trabalho. As trocas comerciais fazem-se sempre no canal de trabalho, nunca no 16."},
    {q:"O que é a 'potência reduzida' (1W) num VHF marítimo e quando usá-la?",opts:["Usar sempre 1W","1 Watt = alcance reduzido a ~1-2 milhas · usar para comunicações LOCAIS (fundeamento · entre navios próximos) para não saturar a rede · 25W para longa distância","Usar 1W para o socorro","1W apenas na zona A1"],correct:1,expl:"Potência VHF: 1W (baixa) = alcance 1-2 milhas. 25W (máxima) = alcance 15-20 milhas. Regra: usar a potência MÍNIMA necessária. 1W para: comunicações locais, testes de rádio. 25W para: socorro (MAYDAY), comunicações de longa distância. ECONOMIA: usar 1W reduz as interferências na rede marítima regional."},
    {q:"O que é um 'MAYDAY falso' e quais as suas consequências?",opts:["Um MAYDAY de teste","Ativação voluntária ou acidental de um alerta MAYDAY sem perigo real — sanções legais graves · mobilização desnecessária dos serviços de socorro · custo enorme","Uma simulação de exercício","Um MAYDAY tardio"],correct:1,expl:"MAYDAY falso = infração grave ao direito marítimo internacional. Consequências: custo das operações de socorro ativadas (dezenas de milhares de euros), risco de perturbar uma emergência real, sanções penais. ALERTA ASN FALSO: se ativado acidentalmente no ch.70, cancelar imediatamente no ch.16: 'MAYDAY cancelado · [nome do navio] · falso alerta acidental · mudança e fora'."},
    {q:"O que é o 'teste de rádio' recomendado antes de sair ao mar?",opts:["Ligar para o MRCC para testar","Chamar uma estação conhecida (porto · capitania · outro navio) no ch.16 · identificar o seu navio · solicitar um teste · registar hora e resultado no diário de bordo","Teste apenas no ch.70","Nenhum teste necessário"],correct:1,expl:"Teste de rádio antes da partida: chamar uma estação costeira conhecida ou outro navio no ch.16. Solicitar confirmação de receção ('radio check'). Registar no diário: hora, canal, resultado. Verificar: microfone, altifalante, display do canal, potência 1W e 25W. Regra: se o rádio não funcionar → NÃO PARTIR."},
    {q:"O que é o 'silêncio de rádio' imposto durante uma operação de socorro SAR?",opts:["Proibição de falar","Obrigação de todos os navios de cessar qualquer emissão de rádio não urgente numa zona SAR para não perturbar as comunicações de socorro · imposto por MAYDAY RELAY","Um silêncio obrigatório","Um canal bloqueado"],correct:1,expl:"Silêncio de rádio SAR: durante uma operação SAR, a estação coordenadora pode impor 'SILENCE MAYDAY' no ch.16. Significa: nenhum navio pode emitir no ch.16 exceto para o perigo em curso. Levantado por: 'SEELONCE FEENEE'. Obrigação legal de respeitar o silêncio de rádio SAR."},
    {q:"O que é um 'MAYDAY RELAY'?",opts:["Um MAYDAY repetido","Transmissão de um MAYDAY recebido por um navio que não está em perigo mas que serve de relé para o navio em perigo não ouvido pelos serviços de socorro","Um MAYDAY cancelado","Um PAN-PAN melhorado"],correct:1,expl:"MAYDAY RELAY = transmissão de relé de um alerta de socorro. Utilizado quando: um navio ouve um MAYDAY mas os serviços de socorro não parecem ter respondido. Procedimento: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY · TODAS AS ESTAÇÕES · AQUI [NOME NAVIO RELÉ] · MAYDAY DO NAVIO [NOME EM PERIGO] ÀS [HORA] · [REPETIR CONTEÚDO DO MAYDAY] · MUDANÇA'. Obrigação moral e legal de transmitir em relé um MAYDAY sem resposta."},
    {q:"O que é a 'dupla escuta' (dual watch) num VHF marítimo?",opts:["Dois rádios VHF","Função que permite ao VHF monitorizar simultaneamente o canal 16 e um canal de trabalho — muda automaticamente se houver sinal no 16","Dois oficiais de rádio","Duas antenas"],correct:1,expl:"Dupla escuta (dual watch) = função presente na maioria dos VHF marítimos modernos. Permite monitorizar CH 16 (obrigatório) E um canal de trabalho (ex: 12, 67) simultaneamente. Se sinal detetado no ch.16: o rádio muda automaticamente para o 16. Vantagem: permite manter a escuta obrigatória do ch.16 enquanto se ouvem as comunicações do porto ou do canal."},
    {q:"Quando usar o VHF portátil (GMDSS) vs o VHF fixo a bordo?",opts:["Sempre o portátil","VHF fixo para comunicações normais (25W · antena alta) · VHF portátil = equipamento de sobrevivência obrigatório (1W · portátil · estanque · para balsas salva-vidas)","Nunca o portátil","Apenas em porto"],correct:1,expl:"VHF fixo: potência 1-25W, antena alta (alcance 15-20 milhas), ligado à alimentação do navio, ASN integrado. VHF portátil GMDSS: potência 1W, bateria autónoma, estanque IP68. Uso: balsa salva-vidas, homem ao mar, situação onde o VHF fixo não pode ser usado. SOLAS: número mínimo de VHF portáteis por tamanho de navio."},
    {q:"O que é um MRCC (Centro de Coordenação de Salvamento Marítimo)?",opts:["Um navio de salvamento","Centro de Coordenação de Salvamento Marítimo — coordena as operações SAR numa área de responsabilidade · recebe alertas MAYDAY ASN e VHF","Um sistema de rádio","Um porto de abrigo"],correct:1,expl:"MRCC = centro nacional de coordenação SAR marítima. Recebe: alertas MAYDAY VHF e ASN, sinais EPIRB, alertas SART, relatórios de navios em perigo. Coordena: navios de socorro, helicópteros, guardas costeiros. Em Portugal = MRCC Lisboa. Contacto: ch.16 ou número 115."},
    {q:"O que significa 'Mudança' vs 'Mudança e fora' nas comunicações de rádio?",opts:["São idênticos","'Mudança' (Over) = terminei de falar, aguardo a sua resposta · 'Mudança e fora' (Out) = fim da comunicação, sem resposta esperada","'Mudança' = fim total","'Mudança e fora' = aguardo resposta"],correct:1,expl:"Terminologia de rádio marítimo: 'MUDANÇA' (Over) = fim de uma transmissão, aguardando resposta. 'MUDANÇA E FORA' (Out) = fim total da comunicação, sem resposta esperada. ERRO COMUM: dizer 'Mudança e fora' quando se espera resposta. OUTROS TERMOS: 'RECEBIDO' (Roger) = mensagem recebida e compreendida. 'ENTENDIDO, EXECUTAREI' (Wilco) = compreendido, vou executar. 'REPITA' (Say again) = repita a sua mensagem."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else {setDone(true);if(onComplete)onComplete();}};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.radio},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.teal},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:12},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.3}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.radio}33,${C.gold2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:`${C.radio}22`,border:`1px solid ${C.radio}44`,fontSize:14,color:C.radio,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.radio}22`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.radio,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.radio:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.teal},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    fr:{
      badge:"📻 Signalisation & Balisage · Leçon 5/7 · ⭐ Premium · 200 XP",
      title:"Procédures Radio VHF Maritime",
      intro:"En mer, votre VHF est votre lien avec le monde. Canal 16, MAYDAY, DSC, PAN-PAN — ces mots peuvent sauver des vies. Les connaître et savoir les utiliser est une obligation légale et morale.\n\nCette leçon couvre les canaux VHF, les procédures de communication et les alertes de détresse.",
      p1:"PARTIE 1 — CANAUX VHF MARITIMES",s1t:"16 · 70 · 67 · 09 · 12 · WX",
      s1:"CANAUX ESSENTIELS :\n\nCanal 16 (156.800 MHz)\n→ VEILLE PERMANENTE OBLIGATOIRE\n→ Détresse · Urgence · Sécurité\n→ Appels initiaux\n\nCanal 70 (156.525 MHz)\n→ DSC UNIQUEMENT (numérique)\n→ Alerte détresse automatique\n→ Jamais de voix sur 70 !\n\nCanaux de travail : 09 · 12 · 67 · 72\n→ Après établissement contact ch.16",
      p2:"PARTIE 2 — PROCÉDURES DE COMMUNICATION",s1t:"Appel · Identification · Canal travail",
      s2:"PROCÉDURE STANDARD :\n1. Canal 16 (appel initial)\n2. Nom destinataire × 3\n3. 'Ici' + mon nom × 3\n4. Demande de canal de travail\n5. Basculer sur canal de travail\n6. Communication\n7. 'Terminé'\n\nMOTS CLEFS :\nTerminé = Over (j'attends réponse)\nTerminé à vous = Out (fin comm.)\nReçu = Roger (message compris)\nRépétez = Say Again",
      p3:"PARTIE 3 — SIGNAUX DE DÉTRESSE",s1t:"MAYDAY · PAN-PAN · SÉCURITÉ · DSC ch.70",
      s3:"HIÉRARCHIE DÉTRESSE :\n\nMAYDAY = danger de mort IMMÉDIAT\nPAN-PAN = urgence (pas de mort imm.)\nSÉCURITÉ = information sécurité nav.\n\nMAYDAY PROCÉDURE :\n→ DSC ch.70 EN PREMIER\n→ Canal 16 · 25W · 3× MAYDAY\n→ Nom navire × 3 · Position\n→ Nature détresse · Personnes\n→ Assistance requise · Terminé\n\nDSC ch.70 = envoi automatique\nMMSI + GPS + nature + heure",
      p4:"PARTIE 4 — ALPHABET PHONÉTIQUE",s1t:"Alpha Bravo Charlie · mémorisation",
      s4:"ALPHABET PHONÉTIQUE OTAN :\nA=Alpha · B=Bravo · C=Charlie\nD=Delta · E=Echo · F=Foxtrot\nG=Golf · H=Hotel · I=India\nJ=Juliet · K=Kilo · L=Lima\nM=Mike · N=November · O=Oscar\nP=Papa · Q=Quebec · R=Romeo\nS=Sierra · T=Tango · U=Uniform\nV=Victor · W=Whiskey · X=X-ray\nY=Yankee · Z=Zulu",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"📻 CAS RÉEL — LE JOOLA",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — RADIO VHF L5",
      sumP:["Canal 16 = veille permanente obligatoire · 156.800 MHz · détresse/urgence/sécurité","Canal 70 = DSC uniquement · JAMAIS de voix · 156.525 MHz","MAYDAY = danger mort immédiat · 3× · ch.16 · 25W · position + nature + personnes","PAN-PAN = urgence non vitale · SÉCURITÉ = information sécurité navigation","DSC ch.70 avant MAYDAY vocal · MMSI + GPS automatiques","MMSI = 9 chiffres · identification unique · à enregistrer avant utilisation","Alphabet phonétique : Alpha Bravo Charlie Delta Echo Foxtrot Golf","MV Le Joola 2002 : 1 863 morts · pas de MAYDAY transmis · VHF = survie"],
      learnedP:["Canaux VHF : 16 (veille) · 70 (DSC) · 09/12/67 (travail)","Procédure standard : appel ch.16 → basculer canal travail","MAYDAY complet : DSC + vocal · position · nature · personnes","PAN-PAN vs MAYDAY vs SÉCURITÉ : hiérarchie urgences","Alphabet phonétique OTAN : A-Z complet"],
    },
    en:{
      badge:"📻 Signaling & Buoyage · Lesson 5/7 · ⭐ Premium · 200 XP",
      title:"Marine VHF Radio Procedures",
      intro:"At sea, your VHF is your link with the world. Channel 16, MAYDAY, DSC, PAN-PAN — these words can save lives. Knowing them and how to use them is a legal and moral obligation.",
      p1:"PART 1 — VHF MARINE CHANNELS",s1t:"16 · 70 · 67 · 09 · 12 · WX",
      s1:"ESSENTIAL CHANNELS:\n\nChannel 16 (156.800 MHz)\n→ MANDATORY PERMANENT WATCH\n→ Distress · Urgency · Safety\n→ Initial calls\n\nChannel 70 (156.525 MHz)\n→ DSC ONLY (digital)\n→ Automatic distress alert\n→ Never voice on 70!\n\nWorking channels: 09 · 12 · 67 · 72\n→ After establishing contact on ch.16",
      p2:"PART 2 — COMMUNICATION PROCEDURES",s1t:"Call · Identification · Working channel",
      s2:"STANDARD PROCEDURE:\n1. Channel 16 (initial call)\n2. Recipient name × 3\n3. 'This is' + my name × 3\n4. Request working channel\n5. Switch to working channel\n6. Communication\n7. 'Over'\n\nKEY WORDS:\nOver = I await response\nOut = end of communication\nRoger = message understood\nSay Again = repeat",
      p3:"PART 3 — DISTRESS SIGNALS",s1t:"MAYDAY · PAN-PAN · SÉCURITÉ · DSC ch.70",
      s3:"DISTRESS HIERARCHY:\n\nMAYDAY = IMMEDIATE danger of death\nPAN-PAN = urgency (no immediate death)\nSÉCURITÉ = navigation safety information\n\nMAYDAY PROCEDURE:\n→ DSC ch.70 FIRST\n→ Channel 16 · 25W · 3× MAYDAY\n→ Vessel name × 3 · Position\n→ Nature of distress · Persons\n→ Assistance required · Over\n\nDSC ch.70 = automatic sending\nMMSI + GPS + nature + time",
      p4:"PART 4 — PHONETIC ALPHABET",s1t:"Alpha Bravo Charlie · memorization",
      s4:"NATO PHONETIC ALPHABET:\nA=Alpha · B=Bravo · C=Charlie\nD=Delta · E=Echo · F=Foxtrot\nG=Golf · H=Hotel · I=India\nJ=Juliet · K=Kilo · L=Lima\nM=Mike · N=November · O=Oscar\nP=Papa · Q=Quebec · R=Romeo\nS=Sierra · T=Tango · U=Uniform\nV=Victor · W=Whiskey · X=X-ray\nY=Yankee · Z=Zulu",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"📻 REAL CASE — LE JOOLA",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — VHF RADIO L5",
      sumP:["Channel 16 = mandatory permanent watch · 156.800 MHz · distress/urgency/safety","Channel 70 = DSC only · NEVER voice · 156.525 MHz","MAYDAY = immediate danger of death · 3× · ch.16 · 25W · position + nature + persons","PAN-PAN = non-vital urgency · SÉCURITÉ = navigation safety information","DSC ch.70 before vocal MAYDAY · MMSI + GPS automatic","MMSI = 9 digits · unique identification · register before use","Phonetic alphabet: Alpha Bravo Charlie Delta Echo Foxtrot Golf","MV Le Joola 2002: 1,863 dead · no MAYDAY sent · VHF = survival"],
      learnedP:["VHF channels: 16 (watch) · 70 (DSC) · 09/12/67 (working)","Standard procedure: call ch.16 → switch working channel","Complete MAYDAY: DSC + voice · position · nature · persons","PAN-PAN vs MAYDAY vs SÉCURITÉ: urgency hierarchy","NATO phonetic alphabet: A-Z complete"],
    },
    es:{
      badge:"📻 Señalización y Balizamiento · Lección 5/7 · ⭐ Premium · 200 XP",
      title:"Procedimientos Radio VHF Marino",
      intro:"En el mar, tu VHF es tu vínculo con el mundo. Canal 16, MAYDAY, LSD, PAN-PAN — estas palabras pueden salvar vidas.",
      p1:"PARTE 1 — CANALES VHF MARINOS",s1t:"16 · 70 · 67 · 09 · 12",
      s1:"Canal 16 (156.800 MHz) = ESCUCHA PERMANENTE\nCanal 70 (156.525 MHz) = LSD SOLO (nunca voz)\nCanales trabajo: 09 · 12 · 67 · 72",
      p2:"PARTE 2 — PROCEDIMIENTOS DE COMUNICACIÓN",s1t:"Llamada · Identificación · Canal trabajo",
      s2:"1. Canal 16 · Nombre dest. × 3\n2. 'Aquí' + mi nombre × 3\n3. Proponer canal trabajo\n4. Cambiar canal trabajo · Comunicar\nCambio=Over · Cambio y fuera=Out",
      p3:"PARTE 3 — SEÑALES DE SOCORRO",s1t:"MAYDAY · PAN-PAN · SÉCURITÉ · LSD ch.70",
      s3:"MAYDAY = peligro de muerte INMEDIATO\nPAN-PAN = urgencia (sin muerte inm.)\nSÉCURITÉ = información seguridad nav.\n\nMAYDAY: LSD ch.70 PRIMERO\nCanal 16 · 25W · 3× MAYDAY\nNombre × 3 · Posición · Naturaleza\nPersonas · Asistencia · Cambio",
      p4:"PARTE 4 — ALFABETO FONÉTICO",s1t:"Alfa Bravo Charlie · memorización",
      s4:"A=Alfa · B=Bravo · C=Charlie · D=Delta\nE=Eco · F=Foxtrot · G=Golf · H=Hotel\nI=India · J=Juliett · K=Kilo · L=Lima\nM=Mike · N=Noviembre · O=Oscar\nP=Papá · Q=Quebec · R=Romeo\nS=Sierra · T=Tango · U=Uniforme\nV=Víctor · W=Whiskey · X=Rayos X\nY=Yankee · Z=Zulú",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"📻 CASO REAL — LE JOOLA",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — RADIO VHF L5",
      sumP:["Canal 16 = escucha permanente obligatoria · 156.800 MHz · socorro/urgencia/seguridad","Canal 70 = solo LSD · NUNCA voz · 156.525 MHz","MAYDAY = peligro muerte inmediato · 3× · ch.16 · 25W · posición + naturaleza + personas","PAN-PAN = urgencia no vital · SÉCURITÉ = información seguridad navegación","LSD ch.70 antes de MAYDAY vocal · MMSI + GPS automáticos","MMSI = 9 dígitos · identificación única · registrar antes de usar","Alfabeto fonético: Alfa Bravo Charlie Delta Eco Foxtrot Golf","MV Le Joola 2002: 1.863 muertos · sin MAYDAY transmitido · VHF = supervivencia"],
      learnedP:["Canales VHF: 16 (escucha) · 70 (LSD) · 09/12/67 (trabajo)","Procedimiento estándar: llamada ch.16 → cambiar canal trabajo","MAYDAY completo: LSD + vocal · posición · naturaleza · personas","PAN-PAN vs MAYDAY vs SÉCURITÉ: jerarquía urgencias","Alfabeto fonético OTAN: A-Z completo"],
    },
    pt:{
      badge:"📻 Sinalização e Balizagem · Lição 5/7 · ⭐ Premium · 200 XP",
      title:"Procedimentos de Rádio VHF Marítimo",
      intro:"No mar, o seu VHF é o seu elo com o mundo. Canal 16, MAYDAY, ASN, PAN-PAN — estas palavras podem salvar vidas.",
      p1:"PARTE 1 — CANAIS VHF MARÍTIMOS",s1t:"16 · 70 · 67 · 09 · 12",
      s1:"Canal 16 (156.800 MHz) = ESCUTA PERMANENTE\nCanal 70 (156.525 MHz) = ASN APENAS (nunca voz)\nCanais de trabalho: 09 · 12 · 67 · 72",
      p2:"PARTE 2 — PROCEDIMENTOS DE COMUNICAÇÃO",s1t:"Chamada · Identificação · Canal trabalho",
      s2:"1. Canal 16 · Nome dest. × 3\n2. 'Aqui' + meu nome × 3\n3. Propor canal de trabalho\n4. Mudar canal · Comunicar\nMudança=Over · Mudança e fora=Out",
      p3:"PARTE 3 — SINAIS DE SOCORRO",s1t:"MAYDAY · PAN-PAN · SÉCURITÉ · ASN ch.70",
      s3:"MAYDAY = perigo de morte IMEDIATO\nPAN-PAN = urgência (sem morte im.)\nSÉCURITÉ = informação segurança nav.\n\nMAYDAY: ASN ch.70 PRIMEIRO\nCanal 16 · 25W · 3× MAYDAY\nNome × 3 · Posição · Natureza\nPessoas · Assistência · Mudança",
      p4:"PARTE 4 — ALFABETO FONÉTICO",s1t:"Alfa Bravo Charlie · memorização",
      s4:"A=Alfa · B=Bravo · C=Charlie · D=Delta\nE=Eco · F=Foxtrot · G=Golf · H=Hotel\nI=India · J=Juliett · K=Kilo · L=Lima\nM=Mike · N=Novembro · O=Oscar\nP=Papa · Q=Quebec · R=Romeu\nS=Sierra · T=Tango · U=Uniforme\nV=Victor · W=Whiskey · X=Raios X\nY=Yankee · Z=Zulu",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"📻 CASO REAL — LE JOOLA",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — RÁDIO VHF L5",
      sumP:["Canal 16 = escuta permanente obrigatória · 156.800 MHz · socorro/urgência/segurança","Canal 70 = ASN apenas · NUNCA voz · 156.525 MHz","MAYDAY = perigo morte imediato · 3× · ch.16 · 25W · posição + natureza + pessoas","PAN-PAN = urgência não vital · SÉCURITÉ = informação segurança navegação","ASN ch.70 antes de MAYDAY vocal · MMSI + GPS automáticos","MMSI = 9 dígitos · identificação única · registar antes de usar","Alfabeto fonético: Alfa Bravo Charlie Delta Eco Foxtrot Golf","MV Le Joola 2002: 1.863 mortos · sem MAYDAY transmitido · VHF = sobrevivência"],
      learnedP:["Canais VHF: 16 (escuta) · 70 (ASN) · 09/12/67 (trabalho)","Procedimento padrão: chamada ch.16 → mudar canal trabalho","MAYDAY completo: ASN + vocal · posição · natureza · pessoas","PAN-PAN vs MAYDAY vs SÉCURITÉ: hierarquia urgências","Alfabeto fonético OTAN: A-Z completo"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonVHF({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#000c04 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.radio}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.radio,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>📻 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 5/7":lang==="en"?"Lesson 5/7":lang==="es"?"Lección 5/7":"Lição 5/7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.radio,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.radio},${C.gold2})`,transition:"width 0.5s ease",boxShadow:`0 0 8px ${C.radio}`}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.radio}15`,border:`1px solid ${C.radio}44`,fontSize:11,color:C.radio,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.radio}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="📡" text={lc.p1} color={C.radio}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,background:"rgba(0,10,4,0.7)",border:`1px solid ${C.radio}22`}}>
              <div style={{fontSize:11,color:C.radio,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📡 {lang==="fr"?"SÉLECTEUR DE CANAUX VHF":lang==="en"?"VHF CHANNEL SELECTOR":lang==="es"?"SELECTOR DE CANALES VHF":"SELETOR DE CANAIS VHF"}</div>
              <VHFChannelSVG lang={lang}/>
            </Card>
            <SL icon="🎙️" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,background:"rgba(0,5,20,0.7)",border:`1px solid ${C.blue2}22`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎙️ {lang==="fr"?"SIMULATEUR DE COMMUNICATION VHF":lang==="en"?"VHF COMMUNICATION SIMULATOR":lang==="es"?"SIMULADOR DE COMUNICACIÓN VHF":"SIMULADOR DE COMUNICAÇÃO VHF"}</div>
              <VHFSimulatorSVG lang={lang}/>
            </Card>
            <SL icon="🆘" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}22`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🆘 {lang==="fr"?"PROCÉDURES DE DÉTRESSE":lang==="en"?"DISTRESS PROCEDURES":lang==="es"?"PROCEDIMIENTOS DE SOCORRO":"PROCEDIMENTOS DE SOCORRO"}</div>
              <MaydayProcedureSVG lang={lang}/>
            </Card>
            <SL icon="🔤" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔤 {lang==="fr"?"ALPHABET PHONÉTIQUE OTAN":lang==="en"?"NATO PHONETIC ALPHABET":lang==="es"?"ALFABETO FONÉTICO OTAN":"ALFABETO FONÉTICO OTAN"}</div>
              <PhoneticAlphabetSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="📻" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>
            <Card style={{marginBottom:14,background:`${C.radio}08`,border:`1px solid ${C.radio}22`}}>
              <div style={{fontSize:11,color:C.radio,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.radio,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.teal},${C.radio},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,boxShadow:`0 10px 36px ${C.radio}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Radio VHF Maritime</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 5":lang==="en"?"Lesson 5":lang==="es"?"Lección 5":"Lição 5"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.radio}15`,border:`1px solid ${C.radio}55`,fontSize:14,color:C.radio,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.radio,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.teal},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 8px 28px ${C.radio}33`,marginBottom:10}}>
              {lang==="fr"?"LEÇON 6 — AIS & NAV. ÉLECTRONIQUE →":lang==="en"?"LESSON 6 — AIS & ELECTRONIC NAV →":lang==="es"?"LECCIÓN 6 — AIS Y NAV. ELECTRÓNICA →":"LIÇÃO 6 — AIS E NAV. ELETRÓNICA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
