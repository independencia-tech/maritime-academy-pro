// @ts-nocheck
import { useState, useEffect } from "react";

// ── COLOURS ──────────────────────────────────
const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)", red:"#c0392b",
  green:"#1e8a4a",
};

// ── TRANSLATIONS ─────────────────────────────
const T = {
  fr:{
    back:"◀ Retour",
    qTitle:"TON PROFIL MARITIME",
    qSub:"Personnalise ton parcours — 2 minutes suffisent",
    // Section labels
    s1:"⚓ Qui es-tu ?",
    s2:"🎯 Ton objectif principal ?",
    s3:"📊 Ton niveau actuel ?",
    s4:"🚢 Ton navire de rêve ?",
    s4more:"Voir tous les navires →",
    s4less:"← Réduire",
    s5:"⏱️ Durée d'étude quotidienne ?",
    s6:"⏰ Heure préférée ?",
    s7:"🌍 Ton pays de résidence ?",
    s7ph:"Ex: Cameroun, France, Maroc...",
    s8:"🔔 Rappel de formation par email ?",
    s9:"📸 Ta photo (optionnel)",
    s9cta:"Ajouter ma photo",
    s9note:"Confidentielle · Utilisée pour ta carte statut personnalisée et ta surprise finale 🎁",
    // Who
    qFuture:"⛵ Futur marin", qCadet:"🎓 Cadet",
    qAB:"⚓ Matelot / AB", qOfficer:"🧭 Officier",
    qCaptain:"👑 Capitaine",
    // Goal
    qNav:"🧭 Maîtriser la navigation",
    qSTCW:"🛟 Certifications STCW",
    qLaw:"⚖️ Droit maritime",
    qCareer:"🚢 Progresser dans ma carrière",
    qSafety:"🛡️ Sécurité et survie en mer",
    // Level
    qZero:"🌱 Débutant total",
    qBasic:"📄 Bases maritimes",
    qExp:"⚓ Expérimenté",
    // Ships (6 principaux)
    shipContainer:"🚢 Porte-conteneurs",
    shipTanker:"🛢️ Pétrolier",
    shipCruise:"🛳️ Croisière",
    shipOffshore:"🏗️ Offshore",
    shipYacht:"⛵ Yacht / Voilier",
    shipSAR:"🆘 Sauvetage SAR",
    // Ships (voir plus)
    shipChemical:"⚗️ Chimiquier",
    shipGas:"💨 Gazier LNG",
    shipCar:"🚗 Roulier",
    shipResearch:"🔬 Navire scientifique",
    shipTug:"⚓ Remorqueur",
    shipFishing:"🎣 Pêche hauturière",
    shipPWC:"🏄 Jet-ski / Surf sauvetage",
    shipNavy:"🏛️ Marine nationale",
    // Duration
    dur15:"⚡ 15 min / jour",
    dur30:"📚 30 min / jour",
    dur60:"🎯 1 heure / jour",
    durFree:"🌊 À mon rythme",
    // Time
    qMorning:"🌅 Matin", qAfternoon:"☀️ Après-midi",
    qEvening:"🌆 Soir", qNight:"🌙 Nuit",
    // Reminder
    qYes:"✅ Oui, me rappeler",
    qNo:"❌ Non merci",
    // Submit
    qBtn:"GÉNÉRER MON STATUT →",
    qBtnWait:"Réponds à toutes les questions pour continuer",
    // Summary label
    summaryTitle:"🗺️ TON PARCOURS PERSONNALISÉ",
    errRequired:"⚠️ Cette question est obligatoire",
    errCountry:"⚠️ Indique ton pays de résidence",
    errSummary:"Merci de compléter les champs surlignés en rouge",
    // Photo upload
    errPhotoType:"⚠️ Seuls les formats JPG, PNG, GIF et WEBP sont acceptés",
    errPhotoSize:"⚠️ La photo ne doit pas dépasser 2 Mo",
    photoRemove:"Supprimer la photo",
    photoChange:"Changer la photo",
  },
  en:{
    back:"◀ Back",
    qTitle:"YOUR MARITIME PROFILE",
    qSub:"Personalize your journey — takes 2 minutes",
    s1:"⚓ Who are you?",
    s2:"🎯 Your main goal?",
    s3:"📊 Your current level?",
    s4:"🚢 Your dream ship?",
    s4more:"See all ships →",
    s4less:"← Reduce",
    s5:"⏱️ Daily study duration?",
    s6:"⏰ Preferred time?",
    s7:"🌍 Your country of residence?",
    s7ph:"E.g: Nigeria, UK, Philippines...",
    s8:"🔔 Training reminder by email?",
    s9:"📸 Your photo (optional)",
    s9cta:"Add my photo",
    s9note:"Confidential · Used for your personalized status card and final surprise 🎁",
    qFuture:"⛵ Future sailor", qCadet:"🎓 Cadet",
    qAB:"⚓ Sailor / AB", qOfficer:"🧭 Officer",
    qCaptain:"👑 Captain",
    qNav:"🧭 Master navigation",
    qSTCW:"🛟 STCW Certifications",
    qLaw:"⚖️ Maritime law",
    qCareer:"🚢 Advance my career",
    qSafety:"🛡️ Safety & survival at sea",
    qZero:"🌱 Total beginner",
    qBasic:"📄 Basic maritime",
    qExp:"⚓ Experienced",
    shipContainer:"🚢 Container ship",
    shipTanker:"🛢️ Oil tanker",
    shipCruise:"🛳️ Cruise ship",
    shipOffshore:"🏗️ Offshore",
    shipYacht:"⛵ Yacht / Sailboat",
    shipSAR:"🆘 SAR Rescue",
    shipChemical:"⚗️ Chemical tanker",
    shipGas:"💨 LNG Gas carrier",
    shipCar:"🚗 Car carrier",
    shipResearch:"🔬 Research vessel",
    shipTug:"⚓ Tugboat",
    shipFishing:"🎣 Fishing vessel",
    shipPWC:"🏄 Jet-ski / Surf rescue",
    shipNavy:"🏛️ Navy",
    dur15:"⚡ 15 min / day",
    dur30:"📚 30 min / day",
    dur60:"🎯 1 hour / day",
    durFree:"🌊 At my own pace",
    qMorning:"🌅 Morning", qAfternoon:"☀️ Afternoon",
    qEvening:"🌆 Evening", qNight:"🌙 Night",
    qYes:"✅ Yes, remind me",
    qNo:"❌ No thanks",
    qBtn:"GENERATE MY STATUS →",
    qBtnWait:"Answer all questions to continue",
    summaryTitle:"🗺️ YOUR PERSONALIZED JOURNEY",
    errRequired:"⚠️ This question is required",
    errCountry:"⚠️ Please enter your country of residence",
    errSummary:"Please complete the fields highlighted in red",
  },
  es:{
    back:"◀ Volver",
    qTitle:"TU PERFIL MARÍTIMO",
    qSub:"Personaliza tu camino — 2 minutos bastan",
    s1:"⚓ ¿Quién eres?",
    s2:"🎯 ¿Tu objetivo principal?",
    s3:"📊 ¿Tu nivel actual?",
    s4:"🚢 ¿Tu barco soñado?",
    s4more:"Ver todos los barcos →",
    s4less:"← Reducir",
    s5:"⏱️ ¿Duración de estudio diario?",
    s6:"⏰ ¿Hora preferida?",
    s7:"🌍 ¿Tu país de residencia?",
    s7ph:"Ej: España, México, Argentina...",
    s8:"🔔 ¿Recordatorio por email?",
    s9:"📸 Tu foto (opcional)",
    s9cta:"Agregar mi foto",
    s9note:"Confidencial · Usada para tu tarjeta personalizada y sorpresa final 🎁",
    qFuture:"⛵ Futuro marino", qCadet:"🎓 Cadete",
    qAB:"⚓ Marinero / AB", qOfficer:"🧭 Oficial",
    qCaptain:"👑 Capitán",
    qNav:"🧭 Dominar la navegación",
    qSTCW:"🛟 Certificaciones STCW",
    qLaw:"⚖️ Derecho marítimo",
    qCareer:"🚢 Avanzar en mi carrera",
    qSafety:"🛡️ Seguridad y supervivencia",
    qZero:"🌱 Principiante total",
    qBasic:"📄 Bases marítimas",
    qExp:"⚓ Experimentado",
    shipContainer:"🚢 Portacontenedores",
    shipTanker:"🛢️ Petrolero",
    shipCruise:"🛳️ Crucero",
    shipOffshore:"🏗️ Offshore",
    shipYacht:"⛵ Yate / Velero",
    shipSAR:"🆘 Salvamento SAR",
    shipChemical:"⚗️ Quimiquero",
    shipGas:"💨 Gasero LNG",
    shipCar:"🚗 Ro-Ro",
    shipResearch:"🔬 Buque científico",
    shipTug:"⚓ Remolcador",
    shipFishing:"🎣 Pesca de altura",
    shipPWC:"🏄 Moto de agua / Socorrismo",
    shipNavy:"🏛️ Marina nacional",
    dur15:"⚡ 15 min / día",
    dur30:"📚 30 min / día",
    dur60:"🎯 1 hora / día",
    durFree:"🌊 A mi ritmo",
    qMorning:"🌅 Mañana", qAfternoon:"☀️ Tarde",
    qEvening:"🌆 Noche", qNight:"🌙 Madrugada",
    qYes:"✅ Sí, recordarme",
    qNo:"❌ No gracias",
    qBtn:"GENERAR MI ESTADO →",
    qBtnWait:"Responde todas las preguntas para continuar",
    summaryTitle:"🗺️ TU CAMINO PERSONALIZADO",
    errRequired:"⚠️ Esta pregunta es obligatoria",
    errCountry:"⚠️ Indica tu país de residencia",
    errSummary:"Por favor completa los campos en rojo",
  },
  pt:{
    back:"◀ Voltar",
    qTitle:"SEU PERFIL MARÍTIMO",
    qSub:"Personalize sua jornada — leva 2 minutos",
    s1:"⚓ Quem é você?",
    s2:"🎯 Seu objetivo principal?",
    s3:"📊 Seu nível atual?",
    s4:"🚢 Seu navio dos sonhos?",
    s4more:"Ver todos os navios →",
    s4less:"← Reduzir",
    s5:"⏱️ Duração de estudo diário?",
    s6:"⏰ Horário preferido?",
    s7:"🌍 Seu país de residência?",
    s7ph:"Ex: Brasil, Portugal, Angola...",
    s8:"🔔 Lembrete de formação por email?",
    s9:"📸 Sua foto (opcional)",
    s9cta:"Adicionar minha foto",
    s9note:"Confidencial · Usada para seu cartão personalizado e surpresa final 🎁",
    qFuture:"⛵ Futuro marinheiro", qCadet:"🎓 Cadete",
    qAB:"⚓ Marinheiro / AB", qOfficer:"🧭 Oficial",
    qCaptain:"👑 Capitão",
    qNav:"🧭 Dominar a navegação",
    qSTCW:"🛟 Certificações STCW",
    qLaw:"⚖️ Direito marítimo",
    qCareer:"🚢 Avançar na carreira",
    qSafety:"🛡️ Segurança e sobrevivência",
    qZero:"🌱 Iniciante total",
    qBasic:"📄 Bases marítimas",
    qExp:"⚓ Experiente",
    shipContainer:"🚢 Porta-contêineres",
    shipTanker:"🛢️ Petroleiro",
    shipCruise:"🛳️ Cruzeiro",
    shipOffshore:"🏗️ Offshore",
    shipYacht:"⛵ Iate / Veleiro",
    shipSAR:"🆘 Salvamento SAR",
    shipChemical:"⚗️ Químico",
    shipGas:"💨 Gaseiro LNG",
    shipCar:"🚗 Ro-Ro",
    shipResearch:"🔬 Navio científico",
    shipTug:"⚓ Rebocador",
    shipFishing:"🎣 Pesca de altura",
    shipPWC:"🏄 Jet-ski / Salva-vidas",
    shipNavy:"🏛️ Marinha nacional",
    dur15:"⚡ 15 min / dia",
    dur30:"📚 30 min / dia",
    dur60:"🎯 1 hora / dia",
    durFree:"🌊 No meu ritmo",
    qMorning:"🌅 Manhã", qAfternoon:"☀️ Tarde",
    qEvening:"🌆 Noite", qNight:"🌙 Madrugada",
    qYes:"✅ Sim, me lembrar",
    qNo:"❌ Não obrigado",
    qBtn:"GERAR MEU STATUS →",
    qBtnWait:"Responda todas as perguntas para continuar",
    summaryTitle:"🗺️ SUA JORNADA PERSONALIZADA",
    errRequired:"⚠️ Esta pergunta é obrigatória",
    errCountry:"⚠️ Indique seu país de residência",
    errSummary:"Por favor complete os campos em vermelho",
  },
};

// ── SHARED UI ─────────────────────────────────
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
            width:st.sz,height:st.sz,borderRadius:"50%",background:"white",
            animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`,opacity:0,
          }}/>
        ))}
      </div>
      <style>{`
        @keyframes tw{0%,100%{opacity:0}50%{opacity:0.5}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes checkPop{0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
      `}</style>
    </>
  );
}

function TopBar({onBack,backLabel,step,total}) {
  const pct=((step-1)/(total-1))*100;
  return (
    <div style={{
      position:"sticky",top:0,zIndex:100,
      background:"rgba(6,14,26,0.96)",backdropFilter:"blur(14px)",
      borderBottom:`1px solid ${C.border}`,
    }}>
      <div style={{height:54,display:"flex",alignItems:"center",
        padding:"0 16px",gap:12}}>
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
      {/* Mini progress dots */}
      <div style={{display:"flex",justifyContent:"center",
        gap:4,paddingBottom:8}}>
        {Array.from({length:total},(_,i)=>(
          <div key={i} style={{
            width:i+1===step?20:6,height:4,borderRadius:2,
            background:i+1<=step
              ?`linear-gradient(90deg,${C.blue2},${C.gold2})`
              :"rgba(255,255,255,0.12)",
            transition:"all 0.3s ease",
          }}/>
        ))}
      </div>
    </div>
  );
}

function Card({children,style={},error=false}) {
  return (
    <div style={{
      background:"rgba(13,31,60,0.72)",
      border:`1px solid ${error?C.red:C.border}`,
      boxShadow:error?`0 0 0 2px ${C.red}33`:"none",
      borderRadius:20,padding:"18px 16px",...style,
    }} data-error={error?"true":"false"}>{children}</div>
  );
}

function SectionLabel({text,done}) {
  return (
    <div style={{
      display:"flex",alignItems:"center",
      justifyContent:"space-between",
      marginBottom:12,
    }}>
      <div style={{fontSize:13,fontWeight:700,
        color:done?C.gold2:C.muted,
        letterSpacing:0.5,transition:"color 0.3s",
      }}>{text}</div>
      {done && (
        <div style={{
          width:22,height:22,borderRadius:"50%",
          background:C.green,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:12,animation:"checkPop 0.3s ease",
        }}>✓</div>
      )}
    </div>
  );
}

function Chip({label,selected,onClick,wide=false}) {
  return (
    <button onClick={onClick} style={{
      padding:wide?"10px 16px":"9px 13px",
      borderRadius:12,
      background:selected
        ?"linear-gradient(135deg,rgba(26,111,212,0.3),rgba(201,146,42,0.2))"
        :"rgba(255,255,255,0.05)",
      border:`1.5px solid ${selected?C.gold:"rgba(255,255,255,0.1)"}`,
      color:selected?C.white:C.muted,
      fontSize:13,fontWeight:selected?700:400,
      cursor:"pointer",transition:"all 0.2s",
      fontFamily:"'Nunito',sans-serif",
      boxShadow:selected?`0 4px 16px rgba(201,146,42,0.2)`:"none",
    }}>{label}</button>
  );
}

function ShipCard({emoji,label,selected,onClick}) {
  return (
    <button onClick={onClick} style={{
      display:"flex",flexDirection:"column",
      alignItems:"center",gap:6,
      padding:"14px 8px",borderRadius:16,
      background:selected
        ?"linear-gradient(135deg,rgba(26,111,212,0.28),rgba(201,146,42,0.18))"
        :"rgba(255,255,255,0.05)",
      border:`1.5px solid ${selected?C.gold:"rgba(255,255,255,0.1)"}`,
      cursor:"pointer",transition:"all 0.2s",
      transform:selected?"translateY(-2px)":"translateY(0)",
      boxShadow:selected?`0 8px 20px rgba(201,146,42,0.2)`:"none",
      position:"relative",
    }}>
      {selected && (
        <div style={{
          position:"absolute",top:6,right:6,
          width:16,height:16,borderRadius:"50%",
          background:C.green,fontSize:9,
          display:"flex",alignItems:"center",justifyContent:"center",
          color:"#fff",fontWeight:700,
          animation:"checkPop 0.3s ease",
        }}>✓</div>
      )}
      <span style={{fontSize:28}}>{emoji}</span>
      <span style={{
        fontSize:11,fontWeight:selected?700:400,
        color:selected?C.white:C.muted,
        textAlign:"center",lineHeight:1.3,
        fontFamily:"'Nunito',sans-serif",
      }}>{label}</span>
    </button>
  );
}

function GLine() {
  return <div style={{height:1,margin:"4px 0",
    background:`linear-gradient(90deg,transparent,${C.gold}44,${C.blue2}44,transparent)`}}/>;
}

// ── PROGRESS SUMMARY ─────────────────────────
function ProgressSummary({answers,t,lang}) {
  const total=9;
  const done=Object.values(answers).filter(v=>v&&v!=="").length;
  const pct=Math.round((done/total)*100);

  const profileLabels={
    future:t.qFuture,cadet:t.qCadet,ab:t.qAB,
    officer:t.qOfficer,captain:t.qCaptain,
  };
  const goalLabels={
    nav:t.qNav,stcw:t.qSTCW,law:t.qLaw,
    career:t.qCareer,safety:t.qSafety,
  };

  return (
    <Card style={{
      background:`linear-gradient(135deg,rgba(26,111,212,0.1),rgba(201,146,42,0.06))`,
      border:`1px solid ${C.gold}33`,marginBottom:16,
    }}>
      <div style={{display:"flex",justifyContent:"space-between",
        alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:11,letterSpacing:2,
          color:C.gold,fontFamily:"'Cinzel',serif"}}>
          {t.summaryTitle}
        </div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:16,
          fontWeight:700,color:pct===100?C.gold2:C.blue2}}>
          {pct}%
        </div>
      </div>
      <div style={{height:4,borderRadius:4,
        background:"rgba(255,255,255,0.08)",overflow:"hidden",marginBottom:12}}>
        <div style={{height:"100%",borderRadius:4,
          width:`${pct}%`,
          background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,
          transition:"width 0.5s ease"}}/>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {answers.who && (
          <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,
            background:"rgba(30,138,74,0.2)",border:"1px solid rgba(30,138,74,0.4)",
            color:"#4caf80"}}>
            {profileLabels[answers.who]||answers.who}
          </span>
        )}
        {answers.goal && (
          <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,
            background:"rgba(77,166,255,0.15)",border:`1px solid ${C.blue2}44`,
            color:C.blue2}}>
            {goalLabels[answers.goal]||answers.goal}
          </span>
        )}
        {answers.ship && (
          <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,
            background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,
            color:C.gold2}}>
            {answers.ship}
          </span>
        )}
        {answers.duration && (
          <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,
            background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
            color:C.muted}}>
            {answers.duration}
          </span>
        )}
      </div>
    </Card>
  );
}

// ── MAIN QUESTIONNAIRE ────────────────────────
export default function QuestionnaireS7({
  lang="fr",
  onNext=()=>{},
  onBack=()=>{},
  setProfile=()=>{},
}) {
  const t=T[lang]||T.fr;
  const LS_KEY="map_questionnaire";
  const [vis,setVis]=useState(false);
  const [showMoreShips,setShowMoreShips]=useState(false);
  const [hydrated,setHydrated]=useState(false);
  const [country,setCountry]=useState("");
  const [attempted,setAttempted]=useState(false);
  const [answers,setAnswers]=useState({
    who:null,goal:null,level:null,
    ship:null,duration:null,time:null,
    reminder:null,country:"",photo:null,
  });

  // Restore from localStorage
  useEffect(()=>{
    if(typeof window==="undefined"){ setHydrated(true); return; }
    try{
      const raw=localStorage.getItem(LS_KEY);
      if(raw){
        const saved=JSON.parse(raw);
        if(saved&&typeof saved==="object"){
          if(saved.answers) setAnswers(p=>({...p,...saved.answers}));
          if(typeof saved.country==="string") setCountry(saved.country);
        }
      }
    }catch{}
    setHydrated(true);
  },[]);

  // Persist on change (after hydration so we don't overwrite saved data)
  useEffect(()=>{
    if(!hydrated||typeof window==="undefined") return;
    try{ localStorage.setItem(LS_KEY,JSON.stringify({answers,country})); }catch{}
  },[answers,country,hydrated]);

  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);

  const set=(k,v)=>setAnswers(p=>({...p,[k]:v}));
  const setCountryVal=(v)=>{ setCountry(v); set("country",v); };

  const requiredKeys=["who","goal","level","ship","duration","time","reminder"];
  const allDone=requiredKeys.every(k=>answers[k]!==null)&&country.trim().length>0;

  const mainShips=[
    {id:"container",emoji:"🚢",label:t.shipContainer},
    {id:"tanker",emoji:"🛢️",label:t.shipTanker},
    {id:"cruise",emoji:"🛳️",label:t.shipCruise},
    {id:"offshore",emoji:"🏗️",label:t.shipOffshore},
    {id:"yacht",emoji:"⛵",label:t.shipYacht},
    {id:"sar",emoji:"🆘",label:t.shipSAR},
  ];

  const moreShips=[
    {id:"chemical",emoji:"⚗️",label:t.shipChemical},
    {id:"gas",emoji:"💨",label:t.shipGas},
    {id:"car",emoji:"🚗",label:t.shipCar},
    {id:"research",emoji:"🔬",label:t.shipResearch},
    {id:"tug",emoji:"⚓",label:t.shipTug},
    {id:"fishing",emoji:"🎣",label:t.shipFishing},
    {id:"pwc",emoji:"🏄",label:t.shipPWC},
    {id:"navy",emoji:"🏛️",label:t.shipNavy},
  ];

  const allShips=showMoreShips?[...mainShips,...moreShips]:mainShips;

  const sections=[
    {key:"who",label:t.s1,opts:[
      {v:"future",l:t.qFuture},{v:"cadet",l:t.qCadet},
      {v:"ab",l:t.qAB},{v:"officer",l:t.qOfficer},
      {v:"captain",l:t.qCaptain},
    ]},
    {key:"goal",label:t.s2,opts:[
      {v:"nav",l:t.qNav},{v:"stcw",l:t.qSTCW},
      {v:"law",l:t.qLaw},{v:"career",l:t.qCareer},
      {v:"safety",l:t.qSafety},
    ]},
    {key:"level",label:t.s3,opts:[
      {v:"zero",l:t.qZero},{v:"basic",l:t.qBasic},{v:"exp",l:t.qExp},
    ]},
  ];

  const durationOpts=[
    {v:"15min",l:t.dur15},{v:"30min",l:t.dur30},
    {v:"60min",l:t.dur60},{v:"free",l:t.durFree},
  ];

  const timeOpts=[
    {v:"morning",l:t.qMorning},{v:"afternoon",l:t.qAfternoon},
    {v:"evening",l:t.qEvening},{v:"night",l:t.qNight},
  ];

  const handleSubmit=()=>{
    if(!allDone){
      setAttempted(true);
      if(typeof window!=="undefined"){
        setTimeout(()=>{
          const el=document.querySelector("[data-error='true']");
          if(el) el.scrollIntoView({behavior:"smooth",block:"center"});
        },50);
      }
      return;
    }
    setProfile({...answers,country,lang});
    onNext();
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",
      overflowX:"hidden",position:"relative",
    }}>
      <Stars/>
      <TopBar onBack={onBack} backLabel={t.back} step={7} total={8}/>

      <div style={{
        padding:"20px 18px 50px",
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",
        transition:"all 0.5s ease",
        position:"relative",zIndex:1,
      }}>
        <div style={{maxWidth:440,margin:"0 auto"}}>

          {/* Header */}
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:21,
              fontWeight:700,color:C.white,marginBottom:4}}>
              {t.qTitle}
            </div>
            <div style={{fontSize:13,color:C.muted}}>{t.qSub}</div>
          </div>

          {/* Live summary */}
          <ProgressSummary answers={answers} t={t} lang={lang}/>

          {/* ── SECTIONS 1-3 : WHO / GOAL / LEVEL ── */}
          {sections.map(sec=>(
            <Card key={sec.key} style={{marginBottom:14}}
              error={attempted&&answers[sec.key]===null}>
              <SectionLabel text={sec.label} done={answers[sec.key]!==null}/>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {sec.opts.map(o=>(
                  <Chip key={o.v} label={o.l}
                    selected={answers[sec.key]===o.v}
                    onClick={()=>set(sec.key,o.v)}/>
                ))}
              </div>
              {attempted&&answers[sec.key]===null&&(
                <div style={{marginTop:10,fontSize:12,color:C.red,fontWeight:600}}>
                  {t.errRequired}
                </div>
              )}
            </Card>
          ))}

          {/* ── SECTION 4 : SHIP ── */}
          <Card style={{marginBottom:14}}
            error={attempted&&answers.ship===null}>
            <SectionLabel text={t.s4} done={answers.ship!==null}/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
              {allShips.map(s=>(
                <ShipCard key={s.id} emoji={s.emoji} label={s.label}
                  selected={answers.ship===s.id}
                  onClick={()=>set("ship",s.id)}/>
              ))}
            </div>
            <button onClick={()=>setShowMoreShips(v=>!v)} style={{
              width:"100%",padding:"9px 0",borderRadius:12,
              background:"rgba(255,255,255,0.04)",
              border:`1px dashed ${C.border}`,
              color:C.blue2,fontSize:12,fontWeight:700,
              cursor:"pointer",letterSpacing:0.5,
              fontFamily:"'Nunito',sans-serif",
            }}>
              {showMoreShips?t.s4less:t.s4more}
            </button>
            {attempted&&answers.ship===null&&(
              <div style={{marginTop:10,fontSize:12,color:C.red,fontWeight:600}}>
                {t.errRequired}
              </div>
            )}
          </Card>

          {/* ── SECTION 5 : DURATION ── */}
          <Card style={{marginBottom:14}}
            error={attempted&&answers.duration===null}>
            <SectionLabel text={t.s5} done={answers.duration!==null}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {durationOpts.map(o=>(
                <Chip key={o.v} label={o.l} wide
                  selected={answers.duration===o.v}
                  onClick={()=>set("duration",o.v)}/>
              ))}
            </div>
            {answers.duration==="15min"&&(
              <div style={{marginTop:10,padding:"8px 12px",borderRadius:10,
                background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,
                fontSize:12,color:C.gold2}}>
                ⭐ Recommandé — 15 min / jour c'est suffisant pour progresser régulièrement
              </div>
            )}
            {attempted&&answers.duration===null&&(
              <div style={{marginTop:10,fontSize:12,color:C.red,fontWeight:600}}>
                {t.errRequired}
              </div>
            )}
          </Card>

          {/* ── SECTION 6 : TIME ── */}
          <Card style={{marginBottom:14}}
            error={attempted&&answers.time===null}>
            <SectionLabel text={t.s6} done={answers.time!==null}/>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {timeOpts.map(o=>(
                <Chip key={o.v} label={o.l}
                  selected={answers.time===o.v}
                  onClick={()=>set("time",o.v)}/>
              ))}
            </div>
            {attempted&&answers.time===null&&(
              <div style={{marginTop:10,fontSize:12,color:C.red,fontWeight:600}}>
                {t.errRequired}
              </div>
            )}
          </Card>

          {/* ── SECTION 7 : COUNTRY ── */}
          <Card style={{marginBottom:14}}
            error={attempted&&country.trim().length===0}>
            <SectionLabel text={t.s7} done={country.trim().length>0}/>
            <input
              type="text"
              placeholder={t.s7ph}
              value={country}
              onChange={e=>setCountryVal(e.target.value)}
              maxLength={60}
              style={{
                width:"100%",padding:"13px 14px",borderRadius:12,
                background:"rgba(255,255,255,0.07)",
                border:`1.5px solid ${
                  attempted&&country.trim().length===0
                    ?C.red
                    :country.trim().length>0?C.gold:C.border
                }`,
                color:C.white,fontSize:14,outline:"none",
                fontFamily:"'Nunito',sans-serif",
                transition:"border-color 0.2s",
              }}/>
            {country.trim().length>0&&(
              <div style={{marginTop:8,fontSize:11,color:C.muted}}>
                🌍 La réglementation maritime sera adaptée à ton pays
              </div>
            )}
            {attempted&&country.trim().length===0&&(
              <div style={{marginTop:8,fontSize:12,color:C.red,fontWeight:600}}>
                {t.errCountry}
              </div>
            )}
          </Card>

          {/* ── SECTION 8 : REMINDER ── */}
          <Card style={{marginBottom:14}}
            error={attempted&&answers.reminder===null}>
            <SectionLabel text={t.s8} done={answers.reminder!==null}/>
            <div style={{display:"flex",gap:10}}>
              <Chip label={t.qYes} wide
                selected={answers.reminder==="yes"}
                onClick={()=>set("reminder","yes")}/>
              <Chip label={t.qNo} wide
                selected={answers.reminder==="no"}
                onClick={()=>set("reminder","no")}/>
            </div>
            {answers.reminder==="yes"&&answers.time&&(
              <div style={{marginTop:10,padding:"10px 12px",borderRadius:10,
                background:"rgba(77,166,255,0.1)",
                border:`1px solid ${C.blue2}33`,
                fontSize:12,color:C.blue2}}>
                🔔 Tu recevras un rappel{" "}
                {answers.time==="morning"?"le matin"
                  :answers.time==="afternoon"?"l'après-midi"
                  :answers.time==="evening"?"le soir"
                  :"la nuit"}{" "}
                à l'heure choisie
              </div>
            )}
            {attempted&&answers.reminder===null&&(
              <div style={{marginTop:10,fontSize:12,color:C.red,fontWeight:600}}>
                {t.errRequired}
              </div>
            )}
          </Card>

          {/* ── SECTION 9 : PHOTO ── */}
          <Card style={{marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:700,
              color:C.muted,marginBottom:10,letterSpacing:0.5}}>
              {t.s9}
            </div>
            <label style={{
              borderRadius:14,padding:"16px 14px",
              background:"rgba(255,255,255,0.04)",
              border:`1px dashed ${C.border}`,
              display:"flex",alignItems:"center",
              gap:14,cursor:"pointer",
            }}>
              <div style={{
                width:52,height:52,borderRadius:"50%",flexShrink:0,
                background:answers.photo
                  ?`url(${answers.photo}) center/cover`
                  :`linear-gradient(135deg,${C.navy3},#112244)`,
                border:`1.5px dashed ${C.gold}66`,
                display:"flex",alignItems:"center",
                justifyContent:"center",fontSize:22,
              }}>{answers.photo?"":"📸"}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,color:C.white,
                  fontWeight:600,marginBottom:4}}>
                  {answers.photo?"✅":""} {t.s9cta}
                </div>
                <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>
                  {t.s9note}
                </div>
              </div>
              <input type="file" accept="image/*" style={{display:"none"}}
                onChange={(e)=>{
                  const f=e.target.files&&e.target.files[0];
                  if(!f) return;
                  const r=new FileReader();
                  r.onload=()=>set("photo",r.result);
                  r.readAsDataURL(f);
                }}/>
            </label>
          </Card>

          {/* ── SUBMIT ── */}
          <button onClick={handleSubmit} disabled={!allDone}
            aria-disabled={!allDone}
            style={{
              width:"100%",padding:"17px 0",
              border:"none",borderRadius:16,
              background:allDone
                ?`linear-gradient(135deg,${C.blue},${C.gold})`
                :"rgba(26,111,212,0.25)",
              fontFamily:"'Cinzel',serif",fontSize:15,
              fontWeight:700,letterSpacing:2,
              color:allDone?C.white:"rgba(240,244,255,0.35)",
              cursor:allDone?"pointer":"not-allowed",
              opacity:allDone?1:0.7,
              boxShadow:allDone?"0 10px 36px rgba(26,111,212,0.4)":"none",
              transition:"all 0.3s",
              marginBottom:12,
            }}>{t.qBtn}</button>

          {attempted&&!allDone&&(
            <div style={{
              textAlign:"center",fontSize:12,fontWeight:700,
              color:C.red,marginBottom:10,padding:"10px 12px",
              borderRadius:10,background:"rgba(192,57,43,0.12)",
              border:`1px solid ${C.red}55`,
            }}>
              {t.errSummary}
            </div>
          )}

          {!allDone&&(
            <div style={{textAlign:"center",fontSize:12,
              color:C.muted,lineHeight:1.6}}>
              {t.qBtnWait}
              <br/>
              <span style={{color:C.gold2,fontWeight:700}}>
                {requiredKeys.filter(k=>answers[k]!==null).length +
                  (country.trim().length>0?1:0)}/
                {requiredKeys.length+1} complétées
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
