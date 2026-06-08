// @ts-nocheck
import React, { useState, useEffect } from "react";

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
    musicQ:"ACTIVER LA MUSIQUE ?",
    musicDesc:"Une musique maritime dynamique pour accompagner ton voyage vers l'excellence nautique.",
    musicYes:"🎵 OUI, ACTIVER",
    musicNo:"Non merci, continuer sans son",
    bridgeTitle:"TU AS CHOISI LA BONNE VOIE",
    bridgeText:"Chaque grand marin a commencé par le bas. Qu'il soit cadet sur le pont ou oiler en salle des machines, le premier pas est toujours le même. Créons ton compte pour que ton voyage commence vraiment.",
    bridgeBtn:"⚓ CRÉER MON COMPTE",
    deckLabel:"🧭 PONT",
    engineLabel:"⚙️ MACHINE",
    deck:["Cadet","Officier","Maître","Capitaine"],
    engine:["Oiler","Mécanicien","Off. Machine","Chef Méc."],
  },
  en:{
    back:"◀ Back",
    musicQ:"ENABLE MUSIC?",
    musicDesc:"Dynamic maritime music to accompany your journey toward nautical excellence.",
    musicYes:"🎵 YES, ENABLE",
    musicNo:"No thanks, without sound",
    bridgeTitle:"YOU CHOSE THE RIGHT PATH",
    bridgeText:"Every great seafarer started from the bottom. Whether cadet on deck or oiler in the engine room, the first step is always the same. Let's create your account so your voyage truly begins.",
    bridgeBtn:"⚓ CREATE MY ACCOUNT",
    deckLabel:"🧭 DECK",
    engineLabel:"⚙️ ENGINE",
    deck:["Cadet","Officer","Master","Captain"],
    engine:["Oiler","Motorman","Engine Off.","Chief Eng."],
  },
  es:{
    back:"◀ Volver",
    musicQ:"¿ACTIVAR MÚSICA?",
    musicDesc:"Música marítima dinámica para acompañar tu viaje hacia la excelencia náutica.",
    musicYes:"🎵 SÍ, ACTIVAR",
    musicNo:"No gracias, sin sonido",
    bridgeTitle:"ELEGISTE EL CAMINO CORRECTO",
    bridgeText:"Todo gran marino empezó desde abajo. Ya sea cadete en cubierta o engrasador en la sala de máquinas, el primer paso es siempre el mismo. Creemos tu cuenta para que tu viaje comience de verdad.",
    bridgeBtn:"⚓ CREAR MI CUENTA",
    deckLabel:"🧭 CUBIERTA",
    engineLabel:"⚙️ MÁQUINAS",
    deck:["Cadete","Oficial","Contramaestre","Capitán"],
    engine:["Engrasador","Mecánico","Of. Máquinas","Jefe Máq."],
  },
  pt:{
    back:"◀ Voltar",
    musicQ:"ATIVAR MÚSICA?",
    musicDesc:"Música marítima dinâmica para acompanhar sua jornada rumo à excelência náutica.",
    musicYes:"🎵 SIM, ATIVAR",
    musicNo:"Não obrigado, sem som",
    bridgeTitle:"VOCÊ ESCOLHEU O CAMINHO CERTO",
    bridgeText:"Todo grande marinheiro começou de baixo. Seja cadete no convés ou oiler na sala de máquinas, o primeiro passo é sempre o mesmo. Vamos criar sua conta para que sua viagem comece de verdade.",
    bridgeBtn:"⚓ CRIAR MINHA CONTA",
    deckLabel:"🧭 CONVÉS",
    engineLabel:"⚙️ MÁQUINAS",
    deck:["Cadete","Oficial","Mestre","Capitão"],
    engine:["Oiler","Mecânico","Of. Máquinas","Chefe Máq."],
  },
};

// ── SHARED ────────────────────────────────────
function Stars() {
  const s=Array.from({length:40},()=>({
    x:Math.random()*100,y:Math.random()*100,
    sz:Math.random()>0.7?2.5:1.5,
    dur:2+Math.random()*4,delay:Math.random()*6,
  }));
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
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.82)}to{opacity:1;transform:scale(1)}}
        @keyframes shimmer{0%{left:-100%}100%{left:200%}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes barA{from{height:20%}to{height:90%}}
        @keyframes slowSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes glowPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      `}</style>
    </>
  );
}

function Screen({children}) {
  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",
      overflowX:"hidden",position:"relative",
    }}>
      <Stars/>
      {children}
    </div>
  );
}

function TopBar({onBack,backLabel,step,total}) {
  const pct=((step-1)/(total-1))*100;
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
        <div style={{height:"100%",borderRadius:3,
          width:`${pct}%`,
          background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,
          transition:"width 0.5s ease"}}/>
      </div>
      <span style={{fontSize:11,color:C.muted,
        fontFamily:"'Cinzel',serif",letterSpacing:1,flexShrink:0}}>
        {step}/{total}
      </span>
    </div>
  );
}

function PBtn({onClick,children}) {
  return (
    <button onClick={onClick} style={{
      width:"100%",padding:"16px 0",border:"none",borderRadius:16,
      background:`linear-gradient(135deg,${C.blue},${C.gold})`,
      fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,
      letterSpacing:2,color:C.white,cursor:"pointer",
      boxShadow:"0 8px 32px rgba(26,111,212,0.4)",
      position:"relative",overflow:"hidden",
    }}>
      <span style={{position:"relative",zIndex:1}}>{children}</span>
      <div style={{position:"absolute",top:0,left:"-100%",
        width:"60%",height:"100%",
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
        animation:"shimmer 3s ease-in-out infinite 1s"}}/>
    </button>
  );
}

function SBtn({onClick,children}) {
  return (
    <button onClick={onClick} style={{
      width:"100%",padding:"13px 0",
      border:"1px solid rgba(255,255,255,0.18)",
      borderRadius:16,background:"transparent",
      fontFamily:"'Nunito',sans-serif",fontSize:14,
      fontWeight:600,color:C.muted,cursor:"pointer",
    }}>{children}</button>
  );
}

function MaritimeLogo({size=70}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="42" stroke={C.gold} strokeWidth="2.5" fill="none" opacity="0.4"/>
      {[0,45,90,135,180,225,270,315].map((a,i)=>{
        const r=a*Math.PI/180;
        return <line key={i}
          x1={50+18*Math.sin(r)} y1={50-18*Math.cos(r)}
          x2={50+40*Math.sin(r)} y2={50-40*Math.cos(r)}
          stroke={C.gold2} strokeWidth="2" strokeLinecap="round" opacity="0.55"/>;
      })}
      <circle cx="50" cy="50" r="18" stroke={C.gold} strokeWidth="2" fill={C.navy3}/>
      <circle cx="50" cy="39" r="4.5" stroke={C.blue2} strokeWidth="2" fill="none"/>
      <line x1="50" y1="43" x2="50" y2="61" stroke={C.blue2} strokeWidth="2"/>
      <line x1="41" y1="49" x2="59" y2="49" stroke={C.blue2} strokeWidth="2"/>
      <path d="M41 61 Q37 56 40 52" stroke={C.blue2} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M59 61 Q63 56 60 52" stroke={C.blue2} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M41 61 Q50 66 59 61" stroke={C.blue2} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ══════════════════════════════════════════════
//  S1 — SPLASH
// ══════════════════════════════════════════════
export function SplashS1({onDone, lang="fr"}) {
  const [pct,setPct]=useState(0);
  const [phase,setPhase]=useState(0);

  useEffect(()=>{
    const iv=setInterval(()=>{
      setPct(p=>{if(p>=100){clearInterval(iv);return 100;}return p+1.4;});
    },48);
    return ()=>clearInterval(iv);
  },[]);

  useEffect(()=>{
    if(pct>=100) setTimeout(()=>onDone(),450);
    if(pct>=25) setPhase(1);
    if(pct>=60) setPhase(2);
    if(pct>=85) setPhase(3);
  },[pct]);

  const txt = pct<25 ? "INITIALISATION..."
    : pct<60 ? "CHARGEMENT MODULES STCW..."
    : pct<85 ? "PRÉPARATION COURS IMO..."
    : "APPAREILLAGE IMMINENT...";

  return (
    <Screen>
      <div style={{
        minHeight:"100vh",display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",
        padding:"40px 24px",textAlign:"center",gap:26,
        position:"relative",zIndex:1,
      }}>
        {/* BG glow */}
        <div style={{
          position:"absolute",top:"35%",left:"50%",
          width:300,height:300,borderRadius:"50%",
          background:`radial-gradient(circle,${C.blue}28 0%,transparent 70%)`,
          animation:"glowPulse 3s ease-in-out infinite",
          pointerEvents:"none",
        }}/>

        {/* Logo box */}
        <div style={{
          width:110,height:110,borderRadius:30,
          background:`linear-gradient(135deg,${C.navy3},#112244)`,
          border:`2px solid ${C.gold}55`,
          boxShadow:"0 16px 48px rgba(26,111,212,0.35)",
          display:"flex",alignItems:"center",justifyContent:"center",
          animation:"scaleIn 0.8s ease 0.2s both",
          position:"relative",zIndex:1,
        }}>
          <MaritimeLogo size={70}/>
        </div>

        {/* Name */}
        <div style={{animation:"fadeUp 0.8s ease 0.5s both",
          position:"relative",zIndex:1}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:9,
            letterSpacing:5,color:C.gold,marginBottom:10}}>
            CERTIFIÉE IMO / STCW
          </div>
          <div style={{
            fontFamily:"'Cinzel',serif",fontWeight:900,lineHeight:1.15,
            background:`linear-gradient(135deg,${C.white} 30%,${C.gold2} 100%)`,
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
          }}>
            <div style={{fontSize:36}}>MARITIME</div>
            <div style={{fontSize:30}}>ACADEMY</div>
            <div style={{fontSize:22,letterSpacing:8}}>P R O</div>
          </div>
        </div>

        {/* Slogan */}
        {phase>=1&&(
          <div style={{fontSize:13,color:C.muted,letterSpacing:1,
            fontStyle:"italic",animation:"fadeUp 0.6s ease both"}}>
            {lang==="en"?"Complete maritime training — deck and engine"
              :lang==="es"?"Formación marítima completa — puente y máquinas"
              :lang==="pt"?"Formação marítima completa — convés e máquinas"
              :"La formation maritime complète — pont et machine"}
          </div>
        )}

        {/* Progress bar */}
        <div style={{width:"75%",maxWidth:260,position:"relative",zIndex:1,
          animation:"fadeUp 0.8s ease 0.8s both"}}>
          <div style={{height:3,borderRadius:3,
            background:"rgba(255,255,255,0.07)",overflow:"hidden",marginBottom:10}}>
            <div style={{height:"100%",borderRadius:3,width:`${pct}%`,
              background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,
              transition:"width 0.08s linear",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,bottom:0,width:"40%",
                background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)",
                animation:"shimmer 1.5s ease-in-out infinite"}}/>
            </div>
          </div>
          <div style={{fontSize:10,color:C.muted,letterSpacing:2}}>{txt}</div>
        </div>

        {/* Compass decoration */}
        {phase>=2&&(
          <div style={{fontSize:28,opacity:0.18,
            position:"absolute",bottom:60,right:32,
            animation:"slowSpin 20s linear infinite"}}>🧭</div>
        )}
      </div>
    </Screen>
  );
}

// ══════════════════════════════════════════════
//  S3 — MUSIC
// ══════════════════════════════════════════════
export function MusicS3({lang="fr",onYes,onNo,onBack}) {
  const t=T[lang]||T.fr;
  const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const bars=[0.4,0.8,0.5,1,0.6,0.9,0.4,0.75,0.55,0.85,0.5,0.7];

  return (
    <Screen>
      <TopBar onBack={onBack||onNo} backLabel={t.back} step={3} total={8}/>
      <div style={{
        minHeight:"calc(100vh - 54px)",
        display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",
        padding:"32px 24px",gap:22,
        position:"relative",zIndex:1,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",
        transition:"all 0.5s ease",
      }}>
        {/* Musical note */}
        <div style={{fontSize:72,
          animation:"floatY 2s ease-in-out infinite",
          filter:`drop-shadow(0 0 24px ${C.blue2}88)`}}>🎵</div>

        {/* Divider */}
        <div style={{height:1,width:"80%",maxWidth:320,
          background:`linear-gradient(90deg,transparent,${C.gold}55,${C.blue2}55,transparent)`}}/>

        <div style={{fontFamily:"'Cinzel',serif",fontSize:20,
          fontWeight:700,color:C.white,letterSpacing:2,
          textAlign:"center"}}>{t.musicQ}</div>

        {/* Description */}
        <div style={{
          background:"rgba(13,31,60,0.72)",
          border:`1px solid ${C.border}`,
          borderRadius:20,padding:"18px 16px",
          maxWidth:380,textAlign:"center",
        }}>
          <div style={{fontSize:14,color:C.muted,lineHeight:1.8}}>
            {t.musicDesc}
          </div>
        </div>

        {/* Animated bars */}
        <div style={{display:"flex",alignItems:"flex-end",gap:4,height:44}}>
          {bars.map((h,i)=>(
            <div key={i} style={{
              width:7,borderRadius:4,
              background:`linear-gradient(to top,${C.blue},${C.gold2})`,
              animation:`barA ${0.3+i*0.07}s ease-in-out ${i*0.06}s infinite alternate`,
              height:`${h*100}%`,
            }}/>
          ))}
        </div>

        {/* Buttons */}
        <div style={{width:"100%",maxWidth:400,
          display:"flex",flexDirection:"column",gap:12}}>
          <PBtn onClick={onYes}>{t.musicYes}</PBtn>
          <SBtn onClick={onNo}>{t.musicNo}</SBtn>
        </div>
      </div>
    </Screen>
  );
}

// ══════════════════════════════════════════════
//  S5 — BRIDGE
// ══════════════════════════════════════════════
export function BridgeS5({lang="fr",onNext,onBack}) {
  const t=T[lang]||T.fr;
  const [vis,setVis]=useState(false);
  const [phase,setPhase]=useState(0);

  useEffect(()=>{
    setTimeout(()=>setVis(true),80);
    setTimeout(()=>setPhase(1),400);
    setTimeout(()=>setPhase(2),800);
  },[]);

  return (
    <Screen>
      <TopBar onBack={onBack} backLabel={t.back} step={5} total={8}/>
      <div style={{
        minHeight:"calc(100vh - 54px)",
        display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",
        padding:"32px 24px",gap:24,
        position:"relative",zIndex:1,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",
        transition:"all 0.5s ease",
      }}>
        {/* Anchor animated */}
        <div style={{
          fontSize:72,opacity:0.9,
          animation:"slowSpin 14s linear infinite",
          filter:`drop-shadow(0 4px 24px ${C.gold}66)`,
        }}>⚓</div>

        {/* Main card */}
        <div style={{
          background:"rgba(13,31,60,0.88)",
          border:`1px solid ${C.gold}44`,
          borderRadius:24,padding:"26px 22px",
          maxWidth:420,width:"100%",
          textAlign:"center",
          boxShadow:"0 16px 48px rgba(201,146,42,0.1)",
          opacity:phase>=1?1:0,
          transform:phase>=1?"translateY(0)":"translateY(16px)",
          transition:"all 0.6s ease",
        }}>
          {/* Title */}
          <div style={{
            fontFamily:"'Cinzel',serif",fontSize:20,
            fontWeight:700,color:C.white,
            letterSpacing:1,marginBottom:16,
          }}>{t.bridgeTitle}</div>

          {/* Divider */}
          <div style={{height:1,margin:"0 0 16px",
            background:`linear-gradient(90deg,transparent,${C.gold}55,${C.blue2}55,transparent)`}}/>

          {/* Text */}
          <div style={{
            fontSize:15,color:C.muted,
            lineHeight:1.9,whiteSpace:"pre-line",
          }}>{t.bridgeText}</div>
        </div>

        {/* Maritime progress icons */}
        {phase>=2&&(
          <div style={{
            display:"flex",flexDirection:"column",gap:10,
            opacity:0.7,alignItems:"center",
            animation:"fadeUp 0.6s ease both",
          }}>
            {[
              {label:t.deckLabel,icons:["⛵","🧭","🔱","👑"],names:t.deck},
              {label:t.engineLabel,icons:["🛢️","⚙️","🛠️","👑"],names:t.engine},
            ].map((row,ri)=>(
              <div key={ri} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <span style={{fontSize:9,color:C.gold,letterSpacing:1,fontWeight:700}}>{row.label}</span>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  {row.icons.map((ic,i)=>(
                    <React.Fragment key={i}>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                        <span style={{fontSize:18}}>{ic}</span>
                        <span style={{fontSize:8,color:C.muted,letterSpacing:0.3}}>{row.names[i]}</span>
                      </div>
                      {i<row.icons.length-1&&<span style={{fontSize:12,color:C.muted}}>→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{
          width:"100%",maxWidth:420,
          opacity:phase>=2?1:0,
          transition:"opacity 0.6s ease 0.2s",
        }}>
          <PBtn onClick={onNext}>{t.bridgeBtn}</PBtn>
        </div>
      </div>
    </Screen>
  );
}

// ══════════════════════════════════════════════
//  DEFAULT EXPORT — pour test dans Claude
// ══════════════════════════════════════════════
export default function Bundle() {
  const [screen,setScreen]=useState("splash");
  const [lang]=useState("fr");
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Nunito:wght@400;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        html,body{margin:0;padding:0;background:#060e1a;}
        button{-webkit-tap-highlight-color:transparent;}
        button:active{opacity:0.85;transform:scale(0.98);}
      `}</style>
      {screen==="splash" && <SplashS1 onDone={()=>setScreen("music")}/>}
      {screen==="music"  && <MusicS3 lang={lang} onYes={()=>setScreen("bridge")} onNo={()=>setScreen("bridge")}/>}
      {screen==="bridge" && <BridgeS5 lang={lang} onNext={()=>alert("→ S6 Register")} onBack={()=>setScreen("music")}/>}
    </>
  );
}
