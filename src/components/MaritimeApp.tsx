// @ts-nocheck
import { supabase } from "@/integrations/supabase/client";
import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
import QuestionnaireS7 from "./QuestionnaireS7";
import StatusCardS8 from "./StatusCardS8";
import Dashboard, { MODULES as ALL_MODULES } from "./Dashboard";
import LessonProgressBadge from "./LessonProgressBadge";
import RegisterS6 from "./RegisterS6";
import WelcomeS4 from "./WelcomeS4";
import { SplashS1, MusicS3, BridgeS5 } from "./SplashMusicBridge";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { MusicProvider, useMusic } from "./MusicProvider";
import { VESSEL_TYPE_REGISTRY, type VesselTypeId } from "@/core/vesselTypeRegistry";
import { SHIPS_LIBRARY_INDEX } from "@/core/shipsLibraryIndex";
import { getRanksByDepartment, getRankMeta } from "@/core/rankRegistry";
import { getSpecializedOperationsByVesselType } from "@/core/specializedOperationRegistry";
import type { SupportedLanguage } from "@/core/roleOnBoardRegistry";
const RoleOnBoardShared = lazy(() => import("./RoleOnBoardShared"));
const SpecializedLessonShared = lazy(() => import("./SpecializedLessonShared"));


// ── LAZY-LOADED LESSON COMPONENTS (code-split, only downloaded when opened) ──
const LessonNavigation = lazy(() => import("./LessonNavigation"));
const LessonCOLREG = lazy(() => import("./LessonCOLREG"));
const LessonCoord = lazy(() => import("./LessonCoord"));
const LessonCarteMarine = lazy(() => import("./LessonCarteMarine"));
const LessonCompas = lazy(() => import("./LessonCompas"));
const LessonNavPratique = lazy(() => import("./LessonNavPratique"));
const LessonMarees = lazy(() => import("./LessonMarees"));
const LessonNavire = lazy(() => import("./LessonNavire"));
const LessonMoteur = lazy(() => import("./LessonMoteur"));
const LessonAuxiliaires = lazy(() => import("./LessonAuxiliaires"));
const LessonStabilite = lazy(() => import("./LessonStabilite"));
const LessonE2_L1 = lazy(() => import("./LessonE2_L1"));
const LessonE2_L2 = lazy(() => import("./LessonE2_L2"));
const LessonE2_L3 = lazy(() => import("./LessonE2_L3"));
const LessonE2_L4 = lazy(() => import("./LessonE2_L4"));
const LessonE2_L5 = lazy(() => import("./LessonE2_L5"));
const LessonE2_L6 = lazy(() => import("./LessonE2_L6"));
const LessonE2_L7 = lazy(() => import("./LessonE2_L7"));
const LessonE3_L1 = lazy(() => import("./LessonE3_L1"));
const LessonE3_L2 = lazy(() => import("./LessonE3_L2"));
const LessonE3_L3 = lazy(() => import("./LessonE3_L3"));
const LessonE3_L4 = lazy(() => import("./LessonE3_L4"));
const LessonE3_L5 = lazy(() => import("./LessonE3_L5"));
const LessonE3_L6 = lazy(() => import("./LessonE3_L6"));
const LessonE6_L1 = lazy(() => import("./LessonE6_L1"));
const LessonE6_L2 = lazy(() => import("./LessonE6_L2"));
const LessonE6_L3 = lazy(() => import("./LessonE6_L3"));
const LessonE6_L4 = lazy(() => import("./LessonE6_L4"));
const LessonE6_L5 = lazy(() => import("./LessonE6_L5"));
const LessonE6_L6 = lazy(() => import("./LessonE6_L6"));
const LessonE7_L1 = lazy(() => import("./LessonE7_L1"));
const LessonE7_L2 = lazy(() => import("./LessonE7_L2"));
const LessonE7_L3 = lazy(() => import("./LessonE7_L3"));
const LessonE7_L4 = lazy(() => import("./LessonE7_L4"));
const LessonE7_L5 = lazy(() => import("./LessonE7_L5"));
const LessonIncendie = lazy(() => import("./LessonIncendie"));
const LessonSauvetage = lazy(() => import("./LessonSauvetage"));
const LessonMARPOL = lazy(() => import("./LessonMARPOL"));
const LessonMARPOL_L2 = lazy(() => import("./LessonMARPOL_L2"));
const LessonMARPOL_L3 = lazy(() => import("./LessonMARPOL_L3"));
const LessonMARPOL_L4 = lazy(() => import("./LessonMARPOL_L4"));
const LessonMARPOL_L5 = lazy(() => import("./LessonMARPOL_L5"));
const LessonMARPOL_L6 = lazy(() => import("./LessonMARPOL_L6"));
const LessonSEEMP_L1 = lazy(() => import("./LessonSEEMP_L1"));
const LessonSEEMP_L2 = lazy(() => import("./LessonSEEMP_L2"));
const LessonSEEMP_L3 = lazy(() => import("./LessonSEEMP_L3"));
const LessonSEEMP_L4 = lazy(() => import("./LessonSEEMP_L4"));
const LessonSEEMP_L5 = lazy(() => import("./LessonSEEMP_L5"));
const LessonWatchkeeping = lazy(() => import("./LessonWatchkeeping"));
const LessonMaintenance = lazy(() => import("./LessonMaintenance"));
const LessonEmergency = lazy(() => import("./LessonEmergency"));
const LessonSOLAS = lazy(() => import("./LessonSOLAS"));
const LessonMARPOLLegal = lazy(() => import("./LessonMARPOLLegal"));
const LessonSTCW = lazy(() => import("./LessonSTCW"));
const LessonMLC = lazy(() => import("./LessonMLC"));
const LessonCOLREGLegal = lazy(() => import("./LessonCOLREGLegal"));
const LessonUNCLOS = lazy(() => import("./LessonUNCLOS"));
const LessonLiabilityInsurance = lazy(() => import("./LessonLiabilityInsurance"));
const LessonPortsFlagStates = lazy(() => import("./LessonPortsFlagStates"));
const LessonPiracy = lazy(() => import("./LessonPiracy"));
const LessonArbitration = lazy(() => import("./LessonArbitration"));
const LessonIALA = lazy(() => import("./LessonIALA"));
const LessonLightsShapes = lazy(() => import("./LessonLightsShapes"));
const LessonSoundSignals = lazy(() => import("./LessonSoundSignals"));
const LessonFlags = lazy(() => import("./LessonFlags"));
const LessonVHF = lazy(() => import("./LessonVHF"));
const LessonAIS = lazy(() => import("./LessonAIS"));
const LessonGMDSS = lazy(() => import("./LessonGMDSS"));
const LessonSMCP_L1 = lazy(() => import("./LessonSMCP_L1"));
const LessonSteering = lazy(() => import("./LessonSteering"));
const LessonWatchOrganization = lazy(() => import("./LessonWatchOrganization"));
const LessonSMCP_L2 = lazy(() => import("./LessonSMCP_L2"));
const LessonSMCP_L3 = lazy(() => import("./LessonSMCP_L3"));
const LessonSMCP_L4 = lazy(() => import("./LessonSMCP_L4"));
const LessonSMCP_L5 = lazy(() => import("./LessonSMCP_L5"));
const LessonSMCP_L6 = lazy(() => import("./LessonSMCP_L6"));
const LessonSMCP_L7 = lazy(() => import("./LessonSMCP_L7"));
const LessonSMCP_L8 = lazy(() => import("./LessonSMCP_L8"));
const LessonSEA_L1 = lazy(() => import("./LessonSEA_L1"));
const LessonSEA_L2 = lazy(() => import("./LessonSEA_L2"));
const LessonSEA_L3 = lazy(() => import("./LessonSEA_L3"));
const LessonSEA_L4 = lazy(() => import("./LessonSEA_L4"));
const LessonSEA_L5 = lazy(() => import("./LessonSEA_L5"));
const LessonSEA_L6 = lazy(() => import("./LessonSEA_L6"));
const LessonSEA_L7 = lazy(() => import("./LessonSEA_L7"));
const LessonMETEO_L1 = lazy(() => import("./LessonMETEO_L1"));
const LessonMETEO_L2 = lazy(() => import("./LessonMETEO_L2"));
const LessonMETEO_L3 = lazy(() => import("./LessonMETEO_L3"));
const LessonMETEO_L4 = lazy(() => import("./LessonMETEO_L4"));
const LessonMETEO_L5 = lazy(() => import("./LessonMETEO_L5"));
const LessonMETEO_L6 = lazy(() => import("./LessonMETEO_L6"));
const LessonMETEO_L7 = lazy(() => import("./LessonMETEO_L7"));
const LessonShipCareer_L1 = lazy(() => import("./LessonShipCareer_L1"));
const LessonShipCareer_L2 = lazy(() => import("./LessonShipCareer_L2"));
const LessonShipCareer_L3 = lazy(() => import("./LessonShipCareer_L3"));
const LessonShipCareer_L4 = lazy(() => import("./LessonShipCareer_L4"));
const LessonShipCareer_L5 = lazy(() => import("./LessonShipCareer_L5"));
const LessonSafetyS1_L1 = lazy(() => import("./LessonSafetyS1_L1"));
const LessonSafetyS1_L2 = lazy(() => import("./LessonSafetyS1_L2"));
const LessonSafetyS1_L3 = lazy(() => import("./LessonSafetyS1_L3"));
const LessonSafetyS1_L4 = lazy(() => import("./LessonSafetyS1_L4"));
const LessonSafetyS1_L5 = lazy(() => import("./LessonSafetyS1_L5"));
const LessonSafetyS1_L6 = lazy(() => import("./LessonSafetyS1_L6"));
const LessonSafetyS2_L1 = lazy(() => import("./LessonSafetyS2_L1"));
const LessonSafetyS2_L2 = lazy(() => import("./LessonSafetyS2_L2"));
const LessonSafetyS2_L3 = lazy(() => import("./LessonSafetyS2_L3"));
const LessonSafetyS2_L4 = lazy(() => import("./LessonSafetyS2_L4"));
const LessonSafetyS2_L5 = lazy(() => import("./LessonSafetyS2_L5"));
const LessonSafetyS3_L1 = lazy(() => import("./LessonSafetyS3_L1"));
const LessonSafetyS3_L2 = lazy(() => import("./LessonSafetyS3_L2"));
const LessonSafetyS3_L3 = lazy(() => import("./LessonSafetyS3_L3"));
const LessonSafetyS3_L4 = lazy(() => import("./LessonSafetyS3_L4"));
const LessonSafetyS3_L5 = lazy(() => import("./LessonSafetyS3_L5"));
const LessonSafetyS3_L6 = lazy(() => import("./LessonSafetyS3_L6"));
const LessonSafetyS3_L7 = lazy(() => import("./LessonSafetyS3_L7"));
const LessonSafetyS3_L8 = lazy(() => import("./LessonSafetyS3_L8"));
const LessonSafetyS4_L1 = lazy(() => import("./LessonSafetyS4_L1"));
const LessonSafetyS4_L2 = lazy(() => import("./LessonSafetyS4_L2"));
const LessonSafetyS4_L3 = lazy(() => import("./LessonSafetyS4_L3"));
const LessonSafetyS4_L4 = lazy(() => import("./LessonSafetyS4_L4"));
const LessonSafetyS4_L5 = lazy(() => import("./LessonSafetyS4_L5"));
const LessonSafetyS4_L6 = lazy(() => import("./LessonSafetyS4_L6"));
const LessonSafetyS4_L7 = lazy(() => import("./LessonSafetyS4_L7"));
const LessonSafetyS5_L1 = lazy(() => import("./LessonSafetyS5_L1"));
const LessonSafetyS5_L2 = lazy(() => import("./LessonSafetyS5_L2"));
const LessonSafetyS5_L3 = lazy(() => import("./LessonSafetyS5_L3"));
const LessonSafetyS5_L4 = lazy(() => import("./LessonSafetyS5_L4"));
const LessonSafetyS6_L1 = lazy(() => import("./LessonSafetyS6_L1"));
const LessonSafetyS6_L2 = lazy(() => import("./LessonSafetyS6_L2"));
const LessonSafetyS6_L3 = lazy(() => import("./LessonSafetyS6_L3"));
const LessonSafetyS6_L4 = lazy(() => import("./LessonSafetyS6_L4"));
const LessonSafetyS6_L5 = lazy(() => import("./LessonSafetyS6_L5"));
const LessonSafetyS6_L6 = lazy(() => import("./LessonSafetyS6_L6"));
const LexiqueMaritime = lazy(() => import("./LexiqueMaritime"));

const LS_KEY = "map_registrations";
const ADMIN_CODE_DEFAULT = "MAP2024admin";
const ADMIN_PW_KEY = "map_admin_password";
function getAdminPassword() {
  try {
    if (typeof window === "undefined") return ADMIN_CODE_DEFAULT;
    return localStorage.getItem(ADMIN_PW_KEY) || ADMIN_CODE_DEFAULT;
  } catch { return ADMIN_CODE_DEFAULT; }
}
function setAdminPassword(pw) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_PW_KEY, pw);
}

function loadRegs() {
  try {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  }
  catch { return []; }
}
function saveRegs(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

const T = {
  fr: {
    flag:"🇫🇷", name:"Français",
    powered:"Propulsé par Independencia",
    slogan:"La formation maritime complète",
    sloganAccent:"— pont et machine",
    sub:"Navigation, droit maritime, sécurité STCW, moteur principal et systèmes auxiliaires — accessible à tous, certifié IMO/STCW.",
    cta:"⚓ Je m'inscris en priorité",
    soon:"Lancement bientôt · Inscription gratuite · Aucune carte requise",
    learnTitle:"CE QUE TU VAS APPRENDRE",
    learnSub:"Une formation complète, du débutant à l'officier",
    forWho:"POUR QUI ?",
    forWhoSub:"Pour chaque marin, à chaque étape",
    finalTitle:"Sois parmi les premiers",
    finalSub:"Inscris-toi maintenant pour être notifié dès le lancement officiel.",
    ctaFinal:"⚓ Je m'inscris maintenant",
    privacy:"Inscription gratuite · Données confidentielles · Désabonnement à tout moment",
    regTitle:"Inscription prioritaire",
    regSub:"Rejoins la liste d'attente et sois parmi les premiers à accéder à Maritime Academy Pro.",
    nameLabel:"Nom complet", namePh:"Jean-Pierre DUPONT",
    emailLabel:"Adresse email", emailPh:"jean.dupont@email.com",
    phoneLabel:"Téléphone WhatsApp", phonePh:"+237 6XX XXX XXX",
    submitBtn:"⚓ S'INSCRIRE MAINTENANT",
    submitting:"Enregistrement...",
    privacyNote:"Tes données sont conservées localement et ne seront jamais vendues.",
    successTitle:"Inscription reçue !",
    successSub:"Tu seras notifié(e) en priorité dès le lancement officiel de Maritime Academy Pro.",
    successWith:"Inscrit avec",
    backHome:"← RETOUR À L'ACCUEIL",
    startQuestionnaire:"📝 Commencer le questionnaire",
    alreadyRegistered:"Déjà inscrit ? Tu seras contacté(e) au lancement 🚀",
    errName:"Le nom est requis",
    errEmail:"L'email est requis",
    errEmailInvalid:"Email invalide",
    errPhone:"Le téléphone WhatsApp est requis",
    back:"◀ Retour",
    discover:"DÉCOUVRIR",
    changeLang:"Changer de langue",
    audience:[["🌱","Futurs marins","Zéro expérience"],["🎓","Cadets navals","En formation"],["⚓","Matelots / AB","En activité"],["🧭","Officiers","OICNM / OICM"],["👑","Capitaines","Management level"],["🏢","Armateurs","MLC & compliance"]],
    features:[
      {icon:"🧭",title:"Navigation & Cartographie",desc:"COLREG, ECDIS, météorologie maritime et routage"},
      {icon:"⚖️",title:"Droit Maritime International",desc:"SOLAS, MARPOL, MLC 2006, STCW et conventions IMO"},
      {icon:"🚩",title:"Signalisation & Balisage",desc:"AISM, pavillons CIS, code Morse et feux COLREG"},
      {icon:"🩺",title:"Secourisme STCW",desc:"EFA, MFA, MCC — du geste qui sauve au MEDEVAC"},
      {icon:"🔍",title:"MarineVerify™",desc:"Vérification d'authenticité des brevets en temps réel"},
      {icon:"⚓",title:"My Career Advisor™",desc:"Feuille de route selon ton navire de rêve"},
    ],
  },
  en: {
    flag:"🇬🇧", name:"English",
    powered:"Powered by Independencia",
    slogan:"Complete maritime training",
    sloganAccent:"— deck and engine",
    sub:"Navigation, maritime law, STCW safety, main engine and auxiliary systems — accessible to all, IMO/STCW certified.",
    cta:"⚓ Register with priority",
    soon:"Launching soon · Free registration · No card required",
    learnTitle:"WHAT YOU WILL LEARN",
    learnSub:"Complete training, from beginner to officer",
    forWho:"WHO IS IT FOR?",
    forWhoSub:"For every sailor, at every stage",
    finalTitle:"Be among the first",
    finalSub:"Register now to be notified on launch day.",
    ctaFinal:"⚓ Register now",
    privacy:"Free registration · Confidential data · Unsubscribe anytime",
    regTitle:"Priority registration",
    regSub:"Join the waiting list and be among the first to access Maritime Academy Pro at launch.",
    nameLabel:"Full name", namePh:"John SMITH",
    emailLabel:"Email address", emailPh:"john.smith@email.com",
    phoneLabel:"WhatsApp phone", phonePh:"+1 XXX XXX XXXX",
    submitBtn:"⚓ REGISTER NOW",
    submitting:"Saving...",
    privacyNote:"Your data is stored locally and will never be sold.",
    successTitle:"Registration received!",
    successSub:"You will be notified first when Maritime Academy Pro officially launches.",
    successWith:"Registered with",
    backHome:"← BACK TO HOME",
    startQuestionnaire:"📝 Start questionnaire",
    alreadyRegistered:"Already registered? You will be contacted at launch 🚀",
    errName:"Full name is required",
    errEmail:"Email is required",
    errEmailInvalid:"Invalid email",
    errPhone:"WhatsApp phone is required",
    back:"◀ Back",
    discover:"DISCOVER",
    changeLang:"Change language",
    audience:[["🌱","Future sailors","No experience"],["🎓","Naval cadets","In training"],["⚓","Sailors / AB","On duty"],["🧭","Officers","OICNM / OICM"],["👑","Captains","Management level"],["🏢","Ship owners","MLC & compliance"]],
    features:[
      {icon:"🧭",title:"Navigation & Cartography",desc:"COLREG, ECDIS, maritime weather and routing"},
      {icon:"⚖️",title:"International Maritime Law",desc:"SOLAS, MARPOL, MLC 2006, STCW and IMO conventions"},
      {icon:"🚩",title:"Signaling & Buoyage",desc:"IALA, CIS flags, Morse code and COLREG lights"},
      {icon:"🩺",title:"STCW First Aid",desc:"EFA, MFA, MCC — from CPR to MEDEVAC"},
      {icon:"🔍",title:"MarineVerify™",desc:"Real-time certificate authenticity verification"},
      {icon:"⚓",title:"My Career Advisor™",desc:"Personalized roadmap for your dream ship"},
    ],
  },
  es: {
    flag:"🇪🇸", name:"Español",
    powered:"Desarrollado por Independencia",
    slogan:"Formación marítima completa",
    sloganAccent:"— puente y máquinas",
    sub:"Navegación, derecho marítimo, seguridad STCW, motor principal y sistemas auxiliares — accesible para todos, certificada IMO/STCW.",
    cta:"⚓ Me registro con prioridad",
    soon:"Próximo lanzamiento · Registro gratuito · Sin tarjeta requerida",
    learnTitle:"LO QUE APRENDERÁS",
    learnSub:"Formación completa, del principiante al oficial",
    forWho:"¿PARA QUIÉN?",
    forWhoSub:"Para cada marino, en cada etapa",
    finalTitle:"Sé de los primeros",
    finalSub:"Regístrate ahora para ser notificado en el lanzamiento oficial.",
    ctaFinal:"⚓ Registrarme ahora",
    privacy:"Registro gratuito · Datos confidenciales · Baja en cualquier momento",
    regTitle:"Registro prioritario",
    regSub:"Únete a la lista de espera y sé de los primeros en acceder a Maritime Academy Pro.",
    nameLabel:"Nombre completo", namePh:"Juan PÉREZ",
    emailLabel:"Correo electrónico", emailPh:"juan.perez@email.com",
    phoneLabel:"Teléfono WhatsApp", phonePh:"+34 6XX XXX XXX",
    submitBtn:"⚓ REGISTRARME AHORA",
    submitting:"Guardando...",
    privacyNote:"Tus datos se guardan localmente y nunca serán vendidos.",
    successTitle:"¡Registro recibido!",
    successSub:"Serás notificado/a al lanzamiento oficial de Maritime Academy Pro.",
    successWith:"Registrado con",
    backHome:"← VOLVER AL INICIO",
    startQuestionnaire:"📝 Comenzar el cuestionario",
    alreadyRegistered:"¿Ya registrado? Serás contactado en el lanzamiento 🚀",
    errName:"El nombre es obligatorio",
    errEmail:"El correo es obligatorio",
    errEmailInvalid:"Correo no válido",
    errPhone:"El teléfono WhatsApp es obligatorio",
    back:"◀ Volver",
    discover:"DESCUBRIR",
    changeLang:"Cambiar idioma",
    audience:[["🌱","Futuros marinos","Sin experiencia"],["🎓","Cadetes navales","En formación"],["⚓","Marineros / AB","En actividad"],["🧭","Oficiales","OICNM / OICM"],["👑","Capitanes","Nivel directivo"],["🏢","Armadores","MLC & compliance"]],
    features:[
      {icon:"🧭",title:"Navegación & Cartografía",desc:"COLREG, ECDIS, meteorología marítima y ruteo"},
      {icon:"⚖️",title:"Derecho Marítimo Internacional",desc:"SOLAS, MARPOL, MLC 2006, STCW y convenios OMI"},
      {icon:"🚩",title:"Señalización & Balizamiento",desc:"IALA, banderas CIS, código Morse y luces COLREG"},
      {icon:"🩺",title:"Primeros Auxilios STCW",desc:"EFA, MFA, MCC — de RCP a MEDEVAC"},
      {icon:"🔍",title:"MarineVerify™",desc:"Verificación de autenticidad de certificados"},
      {icon:"⚓",title:"My Career Advisor™",desc:"Hoja de ruta según tu barco ideal"},
    ],
  },
  pt: {
    flag:"🇧🇷", name:"Português",
    powered:"Desenvolvido por Independencia",
    slogan:"Formação marítima completa",
    sloganAccent:"— convés e máquinas",
    sub:"Navegação, direito marítimo, segurança STCW, motor principal e sistemas auxiliares — acessível a todos, certificada IMO/STCW.",
    cta:"⚓ Inscrever-me com prioridade",
    soon:"Lançamento em breve · Inscrição gratuita · Sem cartão necessário",
    learnTitle:"O QUE VOCÊ VAI APRENDER",
    learnSub:"Formação completa, do iniciante ao oficial",
    forWho:"PARA QUEM?",
    forWhoSub:"Para cada marinheiro, em cada etapa",
    finalTitle:"Seja um dos primeiros",
    finalSub:"Inscreva-se agora para ser notificado no lançamento oficial.",
    ctaFinal:"⚓ Inscrever-me agora",
    privacy:"Inscrição gratuita · Dados confidenciais · Cancelamento a qualquer momento",
    regTitle:"Inscrição prioritária",
    regSub:"Junte-se à lista de espera e seja um dos primeiros a acessar o Maritime Academy Pro.",
    nameLabel:"Nome completo", namePh:"João SILVA",
    emailLabel:"Endereço de email", emailPh:"joao.silva@email.com",
    phoneLabel:"Telefone WhatsApp", phonePh:"+55 11 9XXXX-XXXX",
    submitBtn:"⚓ INSCREVER-ME AGORA",
    submitting:"Salvando...",
    privacyNote:"Seus dados são salvos localmente e nunca serão vendidos.",
    successTitle:"Inscrição recebida!",
    successSub:"Você será notificado/a no lançamento oficial do Maritime Academy Pro.",
    successWith:"Inscrito com",
    backHome:"← VOLTAR AO INÍCIO",
    startQuestionnaire:"📝 Iniciar o questionário",
    alreadyRegistered:"Já inscrito? Você será contactado no lançamento 🚀",
    errName:"O nome é obrigatório",
    errEmail:"O email é obrigatório",
    errEmailInvalid:"Email inválido",
    errPhone:"O telefone WhatsApp é obrigatório",
    back:"◀ Voltar",
    discover:"DESCOBRIR",
    changeLang:"Mudar idioma",
    audience:[["🌱","Futuros marinheiros","Sem experiência"],["🎓","Cadetes navais","Em formação"],["⚓","Marinheiros / AB","Em atividade"],["🧭","Oficiais","OICNM / OICM"],["👑","Capitães","Nível diretivo"],["🏢","Armadores","MLC & compliance"]],
    features:[
      {icon:"🧭",title:"Navegação & Cartografia",desc:"COLREG, ECDIS, meteorologia marítima e roteamento"},
      {icon:"⚖️",title:"Direito Marítimo Internacional",desc:"SOLAS, MARPOL, MLC 2006, STCW e convenções IMO"},
      {icon:"🚩",title:"Sinalização & Balizamento",desc:"IALA, bandeiras CIS, código Morse e luzes COLREG"},
      {icon:"🩺",title:"Primeiros Socorros STCW",desc:"EFA, MFA, MCC — de RCP a MEDEVAC"},
      {icon:"🔍",title:"MarineVerify™",desc:"Verificação de autenticidade de certificados"},
      {icon:"⚓",title:"My Career Advisor™",desc:"Roteiro personalizado para seu navio ideal"},
    ],
  },
};

function AnchorIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="14" r="6" stroke="#C9922A" strokeWidth="2.5" fill="none"/>
      <line x1="32" y1="20" x2="32" y2="52" stroke="#C9922A" strokeWidth="2.5"/>
      <path d="M16 28 Q8 36 14 48 Q22 56 32 52 Q42 56 50 48 Q56 36 48 28"
        stroke="#C9922A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <line x1="20" y1="28" x2="44" y2="28" stroke="#C9922A" strokeWidth="2.5"/>
    </svg>
  );
}

function TopBar({ onBack, title, backLabel }) {
  return (
    <div style={{
      position:"sticky",top:0,zIndex:100,
      background:"rgba(6,14,26,0.97)",
      backdropFilter:"blur(14px)",
      borderBottom:"1px solid rgba(201,146,42,0.25)",
      padding:"0 16px",height:56,
      display:"flex",alignItems:"center",gap:12,
    }}>
      <button onClick={onBack} style={{
        display:"flex",alignItems:"center",gap:8,
        background:"rgba(255,255,255,0.1)",
        border:"1px solid rgba(255,255,255,0.25)",
        borderRadius:10,padding:"8px 16px",
        color:"#f0f4ff",fontSize:14,fontWeight:700,cursor:"pointer",flexShrink:0,
      }}>{backLabel || "◀ Retour"}</button>
      {title && (
        <span style={{
          fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,
          color:"rgba(240,244,255,0.65)",letterSpacing:1,
          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
        }}>{title}</span>
      )}
    </div>
  );
}

// Point 2 correctif (2026-09-01) — neutral transition screen shown by any
// of the 20 *LessonsPage components instead of their real list, for the
// single frame between mount and the auto-redirect their own useEffect
// triggers when `autoPick` is set (Recommended for You's lesson deep-link).
// Deliberately blank/matching-background rather than a spinner — this
// state is expected to be visible for well under a second.
function AutoPickTransition() {
  return <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)"}}/>;
}

// ── LANGUAGE SELECT ────────────────────────────────────────────
function LanguageSelect({ setLang, setPage }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);
  const langs = Object.entries(T).map(([code, t]) => ({ code, flag: t.flag, name: t.name }));
  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#0d1f3c 0%,#060e1a 100%)",
      display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",
      padding:"40px 24px",fontFamily:"'Nunito',sans-serif",
      position:"relative",overflow:"hidden",
    }}>
      <div style={{
        position:"absolute",top:"30%",left:"50%",
        transform:"translate(-50%,-50%)",
        width:300,height:300,borderRadius:"50%",opacity:0.15,
        background:"radial-gradient(circle,#1a6fd4 0%,transparent 70%)",
        pointerEvents:"none",
      }}/>
      <div style={{
        position:"relative",zIndex:1,width:"100%",maxWidth:400,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",
        transition:"all 0.6s ease",
      }}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{
            width:72,height:72,borderRadius:20,margin:"0 auto 12px",
            background:"linear-gradient(135deg,#0d1f3c,#112244)",
            border:"1px solid rgba(201,146,42,0.4)",
            boxShadow:"0 8px 32px rgba(26,111,212,0.3)",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>
            <AnchorIcon size={40}/>
          </div>
          <div style={{
            fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:900,
            background:"linear-gradient(135deg,#f0f4ff 30%,#e8b94f 100%)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            marginBottom:4,
          }}>Maritime Academy Pro</div>
          <div style={{fontSize:10,letterSpacing:4,color:"rgba(240,244,255,0.35)"}}>
            by Independencia
          </div>
        </div>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:48,height:1,margin:"0 auto 14px",
            background:"linear-gradient(90deg,#1a6fd4,#c9922a)"}}/>
          <p style={{fontSize:13,color:"rgba(240,244,255,0.5)",letterSpacing:1,margin:0}}>
            Choose your language · Choisissez votre langue
          </p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
          {langs.map(l => (
            <button key={l.code}
              onClick={() => { setLang(l.code); setPage("welcome"); }}
              style={{
                display:"flex",alignItems:"center",gap:12,
                padding:"14px 16px",borderRadius:16,
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(201,146,42,0.2)",
                cursor:"pointer",color:"#f0f4ff",
              }}>
              <span style={{fontSize:26,flexShrink:0}}>{l.flag}</span>
              <span style={{fontSize:14,fontWeight:700}}>{l.name}</span>
            </button>
          ))}
        </div>
        <p style={{textAlign:"center",fontSize:10,color:"rgba(240,244,255,0.2)",letterSpacing:1}}>
          You can change the language anytime
        </p>
      </div>
    </div>
  );
}

// ── LANDING PAGE ───────────────────────────────────────────────
function LandingPage({ setPage, lang, setLang }) {
  const t = T[lang] || T.fr;
  const [vis, setVis] = useState(false);
  useEffect(() => { const tm = setTimeout(() => setVis(true), 80); return () => clearTimeout(tm); }, []);

  const btnPrimary = {
    display:"block",width:"100%",padding:"16px 0",
    background:"linear-gradient(135deg,#1a6fd4,#c9922a)",
    border:"none",borderRadius:16,
    fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,
    letterSpacing:2,color:"#fff",cursor:"pointer",
    boxShadow:"0 10px 40px rgba(26,111,212,0.45)",
  };

  return (
    <div style={{minHeight:"100vh",background:"#060e1a",color:"#f0f4ff",
      fontFamily:"'Nunito',sans-serif",overflowX:"hidden"}}>

      {/* HERO */}
      <section style={{
        minHeight:"100vh",display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",
        padding:"60px 24px 80px",textAlign:"center",position:"relative",
      }}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <div style={{position:"absolute",top:"20%",left:"50%",
            transform:"translate(-50%,-50%)",width:320,height:320,
            borderRadius:"50%",opacity:0.18,
            background:"radial-gradient(circle,#1a6fd4 0%,transparent 70%)"}}/>
          <div style={{position:"absolute",inset:0,opacity:0.025,
            backgroundImage:"linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)",
            backgroundSize:"40px 40px"}}/>
        </div>

        <div style={{
          position:"relative",zIndex:1,
          opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",
          transition:"all 0.7s ease",
        }}>
          {/* Language pill */}
          <button onClick={() => setPage("lang")} style={{
            display:"inline-flex",alignItems:"center",gap:8,
            padding:"7px 14px",borderRadius:20,marginBottom:24,
            background:"rgba(255,255,255,0.06)",
            border:"1px solid rgba(255,255,255,0.15)",
            color:"rgba(240,244,255,0.7)",fontSize:13,cursor:"pointer",
          }}>
            <span style={{fontSize:18}}>{t.flag}</span>
            <span style={{fontWeight:600}}>{t.name}</span>
            <span style={{fontSize:10,opacity:0.5}}>▼</span>
          </button>

          {/* Logo */}
          <div style={{display:"flex",flexDirection:"column",
            alignItems:"center",gap:8,marginBottom:28}}>
            <div style={{
              width:80,height:80,borderRadius:20,
              background:"linear-gradient(135deg,#0d1f3c,#112244)",
              border:"1px solid rgba(201,146,42,0.4)",
              boxShadow:"0 8px 32px rgba(26,111,212,0.3)",
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>
              <AnchorIcon size={44}/>
            </div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:10,
              letterSpacing:4,color:"#c9922a"}}>{t.powered}</div>
            <h1 style={{
              fontFamily:"'Cinzel',serif",fontSize:34,fontWeight:900,
              lineHeight:1.2,margin:0,
              background:"linear-gradient(135deg,#f0f4ff 30%,#e8b94f 100%)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            }}>Maritime<br/>Academy Pro</h1>
          </div>

          <div style={{width:60,height:2,borderRadius:2,margin:"0 auto 20px",
            background:"linear-gradient(90deg,#1a6fd4,#c9922a)"}}/>

          <p style={{fontSize:17,fontWeight:700,color:"#fff",
            marginBottom:10,lineHeight:1.5}}>
            {t.slogan}<br/>
            <span style={{color:"#e8b94f"}}>{t.sloganAccent}</span>
          </p>
          <p style={{fontSize:13,color:"rgba(240,244,255,0.5)",
            maxWidth:340,margin:"0 auto 36px",lineHeight:1.7}}>{t.sub}</p>

          <div style={{maxWidth:340,margin:"0 auto"}}>
            <button style={btnPrimary} onClick={() => setPage("register")}>{t.cta}</button>
            <p style={{fontSize:11,color:"rgba(240,244,255,0.28)",marginTop:10}}>{t.soon}</p>
          </div>
        </div>

        <div style={{
          position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",
          display:"flex",flexDirection:"column",alignItems:"center",gap:4,
          opacity:0.35,animation:"bounce 2s ease-in-out infinite",
        }}>
          <div style={{width:1,height:28,background:"rgba(255,255,255,0.4)",borderRadius:1}}/>
          <span style={{fontSize:9,letterSpacing:3,color:"rgba(255,255,255,0.6)"}}>{t.discover}</span>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:"#0a1628",padding:"32px 20px"}}>
        <div style={{maxWidth:440,margin:"0 auto",
          display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[["11+","Modules"],["60+","User Stories"],["4","Languages"],["100%","IMO/STCW"]].map(([v,l]) => (
            <div key={l} style={{borderRadius:16,padding:"16px 12px",textAlign:"center",
              background:"rgba(255,255,255,0.04)",border:"1px solid rgba(201,146,42,0.2)"}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:900,
                background:"linear-gradient(135deg,#4da6ff,#e8b94f)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</div>
              <div style={{fontSize:10,color:"rgba(240,244,255,0.4)",marginTop:4,letterSpacing:1}}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{background:"#0a1628",padding:"40px 20px"}}>
        <div style={{maxWidth:440,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:10,
              letterSpacing:4,color:"#c9922a",marginBottom:10}}>{t.learnTitle}</div>
            <h2 style={{fontFamily:"'Cinzel',serif",fontSize:20,
              fontWeight:700,color:"#fff",margin:0}}>{t.learnSub}</h2>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {t.features.map((f,i) => (
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,
                padding:16,borderRadius:18,
                background:"rgba(13,31,60,0.7)",
                border:"1px solid rgba(201,146,42,0.15)"}}>
                <span style={{fontSize:28,flexShrink:0,marginTop:2}}>{f.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:4}}>{f.title}</div>
                  <div style={{fontSize:12,color:"rgba(240,244,255,0.45)",lineHeight:1.6}}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section style={{padding:"40px 20px",
        background:"linear-gradient(160deg,#0d1f3c,#060e1a)"}}>
        <div style={{maxWidth:440,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:10,
            letterSpacing:4,color:"#c9922a",marginBottom:10}}>{t.forWho}</div>
          <h2 style={{fontFamily:"'Cinzel',serif",fontSize:20,
            fontWeight:700,color:"#fff",marginBottom:28}}>{t.forWhoSub}</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {t.audience.map(([icon,title,sub]) => (
              <div key={title} style={{borderRadius:16,padding:"14px 8px",textAlign:"center",
                background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
                <div style={{fontSize:24,marginBottom:4}}>{icon}</div>
                <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{title}</div>
                <div style={{fontSize:10,color:"rgba(240,244,255,0.38)",marginTop:2}}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{padding:"56px 20px",textAlign:"center",background:"#060e1a"}}>
        <div style={{maxWidth:400,margin:"0 auto"}}>
          <div style={{marginBottom:20,opacity:0.5}}><AnchorIcon size={48}/></div>
          <h2 style={{fontFamily:"'Cinzel',serif",fontSize:22,
            fontWeight:700,color:"#fff",marginBottom:14}}>{t.finalTitle}</h2>
          <p style={{fontSize:13,color:"rgba(240,244,255,0.45)",
            marginBottom:28,lineHeight:1.7}}>{t.finalSub}</p>
          <button style={btnPrimary} onClick={() => setPage("register")}>{t.ctaFinal}</button>
          <p style={{fontSize:10,color:"rgba(240,244,255,0.22)",marginTop:10}}>{t.privacy}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"28px 20px",textAlign:"center",
        borderTop:"1px solid rgba(255,255,255,0.05)"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:3,
          color:"rgba(240,244,255,0.28)",marginBottom:6}}>MARITIME ACADEMY PRO</div>
        <div style={{fontSize:10,color:"rgba(240,244,255,0.18)"}}>
          by Independencia · Formation Maritime Certifiée IMO/STCW
        </div>
        <button onClick={() => setPage("admin-login")} style={{
          background:"none",border:"none",color:"rgba(240,244,255,0.08)",
          fontSize:22,cursor:"pointer",marginTop:16,padding:"4px 16px",
        }}>·</button>
      </footer>

      <style>{`@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}}`}</style>
    </div>
  );
}

// ── REGISTER PAGE ──────────────────────────────────────────────
function RegisterPage({ setPage, lang }) {
  const t = T[lang] || T.fr;
  const [form, setForm] = useState({ name:"", email:"", phone:"" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t.errName;
    if (!form.email.trim()) e.email = t.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.errEmailInvalid;
    if (!form.phone.trim()) e.phone = t.errPhone;
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      const regs = loadRegs();
      const reg = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        lang,
        date: new Date().toLocaleString("fr-FR"),
      };
      regs.push(reg);
      saveRegs(regs);
      try { localStorage.setItem("map_last_reg", JSON.stringify(reg)); } catch {}
      setLoading(false);
      setPage("questionnaire");
    }, 800);
  };

  const onChange = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
  };

  const inp = (err) => ({
    width:"100%",padding:"14px 16px",borderRadius:14,
    background:"rgba(255,255,255,0.07)",
    border:`1px solid ${err?"#c0392b":"rgba(201,146,42,0.3)"}`,
    color:"#f0f4ff",fontSize:14,outline:"none",
    fontFamily:"'Nunito',sans-serif",
  });

  return (
    <div style={{minHeight:"100vh",
      background:"linear-gradient(160deg,#0d1f3c,#060e1a)",
      fontFamily:"'Nunito',sans-serif"}}>
      <TopBar onBack={() => setPage("landing")} title={t.regTitle} backLabel={t.back}/>
      <div style={{padding:"32px 20px"}}>
        <div style={{maxWidth:400,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{width:60,height:60,borderRadius:18,margin:"0 auto 14px",
              background:"rgba(13,31,60,0.9)",
              border:"1px solid rgba(201,146,42,0.4)",
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <AnchorIcon size={34}/>
            </div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,
              fontWeight:700,color:"#fff",marginBottom:8}}>{t.regTitle}</h1>
            <p style={{fontSize:12,color:"rgba(240,244,255,0.45)",
              lineHeight:1.7,margin:0}}>{t.regSub}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div>
              <label style={{display:"block",fontSize:10,fontWeight:700,
                letterSpacing:2,color:"rgba(240,244,255,0.5)",
                textTransform:"uppercase",marginBottom:8}}>{t.nameLabel}</label>
              <input type="text" placeholder={t.namePh}
                value={form.name} onChange={onChange("name")} style={inp(!!errors.name)}/>
              {errors.name && <p style={{fontSize:11,color:"#e74c3c",marginTop:4}}>{errors.name}</p>}
            </div>
            <div>
              <label style={{display:"block",fontSize:10,fontWeight:700,
                letterSpacing:2,color:"rgba(240,244,255,0.5)",
                textTransform:"uppercase",marginBottom:8}}>{t.emailLabel}</label>
              <input type="email" placeholder={t.emailPh}
                value={form.email} onChange={onChange("email")} style={inp(!!errors.email)}/>
              {errors.email && <p style={{fontSize:11,color:"#e74c3c",marginTop:4}}>{errors.email}</p>}
            </div>
            <div>
              <label style={{display:"block",fontSize:10,fontWeight:700,
                letterSpacing:2,color:"rgba(240,244,255,0.5)",
                textTransform:"uppercase",marginBottom:8}}>{t.phoneLabel}</label>
              <input type="tel" placeholder={t.phonePh}
                value={form.phone} onChange={onChange("phone")} style={inp(!!errors.phone)}/>
              {errors.phone && <p style={{fontSize:11,color:"#e74c3c",marginTop:4}}>{errors.phone}</p>}
            </div>
            <button onClick={handleSubmit} disabled={loading} style={{
              width:"100%",padding:"16px 0",border:"none",borderRadius:16,
              background:loading?"rgba(26,111,212,0.5)":"linear-gradient(135deg,#1a6fd4,#c9922a)",
              fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,
              letterSpacing:2,color:"#fff",
              cursor:loading?"default":"pointer",
              boxShadow:"0 8px 32px rgba(26,111,212,0.4)",marginTop:8,
            }}>{loading ? t.submitting : t.submitBtn}</button>
            <p style={{fontSize:11,textAlign:"center",
              color:"rgba(240,244,255,0.35)",marginTop:4}}>{t.alreadyRegistered}</p>
            <p style={{fontSize:10,textAlign:"center",
              color:"rgba(240,244,255,0.25)",lineHeight:1.6}}>{t.privacyNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STATUS PAGE (after questionnaire) ──────────────────────────
function StatusPage({ setPage, lang }) {
  const t = T[lang] || T.fr;
  let last = { name: "", email: "" };
  try {
    if (typeof window !== "undefined") {
      last = JSON.parse(localStorage.getItem("map_last_reg") || "{}");
    }
  } catch {}
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",
      padding:"40px 24px",textAlign:"center",
      background:"linear-gradient(160deg,#0d1f3c,#060e1a)",
      fontFamily:"'Nunito',sans-serif"}}>
      <div style={{maxWidth:380,width:"100%"}}>
        <div style={{fontSize:64,marginBottom:20}}>✅</div>
        <h2 style={{fontFamily:"'Cinzel',serif",fontSize:24,
          fontWeight:700,color:"#fff",marginBottom:12}}>{t.successTitle}</h2>
        <p style={{fontSize:13,color:"rgba(240,244,255,0.5)",
          marginBottom:28,lineHeight:1.7}}>{t.successSub}</p>
        <div style={{borderRadius:16,padding:16,marginBottom:28,
          background:"rgba(201,146,42,0.1)",
          border:"1px solid rgba(201,146,42,0.3)"}}>
          <div style={{fontSize:11,color:"rgba(240,244,255,0.4)",marginBottom:4}}>
            {t.successWith}
          </div>
          <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{last.name}</div>
          <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",marginTop:2}}>{last.email}</div>
        </div>
        <button onClick={() => setPage("landing")} style={{
          width:"100%",padding:"15px 0",borderRadius:16,border:"none",
          background:"linear-gradient(135deg,#1a6fd4,#c9922a)",
          fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,
          letterSpacing:2,color:"#fff",cursor:"pointer",
        }}>{t.backHome}</button>
      </div>
    </div>
  );
}

// ── ADMIN LOGIN ────────────────────────────────────────────────
function AdminLogin({ setPage }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const handle = () => {
    if (code === getAdminPassword()) setPage("admin");
    else { setError(true); setCode(""); }
  };
  return (
    <div style={{minHeight:"100vh",
      background:"linear-gradient(160deg,#0d1f3c,#060e1a)",
      fontFamily:"'Nunito',sans-serif"}}>
      <TopBar onBack={() => setPage("dashboard")} title="Admin" backLabel="◀ Retour"/>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",
        justifyContent:"center",padding:"60px 24px",minHeight:"calc(100vh - 56px)"}}>
        <div style={{maxWidth:320,width:"100%",textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>🔒</div>
          <h2 style={{fontFamily:"'Cinzel',serif",fontSize:18,
            fontWeight:700,color:"#fff",marginBottom:24}}>Accès administrateur</h2>
          <input type="password" placeholder="Code d'accès"
            value={code}
            onChange={e => { setCode(e.target.value); setError(false); }}
            onKeyDown={e => e.key==="Enter" && handle()}
            style={{
              width:"100%",padding:"14px 16px",borderRadius:14,
              background:"rgba(255,255,255,0.07)",
              border:`1px solid ${error?"#c0392b":"rgba(201,146,42,0.3)"}`,
              color:"#f0f4ff",fontSize:16,outline:"none",
              textAlign:"center",letterSpacing:4,
              fontFamily:"'Nunito',sans-serif",
              marginBottom:error?6:16,
            }}/>
          {error && <p style={{fontSize:12,color:"#e74c3c",marginBottom:14}}>Code incorrect</p>}
          <button onClick={handle} style={{
            width:"100%",padding:"14px 0",border:"none",borderRadius:14,
            background:"linear-gradient(135deg,#1a6fd4,#c9922a)",
            fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,
            letterSpacing:2,color:"#fff",cursor:"pointer",
          }}>ACCÉDER</button>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN PAGE ─────────────────────────────────────────────────
function AdminPage({ setPage }) {
  const [regs, setRegs] = useState(loadRegs());
  const [confirmClear, setConfirmClear] = useState(false);
  const [search, setSearch] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  const filtered = regs.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search)
  );

  const handleDelete = (id) => {
    const upd = regs.filter(r => r.id !== id);
    saveRegs(upd); setRegs(upd);
  };

  const togglePremium = (id) => {
    const upd = regs.map(r => r.id === id ? { ...r, premium: !r.premium } : r);
    saveRegs(upd); setRegs(upd);
  };

  const changePassword = () => {
    const np = typeof window !== "undefined" ? window.prompt("Nouveau mot de passe administrateur :") : null;
    if (!np) return;
    if (np.length < 6) { setPwMsg("⚠️ Min. 6 caractères"); return; }
    setAdminPassword(np);
    setPwMsg("✅ Mot de passe mis à jour");
    setTimeout(() => setPwMsg(""), 2500);
  };

  const handleClear = () => {
    if (confirmClear) { saveRegs([]); setRegs([]); setConfirmClear(false); }
    else setConfirmClear(true);
  };

  return (
    <div style={{minHeight:"100vh",
      background:"linear-gradient(160deg,#0d1f3c,#060e1a)",
      fontFamily:"'Nunito',sans-serif"}}>
      <div style={{
        position:"sticky",top:0,zIndex:100,
        background:"rgba(6,14,26,0.97)",
        backdropFilter:"blur(14px)",
        borderBottom:"1px solid rgba(201,146,42,0.25)",
        padding:"0 16px",height:56,
        display:"flex",alignItems:"center",justifyContent:"space-between",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={() => setPage("dashboard")} style={{
            display:"flex",alignItems:"center",gap:8,
            background:"rgba(255,255,255,0.1)",
            border:"1px solid rgba(255,255,255,0.25)",
            borderRadius:10,padding:"8px 16px",
            color:"#f0f4ff",fontSize:14,fontWeight:700,cursor:"pointer",
          }}>◀ Sortir</button>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:13,
            fontWeight:700,color:"rgba(240,244,255,0.65)"}}>Admin</span>
        </div>
        <span style={{
          fontSize:11,color:"#e8b94f",fontWeight:700,
          background:"rgba(201,146,42,0.1)",
          border:"1px solid rgba(201,146,42,0.3)",
          padding:"4px 10px",borderRadius:20,
        }}>{regs.length} inscrits</span>
      </div>

      <div style={{padding:"20px 16px",maxWidth:640,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
          gap:10,marginBottom:20}}>
          {[
            {val:regs.length,label:"Total inscrits"},
            {val:regs.filter(r=>r.premium).length,label:"Premium"},
            {val:regs.length>0?regs[regs.length-1].date.split(" ")[0]:"—",label:"Dernier"},
          ].map(s => (
            <div key={s.label} style={{borderRadius:14,padding:"12px 8px",
              textAlign:"center",background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(201,146,42,0.2)"}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,
                fontWeight:700,color:"#e8b94f"}}>{s.val}</div>
              <div style={{fontSize:9,color:"rgba(240,244,255,0.4)",
                marginTop:3,letterSpacing:1}}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{marginBottom:16}}>
          <button onClick={changePassword} style={{
            width:"100%",padding:"12px 0",borderRadius:14,
            background:"rgba(26,111,212,0.15)",
            border:"1px solid rgba(26,111,212,0.4)",
            color:"#4da6ff",fontSize:13,fontWeight:700,cursor:"pointer",
            fontFamily:"'Nunito',sans-serif",
          }}>🔑 Changer le mot de passe admin</button>
          {pwMsg && <div style={{textAlign:"center",fontSize:11,color:"#e8b94f",marginTop:6}}>{pwMsg}</div>}
        </div>

        <div style={{position:"relative",marginBottom:16}}>
          <span style={{position:"absolute",left:12,top:"50%",
            transform:"translateY(-50%)",fontSize:14,
            color:"rgba(240,244,255,0.3)"}}>🔍</span>
          <input type="text" placeholder="Rechercher..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{width:"100%",padding:"12px 14px 12px 38px",borderRadius:14,
              background:"rgba(255,255,255,0.06)",
              border:"1px solid rgba(201,146,42,0.2)",
              color:"#f0f4ff",fontSize:13,outline:"none",
              fontFamily:"'Nunito',sans-serif"}}/>
        </div>

        {filtered.length === 0 ? (
          <div style={{textAlign:"center",padding:"60px 20px",
            color:"rgba(240,244,255,0.3)"}}>
            <div style={{fontSize:40,marginBottom:14}}>📭</div>
            <div style={{fontSize:13}}>
              {regs.length===0?"Aucune inscription pour le moment.":"Aucun résultat."}
            </div>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
            {filtered.map(r => (
              <div key={r.id} style={{borderRadius:16,padding:14,
                background:"rgba(13,31,60,0.7)",
                border:"1px solid rgba(201,146,42,0.15)",
                display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{width:40,height:40,borderRadius:"50%",flexShrink:0,
                  background:"linear-gradient(135deg,#1a6fd4,#c9922a)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:16,color:"#fff"}}>
                  {r.name.charAt(0).toUpperCase()}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                    <span style={{fontSize:14,fontWeight:700,color:"#fff",
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {r.name}
                    </span>
                    {r.lang && T[r.lang] && (
                      <span style={{fontSize:16}}>{T[r.lang].flag}</span>
                    )}
                  </div>
                  <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",
                    overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {r.email}
                  </div>
                  <div style={{display:"flex",gap:10,marginTop:4,
                    flexWrap:"wrap",alignItems:"center"}}>
                    <span style={{fontSize:12,color:"#25d366",fontWeight:600}}>
                      📱 {r.phone}
                    </span>
                    <span style={{fontSize:10,color:"rgba(240,244,255,0.3)"}}>
                      · {r.date}
                    </span>
                    {r.premium && (
                      <span style={{fontSize:10,color:"#e8b94f",fontWeight:700,
                        padding:"2px 8px",borderRadius:10,
                        background:"rgba(201,146,42,0.15)",
                        border:"1px solid rgba(201,146,42,0.4)"}}>⭐ PREMIUM</span>
                    )}
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6,flexShrink:0,alignItems:"flex-end"}}>
                  <button onClick={() => togglePremium(r.id)} style={{
                    fontSize:10,fontWeight:700,
                    padding:"5px 10px",borderRadius:10,cursor:"pointer",
                    background:r.premium?"rgba(192,57,43,0.15)":"rgba(201,146,42,0.18)",
                    border:`1px solid ${r.premium?"#c0392b":"#c9922a"}`,
                    color:r.premium?"#e74c3c":"#e8b94f",
                    fontFamily:"'Nunito',sans-serif",whiteSpace:"nowrap",
                  }}>{r.premium?"Désactiver":"Activer ⭐"}</button>
                  <button onClick={() => handleDelete(r.id)} style={{
                    background:"none",border:"none",
                    color:"rgba(240,244,255,0.35)",fontSize:18,
                    cursor:"pointer",lineHeight:1,padding:"0 4px",
                  }}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {regs.length > 0 && (
          <div style={{borderRadius:14,padding:"12px 14px",marginBottom:12,
            fontSize:11,color:"rgba(240,244,255,0.4)",lineHeight:1.7,
            background:"rgba(26,111,212,0.08)",
            border:"1px solid rgba(26,111,212,0.25)"}}>
            💡 Export console :{" "}
            <code style={{color:"#4da6ff",userSelect:"all"}}>
              JSON.stringify(JSON.parse(localStorage.getItem('map_registrations')),null,2)
            </code>
          </div>
        )}

        {regs.length > 0 && (
          <>
            <button onClick={handleClear} style={{
              width:"100%",padding:"13px 0",borderRadius:14,
              background:confirmClear?"rgba(192,57,43,0.2)":"rgba(255,255,255,0.04)",
              border:`1px solid ${confirmClear?"#c0392b":"rgba(255,255,255,0.1)"}`,
              color:confirmClear?"#e74c3c":"rgba(240,244,255,0.4)",
              fontSize:13,fontWeight:700,cursor:"pointer",
            }}>
              {confirmClear?"⚠️ Confirmer la suppression totale ?":"🗑️ Supprimer toutes les inscriptions"}
            </button>
            {confirmClear && (
              <button onClick={() => setConfirmClear(false)} style={{
                width:"100%",padding:"10px 0",marginTop:8,
                background:"none",border:"none",
                color:"rgba(240,244,255,0.3)",fontSize:12,cursor:"pointer",
              }}>Annuler</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── MODULES LIST & SHIPS PAGES ─────────────────────────────────
const NAV_T:any = {
  fr:{ modules:"Tous les modules", ships:"Navires", shipsSoon:"Bibliothèque de navires bientôt disponible", back:"◀ Retour", roleOnBoard:"Rôle à Bord", deckDept:"Pont", engineDept:"Machine", specializedOps:"Opérations Spécialisées", examCenter:"Centre d'Examens", recommendedForYou:"Recommandé pour vous" },
  en:{ modules:"All modules", ships:"Ships", shipsSoon:"Ship library coming soon", back:"◀ Back", roleOnBoard:"Role On Board", deckDept:"Deck", engineDept:"Engine", specializedOps:"Specialized Operations", examCenter:"Exam Center", recommendedForYou:"Recommended for you" },
  es:{ modules:"Todos los módulos", ships:"Barcos", shipsSoon:"Biblioteca de barcos próximamente", back:"◀ Volver", roleOnBoard:"Rol a Bordo", deckDept:"Puente", engineDept:"Máquinas", specializedOps:"Operaciones Especializadas", examCenter:"Centro de Exámenes", recommendedForYou:"Recomendado para ti" },
  pt:{ modules:"Todos os módulos", ships:"Navios", shipsSoon:"Biblioteca de navios em breve", back:"◀ Voltar", roleOnBoard:"Função a Bordo", deckDept:"Convés", engineDept:"Máquinas", specializedOps:"Operações Especializadas", examCenter:"Centro de Exames", recommendedForYou:"Recomendado para você" },
};

// Exam Center — visual shell only (no functional logic, no data). See
// project_exams_system_architecture.md memory: 4 category placeholders per
// rank, each showing a "coming soon" state until Core Algorithm + real
// content are wired in a later phase.
const EXAM_CATEGORY_T:any = {
  fr:{
    foundation:"Épreuves fondamentales", specialty:"Épreuves de spécialités",
    practical:"Épreuves techniques et pratiques", remedial:"Épreuves de rattrapage",
    comingSoon:"Bientôt disponible",
    hint:"Choisis un rang pour voir ses 4 catégories d'épreuves",
  },
  en:{
    foundation:"Foundation Exams", specialty:"Specialty Exams",
    practical:"Technical & Practical Exams", remedial:"Remedial Exams",
    comingSoon:"Coming soon",
    hint:"Pick a rank to see its 4 exam categories",
  },
  es:{
    foundation:"Exámenes Fundamentales", specialty:"Exámenes de Especialidad",
    practical:"Exámenes Técnicos y Prácticos", remedial:"Exámenes de Recuperación",
    comingSoon:"Próximamente",
    hint:"Elige un rango para ver sus 4 categorías de exámenes",
  },
  pt:{
    foundation:"Exames Fundamentais", specialty:"Exames de Especialidade",
    practical:"Exames Técnicos e Práticos", remedial:"Exames de Recuperação",
    comingSoon:"Em breve",
    hint:"Escolhe um posto para ver as suas 4 categorias de exames",
  },
};

// Vessel category display order + labels for ShipsPage grouping.
const VESSEL_CATEGORY_ORDER = ["commercial", "offshore", "passenger", "fishing", "special"] as const;
const VESSEL_CATEGORY_LABEL:any = {
  fr:{ commercial:"Commercial", offshore:"Offshore", passenger:"Passagers", fishing:"Pêche", special:"Spécial" },
  en:{ commercial:"Commercial", offshore:"Offshore", passenger:"Passenger", fishing:"Fishing", special:"Special" },
  es:{ commercial:"Comercial", offshore:"Offshore", passenger:"Pasajeros", fishing:"Pesca", special:"Especial" },
  pt:{ commercial:"Comercial", offshore:"Offshore", passenger:"Passageiros", fishing:"Pesca", special:"Especial" },
};

function ModulesListPage({ lang, onBack, onStart }:{lang:string;onBack:()=>void;onStart:(m:any)=>void}) {
  const t = NAV_T[lang] || NAV_T.fr;
  const all = Object.values(ALL_MODULES as any).flat() as any[];
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={t.modules} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",gap:10}}>
        {all.map((m:any)=>(
          <button key={m.id} onClick={()=>onStart(m)} style={{
            display:"flex",alignItems:"center",gap:12,padding:"14px",
            background:"rgba(13,31,60,0.8)",border:`1px solid ${m.color}44`,
            borderRadius:16,cursor:"pointer",color:"#f0f4ff",textAlign:"left",
          }}>
            <div style={{width:44,height:44,borderRadius:12,background:`${m.color}22`,border:`1px solid ${m.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{m.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{m.title?.[lang] || m.title?.fr}</div>
              <div style={{fontSize:11,color:"rgba(240,244,255,0.5)"}}>{m.desc?.[lang] || m.desc?.fr}</div>
            </div>
            <div style={{fontSize:10,padding:"3px 8px",borderRadius:8,background:m.access==="free"?"rgba(30,138,74,0.2)":m.access==="premium_plus"?"rgba(142,68,173,0.2)":"rgba(201,146,42,0.2)",color:m.access==="free"?"#1e8a4a":m.access==="premium_plus"?"#9b59b6":"#c9922a",fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{m.access==="free"?"FREE":m.access==="premium_plus"?"P+":"PRO"}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// `selected`/`selectedOperationId` are controlled props (MAP Core V3.1,
// Étape 7) — owned by the parent (AppInner) instead of local useState, so a
// future caller (Dashboard's "Recommended for You", Étape 8) can drive this
// page straight to a specific operation. Everything else about this
// component — how it reads/mutates that state via onSelectedChange/
// onSelectedOperationIdChange — is unchanged from the previous local-state
// version; only where the state lives moved.
function ShipsPage({
  lang, onBack,
  selected, onSelectedChange,
  selectedOperationId, onSelectedOperationIdChange,
  highlightedOperationId, onHighlightedOperationIdChange,
}:{
  lang:string; onBack:()=>void;
  selected: string | null; onSelectedChange: (v: string | null) => void;
  selectedOperationId: string | null; onSelectedOperationIdChange: (v: string | null) => void;
  highlightedOperationId?: string | null; onHighlightedOperationIdChange?: (v: string | null) => void;
}) {
  const t = NAV_T[lang] || NAV_T.fr;
  const setSelected = onSelectedChange;
  const setSelectedOperationId = onSelectedOperationIdChange;
  const setHighlightedOperationId = onHighlightedOperationIdChange ?? (() => {});
  // Point 1 correctif (2026-09-01) — auto-scroll to the highlighted
  // operation's button once its Ship Card is on screen. Runs once per
  // (selected, highlightedOperationId) pair, not on every render.
  const highlightedOpRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (highlightedOperationId && highlightedOpRef.current) {
      highlightedOpRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected, highlightedOperationId]);

  const entries = Object.values(VESSEL_TYPE_REGISTRY).filter((v:any) => v.id !== "all" && SHIPS_LIBRARY_INDEX[v.id]);

  if (selected && SHIPS_LIBRARY_INDEX[selected]) {
    const specializedOps = getSpecializedOperationsByVesselType(selected as VesselTypeId);
    const selectedOp = selectedOperationId ? specializedOps.find(op => op.operationId === selectedOperationId) : null;

    if (selectedOp) {
      return (
        <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
          <TopBar onBack={() => setSelectedOperationId(null)} title={t.specializedOps} backLabel={t.back}/>
          <Suspense fallback={null}>
            <SpecializedLessonShared operation={selectedOp} lang={lang as SupportedLanguage} onBack={() => setSelectedOperationId(null)}/>
          </Suspense>
        </div>
      );
    }

    const ShipCard = SHIPS_LIBRARY_INDEX[selected] as any;
    return (
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
        <TopBar onBack={() => { setSelected(null); setHighlightedOperationId(null); }} title={t.ships} backLabel={t.back}/>
        <ShipCard lang={lang}/>
        {specializedOps.length > 0 && (
          <div style={{padding:"0 16px 40px",maxWidth:480,margin:"0 auto"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",margin:"8px 0 12px"}}>{t.specializedOps}</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {specializedOps.map((op) => {
                const isRecommended = !!highlightedOperationId && op.operationId === highlightedOperationId;
                return (
                  <button
                    key={op.operationId}
                    ref={isRecommended ? highlightedOpRef : undefined}
                    onClick={() => setSelectedOperationId(op.operationId)}
                    style={{
                      display:"flex",alignItems:"center",gap:12,padding:"14px",
                      background: isRecommended ? "rgba(201,146,42,0.16)" : "rgba(13,31,60,0.8)",
                      border: isRecommended ? "1.5px solid #e8b94f" : "1px solid rgba(201,146,42,0.35)",
                      borderRadius:16,cursor:"pointer",color:"#f0f4ff",textAlign:"left",
                      boxShadow: isRecommended ? "0 0 0 1px rgba(232,185,79,0.25)" : undefined,
                    }}
                  >
                    <div style={{width:36,height:36,borderRadius:10,background:"rgba(201,146,42,0.15)",border:"1px solid rgba(201,146,42,0.35)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>⚓</div>
                    <div style={{flex:1,minWidth:0}}>
                      {isRecommended && (
                        <div style={{fontSize:9,letterSpacing:1.5,color:"#e8b94f",fontFamily:"'Cinzel',serif",fontWeight:700,marginBottom:2}}>{t.recommendedForYou}</div>
                      )}
                      <div style={{fontSize:13,fontWeight:700}}>{op.title?.[lang] || op.title?.en}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  const categoryLabels = VESSEL_CATEGORY_LABEL[lang] || VESSEL_CATEGORY_LABEL.fr;
  const grouped = VESSEL_CATEGORY_ORDER.map((cat) => ({
    cat,
    items: entries.filter((v:any) => v.category === cat),
  })).filter((g) => g.items.length > 0);

  const renderShipButton = (v:any) => (
    <button key={v.id} onClick={()=>setSelected(v.id)} style={{
      display:"flex",alignItems:"center",gap:12,padding:"14px",
      background:"rgba(13,31,60,0.8)",border:"1px solid rgba(77,166,255,0.27)",
      borderRadius:16,cursor:"pointer",color:"#f0f4ff",textAlign:"left",
    }}>
      <div style={{width:36,height:36,borderRadius:10,background:"rgba(26,111,212,0.15)",border:"1px solid rgba(77,166,255,0.27)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🚢</div>
      <div style={{flex:1,minWidth:0,fontSize:13,fontWeight:700}}>{v.label?.[lang] || v.label?.fr}</div>
    </button>
  );

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={t.ships} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",gap:18}}>
        {grouped.map(({ cat, items }) => (
          <div key={cat}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:1,color:"rgba(240,244,255,0.5)",marginBottom:8,textTransform:"uppercase"}}>{categoryLabels[cat] || cat}</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {items.map(renderShipButton)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Role On Board — rank list + card display. Layer 0: freely browsable, no
// Dashboard/MAP Core/progression/Billing dependency. Ranks without a
// published card (all except "ab" for now) still open — RoleOnBoardShared
// itself renders the "no content published yet" fallback, never an error
// and never a missing list entry.
// `selected` is a controlled prop (MAP Core, Étape 7-bis) — owned by the
// parent (AppInner) instead of local useState, mirroring exactly what
// Étape 7 did for ShipsPage's `selected`/`selectedOperationId`: a future
// caller ("Recommended for You"'s Role Onboard link) can drive this page
// straight to the visé rank's content. Everything else about this
// component is unchanged from the previous local-state version.
function RoleOnBoardPage({
  lang, onBack, selected, onSelectedChange,
}:{
  lang:string; onBack:()=>void;
  selected: string | null; onSelectedChange: (v: string | null) => void;
}) {
  const t = NAV_T[lang] || NAV_T.fr;
  const setSelected = onSelectedChange;
  const deckRanks = getRanksByDepartment("deck");
  const engineRanks = getRanksByDepartment("engine");

  // List <-> detail is an internal toggle, not a `page` navigation, so it's
  // invisible to MaritimeApp's page-level scroll cache. Reset explicitly on
  // every toggle (including first mount) so the list always opens at the top
  // and never inherits whatever scroll depth the previous view was left at.
  useEffect(() => { window.scrollTo(0, 0); }, [selected]);

  if (selected) {
    return (
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
        <TopBar onBack={() => setSelected(null)} title={t.roleOnBoard} backLabel={t.back}/>
        <Suspense fallback={null}>
          <RoleOnBoardShared rankId={selected} lang={lang} onBack={() => setSelected(null)}/>
        </Suspense>
      </div>
    );
  }

  const renderRankButton = (r:any) => (
    <button key={r.id} onClick={()=>setSelected(r.id)} style={{
      display:"flex",alignItems:"center",gap:12,padding:"14px",
      background:"rgba(13,31,60,0.8)",border:"1px solid rgba(77,166,255,0.27)",
      borderRadius:16,cursor:"pointer",color:"#f0f4ff",textAlign:"left",
    }}>
      <div style={{width:36,height:36,borderRadius:10,background:"rgba(26,111,212,0.15)",border:"1px solid rgba(77,166,255,0.27)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>⚓</div>
      <div style={{flex:1,minWidth:0,fontSize:13,fontWeight:700}}>{r.label?.[lang] || r.label?.fr}</div>
    </button>
  );

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={t.roleOnBoard} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",gap:18}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:1,color:"rgba(240,244,255,0.5)",marginBottom:8,textTransform:"uppercase"}}>{t.deckDept}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {deckRanks.map(renderRankButton)}
          </div>
        </div>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:1,color:"rgba(240,244,255,0.5)",marginBottom:8,textTransform:"uppercase"}}>{t.engineDept}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {engineRanks.map(renderRankButton)}
          </div>
        </div>
      </div>
    </div>
  );
}

// Exam Center — visual shell only. Structure and navigation, no functional
// logic, no real data: lists ranks (rankRegistry.ts), and per rank shows the
// 4 exam categories as placeholders. Not connected to lessonRegistry.ts,
// specializedOperationRegistry.ts, or any scenario engine — that wiring
// depends on the Core Algorithm chantier (see memory: project_exams_system_architecture.md).
function ExamCenterPage({ lang, onBack }:{lang:string;onBack:()=>void}) {
  const t = NAV_T[lang] || NAV_T.fr;
  const ct = EXAM_CATEGORY_T[lang] || EXAM_CATEGORY_T.fr;
  const [selected, setSelected] = useState<string | null>(null);
  const deckRanks = getRanksByDepartment("deck");
  const engineRanks = getRanksByDepartment("engine");

  useEffect(() => { window.scrollTo(0, 0); }, [selected]);

  const categories = ["foundation", "specialty", "practical", "remedial"] as const;

  if (selected) {
    const rankMeta = getRankMeta(selected as any);
    const rankLabel = rankMeta?.label?.[lang] || rankMeta?.label?.fr || selected;
    return (
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
        <TopBar onBack={() => setSelected(null)} title={rankLabel} backLabel={t.back}/>
        <div style={{padding:"16px",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",gap:10}}>
          {categories.map((cat) => (
            <div key={cat} style={{
              position:"relative",display:"flex",alignItems:"center",gap:12,padding:"16px",
              background:"rgba(13,31,60,0.6)",border:"1px dashed rgba(77,166,255,0.27)",
              borderRadius:16,
            }}>
              <div style={{width:36,height:36,borderRadius:10,background:"rgba(26,111,212,0.1)",border:"1px solid rgba(77,166,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,opacity:0.6}}>📝</div>
              <div style={{flex:1,minWidth:0,fontSize:13,fontWeight:700,color:"rgba(240,244,255,0.7)"}}>{ct[cat]}</div>
              <div style={{
                fontSize:9,padding:"2px 7px",borderRadius:10,flexShrink:0,
                background:"rgba(201,146,42,0.15)",border:"1px solid rgba(201,146,42,0.33)",
                color:"#c9922a",letterSpacing:1,fontFamily:"'Cinzel',serif",
              }}>{ct.comingSoon}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const renderRankButton = (r:any) => (
    <button key={r.id} onClick={()=>setSelected(r.id)} style={{
      display:"flex",alignItems:"center",gap:12,padding:"14px",
      background:"rgba(13,31,60,0.8)",border:"1px solid rgba(77,166,255,0.27)",
      borderRadius:16,cursor:"pointer",color:"#f0f4ff",textAlign:"left",
    }}>
      <div style={{width:36,height:36,borderRadius:10,background:"rgba(26,111,212,0.15)",border:"1px solid rgba(77,166,255,0.27)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>📝</div>
      <div style={{flex:1,minWidth:0,fontSize:13,fontWeight:700}}>{r.label?.[lang] || r.label?.fr}</div>
    </button>
  );

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={t.examCenter} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",gap:18}}>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",lineHeight:1.5}}>{ct.hint}</div>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:1,color:"rgba(240,244,255,0.5)",marginBottom:8,textTransform:"uppercase"}}>{t.deckDept}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {deckRanks.map(renderRankButton)}
          </div>
        </div>
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:1,color:"rgba(240,244,255,0.5)",marginBottom:8,textTransform:"uppercase"}}>{t.engineDept}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {engineRanks.map(renderRankButton)}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationLessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).deck.find((m:any)=>m.id==="d1");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Navigation";
  const labels:any = {
    fr:{header:"Leçons", available:"Disponible", soon:"Bientôt", done:"Terminé ✓"},
    en:{header:"Lessons", available:"Available", soon:"Coming soon", done:"Completed ✓"},
    es:{header:"Lecciones", available:"Disponible", soon:"Próximamente", done:"Completado ✓"},
    pt:{header:"Lições", available:"Disponível", soon:"Em breve", done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7","l8","l9","l10"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`d1-${l.id}`);
            const tag = l.access==="free" ? "FREE" : l.access==="premium_plus" ? "P+" : "PRO";
            const tagColor = l.access==="free" ? "#1e8a4a" : l.access==="premium_plus" ? "#9b59b6" : "#c9922a";
            return (
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px",
                background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",
                border:`1px solid ${isPlayable?"#1a6fd444":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",
                color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6,
              }}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(26,111,212,0.18)",border:"1px solid #1a6fd444",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#4da6ff"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang] || l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone ? L.done : (isPlayable ? L.available : L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EngineLessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).engine.find((m:any)=>m.id==="e1");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Main Engine & Propulsion";
  const labels:any = {
    fr:{header:"Leçons", available:"Disponible", soon:"Bientôt", done:"Terminé ✓"},
    en:{header:"Lessons", available:"Available", soon:"Coming soon", done:"Completed ✓"},
    es:{header:"Lecciones", available:"Disponible", soon:"Próximamente", done:"Completado ✓"},
    pt:{header:"Lições", available:"Disponível", soon:"Em breve", done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7","l8"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`e1-${l.id}`);
            const tag = l.access==="free" ? "FREE" : l.access==="premium_plus" ? "P+" : "PRO";
            const tagColor = l.access==="free" ? "#1e8a4a" : l.access==="premium_plus" ? "#9b59b6" : "#c9922a";
            return (
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px",
                background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",
                border:`1px solid ${isPlayable?"#e67e2244":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",
                color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6,
              }}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(230,126,34,0.18)",border:"1px solid #e67e2244",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#e67e22"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang] || l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone ? L.done : (isPlayable ? L.available : L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MarpolLessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).engine.find((m:any)=>m.id==="e4");
  const title = mod?.title?.[lang] || mod?.title?.fr || "MARPOL";
  const labels:any = {
    fr:{header:"Leçons", available:"Disponible", soon:"Bientôt", done:"Terminé ✓"},
    en:{header:"Lessons", available:"Available", soon:"Coming soon", done:"Completed ✓"},
    es:{header:"Lecciones", available:"Disponible", soon:"Próximamente", done:"Completado ✓"},
    pt:{header:"Lições", available:"Disponível", soon:"Em breve", done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`e4-${l.id}`);
            const tag = l.access==="free" ? "FREE" : l.access==="premium_plus" ? "P+" : "PRO";
            const tagColor = l.access==="free" ? "#1e8a4a" : l.access==="premium_plus" ? "#9b59b6" : "#c9922a";
            return (
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px",
                background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",
                border:`1px solid ${isPlayable?"#0a8a6c44":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",
                color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6,
              }}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(10,138,108,0.18)",border:"1px solid #0a8a6c44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#0a8a6c"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang] || l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone ? L.done : (isPlayable ? L.available : L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SeempLessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).engine.find((m:any)=>m.id==="e5");
  const title = mod?.title?.[lang] || mod?.title?.fr || "SEEMP & Energy Efficiency";
  const labels:any = {
    fr:{header:"Leçons", available:"Disponible", soon:"Bientôt", done:"Terminé ✓"},
    en:{header:"Lessons", available:"Available", soon:"Coming soon", done:"Completed ✓"},
    es:{header:"Lecciones", available:"Disponible", soon:"Próximamente", done:"Completado ✓"},
    pt:{header:"Lições", available:"Disponível", soon:"Em breve", done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`e5-${l.id}`);
            const tag = l.access==="free" ? "FREE" : l.access==="premium_plus" ? "P+" : "PRO";
            const tagColor = l.access==="free" ? "#1e8a4a" : l.access==="premium_plus" ? "#9b59b6" : "#c9922a";
            return (
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px",
                background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",
                border:`1px solid ${isPlayable?"#1e8a4a44":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",
                color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6,
              }}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(30,138,74,0.18)",border:"1px solid #1e8a4a44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#1e8a4a"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang] || l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone ? L.done : (isPlayable ? L.available : L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function IMLLessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).deck.find((m:any)=>m.id==="d2");
  const title = mod?.title?.[lang] || mod?.title?.fr || "International Maritime Law";
  const labels:any = {
    fr:{header:"Leçons", available:"Disponible", soon:"Bientôt", done:"Terminé ✓"},
    en:{header:"Lessons", available:"Available", soon:"Coming soon", done:"Completed ✓"},
    es:{header:"Lecciones", available:"Disponible", soon:"Próximamente", done:"Completado ✓"},
    pt:{header:"Lições", available:"Disponível", soon:"Em breve", done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7","l8","l9","l10"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`d2-${l.id}`);
            const tag = l.access==="free" ? "FREE" : l.access==="premium_plus" ? "P+" : "PRO";
            const tagColor = l.access==="free" ? "#1e8a4a" : l.access==="premium_plus" ? "#9b59b6" : "#c9922a";
            return (
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px",
                background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",
                border:`1px solid ${isPlayable?"#c9922a44":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",
                color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6,
              }}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(201,146,42,0.18)",border:"1px solid #c9922a44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#c9922a"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang] || l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone ? L.done : (isPlayable ? L.available : L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SBLessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).deck.find((m:any)=>m.id==="d3");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Signaling & Buoyage";
  const labels:any = {
    fr:{header:"Leçons", available:"Disponible", soon:"Bientôt", done:"Terminé ✓"},
    en:{header:"Lessons", available:"Available", soon:"Coming soon", done:"Completed ✓"},
    es:{header:"Lecciones", available:"Disponible", soon:"Próximamente", done:"Completado ✓"},
    pt:{header:"Lições", available:"Disponível", soon:"Em breve", done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7","l8"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`d3-${l.id}`);
            const tag = l.access==="free" ? "FREE" : l.access==="premium_plus" ? "P+" : "PRO";
            const tagColor = l.access==="free" ? "#1e8a4a" : l.access==="premium_plus" ? "#9b59b6" : "#c9922a";
            return (
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px",
                background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",
                border:`1px solid ${isPlayable?"#0a8a6c44":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",
                color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6,
              }}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(10,138,108,0.18)",border:"1px solid #0a8a6c44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#0a8a6c"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang] || l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone ? L.done : (isPlayable ? L.available : L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SMCPLessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).deck.find((m:any)=>m.id==="d4");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Maritime English SMCP";
  const labels:any = {
    fr:{header:"Leçons", available:"Disponible", soon:"Bientôt", done:"Terminé ✓"},
    en:{header:"Lessons", available:"Available", soon:"Coming soon", done:"Completed ✓"},
    es:{header:"Lecciones", available:"Disponible", soon:"Próximamente", done:"Completado ✓"},
    pt:{header:"Lições", available:"Disponível", soon:"Em breve", done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7","l8"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`d4-${l.id}`);
            const tag = l.access==="free" ? "FREE" : l.access==="premium_plus" ? "P+" : "PRO";
            const tagColor = l.access==="free" ? "#1e8a4a" : l.access==="premium_plus" ? "#9b59b6" : "#c9922a";
            return (
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px",
                background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",
                border:`1px solid ${isPlayable?"#9b59b644":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",
                color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6,
              }}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(155,89,182,0.18)",border:"1px solid #9b59b644",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#9b59b6"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang] || l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone ? L.done : (isPlayable ? L.available : L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SeamanshipLessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).deck.find((m:any)=>m.id==="d6");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Seamanship";
  const labels:any = {
    fr:{header:"Leçons", available:"Disponible", soon:"Bientôt", done:"Terminé ✓"},
    en:{header:"Lessons", available:"Available", soon:"Coming soon", done:"Completed ✓"},
    es:{header:"Lecciones", available:"Disponible", soon:"Próximamente", done:"Completado ✓"},
    pt:{header:"Lições", available:"Disponível", soon:"Em breve", done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`d6-${l.id}`);
            const tag = l.access==="free" ? "FREE" : l.access==="premium_plus" ? "P+" : "PRO";
            const tagColor = l.access==="free" ? "#1e8a4a" : l.access==="premium_plus" ? "#9b59b6" : "#c9922a";
            return (
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px",
                background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",
                border:`1px solid ${isPlayable?"#0a8a6c44":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",
                color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6,
              }}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(10,138,108,0.18)",border:"1px solid #0a8a6c44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#0a8a6c"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang] || l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone ? L.done : (isPlayable ? L.available : L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function MeteorologyLessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).deck.find((m:any)=>m.id==="d7");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Marine Meteorology";
  const labels:any = {
    fr:{header:"Leçons", available:"Disponible", soon:"Bientôt", done:"Terminé ✓"},
    en:{header:"Lessons", available:"Available", soon:"Coming soon", done:"Completed ✓"},
    es:{header:"Lecciones", available:"Disponible", soon:"Próximamente", done:"Completado ✓"},
    pt:{header:"Lições", available:"Disponível", soon:"Em breve", done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`d7-${l.id}`);
            // access tier not yet decided (Billing policy pending) — don't assume free/premium, show no tag
            const tag = l.access==="free" ? "FREE" : l.access==="premium_plus" ? "P+" : l.access==="premium" ? "PRO" : null;
            const tagColor = l.access==="free" ? "#1e8a4a" : l.access==="premium_plus" ? "#9b59b6" : "#c9922a";
            return (
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px",
                background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",
                border:`1px solid ${isPlayable?"#0a8a6c44":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",
                color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6,
              }}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(10,138,108,0.18)",border:"1px solid #0a8a6c44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#0a8a6c"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang] || l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone ? L.done : (isPlayable ? L.available : L.soon)}</div>
                </div>
                {tag && <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function ShipCareerLessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).deck.find((m:any)=>m.id==="d5");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Ship Career Navigator";
  const labels:any = {
    fr:{header:"Leçons", available:"Disponible", soon:"Bientôt", done:"Terminé ✓"},
    en:{header:"Lessons", available:"Available", soon:"Coming soon", done:"Completed ✓"},
    es:{header:"Lecciones", available:"Disponible", soon:"Próximamente", done:"Completado ✓"},
    pt:{header:"Lições", available:"Disponível", soon:"Em breve", done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`d5-${l.id}`);
            const tag = l.access==="free" ? "FREE" : l.access==="premium_plus" ? "P+" : "PRO";
            const tagColor = l.access==="free" ? "#1e8a4a" : l.access==="premium_plus" ? "#9b59b6" : "#c9922a";
            return (
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{
                display:"flex",alignItems:"center",gap:12,padding:"14px",
                background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",
                border:`1px solid ${isPlayable?"#8b5cf644":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",
                color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6,
              }}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(139,92,246,0.18)",border:"1px solid #8b5cf644",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#a78bfa"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang] || l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone ? L.done : (isPlayable ? L.available : L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function E2LessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).engine.find((m:any)=>m.id==="e2");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Auxiliary Systems";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`e2-${l.id}`);
            const tag=l.access==="free"?"FREE":l.access==="premium_plus"?"P+":"PRO";
            const tagColor=l.access==="free"?"#1e8a4a":l.access==="premium_plus"?"#9b59b6":"#c9922a";
            return(
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",border:`1px solid ${isPlayable?"#4da6ff44":"rgba(255,255,255,0.08)"}`,borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(77,166,255,0.18)",border:"1px solid #4da6ff44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#4da6ff"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang]||l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone?L.done:(isPlayable?L.available:L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function E3LessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).engine.find((m:any)=>m.id==="e3");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Boilers";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`e3-${l.id}`);
            const tag=l.access==="free"?"FREE":l.access==="premium_plus"?"P+":"PRO";
            const tagColor=l.access==="free"?"#1e8a4a":l.access==="premium_plus"?"#9b59b6":"#c9922a";
            return(
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",border:`1px solid ${isPlayable?"#e67e2244":"rgba(255,255,255,0.08)"}`,borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(230,126,34,0.18)",border:"1px solid #e67e2244",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#e67e22"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang]||l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone?L.done:(isPlayable?L.available:L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function E6LessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).engine.find((m:any)=>m.id==="e6");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Cargo Systems";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`e6-${l.id}`);
            const tag=l.access==="free"?"FREE":l.access==="premium_plus"?"P+":"PRO";
            const tagColor=l.access==="free"?"#1e8a4a":l.access==="premium_plus"?"#9b59b6":"#c9922a";
            return(
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",border:`1px solid ${isPlayable?"#0a8a6c44":"rgba(255,255,255,0.08)"}`,borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(10,138,108,0.18)",border:"1px solid #0a8a6c44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#0a8a6c"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang]||l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone?L.done:(isPlayable?L.available:L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function E7LessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).engine.find((m:any)=>m.id==="e7");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Automation & UMS";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`e7-${l.id}`);
            const tag=l.access==="free"?"FREE":l.access==="premium_plus"?"P+":"PRO";
            const tagColor=l.access==="free"?"#1e8a4a":l.access==="premium_plus"?"#9b59b6":"#c9922a";
            return(
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",border:`1px solid ${isPlayable?"#9b59b644":"rgba(255,255,255,0.08)"}`,borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(155,89,182,0.18)",border:"1px solid #9b59b644",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#9b59b6"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang]||l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone?L.done:(isPlayable?L.available:L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function S1LessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).safety.find((m:any)=>m.id==="s1");
  const title = mod?.title?.[lang] || mod?.title?.fr || "COLREG Safety";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`s1-${l.id}`);
            const tag=l.access==="free"?"FREE":l.access==="premium_plus"?"P+":"PRO";
            const tagColor=l.access==="free"?"#1e8a4a":l.access==="premium_plus"?"#9b59b6":"#c9922a";
            return(
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",border:`1px solid ${isPlayable?"#c0392b44":"rgba(255,255,255,0.08)"}`,borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(192,57,43,0.18)",border:"1px solid #c0392b44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#c0392b"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang]||l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone?L.done:(isPlayable?L.available:L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function S2LessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).safety.find((m:any)=>m.id==="s2");
  const title = mod?.title?.[lang] || mod?.title?.fr || "EPIRB, SART & GMDSS";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`s2-${l.id}`);
            const tag=l.access==="free"?"FREE":l.access==="premium_plus"?"P+":"PRO";
            const tagColor=l.access==="free"?"#1e8a4a":l.access==="premium_plus"?"#9b59b6":"#c9922a";
            return(
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",border:`1px solid ${isPlayable?"#c0392b44":"rgba(255,255,255,0.08)"}`,borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(192,57,43,0.18)",border:"1px solid #c0392b44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#c0392b"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang]||l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone?L.done:(isPlayable?L.available:L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function S3LessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).safety.find((m:any)=>m.id==="s3");
  const title = mod?.title?.[lang] || mod?.title?.fr || "STCW First Aid";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7","l8"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`s3-${l.id}`);
            const tag="PRO";
            const tagColor="#c9922a";
            return(
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",border:`1px solid ${isPlayable?"#c0392b44":"rgba(255,255,255,0.08)"}`,borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(192,57,43,0.18)",border:"1px solid #c0392b44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#c0392b"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang]||l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone?L.done:(isPlayable?L.available:L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function S4LessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).safety.find((m:any)=>m.id==="s4");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Firefighting";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`s4-${l.id}`);
            const tag="PRO";
            const tagColor="#c9922a";
            return(
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",border:`1px solid ${isPlayable?"#c0392b44":"rgba(255,255,255,0.08)"}`,borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(192,57,43,0.18)",border:"1px solid #c0392b44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#c0392b"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang]||l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone?L.done:(isPlayable?L.available:L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function S5LessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).safety.find((m:any)=>m.id==="s5");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Lifeboats, Liferafts & HRU";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`s5-${l.id}`);
            const tag="PRO";
            const tagColor="#c9922a";
            return(
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",border:`1px solid ${isPlayable?"#4da6ff44":"rgba(255,255,255,0.08)"}`,borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(77,166,255,0.18)",border:"1px solid #4da6ff44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#4da6ff"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang]||l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone?L.done:(isPlayable?L.available:L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
  function S6LessonsPage({ lang, onBack, onPick, completedLessons, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link to a
  // specific lesson, bypassing this module's own list. Reuses onPick
  // exactly as-is (no duplication of its id->page mapping) via an
  // auto-trigger on mount. Renders a neutral transition screen instead of
  // this page's real list while the redirect is in flight, so the user
  // never sees this list flash before landing on the lesson.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).safety.find((m:any)=>m.id==="s6");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Ship Safety Operations & Emergency Readiness";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6"]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`s6-${l.id}`);
            const tag="PRO";
            const tagColor="#c9922a";
            return(
              <button key={l.id} disabled={!isPlayable} onClick={()=>onPick(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",background:isPlayable?"rgba(13,31,60,0.85)":"rgba(13,31,60,0.4)",border:`1px solid ${isPlayable?"#e67e2244":"rgba(255,255,255,0.08)"}`,borderRadius:14,cursor:isPlayable?"pointer":"not-allowed",color:"#f0f4ff",textAlign:"left",opacity:isPlayable?1:0.6}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(230,126,34,0.18)",border:"1px solid #e67e2244",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0,color:"#e67e22"}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{l.title?.[lang]||l.title?.fr}</div>
                  <div style={{fontSize:10,color:"rgba(240,244,255,0.5)"}}>{isDone?L.done:(isPlayable?L.available:L.soon)}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:`${tagColor}22`,color:tagColor,fontWeight:700,letterSpacing:0.5,flexShrink:0}}>{tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
  }

// ── ROOT ───────────────────────────────────────────────────────
export default function App() {
  return (
    <MusicProvider>
      <AppInner />
    </MusicProvider>
  );
}


function AppInner() {
  const { enable, disable } = useMusic();
  const [page, setPageState] = useState<string>("splash");

  // Manual scroll position save/restore per internal `page` screen.
  // Internal navigation goes through this useState, not real TanStack Router
  // routes, so the router's scrollRestoration:true never sees these transitions
  // (see audits/2026-07-24_dashboard-progression-scroll.md, point 4).
  //
  // The save must happen synchronously, at the moment navigation is triggered,
  // while the outgoing page's DOM is still the one on screen — not in a
  // useEffect cleanup, which by the time it runs has already seen React commit
  // the new page's DOM, so window.scrollY would reflect the new (often
  // shorter) page instead of the one being left
  // (see audits/2026-07-24_diagnostic-scroll-partiel.md).
  //
  // `setPage` wraps the raw state setter so every existing call site — direct
  // calls and every place `setPage` is passed down as a prop — captures scroll
  // for free, without touching those ~500+ call sites individually.
  const scrollPositionsRef = useRef<Record<string, number>>({});

  // Pages that must never be treated as a "resume point" on relaunch: pre-auth
  // onboarding steps, and transient/sensitive flows (password recovery, admin
  // login). Everything else — dashboard, module list pages, individual lessons —
  // is fair game to restore to instead of always dumping the user back on the
  // dashboard after the WebView gets killed and relaunched (see Phase B of the
  // 2026-08 session-persistence fix).
  const NON_RESUMABLE_PAGES = new Set([
    "splash","lang","music","welcome","bridge","register","questionnaire","status",
    "reset_password","admin-login","admin",
  ]);
  const NAV_RESUME_KEY = "map_last_page";

  // Pages that manage their own internal list/detail sub-navigation via local
  // state instead of this `page` value (e.g. RoleOnBoardPage's `selected`
  // rank toggle). For those, `window.scrollY` at the moment `page` changes
  // reflects whatever the sub-view was scrolled to, not the page itself — so
  // caching/restoring it here just replays a stale, unrelated position.
  const SCROLL_CACHE_EXEMPT = new Set(["role_on_board"]);

  const setPage = (next: string) => {
    if (typeof window !== "undefined") {
      if (!SCROLL_CACHE_EXEMPT.has(page)) scrollPositionsRef.current[page] = window.scrollY;
      try {
        if (NON_RESUMABLE_PAGES.has(next)) localStorage.removeItem(NAV_RESUME_KEY);
        else localStorage.setItem(NAV_RESUME_KEY, next);
      } catch {}
    }
    setPageState(next);
  };

  // Restore only: runs after the new page's DOM has been committed and
  // painted (useEffect timing), with an extra requestAnimationFrame tick as a
  // safety margin for layout to settle before scrolling.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (SCROLL_CACHE_EXEMPT.has(page)) return;
    const saved = scrollPositionsRef.current[page];
    if (saved === undefined) return;
    const raf = requestAnimationFrame(() => window.scrollTo(0, saved));
    return () => cancelAnimationFrame(raf);
  }, [page]);

  useEffect(() => {
  if (typeof window === "undefined") return;

  const hasProfile = () => {
    try { return !!localStorage.getItem("map_status_card"); } catch { return false; }
  };
  // Where the user actually was before the session was interrupted (app closed,
  // WebView killed on wake), so a restored session lands back on the exact
  // dashboard/module/lesson page instead of always bouncing to "dashboard".
  // Only used when a profile already exists — never skips onboarding.
  const resumePage = () => {
    try {
      const saved = localStorage.getItem(NAV_RESUME_KEY);
      if (saved && !NON_RESUMABLE_PAGES.has(saved)) return saved;
    } catch {}
    return "dashboard";
  };
try { localStorage.removeItem("map_completed_lessons"); } catch {}
  const syncLocalProfile = (user: any) => {
  try {
    if (!user) return;
    const name = user.user_metadata?.name || (user.email ? user.email.split("@")[0] : "Marin");
    const existing = JSON.parse(localStorage.getItem("map_last_reg") || "{}");
    localStorage.setItem("map_last_reg", JSON.stringify({
      ...existing,
      name,
      email: user.email,
      createdAt: user.created_at,
    }));
    const savedCard = JSON.parse(localStorage.getItem("map_status_card") || "{}");
    if (savedCard?.lang) setLang(savedCard.lang);
  } catch {}
};

  // Loads xp/streak/completed_lessons + name/lang/dept/tier for a *confirmed* session user.
  // Called only from spots where `user` comes straight off a session/auth event, never from
  // a standalone getUser() call — that call can race the client's session-restore on a cold
  // reload and resolve with a null user, silently skipping the load with nothing to retry it
  // (this was the progression-reset-on-reconnect bug: local cache is cleared above, and if
  // this fetch never runs, nothing ever repopulates completedLessons/userXP/userStreak).
  // One retry on error/race covers a slow network without looping forever.
  const loadUserProgress = (user: any, attempt = 0) => {
    if (!user) return;
    supabase
      .from("user_progress")
      .select("completed_lessons, xp, streak")
      .eq("user_id", user.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("[loadUserProgress] user_progress fetch failed:", error);
          if (attempt < 1) setTimeout(() => loadUserProgress(user, attempt + 1), 1500);
          return;
        }
        setCompletedLessons(data?.completed_lessons || []);
        try { localStorage.setItem("map_completed_lessons", JSON.stringify(data?.completed_lessons || [])); } catch {}
        if (data?.xp !== undefined) setUserXP(data.xp || 0);
        if (data?.streak !== undefined) setUserStreak(data.streak || 1);
      });

    supabase
      .from("user_profiles")
      .select("name, lang, dept, tier, ship, target, who, level, duration, time")
      .eq("user_id", user.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("[loadUserProgress] user_profiles fetch failed:", error);
          if (attempt < 1) setTimeout(() => loadUserProgress(user, attempt + 1), 1500);
          return;
        }
        if (data) {
          // Only merge in columns Supabase actually has a value for — a
          // NULL here (e.g. a profile saved before ship/target/who/level/
          // duration/time were persisted) must not clobber a correct local
          // value already in state/localStorage.
          const definedData = Object.fromEntries(
            Object.entries(data).filter(([, v]) => v !== null && v !== undefined)
          );
          setProfile((p: any) => ({ ...p, ...definedData }));
          if (data.lang) setLang(data.lang);
          if (data.tier) setUserPlan(data.tier);
          if (data.dept) setDashboardTab(data.dept);
          try {
            const raw = localStorage.getItem("map_status_card");
            const saved = raw ? JSON.parse(raw) : {};
            localStorage.setItem("map_status_card", JSON.stringify({ ...saved, ...definedData }));
          } catch {}
        }
      });
  };


    if (window.location.hash.includes("access_token")) {
  setPage("reset_password");
} else {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      syncLocalProfile(session.user);
      loadUserProgress(session.user);
      setPage(hasProfile() ? resumePage() : "questionnaire");
    }
  });
}


  const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      if (session) syncLocalProfile(session.user);
      setPage("reset_password");
    }
    if (event === "SIGNED_IN" && session) {
      syncLocalProfile(session.user);
      loadUserProgress(session.user);
      setPage(hasProfile() ? resumePage() : "questionnaire");
    }
    if (event === "SIGNED_OUT") {
      setPage("lang");
    }
  });

  return () => listener.subscription.unsubscribe();
}, []);
  const [lang, setLang] = useState("fr");
const [profile, setProfile] = useState({});
const [completedLessons, setCompletedLessons] = useState<string[]>([]);
const markLessonCompleted = async (id: string) => {
  setCompletedLessons((prev) => {
    if (prev.includes(id)) return prev;
    const next = [...prev, id];
    try { localStorage.setItem("map_completed_lessons", JSON.stringify(next)); } catch {}
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      
        const today = new Date().toISOString().split("T")[0];
supabase
  .from("user_progress")
  .select("xp, streak, last_login_date")
  .eq("user_id", user.id)
  .single()
  .then(({ data: prog }) => {
    const lastDate = prog?.last_login_date || "";
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    const newStreak = lastDate === today ? (prog?.streak || 1) : lastDate === yesterday ? (prog?.streak || 1) + 1 : 1;
    const lessonXP = 100;
    if (prog?.xp !== undefined && prog?.xp !== null && typeof prog.xp !== "number") {
      console.warn(`[markLessonCompleted] prog.xp from Supabase is not a number — value: ${JSON.stringify(prog.xp)}, type: ${typeof prog.xp}`);
    }
    const newXP = (prog?.xp || 0) + lessonXP;
    setUserXP(newXP);
setUserStreak(newStreak);
    supabase.from("user_progress").upsert({
      user_id: user.id,
      completed_lessons: next,
      xp: newXP,
      streak: newStreak,
      last_login_date: today,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" }).then(() => {});
  });
    });
    return next;
  });
};
useEffect(() => {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("map_status_card");
    if (raw) {
      const saved = JSON.parse(raw);
      if (saved && typeof saved === "object") {
        setProfile(saved);
        if (saved.lang) setLang(saved.lang);
        if (saved.dept) setDashboardTab(saved.dept);
      }
    }
  } catch {}
}, []);
  const [userPlan, setUserPlan] = useState<"free"|"premium"|"premium_plus">("free");
const [userXP, setUserXP] = useState(0);
const [userStreak, setUserStreak] = useState(1);

  // SSR-safe replacement for the `map_last_reg`/`map_user_photo` reads that
  // used to happen inline, per-page, guarded by `typeof window !== "undefined"`
  // (page==="status" and page==="dashboard" blocks below) — that guard
  // prevented a crash but not the hydration mismatch: the server always
  // skipped the branch (window is undefined there), while the client's very
  // first render ran it for real, so `username`/`photo`/`createdAt` differed
  // between server HTML and client hydration. Same fix pattern as
  // Dashboard.tsx's greeting/hasPremium: a fixed, SSR-matching initial value
  // ({}/null on both sides), the real value applied only after mount.
  //
  // Refresh trigger, not just mount-once ([]): `[page]` re-reads localStorage
  // on every page transition. This is deliberately broader than "only when
  // landing on status/dashboard" for simplicity, but it's correct precisely
  // because of real write-ordering in this file, checked directly rather
  // than assumed — every place that writes map_last_reg/map_user_photo
  // (syncLocalProfile() on SIGNED_IN/PASSWORD_RECOVERY, the legacy lead-
  // capture form's handleSubmit, QuestionnaireS7.tsx's photo upload/remove)
  // does so, synchronously, strictly BEFORE the setPage() call that would
  // ever bring the user to "status" or "dashboard" — so by the time `page`
  // actually changes to one of those values and this effect re-runs, the
  // write has already landed. No event listener or extra plumbing needed.
  const [lastReg, setLastReg] = useState<any>({});
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  useEffect(() => {
    try {
      setLastReg(JSON.parse(localStorage.getItem("map_last_reg") || "{}"));
      setUserPhoto(localStorage.getItem("map_user_photo"));
    } catch {}
  }, [page]);
  // Lifted out of Dashboard so the selected tab (deck/engine/safety/tools) survives leaving
  // and returning to the dashboard page (Dashboard unmounts/remounts on every page change,
  // which used to reset this to profile.dept and always land back on Deck).
  const [dashboardTab, setDashboardTab] = useState<"deck"|"engine"|"safety"|"tools">("deck");

  // MAP Core V3.1 — Recommendation Engine, Étape 7 (state plumbing only,
  // Dashboard NOT wired to this yet — see project_core_algorithm_ui_wiring.md).
  // Lifted out of ShipsPage for the same reason as dashboardTab above: state
  // that used to live inside a page component, now owned here so it can be
  // driven from outside that component. ShipsPage still owns and mutates it
  // exactly as before via the setter props (browse → select ship → select
  // operation is unchanged) — this only moves WHERE the state lives, not how
  // ShipsPage itself uses it.
  //
  // navigateToSpecializedOperation() is the deep-link entry point a future
  // Dashboard "Recommended for You" card (Étape 8) will call: it sets both
  // pieces of state AND switches to the "ships" page in one step, landing
  // directly on SpecializedLessonShared for that exact operation — bypassing
  // the generic vessel-type list ShipsPage otherwise starts on. Not called
  // from anywhere yet.
  const [shipsSelected, setShipsSelected] = useState<string | null>(null);
  const [shipsSelectedOperationId, setShipsSelectedOperationId] = useState<string | null>(null);
  // Point 1 correctif (2026-09-01) — separate from shipsSelectedOperationId
  // above (which means "skip straight to this operation's page"). This one
  // means "while showing the Ship Card, visually highlight/scroll to this
  // operation in its list" — set only by navigateToShipCard().
  const [shipsHighlightedOperationId, setShipsHighlightedOperationId] = useState<string | null>(null);
  const navigateToSpecializedOperation = (vesselTypeId: string, operationId: string) => {
    setShipsSelected(vesselTypeId);
    setShipsSelectedOperationId(operationId);
    setPage("ships");
  };

  // Core Algorithm redéfini (2026-08-31) — the new "Recommended for You"
  // dream-vessel card lands on the Ship Card itself, not a specific
  // operation (unlike navigateToSpecializedOperation above, still kept
  // for potential future use, just no longer called by Dashboard.tsx).
  // Lighter variant: same lifted state, leaves selectedOperationId null —
  // that field still means "skip straight to this operation's own page"
  // (navigateToSpecializedOperation's contract), which is NOT what this
  // function does.
  //
  // Point 1 correctif (2026-09-01) — optional `highlightOperationId`: the
  // operation that motivated the dream-vessel recommendation (if any,
  // computed by Dashboard.tsx from getSpecializedOperationsForTrajectory-
  // AndVesselType()), shown as a highlighted/scrolled-to entry ON the Ship
  // Card's own operations list — a different UX from
  // navigateToSpecializedOperation's "skip straight to the operation's
  // page" (no such "highlighted in list" state existed anywhere in the
  // app before this). Kept as a separate state var
  // (shipsHighlightedOperationId) rather than reusing
  // shipsSelectedOperationId, precisely to not conflate the two behaviors.
  const navigateToShipCard = (vesselTypeId: string, highlightOperationId?: string | null) => {
    setShipsSelected(vesselTypeId);
    setShipsSelectedOperationId(null);
    setShipsHighlightedOperationId(highlightOperationId ?? null);
    setPage("ships");
  };

  // Étape 7-bis (2026-08-31) — same lifted-state pattern as Ships above,
  // applied to RoleOnBoardPage's `selected`. navigateToRoleOnBoard() is the
  // deep-link entry point the new "Recommended for You" doctrine's Role
  // Onboard shortcut will call: sets the rank AND switches to the
  // "role_on_board" page in one step, landing directly on that rank's
  // RoleOnBoardShared content instead of the generic Deck/Engine rank list.
  const [roleOnBoardSelected, setRoleOnBoardSelected] = useState<string | null>(null);
  const navigateToRoleOnBoard = (rankId: string) => {
    setRoleOnBoardSelected(rankId);
    setPage("role_on_board");
  };

  // Point 2 correctif (2026-09-01) — "Recommended for You" deep-link
  // straight to a specific lesson, bypassing its module's own list page.
  // Deliberately duplicates the moduleId->intermediate-page mapping
  // already in onStartModule() below (small, ~20 entries) rather than
  // touching/refactoring onStartModule itself — keeps the existing manual
  // Browse flow (module card -> onStartModule -> list page) completely
  // untouched. pendingLessonPick is consumed exactly once by whichever
  // *LessonsPage mounts next (its own useEffect calls its own onPick(),
  // unchanged, then reports back via onAutoPickConsumed to clear this
  // state) — so a later, unrelated manual visit to that same module never
  // re-triggers the auto-redirect.
  const [pendingLessonPick, setPendingLessonPick] = useState<string | null>(null);
  const navigateToLesson = (moduleId: string, lessonId: string) => {
    setPendingLessonPick(lessonId);
    if (moduleId === "d1") setPage("nav_lessons");
    else if (moduleId === "d2") setPage("iml_lessons");
    else if (moduleId === "d3") setPage("sb_lessons");
    else if (moduleId === "d4") setPage("smcp_lessons");
    else if (moduleId === "d5") setPage("shipcareer_lessons");
    else if (moduleId === "d6") setPage("seamanship_lessons");
    else if (moduleId === "d7") setPage("meteorology_lessons");
    else if (moduleId === "e1") setPage("engine_lessons");
    else if (moduleId === "e2") setPage("e2_lessons");
    else if (moduleId === "e3") setPage("e3_lessons");
    else if (moduleId === "e4") setPage("marpol_lessons");
    else if (moduleId === "e5") setPage("seemp_lessons");
    else if (moduleId === "e6") setPage("e6_lessons");
    else if (moduleId === "e7") setPage("e7_lessons");
    else if (moduleId === "s1") setPage("s1_lessons");
    else if (moduleId === "s2") setPage("s2_lessons");
    else if (moduleId === "s3") setPage("s3_lessons");
    else if (moduleId === "s4") setPage("s4_lessons");
    else if (moduleId === "s5") setPage("s5_lessons");
    else if (moduleId === "s6") setPage("s6_lessons");
  };

const persistProfile = async (p: any) => {
  setProfile(p);
  try {
    const last = JSON.parse(localStorage.getItem("map_last_reg") || "{}");
    const updatedCard = { ...p, name: p?.name || last?.name };
    localStorage.setItem("map_status_card", JSON.stringify(updatedCard));

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from("user_profiles").upsert({
        user_id: user.id,
        name: updatedCard.name || last?.name || "",
        lang: updatedCard.lang || p?.lang || "fr",
        dept: updatedCard.dept || p?.dept || "deck",
        ship: updatedCard.ship,
        target: updatedCard.target,
        who: updatedCard.who,
        level: updatedCard.level,
        duration: updatedCard.duration,
        time: updatedCard.time,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
       if (error) console.error("user_profiles upsert error:", error);
    }
  } catch (e) {
    console.error("persistProfile error:", e);
  }
};
  // ── HARDWARE BACK BUTTON HANDLING ──────────────────────
  const pageRef = useRef(page);
  useEffect(() => { pageRef.current = page; }, [page]);
  const ONBOARDING = ["splash","lang","music","welcome","bridge","register","questionnaire","status"];
  const LESSONS = ["lesson_navigation","lesson_navire","lesson_coord","lesson_carte","lesson_compas","lesson_navpratique","lesson_marees","lesson_colreg"];
  const ENGINE_LESSONS = ["lesson_moteur","lesson_auxiliaires","lesson_stabilite","lesson_incendie","lesson_sauvetage","lesson_maintenance","lesson_watchkeeping","lesson_emergency"];
  const SB_LESSONS = ["lesson_iala","lesson_lights_shapes","lesson_sound_signals","lesson_flags","lesson_vhf","lesson_ais","lesson_gmdss"];
  const SMCP_LESSONS = ["lesson_smcp_l1","lesson_smcp_l2","lesson_smcp_l3","lesson_smcp_l4","lesson_smcp_l5","lesson_smcp_l6","lesson_smcp_l7","lesson_smcp_l8"];
  const SEAMANSHIP_LESSONS = ["lesson_sea_l1","lesson_sea_l2"];
const SHIPCAREER_LESSONS = ["lesson_shipcareer_l1","lesson_shipcareer_l2","lesson_shipcareer_l3","lesson_shipcareer_l4","lesson_shipcareer_l5"];
const MARPOL_LESSONS = ["lesson_marpol","lesson_marpol_l2","lesson_marpol_l3","lesson_marpol_l4","lesson_marpol_l5","lesson_marpol_l6"];
  const SEEMP_LESSONS = ["lesson_seemp_l1","lesson_seemp_l2","lesson_seemp_l3","lesson_seemp_l4","lesson_seemp_l5"];
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Re-arm a history guard entry every time the active page changes, and
  // re-bind the popstate listener with cleanup so Android PWA hardware back
  // is reliably intercepted (some WebViews drop listeners across navigations).
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Always push a fresh guard state for the current page so there is
    // something to pop when the user presses the hardware back button.
    try { window.history.pushState({ map: page, guard: Date.now() }, ""); } catch {}

    const onPop = (e: PopStateEvent) => {
      const cur = pageRef.current;
      const hasProfile = !!localStorage.getItem("map_status_card");
      if (cur === "dashboard") {
        try { window.history.pushState({ map: cur, guard: Date.now() }, ""); } catch {}
        setShowExitConfirm(true);
        return;
      }
      if (LESSONS.includes(cur)) {
        try { window.history.pushState({ map: "nav_lessons" }, ""); } catch {}
        setPage("nav_lessons");
        return;
      }
      if (ENGINE_LESSONS.includes(cur)) {
        try { window.history.pushState({ map: "engine_lessons" }, ""); } catch {}
        setPage("engine_lessons");
        return;
      }
      if (SB_LESSONS.includes(cur)) {
        try { window.history.pushState({ map: "sb_lessons" }, ""); } catch {}
        setPage("sb_lessons");
        return;
      }
      if (SMCP_LESSONS.includes(cur)) {
        try { window.history.pushState({ map: "smcp_lessons" }, ""); } catch {}
        setPage("smcp_lessons");
        return;
      }
      
          if (SEAMANSHIP_LESSONS.includes(cur)) {
        try { window.history.pushState({ map: "seamanship_lessons" }, ""); } catch {}
        setPage("seamanship_lessons");
        return;
      }
      
          if (SHIPCAREER_LESSONS.includes(cur)) {
        try { window.history.pushState({ map: "shipcareer_lessons" }, ""); } catch {}
        setPage("shipcareer_lessons");
        return;
      }
    
          if (MARPOL_LESSONS.includes(cur)) {
        try { window.history.pushState({ map: "marpol_lessons" }, ""); } catch {}
        setPage("marpol_lessons");
        return;
      }
      if (SEEMP_LESSONS.includes(cur)) {
        try { window.history.pushState({ map: "seemp_lessons" }, ""); } catch {}
        setPage("seemp_lessons");
        return;
      }
      if (["modules","ships","exams","nav_lessons","engine_lessons","marpol_lessons","seemp_lessons","iml_lessons","sb_lessons","smcp_lessons","seamanship_lessons","shipcareer_lessons","admin","admin-login"].includes(cur)) {
        try { window.history.pushState({ map: "dashboard" }, ""); } catch {}
        setPage("dashboard");
        return;
      }
      if (hasProfile && ONBOARDING.includes(cur)) {
        try { window.history.pushState({ map: "dashboard" }, ""); } catch {}
        setPage("dashboard");
        return;
      }
      try { window.history.pushState({ map: cur }, ""); } catch {}
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [page]);

  // ── SETTINGS ACTIONS ───────────────────────────────────
  const handleChangeLanguage = (code: string) => {
    setLang(code);
    try {
      const raw = localStorage.getItem("map_status_card");
      if (raw) {
        const saved = JSON.parse(raw);
        localStorage.setItem("map_status_card", JSON.stringify({ ...saved, lang: code }));
      }
    } catch {}
  };
  const handleChangeDepartment = (dept: "deck" | "engine") => {
    const next = { ...(profile || {}), dept };
    setProfile(next);
    try {
      const raw = localStorage.getItem("map_status_card");
      const saved = raw ? JSON.parse(raw) : {};
      localStorage.setItem("map_status_card", JSON.stringify({ ...saved, ...next }));
    } catch {}
  };
  const handleResetProfile = () => {
    try {
      [
        "map_status_card","map_last_reg","map_user_photo","map_user_plan",
        "map_completed_lessons","map_premium_trial","map_premium_promo",
        "map_admin_grant","map_registrations",
      ].forEach(k => localStorage.removeItem(k));
    } catch {}
    setProfile({});
  setCompletedLessons([]);
  setUserXP(0);
  setUserStreak(1);
  setPage("lang");
  };

  const loadingFallback = (
    <div style={{
      minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      background:"linear-gradient(160deg,#0d1f3c,#060e1a)",
    }}>
      <div style={{width:40,height:40,borderRadius:"50%",
        border:"3px solid rgba(201,146,42,0.2)",borderTopColor:"#c9922a",
        animation:"map-spin 0.8s linear infinite"}}/>
      <style>{`@keyframes map-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <Suspense fallback={loadingFallback}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Nunito:wght@400;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        html,body{margin:0;padding:0;background:#060e1a;}
        input,button{-webkit-tap-highlight-color:transparent;}
        ::selection{background:rgba(201,146,42,0.3);}
        button:active{opacity:0.82;transform:scale(0.98);}
      `}</style>
      <LessonProgressBadge page={page} lang={lang} completedLessons={completedLessons}/>
      {page==="splash"      && <SplashS1 lang={lang} onDone={() => setPage("lang")}/>}
      {page==="lang"        && <LanguageSelect setLang={setLang} setPage={setPage}/>}
      {page==="music"       && (
        <MusicS3
          lang={lang}
          onYes={() => { enable(); setPage("welcome"); }}
          onNo={() => { disable(); setPage("welcome"); }}
          onBack={() => setPage("lang")}
        />
      )}
      {page==="landing"     && <LandingPage setPage={setPage} lang={lang} setLang={setLang}/>}
 {page==="reset_password" && (
  <ResetPassword
    lang={lang}
  onDone={() => {
  const hp = !!localStorage.getItem("map_status_card");
  setPage(hp ? "dashboard" : "questionnaire");
}}  
  />
)}
      {page==="terms" && (
  <TermsOfService
    lang={lang}
    onBack={() => setPage("register")}
  />
)}
{page==="privacy" && (
  <PrivacyPolicy
    lang={lang}
    onBack={() => setPage("register")}
  />
)}
{page==="signin" && (
      <SignIn
    lang={lang}
    onBack={() => setPage("welcome")}
    onSuccess={() => {
      const hp = !!localStorage.getItem("map_status_card");
      setPage(hp ? "dashboard" : "questionnaire");
    }}
  />
)}
     {page==="register" && (
  <RegisterS6
    lang={lang}
    onBack={() => setPage("welcome")}
    onNext={() => setPage("questionnaire")}
    setUsername={(name) => setProfile((p) => ({ ...p, name }))}
    onTerms={() => setPage("terms")}
    onPrivacy={() => setPage("privacy")}
  />
)}
      {page==="admin-login" && <AdminLogin setPage={setPage}/>}
      {page==="admin"       && <AdminPage setPage={setPage}/>}
      {page==="welcome"     && (
        <WelcomeS4
          lang={lang}
          onBack={() => setPage("lang")}
          onCreateAccount={() => setPage("register")}
          onSignIn={() => setPage("signin")}
        />
      )}
      {page==="bridge"      && (
        <BridgeS5
          lang={lang}
          onBack={() => setPage("welcome")}
          onNext={() => setPage("register")}
        />
      )}
      {page==="questionnaire" && (
        <QuestionnaireS7
          lang={lang}
          onBack={() => setPage("register")}
          onNext={() => setPage("status")}
          setProfile={persistProfile}
        />
      )}
      {page==="status"      && (
        <StatusCardS8
            lang={lang}
            username={lastReg.name || "Marin"}
            photo={userPhoto || profile.photo || null}
            profile={profile}
            userXP={userXP}
            userStreak={userStreak}
            completedLessons={completedLessons}
            createdAt={lastReg.createdAt}
            onBack={() => setPage("questionnaire")}
            onEdit={() => setPage("questionnaire")}
            onStart={() => setPage("dashboard")}
          />
      )}
      {page === "dashboard" && (
          <Dashboard
            lang={lang}
            username={lastReg.name || profile?.name || "Marin"}
            photo={userPhoto || profile?.photo || null}
            profile={profile || {}}
            userLevel="cadet"
            userPlan={userPlan}
            userXP={userXP}
            userStreak={userStreak}
            completedLessons={completedLessons}
            activeTab={dashboardTab}
            onActiveTabChange={setDashboardTab}
            onViewStatus={() => setPage("status")}
            onEditProfile={() => setPage("questionnaire")}
            onStartModule={(m:any) => {
              if (m?.id === "d1") setPage("nav_lessons");
              else if (m?.id === "e1") setPage("engine_lessons");
          
                       else if (m?.id === "e4") setPage("marpol_lessons");
              else if (m?.id === "e5") setPage("seemp_lessons");
              else if (m?.id === "d2") setPage("iml_lessons");
              else if (m?.id === "d3") setPage("sb_lessons");
              else if (m?.id === "d4") setPage("smcp_lessons");
              else if (m?.id === "d6") setPage("seamanship_lessons");
              else if (m?.id === "d7") setPage("meteorology_lessons");
            else if (m?.id === "d5") setPage("shipcareer_lessons");
              else if (m?.id === "s1") setPage("s1_lessons");
         else if (m?.id === "s2") setPage("s2_lessons");
              else if (m?.id === "s3") setPage("s3_lessons");
              else if (m?.id === "s4") setPage("s4_lessons");
            else if (m?.id === "s5") setPage("s5_lessons");
             else if (m?.id === "s6") setPage("s6_lessons");
            else if (m?.id === "t0") setPage("lexique");
            else if (m?.id === "t8") setPage("role_on_board");
        else if (m?.id === "e2") setPage("e2_lessons");
else if (m?.id === "e3") setPage("e3_lessons");
else if (m?.id === "e6") setPage("e6_lessons");
else if (m?.id === "e7") setPage("e7_lessons");
            }}
            activeNav="home"
            onNavHome={() => setPage("dashboard")}
            onNavModules={() => setPage("modules")}
            onNavShips={() => setPage("ships")}
            onNavToShipCard={navigateToShipCard}
            onNavToRoleOnBoard={navigateToRoleOnBoard}
            onNavToLesson={navigateToLesson}
            onNavExams={() => setPage("exams")}
            onNavProfile={() => setPage("status")}
            onAdmin={() => setPage("admin-login")}
            onChangeLanguage={handleChangeLanguage}
            onChangeDepartment={handleChangeDepartment}
            onResetProfile={handleResetProfile} 
            onSignOut={async () => {
  await supabase.auth.signOut();
  try {
    ["map_last_reg","map_user_photo"].forEach(k => localStorage.removeItem(k));
  } catch {}
  setPage("lang");
}}
          />
      )}
      {page === "modules" && (
        <ModulesListPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          onStart={(m:any) => {
            if (m?.id === "d1") setPage("nav_lessons");
            else if (m?.id === "e1") setPage("engine_lessons");
          
              else if (m?.id === "e4") setPage("marpol_lessons");
            else if (m?.id === "e5") setPage("seemp_lessons");
            else if (m?.id === "d2") setPage("iml_lessons");
            else if (m?.id === "d3") setPage("sb_lessons");
            else if (m?.id === "d4") setPage("smcp_lessons");
            else if (m?.id === "d6") setPage("seamanship_lessons");
            else if (m?.id === "d7") setPage("meteorology_lessons");
          else if (m?.id === "d5") setPage("shipcareer_lessons");
          else if (m?.id === "s1") setPage("s1_lessons");
        else if (m?.id === "s2") setPage("s2_lessons");
          else if (m?.id === "s3") setPage("s3_lessons");
          else if (m?.id === "s4") setPage("s4_lessons");
         else if (m?.id === "s5") setPage("s5_lessons");
         else if (m?.id === "s6") setPage("s6_lessons");
         else if (m?.id === "t8") setPage("role_on_board");
         else if (m?.id === "e2") setPage("e2_lessons");
else if (m?.id === "e3") setPage("e3_lessons");
else if (m?.id === "e6") setPage("e6_lessons");
else if (m?.id === "e7") setPage("e7_lessons");
            else setPage("dashboard");
          }}
        />
      )}
      {page === "ships" && (
        <ShipsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          selected={shipsSelected}
          onSelectedChange={setShipsSelected}
          selectedOperationId={shipsSelectedOperationId}
          onSelectedOperationIdChange={setShipsSelectedOperationId}
          highlightedOperationId={shipsHighlightedOperationId}
          onHighlightedOperationIdChange={setShipsHighlightedOperationId}
        />
      )}
      {page === "exams" && (
        <ExamCenterPage lang={lang} onBack={() => setPage("dashboard")}/>
      )}
      {page === "role_on_board" && (
        <RoleOnBoardPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          selected={roleOnBoardSelected}
          onSelectedChange={setRoleOnBoardSelected}
        />
      )}
      {page === "nav_lessons" && (
        <NavigationLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_navigation");
            else if (lid === "l2") setPage("lesson_navire");
            else if (lid === "l3") setPage("lesson_coord");
            else if (lid === "l4") setPage("lesson_carte");
            else if (lid === "l5") setPage("lesson_compas");
            else if (lid === "l6") setPage("lesson_navpratique");
            else if (lid === "l7") setPage("lesson_marees");
            else if (lid === "l8") setPage("lesson_colreg");
            else if (lid === "l9") setPage("lesson_steering");
            else if (lid === "l10") setPage("lesson_watch_org");
          }}
        />
      )}
      {page === "engine_lessons" && (
        <EngineLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_moteur");
            else if (lid === "l2") setPage("lesson_auxiliaires");
            else if (lid === "l3") setPage("lesson_stabilite");
            else if (lid === "l4") setPage("lesson_incendie");
            else if (lid === "l5") setPage("lesson_sauvetage");
            else if (lid === "l6") setPage("lesson_maintenance");
            else if (lid === "l7") setPage("lesson_watchkeeping");
            else if (lid === "l8") setPage("lesson_emergency");
          }}
        />
      )}
      
        {page === "marpol_lessons" && (
        <MarpolLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_marpol");
            else if (lid === "l2") setPage("lesson_marpol_l2");
            else if (lid === "l3") setPage("lesson_marpol_l3");
            else if (lid === "l4") setPage("lesson_marpol_l4");
            else if (lid === "l5") setPage("lesson_marpol_l5");
            else if (lid === "l6") setPage("lesson_marpol_l6");
          }}
        />
      )}
      {page === "seemp_lessons" && (
        <SeempLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_seemp_l1");
            else if (lid === "l2") setPage("lesson_seemp_l2");
            else if (lid === "l3") setPage("lesson_seemp_l3");
            else if (lid === "l4") setPage("lesson_seemp_l4");
            else if (lid === "l5") setPage("lesson_seemp_l5");
          }}
        />
      )}
      {page === "seamanship_lessons" && (
        <SeamanshipLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
  if (lid === "l1") setPage("lesson_sea_l1");
  else if (lid === "l2") setPage("lesson_sea_l2");
  else if (lid === "l3") setPage("lesson_sea_l3");
  else if (lid === "l4") setPage("lesson_sea_l4");
  else if (lid === "l5") setPage("lesson_sea_l5");
  else if (lid === "l6") setPage("lesson_sea_l6");
  else if (lid === "l7") setPage("lesson_sea_l7");
}}
          />
)}
      {page === "meteorology_lessons" && (
        <MeteorologyLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
  if (lid === "l1") setPage("lesson_meteo_l1");
  else if (lid === "l2") setPage("lesson_meteo_l2");
  else if (lid === "l3") setPage("lesson_meteo_l3");
  else if (lid === "l4") setPage("lesson_meteo_l4");
  else if (lid === "l5") setPage("lesson_meteo_l5");
  else if (lid === "l6") setPage("lesson_meteo_l6");
  else if (lid === "l7") setPage("lesson_meteo_l7");
}}
          />
)}
   {page === "shipcareer_lessons" && (
  <ShipCareerLessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    autoPick={pendingLessonPick}
    onAutoPickConsumed={() => setPendingLessonPick(null)}
    onPick={(lid:string) => {
      if (lid === "l1") setPage("lesson_shipcareer_l1");
      else if (lid === "l2") setPage("lesson_shipcareer_l2");
      else if (lid === "l3") setPage("lesson_shipcareer_l3");
      else if (lid === "l4") setPage("lesson_shipcareer_l4");
      else if (lid === "l5") setPage("lesson_shipcareer_l5");
    }}
  />
)}     
  {page === "s1_lessons" && (
        <S1LessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_s1_l1");
            else if (lid === "l2") setPage("lesson_s1_l2");
            else if (lid === "l3") setPage("lesson_s1_l3");
            else if (lid === "l4") setPage("lesson_s1_l4");
            else if (lid === "l5") setPage("lesson_s1_l5");
            else if (lid === "l6") setPage("lesson_s1_l6");
          }}
        />
      )}
      {page === "lesson_s1_l1" && (
        <LessonSafetyS1_L1
          lang={lang}
          onBack={() => setPage("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l1"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l1"); setPage("lesson_s1_l2"); }}
        />
      )}
      {page === "lesson_s1_l2" && (
        <LessonSafetyS1_L2
          lang={lang}
          onBack={() => setPage("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l2"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l2"); setPage("lesson_s1_l3"); }}
        />
      )}
      {page === "lesson_s1_l3" && (
        <LessonSafetyS1_L3
          lang={lang}
          onBack={() => setPage("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l3"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l3"); setPage("lesson_s1_l4"); }}
        />
      )}
      {page === "lesson_s1_l4" && (
        <LessonSafetyS1_L4
          lang={lang}
          onBack={() => setPage("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l4"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l4"); setPage("lesson_s1_l5"); }}
        />
      )}
      {page === "lesson_s1_l5" && (
        <LessonSafetyS1_L5
          lang={lang}
          onBack={() => setPage("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l5"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l5"); setPage("lesson_s1_l6"); }}
        />
      )}
      {page === "lesson_s1_l6" && (
        <LessonSafetyS1_L6
          lang={lang}
          onBack={() => setPage("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l6"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l6"); setPage("s1_lessons"); }}
        />
      )} 
   {page === "s2_lessons" && (
        <S2LessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_s2_l1");
            else if (lid === "l2") setPage("lesson_s2_l2");
            else if (lid === "l3") setPage("lesson_s2_l3");
            else if (lid === "l4") setPage("lesson_s2_l4");
            else if (lid === "l5") setPage("lesson_s2_l5");
          }}
        />
      )}
      {page === "lesson_s2_l1" && (
        <LessonSafetyS2_L1
          lang={lang}
          onBack={() => setPage("s2_lessons")}
          onComplete={() => { markLessonCompleted("s2-l1"); setPage("s2_lessons"); }}
          onNext={() => { markLessonCompleted("s2-l1"); setPage("lesson_s2_l2"); }}
        />
      )}
      {page === "lesson_s2_l2" && (
        <LessonSafetyS2_L2
          lang={lang}
          onBack={() => setPage("s2_lessons")}
          onComplete={() => { markLessonCompleted("s2-l2"); setPage("s2_lessons"); }}
          onNext={() => { markLessonCompleted("s2-l2"); setPage("lesson_s2_l3"); }}
        />
      )}
      {page === "lesson_s2_l3" && (
        <LessonSafetyS2_L3
          lang={lang}
          onBack={() => setPage("s2_lessons")}
          onComplete={() => { markLessonCompleted("s2-l3"); setPage("s2_lessons"); }}
          onNext={() => { markLessonCompleted("s2-l3"); setPage("lesson_s2_l4"); }}
        />
      )}
      {page === "lesson_s2_l4" && (
        <LessonSafetyS2_L4
          lang={lang}
          onBack={() => setPage("s2_lessons")}
          onComplete={() => { markLessonCompleted("s2-l4"); setPage("s2_lessons"); }}
          onNext={() => { markLessonCompleted("s2-l4"); setPage("lesson_s2_l5"); }}
        />
      )}
      {page === "lesson_s2_l5" && (
        <LessonSafetyS2_L5
          lang={lang}
          onBack={() => setPage("s2_lessons")}
          onComplete={() => { markLessonCompleted("s2-l5"); setPage("s2_lessons"); }}
          onNext={() => { markLessonCompleted("s2-l5"); setPage("s2_lessons"); }}
        />
      )}
      {page === "s3_lessons" && (
  <S3LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    autoPick={pendingLessonPick}
    onAutoPickConsumed={() => setPendingLessonPick(null)}
    onPick={(lid:string) => {
      if (lid === "l1") setPage("lesson_safety_s3_l1");
      else if (lid === "l2") setPage("lesson_safety_s3_l2");
      else if (lid === "l3") setPage("lesson_safety_s3_l3");
      else if (lid === "l4") setPage("lesson_safety_s3_l4");
      else if (lid === "l5") setPage("lesson_safety_s3_l5");
      else if (lid === "l6") setPage("lesson_safety_s3_l6");
      else if (lid === "l7") setPage("lesson_safety_s3_l7");
      else if (lid === "l8") setPage("lesson_safety_s3_l8");
    }}
  />
)}
{page === "lesson_safety_s3_l1" && (
  <LessonSafetyS3_L1
    lang={lang}
    onBack={() => setPage("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l1"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l1"); setPage("lesson_safety_s3_l2"); }}
  />
)}
{page === "lesson_safety_s3_l2" && (
  <LessonSafetyS3_L2
    lang={lang}
    onBack={() => setPage("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l2"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l2"); setPage("lesson_safety_s3_l3"); }}
  />
)}
{page === "lesson_safety_s3_l3" && (
  <LessonSafetyS3_L3
    lang={lang}
    onBack={() => setPage("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l3"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l3"); setPage("lesson_safety_s3_l4"); }}
  />
)}
{page === "lesson_safety_s3_l4" && (
  <LessonSafetyS3_L4
    lang={lang}
    onBack={() => setPage("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l4"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l4"); setPage("lesson_safety_s3_l5"); }}
  />
)}
{page === "lesson_safety_s3_l5" && (
  <LessonSafetyS3_L5
    lang={lang}
    onBack={() => setPage("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l5"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l5"); setPage("lesson_safety_s3_l6"); }}
  />
)}
{page === "lesson_safety_s3_l6" && (
  <LessonSafetyS3_L6
    lang={lang}
    onBack={() => setPage("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l6"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l6"); setPage("lesson_safety_s3_l7"); }}
  />
)}
{page === "lesson_safety_s3_l7" && (
  <LessonSafetyS3_L7
    lang={lang}
    onBack={() => setPage("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l7"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l7"); setPage("lesson_safety_s3_l8"); }}
  />
)}
{page === "lesson_safety_s3_l8" && (
  <LessonSafetyS3_L8
    lang={lang}
    onBack={() => setPage("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l8"); setPage("dashboard"); }}
    onNext={() => { markLessonCompleted("s3-l8"); setPage("dashboard"); }}
  />
)}
    {page === "s4_lessons" && (
  <S4LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    autoPick={pendingLessonPick}
    onAutoPickConsumed={() => setPendingLessonPick(null)}
    onPick={(lid:string) => {
      if (lid === "l1") setPage("lesson_safety_s4_l1");
      else if (lid === "l2") setPage("lesson_safety_s4_l2");
      else if (lid === "l3") setPage("lesson_safety_s4_l3");
      else if (lid === "l4") setPage("lesson_safety_s4_l4");
      else if (lid === "l5") setPage("lesson_safety_s4_l5");
      else if (lid === "l6") setPage("lesson_safety_s4_l6");
      else if (lid === "l7") setPage("lesson_safety_s4_l7");
    }}
  />
)}
{page === "lesson_safety_s4_l1" && (
  <LessonSafetyS4_L1 lang={lang} onBack={() => setPage("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l1"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l1"); setPage("lesson_safety_s4_l2"); }}/>
)}
{page === "lesson_safety_s4_l2" && (
  <LessonSafetyS4_L2 lang={lang} onBack={() => setPage("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l2"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l2"); setPage("lesson_safety_s4_l3"); }}/>
)}
{page === "lesson_safety_s4_l3" && (
  <LessonSafetyS4_L3 lang={lang} onBack={() => setPage("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l3"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l3"); setPage("lesson_safety_s4_l4"); }}/>
)}
{page === "lesson_safety_s4_l4" && (
  <LessonSafetyS4_L4 lang={lang} onBack={() => setPage("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l4"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l4"); setPage("lesson_safety_s4_l5"); }}/>
)}
{page === "lesson_safety_s4_l5" && (
  <LessonSafetyS4_L5 lang={lang} onBack={() => setPage("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l5"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l5"); setPage("lesson_safety_s4_l6"); }}/>
)}
{page === "lesson_safety_s4_l6" && (
  <LessonSafetyS4_L6 lang={lang} onBack={() => setPage("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l6"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l6"); setPage("lesson_safety_s4_l7"); }}/>
)}
{page === "lesson_safety_s4_l7" && (
  <LessonSafetyS4_L7 lang={lang} onBack={() => setPage("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l7"); setPage("dashboard"); }}
    onNext={() => { markLessonCompleted("s4-l7"); setPage("dashboard"); }}/>
)}
{page === "s5_lessons" && (
  <S5LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    autoPick={pendingLessonPick}
    onAutoPickConsumed={() => setPendingLessonPick(null)}
    onPick={(lid:string) => {
      if (lid === "l1") setPage("lesson_safety_s5_l1");
      else if (lid === "l2") setPage("lesson_safety_s5_l2");
      else if (lid === "l3") setPage("lesson_safety_s5_l3");
      else if (lid === "l4") setPage("lesson_safety_s5_l4");
    }}
  />
)}
{page === "lesson_safety_s5_l1" && (
  <LessonSafetyS5_L1 lang={lang} onBack={() => setPage("s5_lessons")}
    onComplete={() => { markLessonCompleted("s5-l1"); setPage("s5_lessons"); }}
    onNext={() => { markLessonCompleted("s5-l1"); setPage("lesson_safety_s5_l2"); }}/>
)}
{page === "lesson_safety_s5_l2" && (
  <LessonSafetyS5_L2 lang={lang} onBack={() => setPage("s5_lessons")}
    onComplete={() => { markLessonCompleted("s5-l2"); setPage("s5_lessons"); }}
    onNext={() => { markLessonCompleted("s5-l2"); setPage("lesson_safety_s5_l3"); }}/>
)}
{page === "lesson_safety_s5_l3" && (
  <LessonSafetyS5_L3 lang={lang} onBack={() => setPage("s5_lessons")}
    onComplete={() => { markLessonCompleted("s5-l3"); setPage("s5_lessons"); }}
    onNext={() => { markLessonCompleted("s5-l3"); setPage("lesson_safety_s5_l4"); }}/>
)}
{page === "lesson_safety_s5_l4" && (
  <LessonSafetyS5_L4 lang={lang} onBack={() => setPage("s5_lessons")}
    onComplete={() => { markLessonCompleted("s5-l4"); setPage("dashboard"); }}
    onNext={() => { markLessonCompleted("s5-l4"); setPage("dashboard"); }}/>
)}
    {page === "s6_lessons" && (
  <S6LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    autoPick={pendingLessonPick}
    onAutoPickConsumed={() => setPendingLessonPick(null)}
    onPick={(lid:string) => {
      if (lid === "l1") setPage("lesson_safety_s6_l1");
      else if (lid === "l2") setPage("lesson_safety_s6_l2");
      else if (lid === "l3") setPage("lesson_safety_s6_l3");
      else if (lid === "l4") setPage("lesson_safety_s6_l4");
      else if (lid === "l5") setPage("lesson_safety_s6_l5");
      else if (lid === "l6") setPage("lesson_safety_s6_l6");
    }}
  />
)}
{page === "lesson_safety_s6_l1" && (
  <LessonSafetyS6_L1 lang={lang} onBack={() => setPage("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l1"); setPage("s6_lessons"); }}
    onNext={() => { markLessonCompleted("s6-l1"); setPage("lesson_safety_s6_l2"); }}/>
)}
{page === "lesson_safety_s6_l2" && (
  <LessonSafetyS6_L2 lang={lang} onBack={() => setPage("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l2"); setPage("s6_lessons"); }}
    onNext={() => { markLessonCompleted("s6-l2"); setPage("lesson_safety_s6_l3"); }}/>
)}
{page === "lesson_safety_s6_l3" && (
  <LessonSafetyS6_L3 lang={lang} onBack={() => setPage("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l3"); setPage("s6_lessons"); }}
    onNext={() => { markLessonCompleted("s6-l3"); setPage("lesson_safety_s6_l4"); }}/>
)}
{page === "lesson_safety_s6_l4" && (
  <LessonSafetyS6_L4 lang={lang} onBack={() => setPage("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l4"); setPage("s6_lessons"); }}
    onNext={() => { markLessonCompleted("s6-l4"); setPage("lesson_safety_s6_l5"); }}/>
)}
{page === "lesson_safety_s6_l5" && (
  <LessonSafetyS6_L5 lang={lang} onBack={() => setPage("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l5"); setPage("s6_lessons"); }}
    onNext={() => { markLessonCompleted("s6-l5"); setPage("lesson_safety_s6_l6"); }}/>
)}
{page === "lesson_safety_s6_l6" && (
  <LessonSafetyS6_L6 lang={lang} onBack={() => setPage("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l6"); setPage("dashboard"); }}
    onNext={() => { markLessonCompleted("s6-l6"); setPage("dashboard"); }}/>
)} 
      {page === "e2_lessons" && (

  <E2LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    autoPick={pendingLessonPick}
    onAutoPickConsumed={() => setPendingLessonPick(null)}
    onPick={(lid:string) => {
      if (lid === "l1") setPage("lesson_e2_l1");
      else if (lid === "l2") setPage("lesson_e2_l2");
      else if (lid === "l3") setPage("lesson_e2_l3");
      else if (lid === "l4") setPage("lesson_e2_l4");
      else if (lid === "l5") setPage("lesson_e2_l5");
      else if (lid === "l6") setPage("lesson_e2_l6");
      else if (lid === "l7") setPage("lesson_e2_l7");
    }}
  />
)}
      {page === "lesson_e2_l1" && (
  <LessonE2_L1
    lang={lang}
    onBack={() => setPage("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l1"); setPage("e2_lessons"); }}
  />
)}
      {page === "lesson_e2_l2" && (
  <LessonE2_L2
    lang={lang}
    onBack={() => setPage("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l2"); setPage("e2_lessons"); }}
  />
)}
      {page === "lesson_e2_l3" && (
  <LessonE2_L3
    lang={lang}
    onBack={() => setPage("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l3"); setPage("e2_lessons"); }}
  />
)}
   {page === "lesson_e2_l4" && (
  <LessonE2_L4
    lang={lang}
    onBack={() => setPage("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l4"); setPage("e2_lessons"); }}
  />
)}  
      {page === "lesson_e2_l5" && (
  <LessonE2_L5
    lang={lang}
    onBack={() => setPage("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l5"); setPage("e2_lessons"); }}
  />
)}
      {page === "lesson_e2_l6" && (
  <LessonE2_L6
    lang={lang}
    onBack={() => setPage("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l6"); setPage("e2_lessons"); }}
    onNext={() => { markLessonCompleted("e2-l6"); setPage("lesson_e2_l7"); }}
  />
)}
      {page === "lesson_e2_l7" && (
  <LessonE2_L7
    lang={lang}
    onBack={() => setPage("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l7"); setPage("e2_lessons"); }}
    onNext={() => { markLessonCompleted("e2-l7"); setPage("lesson_e3_l1"); }}
  />
)}
{page === "e3_lessons" && (
  <E3LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    autoPick={pendingLessonPick}
    onAutoPickConsumed={() => setPendingLessonPick(null)}
    onPick={(lid:string) => {
      if (lid === "l1") setPage("lesson_e3_l1");
      else if (lid === "l2") setPage("lesson_e3_l2");
      else if (lid === "l3") setPage("lesson_e3_l3");
      else if (lid === "l4") setPage("lesson_e3_l4");
      else if (lid === "l5") setPage("lesson_e3_l5");
      else if (lid === "l6") setPage("lesson_e3_l6");
    }}
  />
)}
      {page === "lesson_e3_l1" && (
  <LessonE3_L1
    lang={lang}
    onBack={() => setPage("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l1"); setPage("e3_lessons"); }}
  />
)}
      {page === "lesson_e3_l2" && (
  <LessonE3_L2
    lang={lang}
    onBack={() => setPage("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l2"); setPage("e3_lessons"); }}
  />
)}
      {page === "lesson_e3_l3" && (
  <LessonE3_L3
    lang={lang}
    onBack={() => setPage("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l3"); setPage("e3_lessons"); }}
  />
)}
      {page === "lesson_e3_l4" && (
  <LessonE3_L4
    lang={lang}
    onBack={() => setPage("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l4"); setPage("e3_lessons"); }}
  />
)}
      {page === "lesson_e3_l5" && (
  <LessonE3_L5
    lang={lang}
    onBack={() => setPage("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l5"); setPage("e3_lessons"); }}
  />
)}
      {page === "lesson_e6_l1" && (
  <LessonE6_L1
    lang={lang}
    onBack={() => setPage("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l1"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l1"); setPage("lesson_e6_l2"); }}
  />
)}
      {page === "lesson_e3_l6" && (
  <LessonE3_L6
    lang={lang}
    onBack={() => setPage("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l6"); setPage("e3_lessons"); }}
  />
)}
      {page === "lesson_e6_l2" && (
  <LessonE6_L2
    lang={lang}
    onBack={() => setPage("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l2"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l2"); setPage("lesson_e6_l3"); }}
  />
)}
      {page === "lesson_e6_l3" && (
  <LessonE6_L3
    lang={lang}
    onBack={() => setPage("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l3"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l3"); setPage("lesson_e6_l4"); }}
  />
)}
      {page === "lesson_e6_l4" && (
  <LessonE6_L4
    lang={lang}
    onBack={() => setPage("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l4"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l4"); setPage("lesson_e6_l5"); }}
  />
)}
      {page === "lesson_e6_l5" && (
  <LessonE6_L5
    lang={lang}
    onBack={() => setPage("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l5"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l5"); setPage("lesson_e6_l6"); }}
  />
)}
      {page === "lesson_e6_l6" && (
  <LessonE6_L6
    lang={lang}
    onBack={() => setPage("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l6"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l6"); setPage("lesson_e7_l1"); }}
  />
)}
{page === "e6_lessons" && (
  <E6LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    autoPick={pendingLessonPick}
    onAutoPickConsumed={() => setPendingLessonPick(null)}
    onPick={(lid:string) => {
      if (lid === "l1") setPage("lesson_e6_l1");
      else if (lid === "l2") setPage("lesson_e6_l2");
      else if (lid === "l3") setPage("lesson_e6_l3");
      else if (lid === "l4") setPage("lesson_e6_l4");
      else if (lid === "l5") setPage("lesson_e6_l5");
      else if (lid === "l6") setPage("lesson_e6_l6");
    }}
  />
)}
      {page === "lesson_e7_l1" && (
  <LessonE7_L1
    lang={lang}
    onBack={() => setPage("e7_lessons")}
    onComplete={() => { markLessonCompleted("e7-l1"); setPage("e7_lessons"); }}
    onNext={() => { markLessonCompleted("e7-l1"); setPage("lesson_e7_l2"); }}
  />
)}
      {page === "lesson_e7_l2" && (
  <LessonE7_L2 lang={lang} onBack={() => setPage("e7_lessons")}
    onComplete={() => { markLessonCompleted("e7-l2"); setPage("e7_lessons"); }}
    onNext={() => { markLessonCompleted("e7-l2"); setPage("lesson_e7_l3"); }}/>
)}
      {page === "lesson_e7_l3" && (
  <LessonE7_L3 lang={lang} onBack={() => setPage("e7_lessons")}
    onComplete={() => { markLessonCompleted("e7-l3"); setPage("e7_lessons"); }}
    onNext={() => { markLessonCompleted("e7-l3"); setPage("lesson_e7_l4"); }}/>
)}
      {page === "lesson_e7_l4" && (
  <LessonE7_L4 lang={lang} onBack={() => setPage("e7_lessons")}
    onComplete={() => { markLessonCompleted("e7-l4"); setPage("e7_lessons"); }}
    onNext={() => { markLessonCompleted("e7-l4"); setPage("lesson_e7_l5"); }}/>
)}
      {page === "lesson_e7_l5" && (
  <LessonE7_L5 lang={lang} onBack={() => setPage("e7_lessons")}
    onComplete={() => { markLessonCompleted("e7-l5"); setPage("e7_lessons"); }}
    onNext={() => { markLessonCompleted("e7-l5"); setPage("e7_lessons"); }}/>
)}
{page === "e7_lessons" && (
  <E7LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    autoPick={pendingLessonPick}
    onAutoPickConsumed={() => setPendingLessonPick(null)}
    onPick={(lid:string) => {
      if (lid === "l1") setPage("lesson_e7_l1");
      else if (lid === "l2") setPage("lesson_e7_l2");
      else if (lid === "l3") setPage("lesson_e7_l3");
      else if (lid === "l4") setPage("lesson_e7_l4");
      else if (lid === "l5") setPage("lesson_e7_l5");
    }}
  />
)}
        
      {page === "iml_lessons" && (
        <IMLLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_solas");
            else if (lid === "l2") setPage("lesson_marpol_legal");
            else if (lid === "l3") setPage("lesson_stcw");
            else if (lid === "l4") setPage("lesson_mlc");
            else if (lid === "l5") setPage("lesson_colreg_legal");
            else if (lid === "l6") setPage("lesson_unclos");
            else if (lid === "l7") setPage("lesson_liability_insurance");
            else if (lid === "l8") setPage("lesson_ports_flag_states");
            else if (lid === "l9") setPage("lesson_piracy");
            else if (lid === "l10") setPage("lesson_arbitration");
          }}
        />
      )}
      {page === "sb_lessons" && (
        <SBLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_iala");
            else if (lid === "l2") setPage("lesson_lights_shapes");
            else if (lid === "l3") setPage("lesson_sound_signals");
            else if (lid === "l4") setPage("lesson_flags");
            else if (lid === "l5") setPage("lesson_vhf");
            else if (lid === "l6") setPage("lesson_ais");
            else if (lid === "l7") setPage("lesson_gmdss");
          }}
        />
      )}
      {page === "smcp_lessons" && (
        <SMCPLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_smcp_l1");
            else if (lid === "l2") setPage("lesson_smcp_l2");
            else if (lid === "l3") setPage("lesson_smcp_l3");
            else if (lid === "l4") setPage("lesson_smcp_l4");
            else if (lid === "l5") setPage("lesson_smcp_l5");
            else if (lid === "l6") setPage("lesson_smcp_l6");
            else if (lid === "l7") setPage("lesson_smcp_l7");
            else if (lid === "l8") setPage("lesson_smcp_l8");
          }}
        />
      )}
      {page === "lesson_solas" && (
        <LessonSOLAS
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l1"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l1"); setPage("lesson_marpol_legal"); }}
        />
      )}
      {page === "lesson_marpol_legal" && (
        <LessonMARPOLLegal
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l2"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l2"); setPage("lesson_stcw"); }}
        />
      )}
      {page === "lesson_stcw" && (
        <LessonSTCW
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l3"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l3"); setPage("lesson_mlc"); }}
        />
      )}
      {page === "lesson_mlc" && (
        <LessonMLC
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l4"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l4"); setPage("lesson_colreg_legal"); }}
        />
      )}
      {page === "lesson_colreg_legal" && (
        <LessonCOLREGLegal
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l5"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l5"); setPage("lesson_unclos"); }}
        />
      )}
      {page === "lesson_unclos" && (
        <LessonUNCLOS
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l6"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l6"); setPage("lesson_liability_insurance"); }}
        />
      )}
      {page === "lesson_liability_insurance" && (
        <LessonLiabilityInsurance
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l7"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l7"); setPage("lesson_ports_flag_states"); }}
        />
      )}
      {page === "lesson_ports_flag_states" && (
        <LessonPortsFlagStates
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l8"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l8"); setPage("lesson_piracy"); }}
        />
      )}
      {page === "lesson_piracy" && (
        <LessonPiracy
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l9"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l9"); setPage("lesson_arbitration"); }}
        />
      )}
      {page === "lesson_arbitration" && (
        <LessonArbitration
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l10"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l10"); setPage("iml_lessons"); }}
        />
      )}
      {page === "lesson_iala" && (
        <LessonIALA
          lang={lang}
          onBack={() => setPage("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l1"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l1"); setPage("lesson_lights_shapes"); }}
        />
      )}
      {page === "lesson_lights_shapes" && (
        <LessonLightsShapes
          lang={lang}
          onBack={() => setPage("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l2"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l2"); setPage("lesson_sound_signals"); }}
        />
      )}
      {page === "lesson_sound_signals" && (
        <LessonSoundSignals
          lang={lang}
          onBack={() => setPage("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l3"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l3"); setPage("lesson_flags"); }}
        />
      )}
      {page === "lesson_flags" && (
        <LessonFlags
          lang={lang}
          onBack={() => setPage("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l4"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l4"); setPage("lesson_vhf"); }}
        />
      )}
      {page === "lesson_vhf" && (
        <LessonVHF
          lang={lang}
          onBack={() => setPage("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l5"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l5"); setPage("lesson_ais"); }}
        />
      )}
      {page === "lesson_ais" && (
        <LessonAIS
          lang={lang}
          onBack={() => setPage("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l6"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l6"); setPage("lesson_gmdss"); }}
        />
      )}
      {page === "lesson_gmdss" && (
        <LessonGMDSS
          lang={lang}
          onBack={() => setPage("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l7"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l7"); setPage("sb_lessons"); }}
        />
      )}
      {page === "lesson_sea_l1" && (
        <LessonSEA_L1
          lang={lang}
          onBack={() => setPage("seamanship_lessons")}
          onComplete={() => { markLessonCompleted("d6-l1"); setPage("seamanship_lessons"); }}
          onNext={() => { markLessonCompleted("d6-l1"); setPage("lesson_sea_l2"); }}
        />
      )}
      {page === "lesson_sea_l2" && (
        <LessonSEA_L2
          lang={lang}
          onBack={() => setPage("seamanship_lessons")}
          onComplete={() => { markLessonCompleted("d6-l2"); setPage("seamanship_lessons"); }}
          onNext={() => { markLessonCompleted("d6-l2"); setPage("lesson_sea_l3"); }}
        />
      )} 
     {page === "lexique" && (
  <LexiqueMaritime
    lang={lang}
    onBack={() => setPage("dashboard")}
    onComplete={() => setPage("dashboard")}
  />
)} 
      {page === "lesson_sea_l3" && (
  <LessonSEA_L3
    lang={lang}
    onBack={() => setPage("seamanship_lessons")}
    onComplete={() => { markLessonCompleted("d6-l3"); setPage("seamanship_lessons"); }}
    onNext={() => { markLessonCompleted("d6-l3"); setPage("lesson_sea_l4"); }}
  />
)}
{page === "lesson_sea_l4" && (
  <LessonSEA_L4
    lang={lang}
    onBack={() => setPage("seamanship_lessons")}
    onComplete={() => { markLessonCompleted("d6-l4"); setPage("seamanship_lessons"); }}
    onNext={() => { markLessonCompleted("d6-l4"); setPage("lesson_sea_l5"); }}
  />
)}
{page === "lesson_sea_l5" && (
  <LessonSEA_L5
    lang={lang}
    onBack={() => setPage("seamanship_lessons")}
    onComplete={() => { markLessonCompleted("d6-l5"); setPage("seamanship_lessons"); }}
    onNext={() => { markLessonCompleted("d6-l5"); setPage("seamanship_lessons"); }}
  />
)}
{page === "lesson_sea_l6" && (
  <LessonSEA_L6
    lang={lang}
    onBack={() => setPage("seamanship_lessons")}
    onComplete={() => { markLessonCompleted("d6-l6"); setPage("seamanship_lessons"); }}
    onNext={() => { markLessonCompleted("d6-l6"); setPage("seamanship_lessons"); }}
  />
)}
{page === "lesson_sea_l7" && (
  <LessonSEA_L7
    lang={lang}
    onBack={() => setPage("seamanship_lessons")}
    onComplete={() => { markLessonCompleted("d6-l7"); setPage("seamanship_lessons"); }}
    onNext={() => { markLessonCompleted("d6-l7"); setPage("seamanship_lessons"); }}
  />
)}
{page === "lesson_meteo_l1" && (
  <LessonMETEO_L1
    lang={lang}
    onBack={() => setPage("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l1"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l1"); setPage("lesson_meteo_l2"); }}
  />
)}
{page === "lesson_meteo_l2" && (
  <LessonMETEO_L2
    lang={lang}
    onBack={() => setPage("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l2"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l2"); setPage("lesson_meteo_l3"); }}
  />
)}
{page === "lesson_meteo_l3" && (
  <LessonMETEO_L3
    lang={lang}
    onBack={() => setPage("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l3"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l3"); setPage("lesson_meteo_l4"); }}
  />
)}
{page === "lesson_meteo_l4" && (
  <LessonMETEO_L4
    lang={lang}
    onBack={() => setPage("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l4"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l4"); setPage("lesson_meteo_l5"); }}
  />
)}
{page === "lesson_meteo_l5" && (
  <LessonMETEO_L5
    lang={lang}
    onBack={() => setPage("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l5"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l5"); setPage("lesson_meteo_l6"); }}
  />
)}
{page === "lesson_meteo_l6" && (
  <LessonMETEO_L6
    lang={lang}
    onBack={() => setPage("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l6"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l6"); setPage("lesson_meteo_l7"); }}
  />
)}
{page === "lesson_meteo_l7" && (
  <LessonMETEO_L7
    lang={lang}
    onBack={() => setPage("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l7"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l7"); setPage("meteorology_lessons"); }}
  />
)}
   {page === "lesson_shipcareer_l1" && (
  <LessonShipCareer_L1
    lang={lang}
    onBack={() => setPage("shipcareer_lessons")}
    onComplete={() => { markLessonCompleted("d5-l1"); setPage("shipcareer_lessons"); }}
  />
)}
{page === "lesson_shipcareer_l2" && (
  <LessonShipCareer_L2
    lang={lang}
    onBack={() => setPage("shipcareer_lessons")}
    onComplete={() => { markLessonCompleted("d5-l2"); setPage("shipcareer_lessons"); }}
  />
)}
{page === "lesson_shipcareer_l3" && (
  <LessonShipCareer_L3
    lang={lang}
    onBack={() => setPage("shipcareer_lessons")}
    onComplete={() => { markLessonCompleted("d5-l3"); setPage("shipcareer_lessons"); }}
  />
)}
{page === "lesson_shipcareer_l4" && (
  <LessonShipCareer_L4
    lang={lang}
    onBack={() => setPage("shipcareer_lessons")}
    onComplete={() => { markLessonCompleted("d5-l4"); setPage("shipcareer_lessons"); }}
  />
)}
{page === "lesson_shipcareer_l5" && (
  <LessonShipCareer_L5
    lang={lang}
    onBack={() => setPage("shipcareer_lessons")}
    onComplete={() => { markLessonCompleted("d5-l5"); setPage("shipcareer_lessons"); }}
  />
)} 
      {page === "lesson_smcp_l1" && (
        <LessonSMCP_L1
          lang={lang}
          onBack={() => setPage("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l1"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l1"); setPage("lesson_smcp_l2"); }}
        />
      )}
      {page === "lesson_smcp_l2" && (
        <LessonSMCP_L2
          lang={lang}
          onBack={() => setPage("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l2"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l2"); setPage("lesson_smcp_l3"); }}
        />
      )}
      {page === "lesson_smcp_l3" && (
        <LessonSMCP_L3
          lang={lang}
          onBack={() => setPage("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l3"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l3"); setPage("lesson_smcp_l4"); }}
        />
      )}
      {page === "lesson_smcp_l4" && (
        <LessonSMCP_L4
          lang={lang}
          onBack={() => setPage("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l4"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l4"); setPage("lesson_smcp_l5"); }}
        />
      )}
      {page === "lesson_smcp_l5" && (
        <LessonSMCP_L5
          lang={lang}
          onBack={() => setPage("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l5"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l5"); setPage("lesson_smcp_l6"); }}
        />
      )}
      {page === "lesson_smcp_l6" && (
        <LessonSMCP_L6
          lang={lang}
          onBack={() => setPage("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l6"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l6"); setPage("lesson_smcp_l7"); }}
        />
      )}
      {page === "lesson_smcp_l7" && (
        <LessonSMCP_L7
          lang={lang}
          onBack={() => setPage("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l7"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l7"); setPage("lesson_smcp_l8"); }}
        />
      )}
      {page === "lesson_smcp_l8" && (
        <LessonSMCP_L8
          lang={lang}
          onBack={() => setPage("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l8"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l8"); setPage("smcp_lessons"); }}
        />
      )}
      {page === "lesson_navigation" && (
        <LessonNavigation
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l1"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l1"); setPage("lesson_navire"); }}
        />
      )}
      {page === "lesson_navire" && (
        <LessonNavire
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l2"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l2"); setPage("lesson_coord"); }}
        />
      )}
      {page === "lesson_coord" && (
        <LessonCoord
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l3"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l3"); setPage("lesson_carte"); }}
        />
      )}
      {page === "lesson_carte" && (
        <LessonCarteMarine
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l4"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l4"); setPage("lesson_compas"); }}
        />
      )}
      {page === "lesson_compas" && (
        <LessonCompas
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l5"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l5"); setPage("lesson_navpratique"); }}
        />
      )}
      {page === "lesson_navpratique" && (
        <LessonNavPratique
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l6"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l6"); setPage("lesson_marees"); }}
        />
      )}
      {page === "lesson_marees" && (
        <LessonMarees
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l7"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l7"); setPage("lesson_colreg"); }}
        />
      )}
      {page === "lesson_colreg" && (
        <LessonCOLREG
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l8"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l8"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_steering" && (
        <LessonSteering
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l9"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l9"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_watch_org" && (
        <LessonWatchOrganization
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l10"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l10"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_moteur" && (
        <LessonMoteur
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l1"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l1"); setPage("lesson_auxiliaires"); }}
        />
      )}
      {page === "lesson_auxiliaires" && (
        <LessonAuxiliaires
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l2"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l2"); setPage("lesson_stabilite"); }}
        />
      )}
      {page === "lesson_stabilite" && (
        <LessonStabilite
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l3"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l3"); setPage("lesson_incendie"); }}
        />
      )}
      {page === "lesson_incendie" && (
        <LessonIncendie
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l4"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l4"); setPage("lesson_sauvetage"); }}
        />
      )}
      {page === "lesson_sauvetage" && (
        <LessonSauvetage
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l5"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l5"); setPage("lesson_marpol"); }}
        />
      )}
      {page === "lesson_marpol" && (
        <LessonMARPOL
          lang={lang}
          onBack={() => setPage("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l1"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l1"); setPage("lesson_solas"); }}
        />
      )}
      {page === "lesson_marpol_l2" && (
        <LessonMARPOL_L2
          lang={lang}
          onBack={() => setPage("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l2"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l2"); setPage("lesson_marpol_l3"); }}
        />
      )}
      {page === "lesson_marpol_l3" && (
        <LessonMARPOL_L3
          lang={lang}
          onBack={() => setPage("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l3"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l3"); setPage("lesson_marpol_l4"); }}
        />
      )}
      {page === "lesson_marpol_l4" && (
        <LessonMARPOL_L4
          lang={lang}
          onBack={() => setPage("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l4"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l4"); setPage("lesson_marpol_l5"); }}
        />
      )}
      {page === "lesson_marpol_l5" && (
        <LessonMARPOL_L5
          lang={lang}
          onBack={() => setPage("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l5"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l5"); setPage("lesson_marpol_l6"); }}
        />
      )}
      {page === "lesson_marpol_l6" && (
        <LessonMARPOL_L6
          lang={lang}
          onBack={() => setPage("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l6"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l6"); setPage("marpol_lessons"); }}
        />
      )}
    {page === "lesson_seemp_l1" && (
        <LessonSEEMP_L1
          lang={lang}
          onBack={() => setPage("seemp_lessons")}
          onComplete={() => { markLessonCompleted("e5-l1"); setPage("seemp_lessons"); }}
          onNext={() => { markLessonCompleted("e5-l1"); setPage("lesson_seemp_l2"); }}
        />
      )}
      {page === "lesson_seemp_l2" && (
        <LessonSEEMP_L2
          lang={lang}
          onBack={() => setPage("seemp_lessons")}
          onComplete={() => { markLessonCompleted("e5-l2"); setPage("seemp_lessons"); }}
          onNext={() => { markLessonCompleted("e5-l2"); setPage("lesson_seemp_l3"); }}
        />
      )}
      {page === "lesson_seemp_l3" && (
        <LessonSEEMP_L3
          lang={lang}
          onBack={() => setPage("seemp_lessons")}
          onComplete={() => { markLessonCompleted("e5-l3"); setPage("seemp_lessons"); }}
          onNext={() => { markLessonCompleted("e5-l3"); setPage("lesson_seemp_l4"); }}
        />
      )}
      {page === "lesson_seemp_l4" && (
        <LessonSEEMP_L4
          lang={lang}
          onBack={() => setPage("seemp_lessons")}
          onComplete={() => { markLessonCompleted("e5-l4"); setPage("seemp_lessons"); }}
          onNext={() => { markLessonCompleted("e5-l4"); setPage("lesson_seemp_l5"); }}
        />
      )}
      {page === "lesson_seemp_l5" && (
        <LessonSEEMP_L5
          lang={lang}
          onBack={() => setPage("seemp_lessons")}
          completedLessons={completedLessons}
          userXP={userXP}
          onComplete={() => { markLessonCompleted("e5-l5"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("e5-l5"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_watchkeeping" && (
        <LessonWatchkeeping
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l7"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l7"); setPage("lesson_emergency"); }}
        />
      )}
      {page === "lesson_maintenance" && (
        <LessonMaintenance
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l6"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l6"); setPage("lesson_watchkeeping"); }}
        />
      )}
      {page === "lesson_emergency" && (
        <LessonEmergency
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l8"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l8"); setPage("engine_lessons"); }}
        />
      )}
      {showExitConfirm && (
        <div
          onClick={() => setShowExitConfirm(false)}
          style={{
            position:"fixed",inset:0,zIndex:9999,
            background:"rgba(6,14,26,0.85)",backdropFilter:"blur(8px)",
            display:"flex",alignItems:"center",justifyContent:"center",padding:24,
            fontFamily:"'Nunito',sans-serif",
          }}>
          <div onClick={(e)=>e.stopPropagation()} style={{
            width:"100%",maxWidth:360,
            background:"linear-gradient(160deg,#112244,#0d1f3c)",
            border:"1px solid rgba(201,146,42,0.35)",
            borderRadius:20,padding:24,color:"#f0f4ff",
            boxShadow:"0 20px 60px rgba(0,0,0,0.6)",
          }}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:900,marginBottom:8,textAlign:"center"}}>
              {lang==="fr"?"Quitter MAP ?":lang==="es"?"¿Salir de MAP?":lang==="pt"?"Sair do MAP?":"Quit MAP?"}
            </div>
            <div style={{fontSize:13,color:"rgba(240,244,255,0.65)",textAlign:"center",marginBottom:20}}>
              {lang==="fr"?"Vous êtes sur le tableau de bord.":lang==="es"?"Estás en el panel principal.":lang==="pt"?"Você está no painel principal.":"You are on the dashboard."}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button
                onClick={() => setShowExitConfirm(false)}
                style={{
                  padding:"12px",borderRadius:12,
                  background:"rgba(255,255,255,0.08)",
                  border:"1px solid rgba(255,255,255,0.2)",
                  color:"#f0f4ff",fontWeight:700,fontSize:14,cursor:"pointer",
                }}>
                {lang==="fr"?"Non — Rester":lang==="es"?"No — Quedarme":lang==="pt"?"Não — Ficar":"No — Stay"}
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  // Attempt 1: jump past the entire history stack
                  try { window.history.go(-(window.history.length)); } catch {}
                  // Attempt 2: native exit (Cordova-style) or blank replace
                  setTimeout(() => {
                    try {
                      const nav = navigator as Navigator & { app?: { exitApp?: () => void } };
                      if (nav.app?.exitApp) { nav.app.exitApp(); return; }
                    } catch {}
                    try { window.location.replace("about:blank"); } catch {}
                  }, 150);
                  // Attempt 3: most reliable on Android PWA — blank then close
                  setTimeout(() => {
                    try { window.location.href = "about:blank"; } catch {}
                    setTimeout(() => { try { window.close(); } catch {} }, 100);
                  }, 300);
                }}
                style={{
                  padding:"12px",borderRadius:12,
                  background:"linear-gradient(135deg,#c0392b,#922b21)",
                  border:"1px solid rgba(231,76,60,0.6)",
                  color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",
                }}>
                {lang==="fr"?"Oui — Quitter":lang==="es"?"Sí — Salir":lang==="pt"?"Sim — Sair":"Yes — Quit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
}
