// @ts-nocheck
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
// SVG 1 — TROUBLESHOOTING DECISION TREE
// ══════════════════════════════════════
function TroubleshootingSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const faults = [
    { id:"smoke_black", icon:"⬛", color:C.steel,
      label:{fr:"Fumée noire",en:"Black smoke",es:"Humo negro",pt:"Fumo preto"},
      causes:{fr:"• Manque d'air (turbo défaillant)\n• Surcharge moteur\n• Injecteurs encrassés\n• HFO mal chauffé\n• Filtre air bouché",en:"• Air starvation (turbo failure)\n• Engine overload\n• Clogged injectors\n• Poorly heated HFO\n• Blocked air filter",es:"• Falta de aire (turbo defectuoso)\n• Sobrecarga del motor\n• Inyectores sucios\n• HFO mal calentado\n• Filtro de aire obstruido",pt:"• Falta de ar (turbo defeituoso)\n• Sobrecarga do motor\n• Injetores sujos\n• HFO mal aquecido\n• Filtro de ar obstruído"},
      actions:{fr:"→ Vérifier turbocompresseur\n→ Réduire la charge\n→ Nettoyer/remplacer injecteurs\n→ Vérifier température HFO\n→ Nettoyer filtre air",en:"→ Check turbocharger\n→ Reduce load\n→ Clean/replace injectors\n→ Check HFO temperature\n→ Clean air filter",es:"→ Verificar turbocompresor\n→ Reducir carga\n→ Limpiar/reemplazar inyectores\n→ Verificar temperatura HFO\n→ Limpiar filtro de aire",pt:"→ Verificar turbocompressor\n→ Reduzir carga\n→ Limpar/substituir injetores\n→ Verificar temperatura HFO\n→ Limpar filtro de ar"} },
    { id:"smoke_white", icon:"🌫️", color:C.white,
      label:{fr:"Fumée blanche",en:"White smoke",es:"Humo blanco",pt:"Fumo branco"},
      causes:{fr:"• Eau dans le carburant\n• Moteur froid (démarrage)\n• Joint de culasse défaillant\n• Injection trop tardive",en:"• Water in fuel\n• Cold engine (startup)\n• Failed cylinder head gasket\n• Late injection timing",es:"• Agua en el combustible\n• Motor frío (arranque)\n• Junta de culata defectuosa\n• Inyección muy tardía",pt:"• Água no combustível\n• Motor frio (arranque)\n• Junta da cabeça do cilindro com defeito\n• Injeção muito tardia"},
      actions:{fr:"→ Purifier le carburant\n→ Préchauffer le moteur\n→ Inspecter joints de culasse\n→ Vérifier calage injection",en:"→ Purify fuel\n→ Preheat engine\n→ Inspect cylinder head gaskets\n→ Check injection timing",es:"→ Purificar combustible\n→ Precalentar motor\n→ Inspeccionar juntas culata\n→ Verificar calado inyección",pt:"→ Purificar combustível\n→ Pré-aquecer motor\n→ Inspecionar juntas cabeça\n→ Verificar calagem injeção"} },
    { id:"smoke_blue", icon:"🔵", color:C.blue2,
      label:{fr:"Fumée bleue",en:"Blue smoke",es:"Humo azul",pt:"Fumo azul"},
      causes:{fr:"• Huile brûlée dans les cylindres\n• Segments de piston usés\n• Guides de soupapes usés\n• Niveau d'huile trop élevé",en:"• Oil burning in cylinders\n• Worn piston rings\n• Worn valve guides\n• Oil level too high",es:"• Aceite quemado en cilindros\n• Segmentos de pistón gastados\n• Guías de válvulas gastadas\n• Nivel de aceite demasiado alto",pt:"• Óleo a queimar nos cilindros\n• Segmentos de pistão gastos\n• Guias de válvulas gastos\n• Nível de óleo demasiado alto"},
      actions:{fr:"→ Analyser les gaz de carter\n→ Vérifier compression cylindres\n→ Inspecter segments et soupapes\n→ Réduire niveau d'huile",en:"→ Analyze crankcase gases\n→ Check cylinder compression\n→ Inspect rings and valves\n→ Reduce oil level",es:"→ Analizar gases del cárter\n→ Verificar compresión cilindros\n→ Inspeccionar segmentos y válvulas\n→ Reducir nivel de aceite",pt:"→ Analisar gases do cárter\n→ Verificar compressão cilindros\n→ Inspecionar segmentos e válvulas\n→ Reduzir nível de óleo"} },
    { id:"vibration", icon:"📳", color:C.orange,
      label:{fr:"Vibrations excessives",en:"Excessive vibrations",es:"Vibraciones excesivas",pt:"Vibrações excessivas"},
      causes:{fr:"• Hélice endommagée\n• Déséquilibre moteur\n• Cylindre défaillant\n• Paliers usés\n• Corps étranger hélice",en:"• Damaged propeller\n• Engine imbalance\n• Failing cylinder\n• Worn bearings\n• Foreign object on propeller",es:"• Hélice dañada\n• Desequilibrio motor\n• Cilindro defectuoso\n• Cojinetes gastados\n• Objeto extraño en hélice",pt:"• Hélice danificada\n• Desequilíbrio motor\n• Cilindro com defeito\n• Mancais gastos\n• Objeto estranho na hélice"},
      actions:{fr:"→ Réduire vitesse et observer\n→ Vérifier tous les cylindres\n→ Inspecter l'hélice (plongeon)\n→ Analyser les vibrations\n→ Notifier chef mécanicien",en:"→ Reduce speed and observe\n→ Check all cylinders\n→ Inspect propeller (dive)\n→ Analyze vibration pattern\n→ Notify chief engineer",es:"→ Reducir velocidad y observar\n→ Verificar todos los cilindros\n→ Inspeccionar hélice (buceo)\n→ Analizar vibraciones\n→ Notificar jefe de máquinas",pt:"→ Reduzir velocidade e observar\n→ Verificar todos os cilindros\n→ Inspecionar hélice (mergulho)\n→ Analisar vibrações\n→ Notificar chefe de máquinas"} },
    { id:"overheating", icon:"🌡️", color:C.red,
      label:{fr:"Surchauffe moteur",en:"Engine overheating",es:"Recalentamiento motor",pt:"Sobreaquecimento motor"},
      causes:{fr:"• Pompe eau de mer défaillante\n• Filtre eau de mer bouché\n• Thermostat défaillant\n• Fuite dans circuit eau douce\n• Échangeur encrassé",en:"• Failed sea water pump\n• Blocked sea water filter\n• Failed thermostat\n• Fresh water circuit leak\n• Fouled heat exchanger",es:"• Bomba agua de mar defectuosa\n• Filtro agua de mar obstruido\n• Termostato defectuoso\n• Fuga en circuito agua dulce\n• Intercambiador sucio",pt:"• Bomba água do mar com defeito\n• Filtro água do mar obstruído\n• Termóstato com defeito\n• Fuga no circuito água doce\n• Permutador sujo"},
      actions:{fr:"→ RÉDUIRE LA CHARGE immédiatement\n→ Vérifier pompe eau de mer\n→ Nettoyer filtre tamis\n→ Contrôler thermostat\n→ Inspecter échangeur\n→ Si > 90°C : arrêt moteur",en:"→ REDUCE LOAD immediately\n→ Check sea water pump\n→ Clean strainer filter\n→ Check thermostat\n→ Inspect heat exchanger\n→ If > 90°C: stop engine",es:"→ REDUCIR CARGA inmediatamente\n→ Verificar bomba agua de mar\n→ Limpiar filtro tamiz\n→ Controlar termostato\n→ Inspeccionar intercambiador\n→ Si > 90°C: parar motor",pt:"→ REDUZIR CARGA imediatamente\n→ Verificar bomba água do mar\n→ Limpar filtro tamiz\n→ Controlar termóstato\n→ Inspecionar permutador\n→ Se > 90°C: parar motor"} },
    { id:"oil_low", icon:"🛢️", color:C.gold2,
      label:{fr:"Pression huile basse",en:"Low oil pressure",es:"Presión aceite baja",pt:"Pressão óleo baixa"},
      causes:{fr:"• Niveau huile bas (fuite)\n• Pompe huile défaillante\n• Filtre huile bouché\n• Viscosité incorrecte\n• Dilution carburant dans l'huile",en:"• Low oil level (leak)\n• Failed oil pump\n• Blocked oil filter\n• Wrong viscosity\n• Fuel dilution in oil",es:"• Nivel aceite bajo (fuga)\n• Bomba aceite defectuosa\n• Filtro aceite obstruido\n• Viscosidad incorrecta\n• Dilución combustible en aceite",pt:"• Nível óleo baixo (fuga)\n• Bomba óleo com defeito\n• Filtro óleo obstruído\n• Viscosidade incorreta\n• Diluição combustível no óleo"},
      actions:{fr:"→ ARRÊT IMMÉDIAT si < 2 bars\n→ Vérifier niveau d'huile\n→ Chercher les fuites\n→ Inspecter pompe huile\n→ Remplacer filtre huile\n→ Analyser l'huile",en:"→ IMMEDIATE STOP if < 2 bar\n→ Check oil level\n→ Look for leaks\n→ Inspect oil pump\n→ Replace oil filter\n→ Analyze oil sample",es:"→ PARADA INMEDIATA si < 2 bar\n→ Verificar nivel aceite\n→ Buscar fugas\n→ Inspeccionar bomba aceite\n→ Reemplazar filtro aceite\n→ Analizar aceite",pt:"→ PARAGEM IMEDIATA se < 2 bar\n→ Verificar nível óleo\n→ Procurar fugas\n→ Inspecionar bomba óleo\n→ Substituir filtro óleo\n→ Analisar óleo"} },
  ];

  const sel_ = sel ? faults.find(f=>f.id===sel) : null;

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:10}}>
        {faults.map(f=>(
          <div key={f.id} onClick={()=>setSel(sel===f.id?null:f.id)}
            style={{padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===f.id?`${f.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===f.id?f.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:22,marginBottom:4}}>{f.icon}</div>
            <div style={{fontSize:8,color:sel===f.id?f.color:C.muted,fontWeight:700,lineHeight:1.3}}>
              {f.label[lang]||f.label.fr}
            </div>
          </div>
        ))}
      </div>
      {sel_ ? (
        <div style={{padding:"12px",borderRadius:14,background:`${sel_.color === C.white ? "rgba(255,255,255,0.08)" : sel_.color+"12"}`,border:`1.5px solid ${sel_.color === C.white ? "rgba(255,255,255,0.3)" : sel_.color+"44"}`,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:13,fontWeight:700,color:sel_.color === C.white ? C.white : sel_.color,marginBottom:8}}>
            {sel_.icon} {sel_.label[lang]||sel_.label.fr}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <div style={{fontSize:10,color:C.red,fontWeight:700,marginBottom:4}}>
                {lang==="fr"?"CAUSES PROBABLES:":lang==="en"?"PROBABLE CAUSES:":lang==="es"?"CAUSAS PROBABLES:":"CAUSAS PROVÁVEIS:"}
              </div>
              <div style={{fontSize:10,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
                {sel_.causes[lang]||sel_.causes.fr}
              </div>
            </div>
            <div>
              <div style={{fontSize:10,color:C.green,fontWeight:700,marginBottom:4}}>
                {lang==="fr"?"ACTIONS:":lang==="en"?"ACTIONS:":lang==="es"?"ACCIONES:":"AÇÕES:"}
              </div>
              <div style={{fontSize:10,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
                {sel_.actions[lang]||sel_.actions.fr}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"12px",fontSize:11,color:C.muted}}>
          {lang==="fr"?"Touche une panne pour voir les causes et actions":lang==="en"?"Tap a fault to see causes and actions":lang==="es"?"Toca una avería para ver causas y acciones":"Toque numa avaria para ver causas e ações"}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — PREVENTIVE MAINTENANCE PLANNER
// ══════════════════════════════════════
function MaintenancePlannerSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState({});

  const tasks = [
    { id:"daily", period:{fr:"QUOTIDIEN",en:"DAILY",es:"DIARIO",pt:"DIÁRIO"}, color:C.green, items:[
      {id:"d1", task:{fr:"Niveau huile moteur",en:"Engine oil level",es:"Nivel aceite motor",pt:"Nível óleo motor"}},
      {id:"d2", task:{fr:"Niveau eau douce refroid.",en:"Cooling FW level",es:"Nivel agua dulce refrig.",pt:"Nível água doce arref."}},
      {id:"d3", task:{fr:"Sounding citernes carburant",en:"Fuel tank sounding",es:"Sonda tanques combustible",pt:"Sonda tanques combustível"}},
      {id:"d4", task:{fr:"Vérification visuelle fuites",en:"Visual leak check",es:"Verificación visual fugas",pt:"Verificação visual fugas"}},
    ]},
    { id:"weekly", period:{fr:"HEBDOMADAIRE",en:"WEEKLY",es:"SEMANAL",pt:"SEMANAL"}, color:C.blue2, items:[
      {id:"w1", task:{fr:"Test groupe de secours",en:"Emergency generator test",es:"Test grupo emergencia",pt:"Teste grupo emergência"}},
      {id:"w2", task:{fr:"Inspection extincteurs",en:"Extinguisher inspection",es:"Inspección extintores",pt:"Inspeção extintores"}},
      {id:"w3", task:{fr:"Nettoyage filtres tamis",en:"Strainer filter cleaning",es:"Limpieza filtros tamiz",pt:"Limpeza filtros tamiz"}},
      {id:"w4", task:{fr:"Test alarmes machine",en:"Engine room alarm test",es:"Test alarmas máquinas",pt:"Teste alarmes máquinas"}},
    ]},
    { id:"monthly", period:{fr:"MENSUEL",en:"MONTHLY",es:"MENSUAL",pt:"MENSAL"}, color:C.orange, items:[
      {id:"m1", task:{fr:"Analyse huile moteur",en:"Engine oil analysis",es:"Análisis aceite motor",pt:"Análise óleo motor"}},
      {id:"m2", task:{fr:"Test EPIRB + SART",en:"EPIRB + SART test",es:"Test EPIRB + SART",pt:"Teste EPIRB + SART"}},
      {id:"m3", task:{fr:"Exercice incendie + abandon",en:"Fire + abandon drill",es:"Ejercicio incendio + abandono",pt:"Exercício incêndio + abandono"}},
      {id:"m4", task:{fr:"Purge séparateurs eau de cale",en:"Bilge separator purge",es:"Purga separador sentina",pt:"Purga separador porão"}},
    ]},
    { id:"yearly", period:{fr:"ANNUEL",en:"ANNUAL",es:"ANUAL",pt:"ANUAL"}, color:C.red, items:[
      {id:"y1", task:{fr:"Révision moteur principal",en:"Main engine overhaul",es:"Revisión motor principal",pt:"Revisão motor principal"}},
      {id:"y2", task:{fr:"Inspection fond (dry-dock)",en:"Bottom inspection (dry-dock)",es:"Inspección fondo (dique seco)",pt:"Inspeção fundo (doca seca)"}},
      {id:"y3", task:{fr:"Remplacement HRU radeaux",en:"Liferaft HRU replacement",es:"Sustitución ULH balsas",pt:"Substituição ULH balsas"}},
      {id:"y4", task:{fr:"Certificats & Class survey",en:"Certificates & Class survey",es:"Certificados & inspección clase",pt:"Certificados & inspeção classe"}},
    ]},
  ];

  const toggleDone = (id) => setDone(d=>({...d,[id]:!d[id]}));
  const total = tasks.reduce((s,t)=>s+t.items.length,0);
  const doneCount = Object.values(done).filter(Boolean).length;

  return (
    <div>
      {/* Progress */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Tâches complétées:":lang==="en"?"Tasks completed:":lang==="es"?"Tareas completadas:":"Tarefas concluídas:"} {doneCount}/{total}</div>
        <div style={{fontSize:10,color:C.gold2,fontWeight:700}}>{Math.round(doneCount/total*100)}%</div>
      </div>
      <div style={{height:4,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:12,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(doneCount/total)*100}%`,background:`linear-gradient(90deg,${C.green},${C.gold2})`,transition:"width 0.3s"}}/>
      </div>

      {/* Period buttons */}
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {tasks.map(t=>(
          <button key={t.id} onClick={()=>setSel(sel===t.id?null:t.id)} style={{
            flex:1,padding:"6px 3px",borderRadius:8,fontSize:8,cursor:"pointer",fontWeight:700,
            background:sel===t.id?`${t.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===t.id?t.color:"rgba(255,255,255,0.08)"}`,
            color:sel===t.id?t.color:C.muted,textAlign:"center",
          }}>
            {t.period[lang]||t.period.fr}
          </button>
        ))}
      </div>

      {/* Tasks list */}
      {sel && (() => {
        const task = tasks.find(t=>t.id===sel);
        return (
          <div style={{animation:"fadeUp 0.3s ease"}}>
            {task.items.map(item=>(
              <div key={item.id} onClick={()=>toggleDone(item.id)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,marginBottom:6,cursor:"pointer",
                  background:done[item.id]?"rgba(30,138,74,0.12)":"rgba(255,255,255,0.04)",
                  border:`1px solid ${done[item.id]?C.green:"rgba(255,255,255,0.08)"}`}}>
                <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,
                  background:done[item.id]?C.green:"rgba(255,255,255,0.1)",
                  border:`1.5px solid ${done[item.id]?C.green:task.color}`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:C.white}}>
                  {done[item.id]?"✓":""}
                </div>
                <div style={{fontSize:11,color:done[item.id]?C.green:C.white,
                  textDecoration:done[item.id]?"line-through":"none"}}>
                  {item.task[lang]||item.task.fr}
                </div>
              </div>
            ))}
          </div>
        );
      })()}

      {!sel && (
        <div style={{textAlign:"center",padding:"12px",fontSize:11,color:C.muted}}>
          {lang==="fr"?"Sélectionne une période pour voir les tâches":lang==="en"?"Select a period to see tasks":lang==="es"?"Selecciona un período para ver las tareas":"Selecione um período para ver as tarefas"}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — TOOLS & SPARE PARTS
// ══════════════════════════════════════
function SparePartsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const categories = [
    { id:"critical", icon:"🔴", color:C.red,
      label:{fr:"Pièces CRITIQUES",en:"CRITICAL parts",es:"Piezas CRÍTICAS",pt:"Peças CRÍTICAS"},
      desc:{fr:"Obligatoires à bord (SOLAS/Class)\nSans elles → arrêt du navire\n\n• Segments de piston (jeu complet)\n• Injecteurs de rechange\n• Pompe à huile de rechange\n• Joints de culasse\n• Pompe eau de mer\n• Fusibles et relais principaux\n• HRU radeaux de sauvetage",en:"Mandatory on board (SOLAS/Class)\nWithout them → vessel stops\n\n• Piston ring set (complete)\n• Spare injectors\n• Spare oil pump\n• Cylinder head gaskets\n• Sea water pump\n• Main fuses and relays\n• Liferaft HRU units",es:"Obligatorias a bordo (SOLAS/Clase)\nSin ellas → parada del buque\n\n• Juego de segmentos de pistón\n• Inyectores de repuesto\n• Bomba de aceite de repuesto\n• Juntas de culata\n• Bomba agua de mar\n• Fusibles y relés principales\n• ULH balsas salvavidas",pt:"Obrigatórias a bordo (SOLAS/Classe)\nSem elas → paragem do navio\n\n• Jogo de segmentos de pistão\n• Injetores sobressalentes\n• Bomba óleo sobressalente\n• Juntas da cabeça do cilindro\n• Bomba água do mar\n• Fusíveis e relés principais\n• ULH balsas salva-vidas"} },
    { id:"routine", icon:"🔧", color:C.orange,
      label:{fr:"Pièces COURANTES",en:"ROUTINE parts",es:"Piezas CORRIENTES",pt:"Peças CORRENTES"},
      desc:{fr:"Consommées régulièrement\nStock renouvelé à chaque escale\n\n• Filtres à huile et à carburant\n• Éléments filtrants air\n• Joints toriques (O-rings)\n• Huile moteur (bidons)\n• Liquide de refroidissement\n• Anodes sacrificielles\n• Courroies et flexibles",en:"Regularly consumed\nStock renewed at each port\n\n• Oil and fuel filters\n• Air filter elements\n• O-rings\n• Engine oil (drums)\n• Coolant\n• Sacrificial anodes\n• Belts and hoses",es:"Consumidas regularmente\nStock renovado en cada escala\n\n• Filtros de aceite y combustible\n• Elementos filtrantes aire\n• Juntas tóricas (O-rings)\n• Aceite motor (bidones)\n• Líquido refrigerante\n• Ánodos de sacrificio\n• Correas y mangueras",pt:"Consumidas regularmente\nStock renovado em cada escala\n\n• Filtros de óleo e combustível\n• Elementos filtrantes ar\n• O-rings\n• Óleo motor (bidões)\n• Líquido de arrefecimento\n• Ânodos de sacrifício\n• Correias e mangueiras"} },
    { id:"tools", icon:"🛠️", color:C.blue2,
      label:{fr:"OUTILLAGE machine",en:"ENGINE ROOM tools",es:"HERRAMIENTAS máquinas",pt:"FERRAMENTAS máquinas"},
      desc:{fr:"Outils spécifiques machine\n\n• Clés dynamométriques\n• Extracteurs de roulements\n• Manomètres de test\n• Endoscope / caméra inspection\n• Mégohmmètre (isolation électrique)\n• Jauge de cote (micrometer)\n• Kit de soudure\n• Testeur d'huile (viscosimètre)",en:"Machinery-specific tools\n\n• Torque wrenches\n• Bearing extractors\n• Test pressure gauges\n• Endoscope / inspection camera\n• Megohmmeter (electrical insulation)\n• Micrometer\n• Welding kit\n• Oil tester (viscometer)",es:"Herramientas específicas de máquinas\n\n• Llaves dinamométricas\n• Extractores de rodamientos\n• Manómetros de prueba\n• Endoscopio / cámara inspección\n• Megóhmetro (aislamiento eléctrico)\n• Micrómetro\n• Kit de soldadura\n• Viscosímetro",pt:"Ferramentas específicas de máquinas\n\n• Chaves dinamométricas\n• Extratores de rolamentos\n• Manómetros de teste\n• Endoscópio / câmara inspeção\n• Megóhmetro (isolamento elétrico)\n• Micrómetro\n• Kit de soldadura\n• Viscosímetro"} },
    { id:"chemical", icon:"⚗️", color:C.teal,
      label:{fr:"PRODUITS chimiques",en:"CHEMICAL products",es:"PRODUCTOS químicos",pt:"PRODUTOS químicos"},
      desc:{fr:"Produits consommables machine\n\n• Additifs eau de refroidissement\n• Inhibiteurs de corrosion\n• Dégraissants industriels\n• Produits d'étanchéité (Loctite)\n• Résines époxy réparation\n• Peinture anticorrosion\n• Désinfectant eau potable\n• Produit traitement eau ballast",en:"Consumable machinery products\n\n• Cooling water additives\n• Corrosion inhibitors\n• Industrial degreasers\n• Sealants (Loctite)\n• Epoxy repair resins\n• Anti-corrosion paint\n• Drinking water disinfectant\n• Ballast water treatment",es:"Productos consumibles de máquinas\n\n• Aditivos agua de refrigeración\n• Inhibidores de corrosión\n• Desengrasantes industriales\n• Productos de sellado (Loctite)\n• Resinas epoxi de reparación\n• Pintura anticorrosión\n• Desinfectante agua potable\n• Tratamiento aguas de lastre",pt:"Produtos consumíveis de máquinas\n\n• Aditivos água de arrefecimento\n• Inibidores de corrosão\n• Desengordurantes industriais\n• Vedantes (Loctite)\n• Resinas epóxi de reparação\n• Tinta anticorrosão\n• Desinfetante água potável\n• Tratamento águas de lastro"} },
  ];

  const sel_ = sel ? categories.find(c=>c.id===sel) : null;

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {categories.map(cat=>(
          <div key={cat.id} onClick={()=>setSel(sel===cat.id?null:cat.id)}
            style={{padding:"12px 8px",borderRadius:14,cursor:"pointer",textAlign:"center",
              background:sel===cat.id?`${cat.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===cat.id?cat.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:24,marginBottom:4}}>{cat.icon}</div>
            <div style={{fontSize:9,color:cat.color,fontWeight:700,lineHeight:1.3}}>{cat.label[lang]||cat.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une catégorie pour les détails":lang==="en"?"Tap a category for details":lang==="es"?"Toca una categoría para detalles":"Toque numa categoria para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — FAULT DIAGNOSIS SIMULATOR
// ══════════════════════════════════════
function DiagnosisSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const scenarios = {
    fr:{
      title:"Scénario : Alarme température eau haute (88°C)",
      steps:[
        { q:"La pompe eau de mer fonctionne-t-elle ?",opts:["Oui — débit normal","Non — pompe arrêtée","Incertain"],next:[1,2,1] },
        { q:"Le filtre tamis eau de mer est-il propre ?",opts:["Oui — propre","Non — bouché","Pas vérifié"],next:[3,4,3] },
        { q:"Redémarrer la pompe. La température baisse-t-elle ?",opts:["Oui — température descend","Non — reste haute"],next:["ok_pump","cont_5"] },
        { q:"La température continue-t-elle à monter ?",opts:["Oui — toujours > 88°C","Non — stabilisée"],next:[5,"ok_stable"] },
        { q:"Nettoyer le filtre tamis. Amélioration ?",opts:["Oui — température descend","Non — toujours haute"],next:["ok_filter",5] },
        { q:"Température > 90°C ?",opts:["Oui — > 90°C","Non — entre 88-90°C"],next:["danger","warn"] },
      ],
      results:{
        ok_pump:"✅ RÉSOLU — Pompe eau de mer redémarrée · surveiller pendant 15 min · consigner dans le journal machine",
        ok_filter:"✅ RÉSOLU — Filtre tamis nettoyé · pompe ok · température revenue normale · consigner",
        ok_stable:"⚡ STABLE — Température stable à 88°C · surveiller · notifier chef mécanicien · réduire légèrement la charge",
        danger:"🔴 DANGER — RÉDUIRE CHARGE IMMÉDIATEMENT · Si > 92°C : arrêt moteur · Notifier chef mécanicien + passerelle",
        warn:"⚡ ATTENTION — Réduire charge 10% · Vérifier échangeur de chaleur · Notifier chef mécanicien",
        cont_5:"Vérification approfondie nécessaire",
      }
    },
    en:{
      title:"Scenario: High water temperature alarm (88°C)",
      steps:[
        { q:"Is the sea water pump running?",opts:["Yes — normal flow","No — pump stopped","Uncertain"],next:[1,2,1] },
        { q:"Is the sea water strainer filter clean?",opts:["Yes — clean","No — blocked","Not checked"],next:[3,4,3] },
        { q:"Restart pump. Does temperature drop?",opts:["Yes — temperature dropping","No — still high"],next:["ok_pump","cont_5"] },
        { q:"Is temperature still rising?",opts:["Yes — still > 88°C","No — stabilized"],next:[5,"ok_stable"] },
        { q:"Clean strainer filter. Improvement?",opts:["Yes — temperature dropping","No — still high"],next:["ok_filter",5] },
        { q:"Temperature > 90°C?",opts:["Yes — > 90°C","No — between 88-90°C"],next:["danger","warn"] },
      ],
      results:{
        ok_pump:"✅ RESOLVED — Sea water pump restarted · monitor 15 min · log in engine log",
        ok_filter:"✅ RESOLVED — Strainer filter cleaned · pump ok · temperature back to normal · log it",
        ok_stable:"⚡ STABLE — Temperature stable at 88°C · monitor · notify chief engineer · slightly reduce load",
        danger:"🔴 DANGER — REDUCE LOAD IMMEDIATELY · If > 92°C: stop engine · Notify chief engineer + bridge",
        warn:"⚡ CAUTION — Reduce load 10% · Check heat exchanger · Notify chief engineer",
        cont_5:"Further inspection needed",
      }
    },
    es:{
      title:"Escenario: Alarma temperatura agua alta (88°C)",
      steps:[
        { q:"¿Funciona la bomba de agua de mar?",opts:["Sí — caudal normal","No — bomba parada","Incierto"],next:[1,2,1] },
        { q:"¿El filtro tamiz de agua de mar está limpio?",opts:["Sí — limpio","No — obstruido","No verificado"],next:[3,4,3] },
        { q:"Reiniciar bomba. ¿Baja la temperatura?",opts:["Sí — temperatura baja","No — sigue alta"],next:["ok_pump","cont_5"] },
        { q:"¿La temperatura sigue subiendo?",opts:["Sí — todavía > 88°C","No — estabilizada"],next:[5,"ok_stable"] },
        { q:"Limpiar filtro tamiz. ¿Mejora?",opts:["Sí — temperatura baja","No — sigue alta"],next:["ok_filter",5] },
        { q:"¿Temperatura > 90°C?",opts:["Sí — > 90°C","No — entre 88-90°C"],next:["danger","warn"] },
      ],
      results:{
        ok_pump:"✅ RESUELTO — Bomba agua de mar reiniciada · vigilar 15 min · registrar en diario",
        ok_filter:"✅ RESUELTO — Filtro tamiz limpiado · bomba ok · temperatura normal · registrar",
        ok_stable:"⚡ ESTABLE — Temperatura estable a 88°C · vigilar · notificar jefe · reducir carga ligeramente",
        danger:"🔴 PELIGRO — REDUCIR CARGA INMEDIATAMENTE · Si > 92°C: parar motor · Notificar jefe + puente",
        warn:"⚡ ATENCIÓN — Reducir carga 10% · Verificar intercambiador · Notificar jefe de máquinas",
        cont_5:"Se necesita inspección adicional",
      }
    },
    pt:{
      title:"Cenário: Alarme temperatura água alta (88°C)",
      steps:[
        { q:"A bomba de água do mar está a funcionar?",opts:["Sim — caudal normal","Não — bomba parada","Incerto"],next:[1,2,1] },
        { q:"O filtro tamiz de água do mar está limpo?",opts:["Sim — limpo","Não — obstruído","Não verificado"],next:[3,4,3] },
        { q:"Reiniciar bomba. A temperatura desce?",opts:["Sim — temperatura desce","Não — continua alta"],next:["ok_pump","cont_5"] },
        { q:"A temperatura continua a subir?",opts:["Sim — ainda > 88°C","Não — estabilizada"],next:[5,"ok_stable"] },
        { q:"Limpar filtro tamiz. Melhora?",opts:["Sim — temperatura desce","Não — continua alta"],next:["ok_filter",5] },
        { q:"Temperatura > 90°C?",opts:["Sim — > 90°C","Não — entre 88-90°C"],next:["danger","warn"] },
      ],
      results:{
        ok_pump:"✅ RESOLVIDO — Bomba água do mar reiniciada · vigiar 15 min · registar no diário",
        ok_filter:"✅ RESOLVIDO — Filtro tamiz limpo · bomba ok · temperatura normal · registar",
        ok_stable:"⚡ ESTÁVEL — Temperatura estável a 88°C · vigiar · notificar chefe · reduzir carga ligeiramente",
        danger:"🔴 PERIGO — REDUZIR CARGA IMEDIATAMENTE · Se > 92°C: parar motor · Notificar chefe + ponte",
        warn:"⚡ ATENÇÃO — Reduzir carga 10% · Verificar permutador · Notificar chefe de máquinas",
        cont_5:"Inspeção adicional necessária",
      }
    },
  };

  const sc = scenarios[lang] || scenarios.fr;
  const currentStep = sc.steps[step];
  const isResult = typeof result === "string";

  const choose = (optIdx) => {
    const next = currentStep.next[optIdx];
    if (typeof next === "string") {
      setResult(next);
    } else {
      setAnswers(a=>[...a,{step,optIdx}]);
      setStep(next);
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); };

  const resultColor = result?.startsWith("✅")?C.green:result?.startsWith("🔴")?C.red:C.orange;

  return (
    <div>
      <div style={{padding:"8px 12px",borderRadius:10,marginBottom:10,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`,fontSize:10,color:C.gold2,fontWeight:700}}>
        🎯 {sc.title}
      </div>

      {/* Progress */}
      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {sc.steps.map((_,i)=>(
          <div key={i} style={{flex:1,height:3,borderRadius:2,background:i<step?C.green:i===step?C.blue2:"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>

      {!isResult ? (
        <div>
          <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12,padding:"10px 12px",borderRadius:10,background:"rgba(255,255,255,0.05)"}}>
            {lang==="fr"?"❓":lang==="en"?"❓":lang==="es"?"❓":"❓"} {currentStep.q}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {currentStep.opts.map((opt,i)=>(
              <button key={i} onClick={()=>choose(i)} style={{
                padding:"11px 14px",borderRadius:12,background:"rgba(26,111,212,0.1)",
                border:`1px solid ${C.blue2}44`,color:C.white,fontSize:12,
                textAlign:"left",cursor:"pointer",fontFamily:"'Nunito',sans-serif",
                display:"flex",alignItems:"center",gap:8,
              }}>
                <div style={{width:22,height:22,borderRadius:"50%",background:`${C.blue2}22`,border:`1px solid ${C.blue2}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:C.blue2,fontWeight:700,flexShrink:0}}>
                  {String.fromCharCode(65+i)}
                </div>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{animation:"fadeUp 0.4s ease"}}>
          <div style={{padding:"14px",borderRadius:14,background:`${resultColor}12`,border:`1.5px solid ${resultColor}44`,marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:resultColor,lineHeight:1.6}}>
              {sc.results[result]}
            </div>
          </div>
          <div style={{padding:"8px 12px",borderRadius:10,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`,fontSize:10,color:C.gold2,marginBottom:12}}>
            📋 {lang==="fr"?"Toujours consigner l'anomalie et les actions dans le journal machine":lang==="en"?"Always log the anomaly and actions in the engine log":lang==="es"?"Siempre registrar la anomalía y las acciones en el diario de máquinas":"Registar sempre a anomalia e as ações no diário de máquinas"}
          </div>
          <button onClick={reset} style={{width:"100%",padding:"10px",borderRadius:12,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,border:"none",color:C.white,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            🔄 {lang==="fr"?"RECOMMENCER":lang==="en"?"RESTART":lang==="es"?"REINICIAR":"RECOMEÇAR"}
          </button>
        </div>
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
    fr:{title:"Avarie moteur MV Stellar Banner — Golfe Persique (2016)",teaser:"Vraquier · Panne moteur en zone difficile · Défaut maintenance préventive · Remorquage d'urgence",what:"Le vraquier Stellar Banner subit une panne moteur majeure dans le Golfe Persique. Le moteur principal s'arrête à cause d'une défaillance des paliers de tête de bielle non détectée. Le navire dérive pendant 18 heures avant l'arrivée des remorqueurs. L'enquête révèle un programme de maintenance préventive non respecté.",cause:"• Paliers de tête de bielle usés non remplacés au planning\n• Analyse d'huile non effectuée depuis 3 mois (aurait détecté la contamination)\n• Pression huile basse ignorée lors des rondes précédentes\n• Entrée ORB (journal huile) non conforme — travaux fictifs\n• Chef mécanicien sous pression commerciale (pas d'arrêt pour maintenance)",lessons:"✓ PMS (Planned Maintenance System) = OBLIGATOIRE et RESPECTÉ\n✓ Analyse huile = détection précoce des usures métalliques\n✓ Ne jamais ignorer une pression huile basse — c'est un signal d'alarme\n✓ Le chef mécanicien peut refuser d'appareiller si maintenance critique non effectuée\n✓ Résultat : ISM audit · Compagnie condamnée · Chef mécanicien suspendu",link:"🔗 Lien L6 Maintenance : La maintenance préventive coûte moins cher qu'une réparation d'urgence en mer + remorquage. Un palier à remplacer = 500$. Une panne en mer = 500 000$ + risque vies humaines."},
    en:{title:"Engine Failure MV Stellar Banner — Persian Gulf (2016)",teaser:"Bulker · Engine failure in difficult zone · Preventive maintenance failure · Emergency towing",what:"The bulker Stellar Banner suffers a major engine failure in the Persian Gulf. The main engine stops due to an undetected connecting rod bearing failure. The vessel drifts for 18 hours before tugs arrive. Investigation reveals a preventive maintenance schedule not followed.",cause:"• Worn connecting rod bearings not replaced on schedule\n• Oil analysis not performed for 3 months (would have detected contamination)\n• Low oil pressure ignored during previous rounds\n• ORB (oil log) non-compliant — fictitious work entries\n• Chief engineer under commercial pressure (no maintenance stop)",lessons:"✓ PMS (Planned Maintenance System) = MANDATORY and FOLLOWED\n✓ Oil analysis = early detection of metal wear\n✓ Never ignore low oil pressure — it is an alarm signal\n✓ Chief engineer can refuse departure if critical maintenance not done\n✓ Result: ISM audit · Company convicted · Chief engineer suspended",link:"🔗 L6 Maintenance Link: Preventive maintenance costs less than emergency repair at sea + towing. A bearing to replace = $500. Breakdown at sea = $500,000 + risk to human lives."},
    es:{title:"Avería motor MV Stellar Banner — Golfo Pérsico (2016)",teaser:"Granelero · Avería motor en zona difícil · Fallo mantenimiento preventivo · Remolque de emergencia",what:"El granelero Stellar Banner sufre una avería grave del motor principal en el Golfo Pérsico. El motor para por un fallo en los cojinetes de cabeza de biela no detectado. El buque deriva durante 18 horas antes de la llegada de los remolcadores.",cause:"• Cojinetes de cabeza de biela gastados no sustituidos según el plan\n• Análisis de aceite no realizado desde hace 3 meses\n• Presión de aceite baja ignorada en rondas anteriores\n• Jefe de máquinas bajo presión comercial",lessons:"✓ PMS = OBLIGATORIO y RESPETADO\n✓ Análisis de aceite = detección temprana de desgaste metálico\n✓ Nunca ignorar una presión de aceite baja\n✓ El jefe de máquinas puede negarse a zarpar si el mantenimiento crítico no está hecho",link:"🔗 Vínculo L6: El mantenimiento preventivo cuesta menos que una reparación de emergencia en el mar. Un cojinete a sustituir = 500$. Avería en el mar = 500.000$ + riesgo para vidas humanas."},
    pt:{title:"Avaria motor MV Stellar Banner — Golfo Pérsico (2016)",teaser:"Graneleiro · Avaria motor em zona difícil · Falha manutenção preventiva · Reboque de emergência",what:"O graneleiro Stellar Banner sofre uma avaria grave do motor principal no Golfo Pérsico. O motor para por uma falha nos mancais de cabeça de biela não detetada. O navio deriva durante 18 horas antes da chegada dos rebocadores.",cause:"• Mancais de cabeça de biela gastos não substituídos conforme o plano\n• Análise de óleo não efetuada há 3 meses\n• Pressão de óleo baixa ignorada em rondas anteriores\n• Chefe de máquinas sob pressão comercial",lessons:"✓ PMS = OBRIGATÓRIO e RESPEITADO\n✓ Análise de óleo = deteção precoce de desgaste metálico\n✓ Nunca ignorar uma pressão de óleo baixa\n✓ O chefe de máquinas pode recusar zarpar se a manutenção crítica não estiver feita",link:"🔗 Vínculo L6: A manutenção preventiva custa menos do que uma reparação de emergência no mar. Um mancal a substituir = 500$. Avaria no mar = 500.000$ + risco para vidas humanas."},
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
  const correct={q1:"noir",q2:"500",q3:"pms"};
  const qs={
    fr:[
      {id:"q1",q:"Quelle couleur de fumée indique un manque d'air (turbo défaillant) ?\n(Répondre : noir, blanc ou bleu)"},
      {id:"q2",q:"Analyse d'huile moteur : toutes les combien d'heures d'utilisation ?\n(Répondre : en chiffres)"},
      {id:"q3",q:"Comment s'appelle le système de maintenance préventive planifiée ?\n(Répondre : l'acronyme — 3 lettres)"},
    ],
    en:[
      {id:"q1",q:"Which smoke color indicates air starvation (turbo failure)?\n(Answer: black, white or blue)"},
      {id:"q2",q:"Engine oil analysis: every how many operating hours?\n(Answer: in numbers)"},
      {id:"q3",q:"What is the planned preventive maintenance system called?\n(Answer: the acronym — 3 letters)"},
    ],
    es:[
      {id:"q1",q:"¿Qué color de humo indica falta de aire (turbo defectuoso)?\n(Responder: negro, blanco o azul)"},
      {id:"q2",q:"Análisis de aceite motor: ¿cada cuántas horas de uso?\n(Responder: en cifras)"},
      {id:"q3",q:"¿Cómo se llama el sistema de mantenimiento preventivo planificado?\n(Responder: el acrónimo — 3 letras)"},
    ],
    pt:[
      {id:"q1",q:"Que cor de fumo indica falta de ar (turbo com defeito)?\n(Responder: preto, branco ou azul)"},
      {id:"q2",q:"Análise de óleo do motor: a cada quantas horas de uso?\n(Responder: em números)"},
      {id:"q3",q:"Como se chama o sistema de manutenção preventiva planeada?\n(Responder: o acrónimo — 3 letras)"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase();
    if(id==="q1") return v==="noir"||v==="black"||v==="negro"||v==="preto";
    if(id==="q2") return v==="500"||v==="500h"||v==="500 h"||v==="500 heures"||v==="500 hours"||v==="500 horas";
    if(id==="q3") return v==="pms";
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.orange}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Fumée noire = manque d'air · Huile = 500h · PMS = maintenance planifiée"
        :lang==="en"?"💡 Reminders: Black smoke = air starvation · Oil = 500h · PMS = planned maintenance"
        :lang==="es"?"💡 Recordatorios: Humo negro = falta aire · Aceite = 500h · PMS = mantenimiento planificado"
        :"💡 Lembretes: Fumo preto = falta ar · Óleo = 500h · PMS = manutenção planeada"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: NOIR (excès carburant sans air suffisant)\n✅ Q2: 500h (analyse huile toutes les 500h d'utilisation)\n✅ Q3: PMS (Planned Maintenance System — obligatoire Code ISM)"
        :lang==="en"?"✅ Q1: BLACK (excess fuel without enough air)\n✅ Q2: 500h (oil analysis every 500 operating hours)\n✅ Q3: PMS (Planned Maintenance System — mandatory ISM Code)"
        :"✅ Q1: NEGRO/PRETO · Q2: 500h · Q3: PMS"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}


const QUIZ = {
  fr:[
    {q:"Quelle couleur de fumée indique que de l'huile brûle dans les cylindres ?",opts:["Fumée noire","Fumée blanche","Fumée bleue","Fumée grise"],correct:2,expl:"Fumée bleue = huile brûlée dans les cylindres. Causes : segments de piston usés, guides de soupapes usés, niveau d'huile trop élevé. Analyse des gaz de carter (crankcase gas analysis) confirme le diagnostic. Solution : inspection des segments et soupapes, ajustement du niveau d'huile."},
    {q:"À quelle fréquence doit-on effectuer l'analyse d'huile moteur ?",opts:["Tous les jours","Toutes les semaines","Toutes les 500 heures d'utilisation environ","Une fois par an"],correct:2,expl:"Analyse d'huile tous les ~500h d'utilisation (ou selon recommandations constructeur). L'analyse révèle : présence de métaux d'usure (fer = cylindres, cuivre = paliers, aluminium = pistons), contamination par eau ou carburant, dégradation de la viscosité. Permet de détecter une avarie AVANT qu'elle devienne catastrophique."},
    {q:"Que faire en premier si la pression d'huile tombe en dessous de 2,5 bars ?",opts:["Attendre et surveiller","Déclencher l'alarme et notifier le chef mécanicien immédiatement","Arrêter le moteur immédiatement si < 2 bars","Augmenter la vitesse du moteur"],correct:2,expl:"Si pression huile < 2,5 bars : ALARME déclenchée. Si < 2 bars : ARRÊT AUTOMATIQUE du moteur. Actions immédiates : 1) Notifier chef mécanicien + passerelle. 2) Vérifier niveau d'huile. 3) Chercher les fuites. 4) Ne JAMAIS continuer à fonctionner avec une pression huile dangereusement basse."},
    {q:"Un PMS (Planned Maintenance System) est obligatoire selon :",opts:["Convention MARPOL","Code ISM (International Safety Management)","Convention STCW","Convention SOLAS uniquement"],correct:1,expl:"PMS = obligatoire dans le cadre du Code ISM (SOLAS Chapitre IX). Le Code ISM exige que chaque navire ait un SMS (Safety Management System) incluant un programme de maintenance préventive pour tous les équipements critiques. Vérifié lors des audits ISM et inspections PSC."},
    {q:"Que signifie une fumée blanche au démarrage du moteur (moteur froid) ?",opts:["Problème grave — arrêter immédiatement","Normal au démarrage à froid — carburant non complètement brûlé jusqu'à la montée en température","Huile dans les cylindres","Injecteurs défaillants"],correct:1,expl:"Fumée blanche au démarrage = souvent normale lors d'un démarrage à froid. Le carburant ne brûle pas complètement jusqu'à ce que le moteur atteigne sa température de fonctionnement. Disparaît généralement après 2-5 minutes. ANORMALE si elle persiste après montée en température → suspicion eau dans le carburant ou joint de culasse défaillant."},
  ],
  en:[
    {q:"What smoke color indicates oil burning in the cylinders?",opts:["Black smoke","White smoke","Blue smoke","Grey smoke"],correct:2,expl:"Blue smoke = oil burning in cylinders. Causes: worn piston rings, worn valve guides, oil level too high. Crankcase gas analysis confirms diagnosis. Solution: inspect rings and valves, adjust oil level."},
    {q:"How often should engine oil analysis be performed?",opts:["Every day","Every week","Every ~500 operating hours","Once a year"],correct:2,expl:"Oil analysis every ~500 operating hours (or per manufacturer recommendations). Analysis reveals: wear metals (iron = cylinders, copper = bearings, aluminum = pistons), water or fuel contamination, viscosity degradation. Detects failure BEFORE it becomes catastrophic."},
    {q:"What to do first if oil pressure drops below 2.5 bar?",opts:["Wait and monitor","Trigger alarm and notify chief engineer immediately","Stop engine immediately if < 2 bar","Increase engine speed"],correct:2,expl:"If oil pressure < 2.5 bar: ALARM triggered. If < 2 bar: AUTOMATIC ENGINE STOP. Immediate actions: 1) Notify chief engineer + bridge. 2) Check oil level. 3) Look for leaks. 4) NEVER continue operating with dangerously low oil pressure."},
    {q:"A PMS (Planned Maintenance System) is mandatory per:",opts:["MARPOL Convention","ISM Code (International Safety Management)","STCW Convention","SOLAS only"],correct:1,expl:"PMS = mandatory under ISM Code (SOLAS Chapter IX). ISM Code requires each vessel to have an SMS (Safety Management System) including a preventive maintenance program for all critical equipment. Checked during ISM audits and PSC inspections."},
    {q:"What does white smoke at engine startup (cold engine) mean?",opts:["Serious problem — stop immediately","Normal at cold start — fuel not completely burned until warm-up","Oil in cylinders","Faulty injectors"],correct:1,expl:"White smoke at startup = often normal during cold start. Fuel doesn't fully combust until engine reaches operating temperature. Usually disappears after 2-5 minutes. ABNORMAL if it persists after warm-up → suspect water in fuel or failed cylinder head gasket."},
  ],
  es:[
    {q:"¿Qué color de humo indica que el aceite está quemándose en los cilindros?",opts:["Humo negro","Humo blanco","Humo azul","Humo gris"],correct:2,expl:"Humo azul = aceite quemado en los cilindros. Causas: segmentos de pistón gastados, guías de válvulas gastadas, nivel de aceite demasiado alto. El análisis de gases del cárter confirma el diagnóstico. Solución: inspeccionar segmentos y válvulas, ajustar el nivel de aceite."},
    {q:"¿Con qué frecuencia debe realizarse el análisis de aceite del motor?",opts:["Cada día","Cada semana","Cada ~500 horas de uso","Una vez al año"],correct:2,expl:"Análisis de aceite cada ~500h de uso. El análisis revela: metales de desgaste (hierro = cilindros, cobre = cojinetes, aluminio = pistones), contaminación por agua o combustible, degradación de la viscosidad. Permite detectar una avería ANTES de que sea catastrófica."},
    {q:"¿Qué hacer primero si la presión de aceite cae por debajo de 2,5 bar?",opts:["Esperar y vigilar","Activar la alarma y notificar al jefe de máquinas inmediatamente","Parar el motor inmediatamente si < 2 bar","Aumentar la velocidad del motor"],correct:2,expl:"Si presión aceite < 2,5 bar: ALARMA activada. Si < 2 bar: PARADA AUTOMÁTICA del motor. Acciones inmediatas: 1) Notificar jefe de máquinas + puente. 2) Verificar nivel de aceite. 3) Buscar fugas. 4) NUNCA continuar con presión de aceite peligrosamente baja."},
    {q:"Un PMS (Sistema de Mantenimiento Planificado) es obligatorio según:",opts:["Convenio MARPOL","Código ISM (Gestión Internacional de la Seguridad)","Convenio STCW","Solo SOLAS"],correct:1,expl:"PMS = obligatorio en el marco del Código ISM (SOLAS Capítulo IX). El Código ISM exige que cada buque tenga un SMS (Sistema de Gestión de la Seguridad) que incluya un programa de mantenimiento preventivo para todos los equipos críticos."},
    {q:"¿Qué significa el humo blanco al arrancar el motor (motor frío)?",opts:["Problema grave — parar inmediatamente","Normal al arranque en frío — combustible no completamente quemado hasta alcanzar temperatura","Aceite en los cilindros","Inyectores defectuosos"],correct:1,expl:"Humo blanco al arranque = a menudo normal durante un arranque en frío. El combustible no se quema completamente hasta que el motor alcanza su temperatura de funcionamiento. Generalmente desaparece tras 2-5 minutos. ANORMAL si persiste después del calentamiento → sospechar agua en el combustible o junta de culata defectuosa."},
  ],
  pt:[
    {q:"Que cor de fumo indica que o óleo está a queimar nos cilindros?",opts:["Fumo preto","Fumo branco","Fumo azul","Fumo cinzento"],correct:2,expl:"Fumo azul = óleo a queimar nos cilindros. Causas: segmentos de pistão gastos, guias de válvulas gastos, nível de óleo demasiado alto. A análise de gases do cárter confirma o diagnóstico. Solução: inspecionar segmentos e válvulas, ajustar o nível de óleo."},
    {q:"Com que frequência deve ser efetuada a análise de óleo do motor?",opts:["Todos os dias","Todas as semanas","A cada ~500 horas de uso","Uma vez por ano"],correct:2,expl:"Análise de óleo a cada ~500h de uso. A análise revela: metais de desgaste (ferro = cilindros, cobre = mancais, alumínio = pistões), contaminação por água ou combustível, degradação da viscosidade. Permite detetar uma avaria ANTES de se tornar catastrófica."},
    {q:"O que fazer primeiro se a pressão de óleo cair abaixo de 2,5 bar?",opts:["Esperar e vigiar","Ativar o alarme e notificar o chefe de máquinas imediatamente","Parar o motor imediatamente se < 2 bar","Aumentar a velocidade do motor"],correct:2,expl:"Se pressão óleo < 2,5 bar: ALARME ativado. Se < 2 bar: PARAGEM AUTOMÁTICA do motor. Ações imediatas: 1) Notificar chefe de máquinas + ponte. 2) Verificar nível de óleo. 3) Procurar fugas. 4) NUNCA continuar com pressão de óleo perigosamente baixa."},
    {q:"Um PMS (Sistema de Manutenção Planeada) é obrigatório segundo:",opts:["Convenção MARPOL","Código ISM (Gestão Internacional da Segurança)","Convenção STCW","Apenas SOLAS"],correct:1,expl:"PMS = obrigatório no âmbito do Código ISM (SOLAS Capítulo IX). O Código ISM exige que cada navio tenha um SMS (Sistema de Gestão da Segurança) incluindo um programa de manutenção preventiva para todos os equipamentos críticos."},
    {q:"O que significa fumo branco ao arrancar o motor (motor frio)?",opts:["Problema grave — parar imediatamente","Normal no arranque a frio — combustível não completamente queimado até aquecer","Óleo nos cilindros","Injetores com defeito"],correct:1,expl:"Fumo branco no arranque = muitas vezes normal durante um arranque a frio. O combustível não queima completamente até o motor atingir a temperatura de funcionamento. Geralmente desaparece após 2-5 minutos. ANORMAL se persistir após o aquecimento → suspeitar de água no combustível ou junta da cabeça do cilindro com defeito."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce qu'une 'analyse d'huile par spectrométrie' ?",opts:["Une analyse visuelle de l'huile","Analyse en laboratoire détectant les traces de métaux d'usure dans l'huile — prédit les défaillances avant qu'elles deviennent catastrophiques","Une analyse de la couleur de l'huile","Un test de viscosité simple"],correct:1,expl:"Spectrométrie = technique d'analyse de l'huile en laboratoire. Détecte : fer (usure cylindres/pistons), cuivre (usure paliers de bielle), aluminium (usure pistons), chrome (segments). Permet de prévoir une défaillance 200-500h avant l'avarie. Analyse toutes les 500h + lors d'anomalies détectées."},
    {q:"Qu'est-ce qu'un 'palier de tête de bielle' (connecting rod bearing) ?",opts:["Une pièce décorative","Palier situé en tête de bielle reliant piston et vilebrequin — lubrifié en permanence, usure critique","Une type de joint","Le support du piston"],correct:1,expl:"Palier de tête de bielle = pièce semi-circulaire en alliage (babbit metal) entre la tête de bielle et le tourillon du vilebrequin. Lubrifié en permanence par huile sous pression. Jeu nominal : 0,05-0,15mm. Usure excessive → bruit de cognement (knock) → casse catastrophique. Remplacement planifié aux 5000-8000h."},
    {q:"Qu'est-ce que le 'crankcase inspection' (visite de carter) ?",opts:["Une inspection externe du moteur","Inspection intérieure du carter moteur pour vérifier l'état des paliers, segments, bielles — effectuée à froid moteur arrêté","Un test de compression","Une vérification des niveaux"],correct:1,expl:"Crankcase inspection = inspection intérieure du carter (moteur arrêté, refroidi). Vérifie : état des paliers, jeux de bielle, état des segments, traces d'usure anormale, contamination de l'huile, traces d'eau. Obligatoire selon PMS et à chaque anomalie détectée (bruit, consommation d'huile anormale)."},
    {q:"Qu'est-ce que le 'turbocharger surging' ?",opts:["Un excès de vitesse du turbo","Phénomène de pompage du turbocompresseur — oscillations irrégulières du débit d'air, bruit caractéristique","Une panne totale du turbo","Un excès de pression d'admission"],correct:1,expl:"Turbocharger surging = pompage du turbo. Causes : filtre air bouché, charge moteur trop réduite, carburant de mauvaise qualité. Symptômes : bruit rhythmique sourd du turbo, fumée noire intermittente. Actions : vérifier filtre air, augmenter légèrement la charge, nettoyer turbo si récurrent. Peut endommager les aubes du turbo si prolongé."},
    {q:"Qu'est-ce qu'un 'test de compression' sur un cylindre ?",opts:["Un test de la pression d'injection","Test mesurant la pression de compression dans le cylindre — détecte les fuites de segments ou soupapes","Un test de la pression d'huile","Un test de la pression d'eau"],correct:1,expl:"Test de compression = mesure de la pression maximale dans le cylindre lors du cycle de compression (soupapes fermées, moteur arrêté manuellement ou par démarrage à l'air). Pression normale : 30-45 bars. Pression basse → segments usés ou soupapes qui ne ferment pas bien. Utilisé pour diagnostiquer une perte de puissance ou une consommation d'huile excessive."},
    {q:"Qu'est-ce que le 'fuel oil purification' (purification carburant) ?",opts:["Un type de carburant","Processus de centrifugation du HFO pour éliminer eau et impuretés avant injection dans le moteur","Un test de qualité carburant","Un filtre simple"],correct:1,expl:"Fuel oil purification = centrifugation du HFO à 5000-10000 RPM avant utilisation. Élimine : eau (source de corrosion et d'explosion de vapeur à l'injection), boues, impuretés. Purificateur en ligne 24h/24. Boues → sludge tank. Double purification : purificateur + clarificateur pour résultat optimal."},
    {q:"Qu'est-ce qu'une 'fissure de cavitation' sur les chemises de cylindre ?",opts:["Une fissure thermique","Érosion de la surface extérieure des chemises causée par la vibration de l'eau de refroidissement — phénomène mécanique","Une corrosion chimique","Une usure normale"],correct:1,expl:"Cavitation sur chemises = micro-bulles de vapeur formées par vibration qui s'effondrent violemment sur la surface métallique → arrachement de métal → perforation progressive. Prévention : inhibiteurs de corrosion dans l'eau de refroidissement, maintenir concentration DCA (Diesel Coolant Additive) correcte. Détection : légère perte d'eau, analyse eau douce."},
    {q:"Qu'est-ce que le 'scavenging air pressure' (pression d'air de balayage) ?",opts:["La pression d'air dans la salle des machines","La pression d'air comprimé poussé dans les cylindres par le turbocompresseur pour évacuer les gaz brûlés et charger en air frais","La pression de l'air conditionné","La pression d'air de démarrage"],correct:1,expl:"Scavenging air = air sous pression (0,3-2,5 bars selon le moteur) fourni par le turbocompresseur + soufflante dans les cylindres 2 temps. Remplace les gaz brûlés par de l'air frais (balayage). Pression basse → fumée noire. Surveillance par manomètre air de balayage en salle des machines."},
    {q:"Qu'est-ce que le 'derating' d'un moteur marin ?",opts:["Une augmentation de puissance","Réduction délibérée de la puissance maximale du moteur pour améliorer la durée de vie, réduire la consommation et les émissions","Un type de panne","Une procédure de démarrage"],correct:1,expl:"Derating = réduction de la puissance maximale du moteur (ex : 85% MCR au lieu de 100%). Avantages : améliore la durée de vie des composants, réduit consommation de carburant, réduit les émissions NOx, adapte le moteur au carburant LSFO moins énergétique. Pratiqué dans le cadre du slow steaming et de l'IMO 2020."},
    {q:"Qu'est-ce qu'un 'running-in' (rodage) d'un moteur après révision ?",opts:["Un test en pleine puissance","Procédure de remise en service progressive après révision majeure — montée en charge par paliers pour permettre aux nouvelles pièces de se rodder","Un test de sécurité","Un test de démarrage"],correct:1,expl:"Running-in = rodage après révision majeure (remplacement pistons, segments, chemises, paliers). Procédure : démarrage à charge réduite (20-30%), montée progressive sur 24-72h par paliers (50%, 75%, 100%). Les nouvelles pièces ont des micro-rugosités qui s'éliminent progressivement. Sans rodage = usure prématurée."},
    {q:"Qu'est-ce qu'un 'heat crack' (fissure thermique) sur une culasse ?",opts:["Une fissure par choc","Fissure causée par les cycles répétés de dilatation/contraction thermique — détectée par contrôle par ressuage","Une fissure de corrosion","Une fissure de vibration"],correct:1,expl:"Heat cracks = fissures causées par les cycles thermiques répétés (démarrage/arrêt). Localisées : entre sièges de soupapes, autour des injecteurs. Détection : test par ressuage (penetrant testing) lors des révisions. Si fissure → remplacement culasse obligatoire. Prévention : temps de préchauffage et refroidissement respectés."},
    {q:"Qu'est-ce que le 'water washing' du turbocompresseur ?",opts:["Le lavage externe du turbo","Nettoyage en marche du rotor du turbine côté gaz d'échappement par injection d'eau pour éliminer les dépôts de carbone — améliore le rendement","Le refroidissement du turbo","Un test d'étanchéité"],correct:1,expl:"Water washing turbo = nettoyage en fonctionnement du rotor turbine par injection d'eau douce (5-10 litres) ou de solution nettoyante. Élimine les dépôts de carbone et de sel. Améliore le rendement du turbo (jusqu'à +3% de puissance moteur). Fréquence : selon les conditions d'exploitation. Doit être fait à charge réduite."},
    {q:"Qu'est-ce que l'inspection par 'endoscope' (boroscope) d'un moteur ?",opts:["Une inspection externe","Inspection visuelle interne des cylindres et chambres de combustion par introduction d'une caméra sans démontage","Un test de pression","Une inspection électrique"],correct:1,expl:"Endoscope = boroscope flexible avec caméra miniature. Permet d'inspecter l'intérieur des cylindres, l'état des soupapes et des pistons SANS démontage du moteur. Détecte : dépôts de carbone, rayures, fissures, état des injecteurs in situ. Gain de temps considérable vs démontage complet."},
    {q:"Qu'est-ce que le 'tightening torque' (couple de serrage) ?",opts:["La vitesse de serrage","Valeur de couple de serrage prescrite par le constructeur pour chaque boulon/écrou — garantit l'étanchéité et évite la rupture","Le type de clé à utiliser","La durée de serrage"],correct:1,expl:"Couple de serrage = force de torsion appliquée à un boulon/écrou, mesurée en Newton-mètres (Nm). Valeur prescrite par le constructeur. Trop serré → rupture du filetage. Trop lâche → fuite, desserrage. Outil : clé dynamométrique. Critique pour : boulons de culasse, boulons de palier, boulons de bielle."},
    {q:"Qu'est-ce que la 'corrosion galvanique' à bord d'un navire ?",opts:["Rouille ordinaire","Corrosion électrochimique entre deux métaux différents en contact dans un électrolyte (eau de mer) — protégée par anodes sacrificielles","Une rouille chimique","Une corrosion par friction"],correct:1,expl:"Corrosion galvanique = réaction électrochimique entre deux métaux de potentiels différents (ex : bronze hélice + acier coque) en présence d'électrolyte (eau de mer). Le métal le moins noble se dissout. Protection : anodes de zinc ou aluminium (sacrificielles) fixées sur la coque et l'hélice → l'anode se corrode à la place du métal à protéger."},
  ],
  en:[
    {q:"What is 'oil spectrometry analysis'?",opts:["A visual oil inspection","Laboratory analysis detecting wear metal traces in oil — predicts failures before they become catastrophic","An oil color analysis","A simple viscosity test"],correct:1,expl:"Spectrometry = laboratory oil analysis technique. Detects: iron (cylinder/piston wear), copper (connecting rod bearing wear), aluminum (piston wear), chrome (ring wear). Can forecast failure 200-500h before breakdown. Analysis every 500h + when anomalies detected."},
    {q:"What is a 'connecting rod bearing'?",opts:["A decorative part","Bearing at the connecting rod big end linking piston and crankshaft — continuously lubricated, critical wear part","A type of gasket","Piston support"],correct:1,expl:"Connecting rod bearing = semi-circular alloy piece (babbit metal) between connecting rod big end and crankshaft journal. Continuously lubricated by pressurized oil. Nominal clearance: 0.05-0.15mm. Excessive wear → knocking noise → catastrophic failure. Planned replacement at 5000-8000h."},
    {q:"What is a 'crankcase inspection'?",opts:["An external engine inspection","Internal inspection of the engine crankcase to check bearing condition, rings, connecting rods — done cold with engine stopped","A compression test","A level check"],correct:1,expl:"Crankcase inspection = internal inspection of crankcase (engine stopped, cooled). Checks: bearing condition, connecting rod clearances, ring condition, abnormal wear traces, oil contamination, water traces. Mandatory per PMS and at each detected anomaly (noise, abnormal oil consumption)."},
    {q:"What is 'turbocharger surging'?",opts:["Turbo overspeed","Turbocharger pumping phenomenon — irregular airflow oscillations, characteristic noise","Complete turbo failure","Intake overpressure"],correct:1,expl:"Turbocharger surging = turbo pumping. Causes: blocked air filter, engine load too low, poor quality fuel. Symptoms: rhythmic dull turbo noise, intermittent black smoke. Actions: check air filter, slightly increase load, clean turbo if recurring. Can damage turbo blades if prolonged."},
    {q:"What is a 'compression test' on a cylinder?",opts:["An injection pressure test","Test measuring compression pressure in the cylinder — detects ring or valve leakage","An oil pressure test","A water pressure test"],correct:1,expl:"Compression test = measures maximum cylinder pressure during compression cycle (valves closed, engine manually cranked or air started). Normal pressure: 30-45 bar. Low pressure → worn rings or valves not closing properly. Used to diagnose power loss or excessive oil consumption."},
    {q:"What is 'fuel oil purification'?",opts:["A type of fuel","HFO centrifugation process to remove water and impurities before injection into the engine","A fuel quality test","A simple filter"],correct:1,expl:"Fuel oil purification = HFO centrifugation at 5000-10000 RPM before use. Removes: water (source of corrosion and steam explosion at injection), sludge, impurities. Inline purifier running 24/7. Sludge → sludge tank. Double purification: purifier + clarifier for optimal result."},
    {q:"What is 'cavitation cracking' on cylinder liners?",opts:["A thermal crack","Erosion of the outer liner surface caused by cooling water vibration — mechanical phenomenon","Chemical corrosion","Normal wear"],correct:1,expl:"Cavitation on liners = micro-steam bubbles formed by vibration that violently collapse on metal surface → metal tearing → progressive perforation. Prevention: corrosion inhibitors in cooling water, maintain correct DCA (Diesel Coolant Additive) concentration. Detection: slight water loss, fresh water analysis."},
    {q:"What is 'scavenging air pressure'?",opts:["Air pressure in engine room","Compressed air pressure pushed into cylinders by turbocharger to purge burnt gases and charge with fresh air","Air conditioning pressure","Starting air pressure"],correct:1,expl:"Scavenging air = pressurized air (0.3-2.5 bar depending on engine) supplied by turbocharger + blower into 2-stroke cylinders. Replaces burnt gases with fresh air. Low pressure → black smoke. Monitored by scavenging air pressure gauge in engine room."},
    {q:"What is engine 'derating'?",opts:["A power increase","Deliberate reduction of maximum engine power to improve service life, reduce consumption and emissions","A type of breakdown","A starting procedure"],correct:1,expl:"Derating = reduction of maximum engine power (e.g. 85% MCR instead of 100%). Advantages: improves component service life, reduces fuel consumption, reduces NOx emissions, adapts engine to less energetic LSFO fuel. Practiced as part of slow steaming and IMO 2020."},
    {q:"What is engine 'running-in' after overhaul?",opts:["A full power test","Progressive recommissioning procedure after major overhaul — gradual load increase to allow new parts to bed in","A safety test","A starting test"],correct:1,expl:"Running-in = bedding-in after major overhaul (piston, ring, liner, bearing replacement). Procedure: start at reduced load (20-30%), progressive increase over 24-72h in steps (50%, 75%, 100%). New parts have micro-roughness that gradually eliminates. Without running-in = premature wear."},
    {q:"What is a 'heat crack' on a cylinder head?",opts:["An impact crack","Crack caused by repeated thermal expansion/contraction cycles — detected by dye penetrant testing","A corrosion crack","A vibration crack"],correct:1,expl:"Heat cracks = cracks caused by repeated thermal cycles (start/stop). Located: between valve seats, around injectors. Detection: dye penetrant test (penetrant testing) during overhauls. If cracked → mandatory cylinder head replacement. Prevention: respect warm-up and cool-down times."},
    {q:"What is turbocharger 'water washing'?",opts:["External turbo cleaning","In-service cleaning of the turbine rotor exhaust side by water injection to remove carbon deposits — improves efficiency","Turbo cooling","A leak test"],correct:1,expl:"Water washing turbo = in-service cleaning of turbine rotor by injecting fresh water (5-10 liters) or cleaning solution. Removes carbon and salt deposits. Improves turbo efficiency (up to +3% engine power). Frequency: per operating conditions. Must be done at reduced load."},
    {q:"What is 'borescope inspection' of an engine?",opts:["An external inspection","Internal visual inspection of cylinders and combustion chambers by introducing a camera without dismantling","A pressure test","An electrical inspection"],correct:1,expl:"Borescope = flexible scope with miniature camera. Allows inspection of cylinder interiors, valve and piston condition WITHOUT engine disassembly. Detects: carbon deposits, scratches, cracks, injector condition in situ. Significant time saving vs complete disassembly."},
    {q:"What is 'tightening torque'?",opts:["Tightening speed","Torque value prescribed by manufacturer for each bolt/nut — ensures sealing and prevents breakage","Type of wrench to use","Tightening duration"],correct:1,expl:"Tightening torque = torsion force applied to a bolt/nut, measured in Newton-meters (Nm). Manufacturer-prescribed value. Too tight → thread failure. Too loose → leak, loosening. Tool: torque wrench. Critical for: cylinder head bolts, bearing bolts, connecting rod bolts."},
    {q:"What is 'galvanic corrosion' on a vessel?",opts:["Ordinary rust","Electrochemical corrosion between two different metals in contact in an electrolyte (sea water) — protected by sacrificial anodes","Chemical rust","Friction corrosion"],correct:1,expl:"Galvanic corrosion = electrochemical reaction between two metals with different potentials (e.g. bronze propeller + steel hull) in electrolyte (sea water). Less noble metal dissolves. Protection: zinc or aluminum anodes (sacrificial) fixed on hull and propeller → anode corrodes instead of metal to protect."},
  ],
  es:[
    {q:"¿Qué es el 'análisis de aceite por espectrometría'?",opts:["Una inspección visual del aceite","Análisis en laboratorio que detecta trazas de metales de desgaste en el aceite — predice los fallos antes de que sean catastróficos","Un análisis del color del aceite","Un test de viscosidad simple"],correct:1,expl:"Espectrometría = técnica de análisis de aceite en laboratorio. Detecta: hierro (desgaste cilindros/pistones), cobre (desgaste cojinetes de biela), aluminio (desgaste pistones), cromo (segmentos). Permite prever un fallo 200-500h antes de la avería. Análisis cada 500h + cuando se detectan anomalías."},
    {q:"¿Qué es un 'cojinete de cabeza de biela' (connecting rod bearing)?",opts:["Una pieza decorativa","Cojinete situado en la cabeza de biela que une pistón y cigüeñal — lubricado permanentemente, desgaste crítico","Un tipo de junta","El soporte del pistón"],correct:1,expl:"Cojinete de cabeza de biela = pieza semicircular de aleación (metal de Babbit) entre la cabeza de biela y el muñón del cigüeñal. Lubricado permanentemente con aceite a presión. Juego nominal: 0,05-0,15mm. Desgaste excesivo → ruido de golpeteo → rotura catastrófica. Sustitución planificada cada 5000-8000h."},
    {q:"¿Qué es la 'inspección del cárter' (crankcase inspection)?",opts:["Una inspección externa del motor","Inspección interior del cárter del motor para verificar el estado de los cojinetes, segmentos, bielas — hecha con motor frío y parado","Un test de compresión","Una verificación de niveles"],correct:1,expl:"Inspección del cárter = inspección interior del cárter (motor parado, enfriado). Verifica: estado de cojinetes, juegos de biela, estado de segmentos, trazas de desgaste anormal, contaminación del aceite, trazas de agua. Obligatoria según PMS y ante cada anomalía detectada."},
    {q:"¿Qué es el 'turbocharger surging' (pompeo del turbocompresor)?",opts:["Un exceso de velocidad del turbo","Fenómeno de pompeo del turbocompresor — oscilaciones irregulares del caudal de aire, ruido característico","Un fallo total del turbo","Un exceso de presión de admisión"],correct:1,expl:"Turbocharger surging = pompeo del turbo. Causas: filtro de aire obstruido, carga del motor muy reducida, combustible de mala calidad. Síntomas: ruido rítmico sordo del turbo, humo negro intermitente. Acciones: verificar filtro de aire, aumentar ligeramente la carga, limpiar el turbo si es recurrente."},
    {q:"¿Qué es un 'test de compresión' en un cilindro?",opts:["Un test de presión de inyección","Test que mide la presión de compresión en el cilindro — detecta fugas de segmentos o válvulas","Un test de presión de aceite","Un test de presión de agua"],correct:1,expl:"Test de compresión = medida de la presión máxima en el cilindro durante el ciclo de compresión. Presión normal: 30-45 bar. Presión baja → segmentos gastados o válvulas que no cierran bien. Usado para diagnosticar pérdida de potencia o consumo excesivo de aceite."},
    {q:"¿Qué es la 'purificación del combustible' (fuel oil purification)?",opts:["Un tipo de combustible","Proceso de centrifugación del HFO para eliminar agua e impurezas antes de la inyección en el motor","Un test de calidad de combustible","Un simple filtro"],correct:1,expl:"Purificación del combustible = centrifugación del HFO a 5000-10000 RPM antes de su uso. Elimina: agua, lodos, impurezas. Purificador en línea 24h/24. Lodos → tanque de lodos. Doble purificación: purificador + clarificador para resultado óptimo."},
    {q:"¿Qué son las 'fisuras por cavitación' en las camisas de cilindro?",opts:["Una fisura térmica","Erosión de la superficie exterior de las camisas causada por la vibración del agua de refrigeración — fenómeno mecánico","Corrosión química","Desgaste normal"],correct:1,expl:"Cavitación en camisas = micro-burbujas de vapor formadas por vibración que colapsan violentamente en la superficie metálica → arranque de metal → perforación progresiva. Prevención: inhibidores de corrosión en el agua de refrigeración, mantener concentración correcta de DCA."},
    {q:"¿Qué es la 'presión de aire de barrido' (scavenging air pressure)?",opts:["La presión del aire en la sala de máquinas","La presión del aire comprimido impulsado en los cilindros por el turbocompresor para evacuar los gases quemados y cargar con aire fresco","La presión del aire acondicionado","La presión del aire de arranque"],correct:1,expl:"Aire de barrido = aire a presión (0,3-2,5 bar según el motor) suministrado por el turbocompresor + soplante a los cilindros de 2 tiempos. Reemplaza los gases quemados con aire fresco. Presión baja → humo negro. Vigilado por manómetro de aire de barrido en sala de máquinas."},
    {q:"¿Qué es el 'derating' de un motor marino?",opts:["Un aumento de potencia","Reducción deliberada de la potencia máxima del motor para mejorar la durabilidad, reducir el consumo y las emisiones","Un tipo de avería","Un procedimiento de arranque"],correct:1,expl:"Derating = reducción de la potencia máxima del motor (ej: 85% MCR en lugar del 100%). Ventajas: mejora la durabilidad de los componentes, reduce el consumo de combustible, reduce las emisiones NOx, adapta el motor al combustible LSFO menos energético."},
    {q:"¿Qué es el 'running-in' (rodaje) de un motor tras una revisión?",opts:["Un test a plena potencia","Procedimiento de puesta en servicio progresivo tras revisión mayor — aumento de carga por etapas para permitir que las nuevas piezas se asienten","Un test de seguridad","Un test de arranque"],correct:1,expl:"Running-in = rodaje tras revisión mayor. Procedimiento: arranque a carga reducida (20-30%), aumento progresivo en 24-72h por etapas (50%, 75%, 100%). Las piezas nuevas tienen micro-rugosidades que se eliminan progresivamente. Sin rodaje = desgaste prematuro."},
    {q:"¿Qué es una 'fisura térmica' (heat crack) en una culata?",opts:["Una fisura por impacto","Fisura causada por los ciclos repetidos de dilatación/contracción térmica — detectada por ensayo de penetración","Una fisura de corrosión","Una fisura de vibración"],correct:1,expl:"Fisuras térmicas = fisuras causadas por ciclos térmicos repetidos (arranque/parada). Localizadas entre asientos de válvulas, alrededor de los inyectores. Detección: ensayo de penetración en revisiones. Si fisura → sustitución culata obligatoria. Prevención: respetar tiempos de precalentamiento y enfriamiento."},
    {q:"¿Qué es el 'water washing' del turbocompresor?",opts:["La limpieza externa del turbo","Limpieza en marcha del rotor de la turbina (lado gases de escape) por inyección de agua para eliminar depósitos de carbono — mejora el rendimiento","El enfriamiento del turbo","Un test de estanqueidad"],correct:1,expl:"Water washing turbo = limpieza en funcionamiento del rotor turbina por inyección de agua dulce (5-10 litros). Elimina depósitos de carbono y sal. Mejora el rendimiento del turbo (hasta +3% de potencia del motor). Frecuencia: según condiciones de explotación. Debe realizarse a carga reducida."},
    {q:"¿Qué es la inspección por 'endoscopio' (boroscopio) de un motor?",opts:["Una inspección externa","Inspección visual interna de los cilindros y cámaras de combustión introduciendo una cámara sin desmontaje","Un test de presión","Una inspección eléctrica"],correct:1,expl:"Endoscopio = boroscopio flexible con cámara miniatura. Permite inspeccionar el interior de los cilindros, el estado de las válvulas y los pistones SIN desmontar el motor. Detecta: depósitos de carbono, rayaduras, fisuras, estado de los inyectores in situ."},
    {q:"¿Qué es el 'par de apriete' (tightening torque)?",opts:["La velocidad de apriete","Valor del par de apriete prescrito por el fabricante para cada tornillo/tuerca — garantiza la estanqueidad y evita la rotura","El tipo de llave a usar","La duración del apriete"],correct:1,expl:"Par de apriete = fuerza de torsión aplicada a un tornillo/tuerca, medida en Newton-metros (Nm). Valor prescrito por el fabricante. Demasiado apretado → rotura del roscado. Demasiado flojo → fuga, aflojamiento. Herramienta: llave dinamométrica. Crítico para: tornillos de culata, tornillos de cojinete, tornillos de biela."},
    {q:"¿Qué es la 'corrosión galvánica' a bordo de un buque?",opts:["La oxidación ordinaria","Corrosión electroquímica entre dos metales distintos en contacto en un electrólito (agua de mar) — protegida por ánodos de sacrificio","Una oxidación química","Una corrosión por fricción"],correct:1,expl:"Corrosión galvánica = reacción electroquímica entre dos metales de potenciales diferentes en presencia de electrólito (agua de mar). El metal menos noble se disuelve. Protección: ánodos de zinc o aluminio (sacrificio) fijados en el casco y la hélice → el ánodo se corroe en lugar del metal a proteger."},
  ],
  pt:[
    {q:"O que é a 'análise de óleo por espectrometria'?",opts:["Uma inspeção visual do óleo","Análise em laboratório que deteta traços de metais de desgaste no óleo — prevê falhas antes de se tornarem catastróficas","Uma análise da cor do óleo","Um teste de viscosidade simples"],correct:1,expl:"Espectrometria = técnica de análise de óleo em laboratório. Deteta: ferro (desgaste cilindros/pistões), cobre (desgaste mancais de biela), alumínio (desgaste pistões), cromo (segmentos). Permite prever uma falha 200-500h antes da avaria. Análise a cada 500h + quando se detetam anomalias."},
    {q:"O que é um 'mancal de cabeça de biela' (connecting rod bearing)?",opts:["Uma peça decorativa","Mancal situado na cabeça de biela que liga o pistão ao virabrequim — lubrificado permanentemente, desgaste crítico","Um tipo de junta","O suporte do pistão"],correct:1,expl:"Mancal de cabeça de biela = peça semicircular de liga (metal de Babbit) entre a cabeça de biela e o pino do virabrequim. Lubrificado permanentemente com óleo sob pressão. Folga nominal: 0,05-0,15mm. Desgaste excessivo → ruído de batida → rotura catastrófica. Substituição planeada cada 5000-8000h."},
    {q:"O que é uma 'inspeção do cárter' (crankcase inspection)?",opts:["Uma inspeção externa do motor","Inspeção interior do cárter do motor para verificar o estado dos mancais, segmentos, bielas — feita com motor frio e parado","Um teste de compressão","Uma verificação de níveis"],correct:1,expl:"Inspeção do cárter = inspeção interior do cárter (motor parado, arrefecido). Verifica: estado dos mancais, folgas de biela, estado dos segmentos, traços de desgaste anormal, contaminação do óleo, traços de água. Obrigatória segundo PMS e a cada anomalia detetada."},
    {q:"O que é o 'turbocharger surging' (pompagem do turbocompressor)?",opts:["Um excesso de velocidade do turbo","Fenómeno de pompagem do turbocompressor — oscilações irregulares do caudal de ar, ruído característico","Uma falha total do turbo","Um excesso de pressão de admissão"],correct:1,expl:"Turbocharger surging = pompagem do turbo. Causas: filtro de ar obstruído, carga do motor muito reduzida, combustível de má qualidade. Sintomas: ruído rítmico surdo do turbo, fumo preto intermitente. Ações: verificar filtro de ar, aumentar ligeiramente a carga, limpar o turbo se recorrente."},
    {q:"O que é um 'teste de compressão' num cilindro?",opts:["Um teste de pressão de injeção","Teste que mede a pressão de compressão no cilindro — deteta fugas de segmentos ou válvulas","Um teste de pressão de óleo","Um teste de pressão de água"],correct:1,expl:"Teste de compressão = medida da pressão máxima no cilindro durante o ciclo de compressão. Pressão normal: 30-45 bar. Pressão baixa → segmentos gastos ou válvulas que não fecham bem. Usado para diagnosticar perda de potência ou consumo excessivo de óleo."},
    {q:"O que é a 'purificação do combustível' (fuel oil purification)?",opts:["Um tipo de combustível","Processo de centrifugação do HFO para eliminar água e impurezas antes da injeção no motor","Um teste de qualidade de combustível","Um filtro simples"],correct:1,expl:"Purificação do combustível = centrifugação do HFO a 5000-10000 RPM antes da utilização. Elimina: água, lamas, impurezas. Purificador em linha 24h/24. Lamas → tanque de lamas. Dupla purificação: purificador + clarificador para resultado ótimo."},
    {q:"O que são as 'fissuras de cavitação' nas camisas de cilindro?",opts:["Uma fissura térmica","Erosão da superfície exterior das camisas causada pela vibração da água de arrefecimento — fenómeno mecânico","Corrosão química","Desgaste normal"],correct:1,expl:"Cavitação em camisas = micro-bolhas de vapor formadas por vibração que colapsam violentamente na superfície metálica → arranque de metal → perfuração progressiva. Prevenção: inibidores de corrosão na água de arrefecimento, manter concentração correta de DCA."},
    {q:"O que é a 'pressão de ar de varrimento' (scavenging air pressure)?",opts:["A pressão do ar na sala de máquinas","A pressão do ar comprimido empurrado para os cilindros pelo turbocompressor para evacuar os gases queimados e carregar com ar fresco","A pressão do ar condicionado","A pressão do ar de arranque"],correct:1,expl:"Ar de varrimento = ar sob pressão (0,3-2,5 bar consoante o motor) fornecido pelo turbocompressor + soprador aos cilindros de 2 tempos. Substitui os gases queimados por ar fresco. Pressão baixa → fumo preto. Monitorizado por manómetro de ar de varrimento na sala de máquinas."},
    {q:"O que é o 'derating' de um motor marítimo?",opts:["Um aumento de potência","Redução deliberada da potência máxima do motor para melhorar a durabilidade, reduzir o consumo e as emissões","Um tipo de avaria","Um procedimento de arranque"],correct:1,expl:"Derating = redução da potência máxima do motor (ex: 85% MCR em vez de 100%). Vantagens: melhora a durabilidade dos componentes, reduz o consumo de combustível, reduz as emissões NOx, adapta o motor ao combustível LSFO menos energético."},
    {q:"O que é o 'running-in' (rodagem) de um motor após revisão?",opts:["Um teste a plena potência","Procedimento de colocação em serviço progressiva após revisão maior — aumento de carga por etapas para permitir que as novas peças se assentem","Um teste de segurança","Um teste de arranque"],correct:1,expl:"Running-in = rodagem após revisão maior. Procedimento: arranque a carga reduzida (20-30%), aumento progressivo em 24-72h por etapas (50%, 75%, 100%). As peças novas têm micro-rugosidades que se eliminam progressivamente. Sem rodagem = desgaste prematuro."},
    {q:"O que é uma 'fissura térmica' (heat crack) numa cabeça de cilindro?",opts:["Uma fissura por impacto","Fissura causada pelos ciclos repetidos de dilatação/contração térmica — detetada por ensaio de penetração","Uma fissura de corrosão","Uma fissura de vibração"],correct:1,expl:"Fissuras térmicas = fissuras causadas por ciclos térmicos repetidos (arranque/paragem). Localizadas entre sedes de válvulas, à volta dos injetores. Deteção: ensaio de penetração em revisões. Se fissura → substituição obrigatória da cabeça. Prevenção: respeitar tempos de pré-aquecimento e arrefecimento."},
    {q:"O que é o 'water washing' do turbocompressor?",opts:["A limpeza externa do turbo","Limpeza em funcionamento do rotor da turbina (lado gases de escape) por injeção de água para eliminar depósitos de carbono — melhora o rendimento","O arrefecimento do turbo","Um teste de estanqueidade"],correct:1,expl:"Water washing turbo = limpeza em funcionamento do rotor turbina por injeção de água doce (5-10 litros). Elimina depósitos de carbono e sal. Melhora o rendimento do turbo (até +3% de potência do motor). Frequência: segundo condições de exploração. Deve ser feito a carga reduzida."},
    {q:"O que é a inspeção por 'endoscópio' (boroscópio) de um motor?",opts:["Uma inspeção externa","Inspeção visual interna dos cilindros e câmaras de combustão introduzindo uma câmara sem desmontagem","Um teste de pressão","Uma inspeção elétrica"],correct:1,expl:"Endoscópio = boroscópio flexível com câmara miniatura. Permite inspecionar o interior dos cilindros, o estado das válvulas e pistões SEM desmontar o motor. Deteta: depósitos de carbono, riscos, fissuras, estado dos injetores in situ."},
    {q:"O que é o 'binário de aperto' (tightening torque)?",opts:["A velocidade de aperto","Valor de binário de aperto prescrito pelo fabricante para cada parafuso/porca — garante a estanqueidade e evita a rotura","O tipo de chave a usar","A duração do aperto"],correct:1,expl:"Binário de aperto = força de torção aplicada a um parafuso/porca, medida em Newton-metros (Nm). Valor prescrito pelo fabricante. Demasiado apertado → rotura do rosqueado. Demasiado solto → fuga, desapertamento. Ferramenta: chave dinamométrica. Crítico para: parafusos de cabeça, parafusos de mancal, parafusos de biela."},
    {q:"O que é a 'corrosão galvânica' a bordo de um navio?",opts:["Ferrugem comum","Corrosão eletroquímica entre dois metais diferentes em contacto num eletrólito (água do mar) — protegida por ânodos de sacrifício","Ferrugem química","Corrosão por fricção"],correct:1,expl:"Corrosão galvânica = reação eletroquímica entre dois metais de potenciais diferentes em presença de eletrólito (água do mar). O metal menos nobre dissolve-se. Proteção: ânodos de zinco ou alumínio (sacrifício) fixados no casco e na hélice → o ânodo corrói-se em vez do metal a proteger."},
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
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.orange},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.orange},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.orange}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.orange}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.orange,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.orange:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d = {
    fr:{
      badge:"🔧 Module Machine · Leçon 6/8 · ⭐ Premium · 200 XP",
      title:"Maintenance & Troubleshooting — Entretien et Diagnostic",
      intro:"Un officier mécanicien ne répare pas seulement les pannes — il les PRÉVIENT. La maintenance préventive est ce qui sépare les navires fiables des navires qui tombent en panne en mer.\n\nCette leçon couvre le diagnostic des pannes (fumées, vibrations), le PMS, les pièces de rechange critiques et le simulateur de dépannage.",
      p1:"PARTIE 1 — DIAGNOSTIC DES PANNES",s1t:"Couleurs de fumée · Vibrations · Surchauffe · Pression huile",
      s1:"DIAGNOSTIC PAR LA FUMÉE :\nFumée NOIRE → manque d'air · turbo · injecteurs\nFumée BLANCHE → eau · moteur froid · joint culasse\nFumée BLEUE → huile brûlée · segments usés\n\nAUTRES SYMPTÔMES :\nVibrations → hélice · cylindre · paliers\nSurchauffe → circuit refroidissement\nPression huile basse → niveau · pompe · filtre\n\nMÉTHODE DE DIAGNOSTIC :\n1. Observer → identifier le symptôme\n2. Analyser → trouver la cause probable\n3. Tester → confirmer le diagnostic\n4. Corriger → appliquer la solution\n5. Consigner → journaliser dans le log machine",
      p2:"PARTIE 2 — PLAN DE MAINTENANCE (PMS)",s2t:"Tâches quotidiennes · hebdomadaires · mensuelles · annuelles",
      s2:"PMS = Planned Maintenance System\nObligatoire Code ISM (SOLAS Chapitre IX)\n\nFRÉQUENCES CLÉS :\nQuotidien : niveaux · fuites · paramètres\nHebdomadaire : test groupe secours · extincteurs · filtres\nMensuel : analyse huile · test EPIRB · exercice incendie\nAnnuel : révision moteur · inspection fond · HRU radeaux\n\nANALYSE D'HUILE :\nToutes les 500 heures d'utilisation\nDétecte : fer (cylindres), cuivre (paliers),\naluminium (pistons) → prédit les avaries\n\nFIDÉLITÉ AU PMS :\n⚠️ Non-respect = ISM audit négatif\n⚠️ Non-respect = avaries coûteuses\n⚠️ Non-respect = détention PSC",
      p3:"PARTIE 3 — PIÈCES & OUTILLAGE",s3t:"Pièces critiques · Consommables · Outils spéciaux",
      s3:"PIÈCES CRITIQUES (OBLIGATOIRES SOLAS) :\nSans elles → arrêt du navire\nSegments · Injecteurs · Pompe huile · Joints culasse\nPompe eau de mer · Fusibles principaux · HRU\n\nPIÈCES COURANTES :\nFiltres · Joints O-rings · Huile · Courroies\n\nOUTILLAGE SPÉCIAL :\nClé dynamométrique · Extracteur roulements\nEndoscope · Mégohmmètre · Micromètre\n\nGESTION DES STOCKS :\nInventaire mensuel obligatoire\nRéapprovisionnement aux escales\nFiche de stock pour chaque pièce critique",
      p4:"PARTIE 4 — SIMULATEUR DE DÉPANNAGE",s4t:"Scénario interactif : alarme température haute",
      s4:"MÉTHODE DE RÉSOLUTION :\n1. IDENTIFIER → Quelle alarme ? Quel paramètre ?\n2. LOCALISER → Quel composant est probable ?\n3. TESTER → Vérification rapide sur place\n4. AGIR → Solution immédiate\n5. ESCALADER → Si dépassé : chef mécanicien\n6. CONSIGNER → Toujours dans le journal\n\nSEUILS CRITIQUES :\nTemp. eau > 90°C → RÉDUIRE CHARGE\nTemp. eau > 95°C → ARRÊT MOTEUR\nPression huile < 2,5 bars → ALARME\nPression huile < 2 bars → ARRÊT AUTO",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 6 MACHINE",
      sumP:["Fumée noire = manque air · turbo · injecteurs","Fumée bleue = huile brûlée · segments usés","Fumée blanche = eau · moteur froid · joint culasse","PMS = Planned Maintenance System · obligatoire ISM","Analyse huile toutes les 500h · détecte usures","Pièces critiques obligatoires à bord (SOLAS/Class)","Diagnostic : observer → analyser → tester → corriger → consigner","MV Stellar Banner : maintenance non respectée → panne en mer"],
      learnedP:["Diagnostic fumées : noir·blanc·bleu + causes","PMS obligatoire ISM · tâches quotidiennes à annuelles","Analyse huile 500h · pièces critiques SOLAS","Simulateur dépannage · méthode 5 étapes","Maintenance préventive < réparation urgence en mer"],
    },
    en:{
      badge:"🔧 Engine Module · Lesson 6/8 · ⭐ Premium · 200 XP",
      title:"Maintenance & Troubleshooting",
      intro:"An engineer officer doesn't just fix breakdowns — they PREVENT them. Preventive maintenance is what separates reliable vessels from vessels that break down at sea.\n\nThis lesson covers fault diagnosis (smoke, vibrations), PMS, critical spare parts and the troubleshooting simulator.",
      p1:"PART 1 — FAULT DIAGNOSIS",s1t:"Smoke colors · Vibrations · Overheating · Oil pressure",
      s1:"SMOKE DIAGNOSIS:\nBLACK smoke → air starvation · turbo · injectors\nWHITE smoke → water · cold engine · head gasket\nBLUE smoke → oil burning · worn rings\n\nOTHER SYMPTOMS:\nVibrations → propeller · cylinder · bearings\nOverheating → cooling circuit\nLow oil pressure → level · pump · filter\n\nDIAGNOSIS METHOD:\n1. Observe → identify symptom\n2. Analyze → find probable cause\n3. Test → confirm diagnosis\n4. Correct → apply solution\n5. Log → record in engine log",
      p2:"PART 2 — MAINTENANCE PLAN (PMS)",s2t:"Daily · weekly · monthly · annual tasks",
      s2:"PMS = Planned Maintenance System\nMandatory ISM Code (SOLAS Chapter IX)\n\nKEY FREQUENCIES:\nDaily: levels · leaks · parameters\nWeekly: emergency gen test · extinguishers · filters\nMonthly: oil analysis · EPIRB test · fire drill\nAnnual: engine overhaul · bottom inspection · liferaft HRU\n\nOIL ANALYSIS:\nEvery 500 operating hours\nDetects: iron (cylinders), copper (bearings),\naluminum (pistons) → predicts breakdowns\n\nPMS COMPLIANCE:\n⚠️ Non-compliance = negative ISM audit\n⚠️ Non-compliance = costly breakdowns\n⚠️ Non-compliance = PSC detention",
      p3:"PART 3 — PARTS & TOOLS",s3t:"Critical parts · Consumables · Special tools",
      s3:"CRITICAL PARTS (SOLAS MANDATORY):\nWithout them → vessel stops\nRings · Injectors · Oil pump · Head gaskets\nSea water pump · Main fuses · HRU\n\nROUTINE PARTS:\nFilters · O-rings · Oil · Belts\n\nSPECIAL TOOLS:\nTorque wrench · Bearing extractor\nBorescope · Megohmmeter · Micrometer\n\nSTOCK MANAGEMENT:\nMonthly inventory mandatory\nReplenishment at port calls\nStock card for each critical part",
      p4:"PART 4 — TROUBLESHOOTING SIMULATOR",s4t:"Interactive scenario: high temperature alarm",
      s4:"RESOLUTION METHOD:\n1. IDENTIFY → Which alarm? Which parameter?\n2. LOCATE → Which component is probable?\n3. TEST → Quick on-site check\n4. ACT → Immediate solution\n5. ESCALATE → If beyond scope: chief engineer\n6. LOG → Always in engine log\n\nCRITICAL THRESHOLDS:\nWater temp > 90°C → REDUCE LOAD\nWater temp > 95°C → STOP ENGINE\nOil pressure < 2.5 bar → ALARM\nOil pressure < 2 bar → AUTO STOP",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — ENGINE LESSON 6",
      sumP:["Black smoke = air starvation · turbo · injectors","Blue smoke = oil burning · worn rings","White smoke = water · cold engine · head gasket","PMS = Planned Maintenance System · mandatory ISM","Oil analysis every 500h · detects wear","Critical spare parts mandatory on board (SOLAS/Class)","Diagnosis: observe → analyze → test → correct → log","MV Stellar Banner: maintenance not followed → breakdown at sea"],
      learnedP:["Smoke diagnosis: black·white·blue + causes","PMS mandatory ISM · daily to annual tasks","Oil analysis 500h · critical SOLAS parts","Troubleshooting simulator · 5-step method","Preventive maintenance < emergency repair at sea"],
    },
    es:{
      badge:"🔧 Módulo Máquinas · Lección 6/8 · ⭐ Premium · 200 XP",
      title:"Mantenimiento & Resolución de Averías",
      intro:"Un oficial de máquinas no solo repara averías — las PREVIENE. El mantenimiento preventivo es lo que separa los buques fiables de los que se averían en el mar.",
      p1:"PARTE 1 — DIAGNÓSTICO DE AVERÍAS",s1t:"Colores de humo · Vibraciones · Recalentamiento · Presión aceite",
      s1:"DIAGNÓSTICO POR EL HUMO:\nHumo NEGRO → falta de aire · turbo · inyectores\nHumo BLANCO → agua · motor frío · junta culata\nHumo AZUL → aceite quemado · segmentos gastados\n\nMÉTODO:\n1. Observar → 2. Analizar → 3. Probar → 4. Corregir → 5. Registrar",
      p2:"PARTE 2 — PLAN DE MANTENIMIENTO (PMS)",s2t:"Tareas diarias · semanales · mensuales · anuales",
      s2:"PMS = Sistema de Mantenimiento Planificado\nObligatorio Código ISM (SOLAS Capítulo IX)\n\nANÁLISIS DE ACEITE:\nCada 500 horas de uso\nDetecta: hierro (cilindros) · cobre (cojinetes) · aluminio (pistones)",
      p3:"PARTE 3 — REPUESTOS Y HERRAMIENTAS",s3t:"Piezas críticas · Consumibles · Herramientas especiales",
      s3:"PIEZAS CRÍTICAS (SOLAS OBLIGATORIAS):\nSegmentos · Inyectores · Bomba aceite · Juntas culata\nBomba agua mar · Fusibles principales · ULH\n\nHERRAMIENTAS: Llave dinamométrica · Endoscopio · Micrómetro",
      p4:"PARTE 4 — SIMULADOR DE RESOLUCIÓN",s4t:"Escenario interactivo: alarma temperatura alta",
      s4:"UMBRALES CRÍTICOS:\nTemp. agua > 90°C → REDUCIR CARGA\nTemp. agua > 95°C → PARAR MOTOR\nPresión aceite < 2,5 bar → ALARMA\nPresión aceite < 2 bar → PARADA AUTOMÁTICA",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 6 MÁQUINAS",
      sumP:["Humo negro = falta aire · turbo · inyectores","Humo azul = aceite quemado · segmentos gastados","Humo blanco = agua · motor frío · junta culata","PMS = Sistema Mantenimiento Planificado · obligatorio ISM","Análisis aceite cada 500h · detecta desgastes","Piezas críticas obligatorias a bordo (SOLAS/Clase)","Diagnóstico: observar → analizar → probar → corregir → registrar"],
      learnedP:["Diagnóstico humos: negro·blanco·azul + causas","PMS obligatorio ISM · tareas diarias a anuales","Análisis aceite 500h · piezas críticas SOLAS","Simulador averías · método 5 pasos"],
    },
    pt:{
      badge:"🔧 Módulo Máquinas · Lição 6/8 · ⭐ Premium · 200 XP",
      title:"Manutenção & Diagnóstico de Avarias",
      intro:"Um oficial de máquinas não só repara avarias — PREVINE-as. A manutenção preventiva é o que separa os navios fiáveis dos navios que avariam no mar.",
      p1:"PARTE 1 — DIAGNÓSTICO DE AVARIAS",s1t:"Cores de fumo · Vibrações · Sobreaquecimento · Pressão óleo",
      s1:"DIAGNÓSTICO PELO FUMO:\nFumo PRETO → falta de ar · turbo · injetores\nFumo BRANCO → água · motor frio · junta cabeça\nFumo AZUL → óleo a queimar · segmentos gastos\n\nMÉTODO:\n1. Observar → 2. Analisar → 3. Testar → 4. Corrigir → 5. Registar",
      p2:"PARTE 2 — PLANO DE MANUTENÇÃO (PMS)",s2t:"Tarefas diárias · semanais · mensais · anuais",
      s2:"PMS = Sistema de Manutenção Planeada\nObrigatório Código ISM (SOLAS Capítulo IX)\n\nANÁLISE DE ÓLEO:\nA cada 500 horas de uso\nDeteta: ferro (cilindros) · cobre (mancais) · alumínio (pistões)",
      p3:"PARTE 3 — PEÇAS E FERRAMENTAS",s3t:"Peças críticas · Consumíveis · Ferramentas especiais",
      s3:"PEÇAS CRÍTICAS (SOLAS OBRIGATÓRIAS):\nSegmentos · Injetores · Bomba óleo · Juntas cabeça\nBomba água mar · Fusíveis principais · ULH\n\nFERRAMENTAS: Chave dinamométrica · Endoscópio · Micrómetro",
      p4:"PARTE 4 — SIMULADOR DE DIAGNÓSTICO",s4t:"Cenário interativo: alarme temperatura alta",
      s4:"LIMIARES CRÍTICOS:\nTemp. água > 90°C → REDUZIR CARGA\nTemp. água > 95°C → PARAR MOTOR\nPressão óleo < 2,5 bar → ALARME\nPressão óleo < 2 bar → PARAGEM AUTOMÁTICA",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 6 MÁQUINAS",
      sumP:["Fumo preto = falta ar · turbo · injetores","Fumo azul = óleo a queimar · segmentos gastos","Fumo branco = água · motor frio · junta cabeça","PMS = Sistema Manutenção Planeada · obrigatório ISM","Análise óleo cada 500h · deteta desgastes","Peças críticas obrigatórias a bordo (SOLAS/Classe)","Diagnóstico: observar → analisar → testar → corrigir → registar"],
      learnedP:["Diagnóstico fumos: preto·branco·azul + causas","PMS obrigatório ISM · tarefas diárias a anuais","Análise óleo 500h · peças críticas SOLAS","Simulador avarias · método 5 passos"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonMaintenance({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#0a0f1a 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.orange}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.orange,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🔧 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 6/8":lang==="en"?"Lesson 6/8":lang==="es"?"Lección 6/8":"Lição 6/8"}</div>
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
            <SL icon="🔍" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔍 {lang==="fr"?"DIAGNOSTIC PANNES — INTERACTIF":lang==="en"?"FAULT DIAGNOSIS — INTERACTIVE":lang==="es"?"DIAGNÓSTICO AVERÍAS — INTERACTIVO":"DIAGNÓSTICO DE AVARIAS — INTERATIVO"}</div>
              <TroubleshootingSVG lang={lang}/>
            </Card>
            <SL icon="📅" text={lc.p2} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📅 {lang==="fr"?"PLAN DE MAINTENANCE (PMS)":lang==="en"?"MAINTENANCE PLAN (PMS)":lang==="es"?"PLAN DE MANTENIMIENTO (PMS)":"PLANO DE MANUTENÇÃO (PMS)"}</div>
              <MaintenancePlannerSVG lang={lang}/>
            </Card>
            <SL icon="🛠️" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🛠️ {lang==="fr"?"PIÈCES & OUTILLAGE — INTERACTIF":lang==="en"?"PARTS & TOOLS — INTERACTIVE":lang==="es"?"REPUESTOS Y HERRAMIENTAS — INTERACTIVO":"PEÇAS E FERRAMENTAS — INTERATIVO"}</div>
              <SparePartsSVG lang={lang}/>
            </Card>
            <SL icon="🎮" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎮 {lang==="fr"?"SIMULATEUR DÉPANNAGE":lang==="en"?"TROUBLESHOOTING SIMULATOR":lang==="es"?"SIMULADOR RESOLUCIÓN":"SIMULADOR DE RESOLUÇÃO"}</div>
              <DiagnosisSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(230,126,34,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Maintenance & Troubleshooting":lang==="en"?"Quiz — Maintenance & Troubleshooting":lang==="es"?"Quiz — Mantenimiento & Averías":"Quiz — Manutenção & Avarias"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 6":lang==="en"?"Lesson 6":lang==="es"?"Lección 6":"Lição 6"}</div>
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
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 7 — ENGINE WATCHKEEPING →":lang==="en"?"LESSON 7 — ENGINE WATCHKEEPING →":lang==="es"?"LECCIÓN 7 — ENGINE WATCHKEEPING →":"LIÇÃO 7 — ENGINE WATCHKEEPING →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
