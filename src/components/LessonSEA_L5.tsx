import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  bg0:"#03070f", bg1:"#060e1a", bg2:"#0a1628", bg3:"#0d1f3c",
  amber:"#ffb300", amber2:"#ffd54f",
  steel:"#455a64", steel2:"#78909c", steel3:"#b0bec5",
  green:"#00e676", green2:"#69f0ae",
  red:"#ff1744", red2:"#ff5252",
  orange:"#ff6d00", orange2:"#ff9e40",
  blue:"#2979ff", blue2:"#82b1ff",
  gold:"#c9922a", gold2:"#e8b94f",
  white:"#f0f4ff", muted:"rgba(176,190,197,0.7)", dim:"rgba(176,190,197,0.35)",
  border:"rgba(201,146,42,0.22)",
  water:"#7eb8d4", hull:"#94a3b8", meta:"#e8b94f",
  danger:"#f97316", safe:"#6dbf8a", keel:"#8b7355",
  grav:"#c084fc", buoy:"#38bdf8",
};

const T = {
  fr:{ back:"◀ Retour", module:"Seamanship",
    question:"Question", ofQ:"sur", correct:"✓ Bonne reponse!", wrong:"✗ Mauvaise reponse",
    expl:"Explication:", next:"SUIVANT =>", finish:"VOIR MON SCORE =>",
    startQuiz:"COMMENCER LE QUIZ", backDash:"<= RETOUR AU DASHBOARD",
    youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz",
    showCorr:"Voir la correction", hideCorr:"Masquer", xp:"XP gagnes" },
  en:{ back:"◀ Back", module:"Seamanship",
    question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer",
    expl:"Explanation:", next:"NEXT =>", finish:"SEE MY SCORE =>",
    startQuiz:"START QUIZ", backDash:"<= BACK TO DASHBOARD",
    youLearned:"You learned:", readFirst:"Read the content then start the quiz",
    showCorr:"Show correction", hideCorr:"Hide", xp:"XP earned" },
  es:{ back:"◀ Volver", module:"Seamanship",
    question:"Pregunta", ofQ:"de", correct:"✓ Correcta!", wrong:"✗ Incorrecta",
    expl:"Explicacion:", next:"SIGUIENTE =>", finish:"VER PUNTUACION =>",
    startQuiz:"EMPEZAR QUIZ", backDash:"<= VOLVER AL PANEL",
    youLearned:"Has aprendido:", readFirst:"Lee y luego comienza",
    showCorr:"Ver correccion", hideCorr:"Ocultar", xp:"XP ganados" },
  pt:{ back:"◀ Voltar", module:"Seamanship",
    question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada",
    expl:"Explicacao:", next:"PROXIMO =>", finish:"VER PONTUACAO =>",
    startQuiz:"COMECAR QUIZ", backDash:"<= VOLTAR AO PAINEL",
    youLearned:"Voce aprendeu:", readFirst:"Leia o conteudo e depois comece",
    showCorr:"Ver correcao", hideCorr:"Ocultar", xp:"XP ganhos" },
};

function Stars() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}
      viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
      {[{cx:40,cy:70,r:0.8},{cx:300,cy:40,r:1.1},{cx:170,cy:110,r:0.7},
        {cx:340,cy:190,r:0.9},{cx:55,cy:310,r:0.7},{cx:270,cy:370,r:1.0},
        {cx:120,cy:490,r:0.8},{cx:310,cy:590,r:0.7},{cx:65,cy:670,r:1.2}].map((s,i)=>(
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={C.gold2} opacity={0.18+Math.sin(i)*0.1}/>
      ))}
    </svg>
  );
}

function SL({ icon, text, color }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",marginBottom:6}}>
      <div style={{width:38,height:38,borderRadius:13,background:`${color}15`,
        border:`1.5px solid ${color}55`,display:"flex",alignItems:"center",
        justifyContent:"center",fontSize:19,flexShrink:0}}>{icon}</div>
      <div style={{fontSize:11,fontWeight:800,color,letterSpacing:2,
        fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>{text}</div>
    </div>
  );
}

function getTrophy(score, total) {
  const pct = score / total;
  if (pct===1)  return {icon:"🏆",color:"#f1c40f",label:{fr:"Parfait !",en:"Perfect!",es:"Perfecto!",pt:"Perfeito!"}};
  if (pct>=0.8) return {icon:"🥇",color:"#ffd54f",label:{fr:"Excellent !",en:"Excellent!",es:"Excelente!",pt:"Excelente!"}};
  if (pct>=0.6) return {icon:"🥈",color:"#b0bec5",label:{fr:"Bien !",en:"Well done!",es:"Bien!",pt:"Bem feito!"}};
  if (pct>=0.4) return {icon:"🥉",color:"#cd7f32",label:{fr:"Continue !",en:"Keep going!",es:"Sigue!",pt:"Continue!"}};
  return              {icon:"📚",color:"rgba(176,190,197,0.6)",label:{fr:"A retravailler",en:"Keep studying",es:"A repasar",pt:"Continue estudando"}};
}

// ═══════════════════════════════════
// SVG 1 — POINTS G B M K
// ═══════════════════════════════════
function GBMDiagramSVG({ lang }) {
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);
  const [sel,setSel]=useState(null);
  const pts=[
    {id:"K",cx:110,cy:192,r:5,color:C.keel,
      name:lbl("K — Quille","K — Keel","K — Quilla","K — Quilha"),
      desc:lbl("Point le plus bas — reference de hauteur. KG = quille a G. KM = quille a M. GM = KM - KG. Toutes les hauteurs sont comptees depuis K vers le haut.",
        "Lowest point — height reference. KG = keel to G. KM = keel to M. GM = KM - KG. All heights counted from K upwards.",
        "Punto mas bajo — referencia de altura. KG = quilla a G. KM = quilla a M. GM = KM - KG.",
        "Ponto mais baixo — referencia de altura. KG = quilha a G. KM = quilha a M. GM = KM - KG.")},
    {id:"B",cx:110,cy:160,r:6,color:C.buoy,
      name:lbl("B — Centre de carence","B — Centre of Buoyancy","B — Centro de carena","B — Centro de carena"),
      desc:lbl("Centre geometrique du volume immerse. SE DEPLACE lateralement quand le navire gite — c'est ce deplacement qui cree le bras GZ redressant. Poussee d'Archimede = P x g x V immerse.",
        "Geometric centre of submerged volume. MOVES laterally when vessel heels — this movement creates the righting GZ lever. Archimedes buoyancy = rho x g x V submerged.",
        "Centro geometrico del volumen sumergido. SE DESPLAZA lateralmente al escorar — este desplazamiento crea el brazo GZ adrizante.",
        "Centro geometrico do volume submerso. DESLOCA-SE lateralmente ao adornar — este deslocamento cria o braco GZ de endireitamento.")},
    {id:"G",cx:110,cy:115,r:7,color:C.grav,
      name:lbl("G — Centre de gravite","G — Centre of Gravity","G — Centro de gravedad","G — Centro de gravidade"),
      desc:lbl("Point d'application de toutes les forces de gravite (poids propre + cargaison + carburant + equipage). Monte si on charge en hauteur. Descend si on charge bas. NE SE DEPLACE PAS avec la gite. GM = KM - KG.",
        "Application point of all gravity forces (own weight + cargo + fuel + crew). Rises if loaded high. Falls if loaded low. DOES NOT MOVE with heel. GM = KM - KG.",
        "Punto de aplicacion de todas las fuerzas de gravedad. Sube al cargar en altura. No se mueve con la escora.",
        "Ponto de aplicacao de todas as forcas de gravidade. Sobe ao carregar em altura. Nao se move com a banda.")},
    {id:"M",cx:110,cy:62,r:7,color:C.meta,
      name:lbl("M — Metacentre","M — Metacentre","M — Metacentro","M — Metacentro"),
      desc:lbl("Point virtuel : intersection de la verticale de la poussee gitee et de l'axe initial. GM positif (G sous M) = STABLE. GM nul = NEUTRE. GM negatif (G sur M) = INSTABLE et risque chavirement. IMO : GM min = 0,15 m.",
        "Virtual point: intersection of heeled buoyancy vertical and initial axis. Positive GM (G below M) = STABLE. Zero GM = NEUTRAL. Negative GM (G above M) = UNSTABLE, capsize risk. IMO: min GM = 0.15 m.",
        "Punto virtual. GM positivo (G bajo M) = ESTABLE. GM nulo = NEUTRO. GM negativo = INESTABLE. OMI: GM min = 0,15 m.",
        "Ponto virtual. GM positivo (G abaixo de M) = ESTAVEL. GM nulo = NEUTRO. GM negativo = INSTAVEL. IMO: GM min = 0,15 m.")},
  ];
  const selPt=pts.find(p=>p.id===sel);
  const W=240;const H=220;
  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block",margin:"0 auto"}}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <rect x={0} y={108} width={W} height={112} fill={C.water} opacity={0.07}/>
        <line x1={0} y1={108} x2={W} y2={108} stroke={C.water} strokeWidth="1.2" strokeDasharray="5,3" opacity="0.5"/>
        <text x={15} y={105} fontSize="7" fill={C.water} opacity="0.4" fontFamily="Courier New">waterline</text>
        <path d="M45 108 L45 158 Q110 186 175 158 L175 108 Z" fill={C.hull} opacity={0.2} stroke={C.hull} strokeWidth="1.2"/>
        <line x1={110} y1={18} x2={110} y2={200} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1={110} y1={160} x2={110} y2={70} stroke={C.buoy} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.4"/>
        <line x1={92} y1={128} x2={92} y2={108} stroke={C.grav} strokeWidth="1" opacity="0.5"/>
        <text x={76} y={120} fontSize="6" fill={C.grav} opacity="0.5" fontFamily="Courier New">GM</text>
        <line x1={136} y1={192} x2={136} y2={115} stroke={C.grav} strokeWidth="0.7" strokeDasharray="2,2" opacity="0.35"/>
        <text x={139} y={157} fontSize="6" fill={C.grav} opacity="0.45" fontFamily="Courier New">KG</text>
        <line x1={150} y1={192} x2={150} y2={62} stroke={C.meta} strokeWidth="0.7" strokeDasharray="2,2" opacity="0.35"/>
        <text x={153} y={130} fontSize="6" fill={C.meta} opacity="0.45" fontFamily="Courier New">KM</text>
        {pts.map(p=>(
          <g key={p.id} style={{cursor:"pointer"}} onClick={()=>setSel(sel===p.id?null:p.id)}>
            <circle cx={p.cx} cy={p.cy} r={sel===p.id?p.r+3:p.r}
              fill={sel===p.id?`${p.color}22`:C.bg1}
              stroke={p.color} strokeWidth={sel===p.id?2.5:1.5}/>
            <text x={p.cx+p.r+4} y={p.cy+4} fontSize="9" fontFamily="Courier New"
              fill={p.color} fontWeight={sel===p.id?"800":"400"}>{p.id}</text>
          </g>
        ))}
        <text x={W/2} y={H-4} textAnchor="middle" fontSize="6.5" fill={C.dim}>
          {lbl("Toucher G, B, M ou K","Tap G, B, M or K","Tocar G, B, M o K","Tocar G, B, M ou K")}
        </text>
      </svg>
      {selPt ? (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:14,
          background:`${selPt.color}0e`,border:`1px solid ${selPt.color}44`}}>
          <div style={{fontSize:12,fontWeight:800,color:selPt.color,marginBottom:5,fontFamily:"Courier New"}}>{selPt.name}</div>
          <div style={{fontSize:10,color:C.steel3,lineHeight:1.6}}>{selPt.desc}</div>
        </div>
      ) : (
        <div style={{marginTop:8,padding:"7px 10px",borderRadius:10,
          background:`${C.meta}08`,border:`1px solid ${C.meta}33`,
          fontSize:10,color:C.steel3,fontFamily:"Courier New",textAlign:"center"}}>
          GM = KM - KG · G sous M = stable · G sur M = instable
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════
// SVG 2 — COURBE GZ + SIMULATEUR GM
// ═══════════════════════════════════
function GZCurveSVG({ lang }) {
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);
  const [heel,setHeel]=useState(20);
  const [gm,setGm]=useState(1.0);

  const gzFn=(a,gmVal)=>{
    if(a<=0) return 0;
    const rad=a*Math.PI/180;
    const vanish=Math.round(60+(gmVal-0.5)*10);
    if(a>=vanish) return 0;
    return gmVal*1.4*Math.sin(rad*2.5)*Math.exp(-rad*0.8)*(gmVal/1.0);
  };
  const gzVal=gzFn(heel,gm);
  const vanishAngle=Math.round(60+(gm-0.5)*10);
  const isCritical=heel>vanishAngle*0.85;
  const isPositive=gzVal>0;
  const W=280;const H=130;
  const padL=30;const padT=10;const padB=22;
  const toX=(d)=>padL+(d/80)*(W-padL-10);
  const toY=(v)=>padT+(1-v/1.4)*(H-padT-padB);
  const pts=Array.from({length:81},(_,i)=>i).map(d=>`${toX(d)},${toY(Math.max(0,gzFn(d,gm)))}`).join(" ");

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block",margin:"0 auto"}}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        {[0,20,40,60,80].map(d=>(
          <g key={d}>
            <line x1={toX(d)} y1={padT} x2={toX(d)} y2={H-padB} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            <text x={toX(d)} y={H-5} fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="Courier New" textAnchor="middle">{d}</text>
          </g>
        ))}
        {[0,0.4,0.8,1.2].map(v=>(
          <g key={v}>
            <line x1={padL} y1={toY(v)} x2={W-8} y2={toY(v)} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            <text x={padL-4} y={toY(v)+3} fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="Courier New" textAnchor="end">{v.toFixed(1)}</text>
          </g>
        ))}
        <line x1={padL} y1={padT} x2={padL} y2={H-padB} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <line x1={padL} y1={H-padB} x2={W-8} y2={H-padB} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <polyline points={pts} fill="none" stroke={C.safe} strokeWidth="2"/>
        <polygon points={`${padL},${H-padB} ${pts} ${toX(80)},${H-padB}`} fill={C.safe} opacity="0.06"/>
        <line x1={toX(vanishAngle)} y1={padT} x2={toX(vanishAngle)} y2={H-padB}
          stroke={C.red} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>
        <text x={toX(vanishAngle)+2} y={padT+10} fontSize="6" fill={C.red} fontFamily="Courier New">{vanishAngle}</text>
        <line x1={toX(heel)} y1={padT} x2={toX(heel)} y2={H-padB}
          stroke={isCritical?C.danger:C.meta} strokeWidth="1.5" strokeDasharray="3,2"/>
        <circle cx={toX(heel)} cy={toY(Math.max(0,gzVal))} r={5}
          fill={isCritical?C.danger:isPositive?C.safe:C.red}/>
        <text x={W/2} y={H-1} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="Courier New">
          {lbl("Gite (deg)","Heel (deg)","Escora (grados)","Banda (graus)")}
        </text>
        <text x={8} y={H/2} fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="Courier New"
          textAnchor="middle" transform={`rotate(-90,8,${H/2})`}>GZ (m)</text>
      </svg>
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <div style={{flex:1}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:3}}>
            {lbl("Gite","Heel","Escora","Banda")}: {heel}
          </div>
          <input type="range" min={0} max={80} value={heel} onChange={e=>setHeel(Number(e.target.value))}
            style={{width:"100%",accentColor:isCritical?C.danger:C.meta}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:3}}>GM: {gm.toFixed(1)} m</div>
          <input type="range" min={0.1} max={2.5} step={0.1} value={gm} onChange={e=>setGm(Number(e.target.value))}
            style={{width:"100%",accentColor:C.meta}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:6,marginTop:8}}>
        {[
          {label:"GZ",val:`${gzVal.toFixed(2)} m`,color:isCritical?C.danger:isPositive?C.safe:C.red},
          {label:lbl("Chavirement","Vanishing","Zozobra","Tombamento"),val:`${vanishAngle}`,color:C.meta},
          {label:lbl("Etat","State","Estado","Estado"),
            val:isCritical?lbl("DANGER","DANGER","PELIGRO","PERIGO"):isPositive?lbl("STABLE","STABLE","ESTABLE","ESTAVEL"):lbl("CHAVIRE","CAPSIZED","ZOZOBRA","TOMBADO"),
            color:isCritical?C.danger:isPositive?C.safe:C.red},
        ].map((item,i)=>(
          <div key={i} style={{flex:1,padding:"7px 8px",borderRadius:10,
            background:`${item.color}0f`,border:`1px solid ${item.color}33`,textAlign:"center"}}>
            <div style={{fontSize:8,color:C.muted,fontFamily:"Courier New",marginBottom:2}}>{item.label}</div>
            <div style={{fontSize:12,fontWeight:800,fontFamily:"Courier New",color:item.color}}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// SVG 3 — ETATS DE STABILITE
// ═══════════════════════════════════
function StabilityStatesSVG({ lang }) {
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);
  const [sel,setSel]=useState("stable");
  const states=[
    {id:"stable",icon:"✅",color:C.safe,gY:115,mY:62,
      label:lbl("Stable (GM > 0)","Stable (GM > 0)","Estable (GM > 0)","Estavel (GM > 0)"),
      desc:lbl("G sous M. Bras GZ positif -> couple redressant -> retour a la verticale. Etat normal et recherche.",
        "G below M. Positive GZ lever -> righting couple -> returns upright. Normal, desired state.",
        "G bajo M. Brazo GZ positivo -> par adrizante -> vuelve a la vertical. Estado normal.",
        "G abaixo de M. Braco GZ positivo -> binas de endireitamento -> volta a vertical. Estado normal.")},
    {id:"neutral",icon:"⚖️",color:C.meta,gY:68,mY:68,
      label:lbl("Neutre (GM = 0)","Neutral (GM = 0)","Neutro (GM = 0)","Neutro (GM = 0)"),
      desc:lbl("G coincide avec M. Navire reste en position inclinee — ni redressement ni chavirement. DANGEREUX.",
        "G coincides with M. Vessel stays heeled — no righting, no capsizing. DANGEROUS.",
        "G coincide con M. El buque permanece inclinado. PELIGROSO.",
        "G coincide com M. O navio permanece inclinado. PERIGOSO.")},
    {id:"unstable",icon:"❌",color:C.danger,gY:50,mY:68,
      label:lbl("Instable (GM < 0)","Unstable (GM < 0)","Inestable (GM < 0)","Instavel (GM < 0)"),
      desc:lbl("G au-dessus de M. Couple chavirant -> chavirement. URGENCE ABSOLUE. Demarrer pompes ballast bas, alerter equiPage.",
        "G above M. Capsizing couple -> capsize. ABSOLUTE EMERGENCY. Start low ballast pumps, alert crew.",
        "G por encima de M. Par zozobrante -> zozobra. EMERGENCIA ABSOLUTA. Arrancar bombas lastro bajo, alertar tripulacion.",
        "G acima de M. Binas de tombamento -> tombamento. EMERGENCIA ABSOLUTA. Iniciar bombas lastro baixo, alertar tripulacao.")},
    {id:"stiff",icon:"⚡",color:C.blue2,gY:145,mY:38,
      label:lbl("Raide (GM > 2m)","Stiff (GM > 2m)","Rigido (GM > 2m)","Rigido (GM > 2m)"),
      desc:lbl("GM tres positif. Mouvements brusques et violents. Inconfort equipage, fatigue structures, risque cargaison. Solution : charger plus haut ou reduire ballast bas.",
        "Very positive GM. Sudden violent movements. Crew discomfort, structural fatigue, cargo risk. Solution: load higher or reduce low ballast.",
        "GM muy positivo. Movimientos bruscos y violentos. Incomodidad tripulacion, fatiga estructuras.",
        "GM muito positivo. Movimentos bruscos e violentos. Desconforto tripulacao, fadiga estruturas.")},
    {id:"tender",icon:"🌊",color:C.grav,gY:104,mY:110,
      label:lbl("Mou (0 < GM < 0.15m)","Tender (0 < GM < 0.15m)","Blando (0 < GM < 0,15m)","Mole (0 < GM < 0,15m)"),
      desc:lbl("GM faiblement positif. Gite lente et longue. Risque si evenement supplementaire. IMO : GM minimum = 0,15 m. Solution : ajouter ballast bas.",
        "Weakly positive GM. Slow long roll. Risk if additional event. IMO: min GM = 0.15 m. Solution: add low ballast.",
        "GM debilmente positivo. Escora lenta y prolongada. IMO: GM minimo = 0,15 m. Solucion: anadir lastre bajo.",
        "GM debilmente positivo. Banda lenta e prolongada. IMO: GM minimo = 0,15 m. Solucao: adicionar lastro baixo.")},
  ];
  const s=states.find(st=>st.id===sel);
  const W=220;const H=160;
  return (
    <div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
        {states.map(st=>(
          <button key={st.id} onClick={()=>setSel(st.id)}
            style={{padding:"5px 9px",borderRadius:8,fontSize:10,cursor:"pointer",
              background:sel===st.id?`${st.color}22`:"transparent",
              border:`1px solid ${sel===st.id?st.color:"rgba(255,255,255,0.1)"}`,
              color:sel===st.id?st.color:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>
            {st.icon} {st.id}
          </button>
        ))}
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block",margin:"0 auto"}}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <rect x={0} y={86} width={W} height={74} fill={C.water} opacity={0.07}/>
        <line x1={0} y1={86} x2={W} y2={86} stroke={C.water} strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>
        <path d="M38 86 L38 132 Q110 154 182 132 L182 86 Z" fill={C.hull} opacity={0.2} stroke={C.hull} strokeWidth="1.2"/>
        <line x1={110} y1={10} x2={110} y2={155} stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3,3"/>
        <circle cx={110} cy={150} r={5} fill={C.keel}/>
        <text x={116} y={154} fontSize="8" fill={C.keel} fontFamily="Courier New">K</text>
        <circle cx={110} cy={s.mY} r={6} fill={C.meta}/>
        <text x={116} y={s.mY+4} fontSize="8" fill={C.meta} fontFamily="Courier New">M</text>
        <circle cx={110} cy={s.gY} r={6} fill={C.grav}/>
        <text x={116} y={s.gY+4} fontSize="8" fill={C.grav} fontFamily="Courier New">G</text>
        <line x1={90} y1={s.mY} x2={90} y2={s.gY} stroke={s.color} strokeWidth="1.5"/>
        <line x1={86} y1={s.mY} x2={94} y2={s.mY} stroke={s.color} strokeWidth="1.5"/>
        <line x1={86} y1={s.gY} x2={94} y2={s.gY} stroke={s.color} strokeWidth="1.5"/>
        <text x={78} y={(s.mY+s.gY)/2+4} textAnchor="end" fontSize="8" fill={s.color} fontFamily="Courier New">GM</text>
      </svg>
      {s && (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
          background:`${s.color}0e`,border:`1px solid ${s.color}44`}}>
          <div style={{fontSize:11,fontWeight:800,color:s.color,marginBottom:4}}>{s.icon} {s.label}</div>
          <div style={{fontSize:10,color:C.steel3,lineHeight:1.6}}>{s.desc}</div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════
// SVG 4 — FACTEURS + CRITERES IMO + FRANC-BORD
// ═══════════════════════════════════
function FactorsSVG({ lang }) {
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);
  const [tab,setTab]=useState("factors");
  const [selF,setSelF]=useState(null);

  const factors=[
    {id:"loading",icon:"📦",color:C.amber2,
      name:lbl("Chargement en hauteur","High loading","Carga en altura","Carga em altura"),
      effect:lbl("G monte -> GM diminue -> navire mou ou instable","G rises -> GM falls -> tender or unstable","G sube -> GM disminuye -> blando o inestable","G sobe -> GM diminui -> mole ou instavel"),
      fix:lbl("Lester bas : ballast bas, cargaison lourde en fond de cale","Ballast low: low ballast, heavy cargo in lower holds","Lastrar bajo: lastre bajo, carga pesada en fondo de bodega","Lastrar baixo: lastro baixo, carga pesada no fundo do porcao")},
    {id:"freesurface",icon:"🌊",color:C.buoy,
      name:lbl("Effet de surface libre","Free surface effect","Efecto superficie libre","Efeito superficie livre"),
      effect:lbl("Liquide partiel dans citerne : G virtuel monte de GG' = i x dL / D. Diviser citerne par 2 = GG' divise par 4.",
        "Liquid in part-full tank: virtual G rises by GG' = i x dL / D. Divide tank by 2 = GG' divided by 4.",
        "Liquido parcial en tanque: G virtual sube GG' = i x dL / D. Dividir tanque por 2 = GG' dividido entre 4.",
        "Liquido parcial em tanque: G virtual sobe GG' = i x dL / D. Dividir tanque por 2 = GG' dividido por 4."),
      fix:lbl("Remplir ou vider completement les citernes. Cloisons longitudinales (divise moment d'inertie i par 4).","Fill or empty tanks completely. Longitudinal divisions (divides inertia moment i by 4).","Llenar o vaciar completamente los tanques. Mamparos longitudinales (divide i entre 4).","Encher ou esvaziar completamente os tanques. Anteparas longitudinais (divide i por 4).")},
    {id:"icing",icon:"🧊",color:C.blue2,
      name:lbl("Givrage (Icing)","Icing","Formacion de hielo","Formacao de gelo"),
      effect:lbl("Glace sur structures hautes -> G monte -> risque instabilite en eaux arctiques ou meteo froide.","Ice on high structures -> G rises -> instability risk in arctic waters or cold weather.","Hielo en estructuras altas -> G sube -> riesgo inestabilidad en aguas articas.","Gelo em estruturas altas -> G sobe -> risco instabilidade em aguas articas."),
      fix:lbl("Eliminer la glace des que possible (manuellement, vapeur). Modifier la route. Augmenter le ballast bas.","Remove ice ASAP (manual, steam). Alter course. Increase low ballast.","Eliminar el hielo lo antes posible. Cambiar de ruta. Aumentar el lastre bajo.","Remover o gelo o mais cedo possivel. Alterar o rumo. Aumentar o lastro baixo.")},
    {id:"flooding",icon:"💧",color:C.danger,
      name:lbl("Envahissement","Flooding","Inundacion","Inundacao"),
      effect:lbl("Eau dans compartiment : poids en hauteur + effet surface libre. DOUBLE impact negatif sur GM. Urgence.","Water in compartment: weight at height + free surface effect. DOUBLE negative GM impact. Emergency.","Agua en compartimento: peso en altura + efecto superficie libre. DOBLE impacto negativo en GM. Urgencia.","Agua no compartimento: peso em altura + efeito superficie livre. DUPLO impacto negativo no GM. Urgencia."),
      fix:lbl("Pomper immediatement. Contre-ballaster. Fermer portes etanches. Alerter passerelle. ISM Code procedure urgence.","Pump immediately. Counter-ballast. Close watertight doors. Alert bridge. ISM Code emergency procedure.","Bombear inmediatamente. Contra-lastrar. Cerrar puertas estancas. Alertar puente.","Bombear imediatamente. Contra-lastrar. Fechar portas estanques. Alertar ponte.")},
  ];

  const imoItems=[
    {label:"GM initial",val:lbl(">= 0,15 m",">= 0.15 m",">= 0,15 m",">= 0,15 m"),
      desc:lbl("Hauteur metacentrique minimale","Min metacentric height","Altura metacentrica minima","Altura metacentrica minima")},
    {label:"GZ max",val:lbl(">= 0,20 m a >= 30",">=0.20 m at >=30 deg",">= 0,20 m a >= 30 grados",">= 0,20 m a >= 30 graus"),
      desc:lbl("Bras de levier max","Max righting lever","Brazo maximo","Braco maximo")},
    {label:lbl("Angle chavirement","Vanishing angle","Angulo zozobra","Angulo tombamento"),val:lbl(">= 25 apres max GZ",">= 25 past GZ max",">= 25 tras max GZ",">= 25 apos max GZ"),
      desc:lbl("Angle apres maximum GZ","Angle past GZ maximum","Angulo tras maximo GZ","Angulo apos maximo GZ")},
    {label:"Aire 0->30",val:lbl(">= 0,055 m.rad",">= 0.055 m.rad",">= 0,055 m.rad",">= 0,055 m.rad"),
      desc:lbl("Stabilite dynamique premier quart","Dynamic stability first quarter","Estabilidad dinamica primer cuarto","Estabilidade dinamica primeiro quarto")},
    {label:"Aire 0->40",val:lbl(">= 0,090 m.rad",">= 0.090 m.rad",">= 0,090 m.rad",">= 0,090 m.rad"),
      desc:lbl("Stabilite dynamique totale","Total dynamic stability","Estabilidad dinamica total","Estabilidade dinamica total")},
    {label:"Aire 30->40",val:lbl(">= 0,030 m.rad",">= 0.030 m.rad",">= 0,030 m.rad",">= 0,030 m.rad"),
      desc:lbl("Reserve stabilite avancee","Advanced stability reserve","Reserva estabilidad avanzada","Reserva estabilidade avancada")},
  ];

  const selFactor=factors.find(f=>f.id===selF);

  return (
    <div>
      <div style={{display:"flex",gap:5,marginBottom:10}}>
        {[
          {id:"factors",label:lbl("Facteurs","Factors","Factores","Fatores"),color:C.amber},
          {id:"imo",label:"IS Code IMO 2008",color:C.green},
          {id:"franckbord",label:lbl("Franc-bord","Freeboard","Francobordo","Bordo livre"),color:C.buoy},
        ].map(tb=>(
          <button key={tb.id} onClick={()=>setTab(tb.id)}
            style={{flex:1,padding:"7px 4px",
              background:tab===tb.id?`${tb.color}15`:"transparent",
              border:`1px solid ${tab===tb.id?tb.color:"rgba(255,255,255,0.1)"}`,
              borderRadius:9,color:tab===tb.id?tb.color:C.muted,
              fontSize:9,cursor:"pointer",fontWeight:tab===tb.id?700:400}}>
            {tb.label}
          </button>
        ))}
      </div>

      {tab==="factors" && (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
            {factors.map(f=>(
              <button key={f.id} onClick={()=>setSelF(selF===f.id?null:f.id)}
                style={{padding:"8px",background:selF===f.id?`${f.color}15`:`${f.color}07`,
                  border:`1px solid ${selF===f.id?f.color:`${f.color}33`}`,
                  borderRadius:10,cursor:"pointer",textAlign:"left"}}>
                <div style={{fontSize:16,marginBottom:3}}>{f.icon}</div>
                <div style={{fontSize:9,color:selF===f.id?f.color:C.muted,fontWeight:selF===f.id?700:400,lineHeight:1.3}}>{f.name}</div>
              </button>
            ))}
          </div>
          {selFactor && (
            <div style={{padding:"10px 12px",borderRadius:14,
              background:`${selFactor.color}0e`,border:`1px solid ${selFactor.color}44`}}>
              <div style={{fontSize:11,fontWeight:800,color:selFactor.color,marginBottom:5}}>{selFactor.icon} {selFactor.name}</div>
              <div style={{fontSize:10,color:C.red2,marginBottom:5,lineHeight:1.5}}>
                {lbl("Effet:","Effect:","Efecto:","Efeito:")} {selFactor.effect}
              </div>
              <div style={{fontSize:10,color:C.green2,lineHeight:1.5}}>
                {lbl("Solution:","Solution:","Solucion:","Solucao:")} {selFactor.fix}
              </div>
            </div>
          )}
        </div>
      )}

      {tab==="imo" && (
        <div>
          <div style={{fontSize:10,color:C.green,fontWeight:700,marginBottom:8,fontFamily:"'Cinzel',serif",letterSpacing:0.5}}>
            IMO IS Code 2008 (MSC.267(85))
          </div>
          {imoItems.map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,
              padding:"7px 10px",marginBottom:5,borderRadius:9,
              background:"rgba(0,230,118,0.05)",border:"1px solid rgba(0,230,118,0.15)"}}>
              <div style={{width:16,height:16,borderRadius:5,background:C.green,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:9,color:C.bg0,fontWeight:900,flexShrink:0}}>✓</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                  <span style={{fontSize:9,color:C.white,fontFamily:"Courier New",fontWeight:700}}>{item.label}</span>
                  <span style={{fontSize:9,color:C.green,fontFamily:"Courier New",fontWeight:800}}>{item.val}</span>
                </div>
                <div style={{fontSize:8,color:C.muted}}>{item.desc}</div>
              </div>
            </div>
          ))}
          <div style={{marginTop:6,padding:"7px 10px",borderRadius:9,
            background:"rgba(255,179,0,0.07)",border:`1px solid ${C.amber}33`,
            fontSize:9,color:C.amber2,lineHeight:1.5}}>
            {lbl("Ces criteres s'appliquent a TOUTES les conditions de chargement. Verification par logiciel de stabilite avant chaque appareillage.",
              "These criteria apply to ALL loading conditions. Verified by stability software before each departure.",
              "Estos criterios se aplican a TODAS las condiciones de carga. Verificacion por software de estabilidad antes de zarpar.",
              "Estes criterios aplicam-se a TODAS as condicoes de carga. Verificacao pelo software de estabilidade antes de zarpar.")}
          </div>
        </div>
      )}

      {tab==="franckbord" && (
        <div>
          <svg width={280} height={130} viewBox="0 0 280 130" style={{display:"block",margin:"0 auto 8px"}}>
            <rect width={280} height={130} fill={C.bg0} rx="8"/>
            {/* eau */}
            <rect x={0} y={70} width={280} height={60} fill={C.water} opacity={0.1}/>
            <line x1={0} y1={70} x2={280} y2={70} stroke={C.water} strokeWidth="1.5" opacity="0.6"/>
            {/* coque */}
            <rect x={30} y={20} width={220} height={50} rx="6" fill={C.hull} opacity={0.2} stroke={C.hull} strokeWidth="1.2"/>
            {/* franc-bord */}
            <line x1={220} y1={20} x2={220} y2={70} stroke={C.buoy} strokeWidth="2"/>
            <line x1={215} y1={20} x2={225} y2={20} stroke={C.buoy} strokeWidth="2"/>
            <line x1={215} y1={70} x2={225} y2={70} stroke={C.buoy} strokeWidth="2"/>
            <text x={228} y={48} fontSize="8" fill={C.buoy} fontFamily="Courier New">Franc-bord</text>
            {/* marques Plimsoll */}
            <circle cx={130} cy={70} r={18} fill="none" stroke={C.safe} strokeWidth="2"/>
            <line x1={112} y1={70} x2={148} y2={70} stroke={C.safe} strokeWidth="2"/>
            <text x={152} y={74} fontSize="8" fill={C.safe} fontFamily="Courier New">LF</text>
            {/* tirant eau */}
            <line x1={60} y1={70} x2={60} y2={118} stroke={C.meta} strokeWidth="2" strokeDasharray="3,2"/>
            <text x={63} y={97} fontSize="8" fill={C.meta} fontFamily="Courier New">T/D</text>
          </svg>
          <div style={{fontSize:11,color:C.white,fontWeight:700,marginBottom:6}}>
            {lbl("Franc-bord (Freeboard) et ligne de charge Plimsoll","Freeboard and Plimsoll Load Line","Francobordo y linea de carga Plimsoll","Bordo livre e linha de carga Plimsoll")}
          </div>
          <div style={{fontSize:10,color:C.steel3,lineHeight:1.7}}>
            {lbl("Le franc-bord est la distance entre la ligne de flottaison et le pont principal. Il determine la RESERVE DE FLOTTABILITE. Plus le franc-bord est grand, plus le navire peut giter avant l'embarquement d'eau sur le pont.\n\nLa ligne de charge Plimsoll fixe le franc-bord MINIMUM legal selon : zone de navigation (eau douce FW / tropicale T / estivale S / hivernale W / hivernal Atlantique Nord WNA) et saison. Un franc-bord insuffisant reduit l'angle de chavirement.\n\nExperience de stabilite (inclining experiment) : obligatoire a la construction et apres modifications majeures. Masse p deplacee sur distance d -> mesure gite theta -> GM = (p x d) / (Deplacement x tan theta).",
              "Freeboard is the distance between the waterline and the main deck. It determines the RESERVE OF BUOYANCY. Greater freeboard means the vessel can heel more before water comes on deck.\n\nThe Plimsoll load line fixes the MINIMUM legal freeboard by: navigation zone (fresh water FW / tropical T / summer S / winter W / winter North Atlantic WNA) and season. Insufficient freeboard reduces angle of vanishing stability.\n\nInclining experiment: mandatory at construction and after major modifications. Mass p shifted distance d -> measures heel theta -> GM = (p x d) / (Displacement x tan theta).",
              "El francobordo es la distancia entre la linea de flotacion y el puente principal. La linea de carga Plimsoll fija el francobordo MINIMO legal segun zona de navegacion y estacion. Un francobordo insuficiente reduce el angulo de zozobra.\n\nExperiencia de estabilidad: obligatoria en la construccion y tras modificaciones mayores. Masa p desplazada distancia d -> GM = (p x d) / (Desplazamiento x tan theta).",
              "O bordo livre e a distancia entre a linha de agua e o convés principal. A linha de carga Plimsoll fixa o bordo livre MINIMO legal por zona de navegacao e estacao. Bordo livre insuficiente reduz o angulo de tombamento.\n\nExperiencia de estabilidade: obrigatoria na construcao e apos modificacoes maiores. Massa p deslocada distancia d -> GM = (p x d) / (Deslocamento x tan theta).")}
          </div>
        </div>
      )}
    </div>
  );
}

function Exercise1({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC,setShowC]=useState(false);
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);

  const qs={
    fr:[
      {id:"q1",q:"Un navire a KG = 7,2 m et KM = 8,5 m.\nCalculez GM. Le navire est-il stable ?"},
      {id:"q2",q:"Qu'arrive-t-il au GM quand on charge des conteneurs pleins en rangee haute sur le pont ?\n(Repondre : monte ou descend)"},
      {id:"q3",q:"Quel est le GM minimum impose par l'IMO IS Code 2008 ?\n(Repondre en metres)"},
      {id:"q4",q:"Qu'est-ce que l'effet de surface libre et comment le reduire ?\n(Repondre en 1 phrase)"},
      {id:"q5",q:"L'angle de chavirement doit etre au minimum de combien de degres apres le max GZ selon l'IMO ?\n(Repondre en chiffre)"},
    ],
    en:[
      {id:"q1",q:"A vessel has KG = 7.2 m and KM = 8.5 m.\nCalculate GM. Is the vessel stable?"},
      {id:"q2",q:"What happens to GM when full containers are loaded in the top deck row?\n(Answer: rises or falls)"},
      {id:"q3",q:"What is the minimum GM imposed by IMO IS Code 2008?\n(Answer in metres)"},
      {id:"q4",q:"What is the free surface effect and how to reduce it?\n(Answer in 1 sentence)"},
      {id:"q5",q:"The angle of vanishing stability must be at least how many degrees past GZ max per IMO?\n(Answer in number)"},
    ],
    es:[
      {id:"q1",q:"Un buque tiene KG = 7,2 m y KM = 8,5 m.\nCalcule GM. ?El buque es estable?"},
      {id:"q2",q:"?Que ocurre con el GM al cargar contenedores llenos en la fila alta de cubierta?\n(Responder: sube o baja)"},
      {id:"q3",q:"?Cual es el GM minimo impuesto por el IS Code IMO 2008?\n(Responder en metros)"},
      {id:"q4",q:"?Que es el efecto de superficie libre y como reducirlo?\n(Responder en 1 frase)"},
      {id:"q5",q:"?El angulo de zozobra debe ser al menos cuantos grados despues del max GZ segun la OMI?\n(Responder en numero)"},
    ],
    pt:[
      {id:"q1",q:"Um navio tem KG = 7,2 m e KM = 8,5 m.\nCalcule GM. O navio e estavel?"},
      {id:"q2",q:"O que acontece ao GM ao carregar contentores cheios na fila alta do convés?\n(Responder: sobe ou desce)"},
      {id:"q3",q:"Qual e o GM minimo imposto pelo IS Code IMO 2008?\n(Responder em metros)"},
      {id:"q4",q:"O que e o efeito de superficie livre e como reduzi-lo?\n(Responder em 1 frase)"},
      {id:"q5",q:"O angulo de tombamento deve ser de pelo menos quantos graus apos o max GZ segundo a IMO?\n(Responder em numero)"},
    ],
  };

  const chk=(id,val)=>{
    const v=val.trim().toLowerCase().replace(/[\s,\.]/g,"");
    if(id==="q1") return v.includes("13")||v.includes("1.3")||v.includes("stab")||v.includes("oui")||v.includes("yes")||v.includes("si")||v.includes("sim");
    if(id==="q2") return v.includes("descend")||v.includes("falls")||v.includes("baja")||v.includes("desce")||v.includes("reduit")||v.includes("diminue");
    if(id==="q3") return v.includes("015")||v.includes("0.15")||v.includes("015m");
    if(id==="q4") return v.includes("liquide")||v.includes("liquid")||v.includes("citerne")||v.includes("tank")||v.includes("tanque")||v.includes("remplir")||v.includes("fill");
    if(id==="q5") return v==="25"||v.includes("25");
    return false;
  };

  const corrKey={
    fr:{q1:"GM = 1,3 m — Stable (G sous M)",q2:"GM diminue (G monte)",q3:"0,15 m",q4:"Liquide dans citerne partielle -> G virtuel monte. Solution : remplir/vider completement",q5:"25 degres"},
    en:{q1:"GM = 1.3 m — Stable (G below M)",q2:"GM falls (G rises)",q3:"0.15 m",q4:"Liquid in part-full tank -> virtual G rises. Solution: fill/empty completely",q5:"25 degrees"},
    es:{q1:"GM = 1,3 m — Estable (G bajo M)",q2:"GM baja (G sube)",q3:"0,15 m",q4:"Liquido en tanque parcial -> G virtual sube. Solucion: llenar/vaciar completamente",q5:"25 grados"},
    pt:{q1:"GM = 1,3 m — Estavel (G abaixo de M)",q2:"GM desce (G sobe)",q3:"0,15 m",q4:"Liquido em tanque parcial -> G virtual sobe. Solucao: encher/esvaziar completamente",q5:"25 graus"},
  };

  const expl={
    fr:"OK Q1: GM = KM - KG = 8,5 - 7,2 = 1,3 m. GM positif = G sous M = navire STABLE. Valeur correcte (ni trop raide > 2m, ni trop mou < 0,15m).\nOK Q2: Charger en hauteur eleve G -> GM = KM - KG diminue -> navire devient plus mou ou instable.\nOK Q3: IMO IS Code 2008 : GM minimum = 0,15 m dans toutes les conditions de chargement.\nOK Q4: Liquide partiel dans citerne se deplace a la gite -> G virtuel monte de GG' = i x densL / D. Reduire : remplir ou vider completement les citernes.\nOK Q5: IMO IS Code 2008 : angle de chavirement >= 25 degres apres le maximum GZ.",
    en:"OK Q1: GM = KM - KG = 8.5 - 7.2 = 1.3 m. Positive GM = G below M = STABLE vessel. Acceptable value (not too stiff > 2m, not too tender < 0.15m).\nOK Q2: Loading high raises G -> GM = KM - KG falls -> vessel becomes more tender or unstable.\nOK Q3: IMO IS Code 2008: minimum GM = 0.15 m in all loading conditions.\nOK Q4: Liquid in part-full tank shifts when heeling -> virtual G rises by GG' = i x densL / D. Reduce: fill or empty tanks completely.\nOK Q5: IMO IS Code 2008: angle of vanishing stability >= 25 degrees past GZ maximum.",
    es:"OK Q1: GM = KM - KG = 8,5 - 7,2 = 1,3 m. GM positivo = G bajo M = buque ESTABLE. Valor correcto (ni muy rigido > 2m, ni muy blando < 0,15m).\nOK Q2: Cargar en altura eleva G -> GM = KM - KG disminuye -> buque se vuelve blando o inestable.\nOK Q3: IS Code OMI 2008: GM minimo = 0,15 m en todas las condiciones de carga.\nOK Q4: Liquido parcial en tanque se desplaza al escorar -> G virtual sube GG' = i x densL / D. Reducir: llenar o vaciar completamente los tanques.\nOK Q5: IS Code OMI 2008: angulo de zozobra >= 25 grados tras el maximo GZ.",
    pt:"OK Q1: GM = KM - KG = 8,5 - 7,2 = 1,3 m. GM positivo = G abaixo de M = navio ESTAVEL. Valor correto (nem muito rigido > 2m, nem muito mole < 0,15m).\nOK Q2: Carregar em altura eleva G -> GM = KM - KG desce -> navio fica mais mole ou instavel.\nOK Q3: IS Code IMO 2008: GM minimo = 0,15 m em todas as condicoes de carga.\nOK Q4: Liquido parcial em tanque desloca-se ao adornar -> G virtual sobe GG' = i x densL / D. Reduzir: encher ou esvaziar completamente os tanques.\nOK Q5: IS Code IMO 2008: angulo de tombamento >= 25 graus apos o maximo GZ.",
  };

  const list=qs[lang]||qs.fr;
  const ck=corrKey[lang]||corrKey.fr;

  return (
    <div>
      <div style={{padding:"10px 14px",borderRadius:13,marginBottom:14,
        background:`${C.meta}08`,border:`1px solid ${C.meta}33`,
        fontSize:11,color:C.meta,lineHeight:1.7,fontFamily:"Courier New"}}>
        {lbl("Rappels: GM = KM-KG | GM min IMO = 0,15m | Chargement haut -> G monte | Surface libre -> G virtuel monte | Angle chavirement >= 25 apres max",
          "Key: GM = KM-KG | IMO min GM = 0.15m | High loading -> G rises | Free surface -> virtual G rises | Vanishing angle >= 25 past max",
          "Clave: GM = KM-KG | GM min OMI = 0,15m | Carga alta -> G sube | Superficie libre -> G virtual sube | Angulo zozobra >= 25 tras max",
          "Chave: GM = KM-KG | GM min IMO = 0,15m | Carga alta -> G sobe | Superficie livre -> G virtual sobe | Angulo tombamento >= 25 apos max")}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:14}}>
          <div style={{fontSize:12,color:C.white,marginBottom:8,lineHeight:1.6,
            whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]}
            onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"12px",borderRadius:12,
              background:"rgba(255,255,255,0.06)",
              border:`1.5px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,
              color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,
              textAlign:"center",boxSizing:"border-box"}}/>
          {showC && (
            <div style={{fontSize:11,marginTop:5,fontWeight:700,
              color:chk(q.id,ans[q.id])?C.green:C.red}}>
              {chk(q.id,ans[q.id])?"✓":`✗ => ${ck[q.id]}`}
            </div>
          )}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)}
        style={{width:"100%",padding:"12px",borderRadius:14,
          border:`1px solid ${C.amber}55`,background:"rgba(255,179,0,0.1)",
          color:C.amber2,fontSize:12,fontWeight:800,cursor:"pointer",marginBottom:8}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
      {showC && (
        <div style={{padding:"14px",borderRadius:14,
          background:"rgba(0,230,118,0.07)",border:`1px solid ${C.green}33`,
          fontSize:11,color:C.white,lineHeight:1.85,whiteSpace:"pre-line"}}>
          {expl[lang]||expl.fr}
        </div>
      )}
    </div>
  );
}

function QuestionBank({ lang, onComplete }) {
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [started,setStarted]=useState(false);
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);

  const qs=[
    {q:lbl("Qu'est-ce que la flottabilite et le principe d'Archimede ?","What is buoyancy and Archimedes' principle?","?Que es la flotabilidad y el principio de Arquimedes?","O que e a flutuabilidade e o principio de Arquimedes?"),
      opts:[lbl("La stabilite du navire","Vessel stability","La estabilidad del buque","A estabilidade do navio"),lbl("Force ascendante = poids du volume d'eau deplace. Navire flotte si poussee = poids total. P = rho x g x V immerse.","Upward force = weight of displaced water volume. Vessel floats if buoyancy = total weight. B = rho x g x V submerged.","Fuerza ascendente = peso del volumen de agua desplazada. El buque flota si empuje = peso total.","Forca ascendente = peso do volume de agua deslocada. O navio flutua se empuxo = peso total."),lbl("Le poids de l'ancre","Anchor weight","El peso del ancla","O peso da ancora"),lbl("La courbe GZ","The GZ curve","La curva GZ","A curva GZ")],
      ans:1,expl:lbl("Principe d'Archimede : toute corps plonge dans un fluide recoit une poussee verticale ascendante egale au poids du volume de fluide deplace. Pour un navire : Poussee (tonnes) = deplacement (tonnes). Le navire flotte car sa forme lui permet de deplaocer un volume d'eau dont le poids est egal au sien.","Archimedes: any body in a fluid receives an upward force equal to the weight of displaced fluid. For a vessel: Buoyancy (tonnes) = displacement (tonnes). The vessel floats because its shape displaces a water volume whose weight equals its own.","Arquimedes: todo cuerpo sumergido recibe una fuerza ascendente igual al peso del volumen de fluido desplazado.","Arquimedes: todo corpo submerso recebe uma forca ascendente igual ao peso do volume de fluido deslocado.")},
    {q:lbl("Quelle est la formule de GM et que signifient K, G et M ?","What is the GM formula and what do K, G and M mean?","?Cual es la formula del GM y que significan K, G y M?","Qual e a formula do GM e o que significam K, G e M?"),
      opts:[lbl("GM = KG x KM","GM = KG x KM","GM = KG x KM","GM = KG x KM"),lbl("GM = KM - KG. K = quille (bas), G = centre de gravite (masses navire), M = metacentre (virtuel, stabilite). GM > 0 = stable.","GM = KM - KG. K = keel (bottom), G = centre of gravity (vessel masses), M = metacentre (virtual, stability). GM > 0 = stable.","GM = KM - KG. K = quilla (fondo), G = centro de gravedad (masas buque), M = metacentro (virtual). GM > 0 = estable.","GM = KM - KG. K = quilha (fundo), G = centro de gravidade (massas navio), M = metacentro (virtual). GM > 0 = estavel."),lbl("GM = KG - KM","GM = KG - KM","GM = KG - KM","GM = KG - KM"),lbl("GM = G / M","GM = G / M","GM = G / M","GM = G / M")],
      ans:1,expl:lbl("GM = KM - KG est la formule fondamentale de la stabilite initiale. K = quille = point de reference. KG = distance de la quille au centre de gravite G (augmente si on charge en hauteur). KM = distance quille au metacentre M (depend de la forme de la coque). Si GM > 0 : G sous M = stable. Si GM < 0 : G au-dessus de M = instable.","GM = KM - KG is the fundamental initial stability formula. K = keel = reference point. KG = keel to G distance (increases if loaded high). KM = keel to metacentre (depends on hull form). GM > 0: G below M = stable. GM < 0: G above M = unstable.","GM = KM - KG es la formula fundamental de la estabilidad inicial. K = quilla = referencia. Si GM > 0: G bajo M = estable.","GM = KM - KG e a formula fundamental da estabilidade inicial. K = quilha = referencia. Se GM > 0: G abaixo de M = estavel.")},
    {q:lbl("Qu'est-ce que le bras de levier GZ ?","What is the righting lever GZ?","?Que es el brazo adrizante GZ?","O que e o braco de endireitamento GZ?"),
      opts:[lbl("Le poids de G","Weight of G","El peso de G","O peso de G"),lbl("Distance horizontale entre G et la verticale de B quand le navire gite. Si GZ > 0 : couple redressant. Si GZ < 0 : couple chavirant. GZ max IMO >= 0,20 m a >= 30.","Horizontal distance between G and vertical through B when heeled. If GZ > 0: righting couple. If GZ < 0: capsizing couple. IMO max GZ >= 0.20 m at >= 30 deg.","Distancia horizontal entre G y la vertical de B al escorar. Si GZ > 0: par adrizante. Si GZ < 0: par zozobrante.","Distancia horizontal entre G e a vertical de B ao adornar. Se GZ > 0: binas de endireitamento. Se GZ < 0: binas de tombamento."),lbl("La profondeur d'immersion","The draught","El calado","O calado"),lbl("La distance KM","The KM distance","La distancia KM","A distancia KM")],
      ans:1,expl:lbl("GZ est le bras du couple redressant (ou chavirant). Plus GZ est grand, plus la force redressante est importante. La courbe GZ en fonction de la gite donne toute l'information de stabilite : GM initial (pente a l'origine), GZ maximum, angle de chavirement. IMO exige GZ max >= 0,20 m a un angle >= 30 degres.","GZ is the righting (or capsizing) couple arm. Larger GZ = greater righting force. The GZ curve vs heel gives all stability info: initial GM (slope at origin), max GZ, angle of vanishing stability. IMO requires max GZ >= 0.20 m at angle >= 30 deg.","GZ es el brazo del par adrizante (o zozobrante). La curva GZ da toda la informacion de estabilidad. OMI exige GZ max >= 0,20 m a un angulo >= 30 grados.","GZ e o braco das binas de endireitamento (ou tombamento). A curva GZ da toda a informacao de estabilidade. IMO exige GZ max >= 0,20 m a angulo >= 30 graus.")},
    {q:lbl("Quels sont les criteres minimaux IMO IS Code 2008 pour la stabilite initiale ?","What are the IMO IS Code 2008 minimum criteria for initial stability?","?Cuales son los criterios minimos del IS Code OMI 2008 para la estabilidad inicial?","Quais sao os criterios minimos do IS Code IMO 2008 para a estabilidade inicial?"),
      opts:[lbl("GM >= 1 m uniquement","GM >= 1 m only","Solo GM >= 1 m","Apenas GM >= 1 m"),lbl("GM >= 0,15 m, GZ max >= 0,20 m a >= 30 deg, angle chavirement >= 25 apres max, aires 0-30 >= 0,055 / 0-40 >= 0,090 / 30-40 >= 0,030 m.rad","GM >= 0.15 m, max GZ >= 0.20 m at >= 30 deg, vanishing angle >= 25 past max, areas 0-30 >= 0.055 / 0-40 >= 0.090 / 30-40 >= 0.030 m.rad","GM >= 0,15 m, GZ max >= 0,20 m a >= 30 deg, angulo zozobra >= 25 tras max, areas 0-30 >= 0,055 / 0-40 >= 0,090 m.rad","GM >= 0,15 m, GZ max >= 0,20 m a >= 30 graus, angulo tombamento >= 25 apos max, areas 0-30 >= 0,055 / 0-40 >= 0,090 m.rad"),lbl("GZ max >= 0,50 m uniquement","Max GZ >= 0.50 m only","Solo GZ max >= 0,50 m","Apenas GZ max >= 0,50 m"),lbl("GM >= 0,50 m et GZ >= 0,30 m","GM >= 0.50 m and GZ >= 0.30 m","GM >= 0,50 m y GZ >= 0,30 m","GM >= 0,50 m e GZ >= 0,30 m")],
      ans:1,expl:lbl("IS Code IMO 2008 (MSC.267(85)) : (1) GM initial >= 0,15 m. (2) GZ max >= 0,20 m a angle >= 30. (3) Angle de chavirement >= 25 apres le max GZ. (4) Aire 0-30 >= 0,055 m.rad. (5) Aire 0-40 >= 0,090 m.rad. (6) Aire 30-40 >= 0,030 m.rad. Tous ces criteres doivent etre satisfaits dans toutes les conditions de chargement prevues.","IS Code IMO 2008 (MSC.267(85)): (1) Initial GM >= 0.15 m. (2) Max GZ >= 0.20 m at >= 30 deg. (3) Vanishing angle >= 25 past GZ max. (4) Area 0-30 >= 0.055 m.rad. (5) Area 0-40 >= 0.090 m.rad. (6) Area 30-40 >= 0.030 m.rad. All criteria must be met in all planned loading conditions.","IS Code OMI 2008: (1) GM >= 0,15 m. (2) GZ max >= 0,20 m a >= 30. (3) Angulo zozobra >= 25 tras max. (4) Areas 0-30 >= 0,055 / 0-40 >= 0,090 / 30-40 >= 0,030 m.rad.","IS Code IMO 2008: (1) GM >= 0,15 m. (2) GZ max >= 0,20 m a >= 30. (3) Angulo tombamento >= 25 apos max. (4) Areas 0-30 >= 0,055 / 0-40 >= 0,090 / 30-40 >= 0,030 m.rad.")},
    {q:lbl("Comment l'effet de surface libre se calcule-t-il ?","How is the free surface effect calculated?","?Como se calcula el efecto de superficie libre?","Como se calcula o efeito de superficie livre?"),
      opts:[lbl("GG' = i x densite liquide / Deplacement navire (tonnes)","GG' = i x liquid density / Vessel displacement (tonnes)","GG' = i x densidad liquido / Desplazamiento buque (toneladas)","GG' = i x densidade liquido / Deslocamento navio (toneladas)"),lbl("GG' = GM x sin(gite)","GG' = GM x sin(heel)","GG' = GM x seno(escora)","GG' = GM x seno(banda)"),lbl("GG' = KM - KG","GG' = KM - KG","GG' = KM - KG","GG' = KM - KG"),lbl("GG' = longueur x largeur citerne","GG' = tank length x width","GG' = longitud x anchura tanque","GG' = comprimento x largura tanque")],
      ans:0,expl:lbl("Correction surface libre : GG' = (i x gamma_liquide) / Delta, ou i = moment d'inertie de la surface libre (l x b^3 / 12 pour un rectangle en m4), gamma_liquide = densite du liquide (eau = 1,025, gasoil = 0,85, etc.), Delta = deplacement total du navire en tonnes. GM corrige = GM initial - GG'. Diviser une citerne de largeur b en deux (largeur b/2 chacune) reduit i par 4, donc GG' par 4.","Free surface correction: GG' = (i x gamma_liquid) / Delta, where i = free surface moment of inertia (l x b^3 / 12 for rectangle in m4), gamma_liquid = liquid density (seawater = 1.025, diesel = 0.85 etc.), Delta = total vessel displacement in tonnes. Corrected GM = initial GM - GG'. Dividing a tank of width b into two (each width b/2) reduces i by 4, thus GG' by 4.","Correccion superficie libre: GG' = (i x gamma_liquido) / Desplazamiento. Dividir tanque de anchura b en dos reduce i por 4, GG' por 4.","Correcao superficie livre: GG' = (i x gamma_liquido) / Deslocamento. Dividir tanque de largura b em dois reduz i por 4, GG' por 4.")},
    {q:lbl("Quelle est la difference entre un navire 'raide' et un navire 'mou' ?","What is the difference between a 'stiff' and a 'tender' vessel?","?Cual es la diferencia entre un buque 'rigido' y un buque 'blando'?","Qual e a diferenca entre um navio 'rigido' e um navio 'mole'?"),
      opts:[lbl("Raide = plus lourd","Stiff = heavier","Rigido = mas pesado","Rigido = mais pesado"),lbl("Raide (GM tres positif) = mouvements brusques, inconfort, fatigue structures. Mou (GM faible) = gite lente et longue, risque si evenement supplementaire","Stiff (very positive GM) = sudden movements, discomfort, structural fatigue. Tender (low GM) = slow long roll, risk if additional event","Rigido (GM muy positivo) = movimientos bruscos, incomodidad, fatiga estructuras. Blando (GM bajo) = escora lenta y prolongada, riesgo si evento adicional","Rigido (GM muito positivo) = movimentos bruscos, desconforto, fadiga estruturas. Mole (GM baixo) = banda lenta e prolongada, risco se evento adicional"),lbl("Raide = instable","Stiff = unstable","Rigido = inestable","Rigido = instavel"),lbl("Il n'y a pas de difference pratique","No practical difference","No hay diferencia practica","Nao ha diferenca pratica")],
      ans:1,expl:lbl("Navire raide (GM > 2m) : se redresse tres vite avec des mouvements secs et violents. Risques : inconfort equipage, fatigue acceleree des structures et amarrages, deplacements de cargaison, acces dangereux. Navire mou (0 < GM < 0,2m) : gite lente et prend du temps a se redresser. Risques : si un evenement supplementaire (vague de travers, depl. cargaison, envahissement) survient pendant la gite, le navire peut ne pas se redresser. L'ideal : GM autour de 0,5 - 1,5m.","Stiff vessel (GM > 2m): rights itself very fast with violent movements. Risks: crew discomfort, accelerated structural fatigue, cargo shifts, dangerous access. Tender vessel (0 < GM < 0.2m): heels slowly and takes time to right. Risks: if additional event (beam sea, cargo shift, flooding) occurs during the heel, vessel may not right itself. Ideal: GM around 0.5 - 1.5m.","Rigido (GM > 2m): se adiza muy rapido con movimientos violentos. Riesgos: incomodidad tripulacion, fatiga estructuras, desplazamiento carga. Blando (GM bajo): escora lenta. Si evento adicional, puede no adrizar. Ideal: GM alrededor de 0,5 - 1,5m.","Rigido (GM > 2m): endireita-se muito rapido com movimentos violentos. Mole (GM baixo): banda lenta. Se evento adicional, pode nao endireitar. Ideal: GM cerca de 0,5 - 1,5m.")},
    {q:lbl("Qu'est-ce que le franc-bord et pourquoi est-il lie a la stabilite ?","What is freeboard and why is it linked to stability?","?Que es el francobordo y por que esta relacionado con la estabilidad?","O que e o bordo livre e por que esta ligado a estabilidade?"),
      opts:[lbl("La hauteur des mats","Mast height","La altura de los mastiles","A altura dos mastros"),lbl("Distance waterline - pont principal. Determine la reserve de flottabilite. Grand franc-bord = angle de chavirement eleve. Plimsoll fixe le minimum legal par zone.","Waterline to main deck distance. Determines reserve buoyancy. Large freeboard = high vanishing angle. Plimsoll fixes legal minimum by zone.","Distancia linea de flotacion - cubierta principal. Determina la reserva de flotabilidad. Gran francobordo = angulo de zozobra alto. Plimsoll fija el minimo legal por zona.","Distancia linha de agua - convés principal. Determina a reserva de flutuabilidade. Grande bordo livre = angulo de tombamento alto. Plimsoll fixa o minimo legal por zona."),lbl("La couleur de la coque","Hull color","El color del casco","A cor do casco"),lbl("La distance entre les ponts","Distance between decks","La distancia entre cubiertas","A distancia entre conveses")],
      ans:1,expl:lbl("Le franc-bord est la distance entre la ligne de flottaison et le pont de franc-bord (pont etanche). Il determine la RESERVE DE FLOTTABILITE — plus il est grand, plus le navire peut giter avant que l'eau embarque sur le pont, augmentant l'angle de chavirement. La ligne de charge Plimsoll fixe le franc-bord minimum legal selon la zone (Tropical, Estival, Hivernal, WNA) et la densite de l'eau (eau douce FW). Un franc-bord trop faible = angle de chavirement reduit = danger.","Freeboard is the distance between the waterline and the freeboard deck (weathertight deck). It determines RESERVE OF BUOYANCY — greater freeboard means the vessel can heel more before water comes on deck, increasing the vanishing angle. The Plimsoll load line fixes minimum legal freeboard by zone (Tropical, Summer, Winter, WNA) and water density (fresh water FW). Too little freeboard = reduced vanishing angle = danger.","El francobordo determina la RESERVA DE FLOTABILIDAD. La linea de carga Plimsoll fija el minimo legal por zona. Francobordo insuficiente = angulo de zozobra reducido = peligro.","O bordo livre determina a RESERVA DE FLUTUABILIDADE. A linha de carga Plimsoll fixa o minimo legal por zona. Bordo livre insuficiente = angulo de tombamento reduzido = perigo.")},
    {q:lbl("Qu'est-ce que l'experience de stabilite (inclining experiment) ?","What is the inclining experiment?","?Que es la experiencia de estabilidad (inclining experiment)?","O que e a experiencia de estabilidade (inclining experiment)?"),
      opts:[lbl("Un test de vitesse","A speed test","Una prueba de velocidad","Um teste de velocidade"),lbl("Essai pour determiner experimentalement KG et GM. Masse p deplacee distance d -> mesure gite theta -> GM = (p x d) / (Delta x tan theta). Obligatoire a la construction.","Test to experimentally determine KG and GM. Mass p shifted distance d -> measured heel theta -> GM = (p x d) / (Delta x tan theta). Mandatory at construction.","Ensayo para determinar experimentalmente KG y GM. Masa p desplazada distancia d -> GM = (p x d) / (Desplazamiento x tan theta). Obligatorio en la construccion.","Ensaio para determinar experimentalmente KG e GM. Massa p deslocada distancia d -> GM = (p x d) / (Deslocamento x tan theta). Obrigatorio na construcao."),lbl("Un test de ballast","A ballast test","Una prueba de lastre","Um teste de lastro"),lbl("Un exercice d'urgence","An emergency drill","Un ejercicio de emergencia","Um exercicio de emergencia")],
      ans:1,expl:lbl("L'experience de stabilite (inclining experiment) est un essai obligatoire realise a la construction et apres modifications majeures du navire. Methode : deplacer une masse connue p d'une distance transversale d connue. Mesurer l'angle de gite theta resultant. Calculer : GM = (p x d) / (Delta x tan theta). Puis KG = KM - GM. Donne les parametres de base pour le calcul de stabilite dans toutes les conditions de chargement.","The inclining experiment is a mandatory test performed at vessel construction and after major modifications. Method: move known mass p a known transverse distance d. Measure resulting heel angle theta. Calculate: GM = (p x d) / (Delta x tan theta). Then KG = KM - GM. Gives base parameters for stability calculations in all loading conditions.","La experiencia de estabilidad es obligatoria en la construccion y tras modificaciones mayores. Metodo: desplazar masa p distancia d -> medir escora theta -> GM = (p x d) / (Desplazamiento x tan theta).","A experiencia de estabilidade e obrigatoria na construcao e apos modificacoes maiores. Metodo: deslocar massa p distancia d -> medir banda theta -> GM = (p x d) / (Deslocamento x tan theta).")},
    {q:lbl("Quelle est la difference entre stabilite initiale et stabilite a grande inclinaison ?","What is the difference between initial stability and large-angle stability?","?Cual es la diferencia entre estabilidad inicial y estabilidad a gran inclinacion?","Qual e a diferenca entre estabilidade inicial e estabilidade a grande inclinacao?"),
      opts:[lbl("Pas de difference","No difference","Sin diferencia","Sem diferenca"),lbl("Initiale (< 10-15 deg) : caracterisee par GM seul, GZ = GM x sin theta. Grande inclinaison (> 15 deg) : il faut la courbe GZ complete, le metacentre se deplace, la forme de la coque joue un role majeur.","Initial (< 10-15 deg): characterised by GM alone, GZ = GM x sin theta. Large angle (> 15 deg): full GZ curve needed, metacentre moves, hull form plays major role.","Inicial (< 10-15 deg): caracterizada por GM solo, GZ = GM x sin theta. Gran inclinacion (> 15 deg): se necesita curva GZ completa, el metacentro se desplaza.","Inicial (< 10-15 graus): caracterizada por GM so, GZ = GM x sin theta. Grande inclinacao (> 15 graus): precisa curva GZ completa, o metacentro deslocas-se."),lbl("Grande inclinaison = quand le GM est eleve","Large angle = when GM is high","Gran inclinacion = cuando GM es alto","Grande inclinacao = quando GM e alto"),lbl("La stabilite initiale est plus importante","Initial stability is more important","La estabilidad inicial es mas importante","A estabilidade inicial e mais importante")],
      ans:1,expl:lbl("Stabilite initiale (angles < 10-15 deg) : entierement decrite par GM. A ces angles, GZ = GM x sin theta. Le metacentre M reste fixe. Stabilite a grande inclinaison : le metacentre se deplace car la forme du volume immerse change de facon non lineaire. Il faut la courbe GZ complete. La forme de la coque (accastillage, etrave, tableau arriere) joue un role majeur. Un navire peut avoir un bon GM initial mais chavirer a 35 deg si la courbe GZ diminue trop vite.","Initial stability (< 10-15 deg): fully described by GM. At these angles GZ = GM x sin theta. Metacentre M stays fixed. Large-angle stability: metacentre moves as submerged volume shape changes non-linearly. Full GZ curve needed. Hull form (superstructure, bow, stern) plays major role. A vessel can have good initial GM but capsize at 35 deg if GZ curve falls too quickly.","Estabilidad inicial (< 10-15 deg): descrita por GM. A grandes inclinaciones, el metacentro se desplaza y se necesita la curva GZ completa. Un buque puede tener buen GM inicial y zozobrar a 35 grados.","Estabilidade inicial (< 10-15 graus): descrita por GM. A grandes inclinacoes, o metacentro desloca-se e precisa-se da curva GZ completa. Um navio pode ter bom GM inicial e tombar a 35 graus.")},
    {q:lbl("Qu'est-ce que le ballast et quel est son role dans la stabilite ?","What is ballast and its role in stability?","?Que es el lastre y cual es su papel en la estabilidad?","O que e o lastro e qual o seu papel na estabilidade?"),
      opts:[lbl("La cargaison payante","Paying cargo","La carga de pago","A carga pagante"),lbl("Eau de mer pompee dans des citernes deidiees pour ajuster le tirant d'eau, l'assiette et la stabilite. Remplir citernes basses -> abaisse G -> augmente GM. MARPOL encadre les eaux de ballast (especes invasives).","Seawater pumped into dedicated tanks to adjust draught, trim and stability. Fill low tanks -> lowers G -> increases GM. MARPOL regulates ballast water (invasive species).","Agua de mar bombeada a tanques dedicados para ajustar el calado, la asiento y la estabilidad. Llenar tanques bajos -> baja G -> aumenta GM. MARPOL regula las aguas de lastre.","Agua do mar bombeada para tanques dedicados para ajustar o calado, o assentamento e a estabilidade. Encher tanques baixos -> baixa G -> aumenta GM. MARPOL regula as aguas de lastro."),lbl("Le carburant","The fuel","El combustible","O combustivel"),lbl("L'eau de lavage des ponts","Deck wash water","El agua de lavado de cubiertas","A agua de lavagem dos conveses")],
      ans:1,expl:lbl("Le ballast est de l'eau de mer pompee dans des citernes dediees quand le navire est en lest (sans cargaison) ou quand la stabilite doit etre amelioree. Remplir les citernes de ballast basses abaisse le centre de gravite G -> augmente GM -> ameliore la stabilite. Attention : MARPOL Annexe V et Convention de ballast IMO 2004 : les eaux de ballast doivent etre traitees avant rejet pour eviter l'introduction d'especes invasives.","Ballast is seawater pumped into dedicated tanks when vessel is in ballast (no cargo) or when stability needs improving. Filling low ballast tanks lowers G -> increases GM -> improves stability. Note: MARPOL Annex V and IMO Ballast Water Convention 2004: ballast water must be treated before discharge to prevent invasive species introduction.","El lastre es agua de mar bombeada a tanques dedicados para mejorar la estabilidad. Llenar tanques bajos -> baja G -> aumenta GM. MARPOL regula las aguas de lastre (especies invasoras).","O lastro e agua do mar bombeada para tanques dedicados para melhorar a estabilidade. Encher tanques baixos -> baixa G -> aumenta GM. MARPOL regula as aguas de lastro (especies invasoras)")},
    {q:lbl("Qu'est-ce que l'assiette (trim) et comment affecte-t-elle la stabilite ?","What is trim and how does it affect stability?","?Que es el asiento y como afecta a la estabilidad?","O que e o assentamento e como afeta a estabilidade?"),
      opts:[lbl("La vitesse du navire","Vessel speed","La velocidad del buque","A velocidade do navio"),lbl("Difference tirant eau AR - tirant eau AV. Assiette positive (poupe enfoncee) = normale et favorable propulsion. Assiette excessive modifie KM et peut reduire la stabilite. Toujours respecter les limites du plan de chargement.","Aft draught minus forward draught. Positive trim (stern deeper) = normal and good for propulsion. Excessive trim changes KM and can reduce stability. Always stay within loading plan limits.","Calado popa - calado proa. Asiento positivo (popa mas hundida) = normal y favorece la propulsion. Asiento excesivo cambia KM y puede reducir la estabilidad.","Calado popa - calado proa. Assentamento positivo (popa mais funda) = normal e favorece a propulsao. Assentamento excessivo altera KM e pode reduzir a estabilidade."),lbl("La hauteur de la cargaison","Cargo height","La altura de la carga","A altura da carga"),lbl("Le poids total du navire","Total vessel weight","El peso total del buque","O peso total do navio")],
      ans:1,expl:lbl("L'assiette (trim) = tirant d'eau arriere - tirant d'eau avant. Une assiette positive (poupe plus enfoncee) est normale et ameliore l'efficacite de l'helice et du gouvernail. Une assiette excessive modifie la forme du volume immerse, ce qui deplace KM et peut affecter GM. Des assiettes trop importantes peuvent aussi reduire l'angle de chavirement. Toujours respecter les limites d'assiette prescrites dans le plan de chargement/stability booklet.","Trim = aft draught - forward draught. Positive trim (stern deeper) is normal and improves propeller and rudder efficiency. Excessive trim changes submerged volume shape, moving KM and potentially affecting GM. Large trims can also reduce vanishing angle. Always respect trim limits prescribed in loading plan/stability booklet.","El asiento = calado popa - calado proa. Asiento positivo es normal y mejora la eficiencia del helice y timon. Asiento excesivo puede reducir el angulo de zozobra. Respetar siempre los limites del plan de carga.","O assentamento = calado popa - calado proa. Assentamento positivo e normal e melhora a eficiencia da helice e do leme. Assentamento excessivo pode reduzir o angulo de tombamento. Respeitar sempre os limites do plano de carga.")},
    {q:lbl("Qu'est-ce que la stabilite dynamique et comment se mesure-t-elle ?","What is dynamical stability and how is it measured?","?Que es la estabilidad dinamica y como se mide?","O que e a estabilidade dinamica e como se mede?"),
      opts:[lbl("Le GM au moment du lancement","GM at launch","El GM en el momento de la botadura","O GM no momento do lancamento"),lbl("Energie totale de redressement = aire sous la courbe GZ de 0 a l'angle de chavirement (m.rad). Represente la capacite a resister aux perturbations dynamiques (vagues, rafales). Plus l'aire est grande, plus le navire est sur.","Total righting energy = area under GZ curve from 0 to vanishing angle (m.rad). Represents capacity to resist dynamic disturbances (waves, gusts). Larger area = safer vessel.","Energia total de adrizamiento = area bajo curva GZ de 0 al angulo de zozobra (m.rad). Representa la capacidad de resistir perturbaciones dinamicas.","Energia total de endireitamento = area sob curva GZ de 0 ao angulo de tombamento (m.rad). Representa a capacidade de resistir perturbacoes dinamicas."),lbl("La vitesse de rotation du navire","Vessel rotation speed","La velocidad de rotacion del buque","A velocidade de rotacao do navio"),lbl("La hauteur de la vague","Wave height","La altura de la ola","A altura da onda")],
      ans:1,expl:lbl("La stabilite dynamique est l'energie totale disponible pour le redressement. Elle est egale a l'aire sous la courbe GZ entre 0 et l'angle de chavirement (en m.rad). Cette energie represente le travail que le navire peut faire contre les forces destabilisantes (vagues de travers, rafales de vent). IMO IS Code specifie des aires minimales : 0-30 >= 0,055 m.rad, 0-40 >= 0,090 m.rad, 30-40 >= 0,030 m.rad. Un navire avec une grande aire sous la courbe GZ resiste mieux aux conditions meteorologiques severes.","Dynamical stability is the total available righting energy, equal to the area under the GZ curve from 0 to the vanishing angle (m.rad). This energy represents the work the vessel can do against destabilising forces (beam seas, wind gusts). IMO IS Code specifies minimum areas: 0-30 >= 0.055 m.rad, 0-40 >= 0.090 m.rad, 30-40 >= 0.030 m.rad. A vessel with large GZ curve area resists severe weather better.","La estabilidad dinamica es la energia total disponible para el adrizamiento = area bajo la curva GZ. IMO: areas 0-30 >= 0,055 / 0-40 >= 0,090 / 30-40 >= 0,030 m.rad.","A estabilidade dinamica e a energia total disponivel para o endireitamento = area sob a curva GZ. IMO: areas 0-30 >= 0,055 / 0-40 >= 0,090 / 30-40 >= 0,030 m.rad.")},
    {q:lbl("Comment les cloisons longitudinales dans les citernes reduisent-elles l'effet de surface libre ?","How do longitudinal tank divisions reduce the free surface effect?","?Como reducen los mamparos longitudinales el efecto de superficie libre?","Como as anteparas longitudinais reduzem o efeito de superficie livre?"),
      opts:[lbl("Elles augmentent le volume des citernes","They increase tank volume","Aumentan el volumen de los tanques","Aumentam o volume dos tanques"),lbl("Diviser citerne largeur b en 2 x (b/2) : moment d'inertie i passe de l b^3/12 a 2 x l(b/2)^3/12 = l b^3/48. Resultat : i divise par 4 -> GG' divise par 4.","Divide tank width b into 2 x (b/2): inertia i goes from l b^3/12 to 2 x l(b/2)^3/12 = l b^3/48. Result: i divided by 4 -> GG' divided by 4.","Dividir tanque anchura b en 2 x (b/2): momento de inercia i pasa de l b^3/12 a l b^3/48. Resultado: i dividido entre 4 -> GG' dividido entre 4.","Dividir tanque largura b em 2 x (b/2): momento de inercia i passa de l b^3/12 a l b^3/48. Resultado: i dividido por 4 -> GG' dividido por 4."),lbl("Elles reduisent le poids du liquide","They reduce liquid weight","Reducen el peso del liquido","Reduzem o peso do liquido"),lbl("Elles augmentent KM","They increase KM","Aumentan el KM","Aumentam o KM")],
      ans:1,expl:lbl("La formule cle : pour une citerne rectangulaire, moment d'inertie i = (longueur x largeur^3) / 12. L'effet de surface libre GG' est proportionnel a i. En ajoutant une cloison longitudinale centrale qui divise la largeur b par 2 : nouvelle i totale = 2 x (l x (b/2)^3) / 12 = l x b^3 / 48. Soit 4 fois moins que la citerne originale (l x b^3 / 12). Donc GG' est divise par 4. C'est pourquoi les navires petroliers et chimiquiers ont des citernes etroites multiples.","Key formula: for a rectangular tank, moment of inertia i = (length x width^3) / 12. Free surface effect GG' is proportional to i. Adding a central longitudinal partition dividing width b by 2: new total i = 2 x (l x (b/2)^3) / 12 = l x b^3 / 48. Four times less than original tank (l x b^3 / 12). So GG' is divided by 4. This is why tankers and chemical carriers have multiple narrow tanks.","Formula clave: i = (longitud x anchura^3) / 12. Dividir anchura b en 2: nueva i total = l x b^3 / 48. Cuatro veces menos. Por eso los petroleros tienen tanques multiples estrechos.","Formula chave: i = (comprimento x largura^3) / 12. Dividir largura b em 2: nova i total = l x b^3 / 48. Quatro vezes menos. Por isso os petroleiros tem tanques multiplos estreitos.")},
    {q:lbl("Qu'est-ce que l'angle de chavirement (vanishing stability) et quel est le critere IMO ?","What is the angle of vanishing stability and what is the IMO criterion?","?Que es el angulo de zozobra y cual es el criterio de la OMI?","O que e o angulo de tombamento e qual e o criterio da IMO?"),
      opts:[lbl("L'angle maximal autorise de navigation","Maximum allowed navigation angle","El angulo maximo autorizado de navegacion","O angulo maximo autorizado de navegacao"),lbl("Angle au-dela duquel GZ redevient nul et le navire ne peut plus se redresser. IMO IS Code : angle >= 25 degres apres le maximum de GZ. Angle de chavirement faible (< 40 deg) = navire dangereusement instable.","Angle beyond which GZ returns to zero and vessel can no longer right itself. IMO IS Code: angle >= 25 degrees past GZ maximum. Low vanishing angle (< 40 deg) = dangerously unstable vessel.","Angulo mas alla del cual GZ vuelve a cero y el buque no puede adrizar. IS Code OMI: angulo >= 25 grados tras el maximo GZ. Angulo de zozobra bajo (< 40 grados) = buque inestable.","Angulo alem do qual GZ volta a zero e o navio nao pode mais endireitar. IS Code IMO: angulo >= 25 graus apos o maximo GZ. Angulo de tombamento baixo (< 40 graus) = navio instavel."),lbl("L'angle de gite permanent","The permanent list angle","El angulo de escora permanente","O angulo de banda permanente"),lbl("L'angle d'assiette maximale","The maximum trim angle","El angulo de asiento maximo","O angulo de assentamento maximo")],
      ans:1,expl:lbl("L'angle de chavirement (vanishing stability angle) est l'angle de gite auquel GZ redevient nul apres son maximum positif. Au-dela, le navire ne peut plus se redresser seul - il chavire. Pour un navire de charge conventionnel, l'IMO IS Code 2008 exige que cet angle soit d'au moins 25 degres apres le maximum de GZ. Un angle de chavirement eleve (> 60-70 deg) indique un navire tres sur, avec une grande reserve de stabilite. La courbe GZ et cet angle sont calcules par le logiciel de stabilite pour chaque condition de chargement.","The angle of vanishing stability is the heel angle at which GZ returns to zero after its positive maximum. Beyond this, the vessel can no longer right itself — it capsizes. For a conventional cargo vessel, IMO IS Code 2008 requires this angle to be at least 25 degrees past the GZ maximum. A high vanishing angle (> 60-70 deg) indicates a very safe vessel with large stability reserve. The GZ curve and this angle are calculated by stability software for each loading condition.","El angulo de zozobra es el angulo al que GZ vuelve a cero. Mas alla, el buque no puede adrizar. IS Code OMI: angulo >= 25 grados tras el maximo GZ. Angulo alto (> 60-70 grados) = buque muy seguro.","O angulo de tombamento e o angulo em que GZ volta a zero. Alem disto, o navio nao pode endireitar. IS Code IMO: angulo >= 25 graus apos o maximo GZ. Angulo alto (> 60-70 graus) = navio muito seguro.")},
  ];

  const [shuffled]=useState(()=>qs.map(q=>shuffleQuestionOptions(q,"ans")));
  const total=qs.length;
  const handleAnswer=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===shuffled[idx].ans)setScore(s=>s+1);};
  const handleNext=()=>{if(idx===total-1){setDone(true);if(onComplete)onComplete();return;}setSel(null);setAnswered(false);setIdx(i=>i+1);};
  const handleRestart=()=>{setIdx(0);setSel(null);setAnswered(false);setScore(0);setDone(false);setStarted(false);};

  if(!started) return (
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:40,marginBottom:12}}>📝</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:C.white,marginBottom:6,letterSpacing:1}}>
        {lbl("Banque Premium","Premium Bank","Banco Premium","Banco Premium")}
      </div>
      <div style={{fontSize:12,color:C.muted,marginBottom:20}}>
        15 {lbl("questions stabilite","stability questions","preguntas estabilidad","questoes estabilidade")}
      </div>
      <button onClick={()=>setStarted(true)}
        style={{padding:"14px 32px",borderRadius:16,background:`linear-gradient(135deg,${C.gold},${C.amber})`,
          border:"none",color:C.bg0,fontSize:14,fontWeight:900,cursor:"pointer",letterSpacing:1,
          boxShadow:`0 0 28px ${C.amber}44`}}>
        {lbl("COMMENCER =>","START =>","EMPEZAR =>","COMECAR =>")}
      </button>
    </div>
  );

  if(done){
    const trophy=getTrophy(score,total);
    const pct=Math.round(score/total*100);
    return (
      <div style={{textAlign:"center",padding:"20px 10px"}}>
        <div style={{fontSize:68,marginBottom:8}}>{trophy.icon}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:21,color:trophy.color,fontWeight:800,marginBottom:4}}>
          {trophy.label[lang]||trophy.label.fr}
        </div>
        <div style={{fontSize:30,fontWeight:800,color:C.white,marginBottom:4}}>{score}/{total}</div>
        <div style={{fontSize:20,color:trophy.color,fontWeight:800,marginBottom:20}}>{pct}%</div>
        <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:6,marginBottom:20,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.gold},${trophy.color})`,borderRadius:6}}/>
        </div>
        <button onClick={handleRestart}
          style={{width:"100%",padding:"13px",borderRadius:14,background:"rgba(201,146,42,0.12)",
            border:`1px solid ${C.gold}55`,color:C.gold2,fontSize:13,fontWeight:800,cursor:"pointer"}}>
          {lbl("Recommencer","Restart","Reiniciar","Recomecar")}
        </button>
      </div>
    );
  }

  const q=shuffled[idx];
  return (
    <div>
      <div style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
          <span style={{fontSize:10,color:C.gold2,fontWeight:800}}>
            {lbl("Question","Question","Pregunta","Pergunta")} {idx+1}/{total}
          </span>
          <span style={{fontSize:10,color:C.amber2,fontWeight:800}}>✓ {score}/{idx}</span>
        </div>
        <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(idx/total)*100}%`,
            background:`linear-gradient(90deg,${C.gold},${C.amber})`,borderRadius:4,transition:"width 0.35s"}}/>
        </div>
      </div>
      <div style={{background:"rgba(6,14,26,0.8)",borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,color:C.white,lineHeight:1.65,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(10,22,40,0.7)",brd=C.border,col=C.white;
        if(answered){
          if(i===q.ans){bg="rgba(0,230,118,0.12)";brd=C.green;col=C.green;}
          else if(i===sel){bg="rgba(255,23,68,0.12)";brd=C.red;col=C.red;}
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"12px 15px",marginBottom:8,borderRadius:13,background:bg,
              border:`1.5px solid ${brd}`,color:col,fontSize:12,textAlign:"left",
              cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:800,marginRight:9,color:C.amber2,fontSize:11}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"13px",borderRadius:13,
          background:`rgba(${sel===q.ans?"0,230,118":"255,23,68"},0.08)`,
          border:`1.5px solid ${sel===q.ans?C.green:C.red}55`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:800,color:sel===q.ans?C.green:C.red,marginBottom:5}}>
            {sel===q.ans
              ?(lbl("✓ Excellente reponse !","✓ Excellent!","✓ Excelente!","✓ Excelente!"))
              :(lbl("✗ Reponse incorrecte","✗ Incorrect","✗ Incorrecta","✗ Incorreta"))}
          </div>
          <div style={{fontSize:11,color:C.steel3,lineHeight:1.7}}>{q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"14px",borderRadius:15,
            background:`linear-gradient(135deg,${C.gold},${C.amber})`,
            border:"none",color:C.bg0,fontSize:13,fontWeight:900,cursor:"pointer",letterSpacing:1}}>
          {idx===total-1
            ?(lbl("VOIR MON SCORE =>","SEE MY SCORE =>","VER PUNTUACION =>","VER PONTUACAO =>"))
            :(lbl("SUIVANT =>","NEXT =>","SIGUIENTE =>","PROXIMO =>"))}
        </button>
      )}
    </div>
  );
}

const QUIZ={
  fr:[
    {q:"Un navire a KG = 7,8 m et KM = 8,3 m. Quelle est la valeur de GM et l'etat de stabilite ?",
      opts:["GM = 0,5 m — Stable mais mou","GM = -0,5 m — Instable","GM = 16,1 m — Stable","GM = 1,3 m — Stable"],
      ans:0,expl:"GM = KM - KG = 8,3 - 7,8 = 0,5 m. GM positif = G sous M = STABLE. Valeur de 0,5 m : navire stable mais relativement mou. IMO minimum = 0,15 m — critere satisfait. Un GM entre 0,5 et 1,5 m est generalement considere comme acceptable pour un navire de charge."},
    {q:"Quel est l'effet d'un chargement en hauteur (pont superieur) sur la stabilite ?",
      opts:["GM augmente car le navire est plus lourd","G monte -> KG augmente -> GM = KM - KG diminue -> navire plus mou ou instable","GM n'est pas affecte par la hauteur de la cargaison","Le franc-bord augmente"],
      ans:1,expl:"Charger en hauteur (pont superieur, conteneurs hauts, superstructures) eleve le centre de gravite G. Comme GM = KM - KG, si KG augmente et KM reste approximativement constant, GM diminue. Le navire devient plus mou (gite plus lente) et peut devenir instable si G depasse M. Solution : augmenter le ballast bas pour abaisser G."},
    {q:"Qu'est-ce que l'effet de surface libre et comment le reduire ?",
      opts:["L'effet des vagues sur la coque","Liquide partiel dans une citerne : G monte virtuellement de GG' = i x dL / D. Reduire : remplir/vider completement ou cloisons longitudinales","L'effet du vent sur la superficie","L'effet de la maree sur la stabilite"],
      ans:1,expl:"L'effet de surface libre : quand une citerne est partiellement remplie, le liquide se deplace lors de la gite, creant un moment destabilisant. Cela revient a une elevation virtuelle de G de GG' = (i x gamma_liquide) / Delta. GM corrige = GM initial - GG'. Pour reduire : (1) remplir ou vider completement les citernes. (2) installer des cloisons longitudinales (divise i et donc GG' par 4 avec une cloison centrale)."},
    {q:"Quel est le GM minimum impose par l'IMO IS Code 2008 ?",
      opts:["0,50 m","0,15 m","1,00 m","0,30 m"],
      ans:1,expl:"IMO IS Code 2008 (MSC.267(85)) exige un GM initial minimum de 0,15 m dans toutes les conditions de chargement prevues. Ce critere doit etre satisfait en tenant compte des corrections de surface libre. D'autres criteres s'ajoutent : GZ max >= 0,20 m a angle >= 30 deg, angle de chavirement >= 25 deg apres max GZ, et des exigences d'aires sous la courbe GZ."},
    {q:"Qu'est-ce que le Herald of Free Enterprise a illustre en matiere de stabilite ?",
      opts:["Les dangers de la surcharge","L'envahissement catastrophique avec portes ouvertes — perte de stabilite en quelques secondes — 193 morts","Les dangers du givrage","L'effet de surface libre en citerne"],
      ans:1,expl:"Le Herald of Free Enterprise (1987) a chavire en 90 secondes a Zeebrugge car les portes de proue etaient ouvertes. L'eau a envahi le pont des vehicules en masse : poids en hauteur + surface libre = instabilite immediate. Le navire a chavire a tribord avec 193 morts. Lecons : verifications systematiques portes etanches avant appareillage, alarmes de position des portes, procedures de securite renforcees (SOLAS VI)."},
  ],
  en:[
    {q:"A vessel has KG = 7.8 m and KM = 8.3 m. What is GM and the stability state?",
      opts:["GM = 0.5 m — Stable but tender","GM = -0.5 m — Unstable","GM = 16.1 m — Stable","GM = 1.3 m — Stable"],
      ans:0,expl:"GM = KM - KG = 8.3 - 7.8 = 0.5 m. Positive GM = G below M = STABLE. Value of 0.5 m: stable but relatively tender. IMO minimum = 0.15 m — criterion satisfied. A GM between 0.5 and 1.5 m is generally considered acceptable for a cargo vessel."},
    {q:"What is the effect of high loading (upper deck) on stability?",
      opts:["GM increases as vessel is heavier","G rises -> KG increases -> GM = KM - KG falls -> vessel more tender or unstable","GM is not affected by cargo height","Freeboard increases"],
      ans:1,expl:"Loading high (upper deck, tall containers, superstructures) raises the centre of gravity G. Since GM = KM - KG, if KG increases and KM stays approximately constant, GM falls. The vessel becomes more tender (slower roll) and can become unstable if G exceeds M. Solution: increase low ballast to lower G."},
    {q:"What is the free surface effect and how to reduce it?",
      opts:["The effect of waves on the hull","Liquid in a part-full tank: G rises virtually by GG' = i x dL / D. Reduce: fill/empty completely or longitudinal divisions","The effect of wind on the surface","The effect of tide on stability"],
      ans:1,expl:"Free surface effect: when a tank is partially filled, liquid shifts when the vessel heels, creating a destabilising moment. Equivalent to a virtual rise in G of GG' = (i x gamma_liquid) / Delta. Corrected GM = initial GM - GG'. To reduce: (1) fill or empty tanks completely. (2) fit longitudinal divisions (divides i and thus GG' by 4 with central division)."},
    {q:"What is the minimum GM required by IMO IS Code 2008?",
      opts:["0.50 m","0.15 m","1.00 m","0.30 m"],
      ans:1,expl:"IMO IS Code 2008 (MSC.267(85)) requires a minimum initial GM of 0.15 m in all planned loading conditions. This criterion must be met accounting for free surface corrections. Additional criteria: max GZ >= 0.20 m at >= 30 deg, vanishing angle >= 25 deg past GZ max, and GZ curve area requirements."},
    {q:"What did the Herald of Free Enterprise illustrate in terms of stability?",
      opts:["Dangers of overloading","Catastrophic flooding with bow doors open — stability loss in seconds — 193 deaths","Dangers of icing","Free surface effect in tanks"],
      ans:1,expl:"The Herald of Free Enterprise (1987) capsized in 90 seconds at Zeebrugge because the bow doors were open. Water flooded the car deck in mass: weight at height + free surface = immediate instability. The vessel capsized to starboard killing 193. Lessons: systematic checks of watertight doors before departure, door position alarms, reinforced safety procedures (SOLAS VI)."},
  ],
  es:[
    {q:"Un buque tiene KG = 7,8 m y KM = 8,3 m. ?Cual es el GM y el estado de estabilidad?",
      opts:["GM = 0,5 m — Estable pero blando","GM = -0,5 m — Inestable","GM = 16,1 m — Estable","GM = 1,3 m — Estable"],
      ans:0,expl:"GM = KM - KG = 8,3 - 7,8 = 0,5 m. GM positivo = G bajo M = ESTABLE. Valor de 0,5 m: estable pero relativamente blando. OMI minimo = 0,15 m — criterio satisfecho. Un GM entre 0,5 y 1,5 m es generalmente aceptable para un buque de carga."},
    {q:"?Cual es el efecto de cargar en altura (cubierta superior) sobre la estabilidad?",
      opts:["GM aumenta porque el buque es mas pesado","G sube -> KG aumenta -> GM = KM - KG disminuye -> buque mas blando o inestable","El GM no se ve afectado por la altura de la carga","El francobordo aumenta"],
      ans:1,expl:"Cargar en altura eleva el centro de gravedad G. Como GM = KM - KG, si KG aumenta y KM permanece constante, GM disminuye. El buque se vuelve mas blando y puede volverse inestable si G supera M. Solucion: aumentar el lastre bajo para bajar G."},
    {q:"?Que es el efecto de superficie libre y como reducirlo?",
      opts:["El efecto de las olas en el casco","Liquido parcial en tanque: G sube virtualmente GG' = i x dL / D. Reducir: llenar/vaciar completamente o mamparos longitudinales","El efecto del viento en la superficie","El efecto de la marea en la estabilidad"],
      ans:1,expl:"Efecto superficie libre: cuando un tanque esta parcialmente lleno, el liquido se desplaza al escorar, creando un momento desestabilizador. Equivale a una elevacion virtual de G de GG' = (i x gamma_liquido) / Desplazamiento. GM corregido = GM inicial - GG'. Para reducir: (1) llenar o vaciar completamente. (2) mamparos longitudinales (divide i y GG' entre 4 con mamparo central)."},
    {q:"?Cual es el GM minimo exigido por el IS Code OMI 2008?",
      opts:["0,50 m","0,15 m","1,00 m","0,30 m"],
      ans:1,expl:"IS Code OMI 2008 (MSC.267(85)) exige un GM inicial minimo de 0,15 m en todas las condiciones de carga previstas. Criterios adicionales: GZ max >= 0,20 m a >= 30 grados, angulo de zozobra >= 25 grados tras max GZ, y requisitos de areas bajo la curva GZ."},
    {q:"?Que ilustro el Herald of Free Enterprise en materia de estabilidad?",
      opts:["Los peligros de la sobrecarga","Inundacion catastrofica con portas de proa abiertas — perdida de estabilidad en segundos — 193 muertos","Los peligros del hielo","El efecto de superficie libre en tanques"],
      ans:1,expl:"El Herald of Free Enterprise (1987) zozobro en 90 segundos en Zeebrugge con las portas de proa abiertas. El agua invadio la cubierta de vehiculos: peso en altura + superficie libre = inestabilidad inmediata. Zozobro con 193 muertos. Lecciones: verificaciones sistematicas puertas estancas antes de zarpar, alarmas de posicion de puertas."},
  ],
  pt:[
    {q:"Um navio tem KG = 7,8 m e KM = 8,3 m. Qual e o GM e o estado de estabilidade?",
      opts:["GM = 0,5 m — Estavel mas mole","GM = -0,5 m — Instavel","GM = 16,1 m — Estavel","GM = 1,3 m — Estavel"],
      ans:0,expl:"GM = KM - KG = 8,3 - 7,8 = 0,5 m. GM positivo = G abaixo de M = ESTAVEL. Valor de 0,5 m: estavel mas relativamente mole. IMO minimo = 0,15 m — criterio satisfeito. Um GM entre 0,5 e 1,5 m e geralmente aceitavel para um navio de carga."},
    {q:"Qual e o efeito de carregar em altura (convés superior) na estabilidade?",
      opts:["GM aumenta porque o navio e mais pesado","G sobe -> KG aumenta -> GM = KM - KG desce -> navio mais mole ou instavel","O GM nao e afetado pela altura da carga","O bordo livre aumenta"],
      ans:1,expl:"Carregar em altura eleva o centro de gravidade G. Como GM = KM - KG, se KG aumenta e KM permanece constante, GM desce. O navio torna-se mais mole e pode tornar-se instavel se G ultrapassar M. Solucao: aumentar o lastro baixo para baixar G."},
    {q:"O que e o efeito de superficie livre e como reduzi-lo?",
      opts:["O efeito das ondas no casco","Liquido parcial em tanque: G sobe virtualmente GG' = i x dL / D. Reduzir: encher/esvaziar completamente ou anteparas longitudinais","O efeito do vento na superficie","O efeito da mare na estabilidade"],
      ans:1,expl:"Efeito superficie livre: quando um tanque esta parcialmente cheio, o liquido desloca-se ao adornar, criando um momento desestabilizador. Equivale a uma elevacao virtual de G de GG' = (i x gamma_liquido) / Deslocamento. GM corrigido = GM inicial - GG'. Para reduzir: (1) encher ou esvaziar completamente. (2) anteparas longitudinais (divide i e GG' por 4 com antepara central)."},
    {q:"Qual e o GM minimo exigido pelo IS Code IMO 2008?",
      opts:["0,50 m","0,15 m","1,00 m","0,30 m"],
      ans:1,expl:"IS Code IMO 2008 (MSC.267(85)) exige um GM inicial minimo de 0,15 m em todas as condicoes de carga previstas. Criterios adicionais: GZ max >= 0,20 m a >= 30 graus, angulo de tombamento >= 25 graus apos max GZ, e requisitos de areas sob a curva GZ."},
    {q:"O que o Herald of Free Enterprise ilustrou em materia de estabilidade?",
      opts:["Os perigos da sobrecarga","Inundacao catastrofica com portas de proa abertas — perda de estabilidade em segundos — 193 mortos","Os perigos do gelo","O efeito de superficie livre em tanques"],
      ans:1,expl:"O Herald of Free Enterprise (1987) tombou em 90 segundos em Zeebrugge com as portas de proa abertas. A agua invadiu o convés de veiculos: peso em altura + superficie livre = instabilidade imediata. Tombou com 193 mortos. Licoes: verificacoes sistematicas de portas estanques antes de zarpar, alarmes de posicao de portas."},
  ],
};

function QuizComp({ questions, t, lang, onComplete }) {
  const [shuffled]=useState(()=>questions.map(q=>shuffleQuestionOptions(q,"ans")));
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const total=questions.length; const isLast=idx===total-1;
  const q=shuffled[idx];
  const handleAnswer=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.ans)setScore(s=>s+1);};
  const handleNext=()=>{const fs=score+(sel===q.ans?1:0);if(isLast){onComplete(fs);return;}setSel(null);setAnswered(false);setIdx(i=>i+1);};
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:10,color:C.muted}}>{t.question} {idx+1} {t.ofQ} {total}</span>
        <span style={{fontSize:10,color:C.gold2,fontWeight:800}}>✓ {score}</span>
      </div>
      <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:4,marginBottom:14,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${C.gold},${C.amber})`,borderRadius:4,transition:"width 0.3s"}}/>
      </div>
      <div style={{background:"rgba(6,14,26,0.85)",borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:14,color:C.white,lineHeight:1.65,fontWeight:700}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(10,22,40,0.7)",brd=C.border,col=C.white;
        if(answered){
          if(i===q.ans){bg="rgba(0,230,118,0.12)";brd=C.green;col=C.green;}
          else if(i===sel){bg="rgba(255,23,68,0.12)";brd=C.red;col=C.red;}
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"13px 15px",marginBottom:8,borderRadius:13,background:bg,
              border:`1.5px solid ${brd}`,color:col,fontSize:13,textAlign:"left",
              cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:800,marginRight:9,color:C.amber2}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"13px",borderRadius:13,
          background:`rgba(${sel===q.ans?"0,230,118":"255,23,68"},0.08)`,
          border:`1.5px solid ${sel===q.ans?C.green:C.red}55`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:800,color:sel===q.ans?C.green:C.red,marginBottom:5}}>
            {sel===q.ans?t.correct:t.wrong}
          </div>
          <div style={{fontSize:11,color:C.steel3,lineHeight:1.7}}>{t.expl} {q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"15px",borderRadius:15,
            background:`linear-gradient(135deg,${C.gold},${C.amber})`,
            border:"none",color:C.bg0,fontSize:14,fontWeight:900,cursor:"pointer",letterSpacing:1,
            boxShadow:`0 4px 22px ${C.amber}40`}}>
          {isLast?t.finish:t.next}
        </button>
      )}
    </div>
  );
}

function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);
  const d={
    fr:{title:"MV HERALD OF FREE ENTERPRISE — Zeebrugge, Belgique (6 mars 1987)",
      teaser:"Ferry RORO — Portes de proue ouvertes — Chavirement en 90 secondes — 193 morts",
      what:"Le ferry Herald of Free Enterprise (P&O Ferries) appareille de Zeebrugge a 18h05 avec 459 passagers, 80 membres d'equipage et 81 vehicules. L'assistant du bosco, responsable de la fermeture des portes de proue, s'est endormi dans sa cabine. Personne ne constate que les portes sont ouvertes. A 18h24, le navire s'incline a tribord et chavire en moins de 90 secondes a seulement 900 metres du port. 193 personnes perirent. Le navire avait un GM initial d'environ 1,4 m — en eaux calmes, la stabilite etait conforme. Mais l'envahissement massif et rapide du pont vehicules a cree une surface libre et un poids en hauteur qui ont reduit GM a zero puis negatif en quelques secondes.",
      cause:"- Porte de proue non fermee avant l'appareillage — faute du matelot endormi\n- Absence de systeme d'alarme signalant les portes ouvertes a la passerelle\n- Absence de controle visuel systematique des portes avant appareillage\n- Procedure defaillante : supposer que les portes sont fermees si pas de rapport contraire\n- SOLAS 1974 : aucune obligation de systeme d'indication de portes ouvertes\n- GM et stabilite conformes en eaux calmes — l'envahissement a tout change",
      lessons:"- Obligation IMO (post-1987) : systeme d'indication de position des portes etanches a la passerelle\n- Alarme sonore et visuelle en cas de porte ouverte a l'appareillage\n- Procedure systematique de verification des portes avant tout mouvement\n- SOLAS II-1/23 : prescriptions renforcees pour les navires RORO\n- ISM Code 1994 (obligatoire depuis 1998) : systemes de securite documentes pour tous les navires\n- Etude: GM conforme en eaux calmes ne suffit pas — prevoir les scenarios d'envahissement",
      link:"Lien L5 Stabilite : Le Herald of Free Enterprise a revolutionne la reglementation maritime. Un GM correct ne protege pas contre un envahissement massif et rapide. La stabilite en avaries (damage stability) est tout aussi critique que la stabilite intact."},
    en:{title:"MV HERALD OF FREE ENTERPRISE — Zeebrugge, Belgium (6 March 1987)",
      teaser:"RORO Ferry — Bow doors open — Capsized in 90 seconds — 193 deaths",
      what:"The Herald of Free Enterprise (P&O Ferries) departed Zeebrugge at 18:05 with 459 passengers, 80 crew and 81 vehicles. The assistant bosun responsible for closing the bow doors had fallen asleep in his cabin. Nobody noticed the doors were open. At 18:24 the vessel listed to starboard and capsized in under 90 seconds just 900 metres from port. 193 people died. The vessel had an initial GM of about 1.4 m — in calm water, stability was compliant. But the massive rapid flooding of the car deck created a free surface and weight at height that drove GM to zero then negative within seconds.",
      cause:"- Bow door not closed before departure — sleeping crew member\n- No alarm system signaling open doors to bridge\n- No systematic visual check of doors before departure\n- Defective procedure: assuming doors closed if no negative report\n- SOLAS 1974: no mandatory open-door indication system\n- GM and stability compliant in calm water — flooding changed everything",
      lessons:"- IMO post-1987 requirement: watertight door position indication system on bridge\n- Audible and visual alarm for open door at departure\n- Systematic door verification procedure before any movement\n- SOLAS II-1/23: reinforced requirements for RORO vessels\n- ISM Code 1994 (mandatory since 1998): documented safety systems for all vessels\n- Key lesson: compliant GM in calm water does not prevent massive rapid flooding",
      link:"L5 Stability link: The Herald of Free Enterprise revolutionised maritime regulation. A correct GM does not protect against massive rapid flooding. Damage stability is as critical as intact stability."},
    es:{title:"MV HERALD OF FREE ENTERPRISE — Zeebrugge, Belgica (6 de marzo de 1987)",
      teaser:"Ferry RORO — Portas de proa abiertas — Zozobro en 90 segundos — 193 muertos",
      what:"El Herald of Free Enterprise (P&O Ferries) zarpo de Zeebrugge a las 18:05 con 459 pasajeros, 80 tripulantes y 81 vehiculos. El asistente del contramaestre responsable del cierre de las portas de proa se habia quedado dormido en su camarote. Nadie noto que las portas estaban abiertas. A las 18:24 el buque escoró a estribor y zozobro en menos de 90 segundos a solo 900 metros del puerto. Murieron 193 personas.",
      cause:"- Porta de proa no cerrada antes de zarpar — tripulante dormido\n- Ausencia de sistema de alarma indicando puertas abiertas en el puente\n- Ausencia de verificacion visual sistematica de las puertas antes de zarpar\n- Procedimiento deficiente: asumir puertas cerradas si no hay informe contrario\n- SOLAS 1974: sin obligacion de sistema de indicacion de puertas abiertas",
      lessons:"- Obligacion IMO (post-1987): sistema de indicacion de posicion de puertas en el puente\n- Alarma sonora y visual en caso de puerta abierta al zarpar\n- Procedimiento sistematico de verificacion de puertas antes de zarpar\n- SOLAS II-1/23: prescripciones reforzadas para buques RORO\n- ISM Code 1994: sistemas de seguridad documentados para todos los buques",
      link:"Vinculo L5 Estabilidad: El Herald of Free Enterprise revoluciono la normativa maritima. Un GM correcto no protege contra una inundacion masiva y rapida."},
    pt:{title:"MV HERALD OF FREE ENTERPRISE — Zeebrugge, Belgica (6 de marco de 1987)",
      teaser:"Ferry RORO — Portas de proa abertas — Tombou em 90 segundos — 193 mortos",
      what:"O Herald of Free Enterprise (P&O Ferries) partiu de Zeebrugge as 18:05 com 459 passageiros, 80 tripulantes e 81 veiculos. O assistente do contramestre responsavel pelo fecho das portas de proa tinha adormecido na sua cabine. Ninguem notou que as portas estavam abertas. As 18:24 o navio adernpu para estibordo e tombou em menos de 90 segundos a apenas 900 metros do porto. 193 pessoas morreram.",
      cause:"- Porta de proa nao fechada antes de zarpar — tripulante adormecido\n- Ausencia de sistema de alarme indicando portas abertas na ponte\n- Ausencia de verificacao visual sistematica das portas antes de zarpar\n- Procedimento deficiente: assumir portas fechadas se nao ha relatorio contrario",
      lessons:"- Obrigacao IMO (pos-1987): sistema de indicacao de posicao das portas na ponte\n- Alarme sonoro e visual em caso de porta aberta ao zarpar\n- Procedimento sistematico de verificacao de portas antes de zarpar\n- SOLAS II-1/23: prescricoes reforçadas para navios RORO\n- ISM Code 1994: sistemas de seguranca documentados para todos os navios",
      link:"Ligacao L5 Estabilidade: O Herald of Free Enterprise revolucionou a regulamentacao maritima. Um GM correto nao protege contra uma inundacao massiva e rapida."},
  };
  const c=d[lang]||d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}50`,borderRadius:20,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:24}}>⚠️</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:800,color:C.red2,marginBottom:2,fontFamily:"'Cinzel',serif"}}>{c.title}</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div>
          </div>
          <span style={{fontSize:16,color:C.muted,fontWeight:700}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp && (
        <div style={{padding:"0 16px 16px"}}>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,marginBottom:12}}>{c.what}</div>
          <div style={{fontSize:11,color:C.red2,fontWeight:800,marginBottom:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>CAUSES</div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line",marginBottom:12}}>{c.cause}</div>
          <div style={{fontSize:11,color:C.green2,fontWeight:800,marginBottom:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>
            {lbl("LECONS APPRISES","LESSONS LEARNED","LECCIONES APRENDIDAS","LICOES APRENDIDAS")}
          </div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line",marginBottom:12}}>{c.lessons}</div>
          <div style={{padding:"12px 14px",borderRadius:14,background:"rgba(255,179,0,0.08)",
            border:`1px solid ${C.amber}44`,fontSize:11,color:C.amber2,lineHeight:1.7}}>{c.link}</div>
        </div>
      )}
    </div>
  );
}

const getContent=(lang)=>{
  const d={
    fr:{
      badge:"Seamanship · Lecon 5/5 · Premium · 200 XP",
      title:"Stabilite & Flottabilite",
      intro:"En 1987, le Herald of Free Enterprise a chavire en 90 secondes. Un GM de 1,4m — conforme — n'a pas suffi face a l'envahissement massif du pont vehicules.\n\nCette lecon couvre G, B, M, la courbe GZ, les etats de stabilite, les facteurs critiques, les criteres IMO IS Code 2008 et le franc-bord Plimsoll.",
      p1:"PARTIE 1 — POINTS G, B, M, K",s1t:"Centres de gravite, carence, metacentre et quille",
      s1:"DEFINITIONS ESSENTIELLES:\nK (quille) : point de reference le plus bas\nG (centre de gravite) : application de toutes les masses\n→ Monte si on charge en hauteur — ne se deplace pas avec la gite\nB (centre de carence) : centre du volume immerse\n→ SE DEPLACE lateralement quand le navire gite — cree le bras GZ\nM (metacentre) : point virtuel sur l'axe du navire\n→ GM = KM - KG → la formule a connaitre ABSOLUMENT\n\nRESUME DE STABILITE:\nGM > 0 (G sous M) = STABLE - navire se redresse\nGM = 0 (G = M) = NEUTRE - navire reste incline\nGM < 0 (G sur M) = INSTABLE - navire chavire\nIMO : GM minimum = 0,15 m dans toutes les conditions",
      p2:"PARTIE 2 — COURBE GZ ET SIMULATEUR",s2t:"Bras de levier GZ — angle de chavirement — GM",
      s2:"COURBE GZ (STABILITE STATIQUE):\nGZ = bras de levier redressant (m)\nSi GZ > 0 → couple redressant → navire revient\nSi GZ < 0 → couple chavirant → chavirement\nAngle de chavirement : GZ = 0 apres son maximum\n\nCRITERES IMO IS CODE 2008 (MSC.267(85)):\nGM initial >= 0,15 m\nGZ max >= 0,20 m a angle >= 30 deg\nAngle de chavirement >= 25 deg apres max GZ\nAire 0-30 deg >= 0,055 m.rad\nAire 0-40 deg >= 0,090 m.rad\nAire 30-40 deg >= 0,030 m.rad\n\nSTABILITE INITIALE (< 10-15 deg):\nGZ = GM x sin(gite) — lineaire — decrit par GM seul\n\nGRANDE INCLINAISON (> 15 deg):\nCourbe GZ complete necessaire — metacentre se deplace",
      p3:"PARTIE 3 — ETATS DE STABILITE",s3t:"Stable, neutre, instable, raide, mou",
      s3:"5 ETATS DE STABILITE:\nStable (GM > 0) : couple redressant — etat normal\nNeutre (GM = 0) : navire reste incline — DANGEREUX\nInstable (GM < 0) : couple chavirant — URGENCE\nRaide (GM >> 0) : mouvements brusques — inconfort + fatigue structures\nMou (0 < GM < 0,15m) : gite lente — risque si evenement supplementaire\n\nNAVIRE RAIDE vs MOU:\nRaide (GM > 2m) : periode de roulis courte — mouvements secs\nMou (GM < 0,2m) : periode de roulis longue — gite prononcee\nIdeal : GM entre 0,5 et 1,5 m selon le type de navire\n\nEXPERIENCE DE STABILITE (INCLINING EXPERIMENT):\nGM = (p x d) / (Deplacement x tan theta)\nObligatoire a la construction et apres modifications majeures",
      p4:"PARTIE 4 — FACTEURS ET CADRE REGLEMENTAIRE",s4t:"Facteurs + IMO IS Code + Franc-bord Plimsoll",
      s4:"FACTEURS AFFECTANT LA STABILITE:\nChargement en hauteur : G monte -> GM diminue\nSurface libre : GG' = i x densL / D — reduire par remplissage/cloisons\nGivrage : glace sur structures hautes -> G monte\nEnvahissement : poids + surface libre = double impact negatif\n\nEFFET SURFACE LIBRE (FORMULE):\nGG' = (i x gamma_liquide) / Delta\ni = moment inertie surface libre (l x b^3 / 12)\nDiviser citerne b en deux -> i et GG' divises par 4\n\nFRANC-BORD ET PLIMSOLL:\nFranc-bord = waterline -> pont principal = reserve de flottabilite\nPlimsoll : ligne de charge minimum selon zone et saison\n(LF = Eau douce / T = Tropical / S = Ete / W = Hiver / WNA = Hivernal Atlantique Nord)\nGrand franc-bord = grand angle de chavirement = navire plus sur",
      p5:"EXERCICES PRATIQUES",p6:"CAS D'ACCIDENT REEL",p7:"BANQUE — 15 QUESTIONS",
      sumT:"RESUME — LECON 5 SEAMANSHIP",
      sumP:["GM = KM - KG — G sous M (GM > 0) = stable — G sur M (GM < 0) = instable","IMO IS Code 2008 : GM min = 0,15 m — GZ max >= 0,20 m a >= 30 — angle chavirement >= 25 apres max","B se deplace lateralement quand le navire gite — cree le bras GZ redressant","Surface libre : GG' = i x densL / D — diviser citerne par 2 = GG' divise par 4","Chargement en hauteur -> G monte -> GM diminue -> navire mou ou instable","Navire raide (GM > 2m) : mouvements brusques — mou (GM < 0.15m) : gite lente","Experience de stabilite : GM = (p x d) / (Deplacement x tan theta)","Franc-bord Plimsoll : reserve de flottabilite — minimum legal par zone","Angle de chavirement : GZ = 0 apres son maximum — IMO : >= 25 deg apres max","Herald of Free Enterprise 1987 : GM conforme, portes ouvertes, envahissement = 193 morts"],
      learnedP:["G, B, M, K — formule GM = KM - KG","Courbe GZ et criteres IMO IS Code 2008","5 etats de stabilite (stable, neutre, instable, raide, mou)","Facteurs : surface libre, chargement, givrage, envahissement","Franc-bord Plimsoll et experience de stabilite"],
    },
    en:{
      badge:"Seamanship · Lesson 5/5 · Premium · 200 XP",
      title:"Stability & Buoyancy",
      intro:"In 1987, the Herald of Free Enterprise capsized in 90 seconds. A GM of 1.4m — compliant — was not enough against the massive flooding of the car deck.\n\nThis lesson covers G, B, M, the GZ curve, stability states, critical factors, IMO IS Code 2008 criteria and the Plimsoll freeboard.",
      p1:"PART 1 — POINTS G, B, M, K",s1t:"Centres of gravity, buoyancy, metacentre and keel",
      s1:"ESSENTIAL DEFINITIONS:\nK (keel): lowest reference point\nG (centre of gravity): application of all masses\n→ Rises if loaded high — does not move with heel\nB (centre of buoyancy): submerged volume centre\n→ MOVES laterally when vessel heels — creates GZ lever\nM (metacentre): virtual point on vessel axis\n→ GM = KM - KG → the formula to know ABSOLUTELY\n\nSTABILITY SUMMARY:\nGM > 0 (G below M) = STABLE - vessel rights itself\nGM = 0 (G = M) = NEUTRAL - vessel stays inclined\nGM < 0 (G above M) = UNSTABLE - vessel capsizes\nIMO: minimum GM = 0.15 m in all loading conditions",
      p2:"PART 2 — GZ CURVE AND SIMULATOR",s2t:"Righting lever GZ — vanishing angle — GM",
      s2:"GZ CURVE (STATIC STABILITY):\nGZ = righting lever (m)\nIf GZ > 0 -> righting couple -> vessel returns upright\nIf GZ < 0 -> capsizing couple -> capsize\nVanishing angle: GZ = 0 after its maximum\n\nIMO IS CODE 2008 CRITERIA (MSC.267(85)):\nInitial GM >= 0.15 m\nMax GZ >= 0.20 m at angle >= 30 deg\nVanishing angle >= 25 deg past GZ max\nArea 0-30 deg >= 0.055 m.rad\nArea 0-40 deg >= 0.090 m.rad\nArea 30-40 deg >= 0.030 m.rad\n\nINITIAL STABILITY (< 10-15 deg):\nGZ = GM x sin(heel) — linear — described by GM alone\n\nLARGE-ANGLE (> 15 deg):\nFull GZ curve required — metacentre moves",
      p3:"PART 3 — STABILITY STATES",s3t:"Stable, neutral, unstable, stiff, tender",
      s3:"5 STABILITY STATES:\nStable (GM > 0): righting couple — normal state\nNeutral (GM = 0): vessel stays inclined — DANGEROUS\nUnstable (GM < 0): capsizing couple — EMERGENCY\nStiff (GM >> 0): sudden movements — discomfort + structural fatigue\nTender (0 < GM < 0.15m): slow roll — risk if additional event\n\nSTIFF vs TENDER:\nStiff (GM > 2m): short rolling period — sudden movements\nTender (GM < 0.2m): long rolling period — pronounced heel\nIdeal: GM between 0.5 and 1.5 m depending on vessel type\n\nINCLINING EXPERIMENT:\nGM = (p x d) / (Displacement x tan theta)\nMandatory at construction and after major modifications",
      p4:"PART 4 — FACTORS AND REGULATORY FRAMEWORK",s4t:"Factors + IMO IS Code + Plimsoll Freeboard",
      s4:"FACTORS AFFECTING STABILITY:\nHigh loading: G rises -> GM falls\nFree surface: GG' = i x densL / D — reduce by filling/divisions\nIcing: ice on high structures -> G rises\nFlooding: weight + free surface = double negative impact\n\nFREE SURFACE EFFECT (FORMULA):\nGG' = (i x gamma_liquid) / Delta\ni = free surface inertia moment (l x b^3 / 12)\nDivide tank b in two -> i and GG' divided by 4\n\nFREEBOARD AND PLIMSOLL:\nFreeboard = waterline to main deck = reserve of buoyancy\nPlimsoll: minimum load line by zone and season\n(FW = Fresh Water / T = Tropical / S = Summer / W = Winter / WNA = Winter North Atlantic)\nGreater freeboard = greater vanishing angle = safer vessel",
      p5:"PRACTICAL EXERCISES",p6:"REAL ACCIDENT CASE",p7:"BANK — 15 QUESTIONS",
      sumT:"SUMMARY — SEAMANSHIP LESSON 5",
      sumP:["GM = KM - KG — G below M (GM > 0) = stable — G above M (GM < 0) = unstable","IMO IS Code 2008: min GM = 0.15 m — max GZ >= 0.20 m at >= 30 — vanishing angle >= 25 past max","B moves laterally when vessel heels — creates righting GZ lever","Free surface: GG' = i x densL / D — divide tank by 2 = GG' divided by 4","High loading -> G rises -> GM falls -> tender or unstable","Stiff vessel (GM > 2m): sudden movements — tender (GM < 0.15m): slow heel","Inclining experiment: GM = (p x d) / (Displacement x tan theta)","Plimsoll freeboard: reserve of buoyancy — legal minimum by zone","Vanishing angle: GZ = 0 after its maximum — IMO: >= 25 deg past max","Herald of Free Enterprise 1987: compliant GM, open doors, flooding = 193 deaths"],
      learnedP:["G, B, M, K — formula GM = KM - KG","GZ curve and IMO IS Code 2008 criteria","5 stability states (stable, neutral, unstable, stiff, tender)","Factors: free surface, high loading, icing, flooding","Plimsoll freeboard and inclining experiment"],
    },
    es:{
      badge:"Seamanship · Leccion 5/5 · Premium · 200 XP",
      title:"Estabilidad & Flotabilidad",
      intro:"En 1987, el Herald of Free Enterprise zozobro en 90 segundos. Un GM de 1,4m — conforme — no fue suficiente ante la inundacion masiva de la cubierta de vehiculos.\n\nEsta leccion cubre G, B, M, la curva GZ, los estados de estabilidad, los factores criticos, los criterios del IS Code OMI 2008 y el francobordo Plimsoll.",
      p1:"PARTE 1 — PUNTOS G, B, M, K",s1t:"Centros de gravedad, carena, metacentro y quilla",
      s1:"GM = KM - KG. K = referencia. G = gravedad (sube al cargar en altura). B = centro carena (se desplaza al escorar -> crea brazo GZ). M = metacentro (virtual).\n\nGM > 0 (G bajo M) = ESTABLE\nGM = 0 (G = M) = NEUTRO\nGM < 0 (G sobre M) = INESTABLE\nOMI: GM minimo = 0,15 m",
      p2:"PARTE 2 — CURVA GZ Y SIMULADOR",s2t:"Brazo adrizante GZ — angulo de zozobra — GM",
      s2:"Curva GZ: GZ > 0 = par adrizante. GZ < 0 = par zozobrante.\nIS Code OMI 2008 (MSC.267(85)):\nGM >= 0,15 m | GZ max >= 0,20 m a >= 30 deg\nAngulo zozobra >= 25 deg tras max | Aires 0-30 >= 0,055 / 0-40 >= 0,090 / 30-40 >= 0,030 m.rad",
      p3:"PARTE 3 — ESTADOS DE ESTABILIDAD",s3t:"Estable, neutro, inestable, rigido, blando",
      s3:"Estable (GM > 0) | Neutro (GM = 0) | Inestable (GM < 0)\nRigido (GM >> 0) : movimientos bruscos\nBlando (GM < 0,15m) : escora lenta — riesgo si evento adicional\nExperiencia de estabilidad: GM = (p x d) / (Desplazamiento x tan theta)",
      p4:"PARTE 4 — FACTORES Y MARCO REGLAMENTARIO",s4t:"Factores + IS Code OMI + Francobordo Plimsoll",
      s4:"Factores: carga alta / superficie libre / hielo / inundacion\nGG' = (i x densL) / Desplazamiento. Dividir tanque -> GG' / 4.\nFrancobordo Plimsoll: FW / T / S / W / WNA — minimo legal por zona.",
      p5:"EJERCICIOS PRACTICOS",p6:"CASO REAL",p7:"BANCO — 15 PREGUNTAS",
      sumT:"RESUMEN — LECCION 5 SEAMANSHIP",
      sumP:["GM = KM - KG — G bajo M = estable — G sobre M = inestable","IS Code OMI 2008: GM min = 0,15 m — GZ max >= 0,20 m — angulo zozobra >= 25 tras max","B se desplaza al escorar — crea el brazo GZ adrizante","Superficie libre: GG' = i x densL / D — dividir tanque = GG' dividido entre 4","Carga alta -> G sube -> GM baja -> blando o inestable","Rigido (GM > 2m): movimientos bruscos — blando (GM < 0,15m): escora lenta","Experiencia estabilidad: GM = (p x d) / (Desplazamiento x tan theta)","Francobordo Plimsoll: reserva flotabilidad — minimo legal por zona","Angulo zozobra: GZ = 0 tras su maximo — OMI: >= 25 grados","Herald of Free Enterprise 1987: GM conforme, portas abiertas, inundacion = 193 muertos"],
      learnedP:["G, B, M, K — formula GM = KM - KG","Curva GZ y criterios IS Code OMI 2008","5 estados de estabilidad","Factores: superficie libre, carga alta, hielo, inundacion","Francobordo Plimsoll y experiencia de estabilidad"],
    },
    pt:{
      badge:"Seamanship · Licao 5/5 · Premium · 200 XP",
      title:"Estabilidade & Flutuabilidade",
      intro:"Em 1987, o Herald of Free Enterprise tombou em 90 segundos. Um GM de 1,4m — conforme — nao foi suficiente perante a inundacao massiva do convés de veiculos.\n\nEsta licao cobre G, B, M, a curva GZ, os estados de estabilidade, os fatores criticos, os criterios do IS Code IMO 2008 e o bordo livre Plimsoll.",
      p1:"PARTE 1 — PONTOS G, B, M, K",s1t:"Centros de gravidade, carena, metacentro e quilha",
      s1:"GM = KM - KG. K = referencia. G = gravidade (sobe ao carregar em altura). B = centro carena (desloca-se ao adornar -> cria braco GZ). M = metacentro (virtual).\n\nGM > 0 (G abaixo de M) = ESTAVEL\nGM = 0 (G = M) = NEUTRO\nGM < 0 (G acima de M) = INSTAVEL\nIMO: GM minimo = 0,15 m",
      p2:"PARTE 2 — CURVA GZ E SIMULADOR",s2t:"Braco de endireitamento GZ — angulo tombamento — GM",
      s2:"Curva GZ: GZ > 0 = binas endireitamento. GZ < 0 = binas tombamento.\nIS Code IMO 2008 (MSC.267(85)):\nGM >= 0,15 m | GZ max >= 0,20 m a >= 30 graus\nAngulo tombamento >= 25 graus apos max | Areas 0-30 >= 0,055 / 0-40 >= 0,090 / 30-40 >= 0,030 m.rad",
      p3:"PARTE 3 — ESTADOS DE ESTABILIDADE",s3t:"Estavel, neutro, instavel, rigido, mole",
      s3:"Estavel (GM > 0) | Neutro (GM = 0) | Instavel (GM < 0)\nRigido (GM >> 0) : movimentos bruscos\nMole (GM < 0,15m) : banda lenta — risco se evento adicional\nExperiencia de estabilidade: GM = (p x d) / (Deslocamento x tan theta)",
      p4:"PARTE 4 — FATORES E QUADRO REGULATORIO",s4t:"Fatores + IS Code IMO + Bordo livre Plimsoll",
      s4:"Fatores: carga alta / superficie livre / gelo / inundacao\nGG' = (i x densL) / Deslocamento. Dividir tanque -> GG' / 4.\nBordo livre Plimsoll: FW / T / S / W / WNA — minimo legal por zona.",
      p5:"EXERCICIOS PRATICOS",p6:"CASO REAL",p7:"BANCO — 15 QUESTOES",
      sumT:"RESUMO — LICAO 5 SEAMANSHIP",
      sumP:["GM = KM - KG — G abaixo de M = estavel — G acima de M = instavel","IS Code IMO 2008: GM min = 0,15 m — GZ max >= 0,20 m — angulo tombamento >= 25 apos max","B desloca-se ao adornar — cria o braco GZ de endireitamento","Superficie livre: GG' = i x densL / D — dividir tanque = GG' dividido por 4","Carga alta -> G sobe -> GM desce -> mole ou instavel","Rigido (GM > 2m): movimentos bruscos — mole (GM < 0,15m): banda lenta","Experiencia estabilidade: GM = (p x d) / (Deslocamento x tan theta)","Bordo livre Plimsoll: reserva flutuabilidade — minimo legal por zona","Angulo tombamento: GZ = 0 apos o seu maximo — IMO: >= 25 graus","Herald of Free Enterprise 1987: GM conforme, portas abertas, inundacao = 193 mortos"],
      learnedP:["G, B, M, K — formula GM = KM - KG","Curva GZ e criterios IS Code IMO 2008","5 estados de estabilidade","Fatores: superficie livre, carga alta, gelo, inundacao","Bordo livre Plimsoll e experiencia de estabilidade"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonSEA_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  useEffect(()=>{if(typeof window!=="undefined")window.__MAP_LANG__=lang;},[lang]);
  const t=T[lang]||T.fr;
  const quiz=QUIZ[lang]||QUIZ.fr;
  const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);
  const [quizScore,setQuizScore]=useState(0);
  const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  const trophy=getTrophy(quizScore,5);
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",
      background:`linear-gradient(160deg,${C.bg0} 0%,${C.bg1} 40%,${C.bg2} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(3,7,15,0.97)",
        backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:56,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack}
            style={{background:"rgba(201,146,42,0.1)",border:`1px solid ${C.border}`,
              borderRadius:11,padding:"8px 14px",color:C.gold2,fontSize:13,fontWeight:800,cursor:"pointer"}}>
            {t.back}
          </button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gold2,letterSpacing:1.5,fontFamily:"'Cinzel',serif",fontWeight:800}}>
              ⚓ {t.module}
            </div>
            <div style={{fontSize:10,color:C.muted}}>
              {lang==="fr"?"Lecon 5/5":lang==="en"?"Lesson 5/5":lang==="es"?"Leccion 5/5":"Licao 5/5"}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{padding:"3px 9px",borderRadius:20,background:"rgba(201,146,42,0.15)",
              border:`1px solid ${C.amber}44`,fontSize:9,color:C.amber,fontWeight:800,letterSpacing:1}}>
              PRO
            </span>
            <span style={{fontSize:11,color:C.gold2,fontFamily:"'Cinzel',serif",fontWeight:700}}>
              {progress}%
            </span>
          </div>
        </div>
        <div style={{height:3,background:"rgba(201,146,42,0.1)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,
            background:`linear-gradient(90deg,${C.gold},${C.amber})`,
            transition:"width 0.5s ease",boxShadow:`0 0 8px ${C.gold}`}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 50px",position:"relative",zIndex:1,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",transition:"all 0.55s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,
              marginBottom:12,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.border}`,
              fontSize:10,color:C.gold2,fontWeight:700}}>
              {lc.badge}
            </div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:21,fontWeight:800,color:C.white,
              lineHeight:1.3,margin:"0 0 18px",textShadow:`0 0 40px ${C.gold}30`}}>
              {lc.title}
            </h1>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.meta}44`,
              borderLeft:`3px solid ${C.meta}`,borderRadius:20,padding:"16px",marginBottom:16}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.88)",lineHeight:1.9,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </div>

            {[
              {icon:"⚖️",p:lc.p1,s:lc.s1t,content:lc.s1,color:C.meta,
                svg:<GBMDiagramSVG lang={lang}/>,
                svgLabel:lbl("POINTS G B M K — INTERACTIF","POINTS G B M K — INTERACTIVE","PUNTOS G B M K — INTERACTIVO","PONTOS G B M K — INTERATIVO")},
              {icon:"📐",p:lc.p2,s:lc.s2t,content:lc.s2,color:C.safe,
                svg:<GZCurveSVG lang={lang}/>,
                svgLabel:lbl("COURBE GZ + SIMULATEUR GM","GZ CURVE + GM SIMULATOR","CURVA GZ + SIMULADOR GM","CURVA GZ + SIMULADOR GM")},
              {icon:"🚢",p:lc.p3,s:lc.s3t,content:lc.s3,color:C.grav,
                svg:<StabilityStatesSVG lang={lang}/>,
                svgLabel:lbl("ETATS DE STABILITE","STABILITY STATES","ESTADOS DE ESTABILIDAD","ESTADOS DE ESTABILIDADE")},
              {icon:"⚠️",p:lc.p4,s:lc.s4t,content:lc.s4,color:C.danger,
                svg:<FactorsSVG lang={lang}/>,
                svgLabel:lbl("FACTEURS + IMO IS CODE + FRANC-BORD","FACTORS + IMO IS CODE + FREEBOARD","FACTORES + IS CODE OMI + FRANCOBORDO","FATORES + IS CODE IMO + BORDO LIVRE")},
            ].map((sec,i)=>(
              <div key={i}>
                <SL icon={sec.icon} text={sec.p} color={sec.color}/>
                <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${sec.color}22`,
                  borderRadius:20,padding:"16px",marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <span style={{fontSize:22}}>{sec.icon}</span>
                    <span style={{fontSize:14,fontWeight:800,color:C.white}}>{sec.s}</span>
                  </div>
                  <div style={{fontSize:13,color:"rgba(176,190,197,0.9)",lineHeight:1.9,whiteSpace:"pre-line"}}>{sec.content}</div>
                </div>
                <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${sec.color}33`,
                  borderRadius:20,padding:"16px",marginBottom:18}}>
                  <div style={{fontSize:10,color:sec.color,letterSpacing:2,fontFamily:"'Cinzel',serif",
                    marginBottom:12,fontWeight:800}}>
                    {sec.icon} {sec.svgLabel}
                  </div>
                  {sec.svg}
                </div>
              </div>
            ))}

            <SL icon="🎯" text={lc.p5} color={C.gold2}/>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.amber}55`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <Exercise1 lang={lang} t={t}/>
            </div>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:18}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.gold}/>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.gold}44`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/>
            </div>

            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.gold}33`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2.5,fontFamily:"'Cinzel',serif",
                marginBottom:14,fontWeight:800}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"6px 0",
                  borderBottom:i<lc.sumP.length-1?"1px solid rgba(201,146,42,0.1)":"none",
                  fontSize:12,color:C.white}}>
                  <span style={{color:C.gold2,fontWeight:900,flexShrink:0,marginTop:1}}>✓</span>{pt}
                </div>
              ))}
            </div>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}}
              style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"18px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${C.gold},${C.amber})`,
                fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:900,letterSpacing:2,
                color:C.bg0,boxShadow:`0 10px 40px rgba(201,146,42,0.35)`,marginTop:4}}>
              {t.startQuiz}
            </button>
            <div style={{textAlign:"center",fontSize:11,color:C.dim,marginTop:10}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:19,fontWeight:800,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Stabilite & Flottabilite":lang==="en"?"Quiz — Stability & Buoyancy":lang==="es"?"Quiz — Estabilidad & Flotabilidad":"Quiz — Estabilidade & Flutuabilidade"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · Seamanship L5</div>
            </div>
            <QuizComp questions={quiz} t={t} lang={lang}
              onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),400);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontSize:76,marginBottom:10}}>{trophy.icon}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:800,color:trophy.color,marginBottom:6}}>
                {trophy.label[lang]||trophy.label.fr}
              </div>
              <div style={{fontSize:32,fontWeight:900,color:C.white,marginBottom:4}}>{quizScore}/5</div>
              <div style={{fontSize:20,color:trophy.color,fontWeight:800,marginBottom:18}}>
                {Math.round(quizScore/5*100)}%
              </div>
              <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:6,
                margin:"0 24px 20px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${quizScore/5*100}%`,
                  background:`linear-gradient(90deg,${C.gold},${trophy.color})`,
                  borderRadius:6,transition:"width 0.9s ease"}}/>
              </div>
              {/* MODULE COMPLET BADGE */}
              <div style={{marginBottom:16,padding:"14px",
                background:"rgba(201,146,42,0.07)",border:`1.5px solid ${C.gold}55`,borderRadius:18,textAlign:"center"}}>
                <div style={{fontSize:36,marginBottom:6}}>🚢⚓🎓</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:800,color:C.gold2,marginBottom:3,letterSpacing:1}}>
                  {lang==="fr"?"MODULE SEAMANSHIP COMPLET !":lang==="en"?"SEAMANSHIP MODULE COMPLETE!":lang==="es"?"MODULO SEAMANSHIP COMPLETADO!":"MODULO SEAMANSHIP CONCLUIDO!"}
                </div>
                <div style={{fontSize:11,color:C.muted}}>
                  L1 Cordages · L2 Noeuds · L3 Mouillage · L4 Amarrage · L5 Stabilite
                </div>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 22px",
                borderRadius:20,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,
                fontSize:14,color:C.gold2,fontWeight:800}}>
                +{quizScore>=4?200:quizScore===3?120:70} {t.xp} ⭐
              </div>
            </div>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.gold}33`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:12,fontFamily:"'Cinzel',serif",
                letterSpacing:1,fontWeight:700}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",
                  borderBottom:i<lc.learnedP.length-1?"1px solid rgba(201,146,42,0.08)":"none",
                  fontSize:12,color:C.white}}>
                  <span style={{color:C.gold2,fontWeight:900}}>✓</span>{pt}
                </div>
              ))}
            </div>
            <button onClick={onNext}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${C.gold},${C.amber})`,
                fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:900,letterSpacing:2,
                color:C.bg0,cursor:"pointer",boxShadow:`0 8px 30px rgba(201,146,42,0.3)`,marginBottom:12}}>
              {lang==="fr"?"RETOUR AU MODULE =>":lang==="en"?"BACK TO MODULE =>":lang==="es"?"VOLVER AL MODULO =>":"VOLTAR AO MODULO =>"}
            </button>
            <button onClick={onBack}
              style={{width:"100%",padding:"12px 0",border:`1px solid rgba(201,146,42,0.2)`,
                borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,
                color:C.muted,cursor:"pointer"}}>
              {t.backDash}
            </button>
          </div>}

        </div>
      </div>
    </div>
  );
}

