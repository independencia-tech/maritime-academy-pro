// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

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
// SVG 1 — SURVIVAL EQUIPMENT
// ══════════════════════════════════════
function SurvivalEquipSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:"lifejacket", x:30, y:20, icon:"🦺", color:C.orange,
      label:{fr:"Gilet de sauvetage",en:"Life jacket",es:"Chaleco salvavidas",pt:"Colete salva-vidas"},
      desc:{fr:"SOLAS : porté en <1 minute\nFlottabilité minimum : 150N (adulte)\nLumière + sifflet obligatoires\nPorté par-dessus les vêtements\n⚠️ Inspecté mensuellement\nDurée de vie : 10 ans",en:"SOLAS: donned in <1 minute\nMinimum buoyancy: 150N (adult)\nLight + whistle mandatory\nWorn over clothing\n⚠️ Monthly inspection\nService life: 10 years",es:"SOLAS: puesto en <1 minuto\nFlotabilidad mínima: 150N (adulto)\nLuz + silbato obligatorios\nSe lleva encima de la ropa\n⚠️ Inspección mensual\nVida útil: 10 años",pt:"SOLAS: vestido em <1 minuto\nFlutuabilidade mínima: 150N (adulto)\nLuz + apito obrigatórios\nUsado por cima da roupa\n⚠️ Inspeção mensal\nVida útil: 10 anos"} },
    { id:"immersion", x:120, y:20, icon:"🥼", color:C.blue2,
      label:{fr:"Combinaison de survie",en:"Immersion suit",es:"Traje de inmersión",pt:"Fato de imersão"},
      desc:{fr:"Protection contre hypothermie\nEaux froides < 15°C\nEnfilage en < 2 minutes\nFlottabilité intégrée\nDurée survie en eau froide : 6h+\nCouleur vive (orange/rouge) obligatoire",en:"Protection against hypothermia\nCold water < 15°C\nDonned in < 2 minutes\nBuilt-in buoyancy\nSurvival in cold water: 6h+\nBright color (orange/red) mandatory",es:"Protección contra hipotermia\nAguas frías < 15°C\nPuesto en < 2 minutos\nFlotabilidad integrada\nSupervivencia en agua fría: 6h+\nColor llamativo (naranja/rojo)",pt:"Proteção contra hipotermia\nÁguas frias < 15°C\nVestido em < 2 minutos\nFlutuabilidade integrada\nSobrevivência em água fria: 6h+\nCor viva (laranja/vermelho)"} },
    { id:"lifebuoy", x:210, y:20, icon:"🔴", color:C.red,
      label:{fr:"Bouée de sauvetage",en:"Life buoy",es:"Aro salvavidas",pt:"Boia salva-vidas"},
      desc:{fr:"Diamètre intérieur : 60 cm min.\nFlottabilité : 14,5 kg\nLigne de sauvetage : 30m\nLumière à auto-allumage\nSignal fumée diurne\nDisposés chaque côté du navire",en:"Inner diameter: 60 cm min.\nBuoyancy: 14.5 kg\nLifeline: 30m\nSelf-igniting light\nDaytime smoke signal\nDeployed each side of vessel",es:"Diámetro interior: 60 cm mín.\nFlotabilidad: 14,5 kg\nLinea de salvamento: 30m\nLuz de encendido automático\nSeñal de humo diurna",pt:"Diâmetro interior: 60 cm mín.\nFlutuabilidade: 14,5 kg\nLinha de salvamento: 30m\nLuz de acendimento automático\nSinal de fumo diurno"} },
    { id:"epirb", x:30, y:130, icon:"📡", color:C.gold2,
      label:{fr:"EPIRB",en:"EPIRB",es:"EPIRB",pt:"EPIRB"},
      desc:{fr:"Emergency Position Indicating Radio Beacon\nFréquence : 406 MHz (satellite COSPAS-SARSAT)\nDéclenchement automatique à l'eau\nOu manuel\nSignal reçu en < 90 minutes\nPositionnement GPS intégré\nPortée mondiale\nTest mensuel obligatoire",en:"Emergency Position Indicating Radio Beacon\nFrequency: 406 MHz (COSPAS-SARSAT satellite)\nAutomatic activation on water immersion\nOr manual\nSignal received in < 90 minutes\nBuilt-in GPS positioning\nWorldwide range\nMonthly test mandatory",es:"Emergency Position Indicating Radio Beacon\nFrecuencia: 406 MHz (satélite COSPAS-SARSAT)\nActivación automática al contacto con agua\nO manual\nSeñal recibida en < 90 minutos\nGPS integrado · Cobertura mundial",pt:"Emergency Position Indicating Radio Beacon\nFrequência: 406 MHz (satélite COSPAS-SARSAT)\nAtivação automática ao contacto com água\nOu manual\nSinal recebido em < 90 minutos\nGPS integrado · Cobertura mundial"} },
    { id:"sart", x:120, y:130, icon:"📻", color:C.teal,
      label:{fr:"SART",en:"SART",es:"SART",pt:"SART"},
      desc:{fr:"Search And Rescue Transponder\nRépondeur radar de sauvetage\nFréquence : 9 GHz (bande X radar)\nPortée : 5-10 milles nautiques\nAffiche une série de points sur le radar\nActivation manuelle\nAutonomie : 96 heures\n2 SART minimum à bord (SOLAS)",en:"Search And Rescue Transponder\nRadar search and rescue transponder\nFrequency: 9 GHz (X-band radar)\nRange: 5-10 nautical miles\nDisplays a series of dots on radar\nManual activation\nAutonomy: 96 hours\nMinimum 2 SART on board (SOLAS)",es:"Search And Rescue Transponder\nTranspondedor de radar SAR\nFrecuencia: 9 GHz (banda X radar)\nAlcance: 5-10 millas náuticas\nMuestra puntos en el radar\nActivación manual · Autonomía: 96 horas",pt:"Search And Rescue Transponder\nTranspondedor de radar SAR\nFrequência: 9 GHz (banda X radar)\nAlcance: 5-10 milhas náuticas\nMostra pontos no radar\nAtivação manual · Autonomia: 96 horas"} },
    { id:"flares", x:210, y:130, icon:"🚀", color:C.red,
      label:{fr:"Fusées & signaux",en:"Flares & signals",es:"Bengalas & señales",pt:"Foguetes & sinais"},
      desc:{fr:"Fusée à parachute : visibilité > 40 km (nuit)\nFeu à main : rouge (détresse)\nSignal fumée : orange (jour)\nMiroir de signalisation : soleil\nDurée de vie : 3 ans\nStockées dans un récipient étanche\nNe jamais tirer vers un hélicoptère",en:"Parachute rocket: visibility > 40 km (night)\nHandheld flare: red (distress)\nSmoke signal: orange (daytime)\nSignaling mirror: sun\nService life: 3 years\nStored in watertight container\nNever fire at helicopter",es:"Cohete paracaídas: visibilidad > 40 km (noche)\nLuz de mano: roja (socorro)\nSeñal de humo: naranja (día)\nEspejo de señalización: sol\nVida útil: 3 años",pt:"Foguete paraquedas: visibilidade > 40 km (noite)\nLuz manual: vermelha (socorro)\nSinal de fumo: laranja (dia)\nEspelho de sinalização: sol\nVida útil: 3 anos"} },
  ];
  const sel_ = sel ? items.find(i=>i.id===sel) : null;
  return (
    <div>
      <svg width="290" height="215" viewBox="0 0 290 215">
        <rect width="290" height="215" fill="#061020" rx="8"/>
        {/* Divider */}
        <line x1="10" y1="110" x2="280" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4,4"/>
        <text x="145" y="108" textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {lang==="fr"?"── Protection personnelle ──":lang==="en"?"── Personal protection ──":lang==="es"?"── Protección personal ──":"── Proteção pessoal ──"}
        </text>
        <text x="145" y="128" textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {lang==="fr"?"── Localisation & détresse ──":lang==="en"?"── Location & distress ──":lang==="es"?"── Localización & socorro ──":"── Localização & socorro ──"}
        </text>
        {items.map(item=>(
          <g key={item.id} onClick={()=>setSel(sel===item.id?null:item.id)} style={{cursor:"pointer"}}>
            <rect x={item.x} y={item.y} width={80} height={80} rx={12}
              fill={sel===item.id?`${item.color}22`:"rgba(255,255,255,0.04)"}
              stroke={sel===item.id?item.color:"rgba(255,255,255,0.08)"}
              strokeWidth={sel===item.id?2:1}/>
            <text x={item.x+40} y={item.y+38} textAnchor="middle" fontSize="24">{item.icon}</text>
            <text x={item.x+40} y={item.y+56} textAnchor="middle" fontSize="7.5"
              fill={item.color} fontWeight="700">
              {(item.label[lang]||item.label.fr).split(' ')[0]}
            </text>
            <text x={item.x+40} y={item.y+68} textAnchor="middle" fontSize="7"
              fill={item.color} opacity="0.7">
              {(item.label[lang]||item.label.fr).split(' ').slice(1).join(' ')}
            </text>
          </g>
        ))}
        <text x="145" y="210" textAnchor="middle" fontSize="7" fill={C.muted}>
          {lang==="fr"?"Touche un équipement pour les détails":lang==="en"?"Tap equipment for details":lang==="es"?"Toca un equipo para detalles":"Toque um equipamento para detalhes"}
        </text>
      </svg>
      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — EPIRB + SART SIMULATOR
// ══════════════════════════════════════
function EPIRBSimulator({ lang }) {
  const [device, setDevice] = useState("epirb");
  const [activated, setActivated] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(()=>{
    let interval;
    if(activated){
      interval = setInterval(()=>setTime(t=>t+1),1000);
    } else {
      setTime(0);
    }
    return()=>clearInterval(interval);
  },[activated]);

  const minutes = Math.floor(time/60);
  const seconds = time%60;

  // EPIRB signal reaches satellite simulation
  const satelliteReached = device==="epirb" && time >= 15;
  const mrccAlerted = device==="epirb" && time >= 25;
  const rescueDispatched = device==="epirb" && time >= 40;

  // SART radar dots
  const sartDots = device==="sart" && activated;

  return (
    <div>
      {/* Device selector */}
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {[
          {id:"epirb",label:"📡 EPIRB",color:C.gold2},
          {id:"sart",label:"📻 SART",color:C.teal},
        ].map(d=>(
          <button key={d.id} onClick={()=>{setDevice(d.id);setActivated(false);}} style={{
            flex:1,padding:"9px",borderRadius:10,fontSize:11,cursor:"pointer",fontWeight:700,
            background:device===d.id?`${d.color}22`:"rgba(255,255,255,0.05)",
            border:`1.5px solid ${device===d.id?d.color:"rgba(255,255,255,0.1)"}`,
            color:device===d.id?d.color:C.muted,
          }}>{d.label}</button>
        ))}
      </div>

      <svg width="290" height="180" viewBox="0 0 290 180">
        <rect width="290" height="180" fill="#020810" rx="8"/>
        {/* Stars/space for EPIRB */}
        {device==="epirb" && (
          <>
            {[[20,15],[50,25],[80,10],[140,20],[200,12],[240,25],[270,8]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r={1} fill="white" opacity={activated?0.6:0.2}/>
            ))}
            {/* Satellite */}
            <g transform="translate(200,18)">
              <rect x="-8" y="-3" width="16" height="6" fill={satelliteReached?"#f1c40f":"rgba(255,255,255,0.2)"} rx="2"/>
              <line x1="-18" y1="0" x2="-8" y2="0" stroke={satelliteReached?"#f1c40f":"rgba(255,255,255,0.2)"} strokeWidth="1.5"/>
              <line x1="8" y1="0" x2="18" y2="0" stroke={satelliteReached?"#f1c40f":"rgba(255,255,255,0.2)"} strokeWidth="1.5"/>
              <text x="0" y="14" textAnchor="middle" fontSize="6" fill={satelliteReached?C.gold2:C.muted}>SAT</text>
            </g>
            {/* MRCC */}
            <g transform="translate(240,70)">
              <rect x="-18" y="-10" width="36" height="20" fill={mrccAlerted?"rgba(30,138,74,0.3)":"rgba(255,255,255,0.05)"} stroke={mrccAlerted?C.green:"rgba(255,255,255,0.1)"} strokeWidth="1" rx="4"/>
              <text x="0" y="3" textAnchor="middle" fontSize="6" fill={mrccAlerted?C.green:C.muted}>MRCC</text>
            </g>
            {/* Signal waves from EPIRB */}
            {activated && [1,2,3].map(i=>(
              <circle key={i} cx={70} cy={140} r={i*15} fill="none"
                stroke={C.gold2} strokeWidth="0.8" opacity={0.6-i*0.15}>
                <animate attributeName="r" values={`${i*10};${i*20};${i*10}`} dur={`${1+i*0.3}s`} repeatCount="indefinite"/>
                <animate attributeName="opacity" values={`${0.6-i*0.1};0.1;${0.6-i*0.1}`} dur={`${1+i*0.3}s`} repeatCount="indefinite"/>
              </circle>
            ))}
            {/* Signal line to satellite */}
            {activated && (
              <line x1="70" y1="130" x2="195" y2="22"
                stroke={satelliteReached?C.gold2:"rgba(201,146,42,0.3)"}
                strokeWidth="1.5" strokeDasharray="5,3">
                <animate attributeName="stroke-dashoffset" values="0;-16" dur="0.8s" repeatCount="indefinite"/>
              </line>
            )}
            {/* Signal satellite to MRCC */}
            {mrccAlerted && (
              <line x1="210" y1="25" x2="232" y2="62"
                stroke={C.green} strokeWidth="1.5" strokeDasharray="4,2">
                <animate attributeName="stroke-dashoffset" values="0;-12" dur="0.6s" repeatCount="indefinite"/>
              </line>
            )}
            {/* Rescue helicopter */}
            {rescueDispatched && (
              <text x="155" y="105" fontSize="20">🚁</text>
            )}
            {/* EPIRB device */}
            <g transform="translate(55,125)">
              <rect x="-12" y="-20" width="24" height="35" fill={activated?"rgba(201,146,42,0.3)":"rgba(255,255,255,0.08)"} stroke={activated?C.gold2:C.muted} strokeWidth="1.5" rx="4"/>
              <text x="0" y="-5" textAnchor="middle" fontSize="7" fill={activated?C.gold2:C.muted} fontWeight="700">EPIRB</text>
              {activated && <circle cx="0" cy="8" r="4" fill={C.gold2} opacity="0.9"><animate attributeName="opacity" values="0.9;0.3;0.9" dur="0.5s" repeatCount="indefinite"/></circle>}
            </g>
            {/* Vessel */}
            <text x="55" y="168" textAnchor="middle" fontSize="16">🚢</text>
          </>
        )}

        {/* SART radar display */}
        {device==="sart" && (
          <>
            {/* Radar screen */}
            <circle cx="145" cy="90" r="75" fill="rgba(0,30,0,0.8)" stroke={C.green} strokeWidth="1.5"/>
            <circle cx="145" cy="90" r="50" fill="none" stroke="rgba(0,255,0,0.1)" strokeWidth="0.8"/>
            <circle cx="145" cy="90" r="25" fill="none" stroke="rgba(0,255,0,0.1)" strokeWidth="0.8"/>
            {/* Radar sweep */}
            {activated && (
              <line x1="145" y1="90" x2="145" y2="15"
                stroke="rgba(0,255,0,0.5)" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate" values="0 145 90;360 145 90" dur="3s" repeatCount="indefinite"/>
              </line>
            )}
            {/* SART dots pattern */}
            {sartDots && [0,1,2,3,4,5,6,7,8,9,10].map(i=>(
              <circle key={i} cx={145+i*6-30} cy={90-Math.sqrt(75*75-(i*6-30)*(i*6-30))*0.4}
                r={3} fill={C.green} opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1s" begin={`${i*0.1}s`} repeatCount="indefinite"/>
              </circle>
            ))}
            {/* Labels */}
            <text x="145" y="10" textAnchor="middle" fontSize="7" fill={C.teal} fontWeight="700">
              {lang==="fr"?"RADAR — Vue SART":lang==="en"?"RADAR — SART View":lang==="es"?"RADAR — Vista SART":"RADAR — Vista SART"}
            </text>
            {sartDots && (
              <text x="145" y="168" textAnchor="middle" fontSize="7" fill={C.green} fontWeight="700">
                {lang==="fr"?"✅ SART détecté — 12 points sur le radar":lang==="en"?"✅ SART detected — 12 dots on radar":lang==="es"?"✅ SART detectado — 12 puntos en radar":"✅ SART detetado — 12 pontos no radar"}
              </text>
            )}
            {!activated && (
              <text x="145" y="168" textAnchor="middle" fontSize="7" fill={C.muted}>
                {lang==="fr"?"Activer le SART pour voir les points":lang==="en"?"Activate SART to see dots":lang==="es"?"Activar SART para ver puntos":"Ativar o SART para ver os pontos"}
              </text>
            )}
          </>
        )}

        {/* Timer */}
        {activated && (
          <g>
            <rect x="5" y="5" width="80" height="20" rx="5" fill="rgba(0,0,0,0.6)" stroke={device==="epirb"?C.gold2:C.teal} strokeWidth="0.8"/>
            <text x="45" y="18" textAnchor="middle" fontSize="8" fill={device==="epirb"?C.gold2:C.teal} fontWeight="700" fontFamily="monospace">
              {String(minutes).padStart(2,"0")}:{String(seconds).padStart(2,"0")}
            </text>
          </g>
        )}
      </svg>

      {/* Status indicators (EPIRB) */}
      {device==="epirb" && activated && (
        <div style={{display:"flex",flexDirection:"column",gap:5,marginTop:8}}>
          {[
            {label:{fr:"Signal émis (406 MHz)",en:"Signal transmitted (406 MHz)",es:"Señal emitida (406 MHz)",pt:"Sinal emitido (406 MHz)"},done:activated,t:0},
            {label:{fr:"Satellite COSPAS-SARSAT reçoit",en:"COSPAS-SARSAT satellite receives",es:"Satélite COSPAS-SARSAT recibe",pt:"Satélite COSPAS-SARSAT recebe"},done:satelliteReached,t:15},
            {label:{fr:"MRCC alerté + position GPS",en:"MRCC alerted + GPS position",es:"MRCC alertado + posición GPS",pt:"MRCC alertado + posição GPS"},done:mrccAlerted,t:25},
            {label:{fr:"Secours dépêchés 🚁",en:"Rescue dispatched 🚁",es:"Rescate enviado 🚁",pt:"Resgate enviado 🚁"},done:rescueDispatched,t:40},
          ].map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:8,background:s.done?"rgba(30,138,74,0.12)":"rgba(255,255,255,0.04)",border:`1px solid ${s.done?C.green:"rgba(255,255,255,0.08)"}`}}>
              <span style={{fontSize:12}}>{s.done?"✅":"⏳"}</span>
              <div style={{flex:1,fontSize:10,color:s.done?C.green:C.muted}}>{s.label[lang]||s.label.fr}</div>
              {!s.done&&<div style={{fontSize:9,color:C.muted}}>~{s.t}s</div>}
            </div>
          ))}
        </div>
      )}

      {/* Activate button */}
      <button onClick={()=>setActivated(v=>!v)} style={{
        width:"100%", marginTop:10, padding:"11px 0", borderRadius:12,
        fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Cinzel',serif",
        background:activated
          ?(device==="epirb"?"rgba(192,57,43,0.2)":"rgba(192,57,43,0.2)")
          :(device==="epirb"?`linear-gradient(135deg,${C.gold},${C.orange})`:`linear-gradient(135deg,${C.teal},${C.blue2})`),
        border:`1.5px solid ${activated?C.red:device==="epirb"?C.gold2:C.teal}`,
        color:activated?C.red:C.white,
      }}>
        {activated
          ?(lang==="fr"?"⏹ DÉSACTIVER":lang==="en"?"⏹ DEACTIVATE":lang==="es"?"⏹ DESACTIVAR":"⏹ DESATIVAR")
          :(lang==="fr"?`▶ ACTIVER ${device.toUpperCase()}`:lang==="en"?`▶ ACTIVATE ${device.toUpperCase()}`:`▶ ACTIVAR ${device.toUpperCase()}`)}
      </button>

      {device==="epirb" && !activated && (
        <div style={{marginTop:6,fontSize:10,color:C.muted,lineHeight:1.5,textAlign:"center"}}>
          {lang==="fr"?"⚠️ Activer uniquement en vraie détresse — fausse alerte = amende sévère":lang==="en"?"⚠️ Activate only in real distress — false alert = severe fine":lang==="es"?"⚠️ Activar solo en verdadera angustia — falsa alarma = multa grave":"⚠️ Ativar apenas em verdadeira angústia — alarme falso = multa grave"}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — LIFEBOATS & LIFERAFTS
// ══════════════════════════════════════
function LifeboatSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const types = [
    { id:"lifeboat", icon:"🚤", color:C.orange,
      label:{fr:"Canot de sauvetage",en:"Lifeboat",es:"Bote salvavidas",pt:"Bote salva-vidas"},
      desc:{fr:"Capacité : 100-150 personnes\nTotalement fermé (SOLAS)\nMoteur diesel autonome\nProvisions pour 3 jours\nAuto-redressable si chaviré\nTest de mise à l'eau mensuel\nRévision annuelle obligatoire\nPositionné sur les côtés du navire",en:"Capacity: 100-150 people\nFully enclosed (SOLAS)\nAutonomous diesel engine\nProvisions for 3 days\nSelf-righting if capsized\nMonthly lowering test\nAnnual survey mandatory\nPositioned on sides of vessel",es:"Capacidad: 100-150 personas\nCompletamente cerrado (SOLAS)\nMotor diesel autónomo\nProvisiones para 3 días\nAutoendrizante si vuelca\nPrueba mensual de arriado\nRevisión anual obligatoria",pt:"Capacidade: 100-150 pessoas\nCompletamente fechado (SOLAS)\nMotor diesel autónomo\nProvisões para 3 dias\nAuto-endireitável se capotar\nTeste de arriamento mensal\nRevisão anual obrigatória"} },
    { id:"liferaft", icon:"🟡", color:C.yellow,
      label:{fr:"Radeau de sauvetage",en:"Liferaft",es:"Balsa salvavidas",pt:"Balsa salva-vidas"},
      desc:{fr:"Gonflable automatiquement (HRU)\nCapacité : 6, 10, 15, 20, 25 pers.\nHydrostatic Release Unit : se libère automatiquement à 1,5-4m de profondeur\nSe gonfle en surface\nAttache de rétention (painter line)\nProvisions SOLAS Pack A ou B\nInspection tous les 12 mois",en:"Automatically inflatable (HRU)\nCapacity: 6, 10, 15, 20, 25 persons\nHydrostatic Release Unit: releases automatically at 1.5-4m depth\nInflates at surface\nPainter line retention\nSOLAS Pack A or B provisions\nInspection every 12 months",es:"Inflable automáticamente (HRU)\nCapacidad: 6, 10, 15, 20, 25 pers.\nUnidad de Liberación Hidrostática: se libera automáticamente a 1,5-4m\nProvisiones SOLAS Pack A o B\nInspección cada 12 meses",pt:"Insufável automaticamente (HRU)\nCapacidade: 6, 10, 15, 20, 25 pess.\nUnidade de Libertação Hidrostática: liberta-se automaticamente a 1,5-4m\nProvisões SOLAS Pack A ou B\nInspeção a cada 12 meses"} },
    { id:"rescueboat", icon:"⛵", color:C.blue2,
      label:{fr:"Canot de secours",en:"Rescue boat",es:"Bote de rescate",pt:"Bote de resgate"},
      desc:{fr:"Récupère les personnes à la mer\nVitesse : 6 nœuds minimum\nCapacité : 5 personnes min.\nUne mise à l'eau par côté\n⚠️ Différent du canot de sauvetage\nExercice mensuel de mise à l'eau",en:"Recovers people from the water\nSpeed: 6 knots minimum\nCapacity: 5 persons minimum\nOne per side\n⚠️ Different from lifeboat\nMonthly lowering drill",es:"Recupera personas en el agua\nVelocidad: 6 nudos mínimo\nCapacidad: 5 personas mínimo\n⚠️ Diferente del bote salvavidas\nEjercicio mensual de arriado",pt:"Recupera pessoas na água\nVelocidade: 6 nós mínimo\nCapacidade: 5 pessoas mínimo\n⚠️ Diferente do bote salva-vidas\nExercício mensal de arriamento"} },
    { id:"hru", icon:"🔧", color:C.green,
      label:{fr:"HRU (Hydrostatic Release)",en:"HRU (Hydrostatic Release)",es:"ULH (Largado Hidrostático)",pt:"ULH (Largação Hidrostática)"},
      desc:{fr:"Dispositif de largage hydrostatique\nLibère automatiquement le radeau\nSi le navire coule à 1,5-4m\nFonctionne même si équipage inconscient\nRemplacement tous les 2 ans OBLIGATOIRE\nDate d'expiration à vérifier\n⚠️ Jamais couper le painter line !",en:"Hydrostatic release device\nAutomatically releases liferaft\nIf vessel sinks to 1.5-4m depth\nWorks even if crew unconscious\nReplacement every 2 years MANDATORY\nExpiry date to check\n⚠️ Never cut the painter line!",es:"Dispositivo de largado hidrostático\nLibera automáticamente la balsa\nSi el buque se hunde a 1,5-4m\nFunciona aunque la tripulación esté inconsciente\nSustitución cada 2 años OBLIGATORIA\n⚠️ ¡Nunca cortar el cabo del rabiza!",pt:"Dispositivo de largação hidrostática\nLiberta automaticamente a balsa\nSe o navio afundar a 1,5-4m\nFunciona mesmo com tripulação inconsciente\nSubstituição a cada 2 anos OBRIGATÓRIA\n⚠️ Nunca cortar o cabo de retenção!"} },
  ];
  const sel_ = sel ? types.find(t=>t.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {types.map(tp=>(
          <div key={tp.id} onClick={()=>setSel(sel===tp.id?null:tp.id)}
            style={{padding:"12px 8px",borderRadius:14,cursor:"pointer",textAlign:"center",background:sel===tp.id?`${tp.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===tp.id?tp.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:24,marginBottom:6}}>{tp.icon}</div>
            <div style={{fontSize:9,color:tp.color,fontWeight:700,lineHeight:1.3}}>{tp.label[lang]||tp.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"12px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une embarcation pour les détails":lang==="en"?"Tap a craft for details":lang==="es"?"Toca una embarcación para detalles":"Toque numa embarcação para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — ABANDON SHIP PROCEDURE
// ══════════════════════════════════════
function AbandonShipSVG({ lang }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon:"🚨", color:C.red,
      label:{fr:"1. Alarme générale",en:"1. General alarm",es:"1. Alarma general",pt:"1. Alarme geral"},
      desc:{fr:"7 sons courts + 1 son long\nAnnonce sur PA system\n'Abandon ship — All hands to muster stations'\nHeure notée dans le journal de bord",en:"7 short + 1 long blast\nPA system announcement\n'Abandon ship — All hands to muster stations'\nTime recorded in log book",es:"7 cortos + 1 largo\nAnuncio por megafonía\n'Abandon ship — All hands to muster stations'\nHora anotada en el cuaderno",pt:"7 curtos + 1 longo\nAnúncio por PA\n'Abandon ship — All hands to muster stations'\nHora registada no diário"} },
    { icon:"🦺", color:C.orange,
      label:{fr:"2. S'équiper",en:"2. Gear up",es:"2. Equiparse",pt:"2. Equipar-se"},
      desc:{fr:"Gilet de sauvetage OBLIGATOIRE\nCombinaison de survie si disponible\nVêtements chauds + bonnet\nDocuments personnels si possible\nAucune valise — seulement l'essentiel\nMaximum 1-2 minutes",en:"Life jacket MANDATORY\nImmersion suit if available\nWarm clothes + hat\nPersonal documents if possible\nNo luggage — essentials only\nMaximum 1-2 minutes",es:"Chaleco salvavidas OBLIGATORIO\nTraje de inmersión si disponible\nRopa abrigada + gorro\nDocumentos personales si posible\nSin equipaje — solo lo esencial\nMáximo 1-2 minutos",pt:"Colete salva-vidas OBRIGATÓRIO\nFato de imersão se disponível\nRoupa quente + gorro\nDocumentos pessoais se possível\nSem bagagem — apenas o essencial\nMáximo 1-2 minutos"} },
    { icon:"🧍", color:C.yellow,
      label:{fr:"3. Poste de rassemblement",en:"3. Muster station",es:"3. Punto de reunión",pt:"3. Posto de reunião"},
      desc:{fr:"Se rendre au poste indiqué sur le rôle d'appel\nCalme et ordre — pas de course\nSignaler sa présence à l'officier\nAider les passagers / personnes handicapées\nAttendre les instructions",en:"Go to station shown on muster list\nCalm and orderly — no running\nReport presence to officer\nAssist passengers / disabled persons\nAwait instructions",es:"Dirigirse al puesto indicado en el cuadro de obligaciones\nCalma y orden — sin correr\nInformar de la presencia al oficial\nAyudar a pasajeros / personas con discapacidad",pt:"Ir ao posto indicado no quadro de obrigações\nCalma e ordem — sem correr\nReportar presença ao oficial\nAjudar passageiros / pessoas com deficiência"} },
    { icon:"📡", color:C.gold2,
      label:{fr:"4. Activer EPIRB/GMDSS",en:"4. Activate EPIRB/GMDSS",es:"4. Activar EPIRB/GMDSS",pt:"4. Ativar EPIRB/GMDSS"},
      desc:{fr:"Officier radio : Mayday Mayday Mayday\nPosition + nature du sinistre + nombre de personnes\nCanal 16 VHF + 2182 kHz HF\nEPIRB activé si pas automatique\nGMDSS : DSC Canal 70\nNotification aux autorités SAR",en:"Radio officer: Mayday Mayday Mayday\nPosition + nature of distress + number of persons\nChannel 16 VHF + 2182 kHz HF\nEPIRB activated if not automatic\nGMDSS: DSC Channel 70\nNotify SAR authorities",es:"Oficial de radio: Mayday Mayday Mayday\nPosición + naturaleza del siniestro + número de personas\nCanal 16 VHF + 2182 kHz HF\nEPIRB activado si no es automático",pt:"Oficial de rádio: Mayday Mayday Mayday\nPosição + natureza do sinistro + número de pessoas\nCanal 16 VHF + 2182 kHz HF\nEPIRB ativado se não automático"} },
    { icon:"🚤", color:C.blue2,
      label:{fr:"5. Abandon du navire",en:"5. Abandon vessel",es:"5. Abandono del buque",pt:"5. Abandono do navio"},
      desc:{fr:"Ordre donné UNIQUEMENT par le capitaine\nDescente ordonnée dans les embarcations\nNe pas sauter à la mer sauf si ordonné\nCanot de secours récupère les naufragés\nGarder le groupe ensemble\nCapitaine quitte LE DERNIER",en:"Order given ONLY by the Captain\nOrderly descent into craft\nDo not jump overboard unless ordered\nRescue boat recovers survivors\nKeep group together\nCaptain leaves LAST",es:"Orden dada SOLO por el Capitán\nDescenso ordenado a las embarcaciones\nNo saltar al mar salvo si se ordena\nBote de rescate recupera náufragos\nMantener el grupo junto\nCapitán abandona EL ÚLTIMO",pt:"Ordem dada APENAS pelo Capitão\nDescida ordeira para as embarcações\nNão saltar ao mar exceto se ordenado\nBote de resgate recupera sobreviventes\nManter o grupo junto\nCapitão sai O ÚLTIMO"} },
  ];
  const s = steps[step];
  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {steps.map((st,i)=>(
          <button key={i} onClick={()=>setStep(i)} style={{
            flex:1,padding:"6px 2px",borderRadius:8,cursor:"pointer",
            background:step===i?`${st.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${step===i?st.color:i<step?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.06)"}`,
            display:"flex",flexDirection:"column",alignItems:"center",gap:2,
          }}>
            <span style={{fontSize:14}}>{st.icon}</span>
            <div style={{fontSize:7,color:step===i?st.color:C.muted,fontWeight:step===i?700:400}}>{i+1}</div>
          </button>
        ))}
      </div>
      <div style={{padding:"12px",borderRadius:14,background:`${s.color}12`,border:`1.5px solid ${s.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:s.color,marginBottom:6}}>{s.icon} {s.label[lang]||s.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{s.desc[lang]||s.desc.fr}</div>
      </div>
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
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"MV Costa Concordia — Ile du Giglio (2012)",teaser:"Paquebot 114 500t · 32 morts · Abandon désorganisé · Capitaine quitte avant les passagers",what:"Le Costa Concordia s'échoue sur un récif. L'abandon du navire est chaotique. 32 personnes meurent. Le capitaine Schettino quitte le navire avant les passagers — condamné à 16 ans de prison. L'enquête révèle de graves défaillances dans la gestion de l'évacuation.",cause:"• Alarme d'abandon donnée tardivement (30+ minutes après échouage)\n• Équipage insuffisamment formé aux procédures d'urgence\n• Communication chaotique entre passerelle et officiers\n• Capitaine Schettino abandonne le navire avant les passagers\n• Gilets de sauvetage non distribués à temps\n• Canots côté tribord inaccessibles (gîte)",lessons:"✓ Alarme d'abandon = sans délai si situation critique\n✓ Formation équipage OBLIGATOIRE et régulière\n✓ Capitaine quitte LE DERNIER (SOLAS + Code ISM)\n✓ Exercices passagers dans les 24h après embarquement\n✓ Résultat : SOLAS renforcé · Exercices passagers obligatoires avant appareillage",link:"🔗 Lien L5 Sauvetage : L'EPIRB automatique a transmis la position. Les équipements fonctionnaient. C'est la formation insuffisante et le non-respect des procédures qui ont causé les morts. Les équipements ne servent à rien sans formation."},
    en:{title:"MV Costa Concordia — Giglio Island (2012)",teaser:"114,500t cruise ship · 32 deaths · Chaotic evacuation · Captain abandons before passengers",what:"Costa Concordia runs aground on a reef. The ship abandonment is chaotic. 32 people die. Captain Schettino leaves the vessel before passengers — sentenced to 16 years. Investigation reveals serious evacuation management failures.",cause:"• Abandon alarm given late (30+ minutes after grounding)\n• Crew insufficiently trained on emergency procedures\n• Chaotic communication between bridge and officers\n• Captain Schettino abandons ship before passengers\n• Life jackets not distributed in time\n• Starboard side lifeboats inaccessible (heel)",lessons:"✓ Abandon alarm = without delay if situation critical\n✓ Crew training MANDATORY and regular\n✓ Captain leaves LAST (SOLAS + ISM Code)\n✓ Passenger drills within 24h of embarkation\n✓ Result: SOLAS strengthened · Passenger drills mandatory before sailing",link:"🔗 L5 Survival Link: The automatic EPIRB transmitted position. Equipment worked. It was insufficient training and failure to follow procedures that caused deaths. Equipment is useless without training."},
    es:{title:"MV Costa Concordia — Isla del Giglio (2012)",teaser:"Crucero 114.500t · 32 muertos · Evacuación caótica · Capitán abandona antes que los pasajeros",what:"El Costa Concordia encalla en un arrecife. El abandono del buque es caótico. 32 personas mueren. El capitán Schettino abandona el buque antes que los pasajeros — condenado a 16 años.",cause:"• Alarma de abandono dada tardíamente (30+ minutos después del encallamiento)\n• Tripulación insuficientemente formada en procedimientos de emergencia\n• Comunicación caótica entre puente y oficiales\n• Capitán Schettino abandona el buque antes que los pasajeros\n• Chalecos salvavidas no distribuidos a tiempo",lessons:"✓ Alarma de abandono = sin demora si la situación es crítica\n✓ Formación tripulación OBLIGATORIA y regular\n✓ Capitán abandona EL ÚLTIMO (SOLAS + Código ISM)\n✓ Ejercicios de pasajeros en las 24h tras embarque\n✓ Resultado: SOLAS reforzado · Ejercicios antes de zarpar",link:"🔗 Vínculo L5: El EPIRB automático transmitió la posición. Los equipos funcionaban. Fue la formación insuficiente y el incumplimiento de procedimientos lo que causó las muertes."},
    pt:{title:"MV Costa Concordia — Ilha do Giglio (2012)",teaser:"Cruzeiro 114.500t · 32 mortos · Evacuação caótica · Capitão abandona antes dos passageiros",what:"O Costa Concordia encalha num recife. O abandono do navio é caótico. 32 pessoas morrem. O capitão Schettino abandona o navio antes dos passageiros — condenado a 16 anos.",cause:"• Alarme de abandono dado tardiamente (30+ minutos após encalhe)\n• Tripulação insuficientemente formada nos procedimentos de emergência\n• Comunicação caótica entre ponte e oficiais\n• Capitão Schettino abandona o navio antes dos passageiros\n• Coletes salva-vidas não distribuídos a tempo",lessons:"✓ Alarme de abandono = sem demora se situação crítica\n✓ Formação tripulação OBRIGATÓRIA e regular\n✓ Capitão sai O ÚLTIMO (SOLAS + Código ISM)\n✓ Exercícios de passageiros nas 24h após embarque\n✓ Resultado: SOLAS reforçado · Exercícios antes de zarpar",link:"🔗 Vínculo L5: O EPIRB automático transmitiu a posição. Os equipamentos funcionavam. Foi a formação insuficiente e o não cumprimento dos procedimentos que causou as mortes."},
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
  const correct={q1:"406",q2:"7",q3:"dernier"};
  const qs={
    fr:[
      {id:"q1",q:"L'EPIRB transmet sur quelle fréquence (en MHz) ?"},
      {id:"q2",q:"L'alarme générale d'abandon = combien de sons courts + 1 long ?\n(Répondre : le nombre de sons courts uniquement)"},
      {id:"q3",q:"Le capitaine quitte le navire en (répondre : premier ou dernier) :"},
    ],
    en:[
      {id:"q1",q:"EPIRB transmits on which frequency (in MHz)?"},
      {id:"q2",q:"General abandon alarm = how many short blasts + 1 long?\n(Answer: number of short blasts only)"},
      {id:"q3",q:"The captain leaves the vessel (answer: first or last):"},
    ],
    es:[
      {id:"q1",q:"¿En qué frecuencia (en MHz) transmite el EPIRB?"},
      {id:"q2",q:"Alarma general de abandono = ¿cuántos pitidos cortos + 1 largo?\n(Responder: solo el número de pitidos cortos)"},
      {id:"q3",q:"El capitán abandona el buque en (responder: primero o último):"},
    ],
    pt:[
      {id:"q1",q:"O EPIRB transmite em que frequência (em MHz)?"},
      {id:"q2",q:"Alarme geral de abandono = quantos toques curtos + 1 longo?\n(Responder: apenas o número de toques curtos)"},
      {id:"q3",q:"O capitão abandona o navio em (responder: primeiro ou último):"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase();
    if(id==="q1") return v==="406"||v==="406mhz"||v==="406 mhz";
    if(id==="q2") return v==="7";
    if(id==="q3") return v==="dernier"||v==="last"||v==="último"||v==="ultimo"||v==="último"||v==="o último";
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.blue2}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : EPIRB = 406 MHz · Alarme = 7+1 · Capitaine = DERNIER":lang==="en"?"💡 Reminders: EPIRB = 406 MHz · Alarm = 7+1 · Captain = LAST":lang==="es"?"💡 Recordatorios: EPIRB = 406 MHz · Alarma = 7+1 · Capitán = ÚLTIMO":"💡 Lembretes: EPIRB = 406 MHz · Alarme = 7+1 · Capitão = O ÚLTIMO"}
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
        {lang==="fr"?"✅ Q1: 406 MHz (satellite COSPAS-SARSAT)\n✅ Q2: 7 sons courts + 1 son long (SOLAS)\n✅ Q3: DERNIER (Capitaine quitte le navire en dernier — Code ISM + SOLAS)":lang==="en"?"✅ Q1: 406 MHz (COSPAS-SARSAT satellite)\n✅ Q2: 7 short blasts + 1 long (SOLAS)\n✅ Q3: LAST (Captain leaves the vessel last — ISM Code + SOLAS)":lang==="es"?"✅ Q1: 406 MHz · Q2: 7 · Q3: último/last":"✅ Q1: 406 MHz · Q2: 7 · Q3: último"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}


const QUIZ = {
  fr:[
    {q:"Sur quelle fréquence l'EPIRB émet-il son signal de détresse ?",opts:["121,5 MHz (ancien standard)","406 MHz — standard mondial COSPAS-SARSAT","156,8 MHz (Canal 16 VHF)","2182 kHz (HF)"],correct:1,expl:"L'EPIRB moderne émet sur 406 MHz vers les satellites COSPAS-SARSAT. Cette fréquence permet une localisation précise par GPS (< 100m) et une réception en moins de 90 minutes n'importe où dans le monde. L'ancien 121,5 MHz n'est plus surveillé par satellite depuis 2009."},
    {q:"L'alarme générale d'abandon du navire selon SOLAS est :",opts:["3 sons courts + 1 long","5 sons courts","7 sons courts + 1 son long","1 son long continu"],correct:2,expl:"Alarme générale SOLAS = 7 sons courts + 1 son long. Signifie : 'Tout le monde au poste de rassemblement avec gilet de sauvetage'. À distinguer de l'alarme incendie (signal continu) et du signal de brume. Connu obligatoirement de tout l'équipage."},
    {q:"Le HRU (Hydrostatic Release Unit) d'un radeau de sauvetage :",opts:["Doit être déclenché manuellement","Libère automatiquement le radeau si le navire coule à 1,5-4m de profondeur","Est obligatoire uniquement sur les paquebots","Protège le radeau contre les chocs"],correct:1,expl:"HRU = dispositif de largage hydrostatique. Quand le navire coule, la pression de l'eau à 1,5-4m déclenche le HRU → libère le radeau → le radeau monte en surface → se gonfle automatiquement. Fonctionne même si l'équipage est inconscient. Remplacement tous les 2 ans OBLIGATOIRE."},
    {q:"Qui donne l'ordre d'abandon du navire ?",opts:["L'officier en second","Le chef mécanicien","Le capitaine UNIQUEMENT","L'officier de quart"],correct:2,expl:"L'ordre d'abandon = CAPITAINE UNIQUEMENT. Aucun autre officier ne peut donner cet ordre. Le capitaine quitte le navire EN DERNIER (SOLAS + Code ISM). Le Costa Concordia a montré les conséquences dramatiques du non-respect de cette règle."},
    {q:"Le SART (Search And Rescue Transponder) fonctionne sur quelle fréquence radar ?",opts:["VHF 156 MHz","9 GHz (bande X radar)","406 MHz (satellite)","2182 kHz (HF)"],correct:1,expl:"SART = répondeur radar sur 9 GHz (bande X). Quand un radar balaie la zone, le SART répond en émettant une série de 12 points sur l'écran radar du navire chercheur. Portée : 5-10 milles nautiques. Autonomie : 96 heures. Minimum 2 SART à bord (SOLAS)."},
  ],
  en:[
    {q:"On what frequency does the EPIRB transmit its distress signal?",opts:["121.5 MHz (old standard)","406 MHz — COSPAS-SARSAT global standard","156.8 MHz (VHF Channel 16)","2182 kHz (HF)"],correct:1,expl:"Modern EPIRB transmits on 406 MHz to COSPAS-SARSAT satellites. This frequency enables precise GPS location (< 100m) and reception in less than 90 minutes anywhere in the world. The old 121.5 MHz is no longer monitored by satellite since 2009."},
    {q:"The SOLAS general abandon ship alarm is:",opts:["3 short + 1 long","5 short blasts","7 short blasts + 1 long blast","1 continuous long blast"],correct:2,expl:"SOLAS general alarm = 7 short + 1 long blast. Means: 'All hands to muster stations with life jackets'. Distinct from fire alarm (continuous signal) and fog signal. Mandatory knowledge for all crew."},
    {q:"The HRU (Hydrostatic Release Unit) of a liferaft:",opts:["Must be manually activated","Automatically releases the liferaft if vessel sinks to 1.5-4m depth","Is mandatory only on passenger ships","Protects the liferaft from impacts"],correct:1,expl:"HRU = hydrostatic release device. When vessel sinks, water pressure at 1.5-4m triggers the HRU → releases raft → raft floats to surface → automatically inflates. Works even if crew is unconscious. Replacement every 2 years MANDATORY."},
    {q:"Who gives the order to abandon ship?",opts:["Chief officer","Chief engineer","Captain ONLY","Officer of the watch"],correct:2,expl:"Abandon ship order = CAPTAIN ONLY. No other officer can give this order. Captain leaves the vessel LAST (SOLAS + ISM Code). Costa Concordia demonstrated the dramatic consequences of violating this rule."},
    {q:"The SART (Search And Rescue Transponder) operates on what radar frequency?",opts:["VHF 156 MHz","9 GHz (X-band radar)","406 MHz (satellite)","2182 kHz (HF)"],correct:1,expl:"SART = radar transponder on 9 GHz (X-band). When a radar sweeps the area, the SART responds by displaying a series of 12 dots on the searching vessel's radar screen. Range: 5-10 nautical miles. Autonomy: 96 hours. Minimum 2 SART on board (SOLAS)."},
  ],
  es:[
    {q:"¿En qué frecuencia emite el EPIRB su señal de socorro?",opts:["121,5 MHz (antiguo estándar)","406 MHz — estándar mundial COSPAS-SARSAT","156,8 MHz (Canal 16 VHF)","2182 kHz (HF)"],correct:1,expl:"El EPIRB moderno emite en 406 MHz hacia los satélites COSPAS-SARSAT. Esta frecuencia permite una localización precisa por GPS (< 100m) y una recepción en menos de 90 minutos en cualquier lugar del mundo. El antiguo 121,5 MHz ya no está vigilado por satélite desde 2009."},
    {q:"La alarma general de abandono del buque según SOLAS es:",opts:["3 cortos + 1 largo","5 pitidos cortos","7 pitidos cortos + 1 pitido largo","1 pitido largo continuo"],correct:2,expl:"Alarma general SOLAS = 7 cortos + 1 largo. Significa: 'Todo el mundo al punto de reunión con chaleco salvavidas'. Se distingue de la alarma de incendio (señal continua) y de la señal de niebla. Conocimiento obligatorio para toda la tripulación."},
    {q:"La ULH (Unidad de Largado Hidrostático) de una balsa salvavidas:",opts:["Debe accionarse manualmente","Libera automáticamente la balsa si el buque se hunde a 1,5-4m de profundidad","Es obligatoria solo en buques de pasaje","Protege la balsa contra los golpes"],correct:1,expl:"ULH = dispositivo de largado hidrostático. Cuando el buque se hunde, la presión del agua a 1,5-4m acciona el ULH → libera la balsa → la balsa sube a la superficie → se infla automáticamente. Funciona aunque la tripulación esté inconsciente. Sustitución cada 2 años OBLIGATORIA."},
    {q:"¿Quién da la orden de abandono del buque?",opts:["El oficial de guardia","El jefe de máquinas","El capitán ÚNICAMENTE","El oficial de guardia"],correct:2,expl:"La orden de abandono = CAPITÁN ÚNICAMENTE. Ningún otro oficial puede dar esta orden. El capitán abandona el buque EL ÚLTIMO (SOLAS + Código ISM). El Costa Concordia demostró las dramáticas consecuencias de no respetar esta regla."},
    {q:"El SART (Search And Rescue Transponder) funciona en qué frecuencia de radar?",opts:["VHF 156 MHz","9 GHz (banda X radar)","406 MHz (satélite)","2182 kHz (HF)"],correct:1,expl:"SART = transpondedor de radar en 9 GHz (banda X). Cuando un radar barre la zona, el SART responde mostrando una serie de 12 puntos en la pantalla radar del buque buscador. Alcance: 5-10 millas náuticas. Autonomía: 96 horas. Mínimo 2 SART a bordo (SOLAS)."},
  ],
  pt:[
    {q:"Em que frequência o EPIRB emite o seu sinal de socorro?",opts:["121,5 MHz (antigo padrão)","406 MHz — padrão mundial COSPAS-SARSAT","156,8 MHz (Canal 16 VHF)","2182 kHz (HF)"],correct:1,expl:"O EPIRB moderno emite em 406 MHz para os satélites COSPAS-SARSAT. Esta frequência permite uma localização precisa por GPS (< 100m) e receção em menos de 90 minutos em qualquer parte do mundo. O antigo 121,5 MHz já não é monitorizado por satélite desde 2009."},
    {q:"O alarme geral de abandono do navio segundo o SOLAS é:",opts:["3 curtos + 1 longo","5 toques curtos","7 toques curtos + 1 toque longo","1 toque longo contínuo"],correct:2,expl:"Alarme geral SOLAS = 7 curtos + 1 longo. Significa: 'Toda a gente aos postos de reunião com colete salva-vidas'. Distingue-se do alarme de incêndio (sinal contínuo) e do sinal de nevoeiro. Conhecimento obrigatório para toda a tripulação."},
    {q:"A ULH (Unidade de Largação Hidrostática) de uma balsa salva-vidas:",opts:["Deve ser acionada manualmente","Liberta automaticamente a balsa se o navio afundar a 1,5-4m de profundidade","É obrigatória apenas em navios de passageiros","Protege a balsa contra impactos"],correct:1,expl:"ULH = dispositivo de largação hidrostática. Quando o navio afunda, a pressão da água a 1,5-4m aciona a ULH → liberta a balsa → a balsa sobe à superfície → infla automaticamente. Funciona mesmo com tripulação inconsciente. Substituição a cada 2 anos OBRIGATÓRIA."},
    {q:"Quem dá a ordem de abandono do navio?",opts:["O oficial de quarto","O chefe de máquinas","O capitão APENAS","O oficial de serviço"],correct:2,expl:"A ordem de abandono = CAPITÃO APENAS. Nenhum outro oficial pode dar esta ordem. O capitão abandona o navio O ÚLTIMO (SOLAS + Código ISM). O Costa Concordia demonstrou as dramáticas consequências de não respeitar esta regra."},
    {q:"O SART (Search And Rescue Transponder) funciona em que frequência de radar?",opts:["VHF 156 MHz","9 GHz (banda X radar)","406 MHz (satélite)","2182 kHz (HF)"],correct:1,expl:"SART = transpondedor de radar em 9 GHz (banda X). Quando um radar varre a zona, o SART responde mostrando uma série de 12 pontos no ecrã radar do navio buscador. Alcance: 5-10 milhas náuticas. Autonomia: 96 horas. Mínimo 2 SART a bordo (SOLAS)."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que le GMDSS (Global Maritime Distress and Safety System) ?",opts:["Un type de radar","Système mondial de détresse et de sécurité en mer — ensemble d'équipements radio obligatoires sur tous les navires","Un type de GPS","Un système de navigation automatique"],correct:1,expl:"GMDSS = ensemble de systèmes radio obligatoires (SOLAS) : VHF DSC Canal 70 · EPIRB 406 MHz · SART · Navtex · Radio MF/HF. Remplace le traditionnel SOS en morse. Permet l'alerte automatique de détresse, la coordination SAR, la diffusion des informations météo et de sécurité."},
    {q:"Qu'est-ce que le MAYDAY et comment l'émettre ?",opts:["Un code météo","Signal vocal de détresse : 'MAYDAY MAYDAY MAYDAY + nom navire + position + nature détresse + personnes à bord + type aide demandée' sur Canal 16 VHF","Un signal lumineux","Un signal radar"],correct:1,expl:"MAYDAY = signal vocal de détresse (du français 'm'aidez'). Émis sur Canal 16 VHF (156,8 MHz). Format : MAYDAY × 3 + nom navire × 3 + position + nature + nombre personnes + demande. Priorité absolue sur toutes les communications. Réponse obligatoire de tous navires."},
    {q:"Qu'est-ce que le SAR (Search And Rescue) ?",opts:["Un type de radar","Recherche et sauvetage — coordination internationale des opérations de secours en mer","Un signal de détresse","Un type d'équipement"],correct:1,expl:"SAR = Search And Rescue. Système international coordonné de recherche et sauvetage en mer. Chaque pays a un MRCC (Maritime Rescue Coordination Centre). La Convention SAR (1979) divise les océans en zones SAR dont chaque pays est responsable. Déclenché par MAYDAY ou EPIRB."},
    {q:"Quelle est la durée de vie d'un gilet de sauvetage selon SOLAS ?",opts:["5 ans","10 ans maximum (avec inspection annuelle)","15 ans","Illimitée si bien entretenu"],correct:1,expl:"Gilet de sauvetage : durée de vie maximale 10 ans. Inspection mensuelle obligatoire (vérifier : pression de gonflage, lumière, sifflet, état général, étanchéité). Remplacement obligatoire à l'expiration même si état apparent bon."},
    {q:"Combien de radeaux de sauvetage doit-on avoir minimum à bord ?",opts:["1 radeau total","Assez pour 100% de l'équipage de chaque côté du navire","1 radeau par côté","Assez pour 50% de l'équipage"],correct:1,expl:"SOLAS : radeaux de sauvetage suffisants pour 100% des personnes à bord de CHAQUE côté du navire. Si le navire gîte et que les canots d'un côté sont inaccessibles, les radeaux de l'autre côté doivent suffire. Chaque radeau doit avoir une capacité maximale de 25 personnes."},
    {q:"Qu'est-ce qu'un 'painter line' d'un radeau de sauvetage ?",opts:["La couleur du radeau","Le câble de rétention reliant le radeau au navire — déclenche le gonflage et maintient le radeau à côté jusqu'à ce qu'on le coupe","La corde d'échelle","Le câble de remorquage"],correct:1,expl:"Painter line = câble de rétention attachant le radeau au navire. Quand le navire coule : HRU libère le radeau → le radeau monte → le painter line tire sur la goupille de gonflage → radeau se gonfle. Si le navire coule complètement, le painter line se casse (ou doit être coupé) pour libérer le radeau. ⚠️ Ne JAMAIS couper avant le gonflage."},
    {q:"Quelle est la flottabilité minimale d'un gilet de sauvetage adulte ?",opts:["75 Newtons","100 Newtons","150 Newtons minimum (SOLAS)","200 Newtons"],correct:2,expl:"SOLAS : flottabilité minimale d'un gilet de sauvetage adulte = 150 Newtons. Assure que le naufragé reste en surface, face vers le haut, même inconscient. Les gilets de classe III (loisir) ont souvent moins de 100N → insuffisants pour usage professionnel maritime."},
    {q:"Qu'est-ce que le 'NAVTEX' dans le système GMDSS ?",opts:["Un type de radar","Système d'émission automatique d'informations de sécurité maritime (météo, NAV warnings, SAR)","Un type d'EPIRB","Un signal lumineux"],correct:1,expl:"NAVTEX = Navigational Telex. Émet automatiquement les informations de sécurité maritime sur 518 kHz (en anglais) et 490 kHz (en langue nationale) : bulletins météo, avis aux navigateurs (NAV warnings), messages SAR. Récepteur NAVTEX obligatoire sur tous navires en zone A2+ (GMDSS)."},
    {q:"Qu'est-ce que la 'zone A1' du GMDSS ?",opts:["Toutes les eaux mondiales","Zone couverte par les stations VHF côtières avec DSC — dans les 20-30 milles des côtes","Zone polaire","Zone de l'Atlantique Nord"],correct:1,expl:"Zones GMDSS : A1 = portée VHF avec DSC (20-30 milles côtes). A2 = portée MF avec DSC (150-200 milles). A3 = portée satellite INMARSAT (70°N - 70°S). A4 = zones polaires (HF). Chaque zone exige des équipements spécifiques à bord."},
    {q:"Un canot de sauvetage fermé (totally enclosed lifeboat) doit résister à quoi ?",opts:["Seulement au feu","Submersion totale, feu, chavirement — et se redresser automatiquement","Seulement aux vagues","Seulement aux températures extrêmes"],correct:1,expl:"Canot totalement fermé (SOLAS) : résiste à la submersion 24h, au passage dans un incendie, au chavirement (redressement automatique), aux chocs, aux températures extrêmes (-30°C à +65°C). Moteur diesel autonome. Provisions pour 3 jours. Test de mise à l'eau mensuel obligatoire."},
    {q:"Qu'est-ce qu'un 'abandon ship drill' (exercice d'abandon) ?",opts:["Un exercice de navigation","Simulation d'abandon du navire : alarme + rassemblement + vérification équipements + mise à l'eau embarcations","Un exercice de lutte contre l'incendie","Un test radio"],correct:1,expl:"Abandon ship drill = simulation d'abandon mensuelle (SOLAS). Contenu : alarme générale → rassemblement au poste → vérification gilets → test équipements → mise à l'eau effective des canots (ou test des faux-bras). Obligatoire dans les 24h après l'appareillage pour les nouveaux membres d'équipage."},
    {q:"Qu'est-ce que le Canal 16 VHF en navigation maritime ?",opts:["Canal de musique à bord","Canal international de veille et de détresse — surveillé en permanence par tous les navires et les gardes-côtes","Canal météo","Canal d'amarrage"],correct:1,expl:"Canal 16 VHF (156,8 MHz) = canal international de veille obligatoire. Utilisé pour : appels de détresse (MAYDAY), communications de sécurité (SECURITE), communications urgentes (PAN PAN), établir le contact avant de passer sur un autre canal. Obligation de veille permanente (SOLAS/GMDSS)."},
    {q:"Quelle est la différence entre EPIRB et PLB ?",opts:["Même équipement","EPIRB = équipement de navire (enregistré au navire) · PLB = Personal Locator Beacon (portatif, enregistré à la personne)","EPIRB = terrestre · PLB = maritime","EPIRB = plus ancien"],correct:1,expl:"EPIRB (Emergency Position Indicating Radio Beacon) = enregistré au navire, activé automatiquement si navire coule ou manuellement. PLB (Personal Locator Beacon) = portatif, enregistré à la personne, activé manuellement uniquement. Les deux émettent sur 406 MHz. Le PLB est idéal pour les personnes travaillant en mer."},
    {q:"Qu'est-ce que l'hypothermie en mer et comment la prévenir ?",opts:["Une maladie digestive","Chute dangereuse de la température corporelle due à l'immersion en eau froide — préventions : combinaison de survie, groupe serré, ne pas nager","Une brûlure solaire","Un mal de mer"],correct:1,expl:"Hypothermie = température corporelle < 35°C. En eau à 10°C : incapacité en 30-40 min, mort en 1-2 heures. Préventions : 1) Combinaison de survie (augmente survie à 6h+). 2) Rester groupé (chaleur partagée). 3) Position HELP (Heat Escape Lessening Posture). 4) Ne pas nager (accélère le refroidissement). 5) Monter dans le radeau dès que possible."},
    {q:"Qu'est-ce que le 'DSC' (Digital Selective Calling) du GMDSS ?",opts:["Un type de satellite","Appel Sélectif Numérique — permet d'émettre automatiquement une alarme de détresse codée avec position et MMSI sur Canal 70 VHF","Un type de radar","Un système de navigation"],correct:1,expl:"DSC = Digital Selective Calling. Permet d'envoyer automatiquement un message de détresse numérique sur Canal 70 VHF contenant : MMSI (identifiant du navire), nature de la détresse, position GPS, heure. Reçu automatiquement par tous navires et garde-côtes. Déclenché par bouton rouge sur la VHF DSC."},
  ],
  en:[
    {q:"What is the GMDSS (Global Maritime Distress and Safety System)?",opts:["A type of radar","Global maritime distress and safety system — mandatory radio equipment on all vessels","A type of GPS","An automatic navigation system"],correct:1,expl:"GMDSS = mandatory radio systems (SOLAS): VHF DSC Channel 70 · EPIRB 406 MHz · SART · Navtex · MF/HF Radio. Replaces traditional SOS in Morse. Enables automatic distress alerting, SAR coordination, weather and safety information broadcast."},
    {q:"What is MAYDAY and how is it transmitted?",opts:["A weather code","Vocal distress signal: 'MAYDAY MAYDAY MAYDAY + vessel name + position + nature + persons aboard + assistance requested' on VHF Channel 16","A light signal","A radar signal"],correct:1,expl:"MAYDAY = vocal distress signal (from French 'm'aidez'). Transmitted on VHF Channel 16 (156.8 MHz). Format: MAYDAY × 3 + vessel name × 3 + position + nature + persons + request. Absolute priority over all communications. Mandatory response from all vessels."},
    {q:"What is SAR (Search And Rescue)?",opts:["A type of radar","Search and rescue — international coordination of maritime rescue operations","A distress signal","A type of equipment"],correct:1,expl:"SAR = Search And Rescue. International coordinated maritime search and rescue system. Each country has a MRCC (Maritime Rescue Coordination Centre). The SAR Convention (1979) divides oceans into SAR zones each country is responsible for. Triggered by MAYDAY or EPIRB."},
    {q:"What is the service life of a SOLAS life jacket?",opts:["5 years","10 years maximum (with annual inspection)","15 years","Unlimited if well maintained"],correct:1,expl:"Life jacket: maximum service life 10 years. Monthly inspection mandatory (check: inflation pressure, light, whistle, general condition, waterproofing). Mandatory replacement at expiry even if apparently in good condition."},
    {q:"How many liferafts must be carried minimum on board?",opts:["1 total","Enough for 100% of persons on board from each side of vessel","1 per side","Enough for 50% of persons"],correct:1,expl:"SOLAS: liferafts sufficient for 100% of persons on board from EACH side of vessel. If vessel heels and one side lifeboats are inaccessible, the other side liferafts must suffice. Each liferaft maximum capacity 25 persons."},
    {q:"What is a liferaft 'painter line'?",opts:["The raft color","The retention cable connecting raft to vessel — triggers inflation and keeps raft alongside until cut","The ladder rope","The tow cable"],correct:1,expl:"Painter line = retention cable attaching raft to vessel. When vessel sinks: HRU releases raft → raft floats up → painter line pulls inflation pin → raft inflates. If vessel sinks completely, painter line breaks (or must be cut) to free raft. ⚠️ NEVER cut before inflation."},
    {q:"Minimum buoyancy of an adult SOLAS life jacket?",opts:["75 Newtons","100 Newtons","150 Newtons minimum (SOLAS)","200 Newtons"],correct:2,expl:"SOLAS: minimum buoyancy for adult life jacket = 150 Newtons. Ensures survivor stays afloat, face up, even unconscious. Class III leisure jackets often have less than 100N → insufficient for professional maritime use."},
    {q:"What is NAVTEX in the GMDSS system?",opts:["A type of radar","Automatic maritime safety information broadcast system (weather, NAV warnings, SAR)","A type of EPIRB","A light signal"],correct:1,expl:"NAVTEX = Navigational Telex. Automatically broadcasts maritime safety information on 518 kHz (English) and 490 kHz (national language): weather bulletins, navigational warnings, SAR messages. Mandatory NAVTEX receiver on all vessels in zone A2+ (GMDSS)."},
    {q:"What is GMDSS 'zone A1'?",opts:["All global waters","Zone covered by coastal VHF DSC stations — within 20-30 miles of coast","Polar zone","North Atlantic zone"],correct:1,expl:"GMDSS zones: A1 = VHF DSC coverage (20-30 miles coast). A2 = MF DSC coverage (150-200 miles). A3 = INMARSAT satellite coverage (70°N - 70°S). A4 = polar zones (HF). Each zone requires specific on-board equipment."},
    {q:"A totally enclosed lifeboat must resist what?",opts:["Fire only","Total submersion, fire, capsizing — and self-right automatically","Waves only","Extreme temperatures only"],correct:1,expl:"Totally enclosed lifeboat (SOLAS): resists 24h submersion, passage through fire, capsizing (self-righting), impacts, extreme temperatures (-30°C to +65°C). Autonomous diesel engine. 3-day provisions. Monthly lowering test mandatory."},
    {q:"What is an abandon ship drill?",opts:["A navigation exercise","Simulation of vessel abandonment: alarm + muster + equipment check + boat lowering","A fire fighting exercise","A radio test"],correct:1,expl:"Abandon ship drill = monthly simulation (SOLAS). Content: general alarm → muster at station → life jacket check → equipment test → actual boat lowering (or davit test). Mandatory within 24h of departure for new crew members."},
    {q:"What is VHF Channel 16 in maritime navigation?",opts:["On-board music channel","International watch and distress channel — permanently monitored by all vessels and coast guards","Weather channel","Berthing channel"],correct:1,expl:"VHF Channel 16 (156.8 MHz) = mandatory international watch channel. Used for: distress calls (MAYDAY), safety communications (SECURITE), urgent communications (PAN PAN), establishing contact before switching channels. Mandatory continuous watch (SOLAS/GMDSS)."},
    {q:"What is the difference between EPIRB and PLB?",opts:["Same equipment","EPIRB = vessel equipment (registered to vessel) · PLB = Personal Locator Beacon (portable, registered to person)","EPIRB = land · PLB = maritime","EPIRB = older"],correct:1,expl:"EPIRB (Emergency Position Indicating Radio Beacon) = registered to vessel, activates automatically if vessel sinks or manually. PLB (Personal Locator Beacon) = portable, registered to person, manual activation only. Both transmit on 406 MHz. PLB ideal for persons working at sea."},
    {q:"What is hypothermia at sea and how to prevent it?",opts:["A digestive illness","Dangerous drop in body temperature due to cold water immersion — prevention: immersion suit, stay grouped, don't swim","A sunburn","Seasickness"],correct:1,expl:"Hypothermia = body temperature < 35°C. In 10°C water: incapacity in 30-40 min, death in 1-2 hours. Prevention: 1) Immersion suit (increases survival to 6h+). 2) Stay grouped (shared warmth). 3) HELP position (Heat Escape Lessening Posture). 4) Don't swim (accelerates cooling). 5) Board raft as soon as possible."},
    {q:"What is DSC (Digital Selective Calling) in GMDSS?",opts:["A type of satellite","Digital Selective Calling — automatically transmits coded distress alert with position and MMSI on VHF Channel 70","A type of radar","A navigation system"],correct:1,expl:"DSC = Digital Selective Calling. Automatically sends digital distress message on VHF Channel 70 containing: MMSI (vessel identifier), distress nature, GPS position, time. Automatically received by all vessels and coast guards. Triggered by red button on DSC VHF."},
  ],
  es:[
    {q:"¿Qué es el GMDSS (Sistema Mundial de Socorro y Seguridad Marítimos)?",opts:["Un tipo de radar","Sistema mundial de socorro y seguridad en el mar — conjunto de equipos radio obligatorios en todos los buques","Un tipo de GPS","Un sistema de navegación automática"],correct:1,expl:"GMDSS = sistemas radio obligatorios (SOLAS): VHF DSC Canal 70 · EPIRB 406 MHz · SART · Navtex · Radio MF/HF. Sustituye el tradicional SOS en morse. Permite la alerta automática de socorro, coordinación SAR, difusión de información meteorológica y de seguridad."},
    {q:"¿Qué es el MAYDAY y cómo se emite?",opts:["Un código meteorológico","Señal vocal de socorro: 'MAYDAY MAYDAY MAYDAY + nombre buque + posición + naturaleza + personas a bordo + ayuda solicitada' en Canal 16 VHF","Una señal luminosa","Una señal de radar"],correct:1,expl:"MAYDAY = señal vocal de socorro. Emitido en Canal 16 VHF (156,8 MHz). Formato: MAYDAY × 3 + nombre buque × 3 + posición + naturaleza + número personas + petición. Prioridad absoluta. Respuesta obligatoria de todos los buques."},
    {q:"¿Qué es el SAR (Search And Rescue)?",opts:["Un tipo de radar","Búsqueda y rescate — coordinación internacional de las operaciones de socorro en el mar","Una señal de socorro","Un tipo de equipo"],correct:1,expl:"SAR = Búsqueda y Rescate. Sistema internacional coordinado de búsqueda y salvamento marítimo. Cada país tiene un MRCC (Centro de Coordinación de Rescate Marítimo). El Convenio SAR (1979) divide los océanos en zonas SAR de las que cada país es responsable."},
    {q:"¿Cuál es la vida útil de un chaleco salvavidas SOLAS?",opts:["5 años","10 años máximo (con inspección anual)","15 años","Ilimitada si bien mantenido"],correct:1,expl:"Chaleco salvavidas: vida útil máxima 10 años. Inspección mensual obligatoria (verificar: presión de inflado, luz, silbato, estado general, estanqueidad). Sustitución obligatoria al vencimiento aunque el estado aparente sea bueno."},
    {q:"¿Cuántas balsas salvavidas debe haber como mínimo a bordo?",opts:["1 balsa total","Suficientes para el 100% de las personas a bordo de cada lado del buque","1 por banda","Suficientes para el 50%"],correct:1,expl:"SOLAS: balsas salvavidas suficientes para el 100% de las personas a bordo de CADA lado del buque. Si el buque escora y los botes de un lado son inaccesibles, las balsas del otro lado deben ser suficientes. Capacidad máxima de cada balsa: 25 personas."},
    {q:"¿Qué es el 'cabo del rabiza' de una balsa salvavidas?",opts:["El color de la balsa","El cable de retención que une la balsa al buque — activa el inflado y mantiene la balsa a bordo hasta que se corta","La escala de cuerda","El cable de remolque"],correct:1,expl:"Cabo del rabiza = cable de retención que une la balsa al buque. Cuando el buque se hunde: ULH libera la balsa → la balsa sube → el cabo tira del pasador de inflado → la balsa se infla. Si el buque se hunde completamente, el cabo se rompe (o debe cortarse). ⚠️ NUNCA cortar antes del inflado."},
    {q:"¿Cuál es la flotabilidad mínima de un chaleco salvavidas adulto SOLAS?",opts:["75 Newtons","100 Newtons","150 Newtons mínimo (SOLAS)","200 Newtons"],correct:2,expl:"SOLAS: flotabilidad mínima del chaleco adulto = 150 Newtons. Garantiza que el náufrago flote en superficie, boca arriba, incluso inconsciente. Los chalecos de clase III (ocio) suelen tener menos de 100N → insuficientes para uso profesional marítimo."},
    {q:"¿Qué es el NAVTEX en el sistema GMDSS?",opts:["Un tipo de radar","Sistema de emisión automática de información de seguridad marítima (meteorología, avisos NAV, SAR)","Un tipo de EPIRB","Una señal luminosa"],correct:1,expl:"NAVTEX = Télex de Navegación. Emite automáticamente información de seguridad marítima en 518 kHz (inglés) y 490 kHz (idioma nacional): boletines meteorológicos, avisos a los navegantes, mensajes SAR. Receptor NAVTEX obligatorio en zona A2+ (GMDSS)."},
    {q:"¿Qué es la 'zona A1' del GMDSS?",opts:["Todas las aguas del mundo","Zona cubierta por estaciones VHF costeras con DSC — dentro de las 20-30 millas de la costa","Zona polar","Zona del Atlántico Norte"],correct:1,expl:"Zonas GMDSS: A1 = cobertura VHF DSC (20-30 millas costa). A2 = cobertura MF DSC (150-200 millas). A3 = cobertura satélite INMARSAT (70°N - 70°S). A4 = zonas polares (HF). Cada zona exige equipos específicos a bordo."},
    {q:"¿Un bote salvavidas totalmente cerrado debe resistir qué?",opts:["Solo el fuego","Inmersión total, fuego, vuelco — y autoendrizarse automáticamente","Solo las olas","Solo temperaturas extremas"],correct:1,expl:"Bote totalmente cerrado (SOLAS): resiste inmersión 24h, paso por un incendio, vuelco (autoendrizamiento), golpes, temperaturas extremas (-30°C a +65°C). Motor diesel autónomo. Provisiones para 3 días. Prueba mensual de arriado obligatoria."},
    {q:"¿Qué es un 'ejercicio de abandono del buque'?",opts:["Un ejercicio de navegación","Simulación de abandono: alarma + punto de reunión + verificación equipos + arriado embarcaciones","Un ejercicio contraincendios","Un test de radio"],correct:1,expl:"Ejercicio de abandono = simulación mensual (SOLAS). Contenido: alarma general → reunión en el puesto → verificación chalecos → prueba equipos → arriado efectivo de los botes (o prueba de pescantes). Obligatorio en las 24h tras la salida para nuevos miembros de tripulación."},
    {q:"¿Qué es el Canal 16 VHF en navegación marítima?",opts:["Canal de música a bordo","Canal internacional de escucha y socorro — vigilado permanentemente por todos los buques y guardacostas","Canal meteorológico","Canal de amarre"],correct:1,expl:"Canal 16 VHF (156,8 MHz) = canal internacional de escucha obligatoria. Usado para: llamadas de socorro (MAYDAY), comunicaciones de seguridad (SECURITE), comunicaciones urgentes (PAN PAN), establecer contacto. Obligación de escucha permanente (SOLAS/GMDSS)."},
    {q:"¿Cuál es la diferencia entre EPIRB y PLB?",opts:["El mismo equipo","EPIRB = equipo del buque (registrado al buque) · PLB = Baliza de Localización Personal (portátil, registrada a la persona)","EPIRB = terrestre · PLB = marítimo","EPIRB = más antiguo"],correct:1,expl:"EPIRB = registrado al buque, se activa automáticamente si el buque se hunde o manualmente. PLB = portátil, registrado a la persona, solo activación manual. Ambos emiten en 406 MHz. El PLB es ideal para personas que trabajan en el mar."},
    {q:"¿Qué es la hipotermia en el mar y cómo prevenirla?",opts:["Una enfermedad digestiva","Caída peligrosa de la temperatura corporal por inmersión en agua fría — prevención: traje de inmersión, agruparse, no nadar","Una quemadura solar","El mareo"],correct:1,expl:"Hipotermia = temperatura corporal < 35°C. En agua a 10°C: incapacidad en 30-40 min, muerte en 1-2 horas. Prevención: 1) Traje de inmersión (aumenta supervivencia a 6h+). 2) Agruparse. 3) Posición HELP. 4) No nadar. 5) Subir a la balsa lo antes posible."},
    {q:"¿Qué es el DSC (Digital Selective Calling) del GMDSS?",opts:["Un tipo de satélite","Llamada Selectiva Digital — permite emitir automáticamente una alarma de socorro codificada con posición y MMSI en Canal 70 VHF","Un tipo de radar","Un sistema de navegación"],correct:1,expl:"DSC = Llamada Selectiva Digital. Envía automáticamente un mensaje de socorro digital en Canal 70 VHF con: MMSI (identificador del buque), naturaleza del socorro, posición GPS, hora. Recibido automáticamente por todos los buques y guardacostas. Se activa con botón rojo en la VHF DSC."},
  ],
  pt:[
    {q:"O que é o GMDSS (Sistema Mundial de Socorro e Segurança Marítimos)?",opts:["Um tipo de radar","Sistema mundial de socorro e segurança marítimos — conjunto de equipamentos rádio obrigatórios em todos os navios","Um tipo de GPS","Um sistema de navegação automática"],correct:1,expl:"GMDSS = sistemas rádio obrigatórios (SOLAS): VHF DSC Canal 70 · EPIRB 406 MHz · SART · Navtex · Rádio MF/HF. Substitui o tradicional SOS em morse. Permite o alerta automático de socorro, coordenação SAR, difusão de informação meteorológica e de segurança."},
    {q:"O que é o MAYDAY e como é transmitido?",opts:["Um código meteorológico","Sinal vocal de socorro: 'MAYDAY MAYDAY MAYDAY + nome navio + posição + natureza + pessoas a bordo + ajuda solicitada' no Canal 16 VHF","Um sinal luminoso","Um sinal de radar"],correct:1,expl:"MAYDAY = sinal vocal de socorro (do francês 'm'aidez'). Transmitido no Canal 16 VHF (156,8 MHz). Formato: MAYDAY × 3 + nome navio × 3 + posição + natureza + pessoas + pedido. Prioridade absoluta. Resposta obrigatória de todos os navios."},
    {q:"O que é o SAR (Search And Rescue)?",opts:["Um tipo de radar","Busca e salvamento — coordenação internacional das operações de socorro marítimo","Um sinal de socorro","Um tipo de equipamento"],correct:1,expl:"SAR = Busca e Salvamento. Sistema internacional coordenado de busca e salvamento marítimo. Cada país tem um MRCC (Centro de Coordenação de Resgate Marítimo). A Convenção SAR (1979) divide os oceanos em zonas SAR de que cada país é responsável."},
    {q:"Qual é a vida útil de um colete salva-vidas SOLAS?",opts:["5 anos","10 anos máximo (com inspeção anual)","15 anos","Ilimitada se bem conservado"],correct:1,expl:"Colete salva-vidas: vida útil máxima 10 anos. Inspeção mensal obrigatória (verificar: pressão de insuflação, luz, apito, estado geral, estanqueidade). Substituição obrigatória no vencimento mesmo com estado aparentemente bom."},
    {q:"Quantas balsas salva-vidas deve haver no mínimo a bordo?",opts:["1 balsa total","Suficientes para 100% das pessoas a bordo de cada lado do navio","1 por lado","Suficientes para 50%"],correct:1,expl:"SOLAS: balsas salva-vidas suficientes para 100% das pessoas a bordo de CADA lado do navio. Se o navio escorar e os botes de um lado forem inacessíveis, as balsas do outro lado devem ser suficientes. Capacidade máxima de cada balsa: 25 pessoas."},
    {q:"O que é o 'cabo de retenção' de uma balsa salva-vidas?",opts:["A cor da balsa","O cabo de retenção que liga a balsa ao navio — aciona a insuflação e mantém a balsa ao lado até ser cortado","A escada de corda","O cabo de reboque"],correct:1,expl:"Cabo de retenção = cabo que liga a balsa ao navio. Quando o navio afunda: ULH liberta a balsa → a balsa sobe → o cabo puxa o pino de insuflação → a balsa insufla. Se o navio afundar completamente, o cabo parte-se (ou deve ser cortado). ⚠️ NUNCA cortar antes da insuflação."},
    {q:"Flutuabilidade mínima de um colete salva-vidas adulto SOLAS?",opts:["75 Newtons","100 Newtons","150 Newtons mínimo (SOLAS)","200 Newtons"],correct:2,expl:"SOLAS: flutuabilidade mínima do colete adulto = 150 Newtons. Garante que o sobrevivente flutue à superfície, de face para cima, mesmo inconsciente. Os coletes de classe III (lazer) têm frequentemente menos de 100N → insuficientes para uso profissional marítimo."},
    {q:"O que é o NAVTEX no sistema GMDSS?",opts:["Um tipo de radar","Sistema de emissão automática de informação de segurança marítima (meteorologia, avisos NAV, SAR)","Um tipo de EPIRB","Um sinal luminoso"],correct:1,expl:"NAVTEX = Télex de Navegação. Emite automaticamente informação de segurança marítima em 518 kHz (inglês) e 490 kHz (língua nacional): boletins meteorológicos, avisos aos navegantes, mensagens SAR. Recetor NAVTEX obrigatório na zona A2+ (GMDSS)."},
    {q:"O que é a 'zona A1' do GMDSS?",opts:["Todas as águas mundiais","Zona coberta por estações VHF costeiras com DSC — dentro das 20-30 milhas da costa","Zona polar","Zona do Atlântico Norte"],correct:1,expl:"Zonas GMDSS: A1 = cobertura VHF DSC (20-30 milhas costa). A2 = cobertura MF DSC (150-200 milhas). A3 = cobertura satélite INMARSAT (70°N - 70°S). A4 = zonas polares (HF). Cada zona exige equipamentos específicos a bordo."},
    {q:"Um bote salva-vidas totalmente fechado deve resistir a quê?",opts:["Apenas ao fogo","Imersão total, fogo, capotamento — e endireitar-se automaticamente","Apenas às ondas","Apenas a temperaturas extremas"],correct:1,expl:"Bote totalmente fechado (SOLAS): resiste a imersão 24h, passagem por um incêndio, capotamento (auto-endireitamento), impactos, temperaturas extremas (-30°C a +65°C). Motor diesel autónomo. Provisões para 3 dias. Teste de arriamento mensal obrigatório."},
    {q:"O que é um 'exercício de abandono do navio'?",opts:["Um exercício de navegação","Simulação de abandono: alarme + reunião + verificação equipamentos + arriamento embarcações","Um exercício de combate a incêndio","Um teste de rádio"],correct:1,expl:"Exercício de abandono = simulação mensal (SOLAS). Conteúdo: alarme geral → reunião no posto → verificação coletes → teste equipamentos → arriamento efetivo dos botes (ou teste dos turcos). Obrigatório nas 24h após a partida para novos membros da tripulação."},
    {q:"O que é o Canal 16 VHF na navegação marítima?",opts:["Canal de música a bordo","Canal internacional de escuta e socorro — monitorizado permanentemente por todos os navios e guarda-costas","Canal meteorológico","Canal de atracagem"],correct:1,expl:"Canal 16 VHF (156,8 MHz) = canal internacional de escuta obrigatória. Usado para: chamadas de socorro (MAYDAY), comunicações de segurança (SECURITE), comunicações urgentes (PAN PAN), estabelecer contacto. Obrigação de escuta permanente (SOLAS/GMDSS)."},
    {q:"Qual é a diferença entre EPIRB e PLB?",opts:["O mesmo equipamento","EPIRB = equipamento do navio (registado no navio) · PLB = Baliza de Localização Pessoal (portátil, registada na pessoa)","EPIRB = terrestre · PLB = marítimo","EPIRB = mais antigo"],correct:1,expl:"EPIRB = registado no navio, ativa automaticamente se o navio afundar ou manualmente. PLB = portátil, registada na pessoa, apenas ativação manual. Ambos emitem em 406 MHz. O PLB é ideal para pessoas que trabalham no mar."},
    {q:"O que é a hipotermia no mar e como preveni-la?",opts:["Uma doença digestiva","Queda perigosa da temperatura corporal por imersão em água fria — prevenção: fato de imersão, agrupar-se, não nadar","Uma queimadura solar","Enjoo marítimo"],correct:1,expl:"Hipotermia = temperatura corporal < 35°C. Em água a 10°C: incapacidade em 30-40 min, morte em 1-2 horas. Prevenção: 1) Fato de imersão (aumenta sobrevivência para 6h+). 2) Manter-se agrupado. 3) Posição HELP. 4) Não nadar. 5) Subir para a balsa o mais depressa possível."},
    {q:"O que é o DSC (Digital Selective Calling) do GMDSS?",opts:["Um tipo de satélite","Chamada Seletiva Digital — permite emitir automaticamente um alerta de socorro codificado com posição e MMSI no Canal 70 VHF","Um tipo de radar","Um sistema de navegação"],correct:1,expl:"DSC = Chamada Seletiva Digital. Envia automaticamente uma mensagem de socorro digital no Canal 70 VHF com: MMSI (identificador do navio), natureza do socorro, posição GPS, hora. Recebido automaticamente por todos os navios e guarda-costas. Acionado pelo botão vermelho no VHF DSC."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);if(onComplete)onComplete();}};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.blue2},${C.teal})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.blue2},${C.teal})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
    </div>
  );
}

function Stars(){const s=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue2},${C.teal})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d = {
    fr:{
      badge:"🛟 Module Machine · Leçon 5/8 · ⭐ Premium · 200 XP",
      title:"Sauvetage, EPIRB, SART & Abandon du Navire",
      intro:"En mer, survivre dépend de la rapidité et de l'organisation. Un équipage bien formé qui connaît ses équipements et ses procédures peut faire la différence entre la vie et la mort.\n\nCette leçon couvre les équipements de survie, l'EPIRB, le SART, les embarcations et la procédure d'abandon.",
      p1:"PARTIE 1 — ÉQUIPEMENTS DE SURVIE",s1t:"Gilets · Combinaisons · Bouées · EPIRB · SART · Fusées",
      s1:"ÉQUIPEMENTS INDIVIDUELS :\nGilet de sauvetage : 150N · lumière + sifflet · 10 ans\nCombinaison de survie : hypothermie < 15°C · 6h+ survie\nBouée de sauvetage : ligne 30m · lumière auto\n\nÉQUIPEMENTS DE LOCALISATION :\nEPIRB : 406 MHz · satellite COSPAS-SARSAT · GPS intégré\n→ Signal reçu en < 90 minutes · portée mondiale\nSART : 9 GHz · bande X radar · 5-10 milles\n→ 12 points sur radar navire secouriste\nFusées : parachute (nuit) · fumée (jour) · durée 3 ans",
      p2:"PARTIE 2 — SIMULATEUR EPIRB + SART",s2t:"Activation et suivi du signal de détresse",
      s2:"EPIRB — COMMENT ÇA MARCHE :\n1. Activation (auto à l'eau ou manuelle)\n2. Signal 406 MHz → satellite COSPAS-SARSAT\n3. Satellite localise par GPS (<100m précision)\n4. MRCC alerté (Maritime Rescue Coordination Centre)\n5. Secours dépêchés (hélicoptère, navire)\nTemps total : < 90 minutes n'importe où dans le monde\n\nSART — COMMENT ÇA MARCHE :\nActivation manuelle → émet sur 9 GHz\nSi un radar X-band balaie la zone :\n→ SART répond → 12 points sur l'écran radar\n→ Points de plus en plus rapprochés = on s'approche\n\n⚠️ FAUSSE ALERTE EPIRB = amende sévère + frais SAR",
      p3:"PARTIE 3 — EMBARCATIONS DE SAUVETAGE",s3t:"Canots · Radeaux · HRU · Canot de secours",
      s3:"CANOT DE SAUVETAGE FERMÉ (SOLAS) :\nTotalement fermé · auto-redressable · moteur diesel\n100-150 personnes · provisions 3 jours\nRésiste au feu et à la submersion\nTest de mise à l'eau MENSUEL\n\nRADEAU DE SAUVETAGE :\nGonflage automatique par HRU (1,5-4m profondeur)\nCapacité : 6 à 25 personnes\nHRU = remplacer tous les 2 ans\nInspection tous les 12 mois\n\nCANOT DE SECOURS :\nRécupération homme à la mer\nVitesse 6 kn minimum · 5 personnes",
      p4:"PARTIE 4 — PROCÉDURE D'ABANDON",s4t:"5 étapes — de l'alarme à l'évacuation",
      s4:"ORDRE IMPÉRATIF : SOLAS\n→ Alarme générale : 7 sons courts + 1 long\n→ Gilet de sauvetage AVANT de quitter la cabine\n→ Poste de rassemblement : calme et ordre\n→ MAYDAY sur Canal 16 VHF + EPIRB\n→ Ordre d'abandon : CAPITAINE UNIQUEMENT\n→ Capitaine quitte LE DERNIER\n\nGMDSS :\nMAYDAY × 3 + nom + position + nature + nb personnes\nCanal 16 VHF (156,8 MHz)\nDSC Canal 70 (alerte numérique automatique)\nEPIRB + SART activés",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 5 MACHINE",
      sumP:["EPIRB : 406 MHz · COSPAS-SARSAT · < 90 min · mondial","SART : 9 GHz · bande X · 12 points sur radar · 5-10 mn","Gilet 150N · 10 ans · combinaison survie 6h+","HRU : largage auto à 1,5-4m · remplacer tous les 2 ans","Alarme abandon : 7 courts + 1 long (SOLAS)","Capitaine = DERNIER à quitter (SOLAS + Code ISM)","MAYDAY : Canal 16 VHF · DSC Canal 70","Costa Concordia → formation + procédures = VIES"],
      learnedP:["EPIRB 406MHz · SART 9GHz · signaux de détresse","HRU auto 1,5-4m · radeaux 12 mois · canots mensuels","Alarme abandon 7+1 · capitaine dernier","MAYDAY Canal 16 · DSC Canal 70 · GMDSS","Costa Concordia → formation = vies sauvées"],
    },
    en:{
      badge:"🛟 Engine Module · Lesson 5/8 · ⭐ Premium · 200 XP",
      title:"Survival, EPIRB, SART & Abandon Ship",
      intro:"At sea, survival depends on speed and organization. A well-trained crew that knows its equipment and procedures can make the difference between life and death.",
      p1:"PART 1 — SURVIVAL EQUIPMENT",s1t:"Life jackets · Suits · Buoys · EPIRB · SART · Flares",
      s1:"PERSONAL EQUIPMENT:\nLife jacket: 150N · light + whistle · 10 years\nImmersion suit: hypothermia < 15°C · 6h+ survival\nLife buoy: 30m line · auto light\n\nLOCATION EQUIPMENT:\nEPIRB: 406 MHz · COSPAS-SARSAT · GPS integrated\n→ Signal received in < 90 min · worldwide range\nSART: 9 GHz · X-band radar · 5-10 miles\n→ 12 dots on rescue vessel radar\nFlares: parachute (night) · smoke (day) · 3-year life",
      p2:"PART 2 — EPIRB + SART SIMULATOR",s2t:"Distress signal activation and tracking",
      s2:"EPIRB — HOW IT WORKS:\n1. Activation (auto on water contact or manual)\n2. 406 MHz signal → COSPAS-SARSAT satellite\n3. Satellite locates by GPS (<100m accuracy)\n4. MRCC alerted (Maritime Rescue Coordination Centre)\n5. Rescue dispatched (helicopter, vessel)\nTotal time: < 90 minutes anywhere in the world\n\nSART — HOW IT WORKS:\nManual activation → transmits on 9 GHz\nIf X-band radar sweeps area:\n→ SART responds → 12 dots on radar screen\n→ Dots getting closer = approaching\n\n⚠️ FALSE EPIRB ALERT = severe fine + SAR costs",
      p3:"PART 3 — SURVIVAL CRAFT",s3t:"Lifeboats · Liferafts · HRU · Rescue boat",
      s3:"TOTALLY ENCLOSED LIFEBOAT (SOLAS):\nFully enclosed · self-righting · diesel engine\n100-150 persons · 3-day provisions\nResists fire and submersion\nMonthly lowering TEST\n\nLIFERAFT:\nAutomatic inflation by HRU (1.5-4m depth)\nCapacity: 6 to 25 persons\nHRU = replace every 2 years\nInspection every 12 months\n\nRESCUE BOAT:\nMan overboard recovery\nMinimum 6 knots · 5 persons",
      p4:"PART 4 — ABANDON SHIP PROCEDURE",s4t:"5 steps — from alarm to evacuation",
      s4:"MANDATORY ORDER: SOLAS\n→ General alarm: 7 short + 1 long\n→ Life jacket BEFORE leaving cabin\n→ Muster station: calm and orderly\n→ MAYDAY on VHF Channel 16 + EPIRB\n→ Abandon order: CAPTAIN ONLY\n→ Captain leaves LAST\n\nGMDSS:\nMAYDAY × 3 + name + position + nature + persons\nVHF Channel 16 (156.8 MHz)\nDSC Channel 70 (automatic digital alert)\nEPIRB + SART activated",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — ENGINE LESSON 5",
      sumP:["EPIRB: 406 MHz · COSPAS-SARSAT · < 90 min · worldwide","SART: 9 GHz · X-band · 12 radar dots · 5-10 nm","Life jacket 150N · 10 years · immersion suit 6h+","HRU: auto release at 1.5-4m · replace every 2 years","Abandon alarm: 7 short + 1 long (SOLAS)","Captain = LAST to leave (SOLAS + ISM Code)","MAYDAY: VHF Channel 16 · DSC Channel 70","Costa Concordia → training + procedures = LIVES"],
      learnedP:["EPIRB 406MHz · SART 9GHz · distress signals","HRU auto 1.5-4m · liferafts 12mo · lifeboats monthly","Abandon alarm 7+1 · captain last","MAYDAY Ch16 · DSC Ch70 · GMDSS","Costa Concordia → training saves lives"],
    },
    es:{
      badge:"🛟 Módulo Máquinas · Lección 5/8 · ⭐ Premium · 200 XP",
      title:"Salvamento, EPIRB, SART & Abandono del Buque",
      intro:"En el mar, sobrevivir depende de la rapidez y la organización. Una tripulación bien formada que conoce sus equipos y procedimientos puede marcar la diferencia entre la vida y la muerte.",
      p1:"PARTE 1 — EQUIPOS DE SUPERVIVENCIA",s1t:"Chalecos · Trajes · Aros · EPIRB · SART · Bengalas",
      s1:"EQUIPOS INDIVIDUALES:\nChaleco salvavidas: 150N · luz + silbato · 10 años\nTraje de inmersión: hipotermia < 15°C · 6h+ supervivencia\nAro salvavidas: línea 30m · luz automática\n\nEQUIPOS DE LOCALIZACIÓN:\nEPIRB: 406 MHz · COSPAS-SARSAT · GPS integrado\n→ Señal recibida en < 90 min · cobertura mundial\nSART: 9 GHz · banda X radar · 5-10 millas\n→ 12 puntos en radar del buque de rescate",
      p2:"PARTE 2 — SIMULADOR EPIRB + SART",s2t:"Activación y seguimiento de la señal de socorro",
      s2:"EPIRB: 406 MHz → satélite → MRCC → rescate en < 90 min\nSART: 9 GHz → 12 puntos en radar → buque se acerca\n⚠️ FALSA ALARMA EPIRB = multa grave + costes SAR",
      p3:"PARTE 3 — EMBARCACIONES DE SALVAMENTO",s3t:"Botes · Balsas · ULH · Bote de rescate",
      s3:"BOTE SALVAVIDAS CERRADO (SOLAS):\nCompletamente cerrado · autoendrizante · motor diesel\n100-150 personas · provisiones 3 días\nPrueba de arriado MENSUAL\n\nBALSA SALVAVIDAS:\nInflado automático por ULH (1,5-4m profundidad)\nCapacidad: 6 a 25 personas · ULH: sustituir cada 2 años\n\nBOTE DE RESCATE:\nRecuperación hombre al agua · 6 nudos mín.",
      p4:"PARTE 4 — PROCEDIMIENTO DE ABANDONO",s4t:"5 pasos — de la alarma a la evacuación",
      s4:"ORDEN IMPERATIVO SOLAS:\n→ Alarma general: 7 cortos + 1 largo\n→ Chaleco ANTES de salir del camarote\n→ Punto de reunión: calma y orden\n→ MAYDAY Canal 16 VHF + EPIRB\n→ Orden de abandono: SOLO EL CAPITÁN\n→ Capitán abandona EL ÚLTIMO",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 5 MÁQUINAS",
      sumP:["EPIRB: 406 MHz · COSPAS-SARSAT · < 90 min · mundial","SART: 9 GHz · banda X · 12 puntos radar · 5-10 mn","Chaleco 150N · 10 años · traje inmersión 6h+","ULH: largado auto a 1,5-4m · sustituir cada 2 años","Alarma abandono: 7 cortos + 1 largo (SOLAS)","Capitán = EL ÚLTIMO en abandonar (SOLAS + ISM)","MAYDAY: Canal 16 VHF · DSC Canal 70"],
      learnedP:["EPIRB 406MHz · SART 9GHz · señales socorro","ULH auto 1,5-4m · balsas 12 meses · botes mensual","Alarma abandono 7+1 · capitán el último","MAYDAY Canal 16 · DSC Canal 70 · GMDSS"],
    },
    pt:{
      badge:"🛟 Módulo Máquinas · Lição 5/8 · ⭐ Premium · 200 XP",
      title:"Salvamento, EPIRB, SART & Abandono do Navio",
      intro:"No mar, sobreviver depende da rapidez e organização. Uma tripulação bem formada que conhece os seus equipamentos e procedimentos pode fazer a diferença entre a vida e a morte.",
      p1:"PARTE 1 — EQUIPAMENTOS DE SOBREVIVÊNCIA",s1t:"Coletes · Fatos · Boias · EPIRB · SART · Foguetes",
      s1:"EQUIPAMENTOS INDIVIDUAIS:\nColete salva-vidas: 150N · luz + apito · 10 anos\nFato de imersão: hipotermia < 15°C · 6h+ sobrevivência\nBoia salva-vidas: linha 30m · luz automática\n\nEQUIPAMENTOS DE LOCALIZAÇÃO:\nEPIRB: 406 MHz · COSPAS-SARSAT · GPS integrado\n→ Sinal recebido em < 90 min · cobertura mundial\nSART: 9 GHz · banda X radar · 5-10 milhas\n→ 12 pontos no radar do navio de resgate",
      p2:"PARTE 2 — SIMULADOR EPIRB + SART",s2t:"Ativação e seguimento do sinal de socorro",
      s2:"EPIRB: 406 MHz → satélite → MRCC → resgate em < 90 min\nSART: 9 GHz → 12 pontos no radar → navio aproxima-se\n⚠️ FALSO ALARME EPIRB = multa grave + custos SAR",
      p3:"PARTE 3 — EMBARCAÇÕES DE SALVAMENTO",s3t:"Botes · Balsas · ULH · Bote de resgate",
      s3:"BOTE SALVA-VIDAS FECHADO (SOLAS):\nCompletamente fechado · auto-endireitável · motor diesel\n100-150 pessoas · provisões 3 dias\nTeste de arriamento MENSAL\n\nBALSA SALVA-VIDAS:\nInsuflação automática por ULH (1,5-4m profundidade)\nCapacidade: 6 a 25 pessoas · ULH: substituir a cada 2 anos\n\nBOTE DE RESGATE:\nRecuperação homem ao mar · 6 nós mín.",
      p4:"PARTE 4 — PROCEDIMENTO DE ABANDONO",s4t:"5 passos — do alarme à evacuação",
      s4:"ORDEM IMPERATIVA SOLAS:\n→ Alarme geral: 7 curtos + 1 longo\n→ Colete ANTES de sair do camarote\n→ Posto de reunião: calma e ordem\n→ MAYDAY Canal 16 VHF + EPIRB\n→ Ordem de abandono: APENAS O CAPITÃO\n→ Capitão abandona O ÚLTIMO",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 5 MÁQUINAS",
      sumP:["EPIRB: 406 MHz · COSPAS-SARSAT · < 90 min · mundial","SART: 9 GHz · banda X · 12 pontos radar · 5-10 mn","Colete 150N · 10 anos · fato imersão 6h+","ULH: largação auto a 1,5-4m · substituir a cada 2 anos","Alarme abandono: 7 curtos + 1 longo (SOLAS)","Capitão = O ÚLTIMO a abandonar (SOLAS + ISM)","MAYDAY: Canal 16 VHF · DSC Canal 70"],
      learnedP:["EPIRB 406MHz · SART 9GHz · sinais de socorro","ULH auto 1,5-4m · balsas 12 meses · botes mensal","Alarme abandono 7+1 · capitão o último","MAYDAY Canal 16 · DSC Canal 70 · GMDSS"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonSauvetage({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#050e1a 0%,#0a1628 50%,#060e1a 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.blue2}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.blue2,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🛟 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 5/8":lang==="en"?"Lesson 5/8":lang==="es"?"Lección 5/8":"Lição 5/8"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.blue2},${C.teal},${C.gold2})`,transition:"width 0.5s ease"}}/>
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
            <SL icon="🦺" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🦺 {lang==="fr"?"ÉQUIPEMENTS SURVIE — INTERACTIF":lang==="en"?"SURVIVAL EQUIPMENT — INTERACTIVE":lang==="es"?"EQUIPOS SUPERVIVENCIA — INTERACTIVO":"EQUIPAMENTOS DE SOBREVIVÊNCIA — INTERATIVO"}</div>
              <SurvivalEquipSVG lang={lang}/>
            </Card>
            <SL icon="📡" text={lc.p2} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`,background:"linear-gradient(135deg,rgba(232,185,79,0.05),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📡 {lang==="fr"?"SIMULATEUR EPIRB + SART":lang==="en"?"EPIRB + SART SIMULATOR":lang==="es"?"SIMULADOR EPIRB + SART":"SIMULADOR EPIRB + SART"}</div>
              <EPIRBSimulator lang={lang}/>
            </Card>
            <SL icon="🚤" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🚤 {lang==="fr"?"EMBARCATIONS — INTERACTIF":lang==="en"?"SURVIVAL CRAFT — INTERACTIVE":lang==="es"?"EMBARCACIONES — INTERACTIVO":"EMBARCAÇÕES — INTERATIVO"}</div>
              <LifeboatSVG lang={lang}/>
            </Card>
            <SL icon="🚨" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🚨 {lang==="fr"?"PROCÉDURE ABANDON — INTERACTIF":lang==="en"?"ABANDON PROCEDURE — INTERACTIVE":lang==="es"?"PROCEDIMIENTO ABANDONO — INTERACTIVO":"PROCEDIMENTO DE ABANDONO — INTERATIVO"}</div>
              <AbandonShipSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(26,111,212,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.teal})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Sauvetage & EPIRB":lang==="en"?"Quiz — Survival & EPIRB":lang==="es"?"Quiz — Salvamento & EPIRB":"Quiz — Salvamento & EPIRB"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 5":lang==="en"?"Lesson 5":lang==="es"?"Lección 5":"Lição 5"}</div>
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
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.teal})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 6 — MARPOL & ENVIRONNEMENT →":lang==="en"?"LESSON 6 — MARPOL & ENVIRONMENT →":lang==="es"?"LECCIÓN 6 — MARPOL & MEDIO AMBIENTE →":"LIÇÃO 6 — MARPOL & AMBIENTE →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
