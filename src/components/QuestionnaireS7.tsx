// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)", red:"#c0392b",
  green:"#1e8a4a", orange:"#e67e22",
};

// ── SLOGAN UNIVERSEL ──────────────────────────
// FR: "La formation maritime complète — pont et machine"
// EN: "Complete maritime training — deck and engine"
// ES: "Formación marítima completa — puente y máquinas"
// PT: "Formação marítima completa — convés e máquinas"

const T = {
  fr:{
    back:"◀ Retour",
    slogan:"La formation maritime complète — pont et machine",
    qTitle:"TON PROFIL MARITIME",
    qSub:"Personnalise ton parcours — 2 minutes suffisent",
    // Département
    deptTitle:"🚢 Ton département ?",
    deptDeck:"🧭 PONT — Navigation",
    deptDeckSub:"Capitaine, officier, matelot...",
    deptEngine:"⚙️ MACHINE — Énergie & Propulsion",
    deptEngineSub:"Chef mécanicien, officier machine, oiler...",
    // Pont — Qui es-tu
    s1Deck:"⚓ Qui es-tu ? (Pont)",
    qFutureDeck:"⛵ Futur marin (pont)",
    qCadetDeck:"🎓 Cadet navigation",
    qAB:"⚓ Matelot / AB",
    qOfficerDeck:"🧭 Officier de navigation",
    qCaptain:"👑 Capitaine / Master",
    // Machine — Qui es-tu
    s1Engine:"⚙️ Qui es-tu ? (Machine)",
    qFutureEngine:"🔧 Futur mécanicien",
    qCadetEngine:"🎓 Cadet machine",
    qOiler:"🛢️ Graisseur / Oiler",
    qJuniorEng:"⚙️ Mécanicien junior",
    qOfficerEngine:"🛠️ Officier mécanicien (OICM)",
    qChiefEng:"👑 Chef mécanicien",
    // Objectif Pont
    s2Deck:"🎯 Ton objectif (Pont) ?",
    qNavigation:"🧭 Maîtriser la navigation",
    qSTCW:"🛟 Certifications STCW",
    qLaw:"⚖️ Droit maritime",
    qCareerDeck:"🚢 Progresser — pont",
    qSafety:"🛡️ Sécurité et survie en mer",
    // Objectif Machine
    s2Engine:"🎯 Ton objectif (Machine) ?",
    qMoteur:"⚙️ Maîtriser le moteur principal",
    qAuxiliaries:"🔧 Systèmes auxiliaires",
    qMARPOL:"🌊 MARPOL machine",
    qCareerEngine:"🛠️ Progresser — machine",
    qEnergy:"⚡ SEEMP / Efficacité énergétique",
    // Niveau
    s3:"📊 Ton niveau actuel ?",
    qZero:"🌱 Débutant total",
    qBasic:"📄 Bases maritimes",
    qExp:"⚓ Expérimenté",
    // Navire de rêve
    s4:"🚢 Ton navire de rêve ?",
    s4more:"Voir tous les navires →",
    s4less:"← Réduire",
    // Ships main
    shipContainer:"🚢 Porte-conteneurs",
    shipTanker:"🛢️ Pétrolier",
    shipCruise:"🛳️ Croisière",
    shipOffshore:"🏗️ Offshore OSV",
    shipYacht:"⛵ Yacht / Voilier",
    shipSAR:"🆘 Sauvetage SAR",
    // Ships more
    shipChemical:"⚗️ Chimiquier",
    shipGas:"💨 Gazier LNG",
    shipCar:"🚗 Roulier",
    shipResearch:"🔬 Navire scientifique",
    shipTug:"⚓ Remorqueur",
    shipFishing:"🎣 Pêche hauturière",
    shipPWC:"🏄 Jet-ski / Surf sauvetage",
    shipNavy:"🏛️ Marine nationale",
    // Durée
    s5:"⏱️ Durée d'étude quotidienne ?",
    dur15:"⚡ 15 min / jour",
    dur30:"📚 30 min / jour",
    dur60:"🎯 1 heure / jour",
    durFree:"🌊 À mon rythme",
    // Heure
    s6:"⏰ Heure préférée ?",
    qMorning:"🌅 Matin",qAfternoon:"☀️ Après-midi",
    qEvening:"🌆 Soir",qNight:"🌙 Nuit",
    // Pays
    s7:"🌍 Ton pays de résidence ?",
    s7ph:"Ex: Cameroun, France, Maroc...",
    // Rappel
    s8:"🔔 Rappel de formation par email ?",
    qYes:"✅ Oui",qNo:"❌ Non",
    // Photo
    s9:"📸 Ta photo (optionnel)",
    s9cta:"Ajouter ma photo",
    s9note:"Confidentielle · Pour ta carte statut personnalisée 🎁",
    // Submit
    qBtn:"GÉNÉRER MON STATUT →",
    qBtnWait:"Réponds à toutes les questions pour continuer",
    summaryTitle:"🗺️ TON PARCOURS PERSONNALISÉ",
    // Dept labels for summary
    deptDeckShort:"🧭 Pont",
    deptEngineShort:"⚙️ Machine",
  },
  en:{
    back:"◀ Back",
    slogan:"Complete maritime training — deck and engine",
    qTitle:"YOUR MARITIME PROFILE",
    qSub:"Personalize your journey — takes 2 minutes",
    deptTitle:"🚢 Your department?",
    deptDeck:"🧭 DECK — Navigation",
    deptDeckSub:"Captain, officer, sailor...",
    deptEngine:"⚙️ ENGINE — Energy & Propulsion",
    deptEngineSub:"Chief engineer, engineer officer, oiler...",
    s1Deck:"⚓ Who are you? (Deck)",
    qFutureDeck:"⛵ Future deck sailor",
    qCadetDeck:"🎓 Navigation cadet",
    qAB:"⚓ Sailor / AB",
    qOfficerDeck:"🧭 Navigation officer",
    qCaptain:"👑 Captain / Master",
    s1Engine:"⚙️ Who are you? (Engine)",
    qFutureEngine:"🔧 Future engineer",
    qCadetEngine:"🎓 Engine cadet",
    qOiler:"🛢️ Oiler / Greaser",
    qJuniorEng:"⚙️ Junior engineer",
    qOfficerEngine:"🛠️ Engineer officer (EOOW)",
    qChiefEng:"👑 Chief engineer",
    s2Deck:"🎯 Your goal (Deck)?",
    qNavigation:"🧭 Master navigation",
    qSTCW:"🛟 STCW certifications",
    qLaw:"⚖️ Maritime law",
    qCareerDeck:"🚢 Advance — deck",
    qSafety:"🛡️ Safety & survival at sea",
    s2Engine:"🎯 Your goal (Engine)?",
    qMoteur:"⚙️ Master the main engine",
    qAuxiliaries:"🔧 Auxiliary systems",
    qMARPOL:"🌊 MARPOL engine room",
    qCareerEngine:"🛠️ Advance — engine",
    qEnergy:"⚡ SEEMP / Energy efficiency",
    s3:"📊 Your current level?",
    qZero:"🌱 Total beginner",
    qBasic:"📄 Basic maritime",
    qExp:"⚓ Experienced",
    s4:"🚢 Your dream ship?",
    s4more:"See all ships →",s4less:"← Reduce",
    shipContainer:"🚢 Container ship",shipTanker:"🛢️ Oil tanker",
    shipCruise:"🛳️ Cruise ship",shipOffshore:"🏗️ Offshore OSV",
    shipYacht:"⛵ Yacht / Sailboat",shipSAR:"🆘 SAR Rescue",
    shipChemical:"⚗️ Chemical tanker",shipGas:"💨 LNG Gas carrier",
    shipCar:"🚗 Car carrier",shipResearch:"🔬 Research vessel",
    shipTug:"⚓ Tugboat",shipFishing:"🎣 Fishing vessel",
    shipPWC:"🏄 Jet-ski / Surf rescue",shipNavy:"🏛️ Navy",
    s5:"⏱️ Daily study duration?",
    dur15:"⚡ 15 min / day",dur30:"📚 30 min / day",
    dur60:"🎯 1 hour / day",durFree:"🌊 At my own pace",
    s6:"⏰ Preferred time?",
    qMorning:"🌅 Morning",qAfternoon:"☀️ Afternoon",
    qEvening:"🌆 Evening",qNight:"🌙 Night",
    s7:"🌍 Country of residence?",s7ph:"E.g: Nigeria, UK, Philippines...",
    s8:"🔔 Training reminder by email?",
    qYes:"✅ Yes",qNo:"❌ No",
    s9:"📸 Your photo (optional)",
    s9cta:"Add my photo",s9note:"Confidential · For your personalized status card 🎁",
    qBtn:"GENERATE MY STATUS →",
    qBtnWait:"Answer all questions to continue",
    summaryTitle:"🗺️ YOUR PERSONALIZED JOURNEY",
    deptDeckShort:"🧭 Deck",deptEngineShort:"⚙️ Engine",
  },
  es:{
    back:"◀ Volver",
    slogan:"Formación marítima completa — puente y máquinas",
    qTitle:"TU PERFIL MARÍTIMO",
    qSub:"Personaliza tu camino — 2 minutos bastan",
    deptTitle:"🚢 ¿Tu departamento?",
    deptDeck:"🧭 PUENTE — Navegación",
    deptDeckSub:"Capitán, oficial, marinero...",
    deptEngine:"⚙️ MÁQUINAS — Energía y Propulsión",
    deptEngineSub:"Jefe de máquinas, oficial, engrasador...",
    s1Deck:"⚓ ¿Quién eres? (Puente)",
    qFutureDeck:"⛵ Futuro marino (puente)",
    qCadetDeck:"🎓 Cadete navegación",
    qAB:"⚓ Marinero / AB",
    qOfficerDeck:"🧭 Oficial de navegación",
    qCaptain:"👑 Capitán / Master",
    s1Engine:"⚙️ ¿Quién eres? (Máquinas)",
    qFutureEngine:"🔧 Futuro mecánico",
    qCadetEngine:"🎓 Cadete máquinas",
    qOiler:"🛢️ Engrasador / Oiler",
    qJuniorEng:"⚙️ Mecánico junior",
    qOfficerEngine:"🛠️ Oficial de máquinas (OMCV)",
    qChiefEng:"👑 Jefe de máquinas",
    s2Deck:"🎯 ¿Tu objetivo (Puente)?",
    qNavigation:"🧭 Dominar la navegación",
    qSTCW:"🛟 Certificaciones STCW",
    qLaw:"⚖️ Derecho marítimo",
    qCareerDeck:"🚢 Avanzar — puente",
    qSafety:"🛡️ Seguridad y supervivencia",
    s2Engine:"🎯 ¿Tu objetivo (Máquinas)?",
    qMoteur:"⚙️ Dominar el motor principal",
    qAuxiliaries:"🔧 Sistemas auxiliares",
    qMARPOL:"🌊 MARPOL sala de máquinas",
    qCareerEngine:"🛠️ Avanzar — máquinas",
    qEnergy:"⚡ SEEMP / Eficiencia energética",
    s3:"📊 ¿Tu nivel actual?",
    qZero:"🌱 Principiante total",qBasic:"📄 Bases marítimas",qExp:"⚓ Experimentado",
    s4:"🚢 ¿Tu barco soñado?",s4more:"Ver todos →",s4less:"← Reducir",
    shipContainer:"🚢 Portacontenedores",shipTanker:"🛢️ Petrolero",
    shipCruise:"🛳️ Crucero",shipOffshore:"🏗️ Offshore OSV",
    shipYacht:"⛵ Yate / Velero",shipSAR:"🆘 Salvamento SAR",
    shipChemical:"⚗️ Quimiquero",shipGas:"💨 Gasero LNG",
    shipCar:"🚗 Ro-Ro",shipResearch:"🔬 Buque científico",
    shipTug:"⚓ Remolcador",shipFishing:"🎣 Pesca de altura",
    shipPWC:"🏄 Moto de agua",shipNavy:"🏛️ Marina nacional",
    s5:"⏱️ ¿Duración de estudio diario?",
    dur15:"⚡ 15 min / día",dur30:"📚 30 min / día",
    dur60:"🎯 1 hora / día",durFree:"🌊 A mi ritmo",
    s6:"⏰ ¿Hora preferida?",
    qMorning:"🌅 Mañana",qAfternoon:"☀️ Tarde",qEvening:"🌆 Noche",qNight:"🌙 Madrugada",
    s7:"🌍 ¿Tu país de residencia?",s7ph:"Ej: España, México...",
    s8:"🔔 ¿Recordatorio por email?",qYes:"✅ Sí",qNo:"❌ No",
    s9:"📸 Tu foto (opcional)",s9cta:"Agregar mi foto",
    s9note:"Confidencial · Para tu tarjeta personalizada 🎁",
    qBtn:"GENERAR MI ESTADO →",qBtnWait:"Responde todas las preguntas para continuar",
    summaryTitle:"🗺️ TU CAMINO PERSONALIZADO",
    deptDeckShort:"🧭 Puente",deptEngineShort:"⚙️ Máquinas",
  },
  pt:{
    back:"◀ Voltar",
    slogan:"Formação marítima completa — convés e máquinas",
    qTitle:"SEU PERFIL MARÍTIMO",
    qSub:"Personalize sua jornada — leva 2 minutos",
    deptTitle:"🚢 Seu departamento?",
    deptDeck:"🧭 CONVÉS — Navegação",
    deptDeckSub:"Capitão, oficial, marinheiro...",
    deptEngine:"⚙️ MÁQUINAS — Energia e Propulsão",
    deptEngineSub:"Chefe de máquinas, oficial, oiler...",
    s1Deck:"⚓ Quem é você? (Convés)",
    qFutureDeck:"⛵ Futuro marinheiro (convés)",
    qCadetDeck:"🎓 Cadete navegação",
    qAB:"⚓ Marinheiro / AB",
    qOfficerDeck:"🧭 Oficial de navegação",
    qCaptain:"👑 Capitão / Master",
    s1Engine:"⚙️ Quem é você? (Máquinas)",
    qFutureEngine:"🔧 Futuro mecânico",
    qCadetEngine:"🎓 Cadete máquinas",
    qOiler:"🛢️ Oiler / Lubrificador",
    qJuniorEng:"⚙️ Mecânico júnior",
    qOfficerEngine:"🛠️ Oficial de máquinas (OMCV)",
    qChiefEng:"👑 Chefe de máquinas",
    s2Deck:"🎯 Seu objetivo (Convés)?",
    qNavigation:"🧭 Dominar a navegação",
    qSTCW:"🛟 Certificações STCW",
    qLaw:"⚖️ Direito marítimo",
    qCareerDeck:"🚢 Avançar — convés",
    qSafety:"🛡️ Segurança e sobrevivência",
    s2Engine:"🎯 Seu objetivo (Máquinas)?",
    qMoteur:"⚙️ Dominar o motor principal",
    qAuxiliaries:"🔧 Sistemas auxiliares",
    qMARPOL:"🌊 MARPOL sala de máquinas",
    qCareerEngine:"🛠️ Avançar — máquinas",
    qEnergy:"⚡ SEEMP / Eficiência energética",
    s3:"📊 Seu nível atual?",
    qZero:"🌱 Iniciante total",qBasic:"📄 Bases marítimas",qExp:"⚓ Experiente",
    s4:"🚢 Seu navio dos sonhos?",s4more:"Ver todos →",s4less:"← Reduzir",
    shipContainer:"🚢 Porta-contêineres",shipTanker:"🛢️ Petroleiro",
    shipCruise:"🛳️ Cruzeiro",shipOffshore:"🏗️ Offshore OSV",
    shipYacht:"⛵ Iate / Veleiro",shipSAR:"🆘 Salvamento SAR",
    shipChemical:"⚗️ Químico",shipGas:"💨 Gaseiro LNG",
    shipCar:"🚗 Ro-Ro",shipResearch:"🔬 Navio científico",
    shipTug:"⚓ Rebocador",shipFishing:"🎣 Pesca de altura",
    shipPWC:"🏄 Jet-ski / Salva-vidas",shipNavy:"🏛️ Marinha nacional",
    s5:"⏱️ Duração de estudo diário?",
    dur15:"⚡ 15 min / dia",dur30:"📚 30 min / dia",
    dur60:"🎯 1 hora / dia",durFree:"🌊 No meu ritmo",
    s6:"⏰ Horário preferido?",
    qMorning:"🌅 Manhã",qAfternoon:"☀️ Tarde",qEvening:"🌆 Noite",qNight:"🌙 Madrugada",
    s7:"🌍 Seu país de residência?",s7ph:"Ex: Brasil, Portugal, Angola...",
    s8:"🔔 Lembrete de formação por email?",qYes:"✅ Sim",qNo:"❌ Não",
    s9:"📸 Sua foto (opcional)",s9cta:"Adicionar minha foto",
    s9note:"Confidencial · Para seu cartão de status personalizado 🎁",
    qBtn:"GERAR MEU STATUS →",qBtnWait:"Responda todas as perguntas para continuar",
    summaryTitle:"🗺️ SUA JORNADA PERSONALIZADA",
    deptDeckShort:"🧭 Convés",deptEngineShort:"⚙️ Máquinas",
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
            width:st.sz,height:st.sz,borderRadius:"50%",
            background:"white",opacity:0,
            animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`,
          }}/>
        ))}
      </div>
      <style>{`
        @keyframes tw{0%,100%{opacity:0}50%{opacity:0.5}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes checkPop{0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
        @keyframes deptGlow{0%,100%{box-shadow:0 4px 16px rgba(0,0,0,0.2)}50%{box-shadow:0 8px 28px rgba(26,111,212,0.3)}}
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
      <div style={{
        height:54,display:"flex",alignItems:"center",
        padding:"0 16px",gap:12,
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
          <div style={{height:"100%",borderRadius:3,width:`${pct}%`,
            background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,
            transition:"width 0.5s ease"}}/>
        </div>
        <span style={{fontSize:11,color:C.muted,
          fontFamily:"'Cinzel',serif",letterSpacing:1,flexShrink:0}}>
          {step}/{total}
        </span>
      </div>
      {/* Progress dots */}
      <div style={{display:"flex",justifyContent:"center",gap:4,paddingBottom:8}}>
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

function Card({children,style={}}) {
  return (
    <div style={{
      background:"rgba(13,31,60,0.72)",
      border:`1px solid ${C.border}`,
      borderRadius:20,padding:"18px 16px",...style,
    }}>{children}</div>
  );
}

function SectionLabel({text,done}) {
  return (
    <div style={{
      display:"flex",alignItems:"center",
      justifyContent:"space-between",marginBottom:12,
    }}>
      <div style={{fontSize:13,fontWeight:700,
        color:done?C.gold2:C.muted,letterSpacing:0.5,
        transition:"color 0.3s"}}>{text}</div>
      {done&&(
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
      {selected&&(
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
function ProgressSummary({answers,t}) {
  const required=["dept","who","goal","level","ship","duration","time","reminder"];
  const done=required.filter(k=>answers[k]!==null&&answers[k]!=="").length;
  const total=required.length+(answers.country?.trim().length>0?1:0);
  const pct=Math.round((done/required.length)*100);

  return (
    <Card style={{
      background:`linear-gradient(135deg,rgba(26,111,212,0.1),rgba(201,146,42,0.06))`,
      border:`1px solid ${C.gold}33`,marginBottom:16,
    }}>
      <div style={{display:"flex",justifyContent:"space-between",
        alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:11,letterSpacing:2,color:C.gold,
          fontFamily:"'Cinzel',serif"}}>{t.summaryTitle}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:16,
          fontWeight:700,color:pct===100?C.gold2:C.blue2}}>{pct}%</div>
      </div>
      <div style={{height:4,borderRadius:4,
        background:"rgba(255,255,255,0.08)",overflow:"hidden",marginBottom:12}}>
        <div style={{height:"100%",borderRadius:4,width:`${pct}%`,
          background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,
          transition:"width 0.5s ease"}}/>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {answers.dept&&(
          <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,
            background:answers.dept==="deck"?"rgba(26,111,212,0.2)":"rgba(230,126,34,0.2)",
            border:`1px solid ${answers.dept==="deck"?C.blue2:C.orange}44`,
            color:answers.dept==="deck"?C.blue2:C.orange}}>
            {answers.dept==="deck"?t.deptDeckShort:t.deptEngineShort}
          </span>
        )}
        {answers.ship&&(
          <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,
            background:"rgba(201,146,42,0.15)",
            border:`1px solid ${C.gold}44`,color:C.gold2}}>
            🚢 {answers.ship}
          </span>
        )}
        {answers.duration&&(
          <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,
            background:"rgba(255,255,255,0.06)",
            border:"1px solid rgba(255,255,255,0.1)",color:C.muted}}>
            ⏱️ {answers.duration}
          </span>
        )}
      </div>
    </Card>
  );
}

// ── MAIN ──────────────────────────────────────
export default function QuestionnaireS7({
  lang="fr",
  onNext=()=>{},
  onBack=()=>{},
  setProfile=()=>{},
}) {
  const t=T[lang]||T.fr;
  const [vis,setVis]=useState(false);
  const [showMoreShips,setShowMoreShips]=useState(false);
  const [country,setCountry]=useState("");
  const [answers,setAnswers]=useState({
    dept:null,who:null,goal:null,level:null,
    ship:null,duration:null,time:null,
    reminder:null,country:"",photo:null,
  });

  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);

  const set=(k,v)=>setAnswers(p=>({...p,[k]:v}));

  const requiredKeys=["dept","who","goal","level","ship","duration","time","reminder"];
  const allDone=requiredKeys.every(k=>answers[k]!==null)&&country.trim().length>0;

  const isDeck=answers.dept==="deck";
  const isEngine=answers.dept==="engine";

  // Who options — adapts to department
  const whoOptsDeck=[
    {v:"future_deck",l:t.qFutureDeck},{v:"cadet_deck",l:t.qCadetDeck},
    {v:"ab",l:t.qAB},{v:"officer_deck",l:t.qOfficerDeck},
    {v:"captain",l:t.qCaptain},
  ];
  const whoOptsEngine=[
    {v:"future_eng",l:t.qFutureEngine},{v:"cadet_eng",l:t.qCadetEngine},
    {v:"oiler",l:t.qOiler},{v:"junior_eng",l:t.qJuniorEng},
    {v:"officer_eng",l:t.qOfficerEngine},{v:"chief_eng",l:t.qChiefEng},
  ];
  const goalOptsDeck=[
    {v:"nav",l:t.qNavigation},{v:"stcw",l:t.qSTCW},
    {v:"law",l:t.qLaw},{v:"career_deck",l:t.qCareerDeck},
    {v:"safety",l:t.qSafety},
  ];
  const goalOptsEngine=[
    {v:"engine",l:t.qMoteur},{v:"aux",l:t.qAuxiliaries},
    {v:"marpol",l:t.qMARPOL},{v:"career_eng",l:t.qCareerEngine},
    {v:"energy",l:t.qEnergy},
  ];
  const levelOpts=[
    {v:"zero",l:t.qZero},{v:"basic",l:t.qBasic},{v:"exp",l:t.qExp},
  ];
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
  const durationOpts=[
    {v:"15min",l:t.dur15},{v:"30min",l:t.dur30},
    {v:"60min",l:t.dur60},{v:"free",l:t.durFree},
  ];
  const timeOpts=[
    {v:"morning",l:t.qMorning},{v:"afternoon",l:t.qAfternoon},
    {v:"evening",l:t.qEvening},{v:"night",l:t.qNight},
  ];

  const handleSubmit=()=>{
    if(!allDone) return;
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
          <div style={{textAlign:"center",marginBottom:8}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:20,
              fontWeight:700,color:C.white,marginBottom:4}}>{t.qTitle}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:4}}>{t.qSub}</div>
            {/* Nouveau slogan */}
            <div style={{
              fontSize:11,color:C.gold,fontStyle:"italic",
              letterSpacing:0.5,padding:"4px 0",
            }}>{t.slogan}</div>
          </div>

          <div style={{height:1,margin:"12px 0 16px",
            background:`linear-gradient(90deg,transparent,${C.gold}44,transparent)`}}/>

          <ProgressSummary answers={answers} t={t}/>

          {/* ── 0 — DÉPARTEMENT ── */}
          <Card style={{marginBottom:14,
            border:`1px solid ${answers.dept?"rgba(201,146,42,0.4)":C.border}`,
            boxShadow:answers.dept?`0 4px 20px rgba(201,146,42,0.1)`:"none",
          }}>
            <SectionLabel text={t.deptTitle} done={answers.dept!==null}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {/* PONT */}
              <button onClick={()=>{
                set("dept","deck");
                // Reset who/goal if switching dept
                set("who",null);set("goal",null);
              }} style={{
                padding:"16px 12px",borderRadius:16,
                background:answers.dept==="deck"
                  ?"linear-gradient(135deg,rgba(26,111,212,0.3),rgba(13,31,60,0.8))"
                  :"rgba(255,255,255,0.04)",
                border:`2px solid ${answers.dept==="deck"?C.blue2:"rgba(255,255,255,0.1)"}`,
                cursor:"pointer",textAlign:"center",
                transform:answers.dept==="deck"?"translateY(-2px)":"translateY(0)",
                boxShadow:answers.dept==="deck"?`0 8px 24px rgba(26,111,212,0.25)`:"none",
                transition:"all 0.25s",
              }}>
                <div style={{fontSize:32,marginBottom:6}}>🧭</div>
                <div style={{fontSize:13,fontWeight:700,
                  color:answers.dept==="deck"?C.white:C.muted,
                  fontFamily:"'Cinzel',serif",letterSpacing:1,marginBottom:4}}>
                  {lang==="fr"?"PONT":lang==="es"?"PUENTE":lang==="pt"?"CONVÉS":"DECK"}
                </div>
                <div style={{fontSize:10,color:C.muted,lineHeight:1.4}}>
                  {t.deptDeckSub}
                </div>
                {answers.dept==="deck"&&(
                  <div style={{marginTop:8,fontSize:11,color:C.blue2,fontWeight:700}}>
                    ✓ Sélectionné
                  </div>
                )}
              </button>

              {/* MACHINE */}
              <button onClick={()=>{
                set("dept","engine");
                set("who",null);set("goal",null);
              }} style={{
                padding:"16px 12px",borderRadius:16,
                background:answers.dept==="engine"
                  ?"linear-gradient(135deg,rgba(230,126,34,0.25),rgba(13,31,60,0.8))"
                  :"rgba(255,255,255,0.04)",
                border:`2px solid ${answers.dept==="engine"?C.orange:"rgba(255,255,255,0.1)"}`,
                cursor:"pointer",textAlign:"center",
                transform:answers.dept==="engine"?"translateY(-2px)":"translateY(0)",
                boxShadow:answers.dept==="engine"?`0 8px 24px rgba(230,126,34,0.2)`:"none",
                transition:"all 0.25s",
              }}>
                <div style={{fontSize:32,marginBottom:6}}>⚙️</div>
                <div style={{fontSize:13,fontWeight:700,
                  color:answers.dept==="engine"?C.white:C.muted,
                  fontFamily:"'Cinzel',serif",letterSpacing:1,marginBottom:4}}>
                  {lang==="fr"?"MACHINE":lang==="es"?"MÁQUINAS":lang==="pt"?"MÁQUINAS":"ENGINE"}
                </div>
                <div style={{fontSize:10,color:C.muted,lineHeight:1.4}}>
                  {t.deptEngineSub}
                </div>
                {answers.dept==="engine"&&(
                  <div style={{marginTop:8,fontSize:11,color:C.orange,fontWeight:700}}>
                    ✓ Sélectionné
                  </div>
                )}
              </button>
            </div>
          </Card>

          {/* ── 1 — QUI ES-TU (adapté au dept) ── */}
          {answers.dept&&(
            <Card style={{marginBottom:14}}>
              <SectionLabel
                text={isDeck?t.s1Deck:t.s1Engine}
                done={answers.who!==null}/>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {(isDeck?whoOptsDeck:whoOptsEngine).map(o=>(
                  <Chip key={o.v} label={o.l}
                    selected={answers.who===o.v}
                    onClick={()=>set("who",o.v)}/>
                ))}
              </div>
            </Card>
          )}

          {/* ── 2 — OBJECTIF (adapté au dept) ── */}
          {answers.dept&&(
            <Card style={{marginBottom:14}}>
              <SectionLabel
                text={isDeck?t.s2Deck:t.s2Engine}
                done={answers.goal!==null}/>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {(isDeck?goalOptsDeck:goalOptsEngine).map(o=>(
                  <Chip key={o.v} label={o.l}
                    selected={answers.goal===o.v}
                    onClick={()=>set("goal",o.v)}/>
                ))}
              </div>
            </Card>
          )}

          {/* ── 3 — NIVEAU ── */}
          <Card style={{marginBottom:14}}>
            <SectionLabel text={t.s3} done={answers.level!==null}/>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {levelOpts.map(o=>(
                <Chip key={o.v} label={o.l}
                  selected={answers.level===o.v}
                  onClick={()=>set("level",o.v)}/>
              ))}
            </div>
          </Card>

          {/* ── 4 — NAVIRE DE RÊVE ── */}
          <Card style={{marginBottom:14}}>
            <SectionLabel text={t.s4} done={answers.ship!==null}/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
              gap:10,marginBottom:12}}>
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
              cursor:"pointer",fontFamily:"'Nunito',sans-serif",
            }}>
              {showMoreShips?t.s4less:t.s4more}
            </button>
          </Card>

          {/* ── 5 — DURÉE ── */}
          <Card style={{marginBottom:14}}>
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
                ⭐ Recommandé — 15 min / jour suffit pour progresser régulièrement
              </div>
            )}
          </Card>

          {/* ── 6 — HEURE ── */}
          <Card style={{marginBottom:14}}>
            <SectionLabel text={t.s6} done={answers.time!==null}/>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {timeOpts.map(o=>(
                <Chip key={o.v} label={o.l}
                  selected={answers.time===o.v}
                  onClick={()=>set("time",o.v)}/>
              ))}
            </div>
          </Card>

          {/* ── 7 — PAYS ── */}
          <Card style={{marginBottom:14}}>
            <SectionLabel text={t.s7} done={country.trim().length>0}/>
            <input type="text" placeholder={t.s7ph}
              value={country}
              onChange={e=>{ setCountry(e.target.value); set("country",e.target.value); }}
              style={{
                width:"100%",padding:"13px 14px",borderRadius:12,
                background:"rgba(255,255,255,0.07)",
                border:`1.5px solid ${country.trim().length>0?C.gold:C.border}`,
                color:C.white,fontSize:14,outline:"none",
                fontFamily:"'Nunito',sans-serif",
                transition:"border-color 0.2s",
              }}/>
            {country.trim().length>0&&(
              <div style={{marginTop:8,fontSize:11,color:C.muted}}>
                🌍 La réglementation sera adaptée à ton pays
              </div>
            )}
          </Card>

          {/* ── 8 — RAPPEL ── */}
          <Card style={{marginBottom:14}}>
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
                background:`rgba(77,166,255,0.1)`,border:`1px solid ${C.blue2}33`,
                fontSize:12,color:C.blue2}}>
                🔔 Rappel configuré selon ton heure préférée
              </div>
            )}
          </Card>

          {/* ── 9 — PHOTO ── */}
          <Card style={{marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:700,
              color:C.muted,marginBottom:10}}>{t.s9}</div>
            <div style={{borderRadius:14,padding:"16px 14px",
              background:"rgba(255,255,255,0.04)",
              border:`1px dashed ${C.border}`,
              display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
              <div style={{width:52,height:52,borderRadius:"50%",flexShrink:0,
                background:`linear-gradient(135deg,${C.navy3},#112244)`,
                border:`1.5px dashed ${C.gold}66`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
                📸
              </div>
              <div>
                <div style={{fontSize:13,color:C.white,fontWeight:600,marginBottom:4}}>
                  {t.s9cta}
                </div>
                <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>{t.s9note}</div>
              </div>
            </div>
          </Card>

          {/* ── SUBMIT ── */}
          <button onClick={handleSubmit} disabled={!allDone} style={{
            width:"100%",padding:"17px 0",border:"none",borderRadius:16,
            background:allDone
              ?`linear-gradient(135deg,${C.blue},${C.gold})`
              :"rgba(26,111,212,0.25)",
            fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,
            color:allDone?C.white:"rgba(240,244,255,0.35)",
            cursor:allDone?"pointer":"not-allowed",
            boxShadow:allDone?"0 10px 36px rgba(26,111,212,0.4)":"none",
            transition:"all 0.3s",marginBottom:12,
          }}>{t.qBtn}</button>

          {!allDone&&(
            <div style={{textAlign:"center",fontSize:12,color:C.muted,lineHeight:1.6}}>
              {t.qBtnWait}<br/>
              <span style={{color:C.gold2,fontWeight:700}}>
                {requiredKeys.filter(k=>answers[k]!==null).length+
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
