// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", rust:"#8d3b2b", yellow:"#f1c40f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module Machine", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Engine Module", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo Máquinas", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo Máquinas", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — FIRE TRIANGLE
// ══════════════════════════════════════
function FireTriangleSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const [removed, setRemoved] = useState(null);

  const elements = [
    { id:"fuel", label:{fr:"COMBUSTIBLE",en:"FUEL",es:"COMBUSTIBLE",pt:"COMBUSTÍVEL"},
      icon:"🛢️", color:C.orange, x:145, y:155,
      examples:{fr:"HFO · MDO · huile · chiffons gras · bois · peintures",en:"HFO · MDO · oil · oily rags · wood · paints",es:"HFO · MDO · aceite · trapos grasos · madera · pinturas",pt:"HFO · MDO · óleo · trapos gordurosos · madeira · tintas"},
      solution:{fr:"RETIRER le combustible → isolation du feu, fermeture vannes carburant",en:"REMOVE fuel → fire isolation, close fuel valves",es:"RETIRAR el combustible → aislar el fuego, cerrar válvulas de combustible",pt:"REMOVER combustível → isolar o fogo, fechar válvulas de combustível"}},
    { id:"oxygen", label:{fr:"COMBURANT (O₂)",en:"OXYGEN (O₂)",es:"COMBURENTE (O₂)",pt:"COMBURENTE (O₂)"},
      icon:"💨", color:C.blue2, x:55, y:55,
      examples:{fr:"Air ambiant (21% O₂) · insufflation d'air · ouvertures","en":"Ambient air (21% O₂) · air supply · openings",es:"Aire ambiente (21% O₂) · suministro de aire · aperturas",pt:"Ar ambiente (21% O₂) · fornecimento de ar · aberturas"},
      solution:{fr:"ÉTOUFFER → CO2 · mousse · fermeture des ventilations",en:"SMOTHER → CO2 · foam · close ventilation",es:"SOFOCAR → CO2 · espuma · cerrar ventilaciones",pt:"SUFOCAR → CO2 · espuma · fechar ventilações"}},
    { id:"heat", label:{fr:"CHALEUR",en:"HEAT",es:"CALOR",pt:"CALOR"},
      icon:"🔥", color:C.red, x:235, y:55,
      examples:{fr:"Point chaud moteur · étincelles · cigarettes · frottement",en:"Engine hot spots · sparks · cigarettes · friction",es:"Puntos calientes motor · chispas · cigarrillos · fricción",pt:"Pontos quentes motor · faíscas · cigarros · fricção"},
      solution:{fr:"REFROIDIR → eau · poudre · CO2 · extincteurs",en:"COOL → water · powder · CO2 · extinguishers",es:"ENFRIAR → agua · polvo · CO2 · extintores",pt:"ARREFECER → água · pó · CO2 · extintores"}},
  ];

  const sel_ = sel ? elements.find(e=>e.id===sel) : null;
  const fireOut = removed !== null;

  return (
    <div>
      <svg width="290" height="195" viewBox="0 0 290 195">
        <rect width="290" height="195" fill="#061020" rx="8"/>
        {/* Triangle background */}
        <polygon points="145,20 15,175 275,175"
          fill={fireOut?"rgba(30,138,74,0.08)":"rgba(192,57,43,0.08)"}
          stroke={fireOut?C.green:C.red} strokeWidth="2"/>
        {/* Fire in center */}
        {!fireOut && (
          <g>
            <text x="145" y="115" textAnchor="middle" fontSize="32">🔥</text>
            <text x="145" y="140" textAnchor="middle" fontSize="9" fill={C.red} fontWeight="700">
              {lang==="fr"?"FEU":lang==="en"?"FIRE":lang==="es"?"FUEGO":"FOGO"}
            </text>
          </g>
        )}
        {fireOut && (
          <g>
            <text x="145" y="115" textAnchor="middle" fontSize="28">💨</text>
            <text x="145" y="140" textAnchor="middle" fontSize="9" fill={C.green} fontWeight="700">
              {lang==="fr"?"ÉTEINT":lang==="en"?"EXTINGUISHED":lang==="es"?"APAGADO":"APAGADO"}
            </text>
          </g>
        )}
        {/* Elements */}
        {elements.map(e => (
          <g key={e.id} onClick={()=>setSel(sel===e.id?null:e.id)} style={{cursor:"pointer"}}>
            <circle cx={e.x} cy={e.y} r={28}
              fill={removed===e.id?"rgba(30,138,74,0.2)":`${e.color}22`}
              stroke={removed===e.id?C.green:e.color}
              strokeWidth={sel===e.id?2.5:1.5}
              opacity={removed===e.id?0.5:1}/>
            <text x={e.x} y={e.y-6} textAnchor="middle" fontSize="16">{e.icon}</text>
            <text x={e.x} y={e.y+10} textAnchor="middle" fontSize="6.5"
              fill={removed===e.id?C.green:e.color} fontWeight="700">
              {(e.label[lang]||e.label.fr).split(' ')[0]}
            </text>
            {removed===e.id && (
              <text x={e.x} y={e.y+20} textAnchor="middle" fontSize="8" fill={C.green}>✕</text>
            )}
          </g>
        ))}
        {/* Labels on triangle sides */}
        <text x="80" y="130" textAnchor="middle" fontSize="7" fill={C.muted} transform="rotate(-60,80,130)">
          {lang==="fr"?"Étouffer":lang==="en"?"Smother":lang==="es"?"Sofocar":"Sufocar"}
        </text>
        <text x="210" y="130" textAnchor="middle" fontSize="7" fill={C.muted} transform="rotate(60,210,130)">
          {lang==="fr"?"Refroidir":lang==="en"?"Cool":lang==="es"?"Enfriar":"Arrefecer"}
        </text>
        <text x="145" y="190" textAnchor="middle" fontSize="7" fill={C.muted}>
          {lang==="fr"?"Isoler/retirer":lang==="en"?"Remove/isolate":lang==="es"?"Aislar/retirar":"Isolar/retirar"}
        </text>
      </svg>

      {/* Remove element buttons */}
      <div style={{display:"flex",gap:6,marginTop:8}}>
        {elements.map(e=>(
          <button key={e.id} onClick={()=>setRemoved(removed===e.id?null:e.id)} style={{
            flex:1, padding:"7px 4px", borderRadius:10, fontSize:9, cursor:"pointer",
            background:removed===e.id?"rgba(30,138,74,0.2)":`${e.color}15`,
            border:`1.5px solid ${removed===e.id?C.green:e.color}`,
            color:removed===e.id?C.green:e.color, fontWeight:700,
          }}>
            {removed===e.id?"✕ ":""}{e.icon} {lang==="fr"?"Retirer":lang==="en"?"Remove":lang==="es"?"Retirar":"Remover"}
          </button>
        ))}
      </div>
      {fireOut && (
        <div style={{marginTop:6,padding:"8px 12px",borderRadius:10,background:"rgba(30,138,74,0.12)",border:`1px solid ${C.green}44`,fontSize:10,color:C.green,textAlign:"center",fontWeight:700}}>
          ✅ {lang==="fr"?"Feu éteint ! Retirer un côté du triangle suffit.":lang==="en"?"Fire out! Removing one side of the triangle is enough.":lang==="es"?"¡Fuego apagado! Retirar un lado del triángulo es suficiente.":"Fogo apagado! Remover um lado do triângulo é suficiente."}
        </div>
      )}
      {sel_ && (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:12,fontWeight:700,color:sel_.color,marginBottom:4}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
          <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{lang==="fr"?"Exemples:":lang==="en"?"Examples:":lang==="es"?"Ejemplos:":"Exemplos:"} {sel_.examples[lang]||sel_.examples.fr}</div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.5}}>💡 {sel_.solution[lang]||sel_.solution.fr}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — FIRE CLASSES
// ══════════════════════════════════════
function FireClassesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const classes = [
    { id:"A", color:"#e74c3c", icon:"🪵",
      label:{fr:"Classe A",en:"Class A",es:"Clase A",pt:"Classe A"},
      material:{fr:"Solides : bois, papier, tissus, plastiques",en:"Solids: wood, paper, fabric, plastics",es:"Sólidos: madera, papel, telas, plásticos",pt:"Sólidos: madeira, papel, tecidos, plásticos"},
      extinguish:{fr:"Eau ✅ · Poudre ABC ✅ · CO2 ⚠️",en:"Water ✅ · ABC powder ✅ · CO2 ⚠️",es:"Agua ✅ · Polvo ABC ✅ · CO2 ⚠️",pt:"Água ✅ · Pó ABC ✅ · CO2 ⚠️"},
      ship:{fr:"Cabines · entrepôts · mobilier · colis",en:"Cabins · stores · furniture · packages",es:"Camarotes · almacenes · muebles · paquetes",pt:"Camarotes · armazéns · mobiliário · embalagens"}},
    { id:"B", color:"#e67e22", icon:"🛢️",
      label:{fr:"Classe B",en:"Class B",es:"Clase B",pt:"Classe B"},
      material:{fr:"Liquides inflammables : HFO, MDO, huiles, peintures, solvants",en:"Flammable liquids: HFO, MDO, oils, paints, solvents",es:"Líquidos inflamables: HFO, MDO, aceites, pinturas, disolventes",pt:"Líquidos inflamáveis: HFO, MDO, óleos, tintas, solventes"},
      extinguish:{fr:"Mousse ✅ · CO2 ✅ · Poudre ABC ✅ · EAU ❌ JAMAIS",en:"Foam ✅ · CO2 ✅ · ABC powder ✅ · WATER ❌ NEVER",es:"Espuma ✅ · CO2 ✅ · Polvo ABC ✅ · AGUA ❌ NUNCA",pt:"Espuma ✅ · CO2 ✅ · Pó ABC ✅ · ÁGUA ❌ NUNCA"},
      ship:{fr:"⚠️ LE PLUS DANGEREUX à bord — Salle des machines, soutes HFO",en:"⚠️ MOST DANGEROUS on board — Engine room, HFO bunkers",es:"⚠️ EL MÁS PELIGROSO a bordo — Sala de máquinas, pañoles HFO",pt:"⚠️ O MAIS PERIGOSO a bordo — Sala de máquinas, pañóis HFO"}},
    { id:"C", color:"#f1c40f", icon:"⚡",
      label:{fr:"Classe C",en:"Class C",es:"Clase C",pt:"Classe C"},
      material:{fr:"Électrique : tableaux élec., moteurs, câbles sous tension",en:"Electrical: switchboards, motors, live cables",es:"Eléctrico: cuadros eléctricos, motores, cables en tensión",pt:"Elétrico: quadros elétricos, motores, cabos sob tensão"},
      extinguish:{fr:"CO2 ✅ · Poudre ✅ · EAU ❌ · MOUSSE ❌\nCOUPER LE COURANT EN PREMIER !",en:"CO2 ✅ · Powder ✅ · WATER ❌ · FOAM ❌\nCUT POWER FIRST!",es:"CO2 ✅ · Polvo ✅ · AGUA ❌ · ESPUMA ❌\n¡CORTAR LA CORRIENTE PRIMERO!",pt:"CO2 ✅ · Pó ✅ · ÁGUA ❌ · ESPUMA ❌\nCORTAR A CORRENTE PRIMEIRO!"},
      ship:{fr:"MSB · tableaux électriques · salle des machines · passerelle",en:"MSB · electrical panels · engine room · bridge",es:"MSB · cuadros eléctricos · sala de máquinas · puente",pt:"MSB · quadros elétricos · sala de máquinas · ponte"}},
    { id:"D", color:"#9b59b6", icon:"⚙️",
      label:{fr:"Classe D",en:"Class D",es:"Clase D",pt:"Classe D"},
      material:{fr:"Métaux : magnésium, titane, aluminium en poudre",en:"Metals: magnesium, titanium, aluminium powder",es:"Metales: magnesio, titanio, polvo de aluminio",pt:"Metais: magnésio, titânio, alumínio em pó"},
      extinguish:{fr:"Poudre spéciale D ✅ · EAU ❌ DANGEREUX · CO2 ❌",en:"Special D powder ✅ · WATER ❌ DANGEROUS · CO2 ❌",es:"Polvo especial D ✅ · AGUA ❌ PELIGROSO · CO2 ❌",pt:"Pó especial D ✅ · ÁGUA ❌ PERIGOSO · CO2 ❌"},
      ship:{fr:"Rare à bord — ateliers spécialisés uniquement",en:"Rare on board — specialized workshops only",es:"Raro a bordo — solo talleres especializados",pt:"Raro a bordo — apenas oficinas especializadas"}},
    { id:"F", color:"#1abc9c", icon:"🍳",
      label:{fr:"Classe F",en:"Class F",es:"Clase F",pt:"Classe F"},
      material:{fr:"Huiles et graisses alimentaires en cuisson",en:"Cooking oils and fats",es:"Aceites y grasas de cocina en combustión",pt:"Óleos e gorduras de cozinha em combustão"},
      extinguish:{fr:"Extinction spéciale F ✅ · Couverture anti-feu ✅\nEAU ❌ EXPLOSION de vapeur !",en:"Special F extinguisher ✅ · Fire blanket ✅\nWATER ❌ STEAM EXPLOSION!",es:"Extintor especial F ✅ · Manta ignífuga ✅\nAGUA ❌ ¡EXPLOSIÓN DE VAPOR!",pt:"Extintor especial F ✅ · Cobertura anti-fogo ✅\nÁGUA ❌ EXPLOSÃO DE VAPOR!"},
      ship:{fr:"Cuisine · cambuse · office",en:"Galley · pantry · mess room",es:"Cocina · pañol · comedor",pt:"Cozinha · despensa · refeitório"}},
  ];

  const sel_ = sel ? classes.find(c=>c.id===sel) : null;

  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {classes.map(c=>(
          <button key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)} style={{
            flex:1, padding:"10px 4px", borderRadius:12, cursor:"pointer",
            background:sel===c.id?`${c.color}25`:"rgba(255,255,255,0.04)",
            border:`2px solid ${sel===c.id?c.color:"rgba(255,255,255,0.08)"}`,
            display:"flex", flexDirection:"column", alignItems:"center", gap:4,
          }}>
            <span style={{fontSize:18}}>{c.icon}</span>
            <div style={{fontSize:9,fontWeight:800,color:sel===c.id?c.color:C.muted}}>{c.id}</div>
          </button>
        ))}
      </div>
      {sel_ ? (
        <div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
          <div style={{fontSize:11,color:C.white,marginBottom:6,lineHeight:1.5}}>
            <span style={{color:C.muted}}>{lang==="fr"?"Matériaux:":lang==="en"?"Materials:":lang==="es"?"Materiales:":"Materiais:"} </span>
            {sel_.material[lang]||sel_.material.fr}
          </div>
          <div style={{fontSize:11,color:C.white,marginBottom:6,lineHeight:1.6,whiteSpace:"pre-line"}}>
            <span style={{color:C.muted,fontWeight:700}}>{lang==="fr"?"Extinction:":lang==="en"?"Extinguish:":lang==="es"?"Extinción:":"Extinção:"} </span>
            {sel_.extinguish[lang]||sel_.extinguish.fr}
          </div>
          <div style={{fontSize:10,color:sel_.color,fontStyle:"italic"}}>
            🚢 {sel_.ship[lang]||sel_.ship.fr}
          </div>
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"12px",fontSize:11,color:C.muted}}>
          {lang==="fr"?"Touche une classe pour les détails":lang==="en"?"Tap a class for details":lang==="es"?"Toca una clase para detalles":"Toque uma classe para detalhes"}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — CO2 FIXED SYSTEM SIMULATOR
// ══════════════════════════════════════
function CO2SystemSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [alarm, setAlarm] = useState(false);
  const [co2Released, setCo2Released] = useState(false);

  const steps = [
    { id:"detect", label:{fr:"1. Détection",en:"1. Detection",es:"1. Detección",pt:"1. Deteção"},
      color:C.orange, icon:"🚨",
      desc:{fr:"Détecteur de fumée ou flamme déclenche l'alarme\nSalle des machines évacuée IMMÉDIATEMENT\nVérification : tout le monde dehors ?",en:"Smoke or flame detector triggers alarm\nEngine room evacuated IMMEDIATELY\nCheck: everyone out?",es:"El detector de humo o llama activa la alarma\nSala de máquinas evacuada INMEDIATAMENTE\nVerificación: ¿todo el mundo fuera?",pt:"Detetor de fumo ou chama ativa o alarme\nSala de máquinas evacuada IMEDIATAMENTE\nVerificação: toda a gente fora?"}},
    { id:"evacuate", label:{fr:"2. Évacuation",en:"2. Evacuation",es:"2. Evacuación",pt:"2. Evacuação"},
      color:C.yellow, icon:"🏃",
      desc:{fr:"⚠️ ÉTAPE CRITIQUE\nCOMPTER TOUT LE MONDE avant CO2\nFermer toutes les ouvertures (ventilations, portes)\nCouper le moteur principal\nCouper la ventilation de la salle des machines",en:"⚠️ CRITICAL STEP\nCOUNT EVERYONE before CO2\nClose all openings (ventilation, doors)\nShut down main engine\nShut down engine room ventilation",es:"⚠️ PASO CRÍTICO\nCONTAR A TODOS antes del CO2\nCerrar todas las aperturas\nParar el motor principal\nParar la ventilación de la sala de máquinas",pt:"⚠️ PASSO CRÍTICO\nCONTAR TODOS antes do CO2\nFechar todas as aberturas\nParar o motor principal\nParar a ventilação da sala de máquinas"}},
    { id:"release", label:{fr:"3. Déclenchement",en:"3. Release",es:"3. Disparo",pt:"3. Disparo"},
      color:C.red, icon:"🔴",
      desc:{fr:"Ouvrir l'armoire CO2 (clé spéciale)\nTirer la goupille de sécurité\nActionner la vanne principale\nLE CO2 INONDE LA SALLE DES MACHINES\n⚠️ MORTEL si quelqu'un est à l'intérieur",en:"Open CO2 cabinet (special key)\nPull safety pin\nOperate main valve\nCO2 FLOODS ENGINE ROOM\n⚠️ FATAL if anyone is inside",es:"Abrir el armario CO2 (llave especial)\nRetirar la clavija de seguridad\nAccionar la válvula principal\nEL CO2 INUNDA LA SALA DE MÁQUINAS\n⚠️ MORTAL si alguien está dentro",pt:"Abrir o armário CO2 (chave especial)\nRetirar o pino de segurança\nAccionar a válvula principal\nO CO2 INUNDA A SALA DE MÁQUINAS\n⚠️ FATAL se alguém estiver lá dentro"}},
    { id:"wait", label:{fr:"4. Attendre",en:"4. Wait",es:"4. Esperar",pt:"4. Esperar"},
      color:C.purple, icon:"⏳",
      desc:{fr:"Attendre 20-30 minutes minimum\nLe CO2 étouffe le feu en réduisant O₂ < 15%\nNE PAS OUVRIR la salle des machines\nSurveiller depuis l'extérieur\nPrévenir les autorités portuaires",en:"Wait 20-30 minutes minimum\nCO2 smothers fire by reducing O₂ < 15%\nDO NOT OPEN engine room\nMonitor from outside\nNotify port authorities",es:"Esperar 20-30 minutos mínimo\nEl CO2 apaga el fuego reduciendo O₂ < 15%\nNO ABRIR la sala de máquinas\nVigilar desde el exterior\nNotificar a las autoridades portuarias",pt:"Aguardar 20-30 minutos mínimo\nO CO2 apaga o fogo reduzindo O₂ < 15%\nNÃO ABRIR a sala de máquinas\nMonitorizar do exterior\nNotificar as autoridades portuárias"}},
    { id:"reentry", label:{fr:"5. Réentrée",en:"5. Re-entry",es:"5. Reentrada",pt:"5. Reentrada"},
      color:C.green, icon:"✅",
      desc:{fr:"ARA (Appareil Respiratoire Autonome) OBLIGATOIRE\nTester l'atmosphère avant d'entrer\nVentiler abondamment\nEquipe de 2 minimum\nGarde à l'extérieur obligatoire\nRechercher les personnes éventuellement piégées",en:"SCBA (Self-Contained Breathing Apparatus) MANDATORY\nTest atmosphere before entry\nVentilate thoroughly\nMinimum 2-person team\nOutside guard mandatory\nSearch for any trapped persons",es:"ERA (Equipo Respiratorio Autónomo) OBLIGATORIO\nProbar la atmósfera antes de entrar\nVentilar abundantemente\nEquipo mínimo de 2 personas\nGuardia exterior obligatoria",pt:"ARA (Aparelho Respiratório Autónomo) OBRIGATÓRIO\nTestar a atmosfera antes de entrar\nVentilar abundantemente\nEquipa mínima de 2 pessoas\nVigilante exterior obrigatório"}},
  ];

  const s = steps[step];

  return (
    <div>
      {/* Progress steps */}
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {steps.map((st,i)=>(
          <button key={i} onClick={()=>setStep(i)} style={{
            flex:1, padding:"6px 2px", borderRadius:8, cursor:"pointer",
            background:step===i?`${st.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${step===i?st.color:i<step?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.06)"}`,
            display:"flex",flexDirection:"column",alignItems:"center",gap:2,
          }}>
            <span style={{fontSize:14}}>{st.icon}</span>
            <div style={{fontSize:6.5,color:step===i?st.color:C.muted,fontWeight:step===i?700:400,textAlign:"center",lineHeight:1.2}}>
              {(st.label[lang]||st.label.fr).replace(/^\d+\. /,"")}
            </div>
          </button>
        ))}
      </div>

      {/* CO2 visualization */}
      <svg width="290" height="145" viewBox="0 0 290 145">
        <rect width="290" height="145" fill="#061020" rx="8"/>
        {/* Engine room */}
        <rect x="40" y="20" width="160" height="100" rx="6"
          fill={step>=2?"rgba(200,220,255,0.12)":"rgba(13,31,60,0.6)"}
          stroke={step>=2?C.blue2:C.steel} strokeWidth={step>=2?2:1}/>
        <text x="120" y="45" textAnchor="middle" fontSize="8" fill={C.steel} fontWeight="700">
          {lang==="fr"?"SALLE DES MACHINES":lang==="en"?"ENGINE ROOM":lang==="es"?"SALA DE MÁQUINAS":"SALA DE MÁQUINAS"}
        </text>
        {/* Engine silhouette */}
        <rect x="70" y="55" width="40" height="30" rx="4" fill="rgba(26,60,120,0.5)" stroke={C.steel} strokeWidth="1"/>
        <rect x="125" y="60" width="30" height="25" rx="3" fill="rgba(26,60,120,0.4)" stroke={C.steel} strokeWidth="0.8"/>
        {/* CO2 gas */}
        {step >= 2 && (
          <g opacity="0.7">
            {[50,80,110,140,160].map((x,i)=>(
              <ellipse key={i} cx={x+Math.sin(i)*10} cy={80+Math.cos(i)*15} rx={18+i*3} ry={12}
                fill="rgba(150,200,255,0.15)" stroke="rgba(150,200,255,0.3)" strokeWidth="0.5">
                <animate attributeName="cx" values={`${x};${x+5};${x}`} dur={`${2+i*0.3}s`} repeatCount="indefinite"/>
              </ellipse>
            ))}
            <text x="120" y="95" textAnchor="middle" fontSize="10" fill="rgba(150,200,255,0.8)" fontWeight="700">CO₂</text>
          </g>
        )}
        {/* Person inside (warning) */}
        {step < 1 && (
          <text x="155" y="85" fontSize="16">🧑</text>
        )}
        {step === 1 && (
          <text x="155" y="85" fontSize="16" opacity="0.3">🧑</text>
        )}
        {/* Fire */}
        {step === 0 && <text x="90" y="85" fontSize="16">🔥</text>}
        {step === 1 && <text x="90" y="85" fontSize="14">🔥</text>}
        {step >= 3 && step < 4 && <text x="90" y="85" fontSize="10" opacity="0.3">🔥</text>}
        {/* Alarm */}
        {(step === 0 || step === 1) && (
          <g>
            <circle cx="185" cy="30" r="10" fill={C.red} opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="0.5s" repeatCount="indefinite"/>
            </circle>
            <text x="185" y="34" textAnchor="middle" fontSize="8">🚨</text>
          </g>
        )}
        {/* CO2 cabinet */}
        <rect x="215" y="40" width="50" height="65" rx="6"
          fill={step>=2?"rgba(192,57,43,0.2)":"rgba(192,57,43,0.08)"}
          stroke={step>=2?C.red:C.muted} strokeWidth={step>=2?2:1}/>
        <text x="240" y="65" textAnchor="middle" fontSize="7" fill={C.red} fontWeight="700">CO₂</text>
        <text x="240" y="78" textAnchor="middle" fontSize="6" fill={C.muted}>
          {lang==="fr"?"FIXE":lang==="en"?"FIXED":lang==="es"?"FIJO":"FIXO"}
        </text>
        {step >= 2 && (
          <line x1="215" y1="72" x2="200" y2="72" stroke={C.red} strokeWidth="2.5">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="0.5s" repeatCount="indefinite"/>
          </line>
        )}
        {/* ARA requirement */}
        {step === 4 && (
          <g>
            <text x="120" y="75" textAnchor="middle" fontSize="18">🫁</text>
            <text x="120" y="92" textAnchor="middle" fontSize="7" fill={C.green} fontWeight="700">ARA/SCBA</text>
          </g>
        )}
      </svg>

      {/* Step description */}
      <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
        background:`${s.color}12`,border:`1.5px solid ${s.color}44`,
        fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:s.color,marginBottom:4}}>
          {s.icon} {s.label[lang]||s.label.fr}
        </div>
        {s.desc[lang]||s.desc.fr}
      </div>

      {/* Navigation */}
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          style={{flex:1,padding:"8px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":"Previous"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(4,s+1))} disabled={step===4}
          style={{flex:1,padding:"8px",borderRadius:10,background:step===4?"rgba(255,255,255,0.06)":`${steps[Math.min(4,step+1)].color}22`,border:`1px solid ${step===4?"rgba(255,255,255,0.1)":steps[Math.min(4,step+1)].color}`,color:C.white,cursor:step===4?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":"Next"} ▶
        </button>
      </div>

      {/* Critical warning */}
      <div style={{marginTop:8,padding:"8px 12px",borderRadius:10,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}33`,fontSize:10,color:C.red,fontWeight:700,textAlign:"center"}}>
        ⚠️ {lang==="fr"?"CO2 = MORTEL — Ne jamais déclencher sans s'assurer que tout le monde est évacué":lang==="en"?"CO2 = LETHAL — Never activate without ensuring everyone is evacuated":lang==="es"?"CO2 = MORTAL — Nunca activar sin asegurarse de que todos han sido evacuados":"CO2 = MORTAL — Nunca ativar sem garantir que todos foram evacuados"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — EXTINGUISHERS
// ══════════════════════════════════════
function ExtinguisherSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const types = [
    { id:"water", icon:"💧", color:"#3498db",
      label:{fr:"Eau",en:"Water",es:"Agua",pt:"Água"},
      desc:{fr:"Classe A uniquement\nDangeureux sur B (propagation) et C (électrocution)\nGrande capacité de refroidissement\nJet ou brouillard",en:"Class A only\nDangerous on B (spread) and C (electrocution)\nGreat cooling capacity\nJet or mist",es:"Solo clase A\nPeligroso en B (propagación) y C (electrocución)\nGran capacidad de enfriamiento",pt:"Apenas classe A\nPerigoso em B (propagação) e C (electrocução)\nGrande capacidade de arrefecimento"},
      ok:["A"], no:["B","C","F"]},
    { id:"foam", icon:"🫧", color:C.orange,
      label:{fr:"Mousse (AFFF)",en:"Foam (AFFF)",es:"Espuma (AFFF)",pt:"Espuma (AFFF)"},
      desc:{fr:"Classes A et B\nAFFF = Aqueous Film Forming Foam\nIdéal feux d'hydrocarbures (HFO, MDO)\nÉtouffe + refroidit + crée un film protecteur",en:"Classes A and B\nAFFF = Aqueous Film Forming Foam\nIdeal for hydrocarbon fires (HFO, MDO)\nSmothers + cools + creates protective film",es:"Clases A y B\nAFFF = Espuma formadora de película acuosa\nIdeal para fuegos de hidrocarburos (HFO, MDO)",pt:"Classes A e B\nAFFF = Espuma formadora de película aquosa\nIdeal para fogos de hidrocarbonetos"},
      ok:["A","B"], no:["C","D","F"]},
    { id:"co2", icon:"💨", color:C.blue2,
      label:{fr:"CO₂",en:"CO₂",es:"CO₂",pt:"CO₂"},
      desc:{fr:"Classes B et C\nNe laisse pas de résidu\nIdéal équipements électriques\nRisque d'asphyxie en espace confiné\n⚠️ Faible efficacité en extérieur (vent)",en:"Classes B and C\nLeaves no residue\nIdeal for electrical equipment\nAsphyxiation risk in confined space\n⚠️ Low effectiveness outdoors (wind)",es:"Clases B y C\nNo deja residuo\nIdeal para equipos eléctricos\nRiesgo de asfixia en espacio confinado",pt:"Classes B e C\nNão deixa resíduo\nIdeal para equipamentos elétricos\nRisco de asfixia em espaço confinado"},
      ok:["B","C"], no:["A","D","F"]},
    { id:"powder", icon:"🌫️", color:C.gold2,
      label:{fr:"Poudre ABC",en:"ABC Powder",es:"Polvo ABC",pt:"Pó ABC"},
      desc:{fr:"Classes A, B et C\nExtincteur universel le plus courant\nLaisse des résidus (dommages équipements)\n⚠️ Pas classe D (métaux) ni F (cuisine)",en:"Classes A, B and C\nMost common universal extinguisher\nLeaves residue (equipment damage)\n⚠️ Not class D (metals) or F (cooking)",es:"Clases A, B y C\nExtintor universal más común\nDeja residuos (daños en equipos)\n⚠️ No clase D (metales) ni F (cocina)",pt:"Classes A, B e C\nExtintor universal mais comum\nDeixa resíduos (danos em equipamentos)"},
      ok:["A","B","C"], no:["D","F"]},
    { id:"classF", icon:"🍳", color:C.teal,
      label:{fr:"Classe F",en:"Class F",es:"Clase F",pt:"Classe F"},
      desc:{fr:"Feux de cuisine uniquement\nHuiles et graisses alimentaires\nAgent saponifiant spécial\nCouverture anti-feu aussi efficace\n⚠️ NE PAS utiliser eau : explosion vapeur !",en:"Cooking fires only\nCooking oils and fats\nSpecial saponifying agent\nFire blanket also effective\n⚠️ DO NOT use water: steam explosion!",es:"Solo fuegos de cocina\nAceites y grasas culinarias\nAgente saponificante especial\n⚠️ NO usar agua: ¡explosión de vapor!",pt:"Apenas fogos de cozinha\nÓleos e gorduras culinárias\nAgente saponificante especial\n⚠️ NÃO usar água: explosão de vapor!"},
      ok:["F"], no:["A","B","C","D"]},
  ];

  const sel_ = sel ? types.find(t=>t.id===sel) : null;

  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {types.map(tp=>(
          <button key={tp.id} onClick={()=>setSel(sel===tp.id?null:tp.id)} style={{
            flex:1, padding:"10px 4px", borderRadius:12, cursor:"pointer",
            background:sel===tp.id?`${tp.color}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${sel===tp.id?tp.color:"rgba(255,255,255,0.08)"}`,
            display:"flex",flexDirection:"column",alignItems:"center",gap:4,
          }}>
            <span style={{fontSize:20}}>{tp.icon}</span>
            <div style={{fontSize:8,fontWeight:700,color:sel===tp.id?tp.color:C.muted,textAlign:"center",lineHeight:1.2}}>
              {tp.label[lang]||tp.label.fr}
            </div>
          </button>
        ))}
      </div>
      {sel_ ? (
        <div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
          <div style={{display:"flex",gap:6,marginBottom:8}}>
            <div style={{flex:1}}>
              <div style={{fontSize:9,color:C.green,fontWeight:700,marginBottom:3}}>✅ {lang==="fr"?"Efficace":"Effective"}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                {sel_.ok.map(c=><span key={c} style={{padding:"2px 6px",borderRadius:6,background:`rgba(30,138,74,0.2)`,border:`1px solid ${C.green}44`,fontSize:9,color:C.green,fontWeight:700}}>{c}</span>)}
              </div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:9,color:C.red,fontWeight:700,marginBottom:3}}>❌ {lang==="fr"?"Interdit":"Forbidden"}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                {sel_.no.map(c=><span key={c} style={{padding:"2px 6px",borderRadius:6,background:`rgba(192,57,43,0.15)`,border:`1px solid ${C.red}33`,fontSize:9,color:C.red,fontWeight:700}}>{c}</span>)}
              </div>
            </div>
          </div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"12px",fontSize:11,color:C.muted}}>
          {lang==="fr"?"Touche un extincteur pour les détails":lang==="en"?"Tap an extinguisher for details":lang==="es"?"Toca un extintor para detalles":"Toque um extintor para detalhes"}
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
    fr:{title:"Incendie MV Scandinavian Star — Skagerrak (1990)",teaser:"Ferry · Incendie criminel · 158 morts · Défaillances multiples",what:"Le ferry Scandinavian Star prend feu dans le Skagerrak entre Danemark et Norvège. L'incendie se propage rapidement dans les coursives et les cabines. 158 personnes meurent principalement d'intoxication aux fumées. L'enquête révèle un incendie criminel aggravé par des défaillances systémiques.",cause:"• Incendie criminel allumé dans plusieurs endroits\n• Extincteurs portatifs vides ou manquants\n• Système sprinkler non fonctionnel\n• Portes coupe-feu maintenues ouvertes (propagation rapide)\n• Équipage mal formé aux procédures d'urgence\n• Rôles d'appel inconnus de nombreux membres d'équipage\n• Éclairage de secours défaillant",lessons:"✓ Inspection régulière de TOUS les équipements incendie (extincteurs chargés)\n✓ Portes coupe-feu JAMAIS maintenues ouvertes\n✓ Formation équipage OBLIGATOIRE (exercices mensuels)\n✓ Rôles d'appel connus de tous\n✓ Résultat : SOLAS renforcé · Directive ferry UE\n✓ Sprinklers obligatoires sur tous les ferries passagers",link:"🔗 Lien L4 Incendie : La propagation rapide due aux portes coupe-feu ouvertes et l'équipage non formé = catastrophe. La prévention incendie repose sur la formation, les inspections et la discipline."},
    en:{title:"MV Scandinavian Star Fire — Skagerrak (1990)",teaser:"Ferry · Criminal fire · 158 deaths · Multiple failures",what:"The ferry Scandinavian Star catches fire in the Skagerrak between Denmark and Norway. Fire spreads rapidly through corridors and cabins. 158 people die mainly from smoke inhalation. Investigation reveals arson aggravated by systemic failures.",cause:"• Arson started in multiple locations\n• Portable extinguishers empty or missing\n• Sprinkler system non-functional\n• Fire doors held open (rapid spread)\n• Crew poorly trained on emergency procedures\n• Muster list unknown to many crew members\n• Emergency lighting failure",lessons:"✓ Regular inspection of ALL fire equipment (charged extinguishers)\n✓ Fire doors NEVER held open\n✓ Crew training MANDATORY (monthly drills)\n✓ Muster list known by all\n✓ Result: SOLAS strengthened · EU ferry directive\n✓ Sprinklers mandatory on all passenger ferries",link:"🔗 L4 Fire Link: Rapid spread due to open fire doors and untrained crew = catastrophe. Fire prevention relies on training, inspections and discipline."},
    es:{title:"Incendio MV Scandinavian Star — Skagerrak (1990)",teaser:"Ferry · Incendio criminal · 158 muertos · Múltiples fallos",what:"El ferry Scandinavian Star se incendia en el Skagerrak entre Dinamarca y Noruega. El fuego se propaga rápidamente por los pasillos y camarotes. 158 personas mueren principalmente por intoxicación de humos.",cause:"• Incendio criminal en varios lugares\n• Extintores portátiles vacíos o ausentes\n• Sistema de sprinklers no funcional\n• Puertas cortafuegos mantenidas abiertas\n• Tripulación mal formada en procedimientos de emergencia",lessons:"✓ Inspección regular de TODOS los equipos de incendio\n✓ Puertas cortafuegos NUNCA mantenidas abiertas\n✓ Formación tripulación OBLIGATORIA (ejercicios mensuales)\n✓ Resultado: SOLAS reforzado · Directiva ferry UE\n✓ Sprinklers obligatorios en todos los ferrys de pasaje",link:"🔗 Vínculo L4 Incendio: La propagación rápida por puertas abiertas y tripulación no formada = catástrofe."},
    pt:{title:"Incêndio MV Scandinavian Star — Skagerrak (1990)",teaser:"Ferry · Incêndio criminal · 158 mortos · Múltiplas falhas",what:"O ferry Scandinavian Star incendeia-se no Skagerrak entre a Dinamarca e a Noruega. O fogo propaga-se rapidamente pelos corredores e camarotes. 158 pessoas morrem principalmente por intoxicação de fumos.",cause:"• Incêndio criminal em vários locais\n• Extintores portáteis vazios ou em falta\n• Sistema de sprinklers não funcional\n• Portas corta-fogo mantidas abertas\n• Tripulação mal formada nos procedimentos de emergência",lessons:"✓ Inspeção regular de TODOS os equipamentos de incêndio\n✓ Portas corta-fogo NUNCA mantidas abertas\n✓ Formação da tripulação OBRIGATÓRIA (exercícios mensais)\n✓ Resultado: SOLAS reforçado · Diretiva ferry UE\n✓ Sprinklers obrigatórios em todos os ferries de passageiros",link:"🔗 Vínculo L4 Incêndio: A propagação rápida por portas abertas e tripulação não formada = catástrofe."},
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
  const correct={q1:"b",q2:"co2",q3:"non"};
  const qs={
    fr:[
      {id:"q1",q:"Feu d'huile HFO dans la salle des machines. Quel extincteur ?\na) Eau · b) Mousse AFFF · c) Poudre D · d) Classe F"},
      {id:"q2",q:"Système fixe d'extinction pour la salle des machines selon SOLAS :\n(Répondre : CO2, sprinkler ou eau)"},
      {id:"q3",q:"Peut-on déclencher le CO2 fixe sans s'assurer que tout le monde est évacué ?\n(Répondre : oui ou non)"},
    ],
    en:[
      {id:"q1",q:"HFO oil fire in engine room. Which extinguisher?\na) Water · b) AFFF Foam · c) Powder D · d) Class F"},
      {id:"q2",q:"Fixed extinction system for engine room per SOLAS:\n(Answer: CO2, sprinkler or water)"},
      {id:"q3",q:"Can you activate fixed CO2 without ensuring everyone is evacuated?\n(Answer: yes or no)"},
    ],
    es:[
      {id:"q1",q:"Incendio de aceite HFO en sala de máquinas. ¿Qué extintor?\na) Agua · b) Espuma AFFF · c) Polvo D · d) Clase F"},
      {id:"q2",q:"Sistema fijo de extinción para sala de máquinas según SOLAS:\n(Responder: CO2, sprinkler o agua)"},
      {id:"q3",q:"¿Se puede activar el CO2 fijo sin asegurarse de que todos han sido evacuados?\n(Responder: sí o no)"},
    ],
    pt:[
      {id:"q1",q:"Incêndio de óleo HFO na sala de máquinas. Que extintor?\na) Água · b) Espuma AFFF · c) Pó D · d) Classe F"},
      {id:"q2",q:"Sistema fixo de extinção para a sala de máquinas segundo o SOLAS:\n(Responder: CO2, sprinkler ou água)"},
      {id:"q3",q:"Pode-se ativar o CO2 fixo sem garantir que todos foram evacuados?\n(Responder: sim ou não)"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase();
    if(id==="q1") return v==="b";
    if(id==="q2") return v==="co2"||v==="co₂";
    if(id==="q3") return v==="non"||v==="no"||v==="não"||v==="nao";
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.red}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : HFO = classe B → mousse AFFF · CO2 = salle machines · JAMAIS déclencher sans évacuation complète"
        :lang==="en"?"💡 Reminders: HFO = class B → AFFF foam · CO2 = engine room · NEVER activate without full evacuation"
        :lang==="es"?"💡 Recordatorios: HFO = clase B → espuma AFFF · CO2 = sala máquinas · NUNCA activar sin evacuación completa"
        :"💡 Lembretes: HFO = classe B → espuma AFFF · CO2 = sala máquinas · NUNCA ativar sem evacuação completa"}
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
        {lang==="fr"?"✅ Q1: b (HFO = classe B → mousse AFFF, jamais d'eau !)\n✅ Q2: CO2 (système fixe CO2 obligatoire en salle des machines)\n✅ Q3: NON (CO2 = mortel → évacuation totale avant déclenchement)"
        :lang==="en"?"✅ Q1: b (HFO = class B → AFFF foam, never water!)\n✅ Q2: CO2 (fixed CO2 system mandatory in engine room)\n✅ Q3: NO (CO2 = lethal → full evacuation before activation)"
        :"✅ Q1: b · Q2: CO2 · Q3: NO/NÃO"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}


const QUIZ = {
  fr:[
    {q:"Un feu de HFO (fuel lourd) dans la salle des machines est de classe :",opts:["Classe A — solides","Classe B — liquides inflammables","Classe C — électrique","Classe F — cuisine"],correct:1,expl:"HFO (Heavy Fuel Oil) et MDO sont des liquides inflammables = Classe B. Pour les éteindre : mousse AFFF ✅ · CO2 ✅ · Poudre ABC ✅. L'eau est FORMELLEMENT INTERDITE sur les feux de classe B car elle propage le liquide enflammé et peut provoquer une explosion de vapeur."},
    {q:"Le CO2 fixe de la salle des machines est MORTEL si quelqu'un est à l'intérieur car :",opts:["Il brûle la peau","Il réduit le taux d'O₂ en dessous du niveau vital (< 15%) → asphyxie en quelques minutes","Il est toxique chimiquement","Il crée une explosion"],correct:1,expl:"Le CO2 fixe inonde la salle des machines et réduit la concentration d'O₂ de 21% à moins de 15% (seuil vital). En dessous de 10% : perte de conscience rapide. En dessous de 6% : mort en quelques minutes. ÉTAPE CRITIQUE : compter tout l'équipage avant de déclencher."},
    {q:"Avant de déclencher le CO2 fixe, quelle est l'étape la plus critique ?",opts:["Appeler les pompiers","S'assurer que TOUTE l'équipe est évacuée et comptée","Couper le moteur principal","Ouvrir les hublots"],correct:1,expl:"L'étape la plus critique = évacuation totale et comptage de tout l'équipage. Le CO2 est MORTEL pour toute personne restant dans la salle des machines. Après déclenchement : attendre 20-30 minutes minimum. Réentrée uniquement avec ARA (Appareil Respiratoire Autonome)."},
    {q:"Sur un feu électrique (Classe C), quelle est la première action à effectuer ?",opts:["Utiliser de l'eau en jet","Couper l'alimentation électrique EN PREMIER, puis CO2 ou poudre","Appeler la passerelle","Utiliser de la mousse AFFF"],correct:1,expl:"Feu électrique = COUPER LE COURANT EN PREMIER. Tant que l'électricité est présente : risque d'électrocution avec l'eau et la mousse. Après coupure : CO2 ✅ ou poudre ABC ✅. L'eau et la mousse sont interdites tant que le courant est maintenu."},
    {q:"L'alarme générale d'abandon du navire est constituée de :",opts:["3 sons courts","7 sons courts + 1 son long","1 son long continu","5 sons courts"],correct:1,expl:"Alarme générale (SOLAS) : 7 sons courts + 1 son long sur la corne de brume ou le système d'alarme général. Signifie : 'Tout le monde au poste de rassemblement (muster station)'. À distinguer de l'alarme incendie (signal continu) et du signal sonore de brume (1 long toutes les 2 minutes)."},
  ],
  en:[
    {q:"A fire of HFO (heavy fuel oil) in the engine room is class:",opts:["Class A — solids","Class B — flammable liquids","Class C — electrical","Class F — cooking"],correct:1,expl:"HFO and MDO are flammable liquids = Class B. To extinguish: AFFF foam ✅ · CO2 ✅ · ABC powder ✅. Water is STRICTLY PROHIBITED on Class B fires as it spreads the burning liquid and can cause a steam explosion."},
    {q:"Fixed CO2 in the engine room is LETHAL if anyone is inside because:",opts:["It burns skin","It reduces O₂ level below the vital threshold (< 15%) → asphyxiation in minutes","It is chemically toxic","It creates an explosion"],correct:1,expl:"Fixed CO2 floods the engine room and reduces O₂ concentration from 21% to below 15% (vital threshold). Below 10%: rapid loss of consciousness. Below 6%: death in minutes. CRITICAL STEP: count all crew before activation."},
    {q:"Before activating fixed CO2, what is the most critical step?",opts:["Call the fire brigade","Ensure ALL crew is evacuated and accounted for","Shut down main engine","Open portholes"],correct:1,expl:"Most critical step = total evacuation and counting of all crew. CO2 is LETHAL for anyone remaining in the engine room. After activation: wait minimum 20-30 minutes. Re-entry only with SCBA (Self-Contained Breathing Apparatus)."},
    {q:"For an electrical fire (Class C), what is the first action?",opts:["Use water jet","Cut electrical power FIRST, then CO2 or powder","Call the bridge","Use AFFF foam"],correct:1,expl:"Electrical fire = CUT POWER FIRST. While electricity is present: electrocution risk with water and foam. After cutting: CO2 ✅ or ABC powder ✅. Water and foam are forbidden while current is maintained."},
    {q:"The general abandon ship alarm consists of:",opts:["3 short blasts","7 short blasts + 1 long blast","1 continuous long blast","5 short blasts"],correct:1,expl:"General alarm (SOLAS): 7 short + 1 long blast on the ship's whistle or general alarm system. Means: 'All crew to muster stations'. Distinguish from fire alarm (continuous signal) and fog signal (1 long every 2 minutes)."},
  ],
  es:[
    {q:"Un incendio de HFO (fuelóleo pesado) en la sala de máquinas es de clase:",opts:["Clase A — sólidos","Clase B — líquidos inflamables","Clase C — eléctrico","Clase F — cocina"],correct:1,expl:"HFO y MDO son líquidos inflamables = Clase B. Para extinguir: espuma AFFF ✅ · CO2 ✅ · Polvo ABC ✅. El agua está ESTRICTAMENTE PROHIBIDA en los fuegos de clase B, ya que propaga el líquido inflamado y puede provocar una explosión de vapor."},
    {q:"El CO2 fijo de la sala de máquinas es MORTAL si hay alguien dentro porque:",opts:["Quema la piel","Reduce el nivel de O₂ por debajo del umbral vital (< 15%) → asfixia en minutos","Es químicamente tóxico","Crea una explosión"],correct:1,expl:"El CO2 fijo inunda la sala de máquinas y reduce la concentración de O₂ del 21% a menos del 15% (umbral vital). Por debajo del 10%: pérdida rápida de consciencia. Por debajo del 6%: muerte en minutos. PASO CRÍTICO: contar a toda la tripulación antes de activar."},
    {q:"Antes de activar el CO2 fijo, ¿cuál es el paso más crítico?",opts:["Llamar a los bomberos","Asegurarse de que TODA la tripulación ha sido evacuada y contada","Parar el motor principal","Abrir los portillos"],correct:1,expl:"Paso más crítico = evacuación total y recuento de toda la tripulación. El CO2 es MORTAL para cualquier persona que permanezca en la sala de máquinas. Tras la activación: esperar mínimo 20-30 minutos. Reentrada solo con ERA (Equipo Respiratorio Autónomo)."},
    {q:"Para un incendio eléctrico (Clase C), ¿cuál es la primera acción?",opts:["Usar agua a chorro","Cortar la alimentación eléctrica PRIMERO, luego CO2 o polvo","Llamar al puente","Usar espuma AFFF"],correct:1,expl:"Incendio eléctrico = CORTAR LA CORRIENTE PRIMERO. Mientras hay electricidad: riesgo de electrocución con agua y espuma. Después: CO2 ✅ o polvo ABC ✅. Agua y espuma prohibidas mientras se mantiene la corriente."},
    {q:"La alarma general de abandono del buque consiste en:",opts:["3 pitidos cortos","7 pitidos cortos + 1 pitido largo","1 pitido largo continuo","5 pitidos cortos"],correct:1,expl:"Alarma general (SOLAS): 7 cortos + 1 largo en el pito del buque o sistema de alarma general. Significa: 'Todo el mundo a los puestos de reunión (muster stations)'. Distinguir de la alarma de incendio (señal continua) y la señal de niebla (1 largo cada 2 minutos)."},
  ],
  pt:[
    {q:"Um incêndio de HFO (fuelóleo pesado) na sala de máquinas é de classe:",opts:["Classe A — sólidos","Classe B — líquidos inflamáveis","Classe C — elétrico","Classe F — cozinha"],correct:1,expl:"HFO e MDO são líquidos inflamáveis = Classe B. Para extinguir: espuma AFFF ✅ · CO2 ✅ · Pó ABC ✅. A água é ESTRITAMENTE PROIBIDA em fogos de Classe B, pois propaga o líquido em chamas e pode causar uma explosão de vapor."},
    {q:"O CO2 fixo da sala de máquinas é FATAL se alguém estiver lá dentro porque:",opts:["Queima a pele","Reduz o nível de O₂ abaixo do limiar vital (< 15%) → asfixia em minutos","É quimicamente tóxico","Cria uma explosão"],correct:1,expl:"O CO2 fixo inunda a sala de máquinas e reduz a concentração de O₂ de 21% para menos de 15% (limiar vital). Abaixo de 10%: perda rápida de consciência. Abaixo de 6%: morte em minutos. PASSO CRÍTICO: contar toda a tripulação antes de ativar."},
    {q:"Antes de ativar o CO2 fixo, qual é o passo mais crítico?",opts:["Chamar os bombeiros","Garantir que TODA a tripulação foi evacuada e contabilizada","Parar o motor principal","Abrir as escotilhas"],correct:1,expl:"Passo mais crítico = evacuação total e contagem de toda a tripulação. O CO2 é FATAL para qualquer pessoa que permaneça na sala de máquinas. Após ativação: aguardar mínimo 20-30 minutos. Reentrada apenas com ARA (Aparelho Respiratório Autónomo)."},
    {q:"Para um incêndio elétrico (Classe C), qual é a primeira ação?",opts:["Usar água em jato","Cortar a alimentação elétrica PRIMEIRO, depois CO2 ou pó","Chamar a ponte","Usar espuma AFFF"],correct:1,expl:"Incêndio elétrico = CORTAR A CORRENTE PRIMEIRO. Enquanto há eletricidade: risco de electrocução com água e espuma. Depois: CO2 ✅ ou pó ABC ✅. Água e espuma proibidas enquanto a corrente for mantida."},
    {q:"O alarme geral de abandono do navio consiste em:",opts:["3 toques curtos","7 toques curtos + 1 toque longo","1 toque longo contínuo","5 toques curtos"],correct:1,expl:"Alarme geral (SOLAS): 7 curtos + 1 longo no apito do navio ou sistema de alarme geral. Significa: 'Toda a tripulação aos postos de reunião (muster stations)'. Distinguir do alarme de incêndio (sinal contínuo) e do sinal de nevoeiro (1 longo cada 2 minutos)."},
  ],
};

const BANK = {
  fr:[
    {q:"Quels sont les 3 éléments du triangle du feu ?",opts:["Air · eau · feu","Combustible · comburant (O₂) · chaleur","Chaleur · fumée · flamme","Carburant · oxygène · explosion"],correct:1,expl:"Triangle du feu : Combustible + Comburant (O₂) + Chaleur. Retirer UN des trois éléments suffit pour éteindre le feu. CO2 = retire l'oxygène. Eau = retire la chaleur. Isolation = retire le combustible."},
    {q:"Pourquoi ne faut-il JAMAIS utiliser l'eau sur un feu de classe B (liquides) ?",opts:["L'eau est trop froide","L'eau se vaporise et projette le liquide enflammé, propageant l'incendie","L'eau est électrique","L'eau est trop lourde"],correct:1,expl:"L'eau sur un feu de liquide inflammable : 1) Peut créer une émulsion qui projette des gouttelettes enflammées. 2) L'eau se vaporise instantanément (explosion de vapeur) projetant le liquide. 3) L'eau est plus lourde que l'huile → coule sous l'huile enflammée et la projette."},
    {q:"Qu'est-ce que l'ARA / SCBA ?",opts:["Un type d'extincteur","Appareil Respiratoire Autonome — protection respiratoire complète pour évoluer en atmosphère irrespirable","Un système d'alarme","Un type de combinaison ignifuge"],correct:1,expl:"ARA (Appareil Respiratoire Autonome) = SCBA (Self-Contained Breathing Apparatus). Bouteille d'air comprimé + masque intégral. Autonomie : 30-60 min. Obligatoire pour : réentrée après CO2, incendie en espace confiné, fuite de gaz. 2 minimum à bord (SOLAS)."},
    {q:"Qu'est-ce qu'un 'rôle d'appel' (muster list) ?",opts:["La liste des passagers","Le document indiquant le poste d'urgence de chaque membre d'équipage et ses responsabilités","Le registre des manœuvres","Le plan de chargement"],correct:1,expl:"Rôle d'appel (muster list) = document SOLAS affichant pour chaque membre d'équipage : son poste de rassemblement, son poste d'incendie, ses responsabilités en cas d'urgence. Affiché dans les cabines et espaces communs. Doit être connu de tous."},
    {q:"Quelle est la différence entre une porte coupe-feu et une porte étanche ?",opts:["Même chose","Porte coupe-feu = résiste au feu · Porte étanche = résiste à l'eau et à la pression","Porte coupe-feu = plus lourde","Porte étanche = plus chère"],correct:1,expl:"Porte coupe-feu = résiste au feu (classification A, B ou C selon la durée). Empêche la propagation du feu et des fumées. Porte étanche = résiste à l'eau et à la pression (compartimentage SOLAS). Les deux sont obligatoires mais avec des fonctions différentes."},
    {q:"À quelle fréquence doit-on tester les équipements incendie selon SOLAS ?",opts:["Une fois par an seulement","Exercice hebdomadaire · Inspection mensuelle des extincteurs · Test annuel des systèmes fixes","Une fois avant chaque voyage","Seulement lors des inspections de classe"],correct:1,expl:"SOLAS : exercice incendie et abandon au moins une fois par semaine. Inspection extincteurs portables : mensuelle (vérifier pression, scellé, étiquette). Test systèmes fixes (CO2, sprinklers) : annuel par organisme agréé. Registre des exercices obligatoire."},
    {q:"Qu'est-ce qu'un 'sprinkler' (extincteur automatique) ?",opts:["Un type de mousse haute expansion","Tête thermosensible qui libère de l'eau automatiquement quand la température dépasse 68°C","Une alarme de détection de fumée","Un extincteur portable à eau"],correct:1,expl:"Sprinkler = tête thermosensible (ampoule de verre qui éclate à 68°C ou 93°C selon le type). Libère automatiquement de l'eau sur le feu. Obligatoire dans les cabines des navires passagers (SOLAS). Un sprinkler arrose uniquement la zone en feu, pas toutes les têtes."},
    {q:"Quelle est la différence entre alarme incendie et alarme générale ?",opts:["Même signal","Alarme incendie = signal continu · Alarme générale = 7 sons courts + 1 long (abandon)","Alarme incendie = 5 sons courts · Alarme générale = klaxon continu","Alarme incendie = au pont · Alarme générale = en machine"],correct:1,expl:"Alarme incendie = signal continu ou code spécifique selon le navire. Alarme générale d'abandon = 7 sons courts + 1 son long (SOLAS). L'alarme générale signifie : aller au poste de rassemblement avec gilet de sauvetage. Bien distinguer les deux."},
    {q:"Qu'est-ce que la propagation du feu par 'rayonnement' ?",opts:["Le feu se déplace par les courants d'air","Transfert de chaleur par ondes électromagnétiques sans contact physique","Le feu se propage par les câbles électriques","Transfert de chaleur par contact direct"],correct:1,expl:"Propagation par rayonnement = la chaleur se transmet par ondes infrarouges sans contact physique. Peut enflammer des matériaux à distance. Dangereux dans les espaces ouverts. Les 3 modes : conduction (contact direct), convection (courants de chaleur), rayonnement (ondes)."},
    {q:"Qu'est-ce qu'un 'fire damper' (clapet coupe-feu) ?",opts:["Un extincteur portable","Volet automatique dans les conduits de ventilation qui se ferme en cas d'incendie pour bloquer la propagation","Un type de porte étanche","Une alarme de détection"],correct:1,expl:"Fire damper = clapet coupe-feu dans les conduits de ventilation. Se ferme automatiquement (fusible thermique ou détection) en cas d'incendie pour bloquer la propagation des flammes et des fumées dans tout le navire via les conduits. Obligatoire SOLAS dans tous les conduits traversant les cloisons coupe-feu."},
    {q:"Combien d'extincteurs CO2 doit-on avoir minimum dans la salle des machines ?",opts:["1 extincteur","Au moins 2 extincteurs CO2 de 5 kg chacun (SOLAS)","5 extincteurs","10 extincteurs"],correct:1,expl:"SOLAS exige au minimum 2 extincteurs CO2 de 5 kg dans la salle des machines. En pratique, les règlements de classification (Bureau Veritas, Lloyd's...) imposent davantage selon la taille de la salle des machines. Inspection mensuelle obligatoire."},
    {q:"Qu'est-ce que la 'résistance au feu A-60' d'une cloison ?",opts:["La cloison résiste 60 secondes","La cloison résiste au passage des flammes et à une élévation de température > 140°C pendant 60 minutes","La cloison est faite d'acier de 60mm","La cloison coûte 60 000€"],correct:1,expl:"Classification des cloisons coupe-feu : A-0 (acier, pas d'isolation), A-15, A-30, A-60 (isolation empêchant l'élévation de température > 140°C pendant 15, 30 ou 60 minutes). A-60 = cloisons entre salle des machines et espaces à risque. B = cloisons légères, C = séparations sans exigence de résistance au feu."},
    {q:"Qu'est-ce que l'agent extincteur AFFF ?",opts:["Un gaz neutre","Aqueous Film Forming Foam — mousse filmogène qui crée un film sur le liquide enflammé, le séparant de l'air","Un type de poudre chimique","Un halon de substitution"],correct:1,expl:"AFFF = Aqueous Film Forming Foam (mousse filmogène aqueuse). Crée un film aqueux sur la surface du liquide inflammable (HFO, MDO) qui : 1) Sépare le liquide de l'air (étouffement), 2) Refroidit, 3) Empêche la re-inflammation. Idéal pour les feux d'hydrocarbures."},
    {q:"Quelle est la procédure après utilisation du CO2 fixe pour entrer dans la salle des machines ?",opts:["Entrer immédiatement","Attendre 20-30 min · tester l'atmosphère · ARA obligatoire · équipe de 2 minimum · garde extérieure","Attendre 5 minutes · puis entrer normalement","Ouvrir les portes et attendre 1 heure"],correct:1,expl:"Réentrée après CO2 : 1) Attendre 20-30 min minimum. 2) Ventiler abondamment. 3) Tester l'atmosphère (O2 > 19,5%). 4) ARA obligatoire pour toute l'équipe. 5) Équipe de 2 minimum. 6) Garde à l'extérieur obligatoire. 7) Rechercher les personnes éventuellement piégées."},
    {q:"Qu'est-ce que la 'ronde incendie' (fire patrol) ?",opts:["Une formation hebdomadaire","Inspection régulière des espaces à bord pour détecter tout risque d'incendie ou début de feu","Un exercice d'évacuation","La vérification des extincteurs"],correct:1,expl:"Ronde incendie = inspection périodique par un marin de tous les espaces (soutes, cales, logements) pour détecter : débuts d'incendie, odeurs de fumée, chaleur anormale, équipements défectueux. Obligatoire selon le plan de sécurité incendie du navire. Fréquence : selon plan (souvent 2-4 fois/jour)."},
  ],
  en:[
    {q:"What are the 3 elements of the fire triangle?",opts:["Air · water · fire","Fuel · oxidizer (O₂) · heat","Heat · smoke · flame","Fuel · oxygen · explosion"],correct:1,expl:"Fire triangle: Fuel + Oxidizer (O₂) + Heat. Removing ONE of the three elements is enough to extinguish the fire. CO2 = removes oxygen. Water = removes heat. Isolation = removes fuel."},
    {q:"Why should you NEVER use water on a Class B fire (liquids)?",opts:["Water is too cold","Water vaporizes and projects burning liquid, spreading the fire","Water conducts electricity","Water is too heavy"],correct:1,expl:"Water on a flammable liquid fire: 1) Can create an emulsion projecting burning droplets. 2) Water instantly vaporizes (steam explosion) projecting liquid. 3) Water is heavier than oil → sinks under burning oil and projects it."},
    {q:"What is SCBA (Self-Contained Breathing Apparatus)?",opts:["A type of extinguisher","Compressed air cylinder + full face mask for working in irrespirable atmospheres","An alarm system","A type of fire-resistant suit"],correct:1,expl:"SCBA = Self-Contained Breathing Apparatus. Compressed air cylinder + full face mask. Autonomy: 30-60 min. Mandatory for: re-entry after CO2, fire in confined space, gas leak. Minimum 2 on board (SOLAS)."},
    {q:"What is a muster list?",opts:["Passenger list","Document showing each crew member's emergency station and responsibilities","Maneuver register","Loading plan"],correct:1,expl:"Muster list = SOLAS document showing for each crew member: muster station, fire station, emergency responsibilities. Posted in cabins and common spaces. Must be known by all crew."},
    {q:"What is the difference between a fire door and a watertight door?",opts:["Same thing","Fire door = resists fire · Watertight door = resists water and pressure","Fire door = heavier","Watertight door = more expensive"],correct:1,expl:"Fire door = resists fire (A, B or C classification by duration). Prevents fire and smoke spread. Watertight door = resists water and pressure (SOLAS compartmentalization). Both mandatory but different functions."},
    {q:"How often must fire equipment be tested per SOLAS?",opts:["Once a year only","Weekly drill · Monthly extinguisher inspection · Annual fixed system test","Once before each voyage","Only during class inspections"],correct:1,expl:"SOLAS: fire and abandon ship drill at least once a week. Portable extinguisher inspection: monthly (check pressure, seal, label). Fixed systems (CO2, sprinklers): annual test by approved body. Drill log mandatory."},
    {q:"What is a sprinkler (automatic extinguisher)?",opts:["A type of high expansion foam","Heat-sensitive head that automatically releases water when temperature exceeds 68°C","A smoke detection alarm","A portable water extinguisher"],correct:1,expl:"Sprinkler = heat-sensitive head (glass bulb that bursts at 68°C or 93°C). Automatically releases water on the fire. Mandatory in passenger vessel cabins (SOLAS). A sprinkler only sprays the fire zone, not all heads."},
    {q:"What is the difference between fire alarm and general alarm?",opts:["Same signal","Fire alarm = continuous signal · General alarm = 7 short + 1 long (abandon)","Fire alarm = 5 short · General alarm = continuous horn","Fire alarm = on deck · General alarm = in engine room"],correct:1,expl:"Fire alarm = continuous signal or vessel-specific code. General abandon alarm = 7 short + 1 long (SOLAS). General alarm means: go to muster station with life jacket. Must clearly distinguish the two."},
    {q:"What is fire propagation by 'radiation'?",opts:["Fire moves through air currents","Heat transfer by electromagnetic waves without physical contact","Fire spreads through electrical cables","Heat transfer by direct contact"],correct:1,expl:"Radiation = heat transmitted by infrared waves without physical contact. Can ignite materials at a distance. Dangerous in open spaces. The 3 modes: conduction (direct contact), convection (heat currents), radiation (waves)."},
    {q:"What is a fire damper?",opts:["A portable extinguisher","Automatic flap in ventilation ducts that closes on fire detection to block spread","A type of watertight door","A detection alarm"],correct:1,expl:"Fire damper = fire flap in ventilation ducts. Closes automatically (thermal fuse or detection) on fire to block flame and smoke spread through the vessel via ducts. SOLAS mandatory in all ducts crossing fire-resistant bulkheads."},
    {q:"How many CO2 extinguishers must the engine room have minimum?",opts:["1 extinguisher","At least 2 CO2 extinguishers of 5 kg each (SOLAS)","5 extinguishers","10 extinguishers"],correct:1,expl:"SOLAS requires minimum 2 CO2 extinguishers of 5 kg in the engine room. In practice, classification society rules (BV, Lloyd's...) require more depending on engine room size. Monthly inspection mandatory."},
    {q:"What does 'A-60 fire resistance' mean for a bulkhead?",opts:["Bulkhead resists 60 seconds","Bulkhead resists flame passage and temperature rise > 140°C for 60 minutes","Made of 60mm steel","Costs 60,000€"],correct:1,expl:"Fire bulkhead classification: A-0 (steel, no insulation), A-15, A-30, A-60 (insulation preventing temperature rise > 140°C for 15, 30 or 60 minutes). A-60 = bulkheads between engine room and risk spaces."},
    {q:"What is AFFF extinguishing agent?",opts:["A neutral gas","Aqueous Film Forming Foam — film-forming foam creating a film on burning liquid separating it from air","A type of chemical powder","A halon substitute"],correct:1,expl:"AFFF = Aqueous Film Forming Foam. Creates an aqueous film on the flammable liquid surface (HFO, MDO) that: 1) Separates liquid from air (smothering), 2) Cools, 3) Prevents re-ignition. Ideal for hydrocarbon fires."},
    {q:"What is the procedure after using fixed CO2 to re-enter the engine room?",opts:["Enter immediately","Wait 20-30 min · test atmosphere · SCBA mandatory · 2-person team minimum · outside guard","Wait 5 minutes · enter normally","Open doors and wait 1 hour"],correct:1,expl:"Re-entry after CO2: 1) Wait 20-30 min minimum. 2) Ventilate thoroughly. 3) Test atmosphere (O2 > 19.5%). 4) SCBA mandatory for entire team. 5) Minimum 2-person team. 6) Outside guard mandatory. 7) Search for any trapped persons."},
    {q:"What is a fire patrol?",opts:["A weekly training","Regular inspection of vessel spaces to detect any fire risk or early fire","An evacuation drill","Extinguisher check"],correct:1,expl:"Fire patrol = periodic inspection by a crew member of all spaces (bunkers, holds, accommodations) to detect: early fires, smoke odors, abnormal heat, faulty equipment. Mandatory per vessel's fire safety plan. Frequency: per plan (often 2-4 times/day)."},
  ],
  es:[
    {q:"¿Cuáles son los 3 elementos del triángulo del fuego?",opts:["Aire · agua · fuego","Combustible · comburente (O₂) · calor","Calor · humo · llama","Combustible · oxígeno · explosión"],correct:1,expl:"Triángulo del fuego: Combustible + Comburente (O₂) + Calor. Retirar UNO de los tres elementos es suficiente para apagar el fuego. CO2 = retira el oxígeno. Agua = retira el calor. Aislamiento = retira el combustible."},
    {q:"¿Por qué NUNCA se debe usar agua en un incendio de clase B (líquidos)?",opts:["El agua es demasiado fría","El agua se vaporiza y proyecta el líquido inflamado, propagando el incendio","El agua es eléctrica","El agua es demasiado pesada"],correct:1,expl:"Agua sobre líquido inflamable: 1) Puede crear una emulsión que proyecta gotitas en llamas. 2) El agua se vaporiza instantáneamente (explosión de vapor) proyectando el líquido. 3) El agua es más pesada que el aceite → se hunde bajo el aceite inflamado y lo proyecta."},
    {q:"¿Qué es el ERA / SCBA (Equipo Respiratorio Autónomo)?",opts:["Un tipo de extintor","Botella de aire comprimido + máscara integral para trabajar en atmósferas irrespirables","Un sistema de alarma","Un tipo de traje ignífugo"],correct:1,expl:"ERA = SCBA. Botella de aire comprimido + máscara integral. Autonomía: 30-60 min. Obligatorio para: reentrada tras CO2, incendio en espacio confinado, fuga de gas. Mínimo 2 a bordo (SOLAS)."},
    {q:"¿Qué es el cuadro de obligaciones / rol de abandono (muster list)?",opts:["La lista de pasajeros","El documento que indica el puesto de emergencia de cada miembro de tripulación y sus responsabilidades","El registro de maniobras","El plan de carga"],correct:1,expl:"Cuadro de obligaciones (muster list) = documento SOLAS que muestra para cada miembro: su punto de reunión, puesto contraincendios, responsabilidades en emergencia. Expuesto en camarotes y espacios comunes. Debe ser conocido por todos."},
    {q:"¿Cuál es la diferencia entre puerta cortafuegos y puerta estanca?",opts:["Lo mismo","Puerta cortafuegos = resiste el fuego · Puerta estanca = resiste el agua y la presión","Puerta cortafuegos = más pesada","Puerta estanca = más cara"],correct:1,expl:"Puerta cortafuegos = resiste el fuego (clasificación A, B o C). Evita la propagación del fuego y el humo. Puerta estanca = resiste el agua y la presión (compartimentado SOLAS). Ambas obligatorias pero con funciones diferentes."},
    {q:"¿Con qué frecuencia deben probarse los equipos contraincendios según SOLAS?",opts:["Una vez al año solo","Simulacro semanal · Inspección mensual de extintores · Prueba anual de sistemas fijos","Una vez antes de cada viaje","Solo en inspecciones de clase"],correct:1,expl:"SOLAS: simulacro contraincendios y abandono al menos una vez por semana. Inspección extintores portátiles: mensual. Sistemas fijos (CO2, sprinklers): prueba anual por organismo autorizado. Registro de simulacros obligatorio."},
    {q:"¿Qué es un sprinkler (extintor automático)?",opts:["Un tipo de espuma de alta expansión","Cabeza termosensible que libera agua automáticamente cuando la temperatura supera los 68°C","Una alarma de detección de humo","Un extintor portátil de agua"],correct:1,expl:"Sprinkler = cabeza termosensible (ampolla de vidrio que estalla a 68°C o 93°C). Libera agua automáticamente sobre el fuego. Obligatorio en camarotes de buques de pasaje (SOLAS). Un sprinkler solo riega la zona en llamas, no todas las cabezas."},
    {q:"¿Cuál es la diferencia entre alarma de incendio y alarma general?",opts:["La misma señal","Alarma incendio = señal continua · Alarma general = 7 cortos + 1 largo (abandono)","Alarma incendio = 5 cortos · Alarma general = claxon continuo","Alarma incendio = en cubierta · Alarma general = en máquinas"],correct:1,expl:"Alarma de incendio = señal continua o código específico. Alarma general de abandono = 7 cortos + 1 largo (SOLAS). La alarma general significa: ir al punto de reunión con chaleco salvavidas. Hay que distinguir bien las dos."},
    {q:"¿Qué es la propagación del fuego por 'radiación'?",opts:["El fuego se mueve por corrientes de aire","Transferencia de calor por ondas electromagnéticas sin contacto físico","El fuego se propaga por cables eléctricos","Transferencia de calor por contacto directo"],correct:1,expl:"Radiación = el calor se transmite por ondas infrarrojas sin contacto físico. Puede inflamar materiales a distancia. Los 3 modos: conducción (contacto directo), convección (corrientes de calor), radiación (ondas)."},
    {q:"¿Qué es un 'fire damper' (compuerta cortafuego)?",opts:["Un extintor portátil","Compuerta automática en conductos de ventilación que se cierra en caso de incendio para bloquear la propagación","Un tipo de puerta estanca","Una alarma de detección"],correct:1,expl:"Fire damper = compuerta cortafuego en conductos de ventilación. Se cierra automáticamente (fusible térmico o detección) para bloquear la propagación de llamas y humos. SOLAS obligatorio en todos los conductos que atraviesan mamparos cortafuegos."},
    {q:"¿Cuántos extintores CO2 debe tener como mínimo la sala de máquinas?",opts:["1 extintor","Al menos 2 extintores CO2 de 5 kg cada uno (SOLAS)","5 extintores","10 extintores"],correct:1,expl:"SOLAS exige mínimo 2 extintores CO2 de 5 kg en la sala de máquinas. En la práctica, las sociedades de clasificación (BV, Lloyd's...) exigen más según el tamaño. Inspección mensual obligatoria."},
    {q:"¿Qué significa la 'resistencia al fuego A-60' de un mamparo?",opts:["El mamparo resiste 60 segundos","El mamparo resiste el paso de llamas y una elevación de temperatura > 140°C durante 60 minutos","Fabricado en acero de 60mm","Cuesta 60.000€"],correct:1,expl:"Clasificación mamparos cortafuego: A-0 (acero sin aislamiento), A-15, A-30, A-60 (aislamiento que impide elevación de temperatura > 140°C durante 15, 30 o 60 minutos). A-60 = mamparos entre sala de máquinas y espacios de riesgo."},
    {q:"¿Qué es el agente extintor AFFF?",opts:["Un gas neutro","Aqueous Film Forming Foam — espuma filmógena que crea una película sobre el líquido inflamado separándolo del aire","Un tipo de polvo químico","Un sustituto del halón"],correct:1,expl:"AFFF = espuma filmógena acuosa. Crea una película acuosa sobre la superficie del líquido inflamable que: 1) Separa el líquido del aire (sofocación), 2) Enfría, 3) Impide la re-inflamación. Ideal para fuegos de hidrocarburos."},
    {q:"¿Cuál es el procedimiento tras el uso del CO2 fijo para entrar en la sala de máquinas?",opts:["Entrar inmediatamente","Esperar 20-30 min · probar la atmósfera · ERA obligatorio · equipo mínimo 2 · guardia exterior","Esperar 5 minutos · entrar normalmente","Abrir puertas y esperar 1 hora"],correct:1,expl:"Reentrada tras CO2: 1) Esperar 20-30 min. 2) Ventilar abundantemente. 3) Probar atmósfera (O2 > 19,5%). 4) ERA obligatorio. 5) Equipo mínimo 2 personas. 6) Guardia exterior obligatoria. 7) Buscar posibles personas atrapadas."},
    {q:"¿Qué es la 'ronda contraincendios' (fire patrol)?",opts:["Una formación semanal","Inspección regular de los espacios del buque para detectar cualquier riesgo de incendio","Un simulacro de evacuación","La verificación de extintores"],correct:1,expl:"Ronda contraincendios = inspección periódica por un marinero de todos los espacios (pañoles, bodegas, alojamientos) para detectar: inicio de incendios, olores de humo, calor anormal, equipos defectuosos. Obligatoria según el plan de seguridad contraincendios del buque."},
  ],
  pt:[
    {q:"Quais são os 3 elementos do triângulo do fogo?",opts:["Ar · água · fogo","Combustível · comburente (O₂) · calor","Calor · fumo · chama","Combustível · oxigénio · explosão"],correct:1,expl:"Triângulo do fogo: Combustível + Comburente (O₂) + Calor. Remover UM dos três elementos é suficiente para apagar o fogo. CO2 = remove o oxigénio. Água = remove o calor. Isolamento = remove o combustível."},
    {q:"Por que NUNCA se deve usar água num incêndio de Classe B (líquidos)?",opts:["A água é demasiado fria","A água vaporiza e projeta o líquido em chamas, propagando o incêndio","A água conduz eletricidade","A água é demasiado pesada"],correct:1,expl:"Água sobre líquido inflamável: 1) Pode criar uma emulsão que projeta gotículas em chamas. 2) A água vaporiza instantaneamente (explosão de vapor) projetando o líquido. 3) A água é mais pesada que o óleo → afunda sob o óleo em chamas e projeta-o."},
    {q:"O que é o ARA / SCBA (Aparelho Respiratório Autónomo)?",opts:["Um tipo de extintor","Garrafa de ar comprimido + máscara integral para trabalhar em atmosferas irrespiráveis","Um sistema de alarme","Um tipo de fato ignífugo"],correct:1,expl:"ARA = SCBA. Garrafa de ar comprimido + máscara integral. Autonomia: 30-60 min. Obrigatório para: reentrada após CO2, incêndio em espaço confinado, fuga de gás. Mínimo 2 a bordo (SOLAS)."},
    {q:"O que é o quadro de obrigações (muster list)?",opts:["A lista de passageiros","Documento indicando o posto de emergência de cada membro da tripulação e as suas responsabilidades","O registo de manobras","O plano de carregamento"],correct:1,expl:"Quadro de obrigações (muster list) = documento SOLAS que mostra para cada membro: posto de reunião, posto de incêndio, responsabilidades em emergência. Afixado nos camarotes e espaços comuns. Deve ser conhecido por todos."},
    {q:"Qual é a diferença entre porta corta-fogo e porta estanque?",opts:["A mesma coisa","Porta corta-fogo = resiste ao fogo · Porta estanque = resiste à água e à pressão","Porta corta-fogo = mais pesada","Porta estanque = mais cara"],correct:1,expl:"Porta corta-fogo = resiste ao fogo (classificação A, B ou C). Impede a propagação do fogo e fumos. Porta estanque = resiste à água e à pressão (compartimentamento SOLAS). Ambas obrigatórias mas com funções diferentes."},
    {q:"Com que frequência devem ser testados os equipamentos de incêndio segundo o SOLAS?",opts:["Uma vez por ano apenas","Exercício semanal · Inspeção mensal de extintores · Teste anual dos sistemas fixos","Uma vez antes de cada viagem","Apenas em inspeções de classe"],correct:1,expl:"SOLAS: exercício de incêndio e abandono pelo menos uma vez por semana. Inspeção extintores portáteis: mensal. Sistemas fixos (CO2, sprinklers): teste anual por organismo aprovado. Registo de exercícios obrigatório."},
    {q:"O que é um sprinkler (extintor automático)?",opts:["Um tipo de espuma de alta expansão","Cabeça termossensível que liberta água automaticamente quando a temperatura ultrapassa os 68°C","Um alarme de deteção de fumo","Um extintor portátil de água"],correct:1,expl:"Sprinkler = cabeça termossensível (ampola de vidro que rebenta a 68°C ou 93°C). Liberta água automaticamente sobre o fogo. Obrigatório nos camarotes de navios de passageiros (SOLAS). Um sprinkler só rega a zona em chamas, não todas as cabeças."},
    {q:"Qual é a diferença entre alarme de incêndio e alarme geral?",opts:["O mesmo sinal","Alarme incêndio = sinal contínuo · Alarme geral = 7 curtos + 1 longo (abandono)","Alarme incêndio = 5 curtos · Alarme geral = buzina contínua","Alarme incêndio = no convés · Alarme geral = na máquina"],correct:1,expl:"Alarme de incêndio = sinal contínuo ou código específico. Alarme geral de abandono = 7 curtos + 1 longo (SOLAS). O alarme geral significa: ir ao posto de reunião com colete salva-vidas. É preciso distinguir bem os dois."},
    {q:"O que é a propagação do fogo por 'radiação'?",opts:["O fogo move-se por correntes de ar","Transferência de calor por ondas eletromagnéticas sem contacto físico","O fogo propaga-se pelos cabos elétricos","Transferência de calor por contacto direto"],correct:1,expl:"Radiação = o calor transmite-se por ondas infravermelhas sem contacto físico. Pode inflamar materiais à distância. Os 3 modos: condução (contacto direto), convecção (correntes de calor), radiação (ondas)."},
    {q:"O que é um 'fire damper' (registador corta-fogo)?",opts:["Um extintor portátil","Registador automático em condutas de ventilação que fecha em caso de incêndio para bloquear a propagação","Um tipo de porta estanque","Um alarme de deteção"],correct:1,expl:"Fire damper = registador corta-fogo em condutas de ventilação. Fecha automaticamente (fusível térmico ou deteção) para bloquear a propagação de chamas e fumos. SOLAS obrigatório em todas as condutas que atravessam anteparas corta-fogo."},
    {q:"Quantos extintores CO2 deve ter no mínimo a sala de máquinas?",opts:["1 extintor","Pelo menos 2 extintores CO2 de 5 kg cada (SOLAS)","5 extintores","10 extintores"],correct:1,expl:"SOLAS exige mínimo 2 extintores CO2 de 5 kg na sala de máquinas. Na prática, as sociedades de classificação (BV, Lloyd's...) exigem mais dependendo do tamanho. Inspeção mensal obrigatória."},
    {q:"O que significa a 'resistência ao fogo A-60' de uma antepara?",opts:["A antepara resiste 60 segundos","A antepara resiste à passagem de chamas e a uma elevação de temperatura > 140°C durante 60 minutos","Fabricada em aço de 60mm","Custa 60.000€"],correct:1,expl:"Classificação anteparas corta-fogo: A-0 (aço sem isolamento), A-15, A-30, A-60 (isolamento que impede elevação de temperatura > 140°C durante 15, 30 ou 60 minutos). A-60 = anteparas entre sala de máquinas e espaços de risco."},
    {q:"O que é o agente extintor AFFF?",opts:["Um gás neutro","Aqueous Film Forming Foam — espuma filmogénica que cria uma película sobre o líquido em chamas separando-o do ar","Um tipo de pó químico","Um substituto do halon"],correct:1,expl:"AFFF = espuma filmogénica aquosa. Cria uma película aquosa sobre a superfície do líquido inflamável que: 1) Separa o líquido do ar (sufocação), 2) Arrefece, 3) Impede a re-inflamação. Ideal para fogos de hidrocarbonetos."},
    {q:"Qual é o procedimento após o uso do CO2 fixo para entrar na sala de máquinas?",opts:["Entrar imediatamente","Aguardar 20-30 min · testar atmosfera · ARA obrigatório · equipa mínima 2 · vigilante exterior","Aguardar 5 minutos · entrar normalmente","Abrir portas e aguardar 1 hora"],correct:1,expl:"Reentrada após CO2: 1) Aguardar 20-30 min. 2) Ventilar abundantemente. 3) Testar atmosfera (O2 > 19,5%). 4) ARA obrigatório. 5) Equipa mínima de 2 pessoas. 6) Vigilante exterior obrigatório. 7) Procurar eventuais pessoas aprisionadas."},
    {q:"O que é a 'ronda de incêndio' (fire patrol)?",opts:["Uma formação semanal","Inspeção regular dos espaços do navio para detetar qualquer risco de incêndio","Um exercício de evacuação","A verificação dos extintores"],correct:1,expl:"Ronda de incêndio = inspeção periódica por um marinheiro de todos os espaços (pañóis, porões, alojamentos) para detetar: início de incêndios, odores de fumo, calor anormal, equipamentos com defeito. Obrigatória segundo o plano de segurança contra incêndio do navio."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48,marginBottom:8}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.red},${C.orange})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.red},${C.orange})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
    </div>
  );
}

function Stars(){const s=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.red}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.red}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.red,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.red:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d = {
    fr:{
      badge:"🔥 Module Machine · Leçon 4/8 · ⭐ Premium · 200 XP",
      title:"Incendie, CO2 Fixe & Équipements de Sécurité",
      intro:"Le feu est l'ennemi numéro un à bord. En mer, il n'y a pas de pompiers extérieurs — l'équipage est sa propre brigade de sécurité.\n\nCette leçon couvre le triangle du feu, les classes d'incendie, le système CO2 fixe, les extincteurs et les procédures d'urgence.",
      p1:"PARTIE 1 — TRIANGLE DU FEU & CLASSES",s1t:"Combustible · Comburant · Chaleur",
      s1:"TRIANGLE DU FEU :\nCombustible + Comburant (O₂) + Chaleur\n→ Retirer UN seul = feu éteint\n\nMOYEN D'ACTION :\nRetirer combustible → isolation · vannes\nRetirer O₂ → CO2 · mousse · étouffement\nRetirer chaleur → eau · refroidissement\n\nPROPAGATION DU FEU :\nConduction : contact direct (métal chaud)\nConvection : courants d'air chaud (ventilation)\nRayonnement : ondes infrarouge sans contact",
      p2:"PARTIE 2 — CLASSES D'INCENDIE",s2t:"A·B·C·D·F — types de feux et agents extincteurs",
      s2:"CLASSES :\nA = Solides (bois, papier, plastiques) → EAU\nB = Liquides inflammables (HFO, MDO) → MOUSSE ⚠️ PAS D'EAU\nC = Électrique → CO2 · POUDRE · COUPER COURANT D'ABORD\nD = Métaux (magnésium) → POUDRE SPÉCIALE D\nF = Huiles cuisine → COUVERTURE · EXTINCTEUR F\n\n⚠️ RÈGLE ABSOLUE :\nNE JAMAIS utiliser l'eau sur un feu de classe B\nNE JAMAIS utiliser l'eau ou la mousse sur un feu de classe C sans couper le courant",
      p3:"PARTIE 3 — SYSTÈME CO2 FIXE",s3t:"5 étapes de la procédure CO2 — Simulateur",
      s3:"SYSTÈME CO2 FIXE :\nObligatoire en salle des machines (SOLAS)\nBouteilles sous pression 200+ bars\nInonde la salle en 30 secondes\nRéduit O₂ de 21% à < 15% → feu éteint\n\n⚠️ MORTEL pour toute personne présente\n\nPROCÉDURE EN 5 ÉTAPES :\n1. Détection → évacuer IMMÉDIATEMENT\n2. Compter TOUT l'équipage (CRITIQUE)\n3. Fermer ventilations + couper moteur\n4. Déclencher le CO2\n5. Attendre 20-30 min → ARA pour réentrée\n\nJAMAIS déclencher sans comptage complet !",
      p4:"PARTIE 4 — EXTINCTEURS PORTABLES",s4t:"Types · Classes · Usage correct",
      s4:"5 TYPES D'EXTINCTEURS :\nEau → Classe A uniquement\nMousse AFFF → Classes A + B (HFO, MDO)\nCO2 → Classes B + C (pas de résidu)\nPoudre ABC → Classes A + B + C (universel)\nClasse F → Cuisine uniquement\n\nAFFF = Aqueous Film Forming Foam\n→ Crée un film imperméable sur le liquide\n→ Idéal pour les feux d'hydrocarbures\n\nAlarme générale SOLAS :\n7 sons courts + 1 son long\n→ Tout le monde au poste de rassemblement",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 4 MACHINE",
      sumP:["Triangle du feu : Combustible + O₂ + Chaleur","Classe B (HFO) : mousse AFFF · JAMAIS d'eau","Classe C (électrique) : couper courant D'ABORD","CO2 fixe : 5 étapes · compter équipage = CRITIQUE","CO2 = mortel → ARA obligatoire pour réentrée","Alarme générale : 7 courts + 1 long (SOLAS)","Scandinavian Star → portes coupe-feu JAMAIS ouvertes","Rôle d'appel : connu de tous l'équipage"],
      learnedP:["Triangle feu : combustible+O₂+chaleur","Classes A·B·C·D·F et agents adaptés","CO2 fixe 5 étapes · comptage équipage critique","ARA obligatoire après CO2 · 20-30 min attente","Alarme générale 7+1 · rôle d'appel SOLAS"],
    },
    en:{
      badge:"🔥 Engine Module · Lesson 4/8 · ⭐ Premium · 200 XP",
      title:"Fire Safety, Fixed CO2 & Safety Equipment",
      intro:"Fire is the number one enemy on board. At sea, there are no external firefighters — the crew is its own safety brigade.\n\nThis lesson covers the fire triangle, fire classes, fixed CO2 system, extinguishers and emergency procedures.",
      p1:"PART 1 — FIRE TRIANGLE & CLASSES",s1t:"Fuel · Oxidizer · Heat",
      s1:"FIRE TRIANGLE:\nFuel + Oxidizer (O₂) + Heat\n→ Remove ONE = fire out\n\nACTION METHODS:\nRemove fuel → isolation · valves\nRemove O₂ → CO2 · foam · smothering\nRemove heat → water · cooling\n\nFIRE PROPAGATION:\nConduction: direct contact (hot metal)\nConvection: hot air currents (ventilation)\nRadiation: infrared waves without contact",
      p2:"PART 2 — FIRE CLASSES",s2t:"A·B·C·D·F — fire types and extinguishing agents",
      s2:"CLASSES:\nA = Solids (wood, paper, plastics) → WATER\nB = Flammable liquids (HFO, MDO) → FOAM ⚠️ NO WATER\nC = Electrical → CO2 · POWDER · CUT POWER FIRST\nD = Metals (magnesium) → SPECIAL D POWDER\nF = Cooking oils → BLANKET · CLASS F EXTINGUISHER\n\n⚠️ ABSOLUTE RULE:\nNEVER use water on Class B fire\nNEVER use water or foam on Class C without cutting power",
      p3:"PART 3 — FIXED CO2 SYSTEM",s3t:"5 steps of CO2 procedure — Simulator",
      s3:"FIXED CO2 SYSTEM:\nMandatory in engine room (SOLAS)\nBottles at 200+ bar pressure\nFloods room in 30 seconds\nReduces O₂ from 21% to < 15% → fire out\n\n⚠️ LETHAL to anyone inside\n\n5-STEP PROCEDURE:\n1. Detection → evacuate IMMEDIATELY\n2. Count ALL crew (CRITICAL)\n3. Close ventilation + shut engine\n4. Activate CO2\n5. Wait 20-30 min → SCBA for re-entry\n\nNEVER activate without full count!",
      p4:"PART 4 — PORTABLE EXTINGUISHERS",s4t:"Types · Classes · Correct use",
      s4:"5 TYPES OF EXTINGUISHERS:\nWater → Class A only\nAFFF Foam → Classes A + B (HFO, MDO)\nCO2 → Classes B + C (no residue)\nABC Powder → Classes A + B + C (universal)\nClass F → Cooking only\n\nAFFF = Aqueous Film Forming Foam\n→ Creates waterproof film on liquid\n→ Ideal for hydrocarbon fires\n\nSOLAS General Alarm:\n7 short + 1 long blast\n→ Everyone to muster station",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — ENGINE LESSON 4",
      sumP:["Fire triangle: Fuel + O₂ + Heat","Class B (HFO): AFFF foam · NEVER water","Class C (electrical): cut power FIRST","Fixed CO2: 5 steps · crew count = CRITICAL","CO2 = lethal → SCBA mandatory for re-entry","General alarm: 7 short + 1 long (SOLAS)","Scandinavian Star → fire doors NEVER held open","Muster list: known by all crew"],
      learnedP:["Fire triangle: fuel+O₂+heat","Classes A·B·C·D·F and correct agents","Fixed CO2 5 steps · crew count critical","SCBA mandatory after CO2 · wait 20-30 min","General alarm 7+1 · muster list SOLAS"],
    },
    es:{
      badge:"🔥 Módulo Máquinas · Lección 4/8 · ⭐ Premium · 200 XP",
      title:"Incendio, CO2 Fijo & Equipos de Seguridad",
      intro:"El fuego es el enemigo número uno a bordo. En el mar no hay bomberos externos — la tripulación es su propia brigada de seguridad.",
      p1:"PARTE 1 — TRIÁNGULO DEL FUEGO & CLASES",s1t:"Combustible · Comburente · Calor",
      s1:"TRIÁNGULO DEL FUEGO:\nCombustible + Comburente (O₂) + Calor\n→ Retirar UNO = fuego apagado\n\nMODOS DE PROPAGACIÓN:\nConducción · Convección · Radiación",
      p2:"PARTE 2 — CLASES DE INCENDIO",s2t:"A·B·C·D·F — tipos de fuego y agentes extinctores",
      s2:"CLASES:\nA = Sólidos → AGUA\nB = Líquidos inflamables (HFO, MDO) → ESPUMA ⚠️ NO AGUA\nC = Eléctrico → CO2 · POLVO · CORTAR CORRIENTE PRIMERO\nD = Metales → POLVO ESPECIAL D\nF = Aceites cocina → MANTA · EXTINTOR F\n\n⚠️ REGLA ABSOLUTA:\nNUNCA usar agua en fuego de clase B\nNUNCA usar agua o espuma en clase C sin cortar la corriente",
      p3:"PARTE 3 — SISTEMA CO2 FIJO",s3t:"5 pasos del procedimiento CO2 — Simulador",
      s3:"SISTEMA CO2 FIJO:\nObligatorio en sala de máquinas (SOLAS)\nReduce O₂ del 21% a < 15% → fuego apagado\n\n⚠️ MORTAL para cualquier persona dentro\n\n5 PASOS:\n1. Detección → evacuar INMEDIATAMENTE\n2. Contar TODA la tripulación (CRÍTICO)\n3. Cerrar ventilaciones + parar motor\n4. Activar CO2\n5. Esperar 20-30 min → ERA para reentrada",
      p4:"PARTE 4 — EXTINTORES PORTÁTILES",s4t:"Tipos · Clases · Uso correcto",
      s4:"5 TIPOS:\nAgua → Solo clase A\nEspuma AFFF → Clases A + B\nCO2 → Clases B + C (sin residuo)\nPolvo ABC → Clases A + B + C (universal)\nClase F → Solo cocina\n\nAlarma general SOLAS: 7 cortos + 1 largo",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 4 MÁQUINAS",
      sumP:["Triángulo fuego: Combustible + O₂ + Calor","Clase B (HFO): espuma AFFF · NUNCA agua","Clase C (eléctrico): cortar corriente PRIMERO","CO2 fijo: 5 pasos · contar tripulación = CRÍTICO","CO2 = mortal → ERA obligatorio para reentrada","Alarma general: 7 cortos + 1 largo (SOLAS)","Scandinavian Star → puertas cortafuego NUNCA abiertas"],
      learnedP:["Triángulo fuego: combustible+O₂+calor","Clases A·B·C·D·F y agentes adaptados","CO2 fijo 5 pasos · recuento tripulación crítico","ERA obligatorio tras CO2 · esperar 20-30 min","Alarma general 7+1 · cuadro de obligaciones SOLAS"],
    },
    pt:{
      badge:"🔥 Módulo Máquinas · Lição 4/8 · ⭐ Premium · 200 XP",
      title:"Incêndio, CO2 Fixo & Equipamentos de Segurança",
      intro:"O fogo é o inimigo número um a bordo. No mar não há bombeiros externos — a tripulação é a sua própria brigada de segurança.",
      p1:"PARTE 1 — TRIÂNGULO DO FOGO & CLASSES",s1t:"Combustível · Comburente · Calor",
      s1:"TRIÂNGULO DO FOGO:\nCombustível + Comburente (O₂) + Calor\n→ Remover UM = fogo apagado\n\nMODOS DE PROPAGAÇÃO:\nCondução · Convecção · Radiação",
      p2:"PARTE 2 — CLASSES DE INCÊNDIO",s2t:"A·B·C·D·F — tipos de fogo e agentes extintores",
      s2:"CLASSES:\nA = Sólidos → ÁGUA\nB = Líquidos inflamáveis (HFO, MDO) → ESPUMA ⚠️ NÃO ÁGUA\nC = Elétrico → CO2 · PÓ · CORTAR CORRENTE PRIMEIRO\nD = Metais → PÓ ESPECIAL D\nF = Óleos cozinha → COBERTURA · EXTINTOR F\n\n⚠️ REGRA ABSOLUTA:\nNUNCA usar água em fogo de classe B",
      p3:"PARTE 3 — SISTEMA CO2 FIXO",s3t:"5 passos do procedimento CO2 — Simulador",
      s3:"SISTEMA CO2 FIXO:\nObrigatório na sala de máquinas (SOLAS)\nReduz O₂ de 21% para < 15% → fogo apagado\n\n⚠️ FATAL para qualquer pessoa no interior\n\n5 PASSOS:\n1. Deteção → evacuar IMEDIATAMENTE\n2. Contar TODA a tripulação (CRÍTICO)\n3. Fechar ventilações + parar motor\n4. Ativar CO2\n5. Aguardar 20-30 min → ARA para reentrada",
      p4:"PARTE 4 — EXTINTORES PORTÁTEIS",s4t:"Tipos · Classes · Uso correto",
      s4:"5 TIPOS:\nÁgua → Apenas classe A\nEspuma AFFF → Classes A + B\nCO2 → Classes B + C (sem resíduo)\nPó ABC → Classes A + B + C (universal)\nClasse F → Apenas cozinha\n\nAlarme geral SOLAS: 7 curtos + 1 longo",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 4 MÁQUINAS",
      sumP:["Triângulo fogo: Combustível + O₂ + Calor","Classe B (HFO): espuma AFFF · NUNCA água","Classe C (elétrico): cortar corrente PRIMEIRO","CO2 fixo: 5 passos · contar tripulação = CRÍTICO","CO2 = fatal → ARA obrigatório para reentrada","Alarme geral: 7 curtos + 1 longo (SOLAS)","Scandinavian Star → portas corta-fogo NUNCA abertas"],
      learnedP:["Triângulo fogo: combustível+O₂+calor","Classes A·B·C·D·F e agentes adaptados","CO2 fixo 5 passos · contagem tripulação crítica","ARA obrigatório após CO2 · aguardar 20-30 min","Alarme geral 7+1 · quadro de obrigações SOLAS"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonIncendie({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
            <div style={{fontSize:10,color:C.red,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🔥 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/8":lang==="en"?"Lesson 4/8":lang==="es"?"Lección 4/8":"Lição 4/8"}</div>
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

            <SL icon="🔺" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔺 {lang==="fr"?"TRIANGLE DU FEU — INTERACTIF":lang==="en"?"FIRE TRIANGLE — INTERACTIVE":lang==="es"?"TRIÁNGULO DEL FUEGO — INTERACTIVO":"TRIÂNGULO DO FOGO — INTERATIVO"}</div>
              <FireTriangleSVG lang={lang}/>
            </Card>

            <SL icon="🏷️" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🏷️ {lang==="fr"?"CLASSES D'INCENDIE — INTERACTIF":lang==="en"?"FIRE CLASSES — INTERACTIVE":lang==="es"?"CLASES DE INCENDIO — INTERACTIVO":"CLASSES DE INCÊNDIO — INTERATIVO"}</div>
              <FireClassesSVG lang={lang}/>
            </Card>

            <SL icon="💨" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`,background:"linear-gradient(135deg,rgba(26,111,212,0.06),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💨 {lang==="fr"?"SYSTÈME CO2 FIXE — SIMULATEUR":lang==="en"?"FIXED CO2 SYSTEM — SIMULATOR":lang==="es"?"SISTEMA CO2 FIJO — SIMULADOR":"SISTEMA CO2 FIXO — SIMULADOR"}</div>
              <CO2SystemSVG lang={lang}/>
            </Card>

            <SL icon="🧯" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🧯 {lang==="fr"?"EXTINCTEURS — INTERACTIF":lang==="en"?"EXTINGUISHERS — INTERACTIVE":lang==="es"?"EXTINTORES — INTERACTIVO":"EXTINTORES — INTERATIVO"}</div>
              <ExtinguisherSVG lang={lang}/>
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
                {lang==="fr"?"Quiz — Incendie & CO2 Fixe":lang==="en"?"Quiz — Fire & Fixed CO2":lang==="es"?"Quiz — Incendio & CO2 Fijo":"Quiz — Incêndio & CO2 Fixo"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 4":lang==="en"?"Lesson 4":lang==="es"?"Lección 4":"Lição 4"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}55`,fontSize:14,color:C.red,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 5 — SÉCURITÉ & SAUVETAGE →":lang==="en"?"LESSON 5 — SAFETY & RESCUE →":lang==="es"?"LECCIÓN 5 — SEGURIDAD & RESCATE →":"LIÇÃO 5 — SEGURANÇA & RESGATE →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
