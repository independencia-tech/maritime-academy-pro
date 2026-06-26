import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", rust:"#8d3b2b", cyan:"#00bcd4", brown:"#795548",
  gauge:"#26c6da", crude:"#5d4037",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module e6 - Cargaison & Petrole", xp:"XP gagnes", question:"Question", ofQ:"sur", correct:"✓ Bonne reponse!", wrong:"✗ Mauvaise reponse", expl:"Explication:", next:"SUIVANT =>", finish:"VOIR MON SCORE =>", startQuiz:"COMMENCER LE QUIZ", complete:"LECON TERMINEE!", backDash:"<= RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Module e6 - Cargo & Oil", xp:"XP earned", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT =>", finish:"SEE MY SCORE =>", startQuiz:"START QUIZ", complete:"LESSON COMPLETE!", backDash:"<= BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Modulo e6 - Carga & Petroleo", xp:"XP ganados", question:"Pregunta", ofQ:"de", correct:"✓ Correcta!", wrong:"✗ Incorrecta", expl:"Explicacion:", next:"SIGUIENTE =>", finish:"VER PUNTUACION =>", startQuiz:"EMPEZAR QUIZ", complete:"LECCION COMPLETADA!", backDash:"<= VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver correccion", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Modulo e6 - Carga & Petroleo", xp:"XP ganhos", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicacao:", next:"PROXIMO =>", finish:"VER PONTUACAO =>", startQuiz:"COMECAR QUIZ", complete:"LICAO CONCLUIDA!", backDash:"<= VOLTAR AO PAINEL", youLearned:"Voce aprendeu:", readFirst:"Leia o conteudo e depois comece", showCorr:"Ver correcao", hideCorr:"Ocultar" },
};

function Stars() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}} viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
      {[{cx:42,cy:80,r:0.9},{cx:310,cy:45,r:1.2},{cx:180,cy:120,r:0.7},{cx:350,cy:200,r:1.0},{cx:60,cy:320,r:0.8},{cx:280,cy:380,r:1.1},{cx:130,cy:500,r:0.9},{cx:320,cy:600,r:0.7},{cx:70,cy:680,r:1.3},{cx:200,cy:750,r:0.8}].map((s,i)=>(
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#e8b94f" opacity={0.28+Math.sin(i)*0.18}/>
      ))}
    </svg>
  );
}

function Card({ children, style={} }) {
  return (
    <div style={{background:"rgba(13,31,60,0.85)",border:`1px solid ${C.border}`,borderRadius:18,padding:"14px",backdropFilter:"blur(8px)",...style}}>
      {children}
    </div>
  );
}

function SL({ icon, text, color }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",marginBottom:6}}>
      <div style={{width:36,height:36,borderRadius:12,background:`${color}18`,border:`1px solid ${color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
      <div style={{fontSize:11,fontWeight:700,color,letterSpacing:1.5,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>{text}</div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 1 — ULLAGE TAPE MANUAL GAUGING
// ══════════════════════════════════════
function UllageSVG({ lang }) {
  const [ullage, setUllage] = useState(3.5);
  const [trim, setTrim] = useState(0);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const tankH_m = 20; // total tank height in meters
  const level = tankH_m - ullage + trim * 0.3;
  const levelPct = Math.max(0, Math.min(100, (level / tankH_m) * 100));

  const W = 290, H = 200;
  const tankX = 60, tankY = 25, tankW = 120, tankH = 140;
  const fillH = (levelPct / 100) * tankH;
  const fillY = tankY + tankH - fillH;

  // Ullage tape position
  const tapeY = tankY + (ullage / tankH_m) * tankH;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Tank */}
        <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="6"
          fill="rgba(13,31,60,0.7)" stroke={C.steel} strokeWidth="2"/>
        {/* Crude fill */}
        <rect x={tankX+2} y={fillY} width={tankW-4} height={fillH} rx="4"
          fill={C.crude} opacity="0.55"/>
        {/* Vapor space */}
        <rect x={tankX+2} y={tankY+2} width={tankW-4} height={fillY-tankY-2} rx="4"
          fill="rgba(230,126,34,0.08)"/>
        <text x={tankX+tankW/2} y={tankY+12} textAnchor="middle" fontSize="7" fill={C.orange} opacity="0.7">
          {lbl("Vapeur HC","HC vapor","Vapor HC","Vapor HC")}
        </text>
        {/* Level marks */}
        {[0,25,50,75,100].map((m,i)=>{
          const my = tankY + tankH - (m/100)*tankH;
          return (
            <g key={i}>
              <line x1={tankX+tankW} y1={my} x2={tankX+tankW+6} y2={my} stroke={C.steel} strokeWidth="0.8"/>
              <text x={tankX+tankW+8} y={my+3} fontSize="6.5" fill={C.muted}>{(m/100*tankH_m).toFixed(0)}m</text>
            </g>
          );
        })}
        {/* Ullage tape (rope from top) */}
        <line x1={tankX+tankW/2} y1={tankY-10} x2={tankX+tankW/2} y2={tapeY}
          stroke={C.gold2} strokeWidth="1.5" strokeDasharray="3,2"/>
        {/* Tape bob (float at ullage level) */}
        <rect x={tankX+tankW/2-8} y={tapeY-4} width={16} height={8} rx="3"
          fill={C.gold} opacity="0.9"/>
        <text x={tankX+tankW/2} y={tapeY+2} textAnchor="middle" fontSize="5.5" fill={C.navy} fontWeight="700">BOB</text>
        {/* Ullage arrow */}
        <line x1={tankX-12} y1={tankY} x2={tankX-12} y2={tapeY} stroke={C.gauge} strokeWidth="1.5"/>
        <polygon points={`${tankX-12},${tankY} ${tankX-16},${tankY+8} ${tankX-8},${tankY+8}`} fill={C.gauge}/>
        <polygon points={`${tankX-12},${tapeY} ${tankX-16},${tapeY-8} ${tankX-8},${tapeY-8}`} fill={C.gauge}/>
        <text x={tankX-20} y={(tankY+tapeY)/2+3} textAnchor="end" fontSize="7" fill={C.gauge} fontWeight="700">
          U
        </text>
        <text x={tankX-20} y={(tankY+tapeY)/2+12} textAnchor="end" fontSize="6" fill={C.gauge}>
          {ullage.toFixed(2)}m
        </text>
        {/* Level arrow */}
        <line x1={tankX-12} y1={tapeY} x2={tankX-12} y2={tankY+tankH} stroke={C.crude} strokeWidth="1.5"/>
        <text x={tankX-20} y={(tapeY+tankY+tankH)/2+3} textAnchor="end" fontSize="7" fill={C.crude} fontWeight="700">
          L
        </text>
        <text x={tankX-20} y={(tapeY+tankY+tankH)/2+12} textAnchor="end" fontSize="6" fill={C.crude}>
          {level.toFixed(2)}m
        </text>
        {/* Readout box */}
        <rect x={tankX+tankW+22} y={tankY} width={72} height={78} rx="6"
          fill="rgba(0,0,0,0.6)" stroke={C.gauge} strokeWidth="0.8"/>
        <text x={tankX+tankW+58} y={tankY+13} textAnchor="middle" fontSize="7" fill={C.gauge} fontWeight="700">
          {lbl("JAUGEAGE","GAUGING","SONDEO","SONDAGEM")}
        </text>
        <text x={tankX+tankW+58} y={tankY+26} textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {lbl("Ullage","Ullage","Ullage","Ullage")}:
        </text>
        <text x={tankX+tankW+58} y={tankY+38} textAnchor="middle" fontSize="10" fill={C.gold2} fontWeight="700">
          {ullage.toFixed(2)}m
        </text>
        <text x={tankX+tankW+58} y={tankY+51} textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {lbl("Niveau","Level","Nivel","Nivel")}:
        </text>
        <text x={tankX+tankW+58} y={tankY+63} textAnchor="middle" fontSize="10" fill={C.crude} fontWeight="700">
          {level.toFixed(2)}m
        </text>
        <text x={tankX+tankW+58} y={tankY+75} textAnchor="middle" fontSize="6.5" fill={C.muted}>
          = {levelPct.toFixed(1)}%
        </text>
        {/* Trim indicator */}
        <rect x={tankX+tankW+22} y={tankY+84} width={72} height={28} rx="5"
          fill="rgba(0,0,0,0.4)" stroke={`${C.orange}44`} strokeWidth="0.8"/>
        <text x={tankX+tankW+58} y={tankY+95} textAnchor="middle" fontSize="6.5" fill={C.orange}>
          {lbl("Assiette","Trim","Asiento","Trim")}: {trim>0?"+":""}{trim.toFixed(1)}m
        </text>
        <text x={tankX+tankW+58} y={tankY+107} textAnchor="middle" fontSize="6" fill={C.muted}>
          {lbl("Correction tape","Tape correction","Correc. cinta","Correc. fita")}
        </text>
        {/* Bottom label */}
        <text x={W/2} y={H-6} textAnchor="middle" fontSize="7" fill={C.muted}>
          {lbl("Ullageur: tape depuis le dome jusqu'a la surface","Ullage: tape from dome to surface","Sonda: cinta desde la cupula a la superficie","Sonda: fita desde a cupula ate a superficie")}
        </text>
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        <div>
          <div style={{fontSize:9,color:C.gauge,marginBottom:3,fontWeight:600}}>
            {lbl("Ullage","Ullage","Ullage","Ullage")}: {ullage.toFixed(2)}m
          </div>
          <input type="range" min={0.5} max={19} step={0.1} value={ullage}
            onChange={e=>setUllage(Number(e.target.value))}
            style={{width:"100%",accentColor:C.gauge}}/>
        </div>
        <div>
          <div style={{fontSize:9,color:C.orange,marginBottom:3,fontWeight:600}}>
            {lbl("Assiette","Trim","Asiento","Trim")}: {trim>0?"+":""}{trim.toFixed(1)}m
          </div>
          <input type="range" min={-2} max={2} step={0.1} value={trim}
            onChange={e=>setTrim(Number(e.target.value))}
            style={{width:"100%",accentColor:C.orange}}/>
        </div>
      </div>
      <div style={{marginTop:6,padding:"8px 10px",borderRadius:10,background:"rgba(38,198,218,0.08)",border:`1px solid ${C.gauge}33`,fontSize:10,color:C.gauge,textAlign:"center"}}>
        {lbl("Formule: Niveau = Hauteur totale citerne - Ullage","Formula: Level = Total tank height - Ullage","Formula: Nivel = Altura total tanque - Ullage","Formula: Nivel = Altura total tanque - Ullage")} ({tankH_m} - {ullage.toFixed(2)} = {level.toFixed(2)}m)
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — GAUGE TYPES COMPARISON
// ══════════════════════════════════════
function GaugeTypesSVG({ lang }) {
  const [selected, setSelected] = useState("float");
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const types = {
    manual: {
      icon:"📏", color:C.gold2,
      name:{ fr:"Ruban manuel", en:"Manual tape", es:"Cinta manual", pt:"Fita manual" },
      pros:{ fr:"Tres precis - reference legale - pas d'electricite", en:"Very accurate - legal reference - no electricity", es:"Muy preciso - referencia legal - sin electricidad", pt:"Muito preciso - referencia legal - sem electricidade" },
      cons:{ fr:"Lent - risque erreur humaine - exposition vapeurs HC", en:"Slow - human error risk - HC vapor exposure", es:"Lento - riesgo error humano - exposicion vapores HC", pt:"Lento - risco erro humano - exposicao vapores HC" },
      accuracy:"+-2mm",
    },
    float: {
      icon:"🔵", color:C.blue2,
      name:{ fr:"Jauge a flotteur", en:"Float gauge", es:"Medidor de flotador", pt:"Medidor de flutuador" },
      pros:{ fr:"Lecture continue - automatique - pas d'entree citerne", en:"Continuous reading - automatic - no tank entry", es:"Lectura continua - automatica - sin entrada tanque", pt:"Leitura continua - automatica - sem entrada tanque" },
      cons:{ fr:"Sensible encrassement - flotteur peut coincer - calibrage regulier", en:"Sensitive to fouling - float can stick - regular calibration", es:"Sensible a suciedad - flotador puede bloquearse - calibracion regular", pt:"Sensivel a sujidade - flutuador pode bloquear - calibracao regular" },
      accuracy:"+-5mm",
    },
    radar: {
      icon:"📡", color:C.teal,
      name:{ fr:"Jauge radar (ullage radar)", en:"Radar gauge", es:"Medidor radar", pt:"Medidor radar" },
      pros:{ fr:"Tres precis - sans contact - insensible a la viscosite", en:"Very accurate - non-contact - viscosity-insensitive", es:"Muy preciso - sin contacto - insensible a viscosidad", pt:"Muito preciso - sem contacto - insensivel a viscosidade" },
      cons:{ fr:"Couteux - interferences possibles - maintenance electronique", en:"Expensive - possible interference - electronic maintenance", es:"Costoso - posibles interferencias - mantenimiento electronico", pt:"Caro - possiveis interferencias - manutencao electronica" },
      accuracy:"+-1mm",
    },
    servo: {
      icon:"⚙️", color:C.orange,
      name:{ fr:"Jauge servo-moteur", en:"Servo gauge", es:"Medidor servo", pt:"Medidor servo" },
      pros:{ fr:"Tres haute precision - mesure densite en plus - legal", en:"Very high precision - density measurement too - legal", es:"Alta precision - mide densidad tambien - legal", pt:"Alta precisao - mede densidade tambem - legal" },
      cons:{ fr:"Maintenance complexe - encrassement disque", en:"Complex maintenance - disk fouling", es:"Mantenimiento complejo - suciedad del disco", pt:"Manutencao complexa - sujidade do disco" },
      accuracy:"+-0.5mm",
    },
  };

  const cur = types[selected];

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {Object.entries(types).map(([k,v])=>(
          <button key={k} onClick={()=>setSelected(k)}
            style={{padding:"8px 6px",borderRadius:10,background:selected===k?`${v.color}25`:"rgba(13,31,60,0.6)",border:`1px solid ${selected===k?v.color:v.color+"44"}`,color:selected===k?v.color:C.muted,fontSize:10,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:14}}>{v.icon}</span>
            <span style={{textAlign:"left",lineHeight:1.2}}>{lbl(v.name.fr,v.name.en,v.name.es,v.name.pt)}</span>
          </button>
        ))}
      </div>
      <div style={{padding:"12px",borderRadius:14,background:`${cur.color}10`,border:`1px solid ${cur.color}44`}}>
        <div style={{fontSize:14,marginBottom:6,textAlign:"center"}}>{cur.icon}
          <span style={{fontSize:12,fontWeight:700,color:cur.color,marginLeft:6}}>
            {lbl(cur.name.fr,cur.name.en,cur.name.es,cur.name.pt)}
          </span>
        </div>
        <div style={{fontSize:10,color:C.gold2,marginBottom:4,fontWeight:700}}>
          {lbl("Precision","Accuracy","Precision","Precisao")}: {cur.accuracy}
        </div>
        <div style={{fontSize:10,color:C.green,marginBottom:3}}>
          ✓ {lbl(cur.pros.fr,cur.pros.en,cur.pros.es,cur.pros.pt)}
        </div>
        <div style={{fontSize:10,color:C.red}}>
          ✗ {lbl(cur.cons.fr,cur.cons.en,cur.cons.es,cur.cons.pt)}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — VOLUME CALCULATION PIPELINE
// ══════════════════════════════════════
function VolumeCalcSVG({ lang }) {
  const [ullage, setUllage] = useState(4.2);
  const [temp, setTemp] = useState(38);
  const [density, setDensity] = useState(0.865);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const tankHm = 20;
  const tankCapM3 = 15000;
  const level = tankHm - ullage;
  const grossVol = Math.round((level / tankHm) * tankCapM3);

  // VCF (Volume Correction Factor) simplified model
  // VCF = 1 - 0.00065 * (T - 15) for typical crude
  const vcf = Math.max(0.97, Math.min(1.03, 1 - 0.00065 * (temp - 15)));
  const netVol = Math.round(grossVol * vcf);
  const massT = (netVol * density / 1000).toFixed(1);

  const steps = [
    { icon:"📏", val:`${ullage.toFixed(2)}m`, label:lbl("Ullage","Ullage","Ullage","Ullage"), color:C.gauge },
    { icon:"📐", val:`${level.toFixed(2)}m`, label:lbl("Niveau","Level","Nivel","Nivel"), color:C.blue2 },
    { icon:"🧊", val:`${grossVol.toLocaleString()} m3`, label:lbl("Vol. brut","Gross vol.","Vol. bruto","Vol. bruto"), color:C.teal },
    { icon:"🌡️", val:`VCF ${vcf.toFixed(4)}`, label:`${temp}C ref 15C`, color:C.orange },
    { icon:"📦", val:`${netVol.toLocaleString()} m3`, label:lbl("Vol. net 15C","Net vol. 15C","Vol. neto 15C","Vol. neto 15C"), color:C.green },
    { icon:"⚖️", val:`${massT} T`, label:lbl("Masse (MT)","Mass (MT)","Masa (MT)","Massa (MT)"), color:C.gold2 },
  ];

  return (
    <div>
      {/* Pipeline steps */}
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:28,height:28,borderRadius:8,background:`${s.color}20`,border:`1px solid ${s.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>
              {s.icon}
            </div>
            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 10px",borderRadius:8,background:"rgba(0,0,0,0.3)",border:`1px solid ${s.color}22`}}>
              <span style={{fontSize:10,color:C.muted}}>{s.label}</span>
              <span style={{fontSize:12,color:s.color,fontWeight:700}}>{s.val}</span>
            </div>
            {i < steps.length-1 && (
              <div style={{fontSize:10,color:C.muted,flexShrink:0}}>↓</div>
            )}
          </div>
        ))}
      </div>
      {/* Controls */}
      {[
        {label:`${lbl("Ullage","Ullage","Ullage","Ullage")}: ${ullage.toFixed(2)}m`, val:ullage, set:setUllage, min:0.5, max:19, step:0.1, color:C.gauge},
        {label:`${lbl("Temperature","Temperature","Temperatura","Temperatura")}: ${temp}C`, val:temp, set:setTemp, min:15, max:65, step:1, color:C.orange},
        {label:`${lbl("Densite","Density","Densidad","Densidade")}: ${density.toFixed(3)}`, val:density, set:setDensity, min:0.80, max:0.97, step:0.001, color:C.gold2},
      ].map((s,i)=>(
        <div key={i} style={{marginBottom:6}}>
          <div style={{fontSize:9,color:s.color,marginBottom:2,fontWeight:600}}>{s.label}</div>
          <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
            onChange={e=>s.set(Number(e.target.value))}
            style={{width:"100%",accentColor:s.color}}/>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — VCF TABLE INTERACTIVE
// ══════════════════════════════════════
function VCFTableSVG({ lang }) {
  const [obsTemp, setObsTemp] = useState(35);
  const [apiGrav, setApiGrav] = useState(32);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  // ASTM 54B simplified VCF
  // alpha = thermal expansion coefficient based on API
  const alpha = apiGrav > 40 ? 0.00090 : apiGrav > 30 ? 0.00080 : apiGrav > 20 ? 0.00070 : 0.00060;
  const vcf = Math.max(0.95, Math.min(1.05, Math.exp(-alpha * (obsTemp - 15) * (1 + 0.8 * alpha * (obsTemp - 15)))));
  const correction = ((vcf - 1) * 100).toFixed(3);
  const corrSign = vcf >= 1 ? "+" : "";
  const W = 290, H = 165;

  // Grid: temps vs API
  const temps = [10, 20, 30, 40, 50, 60];
  const apis = [15, 25, 35, 45];

  const getVCF = (t, api) => {
    const a = api > 40 ? 0.00090 : api > 30 ? 0.00080 : api > 20 ? 0.00070 : 0.00060;
    return Math.max(0.95, Math.min(1.05, Math.exp(-a * (t - 15) * (1 + 0.8 * a * (t - 15)))));
  };

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Title */}
        <text x={W/2} y={13} textAnchor="middle" fontSize="7.5" fill={C.gauge} fontWeight="700">
          {lbl("TABLE VCF (ASTM 54B) - FACTEUR CORRECTION VOLUME","VCF TABLE (ASTM 54B) - VOLUME CORRECTION FACTOR","TABLA VCF (ASTM 54B) - FACTOR CORRECCION VOLUMEN","TABELA VCF (ASTM 54B) - FATOR CORRECAO VOLUME")}
        </text>
        {/* Column headers (API) */}
        {apis.map((a,i)=>(
          <text key={i} x={92+i*50} y={26} textAnchor="middle" fontSize="6.5" fill={C.gold2} fontWeight="700">
            API {a}
          </text>
        ))}
        {/* Row headers + cells */}
        {temps.map((t,ti)=>(
          <g key={ti}>
            <text x={52} y={40+ti*20} textAnchor="end" fontSize="6.5" fill={C.muted}>{t}C</text>
            {apis.map((a,ai)=>{
              const v = getVCF(t, a);
              const isSelected = Math.abs(t - obsTemp) < 8 && Math.abs(a - apiGrav) < 7;
              return (
                <g key={ai}>
                  <rect x={57+ai*50} y={30+ti*20} width={44} height={16} rx="3"
                    fill={isSelected?`${C.gauge}30`:"rgba(13,31,60,0.5)"}
                    stroke={isSelected?C.gauge:`${C.steel}44`} strokeWidth={isSelected?1.2:0.5}/>
                  <text x={79+ai*50} y={41+ti*20} textAnchor="middle" fontSize="6.5"
                    fill={isSelected?C.gauge:v<1?C.blue2:C.orange} fontWeight={isSelected?"700":"400"}>
                    {v.toFixed(4)}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        {/* Result */}
        <rect x={8} y={H-30} width={W-16} height={24} rx="5"
          fill="rgba(38,198,218,0.12)" stroke={C.gauge} strokeWidth="0.8"/>
        <text x={W/2} y={H-18} textAnchor="middle" fontSize="7.5" fill={C.gauge} fontWeight="700">
          {lbl("T obs.","T obs.","T obs.","T obs.")}: {obsTemp}C | API: {apiGrav} | VCF = {vcf.toFixed(4)} ({corrSign}{correction}%)
        </text>
        <text x={W/2} y={H-8} textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {lbl("Vol. net = Vol. brut x VCF (reference 15C)","Net vol. = Gross vol. x VCF (ref. 15C)","Vol. neto = Vol. bruto x VCF (ref. 15C)","Vol. neto = Vol. bruto x VCF (ref. 15C)")}
        </text>
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        {[
          {label:`T: ${obsTemp}C`, val:obsTemp, set:setObsTemp, min:5, max:65, step:1, color:C.orange},
          {label:`API: ${apiGrav}`, val:apiGrav, set:setApiGrav, min:10, max:50, step:1, color:C.gold2},
        ].map((s,i)=>(
          <div key={i}>
            <div style={{fontSize:9,color:s.color,marginBottom:2,fontWeight:600,textAlign:"center"}}>{s.label}</div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={e=>s.set(Number(e.target.value))}
              style={{width:"100%",accentColor:s.color}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — MV DONA PAZ (1987)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{
      title:"MV Dona Paz + MT Vector - Philippines (1987)",
      teaser:"Ferry x petrolier - Collision de nuit - 4 341 morts (estimés) - Pire catastrophe maritime en temps de paix",
      what:"Le 20 decembre 1987, le ferry philippin MV Dona Paz (surcharge : 4 341 personnes pour 1 518 autorisees) entre en collision avec le petrolier MT Vector (2 068 tonneaux d'essence et kerosene) dans le detroit de Tablas. La collision a lieu a 22h30 par nuit noire. Le Vector n'avait aucun jaugeage ni documentation cargo conforme : le manifeste cargo indiquait des quantites incorrectes, et la citerne non conforme contenait bien plus de carburant que declare. L'incendie se propage instantanement. Le Dona Paz coule en 30 minutes. 4 341 morts (estimation) dont 2 survivants seulement du Dona Paz.",
      cause:"- Manifeste cargo MT Vector : quantites de carburant sous-estimees\n- Aucun jaugeage conforme avant depart - documentation frauduleuse\n- Surcharge massive du Dona Paz (2,8x la capacite autorisee)\n- Pas de passerelle bemannte sur le Vector (veille defaillante)\n- Absence de gilets de sauvetage suffisants\n- Corruption dans la certification des navires philippins",
      lessons:"- Jaugeage obligatoire et documente avant tout appareillage\n- Bill of Lading : verif independante des quantites cargo\n- PSC : controle systematique des manifestes cargo petroliers\n- Surcharge : verifcation stricte des listes passagers\n- Veille : pont en permanence arme lors de la navigation\n- Resultats : reforme complete de la reglementation maritime philippine",
      link:"Lien L6 Jaugeage : Le Vector illustre que le jaugeage non conforme n'est pas qu'une question administrative. Des quantites cargo incorrectes signifient une quantite de produit inflammable inconnue a bord. Le jaugeage precis et documente est la base de toute securite cargo.",
    },
    en:{
      title:"MV Dona Paz + MT Vector - Philippines (1987)",
      teaser:"Ferry x tanker - Night collision - 4,341 deaths (estimated) - Worst peacetime maritime disaster",
      what:"On December 20, 1987, the Philippine ferry MV Dona Paz (overcrowded: 4,341 people vs 1,518 authorized) collided with the tanker MT Vector (2,068 tonnes of gasoline and kerosene) in the Tablas Strait. The collision occurred at 10:30 PM in complete darkness. The Vector had no compliant gauging or cargo documentation: the cargo manifest showed incorrect quantities, and the non-compliant tank contained far more fuel than declared. Fire spread instantly. The Dona Paz sank in 30 minutes. 4,341 deaths (estimated) with only 2 survivors from the Dona Paz.",
      cause:"- MT Vector cargo manifest: underestimated fuel quantities\n- No compliant gauging before departure - fraudulent documentation\n- Massive overcrowding of Dona Paz (2.8x authorized capacity)\n- Unmanned Vector bridge (failed watchkeeping)\n- Insufficient life jackets\n- Corruption in Philippine vessel certification",
      lessons:"- Mandatory and documented gauging before any departure\n- Bill of Lading: independent verification of cargo quantities\n- PSC: systematic control of tanker cargo manifests\n- Overcrowding: strict passenger list verification\n- Watchkeeping: bridge permanently manned during navigation\n- Result: complete reform of Philippine maritime regulations",
      link:"L6 Gauging Link: Vector illustrates that non-compliant gauging is not just an administrative issue. Incorrect cargo quantities mean an unknown amount of flammable product on board. Precise and documented gauging is the foundation of all cargo safety.",
    },
    es:{
      title:"MV Dona Paz + MT Vector - Filipinas (1987)",
      teaser:"Ferry x petrolero - Colision nocturna - 4.341 muertos (estimados) - Peor catastrofe maritima en tiempo de paz",
      what:"El 20 de diciembre de 1987, el ferry filipino MV Dona Paz (sobrecargado: 4.341 personas para 1.518 autorizadas) colisiono con el petrolero MT Vector (2.068 toneladas de gasolina y queroseno) en el estrecho de Tablas. La colision ocurrio a las 22h30 en plena oscuridad. El Vector no tenia sondeo conforme ni documentacion de carga correcta: el manifiesto de carga indicaba cantidades incorrectas. El incendio se propago instantaneamente. El Dona Paz se hundio en 30 minutos. 4.341 muertos con solo 2 supervivientes del Dona Paz.",
      cause:"- Manifiesto cargo MT Vector: cantidades de combustible subestimadas\n- Ningun sondeo conforme antes de la salida\n- Sobrecarga masiva del Dona Paz\n- Sin guardia en el puente del Vector\n- Corrupcion en la certificacion de buques filipinos",
      lessons:"- Sondeo obligatorio y documentado antes de cualquier salida\n- Bill of Lading: verificacion independiente cantidades cargo\n- PSC: control sistematico manifiestos cargo petroleros\n- Guardia: puente permanentemente dotado\n- Resultado: reforma completa reglamentacion maritima filipina",
      link:"Vinculo L6 Sondeo: El Vector ilustra que el sondeo no conforme no es solo una cuestion administrativa. Cantidades de carga incorrectas significan una cantidad desconocida de producto inflamable a bordo. El sondeo preciso y documentado es la base de toda seguridad de carga.",
    },
    pt:{
      title:"MV Dona Paz + MT Vector - Filipinas (1987)",
      teaser:"Ferry x petroleiro - Colisao nocturna - 4.341 mortos (estimados) - Pior catastrofe maritima em tempo de paz",
      what:"A 20 de dezembro de 1987, o ferry filipino MV Dona Paz (sobrecarregado: 4.341 pessoas para 1.518 autorizadas) colidiu com o petroleiro MT Vector (2.068 toneladas de gasolina e querosene) no estreito de Tablas. A colisao ocorreu as 22h30 em plena escuridao. O Vector nao tinha sondagem conforme nem documentacao de carga correta: o manifesto de carga indicava quantidades incorretas. O incendio propagou-se instantaneamente. O Dona Paz afundou em 30 minutos. 4.341 mortos com apenas 2 sobreviventes do Dona Paz.",
      cause:"- Manifesto de carga MT Vector: quantidades de combustivel subestimadas\n- Nenhuma sondagem conforme antes da partida\n- Sobrecarga massiva do Dona Paz\n- Sem vigia na ponte do Vector\n- Corrupcao na certificacao de navios filipinos",
      lessons:"- Sondagem obrigatoria e documentada antes de qualquer partida\n- Bill of Lading: verificacao independente das quantidades de carga\n- PSC: controlo sistematico dos manifestos de carga de petroleiros\n- Vigia: ponte permanentemente dotada\n- Resultado: reforma completa da regulamentacao maritima filipina",
      link:"Vinculo L6 Sondagem: O Vector ilustra que a sondagem nao conforme nao e apenas uma questao administrativa. Quantidades de carga incorretas significam uma quantidade desconhecida de produto inflamavel a bordo. A sondagem precisa e documentada e a base de toda a seguranca de carga.",
    },
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>⚠️</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:2}}>{c.title}</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div>
          </div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp && (
        <div style={{padding:"0 16px 16px"}}>
          <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
          <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>CAUSES</div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
          <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>
            {lang==="fr"?"LECONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LICOES"}
          </div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
          <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — 5 QUESTIONS TEXTE LIBRE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);

  const qs = {
    fr:[
      {id:"q1",q:"Quelle est la formule pour calculer le niveau a partir de l'ullage ?\n(Repondre : Niveau = ... - Ullage)"},
      {id:"q2",q:"Quelle est la temperature de reference pour le calcul du volume net (VCF) ?\n(Repondre en degres)"},
      {id:"q3",q:"Quel type de jauge donne la meilleure precision absolue selon ASTM ?\n(Repondre : ruban manuel, flotteur, radar ou servo)"},
      {id:"q4",q:"Le VCF corrige le volume pour tenir compte de quoi ?\n(Repondre : temperature, pression ou salinite)"},
      {id:"q5",q:"Quel document consigne toutes les mesures de jaugeage cargo ?\n(Repondre : Ullage Report, Oil Record Book ou Bill of Lading)"},
    ],
    en:[
      {id:"q1",q:"What is the formula to calculate level from ullage?\n(Answer: Level = ... - Ullage)"},
      {id:"q2",q:"What is the reference temperature for net volume calculation (VCF)?\n(Answer in degrees)"},
      {id:"q3",q:"Which gauge type gives the best absolute accuracy per ASTM?\n(Answer: manual tape, float, radar or servo)"},
      {id:"q4",q:"The VCF corrects volume to account for what?\n(Answer: temperature, pressure or salinity)"},
      {id:"q5",q:"Which document records all cargo gauging measurements?\n(Answer: Ullage Report, Oil Record Book or Bill of Lading)"},
    ],
    es:[
      {id:"q1",q:"?Cual es la formula para calcular el nivel a partir del ullage?\n(Responder: Nivel = ... - Ullage)"},
      {id:"q2",q:"?Cual es la temperatura de referencia para el calculo del volumen neto (VCF)?\n(Responder en grados)"},
      {id:"q3",q:"?Que tipo de medidor da la mejor precision absoluta segun ASTM?\n(Responder: cinta manual, flotador, radar o servo)"},
      {id:"q4",q:"?El VCF corrige el volumen para tener en cuenta que?\n(Responder: temperatura, presion o salinidad)"},
      {id:"q5",q:"?Que documento registra todas las medidas de sondeo de carga?\n(Responder: Ullage Report, Oil Record Book o Bill of Lading)"},
    ],
    pt:[
      {id:"q1",q:"Qual e a formula para calcular o nivel a partir do ullage?\n(Responder: Nivel = ... - Ullage)"},
      {id:"q2",q:"Qual e a temperatura de referencia para o calculo do volume neto (VCF)?\n(Responder em graus)"},
      {id:"q3",q:"Que tipo de medidor da a melhor precisao absoluta segundo ASTM?\n(Responder: fita manual, flutuador, radar ou servo)"},
      {id:"q4",q:"O VCF corrige o volume para ter em conta o que?\n(Responder: temperatura, pressao ou salinidade)"},
      {id:"q5",q:"Que documento regista todas as medicoes de sondagem de carga?\n(Responder: Ullage Report, Oil Record Book ou Bill of Lading)"},
    ],
  };

  const chk = (id, val) => {
    const v = val.trim().toLowerCase().replace(/\s/g,"");
    if (id==="q1") return v.includes("hauteur")||v.includes("total")||v.includes("height")||v.includes("altura")||v.includes("haut");
    if (id==="q2") return v==="15"||v.includes("15c")||v.includes("15deg");
    if (id==="q3") return v.includes("servo");
    if (id==="q4") return v.includes("temp");
    if (id==="q5") return v.includes("ullage")||v.includes("report");
    return false;
  };

  const corrKey = {
    fr:{q1:"Hauteur totale citerne",q2:"15C",q3:"Servo-moteur",q4:"Temperature",q5:"Ullage Report"},
    en:{q1:"Total tank height",q2:"15C",q3:"Servo gauge",q4:"Temperature",q5:"Ullage Report"},
    es:{q1:"Altura total tanque",q2:"15C",q3:"Medidor servo",q4:"Temperatura",q5:"Ullage Report"},
    pt:{q1:"Altura total tanque",q2:"15C",q3:"Medidor servo",q4:"Temperatura",q5:"Ullage Report"},
  };

  const expl = {
    fr:"OK Q1: Niveau = Hauteur totale citerne - Ullage\nOK Q2: 15C (ASTM D1250) - reference internationale\nOK Q3: Servo-moteur (+-0.5mm) - standard legal international\nOK Q4: Temperature - VCF = f(T, densite) selon tables ASTM 54B\nOK Q5: Ullage Report - signe par Chief Officer + inspecteur independant",
    en:"OK Q1: Level = Total tank height - Ullage\nOK Q2: 15C (ASTM D1250) - international reference\nOK Q3: Servo gauge (+-0.5mm) - international legal standard\nOK Q4: Temperature - VCF = f(T, density) per ASTM 54B tables\nOK Q5: Ullage Report - signed by Chief Officer + independent inspector",
    es:"OK Q1: Nivel = Altura total tanque - Ullage\nOK Q2: 15C (ASTM D1250) - referencia internacional\nOK Q3: Medidor servo (+-0.5mm) - estandar legal internacional\nOK Q4: Temperatura - VCF = f(T, densidad) segun tablas ASTM 54B\nOK Q5: Ullage Report - firmado por Primer Oficial + inspector independiente",
    pt:"OK Q1: Nivel = Altura total tanque - Ullage\nOK Q2: 15C (ASTM D1250) - referencia internacional\nOK Q3: Medidor servo (+-0.5mm) - padrao legal internacional\nOK Q4: Temperatura - VCF = f(T, densidade) segundo tabelas ASTM 54B\nOK Q5: Ullage Report - assinado por Primeiro Oficial + inspector independente",
  };

  const list = qs[lang]||qs.fr;
  const ck = corrKey[lang]||corrKey.fr;

  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.gauge}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"Rappels : Niveau = HT - Ullage | Ref. 15C | Servo = +/-0.5mm | VCF corrige T | Ullage Report"
        :lang==="en"?"Reminders: Level = TH - Ullage | Ref. 15C | Servo = +/-0.5mm | VCF corrects T | Ullage Report"
        :lang==="es"?"Recordatorios: Nivel = AT - Ullage | Ref. 15C | Servo = +/-0.5mm | VCF corrige T | Ullage Report"
        :"Lembretes: Nivel = AT - Ullage | Ref. 15C | Servo = +/-0.5mm | VCF corrige T | Ullage Report"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC && (
            <div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>
              {chk(q.id,ans[q.id])?"✓":`✗ => ${ck[q.id]}`}
            </div>
          )}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)}
        style={{width:"100%",padding:"10px",borderRadius:12,border:`1px solid ${C.gold}55`,background:"rgba(201,146,42,0.12)",color:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",marginBottom:8}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
      {showC && (
        <div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>
          {expl[lang]||expl.fr}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// TROPHY HELPER
// ══════════════════════════════════════
function getTrophy(score, total) {
  const pct = score / total;
  if (pct === 1)  return { icon:"🏆", color:"#f1c40f", label:{fr:"Parfait !",     en:"Perfect!",      es:"Perfecto!",    pt:"Perfeito!"} };
  if (pct >= 0.8) return { icon:"🥇", color:"#e8b94f", label:{fr:"Excellent !",   en:"Excellent!",    es:"Excelente!",   pt:"Excelente!"} };
  if (pct >= 0.6) return { icon:"🥈", color:"#b0bec5", label:{fr:"Bien !",        en:"Well done!",    es:"Bien!",        pt:"Bem feito!"} };
  if (pct >= 0.4) return { icon:"🥉", color:"#cd7f32", label:{fr:"Continue !",    en:"Keep going!",   es:"Sigue!",       pt:"Continue!"} };
  return                 { icon:"📚", color:"rgba(240,244,255,0.45)", label:{fr:"A retravailler", en:"Keep studying", es:"A repasar", pt:"Continue estudando"} };
}

// ══════════════════════════════════════
// QUESTION BANK — 15 QCM
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const qs = {
    fr:[
      {q:"Qu'est-ce que l'ullage dans le contexte du jaugeage cargo ?",opts:["Le volume total de la citerne","La distance entre la surface du liquide et le haut de la citerne","Le poids du cargo","La temperature du cargo"],ans:1,expl:"L'ullage (ou 'creux' en francais) est la distance entre la surface du liquide et le point de reference en haut de la citerne (dome ou trou de jauge). Formule : Niveau = Hauteur totale citerne - Ullage. Plus l'ullage est grand, moins la citerne est remplie."},
      {q:"Quelle est la temperature de reference internationale pour le calcul du volume net ?",opts:["0°C","15°C","20°C","60°F"],ans:1,expl:"15°C (ou 60°F pour les pays anglosaxons utilisant ASTM) est la temperature de reference internationale selon ASTM D1250. Tous les volumes cargo sont calcules et declares a cette temperature pour permettre la comparaison entre differents ports et climats."},
      {q:"Le VCF (Volume Correction Factor) corrige le volume pour tenir compte de :",opts:["La pression atmospherique","La temperature du produit","La salinite de l'eau","La viscosite du cargo"],ans:1,expl:"Le VCF corrige le volume observe (a la temperature de mesure) en volume reference (a 15°C). VCF = f(temperature, densite/API). Si T > 15°C, le produit est dilate donc VCF < 1 (volume net < volume brut). Si T < 15°C, VCF > 1."},
      {q:"Quelle est la formule de base du calcul cargo ?",opts:["Masse = Volume x Pression","Masse = Volume net x Densite a 15°C","Masse = Ullage x Hauteur","Masse = VCF x Temperature"],ans:1,expl:"Masse (MT) = Volume net (m3 a 15°C) x Densite a 15°C (t/m3). Le volume net est obtenu en appliquant le VCF au volume brut. La densite est mesuree a 15°C ou corrigee via les tables ASTM. Cette formule est la base du Bill of Lading."},
      {q:"Quel type de jauge electonique offre la meilleure precision legale selon ASTM ?",opts:["Jauge a flotteur","Jauge radar (GTL)","Jauge servo-moteur","Transducteur ultrasonique"],ans:2,expl:"La jauge servo-moteur (+/- 0.5mm) est le standard de precision legale selon ASTM D3900. Elle utilise un disque discoide immerse dans le produit et mesure la force exercee. Elle peut aussi mesurer la densite. C'est le type de jauge de reference pour les operations de quantification legales."},
      {q:"Qu'est-ce qu'un Ullage Report ?",opts:["Le journal de bord du navire","Document signé par Chief Officer et inspecteur cargo independant","Plan de chargement","Rapport d'inspection PSC"],ans:1,expl:"L'Ullage Report est le document officiel enregistrant toutes les mesures de jaugeage : ullage, temperature, densite par citerne, calculs VCF, volumes bruts et nets, masse totale. Il est signe par le Chief Officer et l'inspecteur cargo independant (surveyor). C'est la base du Bill of Lading."},
      {q:"Quelle correction est appliquee pour tenir compte de l'assiette du navire lors du jaugeage ?",opts:["Correction de densite","Trim correction (correction d'assiette)","Correction de gite","Correction barometrique"],ans:1,expl:"La trim correction (correction d'assiette) ajuste le niveau mesure en tenant compte de l'inclinaison longitudinale du navire. Si le navire est pique sur l'arriere, la surface du liquide n'est pas horizontale et l'ullage mesure au centre n'est pas representatif. Les tables de correction trim sont specifiques a chaque navire."},
      {q:"Que signifie un VCF de 0.9952 pour un cargo de 10 000 m3 bruts ?",opts:["Volume net = 10 048 m3","Volume net = 9 952 m3","Volume net = 9 000 m3","Aucune correction necessaire"],ans:1,expl:"Volume net = Volume brut x VCF = 10 000 x 0.9952 = 9 952 m3 (a 15°C). VCF < 1 signifie que le produit etait plus chaud que 15°C au moment de la mesure, donc le produit occupait plus de volume qu'a 15°C. En refroidissant a 15°C, il occupera 9 952 m3."},
      {q:"Quelle est la difference entre jaugeage 'open' et 'closed' ?",opts:["Open = citerne pleine, closed = citerne vide","Open = tape introduite par le trou de dome ouvert, closed = systeme etanche sans ouverture","Open = jour, closed = nuit","Open = manuel, closed = electronique"],ans:1,expl:"Jaugeage open : tape (ruban) introduite par le trou de dome ouvert, risque d'emission de vapeurs HC (ancien). Jaugeage closed (ou restricted) : systeme de mesure etanche, sans ouverture de la citerne, via un presse-etoupe. Obligatoire pour les bruts tres volatils et requis par MARPOL dans certaines zones."},
      {q:"Le Cargo Record Book (CRB) doit enregistrer pour les operations de jaugeage :",opts:["Seulement le tonnage total","Date, heure, quantite par citerne, ullage, temperature, VCF, masse - tous signes","Uniquement la signature du capitaine","Le prix du cargo"],ans:1,expl:"Le Cargo Record Book exige : date et heure de chaque mesure, ullage et temperature par citerne, VCF applique, volumes brut et net par citerne, masse totale, identification des jaugeurs. Ce document est legalement oppose aux parties dans tout litige sur les quantites."},
      {q:"Qu'est-ce que l'OBQ (On Board Quantity) dans le contexte du jaugeage cargo ?",opts:["La quantite de carburant navire","La quantite residuelle de cargo dans les citernes AVANT chargement","La quantite de ballast","La quantite maximale autorisee"],ans:1,expl:"L'OBQ (On Board Quantity) est la quantite residuelle de cargo (fond de citerne, residus, eau libre) presente dans les citernes AVANT le chargement. Elle est mesuree et enregistree dans l'Ullage Report pre-chargement. L'OBQ est deductible de la quantite chargee selon les termes de la charte-partie."},
      {q:"Pourquoi l'independant cargo surveyor est-il requis pour le jaugeage ?",opts:["Pour reduire les couts","Pour garantir l'impartialite entre armateur et charger - base juridique du BL","Pour surveiller l'equipage","Pour verifier la securite incendie"],ans:1,expl:"L'independant cargo surveyor (inspecteur cargo independant) garantit l'impartialite entre le navire (armateur) et le charger. Ses mesures sont la base legale du Bill of Lading et servent de reference en cas de litige. Certaines compagnies petroliere exigent deux surveyors independants."},
      {q:"Quelle est la correction appliquee pour les tables ASTM 54B ?",opts:["Correction de pression pour les gaz","Correction de temperature pour les hydrocarbures liquides","Correction de salinite pour l'eau de mer","Correction de viscosite"],ans:1,expl:"Les tables ASTM 54B (ou IP 54B) sont des tables de correction de temperature specifiques aux hydrocarbures liquides. Elles donnent le VCF en fonction de la temperature observee et de la densite (ou API gravity) du produit. Reference internationale utilisee dans tous les ports mondiaux."},
      {q:"Lors d'un jaugeage statique, les citernes doivent etre :",opts:["En pompage actif","Au repos depuis au moins 30 minutes (settled)","A temperature maximale","Avec IGS desactive"],ans:1,expl:"Pour un jaugeage statique valide, les citernes doivent etre 'settled' (au repos) depuis au moins 30 minutes (1 heure pour les operations legales) apres tout mouvement de liquide. Cela permet a l'interface liquide de se stabiliser et elimine les vagues et turbulences internes qui fausseraient la mesure."},
      {q:"Le MV Dona Paz / MT Vector (1987) a illustre que le jaugeage non conforme peut :",opts:["Reduire la rentabilite du voyage","Creer une quantite inconnue de produit inflammable avec consequences catastrophiques","Retarder le depart du navire","Causer des problemes douaniers"],ans:1,expl:"Le Vector transportait plus de carburant que declare sur le manifeste cargo (jaugeage frauduleux). En cas de collision, la quantite reelle de produit inflammable etait inconnue, rendant toute intervention impossible. 4 341 morts. Le jaugeage precis est une obligation de securite, pas seulement administrative."},
    ],
    en:[
      {q:"What is ullage in the context of cargo gauging?",opts:["The total tank volume","The distance from the liquid surface to the top of the tank","The weight of the cargo","The cargo temperature"],ans:1,expl:"Ullage (or 'innage' for level measurement) is the distance from the liquid surface to the reference point at the top of the tank (dome or gauge hatch). Formula: Level = Total tank height - Ullage. The larger the ullage, the less the tank is filled."},
      {q:"What is the international reference temperature for net volume calculation?",opts:["0C","15C","20C","60F"],ans:1,expl:"15°C (or 60°F for Anglo-Saxon countries using ASTM) is the international reference temperature per ASTM D1250. All cargo volumes are calculated and declared at this temperature to allow comparison between different ports and climates."},
      {q:"The VCF (Volume Correction Factor) corrects volume to account for:",opts:["Atmospheric pressure","Product temperature","Seawater salinity","Cargo viscosity"],ans:1,expl:"VCF corrects the observed volume (at measurement temperature) to reference volume (at 15°C). VCF = f(temperature, density/API). If T > 15°C, the product is expanded so VCF < 1 (net volume < gross volume). If T < 15°C, VCF > 1."},
      {q:"What is the basic cargo calculation formula?",opts:["Mass = Volume x Pressure","Mass = Net Volume x Density at 15C","Mass = Ullage x Height","Mass = VCF x Temperature"],ans:1,expl:"Mass (MT) = Net volume (m3 at 15°C) x Density at 15°C (t/m3). Net volume is obtained by applying VCF to gross volume. Density is measured at 15°C or corrected via ASTM tables. This formula is the basis of the Bill of Lading."},
      {q:"Which electronic gauge type offers the best legal accuracy per ASTM?",opts:["Float gauge","Radar gauge (GTL)","Servo gauge","Ultrasonic transducer"],ans:2,expl:"The servo gauge (+/- 0.5mm) is the legal precision standard per ASTM D3900. It uses a disc immersed in the product and measures the exerted force. It can also measure density. It is the reference gauge type for legal quantification operations."},
      {q:"What is an Ullage Report?",opts:["The ship's log","Document signed by Chief Officer and independent cargo inspector","Loading plan","PSC inspection report"],ans:1,expl:"The Ullage Report is the official document recording all gauging measurements: ullage, temperature, density per tank, VCF calculations, gross and net volumes, total mass. It is signed by the Chief Officer and independent cargo inspector (surveyor). It forms the basis of the Bill of Lading."},
      {q:"What correction is applied to account for vessel trim during gauging?",opts:["Density correction","Trim correction","List correction","Barometric correction"],ans:1,expl:"Trim correction adjusts the measured level for the vessel's longitudinal inclination. If the vessel is trimmed by stern, the liquid surface is not horizontal and the ullage measured at center is not representative. Trim correction tables are specific to each vessel."},
      {q:"What does a VCF of 0.9952 mean for a cargo of 10,000 m3 gross?",opts:["Net volume = 10,048 m3","Net volume = 9,952 m3","Net volume = 9,000 m3","No correction needed"],ans:1,expl:"Net volume = Gross volume x VCF = 10,000 x 0.9952 = 9,952 m3 (at 15°C). VCF < 1 means the product was warmer than 15°C when measured, so it occupied more volume than at 15°C. When cooled to 15°C, it will occupy 9,952 m3."},
      {q:"What is the difference between 'open' and 'closed' gauging?",opts:["Open = full tank, closed = empty tank","Open = tape through open dome, closed = sealed system without opening","Open = day, closed = night","Open = manual, closed = electronic"],ans:1,expl:"Open gauging: tape introduced through the open dome hatch, risk of HC vapor emission (old method). Closed (or restricted) gauging: sealed measurement system without opening the tank, via a stuffing box. Mandatory for highly volatile crudes and required by MARPOL in certain areas."},
      {q:"The Cargo Record Book (CRB) must record for gauging operations:",opts:["Only total tonnage","Date, time, quantity per tank, ullage, temperature, VCF, mass - all signed","Only captain's signature","Cargo price"],ans:1,expl:"The Cargo Record Book requires: date and time of each measurement, ullage and temperature per tank, VCF applied, gross and net volumes per tank, total mass, gauger identification. This document is legally binding in all quantity disputes."},
      {q:"What is OBQ (On Board Quantity) in cargo gauging?",opts:["The vessel's fuel quantity","Residual cargo in tanks BEFORE loading","The ballast quantity","The maximum permitted quantity"],ans:1,expl:"OBQ is the residual cargo quantity (tank bottoms, residues, free water) present in tanks BEFORE loading. It is measured and recorded in the pre-loading Ullage Report. OBQ is deductible from the loaded quantity per charter party terms."},
      {q:"Why is an independent cargo surveyor required for gauging?",opts:["To reduce costs","To guarantee impartiality between owner and charterer - legal basis of BL","To supervise crew","To verify fire safety"],ans:1,expl:"The independent cargo surveyor guarantees impartiality between the vessel (owner) and the charterer. Their measurements are the legal basis of the Bill of Lading and serve as reference in disputes. Some oil companies require two independent surveyors."},
      {q:"What correction do ASTM 54B tables apply?",opts:["Pressure correction for gases","Temperature correction for liquid hydrocarbons","Salinity correction for seawater","Viscosity correction"],ans:1,expl:"ASTM 54B (or IP 54B) tables are temperature correction tables specific to liquid hydrocarbons. They give VCF as a function of observed temperature and product density (or API gravity). International reference used in all world ports."},
      {q:"For valid static gauging, tanks must be:",opts:["Actively pumping","At rest for at least 30 minutes (settled)","At maximum temperature","With IGS deactivated"],ans:1,expl:"For valid static gauging, tanks must be 'settled' (at rest) for at least 30 minutes (1 hour for legal operations) after any liquid movement. This allows the liquid interface to stabilize and eliminates internal waves and turbulence that would falsify the measurement."},
      {q:"The MV Dona Paz / MT Vector (1987) illustrated that non-compliant gauging can:",opts:["Reduce voyage profitability","Create an unknown quantity of flammable product with catastrophic consequences","Delay vessel departure","Cause customs problems"],ans:1,expl:"Vector was carrying more fuel than declared on the cargo manifest (fraudulent gauging). In case of collision, the actual quantity of flammable product was unknown, making any intervention impossible. 4,341 deaths. Accurate gauging is a safety obligation, not just administrative."},
    ],
    es:[
      {q:"?Que es el ullage en el contexto del sondeo de carga?",opts:["El volumen total del tanque","La distancia entre la superficie del liquido y la parte superior del tanque","El peso de la carga","La temperatura de la carga"],ans:1,expl:"El ullage es la distancia entre la superficie del liquido y el punto de referencia en la parte superior del tanque (cupula o boca de sonda). Formula: Nivel = Altura total tanque - Ullage. Cuanto mayor es el ullage, menos lleno esta el tanque."},
      {q:"?Cual es la temperatura de referencia internacional para el calculo del volumen neto?",opts:["0C","15C","20C","60F"],ans:1,expl:"15°C (o 60°F para paises anglosajones con ASTM) es la temperatura de referencia internacional segun ASTM D1250. Todos los volumenes de carga se calculan y declaran a esta temperatura para permitir la comparacion entre diferentes puertos y climas."},
      {q:"?El VCF (Factor de Correccion de Volumen) corrige el volumen para tener en cuenta:",opts:["La presion atmosferica","La temperatura del producto","La salinidad del agua de mar","La viscosidad de la carga"],ans:1,expl:"El VCF corrige el volumen observado (a la temperatura de medicion) al volumen de referencia (a 15°C). VCF = f(temperatura, densidad/API). Si T > 15°C, el producto esta dilatado por lo que VCF < 1. Si T < 15°C, VCF > 1."},
      {q:"?Cual es la formula basica del calculo de carga?",opts:["Masa = Volumen x Presion","Masa = Volumen neto x Densidad a 15C","Masa = Ullage x Altura","Masa = VCF x Temperatura"],ans:1,expl:"Masa (MT) = Volumen neto (m3 a 15°C) x Densidad a 15°C (t/m3). El volumen neto se obtiene aplicando el VCF al volumen bruto. Esta formula es la base del Bill of Lading."},
      {q:"?Que tipo de medidor electronico ofrece la mejor precision legal segun ASTM?",opts:["Medidor de flotador","Medidor radar (GTL)","Medidor servo","Transductor ultrasonico"],ans:2,expl:"El medidor servo (+/-0.5mm) es el estandar de precision legal segun ASTM D3900. Utiliza un disco sumergido en el producto y mide la fuerza ejercida. Puede tambien medir la densidad. Es el tipo de medidor de referencia para las operaciones de cuantificacion legales."},
      {q:"?Que es un Ullage Report?",opts:["El diario de a bordo","Documento firmado por el Primer Oficial e inspector de carga independiente","Plan de carga","Informe de inspeccion PSC"],ans:1,expl:"El Ullage Report es el documento oficial que registra todas las medidas de sondeo: ullage, temperatura, densidad por tanque, calculos VCF, volumenes bruto y neto, masa total. Es firmado por el Primer Oficial y el inspector de carga independiente (surveyor). Es la base del Bill of Lading."},
      {q:"?Que correccion se aplica para tener en cuenta el asiento del buque durante el sondeo?",opts:["Correccion de densidad","Correccion de asiento (trim correction)","Correccion de escora","Correccion barometrica"],ans:1,expl:"La trim correction ajusta el nivel medido teniendo en cuenta la inclinacion longitudinal del buque. Si el buque esta apopado, la superficie del liquido no es horizontal y el ullage medido en el centro no es representativo."},
      {q:"?Que significa un VCF de 0,9952 para una carga de 10.000 m3 brutos?",opts:["Volumen neto = 10.048 m3","Volumen neto = 9.952 m3","Volumen neto = 9.000 m3","Sin correccion necesaria"],ans:1,expl:"Volumen neto = Volumen bruto x VCF = 10.000 x 0,9952 = 9.952 m3 (a 15°C). VCF < 1 significa que el producto estaba mas caliente que 15°C, por lo que ocupaba mas volumen. Al enfriarse a 15°C, ocupara 9.952 m3."},
      {q:"?Cual es la diferencia entre sondeo 'open' y 'closed'?",opts:["Open = tanque lleno, closed = tanque vacio","Open = cinta por cupula abierta, closed = sistema estanco sin apertura","Open = dia, closed = noche","Open = manual, closed = electronico"],ans:1,expl:"Sondeo open: cinta introducida por la cupula abierta, riesgo de emision de vapores HC. Sondeo closed (restringido): sistema de medicion estanco sin apertura del tanque. Obligatorio para crudos muy volatiles y requerido por MARPOL en ciertas zonas."},
      {q:"?Que debe registrar el Cargo Record Book para operaciones de sondeo?",opts:["Solo el tonelaje total","Fecha, hora, cantidad por tanque, ullage, temperatura, VCF, masa - todo firmado","Solo la firma del capitan","El precio de la carga"],ans:1,expl:"El Cargo Record Book exige: fecha y hora de cada medicion, ullage y temperatura por tanque, VCF aplicado, volumenes bruto y neto por tanque, masa total, identificacion de los sondistas. Documento legalmente vinculante en disputas sobre cantidades."},
      {q:"?Que es el OBQ (On Board Quantity) en el contexto del sondeo de carga?",opts:["La cantidad de combustible del buque","La cantidad residual de carga en los tanques ANTES del cargamento","La cantidad de lastre","La cantidad maxima autorizada"],ans:1,expl:"El OBQ es la cantidad residual de carga (fondos de tanque, residuos, agua libre) presente en los tanques ANTES de cargar. Se mide y registra en el Ullage Report pre-cargamento. El OBQ es deducible de la cantidad cargada segun los terminos de la poliza de fletamento."},
      {q:"?Por que se requiere un inspector de carga independiente para el sondeo?",opts:["Para reducir costes","Para garantizar la imparcialidad entre armador y fletador - base juridica del BL","Para supervisar la tripulacion","Para verificar la seguridad contra incendios"],ans:1,expl:"El inspector de carga independiente garantiza la imparcialidad entre el buque y el fletador. Sus mediciones son la base legal del Bill of Lading y sirven de referencia en disputas. Algunas companias petroleras exigen dos inspectores independientes."},
      {q:"?Que correccion aplican las tablas ASTM 54B?",opts:["Correccion de presion para gases","Correccion de temperatura para hidrocarburos liquidos","Correccion de salinidad para agua de mar","Correccion de viscosidad"],ans:1,expl:"Las tablas ASTM 54B son tablas de correccion de temperatura especificas para hidrocarburos liquidos. Dan el VCF en funcion de la temperatura observada y la densidad (o API gravity). Referencia internacional en todos los puertos mundiales."},
      {q:"Para un sondeo estatico valido, los tanques deben estar:",opts:["En bombeo activo","En reposo durante al menos 30 minutos (settled)","A temperatura maxima","Con IGS desactivado"],ans:1,expl:"Para un sondeo estatico valido, los tanques deben estar en reposo (settled) al menos 30 minutos (1 hora para operaciones legales) tras cualquier movimiento de liquido. Esto permite que la interfaz liquida se estabilice y elimina olas y turbulencias internas."},
      {q:"El MV Dona Paz / MT Vector (1987) ilustro que el sondeo no conforme puede:",opts:["Reducir la rentabilidad del viaje","Crear una cantidad desconocida de producto inflamable con consecuencias catastroficas","Retrasar la salida del buque","Causar problemas aduaneros"],ans:1,expl:"El Vector transportaba mas combustible del declarado en el manifiesto (sondeo fraudulento). En caso de colision, la cantidad real de producto inflamable era desconocida. 4.341 muertos. El sondeo preciso es una obligacion de seguridad, no solo administrativa."},
    ],
    pt:[
      {q:"O que e o ullage no contexto da sondagem de carga?",opts:["O volume total do tanque","A distancia entre a superficie do liquido e o topo do tanque","O peso da carga","A temperatura da carga"],ans:1,expl:"O ullage e a distancia entre a superficie do liquido e o ponto de referencia no topo do tanque (cupula ou tampa de sondagem). Formula: Nivel = Altura total tanque - Ullage. Quanto maior o ullage, menos cheio esta o tanque."},
      {q:"Qual e a temperatura de referencia internacional para o calculo do volume neto?",opts:["0C","15C","20C","60F"],ans:1,expl:"15°C (ou 60°F para paises anglosaxonicos com ASTM) e a temperatura de referencia internacional segundo ASTM D1250. Todos os volumes de carga sao calculados e declarados a esta temperatura para permitir a comparacao entre diferentes portos e climas."},
      {q:"O VCF (Fator de Correcao de Volume) corrige o volume para ter em conta:",opts:["A pressao atmosferica","A temperatura do produto","A salinidade da agua do mar","A viscosidade da carga"],ans:1,expl:"O VCF corrige o volume observado (a temperatura de medicao) para o volume de referencia (a 15°C). VCF = f(temperatura, densidade/API). Se T > 15°C, o produto esta dilatado por isso VCF < 1. Se T < 15°C, VCF > 1."},
      {q:"Qual e a formula basica do calculo de carga?",opts:["Massa = Volume x Pressao","Massa = Volume neto x Densidade a 15C","Massa = Ullage x Altura","Massa = VCF x Temperatura"],ans:1,expl:"Massa (MT) = Volume neto (m3 a 15°C) x Densidade a 15°C (t/m3). O volume neto e obtido aplicando o VCF ao volume bruto. Esta formula e a base do Bill of Lading."},
      {q:"Que tipo de medidor electronico oferece a melhor precisao legal segundo ASTM?",opts:["Medidor de flutuador","Medidor radar (GTL)","Medidor servo","Transdutor ultrasonico"],ans:2,expl:"O medidor servo (+/-0.5mm) e o padrao de precisao legal segundo ASTM D3900. Utiliza um disco imerso no produto e mede a forca exercida. Pode tambem medir a densidade. E o tipo de medidor de referencia para operacoes de quantificacao legais."},
      {q:"O que e um Ullage Report?",opts:["O diario de bordo","Documento assinado pelo Primeiro Oficial e inspector de carga independente","Plano de carga","Relatorio de inspecao PSC"],ans:1,expl:"O Ullage Report e o documento oficial que regista todas as medicoes de sondagem: ullage, temperatura, densidade por tanque, calculos VCF, volumes bruto e neto, massa total. E assinado pelo Primeiro Oficial e inspector de carga independente (surveyor). E a base do Bill of Lading."},
      {q:"Que correcao e aplicada para ter em conta o trim do navio durante a sondagem?",opts:["Correcao de densidade","Correcao de trim (trim correction)","Correcao de escora","Correcao barometrica"],ans:1,expl:"A trim correction ajusta o nivel medido tendo em conta a inclinacao longitudinal do navio. Se o navio esta apopado, a superficie do liquido nao e horizontal e o ullage medido no centro nao e representativo."},
      {q:"O que significa um VCF de 0,9952 para uma carga de 10.000 m3 brutos?",opts:["Volume neto = 10.048 m3","Volume neto = 9.952 m3","Volume neto = 9.000 m3","Sem correcao necessaria"],ans:1,expl:"Volume neto = Volume bruto x VCF = 10.000 x 0,9952 = 9.952 m3 (a 15°C). VCF < 1 significa que o produto estava mais quente que 15°C, portanto ocupava mais volume. Ao arrefecer a 15°C, ocupara 9.952 m3."},
      {q:"Qual e a diferenca entre sondagem 'open' e 'closed'?",opts:["Open = tanque cheio, closed = tanque vazio","Open = fita pela cupula aberta, closed = sistema estanque sem abertura","Open = dia, closed = noite","Open = manual, closed = electronico"],ans:1,expl:"Sondagem open: fita introduzida pela cupula aberta, risco de emissao de vapores HC. Sondagem closed (restrita): sistema de medicao estanque sem abertura do tanque. Obrigatorio para crudes muito volateis e requerido pelo MARPOL em certas zonas."},
      {q:"O que deve registar o Cargo Record Book para operacoes de sondagem?",opts:["So a tonelagem total","Data, hora, quantidade por tanque, ullage, temperatura, VCF, massa - tudo assinado","So a assinatura do capitao","O preco da carga"],ans:1,expl:"O Cargo Record Book exige: data e hora de cada medicao, ullage e temperatura por tanque, VCF aplicado, volumes bruto e neto por tanque, massa total, identificacao dos sondistas. Documento legalmente vinculativo em disputas sobre quantidades."},
      {q:"O que e o OBQ (On Board Quantity) no contexto da sondagem de carga?",opts:["A quantidade de combustivel do navio","A quantidade residual de carga nos tanques ANTES do carregamento","A quantidade de lastro","A quantidade maxima autorizada"],ans:1,expl:"O OBQ e a quantidade residual de carga (fundos de tanque, residuos, agua livre) presente nos tanques ANTES de carregar. E medida e registada no Ullage Report pre-carregamento. O OBQ e dedutivel da quantidade carregada segundo os termos da carta-partida."},
      {q:"Por que e necessario um inspector de carga independente para a sondagem?",opts:["Para reduzir custos","Para garantir a imparcialidade entre armador e fretador - base juridica do BL","Para supervisionar a tripulacao","Para verificar a seguranca contra incendios"],ans:1,expl:"O inspector de carga independente garante a imparcialidade entre o navio e o fretador. As suas medicoes sao a base legal do Bill of Lading e servem de referencia em disputas. Algumas companhias petroliferas exigem dois inspectores independentes."},
      {q:"Que correcao aplicam as tabelas ASTM 54B?",opts:["Correcao de pressao para gases","Correcao de temperatura para hidrocarbonetos liquidos","Correcao de salinidade para agua do mar","Correcao de viscosidade"],ans:1,expl:"As tabelas ASTM 54B sao tabelas de correcao de temperatura especificas para hidrocarbonetos liquidos. Dao o VCF em funcao da temperatura observada e da densidade (ou API gravity). Referencia internacional em todos os portos mundiais."},
      {q:"Para uma sondagem estatica valida, os tanques devem estar:",opts:["Em bombagem activa","Em repouso durante pelo menos 30 minutos (settled)","A temperatura maxima","Com IGS desactivado"],ans:1,expl:"Para uma sondagem estatica valida, os tanques devem estar em repouso (settled) pelo menos 30 minutos (1 hora para operacoes legais) apos qualquer movimento de liquido. Isto permite que a interface liquida se estabilize."},
      {q:"O MV Dona Paz / MT Vector (1987) ilustrou que a sondagem nao conforme pode:",opts:["Reduzir a rentabilidade da viagem","Criar uma quantidade desconhecida de produto inflamavel com consequencias catastroficas","Atrasar a partida do navio","Causar problemas aduaneiros"],ans:1,expl:"O Vector transportava mais combustivel do que declarado no manifesto (sondagem fraudulenta). Em caso de colisao, a quantidade real de produto inflamavel era desconhecida. 4.341 mortos. A sondagem precisa e uma obrigacao de seguranca, nao apenas administrativa."},
    ],
  };

  const list = qs[lang]||qs.fr;
  const total = list.length;

  const handleAnswer = (i) => {
    if (answered) return;
    setSel(i); setAnswered(true);
    if (i===list[idx].ans) setScore(s=>s+1);
  };
  const handleNext = () => {
    if (idx===total-1) { setDone(true); return; }
    setSel(null); setAnswered(false); setIdx(i=>i+1);
  };
  const handleRestart = () => {
    setIdx(0); setSel(null); setAnswered(false); setScore(0); setDone(false); setStarted(false);
  };

  if (!started) return (
    <div style={{textAlign:"center",padding:"20px 0"}}>
      <div style={{fontSize:36,marginBottom:10}}>📝</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:C.white,marginBottom:6}}>
        {lbl("Banque de questions","Question Bank","Banco de preguntas","Banco de questoes")}
      </div>
      <div style={{fontSize:12,color:C.muted,marginBottom:16}}>
        15 {lbl("questions premium","premium questions","preguntas premium","questoes premium")}
      </div>
      <button onClick={()=>setStarted(true)}
        style={{padding:"12px 28px",borderRadius:14,background:`linear-gradient(135deg,${C.gauge},${C.teal})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
        {lbl("COMMENCER =>","START =>","EMPEZAR =>","COMECAR =>")}
      </button>
    </div>
  );

  if (done) {
    const trophy = getTrophy(score, total);
    const pct = Math.round(score/total*100);
    return (
      <div style={{textAlign:"center",padding:"20px 10px"}}>
        <div style={{fontSize:64,marginBottom:8}}>{trophy.icon}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:trophy.color,fontWeight:700,marginBottom:4}}>
          {trophy.label[lang]||trophy.label.fr}
        </div>
        <div style={{fontSize:28,fontWeight:700,color:C.white,marginBottom:4}}>{score}/{total}</div>
        <div style={{fontSize:18,color:trophy.color,fontWeight:700,marginBottom:20}}>{pct}%</div>
        <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:8,marginBottom:20,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.gauge},${trophy.color})`,borderRadius:8,transition:"width 0.8s ease"}}/>
        </div>
        <button onClick={handleRestart}
          style={{width:"100%",padding:"12px",borderRadius:14,background:`rgba(38,198,218,0.15)`,border:`1px solid ${C.gauge}55`,color:C.gauge,fontSize:13,fontWeight:700,cursor:"pointer"}}>
          {lbl("Recommencer","Restart","Reiniciar","Recomecar")}
        </button>
      </div>
    );
  }

  const q = list[idx];
  return (
    <div>
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <span style={{fontSize:10,color:C.gauge,fontWeight:700}}>
            {lbl("Question","Question","Pregunta","Pergunta")} {idx+1}/{total}
          </span>
          <span style={{fontSize:10,color:C.gold,fontWeight:700}}>✓ {score}/{idx}</span>
        </div>
        <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${C.gauge},${C.teal})`,borderRadius:4,transition:"width 0.3s"}}/>
        </div>
      </div>
      <div style={{background:"rgba(0,0,0,0.3)",borderRadius:14,padding:"14px",marginBottom:12,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,color:C.white,lineHeight:1.6,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(13,31,60,0.6)",border=C.border,col=C.white;
        if (answered) {
          if (i===q.ans) { bg="rgba(30,138,74,0.2)"; border=C.green; col=C.green; }
          else if (i===sel) { bg="rgba(192,57,43,0.2)"; border=C.red; col=C.red; }
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"11px 14px",marginBottom:7,borderRadius:12,background:bg,border:`1px solid ${border}`,color:col,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:700,marginRight:8,color:C.gold2}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"11px 13px",borderRadius:12,background:`rgba(${sel===q.ans?"30,138,74":"192,57,43"},0.1)`,border:`1px solid ${sel===q.ans?C.green:C.red}44`,marginBottom:10}}>
          <div style={{fontSize:12,fontWeight:700,color:sel===q.ans?C.green:C.red,marginBottom:4}}>
            {sel===q.ans
              ?(lang==="fr"?"✓ Bonne reponse !":lang==="en"?"✓ Correct!":lang==="es"?"✓ Correcta!":"✓ Correto!")
              :(lang==="fr"?"✗ Mauvaise reponse":lang==="en"?"✗ Wrong answer":lang==="es"?"✗ Incorrecta":"✗ Errada")}
          </div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>{q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"13px",borderRadius:14,background:`linear-gradient(135deg,${C.gauge},${C.teal})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
          {idx===total-1
            ?(lang==="fr"?"VOIR MON SCORE =>":lang==="en"?"SEE MY SCORE =>":lang==="es"?"VER PUNTUACION =>":"VER PONTUACAO =>")
            :(lang==="fr"?"SUIVANT =>":lang==="en"?"NEXT =>":lang==="es"?"SIGUIENTE =>":"PROXIMO =>")}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ — 5 QCM
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Quelle est la formule pour calculer le niveau a partir de l'ullage ?",opts:["Niveau = Ullage - Hauteur","Niveau = Hauteur totale - Ullage","Niveau = Ullage x VCF","Niveau = Densite / Ullage"],ans:1,expl:"Niveau = Hauteur totale de la citerne - Ullage. L'ullage est mesure depuis le sommet de la citerne. Plus l'ullage est petit, plus la citerne est pleine. Ex: citerne 20m, ullage 3m => niveau = 17m."},
    {q:"La temperature de reference pour le volume net selon ASTM est :",opts:["0C","15C","20C","25C"],ans:1,expl:"15°C est la temperature de reference internationale (ASTM D1250 / IP 54B). Tous les volumes cargo sont convertis a 15°C via le VCF pour permettre la comparaison internationale et servir de base legale au Bill of Lading."},
    {q:"Si le VCF est de 0.9980 et le volume brut de 50 000 m3, le volume net est :",opts:["50 100 m3","49 900 m3","45 000 m3","50 000 m3"],ans:1,expl:"Volume net = Volume brut x VCF = 50 000 x 0.9980 = 49 900 m3 (a 15°C). VCF < 1 car le produit etait plus chaud que 15°C lors de la mesure. En refroidissant a 15°C il occupera moins de volume."},
    {q:"Quel document officialise les quantites cargo entre navire et terminal ?",opts:["Manifeste de navigation","Ullage Report signe + Bill of Lading","Cargo Record Book","Plan de chargement"],ans:1,expl:"L'Ullage Report (signe par Chief Officer et surveyor independant) est la base du Bill of Lading (connaissement), document legal qui officialise les quantites echangees. En cas de litige, ce sont les chiffres de l'Ullage Report qui font foi."},
    {q:"Le MV Dona Paz (1987) a montre que le jaugeage frauduleux du Vector :",opts:["A retarde le depart","A cree une quantite inconnue de produit inflammable aggravant la catastrophe","A reduit la charge du navire","A cause la panne du moteur"],ans:1,expl:"Le Vector avait sous-declare les quantites de carburant (sondeo frauduleux). La quantite reelle d'hydrocarbures inflamambles etait donc inconnue. Lors de la collision avec le Dona Paz, l'incendie catastrophique a resulte de cette quantite non connue, rendant toute intervention impossible. 4 341 morts."},
  ],
  en:[
    {q:"What is the formula to calculate level from ullage?",opts:["Level = Ullage - Height","Level = Total height - Ullage","Level = Ullage x VCF","Level = Density / Ullage"],ans:1,expl:"Level = Total tank height - Ullage. Ullage is measured from the tank top. The smaller the ullage, the fuller the tank. Example: 20m tank, 3m ullage => level = 17m."},
    {q:"The reference temperature for net volume per ASTM is:",opts:["0C","15C","20C","25C"],ans:1,expl:"15°C is the international reference temperature (ASTM D1250 / IP 54B). All cargo volumes are converted to 15°C via VCF to allow international comparison and serve as legal basis for the Bill of Lading."},
    {q:"If VCF is 0.9980 and gross volume is 50,000 m3, net volume is:",opts:["50,100 m3","49,900 m3","45,000 m3","50,000 m3"],ans:1,expl:"Net volume = Gross volume x VCF = 50,000 x 0.9980 = 49,900 m3 (at 15°C). VCF < 1 because the product was warmer than 15°C when measured. Cooling to 15°C it will occupy less volume."},
    {q:"Which document officially records cargo quantities between vessel and terminal?",opts:["Navigation manifest","Signed Ullage Report + Bill of Lading","Cargo Record Book","Loading plan"],ans:1,expl:"The Ullage Report (signed by Chief Officer and independent surveyor) is the basis of the Bill of Lading, the legal document officializing exchanged quantities. In disputes, the Ullage Report figures are the legal reference."},
    {q:"The MV Dona Paz (1987) showed that the Vector's fraudulent gauging:",opts:["Delayed departure","Created an unknown quantity of flammable product worsening the disaster","Reduced the vessel's load","Caused engine failure"],ans:1,expl:"The Vector had under-declared fuel quantities (fraudulent gauging). The actual quantity of flammable hydrocarbons was unknown. When the collision with Dona Paz occurred, the catastrophic fire resulted from this unknown quantity, making any intervention impossible. 4,341 deaths."},
  ],
  es:[
    {q:"?Cual es la formula para calcular el nivel a partir del ullage?",opts:["Nivel = Ullage - Altura","Nivel = Altura total - Ullage","Nivel = Ullage x VCF","Nivel = Densidad / Ullage"],ans:1,expl:"Nivel = Altura total del tanque - Ullage. El ullage se mide desde la parte superior del tanque. Cuanto menor es el ullage, mas lleno esta el tanque. Ej: tanque 20m, ullage 3m => nivel = 17m."},
    {q:"La temperatura de referencia para el volumen neto segun ASTM es:",opts:["0C","15C","20C","25C"],ans:1,expl:"15°C es la temperatura de referencia internacional (ASTM D1250 / IP 54B). Todos los volumenes de carga se convierten a 15°C via el VCF para permitir la comparacion internacional y servir de base legal al Bill of Lading."},
    {q:"Si el VCF es 0,9980 y el volumen bruto 50.000 m3, el volumen neto es:",opts:["50.100 m3","49.900 m3","45.000 m3","50.000 m3"],ans:1,expl:"Volumen neto = Volumen bruto x VCF = 50.000 x 0,9980 = 49.900 m3 (a 15°C). VCF < 1 porque el producto estaba mas caliente que 15°C al medir. Al enfriarse a 15°C ocupara menos volumen."},
    {q:"?Que documento oficializa las cantidades de carga entre buque y terminal?",opts:["Manifiesto de navegacion","Ullage Report firmado + Bill of Lading","Cargo Record Book","Plan de carga"],ans:1,expl:"El Ullage Report (firmado por Primer Oficial e inspector independiente) es la base del Bill of Lading, el documento legal que oficializa las cantidades intercambiadas. En disputas, las cifras del Ullage Report son la referencia legal."},
    {q:"El MV Dona Paz (1987) demostro que el sondeo fraudulento del Vector:",opts:["Retraso la salida","Creo una cantidad desconocida de producto inflamable agravando la catastrofe","Redujo la carga del buque","Causo la averia del motor"],ans:1,expl:"El Vector habia subdeclarado las cantidades de combustible (sondeo fraudulento). La cantidad real de hidrocarburos inflamables era desconocida. Al colisionar con el Dona Paz, el incendio catastrofico resulto de esta cantidad desconocida. 4.341 muertos."},
  ],
  pt:[
    {q:"Qual e a formula para calcular o nivel a partir do ullage?",opts:["Nivel = Ullage - Altura","Nivel = Altura total - Ullage","Nivel = Ullage x VCF","Nivel = Densidade / Ullage"],ans:1,expl:"Nivel = Altura total do tanque - Ullage. O ullage e medido a partir do topo do tanque. Quanto menor o ullage, mais cheio esta o tanque. Ex: tanque 20m, ullage 3m => nivel = 17m."},
    {q:"A temperatura de referencia para o volume neto segundo ASTM e:",opts:["0C","15C","20C","25C"],ans:1,expl:"15°C e a temperatura de referencia internacional (ASTM D1250 / IP 54B). Todos os volumes de carga sao convertidos a 15°C via VCF para permitir a comparacao internacional e servir de base legal ao Bill of Lading."},
    {q:"Se o VCF e 0,9980 e o volume bruto 50.000 m3, o volume neto e:",opts:["50.100 m3","49.900 m3","45.000 m3","50.000 m3"],ans:1,expl:"Volume neto = Volume bruto x VCF = 50.000 x 0,9980 = 49.900 m3 (a 15°C). VCF < 1 porque o produto estava mais quente que 15°C ao medir. Ao arrefecer a 15°C ocupara menos volume."},
    {q:"Que documento oficializa as quantidades de carga entre navio e terminal?",opts:["Manifesto de navegacao","Ullage Report assinado + Bill of Lading","Cargo Record Book","Plano de carga"],ans:1,expl:"O Ullage Report (assinado pelo Primeiro Oficial e inspector independente) e a base do Bill of Lading, o documento legal que oficializa as quantidades trocadas. Em disputas, os valores do Ullage Report sao a referencia legal."},
    {q:"O MV Dona Paz (1987) mostrou que a sondagem fraudulenta do Vector:",opts:["Atrasou a partida","Criou uma quantidade desconhecida de produto inflamavel agravando a catastrofe","Reduziu a carga do navio","Causou a avaria do motor"],ans:1,expl:"O Vector tinha subdeclarado as quantidades de combustivel (sondagem fraudulenta). A quantidade real de hidrocarbonetos inflamaveis era desconhecida. Na colisao com o Dona Paz, o incendio catastrofico resultou desta quantidade desconhecida. 4.341 mortos."},
  ],
};

function QuizComp({ questions, t, lang, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const total = questions.length;
  const isLast = idx===total-1;
  const q = questions[idx];

  const handleAnswer = (i) => {
    if (answered) return;
    setSel(i); setAnswered(true);
    if (i===q.ans) setScore(s=>s+1);
  };
  const handleNext = () => {
    const fs = score+(sel===q.ans?1:0);
    if (isLast) { onComplete(fs); return; }
    setSel(null); setAnswered(false); setIdx(i=>i+1);
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:10,color:C.muted}}>{t.question} {idx+1} {t.ofQ} {total}</span>
        <span style={{fontSize:10,color:C.gold,fontWeight:700}}>✓ {score}</span>
      </div>
      <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:4,marginBottom:14,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${C.gauge},${C.gold})`,borderRadius:4,transition:"width 0.3s"}}/>
      </div>
      <div style={{background:"rgba(0,0,0,0.3)",borderRadius:14,padding:"14px",marginBottom:12,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:14,color:C.white,lineHeight:1.6,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(13,31,60,0.6)",border=C.border,col=C.white;
        if (answered) {
          if (i===q.ans) { bg="rgba(30,138,74,0.2)"; border=C.green; col=C.green; }
          else if (i===sel) { bg="rgba(192,57,43,0.2)"; border=C.red; col=C.red; }
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"12px 14px",marginBottom:8,borderRadius:12,background:bg,border:`1px solid ${border}`,color:col,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:700,marginRight:8,color:C.gold2}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"12px",borderRadius:12,background:`rgba(${sel===q.ans?"30,138,74":"192,57,43"},0.1)`,border:`1px solid ${sel===q.ans?C.green:C.red}44`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,color:sel===q.ans?C.green:C.red,marginBottom:4}}>
            {sel===q.ans?t.correct:t.wrong}
          </div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>{t.expl} {q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"14px",borderRadius:14,background:`linear-gradient(135deg,${C.gauge},${C.gold})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
          {isLast?t.finish:t.next}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// CONTENT
// ══════════════════════════════════════
const getContent = (lang) => {
  const d = {
    fr:{
      badge:"Module e6 - Cargaison & Petrole - Lecon 6/6 - Premium - 250 XP",
      title:"Jaugeage & Mesures Cargo - Ullage, VCF et Quantification",
      intro:"Comment peser 200 000 tonnes de petrole brut sans balance ? En mesurant le niveau dans chaque citerne, en corrigeant pour la temperature, et en multipliant par la densite. Le jaugeage cargo est une science de precision qui engage la responsabilite juridique du navire.\n\nCette lecon finale du module e6 couvre les methodes de jaugeage, le calcul du volume net, les tables VCF et la documentation officielle.",
      p1:"PARTIE 1 - ULLAGE ET JAUGEAGE MANUEL",s1t:"Ruban de jaugeage - Mesure de l'ullage",
      s1:"DEFINITION DE L'ULLAGE:\nDistance entre la surface du liquide et le point de reference en haut de la citerne (dome de jaugeage ou hatch d'ullage).\n\nFORMULE FONDAMENTALE:\nNiveau = Hauteur totale citerne - Ullage\n\nMETHODE MANUELLE (RUBAN):\nInstrument : ruban d'acier gradue + bob (plomb)\nProcedure :\n1. Abaisser le ruban jusqu'au fond de la citerne\n2. Lire l'ullage a l'echelle (de haut en bas)\n3. Relever le bob et noter le niveau de produit\n4. Appliquer les corrections (trim, gite, temperature)\n\nCORRECTIONS OBLIGATOIRES:\nTrim correction : selon tables specifiques au navire\nList correction : si gite > 0.5°\nTemperature : mesure simultanee pour VCF\nReference point correction : position du dome",
      p2:"PARTIE 2 - TYPES DE JAUGES ELECTRONIQUES",s2t:"Flotteur, radar, servo - Comparaison et precision",
      s2:"4 TECHNOLOGIES PRINCIPALES:\n\n1. RUBAN MANUEL (reference):\nPrecision : +/- 2mm\nAvantage : reference legale universelle\nLimite : lent, risque vapeurs HC\n\n2. JAUGE A FLOTTEUR:\nPrecision : +/- 5mm\nAvantage : lecture continue automatique\nLimite : encrassement, flotteur peut coincer\n\n3. JAUGE RADAR (GRL - Guided Radar Level):\nPrecision : +/- 1-2mm\nAvantage : sans contact, insensible temperature\nLimite : cout, maintenance electronique\n\n4. JAUGE SERVO-MOTEUR:\nPrecision : +/- 0.5mm (reference legale)\nAvantage : mesure densite + niveau\nLimite : maintenance complexe, encrassement",
      p3:"PARTIE 3 - CALCUL VOLUME NET ET VCF",s3t:"Ullage => Niveau => Volume brut => VCF => Volume net => Masse",
      s3:"CHAINE DE CALCUL CARGO:\n\n1. Mesure ullage (m)\n2. Niveau = Haut. totale - Ullage (m)\n3. Volume brut = f(niveau) selon table citerne (m3)\n4. Temperature cargo mesuree (C)\n5. VCF = f(T, densite) selon tables ASTM 54B\n6. Volume net = Volume brut x VCF (m3 a 15C)\n7. Densite a 15C mesuree ou calculee\n8. Masse = Volume net x Densite (tonnes metriques)\n\nVCF SELON ASTM 54B:\nSi T > 15C : VCF < 1 (produit dilate)\nSi T < 15C : VCF > 1 (produit contracte)\nVariation typique : 0.00065 x deltaT pour bruts legers\nEx : brut a 40C => VCF environ 0.983\n\nBILL OF LADING:\nQuantite officielle = Volume net + Masse\nSigne par Master / Chief Officer\nBase legale toutes transactions",
      p4:"PARTIE 4 - DOCUMENTATION ET PROCEDURES",s4t:"Ullage Report - Cargo Record Book - OBQ/ROB",
      s4:"ULLAGE REPORT:\nDocument officiel de chaque jaugeage\nContenu : citerne / ullage / temperature / VCF / vol brut / vol net / masse\nSigne par : Chief Officer + inspecteur cargo independant\nBase du Bill of Lading\n\nCARGO RECORD BOOK:\nJournal de toutes les operations cargo\nJaugeage toutes les 4 heures minimum\nEnregistrement des corrections appliquees\nConserve 3 ans minimum a bord\n\nOBQ (ON BOARD QUANTITY):\nResidus avant chargement (fond de citerne)\nMesure et signatured avant debut chargement\nDeduit des quantites chargees selon charte\n\nROB (REMAINING ON BOARD):\nResidus apres dechargement\nSignature du Master et surveyor\nBase deduction Bill of Lading suivant\n\nJAUGEAGE STATIQUE OBLIGATOIRE:\nAu repos 30 minutes minimum\nApres stabilisation de temperature\nAux deux extremites (avant / arriere) si grand navire",
      p5:"EXERCICES PRATIQUES PREMIUM",p6:"CAS D'ACCIDENT REEL",p7:"BANQUE - 15 QUESTIONS PREMIUM",
      sumT:"RESUME - LECON E6 L6 - FIN MODULE e6",
      sumP:["Ullage = distance surface au sommet citerne","Niveau = Hauteur totale - Ullage","Volume net = Volume brut x VCF (ref. 15C)","Masse = Volume net x Densite a 15C","VCF selon tables ASTM 54B - T et densite","Servo-jauge: +/-0.5mm - reference legale","Ullage Report : signe Chief Officer + surveyor","OBQ/ROB : residus avant/apres charge","Jaugeage statique : repos 30 min minimum","Dona Paz/Vector 1987 : jaugeage frauduleux => catastrophe"],
      learnedP:["Ullage et formule niveau","Calcul volume net via VCF ASTM 54B","4 types de jauges electroniques","Ullage Report + Bill of Lading","OBQ/ROB et documentation cargo"],
    },
    en:{
      badge:"Module e6 - Cargo & Oil - Lesson 6/6 - Premium - 250 XP",
      title:"Gauging & Cargo Measurements - Ullage, VCF and Quantification",
      intro:"How do you weigh 200,000 tonnes of crude oil without a scale? By measuring the level in each tank, correcting for temperature, and multiplying by density. Cargo gauging is a precision science that engages the vessel's legal liability.\n\nThis final lesson of module e6 covers gauging methods, net volume calculation, VCF tables and official documentation.",
      p1:"PART 1 - ULLAGE AND MANUAL GAUGING",s1t:"Gauging tape - Ullage measurement",
      s1:"ULLAGE DEFINITION:\nDistance from liquid surface to the reference point at the top of the tank (gauging dome or ullage hatch).\n\nFUNDAMENTAL FORMULA:\nLevel = Total tank height - Ullage\n\nMANUAL METHOD (TAPE):\nInstrument: graduated steel tape + bob (plumb)\nProcedure:\n1. Lower tape to tank bottom\n2. Read ullage on scale (top to bottom)\n3. Retrieve bob and note product level\n4. Apply corrections (trim, list, temperature)\n\nMANDATORY CORRECTIONS:\nTrim correction: per vessel-specific tables\nList correction: if list > 0.5°\nTemperature: simultaneous measurement for VCF\nReference point correction: dome position",
      p2:"PART 2 - ELECTRONIC GAUGE TYPES",s2t:"Float, radar, servo - Comparison and accuracy",
      s2:"4 MAIN TECHNOLOGIES:\n\n1. MANUAL TAPE (reference):\nAccuracy: +/- 2mm\nAdvantage: universal legal reference\nLimit: slow, HC vapor risk\n\n2. FLOAT GAUGE:\nAccuracy: +/- 5mm\nAdvantage: continuous automatic reading\nLimit: fouling, float can stick\n\n3. RADAR GAUGE (GRL):\nAccuracy: +/- 1-2mm\nAdvantage: non-contact, temperature-insensitive\nLimit: cost, electronic maintenance\n\n4. SERVO GAUGE:\nAccuracy: +/- 0.5mm (legal reference)\nAdvantage: density + level measurement\nLimit: complex maintenance, fouling",
      p3:"PART 3 - NET VOLUME AND VCF CALCULATION",s3t:"Ullage => Level => Gross vol => VCF => Net vol => Mass",
      s3:"CARGO CALCULATION CHAIN:\n\n1. Ullage measurement (m)\n2. Level = Total height - Ullage (m)\n3. Gross volume = f(level) per tank table (m3)\n4. Observed cargo temperature (C)\n5. VCF = f(T, density) per ASTM 54B tables\n6. Net volume = Gross volume x VCF (m3 at 15C)\n7. Density at 15C measured or calculated\n8. Mass = Net volume x Density (metric tonnes)\n\nVCF PER ASTM 54B:\nIf T > 15C: VCF < 1 (expanded product)\nIf T < 15C: VCF > 1 (contracted product)\nTypical variation: 0.00065 x deltaT for light crudes\nEx: crude at 40C => VCF approx 0.983\n\nBILL OF LADING:\nOfficial quantity = Net volume + Mass\nSigned by Master / Chief Officer\nLegal basis all transactions",
      p4:"PART 4 - DOCUMENTATION AND PROCEDURES",s4t:"Ullage Report - Cargo Record Book - OBQ/ROB",
      s4:"ULLAGE REPORT:\nOfficial document of each gauging\nContents: tank / ullage / temperature / VCF / gross vol / net vol / mass\nSigned by: Chief Officer + independent cargo inspector\nBasis of Bill of Lading\n\nCARGO RECORD BOOK:\nLog of all cargo operations\nGauging minimum every 4 hours\nRecord of applied corrections\nKept minimum 3 years on board\n\nOBQ (ON BOARD QUANTITY):\nResidues before loading (tank bottoms)\nMeasured and signed before loading starts\nDeducted from loaded quantities per charter\n\nROB (REMAINING ON BOARD):\nResidues after discharge\nSigned by Master and surveyor\nBasis next Bill of Lading deduction\n\nMANDATORY STATIC GAUGING:\nAt rest minimum 30 minutes\nAfter temperature stabilization\nAt both ends (fore/aft) for large vessels",
      p5:"ADVANCED PREMIUM EXERCISES",p6:"REAL ACCIDENT CASE",p7:"BANK - 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY - LESSON E6 L6 - MODULE e6 COMPLETE",
      sumP:["Ullage = distance from surface to tank top","Level = Total height - Ullage","Net volume = Gross volume x VCF (ref. 15C)","Mass = Net volume x Density at 15C","VCF per ASTM 54B tables - T and density","Servo gauge: +/-0.5mm - legal reference","Ullage Report: signed Chief Officer + surveyor","OBQ/ROB: residues before/after loading","Static gauging: min 30 min at rest","Dona Paz/Vector 1987: fraudulent gauging => disaster"],
      learnedP:["Ullage and level formula","Net volume calculation via VCF ASTM 54B","4 types of electronic gauges","Ullage Report + Bill of Lading","OBQ/ROB and cargo documentation"],
    },
    es:{
      badge:"Modulo e6 - Carga & Petroleo - Leccion 6/6 - Premium - 250 XP",
      title:"Sondeo & Mediciones de Carga - Ullage, VCF y Cuantificacion",
      intro:"?Como pesar 200.000 toneladas de crudo sin bascula? Midiendo el nivel en cada tanque, corrigiendo por temperatura y multiplicando por la densidad. El sondeo de carga es una ciencia de precision que compromete la responsabilidad juridica del buque.\n\nEsta leccion final del modulo e6 cubre los metodos de sondeo, el calculo del volumen neto, las tablas VCF y la documentacion oficial.",
      p1:"PARTE 1 - ULLAGE Y SONDEO MANUAL",s1t:"Cinta de sondeo - Medicion del ullage",
      s1:"DEFINICION DE ULLAGE:\nDistancia entre la superficie del liquido y el punto de referencia en la parte superior del tanque.\n\nFORMULA FUNDAMENTAL:\nNivel = Altura total tanque - Ullage\n\nMETODO MANUAL (CINTA):\nInstrumento: cinta de acero graduada + plomada\nProcedimiento: bajar cinta hasta el fondo, leer ullage, aplicar correcciones (asiento, escora, temperatura)\n\nCORRECCIONES OBLIGATORIAS:\nCorreccion de asiento, escora, temperatura, punto de referencia",
      p2:"PARTE 2 - TIPOS DE MEDIDORES ELECTRONICOS",s2t:"Flotador, radar, servo - Comparacion y precision",
      s2:"4 TECNOLOGIAS PRINCIPALES:\n1. Cinta manual: +/-2mm - referencia legal\n2. Medidor flotador: +/-5mm - lectura continua\n3. Medidor radar: +/-1-2mm - sin contacto\n4. Medidor servo: +/-0.5mm - referencia legal maxima\n\nEl medidor servo es la referencia legal maxima segun ASTM D3900.",
      p3:"PARTE 3 - CALCULO VOLUMEN NETO Y VCF",s3t:"Ullage => Nivel => Vol bruto => VCF => Vol neto => Masa",
      s3:"CADENA DE CALCULO:\n1. Medicion ullage (m)\n2. Nivel = Altura - Ullage\n3. Vol. bruto desde tabla de tanque (m3)\n4. Temperatura observada\n5. VCF = f(T, densidad) tablas ASTM 54B\n6. Vol. neto = Vol. bruto x VCF (m3 a 15C)\n7. Masa = Vol. neto x Densidad (MT)\n\nVCF: T>15C => VCF<1 | T<15C => VCF>1\nBill of Lading: cantidad oficial firmada por el Capitan",
      p4:"PARTE 4 - DOCUMENTACION Y PROCEDIMIENTOS",s4t:"Ullage Report - Cargo Record Book - OBQ/ROB",
      s4:"ULLAGE REPORT: documento oficial firmado por Primer Oficial + inspector\nCARGO RECORD BOOK: registro de todas las operaciones cargo (minimo 3 anos)\nOBQ: residuos ANTES del cargamento - deducibles\nROB: residuos DESPUES de la descarga - base siguente BL\nSondeo estatico: reposo minimo 30 minutos",
      p5:"EJERCICIOS AVANZADOS PREMIUM",p6:"CASO REAL",p7:"BANCO - 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN - LECCION E6 L6 - FIN MODULO e6",
      sumP:["Ullage = distancia superficie a techo tanque","Nivel = Altura total - Ullage","Volumen neto = Vol. bruto x VCF (ref. 15C)","Masa = Vol. neto x Densidad a 15C","VCF segun tablas ASTM 54B","Servo: +/-0.5mm - referencia legal maxima","Ullage Report: firmado Primer Oficial + inspector","OBQ/ROB: residuos antes/despues cargamento","Sondeo estatico: reposo 30 min minimo","Dona Paz/Vector 1987: sondeo fraudulento => catastrofe"],
      learnedP:["Ullage y formula nivel","Calculo vol. neto via VCF ASTM 54B","4 tipos medidores electronicos","Ullage Report + Bill of Lading","OBQ/ROB y documentacion cargo"],
    },
    pt:{
      badge:"Modulo e6 - Carga & Petroleo - Licao 6/6 - Premium - 250 XP",
      title:"Sondagem & Medicoes de Carga - Ullage, VCF e Quantificacao",
      intro:"Como pesar 200.000 toneladas de crude sem balanca? Medindo o nivel em cada tanque, corrigindo pela temperatura e multiplicando pela densidade. A sondagem de carga e uma ciencia de precisao que envolve a responsabilidade juridica do navio.\n\nEsta licao final do modulo e6 cobre os metodos de sondagem, o calculo do volume neto, as tabelas VCF e a documentacao oficial.",
      p1:"PARTE 1 - ULLAGE E SONDAGEM MANUAL",s1t:"Fita de sondagem - Medicao do ullage",
      s1:"DEFINICAO DE ULLAGE:\nDistancia entre a superficie do liquido e o ponto de referencia no topo do tanque.\n\nFORMULA FUNDAMENTAL:\nNivel = Altura total tanque - Ullage\n\nMETODO MANUAL (FITA):\nInstrumento: fita de aco graduada + prumo\nProcedimento: baixar fita ate ao fundo, ler ullage, aplicar correcoes (trim, escora, temperatura)\n\nCORRECOES OBRIGATORIAS:\nCorrecao de trim, escora, temperatura, ponto de referencia",
      p2:"PARTE 2 - TIPOS DE MEDIDORES ELECTRONICOS",s2t:"Flutuador, radar, servo - Comparacao e precisao",
      s2:"4 TECNOLOGIAS PRINCIPAIS:\n1. Fita manual: +/-2mm - referencia legal\n2. Medidor flutuador: +/-5mm - leitura continua\n3. Medidor radar: +/-1-2mm - sem contacto\n4. Medidor servo: +/-0.5mm - referencia legal maxima\n\nO medidor servo e a referencia legal maxima segundo ASTM D3900.",
      p3:"PARTE 3 - CALCULO VOLUME NETO E VCF",s3t:"Ullage => Nivel => Vol bruto => VCF => Vol neto => Massa",
      s3:"CADEIA DE CALCULO:\n1. Medicao ullage (m)\n2. Nivel = Altura - Ullage\n3. Vol. bruto da tabela de tanque (m3)\n4. Temperatura observada\n5. VCF = f(T, densidade) tabelas ASTM 54B\n6. Vol. neto = Vol. bruto x VCF (m3 a 15C)\n7. Massa = Vol. neto x Densidade (MT)\n\nVCF: T>15C => VCF<1 | T<15C => VCF>1\nBill of Lading: quantidade oficial assinada pelo Capitao",
      p4:"PARTE 4 - DOCUMENTACAO E PROCEDIMENTOS",s4t:"Ullage Report - Cargo Record Book - OBQ/ROB",
      s4:"ULLAGE REPORT: documento oficial assinado por Primeiro Oficial + inspector\nCARGO RECORD BOOK: registo de todas as operacoes cargo (minimo 3 anos)\nOBQ: residuos ANTES do carregamento - dedutivel\nROB: residuos APOS descarga - base proximo BL\nSondagem estatica: repouso minimo 30 minutos",
      p5:"EXERCICIOS AVANCADOS PREMIUM",p6:"CASO REAL",p7:"BANCO - 15 QUESTOES PREMIUM",
      sumT:"RESUMO - LICAO E6 L6 - FIM MODULO e6",
      sumP:["Ullage = distancia superficie ao topo tanque","Nivel = Altura total - Ullage","Volume neto = Vol. bruto x VCF (ref. 15C)","Massa = Vol. neto x Densidade a 15C","VCF segundo tabelas ASTM 54B","Servo: +/-0.5mm - referencia legal maxima","Ullage Report: assinado Primeiro Oficial + inspector","OBQ/ROB: residuos antes/apos carregamento","Sondagem estatica: repouso 30 min minimo","Dona Paz/Vector 1987: sondagem fraudulenta => catastrofe"],
      learnedP:["Ullage e formula nivel","Calculo vol. neto via VCF ASTM 54B","4 tipos medidores electronicos","Ullage Report + Bill of Lading","OBQ/ROB e documentacao cargo"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════
export default function LessonE6_L6({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress = phase==="content"?15:phase==="quiz"?70:100;
  const trophy = getTrophy(quizScore, 5);

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#060e1a 0%,#0a1628 50%,#060e1a 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.gauge}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gauge,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚓ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Lecon 6/6 - FIN MODULE":lang==="en"?"Lesson 6/6 - MODULE END":lang==="es"?"Leccion 6/6 - FIN MODULO":"Licao 6/6 - FIM MODULO"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>PREMIUM</div>
            <div style={{fontSize:11,color:C.gauge,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.gauge},${C.gold})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(38,198,218,0.15)",border:`1px solid ${C.gauge}44`,fontSize:11,color:C.gauge,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.gauge}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="📏" text={lc.p1} color={C.gauge}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📏</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gauge}33`}}>
              <div style={{fontSize:11,color:C.gauge,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                📏 {lang==="fr"?"RUBAN ULLAGE - INTERACTIF":lang==="en"?"ULLAGE TAPE - INTERACTIVE":lang==="es"?"CINTA ULLAGE - INTERACTIVO":"FITA ULLAGE - INTERATIVO"}
              </div>
              <UllageSVG lang={lang}/>
            </Card>

            <SL icon="🔬" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔬</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🔬 {lang==="fr"?"TYPES DE JAUGES - COMPARAISON":lang==="en"?"GAUGE TYPES - COMPARISON":lang==="es"?"TIPOS MEDIDORES - COMPARACION":"TIPOS MEDIDORES - COMPARACAO"}
              </div>
              <GaugeTypesSVG lang={lang}/>
            </Card>

            <SL icon="🧮" text={lc.p3} color={C.green}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧮</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🧮 {lang==="fr"?"CALCUL CARGO - INTERACTIF":lang==="en"?"CARGO CALCULATION - INTERACTIVE":lang==="es"?"CALCULO CARGO - INTERACTIVO":"CALCULO CARGA - INTERATIVO"}
              </div>
              <VolumeCalcSVG lang={lang}/>
            </Card>

            <SL icon="📊" text={lc.p4} color={C.orange}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📊</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                📊 {lang==="fr"?"TABLE VCF ASTM 54B - INTERACTIF":lang==="en"?"VCF TABLE ASTM 54B - INTERACTIVE":lang==="es"?"TABLA VCF ASTM 54B - INTERACTIVO":"TABELA VCF ASTM 54B - INTERATIVO"}
              </div>
              <VCFTableSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
              <Exercise1 lang={lang} t={t}/>
            </Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}>
              <QuestionBank lang={lang}/>
            </Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(38,198,218,0.06),rgba(13,31,60,0.9))",border:`1px solid ${C.gauge}22`}}>
              <div style={{fontSize:11,color:C.gauge,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.gauge,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>

            {/* Module complete banner */}
            <div style={{padding:"14px",borderRadius:16,background:"linear-gradient(135deg,rgba(38,198,218,0.12),rgba(201,146,42,0.12))",border:`1px solid ${C.gold}44`,marginBottom:14,textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:6}}>🏁</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:C.gold2,marginBottom:4}}>
                {lang==="fr"?"MODULE e6 TERMINE - 6/6 LECONS":lang==="en"?"MODULE e6 COMPLETE - 6/6 LESSONS":lang==="es"?"MODULO e6 COMPLETADO - 6/6 LECCIONES":"MODULO e6 CONCLUIDO - 6/6 LICOES"}
              </div>
              <div style={{fontSize:11,color:C.muted}}>
                {lang==="fr"?"Pompes - Ballast - IGS - COW - Chauffage - Jaugeage"
                :lang==="en"?"Pumps - Ballast - IGS - COW - Heating - Gauging"
                :lang==="es"?"Bombas - Lastre - IGS - COW - Calefaccion - Sondeo"
                :"Bombas - Lastro - IGS - COW - Aquecimento - Sondagem"}
              </div>
            </div>

            <button onClick={()=>setPhase("quiz")}
              style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.gauge},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(38,198,218,0.3)",marginTop:4}}>
              {t.startQuiz}
            </button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final - Jaugeage Cargo":lang==="en"?"Final Quiz - Cargo Gauging":lang==="es"?"Quiz Final - Sondeo Carga":"Quiz Final - Sondagem Carga"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions":lang==="en"?"questions":lang==="es"?"preguntas":"questoes"}</div>
            </div>
            <QuizComp questions={quiz} t={t} lang={lang} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),400);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:72,marginBottom:10}}>{trophy.icon}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:trophy.color,marginBottom:6}}>
                {trophy.label[lang]||trophy.label.fr}
              </div>
              <div style={{fontSize:28,fontWeight:700,color:C.white,marginBottom:4}}>{quizScore}/5</div>
              <div style={{fontSize:18,color:trophy.color,fontWeight:700,marginBottom:16}}>{Math.round(quizScore/5*100)}%</div>
              <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:8,margin:"0 20px 20px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${quizScore/5*100}%`,background:`linear-gradient(90deg,${C.gauge},${trophy.color})`,borderRadius:8,transition:"width 0.8s ease"}}/>
              </div>
              {/* Module complete */}
              <div style={{padding:"12px 16px",borderRadius:14,background:"linear-gradient(135deg,rgba(38,198,218,0.12),rgba(201,146,42,0.12))",border:`1px solid ${C.gold}44`,marginBottom:16}}>
                <div style={{fontSize:24,marginBottom:4}}>🏁</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.gold2,marginBottom:2}}>
                  {lang==="fr"?"MODULE e6 COMPLETE !":lang==="en"?"MODULE e6 COMPLETE!":lang==="es"?"MODULO e6 COMPLETADO!":"MODULO e6 CONCLUIDO!"}
                </div>
                <div style={{fontSize:10,color:C.muted}}>
                  +{quizScore>=4?250:quizScore===3?150:80} {t.xp} ⭐
                </div>
              </div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.gauge,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>
            <button onClick={onComplete}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.gauge},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(38,198,218,0.3)",marginBottom:10}}>
              {lang==="fr"?"VERS MODULE e7 =>":lang==="en"?"TO MODULE e7 =>":lang==="es"?"AL MODULO e7 =>":"PARA MODULO e7 =>"}
            </button>
            <button onClick={onBack}
              style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>
              {t.backDash}
            </button>
          </div>}

        </div>
      </div>
    </div>
  );
}
