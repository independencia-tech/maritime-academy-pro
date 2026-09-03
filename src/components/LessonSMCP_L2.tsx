// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  vts:"#00e5ff", port:"#ffd700", pilot:"#ff8c00", moor:"#7bed9f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Maritime English SMCP", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Maritime English SMCP", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Inglés Marítimo SMCP", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Inglês Marítimo SMCP", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — VTS PORT APPROACH SIMULATOR
// ══════════════════════════════════════
function VTSApproachSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [showTr, setShowTr] = useState(false);

  const dialogues = [
    { speaker:"VESSEL", ch:"16",
      smcp:"Marseille VTS, Marseille VTS, this is MV Atlantic Pioneer, MV Atlantic Pioneer. Over.",
      tr:{fr:"Marseille VTS, Marseille VTS, ici MV Atlantic Pioneer, MV Atlantic Pioneer. Terminé.",es:"Marseille VTS, Marseille VTS, aquí MV Atlantic Pioneer, MV Atlantic Pioneer. Cambio.",pt:"Marseille VTS, Marseille VTS, aqui MV Atlantic Pioneer, MV Atlantic Pioneer. Câmbio."},
      note:{fr:"PREMIER APPEL VTS (CH 16)\n→ Répéter le nom de la station 2 fois\n→ Répéter le nom du navire 2 fois\n→ Toujours sur CH 16 pour l'appel initial\n→ Attendre la réponse avant de continuer",
            en:"FIRST VTS CALL (CH 16)\n→ Repeat station name twice\n→ Repeat vessel name twice\n→ Always CH 16 for initial call\n→ Wait for response before continuing",
            es:"PRIMERA LLAMADA VTS (CH 16)\n→ Repetir el nombre de la estación 2 veces\n→ Repetir el nombre del buque 2 veces\n→ Siempre CH 16 para la llamada inicial",
            pt:"PRIMEIRA CHAMADA VTS (CH 16)\n→ Repetir o nome da estação 2 vezes\n→ Repetir o nome do navio 2 vezes\n→ Sempre CH 16 para a chamada inicial"} },
    { speaker:"VTS", ch:"16",
      smcp:"MV Atlantic Pioneer, this is Marseille VTS. Switch to channel 12. Over.",
      tr:{fr:"MV Atlantic Pioneer, ici Marseille VTS. Passez sur le canal 12. Terminé.",es:"MV Atlantic Pioneer, aquí Marseille VTS. Cambie al canal 12. Cambio.",pt:"MV Atlantic Pioneer, aqui Marseille VTS. Mude para o canal 12. Câmbio."},
      note:{fr:"RÉPONSE VTS\n→ Le VTS répond sur CH 16\n→ Demande de basculer sur canal de travail\n→ Canal 12 = canal trafic Marseille\n→ Les canaux VTS varient selon les ports !\n→ Toujours vérifier les Instructions Nautiques",
            en:"VTS RESPONSE\n→ VTS replies on CH 16\n→ Requests switch to working channel\n→ CH 12 = Marseille traffic channel\n→ VTS channels vary by port!\n→ Always check Sailing Directions",
            es:"RESPUESTA VTS\n→ El VTS responde en CH 16\n→ Solicita cambiar al canal de trabajo\n→ CH 12 = canal de tráfico de Marsella\n→ Los canales VTS varían según los puertos",
            pt:"RESPOSTA VTS\n→ O VTS responde no CH 16\n→ Solicita mudança para canal de trabalho\n→ CH 12 = canal de tráfego de Marselha\n→ Os canais VTS variam por porto"} },
    { speaker:"VESSEL", ch:"12",
      smcp:"Marseille VTS, this is MV Atlantic Pioneer on channel 12. Position: 4 miles south-west of the entrance. ETA entrance 0830 UTC. Draught 9.5 metres. Request port entry. Over.",
      tr:{fr:"Marseille VTS, ici MV Atlantic Pioneer sur canal 12. Position : 4 milles au sud-ouest de l'entrée. ETA entrée 0830 UTC. Tirant d'eau 9,5 mètres. Demande d'entrée au port. Terminé.",es:"Marseille VTS, aquí MV Atlantic Pioneer en el canal 12. Posición: 4 millas al suroeste de la entrada. ETA entrada 0830 UTC. Calado 9,5 metros. Solicito entrada al puerto. Cambio.",pt:"Marseille VTS, aqui MV Atlantic Pioneer no canal 12. Posição: 4 milhas a sudoeste da entrada. ETA entrada 0830 UTC. Calado 9,5 metros. Pedido de entrada no porto. Câmbio."},
      note:{fr:"MESSAGE D'ARRIVÉE COMPLET\nInformations OBLIGATOIRES :\n1. Confirmation du canal\n2. Position (distance + relèvement)\n3. ETA à l'entrée du port (UTC)\n4. Tirant d'eau (draught)\n5. Demande d'entrée / pilote\n\nFORMAT DRAUGHT SMCP :\n'Draught [X] metres forward\nand [X] metres aft'\n(ou simplement '[X] metres' si uniforme)",
            en:"COMPLETE ARRIVAL MESSAGE\nMANDATORY information:\n1. Channel confirmation\n2. Position (distance + bearing)\n3. ETA at port entrance (UTC)\n4. Draught\n5. Entry request / pilot\n\nSMCP DRAUGHT FORMAT:\n'Draught [X] metres forward\nand [X] metres aft'\n(or simply '[X] metres' if uniform)",
            es:"MENSAJE DE LLEGADA COMPLETO\nInformación OBLIGATORIA:\n1. Confirmación del canal\n2. Posición (distancia + marcación)\n3. ETA a la entrada del puerto (UTC)\n4. Calado\n5. Solicitud de entrada / práctico",
            pt:"MENSAGEM DE CHEGADA COMPLETA\nInformação OBRIGATÓRIA:\n1. Confirmação do canal\n2. Posição (distância + marcação)\n3. ETA na entrada do porto (UTC)\n4. Calado\n5. Pedido de entrada / prático"} },
    { speaker:"VTS", ch:"12",
      smcp:"MV Atlantic Pioneer, Marseille VTS. Entry is approved. Proceed to anchorage Bravo. Pilot will board at 0845 UTC. Stand by on channel 12. Over.",
      tr:{fr:"MV Atlantic Pioneer, Marseille VTS. Entrée autorisée. Gagnez le mouillage Bravo. Le pilote embarquera à 0845 UTC. Restez sur le canal 12. Terminé.",es:"MV Atlantic Pioneer, Marseille VTS. Entrada autorizada. Diríjase al fondeadero Bravo. El práctico embarcará a las 0845 UTC. Permanezca en el canal 12. Cambio.",pt:"MV Atlantic Pioneer, Marseille VTS. Entrada autorizada. Dirija-se ao fundeadouro Bravo. O prático embarcará às 0845 UTC. Permaneça no canal 12. Câmbio."},
      note:{fr:"AUTORISATION D'ENTRÉE VTS\n→ 'Entry is approved' = autorisé à entrer\n→ Instructions de mouillage ou de quai\n→ Heure d'embarquement du pilote\n→ 'Stand by on channel [X]' = rester à l'écoute\n\nSI REFUS :\n'Entry is not approved at this time.'\n'Remain at anchorage [X].'\n'Report when ready to proceed.'",
            en:"VTS ENTRY CLEARANCE\n→ 'Entry is approved' = authorized to enter\n→ Anchorage or berth instructions\n→ Pilot boarding time\n→ 'Stand by on channel [X]' = remain listening\n\nIF REFUSED:\n'Entry is not approved at this time.'\n'Remain at anchorage [X].'\n'Report when ready to proceed.'",
            es:"AUTORIZACIÓN DE ENTRADA VTS\n→ 'Entry is approved' = autorizado para entrar\n→ Instrucciones de fondeadero o muelle\n→ Hora de embarco del práctico\n→ 'Stand by on channel [X]' = permanecer a la escucha",
            pt:"AUTORIZAÇÃO DE ENTRADA VTS\n→ 'Entry is approved' = autorizado a entrar\n→ Instruções de fundeadouro ou cais\n→ Hora de embarque do prático\n→ 'Stand by on channel [X]' = permanecer à escuta"} },
    { speaker:"VESSEL", ch:"12",
      smcp:"Marseille VTS, MV Atlantic Pioneer. Understood. Proceeding to anchorage Bravo. Standing by on channel 12. Over.",
      tr:{fr:"Marseille VTS, MV Atlantic Pioneer. Bien reçu. Nous nous rendons au mouillage Bravo. En écoute sur canal 12. Terminé.",es:"Marseille VTS, MV Atlantic Pioneer. Recibido. Nos dirigimos al fondeadero Bravo. A la escucha en el canal 12. Cambio.",pt:"Marseille VTS, MV Atlantic Pioneer. Bem recebido. Dirigimo-nos ao fundeadouro Bravo. À escuta no canal 12. Câmbio."},
      note:{fr:"ACCUSÉ DE RÉCEPTION\n→ Toujours confirmer les instructions reçues\n→ Répéter les points clés (mouillage, canal)\n→ 'Understood' ou 'Roger' sont acceptés\n→ 'Standing by on channel [X]' = confirmation\n\nEXPRESSION SMCP CLÉS :\n'Proceeding to [destination]'\n'Standing by on channel [X]'\n'Request further instructions'\n'What are my berthing instructions?'",
            en:"ACKNOWLEDGMENT\n→ Always confirm received instructions\n→ Repeat key points (anchorage, channel)\n→ 'Understood' or 'Roger' are accepted\n→ 'Standing by on channel [X]' = confirmation\n\nKEY SMCP EXPRESSIONS:\n'Proceeding to [destination]'\n'Standing by on channel [X]'\n'Request further instructions'\n'What are my berthing instructions?'",
            es:"ACUSE DE RECIBO\n→ Siempre confirmar las instrucciones recibidas\n→ Repetir los puntos clave (fondeadero, canal)\n→ 'Understood' o 'Roger' son aceptados\n→ 'Standing by on channel [X]' = confirmación",
            pt:"ACUSE DE RECEÇÃO\n→ Sempre confirmar as instruções recebidas\n→ Repetir os pontos chave (fundeadouro, canal)\n→ 'Understood' ou 'Roger' são aceites\n→ 'Standing by on channel [X]' = confirmação"} },
  ];

  const d = dialogues[step];
  const isVessel = d.speaker === "VESSEL";

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {dialogues.map((_,i)=>(
          <div key={i} onClick={()=>setStep(i)} style={{
            flex:1, height:4, borderRadius:4, cursor:"pointer",
            background:i<=step?(i===step?C.vts:`${C.vts}55`):"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div style={{fontSize:9,color:C.vts,letterSpacing:2,textAlign:"center",marginBottom:8,fontFamily:"'Cinzel',serif"}}>
        VTS PORT APPROACH SIMULATOR — {step+1}/{dialogues.length}
      </div>
      <div style={{padding:"12px",borderRadius:14,marginBottom:10,
        background:isVessel?"rgba(0,229,255,0.08)":"rgba(255,215,0,0.08)",
        border:`2px solid ${isVessel?C.vts:C.port}55`,animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
          <div style={{fontSize:9,fontWeight:700,color:isVessel?C.vts:C.port,letterSpacing:1}}>
            {isVessel?"🚢 VESSEL":"🏢 VTS"}
          </div>
          <div style={{fontFamily:"'Courier New',monospace",fontSize:9,padding:"2px 8px",borderRadius:8,background:`${isVessel?C.vts:C.port}22`,color:isVessel?C.vts:C.port}}>
            CH {d.ch}
          </div>
        </div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:C.white,lineHeight:1.6,marginBottom:8,fontWeight:600}}>
          "{d.smcp}"
        </div>
        {lang!=="en"&&<button onClick={()=>setShowTr(!showTr)} style={{fontSize:9,padding:"3px 8px",borderRadius:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer"}}>
          {showTr?"▲":"▼"} {lang==="fr"?"Traduction":lang==="es"?"Traducción":"Tradução"}
        </button>}
        {lang!=="en"&&showTr&&<div style={{fontSize:11,color:C.muted,marginTop:6,fontStyle:"italic"}}>{d.tr[lang]||d.tr.fr}</div>}
      </div>
      <div style={{padding:"10px 12px",borderRadius:12,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.06)",marginBottom:10,fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
        {d.note[lang]||d.note.en}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":lang==="es"?"Anterior":"Anterior"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(dialogues.length-1,s+1))} disabled={step===dialogues.length-1}
          style={{flex:1,padding:"9px",borderRadius:10,background:step===dialogues.length-1?"rgba(255,255,255,0.05)":`${C.vts}22`,border:`1px solid ${step===dialogues.length-1?"rgba(255,255,255,0.08)":C.vts}`,color:C.white,cursor:step===dialogues.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":lang==="es"?"Siguiente":"Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — PILOT BOARDING SIMULATOR
// ══════════════════════════════════════
function PilotBoardingSVG({ lang }) {
  const [step, setStep] = useState(0);

  const exchanges = [
    { speaker:"VESSEL", color:C.vts,
      smcp:"Pilot station, Pilot station, this is MV Atlantic Pioneer. Request pilot. ETA pilot boarding ground 0840 UTC. Draught 9.5 metres forward, 10.2 metres aft. LOA 185 metres. Over.",
      context:{fr:"DEMANDE DE PILOTE SMCP\n\nINFORMATIONS OBLIGATOIRES :\n→ ETA au point d'embarquement du pilote\n→ Tirant d'eau avant (forward) et arrière (aft)\n→ LOA = Length Overall (longueur hors tout)\n→ Parfois : vitesse d'approche souhaitée\n\nINFOS COMPLÉMENTAIRES :\n→ Puissance moteur (kW)\n→ Nombre de moteurs\n→ Thruster(s) si disponibles\n→ Présence VDR",
               en:"PILOT REQUEST SMCP\n\nMANDATORY INFORMATION:\n→ ETA at pilot boarding ground\n→ Draught forward and aft\n→ LOA = Length Overall\n→ Sometimes: desired approach speed\n\nADDITIONAL INFO:\n→ Engine power (kW)\n→ Number of engines\n→ Thruster(s) if available\n→ VDR fitted",
               es:"SOLICITUD DE PRÁCTICO SMCP\n\nINFORMACIÓN OBLIGATORIA:\n→ ETA al punto de embarco del práctico\n→ Calado a proa y popa\n→ LOA = Eslora total\n→ A veces: velocidad de aproximación deseada",
               pt:"PEDIDO DE PRÁTICO SMCP\n\nINFORMAÇÃO OBRIGATÓRIA:\n→ ETA ao ponto de embarque do prático\n→ Calado à proa e à popa\n→ LOA = Comprimento total\n→ Por vezes: velocidade de aproximação desejada"} },
    { speaker:"PILOT STATION", color:C.pilot,
      smcp:"MV Atlantic Pioneer, Pilot station. Pilot confirmed for 0840 UTC. Boarding will be on your starboard side. Speed of approach 6 knots. Pilot ladder on starboard side at 5 metres above water. Over.",
      context:{fr:"INSTRUCTIONS D'EMBARQUEMENT DU PILOTE\n\n→ Côté d'embarquement (port/starboard side)\n→ Vitesse d'approche (approach speed)\n→ Hauteur de l'échelle de pilote\n\nECHELLE DE PILOTE :\nObligation SOLAS : échelle du côté sous le vent\nHauteur : adaptée à la marée et au franc-bord\nEtat : propre, solide, éclairée de nuit\n\nPRECAUTIONS :\n→ Réduire la vitesse à l'arrivée du pilote\n→ Surveiller le bateau pilote",
               en:"PILOT BOARDING INSTRUCTIONS\n\n→ Boarding side (port/starboard)\n→ Approach speed\n→ Pilot ladder height\n\nPILOT LADDER:\nSOLAS obligation: ladder on leeward side\nHeight: adapted to tide and freeboard\nCondition: clean, secure, lit at night\n\nPRECAUTIONS:\n→ Reduce speed on pilot boat arrival\n→ Monitor pilot boat",
               es:"INSTRUCCIONES DE EMBARCO DEL PRÁCTICO\n\n→ Lado de embarco (babor/estribor)\n→ Velocidad de aproximación\n→ Altura de la escala de práctico\n\nESCALA DE PRÁCTICO:\nObligación SOLAS: escala en el lado de sotavento\nAltura: adaptada a la marea y al francobordo",
               pt:"INSTRUÇÕES DE EMBARQUE DO PRÁTICO\n\n→ Lado de embarque (bombordo/estibordo)\n→ Velocidade de aproximação\n→ Altura da escada de prático\n\nESCADA DE PRÁTICO:\nObrigação SOLAS: escada no lado de sotavento\nAltura: adaptada à maré e ao bordo livre"} },
    { speaker:"VESSEL", color:C.vts,
      smcp:"Pilot station, MV Atlantic Pioneer. Understood. Starboard side. Speed 6 knots. Pilot ladder at 5 metres. I will be in position at 0835 UTC. Over.",
      context:{fr:"CONFIRMATION D'INSTRUCTIONS\n→ Toujours répéter les points clés\n→ Confirmer le côté et la hauteur de l'échelle\n→ Donner une ETA légèrement avant le pilote\n\nCOMMANDES DE VITESSE SMCP :\nFull ahead = avant toute\nHalf ahead = mi-avant\nSlow ahead = petite vitesse avant\nDead slow ahead = très petite vitesse avant\nStop = stop\nDead slow astern = très petite vitesse AR",
               en:"INSTRUCTION CONFIRMATION\n→ Always repeat key points\n→ Confirm side and ladder height\n→ Give ETA slightly before pilot\n\nSMCP SPEED COMMANDS:\nFull ahead / Half ahead / Slow ahead\nDead slow ahead / Stop\nDead slow astern / Slow astern\nHalf astern / Full astern",
               es:"CONFIRMACIÓN DE INSTRUCCIONES\n→ Siempre repetir los puntos clave\n→ Confirmar el lado y la altura de la escala\n→ Dar una ETA ligeramente antes del práctico\n\nÓRDENES DE VELOCIDAD SMCP:\nFull ahead / Half ahead / Slow ahead\nDead slow ahead / Stop\nDead slow astern / Slow astern",
               pt:"CONFIRMAÇÃO DE INSTRUÇÕES\n→ Sempre repetir os pontos chave\n→ Confirmar o lado e a altura da escada\n→ Dar uma ETA ligeiramente antes do prático\n\nORDENS DE VELOCIDADE SMCP:\nFull ahead / Half ahead / Slow ahead\nDead slow ahead / Stop\nDead slow astern / Slow astern"} },
    { speaker:"PILOT (on board)", color:C.port,
      smcp:"Good morning, Captain. I am Pilot Dubois. I have the con. Please set course 045 degrees true. Half ahead.",
      context:{fr:"PILOTE À BORD — PRISE DE CONDUITE\n\n'I have the con' = le pilote prend la conduite\nMais : le capitaine reste RESPONSABLE !\n\nLOI MARITIME :\nLe pilote = conseiller technique\nLe capitaine = responsable légal du navire\nMême avec pilote, le capitaine peut\nrefuser un ordre dangereux du pilote\n\nDROITS DU CAPITAINE :\n'I override the pilot.' (Annulation ordre pilote)\n'Captain's authority is maintained.'",
               en:"PILOT ON BOARD — TAKING THE CON\n\n'I have the con' = pilot takes conning\nBut: captain remains RESPONSIBLE!\n\nMARITIME LAW:\nPilot = technical advisor\nCaptain = legally responsible for the vessel\nEven with pilot, captain may\nrefuse a dangerous pilot order\n\nCAPTAIN'S RIGHTS:\n'I override the pilot.'\n'Captain's authority is maintained.'",
               es:"PRÁCTICO A BORDO — TOMA DEL MANDO\n\n'I have the con' = el práctico toma el mando\nPero: ¡el capitán sigue siendo RESPONSABLE!\n\nDERECHO MARÍTIMO:\nEl práctico = asesor técnico\nEl capitán = responsable legal del buque\nIncluso con práctico, el capitán puede\nrechazar una orden peligrosa del práctico",
               pt:"PRÁTICO A BORDO — TOMADA DO CON\n\n'I have the con' = o prático toma o con\nMas: o capitão continua RESPONSÁVEL!\n\nDIREITO MARÍTIMO:\nPrático = consultor técnico\nCapitão = responsável legal pelo navio\nMesmo com prático, o capitão pode\nrecusar uma ordem perigosa do prático"} },
  ];

  const e = exchanges[step];

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {exchanges.map((_,i)=>(
          <div key={i} onClick={()=>setStep(i)} style={{
            flex:1,height:4,borderRadius:4,cursor:"pointer",
            background:i<=step?(i===step?C.pilot:`${C.pilot}55`):"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div style={{fontSize:9,color:C.pilot,letterSpacing:2,textAlign:"center",marginBottom:8,fontFamily:"'Cinzel',serif"}}>
        PILOT BOARDING SIMULATOR — {step+1}/{exchanges.length}
      </div>
      <div style={{padding:"12px",borderRadius:14,marginBottom:10,
        background:`${e.color}10`,border:`2px solid ${e.color}55`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:9,fontWeight:700,color:e.color,marginBottom:6,letterSpacing:1}}>
          {e.speaker==="VESSEL"?"🚢":e.speaker==="PILOT STATION"?"🗼":"⚓"} {e.speaker}
        </div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:C.white,lineHeight:1.6,fontWeight:600}}>
          "{e.smcp}"
        </div>
      </div>
      <div style={{padding:"10px 12px",borderRadius:12,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.06)",marginBottom:10,fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
        {e.context[lang]||e.context.en}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":lang==="es"?"Anterior":"Anterior"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(exchanges.length-1,s+1))} disabled={step===exchanges.length-1}
          style={{flex:1,padding:"9px",borderRadius:10,background:step===exchanges.length-1?"rgba(255,255,255,0.05)":`${C.pilot}22`,border:`1px solid ${step===exchanges.length-1?"rgba(255,255,255,0.08)":C.pilot}`,color:C.white,cursor:step===exchanges.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":lang==="es"?"Siguiente":"Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — BERTHING PHRASES CARDS
// ══════════════════════════════════════
function BerthingPhrasesSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const sections = [
    { id:"approach", icon:"⚓", color:C.vts,
      label:{fr:"Approche & Mouillage",en:"Approach & Anchorage",es:"Aproximación y Fondeo",pt:"Aproximação e Fundeamento"},
      phrases:[
        { smcp:"I am proceeding to anchorage [name/letter].", tr:{fr:"Je me rends au mouillage [nom/lettre].",es:"Me dirijo al fondeadero [nombre/letra].",pt:"Dirijo-me ao fundeadouro [nome/letra]."} },
        { smcp:"I am anchoring in position Latitude [X]°[X]'N, Longitude [X]°[X]'E. Depth [X] metres. [X] shackles of cable.", tr:{fr:"Mouillage en position Lat [X]°[X]'N, Long [X]°[X]'E. Fond [X] m. [X] manilles.",es:"Fondeo en posición Lat [X]°[X]'N, Long [X]°[X]'E. Fondo [X] m. [X] grilletes.",pt:"Fundeio em posição Lat [X]°[X]'N, Long [X]°[X]'E. Fundo [X] m. [X] quartéis."} },
        { smcp:"Anchor is let go. Anchor is holding well.", tr:{fr:"Ancre mouillée. Ancre tient bien.",es:"Ancla fondeada. El ancla aguanta bien.",pt:"Âncora fundeada. A âncora está a segurar bem."} },
        { smcp:"My anchor is dragging. I require assistance.", tr:{fr:"Mon ancre chasse. J'ai besoin d'assistance.",es:"Mi ancla garrea. Necesito asistencia.",pt:"A minha âncora está a garrar. Preciso de assistência."} },
        { smcp:"I require a tug. Please arrange.", tr:{fr:"Je demande un remorqueur. Veuillez organiser.",es:"Solicito un remolcador. Por favor organice.",pt:"Solicito um rebocador. Por favor providencie."} },
      ]},
    { id:"berthing", icon:"🚢", color:C.port,
      label:{fr:"Amarrage & Quai",en:"Berthing & Quay",es:"Atraque y Muelle",pt:"Atracação e Cais"},
      phrases:[
        { smcp:"What is my berth number / berth assignment?", tr:{fr:"Quel est mon numéro / affectation de poste d'amarrage ?",es:"¿Cuál es mi número / asignación de atraque?",pt:"Qual é o meu número / atribuição de cais?"} },
        { smcp:"I am approaching berth [X] on [port/starboard] side.", tr:{fr:"J'approche du poste [X] par [bâbord/tribord].",es:"Me aproximo al atraque [X] por [babor/estribor].",pt:"Aproximo-me do cais [X] por [bombordo/estibordo]."} },
        { smcp:"Please send lines. I am ready to receive mooring lines.", tr:{fr:"Envoyez les amarres. Je suis prêt à recevoir les amarres.",es:"Envíen los cabos. Estoy listo para recibir las amarras.",pt:"Enviem os cabos. Estou pronto para receber as amarras."} },
        { smcp:"Make fast [forward / aft / spring lines].", tr:{fr:"Raidissez [les amarres avant / arrière / les gardes].",es:"Tensen [las amarras de proa / popa / los springs].",pt:"Tesem [as amarras de vante / de ré / as espias]."} },
        { smcp:"Vessel is all fast. Gangway is being rigged.", tr:{fr:"Le navire est amarré. La passerelle est en cours de mise en place.",es:"El buque está amarrado. La pasarela está siendo instalada.",pt:"O navio está atracado. A prancha está a ser colocada."} },
      ]},
    { id:"tugs", icon:"🏭", color:C.orange,
      label:{fr:"Remorqueurs",en:"Tugs",es:"Remolcadores",pt:"Rebocadores"},
      phrases:[
        { smcp:"Tug [name], make fast forward / aft.", tr:{fr:"Remorqueur [nom], acostez à l'avant / à l'arrière.",es:"Remolcador [nombre], amárrese a proa / a popa.",pt:"Rebocador [nome], atraque à vante / à ré."} },
        { smcp:"Push on [port/starboard] bow / quarter.", tr:{fr:"Poussez sur [bâbord/tribord] à l'étrave / à la hanche.",es:"Empuje por [babor/estribor] en la proa / en la aleta.",pt:"Empurre por [bombordo/estibordo] na proa / na alheta."} },
        { smcp:"Pull on [port/starboard] side.", tr:{fr:"Tirez sur [bâbord/tribord].",es:"Tire por [babor/estribor].",pt:"Puxe por [bombordo/estibordo]."} },
        { smcp:"Let go tug. Stand clear.", tr:{fr:"Larguez le remorqueur. Dégagez.",es:"Suelte el remolcador. Despéjese.",pt:"Largue o rebocador. Afaste-se."} },
        { smcp:"Tug assistance is required. Tug to come alongside [port/starboard].", tr:{fr:"Assistance remorqueur requise. Remorqueur par [bâbord/tribord].",es:"Se requiere asistencia de remolcador. Remolcador por [babor/estribor].",pt:"Assistência de rebocador necessária. Rebocador por [bombordo/estibordo]."} },
      ]},
    { id:"mooring", icon:"🔗", color:C.moor,
      label:{fr:"Manœuvres d'amarrage",en:"Mooring operations",es:"Operaciones de amarre",pt:"Operações de amarração"},
      phrases:[
        { smcp:"Let go [forward lines / aft lines / spring lines / all lines].", tr:{fr:"Largez [les amarres avant / arrière / les gardes / toutes les amarres].",es:"Larguen [las amarras de proa / popa / los springs / todas las amarras].",pt:"Larguem [as amarras de vante / de ré / as espias / todas as amarras]."} },
        { smcp:"Heave in [slowly / together / on the forward spring].", tr:{fr:"Amenez [doucement / ensemble / la garde avant].",es:"Cobren [despacio / juntos / el spring de proa].",pt:"Colham [devagar / juntos / a espia de vante]."} },
        { smcp:"Ease out / slack away [forward lines].", tr:{fr:"Filez [les amarres avant].",es:"Larguen [las amarras de proa].",pt:"Filem [as amarras de vante]."} },
        { smcp:"Make secure. Vessel is at rest.", tr:{fr:"Amarrez solidement. Le navire est à l'arrêt.",es:"Amarren firmemente. El buque está detenido.",pt:"Amarrem firmemente. O navio está parado."} },
        { smcp:"All lines ashore. Gangway in position.", tr:{fr:"Toutes les amarres à quai. Passerelle en position.",es:"Todas las amarras a tierra. Pasarela en posición.",pt:"Todas as amarras em terra. Prancha em posição."} },
      ]},
  ];

  const sel_ = sel!==null ? sections[sel] : null;

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {sections.map((s,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${s.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18,marginBottom:3}}>{s.icon}</div>
            <div style={{fontSize:9,color:sel===i?s.color:C.muted,fontWeight:700,lineHeight:1.2}}>{s.label[lang]||s.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:10}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        {sel_.phrases.map((ph,i)=>(
          <div key={i} style={{marginBottom:10,paddingBottom:10,borderBottom:i<sel_.phrases.length-1?"1px solid rgba(255,255,255,0.05)":"none"}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.5,marginBottom:3}}>"{ph.smcp}"</div>
            {(lang!=="en")&&<div style={{fontSize:10,color:C.muted,fontStyle:"italic"}}>{ph.tr[lang]||ph.tr.fr}</div>}
          </div>
        ))}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — VTS PHRASE QUIZ
// ══════════════════════════════════════
function VTSQuizSVG({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const qs = [
    { q:"VTS says: 'Entry is not approved at this time.' What do you do?", opts:["Enter the port anyway","Remain outside and stand by. Report when ready to proceed or when conditions change.","Call again on CH 16","Anchor anywhere"], correct:1 },
    { q:"What information must you give when requesting a pilot?", opts:["Just your vessel name","ETA at pilot ground, draught forward and aft, LOA, vessel name","Only position","Just ETA"], correct:1 },
    { q:"Pilot says 'I have the con.' Who is now legally responsible for the vessel?", opts:["The pilot","The Captain — the pilot is a technical advisor only, legal responsibility remains with the captain","The VTS","No one"], correct:1 },
    { q:"How do you report that your anchor is dragging?", opts:["Anchor problem","My anchor is dragging. I require assistance.","Anchor not holding","Help, anchor moved"], correct:1 },
    { q:"What does 'make fast' mean in mooring operations?", opts:["Go faster","Secure the mooring lines / tie up firmly","Release lines","Move forward"], correct:1 },
  ];

  const [shuffled]=useState(()=>qs.map(shuffleQuestionOptions));
  const q = shuffled[qIdx];
  const pick=(i)=>{if(ans!==null)return;setAns(i);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(qIdx<qs.length-1){setQIdx(q=>q+1);setAns(null);}else setDone(true);};

  if(done) return (
    <div style={{textAlign:"center",padding:"16px"}}>
      <div style={{fontSize:40}}>{score>=4?"🏆":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:C.white,margin:"8px 0"}}>{score}/{qs.length}</div>
      <button onClick={()=>{setDone(false);setQIdx(0);setAns(null);setScore(0);}} style={{padding:"8px 16px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer",fontSize:11}}>🔄 Retry</button>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {qs.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<qIdx?C.vts:i===qIdx?C.port:"rgba(255,255,255,0.1)"}}/>)}
      </div>
      <div style={{fontSize:12,fontWeight:700,color:C.white,marginBottom:12,lineHeight:1.5}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(ans!==null){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===ans){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:ans!==null?"default":"pointer",fontFamily:"'Courier New',monospace"}}>{opt}</button>;
        })}
      </div>
      {ans!==null&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.vts},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.navy,cursor:"pointer"}}>
        {qIdx<qs.length-1?"NEXT →":"FINISH"}
      </button>}
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
    en:[
      {id:"q1",q:"Complete: '___ VTS, ___ VTS, this is MV Pacific Star, MV Pacific Star. ___'\n(Fill the blanks: station · station · closing word)",correct:"Over"},
      {id:"q2",q:"How do you say 'the pilot will board on the left side of the vessel' in SMCP?\n(Answer in English)",correct:"Pilot will board on the port side"},
      {id:"q3",q:"VTS says 'Stand by on channel 12'. What does this mean?\n(Answer: 2-3 words)",correct:"remain listening"},
    ],
    fr:[
      {id:"q1",q:"Complétez : '___ VTS, ___ VTS, this is MV Pacific Star, MV Pacific Star. ___'\n(Remplir les blancs : station · station · mot de fin)",correct:"Over"},
      {id:"q2",q:"Comment dit-on 'le pilote embarquera sur le côté gauche du navire' en SMCP ?\n(Répondre en anglais)",correct:"Pilot will board on the port side"},
      {id:"q3",q:"Le VTS dit 'Stand by on channel 12'. Que signifie cela ?\n(Répondre : 2-3 mots)",correct:"restez à l'écoute"},
    ],
    es:[
      {id:"q1",q:"Complete: '___ VTS, ___ VTS, this is MV Pacific Star, MV Pacific Star. ___'\n(Rellene los espacios: station · station · palabra final)",correct:"Over"},
      {id:"q2",q:"¿Cómo se dice 'el práctico embarcará por el lado izquierdo del buque' en SMCP?\n(Responder en inglés)",correct:"Pilot will board on the port side"},
      {id:"q3",q:"El VTS dice 'Stand by on channel 12'. ¿Qué significa?\n(Responder: 2-3 palabras)",correct:"permanecer a la escucha"},
    ],
    pt:[
      {id:"q1",q:"Complete: '___ VTS, ___ VTS, this is MV Pacific Star, MV Pacific Star. ___'\n(Preencha os espaços: station · station · palavra final)",correct:"Over"},
      {id:"q2",q:"Como se diz 'o prático embarcará pelo lado esquerdo do navio' em SMCP?\n(Responder em inglês)",correct:"Pilot will board on the port side"},
      {id:"q3",q:"O VTS diz 'Stand by on channel 12'. O que significa isso?\n(Responder: 2-3 palavras)",correct:"permanecer à escuta"},
    ],
  };
  const list=qs[lang]||qs.en;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("over");
    if(q.id==="q2") return v.includes("port");
    if(q.id==="q3") return v.includes("listen")||v.includes("stand")||v.includes("écoute")||v.includes("escucha")||v.includes("escuta")||v.includes("channel");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.vts}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Appel VTS = nom station 2× + nom navire 2× + OVER · Port side = côté gauche · Stand by = rester à l'écoute":
         lang==="en"?"💡 Reminders: VTS call = station name 2× + vessel name 2× + OVER · Port side = left side · Stand by = remain listening":
         lang==="es"?"💡 Recordatorios: Llamada VTS = nombre estación 2× + nombre buque 2× + OVER · Port side = lado izquierdo · Stand by = permanecer a la escucha":
         "💡 Lembretes: Chamada VTS = nome estação 2× + nome navio 2× + OVER · Port side = lado esquerdo · Stand by = permanecer à escuta"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:13,fontFamily:"'Courier New',monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10,fontFamily:"'Courier New',monospace"}}>
        {lang==="fr"||lang==="en"?
        "Q1: OVER (fin d'appel initial VTS · 'Over' = j'attends votre réponse)\nQ2: 'Pilot will board on the PORT SIDE' (port = gauche · starboard = droite)\nQ3: STAND BY = rester à l'écoute sur ce canal · ne pas changer de canal":
        "Q1: OVER · Q2: Port side (lado izquierdo/esquerdo) · Q3: Stand by = permanecer escuchando/à escuta"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.vts}12`,border:`1px solid ${showC?C.green:C.vts}44`,color:showC?C.green:C.vts,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

export const QUIZ = {
  en:[
    {q:"What is the correct SMCP phrase for the initial VTS contact?",opts:["Hello VTS","[VTS name], [VTS name], this is [vessel name], [vessel name]. Over.","VTS, ship calling","Port, vessel here"],correct:1,expl:"VTS initial contact SMCP format: '[VTS station name], [VTS station name], this is [vessel name], [vessel name]. Over.' Rules: repeat station name TWICE, repeat vessel name TWICE, end with 'Over' (expecting reply). Initial call on CH 16 only. VTS will instruct you to switch to working channel. Never start the conversation without stating both the station you're calling and your vessel name clearly."},
    {q:"What mandatory information must be included in a port arrival report?",opts:["Just the vessel name","Vessel name, position, ETA, draught, intended berth/anchorage, and any deficiencies or special requirements","Just ETA","Position and ETA only"],correct:1,expl:"Port arrival report SMCP mandatory information: vessel name (and call sign), current position (lat/long or bearing from landmark), ETA at port entrance (UTC 4-digit), draught forward and aft (in metres), intended berth or anchorage, any hazardous cargo (if applicable), any defects affecting maneuverability, request for pilot/tug if required. This comprehensive report allows the port authority to prepare appropriate resources."},
    {q:"What does 'vessel is all fast' mean in berthing operations?",opts:["The vessel is moving too fast","All mooring lines are secured — the vessel is firmly moored to the berth","The vessel is ready to depart","The anchor is secure"],correct:1,expl:"'Vessel is all fast' = all mooring lines are secured and the vessel is firmly tied up at the berth. This phrase signals the end of the berthing operation. Following this: 'Gangway is being rigged' = the gangway is being positioned. 'Gangway is in position' = personnel may embark/disembark. These SMCP phrases are used by the bridge team to coordinate with deck crew and port authorities during mooring."},
    {q:"A pilot says 'I have the con'. Who bears legal responsibility for the vessel?",opts:["The pilot — he now controls the vessel","The captain — a pilot is a technical advisor; legal responsibility for the vessel always remains with the captain","Both equally","The shipping company"],correct:1,expl:"FUNDAMENTAL MARITIME LAW: even when a pilot 'has the con' (is giving helm and engine orders), the CAPTAIN retains full legal responsibility for the vessel. The pilot is a compulsory advisor, not a legal authority. Captain's rights: captain may override any pilot order they believe to be dangerous. If the captain overrides the pilot: 'Captain's authority. I am taking the con.' This principle is established in SOLAS and national maritime law."},
    {q:"What is the correct SMCP phrase when your anchor is dragging?",opts:["Anchor problem!","My anchor is dragging. I require assistance.","Anchor not working","We are drifting"],correct:1,expl:"Anchor dragging SMCP: 'My anchor is dragging. I require assistance.' Additional information to provide: current position, rate of dragging (speed in knots), direction of drift, depth of water, number of shackles deployed, whether attempting to re-anchor. Also: inform VTS immediately and nearby vessels (broadcast on CH 16). A dragging anchor in a crowded anchorage is a serious navigation hazard requiring immediate action."},
  ],
  fr:[
    {q:"Quelle est la phrase SMCP correcte pour le contact VTS initial ?",opts:["Bonjour VTS","[Nom VTS], [Nom VTS], ici [nom navire], [nom navire]. Terminé.","VTS, navire appelle","Port, navire ici"],correct:1,expl:"Format SMCP contact VTS initial : '[Nom de la station VTS], [Nom de la station VTS], ici [nom du navire], [nom du navire]. Terminé.' Règles : répéter le nom de la station DEUX fois, répéter le nom du navire DEUX fois, terminer par 'Terminé' (j'attends une réponse). Appel initial sur CH 16 uniquement. Le VTS vous demandera de basculer sur le canal de travail."},
    {q:"Quelles informations obligatoires doivent figurer dans un rapport d'arrivée au port ?",opts:["Juste le nom du navire","Nom du navire, position, ETA, tirant d'eau, poste/mouillage prévu, déficiences ou besoins spéciaux","Juste l'ETA","Position et ETA seulement"],correct:1,expl:"Rapport d'arrivée SMCP informations obligatoires : nom du navire (et indicatif), position actuelle (lat/long ou relèvement), ETA à l'entrée du port (UTC 4 chiffres), tirant d'eau avant et arrière (en mètres), poste ou mouillage prévu, cargaison dangereuse (le cas échéant), avaries affectant la manœuvrabilité, demande de pilote/remorqueur si nécessaire."},
    {q:"Que signifie 'vessel is all fast' dans les opérations d'amarrage ?",opts:["Le navire va trop vite","Toutes les amarres sont sécurisées — le navire est fermement amarré au poste","Le navire est prêt à partir","L'ancre est sécurisée"],correct:1,expl:"'Vessel is all fast' = toutes les amarres sont fixées et le navire est solidement amarré au poste. Cette phrase signale la fin de l'opération d'amarrage. Suivi de : 'Gangway is being rigged' = la passerelle est en cours de mise en place. 'Gangway is in position' = le personnel peut embarquer/débarquer."},
    {q:"Un pilote dit 'I have the con'. Qui est légalement responsable du navire ?",opts:["Le pilote — il contrôle maintenant le navire","Le capitaine — le pilote est un conseiller technique ; la responsabilité légale du navire reste toujours avec le capitaine","Les deux également","La compagnie maritime"],correct:1,expl:"LOI MARITIME FONDAMENTALE : même quand un pilote 'a le con' (donne des ordres de barre et de machine), le CAPITAINE conserve l'entière responsabilité légale du navire. Le pilote est un conseiller obligatoire, pas une autorité légale. Droits du capitaine : peut annuler tout ordre du pilote jugé dangereux. Cette règle est établie dans SOLAS et le droit maritime national."},
    {q:"Quelle est la phrase SMCP correcte quand votre ancre chasse ?",opts:["Problème d'ancre !","My anchor is dragging. I require assistance.","L'ancre ne tient pas","Nous dérivons"],correct:1,expl:"Ancre chassant SMCP : 'My anchor is dragging. I require assistance.' Informations supplémentaires : position actuelle, vitesse de dérive, direction de la dérive, profondeur de l'eau, nombre de manilles filées, tentative de remouillage. Aussi : informer immédiatement le VTS et les navires voisins (diffusion sur CH 16). Une ancre qui chasse dans un mouillage encombré est un danger de navigation grave."},
  ],
  es:[
    {q:"¿Cuál es la frase SMCP correcta para el contacto VTS inicial?",opts:["Hola VTS","[Nombre VTS], [Nombre VTS], aquí [nombre buque], [nombre buque]. Cambio.","VTS, buque llama","Puerto, buque aquí"],correct:1,expl:"Formato SMCP contacto VTS inicial: '[Nombre estación VTS], [Nombre estación VTS], aquí [nombre del buque], [nombre del buque]. Cambio.' Reglas: repetir el nombre de la estación DOS veces, repetir el nombre del buque DOS veces, terminar con 'Cambio'. Llamada inicial solo en CH 16. El VTS pedirá cambiar al canal de trabajo."},
    {q:"¿Qué información obligatoria debe incluirse en un informe de llegada al puerto?",opts:["Solo el nombre del buque","Nombre del buque, posición, ETA, calado, muelle/fondeadero previsto, deficiencias o requisitos especiales","Solo la ETA","Posición y ETA únicamente"],correct:1,expl:"Informe de llegada SMCP información obligatoria: nombre del buque (e indicativo), posición actual (lat/long o marcación), ETA a la entrada del puerto (UTC 4 cifras), calado a proa y popa (en metros), muelle o fondeadero previsto, mercancía peligrosa (si procede), averías que afectan a la maniobrabilidad, solicitud de práctico/remolcador si es necesario."},
    {q:"¿Qué significa 'vessel is all fast' en las operaciones de atraque?",opts:["El buque va demasiado rápido","Todas las amarras están aseguradas — el buque está firmemente amarrado al muelle","El buque está listo para partir","El ancla está asegurada"],correct:1,expl:"'Vessel is all fast' = todas las amarras están fijadas y el buque está solidamente amarrado al muelle. Esta frase señala el final de la operación de atraque. Seguido de: 'Gangway is being rigged' = la pasarela está en proceso de colocación. 'Gangway is in position' = el personal puede embarcar/desembarcar."},
    {q:"Un práctico dice 'I have the con'. ¿Quién es legalmente responsable del buque?",opts:["El práctico — ahora controla el buque","El capitán — el práctico es un asesor técnico; la responsabilidad legal del buque siempre recae en el capitán","Ambos por igual","La empresa naviera"],correct:1,expl:"DERECHO MARÍTIMO FUNDAMENTAL: incluso cuando un práctico 'tiene el con', el CAPITÁN conserva la plena responsabilidad legal del buque. El práctico es un asesor obligatorio, no una autoridad legal. Derechos del capitán: puede anular cualquier orden del práctico que considere peligrosa. Esta regla está establecida en el SOLAS y el derecho marítimo nacional."},
    {q:"¿Cuál es la frase SMCP correcta cuando su ancla está garrando?",opts:["¡Problema con el ancla!","My anchor is dragging. I require assistance.","El ancla no aguanta","Estamos a la deriva"],correct:1,expl:"Ancla garrando SMCP: 'My anchor is dragging. I require assistance.' Información adicional: posición actual, velocidad de deriva, dirección de la deriva, profundidad del agua, número de grilletes filados, intento de re-fondeo. También: informar inmediatamente al VTS y a los buques vecinos (difusión en CH 16)."},
  ],
  pt:[
    {q:"Qual é a frase SMCP correta para o contacto VTS inicial?",opts:["Olá VTS","[Nome VTS], [Nome VTS], aqui [nome navio], [nome navio]. Mudança.","VTS, navio chamando","Porto, navio aqui"],correct:1,expl:"Formato SMCP contacto VTS inicial: '[Nome estação VTS], [Nome estação VTS], aqui [nome do navio], [nome do navio]. Mudança.' Regras: repetir o nome da estação DUAS vezes, repetir o nome do navio DUAS vezes, terminar com 'Mudança'. Chamada inicial apenas no CH 16. O VTS pedirá para mudar para o canal de trabalho."},
    {q:"Que informação obrigatória deve constar num relatório de chegada ao porto?",opts:["Apenas o nome do navio","Nome do navio, posição, ETA, calado, cais/fundeadouro previsto, deficiências ou requisitos especiais","Apenas a ETA","Posição e ETA apenas"],correct:1,expl:"Relatório de chegada SMCP informação obrigatória: nome do navio (e indicativo), posição atual (lat/long ou marcação), ETA à entrada do porto (UTC 4 dígitos), calado à proa e à popa (em metros), cais ou fundeadouro previsto, carga perigosa (se aplicável), avarias que afetam a manobabilidade, pedido de prático/rebocador se necessário."},
    {q:"O que significa 'vessel is all fast' nas operações de atracação?",opts:["O navio vai demasiado rápido","Todas as amarras estão seguras — o navio está firmemente amarrado ao cais","O navio está pronto para partir","A âncora está segura"],correct:1,expl:"'Vessel is all fast' = todas as amarras estão fixadas e o navio está solidamente amarrado ao cais. Esta frase sinaliza o fim da operação de atracação. Seguido de: 'Gangway is being rigged' = a passadiço está em processo de colocação. 'Gangway is in position' = o pessoal pode embarcar/desembarcar."},
    {q:"Um prático diz 'I have the con'. Quem é legalmente responsável pelo navio?",opts:["O prático — agora controla o navio","O capitão — o prático é um consultor técnico; a responsabilidade legal pelo navio cabe sempre ao capitão","Ambos igualmente","A empresa naviera"],correct:1,expl:"DIREITO MARÍTIMO FUNDAMENTAL: mesmo quando um prático 'tem o con', o CAPITÃO conserva a plena responsabilidade legal pelo navio. O prático é um consultor obrigatório, não uma autoridade legal. Direitos do capitão: pode anular qualquer ordem do prático que considere perigosa. Esta regra está estabelecida no SOLAS e no direito marítimo nacional."},
    {q:"Qual é a frase SMCP correta quando a sua âncora está a garrear?",opts:["Problema com a âncora!","My anchor is dragging. I require assistance.","A âncora não agarra","Estamos à deriva"],correct:1,expl:"Âncora a garrear SMCP: 'My anchor is dragging. I require assistance.' Informação adicional: posição atual, velocidade de deriva, direção da deriva, profundidade da água, número de manilhas filadas, tentativa de re-fundeamento. Também: informar imediatamente o VTS e os navios vizinhos (difusão no CH 16)."},
  ],
};

export const BANK = {
  en:[
    {q:"What is a 'Notice of Readiness' (NOR) in port communications?",opts:["A safety drill notice","Formal declaration by the master that the vessel has arrived at the designated place and is ready to load or discharge cargo — triggers laytime","A weather report","A crew list"],correct:1,expl:"Notice of Readiness (NOR) = formal SMCP/legal declaration: '[Vessel name] has arrived at [port/anchorage] and is in all respects ready to [load/discharge]. This Notice of Readiness is tendered at [time] UTC on [date].' NOR triggers the start of laytime (the time allowed for cargo operations). Critical in charter parties. Must be tendered in writing and acknowledged by the charterer/shipper/agent."},
    {q:"What information does a VTS operator need before granting port entry?",opts:["Just the vessel name","Vessel name, position, ETA, draught, cargo type, defects, pilot requirements, and compliance with port regulations","Only position","ETA and draught"],correct:1,expl:"VTS port entry requirements: vessel name and call sign, current position and ETA, draught (forward and aft), cargo type (especially dangerous goods), any navigational defects, pilot/tug requirements, ISPS code compliance, port state control clearance if required. VTS may also check: vessel tonnage against channel depth, berth availability, tidal windows for vessels with deep draught."},
    {q:"How do you report a dangerous situation in a port approach channel?",opts:["Just slow down","[VTS], this is [vessel name]. Urgent message. I have [describe situation]. My position is [X]. I require immediate assistance/instructions.","Call on CH 16 only","Keep silent and manoeuvre"],correct:1,expl:"Urgent situation in port channel SMCP: '[VTS station], this is [vessel name]. Urgent message.' Then describe: nature of emergency (engine failure/steering failure/collision/grounding), position in the channel, action being taken, assistance required. For LIFE danger: MAYDAY. For urgency without life threat: PAN-PAN. For navigational safety: SÉCURITÉ. The VTS can then coordinate traffic, dispatch tugs, and alert emergency services."},
    {q:"What does 'free pratique' mean and how is it requested?",opts:["Free parking in port","Official health clearance allowing the vessel to communicate freely with shore and have personnel go ashore — requested via flag Q or VHF","A free berth assignment","A pilot exemption"],correct:1,expl:"Free pratique SMCP: '[Port health authority], this is [vessel name]. Request free pratique. We have [X] persons on board. No illness on board / [describe any illness]. Last port of call was [port]. Over.' The health authority grants: 'MV [name], free pratique is granted. You may communicate with the shore.' Until granted: no one may go ashore or board (theoretically). Flag Q hoisted until free pratique granted."},
    {q:"How do you request tug assistance in SMCP?",opts:["Tug, come here","I require tug assistance. Please send [X] tug(s). ETA berth [X] is [time] UTC. My LOA is [X] metres.","Need a tug","Tug needed urgently"],correct:1,expl:"Tug request SMCP: 'I require tug assistance. Please send [number] tug(s). My vessel LOA is [X] metres. Beam [X] metres. Deadweight [X] tonnes. ETA at berth [X] is [time] UTC. I have [thruster/no thruster].' Tug confirmation: 'MV [name], [number] tug(s) confirmed. Tugs will be alongside at [time] UTC.' During operation: 'Tug [name], make fast forward/aft. Push/pull on [port/starboard] side.'"},
    {q:"What is the SMCP phrase when you experience an engine failure in port?",opts:["Engine broken!","I have an engine failure. I am unable to manoeuvre. I require tug assistance immediately.","Engine problem","Engines not working"],correct:1,expl:"Engine failure in port SMCP: 'I have an engine failure. I am unable to manoeuvre. I require [tug assistance / anchor / immediate assistance].' Also: 'I am [drifting / at anchor / moored]. My position is [X].' If in a channel: 'I am blocking the channel. Please divert traffic.' If collision risk: 'Risk of collision. All vessels stand clear.' Broadcast on VHF 16 immediately. VTS will coordinate assistance."},
    {q:"How do you report the completion of cargo operations?",opts:["Cargo done","Cargo operations are complete. All [hatches/tanks] are secured. Vessel is ready to depart when clearance is granted.","Loading finished","Cargo OK"],correct:1,expl:"Cargo completion SMCP: 'Cargo operations are complete. All [hatches/tanks] are secured and sealed. [Bills of lading / cargo documents] are in order. We are ready to receive departure clearance.' Port agent/authority response: 'MV [name], departure clearance is granted / will be granted at [time] UTC.' Before departure: ensure pilot ordered if required, tugs arranged, channel clearance obtained from VTS."},
    {q:"What is a 'berth note' in port communications?",opts:["A musical note","Written confirmation from port authority of berth assignment, including berth number, location, and time of availability","A mooring instruction","A weather report"],correct:1,expl:"Berth note (berthing order) = written communication from port authority/terminal operator confirming: berth number, location (quay/terminal name), available time (laycan), any restrictions (max draught, LOA, beam). SMCP related: '[Port authority], please confirm berth assignment for [vessel name] arriving [date/time].' Response: 'MV [name], your berth is [number] at [terminal]. Berth will be available from [time] UTC.'"},
    {q:"How do you communicate with a mooring station (line handlers) in SMCP?",opts:["Shout to them","Mooring station [forward/aft], bridge here. [Heave in / ease out / make fast / let go] [forward lines / aft lines / spring lines].","Use hand signals only","Not necessary"],correct:1,expl:"Bridge-mooring station SMCP: 'Mooring station [forward/aft], bridge. [Instruction].' Instructions: 'Heave in' = pull in the line. 'Ease out / slack away' = pay out the line. 'Make fast' = secure/tie. 'Let go' = release. 'Stand by' = be ready. Lines: 'forward lines' (head lines), 'aft lines' (stern lines), 'spring lines' (fore/aft springs), 'breast lines' (cross lines). This standardized communication prevents confusion and accidents during mooring."},
    {q:"What does 'ISPS Code' compliance mean when entering a port?",opts:["A safety drill","International Ship and Port Facility Security Code — security level compliance required for port entry — vessel must declare security level and last 10 ports","An engine certificate","A navigation rule"],correct:1,expl:"ISPS Code = International Ship and Port Facility Security Code (SOLAS Chapter XI-2). Port entry compliance: vessel must be at appropriate security level (1/2/3), submit Declaration of Security (DoS) if required by port, provide list of last 10 port calls and their security levels, confirm no security incidents during voyage. SMCP: '[Port security], MV [name]. Vessel security level is [1/2/3]. Requesting entry in compliance with ISPS Code.'"},
    {q:"How do you handle a 'negative reply' from VTS when requesting entry?",opts:["Force entry","Acknowledge, stand by at designated holding position, re-request when conditions permit or as instructed by VTS","Ask again immediately","Go to another port"],correct:1,expl:"VTS denial of entry handling SMCP: 'Marseille VTS, MV [name]. Understood. I will remain at [anchorage/position]. I will report again at [time] UTC or when conditions change.' Then: maintain watch on VTS working channel, log the denial and time, advise company/agent, re-contact VTS when permitted. VTS denial may be due to: berth not available, traffic congestion, port closure, weather, tidal restriction."},
    {q:"What is the SMCP phrase for reporting a fire on board while at berth?",opts:["Fire!","MAYDAY MAYDAY MAYDAY. This is [vessel name]. I have a fire on board. My position is berth [X], [port name]. I require fire brigade assistance immediately.","Fire on ship","Need fire trucks"],correct:1,expl:"Fire at berth SMCP: 'MAYDAY MAYDAY MAYDAY. This is [vessel name]. Fire on board. Position: berth [X], [port name]. Nature of fire: [engine room/cargo/accommodation]. Fire is [under control / not under control]. [X] persons on board. Require fire brigade and medical assistance immediately.' Also: sound general alarm, broadcast on VHF 16, notify port authority and terminal, activate fire plan."},
    {q:"How do you request port clearance to depart?",opts:["I am leaving now","[Port authority/VTS], this is [vessel name]. Request departure clearance. All crew on board. All cargo secured. Pilot boarded / not required. Ready to cast off.","Leaving port","Time to go"],correct:1,expl:"Departure clearance SMCP: '[VTS/Port authority], this is [vessel name]. Request departure clearance. Departure time [time] UTC. Pilot [name] is on board / pilot not required. All crew accounted for. Cargo secured. Draft forward [X] metres, aft [X] metres. Proceeding to [destination].' VTS/Port response: 'MV [name], departure clearance is granted. Proceed on channel [X]. VTS Fairway.' or 'MV [name], departure clearance will be granted at [time] UTC. Traffic at [location].'"},
    {q:"What is a 'single point mooring' (SPM) and how is it communicated?",opts:["One mooring line","Offshore buoy mooring system for tankers — vessel moors to a buoy and connects to submarine pipeline for cargo transfer","A type of anchor","A port berth"],correct:1,expl:"Single Point Mooring (SPM) SMCP: '[SPM terminal], this is [vessel name]. Request mooring instructions for SPM [name/number]. Current draught [X] metres. Wind [X] degrees, [X] knots. Sea state [calm/moderate/rough].' SPM response includes: approach heading, connection procedure for cargo hose/manifold, mooring line sequence, emergency disconnect procedure. SPM used by VLCCs and large tankers at offshore terminals to avoid port entry."},
    {q:"How do you report a medical emergency while at anchor waiting for port entry?",opts:["Doctor needed","PAN-PAN PAN-PAN PAN-PAN. This is [vessel name]. Medical emergency on board. Position: anchorage [name]. Require medical assistance for [describe]. Patient condition: [describe].","Medical problem","Person sick"],correct:1,expl:"Medical emergency at anchor SMCP: 'PAN-PAN PAN-PAN PAN-PAN. This is [vessel name]. Medical emergency on board. Position: anchorage [name], Latitude [X], Longitude [X]. I have one person with [condition description]. Require [doctor / medical evacuation / ambulance at berth]. Request priority entry or helicopter evacuation. Over.' VTS/MRCC will coordinate: priority entry, pilot, ambulance, or helicopter if required. All other traffic should listen and stand by."},
  ],
  fr:[
    {q:"Qu'est-ce qu'une 'Notice of Readiness' (NOR) dans les communications portuaires ?",opts:["Un avis d'exercice de sécurité","Déclaration formelle du capitaine que le navire est arrivé et prêt à charger ou décharger — déclenche la surestarie","Un bulletin météo","Une liste d'équipage"],correct:1,expl:"Notice of Readiness (NOR) SMCP : '[Nom navire] has arrived at [port/mouillage] and is in all respects ready to [load/discharge]. This Notice of Readiness is tendered at [heure] UTC on [date].' La NOR déclenche le début de la planche (temps alloué aux opérations de cargaison). Critique dans les chartes-parties. Doit être donnée par écrit et accusée de réception par l'affréteur/chargeur/agent."},
    {q:"Quelles informations un opérateur VTS a-t-il besoin avant d'accorder l'entrée au port ?",opts:["Juste le nom du navire","Nom du navire, position, ETA, tirant d'eau, type de cargaison, avaries, besoins en pilote, conformité aux règlements portuaires","Seulement la position","ETA et tirant d'eau"],correct:1,expl:"Exigences d'entrée VTS : nom et indicatif du navire, position actuelle et ETA, tirant d'eau (avant et arrière), type de cargaison (surtout marchandises dangereuses), avaries de navigation, besoins en pilote/remorqueur, conformité ISPS, contrôle par l'État du port si requis. Le VTS peut aussi vérifier : tonnage vs profondeur du chenal, disponibilité du poste, fenêtres de marée."},
    {q:"Comment signaler une situation dangereuse dans un chenal d'accès portuaire ?",opts:["Juste ralentir","[VTS], ici [nom navire]. Message urgent. J'ai [décrire la situation]. Ma position est [X]. Je demande assistance/instructions immédiates.","Appeler sur CH 16 uniquement","Manœuvrer en silence"],correct:1,expl:"Situation urgente en chenal SMCP : '[Station VTS], ici [nom du navire]. Message urgent.' Puis décrire : nature de l'urgence (panne de machine/gouvernail/collision/échouage), position dans le chenal, actions en cours, assistance requise. Pour danger de VIE : MAYDAY. Pour urgence sans danger de vie : PAN-PAN. Pour sécurité de navigation : SÉCURITÉ."},
    {q:"Que signifie 'free pratique' et comment est-elle demandée ?",opts:["Stationnement gratuit au port","Autorisation sanitaire officielle permettant au navire de communiquer librement avec la terre et au personnel de débarquer — demandée via pavillon Q ou VHF","Une attribution de poste gratuite","Une exemption de pilote"],correct:1,expl:"Libre pratique SMCP : '[Autorité sanitaire], ici [nom navire]. Demande libre pratique. Nous avons [X] personnes à bord. Pas de maladie à bord / [décrire toute maladie]. Dernier port d'escale : [port].' L'autorité sanitaire accorde : 'MV [nom], libre pratique accordée. Vous pouvez communiquer avec la rive.' Pavillon Q arboré jusqu'à l'obtention de la libre pratique."},
    {q:"Comment demander l'assistance d'un remorqueur en SMCP ?",opts:["Remorqueur, viens ici","I require tug assistance. Please send [X] tug(s). ETA berth [X] is [time] UTC. My LOA is [X] metres.","J'ai besoin d'un remorqueur","Remorqueur urgent"],correct:1,expl:"Demande de remorqueur SMCP : 'I require tug assistance. Please send [nombre] tug(s). My vessel LOA is [X] metres. Beam [X] metres. Deadweight [X] tonnes. ETA at berth [X] is [heure] UTC. I have [thruster/no thruster].' Durant l'opération : 'Tug [nom], make fast forward/aft. Push/pull on [port/starboard] side.'"},
    {q:"Quelle est la phrase SMCP en cas de panne de machine au port ?",opts:["Machine en panne !","I have an engine failure. I am unable to manoeuvre. I require tug assistance immediately.","Problème de machine","Les machines ne fonctionnent pas"],correct:1,expl:"Panne de machine au port SMCP : 'I have an engine failure. I am unable to manoeuvre. I require [tug assistance / anchor / immediate assistance].' Aussi : 'I am [drifting / at anchor / moored]. My position is [X].' Si dans un chenal : 'I am blocking the channel. Please divert traffic.' Si risque de collision : 'Risk of collision. All vessels stand clear.' Diffuser sur VHF 16 immédiatement."},
    {q:"Comment signaler la fin des opérations de cargaison ?",opts:["Cargaison terminée","Cargo operations are complete. All [hatches/tanks] are secured. Vessel is ready to depart when clearance is granted.","Chargement terminé","Cargaison OK"],correct:1,expl:"Fin des opérations de cargaison SMCP : 'Cargo operations are complete. All [hatches/tanks] are secured and sealed. [Bills of lading / cargo documents] are in order. We are ready to receive departure clearance.'"},
    {q:"Qu'est-ce qu'une 'berth note' dans les communications portuaires ?",opts:["Une note musicale","Confirmation écrite de l'autorité portuaire d'affectation de poste, incluant le numéro de poste, l'emplacement et l'heure de disponibilité","Une instruction d'amarrage","Un bulletin météo"],correct:1,expl:"Berth note (ordre de poste) = communication écrite de l'autorité portuaire/exploitant du terminal confirmant : numéro de poste, emplacement, heure disponible, restrictions éventuelles. SMCP : '[Autorité portuaire], veuillez confirmer l'affectation de poste pour [nom navire] arrivant [date/heure].' Réponse : 'MV [nom], votre poste est [numéro] au [terminal]. Le poste sera disponible à partir de [heure] UTC.'"},
    {q:"Comment communiquer avec un poste d'amarrage en SMCP ?",opts:["Crier vers eux","Mooring station [forward/aft], bridge here. [Heave in / ease out / make fast / let go] [forward lines / aft lines / spring lines].","Utiliser uniquement des signaux manuels","Pas nécessaire"],correct:1,expl:"SMCP passerelle-poste d'amarrage : 'Mooring station [avant/arrière], passerelle. [Instruction].' Instructions : 'Heave in' = amener le câble. 'Ease out / slack away' = filer le câble. 'Make fast' = sécuriser. 'Let go' = larguer. 'Stand by' = se tenir prêt. Lignes : 'forward lines' (amarres de tête), 'aft lines' (amarres d'arrière), 'spring lines' (gardes), 'breast lines' (traversières)."},
    {q:"Que signifie la conformité au 'Code ISPS' lors de l'entrée dans un port ?",opts:["Un exercice de sécurité","Code International pour la Sûreté des Navires et des Installations Portuaires — conformité au niveau de sûreté requis pour l'entrée — le navire doit déclarer son niveau de sûreté et ses 10 derniers ports","Un certificat de machine","Une règle de navigation"],correct:1,expl:"Code ISPS = Code International pour la Sûreté des Navires et des Installations Portuaires (SOLAS Chap. XI-2). Conformité entrée : être au niveau de sûreté approprié (1/2/3), soumettre Déclaration de Sûreté si requise, fournir liste des 10 derniers ports et leurs niveaux, confirmer absence d'incidents de sûreté. SMCP : '[Sûreté port], MV [nom]. Niveau de sûreté navire est [1/2/3]. Demande d'entrée en conformité avec le Code ISPS.'"},
    {q:"Comment gérer un 'refus d'entrée' du VTS ?",opts:["Forcer l'entrée","Accuser réception, rester au poste d'attente désigné, redemander quand les conditions le permettront ou sur instructions VTS","Redemander immédiatement","Aller dans un autre port"],correct:1,expl:"Gestion refus d'entrée VTS SMCP : 'Marseille VTS, MV [nom]. Bien reçu. Je resterai au [mouillage/position]. Je rappellerai à [heure] UTC ou lorsque les conditions changeront.' Maintenir la veille sur le canal de travail VTS, consigner le refus, aviser la compagnie/l'agent, recontacter le VTS quand autorisé."},
    {q:"Quelle est la phrase SMCP pour signaler un incendie à bord au mouillage ?",opts:["Au feu !","MAYDAY MAYDAY MAYDAY. This is [vessel name]. I have a fire on board. My position is berth [X], [port name]. I require fire brigade assistance immediately.","Feu sur le navire","J'ai besoin de pompiers"],correct:1,expl:"Incendie au poste SMCP : 'MAYDAY MAYDAY MAYDAY. This is [vessel name]. Fire on board. Position : berth [X], [nom du port]. Nature of fire : [salle des machines/cargaison/logements]. Fire is [under control / not under control]. [X] persons on board. Require fire brigade and medical assistance immediately.'"},
    {q:"Comment demander l'autorisation de départ au port ?",opts:["Je pars maintenant","[Port authority/VTS], this is [vessel name]. Request departure clearance. All crew on board. All cargo secured. Pilot boarded / not required. Ready to cast off.","Je quitte le port","C'est l'heure de partir"],correct:1,expl:"Autorisation de départ SMCP : '[VTS/Autorité portuaire], ici [nom navire]. Demande d'autorisation de départ. Heure de départ [heure] UTC. Pilote [nom] à bord / pilote non requis. Tout l'équipage comptabilisé. Cargaison sécurisée. Tirant d'eau avant [X] m, arrière [X] m. Direction : [destination].'"},
    {q:"Qu'est-ce qu'un 'single point mooring' (SPM) et comment est-il communiqué ?",opts:["Une seule amarre","Système de mouillage sur bouée offshore pour pétroliers — le navire s'amarre à une bouée et se connecte à un pipeline sous-marin pour le transfert de cargaison","Un type d'ancre","Un poste portuaire"],correct:1,expl:"Single Point Mooring (SPM) SMCP : '[Terminal SPM], ici [nom navire]. Demande d'instructions de mouillage pour SPM [nom/numéro]. Tirant d'eau actuel [X] mètres. Vent [X] degrés, [X] nœuds. État de la mer [calme/modéré/agité].' Utilisé par les VLCC et grands pétroliers aux terminaux offshore."},
    {q:"Comment signaler une urgence médicale au mouillage en attente d'entrée au port ?",opts:["Besoin d'un médecin","PAN-PAN PAN-PAN PAN-PAN. This is [vessel name]. Medical emergency on board. Position: anchorage [name]. Require medical assistance for [describe]. Patient condition: [describe].","Personne malade","Besoin de secours"],correct:1,expl:"Urgence médicale au mouillage SMCP : 'PAN-PAN PAN-PAN PAN-PAN. This is [vessel name]. Medical emergency on board. Position : anchorage [name], Latitude [X], Longitude [X]. One person with [description]. Require [doctor / medical evacuation / ambulance at berth]. Request priority entry or helicopter evacuation.' Le VTS/MRCC coordonnera : entrée prioritaire, pilote, ambulance ou hélicoptère."},
  ],
  es:[
    {q:"¿Qué es una 'Notice of Readiness' (NOR) en las comunicaciones portuarias?",opts:["Un aviso de ejercicio de seguridad","Declaración formal del capitán de que el buque ha llegado y está listo para cargar o descargar — activa la plancha","Un parte meteorológico","Una lista de tripulación"],correct:1,expl:"NOR SMCP: '[Nombre buque] has arrived at [puerto/fondeadero] and is in all respects ready to [load/discharge]. This Notice of Readiness is tendered at [hora] UTC on [fecha].' La NOR activa el inicio de la plancha. Crítica en las pólizas de fletamento. Debe entregarse por escrito y ser acusada de recibo por el fletador/cargador/agente."},
    {q:"¿Qué información necesita un operador VTS antes de conceder la entrada al puerto?",opts:["Solo el nombre del buque","Nombre del buque, posición, ETA, calado, tipo de carga, averías, necesidades de práctico, cumplimiento del reglamento portuario","Solo la posición","ETA y calado"],correct:1,expl:"Requisitos de entrada VTS: nombre e indicativo del buque, posición actual y ETA, calado (a proa y popa), tipo de carga (especialmente mercancías peligrosas), averías de navegación, necesidades de práctico/remolcador, cumplimiento PBIP, control del Estado del puerto si se requiere."},
    {q:"¿Cómo se informa de una situación peligrosa en un canal de acceso al puerto?",opts:["Solo reducir la velocidad","[VTS], aquí [nombre buque]. Mensaje urgente. Tengo [describir situación]. Mi posición es [X]. Necesito asistencia/instrucciones inmediatas.","Llamar solo en CH 16","Maniobrar en silencio"],correct:1,expl:"Situación urgente en canal SMCP: '[Estación VTS], aquí [nombre del buque]. Mensaje urgente.' Luego describir: naturaleza de la emergencia, posición en el canal, acciones en curso, asistencia requerida. Para peligro de VIDA: MAYDAY. Para urgencia sin peligro de vida: PAN-PAN. Para seguridad de la navegación: SÉCURITÉ."},
    {q:"¿Qué significa 'libre plática' y cómo se solicita?",opts:["Aparcamiento gratuito en el puerto","Autorización sanitaria oficial que permite al buque comunicarse libremente con tierra y al personal desembarcar — solicitada mediante bandera Q o VHF","Una asignación de muelle gratuita","Una exención de práctico"],correct:1,expl:"Libre plática SMCP: '[Autoridad sanitaria del puerto], aquí [nombre buque]. Solicito libre plática. Tenemos [X] personas a bordo. Sin enfermedad a bordo / [describir cualquier enfermedad]. Último puerto de escala: [puerto].' La autoridad sanitaria concede: 'MV [nombre], libre plática concedida.'"},
    {q:"¿Cómo se solicita la asistencia de un remolcador en SMCP?",opts:["¡Remolcador, ven aquí!","I require tug assistance. Please send [X] tug(s). ETA berth [X] is [time] UTC. My LOA is [X] metres.","Necesito un remolcador","Remolcador urgente"],correct:1,expl:"Solicitud de remolcador SMCP: 'I require tug assistance. Please send [número] tug(s). My vessel LOA is [X] metres. Beam [X] metres. Deadweight [X] tonnes. ETA at berth [X] is [hora] UTC.' Durante la operación: 'Tug [nombre], make fast forward/aft. Push/pull on [port/starboard] side.'"},
    {q:"¿Cuál es la frase SMCP en caso de avería de motor en el puerto?",opts:["¡Motor averiado!","I have an engine failure. I am unable to manoeuvre. I require tug assistance immediately.","Problema de motor","Los motores no funcionan"],correct:1,expl:"Avería de motor en puerto SMCP: 'I have an engine failure. I am unable to manoeuvre. I require [tug assistance / anchor / immediate assistance].' También: 'I am [drifting / at anchor / moored]. My position is [X].' Si en un canal: 'I am blocking the channel. Please divert traffic.' Difundir en VHF 16 inmediatamente."},
    {q:"¿Cómo se informa del fin de las operaciones de carga?",opts:["¡Carga terminada!","Cargo operations are complete. All [hatches/tanks] are secured. Vessel is ready to depart when clearance is granted.","Carga finalizada","Carga OK"],correct:1,expl:"Fin de operaciones de carga SMCP: 'Cargo operations are complete. All [hatches/tanks] are secured and sealed. [Bills of lading / cargo documents] are in order. We are ready to receive departure clearance.'"},
    {q:"¿Qué es una 'berth note' en las comunicaciones portuarias?",opts:["Una nota musical","Confirmación escrita de la autoridad portuaria de la asignación de muelle, incluyendo el número de muelle, ubicación y hora de disponibilidad","Una instrucción de amarre","Un parte meteorológico"],correct:1,expl:"Berth note (nota de atraque) = comunicación escrita confirmando: número de muelle, ubicación, hora disponible, restricciones eventuales. SMCP: '[Autoridad portuaria], confirme asignación de muelle para [nombre buque] que llega [fecha/hora].' Respuesta: 'MV [nombre], su muelle es [número] en [terminal]. Disponible desde [hora] UTC.'"},
    {q:"¿Cómo se comunica con un puesto de amarre en SMCP?",opts:["Gritarles","Mooring station [forward/aft], bridge here. [Heave in / ease out / make fast / let go] [forward lines / aft lines / spring lines].","Usar solo señales manuales","No es necesario"],correct:1,expl:"SMCP puente-puesto de amarre: 'Mooring station [proa/popa], puente. [Instrucción].' Instrucciones: 'Heave in' = cobrar el cabo. 'Ease out / slack away' = arriar el cabo. 'Make fast' = asegurar. 'Let go' = largar. 'Stand by' = estar listo. Cabos: 'forward lines' (espringues de proa), 'aft lines' (cabos de popa), 'spring lines' (espringues), 'breast lines' (traveses)."},
    {q:"¿Qué significa el cumplimiento del 'Código PBIP' al entrar en un puerto?",opts:["Un ejercicio de seguridad","Código Internacional de Protección de Buques e Instalaciones Portuarias — cumplimiento del nivel de protección requerido para la entrada — el buque debe declarar su nivel de protección y sus últimos 10 puertos","Un certificado de máquinas","Una regla de navegación"],correct:1,expl:"Código PBIP (ISPS) = Código Internacional de Protección de Buques e Instalaciones Portuarias. Cumplimiento entrada: estar en el nivel de protección apropiado (1/2/3), presentar Declaración de Protección si se requiere, facilitar lista de los últimos 10 puertos y sus niveles, confirmar ausencia de incidentes de seguridad."},
    {q:"¿Cómo se gestiona una 'denegación de entrada' del VTS?",opts:["Forzar la entrada","Acusar recibo, permanecer en la posición de espera designada, solicitar de nuevo cuando las condiciones lo permitan o según las instrucciones del VTS","Volver a solicitar inmediatamente","Ir a otro puerto"],correct:1,expl:"Gestión de denegación de entrada VTS SMCP: 'Marseille VTS, MV [nombre]. Entendido. Permaneceré en [fondeadero/posición]. Informaré de nuevo a las [hora] UTC o cuando cambien las condiciones.' Mantener la escucha en el canal de trabajo VTS, registrar la denegación, avisar a la empresa/agente."},
    {q:"¿Cuál es la frase SMCP para informar de un incendio a bordo en el muelle?",opts:["¡Fuego!","MAYDAY MAYDAY MAYDAY. This is [vessel name]. I have a fire on board. My position is berth [X], [port name]. I require fire brigade assistance immediately.","Fuego en el buque","Necesito bomberos"],correct:1,expl:"Incendio en el muelle SMCP: 'MAYDAY MAYDAY MAYDAY. This is [vessel name]. Fire on board. Position: berth [X], [nombre del puerto]. Nature of fire: [sala de máquinas/carga/alojamientos]. Fire is [under control / not under control]. [X] persons on board. Require fire brigade and medical assistance immediately.'"},
    {q:"¿Cómo se solicita la autorización de salida del puerto?",opts:["Me voy ahora","[Port authority/VTS], this is [vessel name]. Request departure clearance. All crew on board. All cargo secured. Pilot boarded / not required. Ready to cast off.","Saliendo del puerto","Es hora de irse"],correct:1,expl:"Autorización de salida SMCP: '[VTS/Autoridad portuaria], aquí [nombre buque]. Solicito autorización de salida. Hora de salida [hora] UTC. Práctico [nombre] a bordo / práctico no requerido. Toda la tripulación contabilizada. Carga asegurada. Calado a proa [X] m, a popa [X] m. Dirección: [destino].'"},
    {q:"¿Qué es un 'single point mooring' (SPM) y cómo se comunica?",opts:["Una sola amarra","Sistema de amarre a una boya offshore para petroleros — el buque se amarra a una boya y se conecta a un oleoducto submarino para la transferencia de carga","Un tipo de ancla","Un atraque portuario"],correct:1,expl:"SPM SMCP: '[Terminal SPM], aquí [nombre buque]. Solicito instrucciones de amarre para SPM [nombre/número]. Calado actual [X] metros. Viento [X] grados, [X] nudos. Estado de la mar [calma/moderada/fuerte].' Utilizado por VLCC y grandes petroleros en terminales offshore."},
    {q:"¿Cómo se informa de una urgencia médica en el fondeadero esperando entrada al puerto?",opts:["Necesito un médico","PAN-PAN PAN-PAN PAN-PAN. This is [vessel name]. Medical emergency on board. Position: anchorage [name]. Require medical assistance for [describe]. Patient condition: [describe].","Persona enferma","Necesito socorro"],correct:1,expl:"Urgencia médica en fondeadero SMCP: 'PAN-PAN PAN-PAN PAN-PAN. This is [vessel name]. Medical emergency on board. Position: anchorage [name], Latitude [X], Longitude [X]. One person with [descripción]. Require [doctor / medical evacuation / ambulance at berth]. Request priority entry or helicopter evacuation.' El VTS/MRCC coordinará entrada prioritaria, práctico, ambulancia o helicóptero."},
  ],
  pt:[
    {q:"O que é uma 'Notice of Readiness' (NOR) nas comunicações portuárias?",opts:["Um aviso de exercício de segurança","Declaração formal do capitão de que o navio chegou e está pronto para carregar ou descarregar — aciona a plancha","Um boletim meteorológico","Uma lista de tripulação"],correct:1,expl:"NOR SMCP: '[Nome navio] has arrived at [porto/fundeadouro] and is in all respects ready to [load/discharge]. This Notice of Readiness is tendered at [hora] UTC on [data].' A NOR aciona o início da plancha. Crítica nos contratos de fretamento. Deve ser entregue por escrito e acusada de receção pelo fretador/carregador/agente."},
    {q:"Que informação necessita um operador VTS antes de conceder a entrada no porto?",opts:["Apenas o nome do navio","Nome do navio, posição, ETA, calado, tipo de carga, avarias, necessidades de prático, conformidade com os regulamentos portuários","Apenas a posição","ETA e calado"],correct:1,expl:"Requisitos de entrada VTS: nome e indicativo do navio, posição atual e ETA, calado (à proa e à popa), tipo de carga (especialmente mercadorias perigosas), avarias de navegação, necessidades de prático/rebocador, conformidade ISPS, controlo do estado do porto se necessário."},
    {q:"Como se reporta uma situação perigosa num canal de acesso ao porto?",opts:["Apenas reduzir a velocidade","[VTS], aqui [nome navio]. Mensagem urgente. Tenho [descrever situação]. A minha posição é [X]. Preciso de assistência/instruções imediatas.","Chamar apenas no CH 16","Manobrar em silêncio"],correct:1,expl:"Situação urgente em canal SMCP: '[Estação VTS], aqui [nome do navio]. Mensagem urgente.' Depois descrever: natureza da emergência, posição no canal, ações em curso, assistência necessária. Para perigo de VIDA: MAYDAY. Para urgência sem perigo de vida: PAN-PAN. Para segurança de navegação: SÉCURITÉ."},
    {q:"O que significa 'livre prática' e como é solicitada?",opts:["Estacionamento gratuito no porto","Autorização sanitária oficial que permite ao navio comunicar livremente com terra e ao pessoal desembarcar — solicitada por bandeira Q ou VHF","Uma atribuição de cais gratuita","Uma isenção de prático"],correct:1,expl:"Livre prática SMCP: '[Autoridade de saúde do porto], aqui [nome navio]. Solicito livre prática. Temos [X] pessoas a bordo. Sem doença a bordo / [descrever qualquer doença]. Último porto de escala: [porto].' A autoridade sanitária concede: 'MV [nome], livre prática concedida.'"},
    {q:"Como se solicita assistência de rebocador em SMCP?",opts:["Rebocador, vem cá!","I require tug assistance. Please send [X] tug(s). ETA berth [X] is [time] UTC. My LOA is [X] metres.","Preciso de um rebocador","Rebocador urgente"],correct:1,expl:"Pedido de rebocador SMCP: 'I require tug assistance. Please send [número] tug(s). My vessel LOA is [X] metres. Beam [X] metres. Deadweight [X] tonnes. ETA at berth [X] is [hora] UTC.' Durante a operação: 'Tug [nome], make fast forward/aft. Push/pull on [port/starboard] side.'"},
    {q:"Qual é a frase SMCP em caso de avaria de motor no porto?",opts:["Motor avariado!","I have an engine failure. I am unable to manoeuvre. I require tug assistance immediately.","Problema de motor","Os motores não funcionam"],correct:1,expl:"Avaria de motor no porto SMCP: 'I have an engine failure. I am unable to manoeuvre. I require [tug assistance / anchor / immediate assistance].' Também: 'I am [drifting / at anchor / moored]. My position is [X].' Se num canal: 'I am blocking the channel. Please divert traffic.' Difundir no VHF 16 imediatamente."},
    {q:"Como se reporta o fim das operações de carga?",opts:["Carga concluída!","Cargo operations are complete. All [hatches/tanks] are secured. Vessel is ready to depart when clearance is granted.","Carregamento terminado","Carga OK"],correct:1,expl:"Fim das operações de carga SMCP: 'Cargo operations are complete. All [hatches/tanks] are secured and sealed. [Bills of lading / cargo documents] are in order. We are ready to receive departure clearance.'"},
    {q:"O que é uma 'berth note' nas comunicações portuárias?",opts:["Uma nota musical","Confirmação escrita da autoridade portuária da atribuição de cais, incluindo o número do cais, localização e hora de disponibilidade","Uma instrução de amarração","Um boletim meteorológico"],correct:1,expl:"Berth note (nota de atracação) = comunicação escrita confirmando: número do cais, localização, hora disponível, restrições eventuais. SMCP: '[Autoridade portuária], confirme atribuição de cais para [nome navio] a chegar [data/hora].' Resposta: 'MV [nome], o seu cais é [número] no [terminal]. Disponível a partir de [hora] UTC.'"},
    {q:"Como se comunica com um posto de amarração em SMCP?",opts:["Gritar para eles","Mooring station [forward/aft], bridge here. [Heave in / ease out / make fast / let go] [forward lines / aft lines / spring lines].","Usar apenas sinais manuais","Não é necessário"],correct:1,expl:"SMCP ponte-posto de amarração: 'Mooring station [proa/popa], ponte. [Instrução].' Instruções: 'Heave in' = cobrar o cabo. 'Ease out / slack away' = largar o cabo. 'Make fast' = fixar. 'Let go' = largar. 'Stand by' = estar pronto. Cabos: 'forward lines' (cabos de proa), 'aft lines' (cabos de popa), 'spring lines' (esprins), 'breast lines' (travessanhos)."},
    {q:"O que significa a conformidade com o 'Código ISPS' ao entrar num porto?",opts:["Um exercício de segurança","Código Internacional de Proteção dos Navios e das Instalações Portuárias — conformidade com o nível de proteção exigido para a entrada — o navio deve declarar o seu nível de proteção e os seus últimos 10 portos","Um certificado de máquinas","Uma regra de navegação"],correct:1,expl:"Código ISPS = Código Internacional de Proteção dos Navios e das Instalações Portuárias (SOLAS Cap. XI-2). Conformidade entrada: estar no nível de proteção adequado (1/2/3), apresentar Declaração de Proteção se necessário, fornecer lista dos últimos 10 portos e seus níveis, confirmar ausência de incidentes de segurança."},
    {q:"Como se gere uma 'negação de entrada' do VTS?",opts:["Forçar a entrada","Acusar receção, permanecer na posição de espera designada, re-solicitar quando as condições o permitirem ou conforme instruções VTS","Solicitar de novo imediatamente","Ir para outro porto"],correct:1,expl:"Gestão de negação de entrada VTS SMCP: 'Marseille VTS, MV [nome]. Compreendido. Permanecerei no [fundeadouro/posição]. Reportarei novamente às [hora] UTC ou quando as condições mudarem.' Manter escuta no canal de trabalho VTS, registar a negação, avisar a empresa/agente."},
    {q:"Qual é a frase SMCP para reportar um incêndio a bordo no cais?",opts:["Fogo!","MAYDAY MAYDAY MAYDAY. This is [vessel name]. I have a fire on board. My position is berth [X], [port name]. I require fire brigade assistance immediately.","Fogo no navio","Preciso de bombeiros"],correct:1,expl:"Incêndio no cais SMCP: 'MAYDAY MAYDAY MAYDAY. This is [vessel name]. Fire on board. Position: berth [X], [nome do porto]. Nature of fire: [sala de máquinas/carga/alojamentos]. Fire is [under control / not under control]. [X] persons on board. Require fire brigade and medical assistance immediately.'"},
    {q:"Como se solicita a autorização de partida do porto?",opts:["Estou a partir agora","[Port authority/VTS], this is [vessel name]. Request departure clearance. All crew on board. All cargo secured. Pilot boarded / not required. Ready to cast off.","A sair do porto","Está na hora de partir"],correct:1,expl:"Autorização de partida SMCP: '[VTS/Autoridade portuária], aqui [nome navio]. Solicito autorização de partida. Hora de partida [hora] UTC. Prático [nome] a bordo / prático não necessário. Toda a tripulação contabilizada. Carga assegurada. Calado à proa [X] m, à popa [X] m. Destino: [destino].'"},
    {q:"O que é um 'single point mooring' (SPM) e como é comunicado?",opts:["Uma única amarra","Sistema de amarração a boia offshore para petroleiros — o navio amarra a uma boia e liga-se a um oleoduto submarino para transferência de carga","Um tipo de âncora","Um cais portuário"],correct:1,expl:"SPM SMCP: '[Terminal SPM], aqui [nome navio]. Solicito instruções de amarração para SPM [nome/número]. Calado atual [X] metros. Vento [X] graus, [X] nós. Estado do mar [calmo/moderado/agitado].' Utilizado por VLCC e grandes petroleiros em terminais offshore."},
    {q:"Como se reporta uma urgência médica no fundeadouro à espera de entrada no porto?",opts:["Preciso de um médico","PAN-PAN PAN-PAN PAN-PAN. This is [vessel name]. Medical emergency on board. Position: anchorage [name]. Require medical assistance for [describe]. Patient condition: [describe].","Pessoa doente","Preciso de socorro"],correct:1,expl:"Urgência médica no fundeadouro SMCP: 'PAN-PAN PAN-PAN PAN-PAN. This is [vessel name]. Medical emergency on board. Position: anchorage [name], Latitude [X], Longitude [X]. One person with [descrição]. Require [doctor / medical evacuation / ambulance at berth]. Request priority entry or helicopter evacuation.' O VTS/MRCC coordenará entrada prioritária, prático, ambulância ou helicóptero."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.en;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else {setDone(true);if(onComplete)onComplete();}};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.vts},${C.port})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4,fontFamily:"'Courier New',monospace"}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.vts},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:10},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.3}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.vts}33,${C.port}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:`${C.vts}15`,border:`1px solid ${C.vts}44`,fontSize:14,color:C.vts,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.vts}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.vts,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.vts:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4,fontFamily:"'Courier New',monospace"}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white,fontFamily:"'Nunito',sans-serif"}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.vts},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    en:{
      badge:"🚢 Maritime English SMCP · Lesson 2/8 · ⭐ Premium · 200 XP",
      title:"Port & VTS Communications",
      intro:"Entering a port requires precise SMCP communication at every step: initial VTS contact, position reports, pilot boarding, berthing and mooring. A single unclear phrase can cause delays, grounding, or collision.",
      p1:"PART 1 — VTS PORT APPROACH",s1t:"CH 16 contact → working channel → arrival report",
      s1:"VTS APPROACH PROCEDURE:\n1. Call VTS on CH 16 (name×2, vessel×2, OVER)\n2. Switch to working channel as instructed\n3. Send ARRIVAL REPORT:\n   → Position + ETA entrance\n   → Draught forward & aft\n   → Cargo type / dangerous goods\n   → Pilot / tug requirements\n4. Receive entry clearance or instructions\n5. Stand by on VTS channel",
      p2:"PART 2 — PILOT BOARDING",s1t:"Pilot request · boarding side · ETA · I have the con",
      s2:"PILOT REQUEST FORMAT:\n'Pilot station, [vessel name]. Request pilot.\nETA boarding ground [time] UTC.\nDraught [X] forward, [X] aft.\nLOA [X] metres.'\n\nPILOT ON BOARD:\n'Good morning Captain. I have the con.'\n→ Pilot = technical advisor\n→ Captain = legally responsible",
      p3:"PART 3 — BERTHING & MOORING",s1t:"Approach · Make fast · Let go · All fast",
      s3:"KEY BERTHING PHRASES:\n\nApproach:\n'Proceeding to berth [X] on [port/starboard] side.'\n\nMooring:\n'Make fast [forward/aft lines].'\n'Heave in / Ease out [spring lines].'\n'Vessel is all fast.'\n'Gangway in position.'\n\nDeparture:\n'Let go [all lines].'\n'Stand by for departure.'",
      p4:"PART 4 — VTS PHRASE QUIZ",s1t:"5 practical VTS scenarios",
      s4:"REMEMBER:\n\n'Entry is approved' → proceed as instructed\n'Entry is not approved' → stand by, await\n'Anchor is dragging' → urgent VTS call\n'Vessel is all fast' → mooring complete\n'I have the con' → pilot controlling (but captain responsible)",
      p5:"🎯 EXERCISES",p6:"📝 QUESTION BANK — 15 QUESTIONS",
      sumT:"SUMMARY — PORT & VTS L2",
      sumP:["VTS call: [station]×2, [vessel]×2, Over (CH 16 → working channel)","Arrival report: position + ETA + draught + cargo + pilot/tug request","Pilot info: ETA, draught fwd/aft, LOA, boarding side","'I have the con' = pilot controls but CAPTAIN stays responsible","'Vessel is all fast' = mooring complete · 'Let go all lines' = cast off","'Entry approved' / 'Entry not approved at this time' — VTS decision","Notice of Readiness (NOR) = cargo readiness declaration triggers laytime","Free pratique = health clearance to communicate with shore"],
      learnedP:["VTS contact procedure: CH 16 → working channel → arrival report","Pilot boarding SMCP: ETA + draught + LOA + boarding side","Berthing phrases: make fast · heave in · ease out · all fast","Mooring commands: let go · spring lines · breast lines","Port authority communications: NOR · free pratique · departure clearance"],
    },
    fr:{
      badge:"🚢 Anglais Maritime SMCP · Leçon 2/8 · ⭐ Premium · 200 XP",
      title:"Communications Port & VTS",
      intro:"Entrer dans un port nécessite une communication SMCP précise à chaque étape : contact VTS initial, rapports de position, embarquement du pilote, accostage et amarrage. Une phrase mal formulée peut entraîner des retards, un échouage ou une collision.",
      p1:"PARTIE 1 — APPROCHE VTS",s1t:"CH 16 contact → canal de travail → rapport d'arrivée",
      s1:"PROCÉDURE APPROCHE VTS :\n1. Appel VTS sur CH 16 (nom×2, navire×2, Terminé)\n2. Basculer sur le canal de travail\n3. RAPPORT D'ARRIVÉE :\n   → Position + ETA entrée\n   → Tirant d'eau avant & arrière\n   → Type de cargaison / marchandises dangereuses\n   → Besoins en pilote / remorqueur\n4. Recevoir l'autorisation d'entrée\n5. Rester en écoute sur le canal VTS",
      p2:"PARTIE 2 — EMBARQUEMENT DU PILOTE",s1t:"Demande pilote · côté embarquement · ETA · I have the con",
      s2:"FORMAT DEMANDE PILOTE :\n'Pilot station, [nom navire]. Request pilot.\nETA boarding ground [heure] UTC.\nDraught [X] forward, [X] aft.\nLOA [X] metres.'\n\nPILOTE À BORD :\n'Good morning Captain. I have the con.'\n→ Pilote = conseiller technique\n→ Capitaine = légalement responsable",
      p3:"PARTIE 3 — ACCOSTAGE & AMARRAGE",s1t:"Approche · Make fast · Let go · All fast",
      s3:"PHRASES CLÉS AMARRAGE :\n\nApproche :\n'Proceeding to berth [X] on [port/starboard] side.'\n\nAmarrage :\n'Make fast [forward/aft lines].'\n'Heave in / Ease out [spring lines].'\n'Vessel is all fast.'\n'Gangway in position.'\n\nDépart :\n'Let go [all lines].'\n'Stand by for departure.'",
      p4:"PARTIE 4 — QUIZ PHRASES VTS",s1t:"5 scénarios VTS pratiques",
      s4:"À RETENIR :\n\n'Entry is approved' → procéder comme indiqué\n'Entry is not approved' → rester en attente\n'Anchor is dragging' → appel VTS urgent\n'Vessel is all fast' → amarrage complet\n'I have the con' → pilote contrôle (mais capitaine responsable)",
      p5:"🎯 EXERCICES",p6:"📝 BANQUE 15 QUESTIONS",
      sumT:"RÉSUMÉ — PORT & VTS L2",
      sumP:["Appel VTS : [station]×2, [navire]×2, Terminé (CH 16 → canal de travail)","Rapport d'arrivée : position + ETA + tirant d'eau + cargaison + demande pilote/remorqueur","Info pilote : ETA, tirant d'eau AV/AR, LOA, côté embarquement","'I have the con' = pilote contrôle mais le CAPITAINE reste responsable","'Vessel is all fast' = amarrage complet · 'Let go all lines' = larguer","'Entry approved' / 'Entry not approved at this time' — décision VTS","Notice of Readiness (NOR) = déclaration de disponibilité cargaison","Free pratique = autorisation sanitaire de communiquer avec la rive"],
      learnedP:["Procédure contact VTS : CH 16 → canal de travail → rapport d'arrivée","SMCP embarquement pilote : ETA + tirant d'eau + LOA + côté","Phrases amarrage : make fast · heave in · ease out · all fast","Ordres d'amarrage : let go · spring lines · breast lines","Communications autorité portuaire : NOR · libre pratique · autorisation départ"],
    },
    es:{
      badge:"🚢 Inglés Marítimo SMCP · Lección 2/8 · ⭐ Premium · 200 XP",
      title:"Comunicaciones Puerto y VTS",
      intro:"Entrar en un puerto requiere comunicaciones SMCP precisas en cada etapa: contacto VTS inicial, informes de posición, embarco del práctico, atraque y amarre.",
      p1:"PARTE 1 — APROXIMACIÓN VTS",s1t:"CH 16 contacto → canal trabajo → informe llegada",
      s1:"PROCEDIMIENTO APROXIMACIÓN VTS:\n1. Llamada VTS en CH 16 (nombre×2, buque×2, Cambio)\n2. Cambiar al canal de trabajo\n3. INFORME DE LLEGADA:\n   → Posición + ETA entrada\n   → Calado proa & popa\n   → Tipo carga / mercancías peligrosas\n   → Necesidades práctico / remolcador\n4. Recibir autorización de entrada\n5. Permanecer a la escucha en canal VTS",
      p2:"PARTE 2 — EMBARCO DEL PRÁCTICO",s1t:"Solicitud práctico · lado embarco · ETA · I have the con",
      s2:"FORMATO SOLICITUD PRÁCTICO:\n'Pilot station, [nombre buque]. Request pilot.\nETA boarding ground [hora] UTC.\nDraught [X] forward, [X] aft.\nLOA [X] metres.'\n\nPRÁCTICO A BORDO:\n'I have the con.'\n→ Práctico = asesor técnico\n→ Capitán = responsable legal",
      p3:"PARTE 3 — ATRAQUE Y AMARRE",s1t:"Aproximación · Make fast · Let go · All fast",
      s3:"FRASES CLAVE AMARRE:\n'Proceeding to berth [X] on [port/starboard] side.'\n'Make fast [forward/aft lines].'\n'Heave in / Ease out [spring lines].'\n'Vessel is all fast.'\n'Let go [all lines].'",
      p4:"PARTE 4 — QUIZ FRASES VTS",s1t:"5 escenarios VTS prácticos",
      s4:"RECORDAR:\n'Entry is approved' → proceder\n'Entry is not approved' → esperar\n'Anchor is dragging' → llamada VTS urgente\n'Vessel is all fast' → amarre completo\n'I have the con' → práctico controla (capitán responsable)",
      p5:"🎯 EJERCICIOS",p6:"📝 BANCO 15 PREGUNTAS",
      sumT:"RESUMEN — PUERTO Y VTS L2",
      sumP:["Llamada VTS: [estación]×2, [buque]×2, Cambio (CH 16 → canal trabajo)","Informe llegada: posición + ETA + calado + carga + solicitud práctico/remolcador","Info práctico: ETA, calado proa/popa, eslora, lado embarco","'I have the con' = práctico controla pero el CAPITÁN sigue siendo responsable","'Vessel is all fast' = amarre completo · 'Let go all lines' = largar","'Entry approved' / 'Entry not approved' — decisión VTS","Notice of Readiness (NOR) = declaración disponibilidad carga","Libre plática = autorización sanitaria para comunicar con tierra"],
      learnedP:["Procedimiento contacto VTS: CH 16 → canal trabajo → informe llegada","SMCP embarco práctico: ETA + calado + eslora + lado","Frases amarre: make fast · heave in · ease out · all fast","Órdenes amarre: let go · spring lines · breast lines","Comunicaciones autoridad portuaria: NOR · libre plática · autorización salida"],
    },
    pt:{
      badge:"🚢 Inglês Marítimo SMCP · Lição 2/8 · ⭐ Premium · 200 XP",
      title:"Comunicações Porto e VTS",
      intro:"Entrar num porto requer comunicações SMCP precisas em cada etapa: contacto VTS inicial, relatórios de posição, embarque do prático, atracação e amarração.",
      p1:"PARTE 1 — APROXIMAÇÃO VTS",s1t:"CH 16 contacto → canal trabalho → relatório chegada",
      s1:"PROCEDIMENTO APROXIMAÇÃO VTS:\n1. Chamada VTS no CH 16 (nome×2, navio×2, Mudança)\n2. Mudar para o canal de trabalho\n3. RELATÓRIO DE CHEGADA:\n   → Posição + ETA entrada\n   → Calado proa & popa\n   → Tipo carga / mercadorias perigosas\n   → Necessidades prático / rebocador\n4. Receber autorização de entrada\n5. Permanecer à escuta no canal VTS",
      p2:"PARTE 2 — EMBARQUE DO PRÁTICO",s1t:"Pedido prático · lado embarque · ETA · I have the con",
      s2:"FORMATO PEDIDO PRÁTICO:\n'Pilot station, [nome navio]. Request pilot.\nETA boarding ground [hora] UTC.\nDraught [X] forward, [X] aft.\nLOA [X] metres.'\n\nPRÁTICO A BORDO:\n'I have the con.'\n→ Prático = consultor técnico\n→ Capitão = responsável legal",
      p3:"PARTE 3 — ATRACAÇÃO E AMARRAÇÃO",s1t:"Aproximação · Make fast · Let go · All fast",
      s3:"FRASES CHAVE AMARRAÇÃO:\n'Proceeding to berth [X] on [port/starboard] side.'\n'Make fast [forward/aft lines].'\n'Heave in / Ease out [spring lines].'\n'Vessel is all fast.'\n'Let go [all lines].'",
      p4:"PARTE 4 — QUIZ FRASES VTS",s1t:"5 cenários VTS práticos",
      s4:"LEMBRAR:\n'Entry is approved' → proceder\n'Entry is not approved' → aguardar\n'Anchor is dragging' → chamada VTS urgente\n'Vessel is all fast' → amarração completa\n'I have the con' → prático controla (capitão responsável)",
      p5:"🎯 EXERCÍCIOS",p6:"📝 BANCO 15 QUESTÕES",
      sumT:"RESUMO — PORTO E VTS L2",
      sumP:["Chamada VTS: [estação]×2, [navio]×2, Mudança (CH 16 → canal trabalho)","Relatório chegada: posição + ETA + calado + carga + pedido prático/rebocador","Info prático: ETA, calado proa/popa, comprimento total, lado embarque","'I have the con' = prático controla mas o CAPITÃO continua responsável","'Vessel is all fast' = amarração completa · 'Let go all lines' = largar","'Entry approved' / 'Entry not approved' — decisão VTS","Notice of Readiness (NOR) = declaração disponibilidade carga","Livre prática = autorização sanitária para comunicar com terra"],
      learnedP:["Procedimento contacto VTS: CH 16 → canal trabalho → relatório chegada","SMCP embarque prático: ETA + calado + comprimento + lado","Frases amarração: make fast · heave in · ease out · all fast","Ordens amarração: let go · spring lines · breast lines","Comunicações autoridade portuária: NOR · livre prática · autorização partida"],
    },
  };
  return d[lang]||d.en;
};

export default function LessonSMCP_L2({ lang="en", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
  const t=T[lang]||T.en;const quiz=QUIZ[lang]||QUIZ.en;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#000810 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.vts}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.vts,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🚢 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/8":lang==="en"?"Lesson 2/8":lang==="es"?"Lección 2/8":"Lição 2/8"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.vts,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.vts},${C.port},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.vts}15`,border:`1px solid ${C.vts}44`,fontSize:11,color:C.vts,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.vts}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="📡" text={lc.p1} color={C.vts}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,background:"rgba(0,5,20,0.7)",border:`1px solid ${C.vts}22`}}>
              <div style={{fontSize:11,color:C.vts,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📡 {lang==="fr"?"SIMULATEUR APPROCHE VTS":lang==="en"?"VTS PORT APPROACH SIMULATOR":lang==="es"?"SIMULADOR APROXIMACIÓN VTS":"SIMULADOR APROXIMAÇÃO VTS"}</div>
              <VTSApproachSVG lang={lang}/>
            </Card>
            <SL icon="⚓" text={lc.p2} color={C.pilot}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.pilot}22`}}>
              <div style={{fontSize:11,color:C.pilot,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚓ {lang==="fr"?"SIMULATEUR EMBARQUEMENT PILOTE":lang==="en"?"PILOT BOARDING SIMULATOR":lang==="es"?"SIMULADOR EMBARCO PRÁCTICO":"SIMULADOR EMBARQUE PRÁTICO"}</div>
              <PilotBoardingSVG lang={lang}/>
            </Card>
            <SL icon="🔗" text={lc.p3} color={C.moor}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.moor}22`}}>
              <div style={{fontSize:11,color:C.moor,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔗 {lang==="fr"?"PHRASES ACCOSTAGE & AMARRAGE":lang==="en"?"BERTHING & MOORING PHRASES":lang==="es"?"FRASES ATRAQUE Y AMARRE":"FRASES ATRACAÇÃO & AMARRAÇÃO"}</div>
              <BerthingPhrasesSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p4} color={C.port}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.port}33`}}>
              <div style={{fontSize:11,color:C.port,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎯 {lang==="fr"?"QUIZ PHRASES VTS":lang==="en"?"VTS PHRASE QUIZ":lang==="es"?"QUIZ FRASES VTS":"QUIZ FRASES VTS"}</div>
              <VTSQuizSVG lang={lang}/>
            </Card>
            <SL icon="📝" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="📚" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>
            <Card style={{marginBottom:14,background:`${C.vts}08`,border:`1px solid ${C.vts}22`}}>
              <div style={{fontSize:11,color:C.vts,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.vts,fontWeight:700,fontFamily:"'Courier New',monospace"}}>✓</span>{pt}</div>)}
            </Card>
            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.vts},${C.port},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,boxShadow:`0 10px 36px ${C.vts}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Port & VTS SMCP</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 2":lang==="en"?"Lesson 2":lang==="es"?"Lección 2":"Lição 2"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.vts}15`,border:`1px solid ${C.vts}55`,fontSize:14,color:C.vts,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.vts,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.vts},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 8px 28px ${C.vts}33`,marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 — URGENCES SMCP →":lang==="en"?"LESSON 3 — SAFETY & EMERGENCY →":lang==="es"?"LECCIÓN 3 — SEGURIDAD Y URGENCIAS →":"LIÇÃO 3 — SEGURANÇA E URGÊNCIAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
