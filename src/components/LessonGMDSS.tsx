// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", yellow:"#f1c40f", sar:"#ff4444", epirb:"#ff6600",
};

const T = {
  fr:{ back:"◀ Retour", module:"Signalisation & Balisage", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Signaling & Buoyage", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Señalización y Balizamiento", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Sinalização e Balizagem", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — GMDSS ZONES INTERACTIVE
// ══════════════════════════════════════
function GMDSSZonesSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const zones = [
    { id:"A1", color:C.green, range:{fr:"< 30 milles côte",en:"< 30 miles coast",es:"< 30 millas costa",pt:"< 30 milhas costa"},
      label:"A1", icon:"🏖️",
      equipment:{fr:"VHF DSC ch.70\nVHF ch.16 (veille)\nEPIRB 406 MHz\nRADAR SART ou AIS-SART\nNavtex (facultatif zone A1)",
                 en:"VHF DSC ch.70\nVHF ch.16 (watch)\nEPIRB 406 MHz\nRADAR SART or AIS-SART\nNavtex (optional A1)",
                 es:"VHF DSC ch.70\nVHF ch.16 (escucha)\nEPIRB 406 MHz\nSART o AIS-SART\nNavtex (opcional zona A1)",
                 pt:"VHF DSC ch.70\nVHF ch.16 (escuta)\nEPIRB 406 MHz\nSART ou AIS-SART\nNavtex (opcional zona A1)"},
      desc:{fr:"ZONE A1 — Navigation côtière\n\nCOUVERTURE :\nZone dans laquelle la couverture VHF continue est assurée par au moins une station côtière GMDSS\n\nPORTÉE : environ < 30 milles d'une station côtière\n\nÉQUIPEMENT MINIMUM :\n→ VHF avec DSC (canal 70)\n→ EPIRB 406 MHz immatriculé\n→ Répondeur SART ou AIS-SART\n\nEXEMPLE : navigation en Méditerranée proche des côtes",
           en:"ZONE A1 — Coastal navigation\n\nCOVERAGE:\nArea where continuous VHF coverage is provided by at least one GMDSS coastal station\n\nRANGE: approximately < 30 miles from coastal station\n\nMINIMUM EQUIPMENT:\n→ VHF with DSC (channel 70)\n→ Registered 406 MHz EPIRB\n→ SART or AIS-SART transponder\n\nEXAMPLE: navigation in Mediterranean near coasts",
           es:"ZONA A1 — Navegación costera\n\nCOBERTURA:\nZona donde se garantiza cobertura VHF continua por al menos una estación costera SMSSM\n\nALCANCE: aproximadamente < 30 millas de una estación costera\n\nEQUIPO MÍNIMO:\n→ VHF con LSD (canal 70)\n→ EPIRB 406 MHz matriculada\n→ Respondedor SART o AIS-SART\n\nEJEMPLO: navegación por el Mediterráneo cerca de las costas",
           pt:"ZONA A1 — Navegação costeira\n\nCOBERTURA:\nZona onde a cobertura VHF contínua é assegurada por pelo menos uma estação costeira GMDSS\n\nALCANCE: aproximadamente < 30 milhas de uma estação costeira\n\nEQUIPAMENTO MÍNIMO:\n→ VHF com ASN (canal 70)\n→ EPIRB 406 MHz registada\n→ Respondedor SART ou AIS-SART\n\nEXEMPLO: navegação no Mediterrâneo perto das costas"},},
    { id:"A2", color:C.blue2, range:{fr:"30-150 milles côte",en:"30-150 miles coast",es:"30-150 millas costa",pt:"30-150 milhas costa"},
      label:"A2", icon:"⚓",
      equipment:{fr:"Tout A1 +\nMF DSC 2187.5 kHz\nMF SSB radiotéléphonie\nNavtex 518 kHz",
                 en:"All A1 +\nMF DSC 2187.5 kHz\nMF SSB radiotelephony\nNavtex 518 kHz",
                 es:"Todo A1 +\nOM LSD 2187,5 kHz\nOM SSB radiotelefonía\nNavtex 518 kHz",
                 pt:"Tudo A1 +\nOM ASN 2187,5 kHz\nOM SSB radiotelefonia\nNavtex 518 kHz"},
      desc:{fr:"ZONE A2 — Navigation au large\n\nCOUVERTURE :\nZone MF (ondes moyennes) en dehors de la zone A1\nCouverture par stations côtières MF\n\nPORTÉE : 30 à 150 milles de la côte\n\nÉQUIPEMENT SUPPLÉMENTAIRE :\n→ Radio MF avec DSC (2187.5 kHz)\n→ NAVTEX (518 kHz) obligatoire\n→ SSB MF/HF pour communications\n\nEXEMPLE : traversée Manche/Atlantique proche",
           en:"ZONE A2 — Offshore navigation\n\nCOVERAGE:\nMF (medium wave) zone outside A1\nCoverage by MF coastal stations\n\nRANGE: 30 to 150 miles from coast\n\nADDITIONAL EQUIPMENT:\n→ MF radio with DSC (2187.5 kHz)\n→ NAVTEX (518 kHz) mandatory\n→ SSB MF/HF for communications",
           es:"ZONA A2 — Navegación en alta mar\n\nCOBERTURA:\nZona OM (ondas medias) fuera de la zona A1\nCobertura por estaciones costeras OM\n\nALCANCE: 30 a 150 millas de la costa\n\nEQUIPO ADICIONAL:\n→ Radio OM con LSD (2187,5 kHz)\n→ NAVTEX (518 kHz) obligatorio\n→ SSB OM/OC para comunicaciones",
           pt:"ZONA A2 — Navegação em alto mar\n\nCOBERTURA:\nZona OM (ondas médias) fora da zona A1\nCobertura por estações costeiras OM\n\nALCANCE: 30 a 150 milhas da costa\n\nEQUIPAMENTO ADICIONAL:\n→ Rádio OM com ASN (2187,5 kHz)\n→ NAVTEX (518 kHz) obrigatório\n→ SSB OM/OC para comunicações"},},
    { id:"A3", color:C.orange, range:{fr:"70°N à 70°S (Inmarsat)",en:"70°N to 70°S (Inmarsat)",es:"70°N a 70°S (Inmarsat)",pt:"70°N a 70°S (Inmarsat)"},
      label:"A3", icon:"🛸",
      equipment:{fr:"Tout A1+A2 +\nInmarsat (satellite)\nou HF DSC\nNavtex + EGC SafetyNET",
                 en:"All A1+A2 +\nInmarsat (satellite)\nor HF DSC\nNavtex + EGC SafetyNET",
                 es:"Todo A1+A2 +\nInmarsat (satélite)\no OC LSD\nNavtex + EGC SafetyNET",
                 pt:"Tudo A1+A2 +\nInmarsat (satélite)\nou OC ASN\nNavtex + EGC SafetyNET"},
      desc:{fr:"ZONE A3 — Navigation hauturière (satellite)\n\nCOUVERTURE :\nZone couverte par les satellites Inmarsat géostationnaires\nEntre 70°N et 70°S\n\nÉQUIPEMENT :\n→ Terminal Inmarsat (C, Fleet, etc.)\n→ OU radio HF avec DSC\n→ NAVTEX + SafetyNET EGC\n→ EPIRB 406 MHz\n\nEXEMPLE : traversée Atlantique, Pacifique\nOcéan Indien, navigation tropicale",
           en:"ZONE A3 — Offshore navigation (satellite)\n\nCOVERAGE:\nZone covered by geostationary Inmarsat satellites\nBetween 70°N and 70°S\n\nEQUIPMENT:\n→ Inmarsat terminal (C, Fleet, etc.)\n→ OR HF radio with DSC\n→ NAVTEX + SafetyNET EGC\n→ 406 MHz EPIRB",
           es:"ZONA A3 — Navegación oceánica (satélite)\n\nCOBERTURA:\nZona cubierta por satélites geoestacionarios Inmarsat\nEntre 70°N y 70°S\n\nEQUIPO:\n→ Terminal Inmarsat (C, Fleet, etc.)\n→ O radio OC con LSD\n→ NAVTEX + SafetyNET EGC\n→ EPIRB 406 MHz",
           pt:"ZONA A3 — Navegação oceânica (satélite)\n\nCOBERTURA:\nZona coberta por satélites geoestacionários Inmarsat\nEntre 70°N e 70°S\n\nEQUIPAMENTO:\n→ Terminal Inmarsat (C, Fleet, etc.)\n→ OU rádio OC com ASN\n→ NAVTEX + SafetyNET EGC\n→ EPIRB 406 MHz"},},
    { id:"A4", color:C.purple, range:{fr:"Zones polaires (> 70°N/S)",en:"Polar zones (> 70°N/S)",es:"Zonas polares (> 70°N/S)",pt:"Zonas polares (> 70°N/S)"},
      label:"A4", icon:"🧊",
      equipment:{fr:"Tout A1+A2 +\nHF DSC (obligatoire)\nIridium recommandé\n(Inmarsat limité aux pôles)",
                 en:"All A1+A2 +\nHF DSC (mandatory)\nIridium recommended\n(Inmarsat limited at poles)",
                 es:"Todo A1+A2 +\nOC LSD (obligatorio)\nIridium recomendado\n(Inmarsat limitado en polos)",
                 pt:"Tudo A1+A2 +\nOC ASN (obrigatório)\nIridium recomendado\n(Inmarsat limitado nos polos)"},
      desc:{fr:"ZONE A4 — Zones polaires\n\nCOUVERTURE :\nZones NON couvertes par Inmarsat (> 70°N ou > 70°S)\nPoles Arctique et Antarctique\n\nÉQUIPEMENT SPÉCIFIQUE :\n→ Radio HF obligatoire (DSC + voix)\n→ Iridium recommandé (couverture polaire)\n→ EPIRB 406 MHz (COSPAS-SARSAT couvre les pôles)\n→ Navtex HF (4209.5 kHz)\n\nDÉFI : communications plus difficiles\nEXEMPLE : expéditions polaires, navires de pêche arctique",
           en:"ZONE A4 — Polar zones\n\nCOVERAGE:\nZones NOT covered by Inmarsat (> 70°N or > 70°S)\nArctic and Antarctic poles\n\nSPECIFIC EQUIPMENT:\n→ Mandatory HF radio (DSC + voice)\n→ Iridium recommended (polar coverage)\n→ 406 MHz EPIRB (COSPAS-SARSAT covers poles)\n→ Navtex HF (4209.5 kHz)",
           es:"ZONA A4 — Zonas polares\n\nCOBERTURA:\nZonas NO cubiertas por Inmarsat (> 70°N o > 70°S)\nPolos Ártico y Antártico\n\nEQUIPO ESPECÍFICO:\n→ Radio OC obligatoria (LSD + voz)\n→ Iridium recomendado (cobertura polar)\n→ EPIRB 406 MHz (COSPAS-SARSAT cubre los polos)\n→ Navtex OC (4209,5 kHz)",
           pt:"ZONA A4 — Zonas polares\n\nCOBERTURA:\nZonas NÃO cobertas pelo Inmarsat (> 70°N ou > 70°S)\nPolos Ártico e Antártico\n\nEQUIPAMENTO ESPECÍFICO:\n→ Rádio OC obrigatório (ASN + voz)\n→ Iridium recomendado (cobertura polar)\n→ EPIRB 406 MHz (COSPAS-SARSAT cobre os polos)\n→ Navtex OC (4209,5 kHz)"},},
  ];

  const sel_ = sel!==null ? zones[sel] : null;

  return (
    <div>
      {/* World map zones */}
      <div style={{background:"#000a18",borderRadius:14,padding:"10px",marginBottom:10,border:"1px solid rgba(77,166,255,0.15)"}}>
        <svg width="100%" viewBox="0 0 280 120" style={{display:"block"}}>
          {/* Ocean */}
          <rect width={280} height={120} fill="#000a18"/>
          {/* Polar zones A4 */}
          <rect x={0} y={0} width={280} height={15} fill={`${C.purple}44`} rx={2}/>
          <rect x={0} y={105} width={280} height={15} fill={`${C.purple}44`} rx={2}/>
          <text x={140} y={10} textAnchor="middle" fontSize={6} fill={C.purple}>A4 — POLAIRE (&gt; 70°N)</text>
          <text x={140} y={117} textAnchor="middle" fontSize={6} fill={C.purple}>A4 — POLAIRE (&gt; 70°S)</text>
          {/* A3 zone */}
          <rect x={0} y={15} width={280} height={90} fill={`${C.orange}18`}/>
          <text x={5} y={62} fontSize={6} fill={C.orange}>A3</text>
          <text x={5} y={70} fontSize={5} fill={C.orange}>Inmarsat</text>
          {/* Continents simplified */}
          <rect x={20} y={30} width={40} height={45} rx={4} fill="#1a2d1a" opacity={0.8}/>
          <rect x={70} y={25} width={55} height={55} rx={4} fill="#1a2d1a" opacity={0.8}/>
          <rect x={135} y={35} width={30} height={40} rx={4} fill="#1a2d1a" opacity={0.8}/>
          <rect x={175} y={28} width={70} height={50} rx={4} fill="#1a2d1a" opacity={0.8}/>
          {/* A2 coastal rings */}
          {[35,95,150,210].map((x,i)=>(
            <rect key={i} x={x-15} y={22} width={30} height={8} rx={2} fill={`${C.blue2}33`}/>
          ))}
          {/* A1 VHF rings */}
          {[35,95,150,210].map((x,i)=>(
            <rect key={i} x={x-8} y={24} width={16} height={5} rx={2} fill={`${C.green}44`}/>
          ))}
          {/* Legend */}
          {zones.map((z,i)=>(
            <g key={i}>
              <rect x={5+i*68} y={88} width={8} height={5} rx={1} fill={z.color} opacity={0.8}/>
              <text x={15+i*68} y={93} fontSize={5} fill={z.color}>{z.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {zones.map((z,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"10px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${z.color}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${sel===i?z.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:3}}>{z.icon}</div>
            <div style={{fontFamily:"monospace",fontSize:14,fontWeight:900,color:z.color,marginBottom:2}}>{z.label}</div>
            <div style={{fontSize:8,color:z.color}}>{z.range[lang]||z.range.fr}</div>
            <div style={{fontSize:7,color:sel===i?z.color:C.muted,marginTop:4,lineHeight:1.4}}>{z.equipment[lang]||z.equipment.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} Zone {sel_.id} — {sel_.range[lang]||sel_.range.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — DISTRESS SIGNALS VISUAL
// ══════════════════════════════════════
function DistressSignalsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const [flash, setFlash] = useState(false);

  useEffect(()=>{
    const iv = setInterval(()=>setFlash(f=>!f), 600);
    return ()=>clearInterval(iv);
  },[]);

  const signals = [
    { id:"epirb", icon:"📡", color:C.epirb,
      label:{fr:"EPIRB — Radiobalise 406 MHz",en:"EPIRB — 406 MHz Beacon",es:"EPIRB — Radiobaliza 406 MHz",pt:"EPIRB — Radiobaliza 406 MHz"},
      desc:{fr:"EPIRB (Emergency Position Indicating Radio Beacon)\n\nFRÉQUENCE : 406 MHz (numérique) + 121.5 MHz\nDURÉE : 48h minimum\nSATELLITES : COSPAS-SARSAT (couverture mondiale)\n\nFONCTIONNEMENT :\n→ Activation manuelle (bouton) ou hydrostatique (eau)\n→ Transmet MMSI + position GPS\n→ Satellites détectent en 30-90 min\n→ MRCC alerté et coordonne secours\n\nENTRETIEN OBLIGATOIRE :\n→ Immatriculation avant utilisation\n→ Test mensuel (DEL verte)\n→ Remplacement batterie selon fabricant (5-10 ans)\n→ Vérification annuelle recommandée\n\nIMPORTANT : Ne jamais activer sans réelle détresse\nFausse alarme = coût + pénalités légales",
           en:"EPIRB (Emergency Position Indicating Radio Beacon)\n\nFREQUENCY: 406 MHz (digital) + 121.5 MHz\nDURATION: 48h minimum\nSATELLITES: COSPAS-SARSAT (worldwide coverage)\n\nOPERATION:\n→ Manual activation (button) or hydrostatic (water)\n→ Transmits MMSI + GPS position\n→ Satellites detect in 30-90 min\n→ MRCC alerted and coordinates rescue\n\nMANDATORY MAINTENANCE:\n→ Registration before use\n→ Monthly test (green LED)\n→ Battery replacement per manufacturer (5-10 years)",
           es:"EPIRB (Radiobaliza de Indicación de Posición de Emergencia)\n\nFRECUENCIA: 406 MHz (digital) + 121,5 MHz\nDURACIÓN: 48h mínimo\nSATÉLITES: COSPAS-SARSAT (cobertura mundial)\n\nFUNCIONAMIENTO:\n→ Activación manual o hidrostática (agua)\n→ Transmite MMSI + posición GPS\n→ Satélites detectan en 30-90 min\n→ MRCC alertado y coordina el rescate",
           pt:"EPIRB (Radiobaliza de Indicação de Posição de Emergência)\n\nFREQUÊNCIA: 406 MHz (digital) + 121,5 MHz\nDURAÇÃO: 48h mínimo\nSATÉLITES: COSPAS-SARSAT (cobertura mundial)\n\nFUNCIONAMENTO:\n→ Ativação manual ou hidrostática (água)\n→ Transmite MMSI + posição GPS\n→ Satélites detetam em 30-90 min\n→ MRCC alertado e coordena o socorro"} },
    { id:"sart", icon:"📶", color:C.blue2,
      label:{fr:"SART — Répondeur Radar",en:"SART — Radar Transponder",es:"SART — Respondedor Radar",pt:"SART — Respondedor Radar"},
      desc:{fr:"SART (Search And Rescue Transponder)\n\nFRÉQUENCE : Bande X radar (9 GHz / 3 cm)\nPORTÉE : 10 milles (navire) / 30 milles (hélico)\nDURÉE : 96h en veille / 8h en actif\n\nFONCTIONNEMENT :\nQuand un radar X-Band envoie une impulsion\n→ Le SART répond par 12 impulsions\n→ Apparaît sur l'écran radar comme une ligne de 12 points\n→ Les points s'étendent VERS le navire de sauvetage\n\nUTILISATION :\n→ Tenir le SART ÉLEVÉ (hors de l'eau)\n→ Hauteur maximale = portée maximale\n→ Sirène ou DEL indique les interrogations\n\nDIFFÉRENCE SART / AIS-SART :\nSART = visible sur radar uniquement\nAIS-SART = visible sur radar ET AIS (MMSI 970...)",
           en:"SART (Search And Rescue Transponder)\n\nFREQUENCY: X-Band radar (9 GHz / 3 cm)\nRANGE: 10 miles (vessel) / 30 miles (helicopter)\nDURATION: 96h standby / 8h active\n\nOPERATION:\nWhen X-Band radar sends a pulse\n→ SART replies with 12 pulses\n→ Appears on radar screen as line of 12 dots\n→ Dots extend TOWARD rescue vessel\n\nUSE:\n→ Hold SART HIGH (out of water)\n→ Maximum height = maximum range\n→ Siren or LED indicates interrogations",
           es:"SART (Search And Rescue Transponder)\n\nFRECUENCIA: Banda X radar (9 GHz / 3 cm)\nALCANCE: 10 millas (buque) / 30 millas (helicóptero)\nDURACIÓN: 96h en espera / 8h en activo\n\nFUNCIONAMIENTO:\nCuando un radar de banda X envía un impulso\n→ El SART responde con 12 impulsos\n→ Aparece en pantalla como línea de 12 puntos\n→ Los puntos se extienden HACIA el buque de rescate",
           pt:"SART (Search And Rescue Transponder)\n\nFREQUÊNCIA: Banda X radar (9 GHz / 3 cm)\nALCANCE: 10 milhas (navio) / 30 milhas (helicóptero)\nDURAÇÃO: 96h em espera / 8h em ativo\n\nFUNCIONAMENTO:\nQuando um radar de banda X envia um impulso\n→ O SART responde com 12 impulsos\n→ Aparece no ecrã como linha de 12 pontos\n→ Os pontos estendem-se PARA o navio de socorro"} },
    { id:"flare_red", icon:"🔴", color:C.red,
      label:{fr:"Fusée rouge parachute",en:"Red parachute flare",es:"Cohete rojo con paracaídas",pt:"Foguete vermelho com paraquedas"},
      desc:{fr:"FUSÉE ROUGE PARACHUTE\n\nSIGNAL DE DÉTRESSE COLREG Règle 37\n\nCARACTÉRISTIQUES :\n→ Couleur : ROUGE vif\n→ Altitude : 300m minimum\n→ Durée : 40 secondes minimum\n→ Visible : 28+ milles de nuit\n→ Intensité : 30 000 candelas minimum\n\nUTILISATION :\n→ Tirer vers le HAUT et légèrement sous le vent\n→ Jamais vers un hélicoptère en approche\n→ Maximum 2 fusées vers navire/aéronef vu\n→ En cas de vent fort → tirer à 30-45° sous le vent\n\nSTOCKAGE : À l'abri de l'humidité\nDATES DE PÉREMPTION : 3-4 ans\n\nATTENTION :\nFusées signaux non reconnues par les satellites",
           en:"RED PARACHUTE FLARE\n\nDISTRESS SIGNAL COLREG Rule 37\n\nCHARACTERISTICS:\n→ Color: bright RED\n→ Altitude: 300m minimum\n→ Duration: 40 seconds minimum\n→ Visible: 28+ miles at night\n→ Intensity: 30,000 candelas minimum\n\nUSE:\n→ Fire UPWARD and slightly downwind\n→ Never toward approaching helicopter\n→ Maximum 2 flares toward seen vessel/aircraft\n→ In strong wind → fire 30-45° downwind",
           es:"COHETE ROJO CON PARACAÍDAS\n\nSEÑAL DE SOCORRO COLREG Regla 37\n\nCARACTERÍSTICAS:\n→ Color: ROJO vivo\n→ Altitud: 300m mínimo\n→ Duración: 40 segundos mínimo\n→ Visible: 28+ millas de noche\n→ Intensidad: 30.000 candelas mínimo\n\nUSO:\n→ Disparar HACIA ARRIBA y ligeramente sotavento\n→ Nunca hacia un helicóptero en aproximación\n→ Máximo 2 cohetes hacia buque/aeronave avistado",
           pt:"FOGUETE VERMELHO COM PARAQUEDAS\n\nSINAL DE SOCORRO COLREG Regra 37\n\nCARACTERÍSTICAS:\n→ Cor: VERMELHO vivo\n→ Altitude: 300m mínimo\n→ Duração: 40 segundos mínimo\n→ Visível: 28+ milhas de noite\n→ Intensidade: 30.000 candelas mínimo\n\nUSO:\n→ Disparar PARA CIMA e ligeiramente para sotavento\n→ Nunca para um helicóptero em aproximação\n→ Máximo 2 foguetes para navio/aeronave avistado"} },
    { id:"smoke", icon:"🟠", color:C.orange,
      label:{fr:"Fumigène orange",en:"Orange smoke signal",es:"Señal de humo naranja",pt:"Sinal de fumo laranja"},
      desc:{fr:"FUMIGÈNE ORANGE\n\nSIGNAL DE DÉTRESSE DE JOUR\n\nCARACTÉRISTIQUES :\n→ Couleur : ORANGE visible de loin de jour\n→ Durée : 3 minutes minimum\n→ Visible : jusqu'à 5 milles de jour\n→ Peut être jeté à la mer (flottant)\n→ Ou tenu à la main\n\nUTILISATION :\n→ Signal de jour uniquement (nuit = fusée rouge)\n→ Particulièrement visible pour hélicoptères\n→ Marque la position dans l'eau (MOB)\n→ Déposer sous le vent pour ne pas irriter les yeux\n\nSIGNAL DE DÉTRESSE VISUEL DE JOUR :\nFumigène > Flammes car visible de plus loin\nCombinaison : fusée rouge + fumigène = très efficace\n\nSTOCKAGE : Péremption 3 ans",
           en:"ORANGE SMOKE SIGNAL\n\nDAYTIME DISTRESS SIGNAL\n\nCHARACTERISTICS:\n→ Color: ORANGE visible from afar in daytime\n→ Duration: 3 minutes minimum\n→ Visible: up to 5 miles by day\n→ Can be thrown in sea (floating)\n→ Or hand-held\n\nUSE:\n→ Daytime signal only (night = red flare)\n→ Particularly visible to helicopters\n→ Marks position in water (MOB)\n→ Deploy downwind to avoid eye irritation",
           es:"SEÑAL DE HUMO NARANJA\n\nSEÑAL DE SOCORRO DIURNA\n\nCARACTERÍSTICAS:\n→ Color: NARANJA visible de lejos de día\n→ Duración: 3 minutos mínimo\n→ Visible: hasta 5 millas de día\n→ Puede echarse al mar (flotante) o de mano\n\nUSO:\n→ Solo señal diurna (noche = cohete rojo)\n→ Especialmente visible para helicópteros\n→ Marca la posición en el agua (MOB)",
           pt:"SINAL DE FUMO LARANJA\n\nSINAL DE SOCORRO DIURNO\n\nCARACTERÍSTICAS:\n→ Cor: LARANJA visível de longe de dia\n→ Duração: 3 minutos mínimo\n→ Visível: até 5 milhas de dia\n→ Pode ser lançado ao mar (flutuante) ou de mão\n\nUSO:\n→ Sinal diurno apenas (noite = foguete vermelho)\n→ Particularmente visível para helicópteros\n→ Marca a posição na água (MOB)"} },
    { id:"hand_flare", icon:"🔴", color:"#ff8800",
      label:{fr:"Feu à main rouge",en:"Red hand flare",es:"Bengala de mano roja",pt:"Luz de mão vermelha"},
      desc:{fr:"FEU À MAIN ROUGE\n\nCARACTÉRISTIQUES :\n→ Couleur : ROUGE vif\n→ Durée : 1 minute minimum\n→ Visible : 5-10 milles de nuit\n→ Portée : signal de courte portée\n\nUTILISATION :\n→ Signal à courte portée (navire déjà proche)\n→ Tenu à bout de bras sous le vent\n→ Éviter les projections sur vêtements/peau\n→ Jeter à la mer quand terminé\n\nCOMPLÉMENT de la fusée parachute :\nFusée = alerte à longue portée\nFeu main = confirmation / guidage à courte portée\n\nPEU ADAPTÉ pour avertir hélicoptère\n(tenu à la main = risque pour le pilote)",
           en:"RED HAND FLARE\n\nCHARACTERISTICS:\n→ Color: bright RED\n→ Duration: 1 minute minimum\n→ Visible: 5-10 miles at night\n→ Short range signal\n\nUSE:\n→ Short range signal (vessel already nearby)\n→ Held at arm's length downwind\n→ Avoid burns on clothing/skin\n→ Throw overboard when finished",
           es:"BENGALA DE MANO ROJA\n\nCARACTERÍSTICAS:\n→ Color: ROJO vivo\n→ Duración: 1 minuto mínimo\n→ Visible: 5-10 millas de noche\n→ Señal de corto alcance\n\nUSO:\n→ Señal de corto alcance (buque ya cercano)\n→ Sostenida a brazo extendido sotavento\n→ Evitar quemaduras en ropa/piel",
           pt:"LUZ DE MÃO VERMELHA\n\nCARACTERÍSTICAS:\n→ Cor: VERMELHO vivo\n→ Duração: 1 minuto mínimo\n→ Visível: 5-10 milhas de noite\n→ Sinal de curto alcance\n\nUSO:\n→ Sinal de curto alcance (navio já próximo)\n→ Segura com braço estendido para sotavento\n→ Evitar queimaduras em roupas/pele"} },
    { id:"mirror", icon:"✨", color:C.yellow,
      label:{fr:"Miroir héliographe",en:"Heliograph mirror",es:"Espejo de señales",pt:"Espelho de sinalização"},
      desc:{fr:"MIROIR DE SIGNALISATION (Héliographe)\n\nSIGNAL DE DÉTRESSE VISUEL PASSIF\n\nCARACTÉRISTIQUES :\n→ Signal de jour utilisant le soleil\n→ Portée : 15-30 milles de jour !\n→ Visible pour avions jusqu'à 50 milles\n→ Pas de batteries = fonctionne toujours\n\nTECHNIQUE :\n1. Tenir le miroir face au soleil\n2. Créer un reflet sur la main\n3. Diriger ce reflet vers la cible\n4. Faire clignoter en SOS (··· --- ···)\n\nAVANTAGES :\n→ Aucune batterie requise\n→ Portée exceptionnelle par beau temps\n→ Particulièrement visible pour aéronefs\n\nLIMITATIONS :\n→ Nécessite soleil ou lune brillante\n→ Technique demande entraînement",
           en:"HELIOGRAPH MIRROR\n\nPASSIVE VISUAL DISTRESS SIGNAL\n\nCHARACTERISTICS:\n→ Daytime signal using sun\n→ Range: 15-30 miles by day!\n→ Visible to aircraft up to 50 miles\n→ No batteries = always works\n\nTECHNIQUE:\n1. Hold mirror facing sun\n2. Create reflection on hand\n3. Direct reflection toward target\n4. Flash SOS (··· --- ···)",
           es:"ESPEJO DE SEÑALES (Heliógrafo)\n\nSEÑAL DE SOCORRO VISUAL PASIVA\n\nCARACTERÍSTICAS:\n→ Señal diurna usando el sol\n→ Alcance: 15-30 millas de día\n→ Visible para aeronaves hasta 50 millas\n→ Sin baterías = siempre funciona\n\nTÉCNICA:\n1. Sostener el espejo frente al sol\n2. Crear un reflejo en la mano\n3. Dirigir ese reflejo hacia el objetivo\n4. Destellar SOS (··· --- ···)",
           pt:"ESPELHO DE SINALIZAÇÃO (Heliógrafo)\n\nSINAL DE SOCORRO VISUAL PASSIVO\n\nCARACTERÍSTICAS:\n→ Sinal diurno usando o sol\n→ Alcance: 15-30 milhas de dia\n→ Visível para aeronaves até 50 milhas\n→ Sem baterias = funciona sempre\n\nTÉCNICA:\n1. Segurar o espelho voltado para o sol\n2. Criar um reflexo na mão\n3. Dirigir esse reflexo para o alvo\n4. Piscar SOS (··· --- ···)"} },
  ];

  const sel_ = sel!==null ? signals[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:10}}>
        {signals.map((s,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"8px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?`${s.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:2,
              filter:i===0&&flash?`drop-shadow(0 0 6px ${s.color})`:"none"}}>{s.icon}</div>
            <div style={{fontSize:7,color:sel===i?s.color:C.muted,fontWeight:700,lineHeight:1.2}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:12,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — SURVIVAL ABANDON SHIP
// ══════════════════════════════════════
function AbandonShipSVG({ lang }) {
  const [step, setStep] = useState(0);

  const steps = {
    fr:[
      { icon:"🚨", color:C.red, title:"ALERTE — Décision d'abandon", time:"T=0",
        content:"DÉCISION D'ABANDON DE NAVIRE\n\n1. Le capitaine prend la décision (autorité absolue)\n2. Alarme générale déclenchée (7 sons courts + 1 long)\n3. Signal MAYDAY sur VHF 16 + DSC ch.70\n4. EPIRB activée manuellement\n5. Position GPS transmise et notée\n6. Conditions météo évaluées\n\nDÉCISION CLÉ :\nLe navire doit être 'plus dangereux que la mer'\nL'abandon précoce = erreur courante\n(les naufragés survivent mieux à bord)"},
      { icon:"🦺", color:C.orange, title:"PRÉPARATION — Équipement survie", time:"T+2min",
        content:"PRÉPARATION À L'ABANDON\n\n→ Gilet de sauvetage (brassière) OBLIGATOIRE\n→ Combinaison de survie si disponible\n→ Documents essentiels (étanche si possible)\n→ Médicaments urgents\n→ Eau douce (si accessible)\n→ Signaux de détresse (fusées, EPIRB, SART)\n→ VHF portable GMDSS chargé\n\nPOINT DE RASSEMBLEMENT :\nSe réunir au poste d'abandon désigné\nL'officier vérifie la présence de chacun\nNe jamais s'éloigner du groupe"},
      { icon:"🛟", color:C.blue2, title:"MISE À L'EAU — Canot de sauvetage", time:"T+5min",
        content:"MISE À L'EAU DU CANOT\n\n1. Vérifier que le canot est du côté sous le vent\n2. Couper le bosse (painter) seulement quand tous à bord\n3. Activer la lumière stroboscopique\n4. Déployer l'ancre flottante (sea anchor)\n5. S'éloigner du navire (risque d'aspiration)\n\nORDRE D'EMBARQUEMENT :\n→ Blessés et enfants en premier\n→ Puis matelots\n→ Officiers en dernier (capitaine = dernier)\n\nPAINTER : corde reliant le canot au navire\nCouper seulement au dernier moment !"},
      { icon:"🏝️", color:C.green, title:"SURVIE EN MER — Attendre les secours", time:"T+10min+",
        content:"SURVIE EN MER\n\nPRIORITÉS (ordre STOP) :\nS = Stopper la perte de chaleur (hypothermie)\nT = Traiter les blessures\nO = Organiser les quarts de veille\nP = Préserver l'eau et la nourriture\n\nACTIONS IMMÉDIATES :\n→ Ancre flottante déployée\n→ SART / AIS-SART activé\n→ Fusées prêtes à l'emploi\n→ VHF portable sur ch.16\n→ Ration d'eau : 500ml/pers/jour minimum\n→ NE PAS boire eau de mer\n\nHYPOTHERMIE :\n→ Survêtements + gilets de sauvetage\n→ Position HELP (Heat Escape Lessening Posture)\n→ Grouper les survivants (chaleur collective)"},
    ],
    en:[
      { icon:"🚨", color:C.red, title:"ALERT — Abandon ship decision", time:"T=0",
        content:"ABANDON SHIP DECISION\n\n1. Captain makes the decision (absolute authority)\n2. General alarm sounded (7 short + 1 long)\n3. MAYDAY on VHF 16 + DSC ch.70\n4. EPIRB manually activated\n5. GPS position transmitted and noted\n6. Weather conditions assessed\n\nKEY DECISION:\nVessel must be 'more dangerous than the sea'\nEarly abandonment = common error\n(survivors do better remaining aboard)"},
      { icon:"🦺", color:C.orange, title:"PREPARATION — Survival equipment", time:"T+2min",
        content:"PREPARATION FOR ABANDONMENT\n\n→ Life jacket MANDATORY\n→ Survival suit if available\n→ Essential documents (waterproof if possible)\n→ Emergency medications\n→ Fresh water (if accessible)\n→ Distress signals (flares, EPIRB, SART)\n→ Charged portable GMDSS VHF\n\nMUSTER POINT:\nGather at designated muster station\nOfficer checks everyone present\nNever leave the group"},
      { icon:"🛟", color:C.blue2, title:"LAUNCHING — Life raft", time:"T+5min",
        content:"LAUNCHING THE LIFERAFT\n\n1. Ensure raft is on the leeward side\n2. Cut painter ONLY when all aboard\n3. Activate strobe light\n4. Deploy sea anchor (drogue)\n5. Move away from vessel (suction risk)\n\nEMBARKATION ORDER:\n→ Injured and children first\n→ Then crew\n→ Officers last (captain = last)\n\nPAINTER: rope connecting raft to vessel\nCut only at the very last moment!"},
      { icon:"🏝️", color:C.green, title:"SURVIVAL — Await rescue", time:"T+10min+",
        content:"SURVIVAL AT SEA\n\nPRIORITIES (STOP order):\nS = Stop heat loss (hypothermia)\nT = Treat injuries\nO = Organize watch rota\nP = Preserve water and food\n\nIMMEDIATE ACTIONS:\n→ Sea anchor deployed\n→ SART / AIS-SART activated\n→ Flares ready for use\n→ Portable VHF on ch.16\n→ Water ration: 500ml/person/day minimum\n→ DO NOT drink seawater\n\nHYPOTHERMIA:\n→ Clothing + life jackets\n→ HELP position\n→ Group survivors (shared warmth)"},
    ],
    es:[
      { icon:"🚨", color:C.red, title:"ALERTA — Decisión de abandono", time:"T=0",
        content:"DECISIÓN DE ABANDONO\n\n1. El capitán toma la decisión (autoridad absoluta)\n2. Alarma general (7 sonidos cortos + 1 largo)\n3. MAYDAY en VHF 16 + LSD ch.70\n4. EPIRB activada manualmente\n5. Posición GPS transmitida y anotada\n6. Condiciones meteorológicas evaluadas"},
      { icon:"🦺", color:C.orange, title:"PREPARACIÓN — Equipo de supervivencia", time:"T+2min",
        content:"PREPARACIÓN PARA EL ABANDONO\n\n→ Chaleco salvavidas OBLIGATORIO\n→ Traje de supervivencia si disponible\n→ Documentos esenciales\n→ Medicamentos urgentes\n→ Agua dulce (si accesible)\n→ Señales de socorro (cohetes, EPIRB, SART)\n→ VHF portátil SMSSM cargado"},
      { icon:"🛟", color:C.blue2, title:"BOTADURA — Balsa salvavidas", time:"T+5min",
        content:"BOTADURA DE LA BALSA\n\n1. Verificar que la balsa esté a sotavento\n2. Cortar la beta SOLO cuando todos estén a bordo\n3. Activar la luz estroboscópica\n4. Desplegar el ancla flotante\n5. Alejarse del buque (riesgo de succión)\n\nORDEN DE EMBARQUE:\n→ Heridos y niños primero\n→ Luego marineros\n→ Oficiales en último lugar (capitán = el último)"},
      { icon:"🏝️", color:C.green, title:"SUPERVIVENCIA — Esperar rescate", time:"T+10min+",
        content:"SUPERVIVENCIA EN EL MAR\n\nPRIORIDADES (orden STOP):\nS = Detener pérdida de calor\nT = Tratar heridas\nO = Organizar guardias de vigilancia\nP = Preservar agua y alimentos\n\nRación de agua: 500ml/persona/día\nNO beber agua de mar\nPosición HELP contra la hipotermia"},
    ],
    pt:[
      { icon:"🚨", color:C.red, title:"ALERTA — Decisão de abandono", time:"T=0",
        content:"DECISÃO DE ABANDONO\n\n1. O capitão toma a decisão (autoridade absoluta)\n2. Alarme geral (7 sons curtos + 1 longo)\n3. MAYDAY no VHF 16 + ASN ch.70\n4. EPIRB ativada manualmente\n5. Posição GPS transmitida e anotada\n6. Condições meteorológicas avaliadas"},
      { icon:"🦺", color:C.orange, title:"PREPARAÇÃO — Equipamento de sobrevivência", time:"T+2min",
        content:"PREPARAÇÃO PARA O ABANDONO\n\n→ Colete salva-vidas OBRIGATÓRIO\n→ Fato de sobrevivência se disponível\n→ Documentos essenciais\n→ Medicamentos urgentes\n→ Água doce (se acessível)\n→ Sinais de socorro (foguetes, EPIRB, SART)\n→ VHF portátil GMDSS carregado"},
      { icon:"🛟", color:C.blue2, title:"LANÇAMENTO — Balsa salva-vidas", time:"T+5min",
        content:"LANÇAMENTO DA BALSA\n\n1. Verificar que a balsa está a sotavento\n2. Cortar o estroço APENAS quando todos a bordo\n3. Ativar a luz estroboscópica\n4. Deployar a âncora flutuante\n5. Afastar do navio (risco de sucção)\n\nORDEM DE EMBARQUE:\n→ Feridos e crianças primeiro\n→ Depois tripulação\n→ Oficiais por último (capitão = último)"},
      { icon:"🏝️", color:C.green, title:"SOBREVIVÊNCIA — Aguardar socorro", time:"T+10min+",
        content:"SOBREVIVÊNCIA NO MAR\n\nPRIORIDADES (ordem STOP):\nS = Deter perda de calor\nT = Tratar ferimentos\nO = Organizar turnos de vigia\nP = Preservar água e alimentos\n\nRação de água: 500ml/pessoa/dia\nNÃO beber água do mar\nPosição HELP contra hipotermia"},
    ],
  };

  const list = steps[lang]||steps.fr;
  const s = list[step];

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {list.map((_,i)=>(
          <div key={i} onClick={()=>setStep(i)} style={{
            flex:1,height:4,borderRadius:4,cursor:"pointer",
            background:i<=step?(i===step?s.color:`${s.color}66`):"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div style={{padding:"12px",borderRadius:14,background:`${s.color}12`,border:`2px solid ${s.color}66`,animation:"fadeUp 0.3s ease",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <span style={{fontSize:24}}>{s.icon}</span>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:s.color}}>{s.title}</div>
            <div style={{fontSize:9,color:s.color,opacity:0.8,fontFamily:"monospace"}}>{s.time}</div>
          </div>
        </div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{s.content}</div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          style={{flex:1,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":lang==="es"?"Anterior":"Anterior"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(list.length-1,s+1))} disabled={step===list.length-1}
          style={{flex:1,padding:"9px",borderRadius:10,background:step===list.length-1?"rgba(255,255,255,0.05)":`${list[Math.min(list.length-1,step+1)].color}22`,border:`1px solid ${step===list.length-1?"rgba(255,255,255,0.08)":list[Math.min(list.length-1,step+1)].color}`,color:C.white,cursor:step===list.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":lang==="en"?"Next":lang==="es"?"Siguiente":"Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SAR COORDINATION
// ══════════════════════════════════════
function SARCoordinationSVG({ lang }) {
  const [phase, setPhase] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(()=>{
    const iv = setInterval(()=>setTick(t=>t+1), 800);
    return ()=>clearInterval(iv);
  },[]);

  const phases = {
    fr:[
      { icon:"📡", color:C.epirb, title:"Phase 1 — ALERTE",
        desc:"RÉCEPTION DE L'ALERTE SAR\n\n→ EPIRB activée : signal 406 MHz reçu par satellite COSPAS-SARSAT\n→ DSC ch.70 : alerte numérique reçue par MRCC côtier\n→ MAYDAY VHF ch.16 : entendu par autres navires ou stations côtières\n→ MAYDAY RELAY retransmis si nécessaire\n\nCONTACT MRCC :\nCROSS France · HM Coastguard UK\nMRCC Portugal · Salvamento Marítimo ES\n→ Collecte d'informations : position · navire · personnes · nature détresse\n→ Évaluation de la gravité : incertitude / alerte / détresse" },
      { icon:"🗺️", color:C.blue2, title:"Phase 2 — PLANIFICATION SAR",
        desc:"PLANIFICATION DE L'OPÉRATION SAR\n\nÉTAPES MRCC :\n1. Confirmation de la détresse (vrais vs faux alertes)\n2. Définition de la zone de recherche (datum)\n3. Calcul de la dérive (vent + courant)\n4. Attribution des moyens SAR disponibles\n5. Briefing des unités SAR\n\nDATA SAR :\n→ DATUM = point de référence de recherche\n→ Calculé à partir de la position EPIRB\n→ Corrigé par la dérive vent + courant\n→ Mise à jour toutes les heures\n\nCOMMUNICATIONS :\n→ Navires proches alertés par NAVTEX\n→ Silence radio SAR sur ch.16 si nécessaire" },
      { icon:"🚁", color:C.green, title:"Phase 3 — OPÉRATIONS SAR",
        desc:"OPÉRATIONS DE RECHERCHE ET SAUVETAGE\n\nMOYENS MOBILISÉS :\n→ Hélicoptères SAR (Marine nationale, Sécurité civile)\n→ Vedettes SNSM (Société Nationale de Sauvetage en Mer)\n→ Navires commerciaux à proximité (obligés d'assister)\n→ Aéronefs de patrouille maritime (Atlantique 2)\n\nPATROUILLE :\nRecherche en ligne (Line Search)\nRecherche en expansion (Expanding Square)\nRecherche en secteurs (Sector Search)\n\nDÉTECTION :\n→ Fusées rouges aperçues → convergence\n→ SART sur radar → localisation précise\n→ AIS-SART sur écran AIS → identification\n→ EPIRB 121.5 MHz → homing final" },
      { icon:"✅", color:C.gold2, title:"Phase 4 — SAUVETAGE & CLÔTURE",
        desc:"SAUVETAGE ET CLÔTURE SAR\n\nOPÉRATIONS DE SAUVETAGE :\n→ Hélitreuillage si conditions permettent\n→ Récupération par vedette SAR\n→ Transfert médical si urgence\n→ Sauvetage en mer = priorité absolue\n\nSUITE SAR :\n→ Rapport d'opération au MRCC\n→ Naufragés : soins médicaux + compte-rendu\n→ Enquête maritime si accident grave (BEAmer)\n→ Désactivation de l'alerte EPIRB\n→ Vérification des équipements SAR récupérés\n\nCLÔTURE :\nLe MRCC déclare la fin de l'opération SAR\nDébriefing des unités SAR\nRetour des moyens en position d'alerte" },
    ],
    en:[
      { icon:"📡", color:C.epirb, title:"Phase 1 — ALERT",
        desc:"RECEIVING THE SAR ALERT\n\n→ EPIRB activated: 406 MHz signal received by COSPAS-SARSAT satellite\n→ DSC ch.70: digital alert received by coastal MRCC\n→ MAYDAY VHF ch.16: heard by other vessels or coastal stations\n→ MAYDAY RELAY retransmitted if necessary\n\nMRCC CONTACT:\nCROSS France · HM Coastguard UK\n→ Information collection: position · vessel · persons · nature of distress\n→ Severity assessment: uncertainty / alert / distress" },
      { icon:"🗺️", color:C.blue2, title:"Phase 2 — SAR PLANNING",
        desc:"SAR OPERATION PLANNING\n\nMRCC STEPS:\n1. Distress confirmation (real vs false alerts)\n2. Search area definition (datum)\n3. Drift calculation (wind + current)\n4. Allocation of available SAR assets\n5. SAR units briefing\n\nSAR DATA:\n→ DATUM = search reference point\n→ Calculated from EPIRB position\n→ Corrected for wind + current drift\n→ Updated every hour\n\nCOMMUNICATIONS:\n→ Nearby vessels alerted via NAVTEX\n→ SAR radio silence on ch.16 if necessary" },
      { icon:"🚁", color:C.green, title:"Phase 3 — SAR OPERATIONS",
        desc:"SEARCH AND RESCUE OPERATIONS\n\nASSETS MOBILIZED:\n→ SAR helicopters\n→ RNLI lifeboats\n→ Nearby commercial vessels (obligated to assist)\n→ Maritime patrol aircraft\n\nSEARCH PATTERNS:\nLine Search\nExpanding Square\nSector Search\n\nDETECTION:\n→ Red flares sighted → convergence\n→ SART on radar → precise location\n→ AIS-SART on AIS screen → identification\n→ EPIRB 121.5 MHz → final homing" },
      { icon:"✅", color:C.gold2, title:"Phase 4 — RESCUE & CLOSURE",
        desc:"RESCUE AND SAR CLOSURE\n\nRESCUE OPERATIONS:\n→ Winching if conditions allow\n→ Recovery by SAR lifeboat\n→ Medical transfer if emergency\n→ Sea rescue = absolute priority\n\nPOST-SAR:\n→ Operation report to MRCC\n→ Survivors: medical care + debrief\n→ Marine accident investigation if serious\n→ EPIRB alert deactivation\n→ Check recovered SAR equipment\n\nCLOSURE:\nMRCC declares end of SAR operation\nSAR units debriefing\nAssets returned to standby position" },
    ],
    es:[
      { icon:"📡", color:C.epirb, title:"Fase 1 — ALERTA",
        desc:"RECEPCIÓN DE LA ALERTA SAR\n→ EPIRB activada: señal 406 MHz recibida por satélite COSPAS-SARSAT\n→ LSD ch.70: alerta digital recibida por MRCC costero\n→ MAYDAY VHF ch.16: oído por otros buques\n→ Recogida de información: posición · buque · personas · naturaleza de la emergencia" },
      { icon:"🗺️", color:C.blue2, title:"Fase 2 — PLANIFICACIÓN SAR",
        desc:"PLANIFICACIÓN DE LA OPERACIÓN SAR\nETAPAS MRCC:\n1. Confirmación de la emergencia\n2. Definición de la zona de búsqueda (datum)\n3. Cálculo de la deriva (viento + corriente)\n4. Asignación de medios SAR disponibles\n5. Briefing de las unidades SAR" },
      { icon:"🚁", color:C.green, title:"Fase 3 — OPERACIONES SAR",
        desc:"OPERACIONES DE BÚSQUEDA Y SALVAMENTO\nMEDIOS MOVILIZADOS:\n→ Helicópteros SAR\n→ Embarcaciones de rescate\n→ Buques comerciales cercanos (obligados a asistir)\n→ Aeronaves de patrulla marítima\n\nDETECCIÓN:\n→ Cohetes rojos avistados → convergencia\n→ SART en radar → localización precisa\n→ AIS-SART en pantalla AIS → identificación" },
      { icon:"✅", color:C.gold2, title:"Fase 4 — RESCATE Y CIERRE",
        desc:"RESCATE Y CIERRE SAR\nOPERACIONES DE RESCATE:\n→ Rescate con helicóptero si las condiciones lo permiten\n→ Recuperación por embarcación SAR\n→ Traslado médico si urgencia\n\nTRAS EL SAR:\n→ Informe de operación al MRCC\n→ Supervivientes: atención médica + informe\n→ Investigación marítima si accidente grave\n→ Desactivación de la alerta EPIRB" },
    ],
    pt:[
      { icon:"📡", color:C.epirb, title:"Fase 1 — ALERTA",
        desc:"RECEÇÃO DO ALERTA SAR\n→ EPIRB ativada: sinal 406 MHz recebido por satélite COSPAS-SARSAT\n→ ASN ch.70: alerta digital recebido por MRCC costeiro\n→ MAYDAY VHF ch.16: ouvido por outros navios\n→ Recolha de informações: posição · navio · pessoas · natureza do perigo" },
      { icon:"🗺️", color:C.blue2, title:"Fase 2 — PLANEAMENTO SAR",
        desc:"PLANEAMENTO DA OPERAÇÃO SAR\nETAPAS MRCC:\n1. Confirmação do perigo\n2. Definição da zona de busca (datum)\n3. Cálculo da deriva (vento + corrente)\n4. Atribuição dos meios SAR disponíveis\n5. Briefing das unidades SAR" },
      { icon:"🚁", color:C.green, title:"Fase 3 — OPERAÇÕES SAR",
        desc:"OPERAÇÕES DE BUSCA E SALVAMENTO\nMEIOS MOBILIZADOS:\n→ Helicópteros SAR\n→ Embarcações de socorro\n→ Navios comerciais próximos (obrigados a assistir)\n→ Aeronaves de patrulha marítima\n\nDETEÇÃO:\n→ Foguetes vermelhos avistados → convergência\n→ SART no radar → localização precisa\n→ AIS-SART no ecrã AIS → identificação" },
      { icon:"✅", color:C.gold2, title:"Fase 4 — SOCORRO E ENCERRAMENTO",
        desc:"SOCORRO E ENCERRAMENTO SAR\nOPERAÇÕES DE SOCORRO:\n→ Guincho de helicóptero se as condições permitirem\n→ Recuperação por embarcação SAR\n→ Transferência médica se urgência\n\nAPÓS SAR:\n→ Relatório de operação ao MRCC\n→ Sobreviventes: cuidados médicos + relatório\n→ Investigação marítima se acidente grave\n→ Desativação do alerta EPIRB" },
    ],
  };

  const list = phases[lang]||phases.fr;
  const p = list[phase];

  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {list.map((ph,i)=>(
          <button key={i} onClick={()=>setPhase(i)} style={{
            flex:1,padding:"8px 2px",borderRadius:10,cursor:"pointer",textAlign:"center",
            background:phase===i?`${ph.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${phase===i?ph.color:"rgba(255,255,255,0.08)"}`,
            display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:14}}>{ph.icon}</span>
            <div style={{fontSize:7,color:phase===i?ph.color:C.muted,fontWeight:700}}>{i+1}</div>
          </button>
        ))}
      </div>
      <div style={{padding:"12px",borderRadius:14,background:`${p.color}12`,border:`1.5px solid ${p.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:p.color,marginBottom:8}}>{p.icon} {p.title}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{p.desc}</div>
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
    fr:{title:"Naufrage MV Costa Concordia — Toscane (2012)",teaser:"Paquebot · 32 morts · échouage volontaire · abandon tardif · chaos evacuation · GMDSS non utilisé correctement",what:"Le 13 janvier 2012, le paquebot MV Costa Concordia (114 500 tonnes, 4 229 personnes) heurte un rocher au large de l'île du Giglio (Toscane, Italie) et coule progressivement. 32 personnes meurent. Le capitaine Francesco Schettino quitte le navire avant d'avoir ordonné l'évacuation complète — il sera condamné à 16 ans de prison.",cause:"• Manœuvre de 'saluto' (passage trop proche de la côte) non autorisée\n• MAYDAY transmis avec 1h de retard après l'impact\n• Capitaine a abandonné le navire avant les passagers\n• Communication chaotique avec le MRCC Rome\n• Signaux d'alarme d'abandon retardés de 45 minutes\n• Fuite d'eau non immédiatement rapportée\n• Procédures GMDSS non respectées",lessons:"✓ MAYDAY doit être transmis IMMÉDIATEMENT à la détresse\n✓ Capitaine = dernier à quitter le navire (obligation légale)\n✓ Signaux d'abandon = 7 sons courts + 1 long\n✓ GMDSS : EPIRB + DSC ch.70 + MAYDAY ch.16 = procédure complète\n✓ Exercices d'abandon obligatoires avant départ de chaque voyage\n✓ Enregistrement VDR = preuve judiciaire",link:"🔗 Lien L7 : La catastrophe du Costa Concordia illustre que les procédures GMDSS ne servent à rien si elles ne sont pas respectées. Le retard dans la transmission du MAYDAY et le chaos dans l'évacuation ont coûté 32 vies. Les procédures existent pour être suivies sans hésitation."},
    en:{title:"MV Costa Concordia Sinking — Tuscany (2012)",teaser:"Cruise ship · 32 deaths · deliberate grounding · late abandonment · evacuation chaos · GMDSS not correctly used",what:"On January 13, 2012, the cruise ship MV Costa Concordia (114,500 tons, 4,229 persons) strikes a rock off the island of Giglio (Tuscany, Italy) and gradually sinks. 32 people die. Captain Francesco Schettino abandons the vessel before ordering complete evacuation — he was sentenced to 16 years in prison.",cause:"• Unauthorized 'saluto' maneuver (too close to coast)\n• MAYDAY transmitted 1 hour late after impact\n• Captain abandoned vessel before passengers\n• Chaotic communication with Rome MRCC\n• Abandon ship signals delayed 45 minutes\n• Water ingress not immediately reported\n• GMDSS procedures not followed",lessons:"✓ MAYDAY must be transmitted IMMEDIATELY upon distress\n✓ Captain = last to leave the vessel (legal obligation)\n✓ Abandon ship signal = 7 short + 1 long blasts\n✓ GMDSS: EPIRB + DSC ch.70 + MAYDAY ch.16 = complete procedure\n✓ Mandatory abandon ship drills before each voyage departure\n✓ VDR recording = judicial evidence",link:"🔗 L7 Link: The Costa Concordia disaster illustrates that GMDSS procedures are useless if not followed. The delayed MAYDAY and evacuation chaos cost 32 lives. Procedures exist to be followed without hesitation."},
    es:{title:"Hundimiento MV Costa Concordia — Toscana (2012)",teaser:"Crucero · 32 muertos · encallamiento deliberado · abandono tardío · caos evacuación · SMSSM no usado correctamente",what:"El 13 de enero de 2012, el crucero MV Costa Concordia (114.500 toneladas, 4.229 personas) choca contra una roca frente a la isla del Giglio (Toscana, Italia) y se hunde progresivamente. 32 personas mueren. El capitán Francesco Schettino abandonó el buque antes de haber ordenado la evacuación completa — fue condenado a 16 años de prisión.",cause:"• Maniobra de 'saludo' no autorizada (paso demasiado cerca de la costa)\n• MAYDAY transmitido con 1 hora de retraso\n• El capitán abandonó el buque antes que los pasajeros\n• Comunicación caótica con el MRCC Roma\n• Señales de abandono retrasadas 45 minutos\n• Procedimientos SMSSM no respetados",lessons:"✓ MAYDAY debe transmitirse INMEDIATAMENTE ante la emergencia\n✓ El capitán = el último en abandonar el buque\n✓ Señales de abandono = 7 sonidos cortos + 1 largo\n✓ SMSSM: EPIRB + LSD ch.70 + MAYDAY ch.16 = procedimiento completo",link:"🔗 Vínculo L7: La catástrofe del Costa Concordia ilustra que los procedimientos SMSSM son inútiles si no se siguen. El retraso en el MAYDAY y el caos en la evacuación costaron 32 vidas."},
    pt:{title:"Naufrágio MV Costa Concordia — Toscana (2012)",teaser:"Navio de cruzeiro · 32 mortos · encalhe deliberado · abandono tardio · caos evacuação · GMDSS não usado corretamente",what:"A 13 de janeiro de 2012, o navio de cruzeiro MV Costa Concordia (114.500 toneladas, 4.229 pessoas) embate numa rocha ao largo da ilha do Giglio (Toscana, Itália) e afunda progressivamente. 32 pessoas morrem. O capitão Francesco Schettino abandonou o navio antes de ter ordenado a evacuação completa — foi condenado a 16 anos de prisão.",cause:"• Manobra de 'saudação' não autorizada (passagem demasiado perto da costa)\n• MAYDAY transmitido com 1 hora de atraso\n• O capitão abandonou o navio antes dos passageiros\n• Comunicação caótica com o MRCC Roma\n• Sinais de abandono atrasados 45 minutos\n• Procedimentos GMDSS não respeitados",lessons:"✓ MAYDAY deve ser transmitido IMEDIATAMENTE em caso de perigo\n✓ O capitão = o último a abandonar o navio\n✓ Sinais de abandono = 7 sons curtos + 1 longo\n✓ GMDSS: EPIRB + ASN ch.70 + MAYDAY ch.16 = procedimento completo",link:"🔗 Vínculo L7: O desastre do Costa Concordia ilustra que os procedimentos GMDSS são inúteis se não forem seguidos. O atraso no MAYDAY e o caos na evacuação custaram 32 vidas."},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🚢</span>
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
      {id:"q1",q:"Quelle zone GMDSS couvre les pôles (> 70°N/S) ?\n(Répondre : A + chiffre)",correct:"A4"},
      {id:"q2",q:"Signal d'abandon du navire = combien de sons courts + combien de sons longs ?\n(Répondre : X courts + Y long)",correct:"7 courts 1 long"},
      {id:"q3",q:"Durée minimale de fonctionnement d'une EPIRB ?\n(Répondre : nombre + unité)",correct:"48 heures"},
    ],
    en:[
      {id:"q1",q:"Which GMDSS zone covers the poles (> 70°N/S)?\n(Answer: A + number)",correct:"A4"},
      {id:"q2",q:"Abandon ship signal = how many short blasts + how many long blasts?\n(Answer: X short + Y long)",correct:"7 short 1 long"},
      {id:"q3",q:"Minimum operating duration of an EPIRB?\n(Answer: number + unit)",correct:"48 hours"},
    ],
    es:[
      {id:"q1",q:"¿Qué zona SMSSM cubre los polos (> 70°N/S)?\n(Responder: A + número)",correct:"A4"},
      {id:"q2",q:"¿Señal de abandono del buque = cuántos sonidos cortos + cuántos sonidos largos?\n(Responder: X cortos + Y largo)",correct:"7 cortos 1 largo"},
      {id:"q3",q:"¿Duración mínima de funcionamiento de una EPIRB?\n(Responder: número + unidad)",correct:"48 horas"},
    ],
    pt:[
      {id:"q1",q:"Que zona GMDSS cobre os polos (> 70°N/S)?\n(Responder: A + número)",correct:"A4"},
      {id:"q2",q:"Sinal de abandono do navio = quantos sons curtos + quantos sons longos?\n(Responder: X curtos + Y longo)",correct:"7 curtos 1 longo"},
      {id:"q3",q:"Duração mínima de funcionamento de uma EPIRB?\n(Responder: número + unidade)",correct:"48 horas"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("a4")||v==="4";
    if(q.id==="q2") return v.includes("7")&&v.includes("1");
    if(q.id==="q3") return v.includes("48");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.sar}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Zone polaire = A4 · Abandon = 7 courts + 1 long · EPIRB = 48h minimum"
        :lang==="en"?"💡 Reminders: Polar zone = A4 · Abandon = 7 short + 1 long · EPIRB = 48h minimum"
        :lang==="es"?"💡 Recordatorios: Zona polar = A4 · Abandono = 7 cortos + 1 largo · EPIRB = 48h mínimo"
        :"💡 Lembretes: Zona polar = A4 · Abandono = 7 curtos + 1 longo · EPIRB = 48h mínimo"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:14,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: A4 (Zones polaires > 70°N/S · non couvertes par Inmarsat · HF obligatoire)\n✅ Q2: 7 SONS COURTS + 1 SON LONG (alarme générale d'abandon de navire)\n✅ Q3: 48 HEURES (durée minimale de transmission de l'EPIRB selon SOLAS)"
        :lang==="en"?"✅ Q1: A4 (Polar zones > 70°N/S · not covered by Inmarsat · HF mandatory)\n✅ Q2: 7 SHORT + 1 LONG (general abandon ship alarm)\n✅ Q3: 48 HOURS (minimum EPIRB transmission duration per SOLAS)"
        :"✅ Q1: A4 · Q2: 7 cortos + 1 largo · Q3: 48 horas"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.sar}12`,border:`1px solid ${showC?C.green:C.sar}44`,color:showC?C.green:C.sar,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

export const QUIZ = {
  fr:[
    {q:"Quelle est la durée minimale de fonctionnement garantie d'une EPIRB 406 MHz ?",opts:["12 heures","24 heures","48 heures — obligation SOLAS pour signaler la détresse pendant toute la durée des opérations SAR","96 heures"],correct:2,expl:"EPIRB 406 MHz : durée minimale de transmission = 48 HEURES selon SOLAS/GMDSS. Cette durée est calculée pour couvrir l'ensemble d'une opération SAR standard. La fréquence 406 MHz transmet un signal numérique codé avec le MMSI, la position GPS (si connectée), la nature de la détresse. La fréquence secondaire 121.5 MHz permet le homing final par les aéronefs SAR. Entretien : vérification annuelle, remplacement batterie selon fabricant (5-10 ans), immatriculation obligatoire."},
    {q:"Que signifie le signal sonore d'abandon du navire ?",opts:["1 son long","5 sons courts","7 sons courts répétés + 1 son long — signal général d'alarme d'abandon du navire","3 sons longs"],correct:2,expl:"Signal d'alarme d'abandon du navire = 7 SONS COURTS + 1 SON LONG répétés plusieurs fois. Ce signal est distinct du signal de détresse radio (MAYDAY). Il déclenche l'évacuation de tout l'équipage et des passagers vers les postes d'abandon. Complété par des annonces au haut-parleur. IMPORTANT : ce signal ne doit être déclenché QUE par le capitaine ou avec son autorisation. Les exercices d'abandon sont obligatoires (SOLAS) avant le départ de chaque voyage."},
    {q:"Quelle zone GMDSS couvre les zones polaires (au-delà de 70° de latitude) ?",opts:["Zone A1","Zone A2","Zone A3","Zone A4 — zones NON couvertes par Inmarsat — nécessite HF DSC obligatoire"],correct:3,expl:"Zone A4 = zones polaires non couvertes par les satellites Inmarsat géostationnaires (au-delà de 70°N ou 70°S). Ces zones exigent : radio HF avec DSC (obligatoire), Iridium recommandé (couverture polaire complète), EPIRB 406 MHz (COSPAS-SARSAT couvre les pôles contrairement à Inmarsat). La zone A3 couvre entre 70°S et 70°N avec Inmarsat. La zone A2 = MF + VHF (30-150 milles). La zone A1 = VHF uniquement (< 30 milles côte)."},
    {q:"Dans quelle situation un navire commercial est-il OBLIGÉ d'assister un navire en détresse ?",opts:["Jamais — c'est optionnel","Toujours — SOLAS Convention L3 impose l'obligation d'assistance à tout navire en détresse dans la mesure du possible sans danger pour son propre navire","Seulement si l'assurance le couvre","Seulement pour les navires battant même pavillon"],correct:1,expl:"Obligation d'assistance : SOLAS Convention, UNCLOS Article 98, Code pénal maritime. Tout capitaine de navire en mer EST OBLIGÉ d'assister toute personne en danger, dans la mesure du raisonnable sans danger grave pour son navire, équipage ou passagers. EXCEPTIONS limitées : risque grave pour le navire lui-même, autres secours plus adaptés déjà en route, coordination MRCC qui dirige les secours. MANQUEMENT = délit grave (délit de non-assistance à personne en danger en France)."},
    {q:"Qu'est-ce que la position HELP (Heat Escape Lessening Posture) et pourquoi est-elle critique ?",opts:["Une position de sommeil","Position corporelle limitant la perte de chaleur en mer — bras croisés sur la poitrine · genoux remontés · aide à survivre 2-3 fois plus longtemps en eau froide","Une technique de nage","Une position de secours"],correct:1,expl:"Position HELP (Heat Escape Lessening Posture) = position corporelle minimisant la perte de chaleur en eau froide. Techniques : bras croisés sur la poitrine (protège le torse et les aisselles), genoux remontés vers la poitrine (protège l'aine et la région abdominale), gilet de sauvetage gardé. Grouper les survivants = chaleur collective (position Huddle). SURVIE : en eau à 10°C, la position HELP peut doubler ou tripler le temps de survie. Hypothermie = première cause de décès des naufragés."},
  ],
  en:[
    {q:"What is the guaranteed minimum operating duration of a 406 MHz EPIRB?",opts:["12 hours","24 hours","48 hours — SOLAS obligation to signal distress throughout the SAR operation","96 hours"],correct:2,expl:"406 MHz EPIRB: minimum transmission duration = 48 HOURS per SOLAS/GMDSS. This duration is calculated to cover an entire standard SAR operation. The 406 MHz frequency transmits a coded digital signal with MMSI, GPS position (if connected), nature of distress. The secondary 121.5 MHz frequency allows final homing by SAR aircraft. Maintenance: annual check, battery replacement per manufacturer (5-10 years), mandatory registration."},
    {q:"What does the abandon ship sound signal mean?",opts:["1 long blast","5 short blasts","7 short blasts repeated + 1 long blast — general abandon ship alarm","3 long blasts"],correct:2,expl:"Abandon ship alarm signal = 7 SHORT BLASTS + 1 LONG BLAST repeated several times. This signal is distinct from the radio distress signal (MAYDAY). It triggers evacuation of all crew and passengers to muster stations. Supplemented by PA announcements. IMPORTANT: this signal must only be triggered by the captain or with their authorization. Abandon ship drills are mandatory (SOLAS) before each voyage departure."},
    {q:"Which GMDSS zone covers polar areas (beyond 70° latitude)?",opts:["Zone A1","Zone A2","Zone A3","Zone A4 — zones NOT covered by Inmarsat — requires mandatory HF DSC"],correct:3,expl:"Zone A4 = polar zones not covered by geostationary Inmarsat satellites (beyond 70°N or 70°S). These zones require: HF radio with DSC (mandatory), Iridium recommended (complete polar coverage), 406 MHz EPIRB (COSPAS-SARSAT covers poles unlike Inmarsat). Zone A3 covers between 70°S and 70°N with Inmarsat. Zone A2 = MF + VHF (30-150 miles). Zone A1 = VHF only (< 30 miles coast)."},
    {q:"When is a commercial vessel OBLIGATED to assist a vessel in distress?",opts:["Never — it's optional","Always — SOLAS Convention L3 imposes assistance obligation to any vessel in distress as far as possible without danger to own vessel","Only if insurance covers it","Only for vessels flying same flag"],correct:1,expl:"Assistance obligation: SOLAS Convention, UNCLOS Article 98, maritime criminal code. Every ship's master at sea IS OBLIGATED to assist any person in danger, to the extent reasonable without serious danger to own vessel, crew or passengers. LIMITED EXCEPTIONS: serious risk to own vessel, other more appropriate rescuers already en route, MRCC coordinating rescue. FAILURE = serious offense (failure to render assistance in France)."},
    {q:"What is the HELP (Heat Escape Lessening Posture) position and why is it critical?",opts:["A sleeping position","Body position limiting heat loss at sea — arms crossed over chest · knees raised · helps survive 2-3 times longer in cold water","A swimming technique","A rescue position"],correct:1,expl:"HELP (Heat Escape Lessening Posture) = body position minimizing heat loss in cold water. Technique: arms crossed over chest (protects torso and armpits), knees raised toward chest (protects groin and abdominal area), life jacket retained. Grouping survivors = shared warmth (Huddle position). SURVIVAL: in 10°C water, HELP position can double or triple survival time. Hypothermia = leading cause of death among shipwreck survivors."},
  ],
  es:[
    {q:"¿Cuál es la duración mínima garantizada de funcionamiento de una EPIRB de 406 MHz?",opts:["12 horas","24 horas","48 horas — obligación SOLAS para señalar la emergencia durante toda la operación SAR","96 horas"],correct:2,expl:"EPIRB 406 MHz: duración mínima de transmisión = 48 HORAS según SOLAS/SMSSM. Esta duración está calculada para cubrir toda una operación SAR estándar. La frecuencia 406 MHz transmite una señal digital codificada con el MMSI, la posición GPS, la naturaleza de la emergencia. La frecuencia secundaria 121,5 MHz permite la guía final de las aeronaves SAR. Mantenimiento: comprobación anual, sustitución de la batería según el fabricante, matriculación obligatoria."},
    {q:"¿Qué significa la señal sonora de abandono del buque?",opts:["1 sonido largo","5 sonidos cortos","7 sonidos cortos repetidos + 1 sonido largo — señal general de alarma de abandono del buque","3 sonidos largos"],correct:2,expl:"Señal de alarma de abandono del buque = 7 SONIDOS CORTOS + 1 SONIDO LARGO repetidos varias veces. Esta señal es distinta de la señal de socorro por radio (MAYDAY). Activa la evacuación de toda la tripulación y pasajeros. IMPORTANTE: esta señal solo debe ser activada por el capitán o con su autorización. Los ejercicios de abandono son obligatorios (SOLAS) antes de la salida de cada viaje."},
    {q:"¿Qué zona del SMSSM cubre las zonas polares (más allá de 70° de latitud)?",opts:["Zona A1","Zona A2","Zona A3","Zona A4 — zonas NO cubiertas por Inmarsat — requiere OC LSD obligatorio"],correct:3,expl:"Zona A4 = zonas polares no cubiertas por los satélites geoestacionarios Inmarsat (más allá de 70°N o 70°S). Estas zonas requieren: radio OC con LSD (obligatorio), Iridium recomendado (cobertura polar completa), EPIRB 406 MHz (COSPAS-SARSAT cubre los polos). La zona A3 cubre entre 70°S y 70°N con Inmarsat. La zona A2 = OM + VHF. La zona A1 = VHF únicamente."},
    {q:"¿En qué situación un buque mercante está OBLIGADO a asistir a un buque en peligro?",opts:["Nunca — es opcional","Siempre — el Convenio SOLAS impone la obligación de asistir a cualquier buque en peligro en la medida de lo posible sin peligro para su propio buque","Solo si el seguro lo cubre","Solo para buques que enarbolán el mismo pabellón"],correct:1,expl:"Obligación de asistencia: Convenio SOLAS, CONVEMAR Artículo 98, código penal marítimo. Todo capitán de buque en el mar ESTÁ OBLIGADO a prestar asistencia a cualquier persona en peligro, en la medida de lo razonable sin peligro grave para su buque. INCUMPLIMIENTO = delito grave."},
    {q:"¿Qué es la posición HELP (Heat Escape Lessening Posture) y por qué es crítica?",opts:["Una posición de sueño","Posición corporal que limita la pérdida de calor en el mar — brazos cruzados sobre el pecho · rodillas subidas · ayuda a sobrevivir 2-3 veces más en agua fría","Una técnica de natación","Una posición de rescate"],correct:1,expl:"Posición HELP = posición corporal que minimiza la pérdida de calor en agua fría. Técnica: brazos cruzados sobre el pecho, rodillas subidas hacia el pecho, chaleco salvavidas puesto. Agrupar a los supervivientes = calor colectivo (posición Huddle). SUPERVIVENCIA: en agua a 10°C, la posición HELP puede duplicar o triplicar el tiempo de supervivencia. Hipotermia = principal causa de muerte de los náufragos."},
  ],
  pt:[
    {q:"Qual é a duração mínima garantida de funcionamento de uma EPIRB de 406 MHz?",opts:["12 horas","24 horas","48 horas — obrigação SOLAS para sinalizar o perigo durante toda a operação SAR","96 horas"],correct:2,expl:"EPIRB 406 MHz: duração mínima de transmissão = 48 HORAS segundo SOLAS/GMDSS. Esta duração está calculada para cobrir toda uma operação SAR padrão. A frequência 406 MHz transmite um sinal digital codificado com o MMSI, posição GPS, natureza do perigo. A frequência secundária 121,5 MHz permite a orientação final das aeronaves SAR. Manutenção: verificação anual, substituição da bateria segundo o fabricante, registo obrigatório."},
    {q:"O que significa o sinal sonoro de abandono do navio?",opts:["1 som longo","5 sons curtos","7 sons curtos repetidos + 1 som longo — alarme geral de abandono do navio","3 sons longos"],correct:2,expl:"Sinal de alarme de abandono do navio = 7 SONS CURTOS + 1 SOM LONGO repetidos várias vezes. Este sinal é diferente do sinal de socorro por rádio (MAYDAY). Desencadeia a evacuação de toda a tripulação e passageiros. IMPORTANTE: este sinal só deve ser acionado pelo capitão ou com a sua autorização. Os exercícios de abandono são obrigatórios (SOLAS) antes da partida de cada viagem."},
    {q:"Que zona GMDSS cobre as zonas polares (além de 70° de latitude)?",opts:["Zona A1","Zona A2","Zona A3","Zona A4 — zonas NÃO cobertas pelo Inmarsat — requer OC ASN obrigatório"],correct:3,expl:"Zona A4 = zonas polares não cobertas pelos satélites geoestacionários Inmarsat (além de 70°N ou 70°S). Estas zonas requerem: rádio OC com ASN (obrigatório), Iridium recomendado (cobertura polar completa), EPIRB 406 MHz (COSPAS-SARSAT cobre os polos). Zona A3 cobre entre 70°S e 70°N com Inmarsat. Zona A2 = OM + VHF. Zona A1 = VHF apenas."},
    {q:"Em que situação um navio comercial é OBRIGADO a assistir um navio em perigo?",opts:["Nunca — é opcional","Sempre — a Convenção SOLAS impõe a obrigação de assistir qualquer navio em perigo na medida do possível sem perigo para o seu próprio navio","Apenas se o seguro cobrir","Apenas para navios com o mesmo pavilhão"],correct:1,expl:"Obrigação de assistência: Convenção SOLAS, UNCLOS Artigo 98, código penal marítimo. Todo o capitão de navio no mar É OBRIGADO a prestar assistência a qualquer pessoa em perigo, na medida do razoável sem perigo grave para o seu navio. INCUMPRIMENTO = infração grave."},
    {q:"O que é a posição HELP (Heat Escape Lessening Posture) e porque é crítica?",opts:["Uma posição de sono","Posição corporal limitando a perda de calor no mar — braços cruzados sobre o peito · joelhos levantados · ajuda a sobreviver 2-3 vezes mais em água fria","Uma técnica de natação","Uma posição de socorro"],correct:1,expl:"Posição HELP = posição corporal minimizando a perda de calor em água fria. Técnica: braços cruzados sobre o peito, joelhos levantados para o peito, colete salva-vidas mantido. Agrupar os sobreviventes = calor coletivo (posição Huddle). SOBREVIVÊNCIA: em água a 10°C, a posição HELP pode duplicar ou triplicar o tempo de sobrevivência. Hipotermia = principal causa de morte dos náufragos."},
  ],
};

export const BANK = {
  fr:[
    {q:"Qu'est-ce que l'obligation de 'port de refuge' pour un navire en difficulté ?",opts:["Un port militaire","Obligation des États côtiers d'accepter les navires en difficulté dans leurs ports pour éviter un sinistre majeur en mer — conflit entre souveraineté et humanité","Un port commercial","Un port de secours militaire"],correct:1,expl:"Port de refuge (Place of Refuge) : navire en difficulté peut demander à entrer dans le port le plus proche. Les États côtiers ont une OBLIGATION morale et croissante obligation légale (Directive européenne 2002/59/CE) d'accepter les navires en détresse. PROBLÈME HISTORIQUE : Espagne a refusé au Prestige (2002) → naufrage et 77 000t de fuel. Équilibre : risque environnemental vs risque de naufrage en mer. Les MRCC évaluent au cas par cas."},
    {q:"Qu'est-ce qu'un 'IMO number' (numéro OMI) et comment diffère-t-il du MMSI ?",opts:["Ils sont identiques","IMO = numéro permanent du navire (7 chiffres) qui reste avec lui toute sa vie · MMSI = numéro radio à 9 chiffres · changeable si changement de pavillon","Le MMSI est permanent","L'IMO change à chaque voyage"],correct:1,expl:"Numéro OMI (IMO number) : numéro à 7 chiffres attribué à la construction du navire, PERMANENT pour toute sa vie même si le navire change de nom, de pavillon ou d'armateur. Format : IMO 9234567. MMSI : numéro radio à 9 chiffres lié au pavillon. CHANGEABLE si changement de pavillon. Format : 9 chiffres (ex: 227456789 pour France). Différence clé : l'OMI suit le navire, le MMSI suit le pavillon."},
    {q:"Qu'est-ce que le principe de 'navire en dernier ressort' (ship of last resort) ?",opts:["Le meilleur navire de la flotte","Obligation du capitaine de maintenir le navire à flot le plus longtemps possible avant d'ordonner l'abandon — l'abandon prématuré est une erreur fréquente","Un navire militaire de sauvetage","Le dernier navire d'une flotte"],correct:1,expl:"Principe 'ship of last resort' : le navire, même endommagé, est généralement plus sûr que les eaux environnantes. L'abandon prématuré avant que le navire soit véritablement en perdition = erreur fréquente causant des décès inutiles. Statistiques : les naufragés qui attendent d'être secourus à bord survivent plus souvent que ceux qui abandonnent prématurément. RÈGLE : n'abandonner que quand le navire est 'plus dangereux que la mer'."},
    {q:"Qu'est-ce que l'AIS-SART par rapport à un SART conventionnel ?",opts:["Ils sont identiques","AIS-SART émet sur les fréquences AIS (161/162 MHz) et apparaît comme cible spéciale sur l'écran AIS · MMSI commençant par 970 · visible sur navires ET aéronefs équipés AIS","AIS-SART est moins précis","SART est plus récent"],correct:1,expl:"AIS-SART vs SART radar : AIS-SART transmet sur canaux AIS 161.975 MHz et 162.025 MHz. Identifiable par MMSI commençant par 970. Visible sur écran AIS comme cible spéciale avec icône d'alerte. Portée : 5-10 milles (navire), 40+ milles (aéronef SAR). AVANTAGE : identifiable par AIS ET radar. Pas impacté par sea clutter/rain clutter. SART conventionnel : uniquement visible sur radar X-Band. Apparaît comme ligne de 12 points. Portée similaire. Les deux sont homologués GMDSS."},
    {q:"Quelle est la différence entre un 'canot de sauvetage' et un 'radeau de survie' ?",opts:["Ils sont identiques","Canot de sauvetage = embarcation fermée motorisée avec capacité 100% du personnel · Radeau de survie = gonflable léger non motorisé pour urgences","Radeau = plus grand","Canot = moins résistant"],correct:1,expl:"Canot de sauvetage (lifeboat) : embarcation rigide (fibre ou acier), souvent fermée (type free-fall), motorisée (propulseur indépendant), alimentée par des batteries ou moteur diesel, capacité = 100% du personnel. Stabilisée dans les conditions extrêmes. Radeau de survie (life raft) : gonflable ou rigide non motorisé, plus léger, déployé rapidement, capacité variable. Complément ou substitut si les canots sont inaccessibles. SOLAS exige les deux sur les navires commerciaux selon la taille."},
    {q:"Qu'est-ce que le signal de 'détresse visuel' (SOS) en dehors des pyrotechniques ?",opts:["Uniquement les fusées","Bras levés et abaissés lentement · miroir héliographe · feux fluorescents · tissu orange sur toit · rames tendues dans l'air · éclats lumineux · TOUTE méthode visible de loin","Uniquement la radio","Uniquement l'EPIRB"],correct:1,expl:"Signaux de détresse visuels reconnus par SOLAS Annexe IV : 1. Fusées rouges parachute. 2. Feu à main rouge. 3. Fumigène orange. 4. Miroir héliographe. 5. Bras levés et abaissés. 6. Tissu/planche orange fluo. 7. Flammes (si possibles). 8. Signaux radio (MAYDAY). 9. Signal sonore SOS (··· --- ···). 10. Signal NC pavillons. 11. EPIRB. Le code SOS en Morse peut être émis par n'importe quel moyen (lumière, son, signaux)."},
    {q:"Qu'est-ce que la procédure 'MOB' (Man Overboard) pour récupérer un naufragé à la mer ?",opts:["Une procédure médicale","Procédure d'urgence : lancer la bouée MOB → marquer la position GPS → déclencher PAN-PAN → manœuvre Williamson ou Quick Turn → récupération à faible vitesse","Un signal sonore","Un type de sauvetage"],correct:1,expl:"Procédure MOB : 1. LANCER bouée MOB immédiatement. 2. ALERTER l'équipage ('homme à la mer'). 3. MARQUER position GPS. 4. DÉSIGNER un guetteur pointant vers la victime sans la quitter des yeux. 5. PAN-PAN sur VHF 16 (ou MAYDAY si danger de vie). 6. MANŒUVRE : virage de Williamson (retour sur sa route) ou virage rapide. 7. APPROCHE à faible vitesse face au vent. 8. RÉCUPÉRATION avec filet de sauvetage, perche, anneau. Temps critique : l'hypothermie commence en 10-15 min en eau froide."},
    {q:"Qu'est-ce que la 'manœuvre de Williamson' et pourquoi est-elle utilisée pour le MOB ?",opts:["Une manœuvre commerciale","Manœuvre de retour sur la trajectoire initiale : virer sur un bord → virer à 60° dans l'autre sens → revenir sur la route de départ — permet de retrouver la position exacte du MOB","Une manœuvre de port","Un type de marée"],correct:1,expl:"Manœuvre de Williamson : 1. Virer de TOUTE LA BARRE du côté du MOB (ex: bâbord). 2. Quand le cap a viré de 60° → virer dans l'AUTRE sens (tribord). 3. Quand le cap est à 180° de la route initiale → maintenir ce cap. 4. Le navire revient sur sa route initiale en sens inverse. But : revenir exactement à l'endroit où le MOB a chuté. Avantage : trajectoire de retour couvre la zone de dérive probable. Utilisée par visibilité réduite ou de nuit. La 'manœuvre du cercle' (quick turn) est plus rapide mais moins précise."},
    {q:"Qu'est-ce qu'un exercice 'drill' d'abandon du navire selon SOLAS ?",opts:["Un exercice optionnel","Exercice obligatoire avant départ de chaque voyage passager (SOLAS III/19) · dans les 24h suivant l'embarquement des passagers · pratique complète des procédures d'abandon","Un test du radar","Un exercice de navigation"],correct:1,expl:"Drill d'abandon navire (muster drill) : SOLAS Chapitre III Règle 19 exige : drill complet avant départ si > 25% nouveaux passagers. Pour passagers : information en < 24h d'embarquement. Pour l'équipage : exercice mensuel. Contenu : alarm recognition, muster station, gilet de sauvetage, canot/radeau, EPIRB, VHF portable. SOLAS 2020 : exercices individuels numériques autorisés en complément. But : équipage et passagers doivent savoir exactement quoi faire sans panique."},
    {q:"Qu'est-ce que la 'coordination SAR' entre plusieurs MRCC de pays différents ?",opts:["Impossible","Coordonnée via le Système de Coordination SAR Mondial avec accords bilatéraux · transfert de coordination possible entre MRCC adjacents · IAMSAR Manual (IMO/ICAO)","Seulement dans l'UE","Uniquement par radio"],correct:1,expl:"Coordination SAR internationale : IAMSAR Manual (International Aeronautical and Maritime Search And Rescue) = guide IMO/ICAO pour la coordination SAR. RCC (Rescue Coordination Centre) = centre de coordination SAR national. SRR (Search and Rescue Region) = zones de responsabilité SAR. Transfert de coordination possible entre MRCC adjacents si le navire est proche de la frontière d'une autre SRR. Accords bilatéraux entre pays pour la coordination. En Méditerranée : nombreuses coordinations entre CROSS France, Guardia Costiera Italie, MRCC Espagne."},
    {q:"Quelle est la fréquence de détresse MF utilisée pour le DSC en zone A2 ?",opts:["156.800 MHz","2182 kHz","2187.5 kHz — fréquence MF DSC utilisée pour les alertes de détresse numériques en zone A2","518 kHz"],correct:2,expl:"Fréquence MF DSC = 2187.5 kHz (ondes moyennes). Utilisée en zone A2 pour les appels DSC de détresse. Après l'alerte DSC, les communications de détresse se font sur : 2182 kHz (voix) ou fréquences de travail SSB. Fréquences GMDSS : VHF ch.70 = 156.525 MHz, VHF ch.16 = 156.800 MHz, MF DSC = 2187.5 kHz, MF voix = 2182 kHz, HF DSC (A3/A4) = 4207.5 · 6312 · 8414.5 · 12577 · 16804.5 kHz."},
    {q:"Qu'est-ce que le 'distress traffic' et qui peut l'interrompre ?",opts:["Tout trafic sur ch.16","Communication de détresse en cours sur ch.16 — ne peut être interrompue que par la station coordinatrice SAR (MRCC) ou par une alerte de détresse encore plus urgente","Un test radio","Un appel ordinaire"],correct:1,expl:"Distress traffic = ensemble des communications radio liées à une situation de détresse. Une fois un MAYDAY engagé sur ch.16 : SILENCE RADIO obligatoire pour tous les autres navires (sauf pour la détresse). Seule la station coordinatrice (MRCC ou navire coordinateur OSC) peut autoriser d'autres communications. Si deux détresses simultanées = la plus grave/urgente a priorité. OSC (On-Scene Coordinator) = navire désigné pour coordonner les opérations sur place."},
    {q:"Qu'est-ce qu'un 'RLS' (Radio Localisation par Satellite) différent d'une EPIRB ?",opts:["Ils sont identiques","PLB (Personal Locator Beacon) = balise individuelle portative sur 406 MHz · plus petite · durée 24h min · pour terrestre ET maritime · pas obligatoire SOLAS mais recommandée","Un radar","Une radio VHF"],correct:1,expl:"PLB (Personal Locator Beacon) = RLS individuel. Différences avec EPIRB : PLB = balise PERSONNELLE portative (vs EPIRB = balise du navire). Durée : 24h min (vs 48h EPIRB). Usage : terrestre ET maritime. Non homologuée SOLAS à la place de l'EPIRB. Taille : très petite (peut se porter sur soi). MMSI : format différent. AVANTAGE : portable sur soi = protection même hors du navire. Recommandée en complément de l'EPIRB pour chaque membre d'équipage."},
    {q:"Qu'est-ce que la procédure SAR de 'datum' et pourquoi est-elle fondamentale ?",opts:["La position exacte d'un navire","Point de référence calculé pour les opérations SAR — prend en compte la position initiale + dérive vent + courant + temps écoulé — mis à jour en continu par le MRCC","Une position GPS fixe","Un point de rencontre"],correct:1,expl:"DATUM SAR = point de référence ou zone de recherche calculée pour les opérations SAR. Calcul : position initiale (EPIRB/MAYDAY) + dérive par le vent + dérive par le courant + temps écoulé depuis l'alerte. Mis à jour toutes les heures par le MRCC selon les nouvelles données météo/courant. IAMSAR Manual fournit les formules de calcul. Importance : sans datum précis, les recherches s'étendent sur une zone trop large = faible probabilité de détection. Les logiciels SAR (SAROPS, FAST) automatisent ce calcul."},
    {q:"Dans une situation de naufrage, quelle est la règle de survie concernant l'eau douce ?",opts:["Boire autant que possible","Ration minimale 500ml/personne/jour · NE JAMAIS boire eau de mer (aggrave la déshydratation) · eau de pluie collectée si possible · l'eau est la priorité de survie #1","Boire eau de mer en cas d'urgence","Attendre 48h avant de boire"],correct:1,expl:"Eau douce en survie maritime : ration minimale = 500ml/personne/jour (à maintenir absolument). NE JAMAIS boire eau de mer : le sel oblige les reins à éliminer plus d'eau qu'ils n'en absorbent → aggrave la déshydratation → mort accélérée. Collecter : eau de pluie (tarpaulins), condensation nocturne, dessalement manuel (kits de survie). Pluie = priorité de collecte. Aliments : éviter les aliments secs qui consomment de l'eau digestive. Déshydratation = cause de mort rapide (48-72h en conditions extrêmes sans eau)."},
  ],
  en:[
    {q:"What is the 'port of refuge' obligation for a vessel in distress?",opts:["A military port","Obligation of coastal states to accept vessels in distress in their ports to avoid a major casualty at sea — conflict between sovereignty and humanity","A commercial port","A military rescue port"],correct:1,expl:"Port of Refuge: vessel in distress may request entry into the nearest port. Coastal states have a moral and increasing legal obligation (EU Directive 2002/59/CE) to accept distressed vessels. HISTORICAL PROBLEM: Spain refused the Prestige (2002) → sinking and 77,000t of fuel. Balance: environmental risk vs risk of sinking at sea. MRCCs assess case by case."},
    {q:"What is an 'IMO number' and how does it differ from MMSI?",opts:["They are identical","IMO = permanent vessel number (7 digits) that stays with it all its life · MMSI = 9-digit radio number · changeable if flag changes","MMSI is permanent","IMO changes every voyage"],correct:1,expl:"IMO number: 7-digit number assigned at vessel construction, PERMANENT for its entire life even if vessel changes name, flag or owner. Format: IMO 9234567. MMSI: 9-digit radio number linked to flag. CHANGEABLE if flag changes. Format: 9 digits (e.g. 227456789 for France). Key difference: IMO follows the vessel, MMSI follows the flag."},
    {q:"What is the 'ship of last resort' principle?",opts:["The best ship in the fleet","Captain's obligation to keep the vessel afloat as long as possible before ordering abandonment — premature abandonment is a frequent error","A military rescue vessel","The last ship of a fleet"],correct:1,expl:"'Ship of last resort' principle: the vessel, even if damaged, is generally safer than the surrounding waters. Premature abandonment before the vessel is truly sinking = frequent error causing unnecessary deaths. Statistics: survivors who wait to be rescued on board survive more often than those who prematurely abandon. RULE: only abandon when the vessel is 'more dangerous than the sea'."},
    {q:"What is AIS-SART compared to a conventional SART?",opts:["They are identical","AIS-SART transmits on AIS frequencies (161/162 MHz) and appears as special target on AIS screen · MMSI starting with 970 · visible on vessels AND aircraft equipped with AIS","AIS-SART is less precise","SART is more recent"],correct:1,expl:"AIS-SART vs radar SART: AIS-SART transmits on AIS channels 161.975 MHz and 162.025 MHz. Identifiable by MMSI starting with 970. Visible on AIS screen as special target with alert icon. Range: 5-10 miles (vessel), 40+ miles (SAR aircraft). ADVANTAGE: identifiable by AIS AND radar. Not impacted by sea/rain clutter. Conventional SART: only visible on X-Band radar. Appears as line of 12 dots. Similar range. Both are GMDSS approved."},
    {q:"What is the difference between a 'lifeboat' and a 'life raft'?",opts:["They are identical","Lifeboat = closed motorized craft with 100% personnel capacity · Life raft = lightweight non-motorized inflatable for emergencies","Life raft = larger","Lifeboat = less resistant"],correct:1,expl:"Lifeboat: rigid craft (fibre or steel), often enclosed (free-fall type), motorized (independent propulsion), powered by batteries or diesel engine, capacity = 100% personnel. Stable in extreme conditions. Life raft: inflatable or rigid non-motorized, lighter, rapidly deployed, variable capacity. Complement or substitute if lifeboats inaccessible. SOLAS requires both on commercial vessels depending on size."},
    {q:"What are the visual distress signals (SOS) outside pyrotechnics?",opts:["Flares only","Slowly raised and lowered arms · heliograph mirror · fluorescent lights · orange cloth on roof · oars held up · light flashes · ANY method visible from afar","Radio only","EPIRB only"],correct:1,expl:"Visual distress signals recognized by SOLAS Annex IV: 1. Red parachute flares. 2. Red hand flare. 3. Orange smoke. 4. Heliograph mirror. 5. Arms raised and lowered. 6. Orange/fluoro cloth/board. 7. Flames (if possible). 8. Radio signals (MAYDAY). 9. SOS sound signal (··· --- ···). 10. NC flag signal. 11. EPIRB. SOS Morse code can be emitted by any means (light, sound, signals)."},
    {q:"What is the 'MOB' (Man Overboard) procedure for recovering a person at sea?",opts:["A medical procedure","Emergency procedure: throw MOB buoy → mark GPS position → sound PAN-PAN → Williamson turn or Quick Turn → recovery at slow speed","A sound signal","A type of rescue"],correct:1,expl:"MOB procedure: 1. THROW MOB buoy immediately. 2. ALERT crew ('man overboard'). 3. MARK GPS position. 4. DESIGNATE a lookout pointing toward victim without losing sight. 5. PAN-PAN on VHF 16 (or MAYDAY if life danger). 6. MANEUVER: Williamson turn (return on track) or quick turn. 7. APPROACH at slow speed into wind. 8. RECOVERY with rescue net, pole, ring. Critical time: hypothermia begins in 10-15 min in cold water."},
    {q:"What is the 'Williamson Turn' and why is it used for MOB?",opts:["A commercial maneuver","Maneuver to return to initial track: alter on one side → alter 60° the other way → return to original course — allows returning to exact MOB position","A port maneuver","A type of tide"],correct:1,expl:"Williamson Turn: 1. Alter FULL HELM to the MOB side (e.g. port). 2. When heading has turned 60° → alter OTHER way (starboard). 3. When heading is 180° from original course → maintain heading. 4. Vessel returns to original track in reverse direction. Purpose: return exactly where MOB fell. Advantage: return track covers probable drift area. Used in restricted visibility or at night. The 'quick turn' is faster but less precise."},
    {q:"What is a 'muster drill' (abandon ship exercise) per SOLAS?",opts:["An optional exercise","Mandatory exercise before departure of each passenger voyage (SOLAS III/19) · within 24h of passenger embarkation · full practice of abandonment procedures","A radar test","A navigation exercise"],correct:1,expl:"Abandon ship drill (muster drill): SOLAS Chapter III Rule 19 requires: full drill before departure if > 25% new passengers. For passengers: information within < 24h of embarkation. For crew: monthly exercise. Content: alarm recognition, muster station, life jacket, lifeboat/raft, EPIRB, portable VHF. SOLAS 2020: individual digital exercises authorized as supplement. Purpose: crew and passengers must know exactly what to do without panic."},
    {q:"What is the 'SAR coordination' between different countries' MRCCs?",opts:["Impossible","Coordinated via the Global SAR Coordination System with bilateral agreements · coordination transfer possible between adjacent MRCCs · IAMSAR Manual (IMO/ICAO)","Only in the EU","Only by radio"],correct:1,expl:"International SAR coordination: IAMSAR Manual (International Aeronautical and Maritime Search And Rescue) = IMO/ICAO SAR coordination guide. RCC (Rescue Coordination Centre) = national SAR coordination center. SRR (Search and Rescue Region) = SAR responsibility zones. Coordination transfer possible between adjacent MRCCs if vessel near another SRR boundary. Bilateral agreements between countries. In Mediterranean: many coordinations between CROSS France, Italian Coastguard, Spanish MRCC."},
    {q:"What is the MF distress frequency used for DSC in zone A2?",opts:["156.800 MHz","2182 kHz","2187.5 kHz — MF DSC frequency used for digital distress alerts in zone A2","518 kHz"],correct:2,expl:"MF DSC frequency = 2187.5 kHz (medium waves). Used in zone A2 for DSC distress calls. After DSC alert, distress communications conducted on: 2182 kHz (voice) or SSB working frequencies. GMDSS frequencies: VHF ch.70 = 156.525 MHz, VHF ch.16 = 156.800 MHz, MF DSC = 2187.5 kHz, MF voice = 2182 kHz, HF DSC (A3/A4) = 4207.5 · 6312 · 8414.5 · 12577 · 16804.5 kHz."},
    {q:"What is 'distress traffic' and who can interrupt it?",opts:["All traffic on ch.16","Ongoing distress communication on ch.16 — can only be interrupted by the SAR coordinating station (MRCC) or by an even more urgent distress alert","A radio test","An ordinary call"],correct:1,expl:"Distress traffic = all radio communications related to a distress situation. Once a MAYDAY is engaged on ch.16: mandatory RADIO SILENCE for all other vessels (except for the distress). Only the coordinating station (MRCC or on-scene coordinator OSC) can authorize other communications. If two simultaneous distresses = most serious/urgent has priority. OSC (On-Scene Coordinator) = vessel designated to coordinate on-site operations."},
    {q:"What is a 'PLB' (Personal Locator Beacon) different from an EPIRB?",opts:["They are identical","PLB = personal portable beacon on 406 MHz · smaller · 24h min duration · for land AND maritime · not SOLAS mandatory but recommended","A radar","A VHF radio"],correct:1,expl:"PLB (Personal Locator Beacon) = individual RLS. Differences from EPIRB: PLB = PERSONAL portable beacon (vs EPIRB = vessel beacon). Duration: 24h min (vs 48h EPIRB). Use: land AND maritime. Not SOLAS-approved replacement for EPIRB. Size: very small (can be carried on person). Different MMSI format. ADVANTAGE: portable on person = protection even off the vessel. Recommended as supplement to EPIRB for each crew member."},
    {q:"What is the SAR 'datum' procedure and why is it fundamental?",opts:["The exact position of a vessel","Reference point calculated for SAR operations — takes into account initial position + wind drift + current + elapsed time — continuously updated by MRCC","A fixed GPS position","A meeting point"],correct:1,expl:"SAR DATUM = reference point or search area calculated for SAR operations. Calculation: initial position (EPIRB/MAYDAY) + wind drift + current drift + time elapsed since alert. Updated every hour by MRCC based on new weather/current data. IAMSAR Manual provides calculation formulas. Importance: without precise datum, searches extend over too large an area = low detection probability. SAR software (SAROPS, FAST) automates this calculation."},
    {q:"In a shipwreck situation, what is the survival rule regarding fresh water?",opts:["Drink as much as possible","Minimum ration 500ml/person/day · NEVER drink seawater (worsens dehydration) · collect rainwater if possible · water is survival priority #1","Drink seawater in emergency","Wait 48h before drinking"],correct:1,expl:"Fresh water in maritime survival: minimum ration = 500ml/person/day (absolutely maintain). NEVER drink seawater: the salt forces kidneys to eliminate more water than they absorb → worsens dehydration → accelerates death. Collect: rainwater (tarpaulins), nocturnal condensation, manual desalination (survival kits). Rain = collection priority. Food: avoid dry foods that consume digestive water. Dehydration = rapid cause of death (48-72h in extreme conditions without water)."},
  ],
  es:[
    {q:"¿Qué es la obligación de 'puerto de refugio' para un buque en peligro?",opts:["Un puerto militar","Obligación de los Estados ribereños de aceptar los buques en peligro en sus puertos para evitar un siniestro mayor en el mar — conflicto entre soberanía y humanidad","Un puerto comercial","Un puerto de rescate militar"],correct:1,expl:"Puerto de refugio: el buque en peligro puede solicitar la entrada en el puerto más cercano. Los Estados ribereños tienen una obligación moral y creciente obligación legal (Directiva europea 2002/59/CE) de aceptar buques en peligro. PROBLEMA HISTÓRICO: España rechazó al Prestige (2002) → naufragio y 77.000t de fuel. Equilibrio: riesgo medioambiental vs riesgo de naufragio en el mar. Los MRCC evalúan caso por caso."},
    {q:"¿Qué es un 'número OMI' (IMO number) y cómo difiere del MMSI?",opts:["Son idénticos","OMI = número permanente del buque (7 dígitos) que permanece con él toda su vida · MMSI = número de radio de 9 dígitos · modificable si cambia de pabellón","El MMSI es permanente","El OMI cambia en cada viaje"],correct:1,expl:"Número OMI: número de 7 dígitos asignado en la construcción del buque, PERMANENTE para toda su vida incluso si cambia de nombre, pabellón o armador. MMSI: número de radio de 9 dígitos vinculado al pabellón. MODIFICABLE si cambia de pabellón. Diferencia clave: el OMI sigue al buque, el MMSI sigue al pabellón."},
    {q:"¿Qué es el principio del 'último recurso del buque' (ship of last resort)?",opts:["El mejor buque de la flota","Obligación del capitán de mantener el buque a flote el mayor tiempo posible antes de ordenar el abandono — el abandono prematuro es un error frecuente","Un buque militar de salvamento","El último buque de una flota"],correct:1,expl:"Principio 'ship of last resort': el buque, aunque esté dañado, es generalmente más seguro que las aguas circundantes. El abandono prematuro antes de que el buque esté verdaderamente hundiéndose = error frecuente que causa muertes innecesarias. REGLA: abandonar solo cuando el buque sea 'más peligroso que el mar'."},
    {q:"¿Qué es el AIS-SART en comparación con un SART convencional?",opts:["Son idénticos","El AIS-SART emite en las frecuencias AIS (161/162 MHz) y aparece como blanco especial en la pantalla AIS · MMSI que comienza por 970 · visible en buques Y aeronaves equipados con AIS","El AIS-SART es menos preciso","El SART es más reciente"],correct:1,expl:"AIS-SART vs SART de radar: AIS-SART transmite en canales AIS 161,975 MHz y 162,025 MHz. Identificable por MMSI que empieza por 970. Visible en pantalla AIS como blanco especial con icono de alerta. VENTAJA: identificable por AIS Y radar. No afectado por sea/rain clutter. SART convencional: solo visible en radar de banda X. Aparece como línea de 12 puntos. Alcance similar. Ambos homologados SMSSM."},
    {q:"¿Cuál es la diferencia entre un 'bote salvavidas' y una 'balsa salvavidas'?",opts:["Son idénticos","Bote salvavidas = embarcación cerrada motorizada con capacidad del 100% del personal · Balsa salvavidas = hinchable ligero no motorizado para emergencias","La balsa es más grande","El bote es menos resistente"],correct:1,expl:"Bote salvavidas: embarcación rígida (fibra o acero), a menudo cerrada (tipo caída libre), motorizada, capacidad = 100% del personal. Estable en condiciones extremas. Balsa salvavidas: hinchable o rígida no motorizada, más ligera, de despliegue rápido, capacidad variable. El SOLAS exige ambos en los buques comerciales según el tamaño."},
    {q:"¿Cuáles son las señales de socorro visuales (SOS) fuera de los pirotécnicos?",opts:["Solo cohetes","Brazos levantados y bajados lentamente · espejo de señales · luces fluorescentes · tela naranja en el techo · remos en el aire · CUALQUIER método visible de lejos","Solo la radio","Solo la EPIRB"],correct:1,expl:"Señales de socorro visuales reconocidas por SOLAS Anexo IV: 1. Cohetes rojos con paracaídas. 2. Bengala de mano roja. 3. Señal de humo naranja. 4. Espejo de señales. 5. Brazos levantados y bajados. 6. Tela/tabla naranja fluor. 7. Llamas. 8. Señales de radio (MAYDAY). 9. Señal sonora SOS. 10. Señal NC de banderas. 11. EPIRB."},
    {q:"¿Qué es el procedimiento 'MOB' (Hombre al Agua) para recuperar a un náufrago en el mar?",opts:["Un procedimiento médico","Procedimiento de urgencia: lanzar la boya MOB → marcar posición GPS → emitir PAN-PAN → maniobra Williamson o giro rápido → recuperación a baja velocidad","Una señal sonora","Un tipo de rescate"],correct:1,expl:"Procedimiento MOB: 1. LANZAR boya MOB inmediatamente. 2. ALERTAR a la tripulación. 3. MARCAR posición GPS. 4. DESIGNAR un vigía que señale hacia la víctima. 5. PAN-PAN en VHF 16. 6. MANIOBRA Williamson o giro rápido. 7. APROXIMACIÓN a baja velocidad de cara al viento. 8. RECUPERACIÓN con red, pértiga, aro. Tiempo crítico: hipotermia empieza en 10-15 min en agua fría."},
    {q:"¿Qué es la 'maniobra de Williamson' y por qué se usa para el MOB?",opts:["Una maniobra comercial","Maniobra de retorno a la trayectoria inicial: virar a un lado → virar 60° al otro lado → volver al rumbo inicial — permite volver a la posición exacta del MOB","Una maniobra de puerto","Un tipo de marea"],correct:1,expl:"Maniobra de Williamson: 1. Virar TODO el timón hacia el lado del MOB (ej.: babor). 2. Cuando el rumbo haya variado 60° → virar al OTRO lado (estribor). 3. Cuando el rumbo esté a 180° del original → mantener ese rumbo. 4. El buque vuelve a su trayectoria inicial en sentido inverso. Objetivo: volver exactamente al lugar donde cayó el MOB."},
    {q:"¿Qué es un ejercicio 'de zafarrancho de abandono' según el SOLAS?",opts:["Un ejercicio optativo","Ejercicio obligatorio antes de la salida de cada viaje de pasajeros (SOLAS III/19) · en las 24h siguientes al embarco de pasajeros · práctica completa de los procedimientos de abandono","Un test del radar","Un ejercicio de navegación"],correct:1,expl:"Zafarrancho de abandono: SOLAS Capítulo III Regla 19 exige: ejercicio completo antes de la salida si > 25% de nuevos pasajeros. Para pasajeros: información en < 24h del embarco. Para la tripulación: ejercicio mensual. Contenido: reconocimiento de la alarma, puesto de reunión, chaleco salvavidas, bote/balsa, EPIRB, VHF portátil."},
    {q:"¿Qué es la 'coordinación SAR' entre MRCC de distintos países?",opts:["Imposible","Coordinada mediante el Sistema de Coordinación SAR Mundial con acuerdos bilaterales · transferencia de coordinación posible entre MRCC adyacentes · Manual IAMSAR (OMI/OACI)","Solo en la UE","Solo por radio"],correct:1,expl:"Coordinación SAR internacional: Manual IAMSAR = guía OMI/OACI para la coordinación SAR. RCC = centro de coordinación SAR nacional. SRR = zonas de responsabilidad SAR. Transferencia de coordinación posible entre MRCC adyacentes. Acuerdos bilaterales entre países. En el Mediterráneo: numerosas coordinaciones entre CROSS Francia, Guardia Costera Italia, MRCC España."},
    {q:"¿Cuál es la frecuencia de socorro OM utilizada para el LSD en la zona A2?",opts:["156.800 MHz","2182 kHz","2187,5 kHz — frecuencia OM LSD utilizada para las alertas de socorro digitales en la zona A2","518 kHz"],correct:2,expl:"Frecuencia OM LSD = 2187,5 kHz (ondas medias). Utilizada en zona A2 para llamadas LSD de socorro. Frecuencias SMSSM: VHF ch.70 = 156,525 MHz, VHF ch.16 = 156,800 MHz, OM LSD = 2187,5 kHz, OM voz = 2182 kHz, OC LSD (A3/A4) = 4207,5 · 6312 · 8414,5 · 12577 · 16804,5 kHz."},
    {q:"¿Qué es el 'tráfico de socorro' y quién puede interrumpirlo?",opts:["Todo el tráfico en el ch.16","Comunicación de socorro en curso en el ch.16 — solo puede ser interrumpida por la estación coordinadora SAR (MRCC) o por una alerta de socorro aún más urgente","Un test de radio","Una llamada ordinaria"],correct:1,expl:"Tráfico de socorro = conjunto de las comunicaciones de radio relacionadas con una situación de socorro. Una vez un MAYDAY en curso en ch.16: SILENCIO RADIO obligatorio para todos los demás buques. Solo la estación coordinadora (MRCC u OSC) puede autorizar otras comunicaciones. OSC (On-Scene Coordinator) = buque designado para coordinar las operaciones in situ."},
    {q:"¿Qué es una 'PLB' (Baliza de Localización Personal) diferente de una EPIRB?",opts:["Son idénticas","PLB = baliza individual portátil en 406 MHz · más pequeña · duración 24h mín. · para uso terrestre Y marítimo · no obligatoria SOLAS pero recomendada","Un radar","Una radio VHF"],correct:1,expl:"PLB = baliza individual. Diferencias con EPIRB: PLB = baliza PERSONAL portátil (frente a EPIRB = baliza del buque). Duración: 24h mín. (frente a 48h EPIRB). Uso: terrestre Y marítimo. No homologada SOLAS en sustitución de la EPIRB. Tamaño: muy pequeña (se puede llevar encima). VENTAJA: portátil encima = protección incluso fuera del buque."},
    {q:"¿Qué es el procedimiento SAR de 'datum' y por qué es fundamental?",opts:["La posición exacta de un buque","Punto de referencia calculado para las operaciones SAR — tiene en cuenta la posición inicial + deriva viento + corriente + tiempo transcurrido — actualizado continuamente por el MRCC","Una posición GPS fija","Un punto de encuentro"],correct:1,expl:"DATUM SAR = punto de referencia o zona de búsqueda calculada para las operaciones SAR. Cálculo: posición inicial (EPIRB/MAYDAY) + deriva viento + deriva corriente + tiempo transcurrido desde la alerta. Actualizado cada hora por el MRCC. Importancia: sin un datum preciso, las búsquedas se extienden sobre una zona demasiado amplia = baja probabilidad de detección."},
    {q:"En una situación de naufragio, ¿cuál es la regla de supervivencia sobre el agua dulce?",opts:["Beber todo lo posible","Ración mínima 500ml/persona/día · NUNCA beber agua de mar (agrava la deshidratación) · recoger agua de lluvia si es posible · el agua es la prioridad de supervivencia #1","Beber agua de mar en caso de emergencia","Esperar 48h antes de beber"],correct:1,expl:"Agua dulce en supervivencia marítima: ración mínima = 500ml/persona/día. NUNCA beber agua de mar: la sal obliga a los riñones a eliminar más agua de la que absorben → agrava la deshidratación → muerte acelerada. Recoger agua de lluvia, condensación nocturna, desalación manual. La deshidratación = causa de muerte rápida (48-72h en condiciones extremas sin agua)."},
  ],
  pt:[
    {q:"O que é a obrigação de 'porto de abrigo' para um navio em perigo?",opts:["Um porto militar","Obrigação dos Estados costeiros de aceitar navios em perigo nos seus portos para evitar um sinistro grave no mar — conflito entre soberania e humanidade","Um porto comercial","Um porto de socorro militar"],correct:1,expl:"Porto de abrigo: o navio em perigo pode solicitar entrada no porto mais próximo. Os Estados costeiros têm uma obrigação moral e crescente obrigação legal (Diretiva europeia 2002/59/CE) de aceitar navios em perigo. PROBLEMA HISTÓRICO: Espanha recusou ao Prestige (2002) → naufrágio e 77.000t de fuel. Equilíbrio: risco ambiental vs risco de naufrágio no mar. Os MRCC avaliam caso a caso."},
    {q:"O que é um 'número IMO' e como difere do MMSI?",opts:["São idênticos","IMO = número permanente do navio (7 dígitos) que permanece com ele toda a vida · MMSI = número de rádio de 9 dígitos · modificável se mudar de pavilhão","O MMSI é permanente","O IMO muda em cada viagem"],correct:1,expl:"Número IMO: número de 7 dígitos atribuído na construção do navio, PERMANENTE para toda a sua vida mesmo que mude de nome, pavilhão ou armador. MMSI: número de rádio de 9 dígitos ligado ao pavilhão. MODIFICÁVEL se mudar de pavilhão. Diferença chave: o IMO segue o navio, o MMSI segue o pavilhão."},
    {q:"O que é o princípio do 'navio de último recurso' (ship of last resort)?",opts:["O melhor navio da frota","Obrigação do capitão de manter o navio a flutuar o máximo de tempo possível antes de ordenar o abandono — o abandono prematuro é um erro frequente","Um navio militar de socorro","O último navio de uma frota"],correct:1,expl:"Princípio 'ship of last resort': o navio, mesmo que danificado, é geralmente mais seguro do que as águas circundantes. O abandono prematuro antes de o navio estar verdadeiramente a afundar = erro frequente que causa mortes desnecessárias. REGRA: só abandonar quando o navio for 'mais perigoso do que o mar'."},
    {q:"O que é o AIS-SART em comparação com um SART convencional?",opts:["São idênticos","O AIS-SART emite nas frequências AIS (161/162 MHz) e aparece como alvo especial no ecrã AIS · MMSI começando por 970 · visível em navios E aeronaves equipados com AIS","O AIS-SART é menos preciso","O SART é mais recente"],correct:1,expl:"AIS-SART vs SART de radar: AIS-SART transmite nos canais AIS 161,975 MHz e 162,025 MHz. Identificável por MMSI a começar por 970. Visível no ecrã AIS como alvo especial com ícone de alerta. VANTAGEM: identificável por AIS E radar. Não afetado por sea/rain clutter. SART convencional: apenas visível no radar de banda X. Aparece como linha de 12 pontos. Alcance similar. Ambos aprovados pelo GMDSS."},
    {q:"Qual é a diferença entre um 'barco salva-vidas' e uma 'balsa salva-vidas'?",opts:["São idênticos","Barco salva-vidas = embarcação fechada motorizada com capacidade de 100% do pessoal · Balsa salva-vidas = insuflável leve não motorizado para emergências","Balsa = maior","Barco = menos resistente"],correct:1,expl:"Barco salva-vidas: embarcação rígida (fibra ou aço), frequentemente fechada (tipo queda livre), motorizada, capacidade = 100% do pessoal. Estável em condições extremas. Balsa salva-vidas: insuflável ou rígida não motorizada, mais leve, de desdobramento rápido, capacidade variável. O SOLAS exige ambos em navios comerciais dependendo do tamanho."},
    {q:"Quais são os sinais de socorro visuais (SOS) além dos pirotécnicos?",opts:["Apenas foguetes","Braços levantados e baixados lentamente · espelho de sinalização · luzes fluorescentes · tecido laranja no teto · remos no ar · QUALQUER método visível de longe","Apenas rádio","Apenas EPIRB"],correct:1,expl:"Sinais de socorro visuais reconhecidos pelo SOLAS Anexo IV: 1. Foguetes vermelhos com paraquedas. 2. Luz de mão vermelha. 3. Sinal de fumo laranja. 4. Espelho de sinalização. 5. Braços levantados e baixados. 6. Tecido/placa laranja fluor. 7. Chamas. 8. Sinais de rádio (MAYDAY). 9. Sinal sonoro SOS. 10. Sinal NC de bandeiras. 11. EPIRB."},
    {q:"O que é o procedimento 'MOB' (Homem ao Mar) para recuperar um náufrago no mar?",opts:["Um procedimento médico","Procedimento de emergência: lançar a boia MOB → marcar posição GPS → emitir PAN-PAN → manobra Williamson ou viragem rápida → recuperação a baixa velocidade","Um sinal sonoro","Um tipo de socorro"],correct:1,expl:"Procedimento MOB: 1. LANÇAR boia MOB imediatamente. 2. ALERTAR a tripulação. 3. MARCAR posição GPS. 4. DESIGNAR um vigia que aponte para a vítima. 5. PAN-PAN no VHF 16. 6. MANOBRA Williamson ou viragem rápida. 7. APROXIMAÇÃO a baixa velocidade de frente ao vento. 8. RECUPERAÇÃO com rede, perche, aro. Tempo crítico: hipotermia começa em 10-15 min em água fria."},
    {q:"O que é a 'Manobra de Williamson' e porque é usada para o MOB?",opts:["Uma manobra comercial","Manobra de regresso à trajetória inicial: virar para um lado → virar 60° para o outro lado → regressar ao rumo original — permite regressar à posição exata do MOB","Uma manobra de porto","Um tipo de maré"],correct:1,expl:"Manobra de Williamson: 1. Virar TODO o leme para o lado do MOB (ex.: bombordo). 2. Quando o rumo tiver mudado 60° → virar para o OUTRO lado (estibordo). 3. Quando o rumo estiver a 180° do original → manter esse rumo. 4. O navio regressa à trajetória original em sentido inverso. Objetivo: regressar exatamente ao local onde o MOB caiu."},
    {q:"O que é um exercício de 'chamada geral de abandono' segundo o SOLAS?",opts:["Um exercício opcional","Exercício obrigatório antes da partida de cada viagem de passageiros (SOLAS III/19) · nas 24h seguintes ao embarque dos passageiros · prática completa dos procedimentos de abandono","Um teste do radar","Um exercício de navegação"],correct:1,expl:"Exercício de abandono (muster drill): SOLAS Capítulo III Regra 19 exige: exercício completo antes da partida se > 25% de novos passageiros. Para passageiros: informação em < 24h do embarque. Para a tripulação: exercício mensal. Conteúdo: reconhecimento do alarme, ponto de reunião, colete salva-vidas, barco/balsa, EPIRB, VHF portátil."},
    {q:"O que é a 'coordenação SAR' entre MRCC de países diferentes?",opts:["Impossível","Coordenada através do Sistema de Coordenação SAR Mundial com acordos bilaterais · transferência de coordenação possível entre MRCC adjacentes · Manual IAMSAR (IMO/ICAO)","Apenas na UE","Apenas por rádio"],correct:1,expl:"Coordenação SAR internacional: Manual IAMSAR = guia IMO/ICAO para coordenação SAR. RCC = centro de coordenação SAR nacional. SRR = zonas de responsabilidade SAR. Transferência de coordenação possível entre MRCC adjacentes. Acordos bilaterais entre países. No Mediterrâneo: numerosas coordenações entre CROSS França, Guarda Costeira Italiana, MRCC Espanha."},
    {q:"Qual é a frequência de socorro OM utilizada para o ASN na zona A2?",opts:["156.800 MHz","2182 kHz","2187,5 kHz — frequência OM ASN utilizada para alertas de socorro digitais na zona A2","518 kHz"],correct:2,expl:"Frequência OM ASN = 2187,5 kHz (ondas médias). Usada na zona A2 para chamadas ASN de socorro. Frequências GMDSS: VHF ch.70 = 156,525 MHz, VHF ch.16 = 156,800 MHz, OM ASN = 2187,5 kHz, OM voz = 2182 kHz, OC ASN (A3/A4) = 4207,5 · 6312 · 8414,5 · 12577 · 16804,5 kHz."},
    {q:"O que é o 'tráfego de socorro' e quem o pode interromper?",opts:["Todo o tráfego no ch.16","Comunicação de socorro em curso no ch.16 — só pode ser interrompida pela estação coordenadora SAR (MRCC) ou por um alerta de socorro ainda mais urgente","Um teste de rádio","Uma chamada ordinária"],correct:1,expl:"Tráfego de socorro = conjunto das comunicações de rádio relacionadas com uma situação de perigo. Uma vez um MAYDAY em curso no ch.16: SILÊNCIO DE RÁDIO obrigatório para todos os outros navios. Apenas a estação coordenadora (MRCC ou OSC) pode autorizar outras comunicações. OSC (On-Scene Coordinator) = navio designado para coordenar as operações no local."},
    {q:"O que é uma 'PLB' (Baliza de Localização Pessoal) diferente de uma EPIRB?",opts:["São idênticas","PLB = baliza individual portátil em 406 MHz · mais pequena · duração 24h mín. · para uso terrestre E marítimo · não obrigatória SOLAS mas recomendada","Um radar","Um rádio VHF"],correct:1,expl:"PLB = baliza individual. Diferenças com EPIRB: PLB = baliza PESSOAL portátil (vs EPIRB = baliza do navio). Duração: 24h mín. (vs 48h EPIRB). Uso: terrestre E marítimo. Não aprovada pelo SOLAS em substituição da EPIRB. Tamanho: muito pequena (pode ser transportada no corpo). VANTAGEM: portátil no corpo = proteção mesmo fora do navio."},
    {q:"O que é o procedimento SAR de 'datum' e porque é fundamental?",opts:["A posição exata de um navio","Ponto de referência calculado para as operações SAR — tem em conta a posição inicial + deriva de vento + corrente + tempo decorrido — atualizado continuamente pelo MRCC","Uma posição GPS fixa","Um ponto de encontro"],correct:1,expl:"DATUM SAR = ponto de referência ou zona de busca calculada para as operações SAR. Cálculo: posição inicial (EPIRB/MAYDAY) + deriva de vento + deriva de corrente + tempo decorrido desde o alerta. Atualizado a cada hora pelo MRCC. Importância: sem datum preciso, as buscas estendem-se por uma zona demasiado grande = baixa probabilidade de deteção."},
    {q:"Numa situação de naufrágio, qual é a regra de sobrevivência sobre a água doce?",opts:["Beber o máximo possível","Ração mínima 500ml/pessoa/dia · NUNCA beber água do mar (agrava a desidratação) · recolher água da chuva se possível · a água é a prioridade de sobrevivência #1","Beber água do mar em emergência","Esperar 48h antes de beber"],correct:1,expl:"Água doce em sobrevivência marítima: ração mínima = 500ml/pessoa/dia. NUNCA beber água do mar: o sal força os rins a eliminar mais água do que absorvem → agrava a desidratação → morte acelerada. Recolher água da chuva, condensação noturna, dessalinização manual. A desidratação = causa de morte rápida (48-72h em condições extremas sem água)."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);if(onComplete)onComplete();}};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.sar},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.sar},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:14},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.3}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.sar}33,${C.gold2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?250:fs===3?150:80;return(<Card style={{textAlign:"center",border:`2px solid ${C.gold}66`,background:"linear-gradient(135deg,rgba(201,146,42,0.15),rgba(13,31,60,0.9))"}}><div style={{fontSize:64,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"8px 20px",borderRadius:20,background:"rgba(255,68,68,0.15)",border:`1px solid ${C.sar}44`,fontSize:16,color:C.sar,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:34,height:34,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.sar}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.sar,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.sar:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.sar},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    fr:{
      badge:"🆘 Signalisation & Balisage · Leçon 7/7 · ⭐ FINALE · 250 XP",
      title:"GMDSS & Signaux de Détresse",
      intro:"Quand tout le reste a échoué — moteur en panne, radio en feu, nuit noire — c'est la connaissance des signaux de détresse et des procédures GMDSS qui fait la différence entre la mort et le sauvetage. Cette leçon finale couvre les zones GMDSS, les équipements de détresse, les procédures d'abandon et la coordination SAR.",
      p1:"PARTIE 1 — ZONES GMDSS (A1·A2·A3·A4)",s1t:"Équipements selon la zone de navigation",
      s1:"GMDSS = Global Maritime Distress & Safety System\n4 ZONES DE NAVIGATION :\n\nA1 : < 30 milles côte · VHF DSC\nA2 : 30-150 milles · MF DSC + VHF\nA3 : 70°N-70°S · Inmarsat + MF/HF\nA4 : Polaire > 70° · HF obligatoire\n\nÉQUIPEMENT UNIVERSEL (toutes zones) :\n→ EPIRB 406 MHz immatriculée\n→ SART ou AIS-SART\n→ VHF portable GMDSS (au moins 2)\n→ NAVTEX (sauf zone A1 côtière)",
      p2:"PARTIE 2 — SIGNAUX DE DÉTRESSE VISUELS",s1t:"EPIRB · SART · Fusée · Fumée · Miroir",
      s2:"SIGNAUX VISUELS DE DÉTRESSE :\n\nEPIRB 406 MHz :\n→ 48h minimum · satellite COSPAS-SARSAT\n→ MMSI + GPS automatique\n\nFUSÉE ROUGE PARACHUTE :\n→ 300m altitude · 40 sec · 28 milles\n→ Signal de nuit / mauvais temps\n\nFUMIGÈNE ORANGE :\n→ 3 minutes · visible de jour\n→ Idéal pour hélicoptères\n\nMIROIR HÉLIOGRAPHE :\n→ Sans batterie · 15-30 milles\n→ Lune ou soleil requis",
      p3:"PARTIE 3 — PROCÉDURES D'ABANDON",s1t:"Décision · Équipement · Mise à l'eau · Survie",
      s3:"PROCÉDURE D'ABANDON (4 étapes) :\n\n1. ALERTE (T=0)\n7 sons courts + 1 long\nMAYDAY + EPIRB + DSC\n\n2. PRÉPARATION (T+2min)\nGilet · Combinaison · Documents\nVHF portable · Fusées · SART\n\n3. MISE À L'EAU (T+5min)\nCanot côté sous le vent\nCapitaine = dernier\n\n4. SURVIE EN MER\nAncre flottante · STOP\nEau : 500ml/jour minimum",
      p4:"PARTIE 4 — COORDINATION SAR",s1t:"Alerte → Planification → Opérations → Sauvetage",
      s4:"SAR = Search And Rescue\n\n4 PHASES :\n1. ALERTE : EPIRB/MAYDAY → MRCC alerté\n2. PLANIFICATION : Datum SAR calculé\n3. OPÉRATIONS : Hélicos · Vedettes · Navires\n4. SAUVETAGE ET CLÔTURE SAR\n\nMOYENS DE DÉTECTION :\n→ Fusées rouges → convergence\n→ SART sur radar → localisation\n→ AIS-SART sur AIS → identification\n→ EPIRB 121.5 MHz → homing final",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"🚢 CAS RÉEL — COSTA CONCORDIA",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ FINAL — GMDSS & DÉTRESSE L7",
      sumP:["Zone A1 < 30 mi : VHF DSC · Zone A2 : +MF · Zone A3 : +Inmarsat · Zone A4 : +HF obligatoire","EPIRB 406 MHz : 48h min · MMSI+GPS · COSPAS-SARSAT · hydrostatique ou manuel","Abandon : 7 courts + 1 long · Capitaine = dernier · MAYDAY avant abandon","Position HELP : bras croisés + genoux levés · hypothermie = 1ère cause mort naufragés","SAR : Alerte→Datum→Recherche→Sauvetage · MRCC coordonne","SART = ligne 12 points radar · AIS-SART MMSI 970xxx · AIS + radar","Fusée rouge parachute = 300m · 40sec · 28 milles · Fumigène orange = jour","Costa Concordia 2012 = MAYDAY tardif · 32 morts · capitaine = premier parti"],
      learnedP:["Zones GMDSS A1·A2·A3·A4 : équipements selon la zone","Signaux visuels : EPIRB · SART · Fusées · Fumée · Miroir","Procédure abandon : 4 étapes · équipement · ordre embarquement","HELP · STOP · survie en mer · eau 500ml/jour","Coordination SAR : MRCC · datum · 4 phases · moyens de détection"],
    },
    en:{
      badge:"🆘 Signaling & Buoyage · Lesson 7/7 · ⭐ FINAL · 250 XP",
      title:"GMDSS & Distress Signals",
      intro:"When everything else has failed — engine broken, radio on fire, pitch dark night — it's the knowledge of distress signals and GMDSS procedures that makes the difference between death and rescue. This final lesson covers GMDSS zones, distress equipment, abandonment procedures and SAR coordination.",
      p1:"PART 1 — GMDSS ZONES (A1·A2·A3·A4)",s1t:"Equipment by navigation zone",
      s1:"GMDSS = Global Maritime Distress & Safety System\n4 NAVIGATION ZONES:\n\nA1: < 30 miles coast · VHF DSC\nA2: 30-150 miles · MF DSC + VHF\nA3: 70°N-70°S · Inmarsat + MF/HF\nA4: Polar > 70° · HF mandatory\n\nUNIVERSAL EQUIPMENT (all zones):\n→ Registered 406 MHz EPIRB\n→ SART or AIS-SART\n→ Portable GMDSS VHF (at least 2)\n→ NAVTEX (except coastal A1 zone)",
      p2:"PART 2 — VISUAL DISTRESS SIGNALS",s1t:"EPIRB · SART · Flare · Smoke · Mirror",
      s2:"VISUAL DISTRESS SIGNALS:\n\nEPIRB 406 MHz:\n→ 48h minimum · COSPAS-SARSAT satellite\n→ Automatic MMSI + GPS\n\nRED PARACHUTE FLARE:\n→ 300m altitude · 40 sec · 28 miles\n→ Night / bad weather signal\n\nORANGE SMOKE:\n→ 3 minutes · visible by day\n→ Ideal for helicopters\n\nHELIOGRAPH MIRROR:\n→ No battery · 15-30 miles\n→ Sun or moon required",
      p3:"PART 3 — ABANDON SHIP PROCEDURES",s1t:"Decision · Equipment · Launch · Survival",
      s3:"ABANDON SHIP PROCEDURE (4 steps):\n\n1. ALERT (T=0)\n7 short + 1 long blasts\nMAYDAY + EPIRB + DSC\n\n2. PREPARATION (T+2min)\nLife jacket · Suit · Documents\nPortable VHF · Flares · SART\n\n3. LAUNCH (T+5min)\nRaft on leeward side\nCaptain = last\n\n4. SURVIVAL AT SEA\nSea anchor · STOP\nWater: 500ml/day minimum",
      p4:"PART 4 — SAR COORDINATION",s1t:"Alert → Planning → Operations → Rescue",
      s4:"SAR = Search And Rescue\n\n4 PHASES:\n1. ALERT: EPIRB/MAYDAY → MRCC alerted\n2. PLANNING: SAR datum calculated\n3. OPERATIONS: Helicopters · Lifeboats · Vessels\n4. RESCUE AND SAR CLOSURE\n\nDETECTION MEANS:\n→ Red flares → convergence\n→ SART on radar → location\n→ AIS-SART on AIS → identification\n→ EPIRB 121.5 MHz → final homing",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"🚢 REAL CASE — COSTA CONCORDIA",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"FINAL SUMMARY — GMDSS & DISTRESS L7",
      sumP:["Zone A1 < 30 mi: VHF DSC · Zone A2: +MF · Zone A3: +Inmarsat · Zone A4: +HF mandatory","EPIRB 406 MHz: 48h min · MMSI+GPS · COSPAS-SARSAT · hydrostatic or manual","Abandon: 7 short + 1 long · Captain = last · MAYDAY before abandonment","HELP position: crossed arms + raised knees · hypothermia = #1 cause of death","SAR: Alert→Datum→Search→Rescue · MRCC coordinates","SART = 12 dots radar line · AIS-SART MMSI 970xxx · AIS + radar","Red parachute flare = 300m · 40sec · 28 miles · Orange smoke = daytime","Costa Concordia 2012 = delayed MAYDAY · 32 dead · captain = left first"],
      learnedP:["GMDSS zones A1·A2·A3·A4: equipment by zone","Visual signals: EPIRB · SART · Flares · Smoke · Mirror","Abandon ship: 4 steps · equipment · embarkation order","HELP · STOP · survival at sea · water 500ml/day","SAR coordination: MRCC · datum · 4 phases · detection means"],
    },
    es:{
      badge:"🆘 Señalización y Balizamiento · Lección 7/7 · ⭐ FINAL · 250 XP",
      title:"SMSSM y Señales de Socorro",
      intro:"Cuando todo lo demás ha fallado — motor averiado, radio en llamas, noche oscura — es el conocimiento de las señales de socorro y los procedimientos SMSSM lo que marca la diferencia entre la muerte y el salvamento.",
      p1:"PARTE 1 — ZONAS SMSSM (A1·A2·A3·A4)",s1t:"Equipos según la zona de navegación",
      s1:"SMSSM: 4 ZONAS\nA1: < 30 millas · VHF LSD\nA2: 30-150 millas · OM LSD + VHF\nA3: 70°N-70°S · Inmarsat + OM/OC\nA4: Polar > 70° · OC obligatorio\nEQUIPO UNIVERSAL: EPIRB 406 MHz · SART/AIS-SART · VHF portátil",
      p2:"PARTE 2 — SEÑALES DE SOCORRO VISUALES",s1t:"EPIRB · SART · Cohete · Humo · Espejo",
      s2:"EPIRB 406 MHz: 48h min · COSPAS-SARSAT\nCOHETE ROJO PARACAÍDAS: 300m · 40s · 28 millas\nHUMO NARANJA: 3 min · solo de día\nESPEJO HELIOGRÁFICO: sin batería · 15-30 millas",
      p3:"PARTE 3 — PROCEDIMIENTO DE ABANDONO",s1t:"Decisión · Equipo · Botadura · Supervivencia",
      s3:"1. ALERTA (T=0): 7 cortos + 1 largo · MAYDAY + EPIRB\n2. PREPARACIÓN (T+2min): Chaleco · Traje · Documentos · VHF · Cohetes\n3. BOTADURA (T+5min): Balsa sotavento · Capitán = el último\n4. SUPERVIVENCIA: Ancla flotante · STOP · Agua: 500ml/día",
      p4:"PARTE 4 — COORDINACIÓN SAR",s1t:"Alerta → Planificación → Operaciones → Rescate",
      s4:"SAR: 4 FASES\n1. ALERTA: EPIRB/MAYDAY → MRCC alertado\n2. PLANIFICACIÓN: Datum SAR calculado\n3. OPERACIONES: Helicópteros · Embarcaciones · Buques\n4. RESCATE Y CIERRE SAR\nDETECCIÓN: Cohetes → convergencia · SART en radar → localización",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"🚢 CASO REAL — COSTA CONCORDIA",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN FINAL — SMSSM Y SEÑALES DE SOCORRO L7",
      sumP:["Zona A1 < 30 mi: VHF LSD · Zona A2: +OM · Zona A3: +Inmarsat · Zona A4: +OC obligatorio","EPIRB 406 MHz: 48h mín · MMSI+GPS · COSPAS-SARSAT · hidrostática o manual","Abandono: 7 cortos + 1 largo · Capitán = el último · MAYDAY antes del abandono","Posición HELP: brazos cruzados + rodillas levantadas · hipotermia = 1ª causa muerte náufragos","SAR: Alerta→Datum→Búsqueda→Rescate · MRCC coordina","SART = línea 12 puntos radar · AIS-SART MMSI 970xxx · AIS + radar","Cohete rojo paracaídas = 300m · 40s · 28 millas · Humo naranja = de día","Costa Concordia 2012 = MAYDAY tardío · 32 muertos · capitán = primero en irse"],
      learnedP:["Zonas SMSSM A1·A2·A3·A4: equipos según la zona","Señales visuales: EPIRB · SART · Cohetes · Humo · Espejo","Abandono: 4 etapas · equipo · orden de embarque","HELP · STOP · supervivencia en el mar · agua 500ml/día","Coordinación SAR: MRCC · datum · 4 fases · medios de detección"],
    },
    pt:{
      badge:"🆘 Sinalização e Balizagem · Lição 7/7 · ⭐ FINAL · 250 XP",
      title:"GMDSS e Sinais de Socorro",
      intro:"Quando tudo o resto falhou — motor avariado, rádio em chamas, noite escura — é o conhecimento dos sinais de socorro e dos procedimentos GMDSS que faz a diferença entre a morte e o salvamento.",
      p1:"PARTE 1 — ZONAS GMDSS (A1·A2·A3·A4)",s1t:"Equipamentos por zona de navegação",
      s1:"GMDSS: 4 ZONAS\nA1: < 30 milhas · VHF ASN\nA2: 30-150 milhas · OM ASN + VHF\nA3: 70°N-70°S · Inmarsat + OM/OC\nA4: Polar > 70° · OC obrigatório\nEQUIPAMENTO UNIVERSAL: EPIRB 406 MHz · SART/AIS-SART · VHF portátil",
      p2:"PARTE 2 — SINAIS DE SOCORRO VISUAIS",s1t:"EPIRB · SART · Foguete · Fumo · Espelho",
      s2:"EPIRB 406 MHz: 48h mín · COSPAS-SARSAT\nFOGUETE VERMELHO PARAQUEDAS: 300m · 40s · 28 milhas\nFUMO LARANJA: 3 min · apenas de dia\nESPELHO DE SINALIZAÇÃO: sem bateria · 15-30 milhas",
      p3:"PARTE 3 — PROCEDIMENTO DE ABANDONO",s1t:"Decisão · Equipamento · Lançamento · Sobrevivência",
      s3:"1. ALERTA (T=0): 7 curtos + 1 longo · MAYDAY + EPIRB\n2. PREPARAÇÃO (T+2min): Colete · Fato · Documentos · VHF · Foguetes\n3. LANÇAMENTO (T+5min): Balsa a sotavento · Capitão = último\n4. SOBREVIVÊNCIA: Âncora flutuante · STOP · Água: 500ml/dia",
      p4:"PARTE 4 — COORDENAÇÃO SAR",s1t:"Alerta → Planeamento → Operações → Socorro",
      s4:"SAR: 4 FASES\n1. ALERTA: EPIRB/MAYDAY → MRCC alertado\n2. PLANEAMENTO: Datum SAR calculado\n3. OPERAÇÕES: Helicópteros · Embarcações · Navios\n4. SOCORRO E ENCERRAMENTO SAR\nDETEÇÃO: Foguetes → convergência · SART no radar → localização",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"🚢 CASO REAL — COSTA CONCORDIA",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO FINAL — GMDSS E SINAIS DE SOCORRO L7",
      sumP:["Zona A1 < 30 mi: VHF ASN · Zona A2: +OM · Zona A3: +Inmarsat · Zona A4: +OC obrigatório","EPIRB 406 MHz: 48h mín · MMSI+GPS · COSPAS-SARSAT · hidrostática ou manual","Abandono: 7 curtos + 1 longo · Capitão = último · MAYDAY antes do abandono","Posição HELP: braços cruzados + joelhos levantados · hipotermia = 1ª causa morte náufragos","SAR: Alerta→Datum→Busca→Socorro · MRCC coordena","SART = linha 12 pontos radar · AIS-SART MMSI 970xxx · AIS + radar","Foguete vermelho paraquedas = 300m · 40s · 28 milhas · Fumo laranja = de dia","Costa Concordia 2012 = MAYDAY tardio · 32 mortos · capitão = primeiro a partir"],
      learnedP:["Zonas GMDSS A1·A2·A3·A4: equipamentos por zona","Sinais visuais: EPIRB · SART · Foguetes · Fumo · Espelho","Abandono: 4 etapas · equipamento · ordem de embarque","HELP · STOP · sobrevivência no mar · água 500ml/dia","Coordenação SAR: MRCC · datum · 4 fases · meios de deteção"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonGMDSS({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#0e0002 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.sar}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.sar,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🆘 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 7/7 — FINALE":lang==="en"?"Lesson 7/7 — FINAL":lang==="es"?"Lección 7/7 — FINAL":"Lição 7/7 — FINAL"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(255,68,68,0.3)",border:`1px solid ${C.sar}`,color:C.sar,fontWeight:700}}>🏆 FINAL</div>
            <div style={{fontSize:11,color:C.sar,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.sar},${C.epirb},${C.gold2})`,transition:"width 0.5s ease",boxShadow:`0 0 8px ${C.sar}`}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.sar}15`,border:`1px solid ${C.sar}44`,fontSize:11,color:C.sar,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.sar}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="🌍" text={lc.p1} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}22`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🌍 {lang==="fr"?"ZONES GMDSS INTERACTIVES":lang==="en"?"INTERACTIVE GMDSS ZONES":lang==="es"?"ZONAS GMDSS INTERACTIVAS":"ZONAS GMDSS INTERATIVAS"}</div>
              <GMDSSZonesSVG lang={lang}/>
            </Card>
            <SL icon="🆘" text={lc.p2} color={C.sar}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.sar}22`}}>
              <div style={{fontSize:11,color:C.sar,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🆘 {lang==="fr"?"SIGNAUX DE DÉTRESSE — INTERACTIF":lang==="en"?"DISTRESS SIGNALS — INTERACTIVE":lang==="es"?"SEÑALES DE SOCORRO — INTERACTIVO":"SINAIS DE SOCORRO — INTERATIVO"}</div>
              <DistressSignalsSVG lang={lang}/>
            </Card>
            <SL icon="🛟" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}22`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🛟 {lang==="fr"?"PROCÉDURE D'ABANDON — 4 ÉTAPES":lang==="en"?"ABANDON SHIP — 4 STEPS":lang==="es"?"ABANDONO — 4 ETAPAS":"ABANDONO — 4 ETAPAS"}</div>
              <AbandonShipSVG lang={lang}/>
            </Card>
            <SL icon="🚁" text={lc.p4} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}22`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🚁 {lang==="fr"?"COORDINATION SAR — 4 PHASES":lang==="en"?"SAR COORDINATION — 4 PHASES":lang==="es"?"COORDINACIÓN SAR — 4 FASES":"COORDENAÇÃO SAR — 4 FASES"}</div>
              <SARCoordinationSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="🚢" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>
            <Card style={{marginBottom:14,background:`${C.sar}08`,border:`1px solid ${C.sar}22`}}>
              <div style={{fontSize:11,color:C.sar,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.sar,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.sar},${C.epirb},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:`0 10px 36px ${C.sar}44`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz Final — GMDSS & Détresse</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 7 — FINALE":lang==="en"?"Lesson 7 — FINAL":lang==="es"?"Lección 7 — FINAL":"Lição 7 — FINAL"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <div style={{fontSize:72,marginBottom:12}}>🏆</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:24,fontWeight:700,color:C.gold2,marginBottom:4}}>{t.complete}</div>
              <div style={{fontSize:13,color:C.muted,marginBottom:12}}>{lang==="fr"?"Module Signalisation & Balisage — 7/7 leçons":lang==="en"?"Signaling & Buoyage Module — 7/7 lessons":lang==="es"?"Módulo Señalización y Balizamiento — 7/7 lecciones":"Módulo Sinalização e Balizagem — 7/7 lições"}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 24px",borderRadius:20,background:`${C.sar}22`,border:`2px solid ${C.sar}`,fontSize:16,color:C.sar,fontWeight:700}}>+{quizScore>=4?250:quizScore===3?150:80} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.sar,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <div style={{padding:"14px",borderRadius:14,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:13,color:C.gold2,fontWeight:700,marginBottom:4}}>
                {lang==="fr"?"🎓 MODULE SIGNALING & BUOYAGE COMPLÉTÉ !":lang==="en"?"🎓 SIGNALING & BUOYAGE MODULE COMPLETE!":lang==="es"?"🎓 ¡MÓDULO SEÑALIZACIÓN Y BALIZAMIENTO COMPLETADO!":"🎓 MÓDULO SINALIZAÇÃO E BALIZAGEM CONCLUÍDO!"}
              </div>
              <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>
                {lang==="fr"?"IALA · Feux · Signaux Sonores · Pavillons · VHF · AIS · GMDSS":"IALA · Lights · Sound Signals · Flags · VHF · AIS · GMDSS"}
              </div>
            </div>
            <button onClick={onNext} style={{width:"100%",padding:"18px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.sar},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:`0 10px 40px ${C.sar}44`,marginBottom:10}}>
              🏆 {lang==="fr"?"VOIR MES RÉSULTATS":lang==="en"?"VIEW MY RESULTS":lang==="es"?"VER MIS RESULTADOS":"VER MEUS RESULTADOS"} 🏆
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
