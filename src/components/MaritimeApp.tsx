// @ts-nocheck
import QuestionnaireS7 from "./QuestionnaireS7";
import { useState, useEffect } from "react";

const LS_KEY = "map_registrations";
const ADMIN_CODE = "Mapmarino2025";

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
    slogan:"La première plateforme de formation maritime",
    sloganAccent:"certifiée IMO/STCW, dans ta langue.",
    sub:"Du cadet au capitaine — navigation, droit maritime, sécurité STCW et bien plus, accessible à tous.",
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
    slogan:"The first maritime training platform",
    sloganAccent:"IMO/STCW certified, in your language.",
    sub:"From cadet to captain — navigation, maritime law, STCW safety and more, accessible to all.",
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
    slogan:"La primera plataforma de formación marítima",
    sloganAccent:"certificada IMO/STCW, en tu idioma.",
    sub:"Del cadete al capitán — navegación, derecho marítimo, seguridad STCW y más, accesible para todos.",
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
    slogan:"A primeira plataforma de formação marítima",
    sloganAccent:"certificada IMO/STCW, no seu idioma.",
    sub:"Do cadete ao capitão — navegação, direito marítimo, segurança STCW e mais, acessível a todos.",
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
              onClick={() => { setLang(l.code); setPage("landing"); }}
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
  const [submitted, setSubmitted] = useState(false);
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
      regs.push({
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        lang,
        date: new Date().toLocaleString("fr-FR"),
      });
      saveRegs(regs);
      setLoading(false);
      setSubmitted(true);
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

  if (submitted) {
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
            <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{form.name}</div>
            <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",marginTop:2}}>{form.email}</div>
          </div>
          <button onClick={() => setPage("questionnaire")} style={{
            width:"100%",padding:"14px 0",borderRadius:16,border:"none",
            background:"rgba(201,146,42,0.15)",
            border:"1px solid rgba(201,146,42,0.35)",
            fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:700,
            color:"#e8b94f",cursor:"pointer",marginBottom:12,
          }}>{t.startQuestionnaire}</button>
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
            <button onClick={() => setPage("questionnaire")} style={{
              width:"100%",padding:"12px 0",borderRadius:14,border:"none",
              background:"rgba(255,255,255,0.07)",
              borderBottom:"1px solid rgba(201,146,42,0.25)",
              fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:700,
              color:"rgba(240,244,255,0.55)",cursor:"pointer",marginTop:4,
            }}>{t.startQuestionnaire}</button>
            <p style={{fontSize:10,textAlign:"center",
              color:"rgba(240,244,255,0.25)",lineHeight:1.6}}>{t.privacyNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN LOGIN ────────────────────────────────────────────────
function AdminLogin({ setPage }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const handle = () => {
    if (code === ADMIN_CODE) setPage("admin");
    else { setError(true); setCode(""); }
  };
  return (
    <div style={{minHeight:"100vh",
      background:"linear-gradient(160deg,#0d1f3c,#060e1a)",
      fontFamily:"'Nunito',sans-serif"}}>
      <TopBar onBack={() => setPage("landing")} title="Admin" backLabel="◀ Retour"/>
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

  const filtered = regs.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search)
  );

  const handleDelete = (id) => {
    const upd = regs.filter(r => r.id !== id);
    saveRegs(upd); setRegs(upd);
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
          <button onClick={() => setPage("landing")} style={{
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
            {val:filtered.length,label:"Affichés"},
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
                  </div>
                </div>
                <button onClick={() => handleDelete(r.id)} style={{
                  background:"none",border:"none",
                  color:"rgba(240,244,255,0.25)",fontSize:22,
                  cursor:"pointer",lineHeight:1,flexShrink:0,padding:"0 4px",
                }}>×</button>
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

// ── ROOT ───────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("lang");
  const [lang, setLang] = useState("fr");
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
      {page==="lang"        && <LanguageSelect setLang={setLang} setPage={setPage}/>}
      {page==="landing"     && <LandingPage setPage={setPage} lang={lang} setLang={setLang}/>}
      {page==="register"    && <RegisterPage setPage={setPage} lang={lang}/>}
      {page==="admin-login" && <AdminLogin setPage={setPage}/>}
      {page==="admin"       && <AdminPage setPage={setPage}/>}
      {page==="questionnaire" && (
        <QuestionnaireS7
          lang={lang}
          onBack={() => setPage("landing")}
          onNext={() => setPage("register")}
        />
      )}
    </>
  );
}
