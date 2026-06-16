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

const Card = ({ children, style = {} }: any) => (
  <div style={{background:"rgba(13,31,60,0.7)",border:`1px solid ${C.border}`,borderRadius:14,padding:"14px",...style}}>{children}</div>
);
const SL = ({ icon, text, color }: any) => (
  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:13,fontWeight:700,color,fontFamily:"'Cinzel',serif",letterSpacing:1}}>
    <span style={{fontSize:18}}>{icon}</span>{text}
  </div>
);
const Stars = () => null;

// ══════════════════════════════════════
// SVG 1 — PAN-PAN MEDICO SIMULATOR
// ══════════════════════════════════════
function PanPanMedicoSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [showTr, setShowTr] = useState(false);

  const procedure = [
    { role:"OOW", color:C.med, icon:"🏥",
      smcp:"PAN-PAN PAN-PAN PAN-PAN\nAll stations. All stations. All stations.\nThis is MV MERIDIAN STAR, MV MERIDIAN STAR.\nI have a medical emergency on board.\nI require medical advice.\nOver.",
      fr:"PAN-PAN PAN-PAN PAN-PAN\nToutes stations. Toutes stations. Toutes stations.\nIci MV MERIDIAN STAR.\nJ'ai une urgence médicale à bord.\nJe demande des conseils médicaux.\nTerminé.",
      note:{fr:"APPEL PAN-PAN MÉDICAL\n→ PAN-PAN × 3 (pas MAYDAY sauf danger de vie immédiat)\n→ Nom du navire × 2\n→ CH 16 d'abord puis MRCC oriente vers MEDICO\nSi danger de vie IMMÉDIAT → MAYDAY",
            en:"MEDICAL PAN-PAN CALL\n→ PAN-PAN × 3 (not MAYDAY unless immediate life danger)\n→ Vessel name × 2\n→ CH 16 first then MRCC will direct you to MEDICO\nIf IMMEDIATE life danger → MAYDAY",
            es:"LLAMADA PAN-PAN MÉDICA\n→ PAN-PAN × 3\n→ Nombre del buque × 2\n→ CH 16 luego MRCC dirige a MEDICO",
            pt:"CHAMADA PAN-PAN MÉDICA\n→ PAN-PAN × 3\n→ Nome do navio × 2\n→ CH 16 depois MRCC direciona para MEDICO"} },
    { role:"MRCC", color:C.info, icon:"🛟",
      smcp:"MV MERIDIAN STAR, this is CROSS MED.\nReceived your PAN-PAN medical.\nSwitch to channel 67 for medical consultation.\nProvide full details of the patient.\nOver.",
      fr:"MV MERIDIAN STAR, ici CROSS MED.\nReçu votre PAN-PAN médical.\nPassez sur le canal 67.\nFournissez tous les détails du patient.",
      note:{fr:"INFOS MÉDICALES REQUISES :\n1. Nom, âge, sexe\n2. Nature blessure/maladie\n3. Symptômes\n4. Signes vitaux\n5. Médicaments donnés\n6. Médicaments disponibles\n7. Position + ETA port",
            en:"REQUIRED MEDICAL INFO:\n1. Name, age, sex\n2. Nature of illness/injury\n3. Symptoms\n4. Vital signs\n5. Medication given\n6. Medication available\n7. Position + ETA to port",
            es:"INFO MÉDICA REQUERIDA:\n1. Nombre, edad, sexo\n2. Naturaleza\n3. Síntomas\n4. Signos vitales\n5. Medicación dada\n6. Medicación disponible\n7. Posición + ETA",
            pt:"INFO MÉDICA NECESSÁRIA:\n1. Nome, idade, sexo\n2. Natureza\n3. Sintomas\n4. Sinais vitais\n5. Medicação\n6. Medicação disponível\n7. Posição + ETA"} },
    { role:"OOW", color:C.med, icon:"🏥",
      smcp:"CROSS MED, MV MERIDIAN STAR on channel 67.\nPatient: John Smith. Male, 45.\nSymptoms: severe chest pain, shortness of breath, sweating.\nPulse 95 bpm irregular. BP 160/100. Temp 37.2.\nMedication given: Aspirin 300mg.\nPosition: 42°15'N, 008°30'W. ETA Vigo 4 hours.\nOver.",
      fr:"CROSS MED, MV MERIDIAN STAR canal 67.\nPatient : John Smith, homme, 45 ans.\nDouleur thoracique sévère, essoufflement.\nPouls 95 irrégulier. TA 160/100. Temp 37,2.\nAspirine 300mg administrée.\nPosition 42°15'N 008°30'W. ETA Vigo 4h.",
      note:{fr:"7 ÉLÉMENTS ESSENTIELS :\n1. NOM/ÂGE/SEXE\n2. SYMPTÔMES précis\n3. SIGNES VITAUX\n4. ANTÉCÉDENTS\n5. MÉDICAMENTS donnés\n6. MÉDICAMENTS disponibles\n7. POSITION + ETA",
            en:"7 ESSENTIAL ELEMENTS:\n1. NAME/AGE/SEX\n2. SYMPTOMS precise\n3. VITAL SIGNS\n4. HISTORY\n5. MEDS given\n6. MEDS available\n7. POSITION + ETA",
            es:"7 ELEMENTOS:\n1. NOMBRE/EDAD/SEXO\n2. SÍNTOMAS\n3. SIGNOS VITALES\n4. HISTORIAL\n5. MEDICACIÓN\n6. DISPONIBLE\n7. POSICIÓN + ETA",
            pt:"7 ELEMENTOS:\n1. NOME/IDADE/SEXO\n2. SINTOMAS\n3. SINAIS VITAIS\n4. HISTORIAL\n5. MEDICAÇÃO\n6. DISPONÍVEL\n7. POSIÇÃO + ETA"} },
    { role:"MEDICO", color:C.safe, icon:"👨‍⚕️",
      smcp:"MV MERIDIAN STAR, CROSS MED Medical.\nSuspected myocardial infarction.\n1. Place patient semi-recumbent.\n2. Give aspirin 300mg if not already.\n3. Nitroglycerine spray under tongue.\n4. Monitor vitals every 15 minutes.\n5. Helicopter being arranged. ETA 90 minutes.\nOver.",
      fr:"MV MERIDIAN STAR, CROSS MED Médical.\nInfarctus suspecté.\n1. Position semi-assise.\n2. Aspirine 300mg.\n3. Nitroglycérine sous langue.\n4. Surveiller signes vitaux /15min.\n5. Hélicoptère ETA 90min.",
      note:{fr:"RÉCEPTION INSTRUCTIONS :\n→ Répéter chaque instruction\n→ Confirmer exécution\n→ Signaler changements\n'Instruction received. [Repeat].'\n'Medication administered at [time] UTC.'",
            en:"RECEIVING INSTRUCTIONS:\n→ Repeat each instruction\n→ Confirm execution\n→ Report changes\n'Instruction received. [Repeat].'\n'Medication administered at [time] UTC.'",
            es:"RECEPCIÓN:\n→ Repetir cada instrucción\n→ Confirmar\n→ Informar cambios",
            pt:"RECEÇÃO:\n→ Repetir cada instrução\n→ Confirmar\n→ Reportar mudanças"} },
    { role:"OOW", color:C.med, icon:"🏥",
      smcp:"CROSS MED, MV MERIDIAN STAR.\nPatient update:\nSemi-recumbent. Aspirin and nitroglycerine given.\nPulse 88 irregular. BP 150/95. Temp 37.2.\nConscious, condition slightly improved.\nHelicopter approaching. Preparing for evacuation.\nOver.",
      fr:"CROSS MED, MV MERIDIAN STAR.\nMise à jour :\nPosition semi-assise. Aspirine et nitro données.\nPouls 88 irrégulier. TA 150/95. Temp 37,2.\nConscient, légèrement amélioré.\nHélicoptère en vue.",
      note:{fr:"SUIVI OBLIGATOIRE :\n→ Toutes 15-30 min\n→ Signes vitaux actuels\n→ Tendance amélioré/stable/aggravé\n'Patient ready for evacuation.'\n'Evacuation complete. Cancel PAN-PAN.'",
            en:"MANDATORY UPDATES:\n→ Every 15-30 min\n→ Current vital signs\n→ Trend improved/stable/deteriorated\n'Patient ready for evacuation.'\n'Evacuation complete. Cancel PAN-PAN.'",
            es:"ACTUALIZACIONES:\n→ Cada 15-30 min\n→ Signos vitales\n→ Tendencia",
            pt:"ATUALIZAÇÕES:\n→ A cada 15-30 min\n→ Sinais vitais\n→ Tendência"} },
  ];

  const p = procedure[step];

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {procedure.map((_,i)=>(
          <div key={i} onClick={()=>setStep(i)} style={{flex:1,height:4,borderRadius:4,cursor:"pointer",background:i<=step?(i===step?C.med:`${C.med}55`):"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div style={{fontSize:9,color:C.med,letterSpacing:2,textAlign:"center",marginBottom:8,fontFamily:"'Cinzel',serif"}}>
        🏥 PAN-PAN MEDICO SIMULATOR — {step+1}/{procedure.length}
      </div>
      <div style={{padding:"12px",borderRadius:14,marginBottom:10,background:`${p.color}10`,border:`2px solid ${p.color}55`}}>
        <div style={{fontSize:9,fontWeight:700,color:p.color,marginBottom:6,letterSpacing:1}}>{p.icon} {p.role}</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.6,fontWeight:600,whiteSpace:"pre-line",marginBottom:6}}>{p.smcp}</div>
        <button onClick={()=>setShowTr(!showTr)} style={{fontSize:9,padding:"3px 8px",borderRadius:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer"}}>
          {showTr?"▲":"▼"} {lang==="fr"?"Traduction":lang==="en"?"Translation":"Traducción"}
        </button>
        {showTr&&<div style={{fontSize:10,color:C.muted,marginTop:6,fontStyle:"italic",whiteSpace:"pre-line"}}>{p.fr}</div>}
      </div>
      <div style={{padding:"10px 12px",borderRadius:12,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.06)",marginBottom:10,fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
        {p.note[lang]||p.note.en}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0} style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>◀ Prev</button>
        <button onClick={()=>setStep(s=>Math.min(procedure.length-1,s+1))} disabled={step===procedure.length-1} style={{flex:1,padding:"9px",borderRadius:10,background:step===procedure.length-1?"rgba(255,255,255,0.05)":`${C.med}22`,border:`1px solid ${step===procedure.length-1?"rgba(255,255,255,0.08)":C.med}`,color:C.white,cursor:step===procedure.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>Next ▶</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — VITAL SIGNS
// ══════════════════════════════════════
function VitalSignsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const vitals = [
    { id:"pulse", icon:"💗", color:C.med, label:{fr:"Pouls",en:"Pulse",es:"Pulso",pt:"Pulso"},
      smcp:"SMCP: 'Pulse is [X] beats per minute. [Regular/irregular].'\nAdult: 60-100 bpm\nBradycardia <60 · Tachycardia >100" },
    { id:"bp", icon:"🩺", color:C.urgent, label:{fr:"Tension",en:"Blood pressure",es:"Tensión",pt:"Pressão"},
      smcp:"SMCP: 'Blood pressure is [X] over [X].'\nNormal ~120/80\nHypertension >140/90 · Hypotension <90/60" },
    { id:"temp", icon:"🌡️", color:C.info, label:{fr:"Température",en:"Temperature",es:"Temperatura",pt:"Temperatura"},
      smcp:"SMCP: 'Temperature is [X] degrees Celsius.'\nNormal 36.5-37.5°C\nFever >37.5 · Hyperthermia >40.5 · Hypothermia <35" },
    { id:"resp", icon:"🫁", color:C.safe, label:{fr:"Respiration",en:"Respiration",es:"Respiración",pt:"Respiração"},
      smcp:"SMCP: 'Respiration rate is [X] breaths per minute.'\nAdult 12-20/min\nApnoea = no breathing → MAYDAY" },
  ];
  const sel_ = sel!==null ? vitals[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {vitals.map((v,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",background:sel===i?`${v.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i?v.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18,marginBottom:3}}>{v.icon}</div>
            <div style={{fontSize:9,color:sel===i?v.color:C.muted,fontWeight:700}}>{v.label[lang]||v.label.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.smcp}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ
// ══════════════════════════════════════
const QUIZ = {
  en:[
    { q:"Crew collapses with no pulse and no breathing. Which signal?", opts:["PAN-PAN","MAYDAY","SÉCURITÉ","No signal"], correct:1, expl:"Cardiac arrest = immediate danger to life = MAYDAY." },
    { q:"Which channel for medical PAN-PAN alert?", opts:["CH 6","CH 16","CH 70","CH 12"], correct:1, expl:"CH 16 = distress/urgency hailing channel." },
    { q:"How do you say 37°C in SMCP?", opts:["37 Celsius","thirty-seven degrees Celsius","37 degrees","temp 37"], correct:1, expl:"Always spell out + 'degrees Celsius'." },
    { q:"Normal adult pulse range?", opts:["40-60 bpm","60-100 bpm","100-150 bpm","20-40 bpm"], correct:1, expl:"Normal adult resting pulse: 60-100 beats per minute." },
    { q:"FAST rule 'A' stands for?", opts:["Abdomen","Arm weakness","Airway","Age"], correct:1, expl:"FAST = Face, Arm, Speech, Time — for stroke recognition." },
  ],
  fr:[
    { q:"Équipier inconscient, sans pouls ni respiration. Quel signal ?", opts:["PAN-PAN","MAYDAY","SÉCURITÉ","Aucun"], correct:1, expl:"Arrêt cardiaque = danger vital immédiat = MAYDAY." },
    { q:"Quel canal pour l'alerte PAN-PAN médicale ?", opts:["CH 6","CH 16","CH 70","CH 12"], correct:1, expl:"CH 16 = canal de détresse/urgence." },
    { q:"Comment dit-on 37°C en SMCP ?", opts:["37 Celsius","thirty-seven degrees Celsius","37 degrees","temp 37"], correct:1, expl:"Toujours épeler en lettres + 'degrees Celsius'." },
    { q:"Plage de pouls normale adulte ?", opts:["40-60 bpm","60-100 bpm","100-150 bpm","20-40 bpm"], correct:1, expl:"Pouls de repos normal : 60-100 bpm." },
    { q:"Règle FAST — le 'A' signifie ?", opts:["Abdomen","Arm weakness","Airway","Age"], correct:1, expl:"FAST = Face, Arm, Speech, Time (AVC)." },
  ],
  es:[
    { q:"Tripulante inconsciente, sin pulso ni respiración. ¿Señal?", opts:["PAN-PAN","MAYDAY","SÉCURITÉ","Ninguna"], correct:1, expl:"Paro cardíaco = MAYDAY." },
    { q:"¿Canal para alerta PAN-PAN médica?", opts:["CH 6","CH 16","CH 70","CH 12"], correct:1, expl:"CH 16 = canal de socorro." },
    { q:"¿Cómo se dice 37°C en SMCP?", opts:["37 Celsius","thirty-seven degrees Celsius","37 degrees","temp 37"], correct:1, expl:"Siempre en letras + 'degrees Celsius'." },
    { q:"¿Pulso normal adulto?", opts:["40-60","60-100 bpm","100-150","20-40"], correct:1, expl:"60-100 lpm." },
    { q:"FAST — la 'A' significa?", opts:["Abdomen","Arm weakness","Airway","Age"], correct:1, expl:"FAST = Face, Arm, Speech, Time." },
  ],
  pt:[
    { q:"Tripulante inconsciente, sem pulso nem respiração. Sinal?", opts:["PAN-PAN","MAYDAY","SÉCURITÉ","Nenhum"], correct:1, expl:"Paragem cardíaca = MAYDAY." },
    { q:"Canal para alerta PAN-PAN médica?", opts:["CH 6","CH 16","CH 70","CH 12"], correct:1, expl:"CH 16 = canal de socorro." },
    { q:"Como se diz 37°C em SMCP?", opts:["37 Celsius","thirty-seven degrees Celsius","37 degrees","temp 37"], correct:1, expl:"Sempre por extenso + 'degrees Celsius'." },
    { q:"Pulso normal adulto?", opts:["40-60","60-100 bpm","100-150","20-40"], correct:1, expl:"60-100 bpm." },
    { q:"FAST — 'A' significa?", opts:["Abdomen","Arm weakness","Airway","Age"], correct:1, expl:"FAST = Face, Arm, Speech, Time." },
  ],
};

function QuizComp({ questions, t, onComplete }: any) {
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<number|null>(null);
  const [score, setScore] = useState(0);
  const q = questions[idx];
  const choose = (i:number) => { if (pick!==null) return; setPick(i); if (i===q.correct) setScore(s=>s+1); };
  const next = () => {
    if (idx < questions.length-1) { setIdx(i=>i+1); setPick(null); }
    else onComplete(pick===q.correct ? score : score);
  };
  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {questions.map((_:any,i:number)=><div key={i} style={{flex:1,height:4,borderRadius:4,background:i<idx?C.med:i===idx?C.urgent:"rgba(255,255,255,0.1)"}}/>)}
      </div>
      <div style={{fontSize:11,color:C.muted,marginBottom:8}}>{t.question} {idx+1} {t.ofQ} {questions.length}</div>
      <div style={{fontSize:14,color:C.white,fontWeight:700,marginBottom:14,lineHeight:1.5}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
        {q.opts.map((opt:string,i:number)=>{
          let bg="rgba(255,255,255,0.05)", bd="rgba(255,255,255,0.1)";
          if (pick!==null) { if (i===q.correct) { bg="rgba(34,197,94,0.2)"; bd=C.safe; } else if (i===pick) { bg="rgba(192,57,43,0.2)"; bd=C.red; } }
          return <button key={i} onClick={()=>choose(i)} style={{padding:"12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.white,fontSize:12,textAlign:"left",cursor:pick!==null?"default":"pointer"}}>{opt}</button>;
        })}
      </div>
      {pick!==null && <>
        <div style={{padding:"10px 12px",borderRadius:10,background:pick===q.correct?"rgba(34,197,94,0.12)":"rgba(192,57,43,0.12)",border:`1px solid ${pick===q.correct?C.safe:C.red}44`,fontSize:11,color:C.white,marginBottom:10,lineHeight:1.6}}>
          <div style={{fontWeight:700,marginBottom:4}}>{pick===q.correct?t.correct:t.wrong}</div>
          <div style={{color:C.muted}}>{t.expl} {q.expl}</div>
        </div>
        <button onClick={next} style={{width:"100%",padding:"12px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${C.med},${C.gold})`,color:C.white,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
          {idx<questions.length-1 ? t.next : t.finish}
        </button>
      </>}
    </div>
  );
}

const getContent = (lang:string) => {
  const d:any = {
    en:{ badge:"LESSON 7 · MEDICAL SMCP", title:"Medical SMCP — Emergencies & MEDICO",
      intro:"Master the SMCP for medical emergencies at sea: PAN-PAN/MAYDAY signals, structured patient reports, vital signs terminology, and helicopter evacuation communications.",
      p1:"PART 1 — PAN-PAN MEDICO PROCEDURE", p2:"PART 2 — VITAL SIGNS SMCP", p3:"PART 3 — MEDICAL QUIZ",
      s1:"PAN-PAN = urgency (not life-threatening yet)\nMAYDAY = immediate danger to life (cardiac arrest, drowning, severe trauma)\nMRCC routes you to MEDICO (CIRM Italy, CCMM France)\n7 patient elements: name/age/sex · symptoms · vitals · history · meds given · meds available · position/ETA",
      s2:"Pulse: 'Pulse is [X] beats per minute. Regular/irregular.'\nBP: 'Blood pressure is [X] over [X].'\nTemp: 'Temperature is [X] degrees Celsius.'\nRespiration: 'Respiration rate is [X] breaths per minute.'",
      s3:"5 questions covering signal choice, channels, terminology, vital ranges and FAST stroke rule.",
      sumT:"SUMMARY — MEDICAL SMCP",
      sumP:["PAN-PAN × 3 for urgency · MAYDAY only for immediate life danger","Use CH 16 for first alert, then channel given by MRCC (often 67)","7 essential patient elements always reported in order","Vital signs spelled out: 'thirty-seven degrees Celsius'","FAST rule for stroke: Face, Arm, Speech, Time"],
      learnedP:["PAN-PAN medical call structure","7 elements of a medical SMCP report","Vital signs vocabulary","Helicopter evacuation phrases","FAST stroke recognition"] },
    fr:{ badge:"LEÇON 7 · SMCP MÉDICAL", title:"SMCP Médical — Urgences & MEDICO",
      intro:"Maîtrise le SMCP pour les urgences médicales en mer : signaux PAN-PAN/MAYDAY, rapports patient structurés, terminologie des signes vitaux et communications d'évacuation par hélicoptère.",
      p1:"PARTIE 1 — PROCÉDURE PAN-PAN MEDICO", p2:"PARTIE 2 — SIGNES VITAUX SMCP", p3:"PARTIE 3 — QUIZ MÉDICAL",
      s1:"PAN-PAN = urgence (pas encore vital)\nMAYDAY = danger vital immédiat (arrêt cardiaque, noyade, trauma grave)\nMRCC vous oriente vers MEDICO (CIRM Italie, CCMM France)\n7 éléments patient : nom/âge/sexe · symptômes · vitaux · antécédents · médicaments donnés · disponibles · position/ETA",
      s2:"Pouls : 'Pulse is [X] beats per minute.'\nTA : 'Blood pressure is [X] over [X].'\nTemp : 'Temperature is [X] degrees Celsius.'\nRespiration : 'Respiration rate is [X] breaths per minute.'",
      s3:"5 questions sur le choix du signal, canaux, terminologie, plages vitales et règle FAST.",
      sumT:"RÉSUMÉ — SMCP MÉDICAL",
      sumP:["PAN-PAN × 3 pour urgence · MAYDAY uniquement si danger vital immédiat","CH 16 pour 1ère alerte, puis canal donné par MRCC (souvent 67)","7 éléments patient essentiels toujours rapportés dans l'ordre","Signes vitaux épelés : 'thirty-seven degrees Celsius'","Règle FAST pour AVC : Face, Arm, Speech, Time"],
      learnedP:["Structure d'appel PAN-PAN médical","7 éléments d'un rapport SMCP médical","Vocabulaire des signes vitaux","Phrases d'évacuation hélicoptère","Reconnaissance AVC FAST"] },
    es:{ badge:"LECCIÓN 7 · SMCP MÉDICO", title:"SMCP Médico — Urgencias y MEDICO",
      intro:"Domina el SMCP para emergencias médicas en el mar: señales PAN-PAN/MAYDAY, informes estructurados, terminología de signos vitales y evacuación por helicóptero.",
      p1:"PARTE 1 — PROCEDIMIENTO PAN-PAN MEDICO", p2:"PARTE 2 — SIGNOS VITALES SMCP", p3:"PARTE 3 — QUIZ MÉDICO",
      s1:"PAN-PAN = urgencia · MAYDAY = peligro vital inmediato\nMRCC dirige a MEDICO (CIRM, CCMM)\n7 elementos del paciente",
      s2:"Pulso, TA, Temp, Respiración — terminología SMCP",
      s3:"5 preguntas sobre señales, canales y signos vitales.",
      sumT:"RESUMEN — SMCP MÉDICO",
      sumP:["PAN-PAN × 3 · MAYDAY solo peligro vital","CH 16 primera alerta","7 elementos del paciente","Signos vitales deletreados","Regla FAST para ACV"],
      learnedP:["Llamada PAN-PAN médica","7 elementos","Vocabulario signos vitales","Evacuación helicóptero","FAST ACV"] },
    pt:{ badge:"LIÇÃO 7 · SMCP MÉDICO", title:"SMCP Médico — Emergências e MEDICO",
      intro:"Domina o SMCP para emergências médicas no mar: sinais PAN-PAN/MAYDAY, relatórios estruturados, terminologia de sinais vitais e evacuação por helicóptero.",
      p1:"PARTE 1 — PROCEDIMENTO PAN-PAN MEDICO", p2:"PARTE 2 — SINAIS VITAIS SMCP", p3:"PARTE 3 — QUIZ MÉDICO",
      s1:"PAN-PAN = urgência · MAYDAY = perigo de vida imediato\nMRCC direciona para MEDICO\n7 elementos do paciente",
      s2:"Pulso, TA, Temp, Respiração — terminologia SMCP",
      s3:"5 perguntas sobre sinais, canais e sinais vitais.",
      sumT:"RESUMO — SMCP MÉDICO",
      sumP:["PAN-PAN × 3 · MAYDAY só perigo vital","CH 16 primeiro alerta","7 elementos do paciente","Sinais vitais por extenso","Regra FAST para AVC"],
      learnedP:["Chamada PAN-PAN médica","7 elementos","Vocabulário sinais vitais","Evacuação helicóptero","FAST AVC"] },
  };
  return d[lang]||d.en;
};

export default function LessonSMCP_L7({ lang="en", onBack=()=>{}, onComplete=()=>{} }: any) {
  const t = T[lang]||T.en;
  const quiz = QUIZ[lang]||QUIZ.en;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{ setTimeout(()=>setVis(true), 80); }, []);
  const progress = phase==="content" ? 15 : phase==="quiz" ? 70 : 100;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.med}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.med,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🏥 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 7":lang==="en"?"Lesson 7":lang==="es"?"Lección 7":"Lição 7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.med,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.med},${C.urgent},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content" && <>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.med}15`,border:`1px solid ${C.med}44`,fontSize:11,color:C.med,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.med}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="🏥" text={lc.p1} color={C.med}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.med}22`}}>
              <div style={{fontSize:11,color:C.med,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🏥 PAN-PAN MEDICO SIMULATOR</div>
              <PanPanMedicoSVG lang={lang}/>
            </Card>
            <SL icon="💗" text={lc.p2} color={C.info}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.info}22`}}>
              <div style={{fontSize:11,color:C.info,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💗 VITAL SIGNS SMCP</div>
              <VitalSignsSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,background:`${C.med}08`,border:`1px solid ${C.med}22`}}>
              <div style={{fontSize:11,color:C.med,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt:string,i:number)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.med,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.med},${C.urgent},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 10px 36px ${C.med}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz" && <>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Medical SMCP</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 7":"Lesson 7"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={(s:number)=>{ setQuizScore(s); setTimeout(()=>setPhase("done"), 800); }}/>
          </>}
          {phase==="done" && <div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.med}15`,border:`1px solid ${C.med}55`,fontSize:14,color:C.med,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt:string,i:number)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.med,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.med},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 8px 28px ${C.med}33`,marginBottom:10}}>
              {t.backDash}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.back}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}