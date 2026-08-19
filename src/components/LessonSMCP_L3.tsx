// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  emer:"#ff2244", urgent:"#ff8800", safety:"#ffdd00",
};

const T = {
  fr:{ back:"◀ Retour", module:"Maritime English SMCP", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Maritime English SMCP", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Inglés Marítimo SMCP", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Inglês Marítimo SMCP", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — MAYDAY PROCEDURE SIMULATOR
// ══════════════════════════════════════
function MaydaySimulatorSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [showTr, setShowTr] = useState(false);

  const procedure = [
    { role:"OOW", color:C.emer, action:{fr:"Panne moteur · feu salle des machines · navire prend de la gîte",en:"Engine failure · engine room fire · vessel listing",es:"Avería motor · incendio sala de máquinas · buque escorando",pt:"Avaria motor · incêndio casa das máquinas · navio a adornar"},
      smcp:"[Selects CH 16, maximum power 25W, activates DSC ch.70 FIRST]",
      tr:{fr:"[Sélectionne CH 16, puissance max 25W, active DSC ch.70 EN PREMIER]",es:"[Selecciona CH 16, potencia máx 25W, activa DSC canal 70 PRIMERO]",pt:"[Seleciona CH 16, potência máx 25W, ativa ASN canal 70 PRIMEIRO]"},
      note:{fr:"AVANT LE MAYDAY VOCAL :\n1. Activer le bouton DÉTRESSE DSC (canal 70)\n→ Envoie automatiquement MMSI + GPS + type détresse\n→ Accusé de réception par MRCC sous 30-90 min\n\n2. PUIS émettre MAYDAY vocal sur CH 16 à 25W\n\nIMPORTANCE DSC :\nSi radio détruite après l'appel DSC\n→ MRCC a déjà la position et le MMSI\n→ Les secours peuvent être coordonnés",
            en:"BEFORE VOCAL MAYDAY:\n1. Activate DSC DISTRESS button (channel 70)\n→ Automatically sends MMSI + GPS + distress type\n→ MRCC acknowledgment in 30-90 min\n\n2. THEN send vocal MAYDAY on CH 16 at 25W\n\nDSC IMPORTANCE:\nIf radio destroyed after DSC call\n→ MRCC already has position and MMSI\n→ Rescue can be coordinated",
            es:"ANTES DEL MAYDAY VOCAL:\n1. Activar botón SOCORRO DSC (canal 70)\n→ Envía automáticamente MMSI + GPS + tipo emergencia\n→ Acuse de recibo del MRCC en 30-90 min\n\n2. LUEGO emitir MAYDAY vocal en CH 16 a 25W",
            pt:"ANTES DO MAYDAY VOCAL:\n1. Ativar botão SOCORRO ASN (canal 70)\n→ Envia automaticamente MMSI + GPS + tipo de perigo\n→ Acuse de receção do MRCC em 30-90 min\n\n2. DEPOIS emitir MAYDAY vocal no CH 16 a 25W"} },
    { role:"VESSEL", color:C.emer, action:{fr:"Émission MAYDAY",en:"MAYDAY transmission",es:"Transmisión MAYDAY",pt:"Transmissão MAYDAY"},
      smcp:"MAYDAY MAYDAY MAYDAY\nThis is MV ATLANTIC STAR, MV ATLANTIC STAR, MV ATLANTIC STAR.\nMAYDAY MV ATLANTIC STAR.\nMy position is Latitude 43 degrees 15 minutes North, Longitude 007 degrees 22 minutes East.\nI have a fire in the engine room. Fire is not under control.\nI have 24 persons on board.\nI require immediate assistance.\nOver.",
      tr:{fr:"MAYDAY MAYDAY MAYDAY\nIci MV ATLANTIC STAR, MV ATLANTIC STAR, MV ATLANTIC STAR.\nMAYDAY MV ATLANTIC STAR.\nMa position est Latitude 43 degrés 15 minutes Nord, Longitude 007 degrés 22 minutes Est.\nJ'ai un incendie en salle des machines. L'incendie n'est pas maîtrisé.\nJ'ai 24 personnes à bord.\nJe demande assistance immédiate.\nTerminé.",
      es:"MAYDAY MAYDAY MAYDAY\nAquí MV ATLANTIC STAR, MV ATLANTIC STAR, MV ATLANTIC STAR.\nMAYDAY MV ATLANTIC STAR.\nMi posición es Latitud 43 grados 15 minutos Norte, Longitud 007 grados 22 minutos Este.\nTengo un incendio en la sala de máquinas. El incendio no está controlado.\nTengo 24 personas a bordo.\nSolicito asistencia inmediata.\nCambio.",
      pt:"MAYDAY MAYDAY MAYDAY\nAqui MV ATLANTIC STAR, MV ATLANTIC STAR, MV ATLANTIC STAR.\nMAYDAY MV ATLANTIC STAR.\nA minha posição é Latitude 43 graus 15 minutos Norte, Longitude 007 graus 22 minutos Este.\nTenho um incêndio na casa das máquinas. O incêndio não está controlado.\nTenho 24 pessoas a bordo.\nSolicito assistência imediata.\nCâmbio."},
      note:{fr:"STRUCTURE MAYDAY (6 éléments) :\n1. MAYDAY × 3\n2. NOM DU NAVIRE × 3\n3. MAYDAY + NOM DU NAVIRE\n4. POSITION (Lat/Long en degrés et minutes)\n5. NATURE DE LA DÉTRESSE\n6. NOMBRE DE PERSONNES + ASSISTANCE + OVER\n\nMNÉMOTECHNIQUE :\nM = Mayday (3 fois)\nN = Nom du navire (3 fois)\nP = Position\nD = Détresse (nature)\nP = Personnes à bord\nA = Assistance requise",
            en:"MAYDAY STRUCTURE (6 elements):\n1. MAYDAY × 3\n2. VESSEL NAME × 3\n3. MAYDAY + VESSEL NAME\n4. POSITION (Lat/Long in degrees and minutes)\n5. NATURE OF DISTRESS\n6. NUMBER OF PERSONS + ASSISTANCE + OVER\n\nMNEMONIC:\nM = Mayday (3 times)\nN = Name of vessel (3 times)\nP = Position\nD = Distress (nature)\nP = Persons on board\nA = Assistance required",
            es:"ESTRUCTURA MAYDAY (6 elementos):\n1. MAYDAY × 3\n2. NOMBRE DEL BUQUE × 3\n3. MAYDAY + NOMBRE DEL BUQUE\n4. POSICIÓN (Lat/Long en grados y minutos)\n5. NATURALEZA DE LA EMERGENCIA\n6. Nº DE PERSONAS + ASISTENCIA + CAMBIO",
            pt:"ESTRUTURA MAYDAY (6 elementos):\n1. MAYDAY × 3\n2. NOME DO NAVIO × 3\n3. MAYDAY + NOME DO NAVIO\n4. POSIÇÃO (Lat/Long em graus e minutos)\n5. NATUREZA DO PERIGO\n6. Nº DE PESSOAS + ASSISTÊNCIA + MUDANÇA"} },
    { role:"MRCC", color:C.orange, action:{fr:"Réponse MRCC",en:"MRCC response",es:"Respuesta MRCC",pt:"Resposta MRCC"},
      smcp:"MV ATLANTIC STAR, MV ATLANTIC STAR, MV ATLANTIC STAR.\nThis is CROSS MED, CROSS MED, CROSS MED.\nReceived MAYDAY.\nYour position is confirmed.\nAll vessels in the vicinity — this is CROSS MED on channel 16.\nSilence MAYDAY.\nMV ATLANTIC STAR, assistance is being arranged. ETA of rescue units 35 minutes.\nPlease report: How many persons require medical assistance?\nOver.",
      tr:{fr:"MV ATLANTIC STAR, MV ATLANTIC STAR, MV ATLANTIC STAR.\nIci CROSS MED, CROSS MED, CROSS MED.\nMAYDAY reçu.\nVotre position est confirmée.\nTous navires à proximité — ici CROSS MED sur canal 16.\nSilence MAYDAY.\nMV ATLANTIC STAR, les secours sont en cours d'organisation. ETA unités de sauvetage 35 minutes.\nVeuillez préciser : combien de personnes ont besoin d'assistance médicale ?\nTerminé.",
      es:"MV ATLANTIC STAR, MV ATLANTIC STAR, MV ATLANTIC STAR.\nAquí CROSS MED, CROSS MED, CROSS MED.\nMAYDAY recibido.\nSu posición está confirmada.\nTodos los buques en las proximidades — aquí CROSS MED en el canal 16.\nSilencio MAYDAY.\nMV ATLANTIC STAR, los socorros se están organizando. ETA de las unidades de rescate 35 minutos.\nPor favor precise: ¿cuántas personas necesitan asistencia médica?\nCambio.",
      pt:"MV ATLANTIC STAR, MV ATLANTIC STAR, MV ATLANTIC STAR.\nAqui CROSS MED, CROSS MED, CROSS MED.\nMAYDAY recebido.\nA sua posição está confirmada.\nTodos os navios nas proximidades — aqui CROSS MED no canal 16.\nSilêncio MAYDAY.\nMV ATLANTIC STAR, os socorros estão a ser organizados. ETA das unidades de resgate 35 minutos.\nPor favor especifique: quantas pessoas necessitam de assistência médica?\nCâmbio."},
      note:{fr:"RÉPONSE MRCC :\n→ Confirme réception du MAYDAY\n→ Imposer SILENCE MAYDAY à toutes stations\n→ Donne ETA des secours\n→ Demande informations supplémentaires\n\nSILENCE MAYDAY :\nTous les navires DOIVENT cesser d'émettre\nsauf pour la détresse en cours\n\nLE MRCC COORDONNE :\n→ Hélicoptères SAR\n→ Vedettes SNSM/Gardes-côtes\n→ Navires à proximité\n→ Services médicaux",
            en:"MRCC RESPONSE:\n→ Confirms MAYDAY receipt\n→ Imposes SILENCE MAYDAY on all stations\n→ Gives ETA of rescuers\n→ Requests additional information\n\nSILENCE MAYDAY:\nAll vessels MUST stop transmitting\nexcept for the ongoing distress\n\nMRCC COORDINATES:\n→ SAR helicopters\n→ Lifeboats/Coastguard\n→ Nearby vessels\n→ Medical services",
            es:"RESPUESTA MRCC:\n→ Confirma recepción del MAYDAY\n→ Impone SILENCE MAYDAY a todas las estaciones\n→ Da ETA de los socorros\n→ Solicita información adicional\n\nSILENCIO MAYDAY:\nTodos los buques DEBEN dejar de emitir\nexcepto para la emergencia en curso",
            pt:"RESPOSTA MRCC:\n→ Confirma receção do MAYDAY\n→ Impõe SILENCE MAYDAY a todas as estações\n→ Dá ETA dos socorros\n→ Solicita informações adicionais\n\nSILÊNCIO MAYDAY:\nTodos os navios DEVEM parar de emitir\nexceto para o perigo em curso"} },
    { role:"VESSEL", color:C.emer, action:{fr:"Rapport de situation",en:"Situation report",es:"Informe de situación",pt:"Relatório de situação"},
      smcp:"CROSS MED, this is MV ATLANTIC STAR.\nUpdate on situation:\nFire is spreading to accommodation. We are preparing to abandon ship.\n3 persons are injured, one seriously.\nWe have activated our EPIRB. SART is activated.\nAll persons are mustered at lifeboat stations.\nOver.",
      tr:{fr:"CROSS MED, ici MV ATLANTIC STAR.\nMise à jour de la situation :\nL'incendie se propage aux logements. Nous préparons l'abandon du navire.\n3 personnes sont blessées, dont une grièvement.\nNous avons activé notre EPIRB. Le SART est activé.\nTout le personnel est au poste d'abandon.\nTerminé.",
      es:"CROSS MED, aquí MV ATLANTIC STAR.\nActualización de la situación:\nEl incendio se está propagando a los alojamientos. Nos preparamos para abandonar el buque.\n3 personas están heridas, una de ellas grave.\nHemos activado nuestra EPIRB. El SART está activado.\nTodo el personal está en el puesto de abandono.\nCambio.",
      pt:"CROSS MED, aqui MV ATLANTIC STAR.\nAtualização da situação:\nO incêndio está a alastrar-se aos alojamentos. Estamos a preparar o abandono do navio.\n3 pessoas estão feridas, uma delas grave.\nAtivámos a nossa EPIRB. O SART está ativado.\nTodo o pessoal está no posto de abandono.\nCâmbio."},
      note:{fr:"RAPPORTS DE SITUATION (SITREP) :\n→ Toujours mettre à jour le MRCC\n→ Évolution de la situation\n→ Actions déjà entreprises\n→ État des blessés\n→ Équipements de sauvetage activés\n\nPHRASES CLÉS :\n'Fire is spreading to [location]'\n'We are preparing to abandon ship'\n'[X] persons are injured'\n'EPIRB / SART is activated'\n'All persons are mustered at [station]'",
            en:"SITUATION REPORTS (SITREP):\n→ Always update the MRCC\n→ Evolution of the situation\n→ Actions already taken\n→ Casualty status\n→ Survival equipment activated\n\nKEY PHRASES:\n'Fire is spreading to [location]'\n'We are preparing to abandon ship'\n'[X] persons are injured'\n'EPIRB / SART is activated'\n'All persons are mustered at [station]'",
            es:"INFORMES DE SITUACIÓN (SITREP):\n→ Siempre actualizar al MRCC\n→ Evolución de la situación\n→ Acciones ya tomadas\n→ Estado de los heridos\n→ Equipos de supervivencia activados",
            pt:"RELATÓRIOS DE SITUAÇÃO (SITREP):\n→ Sempre atualizar o MRCC\n→ Evolução da situação\n→ Ações já tomadas\n→ Estado dos feridos\n→ Equipamentos de sobrevivência ativados"} },
    { role:"MRCC", color:C.orange, action:{fr:"Coordination SAR",en:"SAR coordination",es:"Coordinación SAR",pt:"Coordenação SAR"},
      smcp:"MV ATLANTIC STAR, this is CROSS MED.\nHelicopter RESCUE 17 is en route. ETA your position 28 minutes.\nLifeboat SNSM 062 is underway. ETA 40 minutes.\nMV CORONA passing 8 miles south-west is proceeding to your assistance. ETA 22 minutes.\nDo NOT abandon ship until you have visual contact with rescue units unless situation becomes critical.\nOver.",
      tr:{fr:"MV ATLANTIC STAR, ici CROSS MED.\nL'hélicoptère SECOURS 17 est en route. ETA votre position 28 minutes.\nLa vedette SNSM 062 est en route. ETA 40 minutes.\nMV CORONA passant à 8 milles au sud-ouest fait route vers vous. ETA 22 minutes.\nNE PAS abandonner le navire tant que vous n'avez pas de contact visuel avec les unités de sauvetage sauf si la situation devient critique.\nTerminé.",
      es:"MV ATLANTIC STAR, aquí CROSS MED.\nEl helicóptero RESCATE 17 está en camino. ETA a su posición 28 minutos.\nLa lancha SNSM 062 está en camino. ETA 40 minutos.\nMV CORONA, pasando a 8 millas al suroeste, se dirige hacia usted. ETA 22 minutos.\nNO abandone el buque hasta tener contacto visual con las unidades de rescate, salvo que la situación se vuelva crítica.\nCambio.",
      pt:"MV ATLANTIC STAR, aqui CROSS MED.\nO helicóptero SOCORRO 17 está a caminho. ETA à sua posição 28 minutos.\nA lancha SNSM 062 está a caminho. ETA 40 minutos.\nMV CORONA, passando a 8 milhas a sudoeste, segue em direção a si. ETA 22 minutos.\nNÃO abandone o navio até ter contacto visual com as unidades de resgate, exceto se a situação se tornar crítica.\nCâmbio."},
      note:{fr:"COORDINATION SAR MRCC :\n→ Nomme les unités SAR et leur ETA\n→ Donne les instructions d'attente\n→ 'Do NOT abandon ship until...' = principe de sécurité\n\nNAVIRE EN DERNIER RESSORT :\nAttendre les secours À BORD est souvent plus sûr\nque l'abandon prématuré en canot\n\nCOMMANDE DU NAVIRE COORDINATEUR (OSC) :\nSi MRCC désigne un navire comme OSC :\n'MV CORONA, you are designated OSC'\n→ Ce navire coordonne les opérations sur place",
            en:"MRCC SAR COORDINATION:\n→ Names SAR units and their ETA\n→ Gives holding instructions\n→ 'Do NOT abandon ship until...' = safety principle\n\nSHIP OF LAST RESORT:\nAwaiting rescue ON BOARD is often safer\nthan premature abandonment in a raft\n\nON-SCENE COORDINATOR (OSC):\nIf MRCC designates a vessel as OSC:\n'MV CORONA, you are designated OSC'\n→ That vessel coordinates on-scene operations",
            es:"COORDINACIÓN SAR MRCC:\n→ Nombra las unidades SAR y su ETA\n→ Da instrucciones de espera\n→ 'Do NOT abandon ship until...' = principio de seguridad\n\nNAVIO DE ÚLTIMO RECURSO:\nEsperar el rescate A BORDO es a menudo más seguro",
            pt:"COORDENAÇÃO SAR MRCC:\n→ Nomeia as unidades SAR e a sua ETA\n→ Dá instruções de espera\n→ 'Do NOT abandon ship until...' = princípio de segurança\n\nNAVIO DE ÚLTIMO RECURSO:\nAguardar o socorro A BORDO é frequentemente mais seguro"} },
  ];

  const p = procedure[step];
  const isVessel = p.role === "VESSEL";
  const isMRCC = p.role === "MRCC";

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {procedure.map((_,i)=>(
          <div key={i} onClick={()=>setStep(i)} style={{
            flex:1,height:4,borderRadius:4,cursor:"pointer",
            background:i<=step?(i===step?C.emer:`${C.emer}66`):"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div style={{fontSize:9,color:C.emer,letterSpacing:2,textAlign:"center",marginBottom:8,fontFamily:"'Cinzel',serif"}}>
        🆘 MAYDAY PROCEDURE — {step+1}/{procedure.length}
      </div>
      {/* Action indicator */}
      <div style={{padding:"6px 10px",borderRadius:8,marginBottom:8,background:"rgba(255,34,68,0.1)",border:`1px solid ${C.emer}33`,fontSize:9,color:C.emer,fontFamily:"monospace"}}>
        ⚡ {p.action[lang]||p.action.en}
      </div>
      <div style={{padding:"12px",borderRadius:14,marginBottom:10,
        background:isVessel?"rgba(255,34,68,0.08)":isMRCC?"rgba(255,136,0,0.08)":"rgba(0,0,0,0.4)",
        border:`2px solid ${isVessel?C.emer:isMRCC?C.orange:"rgba(255,255,255,0.1)"}55`,animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
          <div style={{fontSize:9,fontWeight:700,color:isVessel?C.emer:isMRCC?C.orange:C.muted,letterSpacing:1}}>
            {isVessel?"🚢 VESSEL":"isMRCC"?isMRCC?"🛟 MRCC":"📋 OOW":p.role==="OOW"?"📋 OOW":"🛟 MRCC"}
          </div>
        </div>
        {step===0?(
          <div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:C.gold2,lineHeight:1.6}}>{p.smcp}</div>
        ):(
          <>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,marginBottom:8,fontWeight:600,whiteSpace:"pre-line"}}>{p.smcp}</div>
            {lang!=="en"&&<button onClick={()=>setShowTr(!showTr)} style={{fontSize:9,padding:"3px 8px",borderRadius:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer"}}>
              {showTr?"▲":"▼"} {lang==="fr"?"Traduction":lang==="es"?"Traducción":"Tradução"}
            </button>}
            {lang!=="en"&&showTr&&<div style={{fontSize:10,color:C.muted,marginTop:6,fontStyle:"italic",whiteSpace:"pre-line"}}>{p.tr[lang]||p.tr.fr}</div>}
          </>
        )}
      </div>
      <div style={{padding:"10px 12px",borderRadius:12,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.06)",marginBottom:10,fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
        {p.note[lang]||p.note.en}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":lang==="es"?"Anterior":"Anterior"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(procedure.length-1,s+1))} disabled={step===procedure.length-1}
          style={{flex:1,padding:"9px",borderRadius:10,background:step===procedure.length-1?"rgba(255,255,255,0.05)":`${C.emer}22`,border:`1px solid ${step===procedure.length-1?"rgba(255,255,255,0.08)":C.emer}`,color:C.white,cursor:step===procedure.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":lang==="es"?"Siguiente":"Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — EMERGENCY PHRASE CARDS
// ══════════════════════════════════════
function EmergencyPhrasesSVG({ lang }) {
  const [cat, setCat] = useState("fire");
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const categories = {
    fire:{ label:{fr:"Incendie",en:"Fire",es:"Incendio",pt:"Incêndio"}, icon:"🔥", color:C.emer, cards:[
      { q:"How do you report a fire on board?", a:"I have a fire on board in the [engine room / accommodation / cargo hold]. Fire is [under control / not under control].", tr:{fr:"J'ai un incendie à bord dans [la salle des machines / les logements / la cale]. L'incendie est [maîtrisé / non maîtrisé].",es:"Tengo un incendio a bordo en [la sala de máquinas / los alojamientos / la bodega]. El incendio está [controlado / no controlado].",pt:"Tenho um incêndio a bordo em [a casa das máquinas / os alojamentos / o porão]. O incêndio está [controlado / não controlado]."} },
      { q:"How do you report fire spreading?", a:"The fire is spreading to [location]. I am unable to control the fire. I am preparing to abandon ship.", tr:{fr:"L'incendie se propage à [emplacement]. Je ne peux pas maîtriser l'incendie. Je prépare l'abandon du navire.",es:"El incendio se está propagando a [ubicación]. No puedo controlar el incendio. Me preparo para abandonar el buque.",pt:"O incêndio está a alastrar-se a [local]. Não consigo controlar o incêndio. Estou a preparar o abandono do navio."} },
      { q:"How do you report CO2 release in engine room?", a:"CO2 has been released in the engine room. Engine room is sealed. Engines are stopped.", tr:{fr:"Le CO2 a été libéré dans la salle des machines. La salle des machines est étanche. Les machines sont arrêtées.",es:"Se ha liberado CO2 en la sala de máquinas. La sala de máquinas está sellada. Las máquinas están paradas.",pt:"O CO2 foi libertado na casa das máquinas. A casa das máquinas está vedada. As máquinas estão paradas."} },
      { q:"How do you request fire-fighting assistance?", a:"I require immediate fire-fighting assistance. Please send fire brigade to berth [X] / my position.", tr:{fr:"J'ai besoin d'une assistance immédiate de lutte contre l'incendie. Veuillez envoyer les pompiers au poste [X] / à ma position.",es:"Necesito asistencia inmediata contra incendios. Por favor envíen a los bomberos al atraque [X] / a mi posición.",pt:"Preciso de assistência imediata de combate a incêndio. Por favor enviem os bombeiros para o cais [X] / à minha posição."} },
    ]},
    collision:{ label:{fr:"Collision",en:"Collision",es:"Colisión",pt:"Colisão"}, icon:"💥", color:C.orange, cards:[
      { q:"How do you report a collision?", a:"I have been in collision with [vessel name / unknown vessel] at [time] UTC. Position [lat/long]. Extent of damage is [describe].", tr:{fr:"Je suis entré en collision avec [nom du navire / navire inconnu] à [heure] UTC. Position [lat/long]. L'étendue des dommages est [décrire].",es:"He colisionado con [nombre del buque / buque desconocido] a las [hora] UTC. Posición [lat/long]. El alcance de los daños es [describir].",pt:"Colidi com [nome do navio / navio desconhecido] às [hora] UTC. Posição [lat/long]. A extensão dos danos é [descrever]."} },
      { q:"How do you report taking on water after collision?", a:"I am taking on water. Rate of flooding is [severe / moderate / slow]. I am [able to / unable to] control the flooding.", tr:{fr:"Je prends de l'eau. Le taux de remplissage est [grave / modéré / lent]. Je [peux / ne peux pas] contrôler l'envahissement.",es:"Estoy embarcando agua. El ritmo de inundación es [grave / moderado / lento]. [Puedo / no puedo] controlar la inundación.",pt:"Estou a embarcar água. O ritmo de alagamento é [grave / moderado / lento]. [Consigo / não consigo] controlar o alagamento."} },
      { q:"How do you report hull damage?", a:"I have hull damage on the [port / starboard] side. Damage is [above / below] the waterline. [X] metres long, [X] metres wide.", tr:{fr:"J'ai des dommages à la coque sur [bâbord / tribord]. Les dommages sont [au-dessus / en dessous] de la ligne de flottaison.",es:"Tengo daños en el casco por [babor / estribor]. Los daños están [por encima / por debajo] de la línea de flotación.",pt:"Tenho danos no casco a [bombordo / estibordo]. Os danos estão [acima / abaixo] da linha de água."} },
      { q:"How do you report loss of buoyancy?", a:"I am losing buoyancy. I have [X] degrees of list to [port / starboard]. I may capsize.", tr:{fr:"Je perds de la flottabilité. J'ai [X] degrés de gîte sur [bâbord / tribord]. Je risque de chavirer.",es:"Estoy perdiendo flotabilidad. Tengo [X] grados de escora a [babor / estribor]. Podría zozobrar.",pt:"Estou a perder flutuabilidade. Tenho [X] graus de adornamento a [bombordo / estibordo]. Posso soçobrar."} },
    ]},
    mob:{ label:{fr:"Homme à la mer",en:"Man Overboard",es:"Hombre al agua",pt:"Homem ao mar"}, icon:"🆘", color:C.blue2, cards:[
      { q:"How do you report a man overboard?", a:"Man overboard! [Port / Starboard / Forward / Aft] side. Time [UTC]. Position [lat/long].", tr:{fr:"Homme à la mer ! Côté [bâbord / tribord / avant / arrière]. Heure [UTC]. Position [lat/long].",es:"¡Hombre al agua! Lado [babor / estribor / proa / popa]. Hora [UTC]. Posición [lat/long].",pt:"Homem ao mar! Lado [bombordo / estibordo / vante / ré]. Hora [UTC]. Posição [lat/long]."} },
      { q:"What do you broadcast after MOB report?", a:"PAN-PAN PAN-PAN PAN-PAN. All stations. MV [name]. Man overboard at [position]. I am manoeuvring to recover. All vessels in vicinity please assist and keep clear.", tr:{fr:"PAN-PAN PAN-PAN PAN-PAN. Toutes stations. MV [nom]. Homme à la mer en [position]. Je manœuvre pour récupérer. Tous navires à proximité, assistez et gardez vos distances.",es:"PAN-PAN PAN-PAN PAN-PAN. Todas las estaciones. MV [nombre]. Hombre al agua en [posición]. Estoy maniobrando para recuperarlo. Todos los buques cercanos, por favor asistan y mantengan las distancias.",pt:"PAN-PAN PAN-PAN PAN-PAN. Todas as estações. MV [nome]. Homem ao mar em [posição]. Estou a manobrar para o recuperar. Todos os navios nas proximidades, por favor assistam e mantenham distância."} },
      { q:"How do you report recovery of MOB?", a:"MV [name]. Man overboard is recovered. Person is [conscious / unconscious]. I require [medical assistance / no further assistance]. Cancel PAN-PAN.", tr:{fr:"MV [nom]. L'homme à la mer est récupéré. La personne est [consciente / inconsciente]. J'ai besoin [d'assistance médicale / d'aucune autre assistance]. Annulez le PAN-PAN.",es:"MV [nombre]. El hombre al agua ha sido recuperado. La persona está [consciente / inconsciente]. Necesito [asistencia médica / ninguna otra asistencia]. Cancelen el PAN-PAN.",pt:"MV [nome]. O homem ao mar foi recuperado. A pessoa está [consciente / inconsciente]. Preciso de [assistência médica / nenhuma outra assistência]. Cancelem o PAN-PAN."} },
      { q:"How do you describe MOB for helicopter search?", a:"Person in water wearing [life jacket / survival suit / no lifejacket]. [Hair color, clothing description if known]. Last seen at [position] at [time] UTC.", tr:{fr:"Personne à l'eau portant [gilet de sauvetage / combinaison de survie / sans gilet]. [Couleur des cheveux, description des vêtements si connue]. Dernière vue en [position] à [heure] UTC.",es:"Persona en el agua con [chaleco salvavidas / traje de supervivencia / sin chaleco]. [Color de pelo, descripción de la ropa si se conoce]. Vista por última vez en [posición] a las [hora] UTC.",pt:"Pessoa na água usando [colete salva-vidas / fato de sobrevivência / sem colete]. [Cor do cabelo, descrição da roupa se conhecida]. Vista pela última vez em [posição] às [hora] UTC."} },
    ]},
    grounding:{ label:{fr:"Échouage",en:"Grounding",es:"Varada",pt:"Encalhe"}, icon:"🏔️", color:C.purple, cards:[
      { q:"How do you report a grounding?", a:"I have grounded at [position]. Time [UTC]. I am [able to / unable to] refloat. I require [tug / salvage / pumping] assistance.", tr:{fr:"J'ai échoué en [position]. Heure [UTC]. Je [peux / ne peux pas] me renflouer. J'ai besoin d'assistance [de remorqueur / de sauvetage / de pompage].",es:"He encallado en [posición]. Hora [UTC]. [Puedo / no puedo] reflotarme. Necesito asistencia [de remolcador / de salvamento / de bombeo].",pt:"Encalhei em [posição]. Hora [UTC]. [Consigo / não consigo] desencalhar. Preciso de assistência [de rebocador / de salvamento / de bombagem]."} },
      { q:"How do you report hull damage from grounding?", a:"I have hull damage from grounding. [X] tanks are flooded. Vessel has [X] degrees list. Engine room is [flooded / dry].", tr:{fr:"J'ai des dommages à la coque dus à l'échouage. [X] citernes sont envahies. Le navire a [X] degrés de gîte. La salle des machines est [envahie / sèche].",es:"Tengo daños en el casco debidos al varamiento. [X] tanques están inundados. El buque tiene [X] grados de escora. La sala de máquinas está [inundada / seca].",pt:"Tenho danos no casco devido ao encalhe. [X] tanques estão alagados. O navio tem [X] graus de adornamento. A casa das máquinas está [alagada / seca]."} },
      { q:"How do you request salvage assistance?", a:"I require salvage assistance. I am hard aground in position [lat/long]. Water depth alongside is [X] metres. Nature of bottom is [rock/sand/mud].", tr:{fr:"J'ai besoin d'assistance de sauvetage. J'ai échoué solidement en position [lat/long]. La profondeur d'eau le long du bord est [X] mètres. La nature du fond est [rochers/sable/vase].",es:"Necesito asistencia de salvamento. Estoy firmemente encallado en posición [lat/long]. La profundidad del agua junto al costado es de [X] metros. La naturaleza del fondo es [rocas/arena/fango].",pt:"Preciso de assistência de salvamento. Estou firmemente encalhado na posição [lat/long]. A profundidade da água ao longo do costado é de [X] metros. A natureza do fundo é [rocha/areia/lodo]."} },
      { q:"How do you report pollution from grounding?", a:"I am reporting an oil spill from grounding. [X] tonnes of [fuel oil / cargo] is leaking. The slick is spreading in direction [X] degrees. I require pollution control assistance.", tr:{fr:"Je signale un déversement de pétrole suite à un échouage. [X] tonnes de [fioul / cargaison] s'écoulent. La nappe se répand en direction [X] degrés. J'ai besoin d'assistance en matière de contrôle de pollution.",es:"Informo de un vertido de petróleo tras un varamiento. [X] toneladas de [fuelóleo / carga] se están derramando. La mancha se extiende en dirección [X] grados. Necesito asistencia de control de contaminación.",pt:"Reporto um derrame de petróleo na sequência de um encalhe. [X] toneladas de [fuelóleo / carga] estão a vazar. A mancha está a alastrar em direção [X] graus. Preciso de assistência de controlo de poluição."} },
    ]},
  };

  const c = categories[cat];
  const card = c.cards[idx];

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {Object.entries(categories).map(([k,v])=>(
          <button key={k} onClick={()=>{setCat(k);setIdx(0);setFlipped(false);}} style={{
            padding:"7px 4px",borderRadius:10,cursor:"pointer",fontSize:9,fontWeight:700,
            background:cat===k?`${v.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${cat===k?v.color:"rgba(255,255,255,0.08)"}`,
            color:cat===k?v.color:C.muted}}>
            {v.icon} {v.label[lang]||v.label.en}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {c.cards.map((_,i)=>(
          <div key={i} onClick={()=>{setIdx(i);setFlipped(false);}} style={{
            flex:1,height:4,borderRadius:4,cursor:"pointer",
            background:i===idx?c.color:i<idx?`${c.color}55`:"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div onClick={()=>setFlipped(f=>!f)} style={{
        padding:"16px",borderRadius:14,cursor:"pointer",minHeight:110,
        background:flipped?`${c.color}18`:"rgba(0,0,0,0.4)",
        border:`2px solid ${flipped?c.color:"rgba(255,255,255,0.08)"}`,
        transition:"all 0.3s ease",animation:"fadeUp 0.3s ease",
        display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:10}}>
        {!flipped?(
          <div>
            <div style={{fontSize:9,color:C.muted,letterSpacing:2,marginBottom:8}}>❓ {lang==="fr"?"Touche pour la réponse SMCP":lang==="en"?"Tap for SMCP answer":lang==="es"?"Toca para respuesta SMCP":"Toque para resposta SMCP"}</div>
            <div style={{fontSize:13,color:C.white,fontWeight:700,lineHeight:1.5}}>{card.q}</div>
          </div>
        ):(
          <div>
            <div style={{fontSize:9,color:c.color,letterSpacing:2,marginBottom:8}}>✅ SMCP ANSWER</div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,marginBottom:6,whiteSpace:"pre-line"}}>{card.a}</div>
            {lang!=="en"&&<div style={{fontSize:10,color:C.muted,fontStyle:"italic",borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:6}}>{card.tr[lang]||card.tr.fr}</div>}
          </div>
        )}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{setIdx(i=>Math.max(0,i-1));setFlipped(false);}} disabled={idx===0}
          style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:idx===0?C.muted:C.white,cursor:idx===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":lang==="es"?"Anterior":"Anterior"}
        </button>
        <button onClick={()=>{setIdx(i=>Math.min(c.cards.length-1,i+1));setFlipped(false);}} disabled={idx===c.cards.length-1}
          style={{flex:1,padding:"9px",borderRadius:10,background:idx===c.cards.length-1?"rgba(255,255,255,0.05)":`${c.color}22`,border:`1px solid ${idx===c.cards.length-1?"rgba(255,255,255,0.08)":c.color}`,color:C.white,cursor:idx===c.cards.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":lang==="es"?"Siguiente":"Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — PAN-PAN vs MAYDAY COMPARISON
// ══════════════════════════════════════
function PrioritySignalsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const signals = [
    { id:"mayday", icon:"🆘", color:C.emer,
      label:{fr:"MAYDAY — Détresse",en:"MAYDAY — Distress",es:"MAYDAY — Socorro",pt:"MAYDAY — Perigo"},
      trigger:{fr:"Danger IMMÉDIAT de mort ou de naufrage",en:"IMMEDIATE danger of death or sinking",es:"Peligro INMEDIATO de muerte o naufragio",pt:"Perigo IMEDIATO de morte ou naufrágio"},
      format:{fr:"MAYDAY MAYDAY MAYDAY\nThis is [NOM] [NOM] [NOM]\nMAYDAY [NOM]\nPosition [LAT/LONG]\n[Nature de la détresse]\n[Nombre de personnes]\n[Assistance requise]\nOver",
              en:"MAYDAY MAYDAY MAYDAY\nThis is [NAME] [NAME] [NAME]\nMAYDAY [NAME]\nPosition [LAT/LONG]\n[Nature of distress]\n[Number of persons]\n[Assistance required]\nOver",
              es:"MAYDAY MAYDAY MAYDAY\nThis is [NOMBRE] [NOMBRE] [NOMBRE]\nMAYDAY [NOMBRE]\nPosition [LAT/LONG]\n[Naturaleza emergencia]\n[Número de personas]\n[Asistencia requerida]\nOver",
              pt:"MAYDAY MAYDAY MAYDAY\nThis is [NOME] [NOME] [NOME]\nMAYDAY [NOME]\nPosition [LAT/LONG]\n[Natureza do perigo]\n[Número de pessoas]\n[Assistência requerida]\nOver"},
      examples:{fr:"→ Navire en train de couler\n→ Incendie hors de contrôle\n→ Abandon de navire\n→ Perte de gouvernail en zone dangereuse",
               en:"→ Vessel sinking\n→ Fire out of control\n→ Abandon ship\n→ Steering failure in dangerous area",
               es:"→ Buque hundiéndose\n→ Incendio fuera de control\n→ Abandono del buque\n→ Pérdida de timón en zona peligrosa",
               pt:"→ Navio a afundar\n→ Incêndio fora de controlo\n→ Abandono do navio\n→ Perda de leme em zona perigosa"} },
    { id:"panpan", icon:"⚠️", color:C.urgent,
      label:{fr:"PAN-PAN — Urgence",en:"PAN-PAN — Urgency",es:"PAN-PAN — Urgencia",pt:"PAN-PAN — Urgência"},
      trigger:{fr:"Situation URGENTE mais sans danger de mort immédiat",en:"URGENT situation but without immediate danger of death",es:"Situación URGENTE pero sin peligro de muerte inmediato",pt:"Situação URGENTE mas sem perigo de morte imediato"},
      format:{fr:"PAN-PAN PAN-PAN PAN-PAN\nAll stations (ou nom station)\nThis is [NOM]\nPosition [position]\n[Nature de l'urgence]\n[Personnes et assistance]\nOver",
              en:"PAN-PAN PAN-PAN PAN-PAN\nAll stations (or station name)\nThis is [NAME]\nPosition [position]\n[Nature of urgency]\n[Persons and assistance]\nOver",
              es:"PAN-PAN PAN-PAN PAN-PAN\nAll stations (o nombre estación)\nThis is [NOMBRE]\nPosition [posición]\n[Naturaleza urgencia]\n[Personas y asistencia]\nOver",
              pt:"PAN-PAN PAN-PAN PAN-PAN\nAll stations (ou nome estação)\nThis is [NOME]\nPosition [posição]\n[Natureza urgência]\n[Pessoas e assistência]\nOver"},
      examples:{fr:"→ Personne malade à bord\n→ Panne de machine sans danger immédiat\n→ Dommage à la gouverne, navire manœuvrable\n→ Personne blessée non critique\n→ Problème moteur avec ancragem possible",
               en:"→ Sick person on board\n→ Engine failure without immediate danger\n→ Steering damaged, vessel still maneuverable\n→ Non-critical injured person\n→ Engine problem with possible anchoring",
               es:"→ Persona enferma a bordo\n→ Avería de motor sin peligro inmediato\n→ Timón dañado, buque aún maniobrable\n→ Persona herida no crítica\n→ Problema de motor con posible fondeo",
               pt:"→ Pessoa doente a bordo\n→ Avaria de motor sem perigo imediato\n→ Leme danificado, navio ainda manobravél\n→ Pessoa ferida não crítica\n→ Problema de motor com fundeamento possível"} },
    { id:"securite", icon:"📢", color:C.safety,
      label:{fr:"SÉCURITÉ — Information",en:"SÉCURITÉ — Safety info",es:"SÉCURITÉ — Información",pt:"SÉCURITÉ — Informação"},
      trigger:{fr:"Information de SÉCURITÉ importante pour d'autres navires",en:"Important SAFETY information for other vessels",es:"Información de SEGURIDAD importante para otros buques",pt:"Informação de SEGURANÇA importante para outros navios"},
      format:{fr:"SÉCURITÉ SÉCURITÉ SÉCURITÉ\nAll stations\nThis is [ÉMETTEUR]\nA safety message follows\nSwitch to channel [X]\n[Message de sécurité sur canal X]",
              en:"SÉCURITÉ SÉCURITÉ SÉCURITÉ\nAll stations\nThis is [TRANSMITTER]\nA safety message follows\nSwitch to channel [X]\n[Safety message on channel X]",
              es:"SÉCURITÉ SÉCURITÉ SÉCURITÉ\nAll stations\nThis is [EMISOR]\nA safety message follows\nSwitch to channel [X]\n[Mensaje de seguridad en canal X]",
              pt:"SÉCURITÉ SÉCURITÉ SÉCURITÉ\nAll stations\nThis is [EMISSOR]\nA safety message follows\nSwitch to channel [X]\n[Mensagem de segurança no canal X]"},
      examples:{fr:"→ Épave non cartographiée signalée\n→ Bulletin météo spécial (CROSS)\n→ Navire avarie en dérive\n→ Chalutier avec filets déployés\n→ Information trafic chenal portuaire",
               en:"→ Uncharted wreck reported\n→ Special weather bulletin (MRCC)\n→ Disabled vessel drifting\n→ Trawler with nets deployed\n→ Port channel traffic information",
               es:"→ Naufragio no cartografiado señalado\n→ Boletín meteorológico especial (MRCC)\n→ Buque averiado a la deriva\n→ Barco de arrastre con redes caladas\n→ Información tráfico canal portuario",
               pt:"→ Naufrágio não cartografado sinalizado\n→ Boletim meteorológico especial (MRCC)\n→ Navio avariado à deriva\n→ Arrasteio com redes caladas\n→ Informação tráfego canal portuário"} },
  ];

  const sel_ = sel!==null ? signals[sel] : null;
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {signals.map((s,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            flex:1,padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${s.color}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${sel===i?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:3}}>{s.icon}</div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:10,fontWeight:900,color:s.color,marginBottom:2}}>
              {s.id.toUpperCase()}
            </div>
            <div style={{fontSize:8,color:sel===i?s.color:C.muted,fontWeight:700,lineHeight:1.2}}>{s.label[lang]||s.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{padding:"6px 10px",borderRadius:8,background:`${sel_.color}22`,marginBottom:10,fontSize:10,color:sel_.color,fontWeight:700}}>
          ⚡ {lang==="fr"?"Déclencher quand :":lang==="en"?"Trigger when:":lang==="es"?"Activar cuando:":"Ativar quando:"} {sel_.trigger[lang]||sel_.trigger.en}
        </div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:10,color:C.white,lineHeight:1.8,whiteSpace:"pre-line",marginBottom:10,background:"rgba(0,0,0,0.3)",padding:"10px",borderRadius:10}}>{sel_.format[lang]||sel_.format.en}</div>
        <div style={{fontSize:10,color:sel_.color,fontWeight:700,marginBottom:4}}>{lang==="fr"?"EXEMPLES :":lang==="en"?"EXAMPLES:":lang==="es"?"EJEMPLOS:":"EXEMPLOS:"}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.examples[lang]||sel_.examples.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — EMERGENCY QUIZ
// ══════════════════════════════════════
function EmergencyQuizSVG({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const qs = [
    { q:"Engine room fire, out of control, vessel sinking — which signal?", opts:["PAN-PAN","SÉCURITÉ","MAYDAY — immediate danger of death","Radio silence"], correct:2 },
    { q:"Doctor needed for injured crew member — which signal?", opts:["MAYDAY","PAN-PAN PAN-PAN PAN-PAN — urgent but not life-threatening if assisted","SÉCURITÉ","No call needed"], correct:1 },
    { q:"Uncharted wreck discovered — you want to warn other vessels. Which signal?", opts:["MAYDAY","PAN-PAN","SÉCURITÉ SÉCURITÉ SÉCURITÉ — safety information","No signal"], correct:2 },
    { q:"'Man overboard!' — which is the correct initial call?", opts:["MAYDAY","PAN-PAN PAN-PAN PAN-PAN. All stations. Man overboard at [position].","SÉCURITÉ","Engine stop only"], correct:1 },
    { q:"Vessel is taking on water after collision but flooding is slow and controllable — which signal?", opts:["SÉCURITÉ","MAYDAY if the flooding cannot definitely be controlled","PAN-PAN if situation serious but vessel still manageable","All of these depending on severity"], correct:3 },
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
        {qs.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<qIdx?C.emer:i===qIdx?C.urgent:"rgba(255,255,255,0.1)"}}/>)}
      </div>
      <div style={{fontSize:12,fontWeight:700,color:C.white,marginBottom:12,lineHeight:1.5}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(ans!==null){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===ans){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:ans!==null?"default":"pointer",fontFamily:"'Courier New',monospace"}}>{opt}</button>;
        })}
      </div>
      {ans!==null&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.emer},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.white,cursor:"pointer"}}>
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
      {id:"q1",q:"How many times do you say MAYDAY at the start of a distress call?\n(Answer: number)",correct:"3"},
      {id:"q2",q:"Which distress signal is used for a sick crew member needing assistance?\n(Answer: 1 word)",correct:"PAN-PAN"},
      {id:"q3",q:"'I have a fire in the engine room. Fire is ___ control.'\n(Fill the blank: under / not under)",correct:"not under"},
    ],
    fr:[
      {id:"q1",q:"Combien de fois dit-on MAYDAY au début d'un appel de détresse ?\n(Répondre : chiffre)",correct:"3"},
      {id:"q2",q:"Quel signal de détresse est utilisé pour un membre d'équipage malade nécessitant assistance ?\n(Répondre : 1 mot)",correct:"PAN-PAN"},
      {id:"q3",q:"'I have a fire in the engine room. Fire is ___ control.'\n(Remplir le blanc : under / not under)",correct:"not under"},
    ],
    es:[
      {id:"q1",q:"¿Cuántas veces se dice MAYDAY al principio de una llamada de socorro?\n(Responder: número)",correct:"3"},
      {id:"q2",q:"¿Qué señal de socorro se usa para un tripulante enfermo que necesita asistencia?\n(Responder: 1 palabra)",correct:"PAN-PAN"},
      {id:"q3",q:"'I have a fire in the engine room. Fire is ___ control.'\n(Completar el hueco: under / not under)",correct:"not under"},
    ],
    pt:[
      {id:"q1",q:"Quantas vezes se diz MAYDAY no início de uma chamada de socorro?\n(Responder: número)",correct:"3"},
      {id:"q2",q:"Que sinal de socorro é utilizado para um membro da tripulação doente que precisa de assistência?\n(Responder: 1 palavra)",correct:"PAN-PAN"},
      {id:"q3",q:"'I have a fire in the engine room. Fire is ___ control.'\n(Preencher o espaço: under / not under)",correct:"not under"},
    ],
  };
  const list=qs[lang]||qs.en;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v==="3"||v.includes("three")||v.includes("trois");
    if(q.id==="q2") return v.includes("pan");
    if(q.id==="q3") return v.includes("not under");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.emer}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : MAYDAY = 3 fois · PAN-PAN = urgence médicale · fire is NOT UNDER control = incendie non maîtrisé":
         lang==="en"?"💡 Reminders: MAYDAY = 3 times · PAN-PAN = medical urgency · fire is NOT UNDER control = uncontrolled fire":
         lang==="es"?"💡 Recordatorios: MAYDAY = 3 veces · PAN-PAN = urgencia médica · fire is NOT UNDER control = incendio no controlado":
         "💡 Lembretes: MAYDAY = 3 vezes · PAN-PAN = urgência médica · fire is NOT UNDER control = incêndio não controlado"}
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
        Q1: THREE (3) — MAYDAY is always said 3 times to ensure reception\nQ2: PAN-PAN — urgency signal for serious but not immediately life-threatening\nQ3: NOT UNDER — 'fire is not under control' = fire uncontrolled and spreading
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.emer}12`,border:`1px solid ${showC?C.green:C.emer}44`,color:showC?C.green:C.emer,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  en:[
    {q:"Which phrase do you use when a distress situation has been resolved?",opts:["MAYDAY cancelled","SEELONCE FEENEE / Silence finished. [Station], this is [MRCC]. The distress situation is ended. Normal communications may resume.","Stop calling","Over and out"],correct:1,expl:"Cancelling MAYDAY/PAN-PAN: 'SEELONCE FEENEE' (French pronunciation of 'silence fini') or 'SILENCE FINISHED' is broadcast by the coordinating station (MRCC) when the distress is resolved. Only the MRCC or designated station can cancel the distress silence. Then: 'MV [name], this is [MRCC]. The distress is ended. Cancel your PAN-PAN/MAYDAY.' Vessel confirms: 'MRCC, MV [name]. PAN-PAN/MAYDAY cancelled. All persons accounted for. Thank you.'"},
    {q:"A vessel hears a MAYDAY but the MRCC has not responded after 1 minute. What should the vessel do?",opts:["Ignore it","Transmit MAYDAY RELAY: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. All stations. This is [vessel name]. I have received the following MAYDAY from MV [name]...'","Call on CH 12","Sail to the position immediately"],correct:1,expl:"MAYDAY RELAY procedure: if you hear a MAYDAY and the coast station does not seem to have responded, you MUST relay it. Format: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. All stations. This is [your vessel name]. I received the following MAYDAY at [time] UTC from [vessel name]: [repeat content of original MAYDAY]. Over.' This is a legal obligation under SOLAS. You then monitor CH 16 and assist if in the vicinity."},
    {q:"How do you report structural damage causing a list?",opts:["Vessel is leaning","I have structural damage. I have [X] degrees list to [port/starboard]. I am [able/unable] to correct the list. I [require/do not require] assistance.","Ship tilting","We are going over"],correct:1,expl:"Structural damage with list SMCP: 'I have structural damage. I have [X] degrees list to [port/starboard]. The list is [increasing/stable/decreasing]. I am [flooding / taking on water / stable]. I [require / do not require] pumping assistance / tug / salvage.' List (gîte) is a critical indicator: a vessel listing more than 15-20° is at serious risk of capsizing. Report degree of list AND whether it is increasing — this determines urgency level (PAN-PAN vs MAYDAY)."},
    {q:"What does 'SILENCE MAYDAY' mean when broadcast by MRCC?",opts:["All vessels must stop their engines","All stations must stop transmitting on channel 16 except for the distress communication in progress","Vessels may continue normal communications","The MAYDAY is cancelled"],correct:1,expl:"'SILENCE MAYDAY' (or 'SILENCE DISTRESS') broadcast by MRCC on CH 16: means ALL stations must immediately stop transmitting on CH 16 except: the vessel in distress, the MRCC, and vessels designated to assist. Purpose: prevent interference with critical distress communications. Legal obligation: failure to comply is a serious maritime offence. Only MRCC can lift this with 'SEELONCE FEENEE' or 'SILENCE FINISHED.'"},
    {q:"Complete the PAN-PAN call for a medical emergency: 'PAN-PAN PAN-PAN PAN-PAN. All stations. This is MV [name]. ___'",opts:["We need a doctor","Position [lat/long]. I have a medical emergency. One person has [describe illness/injury]. I require [medical advice / doctor / evacuation]. Over.","Medical problem on board","Send help"],correct:1,expl:"PAN-PAN medical SMCP format: 'PAN-PAN PAN-PAN PAN-PAN. All stations (or specific station). This is MV [name]. Position Latitude [X]°[X]'N, Longitude [X]°[X]'E. I have a medical emergency on board. [X] person(s) [describe condition: chest pain / unconscious / serious injury]. I require [medical radio consultation / doctor to board / immediate evacuation]. Over.' Also: PAN-PAN MEDICO = specific call for medical advice. MRCC will connect you with a maritime medical center."},
  ],
  fr:[
    {q:"Quelle phrase utilise-t-on quand une situation de détresse est résolue ?",opts:["MAYDAY annulé","SEELONCE FEENEE / Silence finished. [Station], ici [MRCC]. La situation de détresse est terminée. Les communications normales peuvent reprendre.","Arrêtez d'appeler","Terminé à vous"],correct:1,expl:"Annulation MAYDAY/PAN-PAN : 'SEELONCE FEENEE' (fin du silence) ou 'SILENCE FINISHED' est diffusé par la station coordinatrice (MRCC) quand la détresse est résolue. Seul le MRCC ou la station désignée peut annuler le silence de détresse. Puis : 'MV [nom], ici [MRCC]. La détresse est terminée. Annulez votre PAN-PAN/MAYDAY.' Le navire confirme : 'MRCC, MV [nom]. PAN-PAN/MAYDAY annulé. Tout le personnel est accounted for. Merci.'"},
    {q:"Un navire entend un MAYDAY mais le MRCC n'a pas répondu après 1 minute. Que doit faire le navire ?",opts:["L'ignorer","Émettre MAYDAY RELAY : 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. Toutes stations. Ici [nom navire]. J'ai reçu le MAYDAY suivant de MV [nom]...'","Appeler sur CH 12","Faire route vers la position immédiatement"],correct:1,expl:"Procédure MAYDAY RELAY : si vous entendez un MAYDAY et que la station côtière ne semble pas avoir répondu, vous DEVEZ le relayer. Format : 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. Toutes stations. Ici [votre nom de navire]. J'ai reçu le MAYDAY suivant à [heure] UTC de [nom du navire] : [répéter le contenu du MAYDAY original]. Terminé.' C'est une obligation légale selon SOLAS."},
    {q:"Comment signaler des dommages structurels causant une gîte ?",opts:["Le navire penche","I have structural damage. I have [X] degrees list to [port/starboard]. I am [able/unable] to correct the list. I [require/do not require] assistance.","Le navire s'incline","On va chavirer"],correct:1,expl:"Dommages structurels avec gîte SMCP : 'I have structural damage. I have [X] degrees list to [port/starboard]. The list is [increasing/stable/decreasing]. I am [flooding / taking on water / stable]. I [require / do not require] pumping assistance / tug / salvage.' Une gîte supérieure à 15-20° est critique. Signaler le degré de gîte ET si elle augmente — cela détermine le niveau d'urgence (PAN-PAN vs MAYDAY)."},
    {q:"Que signifie 'SILENCE MAYDAY' diffusé par le MRCC ?",opts:["Tous les navires doivent arrêter leurs moteurs","Toutes les stations doivent cesser d'émettre sur le canal 16 sauf pour la communication de détresse en cours","Les navires peuvent reprendre les communications normales","Le MAYDAY est annulé"],correct:1,expl:"'SILENCE MAYDAY' (ou 'SILENCE DISTRESS') diffusé par le MRCC sur CH 16 : toutes les stations doivent immédiatement cesser d'émettre sur CH 16 sauf : le navire en détresse, le MRCC, et les navires désignés pour assister. Seul le MRCC peut lever ce silence avec 'SEELONCE FEENEE' ou 'SILENCE FINISHED'."},
    {q:"Complétez l'appel PAN-PAN médical : 'PAN-PAN PAN-PAN PAN-PAN. Toutes stations. Ici MV [nom]. ___'",opts:["Nous avons besoin d'un médecin","Position [lat/long]. I have a medical emergency. One person has [describe illness/injury]. I require [medical advice / doctor / evacuation]. Over.","Problème médical à bord","Envoyez de l'aide"],correct:1,expl:"Format PAN-PAN médical SMCP : 'PAN-PAN PAN-PAN PAN-PAN. Toutes stations (ou station spécifique). Ici MV [nom]. Position Latitude [X]°[X]'N, Longitude [X]°[X]'E. J'ai une urgence médicale à bord. [X] personne(s) [décrire l'état]. Je demande [consultation médicale radio / médecin à bord / évacuation immédiate]. Terminé.'"},
  ],
  es:[
    {q:"¿Qué frase se usa cuando se ha resuelto una situación de socorro?",opts:["MAYDAY anulado","SEELONCE FEENEE / Silence finished. [Estación], aquí [MRCC]. La situación de socorro ha terminado. Las comunicaciones normales pueden reanudarse.","Dejen de llamar","Cambio y fuera"],correct:1,expl:"Cancelación MAYDAY/PAN-PAN: 'SEELONCE FEENEE' (fin del silencio) o 'SILENCE FINISHED' es difundido por la estación coordinadora (MRCC) cuando la emergencia se resuelve. Solo el MRCC puede cancelar el silencio de socorro. Luego: 'MV [nombre], aquí [MRCC]. La emergencia ha terminado. Cancele su PAN-PAN/MAYDAY.'"},
    {q:"Un buque escucha un MAYDAY pero el MRCC no ha respondido después de 1 minuto. ¿Qué debe hacer el buque?",opts:["Ignorarlo","Transmitir MAYDAY RELAY: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. Todas las estaciones. Aquí [nombre buque]. He recibido el siguiente MAYDAY del MV [nombre]...'","Llamar en CH 12","Navegar inmediatamente hacia la posición"],correct:1,expl:"Procedimiento MAYDAY RELAY: si escuchas un MAYDAY y la estación costera no parece haber respondido, DEBES transmitirlo en relevo. Formato: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. Todas las estaciones. Aquí [tu nombre de buque]. He recibido el siguiente MAYDAY a las [hora] UTC del [nombre del buque]: [repetir contenido del MAYDAY original]. Cambio.' Es una obligación legal según el SOLAS."},
    {q:"¿Cómo se informan los daños estructurales que causan escora?",opts:["El buque se inclina","I have structural damage. I have [X] degrees list to [port/starboard]. I am [able/unable] to correct the list. I [require/do not require] assistance.","El buque se ladea","Vamos a zozobrar"],correct:1,expl:"Daños estructurales con escora SMCP: 'I have structural damage. I have [X] degrees list to [port/starboard]. The list is [increasing/stable/decreasing]. I am [flooding / taking on water / stable]. I [require / do not require] pumping assistance / tug / salvage.' Una escora superior a 15-20° es crítica. Informar del grado de escora Y si está aumentando — esto determina el nivel de urgencia."},
    {q:"¿Qué significa 'SILENCE MAYDAY' difundido por el MRCC?",opts:["Todos los buques deben detener sus motores","Todas las estaciones deben dejar de emitir en el canal 16 excepto para la comunicación de socorro en curso","Los buques pueden reanudar las comunicaciones normales","El MAYDAY está cancelado"],correct:1,expl:"'SILENCE MAYDAY' (o 'SILENCE DISTRESS') difundido por el MRCC en CH 16: todas las estaciones deben dejar inmediatamente de emitir en CH 16 excepto: el buque en peligro, el MRCC y los buques designados para asistir. Solo el MRCC puede levantar este silencio con 'SEELONCE FEENEE' o 'SILENCE FINISHED'."},
    {q:"Complete la llamada PAN-PAN médica: 'PAN-PAN PAN-PAN PAN-PAN. Todas las estaciones. Aquí MV [nombre]. ___'",opts:["Necesitamos un médico","Position [lat/long]. I have a medical emergency. One person has [describe illness/injury]. I require [medical advice / doctor / evacuation]. Over.","Problema médico a bordo","Envíen ayuda"],correct:1,expl:"Formato PAN-PAN médico SMCP: 'PAN-PAN PAN-PAN PAN-PAN. Todas las estaciones. Aquí MV [nombre]. Posición Latitud [X]°[X]'N, Longitud [X]°[X]'E. Tengo una emergencia médica a bordo. [X] persona(s) [describir el estado]. Solicito [consulta médica por radio / médico a bordo / evacuación inmediata]. Cambio.'"},
  ],
  pt:[
    {q:"Que frase se usa quando uma situação de perigo foi resolvida?",opts:["MAYDAY cancelado","SEELONCE FEENEE / Silence finished. [Estação], aqui [MRCC]. A situação de perigo terminou. As comunicações normais podem ser retomadas.","Parem de chamar","Mudança e fora"],correct:1,expl:"Cancelamento MAYDAY/PAN-PAN: 'SEELONCE FEENEE' (fim do silêncio) ou 'SILENCE FINISHED' é difundido pela estação coordenadora (MRCC) quando o perigo é resolvido. Apenas o MRCC pode cancelar o silêncio de perigo. Depois: 'MV [nome], aqui [MRCC]. O perigo terminou. Cancele o seu PAN-PAN/MAYDAY.'"},
    {q:"Um navio ouve um MAYDAY mas o MRCC não respondeu após 1 minuto. O que deve fazer o navio?",opts:["Ignorá-lo","Transmitir MAYDAY RELAY: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. Todas as estações. Aqui [nome navio]. Recebi o seguinte MAYDAY do MV [nome]...'","Chamar no CH 12","Navegar imediatamente para a posição"],correct:1,expl:"Procedimento MAYDAY RELAY: se ouvir um MAYDAY e a estação costeira não parecer ter respondido, DEVE transmiti-lo como relé. Formato: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. Todas as estações. Aqui [nome do seu navio]. Recebi o seguinte MAYDAY às [hora] UTC do [nome do navio]: [repetir conteúdo do MAYDAY original]. Mudança.' É uma obrigação legal segundo o SOLAS."},
    {q:"Como se reportam danos estruturais que causam adornamento?",opts:["O navio está a inclinar","I have structural damage. I have [X] degrees list to [port/starboard]. I am [able/unable] to correct the list. I [require/do not require] assistance.","O navio está a adornar","Vamos a capotar"],correct:1,expl:"Danos estruturais com adornamento SMCP: 'I have structural damage. I have [X] degrees list to [port/starboard]. The list is [increasing/stable/decreasing]. I am [flooding / taking on water / stable]. I [require / do not require] pumping assistance / tug / salvage.' Um adornamento superior a 15-20° é crítico. Reportar o grau de adornamento E se está a aumentar — isto determina o nível de urgência."},
    {q:"O que significa 'SILENCE MAYDAY' difundido pelo MRCC?",opts:["Todos os navios devem parar os motores","Todas as estações devem parar de emitir no canal 16 exceto para a comunicação de perigo em curso","Os navios podem retomar as comunicações normais","O MAYDAY está cancelado"],correct:1,expl:"'SILENCE MAYDAY' (ou 'SILENCE DISTRESS') difundido pelo MRCC no CH 16: todas as estações devem parar imediatamente de emitir no CH 16 exceto: o navio em perigo, o MRCC e os navios designados para assistir. Apenas o MRCC pode levantar este silêncio com 'SEELONCE FEENEE' ou 'SILENCE FINISHED'."},
    {q:"Complete a chamada PAN-PAN médica: 'PAN-PAN PAN-PAN PAN-PAN. Todas as estações. Aqui MV [nome]. ___'",opts:["Precisamos de um médico","Position [lat/long]. I have a medical emergency. One person has [describe illness/injury]. I require [medical advice / doctor / evacuation]. Over.","Problema médico a bordo","Enviem ajuda"],correct:1,expl:"Formato PAN-PAN médico SMCP: 'PAN-PAN PAN-PAN PAN-PAN. Todas as estações. Aqui MV [nome]. Posição Latitude [X]°[X]'N, Longitude [X]°[X]'E. Tenho uma emergência médica a bordo. [X] pessoa(s) [descrever o estado]. Solicito [consulta médica por rádio / médico a bordo / evacuação imediata]. Mudança.'"},
  ],
};

const BANK = {
  en:[
    {q:"What is the SMCP phrase to cancel a false DSC alert?",opts:["Sorry, false alarm","[CH 16] All stations. This is [vessel name]. Cancel distress alert transmitted at [time] UTC. False alarm. My position is [lat/long]. My vessel is not in distress. Out.","Stop the alert","No distress"],correct:1,expl:"False DSC alert cancellation SMCP: immediately after accidental activation, switch to CH 16 and broadcast: 'All stations. This is [vessel name]. Cancel distress alert transmitted at [time] UTC. False alarm. My vessel is not in distress. My position is [lat/long]. Over.' Then contact MRCC directly on CH 16 to confirm cancellation. Failure to cancel = unnecessary full SAR response = massive cost + possible legal penalties. Always register your MMSI before use."},
    {q:"How do you report a steering failure in SMCP?",opts:["Steering broken","I have a steering failure. I am unable to manoeuvre. My vessel may be [heading towards danger / drifting]. I require [tug / anchor / immediate assistance].","Can't steer","Wheel not working"],correct:1,expl:"Steering failure SMCP: 'I have a steering failure. I am unable to manoeuvre. My vessel is [drifting / heading towards danger at X knots]. My position is [lat/long]. I require [tug assistance / pilot / anchor] to prevent [grounding / collision].' Additional info: engine status (ahead/stopped), current and wind (vessel drift), nearest danger (distance and bearing). This is PAN-PAN (urgent) or MAYDAY (if imminent danger to life)."},
    {q:"What does 'taking on water' mean and how do you report it?",opts:["Water sports","I am taking on water in the [engine room / cargo hold / forward compartment]. Rate of flooding is [severe / moderate / controlled]. Bilge pumps are [running / insufficient].","Water entry","Getting wet"],correct:1,expl:"Taking on water SMCP: 'I am taking on water. Flooding is in [engine room / cargo hold / ballast tank / forward compartment]. Rate is [severe / moderate / slow]. Bilge pumps are [running / not coping]. I [can / cannot] control the flooding. I require [pumping assistance / salvage / tug].' Critical additions: list (degrees), trim change, estimated time before critical condition. Flooding rate determines MAYDAY vs PAN-PAN."},
    {q:"How do you report a cargo shift causing instability?",opts:["Cargo moved","I have a cargo shift. I have [X] degrees list to [port/starboard]. The vessel is unstable. I am [able/unable] to correct the situation. I [require/do not require] assistance.","Load moved","Boxes fell"],correct:1,expl:"Cargo shift SMCP: 'I have a cargo shift. I have [X] degrees list to [port/starboard]. The list is [stable/increasing]. I am attempting to correct by [ballasting / shifting remaining cargo / reducing speed]. I [require / do not require] salvage assistance.' Cargo shift is particularly dangerous for container ships, bulk carriers, and car carriers. List > 10° from cargo shift = serious situation = PAN-PAN. List rapidly increasing = MAYDAY."},
    {q:"How do you request medical evacuation (medevac) in SMCP?",opts:["Need helicopter","PAN-PAN PAN-PAN PAN-PAN. All stations. MV [name]. I have a medical emergency. I require immediate medical evacuation by helicopter. Patient condition: [describe]. My position [lat/long]. Wind [X] degrees [X] knots. Nearest safe landing/winching area is [describe].","Doctor urgent","Medivac needed"],correct:1,expl:"Medical evacuation SMCP: 'PAN-PAN PAN-PAN PAN-PAN. All stations. This is MV [name]. I have a medical emergency requiring immediate evacuation. Patient: [age, condition, vital signs if known]. My position: Latitude [X], Longitude [X]. Wind direction [X] degrees, [X] knots. Sea state [calm/moderate/rough]. Helicopter landing/winching area: [describe clear deck area]. I require a helicopter. Over.' MRCC will coordinate helicopter, ETA, and any required speed/course adjustment."},
    {q:"What is the SMCP phrase for reporting a person missing on board?",opts:["Someone is gone","I have a missing person on board. Last seen at [time] UTC in [location on vessel]. Description: [age, clothing, physical description]. I am conducting a search on board. I may require assistance.","Person lost","Can't find crew"],correct:1,expl:"Missing person SMCP: 'I have a missing person on board. Last seen at [time] UTC in [location: cabin / deck / engine room]. Description: [male/female, age approximately X, height, clothing description]. My current position is [lat/long]. I am conducting a thorough search of the vessel. If not found within [X] minutes, I will require SAR assistance.' If suspected MOB: immediately upgrade to 'Man overboard' PAN-PAN."},
    {q:"How do you report an explosion on board?",opts:["Explosion!","MAYDAY MAYDAY MAYDAY. This is [vessel]. I have had an explosion in [location]. Fire is [under/not under] control. I have [X] casualties. I require immediate assistance. My position [lat/long].","Blast on ship","Big bang"],correct:1,expl:"Explosion SMCP: 'MAYDAY MAYDAY MAYDAY. This is MV [name] [×3]. MAYDAY MV [name]. Position [lat/long]. I have had an explosion in [engine room / cargo / fuel tank]. Structural damage is [severe / unknown]. Fire is [under / not under control]. I have [X] persons [dead / seriously injured / missing]. All persons mustered. I require immediate assistance. Over.' Explosion = MAYDAY (immediate danger of loss of life and vessel). Activate EPIRB. Prepare to abandon."},
    {q:"What is 'MAYDAY RELAY' and who can transmit it?",opts:["A delayed MAYDAY","Re-transmission by any vessel of a MAYDAY received but not acknowledged by coast station — any vessel that hears unanswered MAYDAY must relay it","A MAYDAY from a relay station","A backup MAYDAY"],correct:1,expl:"MAYDAY RELAY: ANY vessel that hears a MAYDAY that the coast station does not appear to have acknowledged MUST relay it. No permission required. Format: 'MAYDAY RELAY × 3. All stations. This is [your vessel name]. At [time] UTC I received the following MAYDAY from MV [name]: [repeat original content]. Over.' After relaying: maintain watch on CH 16, head to the area if practicable, assist in SAR. MAYDAY RELAY is a legal obligation under SOLAS Convention."},
    {q:"How do you communicate with a SAR helicopter?",opts:["Wave your arms","SAR helicopter, this is MV [name]. I am in position [lat/long]. Wind [X] degrees [X] knots. I have marked my position with [smoke / flare / SART]. I am ready to receive. Over.","Helicopter here","SAR come"],correct:1,expl:"Helicopter SMCP: 'SAR Helicopter, this is MV [name]. I am in position Latitude [X], Longitude [X]. Wind direction [X] degrees, [X] knots. Sea state [calm/moderate/rough]. I have activated [SART / smoke signal / strobe light] to mark my position. Crew/casualty is ready for transfer at [location on deck]. Over.' During winching: reduce speed, maintain course and speed agreed. SAR helicopter may instruct specific course/speed for winching operation."},
    {q:"What SMCP phrase do you use when you see another vessel in distress but they are not transmitting?",opts:["Nothing","MAYDAY RELAY or PAN-PAN. All stations. I have sighted a vessel in apparent distress at position [lat/long]. Vessel appears to be [sinking / on fire / disabled]. I am proceeding to assist. All vessels in the vicinity please assist.","Report to port","Ignore"],correct:1,expl:"Vessel in distress sighted SMCP: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. All stations. This is MV [name]. I have sighted a vessel in apparent distress. Position of distress vessel: Latitude [X], Longitude [X]. Description: [vessel type, color, approximate size]. The vessel appears to be [sinking / on fire / capsized / disabled / abandoned]. I am proceeding to assist. Over.' Legal obligation: SOLAS requires all vessels to assist others in distress if possible without danger to own vessel."},
    {q:"How do you report dangerous goods spillage?",opts:["Chemicals spilled","MAYDAY/PAN-PAN. This is [vessel]. I have a spillage of [substance / IMDG class] in [location]. [X] tonnes/litres released. I require chemical/pollution response assistance.","Cargo leak","Chemical problem"],correct:1,expl:"Dangerous goods spillage SMCP: 'MAYDAY/PAN-PAN. This is MV [name]. I have a spillage of [dangerous goods description / IMDG class X, UN number XXXX] in [cargo hold / on deck / in the sea]. Estimated quantity: [X] tonnes. Substance is [toxic / flammable / corrosive / radioactive]. I require immediate [chemical emergency response / pollution control / medical assistance for [X] casualties].' IMDG = International Maritime Dangerous Goods Code. All vessels must carry this code."},
    {q:"What is the SMCP phrase when you receive a MAYDAY but cannot assist?",opts:["Not our problem","[MRCC/All stations]. This is MV [name]. I have received the MAYDAY from MV [vessel in distress]. I am unable to assist due to [position / vessel type / conditions]. My position is [lat/long].","Can't help","Too far away"],correct:1,expl:"Unable to assist SMCP: '[MRCC / Distressed vessel / All stations]. This is MV [name]. I have received the MAYDAY from MV [name]. I regret I am unable to render assistance due to [my position [X] miles distant / my vessel type / dangerous sea conditions / I am currently rendering assistance to another vessel]. My position is [lat/long]. I will continue monitoring channel 16.' Even if unable to assist physically, you may be able to relay information or act as MAYDAY RELAY."},
    {q:"How do you report a vessel on fire at anchor observed from ashore?",opts:["Call 999","[MRCC / Coast station]. This is [your name / call sign]. I am reporting a vessel on fire at anchor at [position / anchorage name]. The vessel appears to be [describe: size, color, flag]. Fire is visible in [location]. I require maritime emergency services.","Fire at sea","Vessel burning"],correct:1,expl:"Vessel on fire observed from shore SMCP: '[MRCC / Coast station]. This is [name/call sign]. I am reporting a vessel on fire at anchor in [location]. Position: [lat/long or anchorage name]. The vessel is approximately [X] metres, [color], [flag if visible]. Fire is visible in [forward/aft/midship area]. [X] persons appear to be on deck. I require maritime fire and rescue services immediately. Over.' This applies to ANY person observing a maritime emergency — not just mariners."},
    {q:"What is the difference between 'vessel in distress' and 'vessel in difficulty'?",opts:["They are the same","Vessel in distress = MAYDAY situation with immediate danger to life / sinking. Vessel in difficulty = PAN-PAN / serious problem but not yet immediately life-threatening.","Difficulty is worse","Distress is less serious"],correct:1,expl:"Distress vs Difficulty SMCP: VESSEL IN DISTRESS = MAYDAY level. Immediate threat to life or vessel. Examples: sinking, uncontrolled fire, abandoning ship. VESSEL IN DIFFICULTY = PAN-PAN level. Serious problem requiring assistance but not immediately life-threatening. Examples: engine failure drifting toward coast (danger developing but not immediate), medical case, structural damage but vessel still floating. IMPORTANT: situations can escalate — reassess constantly and upgrade from PAN-PAN to MAYDAY if situation deteriorates."},
  ],
  fr:[
    {q:"Quelle est la phrase SMCP pour annuler une fausse alerte DSC ?",opts:["Désolé, fausse alarme","[CH 16] Toutes stations. Ici [nom navire]. Annulez l'alerte de détresse transmise à [heure] UTC. Fausse alarme. Ma position est [lat/long]. Mon navire n'est pas en détresse. Terminé à vous.","Arrêtez l'alerte","Pas de détresse"],correct:1,expl:"Annulation fausse alerte DSC SMCP : après activation accidentelle, basculer sur CH 16 et diffuser : 'Toutes stations. Ici [nom navire]. Annulez l'alerte de détresse transmise à [heure] UTC. Fausse alarme. Mon navire n'est pas en détresse. Ma position est [lat/long]. Terminé à vous.' Puis contacter le MRCC sur CH 16. Omission d'annulation = déclenchement inutile du SAR + amendes possibles."},
    {q:"Comment signaler une panne de gouvernail en SMCP ?",opts:["Gouvernail en panne","I have a steering failure. I am unable to manoeuvre. My vessel may be [heading towards danger / drifting]. I require [tug / anchor / immediate assistance].","Ne peux pas gouverner","Barre ne fonctionne pas"],correct:1,expl:"Panne de gouvernail SMCP : 'I have a steering failure. I am unable to manoeuvre. My vessel is [drifting / heading towards danger at X knots]. My position is [lat/long]. I require [tug assistance / pilot / anchor] to prevent [grounding / collision].' PAN-PAN (urgent) ou MAYDAY (si danger immédiat de vie)."},
    {q:"Que signifie 'taking on water' et comment le signaler ?",opts:["Sports nautiques","I am taking on water in the [engine room / cargo hold / forward compartment]. Rate of flooding is [severe / moderate / controlled]. Bilge pumps are [running / insufficient].","Eau qui entre","Mouiller"],correct:1,expl:"'Taking on water' SMCP : 'I am taking on water. Flooding is in [salle des machines / cale / ballast / compartiment avant]. Rate is [severe / moderate / slow]. Bilge pumps are [running / not coping]. I [can / cannot] control the flooding. I require [pumping assistance / salvage / tug].' Le taux d'envahissement détermine MAYDAY vs PAN-PAN."},
    {q:"Comment signaler un déplacement de cargaison causant une instabilité ?",opts:["La cargaison a bougé","I have a cargo shift. I have [X] degrees list to [port/starboard]. The vessel is unstable. I am [able/unable] to correct the situation. I [require/do not require] assistance.","Le chargement a bougé","Des boîtes sont tombées"],correct:1,expl:"Déplacement de cargaison SMCP : 'I have a cargo shift. I have [X] degrees list to [port/starboard]. The list is [stable/increasing]. I am attempting to correct by [ballasting / shifting remaining cargo]. I [require / do not require] salvage assistance.' Gîte > 10° suite à déplacement = situation grave = PAN-PAN. Gîte augmentant rapidement = MAYDAY."},
    {q:"Comment demander une évacuation médicale (medevac) en SMCP ?",opts:["J'ai besoin d'un hélicoptère","PAN-PAN PAN-PAN PAN-PAN. All stations. MV [name]. I have a medical emergency. I require immediate medical evacuation by helicopter. Patient condition: [describe]. My position [lat/long]. Wind [X] degrees [X] knots.","Médecin urgent","Medevac nécessaire"],correct:1,expl:"Évacuation médicale SMCP : 'PAN-PAN PAN-PAN PAN-PAN. Toutes stations. Ici MV [nom]. J'ai une urgence médicale nécessitant une évacuation immédiate. Patient : [âge, état, signes vitaux si connus]. Ma position : Latitude [X], Longitude [X]. Vent [X] degrés, [X] nœuds. État de la mer [calme/modéré/agité]. Zone d'atterrissage/treuillage hélicoptère : [décrire].'"},
    {q:"Quelle est la phrase SMCP pour signaler une personne disparue à bord ?",opts:["Quelqu'un a disparu","I have a missing person on board. Last seen at [time] UTC in [location on vessel]. Description: [age, clothing, physical description]. I am conducting a search on board.","Personne perdue","Je ne trouve pas l'équipage"],correct:1,expl:"Personne disparue SMCP : 'I have a missing person on board. Last seen at [heure] UTC in [emplacement sur le navire]. Description : [homme/femme, âge estimé, taille, description des vêtements]. Ma position actuelle est [lat/long]. Je mène une fouille complète du navire. Si la personne n'est pas trouvée dans [X] minutes, j'aurai besoin d'assistance SAR.' Si MOB suspecté : mettre à jour immédiatement en PAN-PAN 'homme à la mer'."},
    {q:"Comment signaler une explosion à bord ?",opts:["Explosion !","MAYDAY MAYDAY MAYDAY. This is [vessel]. I have had an explosion in [location]. Fire is [under/not under] control. I have [X] casualties. I require immediate assistance. My position [lat/long].","Détonation sur le navire","Grande explosion"],correct:1,expl:"Explosion SMCP : 'MAYDAY MAYDAY MAYDAY. Ici MV [nom] [×3]. MAYDAY MV [nom]. Position [lat/long]. J'ai eu une explosion dans [salle des machines / cargaison / réservoir de carburant]. Les dommages structurels sont [graves / inconnus]. L'incendie est [maîtrisé / non maîtrisé]. J'ai [X] personnes [décédées / grièvement blessées / disparues]. Tout le personnel est aux postes d'abandon. J'ai besoin d'assistance immédiate.'"},
    {q:"Qu'est-ce que le 'MAYDAY RELAY' et qui peut le transmettre ?",opts:["Un MAYDAY retardé","Retransmission par tout navire d'un MAYDAY reçu mais non accusé de réception par la station côtière — tout navire entendant un MAYDAY sans réponse DOIT le relayer","Un MAYDAY d'une station relais","Un MAYDAY de secours"],correct:1,expl:"MAYDAY RELAY : TOUT navire entendant un MAYDAY que la station côtière ne semble pas avoir accusé de réception DOIT le relayer. Aucune autorisation requise. Format : 'MAYDAY RELAY × 3. Toutes stations. Ici [votre nom de navire]. À [heure] UTC j'ai reçu le MAYDAY suivant de MV [nom] : [répéter le contenu original]. Terminé.' C'est une obligation légale selon SOLAS."},
    {q:"Comment communiquer avec un hélicoptère SAR ?",opts:["Agitez les bras","SAR helicopter, this is MV [name]. I am in position [lat/long]. Wind [X] degrees [X] knots. I have marked my position with [smoke / flare / SART]. I am ready to receive. Over.","Hélicoptère ici","SAR venez"],correct:1,expl:"Communication hélicoptère SMCP : 'SAR Helicopter, ici MV [nom]. Je suis en position Latitude [X], Longitude [X]. Vent [X] degrés, [X] nœuds. État de la mer [calme/modéré/agité]. J'ai activé [SART / signal fumigène / feu stroboscopique] pour marquer ma position. Le patient/équipage est prêt pour le transfert à [emplacement sur le pont].'"},
    {q:"Quelle phrase SMCP utilise-t-on quand on voit un autre navire en détresse sans signal radio ?",opts:["Rien","MAYDAY RELAY ou PAN-PAN. Toutes stations. J'ai repéré un navire en détresse apparente en position [lat/long]. Le navire semble [couler / en feu / en avarie]. Je fais route pour assister.","Signaler au port","Ignorer"],correct:1,expl:"Navire en détresse repéré SMCP : 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. Toutes stations. Ici MV [nom]. J'ai repéré un navire en détresse apparente. Position du navire en détresse : Latitude [X], Longitude [X]. Description : [type, couleur, taille approximative]. Le navire semble [couler / en feu / chaviré / en avarie / abandonné]. Je fais route pour assister.' Obligation légale SOLAS."},
    {q:"Comment signaler un déversement de marchandises dangereuses ?",opts:["Produits chimiques déversés","MAYDAY/PAN-PAN. This is [vessel]. I have a spillage of [substance / IMDG class] in [location]. [X] tonnes/litres released. I require chemical/pollution response assistance.","Fuite de cargaison","Problème de produits chimiques"],correct:1,expl:"Déversement marchandises dangereuses SMCP : 'MAYDAY/PAN-PAN. Ici MV [nom]. J'ai un déversement de [description / classe IMDG X, numéro ONU XXXX] dans [cale / sur le pont / en mer]. Quantité estimée : [X] tonnes. La substance est [toxique / inflammable / corrosive / radioactive]. J'ai besoin d'une [intervention d'urgence chimique / lutte anti-pollution / assistance médicale pour [X] victimes].'"},
    {q:"Quelle est la phrase SMCP quand on reçoit un MAYDAY mais qu'on ne peut pas assister ?",opts:["Pas notre problème","[MRCC/Toutes stations]. Ici MV [nom]. J'ai reçu le MAYDAY de MV [navire en détresse]. Je suis dans l'impossibilité d'assister en raison de [position / type de navire / conditions]. Ma position est [lat/long].","On ne peut pas aider","Trop loin"],correct:1,expl:"Impossible d'assister SMCP : '[MRCC / Navire en détresse / Toutes stations]. Ici MV [nom]. J'ai reçu le MAYDAY de MV [nom]. Je suis dans l'impossibilité de prêter assistance en raison de [ma position à [X] milles / mon type de navire / conditions météo dangereuses]. Ma position est [lat/long]. Je continue à surveiller le canal 16.' Même si vous ne pouvez pas assister physiquement, vous pouvez relayer des informations."},
    {q:"Comment signaler un navire en feu au mouillage observé depuis la côte ?",opts:["Appeler les secours","[MRCC / Station côtière]. Ici [votre nom / indicatif]. Je signale un navire en feu au mouillage en [position / nom du mouillage]. Le navire semble être [décrire]. L'incendie est visible dans [emplacement]. J'ai besoin des services d'urgence maritimes.","Feu en mer","Navire en feu"],correct:1,expl:"Navire en feu observé depuis la côte SMCP : '[MRCC / Station côtière]. Ici [nom/indicatif]. Je signale un navire en feu au mouillage à [emplacement]. Position : [lat/long ou nom du mouillage]. Le navire mesure environ [X] mètres, [couleur], [pavillon si visible]. L'incendie est visible à [zone]. [X] personnes semblent être sur le pont. J'ai besoin des services d'incendie et de secours maritimes immédiatement.' Applicable à TOUTE personne observant une urgence maritime."},
    {q:"Quelle est la différence entre 'navire en détresse' et 'navire en difficulté' ?",opts:["C'est la même chose","Navire en détresse = situation MAYDAY avec danger immédiat de mort / naufrage. Navire en difficulté = PAN-PAN / problème grave mais sans danger immédiat.","La difficulté est plus grave","La détresse est moins grave"],correct:1,expl:"Détresse vs Difficulté SMCP : NAVIRE EN DÉTRESSE = niveau MAYDAY. Menace immédiate pour la vie ou le navire. Exemples : coulage, incendie incontrôlé, abandon. NAVIRE EN DIFFICULTÉ = niveau PAN-PAN. Problème grave nécessitant assistance mais sans danger immédiat. Exemples : panne moteur dérivant vers la côte (danger en développement mais non immédiat), urgence médicale, dommages structurels mais navire encore à flot. IMPORTANT : réévaluer constamment et passer de PAN-PAN à MAYDAY si la situation se détériore."},
  ],
  es:[
    {q:"¿Cuál es la frase SMCP para cancelar una falsa alerta DSC?",opts:["Lo siento, falsa alarma","[CH 16] Todas las estaciones. Aquí [nombre buque]. Cancelen la alerta de socorro transmitida a las [hora] UTC. Falsa alarma. Mi posición es [lat/long]. Mi buque no está en peligro. Cambio y fuera.","Detengan la alerta","No hay peligro"],correct:1,expl:"Cancelación de falsa alerta DSC SMCP: tras la activación accidental, cambiar al CH 16 y difundir: 'Todas las estaciones. Aquí [nombre buque]. Cancelen la alerta de socorro transmitida a las [hora] UTC. Falsa alarma. Mi buque no está en peligro. Mi posición es [lat/long]. Cambio y fuera.' Luego contactar con el MRCC en CH 16. Omisión de cancelación = respuesta SAR innecesaria + posibles multas."},
    {q:"¿Cómo se informa de un fallo de gobierno en SMCP?",opts:["Gobierno averiado","I have a steering failure. I am unable to manoeuvre. My vessel may be [heading towards danger / drifting]. I require [tug / anchor / immediate assistance].","No puedo gobernar","El timón no funciona"],correct:1,expl:"Fallo de gobierno SMCP: 'I have a steering failure. I am unable to manoeuvre. My vessel is [drifting / heading towards danger at X knots]. My position is [lat/long]. I require [tug assistance / pilot / anchor] to prevent [grounding / collision].' PAN-PAN (urgente) o MAYDAY (si peligro inmediato de vida)."},
    {q:"¿Qué significa 'taking on water' y cómo se informa?",opts:["Deportes acuáticos","I am taking on water in the [engine room / cargo hold / forward compartment]. Rate of flooding is [severe / moderate / controlled]. Bilge pumps are [running / insufficient].","Agua entrando","Mojarse"],correct:1,expl:"'Taking on water' SMCP: 'I am taking on water. Flooding is in [sala de máquinas / bodega / lastre / compartimiento de proa]. Rate is [severe / moderate / slow]. Bilge pumps are [running / not coping]. I [can / cannot] control the flooding. I require [pumping assistance / salvage / tug].' La tasa de inundación determina MAYDAY vs PAN-PAN."},
    {q:"¿Cómo se informa de un corrimiento de carga que causa inestabilidad?",opts:["La carga se corrió","I have a cargo shift. I have [X] degrees list to [port/starboard]. The vessel is unstable. I am [able/unable] to correct the situation. I [require/do not require] assistance.","La carga se movió","Se cayeron las cajas"],correct:1,expl:"Corrimiento de carga SMCP: 'I have a cargo shift. I have [X] degrees list to [port/starboard]. The list is [stable/increasing]. I am attempting to correct by [ballasting / shifting remaining cargo]. I [require / do not require] salvage assistance.' Escora > 10° por corrimiento = situación grave = PAN-PAN. Escora aumentando rápidamente = MAYDAY."},
    {q:"¿Cómo se solicita una evacuación médica (medevac) en SMCP?",opts:["Necesito un helicóptero","PAN-PAN PAN-PAN PAN-PAN. All stations. MV [name]. I have a medical emergency. I require immediate medical evacuation by helicopter. Patient condition: [describe]. My position [lat/long]. Wind [X] degrees [X] knots.","Médico urgente","Medevac necesaria"],correct:1,expl:"Evacuación médica SMCP: 'PAN-PAN PAN-PAN PAN-PAN. Todas las estaciones. Aquí MV [nombre]. Tengo una emergencia médica que requiere evacuación inmediata. Paciente: [edad, estado, signos vitales si se conocen]. Mi posición: Latitud [X], Longitud [X]. Viento [X] grados, [X] nudos. Estado de la mar [calma/moderada/fuerte]. Zona de aterrizaje/izado del helicóptero: [describir].'"},
    {q:"¿Cuál es la frase SMCP para informar de una persona desaparecida a bordo?",opts:["Alguien ha desaparecido","I have a missing person on board. Last seen at [time] UTC in [location on vessel]. Description: [age, clothing, physical description]. I am conducting a search on board.","Persona perdida","No encuentro a un tripulante"],correct:1,expl:"Persona desaparecida SMCP: 'I have a missing person on board. Last seen at [hora] UTC in [ubicación en el buque]. Description: [hombre/mujer, edad aproximada, altura, descripción de la ropa]. My current position is [lat/long]. I am conducting a thorough search of the vessel.' Si se sospecha MOB: actualizar inmediatamente a PAN-PAN 'Hombre al agua'."},
    {q:"¿Cómo se informa de una explosión a bordo?",opts:["¡Explosión!","MAYDAY MAYDAY MAYDAY. This is [vessel]. I have had an explosion in [location]. Fire is [under/not under] control. I have [X] casualties. I require immediate assistance. My position [lat/long].","Detonación en el buque","Gran explosión"],correct:1,expl:"Explosión SMCP: 'MAYDAY MAYDAY MAYDAY. Aquí MV [nombre] [×3]. MAYDAY MV [nombre]. Posición [lat/long]. He sufrido una explosión en [sala de máquinas / carga / tanque de combustible]. Los daños estructurales son [graves / desconocidos]. El incendio está [controlado / sin controlar]. Tengo [X] personas [muertas / heridas de gravedad / desaparecidas].'"},
    {q:"¿Qué es el 'MAYDAY RELAY' y quién puede transmitirlo?",opts:["Un MAYDAY retrasado","Retransmisión por cualquier buque de un MAYDAY recibido pero no acusado de recibo por la estación costera — cualquier buque que escuche un MAYDAY sin respuesta DEBE transmitirlo en relevo","Un MAYDAY de una estación repetidora","Un MAYDAY de reserva"],correct:1,expl:"MAYDAY RELAY: CUALQUIER buque que escuche un MAYDAY que la estación costera no parece haber acusado de recibo DEBE transmitirlo en relevo. No se requiere autorización. Formato: 'MAYDAY RELAY × 3. Todas las estaciones. Aquí [tu nombre de buque]. A las [hora] UTC recibí el siguiente MAYDAY del MV [nombre]: [repetir contenido original]. Cambio.' Es una obligación legal según el SOLAS."},
    {q:"¿Cómo comunicarse con un helicóptero SAR?",opts:["Agite los brazos","SAR helicopter, this is MV [name]. I am in position [lat/long]. Wind [X] degrees [X] knots. I have marked my position with [smoke / flare / SART]. I am ready to receive. Over.","Helicóptero aquí","SAR venid"],correct:1,expl:"Comunicación helicóptero SMCP: 'SAR Helicopter, aquí MV [nombre]. Estoy en posición Latitud [X], Longitud [X]. Viento [X] grados, [X] nudos. Estado de la mar [calma/moderada/fuerte]. He activado [SART / señal de humo / luz estroboscópica] para marcar mi posición. El paciente/tripulación está listo para la transferencia en [ubicación en cubierta].'"},
    {q:"¿Qué frase SMCP se usa cuando se ve otro buque en apuros sin señal de radio?",opts:["Nada","MAYDAY RELAY o PAN-PAN. Todas las estaciones. He avistado un buque en aparente peligro en posición [lat/long]. El buque parece estar [hundiéndose / en llamas / averiado]. Hago rumbo para asistir.","Informar al puerto","Ignorar"],correct:1,expl:"Buque en apuros avistado SMCP: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. Todas las estaciones. Aquí MV [nombre]. He avistado un buque en aparente peligro. Posición del buque en peligro: Latitud [X], Longitud [X]. Descripción: [tipo, color, tamaño aproximado]. El buque parece estar [hundiéndose / en llamas / zozobrado / averiado / abandonado]. Hago rumbo para asistir.' Obligación legal SOLAS."},
    {q:"¿Cómo se informa de un derrame de mercancías peligrosas?",opts:["Se derramaron productos químicos","MAYDAY/PAN-PAN. This is [vessel]. I have a spillage of [substance / IMDG class] in [location]. [X] tonnes/litres released. I require chemical/pollution response assistance.","Fuga de carga","Problema con sustancias químicas"],correct:1,expl:"Derrame de mercancías peligrosas SMCP: 'MAYDAY/PAN-PAN. Aquí MV [nombre]. Tengo un derrame de [descripción / clase IMDG X, número ONU XXXX] en [bodega / en cubierta / en el mar]. Cantidad estimada: [X] toneladas. La sustancia es [tóxica / inflamable / corrosiva / radiactiva]. Necesito una [intervención de emergencia química / control de la contaminación / asistencia médica para [X] víctimas].'"},
    {q:"¿Cuál es la frase SMCP cuando se recibe un MAYDAY pero no se puede asistir?",opts:["No es nuestro problema","[MRCC/Todas las estaciones]. Aquí MV [nombre]. He recibido el MAYDAY del MV [buque en peligro]. No puedo asistir debido a [posición / tipo de buque / condiciones]. Mi posición es [lat/long].","No podemos ayudar","Demasiado lejos"],correct:1,expl:"Imposible asistir SMCP: '[MRCC / Buque en peligro / Todas las estaciones]. Aquí MV [nombre]. He recibido el MAYDAY del MV [nombre]. Lamento no poder prestar asistencia debido a [mi posición a [X] millas de distancia / mi tipo de buque / condiciones meteorológicas peligrosas]. Mi posición es [lat/long]. Seguiré vigilando el canal 16.'"},
    {q:"¿Cómo se informa de un buque en llamas en el fondeadero observado desde tierra?",opts:["Llamar a emergencias","[MRCC / Estación costera]. Aquí [su nombre / indicativo]. Informo de un buque en llamas en el fondeadero en [posición / nombre del fondeadero]. El buque parece ser [describir]. El fuego es visible en [ubicación]. Necesito los servicios de emergencia marítima.","Fuego en el mar","Buque ardiendo"],correct:1,expl:"Buque en llamas observado desde tierra SMCP: '[MRCC / Estación costera]. Aquí [nombre/indicativo]. Informo de un buque en llamas en el fondeadero en [lugar]. Posición: [lat/long o nombre del fondeadero]. El buque mide aproximadamente [X] metros, [color], [pabellón si es visible]. El fuego es visible en [zona proa/popa/central]. [X] personas parecen estar en cubierta. Necesito los servicios de bomberos y rescate marítimo inmediatamente.'"},
    {q:"¿Cuál es la diferencia entre 'buque en peligro' y 'buque con dificultades'?",opts:["Son lo mismo","Buque en peligro = situación MAYDAY con peligro inmediato de muerte / hundimiento. Buque con dificultades = PAN-PAN / problema grave pero sin peligro inmediato.","Las dificultades son más graves","El peligro es menos grave"],correct:1,expl:"Peligro vs Dificultades SMCP: BUQUE EN PELIGRO = nivel MAYDAY. Amenaza inmediata para la vida o el buque. BUQUE CON DIFICULTADES = nivel PAN-PAN. Problema grave que requiere asistencia pero sin peligro inmediato. IMPORTANTE: las situaciones pueden escalar — evaluar constantemente y actualizar de PAN-PAN a MAYDAY si la situación empeora."},
  ],
  pt:[
    {q:"Qual é a frase SMCP para cancelar um falso alerta ASN?",opts:["Desculpe, falso alarme","[CH 16] Todas as estações. Aqui [nome navio]. Cancelem o alerta de socorro transmitido às [hora] UTC. Falso alarme. A minha posição é [lat/long]. O meu navio não está em perigo. Mudança e fora.","Parem o alerta","Sem perigo"],correct:1,expl:"Cancelamento de falso alerta ASN SMCP: após ativação acidental, mudar para CH 16 e difundir: 'Todas as estações. Aqui [nome navio]. Cancelem o alerta de socorro transmitido às [hora] UTC. Falso alarme. O meu navio não está em perigo. A minha posição é [lat/long]. Mudança e fora.' Depois contactar o MRCC no CH 16. Omissão de cancelamento = resposta SAR desnecessária + possíveis multas."},
    {q:"Como se reporta uma avaria de leme em SMCP?",opts:["Leme avariado","I have a steering failure. I am unable to manoeuvre. My vessel may be [heading towards danger / drifting]. I require [tug / anchor / immediate assistance].","Não consigo governar","O leme não funciona"],correct:1,expl:"Avaria de leme SMCP: 'I have a steering failure. I am unable to manoeuvre. My vessel is [drifting / heading towards danger at X knots]. My position is [lat/long]. I require [tug assistance / pilot / anchor] to prevent [grounding / collision].' PAN-PAN (urgente) ou MAYDAY (se perigo imediato de vida)."},
    {q:"O que significa 'taking on water' e como se reporta?",opts:["Desportos aquáticos","I am taking on water in the [engine room / cargo hold / forward compartment]. Rate of flooding is [severe / moderate / controlled]. Bilge pumps are [running / insufficient].","Água a entrar","Molhar-se"],correct:1,expl:"'Taking on water' SMCP: 'I am taking on water. Flooding is in [casa das máquinas / porão / lastro / compartimento de proa]. Rate is [severe / moderate / slow]. Bilge pumps are [running / not coping]. I [can / cannot] control the flooding. I require [pumping assistance / salvage / tug].' A taxa de inundação determina MAYDAY vs PAN-PAN."},
    {q:"Como se reporta um deslizamento de carga que causa instabilidade?",opts:["A carga deslizou","I have a cargo shift. I have [X] degrees list to [port/starboard]. The vessel is unstable. I am [able/unable] to correct the situation. I [require/do not require] assistance.","A carga moveu-se","As caixas caíram"],correct:1,expl:"Deslizamento de carga SMCP: 'I have a cargo shift. I have [X] degrees list to [port/starboard]. The list is [stable/increasing]. I am attempting to correct by [ballasting / shifting remaining cargo]. I [require / do not require] salvage assistance.' Adornamento > 10° por deslizamento = situação grave = PAN-PAN. Adornamento a aumentar rapidamente = MAYDAY."},
    {q:"Como se solicita uma evacuação médica (medevac) em SMCP?",opts:["Preciso de um helicóptero","PAN-PAN PAN-PAN PAN-PAN. All stations. MV [name]. I have a medical emergency. I require immediate medical evacuation by helicopter. Patient condition: [describe]. My position [lat/long]. Wind [X] degrees [X] knots.","Médico urgente","Medevac necessária"],correct:1,expl:"Evacuação médica SMCP: 'PAN-PAN PAN-PAN PAN-PAN. Todas as estações. Aqui MV [nome]. Tenho uma emergência médica que requer evacuação imediata. Paciente: [idade, estado, sinais vitais se conhecidos]. A minha posição: Latitude [X], Longitude [X]. Vento [X] graus, [X] nós. Estado do mar [calmo/moderado/agitado]. Zona de aterragem/guincho do helicóptero: [descrever].'"},
    {q:"Qual é a frase SMCP para reportar uma pessoa desaparecida a bordo?",opts:["Alguém desapareceu","I have a missing person on board. Last seen at [time] UTC in [location on vessel]. Description: [age, clothing, physical description]. I am conducting a search on board.","Pessoa perdida","Não encontro um tripulante"],correct:1,expl:"Pessoa desaparecida SMCP: 'I have a missing person on board. Last seen at [hora] UTC in [localização no navio]. Description: [homem/mulher, idade aproximada, altura, descrição das roupas]. My current position is [lat/long]. I am conducting a thorough search of the vessel.' Se MOB suspeito: atualizar imediatamente para PAN-PAN 'Homem ao mar'."},
    {q:"Como se reporta uma explosão a bordo?",opts:["Explosão!","MAYDAY MAYDAY MAYDAY. This is [vessel]. I have had an explosion in [location]. Fire is [under/not under] control. I have [X] casualties. I require immediate assistance. My position [lat/long].","Detonação no navio","Grande explosão"],correct:1,expl:"Explosão SMCP: 'MAYDAY MAYDAY MAYDAY. Aqui MV [nome] [×3]. MAYDAY MV [nome]. Posição [lat/long]. Tive uma explosão na [casa das máquinas / carga / tanque de combustível]. Os danos estruturais são [graves / desconhecidos]. O incêndio está [controlado / fora de controlo]. Tenho [X] pessoas [mortas / gravemente feridas / desaparecidas].'"},
    {q:"O que é o 'MAYDAY RELAY' e quem pode transmiti-lo?",opts:["Um MAYDAY atrasado","Retransmissão por qualquer navio de um MAYDAY recebido mas não acusado de receção pela estação costeira — qualquer navio que ouça um MAYDAY sem resposta DEVE transmiti-lo","Um MAYDAY de uma estação repetidora","Um MAYDAY de reserva"],correct:1,expl:"MAYDAY RELAY: QUALQUER navio que ouça um MAYDAY que a estação costeira não parece ter acusado de receção DEVE transmiti-lo como relé. Não é necessária autorização. Formato: 'MAYDAY RELAY × 3. Todas as estações. Aqui [nome do seu navio]. Às [hora] UTC recebi o seguinte MAYDAY do MV [nome]: [repetir conteúdo original]. Mudança.' É uma obrigação legal segundo o SOLAS."},
    {q:"Como comunicar com um helicóptero SAR?",opts:["Acenar com os braços","SAR helicopter, this is MV [name]. I am in position [lat/long]. Wind [X] degrees [X] knots. I have marked my position with [smoke / flare / SART]. I am ready to receive. Over.","Helicóptero aqui","SAR venham"],correct:1,expl:"Comunicação com helicóptero SMCP: 'SAR Helicopter, aqui MV [nome]. Estou em posição Latitude [X], Longitude [X]. Vento [X] graus, [X] nós. Estado do mar [calmo/moderado/agitado]. Ativei [SART / sinal de fumo / luz estroboscópica] para marcar a minha posição. O paciente/tripulação está pronto para transferência em [localização no convés].'"},
    {q:"Que frase SMCP se usa quando se vê outro navio em perigo sem sinal de rádio?",opts:["Nada","MAYDAY RELAY ou PAN-PAN. Todas as estações. Avistei um navio em aparente perigo em posição [lat/long]. O navio parece estar [a afundar / em chamas / avariado]. Estou a fazer rota para assistir.","Reportar ao porto","Ignorar"],correct:1,expl:"Navio em perigo avistado SMCP: 'MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY. Todas as estações. Aqui MV [nome]. Avistei um navio em aparente perigo. Posição do navio em perigo: Latitude [X], Longitude [X]. Descrição: [tipo, cor, tamanho aproximado]. O navio parece estar [a afundar / em chamas / capotado / avariado / abandonado]. Estou a fazer rota para assistir.' Obrigação legal SOLAS."},
    {q:"Como se reporta um derrame de mercadorias perigosas?",opts:["Produtos químicos derramados","MAYDAY/PAN-PAN. This is [vessel]. I have a spillage of [substance / IMDG class] in [location]. [X] tonnes/litres released. I require chemical/pollution response assistance.","Fuga de carga","Problema com substâncias químicas"],correct:1,expl:"Derrame de mercadorias perigosas SMCP: 'MAYDAY/PAN-PAN. Aqui MV [nome]. Tenho um derrame de [descrição / classe IMDG X, número ONU XXXX] em [porão / no convés / no mar]. Quantidade estimada: [X] toneladas. A substância é [tóxica / inflamável / corrosiva / radioativa]. Preciso de uma [intervenção de emergência química / controlo de poluição / assistência médica para [X] vítimas].'"},
    {q:"Qual é a frase SMCP quando se recebe um MAYDAY mas não se pode assistir?",opts:["Não é o nosso problema","[MRCC/Todas as estações]. Aqui MV [nome]. Recebi o MAYDAY do MV [navio em perigo]. Não me é possível assistir devido a [posição / tipo de navio / condições]. A minha posição é [lat/long].","Não podemos ajudar","Demasiado longe"],correct:1,expl:"Impossível assistir SMCP: '[MRCC / Navio em perigo / Todas as estações]. Aqui MV [nome]. Recebi o MAYDAY do MV [nome]. Lamento não poder prestar assistência devido a [a minha posição a [X] milhas de distância / o meu tipo de navio / condições meteorológicas perigosas]. A minha posição é [lat/long]. Continuarei a monitorizar o canal 16.'"},
    {q:"Como se reporta um navio em chamas no fundeadouro observado de terra?",opts:["Ligar para os bombeiros","[MRCC / Estação costeira]. Aqui [nome / indicativo]. Reporto um navio em chamas no fundeadouro em [posição / nome do fundeadouro]. O navio parece ser [descrever]. As chamas são visíveis em [localização]. Preciso dos serviços de emergência marítima.","Fogo no mar","Navio a arder"],correct:1,expl:"Navio em chamas observado de terra SMCP: '[MRCC / Estação costeira]. Aqui [nome/indicativo]. Reporto um navio em chamas no fundeadouro em [local]. Posição: [lat/long ou nome do fundeadouro]. O navio tem aproximadamente [X] metros, [cor], [pavilhão se visível]. As chamas são visíveis na [zona de proa/popa/central]. [X] pessoas parecem estar no convés. Preciso dos serviços de incêndio e socorro marítimo imediatamente.'"},
    {q:"Qual é a diferença entre 'navio em perigo' e 'navio em dificuldade'?",opts:["São a mesma coisa","Navio em perigo = situação MAYDAY com perigo imediato de morte / naufrágio. Navio em dificuldade = PAN-PAN / problema grave mas sem perigo imediato.","A dificuldade é mais grave","O perigo é menos grave"],correct:1,expl:"Perigo vs Dificuldade SMCP: NAVIO EM PERIGO = nível MAYDAY. Ameaça imediata para a vida ou o navio. NAVIO EM DIFICULDADE = nível PAN-PAN. Problema grave que requer assistência mas sem perigo imediato. IMPORTANTE: as situações podem escalar — reavaliar constantemente e atualizar de PAN-PAN para MAYDAY se a situação se deteriorar."},
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
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.emer},${C.urgent})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4,fontFamily:"'Courier New',monospace"}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.emer},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:10},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.3}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.emer}33,${C.urgent}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:`${C.emer}15`,border:`1px solid ${C.emer}44`,fontSize:14,color:C.emer,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.emer}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.emer,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.emer:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4,fontFamily:"'Courier New',monospace"}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white,fontFamily:"'Nunito',sans-serif"}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.emer},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    en:{
      badge:"🆘 Maritime English SMCP · Lesson 3/8 · ⭐ Premium · 200 XP",
      title:"Safety & Emergency SMCP",
      intro:"In maritime emergencies, every second counts and every word matters. SMCP emergency phrases are precisely standardized so that any mariner worldwide can understand and respond, regardless of language background.\n\nThis lesson covers MAYDAY procedure, PAN-PAN/SÉCURITÉ, emergency flashcards for fire/collision/MOB/grounding, and the priority signal hierarchy.",
      p1:"PART 1 — MAYDAY PROCEDURE",s1t:"DSC ch.70 first → MAYDAY vocal × 3 → MRCC response",
      s1:"MAYDAY STRUCTURE (6 elements):\n1. MAYDAY MAYDAY MAYDAY\n2. This is [NAME] [NAME] [NAME]\n3. MAYDAY [NAME]\n4. Position [Lat/Long]\n5. Nature of distress\n6. Persons on board + assistance + OVER\n\nALWAYS DSC ch.70 FIRST if available\nThen vocal MAYDAY on CH 16 at 25W",
      p2:"PART 2 — EMERGENCY FLASHCARDS",s1t:"Fire · Collision · MOB · Grounding",
      s2:"KEY EMERGENCY PHRASES:\n\nFIRE:\n'I have a fire in the engine room.\nFire is not under control.'\n\nCOLLISION:\n'I have been in collision with [vessel].\nI am taking on water.'\n\nMAN OVERBOARD:\n'Man overboard! Starboard side.\nTime [UTC]. Position [lat/long].'\n\nGROUNDING:\n'I have grounded at [position].\nI require tug/salvage assistance.'",
      p3:"PART 3 — PRIORITY SIGNALS",s1t:"MAYDAY · PAN-PAN · SÉCURITÉ comparison",
      s3:"HIERARCHY (highest to lowest):\n\nMAYDAY = Immediate danger of death\n→ 'Fire is out of control / Sinking'\n\nPAN-PAN = Urgent but not immediately fatal\n→ 'Sick crew / Engine failure'\n\nSÉCURITÉ = Safety information\n→ 'Uncharted wreck / Weather warning'\n\nRULE: ALWAYS choose the highest\nappropriate level — reassess constantly",
      p4:"PART 4 — EMERGENCY SCENARIO QUIZ",s1t:"5 scenarios — MAYDAY / PAN-PAN / SÉCURITÉ",
      s4:"DECISION GUIDE:\n\nIs there IMMEDIATE danger of death? → MAYDAY\nIs the situation serious but not yet fatal? → PAN-PAN\nIs it information for other vessels? → SÉCURITÉ\n\nIF IN DOUBT → use MAYDAY\nYou can always downgrade — but\nyou cannot undo a delayed call",
      p5:"🎯 EXERCISES",p6:"📝 QUESTION BANK — 15 QUESTIONS",
      sumT:"SUMMARY — SAFETY & EMERGENCY L3",
      sumP:["MAYDAY = MAYDAY×3 + NAME×3 + MAYDAY + NAME + POSITION + NATURE + PERSONS + OVER","DSC ch.70 BEFORE vocal MAYDAY if available","PAN-PAN = urgent but not immediately life-threatening","SÉCURITÉ = safety information for other vessels","Fire: 'fire is under/not under control' — key distinction","MOB: 'Man overboard! [side]. Time [UTC]. Position [lat/long]. PAN-PAN'","MAYDAY RELAY: any vessel MUST relay unanswered MAYDAY","SEELONCE FEENEE = MRCC cancels distress silence"],
      learnedP:["MAYDAY structure: 6 elements in correct order","Priority signals: MAYDAY → PAN-PAN → SÉCURITÉ","Emergency phrases: fire · collision · MOB · grounding","MAYDAY RELAY obligation under SOLAS","Distress cancellation: SEELONCE FEENEE"],
    },
    fr:{
      badge:"🆘 Anglais Maritime SMCP · Leçon 3/8 · ⭐ Premium · 200 XP",
      title:"SMCP Sécurité & Urgences",
      intro:"En urgence maritime, chaque seconde compte et chaque mot a son importance. Les phrases SMCP d'urgence sont standardisées pour que tout marin puisse comprendre et répondre, quelle que soit sa langue maternelle.",
      p1:"PARTIE 1 — PROCÉDURE MAYDAY",s1t:"DSC ch.70 en premier → MAYDAY vocal × 3 → Réponse MRCC",
      s1:"STRUCTURE MAYDAY (6 éléments) :\n1. MAYDAY MAYDAY MAYDAY\n2. Ici [NOM] [NOM] [NOM]\n3. MAYDAY [NOM]\n4. Position [Lat/Long]\n5. Nature de la détresse\n6. Personnes à bord + assistance + Terminé\n\nTOUJOURS DSC ch.70 EN PREMIER si disponible\nPuis MAYDAY vocal sur CH 16 à 25W",
      p2:"PARTIE 2 — FICHES URGENCES",s1t:"Incendie · Collision · MOB · Échouage",
      s2:"PHRASES CLÉS D'URGENCE :\n\nINCENDIE :\n'I have a fire in the engine room.\nFire is not under control.'\n\nCOLLISION :\n'I have been in collision with [navire].\nI am taking on water.'\n\nHOMME À LA MER :\n'Man overboard! Starboard side.\nTime [UTC]. Position [lat/long].'\n\nÉCHOUAGE :\n'I have grounded at [position].\nI require tug/salvage assistance.'",
      p3:"PARTIE 3 — SIGNAUX PRIORITAIRES",s1t:"MAYDAY · PAN-PAN · SÉCURITÉ comparaison",
      s3:"HIÉRARCHIE (du plus au moins urgent) :\n\nMAYDAY = Danger immédiat de mort\n→ 'Incendie incontrôlé / Coulage'\n\nPAN-PAN = Urgent mais pas immédiatement fatal\n→ 'Équipier malade / Panne de machine'\n\nSÉCURITÉ = Information de sécurité\n→ 'Épave non cartographiée / Alerte météo'\n\nRÈGLE : Toujours choisir le niveau le\nplus élevé approprié — réévaluer en permanence",
      p4:"PARTIE 4 — QUIZ SCÉNARIOS D'URGENCE",s1t:"5 scénarios — MAYDAY / PAN-PAN / SÉCURITÉ",
      s4:"GUIDE DE DÉCISION :\n\nDanger de mort IMMÉDIAT ? → MAYDAY\nSituation grave mais pas encore fatale ? → PAN-PAN\nInformation pour les autres navires ? → SÉCURITÉ\n\nEN CAS DE DOUTE → utiliser MAYDAY\nOn peut toujours rétablir — mais on ne peut pas\nannuler le retard d'un appel tardif",
      p5:"🎯 EXERCICES",p6:"📝 BANQUE 15 QUESTIONS",
      sumT:"RÉSUMÉ — SÉCURITÉ & URGENCES L3",
      sumP:["MAYDAY = MAYDAY×3 + NOM×3 + MAYDAY + NOM + POSITION + NATURE + PERSONNES + Terminé","DSC ch.70 AVANT le MAYDAY vocal si disponible","PAN-PAN = urgent mais sans danger immédiat de mort","SÉCURITÉ = information de sécurité pour les autres navires","Incendie : 'fire is under/not under control' — distinction clé","MOB : 'Man overboard! [côté]. Time [UTC]. Position [lat/long]. PAN-PAN'","MAYDAY RELAY : tout navire DOIT relayer un MAYDAY sans réponse","SEELONCE FEENEE = le MRCC annule le silence de détresse"],
      learnedP:["Structure MAYDAY : 6 éléments dans l'ordre correct","Signaux prioritaires : MAYDAY → PAN-PAN → SÉCURITÉ","Phrases urgence : incendie · collision · MOB · échouage","Obligation MAYDAY RELAY selon SOLAS","Annulation détresse : SEELONCE FEENEE"],
    },
    es:{
      badge:"🆘 Inglés Marítimo SMCP · Lección 3/8 · ⭐ Premium · 200 XP",
      title:"SMCP Seguridad y Urgencias",
      intro:"En emergencias marítimas, cada segundo cuenta y cada palabra importa. Las frases SMCP de emergencia están estandarizadas para que cualquier marino las entienda y responda.",
      p1:"PARTE 1 — PROCEDIMIENTO MAYDAY",s1t:"LSD ch.70 primero → MAYDAY vocal × 3 → Respuesta MRCC",
      s1:"ESTRUCTURA MAYDAY (6 elementos):\n1. MAYDAY MAYDAY MAYDAY\n2. Aquí [NOMBRE] [NOMBRE] [NOMBRE]\n3. MAYDAY [NOMBRE]\n4. Posición [Lat/Long]\n5. Naturaleza de la emergencia\n6. Personas a bordo + asistencia + Cambio\n\nSIEMPRE LSD ch.70 PRIMERO si disponible\nLuego MAYDAY vocal en CH 16 a 25W",
      p2:"PARTE 2 — FICHAS DE URGENCIA",s1t:"Incendio · Colisión · MOB · Varada",
      s2:"FRASES CLAVE DE URGENCIA:\n\nINCENDIO: 'I have a fire in the engine room. Fire is not under control.'\nCOLISIÓN: 'I have been in collision. I am taking on water.'\nHOMBRE AL AGUA: 'Man overboard! Starboard. Time [UTC]. Position.'\nVARADA: 'I have grounded. I require salvage assistance.'",
      p3:"PARTE 3 — SEÑALES PRIORITARIAS",s1t:"MAYDAY · PAN-PAN · SÉCURITÉ comparación",
      s3:"JERARQUÍA:\nMAYDAY = Peligro inmediato de muerte\nPAN-PAN = Urgente pero no inmediatamente fatal\nSÉCURITÉ = Información de seguridad\n\nREGLA: Usar el nivel más alto apropiado\nSi hay duda → MAYDAY",
      p4:"PARTE 4 — QUIZ ESCENARIOS DE URGENCIA",s1t:"5 escenarios — MAYDAY / PAN-PAN / SÉCURITÉ",
      s4:"GUÍA DE DECISIÓN:\n¿Peligro de muerte INMEDIATO? → MAYDAY\n¿Situación grave pero no fatal? → PAN-PAN\n¿Información para otros buques? → SÉCURITÉ\nEN CASO DE DUDA → MAYDAY",
      p5:"🎯 EJERCICIOS",p6:"📝 BANCO 15 PREGUNTAS",
      sumT:"RESUMEN — SEGURIDAD Y URGENCIAS L3",
      sumP:["MAYDAY = MAYDAY×3 + NOMBRE×3 + MAYDAY + NOMBRE + POSICIÓN + NATURALEZA + PERSONAS + Cambio","LSD ch.70 ANTES del MAYDAY vocal si disponible","PAN-PAN = urgente pero sin peligro inmediato de muerte","SÉCURITÉ = información de seguridad para los demás buques","Incendio: 'fire is under/not under control' — distinción clave","MOB: 'Man overboard! [lado]. Time [UTC]. Position [lat/long]. PAN-PAN'","MAYDAY RELAY: cualquier buque DEBE transmitir en relevo un MAYDAY sin respuesta","SEELONCE FEENEE = el MRCC cancela el silencio de socorro"],
      learnedP:["Estructura MAYDAY: 6 elementos en el orden correcto","Señales prioritarias: MAYDAY → PAN-PAN → SÉCURITÉ","Frases urgencia: incendio · colisión · MOB · varada","Obligación MAYDAY RELAY según SOLAS","Cancelación socorro: SEELONCE FEENEE"],
    },
    pt:{
      badge:"🆘 Inglês Marítimo SMCP · Lição 3/8 · ⭐ Premium · 200 XP",
      title:"SMCP Segurança e Urgências",
      intro:"Em emergências marítimas, cada segundo conta e cada palavra importa. As frases SMCP de emergência são padronizadas para que qualquer marinheiro as compreenda e responda.",
      p1:"PARTE 1 — PROCEDIMENTO MAYDAY",s1t:"ASN ch.70 primeiro → MAYDAY vocal × 3 → Resposta MRCC",
      s1:"ESTRUTURA MAYDAY (6 elementos):\n1. MAYDAY MAYDAY MAYDAY\n2. Aqui [NOME] [NOME] [NOME]\n3. MAYDAY [NOME]\n4. Posição [Lat/Long]\n5. Natureza do perigo\n6. Pessoas a bordo + assistência + Mudança\n\nSEMPRE ASN ch.70 PRIMEIRO se disponível\nDepois MAYDAY vocal no CH 16 a 25W",
      p2:"PARTE 2 — FICHAS DE URGÊNCIA",s1t:"Incêndio · Colisão · MOB · Encalhe",
      s2:"FRASES CHAVE DE URGÊNCIA:\n\nINCÊNDIO: 'I have a fire in the engine room. Fire is not under control.'\nCOLISÃO: 'I have been in collision. I am taking on water.'\nHOMEM AO MAR: 'Man overboard! Starboard. Time [UTC]. Position.'\nENCALHE: 'I have grounded. I require salvage assistance.'",
      p3:"PARTE 3 — SINAIS PRIORITÁRIOS",s1t:"MAYDAY · PAN-PAN · SÉCURITÉ comparação",
      s3:"HIERARQUIA:\nMAYDAY = Perigo imediato de morte\nPAN-PAN = Urgente mas não imediatamente fatal\nSÉCURITÉ = Informação de segurança\n\nREGRA: Usar o nível mais alto adequado\nEm caso de dúvida → MAYDAY",
      p4:"PARTE 4 — QUIZ CENÁRIOS DE URGÊNCIA",s1t:"5 cenários — MAYDAY / PAN-PAN / SÉCURITÉ",
      s4:"GUIA DE DECISÃO:\nPerigo de morte IMEDIATO? → MAYDAY\nSituação grave mas não fatal? → PAN-PAN\nInformação para outros navios? → SÉCURITÉ\nEM CASO DE DÚVIDA → MAYDAY",
      p5:"🎯 EXERCÍCIOS",p6:"📝 BANCO 15 QUESTÕES",
      sumT:"RESUMO — SEGURANÇA E URGÊNCIAS L3",
      sumP:["MAYDAY = MAYDAY×3 + NOME×3 + MAYDAY + NOME + POSIÇÃO + NATUREZA + PESSOAS + Mudança","ASN ch.70 ANTES do MAYDAY vocal se disponível","PAN-PAN = urgente mas sem perigo imediato de morte","SÉCURITÉ = informação de segurança para os outros navios","Incêndio: 'fire is under/not under control' — distinção chave","MOB: 'Man overboard! [lado]. Time [UTC]. Position [lat/long]. PAN-PAN'","MAYDAY RELAY: qualquer navio DEVE transmitir como relé um MAYDAY sem resposta","SEELONCE FEENEE = o MRCC cancela o silêncio de perigo"],
      learnedP:["Estrutura MAYDAY: 6 elementos na ordem correta","Sinais prioritários: MAYDAY → PAN-PAN → SÉCURITÉ","Frases urgência: incêndio · colisão · MOB · encalhe","Obrigação MAYDAY RELAY segundo SOLAS","Cancelamento perigo: SEELONCE FEENEE"],
    },
  };
  return d[lang]||d.en;
};

export default function LessonSMCP_L3({ lang="en", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.en;const quiz=QUIZ[lang]||QUIZ.en;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#0e0002 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.emer}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.emer,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🆘 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/8":lang==="en"?"Lesson 3/8":lang==="es"?"Lección 3/8":"Lição 3/8"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.emer,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.emer},${C.urgent},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.emer}15`,border:`1px solid ${C.emer}44`,fontSize:11,color:C.emer,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.emer}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="🆘" text={lc.p1} color={C.emer}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,background:"rgba(20,0,0,0.7)",border:`1px solid ${C.emer}22`}}>
              <div style={{fontSize:11,color:C.emer,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🆘 {lang==="fr"?"SIMULATEUR PROCÉDURE MAYDAY":lang==="en"?"MAYDAY PROCEDURE SIMULATOR":lang==="es"?"SIMULADOR PROCEDIMIENTO MAYDAY":"SIMULADOR PROCEDIMENTO MAYDAY"}</div>
              <MaydaySimulatorSVG lang={lang}/>
            </Card>
            <SL icon="🃏" text={lc.p2} color={C.urgent}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.urgent}22`}}>
              <div style={{fontSize:11,color:C.urgent,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🃏 {lang==="fr"?"FICHES URGENCES":lang==="en"?"EMERGENCY FLASHCARDS":lang==="es"?"FICHAS DE URGENCIA":"FICHAS DE EMERGÊNCIA"}</div>
              <EmergencyPhrasesSVG lang={lang}/>
            </Card>
            <SL icon="📢" text={lc.p3} color={C.safety}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.safety}33`}}>
              <div style={{fontSize:11,color:C.safety,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📢 MAYDAY · PAN-PAN · SÉCURITÉ</div>
              <PrioritySignalsSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p4} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎯 {lang==="fr"?"QUIZ SCÉNARIOS D'URGENCE":lang==="en"?"EMERGENCY SCENARIO QUIZ":lang==="es"?"QUIZ ESCENARIOS URGENCIA":"QUIZ CENÁRIOS DE EMERGÊNCIA"}</div>
              <EmergencyQuizSVG lang={lang}/>
            </Card>
            <SL icon="📝" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="📚" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>
            <Card style={{marginBottom:14,background:`${C.emer}08`,border:`1px solid ${C.emer}22`}}>
              <div style={{fontSize:11,color:C.emer,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.emer,fontWeight:700,fontFamily:"'Courier New',monospace"}}>✓</span>{pt}</div>)}
            </Card>
            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.emer},${C.urgent},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:`0 10px 36px ${C.emer}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Safety & Emergency SMCP</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 3":lang==="en"?"Lesson 3":lang==="es"?"Lección 3":"Lição 3"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.emer}15`,border:`1px solid ${C.emer}55`,fontSize:14,color:C.emer,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.emer,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.emer},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 8px 28px ${C.emer}33`,marginBottom:10}}>
              {lang==="fr"?"LEÇON 4 — NAVIGATION & MANŒUVRES →":lang==="en"?"LESSON 4 — NAVIGATION & MANEUVERING →":lang==="es"?"LECCIÓN 4 — NAVEGACIÓN Y MANIOBRAS →":"LIÇÃO 4 — NAVEGAÇÃO E MANOBRAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
