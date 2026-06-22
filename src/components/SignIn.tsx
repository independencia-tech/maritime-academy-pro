import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)", red:"#c0392b",
  green:"#1e8a4a",
};

const T: any = {
  fr:{
    title:"SE CONNECTER",
    sub:"Content de te revoir sur Maritime Academy Pro",
    emailLabel:"Adresse email",
    emailPh:"jean.pierre@email.com",
    passLabel:"Mot de passe",
    passPh:"Ton mot de passe",
    signInBtn:"🔑 SE CONNECTER",
    signingIn:"Connexion...",
    orWith:"OU",
    googleBtn:"Continuer avec Google",
    noAccount:"Pas encore de compte ?",
    register:"S'inscrire",
    forgotPass:"Mot de passe oublié ?",
    resetSendBtn:"Envoyer le lien",
    resetSending:"Envoi...",
    resetSent:"✓ Email envoyé ! Vérifie ta boîte de réception.",
    resetPh:"Ton adresse email",
    resetErrEmpty:"Indique ton email",
    cancel:"Annuler",
    errEmail:"L'email est requis",
    errEmailInvalid:"Email invalide",
    errPass:"Le mot de passe est requis",
    errInvalid:"Email ou mot de passe incorrect",
    errGeneric:"Une erreur est survenue. Réessaie.",
    errGoogle:"Erreur de connexion avec Google. Réessaie.",
  },
  en:{
    title:"SIGN IN",
    sub:"Welcome back to Maritime Academy Pro",
    emailLabel:"Email address",
    emailPh:"john.smith@email.com",
    passLabel:"Password",
    passPh:"Your password",
    signInBtn:"🔑 SIGN IN",
    signingIn:"Signing in...",
    orWith:"OR",
    googleBtn:"Continue with Google",
    noAccount:"Don't have an account?",
    register:"Sign up",
    forgotPass:"Forgot password?",
    resetSendBtn:"Send reset link",
    resetSending:"Sending...",
    resetSent:"✓ Email sent! Check your inbox.",
    resetPh:"Your email address",
    resetErrEmpty:"Enter your email",
    cancel:"Cancel",
    errEmail:"Email is required",
    errEmailInvalid:"Invalid email",
    errPass:"Password is required",
    errInvalid:"Invalid email or password",
    errGeneric:"Something went wrong. Please try again.",
    errGoogle:"Google sign-in error. Please try again.",
  },
  es:{
    title:"INICIAR SESIÓN",
    sub:"Bienvenido de vuelta a Maritime Academy Pro",
    emailLabel:"Correo electrónico",
    emailPh:"juan.perez@email.com",
    passLabel:"Contraseña",
    passPh:"Tu contraseña",
    signInBtn:"🔑 INICIAR SESIÓN",
    signingIn:"Conectando...",
    orWith:"O",
    googleBtn:"Continuar con Google",
    noAccount:"¿No tienes cuenta?",
    register:"Registrarse",
    forgotPass:"¿Olvidaste tu contraseña?",
    resetSendBtn:"Enviar enlace",
    resetSending:"Enviando...",
    resetSent:"✓ ¡Email enviado! Revisa tu bandeja.",
    resetPh:"Tu correo electrónico",
    resetErrEmpty:"Indica tu correo",
    cancel:"Cancelar",
    errEmail:"El correo es obligatorio",
    errEmailInvalid:"Correo no válido",
    errPass:"La contraseña es obligatoria",
    errInvalid:"Correo o contraseña incorrectos",
    errGeneric:"Ocurrió un error. Inténtalo de nuevo.",
    errGoogle:"Error al conectar con Google. Inténtalo de nuevo.",
  },
  pt:{
    title:"ENTRAR",
    sub:"Bem-vindo de volta ao Maritime Academy Pro",
    emailLabel:"Endereço de email",
    emailPh:"joao.silva@email.com",
    passLabel:"Senha",
    passPh:"Sua senha",
    signInBtn:"🔑 ENTRAR",
    signingIn:"Entrando...",
    orWith:"OU",
    googleBtn:"Continuar com Google",
    noAccount:"Ainda não tem conta?",
    register:"Cadastrar",
    forgotPass:"Esqueceu a senha?",
    resetSendBtn:"Enviar link",
    resetSending:"Enviando...",
    resetSent:"✓ Email enviado! Verifique sua caixa.",
    resetPh:"Seu endereço de email",
    resetErrEmpty:"Informe seu email",
    cancel:"Cancelar",
    errEmail:"O email é obrigatório",
    errEmailInvalid:"Email inválido",
    errPass:"A senha é obrigatória",
    errInvalid:"Email ou senha incorretos",
    errGeneric:"Ocorreu um erro. Tente novamente.",
    errGoogle:"Erro ao conectar com o Google. Tente novamente.",
  },
};

function Stars() {
  const s=Array.from({length:35},()=>({
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
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </>
  );
}

function MaritimeLogo({size=42}:{size?:number}) {
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

export default function SignIn({
  lang="fr",
  onBack=()=>{},
  onSuccess=()=>{},
}:{
  lang?:string;
  onBack?:()=>void;
  onSuccess?:()=>void;
}) {
  const t=T[lang]||T.fr;
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [showPass,setShowPass]=useState(false);
  const [errors,setErrors]=useState<any>({});
  const [loading,setLoading]=useState(false);
  const [googleLoading,setGoogleLoading]=useState(false);

  const [showForgot,setShowForgot]=useState(false);
  const [resetEmail,setResetEmail]=useState("");
  const [resetError,setResetError]=useState("");
  const [resetSent,setResetSent]=useState(false);
  const [resetLoading,setResetLoading]=useState(false);

  const validate=()=>{
    const e:any={};
    if(!email.trim()) e.email=t.errEmail;
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email=t.errEmailInvalid;
    if(!pass) e.pass=t.errPass;
    return e;
  };

  const handleSignIn=async ()=>{
    const e=validate();
    if(Object.keys(e).length>0){ setErrors(e); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: pass,
    });
    setLoading(false);
    if(error){
      if(/invalid/i.test(error.message)){
        setErrors({ pass: t.errInvalid });
      } else {
        setErrors({ pass: t.errGeneric });
      }
      return;
    }
    onSuccess();
  };

  const handleGoogle=async ()=>{
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider:"google",
      options:{ redirectTo: window.location.origin },
    });
    if(error){
      setGoogleLoading(false);
      setErrors({ pass: t.errGoogle });
    }
  };

  const handleResetPassword=async ()=>{
    const em=resetEmail.trim().toLowerCase();
    if(!em){ setResetError(t.resetErrEmpty); return; }
    setResetError("");
    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(em, {
    redirectTo: "https://maritime-academy-pro.vercel.app",
    });
    setResetLoading(false);
    if(error){ setResetError(t.errGeneric); return; }
    setResetSent(true);
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",
      overflowX:"hidden",position:"relative",
    }}>
      <Stars/>

      {/* TOP BAR */}
      <div style={{
        position:"sticky",top:0,zIndex:100,
        background:"rgba(6,14,26,0.96)",backdropFilter:"blur(14px)",
        borderBottom:`1px solid ${C.border}`,
        height:54,display:"flex",alignItems:"center",padding:"0 16px",
      }}>
        <button onClick={onBack} style={{
          display:"flex",alignItems:"center",gap:7,
          background:"rgba(255,255,255,0.09)",
          border:"1px solid rgba(255,255,255,0.2)",
          borderRadius:10,padding:"8px 14px",
          color:C.white,fontSize:13,fontWeight:700,
          cursor:"pointer",fontFamily:"'Nunito',sans-serif",
        }}>
          {lang==="fr"?"◀ Retour":lang==="es"?"◀ Volver":lang==="pt"?"◀ Voltar":"◀ Back"}
        </button>
      </div>

      <div style={{
        padding:"32px 20px 48px",
        position:"relative",zIndex:1,
      }}>
        <div style={{maxWidth:420,margin:"0 auto"}}>

          {/* LOGO */}
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{
              width:68,height:68,borderRadius:22,margin:"0 auto 14px",
              background:`linear-gradient(135deg,${C.navy3},#112244)`,
              border:`1px solid ${C.gold}55`,
              boxShadow:`0 8px 28px rgba(26,111,212,0.25)`,
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>
              <MaritimeLogo size={44}/>
            </div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:20,
              fontWeight:700,color:C.white,marginBottom:5}}>
              {t.title}
            </div>
            <div style={{fontSize:13,color:C.muted}}>{t.sub}</div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:16}}>

            {/* EMAIL */}
            <div>
              <label style={{
                display:"block",fontSize:10,fontWeight:700,
                letterSpacing:2,color:errors.email?C.red:C.muted,
                textTransform:"uppercase",marginBottom:7,
              }}>{t.emailLabel}</label>
              <input
                type="email"
                placeholder={t.emailPh}
                value={email}
                onChange={e=>{setEmail(e.target.value); setErrors((p:any)=>({...p,email:undefined}));}}
                style={{
                  width:"100%",padding:"14px 16px",borderRadius:14,
                  background:errors.email?"rgba(192,57,43,0.08)":"rgba(255,255,255,0.07)",
                  border:`1.5px solid ${errors.email?C.red:C.border}`,
                  color:C.white,fontSize:14,outline:"none",
                  fontFamily:"'Nunito',sans-serif",
                  animation:errors.email?"shake 0.3s ease":"none",
                }}
              />
              {errors.email&&(
                <div style={{display:"flex",alignItems:"center",gap:5,
                  marginTop:5,fontSize:11,color:C.red}}>
                  <span>⚠️</span>{errors.email}
                </div>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label style={{
                display:"block",fontSize:10,fontWeight:700,
                letterSpacing:2,color:errors.pass?C.red:C.muted,
                textTransform:"uppercase",marginBottom:7,
              }}>{t.passLabel}</label>
              <div style={{position:"relative"}}>
                <input
                  type={showPass?"text":"password"}
                  placeholder={t.passPh}
                  value={pass}
                  onChange={e=>{setPass(e.target.value); setErrors((p:any)=>({...p,pass:undefined}));}}
                  style={{
                    width:"100%",padding:"14px 48px 14px 16px",borderRadius:14,
                    background:errors.pass?"rgba(192,57,43,0.08)":"rgba(255,255,255,0.07)",
                    border:`1.5px solid ${errors.pass?C.red:C.border}`,
                    color:C.white,fontSize:14,outline:"none",
                    fontFamily:"'Nunito',sans-serif",
                    animation:errors.pass?"shake 0.3s ease":"none",
                  }}
                />
                <button onClick={()=>setShowPass(v=>!v)} style={{
                  position:"absolute",right:14,top:"50%",
                  transform:"translateY(-50%)",
                  background:"none",border:"none",
                  color:C.muted,fontSize:16,cursor:"pointer",padding:4,
                }}>{showPass?"🙈":"👁️"}</button>
              </div>
              {errors.pass&&(
                <div style={{display:"flex",alignItems:"center",gap:5,
                  marginTop:5,fontSize:11,color:C.red}}>
                  <span>⚠️</span>{errors.pass}
                </div>
              )}
              {/* FORGOT PASSWORD LINK */}
              <div style={{textAlign:"right",marginTop:6}}>
                <span
                  onClick={()=>{setShowForgot(v=>!v); setResetSent(false); setResetError(""); setResetEmail(email);}}
                  style={{fontSize:11,color:C.blue2,cursor:"pointer"}}>
                  {t.forgotPass}
                </span>
              </div>

              {/* FORGOT PASSWORD INLINE */}
              {showForgot&&(
                <div style={{
                  marginTop:10,padding:"14px",borderRadius:14,
                  background:"rgba(255,255,255,0.04)",
                  border:`1px solid ${C.border}`,
                }}>
                  {resetSent?(
                    <div style={{fontSize:12,color:C.green,textAlign:"center"}}>
                      {t.resetSent}
                    </div>
                  ):(
                    <>
                      <input
                        type="email"
                        placeholder={t.resetPh}
                        value={resetEmail}
                        onChange={e=>{setResetEmail(e.target.value); setResetError("");}}
                        style={{
                          width:"100%",padding:"12px 14px",borderRadius:12,
                          background:"rgba(255,255,255,0.07)",
                          border:`1.5px solid ${resetError?C.red:C.border}`,
                          color:C.white,fontSize:13,outline:"none",
                          fontFamily:"'Nunito',sans-serif",marginBottom:8,
                        }}
                      />
                      {resetError&&(
                        <div style={{fontSize:11,color:C.red,marginBottom:8}}>{resetError}</div>
                      )}
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={handleResetPassword} disabled={resetLoading} style={{
                          flex:1,padding:"10px 0",borderRadius:10,border:"none",
                          background:`linear-gradient(135deg,${C.blue},${C.gold})`,
                          color:"#fff",fontSize:12,fontWeight:700,
                          cursor:resetLoading?"default":"pointer",
                          fontFamily:"'Nunito',sans-serif",
                        }}>{resetLoading?t.resetSending:t.resetSendBtn}</button>
                        <button onClick={()=>setShowForgot(false)} style={{
                          padding:"10px 14px",borderRadius:10,
                          background:"rgba(255,255,255,0.06)",
                          border:"1px solid rgba(255,255,255,0.15)",
                          color:C.muted,fontSize:12,cursor:"pointer",
                          fontFamily:"'Nunito',sans-serif",
                        }}>{t.cancel}</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* SIGN IN BUTTON */}
            <button onClick={handleSignIn} disabled={loading} style={{
              width:"100%",padding:"17px 0",
              border:"none",borderRadius:16,
              background:`linear-gradient(135deg,${C.blue},${C.gold})`,
              fontFamily:"'Cinzel',serif",fontSize:15,
              fontWeight:700,letterSpacing:2,
              color:C.white,
              cursor:loading?"default":"pointer",
              boxShadow:"0 10px 36px rgba(26,111,212,0.4)",
              transition:"all 0.3s",
            }}>
              {loading?(
                <span style={{display:"flex",alignItems:"center",
                  justifyContent:"center",gap:8}}>
                  <span style={{
                    width:14,height:14,borderRadius:"50%",
                    border:`2px solid rgba(255,255,255,0.3)`,
                    borderTopColor:"#fff",
                    animation:"spin 0.8s linear infinite",
                    display:"inline-block",
                  }}/>
                  {t.signingIn}
                </span>
              ):t.signInBtn}
            </button>

            {/* DIVIDER */}
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,0.1)"}}/>
              <span style={{fontSize:12,color:C.muted}}>{t.orWith}</span>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,0.1)"}}/>
            </div>

            {/* GOOGLE BUTTON */}
            <button onClick={handleGoogle} disabled={googleLoading} style={{
              width:"100%",padding:"14px",borderRadius:14,
              background:"rgba(255,255,255,0.06)",
              border:"1px solid rgba(255,255,255,0.16)",
              display:"flex",alignItems:"center",
              justifyContent:"center",gap:12,
              cursor:googleLoading?"default":"pointer",color:C.white,
              fontFamily:"'Nunito',sans-serif",
              fontSize:14,fontWeight:600,
              transition:"all 0.2s",
            }}>
              <span style={{fontSize:20}}>🔵</span>
              {googleLoading
                ?(lang==="fr"?"Connexion...":lang==="es"?"Conectando...":lang==="pt"?"Conectando...":"Connecting...")
                :t.googleBtn}
            </button>

            {/* REGISTER LINK */}
            <div style={{textAlign:"center",fontSize:13,color:C.muted,marginTop:4}}>
              {t.noAccount}{" "}
              <span onClick={onBack}
                style={{color:C.blue2,cursor:"pointer",
                borderBottom:`1px solid ${C.blue2}55`,fontWeight:600}}>
                {t.register}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
