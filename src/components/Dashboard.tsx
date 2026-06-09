// @ts-nocheck
import { useState, useEffect } from "react";

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

const canAccess = (userPlan, moduleAccess) => {
  const order = { free:0, premium:1, premium_plus:2 };
  return order[userPlan] >= order[moduleAccess];
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
    inProgress:"En cours", completed:"Terminé ✓",
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
    inProgress:"In progress", completed:"Completed ✓",
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
    inProgress:"En progreso", completed:"Completado ✓",
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
    inProgress:"Em andamento", completed:"Concluído ✓",
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
      freeLessons:2, totalLessons:8,
      title:{fr:"Navigation & Cartographie",en:"Navigation & Cartography",es:"Navegación & Cartografía",pt:"Navegação & Cartografia"},
      desc:{fr:"Histoire, instruments, cartes, COLREG",en:"History, instruments, charts, COLREG",es:"Historia, instrumentos, cartas, COLREG",pt:"História, instrumentos, cartas, COLREG"},
      xp:400, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"Histoire & Instruments",en:"History & Instruments",es:"Historia & Instrumentos",pt:"História & Instrumentos"},access:"free",status:"available"},
        {id:"l2",title:{fr:"Le Navire",en:"The Ship",es:"El Buque",pt:"O Navio"},access:"free",status:"locked"},
        {id:"l3",title:{fr:"La Terre & Coordonnées",en:"Earth & Coordinates",es:"La Tierra & Coordenadas",pt:"A Terra & Coordenadas"},access:"premium",status:"locked"},
        {id:"l4",title:{fr:"La Carte Marine",en:"The Nautical Chart",es:"La Carta Náutica",pt:"A Carta Náutica"},access:"premium",status:"locked"},
        {id:"l5",title:{fr:"Le Compas & Les Caps",en:"Compass & Headings",es:"La Brújula & Los Rumbos",pt:"A Bússola & Os Rumos"},access:"premium",status:"locked"},
        {id:"l6",title:{fr:"Navigation Pratique",en:"Practical Navigation",es:"Navegación Práctica",pt:"Navegação Prática"},access:"premium",status:"locked"},
        {id:"l7",title:{fr:"Les Marées",en:"Tides",es:"Las Mareas",pt:"As Marés"},access:"premium",status:"locked"},
        {id:"l8",title:{fr:"COLREG Avancé",en:"Advanced COLREG",es:"COLREG Avanzado",pt:"COLREG Avançado"},access:"premium",status:"locked"},
      ]
    },
    { id:"d2", icon:"⚖️", color:C.gold, access:"premium",
      freeLessons:0, totalLessons:10,
      title:{fr:"Droit Maritime International",en:"International Maritime Law",es:"Derecho Marítimo Internacional",pt:"Direito Marítimo Internacional"},
      desc:{fr:"SOLAS, MARPOL, MLC 2006, STCW",en:"SOLAS, MARPOL, MLC 2006, STCW",es:"SOLAS, MARPOL, MLC 2006, STCW",pt:"SOLAS, MARPOL, MLC 2006, STCW"},
      xp:500, status:"locked", progress:0 },
    { id:"d3", icon:"🗺️", color:C.teal, access:"premium",
      freeLessons:0, totalLessons:7,
      title:{fr:"Signalisation & Balisage",en:"Signaling & Buoyage",es:"Señalización & Balizamiento",pt:"Sinalização & Balizamento"},
      desc:{fr:"AISM, pavillons, Morse, SMCP",en:"IALA, flags, Morse, SMCP",es:"IALA, banderas, Morse, SMCP",pt:"IALA, bandeiras, Morse, SMCP"},
      xp:350, status:"locked", progress:0 },
    { id:"d4", icon:"📡", color:"#9b59b6", access:"premium",
      freeLessons:0, totalLessons:6,
      title:{fr:"Anglais Maritime SMCP",en:"Maritime English SMCP",es:"Inglés Marítimo SMCP",pt:"Inglês Marítimo SMCP"},
      desc:{fr:"VHF, GMDSS, logbook, communications",en:"VHF, GMDSS, logbook, communications",es:"VHF, GMDSS, cuaderno, comunicaciones",pt:"VHF, GMDSS, diário de bordo, comunicações"},
      xp:300, status:"locked", progress:0 },
    { id:"d5", icon:"⛵", color:C.blue, access:"premium_plus",
      freeLessons:0, totalLessons:5,
      title:{fr:"Ship Career Navigator™",en:"Ship Career Navigator™",es:"Ship Career Navigator™",pt:"Ship Career Navigator™"},
      desc:{fr:"Feuille de route personnalisée par poste",en:"Personalized career roadmap by position",es:"Hoja de ruta personalizada por puesto",pt:"Roteiro personalizado por cargo"},
      xp:250, status:"locked", progress:0 },
  ],
  engine:[
    { id:"e1", icon:"⚙️", color:C.orange, access:"free",
      freeLessons:2, totalLessons:9,
      title:{fr:"Moteur Principal & Propulsion",en:"Main Engine & Propulsion",es:"Motor Principal & Propulsión",pt:"Motor Principal & Propulsão"},
      desc:{fr:"Diesel 2T/4T, MAN, Wärtsilä, HFO/LNG",en:"Diesel 2T/4T, MAN, Wärtsilä, HFO/LNG",es:"Diesel 2T/4T, MAN, Wärtsilä, HFO/LNG",pt:"Diesel 2T/4T, MAN, Wärtsilä, HFO/LNG"},
      xp:450, status:"available", progress:0 },
    { id:"e2", icon:"🔧", color:"#e74c3c", access:"premium",
      freeLessons:0, totalLessons:8,
      title:{fr:"Systèmes Auxiliaires",en:"Auxiliary Systems",es:"Sistemas Auxiliares",pt:"Sistemas Auxiliares"},
      desc:{fr:"Pompes, compresseurs, purificateurs",en:"Pumps, compressors, purifiers",es:"Bombas, compresores, purificadores",pt:"Bombas, compressores, purificadores"},
      xp:400, status:"locked", progress:0 },
    { id:"e3", icon:"⚡", color:C.gold2, access:"premium",
      freeLessons:0, totalLessons:7,
      title:{fr:"Production Électrique",en:"Electrical Generation",es:"Producción Eléctrica",pt:"Produção Elétrica"},
      desc:{fr:"Générateurs, tableau principal, charges",en:"Generators, main switchboard, loads",es:"Generadores, cuadro principal, cargas",pt:"Geradores, painel principal, cargas"},
      xp:350, status:"locked", progress:0 },
    { id:"e4", icon:"🌊", color:C.teal, access:"premium",
      freeLessons:0, totalLessons:6,
      title:{fr:"MARPOL Machine",en:"MARPOL Engine Room",es:"MARPOL Sala de Máquinas",pt:"MARPOL Sala de Máquinas"},
      desc:{fr:"Livre hydrocarbures, 15ppm, déchets",en:"Oil record book, 15ppm, waste management",es:"Libro de hidrocarburos, 15ppm, residuos",pt:"Livro de hidrocarbonetos, 15ppm, resíduos"},
      xp:300, status:"locked", progress:0 },
    { id:"e5", icon:"🍃", color:C.green, access:"premium_plus",
      freeLessons:0, totalLessons:5,
      title:{fr:"SEEMP & Efficacité Énergétique",en:"SEEMP & Energy Efficiency",es:"SEEMP & Eficiencia Energética",pt:"SEEMP & Eficiência Energética"},
      desc:{fr:"EEXI, CII, plan gestion énergie",en:"EEXI, CII, energy management plan",es:"EEXI, CII, plan de gestión energética",pt:"EEXI, CII, plano de gestão de energia"},
      xp:250, status:"locked", progress:0 },
  ],
  safety:[
    { id:"s1", icon:"🛟", color:C.red, access:"free",
      freeLessons:1, totalLessons:6,
      title:{fr:"COLREG — Règles de collision",en:"COLREG — Collision Regulations",es:"COLREG — Reglamento de abordajes",pt:"COLREG — Regulamento de abalroamentos"},
      desc:{fr:"Rules 5,8,13,14,15,16,17 + schémas",en:"Rules 5,8,13,14,15,16,17 + diagrams",es:"Reglas 5,8,13,14,15,16,17 + esquemas",pt:"Regras 5,8,13,14,15,16,17 + esquemas"},
      xp:300, status:"available", progress:0,
      lessons:[
        {id:"l1",title:{fr:"COLREG Introduction + Rules 14-17",en:"COLREG Intro + Rules 14-17",es:"COLREG Intro + Reglas 14-17",pt:"COLREG Intro + Regras 14-17"},access:"free",status:"available"},
        {id:"l2",title:{fr:"Les 38 règles — texte officiel",en:"The 38 rules — official text",es:"Las 38 reglas — texto oficial",pt:"As 38 regras — texto oficial"},access:"premium",status:"locked"},
        {id:"l3",title:{fr:"Feux et marques — tous les types",en:"Lights and shapes — all types",es:"Luces y marcas — todos los tipos",pt:"Luzes e marcas — todos os tipos"},access:"premium",status:"locked"},
        {id:"l4",title:{fr:"Signaux sonores et lumineux",en:"Sound and light signals",es:"Señales sonoras y luminosas",pt:"Sinais sonoros e luminosos"},access:"premium",status:"locked"},
        {id:"l5",title:{fr:"Exercices avancés — 50 scénarios",en:"Advanced exercises — 50 scenarios",es:"Ejercicios avanzados — 50 escenarios",pt:"Exercícios avançados — 50 cenários"},access:"premium",status:"locked"},
        {id:"l6",title:{fr:"Cas réels — Costa Concordia, Erika",en:"Real cases — Costa Concordia, Erika",es:"Casos reales — Costa Concordia, Erika",pt:"Casos reais — Costa Concordia, Erika"},access:"premium",status:"locked"},
      ]
    },
    { id:"s2", icon:"📡", color:C.blue2, access:"premium",
      freeLessons:0, totalLessons:5,
      title:{fr:"EPIRB, SART & GMDSS",en:"EPIRB, SART & GMDSS",es:"EPIRB, SART & GMDSS",pt:"EPIRB, SART & GMDSS"},
      desc:{fr:"Float-free, COSPAS-SARSAT, AIS-SART",en:"Float-free, COSPAS-SARSAT, AIS-SART",es:"Float-free, COSPAS-SARSAT, AIS-SART",pt:"Float-free, COSPAS-SARSAT, AIS-SART"},
      xp:250, status:"locked", progress:0 },
    { id:"s3", icon:"🩺", color:"#e74c3c", access:"premium",
      freeLessons:0, totalLessons:8,
      title:{fr:"Secourisme STCW",en:"STCW First Aid",es:"Primeros Auxilios STCW",pt:"Primeiros Socorros STCW"},
      desc:{fr:"EFA, MFA, MCC — RCP, MEDEVAC",en:"EFA, MFA, MCC — CPR, MEDEVAC",es:"EFA, MFA, MCC — RCP, MEDEVAC",pt:"EFA, MFA, MCC — RCP, MEDEVAC"},
      xp:400, status:"locked", progress:0 },
    { id:"s4", icon:"🔥", color:C.orange, access:"premium",
      freeLessons:0, totalLessons:7,
      title:{fr:"Lutte contre l'incendie",en:"Firefighting",es:"Lucha contra incendios",pt:"Combate a incêndios"},
      desc:{fr:"BST, extincteurs, équipes urgence",en:"BST, extinguishers, emergency teams",es:"BST, extintores, equipos de emergencia",pt:"BST, extintores, equipes de emergência"},
      xp:350, status:"locked", progress:0 },
    { id:"s5", icon:"👥", color:"#9b59b6", access:"premium",
      freeLessons:0, totalLessons:4,
      title:{fr:"Lifeboats, Liferafts & HRU",en:"Lifeboats, Liferafts & HRU",es:"Botes, Balsas & HRU",pt:"Botes, Balsas & HRU"},
      desc:{fr:"SOLAS, HRU, abandon navire, muster",en:"SOLAS, HRU, abandon ship, muster",es:"SOLAS, HRU, abandono, rol de abandono",pt:"SOLAS, HRU, abandono, lista de chamada"},
      xp:200, status:"locked", progress:0 },
  ],
  tools:[
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
      title:{fr:"Ship Career Navigator™",en:"Ship Career Navigator™",es:"Ship Career Navigator™",pt:"Ship Career Navigator™"},
      desc:{fr:"AB→Capitaine · Oiler→Chef Mécanicien · Yacht→Skipper",en:"AB→Captain · Oiler→Chief Engineer · Yacht→Skipper",es:"AB→Capitán · Oiler→Jefe Máqs · Yacht→Patrón",pt:"AB→Capitão · Oiler→Chefe Máqs · Iate→Skipper"},
      xp:0, status:"coming", progress:0 },
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
  const c=cfg[access]||cfg.free;
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
      fr:["👑 Tout Premium +","","🤖 Assistant IA Maritime 24h/24","🎯 Coaching personnalisé IA","💼 Simulation d'entretiens (Maersk, MSC, Offshore...)","📄 Génération de CV maritime + lettre de motivation","🚀 Conseils de carrière personnalisés par région","🔍 MarineVerify™ — vérification STCW","⛵ Ship Career Navigator™ avancé","","💰 25$/mois · Annulable à tout moment"],
      en:["👑 Everything in Premium +","","🤖 Maritime AI Assistant 24/7","🎯 AI personal coaching","💼 Interview simulation (Maersk, MSC, Offshore...)","📄 Maritime CV generation + cover letter","🚀 Personalized career advice by region","🔍 MarineVerify™ — STCW verification","⛵ Advanced Ship Career Navigator™","","💰 $25/month · Cancel anytime"],
      es:["👑 Todo Premium +","","🤖 Asistente IA Marítimo 24/7","🎯 Coaching personalizado IA","💼 Simulación entrevistas (Maersk, MSC, Offshore...)","📄 Generación CV marítimo + carta de motivación","🚀 Consejos de carrera personalizados por región","🔍 MarineVerify™ — verificación STCW","⛵ Ship Career Navigator™ avanzado","","💰 25$/mes · Cancelable en cualquier momento"],
      pt:["👑 Tudo Premium +","","🤖 Assistente IA Marítimo 24/7","🎯 Coaching personalizado IA","💼 Simulação entrevistas (Maersk, MSC, Offshore...)","📄 Geração de CV marítimo + carta de motivação","🚀 Conselhos de carreira personalizados por região","🔍 MarineVerify™ — verificação STCW","⛵ Ship Career Navigator™ avançado","","💰 25$/mês · Cancelável a qualquer momento"],
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

// ── MODULE CARD ───────────────────────────────
function ModuleCard({module,lang,t,userPlan,onStart,onUnlock}) {
  const hasAccess=canAccess(userPlan,module.access);
  const isComing=module.status==="coming";
  const isAvail=module.status==="available"&&hasAccess;
  const isDone=module.status==="completed";
  const isProgress=module.status==="inProgress"&&hasAccess;
  const isLocked=!hasAccess&&!isComing;

  const moduleColor=module.color;

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
                  width:`${module.progress||0}%`,
                  background:`linear-gradient(90deg,${moduleColor},${C.gold2})`,
                  transition:"width 0.5s ease"}}/>
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
  userLevel="cadet",
  onViewStatus=()=>{},
  onEditProfile=()=>{},
  onStartModule=()=>{},
  onUpgrade=()=>{},
  onNavHome=()=>{},
  onNavModules=()=>{},
  onNavShips=()=>{},
  onNavProfile=()=>{},
  activeNav="home",
}) {
  const t=T[lang]||T.fr;
  const [activeTab,setActiveTab]=useState(
    profile?.dept==="engine"?"engine":"deck"
  );
  const [vis,setVis]=useState(false);
  const [unlockModal,setUnlockModal]=useState(null);
  const [stats]=useState({lessons:0,certs:0,points:0,streak:1});

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

  // Global progress
  const allModules=Object.values(MODULES).flat();
  const totalModules=allModules.length;
  const completedModules=allModules.filter(m=>m.status==="completed").length;
  const globalPct=Math.round((completedModules/totalModules)*100);

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
        <div style={{display:"flex",alignItems:"center",gap:10}}>
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
          <PlanBadge access={userPlan} t={t} small/>
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
          <PlanCard userPlan={userPlan} t={t} lang={lang}/>

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
                {val:stats.lessons,label:t.statLessons,color:C.blue2},
                {val:stats.certs,label:t.statCerts,color:C.gold2},
                {val:stats.points,label:t.statPoints,color:C.orange},
                {val:`🔥${stats.streak}`,label:t.statStreak,color:C.red},
              ].map(s=>(
                <div key={s.label} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"10px 6px",textAlign:"center"}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:800,color:s.color}}>{s.val}</div>
                  <div style={{fontSize:9,color:C.muted,letterSpacing:0.5,marginTop:2}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* UPGRADE BANNER (free users only) */}
          {userPlan==="free"&&(
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
                userPlan={userPlan}
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
    </div>
  );
}
