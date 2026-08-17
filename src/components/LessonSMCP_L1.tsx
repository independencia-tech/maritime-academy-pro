// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  smcp:"#00e5ff", watch:"#7bed9f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Maritime English SMCP", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Maritime English SMCP", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Inglés Marítimo SMCP", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Inglês Marítimo SMCP", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — WATCH HANDOVER SIMULATOR
// ══════════════════════════════════════
function WatchHandoverSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [showFr, setShowFr] = useState(false);

  const dialogues = [
    { speaker:"OOW (outgoing)", role:{fr:"OOW sortant",en:"Outgoing OOW",es:"OOW saliente",pt:"OOW saindo"},
      smcp:"Good evening. I am ready to hand over the watch.",
      tr:{fr:"Bonsoir. Je suis prêt à transmettre le quart.",es:"Buenas noches. Estoy listo para entregar la guardia.",pt:"Boa noite. Estou pronto para entregar o quarto."},
      context:{fr:"PHRASE D'OUVERTURE du relève de quart\n→ Toujours initier avec cette phrase\n→ Confirmer que le quart est PRÊT à être transmis\n→ Pas de transmission si conditions dangereuses",en:"OPENING PHRASE of watch handover\n→ Always initiate with this phrase\n→ Confirm the watch is READY to be handed over\n→ No handover in dangerous conditions",es:"FRASE DE APERTURA del cambio de guardia\n→ Siempre iniciar con esta frase\n→ Confirmar que la guardia está LISTA para transmitirse\n→ Sin transmisión en condiciones peligrosas",pt:"FRASE DE ABERTURA da rendição de quarto\n→ Sempre iniciar com esta frase\n→ Confirmar que o quarto está PRONTO para ser transmitido\n→ Sem transmissão em condições perigosas"} },
    { speaker:"OOW (incoming)", role:{fr:"OOW entrant",en:"Incoming OOW",es:"OOW entrante",pt:"OOW entrando"},
      smcp:"What is the position of the vessel?",
      tr:{fr:"Quelle est la position du navire ?",es:"¿Cuál es la posición del buque?",pt:"Qual é a posição do navio?"},
      context:{fr:"PREMIÈRE QUESTION obligatoire\n→ Position du navire (lat/long ou relèvement)\n→ Méthode de positionnement utilisée (GPS/radar/visuel)\n→ Heure de la dernière vérification de position",en:"FIRST MANDATORY QUESTION\n→ Vessel position (lat/long or bearing)\n→ Positioning method used (GPS/radar/visual)\n→ Time of last position fix",es:"PRIMERA PREGUNTA obligatoria\n→ Posición del buque (lat/long o marcación)\n→ Método de posicionamiento utilizado\n→ Hora de la última verificación de posición",pt:"PRIMEIRA PERGUNTA obrigatória\n→ Posição do navio (lat/long ou marcação)\n→ Método de posicionamento utilizado\n→ Hora da última verificação de posição"} },
    { speaker:"OOW (outgoing)", role:{fr:"OOW sortant",en:"Outgoing OOW",es:"OOW saliente",pt:"OOW saindo"},
      smcp:"Our position is Latitude 43°12.5'N, Longitude 007°05.3'E. Last fix was at 0345 UTC by GPS.",
      tr:{fr:"Notre position est Latitude 43°12,5'N, Longitude 007°05,3'E. Dernier point à 0345 UTC par GPS.",es:"Nuestra posición es Latitud 43°12,5'N, Longitud 007°05,3'E. Última posición a las 0345 UTC por GPS.",pt:"A nossa posição é Latitude 43°12,5'N, Longitude 007°05,3'E. Último ponto às 0345 UTC por GPS."},
      context:{fr:"FORMAT STANDARD de position SMCP\n→ Toujours : Latitude d'abord, puis Longitude\n→ Format : degrés + minutes décimales\n→ Toujours préciser N/S et E/W\n→ Toujours indiquer la méthode et l'heure\n\nSMCP RÈGLE : toujours indiquer le mode de positionnement\n(GPS · radar · visuel · ECDIS)",en:"STANDARD SMCP position format\n→ Always: Latitude first, then Longitude\n→ Format: degrees + decimal minutes\n→ Always specify N/S and E/W\n→ Always state method and time\n\nSMCP RULE: always state positioning method\n(GPS · radar · visual · ECDIS)",es:"FORMATO ESTÁNDAR de posición SMCP\n→ Siempre: Latitud primero, luego Longitud\n→ Formato: grados + minutos decimales\n→ Siempre especificar N/S y E/W\n→ Siempre indicar el método y la hora",pt:"FORMATO PADRÃO de posição SMCP\n→ Sempre: Latitude primeiro, depois Longitude\n→ Formato: graus + minutos decimais\n→ Sempre especificar N/S e E/W\n→ Sempre indicar o método e a hora"} },
    { speaker:"OOW (incoming)", role:{fr:"OOW entrant",en:"Incoming OOW",es:"OOW entrante",pt:"OOW entrando"},
      smcp:"What is the course and speed?",
      tr:{fr:"Quel est le cap et la vitesse ?",es:"¿Cuál es el rumbo y la velocidad?",pt:"Qual é o rumo e a velocidade?"},
      context:{fr:"DEUXIÈME QUESTION standard du relève\n→ Course = cap magnétique ou vrai (préciser !)\n→ Speed = vitesse fond (SOG) ou eau (STW)\n→ Toujours préciser la référence\n\nSMCP DISTINCTION :\nMagnetic course vs True course\nSpeed Over Ground (SOG) vs Speed Through Water (STW)",en:"SECOND STANDARD QUESTION in handover\n→ Course = magnetic or true (specify!)\n→ Speed = SOG or STW\n→ Always specify the reference\n\nSMCP DISTINCTION:\nMagnetic course vs True course\nSpeed Over Ground (SOG) vs Speed Through Water (STW)",es:"SEGUNDA PREGUNTA estándar del cambio\n→ Rumbo = magnético o verdadero (¡especificar!)\n→ Velocidad = SOG o STW\n→ Siempre especificar la referencia",pt:"SEGUNDA PERGUNTA padrão na rendição\n→ Rumo = magnético ou verdadeiro (especificar!)\n→ Velocidade = SOG ou STW\n→ Sempre especificar a referência"} },
    { speaker:"OOW (outgoing)", role:{fr:"OOW sortant",en:"Outgoing OOW",es:"OOW saliente",pt:"OOW saindo"},
      smcp:"Course is 275 degrees true. Speed is 14.5 knots. Engine is on full ahead.",
      tr:{fr:"Le cap est 275 degrés vrai. La vitesse est 14,5 nœuds. Machines en avant toute.",es:"El rumbo es 275 grados verdadero. La velocidad es 14,5 nudos. Máquinas avante toda.",pt:"O rumo é 275 graus verdadeiro. A velocidade é 14,5 nós. Máquinas a toda a força avante."},
      context:{fr:"FORMAT CAP ET VITESSE SMCP\n→ Cap : toujours 3 chiffres (ex: 275, pas 75)\n→ Toujours préciser 'true' ou 'magnetic'\n→ Vitesse : toujours en nœuds\n→ État des machines = info obligatoire\n\nORDRES DE MACHINE (SMCP) :\nFull ahead · Half ahead · Slow ahead\nStop · Slow astern · Half astern · Full astern",en:"SMCP COURSE AND SPEED FORMAT\n→ Course: always 3 digits (e.g. 275, not 75)\n→ Always specify 'true' or 'magnetic'\n→ Speed: always in knots\n→ Engine status = mandatory information\n\nENGINE ORDERS (SMCP):\nFull ahead · Half ahead · Slow ahead\nStop · Slow astern · Half astern · Full astern",es:"FORMATO RUMBO Y VELOCIDAD SMCP\n→ Rumbo: siempre 3 cifras (ej.: 275, no 75)\n→ Siempre especificar 'verdadero' o 'magnético'\n→ Velocidad: siempre en nudos\n→ Estado de las máquinas = información obligatoria",pt:"FORMATO RUMO E VELOCIDADE SMCP\n→ Rumo: sempre 3 dígitos (ex.: 275, não 75)\n→ Sempre especificar 'verdadeiro' ou 'magnético'\n→ Velocidade: sempre em nós\n→ Estado das máquinas = informação obrigatória"} },
    { speaker:"OOW (incoming)", role:{fr:"OOW entrant",en:"Incoming OOW",es:"OOW entrante",pt:"OOW entrando"},
      smcp:"I have now taken over the watch. I am the officer of the watch.",
      tr:{fr:"Je prends maintenant le quart. Je suis l'officier de quart.",es:"Ahora asumo la guardia. Soy el oficial de guardia.",pt:"Assumo agora o quarto. Sou o oficial de quarto."},
      context:{fr:"PHRASE DE CLÔTURE — OBLIGATOIRE\n→ Cette phrase confirme officiellement la prise du quart\n→ L'OOW entrant est maintenant RESPONSABLE\n→ L'OOW sortant peut quitter la passerelle\n\nJURIDIQUE :\nAvant cette phrase = OOW sortant responsable\nAprès cette phrase = OOW entrant responsable\n\nLe capitaine DOIT être informé si conditions\ndangereuses ou incertitude sur la situation",en:"CLOSING PHRASE — MANDATORY\n→ This phrase officially confirms watch takeover\n→ Incoming OOW is now RESPONSIBLE\n→ Outgoing OOW may leave the bridge\n\nLEGAL:\nBefore this phrase = outgoing OOW responsible\nAfter this phrase = incoming OOW responsible",es:"FRASE DE CIERRE — OBLIGATORIA\n→ Esta frase confirma oficialmente la toma de guardia\n→ El OOW entrante es ahora RESPONSABLE\n→ El OOW saliente puede abandonar el puente",pt:"FRASE DE ENCERRAMENTO — OBRIGATÓRIA\n→ Esta frase confirma oficialmente a tomada de quarto\n→ O OOW entrante é agora RESPONSÁVEL\n→ O OOW saindo pode abandonar a ponte"} },
  ];

  const d = dialogues[step];
  const isIncoming = d.speaker.includes("incoming") || d.speaker.includes("entrant") || d.speaker.includes("entrante");

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {dialogues.map((_,i)=>(
          <div key={i} onClick={()=>setStep(i)} style={{
            flex:1,height:4,borderRadius:4,cursor:"pointer",
            background:i<=step?(i===step?C.smcp:`${C.smcp}55`):"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div style={{fontSize:9,color:C.smcp,letterSpacing:2,textAlign:"center",marginBottom:8,fontFamily:"'Cinzel',serif"}}>
        {lang==="fr"?"SIMULATEUR RELÈVE DE QUART":lang==="en"?"WATCH HANDOVER SIMULATOR":lang==="es"?"SIMULADOR CAMBIO DE GUARDIA":"SIMULADOR MUDANÇA DE QUARTO"} — {step+1}/{dialogues.length}
      </div>
      <div style={{padding:"12px",borderRadius:14,marginBottom:10,
        background:isIncoming?"rgba(0,229,255,0.08)":"rgba(123,237,159,0.08)",
        border:`2px solid ${isIncoming?C.smcp:C.watch}55`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:9,fontWeight:700,color:isIncoming?C.smcp:C.watch,marginBottom:6,letterSpacing:1}}>
          {isIncoming?"→":"←"} {d.role[lang]||d.role.en}
        </div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:13,color:C.white,lineHeight:1.6,marginBottom:8,fontWeight:700}}>
          "{d.smcp}"
        </div>
        {lang!=="en"&&<button onClick={()=>setShowFr(!showFr)} style={{fontSize:9,padding:"3px 8px",borderRadius:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer"}}>
          {showFr?"▲ Hide":"▼ "}{lang==="fr"?"Traduction":lang==="es"?"Traducción":"Tradução"}
        </button>}
        {lang!=="en"&&showFr&&<div style={{fontSize:11,color:C.muted,marginTop:6,fontStyle:"italic"}}>{d.tr[lang]||d.tr.fr}</div>}
      </div>
      <div style={{padding:"10px 12px",borderRadius:12,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.06)",marginBottom:10,fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
        {d.context[lang]||d.context.en}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":lang==="es"?"Anterior":"Anterior"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(dialogues.length-1,s+1))} disabled={step===dialogues.length-1}
          style={{flex:1,padding:"9px",borderRadius:10,background:step===dialogues.length-1?"rgba(255,255,255,0.05)":`${C.smcp}22`,border:`1px solid ${step===dialogues.length-1?"rgba(255,255,255,0.08)":C.smcp}`,color:C.white,cursor:step===dialogues.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":lang==="es"?"Siguiente":"Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — SMCP PHRASES FLASHCARDS
// ══════════════════════════════════════
function SMCPFlashcardsSVG({ lang }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [category, setCategory] = useState("position");

  const cats = {
    position:{
      label:{fr:"Position & Navigation",en:"Position & Navigation",es:"Posición y Navegación",pt:"Posição e Navegação"},
      color:C.blue2,
      cards:[
        { q:"How do you report your position?", a:"Our position is Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W.\nLast fix at [time] UTC by [method].", tr:{fr:"Position : Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W.\nDernier point à [heure] UTC par [méthode].",es:"Posición: Latitud [X]°[X]'N/S, Longitud [X]°[X]'E/W.\nÚltima posición a las [hora] UTC por [método].",pt:"Posição: Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W.\nÚltimo ponto às [hora] UTC por [método]."} },
        { q:"How do you give a bearing?", a:"The bearing of [object] is [X] degrees true/magnetic.", tr:{fr:"Le relèvement de [objet] est [X] degrés vrai/magnétique.",es:"La marcación de [objeto] es [X] grados verdadero/magnético.",pt:"A marcação de [objeto] é [X] graus verdadeiro/magnético."} },
        { q:"How do you report a waypoint?", a:"Next waypoint is [name]. ETA [time] UTC. Distance [X] miles.", tr:{fr:"Prochain point de passage : [nom]. ETA [heure] UTC. Distance [X] milles.",es:"Próximo punto de ruta: [nombre]. ETA [hora] UTC. Distancia [X] millas.",pt:"Próximo ponto de passagem: [nome]. ETA [hora] UTC. Distância [X] milhas."} },
        { q:"How do you report a course alteration?", a:"Altering course to [X] degrees [true/magnetic]. New course [X] degrees.", tr:{fr:"Changement de cap vers [X] degrés [vrai/magnétique]. Nouveau cap [X] degrés.",es:"Cambio de rumbo a [X] grados [verdadero/magnético]. Nuevo rumbo [X] grados.",pt:"Alteração de rumo para [X] graus [verdadeiro/magnético]. Novo rumo [X] graus."} },
        { q:"How do you report visibility?", a:"Visibility is [X] miles/metres. [Good/Moderate/Poor/Fog].", tr:{fr:"Visibilité : [X] milles/mètres. [Bonne/Modérée/Mauvaise/Brouillard].",es:"Visibilidad: [X] millas/metros. [Buena/Moderada/Mala/Niebla].",pt:"Visibilidade: [X] milhas/metros. [Boa/Moderada/Má/Nevoeiro]."} },
      ]},
    traffic:{
      label:{fr:"Trafic & Abordage",en:"Traffic & Collision",es:"Tráfico y Colisión",pt:"Tráfego e Colisão"},
      color:C.orange,
      cards:[
        { q:"How do you report a vessel on radar?", a:"I have a vessel on radar. Bearing [X] degrees. Range [X] miles. CPA [X] miles in [X] minutes.", tr:{fr:"J'ai un navire sur radar. Relèvement [X] degrés. Distance [X] milles. CPA [X] milles dans [X] minutes.",es:"Tengo un buque en el radar. Marcación [X] grados. Distancia [X] millas. CPA [X] millas en [X] minutos.",pt:"Tenho um navio no radar. Marcação [X] graus. Distância [X] milhas. CPA [X] milhas em [X] minutos."} },
        { q:"How do you warn another vessel of collision risk?", a:"Warning! You are standing into danger. Alter course immediately to [port/starboard].", tr:{fr:"Attention ! Vous vous dirigez vers un danger. Changez immédiatement de cap sur [bâbord/tribord].",es:"¡Atención! Se dirige hacia un peligro. Cambie inmediatamente de rumbo a [babor/estribor].",pt:"Atenção! Está a dirigir-se para um perigo. Altere imediatamente o rumo para [bombordo/estibordo]."} },
        { q:"How do you report an alteration to avoid collision?", a:"I am altering course to [starboard/port] to avoid collision.", tr:{fr:"Je vire sur [tribord/bâbord] pour éviter une collision.",es:"Viro a [estribor/babor] para evitar una colisión.",pt:"Viro para [estibordo/bombordo] para evitar uma colisão."} },
        { q:"How do you confirm passing agreement?", a:"I agree to pass on [port/starboard] side. Please acknowledge.", tr:{fr:"J'accepte de passer sur [bâbord/tribord]. Veuillez confirmer.",es:"Acepto pasar por [babor/estribor]. Por favor confirme.",pt:"Aceito passar por [bombordo/estibordo]. Por favor confirme."} },
        { q:"How do you report overtaking?", a:"I intend to overtake you on your [port/starboard] side. Do you agree?", tr:{fr:"J'ai l'intention de vous dépasser par votre [bâbord/tribord]. Êtes-vous d'accord ?",es:"Tengo la intención de adelantarle por su [babor/estribor]. ¿Está de acuerdo?",pt:"Tenho a intenção de ultrapassá-lo pelo seu [bombordo/estibordo]. Concorda?"} },
      ]},
    weather:{
      label:{fr:"Météo & Conditions",en:"Weather & Conditions",es:"Meteorología y Condiciones",pt:"Meteorologia e Condições"},
      color:C.purple,
      cards:[
        { q:"How do you report wind?", a:"Wind direction [X] degrees, force [Beaufort scale / X knots]. [Gusting to X knots].", tr:{fr:"Direction du vent [X] degrés, force [Beaufort / X nœuds]. [Rafales à X nœuds].",es:"Dirección del viento [X] grados, fuerza [Beaufort / X nudos]. [Rachas de X nudos].",pt:"Direção do vento [X] graus, força [Beaufort / X nós]. [Rajadas de X nós]."} },
        { q:"How do you report sea state?", a:"Sea state [calm/slight/moderate/rough/very rough/high/phenomenal]. Wave height [X] metres.", tr:{fr:"État de la mer [calme/faible/modéré/agité/très agité/grosse mer/mer énorme]. Hauteur des vagues [X] mètres.",es:"Estado de la mar [calma/rizada/marejadilla/marejada/fuerte marejada/gruesa/muy gruesa]. Altura de olas [X] metros.",pt:"Estado do mar [calmo/pouco encapelado/encapelado/muito encapelado/agitado/muito agitado/enorme]. Altura das ondas [X] metros."} },
        { q:"How do you report current?", a:"Current is setting [X] degrees, drifting [X] knots.", tr:{fr:"Courant portant vers [X] degrés, dérive [X] nœuds.",es:"Corriente hacia [X] grados, deriva [X] nudos.",pt:"Corrente para [X] graus, deriva [X] nós."} },
        { q:"How do you request weather report from coast station?", a:"[Station name], this is [vessel name]. Please send the weather forecast for area [X].", tr:{fr:"[Nom de la station], ici [nom du navire]. Veuillez envoyer les prévisions météo pour la zone [X].",es:"[Nombre de la estación], aquí [nombre del buque]. Por favor envíe el pronóstico meteorológico para la zona [X].",pt:"[Nome da estação], aqui [nome do navio]. Por favor envie a previsão meteorológica para a zona [X]."} },
        { q:"How do you report restricted visibility?", a:"Visibility is restricted. I am proceeding at reduced speed. I am sounding fog signals.", tr:{fr:"Visibilité réduite. Je navigue à vitesse réduite. J'émets les signaux de brouillard.",es:"Visibilidad reducida. Navego a velocidad reducida. Emito señales de niebla.",pt:"Visibilidade reduzida. Navego a velocidade reduzida. Emito sinais de nevoeiro."} },
      ]},
    reporting:{
      label:{fr:"Rapports & Consignes",en:"Reports & Orders",es:"Informes y Órdenes",pt:"Relatórios e Ordens"},
      color:C.green,
      cards:[
        { q:"How do you call the captain to the bridge?", a:"Captain, please come to the bridge. [Reason: traffic/weather/position uncertainty].", tr:{fr:"Capitaine, veuillez vous rendre à la passerelle. [Raison : trafic/météo/incertitude de position].",es:"Capitán, por favor diríjase al puente. [Motivo: tráfico/meteorología/incertidumbre de posición].",pt:"Capitão, por favor dirija-se à ponte. [Motivo: tráfego/meteorologia/incerteza de posição]."} },
        { q:"How do you report engine status?", a:"Engine is on [full/half/slow/dead slow] ahead/astern. RPM is [X].", tr:{fr:"Machine en avant [toute/mi/lente/très lente]/arrière. RPM : [X].",es:"Máquina avante [toda/media/lenta/muy lenta]/atrás. RPM: [X].",pt:"Máquina avante [toda/meia/lenta/muito lenta]/à ré. RPM: [X]."} },
        { q:"How do you report anchoring?", a:"Anchor is let go in [X] metres of water. [X] shackles on deck. Holding well/dragging.", tr:{fr:"L'ancre est mouillée par [X] mètres de fond. [X] manilles filées. Tient bien/chasse.",es:"El ancla está fondeada en [X] metros de agua. [X] grilletes largados. Aguanta bien/garrea.",pt:"A âncora está fundeada em [X] metros de água. [X] quartéis filados. Está a segurar bem/a garrar."} },
        { q:"How do you report to pilot station?", a:"[Pilot station], this is [vessel name]. I require a pilot. My ETA is [time] UTC. Draught [X] metres.", tr:{fr:"[Station pilotage], ici [nom du navire]. Je demande un pilote. Mon ETA est [heure] UTC. Tirant d'eau [X] m.",es:"[Estación de practicaje], aquí [nombre del buque]. Solicito un práctico. Mi ETA es [hora] UTC. Calado [X] m.",pt:"[Estação de pilotagem], aqui [nome do navio]. Solicito um piloto. O meu ETA é [hora] UTC. Calado [X] m."} },
        { q:"How do you hand over standing orders?", a:"Standing orders are as follows: Call me if [condition]. Maintain course [X]. Reduce speed if visibility drops below [X] miles.", tr:{fr:"Consignes permanentes : Appelez-moi si [condition]. Maintenez le cap [X]. Réduisez la vitesse si visibilité < [X] milles.",es:"Consignas permanentes: Llámenme si [condición]. Mantengan el rumbo [X]. Reduzcan la velocidad si la visibilidad < [X] millas.",pt:"Ordens permanentes: Chamem-me se [condição]. Mantenham o rumo [X]. Reduzam a velocidade se a visibilidade < [X] milhas."} },
      ]},
  };

  const cat = cats[category];
  const card = cat.cards[idx];

  return (
    <div>
      {/* Category selector */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {Object.entries(cats).map(([k,v])=>(
          <button key={k} onClick={()=>{setCategory(k);setIdx(0);setFlipped(false);}} style={{
            padding:"7px 4px",borderRadius:10,cursor:"pointer",textAlign:"center",fontSize:9,fontWeight:700,
            background:category===k?`${v.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${category===k?v.color:"rgba(255,255,255,0.08)"}`,
            color:category===k?v.color:C.muted}}>
            {v.label[lang]||v.label.en}
          </button>
        ))}
      </div>
      {/* Progress */}
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {cat.cards.map((_,i)=>(
          <div key={i} onClick={()=>{setIdx(i);setFlipped(false);}} style={{
            flex:1,height:4,borderRadius:4,cursor:"pointer",
            background:i===idx?cat.color:i<idx?`${cat.color}55`:"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      {/* Flashcard */}
      <div onClick={()=>setFlipped(f=>!f)} style={{
        padding:"16px",borderRadius:14,cursor:"pointer",minHeight:120,
        background:flipped?`${cat.color}18`:"rgba(0,0,0,0.4)",
        border:`2px solid ${flipped?cat.color:"rgba(255,255,255,0.08)"}`,
        transition:"all 0.3s ease",animation:"fadeUp 0.3s ease",
        display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:10}}>
        {!flipped ? (
          <div>
            <div style={{fontSize:9,color:C.muted,letterSpacing:2,marginBottom:8}}>❓ QUESTION — {lang==="fr"?"Touche pour la réponse":lang==="en"?"Tap for answer":lang==="es"?"Toca para respuesta":"Toque para resposta"}</div>
            <div style={{fontSize:14,color:C.white,fontWeight:700,lineHeight:1.5}}>{card.q}</div>
          </div>
        ) : (
          <div>
            <div style={{fontSize:9,color:cat.color,letterSpacing:2,marginBottom:8}}>✅ SMCP ANSWER</div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:C.white,lineHeight:1.7,marginBottom:8,whiteSpace:"pre-line"}}>{card.a}</div>
            {(lang==="fr"||lang==="es"||lang==="pt")&&<div style={{fontSize:10,color:C.muted,fontStyle:"italic",lineHeight:1.5,borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:6}}>{card.tr[lang]||card.tr.fr}</div>}
          </div>
        )}
      </div>
      {/* Navigation */}
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{setIdx(i=>Math.max(0,i-1));setFlipped(false);}} disabled={idx===0}
          style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:idx===0?C.muted:C.white,cursor:idx===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":lang==="es"?"Anterior":"Anterior"}
        </button>
        <button onClick={()=>{setIdx(i=>Math.min(cat.cards.length-1,i+1));setFlipped(false);}} disabled={idx===cat.cards.length-1}
          style={{flex:1,padding:"9px",borderRadius:10,background:idx===cat.cards.length-1?"rgba(255,255,255,0.05)":`${cat.color}22`,border:`1px solid ${idx===cat.cards.length-1?"rgba(255,255,255,0.08)":cat.color}`,color:C.white,cursor:idx===cat.cards.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":lang==="es"?"Siguiente":"Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — SMCP NUMBER/TIME FORMATS
// ══════════════════════════════════════
function SMCPFormatsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const formats = [
    { id:"numbers", icon:"🔢", color:C.smcp,
      label:{fr:"Chiffres SMCP",en:"SMCP Numbers",es:"Números SMCP",pt:"Números SMCP"},
      content:{fr:"PRONONCIATION DES CHIFFRES :\n\n0 = zero (ZE-ro)\n1 = one (WUN)\n2 = two (TOO)\n3 = three (TREE)\n4 = four (FOW-er)\n5 = five (FIFE)\n6 = six (SIX)\n7 = seven (SEV-en)\n8 = eight (AIT)\n9 = niner (NIN-er)\n\nEXEMPLES :\n275° = TWO SEVEN FIVE degrees\n14.5 kn = WUN FOUR DECIMAL FIFE knots\nRPM 120 = WUN TWO ZERO RPM\n\nRÈGLE : prononcer chaque chiffre séparément\n(jamais 'two hundred and seventy five')",
               en:"NUMBER PRONUNCIATION:\n\n0 = zero (ZE-ro)\n1 = one (WUN)\n2 = two (TOO)\n3 = three (TREE)\n4 = four (FOW-er)\n5 = five (FIFE)\n6 = six (SIX)\n7 = seven (SEV-en)\n8 = eight (AIT)\n9 = niner (NIN-er)\n\nEXAMPLES:\n275° = TWO SEVEN FIVE degrees\n14.5 kn = WUN FOUR DECIMAL FIFE knots\nRPM 120 = WUN TWO ZERO RPM\n\nRULE: pronounce each digit separately\n(never 'two hundred and seventy five')",
               es:"PRONUNCIACIÓN DE NÚMEROS:\n\n0 = zero (ZE-ro) · 1 = one (WUN)\n2 = two (TOO) · 3 = three (TREE)\n4 = four (FOW-er) · 5 = five (FIFE)\n6 = six (SIX) · 7 = seven (SEV-en)\n8 = eight (AIT) · 9 = niner (NIN-er)\n\nEJEMPLOS:\n275° = TWO SEVEN FIVE degrees\n14,5 nd = WUN FOUR DECIMAL FIFE knots\n\nREGLA: pronunciar cada cifra por separado",
               pt:"PRONÚNCIA DOS NÚMEROS:\n\n0 = zero (ZE-ro) · 1 = one (WUN)\n2 = two (TOO) · 3 = three (TREE)\n4 = four (FOW-er) · 5 = five (FIFE)\n6 = six (SIX) · 7 = seven (SEV-en)\n8 = eight (AIT) · 9 = niner (NIN-er)\n\nEXEMPLOS:\n275° = TWO SEVEN FIVE degrees\n14,5 nós = WUN FOUR DECIMAL FIFE knots\n\nREGRA: pronunciar cada dígito separadamente"} },
    { id:"time", icon:"🕐", color:C.gold2,
      label:{fr:"Temps & Heure SMCP",en:"SMCP Time",es:"Hora SMCP",pt:"Hora SMCP"},
      content:{fr:"FORMAT HEURE SMCP :\n\nToujours en UTC (temps universel)\nFormat 4 chiffres : HHMM\n\nEXEMPLES :\n0345 UTC = 'zero three four five UTC'\n1200 UTC = 'twelve hundred hours UTC'\n2359 UTC = 'two three five niner UTC'\n\nDATE-HEURE :\n'At 1400 UTC on the 15th of March'\n\nDURÉE :\n'In 30 minutes' = 'in three zero minutes'\n'For 2 hours' = 'for two hours'\n\nETA :\n'ETA is 1430 UTC' =\n'Estimated time of arrival is\none four three zero UTC'",
               en:"SMCP TIME FORMAT:\n\nAlways in UTC (Universal Time)\n4-digit format: HHMM\n\nEXAMPLES:\n0345 UTC = 'zero three four five UTC'\n1200 UTC = 'twelve hundred hours UTC'\n2359 UTC = 'two three five niner UTC'\n\nDATE-TIME:\n'At 1400 UTC on the 15th of March'\n\nDURATION:\n'In 30 minutes' = 'in three zero minutes'\n'For 2 hours' = 'for two hours'\n\nETA:\n'ETA is 1430 UTC' =\n'Estimated time of arrival is\none four three zero UTC'",
               es:"FORMATO DE HORA SMCP:\n\nSiempre en UTC\nFormato de 4 cifras: HHMM\n\nEJEMPLOS:\n0345 UTC = 'zero three four five UTC'\n1200 UTC = 'twelve hundred hours UTC'\n2359 UTC = 'two three five niner UTC'\n\nFECHA-HORA: 'At 1400 UTC on the 15th of March'\nETA: 'Estimated time of arrival is one four three zero UTC'",
               pt:"FORMATO DE HORA SMCP:\n\nSempre em UTC\nFormato de 4 dígitos: HHMM\n\nEXEMPLOS:\n0345 UTC = 'zero three four five UTC'\n1200 UTC = 'twelve hundred hours UTC'\n2359 UTC = 'two three five niner UTC'\n\nDATA-HORA: 'At 1400 UTC on the 15th of March'\nETA: 'Estimated time of arrival is one four three zero UTC'"} },
    { id:"direction", icon:"🧭", color:C.orange,
      label:{fr:"Caps & Relèvements",en:"Courses & Bearings",es:"Rumbos y Marcaciones",pt:"Rumos e Marcações"},
      content:{fr:"CAPS ET RELÈVEMENTS SMCP :\n\nTOUJOURS 3 CHIFFRES :\n→ 090° = 'zero niner zero degrees'\n→ 045° = 'zero four five degrees'\n→ 360° = 'three six zero degrees'\n\nPRÉCISER TOUJOURS la référence :\n→ 'true' = vrai (par rapport au Nord vrai)\n→ 'magnetic' = magnétique (boussole)\n\nFORMAT COMPLET :\n'Course is two seven five degrees true'\n'Bearing of the lighthouse is one eight zero degrees magnetic'\n\nRELÈVEMENT (bearing) :\n'I have a bearing of [X] degrees [true/magnetic] on [object/vessel]'",
               en:"SMCP COURSES AND BEARINGS:\n\nALWAYS 3 DIGITS:\n→ 090° = 'zero niner zero degrees'\n→ 045° = 'zero four five degrees'\n→ 360° = 'three six zero degrees'\n\nALWAYS specify reference:\n→ 'true' = true (from true north)\n→ 'magnetic' = magnetic (compass)\n\nFULL FORMAT:\n'Course is two seven five degrees true'\n'Bearing of the lighthouse is one eight zero degrees magnetic'\n\nBEARING:\n'I have a bearing of [X] degrees [true/magnetic] on [object/vessel]'",
               es:"RUMBOS Y MARCACIONES SMCP:\n\nSIEMPRE 3 CIFRAS:\n→ 090° = 'zero niner zero degrees'\n→ 045° = 'zero four five degrees'\n\nSIEMPRE especificar la referencia:\n→ 'true' = verdadero (norte verdadero)\n→ 'magnetic' = magnético (brújula)\n\nFORMATO COMPLETO:\n'Course is two seven five degrees true'\n'Bearing of the lighthouse is one eight zero degrees magnetic'",
               pt:"RUMOS E MARCAÇÕES SMCP:\n\nSEMPRE 3 DÍGITOS:\n→ 090° = 'zero niner zero degrees'\n→ 045° = 'zero four five degrees'\n\nSEMPRE especificar a referência:\n→ 'true' = verdadeiro (norte verdadeiro)\n→ 'magnetic' = magnético (bússola)\n\nFORMATO COMPLETO:\n'Course is two seven five degrees true'\n'Bearing of the lighthouse is one eight zero degrees magnetic'"} },
    { id:"distress_words", icon:"🆘", color:C.red,
      label:{fr:"Mots clés urgence",en:"Emergency keywords",es:"Palabras clave urgencia",pt:"Palavras chave urgência"},
      content:{fr:"MOTS CLÉS D'URGENCE SMCP :\n\nMAYDAY = détresse (danger de mort)\nPAN-PAN = urgence médicale/technique\nSÉCURITÉ = information de sécurité\n\nNEGATIVE = non (JAMAIS 'no')\nAFFIRMATIVE = oui (JAMAIS 'yes')\nROGER = message reçu et compris\nWILCO = compris, je vais exécuter\nSAY AGAIN = répétez\nSTAND BY = attendez\nOUT = fin de communication\nOVER = à vous (j'attends réponse)\n\nCORRECTION :\n'Correction. [répéter le bon message]'\n\nPONSTUATION SMCP :\nDECIMAL = virgule/point décimal\nSLASH = barre oblique /",
               en:"SMCP EMERGENCY KEYWORDS:\n\nMAYDAY = distress (life danger)\nPAN-PAN = medical/technical urgency\nSÉCURITÉ = safety information\n\nNEGATIVE = no\nAFFIRMATIVE = yes\nROGER = message received and understood\nWILCO = understood, I will comply\nSAY AGAIN = repeat\nSTAND BY = wait\nOUT = end of communication\nOVER = over to you (awaiting reply)\n\nCORRECTION:\n'Correction. [repeat correct message]'\n\nSMCP PUNCTUATION:\nDECIMAL = decimal point\nSLASH = forward slash /",
               es:"PALABRAS CLAVE DE URGENCIA SMCP:\n\nMAYDAY = socorro (peligro de vida)\nPAN-PAN = urgencia médica/técnica\nSÉCURITÉ = información de seguridad\n\nNEGATIVE = no · AFFIRMATIVE = sí\nROGER = recibido y entendido\nWILCO = entendido, lo ejecutaré\nSAY AGAIN = repita · STAND BY = espere\nOUT = fin de comunicación\nOVER = a usted (espero respuesta)\n\nCORRECCIÓN: 'Correction. [repetir el mensaje correcto]'",
               pt:"PALAVRAS CHAVE DE URGÊNCIA SMCP:\n\nMAYDAY = socorro (perigo de vida)\nPAN-PAN = urgência médica/técnica\nSÉCURITÉ = informação de segurança\n\nNEGATIVE = não · AFFIRMATIVE = sim\nROGER = recebido e compreendido\nWILCO = compreendido, vou executar\nSAY AGAIN = repita · STAND BY = aguarde\nOUT = fim de comunicação\nOVER = a você (aguardo resposta)\n\nCORRECÇÃO: 'Correction. [repetir mensagem correcta]'"} },
  ];

  const sel_ = sel!==null ? formats[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {formats.map((f,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${f.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?f.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:3}}>{f.icon}</div>
            <div style={{fontSize:9,color:sel===i?f.color:C.muted,fontWeight:700,lineHeight:1.2}}>{f.label[lang]||f.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:12,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",fontFamily:"'Courier New',monospace"}}>{sel_.content[lang]||sel_.content.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SMCP VOCABULARY QUIZ
// ══════════════════════════════════════
function SMCPVocabQuiz({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const qs = [
    { smcp:"WILCO", opts:["I cannot comply","Understood, I will comply","Wait please","Message received"], correct:1 },
    { smcp:"SAY AGAIN", opts:["Agree","Negative","Please repeat your message","End of communication"], correct:2 },
    { smcp:"AFFIRMATIVE", opts:["No","Possibly","Yes","Understood"], correct:2 },
    { smcp:"STAND BY", opts:["End of communication","Wait please","I am ready","Emergency"], correct:1 },
    { smcp:"CORRECTION", opts:["End of message","I made an error — correct version follows","Send again","Understood"], correct:1 },
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
        {qs.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<qIdx?C.smcp:i===qIdx?C.gold2:"rgba(255,255,255,0.1)"}}/>)}
      </div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"14px",marginBottom:12,textAlign:"center",border:`1px solid ${C.smcp}33`}}>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:22,fontWeight:900,color:C.smcp,marginBottom:4}}>{q.smcp}</div>
        <div style={{fontSize:11,color:C.muted}}>
          {lang==="fr"?"Que signifie ce terme SMCP ?":lang==="en"?"What does this SMCP term mean?":lang==="es"?"¿Qué significa este término SMCP?":"O que significa este termo SMCP?"}
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(ans!==null){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===ans){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:ans!==null?"default":"pointer",fontFamily:"'Courier New',monospace"}}>{opt}</button>;
        })}
      </div>
      {ans!==null&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.smcp},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.navy,cursor:"pointer"}}>
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
    fr:[
      {id:"q1",q:"En SMCP, comment prononce-t-on le chiffre 9 ?\n(Répondre en anglais)",correct:"niner"},
      {id:"q2",q:"Quelle phrase SMCP signifie 'compris, j'exécute' ?\n(Répondre : 1 mot)",correct:"WILCO"},
      {id:"q3",q:"Comment dit-on cap 045 degrés vrai en SMCP ?\n(Répondre en anglais)",correct:"zero four five degrees true"},
    ],
    en:[
      {id:"q1",q:"In SMCP, how do you pronounce the digit 9?\n(Answer in English)",correct:"niner"},
      {id:"q2",q:"Which SMCP word means 'understood, I will comply'?\n(Answer: 1 word)",correct:"WILCO"},
      {id:"q3",q:"How do you say course 045 degrees true in SMCP?\n(Answer in English)",correct:"zero four five degrees true"},
    ],
    es:[
      {id:"q1",q:"En SMCP, ¿cómo se pronuncia el dígito 9?\n(Responder en inglés)",correct:"niner"},
      {id:"q2",q:"¿Qué palabra SMCP significa 'entendido, lo ejecutaré'?\n(Responder: 1 palabra)",correct:"WILCO"},
      {id:"q3",q:"¿Cómo se dice rumbo 045 grados verdadero en SMCP?\n(Responder en inglés)",correct:"zero four five degrees true"},
    ],
    pt:[
      {id:"q1",q:"Em SMCP, como se pronuncia o dígito 9?\n(Responder em inglês)",correct:"niner"},
      {id:"q2",q:"Que palavra SMCP significa 'compreendido, vou executar'?\n(Responder: 1 palavra)",correct:"WILCO"},
      {id:"q3",q:"Como se diz rumo 045 graus verdadeiro em SMCP?\n(Responder em inglês)",correct:"zero four five degrees true"},
    ],
  };
  const list=qs[lang]||qs.en;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("niner");
    if(q.id==="q2") return v.includes("wilco");
    if(q.id==="q3") return v.includes("zero")&&v.includes("four")&&v.includes("five")&&v.includes("true");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.smcp}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : 9 = niner · WILCO = compris j'exécute · 3 chiffres pour les caps (zero four five)":
         lang==="en"?"💡 Reminders: 9 = niner · WILCO = understood I will comply · 3 digits for courses (zero four five)":
         lang==="es"?"💡 Recordatorios: 9 = niner · WILCO = entendido lo ejecutaré · 3 cifras para rumbos (zero four five)":
         "💡 Lembretes: 9 = niner · WILCO = compreendido vou executar · 3 dígitos para rumos (zero four five)"}
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
        Q1: NINER (standardized pronunciation to avoid confusion with German 'nein' = no)\nQ2: WILCO (= Will Comply — I received and will execute)\nQ3: ZERO FOUR FIVE DEGREES TRUE (always 3 digits, always specify true/magnetic)
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.smcp}12`,border:`1px solid ${showC?C.green:C.smcp}44`,color:showC?C.green:C.smcp,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  en:[
    {q:"Complete the SMCP phrase: 'Our position is Latitude ___°___'N, Longitude ___°___'E. Last fix at ___ UTC by ___.'",opts:["Lat 43N Lon 7E, GPS","Latitude 43 degrees 12.5 minutes North, Longitude 007 degrees 05.3 minutes East. Last fix at zero three four five UTC by GPS.","43N 7E fixed at 0345","Position is near France"],correct:1,expl:"SMCP position format MANDATORY: always 'Latitude [degrees] degrees [minutes] minutes North/South, Longitude [degrees] degrees [minutes] minutes East/West'. Always 3 digits for longitude degrees (007 not 7). Always specify positioning method (GPS/radar/visual/ECDIS). Always give time in UTC using 4-digit format. This is the IMO-standardized format used worldwide."},
    {q:"What is the correct SMCP phrase to hand over the watch?",opts:["I'm going now, it's your turn","I have now taken over the watch. I am the officer of the watch.","OK, you can go","Watch handed over"],correct:1,expl:"The SMCP closing phrase 'I have now taken over the watch. I am the officer of the watch.' is MANDATORY and legally important. Before this phrase: outgoing OOW remains responsible. After this phrase: incoming OOW assumes full legal responsibility for the vessel's navigation. This cannot be replaced by informal language. The phrase must be clearly stated and acknowledged."},
    {q:"How do you say course 090 degrees true in SMCP?",opts:["Course ninety true","Course is zero niner zero degrees true","090 degrees","Turn right ninety"],correct:1,expl:"SMCP course format: ALWAYS 3 digits, digit by digit. 090° = 'zero niner zero degrees true' (NOT 'ninety degrees'). Always specify 'true' or 'magnetic' (never omit). Digit pronunciation: 0=zero, 1=one, 2=two, 3=three, 4=four, 5=five, 6=six, 7=seven, 8=eight, 9=NINER. The '3 digits' rule prevents ambiguity between 90° and 090°."},
    {q:"What does 'NEGATIVE' mean in SMCP?",opts:["Maybe not","No — used instead of 'no' to avoid confusion on radio","Not now","Nothing to report"],correct:1,expl:"'NEGATIVE' = NO in SMCP. Never say 'no' on the radio as it can be confused with sounds in other languages (e.g. German 'nein'). Similarly: AFFIRMATIVE = YES. WILCO = understood, I will comply. ROGER = message received and understood (but does not confirm compliance). NEGATIVE and AFFIRMATIVE are used to avoid any ambiguity in critical communications."},
    {q:"Which phrase should you use when you need the other station to wait?",opts:["Wait a moment please","STAND BY","Hold on","Give me a minute"],correct:1,expl:"'STAND BY' = wait in SMCP. Formal and universally understood. Other important operational phrases: SAY AGAIN = repeat your message. OVER = transmission ended, reply expected. OUT = communication ended, no reply expected. CORRECTION = I made an error, correct version follows. BREAK = separating sections of a long message. These standardized phrases ensure clarity in all radio communications regardless of the operator's native language."},
  ],
  fr:[
    {q:"Complétez la phrase SMCP : 'Notre position est Latitude ___°___'N, Longitude ___°___'E. Dernier point à ___ UTC par ___.'",opts:["Lat 43N Lon 7E, GPS","Latitude 43 degrees 12.5 minutes North, Longitude 007 degrees 05.3 minutes East. Last fix at zero three four five UTC by GPS.","43N 7E fixé à 0345","Position près de la France"],correct:1,expl:"Format de position SMCP OBLIGATOIRE : toujours 'Latitude [degrés] degrees [minutes] minutes North/South, Longitude [degrés] degrees [minutes] minutes East/West'. Toujours 3 chiffres pour les degrés de longitude (007 et non 7). Toujours préciser la méthode de positionnement (GPS/radar/visuel/ECDIS). Toujours l'heure en UTC avec format 4 chiffres."},
    {q:"Quelle est la phrase SMCP correcte pour prendre le quart ?",opts:["Je suis là, c'est bon","I have now taken over the watch. I am the officer of the watch.","OK tu peux partir","Quart transmis"],correct:1,expl:"La phrase de clôture SMCP 'I have now taken over the watch. I am the officer of the watch.' est OBLIGATOIRE et juridiquement importante. Avant cette phrase : l'OOW sortant reste responsable. Après cette phrase : l'OOW entrant assume l'entière responsabilité légale de la navigation. Elle ne peut pas être remplacée par un langage informel."},
    {q:"Comment dit-on cap 090 degrés vrai en SMCP ?",opts:["Cap quatre-vingt-dix vrai","Course is zero niner zero degrees true","090 degrés","Tourner à droite de quatre-vingt-dix"],correct:1,expl:"Format de cap SMCP : TOUJOURS 3 chiffres, chiffre par chiffre. 090° = 'zero niner zero degrees true' (PAS 'ninety degrees'). Toujours préciser 'true' ou 'magnetic'. Prononciation des chiffres : 0=zero, 1=one, 2=two, 3=three, 4=four, 5=five, 6=six, 7=seven, 8=eight, 9=NINER."},
    {q:"Que signifie 'NEGATIVE' en SMCP ?",opts:["Peut-être pas","Non — utilisé à la place de 'no' pour éviter la confusion à la radio","Pas maintenant","Rien à signaler"],correct:1,expl:"'NEGATIVE' = NON en SMCP. On ne dit jamais 'no' à la radio car cela peut être confondu avec des sons dans d'autres langues. De même : AFFIRMATIVE = OUI. WILCO = compris, je vais exécuter. ROGER = message reçu et compris. NEGATIVE et AFFIRMATIVE évitent toute ambiguïté dans les communications critiques."},
    {q:"Quelle phrase utilise-t-on quand on demande à l'autre station d'attendre ?",opts:["Attendez un instant s'il vous plaît","STAND BY","Attendez","Donnez-moi une minute"],correct:1,expl:"'STAND BY' = attendez en SMCP. Formelle et universellement comprise. Autres phrases opérationnelles importantes : SAY AGAIN = répétez. OVER = transmission terminée, réponse attendue. OUT = communication terminée, pas de réponse attendue. CORRECTION = j'ai fait une erreur, voici la version correcte."},
  ],
  es:[
    {q:"Complete la frase SMCP: 'Nuestra posición es Latitud ___°___'N, Longitud ___°___'E. Última marcación a ___ UTC por ___.'",opts:["Lat 43N Lon 7E, GPS","Latitude 43 degrees 12.5 minutes North, Longitude 007 degrees 05.3 minutes East. Last fix at zero three four five UTC by GPS.","43N 7E fijado a las 0345","Posición cerca de Francia"],correct:1,expl:"Formato de posición SMCP OBLIGATORIO: siempre 'Latitude [grados] degrees [minutos] minutes North/South, Longitude [grados] degrees [minutos] minutes East/West'. Siempre 3 cifras para los grados de longitud (007 no 7). Siempre especificar el método de posicionamiento. Siempre la hora en UTC con formato de 4 cifras."},
    {q:"¿Cuál es la frase SMCP correcta para tomar el relevo de guardia?",opts:["Ya estoy aquí, es tu turno","I have now taken over the watch. I am the officer of the watch.","OK puedes irte","Guardia entregada"],correct:1,expl:"La frase de cierre SMCP 'I have now taken over the watch. I am the officer of the watch.' es OBLIGATORIA y legalmente importante. Antes de esta frase: el OOW saliente sigue siendo responsable. Después de esta frase: el OOW entrante asume la plena responsabilidad legal. No puede sustituirse por un lenguaje informal."},
    {q:"¿Cómo se dice rumbo 090 grados verdadero en SMCP?",opts:["Rumbo noventa verdadero","Course is zero niner zero degrees true","090 grados","Girar a la derecha noventa"],correct:1,expl:"Formato de rumbo SMCP: SIEMPRE 3 cifras, cifra por cifra. 090° = 'zero niner zero degrees true' (NO 'ninety degrees'). Siempre especificar 'true' o 'magnetic'. Pronunciación de los dígitos: 0=zero, 1=one, 2=two, 3=three, 4=four, 5=five, 6=six, 7=seven, 8=eight, 9=NINER."},
    {q:"¿Qué significa 'NEGATIVE' en SMCP?",opts:["Quizás no","No — usado en lugar de 'no' para evitar confusión en la radio","Ahora no","Nada que informar"],correct:1,expl:"'NEGATIVE' = NO en SMCP. Nunca decir 'no' por radio ya que puede confundirse con sonidos en otros idiomas. Del mismo modo: AFFIRMATIVE = SÍ. WILCO = entendido, lo ejecutaré. ROGER = mensaje recibido y comprendido."},
    {q:"¿Qué frase se usa cuando se pide a la otra estación que espere?",opts:["Espere un momento por favor","STAND BY","Espere","Déme un minuto"],correct:1,expl:"'STAND BY' = espere en SMCP. Formal y universalmente comprendida. Otras frases operacionales importantes: SAY AGAIN = repita. OVER = transmisión terminada, se espera respuesta. OUT = comunicación terminada. CORRECTION = he cometido un error, versión correcta a continuación."},
  ],
  pt:[
    {q:"Complete a frase SMCP: 'A nossa posição é Latitude ___°___'N, Longitude ___°___'E. Última fixação a ___ UTC por ___.'",opts:["Lat 43N Lon 7E, GPS","Latitude 43 degrees 12.5 minutes North, Longitude 007 degrees 05.3 minutes East. Last fix at zero three four five UTC by GPS.","43N 7E fixado às 0345","Posição perto de França"],correct:1,expl:"Formato de posição SMCP OBRIGATÓRIO: sempre 'Latitude [graus] degrees [minutos] minutes North/South, Longitude [graus] degrees [minutos] minutes East/West'. Sempre 3 dígitos para os graus de longitude (007 não 7). Sempre especificar o método de posicionamento. Sempre a hora em UTC com formato de 4 dígitos."},
    {q:"Qual é a frase SMCP correta para assumir o quarto?",opts:["Já estou aqui, é a tua vez","I have now taken over the watch. I am the officer of the watch.","OK podes ir","Quarto entregue"],correct:1,expl:"A frase de encerramento SMCP 'I have now taken over the watch. I am the officer of the watch.' é OBRIGATÓRIA e juridicamente importante. Antes desta frase: o OOW saindo continua responsável. Após esta frase: o OOW entrante assume a plena responsabilidade legal. Não pode ser substituída por linguagem informal."},
    {q:"Como se diz rumo 090 graus verdadeiro em SMCP?",opts:["Rumo noventa verdadeiro","Course is zero niner zero degrees true","090 graus","Virar à direita noventa"],correct:1,expl:"Formato de rumo SMCP: SEMPRE 3 dígitos, dígito por dígito. 090° = 'zero niner zero degrees true' (NÃO 'ninety degrees'). Sempre especificar 'true' ou 'magnetic'. Pronúncia dos dígitos: 0=zero, 1=one, 2=two, 3=three, 4=four, 5=five, 6=six, 7=seven, 8=eight, 9=NINER."},
    {q:"O que significa 'NEGATIVE' em SMCP?",opts:["Talvez não","Não — usado em vez de 'no' para evitar confusão no rádio","Agora não","Nada a reportar"],correct:1,expl:"'NEGATIVE' = NÃO em SMCP. Nunca dizer 'no' no rádio pois pode ser confundido com sons noutras línguas. Da mesma forma: AFFIRMATIVE = SIM. WILCO = compreendido, vou executar. ROGER = mensagem recebida e compreendida."},
    {q:"Que frase se usa quando se pede à outra estação para esperar?",opts:["Aguarde um momento por favor","STAND BY","Espere","Dê-me um minuto"],correct:1,expl:"'STAND BY' = aguarde em SMCP. Formal e universalmente compreendida. Outras frases operacionais importantes: SAY AGAIN = repita. OVER = transmissão terminada, aguardo resposta. OUT = comunicação terminada. CORRECTION = cometi um erro, versão correta a seguir."},
  ],
};

const BANK = {
  en:[
    {q:"What is the full SMCP phrase to report a vessel on radar with collision risk?",opts:["Ship ahead!","I have a vessel on radar. Bearing [X] degrees [true/magnetic]. Range [X] miles. CPA [X] miles in [X] minutes. Risk of collision exists.","Radar contact","There's a ship"],correct:1,expl:"Complete SMCP radar report with collision risk: 'I have a vessel on radar. Bearing [X] degrees [true/magnetic]. Range [X] miles. CPA [X] miles in [X] minutes. Risk of collision exists.' Always give: bearing (3 digits + true/magnetic), range in nautical miles, CPA (Closest Point of Approach) and TCPA (Time to CPA). This standardized format ensures the other OOW has all necessary data to assess the situation."},
    {q:"How do you report your ETA to a port in SMCP?",opts:["I'll arrive at 1400","My ETA is one four zero zero UTC. I require berth at [pier/anchorage X].", "ETA 1400 hours","Coming at 14:00"],correct:1,expl:"SMCP ETA report: 'My ETA is [time in 4-digit UTC]. I require berth at [pier/anchorage/buoy X].' Always give time in UTC with all 4 digits spoken individually. ETA = Estimated Time of Arrival. Always add berthing requirements. If requesting pilot: 'I require a pilot. ETA pilot station is [time] UTC. My draught is [X] metres forward and [X] metres aft.'"},
    {q:"What is the SMCP phrase when you cannot understand a message?",opts:["What?","I do not understand your message. Please repeat on channel [X] / use plain language.","Again please","Too fast"],correct:1,expl:"'I do not understand your message. Please repeat.' or 'Say again, please.' are the SMCP phrases for incomprehension. You can add: 'Please speak more slowly.' or 'Please use plain language.' or 'Please spell [word].' The phonetic alphabet (Alpha, Bravo...) is used to spell individual letters or call signs. Never guess a message you didn't understand — always ask for repetition."},
    {q:"How do you report that you are altering course to avoid another vessel?",opts:["I'm turning","I am altering course to [port/starboard]. New course will be [X] degrees [true/magnetic] to avoid [vessel/danger].","Course change","Turning now"],correct:1,expl:"SMCP collision avoidance alteration: 'I am altering course to [port/starboard]. New course will be [X] degrees [true/magnetic] to avoid [vessel/danger].' This is an active communication — you are informing the other vessel of your action. Also use: 'I am reducing speed to [X] knots.' or 'I am stopping my engines.' These phrases are critical during close-quarters situations."},
    {q:"What is the SMCP phrase when you are not under command (NUC)?",opts:["Engine broken","I am not under command. I am unable to manoeuvre. Please keep clear.","Vessel disabled","Can't move"],correct:1,expl:"NUC (Not Under Command) SMCP phrase: 'I am not under command. I am unable to manoeuvre. Please keep clear.' Also add: 'I am showing [two all-round red lights/two black balls by day].' And if drifting: 'I am drifting in direction [X] degrees at [X] knots.' This is critical for other vessels to know they must give way. Always broadcast on VHF 16 and if possible through AIS status update."},
    {q:"How do you report anchoring in SMCP?",opts:["Anchored","I am anchoring in position Latitude [X], Longitude [X]. Depth [X] metres. [X] shackles of cable.","Dropping anchor","Anchor down"],correct:1,expl:"SMCP anchoring report: 'I am anchoring in position Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W. Depth [X] metres. [X] shackles of cable.' Also: 'Anchor is let go.' or 'Anchor is holding well.' or 'Anchor is dragging.' If at anchor in fog: 'I am at anchor. I am showing anchor light. I am sounding one prolonged blast followed by two short blasts every two minutes.' — This is the fog signal for vessels > 100m at anchor."},
    {q:"What does 'I have the con' mean in bridge communications?",opts:["I have the TV remote","I have assumed control of the vessel's navigation and manoeuvring — the con is mine","I have the binoculars","I am watching"],correct:1,expl:"'I have the con' (or 'I have the conn') = I have assumed conning authority — I am giving helm and engine orders. On the bridge: 'You have the con' (transferring authority) and 'I have the con' (accepting authority) are critical phrases establishing who is giving orders to the helmsman. The OOW always has the con unless he explicitly transfers it to the captain or pilot. Confusion about 'who has the con' has caused accidents."},
    {q:"How do you give a helm order in SMCP?",opts:["Turn left","Starboard / Port [X] degrees. Steady on [X] degrees.","Go right","Wheel to the right"],correct:1,expl:"SMCP helm orders: 'Starboard [X] degrees' (turn right) or 'Port [X] degrees' (turn left). 'Midships' = rudder amidships. 'Steady' = hold this course. 'Steady on [X] degrees [true/magnetic]' = steer this course. 'Hard to starboard/port' = full rudder. Helmsman response: repeat the order and state 'Helm is to starboard/port'. After steady: 'Steady on [X] degrees, [true/magnetic]' to confirm."},
    {q:"What is the correct SMCP phrase to report reduced visibility?",opts:["Foggy out","Visibility is [X] miles/metres. I am proceeding at reduced speed. I am sounding fog signals in accordance with Rule 35.","Can't see much","Vision poor"],correct:1,expl:"SMCP reduced visibility report: 'Visibility is [X] miles/metres. [Good/Moderate/Poor/Nil]. I am proceeding at reduced speed of [X] knots. I am sounding fog signals in accordance with Rule 35.' This report informs: current visibility distance, your action (speed reduction), compliance with COLREG Rule 35 (fog signals). Should be reported to: other vessels in vicinity, VTS if applicable, captain if not already on bridge."},
    {q:"How do you confirm receipt of an order in SMCP?",opts:["OK","Course is [X] degrees [true/magnetic]. Speed is [X] knots. [Order confirmed].","Yes sir","Understood"],correct:1,expl:"Helm/engine order confirmation in SMCP: Helmsman always repeats the order received: 'Starboard twenty — steering starboard twenty degrees' then 'Steady on two seven five degrees true.' Engine order confirmation: 'Full ahead — engine is full ahead. RPM one two zero.' This 'closed loop' communication ensures orders are correctly received and executed. Using 'OK' or 'Yes' is NOT SMCP standard and should be avoided."},
    {q:"What is 'situation report' (SITREP) in bridge watch keeping?",opts:["A type of radio","Standardised report given at watch handover covering: position · course · speed · traffic · weather · orders in force · pending tasks","A safety drill","An engine room report"],correct:1,expl:"SITREP (Situation Report) at watch handover includes: 1. Position (lat/long, last fix method and time). 2. Course (3 digits, true/magnetic). 3. Speed (knots, SOG/STW). 4. Engine status. 5. Traffic (vessels in vicinity, CPA). 6. Weather (wind, sea, visibility). 7. Navigational hazards. 8. Outstanding orders. 9. Pending tasks. 10. Captain's instructions. This structured SITREP ensures the incoming OOW has complete situational awareness."},
    {q:"How do you report a man overboard in SMCP?",opts:["Someone fell","Man overboard! Starboard/Port side. Position Latitude [X], Longitude [X]. Time [UTC].","MOB!","Person in water"],correct:1,expl:"Man Overboard SMCP report: 'Man overboard! [Starboard/Port/Forward/Aft] side. Time [UTC]. Position Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W.' Followed immediately by: PAN-PAN (or MAYDAY if life danger) on VHF 16. Then: 'I am manoeuvring to recover person. All vessels in vicinity please assist.' The initial report must include: which side, time, position — these three data points are critical for SAR."},
    {q:"What is the SMCP phrase to request information about a port?",opts:["Tell me about the port","[Port authority/VTS], this is [vessel name]. Please advise: depth of water at entrance / berth availability / any navigation warnings.","Port info please","What's the port like?"],correct:1,expl:"SMCP port inquiry: '[Port authority/VTS], this is [vessel name] on channel [X]. Please advise depth of water at entrance [X] metres. Berth availability for vessel of [X] metres length. Any navigation warnings or restrictions in force.' Port authority response format: '[Vessel name], this is [port authority]. The depth at the entrance is [X] metres at [high/low] water. Proceed to berth [X] on the [port/starboard] side of [pier/quay].'"},
    {q:"How do you spell a word using the phonetic alphabet in SMCP?",opts:["Just say the letters quickly","I spell: [Alpha, Bravo, Charlie...] for each letter of the word","Say it faster","Repeat it 3 times"],correct:1,expl:"Phonetic alphabet in SMCP: used to spell vessel names, call signs, waypoints, or any word that may be misunderstood. 'I spell [word]' then Alpha=A, Bravo=B, Charlie=C, Delta=D, Echo=E, Foxtrot=F, Golf=G, Hotel=H, India=I, Juliet=J, Kilo=K, Lima=L, Mike=M, November=N, Oscar=O, Papa=P, Quebec=Q, Romeo=R, Sierra=S, Tango=T, Uniform=U, Victor=V, Whiskey=W, X-ray=X, Yankee=Y, Zulu=Z."},
    {q:"What is the correct way to transmit a position when accuracy is uncertain?",opts:["Just give any position","Position approximate. Our position is Latitude [X], Longitude [X]. Position obtained by [method]. Accuracy [X] miles/metres.","Estimated position","We think we are at X"],correct:1,expl:"SMCP uncertain position: 'Position approximate. Our position is Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W. Position obtained by [dead reckoning/estimated/last known]. Accuracy approximately [X] miles/metres.' This is critical honesty in SMCP — never report a precise position if you are uncertain. 'Position doubtful' or 'position approximate' warn other parties and SAR services about the uncertainty in any search area."},
  ],
  fr:[
    {q:"Quelle est la phrase SMCP complète pour signaler un navire sur radar avec risque de collision ?",opts:["Navire devant !","I have a vessel on radar. Bearing [X] degrees [true/magnetic]. Range [X] miles. CPA [X] miles in [X] minutes. Risk of collision exists.","Contact radar","Il y a un navire"],correct:1,expl:"Rapport SMCP radar complet avec risque de collision : 'I have a vessel on radar. Bearing [X] degrees [true/magnetic]. Range [X] miles. CPA [X] miles in [X] minutes. Risk of collision exists.' Toujours donner : relèvement (3 chiffres + vrai/magnétique), distance en milles nautiques, CPA (distance minimale de passage) et TCPA (temps avant CPA)."},
    {q:"Comment signaler son ETA à un port en SMCP ?",opts:["J'arriverai à 14h00","My ETA is one four zero zero UTC. I require berth at [pier/anchorage X].","ETA 1400","J'arrive à 14:00"],correct:1,expl:"Rapport ETA SMCP : 'My ETA is [heure en UTC 4 chiffres]. I require berth at [quai/mouillage X].' Toujours donner l'heure en UTC avec les 4 chiffres prononcés individuellement. Toujours ajouter les besoins d'amarrage. Pour pilote : 'I require a pilot. ETA pilot station is [heure] UTC. My draught is [X] metres forward and [X] metres aft.'"},
    {q:"Quelle est la phrase SMCP quand on ne comprend pas un message ?",opts:["Quoi ?","I do not understand your message. Please repeat on channel [X] / use plain language.","Encore","Trop vite"],correct:1,expl:"'I do not understand your message. Please repeat.' ou 'Say again, please.' sont les phrases SMCP pour l'incompréhension. Vous pouvez ajouter : 'Please speak more slowly.' ou 'Please use plain language.' ou 'Please spell [word].' Ne jamais deviner un message non compris — toujours demander répétition."},
    {q:"Comment signaler un changement de cap pour éviter un navire ?",opts:["Je tourne","I am altering course to [port/starboard]. New course will be [X] degrees [true/magnetic] to avoid [vessel/danger].","Changement de cap","Je vire maintenant"],correct:1,expl:"Manœuvre d'évitement SMCP : 'I am altering course to [port/starboard]. New course will be [X] degrees [true/magnetic] to avoid [vessel/danger].' Communication active — vous informez l'autre navire de votre action. Aussi : 'I am reducing speed to [X] knots.' ou 'I am stopping my engines.' Ces phrases sont critiques lors des situations de routes très rapprochées."},
    {q:"Quelle est la phrase SMCP quand vous êtes sans gouverne (NUC) ?",opts:["Moteur en panne","I am not under command. I am unable to manoeuvre. Please keep clear.","Navire en avarie","Impossible de bouger"],correct:1,expl:"Phrase SMCP NUC (sans gouverne) : 'I am not under command. I am unable to manoeuvre. Please keep clear.' Ajouter aussi : 'I am showing [two all-round red lights/two black balls by day].' Et si dérivant : 'I am drifting in direction [X] degrees at [X] knots.' Toujours diffuser sur VHF 16 et si possible mettre à jour le statut AIS."},
    {q:"Comment signaler le mouillage en SMCP ?",opts:["Mouillé","I am anchoring in position Latitude [X], Longitude [X]. Depth [X] metres. [X] shackles of cable.","Ancre mouillée","Ancre à l'eau"],correct:1,expl:"Rapport d'ancrage SMCP : 'I am anchoring in position Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W. Depth [X] metres. [X] shackles of cable.' Aussi : 'Anchor is let go.' ou 'Anchor is holding well.' ou 'Anchor is dragging.' Au mouillage par brouillard : signal sonore approprié + signalisation lumineuse."},
    {q:"Que signifie 'I have the con' dans les communications de passerelle ?",opts:["J'ai la télécommande TV","J'ai pris le commandement de la navigation et des manœuvres du navire — c'est moi qui donne les ordres au timonier","J'ai les jumelles","Je regarde"],correct:1,expl:"'I have the con' (ou 'I have the conn') = j'ai assumé l'autorité de conduite — c'est moi qui donne les ordres de barre et de machine. 'You have the con' = transfert d'autorité. La confusion sur 'qui a le con' a causé des accidents. L'OOW a toujours le con sauf transfert explicite au capitaine ou pilote."},
    {q:"Comment donner un ordre de barre en SMCP ?",opts:["Tourne à gauche","Starboard / Port [X] degrees. Steady on [X] degrees.","Allez à droite","Barre à droite"],correct:1,expl:"Ordres de barre SMCP : 'Starboard [X] degrees' (virer à droite) ou 'Port [X] degrees' (virer à gauche). 'Midships' = barre droite. 'Steady' = maintenir ce cap. 'Steady on [X] degrees [true/magnetic]'. 'Hard to starboard/port' = barre toute. Le timonier répète toujours l'ordre."},
    {q:"Quelle est la phrase SMCP correcte pour signaler une visibilité réduite ?",opts:["Il y a du brouillard","Visibility is [X] miles/metres. I am proceeding at reduced speed. I am sounding fog signals in accordance with Rule 35.","On ne voit pas bien","Visibilité médiocre"],correct:1,expl:"Rapport de visibilité réduite SMCP : 'Visibility is [X] miles/metres. [Good/Moderate/Poor/Nil]. I am proceeding at reduced speed of [X] knots. I am sounding fog signals in accordance with Rule 35.' Ce rapport informe : distance de visibilité actuelle, action (réduction de vitesse), conformité COLREG Règle 35."},
    {q:"Comment confirmer la réception d'un ordre en SMCP ?",opts:["OK","Course is [X] degrees [true/magnetic]. Speed is [X] knots. [Order confirmed].","Oui capitaine","Compris"],correct:1,expl:"Confirmation d'ordre en SMCP : le timonier répète toujours l'ordre reçu. 'Starboard twenty — steering starboard twenty degrees' puis 'Steady on two seven five degrees true.' Ordre machine : 'Full ahead — engine is full ahead. RPM one two zero.' Cette communication 'en boucle fermée' garantit que les ordres sont correctement reçus et exécutés."},
    {q:"Qu'est-ce qu'un 'situation report' (SITREP) lors du quart de navigation ?",opts:["Un type de radio","Rapport standardisé donné lors du relève de quart : position · cap · vitesse · trafic · météo · consignes en vigueur · tâches en attente","Un exercice de sécurité","Un rapport de salle des machines"],correct:1,expl:"SITREP au relève de quart comprend : 1. Position (lat/long, méthode et heure du dernier point). 2. Cap (3 chiffres, vrai/magnétique). 3. Vitesse (nœuds, SOG/STW). 4. État des machines. 5. Trafic (navires à proximité, CPA). 6. Météo. 7. Dangers de navigation. 8. Ordres en vigueur. 9. Tâches en attente. 10. Instructions du capitaine."},
    {q:"Comment signaler un homme à la mer en SMCP ?",opts:["Quelqu'un est tombé","Man overboard! Starboard/Port side. Position Latitude [X], Longitude [X]. Time [UTC].","MOB !","Personne à l'eau"],correct:1,expl:"Rapport MOB SMCP : 'Man overboard! [Starboard/Port/Forward/Aft] side. Time [UTC]. Position Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W.' Suivi immédiatement de : PAN-PAN (ou MAYDAY si danger de vie) sur VHF 16. Puis : 'I am manoeuvring to recover person. All vessels in vicinity please assist.'"},
    {q:"Quelle est la phrase SMCP pour demander des informations sur un port ?",opts:["Parlez-moi du port","[Port authority/VTS], this is [vessel name]. Please advise: depth of water at entrance / berth availability / any navigation warnings.","Infos port svp","Comment est ce port ?"],correct:1,expl:"Demande d'informations port SMCP : '[Port authority/VTS], this is [vessel name] on channel [X]. Please advise depth of water at entrance. Berth availability for vessel of [X] metres length. Any navigation warnings or restrictions in force.'"},
    {q:"Comment épeler un mot en utilisant l'alphabet phonétique SMCP ?",opts:["Dire les lettres rapidement","I spell: [Alpha, Bravo, Charlie...] pour chaque lettre du mot","Le dire plus vite","Le répéter 3 fois"],correct:1,expl:"Alphabet phonétique SMCP : 'I spell [mot]' puis Alpha=A, Bravo=B, Charlie=C, Delta=D, Echo=E, Foxtrot=F, Golf=G, Hotel=H, India=I, Juliet=J, Kilo=K, Lima=L, Mike=M, November=N, Oscar=O, Papa=P, Quebec=Q, Romeo=R, Sierra=S, Tango=T, Uniform=U, Victor=V, Whiskey=W, X-ray=X, Yankee=Y, Zulu=Z."},
    {q:"Quelle est la façon correcte de transmettre une position incertaine ?",opts:["Donner n'importe quelle position","Position approximate. Our position is Latitude [X], Longitude [X]. Position obtained by [method]. Accuracy [X] miles/metres.","Position estimée","On pense être à X"],correct:1,expl:"Position incertaine SMCP : 'Position approximate. Our position is Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W. Position obtained by [dead reckoning/estimated/last known]. Accuracy approximately [X] miles/metres.' Ne jamais rapporter une position précise si vous êtes incertain. 'Position doubtful' ou 'position approximate' avertissent des incertitudes dans toute zone de recherche."},
  ],
  es:[
    {q:"¿Cuál es la frase SMCP completa para informar de un buque en el radar con riesgo de colisión?",opts:["¡Buque por delante!","I have a vessel on radar. Bearing [X] degrees [true/magnetic]. Range [X] miles. CPA [X] miles in [X] minutes. Risk of collision exists.","Contacto de radar","Hay un buque"],correct:1,expl:"Informe completo SMCP de radar con riesgo de colisión: 'I have a vessel on radar. Bearing [X] degrees [true/magnetic]. Range [X] miles. CPA [X] miles in [X] minutes. Risk of collision exists.' Siempre dar: marcación (3 cifras + verdadero/magnético), distancia en millas náuticas, CPA y TCPA."},
    {q:"¿Cómo se comunica la ETA a un puerto en SMCP?",opts:["Llegaré a las 1400","My ETA is one four zero zero UTC. I require berth at [pier/anchorage X].","ETA 1400","Llego a las 14:00"],correct:1,expl:"Informe ETA SMCP: 'My ETA is [hora en UTC 4 cifras]. I require berth at [muelle/fondeadero X].' Siempre dar la hora en UTC con las 4 cifras pronunciadas individualmente. Siempre añadir los requisitos de atraque."},
    {q:"¿Cuál es la frase SMCP cuando no se entiende un mensaje?",opts:["¿Qué?","I do not understand your message. Please repeat on channel [X] / use plain language.","Otra vez","Demasiado rápido"],correct:1,expl:"'I do not understand your message. Please repeat.' o 'Say again, please.' son las frases SMCP para la incomprensión. Puede añadir: 'Please speak more slowly.' o 'Please use plain language.' Nunca adivinar un mensaje no comprendido — siempre pedir repetición."},
    {q:"¿Cómo se informa de un cambio de rumbo para evitar otro buque?",opts:["Me giro","I am altering course to [port/starboard]. New course will be [X] degrees [true/magnetic] to avoid [vessel/danger].","Cambio de rumbo","Virando ahora"],correct:1,expl:"Maniobra de evasión SMCP: 'I am altering course to [port/starboard]. New course will be [X] degrees [true/magnetic] to avoid [vessel/danger].' Comunicación activa — informa al otro buque de tu acción. También: 'I am reducing speed to [X] knots.' o 'I am stopping my engines.'"},
    {q:"¿Cuál es la frase SMCP cuando está sin gobierno (NUC)?",opts:["Motor averiado","I am not under command. I am unable to manoeuvre. Please keep clear.","Buque averiado","Imposible maniobrar"],correct:1,expl:"Frase SMCP NUC (sin gobierno): 'I am not under command. I am unable to manoeuvre. Please keep clear.' Añadir también: 'I am showing [two all-round red lights/two black balls by day].' Y si deriva: 'I am drifting in direction [X] degrees at [X] knots.'"},
    {q:"¿Cómo se informa del fondeo en SMCP?",opts:["Fondeado","I am anchoring in position Latitude [X], Longitude [X]. Depth [X] metres. [X] shackles of cable.","Ancla fondeada","Ancla en el agua"],correct:1,expl:"Informe de fondeo SMCP: 'I am anchoring in position Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W. Depth [X] metres. [X] shackles of cable.' También: 'Anchor is let go.' o 'Anchor is holding well.' o 'Anchor is dragging.'"},
    {q:"¿Qué significa 'I have the con' en las comunicaciones del puente?",opts:["Tengo el mando a distancia del TV","He asumido el control de la navegación y la maniobra del buque — yo doy las órdenes al timonel","Tengo los prismáticos","Estoy mirando"],correct:1,expl:"'I have the con' = he asumido la autoridad de mando — yo doy las órdenes de timón y máquinas. 'You have the con' = transferencia de autoridad. La confusión sobre 'quién tiene el con' ha causado accidentes."},
    {q:"¿Cómo se da una orden de timón en SMCP?",opts:["Gira a la izquierda","Starboard / Port [X] degrees. Steady on [X] degrees.","Ve a la derecha","Timón a la derecha"],correct:1,expl:"Órdenes de timón SMCP: 'Starboard [X] degrees' (virar a la derecha) o 'Port [X] degrees' (virar a la izquierda). 'Midships' = timón al centro. 'Steady on [X] degrees [true/magnetic]'. 'Hard to starboard/port' = timón todo a una banda. El timonel siempre repite la orden."},
    {q:"¿Cuál es la frase SMCP correcta para informar de visibilidad reducida?",opts:["Hay niebla","Visibility is [X] miles/metres. I am proceeding at reduced speed. I am sounding fog signals in accordance with Rule 35.","No se ve bien","Visibilidad pobre"],correct:1,expl:"Informe de visibilidad reducida SMCP: 'Visibility is [X] miles/metres. [Good/Moderate/Poor/Nil]. I am proceeding at reduced speed of [X] knots. I am sounding fog signals in accordance with Rule 35.'"},
    {q:"¿Cómo se confirma la recepción de una orden en SMCP?",opts:["OK","Course is [X] degrees [true/magnetic]. Speed is [X] knots. [Order confirmed].","Sí capitán","Entendido"],correct:1,expl:"Confirmación de orden en SMCP: el timonel siempre repite la orden recibida. 'Starboard twenty — steering starboard twenty degrees' luego 'Steady on two seven five degrees true.' Esta comunicación en 'bucle cerrado' garantiza que las órdenes se reciben y ejecutan correctamente."},
    {q:"¿Qué es un 'situation report' (SITREP) en la guardia de navegación?",opts:["Un tipo de radio","Informe estandarizado dado en el cambio de guardia: posición · rumbo · velocidad · tráfico · meteorología · órdenes vigentes · tareas pendientes","Un ejercicio de seguridad","Un informe de máquinas"],correct:1,expl:"SITREP en el cambio de guardia incluye: 1. Posición. 2. Rumbo. 3. Velocidad. 4. Estado de las máquinas. 5. Tráfico. 6. Meteorología. 7. Peligros de navegación. 8. Órdenes en vigor. 9. Tareas pendientes. 10. Instrucciones del capitán."},
    {q:"¿Cómo se informa de un hombre al agua en SMCP?",opts:["Alguien cayó","Man overboard! Starboard/Port side. Position Latitude [X], Longitude [X]. Time [UTC].","¡MOB!","Persona en el agua"],correct:1,expl:"Informe MOB SMCP: 'Man overboard! [Starboard/Port/Forward/Aft] side. Time [UTC]. Position Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W.' Seguido inmediatamente de: PAN-PAN (o MAYDAY si peligro de vida) en VHF 16."},
    {q:"¿Cuál es la frase SMCP para solicitar información sobre un puerto?",opts:["Cuénteme sobre el puerto","[Port authority/VTS], this is [vessel name]. Please advise: depth of water at entrance / berth availability / any navigation warnings.","Información del puerto por favor","¿Cómo es el puerto?"],correct:1,expl:"Solicitud de información de puerto SMCP: '[Port authority/VTS], this is [vessel name] on channel [X]. Please advise depth of water at entrance. Berth availability for vessel of [X] metres length. Any navigation warnings or restrictions in force.'"},
    {q:"¿Cómo se deletrea una palabra usando el alfabeto fonético SMCP?",opts:["Decir las letras rápidamente","I spell: [Alpha, Bravo, Charlie...] para cada letra de la palabra","Decirlo más rápido","Repetirlo 3 veces"],correct:1,expl:"Alfabeto fonético SMCP: 'I spell [palabra]' luego Alpha=A, Bravo=B, Charlie=C, Delta=D, Echo=E, Foxtrot=F, Golf=G, Hotel=H, India=I, Juliet=J, Kilo=K, Lima=L, Mike=M, November=N, Oscar=O, Papa=P, Quebec=Q, Romeo=R, Sierra=S, Tango=T, Uniform=U, Victor=V, Whiskey=W, X-ray=X, Yankee=Y, Zulu=Z."},
    {q:"¿Cuál es la forma correcta de transmitir una posición cuando la precisión es incierta?",opts:["Dar cualquier posición","Position approximate. Our position is Latitude [X], Longitude [X]. Position obtained by [method]. Accuracy [X] miles/metres.","Posición estimada","Creemos estar en X"],correct:1,expl:"Posición incierta SMCP: 'Position approximate. Our position is Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W. Position obtained by [dead reckoning/estimated/last known]. Accuracy approximately [X] miles/metres.' Nunca informar de una posición precisa si no estás seguro."},
  ],
  pt:[
    {q:"Qual é a frase SMCP completa para reportar um navio no radar com risco de colisão?",opts:["Navio à frente!","I have a vessel on radar. Bearing [X] degrees [true/magnetic]. Range [X] miles. CPA [X] miles in [X] minutes. Risk of collision exists.","Contacto de radar","Há um navio"],correct:1,expl:"Relatório SMCP completo de radar com risco de colisão: 'I have a vessel on radar. Bearing [X] degrees [true/magnetic]. Range [X] miles. CPA [X] miles in [X] minutes. Risk of collision exists.' Sempre dar: marcação (3 dígitos + verdadeiro/magnético), distância em milhas náuticas, CPA e TCPA."},
    {q:"Como se comunica a ETA a um porto em SMCP?",opts:["Chegarei às 1400","My ETA is one four zero zero UTC. I require berth at [pier/anchorage X].","ETA 1400","Chego às 14:00"],correct:1,expl:"Relatório ETA SMCP: 'My ETA is [hora em UTC 4 dígitos]. I require berth at [cais/fundeadouro X].' Sempre dar a hora em UTC com os 4 dígitos pronunciados individualmente. Sempre adicionar os requisitos de atracação."},
    {q:"Qual é a frase SMCP quando não se percebe uma mensagem?",opts:["O quê?","I do not understand your message. Please repeat on channel [X] / use plain language.","Mais uma vez","Demasiado rápido"],correct:1,expl:"'I do not understand your message. Please repeat.' ou 'Say again, please.' são as frases SMCP para incompreensão. Pode adicionar: 'Please speak more slowly.' ou 'Please use plain language.' Nunca adivinhar uma mensagem não compreendida — sempre pedir repetição."},
    {q:"Como se reporta uma alteração de rumo para evitar outro navio?",opts:["Estou a virar","I am altering course to [port/starboard]. New course will be [X] degrees [true/magnetic] to avoid [vessel/danger].","Mudança de rumo","A virar agora"],correct:1,expl:"Manobra de evasão SMCP: 'I am altering course to [port/starboard]. New course will be [X] degrees [true/magnetic] to avoid [vessel/danger].' Comunicação ativa — informa o outro navio da sua ação. Também: 'I am reducing speed to [X] knots.' ou 'I am stopping my engines.'"},
    {q:"Qual é a frase SMCP quando está sem governo (NUC)?",opts:["Motor avariado","I am not under command. I am unable to manoeuvre. Please keep clear.","Navio avariado","Impossível manobrar"],correct:1,expl:"Frase SMCP NUC (sem governo): 'I am not under command. I am unable to manoeuvre. Please keep clear.' Adicionar também: 'I am showing [two all-round red lights/two black balls by day].' E se a derivar: 'I am drifting in direction [X] degrees at [X] knots.'"},
    {q:"Como se reporta o fundeamento em SMCP?",opts:["Fundeado","I am anchoring in position Latitude [X], Longitude [X]. Depth [X] metres. [X] shackles of cable.","Âncora fundeada","Âncora na água"],correct:1,expl:"Relatório de fundeamento SMCP: 'I am anchoring in position Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W. Depth [X] metres. [X] shackles of cable.' Também: 'Anchor is let go.' ou 'Anchor is holding well.' ou 'Anchor is dragging.'"},
    {q:"O que significa 'I have the con' nas comunicações da ponte?",opts:["Tenho o controlo remoto da TV","Assumi o controlo da navegação e manobra do navio — sou eu que dou as ordens ao timoneiro","Tenho os binóculos","Estou a observar"],correct:1,expl:"'I have the con' = assumi a autoridade de condução — sou eu que dou as ordens de leme e máquinas. 'You have the con' = transferência de autoridade. A confusão sobre 'quem tem o con' causou acidentes."},
    {q:"Como se dá uma ordem de leme em SMCP?",opts:["Vira à esquerda","Starboard / Port [X] degrees. Steady on [X] degrees.","Vai à direita","Leme à direita"],correct:1,expl:"Ordens de leme SMCP: 'Starboard [X] degrees' (virar à direita) ou 'Port [X] degrees' (virar à esquerda). 'Midships' = leme ao centro. 'Steady on [X] degrees [true/magnetic]'. 'Hard to starboard/port' = leme todo. O timoneiro repete sempre a ordem."},
    {q:"Qual é a frase SMCP correta para reportar visibilidade reduzida?",opts:["Há nevoeiro","Visibility is [X] miles/metres. I am proceeding at reduced speed. I am sounding fog signals in accordance with Rule 35.","Não se vê bem","Visibilidade pobre"],correct:1,expl:"Relatório de visibilidade reduzida SMCP: 'Visibility is [X] miles/metres. [Good/Moderate/Poor/Nil]. I am proceeding at reduced speed of [X] knots. I am sounding fog signals in accordance with Rule 35.'"},
    {q:"Como se confirma a receção de uma ordem em SMCP?",opts:["OK","Course is [X] degrees [true/magnetic]. Speed is [X] knots. [Order confirmed].","Sim capitão","Compreendido"],correct:1,expl:"Confirmação de ordem em SMCP: o timoneiro repete sempre a ordem recebida. 'Starboard twenty — steering starboard twenty degrees' depois 'Steady on two seven five degrees true.' Esta comunicação em 'circuito fechado' garante que as ordens são corretamente recebidas e executadas."},
    {q:"O que é um 'situation report' (SITREP) no quarto de navegação?",opts:["Um tipo de rádio","Relatório normalizado dado na rendição de quarto: posição · rumo · velocidade · tráfego · meteorologia · ordens em vigor · tarefas pendentes","Um exercício de segurança","Um relatório de máquinas"],correct:1,expl:"SITREP na rendição de quarto inclui: 1. Posição. 2. Rumo. 3. Velocidade. 4. Estado das máquinas. 5. Tráfego. 6. Meteorologia. 7. Perigos de navegação. 8. Ordens em vigor. 9. Tarefas pendentes. 10. Instruções do capitão."},
    {q:"Como se reporta um homem ao mar em SMCP?",opts:["Alguém caiu","Man overboard! Starboard/Port side. Position Latitude [X], Longitude [X]. Time [UTC].","MOB!","Pessoa na água"],correct:1,expl:"Relatório MOB SMCP: 'Man overboard! [Starboard/Port/Forward/Aft] side. Time [UTC]. Position Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W.' Seguido imediatamente de: PAN-PAN (ou MAYDAY se perigo de vida) no VHF 16."},
    {q:"Qual é a frase SMCP para solicitar informações sobre um porto?",opts:["Fale-me do porto","[Port authority/VTS], this is [vessel name]. Please advise: depth of water at entrance / berth availability / any navigation warnings.","Informações do porto","Como é o porto?"],correct:1,expl:"Pedido de informações de porto SMCP: '[Port authority/VTS], this is [vessel name] on channel [X]. Please advise depth of water at entrance. Berth availability for vessel of [X] metres length. Any navigation warnings or restrictions in force.'"},
    {q:"Como se soletra uma palavra usando o alfabeto fonético SMCP?",opts:["Dizer as letras rapidamente","I spell: [Alpha, Bravo, Charlie...] para cada letra da palavra","Dizer mais rápido","Repeti-la 3 vezes"],correct:1,expl:"Alfabeto fonético SMCP: 'I spell [palavra]' depois Alpha=A, Bravo=B, Charlie=C, Delta=D, Echo=E, Foxtrot=F, Golf=G, Hotel=H, India=I, Juliet=J, Kilo=K, Lima=L, Mike=M, November=N, Oscar=O, Papa=P, Quebec=Q, Romeo=R, Sierra=S, Tango=T, Uniform=U, Victor=V, Whiskey=W, X-ray=X, Yankee=Y, Zulu=Z."},
    {q:"Qual é a forma correta de transmitir uma posição quando a precisão é incerta?",opts:["Dar qualquer posição","Position approximate. Our position is Latitude [X], Longitude [X]. Position obtained by [method]. Accuracy [X] miles/metres.","Posição estimada","Pensamos estar em X"],correct:1,expl:"Posição incerta SMCP: 'Position approximate. Our position is Latitude [X]°[X]'N/S, Longitude [X]°[X]'E/W. Position obtained by [dead reckoning/estimated/last known]. Accuracy approximately [X] miles/metres.' Nunca reportar uma posição precisa se estiver incerto."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.en;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.smcp},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4,fontFamily:"'Courier New',monospace"}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.smcp},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:10},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.3}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.smcp}33,${C.watch}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:`${C.smcp}15`,border:`1px solid ${C.smcp}44`,fontSize:14,color:C.smcp,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.smcp}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.smcp,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.smcp:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4,fontFamily:"'Courier New',monospace"}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white,fontFamily:"'Nunito',sans-serif"}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.smcp},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    en:{
      badge:"🗣️ Maritime English SMCP · Lesson 1/8 · ⭐ Premium · 200 XP",
      title:"Bridge Watch & Reporting",
      intro:"Standard Marine Communication Phrases (SMCP) — published by IMO — is the universal language of the sea. On the bridge, every word must be precise and unambiguous. A misunderstood order or position can cost lives.\n\nThis lesson covers watch handover, position reporting, SMCP formats and key operational phrases.",
      p1:"PART 1 — WATCH HANDOVER",s1t:"Opening · Position · Course · Speed · Closing",
      s1:"WATCH HANDOVER (SMCP):\n\nOPENING:\n'I am ready to hand over the watch.'\n\nMANDATORY INFORMATION:\n1. Position (Lat/Long + method + time)\n2. Course (3 digits + true/magnetic)\n3. Speed (knots + SOG/STW)\n4. Engine status\n5. Traffic (CPA/TCPA)\n6. Weather + visibility\n7. Outstanding orders\n\nCLOSING (MANDATORY):\n'I have now taken over the watch.\nI am the officer of the watch.'",
      p2:"PART 2 — SMCP PHRASE FLASHCARDS",s1t:"Position · Traffic · Weather · Reporting",
      s2:"KEY SMCP FORMATS:\n\nPOSITION:\n'Our position is Latitude [X]°[X]'N,\nLongitude [X]°[X]'E.'\n\nCOURSE: 'Course is [XXX] degrees true.'\n(Always 3 digits)\n\nSPEED: 'Speed is [X] knots.'\n\nVISIBILITY:\n'Visibility is [X] miles/metres.\n[Good/Moderate/Poor/Fog].'",
      p3:"PART 3 — SMCP FORMATS",s1t:"Numbers · Time · Courses · Keywords",
      s3:"SMCP NUMBERS:\n9 = NINER (not 'nine')\n5 = FIFE (not 'five')\n\nSMCP TIME: always UTC\n'zero three four five UTC'\n\nSMCP COURSES: always 3 digits\n090° = 'zero niner zero degrees true'\n\nKEY PHRASES:\nNEGATIVE = No\nAFFIRMATIVE = Yes\nWILCO = Understood, I will comply\nROGER = Received and understood\nSAY AGAIN = Repeat\nSTAND BY = Wait\nOVER = Reply expected\nOUT = Communication ended",
      p4:"PART 4 — SMCP VOCAB QUIZ",s1t:"5 key terms to identify",
      s4:"SMCP TERM MEANINGS:\n\nWILCO → Understood + I will comply\nSAY AGAIN → Please repeat\nNEGATIVE → No\nSTAND BY → Wait\nCORRECTION → Error, correct version follows",
      p5:"🎯 EXERCISES",p6:"📝 QUESTION BANK — 15 QUESTIONS",
      sumT:"SUMMARY — BRIDGE WATCH L1",
      sumP:["Watch handover: 'I am ready to hand over' → 'I have now taken over the watch'","Position format: Latitude [X]° [X]'N/S, Longitude [X]° [X]'E/W + method + time","Course: always 3 digits + true/magnetic (zero niner zero = 090°)","Time: always UTC, 4-digit format (zero three four five UTC)","9 = NINER · 5 = FIFE · NEGATIVE = No · AFFIRMATIVE = Yes","WILCO = I will comply · ROGER = received · SAY AGAIN = repeat","OVER = reply expected · OUT = communication ended","SITREP = full situational report at each watch handover"],
      learnedP:["SMCP watch handover: opening + mandatory info + closing phrase","Position, course, speed reporting formats","SMCP number and time pronunciation","Key operational phrases: WILCO · ROGER · SAY AGAIN · NEGATIVE","Flashcard categories: position · traffic · weather · reporting"],
    },
    fr:{
      badge:"🗣️ Anglais Maritime SMCP · Leçon 1/8 · ⭐ Premium · 200 XP",
      title:"Quart de Passerelle & Rapports",
      intro:"Standard Marine Communication Phrases (SMCP) — publiées par l'OMI — est la langue universelle de la mer. À la passerelle, chaque mot doit être précis et sans ambiguïté. Un ordre ou une position mal compris peut coûter des vies.",
      p1:"PARTIE 1 — RELÈVE DE QUART",s1t:"Ouverture · Position · Cap · Vitesse · Clôture",
      s1:"RELÈVE DE QUART (SMCP) :\n\nOUVERTURE :\n'I am ready to hand over the watch.'\n\nINFORMATIONS OBLIGATOIRES :\n1. Position (Lat/Long + méthode + heure)\n2. Cap (3 chiffres + vrai/magnétique)\n3. Vitesse (nœuds + SOG/STW)\n4. État des machines\n5. Trafic (CPA/TCPA)\n6. Météo + visibilité\n7. Ordres en vigueur\n\nCLÔTURE (OBLIGATOIRE) :\n'I have now taken over the watch.\nI am the officer of the watch.'",
      p2:"PARTIE 2 — FICHES SMCP",s1t:"Position · Trafic · Météo · Rapports",
      s2:"FORMATS SMCP CLÉS :\n\nPOSITION :\n'Our position is Latitude [X]°[X]'N,\nLongitude [X]°[X]'E.'\n\nCAP : 'Course is [XXX] degrees true.'\n(Toujours 3 chiffres)\n\nVITESSE : 'Speed is [X] knots.'\n\nVISIBILITÉ :\n'Visibility is [X] miles/metres.\n[Good/Moderate/Poor/Fog].'",
      p3:"PARTIE 3 — FORMATS SMCP",s1t:"Chiffres · Heure · Caps · Mots clés",
      s3:"CHIFFRES SMCP :\n9 = NINER (pas 'nine')\n5 = FIFE (pas 'five')\n\nHEURE SMCP : toujours UTC\n'zero three four five UTC'\n\nCAPS SMCP : toujours 3 chiffres\n090° = 'zero niner zero degrees true'\n\nPHRASES CLÉS :\nNEGATIVE = Non · AFFIRMATIVE = Oui\nWILCO = Compris, j'exécute\nROGER = Reçu et compris\nSAY AGAIN = Répétez\nSTAND BY = Attendez\nOVER = Réponse attendue\nOUT = Communication terminée",
      p4:"PARTIE 4 — QUIZ VOCABULAIRE SMCP",s1t:"5 termes clés à identifier",
      s4:"SIGNIFICATIONS SMCP :\nWILCO → Compris + je vais exécuter\nSAY AGAIN → Veuillez répéter\nNEGATIVE → Non\nSTAND BY → Attendez\nCORRECTION → Erreur, version correcte suit",
      p5:"🎯 EXERCICES",p6:"📝 BANQUE 15 QUESTIONS",
      sumT:"RÉSUMÉ — QUART PASSERELLE L1",
      sumP:["Relève de quart : 'I am ready to hand over' → 'I have now taken over the watch'","Format position : Latitude [X]° [X]'N/S, Longitude [X]° [X]'E/W + méthode + heure","Cap : toujours 3 chiffres + vrai/magnétique (zero niner zero = 090°)","Heure : toujours UTC, format 4 chiffres (zero three four five UTC)","9 = NINER · 5 = FIFE · NEGATIVE = Non · AFFIRMATIVE = Oui","WILCO = j'exécute · ROGER = reçu · SAY AGAIN = répétez","OVER = réponse attendue · OUT = communication terminée","SITREP = rapport situationnel complet à chaque relève de quart"],
      learnedP:["Relève de quart SMCP : ouverture + infos obligatoires + phrase de clôture","Formats position, cap, vitesse","Prononciation chiffres et heure SMCP","Phrases opérationnelles clés : WILCO · ROGER · SAY AGAIN · NEGATIVE","Catégories de fiches : position · trafic · météo · rapports"],
    },
    es:{
      badge:"🗣️ Inglés Marítimo SMCP · Lección 1/8 · ⭐ Premium · 200 XP",
      title:"Guardia de Puente e Informes",
      intro:"Standard Marine Communication Phrases (SMCP) — publicadas por la OMI — es el lenguaje universal del mar. En el puente, cada palabra debe ser precisa e inequívoca.",
      p1:"PARTE 1 — CAMBIO DE GUARDIA",s1t:"Apertura · Posición · Rumbo · Velocidad · Cierre",
      s1:"CAMBIO DE GUARDIA (SMCP):\n\nAPERTURA:\n'I am ready to hand over the watch.'\n\nINFORMACIÓN OBLIGATORIA:\n1. Posición (Lat/Long + método + hora)\n2. Rumbo (3 cifras + verdadero/magnético)\n3. Velocidad (nudos + SOG/STW)\n4. Estado de las máquinas\n5. Tráfico (CPA/TCPA)\n6. Meteorología + visibilidad\n7. Órdenes vigentes\n\nCIERRE (OBLIGATORIO):\n'I have now taken over the watch.\nI am the officer of the watch.'",
      p2:"PARTE 2 — FICHAS SMCP",s1t:"Posición · Tráfico · Meteorología · Informes",
      s2:"FORMATOS SMCP CLAVE:\nPOSICIÓN: 'Our position is Latitude [X]°[X]'N, Longitude [X]°[X]'E.'\nRUMBO: 'Course is [XXX] degrees true.'\nVELOCIDAD: 'Speed is [X] knots.'\nVISIBILIDAD: 'Visibility is [X] miles/metres.'",
      p3:"PARTE 3 — FORMATOS SMCP",s1t:"Números · Hora · Rumbos · Palabras clave",
      s3:"NÚMEROS SMCP: 9=NINER · 5=FIFE\nHORA: siempre UTC · 'zero three four five UTC'\nRUMBOS: siempre 3 cifras · 090°='zero niner zero degrees true'\nPALABRAS CLAVE:\nNEGATIVE=No · AFFIRMATIVE=Sí\nWILCO=Entendido, lo ejecutaré\nROGER=Recibido · SAY AGAIN=Repita\nSTAND BY=Espere · OVER=A usted · OUT=Fin",
      p4:"PARTE 4 — QUIZ VOCABULARIO SMCP",s1t:"5 términos clave a identificar",
      s4:"SIGNIFICADOS SMCP:\nWILCO → Entendido + lo ejecutaré\nSAY AGAIN → Por favor repita\nNEGATIVE → No\nSTAND BY → Espere\nCORRECTION → Error, versión correcta a continuación",
      p5:"🎯 EJERCICIOS",p6:"📝 BANCO 15 PREGUNTAS",
      sumT:"RESUMEN — GUARDIA DE PUENTE L1",
      sumP:["Cambio de guardia: 'I am ready to hand over' → 'I have now taken over the watch'","Formato posición: Latitude [X]° [X]'N/S, Longitude [X]° [X]'E/W + método + hora","Rumbo: siempre 3 cifras + verdadero/magnético (zero niner zero = 090°)","Hora: siempre UTC, formato 4 cifras (zero three four five UTC)","9 = NINER · 5 = FIFE · NEGATIVE = No · AFFIRMATIVE = Sí","WILCO = lo ejecutaré · ROGER = recibido · SAY AGAIN = repita","OVER = a usted · OUT = fin de comunicación","SITREP = informe situacional completo en cada cambio de guardia"],
      learnedP:["Cambio de guardia SMCP: apertura + info obligatoria + frase de cierre","Formatos posición, rumbo, velocidad","Pronunciación números y hora SMCP","Frases operacionales clave: WILCO · ROGER · SAY AGAIN · NEGATIVE","Categorías de fichas: posición · tráfico · meteorología · informes"],
    },
    pt:{
      badge:"🗣️ Inglês Marítimo SMCP · Lição 1/8 · ⭐ Premium · 200 XP",
      title:"Quarto de Ponte e Relatórios",
      intro:"Standard Marine Communication Phrases (SMCP) — publicadas pela IMO — é a linguagem universal do mar. Na ponte, cada palavra deve ser precisa e inequívoca.",
      p1:"PARTE 1 — RENDIÇÃO DE QUARTO",s1t:"Abertura · Posição · Rumo · Velocidade · Encerramento",
      s1:"RENDIÇÃO DE QUARTO (SMCP):\n\nABERTURA:\n'I am ready to hand over the watch.'\n\nINFORMAÇÃO OBRIGATÓRIA:\n1. Posição (Lat/Long + método + hora)\n2. Rumo (3 dígitos + verdadeiro/magnético)\n3. Velocidade (nós + SOG/STW)\n4. Estado das máquinas\n5. Tráfego (CPA/TCPA)\n6. Meteorologia + visibilidade\n7. Ordens em vigor\n\nENCERRAMENTO (OBRIGATÓRIO):\n'I have now taken over the watch.\nI am the officer of the watch.'",
      p2:"PARTE 2 — FICHAS SMCP",s1t:"Posição · Tráfego · Meteorologia · Relatórios",
      s2:"FORMATOS SMCP CHAVE:\nPOSIÇÃO: 'Our position is Latitude [X]°[X]'N, Longitude [X]°[X]'E.'\nRUMO: 'Course is [XXX] degrees true.'\nVELOCIDADE: 'Speed is [X] knots.'\nVISIBILIDADE: 'Visibility is [X] miles/metres.'",
      p3:"PARTE 3 — FORMATOS SMCP",s1t:"Números · Hora · Rumos · Palavras chave",
      s3:"NÚMEROS SMCP: 9=NINER · 5=FIFE\nHORA: sempre UTC · 'zero three four five UTC'\nRUMOS: sempre 3 dígitos · 090°='zero niner zero degrees true'\nPALAVRAS CHAVE:\nNEGATIVE=Não · AFFIRMATIVE=Sim\nWILCO=Compreendido, vou executar\nROGER=Recebido · SAY AGAIN=Repita\nSTAND BY=Aguarde · OVER=A você · OUT=Fim",
      p4:"PARTE 4 — QUIZ VOCABULÁRIO SMCP",s1t:"5 termos chave a identificar",
      s4:"SIGNIFICADOS SMCP:\nWILCO → Compreendido + vou executar\nSAY AGAIN → Por favor repita\nNEGATIVE → Não\nSTAND BY → Aguarde\nCORRECTION → Erro, versão correta a seguir",
      p5:"🎯 EXERCÍCIOS",p6:"📝 BANCO 15 QUESTÕES",
      sumT:"RESUMO — QUARTO DE PONTE L1",
      sumP:["Rendição de quarto: 'I am ready to hand over' → 'I have now taken over the watch'","Formato posição: Latitude [X]° [X]'N/S, Longitude [X]° [X]'E/W + método + hora","Rumo: sempre 3 dígitos + verdadeiro/magnético (zero niner zero = 090°)","Hora: sempre UTC, formato 4 dígitos (zero three four five UTC)","9 = NINER · 5 = FIFE · NEGATIVE = Não · AFFIRMATIVE = Sim","WILCO = vou executar · ROGER = recebido · SAY AGAIN = repita","OVER = a você · OUT = fim de comunicação","SITREP = relatório situacional completo em cada rendição de quarto"],
      learnedP:["Rendição de quarto SMCP: abertura + info obrigatória + frase de encerramento","Formatos posição, rumo, velocidade","Pronúncia números e hora SMCP","Frases operacionais chave: WILCO · ROGER · SAY AGAIN · NEGATIVE","Categorias de fichas: posição · tráfego · meteorologia · relatórios"],
    },
  };
  return d[lang]||d.en;
};

export default function LessonSMCP_L1({ lang="en", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.en;const quiz=QUIZ[lang]||QUIZ.en;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#000814 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.smcp}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.smcp,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🗣️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/8":lang==="en"?"Lesson 1/8":lang==="es"?"Lección 1/8":"Lição 1/8"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.smcp,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.smcp},${C.watch},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.smcp}15`,border:`1px solid ${C.smcp}44`,fontSize:11,color:C.smcp,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.smcp}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="🔄" text={lc.p1} color={C.watch}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,background:"rgba(0,5,20,0.7)",border:`1px solid ${C.watch}22`}}>
              <div style={{fontSize:11,color:C.watch,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔄 {lang==="fr"?"SIMULATEUR RELÈVE DE QUART":lang==="en"?"WATCH HANDOVER SIMULATOR":lang==="es"?"SIMULADOR CAMBIO DE GUARDIA":"SIMULADOR MUDANÇA DE QUARTO"}</div>
              <WatchHandoverSVG lang={lang}/>
            </Card>
            <SL icon="🃏" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}22`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🃏 {lang==="fr"?"FICHES SMCP INTERACTIVES":lang==="en"?"SMCP INTERACTIVE FLASHCARDS":lang==="es"?"FICHAS SMCP INTERACTIVAS":"FICHAS SMCP INTERATIVAS"}</div>
              <SMCPFlashcardsSVG lang={lang}/>
            </Card>
            <SL icon="📐" text={lc.p3} color={C.smcp}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.smcp}22`}}>
              <div style={{fontSize:11,color:C.smcp,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📐 {lang==="fr"?"FORMATS & MOTS CLÉS SMCP":lang==="en"?"SMCP FORMATS & KEYWORDS":lang==="es"?"FORMATOS Y PALABRAS CLAVE SMCP":"FORMATOS E PALAVRAS-CHAVE SMCP"}</div>
              <SMCPFormatsSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎯 {lang==="fr"?"QUIZ VOCABULAIRE SMCP":lang==="en"?"SMCP VOCABULARY QUIZ":lang==="es"?"QUIZ VOCABULARIO SMCP":"QUIZ VOCABULÁRIO SMCP"}</div>
              <SMCPVocabQuiz lang={lang}/>
            </Card>
            <SL icon="📝" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="📚" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:`${C.smcp}08`,border:`1px solid ${C.smcp}22`}}>
              <div style={{fontSize:11,color:C.smcp,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.smcp,fontWeight:700,fontFamily:"'Courier New',monospace"}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.smcp},${C.watch},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 10px 36px ${C.smcp}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Bridge Watch & SMCP</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 1":lang==="en"?"Lesson 1":lang==="es"?"Lección 1":"Lição 1"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.smcp}15`,border:`1px solid ${C.smcp}55`,fontSize:14,color:C.smcp,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.smcp,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.smcp},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 8px 28px ${C.smcp}33`,marginBottom:10}}>
              {lang==="fr"?"LEÇON 2 — PORT & VTS →":lang==="en"?"LESSON 2 — PORT & VTS →":lang==="es"?"LECCIÓN 2 — PUERTO Y VTS →":"LIÇÃO 2 — PORTO E VTS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
