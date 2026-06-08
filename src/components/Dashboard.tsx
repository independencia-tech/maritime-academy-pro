// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", orange:"#e67e22", red:"#c0392b",
  teal:"#0a8a6c",
};

const T = {
  fr:{
    greeting_morning:"Bonjour", greeting_afternoon:"Bon après-midi",
    greeting_evening:"Bonsoir", greeting_night:"Bonne nuit",
    slogan:"La formation maritime complète — pont et machine",
    continueLearning:"Continuer l'apprentissage",
    yourProgress:"TA PROGRESSION",
    quickStats:"STATS RAPIDES",
    statLessons:"Leçons", statCerts:"Certificats",
    statPoints:"Points", statStreak:"Série",
    tabDeck:"🧭 Pont", tabEngine:"⚙️ Machine",
    tabSafety:"🛟 Sécurité", tabTools:"🔧 Outils",
    locked:"🔒 Verrouillé",
    available:"Disponible",
    inProgress:"En cours",
    completed:"Terminé ✓",
    startBtn:"COMMENCER",
    continueBtn:"CONTINUER",
    completedBtn:"REVOIR",
    xp:"XP",
    lessons:"leçons",
    viewStatus:"Voir ma carte statut",
    editProfile:"Modifier mon profil",
    comingSoon:"Bientôt disponible",
    globalProgress:"Progression globale",
  },
  en:{
    greeting_morning:"Good morning", greeting_afternoon:"Good afternoon",
    greeting_evening:"Good evening", greeting_night:"Good night",
    slogan:"Complete maritime training — deck and engine",
    continueLearning:"Continue learning",
    yourProgress:"YOUR PROGRESS",
    quickStats:"QUICK STATS",
    statLessons:"Lessons", statCerts:"Certificates",
    statPoints:"Points", statStreak:"Streak",
    tabDeck:"🧭 Deck", tabEngine:"⚙️ Engine",
    tabSafety:"🛟 Safety", tabTools:"🔧 Tools",
    locked:"🔒 Locked",available:"Available",
    inProgress:"In progress",completed:"Completed ✓",
    startBtn:"START",continueBtn:"CONTINUE",completedBtn:"REVIEW",
    xp:"XP",lessons:"lessons",
    viewStatus:"View my status card",editProfile:"Edit my profile",
    comingSoon:"Coming soon",globalProgress:"Global progress",
  },
  es:{
    greeting_morning:"Buenos días", greeting_afternoon:"Buenas tardes",
    greeting_evening:"Buenas noches", greeting_night:"Buenas noches",
    slogan:"Formación marítima completa — puente y máquinas",
    continueLearning:"Continuar aprendiendo",
    yourProgress:"TU PROGRESO",
    quickStats:"ESTADÍSTICAS",
    statLessons:"Lecciones", statCerts:"Certificados",
    statPoints:"Puntos", statStreak:"Racha",
    tabDeck:"🧭 Puente", tabEngine:"⚙️ Máquinas",
    tabSafety:"🛟 Seguridad", tabTools:"🔧 Herramientas",
    locked:"🔒 Bloqueado",available:"Disponible",
    inProgress:"En progreso",completed:"Completado ✓",
    startBtn:"EMPEZAR",continueBtn:"CONTINUAR",completedBtn:"REPASAR",
    xp:"XP",lessons:"lecciones",
    viewStatus:"Ver mi tarjeta",editProfile:"Editar mi perfil",
    comingSoon:"Próximamente",globalProgress:"Progreso global",
  },
  pt:{
    greeting_morning:"Bom dia", greeting_afternoon:"Boa tarde",
    greeting_evening:"Boa noite", greeting_night:"Boa noite",
    slogan:"Formação marítima completa — convés e máquinas",
    continueLearning:"Continuar aprendendo",
    yourProgress:"SEU PROGRESSO",
    quickStats:"ESTATÍSTICAS",
    statLessons:"Lições", statCerts:"Certificados",
    statPoints:"Pontos", statStreak:"Sequência",
    tabDeck:"🧭 Convés", tabEngine:"⚙️ Máquinas",
    tabSafety:"🛟 Segurança", tabTools:"🔧 Ferramentas",
    locked:"🔒 Bloqueado",available:"Disponível",
    inProgress:"Em andamento",completed:"Concluído ✓",
    startBtn:"COMEÇAR",continueBtn:"CONTINUAR",completedBtn:"REVISAR",
    xp:"XP",lessons:"lições",
    viewStatus:"Ver meu cartão",editProfile:"Editar meu perfil",
    comingSoon:"Em breve",globalProgress:"Progresso global",
  },
};

// ── MODULES DATA ──────────────────────────────
const MODULES = {
  deck:[
    { id:"d1", icon:"🧭", color:C.blue2,
      title:{fr:"Navigation & Cartographie",en:"Navigation & Cartography",es:"Navegación & Cartografía",pt:"Navegação & Cartografia"},
      desc:{fr:"COLREG, ECDIS, météo maritime",en:"COLREG, ECDIS, maritime weather",es:"COLREG, ECDIS, meteorología",pt:"COLREG, ECDIS, meteorologia"},
      lessons:8, xp:400, status:"available", progress:0 },
    { id:"d2", icon:"⚖️", color:C.gold,
      title:{fr:"Droit Maritime International",en:"International Maritime Law",es:"Derecho Marítimo",pt:"Direito Marítimo"},
      desc:{fr:"SOLAS, MARPOL, MLC 2006, STCW",en:"SOLAS, MARPOL, MLC 2006, STCW",es:"SOLAS, MARPOL, MLC 2006",pt:"SOLAS, MARPOL, MLC 2006"},
      lessons:10, xp:500, status:"locked", progress:0 },
    { id:"d3", icon:"🗺️", color:C.teal,
      title:{fr:"Signalisation & Balisage",en:"Signaling & Buoyage",es:"Señalización & Balizamiento",pt:"Sinalização & Balizamento"},
      desc:{fr:"AISM, pavillons CIS, Morse, COLREG",en:"IALA, CIS flags, Morse, COLREG",es:"IALA, banderas CIS, Morse",pt:"IALA, bandeiras CIS, Morse"},
      lessons:7, xp:350, status:"locked", progress:0 },
    { id:"d4", icon:"📡", color:"#9b59b6",
      title:{fr:"Anglais Maritime SMCP",en:"Maritime English SMCP",es:"Inglés Marítimo SMCP",pt:"Inglês Marítimo SMCP"},
      desc:{fr:"Communications VHF, logbook, GMDSS",en:"VHF communications, logbook, GMDSS",es:"Comunicaciones VHF, GMDSS",pt:"Comunicações VHF, GMDSS"},
      lessons:6, xp:300, status:"locked", progress:0 },
    { id:"d5", icon:"⛵", color:C.blue,
      title:{fr:"Ship Career Navigator™",en:"Ship Career Navigator™",es:"Ship Career Navigator™",pt:"Ship Career Navigator™"},
      desc:{fr:"Feuille de route personnalisée",en:"Personalized career roadmap",es:"Hoja de ruta personalizada",pt:"Roteiro personalizado"},
      lessons:5, xp:250, status:"locked", progress:0 },
  ],
  engine:[
    { id:"e1", icon:"⚙️", color:C.orange,
      title:{fr:"Moteur Principal",en:"Main Engine",es:"Motor Principal",pt:"Motor Principal"},
      desc:{fr:"Diesel 2T/4T MAN, Wärtsilä, HFO/MDO",en:"Diesel 2T/4T MAN, Wärtsilä, HFO/MDO",es:"Diesel 2T/4T MAN, Wärtsilä",pt:"Diesel 2T/4T MAN, Wärtsilä"},
      lessons:9, xp:450, status:"available", progress:0 },
    { id:"e2", icon:"🔧", color:"#e74c3c",
      title:{fr:"Systèmes Auxiliaires",en:"Auxiliary Systems",es:"Sistemas Auxiliares",pt:"Sistemas Auxiliares"},
      desc:{fr:"Pompes, compresseurs, purificateurs",en:"Pumps, compressors, purifiers",es:"Bombas, compresores, purificadores",pt:"Bombas, compressores, purificadores"},
      lessons:8, xp:400, status:"locked", progress:0 },
    { id:"e3", icon:"⚡", color:C.gold2,
      title:{fr:"Production Électrique",en:"Electrical Generation",es:"Producción Eléctrica",pt:"Produção Elétrica"},
      desc:{fr:"Générateurs, tableau principal, charges",en:"Generators, main switchboard",es:"Generadores, cuadro principal",pt:"Geradores, painel principal"},
      lessons:7, xp:350, status:"locked", progress:0 },
    { id:"e4", icon:"🌊", color:C.teal,
      title:{fr:"MARPOL Machine",en:"MARPOL Engine Room",es:"MARPOL Sala de Máquinas",pt:"MARPOL Sala de Máquinas"},
      desc:{fr:"Livre des hydrocarbures, 15ppm, déchets",en:"Oil record book, 15ppm, waste",es:"Libro de hidrocarburos, 15ppm",pt:"Livro de hidrocarbonetos, 15ppm"},
      lessons:6, xp:300, status:"locked", progress:0 },
    { id:"e5", icon:"🍃", color:C.green,
      title:{fr:"SEEMP & Efficacité Énergétique",en:"SEEMP & Energy Efficiency",es:"SEEMP & Eficiencia Energética",pt:"SEEMP & Eficiência Energética"},
      desc:{fr:"EEXI, CII, plan de gestion énergie",en:"EEXI, CII, energy management",es:"EEXI, CII, gestión de energía",pt:"EEXI, CII, gestão de energia"},
      lessons:5, xp:250, status:"locked", progress:0 },
  ],
  safety:[
    { id:"s1", icon:"🛟", color:C.red,
      title:{fr:"Lifeboats & Liferafts",en:"Lifeboats & Liferafts",es:"Botes & Balsas Salvavidas",pt:"Botes & Balsas Salva-vidas"},
      desc:{fr:"HRU, déclenchement auto, procédures SOLAS",en:"HRU, auto release, SOLAS procedures",es:"HRU, activación automática, SOLAS",pt:"HRU, ativação automática, SOLAS"},
      lessons:6, xp:300, status:"available", progress:0 },
    { id:"s2", icon:"📡", color:C.blue2,
      title:{fr:"EPIRB, SART & GMDSS",en:"EPIRB, SART & GMDSS",es:"EPIRB, SART & GMDSS",pt:"EPIRB, SART & GMDSS"},
      desc:{fr:"Float-free, COSPAS-SARSAT, AIS-SART",en:"Float-free, COSPAS-SARSAT, AIS-SART",es:"Float-free, COSPAS-SARSAT",pt:"Float-free, COSPAS-SARSAT"},
      lessons:5, xp:250, status:"locked", progress:0 },
    { id:"s3", icon:"🩺", color:"#e74c3c",
      title:{fr:"Secourisme STCW",en:"STCW First Aid",es:"Primeros Auxilios STCW",pt:"Primeiros Socorros STCW"},
      desc:{fr:"EFA, MFA, MCC — RCP, MEDEVAC",en:"EFA, MFA, MCC — CPR, MEDEVAC",es:"EFA, MFA, MCC — RCP, MEDEVAC",pt:"EFA, MFA, MCC — RCP, MEDEVAC"},
      lessons:8, xp:400, status:"locked", progress:0 },
    { id:"s4", icon:"🔥", color:C.orange,
      title:{fr:"Lutte contre l'incendie",en:"Firefighting",es:"Lucha contra incendios",pt:"Combate a incêndios"},
      desc:{fr:"BST, extincteurs, équipes d'urgence",en:"BST, extinguishers, emergency teams",es:"BST, extintores, equipos emergencia",pt:"BST, extintores, equipes emergência"},
      lessons:7, xp:350, status:"locked", progress:0 },
    { id:"s5", icon:"👥", color:"#9b59b6",
      title:{fr:"Muster List & Abandon",en:"Muster List & Abandon Ship",es:"Rol de Abandono",pt:"Lista de Chamada & Abandono"},
      desc:{fr:"Rôles, signaux, postes rassemblement",en:"Roles, signals, muster stations",es:"Roles, señales, puestos de reunión",pt:"Funções, sinais, postos de reunião"},
      lessons:4, xp:200, status:"locked", progress:0 },
  ],
  tools:[
    { id:"t1", icon:"🔍", color:C.gold,
      title:{fr:"MarineVerify™",en:"MarineVerify™",es:"MarineVerify™",pt:"MarineVerify™"},
      desc:{fr:"Vérification certificats en temps réel",en:"Real-time certificate verification",es:"Verificación de certificados",pt:"Verificação de certificados"},
      lessons:0, xp:0, status:"coming", progress:0 },
    { id:"t2", icon:"🚢", color:C.blue2,
      title:{fr:"Ship Career Navigator™",en:"Ship Career Navigator™",es:"Ship Career Navigator™",pt:"Ship Career Navigator™"},
      desc:{fr:"Ta feuille de route personnalisée",en:"Your personalized career roadmap",es:"Tu hoja de ruta personalizada",pt:"Seu roteiro personalizado"},
      lessons:0, xp:0, status:"coming", progress:0 },
    { id:"t3", icon:"📚", color:C.teal,
      title:{fr:"Bibliothèque STCW",en:"STCW Library",es:"Biblioteca STCW",pt:"Biblioteca STCW"},
      desc:{fr:"Conventions IMO, textes officiels",en:"IMO conventions, official texts",es:"Convenios OMI, textos oficiales",pt:"Convenções IMO, textos oficiais"},
      lessons:0, xp:0, status:"coming", progress:0 },
    { id:"t4", icon:"🌍", color:C.green,
      title:{fr:"Réglementation par pays",en:"Regulations by country",es:"Reglamentación por país",pt:"Regulamentação por país"},
      desc:{fr:"Lois nationales, ports, zones UNCLOS",en:"National laws, ports, UNCLOS zones",es:"Leyes nacionales, puertos, UNCLOS",pt:"Leis nacionais, portos, UNCLOS"},
      lessons:0, xp:0, status:"coming", progress:0 },
  ],
};

// ── SHARED UI ─────────────────────────────────
function Stars() {
  const s=Array.from({length:30},()=>({
    x:Math.random()*100,y:Math.random()*100,
    sz:Math.random()>0.7?2:1.5,
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
        @keyframes tw{0%,100%{opacity:0}50%{opacity:0.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{left:-100%}100%{left:200%}}
        @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
        @keyframes streakBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
      `}</style>
    </>
  );
}

function MaritimeLogo({size=28}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="42" stroke={C.gold} strokeWidth="3" fill="none" opacity="0.5"/>
      {[0,60,120,180,240,300].map((a,i)=>{
        const r=a*Math.PI/180;
        return <line key={i}
          x1={50+18*Math.sin(r)} y1={50-18*Math.cos(r)}
          x2={50+38*Math.sin(r)} y2={50-38*Math.cos(r)}
          stroke={C.gold2} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>;
      })}
      <circle cx="50" cy="50" r="16" stroke={C.gold} strokeWidth="2" fill={C.navy3}/>
      <circle cx="50" cy="40" r="4" stroke={C.blue2} strokeWidth="2" fill="none"/>
      <line x1="50" y1="44" x2="50" y2="60" stroke={C.blue2} strokeWidth="2"/>
      <line x1="42" y1="49" x2="58" y2="49" stroke={C.blue2} strokeWidth="2"/>
      <path d="M42 60 Q38 55 41 51" stroke={C.blue2} strokeWidth="1.5" fill="none"/>
      <path d="M58 60 Q62 55 59 51" stroke={C.blue2} strokeWidth="1.5" fill="none"/>
      <path d="M42 60 Q50 65 58 60" stroke={C.blue2} strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function GLine() {
  return <div style={{height:1,margin:"8px 0",
    background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;
}

// ── MODULE CARD ───────────────────────────────
function ModuleCard({module,lang,t,onStart}) {
  const isLocked=module.status==="locked";
  const isComing=module.status==="coming";
  const isAvail=module.status==="available";
  const isDone=module.status==="completed";
  const isProgress=module.status==="inProgress";

  const statusColor=
    isDone?C.green:isProgress?C.blue2:isAvail?C.gold:
    isComing?"rgba(240,244,255,0.2)":"rgba(240,244,255,0.15)";

  const statusLabel=
    isDone?t.completed:isProgress?t.inProgress:
    isAvail?t.available:isComing?t.comingSoon:t.locked;

  const btnLabel=
    isDone?t.completedBtn:isProgress?t.continueBtn:t.startBtn;

  return (
    <div style={{
      borderRadius:20,padding:"16px 16px",
      background:isLocked||isComing
        ?"rgba(13,31,60,0.5)"
        :"rgba(13,31,60,0.8)",
      border:`1px solid ${isAvail||isProgress||isDone
        ?module.color+"44":"rgba(255,255,255,0.07)"}`,
      opacity:isLocked?0.65:1,
      transition:"all 0.2s",
      position:"relative",overflow:"hidden",
    }}>
      {/* Coming soon overlay */}
      {isComing&&(
        <div style={{
          position:"absolute",top:10,right:10,
          fontSize:10,padding:"3px 8px",borderRadius:10,
          background:"rgba(201,146,42,0.15)",
          border:`1px solid ${C.gold}33`,
          color:C.gold,letterSpacing:1,
          fontFamily:"'Cinzel',serif",
        }}>{t.comingSoon}</div>
      )}

      <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
        {/* Icon */}
        <div style={{
          width:48,height:48,borderRadius:14,flexShrink:0,
          background:`${module.color}22`,
          border:`1px solid ${module.color}44`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:22,
        }}>{module.icon}</div>

        {/* Content */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:14,fontWeight:700,color:C.white,
            marginBottom:3,lineHeight:1.3}}>
            {module.title[lang]||module.title.fr}
          </div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.5,marginBottom:8}}>
            {module.desc[lang]||module.desc.fr}
          </div>

          {/* Progress bar */}
          {!isComing&&(
            <div style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:9,color:C.muted,letterSpacing:0.5}}>Progression</span>
                <span style={{fontSize:10,color:C.gold2,fontWeight:700,fontFamily:"'Cinzel',serif"}}>{module.progress}%</span>
              </div>
              <div style={{height:3,borderRadius:3,
                background:"rgba(255,255,255,0.08)",overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:3,
                  width:`${module.progress}%`,
                  background:`linear-gradient(90deg,${module.color},${C.gold2})`,
                  transition:"width 0.5s ease"}}/>
              </div>
            </div>
          )}

          {/* Meta row */}
          <div style={{display:"flex",alignItems:"center",
            justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {module.lessons>0&&(
                <span style={{fontSize:10,color:C.muted}}>
                  📚 {module.lessons} {t.lessons}
                </span>
              )}
              {module.xp>0&&(
                <span style={{fontSize:10,color:C.gold2}}>
                  ⭐ {module.xp} {t.xp}
                </span>
              )}
            </div>
            {/* Status badge */}
            <div style={{
              fontSize:9,padding:"3px 8px",borderRadius:10,
              background:`${statusColor}22`,
              border:`1px solid ${statusColor}44`,
              color:statusColor,letterSpacing:0.5,
            }}>{statusLabel}</div>
          </div>
        </div>
      </div>

      {/* Start button — only for available/inProgress */}
      {(isAvail||isProgress)&&(
        <button onClick={()=>onStart(module)} style={{
          width:"100%",padding:"10px 0",marginTop:12,
          border:"none",borderRadius:12,
          background:`linear-gradient(135deg,${module.color}88,${C.navy3})`,
          border:`1px solid ${module.color}55`,
          fontFamily:"'Cinzel',serif",fontSize:12,
          fontWeight:700,letterSpacing:2,color:C.white,
          cursor:"pointer",
        }}>{btnLabel}</button>
      )}
    </div>
  );
}

// ── MAIN DASHBOARD ────────────────────────────
export default function Dashboard({
  lang="fr",
  username="Marin",
  photo=null,
  profile={},
  userLevel="cadet",
  completedLessons=[],
  onViewStatus=()=>{},
  onEditProfile=()=>{},
  onStartModule=()=>{},
}) {
  const t=T[lang]||T.fr;
  const [activeTab,setActiveTab]=useState(
    profile.dept==="engine"?"engine":"deck"
  );
  const [vis,setVis]=useState(false);
  const [stats]=useState({lessons:0,certs:0,points:0,streak:1});

  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);

  // Greeting based on time
  const hour=new Date().getHours();
  const greeting=hour<12?t.greeting_morning:
    hour<17?t.greeting_afternoon:
    hour<21?t.greeting_evening:t.greeting_night;

  const name=(username||"Marin").split(" ")[0];
  const initials=name.slice(0,2).toUpperCase();

  // Level labels
  const levelLabels={
    fr:{cadet:"⛵ Cadet",officer:"🧭 Officier",master:"🔱 Maître",captain:"👑 Capitaine"},
    en:{cadet:"⛵ Cadet",officer:"🧭 Officer",master:"🔱 Master",captain:"👑 Captain"},
    es:{cadet:"⛵ Cadete",officer:"🧭 Oficial",master:"🔱 Maestro",captain:"👑 Capitán"},
    pt:{cadet:"⛵ Cadete",officer:"🧭 Oficial",master:"🔱 Mestre",captain:"👑 Capitão"},
  };
  const currentLevelLabel=(levelLabels[lang]||levelLabels.fr)[userLevel]||"⛵ Cadet";

  const tabs=[
    {key:"deck",label:t.tabDeck},
    {key:"engine",label:t.tabEngine},
    {key:"safety",label:t.tabSafety},
    {key:"tools",label:t.tabTools},
  ];

  const baseModules=MODULES[activeTab]||[];
  const currentModules=baseModules.map((m)=>
    completedLessons.includes(m.id)
      ? {...m, status:"completed", progress:100}
      : m
  );

  // Global progress
  const allModules=Object.values(MODULES).flat();
  const totalModules=allModules.length;
  const completedModules=allModules.filter(m=>
    m.status==="completed" || completedLessons.includes(m.id)
  ).length;
  const globalPct=Math.round((completedModules/totalModules)*100);

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",
      overflowX:"hidden",position:"relative",
    }}>
      <Stars/>

      {/* ── STICKY TOPBAR ── */}
      <div style={{
        position:"sticky",top:0,zIndex:100,
        background:"rgba(6,14,26,0.97)",
        backdropFilter:"blur(14px)",
        borderBottom:`1px solid ${C.border}`,
        height:54,display:"flex",alignItems:"center",
        justifyContent:"space-between",padding:"0 16px",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <MaritimeLogo size={28}/>
          <div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:11,
              fontWeight:700,color:C.white,letterSpacing:1,lineHeight:1}}>
              MARITIME ACADEMY
            </div>
            <div style={{fontSize:9,color:C.gold,letterSpacing:1}}>PRO</div>
          </div>
        </div>
        {/* Avatar */}
        <button onClick={onViewStatus} style={{
          width:36,height:36,borderRadius:"50%",
          background:photo?`url(${photo}) center/cover`
            :`linear-gradient(135deg,${C.blue},${C.gold})`,
          border:`2px solid ${C.gold}55`,
          display:"flex",alignItems:"center",justifyContent:"center",
          cursor:"pointer",fontSize:13,fontWeight:700,
          color:C.white,fontFamily:"'Cinzel',serif",
          flexShrink:0,
        }}>
          {!photo&&initials}
        </button>
      </div>

      {/* ── CONTENT ── */}
      <div style={{
        padding:"20px 16px 100px",
        position:"relative",zIndex:1,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",
        transition:"all 0.5s ease",
      }}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {/* ── GREETING ── */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:13,color:C.muted,marginBottom:2}}>
              {greeting},
            </div>
            <div style={{
              fontFamily:"'Cinzel',serif",fontSize:22,
              fontWeight:700,color:C.white,marginBottom:4,
            }}>{name.toUpperCase()} 👋</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{
                fontSize:12,padding:"4px 12px",borderRadius:20,
                background:"rgba(77,166,255,0.15)",
                border:`1px solid ${C.blue2}44`,
                color:C.blue2,fontWeight:700,
              }}>{currentLevelLabel}</div>
              {stats.streak>0&&(
                <div style={{
                  fontSize:12,padding:"4px 10px",borderRadius:20,
                  background:"rgba(230,126,34,0.15)",
                  border:"1px solid rgba(230,126,34,0.3)",
                  color:C.orange,fontWeight:700,
                  animation:"streakBounce 2s ease-in-out infinite",
                }}>🔥 {stats.streak}</div>
              )}
            </div>
          </div>

          {/* ── GLOBAL PROGRESS ── */}
          <div style={{
            background:"rgba(13,31,60,0.75)",
            border:`1px solid ${C.border}`,
            borderRadius:20,padding:"16px",
            marginBottom:16,
          }}>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:11,letterSpacing:2,color:C.gold,
                fontFamily:"'Cinzel',serif"}}>{t.yourProgress}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:15,
                fontWeight:700,color:C.blue2}}>{globalPct}%</div>
            </div>
            <div style={{height:6,borderRadius:6,
              background:"rgba(255,255,255,0.08)",overflow:"hidden",marginBottom:8}}>
              <div style={{height:"100%",borderRadius:6,
                width:`${globalPct}%`,
                background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,
                transition:"width 0.8s ease",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,bottom:0,width:"40%",
                  background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",
                  animation:"shimmer 2s ease-in-out infinite"}}/>
              </div>
            </div>
            <div style={{fontSize:11,color:C.muted}}>
              {t.globalProgress} · {completedModules}/{totalModules} modules
            </div>
          </div>

          {/* ── QUICK STATS ── */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:10,letterSpacing:3,color:C.muted,
              marginBottom:10,fontFamily:"'Cinzel',serif"}}>{t.quickStats}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {[
                {val:stats.lessons,label:t.statLessons,icon:"📚",color:C.blue2},
                {val:stats.certs,label:t.statCerts,icon:"🏆",color:C.gold2},
                {val:stats.points,label:t.statPoints,icon:"⭐",color:C.orange},
                {val:`🔥${stats.streak}`,label:t.statStreak,icon:"",color:C.red},
              ].map(s=>(
                <div key={s.label} style={{
                  background:"rgba(255,255,255,0.05)",
                  border:`1px solid rgba(255,255,255,0.08)`,
                  borderRadius:14,padding:"10px 6px",textAlign:"center",
                }}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:16,
                    fontWeight:800,color:s.color}}>{s.val}</div>
                  <div style={{fontSize:9,color:C.muted,
                    letterSpacing:0.5,marginTop:2}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <GLine/>

          {/* ── TABS ── */}
          <div style={{marginBottom:16}}>
            <div style={{
              display:"flex",gap:6,
              overflowX:"auto",paddingBottom:4,
              scrollbarWidth:"none",
            }}>
              {tabs.map(tab=>(
                <button key={tab.key}
                  onClick={()=>setActiveTab(tab.key)}
                  style={{
                    padding:"9px 14px",borderRadius:12,
                    background:activeTab===tab.key
                      ?`linear-gradient(135deg,${C.blue}55,${C.gold}33)`
                      :"rgba(255,255,255,0.05)",
                    border:`1.5px solid ${activeTab===tab.key
                      ?C.gold:"rgba(255,255,255,0.1)"}`,
                    color:activeTab===tab.key?C.white:C.muted,
                    fontSize:12,fontWeight:activeTab===tab.key?700:400,
                    cursor:"pointer",whiteSpace:"nowrap",
                    fontFamily:"'Nunito',sans-serif",
                    flexShrink:0,
                    transition:"all 0.2s",
                  }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── MODULES LIST ── */}
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
            {currentModules.map(module=>(
              <ModuleCard
                key={module.id}
                module={module}
                lang={lang}
                t={t}
                onStart={onStartModule}
              />
            ))}
          </div>

          {/* ── BOTTOM ACTIONS ── */}
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <button onClick={onViewStatus} style={{
              width:"100%",padding:"14px 0",border:"none",borderRadius:14,
              background:`linear-gradient(135deg,${C.blue},${C.gold})`,
              fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,
              letterSpacing:2,color:C.white,cursor:"pointer",
              boxShadow:"0 6px 24px rgba(26,111,212,0.35)",
            }}>{t.viewStatus}</button>
            <button onClick={onEditProfile} style={{
              width:"100%",padding:"12px 0",
              border:`1px solid rgba(255,255,255,0.15)`,
              borderRadius:14,background:"transparent",
              fontFamily:"'Nunito',sans-serif",fontSize:13,
              fontWeight:600,color:C.muted,cursor:"pointer",
            }}>{t.editProfile}</button>
          </div>

        </div>
      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:100,
        background:"rgba(6,14,26,0.97)",
        backdropFilter:"blur(14px)",
        borderTop:`1px solid ${C.border}`,
        height:64,display:"flex",alignItems:"center",
        justifyContent:"space-around",padding:"0 8px",
      }}>
        {[
          {icon:"🏠",label:{fr:"Accueil",en:"Home",es:"Inicio",pt:"Início"},active:true},
          {icon:"📚",label:{fr:"Modules",en:"Modules",es:"Módulos",pt:"Módulos"},active:false},
          {icon:"🚢",label:{fr:"Navires",en:"Ships",es:"Barcos",pt:"Navios"},active:false},
          {icon:"👤",label:{fr:"Profil",en:"Profile",es:"Perfil",pt:"Perfil"},active:false},
        ].map((item,i)=>(
          <button key={i} style={{
            display:"flex",flexDirection:"column",
            alignItems:"center",gap:3,
            background:"none",border:"none",
            cursor:"pointer",padding:"6px 12px",
            borderRadius:10,
            background:item.active?"rgba(201,146,42,0.1)":"transparent",
          }}>
            <span style={{fontSize:20}}>{item.icon}</span>
            <span style={{
              fontSize:9,letterSpacing:0.5,
              color:item.active?C.gold2:C.muted,
              fontWeight:item.active?700:400,
            }}>{item.label[lang]||item.label.fr}</span>
          </button>
        ))}
      </div>

    </div>
  );
}
