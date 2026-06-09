// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Navigation & Cartographie", lesson:"Leçon", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Navigation & Cartography", lesson:"Lesson", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Navegación & Cartografía", lesson:"Lección", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Navegação & Cartografia", lesson:"Lição", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — 3 NORTHS
// ══════════════════════════════════════
function ThreeNorthsSVG({ lang }) {
  const [decl, setDecl] = useState(5);
  const [dev, setDev] = useState(3);
  const cx=120, cy=110, r=88;
  const toRad = d => d*Math.PI/180;
  const tvA=-90, mnA=tvA+decl, cnA=mnA+dev;
  const ep = (a,l) => ({x:cx+l*Math.cos(toRad(a)),y:cy+l*Math.sin(toRad(a))});
  const tv=ep(tvA-90,r-8), mn=ep(mnA-90,r-8), cn=ep(cnA-90,r-8);
  return (
    <div>
      <svg width="290" height="175" viewBox="0 0 290 175">
        <circle cx={cx} cy={cy} r={r} fill="#0a1628" stroke={C.border} strokeWidth="1.5"/>
        {Array.from({length:36},(_,i)=>{const a=toRad(i*10-90);const iM=i%9===0;const r1=iM?r-14:r-8;return <line key={i} x1={cx+r1*Math.cos(a)} y1={cy+r1*Math.sin(a)} x2={cx+(r-2)*Math.cos(a)} y2={cy+(r-2)*Math.sin(a)} stroke={iM?C.gold2:"rgba(255,255,255,0.12)"} strokeWidth={iM?1.5:0.7}/>;} )}
        {[["N",0],["E",90],["S",180],["W",270]].map(([l,a])=>{const rad=toRad(a-90);return <text key={l} x={cx+(r-22)*Math.cos(rad)} y={cy+(r-22)*Math.sin(rad)+4} textAnchor="middle" fontSize="10" fill={C.gold} fontWeight="700">{l}</text>;})}
        <line x1={cx} y1={cy} x2={tv.x} y2={tv.y} stroke={C.white} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1={cx} y1={cy} x2={mn.x} y2={mn.y} stroke={C.blue2} strokeWidth="2" strokeLinecap="round" strokeDasharray="5,3"/>
        <line x1={cx} y1={cy} x2={cn.x} y2={cn.y} stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeDasharray="3,2"/>
        <circle cx={cx} cy={cy} r="4" fill={C.gold}/>
        <rect x="210" y="10" width="76" height="56" rx="7" fill="rgba(0,0,0,0.55)" stroke={C.border}/>
        <line x1="216" y1="24" x2="236" y2="24" stroke={C.white} strokeWidth="2"/>
        <text x="240" y="28" fontSize="7" fill={C.white}>{lang==="fr"?"Nord Vrai":lang==="en"?"True North":lang==="es"?"Norte Verd.":"Norte Verd."}</text>
        <line x1="216" y1="38" x2="236" y2="38" stroke={C.blue2} strokeWidth="2" strokeDasharray="5,3"/>
        <text x="240" y="42" fontSize="7" fill={C.blue2}>{lang==="fr"?"Nord Magn.":lang==="en"?"Mag. North":lang==="es"?"Norte Magn.":"Norte Magn."}</text>
        <line x1="216" y1="52" x2="236" y2="52" stroke={C.red} strokeWidth="2" strokeDasharray="3,2"/>
        <text x="240" y="56" fontSize="7" fill={C.red}>{lang==="fr"?"Nord Compas":lang==="en"?"Compass N.":lang==="es"?"Norte Brúj.":"Norte Bús."}</text>
        <text x={cx+18} y={cy-55} fontSize="8" fill={C.blue2}>d={decl}°</text>
        <text x={cx+36} y={cy-36} fontSize="8" fill={C.red}>δ={dev}°</text>
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:6}}>
        {[{label:`d: ${decl>0?"+":""}${decl}°`,val:decl,set:setDecl,c:C.blue2},{label:`δ: ${dev>0?"+":""}${dev}°`,val:dev,set:setDev,c:C.red}].map((s,i)=>(
          <div key={i}><div style={{fontSize:10,color:s.c,marginBottom:3,fontWeight:600}}>{s.label}</div>
          <input type="range" min="-15" max="15" value={s.val} onChange={e=>s.set(Number(e.target.value))} style={{width:"100%",accentColor:s.c}}/></div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — DEVIATION CURVE
// ══════════════════════════════════════
function DeviationTable({ lang }) {
  const [sel, setSel] = useState(null);
  const data = [{cc:0,d:2},{cc:45,d:4},{cc:90,d:3},{cc:135,d:1},{cc:180,d:-2},{cc:225,d:-4},{cc:270,d:-3},{cc:315,d:-1},{cc:360,d:2}];
  const W=290,H=145,pL=32,pR=12,pT=16,pB=26,mD=5;
  const cW=W-pL-pR, cH=H-pT-pB;
  const xP=cc=>pL+(cc/360)*cW, yP=d=>pT+cH/2-(d/mD)*(cH/2);
  const path=data.map((d,i)=>`${i===0?"M":"L"}${xP(d.cc)},${yP(d.d)}`).join(" ");
  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#0a1628" rx="8"/>
        <line x1={pL} y1={pT+cH/2} x2={W-pR} y2={pT+cH/2} stroke={C.gold} strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
        {[-4,-2,0,2,4].map(v=><g key={v}><line x1={pL} y1={yP(v)} x2={W-pR} y2={yP(v)} stroke="rgba(255,255,255,0.05)" strokeWidth="0.7"/><text x={pL-4} y={yP(v)+4} textAnchor="end" fontSize="7" fill={v===0?C.gold:C.muted}>{v>0?`+${v}°`:`${v}°`}</text></g>)}
        {[0,90,180,270,360].map(c=><g key={c}><line x1={xP(c)} y1={pT} x2={xP(c)} y2={H-pB} stroke="rgba(255,255,255,0.05)" strokeWidth="0.7"/><text x={xP(c)} y={H-pB+10} textAnchor="middle" fontSize="7" fill={C.muted}>{c}°</text></g>)}
        <path d={path} fill="none" stroke={C.blue2} strokeWidth="2" strokeLinejoin="round"/>
        <path d={`${path} L${xP(360)},${pT+cH/2} L${pL},${pT+cH/2} Z`} fill={C.blue2} opacity="0.1"/>
        {data.slice(0,-1).map(d=>(
          <g key={d.cc} onClick={()=>setSel(sel===d.cc?null:d.cc)} style={{cursor:"pointer"}}>
            <circle cx={xP(d.cc)} cy={yP(d.d)} r={sel===d.cc?7:5} fill={sel===d.cc?C.gold:C.blue2}/>
            {sel===d.cc&&<g>
              <rect x={xP(d.cc)-28} y={yP(d.d)-28} width={56} height={22} rx={5} fill="rgba(6,14,26,0.9)" stroke={C.gold} strokeWidth="0.8"/>
              <text x={xP(d.cc)} y={yP(d.d)-17} textAnchor="middle" fontSize="8" fill={C.gold} fontWeight="700">CC={d.cc}°</text>
              <text x={xP(d.cc)} y={yP(d.d)-8} textAnchor="middle" fontSize="8" fill={C.blue2} fontWeight="700">δ={d.d>0?"+":""}{d.d}°{d.d>=0?"E":"W"}</text>
            </g>}
          </g>
        ))}
        <text x={W/2} y={pT-2} textAnchor="middle" fontSize="7" fill={C.muted}>
          {lang==="fr"?"Courbe de déviation — toucher les points":lang==="en"?"Deviation curve — tap points":lang==="es"?"Curva de desvío — toca los puntos":"Curva de desvio — toque os pontos"}
        </text>
      </svg>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — CALCULATOR
// ══════════════════════════════════════
function CapCalculator({ lang }) {
  const [val, setVal] = useState(85);
  const [dev, setDev] = useState(3);
  const [decl, setDecl] = useState(2);
  const [mode, setMode] = useState("fwd");
  const norm = v => ((v%360)+360)%360;
  const cm=norm(val+dev), cv=norm(cm+decl);
  const rcm=norm(val-decl), rcc=norm(rcm-dev);
  const fwdLabels={fr:["CC","CM","CV"],en:["CC","MC","TC"],es:["RC","RM","RV"],pt:["RB","RM","RV"]};
  const labels=fwdLabels[lang]||fwdLabels.fr;
  const fwdSteps=[{l:labels[0],v:norm(val),c:C.red},{l:labels[1],v:mode==="fwd"?cm:rcm,c:C.blue2},{l:labels[2],v:mode==="fwd"?cv:rcc,c:C.green}];
  const rvrSteps=[{l:labels[2],v:norm(val),c:C.green},{l:labels[1],v:rcm,c:C.blue2},{l:labels[0],v:rcc,c:C.red}];
  const steps=mode==="fwd"?fwdSteps:rvrSteps;
  const arrows=mode==="fwd"?[`+δ(${dev>=0?"+":""}${dev}°)`,`+d(${decl>=0?"+":""}${decl}°)`]:[`-d(${decl>=0?"-":""}${decl}°)`,`-δ(${dev>=0?"-":""}${dev}°)`];
  const mL={fr:{fwd:"CC → CV",bwd:"CV → CC"},en:{fwd:"CC → TC",bwd:"TC → CC"},es:{fwd:"RC → RV",bwd:"RV → RC"},pt:{fwd:"RB → RV",bwd:"RV → RB"}};
  const ml=mL[lang]||mL.fr;
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {["fwd","bwd"].map(m=>(
          <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"9px 0",borderRadius:12,background:mode===m?`linear-gradient(135deg,${C.blue}44,${C.gold}22)`:"rgba(255,255,255,0.05)",border:`1.5px solid ${mode===m?C.gold:"rgba(255,255,255,0.1)"}`,color:mode===m?C.white:C.muted,fontSize:13,fontWeight:mode===m?700:400,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {m==="fwd"?ml.fwd:ml.bwd}
          </button>
        ))}
      </div>
      <input type="number" min="0" max="359" value={val} onChange={e=>setVal(Number(e.target.value)||0)}
        style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${C.border}`,color:C.white,fontSize:22,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box",marginBottom:12}}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        {[{l:`δ: ${dev>=0?"+":""}${dev}°`,v:dev,s:setDev,c:C.red},{l:`d: ${decl>=0?"+":""}${decl}°`,v:decl,s:setDecl,c:C.blue2}].map((s,i)=>(
          <div key={i}><div style={{fontSize:10,color:s.c,marginBottom:2,fontWeight:600}}>{s.l}</div>
          <input type="number" min="-20" max="20" value={s.v} onChange={e=>s.s(Number(e.target.value)||0)}
            style={{width:"100%",padding:"7px",borderRadius:8,background:"rgba(255,255,255,0.07)",border:`1px solid ${s.c}44`,color:s.c,fontSize:14,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/></div>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5,flexWrap:"wrap"}}>
        {steps.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{padding:"9px 12px",borderRadius:14,textAlign:"center",background:`${s.c}18`,border:`1.5px solid ${s.c}55`,minWidth:65}}>
              <div style={{fontSize:9,color:s.c,fontFamily:"'Cinzel',serif",marginBottom:2}}>{s.l}</div>
              <div style={{fontSize:19,fontWeight:800,color:s.c,fontFamily:"monospace"}}>{String(s.v).padStart(3,"0")}°</div>
            </div>
            {i<2&&<div style={{fontSize:10,color:C.gold2,fontWeight:700,padding:"3px 6px",borderRadius:8,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,whiteSpace:"nowrap"}}>{arrows[i]}</div>}
          </div>
        ))}
      </div>
      <div style={{marginTop:10,padding:"8px",borderRadius:10,background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,fontSize:11,color:C.muted,textAlign:"center"}}>
        {lang==="fr"?"Est → Ajouter (+) · Ouest → Soustraire (-)":lang==="en"?"East → Add (+) · West → Subtract (-)":lang==="es"?"Este → Sumar (+) · Oeste → Restar (-)":"Este → Somar (+) · Oeste → Subtrair (-)"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — DRIFT SIMULATOR
// ══════════════════════════════════════
function DriftSimulator({ lang }) {
  const [sc2, setSc] = useState(90);
  const [cDir, setCDir] = useState(0);
  const [cSpd, setCSpd] = useState(2);
  const [wFrc, setWFrc] = useState(4);
  const toRad=d=>d*Math.PI/180, cx=140,cy=110,sc=6;
  const sv={x:12*sc*Math.sin(toRad(sc2)),y:-12*sc*Math.cos(toRad(sc2))};
  const cv2={x:cSpd*sc*Math.sin(toRad(cDir)),y:-cSpd*sc*Math.cos(toRad(cDir))};
  const wv={x:wFrc*0.4*2.5*Math.sin(toRad(sc2+90)),y:-wFrc*0.4*2.5*Math.cos(toRad(sc2+90))};
  const res={x:sv.x+cv2.x+wv.x,y:sv.y+cv2.y+wv.y};
  const rA=((Math.atan2(res.x,-res.y)*180/Math.PI)+360)%360;
  const rSpd=Math.sqrt(res.x*res.x+res.y*res.y)/sc;
  const da=Math.abs(rA-sc2), drift=da>180?360-da:da;
  const eS={x:cx+sv.x,y:cy+sv.y}, eC={x:eS.x+cv2.x,y:eS.y+cv2.y};
  const Ar=({x1,y1,x2,y2,color,dash})=>{
    const a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" strokeDasharray={dash||""} strokeLinecap="round"/><polygon points="0,-5 4,4 -4,4" fill={color} transform={`translate(${x2},${y2}) rotate(${a+90})`}/></g>;
  };
  const L={fr:{sc:"Cap",cd:"Courant",cog:"Route fond",dr:"Dérive"},en:{sc:"Course",cd:"Current",cog:"COG",dr:"Drift"},es:{sc:"Rumbo",cd:"Corriente",cog:"Derrota",dr:"Deriva"},pt:{sc:"Rumo",cd:"Corrente",cog:"Rumo fundo",dr:"Deriva"}};
  const lb=L[lang]||L.fr;
  return (
    <div>
      <svg width="280" height="190" viewBox="0 0 280 190">
        <rect width="280" height="190" fill="#061020" rx="8"/>
        {[cy-60,cy-30,cy,cy+30,cy+60].map(y=><line key={y} x1="10" y1={y} x2="270" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.7"/>)}
        {[cx-60,cx-30,cx,cx+30,cx+60].map(x=><line key={x} x1={x} y1="10" x2={x} y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7"/>)}
        <circle cx={cx} cy={cy} r="4" fill={C.gold}/>
        <Ar x1={cx} y1={cy} x2={eS.x} y2={eS.y} color={C.blue2}/>
        <Ar x1={eS.x} y1={eS.y} x2={eC.x} y2={eC.y} color={C.green}/>
        <Ar x1={cx} y1={cy} x2={cx+res.x} y2={cy+res.y} color={C.gold2}/>
        <rect x="170" y="8" width="104" height="66" rx="6" fill="rgba(0,0,0,0.6)" stroke={C.border}/>
        <line x1="176" y1="22" x2="196" y2="22" stroke={C.blue2} strokeWidth="2"/>
        <text x="200" y="26" fontSize="7" fill={C.blue2}>{lb.sc}: {sc2}°</text>
        <line x1="176" y1="36" x2="196" y2="36" stroke={C.green} strokeWidth="2"/>
        <text x="200" y="40" fontSize="7" fill={C.green}>{lb.cd}: {cDir}°/{cSpd}kn</text>
        <line x1="176" y1="50" x2="196" y2="50" stroke={C.gold2} strokeWidth="2"/>
        <text x="200" y="54" fontSize="7" fill={C.gold2}>{lb.cog}: {rA.toFixed(0)}°</text>
        <text x="200" y="68" fontSize="7" fill={drift>5?C.red:drift>2?C.orange:C.green}>{lb.dr}: {drift.toFixed(1)}°</text>
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        {[{l:`${lb.sc}: ${sc2}°`,v:sc2,s:setSc,min:0,max:359,c:C.blue2},{l:`${lb.cd}: ${cDir}°`,v:cDir,s:setCDir,min:0,max:359,c:C.green},{l:`${lb.cd} (kn): ${cSpd}`,v:cSpd,s:setCSpd,min:0,max:5,c:C.green},{l:`Vent (Bf): ${wFrc}`,v:wFrc,s:setWFrc,min:0,max:12,c:C.orange}].map((s,i)=>(
          <div key={i}><div style={{fontSize:10,color:s.c,marginBottom:3,fontWeight:600}}>{s.l}</div>
          <input type="range" min={s.min} max={s.max} value={s.v} onChange={e=>s.s(Number(e.target.value))} style={{width:"100%",accentColor:s.c}}/></div>
        ))}
      </div>
      <div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        {[{l:lb.cog,v:`${rA.toFixed(0)}°`,c:C.gold2},{l:"SOG",v:`${rSpd.toFixed(1)}kn`,c:C.gold2},{l:lb.dr,v:`${drift.toFixed(1)}°`,c:drift>5?C.red:drift>2?C.orange:C.green}].map((r,i)=>(
          <div key={i} style={{padding:"8px",borderRadius:10,background:`${r.c}15`,border:`1px solid ${r.c}33`,textAlign:"center"}}>
            <div style={{fontSize:9,color:C.muted,marginBottom:2}}>{r.l}</div>
            <div style={{fontSize:16,fontWeight:800,color:r.c,fontFamily:"monospace"}}>{r.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:""});
  const [showC, setShowC] = useState(false);
  const correct={q1:98,q2:100};
  const qs={fr:[{id:"q1",q:"Étape 1 : CM = CC + δ\nCC=095° · δ=+3°E"},{id:"q2",q:"Étape 2 : CV = CM + d\nCM=? · d=+2°E"}],en:[{id:"q1",q:"Step 1: MC = CC + δ\nCC=095° · δ=+3°E"},{id:"q2",q:"Step 2: TC = MC + d\nMC=? · d=+2°E"}],es:[{id:"q1",q:"Paso 1: RM = RC + δ\nRC=095° · δ=+3°E"},{id:"q2",q:"Paso 2: RV = RM + d\nRM=? · d=+2°E"}],pt:[{id:"q1",q:"Passo 1: RM = RB + δ\nRB=095° · δ=+3°E"},{id:"q2",q:"Passo 2: RV = RM + d\nRM=? · d=+2°E"}]};
  const list=qs[lang]||qs.fr;
  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"12px",marginBottom:14,border:`1px solid ${C.gold}44`,textAlign:"center"}}>
        <div style={{display:"flex",justifyContent:"center",gap:10}}>
          {[["CC","095°",C.red],["δ","+3°E",C.orange],["d","+2°E",C.blue2]].map(([l,v,c])=>(
            <div key={l} style={{padding:"8px 12px",borderRadius:10,background:`${c}15`,border:`1px solid ${c}33`}}>
              <div style={{fontSize:9,color:c,fontFamily:"'Cinzel',serif"}}>{l}</div>
              <div style={{fontSize:15,fontWeight:800,color:c,fontFamily:"monospace"}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="number" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))}
            placeholder="0 à 359"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",
              border:`1px solid ${showC?(Number(ans[q.id])===correct[q.id]?C.green:C.red):C.border}`,
              color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:Number(ans[q.id])===correct[q.id]?C.green:C.red}}>{Number(ans[q.id])===correct[q.id]?"✓":`✗ → ${correct[q.id]}°`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:12,color:C.white,lineHeight:1.6,marginBottom:10}}>{lang==="fr"?"✅ CM = 095+3 = 098° · CV = 098+2 = 100°\nRègle : Est=Ajouter · Ouest=Soustraire":lang==="en"?"✅ MC = 095+3 = 098° · TC = 098+2 = 100°\nRule: East=Add · West=Subtract":lang==="es"?"✅ RM = 095+3 = 098° · RV = 098+2 = 100°\nRegla: Este=Sumar · Oeste=Restar":"✅ RM = 095+3 = 098° · RV = 098+2 = 100°\nRegra: Este=Somar · Oeste=Subtrair"}</div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d={fr:{title:"MV Herald of Free Enterprise (1987)",teaser:"Ferry · 193 morts · Zeebrugge · Portes proue ouvertes + procédures non respectées",what:"Le ferry quitte Zeebrugge avec les portes de proue grand ouvertes. En accélérant, l'eau envahit le pont des véhicules. Le navire chavire en 90 secondes. 193 morts.",cause:"• Porte de proue non fermée — assistant bosco endormi\n• Capitaine n'a pas vérifié avant appareillage\n• Aucune alarme passerelle pour portes ouvertes\n• Mauvaise communication pont ↔ passerelle",lessons:"✓ Checklists OBLIGATOIRES avant tout appareillage\n✓ Alarmes pour toutes les ouvertures\n✓ Double vérification cap et équipements\n✓ Résultat : SOLAS modifié · Code ISM créé",link:"🔗 Lien L5 : Les checklists et la rigueur dans les procédures de navigation sauvent des vies."},en:{title:"MV Herald of Free Enterprise (1987)",teaser:"Ferry · 193 deaths · Zeebrugge · Open bow doors + procedures not followed",what:"The ferry left Zeebrugge with bow doors open. Water flooded the car deck. Vessel capsized in 90 seconds. 193 deaths.",cause:"• Bow door not closed — assistant bosun asleep\n• Captain did not verify before departure\n• No bridge alarm for open doors\n• Poor deck ↔ bridge communication",lessons:"✓ MANDATORY checklists before departure\n✓ Alarms for all openings\n✓ Double verification of course and equipment\n✓ Result: SOLAS modified · ISM Code created",link:"🔗 Link L5: Checklists and rigorous navigation procedures save lives."},es:{title:"MV Herald of Free Enterprise (1987)",teaser:"Ferry · 193 muertos · Zeebrugge · Puertas abiertas + procedimientos ignorados",what:"El ferry salió con las puertas de proa abiertas. El agua inundó la cubierta de vehículos. El buque zozobró en 90 segundos. 193 muertos.",cause:"• Puerta de proa no cerrada — contramaestre dormido\n• Capitán no verificó antes de zarpar\n• Sin alarma en el puente para puertas abiertas",lessons:"✓ Listas de verificación OBLIGATORIAS antes de zarpar\n✓ Alarmas para todas las aberturas\n✓ Resultado: SOLAS modificado · Código ISM creado",link:"🔗 Vínculo L5: Los procedimientos rigurosos de navegación salvan vidas."},pt:{title:"MV Herald of Free Enterprise (1987)",teaser:"Ferry · 193 mortos · Zeebrugge · Portas abertas + procedimentos ignorados",what:"O ferry saiu com as portas de proa abertas. A água inundou o convés de veículos. O navio tombou em 90 segundos. 193 mortos.",cause:"• Porta de proa não fechada — assistente dormindo\n• Capitão não verificou antes de zarpar\n• Sem alarme na ponte para portas abertas",lessons:"✓ Checklists OBRIGATÓRIAS antes de zarpar\n✓ Alarmes para todas as aberturas\n✓ Resultado: SOLAS modificado · Código ISM criado",link:"🔗 Vínculo L5: Procedimentos rigorosos de navegação salvam vidas."}};
  const c=d[lang]||d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>⚠️</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"CAUSES":"CAUSES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ DATA
// ══════════════════════════════════════
const QUIZ={
  fr:[
    {q:"CC=085° · δ=+3°E · d=+2°E — Quel est le Cap Vrai (CV) ?",opts:["080°","088°","090°","092°"],correct:2,expl:"CV = CC + δ + d = 085 + 3 + 2 = 090°. Règle : Est = Ajouter. Les deux corrections sont Est → on additionne les deux."},
    {q:"Quelle est la différence entre déviation (δ) et déclinaison (d) ?",opts:["C'est la même chose","δ = erreur du compas due au navire · d = angle Nord Vrai/Nord Magnétique terrestre","δ = déclinaison à haute latitude · d = erreur locale","d = erreur du compas · δ = erreur de la carte"],correct:1,expl:"Déviation (δ) = erreur propre au compas du navire (acier, moteurs). Varie selon le cap. Déclinaison (d) = angle entre Nord Vrai et Nord Magnétique terrestre. Varie selon la position géographique et le temps."},
    {q:"Le gyrocompas pointe vers :",opts:["Le Nord Magnétique","Le Nord du compas de bord","Le Nord Vrai (pôle géographique)","Le Nord GPS"],correct:2,expl:"Le gyrocompas utilise un gyroscope et la force de Coriolis pour s'aligner sur l'axe de rotation de la Terre → il pointe vers le NORD VRAI. Avantage : pas de déviation, pas de déclinaison. Obligatoire sur les navires > 500 TB."},
    {q:"Un navire fait cap 090° à 12 nœuds. Un courant Set 000° (Nord), Drift 2 nœuds. Vers où dérive le navire ?",opts:["Vers le Sud","Vers le Nord — le courant pousse dans sa direction","Vers l'Est — la vitesse augmente","Aucune dérive"],correct:1,expl:"Le courant SET 000° (Nord) pousse le navire vers le Nord pendant qu'il avance vers l'Est. La route fond sera légèrement au nord du cap 090°. C'est la dérive par le courant."},
    {q:"CV=180° · d=-3°W · δ=+2°E — Quel Cap Compas (CC) gouverner ?",opts:["175°","179°","181°","185°"],correct:2,expl:"Sens inverse : CM = CV - d = 180-(-3) = 183°. CC = CM - δ = 183-(+2) = 181°. Vérification : 181+2-3=180°=CV ✓. Attention aux signes : W=négatif, E=positif."},
  ],
  en:[
    {q:"CC=085° · δ=+3°E · d=+2°E — What is the True Course (TC)?",opts:["080°","088°","090°","092°"],correct:2,expl:"TC = CC + δ + d = 085 + 3 + 2 = 090°. Rule: East = Add. Both corrections are East → add both."},
    {q:"What is the difference between deviation (δ) and magnetic declination (d)?",opts:["They are the same","δ = compass error due to vessel · d = True/Magnetic North angle","δ = declination at high latitudes","d = compass error · δ = chart error"],correct:1,expl:"Deviation (δ) = vessel's own compass error (steel, motors). Varies with heading. Declination (d) = angle between True North and Magnetic North. Varies with geographic position and time."},
    {q:"The gyrocompass points toward:",opts:["Magnetic North","Compass North","True North (geographic pole)","GPS North"],correct:2,expl:"The gyrocompass uses a gyroscope and Coriolis force to align with Earth's rotation axis → True North. No deviation, no declination needed. Mandatory on vessels > 500 GT."},
    {q:"A vessel steers 090° at 12 knots. Current Set 000° (North), Drift 2 knots. Where does the vessel drift?",opts:["South","North — current pushes in its direction","East — speed increases","No drift"],correct:1,expl:"The current SET 000° (North) pushes the vessel northward while it advances eastward. The track made good will be slightly north of course 090°."},
    {q:"TC=180° · d=-3°W · δ=+2°E — What Compass Course (CC) to steer?",opts:["175°","179°","181°","185°"],correct:2,expl:"Reverse: MC = TC - d = 180-(-3) = 183°. CC = MC - δ = 183-(+2) = 181°. Check: 181+2-3=180°=TC ✓."},
  ],
  es:[
    {q:"RC=085° · δ=+3°E · d=+2°E — ¿Cuál es el Rumbo Verdadero (RV)?",opts:["080°","088°","090°","092°"],correct:2,expl:"RV = RC + δ + d = 085 + 3 + 2 = 090°. Regla: Este = Sumar. Ambas correcciones son Este → se suman."},
    {q:"¿Cuál es la diferencia entre desvío (δ) y declinación (d)?",opts:["Son lo mismo","δ = error del compás por el buque · d = ángulo Norte Verdadero/Norte Magnético","δ = declinación en latitudes altas","d = error del compás · δ = error de la carta"],correct:1,expl:"Desvío (δ) = error propio del compás del buque. Varía según el rumbo. Declinación (d) = ángulo entre Norte Verdadero y Norte Magnético. Varía según posición y tiempo."},
    {q:"El girocompás apunta hacia:",opts:["El Norte Magnético","El Norte del compás","El Norte Verdadero (polo geográfico)","El Norte GPS"],correct:2,expl:"El girocompás usa un giroscopio y la fuerza de Coriolis → apunta al Norte Verdadero. Sin desvío ni declinación. Obligatorio en buques > 500 TB."},
    {q:"Un buque navega al rumbo 090° a 12 nudos. Corriente Set 000° (Norte), Drift 2 nudos. ¿Hacia dónde deriva?",opts:["Al Sur","Al Norte — la corriente empuja en su dirección","Al Este","Sin deriva"],correct:1,expl:"La corriente SET 000° empuja el buque hacia el Norte mientras avanza al Este. La derrota real será ligeramente al norte del rumbo 090°."},
    {q:"RV=180° · d=-3°O · δ=+2°E — ¿Qué RC gobernar?",opts:["175°","179°","181°","185°"],correct:2,expl:"RM = RV - d = 180-(-3) = 183°. RC = RM - δ = 183-2 = 181°. Comprobación: 181+2-3=180°=RV ✓."},
  ],
  pt:[
    {q:"RB=085° · δ=+3°E · d=+2°E — Qual é o Rumo Verdadeiro (RV)?",opts:["080°","088°","090°","092°"],correct:2,expl:"RV = RB + δ + d = 085 + 3 + 2 = 090°. Regra: Este = Somar. Ambas as correções são Este → somam-se."},
    {q:"Qual é a diferença entre desvio (δ) e declinação (d)?",opts:["São a mesma coisa","δ = erro da bússola por causa do navio · d = ângulo Norte Verdadeiro/Norte Magnético","δ = declinação em altas latitudes","d = erro da bússola · δ = erro da carta"],correct:1,expl:"Desvio (δ) = erro próprio da bússola do navio. Varia com o rumo. Declinação (d) = ângulo entre Norte Verdadeiro e Norte Magnético. Varia com posição e tempo."},
    {q:"A girobússola aponta para:",opts:["O Norte Magnético","O Norte da Bússola","O Norte Verdadeiro (polo geográfico)","O Norte GPS"],correct:2,expl:"A girobússola usa giroscópio e força de Coriolis → aponta para o Norte Verdadeiro. Sem desvio nem declinação. Obrigatória em navios > 500 AB."},
    {q:"Um navio navega rumo 090° a 12 nós. Corrente Set 000° (Norte), Drift 2 nós. Para onde deriva?",opts:["Para Sul","Para Norte — a corrente empurra na sua direção","Para Este","Sem deriva"],correct:1,expl:"A corrente SET 000° empurra o navio para Norte enquanto avança para Este. O rumo de fundo será ligeiramente ao norte do rumo 090°."},
    {q:"RV=180° · d=-3°O · δ=+2°E — Que RB governar?",opts:["175°","179°","181°","185°"],correct:2,expl:"RM = RV - d = 180-(-3) = 183°. RB = RM - δ = 183-2 = 181°. Verificação: 181+2-3=180°=RV ✓."},
  ],
};

// ══════════════════════════════════════
// BANQUE 15 QUESTIONS
// ══════════════════════════════════════
const BANK=[
  {q:"Formule de conversion CC → CV. Que représente chaque terme ?",opts:["CV = CC - δ - d","CV = CC + δ + d (δ=déviation, d=déclinaison, Est=+, Ouest=-)","CV = CC × (δ + d)","CV = CC / δ"],correct:1,expl:"CV = CC + δ + d. δ = déviation (+ si Est, - si Ouest). d = déclinaison (+ si Est, - si Ouest). Est = Ajouter. Ouest = Soustraire. Pour CV→CC, on fait l'inverse."},
  {q:"La déviation d'un compas varie selon :",opts:["La position géographique du navire","Le cap du navire (les masses métalliques se réorientent selon la direction)","La saison et la météo","La vitesse uniquement"],correct:1,expl:"La déviation varie selon le CAP du navire car les masses métalliques et les champs électriques du bord se réorientent différemment selon la direction pointée. C'est pourquoi on utilise une table de déviation avec δ pour chaque cap compas."},
  {q:"La déclinaison au large du Cameroun (Golfe de Guinée) est approximativement :",opts:["15°E (très forte)","8°W (forte)","0° à 1°W (quasi nulle)","45°E (extrême)"],correct:2,expl:"Au large du Cameroun et du Golfe de Guinée, la déclinaison magnétique est quasi nulle (0° à 1°W). Zone favorable pour la navigation au compas magnétique car la correction est minimale."},
  {q:"CC=135° · δ=-2°W · d=+4°E — Calculez CV.",opts:["129°","133°","137°","141°"],correct:2,expl:"CV = CC + δ + d = 135 + (-2) + 4 = 137°. W=négatif (-2°), E=positif (+4°). Calcul : 135 - 2 + 4 = 137°."},
  {q:"Quelle est la différence entre 'Set' et 'Drift' d'un courant ?",opts:["Set=vitesse · Drift=direction","Set=direction vers où va le courant · Drift=vitesse du courant","Set=courant surface · Drift=courant fond","Identiques"],correct:1,expl:"SET = direction vers laquelle VA le courant (ex: Set 045° = courant allant vers NE). DRIFT = vitesse du courant en nœuds (ex: Drift 1,5 kn)."},
  {q:"Un navire fait cap 000°N à 10 kn. Courant Set 090°E, Drift 3 kn. Vers où dérive le navire ?",opts:["Il reste cap 000°","Vers l'Est — route fond entre 000° et 090°","Vers l'Ouest","Il accélère seulement"],correct:1,expl:"Le courant pousse vers l'Est (090°) pendant que le navire va vers le Nord. La route fond résultante sera entre 000° et 090° — légèrement à l'Est du Nord."},
  {q:"La dérive par le vent (leeway) dépend de :",opts:["La couleur de la coque","Force du vent, surface des superstructures, vitesse du navire, type de navire","La profondeur sous la quille","Le nombre de membres d'équipage"],correct:1,expl:"Leeway = dérive vent. Dépend de : force du vent, surface des superstructures (navires hauts = plus de dérive), vitesse navire (plus rapide = moins de dérive), type de navire (porte-conteneurs très sensible). Estimation : 1° à 15°."},
  {q:"CV=270° · d=-5°W · δ=-3°W — Calculez CC.",opts:["262°","268°","278°","284°"],correct:2,expl:"CM = CV - d = 270-(-5) = 275°. CC = CM - δ = 275-(-3) = 278°. Vérification : 278+(-3)+(-5) = 278-3-5 = 270°=CV ✓."},
  {q:"Le courant de Benguela (Afrique occidentale) :",opts:["Va vers le Sud le long des côtes","Va vers le Nord — affecte les navires au Cameroun","Courant chaud vers l'Afrique de l'Ouest","Va vers l'Est"],correct:1,expl:"Le courant de Benguela remonte vers le Nord le long des côtes africaines occidentales (Angola→Cameroun→Nigeria). Courant froid venant du sud. Drift ~0,5 à 1 nœud. Crée une dérive vers le Nord pour les navires dans la région."},
  {q:"Qu'est-ce que le triangle des vitesses ?",opts:["Signalisation portuaire","Construction vectorielle : vecteur cap + vecteur courant = vecteur route fond","Calcul des marées","Système de relèvements sur 3 amers"],correct:1,expl:"Triangle des vitesses = construction vectorielle : (1) Tracer vecteur cap+vitesse. (2) Ajouter vecteur courant (Set+Drift). (3) La résultante = route fond + vitesse fond. Permet d'anticiper la dérive et corriger le cap."},
  {q:"Le gyrocompas a besoin de combien de temps pour se stabiliser ?",opts:["30 secondes","4 à 6 heures","24 heures","Instantané"],correct:1,expl:"Le gyrocompas nécessite 4 à 6 heures pour se stabiliser vers le Nord Vrai. On le met en route avant l'appareillage. Aux latitudes polaires (>75°), il devient moins fiable."},
  {q:"Le cap fond (COG) donné par le GPS représente :",opts:["Le cap compas affiché sur la boussole","La direction réelle du déplacement du navire incluant dérive courant et vent","Le cap vrai sans correction","Le cap vers la prochaine bouée"],correct:1,expl:"COG (Course Over Ground) = direction réelle du déplacement par rapport au fond. Il inclut les effets du courant et du vent. COG ≠ cap vrai si courant/vent présent."},
  {q:"CC=000° · δ=0° · d=+10°E — Calculez CV.",opts:["350°","000°","010°","020°"],correct:2,expl:"CV = CC + δ + d = 000 + 0 + 10 = 010°. Seule la déclinaison de 10°E s'applique. Cap compas 000° = cap vrai 010° à cause de la déclinaison Est de 10°."},
  {q:"Pour compenser la dérive par le courant, on doit :",opts:["Augmenter la vitesse uniquement","Corriger le cap dans le sens OPPOSÉ au courant","Réduire la vitesse","Ne rien faire — le GPS corrige automatiquement"],correct:1,expl:"Pour compenser la dérive par le courant, on pointe le cap légèrement CONTRE le courant. Ex : courant vers l'Est + on veut aller Nord → gouverner légèrement à l'Ouest du Nord (ex: 355° au lieu de 000°)."},
  {q:"La rose des vents divise l'horizon en combien de parties ?",opts:["8 parties","16 parties","32 aires de vent","360 degrés égaux"],correct:2,expl:"La rose traditionnelle = 32 aires de vent (N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSO, SO, OSO, O, ONO, NO, NNO + subdivisions). En navigation moderne : degrés 0°-360°. N=000°, E=090°, S=180°, O=270°."},
];

// ══════════════════════════════════════
// BANK COMPONENT
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const q=BANK[cur];
  const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<BANK.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done) return (
    <div style={{textAlign:"center",padding:"20px 0"}}>
      <div style={{fontSize:48,marginBottom:8}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{BANK.length}</div>
      <div style={{fontSize:14,color:C.gold2}}>{Math.round(score/BANK.length*100)}%</div>
    </div>
  );
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:10,color:C.muted}}>{cur+1}/{BANK.length}</div>
        <div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div>
      </div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(cur/BANK.length)*100}%`,background:`linear-gradient(90deg,${C.purple},${C.gold2})`}}/>
      </div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{opt}</button>;
        })}
      </div>
      {answered&&<>
        <div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
        <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.purple},${C.blue})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>
          {cur<BANK.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":"FINISH")}
        </button>
      </>}
    </div>
  );
}

// ══════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════
function Stars(){
  const s=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));
  return (
    <>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        {s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}
      </div>
      <style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style>
    </>
  );
}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════
// QUIZ COMPONENT
// ══════════════════════════════════════
function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center",border:`1px solid ${pct>=80?C.gold:C.border}`}}><div style={{fontSize:11,letterSpacing:3,color:C.gold,marginBottom:14,fontFamily:"'Cinzel',serif"}}>{t.result}</div><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════
// CONTENT BLOCKS
// ══════════════════════════════════════
const getContent = lang => {
  const L = {
    fr:{b1:"📚 Navigation & Cartographie · Leçon 5/8 · ⭐ Premium · 200 XP",b2:"Le Compas & Les Caps — CC / CM / CV",intro:"Le compas magnétique indique le nord... mais lequel ?\n\nIl existe 3 « nords » différents en navigation :\n• Le Nord Vrai (pôle géographique) — utilisé sur les cartes\n• Le Nord Magnétique — utilisé par les compas\n• Le Nord Compas (vu par votre compas de bord)\n\nSavoir convertir entre ces 3 nords est fondamental.",p1:"PARTIE 1 — LES 3 TYPES DE CAPS",p2:"PARTIE 2 — DÉCLINAISON & DÉVIATION",p3:"PARTIE 3 — CALCULATEUR CC ↔ CV",p4:"PARTIE 4 — LES COMPAS",p5:"PARTIE 5 — DÉRIVE VENT & COURANT",p6:"🎯 EXERCICE AVANCÉ PREMIUM",p7:"⚠️ CAS RÉEL D'ACCIDENT",p8:"📝 BANQUE DE QUESTIONS — 15 QUESTIONS PREMIUM",s1t:"CC, CM et CV — Définitions",s1:"CC = Cap Compas : lecture directe du compas.\nAffecté par la déviation (δ) ET la déclinaison (d).\n\nCM = Cap Magnétique : CC corrigé de δ.\n\nCV = Cap Vrai : CM corrigé de d.\nC'est le cap utilisé sur les cartes marines.\n\nFORMULE FONDAMENTALE :\nCV = CC + δ + d\nEst = Ajouter (+) · Ouest = Soustraire (-)\n\nMNÉMO : 'Cadavres Donnent Mauvaises Vibrations'\nCC + Déviation = CM · CM + déclinAison = CV",s2t:"Déclinaison (d) et Déviation (δ)",s2:"DÉCLINAISON (d) :\nAngle entre Nord Vrai et Nord Magnétique.\nVarie selon la POSITION et le TEMPS.\nE(+) ou W(-).\n\nExemples :\n• Golfe de Guinée : ~0° à 1°W (quasi nulle !)\n• Manche : ~2°W · Atlantique Nord : ~20°W\n\nDÉVIATION (δ) :\nErreur propre au compas du navire (acier, moteurs).\nVarie selon le CAP du navire.\nMesurée dans une TABLE DE DÉVIATION.\n\nCC 000°→+2°E · CC 090°→+3°E\nCC 180°→-2°W · CC 270°→-3°W",s3t:"Compas Magnétique vs Gyrocompas",s3:"COMPAS MAGNÉTIQUE :\n✅ Pas d'alimentation · ✅ SOLAS obligatoire\n❌ Corrections δ + d nécessaires\n\nGYROCOMPAS :\n✅ Nord Vrai direct · ✅ Pas de corrections\n❌ Alimentation requise · ❌ 4-6h démarrage\n\nGPS — Cap fond (COG) :\nDirection réelle du déplacement.\nCOG ≠ cap vrai si courant/vent présent !",s4t:"Les 2 sources de dérive",s4:"1. DÉRIVE VENT (Leeway) :\n→ Direction : sous le vent\n→ Estimation : 1° à 15° selon force du vent\n\n2. COURANT (Set & Drift) :\nSET = direction vers où va le courant\nDRIFT = vitesse (en nœuds)\n\nGolfe de Guinée — Courant de Benguela :\n→ Remonte vers le Nord le long des côtes africaines\n→ Drift ~0,5 à 1 nœud\n→ Affecte les navires au large du Cameroun !\n\nROUTE FOND = cap + dérive courant + dérive vent",sumT:"RÉSUMÉ — LEÇON 5",sumP:["CC=Cap Compas · CM=Cap Magnétique · CV=Cap Vrai","CV = CC + δ + d · Est=+ · Ouest=-","δ = déviation (propre au navire, selon le cap)","d = déclinaison (terrestre, selon position/temps)","Golfe de Guinée : déclinaison quasi nulle (≈0°)","Gyrocompas → Nord Vrai direct · 4-6h démarrage","SET=direction courant · DRIFT=vitesse courant","Route fond = cap + dérive courant + dérive vent"],learnedP:["CC=Cap Compas · CM=Cap Magnétique · CV=Cap Vrai","CV = CC + δ + d · Est=Ajouter · Ouest=Soustraire","δ = déviation (propre navire, varie avec le cap)","d = déclinaison (terrestre, varie position/temps)","Golfe de Guinée : déclinaison quasi nulle","Gyrocompas → Nord Vrai direct · 4-6h démarrage","SET=direction courant · DRIFT=vitesse courant","Route fond = cap + dérive courant + dérive vent"]},
    en:{b1:"📚 Navigation & Cartography · Lesson 5/8 · ⭐ Premium · 200 XP",b2:"Compass & Courses — CC / MC / TC",intro:"The magnetic compass points to north... but which one?\n\nThere are 3 different 'norths' in navigation:\n• True North (geographic pole) — used on charts\n• Magnetic North — used by compasses\n• Compass North (seen by your vessel's compass)\n\nKnowing how to convert between these 3 norths is fundamental.",p1:"PART 1 — THE 3 TYPES OF COURSES",p2:"PART 2 — DECLINATION & DEVIATION",p3:"PART 3 — CC ↔ TC CALCULATOR",p4:"PART 4 — COMPASSES",p5:"PART 5 — WIND & CURRENT DRIFT",p6:"🎯 ADVANCED PREMIUM EXERCISE",p7:"⚠️ REAL ACCIDENT CASE",p8:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",s1t:"CC, MC and TC — Definitions",s1:"CC = Compass Course: direct compass reading.\nAffected by deviation (δ) AND declination (d).\n\nMC = Magnetic Course: CC corrected for δ.\n\nTC = True Course: MC corrected for d.\nUsed on nautical charts.\n\nFUNDAMENTAL FORMULA:\nTC = CC + δ + d\nEast = Add (+) · West = Subtract (-)\n\nMEMORY: 'Can Dead Men Vote Twice At Elections'\nCC + Deviation = MC · MC + declination = TC",s2t:"Declination (d) and Deviation (δ)",s2:"DECLINATION (d):\nAngle between True North and Magnetic North.\nVaries with POSITION and TIME. E(+) or W(-).\n\nExamples:\n• Gulf of Guinea: ~0° to 1°W (almost zero!)\n• Channel: ~2°W · North Atlantic: ~20°W\n\nDEVIATION (δ):\nVessel's own compass error (steel, motors).\nVaries with vessel HEADING.\nRecorded in a DEVIATION TABLE.\n\nCC 000°→+2°E · CC 090°→+3°E\nCC 180°→-2°W · CC 270°→-3°W",s3t:"Magnetic Compass vs Gyrocompass",s3:"MAGNETIC COMPASS:\n✅ No power needed · ✅ SOLAS mandatory\n❌ δ + d corrections needed\n\nGYROCOMPASS:\n✅ Direct True North · ✅ No corrections\n❌ Power required · ❌ 4-6h startup\n\nGPS — Course Over Ground (COG):\nActual direction of movement.\nCOG ≠ true course if current/wind present!",s4t:"The 2 sources of drift",s4:"1. WIND DRIFT (Leeway):\n→ Direction: downwind\n→ Estimate: 1° to 15° depending on wind force\n\n2. CURRENT DRIFT (Set & Drift):\nSET = direction where current goes\nDRIFT = current speed (knots)\n\nGulf of Guinea — Benguela Current:\n→ Flows northward along African coast\n→ Drift ~0.5 to 1 knot\n→ Affects vessels off Cameroon!\n\nTRACK MADE GOOD = course + current drift + wind",sumT:"SUMMARY — LESSON 5",sumP:["CC=Compass · MC=Magnetic · TC=True Course","TC = CC + δ + d · East=+ · West=-","δ = deviation (vessel-specific, varies with heading)","d = declination (geographic, varies position/time)","Gulf of Guinea: declination almost zero (≈0°)","Gyrocompass → Direct True North · 4-6h startup","SET=current direction · DRIFT=current speed","Track = course + current drift + wind drift"],learnedP:["CC=Compass · MC=Magnetic · TC=True Course","TC = CC + δ + d · East=Add · West=Subtract","δ = deviation (vessel-specific, varies with heading)","d = declination (geographic, varies position/time)","Gulf of Guinea: declination almost zero","Gyrocompass → True North direct · 4-6h startup","SET=current direction · DRIFT=speed","Track = course + current drift + wind drift"]},
    es:{b1:"📚 Navegación & Cartografía · Lección 5/8 · ⭐ Premium · 200 XP",b2:"El Compás & Los Rumbos — RC / RM / RV",intro:"El compás magnético apunta al norte... ¿pero cuál?\n\nHay 3 'nortes' diferentes en navegación:\n• Norte Verdadero (polo geográfico) — usado en cartas\n• Norte Magnético — usado por los compases\n• Norte del Compás (visto por el compás del buque)\n\nSaber convertir entre estos 3 nortes es fundamental.",p1:"PARTE 1 — LOS 3 TIPOS DE RUMBOS",p2:"PARTE 2 — DECLINACIÓN & DESVÍO",p3:"PARTE 3 — CALCULADORA RC ↔ RV",p4:"PARTE 4 — LOS COMPASES",p5:"PARTE 5 — DERIVA VIENTO & CORRIENTE",p6:"🎯 EJERCICIO AVANZADO PREMIUM",p7:"⚠️ CASO REAL DE ACCIDENTE",p8:"📝 BANCO DE PREGUNTAS — 15 PREGUNTAS PREMIUM",s1t:"RC, RM y RV — Definiciones",s1:"RC = Rumbo de Compás: lectura directa del compás.\nAfectado por desvío (δ) Y declinación (d).\n\nRM = Rumbo Magnético: RC corregido por δ.\n\nRV = Rumbo Verdadero: RM corregido por d.\nUsado en cartas náuticas.\n\nFÓRMULA : RV = RC + δ + d\nEste = Sumar (+) · Oeste = Restar (-)",s2t:"Declinación (d) y Desvío (δ)",s2:"DECLINACIÓN (d):\nÁngulo entre Norte Verdadero y Norte Magnético.\nVaría con POSICIÓN y TIEMPO. E(+) u O(-).\n\nEjemplos:\n• Golfo de Guinea: ~0° a 1°O (¡casi nula!)\n• Canal Mancha: ~2°O\n\nDESVÍO (δ):\nError del compás por el buque (acero, motores).\nVaría según el RUMBO del buque.",s3t:"Compás Magnético vs Girocompás",s3:"COMPÁS MAGNÉTICO:\n✅ Sin alimentación · ✅ SOLAS obligatorio\n❌ Correcciones δ + d necesarias\n\nGIROCOMPÁS:\n✅ Norte Verdadero directo · ✅ Sin correcciones\n❌ Requiere alimentación · ❌ 4-6h arranque",s4t:"Las 2 fuentes de deriva",s4:"1. DERIVA VIENTO (Abatimiento):\n→ Dirección: sotavento\n→ Estimación: 1° a 15°\n\n2. CORRIENTE (Set & Drift):\nSET = dirección hacia donde va la corriente\nDRIFT = velocidad (nudos)\n\nGolfo de Guinea — Corriente de Benguela:\n→ Sube hacia el Norte por las costas africanas\n→ Drift ~0,5 a 1 nudo · ¡Afecta buques frente a Camerún!",sumT:"RESUMEN — LECCIÓN 5",sumP:["RC=Compás · RM=Magnético · RV=Verdadero","RV = RC + δ + d · Este=+ · Oeste=-","δ = desvío (del buque, varía con el rumbo)","d = declinación (terrestre, varía posición/tiempo)","Golfo de Guinea: declinación casi nula (≈0°)","Girocompás → Norte Verdadero · 4-6h arranque","SET=dirección corriente · DRIFT=velocidad","Derrota = rumbo + deriva corriente + viento"],learnedP:["RC=Compás · RM=Magnético · RV=Verdadero","RV = RC + δ + d · Este=Sumar · Oeste=Restar","δ = desvío (del buque, varía con el rumbo)","d = declinación (terrestre, varía posición/tiempo)","Golfo de Guinea: declinación casi nula","Girocompás → Norte Verdadero · 4-6h arranque","SET=dirección corriente · DRIFT=velocidad","Derrota = rumbo + deriva corriente + viento"]},
    pt:{b1:"📚 Navegação & Cartografia · Lição 5/8 · ⭐ Premium · 200 XP",b2:"A Bússola & Os Rumos — RB / RM / RV",intro:"A bússola magnética aponta para o norte... mas qual?\n\nHá 3 'nortes' diferentes na navegação:\n• Norte Verdadeiro (polo geográfico) — usado nas cartas\n• Norte Magnético — usado pelas bússolas\n• Norte da Bússola (visto pela bússola do navio)\n\nSaber converter entre estes 3 nortes é fundamental.",p1:"PARTE 1 — OS 3 TIPOS DE RUMOS",p2:"PARTE 2 — DECLINAÇÃO & DESVIO",p3:"PARTE 3 — CALCULADORA RB ↔ RV",p4:"PARTE 4 — AS BÚSSOLAS",p5:"PARTE 5 — DERIVA VENTO & CORRENTE",p6:"🎯 EXERCÍCIO AVANÇADO PREMIUM",p7:"⚠️ CASO REAL DE ACIDENTE",p8:"📝 BANCO DE QUESTÕES — 15 QUESTÕES PREMIUM",s1t:"RB, RM e RV — Definições",s1:"RB = Rumo de Bússola: leitura direta da bússola.\nAfetado por desvio (δ) E declinação (d).\n\nRM = Rumo Magnético: RB corrigido por δ.\n\nRV = Rumo Verdadeiro: RM corrigido por d.\nUsado nas cartas náuticas.\n\nFÓRMULA : RV = RB + δ + d\nEste = Somar (+) · Oeste = Subtrair (-)",s2t:"Declinação (d) e Desvio (δ)",s2:"DECLINAÇÃO (d):\nÂngulo entre Norte Verdadeiro e Norte Magnético.\nVaria com POSIÇÃO e TEMPO. E(+) ou O(-).\n\nExemplos:\n• Golfo da Guiné: ~0° a 1°O (quase nula!)\n• Canal da Mancha: ~2°O\n\nDESVIO (δ):\nErro da bússola causado pelo navio.\nVaria com o RUMO do navio.",s3t:"Bússola Magnética vs Girobússola",s3:"BÚSSOLA MAGNÉTICA:\n✅ Sem alimentação · ✅ SOLAS obrigatória\n❌ Correções δ + d necessárias\n\nGIROBÚSSOLA:\n✅ Norte Verdadeiro direto · ✅ Sem correções\n❌ Requer alimentação · ❌ 4-6h arranque",s4t:"As 2 fontes de deriva",s4:"1. DERIVA VENTO (Abatimento):\n→ Direção: a favor do vento\n→ Estimativa: 1° a 15°\n\n2. CORRENTE (Set & Drift):\nSET = direção para onde vai a corrente\nDRIFT = velocidade (nós)\n\nGolfo da Guiné — Corrente de Benguela:\n→ Sobe para Norte ao longo das costas africanas\n→ Drift ~0,5 a 1 nó · Afeta navios ao largo de Camarões!",sumT:"RESUMO — LIÇÃO 5",sumP:["RB=Bússola · RM=Magnético · RV=Verdadeiro","RV = RB + δ + d · Este=+ · Oeste=-","δ = desvio (do navio, varia com o rumo)","d = declinação (terrestre, varia posição/tempo)","Golfo da Guiné: declinação quase nula (≈0°)","Girobússola → Norte Verdadeiro · 4-6h arranque","SET=direção corrente · DRIFT=velocidade","Rumo fundo = rumo + deriva corrente + vento"],learnedP:["RB=Bússola · RM=Magnético · RV=Verdadeiro","RV = RB + δ + d · Este=Somar · Oeste=Subtrair","δ = desvio (do navio, varia com o rumo)","d = declinação (terrestre, varia posição/tempo)","Golfo da Guiné: declinação quase nula","Girobússola → Norte Verdadeiro · 4-6h arranque","SET=direção corrente · DRIFT=velocidade","Rumo fundo = rumo + deriva corrente + vento"]},
  };
  return L[lang]||L.fr;
};

// ══════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════
export default function LessonCompas({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);
  const progress = phase==="content"?15:phase==="quiz"?70:100;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>

      {/* TOP BAR */}
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{t.lesson} 5/8</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      {/* SCROLL */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {/* CONTENT PHASE */}
          {phase==="content" && (
            <>
              <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.gold,fontWeight:700}}>{lc.b1}</div>
              <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.b2}</h1>
              <Card style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}>
                <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
              </Card>

              <SL icon="🧭" text={lc.p1}/>
              <Card style={{marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div>
                <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div>
              </Card>
              <Card style={{marginBottom:14,textAlign:"center"}}>
                <div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                  🧭 {lang==="fr"?"LES 3 NORDS — INTERACTIF":lang==="en"?"THE 3 NORTHS — INTERACTIVE":lang==="es"?"LOS 3 NORTES — INTERACTIVO":"OS 3 NORTES — INTERATIVO"}
                </div>
                <ThreeNorthsSVG lang={lang}/>
              </Card>

              <SL icon="🌍" text={lc.p2}/>
              <Card style={{marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌍</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div>
                <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div>
              </Card>
              <Card style={{marginBottom:14}}>
                <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                  📊 {lang==="fr"?"COURBE DE DÉVIATION — INTERACTIF":lang==="en"?"DEVIATION CURVE — INTERACTIVE":lang==="es"?"CURVA DE DESVÍO — INTERACTIVO":"CURVA DE DESVIO — INTERATIVO"}
                </div>
                <DeviationTable lang={lang}/>
              </Card>

              <SL icon="🔄" text={lc.p3}/>
              <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.06),rgba(13,31,60,0.8))"}}>
                <div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>
                  🔄 {lc.p3}
                </div>
                <CapCalculator lang={lang}/>
              </Card>

              <SL icon="🧲" text={lc.p4}/>
              <Card style={{marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧲</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div>
                <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div>
              </Card>

              <SL icon="🌊" text={lc.p5}/>
              <Card style={{marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌊</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div>
                <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div>
              </Card>
              <Card style={{marginBottom:14}}>
                <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                  🌊 {lang==="fr"?"SIMULATEUR DE DÉRIVE":lang==="en"?"DRIFT SIMULATOR":lang==="es"?"SIMULADOR DE DERIVA":"SIMULADOR DE DERIVA"}
                </div>
                <DriftSimulator lang={lang}/>
              </Card>

              <SL icon="🎯" text={lc.p6} color={C.gold}/>
              <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
                <Exercise1 lang={lang} t={t}/>
              </Card>

              <SL icon="⚠️" text={lc.p7} color={C.red}/>
              <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

              <SL icon="📝" text={lc.p8} color={C.purple}/>
              <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}>
                <QuestionBank lang={lang}/>
              </Card>

              {/* Summary */}
              <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(26,111,212,0.1),rgba(13,31,60,0.8))",border:`1px solid ${C.blue2}33`}}>
                <div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
                {lc.sumP.map((pt,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                    <span style={{color:C.green,fontWeight:700}}>✓</span>{pt}
                  </div>
                ))}
              </Card>

              <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>{t.startQuiz}</button>
              <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
            </>
          )}

          {/* QUIZ PHASE */}
          {phase==="quiz" && (
            <>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                  {lang==="fr"?"Quiz — Le Compas & Les Caps":lang==="en"?"Quiz — Compass & Courses":lang==="es"?"Quiz — El Compás & Los Rumbos":"Quiz — A Bússola & Os Rumos"}
                </div>
                <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 5":lang==="en"?"questions · Lesson 5":lang==="es"?"preguntas · Lección 5":"perguntas · Lição 5"}</div>
              </div>
              <QuizComp questions={quiz} t={t} onComplete={s=>{ setQuizScore(s); setTimeout(()=>setPhase("done"),1200); }}/>
            </>
          )}

          {/* DONE PHASE */}
          {phase==="done" && (
            <div style={{paddingTop:10}}>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:64,marginBottom:10}}>🏅</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}55`,fontSize:14,color:C.gold2,fontWeight:700}}>
                  +{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐
                </div>
              </div>
              <Card style={{marginBottom:16}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
                {lc.learnedP.map((pt,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<7?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                    <span style={{color:C.green,fontWeight:700}}>✓</span>{pt}
                  </div>
                ))}
              </Card>
              <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
                {lang==="fr"?"LEÇON 6 — NAVIGATION PRATIQUE →":lang==="en"?"LESSON 6 — PRACTICAL NAVIGATION →":lang==="es"?"LECCIÓN 6 — NAVEGACIÓN PRÁCTICA →":"LIÇÃO 6 — NAVEGAÇÃO PRÁTICA →"}
              </button>
              <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
