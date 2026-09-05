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
import { getModuleAverageScore } from "@/core/examProgress";
import {
  EXAM_PASS_THRESHOLD,
  getExamEligibleLessonIds,
  drawExamQuestions,
  getLatestExamAttempt,
  canAttemptExam,
  canAttemptRemedial,
  getWrongAnswersForAttempt,
  drawRemedialQuestions,
  recordExamAttempt,
  shuffle,
  FOUNDATION_MODULE_IDS,
} from "@/core/examEngine";
import { getSummaryExamQuestions } from "@/core/examQuestionPools";
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
const LessonSafetyS1E_L1 = lazy(() => import("./LessonSafetyS1E_L1"));
const LessonSafetyS1E_L2 = lazy(() => import("./LessonSafetyS1E_L2"));
const LessonSafetyS1E_L3 = lazy(() => import("./LessonSafetyS1E_L3"));
const LessonSafetyS1E_L4 = lazy(() => import("./LessonSafetyS1E_L4"));
const LessonSafetyS1E_L5 = lazy(() => import("./LessonSafetyS1E_L5"));
const LessonSafetyS1E_L6 = lazy(() => import("./LessonSafetyS1E_L6"));
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
  returnToRecommended, onReturnToRecommendedConsumed,
}:{
  lang:string; onBack:()=>void;
  selected: string | null; onSelectedChange: (v: string | null) => void;
  selectedOperationId: string | null; onSelectedOperationIdChange: (v: string | null) => void;
  highlightedOperationId?: string | null; onHighlightedOperationIdChange?: (v: string | null) => void;
  returnToRecommended?: boolean; onReturnToRecommendedConsumed?: () => void;
}) {
  const t = NAV_T[lang] || NAV_T.fr;
  const setSelected = onSelectedChange;
  const setSelectedOperationId = onSelectedOperationIdChange;
  const setHighlightedOperationId = onHighlightedOperationIdChange ?? (() => {});
  // Point 3 correctif (2026-09-01) — back from the Ship Card itself (NOT
  // from an individual operation, which must keep returning to the Ship
  // Card unchanged) goes straight to Dashboard if we arrived here via
  // Recommended for You's navigateToShipCard(), consuming the flag; the
  // normal manual-browse behavior (reset to the generic vessel list) is
  // untouched otherwise.
  const backFromShipCard = () => {
    if (returnToRecommended) {
      onReturnToRecommendedConsumed?.();
      onBack();
    } else {
      setSelected(null);
      setHighlightedOperationId(null);
    }
  };
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
        <TopBar onBack={backFromShipCard} title={t.ships} backLabel={t.back}/>
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
  returnToRecommended, onReturnToRecommendedConsumed,
}:{
  lang:string; onBack:()=>void;
  selected: string | null; onSelectedChange: (v: string | null) => void;
  returnToRecommended?: boolean; onReturnToRecommendedConsumed?: () => void;
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

  // Point 3 correctif (2026-09-01) — single hop: back from the rank detail
  // goes straight to Dashboard if we arrived via Recommended for You's
  // navigateToRoleOnBoard(), consuming the flag; normal manual-browse
  // behavior (reset to the rank list) is untouched otherwise.
  const backFromRankDetail = () => {
    if (returnToRecommended) {
      onReturnToRecommendedConsumed?.();
      onBack();
    } else {
      setSelected(null);
    }
  };

  if (selected) {
    return (
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
        <TopBar onBack={backFromRankDetail} title={t.roleOnBoard} backLabel={t.back}/>
        <Suspense fallback={null}>
          <RoleOnBoardShared rankId={selected} lang={lang} onBack={backFromRankDetail}/>
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

const EXAM_UI_T:any = {
  fr:{quiz:"EXAMEN",question:"Question",of:"sur",next:"SUIVANT →",finish:"TERMINER",correct:"Correct !",wrong:"Incorrect",expl:"Explication",passed:"Examen réussi ✓",failed:"Examen non réussi",back:"◀ Retour"},
  en:{quiz:"EXAM",question:"Question",of:"of",next:"NEXT →",finish:"FINISH",correct:"Correct!",wrong:"Incorrect",expl:"Explanation",passed:"Exam passed ✓",failed:"Exam not passed",back:"◀ Back"},
  es:{quiz:"EXAMEN",question:"Pregunta",of:"de",next:"SIGUIENTE →",finish:"TERMINAR",correct:"¡Correcto!",wrong:"Incorrecto",expl:"Explicación",passed:"Examen aprobado ✓",failed:"Examen no aprobado",back:"◀ Volver"},
  pt:{quiz:"EXAME",question:"Pergunta",of:"de",next:"SEGUINTE →",finish:"TERMINAR",correct:"Correto!",wrong:"Incorreto",expl:"Explicação",passed:"Exame aprovado ✓",failed:"Exame não aprovado",back:"◀ Voltar"},
};

// Foundation Exams pilot (module d1) — the exam-taking screen itself (step 2
// of the staged UI wiring, after the unlock/notifications from step 1).
// Deliberately mirrors each lesson's own local QuizComp pattern (sequential
// Q&A, immediate feedback, progress bar) for visual/UX consistency, but is
// generic on `questions` (already trajectory+tier-filtered and drawn by the
// caller via examEngine.ts) and reports raw {questionId,lessonId,wasCorrect}
// answers so the caller can record them without this component knowing
// anything about Supabase.
function ModuleExamComp({ lang, questions, onFinish }:{lang:string;questions:any[];onFinish:(score:number,maxScore:number,answers:{questionId:string;lessonId:string;wasCorrect:boolean;selectedIndex:number}[])=>void}) {
  const t = EXAM_UI_T[lang] || EXAM_UI_T.fr;
  const [cur,setCur] = useState(0);
  const [sel,setSel] = useState<number|null>(null);
  const [answered,setAnswered] = useState(false);
  const [score,setScore] = useState(0);
  const [answers,setAnswers] = useState<{questionId:string;lessonId:string;wasCorrect:boolean;selectedIndex:number}[]>([]);
  const q = questions[cur];
  const isOk = sel === q.correct;
  const pick = (i:number) => {
    if (answered) return;
    setSel(i); setAnswered(true);
    const ok = i === q.correct;
    if (ok) setScore(s=>s+1);
    setAnswers(a=>[...a,{questionId:q.questionId,lessonId:q.lessonId,wasCorrect:ok,selectedIndex:i}]);
  };
  const next = () => {
    if (cur < questions.length-1) {
      setCur(c=>c+1); setSel(null); setAnswered(false);
    } else {
      onFinish(score+(isOk?1:0), questions.length, answers);
    }
  };
  return (
    <div style={{background:"rgba(13,31,60,0.85)",border:"1px solid #1a6fd444",borderRadius:16,padding:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:11,letterSpacing:3,color:"#4da6ff",fontFamily:"'Cinzel',serif"}}>{t.quiz}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.5)"}}>{t.question} {cur+1} {t.of} {questions.length}</div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:16}}>
        {questions.map((_,i)=>(
          <div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?"#1a6fd4":i===cur?"#c9922a":"rgba(255,255,255,0.1)"}}/>
        ))}
      </div>
      <div style={{fontSize:14,fontWeight:700,lineHeight:1.5,marginBottom:16}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
        {q.opts.map((opt:string,i:number)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if (answered) {
            if (i===q.correct) { bg="rgba(30,138,74,0.2)"; bd="#1e8a4a"; }
            else if (i===sel) { bg="rgba(192,57,43,0.2)"; bd="#c0392b"; }
          }
          return (
            <button key={i} onClick={()=>pick(i)} style={{
              padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,
              color:"#f0f4ff",fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",
              fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",gap:10,lineHeight:1.4,
            }}>
              <div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,
                background:answered&&i===q.correct?"#1e8a4a":answered&&i===sel?"#c0392b":"rgba(255,255,255,0.1)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>
                {answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}
              </div>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,
          background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",
          border:`1px solid ${isOk?"#1e8a4a":"#c0392b"}44`}}>
          <div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?"#1e8a4a":"#c0392b"}}>{isOk?t.correct:t.wrong}</div>
          <div style={{fontSize:11,color:"rgba(240,244,255,0.5)",fontWeight:600,marginBottom:2}}>{t.expl}</div>
          <div style={{fontSize:12,lineHeight:1.6}}>{q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,
          background:"linear-gradient(135deg,#1a6fd4,#c9922a)",fontFamily:"'Cinzel',serif",
          fontSize:13,fontWeight:700,letterSpacing:2,color:"#fff",cursor:"pointer"}}>
          {cur<questions.length-1?t.next:t.finish}
        </button>
      )}
    </div>
  );
}

// Detailed result screen content — step 3 of the staged UI wiring (question
// review, Remedial, "Competencies Acquired"), pilot module d1 only.
const EXAM_RESULT_T:any = {
  fr:{
    competenciesHeader:"COMPÉTENCES ACQUISES",
    reviewHeader:"REVUE DES RÉPONSES",
    reviewLessonLink:"↩ Revoir cette leçon",
    remedialTitleWithCount:(n:number)=>`Tu as ${n} question${n>1?"s":""} à revoir. Un rattrapage (mêmes questions) est disponible.`,
    remedialTitleGeneric:"Ton dernier examen n'a pas été réussi — un rattrapage est disponible.",
    remedialBtn:"📚 FAIRE LE RATTRAPAGE",
    remedialStarting:"Préparation du rattrapage…",
    remedialCooldown:(d:Date)=>`Rattrapage déjà tenté récemment. Prochain essai disponible le ${d.toLocaleDateString(lang)} à ${d.toLocaleTimeString(lang,{hour:"2-digit",minute:"2-digit"})}.`,
    remedialNoQuestions:"Aucune question à revoir n'a pu être retrouvée.",
    remedialPassed:"Rattrapage réussi ✓",
    remedialFailed:"Rattrapage non réussi",
    signature:"MAP — powered by Independencia",
    disclaimer:"Ce document n'est pas un Certificat de Compétence (Certificate of Competency) ni un Certificat d'Aptitude (Certificate of Proficiency) au sens de la convention STCW.",
  },
  en:{
    competenciesHeader:"COMPETENCIES ACQUIRED",
    reviewHeader:"ANSWER REVIEW",
    reviewLessonLink:"↩ Review this lesson",
    remedialTitleWithCount:(n:number)=>`You have ${n} question${n>1?"s":""} to review. A remedial retry (same questions) is available.`,
    remedialTitleGeneric:"Your last exam wasn't passed — a remedial retry is available.",
    remedialBtn:"📚 TAKE THE REMEDIAL",
    remedialStarting:"Preparing the remedial…",
    remedialCooldown:(d:Date)=>`Remedial already attempted recently. Next attempt available on ${d.toLocaleDateString(lang)} at ${d.toLocaleTimeString(lang,{hour:"2-digit",minute:"2-digit"})}.`,
    remedialNoQuestions:"Couldn't retrieve the questions to review.",
    remedialPassed:"Remedial passed ✓",
    remedialFailed:"Remedial not passed",
    signature:"MAP — powered by Independencia",
    disclaimer:"This is not an STCW Certificate of Competency or Certificate of Proficiency.",
  },
  es:{
    competenciesHeader:"COMPETENCIAS ADQUIRIDAS",
    reviewHeader:"REVISIÓN DE RESPUESTAS",
    reviewLessonLink:"↩ Repasar esta lección",
    remedialTitleWithCount:(n:number)=>`Tienes ${n} pregunta${n>1?"s":""} para repasar. Hay una recuperación disponible (mismas preguntas).`,
    remedialTitleGeneric:"No aprobaste tu último examen — hay una recuperación disponible.",
    remedialBtn:"📚 HACER LA RECUPERACIÓN",
    remedialStarting:"Preparando la recuperación…",
    remedialCooldown:(d:Date)=>`Recuperación ya intentada recientemente. Próximo intento disponible el ${d.toLocaleDateString(lang)} a las ${d.toLocaleTimeString(lang,{hour:"2-digit",minute:"2-digit"})}.`,
    remedialNoQuestions:"No se pudieron recuperar las preguntas a repasar.",
    remedialPassed:"Recuperación aprobada ✓",
    remedialFailed:"Recuperación no aprobada",
    signature:"MAP — powered by Independencia",
    disclaimer:"Este documento no es un Certificado de Competencia (Certificate of Competency) ni un Certificado de Aptitud (Certificate of Proficiency) en el sentido del convenio STCW.",
  },
  pt:{
    competenciesHeader:"COMPETÊNCIAS ADQUIRIDAS",
    reviewHeader:"REVISÃO DAS RESPOSTAS",
    reviewLessonLink:"↩ Rever esta lição",
    remedialTitleWithCount:(n:number)=>`Tens ${n} pergunta${n>1?"s":""} para rever. Está disponível uma recuperação (mesmas perguntas).`,
    remedialTitleGeneric:"O teu último exame não foi aprovado — está disponível uma recuperação.",
    remedialBtn:"📚 FAZER A RECUPERAÇÃO",
    remedialStarting:"A preparar a recuperação…",
    remedialCooldown:(d:Date)=>`Recuperação já tentada recentemente. Próxima tentativa disponível em ${d.toLocaleDateString(lang)} às ${d.toLocaleTimeString(lang,{hour:"2-digit",minute:"2-digit"})}.`,
    remedialNoQuestions:"Não foi possível recuperar as perguntas a rever.",
    remedialPassed:"Recuperação aprovada ✓",
    remedialFailed:"Recuperação não aprovada",
    signature:"MAP — powered by Independencia",
    disclaimer:"Este documento não é um Certificado de Competência (Certificate of Competency) nem um Certificado de Aptidão (Certificate of Proficiency) no âmbito da convenção STCW.",
  },
};

// Pilot competencies list for d1 (Navigation & Cartographie) — shown on a
// PASSED result, per doctrine ("on passing an exam, the learner should see
// a list of skills gained, not just a numeric score"). Authored fresh for
// this module under the user's explicit 2026-09-02 go-ahead (superseding
// the earlier "MARPOL-example-only, don't author others" note in project
// memory) — kept short, same style as the MARPOL example.
const COMPETENCIES_D1:any = {
  fr:["✔ Appliquer les règles COLREG pour éviter les collisions","✔ Lire et interpréter une carte marine (symboles, échelle, datum)","✔ Calculer une position par estime et par relèvements","✔ Comprendre les marées et la règle des douzièmes","✔ Corriger un cap avec la déviation et la déclinaison du compas"],
  en:["✔ Apply COLREG rules to avoid collisions","✔ Read and interpret a nautical chart (symbols, scale, datum)","✔ Calculate a position by dead reckoning and bearings","✔ Understand tides and the rule of twelfths","✔ Correct a heading using compass deviation and declination"],
  es:["✔ Aplicar las reglas COLREG para evitar colisiones","✔ Leer e interpretar una carta náutica (símbolos, escala, datum)","✔ Calcular una posición por estima y por marcaciones","✔ Comprender las mareas y la regla de los doceavos","✔ Corregir un rumbo con la desviación y declinación de la brújula"],
  pt:["✔ Aplicar as regras COLREG para evitar colisões","✔ Ler e interpretar uma carta náutica (símbolos, escala, datum)","✔ Calcular uma posição por estima e por marcações","✔ Compreender as marés e a regra dos doze avos","✔ Corrigir um rumo com o desvio e a declinação da bússola"],
};

// Pilot #2 competencies list for d2 (Droit Maritime International) — same
// register as d1 (no STCW/IMO/"certified" language), validated 2026-09-02.
const COMPETENCIES_D2:any = {
  fr:["✔ Identifier les obligations SOLAS/MARPOL/STCW/MLC applicables à bord","✔ Appliquer les règles COLREG dans leur dimension juridique (responsabilité en cas de collision)","✔ Comprendre les limites de juridiction maritime (UNCLOS)","✔ Réagir correctement face à une inspection Port State Control","✔ Documenter un incident pour la responsabilité civile et l'assurance"],
  en:["✔ Identify the SOLAS/MARPOL/STCW/MLC obligations that apply on board","✔ Apply COLREG rules in their legal dimension (liability in case of collision)","✔ Understand the limits of maritime jurisdiction (UNCLOS)","✔ Respond correctly to a Port State Control inspection","✔ Document an incident for civil liability and insurance purposes"],
  es:["✔ Identificar las obligaciones SOLAS/MARPOL/STCW/MLC aplicables a bordo","✔ Aplicar las reglas COLREG en su dimensión jurídica (responsabilidad en caso de colisión)","✔ Comprender los límites de la jurisdicción marítima (UNCLOS)","✔ Reaccionar correctamente ante una inspección de Port State Control","✔ Documentar un incidente para la responsabilidad civil y el seguro"],
  pt:["✔ Identificar as obrigações SOLAS/MARPOL/STCW/MLC aplicáveis a bordo","✔ Aplicar as regras COLREG na sua dimensão jurídica (responsabilidade em caso de colisão)","✔ Compreender os limites da jurisdição marítima (UNCLOS)","✔ Reagir corretamente perante uma inspeção de Port State Control","✔ Documentar um incidente para responsabilidade civil e seguro"],
};

// Pilot #3 competencies list for d3 (Signalisation & Balisage) — same
// register as d1/d2, validated 2026-09-03.
const COMPETENCIES_D3:any = {
  fr:["✔ Interpréter les marques de balisage IALA (régions A/B)","✔ Identifier les feux et marques des navires pour déterminer type et statut","✔ Appliquer les procédures de signaux sonores par visibilité réduite","✔ Utiliser correctement les procédures radio VHF","✔ Vérifier l'état opérationnel de l'AIS/GMDSS et recouper les données de navigation électronique"],
  en:["✔ Interpret IALA buoyage marks (Region A/B)","✔ Identify vessel lights and shapes to determine type and status","✔ Apply sound signal procedures in restricted visibility","✔ Use VHF radio procedures correctly","✔ Verify AIS/GMDSS equipment readiness and cross-check electronic navigation data"],
  es:["✔ Interpretar las marcas de balizamiento IALA (regiones A/B)","✔ Identificar las luces y marcas de los buques para determinar tipo y estado","✔ Aplicar los procedimientos de señales acústicas por visibilidad reducida","✔ Usar correctamente los procedimientos de radio VHF","✔ Verificar el estado operativo del AIS/GMDSS y contrastar los datos de navegación electrónica"],
  pt:["✔ Interpretar as marcas de balizamento IALA (regiões A/B)","✔ Identificar as luzes e marcas dos navios para determinar tipo e estado","✔ Aplicar os procedimentos de sinais sonoros com visibilidade reduzida","✔ Usar corretamente os procedimentos de rádio VHF","✔ Verificar o estado operacional do AIS/GMDSS e cruzar os dados de navegação eletrónica"],
};

// Pilot #3 competencies list for d4 (Anglais Maritime SMCP) — same
// register as d1/d2, validated 2026-09-03.
const COMPETENCIES_D4:any = {
  fr:["✔ Appliquer les phrases normalisées SMCP dans les opérations courantes de passerelle","✔ Communiquer clairement avec le VTS et les autorités portuaires","✔ Utiliser correctement les phrases SMCP d'urgence sous pression","✔ Donner et accuser réception d'ordres de manœuvre sans ambiguïté","✔ Signaler une urgence médicale selon la phraséologie normalisée"],
  en:["✔ Apply Standard Marine Communication Phrases in routine bridge operations","✔ Communicate clearly with VTS and port authorities","✔ Use emergency SMCP phrases correctly under pressure","✔ Give and acknowledge maneuvering orders without ambiguity","✔ Report a medical emergency using standardized phraseology"],
  es:["✔ Aplicar las frases normalizadas SMCP en las operaciones habituales de puente","✔ Comunicarse con claridad con el VTS y las autoridades portuarias","✔ Usar correctamente las frases SMCP de emergencia bajo presión","✔ Dar y confirmar la recepción de órdenes de maniobra sin ambigüedad","✔ Reportar una emergencia médica según la fraseología normalizada"],
  pt:["✔ Aplicar as frases normalizadas SMCP nas operações habituais de ponte","✔ Comunicar com clareza com o VTS e as autoridades portuárias","✔ Usar corretamente as frases SMCP de emergência sob pressão","✔ Dar e confirmar a receção de ordens de manobra sem ambiguidade","✔ Reportar uma emergência médica segundo a fraseologia normalizada"],
};

// d6 (Seamanship) competencies list — closes out the Deck department before
// the 13th exam, validated 2026-09-04. Themes: rigging/rope selection,
// knots/splicing, anchoring, mooring, stability, maintenance & corrosion
// prevention (L3-L5 migrated to shared schema, L6-L7 exported as-is, this
// session — see project_exams_system_architecture.md).
const COMPETENCIES_D6:any = {
  fr:["✔ Choisir le cordage ou le cable adapte a un usage critique et en reconnaitre les defauts disqualifiants","✔ Executer les noeuds et epissures essentiels selon leur usage (fixation permanente, boucle de securite, assemblage rapide)","✔ Mouiller en toute securite selon la nature du fond et ajuster la longueur de chaine filee aux conditions meteo","✔ Superviser une manoeuvre d'accostage ou d'appareillage et le role de chaque amarre","✔ Interpreter les facteurs de stabilite d'un navire et reagir correctement a une situation degradee","✔ Assurer une maintenance preventive rigoureuse et reconnaitre les signes de corrosion necessitant un signalement"],
  en:["✔ Select the right rope or wire for a critical use and recognize disqualifying defects","✔ Execute essential knots and splices according to their use (permanent fixing, safety loop, quick joining)","✔ Anchor safely according to the seabed type and adjust the chain length veered to weather conditions","✔ Supervise a berthing or departure manoeuvre and the role of each mooring line","✔ Interpret a vessel's stability factors and react correctly to a degraded situation","✔ Ensure rigorous preventive maintenance and recognize corrosion signs requiring a report"],
  es:["✔ Elegir el cabo o cable adecuado para un uso critico y reconocer los defectos descalificantes","✔ Ejecutar los nudos y gazas esenciales segun su uso (fijacion permanente, gaza de seguridad, union rapida)","✔ Fondear con seguridad segun el tipo de fondo y ajustar la longitud de cadena largada a las condiciones meteorologicas","✔ Supervisar una maniobra de atraque o zarpe y el papel de cada cabo","✔ Interpretar los factores de estabilidad de un buque y reaccionar correctamente ante una situacion degradada","✔ Garantizar un mantenimiento preventivo riguroso y reconocer los signos de corrosion que requieren informe"],
  pt:["✔ Escolher o cabo adequado para um uso critico e reconhecer os defeitos desqualificantes","✔ Executar os nos e gazas essenciais conforme o seu uso (fixacao permanente, gaza de seguranca, uniao rapida)","✔ Fundear com seguranca conforme o tipo de fundo e ajustar o comprimento de corrente filada as condicoes meteorologicas","✔ Supervisionar uma manobra de atracacao ou zarpar e o papel de cada cabo","✔ Interpretar os fatores de estabilidade de um navio e reagir corretamente a uma situacao degradada","✔ Garantir uma manutencao preventiva rigorosa e reconhecer os sinais de corrosao que exigem relatorio"],
};

// Batch #2 competencies list for d7 (Marine Meteorology) — same register as
// d1-d4, validated 2026-09-03.
const COMPETENCIES_D7:any = {
  fr:["✔ Interpréter les indicateurs de pression et de tendance barométrique pour anticiper une évolution météo","✔ Observer et consigner correctement les nuages, la visibilité et les conditions de mer","✔ Utiliser les instruments météorologiques embarqués et détecter leurs anomalies","✔ Identifier les systèmes de pression, masses d'air et fronts sur une carte synoptique","✔ Évaluer un risque cyclonique ou de gros temps et appliquer la manœuvre d'évitement appropriée"],
  en:["✔ Interpret pressure readings and barometric trends to anticipate weather changes","✔ Observe and accurately log clouds, visibility and sea conditions","✔ Use onboard meteorological instruments and detect their anomalies","✔ Identify pressure systems, air masses and fronts on a synoptic chart","✔ Assess a cyclone or heavy-weather risk and apply the appropriate avoidance manoeuvre"],
  es:["✔ Interpretar las lecturas de presión y las tendencias barométricas para anticipar cambios meteorológicos","✔ Observar y registrar correctamente las nubes, la visibilidad y el estado del mar","✔ Usar los instrumentos meteorológicos de a bordo y detectar sus anomalías","✔ Identificar sistemas de presión, masas de aire y frentes en una carta sinóptica","✔ Evaluar un riesgo de ciclón o mal tiempo y aplicar la maniobra de evitación adecuada"],
  pt:["✔ Interpretar as leituras de pressão e as tendências barométricas para antecipar mudanças meteorológicas","✔ Observar e registar corretamente as nuvens, a visibilidade e o estado do mar","✔ Usar os instrumentos meteorológicos de bordo e detetar as suas anomalias","✔ Identificar sistemas de pressão, massas de ar e frentes numa carta sinótica","✔ Avaliar um risco de ciclone ou mau tempo e aplicar a manobra de evitação adequada"],
};

// s1 (COLREG Safety — Collision Prevention & Response) competencies list —
// first Safety module wired onto Foundation Exams, batch 2 of the Safety
// wiring effort, validated 2026-09-04. Themes: individual assertiveness &
// danger recognition, bridge team dynamics (Shared Situational Awareness,
// Authority Gradient, Challenge & Response), last-seconds collision action,
// first-minutes post-collision response, decision-making under pressure,
// synthesis into a lasting Safety Mindset (L1-L6).
const COMPETENCIES_S1:any = {
  fr:["✔ Reconnaître un danger de collision et le signaler avec l'assertivité individuelle requise","✔ Appliquer les réflexes d'équipe (Shared Situational Awareness, Challenge & Response) en situation de risque","✔ Agir efficacement dans les dernières secondes avant un impact quasi certain","✔ Exécuter les toutes premières actions essentielles dans les minutes suivant une collision confirmée","✔ Mobiliser un jugement de décision fiable sous pression dans un scénario de collision","✔ Synthétiser les réflexes de sécurité acquis en une posture professionnelle durable"],
  en:["✔ Recognize a collision danger and report it with the required individual assertiveness","✔ Apply team reflexes (Shared Situational Awareness, Challenge & Response) under risk","✔ Act effectively in the last seconds before a near-certain impact","✔ Execute the essential first actions in the minutes following a confirmed collision","✔ Exercise reliable decision-making under pressure in a collision scenario","✔ Synthesize the safety reflexes learned into a lasting professional mindset"],
  es:["✔ Reconocer un peligro de colisión y señalarlo con la asertividad individual requerida","✔ Aplicar los reflejos de equipo (Shared Situational Awareness, Challenge & Response) en riesgo","✔ Actuar eficazmente en los últimos segundos antes de un impacto casi seguro","✔ Ejecutar las primerísimas acciones esenciales en los minutos tras una colisión confirmada","✔ Ejercer un juicio de decisión fiable bajo presión en un escenario de colisión","✔ Sintetizar los reflejos de seguridad adquiridos en una mentalidad profesional duradera"],
  pt:["✔ Reconhecer um perigo de colisão e sinalizá-lo com a assertividade individual exigida","✔ Aplicar os reflexos de equipa (Shared Situational Awareness, Challenge & Response) sob risco","✔ Agir eficazmente nos últimos segundos antes de um impacto quase certo","✔ Executar as primeiríssimas ações essenciais nos minutos após uma colisão confirmada","✔ Exercer um julgamento de decisão fiável sob pressão num cenário de colisão","✔ Sintetizar os reflexos de segurança adquiridos numa postura profissional duradoura"],
};

// s1e (Engine Room Resource Management) competencies list — Engine-specific
// variant replacing s1 in an Engine learner's Safety curriculum (audit
// 2026-09-02 found s1/COLREG Safety structurally Deck/bridge-specific with
// no Engine equivalent; s1e authored as its replacement, not an addition —
// see project memory for the full doctrine). Themes: human factors in
// machinery casualties (alarm bias, fatigue), engine room team coordination
// (roles, Challenge & Response, shared situational awareness), structured
// emergency actions during a critical machinery failure, stabilization and
// prolonged casualty management, decision-making under pressure (avoiding
// tunnel vision, escalation thresholds), synthesis (L1-L6).
const COMPETENCIES_S1E:any = {
  fr:["✔ Reconnaître les facteurs humains propres à la salle des machines (fatigue, alarm bias) et agir avant l'avarie","✔ Appliquer les réflexes de coordination d'équipe machine (rôles clairs, Challenge & Response, conscience de situation partagée)","✔ Exécuter une checklist d'urgence structurée face à une avarie machine critique","✔ Stabiliser une situation après le danger immédiat et gérer une avarie prolongée sur plusieurs jours si nécessaire","✔ Décider juste sous pression, éviter le tunnel vision, et savoir quand escalader avant d'agir","✔ Synthétiser les réflexes ERM acquis en une posture professionnelle durable"],
  en:["✔ Recognize the human factors specific to the engine room (fatigue, alarm bias) and act before the casualty","✔ Apply engine room team coordination reflexes (clear roles, Challenge & Response, shared situational awareness)","✔ Execute a structured emergency checklist facing a critical machinery failure","✔ Stabilize a situation after the immediate danger and manage a prolonged casualty over several days if needed","✔ Decide well under pressure, avoid tunnel vision, and know when to escalate before acting","✔ Synthesize the ERM reflexes learned into a lasting professional mindset"],
  es:["✔ Reconocer los factores humanos propios de la sala de máquinas (fatiga, sesgo de alarma) y actuar antes de la avería","✔ Aplicar los reflejos de coordinación de equipo de máquinas (roles claros, Challenge & Response, conciencia de situación compartida)","✔ Ejecutar una checklist de emergencia estructurada ante una avería crítica de maquinaria","✔ Estabilizar una situación tras el peligro inmediato y gestionar una avería prolongada durante varios días si es necesario","✔ Decidir bien bajo presión, evitar la visión de túnel, y saber cuándo escalar antes de actuar","✔ Sintetizar los reflejos ERM adquiridos en una mentalidad profesional duradera"],
  pt:["✔ Reconhecer os fatores humanos próprios da casa das máquinas (fadiga, viés de alarme) e agir antes da avaria","✔ Aplicar os reflexos de coordenação de equipa de máquinas (funções claras, Challenge & Response, consciência de situação partilhada)","✔ Executar uma checklist de emergência estruturada perante uma avaria crítica de maquinaria","✔ Estabilizar uma situação após o perigo imediato e gerir uma avaria prolongada ao longo de vários dias se necessário","✔ Decidir bem sob pressão, evitar a visão em túnel, e saber quando escalar antes de agir","✔ Sintetizar os reflexos ERM adquiridos numa postura profissional duradoura"],
};

// s2 (EPIRB, SART & GMDSS) competencies list — second Safety module wired
// onto Foundation Exams in the same batch, validated 2026-09-04. Themes:
// recognizing a true distress emergency (vs. a degraded-but-manageable
// situation), choosing the right distress system/activation mode,
// preparing & maintaining equipment before the emergency, executing
// activation under pressure, synthesis into the MAP Safety Mindset
// (Recognize, Choose, Prepare, Activate, Learn) (L1-L5).
const COMPETENCIES_S2:any = {
  fr:["✔ Reconnaître le moment où une situation dégradée devient une véritable détresse","✔ Choisir le bon système de détresse et le bon mode d'activation selon la situation","✔ Préparer et entretenir l'équipement de détresse avant l'urgence","✔ Exécuter correctement les gestes d'activation sous pression","✔ Appliquer une mentalité de sécurité intégrée (Recognize, Choose, Prepare, Activate, Learn)"],
  en:["✔ Recognize the moment a degraded situation becomes a true distress emergency","✔ Choose the right distress system and activation mode for the situation","✔ Prepare and maintain distress equipment before the emergency","✔ Correctly execute activation actions under pressure","✔ Apply an integrated safety mindset (Recognize, Choose, Prepare, Activate, Learn)"],
  es:["✔ Reconocer el momento en que una situación degradada se convierte en una emergencia real","✔ Elegir el sistema de socorro y el modo de activación adecuados según la situación","✔ Preparar y mantener el equipo de socorro antes de la emergencia","✔ Ejecutar correctamente los gestos de activación bajo presión","✔ Aplicar una mentalidad de seguridad integrada (Recognize, Choose, Prepare, Activate, Learn)"],
  pt:["✔ Reconhecer o momento em que uma situação degradada se torna uma emergência real","✔ Escolher o sistema de socorro e o modo de ativação certos conforme a situação","✔ Preparar e manter o equipamento de socorro antes da emergência","✔ Executar corretamente os gestos de ativação sob pressão","✔ Aplicar uma mentalidade de segurança integrada (Recognize, Choose, Prepare, Activate, Learn)"],
};

// s3 (STCW First Aid) competencies list — third Safety module wired onto
// Foundation Exams, batch 2 of the Safety wiring effort, validated
// 2026-09-04. Themes: scene safety & primary survey (DRABC), CPR/AED,
// bleeding & shock control, fractures & burns, secondary assessment &
// monitoring, medical emergencies at sea, ship's medicine chest & radio
// medical advice, MEDEVAC preparation & handover (L1-L8).
const COMPETENCIES_S3:any = {
  fr:["✔ Sécuriser une scène d'urgence et réaliser un bilan primaire structuré (DRABC)","✔ Pratiquer la RCP et utiliser un défibrillateur (DEA) en cas d'arrêt cardiaque","✔ Contrôler une hémorragie et reconnaître les signes de choc","✔ Immobiliser une fracture et traiter une brûlure selon son degré","✔ Réaliser un bilan secondaire et surveiller l'état d'un patient dans la durée","✔ Reconnaître et gérer les urgences médicales courantes à bord","✔ Utiliser la pharmacie de bord et solliciter un avis médical radio de manière structurée","✔ Préparer un blessé pour une évacuation médicale (MEDEVAC) et assurer une transmission claire"],
  en:["✔ Secure an emergency scene and conduct a structured primary survey (DRABC)","✔ Perform CPR and use an AED in a cardiac arrest situation","✔ Control bleeding and recognize the signs of shock","✔ Immobilize a fracture and treat a burn according to its degree","✔ Conduct a secondary survey and monitor a patient's condition over time","✔ Recognize and manage common medical emergencies at sea","✔ Use the ship's medicine chest and request radio medical advice in a structured way","✔ Prepare a casualty for medical evacuation (MEDEVAC) and ensure a clear handover"],
  es:["✔ Asegurar una escena de emergencia y realizar una valoración primaria estructurada (DRABC)","✔ Practicar la RCP y usar un desfibrilador (DEA) en caso de paro cardíaco","✔ Controlar una hemorragia y reconocer los signos de shock","✔ Inmovilizar una fractura y tratar una quemadura según su grado","✔ Realizar una valoración secundaria y monitorizar al paciente en el tiempo","✔ Reconocer y gestionar las emergencias médicas frecuentes a bordo","✔ Usar el botiquín del buque y solicitar asesoramiento médico por radio de forma estructurada","✔ Preparar a un herido para una evacuación médica (MEDEVAC) y asegurar una entrega clara"],
  pt:["✔ Garantir a segurança de uma cena de emergência e realizar uma avaliação primária estruturada (DRABC)","✔ Praticar RCP e usar um desfibrilhador (DEA) em caso de paragem cardíaca","✔ Controlar uma hemorragia e reconhecer os sinais de choque","✔ Imobilizar uma fratura e tratar uma queimadura conforme o seu grau","✔ Realizar uma avaliação secundária e monitorizar o estado do doente ao longo do tempo","✔ Reconhecer e gerir as emergências médicas comuns no mar","✔ Usar a farmácia de bordo e solicitar aconselhamento médico por rádio de forma estruturada","✔ Preparar um sinistrado para uma evacuação médica (MEDEVAC) e garantir uma transmissão clara"],
};

// s4 (Firefighting) competencies list — fourth Safety module wired onto
// Foundation Exams in the same batch, validated 2026-09-04. Themes: fire
// behaviour & early recognition, choosing the right firefighting strategy,
// portable extinguishers, fixed firefighting systems, fire containment &
// boundary cooling, PPE/SCBA firefighter survival, fire command/team
// coordination & damage control (L1-L7).
const COMPETENCIES_S4:any = {
  fr:["✔ Reconnaître le comportement du feu et détecter un début d'incendie précocement","✔ Choisir la stratégie de lutte contre l'incendie adaptée à la situation","✔ Utiliser correctement les extincteurs portatifs selon la classe de feu","✔ Mettre en œuvre les systèmes fixes de lutte contre l'incendie","✔ Contenir un incendie et protéger les limites (boundary cooling)","✔ Utiliser correctement les EPI et l'ARI pour assurer sa propre survie","✔ Coordonner une équipe incendie et le contrôle des avaries en situation de commandement"],
  en:["✔ Recognize fire behaviour and detect an incipient fire early","✔ Choose the firefighting strategy appropriate to the situation","✔ Correctly use portable extinguishers according to fire class","✔ Operate fixed firefighting systems","✔ Contain a fire and protect its boundaries (boundary cooling)","✔ Correctly use PPE and SCBA to ensure personal survival","✔ Coordinate a fire team and damage control in a command role"],
  es:["✔ Reconocer el comportamiento del fuego y detectar un incendio incipiente a tiempo","✔ Elegir la estrategia de lucha contra incendios adecuada a la situación","✔ Usar correctamente los extintores portátiles según la clase de fuego","✔ Operar los sistemas fijos de lucha contra incendios","✔ Contener un incendio y proteger sus límites (boundary cooling)","✔ Usar correctamente el EPI y el ERA para garantizar la propia supervivencia","✔ Coordinar un equipo de incendios y el control de averías en un rol de mando"],
  pt:["✔ Reconhecer o comportamento do fogo e detetar um incêndio incipiente cedo","✔ Escolher a estratégia de combate a incêndio adequada à situação","✔ Usar corretamente os extintores portáteis conforme a classe de fogo","✔ Operar os sistemas fixos de combate a incêndio","✔ Conter um incêndio e proteger os seus limites (boundary cooling)","✔ Usar corretamente o EPI e o ARA para garantir a própria sobrevivência","✔ Coordenar uma equipa de incêndio e o controlo de avarias num papel de comando"],
};

// s5 (Lifeboats, Liferafts & HRU) competencies list — fifth Safety module
// wired onto Foundation Exams, batch 3 (final Safety batch) of the wiring
// effort, validated 2026-09-04. Themes: lifeboat launching & handling,
// liferaft deployment & boarding, HRU & survival equipment, abandon ship
// & survival leadership (L1-L4).
const COMPETENCIES_S5:any = {
  fr:["✔ Mettre à l'eau et manœuvrer une embarcation de sauvetage en sécurité","✔ Déployer un radeau de survie et organiser l'embarquement de l'équipage","✔ Utiliser correctement le largueur hydrostatique (HRU) et le matériel de survie associé","✔ Diriger l'abandon du navire et exercer un leadership de survie efficace"],
  en:["✔ Launch and handle a lifeboat safely","✔ Deploy a liferaft and organize crew boarding","✔ Correctly use the hydrostatic release unit (HRU) and associated survival equipment","✔ Lead an abandon-ship operation and exercise effective survival leadership"],
  es:["✔ Botar y maniobrar un bote salvavidas con seguridad","✔ Desplegar una balsa salvavidas y organizar el embarque de la tripulación","✔ Usar correctamente el liberador hidrostático (HRU) y el equipo de supervivencia asociado","✔ Dirigir el abandono del buque y ejercer un liderazgo de supervivencia eficaz"],
  pt:["✔ Lançar e manobrar um bote salva-vidas com segurança","✔ Implantar uma balsa salva-vidas e organizar o embarque da tripulação","✔ Usar corretamente o libertador hidrostático (HRU) e o equipamento de sobrevivência associado","✔ Liderar o abandono do navio e exercer uma liderança de sobrevivência eficaz"],
};

// s6 (Ship Safety Operations & Emergency Readiness) competencies list —
// sixth and final Safety module wired onto Foundation Exams, closing out
// batch 3, validated 2026-09-04. Themes: safety patrol & hazard
// recognition, common shipboard emergencies & immediate actions, PPE/safe
// behaviour & human factors, emergency reporting & initial response,
// permit to work & risk assessment, safety culture & professional
// responsibility (L1-L6).
const COMPETENCIES_S6:any = {
  fr:["✔ Réaliser une ronde de sécurité et reconnaître les dangers à bord","✔ Réagir immédiatement face aux urgences courantes du navire","✔ Appliquer les EPI et les comportements sécuritaires liés au facteur humain","✔ Signaler une urgence et engager la réponse initiale appropriée","✔ Appliquer un permis de travail et réaliser une évaluation des risques","✔ Adopter une culture de sécurité et une responsabilité professionnelle constante"],
  en:["✔ Conduct a safety patrol and recognize hazards on board","✔ Respond immediately to common shipboard emergencies","✔ Apply PPE and safe behaviour linked to human factors","✔ Report an emergency and initiate the appropriate first response","✔ Apply a permit to work and conduct a risk assessment","✔ Uphold a safety culture and consistent professional responsibility"],
  es:["✔ Realizar una ronda de seguridad y reconocer los peligros a bordo","✔ Responder de inmediato ante las emergencias habituales del buque","✔ Aplicar el EPI y los comportamientos seguros relacionados con el factor humano","✔ Reportar una emergencia e iniciar la respuesta inicial adecuada","✔ Aplicar un permiso de trabajo y realizar una evaluación de riesgos","✔ Mantener una cultura de seguridad y una responsabilidad profesional constante"],
  pt:["✔ Realizar uma ronda de segurança e reconhecer os perigos a bordo","✔ Responder imediatamente às emergências comuns do navio","✔ Aplicar o EPI e os comportamentos seguros ligados ao fator humano","✔ Reportar uma emergência e iniciar a resposta inicial adequada","✔ Aplicar uma autorização de trabalho e realizar uma avaliação de riscos","✔ Manter uma cultura de segurança e uma responsabilidade profissional constante"],
};

// 13th exam ("Foundation Summary") competencies list — validated separately
// 2026-09-05, per standing doctrine (content approval kept distinct from the
// engine/UI wiring approval). Unlike the 12 per-module lists, stays at the
// synthesis/prioritization level (one bullet per theme + a closing synthesis
// line) rather than restating domain facts already claimed by those 12
// modules' own competencies lists.
const COMPETENCIES_FOUNDATION_SUMMARY:any = {
  fr:["✔ Prioriser correctement face à des risques combinés de navigation, météo et stabilité","✔ Séquencer les actions immédiates face à une avarie structurelle et sa réponse procédurale","✔ Concilier action opérationnelle d'urgence et obligations de signalement réglementaire","✔ Coordonner les premiers secours avec une assistance médicale externe","✔ Exercer un jugement et un leadership fiables lors d'un abandon de navire sous conditions dégradées","✔ Combiner connaissance des règles et rigueur de communication en visibilité réduite","✔ Synthétiser les compétences des 12 modules Foundation Deck et Safety en une prise de décision transversale unique"],
  en:["✔ Prioritize correctly when navigation, weather, and stability risks compound","✔ Sequence immediate actions across a structural emergency and its procedural response","✔ Balance urgent operational action against regulatory reporting obligations","✔ Coordinate first aid with external medical assistance","✔ Exercise reliable judgment and leadership during an abandon-ship situation under degraded conditions","✔ Combine rule knowledge with communication discipline under reduced visibility","✔ Synthesize the 12 Foundation Deck and Safety modules into a single cross-domain decision-making competency"],
  es:["✔ Priorizar correctamente ante riesgos combinados de navegación, meteorología y estabilidad","✔ Secuenciar las acciones inmediatas ante una avería estructural y su respuesta procedimental","✔ Conciliar la acción operativa urgente con las obligaciones de notificación reglamentaria","✔ Coordinar los primeros auxilios con una asistencia médica externa","✔ Ejercer un juicio y un liderazgo fiables durante un abandono del buque en condiciones degradadas","✔ Combinar el conocimiento de las reglas con la disciplina de comunicación en visibilidad reducida","✔ Sintetizar los 12 módulos Foundation de Deck y Safety en una única competencia de toma de decisiones transversal"],
  pt:["✔ Priorizar corretamente perante riscos combinados de navegação, meteorologia e estabilidade","✔ Sequenciar as ações imediatas perante uma avaria estrutural e a sua resposta processual","✔ Conciliar a ação operacional urgente com as obrigações de notificação regulamentar","✔ Coordenar os primeiros socorros com uma assistência médica externa","✔ Exercer um julgamento e uma liderança fiáveis durante um abandono do navio em condições degradadas","✔ Combinar o conhecimento das regras com a disciplina de comunicação em visibilidade reduzida","✔ Sintetizar os 12 módulos Foundation de Deck e Safety numa única competência de tomada de decisão transversal"],
};

// ── Shared exam engine wiring (2026-09-02 refactor) ─────────────────────
// Extracted from NavigationLessonsPage (d1's original, one-off implementation)
// into a moduleId-parametrized hook + presentational components so a second
// (and future) module's exam UI reuses the exact same logic — no duplicated
// state machine to drift out of sync. See project memory,
// project_exams_system_architecture.md, for the doctrine this implements.
function useModuleExam({ moduleId, lang, currentRankId, targetRankId }:{moduleId:string;lang:string;currentRankId?:string;targetRankId?:string}) {
  const [moduleAverage, setModuleAverage] = useState<{averagePercent:number|null;attemptedLessons:number;totalLessons:number}|null>(null);
  const [latestFoundationAttempt, setLatestFoundationAttempt] = useState<any>(null);
  const [latestRemedialAttempt, setLatestRemedialAttempt] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      getModuleAverageScore(user.id, moduleId).then(setModuleAverage);
      getLatestExamAttempt(user.id, moduleId, "foundation").then(setLatestFoundationAttempt);
      getLatestExamAttempt(user.id, moduleId, "foundation_remedial").then(setLatestRemedialAttempt);
    });
  }, [moduleId]);

  const [examView, setExamView] = useState<"list"|"running"|"result">("list");
  const [examMode, setExamMode] = useState<"exam"|"remedial">("exam");
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [examResult, setExamResult] = useState<{score:number;maxScore:number;passed:boolean;answers:{questionId:string;lessonId:string;wasCorrect:boolean;selectedIndex:number}[]}|null>(null);
  const [examStarting, setExamStarting] = useState(false);
  const [examBlockedUntil, setExamBlockedUntil] = useState<Date|null>(null);
  const [examError, setExamError] = useState<string|null>(null);
  const [remedialStarting, setRemedialStarting] = useState(false);
  const [remedialBlockedUntil, setRemedialBlockedUntil] = useState<Date|null>(null);
  const [remedialError, setRemedialError] = useState<string|null>(null);

  const startExam = async () => {
    setExamStarting(true);
    setExamError(null);
    setExamBlockedUntil(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setExamStarting(false); return; }
    const latestAttempt = await getLatestExamAttempt(user.id, moduleId, "foundation");
    const cooldown = canAttemptExam(latestAttempt);
    if (!cooldown.allowed) {
      setExamBlockedUntil(cooldown.nextAvailableAt);
      setExamStarting(false);
      return;
    }
    const eligibleLessonIds = getExamEligibleLessonIds(moduleId, currentRankId, targetRankId);
    const questions = drawExamQuestions(eligibleLessonIds, lang, targetRankId);
    if (questions.length === 0) {
      setExamError("no_questions");
      setExamStarting(false);
      return;
    }
    setExamMode("exam");
    setExamQuestions(questions);
    setExamView("running");
    setExamStarting(false);
  };

  const startRemedial = async () => {
    setRemedialStarting(true);
    setRemedialError(null);
    setRemedialBlockedUntil(null);
    if (!latestFoundationAttempt) { setRemedialStarting(false); return; }
    const cooldown = canAttemptRemedial(latestFoundationAttempt, latestRemedialAttempt);
    if (!cooldown.eligible || !cooldown.allowed) {
      setRemedialBlockedUntil(cooldown.nextAvailableAt);
      setRemedialStarting(false);
      return;
    }
    const wrongAnswers = await getWrongAnswersForAttempt(latestFoundationAttempt.id);
    const questions = drawRemedialQuestions(wrongAnswers, lang);
    if (questions.length === 0) {
      setRemedialError("no_questions");
      setRemedialStarting(false);
      return;
    }
    setExamMode("remedial");
    setExamQuestions(questions);
    setExamView("running");
    setRemedialStarting(false);
  };

  const finishExam = async (score:number, maxScore:number, answers:{questionId:string;lessonId:string;wasCorrect:boolean;selectedIndex:number}[]) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const category = examMode === "remedial" ? "foundation_remedial" : "foundation";
    const { passed, attemptId } = await recordExamAttempt(user.id, moduleId, category, score, maxScore, answers);
    if (attemptId) {
      const record = { id: attemptId, attempted_at: new Date().toISOString(), passed, score, max_score: maxScore };
      if (examMode === "exam") setLatestFoundationAttempt(record);
      else setLatestRemedialAttempt(record);
    }
    setExamResult({ score, maxScore, passed, answers });
    setExamView("result");
  };

  const backToList = () => {
    setExamView("list");
    setExamMode("exam");
    setExamQuestions([]);
    setExamResult(null);
    setRemedialBlockedUntil(null);
    setRemedialError(null);
  };

  const remaining = moduleAverage ? moduleAverage.totalLessons - moduleAverage.attemptedLessons : null;
  const unlocked = !!moduleAverage && moduleAverage.averagePercent !== null && moduleAverage.averagePercent >= EXAM_PASS_THRESHOLD;
  const showEncouragement = unlocked && remaining !== null && remaining >= 2 && remaining <= 3;
  const showInformative = !!moduleAverage && remaining === 0 && moduleAverage.averagePercent !== null && moduleAverage.averagePercent < EXAM_PASS_THRESHOLD;
  const showUnlockNotice = unlocked && remaining === 0;
  const remedialCooldownNow = canAttemptRemedial(latestFoundationAttempt, latestRemedialAttempt);

  return {
    moduleId, moduleAverage, showEncouragement, showInformative, showUnlockNotice,
    examView, examMode, examQuestions, examResult,
    examStarting, examBlockedUntil, examError, startExam,
    remedialStarting, remedialBlockedUntil, remedialError, startRemedial, remedialCooldownNow,
    finishExam, backToList,
  };
}

// 13th exam ("Foundation Summary") — unlocks once the user has at least one
// "foundation" attempt (not necessarily passed) recorded for each of the 12
// FOUNDATION_MODULE_IDS, confirmed doctrine (attempted, not passed). Reuses
// getLatestExamAttempt/canAttemptExam/recordExamAttempt exactly as-is with a
// new moduleId ("foundation_summary") — no new query shape, no new RLS
// surface (policies are user_id-only). No remedial mode for this exam
// (explicit scope decision, 2026-09-05) — remedialCooldownNow is hardcoded
// to ineligible so ExamResultScreen's existing remedial-offer block simply
// never renders, without needing to touch that shared component's logic.
function useFoundationSummaryExam({ lang }:{lang:string}) {
  const [checked, setChecked] = useState(false);
  const [attemptedCount, setAttemptedCount] = useState(0);
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setChecked(true); return; }
      const results = await Promise.all(
        FOUNDATION_MODULE_IDS.map((mid) => getLatestExamAttempt(user.id, mid, "foundation"))
      );
      setAttemptedCount(results.filter((r) => !!r).length);
      setChecked(true);
    });
  }, []);

  const [examView, setExamView] = useState<"list"|"running"|"result">("list");
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [examResult, setExamResult] = useState<{score:number;maxScore:number;passed:boolean;answers:{questionId:string;lessonId:string;wasCorrect:boolean;selectedIndex:number}[]}|null>(null);
  const [examStarting, setExamStarting] = useState(false);
  const [examBlockedUntil, setExamBlockedUntil] = useState<Date|null>(null);
  const [examError, setExamError] = useState<string|null>(null);

  const startExam = async () => {
    setExamStarting(true);
    setExamError(null);
    setExamBlockedUntil(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setExamStarting(false); return; }
    const latestAttempt = await getLatestExamAttempt(user.id, "foundation_summary", "foundation");
    const cooldown = canAttemptExam(latestAttempt);
    if (!cooldown.allowed) {
      setExamBlockedUntil(cooldown.nextAvailableAt);
      setExamStarting(false);
      return;
    }
    const questions = shuffle(getSummaryExamQuestions(lang));
    if (questions.length === 0) {
      setExamError("no_questions");
      setExamStarting(false);
      return;
    }
    setExamQuestions(questions);
    setExamView("running");
    setExamStarting(false);
  };

  const finishExam = async (score:number, maxScore:number, answers:{questionId:string;lessonId:string;wasCorrect:boolean;selectedIndex:number}[]) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { passed } = await recordExamAttempt(user.id, "foundation_summary", "foundation", score, maxScore, answers);
    setExamResult({ score, maxScore, passed, answers });
    setExamView("result");
  };

  const backToList = () => {
    setExamView("list");
    setExamQuestions([]);
    setExamResult(null);
  };

  return {
    moduleId: "foundation_summary", examMode: "exam" as const,
    checked, attemptedCount, totalRequired: FOUNDATION_MODULE_IDS.length,
    unlocked: checked && attemptedCount === FOUNDATION_MODULE_IDS.length,
    examView, examQuestions, examResult,
    examStarting, examBlockedUntil, examError, startExam,
    remedialCooldownNow: { eligible: false, allowed: false, nextAvailableAt: null as Date|null },
    finishExam, backToList,
  };
}

// Notifications + exam button + list-view Remedial offer — the "extra bits"
// each module's lessons-list page inserts above its own lesson list. Pure
// presentational, reads only from the hook's return value.
function ExamListExtras({ exam, lang }:{exam:any;lang:string}) {
  const avgT:any = {
    fr:(r:any)=> r.averagePercent===null ? `Moyenne du module : pas encore de données (0/${r.totalLessons} leçons tentées)` : `Moyenne actuelle : ${r.averagePercent}% (${r.attemptedLessons}/${r.totalLessons} leçons tentées)`,
    en:(r:any)=> r.averagePercent===null ? `Module average: no data yet (0/${r.totalLessons} lessons attempted)` : `Current average: ${r.averagePercent}% (${r.attemptedLessons}/${r.totalLessons} lessons attempted)`,
    es:(r:any)=> r.averagePercent===null ? `Promedio del módulo: sin datos aún (0/${r.totalLessons} lecciones intentadas)` : `Promedio actual: ${r.averagePercent}% (${r.attemptedLessons}/${r.totalLessons} lecciones intentadas)`,
    pt:(r:any)=> r.averagePercent===null ? `Média do módulo: sem dados ainda (0/${r.totalLessons} lições tentadas)` : `Média atual: ${r.averagePercent}% (${r.attemptedLessons}/${r.totalLessons} lições tentadas)`,
  };
  const notifT:any = {
    fr:{encouragement:"💡 Tu es proche de débloquer ton examen sur ce module !",informative:`ℹ️ Il te faut au moins ${EXAM_PASS_THRESHOLD}% de moyenne sur ce module pour débloquer l'examen.`,unlock:"🔓 Ton examen sur ce module est maintenant disponible !"},
    en:{encouragement:"💡 You're close to unlocking the exam for this module!",informative:`ℹ️ You need at least ${EXAM_PASS_THRESHOLD}% average on this module to unlock the exam.`,unlock:"🔓 Your exam for this module is now available!"},
    es:{encouragement:"💡 ¡Estás cerca de desbloquear el examen de este módulo!",informative:`ℹ️ Necesitas al menos ${EXAM_PASS_THRESHOLD}% de promedio en este módulo para desbloquear el examen.`,unlock:"🔓 ¡Tu examen de este módulo ya está disponible!"},
    pt:{encouragement:"💡 Estás perto de desbloquear o exame deste módulo!",informative:`ℹ️ Precisas de pelo menos ${EXAM_PASS_THRESHOLD}% de média neste módulo para desbloquear o exame.`,unlock:"🔓 O teu exame deste módulo já está disponível!"},
  };
  const NT = notifT[lang] || notifT.fr;
  const EXAM_START_T:any = {
    fr:{examBtn:"📝 PASSER L'EXAMEN",starting:"Préparation de l'examen…",cooldown:(d:Date)=>`Tu as déjà tenté cet examen récemment. Prochain essai disponible le ${d.toLocaleDateString(lang)}.`,noQuestions:"Aucune question disponible pour ta trajectoire actuelle sur ce module."},
    en:{examBtn:"📝 TAKE THE EXAM",starting:"Preparing the exam…",cooldown:(d:Date)=>`You already attempted this exam recently. Next attempt available on ${d.toLocaleDateString(lang)}.`,noQuestions:"No questions available for your current trajectory on this module."},
    es:{examBtn:"📝 HACER EL EXAMEN",starting:"Preparando el examen…",cooldown:(d:Date)=>`Ya intentaste este examen recientemente. Próximo intento disponible el ${d.toLocaleDateString(lang)}.`,noQuestions:"No hay preguntas disponibles para tu trayectoria actual en este módulo."},
    pt:{examBtn:"📝 FAZER O EXAME",starting:"A preparar o exame…",cooldown:(d:Date)=>`Já tentaste este exame recentemente. Próxima tentativa disponível em ${d.toLocaleDateString(lang)}.`,noQuestions:"Não há perguntas disponíveis para a tua trajetória atual neste módulo."},
  };
  const ST = EXAM_START_T[lang] || EXAM_START_T.fr;
  const RT = EXAM_RESULT_T[lang] || EXAM_RESULT_T.fr;
  return (
    <>
      {exam.moduleAverage && (
        <div style={{fontSize:12,fontWeight:700,color:"#c9922a",background:"rgba(201,146,42,0.1)",border:"1px solid rgba(201,146,42,0.35)",borderRadius:10,padding:"10px 12px",marginBottom:14}}>
          📊 {(avgT[lang] || avgT.fr)(exam.moduleAverage)}
        </div>
      )}
      {exam.showEncouragement && (
        <div style={{fontSize:12,fontWeight:600,color:"#4da6ff",background:"rgba(26,111,212,0.1)",border:"1px solid rgba(77,166,255,0.3)",borderRadius:10,padding:"10px 12px",marginBottom:14}}>
          {NT.encouragement}
        </div>
      )}
      {exam.showInformative && (
        <div style={{fontSize:12,fontWeight:600,color:"rgba(240,244,255,0.75)",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 12px",marginBottom:14}}>
          {NT.informative}
        </div>
      )}
      {exam.showUnlockNotice && (
        <div style={{fontSize:12,fontWeight:700,color:"#1e8a4a",background:"rgba(30,138,74,0.12)",border:"1px solid rgba(30,138,74,0.35)",borderRadius:10,padding:"10px 12px",marginBottom:14}}>
          {NT.unlock}
        </div>
      )}
      {exam.showUnlockNotice && (
        <div style={{marginBottom:16}}>
          <button onClick={exam.startExam} disabled={exam.examStarting} style={{
            width:"100%",padding:"14px 0",border:"none",borderRadius:14,
            background:"linear-gradient(135deg,#1a6fd4,#c9922a)",
            fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,
            color:"#fff",cursor:exam.examStarting?"default":"pointer",opacity:exam.examStarting?0.6:1,
          }}>
            {exam.examStarting ? ST.starting : ST.examBtn}
          </button>
          {exam.examBlockedUntil && (
            <div style={{fontSize:11,color:"#c0392b",marginTop:8,textAlign:"center"}}>{ST.cooldown(exam.examBlockedUntil)}</div>
          )}
          {exam.examError === "no_questions" && (
            <div style={{fontSize:11,color:"#c0392b",marginTop:8,textAlign:"center"}}>{ST.noQuestions}</div>
          )}
        </div>
      )}
      {exam.remedialCooldownNow.eligible && (
        <div style={{marginBottom:16,background:"rgba(201,146,42,0.08)",border:"1px solid rgba(201,146,42,0.3)",borderRadius:14,padding:14}}>
          <div style={{fontSize:12,fontWeight:600,marginBottom:10,lineHeight:1.5}}>{RT.remedialTitleGeneric}</div>
          <button onClick={exam.startRemedial} disabled={exam.remedialStarting} style={{
            width:"100%",padding:"12px 0",border:"none",borderRadius:12,
            background:"linear-gradient(135deg,#c9922a,#1a6fd4)",
            fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:1.5,
            color:"#fff",cursor:exam.remedialStarting?"default":"pointer",opacity:exam.remedialStarting?0.6:1,
          }}>
            {exam.remedialStarting ? RT.remedialStarting : RT.remedialBtn}
          </button>
          {exam.remedialBlockedUntil && <div style={{fontSize:11,color:"#c0392b",marginTop:8,textAlign:"center"}}>{RT.remedialCooldown(exam.remedialBlockedUntil)}</div>}
          {exam.remedialError === "no_questions" && <div style={{fontSize:11,color:"#c0392b",marginTop:8,textAlign:"center"}}>{RT.remedialNoQuestions}</div>}
        </div>
      )}
    </>
  );
}

function ExamRunningScreen({ exam, lang, title, backLabel }:{exam:any;lang:string;title:string;backLabel:string}) {
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={exam.backToList} title={title} backLabel={backLabel}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ModuleExamComp lang={lang} questions={exam.examQuestions} onFinish={exam.finishExam}/>
      </div>
    </div>
  );
}

function ExamResultScreen({ exam, lang, title, backLabel, onPick, competencies }:{exam:any;lang:string;title:string;backLabel:string;onPick:(lid:string)=>void;competencies:any}) {
  const { examResult, examMode, examQuestions } = exam;
  if (!examResult) return null;
  const ET = EXAM_UI_T[lang] || EXAM_UI_T.fr;
  const RT = EXAM_RESULT_T[lang] || EXAM_RESULT_T.fr;
  const wrongAnswers = examResult.answers.filter((a:any)=>!a.wasCorrect);
  const showRemedialOffer = examMode === "exam" && !examResult.passed && exam.remedialCooldownNow.eligible;
  const resultLabel = examMode === "remedial"
    ? (examResult.passed ? RT.remedialPassed : RT.remedialFailed)
    : (examResult.passed ? ET.passed : ET.failed);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={exam.backToList} title={title} backLabel={backLabel}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:52,marginBottom:8}}>{examResult.passed ? "🏆" : "📚"}</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,marginBottom:4}}>{examResult.score}/{examResult.maxScore}</div>
          <div style={{fontSize:13,fontWeight:700,color:examResult.passed?"#1e8a4a":"#c0392b"}}>{resultLabel}</div>
        </div>

        {examResult.passed && (
          <div style={{background:"rgba(30,138,74,0.08)",border:"1px solid rgba(30,138,74,0.3)",borderRadius:14,padding:14,marginBottom:16}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:2,color:"#1e8a4a",marginBottom:8}}>{RT.competenciesHeader}</div>
            {(competencies[lang] || competencies.fr).map((c:string,i:number)=>(
              <div key={i} style={{fontSize:12,marginBottom:6,lineHeight:1.5}}>{c}</div>
            ))}
          </div>
        )}

        {showRemedialOffer && (
          <div style={{background:"rgba(201,146,42,0.08)",border:"1px solid rgba(201,146,42,0.3)",borderRadius:14,padding:14,marginBottom:16}}>
            <div style={{fontSize:12,fontWeight:600,marginBottom:10,lineHeight:1.5}}>{RT.remedialTitleWithCount(wrongAnswers.length)}</div>
            <button onClick={exam.startRemedial} disabled={exam.remedialStarting} style={{
              width:"100%",padding:"12px 0",border:"none",borderRadius:12,
              background:"linear-gradient(135deg,#c9922a,#1a6fd4)",
              fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:1.5,
              color:"#fff",cursor:exam.remedialStarting?"default":"pointer",opacity:exam.remedialStarting?0.6:1,
            }}>
              {exam.remedialStarting ? RT.remedialStarting : RT.remedialBtn}
            </button>
            {exam.remedialBlockedUntil && <div style={{fontSize:11,color:"#c0392b",marginTop:8,textAlign:"center"}}>{RT.remedialCooldown(exam.remedialBlockedUntil)}</div>}
            {exam.remedialError === "no_questions" && <div style={{fontSize:11,color:"#c0392b",marginTop:8,textAlign:"center"}}>{RT.remedialNoQuestions}</div>}
          </div>
        )}

        <div style={{marginBottom:16}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:2,color:"#c9922a",marginBottom:10}}>{RT.reviewHeader}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {examResult.answers.map((a:any)=>{
              const q = examQuestions.find((eq:any)=>eq.questionId===a.questionId);
              if (!q) return null;
              return (
                <div key={a.questionId} style={{background:"rgba(13,31,60,0.85)",border:`1px solid ${a.wasCorrect?"#1e8a4a44":"#c0392b44"}`,borderRadius:12,padding:12}}>
                  <div style={{fontSize:12,fontWeight:700,marginBottom:8,lineHeight:1.4}}>{a.wasCorrect?"✓":"✗"} {q.q}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:8}}>
                    {q.opts.map((opt:string,oi:number)=>{
                      let color="rgba(240,244,255,0.55)", weight:any=400, prefix="•";
                      if (oi===q.correct) { color="#1e8a4a"; weight=700; prefix="✓"; }
                      else if (oi===a.selectedIndex) { color="#c0392b"; weight=700; prefix="✗"; }
                      return <div key={oi} style={{fontSize:11,color,fontWeight:weight}}>{prefix} {opt}</div>;
                    })}
                  </div>
                  <div style={{fontSize:11,color:"rgba(240,244,255,0.5)",lineHeight:1.5,marginBottom:a.wasCorrect?0:8}}>{q.expl}</div>
                  {!a.wasCorrect && exam.moduleId !== "foundation_summary" && (
                    <button onClick={()=>onPick(a.lessonId.slice(a.lessonId.indexOf("-")+1))} style={{fontSize:11,color:"#4da6ff",background:"none",border:"none",cursor:"pointer",padding:0}}>
                      {RT.reviewLessonLink}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={exam.backToList} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#1a6fd4,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:"#fff",cursor:"pointer"}}>
          {ET.back}
        </button>

        <div style={{marginTop:20,textAlign:"center"}}>
          <div style={{fontSize:10,letterSpacing:2,color:"rgba(240,244,255,0.35)",fontFamily:"'Cinzel',serif"}}>
            {RT.signature}
          </div>
          <div style={{fontSize:9,color:"rgba(240,244,255,0.25)",lineHeight:1.5,marginTop:6,maxWidth:340,marginLeft:"auto",marginRight:"auto"}}>
            {RT.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationLessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "d1", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_D1}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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
function IMLLessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "d2", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_D2}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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

function SBLessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "d3", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_D3}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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

function SMCPLessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "d4", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_D4}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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

function SeamanshipLessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "d6", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_D6}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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
function MeteorologyLessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "d7", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_D7}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any, idx:number)=>{
            const isPlayable = playable.has(l.id);
            const isDone = completedLessons.includes(`d7-${l.id}`);
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
function S1LessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "s1", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_S1}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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
function S1ELessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
  // Engine-specific variant replacing s1 in an Engine learner's Safety
  // curriculum — see COMPETENCIES_S1E above for the doctrine reference.
  useEffect(() => {
    if (autoPick) {
      onPick(autoPick);
      onAutoPickConsumed?.();
    }
  }, [autoPick]);
  const exam = useModuleExam({ moduleId: "s1e", lang, currentRankId, targetRankId });
  if (autoPick) return <AutoPickTransition/>;
  const t = NAV_T[lang] || NAV_T.fr;
  const mod:any = (ALL_MODULES as any).safety.find((m:any)=>m.id==="s1e");
  const title = mod?.title?.[lang] || mod?.title?.fr || "Engine Room Resource Management";
  const labels:any = {
    fr:{header:"Leçons",available:"Disponible",soon:"Bientôt",done:"Terminé ✓"},
    en:{header:"Lessons",available:"Available",soon:"Coming soon",done:"Completed ✓"},
    es:{header:"Lecciones",available:"Disponible",soon:"Próximamente",done:"Completado ✓"},
    pt:{header:"Lições",available:"Disponível",soon:"Em breve",done:"Concluído ✓"},
  };
  const L = labels[lang] || labels.fr;
  const lessons = mod?.lessons || [];
  const playable = new Set(["l1","l2","l3","l4","l5","l6"]);

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_S1E}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9922a",marginBottom:12}}>{L.header}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lessons.map((l:any,idx:number)=>{
            const isPlayable=playable.has(l.id);
            const isDone=completedLessons.includes(`s1e-${l.id}`);
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
function S2LessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "s2", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_S2}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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
function S3LessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "s3", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_S3}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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
function S4LessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "s4", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_S4}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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
function S5LessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "s5", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_S5}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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
  function S6LessonsPage({ lang, onBack, onPick, completedLessons, currentRankId, targetRankId, autoPick, onAutoPickConsumed }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[];currentRankId?:string;targetRankId?:string;autoPick?:string|null;onAutoPickConsumed?:()=>void}) {
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
  const exam = useModuleExam({ moduleId: "s6", lang, currentRankId, targetRankId });
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

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={onPick} competencies={COMPETENCIES_S6}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <ExamListExtras exam={exam} lang={lang}/>
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

// 13th exam ("Foundation Summary") — entry screen. Unlike the 12 per-module
// pages above, this has no lesson list to embed the exam button into (the
// exam is cross-domain, not tied to one module's lessons) — hence a
// standalone page, entered from a new Dashboard banner rather than from
// inside a module's own lesson list. Reuses ExamRunningScreen/
// ExamResultScreen exactly as every other module does — same signature,
// same inherited "MAP — powered by Independencia" footer.
function FoundationSummaryPage({ lang, onBack }:{lang:string;onBack:()=>void}) {
  const exam = useFoundationSummaryExam({ lang });
  const t = NAV_T[lang] || NAV_T.fr;
  const titleT:any = {
    fr:"13e Examen — Foundation Summary", en:"13th Exam — Foundation Summary",
    es:"13.º Examen — Foundation Summary", pt:"13.º Exame — Foundation Summary",
  };
  const title = titleT[lang] || titleT.fr;

  if (exam.examView === "running") return <ExamRunningScreen exam={exam} lang={lang} title={title} backLabel={t.back}/>;
  if (exam.examView === "result") return <ExamResultScreen exam={exam} lang={lang} title={title} backLabel={t.back} onPick={()=>{}} competencies={COMPETENCIES_FOUNDATION_SUMMARY}/>;

  const L:any = {
    fr:{
      intro:"Un examen transversal combinant navigation, sécurité, et prise de décision sous pression — 20 questions, 6 scénarios, à travers les 12 modules Foundation.",
      progress:(n:number)=>`Progression : ${n}/${FOUNDATION_MODULE_IDS.length} modules Foundation tentés`,
      lockedHint:"Débloqué dès que tu as tenté l'examen Foundation de chacun des 12 modules Deck et Safety — la réussite n'est pas requise, seulement la tentative.",
      startBtn:"📝 COMMENCER L'EXAMEN", starting:"Préparation de l'examen…",
      cooldown:(d:Date)=>`Tu as déjà tenté cet examen récemment. Prochain essai disponible le ${d.toLocaleDateString(lang)}.`,
      noQuestions:"Aucune question disponible pour le moment.",
    },
    en:{
      intro:"A cross-domain exam combining navigation, safety, and decision-making under pressure — 20 questions, 6 scenarios, spanning all 12 Foundation modules.",
      progress:(n:number)=>`Progress: ${n}/${FOUNDATION_MODULE_IDS.length} Foundation modules attempted`,
      lockedHint:"Unlocks once you've attempted the Foundation exam for each of the 12 Deck and Safety modules — passing is not required, only the attempt.",
      startBtn:"📝 START THE EXAM", starting:"Preparing the exam…",
      cooldown:(d:Date)=>`You already attempted this exam recently. Next attempt available on ${d.toLocaleDateString(lang)}.`,
      noQuestions:"No questions available at the moment.",
    },
    es:{
      intro:"Un examen transversal que combina navegación, seguridad y toma de decisiones bajo presión — 20 preguntas, 6 escenarios, a través de los 12 módulos Foundation.",
      progress:(n:number)=>`Progreso: ${n}/${FOUNDATION_MODULE_IDS.length} módulos Foundation intentados`,
      lockedHint:"Se desbloquea en cuanto hayas intentado el examen Foundation de cada uno de los 12 módulos Deck y Safety — no es necesario aprobar, solo intentarlo.",
      startBtn:"📝 EMPEZAR EL EXAMEN", starting:"Preparando el examen…",
      cooldown:(d:Date)=>`Ya intentaste este examen recientemente. Próximo intento disponible el ${d.toLocaleDateString(lang)}.`,
      noQuestions:"No hay preguntas disponibles por el momento.",
    },
    pt:{
      intro:"Um exame transversal que combina navegação, segurança e tomada de decisão sob pressão — 20 perguntas, 6 cenários, ao longo dos 12 módulos Foundation.",
      progress:(n:number)=>`Progresso: ${n}/${FOUNDATION_MODULE_IDS.length} módulos Foundation tentados`,
      lockedHint:"Desbloqueia assim que tiveres tentado o exame Foundation de cada um dos 12 módulos Deck e Safety — não é preciso passar, apenas tentar.",
      startBtn:"📝 COMEÇAR O EXAME", starting:"A preparar o exame…",
      cooldown:(d:Date)=>`Já tentaste este exame recentemente. Próxima tentativa disponível em ${d.toLocaleDateString(lang)}.`,
      noQuestions:"Não há perguntas disponíveis no momento.",
    },
  };
  const Lt = L[lang] || L.fr;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif",paddingBottom:24}}>
      <TopBar onBack={onBack} title={title} backLabel={t.back}/>
      <div style={{padding:"16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontSize:13,color:"rgba(240,244,255,0.75)",lineHeight:1.7,marginBottom:16}}>{Lt.intro}</div>
        <div style={{fontSize:12,fontWeight:700,color:"#c9922a",background:"rgba(201,146,42,0.1)",border:"1px solid rgba(201,146,42,0.35)",borderRadius:10,padding:"10px 12px",marginBottom:14}}>
          📊 {Lt.progress(exam.attemptedCount)}
        </div>
        {!exam.unlocked && exam.checked && (
          <div style={{fontSize:12,color:"rgba(240,244,255,0.6)",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 12px"}}>
            {Lt.lockedHint}
          </div>
        )}
        {exam.unlocked && (
          <div style={{marginTop:6}}>
            <button onClick={exam.startExam} disabled={exam.examStarting} style={{
              width:"100%",padding:"14px 0",border:"none",borderRadius:14,
              background:"linear-gradient(135deg,#1a6fd4,#c9922a)",
              fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,
              color:"#fff",cursor:exam.examStarting?"default":"pointer",opacity:exam.examStarting?0.6:1,
            }}>
              {exam.examStarting ? Lt.starting : Lt.startBtn}
            </button>
            {exam.examBlockedUntil && (
              <div style={{fontSize:11,color:"#c0392b",marginTop:8,textAlign:"center"}}>{Lt.cooldown(exam.examBlockedUntil)}</div>
            )}
            {exam.examError === "no_questions" && (
              <div style={{fontSize:11,color:"#c0392b",marginTop:8,textAlign:"center"}}>{Lt.noQuestions}</div>
            )}
          </div>
        )}
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
try { localStorage.removeItem("map_lesson_scores"); } catch {}
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
      .from("lesson_scores")
      .select("lesson_id, score, max_score, attempts")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) { console.error("[loadUserProgress] lesson_scores fetch failed:", error); return; }
        const scores: Record<string, { score: number; maxScore: number; attempts: number }> = {};
        (data || []).forEach((row: any) => {
          scores[row.lesson_id] = { score: row.score, maxScore: row.max_score, attempts: row.attempts };
        });
        setLessonScores(scores);
        Object.entries(scores).forEach(([lessonId, entry]) => {
          lessonScoreAttemptsRef.current[lessonId] = entry.attempts;
        });
        try { localStorage.setItem("map_lesson_scores", JSON.stringify(scores)); } catch {}
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
  // Dashboard-banner status only (attemptedCount/unlocked) — the actual exam
  // flow (startExam/finishExam/etc.) runs through its own separate instance
  // of this hook inside FoundationSummaryPage when that page is visited.
  const foundationSummaryStatus = useFoundationSummaryExam({ lang });
const [profile, setProfile] = useState({});
const [completedLessons, setCompletedLessons] = useState<string[]>([]);
// Per-lesson quiz score, keyed by composite lesson id (same id space as
// completedLessons, e.g. "d1-l1"). Separate from completedLessons on purpose:
// that array is a pure done/not-done boolean, this is the score data the
// future Exam Center 70%-unlock threshold will average per module. Sample
// wiring: only module d1 (Navigation & Cartographie) calls saveLessonScore
// today — not yet extended to the rest of the app.
const [lessonScores, setLessonScores] = useState<Record<string, { score: number; maxScore: number; attempts: number }>>({});
// Guards saveLessonScore against a rapid double-fire on the same lesson (double-tap on mobile,
// or a UI click retrying mid-transition) — a plain ref so the lock survives re-renders without
// itself triggering one. 2s comfortably covers the quiz's own 1200ms done-phase transition.
const lastLessonScoreSaveRef = useRef<Record<string, number>>({});
// Tracks the known attempts count per lesson client-side, synchronously. Read-then-increment
// against Supabase (SELECT existing.attempts, then upsert existing+1) was a TOCTOU race: two
// overlapping calls can both read the same "before" value and both write "+1", losing an
// increment... or, as found during verification, some single logical save can still result in
// two upsert round-trips reaching the server. Computing the new value once, synchronously, from
// this ref — instead of from a server round-trip — makes the upsert idempotent: even if the
// network call somehow fires twice, both carry the identical attempts value, so a duplicate
// send just overwrites with the same number instead of double-incrementing.
const lessonScoreAttemptsRef = useRef<Record<string, number>>({});
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
const saveLessonScore = (lessonId: string, score: number, maxScore: number) => {
  const now = Date.now();
  const lastSave = lastLessonScoreSaveRef.current[lessonId] || 0;
  if (now - lastSave < 2000) return;
  lastLessonScoreSaveRef.current[lessonId] = now;

  const newAttempts = (lessonScoreAttemptsRef.current[lessonId] || 0) + 1;
  lessonScoreAttemptsRef.current[lessonId] = newAttempts;
  const entry = { score, maxScore, attempts: newAttempts };

  setLessonScores((prev) => ({ ...prev, [lessonId]: entry }));
  try {
    const stored = JSON.parse(localStorage.getItem("map_lesson_scores") || "{}");
    localStorage.setItem("map_lesson_scores", JSON.stringify({ ...stored, [lessonId]: entry }));
  } catch {}

  supabase.auth.getUser().then(({ data: { user } }) => {
    if (!user) return;
    supabase.from("lesson_scores").upsert({
      user_id: user.id,
      lesson_id: lessonId,
      score,
      max_score: maxScore,
      attempts: newAttempts,
    }, { onConflict: "user_id,lesson_id" }).then(() => {});
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
  // Point 3 correctif (2026-09-01) — contextual "back": every deep-link
  // entry point from Recommended for You (navigateToLesson,
  // navigateToShipCard, navigateToRoleOnBoard) sets this flag; smartBack()
  // is the single place that decides, on the way back out, whether to
  // return to Dashboard (flag true, consumed/cleared here) or to the
  // screen's normal structural parent (flag false — the untouched,
  // pre-existing behavior for manual Browse navigation). Consumption
  // rules, validated explicitly: lessons and Role Onboard consume on the
  // very first back-press on the destination screen (single hop); Ships
  // consumes only at the Ship Card's own back-press, NOT at an individual
  // operation's back-press (which must keep returning to the Ship Card,
  // unchanged, since that's a real parent/child relationship, not the bug).
  const [returnToRecommended, setReturnToRecommended] = useState(false);
  const smartBack = (fallbackPage: string) => () => {
    if (returnToRecommended) {
      setReturnToRecommended(false);
      setPage("dashboard");
    } else {
      setPage(fallbackPage);
    }
  };

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
    setReturnToRecommended(true);
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
    setReturnToRecommended(true);
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
    setReturnToRecommended(true);
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

    // Point 3 correctif (2026-09-01) — hardware/gesture back must respect
    // returnToRecommended identically to the on-screen "Retour" button
    // (smartBack() above, in the same component). Mirrors its exact
    // semantics: if we arrived via Recommended for You, the flag is
    // consumed and this goes straight to "dashboard" instead of the
    // structural fallback; otherwise behavior is byte-identical to before
    // this correctif (same fallback page, same pushState call).
    const popBackTo = (fallbackPage: string) => {
      const target = returnToRecommended ? "dashboard" : fallbackPage;
      if (returnToRecommended) setReturnToRecommended(false);
      try { window.history.pushState({ map: target }, ""); } catch {}
      setPage(target);
    };

    const onPop = (e: PopStateEvent) => {
      const cur = pageRef.current;
      const hasProfile = !!localStorage.getItem("map_status_card");
      if (cur === "dashboard") {
        try { window.history.pushState({ map: cur, guard: Date.now() }, ""); } catch {}
        setShowExitConfirm(true);
        return;
      }
      if (LESSONS.includes(cur)) { popBackTo("nav_lessons"); return; }
      if (ENGINE_LESSONS.includes(cur)) { popBackTo("engine_lessons"); return; }
      if (SB_LESSONS.includes(cur)) { popBackTo("sb_lessons"); return; }
      if (SMCP_LESSONS.includes(cur)) { popBackTo("smcp_lessons"); return; }
      if (SEAMANSHIP_LESSONS.includes(cur)) { popBackTo("seamanship_lessons"); return; }
      if (SHIPCAREER_LESSONS.includes(cur)) { popBackTo("shipcareer_lessons"); return; }
      if (MARPOL_LESSONS.includes(cur)) { popBackTo("marpol_lessons"); return; }
      if (SEEMP_LESSONS.includes(cur)) { popBackTo("seemp_lessons"); return; }
      // Point 3 correctif — role_on_board previously had no hardware-back
      // handling at all here (fell through to the final no-op re-push
      // below, i.e. hardware back silently did nothing on this page).
      // Mirrors RoleOnBoardPage's own backFromRankDetail() exactly: on the
      // rank detail (roleOnBoardSelected set), consume the flag and go to
      // Dashboard if set, otherwise return to the rank list; on the list
      // itself, go to Dashboard.
      if (cur === "role_on_board") {
        if (roleOnBoardSelected) {
          if (returnToRecommended) {
            setReturnToRecommended(false);
            try { window.history.pushState({ map: "dashboard" }, ""); } catch {}
            setPage("dashboard");
          } else {
            setRoleOnBoardSelected(null);
            try { window.history.pushState({ map: "role_on_board" }, ""); } catch {}
          }
        } else {
          try { window.history.pushState({ map: "dashboard" }, ""); } catch {}
          setPage("dashboard");
        }
        return;
      }
      if (["modules","ships","exams","nav_lessons","engine_lessons","marpol_lessons","seemp_lessons","iml_lessons","sb_lessons","smcp_lessons","seamanship_lessons","shipcareer_lessons","admin","admin-login"].includes(cur)) {
        // "ships" already unconditionally goes to dashboard here regardless
        // of internal drill-down depth (pre-existing behavior, unrelated to
        // this correctif, not changed) — only clear a lingering flag so it
        // can't leak into whatever the user does next.
        if (returnToRecommended) setReturnToRecommended(false);
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
  }, [page, returnToRecommended, roleOnBoardSelected]);

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
        "map_admin_grant","map_registrations","map_lesson_scores",
      ].forEach(k => localStorage.removeItem(k));
    } catch {}
    setProfile({});
  setCompletedLessons([]);
  setLessonScores({});
  lessonScoreAttemptsRef.current = {};
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
            foundationSummaryAttemptedCount={foundationSummaryStatus.attemptedCount}
            foundationSummaryTotalRequired={foundationSummaryStatus.totalRequired}
            foundationSummaryUnlocked={foundationSummaryStatus.unlocked}
            onOpenFoundationSummary={() => setPage("foundation_summary")}
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
              else if (m?.id === "s1e") setPage("s1e_lessons");
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
          else if (m?.id === "s1e") setPage("s1e_lessons");
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
          returnToRecommended={returnToRecommended}
          onReturnToRecommendedConsumed={() => setReturnToRecommended(false)}
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
          returnToRecommended={returnToRecommended}
          onReturnToRecommendedConsumed={() => setReturnToRecommended(false)}
        />
      )}
      {page === "nav_lessons" && (
        <NavigationLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          currentRankId={profile.who}
          targetRankId={profile.target}
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
          currentRankId={profile.who}
          targetRankId={profile.target}
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
          currentRankId={profile.who}
          targetRankId={profile.target}
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
          currentRankId={profile.who}
          targetRankId={profile.target}
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
          onBack={smartBack("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l1"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l1"); setPage("lesson_s1_l2"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1-l1", score, maxScore)}
        />
      )}
      {page === "lesson_s1_l2" && (
        <LessonSafetyS1_L2
          lang={lang}
          onBack={smartBack("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l2"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l2"); setPage("lesson_s1_l3"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1-l2", score, maxScore)}
        />
      )}
      {page === "lesson_s1_l3" && (
        <LessonSafetyS1_L3
          lang={lang}
          onBack={smartBack("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l3"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l3"); setPage("lesson_s1_l4"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1-l3", score, maxScore)}
        />
      )}
      {page === "lesson_s1_l4" && (
        <LessonSafetyS1_L4
          lang={lang}
          onBack={smartBack("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l4"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l4"); setPage("lesson_s1_l5"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1-l4", score, maxScore)}
        />
      )}
      {page === "lesson_s1_l5" && (
        <LessonSafetyS1_L5
          lang={lang}
          onBack={smartBack("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l5"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l5"); setPage("lesson_s1_l6"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1-l5", score, maxScore)}
        />
      )}
      {page === "lesson_s1_l6" && (
        <LessonSafetyS1_L6
          lang={lang}
          onBack={smartBack("s1_lessons")}
          onComplete={() => { markLessonCompleted("s1-l6"); setPage("s1_lessons"); }}
          onNext={() => { markLessonCompleted("s1-l6"); setPage("s1_lessons"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1-l6", score, maxScore)}
        />
      )}
      {page === "s1e_lessons" && (
        <S1ELessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          currentRankId={profile.who}
          targetRankId={profile.target}
          autoPick={pendingLessonPick}
          onAutoPickConsumed={() => setPendingLessonPick(null)}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_s1e_l1");
            else if (lid === "l2") setPage("lesson_s1e_l2");
            else if (lid === "l3") setPage("lesson_s1e_l3");
            else if (lid === "l4") setPage("lesson_s1e_l4");
            else if (lid === "l5") setPage("lesson_s1e_l5");
            else if (lid === "l6") setPage("lesson_s1e_l6");
          }}
        />
      )}
      {page === "lesson_s1e_l1" && (
        <LessonSafetyS1E_L1
          lang={lang}
          onBack={smartBack("s1e_lessons")}
          onComplete={() => { markLessonCompleted("s1e-l1"); setPage("s1e_lessons"); }}
          onNext={() => { markLessonCompleted("s1e-l1"); setPage("lesson_s1e_l2"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1e-l1", score, maxScore)}
        />
      )}
      {page === "lesson_s1e_l2" && (
        <LessonSafetyS1E_L2
          lang={lang}
          onBack={smartBack("s1e_lessons")}
          onComplete={() => { markLessonCompleted("s1e-l2"); setPage("s1e_lessons"); }}
          onNext={() => { markLessonCompleted("s1e-l2"); setPage("lesson_s1e_l3"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1e-l2", score, maxScore)}
        />
      )}
      {page === "lesson_s1e_l3" && (
        <LessonSafetyS1E_L3
          lang={lang}
          onBack={smartBack("s1e_lessons")}
          onComplete={() => { markLessonCompleted("s1e-l3"); setPage("s1e_lessons"); }}
          onNext={() => { markLessonCompleted("s1e-l3"); setPage("lesson_s1e_l4"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1e-l3", score, maxScore)}
        />
      )}
      {page === "lesson_s1e_l4" && (
        <LessonSafetyS1E_L4
          lang={lang}
          onBack={smartBack("s1e_lessons")}
          onComplete={() => { markLessonCompleted("s1e-l4"); setPage("s1e_lessons"); }}
          onNext={() => { markLessonCompleted("s1e-l4"); setPage("lesson_s1e_l5"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1e-l4", score, maxScore)}
        />
      )}
      {page === "lesson_s1e_l5" && (
        <LessonSafetyS1E_L5
          lang={lang}
          onBack={smartBack("s1e_lessons")}
          onComplete={() => { markLessonCompleted("s1e-l5"); setPage("s1e_lessons"); }}
          onNext={() => { markLessonCompleted("s1e-l5"); setPage("lesson_s1e_l6"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1e-l5", score, maxScore)}
        />
      )}
      {page === "lesson_s1e_l6" && (
        <LessonSafetyS1E_L6
          lang={lang}
          onBack={smartBack("s1e_lessons")}
          onComplete={() => { markLessonCompleted("s1e-l6"); setPage("s1e_lessons"); }}
          onNext={() => { markLessonCompleted("s1e-l6"); setPage("s1e_lessons"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s1e-l6", score, maxScore)}
        />
      )}
   {page === "s2_lessons" && (
        <S2LessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          currentRankId={profile.who}
          targetRankId={profile.target}
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
          onBack={smartBack("s2_lessons")}
          onComplete={() => { markLessonCompleted("s2-l1"); setPage("s2_lessons"); }}
          onNext={() => { markLessonCompleted("s2-l1"); setPage("lesson_s2_l2"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s2-l1", score, maxScore)}
        />
      )}
      {page === "lesson_s2_l2" && (
        <LessonSafetyS2_L2
          lang={lang}
          onBack={smartBack("s2_lessons")}
          onComplete={() => { markLessonCompleted("s2-l2"); setPage("s2_lessons"); }}
          onNext={() => { markLessonCompleted("s2-l2"); setPage("lesson_s2_l3"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s2-l2", score, maxScore)}
        />
      )}
      {page === "lesson_s2_l3" && (
        <LessonSafetyS2_L3
          lang={lang}
          onBack={smartBack("s2_lessons")}
          onComplete={() => { markLessonCompleted("s2-l3"); setPage("s2_lessons"); }}
          onNext={() => { markLessonCompleted("s2-l3"); setPage("lesson_s2_l4"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s2-l3", score, maxScore)}
        />
      )}
      {page === "lesson_s2_l4" && (
        <LessonSafetyS2_L4
          lang={lang}
          onBack={smartBack("s2_lessons")}
          onComplete={() => { markLessonCompleted("s2-l4"); setPage("s2_lessons"); }}
          onNext={() => { markLessonCompleted("s2-l4"); setPage("lesson_s2_l5"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s2-l4", score, maxScore)}
        />
      )}
      {page === "lesson_s2_l5" && (
        <LessonSafetyS2_L5
          lang={lang}
          onBack={smartBack("s2_lessons")}
          onComplete={() => { markLessonCompleted("s2-l5"); setPage("s2_lessons"); }}
          onNext={() => { markLessonCompleted("s2-l5"); setPage("s2_lessons"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("s2-l5", score, maxScore)}
        />
      )}
      {page === "s3_lessons" && (
  <S3LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    currentRankId={profile.who}
    targetRankId={profile.target}
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
    onBack={smartBack("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l1"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l1"); setPage("lesson_safety_s3_l2"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s3-l1", score, maxScore)}
  />
)}
{page === "lesson_safety_s3_l2" && (
  <LessonSafetyS3_L2
    lang={lang}
    onBack={smartBack("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l2"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l2"); setPage("lesson_safety_s3_l3"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s3-l2", score, maxScore)}
  />
)}
{page === "lesson_safety_s3_l3" && (
  <LessonSafetyS3_L3
    lang={lang}
    onBack={smartBack("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l3"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l3"); setPage("lesson_safety_s3_l4"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s3-l3", score, maxScore)}
  />
)}
{page === "lesson_safety_s3_l4" && (
  <LessonSafetyS3_L4
    lang={lang}
    onBack={smartBack("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l4"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l4"); setPage("lesson_safety_s3_l5"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s3-l4", score, maxScore)}
  />
)}
{page === "lesson_safety_s3_l5" && (
  <LessonSafetyS3_L5
    lang={lang}
    onBack={smartBack("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l5"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l5"); setPage("lesson_safety_s3_l6"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s3-l5", score, maxScore)}
  />
)}
{page === "lesson_safety_s3_l6" && (
  <LessonSafetyS3_L6
    lang={lang}
    onBack={smartBack("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l6"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l6"); setPage("lesson_safety_s3_l7"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s3-l6", score, maxScore)}
  />
)}
{page === "lesson_safety_s3_l7" && (
  <LessonSafetyS3_L7
    lang={lang}
    onBack={smartBack("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l7"); setPage("s3_lessons"); }}
    onNext={() => { markLessonCompleted("s3-l7"); setPage("lesson_safety_s3_l8"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s3-l7", score, maxScore)}
  />
)}
{page === "lesson_safety_s3_l8" && (
  <LessonSafetyS3_L8
    lang={lang}
    onBack={smartBack("s3_lessons")}
    onComplete={() => { markLessonCompleted("s3-l8"); setPage("dashboard"); }}
    onNext={() => { markLessonCompleted("s3-l8"); setPage("dashboard"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s3-l8", score, maxScore)}
  />
)}
    {page === "s4_lessons" && (
  <S4LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    currentRankId={profile.who}
    targetRankId={profile.target}
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
  <LessonSafetyS4_L1 lang={lang} onBack={smartBack("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l1"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l1"); setPage("lesson_safety_s4_l2"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s4-l1", score, maxScore)}/>
)}
{page === "lesson_safety_s4_l2" && (
  <LessonSafetyS4_L2 lang={lang} onBack={smartBack("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l2"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l2"); setPage("lesson_safety_s4_l3"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s4-l2", score, maxScore)}/>
)}
{page === "lesson_safety_s4_l3" && (
  <LessonSafetyS4_L3 lang={lang} onBack={smartBack("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l3"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l3"); setPage("lesson_safety_s4_l4"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s4-l3", score, maxScore)}/>
)}
{page === "lesson_safety_s4_l4" && (
  <LessonSafetyS4_L4 lang={lang} onBack={smartBack("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l4"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l4"); setPage("lesson_safety_s4_l5"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s4-l4", score, maxScore)}/>
)}
{page === "lesson_safety_s4_l5" && (
  <LessonSafetyS4_L5 lang={lang} onBack={smartBack("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l5"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l5"); setPage("lesson_safety_s4_l6"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s4-l5", score, maxScore)}/>
)}
{page === "lesson_safety_s4_l6" && (
  <LessonSafetyS4_L6 lang={lang} onBack={smartBack("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l6"); setPage("s4_lessons"); }}
    onNext={() => { markLessonCompleted("s4-l6"); setPage("lesson_safety_s4_l7"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s4-l6", score, maxScore)}/>
)}
{page === "lesson_safety_s4_l7" && (
  <LessonSafetyS4_L7 lang={lang} onBack={smartBack("s4_lessons")}
    onComplete={() => { markLessonCompleted("s4-l7"); setPage("dashboard"); }}
    onNext={() => { markLessonCompleted("s4-l7"); setPage("dashboard"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s4-l7", score, maxScore)}/>
)}
{page === "s5_lessons" && (
  <S5LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    currentRankId={profile.who}
    targetRankId={profile.target}
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
  <LessonSafetyS5_L1 lang={lang} onBack={smartBack("s5_lessons")}
    onComplete={() => { markLessonCompleted("s5-l1"); setPage("s5_lessons"); }}
    onNext={() => { markLessonCompleted("s5-l1"); setPage("lesson_safety_s5_l2"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s5-l1", score, maxScore)}/>
)}
{page === "lesson_safety_s5_l2" && (
  <LessonSafetyS5_L2 lang={lang} onBack={smartBack("s5_lessons")}
    onComplete={() => { markLessonCompleted("s5-l2"); setPage("s5_lessons"); }}
    onNext={() => { markLessonCompleted("s5-l2"); setPage("lesson_safety_s5_l3"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s5-l2", score, maxScore)}/>
)}
{page === "lesson_safety_s5_l3" && (
  <LessonSafetyS5_L3 lang={lang} onBack={smartBack("s5_lessons")}
    onComplete={() => { markLessonCompleted("s5-l3"); setPage("s5_lessons"); }}
    onNext={() => { markLessonCompleted("s5-l3"); setPage("lesson_safety_s5_l4"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s5-l3", score, maxScore)}/>
)}
{page === "lesson_safety_s5_l4" && (
  <LessonSafetyS5_L4 lang={lang} onBack={smartBack("s5_lessons")}
    onComplete={() => { markLessonCompleted("s5-l4"); setPage("dashboard"); }}
    onNext={() => { markLessonCompleted("s5-l4"); setPage("dashboard"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s5-l4", score, maxScore)}/>
)}
    {page === "foundation_summary" && (
      <FoundationSummaryPage lang={lang} onBack={() => setPage("dashboard")}/>
    )}
    {page === "s6_lessons" && (
  <S6LessonsPage
    lang={lang}
    onBack={() => setPage("dashboard")}
    completedLessons={completedLessons}
    currentRankId={profile.who}
    targetRankId={profile.target}
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
  <LessonSafetyS6_L1 lang={lang} onBack={smartBack("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l1"); setPage("s6_lessons"); }}
    onNext={() => { markLessonCompleted("s6-l1"); setPage("lesson_safety_s6_l2"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s6-l1", score, maxScore)}/>
)}
{page === "lesson_safety_s6_l2" && (
  <LessonSafetyS6_L2 lang={lang} onBack={smartBack("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l2"); setPage("s6_lessons"); }}
    onNext={() => { markLessonCompleted("s6-l2"); setPage("lesson_safety_s6_l3"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s6-l2", score, maxScore)}/>
)}
{page === "lesson_safety_s6_l3" && (
  <LessonSafetyS6_L3 lang={lang} onBack={smartBack("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l3"); setPage("s6_lessons"); }}
    onNext={() => { markLessonCompleted("s6-l3"); setPage("lesson_safety_s6_l4"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s6-l3", score, maxScore)}/>
)}
{page === "lesson_safety_s6_l4" && (
  <LessonSafetyS6_L4 lang={lang} onBack={smartBack("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l4"); setPage("s6_lessons"); }}
    onNext={() => { markLessonCompleted("s6-l4"); setPage("lesson_safety_s6_l5"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s6-l4", score, maxScore)}/>
)}
{page === "lesson_safety_s6_l5" && (
  <LessonSafetyS6_L5 lang={lang} onBack={smartBack("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l5"); setPage("s6_lessons"); }}
    onNext={() => { markLessonCompleted("s6-l5"); setPage("lesson_safety_s6_l6"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s6-l5", score, maxScore)}/>
)}
{page === "lesson_safety_s6_l6" && (
  <LessonSafetyS6_L6 lang={lang} onBack={smartBack("s6_lessons")}
    onComplete={() => { markLessonCompleted("s6-l6"); setPage("dashboard"); }}
    onNext={() => { markLessonCompleted("s6-l6"); setPage("dashboard"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("s6-l6", score, maxScore)}/>
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
    onBack={smartBack("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l1"); setPage("e2_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e2-l1", score, maxScore)}
  />
)}
      {page === "lesson_e2_l2" && (
  <LessonE2_L2
    lang={lang}
    onBack={smartBack("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l2"); setPage("e2_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e2-l2", score, maxScore)}
  />
)}
      {page === "lesson_e2_l3" && (
  <LessonE2_L3
    lang={lang}
    onBack={smartBack("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l3"); setPage("e2_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e2-l3", score, maxScore)}
  />
)}
   {page === "lesson_e2_l4" && (
  <LessonE2_L4
    lang={lang}
    onBack={smartBack("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l4"); setPage("e2_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e2-l4", score, maxScore)}
  />
)}  
      {page === "lesson_e2_l5" && (
  <LessonE2_L5
    lang={lang}
    onBack={smartBack("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l5"); setPage("e2_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e2-l5", score, maxScore)}
  />
)}
      {page === "lesson_e2_l6" && (
  <LessonE2_L6
    lang={lang}
    onBack={smartBack("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l6"); setPage("e2_lessons"); }}
    onNext={() => { markLessonCompleted("e2-l6"); setPage("lesson_e2_l7"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e2-l6", score, maxScore)}
  />
)}
      {page === "lesson_e2_l7" && (
  <LessonE2_L7
    lang={lang}
    onBack={smartBack("e2_lessons")}
    onComplete={() => { markLessonCompleted("e2-l7"); setPage("e2_lessons"); }}
    onNext={() => { markLessonCompleted("e2-l7"); setPage("lesson_e3_l1"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e2-l7", score, maxScore)}
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
    onBack={smartBack("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l1"); setPage("e3_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e3-l1", score, maxScore)}
  />
)}
      {page === "lesson_e3_l2" && (
  <LessonE3_L2
    lang={lang}
    onBack={smartBack("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l2"); setPage("e3_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e3-l2", score, maxScore)}
  />
)}
      {page === "lesson_e3_l3" && (
  <LessonE3_L3
    lang={lang}
    onBack={smartBack("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l3"); setPage("e3_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e3-l3", score, maxScore)}
  />
)}
      {page === "lesson_e3_l4" && (
  <LessonE3_L4
    lang={lang}
    onBack={smartBack("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l4"); setPage("e3_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e3-l4", score, maxScore)}
  />
)}
      {page === "lesson_e3_l5" && (
  <LessonE3_L5
    lang={lang}
    onBack={smartBack("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l5"); setPage("e3_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e3-l5", score, maxScore)}
  />
)}
      {page === "lesson_e6_l1" && (
  <LessonE6_L1
    lang={lang}
    onBack={smartBack("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l1"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l1"); setPage("lesson_e6_l2"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e6-l1", score, maxScore)}
  />
)}
      {page === "lesson_e3_l6" && (
  <LessonE3_L6
    lang={lang}
    onBack={smartBack("e3_lessons")}
    onComplete={() => { markLessonCompleted("e3-l6"); setPage("e3_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e3-l6", score, maxScore)}
  />
)}
      {page === "lesson_e6_l2" && (
  <LessonE6_L2
    lang={lang}
    onBack={smartBack("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l2"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l2"); setPage("lesson_e6_l3"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e6-l2", score, maxScore)}
  />
)}
      {page === "lesson_e6_l3" && (
  <LessonE6_L3
    lang={lang}
    onBack={smartBack("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l3"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l3"); setPage("lesson_e6_l4"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e6-l3", score, maxScore)}
  />
)}
      {page === "lesson_e6_l4" && (
  <LessonE6_L4
    lang={lang}
    onBack={smartBack("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l4"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l4"); setPage("lesson_e6_l5"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e6-l4", score, maxScore)}
  />
)}
      {page === "lesson_e6_l5" && (
  <LessonE6_L5
    lang={lang}
    onBack={smartBack("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l5"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l5"); setPage("lesson_e6_l6"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e6-l5", score, maxScore)}
  />
)}
      {page === "lesson_e6_l6" && (
  <LessonE6_L6
    lang={lang}
    onBack={smartBack("e6_lessons")}
    onComplete={() => { markLessonCompleted("e6-l6"); setPage("e6_lessons"); }}
    onNext={() => { markLessonCompleted("e6-l6"); setPage("lesson_e7_l1"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e6-l6", score, maxScore)}
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
    onBack={smartBack("e7_lessons")}
    onComplete={() => { markLessonCompleted("e7-l1"); setPage("e7_lessons"); }}
    onNext={() => { markLessonCompleted("e7-l1"); setPage("lesson_e7_l2"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e7-l1", score, maxScore)}
  />
)}
      {page === "lesson_e7_l2" && (
  <LessonE7_L2 lang={lang} onBack={smartBack("e7_lessons")}
    onComplete={() => { markLessonCompleted("e7-l2"); setPage("e7_lessons"); }}
    onNext={() => { markLessonCompleted("e7-l2"); setPage("lesson_e7_l3"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e7-l2", score, maxScore)}/>
)}
      {page === "lesson_e7_l3" && (
  <LessonE7_L3 lang={lang} onBack={smartBack("e7_lessons")}
    onComplete={() => { markLessonCompleted("e7-l3"); setPage("e7_lessons"); }}
    onNext={() => { markLessonCompleted("e7-l3"); setPage("lesson_e7_l4"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e7-l3", score, maxScore)}/>
)}
      {page === "lesson_e7_l4" && (
  <LessonE7_L4 lang={lang} onBack={smartBack("e7_lessons")}
    onComplete={() => { markLessonCompleted("e7-l4"); setPage("e7_lessons"); }}
    onNext={() => { markLessonCompleted("e7-l4"); setPage("lesson_e7_l5"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e7-l4", score, maxScore)}/>
)}
      {page === "lesson_e7_l5" && (
  <LessonE7_L5 lang={lang} onBack={smartBack("e7_lessons")}
    onComplete={() => { markLessonCompleted("e7-l5"); setPage("e7_lessons"); }}
    onNext={() => { markLessonCompleted("e7-l5"); setPage("e7_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("e7-l5", score, maxScore)}/>
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
          currentRankId={profile.who}
          targetRankId={profile.target}
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
          currentRankId={profile.who}
          targetRankId={profile.target}
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
          currentRankId={profile.who}
          targetRankId={profile.target}
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
          onBack={smartBack("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l1"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l1"); setPage("lesson_marpol_legal"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d2-l1", score, maxScore)}
        />
      )}
      {page === "lesson_marpol_legal" && (
        <LessonMARPOLLegal
          lang={lang}
          onBack={smartBack("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l2"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l2"); setPage("lesson_stcw"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d2-l2", score, maxScore)}
        />
      )}
      {page === "lesson_stcw" && (
        <LessonSTCW
          lang={lang}
          onBack={smartBack("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l3"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l3"); setPage("lesson_mlc"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d2-l3", score, maxScore)}
        />
      )}
      {page === "lesson_mlc" && (
        <LessonMLC
          lang={lang}
          onBack={smartBack("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l4"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l4"); setPage("lesson_colreg_legal"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d2-l4", score, maxScore)}
        />
      )}
      {page === "lesson_colreg_legal" && (
        <LessonCOLREGLegal
          lang={lang}
          onBack={smartBack("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l5"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l5"); setPage("lesson_unclos"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d2-l5", score, maxScore)}
        />
      )}
      {page === "lesson_unclos" && (
        <LessonUNCLOS
          lang={lang}
          onBack={smartBack("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l6"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l6"); setPage("lesson_liability_insurance"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d2-l6", score, maxScore)}
        />
      )}
      {page === "lesson_liability_insurance" && (
        <LessonLiabilityInsurance
          lang={lang}
          onBack={smartBack("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l7"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l7"); setPage("lesson_ports_flag_states"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d2-l7", score, maxScore)}
        />
      )}
      {page === "lesson_ports_flag_states" && (
        <LessonPortsFlagStates
          lang={lang}
          onBack={smartBack("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l8"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l8"); setPage("lesson_piracy"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d2-l8", score, maxScore)}
        />
      )}
      {page === "lesson_piracy" && (
        <LessonPiracy
          lang={lang}
          onBack={smartBack("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l9"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l9"); setPage("lesson_arbitration"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d2-l9", score, maxScore)}
        />
      )}
      {page === "lesson_arbitration" && (
        <LessonArbitration
          lang={lang}
          onBack={smartBack("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l10"); setPage("iml_lessons"); }}
          onNext={() => { markLessonCompleted("d2-l10"); setPage("iml_lessons"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d2-l10", score, maxScore)}
        />
      )}
      {page === "lesson_iala" && (
        <LessonIALA
          lang={lang}
          onBack={smartBack("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l1"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l1"); setPage("lesson_lights_shapes"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d3-l1", score, maxScore)}
        />
      )}
      {page === "lesson_lights_shapes" && (
        <LessonLightsShapes
          lang={lang}
          onBack={smartBack("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l2"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l2"); setPage("lesson_sound_signals"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d3-l2", score, maxScore)}
        />
      )}
      {page === "lesson_sound_signals" && (
        <LessonSoundSignals
          lang={lang}
          onBack={smartBack("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l3"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l3"); setPage("lesson_flags"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d3-l3", score, maxScore)}
        />
      )}
      {page === "lesson_flags" && (
        <LessonFlags
          lang={lang}
          onBack={smartBack("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l4"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l4"); setPage("lesson_vhf"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d3-l4", score, maxScore)}
        />
      )}
      {page === "lesson_vhf" && (
        <LessonVHF
          lang={lang}
          onBack={smartBack("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l5"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l5"); setPage("lesson_ais"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d3-l5", score, maxScore)}
        />
      )}
      {page === "lesson_ais" && (
        <LessonAIS
          lang={lang}
          onBack={smartBack("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l6"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l6"); setPage("lesson_gmdss"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d3-l6", score, maxScore)}
        />
      )}
      {page === "lesson_gmdss" && (
        <LessonGMDSS
          lang={lang}
          onBack={smartBack("sb_lessons")}
          onComplete={() => { markLessonCompleted("d3-l7"); setPage("sb_lessons"); }}
          onNext={() => { markLessonCompleted("d3-l7"); setPage("sb_lessons"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d3-l7", score, maxScore)}
        />
      )}
      {page === "lesson_sea_l1" && (
        <LessonSEA_L1
          lang={lang}
          onBack={smartBack("seamanship_lessons")}
          onComplete={() => { markLessonCompleted("d6-l1"); setPage("seamanship_lessons"); }}
          onNext={() => { markLessonCompleted("d6-l1"); setPage("lesson_sea_l2"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d6-l1", score, maxScore)}
        />
      )}
      {page === "lesson_sea_l2" && (
        <LessonSEA_L2
          lang={lang}
          onBack={smartBack("seamanship_lessons")}
          onComplete={() => { markLessonCompleted("d6-l2"); setPage("seamanship_lessons"); }}
          onNext={() => { markLessonCompleted("d6-l2"); setPage("lesson_sea_l3"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d6-l2", score, maxScore)}
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
    onBack={smartBack("seamanship_lessons")}
    onComplete={() => { markLessonCompleted("d6-l3"); setPage("seamanship_lessons"); }}
    onNext={() => { markLessonCompleted("d6-l3"); setPage("lesson_sea_l4"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d6-l3", score, maxScore)}
  />
)}
{page === "lesson_sea_l4" && (
  <LessonSEA_L4
    lang={lang}
    onBack={smartBack("seamanship_lessons")}
    onComplete={() => { markLessonCompleted("d6-l4"); setPage("seamanship_lessons"); }}
    onNext={() => { markLessonCompleted("d6-l4"); setPage("lesson_sea_l5"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d6-l4", score, maxScore)}
  />
)}
{page === "lesson_sea_l5" && (
  <LessonSEA_L5
    lang={lang}
    onBack={smartBack("seamanship_lessons")}
    onComplete={() => { markLessonCompleted("d6-l5"); setPage("seamanship_lessons"); }}
    onNext={() => { markLessonCompleted("d6-l5"); setPage("lesson_sea_l6"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d6-l5", score, maxScore)}
  />
)}
{page === "lesson_sea_l6" && (
  <LessonSEA_L6
    lang={lang}
    onBack={smartBack("seamanship_lessons")}
    onComplete={() => { markLessonCompleted("d6-l6"); setPage("seamanship_lessons"); }}
    onNext={() => { markLessonCompleted("d6-l6"); setPage("lesson_sea_l7"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d6-l6", score, maxScore)}
  />
)}
{page === "lesson_sea_l7" && (
  <LessonSEA_L7
    lang={lang}
    onBack={smartBack("seamanship_lessons")}
    onComplete={() => { markLessonCompleted("d6-l7"); setPage("seamanship_lessons"); }}
    onNext={() => { markLessonCompleted("d6-l7"); setPage("seamanship_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d6-l7", score, maxScore)}
  />
)}
{page === "lesson_meteo_l1" && (
  <LessonMETEO_L1
    lang={lang}
    onBack={smartBack("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l1"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l1"); setPage("lesson_meteo_l2"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d7-l1", score, maxScore)}
  />
)}
{page === "lesson_meteo_l2" && (
  <LessonMETEO_L2
    lang={lang}
    onBack={smartBack("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l2"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l2"); setPage("lesson_meteo_l3"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d7-l2", score, maxScore)}
  />
)}
{page === "lesson_meteo_l3" && (
  <LessonMETEO_L3
    lang={lang}
    onBack={smartBack("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l3"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l3"); setPage("lesson_meteo_l4"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d7-l3", score, maxScore)}
  />
)}
{page === "lesson_meteo_l4" && (
  <LessonMETEO_L4
    lang={lang}
    onBack={smartBack("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l4"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l4"); setPage("lesson_meteo_l5"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d7-l4", score, maxScore)}
  />
)}
{page === "lesson_meteo_l5" && (
  <LessonMETEO_L5
    lang={lang}
    onBack={smartBack("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l5"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l5"); setPage("lesson_meteo_l6"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d7-l5", score, maxScore)}
  />
)}
{page === "lesson_meteo_l6" && (
  <LessonMETEO_L6
    lang={lang}
    onBack={smartBack("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l6"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l6"); setPage("lesson_meteo_l7"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d7-l6", score, maxScore)}
  />
)}
{page === "lesson_meteo_l7" && (
  <LessonMETEO_L7
    lang={lang}
    onBack={smartBack("meteorology_lessons")}
    onComplete={() => { markLessonCompleted("d7-l7"); setPage("meteorology_lessons"); }}
    onNext={() => { markLessonCompleted("d7-l7"); setPage("meteorology_lessons"); }}
    onQuizScored={(score:number, maxScore:number) => saveLessonScore("d7-l7", score, maxScore)}
  />
)}
   {page === "lesson_shipcareer_l1" && (
  <LessonShipCareer_L1
    lang={lang}
    onBack={smartBack("shipcareer_lessons")}
    onComplete={() => { markLessonCompleted("d5-l1"); setPage("shipcareer_lessons"); }}
  />
)}
{page === "lesson_shipcareer_l2" && (
  <LessonShipCareer_L2
    lang={lang}
    onBack={smartBack("shipcareer_lessons")}
    onComplete={() => { markLessonCompleted("d5-l2"); setPage("shipcareer_lessons"); }}
  />
)}
{page === "lesson_shipcareer_l3" && (
  <LessonShipCareer_L3
    lang={lang}
    onBack={smartBack("shipcareer_lessons")}
    onComplete={() => { markLessonCompleted("d5-l3"); setPage("shipcareer_lessons"); }}
  />
)}
{page === "lesson_shipcareer_l4" && (
  <LessonShipCareer_L4
    lang={lang}
    onBack={smartBack("shipcareer_lessons")}
    onComplete={() => { markLessonCompleted("d5-l4"); setPage("shipcareer_lessons"); }}
  />
)}
{page === "lesson_shipcareer_l5" && (
  <LessonShipCareer_L5
    lang={lang}
    onBack={smartBack("shipcareer_lessons")}
    onComplete={() => { markLessonCompleted("d5-l5"); setPage("shipcareer_lessons"); }}
  />
)} 
      {page === "lesson_smcp_l1" && (
        <LessonSMCP_L1
          lang={lang}
          onBack={smartBack("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l1"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l1"); setPage("lesson_smcp_l2"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d4-l1", score, maxScore)}
        />
      )}
      {page === "lesson_smcp_l2" && (
        <LessonSMCP_L2
          lang={lang}
          onBack={smartBack("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l2"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l2"); setPage("lesson_smcp_l3"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d4-l2", score, maxScore)}
        />
      )}
      {page === "lesson_smcp_l3" && (
        <LessonSMCP_L3
          lang={lang}
          onBack={smartBack("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l3"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l3"); setPage("lesson_smcp_l4"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d4-l3", score, maxScore)}
        />
      )}
      {page === "lesson_smcp_l4" && (
        <LessonSMCP_L4
          lang={lang}
          onBack={smartBack("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l4"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l4"); setPage("lesson_smcp_l5"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d4-l4", score, maxScore)}
        />
      )}
      {page === "lesson_smcp_l5" && (
        <LessonSMCP_L5
          lang={lang}
          onBack={smartBack("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l5"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l5"); setPage("lesson_smcp_l6"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d4-l5", score, maxScore)}
        />
      )}
      {page === "lesson_smcp_l6" && (
        <LessonSMCP_L6
          lang={lang}
          onBack={smartBack("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l6"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l6"); setPage("lesson_smcp_l7"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d4-l6", score, maxScore)}
        />
      )}
      {page === "lesson_smcp_l7" && (
        <LessonSMCP_L7
          lang={lang}
          onBack={smartBack("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l7"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l7"); setPage("lesson_smcp_l8"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d4-l7", score, maxScore)}
        />
      )}
      {page === "lesson_smcp_l8" && (
        <LessonSMCP_L8
          lang={lang}
          onBack={smartBack("smcp_lessons")}
          onComplete={() => { markLessonCompleted("d4-l8"); setPage("smcp_lessons"); }}
          onNext={() => { markLessonCompleted("d4-l8"); setPage("smcp_lessons"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d4-l8", score, maxScore)}
        />
      )}
      {page === "lesson_navigation" && (
        <LessonNavigation
          lang={lang}
          onBack={smartBack("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l1"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l1"); setPage("lesson_navire"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d1-l1", score, maxScore)}
        />
      )}
      {page === "lesson_navire" && (
        <LessonNavire
          lang={lang}
          onBack={smartBack("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l2"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l2"); setPage("lesson_coord"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d1-l2", score, maxScore)}
        />
      )}
      {page === "lesson_coord" && (
        <LessonCoord
          lang={lang}
          onBack={smartBack("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l3"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l3"); setPage("lesson_carte"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d1-l3", score, maxScore)}
        />
      )}
      {page === "lesson_carte" && (
        <LessonCarteMarine
          lang={lang}
          onBack={smartBack("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l4"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l4"); setPage("lesson_compas"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d1-l4", score, maxScore)}
        />
      )}
      {page === "lesson_compas" && (
        <LessonCompas
          lang={lang}
          onBack={smartBack("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l5"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l5"); setPage("lesson_navpratique"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d1-l5", score, maxScore)}
        />
      )}
      {page === "lesson_navpratique" && (
        <LessonNavPratique
          lang={lang}
          onBack={smartBack("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l6"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l6"); setPage("lesson_marees"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d1-l6", score, maxScore)}
        />
      )}
      {page === "lesson_marees" && (
        <LessonMarees
          lang={lang}
          onBack={smartBack("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l7"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l7"); setPage("lesson_colreg"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d1-l7", score, maxScore)}
        />
      )}
      {page === "lesson_colreg" && (
        <LessonCOLREG
          lang={lang}
          onBack={smartBack("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l8"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l8"); setPage("lesson_steering"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d1-l8", score, maxScore)}
        />
      )}
      {page === "lesson_steering" && (
        <LessonSteering
          lang={lang}
          onBack={smartBack("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l9"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l9"); setPage("lesson_watch_org"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d1-l9", score, maxScore)}
        />
      )}
      {page === "lesson_watch_org" && (
        <LessonWatchOrganization
          lang={lang}
          onBack={smartBack("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l10"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("d1-l10"); setPage("dashboard"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("d1-l10", score, maxScore)}
        />
      )}
      {page === "lesson_moteur" && (
        <LessonMoteur
          lang={lang}
          onBack={smartBack("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l1"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l1"); setPage("lesson_auxiliaires"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e1-l1", score, maxScore)}
        />
      )}
      {page === "lesson_auxiliaires" && (
        <LessonAuxiliaires
          lang={lang}
          onBack={smartBack("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l2"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l2"); setPage("lesson_stabilite"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e1-l2", score, maxScore)}
        />
      )}
      {page === "lesson_stabilite" && (
        <LessonStabilite
          lang={lang}
          onBack={smartBack("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l3"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l3"); setPage("lesson_incendie"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e1-l3", score, maxScore)}
        />
      )}
      {page === "lesson_incendie" && (
        <LessonIncendie
          lang={lang}
          onBack={smartBack("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l4"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l4"); setPage("lesson_sauvetage"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e1-l4", score, maxScore)}
        />
      )}
      {page === "lesson_sauvetage" && (
        <LessonSauvetage
          lang={lang}
          onBack={smartBack("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l5"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l5"); setPage("lesson_marpol"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e1-l5", score, maxScore)}
        />
      )}
      {page === "lesson_marpol" && (
        <LessonMARPOL
          lang={lang}
          onBack={smartBack("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l1"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l1"); setPage("lesson_solas"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e4-l1", score, maxScore)}
        />
      )}
      {page === "lesson_marpol_l2" && (
        <LessonMARPOL_L2
          lang={lang}
          onBack={smartBack("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l2"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l2"); setPage("lesson_marpol_l3"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e4-l2", score, maxScore)}
        />
      )}
      {page === "lesson_marpol_l3" && (
        <LessonMARPOL_L3
          lang={lang}
          onBack={smartBack("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l3"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l3"); setPage("lesson_marpol_l4"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e4-l3", score, maxScore)}
        />
      )}
      {page === "lesson_marpol_l4" && (
        <LessonMARPOL_L4
          lang={lang}
          onBack={smartBack("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l4"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l4"); setPage("lesson_marpol_l5"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e4-l4", score, maxScore)}
        />
      )}
      {page === "lesson_marpol_l5" && (
        <LessonMARPOL_L5
          lang={lang}
          onBack={smartBack("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l5"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l5"); setPage("lesson_marpol_l6"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e4-l5", score, maxScore)}
        />
      )}
      {page === "lesson_marpol_l6" && (
        <LessonMARPOL_L6
          lang={lang}
          onBack={smartBack("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l6"); setPage("marpol_lessons"); }}
          onNext={() => { markLessonCompleted("e4-l6"); setPage("marpol_lessons"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e4-l6", score, maxScore)}
        />
      )}
    {page === "lesson_seemp_l1" && (
        <LessonSEEMP_L1
          lang={lang}
          onBack={smartBack("seemp_lessons")}
          onComplete={() => { markLessonCompleted("e5-l1"); setPage("seemp_lessons"); }}
          onNext={() => { markLessonCompleted("e5-l1"); setPage("lesson_seemp_l2"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e5-l1", score, maxScore)}
        />
      )}
      {page === "lesson_seemp_l2" && (
        <LessonSEEMP_L2
          lang={lang}
          onBack={smartBack("seemp_lessons")}
          onComplete={() => { markLessonCompleted("e5-l2"); setPage("seemp_lessons"); }}
          onNext={() => { markLessonCompleted("e5-l2"); setPage("lesson_seemp_l3"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e5-l2", score, maxScore)}
        />
      )}
      {page === "lesson_seemp_l3" && (
        <LessonSEEMP_L3
          lang={lang}
          onBack={smartBack("seemp_lessons")}
          onComplete={() => { markLessonCompleted("e5-l3"); setPage("seemp_lessons"); }}
          onNext={() => { markLessonCompleted("e5-l3"); setPage("lesson_seemp_l4"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e5-l3", score, maxScore)}
        />
      )}
      {page === "lesson_seemp_l4" && (
        <LessonSEEMP_L4
          lang={lang}
          onBack={smartBack("seemp_lessons")}
          onComplete={() => { markLessonCompleted("e5-l4"); setPage("seemp_lessons"); }}
          onNext={() => { markLessonCompleted("e5-l4"); setPage("lesson_seemp_l5"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e5-l4", score, maxScore)}
        />
      )}
      {page === "lesson_seemp_l5" && (
        <LessonSEEMP_L5
          lang={lang}
          onBack={smartBack("seemp_lessons")}
          completedLessons={completedLessons}
          userXP={userXP}
          onComplete={() => { markLessonCompleted("e5-l5"); setPage("dashboard"); }}
          onNext={() => { markLessonCompleted("e5-l5"); setPage("dashboard"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e5-l5", score, maxScore)}
        />
      )}
      {page === "lesson_watchkeeping" && (
        <LessonWatchkeeping
          lang={lang}
          onBack={smartBack("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l7"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l7"); setPage("lesson_emergency"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e1-l7", score, maxScore)}
        />
      )}
      {page === "lesson_maintenance" && (
        <LessonMaintenance
          lang={lang}
          onBack={smartBack("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l6"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l6"); setPage("lesson_watchkeeping"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e1-l6", score, maxScore)}
        />
      )}
      {page === "lesson_emergency" && (
        <LessonEmergency
          lang={lang}
          onBack={smartBack("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l8"); setPage("engine_lessons"); }}
          onNext={() => { markLessonCompleted("e1-l8"); setPage("engine_lessons"); }}
          onQuizScored={(score:number, maxScore:number) => saveLessonScore("e1-l8", score, maxScore)}
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
