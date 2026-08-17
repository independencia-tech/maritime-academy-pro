import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  med:"#ec4899", urgent:"#f97316", safe:"#22c55e", info:"#38bdf8",
};

const T = {
  fr:{ back:"◀ Retour", module:"Maritime English SMCP", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Maritime English SMCP", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Inglés Marítimo SMCP", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Inglês Marítimo SMCP", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — PAN-PAN MEDICO SIMULATOR
// ══════════════════════════════════════
function PanPanMedicoSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [showTr, setShowTr] = useState(false);

  const procedure = [
    { role:"OOW", color:C.med, icon:"🏥",
      smcp:"PAN-PAN PAN-PAN PAN-PAN\nAll stations. All stations. All stations.\nThis is MV MERIDIAN STAR, MV MERIDIAN STAR.\nI have a medical emergency on board.\nI require medical advice.\nOver.",
      tr:{fr:"PAN-PAN PAN-PAN PAN-PAN\nToutes stations. Toutes stations. Toutes stations.\nIci MV MERIDIAN STAR, MV MERIDIAN STAR.\nJ'ai une urgence médicale à bord.\nJe demande des conseils médicaux.\nTerminé.",
      es:"PAN-PAN PAN-PAN PAN-PAN\nTodas las estaciones. Todas las estaciones. Todas las estaciones.\nAquí MV MERIDIAN STAR, MV MERIDIAN STAR.\nTengo una emergencia médica a bordo.\nSolicito asesoramiento médico.\nCambio.",
      pt:"PAN-PAN PAN-PAN PAN-PAN\nTodas as estações. Todas as estações. Todas as estações.\nAqui MV MERIDIAN STAR, MV MERIDIAN STAR.\nTenho uma emergência médica a bordo.\nSolicito aconselhamento médico.\nCâmbio."},
      note:{fr:"APPEL PAN-PAN MÉDICAL\n\nPHRASE D'OUVERTURE :\n→ PAN-PAN × 3 (pas MAYDAY sauf danger de vie immédiat)\n→ All stations (ou nom MRCC si connu)\n→ Nom du navire × 2\n→ Nature = urgence médicale\n→ Demande de conseil médical\n\nSUR QUEL CANAL ?\n→ CH 16 d'abord pour l'alerte\n→ Puis le MRCC vous orientera vers MEDICO\n→ CIRM (Italie), CCMM (France), etc.\n\nSi danger de vie IMMÉDIAT → MAYDAY",
            en:"MEDICAL PAN-PAN CALL\n\nOPENING PHRASE:\n→ PAN-PAN × 3 (not MAYDAY unless immediate life danger)\n→ All stations (or MRCC name if known)\n→ Vessel name × 2\n→ Nature = medical emergency\n→ Request for medical advice\n\nWHICH CHANNEL?\n→ CH 16 first for the alert\n→ MRCC will direct you to MEDICO\n→ CIRM (Italy), CCMM (France), etc.\n\nIf IMMEDIATE life danger → MAYDAY",
            es:"LLAMADA PAN-PAN MÉDICA\n\nFRASE DE APERTURA:\n→ PAN-PAN × 3 (no MAYDAY salvo peligro de vida inmediato)\n→ All stations (o nombre MRCC si se conoce)\n→ Nombre del buque × 2\n→ Naturaleza = emergencia médica\n→ Solicitud de consejo médico",
            pt:"CHAMADA PAN-PAN MÉDICA\n\nFRASE DE ABERTURA:\n→ PAN-PAN × 3 (não MAYDAY a menos que perigo de vida imediato)\n→ All stations (ou nome MRCC se conhecido)\n→ Nome do navio × 2\n→ Natureza = emergência médica\n→ Pedido de conselho médico"} },
    { role:"MRCC", color:C.info, icon:"🛟",
      smcp:"MV MERIDIAN STAR, this is CROSS MED.\nReceived your PAN-PAN medical.\nSwitch to channel 67 for medical consultation.\nPlease provide full details of the patient.\nOver.",
      tr:{fr:"MV MERIDIAN STAR, ici CROSS MED.\nReçu votre PAN-PAN médical.\nPassez sur le canal 67 pour la consultation médicale.\nVeuillez fournir tous les détails du patient.\nTerminé.",
      es:"MV MERIDIAN STAR, aquí CROSS MED.\nRecibido su PAN-PAN médico.\nCambie al canal 67 para la consulta médica.\nPor favor proporcione todos los detalles del paciente.\nCambio.",
      pt:"MV MERIDIAN STAR, aqui CROSS MED.\nRecebido o seu PAN-PAN médico.\nMude para o canal 67 para a consulta médica.\nPor favor forneça todos os detalhes do paciente.\nCâmbio."},
      note:{fr:"RÉPONSE DU MRCC\n\n→ Accusé de réception du PAN-PAN\n→ Direction vers canal médical (souvent 67)\n→ Demande de détails complets du patient\n\nINFOS MÉDICALES REQUISES (SMCP) :\n1. Nom, âge, sexe du patient\n2. Nature de la maladie/blessure\n3. Symptômes (description détaillée)\n4. Signes vitaux (pouls, tension, température, respiration)\n5. Médicaments déjà administrés\n6. Médicaments disponibles à bord\n7. Position du navire et ETA au port le plus proche",
            en:"MRCC RESPONSE\n\n→ PAN-PAN acknowledgment\n→ Direction to medical channel (often 67)\n→ Request for full patient details\n\nREQUIRED MEDICAL INFORMATION (SMCP):\n1. Patient name, age, sex\n2. Nature of illness/injury\n3. Symptoms (detailed description)\n4. Vital signs (pulse, BP, temperature, respiration)\n5. Medication already given\n6. Medication available on board\n7. Vessel position and ETA to nearest port",
            es:"RESPUESTA DEL MRCC\n\n→ Acuse de recibo del PAN-PAN\n→ Dirección al canal médico (a menudo 67)\n→ Solicitud de detalles completos del paciente\n\nINFORMACIÓN MÉDICA REQUERIDA (SMCP):\n1. Nombre, edad, sexo del paciente\n2. Naturaleza de la enfermedad/lesión\n3. Síntomas (descripción detallada)\n4. Signos vitales (pulso, TA, temperatura, respiración)",
            pt:"RESPOSTA DO MRCC\n\n→ Acuse de receção do PAN-PAN\n→ Direção para canal médico (frequentemente 67)\n→ Pedido de detalhes completos do paciente\n\nINFORMAÇÃO MÉDICA NECESSÁRIA (SMCP):\n1. Nome, idade, sexo do paciente\n2. Natureza da doença/lesão\n3. Sintomas (descrição detalhada)\n4. Sinais vitais (pulso, TA, temperatura, respiração)"} },
    { role:"OOW", color:C.med, icon:"🏥",
      smcp:"CROSS MED, MV MERIDIAN STAR on channel 67.\nPatient details:\nName: John Smith. Male. Age 45.\nSymptoms: Severe chest pain, radiating to left arm. Shortness of breath. Sweating.\nPulse: 95 beats per minute, irregular. Blood pressure: 160/100.\nTemperature: 37.2 degrees Celsius.\nOnset: 30 minutes ago. No previous cardiac history.\nMedication given: Aspirin 300mg at [time] UTC.\nOur position: Latitude 42°15'N, Longitude 008°30'W.\nNearest port: Vigo, Spain. ETA: 4 hours.\nOver.",
      tr:{fr:"CROSS MED, MV MERIDIAN STAR sur canal 67.\nDétails du patient :\nNom : John Smith. Homme. 45 ans.\nSymptômes : Douleur thoracique sévère, irradiant vers le bras gauche. Essoufflement. Transpiration.\nPouls : 95 battements par minute, irrégulier. Tension artérielle : 160/100.\nTempérature : 37,2 degrés Celsius.\nDébut : il y a 30 minutes. Pas d'antécédents cardiaques.\nMédicament administré : Aspirine 300mg à [heure] UTC.\nNotre position : Latitude 42°15'N, Longitude 008°30'W.\nPort le plus proche : Vigo, Espagne. ETA : 4 heures.\nTerminé.",
      es:"CROSS MED, MV MERIDIAN STAR en el canal 67.\nDetalles del paciente:\nNombre: John Smith. Hombre. 45 años.\nSíntomas: Dolor torácico severo, irradiando al brazo izquierdo. Dificultad para respirar. Sudoración.\nPulso: 95 latidos por minuto, irregular. Tensión arterial: 160/100.\nTemperatura: 37,2 grados Celsius.\nInicio: hace 30 minutos. Sin antecedentes cardíacos.\nMedicación administrada: Aspirina 300mg a las [hora] UTC.\nNuestra posición: Latitud 42°15'N, Longitud 008°30'W.\nPuerto más cercano: Vigo, España. ETA: 4 horas.\nCambio.",
      pt:"CROSS MED, MV MERIDIAN STAR no canal 67.\nDetalhes do paciente:\nNome: John Smith. Homem. 45 anos.\nSintomas: Dor torácica grave, irradiando para o braço esquerdo. Falta de ar. Suores.\nPulso: 95 batimentos por minuto, irregular. Tensão arterial: 160/100.\nTemperatura: 37,2 graus Celsius.\nInício: há 30 minutos. Sem antecedentes cardíacos.\nMedicamento administrado: Aspirina 300mg às [hora] UTC.\nA nossa posição: Latitude 42°15'N, Longitude 008°30'W.\nPorto mais próximo: Vigo, Espanha. ETA: 4 horas.\nCâmbio."},
      note:{fr:"RAPPORT MÉDICAL COMPLET SMCP\n\nLES 7 ÉLÉMENTS ESSENTIELS :\n1. NOM/ÂGE/SEXE du patient\n2. SYMPTÔMES (description précise)\n3. SIGNES VITAUX (pouls, TA, temp, respi)\n4. ANTÉCÉDENTS médicaux\n5. MÉDICAMENTS déjà administrés\n6. MÉDICAMENTS disponibles à bord\n7. POSITION et ETA port le plus proche\n\nTERMINOLOGIE MÉDICALE SMCP :\n'Beats per minute' = battements par minute\n'Blood pressure' = tension artérielle\n'Degrees Celsius' = degrés Celsius\n'Onset' = début des symptômes",
            en:"COMPLETE MEDICAL REPORT SMCP\n\n7 ESSENTIAL ELEMENTS:\n1. PATIENT NAME/AGE/SEX\n2. SYMPTOMS (precise description)\n3. VITAL SIGNS (pulse, BP, temp, respiration)\n4. MEDICAL HISTORY\n5. MEDICATION already given\n6. MEDICATION available on board\n7. POSITION and ETA to nearest port\n\nSMCP MEDICAL TERMINOLOGY:\n'Beats per minute' = pulse rate\n'Blood pressure' = arterial pressure\n'Degrees Celsius' = temperature unit\n'Onset' = when symptoms started",
            es:"INFORME MÉDICO COMPLETO SMCP\n\n7 ELEMENTOS ESENCIALES:\n1. NOMBRE/EDAD/SEXO del paciente\n2. SÍNTOMAS (descripción precisa)\n3. SIGNOS VITALES (pulso, TA, temp, respiración)\n4. HISTORIAL MÉDICO\n5. MEDICACIÓN ya administrada\n6. MEDICACIÓN disponible a bordo\n7. POSICIÓN y ETA al puerto más cercano",
            pt:"RELATÓRIO MÉDICO COMPLETO SMCP\n\n7 ELEMENTOS ESSENCIAIS:\n1. NOME/IDADE/SEXO do paciente\n2. SINTOMAS (descrição precisa)\n3. SINAIS VITAIS (pulso, TA, temp, respiração)\n4. HISTORIAL MÉDICO\n5. MEDICAÇÃO já administrada\n6. MEDICAÇÃO disponível a bordo\n7. POSIÇÃO e ETA ao porto mais próximo"} },
    { role:"MEDICO", color:C.safe, icon:"👨‍⚕️",
      smcp:"MV MERIDIAN STAR, this is CROSS MED Medical.\nSuspected myocardial infarction.\nInstructions:\n1. Place patient in semi-recumbent position, head elevated.\n2. Give aspirin 300mg if not already given. Confirmed.\n3. Give nitroglycerine spray under the tongue if available.\n4. Monitor pulse and blood pressure every 15 minutes.\n5. Request immediate evacuation. Helicopter is being arranged.\nETA helicopter approximately 90 minutes.\nKeep patient calm and warm. Do not give food or water.\nOver.",
      tr:{fr:"MV MERIDIAN STAR, ici CROSS MED Médical.\nInfarctus du myocarde suspecté.\nInstructions :\n1. Placer le patient en position semi-assise, tête surélevée.\n2. Donner de l'aspirine 300mg si pas encore administrée. Confirmé.\n3. Donner spray de nitroglycérine sous la langue si disponible.\n4. Surveiller pouls et tension toutes les 15 minutes.\n5. Demande d'évacuation immédiate. Hélicoptère en cours d'organisation.\nETA hélicoptère : environ 90 minutes.\nGarder le patient calme et au chaud. Ne pas donner d'aliments ni de liquides.\nTerminé.",
      es:"MV MERIDIAN STAR, aquí CROSS MED Médico.\nSospecha de infarto de miocardio.\nInstrucciones:\n1. Colocar al paciente en posición semisentada, cabeza elevada.\n2. Dar aspirina 300mg si aún no se ha administrado. Confirmado.\n3. Dar spray de nitroglicerina bajo la lengua si está disponible.\n4. Vigilar pulso y tensión cada 15 minutos.\n5. Solicitud de evacuación inmediata. Helicóptero en organización.\nETA del helicóptero: aproximadamente 90 minutos.\nMantener al paciente tranquilo y abrigado. No dar alimentos ni líquidos.\nCambio.",
      pt:"MV MERIDIAN STAR, aqui CROSS MED Médico.\nSuspeita de enfarte do miocárdio.\nInstruções:\n1. Colocar o paciente em posição semi-sentada, cabeça elevada.\n2. Dar aspirina 300mg se ainda não administrada. Confirmado.\n3. Dar spray de nitroglicerina sob a língua se disponível.\n4. Monitorizar pulso e tensão a cada 15 minutos.\n5. Pedido de evacuação imediata. Helicóptero a ser organizado.\nETA do helicóptero: aproximadamente 90 minutos.\nManter o paciente calmo e quente. Não dar alimentos nem líquidos.\nCâmbio."},
      note:{fr:"INSTRUCTIONS MÉDICALES SMCP\n\nRÉCEPTION DES INSTRUCTIONS :\n→ Répéter chaque instruction pour confirmer\n→ Confirmer quand chaque étape est exécutée\n→ Signaler tout changement d'état\n\nPHRASES SMCP :\n'Instruction received. [Répéter instruction].'\n'Patient is now in [position].'\n'Medication administered at [time] UTC.'\n'Vital signs: pulse [X], BP [X], temp [X].'\n'Patient's condition is [stable/deteriorating/improving].'\n'Helicopter is in sight. Preparing for evacuation.'",
            en:"MEDICAL INSTRUCTIONS SMCP\n\nRECEIVING INSTRUCTIONS:\n→ Repeat each instruction to confirm\n→ Confirm when each step is executed\n→ Report any change in condition\n\nSMCP PHRASES:\n'Instruction received. [Repeat instruction].'\n'Patient is now in [position].'\n'Medication administered at [time] UTC.'\n'Vital signs: pulse [X], BP [X], temp [X].'\n'Patient condition is [stable/deteriorating/improving].'\n'Helicopter is in sight. Preparing for evacuation.'",
            es:"INSTRUCCIONES MÉDICAS SMCP\n\nRECEPCIÓN DE INSTRUCCIONES:\n→ Repetir cada instrucción para confirmar\n→ Confirmar cuando se ejecuta cada paso\n→ Informar de cualquier cambio en el estado\n\nFRASES SMCP:\n'Instruction received. [Repetir instrucción].'\n'Patient condition is [stable/deteriorating/improving].'",
            pt:"INSTRUÇÕES MÉDICAS SMCP\n\nRECEÇÃO DE INSTRUÇÕES:\n→ Repetir cada instrução para confirmar\n→ Confirmar quando cada passo é executado\n→ Reportar qualquer mudança de estado\n\nFRASES SMCP:\n'Instruction received. [Repetir instrução].'\n'Patient condition is [stable/deteriorating/improving].'"} },
    { role:"OOW", color:C.med, icon:"🏥",
      smcp:"CROSS MED, MV MERIDIAN STAR.\nUpdate on patient:\nPatient is in semi-recumbent position.\nAspirin confirmed given at [time] UTC.\nNitroglycerine given at [time] UTC.\nVital signs at [time] UTC:\nPulse 88 beats per minute, still irregular.\nBlood pressure 150/95. Temperature 37.2.\nPatient is conscious but in pain. Condition slightly improved.\nWe can see the helicopter approaching. Preparing for evacuation.\nOver.",
      tr:{fr:"CROSS MED, MV MERIDIAN STAR.\nMise à jour sur le patient :\nLe patient est en position semi-assise.\nAspirine confirmée administrée à [heure] UTC.\nNitroglycérine administrée à [heure] UTC.\nSignes vitaux à [heure] UTC :\nPouls 88 battements par minute, toujours irrégulier.\nTension 150/95. Température 37,2.\nLe patient est conscient mais souffre. Légèrement amélioré.\nNous voyons l'hélicoptère s'approcher. Préparation de l'évacuation.\nTerminé.",
      es:"CROSS MED, MV MERIDIAN STAR.\nActualización sobre el paciente:\nEl paciente está en posición semisentada.\nAspirina confirmada administrada a las [hora] UTC.\nNitroglicerina administrada a las [hora] UTC.\nSignos vitales a las [hora] UTC:\nPulso 88 latidos por minuto, aún irregular.\nTensión 150/95. Temperatura 37,2.\nEl paciente está consciente pero con dolor. Ligeramente mejorado.\nVemos el helicóptero aproximándose. Preparando la evacuación.\nCambio.",
      pt:"CROSS MED, MV MERIDIAN STAR.\nAtualização sobre o paciente:\nO paciente está em posição semi-sentada.\nAspirina confirmada administrada às [hora] UTC.\nNitroglicerina administrada às [hora] UTC.\nSinais vitais às [hora] UTC:\nPulso 88 batimentos por minuto, ainda irregular.\nTensão 150/95. Temperatura 37,2.\nO paciente está consciente mas com dor. Ligeiramente melhorado.\nVemos o helicóptero a aproximar-se. A preparar a evacuação.\nCâmbio."},
      note:{fr:"RAPPORT DE SUIVI MÉDICAL\n\nMISES À JOUR OBLIGATOIRES :\n→ Toutes les 15-30 minutes ou sur demande\n→ Toujours inclure les signes vitaux actuels\n→ Indiquer le tendance (amélioré/stable/aggravé)\n→ Signaler les médicaments donnés avec heure\n\nÉVACUATION PAR HÉLICOPTÈRE :\n'We can see the helicopter approaching.'\n'We are preparing the [deck/heli-deck] for evacuation.'\n'Patient is ready for evacuation.'\n'Patient has been transferred to helicopter.'\n'Evacuation is complete. Cancel PAN-PAN.'",
            en:"MEDICAL FOLLOW-UP REPORT\n\nMANDATORY UPDATES:\n→ Every 15-30 minutes or on request\n→ Always include current vital signs\n→ Indicate trend (improved/stable/deteriorated)\n→ Report medications given with time\n\nHELICOPTER EVACUATION:\n'We can see the helicopter approaching.'\n'We are preparing the deck for evacuation.'\n'Patient is ready for evacuation.'\n'Patient has been transferred to helicopter.'\n'Evacuation is complete. Cancel PAN-PAN.'",
            es:"INFORME DE SEGUIMIENTO MÉDICO\n\nACTUALIZACIONES OBLIGATORIAS:\n→ Cada 15-30 minutos o según solicitud\n→ Siempre incluir los signos vitales actuales\n→ Indicar la tendencia (mejorado/estable/empeorado)\n→ Informar de los medicamentos administrados con la hora",
            pt:"RELATÓRIO DE ACOMPANHAMENTO MÉDICO\n\nATUALIZAÇÕES OBRIGATÓRIAS:\n→ A cada 15-30 minutos ou a pedido\n→ Sempre incluir os sinais vitais atuais\n→ Indicar a tendência (melhorado/estável/piorado)\n→ Reportar medicamentos administrados com a hora"} },
  ];

  const p = procedure[step];
  const isMed = p.role === "OOW";

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {procedure.map((_,i)=>(
          <div key={i} onClick={()=>setStep(i)} style={{
            flex:1,height:4,borderRadius:4,cursor:"pointer",
            background:i<=step?(i===step?C.med:`${C.med}55`):"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div style={{fontSize:9,color:C.med,letterSpacing:2,textAlign:"center",marginBottom:8,fontFamily:"'Cinzel',serif"}}>
        🏥 PAN-PAN MEDICO SIMULATOR — {step+1}/{procedure.length}
      </div>
      <div style={{padding:"12px",borderRadius:14,marginBottom:10,
        background:`${p.color}10`,border:`2px solid ${p.color}55`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:9,fontWeight:700,color:p.color,marginBottom:6,letterSpacing:1}}>
          {p.icon} {p.role}
        </div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.6,fontWeight:600,whiteSpace:"pre-line",marginBottom:6}}>
          {p.smcp}
        </div>
        {lang!=="en"&&<button onClick={()=>setShowTr(!showTr)} style={{fontSize:9,padding:"3px 8px",borderRadius:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer"}}>
          {showTr?"▲":"▼"} {lang==="fr"?"Traduction":lang==="es"?"Traducción":"Tradução"}
        </button>}
        {lang!=="en"&&showTr&&<div style={{fontSize:10,color:C.muted,marginTop:6,fontStyle:"italic",whiteSpace:"pre-line"}}>{p.tr[lang]||p.tr.fr}</div>}
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
          style={{flex:1,padding:"9px",borderRadius:10,background:step===procedure.length-1?"rgba(255,255,255,0.05)":`${C.med}22`,border:`1px solid ${step===procedure.length-1?"rgba(255,255,255,0.08)":C.med}`,color:C.white,cursor:step===procedure.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":lang==="es"?"Siguiente":"Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — MEDICAL CONDITIONS FLASHCARDS
// ══════════════════════════════════════
function MedicalConditionsFlashcardsSVG({ lang }) {
  const [cat, setCat] = useState("cardiac");
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const categories = {
    cardiac:{ label:{fr:"Urgences cardiaques",en:"Cardiac emergencies",es:"Urgencias cardíacas",pt:"Urgências cardíacas"}, icon:"❤️", color:C.med, cards:[
      { q:"How do you report suspected heart attack?", a:"I have a patient with suspected myocardial infarction. Symptoms: severe chest pain radiating to [left arm/jaw]. Shortness of breath. Sweating. Pulse: [X] bpm, irregular. Blood pressure: [X/X]. Onset: [X] minutes ago.", tr:{fr:"J'ai un patient avec un infarctus du myocarde suspecté. Symptômes : douleur thoracique sévère irradiant vers [bras gauche/mâchoire]. Essoufflement. Transpiration. Pouls : [X] bpm, irrégulier. Tension : [X/X]. Début : il y a [X] minutes.",es:"Tengo un paciente con sospecha de infarto de miocardio. Síntomas: dolor torácico severo irradiando hacia [brazo izquierdo/mandíbula]. Dificultad para respirar. Sudoración. Pulso: [X] bpm, irregular. Tensión: [X/X]. Inicio: hace [X] minutos.",pt:"Tenho um paciente com suspeita de enfarte do miocárdio. Sintomas: dor torácica grave irradiando para [braço esquerdo/mandíbula]. Falta de ar. Suores. Pulso: [X] bpm, irregular. Tensão: [X/X]. Início: há [X] minutos."} },
      { q:"How do you report a stroke?", a:"I have a patient with suspected stroke. Symptoms: sudden [facial drooping / arm weakness / slurred speech / loss of balance / severe headache]. Onset: [X] minutes ago. Patient is [conscious/unconscious]. Require immediate evacuation.", tr:{fr:"J'ai un patient avec un AVC suspecté. Symptômes : soudain [affaissement du visage / faiblesse d'un bras / parole difficile / perte d'équilibre / céphalée sévère]. Début : il y a [X] minutes. Patient [conscient/inconscient]. Évacuation immédiate requise.",es:"Tengo un paciente con sospecha de ictus. Síntomas: súbito [caída facial / debilidad en un brazo / habla dificultosa / pérdida de equilibrio / cefalea intensa]. Inicio: hace [X] minutos. Paciente [consciente/inconsciente]. Se requiere evacuación inmediata.",pt:"Tenho um paciente com suspeita de AVC. Sintomas: súbito [queda facial / fraqueza num braço / fala arrastada / perda de equilíbrio / cefaleia intensa]. Início: há [X] minutos. Paciente [consciente/inconsciente]. Evacuação imediata necessária."} },
      { q:"How do you report cardiac arrest?", a:"I have a cardiac arrest. Patient is unconscious. No pulse. No breathing. CPR has been started. We have [a defibrillator / no defibrillator]. We require immediate medical evacuation. MAYDAY.", tr:{fr:"J'ai un arrêt cardiaque. Le patient est inconscient. Pas de pouls. Pas de respiration. La RCP a été commencée. Nous avons [un défibrillateur / pas de défibrillateur]. Évacuation médicale immédiate requise. MAYDAY.",es:"Tengo una parada cardíaca. El paciente está inconsciente. Sin pulso. Sin respiración. Se ha iniciado la RCP. Tenemos [un desfibrilador / ningún desfibrilador]. Se requiere evacuación médica inmediata. MAYDAY.",pt:"Tenho uma paragem cardíaca. O paciente está inconsciente. Sem pulso. Sem respiração. A RCP foi iniciada. Temos [um desfibrilhador / nenhum desfibrilhador]. Evacuação médica imediata necessária. MAYDAY."} },
      { q:"How do you report high blood pressure (hypertensive crisis)?", a:"I have a patient with very high blood pressure. Blood pressure is [X/X]. Patient has [headache / blurred vision / confusion / nosebleed]. Medical advice is required urgently.", tr:{fr:"J'ai un patient avec une pression artérielle très élevée. Tension artérielle [X/X]. Le patient a [maux de tête / vision trouble / confusion / saignement de nez]. Avis médical requis d'urgence.",es:"Tengo un paciente con presión arterial muy alta. Tensión arterial [X/X]. El paciente tiene [dolor de cabeza / visión borrosa / confusión / hemorragia nasal]. Se requiere asesoramiento médico urgente.",pt:"Tenho um paciente com pressão arterial muito elevada. Tensão arterial [X/X]. O paciente tem [dor de cabeça / visão turva / confusão / hemorragia nasal]. Aconselhamento médico urgente necessário."} },
    ]},
    trauma:{ label:{fr:"Traumatismes",en:"Trauma",es:"Traumatismos",pt:"Traumatismos"}, icon:"🦴", color:C.urgent, cards:[
      { q:"How do you report a serious fall injury?", a:"I have a patient injured by a fall from [X] metres. Injuries include [fracture of/laceration of/possible spinal injury]. Patient is [conscious/unconscious]. Bleeding is [controlled/not controlled]. Vital signs: pulse [X], BP [X/X].", tr:{fr:"J'ai un patient blessé par une chute de [X] mètres. Les blessures comprennent [fracture de/lacération de/possible lésion de la colonne]. Le patient est [conscient/inconscient]. Le saignement est [contrôlé/non contrôlé]. Signes vitaux : pouls [X], TA [X/X].",es:"Tengo un paciente lesionado por una caída de [X] metros. Las lesiones incluyen [fractura de/laceración de/posible lesión de columna]. El paciente está [consciente/inconsciente]. La hemorragia está [controlada/no controlada]. Signos vitales: pulso [X], TA [X/X].",pt:"Tenho um paciente ferido por uma queda de [X] metros. As lesões incluem [fratura de/laceração de/possível lesão na coluna]. O paciente está [consciente/inconsciente]. A hemorragia está [controlada/não controlada]. Sinais vitais: pulso [X], TA [X/X]."} },
      { q:"How do you report a crush injury?", a:"I have a patient with a crush injury to the [limb/hand/foot]. The injury occurred when [describe]. The injured part is [trapped/freed]. [Bleeding is/is not] controlled. Amputation may be required.", tr:{fr:"J'ai un patient avec une blessure par écrasement au [membre/main/pied]. La blessure s'est produite quand [décrire]. La partie blessée est [coincée/libérée]. Le saignement est [contrôlé/non contrôlé]. Une amputation peut être nécessaire.",es:"Tengo un paciente con una lesión por aplastamiento en [extremidad/mano/pie]. La lesión ocurrió cuando [describir]. La parte lesionada está [atrapada/liberada]. La hemorragia está [controlada/no controlada]. Puede ser necesaria una amputación.",pt:"Tenho um paciente com uma lesão por esmagamento em [membro/mão/pé]. A lesão ocorreu quando [descrever]. A parte ferida está [presa/libertada]. A hemorragia está [controlada/não controlada]. Pode ser necessária uma amputação."} },
      { q:"How do you report a burns casualty?", a:"I have a patient with burns. Burns are on [body area]. Area affected: approximately [X] percent of body surface. Burns are [superficial/partial/full thickness]. Patient is in severe pain. Shock is suspected.", tr:{fr:"J'ai un patient avec des brûlures. Les brûlures sont sur [zone du corps]. Superficie affectée : environ [X] pour cent de la surface corporelle. Les brûlures sont [superficielles/partielles/profondes]. Le patient souffre énormément. Un choc est suspecté.",es:"Tengo un paciente con quemaduras. Las quemaduras están en [zona del cuerpo]. Superficie afectada: aproximadamente [X] por ciento de la superficie corporal. Las quemaduras son [superficiales/parciales/profundas]. El paciente sufre enormemente. Se sospecha shock.",pt:"Tenho um paciente com queimaduras. As queimaduras estão em [zona do corpo]. Área afetada: aproximadamente [X] por cento da superfície corporal. As queimaduras são [superficiais/parciais/profundas]. O paciente sofre imenso. Suspeita-se de choque."} },
      { q:"How do you report a suspected spinal injury?", a:"I have a patient with suspected spinal injury. The patient has [neck pain/back pain/numbness/paralysis in limbs]. Patient has NOT been moved. I am awaiting medical advice before moving. Spine has been immobilised.", tr:{fr:"J'ai un patient avec une lésion de la colonne suspecte. Le patient a [douleur au cou/douleur dans le dos/engourdissement/paralysie des membres]. Le patient N'A PAS été déplacé. J'attends des conseils médicaux avant de le bouger. La colonne a été immobilisée.",es:"Tengo un paciente con sospecha de lesión de columna. El paciente tiene [dolor de cuello/dolor de espalda/entumecimiento/parálisis en extremidades]. El paciente NO ha sido movido. Espero asesoramiento médico antes de moverlo. La columna ha sido inmovilizada.",pt:"Tenho um paciente com suspeita de lesão na coluna. O paciente tem [dor no pescoço/dor nas costas/dormência/paralisia nos membros]. O paciente NÃO foi movido. Aguardo aconselhamento médico antes de o mover. A coluna foi imobilizada."} },
    ]},
    illness:{ label:{fr:"Maladies",en:"Illnesses",es:"Enfermedades",pt:"Doenças"}, icon:"🤒", color:C.info, cards:[
      { q:"How do you report severe abdominal pain?", a:"I have a patient with severe abdominal pain. Location: [upper right/lower left/around navel/whole abdomen]. Pain is [constant/intermittent]. Duration: [X] hours. Fever: [X] degrees. Nausea/vomiting: [yes/no]. Appendicitis/peritonitis suspected.", tr:{fr:"J'ai un patient avec de fortes douleurs abdominales. Localisation : [droite haute/gauche basse/autour du nombril/tout l'abdomen]. La douleur est [constante/intermittente]. Durée : [X] heures. Fièvre : [X] degrés. Nausées/vomissements : [oui/non]. Appendicite/péritonite suspectée.",es:"Tengo un paciente con fuertes dolores abdominales. Localización: [derecha superior/izquierda inferior/alrededor del ombligo/todo el abdomen]. El dolor es [constante/intermitente]. Duración: [X] horas. Fiebre: [X] grados. Náuseas/vómitos: [sí/no]. Se sospecha apendicitis/peritonitis.",pt:"Tenho um paciente com fortes dores abdominais. Localização: [direita superior/esquerda inferior/à volta do umbigo/todo o abdómen]. A dor é [constante/intermitente]. Duração: [X] horas. Febre: [X] graus. Náuseas/vómitos: [sim/não]. Suspeita-se de apendicite/peritonite."} },
      { q:"How do you report a diabetic emergency?", a:"I have a patient with a diabetic emergency. Patient is [hypoglycaemic/hyperglycaemic]. Blood sugar level is [X] mmol/L. Patient is [conscious/confused/unconscious]. I have given [glucose/insulin]. Advice required.", tr:{fr:"J'ai un patient avec une urgence diabétique. Le patient est [hypoglycémique/hyperglycémique]. Glycémie : [X] mmol/L. Patient [conscient/confus/inconscient]. J'ai administré [glucose/insuline]. Avis requis.",es:"Tengo un paciente con una emergencia diabética. El paciente está [hipoglucémico/hiperglucémico]. Glucemia: [X] mmol/L. Paciente [consciente/confuso/inconsciente]. He administrado [glucosa/insulina]. Se requiere asesoramiento.",pt:"Tenho um paciente com uma emergência diabética. O paciente está [hipoglicémico/hiperglicémico]. Glicemia: [X] mmol/L. Paciente [consciente/confuso/inconsciente]. Administrei [glicose/insulina]. Aconselhamento necessário."} },
      { q:"How do you report severe infection/fever?", a:"I have a patient with high fever. Temperature is [X] degrees Celsius. The patient has [chills/sweating/confusion/difficulty breathing]. Duration: [X] days. Possible source of infection: [wound/respiratory/unknown]. Antibiotics: [given/not given].", tr:{fr:"J'ai un patient avec une forte fièvre. Température : [X] degrés Celsius. Le patient a [frissons/transpiration/confusion/difficultés respiratoires]. Durée : [X] jours. Source possible d'infection : [plaie/respiratoire/inconnue]. Antibiotiques : [administrés/non administrés].",es:"Tengo un paciente con fiebre alta. Temperatura: [X] grados Celsius. El paciente tiene [escalofríos/sudoración/confusión/dificultad para respirar]. Duración: [X] días. Posible foco de infección: [herida/respiratorio/desconocido]. Antibióticos: [administrados/no administrados].",pt:"Tenho um paciente com febre alta. Temperatura: [X] graus Celsius. O paciente tem [calafrios/suores/confusão/dificuldade em respirar]. Duração: [X] dias. Possível foco de infeção: [ferida/respiratório/desconhecido]. Antibióticos: [administrados/não administrados]."} },
      { q:"How do you report an unconscious patient?", a:"I have an unconscious patient. Patient was found [unconscious / collapsed] at [time] UTC. No response to [voice/pain]. Breathing: [present/absent]. Pulse: [present/absent]. No apparent cause. Medical emergency.", tr:{fr:"J'ai un patient inconscient. Le patient a été trouvé [inconscient/effondré] à [heure] UTC. Pas de réponse à [voix/douleur]. Respiration : [présente/absente]. Pouls : [présent/absent]. Pas de cause apparente. Urgence médicale.",es:"Tengo un paciente inconsciente. El paciente fue encontrado [inconsciente/desplomado] a las [hora] UTC. Sin respuesta a [voz/dolor]. Respiración: [presente/ausente]. Pulso: [presente/ausente]. Sin causa aparente. Emergencia médica.",pt:"Tenho um paciente inconsciente. O paciente foi encontrado [inconsciente/desmaiado] às [hora] UTC. Sem resposta a [voz/dor]. Respiração: [presente/ausente]. Pulso: [presente/ausente]. Sem causa aparente. Emergência médica."} },
    ]},
    mental:{ label:{fr:"Santé mentale & Intoxication",en:"Mental health & Intoxication",es:"Salud mental e Intoxicación",pt:"Saúde mental e Intoxicação"}, icon:"🧠", color:C.safe, cards:[
      { q:"How do you report a crew member with psychiatric emergency?", a:"I have a crew member exhibiting unusual behaviour. Patient is [aggressive/confused/hallucinating/threatening self-harm]. Patient has been [isolated/restrained for safety]. Medical advice required urgently.", tr:{fr:"J'ai un membre d'équipage présentant un comportement inhabituel. Le patient est [agressif/confus/halluciné/menace de s'automutiler]. Le patient a été [isolé/retenu pour sa sécurité]. Avis médical requis d'urgence.",es:"Tengo un miembro de la tripulación con un comportamiento inusual. El paciente está [agresivo/confuso/con alucinaciones/amenazando con autolesionarse]. El paciente ha sido [aislado/contenido por su seguridad]. Se requiere asesoramiento médico urgente.",pt:"Tenho um membro da tripulação a apresentar comportamento invulgar. O paciente está [agressivo/confuso/com alucinações/a ameaçar autolesão]. O paciente foi [isolado/contido por segurança]. Aconselhamento médico urgente necessário."} },
      { q:"How do you report alcohol/drug intoxication?", a:"I have a patient with suspected [alcohol/drug] intoxication. Patient is [conscious/semiconscious/unconscious]. Level of intoxication: [severe/moderate]. Substance taken: [alcohol/unknown substance]. Time of ingestion: approximately [X] hours ago.", tr:{fr:"J'ai un patient avec une intoxication suspectée à [l'alcool/une drogue]. Le patient est [conscient/semi-conscient/inconscient]. Niveau d'intoxication : [sévère/modéré]. Substance prise : [alcool/substance inconnue]. Heure d'ingestion : il y a environ [X] heures.",es:"Tengo un paciente con sospecha de intoxicación por [alcohol/una droga]. El paciente está [consciente/semiconsciente/inconsciente]. Nivel de intoxicación: [severo/moderado]. Sustancia consumida: [alcohol/sustancia desconocida]. Hora de ingesta: hace aproximadamente [X] horas.",pt:"Tenho um paciente com suspeita de intoxicação por [álcool/uma droga]. O paciente está [consciente/semiconsciente/inconsciente]. Nível de intoxicação: [grave/moderado]. Substância consumida: [álcool/substância desconhecida]. Hora de ingestão: há aproximadamente [X] horas."} },
      { q:"How do you report chemical/poison ingestion?", a:"I have a patient who has ingested a chemical/poison. Substance: [name if known / unknown]. Quantity: [X]. Time of ingestion: [X] minutes/hours ago. Symptoms: [describe]. I require immediate toxicological advice.", tr:{fr:"J'ai un patient qui a ingéré un produit chimique/poison. Substance : [nom si connu / inconnu]. Quantité : [X]. Heure d'ingestion : il y a [X] minutes/heures. Symptômes : [décrire]. J'ai besoin d'un avis toxicologique immédiat.",es:"Tengo un paciente que ha ingerido un producto químico/veneno. Sustancia: [nombre si se conoce / desconocido]. Cantidad: [X]. Hora de ingestión: hace [X] minutos/horas. Síntomas: [describir]. Necesito asesoramiento toxicológico inmediato.",pt:"Tenho um paciente que ingeriu um produto químico/veneno. Substância: [nome se conhecido / desconhecido]. Quantidade: [X]. Hora de ingestão: há [X] minutos/horas. Sintomas: [descrever]. Preciso de aconselhamento toxicológico imediato."} },
      { q:"How do you report heat stroke?", a:"I have a patient with suspected heat stroke. Body temperature is [X] degrees Celsius. Patient is [confused/unconscious/not sweating]. Working conditions: [hot/humid/confined space]. Patient has been moved to cool area. Cooling measures applied.", tr:{fr:"J'ai un patient avec un coup de chaleur suspecté. Température corporelle : [X] degrés Celsius. Le patient est [confus/inconscient/ne transpire pas]. Conditions de travail : [chaud/humide/espace confiné]. Le patient a été déplacé dans un endroit frais. Mesures de refroidissement appliquées.",es:"Tengo un paciente con sospecha de golpe de calor. Temperatura corporal: [X] grados Celsius. El paciente está [confuso/inconsciente/no suda]. Condiciones de trabajo: [caluroso/húmedo/espacio confinado]. El paciente ha sido trasladado a una zona fresca. Se han aplicado medidas de enfriamiento.",pt:"Tenho um paciente com suspeita de golpe de calor. Temperatura corporal: [X] graus Celsius. O paciente está [confuso/inconsciente/não transpira]. Condições de trabalho: [quente/húmido/espaço confinado]. O paciente foi transferido para uma zona fresca. Medidas de arrefecimento aplicadas."} },
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
        padding:"16px",borderRadius:14,cursor:"pointer",minHeight:120,
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
// SVG 3 — VITAL SIGNS REFERENCE
// ══════════════════════════════════════
function VitalSignsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const vitals = [
    { id:"pulse", icon:"💗", color:C.med,
      label:{fr:"Pouls",en:"Pulse",es:"Pulso",pt:"Pulso"},
      smcp:{fr:"FORMAT SMCP :\n'Pulse is [X] beats per minute. [Regular/irregular].'\n\nVALEURS NORMALES :\n→ Adulte : 60-100 bpm\n→ Enfant : 70-120 bpm\n→ Nourrisson : 100-160 bpm\n\nTERMINOLOGIE :\n→ Bradycardia = < 60 bpm (trop lent)\n→ Tachycardia = > 100 bpm (trop rapide)\n→ Irregular = irrégulier (risque cardiaque)\n→ Thready = filant (choc possible)\n\nCOMMENT MESURER :\nPoignet (artère radiale) ou cou (artère carotide)\nCompter pendant 60 secondes",
             en:"SMCP FORMAT:\n'Pulse is [X] beats per minute. [Regular/irregular].'\n\nNORMAL VALUES:\n→ Adult: 60-100 bpm\n→ Child: 70-120 bpm\n→ Infant: 100-160 bpm\n\nTERMINOLOGY:\n→ Bradycardia = < 60 bpm (too slow)\n→ Tachycardia = > 100 bpm (too fast)\n→ Irregular = irregular heartbeat (cardiac risk)\n→ Thready = very weak (possible shock)\n\nHOW TO MEASURE:\nWrist (radial artery) or neck (carotid artery)\nCount for 60 seconds",
             es:"FORMATO SMCP:\n'Pulse is [X] beats per minute. [Regular/irregular].'\n\nVALORES NORMALES:\n→ Adulto: 60-100 lpm\n→ Niño: 70-120 lpm\n\nTERMINOLOGÍA:\n→ Bradicardia = < 60 lpm\n→ Taquicardia = > 100 lpm\n→ Irregular = latido irregular (riesgo cardíaco)\n→ Thready = filiforme (posible choque)",
             pt:"FORMATO SMCP:\n'Pulse is [X] beats per minute. [Regular/irregular].'\n\nVALORES NORMAIS:\n→ Adulto: 60-100 bpm\n→ Criança: 70-120 bpm\n\nTERMINOLOGIA:\n→ Bradicardia = < 60 bpm\n→ Taquicardia = > 100 bpm\n→ Irregular = batimento irregular (risco cardíaco)\n→ Thready = filiforme (possível choque)"} },
    { id:"bp", icon:"🩺", color:C.urgent,
      label:{fr:"Tension artérielle",en:"Blood pressure",es:"Tensión arterial",pt:"Pressão arterial"},
      smcp:{fr:"FORMAT SMCP :\n'Blood pressure is [X] over [X]. [X/X].'\n\nVALEURS NORMALES :\n→ Adulte : 90-140 / 60-90 mmHg\n→ Normal : ~120/80\n\nTERMINOLOGIE :\n→ Hypertension = TA > 140/90 (risque cardiaque)\n→ Hypotension = TA < 90/60 (choc possible)\n→ Systolic = chiffre du haut (systolique)\n→ Diastolic = chiffre du bas (diastolique)\n\nEXEMPLES SMCP :\n'Blood pressure is one hundred and sixty over one hundred.'\n'Blood pressure is ninety over sixty. Hypotension suspected.'",
             en:"SMCP FORMAT:\n'Blood pressure is [X] over [X]. [X/X].'\n\nNORMAL VALUES:\n→ Adult: 90-140 / 60-90 mmHg\n→ Normal: ~120/80\n\nTERMINOLOGY:\n→ Hypertension = BP > 140/90 (cardiac risk)\n→ Hypotension = BP < 90/60 (possible shock)\n→ Systolic = top number\n→ Diastolic = bottom number\n\nSMCP EXAMPLES:\n'Blood pressure is one hundred and sixty over one hundred.'\n'Blood pressure is ninety over sixty. Hypotension suspected.'",
             es:"FORMATO SMCP:\n'Blood pressure is [X] over [X].'\n\nVALORES NORMALES:\n→ Adulto: 90-140 / 60-90 mmHg\n→ Normal: ~120/80\n\nTERMINOLOGÍA:\n→ Hipertensión = TA > 140/90\n→ Hipotensión = TA < 90/60 (posible choque)\n→ Sistólica = número superior\n→ Diastólica = número inferior",
             pt:"FORMATO SMCP:\n'Blood pressure is [X] over [X].'\n\nVALORES NORMAIS:\n→ Adulto: 90-140 / 60-90 mmHg\n→ Normal: ~120/80\n\nTERMINOLOGIA:\n→ Hipertensão = TA > 140/90\n→ Hipotensão = TA < 90/60 (possível choque)\n→ Sistólica = número superior\n→ Diastólica = número inferior"} },
    { id:"temp", icon:"🌡️", color:C.info,
      label:{fr:"Température",en:"Temperature",es:"Temperatura",pt:"Temperatura"},
      smcp:{fr:"FORMAT SMCP :\n'Temperature is [X] degrees Celsius.'\n\nVALEURS NORMALES :\n→ Normale : 36,5-37,5°C\n→ Fièvre légère : 37,5-38,5°C\n→ Fièvre modérée : 38,5-39,5°C\n→ Fièvre haute : 39,5-40,5°C\n→ Hyperthermie : > 40,5°C (urgence !)\n→ Hypothermie : < 35°C (urgence !)\n\nTERMINOLOGIE SMCP :\n'Temperature is thirty-six point five degrees Celsius. Normal.'\n'Temperature is thirty-nine degrees Celsius. Fever.'\n'Temperature is thirty-four degrees Celsius. Hypothermia suspected.'",
             en:"SMCP FORMAT:\n'Temperature is [X] degrees Celsius.'\n\nNORMAL VALUES:\n→ Normal: 36.5-37.5°C\n→ Low fever: 37.5-38.5°C\n→ Moderate fever: 38.5-39.5°C\n→ High fever: 39.5-40.5°C\n→ Hyperthermia: > 40.5°C (emergency!)\n→ Hypothermia: < 35°C (emergency!)\n\nSMCP TERMINOLOGY:\n'Temperature is thirty-six point five degrees Celsius.'\n'Temperature is thirty-nine degrees Celsius. Fever.'\n'Temperature is thirty-four degrees Celsius. Hypothermia suspected.'",
             es:"FORMATO SMCP:\n'Temperature is [X] degrees Celsius.'\n\nVALORES NORMALES:\n→ Normal: 36,5-37,5°C\n→ Fiebre baja: 37,5-38,5°C\n→ Fiebre alta: > 39,5°C\n→ Hipertermia: > 40,5°C (¡urgencia!)\n→ Hipotermia: < 35°C (¡urgencia!)",
             pt:"FORMATO SMCP:\n'Temperature is [X] degrees Celsius.'\n\nVALORES NORMAIS:\n→ Normal: 36,5-37,5°C\n→ Febre baixa: 37,5-38,5°C\n→ Febre alta: > 39,5°C\n→ Hipertermia: > 40,5°C (urgência!)\n→ Hipotermia: < 35°C (urgência!)"} },
    { id:"respiration", icon:"🫁", color:C.safe,
      label:{fr:"Respiration",en:"Respiration",es:"Respiración",pt:"Respiração"},
      smcp:{fr:"FORMAT SMCP :\n'Respiration rate is [X] breaths per minute. [Normal/laboured/shallow/rapid].'\n\nVALEURS NORMALES :\n→ Adulte : 12-20 respirations/minute\n→ Tachypnée : > 20/min (respiration rapide)\n→ Bradypnée : < 12/min (respiration lente)\n→ Apnée : absence de respiration (MAYDAY)\n\nTERMINOLOGIE SMCP :\n'Breathing is normal / laboured / shallow / absent.'\n'Breathing is rapid at [X] breaths per minute.'\n'Patient is not breathing. CPR has been started.'\n\nLOI MnéMO FAST pour AVC (stroke) :\nFace = visage tombant\nArms = bras faible\nSpeech = parole difficile\nTime = urgence !",
             en:"SMCP FORMAT:\n'Respiration rate is [X] breaths per minute. [Normal/laboured/shallow/rapid].'\n\nNORMAL VALUES:\n→ Adult: 12-20 breaths/minute\n→ Tachypnoea: > 20/min (rapid breathing)\n→ Bradypnoea: < 12/min (slow breathing)\n→ Apnoea: no breathing (MAYDAY)\n\nSMCP TERMINOLOGY:\n'Breathing is normal / laboured / shallow / absent.'\n'Breathing is rapid at [X] breaths per minute.'\n'Patient is not breathing. CPR has been started.'\n\nFAST rule for STROKE:\nFace = facial drooping\nArms = arm weakness\nSpeech = slurred speech\nTime = call for help immediately!",
             es:"FORMATO SMCP:\n'Respiration rate is [X] breaths per minute.'\n\nVALORES NORMALES:\n→ Adulto: 12-20 respiraciones/minuto\n→ Taquipnea: > 20/min\n→ Bradipnea: < 12/min\n→ Apnea: sin respiración (MAYDAY)\n\nREGLA FAST para ACV:\nFace = caída facial\nArms = debilidad del brazo\nSpeech = dificultad para hablar\nTime = ¡llama inmediatamente!",
             pt:"FORMATO SMCP:\n'Respiration rate is [X] breaths per minute.'\n\nVALORES NORMAIS:\n→ Adulto: 12-20 respirações/minuto\n→ Taquipneia: > 20/min\n→ Bradipneia: < 12/min\n→ Apneia: sem respiração (MAYDAY)\n\nREGRA FAST para AVC:\nFace = queda facial\nArms = fraqueza do braço\nSpeech = dificuldade em falar\nTime = chame imediatamente!"} },
  ];

  const sel_ = sel!==null ? vitals[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {vitals.map((v,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${v.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?v.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18,marginBottom:3}}>{v.icon}</div>
            <div style={{fontSize:9,color:sel===i?v.color:C.muted,fontWeight:700,lineHeight:1.2}}>{v.label[lang]||v.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.smcp[lang]||sel_.smcp.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — MEDICAL QUIZ
// ══════════════════════════════════════
function MedicalQuizSVG({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const qs = [
    { q:"A crew member collapses with no pulse and no breathing. Which signal?", opts:["PAN-PAN","MAYDAY — immediate danger to life. Cardiac arrest requires emergency evacuation.","SÉCURITÉ","No signal needed"], correct:1 },
    { q:"What are the 7 essential elements of a medical SMCP report?", opts:["Name and symptoms only","Name/age/sex · symptoms · vital signs · medical history · medication given · medication available · position/ETA","Just vital signs","Symptoms and position"], correct:1 },
    { q:"Normal adult pulse rate range in SMCP?", opts:["40-60 bpm","60-100 beats per minute","100-150 bpm","50-80 bpm"], correct:1 },
    { q:"FAST rule for stroke — what does 'A' stand for?", opts:["Abdomen","Arm weakness — one arm cannot be raised or is weak","Airway","Age"], correct:1 },
    { q:"How do you report temperature of 39°C in SMCP?", opts:["Temperature is high","Temperature is thirty-nine degrees Celsius. Fever.","39 degrees","Temp 39"], correct:1 },
  ];

  const [shuffled]=useState(()=>qs.map(q=>shuffleQuestionOptions(q)));
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
        {qs.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<qIdx?C.med:i===qIdx?C.urgent:"rgba(255,255,255,0.1)"}}/>)}
      </div>
      <div style={{fontSize:12,fontWeight:700,color:C.white,marginBottom:12,lineHeight:1.5}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(ans!==null){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===ans){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:ans!==null?"default":"pointer",fontFamily:"'Courier New',monospace"}}>{opt}</button>;
        })}
      </div>
      {ans!==null&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.med},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.white,cursor:"pointer"}}>
        {qIdx<qs.length-1?"NEXT →":"FINISH"}
      </button>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
// ── PRACTICE QUESTION BANK — 15Q ──────────────
const BANK_SMCP7 = {
  fr:[
    {q:"Quel signal utiliser pour un membre d'équipage malade nécessitant un conseil médical, sans danger de mort ?",opts:["MAYDAY","PAN-PAN","SECURITE","AUCUN"],correct:1,expl:"PAN-PAN medico est le signal SMCP standard pour un cas médical sérieux mais non mortel nécessitant un conseil ou une assistance."},
    {q:"Comment prononcer '37°C' en phraséologie SMCP ?",opts:["Three seven degrees","Thirty-seven degrees Celsius","37 Celsius","Three-point-seven Celsius"],correct:1,expl:"En SMCP, les nombres se prononcent en toutes lettres suivis de l'unité complète : 'thirty-seven degrees Celsius'."},
    {q:"Un arrêt cardiaque (pas de pouls, pas de respiration) déclenche quel signal ?",opts:["PAN-PAN","SECURITE","MAYDAY","Aucun signal requis"],correct:2,expl:"MAYDAY est requis en cas de danger de mort immédiat, ce qui inclut l'arrêt cardiaque."},
    {q:"Comment demande-t-on le pouls d'un patient en SMCP ?",opts:["'What is heart?'","'What is his/her pulse rate?'","'Heart good?'","'Pulse question?'"],correct:1,expl:"La formulation standard SMCP est 'What is his/her pulse rate?' pour demander la fréquence cardiaque."},
    {q:"Comment exprime-t-on la fréquence respiratoire en SMCP ?",opts:["'Breathing fast'","'Respiration rate is [number] per minute'","'Air good'","'Lung ok'"],correct:1,expl:"La formulation SMCP standard est 'Respiration rate is [number] per minute', avec le nombre prononcé en toutes lettres."},
    {q:"Quel est le canal VHF utilisé pour l'appel initial de détresse ou d'urgence médicale ?",opts:["Canal 6","Canal 13","Canal 16","Canal 70"],correct:2,expl:"Le canal 16 est le canal international de détresse, sécurité et appel, utilisé pour l'alerte initiale avant bascule sur un canal de travail."},
    {q:"Quelle information N'EST PAS demandée en priorité lors d'un PAN-PAN medico ?",opts:["Position du navire","Nom du patient uniquement pour la forme, sans état clinique","Nature du problème médical","Assistance requise"],correct:1,expl:"Le nom seul sans état clinique n'est pas suffisant — il faut toujours transmettre l'état clinique du patient (signes vitaux, symptômes), pas seulement l'identité."},
    {q:"Comment dit-on 'le patient est conscient' en SMCP ?",opts:["'Patient sleeping'","'Patient is conscious'","'Patient quiet'","'Patient normal'"],correct:1,expl:"'Patient is conscious' est la formulation claire et standard pour indiquer l'état de conscience."},
    {q:"Pourquoi épeler les nombres en toutes lettres en SMCP plutôt que dire juste le chiffre ?",opts:["Par tradition uniquement","Pour éviter toute confusion de compréhension via VHF, surtout entre non-natifs anglophones","Ce n'est pas obligatoire","Uniquement pour les urgences graves"],correct:1,expl:"Épeler les nombres en toutes lettres réduit les risques de mauvaise compréhension par radio, essentiel entre locuteurs de langues maternelles différentes."},
    {q:"Quelle est la formulation SMCP pour indiquer que le patient ne respire plus ?",opts:["'Patient tired'","'Patient not breathing'","'Patient weak'","'Patient cold'"],correct:1,expl:"'Patient not breathing' est la formulation directe et sans ambiguïté requise en situation critique."},
    {q:"Un PAN-PAN doit-il être répété plusieurs fois au début de l'appel ?",opts:["Non, une seule fois suffit","Oui, généralement trois fois (PAN-PAN, PAN-PAN, PAN-PAN)","Non, jamais répété","Oui, mais seulement deux fois"],correct:1,expl:"Comme MAYDAY, le signal PAN-PAN est traditionnellement répété trois fois au début de l'appel pour capter l'attention immédiatement."},
    {q:"Quelle information sur la position doit accompagner un PAN-PAN medico ?",opts:["Aucune, la VHF localise automatiquement","Position précise (latitude/longitude ou relèvement et distance d'un point connu)","Uniquement le nom du port le plus proche","Uniquement la direction cardinale"],correct:1,expl:"La position précise (coordonnées ou relèvement/distance) est essentielle pour permettre une assistance ou une évacuation rapide."},
    {q:"Comment demander en SMCP si le patient est allergique à un médicament ?",opts:["'Patient allergy medicine?'","'Is the patient allergic to any medication?'","'Medicine bad patient?'","'Allergy yes no?'"],correct:1,expl:"'Is the patient allergic to any medication?' est la formulation grammaticalement complète et standard en SMCP."},
    {q:"Le SMCP recommande-t-il des phrases courtes et standardisées plutôt que des explications libres ?",opts:["Non, l'anglais courant est préféré","Oui, précisément pour éviter toute ambiguïté de compréhension entre locuteurs de langues différentes","Non, cela n'a pas d'importance","Oui, mais uniquement en cas d'urgence vitale"],correct:1,expl:"Le SMCP a été conçu spécifiquement pour standardiser la communication maritime et réduire les malentendus entre marins de nationalités différentes."},
    {q:"Pourquoi la maîtrise du SMCP médical est-elle particulièrement critique en mer ?",opts:["Ce n'est pas particulièrement critique","Parce qu'un malentendu en situation médicale peut coûter une vie, sans recours possible à un médecin sur place","Uniquement pour les grands navires","Uniquement en zone polaire"],correct:1,expl:"En mer, l'absence de médecin à bord et l'éloignement des secours rendent la clarté de communication vitale — un malentendu peut avoir des conséquences graves et irréversibles."},
  ],
  en:[
    {q:"Which signal should be used for a sick crew member needing medical advice, without danger of death?",opts:["MAYDAY","PAN-PAN","SECURITE","NONE"],correct:1,expl:"PAN-PAN medico is the standard SMCP signal for a serious but non-life-threatening medical case requiring advice or assistance."},
    {q:"How is '37°C' pronounced in SMCP phraseology?",opts:["Three seven degrees","Thirty-seven degrees Celsius","37 Celsius","Three-point-seven Celsius"],correct:1,expl:"In SMCP, numbers are spelled out in full followed by the complete unit: 'thirty-seven degrees Celsius'."},
    {q:"Cardiac arrest (no pulse, no breathing) triggers which signal?",opts:["PAN-PAN","SECURITE","MAYDAY","No signal required"],correct:2,expl:"MAYDAY is required in case of immediate danger to life, which includes cardiac arrest."},
    {q:"How do you ask for a patient's pulse in SMCP?",opts:["'What is heart?'","'What is his/her pulse rate?'","'Heart good?'","'Pulse question?'"],correct:1,expl:"The standard SMCP phrasing is 'What is his/her pulse rate?' to ask for heart rate."},
    {q:"How is respiration rate expressed in SMCP?",opts:["'Breathing fast'","'Respiration rate is [number] per minute'","'Air good'","'Lung ok'"],correct:1,expl:"The standard SMCP phrasing is 'Respiration rate is [number] per minute', with the number spelled out."},
    {q:"Which VHF channel is used for the initial distress or medical emergency call?",opts:["Channel 6","Channel 13","Channel 16","Channel 70"],correct:2,expl:"Channel 16 is the international distress, safety and calling channel, used for the initial alert before switching to a working channel."},
    {q:"Which information is NOT a priority when making a PAN-PAN medico call?",opts:["Vessel's position","Patient's name only, without any clinical status","Nature of the medical problem","Assistance required"],correct:1,expl:"The name alone without clinical status is insufficient — the patient's clinical state (vital signs, symptoms) must always be conveyed, not just identity."},
    {q:"How do you say 'the patient is conscious' in SMCP?",opts:["'Patient sleeping'","'Patient is conscious'","'Patient quiet'","'Patient normal'"],correct:1,expl:"'Patient is conscious' is the clear, standard phrasing to indicate the level of consciousness."},
    {q:"Why spell out numbers in full in SMCP rather than just saying the digit?",opts:["Just tradition","To avoid any misunderstanding over VHF, especially between non-native English speakers","It's not mandatory","Only for serious emergencies"],correct:1,expl:"Spelling out numbers in full reduces the risk of miscommunication over radio, essential between speakers of different native languages."},
    {q:"What is the SMCP phrasing to indicate the patient has stopped breathing?",opts:["'Patient tired'","'Patient not breathing'","'Patient weak'","'Patient cold'"],correct:1,expl:"'Patient not breathing' is the direct, unambiguous phrasing required in a critical situation."},
    {q:"Should PAN-PAN be repeated several times at the start of the call?",opts:["No, once is enough","Yes, typically three times (PAN-PAN, PAN-PAN, PAN-PAN)","No, never repeated","Yes, but only twice"],correct:1,expl:"Like MAYDAY, the PAN-PAN signal is traditionally repeated three times at the start of the call to immediately capture attention."},
    {q:"What position information must accompany a PAN-PAN medico call?",opts:["None, VHF locates automatically","Precise position (latitude/longitude or bearing and distance from a known point)","Only the nearest port's name","Only the cardinal direction"],correct:1,expl:"Precise position (coordinates or bearing/distance) is essential to enable quick assistance or evacuation."},
    {q:"How do you ask in SMCP if the patient is allergic to a medication?",opts:["'Patient allergy medicine?'","'Is the patient allergic to any medication?'","'Medicine bad patient?'","'Allergy yes no?'"],correct:1,expl:"'Is the patient allergic to any medication?' is the grammatically complete, standard SMCP phrasing."},
    {q:"Does SMCP recommend short, standardized phrases rather than free-form explanations?",opts:["No, plain English is preferred","Yes, precisely to avoid any comprehension ambiguity between speakers of different languages","No, it doesn't matter","Yes, but only in life-threatening emergencies"],correct:1,expl:"SMCP was specifically designed to standardize maritime communication and reduce misunderstandings between sailors of different nationalities."},
    {q:"Why is mastering medical SMCP particularly critical at sea?",opts:["It's not particularly critical","Because a misunderstanding in a medical situation can cost a life, with no doctor available on site","Only for large vessels","Only in polar zones"],correct:1,expl:"At sea, the absence of a doctor on board and distance from help make communication clarity vital — a misunderstanding can have serious, irreversible consequences."},
  ],
  es:[
    {q:"¿Qué señal usar para un tripulante enfermo que necesita consejo médico, sin peligro de muerte?",opts:["MAYDAY","PAN-PAN","SECURITE","NINGUNA"],correct:1,expl:"PAN-PAN medico es la señal SMCP estándar para un caso médico serio pero no mortal que requiere consejo o asistencia."},
    {q:"¿Cómo se pronuncia '37°C' en fraseología SMCP?",opts:["Three seven degrees","Thirty-seven degrees Celsius","37 Celsius","Three-point-seven Celsius"],correct:1,expl:"En SMCP, los números se deletrean completamente seguidos de la unidad completa: 'thirty-seven degrees Celsius'."},
    {q:"Un paro cardíaco (sin pulso, sin respiración) activa qué señal?",opts:["PAN-PAN","SECURITE","MAYDAY","Ninguna señal requerida"],correct:2,expl:"MAYDAY se requiere en caso de peligro de muerte inmediato, lo que incluye el paro cardíaco."},
    {q:"¿Cómo se pregunta por el pulso de un paciente en SMCP?",opts:["'What is heart?'","'What is his/her pulse rate?'","'Heart good?'","'Pulse question?'"],correct:1,expl:"La frase estándar SMCP es 'What is his/her pulse rate?' para preguntar la frecuencia cardíaca."},
    {q:"¿Cómo se expresa la frecuencia respiratoria en SMCP?",opts:["'Breathing fast'","'Respiration rate is [number] per minute'","'Air good'","'Lung ok'"],correct:1,expl:"La frase estándar SMCP es 'Respiration rate is [number] per minute', con el número deletreado."},
    {q:"¿Qué canal VHF se usa para la llamada inicial de socorro o emergencia médica?",opts:["Canal 6","Canal 13","Canal 16","Canal 70"],correct:2,expl:"El canal 16 es el canal internacional de socorro, seguridad y llamada, usado para la alerta inicial antes de cambiar a un canal de trabajo."},
    {q:"¿Qué información NO es prioritaria en una llamada PAN-PAN medico?",opts:["Posición del buque","Solo el nombre del paciente, sin estado clínico","Naturaleza del problema médico","Asistencia requerida"],correct:1,expl:"El nombre solo sin estado clínico es insuficiente — siempre se debe transmitir el estado clínico del paciente (signos vitales, síntomas), no solo la identidad."},
    {q:"¿Cómo se dice 'el paciente está consciente' en SMCP?",opts:["'Patient sleeping'","'Patient is conscious'","'Patient quiet'","'Patient normal'"],correct:1,expl:"'Patient is conscious' es la frase clara y estándar para indicar el nivel de conciencia."},
    {q:"¿Por qué deletrear los números completos en SMCP en lugar de solo decir la cifra?",opts:["Solo tradición","Para evitar malentendidos por VHF, especialmente entre hablantes no nativos de inglés","No es obligatorio","Solo para emergencias graves"],correct:1,expl:"Deletrear los números completos reduce el riesgo de mala comunicación por radio, esencial entre hablantes de diferentes lenguas maternas."},
    {q:"¿Cuál es la frase SMCP para indicar que el paciente dejó de respirar?",opts:["'Patient tired'","'Patient not breathing'","'Patient weak'","'Patient cold'"],correct:1,expl:"'Patient not breathing' es la frase directa y sin ambigüedad requerida en una situación crítica."},
    {q:"¿Debe repetirse PAN-PAN varias veces al inicio de la llamada?",opts:["No, una vez basta","Sí, típicamente tres veces (PAN-PAN, PAN-PAN, PAN-PAN)","No, nunca se repite","Sí, pero solo dos veces"],correct:1,expl:"Como MAYDAY, la señal PAN-PAN se repite tradicionalmente tres veces al inicio de la llamada para captar la atención de inmediato."},
    {q:"¿Qué información de posición debe acompañar una llamada PAN-PAN medico?",opts:["Ninguna, el VHF localiza automáticamente","Posición precisa (latitud/longitud o marcación y distancia desde un punto conocido)","Solo el nombre del puerto más cercano","Solo la dirección cardinal"],correct:1,expl:"La posición precisa (coordenadas o marcación/distancia) es esencial para permitir asistencia o evacuación rápida."},
    {q:"¿Cómo se pregunta en SMCP si el paciente es alérgico a un medicamento?",opts:["'Patient allergy medicine?'","'Is the patient allergic to any medication?'","'Medicine bad patient?'","'Allergy yes no?'"],correct:1,expl:"'Is the patient allergic to any medication?' es la frase gramaticalmente completa y estándar en SMCP."},
    {q:"¿Recomienda el SMCP frases cortas y estandarizadas en lugar de explicaciones libres?",opts:["No, se prefiere el inglés corriente","Sí, precisamente para evitar ambigüedad de comprensión entre hablantes de diferentes idiomas","No, no importa","Sí, pero solo en emergencias vitales"],correct:1,expl:"El SMCP fue diseñado específicamente para estandarizar la comunicación marítima y reducir malentendidos entre marinos de diferentes nacionalidades."},
    {q:"¿Por qué dominar el SMCP médico es particularmente crítico en el mar?",opts:["No es particularmente crítico","Porque un malentendido en una situación médica puede costar una vida, sin médico disponible a bordo","Solo para buques grandes","Solo en zonas polares"],correct:1,expl:"En el mar, la ausencia de un médico a bordo y la distancia de la ayuda hacen que la claridad de la comunicación sea vital — un malentendido puede tener consecuencias graves e irreversibles."},
  ],
  pt:[
    {q:"Que sinal usar para um tripulante doente que precisa de conselho médico, sem perigo de morte?",opts:["MAYDAY","PAN-PAN","SECURITE","NENHUM"],correct:1,expl:"PAN-PAN medico é o sinal SMCP padrão para um caso médico sério mas não mortal que requer conselho ou assistência."},
    {q:"Como se pronuncia '37°C' na fraseologia SMCP?",opts:["Three seven degrees","Thirty-seven degrees Celsius","37 Celsius","Three-point-seven Celsius"],correct:1,expl:"Em SMCP, os números são soletrados por extenso seguidos da unidade completa: 'thirty-seven degrees Celsius'."},
    {q:"Uma paragem cardíaca (sem pulso, sem respiração) aciona que sinal?",opts:["PAN-PAN","SECURITE","MAYDAY","Nenhum sinal necessário"],correct:2,expl:"MAYDAY é necessário em caso de perigo de morte imediato, o que inclui a paragem cardíaca."},
    {q:"Como se pergunta pelo pulso de um paciente em SMCP?",opts:["'What is heart?'","'What is his/her pulse rate?'","'Heart good?'","'Pulse question?'"],correct:1,expl:"A frase padrão SMCP é 'What is his/her pulse rate?' para perguntar a frequência cardíaca."},
    {q:"Como se expressa a frequência respiratória em SMCP?",opts:["'Breathing fast'","'Respiration rate is [number] per minute'","'Air good'","'Lung ok'"],correct:1,expl:"A frase padrão SMCP é 'Respiration rate is [number] per minute', com o número soletrado por extenso."},
    {q:"Que canal VHF é usado para a chamada inicial de socorro ou emergência médica?",opts:["Canal 6","Canal 13","Canal 16","Canal 70"],correct:2,expl:"O canal 16 é o canal internacional de socorro, segurança e chamada, usado para o alerta inicial antes de mudar para um canal de trabalho."},
    {q:"Que informação NÃO é prioritária numa chamada PAN-PAN medico?",opts:["Posição do navio","Apenas o nome do paciente, sem estado clínico","Natureza do problema médico","Assistência necessária"],correct:1,expl:"O nome sozinho sem estado clínico é insuficiente — o estado clínico do paciente (sinais vitais, sintomas) deve sempre ser transmitido, não apenas a identidade."},
    {q:"Como se diz 'o paciente está consciente' em SMCP?",opts:["'Patient sleeping'","'Patient is conscious'","'Patient quiet'","'Patient normal'"],correct:1,expl:"'Patient is conscious' é a frase clara e padrão para indicar o nível de consciência."},
    {q:"Por que soletrar os números por extenso em SMCP em vez de apenas dizer o número?",opts:["Apenas tradição","Para evitar mal-entendidos por VHF, especialmente entre falantes não nativos de inglês","Não é obrigatório","Apenas para emergências graves"],correct:1,expl:"Soletrar os números por extenso reduz o risco de má comunicação por rádio, essencial entre falantes de diferentes línguas maternas."},
    {q:"Qual é a frase SMCP para indicar que o paciente parou de respirar?",opts:["'Patient tired'","'Patient not breathing'","'Patient weak'","'Patient cold'"],correct:1,expl:"'Patient not breathing' é a frase direta e sem ambiguidade exigida numa situação crítica."},
    {q:"O PAN-PAN deve ser repetido várias vezes no início da chamada?",opts:["Não, uma vez basta","Sim, tipicamente três vezes (PAN-PAN, PAN-PAN, PAN-PAN)","Não, nunca é repetido","Sim, mas apenas duas vezes"],correct:1,expl:"Como o MAYDAY, o sinal PAN-PAN é tradicionalmente repetido três vezes no início da chamada para captar a atenção imediatamente."},
    {q:"Que informação de posição deve acompanhar uma chamada PAN-PAN medico?",opts:["Nenhuma, o VHF localiza automaticamente","Posição precisa (latitude/longitude ou marcação e distância de um ponto conhecido)","Apenas o nome do porto mais próximo","Apenas a direção cardeal"],correct:1,expl:"A posição precisa (coordenadas ou marcação/distância) é essencial para permitir assistência ou evacuação rápida."},
    {q:"Como se pergunta em SMCP se o paciente é alérgico a um medicamento?",opts:["'Patient allergy medicine?'","'Is the patient allergic to any medication?'","'Medicine bad patient?'","'Allergy yes no?'"],correct:1,expl:"'Is the patient allergic to any medication?' é a frase gramaticalmente completa e padrão em SMCP."},
    {q:"O SMCP recomenda frases curtas e padronizadas em vez de explicações livres?",opts:["Não, prefere-se o inglês corrente","Sim, precisamente para evitar ambiguidade de compreensão entre falantes de idiomas diferentes","Não, não importa","Sim, mas apenas em emergências vitais"],correct:1,expl:"O SMCP foi concebido especificamente para padronizar a comunicação marítima e reduzir mal-entendidos entre marinheiros de diferentes nacionalidades."},
    {q:"Por que dominar o SMCP médico é particularmente crítico no mar?",opts:["Não é particularmente crítico","Porque um mal-entendido numa situação médica pode custar uma vida, sem médico disponível a bordo","Apenas para navios grandes","Apenas em zonas polares"],correct:1,expl:"No mar, a ausência de um médico a bordo e a distância do socorro tornam a clareza da comunicação vital — um mal-entendido pode ter consequências graves e irreversíveis."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [started,setStarted]=useState(false);const [done,setDone]=useState(false);
  const questions=BANK_SMCP7[lang]||BANK_SMCP7.en;const total=questions.length;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  if(!started) return(
    <Card style={{marginBottom:12,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
      <div style={{fontSize:12,color:C.white,lineHeight:1.6,marginBottom:12}}>{lang==="fr"?"Entraîne-toi avec 15 questions de révision avant le quiz final.":lang==="en"?"Practice with 15 review questions before the final quiz.":lang==="es"?"Practica con 15 preguntas de repaso antes del quiz final.":"Pratique com 15 perguntas de revisão antes do quiz final."}</div>
      <button onClick={()=>setStarted(true)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,color:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif",letterSpacing:1}}>
        {lang==="fr"?"✅ COMMENCER":lang==="en"?"✅ START":lang==="es"?"✅ EMPEZAR":"✅ COMEÇAR"}
      </button>
    </Card>
  );
  if(done){
    const pct=Math.round(score/total*100);
    return(<Card style={{marginBottom:12,border:`1px solid ${C.gold}44`,textAlign:"center"}}>
      <div style={{fontSize:44,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":pct>=60?"📘":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{total}</div>
      <div style={{fontSize:13,color:C.gold2}}>{pct}%</div>
    </Card>);
  }
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<total-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  return(
    <Card style={{marginBottom:12,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{total}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/total)*100}%`,background:`linear-gradient(90deg,${C.gold},${C.purple})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.white,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>}
      {answered&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.green},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>
        {cur<total-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":"FINISH")}
      </button>}
    </Card>
  );
}

function Exercise1({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:""});
  const [showC,setShowC]=useState(false);
  const qs={
    en:[
      {id:"q1",q:"What signal is used for a sick crew member needing advice?\n(Answer: 1 word)",correct:"PAN-PAN"},
      {id:"q2",q:"Normal adult temperature in SMCP — how do you say 37°C?\n(Answer in English)",correct:"thirty-seven degrees Celsius"},
      {id:"q3",q:"Cardiac arrest = no pulse + no breathing → which signal?\n(Answer: 1 word)",correct:"MAYDAY"},
    ],
    fr:[
      {id:"q1",q:"Quel signal est utilisé pour un équipier malade nécessitant des conseils ?\n(Répondre : 1 mot)",correct:"PAN-PAN"},
      {id:"q2",q:"Température normale adulte en SMCP — comment dit-on 37°C ?\n(Répondre en anglais)",correct:"thirty-seven degrees Celsius"},
      {id:"q3",q:"Arrêt cardiaque = pas de pouls + pas de respiration → quel signal ?\n(Répondre : 1 mot)",correct:"MAYDAY"},
    ],
    es:[
      {id:"q1",q:"¿Qué señal se usa para un tripulante enfermo que necesita consejo?\n(Responder: 1 palabra)",correct:"PAN-PAN"},
      {id:"q2",q:"Temperatura normal adulta en SMCP — ¿cómo se dice 37°C?\n(Responder en inglés)",correct:"thirty-seven degrees Celsius"},
      {id:"q3",q:"Paro cardíaco = sin pulso + sin respiración → ¿qué señal?\n(Responder: 1 palabra)",correct:"MAYDAY"},
    ],
    pt:[
      {id:"q1",q:"Que sinal é utilizado para um tripulante doente que necessita de conselho?\n(Responder: 1 palavra)",correct:"PAN-PAN"},
      {id:"q2",q:"Temperatura normal adulta em SMCP — como se diz 37°C?\n(Responder em inglês)",correct:"thirty-seven degrees Celsius"},
      {id:"q3",q:"Paragem cardíaca = sem pulso + sem respiração → que sinal?\n(Responder: 1 palavra)",correct:"MAYDAY"},
    ],
  };
  const list=qs[lang]||qs.en;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("pan");
    if(q.id==="q2") return v.includes("thirty")&&v.includes("seven")&&v.includes("celsius");
    if(q.id==="q3") return v.includes("mayday");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.med}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Malade = PAN-PAN · 37°C = 'thirty-seven degrees Celsius' · Arrêt cardiaque = MAYDAY":
         lang==="en"?"💡 Reminders: Sick crew = PAN-PAN · 37°C = 'thirty-seven degrees Celsius' · Cardiac arrest = MAYDAY":
         lang==="es"?"💡 Recordatorios: Tripulante enfermo = PAN-PAN · 37°C = 'thirty-seven degrees Celsius' · Paro cardíaco = MAYDAY":
         "💡 Lembretes: Tripulante doente = PAN-PAN · 37°C = 'thirty-seven degrees Celsius' · Paragem cardíaca = MAYDAY"}
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
        Q1: PAN-PAN (sick/injured crew · not immediately life-threatening → PAN-PAN)\nQ2: THIRTY-SEVEN DEGREES CELSIUS (always spell out number words + 'degrees Celsius')\nQ3: MAYDAY (cardiac arrest = no pulse + no breathing = immediate danger of death)
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.med}12`,border:`1px solid ${showC?C.green:C.med}44`,color:showC?C.green:C.med,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

function Stars(){const s=Array.from({length:12},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<div><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></div>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.med}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

const QUIZ = {
  fr:[
    {q:"Quel signal utiliser pour un membre d'équipage malade sans danger de mort immédiat ?",opts:["MAYDAY","PAN-PAN","SECURITE","Aucun signal"],correct:1,expl:"PAN-PAN medico signale un cas médical sérieux mais non mortel nécessitant conseil ou assistance."},
    {q:"Comment prononcer un nombre en SMCP (ex : température 37°C) ?",opts:["Le chiffre seul","En toutes lettres, suivi de l'unité complète","Uniquement en chiffres romains","Cela n'a pas d'importance"],correct:1,expl:"Les nombres se prononcent toujours en toutes lettres en SMCP pour éviter toute confusion radio, ex : 'thirty-seven degrees Celsius'."},
    {q:"Un arrêt cardiaque déclenche quel signal ?",opts:["PAN-PAN","SECURITE","MAYDAY","Aucun signal requis"],correct:2,expl:"Un arrêt cardiaque est un danger de mort immédiat — MAYDAY est requis, pas PAN-PAN."},
    {q:"Pourquoi le SMCP impose-t-il des phrases courtes et standardisées ?",opts:["Par simple habitude","Pour éliminer toute ambiguïté entre locuteurs de langues maternelles différentes","Ce n'est pas obligatoire","Uniquement pour les officiers seniors"],correct:1,expl:"Le SMCP existe précisément pour standardiser la communication maritime internationale et réduire les malentendus, souvent vitaux en situation médicale."},
    {q:"Quelle information est indispensable dans un appel PAN-PAN medico ?",opts:["Uniquement le nom du patient","Position du navire + état clinique du patient (signes vitaux, symptômes)","Uniquement l'heure de l'appel","Aucune information particulière"],correct:1,expl:"Un PAN-PAN medico doit toujours inclure la position précise du navire et l'état clinique réel du patient pour permettre une assistance adaptée."},
  ],
  en:[
    {q:"Which signal should be used for a sick crew member without immediate danger of death?",opts:["MAYDAY","PAN-PAN","SECURITE","No signal"],correct:1,expl:"PAN-PAN medico signals a serious but non-life-threatening medical case requiring advice or assistance."},
    {q:"How are numbers pronounced in SMCP (e.g. temperature 37°C)?",opts:["The digit alone","Spelled out in full, followed by the complete unit","Only in Roman numerals","It doesn't matter"],correct:1,expl:"Numbers are always spelled out in full in SMCP to avoid any radio confusion, e.g. 'thirty-seven degrees Celsius'."},
    {q:"Cardiac arrest triggers which signal?",opts:["PAN-PAN","SECURITE","MAYDAY","No signal required"],correct:2,expl:"Cardiac arrest is an immediate danger to life — MAYDAY is required, not PAN-PAN."},
    {q:"Why does SMCP require short, standardized phrases?",opts:["Just habit","To eliminate ambiguity between speakers of different native languages","It's not mandatory","Only for senior officers"],correct:1,expl:"SMCP exists precisely to standardize international maritime communication and reduce misunderstandings, often vital in medical situations."},
    {q:"What information is essential in a PAN-PAN medico call?",opts:["Only the patient's name","Vessel's position + patient's clinical status (vital signs, symptoms)","Only the time of the call","No particular information"],correct:1,expl:"A PAN-PAN medico call must always include the vessel's precise position and the patient's actual clinical status to enable appropriate assistance."},
  ],
  es:[
    {q:"¿Qué señal usar para un tripulante enfermo sin peligro de muerte inmediato?",opts:["MAYDAY","PAN-PAN","SECURITE","Ninguna señal"],correct:1,expl:"PAN-PAN medico señala un caso médico serio pero no mortal que requiere consejo o asistencia."},
    {q:"¿Cómo se pronuncian los números en SMCP (ej: temperatura 37°C)?",opts:["Solo la cifra","Deletreados por completo, seguidos de la unidad completa","Solo en números romanos","No importa"],correct:1,expl:"Los números siempre se deletrean completamente en SMCP para evitar confusión por radio, ej: 'thirty-seven degrees Celsius'."},
    {q:"¿Un paro cardíaco activa qué señal?",opts:["PAN-PAN","SECURITE","MAYDAY","Ninguna señal requerida"],correct:2,expl:"Un paro cardíaco es un peligro de muerte inmediato — se requiere MAYDAY, no PAN-PAN."},
    {q:"¿Por qué el SMCP exige frases cortas y estandarizadas?",opts:["Solo por costumbre","Para eliminar la ambigüedad entre hablantes de diferentes lenguas maternas","No es obligatorio","Solo para oficiales senior"],correct:1,expl:"El SMCP existe precisamente para estandarizar la comunicación marítima internacional y reducir malentendidos, a menudo vitales en situaciones médicas."},
    {q:"¿Qué información es indispensable en una llamada PAN-PAN medico?",opts:["Solo el nombre del paciente","Posición del buque + estado clínico del paciente (signos vitales, síntomas)","Solo la hora de la llamada","Ninguna información particular"],correct:1,expl:"Una llamada PAN-PAN medico debe incluir siempre la posición precisa del buque y el estado clínico real del paciente para permitir una asistencia adecuada."},
  ],
  pt:[
    {q:"Que sinal usar para um tripulante doente sem perigo de morte imediato?",opts:["MAYDAY","PAN-PAN","SECURITE","Nenhum sinal"],correct:1,expl:"PAN-PAN medico sinaliza um caso médico sério mas não mortal que requer conselho ou assistência."},
    {q:"Como se pronunciam os números em SMCP (ex: temperatura 37°C)?",opts:["Apenas o número","Soletrados por extenso, seguidos da unidade completa","Apenas em números romanos","Não importa"],correct:1,expl:"Os números são sempre soletrados por extenso em SMCP para evitar confusão por rádio, ex: 'thirty-seven degrees Celsius'."},
    {q:"Uma paragem cardíaca aciona que sinal?",opts:["PAN-PAN","SECURITE","MAYDAY","Nenhum sinal necessário"],correct:2,expl:"Uma paragem cardíaca é um perigo de morte imediato — MAYDAY é necessário, não PAN-PAN."},
    {q:"Por que o SMCP exige frases curtas e padronizadas?",opts:["Apenas por hábito","Para eliminar ambiguidade entre falantes de línguas maternas diferentes","Não é obrigatório","Apenas para oficiais seniores"],correct:1,expl:"O SMCP existe precisamente para padronizar a comunicação marítima internacional e reduzir mal-entendidos, muitas vezes vitais em situações médicas."},
    {q:"Que informação é indispensável numa chamada PAN-PAN medico?",opts:["Apenas o nome do paciente","Posição do navio + estado clínico do paciente (sinais vitais, sintomas)","Apenas a hora da chamada","Nenhuma informação particular"],correct:1,expl:"Uma chamada PAN-PAN medico deve sempre incluir a posição precisa do navio e o estado clínico real do paciente para permitir assistência adequada."},
  ],
};

const getContent = lang => {
  const d = {
    fr:{
      badge:"🏥 Maritime English SMCP · Leçon 7/8 · ⭐ Premium · 200 XP",
      title:"Communications médicales d'urgence",
      intro:"Un malentendu radio en situation médicale peut coûter une vie. Cette leçon couvre le vocabulaire SMCP essentiel pour signaler, décrire et gérer une urgence médicale à bord — du simple malaise à l'arrêt cardiaque.",
      p1:"PARTIE 1 - SIGNAL PAN-PAN MEDICO",
      s1:"PAN-PAN medico signale un cas médical sérieux mais non mortel. Structure d'appel, répétition du signal, informations obligatoires (position, état clinique, assistance requise).",
      p2:"PARTIE 2 - FICHES CONDITIONS MÉDICALES",
      s2:"Vocabulaire standardisé pour décrire les principales conditions médicales rencontrées à bord — blessures, malaises, intoxications.",
      p3:"PARTIE 3 - SIGNES VITAUX SMCP",
      s3:"Comment communiquer pouls, température, respiration et état de conscience selon la phraséologie SMCP exacte, sans ambiguïté possible.",
      p4:"PARTIE 4 - QUIZ MÉDICAL",
      p5:"PARTIE 5 - EXERCICE AVANCÉ",
      p6:"PARTIE 6 - BANQUE DE 15 QUESTIONS",
      sumT:"POINTS CLÉS",
      sumP:[
        "PAN-PAN medico = urgence médicale sérieuse mais non mortelle · MAYDAY = danger de mort immédiat",
        "Les nombres se prononcent toujours en toutes lettres (ex : 'thirty-seven degrees Celsius')",
        "Position précise + état clinique réel sont obligatoires dans tout appel médical",
        "Le SMCP standardise le vocabulaire pour éliminer toute ambiguïté entre langues maternelles différentes",
      ],
      learnedP:[
        "Distinguer PAN-PAN et MAYDAY selon la gravité médicale",
        "Communiquer les signes vitaux selon la phraséologie SMCP exacte",
        "Structurer un appel médical d'urgence complet",
        "Je sais que la clarté du langage à bord peut littéralement sauver une vie",
      ],
    },
    en:{
      badge:"🏥 Maritime English SMCP · Lesson 7/8 · ⭐ Premium · 200 XP",
      title:"Medical Emergency Communications",
      intro:"A radio misunderstanding in a medical situation can cost a life. This lesson covers the essential SMCP vocabulary to report, describe and manage a medical emergency on board — from a simple ailment to cardiac arrest.",
      p1:"PART 1 - PAN-PAN MEDICO SIGNAL",
      s1:"PAN-PAN medico signals a serious but non-life-threatening medical case. Call structure, signal repetition, mandatory information (position, clinical status, assistance required).",
      p2:"PART 2 - MEDICAL CONDITIONS FLASHCARDS",
      s2:"Standardized vocabulary to describe the main medical conditions encountered on board — injuries, illness, poisoning.",
      p3:"PART 3 - VITAL SIGNS SMCP",
      s3:"How to communicate pulse, temperature, respiration and consciousness level according to exact SMCP phraseology, with no possible ambiguity.",
      p4:"PART 4 - MEDICAL QUIZ",
      p5:"PART 5 - ADVANCED EXERCISE",
      p6:"PART 6 - QUESTION BANK",
      sumT:"KEY POINTS",
      sumP:[
        "PAN-PAN medico = serious but non-life-threatening medical emergency · MAYDAY = immediate danger to life",
        "Numbers are always spelled out in full (e.g. 'thirty-seven degrees Celsius')",
        "Precise position + actual clinical status are mandatory in any medical call",
        "SMCP standardizes vocabulary to eliminate ambiguity between different native languages",
      ],
      learnedP:[
        "Distinguish PAN-PAN and MAYDAY based on medical severity",
        "Communicate vital signs using exact SMCP phraseology",
        "Structure a complete medical emergency call",
        "I know that clarity of language on board can literally save a life",
      ],
    },
    es:{
      badge:"🏥 Inglés Marítimo SMCP · Lección 7/8 · ⭐ Premium · 200 XP",
      title:"Comunicaciones médicas de emergencia",
      intro:"Un malentendido por radio en una situación médica puede costar una vida. Esta lección cubre el vocabulario SMCP esencial para reportar, describir y gestionar una emergencia médica a bordo — desde una simple molestia hasta un paro cardíaco.",
      p1:"PARTE 1 - SEÑAL PAN-PAN MEDICO",
      s1:"PAN-PAN medico señala un caso médico serio pero no mortal. Estructura de la llamada, repetición de la señal, información obligatoria (posición, estado clínico, asistencia requerida).",
      p2:"PARTE 2 - FICHAS CONDICIONES MÉDICAS",
      s2:"Vocabulario estandarizado para describir las principales condiciones médicas a bordo — lesiones, malestar, intoxicaciones.",
      p3:"PARTE 3 - SIGNOS VITALES SMCP",
      s3:"Cómo comunicar pulso, temperatura, respiración y nivel de conciencia según la fraseología SMCP exacta, sin ambigüedad posible.",
      p4:"PARTE 4 - QUIZ MÉDICO",
      p5:"PARTE 5 - EJERCICIO AVANZADO",
      p6:"PARTE 6 - BANCO DE 15 PREGUNTAS",
      sumT:"PUNTOS CLAVE",
      sumP:[
        "PAN-PAN medico = emergencia médica seria pero no mortal · MAYDAY = peligro de muerte inmediato",
        "Los números siempre se deletrean completamente (ej: 'thirty-seven degrees Celsius')",
        "Posición precisa + estado clínico real son obligatorios en toda llamada médica",
        "El SMCP estandariza el vocabulario para eliminar ambigüedad entre diferentes lenguas maternas",
      ],
      learnedP:[
        "Distinguir PAN-PAN y MAYDAY según la gravedad médica",
        "Comunicar los signos vitales según la fraseología SMCP exacta",
        "Estructurar una llamada médica de emergencia completa",
        "Sé que la claridad del lenguaje a bordo puede literalmente salvar una vida",
      ],
    },
    pt:{
      badge:"🏥 Inglês Marítimo SMCP · Lição 7/8 · ⭐ Premium · 200 XP",
      title:"Comunicações médicas de emergência",
      intro:"Um mal-entendido por rádio numa situação médica pode custar uma vida. Esta lição cobre o vocabulário SMCP essencial para reportar, descrever e gerir uma emergência médica a bordo — de um simples mal-estar até uma paragem cardíaca.",
      p1:"PARTE 1 - SINAL PAN-PAN MEDICO",
      s1:"PAN-PAN medico sinaliza um caso médico sério mas não mortal. Estrutura da chamada, repetição do sinal, informação obrigatória (posição, estado clínico, assistência necessária).",
      p2:"PARTE 2 - FICHAS CONDIÇÕES MÉDICAS",
      s2:"Vocabulário padronizado para descrever as principais condições médicas a bordo — lesões, mal-estar, intoxicações.",
      p3:"PARTE 3 - SINAIS VITAIS SMCP",
      s3:"Como comunicar pulso, temperatura, respiração e nível de consciência segundo a fraseologia SMCP exata, sem ambiguidade possível.",
      p4:"PARTE 4 - QUIZ MÉDICO",
      p5:"PARTE 5 - EXERCÍCIO AVANÇADO",
      p6:"PARTE 6 - BANCO DE 15 QUESTÕES",
      sumT:"PONTOS-CHAVE",
      sumP:[
        "PAN-PAN medico = emergência médica séria mas não mortal · MAYDAY = perigo de morte imediato",
        "Os números são sempre soletrados por extenso (ex: 'thirty-seven degrees Celsius')",
        "Posição precisa + estado clínico real são obrigatórios em qualquer chamada médica",
        "O SMCP padroniza o vocabulário para eliminar ambiguidade entre diferentes línguas maternas",
      ],
      learnedP:[
        "Distinguir PAN-PAN e MAYDAY conforme a gravidade médica",
        "Comunicar os sinais vitais segundo a fraseologia SMCP exata",
        "Estruturar uma chamada médica de emergência completa",
        "Sei que a clareza da linguagem a bordo pode literalmente salvar uma vida",
      ],
    },
  };
  return d[lang] || d.fr;
};

function QuestionBankQuiz({questions,t,lang,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.med}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.med,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:C.white,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer"}}>{opt}</button>;})}</div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.med},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

export default function LessonSMCP_L7({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#1a0a12 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.med}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.med,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🏥 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 7/8":lang==="en"?"Lesson 7/8":lang==="es"?"Lección 7/8":"Lição 7/8"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.med,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.med},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<div>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(236,72,153,0.15)",border:`1px solid ${C.med}44`,fontSize:11,color:C.med,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.med}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="🚨" text={lc.p1} color={C.med}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.med}22`}}>
              <PanPanMedicoSVG lang={lang}/>
            </Card>

            <SL icon="🏥" text={lc.p2} color={C.urgent}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.urgent}22`}}>
              <MedicalConditionsFlashcardsSVG lang={lang}/>
            </Card>

            <SL icon="💗" text={lc.p3} color={C.info}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.info}22`}}>
              <VitalSignsSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <MedicalQuizSVG lang={lang}/>
            </Card>

            <SL icon="📝" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="📚" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>

            <Card style={{marginBottom:14,background:`${C.med}08`,border:`1px solid ${C.med}22`}}>
              <div style={{fontSize:11,color:C.med,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.med,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.med},${C.urgent},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 10px 36px ${C.med}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </div>}

          {phase==="quiz"&&<div>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz - Urgences médicales":lang==="en"?"Quiz - Medical Emergencies":lang==="es"?"Quiz - Emergencias médicas":"Quiz - Emergências médicas"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 7":lang==="en"?"Lesson 7":lang==="es"?"Lección 7":"Lição 7"}</div>
            </div>
            <QuestionBankQuiz questions={quiz} t={t} lang={lang} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </div>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}55`,fontSize:14,color:C.green,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <div style={{textAlign:"center",padding:"14px 10px",marginBottom:16,fontSize:12,color:C.gold2,fontFamily:"Courier New",fontStyle:"italic",lineHeight:1.7,borderTop:"1px solid rgba(255,255,255,0.08)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
              {lang==="fr"?"Maîtriser le style de langage SMCP, ce n'est pas une formalité — c'est ce qui permet à chaque marin, quelle que soit sa langue maternelle, d'être compris à temps quand chaque seconde compte.":
               lang==="en"?"Mastering SMCP language style is not a formality — it is what allows every seafarer, regardless of native language, to be understood in time when every second counts.":
               lang==="es"?"Dominar el estilo de lenguaje SMCP no es una formalidad — es lo que permite a cada marino, sin importar su lengua materna, ser entendido a tiempo cuando cada segundo cuenta.":
               "Dominar o estilo de linguagem SMCP não é uma formalidade — é o que permite a cada marinheiro, independentemente da língua materna, ser compreendido a tempo quando cada segundo conta."}
            </div>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.med},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 8px 28px ${C.med}44`,marginBottom:10}}>
              {lang==="fr"?"LEÇON 8 - RÉVISION FINALE →":lang==="en"?"LESSON 8 - FINAL REVIEW →":lang==="es"?"LECCIÓN 8 - REPASO FINAL →":"LIÇÃO 8 - REVISÃO FINAL →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
