// @ts-nocheck
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)",
};

const T = {
  fr:{
    back:"◀ Retour",
    welcomeOn:"sur MARITIME ACADEMY PRO",
    slogan:"La formation maritime complète — pont et machine",
    quote:"La mer ne pardonne pas l'ignorance.\n\nMais elle récompense généreusement ceux qui la respectent, l'étudient et la connaissent.",
    quoteBy:"— Maritime Academy Pro",
    appDesc1:"La première plateforme de formation maritime",
    appDesc2:"alignée sur les standards IMO/STCW",
    appDesc3:"dans ta langue, accessible partout dans le monde.",
    features:[
      {icon:"🧭", text:"Navigation & COLREG"},
      {icon:"🛟", text:"Sécurité & STCW"},
      {icon:"⚖️", text:"Droit maritime IMO"},
      {icon:"🚢", text:"My Career Advisor™"},
    ],
    createAccountBtn:"Créer un compte",
    signInBtn:"Se connecter",
    googleBtn:"Continuer avec Google",
    googleConnecting:"Connexion...",
    errGoogle:"Erreur de connexion avec Google. Réessaie.",
  },
  en:{
    back:"◀ Back",
    welcomeOn:"to MARITIME ACADEMY PRO",
    slogan:"Complete maritime training — deck and engine",
    quote:"The sea does not forgive ignorance.\n\nBut it generously rewards those who respect, study and understand it.",
    quoteBy:"— Maritime Academy Pro",
    appDesc1:"The first maritime training platform",
    appDesc2:"built around IMO/STCW standards",
    appDesc3:"in your language, accessible anywhere in the world.",
    features:[
      {icon:"🧭", text:"Navigation & COLREG"},
      {icon:"🛟", text:"Safety & STCW"},
      {icon:"⚖️", text:"IMO Maritime Law"},
      {icon:"🚢", text:"My Career Advisor™"},
    ],
    createAccountBtn:"Create an account",
    signInBtn:"Sign in",
    googleBtn:"Continue with Google",
    googleConnecting:"Connecting...",
    errGoogle:"Google sign-in error. Please try again.",
  },
  es:{
    back:"◀ Volver",
    welcomeOn:"a MARITIME ACADEMY PRO",
    slogan:"Formación marítima completa — puente y máquinas",
    quote:"El mar no perdona la ignorancia.\n\nPero recompensa generosamente a quienes lo respetan, lo estudian y lo conocen.",
    quoteBy:"— Maritime Academy Pro",
    appDesc1:"La primera plataforma de formación marítima",
    appDesc2:"basada en los estándares IMO/STCW",
    appDesc3:"en tu idioma, accesible en todo el mundo.",
    features:[
      {icon:"🧭", text:"Navegación & COLREG"},
      {icon:"🛟", text:"Seguridad & STCW"},
      {icon:"⚖️", text:"Derecho Marítimo IMO"},
      {icon:"🚢", text:"My Career Advisor™"},
    ],
    createAccountBtn:"Crear una cuenta",
    signInBtn:"Iniciar sesión",
    googleBtn:"Continuar con Google",
    googleConnecting:"Conectando...",
    errGoogle:"Error al conectar con Google. Inténtalo de nuevo.",
  },
  pt:{
    back:"◀ Voltar",
    welcomeOn:"ao MARITIME ACADEMY PRO",
    slogan:"Formação marítima completa — convés e máquinas",
    quote:"O mar não perdoa a ignorância.\n\nMas recompensa generosamente quem o respeita, o estuda e o conhece.",
    quoteBy:"— Maritime Academy Pro",
    appDesc1:"A primeira plataforma de formação marítima",
    appDesc2:"baseada nos padrões IMO/STCW",
    appDesc3:"no seu idioma, acessível em todo o mundo.",
    features:[
      {icon:"🧭", text:"Navegação & COLREG"},
      {icon:"🛟", text:"Segurança & STCW"},
      {icon:"⚖️", text:"Direito Marítimo IMO"},
      {icon:"🚢", text:"My Career Advisor™"},
    ],
    createAccountBtn:"Criar uma conta",
    signInBtn:"Entrar",
    googleBtn:"Continuar com Google",
    googleConnecting:"Conectando...",
    errGoogle:"Erro ao conectar com o Google. Tente novamente.",
  },
};

const WELCOMES = [
  {flag:"🇫🇷", word:"Bienvenue"},
  {flag:"🇬🇧", word:"Welcome"},
  {flag:"🇪🇸", word:"Bienvenido"},
  {flag:"🇧🇷", word:"Bem-vindo"},
];

function Stars() {
  const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);
  useEffect(()=>{
    setS(Array.from({length:40},()=>({
      x:Math.random()*100,y:Math.random()*100,
      sz:Math.random()>0.7?2.5:1.5,
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
        @keyframes tw{0%,100%{opacity:0}50%{opacity:0.5}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes welcomeFade{0%{opacity:0;transform:translateY(10px)}20%{opacity:1;transform:translateY(0)}80%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-10px)}}
        @keyframes floatWave{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-8px) rotate(2deg)}}
        @keyframes shimmer{0%{left:-100%}100%{left:200%}}
        @keyframes featureIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
        @keyframes glowPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.8;transform:scale(1.1)}}
      `}</style>
    </>
  );
}

function TopBar({onBack,backLabel}) {
  return (
    <div style={{
      position:"sticky",top:0,zIndex:100,
      background:"rgba(6,14,26,0.96)",backdropFilter:"blur(14px)",
      borderBottom:`1px solid ${C.border}`,
      height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12,
    }}>
      <button onClick={onBack} style={{
        display:"flex",alignItems:"center",gap:7,
        background:"rgba(255,255,255,0.09)",
        border:"1px solid rgba(255,255,255,0.2)",
        borderRadius:10,padding:"8px 14px",
        color:C.white,fontSize:13,fontWeight:700,
        cursor:"pointer",flexShrink:0,
        fontFamily:"'Nunito',sans-serif",
      }}>{backLabel}</button>
      <div style={{flex:1,height:3,borderRadius:3,
        background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
        <div style={{height:"100%",borderRadius:3,width:"60%",
          background:`linear-gradient(90deg,${C.blue2},${C.gold2})`}}/>
      </div>
      <span style={{fontSize:11,color:C.muted,
        fontFamily:"'Cinzel',serif",letterSpacing:1}}>3/5</span>
    </div>
  );
}

export default function WelcomeS4({
  lang="fr",
  onCreateAccount=()=>{},
  onSignIn=()=>{},
  onBack=()=>{},
}) {
  const t=T[lang]||T.fr;
  const [idx,setIdx]=useState(0);
  const [vis,setVis]=useState(false);
  const [phase,setPhase]=useState(0);
  const [googleLoading,setGoogleLoading]=useState(false);
  const [googleError,setGoogleError]=useState("");

  const handleGoogleSignIn=async ()=>{
    setGoogleLoading(true);
    setGoogleError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      setGoogleLoading(false);
      setGoogleError(t.errGoogle);
    }
    // On success, the browser redirects to Google — no further code runs here.
  };

  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);

  // Rotate welcome word
  useEffect(()=>{
    const iv=setInterval(()=>setIdx(i=>(i+1)%WELCOMES.length),2000);
    return ()=>clearInterval(iv);
  },[]);

  // Stagger content phases
  useEffect(()=>{
    if(!vis) return;
    setTimeout(()=>setPhase(1),200);
    setTimeout(()=>setPhase(2),600);
    setTimeout(()=>setPhase(3),1000);
  },[vis]);

  const current=WELCOMES[idx];

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",
      overflowX:"hidden",position:"relative",
    }}>
      <Stars/>
      <TopBar onBack={onBack} backLabel={t.back}/>

      <div style={{
        padding:"24px 20px 48px",
        position:"relative",zIndex:1,
      }}>
        <div style={{maxWidth:440,margin:"0 auto"}}>

          {/* ── WELCOME ROTATING ── */}
          <div style={{
            textAlign:"center",marginBottom:20,
            opacity:phase>=1?1:0,
            transform:phase>=1?"translateY(0)":"translateY(16px)",
            transition:"all 0.6s ease",
          }}>
            {/* BG glow */}
            <div style={{
              position:"absolute",top:60,left:"50%",
              transform:"translateX(-50%)",
              width:260,height:260,borderRadius:"50%",
              background:`radial-gradient(circle,${C.blue}20 0%,transparent 70%)`,
              animation:"glowPulse 4s ease-in-out infinite",
              pointerEvents:"none",
            }}/>

            <div key={idx} style={{
              fontFamily:"'Cinzel',serif",
              fontSize:42,fontWeight:900,
              background:`linear-gradient(135deg,${C.blue2},${C.gold2})`,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              animation:"welcomeFade 2s ease both",
              display:"flex",alignItems:"center",
              justifyContent:"center",gap:16,
              marginBottom:8,
            }}>
              <span style={{WebkitTextFillColor:"initial",fontSize:36}}>
                {current.flag}
              </span>
              <span>{current.word}</span>
            </div>

            <div style={{fontSize:14,color:C.muted,letterSpacing:2,marginBottom:4}}>
              {t.welcomeOn}
            </div>
            <div style={{
              fontSize:13,color:C.gold,fontStyle:"italic",letterSpacing:0.5,
            }}>{t.slogan}</div>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{
            height:1,margin:"0 0 20px",
            background:`linear-gradient(90deg,transparent,${C.gold}55,${C.blue2}55,transparent)`,
            opacity:phase>=1?1:0,transition:"opacity 0.6s ease 0.2s",
          }}/>

          {/* ── QUOTE CARD ── */}
          <div style={{
            background:"rgba(13,31,60,0.75)",
            border:`1px solid ${C.gold}33`,
            borderLeft:`3px solid ${C.gold}`,
            borderRadius:20,padding:"22px 20px",
            marginBottom:16,position:"relative",
            overflow:"hidden",
            opacity:phase>=2?1:0,
            transform:phase>=2?"translateY(0)":"translateY(16px)",
            transition:"all 0.6s ease",
          }}>
            {/* Quote mark */}
            <div style={{
              fontSize:80,color:`${C.blue2}15`,
              fontFamily:"'Cinzel',serif",lineHeight:0.5,
              position:"absolute",top:14,left:14,
            }}>"</div>

            {/* Shimmer effect */}
            <div style={{
              position:"absolute",top:0,left:"-100%",
              width:"50%",height:"100%",
              background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.03),transparent)",
              animation:"shimmer 4s ease-in-out infinite 2s",
            }}/>

            <div style={{
              fontSize:16,fontWeight:600,
              color:"rgba(240,244,255,0.9)",
              lineHeight:1.9,fontStyle:"italic",
              position:"relative",zIndex:1,
              whiteSpace:"pre-line",
            }}>{t.quote}</div>

            <div style={{
              width:52,height:2,marginTop:16,
              background:`linear-gradient(90deg,${C.blue},${C.gold})`,
            }}/>
            <div style={{
              fontSize:11,color:`${C.gold}99`,
              letterSpacing:2,fontFamily:"'Cinzel',serif",
              marginTop:10,
            }}>{t.quoteBy}</div>
          </div>

          {/* ── APP PRESENTATION ── */}
          <div style={{
            background:"rgba(13,31,60,0.5)",
            border:`1px solid ${C.border}`,
            borderRadius:20,padding:"18px 18px",
            marginBottom:16,
            opacity:phase>=2?1:0,
            transform:phase>=2?"translateY(0)":"translateY(16px)",
            transition:"all 0.6s ease 0.15s",
          }}>
            <div style={{
              fontSize:14,color:C.muted,
              lineHeight:1.8,textAlign:"center",
            }}>
              {t.appDesc1}{" "}
              <span style={{
                color:C.gold2,fontWeight:700,
              }}>{t.appDesc2}</span>
              {" — "}{t.appDesc3}
            </div>

            {/* IMO STCW badges row */}
            <div style={{
              display:"flex",justifyContent:"center",
              gap:10,marginTop:14,flexWrap:"wrap",
            }}>
              {["IMO","STCW","SOLAS","MARPOL","COLREG"].map(badge=>(
                <div key={badge} style={{
                  padding:"4px 10px",borderRadius:20,
                  background:"rgba(201,146,42,0.1)",
                  border:`1px solid ${C.gold}33`,
                  fontSize:10,color:C.gold,
                  fontFamily:"'Cinzel',serif",
                  letterSpacing:1,
                }}>{badge}</div>
              ))}
            </div>
          </div>

          {/* ── FEATURES ── */}
          <div style={{
            display:"grid",gridTemplateColumns:"1fr 1fr",
            gap:10,marginBottom:24,
            opacity:phase>=3?1:0,
            transform:phase>=3?"translateY(0)":"translateY(16px)",
            transition:"all 0.6s ease",
          }}>
            {t.features.map((f,i)=>(
              <div key={i} style={{
                display:"flex",alignItems:"center",gap:10,
                padding:"12px 14px",borderRadius:16,
                background:"rgba(255,255,255,0.05)",
                border:`1px solid rgba(255,255,255,0.08)`,
                animation:`featureIn 0.5s ease ${0.1+i*0.1}s both`,
              }}>
                <span style={{
                  fontSize:24,flexShrink:0,
                  animation:"floatWave 3s ease-in-out infinite",
                  animationDelay:`${i*0.4}s`,
                }}>{f.icon}</span>
                <span style={{
                  fontSize:12,fontWeight:600,
                  color:"rgba(240,244,255,0.8)",
                  lineHeight:1.3,
                }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* ── MARITIME ICONS ROW ── */}
          <div style={{
            display:"flex",justifyContent:"center",
            gap:18,fontSize:24,
            marginBottom:24,
            opacity:phase>=3?0.35:0,
            transition:"opacity 0.6s ease 0.3s",
          }}>
            {["⚓","🧭","⛵","🚢","🛟","🌊"].map((e,i)=>(
              <span key={i} style={{
                animation:`floatWave ${2+i*0.3}s ease-in-out ${i*0.2}s infinite`,
              }}>{e}</span>
            ))}
          </div>

          {/* ── THREE EQUAL ENTRY ACTIONS ── */}
          <div style={{
            display:"flex",flexDirection:"column",gap:10,
            opacity:phase>=1?1:0,
            transform:phase>=1?"translateY(0)":"translateY(16px)",
            transition:"all 0.6s ease",
          }}>
            <button onClick={onCreateAccount} style={{
              width:"100%",padding:"17px 0",
              border:"none",borderRadius:16,
              background:`linear-gradient(135deg,${C.blue},${C.gold})`,
              fontFamily:"'Cinzel',serif",fontSize:15,
              fontWeight:700,letterSpacing:2,color:C.white,
              cursor:"pointer",
              boxShadow:"0 10px 36px rgba(26,111,212,0.45)",
              position:"relative",overflow:"hidden",
            }}>
              <span style={{position:"relative",zIndex:1}}>{t.createAccountBtn}</span>
              <div style={{
                position:"absolute",top:0,left:"-100%",
                width:"60%",height:"100%",
                background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
                animation:"shimmer 3s ease-in-out infinite 1s",
              }}/>
            </button>

            <button onClick={onSignIn} style={{
              width:"100%",padding:"15px 0",
              border:"1px solid rgba(255,255,255,0.22)",borderRadius:16,
              background:"rgba(255,255,255,0.05)",
              fontFamily:"'Cinzel',serif",fontSize:14,
              fontWeight:700,letterSpacing:1.5,color:C.white,
              cursor:"pointer",
            }}>
              {t.signInBtn}
            </button>

            <button onClick={handleGoogleSignIn} disabled={googleLoading} style={{
              width:"100%",padding:"14px",borderRadius:14,
              background:"rgba(255,255,255,0.06)",
              border:"1px solid rgba(255,255,255,0.16)",
              display:"flex",alignItems:"center",
              justifyContent:"center",gap:12,
              cursor:googleLoading?"default":"pointer",color:C.white,
              fontFamily:"'Nunito',sans-serif",
              fontSize:14,fontWeight:600,
            }}>
              <span style={{fontSize:20}}>🔵</span>
              {googleLoading ? t.googleConnecting : t.googleBtn}
            </button>

            {googleError && (
              <div style={{fontSize:12,color:"#e05c4d",textAlign:"center"}}>{googleError}</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
