// @ts-nocheck
import { useState, useEffect } from "react";

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
// SVG 1 — ELECTRICAL SYSTEM + BLACKOUT
// ══════════════════════════════════════
function ElectricalSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const [blackout, setBlackout] = useState(false);
  const [emergency, setEmergency] = useState(false);

  const components = [
    { id:"gen1", x:15, y:18, w:68, h:38, color:C.orange,
      label:{fr:"GEN 1\n440V·60Hz",en:"GEN 1\n440V·60Hz",es:"GEN 1\n440V·60Hz",pt:"GEN 1\n440V·60Hz"},
      desc:{fr:"Génératrice auxiliaire diesel n°1\nMoteur 4 temps · 1000-1500 RPM\nPuissance : 500-2500 kW\nProduit 440V / 60Hz",en:"Auxiliary diesel generator n°1\n4-stroke engine · 1000-1500 RPM\nPower: 500-2500 kW\nProduces 440V / 60Hz",es:"Generador diesel auxiliar n°1\nMotor 4 tiempos · 1000-1500 RPM\nPotencia: 500-2500 kW",pt:"Gerador diesel auxiliar n°1\nMotor 4 tempos · 1000-1500 RPM\nPotência: 500-2500 kW"}},
    { id:"gen2", x:105, y:18, w:68, h:38, color:C.orange,
      label:{fr:"GEN 2\n440V·60Hz",en:"GEN 2\n440V·60Hz",es:"GEN 2\n440V·60Hz",pt:"GEN 2\n440V·60Hz"},
      desc:{fr:"Génératrice auxiliaire diesel n°2\nCouplage parallèle avec GEN1\nSi l'une tombe → l'autre prend tout\nToujours 2+ génératrices à bord",en:"Auxiliary diesel generator n°2\nParallel coupling with GEN1\nIf one fails → other takes all\nAlways 2+ generators on board",es:"Generador diesel auxiliar n°2\nAcoplamiento paralelo con GEN1\nSi uno falla → el otro toma todo",pt:"Gerador diesel auxiliar n°2\nAcoplamento paralelo com GEN1\nSe um falha → o outro toma tudo"}},
    { id:"msb", x:60, y:88, w:88, h:42, color:C.blue2,
      label:{fr:"TABLEAU PRINCIPAL\nMSB 440V",en:"MAIN SWITCHBOARD\nMSB 440V",es:"CUADRO PRINCIPAL\nMSB 440V",pt:"QUADRO PRINCIPAL\nMSB 440V"},
      desc:{fr:"Main Switchboard = cerveau électrique\nDistribue 440V à tout le navire\nTransformateurs → 220V et 24V DC\nDisjoncteurs protection par circuit\nPMS (Power Management System) intégré",en:"Main Switchboard = electrical brain\nDistributes 440V to entire vessel\nTransformers → 220V and 24V DC\nCircuit breakers per circuit\nIntegrated PMS (Power Management System)",es:"Cuadro eléctrico principal = cerebro eléctrico\nDistribuye 440V a todo el buque\nTransformadores → 220V y 24V DC",pt:"Quadro elétrico principal = cérebro elétrico\nDistribui 440V a todo o navio\nTransformadores → 220V e 24V DC"}},
    { id:"emg", x:207, y:18, w:68, h:112, color:C.red,
      label:{fr:"GROUPE\nSECOURS\n⚡SOLAS",en:"EMERGENCY\nGENERATOR\n⚡SOLAS",es:"GRUPO\nEMERGENCIA\n⚡SOLAS",pt:"GRUPO\nEMERGÊNCIA\n⚡SOLAS"},
      desc:{fr:"Démarrage AUTO en <30 secondes\nSitué AU-DESSUS ligne de flottaison\nLocal séparé de la salle des machines\nAlimente : nav · comms · pompesincendie · éclairage · GMDSS\nSOLAS : obligatoire > 300 TB\nAutonomie : 18 heures minimum",en:"AUTO start in <30 seconds\nLocated ABOVE waterline\nSeparate from engine room\nPowers: nav · comms · fire pumps · lighting · GMDSS\nSOLAS: mandatory > 300 GT\nAutonomy: minimum 18 hours",es:"Arranque AUTO en <30 segundos\nSituado ENCIMA línea de flotación\nLocal separado de sala de máquinas\nAlimenta: nav · comms · bombas contraincendios · GMDSS\nSOLAS: obligatorio > 300 TB",pt:"Arranque AUTO em <30 segundos\nSituado ACIMA linha de flutuação\nLocal separado da sala de máquinas\nAlimenta: nav · comms · bombas incêndio · GMDSS\nSOLAS: obrigatório > 300 AB"}},
    { id:"ups", x:60, y:143, w:88, h:20, color:C.purple,
      label:{fr:"UPS · 24V DC",en:"UPS · 24V DC",es:"SAI · 24V DC",pt:"UPS · 24V DC"},
      desc:{fr:"Uninterruptible Power Supply\nBatteries → alimentation sans coupure INSTANTANÉE\nAlimente : alarmes · contrôle · ECDIS secours\nAutonomie : 30 min à 1 heure\nPrise de relais immédiate si blackout",en:"Uninterruptible Power Supply\nBatteries → INSTANT no-break power\nPowers: alarms · control · backup ECDIS\nAutonomy: 30 min to 1 hour\nInstant takeover on blackout",es:"Sistema de Alimentación Ininterrumpida\nBaterías → alimentación INSTANTÁNEA sin cortes\nAlimenta: alarmas · control · ECDIS respaldo",pt:"Fonte de Alimentação Ininterrupta\nBaterias → alimentação INSTANTÂNEA\nAlimenta: alarmes · controlo · ECDIS reserva"}},
    { id:"cons", x:15, y:155, w:130, h:30, color:C.teal,
      label:{fr:"CONSOMMATEURS 440V",en:"440V CONSUMERS",es:"CONSUMIDORES 440V",pt:"CONSUMIDORES 440V"},
      desc:{fr:"Moteurs pompes · compresseurs · treuils\nPropulsion électrique (navires diesel-élec.)\nCentrales de climatisation\nLoad shedding : délestage auto si surcharge",en:"Pump motors · compressors · windlasses\nElectric propulsion (diesel-electric vessels)\nAC plants\nLoad shedding: auto disconnect on overload",es:"Motores bombas · compresores · maquinillas\nPropulsión eléctrica\nCentrales de climatización\nLoad shedding: desconexión auto si sobrecarga",pt:"Motores bombas · compressores · guindastes\nPropulsão elétrica\nCentrales de climatização"}},
  ];
  const sel_ = sel ? components.find(c=>c.id===sel) : null;

  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:8}}>
        <button onClick={()=>{setBlackout(v=>!v);if(!blackout)setEmergency(false);}} style={{flex:1,padding:"7px",borderRadius:10,fontSize:10,cursor:"pointer",fontWeight:700,background:blackout?"rgba(192,57,43,0.25)":"rgba(255,255,255,0.06)",border:`1.5px solid ${blackout?C.red:"rgba(255,255,255,0.1)"}`,color:blackout?C.red:C.muted}}>
          {blackout?(lang==="fr"?"⚡ BLACKOUT ACTIF":lang==="en"?"⚡ BLACKOUT ACTIVE":lang==="es"?"⚡ BLACKOUT ACTIVO":"⚡ BLACKOUT ATIVO"):(lang==="fr"?"💡 Simuler BLACKOUT":lang==="en"?"💡 Simulate BLACKOUT":lang==="es"?"💡 Simular BLACKOUT":"💡 Simular BLACKOUT")}
        </button>
        {blackout&&<button onClick={()=>setEmergency(v=>!v)} style={{flex:1,padding:"7px",borderRadius:10,fontSize:10,cursor:"pointer",fontWeight:700,background:emergency?"rgba(30,138,74,0.25)":"rgba(192,57,43,0.15)",border:`1.5px solid ${emergency?C.green:C.red}`,color:emergency?C.green:C.red}}>
          {emergency?(lang==="fr"?"✅ Secours ACTIF":lang==="en"?"✅ Emergency ACTIVE":lang==="es"?"✅ Emergencia ACTIVA":"✅ Emergência ATIVA"):(lang==="fr"?"🔴 Démarrer secours":lang==="en"?"🔴 Start emergency":lang==="es"?"🔴 Iniciar emergencia":"🔴 Iniciar emergência")}
        </button>}
      </div>
      <svg width="290" height="195" viewBox="0 0 290 195">
        <rect width="290" height="195" fill={blackout&&!emergency?"#020508":"#061020"} rx="8"/>
        {/* Power lines normal */}
        {!blackout&&<>
          <line x1="49" y1="56" x2="104" y2="88" stroke={C.yellow} strokeWidth="2" opacity="0.5"/>
          <line x1="139" y1="56" x2="148" y2="88" stroke={C.yellow} strokeWidth="2" opacity="0.5"/>
          <line x1="104" y1="130" x2="104" y2="143" stroke={C.purple} strokeWidth="1.5" opacity="0.5"/>
          <line x1="104" y1="140" x2="80" y2="155" stroke={C.teal} strokeWidth="1.5" opacity="0.4"/>
        </>}
        {/* Emergency line */}
        {emergency&&<>
          <line x1="207" y1="88" x2="148" y2="110" stroke={C.red} strokeWidth="2.5" strokeDasharray="5,3">
            <animate attributeName="stroke-dashoffset" values="0;-16" dur="0.6s" repeatCount="indefinite"/>
          </line>
        </>}
        {components.map(comp=>{
          const isOn = !blackout||(comp.id==="emg")||(emergency&&(comp.id==="ups"));
          return (
            <g key={comp.id} onClick={()=>setSel(sel===comp.id?null:comp.id)} style={{cursor:"pointer"}}>
              <rect x={comp.x} y={comp.y} width={comp.w} height={comp.h} rx={7}
                fill={isOn?`${comp.color}18`:"rgba(255,255,255,0.02)"}
                stroke={isOn?comp.color:"rgba(255,255,255,0.07)"}
                strokeWidth={sel===comp.id?2:1} opacity={isOn?1:0.25}/>
              {(comp.label[lang]||comp.label.fr).split('\n').map((line,li,arr)=>(
                <text key={li} x={comp.x+comp.w/2}
                  y={comp.y+comp.h/2+(li-(arr.length-1)/2)*11}
                  textAnchor="middle" fontSize="7" fill={isOn?comp.color:"rgba(255,255,255,0.2)"} fontWeight="700">{line}</text>
              ))}
              {isOn&&<circle cx={comp.x+comp.w-7} cy={comp.y+7} r={3.5} fill={comp.color} opacity="0.8">
                {(blackout&&comp.id==="emg"&&emergency)&&<animate attributeName="opacity" values="0.8;0.2;0.8" dur="0.5s" repeatCount="indefinite"/>}
              </circle>}
            </g>
          );
        })}
        <rect x="0" y="180" width="290" height="15" fill="rgba(0,0,0,0.55)"/>
        <text x="8" y="191" fontSize="6.5" fill={blackout&&!emergency?C.red:blackout&&emergency?C.orange:C.green}>
          {blackout&&!emergency
            ?(lang==="fr"?"⚠️ BLACKOUT — Démarrez le groupe de secours !":lang==="en"?"⚠️ BLACKOUT — Start the emergency generator!":lang==="es"?"⚠️ BLACKOUT — ¡Inicie el grupo de emergencia!":"⚠️ BLACKOUT — Inicie o grupo de emergência!")
            :blackout&&emergency
            ?(lang==="fr"?"🔴 SECOURS ACTIF — Nav/Comms/Incendie OK · Propulsion PERDUE":lang==="en"?"🔴 EMERGENCY — Nav/Comms/Fire OK · Propulsion LOST":lang==="es"?"🔴 EMERGENCIA — Nav/Comms/Incendio OK · Propulsión PERDIDA":"🔴 EMERGÊNCIA — Nav/Comms/Incêndio OK · Propulsão PERDIDA")
            :(lang==="fr"?"✅ Normal — GEN1+GEN2 parallèles · MSB 440V · Propulsion normale":lang==="en"?"✅ Normal — GEN1+GEN2 parallel · MSB 440V · Normal propulsion":lang==="es"?"✅ Normal — GEN1+GEN2 paralelos · MSB 440V · Propulsión normal":"✅ Normal — GEN1+GEN2 paralelos · MSB 440V · Propulsão normal")}
        </text>
      </svg>
      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line",animation:"fadeUp 0.3s ease"}}>
        <div style={{fontWeight:700,color:sel_.color,marginBottom:4}}>{(sel_.label[lang]||sel_.label.fr).replace(/\n/g,' ')}</div>
        {sel_.desc[lang]||sel_.desc.fr}
      </div>}
      {!sel_&&<div style={{textAlign:"center",fontSize:10,color:C.muted,marginTop:6}}>
        {lang==="fr"?"Touche un composant pour les détails":lang==="en"?"Tap a component for details":lang==="es"?"Toca un componente para detalles":"Toque um componente para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — AIR BOTTLES
// ══════════════════════════════════════
function AirSystemSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const bottles = [
    {id:"start",cx:55,color:C.blue2,
     label:{fr:"Air démarrage\n25-30 bars",en:"Starting air\n25-30 bar",es:"Aire arranque\n25-30 bar",pt:"Ar arranque\n25-30 bar"},
     desc:{fr:"Démarre le moteur principal\n2 bouteilles minimum (SOLAS)\nCapacité 12 démarrages total\nVolume : 1000-5000 litres\n⚠️ Toujours maintenir >80% pression",en:"Starts main engine\nMinimum 2 bottles (SOLAS)\nCapacity for 12 starts total\nVolume: 1000-5000 litres\n⚠️ Always keep above 80% pressure",es:"Arranca el motor principal\nMínimo 2 botellas (SOLAS)\nCapacidad 12 arranques\nVolumen: 1000-5000 litros\n⚠️ Mantener siempre >80% presión",pt:"Arranca o motor principal\nMínimo 2 garrafas (SOLAS)\nCapacidade 12 arranques\nVolume: 1000-5000 litros\n⚠️ Manter sempre >80% pressão"}},
    {id:"service",cx:145,color:C.teal,
     label:{fr:"Air service\n7-10 bars",en:"Service air\n7-10 bar",es:"Aire servicio\n7-10 bar",pt:"Ar serviço\n7-10 bar"},
     desc:{fr:"Nettoyage · outils pneumatiques\nSoufflage des filtres\nUsage atelier machine\nRéducteur depuis air démarrage",en:"Cleaning · pneumatic tools\nFilter blowing\nEngine room workshop\nPressure reducer from starting air",es:"Limpieza · herramientas neumáticas\nSoplado de filtros\nTaller sala de máquinas",pt:"Limpeza · ferramentas pneumáticas\nSopro de filtros\nOficina sala de máquinas"}},
    {id:"control",cx:235,color:C.gold2,
     label:{fr:"Air contrôle\n5-7 bars",en:"Control air\n5-7 bar",es:"Aire control\n5-7 bar",pt:"Ar controlo\n5-7 bar"},
     desc:{fr:"Actionne les vannes pneumatiques\nSystèmes de contrôle automatique\nDoit être propre et sec\nFiltres séparateurs d'huile obligatoires",en:"Actuates pneumatic valves\nAutomatic control systems\nMust be clean and dry\nOil separator filters mandatory",es:"Acciona válvulas neumáticas\nSistemas de control automático\nDebe estar limpio y seco",pt:"Actua válvulas pneumáticas\nSistemas de controlo automático\nDeve estar limpo e seco"}},
  ];
  const sel_=sel?bottles.find(b=>b.id===sel):null;
  return (
    <div>
      <svg width="290" height="165" viewBox="0 0 290 165">
        <rect width="290" height="165" fill="#061020" rx="8"/>
        {/* Compressor */}
        <rect x="15" y="110" width="55" height="28" rx="6" fill="rgba(230,126,34,0.15)" stroke={C.orange} strokeWidth="1"/>
        <text x="42" y="128" textAnchor="middle" fontSize="7" fill={C.orange} fontWeight="700">
          {lang==="fr"?"Comp. HP":lang==="en"?"HP Comp.":lang==="es"?"Comp. AP":"Comp. AP"}
        </text>
        <rect x="110" y="110" width="55" height="28" rx="6" fill="rgba(30,138,74,0.15)" stroke={C.green} strokeWidth="1"/>
        <text x="137" y="128" textAnchor="middle" fontSize="7" fill={C.green} fontWeight="700">
          {lang==="fr"?"Comp. BP":lang==="en"?"LP Comp.":lang==="es"?"Comp. BP":"Comp. BP"}
        </text>
        {/* Pipe */}
        <line x1="42" y1="110" x2="42" y2="80" stroke={C.blue2} strokeWidth="1.5" opacity="0.4"/>
        <line x1="42" y1="80" x2="235" y2="80" stroke={C.blue2} strokeWidth="1.5" opacity="0.3"/>
        {[55,145,235].map(x=><line key={x} x1={x} y1="80" x2={x} y2="92" stroke={C.blue2} strokeWidth="1.5" opacity="0.4"/>)}
        {/* Bottles */}
        {bottles.map(b=>(
          <g key={b.id} onClick={()=>setSel(sel===b.id?null:b.id)} style={{cursor:"pointer"}}>
            <ellipse cx={b.cx} cy={92} rx={24} ry={7} fill={`${b.color}15`} stroke={b.color} strokeWidth={sel===b.id?2:1}/>
            <rect x={b.cx-24} y={92} width={48} height={38} fill={`${b.color}10`} stroke={b.color} strokeWidth={sel===b.id?2:1}/>
            <ellipse cx={b.cx} cy={130} rx={24} ry={7} fill={`${b.color}15`} stroke={b.color} strokeWidth={sel===b.id?2:1}/>
            <circle cx={b.cx} cy={111} r={9} fill="rgba(0,0,0,0.4)" stroke={b.color} strokeWidth="0.8"/>
            <text x={b.cx} y={115} textAnchor="middle" fontSize="6" fill={b.color} fontWeight="700">bar</text>
            {(b.label[lang]||b.label.fr).split('\n').map((l,i)=>(
              <text key={i} x={b.cx} y={145+i*10} textAnchor="middle" fontSize="7" fill={b.color} fontWeight={i===0?700:400}>{l}</text>
            ))}
          </g>
        ))}
        <text x="145" y="162" textAnchor="middle" fontSize="7" fill={C.muted}>
          {lang==="fr"?"Touche une bouteille pour les détails":lang==="en"?"Tap a bottle for details":lang==="es"?"Toca una botella para detalles":"Toque uma garrafa para detalhes"}
        </text>
      </svg>
      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line",animation:"fadeUp 0.3s ease"}}>
        <div style={{fontWeight:700,color:sel_.color,marginBottom:4}}>{(sel_.label[lang]||sel_.label.fr).replace('\n',' ')}</div>
        {sel_.desc[lang]||sel_.desc.fr}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — BOILER
// ══════════════════════════════════════
function BoilerSVG({ lang }) {
  const [running, setRunning] = useState(false);
  const [pressure, setPressure] = useState(6);
  const status = pressure>9?"danger":pressure>7?"warning":"ok";
  const sc = status==="danger"?C.red:status==="warning"?C.orange:C.green;
  return (
    <div>
      <svg width="290" height="170" viewBox="0 0 290 170">
        <rect width="290" height="170" fill="#061020" rx="8"/>
        {/* Boiler */}
        <ellipse cx="100" cy="45" rx="50" ry="13" fill="rgba(141,59,43,0.2)" stroke={C.rust} strokeWidth="1.5"/>
        <rect x="50" y="45" width="100" height="80" fill="rgba(141,59,43,0.12)" stroke={C.rust} strokeWidth="1.5"/>
        <ellipse cx="100" cy="125" rx="50" ry="13" fill="rgba(141,59,43,0.2)" stroke={C.rust} strokeWidth="1.5"/>
        {/* Water */}
        <rect x="51" y="88" width="98" height="37" fill={running?"rgba(26,111,212,0.3)":"rgba(26,111,212,0.12)"} rx="2"/>
        <path d={running?"M51,88 Q75,83 100,88 Q125,93 149,88":"M51,88 Q100,86 149,88"} fill="none" stroke={C.blue2} strokeWidth="1.2">
          {running&&<animate attributeName="d" values="M51,88 Q75,83 100,88 Q125,93 149,88;M51,88 Q75,93 100,88 Q125,83 149,88;M51,88 Q75,83 100,88 Q125,93 149,88" dur="2s" repeatCount="indefinite"/>}
        </path>
        {/* Flames */}
        {running&&[68,88,108,128].map((x,i)=>(
          <g key={i}>
            <ellipse cx={x} cy={124} rx={5} ry={7} fill="rgba(255,100,0,0.4)"><animate attributeName="ry" values="7;11;7" dur={`${0.3+i*0.08}s`} repeatCount="indefinite"/></ellipse>
            <ellipse cx={x} cy={122} rx={3} ry={4} fill="rgba(255,200,0,0.6)"/>
          </g>
        ))}
        {/* Steam */}
        <rect x="88" y="24" width="24" height="21" rx="3" fill="rgba(255,255,255,0.08)" stroke={C.muted} strokeWidth="0.8"/>
        <text x="100" y="19" textAnchor="middle" fontSize="6.5" fill={C.muted}>{lang==="fr"?"Vapeur":lang==="en"?"Steam":lang==="es"?"Vapor":"Vapor"}</text>
        {running&&[0,1,2].map(i=><ellipse key={i} cx={94+i*6} cy={12-i*4} rx={4+i} ry={2.5} fill="rgba(255,255,255,0.12)"><animate attributeName="cy" values={`${12-i*4};${3-i*4};${12-i*4}`} dur={`${1+i*0.3}s`} repeatCount="indefinite"/></ellipse>)}
        {/* Gauge */}
        <circle cx="164" cy="78" r="24" fill="rgba(0,0,0,0.5)" stroke={sc} strokeWidth="2"/>
        <text x="164" y="74" textAnchor="middle" fontSize="11" fill={sc} fontWeight="800">{pressure}</text>
        <text x="164" y="86" textAnchor="middle" fontSize="6.5" fill={C.muted}>bar</text>
        {/* Uses */}
        <rect x="198" y="35" width="82" height="90" rx="8" fill="rgba(10,138,108,0.07)" stroke={C.teal} strokeWidth="1"/>
        <text x="239" y="52" textAnchor="middle" fontSize="7" fill={C.teal} fontWeight="700">{lang==="fr"?"UTILISATION":lang==="en"?"STEAM USE":lang==="es"?"USO VAPOR":"USO VAPOR"}</text>
        {[
          {fr:"→ Chauffe HFO",en:"→ HFO heating",es:"→ Calefacción HFO",pt:"→ Aquecimento HFO"},
          {fr:"→ Eau chaude",en:"→ Hot water",es:"→ Agua caliente",pt:"→ Água quente"},
          {fr:"→ HVAC navire",en:"→ Ship HVAC",es:"→ HVAC buque",pt:"→ HVAC navio"},
          {fr:"→ Purif. HFO",en:"→ HFO purif.",es:"→ Purif. HFO",pt:"→ Purif. HFO"},
          {fr:"→ Chauffage cales",en:"→ Cargo heating",es:"→ Calefacción bodegas",pt:"→ Aquecimento porões"},
        ].map((item,i)=><text key={i} x="205" y={65+i*14} fontSize="7" fill={C.teal}>{item[lang]||item.fr}</text>)}
        {running&&<line x1="148" y1="72" x2="198" y2="72" stroke={C.teal} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6"/>}
      </svg>
      <div style={{display:"flex",gap:8,alignItems:"center",marginTop:8}}>
        <button onClick={()=>setRunning(v=>!v)} style={{flex:1,padding:"9px",borderRadius:10,fontSize:11,cursor:"pointer",fontWeight:700,background:running?"rgba(192,57,43,0.2)":"rgba(141,59,43,0.2)",border:`1.5px solid ${running?C.red:C.rust}`,color:running?C.red:C.rust}}>
          {running?(lang==="fr"?"⏸ Arrêter":lang==="en"?"⏸ Stop":lang==="es"?"⏸ Parar":"⏸ Parar"):(lang==="fr"?"▶ Démarrer":lang==="en"?"▶ Start":lang==="es"?"▶ Iniciar":"▶ Iniciar")} {lang==="fr"?"chaudière":lang==="en"?"boiler":lang==="es"?"caldera":"caldeira"}
        </button>
        <div style={{flex:1}}>
          <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{lang==="fr"?"Pression:":lang==="en"?"Pressure:":lang==="es"?"Presión:":"Pressão:"} {pressure} bar</div>
          <input type="range" min={1} max={12} value={pressure} onChange={e=>setPressure(Number(e.target.value))} style={{width:"100%",accentColor:sc}}/>
        </div>
      </div>
      <div style={{marginTop:6,padding:"8px 12px",borderRadius:10,background:`${sc}12`,border:`1px solid ${sc}33`,fontSize:10,color:sc}}>
        {status==="danger"?(lang==="fr"?"⚠️ SURPRESSION — Soupape de sécurité s'ouvre !":lang==="en"?"⚠️ OVERPRESSURE — Safety valve opens!":lang==="es"?"⚠️ SOBREPRESIÓN — ¡Válvula de seguridad se abre!":"⚠️ SOBREPRESSÃO — Válvula de segurança abre-se!")
        :status==="warning"?(lang==="fr"?"⚡ Pression élevée — Surveiller":lang==="en"?"⚡ High pressure — Monitor":lang==="es"?"⚡ Presión alta — Vigilar":"⚡ Pressão alta — Vigiar")
        :(lang==="fr"?"✅ Pression normale (5-8 bars)":lang==="en"?"✅ Normal pressure (5-8 bar)":lang==="es"?"✅ Presión normal (5-8 bar)":"✅ Pressão normal (5-8 bar)")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — PUMPS
// ══════════════════════════════════════
function PumpsSVG({ lang }) {
  const [active, setActive] = useState(null);
  const pumps = [
    {id:"bilge",icon:"💧",color:C.blue2,label:{fr:"Pompe de cale",en:"Bilge pump",es:"Bomba sentina",pt:"Bomba porão"},desc:{fr:"Évacue l'eau de cale\nDébit: 50-500 m³/h · SOLAS obligatoire\n⚠️ Eau de cale = déchet MARPOL\nSéparateur 15 ppm avant rejet mer",en:"Removes bilge water\nFlow: 50-500 m³/h · SOLAS mandatory\n⚠️ Bilge water = MARPOL waste\n15 ppm separator before sea discharge",es:"Evacua agua de sentina\nCaudal: 50-500 m³/h · SOLAS obligatorio\n⚠️ Agua sentina = residuo MARPOL\nSeparador 15 ppm antes descarga",pt:"Remove água de porão\nCaudal: 50-500 m³/h · SOLAS obrigatório\n⚠️ Água porão = resíduo MARPOL\nSeparador 15 ppm antes descarga"}},
    {id:"ballast",icon:"⚖️",color:C.teal,label:{fr:"Pompe ballast",en:"Ballast pump",es:"Bomba lastre",pt:"Bomba lastro"},desc:{fr:"Remplit/vide les citernes de ballast\nContrôle tirant d'eau et stabilité\nDébit: 500-5000 m³/h\nConvention BWC 2017 → traitement obligatoire",en:"Fills/empties ballast tanks\nControls draft and stability\nFlow: 500-5000 m³/h\nBWC 2017 → mandatory treatment",es:"Llena/vacía tanques de lastre\nControla calado y estabilidad\nCaudal: 500-5000 m³/h\nBWC 2017 → tratamiento obligatorio",pt:"Enche/esvazia tanques de lastro\nControla calado e estabilidade\nCaudal: 500-5000 m³/h\nBWC 2017 → tratamento obrigatório"}},
    {id:"fire",icon:"🔥",color:C.red,label:{fr:"Pompe incendie",en:"Fire pump",es:"Bomba incendios",pt:"Bomba incêndio"},desc:{fr:"2 pompes minimum (SOLAS)\n1 alimentée par groupe de secours\nPression: 3,5-7 bars\n⚠️ Prête à démarrer en <15 secondes",en:"2 pumps minimum (SOLAS)\n1 powered by emergency generator\nPressure: 3.5-7 bar\n⚠️ Ready to start in <15 seconds",es:"2 bombas mínimo (SOLAS)\n1 alimentada por grupo emergencia\nPresión: 3,5-7 bar\n⚠️ Lista para arrancar en <15 segundos",pt:"2 bombas mínimo (SOLAS)\n1 alimentada por grupo emergência\nPressão: 3,5-7 bar\n⚠️ Pronta a arrancar em <15 segundos"}},
    {id:"fuel",icon:"⛽",color:C.orange,label:{fr:"Pompe carburant",en:"Fuel pump",es:"Bomba combustible",pt:"Bomba combustível"},desc:{fr:"Transfert HFO/MDO soutes → citernes service\nDébit: 5-50 m³/h\nFiltres doubles: 50μm puis 10μm\nChauffage HFO intégré",en:"HFO/MDO transfer bunkers → service tanks\nFlow: 5-50 m³/h\nDual filters: 50μm then 10μm\nIntegrated HFO heating",es:"Transferencia HFO/MDO bodegas → tanques servicio\nCaudal: 5-50 m³/h\nFiltros dobles: 50μm luego 10μm",pt:"Transferência HFO/MDO tanques serviço\nCaudal: 5-50 m³/h\nFiltros duplos: 50μm depois 10μm"}},
    {id:"sw",icon:"🌊",color:C.green,label:{fr:"Pompe eau de mer",en:"Sea water pump",es:"Bomba agua mar",pt:"Bomba água mar"},desc:{fr:"Alimente le circuit de refroidissement\nDébit: 200-2000 m³/h\nPrise de mer haute + basse\nFiltres tamis à entretenir régulièrement",en:"Supplies cooling circuit\nFlow: 200-2000 m³/h\nHigh + low sea chest\nStrainer filters require regular maintenance",es:"Suministra circuito de refrigeración\nCaudal: 200-2000 m³/h\nToma de mar alta + baja\nFiltros tamiz a mantener regularmente",pt:"Alimenta circuito de arrefecimento\nCaudal: 200-2000 m³/h\nTomada de mar alta + baixa\nFiltros tamiz a manter regularmente"}},
    {id:"fw",icon:"🚿",color:C.purple,label:{fr:"Eau douce + FWG",en:"Fresh water + FWG",es:"Agua dulce + GAD",pt:"Água doce + GAD"},desc:{fr:"Générateur d'eau douce (FWG)\nDessalement par évaporation sous vide\nTempérature: 25-45°C\nProduction: 5-30 tonnes/jour\nUtilise chaleur résiduelle moteur principal",en:"Fresh Water Generator (FWG)\nDesalination by vacuum evaporation\nTemperature: 25-45°C\nProduction: 5-30 tonnes/day\nUses main engine waste heat",es:"Generador de Agua Dulce (GAD)\nDesalación por evaporación al vacío\nTemperatura: 25-45°C\nProducción: 5-30 toneladas/día",pt:"Gerador de Água Doce (GAD)\nDessalinização por evaporação a vácuo\nTemperatura: 25-45°C\nProdução: 5-30 toneladas/dia"}},
  ];
  const sel_=active?pumps.find(p=>p.id===active):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:8}}>
        {pumps.map(p=>(
          <div key={p.id} onClick={()=>setActive(active===p.id?null:p.id)}
            style={{padding:"9px 5px",borderRadius:12,cursor:"pointer",textAlign:"center",background:active===p.id?`${p.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${active===p.id?p.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{p.icon}</div>
            <div style={{fontSize:9,color:active===p.id?p.color:C.muted,fontWeight:active===p.id?700:400,lineHeight:1.3}}>{p.label[lang]||p.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line",animation:"fadeUp 0.3s ease"}}><div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>{sel_.desc[lang]||sel_.desc.fr}</div>
      :<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche une pompe pour sa description":lang==="en"?"Tap a pump for its description":lang==="es"?"Toca una bomba para su descripción":"Toque uma bomba para a sua descrição"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:""});
  const [showC, setShowC] = useState(false);
  const correct={q1:"30",q2:"440",q3:"15"};
  const qs={
    fr:[
      {id:"q1",q:"Le groupe de secours doit démarrer en combien de secondes max ? (SOLAS)"},
      {id:"q2",q:"Quelle tension (en Volts) alimente les gros équipements à bord ?"},
      {id:"q3",q:"Limite MARPOL pour l'eau de cale (en ppm d'hydrocarbures) ?"},
    ],
    en:[
      {id:"q1",q:"Emergency generator must start in max how many seconds? (SOLAS)"},
      {id:"q2",q:"What voltage (in Volts) powers heavy equipment on board?"},
      {id:"q3",q:"MARPOL limit for bilge water (in ppm of hydrocarbons)?"},
    ],
    es:[
      {id:"q1",q:"¿En cuántos segundos máximo debe arrancar el grupo de emergencia? (SOLAS)"},
      {id:"q2",q:"¿Qué tensión (en Voltios) alimenta los grandes equipos a bordo?"},
      {id:"q3",q:"¿Límite MARPOL para agua de sentina (en ppm de hidrocarburos)?"},
    ],
    pt:[
      {id:"q1",q:"O grupo de emergência deve arrancar em quantos segundos máximo? (SOLAS)"},
      {id:"q2",q:"Que tensão (em Volts) alimenta os equipamentos pesados a bordo?"},
      {id:"q3",q:"Limite MARPOL para água de porão (em ppm de hidrocarbonetos)?"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>val.trim()===correct[id];
  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.orange}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : SOLAS < 30s · 440V gros équipements · 15 ppm MARPOL":lang==="en"?"💡 Reminders: SOLAS < 30s · 440V heavy equipment · 15 ppm MARPOL":lang==="es"?"💡 Recordatorios: SOLAS < 30s · 440V equipos grandes · 15 ppm MARPOL":"💡 Lembretes: SOLAS < 30s · 440V equipamentos pesados · 15 ppm MARPOL"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: 30 secondes (SOLAS − démarrage auto en <30s)\n✅ Q2: 440V (standard marine − gros équipements)\n✅ Q3: 15 ppm (MARPOL Annexe I − limite rejet eau de cale)":lang==="en"?"✅ Q1: 30 seconds (SOLAS − auto start in <30s)\n✅ Q2: 440V (marine standard − heavy equipment)\n✅ Q3: 15 ppm (MARPOL Annex I − bilge water discharge limit)":lang==="es"?"✅ Q1: 30 s · Q2: 440V · Q3: 15 ppm (MARPOL)":"✅ Q1: 30 s · Q2: 440V · Q3: 15 ppm (MARPOL)"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Blackout MV Ostedijk — Mer du Nord (2019)",teaser:"Cargo 15 000t · Blackout total · Propulsion perdue · Dérive vers les hauts-fonds",what:"Le cargo Ostedijk subit un blackout total en Mer du Nord par conditions météo difficiles. La propulsion est perdue. Le navire dérive vers des hauts-fonds. Les remorqueurs arrivent juste à temps après 2 heures de dérive.",cause:"• Surcharge électrique : démarrage simultané de plusieurs gros moteurs\n• Disjoncteurs du MSB qui sautent en cascade\n• Groupe de secours démarre mais sous-dimensionné\n• Procédure de restauration électrique non maîtrisée\n• Communication insuffisante passerelle ↔ salle des machines",lessons:"✓ Ne jamais démarrer plusieurs gros consommateurs simultanément\n✓ Procédure power restoration : circuit par circuit\n✓ Groupe de secours testé mensuellement (SOLAS)\n✓ Équipe machine formée sur les procédures de blackout\n✓ Plan de délestage (load shedding) obligatoire",link:"🔗 Lien L2 : Le blackout = urgence absolue. Surveillance du MSB, non-surcharge et maîtrise des procédures de restauration sont la clé de la prévention."},
    en:{title:"Blackout MV Ostedijk — North Sea (2019)",teaser:"15,000t cargo · Total blackout · Propulsion lost · Drifting toward shoals",what:"The cargo vessel Ostedijk suffers a total blackout in the North Sea in difficult weather. Propulsion is lost. The vessel drifts toward shoals. Tugs arrive just in time after 2 hours adrift.",cause:"• Electrical overload: simultaneous start of several large motors\n• MSB circuit breakers tripping in cascade\n• Emergency generator starts but undersized\n• Power restoration procedure not mastered by engine team\n• Insufficient bridge ↔ engine room communication",lessons:"✓ Never start multiple large consumers simultaneously\n✓ Power restoration procedure: circuit by circuit\n✓ Emergency generator tested monthly (SOLAS)\n✓ Engine team trained on blackout procedures\n✓ Load shedding plan mandatory",link:"🔗 L2 Link: Blackout = absolute emergency. MSB monitoring, no overloading and mastery of restoration procedures are key to prevention."},
    es:{title:"Blackout MV Ostedijk — Mar del Norte (2019)",teaser:"Carga 15.000t · Blackout total · Propulsión perdida · Deriva hacia bajos fondos",what:"El buque Ostedijk sufre un blackout total en el Mar del Norte. Se pierde la propulsión. El buque deriva hacia bajos fondos. Los remolcadores llegan justo a tiempo.",cause:"• Sobrecarga eléctrica: arranque simultáneo de varios motores grandes\n• Disyuntores del MSB que saltan en cascada\n• Grupo de emergencia arranca pero subdimensionado\n• Procedimiento de restauración no dominado por el equipo",lessons:"✓ Nunca arrancar varios grandes consumidores simultáneamente\n✓ Restauración de energía: circuito por circuito\n✓ Grupo de emergencia probado mensualmente (SOLAS)\n✓ Equipo de máquinas formado en procedimientos de blackout",link:"🔗 Vínculo L2: El blackout = emergencia absoluta. Vigilancia del MSB y dominio de procedimientos de restauración son clave."},
    pt:{title:"Blackout MV Ostedijk — Mar do Norte (2019)",teaser:"Carga 15.000t · Blackout total · Propulsão perdida · Deriva para baixios",what:"O navio Ostedijk sofre um blackout total no Mar do Norte. A propulsão é perdida. O navio deriva para baixios. Os rebocadores chegam a tempo.",cause:"• Sobrecarga elétrica: arranque simultâneo de vários motores grandes\n• Disjuntores do MSB que saltam em cascata\n• Grupo de emergência arranca mas subdimensionado\n• Procedimento de restauração não dominado pela equipa",lessons:"✓ Nunca arrancar vários grandes consumidores simultaneamente\n✓ Restauração de energia: circuito a circuito\n✓ Grupo de emergência testado mensalmente (SOLAS)\n✓ Equipa de máquinas formada nos procedimentos de blackout",link:"🔗 Vínculo L2: O blackout = emergência absoluta. Vigilância do MSB e domínio dos procedimentos de restauração são fundamentais."},
  };
  const c=d[lang]||d.fr;
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

console.log("Part 1 loaded");

// ══════════════════════════════════════
// QUIZ — 4 LANGUAGES
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Le groupe de secours doit démarrer en combien de temps selon SOLAS ?",opts:["5 secondes","30 secondes maximum","2 minutes","5 minutes"],correct:1,expl:"SOLAS impose un démarrage du groupe de secours en moins de 30 secondes après un blackout. Il alimente : navigation, communications, pompes incendie, éclairage de secours, GMDSS. Situé obligatoirement AU-DESSUS de la ligne de flottaison dans un local séparé de la salle des machines."},
    {q:"Quelle tension alimente les gros équipements (moteurs, compresseurs) à bord ?",opts:["12V DC","220V","440V (ou 690V sur les grands navires)","24V DC"],correct:2,expl:"440V (60Hz) est la tension standard pour les gros équipements marins. Les grands navires utilisent 690V voire 6,6 kV. Les équipements domestiques utilisent 220V via transformateur. Le 24V DC alimente les systèmes de contrôle et alarmes. L'UPS maintient le 24V DC en cas de blackout."},
    {q:"Combien de bouteilles d'air de démarrage minimum exige SOLAS ?",opts:["1 bouteille","2 bouteilles minimum — capacité 12 démarrages au total","3 bouteilles","4 bouteilles"],correct:1,expl:"SOLAS exige minimum 2 bouteilles d'air de démarrage (25-30 bars), chacune pour 6 démarrages alternés du moteur principal (12 total). Si vides en urgence = impossible de démarrer. Doivent toujours être maintenues au-dessus de 80% de pression."},
    {q:"Qu'est-ce que le load shedding (délestage) à bord ?",opts:["Déchargement de la cargaison","Déconnexion automatique des consommateurs non essentiels pour éviter un blackout","Vidange des citernes de ballast","Réduction de la vitesse du navire"],correct:1,expl:"Load shedding = délestage automatique. Quand la puissance demandée dépasse la capacité des génératrices, le PMS déconnecte automatiquement les équipements non essentiels (climatisation, certaines pompes) pour préserver les systèmes critiques et éviter un blackout total."},
    {q:"Limite MARPOL pour rejeter l'eau de cale en mer ?",opts:["0 ppm (interdit)","15 ppm (parties par million d'hydrocarbures)","100 ppm","500 ppm"],correct:1,expl:"MARPOL Annexe I : l'eau de cale est rejetable en mer uniquement si la teneur en hydrocarbures est ≤ 15 ppm (mesurée par un Oil Content Meter certifié). Interdit dans les zones spéciales. Oil Record Book obligatoire pour toutes les opérations de rejet ou transfert."},
  ],
  en:[
    {q:"How quickly must the emergency generator start according to SOLAS?",opts:["5 seconds","Maximum 30 seconds","2 minutes","5 minutes"],correct:1,expl:"SOLAS requires the emergency generator to start within 30 seconds of a blackout. It powers: navigation, communications, fire pumps, emergency lighting, GMDSS. Must be located ABOVE the waterline in a space separate from the engine room."},
    {q:"What voltage powers heavy equipment (motors, compressors) on board?",opts:["12V DC","220V","440V (or 690V on large vessels)","24V DC"],correct:2,expl:"440V (60Hz) is the standard voltage for heavy marine equipment. Large vessels use 690V or even 6.6 kV. Domestic equipment uses 220V via transformer. 24V DC powers control systems and alarms. The UPS maintains 24V DC during blackout."},
    {q:"How many starting air bottles does SOLAS require minimum?",opts:["1 bottle","2 bottles minimum — capacity for 12 starts total","3 bottles","4 bottles"],correct:1,expl:"SOLAS requires minimum 2 starting air bottles (25-30 bar), each for 6 alternating main engine starts (12 total). If empty in emergency = impossible to start. Must always be kept above 80% pressure."},
    {q:"What is load shedding on board?",opts:["Cargo unloading","Automatic disconnection of non-essential consumers to prevent blackout","Ballast tank emptying","Speed reduction"],correct:1,expl:"Load shedding = automatic load reduction. When power demand exceeds generator capacity, the PMS automatically disconnects non-essential equipment (AC, some pumps) to preserve critical systems and prevent total blackout."},
    {q:"MARPOL limit to discharge bilge water at sea?",opts:["0 ppm (prohibited)","15 ppm (parts per million of hydrocarbons)","100 ppm","500 ppm"],correct:1,expl:"MARPOL Annex I: bilge water may be discharged at sea only if hydrocarbon content ≤ 15 ppm (measured by certified Oil Content Meter). Prohibited in special areas. Oil Record Book mandatory for all discharge or transfer operations."},
  ],
  es:[
    {q:"¿En cuánto tiempo debe arrancar el grupo de emergencia según SOLAS?",opts:["5 segundos","Máximo 30 segundos","2 minutos","5 minutos"],correct:1,expl:"SOLAS exige que el grupo de emergencia arranque en menos de 30 segundos tras un blackout. Alimenta: navegación, comunicaciones, bombas contraincendios, alumbrado de emergencia, GMDSS. Situado ENCIMA de la línea de flotación en local separado de sala de máquinas."},
    {q:"¿Qué tensión alimenta los grandes equipos (motores, compresores) a bordo?",opts:["12V DC","220V","440V (o 690V en los grandes buques)","24V DC"],correct:2,expl:"440V (60Hz) es la tensión estándar para equipos marinos pesados. Los grandes buques usan 690V o incluso 6,6 kV. Los equipos domésticos usan 220V vía transformador. 24V DC alimenta sistemas de control y alarmas."},
    {q:"¿Cuántas botellas de aire de arranque exige SOLAS como mínimo?",opts:["1 botella","2 botellas mínimo — capacidad para 12 arranques en total","3 botellas","4 botellas"],correct:1,expl:"SOLAS exige mínimo 2 botellas de aire de arranque (25-30 bar), cada una para 6 arranques alternos del motor principal (12 en total). Si están vacías en emergencia = imposible arrancar. Mantener siempre por encima del 80% de presión."},
    {q:"¿Qué es el load shedding (deslastre de carga) a bordo?",opts:["Descarga de la carga","Desconexión automática de consumidores no esenciales para evitar un blackout","Vaciado de los tanques de lastre","Reducción de la velocidad"],correct:1,expl:"Load shedding = deslastre automático. Cuando la potencia demandada supera la capacidad de los generadores, el PMS desconecta automáticamente los equipos no esenciales para preservar los sistemas críticos y evitar un blackout total."},
    {q:"¿Límite MARPOL para verter agua de sentina al mar?",opts:["0 ppm (prohibido)","15 ppm (partes por millón de hidrocarburos)","100 ppm","500 ppm"],correct:1,expl:"MARPOL Anexo I: el agua de sentina puede verterse al mar solo si el contenido en hidrocarburos es ≤ 15 ppm (medido por un monitor certificado). Prohibido en zonas especiales. Libro Registro de Hidrocarburos obligatorio."},
  ],
  pt:[
    {q:"Em quanto tempo deve arrancar o grupo de emergência segundo o SOLAS?",opts:["5 segundos","Máximo 30 segundos","2 minutos","5 minutos"],correct:1,expl:"O SOLAS exige que o grupo de emergência arranque em menos de 30 segundos após um blackout. Alimenta: navegação, comunicações, bombas de incêndio, iluminação de emergência, GMDSS. Situado ACIMA da linha de flutuação num local separado da sala de máquinas."},
    {q:"Que tensão alimenta os equipamentos pesados (motores, compressores) a bordo?",opts:["12V DC","220V","440V (ou 690V nos grandes navios)","24V DC"],correct:2,expl:"440V (60Hz) é a tensão padrão para equipamentos marítimos pesados. Os grandes navios usam 690V ou mesmo 6,6 kV. Os equipamentos domésticos usam 220V via transformador. 24V DC alimenta sistemas de controlo e alarmes."},
    {q:"Quantas garrafas de ar de arranque exige o SOLAS no mínimo?",opts:["1 garrafa","2 garrafas mínimo — capacidade para 12 arranques no total","3 garrafas","4 garrafas"],correct:1,expl:"O SOLAS exige mínimo 2 garrafas de ar de arranque (25-30 bar), cada uma para 6 arranques alternos do motor principal (12 no total). Se vazias numa emergência = impossível arrancar. Manter sempre acima de 80% de pressão."},
    {q:"O que é o load shedding (deslastre de carga) a bordo?",opts:["Descarga da carga","Desconexão automática de consumidores não essenciais para evitar um blackout","Esvaziamento dos tanques de lastro","Redução da velocidade"],correct:1,expl:"Load shedding = deslastre automático. Quando a potência solicitada excede a capacidade dos geradores, o PMS desconecta automaticamente os equipamentos não essenciais para preservar os sistemas críticos e evitar um blackout total."},
    {q:"Limite MARPOL para descarregar água de porão no mar?",opts:["0 ppm (proibido)","15 ppm (partes por milhão de hidrocarbonetos)","100 ppm","500 ppm"],correct:1,expl:"MARPOL Anexo I: a água de porão pode ser descarregada no mar apenas se o teor de hidrocarbonetos for ≤ 15 ppm (medido por monitor certificado). Proibido em zonas especiais. Livro de Registo de Hidrocarbonetos obrigatório."},
  ],
};

// ══════════════════════════════════════
// BANK — 15 QUESTIONS × 4 LANGUAGES
// ══════════════════════════════════════
const BANK = {
  fr:[
    {q:"Différence entre alternateur et moteur électrique ?",opts:["Même appareil","Alternateur = produit l'électricité · Moteur = consomme l'électricité pour produire du mouvement","Alternateur = DC · Moteur = AC","Alternateur = haute tension"],correct:1,expl:"Alternateur = énergie mécanique → électrique. Moteur électrique = électrique → mécanique. À bord : moteurs diesel → alternateurs → 440V AC → consommateurs."},
    {q:"Qu'est-ce que le couplage en parallèle de deux génératrices ?",opts:["En série","Deux génératrices sur le même jeu de barres pour partager la charge","Secours mutuel","Doublement de tension"],correct:1,expl:"Couplage parallèle = deux génératrices sur le même MSB 440V. Partage la charge. Si l'une tombe → l'autre prend tout. Avant couplage : synchroniser fréquence, tension et phase."},
    {q:"Local du groupe de secours — où selon SOLAS ?",opts:["Dans la salle des machines","Au-dessus ligne de flottaison, local séparé de la salle des machines","Sur le pont principal","Dans la cale avant"],correct:1,expl:"SOLAS : local séparé et étanche, au-dessus de la ligne de flottaison. Si salle des machines inondée ou en feu → le groupe de secours doit rester opérationnel."},
    {q:"Qu'est-ce qu'un UPS à bord ?",opts:["Une balise de détresse","Alimentation sans coupure sur batterie pour systèmes critiques","Type de pompe hydraulique","Système de navigation"],correct:1,expl:"UPS = Uninterruptible Power Supply. Batterie tampon → relais INSTANTANÉ en cas de coupure. Alimente alarmes, contrôle, ECDIS secours. Autonomie 30 min à 1h."},
    {q:"Fréquence électrique standard à bord ?",opts:["50 Hz uniquement","60 Hz uniquement","50 Hz (navires européens) ou 60 Hz (internationaux)","100 Hz"],correct:2,expl:"60 Hz = standard marine international (USA, Japon). 50 Hz = certains navires européens. Attention à la connexion à quai : différence de fréquence = équipements endommagés."},
    {q:"Qu'est-ce que la chaudière gaz d'échappement (exhaust gas boiler) ?",opts:["Chaudière qui brûle les gaz","Récupérateur de chaleur des gaz d'échappement → vapeur gratuite","Chaudière de secours","Système purification gaz"],correct:1,expl:"Économiseur de chaleur. Gaz d'échappement 350-400°C → produit vapeur 5-10 bars sans carburant supplémentaire. Économie jusqu'à 15% de la consommation totale de vapeur."},
    {q:"Qu'est-ce que le Fresh Water Generator (FWG) ?",opts:["Purificateur d'eau de cale","Dessalement de l'eau de mer par évaporation sous vide (25-45°C)","Filtration eau potable","Pompe haute pression"],correct:1,expl:"FWG = dessalement par évaporation sous vide. Utilise la chaleur résiduelle du moteur principal (40-70°C). Production 5-30 tonnes/jour. Indispensable pour les longs voyages."},
    {q:"Qu'est-ce qu'un purificateur (centrifuge) HFO ?",opts:["Filtre simple","Centrifugeuse 5000-10000 RPM séparant eau et impuretés du carburant","Réchauffeur de carburant","Injecteur"],correct:1,expl:"Purificateur = centrifugeuse qui sépare : eau (plus lourd → éjectée) · impuretés · carburant propre → moteur. Vidange des boues (sludge) régulière obligatoire."},
    {q:"Qu'est-ce que le 'sludge' (boues) à bord ?",opts:["Rouille de la coque","Résidus solides des purificateurs et séparateurs d'hydrocarbures","Déchets de cuisine","Eaux de ballast"],correct:1,expl:"Sludge = boues d'hydrocarbures issues des purificateurs, centrifugeuses, séparateurs. Stockées dans le sludge tank. Déchargement obligatoire à terre (port reception facilities). Interdit de rejeter en mer ou brûler. Oil Record Book obligatoire."},
    {q:"Qu'est-ce que la station d'épuration (sewage treatment plant) ?",opts:["Pompe de cale","Traitement des eaux usées (toilettes, lavabos) avant rejet en mer","Purificateur carburant","Traitement eau potable"],correct:1,expl:"MARPOL Annexe IV : interdit de rejeter les eaux usées non traitées à < 12 milles des côtes. Station traite biologiquement les eaux noires (toilettes) et grises (lavabos, douches). Boues → déchargées à terre."},
    {q:"Différence pompe centrifuge vs pompe volumétrique ?",opts:["Même principe, tailles différentes","Centrifuge = fort débit/pression modérée (eau) · Volumétrique = débit précis/haute pression (huile, carburant)","Centrifuge = huile uniquement","Centrifuge = électrique"],correct:1,expl:"Centrifuge : grande roue → fort débit, pression modérée → idéale eau de mer, ballasts. Volumétrique (engrenages, vis, pistons) : débit précis, haute pression → idéale huile, carburant, hydraulique."},
    {q:"Pourquoi local du groupe de secours séparé de la salle des machines ?",opts:["Pour le bruit","Si salle des machines en feu → CO2 déclenché → le groupe de secours doit rester accessible","Pour la maintenance","Réglementation classement locaux"],correct:1,expl:"Si salle des machines en feu → CO2 (ou eau de mer) noie tout. Le groupe de secours doit continuer à fonctionner pour : évacuation, communications, pompes incendie, éclairage de secours."},
    {q:"Qu'est-ce que le PMS (Power Management System) ?",opts:["Simple interrupteur principal","Système automatique gérant production et distribution électrique, couplage génératrices, load shedding, démarrage groupe secours","Tableau électrique principal","Système navigation"],correct:1,expl:"PMS = cerveau électrique du navire. Surveille consommation totale, couple/découple les génératrices automatiquement, effectue le load shedding si surcharge, déclenche le groupe de secours en cas de blackout."},
    {q:"Qu'est-ce que la Convention sur les eaux de ballast (BWC 2017) ?",opts:["Convention sur les émissions de CO2","Obligation de traiter les eaux de ballast avant rejet pour éviter l'introduction d'espèces invasives","Réglementation sur les eaux de cale","Convention sur les eaux usées"],correct:1,expl:"BWC 2017 (Ballast Water Convention) : les navires doivent traiter les eaux de ballast avant rejet en mer pour éviter la propagation d'espèces invasives (organismes aquatiques). Système de traitement BWM obligatoire à bord."},
    {q:"Qu'est-ce que synchroniser deux génératrices avant couplage parallèle ?",opts:["Les rendre de même taille","Égaliser fréquence, tension et angle de phase avant fermeture du disjoncteur de couplage","Les brancher en série","Les démarrer simultanément"],correct:1,expl:"Synchronisation = fréquence (60 Hz ±0,1 Hz), tension (440V ±5%) et phase égaux avant fermeture du coupleur. Si non synchronisé : fort courant de choc → disjoncteurs sautent → blackout possible. Les navires modernes utilisent des synchroniseurs automatiques."},
  ],
  en:[
    {q:"Difference between alternator and electric motor?",opts:["Same device","Alternator = produces electricity · Motor = consumes electricity to produce movement","Alternator = DC · Motor = AC","Alternator = high voltage"],correct:1,expl:"Alternator = mechanical energy → electrical. Electric motor = electrical → mechanical. On board: diesel engines → alternators → 440V AC → consumers."},
    {q:"What is parallel coupling of two generators?",opts:["In series","Two generators on the same busbar to share electrical load","Mutual backup","Voltage doubling"],correct:1,expl:"Parallel coupling = two generators on the same MSB 440V busbar. They share the load. If one fails → other takes all. Before coupling: synchronize frequency, voltage and phase."},
    {q:"Emergency generator room location per SOLAS?",opts:["In the engine room","Above waterline, in a space separate from engine room","On main deck","In fore hold"],correct:1,expl:"SOLAS: separate sealed space above waterline. If engine room flooded or on fire → emergency generator must remain operational."},
    {q:"What is a UPS on board?",opts:["A distress beacon","Battery-backed uninterruptible power supply for critical systems","Type of hydraulic pump","Navigation system"],correct:1,expl:"UPS = Uninterruptible Power Supply. Buffer battery → INSTANT takeover on power failure. Powers alarms, control, backup ECDIS. Autonomy 30 min to 1h."},
    {q:"Standard electrical frequency on board?",opts:["50 Hz only","60 Hz only","50 Hz (European vessels) or 60 Hz (international)","100 Hz"],correct:2,expl:"60 Hz = international marine standard (USA, Japan). 50 Hz = some European vessels. Caution connecting shore power: frequency difference = damaged equipment."},
    {q:"What is an exhaust gas boiler?",opts:["A boiler burning exhaust gases","Heat recovery from main engine exhaust gases → free steam","Backup boiler","Gas purification system"],correct:1,expl:"Heat economizer. Exhaust gases 350-400°C → produces steam 5-10 bar without extra fuel. Saves up to 15% of total steam consumption."},
    {q:"What is a Fresh Water Generator (FWG)?",opts:["Bilge water purifier","Sea water desalination by vacuum evaporation (25-45°C)","Potable water filtration","High pressure pump"],correct:1,expl:"FWG = desalination by vacuum evaporation. Uses main engine waste heat (40-70°C). Production 5-30 tonnes/day. Essential for long voyages."},
    {q:"What is an HFO purifier (centrifuge)?",opts:["Simple filter","5000-10000 RPM centrifuge separating water and impurities from fuel","Fuel heater","Fuel injector"],correct:1,expl:"Purifier = centrifuge separating: water (heavier → ejected) · impurities · clean fuel → engine. Regular sludge removal mandatory."},
    {q:"What is 'sludge' on board?",opts:["Hull rust","Solid residues from hydrocarbon purifiers and separators","Kitchen waste","Ballast water"],correct:1,expl:"Sludge = hydrocarbon residues from purifiers, centrifuges, separators. Stored in sludge tank. Mandatory shore discharge. Prohibited to discharge at sea or burn. Oil Record Book mandatory."},
    {q:"What is the sewage treatment plant?",opts:["Bilge pump","Treatment of wastewater (toilets, sinks) before sea discharge","Fuel purifier","Potable water treatment"],correct:1,expl:"MARPOL Annex IV: prohibits discharging untreated sewage within 12 miles of coast. Plant biologically treats black water (toilets) and grey water (sinks, showers). Sludge → discharged ashore."},
    {q:"Difference between centrifugal and positive displacement pump?",opts:["Same principle, different sizes","Centrifugal = high flow/moderate pressure (water) · PD = precise flow/high pressure (oil, fuel)","Centrifugal = oil only","Centrifugal = electric"],correct:1,expl:"Centrifugal: large impeller → high flow, moderate pressure → ideal sea water, ballasts. Positive displacement (gears, screws, pistons): precise flow, high pressure → ideal oil, fuel, hydraulics."},
    {q:"Why is emergency generator room separate from engine room?",opts:["For noise","If engine room on fire → CO2 released → emergency generator must remain accessible","For maintenance","Regulatory classification"],correct:1,expl:"If engine room on fire → CO2 smothers everything. Emergency generator must continue operating for: evacuation, communications, fire pumps, emergency lighting."},
    {q:"What is a PMS (Power Management System)?",opts:["Simple master switch","Automatic system managing electrical production and distribution, generator coupling, load shedding, emergency start","Main switchboard","Navigation system"],correct:1,expl:"PMS = electrical brain of the vessel. Monitors total consumption, auto couples/uncouples generators, performs load shedding on overload, triggers emergency generator on blackout."},
    {q:"What is the Ballast Water Convention (BWC 2017)?",opts:["CO2 emission convention","Obligation to treat ballast water before discharge to prevent invasive species","Bilge water regulation","Wastewater convention"],correct:1,expl:"BWC 2017: vessels must treat ballast water before sea discharge to prevent spread of invasive aquatic species. Ballast Water Management (BWM) system mandatory on board."},
    {q:"What does synchronizing two generators before parallel coupling mean?",opts:["Making them same size","Matching frequency, voltage and phase angle before closing the coupling breaker","Connecting them in series","Starting them simultaneously"],correct:1,expl:"Synchronization = frequency (60 Hz ±0.1 Hz), voltage (440V ±5%) and phase matched before closing coupler. If not synchronized: large current surge → breakers trip → potential blackout. Modern vessels use automatic synchronizers."},
  ],
  es:[
    {q:"¿Diferencia entre alternador y motor eléctrico?",opts:["El mismo aparato","Alternador = produce electricidad · Motor = consume electricidad para producir movimiento","Alternador = CC · Motor = CA","Alternador = alta tensión"],correct:1,expl:"Alternador = energía mecánica → eléctrica. Motor eléctrico = eléctrica → mecánica. A bordo: motores diesel → alternadores → 440V CA → consumidores."},
    {q:"¿Qué es el acoplamiento en paralelo de dos generadores?",opts:["En serie","Dos generadores en el mismo conjunto de barras para compartir la carga","Respaldo mutuo","Doble tensión"],correct:1,expl:"Acoplamiento paralelo = dos generadores en el mismo MSB 440V. Comparten la carga. Si uno falla → el otro toma todo. Antes: sincronizar frecuencia, tensión y fase."},
    {q:"¿Local del grupo de emergencia según SOLAS?",opts:["En la sala de máquinas","Encima línea de flotación, local separado de sala de máquinas","En cubierta principal","En bodega de proa"],correct:1,expl:"SOLAS: local separado y estanco, encima de la línea de flotación. Si sala de máquinas inundada o en llamas → el grupo de emergencia debe permanecer operativo."},
    {q:"¿Qué es un SAI/UPS a bordo?",opts:["Baliza de socorro","Alimentación ininterrumpida por baterías para sistemas críticos","Tipo de bomba hidráulica","Sistema de navegación"],correct:1,expl:"UPS = Alimentación Ininterrumpida. Batería tampón → relevo INSTANTÁNEO en corte. Alimenta alarmas, control, ECDIS respaldo. Autonomía 30 min a 1h."},
    {q:"¿Frecuencia eléctrica estándar a bordo?",opts:["50 Hz únicamente","60 Hz únicamente","50 Hz (buques europeos) o 60 Hz (internacionales)","100 Hz"],correct:2,expl:"60 Hz = estándar marino internacional (EE.UU., Japón). 50 Hz = algunos buques europeos. Atención conexión muelle: diferencia de frecuencia = equipos dañados."},
    {q:"¿Qué es la caldera de gases de escape?",opts:["Caldera que quema los gases","Recuperador de calor de los gases de escape → vapor gratuito","Caldera de respaldo","Purificación de gases"],correct:1,expl:"Economizador de calor. Gases de escape 350-400°C → vapor 5-10 bar sin combustible extra. Ahorro hasta 15% del consumo total de vapor."},
    {q:"¿Qué es el Generador de Agua Dulce (GAD)?",opts:["Purificador agua sentina","Desalación del agua de mar por evaporación al vacío (25-45°C)","Filtración agua potable","Bomba alta presión"],correct:1,expl:"GAD = desalación por evaporación al vacío. Usa el calor residual del motor principal. Producción 5-30 toneladas/día. Indispensable para travesías largas."},
    {q:"¿Qué es un purificador (centrífuga) HFO?",opts:["Filtro simple","Centrífuga 5000-10000 RPM que separa agua e impurezas del combustible","Calentador de combustible","Inyector"],correct:1,expl:"Purificador = centrífuga que separa: agua (más pesada → expulsada) · impurezas · combustible limpio → motor. Vaciado regular de lodos obligatorio."},
    {q:"¿Qué son los 'sludges' (lodos) a bordo?",opts:["Herrumbre del casco","Residuos sólidos de purificadores y separadores de hidrocarburos","Residuos de cocina","Aguas de lastre"],correct:1,expl:"Sludge = lodos de hidrocarburos de purificadores, centrífugas, separadores. Almacenados en tanque de lodos. Descarga obligatoria en tierra. Prohibido verter al mar o quemar. Libro Registro de Hidrocarburos obligatorio."},
    {q:"¿Qué es la planta de tratamiento de aguas residuales?",opts:["Bomba de sentina","Tratamiento de aguas residuales (aseos, lavabos) antes del vertido al mar","Purificador combustible","Tratamiento agua potable"],correct:1,expl:"MARPOL Anexo IV: prohibido verter aguas residuales sin tratar a < 12 millas de la costa. Planta trata biológicamente aguas negras (aseos) y grises (lavabos, duchas). Lodos → descargados en tierra."},
    {q:"¿Diferencia bomba centrífuga vs volumétrica?",opts:["Mismo principio","Centrífuga = alto caudal/presión moderada (agua) · Volumétrica = caudal preciso/alta presión (aceite, combustible)","Centrífuga = solo aceite","Centrífuga = eléctrica"],correct:1,expl:"Centrífuga: gran rodete → alto caudal, presión moderada → ideal agua de mar, lastres. Volumétrica (engranajes, tornillos, pistones): caudal preciso, alta presión → ideal aceite, combustible, hidráulica."},
    {q:"¿Por qué el local del grupo emergencia está separado de sala de máquinas?",opts:["Por el ruido","Si sala de máquinas en llamas → CO2 activado → grupo emergencia debe permanecer accesible","Para mantenimiento","Reglamentación"],correct:1,expl:"Si sala de máquinas en llamas → CO2 asfixia todo. El grupo de emergencia debe seguir funcionando para: evacuación, comunicaciones, bombas contraincendios, alumbrado emergencia."},
    {q:"¿Qué es el PMS (Sistema de Gestión de Energía)?",opts:["Simple interruptor principal","Sistema automático que gestiona producción y distribución eléctrica, acoplamiento generadores, load shedding, arranque emergencia","Cuadro eléctrico principal","Sistema de navegación"],correct:1,expl:"PMS = cerebro eléctrico del buque. Vigila consumo total, acopla/desacopla generadores automáticamente, realiza load shedding, activa el arranque del grupo de emergencia en blackout."},
    {q:"¿Qué es el Convenio de Aguas de Lastre (BWC 2017)?",opts:["Convenio emisiones CO2","Obligación de tratar las aguas de lastre antes del vertido para evitar especies invasoras","Regulación aguas sentina","Convenio aguas residuales"],correct:1,expl:"BWC 2017: los buques deben tratar las aguas de lastre antes del vertido al mar para evitar la propagación de especies acuáticas invasoras. Sistema BWM obligatorio a bordo."},
    {q:"¿Qué significa sincronizar dos generadores antes del acoplamiento paralelo?",opts:["Hacerlos del mismo tamaño","Igualar frecuencia, tensión y ángulo de fase antes de cerrar el disyuntor de acoplamiento","Conectarlos en serie","Arrancarlos simultáneamente"],correct:1,expl:"Sincronización = frecuencia (60 Hz ±0,1 Hz), tensión (440V ±5%) y fase iguales antes de cerrar el acoplador. Si no están sincronizados: gran corriente de choque → disyuntores saltan → posible blackout."},
  ],
  pt:[
    {q:"Diferença entre alternador e motor elétrico?",opts:["O mesmo aparelho","Alternador = produz eletricidade · Motor = consome eletricidade para produzir movimento","Alternador = CC · Motor = CA","Alternador = alta tensão"],correct:1,expl:"Alternador = energia mecânica → elétrica. Motor elétrico = elétrica → mecânica. A bordo: motores diesel → alternadores → 440V CA → consumidores."},
    {q:"O que é o acoplamento em paralelo de dois geradores?",opts:["Em série","Dois geradores no mesmo conjunto de barras para partilhar a carga","Reserva mútua","Duplicação de tensão"],correct:1,expl:"Acoplamento paralelo = dois geradores no mesmo MSB 440V. Partilham a carga. Se um falha → o outro toma tudo. Antes: sincronizar frequência, tensão e fase."},
    {q:"Localização do grupo de emergência segundo o SOLAS?",opts:["Na sala de máquinas","Acima da linha de flutuação, local separado da sala de máquinas","No convés principal","No porão de proa"],correct:1,expl:"SOLAS: local separado e estanque, acima da linha de flutuação. Se sala de máquinas inundada ou em chamas → grupo de emergência deve permanecer operacional."},
    {q:"O que é um UPS a bordo?",opts:["Uma baliza de socorro","Alimentação ininterrupta por baterias para sistemas críticos","Tipo de bomba hidráulica","Sistema de navegação"],correct:1,expl:"UPS = Fonte de Alimentação Ininterrupta. Bateria tampão → assumo INSTANTÂNEO em falha. Alimenta alarmes, controlo, ECDIS reserva. Autonomia 30 min a 1h."},
    {q:"Frequência elétrica padrão a bordo?",opts:["50 Hz apenas","60 Hz apenas","50 Hz (navios europeus) ou 60 Hz (internacionais)","100 Hz"],correct:2,expl:"60 Hz = padrão marítimo internacional (EUA, Japão). 50 Hz = alguns navios europeus. Atenção ligação cais: diferença de frequência = equipamentos danificados."},
    {q:"O que é uma caldeira de gases de escape?",opts:["Caldeira que queima os gases","Recuperador de calor dos gases de escape → vapor gratuito","Caldeira de reserva","Purificação de gases"],correct:1,expl:"Economizador de calor. Gases de escape 350-400°C → vapor 5-10 bar sem combustível extra. Poupança até 15% do consumo total de vapor."},
    {q:"O que é um Gerador de Água Doce (GAD)?",opts:["Purificador de água de porão","Dessalinização da água do mar por evaporação a vácuo (25-45°C)","Filtração de água potável","Bomba de alta pressão"],correct:1,expl:"GAD = dessalinização por evaporação a vácuo. Usa o calor residual do motor principal. Produção 5-30 toneladas/dia. Indispensável para viagens longas."},
    {q:"O que é um purificador (centrífuga) HFO?",opts:["Filtro simples","Centrífuga 5000-10000 RPM que separa água e impurezas do combustível","Aquecedor de combustível","Injetor"],correct:1,expl:"Purificador = centrífuga que separa: água (mais pesada → ejetada) · impurezas · combustível limpo → motor. Remoção regular de lamas obrigatória."},
    {q:"O que são 'sludges' (lamas) a bordo?",opts:["Ferrugem do casco","Resíduos sólidos dos purificadores e separadores de hidrocarbonetos","Resíduos de cozinha","Águas de lastro"],correct:1,expl:"Sludge = lamas de hidrocarbonetos dos purificadores, centrífugas, separadores. Armazenadas no tanque de lamas. Descarga obrigatória em terra. Proibido descarregar no mar ou queimar. Livro de Registo obrigatório."},
    {q:"O que é a estação de tratamento de águas residuais?",opts:["Bomba de porão","Tratamento de águas residuais (casas de banho, lavatórios) antes da descarga no mar","Purificador de combustível","Tratamento de água potável"],correct:1,expl:"MARPOL Anexo IV: proibido descarregar águas residuais não tratadas a < 12 milhas da costa. Estação trata biologicamente águas negras (casas de banho) e cinzentas (lavatórios, duches). Lamas → descarregadas em terra."},
    {q:"Diferença bomba centrífuga vs volumétrica?",opts:["Mesmo princípio","Centrífuga = alto caudal/pressão moderada (água) · Volumétrica = caudal preciso/alta pressão (óleo, combustível)","Centrífuga = óleo apenas","Centrífuga = elétrica"],correct:1,expl:"Centrífuga: grande rotor → alto caudal, pressão moderada → ideal água do mar, lastros. Volumétrica (engrenagens, parafusos, pistões): caudal preciso, alta pressão → ideal óleo, combustível, hidráulica."},
    {q:"Por que o local do grupo de emergência está separado da sala de máquinas?",opts:["Para o ruído","Se sala de máquinas em chamas → CO2 ativado → grupo emergência deve permanecer acessível","Para manutenção","Regulamentação"],correct:1,expl:"Se sala de máquinas em chamas → CO2 asfixia tudo. O grupo de emergência deve continuar a funcionar para: evacuação, comunicações, bombas de incêndio, iluminação de emergência."},
    {q:"O que é um PMS (Sistema de Gestão de Energia)?",opts:["Simples interruptor principal","Sistema automático que gere produção e distribuição elétrica, acoplamento geradores, load shedding, arranque emergência","Quadro elétrico principal","Sistema de navegação"],correct:1,expl:"PMS = cérebro elétrico do navio. Monitoriza consumo total, acopla/desacopla geradores automaticamente, realiza load shedding, ativa o arranque do grupo de emergência em blackout."},
    {q:"O que é a Convenção sobre Águas de Lastro (BWC 2017)?",opts:["Convenção emissões CO2","Obrigação de tratar as águas de lastro antes da descarga para evitar espécies invasoras","Regulamentação águas de porão","Convenção águas residuais"],correct:1,expl:"BWC 2017: os navios devem tratar as águas de lastro antes da descarga no mar para evitar a propagação de espécies aquáticas invasoras. Sistema BWM obrigatório a bordo."},
    {q:"O que significa sincronizar dois geradores antes do acoplamento paralelo?",opts:["Torná-los do mesmo tamanho","Igualar frequência, tensão e ângulo de fase antes de fechar o disjuntor de acoplamento","Ligá-los em série","Arrancá-los simultaneamente"],correct:1,expl:"Sincronização = frequência (60 Hz ±0,1 Hz), tensão (440V ±5%) e fase iguais antes de fechar o acoplador. Se não sincronizados: grande corrente de choque → disjuntores saltam → possível blackout."},
  ],
};

// ══════════════════════════════════════
// BANK COMPONENT
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48,marginBottom:8}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.blue2},${C.orange})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.blue2},${C.orange})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
    </div>
  );
}

// ══════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════
function Stars(){const s=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.orange})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"⚙️ Module Machine · Leçon 2/8 · ⭐ Premium · 200 XP",
      title:"Auxiliaires, Électricité & Groupe de Secours",
      intro:"Un navire sans moteur principal peut encore dériver vers un port. Un navire sans électricité est aveugle, sourd et sans défense.\n\nCette leçon couvre le système électrique, le groupe de secours SOLAS, les chaudières, les bouteilles d'air et toutes les pompes essentielles.",
      p1:"PARTIE 1 — SYSTÈME ÉLECTRIQUE & BLACKOUT",s1t:"Génératrices, MSB, groupe de secours, UPS",
      s1:"GÉNÉRATRICES AUXILIAIRES :\nMoteurs diesel 4 temps · 1000-1500 RPM\nProduisent 440V / 60Hz\nToujours 2+ à bord (SOLAS)\nCouplage en parallèle = partage de charge\n\nMAIN SWITCHBOARD (MSB) :\nDistribue 440V à tout le navire\nTransformateurs → 220V et 24V DC\nPMS intégré (Power Management System)\nDisjoncteurs de protection par circuit\n\nGROUPE DE SECOURS (SOLAS) :\nDémarrage AUTO en <30 secondes\nSitué AU-DESSUS de la ligne de flottaison\nLocal SÉPARÉ de la salle des machines\nAlimente : nav · comms · pompesincendie · éclairage · GMDSS\nAutonomie : 18 heures minimum\n\nUPS (Uninterruptible Power Supply) :\nBatteries tampons → relais INSTANTANÉ\nAlimente alarmes · contrôle · ECDIS secours\nAutonomie : 30 min à 1 heure",
      p2:"PARTIE 2 — BOUTEILLES D'AIR",s2t:"Air démarrage · Service · Contrôle",
      s2:"AIR DÉMARRAGE (25-30 bars) :\nSeule méthode pour démarrer le moteur principal\n2 bouteilles minimum (SOLAS)\nCapacité : 12 démarrages totaux\n⚠️ Toujours maintenir >80% de pression\n\nAIR SERVICE (7-10 bars) :\nNettoyage · outils pneumatiques\nSoufflage des filtres · atelier machine\n\nAIR CONTRÔLE/INSTRUMENT (5-7 bars) :\nActionne les vannes pneumatiques\nSystèmes de contrôle automatiques\nDoit être propre, sec et sans huile",
      p3:"PARTIE 3 — CHAUDIÈRE & VAPEUR",s3t:"Production de vapeur pour le navire",
      s3:"CHAUDIÈRE AUXILIAIRE :\nProduit de la vapeur (5-10 bars)\nFuel oil ou récupération gaz d'échappement\n\nUSAGES DE LA VAPEUR :\n→ Chauffage HFO (120-150°C) avant injection\n→ Eau chaude sanitaire\n→ Chauffage HVAC du navire\n→ Purification HFO (préchauffage purificateurs)\n→ Chauffage des cales (cargaisons sensibles)\n\nCHAUDIÈRE GAZ D'ÉCHAPPEMENT :\nRécupère chaleur gaz d'échappement (350-400°C)\n→ Vapeur GRATUITE (pas de carburant supplémentaire)\nÉconomie : jusqu'à 15% de la vapeur totale",
      p4:"PARTIE 4 — POMPES ESSENTIELLES",s4t:"Les 6 pompes à connaître",
      s4:"POMPE DE CALE : évacue l'eau d'infiltration\n→ Eau de cale = DÉCHET MARPOL (15 ppm max)\n\nPOMPE BALLAST : contrôle tirant d'eau et stabilité\n→ BWC 2017 : traitement des eaux de ballast\n\nPOMPE INCENDIE : 2 minimum (SOLAS)\n→ 1 alimentée par groupe de secours\n→ Prête en <15 secondes\n\nPOMPE CARBURANT : transfert HFO/MDO\n→ Filtres doubles + chauffage HFO\n\nPOMPE EAU DE MER : refroidissement\n→ Filtres tamis à entretenir régulièrement\n\nFRESH WATER GENERATOR (FWG) :\n→ Dessalement eau de mer (25-45°C, sous vide)\n→ 5-30 tonnes d'eau douce/jour",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 2 MACHINE",
      sumP:["Groupe secours : <30s · AU-DESSUS flottaison · local séparé · 18h autonomie","440V gros équipements · 220V domestique · 24V DC contrôle","UPS = relais instantané batteries si blackout","MSB + PMS = distribution et gestion électrique automatique","Air démarrage : 25-30 bars · 2 bouteilles SOLAS · 12 démarrages","Chaudière gaz échappement = vapeur GRATUITE","6 pompes : cale · ballast · incendie · carburant · eau de mer · FWG","Eau de cale MARPOL 15 ppm · Ballast BWC 2017"],
      learnedP:["Groupe secours <30s · AU-DESSUS flottaison · 18h","440V · 220V · 24V DC · UPS instantané","MSB + PMS gestion électrique","Air démarrage 25-30 bars · 2 bouteilles SOLAS","Chaudière gaz échappement · vapeur gratuite","6 pompes essentielles · MARPOL 15 ppm · BWC 2017"],
    },
    en:{
      badge:"⚙️ Engine Module · Lesson 2/8 · ⭐ Premium · 200 XP",
      title:"Auxiliaries, Electricity & Emergency Generator",
      intro:"A vessel without main engine can still drift to port. A vessel without electricity is blind, deaf and defenceless.\n\nThis lesson covers the electrical system, the SOLAS emergency generator, boilers, air bottles and all essential pumps.",
      p1:"PART 1 — ELECTRICAL SYSTEM & BLACKOUT",s1t:"Generators, MSB, emergency generator, UPS",
      s1:"AUXILIARY GENERATORS:\n4-stroke diesel engines · 1000-1500 RPM\nProduce 440V / 60Hz\nAlways 2+ on board (SOLAS)\nParallel coupling = load sharing\n\nMAIN SWITCHBOARD (MSB):\nDistributes 440V to entire vessel\nTransformers → 220V and 24V DC\nIntegrated PMS (Power Management System)\nCircuit breakers per circuit\n\nEMERGENCY GENERATOR (SOLAS):\nAUTO start in <30 seconds\nLocated ABOVE waterline\nSEPARATE space from engine room\nPowers: nav · comms · fire pumps · lighting · GMDSS\nAutonomy: minimum 18 hours\n\nUPS (Uninterruptible Power Supply):\nBuffer batteries → INSTANT takeover\nPowers alarms · control · backup ECDIS\nAutonomy: 30 min to 1 hour",
      p2:"PART 2 — AIR BOTTLES",s2t:"Starting air · Service · Control",
      s2:"STARTING AIR (25-30 bar):\nOnly method to start main engine\nMinimum 2 bottles (SOLAS)\nCapacity: 12 starts total\n⚠️ Always keep above 80% pressure\n\nSERVICE AIR (7-10 bar):\nCleaning · pneumatic tools\nFilter blowing · engine room workshop\n\nCONTROL/INSTRUMENT AIR (5-7 bar):\nActuates pneumatic valves\nAutomatic control systems\nMust be clean, dry and oil-free",
      p3:"PART 3 — BOILER & STEAM",s3t:"Steam production for the vessel",
      s3:"AUXILIARY BOILER:\nProduces steam (5-10 bar)\nFuel oil or exhaust gas recovery\n\nSTEAM USES:\n→ HFO heating (120-150°C) before injection\n→ Domestic hot water\n→ Ship HVAC heating\n→ HFO purification (purifier preheating)\n→ Cargo hold heating (sensitive cargo)\n\nEXHAUST GAS BOILER:\nRecovers exhaust gas heat (350-400°C)\n→ FREE steam (no extra fuel)\nSavings: up to 15% of total steam",
      p4:"PART 4 — ESSENTIAL PUMPS",s4t:"The 6 pumps to know",
      s4:"BILGE PUMP: removes infiltration water\n→ Bilge water = MARPOL WASTE (15 ppm max)\n\nBALLAST PUMP: controls draft and stability\n→ BWC 2017: ballast water treatment\n\nFIRE PUMP: 2 minimum (SOLAS)\n→ 1 powered by emergency generator\n→ Ready in <15 seconds\n\nFUEL PUMP: HFO/MDO transfer\n→ Dual filters + HFO heating\n\nSEA WATER PUMP: cooling\n→ Strainer filters need regular maintenance\n\nFRESH WATER GENERATOR (FWG):\n→ Sea water desalination (25-45°C, vacuum)\n→ 5-30 tonnes fresh water/day",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — ENGINE LESSON 2",
      sumP:["Emergency gen: <30s · ABOVE waterline · separate room · 18h autonomy","440V heavy equipment · 220V domestic · 24V DC control","UPS = instant battery takeover on blackout","MSB + PMS = automatic electrical management","Starting air: 25-30 bar · 2 SOLAS bottles · 12 starts","Exhaust gas boiler = FREE steam","6 pumps: bilge · ballast · fire · fuel · sea water · FWG","Bilge water MARPOL 15 ppm · Ballast BWC 2017"],
      learnedP:["Emergency gen <30s · ABOVE waterline · 18h","440V · 220V · 24V DC · instant UPS","MSB + PMS electrical management","Starting air 25-30 bar · 2 SOLAS bottles","Exhaust gas boiler · free steam","6 essential pumps · MARPOL 15 ppm · BWC 2017"],
    },
    es:{
      badge:"⚙️ Módulo Máquinas · Lección 2/8 · ⭐ Premium · 200 XP",
      title:"Auxiliares, Electricidad & Grupo de Emergencia",
      intro:"Un buque sin motor principal puede derivar hasta un puerto. Un buque sin electricidad está ciego, sordo e indefenso.\n\nEsta lección cubre el sistema eléctrico, el grupo de emergencia SOLAS, las calderas, las botellas de aire y todas las bombas esenciales.",
      p1:"PARTE 1 — SISTEMA ELÉCTRICO & BLACKOUT",s1t:"Generadores, MSB, grupo emergencia, SAI",
      s1:"GENERADORES AUXILIARES:\nMotores diesel 4 tiempos · 1000-1500 RPM\nProducen 440V / 60Hz · Siempre 2+ (SOLAS)\n\nCUADRO PRINCIPAL (MSB):\nDistribuye 440V a todo el buque\nTransformadores → 220V y 24V DC\nPMS integrado · Disyuntores por circuito\n\nGRUPO DE EMERGENCIA (SOLAS):\nArranque AUTO en <30 segundos\nENCIMA de la línea de flotación\nLocal SEPARADO de sala de máquinas\nAlimenta: nav · comms · bombas incendios · GMDSS\nAutonomía: 18 horas mínimo\n\nSAI/UPS:\nBaterías tampón → relevo INSTANTÁNEO\nAlimenta alarmas · control · ECDIS respaldo",
      p2:"PARTE 2 — BOTELLAS DE AIRE",s2t:"Arranque · Servicio · Control",
      s2:"AIRE ARRANQUE (25-30 bar):\nÚnica forma de arrancar el motor principal\n2 botellas mínimo (SOLAS) · 12 arranques\n⚠️ Mantener siempre >80% de presión\n\nAIRE SERVICIO (7-10 bar):\nLimpieza · herramientas neumáticas · taller\n\nAIRE CONTROL (5-7 bar):\nAcciona válvulas neumáticas\nSistemas de control automático\nDebe ser limpio, seco y sin aceite",
      p3:"PARTE 3 — CALDERA & VAPOR",s3t:"Producción de vapor para el buque",
      s3:"CALDERA AUXILIAR:\nProduce vapor (5-10 bar) · fuel oil o gases de escape\n\nUSOS DEL VAPOR:\n→ Calefacción HFO (120-150°C)\n→ Agua caliente sanitaria · HVAC buque\n→ Purificación HFO · calefacción bodegas\n\nCALDERA GASES DE ESCAPE:\nRecupera calor gases escape (350-400°C)\n→ Vapor GRATUITO · Ahorro hasta 15%",
      p4:"PARTE 4 — BOMBAS ESENCIALES",s4t:"Las 6 bombas a conocer",
      s4:"BOMBA SENTINA: evacua agua de infiltración\n→ Agua sentina = RESIDUO MARPOL (15 ppm)\n\nBOMBA LASTRE: controla calado y estabilidad\n→ BWC 2017: tratamiento aguas de lastre\n\nBOMBA CONTRAINCENDIOS: 2 mínimo (SOLAS)\n→ 1 por grupo emergencia · lista en <15s\n\nBOMBA COMBUSTIBLE: transferencia HFO/MDO\nBOMBA AGUA MAR: refrigeración\nGAD (Generador Agua Dulce): 5-30 t/día",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 2 MÁQUINAS",
      sumP:["Grupo emergencia: <30s · ENCIMA flotación · local separado · 18h","440V grandes equipos · 220V doméstico · 24V DC control","SAI = relevo instantáneo baterías en blackout","MSB + PMS = gestión eléctrica automática","Aire arranque: 25-30 bar · 2 botellas SOLAS · 12 arranques","Caldera gases escape = vapor GRATUITO","6 bombas: sentina · lastre · incendios · combustible · AM · GAD","Agua sentina MARPOL 15 ppm · Lastre BWC 2017"],
      learnedP:["Grupo emergencia <30s · ENCIMA flotación · 18h","440V · 220V · 24V DC · SAI instantáneo","MSB + PMS gestión eléctrica","Aire arranque 25-30 bar · 2 botellas SOLAS","Caldera gases escape · vapor gratuito","6 bombas esenciales · MARPOL 15 ppm · BWC 2017"],
    },
    pt:{
      badge:"⚙️ Módulo Máquinas · Lição 2/8 · ⭐ Premium · 200 XP",
      title:"Auxiliares, Eletricidade & Grupo de Emergência",
      intro:"Um navio sem motor principal pode derivar até um porto. Um navio sem eletricidade é cego, surdo e indefeso.\n\nEsta lição cobre o sistema elétrico, o grupo de emergência SOLAS, caldeiras, garrafas de ar e todas as bombas essenciais.",
      p1:"PARTE 1 — SISTEMA ELÉTRICO & BLACKOUT",s1t:"Geradores, MSB, grupo emergência, UPS",
      s1:"GERADORES AUXILIARES:\nMotores diesel 4 tempos · 1000-1500 RPM\nProduzem 440V / 60Hz · Sempre 2+ (SOLAS)\n\nQUADRO PRINCIPAL (MSB):\nDistribui 440V a todo o navio\nTransformadores → 220V e 24V DC\nPMS integrado · Disjuntores por circuito\n\nGRUPO DE EMERGÊNCIA (SOLAS):\nArranque AUTO em <30 segundos\nACIMA da linha de flutuação\nLocal SEPARADO da sala de máquinas\nAlimenta: nav · comms · bombas incêndio · GMDSS\nAutonomia: 18 horas mínimo\n\nUPS:\nBaterias tampão → assumo INSTANTÂNEO\nAlimenta alarmes · controlo · ECDIS reserva",
      p2:"PARTE 2 — GARRAFAS DE AR",s2t:"Arranque · Serviço · Controlo",
      s2:"AR ARRANQUE (25-30 bar):\nÚnica forma de arrancar o motor principal\n2 garrafas mínimo (SOLAS) · 12 arranques\n⚠️ Manter sempre >80% de pressão\n\nAR SERVIÇO (7-10 bar):\nLimpeza · ferramentas pneumáticas · oficina\n\nAR CONTROLO (5-7 bar):\nActua válvulas pneumáticas\nSistemas de controlo automático\nDeve ser limpo, seco e sem óleo",
      p3:"PARTE 3 — CALDEIRA & VAPOR",s3t:"Produção de vapor para o navio",
      s3:"CALDEIRA AUXILIAR:\nProduz vapor (5-10 bar) · fuel oil ou gases de escape\n\nUSOS DO VAPOR:\n→ Aquecimento HFO (120-150°C)\n→ Água quente sanitária · HVAC navio\n→ Purificação HFO · aquecimento porões\n\nCALDEIRA GASES DE ESCAPE:\nRecupera calor gases escape (350-400°C)\n→ Vapor GRATUITO · Poupança até 15%",
      p4:"PARTE 4 — BOMBAS ESSENCIAIS",s4t:"As 6 bombas a conhecer",
      s4:"BOMBA DE PORÃO: remove água de infiltração\n→ Água de porão = RESÍDUO MARPOL (15 ppm)\n\nBOMBA DE LASTRO: controla calado e estabilidade\n→ BWC 2017: tratamento das águas de lastro\n\nBOMBA DE INCÊNDIO: 2 mínimo (SOLAS)\n→ 1 alimentada por grupo emergência · pronta em <15s\n\nBOMBA DE COMBUSTÍVEL: transferência HFO/MDO\nBOMBA ÁGUA DO MAR: arrefecimento\nGAD (Gerador Água Doce): 5-30 t/dia",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 2 MÁQUINAS",
      sumP:["Grupo emergência: <30s · ACIMA flutuação · local separado · 18h","440V equipamentos pesados · 220V doméstico · 24V DC controlo","UPS = assumo instantâneo baterias em blackout","MSB + PMS = gestão elétrica automática","Ar arranque: 25-30 bar · 2 garrafas SOLAS · 12 arranques","Caldeira gases escape = vapor GRATUITO","6 bombas: porão · lastro · incêndio · combustível · AM · GAD","Água porão MARPOL 15 ppm · Lastro BWC 2017"],
      learnedP:["Grupo emergência <30s · ACIMA flutuação · 18h","440V · 220V · 24V DC · UPS instantâneo","MSB + PMS gestão elétrica","Ar arranque 25-30 bar · 2 garrafas SOLAS","Caldeira gases escape · vapor gratuito","6 bombas essenciais · MARPOL 15 ppm · BWC 2017"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════
export default function LessonAuxiliaires({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#0a0a1a 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.blue2}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.blue2,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚡ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/8":lang==="en"?"Lesson 2/8":lang==="es"?"Lección 2/8":"Lição 2/8"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.blue2},${C.orange},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="⚡" text={lc.p1} color={C.yellow}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.yellow}33`}}><div style={{fontSize:11,color:C.yellow,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚡ {lang==="fr"?"SYSTÈME ÉLECTRIQUE — INTERACTIF":lang==="en"?"ELECTRICAL SYSTEM — INTERACTIVE":lang==="es"?"SISTEMA ELÉCTRICO — INTERACTIVO":"SISTEMA ELÉTRICO — INTERATIVO"}</div><ElectricalSVG lang={lang}/></Card>

            <SL icon="🔵" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔵</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔵 {lang==="fr"?"BOUTEILLES D'AIR — INTERACTIF":lang==="en"?"AIR BOTTLES — INTERACTIVE":lang==="es"?"BOTELLAS DE AIRE — INTERACTIVO":"GARRAFAS DE AR — INTERATIVO"}</div><AirSystemSVG lang={lang}/></Card>

            <SL icon="🔥" text={lc.p3} color={C.rust}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔥</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.rust,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔥 {lang==="fr"?"CHAUDIÈRE — INTERACTIF":lang==="en"?"BOILER — INTERACTIVE":lang==="es"?"CALDERA — INTERACTIVO":"CALDEIRA — INTERATIVO"}</div><BoilerSVG lang={lang}/></Card>

            <SL icon="💧" text={lc.p4} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💧</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💧 {lang==="fr"?"POMPES ESSENTIELLES — INTERACTIF":lang==="en"?"ESSENTIAL PUMPS — INTERACTIVE":lang==="es"?"BOMBAS ESENCIALES — INTERACTIVO":"BOMBAS ESSENCIAIS — INTERATIVO"}</div><PumpsSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(26,111,212,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.orange})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Auxiliaires & Électricité":lang==="en"?"Quiz — Auxiliaries & Electricity":lang==="es"?"Quiz — Auxiliares & Electricidad":"Quiz — Auxiliares & Eletricidade"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions":lang==="en"?"questions":lang==="es"?"preguntas":"perguntas"} · {lang==="fr"?"Leçon 2":lang==="en"?"Lesson 2":lang==="es"?"Lección 2":"Lição 2"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}55`,fontSize:14,color:C.blue2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.orange})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 — STABILITÉ & CHARGEMENT →":lang==="en"?"LESSON 3 — STABILITY & LOADING →":lang==="es"?"LECCIÓN 3 — ESTABILIDAD & CARGA →":"LIÇÃO 3 — ESTABILIDADE & CARREGAMENTO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
