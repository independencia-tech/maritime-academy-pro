// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", rust:"#8d3b2b",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module Machine", lessonNum:"Leçon 1/8", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer", prev:"Précédent", nextNav:"Suivant", bankNext:"SUIVANT →", bankFinish:"TERMINER", quizTitle:"Quiz — Moteur Diesel & Refroidissement", quizSub:"questions · Leçon 1 Machine", lesson2Btn:"LEÇON 2 — AUXILIAIRES & GÉNÉRATEURS →", cycleAnim:"CYCLE DIESEL — ANIMÉ", crossInter:"COUPE MOTEUR — INTERACTIF", coolInter:"CIRCUITS DE REFROIDISSEMENT — INTERACTIF", simParam:"SIMULATEUR PARAMÈTRES MOTEUR", lessonsLabel:"LEÇONS", normal:"Normal:", alarm:"Alarme:" },
  en:{ back:"◀ Back", module:"Engine Module", lessonNum:"Lesson 1/8", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide", prev:"Previous", nextNav:"Next", bankNext:"NEXT →", bankFinish:"FINISH", quizTitle:"Quiz — Diesel Engine & Cooling", quizSub:"questions · Engine Lesson 1", lesson2Btn:"LESSON 2 — AUXILIARIES & GENERATORS →", cycleAnim:"DIESEL CYCLE — ANIMATED", crossInter:"ENGINE CROSS-SECTION — INTERACTIVE", coolInter:"COOLING CIRCUITS — INTERACTIVE", simParam:"ENGINE PARAMETER SIMULATOR", lessonsLabel:"LESSONS", normal:"Normal:", alarm:"Alarm:" },
  es:{ back:"◀ Volver", module:"Módulo Máquinas", lessonNum:"Lección 1/8", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar", prev:"Anterior", nextNav:"Siguiente", bankNext:"SIGUIENTE →", bankFinish:"TERMINAR", quizTitle:"Quiz — Motor Diesel y Refrigeración", quizSub:"preguntas · Lección 1 Máquinas", lesson2Btn:"LECCIÓN 2 — AUXILIARES Y GENERADORES →", cycleAnim:"CICLO DIESEL — ANIMADO", crossInter:"SECCIÓN MOTOR — INTERACTIVO", coolInter:"CIRCUITOS DE REFRIGERACIÓN — INTERACTIVO", simParam:"SIMULADOR PARÁMETROS MOTOR", lessonsLabel:"LECCIONES", normal:"Normal:", alarm:"Alarma:" },
  pt:{ back:"◀ Voltar", module:"Módulo Máquinas", lessonNum:"Lição 1/8", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar", prev:"Anterior", nextNav:"Próximo", bankNext:"PRÓXIMO →", bankFinish:"TERMINAR", quizTitle:"Quiz — Motor Diesel e Arrefecimento", quizSub:"perguntas · Lição 1 Máquinas", lesson2Btn:"LIÇÃO 2 — AUXILIARES E GERADORES →", cycleAnim:"CICLO DIESEL — ANIMADO", crossInter:"SECÇÃO MOTOR — INTERATIVO", coolInter:"CIRCUITOS DE ARREFECIMENTO — INTERATIVO", simParam:"SIMULADOR PARÂMETROS MOTOR", lessonsLabel:"LIÇÕES", normal:"Normal:", alarm:"Alarme:" },
};

// ══════════════════════════════════════
// SVG 1 — 4-STROKE DIESEL CYCLE
// ══════════════════════════════════════
function DieselCycleSVG({ lang }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      id:"intake", icon:"⬇️",
      label:{fr:"1. Admission",en:"1. Intake",es:"1. Admisión",pt:"1. Admissão"},
      color:C.blue2,
      piston:75, valveIn:true, valveEx:false, fire:false,
      desc:{fr:"La soupape d'admission s'ouvre\nLe piston descend → aspire l'air\n(Diesel = air pur, pas de mélange)",en:"Intake valve opens\nPiston moves down → draws in air\n(Diesel = pure air, no mixture)",es:"La válvula de admisión se abre\nEl pistón baja → aspira aire\n(Diesel = aire puro, sin mezcla)",pt:"A válvula de admissão abre\nO pistão desce → aspira ar"}
    },
    {
      id:"compression", icon:"⬆️",
      label:{fr:"2. Compression",en:"2. Compression",es:"2. Compresión",pt:"2. Compressão"},
      color:C.orange,
      piston:20, valveIn:false, valveEx:false, fire:false,
      desc:{fr:"Toutes soupapes fermées\nPiston monte → comprime l'air\nRatio 14:1 à 25:1\nTempérature → 500-700°C !",en:"All valves closed\nPiston rises → compresses air\nRatio 14:1 to 25:1\nTemperature → 500-700°C!",es:"Todas válvulas cerradas\nEl pistón sube → comprime el aire\nRelación 14:1 a 25:1\nTemperatura → 500-700°C",pt:"Todas as válvulas fechadas\nO pistão sobe → comprime o ar\nRelação 14:1 a 25:1\nTemperatura → 500-700°C!"}
    },
    {
      id:"power", icon:"💥",
      label:{fr:"3. Combustion",en:"3. Power",es:"3. Combustión",pt:"3. Combustão"},
      color:C.red,
      piston:80, valveIn:false, valveEx:false, fire:true,
      desc:{fr:"Injection du carburant (HFO/MDO)\nL'air chaud enflamme le carburant\nExplosion → pousse le piston\nCe temps PRODUIT la puissance",en:"Fuel injection (HFO/MDO)\nHot air ignites the fuel\nExplosion → pushes piston down\nThis stroke PRODUCES power",es:"Inyección de combustible (HFO/MDO)\nEl aire caliente inflama el combustible\nExplosión → empuja el pistón\nEste tiempo PRODUCE potencia",pt:"Injeção de combustível (HFO/MDO)\nO ar quente inflama o combustível\nExplosão → empurra o pistão"}
    },
    {
      id:"exhaust", icon:"💨",
      label:{fr:"4. Échappement",en:"4. Exhaust",es:"4. Escape",pt:"4. Escape"},
      color:C.steel,
      piston:15, valveIn:false, valveEx:true, fire:false,
      desc:{fr:"Soupape d'échappement s'ouvre\nPiston monte → expulse les gaz brûlés\nGaz → turbocompresseur\nPuis → purification MARPOL",en:"Exhaust valve opens\nPiston rises → expels burnt gases\nGases → turbocharger\nThen → MARPOL purification",es:"La válvula de escape se abre\nEl pistón sube → expulsa los gases\nGases → turbocompresor\nLuego → purificación MARPOL",pt:"A válvula de escape abre\nO pistão sobe → expulsa os gases\nGases → turbocompressor"}
    },
  ];
  const s = steps[step];

  return (
    <div>
      {/* Step buttons */}
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {steps.map((st,i)=>(
          <button key={i} onClick={()=>setStep(i)} style={{
            flex:1,padding:"7px 2px",borderRadius:10,fontSize:9,cursor:"pointer",
            background:step===i?`${st.color}22`:"rgba(255,255,255,0.05)",
            border:`1.5px solid ${step===i?st.color:"rgba(255,255,255,0.1)"}`,
            color:step===i?st.color:C.muted,fontWeight:step===i?700:400,textAlign:"center",
          }}>
            {st.icon}<br/>{(st.label[lang]||st.label.fr).split(". ")[1]}
          </button>
        ))}
      </div>

      {/* Engine cylinder SVG */}
      <svg width="290" height="190" viewBox="0 0 290 190">
        <rect width="290" height="190" fill="#061020" rx="8"/>

        {/* Cylinder walls */}
        <rect x="95" y="20" width="100" height="140" fill="#0a1628" stroke={C.steel} strokeWidth="2" rx="2"/>
        <rect x="95" y="20" width="12" height="140" fill="#1a2a3a" stroke={C.steel} strokeWidth="1"/>
        <rect x="183" y="20" width="12" height="140" fill="#1a2a3a" stroke={C.steel} strokeWidth="1"/>

        {/* Intake valve */}
        <rect x="107" y="18" width="20" height="8" rx="3"
          fill={s.valveIn?"rgba(77,166,255,0.6)":"rgba(255,255,255,0.1)"}
          stroke={s.valveIn?C.blue2:"rgba(255,255,255,0.2)"} strokeWidth="1.5"/>
        <text x="117" y="14" textAnchor="middle" fontSize="6" fill={s.valveIn?C.blue2:C.muted}>
          {({fr:"Adm.",en:"In.",es:"Adm.",pt:"Adm."})[lang]||"Adm."}
        </text>

        {/* Exhaust valve */}
        <rect x="163" y="18" width="20" height="8" rx="3"
          fill={s.valveEx?"rgba(100,100,100,0.6)":"rgba(255,255,255,0.1)"}
          stroke={s.valveEx?C.steel:"rgba(255,255,255,0.2)"} strokeWidth="1.5"/>
        <text x="173" y="14" textAnchor="middle" fontSize="6" fill={s.valveEx?C.white:C.muted}>
          {({fr:"Éch.",en:"Ex.",es:"Esc.",pt:"Esc."})[lang]||"Éch."}
        </text>

        {/* Combustion chamber top */}
        <rect x="107" y="26" width="76" height="16" fill="#0d1f3c" stroke={C.steel} strokeWidth="0.5"/>

        {/* Fire / explosion */}
        {s.fire && (
          <g>
            <ellipse cx="145" cy="50" rx="25" ry="15" fill="rgba(255,100,0,0.4)">
              <animate attributeName="rx" values="20;30;20" dur="0.5s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="145" cy="50" rx="15" ry="10" fill="rgba(255,200,0,0.6)">
              <animate attributeName="ry" values="8;14;8" dur="0.4s" repeatCount="indefinite"/>
            </ellipse>
            <text x="145" y="54" textAnchor="middle" fontSize="14">🔥</text>
          </g>
        )}

        {/* Compressed air indicator */}
        {step===1 && (
          <g>
            {[35,50,65,80].map((y,i)=>(
              <line key={i} x1="115" y1={y} x2="175" y2={y}
                stroke={C.orange} strokeWidth="0.8" opacity="0.5" strokeDasharray="3,3"/>
            ))}
            <text x="145" y="58" textAnchor="middle" fontSize="9" fill={C.orange} fontWeight="700">
              ~600°C
            </text>
          </g>
        )}

        {/* Piston */}
        <rect x="107" y={s.piston} width="76" height="22" rx="3"
          fill="#1a3a5c" stroke={C.gold} strokeWidth="2"/>
        {/* Piston rings */}
        <line x1="107" y1={s.piston+6} x2="183" y2={s.piston+6} stroke={C.gold2} strokeWidth="1" opacity="0.5"/>
        <line x1="107" y1={s.piston+12} x2="183" y2={s.piston+12} stroke={C.gold2} strokeWidth="1" opacity="0.5"/>
        <line x1="107" y1={s.piston+18} x2="183" y2={s.piston+18} stroke={C.gold2} strokeWidth="1" opacity="0.5"/>

        {/* Connecting rod */}
        <line x1="145" y1={s.piston+22} x2="145" y2="165"
          stroke={C.steel} strokeWidth="5" strokeLinecap="round"/>

        {/* Crankshaft */}
        <circle cx="145" cy="168" r="16" fill="#0d2137" stroke={C.gold} strokeWidth="2"/>
        <circle cx="145" cy="168" r="6" fill={C.gold} opacity="0.8"/>
        <circle cx={145+14*Math.cos((step*90-90)*Math.PI/180)}
                cy={168+14*Math.sin((step*90-90)*Math.PI/180)} r="5"
          fill={C.gold2}/>

        {/* Fuel injector */}
        <rect x="138" y="20" width="14" height="8" rx="2" fill={C.rust} stroke={C.orange} strokeWidth="1"/>
        {s.fire && <line x1="145" y1="28" x2="145" y2="40" stroke={C.orange} strokeWidth="2" strokeDasharray="2,1"/>}

        {/* Labels */}
        <text x="60" y="40" textAnchor="middle" fontSize="7" fill={C.muted}>
          {({fr:"Air",en:"Air",es:"Aire",pt:"Ar"})[lang]||"Air"}
        </text>
        <text x="230" y="40" textAnchor="middle" fontSize="7" fill={C.muted}>
          {({fr:"Gaz",en:"Gas",es:"Gas",pt:"Gás"})[lang]||"Gaz"}
        </text>
        <text x="145" y="186" textAnchor="middle" fontSize="7" fill={C.gold}>
          {({fr:"Vilebrequin",en:"Crankshaft",es:"Cigüeñal",pt:"Virabrequim"})[lang]||"Vilebrequin"}
        </text>
      </svg>

      {/* Step info */}
      <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
        background:`${s.color}12`,border:`1px solid ${s.color}44`,
        fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>
        <div style={{fontWeight:700,color:s.color,marginBottom:4,fontSize:12}}>
          {s.label[lang]||s.label.fr}
        </div>
        {s.desc[lang]||s.desc.fr}
      </div>

      {/* Navigation */}
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          style={{flex:1,padding:"8px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>
          ◀ {({fr:"Précédent",en:"Previous",es:"Anterior",pt:"Anterior"})[lang]||"Précédent"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(3,s+1))} disabled={step===3}
          style={{flex:1,padding:"8px",borderRadius:10,background:step===3?"rgba(255,255,255,0.06)":`linear-gradient(135deg,${s.color}44,${C.blue}44)`,border:`1px solid ${step===3?"rgba(255,255,255,0.1)":s.color}`,color:C.white,cursor:step===3?"default":"pointer",fontSize:11,fontWeight:700}}>
          {({fr:"Suivant",en:"Next",es:"Siguiente",pt:"Próximo"})[lang]||"Suivant"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — ENGINE CROSS SECTION (clickable)
// ══════════════════════════════════════
function EngineCrossSectionSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const parts = [
    {id:"turbo",x:200,y:25,w:70,h:35,color:C.orange,
     label:{fr:"Turbocompresseur",en:"Turbocharger",es:"Turbocompresor",pt:"Turbocompressor"},
     desc:{fr:"Compresse l'air d'admission\nUtilise les gaz d'échappement\nAugmente la puissance de 30-50%\nTempérature gaz : jusqu'à 500°C",en:"Compresses intake air\nPowered by exhaust gases\nIncreases power by 30-50%\nGas temp: up to 500°C",es:"Comprime el aire de admisión\nImpulsado por gases de escape\nAumenta la potencia 30-50%",pt:"Comprime o ar de admissão\nImpulsado pelos gases de escape\nAumenta a potência 30-50%"}},
    {id:"cylinder",x:90,y:20,w:90,h:110,color:C.blue2,
     label:{fr:"Cylindre + Piston",en:"Cylinder + Piston",es:"Cilindro + Pistón",pt:"Cilindro + Pistão"},
     desc:{fr:"Bloc moteur en fonte/acier\nPiston en alliage aluminium\nSe déplace 500-600 fois/min (RPM)\nGrands navires : 80-120 RPM",en:"Cast iron/steel engine block\nAluminum alloy piston\nMoves 500-600 times/min\nLarge vessels: 80-120 RPM",es:"Bloque motor en fundición/acero\nPistón en aleación de aluminio\nGrandes buques: 80-120 RPM",pt:"Bloco motor em ferro fundido\nPistão em liga de alumínio\nGrandes navios: 80-120 RPM"}},
    {id:"crankshaft",x:90,y:140,w:90,h:30,color:C.gold2,
     label:{fr:"Vilebrequin",en:"Crankshaft",es:"Cigüeñal",pt:"Virabrequim"},
     desc:{fr:"Convertit le mouvement linéaire\ndu piston en mouvement rotatif\nTransmet la puissance à l'arbre\nForgé en acier haute résistance",en:"Converts linear piston motion\ninto rotary motion\nTransmits power to shaft\nForged high-strength steel",es:"Convierte movimiento lineal\nen movimiento rotativo\nTransmite la potencia al eje",pt:"Converte movimento linear\nem movimento rotativo\nTransmite potência ao eixo"}},
    {id:"shaft",x:10,y:152,w:75,h:14,color:C.teal,
     label:{fr:"Arbre porte-hélice",en:"Propeller shaft",es:"Eje portahélice",pt:"Eixo porta-hélice"},
     desc:{fr:"Transmet la puissance moteur → hélice\nLongueur : 10 à 100 mètres\nRéducteur : réduit les RPM\nPaliers : supportent le poids",en:"Transmits engine power → propeller\nLength: 10 to 100 meters\nGearbox: reduces RPM\nBearings: support the weight",es:"Transmite potencia motor → hélice\nLongitud: 10 a 100 metros\nReductor: reduce las RPM",pt:"Transmite potência motor → hélice\nComprimento: 10 a 100 metros"}},
    {id:"cooling",x:10,y:50,w:70,h:60,color:C.green,
     label:{fr:"Circuit refroidissement",en:"Cooling circuit",es:"Circuito enfriamiento",pt:"Circuito arrefecimento"},
     desc:{fr:"Eau douce (circuit fermé)\n→ Refroidit cylindres + huile\nÉchangeur : eau douce ↔ eau de mer\nTempérature eau douce : 70-85°C\n⚠️ Surchauffe = avarie grave",en:"Fresh water (closed circuit)\n→ Cools cylinders + oil\nHeat exchanger: FW ↔ SW\nFresh water temp: 70-85°C\n⚠️ Overheating = serious damage",es:"Agua dulce (circuito cerrado)\n→ Enfría cilindros + aceite\nIntercambiador: AD ↔ AM\nTemperatura agua dulce: 70-85°C",pt:"Água doce (circuito fechado)\n→ Arrefece cilindros + óleo\nPermutador: AD ↔ AM\nTemperatura água doce: 70-85°C"}},
    {id:"lubrication",x:10,y:120,w:70,h:25,color:C.rust,
     label:{fr:"Circuit huile / lubrification",en:"Oil / lubrication circuit",es:"Circuito aceite / lubricación",pt:"Circuito óleo / lubrificação"},
     desc:{fr:"Huile moteur SAE 30/40\nPression : 3-5 bars\nRefroidit ET lubrifie\nAnalyse huile tous les 500h\n⚠️ Chute pression → ARRÊT IMMÉDIAT",en:"Engine oil SAE 30/40\nPressure: 3-5 bar\nCools AND lubricates\nOil analysis every 500h\n⚠️ Pressure drop → IMMEDIATE STOP",es:"Aceite motor SAE 30/40\nPresión: 3-5 bares\nEnfría Y lubrica\n⚠️ Caída presión → PARADA INMEDIATA",pt:"Óleo motor SAE 30/40\nPressão: 3-5 bar\nArrefece E lubrifica\n⚠️ Queda pressão → PARAGEM IMEDIATA"}},
  ];

  const sel_ = sel ? parts.find(p=>p.id===sel) : null;

  return (
    <div>
      <svg width="290" height="190" viewBox="0 0 290 190">
        <rect width="290" height="190" fill="#061020" rx="8"/>
        {/* Background grid */}
        {[40,80,120,160].map(y=><line key={y} x1="0" y1={y} x2="290" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.7"/>)}

        {parts.map(p=>(
          <g key={p.id} onClick={()=>setSel(sel===p.id?null:p.id)} style={{cursor:"pointer"}}>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={6}
              fill={sel===p.id?`${p.color}25`:`${p.color}10`}
              stroke={p.color} strokeWidth={sel===p.id?2:1}
              opacity={sel&&sel!==p.id?0.5:1}/>
            <text x={p.x+p.w/2} y={p.y+p.h/2-4} textAnchor="middle" fontSize="7"
              fill={p.color} fontWeight="600">
              {(p.label[lang]||p.label.fr).split(" ")[0]}
            </text>
            <text x={p.x+p.w/2} y={p.y+p.h/2+6} textAnchor="middle" fontSize="7"
              fill={p.color} opacity="0.8">
              {(p.label[lang]||p.label.fr).split(" ").slice(1).join(" ")}
            </text>
          </g>
        ))}

        {/* Connections */}
        <line x1="85" y1="55" x2="90" y2="55" stroke={C.green} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6"/>
        <line x1="85" y1="130" x2="90" y2="155" stroke={C.rust} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6"/>
        <line x1="180" y1="75" x2="200" y2="42" stroke={C.orange} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6"/>
        <line x1="85" y1="159" x2="90" y2="159" stroke={C.teal} strokeWidth="2" opacity="0.6"/>

        <text x="145" y="183" textAnchor="middle" fontSize="7" fill={C.muted}>
          {lang==="fr"?"Touche chaque composant":lang==="en"?"Tap each component":lang==="es"?"Toca cada componente":"Toque cada componente"}
        </text>
      </svg>

      {sel_ && (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
          background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,
          animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:12,fontWeight:700,color:sel_.color,marginBottom:4}}>
            ⚙️ {sel_.label[lang]||sel_.label.fr}
          </div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
            {sel_.desc[lang]||sel_.desc.fr}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — COOLING CIRCUIT
// ══════════════════════════════════════
function CoolingCircuitSVG({ lang }) {
  const [highlight, setHighlight] = useState("fw");
  const W=290, H=200;

  return (
    <div>
      {/* Toggle */}
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {[
          {id:"fw",label:{fr:"Circuit eau douce",en:"Fresh water",es:"Agua dulce",pt:"Água doce"},c:C.blue2},
          {id:"sw",label:{fr:"Circuit eau de mer",en:"Sea water",es:"Agua de mar",pt:"Água salgada"},c:C.teal},
          {id:"oil",label:{fr:"Circuit huile",en:"Oil circuit",es:"Aceite",pt:"Óleo"},c:C.rust},
        ].map(h=>(
          <button key={h.id} onClick={()=>setHighlight(h.id)} style={{
            flex:1,padding:"7px 4px",borderRadius:10,fontSize:9,cursor:"pointer",
            background:highlight===h.id?`${h.c}22`:"rgba(255,255,255,0.05)",
            border:`1.5px solid ${highlight===h.id?h.c:"rgba(255,255,255,0.1)"}`,
            color:highlight===h.id?h.c:C.muted,fontWeight:highlight===h.id?700:400,
          }}>{h.label[lang]||h.label.fr}</button>
        ))}
      </div>

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>

        {/* ENGINE block */}
        <rect x="95" y="60" width="100" height="80" rx="8" fill="#0d1f3c" stroke={C.steel} strokeWidth="2"/>
        <text x="145" y="95" textAnchor="middle" fontSize="9" fill={C.steel} fontWeight="700">
          {({fr:"MOTEUR",en:"ENGINE",es:"MOTOR",pt:"MOTOR"})[lang]||"MOTEUR"}
        </text>
        <text x="145" y="108" textAnchor="middle" fontSize="8" fill={C.muted}>🔥 80-90°C</text>
        {/* Heat waves */}
        {[0,1,2].map(i=>(
          <path key={i} d={`M${115+i*15},60 Q${120+i*15},55 ${125+i*15},60`}
            fill="none" stroke={C.orange} strokeWidth="1" opacity="0.4"/>
        ))}

        {/* FRESH WATER circuit */}
        {(highlight==="fw"||highlight==="all") && <>
          {/* FW pump */}
          <circle cx="50" cy="100" r="18" fill="rgba(26,111,212,0.2)" stroke={C.blue2} strokeWidth="1.5"/>
          <text x="50" y="97" textAnchor="middle" fontSize="7" fill={C.blue2}>FW</text>
          <text x="50" y="107" textAnchor="middle" fontSize="6" fill={C.blue2}>Pump</text>
          {/* FW lines */}
          <line x1="68" y1="95" x2="95" y2="85" stroke={C.blue2} strokeWidth="2" strokeDasharray={highlight==="fw"?"":"4,4"}>
            {highlight==="fw"&&<animate attributeName="stroke-dashoffset" values="0;-12" dur="0.8s" repeatCount="indefinite"/>}
          </line>
          <line x1="95" y1="125" x2="68" y2="115" stroke={C.blue2} strokeWidth="2" opacity="0.5"/>
          {/* FW temp labels */}
          {highlight==="fw"&&<>
            <rect x="5" y="55" width="40" height="22" rx="5" fill="rgba(26,111,212,0.15)" stroke={C.blue2} strokeWidth="0.8"/>
            <text x="25" y="65" textAnchor="middle" fontSize="7" fill={C.blue2}>70°C</text>
            <text x="25" y="74" textAnchor="middle" fontSize="6" fill={C.muted}>{({fr:"vers moteur",en:"to engine",es:"al motor",pt:"ao motor"})[lang]||"vers moteur"}</text>
          </>}
        </>}

        {/* HEAT EXCHANGER */}
        <rect x="210" y="70" width="65" height="50" rx="6" fill="rgba(10,138,108,0.15)" stroke={C.teal} strokeWidth="1.5"/>
        <text x="242" y="91" textAnchor="middle" fontSize="7" fill={C.teal} fontWeight="700">
          {({fr:"Échangeur",en:"Heat Exch.",es:"Intercamb.",pt:"Permutador"})[lang]||"Échangeur"}
        </text>
        <text x="242" y="103" textAnchor="middle" fontSize="6" fill={C.muted}>FW ↔ SW</text>
        <text x="242" y="113" textAnchor="middle" fontSize="6" fill={C.teal}>-15°C</text>

        {/* FW to exchanger */}
        {highlight==="fw"&&<>
          <line x1="195" y1="80" x2="210" y2="85" stroke={C.blue2} strokeWidth="2">
            <animate attributeName="stroke-dashoffset" values="0;-8" dur="0.6s" repeatCount="indefinite"/>
          </line>
          <line x1="210" y1="105" x2="195" y2="110" stroke={C.blue2} strokeWidth="2" opacity="0.6"/>
        </>}

        {/* SEA WATER circuit */}
        {highlight==="sw"&&<>
          {/* Sea water pump */}
          <circle cx="242" cy="160" r="18" fill="rgba(10,138,108,0.2)" stroke={C.teal} strokeWidth="1.5"/>
          <text x="242" y="157" textAnchor="middle" fontSize="7" fill={C.teal}>SW</text>
          <text x="242" y="167" textAnchor="middle" fontSize="6" fill={C.teal}>Pump</text>
          {/* SW lines */}
          <line x1="242" y1="142" x2="242" y2="120" stroke={C.teal} strokeWidth="2">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="0.7s" repeatCount="indefinite"/>
          </line>
          {/* Sea inlet */}
          <rect x="215" y="172" width="54" height="14" rx="4" fill="rgba(10,138,108,0.1)" stroke={C.teal} strokeWidth="0.8"/>
          <text x="242" y="182" textAnchor="middle" fontSize="7" fill={C.teal}>
            {({fr:"Prise de mer",en:"Sea chest",es:"Toma de mar",pt:"Tomada de mar"})[lang]||"Prise de mer"}
          </text>
          {/* Temp labels */}
          <rect x="158" y="150" width="46" height="22" rx="5" fill="rgba(10,138,108,0.15)" stroke={C.teal} strokeWidth="0.8"/>
          <text x="181" y="160" textAnchor="middle" fontSize="7" fill={C.teal}>~28°C</text>
          <text x="181" y="169" textAnchor="middle" fontSize="6" fill={C.muted}>{({fr:"Golfe Guinée",en:"Gulf of Guinea",es:"Golfo Guinea",pt:"Golfo Guiné"})[lang]||"Golfe Guinée"}</text>
        </>}

        {/* OIL circuit */}
        {highlight==="oil"&&<>
          <circle cx="50" cy="155" r="18" fill="rgba(141,59,43,0.2)" stroke={C.rust} strokeWidth="1.5"/>
          <text x="50" y="152" textAnchor="middle" fontSize="7" fill={C.rust}>Oil</text>
          <text x="50" y="162" textAnchor="middle" fontSize="6" fill={C.rust}>Pump</text>
          <line x1="68" y1="148" x2="95" y2="130" stroke={C.rust} strokeWidth="2">
            <animate attributeName="stroke-dashoffset" values="0;-8" dur="0.5s" repeatCount="indefinite"/>
          </line>
          <line x1="95" y1="140" x2="68" y2="158" stroke={C.rust} strokeWidth="2" opacity="0.5"/>
          <rect x="5" y="172" width="86" height="14" rx="4" fill="rgba(141,59,43,0.1)" stroke={C.rust} strokeWidth="0.8"/>
          <text x="48" y="182" textAnchor="middle" fontSize="7" fill={C.rust}>
            {({fr:"Carter huile (sump)",en:"Oil sump",es:"Cárter aceite",pt:"Cárter óleo"})[lang]||"Carter huile (sump)"}
          </text>
          <rect x="5" y="30" width="86" height="20" rx="5" fill="rgba(141,59,43,0.15)" stroke={C.rust} strokeWidth="0.8"/>
          <text x="48" y="40" textAnchor="middle" fontSize="7" fill={C.rust}>SAE 30 · 3-5 bar</text>
          <text x="48" y="48" textAnchor="middle" fontSize="6" fill={C.muted}>
            {({fr:"⚠️ Pression critique",en:"⚠️ Critical pressure",es:"⚠️ Presión crítica",pt:"⚠️ Pressão crítica"})[lang]||"⚠️ Pression critique"}
          </text>
        </>}

        {/* Connection engine → exchanger */}
        <line x1="195" y1="95" x2="210" y2="90" stroke={C.steel} strokeWidth="1" strokeDasharray="3,3" opacity="0.3"/>
      </svg>

      {/* Info panels */}
      <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
        background:highlight==="fw"?"rgba(26,111,212,0.1)":highlight==="sw"?"rgba(10,138,108,0.1)":"rgba(141,59,43,0.1)",
        border:`1px solid ${highlight==="fw"?C.blue2:highlight==="sw"?C.teal:C.rust}33`,
        fontSize:11,color:C.white,lineHeight:1.7}}>
        {highlight==="fw"&&(({
          fr:"💧 EAU DOUCE (circuit fermé) :\n→ Refroidit directement les cylindres et l'huile\n→ Température normale : 70-85°C\n→ Alerte à 90°C · Arrêt d'urgence à 95°C\n→ Additifs anti-corrosion obligatoires",
          en:"💧 FRESH WATER (closed circuit):\n→ Directly cools cylinders and oil\n→ Normal temperature: 70-85°C\n→ Alert at 90°C · Emergency stop at 95°C\n→ Anti-corrosion additives mandatory",
          es:"💧 AGUA DULCE (circuito cerrado):\n→ Enfría directamente cilindros y aceite\n→ Temperatura normal: 70-85°C\n→ Alarma 90°C · Parada emergencia 95°C\n→ Aditivos anticorrosión obligatorios",
          pt:"💧 ÁGUA DOCE (circuito fechado):\n→ Arrefece diretamente cilindros e óleo\n→ Temperatura normal: 70-85°C\n→ Alarme 90°C · Paragem de emergência 95°C\n→ Aditivos anticorrosão obrigatórios",
        })[lang]||"")}
        {highlight==="sw"&&(({
          fr:"🌊 EAU DE MER (circuit ouvert) :\n→ Refroidit l'eau douce via l'échangeur\n→ Puisée directement dans la mer\n→ Température : ~28°C (Golfe de Guinée)\n→ ⚠️ Filtre à entretenir régulièrement\n→ ⚠️ Risque de corrosion et de biofouling",
          en:"🌊 SEA WATER (open circuit):\n→ Cools fresh water via heat exchanger\n→ Drawn directly from the sea\n→ Temperature: ~28°C (Gulf of Guinea)\n→ ⚠️ Filter requires regular maintenance\n→ ⚠️ Corrosion and biofouling risk",
          es:"🌊 AGUA DE MAR (circuito abierto):\n→ Enfría el agua dulce vía intercambiador\n→ Extraída directamente del mar\n→ Temperatura: ~28°C (Golfo de Guinea)\n→ ⚠️ Filtro requiere mantenimiento regular\n→ ⚠️ Riesgo de corrosión y biofouling",
          pt:"🌊 ÁGUA SALGADA (circuito aberto):\n→ Arrefece a água doce via permutador\n→ Captada diretamente do mar\n→ Temperatura: ~28°C (Golfo da Guiné)\n→ ⚠️ Filtro requer manutenção regular\n→ ⚠️ Risco de corrosão e biofouling",
        })[lang]||"")}
        {highlight==="oil"&&(({
          fr:"🛢️ CIRCUIT HUILE :\n→ Lubrifie ET refroidit simultanément\n→ Pression normale : 3-5 bars\n→ ⚠️ Chute de pression = arrêt immédiat\n→ Analyse huile tous les 500h d'utilisation\n→ Carter (sump) : contient 200-2000 litres",
          en:"🛢️ OIL CIRCUIT:\n→ Lubricates AND cools simultaneously\n→ Normal pressure: 3-5 bar\n→ ⚠️ Pressure drop = immediate stop\n→ Oil analysis every 500 operating hours\n→ Sump: contains 200-2000 litres",
          es:"🛢️ CIRCUITO ACEITE:\n→ Lubrica Y enfría simultáneamente\n→ Presión normal: 3-5 bares\n→ ⚠️ Caída de presión = parada inmediata\n→ Análisis aceite cada 500h de uso\n→ Cárter (sump): contiene 200-2000 litros",
          pt:"🛢️ CIRCUITO ÓLEO:\n→ Lubrifica E arrefece simultaneamente\n→ Pressão normal: 3-5 bar\n→ ⚠️ Queda de pressão = paragem imediata\n→ Análise de óleo a cada 500h de uso\n→ Cárter (sump): contém 200-2000 litros",
        })[lang]||"")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — ENGINE PARAMETERS MONITOR
// ══════════════════════════════════════
function EngineMonitorSVG({ lang }) {
  const [rpm, setRpm] = useState(90);
  const [temp, setTemp] = useState(82);
  const [pressure, setPressure] = useState(4.2);
  const [load, setLoad] = useState(75);

  const rpmStatus = rpm > 105 ? "danger" : rpm > 95 ? "warning" : "ok";
  const tempStatus = temp > 92 ? "danger" : temp > 87 ? "warning" : "ok";
  const pressStatus = pressure < 2.5 ? "danger" : pressure < 3 ? "warning" : "ok";
  const loadStatus = load > 90 ? "danger" : load > 80 ? "warning" : "ok";

  const statusColor = s => s==="danger"?C.red:s==="warning"?C.orange:C.green;
  const statusIcon = s => s==="danger"?"🔴":s==="warning"?"🟡":"🟢";

  const params = [
    {label:{fr:"RPM (tours/min)",en:"RPM (rev/min)",es:"RPM",pt:"RPM"},val:rpm,set:setRpm,min:0,max:120,unit:"RPM",status:rpmStatus,normal:"80-100",danger:">105"},
    {label:{fr:"Temp. eau douce",en:"FW Temperature",es:"Temp. agua dulce",pt:"Temp. água doce"},val:temp,set:setTemp,min:50,max:100,unit:"°C",status:tempStatus,normal:"70-85°C",danger:">90°C"},
    {label:{fr:"Pression huile",en:"Oil pressure",es:"Presión aceite",pt:"Pressão óleo"},val:pressure,set:setPressure,min:0,max:7,unit:"bar",step:0.1,status:pressStatus,normal:"3-5 bar",danger:"<2.5 bar"},
    {label:{fr:"Charge moteur",en:"Engine load",es:"Carga motor",pt:"Carga motor"},val:load,set:setLoad,min:0,max:100,unit:"%",status:loadStatus,normal:"60-85%",danger:">90%"},
  ];

  const overallStatus = [rpmStatus,tempStatus,pressStatus,loadStatus].includes("danger")?"danger"
    :[rpmStatus,tempStatus,pressStatus,loadStatus].includes("warning")?"warning":"ok";

  return (
    <div>
      {/* Overall status */}
      <div style={{
        padding:"10px 14px", borderRadius:12, marginBottom:12,
        background:`${statusColor(overallStatus)}15`,
        border:`1.5px solid ${statusColor(overallStatus)}44`,
        display:"flex", alignItems:"center", gap:10,
      }}>
        <span style={{fontSize:24}}>{statusIcon(overallStatus)}</span>
        <div>
          <div style={{fontSize:12,fontWeight:700,color:statusColor(overallStatus)}}>
            {overallStatus==="danger"
              ?(({fr:"⚠️ ALARME — ACTION REQUISE",en:"⚠️ ALARM — ACTION REQUIRED",es:"⚠️ ALARMA — ACCIÓN REQUERIDA",pt:"⚠️ ALARME — AÇÃO NECESSÁRIA"})[lang]||"⚠️ ALARME — ACTION REQUISE")
              :overallStatus==="warning"
              ?(({fr:"⚡ ATTENTION — Surveiller",en:"⚡ CAUTION — Monitor",es:"⚡ ATENCIÓN — Vigilar",pt:"⚡ ATENÇÃO — Vigiar"})[lang]||"⚡ ATTENTION — Surveiller")
              :(({fr:"✅ Moteur nominal",en:"✅ Engine nominal",es:"✅ Motor nominal",pt:"✅ Motor nominal"})[lang]||"✅ Moteur nominal")}
          </div>
          <div style={{fontSize:10,color:C.muted}}>
            {({fr:"Ajuste les curseurs pour simuler des pannes",en:"Adjust sliders to simulate failures",es:"Ajusta los controles para simular averías",pt:"Ajuste os controles para simular avarias"})[lang]||"Ajuste les curseurs pour simuler des pannes"}
          </div>
        </div>
      </div>

      {/* Parameters */}
      {params.map((p,i)=>(
        <div key={i} style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <div style={{fontSize:11,color:C.white,fontWeight:600}}>{p.label[lang]||p.label.fr}</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:10}}>{statusIcon(p.status)}</span>
              <span style={{fontSize:13,fontWeight:800,color:statusColor(p.status),fontFamily:"monospace"}}>
                {typeof p.val==="number"&&!Number.isInteger(p.val)?p.val.toFixed(1):p.val}{p.unit}
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{height:6,borderRadius:3,background:"rgba(255,255,255,0.08)",overflow:"hidden",marginBottom:4}}>
            <div style={{
              height:"100%",
              width:`${((p.val-p.min)/(p.max-p.min))*100}%`,
              background:`linear-gradient(90deg,${C.green},${statusColor(p.status)})`,
              borderRadius:3,transition:"width 0.3s ease",
            }}/>
          </div>
          <input type="range" min={p.min} max={p.max} step={p.step||1} value={p.val}
            onChange={e=>p.set(Number(e.target.value))}
            style={{width:"100%",accentColor:statusColor(p.status),margin:"0 0 2px"}}/>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.muted}}>
            <span>{({fr:"Normal:",en:"Normal:",es:"Normal:",pt:"Normal:"})[lang]||"Normal:"} {p.normal}</span>
            <span style={{color:C.red}}>{({fr:"Alarme:",en:"Alarm:",es:"Alarma:",pt:"Alarme:"})[lang]||"Alarme:"} {p.danger}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"MV Ever Given — Canal de Suez (2021)",teaser:"Porte-conteneurs 220 000t · Échoué 6 jours · Avarie machine + vent · 9,6 Mds$ bloqués",what:"Le Ever Given traverse le Canal de Suez. Une combinaison de vent violent (40 kn) et d'une perte de manœuvrabilité due à une avarie machine provoque l'échouage en travers du canal. Le navire bloque totalement la voie pendant 6 jours. 400+ navires immobilisés. Perte estimée : 9,6 milliards de dollars par jour de blocage.",cause:"• Vent de sable (50 km/h) → mauvaise visibilité\n• Perte temporaire de puissance moteur en cours de transit\n• Manœuvrabilité réduite dans le chenal étroit (313m de large)\n• Réaction tardive → échouage inévitable\n• Communication insuffisante avec les pilotes du canal",lessons:"✓ Surveillance permanente des paramètres moteur en transit critique\n✓ Procédure d'arrêt en cas de perte de puissance dans un chenal étroit\n✓ Coordination obligatoire pilotes ↔ passerelle\n✓ Résultat : révision procédures Canal de Suez · Remorqueurs renforcés\n✓ Coût de la crise : 916 millions $ pour l'assureur",link:"🔗 Lien L1 Machine : Une surveillance rigoureuse des paramètres moteur (RPM, température, pression) aurait permis de détecter l'avarie avant le transit. En zone critique, la machine ne doit JAMAIS défaillir sans plan de secours."},
    en:{title:"MV Ever Given — Suez Canal (2021)",teaser:"220,000t container ship · Grounded 6 days · Engine failure + wind · $9.6B blocked",what:"Ever Given crosses the Suez Canal. A combination of strong winds (40kn) and loss of maneuverability due to engine trouble causes it to run aground across the canal. The vessel blocks the waterway entirely for 6 days. 400+ vessels immobilized. Estimated loss: $9.6 billion per day blocked.",cause:"• Sandstorm (50 km/h) → poor visibility\n• Temporary engine power loss during transit\n• Reduced maneuverability in narrow channel (313m wide)\n• Late reaction → grounding inevitable\n• Insufficient communication with canal pilots",lessons:"✓ Permanent engine parameter monitoring during critical transit\n✓ Procedure for power loss in narrow channel\n✓ Mandatory coordination pilots ↔ bridge\n✓ Result: Suez Canal procedures revised · Tugboats reinforced\n✓ Crisis cost: $916 million for insurer",link:"🔗 L1 Engine Link: Rigorous engine parameter monitoring (RPM, temperature, pressure) would have detected the fault before transit. In critical zones, the engine must NEVER fail without a backup plan."},
    es:{title:"MV Ever Given — Canal de Suez (2021)",teaser:"Portacontenedores 220.000t · Encallado 6 días · Avería máquina + viento · 9.600M$ bloqueados",what:"El Ever Given cruza el Canal de Suez. Una combinación de viento fuerte (40 nudos) y pérdida de maniobrabilidad por avería de máquinas provoca el encallamiento en el canal. El buque bloquea la vía durante 6 días. Más de 400 buques inmovilizados.",cause:"• Tormenta de arena (50 km/h) → mala visibilidad\n• Pérdida temporal de potencia motora durante el tránsito\n• Maniobrabilidad reducida en el canal estrecho (313m)\n• Reacción tardía → encallamiento inevitable",lessons:"✓ Monitorización permanente parámetros motor en tránsito crítico\n✓ Procedimiento de pérdida de potencia en canal estrecho\n✓ Coordinación obligatoria prácticos ↔ puente\n✓ Resultado: procedimientos Canal de Suez revisados",link:"🔗 Vínculo L1 Máquinas: La vigilancia rigurosa de los parámetros del motor habría detectado la avería antes del tránsito."},
    pt:{title:"MV Ever Given — Canal do Suez (2021)",teaser:"Porta-contentores 220.000t · Encalhado 6 dias · Avaria máquina + vento · 9,6 mil M$ bloqueados",what:"O Ever Given atravessa o Canal do Suez. Uma combinação de vento forte (40 nós) e perda de manobrabilidade devido a avaria de máquinas provoca o encalhe no canal. O navio bloqueia a via durante 6 dias. Mais de 400 navios imobilizados.",cause:"• Tempestade de areia (50 km/h) → má visibilidade\n• Perda temporária de potência do motor durante o trânsito\n• Manobrabilidade reduzida no canal estreito (313m)\n• Reação tardia → encalhe inevitável",lessons:"✓ Monitorização permanente dos parâmetros do motor em trânsito crítico\n✓ Procedimento de perda de potência em canal estreito\n✓ Coordenação obrigatória pilotos ↔ ponte\n✓ Resultado: procedimentos Canal do Suez revistos",link:"🔗 Vínculo L1 Máquinas: A vigilância rigorosa dos parâmetros do motor teria detetado a avaria antes do trânsito."},
  };
  const c = d[lang]||d.fr;
  return (
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
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{({fr:"CAUSES",en:"CAUSES",es:"CAUSAS",pt:"CAUSAS"})[lang]||"CAUSES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Dans le cycle diesel à 4 temps, quel temps PRODUIT la puissance mécanique ?",opts:["1. Admission","2. Compression","3. Combustion (explosion)","4. Échappement"],correct:2,expl:"Le 3ème temps (Combustion/Explosion) est le seul qui produit de la puissance. L'injection du carburant dans l'air chaud comprimé provoque une explosion qui pousse le piston vers le bas, faisant tourner le vilebrequin."},
    {q:"Pourquoi les grands navires utilisent des moteurs 2 temps et non 4 temps ?",opts:["Les moteurs 2 temps consomment moins de carburant","Les moteurs 2 temps produisent une puissance par révolution — plus efficaces à basse vitesse et très haute puissance","Les moteurs 2 temps sont plus petits","Les moteurs 2 temps sont moins chers"],correct:1,expl:"Les moteurs marins 2 temps (MAN B&W, Wärtsilä) produisent de la puissance à chaque rotation du vilebrequin (vs tous les 2 tours pour un 4 temps). Ils peuvent atteindre 100 000 kW et tourner lentement (80-120 RPM) pour entraîner directement l'hélice sans réducteur."},
    {q:"La température normale d'eau douce dans le circuit de refroidissement est :",opts:["20-40°C","50-65°C","70-85°C","95-110°C"],correct:2,expl:"La température normale d'eau douce (circuit fermé) est de 70-85°C. Une alarme se déclenche vers 90°C et un arrêt d'urgence automatique intervient vers 95°C. En dessous de 70°C, le moteur n'est pas à sa température optimale de rendement."},
    {q:"La pression d'huile normale dans un moteur marin est :",opts:["0,5 à 1 bar","1 à 2 bars","3 à 5 bars","8 à 12 bars"],correct:2,expl:"Pression d'huile normale : 3 à 5 bars. Une chute de pression en dessous de 2,5 bars déclenche une alarme critique. En dessous de 2 bars : arrêt automatique du moteur. La chute de pression huile = risque de saisissement immédiat."},
    {q:"Quel est le rôle du turbocompresseur sur un moteur diesel marin ?",opts:["Refroidir le moteur","Purifier les gaz d'échappement selon MARPOL","Comprimer l'air d'admission pour augmenter la puissance de 30-50%","Pomper l'eau de mer pour le refroidissement"],correct:2,expl:"Le turbocompresseur utilise l'énergie des gaz d'échappement pour comprimer l'air d'admission. En comprimant l'air, on peut injecter plus de carburant → plus de puissance (+30 à 50%). C'est un composant critique — sa panne réduit drastiquement la puissance disponible."},
  ],
  en:[
    {q:"In the 4-stroke diesel cycle, which stroke PRODUCES mechanical power?",opts:["1. Intake","2. Compression","3. Combustion (power stroke)","4. Exhaust"],correct:2,expl:"The 3rd stroke (Combustion/Power) is the only one that produces power. Fuel injection into the hot compressed air causes an explosion that pushes the piston down, rotating the crankshaft."},
    {q:"Why do large vessels use 2-stroke engines instead of 4-stroke?",opts:["2-stroke engines use less fuel","2-stroke engines produce power every revolution — more efficient at low speed and very high power","2-stroke engines are smaller","2-stroke engines are cheaper"],correct:1,expl:"Marine 2-stroke engines (MAN B&W, Wärtsilä) produce power every crankshaft revolution (vs every 2 revolutions for 4-stroke). They can reach 100,000 kW and run slowly (80-120 RPM) to drive the propeller directly without a gearbox."},
    {q:"Normal fresh water temperature in the cooling circuit is:",opts:["20-40°C","50-65°C","70-85°C","95-110°C"],correct:2,expl:"Normal fresh water temperature (closed circuit) is 70-85°C. Alarm triggers at ~90°C and automatic emergency stop at ~95°C. Below 70°C the engine is not at optimal operating temperature."},
    {q:"Normal oil pressure in a marine engine is:",opts:["0.5 to 1 bar","1 to 2 bar","3 to 5 bar","8 to 12 bar"],correct:2,expl:"Normal oil pressure: 3 to 5 bar. A drop below 2.5 bar triggers a critical alarm. Below 2 bar: automatic engine shutdown. Oil pressure drop = immediate seizure risk."},
    {q:"What is the role of the turbocharger on a marine diesel engine?",opts:["Cool the engine","Purify exhaust gases per MARPOL","Compress intake air to increase power by 30-50%","Pump sea water for cooling"],correct:2,expl:"The turbocharger uses exhaust gas energy to compress intake air. By compressing air, more fuel can be injected → more power (+30 to 50%). A critical component — its failure drastically reduces available power."},
  ],
  es:[
    {q:"En el ciclo diesel de 4 tiempos, ¿qué tiempo PRODUCE la potencia mecánica?",opts:["1. Admisión","2. Compresión","3. Combustión (explosión)","4. Escape"],correct:2,expl:"El 3er tiempo (Combustión/Explosión) es el único que produce potencia. La inyección de combustible en el aire caliente comprimido provoca una explosión que empuja el pistón hacia abajo, haciendo girar el cigüeñal."},
    {q:"¿Por qué los grandes buques usan motores de 2 tiempos y no de 4 tiempos?",opts:["Los motores de 2 tiempos consumen menos combustible","Los motores de 2 tiempos producen potencia por revolución — más eficientes a baja velocidad","Los motores de 2 tiempos son más pequeños","Los motores de 2 tiempos son más baratos"],correct:1,expl:"Los motores marinos de 2 tiempos (MAN B&W, Wärtsilä) producen potencia en cada revolución del cigüeñal. Pueden alcanzar 100.000 kW y girar lentamente (80-120 RPM) para accionar directamente la hélice sin reductor."},
    {q:"La temperatura normal del agua dulce en el circuito de refrigeración es:",opts:["20-40°C","50-65°C","70-85°C","95-110°C"],correct:2,expl:"Temperatura normal del agua dulce (circuito cerrado): 70-85°C. Alarma a ~90°C y parada de emergencia automática a ~95°C."},
    {q:"La presión de aceite normal en un motor marino es:",opts:["0,5 a 1 bar","1 a 2 bares","3 a 5 bares","8 a 12 bares"],correct:2,expl:"Presión de aceite normal: 3 a 5 bares. Una caída por debajo de 2,5 bares activa alarma crítica. Por debajo de 2 bares: parada automática del motor."},
    {q:"¿Cuál es el papel del turbocompresor en un motor diesel marino?",opts:["Enfriar el motor","Purificar los gases de escape según MARPOL","Comprimir el aire de admisión para aumentar la potencia un 30-50%","Bombear agua de mar para la refrigeración"],correct:2,expl:"El turbocompresor usa la energía de los gases de escape para comprimir el aire de admisión. Al comprimir el aire se puede inyectar más combustible → más potencia (+30 a 50%)."},
  ],
  pt:[
    {q:"No ciclo diesel de 4 tempos, qual tempo PRODUZ a potência mecânica?",opts:["1. Admissão","2. Compressão","3. Combustão (explosão)","4. Escape"],correct:2,expl:"O 3º tempo (Combustão/Explosão) é o único que produz potência. A injeção de combustível no ar quente comprimido provoca uma explosão que empurra o pistão para baixo, fazendo girar o virabrequim."},
    {q:"Por que os grandes navios usam motores de 2 tempos e não de 4 tempos?",opts:["Os motores de 2 tempos consomem menos combustível","Os motores de 2 tempos produzem potência por revolução — mais eficientes a baixa velocidade","Os motores de 2 tempos são mais pequenos","Os motores de 2 tempos são mais baratos"],correct:1,expl:"Os motores marinos de 2 tempos (MAN B&W, Wärtsilä) produzem potência em cada revolução do virabrequim. Podem atingir 100.000 kW e girar lentamente (80-120 RPM) para acionar diretamente a hélice sem redutor."},
    {q:"A temperatura normal da água doce no circuito de arrefecimento é:",opts:["20-40°C","50-65°C","70-85°C","95-110°C"],correct:2,expl:"Temperatura normal da água doce (circuito fechado): 70-85°C. Alarme a ~90°C e paragem de emergência automática a ~95°C."},
    {q:"A pressão de óleo normal num motor marítimo é:",opts:["0,5 a 1 bar","1 a 2 bar","3 a 5 bar","8 a 12 bar"],correct:2,expl:"Pressão de óleo normal: 3 a 5 bar. Uma queda abaixo de 2,5 bar ativa alarme crítico. Abaixo de 2 bar: paragem automática do motor."},
    {q:"Qual é o papel do turbocompressor num motor diesel marítimo?",opts:["Arrefecer o motor","Purificar os gases de escape segundo o MARPOL","Comprimir o ar de admissão para aumentar a potência em 30-50%","Bombear água do mar para o arrefecimento"],correct:2,expl:"O turbocompressor usa a energia dos gases de escape para comprimir o ar de admissão. Ao comprimir o ar pode-se injetar mais combustível → mais potência (+30 a 50%)."},
  ],
};

// ══════════════════════════════════════
// BANK 15 QUESTIONS (multilingual)
// ══════════════════════════════════════
const BANK_FR = [
  {q:"Quelle est la différence fondamentale entre un moteur diesel et un moteur à essence ?",opts:["Le diesel utilise de l'électricité pour l'allumage","Le diesel allume le carburant par la chaleur de compression (pas de bougie)","Le diesel n'a pas de pistons","Le diesel est plus petit que l'essence"],correct:1,expl:"Diesel = allumage par compression. L'air est comprimé jusqu'à 500-700°C, puis le carburant est injecté et s'enflamme spontanément. Pas de bougie. C'est pourquoi le ratio de compression (14:1 à 25:1) est plus élevé qu'un moteur à essence (8:1 à 12:1)."},
  {q:"Les moteurs marins 2 temps utilisés sur les grands navires (MAN B&W, Wärtsilä) tournent à quelle vitesse ?",opts:["500-3000 RPM comme les voitures","200-400 RPM","80-130 RPM — très lentement pour entraîner directement l'hélice","20-50 RPM"],correct:2,expl:"Moteurs 2 temps slow speed : 80-130 RPM. Vitesse très basse permet d'entraîner directement l'hélice sans réducteur. Les moteurs 4 temps medium speed tournent à 400-1200 RPM et nécessitent un réducteur. Les moteurs auxiliaires peuvent tourner à 1500 RPM."},
  {q:"Qu'est-ce que le HFO (Heavy Fuel Oil) utilisé par les grands navires ?",opts:["Diesel ordinaire comme les voitures","Fuel lourd résiduel très visqueux, moins cher mais très polluant (MARPOL Annexe VI)","Gaz naturel liquéfié","Carburant d'aviation"],correct:1,expl:"HFO = Heavy Fuel Oil = mazout lourd résiduel. Viscosité élevée → doit être chauffé à 120-150°C avant injection. Très économique mais riche en soufre (MARPOL Annexe VI impose des limites). Zone ECA : obligation MDO/MGO (distillate). Prix HFO ~ 60% moins cher que le MDO."},
  {q:"Qu'est-ce qu'un 'arrêt d'urgence' (emergency shutdown) du moteur principal ?",opts:["Réduction volontaire de la vitesse","Arrêt automatique déclenché quand un paramètre critique dépasse les limites (température, pression huile, survitesse)","Arrêt programmé pour maintenance","Signal d'alarme sonore uniquement"],correct:1,expl:"Emergency shutdown = arrêt automatique déclenché par les systèmes de protection du moteur : basse pression huile, haute température eau, survitesse (overspeed), etc. Irréversible sans intervention manuelle. Procédure critique car le navire perd la propulsion."},
  {q:"Pourquoi l'eau de mer ne circule-t-elle pas directement dans le moteur pour le refroidir ?",opts:["L'eau de mer est trop froide","L'eau de mer provoque de la corrosion et du dépôt de sel dans les conduits du moteur","L'eau de mer est trop salée pour les pompes","L'eau de mer contient du plancton dangereux"],correct:1,expl:"L'eau de mer (corrosive, calcaire, biologique) ne circule pas dans le moteur. Elle refroidit l'eau douce via un échangeur thermique. Circuit fermé d'eau douce (avec additifs anticorrosion) dans le moteur. Circuit ouvert d'eau de mer à l'extérieur. Prises de mer à entretenir (biofouling)."},
  {q:"Qu'est-ce que le 'slow steaming' pratiqué depuis 2008 ?",opts:["Navigation par mauvais temps","Réduction volontaire de la vitesse pour économiser le carburant et réduire les émissions","Navigation dans les glaces","Manœuvre d'accostage lente"],correct:1,expl:"Slow steaming = réduction de la vitesse à 12-15 kn au lieu de 18-25 kn. Économies carburant : 50% à 12 kn vs 25 kn (puissance ∝ vitesse³). Initié en 2008 avec la hausse du pétrole. Problème : moteurs conçus pour pleine puissance → usure accrue à charge partielle."},
  {q:"Quel est le rôle de la 'purge' (scavenging) dans un moteur 2 temps marin ?",opts:["Purifier l'eau de refroidissement","Évacuer les gaz brûlés et remplir le cylindre d'air frais entre l'échappement et la combustion","Filtrer le carburant HFO","Lubrifier les pistons"],correct:1,expl:"Dans un moteur 2 temps, l'air sous pression (fourni par le turbocompresseur + soufflante) chasse les gaz d'échappement et remplit le cylindre d'air frais. C'est la balayage/scavenging. Crucial pour le rendement — si défaillant : moteur manque d'air → fumée noire → puissance réduite."},
  {q:"À quelle fréquence faut-il généralement analyser l'huile moteur ?",opts:["Tous les jours","Toutes les semaines","Tous les 500h d'utilisation (environ)","Uniquement lors des révisions annuelles"],correct:2,expl:"Analyse d'huile tous les ~500h d'utilisation ou selon les recommandations constructeur. L'analyse révèle : usure des métaux (fer, cuivre, aluminium), contamination (eau, carburant), viscosité. Permet de détecter une avarie avant qu'elle devienne catastrophique."},
  {q:"Qu'est-ce que l'indice de viscosité SAE d'une huile moteur ?",opts:["La couleur de l'huile","La densité de l'huile par rapport à l'eau","La classification de la viscosité (épaisseur) de l'huile selon la temperature","La teneur en soufre de l'huile"],correct:2,expl:"SAE (Society of Automotive Engineers) classifie la viscosité des huiles. SAE 30 = moins visqueux. SAE 40 = plus visqueux. Marine : SAE 30 ou SAE 40 pour les moteurs principaux. Huile trop fine → mauvaise lubrification. Huile trop épaisse → difficile à pomper au démarrage."},
  {q:"Qu'est-ce qu'un 'échangeur de chaleur' (heat exchanger) dans le système de refroidissement ?",opts:["Un radiateur comme dans les voitures","Un appareil qui transfert la chaleur de l'eau douce chaude vers l'eau de mer froide sans mélanger les deux fluides","Un appareil qui chauffe l'eau de mer pour la rendre potable","Un filtre pour l'eau de mer"],correct:1,expl:"Échangeur de chaleur = transfert thermique entre deux fluides sans contact direct. L'eau douce chaude (80°C) cède sa chaleur à l'eau de mer froide (~28°C au Golfe de Guinée). Eau douce refroidie → retour au moteur. Eau de mer réchauffée → rejetée à la mer."},
  {q:"Quelle est la différence entre MDO et HFO ?",opts:["Ce sont deux noms du même carburant","MDO = diesel marin distillé (plus propre, plus cher) · HFO = fuel lourd résiduel (moins cher, plus polluant)","MDO = carburant pour moteurs auxiliaires uniquement","HFO = carburant pour moteurs 4 temps uniquement"],correct:1,expl:"MDO (Marine Diesel Oil) = distillé, propre, moins visqueux, utilisé en zones ECA et pour les moteurs auxiliaires. HFO (Heavy Fuel Oil) = résiduel, très visqueux, moins cher, utilisé en haute mer. LSFO (Low Sulfur Fuel Oil) = HFO à faible teneur en soufre (<0,5%) depuis MARPOL 2020."},
  {q:"Qu'est-ce que MARPOL Annexe VI concernant les moteurs marins ?",opts:["Réglementation sur les déchets solides","Limites d'émissions de NOx, SOx et PM pour les moteurs marins","Réglementation sur les eaux de ballast","Normes de bruit des moteurs"],correct:1,expl:"MARPOL Annexe VI : prévention de la pollution atmosphérique. Limite les émissions de NOx (oxydes d'azote) selon le Tier (I/II/III), SOx (soufre → limite 0,5% mondiale depuis 2020, 0,1% en ECA), et PM. Les moteurs Tier III doivent avoir des systèmes SCR ou EGR pour réduire les NOx de 80%."},
  {q:"Qu'est-ce qu'un 'blackout' à bord d'un navire ?",opts:["Panne de l'éclairage uniquement","Panne totale d'électricité affectant la propulsion et tous les systèmes vitaux","Panne du moteur principal uniquement","Défaillance du système de navigation"],correct:1,expl:"Blackout = perte totale de l'alimentation électrique. Impact : perte de propulsion (moteurs électriques), perte navigation (ECDIS, radar, AIS), perte communication, perte pompes (incendie, ballasts). Procédure d'urgence : démarrage groupe électrogène de secours en < 30 secondes (SOLAS)."},
  {q:"Quelle est la séquence correcte de démarrage du moteur principal ?",opts:["Démarrage direct à pleine puissance","Vérification paramètres → préchauffage → démarrage air → passage au carburant → montée en puissance progressive","Démarrage carburant → vérification après","Démarrage électrique direct"],correct:1,expl:"Séquence correcte : 1) Vérifier niveau huile, eau, fuel. 2) Préchauffer le moteur (circulation eau). 3) Démarrage à l'air comprimé (25-30 bars). 4) Passage du fuel léger (MDO) puis HFO après chauffe. 5) Montée en puissance progressive. 6) Surveillance des paramètres. Aller directement à pleine puissance = avarie garantie."},
  {q:"Pourquoi les moteurs marins principaux fonctionnent-ils au HFO chauffé et pas directement ?",opts:["Pour économiser l'électricité","Le HFO est très visqueux à température ambiante (comme du goudron) → doit être chauffé à 120-150°C pour être injectable","Pour réduire les émissions","Pour améliorer la combustion à froid"],correct:1,expl:"Le HFO a une viscosité très élevée à température ambiante (ressemble à du goudron). Il faut le chauffer à 120-150°C pour le rendre assez fluide pour passer dans les injecteurs. Circuit de réchauffage (serpentins vapeur ou électriques) obligatoire. En cas de panne de chauffe → impossibilité d'alimenter le moteur."},
];

const BANK_EN = [
  {q:"What is the fundamental difference between a diesel engine and a petrol engine?",opts:["Diesel uses electricity for ignition","Diesel ignites fuel via heat of compression (no spark plug)","Diesel has no pistons","Diesel is smaller than petrol"],correct:1,expl:"Diesel = compression ignition. Air is compressed to 500-700°C, then fuel is injected and ignites spontaneously. No spark plug. Compression ratio (14:1 to 25:1) is higher than petrol (8:1 to 12:1)."},
  {q:"At what speed do 2-stroke marine engines used on large vessels (MAN B&W, Wärtsilä) run?",opts:["500-3000 RPM like cars","200-400 RPM","80-130 RPM — very slow to drive the propeller directly","20-50 RPM"],correct:2,expl:"Slow-speed 2-stroke engines: 80-130 RPM. Very low speed allows direct propeller drive without gearbox. Medium-speed 4-stroke: 400-1200 RPM with gearbox. Auxiliaries can run at 1500 RPM."},
  {q:"What is HFO (Heavy Fuel Oil) used by large vessels?",opts:["Ordinary diesel like cars","Heavy residual very viscous fuel, cheaper but very polluting (MARPOL Annex VI)","Liquefied natural gas","Aviation fuel"],correct:1,expl:"HFO = Heavy Fuel Oil = heavy residual fuel. High viscosity → must be heated to 120-150°C before injection. Very economical but high in sulphur (MARPOL Annex VI limits). ECA zones require MDO/MGO (distillate). HFO ~60% cheaper than MDO."},
  {q:"What is an 'emergency shutdown' of the main engine?",opts:["Voluntary speed reduction","Automatic stop triggered when a critical parameter exceeds limits (temperature, oil pressure, overspeed)","Scheduled stop for maintenance","Audible alarm signal only"],correct:1,expl:"Emergency shutdown = automatic stop triggered by engine protection systems: low oil pressure, high water temperature, overspeed, etc. Irreversible without manual intervention. Critical procedure — the vessel loses propulsion."},
  {q:"Why doesn't sea water circulate directly through the engine to cool it?",opts:["Sea water is too cold","Sea water causes corrosion and salt deposits in engine ducts","Sea water is too salty for the pumps","Sea water contains dangerous plankton"],correct:1,expl:"Sea water (corrosive, scaling, biological) does not circulate through the engine. It cools fresh water via a heat exchanger. Closed fresh-water circuit (with anti-corrosion additives) inside the engine. Open sea-water circuit outside. Sea chests need maintenance (biofouling)."},
  {q:"What is 'slow steaming', practised since 2008?",opts:["Sailing in bad weather","Voluntary speed reduction to save fuel and cut emissions","Sailing in ice","Slow berthing manoeuvre"],correct:1,expl:"Slow steaming = reducing speed to 12-15 kn instead of 18-25 kn. Fuel savings: 50% at 12 kn vs 25 kn (power ∝ speed³). Started in 2008 with oil price spike. Issue: engines designed for full power → increased wear at part load."},
  {q:"What is the role of 'scavenging' in a marine 2-stroke engine?",opts:["Purify cooling water","Evacuate burnt gases and refill the cylinder with fresh air between exhaust and combustion","Filter HFO fuel","Lubricate pistons"],correct:1,expl:"In a 2-stroke engine, pressurised air (supplied by turbocharger + blower) sweeps out exhaust gases and refills the cylinder with fresh air. This is scavenging. Crucial for efficiency — if it fails: lack of air → black smoke → reduced power."},
  {q:"How often should engine oil typically be analysed?",opts:["Every day","Every week","Every ~500 operating hours","Only at annual overhauls"],correct:2,expl:"Oil analysis every ~500 operating hours or per manufacturer recommendation. Reveals: metal wear (iron, copper, aluminium), contamination (water, fuel), viscosity. Detects failures before they become catastrophic."},
  {q:"What is the SAE viscosity grade of an engine oil?",opts:["The colour of the oil","Density of oil relative to water","Classification of oil viscosity (thickness) with temperature","Sulphur content of the oil"],correct:2,expl:"SAE (Society of Automotive Engineers) classifies oil viscosity. SAE 30 = thinner. SAE 40 = thicker. Marine: SAE 30 or SAE 40 for main engines. Too thin → poor lubrication. Too thick → hard to pump at start-up."},
  {q:"What is a 'heat exchanger' in the cooling system?",opts:["A radiator like in cars","A device that transfers heat from hot fresh water to cold sea water without mixing the two fluids","A device that heats sea water to make it potable","A filter for sea water"],correct:1,expl:"Heat exchanger = thermal transfer between two fluids without direct contact. Hot fresh water (80°C) gives heat to cold sea water (~28°C in Gulf of Guinea). Cooled fresh water → back to engine. Heated sea water → returned overboard."},
  {q:"What is the difference between MDO and HFO?",opts:["They are two names for the same fuel","MDO = distillate marine diesel (cleaner, more expensive) · HFO = heavy residual fuel (cheaper, more polluting)","MDO = fuel for auxiliary engines only","HFO = fuel for 4-stroke engines only"],correct:1,expl:"MDO (Marine Diesel Oil) = distillate, clean, less viscous, used in ECA zones and for auxiliaries. HFO (Heavy Fuel Oil) = residual, very viscous, cheaper, used on high seas. LSFO (Low Sulfur Fuel Oil) = HFO with low sulphur content (<0.5%) since MARPOL 2020."},
  {q:"What does MARPOL Annex VI cover for marine engines?",opts:["Solid waste regulation","NOx, SOx and PM emission limits for marine engines","Ballast water regulation","Engine noise standards"],correct:1,expl:"MARPOL Annex VI: air pollution prevention. Limits NOx (nitrogen oxides) by Tier (I/II/III), SOx (sulphur → global limit 0.5% since 2020, 0.1% in ECA), and PM. Tier III engines need SCR or EGR to cut NOx by 80%."},
  {q:"What is a 'blackout' on board a ship?",opts:["Lighting failure only","Total electrical loss affecting propulsion and all vital systems","Main engine failure only","Navigation system failure"],correct:1,expl:"Blackout = total loss of electrical power. Impact: loss of propulsion (electric motors), navigation (ECDIS, radar, AIS), communications, pumps (fire, ballast). Emergency procedure: emergency generator must start in < 30 seconds (SOLAS)."},
  {q:"What is the correct main engine start-up sequence?",opts:["Direct start at full power","Check parameters → preheat → air start → switch to fuel → progressive power ramp","Fuel start → check after","Direct electric start"],correct:1,expl:"Correct sequence: 1) Check oil, water, fuel levels. 2) Preheat engine (water circulation). 3) Compressed-air start (25-30 bar). 4) Switch from light fuel (MDO) to HFO once warm. 5) Progressive power ramp. 6) Parameter monitoring. Going straight to full power = guaranteed damage."},
  {q:"Why do main marine engines run on heated HFO and not directly?",opts:["To save electricity","HFO is very viscous at ambient temperature (like tar) → must be heated to 120-150°C to be injectable","To reduce emissions","To improve cold combustion"],correct:1,expl:"HFO has very high viscosity at ambient temperature (like tar). It must be heated to 120-150°C to become fluid enough for injectors. Heating circuit (steam or electric coils) mandatory. If heating fails → engine cannot be fed."},
];

const BANK_ES = [
  {q:"¿Cuál es la diferencia fundamental entre un motor diesel y un motor de gasolina?",opts:["El diesel usa electricidad para el encendido","El diesel inflama el combustible por el calor de la compresión (sin bujía)","El diesel no tiene pistones","El diesel es más pequeño que el de gasolina"],correct:1,expl:"Diesel = encendido por compresión. El aire se comprime a 500-700°C, luego el combustible se inyecta y se inflama espontáneamente. Sin bujía. Relación de compresión (14:1 a 25:1) más alta que la gasolina (8:1 a 12:1)."},
  {q:"¿A qué velocidad giran los motores marinos de 2 tiempos de los grandes buques (MAN B&W, Wärtsilä)?",opts:["500-3000 RPM como los coches","200-400 RPM","80-130 RPM — muy lento para accionar la hélice directamente","20-50 RPM"],correct:2,expl:"Motores 2T lentos: 80-130 RPM. Velocidad muy baja para accionar directamente la hélice sin reductor. Motores 4T medium speed: 400-1200 RPM con reductor. Auxiliares: hasta 1500 RPM."},
  {q:"¿Qué es el HFO (Heavy Fuel Oil) usado por los grandes buques?",opts:["Diesel ordinario como los coches","Fueloil pesado residual muy viscoso, más barato pero muy contaminante (MARPOL Anexo VI)","Gas natural licuado","Combustible de aviación"],correct:1,expl:"HFO = fueloil pesado residual. Alta viscosidad → debe calentarse a 120-150°C antes de la inyección. Muy económico pero rico en azufre (MARPOL Anexo VI). Zonas ECA: obligación MDO/MGO. HFO ~60% más barato que MDO."},
  {q:"¿Qué es una 'parada de emergencia' del motor principal?",opts:["Reducción voluntaria de velocidad","Parada automática activada cuando un parámetro crítico supera los límites (temperatura, presión aceite, sobrevelocidad)","Parada programada para mantenimiento","Solo señal acústica de alarma"],correct:1,expl:"Parada de emergencia = activada por los sistemas de protección del motor: baja presión aceite, alta temperatura agua, sobrevelocidad, etc. Irreversible sin intervención manual. Crítica: el buque pierde propulsión."},
  {q:"¿Por qué el agua de mar no circula directamente por el motor para enfriarlo?",opts:["El agua de mar es demasiado fría","El agua de mar provoca corrosión y depósitos de sal en los conductos","El agua de mar es demasiado salada para las bombas","Contiene plancton peligroso"],correct:1,expl:"El agua de mar (corrosiva, calcárea, biológica) no circula por el motor. Enfría el agua dulce a través de un intercambiador. Circuito cerrado de agua dulce (con aditivos anticorrosión) en el motor. Tomas de mar a mantener (biofouling)."},
  {q:"¿Qué es el 'slow steaming' practicado desde 2008?",opts:["Navegación con mal tiempo","Reducción voluntaria de velocidad para ahorrar combustible y reducir emisiones","Navegación entre hielos","Maniobra lenta de atraque"],correct:1,expl:"Slow steaming = reducir velocidad a 12-15 nudos en lugar de 18-25 nudos. Ahorro de combustible: 50% a 12 vs 25 nudos (potencia ∝ velocidad³). Iniciado en 2008. Problema: motores diseñados a plena carga → desgaste en carga parcial."},
  {q:"¿Cuál es el papel del 'barrido' (scavenging) en un motor 2T marino?",opts:["Purificar el agua de refrigeración","Evacuar los gases quemados y rellenar el cilindro con aire fresco entre el escape y la combustión","Filtrar el HFO","Lubricar los pistones"],correct:1,expl:"En un motor 2T, el aire a presión (turbocompresor + soplante) expulsa los gases de escape y rellena el cilindro con aire fresco. Es el barrido. Crucial para el rendimiento — si falla: falta de aire → humo negro → potencia reducida."},
  {q:"¿Con qué frecuencia se analiza normalmente el aceite del motor?",opts:["Todos los días","Cada semana","Cada ~500h de uso","Solo en revisiones anuales"],correct:2,expl:"Análisis de aceite cada ~500h de uso o según fabricante. Revela: desgaste de metales (hierro, cobre, aluminio), contaminación (agua, combustible), viscosidad. Detecta averías antes de que sean catastróficas."},
  {q:"¿Qué es el índice de viscosidad SAE de un aceite de motor?",opts:["El color del aceite","Densidad del aceite respecto al agua","Clasificación de la viscosidad del aceite según la temperatura","Contenido de azufre del aceite"],correct:2,expl:"SAE clasifica la viscosidad. SAE 30 = más fluido. SAE 40 = más viscoso. Marino: SAE 30 o SAE 40 para motores principales. Demasiado fino → mala lubricación. Demasiado espeso → difícil de bombear al arranque."},
  {q:"¿Qué es un 'intercambiador de calor' en el sistema de refrigeración?",opts:["Un radiador como en los coches","Un aparato que transfiere el calor del agua dulce caliente al agua de mar fría sin mezclar los dos fluidos","Un aparato que calienta el agua de mar para hacerla potable","Un filtro para el agua de mar"],correct:1,expl:"Intercambiador = transferencia térmica entre dos fluidos sin contacto directo. Agua dulce caliente (80°C) cede calor al agua de mar fría (~28°C Golfo de Guinea). Agua dulce enfriada → vuelve al motor. Agua de mar calentada → al mar."},
  {q:"¿Cuál es la diferencia entre MDO y HFO?",opts:["Son dos nombres del mismo combustible","MDO = diesel marino destilado (más limpio, más caro) · HFO = fueloil residual (más barato, más contaminante)","MDO = combustible solo para auxiliares","HFO = combustible solo para motores 4T"],correct:1,expl:"MDO = destilado, limpio, menos viscoso, usado en zonas ECA y auxiliares. HFO = residual, muy viscoso, más barato, usado en alta mar. LSFO = HFO con bajo contenido de azufre (<0,5%) desde MARPOL 2020."},
  {q:"¿Qué cubre MARPOL Anexo VI sobre los motores marinos?",opts:["Reglamento sobre residuos sólidos","Límites de emisiones NOx, SOx y PM para motores marinos","Reglamento sobre aguas de lastre","Normas de ruido de motores"],correct:1,expl:"MARPOL Anexo VI: prevención de la contaminación atmosférica. Limita NOx por Tier (I/II/III), SOx (límite mundial 0,5% desde 2020, 0,1% en ECA), y PM. Motores Tier III necesitan SCR o EGR para reducir NOx un 80%."},
  {q:"¿Qué es un 'blackout' a bordo de un buque?",opts:["Solo fallo de iluminación","Pérdida total de electricidad que afecta a propulsión y todos los sistemas vitales","Solo fallo del motor principal","Fallo del sistema de navegación"],correct:1,expl:"Blackout = pérdida total de alimentación eléctrica. Impacto: pérdida de propulsión (motores eléctricos), navegación (ECDIS, radar, AIS), comunicaciones, bombas. Procedimiento: grupo electrógeno de emergencia debe arrancar en < 30 s (SOLAS)."},
  {q:"¿Cuál es la secuencia correcta de arranque del motor principal?",opts:["Arranque directo a plena potencia","Verificar parámetros → precalentamiento → arranque por aire → cambio a combustible → subida progresiva de potencia","Arranque con combustible → verificar después","Arranque eléctrico directo"],correct:1,expl:"Secuencia: 1) Verificar niveles aceite, agua, combustible. 2) Precalentar motor. 3) Arranque por aire comprimido (25-30 bar). 4) Pasar de MDO a HFO al calentarse. 5) Subida progresiva de potencia. 6) Vigilancia de parámetros. Pasar directo a plena potencia = avería segura."},
  {q:"¿Por qué los motores marinos principales funcionan con HFO calentado y no directamente?",opts:["Para ahorrar electricidad","El HFO es muy viscoso a temperatura ambiente (como alquitrán) → debe calentarse a 120-150°C para ser inyectable","Para reducir emisiones","Para mejorar la combustión en frío"],correct:1,expl:"El HFO tiene viscosidad muy alta a temperatura ambiente (como alquitrán). Debe calentarse a 120-150°C para fluir por los inyectores. Circuito de calentamiento (serpentines de vapor o eléctricos) obligatorio. Si falla → imposible alimentar el motor."},
];

const BANK_PT = [
  {q:"Qual é a diferença fundamental entre um motor diesel e um motor a gasolina?",opts:["O diesel usa eletricidade para a ignição","O diesel inflama o combustível pelo calor da compressão (sem vela)","O diesel não tem pistões","O diesel é mais pequeno que o de gasolina"],correct:1,expl:"Diesel = ignição por compressão. O ar é comprimido até 500-700°C, depois o combustível é injetado e inflama espontaneamente. Sem vela. Relação de compressão (14:1 a 25:1) mais alta que a gasolina (8:1 a 12:1)."},
  {q:"A que velocidade rodam os motores marítimos de 2 tempos dos grandes navios (MAN B&W, Wärtsilä)?",opts:["500-3000 RPM como os carros","200-400 RPM","80-130 RPM — muito lento para acionar a hélice diretamente","20-50 RPM"],correct:2,expl:"Motores 2T lentos: 80-130 RPM. Velocidade muito baixa para acionar diretamente a hélice sem redutor. Motores 4T medium speed: 400-1200 RPM com redutor. Auxiliares até 1500 RPM."},
  {q:"O que é o HFO (Heavy Fuel Oil) usado pelos grandes navios?",opts:["Diesel comum como os carros","Fuelóleo pesado residual muito viscoso, mais barato mas muito poluente (MARPOL Anexo VI)","Gás natural liquefeito","Combustível de aviação"],correct:1,expl:"HFO = fuelóleo pesado residual. Alta viscosidade → deve ser aquecido a 120-150°C antes da injeção. Muito económico mas rico em enxofre (MARPOL Anexo VI). Zonas ECA: obrigação MDO/MGO. HFO ~60% mais barato que MDO."},
  {q:"O que é uma 'paragem de emergência' do motor principal?",opts:["Redução voluntária de velocidade","Paragem automática ativada quando um parâmetro crítico ultrapassa os limites (temperatura, pressão óleo, sobrevelocidade)","Paragem programada para manutenção","Apenas sinal sonoro de alarme"],correct:1,expl:"Paragem de emergência = ativada pelos sistemas de proteção: baixa pressão óleo, alta temperatura água, sobrevelocidade, etc. Irreversível sem intervenção manual. Crítica: o navio perde propulsão."},
  {q:"Porque é que a água do mar não circula diretamente no motor para arrefecê-lo?",opts:["A água do mar é demasiado fria","A água do mar provoca corrosão e depósitos de sal nas condutas do motor","A água do mar é demasiado salgada para as bombas","Contém plâncton perigoso"],correct:1,expl:"A água do mar (corrosiva, calcária, biológica) não circula no motor. Arrefece a água doce através de um permutador. Circuito fechado de água doce (com aditivos anticorrosão) no motor. Tomadas de mar a manter (biofouling)."},
  {q:"O que é o 'slow steaming' praticado desde 2008?",opts:["Navegação com mau tempo","Redução voluntária de velocidade para poupar combustível e reduzir emissões","Navegação entre gelos","Manobra lenta de atracação"],correct:1,expl:"Slow steaming = reduzir velocidade para 12-15 nós em vez de 18-25. Poupança de combustível: 50% a 12 vs 25 nós (potência ∝ velocidade³). Iniciado em 2008. Problema: motores concebidos para plena potência → desgaste a carga parcial."},
  {q:"Qual é o papel da 'lavagem' (scavenging) num motor 2T marítimo?",opts:["Purificar a água de arrefecimento","Evacuar os gases queimados e encher o cilindro com ar fresco entre o escape e a combustão","Filtrar o HFO","Lubrificar os pistões"],correct:1,expl:"Num motor 2T, o ar sob pressão (turbocompressor + soprador) expulsa os gases de escape e enche o cilindro com ar fresco. É a lavagem. Crucial para o rendimento — se falhar: falta de ar → fumo preto → potência reduzida."},
  {q:"Com que frequência se analisa normalmente o óleo do motor?",opts:["Todos os dias","Todas as semanas","Cada ~500h de uso","Apenas nas revisões anuais"],correct:2,expl:"Análise de óleo cada ~500h de uso ou conforme fabricante. Revela: desgaste de metais (ferro, cobre, alumínio), contaminação (água, combustível), viscosidade. Deteta avarias antes que se tornem catastróficas."},
  {q:"O que é o índice de viscosidade SAE de um óleo de motor?",opts:["A cor do óleo","Densidade do óleo em relação à água","Classificação da viscosidade do óleo conforme a temperatura","Teor de enxofre do óleo"],correct:2,expl:"SAE classifica a viscosidade. SAE 30 = mais fluido. SAE 40 = mais viscoso. Marítimo: SAE 30 ou SAE 40 para motores principais. Demasiado fino → má lubrificação. Demasiado espesso → difícil de bombear no arranque."},
  {q:"O que é um 'permutador de calor' no sistema de arrefecimento?",opts:["Um radiador como nos carros","Um aparelho que transfere o calor da água doce quente para a água do mar fria sem misturar os dois fluidos","Um aparelho que aquece a água do mar para a tornar potável","Um filtro para a água do mar"],correct:1,expl:"Permutador = transferência térmica entre dois fluidos sem contacto direto. Água doce quente (80°C) cede calor à água do mar fria (~28°C Golfo da Guiné). Água doce arrefecida → volta ao motor. Água do mar aquecida → ao mar."},
  {q:"Qual é a diferença entre MDO e HFO?",opts:["São dois nomes do mesmo combustível","MDO = diesel marítimo destilado (mais limpo, mais caro) · HFO = fuelóleo residual (mais barato, mais poluente)","MDO = combustível só para auxiliares","HFO = combustível só para motores 4T"],correct:1,expl:"MDO = destilado, limpo, menos viscoso, usado em zonas ECA e auxiliares. HFO = residual, muito viscoso, mais barato, usado em alto mar. LSFO = HFO com baixo teor de enxofre (<0,5%) desde MARPOL 2020."},
  {q:"O que cobre o MARPOL Anexo VI sobre os motores marítimos?",opts:["Regulamento sobre resíduos sólidos","Limites de emissões NOx, SOx e PM para motores marítimos","Regulamento sobre águas de lastro","Normas de ruído dos motores"],correct:1,expl:"MARPOL Anexo VI: prevenção da poluição atmosférica. Limita NOx por Tier (I/II/III), SOx (limite mundial 0,5% desde 2020, 0,1% em ECA), e PM. Motores Tier III precisam SCR ou EGR para reduzir NOx em 80%."},
  {q:"O que é um 'blackout' a bordo de um navio?",opts:["Apenas falha de iluminação","Perda total de eletricidade que afeta propulsão e todos os sistemas vitais","Apenas falha do motor principal","Falha do sistema de navegação"],correct:1,expl:"Blackout = perda total de alimentação elétrica. Impacto: perda de propulsão (motores elétricos), navegação (ECDIS, radar, AIS), comunicações, bombas. Procedimento: grupo gerador de emergência deve arrancar em < 30 s (SOLAS)."},
  {q:"Qual é a sequência correta de arranque do motor principal?",opts:["Arranque direto a plena potência","Verificar parâmetros → pré-aquecimento → arranque por ar → mudar para combustível → subida progressiva de potência","Arranque com combustível → verificar depois","Arranque elétrico direto"],correct:1,expl:"Sequência: 1) Verificar níveis óleo, água, combustível. 2) Pré-aquecer o motor. 3) Arranque por ar comprimido (25-30 bar). 4) Passar de MDO a HFO depois de aquecer. 5) Subida progressiva de potência. 6) Vigilância de parâmetros. Ir diretamente a plena potência = avaria garantida."},
  {q:"Porque é que os motores marítimos principais funcionam com HFO aquecido e não diretamente?",opts:["Para poupar eletricidade","O HFO é muito viscoso à temperatura ambiente (como alcatrão) → deve ser aquecido a 120-150°C para ser injetável","Para reduzir emissões","Para melhorar a combustão a frio"],correct:1,expl:"O HFO tem viscosidade muito alta à temperatura ambiente (como alcatrão). Deve ser aquecido a 120-150°C para fluir nos injetores. Circuito de aquecimento (serpentinas de vapor ou elétricas) obrigatório. Se falhar → impossível alimentar o motor."},
];

const BANKS = { fr: BANK_FR, en: BANK_EN, es: BANK_ES, pt: BANK_PT };

// ══════════════════════════════════════
// BANK COMPONENT
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const BANK = BANKS[lang]||BANKS.fr;
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const q=BANK[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<BANK.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done) return <div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48,marginBottom:8}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{BANK.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/BANK.length*100)}%</div></div>;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{BANK.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/BANK.length)*100}%`,background:`linear-gradient(90deg,${C.rust},${C.orange})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.rust},${C.orange})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<BANK.length-1?(({fr:"SUIVANT →",en:"NEXT →",es:"SIGUIENTE →",pt:"PRÓXIMO →"})[lang]||"SUIVANT →"):(({fr:"TERMINER",en:"FINISH",es:"TERMINAR",pt:"TERMINAR"})[lang]||"TERMINER")}</button></>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"3",q2:"80",q3:"oui"};
  const qs = {
    fr:[
      {id:"q1",q:"Cycle 4 temps — Quel temps produit la puissance ?\n(Répondre : 1, 2, 3 ou 4)"},
      {id:"q2",q:"Température eau douce normale (min en °C) ?\nRépondre : valeur minimale uniquement"},
      {id:"q3",q:"Pression huile = 2 bars. Faut-il arrêter le moteur ?\n(Répondre : oui ou non)"},
    ],
    en:[
      {id:"q1",q:"4-stroke cycle — Which stroke produces power?\n(Answer: 1, 2, 3 or 4)"},
      {id:"q2",q:"Normal fresh water temperature (min in °C)?\nAnswer: minimum value only"},
      {id:"q3",q:"Oil pressure = 2 bar. Must you stop the engine?\n(Answer: yes or no)"},
    ],
    es:[
      {id:"q1",q:"Ciclo 4 tiempos — ¿Qué tiempo produce la potencia?\n(Responder: 1, 2, 3 o 4)"},
      {id:"q2",q:"Temperatura normal agua dulce (mín en °C)?\nResponder solo el valor mínimo"},
      {id:"q3",q:"Presión aceite = 2 bares. ¿Hay que parar el motor?\n(Responder: sí o no)"},
    ],
    pt:[
      {id:"q1",q:"Ciclo 4 tempos — Qual tempo produz a potência?\n(Responder: 1, 2, 3 ou 4)"},
      {id:"q2",q:"Temperatura normal água doce (mín em °C)?\nResponder apenas o valor mínimo"},
      {id:"q3",q:"Pressão óleo = 2 bar. É necessário parar o motor?\n(Responder: sim ou não)"},
    ],
  };
  const list = qs[lang]||qs.fr;
  const chk = (id,val) => {
    const v = val.trim().toLowerCase();
    if(id==="q1") return v==="3";
    if(id==="q2") return v==="70"||v==="70°c"||v==="70 c";
    if(id==="q3") return v==="oui"||v==="yes"||v==="sí"||v==="si"||v==="sim";
    return false;
  };
  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:14,border:`1px solid ${C.orange}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : 4 temps = Admission·Compression·Combustion·Échappement · Huile normale 3-5 bar · EAU 70-85°C":
         lang==="en"?"💡 Reminders: 4 strokes = Intake·Compression·Power·Exhaust · Oil normal 3-5 bar · FW 70-85°C":
         lang==="es"?"💡 Recordatorios: 4 tiempos = Admisión·Compresión·Combustión·Escape · Aceite 3-5 bar · AD 70-85°C":
         "💡 Lembretes: 4 tempos = Admissão·Compressão·Combustão·Escape · Óleo 3-5 bar · AD 70-85°C"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))}
            placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",
              border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,
              color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>
            {chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}
          </div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.6,marginBottom:10}}>
        {({
          fr:"✅ Q1: 3 (combustion = seul temps producteur)\n✅ Q2: 70°C (normal : 70-85°C · alarme >90°C)\n✅ Q3: OUI — 2 bars < 2,5 bars → arrêt immédiat obligatoire",
          en:"✅ Q1: 3 (combustion = only power-producing stroke)\n✅ Q2: 70°C (normal: 70-85°C · alarm >90°C)\n✅ Q3: YES — 2 bar < 2.5 bar → immediate stop mandatory",
          es:"✅ Q1: 3 (combustión = único tiempo productor)\n✅ Q2: 70°C (normal: 70-85°C · alarma >90°C)\n✅ Q3: SÍ — 2 bar < 2,5 bar → parada inmediata obligatoria",
          pt:"✅ Q1: 3 (combustão = único tempo produtor)\n✅ Q2: 70°C (normal: 70-85°C · alarme >90°C)\n✅ Q3: SIM — 2 bar < 2,5 bar → paragem imediata obrigatória",
        })[lang]||""}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════
function Stars(){const s=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.orange}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?150:fs===3?100:50;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.orange}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.orange,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.orange:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"⚙️ Module Machine · Leçon 1/8 · 🆓 Gratuit · 150 XP",
      title:"Moteur Principal Diesel & Refroidissement",
      intro:"Le moteur diesel est le cœur du navire. Sans lui, pas de propulsion, pas d'électricité, pas de vie à bord.\n\nUn officier mécanicien comprend chaque battement de ce cœur — chaque cycle, chaque paramètre, chaque alarme. Cette leçon couvre les fondamentaux du moteur diesel marin et son système de refroidissement.",
      p1:"PARTIE 1 — CYCLE DIESEL À 4 TEMPS",s1t:"Admission · Compression · Combustion · Échappement",
      s1:"PRINCIPE FONDAMENTAL :\nLe diesel n'utilise PAS de bougie.\nL'air est comprimé jusqu'à 500-700°C\npuis le carburant est injecté et s'enflamme seul.\n\nCYCLE À 4 TEMPS :\n1. ADMISSION : soupape d'admission ouvre · piston descend · aspire l'air\n2. COMPRESSION : toutes soupapes fermées · piston monte · comprime l'air · ratio 14:1 à 25:1\n3. COMBUSTION : injection carburant · explosion · piston poussé vers le bas · SEUL TEMPS PRODUCTEUR\n4. ÉCHAPPEMENT : soupape échappement ouvre · piston monte · expulse gaz brûlés\n\nMOTEUR 2 TEMPS MARIN (grands navires) :\nPuissance à chaque rotation du vilebrequin\nVitesse : 80-130 RPM (très lent)\nPuissance jusqu'à 100 000 kW\nBrands : MAN B&W · Wärtsilä",
      p2:"PARTIE 2 — COMPOSANTS PRINCIPAUX",s2t:"Coupe moteur — composants cliquables",
      s2:"COMPOSANTS CLÉS :\n\nPiston + Cylindre :\nAlliage aluminium/acier · 500-600 RPM\nJeu piston-cylindre : 0,1 à 0,5 mm\n\nVilebrequin (crankshaft) :\nConvertit mouvement linéaire → rotatif\nForgé acier haute résistance\n\nTurbocompresseur :\nUtilise gaz d'échappement pour comprimer l'air\nAugmente puissance de 30 à 50%\nTempérature gaz : jusqu'à 500°C\n\nArbre porte-hélice :\nTransmet puissance moteur → hélice\nLongueur : 10 à 100 mètres selon le navire",
      p3:"PARTIE 3 — SYSTÈME DE REFROIDISSEMENT",s3t:"Circuit eau douce · eau de mer · huile",
      s3:"PRINCIPE ESSENTIEL :\nL'eau de mer ne touche JAMAIS le moteur directement\n→ Trop corrosive, trop calcaire\n\nCIRCUIT EAU DOUCE (fermé) :\n→ Circule dans le moteur\n→ Température normale : 70-85°C\n→ Alarme : 90°C · Arrêt urgence : 95°C\n→ Additifs anticorrosion obligatoires\n\nCIRCUIT EAU DE MER (ouvert) :\n→ Refroidit l'eau douce via l'échangeur\n→ Puisée directement dans la mer\n→ ~28°C au Golfe de Guinée\n→ Filtre à entretenir (biofouling)\n\nCIRCUIT HUILE :\n→ Lubrifie ET refroidit simultanément\n→ Pression normale : 3-5 bars\n→ ⚠️ Pression < 2,5 bars = ALARME CRITIQUE\n→ ⚠️ Pression < 2 bars = ARRÊT AUTOMATIQUE",
      p4:"PARTIE 4 — SURVEILLANCE & PARAMÈTRES",s4t:"Paramètres critiques — simulateur d'alarmes",
      s4:"PARAMÈTRES À SURVEILLER EN PERMANENCE :\n\nRPM (tours/minute) :\nNormal : 80-100 RPM\nAlarme : > 105 RPM (survitesse)\n\nTempérature eau douce :\nNormal : 70-85°C\nAlarme : > 90°C · Arrêt : > 95°C\n\nPression huile :\nNormal : 3-5 bars\nAlarme : < 2,5 bars · Arrêt : < 2 bars\n\nCharge moteur :\nNormal : 60-85% MCR\nAlarme : > 90% MCR\n\nMCR = Maximum Continuous Rating\n= Puissance maximale continue autorisée\n\nJOURNAL MACHINE (Engine Log) :\nNote obligatoire toutes les 4 heures\nContenu : tous les paramètres, alarmes, actions",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL D'ACCIDENT",p7:"📝 BANQUE DE QUESTIONS — 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 1 MACHINE",
      sumP:["Cycle diesel : Admission·Compression·Combustion·Échappement","Combustion = seul temps producteur de puissance","2 temps = 1 puissance/révolution · 80-130 RPM · 100 000 kW","Eau douce (fermée) : 70-85°C · EAU DE MER refroidit via échangeur","Huile : 3-5 bars · < 2,5 bars = alarme · < 2 bars = arrêt","Turbocompresseur : +30-50% puissance via gaz échappement","MCR = puissance maximale continue · journal machine 4h","Ever Given : avarie machine en zone critique = catastrophe"],
      learnedP:["Cycle 4 temps : Admission·Compression·Combustion·Échappement","Combustion = seul temps producteur","Eau douce 70-85°C · eau de mer via échangeur","Huile 3-5 bars · < 2 bars = arrêt automatique","Turbocompresseur · MCR · journal machine"],
    },
    en:{
      badge:"⚙️ Engine Module · Lesson 1/8 · 🆓 Free · 150 XP",
      title:"Main Diesel Engine & Cooling System",
      intro:"The diesel engine is the heart of the ship. Without it, no propulsion, no electricity, no life on board.\n\nAn engineer officer understands every beat of this heart — every cycle, every parameter, every alarm. This lesson covers marine diesel engine fundamentals and its cooling system.",
      p1:"PART 1 — 4-STROKE DIESEL CYCLE",s1t:"Intake · Compression · Power · Exhaust",
      s1:"FUNDAMENTAL PRINCIPLE:\nDiesel does NOT use spark plugs.\nAir is compressed to 500-700°C\nthen fuel is injected and ignites spontaneously.\n\n4-STROKE CYCLE:\n1. INTAKE: intake valve opens · piston descends · draws in air\n2. COMPRESSION: all valves closed · piston rises · compresses air · ratio 14:1 to 25:1\n3. POWER: fuel injection · explosion · piston pushed down · ONLY POWER-PRODUCING STROKE\n4. EXHAUST: exhaust valve opens · piston rises · expels burnt gases\n\n2-STROKE MARINE ENGINE (large vessels):\nPower every crankshaft revolution\nSpeed: 80-130 RPM (very slow)\nPower up to 100,000 kW\nBrands: MAN B&W · Wärtsilä",
      p2:"PART 2 — MAIN COMPONENTS",s2t:"Engine cross-section — clickable components",
      s2:"KEY COMPONENTS:\n\nPiston + Cylinder:\nAluminum/steel alloy · 500-600 RPM\n\nCrankshaft:\nConverts linear motion → rotary\nForged high-strength steel\n\nTurbocharger:\nUses exhaust gases to compress intake air\nIncreases power by 30 to 50%\nGas temperature: up to 500°C\n\nPropeller shaft:\nTransmits engine power → propeller\nLength: 10 to 100 meters",
      p3:"PART 3 — COOLING SYSTEM",s3t:"Fresh water · sea water · oil circuits",
      s3:"ESSENTIAL PRINCIPLE:\nSea water NEVER touches the engine directly\n→ Too corrosive, too calcified\n\nFRESH WATER CIRCUIT (closed):\n→ Circulates through engine\n→ Normal temperature: 70-85°C\n→ Alarm: 90°C · Emergency stop: 95°C\n\nSEA WATER CIRCUIT (open):\n→ Cools fresh water via heat exchanger\n→ Drawn directly from sea\n→ ~28°C in Gulf of Guinea\n\nOIL CIRCUIT:\n→ Lubricates AND cools simultaneously\n→ Normal pressure: 3-5 bar\n→ ⚠️ Pressure < 2.5 bar = CRITICAL ALARM\n→ ⚠️ Pressure < 2 bar = AUTOMATIC STOP",
      p4:"PART 4 — MONITORING & PARAMETERS",s4t:"Critical parameters — alarm simulator",
      s4:"PARAMETERS TO MONITOR CONTINUOUSLY:\n\nRPM: Normal 80-100 · Alarm >105 (overspeed)\nFW Temperature: Normal 70-85°C · Alarm >90°C\nOil Pressure: Normal 3-5 bar · Alarm <2.5 · Stop <2\nEngine Load: Normal 60-85% MCR · Alarm >90%\n\nMCR = Maximum Continuous Rating\n= Maximum authorized continuous power\n\nENGINE LOG:\nMandatory entry every 4 hours\nContent: all parameters, alarms, actions",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — ENGINE LESSON 1",
      sumP:["Diesel cycle: Intake·Compression·Power·Exhaust","Power stroke = only power-producing stroke","2-stroke = 1 power/revolution · 80-130 RPM · 100,000 kW","Fresh water (closed): 70-85°C · Sea water cools via exchanger","Oil: 3-5 bar · <2.5 bar = alarm · <2 bar = auto stop","Turbocharger: +30-50% power via exhaust gases","MCR = max continuous power · engine log every 4h","Ever Given: engine failure in critical zone = catastrophe"],
      learnedP:["4-stroke cycle: Intake·Compression·Power·Exhaust","Power stroke = only power-producing","FW 70-85°C · sea water via exchanger","Oil 3-5 bar · <2 bar = automatic stop","Turbocharger · MCR · engine log"],
    },
    es:{
      badge:"⚙️ Módulo Máquinas · Lección 1/8 · 🆓 Gratis · 150 XP",
      title:"Motor Principal Diesel y Refrigeración",
      intro:"El motor diesel es el corazón del buque. Sin él, sin propulsión, sin electricidad, sin vida a bordo.",
      p1:"PARTE 1 — CICLO DIESEL DE 4 TIEMPOS",s1t:"Admisión · Compresión · Combustión · Escape",
      s1:"PRINCIPIO FUNDAMENTAL:\nEl diesel NO usa bujías.\nEl aire se comprime hasta 500-700°C\nluego el combustible se inyecta y se inflama solo.\n\nCICLO DE 4 TIEMPOS:\n1. ADMISIÓN · 2. COMPRESIÓN · 3. COMBUSTIÓN (único tiempo productor) · 4. ESCAPE\n\nMOTOR 2 TIEMPOS MARINO:\nPotencia en cada revolución del cigüeñal\nVelocidad: 80-130 RPM · Potencia hasta 100.000 kW\nMarcas: MAN B&W · Wärtsilä",
      p2:"PARTE 2 — COMPONENTES PRINCIPALES",s2t:"Sección transversal — componentes interactivos",
      s2:"Pistón + Cilindro · Cigüeñal · Turbocompresor (+30-50% potencia) · Eje portahélice",
      p3:"PARTE 3 — SISTEMA DE REFRIGERACIÓN",s3t:"Agua dulce · agua de mar · aceite",
      s3:"El agua de mar NUNCA toca el motor directamente.\n\nAGUA DULCE (circuito cerrado): 70-85°C · Alarma >90°C · Parada >95°C\nAGUA DE MAR (circuito abierto): Enfría el AD vía intercambiador · ~28°C (Golfo de Guinea)\nACEITE: 3-5 bares · <2,5 = alarma · <2 = parada automática",
      p4:"PARTE 4 — VIGILANCIA Y PARÁMETROS",s4t:"Parámetros críticos — simulador de alarmas",
      s4:"RPM: Normal 80-100 · Alarma >105\nTemp. AD: Normal 70-85°C · Alarma >90°C\nPresión aceite: Normal 3-5 bar · Alarma <2,5 · Parada <2\nCarga motor: Normal 60-85% MCR\n\nMCR = Potencia Máxima Continua\nCUADERNO DE MÁQUINAS: Anotación obligatoria cada 4 horas",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 1 MÁQUINAS",
      sumP:["Ciclo diesel: Admisión·Compresión·Combustión·Escape","Combustión = único tiempo productor","2 tiempos = 1 potencia/revolución · 80-130 RPM","AD (cerrado): 70-85°C · AM enfría vía intercambiador","Aceite: 3-5 bar · <2,5 = alarma · <2 = parada auto","Turbocompresor: +30-50% potencia","MCR = potencia máxima continua · cuaderno cada 4h"],
      learnedP:["Ciclo 4 tiempos · combustión = único productor","AD 70-85°C · AM vía intercambiador","Aceite 3-5 bar · <2 = parada automática","Turbocompresor · MCR · cuaderno máquinas"],
    },
    pt:{
      badge:"⚙️ Módulo Máquinas · Lição 1/8 · 🆓 Grátis · 150 XP",
      title:"Motor Principal Diesel e Arrefecimento",
      intro:"O motor diesel é o coração do navio. Sem ele, sem propulsão, sem eletricidade, sem vida a bordo.",
      p1:"PARTE 1 — CICLO DIESEL DE 4 TEMPOS",s1t:"Admissão · Compressão · Combustão · Escape",
      s1:"PRINCÍPIO FUNDAMENTAL:\nO diesel NÃO usa velas de ignição.\nO ar é comprimido até 500-700°C\ndepois o combustível é injetado e inflama sozinho.\n\nCICLO DE 4 TEMPOS:\n1. ADMISSÃO · 2. COMPRESSÃO · 3. COMBUSTÃO (único tempo produtor) · 4. ESCAPE\n\nMOTOR 2 TEMPOS MARÍTIMO:\nPotência em cada revolução do virabrequim\nVelocidade: 80-130 RPM · Potência até 100.000 kW\nMarcas: MAN B&W · Wärtsilä",
      p2:"PARTE 2 — COMPONENTES PRINCIPAIS",s2t:"Secção transversal — componentes interativos",
      s2:"Pistão + Cilindro · Virabrequim · Turbocompressor (+30-50% potência) · Eixo porta-hélice",
      p3:"PARTE 3 — SISTEMA DE ARREFECIMENTO",s3t:"Água doce · água salgada · óleo",
      s3:"A água do mar NUNCA toca o motor diretamente.\n\nÁGUA DOCE (circuito fechado): 70-85°C · Alarme >90°C · Paragem >95°C\nÁGUA SALGADA (circuito aberto): Arrefece a AD via permutador · ~28°C (Golfo da Guiné)\nÓLEO: 3-5 bar · <2,5 = alarme · <2 = paragem automática",
      p4:"PARTE 4 — MONITORIZAÇÃO E PARÂMETROS",s4t:"Parâmetros críticos — simulador de alarmes",
      s4:"RPM: Normal 80-100 · Alarme >105\nTemp. AD: Normal 70-85°C · Alarme >90°C\nPressão óleo: Normal 3-5 bar · Alarme <2,5 · Paragem <2\nCarga motor: Normal 60-85% MCR\n\nMCR = Potência Máxima Contínua\nDIÁRIO DE MÁQUINAS: Registo obrigatório a cada 4 horas",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 1 MÁQUINAS",
      sumP:["Ciclo diesel: Admissão·Compressão·Combustão·Escape","Combustão = único tempo produtor","2 tempos = 1 potência/revolução · 80-130 RPM","AD (fechado): 70-85°C · AM arrefece via permutador","Óleo: 3-5 bar · <2,5 = alarme · <2 = paragem auto","Turbocompressor: +30-50% potência","MCR = potência máxima contínua · diário cada 4h"],
      learnedP:["Ciclo 4 tempos · combustão = único produtor","AD 70-85°C · AM via permutador","Óleo 3-5 bar · <2 = paragem automática","Turbocompressor · MCR · diário máquinas"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonMoteur({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);
  const progress = phase==="content"?15:phase==="quiz"?70:100;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#0d1a0d 0%,${C.navy2} 40%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.orange}33`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.orange,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚙️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{t.lessonNum}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(30,138,74,0.2)",border:`1px solid ${C.green}44`,color:C.green,fontWeight:700}}>🆓 FREE</div>
            <div style={{fontSize:11,color:C.orange,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.rust},${C.orange},${C.gold2})`,transition:"width 0.5s ease"}}/>
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

            <SL icon="🔄" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔄</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔄 {t.cycleAnim}</div><DieselCycleSVG lang={lang}/></Card>

            <SL icon="⚙️" text={lc.p2} color={C.steel}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚙️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.steel,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚙️ {t.crossInter}</div><EngineCrossSectionSVG lang={lang}/></Card>

            <SL icon="💧" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💧</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`,background:"linear-gradient(135deg,rgba(26,111,212,0.06),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💧 {t.coolInter}</div>
              <CoolingCircuitSVG lang={lang}/>
            </Card>

            <SL icon="📊" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📊</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📊 {t.simParam}</div>
              <EngineMonitorSVG lang={lang}/>
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

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.rust},${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(230,126,34,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {t.quizTitle}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {t.quizSub}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?150:quizScore===3?100:50} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.4)",marginBottom:10}}>
              {t.lesson2Btn}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
