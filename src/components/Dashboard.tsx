// @ts-nocheck
import { useState, useEffect } from "react";
import AdminPanel, { UpgradeModal, PremiumManager } from "./AdminPanel";
import { LEXICON } from "./LexiqueMaritime";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22",
  teal:"#0a8a6c", purple:"#8e44ad",
  free:"#1e8a4a", premium:"#c9922a", premiumPlus:"#8e44ad",
};

// ══════════════════════════════════════════════
//  PLAN SYSTEM
// ══════════════════════════════════════════════
const PLANS = {
  free:    { key:"free",    icon:"🆓", color:C.free,    price:"0$",  next:"premium" },
  premium: { key:"premium", icon:"⭐", color:C.premium, price:"9$/mois", next:"premium_plus" },
  premium_plus:{ key:"premium_plus", icon:"👑", color:C.purple, price:"25$/mois", next:null },
};

const canAccess = (_userPlan, _moduleAccess) => {
  return true;
};

// ══════════════════════════════════════════════
//  TRANSLATIONS
// ══════════════════════════════════════════════
const T = {
  fr:{
    greeting_morning:"Bonjour", greeting_afternoon:"Bon après-midi",
    greeting_evening:"Bonsoir", greeting_night:"Bonne nuit",
    slogan:"La formation maritime complète — pont et machine",
    yourProgress:"TA PROGRESSION", quickStats:"STATS RAPIDES",
    statLessons:"Leçons", statCerts:"Certificats",
    statPoints:"Points", statStreak:"Série",
    tabDeck:"🧭 Pont", tabEngine:"⚙️ Machine",
    tabSafety:"🛟 Sécurité", tabTools:"🔧 Outils",
    locked:"🔒 Verrouillé", available:"Disponible",
    inProgress:"En cours", completed:"Terminé ✓", upcoming:"À venir",
    startBtn:"COMMENCER", continueBtn:"CONTINUER", completedBtn:"REVOIR",
    xp:"XP", lessons:"leçons",
    viewStatus:"Voir ma carte statut", editProfile:"Modifier mon profil",
    comingSoon:"Bientôt disponible", globalProgress:"Progression globale",
    planFree:"Gratuit", planPremium:"Premium", planPremiumPlus:"Premium+",
    planBadgeFree:"🆓 GRATUIT", planBadgePremium:"⭐ PREMIUM",
    planBadgePremiumPlus:"👑 PREMIUM+",
    unlockTitle:"Débloquer ce module",
    unlockPremium:"⭐ Passer à Premium",
    unlockPremiumPlus:"👑 Passer à Premium+",
    unlockDesc:"Tout Premium dès le lancement · Paiement sécurisé Stripe",
    unlockSoon:"Disponible au lancement de la version payante",
    unlockClose:"Fermer",
    freeLessons:"leçons gratuites",
    yourPlan:"TON PLAN",
    upgradeBtn:"PASSER AU PREMIUM →",
    navHome:"Accueil", navModules:"Modules",
    navShips:"Navires", navProfile:"Profil",
    continueLesson:"▶ CONTINUER",
    nextLesson:"Prochaine leçon",
    moduleComplete:"Module complet ✓",
    freeTag:"Gratuit",
    premiumTag:"Premium",
    premiumPlusTag:"Premium+",
    accessFree:"Accès libre",
    accessPremium:"Accès Premium requis",
    accessPremiumPlus:"Accès Premium+ requis",
  },
  en:{
    greeting_morning:"Good morning", greeting_afternoon:"Good afternoon",
    greeting_evening:"Good evening", greeting_night:"Good night",
    slogan:"Complete maritime training — deck and engine",
    yourProgress:"YOUR PROGRESS", quickStats:"QUICK STATS",
    statLessons:"Lessons", statCerts:"Certificates",
    statPoints:"Points", statStreak:"Streak",
    tabDeck:"🧭 Deck", tabEngine:"⚙️ Engine",
    tabSafety:"🛟 Safety", tabTools:"🔧 Tools",
    locked:"🔒 Locked", available:"Available",
    inProgress:"In progress", completed:"Completed ✓", upcoming:"Upcoming",
    startBtn:"START", continueBtn:"CONTINUE", completedBtn:"REVIEW",
    xp:"XP", lessons:"lessons",
    viewStatus:"View my status card", editProfile:"Edit my profile",
    comingSoon:"Coming soon", globalProgress:"Global progress",
    planFree:"Free", planPremium:"Premium", planPremiumPlus:"Premium+",
    planBadgeFree:"🆓 FREE", planBadgePremium:"⭐ PREMIUM",
    planBadgePremiumPlus:"👑 PREMIUM+",
    unlockTitle:"Unlock this module",
    unlockPremium:"⭐ Upgrade to Premium",
    unlockPremiumPlus:"👑 Upgrade to Premium+",
    unlockDesc:"Full Premium from launch · Secure Stripe payment",
    unlockSoon:"Available at paid version launch",
    unlockClose:"Close",
    freeLessons:"free lessons",
    yourPlan:"YOUR PLAN",
    upgradeBtn:"UPGRADE TO PREMIUM →",
    navHome:"Home", navModules:"Modules",
    navShips:"Ships", navProfile:"Profile",
    continueLesson:"▶ CONTINUE",
    nextLesson:"Next lesson",
    moduleComplete:"Module complete ✓",
    freeTag:"Free",
    premiumTag:"Premium",
    premiumPlusTag:"Premium+",
    accessFree:"Free access",
    accessPremium:"Premium access required",
    accessPremiumPlus:"Premium+ access required",
  },
  es:{
    greeting_morning:"Buenos días", greeting_afternoon:"Buenas tardes",
    greeting_evening:"Buenas noches", greeting_night:"Buenas noches",
    slogan:"Formación marítima completa — puente y máquinas",
    yourProgress:"TU PROGRESO", quickStats:"ESTADÍSTICAS",
    statLessons:"Lecciones", statCerts:"Certificados",
    statPoints:"Puntos", statStreak:"Racha",
    tabDeck:"🧭 Puente", tabEngine:"⚙️ Máquinas",
    tabSafety:"🛟 Seguridad", tabTools:"🔧 Herramientas",
    locked:"🔒 Bloqueado", available:"Disponible",
    inProgress:"En progreso", completed:"Completado ✓", upcoming:"Próximo",
    startBtn:"EMPEZAR", continueBtn:"CONTINUAR", completedBtn:"REPASAR",
    xp:"XP", lessons:"lecciones",
    viewStatus:"Ver mi tarjeta", editProfile:"Editar mi perfil",
    comingSoon:"Próximamente", globalProgress:"Progreso global",
    planFree:"Gratis", planPremium:"Premium", planPremiumPlus:"Premium+",
    planBadgeFree:"🆓 GRATIS", planBadgePremium:"⭐ PREMIUM",
    planBadgePremiumPlus:"👑 PREMIUM+",
    unlockTitle:"Desbloquear este módulo",
    unlockPremium:"⭐ Pasar a Premium",
    unlockPremiumPlus:"👑 Pasar a Premium+",
    unlockDesc:"Todo Premium desde el lanzamiento · Pago seguro Stripe",
    unlockSoon:"Disponible en el lanzamiento de la versión de pago",
    unlockClose:"Cerrar",
    freeLessons:"lecciones gratuitas",
    yourPlan:"TU PLAN",
    upgradeBtn:"PASAR A PREMIUM →",
    navHome:"Inicio", navModules:"Módulos",
    navShips:"Barcos", navProfile:"Perfil",
    continueLesson:"▶ CONTINUAR",
    nextLesson:"Próxima lección",
    moduleComplete:"Módulo completo ✓",
    freeTag:"Gratis", premiumTag:"Premium", premiumPlusTag:"Premium+",
    accessFree:"Acceso libre",
    accessPremium:"Se requiere Premium",
    accessPremiumPlus:"Se requiere Premium+",
  },
  pt:{
    greeting_morning:"Bom dia", greeting_afternoon:"Boa tarde",
    greeting_evening:"Boa noite", greeting_night:"Boa noite",
    slogan:"Formação marítima completa — convés e máquinas",
    yourProgress:"SEU PROGRESSO", quickStats:"ESTATÍSTICAS",
    statLessons:"Lições", statCerts:"Certificados",
    statPoints:"Pontos", statStreak:"Sequência",
    tabDeck:"🧭 Convés", tabEngine:"⚙️ Máquinas",
    tabSafety:"🛟 Segurança", tabTools:"🔧 Ferramentas",
    locked:"🔒 Bloqueado", available:"Disponível",
    inProgress:"Em andamento", completed:"Concluído ✓", upcoming:"Próximo",
    startBtn:"COMEÇAR", continueBtn:"CONTINUAR", completedBtn:"REVISAR",
    xp:"XP", lessons:"lições",
    viewStatus:"Ver meu cartão", editProfile:"Editar meu perfil",
    comingSoon:"Em breve", globalProgress:"Progresso global",
    planFree:"Grátis", planPremium:"Premium", planPremiumPlus:"Premium+",
    planBadgeFree:"🆓 GRÁTIS", planBadgePremium:"⭐ PREMIUM",
    planBadgePremiumPlus:"👑 PREMIUM+",
    unlockTitle:"Desbloquear este módulo",
    unlockPremium:"⭐ Mudar para Premium",
    unlockPremiumPlus:"👑 Mudar para Premium+",
    unlockDesc:"Todo Premium desde o lançamento · Pagamento seguro Stripe",
    unlockSoon:"Disponível no lançamento da versão paga",
    unlockClose:"Fechar",
    freeLessons:"lições gratuitas",
    yourPlan:"SEU PLANO",
    upgradeBtn:"MUDAR PARA PREMIUM →",
    navHome:"Início", navModules:"Módulos",
    navShips:"Navios", navProfile:"Perfil",
    continueLesson:"▶ CONTINUAR",
    nextLesson:"Próxima lição",
    moduleComplete:"Módulo completo ✓",
    freeTag:"Grátis", premiumTag:"Premium", premiumPlusTag:"Premium+",
    accessFree:"Acesso livre",
    accessPremium:"Acesso Premium necessário",
    accessPremiumPlus:"Acesso Premium+ necessário",
  },
};

// ══════════════════════════════════════════════
//  MODULES DATA
// ══════════════════════════════════════════════
export const MODULES = {
  deck:[
    { id:"d1", icon:"🧭", color:C.blue2, access:"free",
      freeLessons:2, totalLessons:10,
      title:{fr:"Navigation & Cartographie",en:"Navigation & Cartography",es:"Navegación & Cartografía",pt:"Navegação & Cartografia"},
      desc:{fr:"Histoire, instruments, cartes, COLREG",en:"History, instruments, charts, COLREG",es:"Historia, instrumentos, cartas, COLREG",pt:"História, instrumentos, cartas, COLREG"},
      xp:400, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"Histoire & Instruments",en:"History & Instruments",es:"Historia & Instrumentos",pt:"História & Instrumentos"},access:"free",status:"available"},
        {id:"l2",title:{fr:"Le Navire",en:"The Ship",es:"El Buque",pt:"O Navio"},access:"free",status:"locked"},
        {id:"l3",title:{fr:"La Terre & Coordonnées",en:"Earth & Coordinates",es:"La Tierra & Coordenadas",pt:"A Terra & Coordenadas"},access:"premium",status:"locked"},
        {id:"l4",title:{fr:"La Carte Marine",en:"The Nautical Chart",es:"La Carta Náutica",pt:"A Carta Náutica"},access:"premium",status:"locked"},
        {id:"l5",title:{fr:"Le Compas & Les Caps",en:"Compass & Headings",es:"La Brújula & Los Rumbos",pt:"A Bússola & Os Rumos"},access:"premium",status:"available"},
        {id:"l6",title:{fr:"Navigation Pratique",en:"Practical Navigation",es:"Navegación Práctica",pt:"Navegação Prática"},access:"premium",status:"locked"},
        {id:"l7",title:{fr:"Les Marées",en:"Tides",es:"Las Mareas",pt:"As Marés"},access:"premium",status:"locked"},
        {id:"l8",title:{fr:"COLREG Avancé",en:"Advanced COLREG",es:"COLREG Avanzado",pt:"COLREG Avançado"},access:"premium",status:"locked"},
        {id:"l9",title:{fr:"Ordres de Barre",en:"Steering & Helm Orders",es:"Órdenes de Timón",pt:"Ordens de Leme"},access:"premium",status:"locked"},
        {id:"l10",title:{fr:"Organisation du Quart",en:"Watchkeeping Organization",es:"Organización de la Guardia",pt:"Organização do Quarto"},access:"premium",status:"locked"},
      ]
    },
    { id:"d2", icon:"⚖️", color:C.gold, access:"premium",
      freeLessons:0, totalLessons:19,
      title:{fr:"Droit Maritime International",en:"International Maritime Law",es:"Derecho Marítimo Internacional",pt:"Direito Marítimo Internacional"},
      desc:{fr:"SOLAS, MARPOL, MLC 2006, STCW",en:"SOLAS, MARPOL, MLC 2006, STCW",es:"SOLAS, MARPOL, MLC 2006, STCW",pt:"SOLAS, MARPOL, MLC 2006, STCW"},
      xp:500, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"SOLAS",en:"SOLAS",es:"SOLAS",pt:"SOLAS"},access:"premium",status:"available"},
        {id:"l2",title:{fr:"MARPOL — Law & Sanctions",en:"MARPOL — Law & Sanctions",es:"MARPOL — Law & Sanctions",pt:"MARPOL — Law & Sanctions"},access:"premium",status:"available"},
        {id:"l3",title:{fr:"STCW",en:"STCW",es:"STCW",pt:"STCW"},access:"premium",status:"available"},
        {id:"l4",title:{fr:"MLC 2006",en:"MLC 2006",es:"MLC 2006",pt:"MLC 2006"},access:"premium",status:"available"},
        {id:"l5",title:{fr:"COLREG — Collision Law",en:"COLREG — Collision Law",es:"COLREG — Collision Law",pt:"COLREG — Collision Law"},access:"premium",status:"available"},
        {id:"l6",title:{fr:"UNCLOS",en:"UNCLOS",es:"UNCLOS",pt:"UNCLOS"},access:"premium",status:"available"},
        {id:"l7",title:{fr:"Liability & Insurance",en:"Liability & Insurance",es:"Liability & Insurance",pt:"Liability & Insurance"},access:"premium",status:"available"},
        {id:"l8",title:{fr:"Ports & Flag States",en:"Ports & Flag States",es:"Ports & Flag States",pt:"Ports & Flag States"},access:"premium",status:"available"},
        {id:"l9",title:{fr:"Piracy & Security",en:"Piracy & Security",es:"Piracy & Security",pt:"Piracy & Security"},access:"premium",status:"available"},
        {id:"l10",title:{fr:"Arbitration & Disputes",en:"Arbitration & Disputes",es:"Arbitration & Disputes",pt:"Arbitration & Disputes"},access:"premium",status:"available"},
      ]
    },
    { id:"d3", icon:"🗺️", color:C.teal, access:"premium",
      freeLessons:0, totalLessons:14,
      title:{fr:"Signalisation & Balisage",en:"Signaling & Buoyage",es:"Señalización & Balizamiento",pt:"Sinalização & Balizamento"},
      desc:{fr:"AISM, pavillons, Morse, SMCP",en:"IALA, flags, Morse, SMCP",es:"IALA, banderas, Morse, SMCP",pt:"IALA, bandeiras, Morse, SMCP"},
      xp:350, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"IALA Buoyage System",en:"IALA Buoyage System",es:"IALA Buoyage System",pt:"IALA Buoyage System"},access:"premium",status:"available"},
        {id:"l2",title:{fr:"Lights & Shapes",en:"Lights & Shapes",es:"Lights & Shapes",pt:"Lights & Shapes"},access:"premium",status:"available"},
        {id:"l3",title:{fr:"Sound Signals & Fog",en:"Sound Signals & Fog",es:"Sound Signals & Fog",pt:"Sound Signals & Fog"},access:"premium",status:"available"},
        {id:"l4",title:{fr:"Maritime Flags & Communication",en:"Maritime Flags & Communication",es:"Maritime Flags & Communication",pt:"Maritime Flags & Communication"},access:"premium",status:"available"},
        {id:"l5",title:{fr:"VHF Radio Procedures",en:"VHF Radio Procedures",es:"VHF Radio Procedures",pt:"VHF Radio Procedures"},access:"premium",status:"available"},
        {id:"l6",title:{fr:"AIS & Electronic Navigation",en:"AIS & Electronic Navigation",es:"AIS & Electronic Navigation",pt:"AIS & Electronic Navigation"},access:"premium",status:"available"},
        {id:"l7",title:{fr:"GMDSS & Distress Signals",en:"GMDSS & Distress Signals",es:"GMDSS & Distress Signals",pt:"GMDSS & Distress Signals"},access:"premium",status:"available"},
      ]
    },
    { id:"d4", icon:"📡", color:"#9b59b6", access:"premium",
      freeLessons:0, totalLessons:11,
      title:{fr:"Anglais Maritime SMCP",en:"Maritime English SMCP",es:"Inglés Marítimo SMCP",pt:"Inglês Marítimo SMCP"},
      desc:{fr:"VHF, GMDSS, logbook, communications",en:"VHF, GMDSS, logbook, communications",es:"VHF, GMDSS, cuaderno, comunicaciones",pt:"VHF, GMDSS, diário de bordo, comunicações"},
      xp:300, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"Bridge Watch & Reporting",en:"Bridge Watch & Reporting",es:"Bridge Watch & Reporting",pt:"Bridge Watch & Reporting"},access:"premium",status:"available"},
        {id:"l2",title:{fr:"Port & VTS Communications",en:"Port & VTS Communications",es:"Port & VTS Communications",pt:"Port & VTS Communications"},access:"premium",status:"available"},
        {id:"l3",title:{fr:"Safety & Emergency SMCP",en:"Safety & Emergency SMCP",es:"Safety & Emergency SMCP",pt:"Safety & Emergency SMCP"},access:"premium",status:"available"},
        {id:"l4",title:{fr:"Navigation & Maneuvering",en:"Navigation & Maneuvering",es:"Navigation & Maneuvering",pt:"Navigation & Maneuvering"},access:"premium",status:"available"},
        {id:"l5",title:{fr:"Cargo Operations",en:"Cargo Operations",es:"Cargo Operations",pt:"Cargo Operations"},access:"premium",status:"available"},
        {id:"l6",title:{fr:"Engine Room SMCP",en:"Engine Room SMCP",es:"Engine Room SMCP",pt:"Engine Room SMCP"},access:"premium",status:"available"},
        {id:"l7",title:{fr:"Medical SMCP",en:"Medical SMCP",es:"Medical SMCP",pt:"Medical SMCP"},access:"premium",status:"available"},
        {id:"l8",title:{fr:"Exam Prep & Final Review",en:"Exam Prep & Final Review",es:"Exam Prep & Final Review",pt:"Exam Prep & Final Review"},access:"premium",status:"available"},
      ]
    },
      { id:"d5", icon:"🧭", color:C.blue, access:"premium_plus",
  freeLessons:0, totalLessons:5,
  title:{fr:"Ship Career Navigator™",en:"Ship Career Navigator™",es:"Ship Career Navigator™",pt:"Ship Career Navigator™"},
  desc:{fr:"Feuille de route personnalisée par poste et navire",en:"Personalized roadmap by position and vessel type",es:"Hoja de ruta personalizada por puesto y buque",pt:"Roteiro personalizado por cargo e tipo de navio"},
  xp:250, status:"available", progress:0,
  lessons:[
    {id:"l1",title:{fr:"Ton profil",en:"Your profile",es:"Tu perfil",pt:"Seu perfil"},access:"premium_plus",status:"available"},
    {id:"l2",title:{fr:"Ta feuille de route",en:"Your roadmap",es:"Tu hoja de ruta",pt:"Seu roteiro"},access:"premium_plus",status:"available"},
    {id:"l3",title:{fr:"Certifications détaillées",en:"Detailed certifications",es:"Certificaciones detalladas",pt:"Certificações detalhadas"},access:"premium_plus",status:"available"},
    {id:"l4",title:{fr:"Spécificités par type de navire",en:"Vessel type specifics",es:"Especificidades por tipo de buque",pt:"Especificidades por tipo de navio"},access:"premium_plus",status:"available"},
    {id:"l5",title:{fr:"Plan d'action",en:"Action plan",es:"Plan de acción",pt:"Plano de ação"},access:"premium_plus",status:"available"},
  ]
    },
    { id:"d6", icon:"⚓", color:C.teal, access:"premium",
      freeLessons:0, totalLessons:7,
      title:{fr:"Seamanship",en:"Seamanship",es:"Seamanship",pt:"Seamanship"},
      desc:{fr:"Cordages, nœuds, mouillage, amarrage, stabilité",en:"Ropes, knots, anchoring, mooring, stability",es:"Cabos, nudos, fondeo, amarre, estabilidad",pt:"Cabos, nós, fundeio, amarração, estabilidade"},
      xp:250, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"Ropes & Fibres",en:"Ropes & Fibres",es:"Ropes & Fibres",pt:"Ropes & Fibres"},access:"premium",status:"available"},
        {id:"l2",title:{fr:"Knots & Splices",en:"Knots & Splices",es:"Knots & Splices",pt:"Knots & Splices"},access:"premium",status:"available"},
        {id:"l3",title:{fr:"Anchoring & Anchor Types",en:"Anchoring & Anchor Types",es:"Anchoring & Anchor Types",pt:"Anchoring & Anchor Types"},access:"premium",status:"locked"},
        {id:"l4",title:{fr:"Mooring Operations",en:"Mooring Operations",es:"Mooring Operations",pt:"Mooring Operations"},access:"premium",status:"locked"},
        {id:"l5",title:{fr:"Stability & Buoyancy",en:"Stability & Buoyancy",es:"Stability & Buoyancy",pt:"Stability & Buoyancy"},access:"premium",status:"locked"},
        {id:"l6",title:{fr:"Maintenance de Base & Graissage",en:"Basic Maintenance & Greasing",es:"Mantenimiento Básico y Engrase",pt:"Manutenção Básica e Lubrificação"},access:"premium",status:"locked"},
        {id:"l7",title:{fr:"Peinture & Prévention de la Corrosion",en:"Painting & Corrosion Prevention",es:"Pintura y Prevención de la Corrosión",pt:"Pintura e Prevenção da Corrosão"},access:"premium",status:"locked"},
      ]
    },
    { id:"d7", icon:"🌦️", color:C.teal, access:"tbd",
      freeLessons:0, totalLessons:7,
      title:{fr:"Météorologie marine",en:"Marine Meteorology",es:"Meteorología Marina",pt:"Meteorologia Marítima"},
      desc:{fr:"Observation, instruments, systèmes, phénomènes dangereux, routage",en:"Observation, instruments, systems, hazards, weather routing",es:"Observación, instrumentos, sistemas, fenómenos peligrosos, ruteo",pt:"Observação, instrumentos, sistemas, fenómenos perigosos, roteamento"},
      xp:350, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"Fondamentaux de la météorologie marine",en:"Fundamentals of Marine Meteorology",es:"Fundamentos de meteorología marina",pt:"Fundamentos de meteorologia marítima"},access:"tbd",status:"available"},
        {id:"l2",title:{fr:"Nuages, visibilité et observation météo",en:"Clouds, Visibility and Weather Observation",es:"Nubes, visibilidad y observación meteorológica",pt:"Nuvens, visibilidade e observação meteorológica"},access:"tbd",status:"available"},
        {id:"l3",title:{fr:"Instruments météorologiques et observations à bord",en:"Meteorological Instruments and Shipboard Observations",es:"Instrumentos meteorológicos y observaciones a bordo",pt:"Instrumentos meteorológicos e observações a bordo"},access:"tbd",status:"available"},
        {id:"l4",title:{fr:"Systèmes de pression, masses d'air et fronts",en:"Pressure Systems, Air Masses and Fronts",es:"Sistemas de presión, masas de aire y frentes",pt:"Sistemas de pressão, massas de ar e frentes"},access:"tbd",status:"available"},
        {id:"l5",title:{fr:"Phénomènes tropicaux et dangereux",en:"Tropical and Dangerous Phenomena",es:"Fenómenos tropicales y peligrosos",pt:"Fenómenos tropicais e perigosos"},access:"tbd",status:"available"},
        {id:"l6",title:{fr:"Cartes météo, prévisions et informations maritimes",en:"Weather Charts, Forecasts and Maritime Information",es:"Cartas meteorológicas, previsiones e información marítima",pt:"Cartas meteorológicas, previsões e informação marítima"},access:"tbd",status:"available"},
        {id:"l7",title:{fr:"Routage météo et décisions par gros temps",en:"Weather Routing and Heavy Weather Decision Making",es:"Ruteo meteorológico y decisiones en mal tiempo",pt:"Rota meteorológica e decisões em mau tempo"},access:"tbd",status:"available"},
      ]
    },
  ],
  engine:[
    { id:"e1", icon:"⚙️", color:C.orange, access:"free",
      freeLessons:8, totalLessons:8,
      title:{fr:"Moteur Principal & Propulsion",en:"Main Engine & Propulsion",es:"Motor Principal & Propulsión",pt:"Motor Principal & Propulsão"},
      desc:{fr:"Diesel 2T/4T, MAN, Wärtsilä, HFO/LNG",en:"Diesel 2T/4T, MAN, Wärtsilä, HFO/LNG",es:"Diesel 2T/4T, MAN, Wärtsilä, HFO/LNG",pt:"Diesel 2T/4T, MAN, Wärtsilä, HFO/LNG"},
      xp:450, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"Moteur Principal",en:"Main Engine",es:"Motor Principal",pt:"Motor Principal"},access:"free",status:"available"},
        {id:"l2",title:{fr:"Auxiliaires & Électricité",en:"Auxiliaries & Electricity",es:"Auxiliares & Electricidad",pt:"Auxiliares & Eletricidade"},access:"free",status:"available"},
        {id:"l3",title:{fr:"Stabilité & Chargement",en:"Stability & Loading",es:"Estabilidad & Carga",pt:"Estabilidade & Carga"},access:"free",status:"available"},
        {id:"l4",title:{fr:"Sécurité incendie & système CO2",en:"Fire Safety & CO2 System",es:"Seguridad contra incendios y sistema CO2",pt:"Segurança contra incêndio e sistema CO2"},access:"free",status:"available"},
        {id:"l5",title:{fr:"Survie & EPIRB",en:"Survival & EPIRB",es:"Supervivencia & EPIRB",pt:"Sobrevivência & EPIRB"},access:"free",status:"available"},
        {id:"l6",title:{fr:"Maintenance & Dépannage",en:"Maintenance & Troubleshooting",es:"Mantenimiento & Resolución de Problemas",pt:"Manutenção & Resolução de Problemas"},access:"free",status:"available"},
        {id:"l7",title:{fr:"Quart Machine",en:"Engine Watchkeeping",es:"Guardia de Máquinas",pt:"Quarto de Máquinas"},access:"free",status:"available"},
        {id:"l8",title:{fr:"Procédures d'Urgence",en:"Emergency Procedures",es:"Procedimientos de Emergencia",pt:"Procedimentos de Emergência"},access:"free",status:"available"},
      ]
    },
    { id:"e2", icon:"⚡", color:C.blue2, access:"premium",
  freeLessons:0, totalLessons:7,
  title:{fr:"Systèmes Auxiliaires & Électricité",en:"Auxiliary Systems & Electricity",es:"Sistemas Auxiliares & Electricidad",pt:"Sistemas Auxiliares & Eletricidade"},
  desc:{fr:"Pompes, compresseurs, purificateurs, générateurs, tableaux électriques",en:"Pumps, compressors, purifiers, generators, switchboards",es:"Bombas, compresores, purificadores, generadores, cuadros eléctricos",pt:"Bombas, compressores, purificadores, geradores, quadros elétricos"},
  xp:350, status:"available", progress:0,
  lessons:[
    {id:"l1",title:{fr:"Générateurs & Production électrique",en:"Generators & Power Generation",es:"Generadores & Producción eléctrica",pt:"Geradores & Produção elétrica"},access:"premium",status:"available"},
    {id:"l2",title:{fr:"Tableaux électriques & Distribution",en:"Switchboards & Distribution",es:"Cuadros eléctricos & Distribución",pt:"Quadros elétricos & Distribuição"},access:"premium",status:"available"},
    {id:"l3",title:{fr:"Pompes & Systèmes hydrauliques",en:"Pumps & Hydraulic Systems",es:"Bombas & Sistemas hidráulicos",pt:"Bombas & Sistemas hidráulicos"},access:"premium",status:"available"},
    {id:"l4",title:{fr:"Compresseurs & Air comprimé",en:"Compressors & Compressed Air",es:"Compresores & Aire comprimido",pt:"Compressores & Ar comprimido"},access:"premium",status:"available"},
    {id:"l5",title:{fr:"Purificateurs & Séparateurs",en:"Purifiers & Separators",es:"Purificadores & Separadores",pt:"Purificadores & Separadores"},access:"premium",status:"available"},
    {id:"l6",title:{fr:"Échangeurs de chaleur",en:"Heat Exchangers",es:"Intercambiadores de calor",pt:"Trocadores de calor"},access:"premium",status:"available"},
    {id:"l7",title:{fr:"Dépannage électrique",en:"Electrical Troubleshooting",es:"Resolución de averías eléctricas",pt:"Resolução de avarias elétricas"},access:"premium",status:"available"},
  ]
},
{ id:"e3", icon:"🔥", color:C.orange, access:"premium",
  freeLessons:0, totalLessons:6,
  title:{fr:"Chaudières & Systèmes Vapeur",en:"Boilers & Steam Systems",es:"Calderas & Sistemas de Vapor",pt:"Caldeiras & Sistemas de Vapor"},
  desc:{fr:"Chaudières auxiliaires, vapeur HFO, production vapeur",en:"Auxiliary boilers, HFO steam, steam production",es:"Calderas auxiliares, vapor HFO, producción de vapor",pt:"Caldeiras auxiliares, vapor HFO, produção de vapor"},
  xp:300, status:"available", progress:0,
  lessons:[
    {id:"l1",title:{fr:"Types de chaudières marines",en:"Marine Boiler Types",es:"Tipos de calderas marinas",pt:"Tipos de caldeiras marinas"},access:"premium",status:"available"},
    {id:"l2",title:{fr:"Combustion & Brûleurs",en:"Combustion & Burners",es:"Combustión & Quemadores",pt:"Combustão & Queimadores"},access:"premium",status:"available"},
    {id:"l3",title:{fr:"Traitement de l'eau de chaudière",en:"Boiler Water Treatment",es:"Tratamiento del agua de caldera",pt:"Tratamento da água de caldeira"},access:"premium",status:"available"},
    {id:"l4",title:{fr:"Systèmes vapeur & Distribution",en:"Steam Systems & Distribution",es:"Sistemas de vapor & Distribución",pt:"Sistemas de vapor & Distribuição"},access:"premium",status:"available"},
    {id:"l5",title:{fr:"Sécurités & Alarmes chaudière",en:"Boiler Safety & Alarms",es:"Seguridades & Alarmas de caldera",pt:"Seguridades & Alarmes de caldeira"},access:"premium",status:"available"},
    {id:"l6",title:{fr:"Maintenance & Inspection chaudière",en:"Boiler Maintenance & Inspection",es:"Mantenimiento & Inspección de caldera",pt:"Manutenção & Inspeção de caldeira"},access:"premium",status:"available"},
  ]
},
{ id:"e6", icon:"🛢️", color:C.teal, access:"premium",
  freeLessons:0, totalLessons:6,
  title:{fr:"Systèmes de Cargaison Machine",en:"Cargo Systems — Engine Side",es:"Sistemas de Carga — Sala de Máquinas",pt:"Sistemas de Carga — Sala de Máquinas"},
  desc:{fr:"Pompes cargo, ballast, IGS, COW — tankers & vraquiers",en:"Cargo pumps, ballast, IGS, COW — tankers & bulk carriers",es:"Bombas de carga, lastre, IGS, COW — tanqueros & graneleros",pt:"Bombas de carga, lastro, IGS, COW — tanqueiros & graneleiros"},
  xp:300, status:"available", progress:0,
  lessons:[
    {id:"l1",title:{fr:"Pompes de cargaison",en:"Cargo Pumps",es:"Bombas de carga",pt:"Bombas de carga"},access:"premium",status:"available"},
    {id:"l2",title:{fr:"Système de ballast",en:"Ballast System",es:"Sistema de lastre",pt:"Sistema de lastro"},access:"premium",status:"available"},
    {id:"l3",title:{fr:"Système gaz inerte (IGS)",en:"Inert Gas System (IGS)",es:"Sistema de gas inerte (IGS)",pt:"Sistema de gás inerte (IGS)"},access:"premium",status:"available"},
    {id:"l4",title:{fr:"COW & Nettoyage des citernes",en:"COW & Tank Cleaning",es:"COW & Limpieza de tanques",pt:"COW & Limpeza de tanques"},access:"premium",status:"available"},
    {id:"l5",title:{fr:"Chauffage de cargaison",en:"Cargo Heating",es:"Calefacción de carga",pt:"Aquecimento de carga"},access:"premium",status:"available"},
    {id:"l6",title:{fr:"Jaugeage & Mesures",en:"Gauging & Measurements",es:"Sondeo & Mediciones",pt:"Sondagem & Medições"},access:"premium",status:"available"},
  ]
},
{ id:"e7", icon:"🤖", color:"#9b59b6", access:"premium_plus",
  freeLessons:0, totalLessons:5,
  title:{fr:"Automatisation & Contrôle UMS",en:"Automation & UMS Control",es:"Automatización & Control UMS",pt:"Automatização & Controlo UMS"},
  desc:{fr:"UMS, PLC, alarmes, SCADA — salle machine sans surveillance",en:"UMS, PLC, alarms, SCADA — unattended machinery space",es:"UMS, PLC, alarmas, SCADA — sala de máquinas sin vigilancia",pt:"UMS, PLC, alarmes, SCADA — sala de máquinas sem vigilância"},
  xp:250, status:"available", progress:0,
  lessons:[
    {id:"l1",title:{fr:"UMS — Salle machine sans surveillance",en:"UMS — Unattended Machinery Space",es:"UMS — Sala de máquinas sin vigilancia",pt:"UMS — Sala de máquinas sem vigilância"},access:"premium_plus",status:"available"},
    {id:"l2",title:{fr:"Systèmes d'alarme & Monitoring",en:"Alarm Systems & Monitoring",es:"Sistemas de alarma & Monitorización",pt:"Sistemas de alarme & Monitorização"},access:"premium_plus",status:"available"},
    {id:"l3",title:{fr:"PLC & Automates programmables",en:"PLC & Programmable Controllers",es:"PLC & Controladores programables",pt:"PLC & Controladores programáveis"},access:"premium_plus",status:"available"},
    {id:"l4",title:{fr:"SCADA & Interfaces homme-machine",en:"SCADA & Human-Machine Interfaces",es:"SCADA & Interfaces hombre-máquina",pt:"SCADA & Interfaces homem-máquina"},access:"premium_plus",status:"available"},
    {id:"l5",title:{fr:"Cybersécurité des systèmes embarqués",en:"Embedded Systems Cybersecurity",es:"Ciberseguridad de sistemas embarcados",pt:"Cibersegurança de sistemas embarcados"},access:"premium_plus",status:"available"},
  ]
},
    
      { id:"e4", icon:"🌊", color:C.teal, access:"premium",
      freeLessons:0, totalLessons:6,
      title:{fr:"MARPOL Machine",en:"MARPOL Engine Room",es:"MARPOL Sala de Máquinas",pt:"MARPOL Sala de Máquinas"},
      desc:{fr:"Livre hydrocarbures, 15ppm, déchets",en:"Oil record book, 15ppm, waste management",es:"Libro de hidrocarburos, 15ppm, residuos",pt:"Livro de hidrocarbonetos, 15ppm, resíduos"},
      xp:300, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"MARPOL & Environnement",en:"MARPOL & Environment",es:"MARPOL & Medio Ambiente",pt:"MARPOL & Ambiente"},access:"premium",status:"available"},
        {id:"l2",title:{fr:"Annexe I - Hydrocarbures",en:"Annex I - Oil Pollution",es:"Anexo I - Hidrocarburos",pt:"Anexo I - Hidrocarbonetos"},access:"premium",status:"available"},
        {id:"l3",title:{fr:"Annexe V - Gestion des déchets",en:"Annex V - Garbage Management",es:"Anexo V - Gestión de residuos",pt:"Anexo V - Gestão de resíduos"},access:"premium",status:"available"},
        {id:"l4",title:{fr:"Annexe VI - Pollution atmosphérique",en:"Annex VI - Air Pollution",es:"Anexo VI - Contaminación atmosférica",pt:"Anexo VI - Poluição atmosférica"},access:"premium",status:"available"},
        {id:"l5",title:{fr:"Conformité environnementale",en:"Environmental Compliance",es:"Cumplimiento ambiental",pt:"Conformidade ambiental"},access:"premium",status:"available"},
        {id:"l6",title:{fr:"Leadership environnemental",en:"Environmental Leadership",es:"Liderazgo ambiental",pt:"Liderança ambiental"},access:"premium",status:"available"},
      ]
    },
  
      { id:"e5", icon:"🍃", color:C.green, access:"premium_plus",
      freeLessons:0, totalLessons:5,
      title:{fr:"SEEMP & Efficacité Énergétique",en:"SEEMP & Energy Efficiency",es:"SEEMP & Eficiencia Energética",pt:"SEEMP & Eficiência Energética"},
      desc:{fr:"EEXI, CII, plan gestion énergie",en:"EEXI, CII, energy management plan",es:"EEXI, CII, plan de gestión energética",pt:"EEXI, CII, plano de gestão de energia"},
      xp:250, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"Pourquoi l'efficacité énergétique compte",en:"Why Energy Efficiency Matters",es:"Por qué importa la eficiencia energética",pt:"Por que a eficiência energética importa"},access:"premium_plus",status:"available"},
        {id:"l2",title:{fr:"Le SEEMP",en:"The SEEMP",es:"El SEEMP",pt:"O SEEMP"},access:"premium_plus",status:"available"},
        {id:"l3",title:{fr:"L'EEXI",en:"The EEXI",es:"El EEXI",pt:"O EEXI"},access:"premium_plus",status:"available"},
        {id:"l4",title:{fr:"Le CII & les notations A-E",en:"The CII & A-E Ratings",es:"El CII y las calificaciones A-E",pt:"O CII e as classificações A-E"},access:"premium_plus",status:"available"},
        {id:"l5",title:{fr:"Efficacité énergétique pratique",en:"Practical Energy Efficiency",es:"Eficiencia energética práctica",pt:"Eficiência energética prática"},access:"premium_plus",status:"available"},
      ]
    },
  ],
  safety:[
  
      { id:"s1", icon:"🛟", color:C.red, access:"free",
      freeLessons:1, totalLessons:6,
      title:{fr:"COLREG Safety — Collision Prevention & Response",en:"COLREG Safety — Collision Prevention & Response",es:"COLREG Safety — Prevención y Respuesta ante Abordajes",pt:"COLREG Safety — Prevenção e Resposta a Abalroamentos"},
      desc:{fr:"Facteur humain, coordination, décision sous pression",en:"Human factor, coordination, decision-making",es:"Factor humano, coordinación, toma de decisiones",pt:"Fator humano, coordenação, tomada de decisão"},
      xp:300, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"Facteurs Humains : Pourquoi les Collisions Arrivent Vraiment",en:"Human Factors: Why Collisions Really Happen",es:"Factores Humanos: Por Qué Ocurren Realmente las Colisiones",pt:"Fatores Humanos: Por Que as Colisões Realmente Acontecem"},access:"free",status:"available"},
        {id:"l2",title:{fr:"Coordination d'Équipe Passerelle Pendant un Risque de Collision",en:"Bridge Team Coordination During Collision Risk",es:"Coordinación del Equipo de Puente Durante un Riesgo de Colisión",pt:"Coordenação da Equipa de Ponte Durante um Risco de Colisão"},access:"premium",status:"locked"},
        {id:"l3",title:{fr:"Actions d'Urgence Avant l'Impact",en:"Emergency Actions Before Impact",es:"Acciones de Emergencia Antes del Impacto",pt:"Ações de Emergência Antes do Impacto"},access:"premium",status:"locked"},
        {id:"l4",title:{fr:"Les Minutes Critiques Après une Collision",en:"The Critical First Minutes After a Collision",es:"Los Minutos Críticos Después de una Colisión",pt:"Os Minutos Críticos Após uma Colisão"},access:"premium",status:"locked"},
        {id:"l5",title:{fr:"Prise de Décision Sous Pression",en:"Decision-Making Under Pressure",es:"Toma de Decisiones Bajo Presión",pt:"Tomada de Decisão Sob Pressão"},access:"premium",status:"locked"},
        {id:"l6",title:{fr:"Leçons Tirées des Collisions Maritimes",en:"Lessons Learned from Maritime Collisions",es:"Lecciones Aprendidas de Colisiones Marítimas",pt:"Lições Aprendidas de Colisões Marítimas"},access:"premium",status:"locked"},
      ]
    },
     
     { id:"s2", icon:"📡", color:C.blue2, access:"premium",
      freeLessons:1, totalLessons:5,
      title:{fr:"EPIRB, SART & GMDSS",en:"EPIRB, SART & GMDSS",es:"EPIRB, SART & GMDSS",pt:"EPIRB, SART & GMDSS"},
      desc:{fr:"Recognize, Choose, Prepare, Activate, Learn",en:"Recognize, Choose, Prepare, Activate, Learn",es:"Recognize, Choose, Prepare, Activate, Learn",pt:"Recognize, Choose, Prepare, Activate, Learn"},
      xp:250, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"Chaque Urgence Maritime Commence par une Décision",en:"Every Maritime Emergency Begins with One Decision",es:"Toda Emergencia Marítima Comienza con una Decisión",pt:"Toda Emergência Marítima Começa com uma Decisão"},access:"free",status:"available"},
        {id:"l2",title:{fr:"Choisir le Bon Équipement de Détresse",en:"Selecting the Right Distress Equipment",es:"Seleccionar el Equipo de Emergencia Adecuado",pt:"Selecionar o Equipamento de Emergência Adequado"},access:"premium",status:"locked"},
        {id:"l3",title:{fr:"Erreurs d'Activation qui Coûtent des Vies",en:"Activation Errors That Cost Lives",es:"Errores de Activación que Cuestan Vidas",pt:"Erros de Ativação que Custam Vidas"},access:"premium",status:"locked"},
        {id:"l4",title:{fr:"Activer — Exécuter les Bonnes Actions Sous Pression",en:"Activate — Executing the Right Actions Under Pressure",es:"Activar — Ejecutar las Acciones Correctas Bajo Presión",pt:"Ativar — Executar as Ações Corretas Sob Pressão"},access:"premium",status:"locked"},
        {id:"l5",title:{fr:"Opérations Réelles de Recherche et Sauvetage — Leçons Apprises",en:"Real Search & Rescue Operations — Lessons Learned",es:"Operaciones Reales de Búsqueda y Rescate — Lecciones Aprendidas",pt:"Operações Reais de Busca e Salvamento — Lições Aprendidas"},access:"premium",status:"locked"},
      ]
    },
  
      { id:"s3", icon:"🩺", color:"#e74c3c", access:"premium",
  freeLessons:0, totalLessons:8,
  title:{fr:"Secourisme STCW",en:"STCW First Aid",es:"Primeros Auxilios STCW",pt:"Primeiros Socorros STCW"},
  desc:{fr:"EFA, MFA, MCC — RCP, MEDEVAC",en:"EFA, MFA, MCC — CPR, MEDEVAC",es:"EFA, MFA, MCC — RCP, MEDEVAC",pt:"EFA, MFA, MCC — RCP, MEDEVAC"},
  xp:400, status:"available", progress:0,
  lessons:[
    {id:"l1",title:{fr:"Sécurité des Lieux & Évaluation Primaire (DRABC)",en:"Scene Safety & Primary Survey (DRABC)",es:"Seguridad del Lugar y Evaluación Primaria (DRABC)",pt:"Segurança do Local e Avaliação Primária (DRABC)"},access:"premium",status:"available"},
    {id:"l2",title:{fr:"RCP & DAE — Réponse à l'Arrêt Cardiaque",en:"CPR & AED — Cardiac Arrest Response",es:"RCP y DEA — Respuesta al Paro Cardíaco",pt:"RCP e DEA — Resposta à Paragem Cardíaca"},access:"premium",status:"locked"},
    {id:"l3",title:{fr:"Contrôle des Hémorragies & Gestion du Choc",en:"Bleeding Control & Shock Management",es:"Control de Hemorragias y Manejo del Shock",pt:"Controlo de Hemorragias e Gestão do Choque"},access:"premium",status:"locked"},
    {id:"l4",title:{fr:"Brûlures, Fractures & Immobilisation des Traumatismes",en:"Burns, Fractures & Trauma Immobilization",es:"Quemaduras, Fracturas e Inmovilización de Traumatismos",pt:"Queimaduras, Fraturas e Imobilização de Traumatismos"},access:"premium",status:"locked"},
    {id:"l5",title:{fr:"Évaluation Secondaire & Surveillance du Patient",en:"Secondary Assessment & Patient Monitoring",es:"Evaluación Secundaria y Monitoreo del Paciente",pt:"Avaliação Secundária e Monitorização do Paciente"},access:"premium",status:"locked"},
    {id:"l6",title:{fr:"Urgences Médicales en Mer",en:"Medical Emergencies at Sea",es:"Emergencias Médicas en el Mar",pt:"Emergências Médicas no Mar"},access:"premium",status:"locked"},
    {id:"l7",title:{fr:"Pharmacie de Bord & Conseil Médical Radio",en:"Ship's Medicine Chest & Radio Medical Advice",es:"Botiquín del Buque y Asesoramiento Médico por Radio",pt:"Farmácia de Bordo e Aconselhamento Médico por Rádio"},access:"premium",status:"locked"},
    {id:"l8",title:{fr:"MEDEVAC — Préparation du Blessé & Transfert",en:"MEDEVAC — Preparing the Casualty & Handover",es:"MEDEVAC — Preparación del Herido y Entrega",pt:"MEDEVAC — Preparação do Ferido e Transferência"},access:"premium",status:"locked"},
  ]
},
    
      { id:"s4", icon:"🔥", color:"#e67e22", access:"premium",
  freeLessons:0, totalLessons:7,
  title:{fr:"Firefighting",en:"Firefighting",es:"Firefighting",pt:"Firefighting"},
  desc:{fr:"BST, extincteurs, équipes d'urgence",en:"BST, extinguishers, emergency teams",es:"BST, extintores, equipos de emergencia",pt:"BST, extintores, equipas de emergência"},
  xp:350, status:"available", progress:0,
  lessons:[
    {id:"l1",title:{fr:"Comportement du Feu & Détection Précoce",en:"Fire Behaviour & Early Fire Recognition",es:"Comportamiento del Fuego y Detección Temprana",pt:"Comportamento do Fogo e Deteção Precoce"},access:"premium",status:"available"},
    {id:"l2",title:{fr:"Classification des Feux & Stratégie d'Extinction",en:"Fire Classification & Extinguishing Strategy",es:"Clasificación de Incendios y Estrategia de Extinción",pt:"Classificação de Incêndios e Estratégia de Extinção"},access:"premium",status:"locked"},
    {id:"l3",title:{fr:"Lutte Contre l'Incendie Portable",en:"Portable Firefighting",es:"Lucha Contra Incendios Portátil",pt:"Combate a Incêndios Portátil"},access:"premium",status:"locked"},
    {id:"l4",title:{fr:"Systèmes Fixes de Lutte Contre l'Incendie",en:"Fixed Fire-Fighting Systems",es:"Sistemas Fijos de Lucha Contra Incendios",pt:"Sistemas Fixos de Combate a Incêndios"},access:"premium",status:"locked"},
    {id:"l5",title:{fr:"Détection Incendie & Réponse Initiale",en:"Fire Detection & Initial Response",es:"Detección de Incendios y Respuesta Inicial",pt:"Deteção de Incêndios e Resposta Inicial"},access:"premium",status:"locked"},
    {id:"l6",title:{fr:"Appareil Respiratoire & EPI",en:"Breathing Apparatus & PPE",es:"Equipo de Respiración y EPP",pt:"Aparelho Respiratório e EPI"},access:"premium",status:"locked"},
    {id:"l7",title:{fr:"Commandement Incendie, Équipes & Contrôle des Avaries",en:"Fire Command, Teams & Damage Control",es:"Mando de Incendios, Equipos y Control de Averías",pt:"Comando de Incêndio, Equipas e Controlo de Avarias"},access:"premium",status:"locked"},
  ]
},
    
     { id:"s5", icon:"🛟", color:"#4da6ff", access:"premium",
  freeLessons:0, totalLessons:4,
  title:{fr:"Lifeboats, Liferafts & HRU",en:"Lifeboats, Liferafts & HRU",es:"Lifeboats, Liferafts & HRU",pt:"Lifeboats, Liferafts & HRU"},
  desc:{fr:"SOLAS, HRU, abandon ship, muster",en:"SOLAS, HRU, abandon ship, muster",es:"SOLAS, HRU, abandon ship, muster",pt:"SOLAS, HRU, abandon ship, muster"},
  xp:200, status:"available", progress:0,
  lessons:[
    {id:"l1",title:{fr:"Embarcations de Sauvetage : Mise à l'Eau & Manœuvre",en:"Lifeboats: Launching & Handling",es:"Botes Salvavidas: Botadura y Maniobra",pt:"Baleeiras: Lançamento e Manobra"},access:"premium",status:"available"},
    {id:"l2",title:{fr:"Radeaux de Sauvetage : Déploiement & Embarquement",en:"Liferafts: Deployment & Boarding",es:"Balsas Salvavidas: Despliegue y Embarque",pt:"Jangadas Salva-vidas: Lançamento e Embarque"},access:"premium",status:"available"},
    {id:"l3",title:{fr:"HRU & Équipement de Survie",en:"HRU & Survival Equipment",es:"HRU y Equipo de Supervivencia",pt:"HRU e Equipamento de Sobrevivência"},access:"premium",status:"available"},
    {id:"l4",title:{fr:"Abandon du Navire & Leadership de Survie",en:"Abandon Ship & Survival Leadership",es:"Abandono del Buque y Liderazgo de Supervivencia",pt:"Abandono do Navio e Liderança de Sobrevivência"},access:"premium",status:"available"},
  ]
},
    
 { id:"s6", icon:"🛡️", color:"#e67e22", access:"premium",
  freeLessons:0, totalLessons:6,
  title:{fr:"Ship Safety Operations & Emergency Readiness",en:"Ship Safety Operations & Emergency Readiness",es:"Ship Safety Operations & Emergency Readiness",pt:"Ship Safety Operations & Emergency Readiness"},
  desc:{fr:"Vigilance, urgences, EPI, communication, prévention, culture",en:"Vigilance, emergencies, PPE, communication, prevention, culture",es:"Vigilancia, emergencias, EPP, comunicación, prevención, cultura",pt:"Vigilância, emergências, EPI, comunicação, prevenção, cultura"},
  xp:300, status:"available", progress:0,
  lessons:[
    {id:"l1",title:{fr:"Ronde de Sécurité & Reconnaissance des Dangers",en:"Safety Patrol & Hazard Recognition",es:"Ronda de Seguridad y Reconocimiento de Peligros",pt:"Ronda de Segurança e Reconhecimento de Perigos"},access:"premium",status:"available"},
    {id:"l2",title:{fr:"Urgences Courantes à Bord & Actions Immédiates",en:"Common Ship Emergencies & Immediate Actions",es:"Emergencias Comunes a Bordo y Acciones Inmediatas",pt:"Emergências Comuns a Bordo e Ações Imediatas"},access:"premium",status:"available"},
    {id:"l3",title:{fr:"EPI, Comportement Sécuritaire & Facteurs Humains",en:"PPE, Safe Behaviour & Human Factors",es:"EPP, Comportamiento Seguro y Factores Humanos",pt:"EPI, Comportamento Seguro e Fatores Humanos"},access:"premium",status:"available"},
    {id:"l4",title:{fr:"Signalement d'Urgence & Réponse Initiale",en:"Emergency Reporting & Initial Response",es:"Reporte de Emergencias y Respuesta Inicial",pt:"Comunicação de Emergência e Resposta Inicial"},access:"premium",status:"available"},
    {id:"l5",title:{fr:"Permis de Travail & Évaluation des Risques",en:"Permit to Work & Risk Assessment",es:"Permiso de Trabajo y Evaluación de Riesgos",pt:"Permissão de Trabalho e Avaliação de Riscos"},access:"premium",status:"available"},
    {id:"l6",title:{fr:"Culture de Sécurité & Responsabilité Professionnelle",en:"Safety Culture & Professional Responsibility",es:"Cultura de Seguridad y Responsabilidad Profesional",pt:"Cultura de Segurança e Responsabilidade Profissional"},access:"premium",status:"available"},
  ]
},
],
  tools:[
   { id:"t0", icon:"📖", color:C.blue2, access:"free",
  freeLessons:0, totalLessons:0,
  title:{fr:"Lexique Maritime",en:"Maritime Lexicon",es:"Léxico Marítimo",pt:"Léxico Marítimo"},
  desc:{fr:`${LEXICON.length}+ termes FR/EN/ES/PT · Dictionnaire · Flashcards · Quiz`,en:`${LEXICON.length}+ terms FR/EN/ES/PT · Dictionary · Flashcards · Quiz`,es:`${LEXICON.length}+ términos FR/EN/ES/PT · Diccionario · Flashcards · Quiz`,pt:`${LEXICON.length}+ termos FR/EN/ES/PT · Dicionário · Flashcards · Quiz`},
  xp:100, status:"available", progress:0 },
    { id:"t1", icon:"🤖", color:C.purple, access:"premium_plus",
      freeLessons:0, totalLessons:0, isAI:true,
      title:{fr:"Assistant IA Maritime",en:"Maritime AI Assistant",es:"Asistente IA Marítimo",pt:"Assistente IA Marítimo"},
      desc:{fr:"Questions illimitées · Réponses expertes 24h/24",en:"Unlimited questions · Expert answers 24/7",es:"Preguntas ilimitadas · Respuestas expertas 24/7",pt:"Perguntas ilimitadas · Respostas especializadas 24/7"},
      xp:0, status:"coming", progress:0 },
    { id:"t2", icon:"🎯", color:"#e91e8c", access:"premium_plus",
      freeLessons:0, totalLessons:0, isAI:true,
      title:{fr:"Coaching Personnalisé IA",en:"AI Personal Coaching",es:"Coaching Personalizado IA",pt:"Coaching Personalizado IA"},
      desc:{fr:"Analyse tes résultats · Plan de révision sur mesure",en:"Analyzes your results · Custom study plan",es:"Analiza tus resultados · Plan de revisión a medida",pt:"Analisa seus resultados · Plano de estudo personalizado"},
      xp:0, status:"coming", progress:0 },
    { id:"t3", icon:"💼", color:C.blue2, access:"premium_plus",
      freeLessons:0, totalLessons:0, isAI:true,
      title:{fr:"Préparation Entretiens",en:"Interview Preparation",es:"Preparación Entrevistas",pt:"Preparação Entrevistas"},
      desc:{fr:"Simulation entretien Maersk, MSC, Offshore, Yacht",en:"Interview simulation Maersk, MSC, Offshore, Yacht",es:"Simulación entrevista Maersk, MSC, Offshore",pt:"Simulação entrevista Maersk, MSC, Offshore"},
      xp:0, status:"coming", progress:0 },
    { id:"t4", icon:"📄", color:C.teal, access:"premium_plus",
      freeLessons:0, totalLessons:0, isAI:true,
      title:{fr:"CV Maritime IA",en:"Maritime CV Builder",es:"CV Marítimo IA",pt:"CV Marítimo IA"},
      desc:{fr:"Génère ton CV + lettre de motivation · Export PDF",en:"Generate your CV + cover letter · PDF export",es:"Genera tu CV + carta de motivación · Export PDF",pt:"Gera seu CV + carta de motivação · Export PDF"},
      xp:0, status:"coming", progress:0 },
    { id:"t5", icon:"🚀", color:C.gold, access:"premium_plus",
      freeLessons:0, totalLessons:0, isAI:true,
      title:{fr:"Conseils Carrière Maritime",en:"Maritime Career Advice",es:"Consejos Carrera Marítima",pt:"Conselhos Carreira Marítima"},
      desc:{fr:"Écoles, brevets, salaires, compagnies par région",en:"Schools, certificates, salaries, companies by region",es:"Escuelas, brevetes, salarios, empresas por región",pt:"Escolas, brevês, salários, empresas por região"},
      xp:0, status:"coming", progress:0 },
    { id:"t6", icon:"🔍", color:C.orange, access:"premium_plus",
      freeLessons:0, totalLessons:0,
      title:{fr:"MarineVerify™",en:"MarineVerify™",es:"MarineVerify™",pt:"MarineVerify™"},
      desc:{fr:"Vérification certificats STCW en temps réel",en:"Real-time STCW certificate verification",es:"Verificación de certificados STCW en tiempo real",pt:"Verificação de certificados STCW em tempo real"},
      xp:0, status:"coming", progress:0 },
    { id:"t7", icon:"⛵", color:C.blue, access:"premium_plus",
      freeLessons:0, totalLessons:0,
      title:{fr:"My Career Advisor™",en:"My Career Advisor™",es:"My Career Advisor™",pt:"My Career Advisor™"},
      desc:{fr:"AB→Capitaine · Oiler→Chef Mécanicien · Yacht→Skipper",en:"AB→Captain · Oiler→Chief Engineer · Yacht→Skipper",es:"AB→Capitán · Oiler→Jefe Máqs · Yacht→Patrón",pt:"AB→Capitão · Oiler→Chefe Máqs · Iate→Skipper"},
      xp:0, status:"coming", progress:0 },
    { id:"t8", icon:"⚓", color:C.blue2, access:"free",
      freeLessons:0, totalLessons:0,
      title:{fr:"Rôle à Bord",en:"Role On Board",es:"Rol a Bordo",pt:"Função a Bordo"},
      desc:{fr:"Missions, responsabilités et quotidien de chaque rang à bord",en:"Duties, responsibilities and daily life for each rank on board",es:"Funciones, responsabilidades y día a día de cada rango a bordo",pt:"Funções, responsabilidades e dia a dia de cada posto a bordo"},
      xp:0, status:"available", progress:0 },
  ],
};

// ══════════════════════════════════════════════
//  SHARED UI
// ══════════════════════════════════════════════
function Stars() {
  const [s,setS]=useState([]);
  useEffect(()=>{
    setS(Array.from({length:25},()=>({
      x:Math.random()*100,y:Math.random()*100,
      sz:Math.random()>0.7?2:1.5,
      dur:2+Math.random()*4,delay:Math.random()*6,
    })));
  },[]);
  return (
    <>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        {s.map((st,i)=>(
          <div key={i} style={{
            position:"absolute",left:`${st.x}%`,top:`${st.y}%`,
            width:st.sz,height:st.sz,borderRadius:"50%",
            background:"white",opacity:0,
            animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`,
          }}/>
        ))}
      </div>
      <style>{`
        @keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{left:-100%}100%{left:200%}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes streakBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
        @keyframes glowPulse{0%,100%{opacity:.5}50%{opacity:1}}
      `}</style>
    </>
  );
}

function PlanBadge({access,t,small=false}) {
  const cfg = {
    free:     {color:C.free,    bg:"rgba(30,138,74,0.15)",   label:t.freeTag,        icon:"🆓"},
    premium:  {color:C.premium, bg:"rgba(201,146,42,0.15)",  label:t.premiumTag,     icon:"⭐"},
    premium_plus:{color:C.purple,bg:"rgba(142,68,173,0.15)", label:t.premiumPlusTag, icon:"👑"},
  };
  const c=cfg[access];
  if(!c) return null; // access tier not yet decided (e.g. "tbd") — don't assume a tier
  return (
    <div style={{
      display:"inline-flex",alignItems:"center",gap:3,
      padding:small?"2px 7px":"3px 9px",
      borderRadius:20,
      background:c.bg,
      border:`1px solid ${c.color}55`,
      fontSize:small?8:10,color:c.color,fontWeight:700,
      flexShrink:0,
    }}>
      {c.icon} {c.label}
    </div>
  );
}

function GLine() {
  return <div style={{height:1,margin:"8px 0",
    background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;
}

// ── UNLOCK MODAL ──────────────────────────────
function UnlockModal({module,t,lang,onClose}) {
  if(!module) return null;
  const requiredPlan=module.access;
  const isPlus=requiredPlan==="premium_plus";

  const perks = {
    premium:{
      fr:["✅ Tous les modules Pont et Machine","✅ Quiz complets 5 questions + explications","✅ Fiches mémo téléchargeables PNG","✅ Certificats de module","✅ Banque 500+ questions STCW","✅ Examens blancs officiels 20Q/30min","✅ Cas réels d'accidents maritimes","✅ Accès prioritaire nouveaux modules","","💰 9$/mois · Annulable à tout moment"],
      en:["✅ All Deck and Engine modules","✅ Full 5-question quizzes + explanations","✅ Downloadable PNG memo sheets","✅ Module certificates","✅ Bank of 500+ STCW questions","✅ Official mock exams 20Q/30min","✅ Real maritime accident cases","✅ Priority access to new modules","","💰 $9/month · Cancel anytime"],
      es:["✅ Todos los módulos Puente y Máquinas","✅ Quizzes completos 5 preguntas + explicaciones","✅ Fichas resumen PNG descargables","✅ Certificados de módulo","✅ Banco 500+ preguntas STCW","✅ Exámenes blancos oficiales 20P/30min","✅ Casos reales de accidentes marítimos","✅ Acceso prioritario nuevos módulos","","💰 9$/mes · Cancelable en cualquier momento"],
      pt:["✅ Todos os módulos Convés e Máquinas","✅ Quizzes completos 5 perguntas + explicações","✅ Fichas resumo PNG para download","✅ Certificados de módulo","✅ Banco 500+ questões STCW","✅ Exames simulados oficiais 20P/30min","✅ Casos reais de acidentes marítimos","✅ Acesso prioritário novos módulos","","💰 9$/mês · Cancelável a qualquer momento"],
    },
    premium_plus:{
      fr:["👑 Tout Premium +","","🤖 Assistant IA Maritime 24h/24","🎯 Coaching personnalisé IA","💼 Simulation d'entretiens (Maersk, MSC, Offshore...)","📄 Génération de CV maritime + lettre de motivation","🚀 Conseils de carrière personnalisés par région","🔍 MarineVerify™ — vérification STCW","⛵ My Career Advisor™ avancé","","💰 25$/mois · Annulable à tout moment"],
      en:["👑 Everything in Premium +","","🤖 Maritime AI Assistant 24/7","🎯 AI personal coaching","💼 Interview simulation (Maersk, MSC, Offshore...)","📄 Maritime CV generation + cover letter","🚀 Personalized career advice by region","🔍 MarineVerify™ — STCW verification","⛵ Advanced My Career Advisor™","","💰 $25/month · Cancel anytime"],
      es:["👑 Todo Premium +","","🤖 Asistente IA Marítimo 24/7","🎯 Coaching personalizado IA","💼 Simulación entrevistas (Maersk, MSC, Offshore...)","📄 Generación CV marítimo + carta de motivación","🚀 Consejos de carrera personalizados por región","🔍 MarineVerify™ — verificación STCW","⛵ My Career Advisor™ avanzado","","💰 25$/mes · Cancelable en cualquier momento"],
      pt:["👑 Tudo Premium +","","🤖 Assistente IA Marítimo 24/7","🎯 Coaching personalizado IA","💼 Simulação entrevistas (Maersk, MSC, Offshore...)","📄 Geração de CV marítimo + carta de motivação","🚀 Conselhos de carreira personalizados por região","🔍 MarineVerify™ — verificação STCW","⛵ My Career Advisor™ avançado","","💰 25$/mês · Cancelável a qualquer momento"],
    },
  };

  const perkList=(perks[requiredPlan]||perks.premium)[lang]||(perks[requiredPlan]||perks.premium).fr;

  return (
    <div style={{
      position:"fixed",inset:0,zIndex:999,
      background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",
      display:"flex",alignItems:"flex-end",justifyContent:"center",
      padding:"0 0 0 0",
    }} onClick={onClose}>
      <div style={{
        width:"100%",maxWidth:480,
        background:`linear-gradient(160deg,${C.navy3},${C.navy2})`,
        border:`1.5px solid ${isPlus?C.purple:C.gold}55`,
        borderRadius:"28px 28px 0 0",
        padding:"24px 20px 40px",
        animation:"modalIn 0.35s ease",
      }} onClick={e=>e.stopPropagation()}>

        {/* Handle */}
        <div style={{width:40,height:4,borderRadius:2,
          background:"rgba(255,255,255,0.2)",margin:"0 auto 20px"}}/>

        {/* Title */}
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:36,marginBottom:8}}>
            {isPlus?"👑":"⭐"}
          </div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:18,
            fontWeight:700,color:C.white,marginBottom:4}}>
            {t.unlockTitle}
          </div>
          <div style={{fontSize:13,color:C.muted}}>
            <PlanBadge access={requiredPlan} t={t}/>
            {" "}—{" "}
            {(module.title?.[lang]||module.title?.fr)}
          </div>
        </div>

        <GLine/>

        {/* Perks */}
        <div style={{marginBottom:16}}>
          {perkList.map((p,i)=>(
            p===""
              ? <div key={i} style={{height:6}}/>
              : <div key={i} style={{
                  fontSize:13,color:
                    p.startsWith("💰")?C.gold2:
                    p.startsWith("👑")?C.purple:
                    p.startsWith("🤖")||p.startsWith("🎯")||p.startsWith("💼")||p.startsWith("📄")||p.startsWith("🚀")?C.purple:
                    C.white,
                  padding:"4px 0",lineHeight:1.5,
                  fontWeight:p.startsWith("💰")?"700":"400",
                }}>{p}</div>
          ))}
        </div>

        <GLine/>

        {/* Soon notice */}
        <div style={{
          padding:"10px 14px",borderRadius:12,
          background:"rgba(255,255,255,0.05)",
          border:`1px solid rgba(255,255,255,0.1)`,
          fontSize:12,color:C.muted,textAlign:"center",
          marginBottom:14,lineHeight:1.5,
        }}>
          ℹ️ {t.unlockSoon}
        </div>

        {/* CTA Button */}
        <button style={{
          width:"100%",padding:"16px 0",
          border:"none",borderRadius:16,
          background:isPlus
            ?`linear-gradient(135deg,${C.purple},#6c3483)`
            :`linear-gradient(135deg,${C.blue},${C.gold})`,
          fontFamily:"'Cinzel',serif",fontSize:14,
          fontWeight:700,letterSpacing:2,color:C.white,
          cursor:"pointer",
          boxShadow:`0 8px 24px ${isPlus?"rgba(142,68,173,0.4)":"rgba(26,111,212,0.4)"}`,
          marginBottom:10,
          position:"relative",overflow:"hidden",
        }}>
          <span style={{position:"relative",zIndex:1}}>
            {isPlus?t.unlockPremiumPlus:t.unlockPremium}
          </span>
          <div style={{position:"absolute",top:0,left:"-100%",
            width:"60%",height:"100%",
            background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
            animation:"shimmer 3s ease-in-out infinite 1s"}}/>
        </button>

        <button onClick={onClose} style={{
          width:"100%",padding:"12px 0",
          border:`1px solid rgba(255,255,255,0.15)`,
          borderRadius:14,background:"transparent",
          fontFamily:"'Nunito',sans-serif",fontSize:13,
          fontWeight:600,color:C.muted,cursor:"pointer",
        }}>{t.unlockClose}</button>
      </div>
    </div>
  );
}

// ── PLAN CARD ─────────────────────────────────
function PlanCard({userPlan,t,lang}) {
  const plan=PLANS[userPlan]||PLANS.free;
  const labels={
    fr:{free:"Gratuit · 2 leçons/module · Fonctions de base",premium:"9$/mois · Accès complet à tous les modules",premium_plus:"25$/mois · Contenu complet + Assistant IA maritime"},
    en:{free:"Free · 2 lessons/module · Basic features",premium:"$9/month · Full access to all modules",premium_plus:"$25/month · Full content + Maritime AI Assistant"},
    es:{free:"Gratis · 2 lecciones/módulo · Funciones básicas",premium:"9$/mes · Acceso completo a todos los módulos",premium_plus:"25$/mes · Contenido completo + Asistente IA Marítimo"},
    pt:{free:"Grátis · 2 lições/módulo · Funções básicas",premium:"9$/mês · Acesso completo a todos os módulos",premium_plus:"25$/mês · Conteúdo completo + Assistente IA Marítimo"},
  };
  const desc=(labels[lang]||labels.fr)[userPlan];

  return (
    <div style={{
      background:`linear-gradient(135deg,${plan.color}15,rgba(13,31,60,0.8))`,
      border:`1px solid ${plan.color}44`,
      borderRadius:16,padding:"12px 14px",
      marginBottom:14,
      display:"flex",alignItems:"center",gap:12,
    }}>
      <div style={{
        width:42,height:42,borderRadius:12,flexShrink:0,
        background:`${plan.color}22`,
        border:`1px solid ${plan.color}44`,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:20,
      }}>{plan.icon}</div>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
          <div style={{fontSize:10,color:C.muted,letterSpacing:1,
            fontFamily:"'Cinzel',serif"}}>{t.yourPlan}</div>
          <PlanBadge access={userPlan} t={t} small/>
        </div>
        <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{desc}</div>
      </div>
    </div>
  );
}

// ── MODULE PROGRESS (shared between ModuleCard and the Dashboard global summary) ──
function getModuleProgress(module,completedLessons){
  const rawLessons=Array.isArray(module.lessons)?module.lessons:[];
  const total=module.totalLessons||rawLessons.length||0;
  const lessonsList=rawLessons.length>0?rawLessons:Array.from({length:total},(_,i)=>({id:`l${i+1}`}));
  const doneCount=lessonsList.filter(l=>completedLessons.includes(`${module.id}-${l.id}`)).length;
  const pct=total>0?Math.round((doneCount/total)*100):(module.progress||0);
  const isDone=total>0?doneCount>=total:module.status==="completed";
  return {total,lessonsList,doneCount,pct,isDone};
}

// ── MODULE CARD ───────────────────────────────
function ModuleCard({module,lang,t,userPlan,onStart,onUnlock,completedLessons=[]}) {
  const hasAccess=canAccess(userPlan,module.access);
  const isComing=module.status==="coming";
  const isLocked=!hasAccess&&!isComing;

  const moduleColor=module.color;

  // Compute progress from completed lessons (overrides hardcoded module.progress/status)
  const {total,lessonsList,doneCount,pct:computedPct,isDone}=getModuleProgress(module,completedLessons);
  const isProgress=hasAccess&&!isDone&&(doneCount>0||module.status==="inProgress");
  const isAvail=hasAccess&&!isDone&&!isProgress&&module.status==="available";

  return (
    <div style={{
      borderRadius:20,padding:"14px",
      background:isLocked
        ?"rgba(13,31,60,0.4)"
        :"rgba(13,31,60,0.8)",
      border:`1px solid ${isAvail||isProgress||isDone
        ?moduleColor+"44":"rgba(255,255,255,0.06)"}`,
      opacity:isLocked?0.7:1,
      transition:"all 0.2s",
      position:"relative",overflow:"hidden",
    }}>

      {/* Plan badge top right */}
      <div style={{position:"absolute",top:10,right:10,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
        <PlanBadge access={module.access} t={t} small/>
        {module.isAI&&(
          <div style={{
            fontSize:8,padding:"2px 6px",borderRadius:8,
            background:"rgba(142,68,173,0.2)",
            border:`1px solid ${C.purple}44`,
            color:C.purple,fontWeight:700,letterSpacing:0.5,
          }}>🤖 IA</div>
        )}
      </div>

      {/* Coming soon */}
      {isComing&&(
        <div style={{
          position:"absolute",top:10,right:10,
          fontSize:9,padding:"2px 7px",borderRadius:10,
          background:"rgba(201,146,42,0.15)",
          border:`1px solid ${C.gold}33`,
          color:C.gold,letterSpacing:1,
          fontFamily:"'Cinzel',serif",
        }}>{t.comingSoon}</div>
      )}

      <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
        {/* Icon */}
        <div style={{
          width:46,height:46,borderRadius:13,flexShrink:0,
          background:isLocked?"rgba(255,255,255,0.05)":`${moduleColor}22`,
          border:`1px solid ${isLocked?"rgba(255,255,255,0.08)":moduleColor+"44"}`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:20,
        }}>
          {isLocked?"🔒":module.icon}
        </div>

        {/* Content */}
        <div style={{flex:1,minWidth:0,paddingRight:50}}>
          <div style={{fontSize:13,fontWeight:700,
            color:isLocked?"rgba(240,244,255,0.5)":C.white,
            marginBottom:3,lineHeight:1.3}}>
            {module.title[lang]||module.title.fr}
          </div>
          <div style={{fontSize:11,color:C.muted,
            lineHeight:1.4,marginBottom:8}}>
            {module.desc[lang]||module.desc.fr}
          </div>

          {/* Free lessons indicator */}
          {module.freeLessons>0&&module.access==="free"&&(
            <div style={{
              fontSize:10,color:C.free,marginBottom:6,
              fontWeight:600,
            }}>🆓 {module.freeLessons} {t.freeLessons}</div>
          )}
          {module.freeLessons>0&&module.access!=="free"&&(
            <div style={{
              fontSize:10,color:C.free,marginBottom:6,
              fontWeight:600,
            }}>🆓 {module.freeLessons} {t.freeLessons}</div>
          )}

          {/* Progress bar */}
          {!isComing&&hasAccess&&(
            <div style={{marginBottom:8}}>
              <div style={{height:3,borderRadius:3,
                background:"rgba(255,255,255,0.08)",overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:3,
                  width:`${computedPct}%`,
                  background:`linear-gradient(90deg,${moduleColor},${C.gold2})`,
                  transition:"width 0.5s ease"}}/>
              </div>
              {total>0&&(
                <div style={{
                  marginTop:4,fontSize:9,color:C.muted,
                  display:"flex",justifyContent:"space-between",
                  fontFamily:"'Cinzel',serif",letterSpacing:0.6,
                }}>
                  <span>{doneCount}/{total} {t.lessons}</span>
                  <span style={{color:isDone?C.gold2:C.muted}}>{computedPct}%</span>
                </div>
              )}
            </div>
          )}

          {/* Lesson tracker */}
          {total>0&&(
            <div style={{marginBottom:8}}>
              <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:4}}>
                {lessonsList.map((lesson,idx)=>{
                  const key=`${module.id}-${lesson.id}`;
                  const isCompleted=completedLessons.includes(key);
                  const isInProgress=!isCompleted&&idx===doneCount;
                  let bg,border,color;
                  if(isCompleted){
                    bg=`${C.green}22`;border=`${C.green}66`;color=C.green;
                  }else if(isInProgress){
                    bg=`${C.gold}18`;border=`${C.gold}66`;color=C.gold;
                  }else{
                    bg="rgba(255,255,255,0.05)";border="rgba(255,255,255,0.1)";color="rgba(240,244,255,0.35)";
                  }
                  return(
                    <div key={key} title={lesson.title?.[lang]||lesson.title?.fr||`L${idx+1}`} style={{
                      width:22,height:22,borderRadius:6,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:9,fontWeight:700,
                      background:bg,border:`1px solid ${border}`,color,
                      flexShrink:0,
                    }}>{idx+1}</div>
                  );
                })}
              </div>
              <div style={{fontSize:9,color:C.muted,display:"flex",gap:8,flexWrap:"wrap"}}>
                {doneCount>0&&<span style={{color:C.green}}>✓ {doneCount} {t.completed.toLowerCase().replace(" ✓","")}</span>}
                {doneCount<total&&<span style={{color:C.gold}}>→ {t.inProgress.toLowerCase()}</span>}
                {total-doneCount>0&&<span style={{color:"rgba(240,244,255,0.35)"}}>··· {total-doneCount} {t.upcoming}</span>}
              </div>
            </div>
          )}

          {/* Meta */}
          <div style={{display:"flex",alignItems:"center",
            justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {module.totalLessons>0&&(
                <span style={{fontSize:10,color:C.muted}}>
                  📚 {module.totalLessons} {t.lessons}
                </span>
              )}
              {module.xp>0&&(
                <span style={{fontSize:10,color:C.gold2}}>
                  ⭐ {module.xp} {t.xp}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action button */}
      {(isAvail||isProgress)&&(
        <button onClick={()=>onStart(module)} style={{
          width:"100%",padding:"10px 0",marginTop:12,
          border:"none",borderRadius:12,
          background:`linear-gradient(135deg,${moduleColor}88,${C.navy3})`,
          border:`1px solid ${moduleColor}55`,
          fontFamily:"'Cinzel',serif",fontSize:11,
          fontWeight:700,letterSpacing:1.5,color:C.white,
          cursor:"pointer",
        }}>{isProgress?t.continueBtn:t.startBtn}</button>
      )}

      {isLocked&&(
        <button onClick={()=>onUnlock(module)} style={{
          width:"100%",padding:"10px 0",marginTop:12,
          border:`1px solid ${module.access==="premium_plus"?C.purple:C.gold}44`,
          borderRadius:12,
          background:module.access==="premium_plus"
            ?"rgba(142,68,173,0.1)"
            :"rgba(201,146,42,0.08)",
          fontFamily:"'Cinzel',serif",fontSize:11,
          fontWeight:700,letterSpacing:1,
          color:module.access==="premium_plus"?C.purple:C.gold,
          cursor:"pointer",
        }}>
          {module.access==="premium_plus"
            ?`👑 ${t.unlockPremiumPlus}`
            :`⭐ ${t.unlockPremium}`}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
//  MAIN DASHBOARD
// ══════════════════════════════════════════════
export default function Dashboard({
  lang="fr",
  username="Marin",
  photo=null,
  profile={},
  userPlan="free",
  userXP=0,
userStreak=1,
  userLevel="cadet",
  completedLessons=[],
  onViewStatus=()=>{},
  onEditProfile=()=>{},
  onStartModule=()=>{},
  onUpgrade=()=>{},
  onNavHome=()=>{},
  onNavModules=()=>{},
  onNavShips=()=>{},
  onNavProfile=()=>{},
  activeNav="home",
  onAdmin=()=>{},
  onChangeLanguage=()=>{},
  onChangeDepartment=()=>{},
  onResetProfile=()=>{},
  onSignOut=()=>{},
}) {
  const t=T[lang]||T.fr;
  const [activeTab,setActiveTab]=useState(
    profile?.dept==="engine"?"engine":"deck"
  );
  const [vis,setVis]=useState(false);
  const [unlockModal,setUnlockModal]=useState(null);
  const [stats]=useState({lessons:0,certs:0});
  const [showAdmin,setShowAdmin]=useState(false);
  const [showUpgrade,setShowUpgrade]=useState(false);
  const [premiumTick,setPremiumTick]=useState(0);
  const [showSettings,setShowSettings]=useState(false);
  const [settingsView,setSettingsView]=useState("main"); // main | lang | dept | about
  const logoTapsRef = (typeof window!=="undefined") ? (window as any).__logoTapsRef || ((window as any).__logoTapsRef = {count:0, last:0}) : {count:0,last:0};
  const handleLogoTap = ()=>{
    const now = Date.now();
    if (now - logoTapsRef.last > 600) logoTapsRef.count = 0;
    logoTapsRef.last = now;
    logoTapsRef.count += 1;
    if (logoTapsRef.count >= 7) { logoTapsRef.count = 0; setShowAdmin(true); }
  };

  const hasPremium = (typeof window !== "undefined") && PremiumManager.hasAccess();
  const effectivePlan = hasPremium && userPlan === "free" ? "premium" : userPlan;

  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);

  const hour=new Date().getHours();
  const greeting=hour<12?t.greeting_morning:
    hour<17?t.greeting_afternoon:
    hour<21?t.greeting_evening:t.greeting_night;

  const name=(username||"Marin").split(" ")[0];
  const initials=name.slice(0,2).toUpperCase();

  const levelLabels={
    fr:{cadet:"⛵ Cadet",officer:"🧭 Officier",master:"🔱 Maître",captain:"👑 Capitaine"},
    en:{cadet:"⛵ Cadet",officer:"🧭 Officer",master:"🔱 Master",captain:"👑 Captain"},
    es:{cadet:"⛵ Cadete",officer:"🧭 Oficial",master:"🔱 Maestro",captain:"👑 Capitán"},
    pt:{cadet:"⛵ Cadete",officer:"🧭 Oficial",master:"🔱 Mestre",captain:"👑 Capitão"},
  };
  const currentLevelLabel=(levelLabels[lang]||levelLabels.fr)[userLevel]||"⛵ Cadet";

  const tabs=[
    {key:"deck",label:t.tabDeck},
    {key:"engine",label:t.tabEngine},
    {key:"safety",label:t.tabSafety},
    {key:"tools",label:t.tabTools},
  ];

  const currentModules=MODULES[activeTab]||[];
  void premiumTick;

  // Global progress — same per-module lesson completion logic as ModuleCard, aggregated
  const allModules=Object.values(MODULES).flat();
  const totalModules=allModules.length;
  const moduleProgresses=allModules.map(m=>getModuleProgress(m,completedLessons));
  const completedModules=moduleProgresses.filter(p=>p.isDone).length;
  const totalLessonsAll=moduleProgresses.reduce((sum,p)=>sum+p.total,0);
  const doneLessonsAll=moduleProgresses.reduce((sum,p)=>sum+p.doneCount,0);
  const globalPct=totalLessonsAll>0?Math.round((doneLessonsAll/totalLessonsAll)*100):0;

  // Free modules count
  const freeModules=allModules.filter(m=>m.access==="free").length;

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",
      overflowX:"hidden",position:"relative",
    }}>
      <Stars/>

      {/* UNLOCK MODAL */}
      <UnlockModal
        module={unlockModal} t={t} lang={lang}
        onClose={()=>setUnlockModal(null)}
      />

      {/* TOPBAR */}
      <div style={{
        position:"sticky",top:0,zIndex:100,
        background:"rgba(6,14,26,0.97)",
        backdropFilter:"blur(14px)",
        borderBottom:`1px solid ${C.border}`,
        height:54,display:"flex",alignItems:"center",
        justifyContent:"space-between",padding:"0 16px",
      }}>
        <div onClick={handleLogoTap} style={{display:"flex",alignItems:"center",gap:10,cursor:"default",userSelect:"none"}}>
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="42" stroke={C.gold} strokeWidth="3" fill="none" opacity="0.5"/>
            {[0,60,120,180,240,300].map((a,i)=>{const r=a*Math.PI/180;return <line key={i} x1={50+18*Math.sin(r)} y1={50-18*Math.cos(r)} x2={50+38*Math.sin(r)} y2={50-38*Math.cos(r)} stroke={C.gold2} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>;})}
            <circle cx="50" cy="50" r="16" stroke={C.gold} strokeWidth="2" fill={C.navy3}/>
            <circle cx="50" cy="40" r="4" stroke={C.blue2} strokeWidth="2" fill="none"/>
            <line x1="50" y1="44" x2="50" y2="60" stroke={C.blue2} strokeWidth="2"/>
            <line x1="42" y1="49" x2="58" y2="49" stroke={C.blue2} strokeWidth="2"/>
          </svg>
          <div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:700,color:C.white,letterSpacing:1,lineHeight:1}}>MARITIME ACADEMY</div>
            <div style={{fontSize:9,color:C.gold,letterSpacing:1}}>PRO</div>
          </div>
        </div>
        {/* Plan + Avatar */}
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {effectivePlan==="free" && (
            <button onClick={()=>setShowUpgrade(true)} style={{
              padding:"5px 10px",borderRadius:14,
              background:`linear-gradient(135deg,${C.gold},${C.gold2})`,
              border:"none",color:C.navy,fontSize:10,fontWeight:800,
              cursor:"pointer",fontFamily:"'Cinzel',serif",letterSpacing:0.5,
              boxShadow:"0 2px 10px rgba(201,146,42,0.4)",whiteSpace:"nowrap",
            }}>⭐ {lang==="fr"?"Essai Premium":lang==="es"?"Probar Premium":lang==="pt"?"Testar Premium":"Try Premium"}</button>
          )}
          <PlanBadge access={effectivePlan} t={t} small/>
          <button onClick={()=>{ setSettingsView("main"); setShowSettings(true); }} aria-label="Settings" style={{
            width:34,height:34,borderRadius:"50%",
            background:"rgba(255,255,255,0.08)",
            border:`1px solid ${C.border}`,
            color:C.white,fontSize:16,cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
          }}>⚙️</button>
          <button onClick={onViewStatus} style={{
            width:36,height:36,borderRadius:"50%",
            background:photo?`url(${photo}) center/cover`
              :`linear-gradient(135deg,${C.blue},${C.gold})`,
            border:`2px solid ${C.gold}55`,
            display:"flex",alignItems:"center",justifyContent:"center",
            cursor:"pointer",fontSize:13,fontWeight:700,
            color:C.white,fontFamily:"'Cinzel',serif",flexShrink:0,
          }}>{!photo&&initials}</button>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{
        padding:"20px 16px 100px",
        position:"relative",zIndex:1,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",
        transition:"all 0.5s ease",
      }}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {/* GREETING */}
          <div style={{marginBottom:16}}>
            <div style={{fontSize:13,color:C.muted,marginBottom:2}}>{greeting},</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:6}}>{name.toUpperCase()} 👋</div>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <div style={{fontSize:12,padding:"4px 12px",borderRadius:20,background:"rgba(77,166,255,0.15)",border:`1px solid ${C.blue2}44`,color:C.blue2,fontWeight:700}}>{currentLevelLabel}</div>
              {stats.streak>0&&(
                <div style={{fontSize:12,padding:"4px 10px",borderRadius:20,background:"rgba(230,126,34,0.15)",border:"1px solid rgba(230,126,34,0.3)",color:C.orange,fontWeight:700,animation:"streakBounce 2s ease-in-out infinite"}}>🔥 {stats.streak}</div>
              )}
            </div>
          </div>

          {/* PLAN CARD */}
          <PlanCard userPlan={effectivePlan} t={t} lang={lang}/>

          {/* PROGRESS */}
          <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:20,padding:"14px",marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:11,letterSpacing:2,color:C.gold,fontFamily:"'Cinzel',serif"}}>{t.yourProgress}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,color:C.blue2}}>{globalPct}%</div>
            </div>
            <div style={{height:6,borderRadius:6,background:"rgba(255,255,255,0.08)",overflow:"hidden",marginBottom:6}}>
              <div style={{height:"100%",borderRadius:6,width:`${globalPct}%`,background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,transition:"width 0.8s ease",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,bottom:0,width:"40%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",animation:"shimmer 2s ease-in-out infinite"}}/>
              </div>
            </div>
            <div style={{fontSize:11,color:C.muted}}>{t.globalProgress} · {completedModules}/{totalModules} modules</div>
          </div>

          {/* QUICK STATS */}
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,letterSpacing:3,color:C.muted,marginBottom:8,fontFamily:"'Cinzel',serif"}}>{t.quickStats}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {[
                {val:completedLessons.length,label:t.statLessons,color:C.blue2},
{val:stats.certs,label:t.statCerts,color:C.gold2},
{val:userXP,label:t.statPoints,color:C.orange},
{val:`🔥${userStreak}`,label:t.statStreak,color:C.red},
              ].map(s=>(
                <div key={s.label} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"10px 6px",textAlign:"center"}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:800,color:s.color}}>{s.val}</div>
                  <div style={{fontSize:9,color:C.muted,letterSpacing:0.5,marginTop:2}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* UPGRADE BANNER (free users only) */}
          {effectivePlan==="free"&&(
            <div style={{
              background:`linear-gradient(135deg,rgba(201,146,42,0.15),rgba(26,111,212,0.1))`,
              border:`1px solid ${C.gold}44`,
              borderRadius:18,padding:"14px 16px",
              marginBottom:16,
              position:"relative",overflow:"hidden",
            }}>
              <div style={{position:"absolute",top:0,left:"-100%",width:"60%",height:"100%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)",animation:"shimmer 4s ease-in-out infinite 1s"}}/>
              <div style={{fontSize:11,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                {lang==="fr"?"PASSE AU NIVEAU SUPÉRIEUR":lang==="es"?"SUBE DE NIVEL":lang==="pt"?"SUBA DE NÍVEL":"LEVEL UP"}
              </div>
              {/* Plans comparison */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                {[
                  {icon:"⭐",name:lang==="fr"?"Premium":lang==="es"?"Premium":lang==="pt"?"Premium":"Premium",price:"9$/mois",color:C.gold,desc:lang==="fr"?"Tous les modules":lang==="es"?"Todos los módulos":lang==="pt"?"Todos os módulos":"All modules"},
                  {icon:"👑",name:"Premium+",price:"25$/mois",color:C.purple,desc:lang==="fr"?"+ IA Maritime":lang==="es"?"+ IA Marítima":lang==="pt"?"+ IA Marítima":"+ Maritime AI"},
                ].map((plan,i)=>(
                  <div key={i} style={{
                    padding:"10px",borderRadius:12,
                    background:`${plan.color}12`,
                    border:`1px solid ${plan.color}44`,
                    textAlign:"center",
                  }}>
                    <div style={{fontSize:18,marginBottom:4}}>{plan.icon}</div>
                    <div style={{fontSize:11,fontWeight:700,color:plan.color,marginBottom:2}}>{plan.name}</div>
                    <div style={{fontSize:13,fontWeight:800,color:C.white,marginBottom:2}}>{plan.price}</div>
                    <div style={{fontSize:9,color:C.muted}}>{plan.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:10,color:C.muted,textAlign:"center"}}>
                {lang==="fr"?"Disponible au lancement · Stripe sécurisé":lang==="es"?"Disponible en el lanzamiento · Stripe seguro":lang==="pt"?"Disponível no lançamento · Stripe seguro":"Available at launch · Secure Stripe"}
              </div>
            </div>
          )}

          {/* DIVIDER */}
          <div style={{height:1,margin:"0 0 16px",background:`linear-gradient(90deg,transparent,${C.gold}44,${C.blue2}44,transparent)`}}/>

          {/* TABS */}
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none"}}>
              {tabs.map(tab=>(
                <button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{
                  padding:"9px 14px",borderRadius:12,
                  background:activeTab===tab.key?`linear-gradient(135deg,${C.blue}55,${C.gold}33)`:"rgba(255,255,255,0.05)",
                  border:`1.5px solid ${activeTab===tab.key?C.gold:"rgba(255,255,255,0.1)"}`,
                  color:activeTab===tab.key?C.white:C.muted,
                  fontSize:12,fontWeight:activeTab===tab.key?700:400,
                  cursor:"pointer",whiteSpace:"nowrap",
                  fontFamily:"'Nunito',sans-serif",flexShrink:0,
                  transition:"all 0.2s",
                }}>{tab.label}</button>
              ))}
            </div>
          </div>

          {/* MODULES */}
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
            {currentModules.map(module=>(
              <ModuleCard
                key={module.id}
                module={module}
                lang={lang}
                t={t}
                userPlan={effectivePlan}
                completedLessons={completedLessons}
                onStart={onStartModule}
                onUnlock={setUnlockModal}
              />
            ))}
          </div>

          {/* BOTTOM ACTIONS */}
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <button onClick={onViewStatus} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 6px 24px rgba(26,111,212,0.35)"}}>{t.viewStatus}</button>
            <button onClick={onEditProfile} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.editProfile}</button>
          </div>

        </div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:100,
        background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",
        borderTop:`1px solid ${C.border}`,
        height:64,display:"flex",alignItems:"center",
        justifyContent:"space-around",padding:"0 8px",
      }}>
        {[
          {icon:"🏠",labelKey:"navHome",key:"home",onClick:onNavHome},
          {icon:"📚",labelKey:"navModules",key:"modules",onClick:onNavModules},
          {icon:"🚢",labelKey:"navShips",key:"ships",onClick:onNavShips},
          {icon:"👤",labelKey:"navProfile",key:"profile",onClick:onNavProfile},
        ].map((item,i)=>{
          const active = activeNav===item.key;
          return (
          <button key={i} onClick={item.onClick} style={{
            display:"flex",flexDirection:"column",alignItems:"center",gap:3,
            background:active?"rgba(201,146,42,0.1)":"transparent",
            border:"none",cursor:"pointer",padding:"6px 12px",borderRadius:10,
          }}>
            <span style={{fontSize:20}}>{item.icon}</span>
            <span style={{fontSize:9,letterSpacing:0.5,color:active?C.gold2:C.muted,fontWeight:active?700:400}}>
              {t[item.labelKey]}
            </span>
          </button>
        );})}
      </div>

      {showUpgrade && (
        <UpgradeModal
          lang={lang}
          onClose={()=>{ setShowUpgrade(false); setPremiumTick(t=>t+1); }}
          onTrialStart={()=>setPremiumTick(t=>t+1)}
        />
      )}
      {showAdmin && (
        <AdminPanel onClose={()=>{ setShowAdmin(false); setPremiumTick(t=>t+1); }}/>
      )}
      {showSettings && (
        <SettingsMenu
          lang={lang}
          view={settingsView}
          setView={setSettingsView}
          currentDept={profile?.dept || "deck"}
          onClose={()=>setShowSettings(false)}
          onChangeLanguage={(code)=>{ onChangeLanguage(code); setShowSettings(false); }}
          onChangeDepartment={(d)=>{ onChangeDepartment(d); setActiveTab(d); setShowSettings(false); }}
          onResetProfile={()=>{ setShowSettings(false); onResetProfile(); }}
      onSignOut={()=>{ setShowSettings(false); onSignOut?.(); }} 
          />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
//  SETTINGS MENU
// ══════════════════════════════════════════════
 function SettingsMenu({ lang, view, setView, currentDept, onClose, onChangeLanguage, onChangeDepartment, onResetProfile, onSignOut }) {
  const L = {
    fr:{ title:"Paramètres", lang:"Changer de langue", dept:"Changer de département", reset:"Réinitialiser le profil", about:"À propos", close:"Fermer", back:"◀ Retour", deck:"🧭 Pont", engine:"⚙️ Machine", confirmReset:"Cela effacera ton profil et ta progression. Continuer ?", aboutTxt:"Maritime Academy Pro — Formation maritime IMO/STCW. © Independencia.", signOut:"Se déconnecter", confirmSignOut:"Tu vas être déconnecté(e). Continuer ?" },
    en:{ title:"Settings", lang:"Change language", dept:"Change department", reset:"Reset profile", about:"About", close:"Close", back:"◀ Back", deck:"🧭 Deck", engine:"⚙️ Engine", confirmReset:"This will erase your profile and progress. Continue?", aboutTxt:"Maritime Academy Pro — IMO/STCW maritime training. © Independencia.", signOut:"Sign out",confirmSignOut:"You will be signed out. Continue?"  },
    es:{ title:"Ajustes", lang:"Cambiar idioma", dept:"Cambiar departamento", reset:"Restablecer perfil", about:"Acerca de", close:"Cerrar", back:"◀ Volver", deck:"🧭 Puente", engine:"⚙️ Máquinas", confirmReset:"Esto borrará tu perfil y progreso. ¿Continuar?", aboutTxt:"Maritime Academy Pro — Formación marítima IMO/STCW. © Independencia.", signOut:"Cerrar sesión",confirmSignOut:"Se cerrará tu sesión. ¿Continuar?" },
    pt:{ title:"Configurações", lang:"Mudar idioma", dept:"Mudar departamento", reset:"Redefinir perfil", about:"Sobre", close:"Fechar", back:"◀ Voltar", deck:"🧭 Convés", engine:"⚙️ Máquinas", confirmReset:"Isso apagará seu perfil e progresso. Continuar?", aboutTxt:"Maritime Academy Pro — Formação marítima IMO/STCW. © Independencia.", signOut:"Sair",confirmSignOut:"Você será desconectado. Continuar?" },
  }[lang] || null;
  const t = L || { title:"Settings", lang:"Change language", dept:"Change department", reset:"Reset profile", about:"About", close:"Close", back:"◀ Back", deck:"🧭 Deck", engine:"⚙️ Engine", confirmReset:"Erase profile?", aboutTxt:"Maritime Academy Pro" };
  const langs = [
    { code:"fr", flag:"🇫🇷", name:"Français" },
    { code:"en", flag:"🇬🇧", name:"English" },
    { code:"es", flag:"🇪🇸", name:"Español" },
    { code:"pt", flag:"🇧🇷", name:"Português" },
  ];
  const item = {
    width:"100%", padding:"14px 16px", borderRadius:12,
    background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`,
    color:C.white, fontSize:14, fontWeight:600, textAlign:"left",
    cursor:"pointer", display:"flex", alignItems:"center", gap:12,
    fontFamily:"'Nunito',sans-serif",
  };
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:200,
      background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"flex-end", justifyContent:"center",
    }}>
      <div onClick={(e)=>e.stopPropagation()} style={{
        width:"100%", maxWidth:440, maxHeight:"80vh", overflowY:"auto",
        background:`linear-gradient(160deg,${C.navy3},${C.navy})`,
        borderTop:`2px solid ${C.gold}`,
        borderRadius:"20px 20px 0 0", padding:"18px 18px 28px",
        fontFamily:"'Nunito',sans-serif", color:C.white,
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:700,letterSpacing:1,color:C.gold}}>
            {view==="main" ? t.title : view==="lang" ? t.lang : view==="dept" ? t.dept : t.about}
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.white,fontSize:22,cursor:"pointer"}}>×</button>
        </div>
        {view !== "main" && (
          <button onClick={()=>setView("main")} style={{
            ...item, marginBottom:10, background:"transparent", border:"none", color:C.muted, padding:"6px 0",
          }}>{t.back}</button>
        )}
        {view==="main" && (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <button style={item} onClick={()=>setView("lang")}>🌐 <span>{t.lang}</span></button>
            <button style={item} onClick={()=>setView("dept")}>🚢 <span>{t.dept}</span></button>
            <button style={item} onClick={()=>setView("about")}>ℹ️ <span>{t.about}</span></button>
            <button style={{...item, borderColor:`${C.red}55`, color:"#ff8a7a"}} onClick={()=>{
  if (typeof window !== "undefined" && window.confirm(t.confirmSignOut)) onSignOut();
}}>🚪 <span>{t.signOut}</span></button>
          </div>
        )}
        {view==="lang" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {langs.map(l => (
              <button key={l.code} style={{...item, justifyContent:"flex-start"}} onClick={()=>onChangeLanguage(l.code)}>
                <span style={{fontSize:22}}>{l.flag}</span><span>{l.name}</span>
              </button>
            ))}
          </div>
        )}
        {view==="dept" && (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <button style={{...item, borderColor: currentDept==="deck"?C.gold:C.border}} onClick={()=>onChangeDepartment("deck")}>{t.deck}</button>
            <button style={{...item, borderColor: currentDept==="engine"?C.gold:C.border}} onClick={()=>onChangeDepartment("engine")}>{t.engine}</button>
          </div>
        )}
        {view==="about" && (
          <div style={{fontSize:13,color:C.muted,lineHeight:1.6,padding:"8px 4px"}}>{t.aboutTxt}</div>
        )}
      </div>
    </div>
  );
}
