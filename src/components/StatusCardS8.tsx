// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", gold3:"#f5d07a",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", teal:"#0a8a6c",
};

// ── TRANSLATIONS ─────────────────────────────
const T = {
  fr:{
    statusTitle:"TON STATUT MARITIME",
    statusSub:"Bienvenue à bord, {nom} !",
    levelCadet:"⛵ CADET",
    levelOfficer:"🧭 OFFICIER",
    levelMaster:"🔱 MAÎTRE",
    levelCaptain:"👑 CAPITAINE",
    nextLevel:"Prochain grade : {next}",
    progressLabel:"Progression vers {next}",
    statLessons:"LEÇONS", statCerts:"CERTIFICATS",
    statPoints:"POINTS", statLang:"LANGUE",
    statDays:"JOURS ACTIF", statStreak:"SÉRIE",
    objectiveLabel:"🎯 TON OBJECTIF",
    shipLabel:"🚢 NAVIRE DE RÊVE",
    countryLabel:"🌍 PAYS",
    studyLabel:"⏱️ OBJECTIF QUOTIDIEN",
    memberSince:"Membre depuis",
    certifiedBadge:"STANDARDS IMO / STCW",
    startBtn:"⚓ COMMENCER LA FORMATION",
    downloadBtn:"📥 Télécharger ma carte",
    pdfBtn:"📄 Exporter en PDF",
    shareBtn:"📲 Partager sur WhatsApp",
    notifCadet:"Cadet {nom}, ta formation commence aujourd'hui !",
    notifOfficer:"Officier {nom}, la mer vous attend !",
    notifMaster:"Maître {nom}, la connaissance vous appelle !",
    notifCaptain:"Capitaine {nom}, votre commandement vous attend !",
    resetBtn:"🗑️ Réinitialiser mes données",
    resetConfirm:"⚠️ Confirmer la suppression ?",
    resetCancel:"Annuler",
    editBtn:"✏️ Modifier mon profil",
    goalLabels:{
      nav:"Maîtriser la navigation",
      stcw:"Certifications STCW",
      law:"Droit maritime",
      career:"Progresser dans ma carrière",
      safety:"Sécurité et survie en mer",
    },
    shipLabels:{
      container:"Porte-conteneurs 🚢",
      tanker:"Pétrolier 🛢️",
      cruise:"Croisière 🛳️",
      offshore:"Offshore 🏗️",
      yacht:"Yacht / Voilier ⛵",
      sar:"Sauvetage SAR 🆘",
      chemical:"Chimiquier ⚗️",
      gas:"Gazier LNG 💨",
      car:"Roulier 🚗",
      research:"Navire scientifique 🔬",
      tug:"Remorqueur ⚓",
      fishing:"Pêche hauturière 🎣",
      pwc:"Jet-ski / Surf sauvetage 🏄",
      navy:"Marine nationale 🏛️",
    },
    durLabels:{
      "15min":"15 min / jour",
      "30min":"30 min / jour",
      "60min":"1 heure / jour",
      free:"À mon rythme",
    },
    shareText:"Je viens de rejoindre Maritime Academy Pro ! 🚢⚓\nFormation maritime certifiée IMO/STCW\nRejoins-moi → maritime-academy-pro.lovable.app",
  },
  en:{
    statusTitle:"YOUR MARITIME STATUS",
    statusSub:"Welcome aboard, {nom}!",
    levelCadet:"⛵ CADET",
    levelOfficer:"🧭 OFFICER",
    levelMaster:"🔱 MASTER",
    levelCaptain:"👑 CAPTAIN",
    nextLevel:"Next rank: {next}",
    progressLabel:"Progress toward {next}",
    statLessons:"LESSONS", statCerts:"CERTIFICATES",
    statPoints:"POINTS", statLang:"LANGUAGE",
    statDays:"ACTIVE DAYS", statStreak:"STREAK",
    objectiveLabel:"🎯 YOUR GOAL",
    shipLabel:"🚢 DREAM SHIP",
    countryLabel:"🌍 COUNTRY",
    studyLabel:"⏱️ DAILY TARGET",
    memberSince:"Member since",
    certifiedBadge:"IMO / STCW STANDARDS",
    startBtn:"⚓ START TRAINING",
    downloadBtn:"📥 Download my card",
    pdfBtn:"📄 Export as PDF",
    shareBtn:"📲 Share on WhatsApp",
    notifCadet:"Cadet {nom}, your training starts today!",
    notifOfficer:"Officer {nom}, the sea awaits you!",
    notifMaster:"Master {nom}, knowledge calls you!",
    notifCaptain:"Captain {nom}, your command awaits!",
    resetBtn:"🗑️ Reset my data",
    resetConfirm:"⚠️ Confirm deletion?",
    resetCancel:"Cancel",
    editBtn:"✏️ Edit my profile",
    goalLabels:{
      nav:"Master navigation",
      stcw:"STCW Certifications",
      law:"Maritime law",
      career:"Advance my career",
      safety:"Safety & survival at sea",
    },
    shipLabels:{
      container:"Container ship 🚢",
      tanker:"Oil tanker 🛢️",
      cruise:"Cruise ship 🛳️",
      offshore:"Offshore 🏗️",
      yacht:"Yacht / Sailboat ⛵",
      sar:"SAR Rescue 🆘",
      chemical:"Chemical tanker ⚗️",
      gas:"LNG Gas carrier 💨",
      car:"Car carrier 🚗",
      research:"Research vessel 🔬",
      tug:"Tugboat ⚓",
      fishing:"Fishing vessel 🎣",
      pwc:"Jet-ski / Surf rescue 🏄",
      navy:"Navy 🏛️",
    },
    durLabels:{
      "15min":"15 min / day",
      "30min":"30 min / day",
      "60min":"1 hour / day",
      free:"At my own pace",
    },
    shareText:"I just joined Maritime Academy Pro! 🚢⚓\nIMO/STCW certified maritime training\nJoin me → maritime-academy-pro.lovable.app",
  },
  es:{
    statusTitle:"TU ESTADO MARÍTIMO",
    statusSub:"¡Bienvenido a bordo, {nom}!",
    levelCadet:"⛵ CADETE",
    levelOfficer:"🧭 OFICIAL",
    levelMaster:"🔱 MAESTRO",
    levelCaptain:"👑 CAPITÁN",
    nextLevel:"Próximo grado: {next}",
    progressLabel:"Progreso hacia {next}",
    statLessons:"LECCIONES", statCerts:"CERTIFICADOS",
    statPoints:"PUNTOS", statLang:"IDIOMA",
    statDays:"DÍAS ACTIVO", statStreak:"RACHA",
    objectiveLabel:"🎯 TU OBJETIVO",
    shipLabel:"🚢 BARCO SOÑADO",
    countryLabel:"🌍 PAÍS",
    studyLabel:"⏱️ OBJETIVO DIARIO",
    memberSince:"Miembro desde",
    certifiedBadge:"ESTÁNDARES IMO / STCW",
    startBtn:"⚓ COMENZAR FORMACIÓN",
    downloadBtn:"📥 Descargar mi tarjeta",
    pdfBtn:"📄 Exportar a PDF",
    shareBtn:"📲 Compartir en WhatsApp",
    notifCadet:"Cadete {nom}, ¡tu formación comienza hoy!",
    notifOfficer:"Oficial {nom}, ¡el mar te espera!",
    notifMaster:"Maestro {nom}, ¡el conocimiento te llama!",
    notifCaptain:"Capitán {nom}, ¡tu mando te espera!",
    resetBtn:"🗑️ Borrar mis datos",
    resetConfirm:"⚠️ ¿Confirmar el borrado?",
    resetCancel:"Cancelar",
    editBtn:"✏️ Editar mi perfil",
    goalLabels:{
      nav:"Dominar la navegación",
      stcw:"Certificaciones STCW",
      law:"Derecho marítimo",
      career:"Avanzar en mi carrera",
      safety:"Seguridad y supervivencia",
    },
    shipLabels:{
      container:"Portacontenedores 🚢",
      tanker:"Petrolero 🛢️",
      cruise:"Crucero 🛳️",
      offshore:"Offshore 🏗️",
      yacht:"Yate / Velero ⛵",
      sar:"Salvamento SAR 🆘",
      chemical:"Quimiquero ⚗️",
      gas:"Gasero LNG 💨",
      car:"Ro-Ro 🚗",
      research:"Buque científico 🔬",
      tug:"Remolcador ⚓",
      fishing:"Pesca de altura 🎣",
      pwc:"Moto de agua 🏄",
      navy:"Marina nacional 🏛️",
    },
    durLabels:{
      "15min":"15 min / día",
      "30min":"30 min / día",
      "60min":"1 hora / día",
      free:"A mi ritmo",
    },
    shareText:"¡Acabo de unirme a Maritime Academy Pro! 🚢⚓\nFormación marítima certificada IMO/STCW\nÚnete → maritime-academy-pro.lovable.app",
  },
  pt:{
    statusTitle:"SEU STATUS MARÍTIMO",
    statusSub:"Bem-vindo a bordo, {nom}!",
    levelCadet:"⛵ CADETE",
    levelOfficer:"🧭 OFICIAL",
    levelMaster:"🔱 MESTRE",
    levelCaptain:"👑 CAPITÃO",
    nextLevel:"Próximo grau: {next}",
    progressLabel:"Progresso para {next}",
    statLessons:"LIÇÕES", statCerts:"CERTIFICADOS",
    statPoints:"PONTOS", statLang:"IDIOMA",
    statDays:"DIAS ATIVO", statStreak:"SEQUÊNCIA",
    objectiveLabel:"🎯 SEU OBJETIVO",
    shipLabel:"🚢 NAVIO DOS SONHOS",
    countryLabel:"🌍 PAÍS",
    studyLabel:"⏱️ META DIÁRIA",
    memberSince:"Membro desde",
    certifiedBadge:"PADRÕES IMO / STCW",
    startBtn:"⚓ COMEÇAR FORMAÇÃO",
    downloadBtn:"📥 Baixar meu cartão",
    pdfBtn:"📄 Exportar como PDF",
    shareBtn:"📲 Compartilhar no WhatsApp",
    notifCadet:"Cadete {nom}, sua formação começa hoje!",
    notifOfficer:"Oficial {nom}, o mar aguarda você!",
    notifMaster:"Mestre {nom}, o conhecimento chama você!",
    notifCaptain:"Capitão {nom}, seu comando aguarda!",
    resetBtn:"🗑️ Apagar meus dados",
    resetConfirm:"⚠️ Confirmar a exclusão?",
    resetCancel:"Cancelar",
    editBtn:"✏️ Editar meu perfil",
    goalLabels:{
      nav:"Dominar a navegação",
      stcw:"Certificações STCW",
      law:"Direito marítimo",
      career:"Avançar na carreira",
      safety:"Segurança e sobrevivência",
    },
    shipLabels:{
      container:"Porta-contêineres 🚢",
      tanker:"Petroleiro 🛢️",
      cruise:"Cruzeiro 🛳️",
      offshore:"Offshore 🏗️",
      yacht:"Iate / Veleiro ⛵",
      sar:"Salvamento SAR 🆘",
      chemical:"Químico ⚗️",
      gas:"Gaseiro LNG 💨",
      car:"Ro-Ro 🚗",
      research:"Navio científico 🔬",
      tug:"Rebocador ⚓",
      fishing:"Pesca de altura 🎣",
      pwc:"Jet-ski / Salva-vidas 🏄",
      navy:"Marinha nacional 🏛️",
    },
    durLabels:{
      "15min":"15 min / dia",
      "30min":"30 min / dia",
      "60min":"1 hora / dia",
      free:"No meu ritmo",
    },
    shareText:"Acabei de entrar no Maritime Academy Pro! 🚢⚓\nFormação marítima certificada IMO/STCW\nJunte-se → maritime-academy-pro.lovable.app",
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
        @keyframes cardPop{from{opacity:0;transform:scale(0.88) translateY(24px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes shimmer{0%{left:-100%}100%{left:200%}}
        @keyframes glowPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes badgePop{0%{transform:scale(0) rotate(-15deg)}60%{transform:scale(1.2) rotate(5deg)}100%{transform:scale(1) rotate(0deg)}}
        @keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </>
  );
}

function GLine() {
  return <div style={{height:1,margin:"6px 0",
    background:`linear-gradient(90deg,transparent,${C.gold}44,${C.blue2}44,transparent)`}}/>;
}

function MaritimeLogo({size=52}) {
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

// ── ANIMATED COUNTER ─────────────────────────
function Counter({value,suffix=""}) {
  const [display,setDisplay]=useState(0);
  useEffect(()=>{
    let start=0;
    const end=parseInt(value)||0;
    if(end===0)return;
    const step=Math.ceil(end/20);
    const iv=setInterval(()=>{
      start+=step;
      if(start>=end){setDisplay(end);clearInterval(iv);}
      else setDisplay(start);
    },60);
    return ()=>clearInterval(iv);
  },[value]);
  return <span>{display}{suffix}</span>;
}

// ── STAT BOX ──────────────────────────────────
function StatBox({val,label,highlight=false}) {
  return (
    <div style={{
      background:highlight
        ?`linear-gradient(135deg,rgba(26,111,212,0.2),rgba(201,146,42,0.15))`
        :"rgba(255,255,255,0.05)",
      border:`1px solid ${highlight?C.gold+"55":"rgba(255,255,255,0.08)"}`,
      borderRadius:14,padding:"12px 8px",textAlign:"center",
    }}>
      <div style={{
        fontFamily:"'Cinzel',serif",fontSize:17,
        fontWeight:800,color:highlight?C.gold2:C.white,
        animation:"countUp 0.5s ease both",
      }}>{val}</div>
      <div style={{fontSize:9,color:C.muted,letterSpacing:1,marginTop:3}}>{label}</div>
    </div>
  );
}

// ── INFO ROW ──────────────────────────────────
function InfoRow({label,value,icon}) {
  return (
    <div style={{
      display:"flex",alignItems:"center",
      justifyContent:"space-between",
      padding:"9px 0",
      borderBottom:"1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{fontSize:11,color:C.muted,letterSpacing:0.5}}>{label}</div>
      <div style={{fontSize:13,fontWeight:600,color:C.white,
        textAlign:"right",maxWidth:"60%"}}>{value}</div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────
export default function StatusCardS8({
  lang="fr",
  username="Jean-Pierre",
  photo=null,
  profile={},
  onStart=()=>{},
  onBack=()=>{},
  onEdit=null,
}) {
  const t=T[lang]||T.fr;
  const [vis,setVis]=useState(false);
  const [cardAnim,setCardAnim]=useState(false);
  const [badgeAnim,setBadgeAnim]=useState(false);
  const [downloaded,setDownloaded]=useState(false);
  const [downloading,setDownloading]=useState(false);
  const [pdfing,setPdfing]=useState(false);
  const [pdfDone,setPdfDone]=useState(false);
  const [shared,setShared]=useState(false);
  const [confirmReset,setConfirmReset]=useState(false);
  const cardRef=useRef(null);

  useEffect(()=>{
    setTimeout(()=>setVis(true),80);
    setTimeout(()=>setCardAnim(true),300);
    setTimeout(()=>setBadgeAnim(true),800);
  },[]);

  // Level system
  const levels={
    fr:[
      {key:"cadet",label:t.levelCadet,next:"Officier 🧭",color:C.blue2,progress:0},
      {key:"officer",label:t.levelOfficer,next:"Maître 🔱",color:C.teal,progress:0},
      {key:"master",label:t.levelMaster,next:"Capitaine 👑",color:C.gold,progress:0},
      {key:"captain",label:t.levelCaptain,next:"",color:C.gold3,progress:100},
    ],
    en:[
      {key:"cadet",label:t.levelCadet,next:"Officer 🧭",color:C.blue2,progress:0},
      {key:"officer",label:t.levelOfficer,next:"Master 🔱",color:C.teal,progress:0},
      {key:"master",label:t.levelMaster,next:"Captain 👑",color:C.gold,progress:0},
      {key:"captain",label:t.levelCaptain,next:"",color:C.gold3,progress:100},
    ],
    es:[
      {key:"cadet",label:t.levelCadet,next:"Oficial 🧭",color:C.blue2,progress:0},
      {key:"officer",label:t.levelOfficer,next:"Maestro 🔱",color:C.teal,progress:0},
      {key:"master",label:t.levelMaster,next:"Capitán 👑",color:C.gold,progress:0},
      {key:"captain",label:t.levelCaptain,next:"",color:C.gold3,progress:100},
    ],
    pt:[
      {key:"cadet",label:t.levelCadet,next:"Oficial 🧭",color:C.blue2,progress:0},
      {key:"officer",label:t.levelOfficer,next:"Mestre 🔱",color:C.teal,progress:0},
      {key:"master",label:t.levelMaster,next:"Capitão 👑",color:C.gold,progress:0},
      {key:"captain",label:t.levelCaptain,next:"",color:C.gold3,progress:100},
    ],
  };

  const currentLevelIdx=0;
  const currentLevel=(levels[lang]||levels.fr)[currentLevelIdx];
  const levelColor=currentLevel.color;
  const nextLevelName=currentLevel.next;

  // Profile data
  const name=(username||"Marin").split(" ")[0];
  const initials=name.slice(0,2).toUpperCase();
  const goal=t.goalLabels?.[profile.goal]||"—";
  const ship=t.shipLabels?.[profile.ship]||"—";
  const country=profile.country||"—";
  const duration=t.durLabels?.[profile.duration]||"—";
  const memberDate=new Date().toLocaleDateString(
    lang==="fr"?"fr-FR":lang==="es"?"es-ES":lang==="pt"?"pt-BR":"en-GB",
    {day:"2-digit",month:"long",year:"numeric"}
  );

  // Notification message
  const notifKey=`notif${currentLevel.key.charAt(0).toUpperCase()+currentLevel.key.slice(1)}`;
  const notif=(t[notifKey]||"").replace("{nom}",name);

  // Share
  const handleShare=()=>{
    const text=encodeURIComponent(t.shareText||"");
    window.open(`https://wa.me/?text=${text}`,"_blank");
    setShared(true);
    setTimeout(()=>setShared(false),3000);
  };

  const handleDownload=async()=>{
    if(downloading)return;
    setDownloading(true);
    const toastMsg=lang==="en"?"Card saved ✅":lang==="es"?"Tarjeta guardada ✅":lang==="pt"?"Cartão salvo ✅":"Carte sauvegardée ✅";
    try{
      const W=720,H=1100;
      const canvas=document.createElement("canvas");
      canvas.width=W;canvas.height=H;
      const ctx=canvas.getContext("2d");
      // Background gradient
      const bg=ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,C.navy3);bg.addColorStop(1,C.navy);
      ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
      // Border
      ctx.strokeStyle=C.gold;ctx.lineWidth=3;
      ctx.strokeRect(20,20,W-40,H-40);
      // Header band
      ctx.fillStyle=C.gold;
      ctx.font="bold 28px 'Cinzel',serif";
      ctx.textAlign="center";
      ctx.fillText("MARITIME ACADEMY PRO",W/2,90);
      ctx.fillStyle=C.green;
      ctx.font="bold 14px sans-serif";
      ctx.fillText(t.certifiedBadge,W/2,120);
      // Avatar circle
      const cx=W/2, cy=220, cr=70;
      let photoData=photo;
      if(!photoData){
        try{ photoData=localStorage.getItem("map_user_photo")||null; }catch{}
      }
      const drawInitials=()=>{
        ctx.beginPath();
        ctx.arc(cx,cy,cr,0,Math.PI*2);
        ctx.fillStyle=C.blue;ctx.fill();
        ctx.strokeStyle=C.gold2;ctx.lineWidth=4;ctx.stroke();
        ctx.fillStyle=C.white;
        ctx.font="bold 54px sans-serif";
        ctx.textBaseline="middle";
        ctx.fillText(initials,cx,cy+2);
        ctx.textBaseline="alphabetic";
      };
      if(photoData && typeof photoData==="string" && photoData.startsWith("data:")){
        await new Promise((resolve)=>{
          const img=new Image();
          img.onload=()=>{
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx,cy,cr,0,Math.PI*2);
            ctx.closePath();
            ctx.clip();
            const s=Math.min(img.width,img.height);
            const sx=(img.width-s)/2, sy=(img.height-s)/2;
            ctx.drawImage(img,sx,sy,s,s,cx-cr,cy-cr,cr*2,cr*2);
            ctx.restore();
            ctx.beginPath();
            ctx.arc(cx,cy,cr,0,Math.PI*2);
            ctx.strokeStyle=C.gold2;ctx.lineWidth=4;ctx.stroke();
            resolve(null);
          };
          img.onerror=()=>{ drawInitials(); resolve(null); };
          img.src=photoData;
        });
      } else {
        drawInitials();
      }
      // Name
      ctx.fillStyle=C.white;
      ctx.font="bold 36px 'Cinzel',serif";
      ctx.fillText(name,W/2,340);
      // Level
      ctx.fillStyle=levelColor;
      ctx.font="bold 22px sans-serif";
      ctx.fillText(currentLevel.label,W/2,378);
      // Divider
      ctx.strokeStyle=C.border;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(80,410);ctx.lineTo(W-80,410);ctx.stroke();
      // Info rows
      const rows=[
        [t.objectiveLabel,goal],
        [t.shipLabel,ship],
        [t.countryLabel,country],
        [t.studyLabel,duration],
      ];
      ctx.textAlign="left";
      let y=460;
      rows.forEach(([label,val])=>{
        ctx.fillStyle=C.muted;
        ctx.font="600 16px sans-serif";
        ctx.fillText(label,80,y);
        ctx.fillStyle=C.white;
        ctx.font="bold 22px sans-serif";
        ctx.fillText(String(val),80,y+32);
        y+=80;
      });
      // Stats row
      ctx.strokeStyle=C.border;
      ctx.beginPath();ctx.moveTo(80,y);ctx.lineTo(W-80,y);ctx.stroke();
      y+=50;
      const stats=[[t.statLessons,"0"],[t.statCerts,"0"],[t.statPoints,"0"]];
      const sw=(W-160)/3;
      ctx.textAlign="center";
      stats.forEach(([lbl,v],i)=>{
        const cx=80+sw*i+sw/2;
        ctx.fillStyle=C.gold2;
        ctx.font="bold 38px sans-serif";
        ctx.fillText(v,cx,y+10);
        ctx.fillStyle=C.muted;
        ctx.font="600 12px sans-serif";
        ctx.fillText(lbl,cx,y+38);
      });
      // Footer
      ctx.fillStyle=C.muted;
      ctx.font="14px sans-serif";
      ctx.fillText(`${t.memberSince} ${memberDate}`,W/2,H-90);
      ctx.fillStyle=C.gold2;
      ctx.font="bold 14px sans-serif";
      ctx.fillText("maritime-academy-pro.lovable.app",W/2,H-60);
      // Download
      const link=document.createElement("a");
      link.download="maritime-status-card.png";
      link.href=canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloaded(true);
      setTimeout(()=>setDownloaded(false),3000);
      toast.success(toastMsg);
    }catch(e){
      console.error("Download failed",e);
      toast.error(lang==="en"?"Download failed":"Échec du téléchargement");
    }finally{
      setDownloading(false);
    }
  };

  const handlePdf=async()=>{
    if(!cardRef.current||pdfing)return;
    setPdfing(true);
    const toastMsg=lang==="en"?"PDF saved ✅":lang==="es"?"PDF guardado ✅":lang==="pt"?"PDF salvo ✅":"PDF sauvegardé ✅";
    try{
      const node=document.getElementById("status-card")||cardRef.current;
      const canvas=await html2canvas(node,{
        backgroundColor:C.navy,
        scale:2,
        useCORS:true,
        logging:false,
      });
      const imgData=canvas.toDataURL("image/png");

      // A4 portrait: 210 x 297 mm
      const pdf=new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
      const pageW=210, pageH=297;

      // Background navy
      pdf.setFillColor(6,14,26);
      pdf.rect(0,0,pageW,pageH,"F");

      // Header band
      pdf.setFillColor(10,32,64);
      pdf.rect(0,0,pageW,22,"F");
      pdf.setTextColor(201,146,42);
      pdf.setFont("helvetica","bold");
      pdf.setFontSize(14);
      pdf.text("MARITIME ACADEMY PRO",pageW/2,11,{align:"center"});
      pdf.setFontSize(8);
      pdf.setTextColor(232,185,79);
      pdf.text(t.certifiedBadge,pageW/2,17,{align:"center"});

      // Card image: fit width with margins, keep aspect ratio
      const margin=18;
      const maxW=pageW-margin*2;
      const ratio=canvas.height/canvas.width;
      let imgW=maxW;
      let imgH=imgW*ratio;
      const maxH=pageH-22-30; // header + footer
      if(imgH>maxH){ imgH=maxH; imgW=imgH/ratio; }
      const x=(pageW-imgW)/2;
      const y=28;
      pdf.addImage(imgData,"PNG",x,y,imgW,imgH);

      // Footer
      pdf.setFontSize(9);
      pdf.setTextColor(240,244,255);
      pdf.text((username||"Marin"),pageW/2,pageH-18,{align:"center"});
      pdf.setFontSize(8);
      pdf.setTextColor(150,160,180);
      pdf.text(memberDate,pageW/2,pageH-13,{align:"center"});
      pdf.setTextColor(201,146,42);
      pdf.text("maritime-academy-pro.lovable.app",pageW/2,pageH-7,{align:"center"});

      pdf.save("maritime-academy-pro-status.pdf");
      setPdfDone(true);
      setTimeout(()=>setPdfDone(false),3000);
      toast.success(toastMsg);
    }catch(e){
      console.error("PDF export failed",e);
      toast.error(lang==="en"?"PDF export failed":"Échec de l'export PDF");
    }finally{
      setPdfing(false);
    }
  };

  const handleReset=()=>{
    if(!confirmReset){ setConfirmReset(true); return; }
    try{
      localStorage.removeItem("map_status_card");
      localStorage.removeItem("map_last_reg");
      localStorage.removeItem("map_regs");
      localStorage.removeItem("map_registrations");
    }catch{}
    window.location.reload();
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",
      overflowX:"hidden",position:"relative",
    }}>
      <Stars/>

      {/* Back button */}
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
        }}>◀ {lang==="fr"?"Retour":lang==="es"?"Volver":lang==="pt"?"Voltar":"Back"}</button>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:11,
            color:C.gold,letterSpacing:3}}>MARITIME ACADEMY PRO</div>
        </div>
        <div style={{width:80}}/>
      </div>

      <div style={{
        padding:"20px 18px 50px",
        position:"relative",zIndex:1,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",
        transition:"all 0.5s ease",
      }}>
        <div style={{maxWidth:400,margin:"0 auto"}}>

          {/* Title */}
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:10,letterSpacing:4,
              color:C.gold,marginBottom:6,fontFamily:"'Cinzel',serif"}}>
              {t.statusTitle}
            </div>
            <div style={{fontSize:14,color:C.muted,fontStyle:"italic"}}>
              {notif||t.statusSub?.replace("{nom}",name)}
            </div>
            <div style={{fontSize:12,color:"rgba(232,185,79,0.85)",
              fontStyle:"italic",letterSpacing:0.5,marginTop:10}}>
              {lang==="en"?"Complete maritime training — deck and engine"
                :lang==="es"?"Formación marítima completa — puente y máquinas"
                :lang==="pt"?"Formação marítima completa — convés e máquinas"
                :"La formation maritime complète — pont et machine"}
            </div>
          </div>

          {/* ── THE CARD ── */}
          <div ref={cardRef} id="status-card" style={{
            width:"100%",
            background:"linear-gradient(160deg,#0a2040,#061020)",
            border:`1.5px solid ${C.gold}44`,
            borderRadius:28,padding:"26px 20px",
            display:"flex",flexDirection:"column",
            alignItems:"center",gap:14,
            boxShadow:`0 24px 64px rgba(0,0,0,0.65),
              0 0 60px rgba(201,146,42,0.05),
              inset 0 1px 0 rgba(255,255,255,0.05)`,
            position:"relative",overflow:"hidden",
            marginBottom:16,
            opacity:cardAnim?1:0,
            transform:cardAnim?"scale(1) translateY(0)":"scale(0.88) translateY(24px)",
            transition:"all 0.7s cubic-bezier(0.34,1.56,0.64,1)",
          }}>

            {/* BG decorations */}
            <div style={{position:"absolute",top:-60,left:"50%",
              transform:"translateX(-50%)",width:240,height:240,borderRadius:"50%",
              background:`radial-gradient(circle,${C.blue}14 0%,transparent 70%)`,
              animation:"glowPulse 4s ease-in-out infinite",pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:-30,right:-20,
              width:160,height:160,borderRadius:"50%",
              background:`radial-gradient(circle,${C.gold}0c 0%,transparent 70%)`,
              pointerEvents:"none"}}/>

            {/* MAP watermark */}
            <div style={{position:"absolute",top:14,right:16,
              fontSize:9,letterSpacing:2,
              color:"rgba(201,146,42,0.15)",
              fontFamily:"'Cinzel',serif"}}>MAP</div>

            {/* Date top left */}
            <div style={{position:"absolute",top:14,left:16,
              fontSize:9,letterSpacing:1,
              color:"rgba(240,244,255,0.2)"}}>
              {t.memberSince}<br/>
              <span style={{color:C.gold+"55"}}>{memberDate}</span>
            </div>

            {/* AVATAR */}
            <div style={{
              width:88,height:88,borderRadius:"50%",
              background:photo
                ?`url(${photo}) center/cover`
                :`linear-gradient(135deg,${C.blue},${C.gold})`,
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:`0 10px 28px rgba(26,111,212,0.4),
                0 0 0 3px rgba(255,255,255,0.1),
                0 0 0 6px rgba(201,146,42,0.15)`,
              position:"relative",zIndex:1,
              flexShrink:0,
            }}>
              {!photo&&(
                <span style={{
                  fontFamily:"'Cinzel',serif",fontSize:28,
                  fontWeight:900,color:C.white,letterSpacing:1,
                }}>{initials}</span>
              )}
            </div>

            {/* Name */}
            <div style={{
              fontFamily:"'Cinzel',serif",fontSize:20,
              fontWeight:700,color:C.white,letterSpacing:2,
              textAlign:"center",position:"relative",zIndex:1,
            }}>{(username||"MARIN").toUpperCase()}</div>

            {/* Level badge */}
            <div style={{
              padding:"8px 22px",borderRadius:20,
              background:`linear-gradient(135deg,${levelColor}44,${C.navy3})`,
              border:`1.5px solid ${levelColor}66`,
              fontSize:14,fontWeight:700,color:C.white,
              letterSpacing:1,position:"relative",zIndex:1,
              animation:badgeAnim?"badgePop 0.5s ease both":"none",
            }}>{currentLevel.label}</div>

            {/* Progress to next level */}
            {nextLevelName&&(
              <div style={{width:"100%",position:"relative",zIndex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",
                  fontSize:10,color:C.muted,marginBottom:5}}>
                  <span>{t.progressLabel?.replace("{next}",nextLevelName)}</span>
                  <span style={{color:C.gold2}}>0%</span>
                </div>
                <div style={{height:4,borderRadius:4,
                  background:"rgba(255,255,255,0.08)",overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:4,
                    width:"0%",
                    background:`linear-gradient(90deg,${levelColor},${C.gold2})`,
                    position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,bottom:0,width:"50%",
                      background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",
                      animation:"shimmer 2s ease-in-out infinite"}}/>
                  </div>
                </div>
                <div style={{fontSize:10,color:C.muted,marginTop:4,textAlign:"right"}}>
                  {t.nextLevel?.replace("{next}",nextLevelName)}
                </div>
              </div>
            )}

            <GLine/>

            {/* Stats grid */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
              gap:8,width:"100%",position:"relative",zIndex:1}}>
              <StatBox val="0" label={t.statLessons}/>
              <StatBox val="0" label={t.statCerts}/>
              <StatBox val="⭐ 0" label={t.statPoints}/>
              <StatBox val={lang.toUpperCase()} label={t.statLang}/>
              <StatBox val="1" label={t.statDays}/>
              <StatBox val="🔥 1" label={t.statStreak} highlight/>
            </div>

            <GLine/>

            {/* Profile details */}
            <div style={{width:"100%",position:"relative",zIndex:1}}>
              <InfoRow label={t.objectiveLabel} value={goal}/>
              <InfoRow label={t.shipLabel} value={ship}/>
              <InfoRow label={t.countryLabel} value={country}/>
              <InfoRow label={t.studyLabel} value={duration}/>
            </div>

            <GLine/>

            {/* IMO Badge */}
            <div style={{
              display:"flex",alignItems:"center",gap:8,
              padding:"7px 16px",borderRadius:20,
              background:"rgba(201,146,42,0.08)",
              border:`1px solid ${C.gold}33`,
              position:"relative",zIndex:1,
              animation:badgeAnim?"badgePop 0.6s ease 0.2s both":"none",
            }}>
              <span style={{fontSize:14}}>⚓</span>
              <span style={{fontSize:10,color:C.gold,
                letterSpacing:1,fontFamily:"'Cinzel',serif"}}>
                {t.certifiedBadge}
              </span>
              <span style={{fontSize:14}}>⚓</span>
            </div>

          </div>
          {/* END CARD */}

          {/* ── ACTION BUTTONS ── */}
          {/* Start training */}
          <button onClick={onStart} style={{
            width:"100%",padding:"17px 0",
            border:"none",borderRadius:16,
            background:`linear-gradient(135deg,${C.blue},${C.gold})`,
            fontFamily:"'Cinzel',serif",fontSize:15,
            fontWeight:700,letterSpacing:2,color:C.white,
            cursor:"pointer",
            boxShadow:"0 10px 36px rgba(26,111,212,0.45)",
            marginBottom:10,
            position:"relative",overflow:"hidden",
          }}>
            <span style={{position:"relative",zIndex:1}}>{t.startBtn}</span>
            <div style={{position:"absolute",top:0,left:"-100%",
              width:"100%",height:"100%",
              background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
              animation:"shimmer 3s ease-in-out infinite 1s"}}/>
          </button>

          {/* Download + Share row */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {/* Download */}
            <button onClick={handleDownload} disabled={downloading} style={{
              padding:"13px 8px",borderRadius:14,
              background:downloaded?"rgba(30,138,74,0.2)":"rgba(255,255,255,0.06)",
              border:`1px solid ${downloaded?C.green+"55":"rgba(255,255,255,0.16)"}`,
              color:downloaded?C.green:C.muted,
              fontFamily:"'Nunito',sans-serif",
              fontSize:12,fontWeight:700,cursor:downloading?"wait":"pointer",
              opacity:downloading?0.7:1,
              transition:"all 0.3s",
              display:"flex",alignItems:"center",
              justifyContent:"center",gap:6,
            }}>
              {downloading?(
                <>
                  <span style={{
                    width:14,height:14,borderRadius:"50%",
                    border:`2px solid ${C.muted}`,
                    borderTopColor:C.gold2,
                    display:"inline-block",
                    animation:"spin 0.8s linear infinite",
                  }}/>
                  <span>…</span>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </>
              ):downloaded?"✅ Sauvegardé":t.downloadBtn}
            </button>

            {/* Share WhatsApp */}
            <button onClick={handleShare} style={{
              padding:"13px 8px",borderRadius:14,
              background:shared?"rgba(37,211,102,0.2)":"rgba(37,211,102,0.08)",
              border:`1px solid ${shared?"#25d366":"rgba(37,211,102,0.3)"}`,
              color:shared?"#25d366":"rgba(37,211,102,0.8)",
              fontFamily:"'Nunito',sans-serif",
              fontSize:12,fontWeight:700,cursor:"pointer",
              transition:"all 0.3s",
              display:"flex",alignItems:"center",
              justifyContent:"center",gap:6,
            }}>
              {shared?"✅ Partagé !":t.shareBtn}
            </button>
          </div>

          {/* PDF Export */}
          <button onClick={handlePdf} disabled={pdfing} style={{
            width:"100%",padding:"14px 0",borderRadius:14,marginBottom:16,
            background:pdfDone
              ?"rgba(30,138,74,0.18)"
              :`linear-gradient(135deg,rgba(201,146,42,0.18),rgba(26,111,212,0.18))`,
            border:`1px solid ${pdfDone?C.green+"66":C.gold+"55"}`,
            color:pdfDone?C.green:C.gold2,
            fontFamily:"'Nunito',sans-serif",
            fontSize:13,fontWeight:700,letterSpacing:0.5,
            cursor:pdfing?"wait":"pointer",
            opacity:pdfing?0.7:1,
            transition:"all 0.3s",
            display:"flex",alignItems:"center",justifyContent:"center",gap:8,
          }}>
            {pdfing?(
              <>
                <span style={{
                  width:14,height:14,borderRadius:"50%",
                  border:`2px solid ${C.muted}`,
                  borderTopColor:C.gold2,
                  display:"inline-block",
                  animation:"spin 0.8s linear infinite",
                }}/>
                <span>…</span>
              </>
            ):pdfDone?"✅ PDF":t.pdfBtn}
          </button>

          {/* Motivational note */}
          <div style={{
            borderRadius:16,padding:"14px 16px",
            background:"rgba(201,146,42,0.06)",
            border:`1px solid ${C.gold}22`,
            textAlign:"center",
          }}>
            <div style={{fontSize:13,color:C.gold2,
              fontWeight:600,lineHeight:1.6}}>
              🌊{" "}
              {lang==="fr"
                ?"La mer appartient à ceux qui osent la naviguer. Ton voyage commence maintenant."
                :lang==="es"
                ?"El mar pertenece a quienes se atreven a navegarlo. Tu viaje comienza ahora."
                :lang==="pt"
                ?"O mar pertence a quem ousa navegá-lo. Sua jornada começa agora."
                :"The sea belongs to those who dare to sail it. Your journey starts now."}
            </div>
          </div>

          {/* Reset data */}
          <div style={{marginTop:10,textAlign:"center"}}>
            {onEdit && (
              <button onClick={onEdit} style={{
                width:"100%",padding:"13px 0",borderRadius:14,marginBottom:8,
                background:"rgba(26,111,212,0.12)",
                border:`1px solid ${C.blue2}55`,
                color:C.blue2,
                fontFamily:"'Nunito',sans-serif",
                fontSize:13,fontWeight:700,cursor:"pointer",
                transition:"all 0.3s",
              }}>{t.editBtn}</button>
            )}
            <button onClick={handleReset} style={{
              width:"100%",padding:"13px 0",borderRadius:14,
              background:confirmReset?"rgba(192,57,43,0.2)":"rgba(255,255,255,0.04)",
              border:`1px solid ${confirmReset?"#c0392b":"rgba(255,255,255,0.1)"}`,
              color:confirmReset?"#e74c3c":"rgba(240,244,255,0.35)",
              fontFamily:"'Nunito',sans-serif",
              fontSize:12,fontWeight:700,cursor:"pointer",
              transition:"all 0.3s",
            }}>
              {confirmReset?t.resetConfirm:t.resetBtn}
            </button>
            {confirmReset&&(
              <button onClick={()=>setConfirmReset(false)} style={{
                width:"100%",padding:"10px 0",marginTop:8,
                background:"none",border:"none",
                color:"rgba(240,244,255,0.3)",fontSize:12,cursor:"pointer",
              }}>{t.resetCancel}</button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
