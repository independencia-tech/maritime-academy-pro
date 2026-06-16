// @ts-nocheck
import { useState, useEffect } from "react";

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
      fr:"PAN-PAN PAN-PAN PAN-PAN\nToutes stations. Toutes stations. Toutes stations.\nIci MV MERIDIAN STAR, MV MERIDIAN STAR.\nJ'ai une urgence médicale à bord.\nJe demande des conseils médicaux.\nTerminé.",
      note:{fr:"APPEL PAN-PAN MÉDICAL\n\nPHRASE D'OUVERTURE :\n→ PAN-PAN × 3 (pas MAYDAY sauf danger de vie immédiat)\n→ All stations (ou nom MRCC si connu)\n→ Nom du navire × 2\n→ Nature = urgence médicale\n→ Demande de conseil médical\n\nSUR QUEL CANAL ?\n→ CH 16 d'abord pour l'alerte\n→ Puis le MRCC vous orientera vers MEDICO\n→ CIRM (Italie), CCMM (France), etc.\n\nSi danger de vie IMMÉDIAT → MAYDAY",
            en:"MEDICAL PAN-PAN CALL\n\nOPENING PHRASE:\n→ PAN-PAN × 3 (not MAYDAY unless immediate life danger)\n→ All stations (or MRCC name if known)\n→ Vessel name × 2\n→ Nature = medical emergency\n→ Request for medical advice\n\nWHICH CHANNEL?\n→ CH 16 first for the alert\n→ MRCC will direct you to MEDICO\n→ CIRM (Italy), CCMM (France), etc.\n\nIf IMMEDIATE life danger → MAYDAY",
            es:"LLAMADA PAN-PAN MÉDICA\n\nFRASE DE APERTURA:\n→ PAN-PAN × 3 (no MAYDAY salvo peligro de vida inmediato)\n→ All stations (o nombre MRCC si se conoce)\n→ Nombre del buque × 2\n→ Naturaleza = emergencia médica\n→ Solicitud de consejo médico",
            pt:"CHAMADA PAN-PAN MÉDICA\n\nFRASE DE ABERTURA:\n→ PAN-PAN × 3 (não MAYDAY a menos que perigo de vida imediato)\n→ All stations (ou nome MRCC se conhecido)\n→ Nome do navio × 2\n→ Natureza = emergência médica\n→ Pedido de conselho médico"} },
    { role:"MRCC", color:C.info, icon:"🛟",
      smcp:"MV MERIDIAN STAR, this is CROSS MED.\nReceived your PAN-PAN medical.\nSwitch to channel 67 for medical consultation.\nPlease provide full details of the patient.\nOver.",
      fr:"MV MERIDIAN STAR, ici CROSS MED.\nReçu votre PAN-PAN médical.\nPassez sur le canal 67 pour la consultation médicale.\nVeuillez fournir tous les détails du patient.\nTerminé.",
      note:{fr:"RÉPONSE DU MRCC\n\n→ Accusé de réception du PAN-PAN\n→ Direction vers canal médical (souvent 67)\n→ Demande de détails complets du patient\n\nINFOS MÉDICALES REQUISES (SMCP) :\n1. Nom, âge, sexe du patient\n2. Nature de la maladie/blessure\n3. Symptômes (description détaillée)\n4. Signes vitaux (pouls, tension, température, respiration)\n5. Médicaments déjà administrés\n6. Médicaments disponibles à bord\n7. Position du navire et ETA au port le plus proche",
            en:"MRCC RESPONSE\n\n→ PAN-PAN acknowledgment\n→ Direction to medical channel (often 67)\n→ Request for full patient details\n\nREQUIRED MEDICAL INFORMATION (SMCP):\n1. Patient name, age, sex\n2. Nature of illness/injury\n3. Symptoms (detailed description)\n4. Vital signs (pulse, BP, temperature, respiration)\n5. Medication already given\n6. Medication available on board\n7. Vessel position and ETA to nearest port",
            es:"RESPUESTA DEL MRCC\n\n→ Acuse de recibo del PAN-PAN\n→ Dirección al canal médico (a menudo 67)\n→ Solicitud de detalles completos del paciente\n\nINFORMACIÓN MÉDICA REQUERIDA (SMCP):\n1. Nombre, edad, sexo del paciente\n2. Naturaleza de la enfermedad/lesión\n3. Síntomas (descripción detallada)\n4. Signos vitales (pulso, TA, temperatura, respiración)",
            pt:"RESPOSTA DO MRCC\n\n→ Acuse de receção do PAN-PAN\n→ Direção para canal médico (frequentemente 67)\n→ Pedido de detalhes completos do paciente\n\nINFORMAÇÃO MÉDICA NECESSÁRIA (SMCP):\n1. Nome, idade, sexo do paciente\n2. Natureza da doença/lesão\n3. Sintomas (descrição detalhada)\n4. Sinais vitais (pulso, TA, temperatura, respiração)"} },
    { role:"OOW", color:C.med, icon:"🏥",
      smcp:"CROSS MED, MV MERIDIAN STAR on channel 67.\nPatient details:\nName: John Smith. Male. Age 45.\nSymptoms: Severe chest pain, radiating to left arm. Shortness of breath. Sweating.\nPulse: 95 beats per minute, irregular. Blood pressure: 160/100.\nTemperature: 37.2 degrees Celsius.\nOnset: 30 minutes ago. No previous cardiac history.\nMedication given: Aspirin 300mg at [time] UTC.\nOur position: Latitude 42°15'N, Longitude 008°30'W.\nNearest port: Vigo, Spain. ETA: 4 hours.\nOver.",
      fr:"CROSS MED, MV MERIDIAN STAR sur canal 67.\nDétails du patient :\nNom : John Smith. Homme. 45 ans.\nSymptômes : Douleur thoracique sévère, irradiant vers le bras gauche. Essoufflement. Transpiration.\nPouls : 95 battements par minute, irrégulier. Tension artérielle : 160/100.\nTempérature : 37,2 degrés Celsius.\nDébut : il y a 30 minutes. Pas d'antécédents cardiaques.\nMédicament administré : Aspirine 300mg à [heure] UTC.\nNotre position : Latitude 42°15'N, Longitude 008°30'W.\nPort le plus proche : Vigo, Espagne. ETA : 4 heures.\nTerminé.",
      note:{fr:"RAPPORT MÉDICAL COMPLET SMCP\n\nLES 7 ÉLÉMENTS ESSENTIELS :\n1. NOM/ÂGE/SEXE du patient\n2. SYMPTÔMES (description précise)\n3. SIGNES VITAUX (pouls, TA, temp, respi)\n4. ANTÉCÉDENTS médicaux\n5. MÉDICAMENTS déjà administrés\n6. MÉDICAMENTS disponibles à bord\n7. POSITION et ETA port le plus proche\n\nTERMINOLOGIE MÉDICALE SMCP :\n'Beats per minute' = battements par minute\n'Blood pressure' = tension artérielle\n'Degrees Celsius' = degrés Celsius\n'Onset' = début des symptômes",
            en:"COMPLETE MEDICAL REPORT SMCP\n\n7 ESSENTIAL ELEMENTS:\n1. PATIENT NAME/AGE/SEX\n2. SYMPTOMS (precise description)\n3. VITAL SIGNS (pulse, BP, temp, respiration)\n4. MEDICAL HISTORY\n5. MEDICATION already given\n6. MEDICATION available on board\n7. POSITION and ETA to nearest port\n\nSMCP MEDICAL TERMINOLOGY:\n'Beats per minute' = pulse rate\n'Blood pressure' = arterial pressure\n'Degrees Celsius' = temperature unit\n'Onset' = when symptoms started",
            es:"INFORME MÉDICO COMPLETO SMCP\n\n7 ELEMENTOS ESENCIALES:\n1. NOMBRE/EDAD/SEXO del paciente\n2. SÍNTOMAS (descripción precisa)\n3. SIGNOS VITALES (pulso, TA, temp, respiración)\n4. HISTORIAL MÉDICO\n5. MEDICACIÓN ya administrada\n6. MEDICACIÓN disponible a bordo\n7. POSICIÓN y ETA al puerto más cercano",
            pt:"RELATÓRIO MÉDICO COMPLETO SMCP\n\n7 ELEMENTOS ESSENCIAIS:\n1. NOME/IDADE/SEXO do paciente\n2. SINTOMAS (descrição precisa)\n3. SINAIS VITAIS (pulso, TA, temp, respiração)\n4. HISTORIAL MÉDICO\n5. MEDICAÇÃO já administrada\n6. MEDICAÇÃO disponível a bordo\n7. POSIÇÃO e ETA ao porto mais próximo"} },
    { role:"MEDICO", color:C.safe, icon:"👨‍⚕️",
      smcp:"MV MERIDIAN STAR, this is CROSS MED Medical.\nSuspected myocardial infarction.\nInstructions:\n1. Place patient in semi-recumbent position, head elevated.\n2. Give aspirin 300mg if not already given. Confirmed.\n3. Give nitroglycerine spray under the tongue if available.\n4. Monitor pulse and blood pressure every 15 minutes.\n5. Request immediate evacuation. Helicopter is being arranged.\nETA helicopter approximately 90 minutes.\nKeep patient calm and warm. Do not give food or water.\nOver.",
      fr:"MV MERIDIAN STAR, ici CROSS MED Médical.\nInfarctus du myocarde suspecté.\nInstructions :\n1. Placer le patient en position semi-assise, tête surélevée.\n2. Donner de l'aspirine 300mg si pas encore administrée. Confirmé.\n3. Donner spray de nitroglycérine sous la langue si disponible.\n4. Surveiller pouls et tension toutes les 15 minutes.\n5. Demande d'évacuation immédiate. Hélicoptère en cours d'organisation.\nETA hélicoptère : environ 90 minutes.\nGarder le patient calme et au chaud. Ne pas donner d'aliments ni de liquides.\nTerminé.",
      note:{fr:"INSTRUCTIONS MÉDICALES SMCP\n\nRÉCEPTION DES INSTRUCTIONS :\n→ Répéter chaque instruction pour confirmer\n→ Confirmer quand chaque étape est exécutée\n→ Signaler tout changement d'état\n\nPHRASES SMCP :\n'Instruction received. [Répéter instruction].'\n'Patient is now in [position].'\n'Medication administered at [time] UTC.'\n'Vital signs: pulse [X], BP [X], temp [X].'\n'Patient's condition is [stable/deteriorating/improving].'\n'Helicopter is in sight. Preparing for evacuation.'",
            en:"MEDICAL INSTRUCTIONS SMCP\n\nRECEIVING INSTRUCTIONS:\n→ Repeat each instruction to confirm\n→ Confirm when each step is executed\n→ Report any change in condition\n\nSMCP PHRASES:\n'Instruction received. [Repeat instruction].'\n'Patient is now in [position].'\n'Medication administered at [time] UTC.'\n'Vital signs: pulse [X], BP [X], temp [X].'\n'Patient condition is [stable/deteriorating/improving].'\n'Helicopter is in sight. Preparing for evacuation.'",
            es:"INSTRUCCIONES MÉDICAS SMCP\n\nRECEPCIÓN DE INSTRUCCIONES:\n→ Repetir cada instrucción para confirmar\n→ Confirmar cuando se ejecuta cada paso\n→ Informar de cualquier cambio en el estado\n\nFRASES SMCP:\n'Instruction received. [Repetir instrucción].'\n'Patient condition is [stable/deteriorating/improving].'",
            pt:"INSTRUÇÕES MÉDICAS SMCP\n\nRECEÇÃO DE INSTRUÇÕES:\n→ Repetir cada instrução para confirmar\n→ Confirmar quando cada passo é executado\n→ Reportar qualquer mudança de estado\n\nFRASES SMCP:\n'Instruction received. [Repetir instrução].'\n'Patient condition is [stable/deteriorating/improving].'"} },
    { role:"OOW", color:C.med, icon:"🏥",
      smcp:"CROSS MED, MV MERIDIAN STAR.\nUpdate on patient:\nPatient is in semi-recumbent position.\nAspirin confirmed given at [time] UTC.\nNitroglycerine given at [time] UTC.\nVital signs at [time] UTC:\nPulse 88 beats per minute, still irregular.\nBlood pressure 150/95. Temperature 37.2.\nPatient is conscious but in pain. Condition slightly improved.\nWe can see the helicopter approaching. Preparing for evacuation.\nOver.",
      fr:"CROSS MED, MV MERIDIAN STAR.\nMise à jour sur le patient :\nLe patient est en position semi-assise.\nAspirine confirmée administrée à [heure] UTC.\nNitroglycérine administrée à [heure] UTC.\nSignes vitaux à [heure] UTC :\nPouls 88 battements par minute, toujours irrégulier.\nTension 150/95. Température 37,2.\nLe patient est conscient mais souffre. Légèrement amélioré.\nNous voyons l'hélicoptère s'approcher. Préparation de l'évacuation.\nTerminé.",
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
        <button onClick={()=>setShowTr(!showTr)} style={{fontSize:9,padding:"3px 8px",borderRadius:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer"}}>
          {showTr?"▲":"▼"} {lang==="fr"?"Traduction":lang==="en"?"Translation":"Traducción"}
        </button>
        {showTr&&<div style={{fontSize:10,color:C.muted,marginTop:6,fontStyle:"italic",whiteSpace:"pre-line"}}>{p.fr}</div>}
      </div>
      <div style={{padding:"10px 12px",borderRadius:12,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.06)",marginBottom:10,fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
        {p.note[lang]||p.note.en}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":"Anterior"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(procedure.length-1,s+1))} disabled={step===procedure.length-1}
          style={{flex:1,padding:"9px",borderRadius:10,background:step===procedure.length-1?"rgba(255,255,255,0.05)":`${C.med}22`,border:`1px solid ${step===procedure.length-1?"rgba(255,255,255,0.08)":C.med}`,color:C.white,cursor:step===procedure.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":"Siguiente"} ▶
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
      { q:"How do you report suspected heart attack?", a:"I have a patient with suspected myocardial infarction. Symptoms: severe chest pain radiating to [left arm/jaw]. Shortness of breath. Sweating. Pulse: [X] bpm, irregular. Blood pressure: [X/X]. Onset: [X] minutes ago.", fr:"J'ai un patient avec un infarctus du myocarde suspecté. Symptômes : douleur thoracique sévère irradiant vers [bras gauche/mâchoire]. Essoufflement. Transpiration. Pouls : [X] bpm, irrégulier. Tension : [X/X]. Début : il y a [X] minutes." },
      { q:"How do you report a stroke?", a:"I have a patient with suspected stroke. Symptoms: sudden [facial drooping / arm weakness / slurred speech / loss of balance / severe headache]. Onset: [X] minutes ago. Patient is [conscious/unconscious]. Require immediate evacuation.", fr:"J'ai un patient avec un AVC suspecté. Symptômes : soudain [affaissement du visage / faiblesse d'un bras / parole difficile / perte d'équilibre / céphalée sévère]. Début : il y a [X] minutes. Patient [conscient/inconscient]. Évacuation immédiate requise." },
      { q:"How do you report cardiac arrest?", a:"I have a cardiac arrest. Patient is unconscious. No pulse. No breathing. CPR has been started. We have [a defibrillator / no defibrillator]. We require immediate medical evacuation. MAYDAY.", fr:"J'ai un arrêt cardiaque. Le patient est inconscient. Pas de pouls. Pas de respiration. La RCP a été commencée. Nous avons [un défibrillateur / pas de défibrillateur]. Évacuation médicale immédiate requise. MAYDAY." },
      { q:"How do you report high blood pressure (hypertensive crisis)?", a:"I have a patient with very high blood pressure. Blood pressure is [X/X]. Patient has [headache / blurred vision / confusion / nosebleed]. Medical advice is required urgently.", fr:"J'ai un patient avec une pression artérielle très élevée. Tension artérielle [X/X]. Le patient a [maux de tête / vision trouble / confusion / saignement de nez]. Avis médical requis d'urgence." },
    ]},
    trauma:{ label:{fr:"Traumatismes",en:"Trauma",es:"Traumatismos",pt:"Traumatismos"}, icon:"🦴", color:C.urgent, cards:[
      { q:"How do you report a serious fall injury?", a:"I have a patient injured by a fall from [X] metres. Injuries include [fracture of/laceration of/possible spinal injury]. Patient is [conscious/unconscious]. Bleeding is [controlled/not controlled]. Vital signs: pulse [X], BP [X/X].", fr:"J'ai un patient blessé par une chute de [X] mètres. Les blessures comprennent [fracture de/lacération de/possible lésion de la colonne]. Le patient est [conscient/inconscient]. Le saignement est [contrôlé/non contrôlé]. Signes vitaux : pouls [X], TA [X/X]." },
      { q:"How do you report a crush injury?", a:"I have a patient with a crush injury to the [limb/hand/foot]. The injury occurred when [describe]. The injured part is [trapped/freed]. [Bleeding is/is not] controlled. Amputation may be required.", fr:"J'ai un patient avec une blessure par écrasement au [membre/main/pied]. La blessure s'est produite quand [décrire]. La partie blessée est [coincée/libérée]. Le saignement est [contrôlé/non contrôlé]. Une amputation peut être nécessaire." },
      { q:"How do you report a burns casualty?", a:"I have a patient with burns. Burns are on [body area]. Area affected: approximately [X] percent of body surface. Burns are [superficial/partial/full thickness]. Patient is in severe pain. Shock is suspected.", fr:"J'ai un patient avec des brûlures. Les brûlures sont sur [zone du corps]. Superficie affectée : environ [X] pour cent de la surface corporelle. Les brûlures sont [superficielles/partielles/profondes]. Le patient souffre énormément. Un choc est suspecté." },
      { q:"How do you report a suspected spinal injury?", a:"I have a patient with suspected spinal injury. The patient has [neck pain/back pain/numbness/paralysis in limbs]. Patient has NOT been moved. I am awaiting medical advice before moving. Spine has been immobilised.", fr:"J'ai un patient avec une lésion de la colonne suspecte. Le patient a [douleur au cou/douleur dans le dos/engourdissement/paralysie des membres]. Le patient N'A PAS été déplacé. J'attends des conseils médicaux avant de le bouger. La colonne a été immobilisée." },
    ]},
    illness:{ label:{fr:"Maladies",en:"Illnesses",es:"Enfermedades",pt:"Doenças"}, icon:"🤒", color:C.info, cards:[
      { q:"How do you report severe abdominal pain?", a:"I have a patient with severe abdominal pain. Location: [upper right/lower left/around navel/whole abdomen]. Pain is [constant/intermittent]. Duration: [X] hours. Fever: [X] degrees. Nausea/vomiting: [yes/no]. Appendicitis/peritonitis suspected.", fr:"J'ai un patient avec de fortes douleurs abdominales. Localisation : [droite haute/gauche basse/autour du nombril/tout l'abdomen]. La douleur est [constante/intermittente]. Durée : [X] heures. Fièvre : [X] degrés. Nausées/vomissements : [oui/non]. Appendicite/péritonite suspectée." },
      { q:"How do you report a diabetic emergency?", a:"I have a patient with a diabetic emergency. Patient is [hypoglycaemic/hyperglycaemic]. Blood sugar level is [X] mmol/L. Patient is [conscious/confused/unconscious]. I have given [glucose/insulin]. Advice required.", fr:"J'ai un patient avec une urgence diabétique. Le patient est [hypoglycémique/hyperglycémique]. Glycémie : [X] mmol/L. Patient [conscient/confus/inconscient]. J'ai administré [glucose/insuline]. Avis requis." },
      { q:"How do you report severe infection/fever?", a:"I have a patient with high fever. Temperature is [X] degrees Celsius. The patient has [chills/sweating/confusion/difficulty breathing]. Duration: [X] days. Possible source of infection: [wound/respiratory/unknown]. Antibiotics: [given/not given].", fr:"J'ai un patient avec une forte fièvre. Température : [X] degrés Celsius. Le patient a [frissons/transpiration/confusion/difficultés respiratoires]. Durée : [X] jours. Source possible d'infection : [plaie/respiratoire/inconnue]. Antibiotiques : [administrés/non administrés]." },
      { q:"How do you report an unconscious patient?", a:"I have an unconscious patient. Patient was found [unconscious / collapsed] at [time] UTC. No response to [voice/pain]. Breathing: [present/absent]. Pulse: [present/absent]. No apparent cause. Medical emergency.", fr:"J'ai un patient inconscient. Le patient a été trouvé [inconscient/effondré] à [heure] UTC. Pas de réponse à [voix/douleur]. Respiration : [présente/absente]. Pouls : [présent/absent]. Pas de cause apparente. Urgence médicale." },
    ]},
    mental:{ label:{fr:"Santé mentale & Intoxication",en:"Mental health & Intoxication",es:"Salud mental e Intoxicación",pt:"Saúde mental e Intoxicação"}, icon:"🧠", color:C.safe, cards:[
      { q:"How do you report a crew member with psychiatric emergency?", a:"I have a crew member exhibiting unusual behaviour. Patient is [aggressive/confused/hallucinating/threatening self-harm]. Patient has been [isolated/restrained for safety]. Medical advice required urgently.", fr:"J'ai un membre d'équipage présentant un comportement inhabituel. Le patient est [agressif/confus/halluciné/menace de s'automutiler]. Le patient a été [isolé/retenu pour sa sécurité]. Avis médical requis d'urgence." },
      { q:"How do you report alcohol/drug intoxication?", a:"I have a patient with suspected [alcohol/drug] intoxication. Patient is [conscious/semiconscious/unconscious]. Level of intoxication: [severe/moderate]. Substance taken: [alcohol/unknown substance]. Time of ingestion: approximately [X] hours ago.", fr:"J'ai un patient avec une intoxication suspectée à [l'alcool/une drogue]. Le patient est [conscient/semi-conscient/inconscient]. Niveau d'intoxication : [sévère/modéré]. Substance prise : [alcool/substance inconnue]. Heure d'ingestion : il y a environ [X] heures." },
      { q:"How do you report chemical/poison ingestion?", a:"I have a patient who has ingested a chemical/poison. Substance: [name if known / unknown]. Quantity: [X]. Time of ingestion: [X] minutes/hours ago. Symptoms: [describe]. I require immediate toxicological advice.", fr:"J'ai un patient qui a ingéré un produit chimique/poison. Substance : [nom si connu / inconnu]. Quantité : [X]. Heure d'ingestion : il y a [X] minutes/heures. Symptômes : [décrire]. J'ai besoin d'un avis toxicologique immédiat." },
      { q:"How do you report heat stroke?", a:"I have a patient with suspected heat stroke. Body temperature is [X] degrees Celsius. Patient is [confused/unconscious/not sweating]. Working conditions: [hot/humid/confined space]. Patient has been moved to cool area. Cooling measures applied.", fr:"J'ai un patient avec un coup de chaleur suspecté. Température corporelle : [X] degrés Celsius. Le patient est [confus/inconscient/ne transpire pas]. Conditions de travail : [chaud/humide/espace confiné]. Le patient a été déplacé dans un endroit frais. Mesures de refroidissement appliquées." },
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
            <div style={{fontSize:9,color:C.muted,letterSpacing:2,marginBottom:8}}>❓ {lang==="fr"?"Touche pour la réponse SMCP":lang==="en"?"Tap for SMCP answer":"Toca para respuesta SMCP"}</div>
            <div style={{fontSize:13,color:C.white,fontWeight:700,lineHeight:1.5}}>{card.q}</div>
          </div>
        ):(
          <div>
            <div style={{fontSize:9,color:c.color,letterSpacing:2,marginBottom:8}}>✅ SMCP ANSWER</div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,marginBottom:6,whiteSpace:"pre-line"}}>{card.a}</div>
            {lang!=="en"&&<div style={{fontSize:10,color:C.muted,fontStyle:"italic",borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:6}}>{card.fr}</div>}
          </div>
        )}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{setIdx(i=>Math.max(0,i-1));setFlipped(false);}} disabled={idx===0}
          style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:idx===0?C.muted:C.white,cursor:idx===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":"Anterior"}
        </button>
        <button onClick={()=>{setIdx(i=>Math.min(c.cards.length-1,i+1));setFlipped(false);}} disabled={idx===c.cards.length-1}
          style={{flex:1,padding:"9px",borderRadius:10,background:idx===c.cards.length-1?"rgba(255,255,255,0.05)":`${c.color}22`,border:`1px solid ${idx===c.cards.length-1?"rgba(255,255,255,0.08)":c.color}`,color:C.white,cursor:idx===c.cards.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":"Siguiente"} ▶
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

  const q = qs[qIdx];
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

={lang}/>
            </Card>
            <SL icon="🏥" text={lc.p2} color={C.urgent}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.urgent}22`}}>
              <div style={{fontSize:11,color:C.urgent,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🏥 {lang==="fr"?"FICHES CONDITIONS MÉDICALES":lang==="en"?"MEDICAL CONDITIONS FLASHCARDS":"FICHAS CONDICIONES MÉDICAS"}</div>
              <MedicalConditionsFlashcardsSVG lang={lang}/>
            </Card>
            <SL icon="💗" text={lc.p3} color={C.info}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.info}22`}}>
              <div style={{fontSize:11,color:C.info,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💗 {lang==="fr"?"SIGNES VITAUX SMCP":lang==="en"?"VITAL SIGNS SMCP":"SIGNOS VITALES SMCP"}</div>
              <VitalSignsSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎯 {lang==="fr"?"QUIZ MÉDICAL":lang==="en"?"MEDICAL QUIZ":"QUIZ MÉDICO"}</div>
              <MedicalQuizSVG lang={lang}/>
            </Card>
            <SL icon="📝" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="📚" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:`${C.med}08`,border:`1px solid ${C.med}22`}}>
              <div style={{fontSize:11,color:C.med,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.med,fontWeight:700,fontFamily:"'Courier New',monospace"}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.med},${C.urgent},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 10px 36px ${C.med}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Medical SMCP</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 7":lang==="en"?"Lesson 7":"Lección 7"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.med}15`,border:`1px solid ${C.med}55`,fontSize:14,color:C.med,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.med,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.med},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 8px 28px ${C.med}33`,marginBottom:10}}>
              {lang==="fr"?"LEÇON 8 — RÉVISION & EXAMEN →":lang==="en"?"LESSON 8 — EXAM PREP & REVIEW →":lang==="es"?"LECCIÓN 8 — REPASO Y EXAMEN →":"LIÇÃO 8 — REVISÃO E EXAME →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
={lang}/>
            </Card>
            <SL icon="🃏" text={lc.p2} color={C.urgent}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.urgent}22`}}>
              <div style={{fontSize:11,color:C.urgent,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🃏 {lang==="fr"?"FICHES CONDITIONS MÉDICALES":lang==="en"?"MEDICAL CONDITIONS FLASHCARDS":"FICHAS CONDICIONES MÉDICAS"}</div>
              <MedicalConditionsFlashcardsSVG lang={lang}/>
            </Card>
            <SL icon="💗" text={lc.p3} color={C.info}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.info}22`}}>
              <div style={{fontSize:11,color:C.info,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💗 {lang==="fr"?"SIGNES VITAUX SMCP":lang==="en"?"VITAL SIGNS SMCP":"SIGNOS VITALES SMCP"}</div>
              <VitalSignsSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎯 {lang==="fr"?"QUIZ MÉDICAL":lang==="en"?"MEDICAL QUIZ":"QUIZ MÉDICO"}</div>
              <MedicalQuizSVG lang={lang}/>
            </Card>
            <SL icon="📝" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="📚" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:`${C.med}08`,border:`1px solid ${C.med}22`}}>
              <div style={{fontSize:11,color:C.med,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.med,fontWeight:700,fontFamily:"'Courier New',monospace"}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.med},${C.urgent},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 10px 36px ${C.med}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Medical SMCP</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 7":lang==="en"?"Lesson 7":"Lección 7"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.med}15`,border:`1px solid ${C.med}55`,fontSize:14,color:C.med,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.med,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.med},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 8px 28px ${C.med}33`,marginBottom:10}}>
              {lang==="fr"?"LEÇON 8 — EXAMEN FINAL →":lang==="en"?"LESSON 8 — EXAM PREP →":lang==="es"?"LECCIÓN 8 — PREPARACIÓN EXAMEN →":"LIÇÃO 8 — PREPARAÇÃO EXAME →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
