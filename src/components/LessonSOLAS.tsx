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
  fr:{ back:"◀ Retour", module:"Droit Maritime Int.", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Int. Maritime Law", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Derecho Marítimo Int.", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Direito Marítimo Int.", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — SOLAS HISTORY TIMELINE
// ══════════════════════════════════════
function SOLASTimelineSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const events = [
    { year:"1912", icon:"🚢", color:C.red,
      label:{fr:"Naufrage Titanic",en:"Titanic sinks",es:"Hundimiento Titanic",pt:"Naufrágio Titanic"},
      desc:{fr:"15 avril 1912 — RMS Titanic coule\n1 496 morts sur 2 224 personnes\nInsuffisance de canots de sauvetage\nPas de veille radio 24h/24\n→ CATALYSEUR de la convention SOLAS",en:"April 15, 1912 — RMS Titanic sinks\n1,496 deaths out of 2,224 people\nInsufficient lifeboats\nNo 24/7 radio watch\n→ CATALYST for SOLAS convention",es:"15 de abril de 1912 — RMS Titanic se hunde\n1.496 muertos de 2.224 personas\nBotes salvavidas insuficientes\nSin vigilancia radio 24h/24\n→ CATALIZADOR del convenio SOLAS",pt:"15 de abril de 1912 — RMS Titanic afunda\n1.496 mortos de 2.224 pessoas\nBotes salva-vidas insuficientes\nSem vigilância rádio 24h/24\n→ CATALISADOR da convenção SOLAS"}},
    { year:"1914", icon:"📜", color:C.orange,
      label:{fr:"SOLAS I",en:"SOLAS I",es:"SOLAS I",pt:"SOLAS I"},
      desc:{fr:"Première convention SOLAS (1914)\nAdoptée 2 ans après le Titanic\nJamais entrée en vigueur\n(Première Guerre Mondiale)\nInclut : canots, radio, routes glaciers",en:"First SOLAS convention (1914)\nAdopted 2 years after Titanic\nNever entered into force\n(World War I)\nIncludes: lifeboats, radio, ice routes",es:"Primer convenio SOLAS (1914)\nAdoptado 2 años después del Titanic\nNunca entró en vigor\n(Primera Guerra Mundial)\nIncluye: botes, radio, rutas hielo",pt:"Primeira convenção SOLAS (1914)\nAdotada 2 anos após o Titanic\nNunca entrou em vigor\n(Primeira Guerra Mundial)\nInclui: botes, rádio, rotas gelo"}},
    { year:"1948", icon:"🌍", color:C.gold2,
      label:{fr:"OMI créée",en:"IMO created",es:"OMI creada",pt:"OMI criada"},
      desc:{fr:"Organisation Maritime Internationale\nAgence spécialisée de l'ONU\nSiège : Londres\n168 États membres\nAdopte et gère toutes les conventions maritimes internationales",en:"International Maritime Organization\nSpecialized UN agency\nHeadquarters: London\n168 member states\nAdopts and manages all international maritime conventions",es:"Organización Marítima Internacional\nOrganismo especializado de la ONU\nSede: Londres\n168 estados miembros\nAdopta y gestiona todos los convenios marítimos internacionales",pt:"Organização Marítima Internacional\nAgência especializada da ONU\nSede: Londres\n168 estados membros\nAdota e gere todas as convenções marítimas internacionais"}},
    { year:"1974", icon:"⚓", color:C.blue2,
      label:{fr:"SOLAS 1974",en:"SOLAS 1974",es:"SOLAS 1974",pt:"SOLAS 1974"},
      desc:{fr:"Convention SOLAS actuelle (en vigueur)\nAdoptée à Londres le 1er novembre 1974\nEntrée en vigueur : 25 mai 1980\nAmendements continus via «procédure tacite»\nChapitre I à XIV\n163 États contractants (+ de 98% tonnage mondial)",en:"Current SOLAS convention (in force)\nAdopted in London on November 1, 1974\nEntry into force: May 25, 1980\nContinuous amendments via 'tacit procedure'\nChapters I to XIV\n163 contracting states (98%+ world tonnage)",es:"Convenio SOLAS actual (en vigor)\nAdoptado en Londres el 1 de noviembre de 1974\nEntrada en vigor: 25 de mayo de 1980\nEnmiendas continuas mediante «procedimiento tácito»\nCapítulos I a XIV\n163 estados contratantes (más del 98% del tonelaje mundial)",pt:"Convenção SOLAS atual (em vigor)\nAdotada em Londres em 1 de novembro de 1974\nEntrada em vigor: 25 de maio de 1980\nEmendas contínuas via «procedimento tácito»\nCapítulos I a XIV\n163 estados contratantes (+98% tonelagem mundial)"}},
    { year:"2002", icon:"🔒", color:C.purple,
      label:{fr:"Code ISPS",en:"ISPS Code",es:"Código PBIP",pt:"Código ISPS"},
      desc:{fr:"Ajout du Code ISPS (Sûreté) après le 11 septembre 2001\nChap. XI-2 SOLAS\nPlan de sûreté navire et port\nOfficier de sûreté de la compagnie (CSO)\nOfficier de sûreté du navire (SSO)\nInspections anti-terrorisme",en:"ISPS Code added (Security) after 9/11 2001\nSOLAS Chapter XI-2\nVessel and port security plan\nCompany Security Officer (CSO)\nShip Security Officer (SSO)\nAnti-terrorism inspections",es:"Código PBIP añadido (Protección) tras el 11-S 2001\nCapítulo XI-2 SOLAS\nPlan de protección buque y puerto\nOficial de Protección de la Compañía (OPC)\nOficial de Protección del Buque (OPB)\nInspecciones antiterroristas",pt:"Código ISPS adicionado (Proteção) após 11 de setembro 2001\nCapítulo XI-2 SOLAS\nPlano de proteção do navio e porto\nOficial de Proteção da Companhia (CSO)\nOficial de Proteção do Navio (SSO)\nInspeções anti-terrorismo"}},
    { year:"2024", icon:"🚀", color:C.green,
      label:{fr:"SOLAS Aujourd'hui",en:"SOLAS Today",es:"SOLAS Hoy",pt:"SOLAS Hoje"},
      desc:{fr:"CII + EEXI (décarbonation)\nSystèmes antibruit sous-marins\nAutonomous ships rules (en cours)\nCyber sécurité maritime\nNouvelles règles gaz naturel (IGF Code)\nSOLAS continue d'évoluer avec le monde maritime",en:"CII + EEXI (decarbonization)\nUnderwater noise systems\nAutonomous ships rules (in progress)\nMaritime cyber security\nNew LNG rules (IGF Code)\nSOLAS continues to evolve with maritime world",es:"CII + EEXI (descarbonización)\nSistemas de ruido submarino\nReglas para buques autónomos (en curso)\nCiberseguridad marítima\nNuevas reglas gas natural (Código IGF)\nSOLAS sigue evolucionando con el mundo marítimo",pt:"CII + EEXI (descarbonização)\nSistemas de ruído submarino\nRegras para navios autónomos (em curso)\nCibersegurança marítima\nNovas regras gás natural (Código IGF)\nSOLAS continua a evoluir com o mundo marítimo"}},
  ];

  return (
    <div>
      <svg width="290" height="60" viewBox="0 0 290 60">
        <rect width="290" height="60" fill="#040c18" rx="8"/>
        <line x1="20" y1="30" x2="270" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
        {events.map((e,i)=>{
          const x = 20 + (i/(events.length-1))*250;
          return (
            <g key={i} onClick={()=>setSel(sel===i?null:i)} style={{cursor:"pointer"}}>
              <circle cx={x} cy={30} r={sel===i?10:7} fill={sel===i?e.color:`${e.color}44`} stroke={e.color} strokeWidth={sel===i?2:1}/>
              <text x={x} y={sel===i?28:28} textAnchor="middle" fontSize={sel===i?9:7} fill={sel===i?C.white:e.color} fontWeight="700">{sel===i?"✓":""}</text>
              <text x={x} y={50} textAnchor="middle" fontSize="6" fill={e.color}>{e.year}</text>
            </g>
          );
        })}
      </svg>
      <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
        {events.map((e,i)=>(
          <button key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            flex:"1 1 28%",padding:"7px 4px",borderRadius:10,cursor:"pointer",textAlign:"center",
            background:sel===i?`${e.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?e.color:"rgba(255,255,255,0.08)"}`,
          }}>
            <div style={{fontSize:14}}>{e.icon}</div>
            <div style={{fontSize:8,color:sel===i?e.color:C.muted,fontWeight:700}}>{e.year}</div>
            <div style={{fontSize:7,color:sel===i?e.color:C.muted,lineHeight:1.2}}>{(e.label[lang]||e.label.fr).split(' ').slice(0,2).join(' ')}</div>
          </button>
        ))}
      </div>
      {sel!==null&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${events[sel].color}15`,border:`1px solid ${events[sel].color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:events[sel].color,marginBottom:4}}>{events[sel].icon} {events[sel].year} — {events[sel].label[lang]||events[sel].label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{events[sel].desc[lang]||events[sel].desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — SOLAS CHAPTERS
// ══════════════════════════════════════
function SOLASChaptersSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const chapters = [
    { num:"I", color:C.blue2, icon:"📋",
      label:{fr:"Dispositions générales",en:"General provisions",es:"Disposiciones generales",pt:"Disposições gerais"},
      desc:{fr:"Champ d'application de SOLAS\nDéfinitions clés\nExemptions possibles\nInspections et certifications\nPort State Control (PSC)\nDroit de visite des navires étrangers",en:"SOLAS scope of application\nKey definitions\nPossible exemptions\nInspections and certifications\nPort State Control (PSC)\nRight to inspect foreign vessels",es:"Ámbito de aplicación de SOLAS\nDefiniciones clave\nExenciones posibles\nInspecciones y certificaciones\nControl del Estado Rector del Puerto (PSC)\nDerecho de inspección de buques extranjeros",pt:"Âmbito de aplicação do SOLAS\nDefinições chave\nIsenções possíveis\nInspeções e certificações\nControlo pelo Estado do Porto (PSC)\nDireito de inspeção de navios estrangeiros"}},
    { num:"II-1", color:C.teal, icon:"⚙️",
      label:{fr:"Construction — Structure",en:"Construction — Structure",es:"Construcción — Estructura",pt:"Construção — Estrutura"},
      desc:{fr:"Subdivision et stabilité\nCompartimentage étanche\nInstallations machines\nInstallations électriques\nStabilité après avarie\nProtection contre inondation",en:"Subdivision and stability\nWatertight compartmentalization\nMachinery installations\nElectrical installations\nDamage stability\nFlood protection",es:"Subdivisión y estabilidad\nCompartimentado estanco\nInstalaciones de máquinas\nInstalaciones eléctricas\nEstabilidad tras avería\nProtección contra inundación",pt:"Subdivisão e estabilidade\nCompartimentação estanque\nInstalações de máquinas\nInstalações elétricas\nEstabilidade após avaria\nProteção contra inundação"}},
    { num:"II-2", color:C.red, icon:"🔥",
      label:{fr:"Prévention incendie",en:"Fire protection",es:"Prevención incendios",pt:"Prevenção incêndios"},
      desc:{fr:"Détection et alarme incendie\nExtinction fixe (CO2, sprinklers)\nSégrégation des espaces\nMatériaux résistants au feu\nClasses de navires (A, B, C)\nFormation lutte incendie équipage",en:"Fire detection and alarm\nFixed extinction (CO2, sprinklers)\nSpace segregation\nFire-resistant materials\nVessel classes (A, B, C)\nCrew fire fighting training",es:"Detección y alarma de incendios\nExtinción fija (CO2, sprinklers)\nSegregación de espacios\nMateriales resistentes al fuego\nClases de buques (A, B, C)\nFormación de la tripulación lucha contra incendios",pt:"Deteção e alarme de incêndio\nExtinção fixa (CO2, sprinklers)\nSegregação de espaços\nMateriais resistentes ao fogo\nClasses de navios (A, B, C)\nFormação da tripulação para combate a incêndios"}},
    { num:"III", color:C.orange, icon:"🛟",
      label:{fr:"Engins de sauvetage",en:"Life saving appliances",es:"Dispositivos de salvamento",pt:"Dispositivos de salvamento"},
      desc:{fr:"Canots et radeaux de sauvetage\nGilets et combinaisons de survie\nEPIRB · SART · Signaux détresse\nExercices d'abandon obligatoires\nMuster list (rôle d'appel)\nNombre et capacité des embarcations",en:"Lifeboats and liferafts\nLife jackets and immersion suits\nEPIRB · SART · Distress signals\nMandatory abandon ship drills\nMuster list\nNumber and capacity of craft",es:"Botes y balsas salvavidas\nChalecos y trajes de supervivencia\nEPIRB · SART · Señales de socorro\nEjercicios de abandono obligatorios\nCuadro de obligaciones\nNúmero y capacidad de las embarcaciones",pt:"Botes e balsas salva-vidas\nColetes e fatos de sobrevivência\nEPIRB · SART · Sinais de socorro\nExercícios de abandono obrigatórios\nQuadro de obrigações\nNúmero e capacidade das embarcações"}},
    { num:"IV", color:C.purple, icon:"📡",
      label:{fr:"Radiocommunications",en:"Radio communications",es:"Radiocomunicaciones",pt:"Radiocomunicações"},
      desc:{fr:"GMDSS (Système mondial détresse)\nEquipements radio obligatoires\nZones A1, A2, A3, A4\nVHF · MF · HF · Satellite\nNavtex · EPIRB · DSC\nOfficier radio qualifié GMDSS",en:"GMDSS (Global distress system)\nMandatory radio equipment\nZones A1, A2, A3, A4\nVHF · MF · HF · Satellite\nNavtex · EPIRB · DSC\nGMDSS qualified radio officer",es:"SMSSM (Sistema mundial de socorro)\nEquipos de radio obligatorios\nZonas A1, A2, A3, A4\nVHF · OM · OC · Satélite\nNavtex · EPIRB · LSD\nOficial de radio cualificado SMSSM",pt:"GMDSS (Sistema mundial de socorro)\nEquipamentos rádio obrigatórios\nZonas A1, A2, A3, A4\nVHF · MF · HF · Satélite\nNavtex · EPIRB · DSC\nOficial de rádio qualificado GMDSS"}},
    { num:"V", color:C.gold2, icon:"🧭",
      label:{fr:"Sécurité navigation",en:"Safety of navigation",es:"Seguridad navegación",pt:"Segurança da navegação"},
      desc:{fr:"Services de météorologie\nInformation glaces (Ice patrol)\nRoutes recommandées\nSignaux de détresse visuels\nRadar obligatoire\nAIS · VDR (boîte noire) · ECDIS\nVitesse de sécurité · Veille appropriée",en:"Meteorological services\nIce information (Ice patrol)\nRecommended routes\nVisual distress signals\nMandatory radar\nAIS · VDR (black box) · ECDIS\nSafe speed · Appropriate watch",es:"Servicios meteorológicos\nInformación sobre hielos (Ice patrol)\nRutas recomendadas\nSeñales de socorro visuales\nRadar obligatorio\nAIS · VDR (caja negra) · ECDIS\nVelocidad de seguridad · Guardia adecuada",pt:"Serviços meteorológicos\nInformação sobre gelos (Ice patrol)\nRotas recomendadas\nSinais de socorro visuais\nRadar obrigatório\nAIS · VDR (caixa negra) · ECDIS\nVelocidade de segurança · Vigilância adequada"}},
    { num:"IX", color:C.green, icon:"📊",
      label:{fr:"Code ISM",en:"ISM Code",es:"Código ISM",pt:"Código ISM"},
      desc:{fr:"International Safety Management Code\nSMS (Safety Management System)\nDOC (Document of Compliance)\nSMC (Safety Management Certificate)\nAudit interne et externe\nResponsabilités armateur + capitaine\nAnalyse accidents + amélioration continue",en:"International Safety Management Code\nSMS (Safety Management System)\nDOC (Document of Compliance)\nSMC (Safety Management Certificate)\nInternal and external audit\nShipowner + captain responsibilities\nAccident analysis + continuous improvement",es:"Código de Gestión de la Seguridad Internacional\nSGS (Sistema de Gestión de la Seguridad)\nDOC (Documento de Conformidad)\nSGS (Certificado de Gestión de la Seguridad)\nAuditoría interna y externa\nResponsabilidades armador + capitán\nAnálisis accidentes + mejora continua",pt:"Código de Gestão Internacional da Segurança\nSMS (Sistema de Gestão da Segurança)\nDOC (Documento de Conformidade)\nSMC (Certificado de Gestão da Segurança)\nAuditoria interna e externa\nResponsabilidades armador + capitão\nAnálise acidentes + melhoria contínua"}},
    { num:"XI-2", color:C.steel, icon:"🔒",
      label:{fr:"Sûreté (ISPS)",en:"Security (ISPS)",es:"Protección (PBIP)",pt:"Proteção (ISPS)"},
      desc:{fr:"Code ISPS (International Ship & Port Security)\nNiveaux de sûreté : 1, 2, 3\nPlan de sûreté du navire (SSP)\nOfficier de sûreté (SSO + CSO)\nDéclaration de sûreté (DOS)\nCode ISPS depuis le 1er juillet 2004\nInspections ISPS lors des escales portuaires",en:"ISPS Code (International Ship & Port Security)\nSecurity levels: 1, 2, 3\nShip Security Plan (SSP)\nSecurity officer (SSO + CSO)\nDeclaration of Security (DOS)\nISPS Code since July 1, 2004\nISPS inspections at port calls",es:"Código PBIP (Protección de Buques e Instalaciones Portuarias)\nNiveles de protección: 1, 2, 3\nPlan de Protección del Buque (PPB)\nOficial de Protección (OPB + OPC)\nDeclaración de Protección (DP)\nCódigo PBIP desde el 1 de julio de 2004",pt:"Código ISPS (Proteção de Navios e Instalações Portuárias)\nNíveis de proteção: 1, 2, 3\nPlano de Proteção do Navio (SSP)\nOficial de proteção (SSO + CSO)\nDeclaração de Proteção (DOS)\nCódigo ISPS desde 1 de julho de 2004"},},
  ];
  const sel_ = sel!==null ? chapters[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:10}}>
        {chapters.map((ch,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)}
            style={{padding:"8px 4px",borderRadius:10,cursor:"pointer",textAlign:"center",
              background:sel===i?`${ch.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===i?ch.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{ch.icon}</div>
            <div style={{fontSize:8,color:ch.color,fontWeight:700,marginTop:2}}>Ch.{ch.num}</div>
            <div style={{fontSize:7,color:sel===i?ch.color:C.muted,lineHeight:1.2,marginTop:1}}>
              {(ch.label[lang]||ch.label.fr).split(' ').slice(0,2).join(' ')}
            </div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>
          {sel_.icon} {lang==="fr"?"Chapitre":lang==="en"?"Chapter":lang==="es"?"Capítulo":"Capítulo"} {sel_.num} — {sel_.label[lang]||sel_.label.fr}
        </div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un chapitre pour les détails":lang==="en"?"Tap a chapter for details":lang==="es"?"Toca un capítulo para detalles":"Toque num capítulo para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — SOLAS CERTIFICATES
// ══════════════════════════════════════
function CertificatesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const certs = [
    { id:"sc", icon:"📜", color:C.gold2,
      label:{fr:"Certificat de sécurité\n(Safety Certificate)",en:"Safety Certificate",es:"Certificado de Seguridad",pt:"Certificado de Segurança"},
      validity:{fr:"5 ans",en:"5 years",es:"5 años",pt:"5 anos"},
      desc:{fr:"Certificat principal SOLAS\nCouvre : construction, machines, équipements\nDélivré par l'État du pavillon\nAprès inspection complète\nInspection intermédiaire à 2,5 ans\nSans ce certificat : navire immobilisé",en:"Main SOLAS certificate\nCovers: construction, machinery, equipment\nIssued by flag state\nAfter full inspection\nIntermediate survey at 2.5 years\nWithout this certificate: vessel detained",es:"Certificado principal SOLAS\nCubre: construcción, máquinas, equipos\nEmitido por el Estado de pabellón\nTras inspección completa\nInspección intermedia a 2,5 años\nSin este certificado: buque retenido",pt:"Certificado principal SOLAS\nCobre: construção, máquinas, equipamentos\nEmitido pelo Estado de bandeira\nApós inspeção completa\nInspeção intermédia aos 2,5 anos\nSem este certificado: navio retido"}},
    { id:"lsc", icon:"🛟", color:C.orange,
      label:{fr:"Certificat de sécurité\ndes engins de sauvetage",en:"Life Saving Appliances\nCertificate",es:"Certificado de Equipos\nde Salvamento",pt:"Certificado de\nEquipamentos de Salvamento"},
      validity:{fr:"5 ans",en:"5 years",es:"5 años",pt:"5 anos"},
      desc:{fr:"Certifie les équipements de sauvetage\nCanots · Radeaux · Gilets · EPIRB · SART\nInspection physique de chaque équipement\nTest fonctionnel\nRegistre de maintenance à jour\nDélivré après inspection par société de classification",en:"Certifies life saving equipment\nLifeboats · Liferafts · Jackets · EPIRB · SART\nPhysical inspection of each item\nFunctional test\nUp-to-date maintenance record\nIssued after classification society inspection",es:"Certifica los equipos de salvamento\nBotes · Balsas · Chalecos · EPIRB · SART\nInspección física de cada equipo\nPrueba funcional\nRegistro de mantenimiento actualizado\nEmitido tras inspección por sociedad de clasificación",pt:"Certifica os equipamentos de salvamento\nBotes · Balsas · Coletes · EPIRB · SART\nInspeção física de cada equipamento\nTeste funcional\nRegisto de manutenção atualizado\nEmitido após inspeção por sociedade de classificação"}},
    { id:"rsc", icon:"📡", color:C.purple,
      label:{fr:"Certificat de sécurité\nradioélectrique",en:"Radio Safety\nCertificate",es:"Certificado de\nSeguridad Radioeléctrica",pt:"Certificado de\nSegurança Radioelétrica"},
      validity:{fr:"5 ans",en:"5 years",es:"5 años",pt:"5 anos"},
      desc:{fr:"Certifie les équipements GMDSS\nVHF DSC · MF/HF · Inmarsat · EPIRB · SART\nNavtex · Radio de secours\nTest de fonctionnement\nMaintenance par technicien agréé\nÀ renouveler tous les 5 ans",en:"Certifies GMDSS equipment\nVHF DSC · MF/HF · Inmarsat · EPIRB · SART\nNavtex · Emergency radio\nOperational test\nMaintenance by approved technician\nRenewal every 5 years",es:"Certifica los equipos SMSSM\nVHF LSD · OM/OC · Inmarsat · EPIRB · SART\nNavtex · Radio de emergencia\nPrueba de funcionamiento\nMantenimiento por técnico autorizado\nRenovación cada 5 años",pt:"Certifica os equipamentos GMDSS\nVHF DSC · MF/HF · Inmarsat · EPIRB · SART\nNavtex · Rádio de emergência\nTeste de funcionamento\nManutenção por técnico aprovado\nRenovação a cada 5 anos"}},
    { id:"isc", icon:"🔒", color:C.steel,
      label:{fr:"Certificat ISPS\n(Sûreté)",en:"ISPS Certificate\n(Security)",es:"Certificado PBIP\n(Protección)",pt:"Certificado ISPS\n(Proteção)"},
      validity:{fr:"5 ans",en:"5 years",es:"5 años",pt:"5 anos"},
      desc:{fr:"International Ship Security Certificate\nPlan de sûreté approuvé et appliqué\nNiveaux de sûreté 1/2/3\nSSO (Ship Security Officer) désigné\nFormation sûreté équipage\nAudit ISPS par organisme agréé",en:"International Ship Security Certificate\nApproved and implemented security plan\nSecurity levels 1/2/3\nDesignated SSO (Ship Security Officer)\nCrew security training\nISPS audit by recognized organization",es:"Certificado Internacional de Protección del Buque\nPlan de protección aprobado y aplicado\nNiveles de protección 1/2/3\nOPB (Oficial de Protección del Buque) designado\nFormación de protección de la tripulación\nAuditoria PBIP por organismo reconocido",pt:"Certificado Internacional de Proteção do Navio\nPlano de proteção aprovado e implementado\nNíveis de proteção 1/2/3\nSSO (Oficial de Proteção do Navio) designado\nFormação de proteção da tripulação\nAuditoria ISPS por organismo reconhecido"}},
    { id:"doc", icon:"📊", color:C.green,
      label:{fr:"DOC — Document\nde Conformité ISM",en:"DOC — Document\nof Compliance ISM",es:"DOC — Documento\nde Conformidad ISM",pt:"DOC — Documento\nde Conformidade ISM"},
      validity:{fr:"5 ans",en:"5 years",es:"5 años",pt:"5 anos"},
      desc:{fr:"Document de Conformité ISM\nDélivré à la COMPAGNIE (pas au navire)\nAtteste que le SMS est conforme au Code ISM\nAudit interne annuel\nAudit externe tous les 5 ans\nSans DOC valide : navire ne peut pas opérer",en:"ISM Document of Compliance\nIssued to the COMPANY (not the vessel)\nCertifies SMS complies with ISM Code\nAnnual internal audit\nExternal audit every 5 years\nWithout valid DOC: vessel cannot operate",es:"Documento de Conformidad ISM\nEmitido a la COMPAÑÍA (no al buque)\nAcredita que el SGS cumple con el Código ISM\nAuditoria interna anual\nAuditoria externa cada 5 años\nSin DOC válido: el buque no puede operar",pt:"Documento de Conformidade ISM\nEmitido à COMPANHIA (não ao navio)\nCertifica que o SMS cumpre o Código ISM\nAuditoria interna anual\nAuditoria externa a cada 5 anos\nSem DOC válido: navio não pode operar"}},
    { id:"smc", icon:"🏅", color:C.teal,
      label:{fr:"SMC — Certificat\nGestion Sécurité",en:"SMC — Safety\nManagement Certificate",es:"CertGS — Certificado\nGestión Seguridad",pt:"SMC — Certificado\nGestão Segurança"},
      validity:{fr:"5 ans",en:"5 years",es:"5 años",pt:"5 anos"},
      desc:{fr:"Safety Management Certificate\nDélivré au NAVIRE (basé sur le DOC)\nAtteste que le SMS est appliqué à bord\nAudit initial + renouvellement tous les 5 ans\nInspection intermédiaire\nPSC vérifie DOC + SMC lors des contrôles",en:"Safety Management Certificate\nIssued to the VESSEL (based on DOC)\nCertifies SMS is applied on board\nInitial audit + renewal every 5 years\nIntermediate inspection\nPSC checks DOC + SMC during inspections",es:"Certificado de Gestión de la Seguridad\nEmitido al BUQUE (basado en el DOC)\nAcredita que el SGS se aplica a bordo\nAuditoria inicial + renovación cada 5 años\nInspección intermedia\nPSC verifica DOC + CertGS en los controles",pt:"Certificado de Gestão da Segurança\nEmitido ao NAVIO (baseado no DOC)\nCertifica que o SMS é aplicado a bordo\nAuditoria inicial + renovação a cada 5 anos\nInspeção intermédia\nPSC verifica DOC + SMC durante controlos"},},
  ];
  const sel_ = sel!==null ? certs[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:10}}>
        {certs.map((cert,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)}
            style={{padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===i?`${cert.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===i?cert.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:20,marginBottom:4}}>{cert.icon}</div>
            <div style={{fontSize:8,color:sel===i?cert.color:C.muted,fontWeight:700,lineHeight:1.3,whiteSpace:"pre-line"}}>
              {cert.label[lang]||cert.label.fr}
            </div>
            <div style={{fontSize:7,color:cert.color,marginTop:3,opacity:0.8}}>
              {cert.validity[lang]||cert.validity.fr}
            </div>
          </div>
        ))}
      </div>
      {sel_?<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <div style={{fontSize:13,fontWeight:700,color:sel_.color}}>{sel_.icon} {(sel_.label[lang]||sel_.label.fr).replace('\n',' ')}</div>
          <span style={{padding:"2px 8px",borderRadius:8,background:`${sel_.color}22`,fontSize:9,color:sel_.color,fontWeight:700}}>{sel_.validity[lang]||sel_.validity.fr}</span>
        </div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>:<div style={{textAlign:"center",padding:"10px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche un certificat pour les détails":lang==="en"?"Tap a certificate for details":lang==="es"?"Toca un certificado para detalles":"Toque num certificado para detalhes"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — PSC INSPECTION SIMULATOR
// ══════════════════════════════════════
function PSCSimulatorSVG({ lang }) {
  const [phase, setPhase] = useState("idle");
  const [deficiencies, setDeficiencies] = useState([]);
  const [step, setStep] = useState(0);

  const inspectionItems = [
    { id:"certs", icon:"📜", color:C.blue2,
      label:{fr:"Certificats & documents",en:"Certificates & documents",es:"Certificados y documentos",pt:"Certificados e documentos"},
      result:{fr:"✅ Tous certificats valides",en:"✅ All certificates valid",es:"✅ Todos los certificados válidos",pt:"✅ Todos os certificados válidos"},
      ok:true},
    { id:"lsa", icon:"🛟", color:C.orange,
      label:{fr:"Équipements de sauvetage",en:"Life saving appliances",es:"Equipos de salvamento",pt:"Equipamentos de salvamento"},
      result:{fr:"⚠️ DÉFICIENCE : 2 gilets non conformes",en:"⚠️ DEFICIENCY: 2 non-compliant life jackets",es:"⚠️ DEFICIENCIA: 2 chalecos no conformes",pt:"⚠️ DEFICIÊNCIA: 2 coletes não conformes"},
      ok:false},
    { id:"fire", icon:"🔥", color:C.red,
      label:{fr:"Équipements incendie",en:"Fire fighting equipment",es:"Equipos contraincendios",pt:"Equipamentos de incêndio"},
      result:{fr:"⚠️ DÉFICIENCE : extincteur périmé",en:"⚠️ DEFICIENCY: expired extinguisher",es:"⚠️ DEFICIENCIA: extintor caducado",pt:"⚠️ DEFICIÊNCIA: extintor expirado"},
      ok:false},
    { id:"gmdss", icon:"📡", color:C.purple,
      label:{fr:"GMDSS / Radio",en:"GMDSS / Radio",es:"SMSSM / Radio",pt:"GMDSS / Rádio"},
      result:{fr:"✅ GMDSS conforme",en:"✅ GMDSS compliant",es:"✅ SMSSM conforme",pt:"✅ GMDSS conforme"},
      ok:true},
    { id:"ism", icon:"📊", color:C.green,
      label:{fr:"Code ISM / SMS",en:"ISM Code / SMS",es:"Código ISM / SGS",pt:"Código ISM / SMS"},
      result:{fr:"✅ DOC + SMC valides",en:"✅ DOC + SMC valid",es:"✅ DOC + CertGS válidos",pt:"✅ DOC + SMC válidos"},
      ok:true},
    { id:"isps", icon:"🔒", color:C.steel,
      label:{fr:"Sûreté ISPS",en:"ISPS Security",es:"Protección PBIP",pt:"Proteção ISPS"},
      result:{fr:"✅ Plan de sûreté conforme",en:"✅ Security plan compliant",es:"✅ Plan de protección conforme",pt:"✅ Plano de proteção conforme"},
      ok:true},
  ];

  const totalDef = inspectionItems.filter(i=>!i.ok).length;
  const isDetained = totalDef >= 3;

  const startInspection = () => {
    setPhase("inspecting");
    setStep(0);
    setDeficiencies([]);
  };

  useEffect(()=>{
    if(phase==="inspecting" && step<inspectionItems.length){
      const timer = setTimeout(()=>{
        if(!inspectionItems[step].ok){
          setDeficiencies(d=>[...d, inspectionItems[step]]);
        }
        setStep(s=>s+1);
      },800);
      return()=>clearTimeout(timer);
    }
    if(phase==="inspecting" && step>=inspectionItems.length){
      setPhase("done");
    }
  },[phase,step]);

  return (
    <div>
      {phase==="idle"&&(
        <div style={{textAlign:"center",padding:"16px 0"}}>
          <div style={{fontSize:40,marginBottom:8}}>🚢</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}>
            {lang==="fr"?"Port State Control — Inspecteur à bord\nVérification des certificats et équipements":lang==="en"?"Port State Control — Inspector on board\nChecking certificates and equipment":lang==="es"?"PSC — Inspector a bordo\nVerificando certificados y equipos":"PSC — Inspetor a bordo\nVerificação de certificados e equipamentos"}
          </div>
          <button onClick={startInspection} style={{padding:"12px 24px",borderRadius:12,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,border:"none",color:C.white,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            🔍 {lang==="fr"?"LANCER L'INSPECTION PSC":lang==="en"?"START PSC INSPECTION":lang==="es"?"INICIAR INSPECCIÓN PSC":"INICIAR INSPEÇÃO PSC"}
          </button>
        </div>
      )}
      {(phase==="inspecting"||phase==="done")&&(
        <div>
          <div style={{marginBottom:8,padding:"6px 10px",borderRadius:8,
            background:phase==="done"?(isDetained?"rgba(192,57,43,0.15)":"rgba(30,138,74,0.1)"):"rgba(26,111,212,0.1)",
            border:`1px solid ${phase==="done"?(isDetained?C.red:C.green):C.blue2}33`,
            fontSize:10,fontWeight:700,
            color:phase==="done"?(isDetained?C.red:C.green):C.blue2,textAlign:"center"}}>
            {phase==="inspecting"
              ?(lang==="fr"?"🔍 Inspection en cours...":lang==="en"?"🔍 Inspection in progress...":lang==="es"?"🔍 Inspección en curso...":"🔍 Inspeção em curso...")
              :isDetained
                ?(lang==="fr"?"🔴 NAVIRE IMMOBILISÉ — 2 déficiences graves":lang==="en"?"🔴 VESSEL DETAINED — 2 serious deficiencies":lang==="es"?"🔴 BUQUE RETENIDO — 2 deficiencias graves":"🔴 NAVIO RETIDO — 2 deficiências graves")
                :(lang==="fr"?"✅ NAVIRE AUTORISÉ — Déficiences mineures à corriger":lang==="en"?"✅ VESSEL CLEARED — Minor deficiencies to correct":lang==="es"?"✅ BUQUE AUTORIZADO — Deficiencias menores a corregir":"✅ NAVIO AUTORIZADO — Deficiências menores a corrigir")}
          </div>
          {inspectionItems.slice(0,step+1).map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,marginBottom:5,
              background:item.ok?"rgba(30,138,74,0.06)":"rgba(192,57,43,0.08)",
              border:`1px solid ${item.ok?C.green:C.red}22`,
              animation:"fadeUp 0.3s ease"}}>
              <span style={{fontSize:14}}>{item.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:10,fontWeight:700,color:item.ok?C.green:C.red}}>{item.label[lang]||item.label.fr}</div>
                <div style={{fontSize:9,color:C.muted}}>{item.result[lang]||item.result.fr}</div>
              </div>
              <span style={{fontSize:14}}>{item.ok?"✅":"⚠️"}</span>
            </div>
          ))}
          {phase==="done"&&(
            <button onClick={()=>{setPhase("idle");setStep(0);setDeficiencies([]);}} style={{width:"100%",marginTop:8,padding:"9px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,fontSize:11,cursor:"pointer"}}>
              🔄 {lang==="fr"?"Recommencer":"Restart"}
            </button>
          )}
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
    fr:{title:"Naufrage MV Estonia — Mer Baltique (1994)",teaser:"Ferry · 852 morts · Défaut de construction · SOLAS renforcé",what:"Le ferry Estonia coule dans la Mer Baltique lors d'une tempête. 852 personnes meurent. L'enquête révèle que la porte de proue (bow visor) n'était pas conforme aux normes de résistance. L'eau envahit le pont garage, le navire se met en gîte et coule en moins de 30 minutes.",cause:"• Porte de proue (bow visor) sous-dimensionnée pour les conditions\n• Conception non conforme aux exigences de résistance\n• Manque de cloisons étanches sur le pont garage\n• Procédures d'abandon insuffisamment pratiquées\n• Conditions météo (tempête) sous-estimées",lessons:"✓ SOLAS renforcé : solidité des portes bow visor\n✓ Exigences nouvelles : stabilité navires ro-ro passagers\n✓ Directive UE sur la stabilité des ferries\n✓ Exercices d'abandon : obligatoires avant appareillage\n✓ Résultat : révision complète des règles de construction SOLAS Chap. II-1",link:"🔗 Lien L1 SOLAS : Le naufrage de l'Estonia a directement modifié SOLAS. Chaque catastrophe maritime améliore les conventions. SOLAS = l'héritage de milliers de marins morts pour que les suivants survivent."},
    en:{title:"MV Estonia Sinking — Baltic Sea (1994)",teaser:"Ferry · 852 deaths · Construction defect · SOLAS strengthened",what:"The ferry Estonia sinks in the Baltic Sea during a storm. 852 people die. Investigation reveals the bow visor did not meet resistance standards. Water floods the car deck, the vessel lists and sinks in less than 30 minutes.",cause:"• Bow visor undersized for conditions\n• Design not compliant with resistance requirements\n• Lack of watertight bulkheads on car deck\n• Abandon ship procedures insufficiently practiced\n• Weather conditions (storm) underestimated",lessons:"✓ SOLAS strengthened: bow visor door strength\n✓ New requirements: ro-ro passenger vessel stability\n✓ EU directive on ferry stability\n✓ Abandon ship drills: mandatory before departure\n✓ Result: complete revision of SOLAS Chapter II-1 construction rules",link:"🔗 L1 SOLAS Link: The Estonia sinking directly modified SOLAS. Each maritime disaster improves conventions. SOLAS = the legacy of thousands of mariners who died so those who follow would survive."},
    es:{title:"Hundimiento MV Estonia — Mar Báltico (1994)",teaser:"Ferry · 852 muertos · Defecto de construcción · SOLAS reforzado",what:"El ferry Estonia se hunde en el Mar Báltico durante una tormenta. 852 personas mueren. La investigación revela que la puerta de proa (bow visor) no cumplía las normas de resistencia.",cause:"• Puerta de proa (bow visor) subdimensionada\n• Diseño no conforme a los requisitos de resistencia\n• Falta de mamparos estancos en la cubierta de garaje\n• Procedimientos de abandono insuficientemente practicados",lessons:"✓ SOLAS reforzado: solidez de las puertas bow visor\n✓ Nuevos requisitos: estabilidad de buques ro-ro de pasaje\n✓ Directiva UE sobre estabilidad de ferrys\n✓ Resultado: revisión completa de las reglas de construcción SOLAS Cap. II-1",link:"🔗 Vínculo L1: El hundimiento del Estonia modificó directamente SOLAS. Cada catástrofe marítima mejora los convenios."},
    pt:{title:"Naufrágio MV Estonia — Mar Báltico (1994)",teaser:"Ferry · 852 mortos · Defeito de construção · SOLAS reforçado",what:"O ferry Estonia afunda no Mar Báltico durante uma tempestade. 852 pessoas morrem. A investigação revela que a porta de proa (bow visor) não cumpria as normas de resistência.",cause:"• Porta de proa (bow visor) subdimensionada\n• Projeto não conforme com os requisitos de resistência\n• Falta de anteparas estanques no convés de garagem\n• Procedimentos de abandono insuficientemente praticados",lessons:"✓ SOLAS reforçado: solidez das portas bow visor\n✓ Novos requisitos: estabilidade de navios ro-ro de passageiros\n✓ Diretiva UE sobre estabilidade de ferries\n✓ Resultado: revisão completa das regras de construção SOLAS Cap. II-1",link:"🔗 Vínculo L1: O naufrágio do Estonia modificou diretamente o SOLAS. Cada catástrofe marítima melhora as convenções."},
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
      {id:"q1",q:"En quelle année la convention SOLAS actuellement en vigueur a-t-elle été adoptée ?",correct:"1974"},
      {id:"q2",q:"Quel chapitre SOLAS couvre le Code ISM ?\n(Répondre : le numéro romain)",correct:"IX"},
      {id:"q3",q:"PSC signifie ?\n(Répondre : les 3 mots en français)",correct:"Port State Control"},
    ],
    en:[
      {id:"q1",q:"In what year was the currently-in-force SOLAS convention adopted?",correct:"1974"},
      {id:"q2",q:"Which SOLAS chapter covers the ISM Code?\n(Answer: the Roman numeral)",correct:"IX"},
      {id:"q3",q:"What does PSC stand for?\n(Answer: 3 words)",correct:"Port State Control"},
    ],
    es:[
      {id:"q1",q:"¿En qué año fue adoptado el convenio SOLAS actualmente en vigor?",correct:"1974"},
      {id:"q2",q:"¿Qué capítulo SOLAS cubre el Código ISM?\n(Responder: el número romano)",correct:"IX"},
      {id:"q3",q:"¿Qué significa PSC?\n(Responder: las 3 palabras en inglés)",correct:"Port State Control"},
    ],
    pt:[
      {id:"q1",q:"Em que ano foi adotada a convenção SOLAS atualmente em vigor?",correct:"1974"},
      {id:"q2",q:"Que capítulo SOLAS cobre o Código ISM?\n(Responder: o número romano)",correct:"IX"},
      {id:"q3",q:"O que significa PSC?\n(Responder: as 3 palavras em inglês)",correct:"Port State Control"},
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
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.gold}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : SOLAS 1974 · Chapitre IX = ISM · PSC = Port State Control"
        :lang==="en"?"💡 Reminders: SOLAS 1974 · Chapter IX = ISM · PSC = Port State Control"
        :lang==="es"?"💡 Recordatorios: SOLAS 1974 · Capítulo IX = ISM · PSC = Port State Control"
        :"💡 Lembretes: SOLAS 1974 · Capítulo IX = ISM · PSC = Port State Control"}
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
        {lang==="fr"?"✅ Q1: 1974 (SOLAS 1974, en vigueur depuis 1980)\n✅ Q2: IX (Chapitre IX = Code ISM obligatoire)\n✅ Q3: Port State Control (inspection des navires étrangers dans les ports)"
        :lang==="en"?"✅ Q1: 1974 (SOLAS 1974, in force since 1980)\n✅ Q2: IX (Chapter IX = mandatory ISM Code)\n✅ Q3: Port State Control (inspection of foreign vessels in ports)"
        :"✅ Q1: 1974 · Q2: IX · Q3: Port State Control"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}


const QUIZ = {
  fr:[
    {q:"En quelle année la convention SOLAS actuellement en vigueur a-t-elle été adoptée ?",opts:["1912","1948","1974","2002"],correct:2,expl:"SOLAS 1974 = la convention actuellement en vigueur. Adoptée à Londres le 1er novembre 1974, entrée en vigueur le 25 mai 1980. Elle remplace les versions précédentes (1914, 1929, 1948, 1960). Elle est continuellement mise à jour via la 'procédure d'amendement tacite' de l'OMI. 163 États contractants représentant plus de 98% du tonnage mondial."},
    {q:"Quel événement a été le catalyseur de la création de SOLAS ?",opts:["La Première Guerre Mondiale","Le naufrage du RMS Titanic en 1912","La création de l'OMI en 1948","L'accident de l'Estonia en 1994"],correct:1,expl:"Le naufrage du RMS Titanic le 15 avril 1912 (1 496 morts) a choqué le monde et révélé les lacunes de la sécurité maritime : canots de sauvetage insuffisants, pas de veille radio permanente, vitesse excessive dans les glaces. La première conférence SOLAS a été convoquée en 1913 et a abouti à SOLAS 1914 (jamais entré en vigueur à cause de la WWI)."},
    {q:"Le Code ISM est couvert par quel chapitre de SOLAS ?",opts:["Chapitre II-2","Chapitre III","Chapitre IX","Chapitre XI-2"],correct:2,expl:"Chapitre IX SOLAS = Code ISM (International Safety Management). Obligatoire depuis 1998 (navires passagers + pétroliers) et 2002 (tous navires > 500 TB). Exige un SMS (Safety Management System) avec DOC (Document of Compliance) pour la compagnie et SMC (Safety Management Certificate) pour chaque navire."},
    {q:"Qu'est-ce que le Port State Control (PSC) ?",opts:["Un certificat de l'État du pavillon","Inspection des navires étrangers dans les ports pour vérifier le respect de SOLAS, MARPOL, STCW et MLC","Un service de pilotage portuaire","Un contrôle douanier"],correct:1,expl:"PSC = Port State Control. Droit et devoir de chaque État portuaire d'inspecter les navires étrangers dans ses ports. Vérifie : SOLAS (sécurité), MARPOL (environnement), STCW (compétences équipage), MLC (conditions travail). Peut immobiliser (détenir) le navire en cas de déficiences graves. Organisations régionales : Paris MOU (Europe), Tokyo MOU (Asie-Pacifique)."},
    {q:"Le Code ISPS (sûreté maritime) a été ajouté à SOLAS après quel événement ?",opts:["Naufrage du Titanic","Guerre du Golfe","Attentats du 11 septembre 2001","Naufrage de l'Estonia"],correct:2,expl:"Le Code ISPS (International Ship and Port Facility Security Code) a été adopté en décembre 2002 et est entré en vigueur le 1er juillet 2004, en réponse aux attentats du 11 septembre 2001. Il est incorporé dans SOLAS Chapitre XI-2. Crée 3 niveaux de sûreté, impose un plan de sûreté navire (SSP) et des officiers de sûreté (SSO + CSO)."},
  ],
  en:[
    {q:"In what year was the currently-in-force SOLAS convention adopted?",opts:["1912","1948","1974","2002"],correct:2,expl:"SOLAS 1974 = the currently-in-force convention. Adopted in London on November 1, 1974, entered into force May 25, 1980. Replaces previous versions (1914, 1929, 1948, 1960). Continuously updated via IMO's 'tacit acceptance amendment procedure'. 163 contracting states representing 98%+ of world tonnage."},
    {q:"What event was the catalyst for creating SOLAS?",opts:["World War I","The RMS Titanic sinking in 1912","The creation of IMO in 1948","The Estonia accident in 1994"],correct:1,expl:"The RMS Titanic sinking on April 15, 1912 (1,496 deaths) shocked the world and revealed maritime safety gaps: insufficient lifeboats, no permanent radio watch, excessive speed in ice. The first SOLAS conference was convened in 1913 and resulted in SOLAS 1914 (never entered into force due to WWI)."},
    {q:"The ISM Code is covered by which chapter of SOLAS?",opts:["Chapter II-2","Chapter III","Chapter IX","Chapter XI-2"],correct:2,expl:"SOLAS Chapter IX = ISM Code (International Safety Management). Mandatory since 1998 (passenger vessels + tankers) and 2002 (all vessels > 500 GT). Requires an SMS (Safety Management System) with DOC (Document of Compliance) for the company and SMC (Safety Management Certificate) for each vessel."},
    {q:"What is Port State Control (PSC)?",opts:["A flag state certificate","Inspection of foreign vessels in ports to verify compliance with SOLAS, MARPOL, STCW and MLC","A port pilotage service","A customs control"],correct:1,expl:"PSC = Port State Control. Right and duty of each port state to inspect foreign vessels in its ports. Checks: SOLAS (safety), MARPOL (environment), STCW (crew competence), MLC (working conditions). Can detain vessel for serious deficiencies. Regional organizations: Paris MOU (Europe), Tokyo MOU (Asia-Pacific)."},
    {q:"The ISPS Code (maritime security) was added to SOLAS after which event?",opts:["Titanic sinking","Gulf War","September 11, 2001 attacks","Estonia sinking"],correct:2,expl:"The ISPS Code (International Ship and Port Facility Security Code) was adopted in December 2002 and entered into force July 1, 2004, in response to the September 11, 2001 attacks. Incorporated in SOLAS Chapter XI-2. Creates 3 security levels, mandates a Ship Security Plan (SSP) and security officers (SSO + CSO)."},
  ],
  es:[
    {q:"¿En qué año fue adoptado el convenio SOLAS actualmente en vigor?",opts:["1912","1948","1974","2002"],correct:2,expl:"SOLAS 1974 = el convenio actualmente en vigor. Adoptado en Londres el 1 de noviembre de 1974, entró en vigor el 25 de mayo de 1980. Sustituye versiones anteriores (1914, 1929, 1948, 1960). Se actualiza continuamente mediante el 'procedimiento de aceptación tácita' de la OMI. 163 estados contratantes que representan más del 98% del tonelaje mundial."},
    {q:"¿Qué acontecimiento fue el catalizador de la creación de SOLAS?",opts:["La Primera Guerra Mundial","El hundimiento del RMS Titanic en 1912","La creación de la OMI en 1948","El accidente del Estonia en 1994"],correct:1,expl:"El hundimiento del RMS Titanic el 15 de abril de 1912 (1.496 muertos) conmocionó al mundo y reveló las carencias de la seguridad marítima: botes salvavidas insuficientes, sin vigilancia radio permanente, velocidad excesiva en los hielos. La primera conferencia SOLAS se convocó en 1913 y resultó en SOLAS 1914 (nunca entró en vigor por la WWI)."},
    {q:"¿El Código ISM está cubierto por qué capítulo de SOLAS?",opts:["Capítulo II-2","Capítulo III","Capítulo IX","Capítulo XI-2"],correct:2,expl:"Capítulo IX SOLAS = Código ISM (Gestión Internacional de la Seguridad). Obligatorio desde 1998 (buques de pasaje + petroleros) y 2002 (todos los buques > 500 TB). Exige un SGS (Sistema de Gestión de la Seguridad) con DOC (Documento de Conformidad) para la compañía y CertGS (Certificado de Gestión de la Seguridad) para cada buque."},
    {q:"¿Qué es el Control del Estado Rector del Puerto (PSC)?",opts:["Un certificado del Estado de pabellón","Inspección de buques extranjeros en los puertos para verificar el cumplimiento de SOLAS, MARPOL, STCW y MLC","Un servicio de practicaje portuario","Un control aduanero"],correct:1,expl:"PSC = Control del Estado Rector del Puerto. Derecho y deber de cada Estado portuario de inspeccionar buques extranjeros en sus puertos. Verifica: SOLAS (seguridad), MARPOL (medio ambiente), STCW (competencias tripulación), MLC (condiciones laborales). Puede retener el buque por deficiencias graves."},
    {q:"¿El Código PBIP (protección marítima) fue añadido a SOLAS tras qué acontecimiento?",opts:["Hundimiento del Titanic","Guerra del Golfo","Atentados del 11 de septiembre de 2001","Hundimiento del Estonia"],correct:2,expl:"El Código PBIP (Código Internacional para la Protección de los Buques y de las Instalaciones Portuarias) fue adoptado en diciembre de 2002 y entró en vigor el 1 de julio de 2004, en respuesta a los atentados del 11 de septiembre de 2001. Incorporado en SOLAS Capítulo XI-2. Crea 3 niveles de protección e impone un plan de protección del buque (PPB) y oficiales de protección (OPB + OPC)."},
  ],
  pt:[
    {q:"Em que ano foi adotada a convenção SOLAS atualmente em vigor?",opts:["1912","1948","1974","2002"],correct:2,expl:"SOLAS 1974 = a convenção atualmente em vigor. Adotada em Londres em 1 de novembro de 1974, entrou em vigor a 25 de maio de 1980. Substitui versões anteriores (1914, 1929, 1948, 1960). Atualizada continuamente via 'procedimento de aceitação tácita' da IMO. 163 estados contratantes representando +98% da tonelagem mundial."},
    {q:"Que acontecimento foi o catalisador da criação do SOLAS?",opts:["Primeira Guerra Mundial","O naufrágio do RMS Titanic em 1912","A criação da IMO em 1948","O acidente do Estonia em 1994"],correct:1,expl:"O naufrágio do RMS Titanic a 15 de abril de 1912 (1.496 mortos) chocou o mundo e revelou as lacunas da segurança marítima: botes salva-vidas insuficientes, sem vigilância rádio permanente, velocidade excessiva no gelo. A primeira conferência SOLAS foi convocada em 1913 e resultou no SOLAS 1914 (nunca entrou em vigor devido à WWI)."},
    {q:"O Código ISM está coberto por que capítulo do SOLAS?",opts:["Capítulo II-2","Capítulo III","Capítulo IX","Capítulo XI-2"],correct:2,expl:"Capítulo IX SOLAS = Código ISM (Gestão Internacional da Segurança). Obrigatório desde 1998 (navios de passageiros + petroleiros) e 2002 (todos os navios > 500 AB). Exige um SMS (Sistema de Gestão da Segurança) com DOC (Documento de Conformidade) para a companhia e SMC (Certificado de Gestão da Segurança) para cada navio."},
    {q:"O que é o Controlo pelo Estado do Porto (PSC)?",opts:["Um certificado do Estado de bandeira","Inspeção de navios estrangeiros nos portos para verificar o cumprimento do SOLAS, MARPOL, STCW e MLC","Um serviço de praticagem portuária","Um controlo aduaneiro"],correct:1,expl:"PSC = Controlo pelo Estado do Porto. Direito e dever de cada Estado portuário de inspecionar navios estrangeiros nos seus portos. Verifica: SOLAS (segurança), MARPOL (ambiente), STCW (competências tripulação), MLC (condições laborais). Pode reter o navio por deficiências graves."},
    {q:"O Código ISPS (proteção marítima) foi adicionado ao SOLAS após que acontecimento?",opts:["Naufrágio do Titanic","Guerra do Golfo","Ataques de 11 de setembro de 2001","Naufrágio do Estonia"],correct:2,expl:"O Código ISPS (Código Internacional para a Proteção de Navios e Instalações Portuárias) foi adotado em dezembro de 2002 e entrou em vigor a 1 de julho de 2004, em resposta aos ataques de 11 de setembro de 2001. Incorporado no SOLAS Capítulo XI-2. Cria 3 níveis de proteção e impõe um Plano de Proteção do Navio (SSP) e oficiais de proteção (SSO + CSO)."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que la 'procédure d'amendement tacite' de l'OMI ?",opts:["Une procédure administrative interne","Méthode permettant d'amender SOLAS sans vote explicit — l'amendement entre en vigueur sauf si un certain nombre d'États s'y opposent","Un type de certification","Une procédure de plainte"],correct:1,expl:"Procédure d'amendement tacite (tacit acceptance) = système permettant à l'OMI d'adopter des amendements à SOLAS rapidement. L'amendement est réputé accepté sauf si un nombre prédéfini d'États s'y oppose dans le délai imparti. Permet une mise à jour continuelle de SOLAS sans délais excessifs. Clé pour adapter rapidement les règles aux nouvelles technologies."},
    {q:"Qu'est-ce que le VDR (Voyage Data Recorder) obligatoire par SOLAS ?",opts:["Un registre de navigation papier","Enregistreur de données du voyage (boîte noire maritime) — conserve les 12 dernières heures de données de navigation, audio passerelle, radar","Un système GPS avancé","Un journal électronique de bord"],correct:1,expl:"VDR = Voyage Data Recorder = 'boîte noire' maritime. Obligatoire SOLAS Chapitre V pour navires > 3 000 TB (passagers depuis 2002, cargo depuis 2004). Enregistre : position GPS, cap, vitesse, données radar, communications VHF, audio passerelle, alarmes. Conserve les 12 dernières heures. Permet d'analyser les accidents."},
    {q:"Qu'est-ce que l'ECDIS (Electronic Chart Display and Information System) ?",opts:["Un système radar","Système de cartes électroniques remplaçant les cartes papier — intègre GPS, AIS, alarmes de sécurité, profondeurs","Un AIS avancé","Un système météo"],correct:1,expl:"ECDIS = Electronic Chart Display and Information System. Obligatoire SOLAS (navires > 500 TB, progressivement depuis 2012). Affiche la carte électronique ENC (Electronic Navigational Chart) avec position GPS en temps réel, données AIS, alarmes de zone dangereuse, profondeurs. Mise à jour hebdomadaire obligatoire des cartes. Doit avoir une sauvegarde (backup)."},
    {q:"Quelle est la différence entre la classe de navire 'A' et 'B' dans SOLAS Chapitre II-2 ?",opts:["La taille du navire","Classe A : navires passagers · Classe B : autres navires (cargo, tankers) — normes de résistance au feu différentes","La nationalité du navire","La zone de navigation"],correct:1,expl:"Classification SOLAS pour les matériaux résistants au feu : Classe A = cloisons résistant au feu 60 minutes + empêchant la fumée (ex: entre salle machines et logements). Classe B = résistant au feu 30 minutes. Classe C = matériaux non combustibles. Applicable aux navires passagers notamment. Différent de la classification 'navires passagers' vs 'cargo'."},
    {q:"Qu'est-ce que le certificat 'De Franc-Bord' (Load Line Certificate) ?",opts:["Un certificat ISM","Certificat fixant les marques de franc-bord (Plimsoll) — lignes maximales de chargement selon la saison et la zone de navigation","Un certificat de stabilité","Un certificat de navigation"],correct:1,expl:"Certificat de Franc-Bord (Load Line Certificate) = établi selon la Convention de Ligne de Charge (1966). Détermine les marques Plimsoll sur la coque : lignes maximales de chargement selon : saison (été/hiver/été tropical/zones tropicales) et zone géographique (eau douce/salée). Obligatoire pour navires > 24m en navigation internationale. Valide 5 ans."},
    {q:"Qu'est-ce que l'STCW et quel est son lien avec SOLAS ?",opts:["STCW = une annexe de SOLAS","Convention distincte de l'OMI (1978) sur la formation des gens de mer — complémentaire à SOLAS mais convention séparée","STCW = un chapitre de SOLAS","STCW = une recommandation non obligatoire"],correct:1,expl:"STCW = Standards of Training, Certification and Watchkeeping for Seafarers (1978, amendé 1995 et 2010). Convention OMI DISTINCTE de SOLAS mais complémentaire. Définit les qualifications minimales des marins. SOLAS impose la sécurité du navire, STCW impose la compétence de l'équipage. Les deux sont vérifiés lors des inspections PSC."},
    {q:"Qu'est-ce que la Convention MLC 2006 ?",opts:["Une convention sur la construction navale","Maritime Labour Convention — droits et conditions de travail des gens de mer : rémunération, repos, rapatriement, médecine","Une convention sur les marchandises dangereuses","Une convention de l'OMI sur la pollution"],correct:1,expl:"MLC 2006 = Maritime Labour Convention. Adoptée par l'OIT (Organisation Internationale du Travail) en 2006, en vigueur depuis 2013. Couvre : salaire minimum, heures travail/repos (STCW), conditions d'hébergement, nourriture, médecine, rapatriement, protection sociale. Complète SOLAS/STCW/MARPOL. Vérifiée par PSC. Surnommée 'quatrième pilier' du droit maritime."},
    {q:"Qu'est-ce que la Convention MARPOL et quel est son rapport avec SOLAS ?",opts:["MARPOL = une partie de SOLAS","Convention OMI distincte (1973/1978) sur la prévention de la pollution maritime — séparée de SOLAS mais aussi vérifiée par PSC","MARPOL = une recommandation non obligatoire","MARPOL = une convention sur les naufragés"],correct:1,expl:"MARPOL = MARine POLlution. Convention OMI distincte (1973/78). 6 annexes : Hydrocarbures · Chimiques · IMDG · Eaux usées · Ordures · Atmosphère. Pas une partie de SOLAS mais vérifiée simultanément par le PSC. SOLAS = sécurité humaine · MARPOL = protection environnement · STCW = compétences · MLC = conditions de travail. Les 4 grandes conventions maritimes."},
    {q:"Qu'est-ce que la Convention de Barcelone (COLREG) ?",opts:["La Convention des Droits de la Mer","Le Règlement International pour Prévenir les Abordages en Mer (RIPAM) — 38 règles sur les feux, signaux et priorités de passage","Une convention sur le travail maritime","Une convention sur les ports"],correct:1,expl:"COLREG = Convention on the International Regulations for Preventing Collisions at Sea (1972). Appelé RIPAM en français. 38 règles sur : feux et marques de navigation (nuit et jour), signaux sonores et lumineux, priorités de passage entre navires, comportement par visibilité réduite, dispositifs de séparation du trafic (DST). Obligatoire et vérifiée par PSC."},
    {q:"Qu'est-ce que l'UNCLOS (Convention des Nations Unies sur le Droit de la Mer) ?",opts:["Une convention de l'OMI","Constitution maritime mondiale (1982) — définit les zones maritimes : eaux territoriales, ZEE, haute mer, plateau continental","Une convention sur la pêche","Une convention sur les ports francs"],correct:1,expl:"UNCLOS = United Nations Convention on the Law of the Sea (1982, en vigueur 1994). Constitution maritime mondiale. Définit : Mer territoriale (12 milles · souveraineté État côtier), Zone contiguë (24 milles), ZEE (200 milles · droits économiques), Plateau continental, Haute mer (liberté navigation). Cadre légal fondamental pour toutes les autres conventions maritimes."},
    {q:"Qu'est-ce que le Paris MOU (Memorandum of Understanding) ?",opts:["Un accord commercial entre armateurs","Organisation régionale de Port State Control en Europe — coordonne les inspections PSC des navires étrangers dans les ports européens","Un accord fiscal maritime","Une alliance de compagnies maritimes"],correct:1,expl:"Paris MOU = accord régional PSC pour l'Europe et l'Atlantique Nord. 27 États membres. Coordonne les inspections PSC : base de données commune, liste noire (Black List) des navires dangereux, ciblage des navires à inspecter. Navires liste noire = inspectés à chaque escale. Autres MOU : Tokyo (Asie-Pacifique), Black Sea, Indian Ocean, etc."},
    {q:"Qu'est-ce que le certificat de jauge (Tonnage Certificate) ?",opts:["Un certificat de valeur du navire","Certificat officiel indiquant la jauge brute (GT) et jauge nette (NT) du navire — détermine les taxes portuaires et les obligations SOLAS","Un certificat de fret","Un certificat de vitesse"],correct:1,expl:"Tonnage Certificate = certificat de jauge. Etabli selon la Convention de Jauge (1969). Indique : GT (Gross Tonnage = volume total), NT (Net Tonnage = volume commercial). Importance : détermine les droits de port, les droits de passage (Canal Suez/Panama), et les seuils SOLAS (ex: AIS obligatoire > 300 GT, ECDIS > 500 GT, ISM > 500 GT)."},
    {q:"Qu'est-ce que la procédure d'inspection 'enhanced' (renforcée) du PSC ?",opts:["Une inspection annuelle obligatoire","Inspection PSC approfondie pour navires à haut risque — vérification de tous les systèmes de sécurité, exercices pratiques, tests d'équipements","Une inspection réservée aux paquebots","Une inspection uniquement pour les pétroliers"],correct:1,expl:"Enhanced inspection = inspection PSC renforcée. Obligatoire pour navires à risque élevé (âgés, nombreuses déficiences historiques, pavillons liste noire). Inclut : test pratique exercice abandon, test pompiers, test équipements radio GMDSS, vérification journal machine/bord, test groupe de secours. Plus longue et plus complète qu'une inspection standard."},
    {q:"Qu'est-ce que la liste noire des pavillons du PSC ?",opts:["Une liste de pirates","Classification des États du pavillon selon le taux de déficiences et détentions de leurs navires — pavillons gris et noirs = surveillance accrue","Une liste de ports dangereux","Une liste de cargaisons interdites"],correct:1,expl:"Liste noire PSC = classification des pavillons selon le taux de détention de leurs navires. Paris MOU : liste blanche (bonne performance), liste grise (à surveiller), liste noire (mauvaise performance). Navires sous pavillon liste noire = inspectés SYSTÉMATIQUEMENT à chaque escale dans les ports PSC. Pression sur les États de pavillon pour améliorer leurs normes."},
    {q:"Qu'est-ce que la Convention SAR (Search and Rescue) 1979 ?",opts:["Une convention sur les opérations commerciales","Convention OMI organisant la coopération internationale pour la recherche et le sauvetage en mer — divise les océans en zones SAR","Une convention sur les ports de refuge","Une convention sur la piraterie"],correct:1,expl:"Convention SAR (Search and Rescue) 1979 = Convention internationale sur la recherche et le sauvetage maritimes. Divise les océans en zones SAR dont chaque pays signataire est responsable. Chaque zone = un MRCC (Maritime Rescue Coordination Centre). Oblige les navires à porter assistance à toute personne en détresse. Complémentaire à SOLAS Chapitre V."},
  ],
  en:[
    {q:"What is the IMO's 'tacit acceptance amendment procedure'?",opts:["An internal administrative procedure","Method allowing SOLAS amendments without explicit vote — amendment enters force unless a set number of states object","A type of certification","A complaint procedure"],correct:1,expl:"Tacit acceptance procedure = system allowing IMO to adopt SOLAS amendments quickly. Amendment deemed accepted unless a predefined number of states objects within the allotted time. Enables continuous SOLAS updating without excessive delays. Key for rapidly adapting rules to new technologies."},
    {q:"What is the VDR (Voyage Data Recorder) mandatory per SOLAS?",opts:["A paper navigation record","Maritime voyage data recorder (maritime black box) — stores last 12 hours of navigation data, bridge audio, radar","An advanced GPS system","An electronic deck log"],correct:1,expl:"VDR = Voyage Data Recorder = maritime 'black box'. Mandatory SOLAS Chapter V for vessels > 3,000 GT (passenger vessels since 2002, cargo since 2004). Records: GPS position, course, speed, radar data, VHF communications, bridge audio, alarms. Stores last 12 hours. Used to analyze accidents."},
    {q:"What is ECDIS (Electronic Chart Display and Information System)?",opts:["A radar system","Electronic chart system replacing paper charts — integrates GPS, AIS, safety alarms, depths","An advanced AIS","A weather system"],correct:1,expl:"ECDIS = Electronic Chart Display and Information System. Mandatory SOLAS (vessels > 500 GT, progressively since 2012). Displays ENC (Electronic Navigational Chart) with real-time GPS position, AIS data, danger zone alarms, depths. Weekly chart update mandatory. Must have backup."},
    {q:"What is the difference between vessel class 'A' and 'B' in SOLAS Chapter II-2?",opts:["Vessel size","Class A: fire-resistant bulkheads 60 min · Class B: fire-resistant 30 min — different fire resistance standards","Vessel nationality","Navigation area"],correct:1,expl:"SOLAS fire-resistant material classification: Class A = bulkheads resisting fire 60 minutes + smoke barrier (e.g. between engine room and accommodation). Class B = fire resistant 30 minutes. Class C = non-combustible materials. Applicable especially to passenger vessels. Different from 'passenger' vs 'cargo' classification."},
    {q:"What is the Load Line Certificate (Franc-Bord Certificate)?",opts:["An ISM certificate","Certificate fixing load line marks (Plimsoll) — maximum loading lines by season and navigation zone","A stability certificate","A navigation certificate"],correct:1,expl:"Load Line Certificate = established per Load Line Convention (1966). Determines Plimsoll marks on hull: maximum loading lines by: season (summer/winter/summer tropical/tropical zones) and geographical zone (fresh/salt water). Mandatory for vessels > 24m in international navigation. Valid 5 years."},
    {q:"What is STCW and what is its relationship to SOLAS?",opts:["STCW = a SOLAS annex","Separate IMO convention (1978) on seafarer training — complementary to SOLAS but separate convention","STCW = a SOLAS chapter","STCW = a non-mandatory recommendation"],correct:1,expl:"STCW = Standards of Training, Certification and Watchkeeping for Seafarers (1978, amended 1995 and 2010). SEPARATE IMO convention from SOLAS but complementary. Defines minimum seafarer qualifications. SOLAS = vessel safety, STCW = crew competence. Both checked during PSC inspections."},
    {q:"What is the MLC 2006 Convention?",opts:["A shipbuilding convention","Maritime Labour Convention — seafarer rights and working conditions: pay, rest, repatriation, medicine","A dangerous goods convention","An IMO pollution convention"],correct:1,expl:"MLC 2006 = Maritime Labour Convention. Adopted by ILO (International Labour Organization) in 2006, in force since 2013. Covers: minimum wage, work/rest hours (STCW), accommodation conditions, food, medicine, repatriation, social protection. Complements SOLAS/STCW/MARPOL. Checked by PSC. Called '4th pillar' of maritime law."},
    {q:"What is MARPOL and its relationship to SOLAS?",opts:["MARPOL = part of SOLAS","Separate IMO convention (1973/1978) on marine pollution prevention — separate from SOLAS but also checked by PSC","MARPOL = a non-mandatory recommendation","MARPOL = a convention on shipwrecked persons"],correct:1,expl:"MARPOL = MARine POLlution. Separate IMO convention (1973/78). 6 annexes: Oil · Chemicals · IMDG · Sewage · Garbage · Atmosphere. Not part of SOLAS but checked simultaneously by PSC. SOLAS = human safety · MARPOL = environmental protection · STCW = competences · MLC = working conditions. The 4 major maritime conventions."},
    {q:"What is COLREG?",opts:["The Law of the Sea Convention","International Regulations for Preventing Collisions at Sea — 38 rules on lights, signals and right of way","A maritime labour convention","A ports convention"],correct:1,expl:"COLREG = Convention on the International Regulations for Preventing Collisions at Sea (1972). 38 rules on: navigation lights and shapes (night and day), sound and light signals, right of way between vessels, conduct in restricted visibility, traffic separation schemes (TSS). Mandatory and checked by PSC."},
    {q:"What is UNCLOS (UN Convention on the Law of the Sea)?",opts:["An IMO convention","Maritime world constitution (1982) — defines maritime zones: territorial waters, EEZ, high seas, continental shelf","A fishing convention","A free ports convention"],correct:1,expl:"UNCLOS = United Nations Convention on the Law of the Sea (1982, in force 1994). Maritime world constitution. Defines: Territorial sea (12 miles · coastal state sovereignty), Contiguous zone (24 miles), EEZ (200 miles · economic rights), Continental shelf, High seas (freedom of navigation). Fundamental legal framework for all other maritime conventions."},
    {q:"What is the Paris MOU (Memorandum of Understanding)?",opts:["A commercial agreement between shipowners","Regional Port State Control organization for Europe — coordinates PSC inspections of foreign vessels in European ports","A maritime tax agreement","A shipping alliance"],correct:1,expl:"Paris MOU = regional PSC agreement for Europe and North Atlantic. 27 member states. Coordinates PSC inspections: shared database, Black List of dangerous vessels, targeting of vessels to inspect. Black list vessels = inspected at EVERY port call in PSC ports. Other MoUs: Tokyo (Asia-Pacific), Black Sea, Indian Ocean, etc."},
    {q:"What is the Tonnage Certificate?",opts:["A vessel value certificate","Official certificate indicating Gross Tonnage (GT) and Net Tonnage (NT) — determines port taxes and SOLAS obligations","A freight certificate","A speed certificate"],correct:1,expl:"Tonnage Certificate = established per Tonnage Convention (1969). Shows: GT (Gross Tonnage = total volume), NT (Net Tonnage = commercial volume). Importance: determines port dues, canal transit fees (Suez/Panama), and SOLAS thresholds (e.g. AIS mandatory > 300 GT, ECDIS > 500 GT, ISM > 500 GT)."},
    {q:"What is PSC 'enhanced inspection'?",opts:["A mandatory annual inspection","In-depth PSC inspection for high-risk vessels — checking all safety systems, practical drills, equipment tests","An inspection reserved for cruise ships","An inspection only for tankers"],correct:1,expl:"Enhanced inspection = in-depth PSC inspection. Mandatory for high-risk vessels (old, historical deficiencies, black list flags). Includes: practical abandon ship drill test, fire-fighter test, GMDSS radio equipment test, engine/deck log verification, emergency generator test. Longer and more comprehensive than standard inspection."},
    {q:"What is the PSC flag state Black List?",opts:["A piracy list","Classification of flag states by deficiency and detention rates of their vessels — grey and black flags = increased scrutiny","A list of dangerous ports","A list of prohibited cargo"],correct:1,expl:"PSC Black List = flag classification by vessel detention rate. Paris MOU: white list (good performance), grey list (under observation), black list (poor performance). Vessels under black list flag = inspected SYSTEMATICALLY at every PSC port call. Pressure on flag states to improve their standards."},
    {q:"What is the SAR (Search and Rescue) Convention 1979?",opts:["A convention on commercial operations","IMO convention organizing international maritime search and rescue cooperation — divides oceans into SAR zones","A convention on places of refuge","A convention on piracy"],correct:1,expl:"SAR Convention (Search and Rescue) 1979 = International Convention on Maritime Search and Rescue. Divides oceans into SAR zones each signatory country is responsible for. Each zone = a MRCC (Maritime Rescue Coordination Centre). Obliges vessels to render assistance to any person in distress. Complementary to SOLAS Chapter V."},
  ],
  es:[
    {q:"¿Qué es el 'procedimiento de enmienda tácita' de la OMI?",opts:["Un procedimiento administrativo interno","Método que permite enmendar SOLAS sin votación explícita — la enmienda entra en vigor salvo que un número determinado de estados se oponga","Un tipo de certificación","Un procedimiento de queja"],correct:1,expl:"Procedimiento de aceptación tácita = sistema que permite a la OMI adoptar enmiendas a SOLAS rápidamente. La enmienda se considera aceptada salvo que un número predefinido de estados se oponga en el plazo establecido. Permite una actualización continua de SOLAS sin demoras excesivas."},
    {q:"¿Qué es el VDR (Voyage Data Recorder) obligatorio según SOLAS?",opts:["Un registro de navegación en papel","Registrador de datos del viaje (caja negra marítima) — almacena las últimas 12 horas de datos de navegación, audio del puente, radar","Un sistema GPS avanzado","Un diario electrónico de a bordo"],correct:1,expl:"VDR = Voyage Data Recorder = 'caja negra' marítima. Obligatorio SOLAS Capítulo V para buques > 3.000 TB. Registra: posición GPS, rumbo, velocidad, datos de radar, comunicaciones VHF, audio del puente, alarmas. Conserva las últimas 12 horas. Permite analizar los accidentes."},
    {q:"¿Qué es el ECDIS (Sistema de Visualización de Cartas Electrónicas e Información)?",opts:["Un sistema de radar","Sistema de cartas electrónicas que sustituye a las cartas en papel — integra GPS, AIS, alarmas de seguridad, profundidades","Un AIS avanzado","Un sistema meteorológico"],correct:1,expl:"ECDIS = Sistema de Visualización de Cartas Electrónicas e Información. Obligatorio SOLAS (buques > 500 TB, progresivamente desde 2012). Muestra la carta electrónica ENC con posición GPS en tiempo real, datos AIS, alarmas de zona peligrosa, profundidades. Actualización semanal de cartas obligatoria. Debe tener copia de seguridad."},
    {q:"¿Cuál es la diferencia entre las clases de buque 'A' y 'B' en SOLAS Capítulo II-2?",opts:["El tamaño del buque","Clase A: mamparos resistentes al fuego 60 min · Clase B: resistentes 30 min — normas de resistencia al fuego diferentes","La nacionalidad del buque","La zona de navegación"],correct:1,expl:"Clasificación SOLAS para materiales resistentes al fuego: Clase A = mamparos que resisten el fuego 60 minutos + barrera de humos. Clase B = resistente al fuego 30 minutos. Clase C = materiales no combustibles. Aplicable especialmente a buques de pasaje."},
    {q:"¿Qué es el Certificado de Francobordo (Load Line Certificate)?",opts:["Un certificado ISM","Certificado que fija las marcas de francobordo (Plimsoll) — líneas máximas de carga según la temporada y la zona de navegación","Un certificado de estabilidad","Un certificado de navegación"],correct:1,expl:"Certificado de Francobordo = establecido según el Convenio de Líneas de Carga (1966). Determina las marcas Plimsoll en el casco: líneas máximas de carga según: temporada y zona geográfica. Obligatorio para buques > 24m en navegación internacional. Válido 5 años."},
    {q:"¿Qué es el STCW y cuál es su relación con SOLAS?",opts:["STCW = un anexo de SOLAS","Convenio independiente de la OMI (1978) sobre formación de gente de mar — complementario a SOLAS pero convenio separado","STCW = un capítulo de SOLAS","STCW = una recomendación no obligatoria"],correct:1,expl:"STCW = Normas de Formación, Titulación y Guardia para la Gente de Mar (1978, enmendado 1995 y 2010). Convenio OMI SEPARADO de SOLAS pero complementario. SOLAS = seguridad del buque, STCW = competencia de la tripulación. Ambos verificados en las inspecciones PSC."},
    {q:"¿Qué es el Convenio MLC 2006?",opts:["Un convenio sobre construcción naval","Convenio sobre el Trabajo Marítimo — derechos y condiciones de trabajo de la gente de mar: remuneración, descanso, repatriación, medicina","Un convenio sobre mercancías peligrosas","Un convenio de la OMI sobre la contaminación"],correct:1,expl:"MLC 2006 = Convenio sobre el Trabajo Marítimo. Adoptado por la OIT en 2006, en vigor desde 2013. Cubre: salario mínimo, horas de trabajo/descanso, condiciones de alojamiento, alimentación, medicina, repatriación, protección social. Complementa SOLAS/STCW/MARPOL. Verificado por PSC."},
    {q:"¿Qué es MARPOL y cuál es su relación con SOLAS?",opts:["MARPOL = parte de SOLAS","Convenio independiente de la OMI (1973/1978) sobre la prevención de la contaminación marina — separado de SOLAS pero también verificado por PSC","MARPOL = una recomendación no obligatoria","MARPOL = un convenio sobre náufragos"],correct:1,expl:"MARPOL = Contaminación MARina. Convenio OMI independiente (1973/78). 6 anexos: Hidrocarburos · Químicos · IMDG · Aguas residuales · Basuras · Atmósfera. No es parte de SOLAS pero verificado simultáneamente por PSC. Los 4 grandes convenios marítimos: SOLAS + MARPOL + STCW + MLC."},
    {q:"¿Qué es el COLREG?",opts:["La Convención sobre el Derecho del Mar","Reglamento Internacional para Prevenir los Abordajes en el Mar — 38 reglas sobre luces, señales y prioridades de paso","Un convenio sobre el trabajo marítimo","Un convenio sobre los puertos"],correct:1,expl:"COLREG = Convenio sobre el Reglamento Internacional para Prevenir los Abordajes en el Mar (1972). 38 reglas sobre: luces y marcas de navegación, señales sonoras y luminosas, prioridades de paso, comportamiento con visibilidad reducida, dispositivos de separación del tráfico. Obligatorio y verificado por PSC."},
    {q:"¿Qué es la CONVEMAR (Convención de las Naciones Unidas sobre el Derecho del Mar)?",opts:["Un convenio de la OMI","Constitución marítima mundial (1982) — define las zonas marítimas: aguas territoriales, ZEE, alta mar, plataforma continental","Un convenio sobre la pesca","Un convenio sobre puertos francos"],correct:1,expl:"CONVEMAR = Convención de las Naciones Unidas sobre el Derecho del Mar (1982, en vigor 1994). Constitución marítima mundial. Define: Mar territorial (12 millas), Zona contigua (24 millas), ZEE (200 millas), Plataforma continental, Alta mar (libertad de navegación). Marco legal fundamental para todos los demás convenios marítimos."},
    {q:"¿Qué es el Paris MOU (Memorándum de Entendimiento)?",opts:["Un acuerdo comercial entre armadores","Organización regional de PSC en Europa — coordina las inspecciones PSC de buques extranjeros en los puertos europeos","Un acuerdo fiscal marítimo","Una alianza de compañías marítimas"],correct:1,expl:"Paris MOU = acuerdo regional PSC para Europa y el Atlántico Norte. 27 estados miembros. Coordina las inspecciones PSC: base de datos común, lista negra de buques peligrosos, selección de buques a inspeccionar. Buques lista negra = inspeccionados en CADA escala en puertos PSC."},
    {q:"¿Qué es el Certificado de Arqueo (Tonnage Certificate)?",opts:["Un certificado de valor del buque","Certificado oficial que indica el Arqueo Bruto (GT) y Arqueo Neto (NT) — determina las tasas portuarias y las obligaciones SOLAS","Un certificado de flete","Un certificado de velocidad"],correct:1,expl:"Certificado de Arqueo = establecido según el Convenio de Arqueo (1969). Indica: GT (Arqueo Bruto = volumen total), NT (Arqueo Neto = volumen comercial). Importancia: determina derechos de puerto, tasas de paso (Canal de Suez/Panamá), y umbrales SOLAS (AIS obligatorio > 300 GT, ECDIS > 500 GT, ISM > 500 GT)."},
    {q:"¿Qué es la inspección 'ampliada' (enhanced) del PSC?",opts:["Una inspección anual obligatoria","Inspección PSC profunda para buques de alto riesgo — verificación de todos los sistemas de seguridad, simulacros prácticos, pruebas de equipos","Una inspección reservada a los cruceros","Una inspección solo para petroleros"],correct:1,expl:"Inspección ampliada = inspección PSC en profundidad. Obligatoria para buques de alto riesgo (viejos, muchas deficiencias históricas, pabellones lista negra). Incluye: prueba práctica de simulacro de abandono, prueba de bomberos, prueba de equipos radio SMSSM, verificación del diario de máquinas/cuaderno de bitácora, prueba del grupo de emergencia."},
    {q:"¿Qué es la lista negra de pabellones del PSC?",opts:["Una lista de piratas","Clasificación de los Estados de pabellón según la tasa de deficiencias y retenciones de sus buques — pabellones grises y negros = mayor vigilancia","Una lista de puertos peligrosos","Una lista de cargas prohibidas"],correct:1,expl:"Lista negra PSC = clasificación de pabellones según la tasa de retención de sus buques. Paris MOU: lista blanca (buen rendimiento), lista gris (bajo observación), lista negra (mal rendimiento). Buques bajo pabellón lista negra = inspeccionados SISTEMÁTICAMENTE en cada escala en puertos PSC."},
    {q:"¿Qué es el Convenio SAR (Búsqueda y Rescate) de 1979?",opts:["Un convenio sobre operaciones comerciales","Convenio OMI que organiza la cooperación internacional para la búsqueda y el rescate marítimos — divide los océanos en zonas SAR","Un convenio sobre los lugares de refugio","Un convenio sobre la piratería"],correct:1,expl:"Convenio SAR 1979 = Convenio Internacional sobre Búsqueda y Salvamento Marítimos. Divide los océanos en zonas SAR de las que cada país signatario es responsable. Cada zona = un MRCC (Centro de Coordinación de Rescate Marítimo). Obliga a los buques a prestar asistencia a toda persona en peligro. Complementario al SOLAS Capítulo V."},
  ],
  pt:[
    {q:"O que é o 'procedimento de emenda tácita' da IMO?",opts:["Um procedimento administrativo interno","Método que permite emendar o SOLAS sem votação explícita — a emenda entra em vigor salvo oposição de um número determinado de estados","Um tipo de certificação","Um procedimento de queixa"],correct:1,expl:"Procedimento de aceitação tácita = sistema que permite à IMO adotar emendas ao SOLAS rapidamente. A emenda é considerada aceite salvo se um número predefinido de estados se opuser no prazo estabelecido. Permite uma atualização contínua do SOLAS sem atrasos excessivos."},
    {q:"O que é o VDR (Voyage Data Recorder) obrigatório pelo SOLAS?",opts:["Um registo de navegação em papel","Registador de dados da viagem (caixa negra marítima) — armazena as últimas 12 horas de dados de navegação, áudio da ponte, radar","Um sistema GPS avançado","Um diário eletrónico de bordo"],correct:1,expl:"VDR = Voyage Data Recorder = 'caixa negra' marítima. Obrigatório SOLAS Capítulo V para navios > 3.000 AB. Regista: posição GPS, rumo, velocidade, dados radar, comunicações VHF, áudio ponte, alarmes. Armazena as últimas 12 horas. Permite analisar acidentes."},
    {q:"O que é o ECDIS (Sistema de Visualização de Cartas Eletrónicas e Informação)?",opts:["Um sistema de radar","Sistema de cartas eletrónicas que substitui as cartas em papel — integra GPS, AIS, alarmes de segurança, profundidades","Um AIS avançado","Um sistema meteorológico"],correct:1,expl:"ECDIS = Electronic Chart Display and Information System. Obrigatório SOLAS (navios > 500 AB, progressivamente desde 2012). Mostra a carta eletrónica ENC com posição GPS em tempo real, dados AIS, alarmes de zona perigosa, profundidades. Atualização semanal das cartas obrigatória. Deve ter cópia de segurança."},
    {q:"Qual é a diferença entre a classe de navio 'A' e 'B' no SOLAS Capítulo II-2?",opts:["O tamanho do navio","Classe A: anteparas resistentes ao fogo 60 min · Classe B: resistentes 30 min — diferentes normas de resistência ao fogo","A nacionalidade do navio","A zona de navegação"],correct:1,expl:"Classificação SOLAS para materiais resistentes ao fogo: Classe A = anteparas que resistem ao fogo 60 minutos + barreira de fumo. Classe B = resistente ao fogo 30 minutos. Classe C = materiais não combustíveis. Aplicável especialmente a navios de passageiros."},
    {q:"O que é o Certificado de Linha de Carga (Load Line Certificate)?",opts:["Um certificado ISM","Certificado que fixa as marcas de linha de carga (Plimsoll) — linhas máximas de carregamento por estação e zona de navegação","Um certificado de estabilidade","Um certificado de navegação"],correct:1,expl:"Certificado de Linha de Carga = estabelecido segundo a Convenção de Linhas de Carga (1966). Determina as marcas Plimsoll no casco: linhas máximas de carregamento por: estação e zona geográfica. Obrigatório para navios > 24m em navegação internacional. Válido 5 anos."},
    {q:"O que é o STCW e qual é a sua relação com o SOLAS?",opts:["STCW = um anexo do SOLAS","Convenção IMO separada (1978) sobre a formação dos marítimos — complementar ao SOLAS mas convenção separada","STCW = um capítulo do SOLAS","STCW = uma recomendação não obrigatória"],correct:1,expl:"STCW = Standards of Training, Certification and Watchkeeping for Seafarers (1978, emendado 1995 e 2010). Convenção IMO SEPARADA do SOLAS mas complementar. SOLAS = segurança do navio, STCW = competência da tripulação. Ambos verificados nas inspeções PSC."},
    {q:"O que é a Convenção MLC 2006?",opts:["Uma convenção sobre construção naval","Convenção do Trabalho Marítimo — direitos e condições de trabalho dos marítimos: remuneração, descanso, repatriação, medicina","Uma convenção sobre mercadorias perigosas","Uma convenção da IMO sobre poluição"],correct:1,expl:"MLC 2006 = Convenção do Trabalho Marítimo. Adotada pela OIT em 2006, em vigor desde 2013. Cobre: salário mínimo, horas trabalho/descanso, condições de alojamento, alimentação, medicina, repatriação, proteção social. Complementa SOLAS/STCW/MARPOL. Verificada pelo PSC."},
    {q:"O que é o MARPOL e qual é a sua relação com o SOLAS?",opts:["MARPOL = parte do SOLAS","Convenção IMO separada (1973/1978) sobre a prevenção da poluição marítima — separada do SOLAS mas também verificada pelo PSC","MARPOL = uma recomendação não obrigatória","MARPOL = uma convenção sobre náufragos"],correct:1,expl:"MARPOL = Poluição MARítima. Convenção IMO separada (1973/78). 6 anexos: Hidrocarbonetos · Químicos · IMDG · Águas residuais · Lixo · Atmosfera. Não é parte do SOLAS mas verificada simultaneamente pelo PSC. As 4 grandes convenções marítimas: SOLAS + MARPOL + STCW + MLC."},
    {q:"O que é o COLREG?",opts:["A Convenção do Direito do Mar","Regulamento Internacional para Prevenir Abalroamentos no Mar — 38 regras sobre luzes, sinais e prioridades de passagem","Uma convenção sobre trabalho marítimo","Uma convenção sobre portos"],correct:1,expl:"COLREG = Convenção sobre o Regulamento Internacional para Prevenir Abalroamentos no Mar (1972). 38 regras sobre: luzes e marcas de navegação, sinais sonoros e luminosos, prioridades de passagem, conduta em visibilidade reduzida, esquemas de separação de tráfego. Obrigatório e verificado pelo PSC."},
    {q:"O que é a UNCLOS (Convenção das Nações Unidas sobre o Direito do Mar)?",opts:["Uma convenção da IMO","Constituição marítima mundial (1982) — define as zonas marítimas: águas territoriais, ZEE, alto mar, plataforma continental","Uma convenção sobre a pesca","Uma convenção sobre portos francos"],correct:1,expl:"UNCLOS = Convenção das Nações Unidas sobre o Direito do Mar (1982, em vigor 1994). Constituição marítima mundial. Define: Mar territorial (12 milhas), Zona contígua (24 milhas), ZEE (200 milhas), Plataforma continental, Alto mar (liberdade de navegação). Quadro legal fundamental para todas as outras convenções marítimas."},
    {q:"O que é o Paris MOU (Memorando de Entendimento)?",opts:["Um acordo comercial entre armadores","Organização regional de PSC na Europa — coordena as inspeções PSC de navios estrangeiros nos portos europeus","Um acordo fiscal marítimo","Uma aliança de companhias marítimas"],correct:1,expl:"Paris MOU = acordo regional PSC para a Europa e Atlântico Norte. 27 estados membros. Coordena as inspeções PSC: base de dados comum, lista negra de navios perigosos, seleção de navios a inspecionar. Navios lista negra = inspecionados em CADA escala nos portos PSC."},
    {q:"O que é o Certificado de Arqueação (Tonnage Certificate)?",opts:["Um certificado de valor do navio","Certificado oficial que indica a Arqueação Bruta (GT) e Arqueação Líquida (NT) — determina as taxas portuárias e as obrigações SOLAS","Um certificado de frete","Um certificado de velocidade"],correct:1,expl:"Certificado de Arqueação = estabelecido segundo a Convenção de Arqueação (1969). Indica: GT (Arqueação Bruta = volume total), NT (Arqueação Líquida = volume comercial). Importância: determina direitos de porto, taxas de passagem (Canal Suez/Panamá), e limiares SOLAS (AIS obrigatório > 300 GT, ECDIS > 500 GT, ISM > 500 GT)."},
    {q:"O que é uma inspeção PSC 'reforçada' (enhanced)?",opts:["Uma inspeção anual obrigatória","Inspeção PSC aprofundada para navios de alto risco — verificação de todos os sistemas de segurança, exercícios práticos, testes de equipamentos","Uma inspeção reservada a cruzeiros","Uma inspeção apenas para petroleiros"],correct:1,expl:"Inspeção reforçada = inspeção PSC aprofundada. Obrigatória para navios de alto risco (antigos, muitas deficiências históricas, bandeiras lista negra). Inclui: teste prático de exercício de abandono, teste de bombeiros, teste de equipamentos rádio GMDSS, verificação do diário de máquinas/bordo, teste do grupo de emergência."},
    {q:"O que é a lista negra de bandeiras do PSC?",opts:["Uma lista de piratas","Classificação dos Estados de bandeira segundo a taxa de deficiências e retenções dos seus navios — bandeiras cinzentas e negras = maior vigilância","Uma lista de portos perigosos","Uma lista de cargas proibidas"],correct:1,expl:"Lista negra PSC = classificação de bandeiras segundo a taxa de retenção dos seus navios. Paris MOU: lista branca (bom desempenho), lista cinzenta (sob observação), lista negra (mau desempenho). Navios sob bandeira lista negra = inspecionados SISTEMATICAMENTE em cada escala nos portos PSC."},
    {q:"O que é a Convenção SAR (Busca e Salvamento) de 1979?",opts:["Uma convenção sobre operações comerciais","Convenção IMO que organiza a cooperação internacional para a busca e salvamento marítimos — divide os oceanos em zonas SAR","Uma convenção sobre locais de refúgio","Uma convenção sobre pirataria"],correct:1,expl:"Convenção SAR 1979 = Convenção Internacional sobre Busca e Salvamento Marítimos. Divide os oceanos em zonas SAR pelas quais cada país signatário é responsável. Cada zona = um MRCC (Centro de Coordenação de Resgate Marítimo). Obriga os navios a prestar assistência a qualquer pessoa em perigo. Complementar ao SOLAS Capítulo V."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.blue2},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.blue2},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
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
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue2},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d = {
    fr:{
      badge:"⚖️ Droit Maritime Int. · Leçon 1/10 · ⭐ Premium · 200 XP",
      title:"SOLAS — La Convention Fondamentale de la Sécurité Maritime",
      intro:"Chaque règle de SOLAS est écrite avec le sang des marins. Du Titanic en 1912 à l'Estonia en 1994, chaque catastrophe maritime a renforcé cette convention fondamentale.\n\nCette leçon couvre l'histoire de SOLAS, ses chapitres principaux, les certificats obligatoires et les inspections PSC.",
      p1:"PARTIE 1 — HISTOIRE DE SOLAS",s1t:"De Titanic (1912) à aujourd'hui",
      s1:"SOLAS = Safety Of Life At Sea\nConvention de l'OMI (Organisation Maritime Internationale)\n\nPOURQUOI SOLAS EXISTE :\n→ Titanic 1912 = 1 496 morts → SOLAS 1914\n→ Chaque catastrophe maritime améliore les règles\n→ Procédure d'amendement TACITE = mise à jour continue\n\nFAITS CLÉS :\nAdoptée : 1er novembre 1974 à Londres\nEn vigueur : 25 mai 1980\nÉtats membres : 163 (+ de 98% du tonnage mondial)\nLangues officielles : FR · EN · ES · AR · RU · ZH",
      p2:"PARTIE 2 — CHAPITRES SOLAS",s2t:"De la construction (Ch.I) à la sûreté (Ch.XI-2)",
      s2:"8 CHAPITRES CLÉS :\nI   = Dispositions générales · PSC · Certificats\nII-1 = Construction · Stabilité · Machines · Électricité\nII-2 = Prévention incendie · Sprinklers · CO2\nIII  = Engins sauvetage · Canots · EPIRB · SART\nIV   = Radio · GMDSS · VHF · Navtex\nV    = Sécurité navigation · AIS · VDR · ECDIS\nIX   = Code ISM · SMS · DOC · SMC\nXI-2 = Code ISPS · Sûreté maritime (post 9/11)",
      p3:"PARTIE 3 — CERTIFICATS SOLAS",s3t:"6 certificats obligatoires · validité · contenu",
      s3:"CERTIFICATS PRINCIPAUX (5 ans chacun) :\nSafety Certificate → construction + machines + équipements\nLSA Certificate → canots · radeaux · gilets · EPIRB · SART\nRadio Certificate → GMDSS complet\nISPS Certificate → plan sûreté · niveaux 1/2/3\nDOC → compagnie · Code ISM conforme\nSMC → navire · SMS appliqué à bord\n\n⚠️ Sans un seul certificat valide :\n→ Navire immobilisé par le PSC\n→ Pas d'autorisation d'appareiller",
      p4:"PARTIE 4 — INSPECTION PSC",s4t:"Simulateur d'inspection Port State Control",
      s4:"PSC = Port State Control\nDroit d'inspection des navires étrangers dans les ports\n\nCE QUE VÉRIFIE LE PSC :\n✓ SOLAS (sécurité navire)\n✓ MARPOL (environnement)\n✓ STCW (compétences équipage)\n✓ MLC (conditions de travail)\n\nDÉFICIENCES :\nMineure → correction à bord\nGrave → navire immobilisé jusqu'à correction\n3 déficiences graves = détention garantie\n\nPARIS MOU : 27 États · Europe + Atlantique Nord",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — SOLAS L1 DROIT MARITIME",
      sumP:["SOLAS 1974 — en vigueur depuis le 25 mai 1980","163 États membres — 98%+ du tonnage mondial","Titanic 1912 = catalyseur — chaque accident améliore SOLAS","Chapitre IX = Code ISM · DOC (compagnie) + SMC (navire)","Chapitre XI-2 = Code ISPS (sûreté) depuis le 1er juillet 2004","PSC = inspection navires étrangers : SOLAS + MARPOL + STCW + MLC","6 certificats obligatoires · validité 5 ans chacun","Paris MOU = organisation PSC européenne · 27 États"],
      learnedP:["SOLAS 1974 · histoire Titanic → aujourd'hui","Chapitres I, II-1, II-2, III, IV, V, IX, XI-2","6 certificats obligatoires · PSC inspection","DOC compagnie + SMC navire = Code ISM","ISPS sûreté 3 niveaux · PSC 4 conventions"],
    },
    en:{
      badge:"⚖️ Int. Maritime Law · Lesson 1/10 · ⭐ Premium · 200 XP",
      title:"SOLAS — The Fundamental Maritime Safety Convention",
      intro:"Every SOLAS rule is written in mariners' blood. From the Titanic in 1912 to the Estonia in 1994, each maritime disaster has strengthened this fundamental convention.\n\nThis lesson covers SOLAS history, its main chapters, mandatory certificates and PSC inspections.",
      p1:"PART 1 — SOLAS HISTORY",s1t:"From Titanic (1912) to today",
      s1:"SOLAS = Safety Of Life At Sea\nIMO (International Maritime Organization) convention\n\nWHY SOLAS EXISTS:\n→ Titanic 1912 = 1,496 deaths → SOLAS 1914\n→ Each maritime disaster improves the rules\n→ TACIT amendment procedure = continuous update\n\nKEY FACTS:\nAdopted: November 1, 1974 in London\nIn force: May 25, 1980\nMember states: 163 (98%+ of world tonnage)\nOfficial languages: FR · EN · ES · AR · RU · ZH",
      p2:"PART 2 — SOLAS CHAPTERS",s2t:"From construction (Ch.I) to security (Ch.XI-2)",
      s2:"8 KEY CHAPTERS:\nI   = General provisions · PSC · Certificates\nII-1 = Construction · Stability · Machinery · Electrical\nII-2 = Fire protection · Sprinklers · CO2\nIII  = Life saving · Lifeboats · EPIRB · SART\nIV   = Radio · GMDSS · VHF · Navtex\nV    = Navigation safety · AIS · VDR · ECDIS\nIX   = ISM Code · SMS · DOC · SMC\nXI-2 = ISPS Code · Maritime security (post 9/11)",
      p3:"PART 3 — SOLAS CERTIFICATES",s3t:"6 mandatory certificates · validity · content",
      s3:"MAIN CERTIFICATES (5 years each):\nSafety Certificate → construction + machinery + equipment\nLSA Certificate → lifeboats · liferafts · jackets · EPIRB · SART\nRadio Certificate → full GMDSS\nISPS Certificate → security plan · levels 1/2/3\nDOC → company · ISM Code compliant\nSMC → vessel · SMS applied on board\n\n⚠️ Without any single valid certificate:\n→ Vessel detained by PSC\n→ No departure authorization",
      p4:"PART 4 — PSC INSPECTION",s4t:"Port State Control inspection simulator",
      s4:"PSC = Port State Control\nRight to inspect foreign vessels in ports\n\nWHAT PSC CHECKS:\n✓ SOLAS (vessel safety)\n✓ MARPOL (environment)\n✓ STCW (crew competence)\n✓ MLC (working conditions)\n\nDEFICIENCIES:\nMinor → correction on board\nSerious → vessel detained until corrected\n3 serious deficiencies = guaranteed detention\n\nPARIS MOU: 27 states · Europe + North Atlantic",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — SOLAS L1 MARITIME LAW",
      sumP:["SOLAS 1974 — in force since May 25, 1980","163 member states — 98%+ world tonnage","Titanic 1912 = catalyst — each accident improves SOLAS","Chapter IX = ISM Code · DOC (company) + SMC (vessel)","Chapter XI-2 = ISPS Code (security) since July 1, 2004","PSC = foreign vessel inspections: SOLAS + MARPOL + STCW + MLC","6 mandatory certificates · 5-year validity each","Paris MOU = European PSC organization · 27 states"],
      learnedP:["SOLAS 1974 · history Titanic → today","Chapters I, II-1, II-2, III, IV, V, IX, XI-2","6 mandatory certificates · PSC inspection","DOC company + SMC vessel = ISM Code","ISPS security 3 levels · PSC 4 conventions"],
    },
    es:{
      badge:"⚖️ Derecho Marítimo Int. · Lección 1/10 · ⭐ Premium · 200 XP",
      title:"SOLAS — El Convenio Fundamental de la Seguridad Marítima",
      intro:"Cada regla del SOLAS está escrita con la sangre de los marineros. Del Titanic en 1912 al Estonia en 1994, cada catástrofe marítima ha reforzado este convenio fundamental.",
      p1:"PARTE 1 — HISTORIA DE SOLAS",s1t:"Del Titanic (1912) hasta hoy",
      s1:"SOLAS = Safety Of Life At Sea\nConvenio de la OMI\n\nHECHOS CLAVE:\nAdoptado: 1 de noviembre de 1974 en Londres\nEn vigor: 25 de mayo de 1980\nEstados miembros: 163 (+98% tonelaje mundial)",
      p2:"PARTE 2 — CAPÍTULOS SOLAS",s2t:"De la construcción (Cap.I) a la protección (Cap.XI-2)",
      s2:"8 CAPÍTULOS CLAVE:\nI=Disposiciones generales·PSC·Certificados\nII-1=Construcción·Estabilidad·Máquinas\nII-2=Prevención incendios·Sprinklers·CO2\nIII=Salvamento·Botes·EPIRB·SART\nIV=Radio·SMSSM·VHF·Navtex\nV=Seguridad navegación·AIS·VDR·ECDIS\nIX=Código ISM·SMS·DOC·CertGS\nXI-2=Código PBIP·Protección marítima",
      p3:"PARTE 3 — CERTIFICADOS SOLAS",s3t:"6 certificados obligatorios · validez · contenido",
      s3:"CERTIFICADOS PRINCIPALES (5 años cada uno):\nCertificado de Seguridad · LSE · Radio · PBIP · DOC · CertGS\n⚠️ Sin un solo certificado válido: buque retenido",
      p4:"PARTE 4 — INSPECCIÓN PSC",s4t:"Simulador de inspección PSC",
      s4:"PSC verifica: SOLAS + MARPOL + STCW + MLC\n3 deficiencias graves = retención garantizada\nParis MOU: 27 estados · Europa + Atlántico Norte",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — SOLAS L1 DERECHO MARÍTIMO",
      sumP:["SOLAS 1974 — en vigor desde el 25 de mayo de 1980","163 estados miembros — +98% tonelaje mundial","Titanic 1912 = catalizador — cada accidente mejora SOLAS","Capítulo IX = Código ISM · DOC (compañía) + CertGS (buque)","Capítulo XI-2 = Código PBIP (protección) desde el 1 de julio de 2004","PSC inspecciona: SOLAS + MARPOL + STCW + MLC","6 certificados obligatorios · validez 5 años"],
      learnedP:["SOLAS 1974 · historia Titanic → hoy","Capítulos I, II-1, II-2, III, IV, V, IX, XI-2","6 certificados obligatorios · inspección PSC","DOC compañía + CertGS buque = Código ISM","PBIP protección 3 niveles · PSC 4 convenios"],
    },
    pt:{
      badge:"⚖️ Direito Marítimo Int. · Lição 1/10 · ⭐ Premium · 200 XP",
      title:"SOLAS — A Convenção Fundamental da Segurança Marítima",
      intro:"Cada regra do SOLAS está escrita com o sangue dos marinheiros. Do Titanic em 1912 ao Estonia em 1994, cada catástrofe marítima reforçou esta convenção fundamental.",
      p1:"PARTE 1 — HISTÓRIA DO SOLAS",s1t:"Do Titanic (1912) até hoje",
      s1:"SOLAS = Safety Of Life At Sea\nConvenção da IMO\n\nFACTOS CHAVE:\nAdotado: 1 de novembro de 1974 em Londres\nEm vigor: 25 de maio de 1980\nEstados membros: 163 (+98% tonelagem mundial)",
      p2:"PARTE 2 — CAPÍTULOS SOLAS",s2t:"Da construção (Cap.I) à proteção (Cap.XI-2)",
      s2:"8 CAPÍTULOS CHAVE:\nI=Disposições gerais·PSC·Certificados\nII-1=Construção·Estabilidade·Máquinas\nII-2=Prevenção incêndios·Sprinklers·CO2\nIII=Salvamento·Botes·EPIRB·SART\nIV=Rádio·GMDSS·VHF·Navtex\nV=Segurança navegação·AIS·VDR·ECDIS\nIX=Código ISM·SMS·DOC·SMC\nXI-2=Código ISPS·Proteção marítima",
      p3:"PARTE 3 — CERTIFICADOS SOLAS",s3t:"6 certificados obrigatórios · validade · conteúdo",
      s3:"CERTIFICADOS PRINCIPAIS (5 anos cada):\nCertificado de Segurança · LSA · Rádio · ISPS · DOC · SMC\n⚠️ Sem um único certificado válido: navio retido",
      p4:"PARTE 4 — INSPEÇÃO PSC",s4t:"Simulador de inspeção PSC",
      s4:"PSC verifica: SOLAS + MARPOL + STCW + MLC\n3 deficiências graves = retenção garantida\nParis MOU: 27 estados · Europa + Atlântico Norte",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — SOLAS L1 DIREITO MARÍTIMO",
      sumP:["SOLAS 1974 — em vigor desde 25 de maio de 1980","163 estados membros — +98% tonelagem mundial","Titanic 1912 = catalisador — cada acidente melhora SOLAS","Capítulo IX = Código ISM · DOC (companhia) + SMC (navio)","Capítulo XI-2 = Código ISPS (proteção) desde 1 de julho de 2004","PSC inspeciona: SOLAS + MARPOL + STCW + MLC","6 certificados obrigatórios · validade 5 anos"],
      learnedP:["SOLAS 1974 · história Titanic → hoje","Capítulos I, II-1, II-2, III, IV, V, IX, XI-2","6 certificados obrigatórios · inspeção PSC","DOC companhia + SMC navio = Código ISM","ISPS proteção 3 níveis · PSC 4 convenções"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonSOLAS({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#050a1a 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.blue2}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.blue2,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚖️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/10":lang==="en"?"Lesson 1/10":lang==="es"?"Lección 1/10":"Lição 1/10"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,transition:"width 0.5s ease"}}/>
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
            <SL icon="📅" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📅 {lang==="fr"?"TIMELINE SOLAS — INTERACTIF":lang==="en"?"SOLAS TIMELINE — INTERACTIVE":lang==="es"?"CRONOLOGÍA SOLAS — INTERACTIVO":"CRONOLOGIA SOLAS — INTERATIVO"}</div>
              <SOLASTimelineSVG lang={lang}/>
            </Card>
            <SL icon="📋" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📋 {lang==="fr"?"CHAPITRES SOLAS — INTERACTIF":lang==="en"?"SOLAS CHAPTERS — INTERACTIVE":lang==="es"?"CAPÍTULOS SOLAS — INTERACTIVO":"CAPÍTULOS SOLAS — INTERATIVO"}</div>
              <SOLASChaptersSVG lang={lang}/>
            </Card>
            <SL icon="📜" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📜 {lang==="fr"?"CERTIFICATS SOLAS — INTERACTIF":lang==="en"?"SOLAS CERTIFICATES — INTERACTIVE":lang==="es"?"CERTIFICADOS SOLAS — INTERACTIVO":"CERTIFICADOS SOLAS — INTERATIVO"}</div>
              <CertificatesSVG lang={lang}/>
            </Card>
            <SL icon="🔍" text={lc.p4} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔍 {lang==="fr"?"SIMULATION INSPECTION PSC":lang==="en"?"PSC INSPECTION SIMULATION":lang==="es"?"SIMULACIÓN INSPECCIÓN PSC":"SIMULAÇÃO INSPEÇÃO PSC"}</div>
              <PSCSimulatorSVG lang={lang}/>
            </Card>
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
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — SOLAS</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 1":lang==="en"?"Lesson 1":lang==="es"?"Lección 1":"Lição 1"}</div>
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
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 2 — MARPOL & ENVIRONNEMENT →":lang==="en"?"LESSON 2 — MARPOL & ENVIRONMENT →":lang==="es"?"LECCIÓN 2 — MARPOL & MEDIO AMBIENTE →":"LIÇÃO 2 — MARPOL & AMBIENTE →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
