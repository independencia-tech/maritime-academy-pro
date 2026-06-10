// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

// ══════════════════════════════════════
// PREMIUM MANAGER — core logic
// Can be imported anywhere in the app
// ══════════════════════════════════════
export const PremiumManager = {

  // Check if current user has premium access
  hasAccess: () => {
    const status = localStorage.getItem("map_premium_status");
    if (!status) return false;
    const s = JSON.parse(status);
    if (s.type === "admin_granted") return true;
    if (s.type === "trial") {
      const now = Date.now();
      const expiry = s.expiry;
      if (now < expiry) return true;
      // Trial expired — clean up
      localStorage.removeItem("map_premium_status");
      return false;
    }
    if (s.type === "promo") return true;
    if (s.type === "stripe") return true;
    return false;
  },

  // Get premium status details
  getStatus: () => {
    const raw = localStorage.getItem("map_premium_status");
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s.type === "trial") {
      const remaining = Math.max(0, s.expiry - Date.now());
      const days = Math.ceil(remaining / (1000*60*60*24));
      return { ...s, daysLeft: days, expired: remaining <= 0 };
    }
    return s;
  },

  // Start 7-day free trial
  startTrial: (userId) => {
    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const status = { type:"trial", expiry, startedAt: Date.now(), userId };
    localStorage.setItem("map_premium_status", JSON.stringify(status));
    return status;
  },

  // Activate via promo code
  activatePromo: (code) => {
    const codes = JSON.parse(localStorage.getItem("map_promo_codes") || "[]");
    const promo = codes.find(c => c.code === code.toUpperCase() && c.active);
    if (!promo) return { success: false, error: "Code invalide ou expiré" };
    if (promo.usedBy && promo.usedBy.length >= promo.maxUses) {
      return { success: false, error: "Code déjà utilisé au maximum" };
    }
    // Mark used
    const updated = codes.map(c => c.code === promo.code
      ? { ...c, usedBy: [...(c.usedBy||[]), Date.now()] }
      : c
    );
    localStorage.setItem("map_promo_codes", JSON.stringify(updated));
    const status = { type:"promo", code, activatedAt: Date.now() };
    localStorage.setItem("map_premium_status", JSON.stringify(status));
    return { success: true, promo };
  },

  // Admin: grant premium to user
  adminGrant: (userId) => {
    const status = { type:"admin_granted", grantedAt: Date.now(), userId };
    localStorage.setItem("map_premium_status", JSON.stringify(status));
  },

  // Admin: revoke premium
  adminRevoke: () => {
    localStorage.removeItem("map_premium_status");
  },

  // Check if trial already used
  trialUsed: () => {
    return !!localStorage.getItem("map_trial_used");
  },

  markTrialUsed: () => {
    localStorage.setItem("map_trial_used", "1");
  },
};

// ══════════════════════════════════════
// TRIAL BANNER — show inside app
// ══════════════════════════════════════
export function TrialBanner({ lang="fr", onUpgrade=()=>{} }) {
  const status = PremiumManager.getStatus();
  if (!status || status.type !== "trial") return null;
  const days = status.daysLeft || 0;
  const isLast = days <= 1;

  const labels = {
    fr: days > 0
      ? `⭐ Essai gratuit — ${days} jour${days>1?"s":""} restant${days>1?"s":""}`
      : "⚠️ Essai expiré",
    en: days > 0
      ? `⭐ Free trial — ${days} day${days>1?"s":""} remaining`
      : "⚠️ Trial expired",
    es: days > 0
      ? `⭐ Prueba gratuita — ${days} día${days>1?"s":""} restante${days>1?"s":""}`
      : "⚠️ Prueba expirada",
    pt: days > 0
      ? `⭐ Período de teste — ${days} dia${days>1?"s":""} restante${days>1?"s":""}`
      : "⚠️ Período expirado",
  };

  const ctaLabels = {
    fr:"Passer Premium", en:"Go Premium", es:"Ir Premium", pt:"Ir Premium"
  };

  return (
    <div style={{
      padding:"8px 14px",
      background: isLast
        ? "rgba(192,57,43,0.15)"
        : "rgba(201,146,42,0.12)",
      border:`1px solid ${isLast?C.red:C.gold}44`,
      borderRadius:12,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      marginBottom:10,
    }}>
      <div style={{fontSize:11,color:isLast?C.red:C.gold2,fontWeight:600}}>
        {labels[lang]||labels.fr}
      </div>
      <button onClick={onUpgrade} style={{
        padding:"4px 10px", borderRadius:8, fontSize:10,
        background: isLast ? C.red : C.gold,
        border:"none", color:C.white, cursor:"pointer", fontWeight:700,
        fontFamily:"'Cinzel',serif",
      }}>
        {ctaLabels[lang]||ctaLabels.fr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// UPGRADE MODAL
// ══════════════════════════════════════
export function UpgradeModal({ lang="fr", onClose=()=>{}, onTrialStart=()=>{} }) {
  const [promoCode, setPromoCode] = useState("");
  const [promoMsg, setPromoMsg] = useState("");
  const [promoOk, setPromoOk] = useState(false);
  const trialUsed = PremiumManager.trialUsed();
  const alreadyPremium = PremiumManager.hasAccess();

  const handlePromo = () => {
    if (!promoCode.trim()) return;
    const result = PremiumManager.activatePromo(promoCode);
    if (result.success) {
      setPromoOk(true);
      setPromoMsg(lang==="fr"?"✅ Code validé ! Premium activé !":lang==="en"?"✅ Code valid! Premium activated!":"✅ ¡Código válido! ¡Premium activado!");
      setTimeout(()=>{ onClose(); window.location.reload(); }, 1500);
    } else {
      setPromoMsg(`❌ ${result.error}`);
    }
  };

  const handleTrial = () => {
    PremiumManager.startTrial("user_"+Date.now());
    PremiumManager.markTrialUsed();
    onTrialStart();
    onClose();
  };

  const labels = {
    fr:{
      title:"Passer à Premium ⭐",
      subtitle:"Accède à tout le contenu MAP",
      trial:"🎁 Essai gratuit 7 jours",
      trialDesc:"Accès complet · Aucune carte requise · Annulable à tout moment",
      trialUsed:"Essai déjà utilisé",
      promo:"Tu as un code promo ?",
      promoPlaceholder:"Entrer le code...",
      promoBtn:"Valider",
      stripe:"💳 Premium 9$/mois",
      stripeDesc:"Accès à tous les modules · Annulable à tout moment",
      stripeCta:"Bientôt disponible — Laisser mon email",
      close:"Fermer",
    },
    en:{
      title:"Go Premium ⭐",
      subtitle:"Access all MAP content",
      trial:"🎁 7-day free trial",
      trialDesc:"Full access · No card required · Cancel anytime",
      trialUsed:"Trial already used",
      promo:"Have a promo code?",
      promoPlaceholder:"Enter code...",
      promoBtn:"Validate",
      stripe:"💳 Premium $9/month",
      stripeDesc:"Access to all modules · Cancel anytime",
      stripeCta:"Coming soon — Leave my email",
      close:"Close",
    },
    es:{
      title:"Ir Premium ⭐",
      subtitle:"Accede a todo el contenido MAP",
      trial:"🎁 Prueba gratuita 7 días",
      trialDesc:"Acceso completo · Sin tarjeta · Cancelable en cualquier momento",
      trialUsed:"Prueba ya utilizada",
      promo:"¿Tienes un código promocional?",
      promoPlaceholder:"Introduce el código...",
      promoBtn:"Validar",
      stripe:"💳 Premium 9$/mes",
      stripeDesc:"Acceso a todos los módulos · Cancelable en cualquier momento",
      stripeCta:"Próximamente — Dejar mi email",
      close:"Cerrar",
    },
    pt:{
      title:"Ir Premium ⭐",
      subtitle:"Acesso a todo o conteúdo MAP",
      trial:"🎁 Período de teste gratuito 7 dias",
      trialDesc:"Acesso completo · Sem cartão · Cancelável a qualquer momento",
      trialUsed:"Período de teste já utilizado",
      promo:"Tens um código promocional?",
      promoPlaceholder:"Inserir código...",
      promoBtn:"Validar",
      stripe:"💳 Premium 9$/mês",
      stripeDesc:"Acesso a todos os módulos · Cancelável a qualquer momento",
      stripeCta:"Em breve — Deixar o meu email",
      close:"Fechar",
    },
  };
  const L = labels[lang]||labels.fr;

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(0,0,0,0.8)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:16,
    }}>
      <div style={{
        background:`linear-gradient(160deg,${C.navy3},${C.navy2})`,
        border:`1.5px solid ${C.gold}44`,
        borderRadius:24, padding:24, maxWidth:380, width:"100%",
        maxHeight:"90vh", overflowY:"auto",
      }}>
        {/* Header */}
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:48,marginBottom:8}}>⭐</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.gold2}}>{L.title}</div>
          <div style={{fontSize:12,color:C.muted,marginTop:4}}>{L.subtitle}</div>
        </div>

        {/* Trial */}
        {!alreadyPremium && (
          <div style={{
            padding:"14px 16px", borderRadius:16, marginBottom:12,
            background: trialUsed ? "rgba(255,255,255,0.04)" : "rgba(30,138,74,0.15)",
            border:`1.5px solid ${trialUsed?"rgba(255,255,255,0.1)":C.green}`,
          }}>
            <div style={{fontSize:14,fontWeight:700,color:trialUsed?C.muted:C.green,marginBottom:4}}>{L.trial}</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.6,marginBottom:10}}>{trialUsed?L.trialUsed:L.trialDesc}</div>
            {!trialUsed && (
              <button onClick={handleTrial} style={{
                width:"100%", padding:"12px 0", borderRadius:12,
                background:`linear-gradient(135deg,${C.green},${C.teal})`,
                border:"none", color:C.white, fontSize:13, fontWeight:700,
                cursor:"pointer", fontFamily:"'Cinzel',serif", letterSpacing:1,
              }}>
                {L.trial} →
              </button>
            )}
          </div>
        )}

        {/* Promo code */}
        <div style={{
          padding:"14px 16px", borderRadius:16, marginBottom:12,
          background:"rgba(201,146,42,0.08)", border:`1px solid ${C.gold}33`,
        }}>
          <div style={{fontSize:12,fontWeight:700,color:C.gold2,marginBottom:8}}>{L.promo}</div>
          <div style={{display:"flex",gap:8}}>
            <input
              type="text"
              value={promoCode}
              onChange={e=>setPromoCode(e.target.value.toUpperCase())}
              placeholder={L.promoPlaceholder}
              style={{
                flex:1, padding:"10px 12px", borderRadius:10,
                background:"rgba(255,255,255,0.08)", border:`1px solid ${C.gold}44`,
                color:C.white, fontSize:13, fontFamily:"monospace", fontWeight:700,
                letterSpacing:2,
              }}
            />
            <button onClick={handlePromo} style={{
              padding:"10px 14px", borderRadius:10,
              background:C.gold, border:"none",
              color:C.navy, fontSize:12, fontWeight:700, cursor:"pointer",
              fontFamily:"'Cinzel',serif",
            }}>{L.promoBtn}</button>
          </div>
          {promoMsg && (
            <div style={{fontSize:11,marginTop:6,color:promoOk?C.green:C.red,fontWeight:600}}>
              {promoMsg}
            </div>
          )}
        </div>

        {/* Stripe (coming soon) */}
        <div style={{
          padding:"14px 16px", borderRadius:16, marginBottom:16,
          background:"rgba(26,111,212,0.1)", border:`1px solid ${C.blue2}33`,
          opacity:0.7,
        }}>
          <div style={{fontSize:14,fontWeight:700,color:C.blue2,marginBottom:4}}>{L.stripe}</div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.6,marginBottom:10}}>{L.stripeDesc}</div>
          <button onClick={()=>{
            const email = window.prompt(lang==="fr"?"Ton email pour être notifié :":"Your email to be notified:");
            if(email){
              const emails = JSON.parse(localStorage.getItem("map_waitlist")||"[]");
              emails.push({email,date:Date.now()});
              localStorage.setItem("map_waitlist",JSON.stringify(emails));
              alert(lang==="fr"?"✅ Noté ! Tu seras notifié quand Stripe sera disponible.":"✅ Noted! You'll be notified when Stripe is ready.");
            }
          }} style={{
            width:"100%", padding:"11px 0", borderRadius:12,
            background:"rgba(26,111,212,0.2)", border:`1px solid ${C.blue2}44`,
            color:C.blue2, fontSize:12, fontWeight:700, cursor:"pointer",
            fontFamily:"'Cinzel',serif",
          }}>
            {L.stripeCta}
          </button>
        </div>

        <button onClick={onClose} style={{
          width:"100%", padding:"12px 0", borderRadius:12,
          background:"transparent", border:`1px solid rgba(255,255,255,0.12)`,
          color:C.muted, fontSize:12, cursor:"pointer",
        }}>{L.close}</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// ADMIN PANEL — full component
// ══════════════════════════════════════
export default function AdminPanel({ onClose=()=>{} }) {
  const ADMIN_KEY = "MAP_ADMIN_2024";
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [promos, setPromos] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [newCode, setNewCode] = useState("");
  const [newMax, setNewMax] = useState(10);
  const [newPwd, setNewPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  // Load stored admin password (default: MAP_ADMIN_2024)
  const getAdminPwd = () => localStorage.getItem("map_admin_pwd") || ADMIN_KEY;

  useEffect(()=>{
    if(authed){
      // Load users from localStorage
      const allKeys = Object.keys(localStorage);
      const userList = [];
      allKeys.forEach(k=>{
        if(k.startsWith("map_user_")){
          try{ userList.push(JSON.parse(localStorage.getItem(k))); }catch(e){}
        }
      });
      // Also get current user
      const current = localStorage.getItem("map_status_card");
      if(current){
        try{
          const u = JSON.parse(current);
          if(!userList.find(x=>x.name===u.name)){
            userList.push({...u, id:"current", isCurrent:true});
          }
        }catch(e){}
      }
      setUsers(userList.length > 0 ? userList : [{
        id:"current", name:"Utilisateur actuel", isCurrent:true,
        dept: localStorage.getItem("map_dept")||"pont",
        lang: localStorage.getItem("map_lang")||"fr",
      }]);
      setPromos(JSON.parse(localStorage.getItem("map_promo_codes")||"[]"));
      setWaitlist(JSON.parse(localStorage.getItem("map_waitlist")||"[]"));
    }
  },[authed]);

  const login = () => {
    if(pwd === getAdminPwd()){
      setAuthed(true); setError("");
    } else {
      setError("❌ Mot de passe incorrect");
    }
  };

  const grantPremium = (userId) => {
    PremiumManager.adminGrant(userId);
    alert("✅ Premium activé !");
  };

  const revokePremium = () => {
    PremiumManager.adminRevoke();
    alert("✅ Premium révoqué !");
  };

  const addPromo = () => {
    if(!newCode.trim()) return;
    const code = newCode.toUpperCase().trim();
    const existing = promos.find(p=>p.code===code);
    if(existing){ alert("Code déjà existant"); return; }
    const newPromo = { code, maxUses:newMax, active:true, usedBy:[], createdAt:Date.now() };
    const updated = [...promos, newPromo];
    setPromos(updated);
    localStorage.setItem("map_promo_codes", JSON.stringify(updated));
    setNewCode("");
    alert(`✅ Code "${code}" créé !`);
  };

  const togglePromo = (code) => {
    const updated = promos.map(p=>p.code===code?{...p,active:!p.active}:p);
    setPromos(updated);
    localStorage.setItem("map_promo_codes", JSON.stringify(updated));
  };

  const deletePromo = (code) => {
    const updated = promos.filter(p=>p.code!==code);
    setPromos(updated);
    localStorage.setItem("map_promo_codes", JSON.stringify(updated));
  };

  const changePwd = () => {
    if(newPwd.length < 6){ setPwdMsg("❌ Minimum 6 caractères"); return; }
    localStorage.setItem("map_admin_pwd", newPwd);
    setNewPwd("");
    setPwdMsg("✅ Mot de passe changé !");
    setTimeout(()=>setPwdMsg(""),3000);
  };

  const premStatus = PremiumManager.getStatus();
  const hasPrem = PremiumManager.hasAccess();

  // LOGIN SCREEN
  if(!authed) return (
    <div style={{position:"fixed",inset:0,zIndex:2000,background:"rgba(0,0,0,0.95)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:`linear-gradient(160deg,${C.navy3},${C.navy2})`,border:`1.5px solid ${C.gold}44`,borderRadius:24,padding:28,maxWidth:340,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:40,marginBottom:8}}>🔒</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.gold2}}>Admin MAP</div>
          <div style={{fontSize:11,color:C.muted,marginTop:4}}>Maritime Academy Pro — Panneau de contrôle</div>
        </div>
        <input
          type="password"
          value={pwd}
          onChange={e=>setPwd(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&login()}
          placeholder="Mot de passe admin..."
          style={{width:"100%",padding:"12px 14px",borderRadius:12,background:"rgba(255,255,255,0.07)",border:`1px solid ${C.gold}44`,color:C.white,fontSize:15,textAlign:"center",boxSizing:"border-box",marginBottom:10}}
        />
        {error&&<div style={{color:C.red,fontSize:11,textAlign:"center",marginBottom:8}}>{error}</div>}
        <button onClick={login} style={{width:"100%",padding:"13px 0",borderRadius:12,background:`linear-gradient(135deg,${C.gold},${C.blue})`,border:"none",color:C.white,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif",letterSpacing:1,marginBottom:10}}>
          CONNEXION →
        </button>
        <button onClick={onClose} style={{width:"100%",padding:"10px 0",borderRadius:12,background:"transparent",border:`1px solid rgba(255,255,255,0.1)`,color:C.muted,fontSize:12,cursor:"pointer"}}>
          ← Retour
        </button>
      </div>
    </div>
  );

  // ADMIN PANEL
  return (
    <div style={{position:"fixed",inset:0,zIndex:2000,background:"rgba(0,0,0,0.97)",display:"flex",flexDirection:"column",fontFamily:"'Nunito',sans-serif"}}>
      {/* Header */}
      <div style={{background:"rgba(6,14,26,0.99)",borderBottom:`1px solid ${C.gold}33`,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onClose} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"6px 12px",color:C.white,cursor:"pointer",fontSize:12}}>← Retour</button>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:C.gold2}}>🔒 Admin MAP</div>
          <div style={{fontSize:10,color:C.muted}}>Maritime Academy Pro — Panneau de contrôle</div>
        </div>
        <div style={{fontSize:10,padding:"3px 8px",borderRadius:8,background:"rgba(30,138,74,0.2)",border:`1px solid ${C.green}33`,color:C.green}}>✅ Connecté</div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",padding:"8px 12px",gap:6,background:"rgba(6,14,26,0.8)",borderBottom:`1px solid rgba(255,255,255,0.06)`}}>
        {[
          {id:"users",icon:"👥",label:"Utilisateurs"},
          {id:"premium",icon:"⭐",label:"Premium"},
          {id:"promos",icon:"🎟️",label:"Codes promo"},
          {id:"waitlist",icon:"📧",label:"Waitlist"},
          {id:"settings",icon:"⚙️",label:"Paramètres"},
        ].map(tab_=>(
          <button key={tab_.id} onClick={()=>setTab(tab_.id)} style={{
            padding:"6px 10px",borderRadius:10,fontSize:10,cursor:"pointer",
            background:tab===tab_.id?`rgba(201,146,42,0.2)`:"rgba(255,255,255,0.04)",
            border:`1px solid ${tab===tab_.id?C.gold:"rgba(255,255,255,0.08)"}`,
            color:tab===tab_.id?C.gold2:C.muted,fontWeight:tab===tab_.id?700:400,
          }}>{tab_.icon} {tab_.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>

        {/* USERS TAB */}
        {tab==="users"&&(
          <div>
            <div style={{fontSize:12,color:C.gold2,fontWeight:700,marginBottom:12,fontFamily:"'Cinzel',serif"}}>👥 UTILISATEURS ENREGISTRÉS</div>
            <div style={{padding:"10px 14px",borderRadius:12,background:"rgba(26,111,212,0.1)",border:`1px solid ${C.blue2}33`,marginBottom:14}}>
              <div style={{fontSize:11,color:C.blue2,marginBottom:2}}>Total utilisateurs détectés</div>
              <div style={{fontSize:28,fontWeight:800,color:C.white,fontFamily:"monospace"}}>{users.length}</div>
            </div>

            {users.map((u,i)=>(
              <div key={i} style={{padding:"12px 14px",borderRadius:14,background:"rgba(255,255,255,0.04)",border:`1px solid rgba(255,255,255,0.08)`,marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <div style={{width:36,height:36,borderRadius:10,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
                    {u.dept==="machine"?"⚙️":"🧭"}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.white}}>{u.name||"Utilisateur"}</div>
                    <div style={{fontSize:10,color:C.muted}}>{u.dept||"pont"} · {u.lang||"fr"} {u.isCurrent?"· (session actuelle)":""}</div>
                  </div>
                  <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:hasPrem?"rgba(201,146,42,0.2)":"rgba(255,255,255,0.06)",border:`1px solid ${hasPrem?C.gold:"rgba(255,255,255,0.1)"}`,color:hasPrem?C.gold:C.muted}}>
                    {hasPrem?"⭐ PREMIUM":"FREE"}
                  </div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  {!hasPrem
                    ?<button onClick={()=>grantPremium(u.id||"current")} style={{flex:1,padding:"7px 0",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold2,fontSize:11,fontWeight:700,cursor:"pointer"}}>⭐ Activer Premium</button>
                    :<button onClick={revokePremium} style={{flex:1,padding:"7px 0",borderRadius:8,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}44`,color:C.red,fontSize:11,fontWeight:700,cursor:"pointer"}}>✕ Révoquer Premium</button>
                  }
                  <button onClick={()=>{PremiumManager.startTrial(u.id||"current");PremiumManager.markTrialUsed();alert("✅ Essai 7j activé !");}} style={{flex:1,padding:"7px 0",borderRadius:8,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}44`,color:C.green,fontSize:11,fontWeight:700,cursor:"pointer"}}>🎁 Essai 7j</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PREMIUM TAB */}
        {tab==="premium"&&(
          <div>
            <div style={{fontSize:12,color:C.gold2,fontWeight:700,marginBottom:12,fontFamily:"'Cinzel',serif"}}>⭐ STATUT PREMIUM ACTUEL</div>

            {/* Current status */}
            <div style={{padding:"14px 16px",borderRadius:14,background:hasPrem?"rgba(201,146,42,0.12)":"rgba(255,255,255,0.04)",border:`1.5px solid ${hasPrem?C.gold:"rgba(255,255,255,0.1)"}`,marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{fontSize:28}}>{hasPrem?"⭐":"🔓"}</span>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:hasPrem?C.gold2:C.muted}}>{hasPrem?"PREMIUM ACTIF":"COMPTE GRATUIT"}</div>
                  {premStatus&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>
                    Type : {premStatus.type}
                    {premStatus.type==="trial"&&` · ${premStatus.daysLeft}j restants`}
                    {premStatus.type==="promo"&&` · Code: ${premStatus.code}`}
                  </div>}
                </div>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>{PremiumManager.adminGrant("admin");alert("✅ Premium activé !");}} style={{flex:1,padding:"9px 0",borderRadius:10,background:`linear-gradient(135deg,${C.gold},${C.blue})`,border:"none",color:C.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>⭐ Activer Premium</button>
                <button onClick={()=>{PremiumManager.adminRevoke();alert("✅ Premium révoqué.");}} style={{flex:1,padding:"9px 0",borderRadius:10,background:"rgba(192,57,43,0.2)",border:`1px solid ${C.red}44`,color:C.red,fontSize:12,fontWeight:700,cursor:"pointer"}}>✕ Révoquer</button>
              </div>
            </div>

            {/* Trial controls */}
            <div style={{padding:"14px 16px",borderRadius:14,background:"rgba(30,138,74,0.08)",border:`1px solid ${C.green}33`,marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:700,color:C.green,marginBottom:8}}>🎁 Essai gratuit 7 jours</div>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,lineHeight:1.6}}>
                Statut essai : {PremiumManager.trialUsed()?"Déjà utilisé ✓":"Disponible 🟢"}
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>{PremiumManager.startTrial("manual");PremiumManager.markTrialUsed();alert("✅ Essai 7j activé !");}} style={{flex:1,padding:"9px 0",borderRadius:10,background:`linear-gradient(135deg,${C.green},${C.teal})`,border:"none",color:C.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>🎁 Activer essai 7j</button>
                <button onClick={()=>{localStorage.removeItem("map_trial_used");alert("✅ Essai réinitialisé.");}} style={{flex:1,padding:"9px 0",borderRadius:10,background:"rgba(255,255,255,0.06)",border:`1px solid rgba(255,255,255,0.1)`,color:C.muted,fontSize:12,cursor:"pointer"}}>↺ Reset essai</button>
              </div>
            </div>

            {/* Waitlist count */}
            <div style={{padding:"12px 14px",borderRadius:12,background:"rgba(77,166,255,0.08)",border:`1px solid ${C.blue2}22`}}>
              <div style={{fontSize:11,color:C.blue2,marginBottom:2}}>📧 Inscrits à la waitlist Stripe</div>
              <div style={{fontSize:22,fontWeight:800,color:C.white,fontFamily:"monospace"}}>{waitlist.length}</div>
            </div>
          </div>
        )}

        {/* PROMOS TAB */}
        {tab==="promos"&&(
          <div>
            <div style={{fontSize:12,color:C.gold2,fontWeight:700,marginBottom:12,fontFamily:"'Cinzel',serif"}}>🎟️ CODES PROMO</div>

            {/* Create new */}
            <div style={{padding:"14px 16px",borderRadius:14,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`,marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:700,color:C.gold2,marginBottom:10}}>+ Créer un code</div>
              <input type="text" value={newCode} onChange={e=>setNewCode(e.target.value.toUpperCase())} placeholder="Ex: MARIN2024"
                style={{width:"100%",padding:"10px 12px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${C.gold}44`,color:C.white,fontSize:14,fontFamily:"monospace",fontWeight:700,letterSpacing:2,boxSizing:"border-box",marginBottom:8}}/>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
                <div style={{fontSize:11,color:C.muted}}>Utilisations max :</div>
                <input type="number" value={newMax} onChange={e=>setNewMax(Number(e.target.value))} min={1} max={999}
                  style={{width:70,padding:"6px 8px",borderRadius:8,background:"rgba(255,255,255,0.07)",border:`1px solid ${C.gold}33`,color:C.gold2,fontSize:13,fontFamily:"monospace",fontWeight:700,textAlign:"center"}}/>
              </div>
              <button onClick={addPromo} style={{width:"100%",padding:"11px 0",borderRadius:12,background:`linear-gradient(135deg,${C.gold},${C.orange})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
                CRÉER LE CODE →
              </button>
            </div>

            {/* List */}
            {promos.length===0
              ?<div style={{textAlign:"center",padding:"20px",fontSize:12,color:C.muted}}>Aucun code créé</div>
              :promos.map((p,i)=>(
                <div key={i} style={{padding:"12px 14px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:`1px solid ${p.active?"rgba(201,146,42,0.2)":"rgba(255,255,255,0.06)"}`,marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:800,color:p.active?C.gold2:C.muted,fontFamily:"monospace",letterSpacing:2}}>{p.code}</div>
                      <div style={{fontSize:10,color:C.muted,marginTop:2}}>{p.usedBy?.length||0}/{p.maxUses} utilisations · {p.active?"Actif":"Désactivé"}</div>
                    </div>
                    <div style={{width:36,height:36,borderRadius:8,background:p.active?"rgba(30,138,74,0.2)":"rgba(192,57,43,0.15)",border:`1px solid ${p.active?C.green:C.red}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>
                      {p.active?"✅":"❌"}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>togglePromo(p.code)} style={{flex:1,padding:"7px 0",borderRadius:8,background:p.active?"rgba(192,57,43,0.15)":"rgba(30,138,74,0.15)",border:`1px solid ${p.active?C.red:C.green}44`,color:p.active?C.red:C.green,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                      {p.active?"Désactiver":"Réactiver"}
                    </button>
                    <button onClick={()=>{if(window.confirm(`Supprimer le code ${p.code} ?`))deletePromo(p.code);}} style={{padding:"7px 12px",borderRadius:8,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}33`,color:C.red,fontSize:11,cursor:"pointer"}}>🗑️</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* WAITLIST TAB */}
        {tab==="waitlist"&&(
          <div>
            <div style={{fontSize:12,color:C.gold2,fontWeight:700,marginBottom:12,fontFamily:"'Cinzel',serif"}}>📧 WAITLIST STRIPE ({waitlist.length})</div>
            {waitlist.length===0
              ?<div style={{textAlign:"center",padding:"20px",fontSize:12,color:C.muted}}>Aucun email enregistré</div>
              :waitlist.map((w,i)=>(
                <div key={i} style={{padding:"10px 14px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:12,color:C.white}}>{w.email}</div>
                  <div style={{fontSize:9,color:C.muted}}>{new Date(w.date).toLocaleDateString()}</div>
                </div>
              ))
            }
            {waitlist.length>0&&(
              <button onClick={()=>{
                const text = waitlist.map(w=>w.email).join("\n");
                navigator.clipboard?.writeText(text);
                alert("✅ Emails copiés !");
              }} style={{width:"100%",padding:"11px 0",borderRadius:12,marginTop:8,background:"rgba(77,166,255,0.1)",border:`1px solid ${C.blue2}33`,color:C.blue2,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                📋 Copier tous les emails
              </button>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab==="settings"&&(
          <div>
            <div style={{fontSize:12,color:C.gold2,fontWeight:700,marginBottom:12,fontFamily:"'Cinzel',serif"}}>⚙️ PARAMÈTRES ADMIN</div>

            {/* Change password */}
            <div style={{padding:"14px 16px",borderRadius:14,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:700,color:C.white,marginBottom:10}}>🔑 Changer le mot de passe admin</div>
              <input type="password" value={newPwd} onChange={e=>setNewPwd(e.target.value)} placeholder="Nouveau mot de passe (min. 6 car.)"
                style={{width:"100%",padding:"10px 12px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid rgba(255,255,255,0.15)`,color:C.white,fontSize:13,boxSizing:"border-box",marginBottom:8}}/>
              <button onClick={changePwd} style={{width:"100%",padding:"11px 0",borderRadius:12,background:`linear-gradient(135deg,${C.blue},${C.purple})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                CHANGER LE MOT DE PASSE
              </button>
              {pwdMsg&&<div style={{fontSize:11,marginTop:6,textAlign:"center",color:pwdMsg.includes("✅")?C.green:C.red}}>{pwdMsg}</div>}
            </div>

            {/* App stats */}
            <div style={{padding:"14px 16px",borderRadius:14,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:700,color:C.white,marginBottom:10}}>📊 Statistiques app</div>
              {[
                ["Utilisateurs détectés", users.length],
                ["Codes promo créés", promos.length],
                ["Codes promo actifs", promos.filter(p=>p.active).length],
                ["Emails waitlist", waitlist.length],
                ["Premium actif", hasPrem?"Oui":"Non"],
                ["Type premium", premStatus?.type||"—"],
              ].map(([label,val],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:i<5?"1px solid rgba(255,255,255,0.05)":"none"}}>
                  <div style={{fontSize:11,color:C.muted}}>{label}</div>
                  <div style={{fontSize:11,color:C.white,fontWeight:600}}>{val}</div>
                </div>
              ))}
            </div>

            {/* Danger zone */}
            <div style={{padding:"14px 16px",borderRadius:14,background:"rgba(192,57,43,0.08)",border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:12,fontWeight:700,color:C.red,marginBottom:10}}>⚠️ Zone dangereuse</div>
              <button onClick={()=>{
                if(window.confirm("⚠️ Réinitialiser TOUTES les données ? Cette action est irréversible.")){
                  ["map_premium_status","map_trial_used","map_promo_codes","map_waitlist","map_status_card","map_lang","map_dept","map_music"].forEach(k=>localStorage.removeItem(k));
                  alert("✅ Données réinitialisées. L'app va recharger.");
                  window.location.reload();
                }
              }} style={{width:"100%",padding:"10px 0",borderRadius:10,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}44`,color:C.red,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                🗑️ Réinitialiser toutes les données
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
