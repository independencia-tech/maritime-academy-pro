import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", yellow:"#f1c40f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module Machine", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Engine Module", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo Máquinas", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo Máquinas", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — EMERGENCY RESPONSE FLOWCHART
// ══════════════════════════════════════
function EmergencyFlowSVG({ lang }) {
  const [active, setActive] = useState(null);

  const emergencies = [
    { id:"flooding", icon:"🌊", color:C.blue2,
      label:{fr:"Voie d'eau",en:"Flooding",es:"Vía de agua",pt:"Alagamento"},
      steps:{fr:["1. ALARME GÉNÉRALE immédiate","2. Localiser la voie d'eau","3. Fermer cloisons étanches","4. Démarrer pompes de cale","5. Notifier passerelle + chef méc.","6. Évaluer gravité → abandon ?"],en:["1. GENERAL ALARM immediately","2. Locate the flooding","3. Close watertight bulkheads","4. Start bilge pumps","5. Notify bridge + chief engineer","6. Assess severity → abandon?"],es:["1. ALARMA GENERAL inmediata","2. Localizar la vía de agua","3. Cerrar mamparos estancos","4. Arrancar bombas de sentina","5. Notificar puente + jefe máq.","6. Evaluar gravedad → abandono?"],pt:["1. ALARME GERAL imediato","2. Localizar a via de água","3. Fechar anteparas estanques","4. Arrancar bombas de porão","5. Notificar ponte + chefe máq.","6. Avaliar gravidade → abandono?"]}},
    { id:"fire_er", icon:"🔥", color:C.red,
      label:{fr:"Incendie salle machines",en:"Engine room fire",es:"Incendio sala máquinas",pt:"Incêndio sala máquinas"},
      steps:{fr:["1. ALARME INCENDIE + ÉVACUATION","2. Compter tout l'équipage","3. Fermer ventilations + vannes fuel","4. Couper moteur principal","5. Déclencher CO2 FIXE","6. Attendre 30 min → ARA réentrée"],en:["1. FIRE ALARM + EVACUATION","2. Count all crew","3. Close ventilation + fuel valves","4. Shut main engine","5. Activate FIXED CO2","6. Wait 30 min → SCBA re-entry"],es:["1. ALARMA INCENDIO + EVACUACIÓN","2. Contar toda la tripulación","3. Cerrar ventilaciones + válvulas fuel","4. Parar motor principal","5. Activar CO2 FIJO","6. Esperar 30 min → ERA reentrada"],pt:["1. ALARME INCÊNDIO + EVACUAÇÃO","2. Contar toda a tripulação","3. Fechar ventilações + válvulas fuel","4. Parar motor principal","5. Ativar CO2 FIXO","6. Aguardar 30 min → ARA reentrada"]}},
    { id:"blackout", icon:"⚡", color:C.yellow,
      label:{fr:"Blackout total",en:"Total blackout",es:"Blackout total",pt:"Blackout total"},
      steps:{fr:["1. UPS maintient alarmes 30 min","2. Groupe secours démarre AUTO < 30s","3. Si manuel : démarrer groupe secours","4. Rétablir MSB par étapes","5. Load shedding : circuits essentiels d'abord","6. Notifier passerelle · consigner journal"],en:["1. UPS maintains alarms 30 min","2. Emergency gen AUTO starts < 30s","3. If manual: start emergency gen","4. Restore MSB step by step","5. Load shedding: essential circuits first","6. Notify bridge · log it"],es:["1. UPS mantiene alarmas 30 min","2. Grupo emergencia arranca AUTO < 30s","3. Si manual: arrancar grupo emergencia","4. Restablecer MSB por etapas","5. Load shedding: circuitos esenciales primero","6. Notificar puente · registrar en diario"],pt:["1. UPS mantém alarmes 30 min","2. Grupo emergência arranca AUTO < 30s","3. Se manual: arrancar grupo emergência","4. Restabelecer MSB por etapas","5. Load shedding: circuitos essenciais primeiro","6. Notificar ponte · registar no diário"]}},
    { id:"grounding", icon:"⚓", color:C.orange,
      label:{fr:"Échouage",en:"Grounding",es:"Varada",pt:"Encalhe"},
      steps:{fr:["1. STOP MOTEUR immédiat","2. Alarme générale","3. Inspection voies d'eau (compartiments)","4. Sonder toutes les citernes","5. NE PAS FORCER les moteurs","6. Évaluer avec capitaine → remorquage?"],en:["1. STOP ENGINE immediately","2. General alarm","3. Inspect for flooding (compartments)","4. Sound all tanks","5. DO NOT force engines","6. Assess with captain → towing?"],es:["1. PARAR MOTOR inmediatamente","2. Alarma general","3. Inspeccionar vías de agua (compartimentos)","4. Sondear todos los tanques","5. NO FORZAR los motores","6. Evaluar con capitán → remolque?"],pt:["1. PARAR MOTOR imediatamente","2. Alarme geral","3. Inspecionar vias de água (compartimentos)","4. Sondar todos os tanques","5. NÃO FORÇAR os motores","6. Avaliar com capitão → reboque?"]}},
    { id:"collision", icon:"💥", color:C.purple,
      label:{fr:"Collision",en:"Collision",es:"Colisión",pt:"Colisão"},
      steps:{fr:["1. STOP MOTEUR → évaluer les dégâts","2. Alarme générale","3. Inspection urgente : voies d'eau ?","4. Fermer cloisons étanches","5. Pompes de cale en marche","6. Mayday si nécessaire · attendre ordres capitaine"],en:["1. STOP ENGINE → assess damage","2. General alarm","3. Urgent inspection: flooding?","4. Close watertight bulkheads","5. Bilge pumps running","6. Mayday if needed · await captain's orders"],es:["1. PARAR MOTOR → evaluar daños","2. Alarma general","3. Inspección urgente: ¿vías de agua?","4. Cerrar mamparos estancos","5. Bombas de sentina en marcha","6. Mayday si necesario · esperar órdenes capitán"],pt:["1. PARAR MOTOR → avaliar danos","2. Alarme geral","3. Inspeção urgente: vias de água?","4. Fechar anteparas estanques","5. Bombas de porão em funcionamento","6. Mayday se necessário · aguardar ordens capitão"]}},
    { id:"man_overboard", icon:"🧍", color:C.teal,
      label:{fr:"Homme à la mer",en:"Man overboard",es:"Hombre al agua",pt:"Homem ao mar"},
      steps:{fr:["1. CRIER 'Homme à la mer !'","2. Lancer bouée de sauvetage IMMÉDIAT","3. Garder visuel sur la personne","4. Moteur : ordres de la passerelle","5. SART/AIS MOB activé","6. Canot de secours mis à l'eau"],en:["1. SHOUT 'Man overboard!'","2. Throw life buoy IMMEDIATELY","3. Keep visual on person","4. Engine: follow bridge orders","5. SART/AIS MOB activated","6. Rescue boat launched"],es:["1. GRITAR '¡Hombre al agua!'","2. Lanzar aro salvavidas INMEDIATAMENTE","3. Mantener visual en la persona","4. Motor: órdenes del puente","5. SART/AIS MOB activado","6. Bote de rescate a la mar"],pt:["1. GRITAR 'Homem ao mar!'","2. Lançar boia salva-vidas IMEDIATAMENTE","3. Manter visual na pessoa","4. Motor: ordens da ponte","5. SART/AIS MOB ativado","6. Bote de resgate ao mar"]}},
  ];

  const act = active ? emergencies.find(e=>e.id===active) : null;

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:10}}>
        {emergencies.map(e=>(
          <div key={e.id} onClick={()=>setActive(active===e.id?null:e.id)}
            style={{padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:active===e.id?`${e.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${active===e.id?e.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:22,marginBottom:4}}>{e.icon}</div>
            <div style={{fontSize:8,color:active===e.id?e.color:C.muted,fontWeight:700,lineHeight:1.3}}>
              {e.label[lang]||e.label.fr}
            </div>
          </div>
        ))}
      </div>
      {act?(
        <div style={{padding:"12px",borderRadius:14,background:`${act.color}12`,border:`1.5px solid ${act.color}44`,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:13,fontWeight:700,color:act.color,marginBottom:8}}>{act.icon} {act.label[lang]||act.label.fr}</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {(act.steps[lang]||act.steps.fr).map((step,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"6px 8px",borderRadius:8,
                background:i===0?"rgba(192,57,43,0.15)":"rgba(255,255,255,0.04)",
                border:`1px solid ${i===0?C.red:"rgba(255,255,255,0.05)"}`}}>
                <div style={{width:18,height:18,borderRadius:"50%",flexShrink:0,
                  background:i===0?C.red:`${act.color}33`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:9,fontWeight:700,color:i===0?C.white:act.color}}>
                  {i+1}
                </div>
                <div style={{fontSize:11,color:i===0?C.white:C.muted,fontWeight:i===0?700:400,lineHeight:1.4}}>
                  {step.replace(/^\d+\. /,"")}
                </div>
              </div>
            ))}
          </div>
        </div>
      ):(
        <div style={{textAlign:"center",padding:"12px",fontSize:11,color:C.muted}}>
          {lang==="fr"?"Touche une urgence pour voir la procédure":lang==="en"?"Tap an emergency to see the procedure":"Toca una emergencia para ver el procedimiento"}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — DEAD SHIP RECOVERY SIMULATOR
// ══════════════════════════════════════
function DeadShipSVG({ lang }) {
  const [step, setStep] = useState(-1);
  const [completed, setCompleted] = useState([]);

  const steps = [
    { id:"emg_gen", icon:"🔌", color:C.red,
      label:{fr:"1. Démarrer groupe de secours",en:"1. Start emergency generator",es:"1. Arrancar grupo emergencia",pt:"1. Arrancar grupo emergência"},
      detail:{fr:"Local groupe de secours (au-dessus flottaison)\nDémarrage manuel ou automatique\nVérifier : niveau carburant, huile, batterie démarrage\nTemps max : 30 secondes (SOLAS)",en:"Emergency gen room (above waterline)\nManual or automatic start\nCheck: fuel level, oil, starter battery\nMax time: 30 seconds (SOLAS)",es:"Local grupo emergencia (encima flotación)\nArranque manual o automático\nVerificar: nivel combustible, aceite, batería arranque\nTiempo máx: 30 segundos (SOLAS)",pt:"Local grupo emergência (acima flutuação)\nArranque manual ou automático\nVerificar: nível combustível, óleo, bateria arranque\nTempo máx: 30 segundos (SOLAS)"}},
    { id:"msb", icon:"⚡", color:C.yellow,
      label:{fr:"2. Rétablir tableau principal (MSB)",en:"2. Restore main switchboard (MSB)",es:"2. Restablecer cuadro principal (MSB)",pt:"2. Restabelecer quadro principal (MSB)"},
      detail:{fr:"Transférer alimentation groupe secours → MSB\nDéconnecter charges non essentielles (load shedding)\nPriorité : navigation, communication, pompes incendie\nVérifier tensions : 440V / 220V / 24V DC",en:"Transfer emergency gen power → MSB\nDisconnect non-essential loads (load shedding)\nPriority: navigation, communications, fire pumps\nCheck voltages: 440V / 220V / 24V DC",es:"Transferir alimentación grupo emergencia → MSB\nDesconectar cargas no esenciales (load shedding)\nPrioridad: navegación, comunicaciones, bombas contraincendios\nVerificar tensiones: 440V / 220V / 24V DC",pt:"Transferir alimentação grupo emergência → MSB\nDesconectar cargas não essenciais (load shedding)\nPrioridade: navegação, comunicações, bombas incêndio\nVerificar tensões: 440V / 220V / 24V DC"}},
    { id:"aux_start", icon:"🔋", color:C.orange,
      label:{fr:"3. Démarrer génératrice auxiliaire",en:"3. Start auxiliary generator",es:"3. Arrancar generador auxiliar",pt:"3. Arrancar gerador auxiliar"},
      detail:{fr:"Démarrage à l'air comprimé (25-30 bars)\nVérifier bouteilles air (> 80% pression)\nMontée en puissance progressive\nCouplage en parallèle avec groupe secours\nTransfert charge vers génératrice auxiliaire",en:"Air start (25-30 bar)\nCheck air bottles (> 80% pressure)\nProgressive power increase\nParallel coupling with emergency gen\nTransfer load to auxiliary generator",es:"Arranque por aire comprimido (25-30 bar)\nVerificar botellas aire (> 80% presión)\nAumento progresivo de potencia\nAcoplamiento en paralelo con grupo emergencia\nTransferir carga al generador auxiliar",pt:"Arranque por ar comprimido (25-30 bar)\nVerificar garrafas ar (> 80% pressão)\nAumento progressivo de potência\nAcoplamento em paralelo com grupo emergência\nTransferir carga para gerador auxiliar"}},
    { id:"me_prepare", icon:"🔥", color:C.teal,
      label:{fr:"4. Préparer moteur principal",en:"4. Prepare main engine",es:"4. Preparar motor principal",pt:"4. Preparar motor principal"},
      detail:{fr:"Chauffer chaudière et HFO (si applicable)\nMettre en circulation pompes eau de mer + eau douce\nVérifier niveau huile et pression\nPréchauffer le moteur (circulation eau chaude)\nVérifier air de démarrage (25-30 bars)",en:"Heat boiler and HFO (if applicable)\nCirculate sea water + fresh water pumps\nCheck oil level and pressure\nPreheat engine (hot water circulation)\nCheck starting air (25-30 bar)",es:"Calentar caldera y HFO (si aplica)\nCircular bombas agua de mar + agua dulce\nVerificar nivel aceite y presión\nPrecalentar motor (circulación agua caliente)\nVerificar aire de arranque (25-30 bar)",pt:"Aquecer caldeira e HFO (se aplicável)\nCircular bombas água do mar + água doce\nVerificar nível óleo e pressão\nPré-aquecer motor (circulação água quente)\nVerificar ar de arranque (25-30 bar)"}},
    { id:"me_start", icon:"🚢", color:C.green,
      label:{fr:"5. Démarrer moteur principal",en:"5. Start main engine",es:"5. Arrancar motor principal",pt:"5. Arrancar motor principal"},
      detail:{fr:"Démarrage à l'air comprimé → passage MDO\nMontée en puissance PROGRESSIVE (running-in)\n20% → 50% → 75% → 100% MCR\nSurveiller TOUS les paramètres\nNotifier la passerelle : propulsion disponible\nConsigner dans le journal machine",en:"Air start → switch to MDO\nPROGRESSIVE power increase (running-in)\n20% → 50% → 75% → 100% MCR\nMonitor ALL parameters\nNotify bridge: propulsion available\nLog in engine log",es:"Arranque por aire → paso a MDO\nAumento PROGRESIVO de potencia (rodaje)\n20% → 50% → 75% → 100% MCR\nVigilar TODOS los parámetros\nNotificar puente: propulsión disponible\nRegistrar en diario de máquinas",pt:"Arranque por ar → mudança para MDO\nAumento PROGRESSIVO de potência (rodagem)\n20% → 50% → 75% → 100% MCR\nVigilar TODOS os parâmetros\nNotificar ponte: propulsão disponível\nRegistar no diário de máquinas"}},
  ];

  const toggleStep = (i) => {
    if (completed.includes(i)) {
      setCompleted(c=>c.filter(x=>x!==i));
    } else {
      setCompleted(c=>[...c,i]);
    }
    setStep(step===i?-1:i);
  };

  const allDone = completed.length === steps.length;

  return (
    <div>
      <div style={{padding:"8px 12px",borderRadius:10,marginBottom:10,
        background:allDone?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.08)",
        border:`1px solid ${allDone?C.green:C.red}33`,fontSize:10,
        color:allDone?C.green:C.red,fontWeight:700,textAlign:"center"}}>
        {allDone
          ?(lang==="fr"?"✅ PROPULSION RÉTABLIE — Notifier la passerelle !":lang==="en"?"✅ PROPULSION RESTORED — Notify bridge!":"✅ PROPULSIÓN RESTABLECIDA — ¡Notificar al puente!")
          :(lang==="fr"?`⚠️ DEAD SHIP — ${completed.length}/${steps.length} étapes`:lang==="en"?`⚠️ DEAD SHIP — ${completed.length}/${steps.length} steps`:`⚠️ DEAD SHIP — ${completed.length}/${steps.length} pasos`)}
      </div>

      {steps.map((s,i)=>(
        <div key={i} style={{marginBottom:8}}>
          <div onClick={()=>toggleStep(i)} style={{
            display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,
            cursor:"pointer",
            background:completed.includes(i)?`${s.color}15`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${completed.includes(i)?s.color:"rgba(255,255,255,0.08)"}`,
          }}>
            <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,
              background:completed.includes(i)?s.color:`${s.color}22`,
              border:`1.5px solid ${s.color}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:13,color:completed.includes(i)?C.white:s.color}}>
              {completed.includes(i)?"✓":s.icon}
            </div>
            <div style={{flex:1,fontSize:11,fontWeight:700,
              color:completed.includes(i)?s.color:C.muted}}>
              {s.label[lang]||s.label.fr}
            </div>
            <span style={{fontSize:10,color:C.muted}}>{step===i?"▲":"▼"}</span>
          </div>
          {step===i&&(
            <div style={{marginTop:4,padding:"8px 12px",borderRadius:10,
              background:"rgba(0,0,0,0.3)",border:`1px solid ${s.color}22`,
              fontSize:10,color:C.white,lineHeight:1.6,whiteSpace:"pre-line",
              animation:"fadeUp 0.3s ease"}}>
              {s.detail[lang]||s.detail.fr}
            </div>
          )}
        </div>
      ))}

      <button onClick={()=>{setCompleted([]);setStep(-1);}} style={{
        width:"100%",marginTop:6,padding:"8px",borderRadius:10,
        background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
        color:C.muted,fontSize:10,cursor:"pointer",
      }}>
        🔄 {lang==="fr"?"Recommencer":"Reset"}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — EMERGENCY SIGNALS
// ══════════════════════════════════════
function EmergencySignalsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const signals = [
    { id:"abandon", icon:"🚢", color:C.red,
      label:{fr:"Abandon du navire",en:"Abandon ship",es:"Abandono del buque",pt:"Abandono do navio"},
      signal:{fr:"7 sons courts + 1 son long\nCorne de brume ou PA system\n'All hands to muster stations'",en:"7 short + 1 long blast\nShip's whistle or PA system\n'All hands to muster stations'",es:"7 cortos + 1 largo\nPito del buque o megafonía\n'All hands to muster stations'",pt:"7 curtos + 1 longo\nApito do navio ou PA\n'All hands to muster stations'"},
      action:{fr:"→ Gilet de sauvetage AVANT de quitter cabine\n→ Poste de rassemblement\n→ Capitaine quitte LE DERNIER",en:"→ Life jacket BEFORE leaving cabin\n→ Muster station\n→ Captain leaves LAST",es:"→ Chaleco ANTES de salir del camarote\n→ Punto de reunión\n→ Capitán abandona EL ÚLTIMO",pt:"→ Colete ANTES de sair do camarote\n→ Posto de reunião\n→ Capitão sai O ÚLTIMO"}},
    { id:"fire", icon:"🔥", color:C.orange,
      label:{fr:"Alarme incendie",en:"Fire alarm",es:"Alarma de incendio",pt:"Alarme de incêndio"},
      signal:{fr:"Signal continu (sifflet ou klaxon)\nOu code spécifique navire\nDifférent de l'abandon",en:"Continuous signal (whistle or horn)\nOr vessel-specific code\nDifferent from abandon ship",es:"Señal continua (silbato o claxon)\nO código específico del buque\nDiferente del abandono",pt:"Sinal contínuo (apito ou buzina)\nOu código específico do navio\nDiferente do abandono"},
      action:{fr:"→ Localiser incendie\n→ Poster sentinelle et combattre\n→ Notifier chef mécanicien + passerelle",en:"→ Locate fire\n→ Post sentinel and fight\n→ Notify chief eng + bridge",es:"→ Localizar incendio\n→ Publicar centinela y combatir\n→ Notificar jefe máq + puente",pt:"→ Localizar incêndio\n→ Postar sentinela e combater\n→ Notificar chefe máq + ponte"}},
    { id:"mayday", icon:"📡", color:C.purple,
      label:{fr:"MAYDAY",en:"MAYDAY",es:"MAYDAY",pt:"MAYDAY"},
      signal:{fr:"MAYDAY MAYDAY MAYDAY\n+ Nom navire × 3\n+ Position GPS\n+ Nature détresse\n+ Personnes à bord\n→ Canal 16 VHF + DSC Canal 70",en:"MAYDAY MAYDAY MAYDAY\n+ Vessel name × 3\n+ GPS position\n+ Nature of distress\n+ Persons on board\n→ VHF Channel 16 + DSC Channel 70",es:"MAYDAY MAYDAY MAYDAY\n+ Nombre buque × 3\n+ Posición GPS\n+ Naturaleza socorro\n+ Personas a bordo\n→ Canal 16 VHF + DSC Canal 70",pt:"MAYDAY MAYDAY MAYDAY\n+ Nome navio × 3\n+ Posição GPS\n+ Natureza socorro\n+ Pessoas a bordo\n→ Canal 16 VHF + DSC Canal 70"},
      action:{fr:"→ Donné par le capitaine\n→ Réponse obligatoire tous navires\n→ EPIRB activé simultanément",en:"→ Given by captain\n→ Mandatory response all vessels\n→ EPIRB activated simultaneously",es:"→ Dado por el capitán\n→ Respuesta obligatoria todos buques\n→ EPIRB activado simultáneamente",pt:"→ Dado pelo capitão\n→ Resposta obrigatória todos navios\n→ EPIRB ativado simultaneamente"}},
    { id:"pan", icon:"📻", color:C.gold2,
      label:{fr:"PAN PAN",en:"PAN PAN",es:"PAN PAN",pt:"PAN PAN"},
      signal:{fr:"PAN PAN PAN PAN PAN PAN\nUrgence (moins grave que MAYDAY)\nPersonne blessée, problème technique\nCanal 16 VHF",en:"PAN PAN PAN PAN PAN PAN\nUrgency (less serious than MAYDAY)\nInjured person, technical problem\nVHF Channel 16",es:"PAN PAN PAN PAN PAN PAN\nUrgencia (menos grave que MAYDAY)\nPersona lesionada, problema técnico\nCanal 16 VHF",pt:"PAN PAN PAN PAN PAN PAN\nUrgência (menos grave que MAYDAY)\nPessoa ferida, problema técnico\nCanal 16 VHF"},
      action:{fr:"→ Blessé grave ou homme à la mer\n→ Panne sérieuse non menaçante\n→ Peut devenir MAYDAY",en:"→ Serious injury or man overboard\n→ Serious but non-threatening fault\n→ May escalate to MAYDAY",es:"→ Lesionado grave o hombre al agua\n→ Avería grave pero no amenazante\n→ Puede convertirse en MAYDAY",pt:"→ Ferido grave ou homem ao mar\n→ Avaria grave mas não ameaçadora\n→ Pode escalar para MAYDAY"}},
    { id:"securite", icon:"⚠️", color:C.teal,
      label:{fr:"SÉCURITÉ",en:"SÉCURITÉ",es:"SÉCURITÉ",pt:"SÉCURITÉ"},
      signal:{fr:"SÉCURITÉ SÉCURITÉ SÉCURITÉ\nInformation de sécurité nautique\nAvis aux navigateurs, danger\nCanal 16 VHF puis 6, 8, 72...",en:"SÉCURITÉ SÉCURITÉ SÉCURITÉ\nNautical safety information\nNavigational warning, hazard\nVHF Channel 16 then 6, 8, 72...",es:"SÉCURITÉ SÉCURITÉ SÉCURITÉ\nInformación de seguridad náutica\nAviso a navegantes, peligro\nCanal 16 VHF luego 6, 8, 72...",pt:"SÉCURITÉ SÉCURITÉ SÉCURITÉ\nInformação de segurança náutica\nAviso aos navegantes, perigo\nCanal 16 VHF depois 6, 8, 72..."},
      action:{fr:"→ Le moins urgent des 3\n→ Annonce météo danger\n→ Débris en mer, bouée dérivante",en:"→ Least urgent of the 3\n→ Danger weather announcement\n→ Debris at sea, drifting buoy",es:"→ El menos urgente de los 3\n→ Anuncio meteorológico peligroso\n→ Escombros en el mar, boya a la deriva",pt:"→ O menos urgente dos 3\n→ Anúncio meteorológico perigoso\n→ Destroços no mar, boia à deriva"}},
  ];

  const sel_ = sel ? signals.find(s=>s.id===sel) : null;

  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
        {signals.map(s=>(
          <button key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{
            flex:"1 1 28%",padding:"8px 4px",borderRadius:10,cursor:"pointer",textAlign:"center",
            background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`,
          }}>
            <div style={{fontSize:18,marginBottom:2}}>{s.icon}</div>
            <div style={{fontSize:9,color:sel===s.id?s.color:C.muted,fontWeight:700}}>
              {s.label[lang]||s.label.fr}
            </div>
          </button>
        ))}
      </div>
      {sel_?(
        <div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <div style={{fontSize:9,color:sel_.color,fontWeight:700,marginBottom:4}}>
                {lang==="fr"?"SIGNAL:":lang==="en"?"SIGNAL:":"SEÑAL:"}
              </div>
              <div style={{fontSize:10,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
                {sel_.signal[lang]||sel_.signal.fr}
              </div>
            </div>
            <div>
              <div style={{fontSize:9,color:C.green,fontWeight:700,marginBottom:4}}>
                {lang==="fr"?"ACTION:":lang==="en"?"ACTION:":"ACCIÓN:"}
              </div>
              <div style={{fontSize:10,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
                {sel_.action[lang]||sel_.action.fr}
              </div>
            </div>
          </div>
        </div>
      ):(
        <div style={{textAlign:"center",padding:"12px",fontSize:11,color:C.muted}}>
          {lang==="fr"?"Touche un signal pour les détails":lang==="en"?"Tap a signal for details":"Toca una señal para detalles"}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — MUSTER LIST SIMULATOR
// ══════════════════════════════════════
function MusterListSVG({ lang }) {
  const [alarm, setAlarm] = useState(false);
  const [mustered, setMustered] = useState([]);

  const crew = [
    { id:"ce", role:{fr:"Chef mécanicien",en:"Chief engineer",es:"Jefe máquinas",pt:"Chefe máquinas"}, post:{fr:"Salle machines",en:"Engine room",es:"Sala máquinas",pt:"Sala máquinas"}, icon:"👨‍🔧" },
    { id:"2e", role:{fr:"2ème mécanicien",en:"2nd engineer",es:"2° maquinista",pt:"2° maquinista"}, post:{fr:"Canot tribord",en:"Starboard lifeboat",es:"Bote estribor",pt:"Bote estibordo"}, icon:"👷" },
    { id:"3e", role:{fr:"3ème mécanicien",en:"3rd engineer",es:"3° maquinista",pt:"3° maquinista"}, post:{fr:"Canot bâbord",en:"Port lifeboat",es:"Bote babor",pt:"Bote bombordo"}, icon:"👷" },
    { id:"elec", role:{fr:"Électricien",en:"Electrician",es:"Electricista",pt:"Eletricista"}, post:{fr:"Groupe de secours",en:"Emergency gen",es:"Grupo emergencia",pt:"Grupo emergência"}, icon:"⚡" },
    { id:"eng", role:{fr:"Graisseur",en:"Oiler",es:"Engrasador",pt:"Lubrificador"}, post:{fr:"Poste incendie #2",en:"Fire station #2",es:"Puesto incendio #2",pt:"Posto incêndio #2"}, icon:"🔧" },
  ];

  const toggleMuster = (id) => {
    setMustered(m=>m.includes(id)?m.filter(x=>x!==id):[...m,id]);
  };

  const allMustered = mustered.length === crew.length;

  return (
    <div>
      <button onClick={()=>{setAlarm(v=>!v);setMustered([]);}} style={{
        width:"100%",padding:"10px",borderRadius:12,marginBottom:10,fontSize:11,
        fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif",
        background:alarm?"rgba(192,57,43,0.2)":"rgba(201,146,42,0.15)",
        border:`1.5px solid ${alarm?C.red:C.gold}`,
        color:alarm?C.red:C.gold2,
      }}>
        {alarm
          ?(lang==="fr"?"⚡ ALARME ACTIVE — Pointer les présents":lang==="en"?"⚡ ALARM ACTIVE — Mark present":"⚡ ALARMA ACTIVA — Marcar presentes")
          :(lang==="fr"?"🚨 DÉCLENCHER ALARME GÉNÉRALE":lang==="en"?"🚨 TRIGGER GENERAL ALARM":"🚨 ACTIVAR ALARMA GENERAL")}
      </button>

      {alarm && (
        <>
          <div style={{marginBottom:8,padding:"6px 10px",borderRadius:8,
            background:allMustered?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.08)",
            border:`1px solid ${allMustered?C.green:C.red}33`,fontSize:10,
            color:allMustered?C.green:C.red,fontWeight:700,textAlign:"center"}}>
            {allMustered
              ?(lang==="fr"?"✅ TOUT L'ÉQUIPAGE MACHINE COMPTÉ":lang==="en"?"✅ ALL ENGINE CREW ACCOUNTED FOR":"✅ TODA LA TRIPULACIÓN DE MÁQUINAS CONTADA")
              :(lang==="fr"?`⚠️ ${mustered.length}/${crew.length} présents — ${crew.length-mustered.length} manquant(s)`:lang==="en"?`⚠️ ${mustered.length}/${crew.length} present — ${crew.length-mustered.length} missing`:`⚠️ ${mustered.length}/${crew.length} presentes — ${crew.length-mustered.length} ausente(s)`)}
          </div>

          {crew.map(c=>(
            <div key={c.id} onClick={()=>toggleMuster(c.id)}
              style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",
                borderRadius:10,marginBottom:6,cursor:"pointer",
                background:mustered.includes(c.id)?"rgba(30,138,74,0.12)":"rgba(255,255,255,0.04)",
                border:`1px solid ${mustered.includes(c.id)?C.green:"rgba(255,255,255,0.08)"}`}}>
              <span style={{fontSize:20}}>{c.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:11,fontWeight:700,color:mustered.includes(c.id)?C.green:C.white}}>
                  {c.role[lang]||c.role.fr}
                </div>
                <div style={{fontSize:9,color:C.muted}}>{c.post[lang]||c.post.fr}</div>
              </div>
              <div style={{width:24,height:24,borderRadius:"50%",
                background:mustered.includes(c.id)?C.green:"rgba(255,255,255,0.1)",
                border:`1.5px solid ${mustered.includes(c.id)?C.green:"rgba(255,255,255,0.2)"}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:12,color:C.white}}>
                {mustered.includes(c.id)?"✓":""}
              </div>
            </div>
          ))}

          {allMustered && (
            <div style={{marginTop:8,padding:"10px",borderRadius:10,
              background:"rgba(192,57,43,0.08)",border:`1px solid ${C.red}33`,
              fontSize:10,color:C.red,fontWeight:700,textAlign:"center"}}>
              ⚠️ {lang==="fr"?"NE DÉCLENCHER LE CO2 QU'AVEC TOUT LE MONDE COMPTÉ":lang==="en"?"ONLY ACTIVATE CO2 WHEN ALL CREW ACCOUNTED FOR":"SOLO ACTIVAR CO2 CON TODA LA TRIPULACIÓN CONTADA"}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"MV Conception — Californie, USA (2019)",teaser:"Plongée · Incendie nocturne · 34 morts · Équipage endormi · Procédures non respectées",what:"Le bateau de plongée Conception prend feu la nuit au large de la Californie. 34 passagers dorment à bord. L'équipage de quart s'endort. Quand le feu est découvert, il est trop tard pour évacuer les passagers. Seuls les membres d'équipage en pont survivent.",cause:"• Équipage de quart (1 personne) endormi à son poste\n• Absence de ronde nocturne obligatoire\n• Système sprinkler absent (non obligatoire pour ce type de navire)\n• Issue de secours insuffisante depuis les cabines\n• Détecteur incendie défaillant ou insuffisant\n• Formation insuffisante procédures urgence nocturne",lessons:"✓ Ronde incendie OBLIGATOIRE toutes les heures la nuit\n✓ Jamais s'endormir au poste de quart\n✓ Sprinklers = essentiel même si non obligatoire\n✓ Issues de secours multiples dans toutes les cabines\n✓ Formation procédures nocturnes obligatoire\n✓ Résultat : nouvelles règles USCG · sprinklers obligatoires retro",link:"🔗 Lien L8 Urgences : La procédure de quart la plus simple — rester éveillé et faire ses rondes — aurait sauvé 34 vies. Les procédures d'urgence ne servent à rien si personne ne les déclenche à temps."},
    en:{title:"MV Conception — California, USA (2019)",teaser:"Dive boat · Nighttime fire · 34 deaths · Sleeping crew · Procedures not followed",what:"The dive boat Conception catches fire at night off California. 34 passengers are sleeping aboard. The watch crew falls asleep. When the fire is discovered, it's too late to evacuate passengers. Only crew members on deck survive.",cause:"• Watch crew (1 person) asleep at post\n• No mandatory nighttime patrol conducted\n• No sprinkler system (not required for this vessel type)\n• Insufficient emergency exits from cabins\n• Faulty or insufficient fire detector\n• Insufficient training for nighttime emergency procedures",lessons:"✓ Fire patrol MANDATORY every hour at night\n✓ Never sleep at watch station\n✓ Sprinklers = essential even if not mandatory\n✓ Multiple emergency exits in all cabins\n✓ Nighttime emergency procedure training mandatory\n✓ Result: new USCG rules · mandatory retro sprinklers",link:"🔗 L8 Emergency Link: The simplest watch procedure — stay awake and do rounds — would have saved 34 lives. Emergency procedures are useless if no one triggers them in time."},
    es:{title:"MV Conception — California, EE.UU. (2019)",teaser:"Barco de buceo · Incendio nocturno · 34 muertos · Tripulación dormida · Procedimientos no respetados",what:"El barco de buceo Conception se incendia de noche frente a California. 34 pasajeros duermen a bordo. La guardia se duerme. Cuando se descubre el incendio, es demasiado tarde para evacuar a los pasajeros.",cause:"• Guardia (1 persona) dormida en su puesto\n• Sin ronda nocturna obligatoria realizada\n• Sin sistema de sprinklers\n• Salidas de emergencia insuficientes desde los camarotes\n• Formación insuficiente en procedimientos de emergencia nocturnos",lessons:"✓ Ronda contraincendios OBLIGATORIA cada hora por la noche\n✓ Nunca dormirse en el puesto de guardia\n✓ Sprinklers = esenciales aunque no sean obligatorios\n✓ Múltiples salidas de emergencia en todos los camarotes\n✓ Resultado: nuevas reglas USCG · sprinklers obligatorios retro",link:"🔗 Vínculo L8: El procedimiento de guardia más simple — mantenerse despierto y hacer rondas — habría salvado 34 vidas."},
    pt:{title:"MV Conception — Califórnia, EUA (2019)",teaser:"Barco de mergulho · Incêndio noturno · 34 mortos · Tripulação adormecida · Procedimentos não respeitados",what:"O barco de mergulho Conception incendeia-se de noite ao largo da Califórnia. 34 passageiros dormem a bordo. A guarda adormece. Quando o incêndio é descoberto, é tarde demais para evacuar os passageiros.",cause:"• Guarda (1 pessoa) adormecida no posto\n• Sem ronda noturna obrigatória realizada\n• Sem sistema de sprinklers\n• Saídas de emergência insuficientes nos camarotes\n• Formação insuficiente em procedimentos de emergência noturnos",lessons:"✓ Ronda de incêndio OBRIGATÓRIA a cada hora à noite\n✓ Nunca adormecer no posto de quarto\n✓ Sprinklers = essenciais mesmo que não obrigatórios\n✓ Múltiplas saídas de emergência em todos os camarotes\n✓ Resultado: novas regras USCG · sprinklers obrigatórios retro",link:"🔗 Vínculo L8: O procedimento de quarto mais simples — manter-se acordado e fazer rondas — teria salvado 34 vidas."},
  };
  const c=d[lang]||d.fr;
  return(
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
      {id:"q1",q:"Alarme abandon du navire : combien de sons courts + 1 long ?\n(Répondre : le chiffre uniquement)",correct:"7"},
      {id:"q2",q:"Avant de déclencher le CO2 fixe, quelle est l'action ABSOLUMENT CRITIQUE ?\n(Répondre : 3 mots max)",correct:"compter équipage"},
      {id:"q3",q:"Procédure 'dead ship' : quelle est la PREMIÈRE étape ?\n(Répondre : groupe de secours ou moteur principal)",correct:"groupe de secours"},
    ],
    en:[
      {id:"q1",q:"Abandon ship alarm: how many short blasts + 1 long?\n(Answer: the number only)",correct:"7"},
      {id:"q2",q:"Before activating fixed CO2, what is the ABSOLUTELY CRITICAL action?\n(Answer: max 3 words)",correct:"count crew"},
      {id:"q3",q:"Dead ship procedure: what is the FIRST step?\n(Answer: emergency generator or main engine)",correct:"emergency generator"},
    ],
    es:[
      {id:"q1",q:"Alarma abandono buque: ¿cuántos pitidos cortos + 1 largo?\n(Responder: solo el número)",correct:"7"},
      {id:"q2",q:"Antes de activar el CO2 fijo, ¿cuál es la acción ABSOLUTAMENTE CRÍTICA?\n(Responder: máx 3 palabras)",correct:"contar tripulación"},
      {id:"q3",q:"Procedimiento 'dead ship': ¿cuál es el PRIMER paso?\n(Responder: grupo emergencia o motor principal)",correct:"grupo emergencia"},
    ],
    pt:[
      {id:"q1",q:"Alarme abandono navio: quantos toques curtos + 1 longo?\n(Responder: apenas o número)",correct:"7"},
      {id:"q2",q:"Antes de ativar o CO2 fixo, qual é a ação ABSOLUTAMENTE CRÍTICA?\n(Responder: máx 3 palavras)",correct:"contar tripulação"},
      {id:"q3",q:"Procedimento 'dead ship': qual é o PRIMEIRO passo?\n(Responder: grupo emergência ou motor principal)",correct:"grupo emergência"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    const c=q.correct.toLowerCase();
    return v===c||v.includes(c.split(" ")[0]);
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.red}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Abandon = 7+1 · CO2 = compter équipage d'abord · Dead ship = groupe secours en 1er"
        :lang==="en"?"💡 Reminders: Abandon = 7+1 · CO2 = count crew first · Dead ship = emergency gen first"
        :lang==="es"?"💡 Recordatorios: Abandono = 7+1 · CO2 = contar tripulación primero · Dead ship = grupo emergencia primero"
        :"💡 Lembretes: Abandono = 7+1 · CO2 = contar tripulação primeiro · Dead ship = grupo emergência primeiro"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:16,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: 7 (7 sons courts + 1 son long = SOLAS abandon)\n✅ Q2: Compter l'équipage (CO2 = mortel → vérification 100% avant déclenchement)\n✅ Q3: Groupe de secours (dead ship : groupe secours → MSB → génératrice auxiliaire → moteur principal)"
        :lang==="en"?"✅ Q1: 7 (7 short + 1 long = SOLAS abandon)\n✅ Q2: Count crew (CO2 = lethal → 100% check before activation)\n✅ Q3: Emergency generator (dead ship: emergency gen → MSB → aux gen → main engine)"
        :"✅ Q1: 7 · Q2: Contar tripulación · Q3: Grupo emergencia"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}


const QUIZ = {
  fr:[
    {q:"Quelle est la première chose à faire en cas de blackout total en salle des machines ?",opts:["Appeler le capitaine","Le groupe de secours doit démarrer automatiquement en moins de 30 secondes (SOLAS)","Attendre que l'électricité revienne","Évacuer la salle des machines"],correct:1,expl:"Blackout total : le groupe électrogène de secours doit démarrer AUTOMATIQUEMENT en moins de 30 secondes (SOLAS). S'il ne démarre pas automatiquement, démarrage MANUEL immédiat. Priorité rétablissement : alarmes/sécurité → navigation → communication → pompes incendie → propulsion. L'UPS maintient les alarmes pendant 30 minutes."},
    {q:"Procédure dead ship — dans quel ordre démarrer les équipements ?",opts:["Moteur principal → génératrice auxiliaire → groupe secours","Groupe de secours → MSB → génératrice auxiliaire → moteur principal","Génératrice auxiliaire → groupe secours → moteur principal","MSB → groupe secours → moteur principal"],correct:1,expl:"Ordre OBLIGATOIRE dead ship recovery : 1) Groupe de secours (donne courant de base), 2) Rétablir MSB (tableau principal), 3) Démarrer génératrice auxiliaire (plus puissante), 4) Préparer et démarrer moteur principal. Ne JAMAIS sauter une étape. L'air de démarrage doit être disponible (25-30 bars)."},
    {q:"En cas d'incendie en salle des machines, avant de déclencher le CO2 fixe :",opts:["Déclencher immédiatement sans attendre","Compter TOUT l'équipage et s'assurer que personne n'est dans la salle des machines","Éteindre d'abord avec des extincteurs portables","Attendre l'ordre du capitaine uniquement"],correct:1,expl:"CRITIQUE : avant CO2 fixe → compter 100% de l'équipage. Le CO2 = MORTEL pour toute personne dans la salle des machines. Procédure : 1) Alarme incendie + évacuation, 2) Compter TOUT l'équipage, 3) Fermer ventilations + vannes carburant + couper moteur, 4) Déclencher CO2, 5) Attendre 30 minutes minimum."},
    {q:"Que signifie le signal sonore 7 sons courts + 1 son long ?",opts:["Alarme incendie","Signal de brume","Alarme générale d'abandon du navire (SOLAS)","Alarme technique en salle des machines"],correct:2,expl:"7 sons courts + 1 son long = alarme générale d'abandon du navire (SOLAS). Signifie : 'Tout le monde au poste de rassemblement avec gilet de sauvetage'. À distinguer : alarme incendie (signal continu), signal brume (1 long toutes les 2 minutes). L'officier de quart machine doit connaître parfaitement tous les signaux d'alarme."},
    {q:"Lors d'une voie d'eau en salle des machines, quelle est la priorité absolue après l'alarme ?",opts:["Réparer immédiatement la voie d'eau","Fermer les cloisons étanches ET démarrer les pompes de cale SIMULTANÉMENT","Évacuer la salle des machines","Couper le moteur principal"],correct:1,expl:"Voie d'eau : 1) Alarme générale, 2) Fermer cloisons étanches (empêcher propagation), 3) Démarrer pompes de cale (évacuer l'eau), 4) Localiser et évaluer la voie d'eau, 5) Notifier passerelle + chef mécanicien, 6) Si incontrôlable → abandon. NE JAMAIS sous-estimer une voie d'eau — le Titanic a coulé en 2h40."},
  ],
  en:[
    {q:"What is the first thing to do in case of total blackout in the engine room?",opts:["Call the captain","Emergency generator must start automatically within 30 seconds (SOLAS)","Wait for power to return","Evacuate the engine room"],correct:1,expl:"Total blackout: emergency generator must start AUTOMATICALLY within 30 seconds (SOLAS). If it doesn't start automatically: immediate MANUAL start. Restoration priority: alarms/safety → navigation → communications → fire pumps → propulsion. UPS maintains alarms for 30 minutes."},
    {q:"Dead ship procedure — in what order to start equipment?",opts:["Main engine → auxiliary generator → emergency gen","Emergency gen → MSB → auxiliary generator → main engine","Auxiliary gen → emergency gen → main engine","MSB → emergency gen → main engine"],correct:1,expl:"MANDATORY dead ship recovery order: 1) Emergency generator (provides basic power), 2) Restore MSB (main switchboard), 3) Start auxiliary generator (more powerful), 4) Prepare and start main engine. NEVER skip a step. Starting air must be available (25-30 bar)."},
    {q:"In case of engine room fire, before activating fixed CO2:",opts:["Activate immediately without waiting","Count ALL crew and ensure no one is in the engine room","First fight with portable extinguishers","Wait for captain's order only"],correct:1,expl:"CRITICAL: before fixed CO2 → count 100% of crew. CO2 = LETHAL for anyone in the engine room. Procedure: 1) Fire alarm + evacuation, 2) Count ALL crew, 3) Close ventilation + fuel valves + stop engine, 4) Activate CO2, 5) Wait minimum 30 minutes."},
    {q:"What does the sound signal 7 short + 1 long blast mean?",opts:["Fire alarm","Fog signal","General abandon ship alarm (SOLAS)","Engine room technical alarm"],correct:2,expl:"7 short + 1 long = general abandon ship alarm (SOLAS). Means: 'All hands to muster stations with life jackets'. Distinguish: fire alarm (continuous signal), fog signal (1 long every 2 minutes). Engine watch officer must know all alarm signals perfectly."},
    {q:"During flooding in the engine room, what is the absolute priority after the alarm?",opts:["Immediately repair the flooding","Close watertight bulkheads AND start bilge pumps SIMULTANEOUSLY","Evacuate the engine room","Stop the main engine"],correct:1,expl:"Flooding: 1) General alarm, 2) Close watertight bulkheads (prevent spread), 3) Start bilge pumps (evacuate water), 4) Locate and assess flooding, 5) Notify bridge + chief engineer, 6) If uncontrollable → abandon. NEVER underestimate flooding — Titanic sank in 2h40."},
  ],
  es:[
    {q:"¿Qué es lo primero que hay que hacer en caso de blackout total en la sala de máquinas?",opts:["Llamar al capitán","El grupo de emergencia debe arrancar automáticamente en menos de 30 segundos (SOLAS)","Esperar a que vuelva la electricidad","Evacuar la sala de máquinas"],correct:1,expl:"Blackout total: el grupo electrógeno de emergencia debe arrancar AUTOMÁTICAMENTE en menos de 30 segundos (SOLAS). Si no arranca automáticamente: arranque MANUAL inmediato. Prioridad restablecimiento: alarmas/seguridad → navegación → comunicaciones → bombas contraincendios → propulsión."},
    {q:"Procedimiento dead ship — ¿en qué orden arrancar los equipos?",opts:["Motor principal → generador auxiliar → grupo emergencia","Grupo emergencia → MSB → generador auxiliar → motor principal","Generador auxiliar → grupo emergencia → motor principal","MSB → grupo emergencia → motor principal"],correct:1,expl:"Orden OBLIGATORIO dead ship recovery: 1) Grupo de emergencia, 2) Restablecer MSB, 3) Arrancar generador auxiliar, 4) Preparar y arrancar motor principal. NUNCA saltarse un paso. El aire de arranque debe estar disponible (25-30 bar)."},
    {q:"En caso de incendio en sala de máquinas, antes de activar el CO2 fijo:",opts:["Activar inmediatamente sin esperar","Contar TODA la tripulación y asegurarse de que nadie está en la sala de máquinas","Primero combatir con extintores portátiles","Esperar solo la orden del capitán"],correct:1,expl:"CRÍTICO: antes del CO2 fijo → contar 100% de la tripulación. El CO2 = MORTAL para cualquier persona en la sala de máquinas. Procedimiento: 1) Alarma incendio + evacuación, 2) Contar TODA la tripulación, 3) Cerrar ventilaciones + válvulas combustible + parar motor, 4) Activar CO2, 5) Esperar 30 minutos mínimo."},
    {q:"¿Qué significa la señal sonora de 7 pitidos cortos + 1 pitido largo?",opts:["Alarma de incendio","Señal de niebla","Alarma general de abandono del buque (SOLAS)","Alarma técnica en sala de máquinas"],correct:2,expl:"7 cortos + 1 largo = alarma general de abandono del buque (SOLAS). Significa: 'Todo el mundo a los puntos de reunión con chaleco salvavidas'. Distinguir: alarma incendio (señal continua), señal niebla (1 largo cada 2 minutos)."},
    {q:"Durante una vía de agua en la sala de máquinas, ¿cuál es la prioridad absoluta tras la alarma?",opts:["Reparar inmediatamente la vía de agua","Cerrar los mamparos estancos Y arrancar las bombas de sentina SIMULTÁNEAMENTE","Evacuar la sala de máquinas","Parar el motor principal"],correct:1,expl:"Vía de agua: 1) Alarma general, 2) Cerrar mamparos estancos, 3) Arrancar bombas de sentina, 4) Localizar y evaluar la vía de agua, 5) Notificar puente + jefe de máquinas, 6) Si incontrolable → abandono."},
  ],
  pt:[
    {q:"O que é a primeira coisa a fazer em caso de blackout total na sala de máquinas?",opts:["Ligar ao capitão","O grupo de emergência deve arrancar automaticamente em menos de 30 segundos (SOLAS)","Esperar que a eletricidade volte","Evacuar a sala de máquinas"],correct:1,expl:"Blackout total: o grupo eletrogéneo de emergência deve arrancar AUTOMATICAMENTE em menos de 30 segundos (SOLAS). Se não arrancar automaticamente: arranque MANUAL imediato. Prioridade de restabelecimento: alarmes/segurança → navegação → comunicações → bombas incêndio → propulsão."},
    {q:"Procedimento dead ship — em que ordem arrancar os equipamentos?",opts:["Motor principal → gerador auxiliar → grupo emergência","Grupo emergência → MSB → gerador auxiliar → motor principal","Gerador auxiliar → grupo emergência → motor principal","MSB → grupo emergência → motor principal"],correct:1,expl:"Ordem OBRIGATÓRIA dead ship recovery: 1) Grupo de emergência, 2) Restabelecer MSB, 3) Arrancar gerador auxiliar, 4) Preparar e arrancar motor principal. NUNCA saltar um passo. O ar de arranque deve estar disponível (25-30 bar)."},
    {q:"Em caso de incêndio na sala de máquinas, antes de ativar o CO2 fixo:",opts:["Ativar imediatamente sem esperar","Contar TODA a tripulação e garantir que ninguém está na sala de máquinas","Primeiro combater com extintores portáteis","Aguardar apenas a ordem do capitão"],correct:1,expl:"CRÍTICO: antes do CO2 fixo → contar 100% da tripulação. O CO2 = FATAL para qualquer pessoa na sala de máquinas. Procedimento: 1) Alarme incêndio + evacuação, 2) Contar TODA a tripulação, 3) Fechar ventilações + válvulas combustível + parar motor, 4) Ativar CO2, 5) Aguardar 30 minutos mínimo."},
    {q:"O que significa o sinal sonoro de 7 toques curtos + 1 toque longo?",opts:["Alarme de incêndio","Sinal de nevoeiro","Alarme geral de abandono do navio (SOLAS)","Alarme técnico na sala de máquinas"],correct:2,expl:"7 curtos + 1 longo = alarme geral de abandono do navio (SOLAS). Significa: 'Toda a gente aos postos de reunião com colete salva-vidas'. Distinguir: alarme incêndio (sinal contínuo), sinal nevoeiro (1 longo a cada 2 minutos)."},
    {q:"Durante uma via de água na sala de máquinas, qual é a prioridade absoluta após o alarme?",opts:["Reparar imediatamente a via de água","Fechar as anteparas estanques E arrancar as bombas de porão SIMULTANEAMENTE","Evacuar a sala de máquinas","Parar o motor principal"],correct:1,expl:"Via de água: 1) Alarme geral, 2) Fechar anteparas estanques, 3) Arrancar bombas de porão, 4) Localizar e avaliar a via de água, 5) Notificar ponte + chefe de máquinas, 6) Se incontrolável → abandono."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que le 'load shedding' lors d'un blackout ?",opts:["Une panne totale","Délestage progressif des charges électriques non essentielles pour ne pas surcharger le groupe de secours","Un type de relais électrique","Une procédure de maintenance"],correct:1,expl:"Load shedding = délestage = déconnexion automatique ou manuelle des circuits non essentiels lors d'un blackout. Priorité conservée : alarmes, navigation, radio, pompes incendie. Déconnectés : climatisation, éclairage non essentiel, cuisine, laverie. Permet au groupe de secours (capacité limitée) de fonctionner sans surcharge."},
    {q:"Qu'est-ce que l'UPS (Uninterruptible Power Supply) à bord ?",opts:["Un groupe de secours diesel","Alimentation sans interruption sur batteries — maintient les systèmes critiques (alarmes, GMDSS) pendant 30 minutes lors d'un blackout","Un type de disjoncteur","Un système de démarrage automatique"],correct:1,expl:"UPS = alimentation sans interruption. Batteries qui maintiennent automatiquement les systèmes critiques lors d'un blackout : alarmes machine, GMDSS, navigation, lumières de secours. Autonomie : 30 minutes minimum (SOLAS). Pendant ce temps → démarrage groupe de secours. Test mensuel obligatoire."},
    {q:"Qu'est-ce que la procédure 'abandon ship drill' pour les mécaniciens ?",opts:["Une formation théorique uniquement","Exercice mensuel : alarme → poste de rassemblement → vérification équipements → mise à l'eau embarcations","Une inspection annuelle","Un test des alarmes uniquement"],correct:1,expl:"Abandon ship drill (SOLAS) : mensuel minimum. Pour les mécaniciens : 1) Arrêter machines si ordonné, 2) Gilet de sauvetage, 3) Poste de rassemblement, 4) Rôle d'appel selon muster list, 5) Participation mise à l'eau embarcations. Le chef mécanicien est souvent responsable du groupe de secours (emergency group)."},
    {q:"Qu'est-ce que le 'emergency stop' (arrêt d'urgence) du moteur principal ?",opts:["L'arrêt normal planifié","Arrêt immédiat du moteur en cas d'urgence grave — actionnable depuis la salle des machines ET depuis la passerelle","Un arrêt programmé","Un test de sécurité"],correct:1,expl:"Emergency stop = arrêt d'urgence moteur principal. Déclenché par : pression huile critique, température eau critique, survitesse (overspeed). Actionnable depuis : pupitre salle des machines, passerelle (telegraph STOP). Après emergency stop : NE PAS redémarrer sans inspection complète. Consigner dans journal machine."},
    {q:"Qu'est-ce que l'ISM (International Safety Management) Code pour les procédures d'urgence ?",opts:["Un code de navigation","Code obligatoire exigeant que chaque navire ait un SMS avec des procédures d'urgence écrites, testées et documentées","Un code de formation","Un code de certification"],correct:1,expl:"ISM Code = obligatoire (SOLAS Chapitre IX). Exige un SMS (Safety Management System) comprenant : procédures d'urgence écrites pour toutes les situations prévisibles, exercices réguliers, analyse des incidents et quasi-accidents, amélioration continue. L'auditeur ISM vérifie que les procédures sont connues ET pratiquées."},
    {q:"Que faire si un membre d'équipage est blessé en salle des machines ?",opts:["L'évacuer immédiatement sans soins","Premiers secours immédiats · Appeler officier médical · Contacter le CIRM (télémédecine) si nécessaire · Signaler au capitaine","Attendre le médecin de port","Continuer le quart normalement"],correct:1,expl:"Blessure en salle des machines : 1) Sécuriser la zone (risque aggravation). 2) Premiers secours immédiats (formation STCW EFA obligatoire). 3) Appeler l'officier médical du bord. 4) Si grave : contacter CIRM ou MRCC (télémédecine maritime). 5) Signaler au capitaine. 6) Rédiger rapport d'accident. 7) Consigner dans journal machine."},
    {q:"Qu'est-ce que la 'contingency plan' (plan de contingence) d'un navire ?",opts:["Un plan de navigation alternatif","Plan d'actions prédéfinies pour les urgences graves : incendie majeur, voie d'eau, échouage, collision, pollution","Un plan de maintenance alternatif","Un plan de chargement"],correct:1,expl:"Contingency plan = plan de contingence. Prévu par l'ISM Code. Décrit les réponses pour les urgences graves spécifiques. Inclut : organigramme des responsabilités, ressources disponibles, contacts d'urgence (MRCC, armateur, assureur), procédures de communication. Testé lors des exercices. Disponible en salle des machines ET sur la passerelle."},
    {q:"Qu'est-ce que le 'overspeed trip' (protection survitesse) ?",opts:["Un régulateur de vitesse normal","Dispositif de sécurité qui arrête automatiquement le moteur si la vitesse dépasse la limite maximum — évite la destruction mécanique","Un indicateur de vitesse","Un frein moteur"],correct:1,expl:"Overspeed trip = protection survitesse. Si le moteur dépasse sa vitesse maximale (ex : hélice émergée dans forte houle), le trip coupe automatiquement l'injection → arrêt moteur. Seuil : généralement 110-115% de la vitesse nominale. Test annuel obligatoire. Après déclenchement : inspection avant redémarrage."},
    {q:"Qu'est-ce qu'un 'enclosed space entry permit' ?",opts:["Un certificat de navigabilité","Permis d'entrée en espace confiné — obligatoire avant d'entrer dans citernes, cales, espaces CO2 — risque asphyxie","Un permis de travaux en hauteur","Un certificat de maintenance"],correct:1,expl:"Enclosed space entry permit = permis d'entrée en espace confiné. Obligatoire avant : entrée dans citernes, cales, cofferdams, espaces CO2. Mesures : test atmosphère (O2 > 19,5%, pas de gaz toxiques), ventilation préalable, garde extérieure obligatoire, ARA disponible. Responsabilité : officier de quart machine."},
    {q:"Qu'est-ce que le 'hot work permit' (permis de travaux à chaud) ?",opts:["Un permis de travail en zone chaude","Autorisation obligatoire avant soudure, découpe, meulage — zones de carburant, espaces confinés — risque incendie/explosion","Un certificat de soudeur","Un permis de maintenance"],correct:1,expl:"Hot work permit = permis de travaux à chaud (soudure, découpe, meulage). Obligatoire dans les zones : citernes carburant, salles de pompes, espaces confinés. Exige : zone dégazée, extincteur à portée, surveillance pendant et après, permis signé par chef mécanicien ET capitaine. Validité : 24h maximum."},
    {q:"Que faire en cas de déversement accidentel d'huile en mer (pollution) ?",opts:["Ne rien faire si c'est peu","Arrêter la source · Contenir avec absorbants · Notifier immédiatement autorités portuaires + MRCC · Consigner dans ORB","Nettoyer discrètement","Attendre l'arrivée au port"],correct:1,expl:"Déversement huile accidentel : 1) Arrêter la source immédiatement. 2) Contenir avec absorbants maritimes. 3) Notifier IMMÉDIATEMENT capitaine + autorités compétentes (MRCC, port). 4) Enregistrer dans l'ORB (Oil Record Book). 5) Rédiger rapport d'incident. Même involontaire = infraction MARPOL si non signalé. Coopération = circonstance atténuante."},
    {q:"Qu'est-ce que le 'rescue coordination' lors d'un accident en mer ?",opts:["Une procédure interne au navire","Coordination internationale des opérations SAR par le MRCC compétent — reçoit MAYDAY ou EPIRB et coordonne les secours","Un type de remorquage","Une procédure d'assurance"],correct:1,expl:"Rescue coordination : le MRCC (Maritime Rescue Coordination Centre) reçoit le MAYDAY ou l'alerte EPIRB → identifie tous les navires à proximité → coordonne les opérations SAR. Le navire en détresse doit maintenir le contact radio continu. Autres navires = obligation d'assistance (Convention SOLAS + droit maritime international)."},
    {q:"Qu'est-ce que le 'salvage' (sauvetage maritime) ?",opts:["L'abandon du navire","Opération de sauvetage d'un navire en danger par un tiers — contre rémunération (LOF : Lloyd's Open Form)","Une procédure d'urgence interne","Un type d'assurance"],correct:1,expl:"Salvage = sauvetage maritime par un tiers (remorqueur, navire de sauvetage). Réglementé par la Convention de Sauvetage 1989 et le LOF (Lloyd's Open Form). Rémunération basée sur : valeur sauvée, risques pris, efficacité. Capitaine peut accepter l'assistance de sauvetage. Différent du remorquage contractuel."},
    {q:"Qu'est-ce qu'un 'fire door' (porte coupe-feu) et pourquoi ne jamais la maintenir ouverte ?",opts:["Une porte décorative ignifuge","Porte résistant au feu (classification A/B/C) qui empêche la propagation des flammes et fumées — maintenue ouverte = propagation rapide","Une porte étanche","Une porte de sécurité normale"],correct:1,expl:"Porte coupe-feu = résiste au feu (A-0, A-15, A-30, A-60 selon durée). JAMAIS maintenir ouverte avec cales ou cordages. Scandinavian Star (1990) : portes maintenues ouvertes → propagation feu → 158 morts. Doivent se fermer automatiquement. Contrôle hebdomadaire obligatoire. Déficience → PSC peut retenir le navire."},
    {q:"Qu'est-ce que le 'emergency generator test' mensuel ?",opts:["Un test de démarrage en pleine charge","Démarrage mensuel du groupe de secours · test autonomie 30 min minimum · vérification reprise de charge automatique","Un test de l'UPS uniquement","Un test annuel de classification"],correct:1,expl:"Test mensuel groupe de secours (SOLAS) : 1) Démarrage (auto ou manuel), 2) Vérifier reprise de charge automatique (éclairage secours, alarmes), 3) Test autonomie minimum 30 minutes, 4) Vérifier tension et fréquence (440V/60Hz ou 380V/50Hz), 5) Consigner dans journal bord. Défaillance → signaler immédiatement + planifier réparation."},
  ],
  en:[
    {q:"What is 'load shedding' during a blackout?",opts:["A total failure","Progressive disconnection of non-essential electrical loads to avoid overloading the emergency generator","A type of electrical relay","A maintenance procedure"],correct:1,expl:"Load shedding = disconnection of non-essential circuits during blackout. Priority maintained: alarms, navigation, radio, fire pumps. Disconnected: air conditioning, non-essential lighting, galley, laundry. Allows emergency generator (limited capacity) to operate without overload."},
    {q:"What is UPS (Uninterruptible Power Supply) on board?",opts:["A diesel emergency generator","Battery power supply — maintains critical systems (alarms, GMDSS) for 30 minutes during blackout","A type of circuit breaker","An automatic start system"],correct:1,expl:"UPS = uninterruptible power supply. Batteries that automatically maintain critical systems during blackout: machinery alarms, GMDSS, navigation, emergency lights. Autonomy: minimum 30 minutes (SOLAS). During this time → start emergency generator. Monthly test mandatory."},
    {q:"What is an 'abandon ship drill' for engineers?",opts:["Theory training only","Monthly drill: alarm → muster station → equipment check → boat lowering","Annual inspection","Alarm test only"],correct:1,expl:"Abandon ship drill (SOLAS): monthly minimum. For engineers: 1) Stop machinery if ordered, 2) Life jacket, 3) Muster station, 4) Roll call per muster list, 5) Participate in boat lowering. Chief engineer is often responsible for the emergency group."},
    {q:"What is the main engine 'emergency stop'?",opts:["The normal planned stop","Immediate engine stop in case of serious emergency — operable from engine room AND from bridge","A scheduled stop","A safety test"],correct:1,expl:"Emergency stop = main engine emergency stop. Triggered by: critical oil pressure, critical water temperature, overspeed. Operable from: engine room console, bridge (telegraph STOP). After emergency stop: DO NOT restart without full inspection. Log in engine log."},
    {q:"What does the ISM (International Safety Management) Code require for emergency procedures?",opts:["A navigation code","Mandatory code requiring each vessel to have an SMS with written, tested and documented emergency procedures","A training code","A certification code"],correct:1,expl:"ISM Code = mandatory (SOLAS Chapter IX). Requires an SMS (Safety Management System) including: written emergency procedures for all foreseeable situations, regular drills, incident and near-miss analysis, continuous improvement. ISM auditor checks that procedures are known AND practiced."},
    {q:"What to do if a crew member is injured in the engine room?",opts:["Evacuate immediately without treatment","Immediate first aid · Call medical officer · Contact CIRM (telemedicine) if needed · Report to captain","Wait for port doctor","Continue watch normally"],correct:1,expl:"Engine room injury: 1) Secure area (prevent further injury). 2) Immediate first aid (mandatory STCW EFA training). 3) Call ship's medical officer. 4) If serious: contact CIRM or MRCC (maritime telemedicine). 5) Report to captain. 6) Write accident report. 7) Log in engine log."},
    {q:"What is a vessel 'contingency plan'?",opts:["An alternative navigation plan","Predefined action plan for serious emergencies: major fire, flooding, grounding, collision, pollution","An alternative maintenance plan","A loading plan"],correct:1,expl:"Contingency plan = required by ISM Code. Describes responses for specific serious emergencies. Includes: responsibility org chart, available resources, emergency contacts (MRCC, shipowner, insurer), communication procedures. Tested during drills. Available in engine room AND on bridge."},
    {q:"What is an 'overspeed trip' (overspeed protection)?",opts:["A normal speed regulator","Safety device that automatically stops the engine if speed exceeds maximum limit — prevents mechanical destruction","A speed indicator","An engine brake"],correct:1,expl:"Overspeed trip = overspeed protection. If engine exceeds maximum speed (e.g. propeller emerging in heavy seas), trip automatically cuts injection → engine stops. Threshold: usually 110-115% of nominal speed. Annual test mandatory. After activation: inspection before restart."},
    {q:"What is an 'enclosed space entry permit'?",opts:["A seaworthiness certificate","Confined space entry permit — mandatory before entering tanks, holds, CO2 spaces — asphyxiation risk","A work at height permit","A maintenance certificate"],correct:1,expl:"Enclosed space entry permit = mandatory before: entering tanks, holds, cofferdams, CO2 spaces. Measures: atmosphere test (O2 > 19.5%, no toxic gases), prior ventilation, mandatory outside guard, SCBA available. Responsibility: engine watch officer."},
    {q:"What is a 'hot work permit'?",opts:["A permit to work in a hot area","Mandatory authorization before welding, cutting, grinding — fuel areas, confined spaces — fire/explosion risk","A welder's certificate","A maintenance permit"],correct:1,expl:"Hot work permit = mandatory for welding, cutting, grinding. Required in: fuel tanks, pump rooms, confined spaces. Requires: degassed area, extinguisher at hand, monitoring during and after, permit signed by chief engineer AND captain. Validity: maximum 24 hours."},
    {q:"What to do in case of accidental oil spill at sea (pollution)?",opts:["Do nothing if it's minor","Stop source · Contain with absorbents · Immediately notify port authorities + MRCC · Log in ORB","Clean up discreetly","Wait until port arrival"],correct:1,expl:"Accidental oil spill: 1) Stop source immediately. 2) Contain with marine absorbents. 3) IMMEDIATELY notify captain + competent authorities (MRCC, port). 4) Record in ORB. 5) Write incident report. Even involuntary = MARPOL violation if unreported. Cooperation = mitigating circumstance."},
    {q:"What is 'rescue coordination' during a maritime accident?",opts:["An internal vessel procedure","International coordination of SAR operations by the competent MRCC — receives MAYDAY or EPIRB and coordinates rescue","A type of towing","An insurance procedure"],correct:1,expl:"Rescue coordination: MRCC (Maritime Rescue Coordination Centre) receives MAYDAY or EPIRB alert → identifies all nearby vessels → coordinates SAR operations. Distressed vessel must maintain continuous radio contact. Other vessels = obligation of assistance (SOLAS Convention + international maritime law)."},
    {q:"What is 'salvage' (maritime salvage)?",opts:["Vessel abandonment","Rescue operation of a vessel in danger by a third party — for compensation (LOF: Lloyd's Open Form)","An internal emergency procedure","A type of insurance"],correct:1,expl:"Salvage = maritime rescue by a third party (tug, salvage vessel). Governed by Salvage Convention 1989 and LOF (Lloyd's Open Form). Compensation based on: value saved, risks taken, efficiency. Captain can accept salvage assistance. Different from contractual towing."},
    {q:"What is a 'fire door' and why never prop it open?",opts:["A decorative fire-resistant door","Fire-resistant door (A/B/C classification) preventing flame and smoke spread — propped open = rapid spread","A watertight door","A normal security door"],correct:1,expl:"Fire door = resists fire (A-0, A-15, A-30, A-60 by duration). NEVER prop open with wedges or ropes. Scandinavian Star (1990): doors propped open → fire spread → 158 deaths. Must self-close automatically. Weekly check mandatory. Deficiency → PSC can detain vessel."},
    {q:"What is the monthly 'emergency generator test'?",opts:["A full load start test","Monthly emergency gen start · 30 min minimum autonomy test · auto load pickup check","UPS test only","Annual classification test"],correct:1,expl:"Monthly emergency gen test (SOLAS): 1) Start (auto or manual), 2) Check auto load pickup (emergency lighting, alarms), 3) Minimum 30 minute autonomy test, 4) Check voltage and frequency (440V/60Hz or 380V/50Hz), 5) Log in ship's log. Failure → report immediately + schedule repair."},
  ],
  es:[
    {q:"¿Qué es el 'load shedding' durante un blackout?",opts:["Un fallo total","Desconexión progresiva de cargas eléctricas no esenciales para no sobrecargar el grupo de emergencia","Un tipo de relé eléctrico","Un procedimiento de mantenimiento"],correct:1,expl:"Load shedding = deslastre = desconexión de circuitos no esenciales durante un blackout. Prioridad mantenida: alarmas, navegación, radio, bombas contraincendios. Desconectados: aire acondicionado, iluminación no esencial, cocina, lavandería. Permite al grupo de emergencia funcionar sin sobrecarga."},
    {q:"¿Qué es el UPS (Uninterruptible Power Supply) a bordo?",opts:["Un grupo electrógeno de emergencia diesel","Alimentación ininterrumpida por baterías — mantiene los sistemas críticos (alarmas, GMDSS) durante 30 minutos en un blackout","Un tipo de disyuntor","Un sistema de arranque automático"],correct:1,expl:"UPS = alimentación ininterrumpida. Baterías que mantienen automáticamente los sistemas críticos durante un blackout: alarmas de máquinas, GMDSS, navegación, luces de emergencia. Autonomía: mínimo 30 minutos (SOLAS). Durante este tiempo → arrancar grupo de emergencia. Prueba mensual obligatoria."},
    {q:"¿Qué es un 'ejercicio de abandono del buque' para los maquinistas?",opts:["Solo formación teórica","Simulacro mensual: alarma → punto reunión → verificación equipos → arriado embarcaciones","Una inspección anual","Solo un test de alarmas"],correct:1,expl:"Ejercicio abandono (SOLAS): mínimo mensual. Para maquinistas: 1) Parar máquinas si se ordena, 2) Chaleco salvavidas, 3) Punto de reunión, 4) Pase de lista según cuadro de obligaciones, 5) Participación arriado embarcaciones. El jefe de máquinas suele ser responsable del grupo de emergencia."},
    {q:"¿Qué es la 'parada de emergencia' (emergency stop) del motor principal?",opts:["La parada normal planificada","Parada inmediata del motor en caso de emergencia grave — accionable desde sala de máquinas Y desde el puente","Una parada programada","Un test de seguridad"],correct:1,expl:"Emergency stop = parada de emergencia motor principal. Activada por: presión aceite crítica, temperatura agua crítica, sobrevelocidad. Accionable desde: consola sala de máquinas, puente (telégrafo STOP). Tras parada de emergencia: NO reiniciar sin inspección completa. Registrar en diario de máquinas."},
    {q:"¿Qué exige el Código ISM para los procedimientos de emergencia?",opts:["Un código de navegación","Código obligatorio que exige que cada buque tenga un SMS con procedimientos de emergencia escritos, probados y documentados","Un código de formación","Un código de certificación"],correct:1,expl:"Código ISM = obligatorio (SOLAS Capítulo IX). Exige un SMS que incluya: procedimientos de emergencia escritos para todas las situaciones previsibles, ejercicios regulares, análisis de incidentes y casi accidentes, mejora continua. El auditor ISM verifica que los procedimientos se conocen Y se practican."},
    {q:"¿Qué hacer si un miembro de la tripulación resulta herido en la sala de máquinas?",opts:["Evacuarle inmediatamente sin tratamiento","Primeros auxilios inmediatos · Llamar al oficial médico · Contactar CIRM (telemedicina) si es necesario · Informar al capitán","Esperar al médico de puerto","Continuar la guardia normalmente"],correct:1,expl:"Lesión en sala de máquinas: 1) Asegurar la zona. 2) Primeros auxilios inmediatos (formación STCW EFA obligatoria). 3) Llamar al oficial médico del buque. 4) Si grave: contactar CIRM o MRCC. 5) Informar al capitán. 6) Redactar informe de accidente. 7) Registrar en diario de máquinas."},
    {q:"¿Qué es un 'plan de contingencia' de un buque?",opts:["Un plan de navegación alternativo","Plan de acciones predefinidas para emergencias graves: incendio mayor, vía de agua, varada, colisión, contaminación","Un plan de mantenimiento alternativo","Un plan de carga"],correct:1,expl:"Plan de contingencia = requerido por el Código ISM. Describe las respuestas ante emergencias graves específicas. Incluye: organigrama de responsabilidades, recursos disponibles, contactos de emergencia (MRCC, armador, asegurador), procedimientos de comunicación. Probado en simulacros."},
    {q:"¿Qué es un 'overspeed trip' (protección de sobrevelocidad)?",opts:["Un regulador de velocidad normal","Dispositivo de seguridad que para automáticamente el motor si la velocidad supera el límite máximo — evita la destrucción mecánica","Un indicador de velocidad","Un freno motor"],correct:1,expl:"Overspeed trip = protección de sobrevelocidad. Si el motor supera su velocidad máxima, el trip corta automáticamente la inyección → parada del motor. Umbral: generalmente 110-115% de la velocidad nominal. Prueba anual obligatoria. Tras activación: inspección antes del rearranque."},
    {q:"¿Qué es un 'permiso de entrada en espacio confinado'?",opts:["Un certificado de navegabilidad","Permiso obligatorio antes de entrar en tanques, bodegas, espacios CO2 — riesgo de asfixia","Un permiso de trabajo en altura","Un certificado de mantenimiento"],correct:1,expl:"Permiso entrada espacio confinado = obligatorio antes de: entrar en tanques, bodegas, cofferdams, espacios CO2. Medidas: prueba de atmósfera (O2 > 19,5%, sin gases tóxicos), ventilación previa, guardia exterior obligatoria, ERA disponible. Responsabilidad: oficial de guardia de máquinas."},
    {q:"¿Qué es un 'permiso de trabajos en caliente' (hot work permit)?",opts:["Un permiso para trabajar en zona caliente","Autorización obligatoria antes de soldadura, corte, esmerilado — zonas de combustible, espacios confinados — riesgo incendio/explosión","Un certificado de soldador","Un permiso de mantenimiento"],correct:1,expl:"Hot work permit = permiso de trabajos en caliente. Obligatorio en: tanques de combustible, salas de bombas, espacios confinados. Requiere: zona desgasificada, extintor a mano, vigilancia durante y después, permiso firmado por jefe de máquinas Y capitán. Validez: máximo 24 horas."},
    {q:"¿Qué hacer en caso de derrame accidental de aceite al mar (contaminación)?",opts:["No hacer nada si es poco","Parar la fuente · Contener con absorbentes · Notificar inmediatamente autoridades portuarias + MRCC · Registrar en ORB","Limpiar discretamente","Esperar la llegada a puerto"],correct:1,expl:"Derrame de aceite accidental: 1) Parar la fuente inmediatamente. 2) Contener con absorbentes marinos. 3) Notificar INMEDIATAMENTE al capitán + autoridades (MRCC, puerto). 4) Registrar en el ORB. 5) Redactar informe de incidente. Incluso involuntario = infracción MARPOL si no se notifica."},
    {q:"¿Qué es la 'coordinación de rescate' durante un accidente en el mar?",opts:["Un procedimiento interno del buque","Coordinación internacional de las operaciones SAR por el MRCC competente — recibe MAYDAY o EPIRB y coordina los socorros","Un tipo de remolque","Un procedimiento de seguros"],correct:1,expl:"Coordinación rescate: el MRCC recibe el MAYDAY o la alerta EPIRB → identifica todos los buques cercanos → coordina las operaciones SAR. El buque en dificultades debe mantener el contacto radio continuo. Otros buques = obligación de asistencia (SOLAS + derecho marítimo internacional)."},
    {q:"¿Qué es el 'salvamento marítimo'?",opts:["El abandono del buque","Operación de salvamento de un buque en peligro por un tercero — contra remuneración (LOF: Lloyd's Open Form)","Un procedimiento de emergencia interno","Un tipo de seguro"],correct:1,expl:"Salvamento = rescate marítimo por un tercero. Regulado por el Convenio de Salvamento 1989 y el LOF. Remuneración basada en: valor salvado, riesgos asumidos, eficacia. El capitán puede aceptar la asistencia de salvamento. Diferente del remolque contractual."},
    {q:"¿Qué es una 'puerta cortafuego' y por qué nunca mantenerla abierta?",opts:["Una puerta decorativa ignífuga","Puerta resistente al fuego (clasificación A/B/C) que impide la propagación de llamas y humos — mantenida abierta = propagación rápida","Una puerta estanca","Una puerta de seguridad normal"],correct:1,expl:"Puerta cortafuego = resiste al fuego (A-0, A-15, A-30, A-60). NUNCA mantener abierta con cuñas o cuerdas. Scandinavian Star (1990): puertas abiertas → propagación fuego → 158 muertos. Deben cerrarse automáticamente. Control semanal obligatorio."},
    {q:"¿Qué es la 'prueba mensual del grupo de emergencia'?",opts:["Un test de arranque a plena carga","Arranque mensual del grupo · prueba autonomía mínimo 30 min · verificación reprise de carga automática","Solo un test del UPS","Una prueba anual de clasificación"],correct:1,expl:"Prueba mensual grupo emergencia (SOLAS): 1) Arranque (auto o manual), 2) Verificar reprise de carga automática, 3) Prueba autonomía mínimo 30 minutos, 4) Verificar tensión y frecuencia, 5) Registrar en cuaderno de bitácora. Fallo → notificar inmediatamente + planificar reparación."},
  ],
  pt:[
    {q:"O que é o 'load shedding' durante um blackout?",opts:["Uma falha total","Desconexão progressiva de cargas elétricas não essenciais para não sobrecarregar o grupo de emergência","Um tipo de relé elétrico","Um procedimento de manutenção"],correct:1,expl:"Load shedding = deslastre = desconexão de circuitos não essenciais durante um blackout. Prioridade mantida: alarmes, navegação, rádio, bombas incêndio. Desconectados: ar condicionado, iluminação não essencial, cozinha, lavandaria. Permite ao grupo de emergência funcionar sem sobrecarga."},
    {q:"O que é o UPS (Uninterruptible Power Supply) a bordo?",opts:["Um grupo eletrogéneo de emergência diesel","Alimentação ininterrupta por baterias — mantém os sistemas críticos (alarmes, GMDSS) durante 30 minutos num blackout","Um tipo de disjuntor","Um sistema de arranque automático"],correct:1,expl:"UPS = alimentação ininterrupta. Baterias que mantêm automaticamente os sistemas críticos durante um blackout: alarmes de máquinas, GMDSS, navegação, luzes de emergência. Autonomia: mínimo 30 minutos (SOLAS). Durante este tempo → arrancar grupo de emergência. Teste mensal obrigatório."},
    {q:"O que é um 'exercício de abandono do navio' para os maquinistas?",opts:["Apenas formação teórica","Exercício mensal: alarme → posto de reunião → verificação equipamentos → arriamento embarcações","Uma inspeção anual","Apenas um teste de alarmes"],correct:1,expl:"Exercício de abandono (SOLAS): mínimo mensal. Para maquinistas: 1) Parar máquinas se ordenado, 2) Colete salva-vidas, 3) Posto de reunião, 4) Contagem segundo quadro de obrigações, 5) Participação no arriamento de embarcações. O chefe de máquinas é frequentemente responsável pelo grupo de emergência."},
    {q:"O que é a 'paragem de emergência' (emergency stop) do motor principal?",opts:["A paragem normal planeada","Paragem imediata do motor em caso de emergência grave — acionável da sala de máquinas E da ponte","Uma paragem programada","Um teste de segurança"],correct:1,expl:"Emergency stop = paragem de emergência do motor principal. Acionada por: pressão de óleo crítica, temperatura de água crítica, sobrevelocidade. Acionável a partir de: consola sala de máquinas, ponte (telégrafo STOP). Após paragem de emergência: NÃO reiniciar sem inspeção completa. Registar no diário de máquinas."},
    {q:"O que exige o Código ISM para os procedimentos de emergência?",opts:["Um código de navegação","Código obrigatório que exige que cada navio tenha um SMS com procedimentos de emergência escritos, testados e documentados","Um código de formação","Um código de certificação"],correct:1,expl:"Código ISM = obrigatório (SOLAS Capítulo IX). Exige um SMS que inclua: procedimentos de emergência escritos para todas as situações previsíveis, exercícios regulares, análise de incidentes e quase-acidentes, melhoria contínua. O auditor ISM verifica que os procedimentos são conhecidos E praticados."},
    {q:"O que fazer se um membro da tripulação se ferir na sala de máquinas?",opts:["Evacuá-lo imediatamente sem tratamento","Primeiros socorros imediatos · Chamar o oficial médico · Contactar CIRM (telemedicina) se necessário · Informar o capitão","Aguardar o médico do porto","Continuar o quarto normalmente"],correct:1,expl:"Ferimento na sala de máquinas: 1) Assegurar a zona. 2) Primeiros socorros imediatos (formação STCW EFA obrigatória). 3) Chamar o oficial médico do navio. 4) Se grave: contactar CIRM ou MRCC. 5) Informar o capitão. 6) Redigir relatório de acidente. 7) Registar no diário de máquinas."},
    {q:"O que é um 'plano de contingência' de um navio?",opts:["Um plano de navegação alternativo","Plano de ações predefinidas para emergências graves: incêndio maior, via de água, encalhe, colisão, poluição","Um plano de manutenção alternativo","Um plano de carregamento"],correct:1,expl:"Plano de contingência = exigido pelo Código ISM. Descreve as respostas para emergências graves específicas. Inclui: organograma de responsabilidades, recursos disponíveis, contactos de emergência (MRCC, armador, segurador), procedimentos de comunicação. Testado em exercícios."},
    {q:"O que é um 'overspeed trip' (proteção de sobrevelocidade)?",opts:["Um regulador de velocidade normal","Dispositivo de segurança que para automaticamente o motor se a velocidade ultrapassar o limite máximo — evita a destruição mecânica","Um indicador de velocidade","Um travão motor"],correct:1,expl:"Overspeed trip = proteção de sobrevelocidade. Se o motor ultrapassar a sua velocidade máxima, o trip corta automaticamente a injeção → paragem do motor. Limiar: geralmente 110-115% da velocidade nominal. Teste anual obrigatório. Após ativação: inspeção antes de reiniciar."},
    {q:"O que é uma 'autorização de entrada em espaço confinado'?",opts:["Um certificado de navegabilidade","Autorização obrigatória antes de entrar em tanques, porões, espaços CO2 — risco de asfixia","Uma autorização de trabalho em altura","Um certificado de manutenção"],correct:1,expl:"Autorização de entrada em espaço confinado = obrigatória antes de: entrar em tanques, porões, cofferdams, espaços CO2. Medidas: teste de atmosfera (O2 > 19,5%, sem gases tóxicos), ventilação prévia, vigilante exterior obrigatório, ARA disponível. Responsabilidade: oficial de quarto de máquinas."},
    {q:"O que é uma 'autorização de trabalhos a quente' (hot work permit)?",opts:["Uma autorização para trabalhar em zona quente","Autorização obrigatória antes de soldadura, corte, esmerilagem — zonas de combustível, espaços confinados — risco incêndio/explosão","Um certificado de soldador","Uma autorização de manutenção"],correct:1,expl:"Hot work permit = obrigatório para soldadura, corte, esmerilagem. Obrigatório em: tanques de combustível, salas de bombas, espaços confinados. Requer: zona desgasificada, extintor à mão, vigilância durante e após, autorização assinada pelo chefe de máquinas E pelo capitão. Validade: máximo 24 horas."},
    {q:"O que fazer em caso de derrame acidental de óleo no mar (poluição)?",opts:["Não fazer nada se for pouco","Parar a fonte · Conter com absorventes · Notificar imediatamente autoridades portuárias + MRCC · Registar no ORB","Limpar discretamente","Aguardar a chegada ao porto"],correct:1,expl:"Derrame de óleo acidental: 1) Parar a fonte imediatamente. 2) Conter com absorventes marinhos. 3) Notificar IMEDIATAMENTE o capitão + autoridades (MRCC, porto). 4) Registar no ORB. 5) Redigir relatório de incidente. Mesmo involuntário = infração MARPOL se não notificado."},
    {q:"O que é a 'coordenação de resgate' durante um acidente marítimo?",opts:["Um procedimento interno do navio","Coordenação internacional das operações SAR pelo MRCC competente — recebe MAYDAY ou EPIRB e coordena os socorros","Um tipo de reboque","Um procedimento de seguros"],correct:1,expl:"Coordenação de resgate: o MRCC recebe o MAYDAY ou o alerta EPIRB → identifica todos os navios próximos → coordena as operações SAR. O navio em dificuldade deve manter contacto rádio contínuo. Outros navios = obrigação de assistência (SOLAS + direito marítimo internacional)."},
    {q:"O que é o 'salvamento marítimo'?",opts:["O abandono do navio","Operação de salvamento de um navio em perigo por um terceiro — contra remuneração (LOF: Lloyd's Open Form)","Um procedimento de emergência interno","Um tipo de seguro"],correct:1,expl:"Salvamento = resgate marítimo por um terceiro. Regulado pela Convenção de Salvamento 1989 e LOF. Remuneração baseada em: valor salvo, riscos assumidos, eficácia. O capitão pode aceitar a assistência de salvamento. Diferente do reboque contratual."},
    {q:"O que é uma 'porta corta-fogo' e por que nunca mantê-la aberta?",opts:["Uma porta decorativa ignífuga","Porta resistente ao fogo (classificação A/B/C) que impede a propagação de chamas e fumos — mantida aberta = propagação rápida","Uma porta estanque","Uma porta de segurança normal"],correct:1,expl:"Porta corta-fogo = resiste ao fogo (A-0, A-15, A-30, A-60). NUNCA manter aberta com calços ou cordas. Scandinavian Star (1990): portas abertas → propagação fogo → 158 mortos. Devem fechar automaticamente. Controlo semanal obrigatório."},
    {q:"O que é o 'teste mensal do grupo de emergência'?",opts:["Um teste de arranque a plena carga","Arranque mensal do grupo · teste autonomia mínimo 30 min · verificação retoma de carga automática","Apenas um teste do UPS","Um teste anual de classificação"],correct:1,expl:"Teste mensal grupo emergência (SOLAS): 1) Arranque (auto ou manual), 2) Verificar retoma de carga automática, 3) Teste autonomia mínimo 30 minutos, 4) Verificar tensão e frequência, 5) Registar no diário de bordo. Falha → notificar imediatamente + planear reparação."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.red},${C.orange})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.red},${C.orange})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.red}33,${C.orange}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.red}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.red,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.red:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d = {
    fr:{
      badge:"🚨 Module Machine · Leçon 8/8 · ⭐ Premium · 200 XP",
      title:"Procédures d'Urgence — Emergency Procedures",
      intro:"La salle des machines est le cœur du navire. Quand une urgence frappe, l'officier mécanicien a quelques secondes pour prendre les bonnes décisions. Les procédures doivent être connues par cœur — pas apprises dans l'urgence.\n\nCette leçon couvre les 6 urgences majeures, le dead ship recovery, les signaux d'alarme et le rôle d'appel.",
      p1:"PARTIE 1 — LES 6 URGENCES MAJEURES",s1t:"Voie d'eau · Incendie · Blackout · Échouage · Collision · Homme à la mer",
      s1:"RÈGLE D'OR DES URGENCES :\n1. ALARME GÉNÉRALE → alerter tout le monde\n2. ÉVALUER → nature et gravité\n3. AGIR → procédure adaptée\n4. NOTIFIER → passerelle + chef mécanicien\n5. CONSIGNER → journal machine\n\nPRIORITÉS ABSOLUES :\nVie humaine > navire > cargaison > environnement\n\nPOINTS COMMUNS :\n→ Alarme générale TOUJOURS en premier\n→ Compter l'équipage AVANT CO2\n→ Notifier la passerelle IMMÉDIATEMENT\n→ Ne jamais agir seul si possible",
      p2:"PARTIE 2 — DEAD SHIP RECOVERY",s2t:"5 étapes pour rétablir la propulsion",
      s2:"DEAD SHIP = navire sans courant ni propulsion\nSituation la plus critique possible\n\nORDRE OBLIGATOIRE :\n1. Groupe de secours (< 30s)\n2. Rétablir MSB (load shedding)\n3. Génératrice auxiliaire\n4. Préparer moteur principal\n5. Démarrer moteur principal\n\nAIR DE DÉMARRAGE :\n25-30 bars minimum\n2 bouteilles minimum (SOLAS)\nSans air → démarrage impossible\n\nTEMPS MOYEN DEAD SHIP RECOVERY :\n< 30 min avec équipage formé\n> 2h si équipage non entraîné",
      p3:"PARTIE 3 — SIGNAUX D'ALARME",s3t:"Abandon · Incendie · MAYDAY · PAN PAN · SÉCURITÉ",
      s3:"HIÉRARCHIE DES SIGNAUX :\nMAYDAY → détresse grave (vie en danger)\nPAN PAN → urgence (moins grave)\nSÉCURITÉ → information de sécurité\n\nSIGNAUX SONORES :\nAbandon : 7 courts + 1 long\nIncendie : signal continu\nBrume : 1 long / 2 minutes\n\nCANAUX RADIO :\nCanal 16 VHF = veille permanente obligatoire\nDSC Canal 70 = alerte numérique automatique\nEPIRB 406 MHz = satellite mondial",
      p4:"PARTIE 4 — RÔLE D'APPEL MACHINE",s4t:"Simulateur comptage équipage",
      s4:"RÔLE D'APPEL (MUSTER LIST) :\nDocument SOLAS obligatoire\nAffiché dans les cabines et espaces communs\nChaque officier machine a un POSTE ASSIGNÉ\n\nPOSTES ÉQUIPE MACHINE :\nChef mécanicien → groupe d'urgence\n2ème mécanicien → canot tribord\n3ème mécanicien → canot bâbord\nÉlectricien → groupe de secours\nGraisseur → poste incendie\n\n⚠️ RÈGLE ABSOLUE :\nJAMAIS déclencher CO2 sans comptage 100%",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 8 MACHINE (FINALE)",
      sumP:["6 urgences : alarme → évaluer → agir → notifier → consigner","Dead ship : groupe secours → MSB → génératrice → ME","Abandon : 7 courts + 1 long · capitaine DERNIER","CO2 : compter 100% équipage AVANT déclenchement","MAYDAY > PAN PAN > SÉCURITÉ (hiérarchie)","Load shedding : essentiels d'abord (alarmes, nav, pompes)","UPS : 30 min autonomie · groupe secours < 30s","Rôle d'appel : poste assigné connu de tous"],
      learnedP:["6 procédures urgence majeures","Dead ship 5 étapes · ordre obligatoire","Signaux alarme : 7+1 abandon · MAYDAY canal 16","CO2 = mortel → comptage absolu avant","Rôle d'appel · load shedding · UPS 30 min"],
    },
    en:{
      badge:"🚨 Engine Module · Lesson 8/8 · ⭐ Premium · 200 XP",
      title:"Emergency Procedures",
      intro:"The engine room is the heart of the vessel. When an emergency strikes, the engineer officer has seconds to make the right decisions. Procedures must be known by heart — not learned in the heat of the moment.",
      p1:"PART 1 — THE 6 MAJOR EMERGENCIES",s1t:"Flooding · Fire · Blackout · Grounding · Collision · Man overboard",
      s1:"GOLDEN RULE OF EMERGENCIES:\n1. GENERAL ALARM → alert everyone\n2. ASSESS → nature and severity\n3. ACT → appropriate procedure\n4. NOTIFY → bridge + chief engineer\n5. LOG → engine log\n\nABSOLUTE PRIORITIES:\nHuman life > vessel > cargo > environment",
      p2:"PART 2 — DEAD SHIP RECOVERY",s2t:"5 steps to restore propulsion",
      s2:"DEAD SHIP = vessel with no power or propulsion\nMost critical situation possible\n\nMANDATORY ORDER:\n1. Emergency generator (< 30s)\n2. Restore MSB (load shedding)\n3. Auxiliary generator\n4. Prepare main engine\n5. Start main engine\n\nSTARTING AIR:\n25-30 bar minimum\n2 bottles minimum (SOLAS)\nNo air → no start possible",
      p3:"PART 3 — ALARM SIGNALS",s3t:"Abandon · Fire · MAYDAY · PAN PAN · SÉCURITÉ",
      s3:"SIGNAL HIERARCHY:\nMAYDAY → serious distress (life at risk)\nPAN PAN → urgency (less serious)\nSÉCURITÉ → safety information\n\nSOUND SIGNALS:\nAbandon: 7 short + 1 long\nFire: continuous signal\nFog: 1 long / 2 minutes\n\nRADIO CHANNELS:\nVHF Channel 16 = mandatory continuous watch\nDSC Channel 70 = automatic digital alert\nEPIRB 406 MHz = global satellite",
      p4:"PART 4 — ENGINE ROOM MUSTER LIST",s4t:"Crew count simulator",
      s4:"MUSTER LIST:\nMandatory SOLAS document\nPosted in cabins and common spaces\nEach engine officer has an ASSIGNED STATION\n\n⚠️ ABSOLUTE RULE:\nNEVER activate CO2 without 100% crew count",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — ENGINE LESSON 8 (FINAL)",
      sumP:["6 emergencies: alarm → assess → act → notify → log","Dead ship: emergency gen → MSB → aux gen → ME","Abandon: 7 short + 1 long · captain LAST","CO2: count 100% crew BEFORE activation","MAYDAY > PAN PAN > SÉCURITÉ (hierarchy)","Load shedding: essentials first (alarms, nav, pumps)","UPS: 30 min autonomy · emergency gen < 30s","Muster list: assigned station known by all"],
      learnedP:["6 major emergency procedures","Dead ship 5 steps · mandatory order","Alarm signals: 7+1 abandon · MAYDAY channel 16","CO2 = lethal → absolute count before","Muster list · load shedding · UPS 30 min"],
    },
    es:{
      badge:"🚨 Módulo Máquinas · Lección 8/8 · ⭐ Premium · 200 XP",
      title:"Procedimientos de Emergencia",
      intro:"La sala de máquinas es el corazón del buque. Cuando llega una emergencia, el oficial de máquinas tiene segundos para tomar las decisiones correctas. Los procedimientos deben conocerse de memoria.",
      p1:"PARTE 1 — LAS 6 EMERGENCIAS PRINCIPALES",s1t:"Vía agua · Incendio · Blackout · Varada · Colisión · Hombre al agua",
      s1:"REGLA DE ORO:\n1. ALARMA GENERAL → alertar a todos\n2. EVALUAR → naturaleza y gravedad\n3. ACTUAR → procedimiento adecuado\n4. NOTIFICAR → puente + jefe máquinas\n5. REGISTRAR → diario de máquinas\n\nPRIORIDADES:\nVida humana > buque > carga > medio ambiente",
      p2:"PARTE 2 — DEAD SHIP RECOVERY",s2t:"5 pasos para restablecer la propulsión",
      s2:"ORDEN OBLIGATORIO:\n1. Grupo emergencia (< 30s)\n2. Restablecer MSB (load shedding)\n3. Generador auxiliar\n4. Preparar motor principal\n5. Arrancar motor principal",
      p3:"PARTE 3 — SEÑALES DE ALARMA",s3t:"Abandono · Incendio · MAYDAY · PAN PAN · SÉCURITÉ",
      s3:"JERARQUÍA:\nMAYDAY → socorro grave\nPAN PAN → urgencia\nSÉCURITÉ → información de seguridad\n\nSeñales sonoras:\nAbandono: 7 cortos + 1 largo\nIncendio: señal continua",
      p4:"PARTE 4 — CUADRO DE OBLIGACIONES MÁQUINAS",s4t:"Simulador conteo tripulación",
      s4:"⚠️ REGLA ABSOLUTA:\nNUNCA activar CO2 sin contar el 100% de la tripulación",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 8 MÁQUINAS (FINAL)",
      sumP:["6 emergencias: alarma → evaluar → actuar → notificar → registrar","Dead ship: grupo emergencia → MSB → generador → ME","Abandono: 7 cortos + 1 largo · capitán EL ÚLTIMO","CO2: contar 100% tripulación ANTES de activar","MAYDAY > PAN PAN > SÉCURITÉ","Load shedding: esenciales primero","UPS: 30 min · grupo emergencia < 30s","Cuadro obligaciones: puesto asignado conocido por todos"],
      learnedP:["6 procedimientos urgencia mayores","Dead ship 5 pasos · orden obligatorio","Señales alarma: 7+1 abandono · MAYDAY canal 16","CO2 = mortal → recuento absoluto antes","Cuadro obligaciones · load shedding · UPS 30 min"],
    },
    pt:{
      badge:"🚨 Módulo Máquinas · Lição 8/8 · ⭐ Premium · 200 XP",
      title:"Procedimentos de Emergência",
      intro:"A sala de máquinas é o coração do navio. Quando uma emergência acontece, o oficial de máquinas tem segundos para tomar as decisões certas. Os procedimentos devem ser conhecidos de cor.",
      p1:"PARTE 1 — AS 6 EMERGÊNCIAS PRINCIPAIS",s1t:"Via água · Incêndio · Blackout · Encalhe · Colisão · Homem ao mar",
      s1:"REGRA DE OURO:\n1. ALARME GERAL → alertar todos\n2. AVALIAR → natureza e gravidade\n3. AGIR → procedimento adequado\n4. NOTIFICAR → ponte + chefe máquinas\n5. REGISTAR → diário de máquinas\n\nPRIORIDADES:\nVida humana > navio > carga > ambiente",
      p2:"PARTE 2 — DEAD SHIP RECOVERY",s2t:"5 passos para restabelecer a propulsão",
      s2:"ORDEM OBRIGATÓRIA:\n1. Grupo emergência (< 30s)\n2. Restabelecer MSB (load shedding)\n3. Gerador auxiliar\n4. Preparar motor principal\n5. Arrancar motor principal",
      p3:"PARTE 3 — SINAIS DE ALARME",s3t:"Abandono · Incêndio · MAYDAY · PAN PAN · SÉCURITÉ",
      s3:"HIERARQUIA:\nMAYDAY → socorro grave\nPAN PAN → urgência\nSÉCURITÉ → informação de segurança\n\nSinais sonoros:\nAbandono: 7 curtos + 1 longo\nIncêndio: sinal contínuo",
      p4:"PARTE 4 — QUADRO DE OBRIGAÇÕES MÁQUINAS",s4t:"Simulador contagem tripulação",
      s4:"⚠️ REGRA ABSOLUTA:\nNUNCA ativar CO2 sem contar 100% da tripulação",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 8 MÁQUINAS (FINAL)",
      sumP:["6 emergências: alarme → avaliar → agir → notificar → registar","Dead ship: grupo emergência → MSB → gerador → ME","Abandono: 7 curtos + 1 longo · capitão O ÚLTIMO","CO2: contar 100% tripulação ANTES de ativar","MAYDAY > PAN PAN > SÉCURITÉ","Load shedding: essenciais primeiro","UPS: 30 min · grupo emergência < 30s","Quadro obrigações: posto atribuído conhecido por todos"],
      learnedP:["6 procedimentos emergência maiores","Dead ship 5 passos · ordem obrigatória","Sinais alarme: 7+1 abandono · MAYDAY canal 16","CO2 = fatal → contagem absoluta antes","Quadro obrigações · load shedding · UPS 30 min"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonEmergency({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#1a0505 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.red}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.red,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🚨 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 8/8 — FINALE":lang==="en"?"Lesson 8/8 — FINAL":lang==="es"?"Lección 8/8 — FINAL":"Lição 8/8 — FINAL"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.red,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.red},${C.orange},${C.gold2})`,transition:"width 0.5s ease"}}/>
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

            <SL icon="🆘" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🆘 {lang==="fr"?"6 URGENCES — PROCÉDURES INTERACTIVES":lang==="en"?"6 EMERGENCIES — INTERACTIVE PROCEDURES":"6 EMERGENCIAS — PROCEDIMIENTOS INTERACTIVOS"}</div>
              <EmergencyFlowSVG lang={lang}/>
            </Card>

            <SL icon="💀" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💀 {lang==="fr"?"DEAD SHIP RECOVERY — SIMULATEUR":lang==="en"?"DEAD SHIP RECOVERY — SIMULATOR":"DEAD SHIP RECOVERY — SIMULADOR"}</div>
              <DeadShipSVG lang={lang}/>
            </Card>

            <SL icon="📡" text={lc.p3} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}33`}}>
              <div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📡 {lang==="fr"?"SIGNAUX D'ALARME — INTERACTIF":lang==="en"?"ALARM SIGNALS — INTERACTIVE":"SEÑALES DE ALARMA — INTERACTIVO"}</div>
              <EmergencySignalsSVG lang={lang}/>
            </Card>

            <SL icon="📋" text={lc.p4} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📋 {lang==="fr"?"RÔLE D'APPEL MACHINE — SIMULATEUR":lang==="en"?"ENGINE MUSTER LIST — SIMULATOR":"CUADRO OBLIGACIONES — SIMULADOR"}</div>
              <MusterListSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(192,57,43,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final — Emergency Procedures":lang==="en"?"Final Quiz — Emergency Procedures":"Quiz Final — Procedimientos Emergencia"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 8 — FINALE":lang==="en"?"Lesson 8 — FINAL":"Lección 8 — FINAL"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:72,marginBottom:10}}>🏆</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:4}}>{t.complete}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:C.gold2,marginBottom:12,letterSpacing:2}}>
                {lang==="fr"?"MODULE MACHINE COMPLÉTÉ !":lang==="en"?"ENGINE MODULE COMPLETE!":lang==="es"?"¡MÓDULO MÁQUINAS COMPLETADO!":"MÓDULO MÁQUINAS CONCLUÍDO!"}
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}55`,fontSize:14,color:C.red,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            {/* Module complete card */}
            <Card style={{marginBottom:16,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))",border:`1px solid ${C.gold}44`,textAlign:"center"}}>
              <div style={{fontSize:11,color:C.gold2,fontFamily:"'Cinzel',serif",letterSpacing:2,marginBottom:12}}>
                {lang==="fr"?"🎖️ MODULE MACHINE — 8 LEÇONS TERMINÉES":lang==="en"?"🎖️ ENGINE MODULE — 8 LESSONS COMPLETE":"🎖️ MÓDULO MÁQUINAS — 8 LECCIONES COMPLETADAS"}
              </div>
              {["L1 Moteur Diesel","L2 Auxiliaires","L3 Stabilité","L4 Incendie & CO2","L5 Sauvetage & EPIRB","L6 Maintenance","L7 Watchkeeping","L8 Emergency Procedures"].map((l,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",fontSize:11,color:C.muted,textAlign:"left"}}>
                  <span style={{color:C.green,fontWeight:700}}>✓</span>{l}
                </div>
              ))}
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"🚀 PROCHAIN MODULE →":lang==="en"?"🚀 NEXT MODULE →":lang==="es"?"🚀 PRÓXIMO MÓDULO →":"🚀 PRÓXIMO MÓDULO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
