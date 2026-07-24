// @ts-nocheck
import { useState, useEffect, useRef } from "react";

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
    // Rang actuel
    s1Deck:"⚓ Qui es-tu ? (Pont)",
    s1Engine:"⚙️ Qui es-tu ? (Machine)",
    // Rang visé
    s1bDeck:"🎯 Ton rang visé ? (Pont)",
    s1bEngine:"🎯 Ton rang visé ? (Machine)",
    // Libellés des rangs — source unique : rankRegistry.ts
    rankLabels:{
      deck_cadet:"🎓 Cadet Pont",
      os:"⚓ Matelot Léger (OS)",
      ab:"🪢 Matelot Qualifié (AB)",
      bosun:"🛠️ Maître d'Équipage (Bosun)",
      oow:"🧭 Officier Chef de Quart (OOW)",
      chief_officer:"🎖️ Second Capitaine",
      master:"👑 Capitaine",
      engine_cadet:"🎓 Cadet Machine",
      wiper:"🧹 Nettoyeur (Wiper)",
      motorman:"🔩 Motoriste",
      oiler:"🛢️ Graisseur (Oiler)",
      fourth_engineer:"🔧 Quatrième Mécanicien",
      third_engineer:"⚙️ Troisième Mécanicien",
      second_engineer:"🛠️ Second Mécanicien",
      chief_engineer:"👑 Chef Mécanicien",
    },
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
    shipYacht:"⛵ Yacht / Voilier",
    // Ships more
    shipChemical:"⚗️ Chimiquier",
    shipGas:"💨 Gazier LNG",
    shipResearch:"🔬 Navire scientifique",
    shipTug:"⚓ Remorqueur",
    shipFishing:"🎣 Pêche hauturière",
    shipGeneralCargo:"📦 Cargo général",
    shipBulk:"🪨 Vraquier",
    shipLPG:"🔥 Gazier GPL",
    shipAHTS:"⛓️ Remorqueur AHTS",
    shipPSV:"🚚 Ravitailleur offshore (PSV)",
    shipOSV:"🏗️ Soutien offshore (OSV)",
    shipPassenger:"🧳 Navire à passagers",
    shipRoRo:"⛴️ Ferry Ro-Ro",
    shipDredger:"⛏️ Drague",
    shipCableLayer:"🔌 Câblier",
    shipHeavyLift:"🏋️ Levage lourd",
    shipJackup:"🛗 Plateforme Jack-up",
    shipDrillship:"🕳️ Navire de forage",
    shipFPSO:"🏭 Production flottante (FPSO)",
    shipFSO:"🗄️ Stockage flottant (FSO)",
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
    // Photo
    s9:"📸 Ta photo (optionnel)",
    s9cta:"Ajouter ma photo",
    s9camera:"Appareil",
    s9gallery:"Galerie",
    s9note:"Confidentielle · Pour ta carte statut personnalisée 🎁 · Max 5 Mo",
    s9error:"Photo trop lourde — maximum 5 Mo",
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
    s1Engine:"⚙️ Who are you? (Engine)",
    s1bDeck:"🎯 Your target rank? (Deck)",
    s1bEngine:"🎯 Your target rank? (Engine)",
    rankLabels:{
      deck_cadet:"🎓 Deck Cadet",
      os:"⚓ Ordinary Seaman (OS)",
      ab:"🪢 Able Seaman (AB)",
      bosun:"🛠️ Bosun",
      oow:"🧭 Officer of the Watch (OOW)",
      chief_officer:"🎖️ Chief Officer",
      master:"👑 Master",
      engine_cadet:"🎓 Engine Cadet",
      wiper:"🧹 Wiper",
      motorman:"🔩 Motorman",
      oiler:"🛢️ Oiler",
      fourth_engineer:"🔧 Fourth Engineer",
      third_engineer:"⚙️ Third Engineer",
      second_engineer:"🛠️ Second Engineer",
      chief_engineer:"👑 Chief Engineer",
    },
    s3:"📊 Your current level?",
    qZero:"🌱 Total beginner",
    qBasic:"📄 Basic maritime",
    qExp:"⚓ Experienced",
    s4:"🚢 Your dream ship?",
    s4more:"See all ships →",s4less:"← Reduce",
    shipContainer:"🚢 Container ship",shipTanker:"🛢️ Oil tanker",
    shipCruise:"🛳️ Cruise ship",
    shipYacht:"⛵ Yacht / Sailboat",
    shipChemical:"⚗️ Chemical tanker",shipGas:"💨 LNG Gas carrier",
    shipResearch:"🔬 Research vessel",
    shipTug:"⚓ Tugboat",shipFishing:"🎣 Fishing vessel",
    shipGeneralCargo:"📦 General cargo",
    shipBulk:"🪨 Bulk carrier",
    shipLPG:"🔥 LPG Gas carrier",
    shipAHTS:"⛓️ Anchor handling tug (AHTS)",
    shipPSV:"🚚 Platform supply vessel (PSV)",
    shipOSV:"🏗️ Offshore support vessel (OSV)",
    shipPassenger:"🧳 Passenger ship",
    shipRoRo:"⛴️ Ro-Ro ferry",
    shipDredger:"⛏️ Dredger",
    shipCableLayer:"🔌 Cable layer",
    shipHeavyLift:"🏋️ Heavy lift vessel",
    shipJackup:"🛗 Jack-up rig",
    shipDrillship:"🕳️ Drillship",
    shipFPSO:"🏭 Floating production (FPSO)",
    shipFSO:"🗄️ Floating storage (FSO)",
    s5:"⏱️ Daily study duration?",
    dur15:"⚡ 15 min / day",dur30:"📚 30 min / day",
    dur60:"🎯 1 hour / day",durFree:"🌊 At my own pace",
    s6:"⏰ Preferred time?",
    qMorning:"🌅 Morning",qAfternoon:"☀️ Afternoon",
    qEvening:"🌆 Evening",qNight:"🌙 Night",
    s7:"🌍 Country of residence?",s7ph:"E.g: Nigeria, UK, Philippines...",
    s9:"📸 Your photo (optional)",
    s9cta:"Add my photo",s9camera:"Camera",s9gallery:"Gallery",
    s9note:"Confidential · For your personalized status card 🎁 · Max 5 MB",
    s9error:"Photo too large — maximum 5 MB",
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
    s1Engine:"⚙️ ¿Quién eres? (Máquinas)",
    s1bDeck:"🎯 ¿Tu rango objetivo? (Puente)",
    s1bEngine:"🎯 ¿Tu rango objetivo? (Máquinas)",
    rankLabels:{
      deck_cadet:"🎓 Cadete de Puente",
      os:"⚓ Marinero Ordinario (OS)",
      ab:"🪢 Marinero Calificado (AB)",
      bosun:"🛠️ Contramaestre (Bosun)",
      oow:"🧭 Oficial de Guardia (OOW)",
      chief_officer:"🎖️ Primer Oficial",
      master:"👑 Capitán",
      engine_cadet:"🎓 Cadete de Máquinas",
      wiper:"🧹 Limpiador (Wiper)",
      motorman:"🔩 Motorista",
      oiler:"🛢️ Engrasador (Oiler)",
      fourth_engineer:"🔧 Cuarto Maquinista",
      third_engineer:"⚙️ Tercer Maquinista",
      second_engineer:"🛠️ Segundo Maquinista",
      chief_engineer:"👑 Jefe de Máquinas",
    },
    s3:"📊 ¿Tu nivel actual?",
    qZero:"🌱 Principiante total",qBasic:"📄 Bases marítimas",qExp:"⚓ Experimentado",
    s4:"🚢 ¿Tu barco soñado?",s4more:"Ver todos →",s4less:"← Reducir",
    shipContainer:"🚢 Portacontenedores",shipTanker:"🛢️ Petrolero",
    shipCruise:"🛳️ Crucero",
    shipYacht:"⛵ Yate / Velero",
    shipChemical:"⚗️ Quimiquero",shipGas:"💨 Gasero LNG",
    shipResearch:"🔬 Buque científico",
    shipTug:"⚓ Remolcador",shipFishing:"🎣 Pesca de altura",
    shipGeneralCargo:"📦 Carga general",
    shipBulk:"🪨 Granelero",
    shipLPG:"🔥 Gasero GLP",
    shipAHTS:"⛓️ Remolcador AHTS",
    shipPSV:"🚚 Buque de suministro (PSV)",
    shipOSV:"🏗️ Apoyo offshore (OSV)",
    shipPassenger:"🧳 Buque de pasajeros",
    shipRoRo:"⛴️ Ferry Ro-Ro",
    shipDredger:"⛏️ Draga",
    shipCableLayer:"🔌 Cablero",
    shipHeavyLift:"🏋️ Carga pesada",
    shipJackup:"🛗 Plataforma Jack-up",
    shipDrillship:"🕳️ Buque perforador",
    shipFPSO:"🏭 Producción flotante (FPSO)",
    shipFSO:"🗄️ Almacenamiento flotante (FSO)",
    s5:"⏱️ ¿Duración de estudio diario?",
    dur15:"⚡ 15 min / día",dur30:"📚 30 min / día",
    dur60:"🎯 1 hora / día",durFree:"🌊 A mi ritmo",
    s6:"⏰ ¿Hora preferida?",
    qMorning:"🌅 Mañana",qAfternoon:"☀️ Tarde",qEvening:"🌆 Noche",qNight:"🌙 Madrugada",
    s7:"🌍 ¿Tu país de residencia?",s7ph:"Ej: España, México...",
    s9:"📸 Tu foto (opcional)",s9cta:"Agregar mi foto",
    s9camera:"Cámara",
    s9gallery:"Galería",
    s9note:"Confidencial · Para tu tarjeta personalizada 🎁 · Max 5 MB",
    s9error:"Foto demasiado grande — máximo 5 MB",
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
    s1Engine:"⚙️ Quem é você? (Máquinas)",
    s1bDeck:"🎯 Seu posto almejado? (Convés)",
    s1bEngine:"🎯 Seu posto almejado? (Máquinas)",
    rankLabels:{
      deck_cadet:"🎓 Cadete de Convés",
      os:"⚓ Marinheiro Ordinário (OS)",
      ab:"🪢 Marinheiro Qualificado (AB)",
      bosun:"🛠️ Contramestre (Bosun)",
      oow:"🧭 Oficial de Quarto (OOW)",
      chief_officer:"🎖️ Imediato",
      master:"👑 Comandante",
      engine_cadet:"🎓 Cadete de Máquinas",
      wiper:"🧹 Limpador (Wiper)",
      motorman:"🔩 Motorista",
      oiler:"🛢️ Lubrificador (Oiler)",
      fourth_engineer:"🔧 Quarto Maquinista",
      third_engineer:"⚙️ Terceiro Maquinista",
      second_engineer:"🛠️ Segundo Maquinista",
      chief_engineer:"👑 Chefe de Máquinas",
    },
    s3:"📊 Seu nível atual?",
    qZero:"🌱 Iniciante total",qBasic:"📄 Bases marítimas",qExp:"⚓ Experiente",
    s4:"🚢 Seu navio dos sonhos?",s4more:"Ver todos →",s4less:"← Reduzir",
    shipContainer:"🚢 Porta-contêineres",shipTanker:"🛢️ Petroleiro",
    shipCruise:"🛳️ Cruzeiro",
    shipYacht:"⛵ Iate / Veleiro",
    shipChemical:"⚗️ Químico",shipGas:"💨 Gaseiro LNG",
    shipResearch:"🔬 Navio científico",
    shipTug:"⚓ Rebocador",shipFishing:"🎣 Pesca de altura",
    shipGeneralCargo:"📦 Carga geral",
    shipBulk:"🪨 Graneleiro",
    shipLPG:"🔥 Gaseiro GLP",
    shipAHTS:"⛓️ Rebocador AHTS",
    shipPSV:"🚚 Navio de abastecimento (PSV)",
    shipOSV:"🏗️ Apoio offshore (OSV)",
    shipPassenger:"🧳 Navio de passageiros",
    shipRoRo:"⛴️ Ferry Ro-Ro",
    shipDredger:"⛏️ Draga",
    shipCableLayer:"🔌 Navio lança-cabos",
    shipHeavyLift:"🏋️ Carga pesada",
    shipJackup:"🛗 Plataforma Jack-up",
    shipDrillship:"🕳️ Navio-sonda",
    shipFPSO:"🏭 Produção flutuante (FPSO)",
    shipFSO:"🗄️ Armazenamento flutuante (FSO)",
    s5:"⏱️ Duração de estudo diário?",
    dur15:"⚡ 15 min / dia",dur30:"📚 30 min / dia",
    dur60:"🎯 1 hora / dia",durFree:"🌊 No meu ritmo",
    s6:"⏰ Horário preferido?",
    qMorning:"🌅 Manhã",qAfternoon:"☀️ Tarde",qEvening:"🌆 Noite",qNight:"🌙 Madrugada",
    s7:"🌍 Seu país de residência?",s7ph:"Ex: Brasil, Portugal, Angola...",
    s9:"📸 Sua foto (opcional)",s9cta:"Adicionar minha foto",
    s9camera:"Câmera",
    s9gallery:"Galeria",
    s9note:"Confidencial · Para seu cartão de status personalizado 🎁 · Max 5 MB",
    s9error:"Foto muito grande — máximo 5 MB",
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
  const required=["dept","who","target","level","ship","duration","time"];
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
    dept:null,who:null,target:null,level:null,
    ship:null,duration:null,time:null,
    country:"",photo:null,
  });

  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);

  const set=(k,v)=>setAnswers(p=>({...p,[k]:v}));

  const requiredKeys=["dept","who","target","level","ship","duration","time"];
  const allDone=requiredKeys.every(k=>answers[k]!==null)&&country.trim().length>0;

  const sectionRefs=useRef({});
  const [errorKey,setErrorKey]=useState(null);
  const [errorMsg,setErrorMsg]=useState("");
  const cameraInputRef=useRef(null);
  const galleryInputRef=useRef(null);
  const [photo,setPhoto]=useState(null);
  const [photoError,setPhotoError]=useState(false);

  useEffect(()=>{
    try{
      const p=typeof window!=="undefined"&&localStorage.getItem("map_user_photo");
      if(p) setPhoto(p);
    }catch{}
  },[]);

  const handlePhotoChange=(e)=>{
    const file=e.target.files&&e.target.files[0];
    if(!file) return;
    const MAX_SIZE=5*1024*1024;
    if(file.size>MAX_SIZE){
      setPhotoError(true);
      if(cameraInputRef.current) cameraInputRef.current.value="";
      if(galleryInputRef.current) galleryInputRef.current.value="";
      return;
    }
    setPhotoError(false);
    const reader=new FileReader();
    reader.onload=()=>{
      const dataUrl=String(reader.result||"");
      setPhoto(dataUrl);
      try{ localStorage.setItem("map_user_photo",dataUrl); }catch{}
      set("photo",dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto=(e)=>{
    e&&e.stopPropagation&&e.stopPropagation();
    setPhoto(null);
    setPhotoError(false);
    try{ localStorage.removeItem("map_user_photo"); }catch{}
    set("photo",null);
    if(cameraInputRef.current) cameraInputRef.current.value="";
    if(galleryInputRef.current) galleryInputRef.current.value="";
  };

  const errorLabels={
    fr:{dept:"ton département",who:"qui tu es",target:"ton rang visé",level:"ton niveau",
      ship:"ton navire de rêve",duration:"la durée d'étude",time:"ton moment préféré",
      country:"ton pays"},
    en:{dept:"your department",who:"who you are",target:"your target rank",level:"your level",
      ship:"your dream ship",duration:"the study duration",time:"your preferred time",
      country:"your country"},
    es:{dept:"tu departamento",who:"quién eres",target:"tu rango objetivo",level:"tu nivel",
      ship:"tu barco soñado",duration:"la duración",time:"tu momento preferido",
      country:"tu país"},
    pt:{dept:"seu departamento",who:"quem você é",target:"seu posto almejado",level:"seu nível",
      ship:"seu navio dos sonhos",duration:"a duração",time:"seu horário preferido",
      country:"seu país"},
  };
  const errorPrefix={fr:"Réponds à",en:"Please answer",es:"Responde",pt:"Responda"};

  const isDeck=answers.dept==="deck";
  const isEngine=answers.dept==="engine";

  // Rank options — adapt to department, sourced from rankRegistry.ts (deck_cadet..master / engine_cadet..chief_engineer)
  const DECK_RANKS=["deck_cadet","os","ab","bosun","oow","chief_officer","master"];
  const ENGINE_RANKS=["engine_cadet","wiper","motorman","oiler","fourth_engineer","third_engineer","second_engineer","chief_engineer"];
  const whoOptsDeck=DECK_RANKS.map(r=>({v:r,l:t.rankLabels[r]}));
  const whoOptsEngine=ENGINE_RANKS.map(r=>({v:r,l:t.rankLabels[r]}));
  // Target rank reuses the same rank list — a rank can be its own target (e.g. reviewing own-rank lessons)
  const targetOptsDeck=whoOptsDeck;
  const targetOptsEngine=whoOptsEngine;
  const levelOpts=[
    {v:"zero",l:t.qZero},{v:"basic",l:t.qBasic},{v:"exp",l:t.qExp},
  ];
  // Ship ids match VesselTypeId exactly (vesselTypeRegistry.ts)
  const mainShips=[
    {id:"container_ship",emoji:"🚢",label:t.shipContainer},
    {id:"oil_tanker",emoji:"🛢️",label:t.shipTanker},
    {id:"cruise_ship",emoji:"🛳️",label:t.shipCruise},
    {id:"yacht",emoji:"⛵",label:t.shipYacht},
  ];
  const moreShips=[
    {id:"chemical_tanker",emoji:"⚗️",label:t.shipChemical},
    {id:"lng_carrier",emoji:"💨",label:t.shipGas},
    {id:"research_vessel",emoji:"🔬",label:t.shipResearch},
    {id:"tugboat",emoji:"⚓",label:t.shipTug},
    {id:"fishing_vessel",emoji:"🎣",label:t.shipFishing},
    {id:"general_cargo",emoji:"📦",label:t.shipGeneralCargo},
    {id:"bulk_carrier",emoji:"🪨",label:t.shipBulk},
    {id:"lpg_carrier",emoji:"🔥",label:t.shipLPG},
    {id:"ahts",emoji:"⛓️",label:t.shipAHTS},
    {id:"psv",emoji:"🚚",label:t.shipPSV},
    {id:"osv",emoji:"🏗️",label:t.shipOSV},
    {id:"passenger_ship",emoji:"🧳",label:t.shipPassenger},
    {id:"roro_passenger",emoji:"⛴️",label:t.shipRoRo},
    {id:"dredger",emoji:"⛏️",label:t.shipDredger},
    {id:"cable_layer",emoji:"🔌",label:t.shipCableLayer},
    {id:"heavy_lift",emoji:"🏋️",label:t.shipHeavyLift},
    {id:"jackup",emoji:"🛗",label:t.shipJackup},
    {id:"drillship",emoji:"🕳️",label:t.shipDrillship},
    {id:"fpso",emoji:"🏭",label:t.shipFPSO},
    {id:"fso",emoji:"🗄️",label:t.shipFSO},
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
    const firstMissing=requiredKeys.find(k=>answers[k]===null)
      ||(country.trim().length===0?"country":null);
    if(firstMissing){
      const labels=errorLabels[lang]||errorLabels.fr;
      setErrorKey(firstMissing);
      setErrorMsg(`${errorPrefix[lang]||errorPrefix.fr} ${labels[firstMissing]}.`);
      const node=sectionRefs.current[firstMissing];
      if(node){
        node.scrollIntoView({behavior:"smooth",block:"center"});
        setTimeout(()=>{ try{ node.focus({preventScroll:true}); }catch(e){} },300);
      }
      return;
    }
    setErrorKey(null);setErrorMsg("");
    setProfile({...answers,country,lang});
    onNext();
  };

  const sectionProps=(key)=>({
    ref:(el)=>{ sectionRefs.current[key]=el; },
    tabIndex:-1,
    "aria-invalid":errorKey===key||undefined,
    style:{outline:"none",scrollMarginTop:80},
  });

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
          <div {...sectionProps("dept")}>
          <Card style={{marginBottom:14,
            border:`1px solid ${answers.dept?"rgba(201,146,42,0.4)":C.border}`,
            boxShadow:answers.dept?`0 4px 20px rgba(201,146,42,0.1)`:"none",
          }}>
            <SectionLabel text={t.deptTitle} done={answers.dept!==null}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {/* PONT */}
              <button onClick={()=>{
                set("dept","deck");
                // Reset who/target if switching dept
                set("who",null);set("target",null);
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
                set("who",null);set("target",null);
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
          </div>

          {/* ── 1 — RANG ACTUEL (adapté au dept) ── */}
          {answers.dept&&(
            <div {...sectionProps("who")}>
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
            </div>
          )}

          {/* ── 1b — RANG VISÉ (adapté au dept) ── */}
          {answers.dept&&(
            <div {...sectionProps("target")}>
            <Card style={{marginBottom:14}}>
              <SectionLabel
                text={isDeck?t.s1bDeck:t.s1bEngine}
                done={answers.target!==null}/>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {(isDeck?targetOptsDeck:targetOptsEngine).map(o=>(
                  <Chip key={o.v} label={o.l}
                    selected={answers.target===o.v}
                    onClick={()=>set("target",o.v)}/>
                ))}
              </div>
            </Card>
            </div>
          )}

          {/* ── 2 — NIVEAU ── */}
          <div {...sectionProps("level")}>
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
          </div>

          {/* ── 3 — NAVIRE DE RÊVE ── */}
          <div {...sectionProps("ship")}>
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
          </div>

          {/* ── 4 — DURÉE ── */}
          <div {...sectionProps("duration")}>
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
          </div>

          {/* ── 5 — HEURE ── */}
          <div {...sectionProps("time")}>
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
          </div>

          {/* ── 6 — PAYS ── */}
          <div {...sectionProps("country")}>
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
              }}
              aria-invalid={errorKey==="country"||undefined}
              aria-label={t.s7}/>
            {country.trim().length>0&&(
              <div style={{marginTop:8,fontSize:11,color:C.muted}}>
                🌍 La réglementation sera adaptée à ton pays
              </div>
            )}
          </Card>
          </div>

          {/* ── 7 — PHOTO ── */}
          <Card style={{marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:700,
              color:C.muted,marginBottom:10}}>{t.s9}</div>
            <input ref={cameraInputRef} type="file" accept="image/*" capture="user"
              onChange={handlePhotoChange}
              style={{position:"absolute",width:1,height:1,opacity:0,pointerEvents:"none"}}
              aria-label={t.s9camera}/>
            <input ref={galleryInputRef} type="file" accept="image/*"
              onChange={handlePhotoChange}
              style={{position:"absolute",width:1,height:1,opacity:0,pointerEvents:"none"}}
              aria-label={t.s9gallery}/>

            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
              <div style={{width:64,height:64,borderRadius:"50%",flexShrink:0,
                background:photo
                  ?`url(${photo}) center/cover`
                  :`linear-gradient(135deg,${C.navy3},#112244)`,
                border:`1.5px dashed ${C.gold}66`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,
                overflow:"hidden"}}>
                {!photo&&"📸"}
              </div>
              {photo && (
                <button type="button" onClick={removePhoto}
                  aria-label={lang==="fr"?"Retirer la photo":lang==="es"?"Quitar foto":lang==="pt"?"Remover foto":"Remove photo"}
                  style={{width:32,height:32,borderRadius:"50%",
                    border:`1px solid ${C.border}`,background:"rgba(0,0,0,0.4)",
                    color:C.white,cursor:"pointer",fontSize:16,lineHeight:1,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                  ✕
                </button>
              )}
            </div>

            <div style={{display:"flex",gap:10}}>
              <button type="button" onClick={()=>cameraInputRef.current&&cameraInputRef.current.click()}
                style={{
                  flex:1,
                  display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                  padding:"14px 10px",borderRadius:14,
                  background:"rgba(255,255,255,0.05)",
                  border:`1.5px solid ${C.border}`,
                  color:C.white,cursor:"pointer",
                  fontFamily:"'Nunito',sans-serif",
                  fontSize:13,fontWeight:600,
                }}>
                <span style={{fontSize:22}}>📷</span>
                <span>{t.s9camera}</span>
              </button>
              <button type="button" onClick={()=>galleryInputRef.current&&galleryInputRef.current.click()}
                style={{
                  flex:1,
                  display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                  padding:"14px 10px",borderRadius:14,
                  background:"rgba(255,255,255,0.05)",
                  border:`1.5px solid ${C.border}`,
                  color:C.white,cursor:"pointer",
                  fontFamily:"'Nunito',sans-serif",
                  fontSize:13,fontWeight:600,
                }}>
                <span style={{fontSize:22}}>🖼️</span>
                <span>{t.s9gallery}</span>
              </button>
            </div>

            <div style={{marginTop:10,fontSize:11,color:C.muted,lineHeight:1.5}}>{t.s9note}</div>
            {photoError&&(
              <div style={{marginTop:8,fontSize:12,color:"#ff6b6b",fontWeight:600}}>
                {t.s9error}
              </div>
            )}
          </Card>

          {/* ── SUBMIT ── */}
          <button onClick={handleSubmit}
            aria-disabled={!allDone}
            aria-describedby="qs-status"
            style={{
            width:"100%",padding:"17px 0",border:"none",borderRadius:16,
            background:allDone
              ?`linear-gradient(135deg,${C.blue},${C.gold})`
              :"rgba(26,111,212,0.25)",
            fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,
            color:allDone?C.white:"rgba(240,244,255,0.35)",
            cursor:"pointer",
            boxShadow:allDone?"0 10px 36px rgba(26,111,212,0.4)":"none",
            transition:"all 0.3s",marginBottom:12,
          }}>{t.qBtn}</button>

          <div id="qs-status" role="status" aria-live="polite"
            style={{textAlign:"center",fontSize:12,lineHeight:1.6,
              color:errorMsg?"#ff8a80":C.muted,
              fontWeight:errorMsg?700:400,marginBottom:8,minHeight:18}}>
            {errorMsg}
          </div>

          {!allDone&&(
            <div style={{textAlign:"center",fontSize:12,color:C.muted,lineHeight:1.6}}>
              {t.qBtnWait}<br/>
              <span style={{color:C.gold2,fontWeight:700}}>
                {requiredKeys.filter(k=>answers[k]!==null).length+
                  (country.trim().length>0?1:0)}/
                {requiredKeys.length+1}{" "}
                {lang==="en"?"completed":lang==="es"?"completadas":lang==="pt"?"concluídas":"complétées"}
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
