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
    title:"NOUVEAU MOT DE PASSE",
    sub:"Choisis un nouveau mot de passe pour ton compte",
    passLabel:"Nouveau mot de passe",
    passPh:"Minimum 6 caractères",
    confirmLabel:"Confirmer le mot de passe",
    confirmPh:"Répète ton mot de passe",
    submitBtn:"✓ ENREGISTRER",
    submitting:"Enregistrement...",
    errPass:"Minimum 6 caractères",
    errConfirm:"Les mots de passe ne correspondent pas",
    errGeneric:"Une erreur est survenue. Réessaie.",
    success:"✓ Mot de passe mis à jour !",
    successSub:"Tu peux continuer vers l'application.",
    continueBtn:"Continuer",
  },
  en:{
    title:"NEW PASSWORD",
    sub:"Choose a new password for your account",
    passLabel:"New password",
    passPh:"Minimum 6 characters",
    confirmLabel:"Confirm password",
    confirmPh:"Repeat your password",
    submitBtn:"✓ SAVE",
    submitting:"Saving...",
    errPass:"Minimum 6 characters",
    errConfirm:"Passwords do not match",
    errGeneric:"Something went wrong. Please try again.",
    success:"✓ Password updated!",
    successSub:"You can continue to the app.",
    continueBtn:"Continue",
  },
  es:{
    title:"NUEVA CONTRASEÑA",
    sub:"Elige una nueva contraseña para tu cuenta",
    passLabel:"Nueva contraseña",
    passPh:"Mínimo 6 caracteres",
    confirmLabel:"Confirmar contraseña",
    confirmPh:"Repite tu contraseña",
    submitBtn:"✓ GUARDAR",
    submitting:"Guardando...",
    errPass:"Mínimo 6 caracteres",
    errConfirm:"Las contraseñas no coinciden",
    errGeneric:"Ocurrió un error. Inténtalo de nuevo.",
    success:"✓ ¡Contraseña actualizada!",
    successSub:"Puedes continuar a la aplicación.",
    continueBtn:"Continuar",
  },
  pt:{
    title:"NOVA SENHA",
    sub:"Escolha uma nova senha para sua conta",
    passLabel:"Nova senha",
    passPh:"Mínimo 6 caracteres",
    confirmLabel:"Confirmar senha",
    confirmPh:"Repita sua senha",
    submitBtn:"✓ SALVAR",
    submitting:"Salvando...",
    errPass:"Mínimo 6 caracteres",
    errConfirm:"As senhas não correspondem",
    errGeneric:"Ocorreu um erro. Tente novamente.",
    success:"✓ Senha atualizada!",
    successSub:"Você pode continuar para o aplicativo.",
    continueBtn:"Continuar",
  },
};

function Stars() {
  // SSR-safe: Math.random() must never run in the render body — it would
  // produce a different star field on the server and on the client's first
  // (hydration) render, a guaranteed mismatch every time. Same fix pattern
  // as Dashboard.tsx's already-correct Stars: fixed empty initial render on
  // both sides, real positions applied only after mount.
  const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);
  useEffect(()=>{
    setS(Array.from({length:35},()=>({
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
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
        @keyframes checkBounce{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </>
  );
}

// Precomputed compass-mark coordinates — fixes a real SSR hydration mismatch:
// Math.sin()/Math.cos() aren't guaranteed bit-identical across JS engines
// (server Node vs client browser V8 can differ in the last decimal digit).
// The 8 angles (0/45/.../315°) are fixed, not derived from any runtime/user
// data, so precomputing them once and removing the runtime trig calls
// eliminates the divergence structurally. Exact output of the formula it
// replaces (50+18*sin(r), 50-18*cos(r), 50+40*sin(r), 50-40*cos(r)) —
// verified visually identical, not an approximation.
const LOGO_COMPASS_LINES = [
  {x1:50, y1:32, x2:50, y2:10},
  {x1:62.72792206135786, y1:37.27207793864214, x2:78.2842712474619, y2:21.715728752538098},
  {x1:68, y1:50, x2:90, y2:50},
  {x1:62.72792206135786, y1:62.72792206135786, x2:78.2842712474619, y2:78.2842712474619},
  {x1:50, y1:68, x2:50.00000000000001, y2:90},
  {x1:37.27207793864214, y1:62.72792206135786, x2:21.7157287525381, y2:78.2842712474619},
  {x1:32, y1:50, x2:10, y2:50.00000000000001},
  {x1:37.27207793864214, y1:37.27207793864215, x2:21.71572875253809, y2:21.715728752538105},
];

function MaritimeLogo({size=42}:{size?:number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="42" stroke={C.gold} strokeWidth="2.5" fill="none" opacity="0.4"/>
      {LOGO_COMPASS_LINES.map((l,i)=>(
        <line key={i}
          x1={l.x1} y1={l.y1}
          x2={l.x2} y2={l.y2}
          stroke={C.gold2} strokeWidth="2" strokeLinecap="round" opacity="0.55"/>
      ))}
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

function Field({label,placeholder,value,onChange,error}:any) {
  const [show,setShow]=useState(false);
  return (
    <div>
      <label style={{
        display:"block",fontSize:10,fontWeight:700,
        letterSpacing:2,color:error?C.red:C.muted,
        textTransform:"uppercase",marginBottom:7,
      }}>{label}</label>
      <div style={{position:"relative"}}>
        <input
          type={show?"text":"password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width:"100%",padding:"14px 48px 14px 16px",
            borderRadius:14,
            background:error?"rgba(192,57,43,0.08)":"rgba(255,255,255,0.07)",
            border:`1.5px solid ${error?C.red:C.border}`,
            color:C.white,fontSize:14,outline:"none",
            fontFamily:"'Nunito',sans-serif",
            animation:error?"shake 0.3s ease":"none",
          }}
        />
        <button onClick={()=>setShow(v=>!v)} style={{
          position:"absolute",right:14,top:"50%",
          transform:"translateY(-50%)",
          background:"none",border:"none",
          color:C.muted,fontSize:16,cursor:"pointer",padding:4,
        }}>{show?"🙈":"👁️"}</button>
      </div>
      {error&&(
        <div style={{display:"flex",alignItems:"center",gap:5,
          marginTop:5,fontSize:11,color:C.red}}>
          <span>⚠️</span>{error}
        </div>
      )}
    </div>
  );
}

export default function ResetPassword({
  lang="fr",
  onDone=()=>{},
}:{
  lang?:string;
  onDone?:()=>void;
}) {
  const t=T[lang]||T.fr;
  const [pass,setPass]=useState("");
  const [confirm,setConfirm]=useState("");
  const [errors,setErrors]=useState<any>({});
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);

  const handleSubmit=async ()=>{
    const e:any={};
    if(pass.length<6) e.pass=t.errPass;
    if(confirm!==pass) e.confirm=t.errConfirm;
    if(Object.keys(e).length>0){ setErrors(e); return; }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pass });
    setLoading(false);

    if(error){
      setErrors({ pass: t.errGeneric });
      return;
    }
    setSuccess(true);
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",
      overflowX:"hidden",position:"relative",
      display:"flex",alignItems:"center",justifyContent:"center",
      padding:"24px 20px",
    }}>
      <Stars/>
      <div style={{maxWidth:420,width:"100%",position:"relative",zIndex:1}}>

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

        {success ? (
          <div style={{
            padding:"24px 20px",borderRadius:16,textAlign:"center",
            background:"rgba(30,138,74,0.1)",
            border:`1.5px solid ${C.green}`,
          }}>
            <div style={{fontSize:16,fontWeight:700,color:C.green,marginBottom:8}}>
              {t.success}
            </div>
            <div style={{fontSize:13,color:C.muted,marginBottom:20}}>
              {t.successSub}
            </div>
            <button onClick={onDone} style={{
              width:"100%",padding:"15px 0",border:"none",borderRadius:16,
              background:`linear-gradient(135deg,${C.blue},${C.gold})`,
              fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,
              letterSpacing:2,color:C.white,cursor:"pointer",
            }}>{t.continueBtn}</button>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <Field
              label={t.passLabel} placeholder={t.passPh}
              value={pass}
              onChange={(e:any)=>{setPass(e.target.value); setErrors((p:any)=>({...p,pass:undefined}));}}
              error={errors.pass}
            />
            <Field
              label={t.confirmLabel} placeholder={t.confirmPh}
              value={confirm}
              onChange={(e:any)=>{setConfirm(e.target.value); setErrors((p:any)=>({...p,confirm:undefined}));}}
              error={errors.confirm}
            />
            <button onClick={handleSubmit} disabled={loading} style={{
              width:"100%",padding:"17px 0",border:"none",borderRadius:16,
              background:`linear-gradient(135deg,${C.blue},${C.gold})`,
              fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,
              letterSpacing:2,color:C.white,
              cursor:loading?"default":"pointer",
              boxShadow:"0 10px 36px rgba(26,111,212,0.4)",
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
                  {t.submitting}
                </span>
              ):t.submitBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
