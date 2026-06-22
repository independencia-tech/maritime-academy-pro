import { useState, useEffect } from "react";
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
    back:"◀ Retour",
    title:"MON COMPTE",
    sub:"Rejoins Maritime Academy Pro gratuitement",
    nameLabel:"Prénom ou nom d'utilisateur",
    namePh:"Ex: Jean-Pierre, Capitaine...",
    emailLabel:"Adresse email",
    emailPh:"jean.pierre@email.com",
    passLabel:"Mot de passe",
    passPh:"Minimum 6 caractères",
    confirmLabel:"Confirmer le mot de passe",
    confirmPh:"Répète ton mot de passe",
    cguText:"J'accepte les",
    cguLink:"conditions d'utilisation",
    cguAnd:"et la",
    cguPrivacy:"politique de confidentialité",
    orWith:"OU",
    googleBtn:"Continuer avec Google",
    regBtn:"🚀 CRÉER MON COMPTE",
    alreadyAcc:"Déjà un compte ?",
    signIn:"Se connecter",
    forgotPass:"Mot de passe oublié ?",
    alreadyNote:"Déjà inscrit ? Tu seras contacté(e) au lancement 🚀",
    errName:"Le prénom est requis",
    errEmail:"L'email est requis",
    errEmailInvalid:"Email invalide",
    errPass:"Minimum 6 caractères",
    errConfirm:"Les mots de passe ne correspondent pas",
    errCGU:"Tu dois accepter les conditions",
    passWeak:"Faible", passMed:"Moyen", passStrong:"Fort",
    hintName:"✓ Nom valide",
    hintEmail:"✓ Email valide",
    hintPass:"✓ Mot de passe fort",
    hintConfirm:"✓ Mots de passe identiques",
    errEmailTaken:"Cet email est déjà utilisé. Essaie de te connecter.",
    errSignup:"Une erreur est survenue. Réessaie.",
    errGoogle:"Erreur de connexion avec Google. Réessaie.",
    resetSendBtn:"Envoyer le lien",
    resetSending:"Envoi...",
    resetSent:"✓ Email envoyé ! Vérifie ta boîte de réception.",
    resetPh:"Ton adresse email",
    resetErrEmpty:"Indique ton email",
    cancel:"Annuler",
  },
  en:{
    back:"◀ Back",
    title:"MY ACCOUNT",
    sub:"Join Maritime Academy Pro for free",
    nameLabel:"First name or username",
    namePh:"E.g: John, Captain...",
    emailLabel:"Email address",
    emailPh:"john.smith@email.com",
    passLabel:"Password",
    passPh:"Minimum 6 characters",
    confirmLabel:"Confirm password",
    confirmPh:"Repeat your password",
    cguText:"I agree to the",
    cguLink:"terms of service",
    cguAnd:"and the",
    cguPrivacy:"privacy policy",
    orWith:"OR",
    googleBtn:"Continue with Google",
    regBtn:"🚀 CREATE MY ACCOUNT",
    alreadyAcc:"Already have an account?",
    signIn:"Sign in",
    forgotPass:"Forgot password?",
    alreadyNote:"Already registered? You will be contacted at launch 🚀",
    errName:"First name is required",
    errEmail:"Email is required",
    errEmailInvalid:"Invalid email",
    errPass:"Minimum 6 characters",
    errConfirm:"Passwords do not match",
    errCGU:"You must accept the terms",
    passWeak:"Weak", passMed:"Medium", passStrong:"Strong",
    hintName:"✓ Valid name",
    hintEmail:"✓ Valid email",
    hintPass:"✓ Strong password",
    hintConfirm:"✓ Passwords match",
    errEmailTaken:"This email is already in use. Try signing in.",
    errSignup:"Something went wrong. Please try again.",
    errGoogle:"Google sign-in error. Please try again.",
    resetSendBtn:"Send reset link",
    resetSending:"Sending...",
    resetSent:"✓ Email sent! Check your inbox.",
    resetPh:"Your email address",
    resetErrEmpty:"Enter your email",
    cancel:"Cancel",
  },
  es:{
    back:"◀ Volver",
    title:"MI CUENTA",
    sub:"Únete a Maritime Academy Pro gratis",
    nameLabel:"Nombre o nombre de usuario",
    namePh:"Ej: Juan, Capitán...",
    emailLabel:"Correo electrónico",
    emailPh:"juan.perez@email.com",
    passLabel:"Contraseña",
    passPh:"Mínimo 6 caracteres",
    confirmLabel:"Confirmar contraseña",
    confirmPh:"Repite tu contraseña",
    cguText:"Acepto los",
    cguLink:"términos de uso",
    cguAnd:"y la",
    cguPrivacy:"política de privacidad",
    orWith:"O",
    googleBtn:"Continuar con Google",
    regBtn:"🚀 CREAR MI CUENTA",
    alreadyAcc:"¿Ya tienes cuenta?",
    signIn:"Iniciar sesión",
    forgotPass:"¿Olvidaste tu contraseña?",
    alreadyNote:"¿Ya registrado? Serás contactado en el lanzamiento 🚀",
    errName:"El nombre es obligatorio",
    errEmail:"El correo es obligatorio",
    errEmailInvalid:"Correo no válido",
    errPass:"Mínimo 6 caracteres",
    errConfirm:"Las contraseñas no coinciden",
    errCGU:"Debes aceptar los términos",
    passWeak:"Débil", passMed:"Regular", passStrong:"Fuerte",
    hintName:"✓ Nombre válido",
    hintEmail:"✓ Correo válido",
    hintPass:"✓ Contraseña fuerte",
    hintConfirm:"✓ Contraseñas iguales",
    errEmailTaken:"Este correo ya está en uso. Intenta iniciar sesión.",
    errSignup:"Ocurrió un error. Inténtalo de nuevo.",
    errGoogle:"Error al conectar con Google. Inténtalo de nuevo.",
    resetSendBtn:"Enviar enlace",
    resetSending:"Enviando...",
    resetSent:"✓ ¡Email enviado! Revisa tu bandeja de entrada.",
    resetPh:"Tu correo electrónico",
    resetErrEmpty:"Indica tu correo",
    cancel:"Cancelar",
  },
  pt:{
    back:"◀ Voltar",
    title:"MINHA CONTA",
    sub:"Junte-se ao Maritime Academy Pro gratuitamente",
    nameLabel:"Nome ou nome de usuário",
    namePh:"Ex: João, Capitão...",
    emailLabel:"Endereço de email",
    emailPh:"joao.silva@email.com",
    passLabel:"Senha",
    passPh:"Mínimo 6 caracteres",
    confirmLabel:"Confirmar senha",
    confirmPh:"Repita sua senha",
    cguText:"Aceito os",
    cguLink:"termos de uso",
    cguAnd:"e a",
    cguPrivacy:"política de privacidade",
    orWith:"OU",
    googleBtn:"Continuar com Google",
    regBtn:"🚀 CRIAR MINHA CONTA",
    alreadyAcc:"Já tem uma conta?",
    signIn:"Entrar",
    forgotPass:"Esqueceu a senha?",
    alreadyNote:"Já inscrito? Você será contactado no lançamento 🚀",
    errName:"O nome é obrigatório",
    errEmail:"O email é obrigatório",
    errEmailInvalid:"Email inválido",
    errPass:"Mínimo 6 caracteres",
    errConfirm:"As senhas não correspondem",
    errCGU:"Você deve aceitar os termos",
    passWeak:"Fraca", passMed:"Média", passStrong:"Forte",
    hintName:"✓ Nome válido",
    hintEmail:"✓ Email válido",
    hintPass:"✓ Senha forte",
    hintConfirm:"✓ Senhas iguais",
    errEmailTaken:"Este email já está em uso. Tente entrar.",
    errSignup:"Ocorreu um erro. Tente novamente.",
    errGoogle:"Erro ao conectar com o Google. Tente novamente.",
    resetSendBtn:"Enviar link",
    resetSending:"Enviando...",
    resetSent:"✓ Email enviado! Verifique sua caixa de entrada.",
    resetPh:"Seu endereço de email",
    resetErrEmpty:"Informe seu email",
    cancel:"Cancelar",
  },
};

function getStrength(pass: string) {
  if(!pass||pass.length<3) return 0;
  let score=0;
  if(pass.length>=6) score++;
  if(pass.length>=10) score++;
  if(/[A-Z]/.test(pass)) score++;
  if(/[0-9]/.test(pass)) score++;
  if(/[^A-Za-z0-9]/.test(pass)) score++;
  return Math.min(score,3);
}

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
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
        @keyframes checkBounce{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}
        @keyframes glowPulse{0%,100%{opacity:.5}50%{opacity:1}}
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

function TopBar({onBack,backLabel}:{onBack:()=>void;backLabel:string}) {
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
      <div style={{
        flex:1,height:3,borderRadius:3,
        background:"rgba(255,255,255,0.07)",overflow:"hidden",
      }}>
        <div style={{
          height:"100%",borderRadius:3,width:"75%",
          background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,
        }}/>
      </div>
      <span style={{fontSize:11,color:C.muted,
        fontFamily:"'Cinzel',serif",letterSpacing:1}}>6/8</span>
    </div>
  );
}

function Field({label,type,placeholder,value,onChange,error,hint,suffix}:any) {
  const [show,setShow]=useState(false);
  const isPass=type==="password";
  const inputType=isPass&&show?"text":type;

  return (
    <div>
      <label style={{
        display:"block",fontSize:10,fontWeight:700,
        letterSpacing:2,color:error?C.red:hint?C.green:C.muted,
        textTransform:"uppercase",marginBottom:7,
        transition:"color 0.2s",
      }}>{label}</label>
      <div style={{position:"relative"}}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width:"100%",padding:`14px ${isPass?"48px":"16px"} 14px 16px`,
            borderRadius:14,
            background:error
              ?"rgba(192,57,43,0.08)"
              :hint
              ?"rgba(30,138,74,0.08)"
              :"rgba(255,255,255,0.07)",
            border:`1.5px solid ${error?C.red:hint?C.green:C.border}`,
            color:C.white,fontSize:14,outline:"none",
            fontFamily:"'Nunito',sans-serif",
            transition:"all 0.2s",
            animation:error?"shake 0.3s ease":"none",
          }}
        />
        {isPass&&(
          <button onClick={()=>setShow(v=>!v)} style={{
            position:"absolute",right:14,top:"50%",
            transform:"translateY(-50%)",
            background:"none",border:"none",
            color:C.muted,fontSize:16,cursor:"pointer",
            padding:4,
          }}>{show?"🙈":"👁️"}</button>
        )}
        {hint&&!error&&(
          <div style={{
            position:"absolute",right:isPass?44:14,top:"50%",
            transform:"translateY(-50%)",
            width:20,height:20,borderRadius:"50%",
            background:C.green,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:10,color:"#fff",fontWeight:700,
            animation:"checkBounce 0.3s ease",
          }}>✓</div>
        )}
      </div>
      {error&&(
        <div style={{
          display:"flex",alignItems:"center",gap:5,
          marginTop:5,fontSize:11,color:C.red,
        }}>
          <span>⚠️</span>{error}
        </div>
      )}
      {hint&&!error&&(
        <div style={{
          marginTop:5,fontSize:11,color:C.green,
        }}>{hint}</div>
      )}
      {suffix}
    </div>
  );
}

function StrengthBar({pass,t}:{pass:string;t:any}) {
  const strength=getStrength(pass);
  if(!pass) return null;
  const colors=["transparent",C.red,"#f39c12",C.green];
  const labels=["",(t||T.fr).passWeak,(t||T.fr).passMed,(t||T.fr).passStrong];
  return (
    <div style={{marginTop:7}}>
      <div style={{display:"flex",gap:4,marginBottom:4}}>
        {[1,2,3].map(i=>(
          <div key={i} style={{
            flex:1,height:3,borderRadius:3,
            background:i<=strength?colors[strength]:"rgba(255,255,255,0.1)",
            transition:"all 0.3s",
          }}/>
        ))}
      </div>
      <div style={{fontSize:10,color:colors[strength],fontWeight:700}}>
        {labels[strength]}
      </div>
    </div>
  );
}

export default function RegisterS6({
  lang="fr",
  onNext=()=>{},
  onBack=()=>{},
  setUsername=(_:string)=>{},
  onSignIn,
}:{
  lang?:string;
  onNext?:()=>void;
  onBack?:()=>void;
  setUsername?:(name:string)=>void;
  onSignIn?:()=>void;
}) {
  const t=T[lang]||T.fr;
  const [vis,setVis]=useState(false);
  const [hasSaved,setHasSaved]=useState(false);
  useEffect(()=>{
    try { setHasSaved(!!localStorage.getItem("map_status_card")); } catch {}
  },[]);
  const [form,setForm]=useState({ name:"",email:"",pass:"",confirm:"" });
  const [errors,setErrors]=useState<any>({});
  const [touched,setTouched]=useState<any>({});
  const [cgu,setCgu]=useState(false);
  const [cguError,setCguError]=useState(false);
  const [loading,setLoading]=useState(false);
  const [googleLoading,setGoogleLoading]=useState(false);

  // ── Forgot password (inline) ──────────────────────────
  const [showForgot,setShowForgot]=useState(false);
  const [resetEmail,setResetEmail]=useState("");
  const [resetError,setResetError]=useState("");
  const [resetSent,setResetSent]=useState(false);
  const [resetLoading,setResetLoading]=useState(false);

  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);

  const getHints=()=>{
    const h:any={};
    if(touched.name&&form.name.trim().length>=2&&!errors.name) h.name=t.hintName;
    if(touched.email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)&&!errors.email) h.email=t.hintEmail;
    if(touched.pass&&form.pass.length>=6&&!errors.pass) h.pass=t.hintPass;
    if(touched.confirm&&form.confirm===form.pass&&form.confirm.length>0&&!errors.confirm) h.confirm=t.hintConfirm;
    return h;
  };
  const hints=getHints();

  const validate=()=>{
    const e:any={};
    if(!form.name.trim()||form.name.trim().length<2) e.name=t.errName;
    if(!form.email.trim()) e.email=t.errEmail;
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email=t.errEmailInvalid;
    if(form.pass.length<6) e.pass=t.errPass;
    if(form.confirm!==form.pass) e.confirm=t.errConfirm;
    return e;
  };

  const onChange=(field:string)=>(ev:any)=>{
    const val=ev.target.value;
    setForm(p=>({...p,[field]:val}));
    setTouched((p:any)=>({...p,[field]:true}));
    if(errors[field]) setErrors((p:any)=>({...p,[field]:undefined}));
    if(field==="confirm"&&val!==form.pass&&val.length>0){
      setErrors((p:any)=>({...p,confirm:t.errConfirm}));
    } else if(field==="confirm"&&val===form.pass){
      setErrors((p:any)=>({...p,confirm:undefined}));
    }
  };

  const handleSubmit=async ()=>{
    const e=validate();
    if(!cgu){setCguError(true);}
    if(Object.keys(e).length>0||!cgu){
      setErrors(e);
      setTouched({name:true,email:true,pass:true,confirm:true});
      return;
    }
    setLoading(true);
    const email=form.email.trim().toLowerCase();
    const name=form.name.trim();

    const { data, error } = await supabase.auth.signUp({
      email,
      password: form.pass,
      options: {
        data: { name, lang },
      },
    });

    setLoading(false);

    if (error) {
      if (/already registered|already exists/i.test(error.message)) {
        setErrors((p:any)=>({...p,email:t.errEmailTaken}));
      } else {
        setErrors((p:any)=>({...p,email:t.errSignup}));
      }
      return;
    }

    setUsername(name);
    try {
      localStorage.setItem("map_last_reg", JSON.stringify({
        name, email, lang, date:new Date().toLocaleString(),
      }));
    } catch {}

    // Project setting: email confirmation is disabled, so signUp()
    // returns an active session immediately (data.session is set).
    // MaritimeApp's onAuthStateChange listener will also pick this up.
    onNext();
  };

  const handleGoogle=async ()=>{
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      setGoogleLoading(false);
      setErrors((p:any)=>({...p,email:t.errGoogle}));
    }
    // On success, the browser redirects to Google — no further code runs here.
  };

  const handleResetPassword=async ()=>{
    const email=resetEmail.trim().toLowerCase();
    if(!email){ setResetError(t.resetErrEmpty); return; }
    setResetError("");
    setResetLoading(true);
   const { error } = await supabase.auth.resetPasswordForEmail(email, {
redirectTo: "https://maritime-academy-pro.vercel.app",
});
    setResetLoading(false);
    if (error) {
      setResetError(t.errSignup);
      return;
    }
    setResetSent(true);
  };

  const allValid=
    form.name.trim().length>=2&&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)&&
    form.pass.length>=6&&
    form.confirm===form.pass&&
    cgu;

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
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",
        transition:"all 0.5s ease",
      }}>
        <div style={{maxWidth:420,margin:"0 auto"}}>

          <div style={{textAlign:"center",marginBottom:26}}>
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

            <Field
              label={t.nameLabel} type="text"
              placeholder={t.namePh}
              value={form.name} onChange={onChange("name")}
              error={errors.name} hint={hints.name}
            />

            <Field
              label={t.emailLabel} type="email"
              placeholder={t.emailPh}
              value={form.email} onChange={onChange("email")}
              error={errors.email} hint={hints.email}
            />

            <Field
              label={t.passLabel} type="password"
              placeholder={t.passPh}
              value={form.pass} onChange={onChange("pass")}
              error={errors.pass} hint={hints.pass}
              suffix={<StrengthBar pass={form.pass} t={t}/>}
            />

            <div>
              <Field
                label={t.confirmLabel} type="password"
                placeholder={t.confirmPh}
                value={form.confirm} onChange={onChange("confirm")}
                error={errors.confirm} hint={hints.confirm}
              />
              <div style={{textAlign:"right",marginTop:6}}>
                <span
                  onClick={()=>{ setShowForgot(v=>!v); setResetSent(false); setResetError(""); }}
                  style={{fontSize:11,color:C.blue2,cursor:"pointer"}}>
                  {t.forgotPass}
                </span>
              </div>

              {showForgot && (
                <div style={{
                  marginTop:10,padding:"14px",borderRadius:14,
                  background:"rgba(255,255,255,0.04)",
                  border:`1px solid ${C.border}`,
                }}>
                  {resetSent ? (
                    <div style={{fontSize:12,color:C.green,textAlign:"center"}}>
                      {t.resetSent}
                    </div>
                  ) : (
                    <>
                      <input
                        type="email"
                        placeholder={t.resetPh}
                        value={resetEmail}
                        onChange={(e)=>{ setResetEmail(e.target.value); setResetError(""); }}
                        style={{
                          width:"100%",padding:"12px 14px",borderRadius:12,
                          background:"rgba(255,255,255,0.07)",
                          border:`1.5px solid ${resetError?C.red:C.border}`,
                          color:C.white,fontSize:13,outline:"none",
                          fontFamily:"'Nunito',sans-serif",marginBottom:8,
                        }}
                      />
                      {resetError && (
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

            <div style={{
              padding:"14px 16px",borderRadius:14,
              background:cguError
                ?"rgba(192,57,43,0.08)"
                :cgu
                ?"rgba(30,138,74,0.08)"
                :"rgba(255,255,255,0.04)",
              border:`1.5px solid ${cguError?C.red:cgu?C.green:C.border}`,
              transition:"all 0.2s",
            }}>
              <div style={{
                display:"flex",alignItems:"flex-start",gap:12,cursor:"pointer",
              }}
                onClick={()=>{setCgu(v=>!v);setCguError(false);}}>
                <div style={{
                  width:22,height:22,borderRadius:6,flexShrink:0,
                  background:cgu
                    ?`linear-gradient(135deg,${C.blue},${C.gold})`
                    :"rgba(255,255,255,0.08)",
                  border:`1.5px solid ${cgu?C.gold:C.border}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  marginTop:1,transition:"all 0.2s",
                  boxShadow:cgu?`0 4px 14px rgba(201,146,42,0.3)`:"none",
                }}>
                  {cgu&&<span style={{
                    fontSize:13,color:"#fff",
                    animation:"checkBounce 0.3s ease",
                  }}>✓</span>}
                </div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.6}}>
                  {t.cguText}{" "}
                  <span style={{color:C.blue2,textDecoration:"underline",
                    cursor:"pointer"}}>{t.cguLink}</span>
                  {" "}{t.cguAnd}{" "}
                  <span style={{color:C.blue2,textDecoration:"underline",
                    cursor:"pointer"}}>{t.cguPrivacy}</span>
                  {" "}de Maritime Academy Pro.
                </div>
              </div>
              {cguError&&(
                <div style={{marginTop:6,fontSize:11,
                  color:C.red,display:"flex",gap:5,alignItems:"center"}}>
                  <span>⚠️</span>{t.errCGU}
                </div>
              )}
            </div>

            <button onClick={handleSubmit} disabled={loading} style={{
              width:"100%",padding:"17px 0",
              border:"none",borderRadius:16,
              background:allValid
                ?`linear-gradient(135deg,${C.blue},${C.gold})`
                :"rgba(26,111,212,0.25)",
              fontFamily:"'Cinzel',serif",fontSize:15,
              fontWeight:700,letterSpacing:2,
              color:allValid?C.white:"rgba(240,244,255,0.35)",
              cursor:loading?"default":allValid?"pointer":"not-allowed",
              boxShadow:allValid?"0 10px 36px rgba(26,111,212,0.4)":"none",
              transition:"all 0.3s",
              position:"relative",overflow:"hidden",
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
                  {lang==="fr"?"Création...":lang==="es"?"Creando...":lang==="pt"?"Criando...":"Creating..."}
                </span>
              ):t.regBtn}
            </button>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,0.1)"}}/>
              <span style={{fontSize:12,color:C.muted}}>{t.orWith}</span>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,0.1)"}}/>
            </div>

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
                ? (lang==="fr"?"Connexion...":lang==="es"?"Conectando...":lang==="pt"?"Conectando...":"Connecting...")
                : t.googleBtn}
            </button>

            <div style={{
              padding:"12px 16px",borderRadius:14,
              background:"rgba(77,166,255,0.08)",
              border:`1px solid ${C.blue2}33`,
              textAlign:"center",
            }}>
              <div style={{fontSize:12,color:C.blue2,lineHeight:1.6}}>
                ℹ️ {t.alreadyNote}
              </div>
            </div>

            <div style={{textAlign:"center",fontSize:13,color:C.muted}}>
              {t.alreadyAcc}{" "}
             <span onClick={()=>{ if(onSignIn) onSignIn(); }}
                style={{color:C.blue2,cursor:hasSaved?"pointer":"default",
                borderBottom:`1px solid ${C.blue2}55`,
                fontWeight:600}}>{t.signIn}</span>
            </div>

             {onSignIn && (
  <button onClick={onSignIn} style={{
                width:"100%",padding:"14px",borderRadius:14,marginTop:4,
                background:`linear-gradient(135deg,${C.blue}33,${C.gold}22)`,
                border:`1px solid ${C.blue2}66`,
                color:C.white,
                fontFamily:"'Cinzel',serif",
                fontSize:13,fontWeight:700,letterSpacing:1.5,cursor:"pointer",
              }}>🔑 {t.signIn}</button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
