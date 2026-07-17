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
  fr:{ back:"◀ Retour", module:"Module Machine", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Engine Module", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo Máquinas", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo Máquinas", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
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
          {lang==="fr"?"Adm.":lang==="en"?"In.":lang==="es"?"Adm.":"Adm."}
        </text>

        {/* Exhaust valve */}
        <rect x="163" y="18" width="20" height="8" rx="3"
          fill={s.valveEx?"rgba(100,100,100,0.6)":"rgba(255,255,255,0.1)"}
          stroke={s.valveEx?C.steel:"rgba(255,255,255,0.2)"} strokeWidth="1.5"/>
        <text x="173" y="14" textAnchor="middle" fontSize="6" fill={s.valveEx?C.white:C.muted}>
          {lang==="fr"?"Éch.":lang==="en"?"Ex.":lang==="es"?"Esc.":"Esc."}
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
          {lang==="fr"?"Air":lang==="en"?"Air":lang==="es"?"Aire":"Ar"}
        </text>
        <text x="230" y="40" textAnchor="middle" fontSize="7" fill={C.muted}>
          {lang==="fr"?"Gaz":lang==="en"?"Gas":lang==="es"?"Gas":"Gás"}
        </text>
        <text x="145" y="186" textAnchor="middle" fontSize="7" fill={C.gold}>
          {lang==="fr"?"Vilebrequin":lang==="en"?"Crankshaft":lang==="es"?"Cigüeñal":"Virabrequim"}
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
          ◀ {lang==="fr"?"Précédent":"Previous"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(3,s+1))} disabled={step===3}
          style={{flex:1,padding:"8px",borderRadius:10,background:step===3?"rgba(255,255,255,0.06)":`linear-gradient(135deg,${s.color}44,${C.blue}44)`,border:`1px solid ${step===3?"rgba(255,255,255,0.1)":s.color}`,color:C.white,cursor:step===3?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":"Next"} ▶
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
          {lang==="fr"?"MOTEUR":lang==="en"?"ENGINE":lang==="es"?"MOTOR":"MOTOR"}
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
            <text x="25" y="74" textAnchor="middle" fontSize="6" fill={C.muted}>vers moteur</text>
          </>}
        </>}

        {/* HEAT EXCHANGER */}
        <rect x="210" y="70" width="65" height="50" rx="6" fill="rgba(10,138,108,0.15)" stroke={C.teal} strokeWidth="1.5"/>
        <text x="242" y="91" textAnchor="middle" fontSize="7" fill={C.teal} fontWeight="700">
          {lang==="fr"?"Échangeur":lang==="en"?"Heat Exch.":lang==="es"?"Intercamb.":"Permutador"}
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
            {lang==="fr"?"Prise de mer":lang==="en"?"Sea chest":lang==="es"?"Toma de mar":"Tomada de mar"}
          </text>
          {/* Temp labels */}
          <rect x="158" y="150" width="46" height="22" rx="5" fill="rgba(10,138,108,0.15)" stroke={C.teal} strokeWidth="0.8"/>
          <text x="181" y="160" textAnchor="middle" fontSize="7" fill={C.teal}>~28°C</text>
          <text x="181" y="169" textAnchor="middle" fontSize="6" fill={C.muted}>{lang==="fr"?"Golfe Guinée":"Gulf Guinea"}</text>
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
            {lang==="fr"?"Carter huile (sump)":lang==="en"?"Oil sump":lang==="es"?"Cárter aceite":"Cárter óleo"}
          </text>
          <rect x="5" y="30" width="86" height="20" rx="5" fill="rgba(141,59,43,0.15)" stroke={C.rust} strokeWidth="0.8"/>
          <text x="48" y="40" textAnchor="middle" fontSize="7" fill={C.rust}>SAE 30 · 3-5 bar</text>
          <text x="48" y="48" textAnchor="middle" fontSize="6" fill={C.muted}>
            {lang==="fr"?"⚠️ Pression critique":lang==="en"?"⚠️ Critical pressure":lang==="es"?"⚠️ Presión crítica":"⚠️ Pressão crítica"}
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
        {highlight==="fw"&&(lang==="fr"
          ?"💧 EAU DOUCE (circuit fermé) :\n→ Refroidit directement les cylindres et l'huile\n→ Température normale : 70-85°C\n→ Alerte à 90°C · Arrêt d'urgence à 95°C\n→ Additifs anti-corrosion obligatoires"
          :lang==="en"
          ?"💧 FRESH WATER (closed circuit):\n→ Directly cools cylinders and oil\n→ Normal temperature: 70-85°C\n→ Alert at 90°C · Emergency stop at 95°C\n→ Anti-corrosion additives mandatory"
          :"💧 AGUA DULCE (circuito cerrado):\n→ Enfría directamente cilindros y aceite\n→ Temperatura normal: 70-85°C\n→ Alarma 90°C · Parada emergencia 95°C")}
        {highlight==="sw"&&(lang==="fr"
          ?"🌊 EAU DE MER (circuit ouvert) :\n→ Refroidit l'eau douce via l'échangeur\n→ Puisée directement dans la mer\n→ Température : ~28°C (Golfe de Guinée)\n→ ⚠️ Filtre à entretenir régulièrement\n→ ⚠️ Risque de corrosion et de biofouling"
          :lang==="en"
          ?"🌊 SEA WATER (open circuit):\n→ Cools fresh water via heat exchanger\n→ Drawn directly from the sea\n→ Temperature: ~28°C (Gulf of Guinea)\n→ ⚠️ Filter requires regular maintenance\n→ ⚠️ Corrosion and biofouling risk"
          :"🌊 AGUA DE MAR (circuito abierto):\n→ Enfría el agua dulce vía intercambiador\n→ Extraída directamente del mar\n→ Temperatura: ~28°C (Golfo de Guinea)\n→ ⚠️ Riesgo de corrosión y biofouling")}
        {highlight==="oil"&&(lang==="fr"
          ?"🛢️ CIRCUIT HUILE :\n→ Lubrifie ET refroidit simultanément\n→ Pression normale : 3-5 bars\n→ ⚠️ Chute de pression = arrêt immédiat\n→ Analyse huile tous les 500h d'utilisation\n→ Carter (sump) : contient 200-2000 litres"
          :lang==="en"
          ?"🛢️ OIL CIRCUIT:\n→ Lubricates AND cools simultaneously\n→ Normal pressure: 3-5 bar\n→ ⚠️ Pressure drop = immediate stop\n→ Oil analysis every 500 operating hours\n→ Sump: contains 200-2000 litres"
          :"🛢️ CIRCUITO ACEITE:\n→ Lubrica Y enfría simultáneamente\n→ Presión normal: 3-5 bares\n→ ⚠️ Caída de presión = parada inmediata\n→ Análisis aceite cada 500h de uso")}
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
              ?(lang==="fr"?"⚠️ ALARME — ACTION REQUISE":lang==="en"?"⚠️ ALARM — ACTION REQUIRED":lang==="es"?"⚠️ ALARMA — ACCIÓN REQUERIDA":"⚠️ ALARME — AÇÃO NECESSÁRIA")
              :overallStatus==="warning"
              ?(lang==="fr"?"⚡ ATTENTION — Surveiller":lang==="en"?"⚡ CAUTION — Monitor":lang==="es"?"⚡ ATENCIÓN — Vigilar":"⚡ ATENÇÃO — Vigiar")
              :(lang==="fr"?"✅ Moteur nominal":lang==="en"?"✅ Engine nominal":lang==="es"?"✅ Motor nominal":"✅ Motor nominal")}
          </div>
          <div style={{fontSize:10,color:C.muted}}>
            {lang==="fr"?"Ajuste les curseurs pour simuler des pannes":lang==="en"?"Adjust sliders to simulate failures":lang==="es"?"Ajusta los controles para simular averías":"Ajuste os controles para simular avarias"}
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
            <span>{lang==="fr"?"Normal:":lang==="en"?"Normal:":lang==="es"?"Normal:":"Normal:"} {p.normal}</span>
            <span style={{color:C.red}}>{lang==="fr"?"Alarme:":lang==="en"?"Alarm:":lang==="es"?"Alarma:":"Alarme:"} {p.danger}</span>
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
// BANK 15 QUESTIONS
// ══════════════════════════════════════
const BANK = {
  fr:[
    {q:"Quelle est la différence fondamentale entre un moteur diesel et un moteur à essence ?",opts:["Le diesel utilise de l'électricité pour l'allumage","Le diesel allume le carburant par la chaleur de compression (pas de bougie)","Le diesel n'a pas de pistons","Le diesel est plus petit que l'essence"],correct:1,expl:"Diesel = allumage par compression. L'air est comprimé jusqu'à 500-700°C, puis le carburant est injecté et s'enflamme spontanément. Pas de bougie. Ratio de compression 14:1 à 25:1."},
    {q:"Les moteurs 2 temps marins (MAN B&W, Wärtsilä) tournent à quelle vitesse ?",opts:["500-3000 RPM comme les voitures","200-400 RPM","80-130 RPM — très lentement pour entraîner l'hélice directement","20-50 RPM"],correct:2,expl:"Moteurs 2 temps slow speed : 80-130 RPM. Vitesse très basse permet d'entraîner directement l'hélice sans réducteur. Moteurs 4 temps medium speed : 400-1200 RPM avec réducteur."},
    {q:"Qu'est-ce que le HFO (Heavy Fuel Oil) ?",opts:["Diesel ordinaire","Fuel lourd résiduel très visqueux, moins cher mais polluant (MARPOL VI)","Gaz naturel liquéfié","Carburant d'aviation"],correct:1,expl:"HFO = mazout lourd résiduel. Viscosité élevée → chauffé à 120-150°C avant injection. Riche en soufre. Zone ECA : obligation MDO/MGO. Prix HFO ~60% moins cher que MDO."},
    {q:"Qu'est-ce qu'un arrêt d'urgence (emergency shutdown) du moteur ?",opts:["Réduction volontaire de vitesse","Arrêt automatique quand un paramètre critique dépasse les limites","Arrêt programmé pour maintenance","Signal d'alarme sonore uniquement"],correct:1,expl:"Emergency shutdown = arrêt automatique : basse pression huile, haute température eau, survitesse. Irréversible sans intervention. Le navire perd la propulsion."},
    {q:"Pourquoi l'eau de mer ne circule-t-elle pas directement dans le moteur ?",opts:["Trop froide","Trop corrosive et calcaire — endommage les conduits internes","Trop salée pour les pompes","Contient du plancton dangereux"],correct:1,expl:"L'eau de mer est corrosive et calcaire. Elle refroidit l'eau douce via un échangeur. Circuit fermé d'eau douce dans le moteur. Circuit ouvert d'eau de mer à l'extérieur."},
    {q:"Qu'est-ce que le slow steaming pratiqué depuis 2008 ?",opts:["Navigation par mauvais temps","Réduction volontaire de vitesse pour économiser carburant","Navigation dans les glaces","Manœuvre d'accostage lente"],correct:1,expl:"Slow steaming = réduction à 12-15 kn au lieu de 18-25 kn. Économies : 50% de carburant. Initié en 2008 avec la hausse du pétrole. Puissance ∝ vitesse³."},
    {q:"Quel est le rôle du scavenging (balayage) dans un moteur 2 temps ?",opts:["Purifier l'eau de refroidissement","Évacuer les gaz brûlés et remplir le cylindre d'air frais","Filtrer le carburant HFO","Lubrifier les pistons"],correct:1,expl:"L'air sous pression (turbocompresseur) chasse les gaz d'échappement et remplit le cylindre d'air frais. Si défaillant : manque d'air → fumée noire → puissance réduite."},
    {q:"À quelle fréquence analyser l'huile moteur ?",opts:["Tous les jours","Toutes les semaines","Tous les 500h d'utilisation environ","Uniquement lors des révisions annuelles"],correct:2,expl:"Analyse tous les ~500h. Révèle : usure métaux, contamination, viscosité. Permet de détecter une avarie avant catastrophe."},
    {q:"Que signifie SAE 30 pour une huile moteur ?",opts:["La couleur de l'huile","La densité","La classification de viscosité selon la température","La teneur en soufre"],correct:2,expl:"SAE = classification de viscosité. SAE 30 = moins visqueux. SAE 40 = plus visqueux. Marine : SAE 30 ou 40 pour les moteurs principaux."},
    {q:"Qu'est-ce qu'un échangeur de chaleur dans le refroidissement ?",opts:["Un radiateur comme les voitures","Appareil qui transfère chaleur entre eau douce et eau de mer sans les mélanger","Appareil qui chauffe l'eau de mer","Un filtre eau de mer"],correct:1,expl:"Échangeur = transfert thermique sans contact direct. Eau douce chaude (80°C) → cède sa chaleur à l'eau de mer froide (~28°C au Golfe de Guinée)."},
    {q:"Quelle est la différence entre MDO et HFO ?",opts:["Même carburant, noms différents","MDO = diesel distillé (propre, cher) · HFO = résiduel (moins cher, polluant)","MDO = auxiliaires uniquement","HFO = moteurs 4 temps uniquement"],correct:1,expl:"MDO = distillé, propre, moins visqueux, zones ECA. HFO = résiduel, très visqueux, moins cher, haute mer. LSFO = HFO faible soufre (<0,5%) depuis MARPOL 2020."},
    {q:"MARPOL Annexe VI concerne quoi pour les moteurs marins ?",opts:["Déchets solides","Limites d'émissions NOx, SOx et PM des moteurs marins","Eaux de ballast","Normes de bruit"],correct:1,expl:"MARPOL VI : émissions atmosphériques. Limite NOx (Tier I/II/III), SOx (0,5% mondiale, 0,1% ECA), PM. Moteurs Tier III : systèmes SCR ou EGR pour -80% NOx."},
    {q:"Qu'est-ce qu'un blackout à bord ?",opts:["Panne éclairage uniquement","Panne totale d'électricité affectant propulsion et systèmes vitaux","Panne moteur principal uniquement","Défaillance navigation"],correct:1,expl:"Blackout = perte totale alimentation électrique. Perte propulsion, navigation, communication, pompes. Groupe secours doit démarrer en <30 secondes (SOLAS)."},
    {q:"Quelle est la séquence correcte de démarrage du moteur principal ?",opts:["Démarrage direct pleine puissance","Vérification → préchauffage → démarrage air → carburant → montée progressive","Démarrage carburant → vérification après","Démarrage électrique direct"],correct:1,expl:"1) Vérifier huile/eau/fuel. 2) Préchauffer. 3) Démarrage air comprimé (25-30 bars). 4) MDO puis HFO. 5) Montée progressive. Pleine puissance directe = avarie garantie."},
    {q:"Pourquoi le HFO doit-il être chauffé avant injection ?",opts:["Pour économiser l'électricité","Le HFO est très visqueux à température ambiante → chauffé à 120-150°C pour être injectable","Pour réduire les émissions","Pour améliorer la combustion à froid"],correct:1,expl:"HFO à température ambiante = goudron. Chauffage à 120-150°C obligatoire pour passage aux injecteurs. Panne de chauffe → impossibilité d'alimenter le moteur."},
  ],
  en:[
    {q:"What is the fundamental difference between diesel and gasoline engines?",opts:["Diesel uses electricity for ignition","Diesel ignites fuel by compression heat (no spark plug)","Diesel has no pistons","Diesel engines are smaller"],correct:1,expl:"Diesel = compression ignition. Air is compressed to 500-700°C, then fuel is injected and ignites spontaneously. No spark plugs. Compression ratio 14:1 to 25:1."},
    {q:"What speed do marine 2-stroke engines (MAN B&W, Wärtsilä) run at?",opts:["500-3000 RPM like cars","200-400 RPM","80-130 RPM — very slow to directly drive the propeller","20-50 RPM"],correct:2,expl:"Slow speed 2-stroke: 80-130 RPM. Very low speed allows direct propeller drive without gearbox. Medium speed 4-stroke: 400-1200 RPM requires gearbox."},
    {q:"What is HFO (Heavy Fuel Oil)?",opts:["Ordinary diesel","Heavy residual fuel oil, cheaper but polluting (MARPOL Annex VI)","Liquefied natural gas","Aviation fuel"],correct:1,expl:"HFO = heavy residual fuel. High viscosity → must be heated to 120-150°C before injection. High sulfur content. ECA zones: MDO/MGO mandatory. HFO ~60% cheaper than MDO."},
    {q:"What is an emergency shutdown of the main engine?",opts:["Voluntary speed reduction","Automatic stop when a critical parameter exceeds limits","Scheduled maintenance stop","Sound alarm only"],correct:1,expl:"Emergency shutdown = automatic stop: low oil pressure, high water temperature, overspeed. Irreversible without manual intervention. Vessel loses propulsion."},
    {q:"Why does sea water not circulate directly through the engine?",opts:["Too cold","Too corrosive and calcified — damages internal passages","Too salty for pumps","Contains dangerous plankton"],correct:1,expl:"Sea water is corrosive and calcified. It cools fresh water via a heat exchanger. Closed fresh water circuit inside engine. Open sea water circuit outside."},
    {q:"What is slow steaming practiced since 2008?",opts:["Sailing in bad weather","Voluntary speed reduction to save fuel and reduce emissions","Ice navigation","Slow berthing manœuvre"],correct:1,expl:"Slow steaming = reducing speed to 12-15 kn instead of 18-25 kn. Fuel savings: 50%. Started in 2008 with oil price rise. Power ∝ speed³."},
    {q:"What is scavenging in a 2-stroke marine engine?",opts:["Purifying cooling water","Expelling burnt gases and filling cylinder with fresh air","Filtering HFO fuel","Lubricating pistons"],correct:1,expl:"Compressed air (from turbocharger) expels exhaust gases and fills cylinder with fresh air. If faulty: air starvation → black smoke → reduced power."},
    {q:"How often should engine oil be analysed?",opts:["Daily","Weekly","Every ~500 operating hours","Only at annual overhauls"],correct:2,expl:"Oil analysis every ~500h. Reveals: metal wear, contamination, viscosity. Detects damage before catastrophic failure."},
    {q:"What does SAE 30 mean for engine oil?",opts:["Oil color","Density","Viscosity classification by temperature","Sulfur content"],correct:2,expl:"SAE = viscosity classification. SAE 30 = less viscous. SAE 40 = more viscous. Marine: SAE 30 or 40 for main engines."},
    {q:"What is a heat exchanger in the cooling system?",opts:["A radiator like in cars","Device that transfers heat between fresh and sea water without mixing them","Device that heats sea water","A sea water filter"],correct:1,expl:"Heat exchanger = thermal transfer without direct contact. Hot fresh water (80°C) transfers heat to cold sea water (~28°C in Gulf of Guinea)."},
    {q:"What is the difference between MDO and HFO?",opts:["Same fuel, different names","MDO = distillate (clean, expensive) · HFO = residual (cheaper, polluting)","MDO = auxiliaries only","HFO = 4-stroke only"],correct:1,expl:"MDO = distillate, clean, less viscous, ECA zones. HFO = residual, very viscous, cheaper, open sea. LSFO = low sulfur HFO (<0.5%) since MARPOL 2020."},
    {q:"What does MARPOL Annex VI cover for marine engines?",opts:["Solid waste","NOx, SOx and PM emission limits for marine engines","Ballast water","Noise standards"],correct:1,expl:"MARPOL VI: atmospheric emissions. Limits NOx (Tier I/II/III), SOx (0.5% global, 0.1% ECA), PM. Tier III engines: SCR or EGR systems for -80% NOx."},
    {q:"What is a blackout on board?",opts:["Lighting failure only","Total power failure affecting propulsion and all vital systems","Main engine failure only","Navigation system failure"],correct:1,expl:"Blackout = total electrical power loss. Loss of propulsion, navigation, communication, pumps. Emergency generator must start in <30 seconds (SOLAS)."},
    {q:"What is the correct main engine starting sequence?",opts:["Direct start at full power","Check parameters → preheat → air start → fuel → gradual power increase","Fuel start → check after","Direct electric start"],correct:1,expl:"1) Check oil/water/fuel. 2) Preheat. 3) Air start (25-30 bar). 4) MDO then HFO. 5) Gradual power increase. Direct full power = guaranteed damage."},
    {q:"Why must HFO be heated before injection?",opts:["To save electricity","HFO is very viscous at ambient temperature → heated to 120-150°C to be injectable","To reduce emissions","To improve cold combustion"],correct:1,expl:"HFO at ambient temperature is like tar. Heating to 120-150°C mandatory for injectors. Heating failure → unable to fuel the engine."},
  ],
  es:[
    {q:"¿Cuál es la diferencia fundamental entre un motor diesel y uno de gasolina?",opts:["El diesel usa electricidad para el encendido","El diesel enciende el combustible por el calor de compresión (sin bujía)","El diesel no tiene pistones","El diesel es más pequeño"],correct:1,expl:"Diesel = encendido por compresión. El aire se comprime hasta 500-700°C, luego el combustible se inyecta y se inflama solo. Sin bujías. Relación de compresión 14:1 a 25:1."},
    {q:"¿A qué velocidad giran los motores marinos de 2 tiempos (MAN B&W, Wärtsilä)?",opts:["500-3000 RPM como los coches","200-400 RPM","80-130 RPM — muy lento para accionar directamente la hélice","20-50 RPM"],correct:2,expl:"Motores de 2 tiempos slow speed: 80-130 RPM. Velocidad muy baja permite accionar directamente la hélice sin reductor. Motores de 4 tiempos medium speed: 400-1200 RPM con reductor."},
    {q:"¿Qué es el HFO (Heavy Fuel Oil)?",opts:["Diesel ordinario","Fuelóleo pesado residual muy viscoso, más barato pero contaminante (MARPOL VI)","Gas natural licuado","Combustible de aviación"],correct:1,expl:"HFO = fuelóleo pesado residual. Alta viscosidad → calentado a 120-150°C antes de la inyección. Rico en azufre. Zonas ECA: obligatorio MDO/MGO."},
    {q:"¿Qué es una parada de emergencia del motor principal?",opts:["Reducción voluntaria de velocidad","Parada automática cuando un parámetro crítico supera los límites","Parada programada para mantenimiento","Solo señal de alarma sonora"],correct:1,expl:"Parada de emergencia = parada automática: baja presión aceite, alta temperatura agua, sobrevelocidad. Irreversible sin intervención manual. El buque pierde la propulsión."},
    {q:"¿Por qué el agua de mar no circula directamente por el motor?",opts:["Demasiado fría","Demasiado corrosiva y calcificada — daña los conductos internos","Demasiado salada para las bombas","Contiene plancton peligroso"],correct:1,expl:"El agua de mar es corrosiva y calcificada. Enfría el agua dulce a través de un intercambiador. Circuito cerrado de agua dulce en el motor. Circuito abierto de agua de mar al exterior."},
    {q:"¿Qué es el slow steaming practicado desde 2008?",opts:["Navegación con mal tiempo","Reducción voluntaria de velocidad para ahorrar combustible","Navegación en hielos","Maniobra de atraque lento"],correct:1,expl:"Slow steaming = reducción a 12-15 nudos en lugar de 18-25. Ahorro: 50% combustible. Iniciado en 2008 con la subida del petróleo."},
    {q:"¿Cuál es el papel del scavenging (barrido) en un motor de 2 tiempos?",opts:["Purificar el agua de refrigeración","Expulsar gases quemados y llenar el cilindro con aire fresco","Filtrar el combustible HFO","Lubricar los pistones"],correct:1,expl:"El aire a presión (turbocompresor) expulsa los gases de escape y llena el cilindro de aire fresco. Si falla: falta de aire → humo negro → potencia reducida."},
    {q:"¿Con qué frecuencia analizar el aceite del motor?",opts:["Cada día","Cada semana","Cada ~500 horas de uso","Solo en revisiones anuales"],correct:2,expl:"Análisis cada ~500h. Revela: desgaste de metales, contaminación, viscosidad. Permite detectar una avería antes de que sea catastrófica."},
    {q:"¿Qué significa SAE 30 para un aceite de motor?",opts:["El color del aceite","La densidad","La clasificación de viscosidad según la temperatura","El contenido de azufre"],correct:2,expl:"SAE = clasificación de viscosidad. SAE 30 = menos viscoso. SAE 40 = más viscoso. Marine: SAE 30 o 40 para motores principales."},
    {q:"¿Qué es un intercambiador de calor en el sistema de refrigeración?",opts:["Un radiador como en los coches","Aparato que transfiere calor entre agua dulce y agua de mar sin mezclarlas","Aparato que calienta el agua de mar","Un filtro de agua de mar"],correct:1,expl:"Intercambiador = transferencia térmica sin contacto directo. Agua dulce caliente (80°C) cede calor al agua de mar fría (~28°C Golfo de Guinea)."},
    {q:"¿Cuál es la diferencia entre MDO y HFO?",opts:["El mismo combustible con nombres distintos","MDO = destilado (limpio, caro) · HFO = residual (barato, contaminante)","MDO = solo para auxiliares","HFO = solo para motores de 4 tiempos"],correct:1,expl:"MDO = destilado, limpio, menos viscoso, zonas ECA. HFO = residual, muy viscoso, más barato, alta mar. LSFO = HFO bajo azufre (<0,5%) desde MARPOL 2020."},
    {q:"¿Qué cubre MARPOL Anexo VI para motores marinos?",opts:["Residuos sólidos","Límites de emisiones NOx, SOx y PM de los motores marinos","Aguas de lastre","Normas de ruido"],correct:1,expl:"MARPOL VI: emisiones atmosféricas. Limita NOx (Tier I/II/III), SOx (0,5% mundial, 0,1% ECA), PM. Motores Tier III: sistemas SCR o EGR para -80% NOx."},
    {q:"¿Qué es un blackout a bordo?",opts:["Solo fallo del alumbrado","Fallo total de electricidad que afecta propulsión y sistemas vitales","Solo fallo del motor principal","Fallo del sistema de navegación"],correct:1,expl:"Blackout = pérdida total de alimentación eléctrica. Pérdida propulsión, navegación, comunicación, bombas. Grupo de emergencia debe arrancar en <30 segundos (SOLAS)."},
    {q:"¿Cuál es la secuencia correcta de arranque del motor principal?",opts:["Arranque directo a plena potencia","Verificación → precalentamiento → arranque aire → combustible → aumento progresivo","Arranque combustible → verificación después","Arranque eléctrico directo"],correct:1,expl:"1) Verificar aceite/agua/combustible. 2) Precalentar. 3) Arranque aire comprimido (25-30 bar). 4) MDO luego HFO. 5) Aumento progresivo. Plena potencia directa = avería garantizada."},
    {q:"¿Por qué el HFO debe calentarse antes de la inyección?",opts:["Para ahorrar electricidad","El HFO es muy viscoso a temperatura ambiente → calentado a 120-150°C para ser inyectable","Para reducir emisiones","Para mejorar la combustión en frío"],correct:1,expl:"HFO a temperatura ambiente = alquitrán. Calentamiento a 120-150°C obligatorio para los inyectores. Fallo de calentamiento → imposibilidad de alimentar el motor."},
  ],
  pt:[
    {q:"Qual é a diferença fundamental entre um motor diesel e um motor a gasolina?",opts:["O diesel usa eletricidade para a ignição","O diesel inflama o combustível pelo calor de compressão (sem vela de ignição)","O diesel não tem pistões","O diesel é mais pequeno"],correct:1,expl:"Diesel = ignição por compressão. O ar é comprimido até 500-700°C, depois o combustível é injetado e inflama sozinho. Sem velas. Relação de compressão 14:1 a 25:1."},
    {q:"A que velocidade giram os motores marítimos de 2 tempos (MAN B&W, Wärtsilä)?",opts:["500-3000 RPM como os carros","200-400 RPM","80-130 RPM — muito lento para acionar diretamente a hélice","20-50 RPM"],correct:2,expl:"Motores de 2 tempos slow speed: 80-130 RPM. Velocidade muito baixa permite acionar diretamente a hélice sem redutor. Motores de 4 tempos medium speed: 400-1200 RPM com redutor."},
    {q:"O que é o HFO (Heavy Fuel Oil)?",opts:["Diesel comum","Fuelóleo pesado residual muito viscoso, mais barato mas poluente (MARPOL VI)","Gás natural liquefeito","Combustível de aviação"],correct:1,expl:"HFO = fuelóleo pesado residual. Alta viscosidade → aquecido a 120-150°C antes da injeção. Rico em enxofre. Zonas ECA: obrigatório MDO/MGO."},
    {q:"O que é uma paragem de emergência do motor principal?",opts:["Redução voluntária de velocidade","Paragem automática quando um parâmetro crítico ultrapassa os limites","Paragem programada para manutenção","Apenas sinal sonoro de alarme"],correct:1,expl:"Paragem de emergência = paragem automática: baixa pressão óleo, alta temperatura água, sobrevelocidade. Irreversível sem intervenção manual. O navio perde a propulsão."},
    {q:"Por que a água do mar não circula diretamente pelo motor?",opts:["Demasiado fria","Demasiado corrosiva e calcificada — danifica os conductos internos","Demasiado salgada para as bombas","Contém plâncton perigoso"],correct:1,expl:"A água do mar é corrosiva e calcificada. Arrefece a água doce através de um permutador. Circuito fechado de água doce no motor. Circuito aberto de água do mar no exterior."},
    {q:"O que é o slow steaming praticado desde 2008?",opts:["Navegação com mau tempo","Redução voluntária de velocidade para poupar combustível","Navegação no gelo","Manobra de atracagem lenta"],correct:1,expl:"Slow steaming = redução para 12-15 nós em vez de 18-25. Poupança: 50% combustível. Iniciado em 2008 com a subida do petróleo. Potência ∝ velocidade³."},
    {q:"Qual é o papel do scavenging (varrimento) num motor de 2 tempos?",opts:["Purificar a água de arrefecimento","Expulsar gases queimados e encher o cilindro com ar fresco","Filtrar o combustível HFO","Lubrificar os pistões"],correct:1,expl:"O ar sob pressão (turbocompressor) expulsa os gases de escape e enche o cilindro de ar fresco. Se falhar: falta de ar → fumo negro → potência reduzida."},
    {q:"Com que frequência analisar o óleo do motor?",opts:["Todos os dias","Todas as semanas","A cada ~500 horas de uso","Apenas nas revisões anuais"],correct:2,expl:"Análise a cada ~500h. Revela: desgaste de metais, contaminação, viscosidade. Deteta avaria antes de ser catastrófica."},
    {q:"O que significa SAE 30 para um óleo de motor?",opts:["A cor do óleo","A densidade","A classificação de viscosidade segundo a temperatura","O teor de enxofre"],correct:2,expl:"SAE = classificação de viscosidade. SAE 30 = menos viscoso. SAE 40 = mais viscoso. Marítimo: SAE 30 ou 40 para motores principais."},
    {q:"O que é um permutador de calor no sistema de arrefecimento?",opts:["Um radiador como nos carros","Aparelho que transfere calor entre água doce e água do mar sem as misturar","Aparelho que aquece a água do mar","Um filtro de água do mar"],correct:1,expl:"Permutador = transferência térmica sem contacto direto. Água doce quente (80°C) cede calor à água do mar fria (~28°C Golfo da Guiné)."},
    {q:"Qual é a diferença entre MDO e HFO?",opts:["O mesmo combustível com nomes diferentes","MDO = destilado (limpo, caro) · HFO = residual (barato, poluente)","MDO = apenas para auxiliares","HFO = apenas para motores de 4 tempos"],correct:1,expl:"MDO = destilado, limpo, menos viscoso, zonas ECA. HFO = residual, muito viscoso, mais barato, alto mar. LSFO = HFO baixo enxofre (<0,5%) desde MARPOL 2020."},
    {q:"O que cobre o MARPOL Anexo VI para motores marítimos?",opts:["Resíduos sólidos","Limites de emissões NOx, SOx e PM dos motores marítimos","Águas de lastro","Normas de ruído"],correct:1,expl:"MARPOL VI: emissões atmosféricas. Limita NOx (Tier I/II/III), SOx (0,5% mundial, 0,1% ECA), PM. Motores Tier III: sistemas SCR ou EGR para -80% NOx."},
    {q:"O que é um blackout a bordo?",opts:["Apenas falha de iluminação","Falha total de eletricidade afetando propulsão e todos os sistemas vitais","Apenas falha do motor principal","Falha do sistema de navegação"],correct:1,expl:"Blackout = perda total de alimentação elétrica. Perda propulsão, navegação, comunicação, bombas. Grupo de emergência deve arrancar em <30 segundos (SOLAS)."},
    {q:"Qual é a sequência correta de arranque do motor principal?",opts:["Arranque direto a plena potência","Verificação → pré-aquecimento → arranque ar → combustível → aumento progressivo","Arranque combustível → verificação depois","Arranque elétrico direto"],correct:1,expl:"1) Verificar óleo/água/combustível. 2) Pré-aquecer. 3) Arranque ar comprimido (25-30 bar). 4) MDO depois HFO. 5) Aumento progressivo. Plena potência direta = avaria garantida."},
    {q:"Por que o HFO deve ser aquecido antes da injeção?",opts:["Para poupar eletricidade","O HFO é muito viscoso à temperatura ambiente → aquecido a 120-150°C para ser injetável","Para reduzir emissões","Para melhorar a combustão a frio"],correct:1,expl:"HFO à temperatura ambiente = alcatrão. Aquecimento a 120-150°C obrigatório para os injetores. Falha de aquecimento → impossibilidade de alimentar o motor."},
  ],
};

// ══════════════════════════════════════
// BANK COMPONENT
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions = BANK[lang]||BANK.fr;
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done) return <div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48,marginBottom:8}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.rust},${C.orange})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.rust},${C.orange})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
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
        {lang==="fr"?"✅ Q1: 3 (combustion = seul temps producteur)\n✅ Q2: 70°C (normal : 70-85°C · alarme >90°C)\n✅ Q3: OUI — 2 bars < 2,5 bars → arrêt immédiat obligatoire":
         lang==="en"?"✅ Q1: 3 (combustion = only power-producing stroke)\n✅ Q2: 70°C (normal: 70-85°C · alarm >90°C)\n✅ Q3: YES — 2 bar < 2.5 bar → immediate stop mandatory":
         "✅ Q1: 3 · Q2: 70°C · Q3: SÍ/SIM — parada inmediata/imediata"}
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
            <div style={{fontSize:11,color:C.muted}}>Leçon 1/8</div>
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
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔄 {lang==="fr"?"CYCLE DIESEL — ANIMÉ":lang==="en"?"DIESEL CYCLE — ANIMATED":lang==="es"?"CICLO DIESEL — ANIMADO":"CICLO DIESEL — ANIMADO"}</div><DieselCycleSVG lang={lang}/></Card>

            <SL icon="⚙️" text={lc.p2} color={C.steel}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚙️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.steel,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚙️ {lang==="fr"?"COUPE MOTEUR — INTERACTIF":lang==="en"?"ENGINE CROSS-SECTION — INTERACTIVE":lang==="es"?"SECCIÓN MOTOR — INTERACTIVO":"SECÇÃO MOTOR — INTERATIVO"}</div><EngineCrossSectionSVG lang={lang}/></Card>

            <SL icon="💧" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💧</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`,background:"linear-gradient(135deg,rgba(26,111,212,0.06),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💧 {lang==="fr"?"CIRCUITS DE REFROIDISSEMENT — INTERACTIF":lang==="en"?"COOLING CIRCUITS — INTERACTIVE":lang==="es"?"CIRCUITOS DE REFRIGERACIÓN — INTERACTIVO":"CIRCUITOS DE ARREFECIMENTO — INTERATIVO"}</div>
              <CoolingCircuitSVG lang={lang}/>
            </Card>

            <SL icon="📊" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📊</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📊 {lang==="fr"?"SIMULATEUR PARAMÈTRES MOTEUR":lang==="en"?"ENGINE PARAMETER SIMULATOR":lang==="es"?"SIMULADOR PARÁMETROS MOTOR":"SIMULADOR PARÂMETROS MOTOR"}</div>
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
                {lang==="fr"?"Quiz — Moteur Diesel & Refroidissement":lang==="en"?"Quiz — Diesel Engine & Cooling":lang==="es"?"Quiz — Motor Diesel y Refrigeración":"Quiz — Motor Diesel e Arrefecimento"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 1 Machine":"questions · Engine Lesson 1"}</div>
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
              {lang==="fr"?"LEÇON 2 — AUXILIAIRES & GÉNÉRATEURS →":lang==="en"?"LESSON 2 — AUXILIARIES & GENERATORS →":lang==="es"?"LECCIÓN 2 — AUXILIARES Y GENERADORES →":"LIÇÃO 2 — AUXILIARES E GERADORES →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
