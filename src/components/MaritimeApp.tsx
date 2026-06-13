// @ts-nocheck
import QuestionnaireS7 from "./QuestionnaireS7";
import StatusCardS8 from "./StatusCardS8";
import Dashboard, { MODULES as ALL_MODULES } from "./Dashboard";
import LessonNavigation from "./LessonNavigation";
import LessonCOLREG from "./LessonCOLREG";
import LessonCoord from "./LessonCoord";
import LessonCarteMarine from "./LessonCarteMarine";
import LessonCompas from "./LessonCompas";
import LessonNavPratique from "./LessonNavPratique";
import LessonMarees from "./LessonMarees";
import LessonNavire from "./LessonNavire";
import LessonMoteur from "./LessonMoteur";
import LessonAuxiliaires from "./LessonAuxiliaires";
import LessonStabilite from "./LessonStabilite";
import LessonIncendie from "./LessonIncendie";
import LessonSauvetage from "./LessonSauvetage";
import LessonMARPOL from "./LessonMARPOL";
import LessonWatchkeeping from "./LessonWatchkeeping";
import LessonMaintenance from "./LessonMaintenance";
import LessonEmergency from "./LessonEmergency";
import LessonSOLAS from "./LessonSOLAS";
import LessonMARPOLLegal from "./LessonMARPOLLegal";
import LessonSTCW from "./LessonSTCW";
import RegisterS6 from "./RegisterS6";
import WelcomeS4 from "./WelcomeS4";
import { SplashS1, MusicS3, BridgeS5 } from "./SplashMusicBridge";
import { useState, useEffect, useRef } from "react";
import { MusicProvider, useMusic } from "./MusicProvider";

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
      {icon:"⚓",title:"Ship Career Navigator™",desc:"Feuille de route selon ton navire de rêve"},
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
      {icon:"⚓",title:"Ship Career Navigator™",desc:"Personalized roadmap for your dream ship"},
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
      {icon:"⚓",title:"Ship Career Navigator™",desc:"Hoja de ruta según tu barco ideal"},
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
      {icon:"⚓",title:"Ship Career Navigator™",desc:"Roteiro personalizado para seu navio ideal"},
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
              onClick={() => { setLang(l.code); setPage("music"); }}
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
  fr:{ modules:"Tous les modules", ships:"Navires", shipsSoon:"Bibliothèque de navires bientôt disponible", back:"◀ Retour" },
  en:{ modules:"All modules", ships:"Ships", shipsSoon:"Ship library coming soon", back:"◀ Back" },
  es:{ modules:"Todos los módulos", ships:"Barcos", shipsSoon:"Biblioteca de barcos próximamente", back:"◀ Volver" },
  pt:{ modules:"Todos os módulos", ships:"Navios", shipsSoon:"Biblioteca de navios em breve", back:"◀ Voltar" },
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

function ShipsPage({ lang, onBack }:{lang:string;onBack:()=>void}) {
  const t = NAV_T[lang] || NAV_T.fr;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <TopBar onBack={onBack} title={t.ships} backLabel={t.back}/>
      <div style={{padding:"60px 24px",textAlign:"center",maxWidth:400,margin:"0 auto"}}>
        <div style={{fontSize:72,marginBottom:16}}>🚢</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,marginBottom:8}}>{t.ships}</div>
        <div style={{fontSize:13,color:"rgba(240,244,255,0.5)"}}>{t.shipsSoon}</div>
      </div>
    </div>
  );
}

function NavigationLessonsPage({ lang, onBack, onPick, completedLessons }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[]}) {
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
  const playable = new Set(["l1","l2","l3","l4","l5","l6","l7","l8"]);
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

function EngineLessonsPage({ lang, onBack, onPick, completedLessons }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[]}) {
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

function MarpolLessonsPage({ lang, onBack, onPick, completedLessons }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[]}) {
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
  const playable = new Set(["l1","l2"]);
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

function IMLLessonsPage({ lang, onBack, onPick, completedLessons }:{lang:string;onBack:()=>void;onPick:(lid:string)=>void;completedLessons:string[]}) {
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
  const playable = new Set(["l1","l2","l3"]);
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
  const [page, setPage] = useState<string>("splash");
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem("map_status_card")) {
        setPage("dashboard");
      }
    } catch {}
  }, []);
  const [lang, setLang] = useState("fr");
  const [profile, setProfile] = useState({});
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("map_completed_lessons") || "[]"); }
    catch { return []; }
  });
  const markLessonCompleted = (id: string) => {
    setCompletedLessons((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem("map_completed_lessons", JSON.stringify(next)); } catch {}
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
        }
      }
    } catch {}
  }, []);
  const persistProfile = (p:any) => {
    setProfile(p);
    try {
      const last = JSON.parse(localStorage.getItem("map_last_reg") || "{}");
      localStorage.setItem("map_status_card", JSON.stringify({ ...p, name: p?.name || last?.name }));
    } catch {}
  };

  // ── HARDWARE BACK BUTTON HANDLING ──────────────────────
  const pageRef = useRef(page);
  useEffect(() => { pageRef.current = page; }, [page]);
  const ONBOARDING = ["splash","lang","music","welcome","bridge","register","questionnaire","status"];
  const LESSONS = ["lesson_navigation","lesson_navire","lesson_coord","lesson_carte","lesson_compas","lesson_navpratique","lesson_marees","lesson_colreg"];
  const ENGINE_LESSONS = ["lesson_moteur","lesson_auxiliaires","lesson_stabilite","lesson_incendie","lesson_sauvetage","lesson_maintenance","lesson_watchkeeping","lesson_emergency"];

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
      if (["modules","ships","nav_lessons","engine_lessons","marpol_lessons","iml_lessons","admin","admin-login"].includes(cur)) {
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
    setPage("lang");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Nunito:wght@400;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        html,body{margin:0;padding:0;background:#060e1a;}
        input,button{-webkit-tap-highlight-color:transparent;}
        ::selection{background:rgba(201,146,42,0.3);}
        button:active{opacity:0.82;transform:scale(0.98);}
      `}</style>
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
      {page==="register"    && (
        <RegisterS6
          lang={lang}
          onBack={() => setPage("bridge")}
          onNext={() => setPage("questionnaire")}
          setUsername={(name) => setProfile((p) => ({ ...p, name }))}
          onSignIn={() => setPage("status")}
        />
      )}
      {page==="admin-login" && <AdminLogin setPage={setPage}/>}
      {page==="admin"       && <AdminPage setPage={setPage}/>}
      {page==="welcome"     && (
        <WelcomeS4
          lang={lang}
          onBack={() => setPage("music")}
          onNext={() => setPage("bridge")}
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
      {page==="status"      && (() => {
        let last:any = {};
        let storedPhoto: string | null = null;
        try {
          if (typeof window !== "undefined") {
            last = JSON.parse(localStorage.getItem("map_last_reg") || "{}");
            storedPhoto = localStorage.getItem("map_user_photo");
          }
        } catch {}
        return (
          <StatusCardS8
            lang={lang}
            username={last.name || "Marin"}
            photo={storedPhoto || profile.photo || null}
            profile={profile}
            onBack={() => setPage("questionnaire")}
            onEdit={() => setPage("questionnaire")}
            onStart={() => setPage("dashboard")}
          />
        );
      })()}
      {page === "dashboard" && (() => {
        let last:any = {};
        let storedPhoto: string | null = null;
        try {
          if (typeof window !== "undefined") {
            last = JSON.parse(localStorage.getItem("map_last_reg") || "{}");
            storedPhoto = localStorage.getItem("map_user_photo");
          }
        } catch {}
        let userPlan: "free" | "premium" | "premium_plus" = "free";
        try {
          if (typeof window !== "undefined") {
            const p = localStorage.getItem("map_user_plan");
            if (p === "premium" || p === "premium_plus" || p === "free") userPlan = p;
          }
        } catch {}
        return (
          <Dashboard
            lang={lang}
            username={last.name || profile?.name || "Marin"}
            photo={storedPhoto || profile?.photo || null}
            profile={profile || {}}
            userLevel="cadet"
            userPlan={userPlan}
            completedLessons={completedLessons}
            onViewStatus={() => setPage("status")}
            onEditProfile={() => setPage("questionnaire")}
            onStartModule={(m:any) => {
              if (m?.id === "d1") setPage("nav_lessons");
              else if (m?.id === "e1") setPage("engine_lessons");
              else if (m?.id === "e4") setPage("marpol_lessons");
              else if (m?.id === "d2") setPage("iml_lessons");
            }}
            activeNav="home"
            onNavHome={() => setPage("dashboard")}
            onNavModules={() => setPage("modules")}
            onNavShips={() => setPage("ships")}
            onNavProfile={() => setPage("status")}
            onAdmin={() => setPage("admin-login")}
            onChangeLanguage={handleChangeLanguage}
            onChangeDepartment={handleChangeDepartment}
            onResetProfile={handleResetProfile}
          />
        );
      })()}
      {page === "modules" && (
        <ModulesListPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          onStart={(m:any) => {
            if (m?.id === "d1") setPage("nav_lessons");
            else if (m?.id === "e1") setPage("engine_lessons");
            else if (m?.id === "e4") setPage("marpol_lessons");
            else if (m?.id === "d2") setPage("iml_lessons");
            else setPage("dashboard");
          }}
        />
      )}
      {page === "ships" && (
        <ShipsPage lang={lang} onBack={() => setPage("dashboard")}/>
      )}
      {page === "nav_lessons" && (
        <NavigationLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_navigation");
            else if (lid === "l2") setPage("lesson_navire");
            else if (lid === "l3") setPage("lesson_coord");
            else if (lid === "l4") setPage("lesson_carte");
            else if (lid === "l5") setPage("lesson_compas");
            else if (lid === "l6") setPage("lesson_navpratique");
            else if (lid === "l7") setPage("lesson_marees");
            else if (lid === "l8") setPage("lesson_colreg");
          }}
        />
      )}
      {page === "engine_lessons" && (
        <EngineLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
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
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_marpol");
          }}
        />
      )}
      {page === "iml_lessons" && (
        <IMLLessonsPage
          lang={lang}
          onBack={() => setPage("dashboard")}
          completedLessons={completedLessons}
          onPick={(lid:string) => {
            if (lid === "l1") setPage("lesson_solas");
            else if (lid === "l2") setPage("lesson_marpol_legal");
          }}
        />
      )}
      {page === "lesson_solas" && (
        <LessonSOLAS
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l1"); setPage("iml_lessons"); }}
        />
      )}
      {page === "lesson_marpol_legal" && (
        <LessonMARPOLLegal
          lang={lang}
          onBack={() => setPage("iml_lessons")}
          onComplete={() => { markLessonCompleted("d2-l2"); setPage("iml_lessons"); }}
        />
      )}
      {page === "lesson_navigation" && (
        <LessonNavigation
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l1"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_navire" && (
        <LessonNavire
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l2"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_coord" && (
        <LessonCoord
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l3"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_carte" && (
        <LessonCarteMarine
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l4"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_compas" && (
        <LessonCompas
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l5"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_navpratique" && (
        <LessonNavPratique
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l6"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_marees" && (
        <LessonMarees
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l7"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_colreg" && (
        <LessonCOLREG
          lang={lang}
          onBack={() => setPage("nav_lessons")}
          onComplete={() => { markLessonCompleted("d1-l8"); setPage("dashboard"); }}
        />
      )}
      {page === "lesson_moteur" && (
        <LessonMoteur
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l1"); setPage("engine_lessons"); }}
        />
      )}
      {page === "lesson_auxiliaires" && (
        <LessonAuxiliaires
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l2"); setPage("engine_lessons"); }}
        />
      )}
      {page === "lesson_stabilite" && (
        <LessonStabilite
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l3"); setPage("engine_lessons"); }}
        />
      )}
      {page === "lesson_incendie" && (
        <LessonIncendie
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l4"); setPage("engine_lessons"); }}
        />
      )}
      {page === "lesson_sauvetage" && (
        <LessonSauvetage
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l5"); setPage("engine_lessons"); }}
        />
      )}
      {page === "lesson_marpol" && (
        <LessonMARPOL
          lang={lang}
          onBack={() => setPage("marpol_lessons")}
          onComplete={() => { markLessonCompleted("e4-l1"); setPage("marpol_lessons"); }}
        />
      )}
      {page === "lesson_watchkeeping" && (
        <LessonWatchkeeping
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l7"); setPage("engine_lessons"); }}
        />
      )}
      {page === "lesson_maintenance" && (
        <LessonMaintenance
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l6"); setPage("engine_lessons"); }}
        />
      )}
      {page === "lesson_emergency" && (
        <LessonEmergency
          lang={lang}
          onBack={() => setPage("engine_lessons")}
          onComplete={() => { markLessonCompleted("e1-l8"); setPage("engine_lessons"); }}
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
    </>
  );
}
