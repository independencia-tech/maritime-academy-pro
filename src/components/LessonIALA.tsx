// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  yellow:"#f1c40f", buoyRed:"#c0392b", buoyGreen:"#27ae60",
  buoyBlack:"#1a1a2e", buoyYellow:"#f39c12", buoyWhite:"#ecf0f1",
};

const T = {
  fr:{ back:"◀ Retour", module:"Signalisation & Balisage", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Signaling & Buoyage", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Señalización y Balizamiento", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Sinalização e Balizagem", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// BUOY SVG COMPONENT
// ══════════════════════════════════════
function BuoySVG({ color1, color2, topmark, size=52, label="" }) {
  const w=size, h=size*1.6;
  const renderTopmark = () => {
    if(!topmark) return null;
    if(topmark==="cone_up") return <polygon points={`${w/2},2 ${w/2-8},18 ${w/2+8},18`} fill={color1}/>;
    if(topmark==="cone_down") return <polygon points={`${w/2},18 ${w/2-8},2 ${w/2+8},2`} fill={color1}/>;
    if(topmark==="2cones_up") return <><polygon points={`${w/2},2 ${w/2-7},14 ${w/2+7},14`} fill={color1}/><polygon points={`${w/2},16 ${w/2-7},28 ${w/2+7},28`} fill={color1}/></>;
    if(topmark==="2cones_down") return <><polygon points={`${w/2},14 ${w/2-7},2 ${w/2+7},2`} fill={color1}/><polygon points={`${w/2},28 ${w/2-7},16 ${w/2+7},16`} fill={color1}/></>;
    if(topmark==="2cones_base") return <><polygon points={`${w/2},2 ${w/2-7},14 ${w/2+7},14`} fill={color1}/><polygon points={`${w/2},28 ${w/2-7},16 ${w/2+7},16`} fill={color1}/></>;
    if(topmark==="sphere") return <circle cx={w/2} cy={10} r={9} fill={C.yellow}/>;
    if(topmark==="cylinder") return <rect x={w/2-7} y={2} width={14} height={18} rx={2} fill={color1}/>;
    if(topmark==="cross") return <><rect x={w/2-1.5} y={2} width={3} height={20} fill={C.yellow}/><rect x={w/2-10} y={9} width={20} height={3} fill={C.yellow}/></>;
    if(topmark==="x") return <><line x1={w/2-8} y1={2} x2={w/2+8} y2={18} stroke={C.yellow} strokeWidth={3}/><line x1={w/2+8} y1={2} x2={w/2-8} y2={18} stroke={C.yellow} strokeWidth={3}/></>;
    return null;
  };
  const tmH = topmark ? 32 : 4;
  const bodyY = tmH;
  const bodyH = h*0.5;
  const bodyMid = bodyY + bodyH/2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {renderTopmark()}
      {/* Mast */}
      <line x1={w/2} y1={tmH} x2={w/2} y2={bodyY} stroke="#aaa" strokeWidth={1.5}/>
      {/* Body - buoy shape */}
      {color2 && color2!==color1 ? (
        <>
          <ellipse cx={w/2} cy={bodyY} rx={w*0.38} ry={bodyH*0.15} fill={color1}/>
          <rect x={w/2-w*0.38} y={bodyY} width={w*0.76} height={bodyH/2} fill={color1}/>
          <rect x={w/2-w*0.38} y={bodyMid} width={w*0.76} height={bodyH/2} fill={color2}/>
          <ellipse cx={w/2} cy={bodyY+bodyH} rx={w*0.38} ry={bodyH*0.15} fill={color2}/>
        </>
      ) : (
        <>
          <ellipse cx={w/2} cy={bodyY} rx={w*0.38} ry={bodyH*0.15} fill={color1}/>
          <rect x={w/2-w*0.38} y={bodyY} width={w*0.76} height={bodyH} fill={color1}/>
          <ellipse cx={w/2} cy={bodyY+bodyH} rx={w*0.38} ry={bodyH*0.15} fill={color1}/>
        </>
      )}
      {/* Waterline */}
      <line x1={w*0.1} y1={bodyY+bodyH*0.85} x2={w*0.9} y2={bodyY+bodyH*0.85} stroke="rgba(74,144,226,0.6)" strokeWidth={1.5} strokeDasharray="3,2"/>
      {/* Chain */}
      <line x1={w/2} y1={bodyY+bodyH} x2={w/2} y2={h-4} stroke="#888" strokeWidth={1.5} strokeDasharray="2,2"/>
      {label&&<text x={w/2} y={h-1} textAnchor="middle" fontSize={8} fill={C.muted}>{label}</text>}
    </svg>
  );
}

// ══════════════════════════════════════
// SVG 1 — IALA ZONES MAP
// ══════════════════════════════════════
function IALAZonesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const zones = [
    { id:"A", color:"#c0392b", icon:"🇪🇺",
      label:{fr:"Région A — IALA A",en:"Region A — IALA A",es:"Región A — IALA A",pt:"Região A — IALA A"},
      area:{fr:"Europe · Afrique · Asie · Australie · Russie",en:"Europe · Africa · Asia · Australia · Russia",es:"Europa · África · Asia · Australia · Rusia",pt:"Europa · África · Ásia · Austrália · Rússia"},
      rule:{fr:"BÂBORD = ROUGE (en entrant au port)\n\nMarques latérales :\n→ Bâbord (gauche) = bouée ROUGE · cylindrique\n→ Tribord (droite) = bouée VERTE · conique\n\nFeux :\n→ Bâbord = feu ROUGE\n→ Tribord = feu VERT\n\nEn entrant au port (remontant le courant) :\n→ Bouée rouge = à GAUCHE\n→ Bouée verte = à DROITE\n\nMoyen mnémotechnique IALA A :\n'Rouge à gauche quand on rentre'",en:"PORT = RED (when entering port)\n\nLateral marks:\n→ Port (left) = RED buoy · cylindrical\n→ Starboard (right) = GREEN buoy · conical\n\nLights:\n→ Port = RED light\n→ Starboard = GREEN light\n\nWhen entering port (going upstream):\n→ Red buoy = on your LEFT\n→ Green buoy = on your RIGHT\n\nIALA A mnemonic:\n'Red on left when entering'",es:"BABOR = ROJO (al entrar al puerto)\n\nMarcas laterales:\n→ Babor (izquierda) = baliza ROJA · cilíndrica\n→ Estribor (derecha) = baliza VERDE · cónica\n\nLuces:\n→ Babor = luz ROJA\n→ Estribor = luz VERDE\n\nAl entrar al puerto:\n→ Baliza roja = a la IZQUIERDA\n→ Baliza verde = a la DERECHA",pt:"BOMBORDO = VERMELHO (ao entrar no porto)\n\nMarcas laterais:\n→ Bombordo (esquerda) = boia VERMELHA · cilíndrica\n→ Estibordo (direita) = boia VERDE · cónica\n\nLuzes:\n→ Bombordo = luz VERMELHA\n→ Estibordo = luz VERDE\n\nAo entrar no porto:\n→ Boia vermelha = à ESQUERDA\n→ Boia verde = à DIREITA"},},
    { id:"B", color:"#27ae60", icon:"🌎",
      label:{fr:"Région B — IALA B",en:"Region B — IALA B",es:"Región B — IALA B",pt:"Região B — IALA B"},
      area:{fr:"Amériques · Japon · Corée · Philippines",en:"Americas · Japan · Korea · Philippines",es:"Américas · Japón · Corea · Filipinas",pt:"Américas · Japão · Coreia · Filipinas"},
      rule:{fr:"BÂBORD = VERT (en entrant au port)\n\nMarques latérales :\n→ Bâbord (gauche) = bouée VERTE · cylindrique\n→ Tribord (droite) = bouée ROUGE · conique\n\nFeux :\n→ Bâbord = feu VERT\n→ Tribord = feu ROUGE\n\nEN ENTRANT AU PORT :\n→ Bouée verte = à GAUCHE\n→ Bouée rouge = à DROITE\n\nATTENTION :\nC'est L'INVERSE de la région A !\nUn marin doit TOUJOURS vérifier la région IALA\navant d'entrer dans un port inconnu",en:"PORT = GREEN (when entering port)\n\nLateral marks:\n→ Port (left) = GREEN buoy · cylindrical\n→ Starboard (right) = RED buoy · conical\n\nLights:\n→ Port = GREEN light\n→ Starboard = RED light\n\nWHEN ENTERING PORT:\n→ Green buoy = on your LEFT\n→ Red buoy = on your RIGHT\n\nWARNING:\nThis is the OPPOSITE of Region A!\nA mariner must ALWAYS check the IALA region\nbefore entering an unknown port",es:"BABOR = VERDE (al entrar al puerto)\n\nMarcas laterales:\n→ Babor (izquierda) = baliza VERDE · cilíndrica\n→ Estribor (derecha) = baliza ROJA · cónica\n\nLuces:\n→ Babor = luz VERDE\n→ Estribor = luz ROJA\n\nAl entrar al puerto:\n→ Baliza verde = a la IZQUIERDA\n→ Baliza roja = a la DERECHA\n\nATENCIÓN: ¡Es lo CONTRARIO de la región A!",pt:"BOMBORDO = VERDE (ao entrar no porto)\n\nMarcas laterais:\n→ Bombordo (esquerda) = boia VERDE · cilíndrica\n→ Estibordo (direita) = boia VERMELHA · cónica\n\nLuzes:\n→ Bombordo = luz VERDE\n→ Estibordo = luz VERMELHA\n\nAo entrar no porto:\n→ Boia verde = à ESQUERDA\n→ Boia vermelha = à DIREITA\n\nATENÇÃO: É o OPOSTO da região A!"},
    },
  ];
  const sel_ = sel!==null ? zones[sel] : null;
  return (
    <div>
      <div style={{display:"flex",gap:10,marginBottom:10}}>
        {zones.map((z,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)}
            style={{flex:1,padding:"12px 8px",borderRadius:14,cursor:"pointer",textAlign:"center",
              background:sel===i?`${z.color}22`:"rgba(255,255,255,0.04)",
              border:`2px solid ${sel===i?z.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:28,marginBottom:4}}>{z.icon}</div>
            <div style={{fontSize:12,fontWeight:700,color:sel===i?z.color:C.muted}}>{z.label[lang]||z.label.fr}</div>
            <div style={{fontSize:10,color:z.color,marginTop:3}}>{z.area[lang]||z.area.fr}</div>
            <div style={{marginTop:8,display:"flex",gap:6,justifyContent:"center"}}>
              {i===0 ? (
                <>
                  <BuoySVG color1={C.buoyRed} color2={null} topmark="cylinder" size={28}/>
                  <BuoySVG color1={C.buoyGreen} color2={null} topmark="cone_up" size={28}/>
                </>
              ) : (
                <>
                  <BuoySVG color1={C.buoyGreen} color2={null} topmark="cylinder" size={28}/>
                  <BuoySVG color1={C.buoyRed} color2={null} topmark="cone_up" size={28}/>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.icon} {sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.rule[lang]||sel_.rule.fr}</div>
      </div>}
      {!sel_&&<div style={{padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.04)",textAlign:"center",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une région pour les détails":lang==="en"?"Tap a region for details":"Toca una región para los detalles"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — LATERAL MARKS SIMULATOR
// ══════════════════════════════════════
function LateralMarksSVG({ lang }) {
  const [region, setRegion] = useState("A");
  const [side, setSide] = useState(null);
  const portColor = region==="A" ? C.buoyRed : C.buoyGreen;
  const stbdColor = region==="A" ? C.buoyGreen : C.buoyRed;
  const portLight = region==="A" ? "🔴" : "🟢";
  const stbdLight = region==="A" ? "🟢" : "🔴";
  const portLabel = lang==="fr"?"Bâbord":lang==="en"?"Port":lang==="es"?"Babor":"Bombordo";
  const stbdLabel = lang==="fr"?"Tribord":lang==="en"?"Starboard":lang==="es"?"Estribor":"Estibordo";

  const details = {
    port:{
      fr:`MARQUE DE BÂBORD — Région ${region}\nCouleur : ${region==="A"?"ROUGE":"VERTE"}\nForme : CYLINDRIQUE (can)\nTopmark : ${region==="A"?"Cylindre rouge":"Cylindre vert"}\nFeu : ${region==="A"?"ROUGE":"VERT"} · rythmique\n\nPLACEMENT :\nSe trouve à BÂBORD (gauche) en entrant\n\nMESSAGE :\n'Danger à gauche — reste à droite de cette bouée'`,
      en:`PORT MARK — Region ${region}\nColor: ${region==="A"?"RED":"GREEN"}\nShape: CYLINDRICAL (can)\nTopmark: ${region==="A"?"Red cylinder":"Green cylinder"}\nLight: ${region==="A"?"RED":"GREEN"} · rhythmic\n\nPLACEMENT:\nFound on PORT side (left) when entering\n\nMESSAGE:\n'Danger on left — stay to right of this buoy'`,
      es:`MARCA DE BABOR — Región ${region}\nColor: ${region==="A"?"ROJO":"VERDE"}\nForma: CILÍNDRICA (can)\nTopmark: ${region==="A"?"Cilindro rojo":"Cilindro verde"}\nLuz: ${region==="A"?"ROJA":"VERDE"} · rítmica\n\nPOSICIÓN:\nSe encuentra a BABOR (izquierda) al entrar`,
      pt:`MARCA DE BOMBORDO — Região ${region}\nCor: ${region==="A"?"VERMELHA":"VERDE"}\nForma: CILÍNDRICA (can)\nTopmark: ${region==="A"?"Cilindro vermelho":"Cilindro verde"}\nLuz: ${region==="A"?"VERMELHA":"VERDE"} · rítmica\n\nPOSIÇÃO:\nEncontra-se a BOMBORDO (esquerda) ao entrar`,
    },
    stbd:{
      fr:`MARQUE DE TRIBORD — Région ${region}\nCouleur : ${region==="A"?"VERTE":"ROUGE"}\nForme : CONIQUE (nun)\nTopmark : ${region==="A"?"Cône vert":"Cône rouge"}\nFeu : ${region==="A"?"VERT":"ROUGE"} · rythmique\n\nPLACEMENT :\nSe trouve à TRIBORD (droite) en entrant\n\nMESSAGE :\n'Danger à droite — reste à gauche de cette bouée'`,
      en:`STARBOARD MARK — Region ${region}\nColor: ${region==="A"?"GREEN":"RED"}\nShape: CONICAL (nun)\nTopmark: ${region==="A"?"Green cone":"Red cone"}\nLight: ${region==="A"?"GREEN":"RED"} · rhythmic\n\nPLACEMENT:\nFound on STARBOARD side (right) when entering\n\nMESSAGE:\n'Danger on right — stay to left of this buoy'`,
      es:`MARCA DE ESTRIBOR — Región ${region}\nColor: ${region==="A"?"VERDE":"ROJO"}\nForma: CÓNICA (nun)\nTopmark: ${region==="A"?"Cono verde":"Cono rojo"}\nLuz: ${region==="A"?"VERDE":"ROJA"} · rítmica\n\nPOSICIÓN:\nSe encuentra a ESTRIBOR (derecha) al entrar`,
      pt:`MARCA DE ESTIBORDO — Região ${region}\nCor: ${region==="A"?"VERDE":"VERMELHA"}\nForma: CÓNICA (nun)\nTopmark: ${region==="A"?"Cone verde":"Cone vermelho"}\nLuz: ${region==="A"?"VERDE":"VERMELHA"} · rítmica\n\nPOSIÇÃO:\nEncontra-se a ESTIBORDO (direita) ao entrar`,
    },
  };

  return (
    <div>
      {/* Region toggle */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {["A","B"].map(r=>(
          <button key={r} onClick={()=>{setRegion(r);setSide(null);}} style={{
            flex:1,padding:"8px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:12,
            background:region===r?`${r==="A"?C.buoyRed:C.buoyGreen}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${region===r?(r==="A"?C.buoyRed:C.buoyGreen):"rgba(255,255,255,0.1)"}`,
            color:region===r?(r==="A"?C.buoyRed:C.buoyGreen):C.muted,
          }}>
            {lang==="fr"?`Région ${r}`:lang==="en"?`Region ${r}`:`Región ${r}`}
          </button>
        ))}
      </div>
      {/* Port approach visualization */}
      <div style={{background:"rgba(30,80,130,0.15)",borderRadius:14,padding:"14px",marginBottom:12,border:"1px solid rgba(74,144,226,0.2)"}}>
        <div style={{fontSize:10,color:C.muted,textAlign:"center",marginBottom:10,fontWeight:700,letterSpacing:1}}>
          🚢 {lang==="fr"?"→ ENTRÉE AU PORT →":lang==="en"?"→ ENTERING PORT →":"→ ENTRADA AL PUERTO →"}
        </div>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-around"}}>
          <div onClick={()=>setSide(side==="port"?null:"port")} style={{cursor:"pointer",textAlign:"center",opacity:side&&side!=="port"?0.4:1,transition:"opacity 0.2s"}}>
            <BuoySVG color1={portColor} topmark={region==="A"?"cylinder":"cylinder"} size={50}/>
            <div style={{fontSize:10,color:portColor,fontWeight:700,marginTop:4}}>{portLight} {portLabel}</div>
          </div>
          {/* Channel */}
          <div style={{textAlign:"center",flex:1}}>
            <div style={{fontSize:24}}>🚢</div>
            <div style={{fontSize:9,color:C.muted,marginTop:2}}>
              {lang==="fr"?"Chenal sûr":lang==="en"?"Safe channel":"Canal seguro"}
            </div>
          </div>
          <div onClick={()=>setSide(side==="stbd"?null:"stbd")} style={{cursor:"pointer",textAlign:"center",opacity:side&&side!=="stbd"?0.4:1,transition:"opacity 0.2s"}}>
            <BuoySVG color1={stbdColor} topmark="cone_up" size={50}/>
            <div style={{fontSize:10,color:stbdColor,fontWeight:700,marginTop:4}}>{stbdLight} {stbdLabel}</div>
          </div>
        </div>
      </div>
      {side&&<div style={{padding:"12px",borderRadius:14,background:`${side==="port"?portColor:stbdColor}12`,border:`1.5px solid ${side==="port"?portColor:stbdColor}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{details[side][lang]||details[side].fr}</div>
      </div>}
      {!side&&<div style={{textAlign:"center",fontSize:11,color:C.muted,padding:"8px"}}>
        {lang==="fr"?"Touche une bouée pour ses détails":lang==="en"?"Tap a buoy for details":"Toca una baliza para sus detalles"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — CARDINAL MARKS
// ══════════════════════════════════════
function CardinalMarksSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const cardinals = [
    { id:"N", icon:"⬆️", label:{fr:"Nord",en:"North",es:"Norte",pt:"Norte"},
      color:C.buoyBlack, color2:C.yellow, topmark:"2cones_up",
      light:{fr:"Scintillant continu (Q) ou Ultra-rapide (VQ)",en:"Continuous quick (Q) or Very quick (VQ)",es:"Centelleante continuo (Q) o Ultra-rápido (VQ)",pt:"Cintilante contínuo (Q) ou Ultra-rápido (VQ)"},
      rule:{fr:"PASSE AU NORD de la bouée\n(Danger se trouve au SUD)\n\nBandes : NOIR en haut · JAUNE en bas\nCônes pointus vers le HAUT (↑↑)\nFeu : scintillant ou ultra-rapide continu\n\nMoyen mnémotechnique :\n'Noir au-dessus, cône en haut'\n'Passe côté Nord'",en:"PASS TO THE NORTH of the buoy\n(Danger is to the SOUTH)\n\nBands: BLACK top · YELLOW bottom\nCones pointing UP (↑↑)\nLight: quick or very quick continuous\n\nMnemonic:\n'Black over yellow, cones up'\n'Pass North side'",es:"PASA AL NORTE de la baliza\n(Peligro al SUR)\n\nBandas: NEGRO arriba · AMARILLO abajo\nConos apuntando ARRIBA (↑↑)\nLuz: centelleante o ultrarrápido continuo",pt:"PASSA A NORTE da boia\n(Perigo a SUL)\n\nFaixas: PRETO em cima · AMARELO em baixo\nCones apontados para CIMA (↑↑)\nLuz: cintilante ou ultra-rápido contínuo"},},
    { id:"S", icon:"⬇️", label:{fr:"Sud",en:"South",es:"Sur",pt:"Sul"},
      color:C.yellow, color2:C.buoyBlack, topmark:"2cones_down",
      light:{fr:"6 scintillements + 1 long (Q(6)+LFl) ou VQ(6)+LFl",en:"6 quick flashes + 1 long (Q(6)+LFl) or VQ(6)+LFl",es:"6 destellos + 1 largo (Q(6)+LFl) o VQ(6)+LFl",pt:"6 cintilantes + 1 longo (Q(6)+LFl) ou VQ(6)+LFl"},
      rule:{fr:"PASSE AU SUD de la bouée\n(Danger se trouve au NORD)\n\nBandes : JAUNE en haut · NOIR en bas\nCônes pointus vers le BAS (↓↓)\nFeu : 6 scintillements + long\n\nMoyen mnémotechnique :\n'Jaune au-dessus, cône en bas'\n'Passe côté Sud — 6 scintillements'\nLe 6 ressemble à une flèche vers le bas",en:"PASS TO THE SOUTH of the buoy\n(Danger is to the NORTH)\n\nBands: YELLOW top · BLACK bottom\nCones pointing DOWN (↓↓)\nLight: 6 quick flashes + long\n\nMnemonic:\n'Yellow over black, cones down'\n'Pass South side — 6 quick flashes'\nThe 6 looks like an arrow pointing down",es:"PASA AL SUR de la baliza\n(Peligro al NORTE)\n\nBandas: AMARILLO arriba · NEGRO abajo\nConos apuntando ABAJO (↓↓)\nLuz: 6 destellos + largo",pt:"PASSA A SUL da boia\n(Perigo a NORTE)\n\nFaixas: AMARELO em cima · PRETO em baixo\nCones apontados para BAIXO (↓↓)\nLuz: 6 cintilantes + longo"},},
    { id:"E", icon:"➡️", label:{fr:"Est",en:"East",es:"Este",pt:"Este"},
      color:C.buoyBlack, color2:C.yellow, topmark:"2cones_base",
      light:{fr:"3 scintillements (Q(3) ou VQ(3))",en:"3 quick flashes (Q(3) or VQ(3))",es:"3 destellos (Q(3) o VQ(3))",pt:"3 cintilantes (Q(3) ou VQ(3))"},
      rule:{fr:"PASSE À L'EST de la bouée\n(Danger se trouve à l'OUEST)\n\nBandes : NOIR · JAUNE · NOIR\nCônes BASE contre BASE (haut ↑ · bas ↓)\nFeu : 3 scintillements\n\nMoyen mnémotechnique :\n'3 = Est sur une boussole'\n'Œuf entre les cônes = Est'",en:"PASS TO THE EAST of the buoy\n(Danger is to the WEST)\n\nBands: BLACK · YELLOW · BLACK\nCones base-to-base (up ↑ · down ↓)\nLight: 3 quick flashes\n\nMnemonic:\n'3 = East on a compass'\n'Egg between cones = East'",es:"PASA AL ESTE de la baliza\n(Peligro al OESTE)\n\nBandas: NEGRO · AMARILLO · NEGRO\nConos base contra base (arriba ↑ · abajo ↓)\nLuz: 3 destellos",pt:"PASSA A ESTE da boia\n(Perigo a OESTE)\n\nFaixas: PRETO · AMARELO · PRETO\nCones base contra base (cima ↑ · baixo ↓)\nLuz: 3 cintilantes"},},
    { id:"W", icon:"⬅️", label:{fr:"Ouest",en:"West",es:"Oeste",pt:"Oeste"},
      color:C.yellow, color2:C.buoyBlack, topmark:"2cones_base",
      light:{fr:"9 scintillements (Q(9) ou VQ(9))",en:"9 quick flashes (Q(9) or VQ(9))",es:"9 destellos (Q(9) o VQ(9))",pt:"9 cintilantes (Q(9) ou VQ(9))"},
      rule:{fr:"PASSE À L'OUEST de la bouée\n(Danger se trouve à l'EST)\n\nBandes : JAUNE · NOIR · JAUNE\nCônes POINTE contre POINTE (↓↑)\nFeu : 9 scintillements\n\nMoyen mnémotechnique :\n'9 = West (W ressemble à 9 inversé)'\n'Sablier entre les cônes = Ouest'",en:"PASS TO THE WEST of the buoy\n(Danger is to the EAST)\n\nBands: YELLOW · BLACK · YELLOW\nCones point-to-point (↓↑)\nLight: 9 quick flashes\n\nMnemonic:\n'9 = West (W looks like inverted 9)'\n'Waist between cones = West'",es:"PASA AL OESTE de la baliza\n(Peligro al ESTE)\n\nBandas: AMARILLO · NEGRO · AMARILLO\nConos punta con punta (↓↑)\nLuz: 9 destellos",pt:"PASSA A OESTE da boia\n(Perigo a ESTE)\n\nFaixas: AMARELO · PRETO · AMARELO\nCones ponta contra ponta (↓↑)\nLuz: 9 cintilantes"},},
  ];

  const getCardinalBuoyColors = (c) => {
    if(c.id==="N") return {c1:C.buoyBlack, c2:C.yellow};
    if(c.id==="S") return {c1:C.yellow, c2:C.buoyBlack};
    if(c.id==="E") return {c1:C.buoyBlack, c2:C.yellow};
    if(c.id==="W") return {c1:C.yellow, c2:C.buoyBlack};
    return {c1:C.buoyBlack,c2:C.yellow};
  };

  const sel_ = sel!==null ? cardinals[sel] : null;
  return (
    <div>
      {/* Compass layout */}
      <div style={{position:"relative",width:"100%",height:200,marginBottom:10}}>
        {/* Center danger */}
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
          <div style={{width:50,height:50,borderRadius:"50%",background:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,border:`2px solid ${C.red}`,margin:"0 auto"}}>⚠️</div>
          <div style={{fontSize:8,color:C.red,marginTop:2,fontWeight:700}}>{lang==="fr"?"DANGER":lang==="en"?"DANGER":"PELIGRO"}</div>
        </div>
        {/* Cardinal buoys */}
        {[
          {idx:0, top:0, left:"50%", transform:"translateX(-50%)"},
          {idx:1, bottom:0, left:"50%", transform:"translateX(-50%)"},
          {idx:2, top:"50%", right:4, transform:"translateY(-50%)"},
          {idx:3, top:"50%", left:4, transform:"translateY(-50%)"},
        ].map(({idx,top,bottom,left,right,transform})=>{
          const c=cardinals[idx];
          const {c1,c2}=getCardinalBuoyColors(c);
          return (
            <div key={idx} onClick={()=>setSel(sel===idx?null:idx)}
              style={{position:"absolute",top,bottom,left,right,transform,cursor:"pointer",textAlign:"center",
                opacity:sel!==null&&sel!==idx?0.4:1,transition:"opacity 0.2s"}}>
              <BuoySVG color1={c1} color2={c2} topmark={c.topmark} size={38}/>
              <div style={{fontSize:9,color:sel===idx?C.gold2:C.muted,fontWeight:700,marginTop:2}}>{c.icon} {c.label[lang]||c.label.fr}</div>
            </div>
          );
        })}
      </div>
      {sel_&&(
        <div style={{padding:"12px",borderRadius:14,background:"rgba(201,146,42,0.1)",border:`1.5px solid ${C.gold}44`,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:13,fontWeight:700,color:C.gold2,marginBottom:4}}>{sel_.icon} {lang==="fr"?"Cardinale":lang==="en"?"Cardinal":lang==="es"?"Cardinal":"Cardinal"} {sel_.label[lang]||sel_.label.fr}</div>
          <div style={{fontSize:10,color:C.gold2,marginBottom:6}}>💡 {lang==="fr"?"Feu:":lang==="en"?"Light:":"Luz:"} {sel_.light[lang]||sel_.light.fr}</div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.rule[lang]||sel_.rule.fr}</div>
        </div>
      )}
      {!sel_&&<div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>
        {lang==="fr"?"Touche une bouée cardinale":lang==="en"?"Tap a cardinal buoy":"Toca una baliza cardinal"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SPECIAL MARKS ID QUIZ
// ══════════════════════════════════════
function SpecialMarksSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const marks = [
    { id:"isolated", icon:"🔴⚫", colors:[C.buoyRed, C.buoyBlack],
      topmark:"2spheres",
      label:{fr:"Danger isolé",en:"Isolated danger",es:"Peligro aislado",pt:"Perigo isolado"},
      desc:{fr:"DANGER ISOLÉ\nBouée mouillée SUR un danger isolé\nEaux navigables TOUT AUTOUR\n\nCouleurs : NOIR avec bandes ROUGES\nTopmark : 2 SPHÈRES noires superposées\nFeu : groupe de 2 éclats (Fl(2))\n\nSTRATÉGIE :\nÉviter la bouée de tous les côtés\nPasser à BONNE DISTANCE tout autour",en:"ISOLATED DANGER\nBuoy moored ON an isolated danger\nNavigable waters ALL AROUND\n\nColors: BLACK with RED bands\nTopmark: 2 BLACK spheres superimposed\nLight: group of 2 flashes (Fl(2))\n\nSTRATEGY:\nAvoid buoy from all sides\nPass at GOOD DISTANCE all around",es:"PELIGRO AISLADO\nBaliza fondeada SOBRE un peligro aislado\nAguas navegables ALREDEDOR\n\nColores: NEGRO con bandas ROJAS\nTopmark: 2 ESFERAS negras superpuestas\nLuz: grupo de 2 destellos (Fl(2))\n\nESTRATEGIA:\nEvitar la baliza de todos los lados",pt:"PERIGO ISOLADO\nBoia fundeada SOBRE um perigo isolado\nÁguas navegáveis EM VOLTA\n\nCores: PRETO com faixas VERMELHAS\nTopmark: 2 ESFERAS pretas sobrepostas\nLuz: grupo de 2 clarões (Fl(2))\n\nESTRATÉGIA:\nEvitar a boia de todos os lados"},},
    { id:"safewater", icon:"⚪🔴",
      colors:[C.buoyWhite, C.buoyRed],
      topmark:"sphere",
      label:{fr:"Eaux saines",en:"Safe water",es:"Aguas seguras",pt:"Águas seguras"},
      desc:{fr:"EAUX SAINES (Safe Water Mark)\nEaux navigables PARTOUT autour\nMarque le milieu d'un chenal\nou l'approche terrestre d'un port\n\nCouleurs : ROUGE et BLANC (rayures verticales)\nTopmark : 1 SPHÈRE rouge\nFeu : éclat isophase · Morse 'A' · 1 éclat long\n\nSTRATÉGIE :\nPeut être laissée à tribord ou bâbord\nSi au milieu d'un chenal : passer dessus OK",en:"SAFE WATER MARK\nNavigable waters ALL AROUND\nMarks center of channel\nor landfall approach to port\n\nColors: RED and WHITE (vertical stripes)\nTopmark: 1 RED sphere\nLight: isophase · Morse 'A' · 1 long flash\n\nSTRATEGY:\nCan be left to port or starboard\nIf in center of channel: pass over it OK",es:"AGUAS SEGURAS\nAguas navegables ALREDEDOR\nMarca el centro de un canal\no la aproximación terrestre a un puerto\n\nColores: ROJO y BLANCO (franjas verticales)\nTopmark: 1 ESFERA roja\nLuz: isofase · Morse 'A' · 1 destello largo",pt:"ÁGUAS SEGURAS\nÁguas navegáveis EM VOLTA\nMarca o centro de um canal\nou a aproximação costeira a um porto\n\nCores: VERMELHO e BRANCO (faixas verticais)\nTopmark: 1 ESFERA vermelha\nLuz: isofase · Morse 'A' · 1 clarão longo"},},
    { id:"special", icon:"🟡", colors:[C.buoyYellow],
      topmark:"x",
      label:{fr:"Marque spéciale",en:"Special mark",es:"Marca especial",pt:"Marca especial"},
      desc:{fr:"MARQUE SPÉCIALE\nNe fait PAS partie du système de balisage IALA\nDésigne une zone ou un objet SPÉCIAL\n\nCouleurs : JAUNE (unicolore)\nTopmark : X jaune (croix de Saint-André)\nFeu : JAUNE (n'importe quel rythme)\n\nUTILISATIONS :\n→ Délimitation d'exercices militaires\n→ Balisage de câbles / pipelines sous-marins\n→ Zones de loisirs nautiques\n→ Zones de pêche\n→ Délimitation d'aquaculture\n→ Marques de sécurité des baigneurs",en:"SPECIAL MARK\nNOT part of IALA buoyage system\nIndicates a SPECIAL area or feature\n\nColors: YELLOW (single color)\nTopmark: Yellow X (St Andrew's cross)\nLight: YELLOW (any rhythm)\n\nUSES:\n→ Military exercise boundaries\n→ Submarine cable/pipeline marking\n→ Recreational boating zones\n→ Fishing zones\n→ Aquaculture boundaries\n→ Swimmer safety marks",es:"MARCA ESPECIAL\nNO forma parte del sistema IALA\nSeñala una zona u objeto ESPECIAL\n\nColores: AMARILLO (unicolor)\nTopmark: X amarilla (cruz de San Andrés)\nLuz: AMARILLO (cualquier ritmo)\n\nUTILIZACIONES:\n→ Delimitación de ejercicios militares\n→ Señalización de cables/tuberías submarinos\n→ Zonas de recreo náutico",pt:"MARCA ESPECIAL\nNÃO faz parte do sistema IALA\nIndica uma zona ou objeto ESPECIAL\n\nCores: AMARELO (unicolour)\nTopmark: X amarelo (cruz de Santo André)\nLuz: AMARELO (qualquer ritmo)\n\nUTILIZAÇÕES:\n→ Delimitação de exercícios militares\n→ Sinalização de cabos/oleodutos submarinos\n→ Zonas de lazer náutico"},},
    { id:"new_danger", icon:"🟡🔵",
      colors:[C.buoyBlue, C.buoyYellow],
      topmark:"cross",
      label:{fr:"Nouveau danger",en:"New danger",es:"Nuevo peligro",pt:"Novo perigo"},
      desc:{fr:"NOUVEAU DANGER (New Danger / Emergency WRB)\nDanger nouvellement découvert\nnon encore sur les cartes marines\n\nCouleurs : BLEU et JAUNE (rayures verticales)\nTopmark : CROIX jaune\nFeu : groupe de 5 éclats rapides (Q(5) VQ(5))\n\nPARTICULARITÉ :\nDoubler la bouée si danger grave\n(deux bouées identiques côte à côte)\nInformations diffusées par NAVTEX/AVURNAV\n\nACTION :\nGrande prudence · signaler si inconnu",en:"NEW DANGER (Emergency WRB)\nNewly discovered danger\nnot yet on nautical charts\n\nColors: BLUE and YELLOW (vertical stripes)\nTopmark: YELLOW cross\nLight: group of 5 quick flashes (Q(5) VQ(5))\n\nSPECIAL FEATURE:\nDuplicate buoy if serious danger\n(two identical buoys side by side)\nInformation broadcast via NAVTEX/AVURNAV\n\nACTION:\nExtreme caution · report if unknown",es:"NUEVO PELIGRO\nPeligro recién descubierto\naún no en las cartas náuticas\n\nColores: AZUL y AMARILLO (franjas verticales)\nTopmark: CRUZ amarilla\nLuz: grupo de 5 destellos rápidos (Q(5) VQ(5))\n\nPARTICULARIDAD:\nDuplicar la baliza si el peligro es grave",pt:"NOVO PERIGO\nPerigo recentemente descoberto\nainda não nas cartas náuticas\n\nCores: AZUL e AMARELO (faixas verticais)\nTopmark: CRUZ amarela\nLuz: grupo de 5 cintilantes rápidos (Q(5) VQ(5))\n\nPARTICULARIDADE:\nDuplicar a boia se o perigo for grave"},},
  ];
  const sel_ = sel!==null ? marks[sel] : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        {marks.map((m,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)}
            style={{padding:"10px 6px",borderRadius:14,cursor:"pointer",textAlign:"center",
              background:sel===i?"rgba(201,146,42,0.12)":"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===i?C.gold:"rgba(255,255,255,0.08)"}`}}>
            <BuoySVG color1={m.colors[0]} color2={m.colors[1]} topmark={m.topmark} size={44}/>
            <div style={{fontSize:9,color:sel===i?C.gold2:C.muted,fontWeight:700,marginTop:4,lineHeight:1.3}}>{m.label[lang]||m.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:"rgba(255,255,255,0.05)",border:"1.5px solid rgba(255,255,255,0.15)",animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:C.gold2,marginBottom:6}}>{sel_.label[lang]||sel_.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Échouage MV Dalmacija — Adriatique (2006)",teaser:"Cargo croate · Bouée cardinale confondue · Récif · Confusion IALA · Erreur de quart",what:"Le cargo croate MV Dalmacija fait route de nuit dans l'Adriatique. L'officier de quart identifie mal une bouée cardinale Est — il confond la marque 'passer à l'Est' avec 'passer à l'Ouest'. Le navire s'échoue sur un récif à moins de 200 mètres de la bouée.",cause:"• Confusion entre cardinale Est et Ouest (topmarks similaires si pas éclairés)\n• Navigation de nuit sans vérification radar suffisante\n• Officier de quart non familier avec le balisage local\n• Carte marine insuffisamment consultée\n• Fatigue de l'équipage (fin de quart longue)",lessons:"✓ Cardinale EST = 3 éclats · Cardinale OUEST = 9 éclats\n✓ Compter toujours les éclats du feu pour identifier une cardinale la nuit\n✓ Radar = vérification systématique des bouées identifiées visuellement\n✓ Carte marine à consulter AVANT et PENDANT la navigation côtière\n✓ Règle 'tout autour du danger' pour cardinales = Éloigner à distance suffisante",link:"🔗 Lien L1 IALA : Les bouées cardinales sont les marques les plus critiques en navigation côtière. Leur identification correcte (surtout la nuit) repose sur le COMPTAGE précis des éclats. Un doute = s'arrêter, vérifier la carte, utiliser le radar."},
    en:{title:"MV Dalmacija Grounding — Adriatic (2006)",teaser:"Croatian cargo vessel · Cardinal buoy confused · Reef · IALA confusion · Watch error",what:"The Croatian cargo vessel MV Dalmacija is navigating at night in the Adriatic. The watch officer misidentifies an East cardinal buoy — he confuses the 'pass to the East' mark with 'pass to the West'. The vessel grounds on a reef less than 200 meters from the buoy.",cause:"• Confusion between East and West cardinals (similar topmarks if unlit)\n• Night navigation without sufficient radar verification\n• Watch officer unfamiliar with local buoyage\n• Nautical chart insufficiently consulted\n• Crew fatigue (long watch end)",lessons:"✓ East cardinal = 3 flashes · West cardinal = 9 flashes\n✓ Always COUNT the light flashes to identify a cardinal at night\n✓ Radar = systematic verification of visually identified buoys\n✓ Nautical chart to consult BEFORE and DURING coastal navigation\n✓ 'All around the danger' rule for cardinals = Keep sufficient distance",link:"🔗 L1 IALA Link: Cardinal buoys are the most critical marks in coastal navigation. Their correct identification (especially at night) relies on precise COUNTING of flashes. Any doubt = stop, check the chart, use radar."},
    es:{title:"Varada MV Dalmacija — Adriático (2006)",teaser:"Carguero croata · Baliza cardinal confundida · Arrecife · Confusión IALA · Error de guardia",what:"El carguero croata MV Dalmacija navega de noche por el Adriático. El oficial de guardia identifica mal una baliza cardinal Este — confunde la marca 'pasar al Este' con 'pasar al Oeste'. El buque encalla en un arrecife a menos de 200 metros de la baliza.",cause:"• Confusión entre cardinal Este y Oeste (topmarks similares sin iluminación)\n• Navegación nocturna sin verificación radar suficiente\n• Oficial de guardia no familiarizado con el balizamiento local\n• Carta náutica insuficientemente consultada\n• Fatiga de la tripulación",lessons:"✓ Cardinal ESTE = 3 destellos · Cardinal OESTE = 9 destellos\n✓ Contar siempre los destellos de la luz para identificar un cardinal de noche\n✓ Radar = verificación sistemática de las balizas identificadas visualmente\n✓ Carta náutica a consultar ANTES y DURANTE la navegación costera",link:"🔗 Vínculo L1: Las balizas cardinales son las marcas más críticas en la navegación costera. Su correcta identificación (especialmente de noche) se basa en el CONTEO preciso de los destellos."},
    pt:{title:"Encalhe MV Dalmacija — Adriático (2006)",teaser:"Cargueiro croata · Boia cardinal confundida · Recife · Confusão IALA · Erro de quarto",what:"O cargueiro croata MV Dalmacija navega de noite no Adriático. O oficial de quarto identifica mal uma boia cardinal Este — confunde a marca 'passar a Este' com 'passar a Oeste'. O navio encalha num recife a menos de 200 metros da boia.",cause:"• Confusão entre cardinal Este e Oeste (topmarks similares sem iluminação)\n• Navegação noturna sem verificação de radar suficiente\n• Oficial de quarto não familiarizado com a balizagem local\n• Carta náutica insuficientemente consultada\n• Fadiga da tripulação",lessons:"✓ Cardinal ESTE = 3 clarões · Cardinal OESTE = 9 clarões\n✓ Contar sempre os clarões da luz para identificar um cardinal à noite\n✓ Radar = verificação sistemática das boias identificadas visualmente\n✓ Carta náutica a consultar ANTES e DURANTE a navegação costeira",link:"🔗 Vínculo L1: As boias cardinais são as marcas mais críticas na navegação costeira. A sua correta identificação (especialmente à noite) baseia-se na CONTAGEM precisa dos clarões."},
  };
  const c=d[lang]||d.fr;
  return(
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
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>CAUSES</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:""});
  const [showC,setShowC]=useState(false);
  const qs={
    fr:[
      {id:"q1",q:"En IALA A, vous entrez dans un port. Une bouée ROUGE est à BÂBORD ou TRIBORD ?\n(Répondre : Bâbord ou Tribord)",correct:"Bâbord"},
      {id:"q2",q:"Une bouée cardinale NORD montre combien d'éclats la nuit ?\n(Répondre : le type de feu)",correct:"scintillant continu"},
      {id:"q3",q:"En IALA B (Amériques), une bouée verte est à quel bord en entrant ?\n(Répondre : Bâbord ou Tribord)",correct:"Bâbord"},
    ],
    en:[
      {id:"q1",q:"In IALA A, you are entering a port. A RED buoy is to PORT or STARBOARD?\n(Answer: Port or Starboard)",correct:"Port"},
      {id:"q2",q:"A NORTH cardinal buoy shows how many flashes at night?\n(Answer: the light type)",correct:"continuous quick"},
      {id:"q3",q:"In IALA B (Americas), a green buoy is on which side when entering?\n(Answer: Port or Starboard)",correct:"Port"},
    ],
    es:[
      {id:"q1",q:"En IALA A, entras a un puerto. ¿Una baliza ROJA está a BABOR o ESTRIBOR?\n(Responder: Babor o Estribor)",correct:"Babor"},
      {id:"q2",q:"¿Una baliza cardinal NORTE muestra cuántos destellos de noche?\n(Responder: el tipo de luz)",correct:"centelleante continuo"},
      {id:"q3",q:"En IALA B (Américas), ¿una baliza verde está a qué banda al entrar?\n(Responder: Babor o Estribor)",correct:"Babor"},
    ],
    pt:[
      {id:"q1",q:"Em IALA A, você entra num porto. Uma boia VERMELHA está a BOMBORDO ou ESTIBORDO?\n(Responder: Bombordo ou Estibordo)",correct:"Bombordo"},
      {id:"q2",q:"Uma boia cardinal NORTE mostra quantos clarões à noite?\n(Responder: o tipo de luz)",correct:"cintilante contínuo"},
      {id:"q3",q:"Em IALA B (Américas), uma boia verde está a que bordo ao entrar?\n(Responder: Bombordo ou Estibordo)",correct:"Bombordo"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("bâbord")||v.includes("babord")||v.includes("port")||v.includes("bombordo");
    if(q.id==="q2") return v.includes("scintil")||v.includes("quick")||v.includes("contin")||v.includes("centel")||v.includes("cintil");
    if(q.id==="q3") return v.includes("bâbord")||v.includes("babord")||v.includes("port")||v.includes("bombordo");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.teal}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : IALA A = Rouge à bâbord quand on rentre · Cardinale Nord = scintillant continu · IALA B = Inverse de A"
        :lang==="en"?"💡 Reminders: IALA A = Red to port when entering · North cardinal = continuous quick · IALA B = Opposite of A"
        :lang==="es"?"💡 Recordatorios: IALA A = Rojo a babor al entrar · Cardinal Norte = centelleante continuo · IALA B = Contrario a A"
        :"💡 Lembretes: IALA A = Vermelho a bombordo ao entrar · Cardinal Norte = cintilante contínuo · IALA B = Contrário de A"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:14,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: BÂBORD (IALA A : rouge à gauche quand on entre)\n✅ Q2: Scintillant continu (Q) ou ultra-rapide (VQ) — sans interruption\n✅ Q3: BÂBORD (IALA B = inverse de A · vert à gauche quand on entre)"
        :lang==="en"?"✅ Q1: PORT (IALA A: red on left when entering)\n✅ Q2: Continuous quick (Q) or very quick (VQ) — uninterrupted\n✅ Q3: PORT (IALA B = opposite of A · green on left when entering)"
        :"✅ Q1: Babor · Q2: Centelleante continuo · Q3: Babor"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"En IALA Région A (Europe, Afrique, Asie), quelle couleur est attribuée à la marque de bâbord ?",opts:["Verte","Rouge","Jaune","Noire"],correct:1,expl:"IALA Région A (Europe, Afrique, Asie, Australie) : marque de BÂBORD = ROUGE. Forme cylindrique (can). Topmark = cylindre rouge. Feu = rouge. En entrant dans un port : la bouée rouge est laissée à GAUCHE (bâbord). Moyen mnémotechnique : 'Rouge à gauche quand on rentre'. Attention : en Région B (Amériques, Japon, Corée, Philippines), c'est l'INVERSE — bâbord = vert."},
    {q:"Combien d'éclats montre une bouée cardinale EST la nuit ?",opts:["3 éclats rapides","6 éclats rapides + 1 long","9 éclats rapides","Scintillant continu"],correct:0,expl:"Cardinale EST = 3 éclats rapides (Q(3) ou VQ(3)). Moyen mnémotechnique : 3 heures = Est sur une horloge/boussole (Est = 3h). Rappel des autres cardinales : Nord = scintillant continu (Q ou VQ), Sud = 6 + long (Q(6)+LFl), Ouest = 9 rapides (Q(9) ou VQ(9)). Pour mémoriser Sud-Ouest : 6+long et 9 = positions horaires 6h (Sud) et 9h (Ouest)."},
    {q:"Une bouée 'eaux saines' (safe water mark) indique quoi ?",opts:["Un danger à éviter","Eaux navigables de tous côtés — marque l'entrée d'un chenal ou la côte","Une zone spéciale militaire","Un récif immergé"],correct:1,expl:"Eaux saines (safe water mark) = eaux navigables de TOUS les côtés. Couleurs : rouge et blanc (bandes verticales). Topmark : sphère rouge. Feu : isophase, éclat (1), ou Morse A. Utilisée pour marquer : le centre d'un chenal navigable, le milieu d'un passage, une approche côtière (landfall). STRATÉGIE : peut être laissée à n'importe quel bord, ou même passée directement dessus si au milieu du chenal."},
    {q:"Quelle est la différence principale entre IALA A et IALA B pour les marques latérales ?",opts:["Les formes des bouées sont différentes","Les couleurs de bâbord et tribord sont INVERSÉES entre les deux régions","Les cardinales sont différentes","Les feux sont différents"],correct:1,expl:"IALA A vs IALA B : seules les couleurs latérales sont inversées. IALA A (Europe, Afrique, Asie) : bâbord = ROUGE, tribord = VERT. IALA B (Amériques, Japon, Corée, Philippines) : bâbord = VERT, tribord = ROUGE. Les marques cardinales, les marques de danger isolé, les eaux saines et les marques spéciales sont IDENTIQUES dans les deux régions. Un marin doit toujours vérifier la région IALA avant d'entrer dans un port étranger."},
    {q:"Que signifie une bouée NOIRE avec bandes ROUGES et 2 SPHÈRES noires en topmark ?",opts:["Marque spéciale — zone interdite","Danger isolé — eaux navigables tout autour · passer à distance de tous côtés","Cardinale Nord — passer au nord","Eaux saines — chenal navigable"],correct:1,expl:"Danger isolé (isolated danger mark) = bouée noire avec bandes rouges horizontales, 2 sphères noires en topmark. Feu : groupe de 2 éclats (Fl(2)). Signification : la bouée EST POSÉE SUR le danger (ou très proche). Des eaux navigables existent de TOUS les côtés. STRATÉGIE : passer à distance suffisante de TOUS les côtés — ne surtout pas essayer de passer entre la bouée et la côte ou récif le plus proche."},
  ],
  en:[
    {q:"In IALA Region A (Europe, Africa, Asia), what color is assigned to the port mark?",opts:["Green","Red","Yellow","Black"],correct:1,expl:"IALA Region A (Europe, Africa, Asia, Australia): PORT mark = RED. Cylindrical shape (can). Topmark = red cylinder. Light = red. When entering a port: red buoy is left on the LEFT (port side). Mnemonic: 'Red on left when entering'. Warning: in Region B (Americas, Japan, Korea, Philippines), it's the OPPOSITE — port = green."},
    {q:"How many flashes does an EAST cardinal buoy show at night?",opts:["3 quick flashes","6 quick flashes + 1 long","9 quick flashes","Continuous quick"],correct:0,expl:"East cardinal = 3 quick flashes (Q(3) or VQ(3)). Mnemonic: 3 o'clock = East on a clock/compass (East = 3 o'clock). Reminder of other cardinals: North = continuous quick (Q or VQ), South = 6 + long (Q(6)+LFl), West = 9 quick (Q(9) or VQ(9)). To remember South-West: 6+long and 9 = clock positions 6 o'clock (South) and 9 o'clock (West)."},
    {q:"A 'safe water mark' buoy indicates what?",opts:["A danger to avoid","Navigable water on all sides — marks channel entrance or coast approach","A special military zone","A submerged reef"],correct:1,expl:"Safe water mark = navigable water on ALL sides. Colors: red and white (vertical stripes). Topmark: red sphere. Light: isophase, flash (1), or Morse A. Used to mark: center of navigable channel, midpoint of a passage, coastal approach (landfall). STRATEGY: can be left on either side, or even passed directly over if in center of channel."},
    {q:"What is the main difference between IALA A and IALA B for lateral marks?",opts:["Buoy shapes are different","Port and starboard COLORS are REVERSED between the two regions","Cardinals are different","Lights are different"],correct:1,expl:"IALA A vs IALA B: only the lateral colors are reversed. IALA A (Europe, Africa, Asia): port = RED, starboard = GREEN. IALA B (Americas, Japan, Korea, Philippines): port = GREEN, starboard = RED. Cardinal marks, isolated danger marks, safe water marks and special marks are IDENTICAL in both regions. A mariner must always check the IALA region before entering a foreign port."},
    {q:"What does a BLACK buoy with RED bands and 2 BLACK spheres as topmark mean?",opts:["Special mark — prohibited zone","Isolated danger — navigable water all around · pass at distance from all sides","North cardinal — pass to north","Safe water — navigable channel"],correct:1,expl:"Isolated danger mark = black buoy with horizontal red bands, 2 black spheres as topmark. Light: group of 2 flashes (Fl(2)). Meaning: the buoy IS PLACED ON the danger (or very close to it). Navigable water exists on ALL sides. STRATEGY: pass at sufficient distance from ALL sides — never try to pass between the buoy and the nearest coast or reef."},
  ],
  es:[
    {q:"En la región IALA A (Europa, África, Asia), ¿qué color corresponde a la marca de babor?",opts:["Verde","Rojo","Amarillo","Negro"],correct:1,expl:"IALA Región A: marca de BABOR = ROJA. Forma cilíndrica (can). Topmark = cilindro rojo. Luz = roja. Al entrar en un puerto: la baliza roja se deja a la IZQUIERDA (babor). Regla mnemotécnica: 'Rojo a la izquierda al entrar'. Atención: en la región B (Américas, Japón, Corea, Filipinas), es lo CONTRARIO — babor = verde."},
    {q:"¿Cuántos destellos muestra una baliza cardinal ESTE por la noche?",opts:["3 destellos rápidos","6 destellos rápidos + 1 largo","9 destellos rápidos","Centelleante continuo"],correct:0,expl:"Cardinal ESTE = 3 destellos rápidos (Q(3) o VQ(3)). Regla mnemotécnica: 3 en punto = Este en un reloj/brújula. Recordatorio de los otros cardinales: Norte = centelleante continuo (Q o VQ), Sur = 6 + largo (Q(6)+LFl), Oeste = 9 rápidos (Q(9) o VQ(9))."},
    {q:"¿Qué indica una baliza de 'aguas seguras'?",opts:["Un peligro que evitar","Aguas navegables por todos los lados — señala la entrada de un canal o la costa","Una zona especial militar","Un arrecife sumergido"],correct:1,expl:"Aguas seguras (safe water mark) = aguas navegables por TODOS los lados. Colores: rojo y blanco (franjas verticales). Topmark: esfera roja. Luz: isofase, destello (1) o Morse A. Se utiliza para señalar: el centro de un canal navegable, el punto medio de un paso, una aproximación costera. ESTRATEGIA: puede dejarse a cualquier banda, o incluso pasarse directamente por encima si está en el centro del canal."},
    {q:"¿Cuál es la diferencia principal entre IALA A e IALA B para las marcas laterales?",opts:["Las formas de las balizas son diferentes","Los colores de babor y estribor están INVERTIDOS entre las dos regiones","Los cardinales son diferentes","Las luces son diferentes"],correct:1,expl:"IALA A vs IALA B: solo los colores laterales están invertidos. IALA A: babor = ROJO, estribor = VERDE. IALA B: babor = VERDE, estribor = ROJO. Las marcas cardinales, de peligro aislado, de aguas seguras y especiales son IDÉNTICAS en ambas regiones."},
    {q:"¿Qué significa una baliza NEGRA con bandas ROJAS y 2 ESFERAS negras como topmark?",opts:["Marca especial — zona prohibida","Peligro aislado — aguas navegables alrededor · pasar a distancia de todos los lados","Cardinal Norte — pasar al norte","Aguas seguras — canal navegable"],correct:1,expl:"Peligro aislado = baliza negra con bandas rojas horizontales, 2 esferas negras como topmark. Luz: grupo de 2 destellos (Fl(2)). Significado: la baliza ESTÁ COLOCADA SOBRE el peligro. Hay aguas navegables por TODOS los lados. ESTRATEGIA: pasar a distancia suficiente de TODOS los lados."},
  ],
  pt:[
    {q:"Na região IALA A (Europa, África, Ásia), que cor é atribuída à marca de bombordo?",opts:["Verde","Vermelha","Amarela","Preta"],correct:1,expl:"IALA Região A: marca de BOMBORDO = VERMELHA. Forma cilíndrica (can). Topmark = cilindro vermelho. Luz = vermelha. Ao entrar num porto: a boia vermelha é deixada à ESQUERDA (bombordo). Regra mnemónica: 'Vermelho à esquerda ao entrar'. Atenção: na região B (Américas, Japão, Coreia, Filipinas), é o OPOSTO — bombordo = verde."},
    {q:"Quantos clarões mostra uma boia cardinal ESTE à noite?",opts:["3 cintilantes rápidos","6 cintilantes rápidos + 1 longo","9 cintilantes rápidos","Cintilante contínuo"],correct:0,expl:"Cardinal ESTE = 3 cintilantes rápidos (Q(3) ou VQ(3)). Regra mnemónica: 3 horas = Este num relógio/bússola. Lembrança dos outros cardinais: Norte = cintilante contínuo (Q ou VQ), Sul = 6 + longo (Q(6)+LFl), Oeste = 9 rápidos (Q(9) ou VQ(9))."},
    {q:"O que indica uma boia de 'águas seguras'?",opts:["Um perigo a evitar","Águas navegáveis de todos os lados — marca a entrada de um canal ou a costa","Uma zona especial militar","Um recife submerso"],correct:1,expl:"Águas seguras (safe water mark) = águas navegáveis de TODOS os lados. Cores: vermelho e branco (faixas verticais). Topmark: esfera vermelha. Luz: isofase, clarão (1) ou Morse A. Utilizada para marcar: o centro de um canal navegável, o ponto médio de uma passagem, uma aproximação costeira. ESTRATÉGIA: pode ser deixada a qualquer bordo, ou mesmo passada diretamente por cima se estiver no centro do canal."},
    {q:"Qual é a principal diferença entre IALA A e IALA B para as marcas laterais?",opts:["As formas das boias são diferentes","As cores de bombordo e estibordo estão INVERTIDAS entre as duas regiões","Os cardinais são diferentes","As luzes são diferentes"],correct:1,expl:"IALA A vs IALA B: apenas as cores laterais estão invertidas. IALA A: bombordo = VERMELHO, estibordo = VERDE. IALA B: bombordo = VERDE, estibordo = VERMELHO. As marcas cardinais, de perigo isolado, de águas seguras e especiais são IDÊNTICAS nas duas regiões."},
    {q:"O que significa uma boia PRETA com faixas VERMELHAS e 2 ESFERAS pretas como topmark?",opts:["Marca especial — zona proibida","Perigo isolado — águas navegáveis em volta · passar à distância de todos os lados","Cardinal Norte — passar a norte","Águas seguras — canal navegável"],correct:1,expl:"Perigo isolado = boia preta com faixas vermelhas horizontais, 2 esferas pretas como topmark. Luz: grupo de 2 clarões (Fl(2)). Significado: a boia ESTÁ COLOCADA SOBRE o perigo. Há águas navegáveis de TODOS os lados. ESTRATÉGIA: passar à distância suficiente de TODOS os lados."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que le 'sens du balisage conventionnel' en IALA ?",opts:["La direction du vent","Direction dans laquelle les marques latérales s'appliquent — généralement vers le port en remontant du large (conventionnel) ou indiqué sur les cartes marines","La direction du courant","La direction des vagues"],correct:1,expl:"Sens du balisage conventionnel = direction dans laquelle les règles IALA s'appliquent. Généralement : venant du large VERS le port (entrée portuaire). Peut aussi être défini pour des estuaires, fleuves, voies de circulation maritime. Indiqué sur les cartes marines par une flèche ou annotation spéciale. CLEF : savoir dans quel 'sens' on est par rapport aux bouées pour interpréter correctement bâbord et tribord."},
    {q:"Quelle est la forme d'une marque de bâbord en IALA A ?",opts:["Conique (pointue)","Cylindrique (plate sur le dessus)","Sphérique","Croisée"],correct:1,expl:"Marque de bâbord IALA A = forme CYLINDRIQUE (can). Appelée 'can buoy' en anglais. Plate sur le dessus. Rouge (IALA A) ou verte (IALA B). Topmark = cylindre (même couleur que la bouée). À l'opposé : marque de tribord = CONIQUE (nun buoy) — pointue vers le haut. Verte (IALA A) ou rouge (IALA B). Ces formes permettent l'identification DE JOUR sans couleurs."},
    {q:"Comment identifier une bouée cardinale OUEST de jour sans carte ?",opts:["Bandes noires et jaunes — cônes pointe contre pointe (↓↑)","Bandes jaunes et noires — cônes base contre base","Entièrement noire — cônes vers le haut","Entièrement jaune — croix"],correct:0,expl:"Cardinal OUEST de jour : bandes JAUNE · NOIR · JAUNE (jaune en haut et en bas, noir au milieu). Topmark = 2 cônes POINTE contre POINTE (↓↑) = forme de 'sablier'. Feu la nuit = 9 scintillements (Q(9) ou VQ(9)). Moyen mnémotechnique : 'W comme Waist (taille) = sablier' · '9 heures = Ouest sur une horloge'. Passer à l'OUEST de la bouée (le danger est à l'Est)."},
    {q:"Qu'est-ce que le topmark d'une bouée cardinale SUD ?",opts:["2 cônes pointant vers le haut","2 cônes pointant vers le bas","2 cônes base contre base (sablier)","2 sphères"],correct:1,expl:"Cardinal SUD = topmark 2 cônes POINTANT VERS LE BAS (↓↓). Bandes : JAUNE en haut, NOIR en bas. Feu : 6 scintillements + 1 long (Q(6)+LFl). Moyen mnémotechnique : 'pointe vers le bas = vers le Sud' · '6 heures = midi/Sud'. Passer au SUD de la bouée (le danger est au Nord). Différence des 4 cardinales par topmark : Nord(↑↑) · Est(↑↓ base-base) · Sud(↓↓) · Ouest(↓↑ pointe-pointe)."},
    {q:"Quelle est la différence entre une marque de danger isolé et une cardinale ?",opts:["Elles sont identiques","Danger isolé = sur le danger, eaux navigables tout autour · Cardinale = indique de quel côté passer par rapport au danger","Cardinale = sur le danger","Danger isolé = indique le nord"],correct:1,expl:"DANGER ISOLÉ (isolated danger mark) : bouée posée SUR ou juste à côté du danger. Des eaux navigables existent de TOUS les côtés. Passer à distance de tous les côtés. Identifiée par : noir avec bandes rouges + 2 sphères noires + Fl(2). CARDINALE : bouée indiquant de quel côté du danger passer (Nord, Sud, Est ou Ouest). Les eaux navigables sont DU CÔTÉ DE LA CARDINALE. Identifiées par : bandes jaune et noir + cônes directionnels."},
    {q:"Qu'est-ce qu'une marque de nouveau danger (Emergency Wreck Marking Buoy) ?",opts:["Une vieille bouée rouillée","Bouée bleue et jaune signalant un danger récemment découvert non encore cartographié — Q(5) ou VQ(5)","Une marque spéciale temporaire","Une cardinale provisoire"],correct:1,expl:"Nouveau danger (EWMB = Emergency Wreck Marking Buoy, introduit 2016) : couleurs BLEUES et JAUNES (bandes verticales). Topmark : croix jaune. Feu : groupe de 5 scintillements rapides (Q(5) ou VQ(5)). Utilisée pour signaler rapidement un naufrage ou danger nouvellement découvert, non encore sur les cartes. Si danger très grave : on peut en mouiller DEUX côte à côte. L'information est simultanément diffusée par NAVTEX et AVURNAV."},
    {q:"Qu'est-ce qu'une bouée ODAS (Océanographic Data Acquisition System) ?",opts:["Un feu de navigation","Bouée de collecte de données océanographiques — marque spéciale jaune · ne pas approcher · câbles sous-marins","Une cardinale spéciale","Un balisage de pipeline"],correct:1,expl:"ODAS = Ocean Data Acquisition System. Bouée scientifique automatisée collectant des données météorologiques et océanographiques. Identifiée comme marque spéciale IALA (jaune). Signalisation : feu jaune. DANGER : câbles sous-marins d'alimentation et de communication. Répertoriées sur les cartes marines. Appartiennent généralement à des instituts météo ou scientifiques (Météo France, NOAA, UK Met Office). Ne jamais amarrer à une ODAS."},
    {q:"Que signifie 'Fl(2)' dans la description d'un feu de bouée ?",opts:["2 feux fixes","Groupe de 2 ÉCLATS répétés périodiquement — caractéristique du danger isolé","2 éclats lents","Feu fixe de 2 secondes"],correct:1,expl:"Fl(2) = Flashing (2) = groupe de 2 éclats. Description des feux : Fl = éclat (flash), Q = scintillant (quick), VQ = ultra-rapide (very quick), Oc = à occultations, Iso = isophase, L Fl = éclat long. Le chiffre entre parenthèses = nombre d'éclats dans le groupe. Fl(2) = 2 éclats dans le groupe = caractéristique du danger isolé. Q(3) = 3 scintillements = cardinale Est. Q(6)+LFl = 6 scintillements + 1 long = cardinale Sud."},
    {q:"Comment reconnaître une marque de tribord en IALA B (Amériques) ?",opts:["Bouée verte conique","Bouée ROUGE conique avec feu rouge","Bouée noire cylindrique","Bouée jaune conique"],correct:1,expl:"Tribord IALA B = ROUGE conique avec feu rouge. Rappel : IALA B = inverse de IALA A pour les marques latérales. IALA B (Amériques, Japon, Corée) : tribord = ROUGE (conique), bâbord = VERT (cylindrique). Moyen mnémotechnique IALA B : 'RED RIGHT RETURNING' = rouge à droite en revenant (entrant au port). C'est la règle utilisée aux USA depuis des siècles, adoptée dans IALA B."},
    {q:"Qu'est-ce que le 'Morse A' utilisé sur les bouées d'eaux saines ?",opts:["Un signal de détresse","Signal lumineux codant la lettre A en morse : 1 éclat court + 1 éclat long — caractéristique des bouées eaux saines","Un type de cardinale","Un signal sonore"],correct:1,expl:"Morse A = signal lumineux codant la lettre A (· − en morse) = 1 éclat court + 1 éclat long. Caractéristique exclusive des bouées eaux saines (safe water marks). Parfois utilisé aussi : iso (isophase = durées égales éclat/obscurité), LFl (long flash). La lettre A morse sur une bouée = 'Attention, eaux saines, vous approchez de la côte ou d'un chenal'. Très utile pour l'approche nocturne d'un port."},
    {q:"Qu'est-ce qu'une marque de chemin préférentiel en IALA ?",opts:["Une cardinale","Marque latérale modifiée indiquant que deux chenaux existent — une bande horizontale de la couleur opposée signale le chenal secondaire","Une marque spéciale jaune","Une bouée d'eaux saines"],correct:1,expl:"Chemin préférentiel (preferred channel mark) = marque latérale (rouge ou verte) avec UNE BANDE HORIZONTALE de la couleur opposée. Ex : bouée rouge avec bande verte = chenal préférentiel à bâbord (IALA A), chenal secondaire à tribord. Signifie : deux chenaux existent à cet endroit, la couleur principale indique le chenal PRÉFÉRENTIEL (le plus profond/sûr). Feu : composite (rythme combinant les deux couleurs)."},
    {q:"Quel est l'organe international responsable du système IALA ?",opts:["L'OMI","IALA (International Association of Marine Aids to Navigation and Lighthouse Authorities) — organisation internationale fondée en 1957","L'OMM","L'ONU"],correct:1,expl:"IALA = International Association of Marine Aids to Navigation and Lighthouse Authorities. Fondée en 1957, siège à Saint-Germain-en-Laye (France). Responsable du système de balisage maritime mondial. Membres : autorités des aides à la navigation de 80+ pays. Publie les normes mondiales : systèmes de balisage, feux maritimes, AIS, e-Navigation. Le système IALA unifié (A et B) a été adopté après la catastrophe du Pacific Glory et du Allegro en 1971 (collision due à la non-harmonisation des balisages)."},
    {q:"Comment les feux des bouées sont-ils générés dans les zones reculées sans électricité ?",opts:["Ils ne s'allument pas","Panneaux solaires + batteries ou lampes à énergie solaire — cycles automatiques","Câbles électriques sous-marins","Énergie éolienne"],correct:1,expl:"Alimentation des feux de bouées : SOLAIRE (panneaux photovoltaïques) dans la très grande majorité des cas modernes. Batteries tampons pour fonctionnement nocturne et par temps couvert. Autonomie : plusieurs semaines sans soleil. Certaines bouées anciennes : gaz (acétylène) ou batteries primaires. Les rythmes des feux sont contrôlés par des minuteries électroniques ou des cellules photoélectriques. Maintenance : vérification périodique par les autorités de balisage (Affaires Maritimes, coastguards)."},
    {q:"Qu'est-ce qu'une 'lanterne de bouée' à rythme synchronisé ?",opts:["Un feu continu","Plusieurs bouées d'un même chenal synchronisées pour battre ensemble — facilite l'identification du chenal la nuit","Un feu codé morse","Un feu tournant"],correct:1,expl:"Synchronisation des feux = technique utilisée dans certains ports et chenaux où plusieurs bouées doivent être distinguées. Les feux peuvent être synchronisés (battent ensemble = secteur identifié) ou décalés (identification individuelle). Intérêt : dans un chenal complexe, les bouées de bâbord clignotent toutes ensemble, les tribord aussi mais décalées. Facilite l'identification nocturne du chenal. Les rythmes sont indiqués sur les cartes marines et dans les Instructions nautiques."},
    {q:"Qu'est-ce que le 'RACON' équipant certaines bouées cardinales et marques spéciales ?",opts:["Un capteur de courant","Répondeur radar (Radar beacon) — émet un signal codé quand interrogé par le radar du navire · améliore l'identification des bouées importantes","Un feu de secours","Un émetteur AIS"],correct:1,expl:"RACON (Radar Beacon) = répondeur radar. Activé quand il reçoit un signal radar d'un navire, il répond par un signal codé visible sur l'écran radar. Le code = lettre morse (ex : R pour une marque de danger particulière). Permet d'identifier avec certitude une bouée ou une balise radar même sans la voir visuellement. Très utilisé sur les bouées d'approche importantes, les cardinales critiques, les entrées de ports. Indiqué sur les cartes marines par 'Racon(X)' où X = lettre morse."},
  ],
  en:[
    {q:"What is the 'conventional direction of buoyage' in IALA?",opts:["Wind direction","Direction in which lateral marks apply — generally from seaward toward port (conventional) or indicated on nautical charts","Current direction","Wave direction"],correct:1,expl:"Conventional direction of buoyage = direction in which IALA rules apply. Generally: from seaward TOWARD port (port entrance). Can also be defined for estuaries, rivers, traffic separation schemes. Indicated on nautical charts by an arrow or special annotation. KEY: know which 'direction' you are relative to the buoys to correctly interpret port and starboard sides."},
    {q:"What is the shape of a port mark in IALA A?",opts:["Conical (pointed)","Cylindrical (flat on top)","Spherical","Crossed"],correct:1,expl:"IALA A port mark = CYLINDRICAL shape (can buoy). Flat on top. Red (IALA A) or green (IALA B). Topmark = cylinder (same color as buoy). Opposite: starboard mark = CONICAL (nun buoy) — pointed upward. Green (IALA A) or red (IALA B). These shapes allow daytime identification without colors."},
    {q:"How to identify a WEST cardinal buoy by day without a chart?",opts:["Black and yellow bands — cones point-to-point (↓↑)","Yellow and black bands — cones base-to-base","All black — cones upward","All yellow — cross"],correct:0,expl:"West cardinal by day: bands YELLOW · BLACK · YELLOW (yellow top and bottom, black in middle). Topmark = 2 cones POINT-TO-POINT (↓↑) = 'waist' shape. Light at night = 9 quick flashes (Q(9) or VQ(9)). Mnemonic: 'W for Waist = hourglass' · '9 o'clock = West on a clock'. Pass to the WEST of the buoy (danger is to the East)."},
    {q:"What is the topmark of a SOUTH cardinal buoy?",opts:["2 cones pointing upward","2 cones pointing downward","2 cones base-to-base (waist)","2 spheres"],correct:1,expl:"South cardinal = topmark 2 cones POINTING DOWNWARD (↓↓). Bands: YELLOW on top, BLACK on bottom. Light: 6 quick flashes + 1 long (Q(6)+LFl). Mnemonic: 'pointing down = toward South' · '6 o'clock = South on clock'. Pass to the SOUTH of the buoy (danger is to the North). Cardinal topmarks: North(↑↑) · East(↑↓ base-base) · South(↓↓) · West(↓↑ point-to-point)."},
    {q:"What is the difference between an isolated danger mark and a cardinal?",opts:["They are identical","Isolated danger = on the danger, navigable water all around · Cardinal = indicates which side to pass relative to danger","Cardinal = on the danger","Isolated danger = indicates north"],correct:1,expl:"ISOLATED DANGER mark: buoy placed ON or just beside the danger. Navigable water exists on ALL sides. Pass at distance from all sides. Identified by: black with red bands + 2 black spheres + Fl(2). CARDINAL: buoy indicating which side of the danger to pass (North, South, East or West). Navigable waters are ON THE CARDINAL SIDE. Identified by: yellow and black bands + directional cones."},
    {q:"What is an Emergency Wreck Marking Buoy (new danger mark)?",opts:["A rusty old buoy","Blue and yellow buoy signaling a recently discovered danger not yet charted — Q(5) or VQ(5)","A temporary special mark","A provisional cardinal"],correct:1,expl:"New danger (EWMB = Emergency Wreck Marking Buoy, introduced 2016): BLUE and YELLOW colors (vertical stripes). Topmark: yellow cross. Light: group of 5 quick flashes (Q(5) or VQ(5)). Used to quickly signal a wreck or newly discovered danger, not yet on charts. If danger very serious: two can be moored side by side. Information simultaneously broadcast via NAVTEX and AVURNAV."},
    {q:"What is an ODAS buoy (Oceanographic Data Acquisition System)?",opts:["A navigation light","Scientific data collection buoy — yellow special mark · do not approach · submarine cables","A special cardinal","A pipeline marker"],correct:1,expl:"ODAS = Ocean Data Acquisition System. Automated scientific buoy collecting meteorological and oceanographic data. Identified as IALA special mark (yellow). Signal: yellow light. DANGER: submarine power and communication cables. Charted on nautical charts. Belong to meteorological or scientific institutes (Météo France, NOAA, UK Met Office). Never moor to an ODAS."},
    {q:"What does 'Fl(2)' mean in a buoy light description?",opts:["2 fixed lights","Group of 2 FLASHES repeated periodically — characteristic of isolated danger","2 slow flashes","Fixed 2-second light"],correct:1,expl:"Fl(2) = Flashing (2) = group of 2 flashes. Light descriptions: Fl = flash, Q = quick, VQ = very quick, Oc = occulting, Iso = isophase, LFl = long flash. Number in brackets = flashes in group. Fl(2) = 2 flashes in group = characteristic of isolated danger. Q(3) = 3 quick flashes = East cardinal. Q(6)+LFl = 6 quick + 1 long = South cardinal."},
    {q:"How to recognize a starboard mark in IALA B (Americas)?",opts:["Green conical buoy","RED conical buoy with red light","Black cylindrical buoy","Yellow conical buoy"],correct:1,expl:"IALA B starboard = RED conical with red light. Reminder: IALA B = opposite of IALA A for lateral marks. IALA B (Americas, Japan, Korea): starboard = RED (conical), port = GREEN (cylindrical). IALA B mnemonic: 'RED RIGHT RETURNING' = red on right when returning (entering port). This rule used in USA for centuries, adopted in IALA B."},
    {q:"What is 'Morse A' used on safe water buoys?",opts:["A distress signal","Light signal coding letter A in morse: 1 short flash + 1 long flash — characteristic of safe water buoys","A type of cardinal","A sound signal"],correct:1,expl:"Morse A = light signal coding letter A (· − in Morse) = 1 short flash + 1 long flash. Exclusive characteristic of safe water marks. Sometimes also used: iso (isophase = equal light/dark periods), LFl (long flash). Morse A on a buoy = 'Attention, safe water, you are approaching coast or channel'. Very useful for nighttime approach to port."},
    {q:"What is a 'preferred channel mark' in IALA?",opts:["A cardinal","Modified lateral mark indicating two channels exist — one horizontal band of opposite color signals secondary channel","A yellow special mark","A safe water buoy"],correct:1,expl:"Preferred channel mark = lateral mark (red or green) with ONE HORIZONTAL BAND of opposite color. Example: red buoy with green band = preferred channel to port (IALA A), secondary channel to starboard. Meaning: two channels exist here, the main color indicates the PREFERRED channel (deepest/safest). Light: composite rhythm combining both colors."},
    {q:"What international body is responsible for the IALA system?",opts:["IMO","IALA (International Association of Marine Aids to Navigation and Lighthouse Authorities) — international organization founded in 1957","WMO","UN"],correct:1,expl:"IALA = International Association of Marine Aids to Navigation and Lighthouse Authorities. Founded 1957, headquarters in Saint-Germain-en-Laye (France). Responsible for worldwide maritime buoyage. Members: navigation aid authorities from 80+ countries. Publishes global standards: buoyage systems, maritime lights, AIS, e-Navigation. The unified IALA system (A and B) was adopted after the Pacific Glory and Allegro disaster in 1971 (collision due to non-harmonized buoyage)."},
    {q:"How are buoy lights powered in remote areas without electricity?",opts:["They don't light up","Solar panels + batteries or solar-powered lamps — automatic cycles","Underwater electrical cables","Wind energy"],correct:1,expl:"Buoy light power supply: SOLAR (photovoltaic panels) in the vast majority of modern cases. Buffer batteries for nighttime and cloudy weather operation. Autonomy: several weeks without sun. Some older buoys: gas (acetylene) or primary batteries. Light rhythms controlled by electronic timers or photoelectric cells. Maintenance: periodic inspection by buoyage authorities (Affaires Maritimes, coastguards)."},
    {q:"What is a 'synchronized' buoy light rhythm?",opts:["A continuous light","Multiple buoys in a channel synchronized to flash together — aids channel identification at night","A Morse-coded light","A rotating light"],correct:1,expl:"Light synchronization = technique used in some ports and channels where multiple buoys must be distinguished. Lights can be synchronized (flash together = identified sector) or offset (individual identification). Benefit: in a complex channel, all port buoys flash together, starboard buoys also but offset. Facilitates nighttime channel identification. Rhythms shown on nautical charts and in Sailing Directions."},
    {q:"What is a 'RACON' fitted on some cardinal buoys and special marks?",opts:["A current sensor","Radar beacon — emits coded signal when interrogated by ship's radar · improves identification of important buoys","An emergency light","An AIS transmitter"],correct:1,expl:"RACON (Radar Beacon) = radar transponder. Activated when it receives a radar signal from a vessel, it responds with a coded signal visible on the radar screen. The code = Morse letter (e.g. R for a particular danger mark). Allows certain identification of a buoy or beacon even without visual sighting. Widely used on important approach buoys, critical cardinals, port entrances. Shown on nautical charts as 'Racon(X)' where X = Morse letter."},
  ],
  es:[
    {q:"¿Qué es el 'sentido convencional del balizamiento' en IALA?",opts:["La dirección del viento","Dirección en la que se aplican las marcas laterales — generalmente desde el mar hacia el puerto (convencional) o indicada en las cartas náuticas","La dirección de la corriente","La dirección de las olas"],correct:1,expl:"Sentido convencional del balizamiento = dirección en la que se aplican las normas IALA. Generalmente: desde el mar HACIA el puerto (entrada portuaria). También puede definirse para estuarios, ríos, dispositivos de separación del tráfico. Indicado en las cartas náuticas por una flecha o anotación especial. CLAVE: saber en qué 'sentido' se está con respecto a las balizas para interpretar correctamente babor y estribor."},
    {q:"¿Cuál es la forma de una marca de babor en IALA A?",opts:["Cónica (puntiaguda)","Cilíndrica (plana en la parte superior)","Esférica","En forma de cruz"],correct:1,expl:"Marca de babor IALA A = forma CILÍNDRICA (can buoy). Plana en la parte superior. Roja (IALA A) o verde (IALA B). Topmark = cilindro (mismo color que la baliza). A la inversa: marca de estribor = CÓNICA (nun buoy) — puntiaguda hacia arriba. Verde (IALA A) o roja (IALA B). Estas formas permiten la identificación DIURNA sin colores."},
    {q:"¿Cómo identificar una baliza cardinal OESTE de día sin carta?",opts:["Bandas negras y amarillas — conos punta con punta (↓↑)","Bandas amarillas y negras — conos base contra base","Completamente negra — conos hacia arriba","Completamente amarilla — cruz"],correct:0,expl:"Cardinal OESTE de día: bandas AMARILLO · NEGRO · AMARILLO (amarillo arriba y abajo, negro en el medio). Topmark = 2 conos PUNTA CON PUNTA (↓↑) = forma de 'reloj de arena'. Luz de noche = 9 destellos rápidos (Q(9) o VQ(9)). Regla mnemotécnica: 'Hora 9 = Oeste en un reloj'. Pasar al OESTE de la baliza (el peligro está al Este)."},
    {q:"¿Cuál es el topmark de una baliza cardinal SUR?",opts:["2 conos apuntando hacia arriba","2 conos apuntando hacia abajo","2 conos base contra base (reloj de arena)","2 esferas"],correct:1,expl:"Cardinal SUR = topmark 2 conos APUNTANDO HACIA ABAJO (↓↓). Bandas: AMARILLO arriba, NEGRO abajo. Luz: 6 destellos rápidos + 1 largo (Q(6)+LFl). Regla mnemotécnica: 'Apunta hacia abajo = hacia el Sur' · 'Hora 6 = Sur en un reloj'. Pasar al SUR de la baliza (el peligro está al Norte)."},
    {q:"¿Cuál es la diferencia entre una marca de peligro aislado y un cardinal?",opts:["Son idénticos","Peligro aislado = sobre el peligro, aguas navegables alrededor · Cardinal = indica por qué lado pasar respecto al peligro","Cardinal = sobre el peligro","Peligro aislado = indica el norte"],correct:1,expl:"PELIGRO AISLADO: baliza colocada SOBRE o justo al lado del peligro. Hay aguas navegables por TODOS los lados. Pasar a distancia de todos los lados. Identificada por: negro con bandas rojas + 2 esferas negras + Fl(2). CARDINAL: baliza que indica por qué lado del peligro pasar (Norte, Sur, Este u Oeste). Las aguas navegables están DEL LADO DEL CARDINAL."},
    {q:"¿Qué es la Baliza de Señalización de Naufragio de Emergencia (nuevo peligro)?",opts:["Una vieja baliza oxidada","Baliza azul y amarilla que señala un peligro recién descubierto no cartografiado aún — Q(5) o VQ(5)","Una marca especial temporal","Un cardinal provisional"],correct:1,expl:"Nuevo peligro (EWMB, introducida 2016): colores AZUL y AMARILLO (franjas verticales). Topmark: cruz amarilla. Luz: grupo de 5 destellos rápidos (Q(5) o VQ(5)). Se utiliza para señalar rápidamente un naufragio o peligro recién descubierto, no aún en las cartas. Si el peligro es muy grave: se pueden fondear DOS juntas."},
    {q:"¿Qué es una boya ODAS (Sistema de Adquisición de Datos Oceanográficos)?",opts:["Un faro de navegación","Boya científica de recopilación de datos oceanográficos — marca especial amarilla · no aproximarse · cables submarinos","Un cardinal especial","Un balizamiento de tubería"],correct:1,expl:"ODAS = Ocean Data Acquisition System. Boya científica automatizada que recopila datos meteorológicos y oceanográficos. Identificada como marca especial IALA (amarilla). Señal: luz amarilla. PELIGRO: cables submarinos de alimentación y comunicación. Cartografiadas en las cartas náuticas. Nunca amarrar a una ODAS."},
    {q:"¿Qué significa 'Fl(2)' en la descripción de una luz de baliza?",opts:["2 luces fijas","Grupo de 2 DESTELLOS repetidos periódicamente — característica del peligro aislado","2 destellos lentos","Luz fija de 2 segundos"],correct:1,expl:"Fl(2) = Flashing (2) = grupo de 2 destellos. Descripción de luces: Fl = destello, Q = centelleante, VQ = ultra-rápido, Oc = ocultante, Iso = isofase, LFl = destello largo. El número entre paréntesis = número de destellos en el grupo. Fl(2) = 2 destellos en el grupo = característica del peligro aislado."},
    {q:"¿Cómo reconocer una marca de estribor en IALA B (Américas)?",opts:["Baliza verde cónica","Baliza ROJA cónica con luz roja","Baliza negra cilíndrica","Baliza amarilla cónica"],correct:1,expl:"Estribor IALA B = ROJA cónica con luz roja. Recordatorio: IALA B = contrario de IALA A para las marcas laterales. IALA B: estribor = ROJO (cónico), babor = VERDE (cilíndrico). Regla mnemotécnica IALA B: 'RED RIGHT RETURNING' = rojo a la derecha al entrar al puerto."},
    {q:"¿Qué es el 'Morse A' utilizado en las boyas de aguas seguras?",opts:["Una señal de socorro","Señal luminosa que codifica la letra A en morse: 1 destello corto + 1 destello largo — característica de las boyas de aguas seguras","Un tipo de cardinal","Una señal sonora"],correct:1,expl:"Morse A = señal luminosa que codifica la letra A (· − en morse) = 1 destello corto + 1 destello largo. Característica exclusiva de las marcas de aguas seguras. A veces también: isofase, LFl. Morse A en una baliza = 'Atención, aguas seguras, se está aproximando a la costa o a un canal'."},
    {q:"¿Qué es una 'marca de canal preferente' en IALA?",opts:["Un cardinal","Marca lateral modificada que indica que existen dos canales — una banda horizontal del color opuesto señala el canal secundario","Una marca especial amarilla","Una boya de aguas seguras"],correct:1,expl:"Canal preferente = marca lateral (roja o verde) con UNA BANDA HORIZONTAL del color opuesto. Ejemplo: baliza roja con banda verde = canal preferente a babor (IALA A), canal secundario a estribor. Significado: existen dos canales aquí, el color principal indica el canal PREFERENTE (el más profundo/seguro)."},
    {q:"¿Qué organismo internacional es responsable del sistema IALA?",opts:["La OMI","IALA (Asociación Internacional de Señalización Marítima y Autoridades de Faros) — organización internacional fundada en 1957","La OMM","La ONU"],correct:1,expl:"IALA = International Association of Marine Aids to Navigation and Lighthouse Authorities. Fundada en 1957, con sede en Saint-Germain-en-Laye (Francia). Responsable del balizamiento marítimo mundial. Miembros: autoridades de ayudas a la navegación de más de 80 países. El sistema IALA unificado (A y B) fue adoptado tras el desastre del Pacific Glory y del Allegro en 1971."},
    {q:"¿Cómo se alimentan las luces de las boyas en zonas remotas sin electricidad?",opts:["No se iluminan","Paneles solares + baterías o lámparas de energía solar — ciclos automáticos","Cables eléctricos submarinos","Energía eólica"],correct:1,expl:"Alimentación de las luces de las boyas: SOLAR (paneles fotovoltaicos) en la gran mayoría de los casos modernos. Baterías tampón para funcionamiento nocturno y con tiempo nublado. Autonomía: varias semanas sin sol. Algunas boyas antiguas: gas (acetileno) o baterías primarias."},
    {q:"¿Qué es un ritmo de luz de boya 'sincronizado'?",opts:["Una luz continua","Varias boyas de un mismo canal sincronizadas para destellar juntas — facilita la identificación del canal de noche","Una luz codificada morse","Una luz giratoria"],correct:1,expl:"Sincronización de luces = técnica utilizada en algunos puertos y canales donde varias boyas deben distinguirse. Las luces pueden estar sincronizadas (destellan juntas = sector identificado) o desfasadas (identificación individual). Ventaja: en un canal complejo, todas las boyas de babor destellan juntas, las de estribor también pero desfasadas."},
    {q:"¿Qué es un 'RACON' instalado en algunas balizas cardinales y marcas especiales?",opts:["Un sensor de corriente","Respondedor de radar (Radar beacon) — emite una señal codificada cuando es interrogado por el radar del buque · mejora la identificación de balizas importantes","Un faro de emergencia","Un emisor AIS"],correct:1,expl:"RACON (Radar Beacon) = respondedor de radar. Se activa cuando recibe una señal de radar de un buque y responde con una señal codificada visible en la pantalla de radar. El código = letra morse. Permite identificar con certeza una boya o baliza incluso sin verla visualmente. Se indica en las cartas náuticas como 'Racon(X)' donde X = letra morse."},
  ],
  pt:[
    {q:"O que é o 'sentido convencional da balizagem' em IALA?",opts:["A direção do vento","Direção em que as marcas laterais se aplicam — geralmente do mar para o porto (convencional) ou indicada nas cartas náuticas","A direção da corrente","A direção das ondas"],correct:1,expl:"Sentido convencional da balizagem = direção em que as regras IALA se aplicam. Geralmente: do mar em direção ao porto (entrada portuária). Pode também ser definido para estuários, rios, dispositivos de separação de tráfego. Indicado nas cartas náuticas por uma seta ou anotação especial. CHAVE: saber em que 'sentido' se está relativamente às boias para interpretar corretamente bombordo e estibordo."},
    {q:"Qual é a forma de uma marca de bombordo em IALA A?",opts:["Cónica (pontiaguda)","Cilíndrica (plana no topo)","Esférica","Em cruz"],correct:1,expl:"Marca de bombordo IALA A = forma CILÍNDRICA (can buoy). Plana no topo. Vermelha (IALA A) ou verde (IALA B). Topmark = cilindro (mesma cor que a boia). Ao contrário: marca de estibordo = CÓNICA (nun buoy) — pontiaguda para cima. Verde (IALA A) ou vermelha (IALA B). Estas formas permitem a identificação DIURNA sem cores."},
    {q:"Como identificar uma boia cardinal OESTE de dia sem carta?",opts:["Faixas pretas e amarelas — cones ponta contra ponta (↓↑)","Faixas amarelas e pretas — cones base contra base","Completamente preta — cones para cima","Completamente amarela — cruz"],correct:0,expl:"Cardinal OESTE de dia: faixas AMARELO · PRETO · AMARELO (amarelo em cima e em baixo, preto no meio). Topmark = 2 cones PONTA CONTRA PONTA (↓↑) = forma de 'ampulheta'. Luz à noite = 9 cintilantes rápidos (Q(9) ou VQ(9)). Regra mnemónica: '9 horas = Oeste num relógio'. Passar a OESTE da boia (o perigo está a Este)."},
    {q:"Qual é o topmark de uma boia cardinal SUL?",opts:["2 cones apontados para cima","2 cones apontados para baixo","2 cones base contra base (ampulheta)","2 esferas"],correct:1,expl:"Cardinal SUL = topmark 2 cones APONTADOS PARA BAIXO (↓↓). Faixas: AMARELO em cima, PRETO em baixo. Luz: 6 cintilantes rápidos + 1 longo (Q(6)+LFl). Regra mnemónica: 'apontado para baixo = para Sul' · '6 horas = Sul num relógio'. Passar a SUL da boia (o perigo está a Norte)."},
    {q:"Qual é a diferença entre uma marca de perigo isolado e um cardinal?",opts:["São idênticos","Perigo isolado = sobre o perigo, águas navegáveis em volta · Cardinal = indica por que lado passar em relação ao perigo","Cardinal = sobre o perigo","Perigo isolado = indica o norte"],correct:1,expl:"PERIGO ISOLADO: boia colocada SOBRE ou perto do perigo. Há águas navegáveis de TODOS os lados. Passar à distância de todos os lados. Identificada por: preto com faixas vermelhas + 2 esferas pretas + Fl(2). CARDINAL: boia que indica por que lado do perigo passar (Norte, Sul, Este ou Oeste). As águas navegáveis estão DO LADO DO CARDINAL."},
    {q:"O que é uma Boia de Sinalização de Naufrágio de Emergência (novo perigo)?",opts:["Uma boia velha enferrujada","Boia azul e amarela sinalizando um perigo recentemente descoberto não ainda cartografado — Q(5) ou VQ(5)","Uma marca especial temporária","Um cardinal provisório"],correct:1,expl:"Novo perigo (EWMB, introduzida 2016): cores AZUL e AMARELO (faixas verticais). Topmark: cruz amarela. Luz: grupo de 5 cintilantes rápidos (Q(5) ou VQ(5)). Usada para sinalizar rapidamente um naufrágio ou perigo recentemente descoberto, ainda não nas cartas. Se o perigo for muito grave: podem ser fundeadas DUAS lado a lado."},
    {q:"O que é uma boia ODAS (Sistema de Aquisição de Dados Oceanográficos)?",opts:["Um farol de navegação","Boia científica de recolha de dados oceanográficos — marca especial amarela · não se aproximar · cabos submarinos","Um cardinal especial","Uma sinalização de oleoduto"],correct:1,expl:"ODAS = Ocean Data Acquisition System. Boia científica automatizada que recolhe dados meteorológicos e oceanográficos. Identificada como marca especial IALA (amarela). Sinal: luz amarela. PERIGO: cabos submarinos de alimentação e comunicação. Cartografadas nas cartas náuticas. Nunca amarrar a uma ODAS."},
    {q:"O que significa 'Fl(2)' na descrição de uma luz de boia?",opts:["2 luzes fixas","Grupo de 2 CLARÕES repetidos periodicamente — característica do perigo isolado","2 clarões lentos","Luz fixa de 2 segundos"],correct:1,expl:"Fl(2) = Flashing (2) = grupo de 2 clarões. Descrição das luzes: Fl = clarão, Q = cintilante, VQ = ultra-rápido, Oc = ocultante, Iso = isofase, LFl = clarão longo. O número entre parênteses = clarões no grupo. Fl(2) = 2 clarões no grupo = característica do perigo isolado."},
    {q:"Como reconhecer uma marca de estibordo em IALA B (Américas)?",opts:["Boia verde cónica","Boia VERMELHA cónica com luz vermelha","Boia preta cilíndrica","Boia amarela cónica"],correct:1,expl:"Estibordo IALA B = VERMELHA cónica com luz vermelha. Lembrança: IALA B = oposto de IALA A para as marcas laterais. IALA B: estibordo = VERMELHO (cónico), bombordo = VERDE (cilíndrico). Regra mnemónica IALA B: 'RED RIGHT RETURNING' = vermelho à direita ao entrar no porto."},
    {q:"O que é o 'Morse A' utilizado nas boias de águas seguras?",opts:["Um sinal de socorro","Sinal luminoso codificando a letra A em morse: 1 clarão curto + 1 clarão longo — característica das boias de águas seguras","Um tipo de cardinal","Um sinal sonoro"],correct:1,expl:"Morse A = sinal luminoso codificando a letra A (· − em morse) = 1 clarão curto + 1 clarão longo. Característica exclusiva das marcas de águas seguras. Por vezes também: isofase, LFl. Morse A numa boia = 'Atenção, águas seguras, está a aproximar-se da costa ou de um canal'."},
    {q:"O que é uma 'marca de canal preferencial' em IALA?",opts:["Um cardinal","Marca lateral modificada que indica que existem dois canais — uma faixa horizontal da cor oposta sinaliza o canal secundário","Uma marca especial amarela","Uma boia de águas seguras"],correct:1,expl:"Canal preferencial = marca lateral (vermelha ou verde) com UMA FAIXA HORIZONTAL da cor oposta. Exemplo: boia vermelha com faixa verde = canal preferencial a bombordo (IALA A), canal secundário a estibordo. Significado: existem dois canais aqui, a cor principal indica o canal PREFERENCIAL (o mais profundo/seguro)."},
    {q:"Que organismo internacional é responsável pelo sistema IALA?",opts:["A IMO","IALA (Associação Internacional de Sinalização Marítima e Autoridades de Faróis) — organização internacional fundada em 1957","A OMM","A ONU"],correct:1,expl:"IALA = International Association of Marine Aids to Navigation and Lighthouse Authorities. Fundada em 1957, sede em Saint-Germain-en-Laye (França). Responsável pela balizagem marítima mundial. Membros: autoridades de auxílios à navegação de mais de 80 países. O sistema IALA unificado (A e B) foi adotado após o desastre do Pacific Glory e do Allegro em 1971."},
    {q:"Como são alimentadas as luzes das boias em zonas remotas sem eletricidade?",opts:["Não se iluminam","Painéis solares + baterias ou lâmpadas de energia solar — ciclos automáticos","Cabos elétricos submarinos","Energia eólica"],correct:1,expl:"Alimentação das luzes das boias: SOLAR (painéis fotovoltaicos) na grande maioria dos casos modernos. Baterias tampão para funcionamento noturno e com tempo nublado. Autonomia: várias semanas sem sol. Algumas boias antigas: gás (acetileno) ou baterias primárias."},
    {q:"O que é um ritmo de luz de boia 'sincronizado'?",opts:["Uma luz contínua","Várias boias de um mesmo canal sincronizadas para cintilar juntas — facilita a identificação do canal de noite","Uma luz codificada morse","Uma luz giratória"],correct:1,expl:"Sincronização de luzes = técnica utilizada em alguns portos e canais onde várias boias devem ser distinguidas. As luzes podem ser sincronizadas (cintilam juntas = setor identificado) ou desfasadas (identificação individual). Benefício: num canal complexo, todas as boias de bombordo cintilam juntas, as de estibordo também mas desfasadas."},
    {q:"O que é um 'RACON' instalado em algumas boias cardinais e marcas especiais?",opts:["Um sensor de corrente","Respondedor de radar (Radar beacon) — emite sinal codificado quando interrogado pelo radar do navio · melhora a identificação de boias importantes","Um farol de emergência","Um emissor AIS"],correct:1,expl:"RACON (Radar Beacon) = respondedor de radar. Ativado quando recebe um sinal de radar de um navio, responde com um sinal codificado visível no ecrã de radar. O código = letra morse. Permite identificar com certeza uma boia ou baliza mesmo sem a ver visualmente. Mostrado nas cartas náuticas como 'Racon(X)' onde X = letra morse."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.buoyGreen},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.buoyGreen},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:14},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.buoyGreen}33,${C.gold2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.teal}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.teal,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.teal:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.teal},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    fr:{
      badge:"🚦 Signalisation & Balisage · Leçon 1/7 · ⭐ Premium · 200 XP",
      title:"Système IALA — Balisage Maritime",
      intro:"La mer est balisée comme une route. Les bouées ne sont pas là par hasard — chacune a une couleur, une forme, un feu et un message précis. Les lire correctement peut faire la différence entre naviguer en sécurité et s'échouer.\n\nCette leçon couvre le système IALA A et B, les marques latérales, cardinales et spéciales.",
      p1:"PARTIE 1 — SYSTÈME IALA (2 RÉGIONS)",s1t:"Région A (Europe/Asie) · Région B (Amériques)",
      s1:"IALA = International Association of Marine\nAids to Navigation and Lighthouse Authorities\nFondée : 1957 · Siège : France\n\n2 RÉGIONS MONDIALES :\nRégion A → Europe · Afrique · Asie · Australie\nRégion B → Amériques · Japon · Corée · Philippines\n\nDIFFÉRENCE CLEF :\nSEULEMENT les couleurs latérales diffèrent\nLes cardinales sont identiques dans les 2 régions\n\nRÉGION A : Bâbord = ROUGE\nRÉGION B : Bâbord = VERT (inverse !)",
      p2:"PARTIE 2 — MARQUES LATÉRALES",s2t:"Bâbord · Tribord · Formes · Feux · Couleurs",
      s2:"MARQUES LATÉRALES = délimitent le chenal\n\nRÉGION A :\nBâbord → ROUGE · cylindrique · feu rouge\nTribord → VERT · conique · feu vert\n\nRÉGION B (inverse) :\nBâbord → VERT · cylindrique · feu vert\nTribord → ROUGE · conique · feu rouge\n\nFORMES (identiques dans les 2 régions) :\nCylindrique (plate) = bâbord\nConique (pointue) = tribord\n\nRÈGLE 'Red Right Returning' (IALA B) :\nRouge à droite en entrant = règle américaine",
      p3:"PARTIE 3 — MARQUES CARDINALES",s2t:"Nord · Sud · Est · Ouest · Feux mnémotechniques",
      s3:"CARDINALES = identiques en IALA A et B\n\nCOULEURS : noir et jaune\nTOPMARKS : cônes (direction indicative)\nFEUX : scintillants ou ultra-rapides\n\nMOYEN MNÉMOTECHNIQUE FEUX :\nNord → Continu (QFlashing)\nEst → 3 (3 heures = Est)\nSud → 6 + long (6 heures = Sud)\nOuest → 9 (9 heures = Ouest)\n\nTOPMARK AIDE-MÉMOIRE :\nNord ↑↑ · Sud ↓↓ · Est ↑↓ · Ouest ↓↑",
      p4:"PARTIE 4 — MARQUES SPÉCIALES",s2t:"Danger isolé · Eaux saines · Spéciale · Nouveau danger",
      s4:"4 MARQUES SPÉCIALES :\n\nDANGER ISOLÉ\nNoir + rouge · 2 sphères · Fl(2)\nPasser à distance de tous côtés\n\nEAUX SAINES\nRouge + blanc vertical · sphère · Morse A\nEaux navigables partout autour\n\nMARQUE SPÉCIALE\nJaune · X (croix St-André) · feu jaune\nZone spéciale (militaire · câbles · loisirs)\n\nNOUVEAU DANGER\nBleu + jaune · croix · Q(5) ou VQ(5)\nDanger récent non cartographié",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — IALA BALISAGE L1",
      sumP:["IALA A (Europe/Asie) : bâbord = ROUGE · tribord = VERT","IALA B (Amériques) : bâbord = VERT · tribord = ROUGE (inverse !)","Cardinales identiques A et B : N(continu) · E(3) · S(6+long) · O(9)","Danger isolé : noir/rouge · 2 sphères · Fl(2) · passer à distance tout autour","Eaux saines : rouge/blanc · sphère rouge · Morse A · navigable partout","Marque spéciale : jaune · croix St-André · toute zone spéciale","Nouveau danger : bleu/jaune · Q(5) · danger non cartographié","Topmarks cardinales : ↑↑ Nord · ↓↓ Sud · ↑↓ Est · ↓↑ Ouest"],
      learnedP:["Régions IALA A et B · différences couleurs latérales","Marques latérales : bâbord/tribord · formes/couleurs/feux","4 cardinales : topmarks · feux mnémotechniques 3·6·9","Danger isolé · Eaux saines · Marque spéciale · Nouveau danger","Cas Dalmacija : importance comptage éclats cardinales de nuit"],
    },
    en:{
      badge:"🚦 Signaling & Buoyage · Lesson 1/7 · ⭐ Premium · 200 XP",
      title:"IALA System — Maritime Buoyage",
      intro:"The sea is marked like a road. Buoys are not there by chance — each has a specific color, shape, light and message. Reading them correctly can make the difference between safe navigation and running aground.",
      p1:"PART 1 — IALA SYSTEM (2 REGIONS)",s1t:"Region A (Europe/Asia) · Region B (Americas)",
      s1:"IALA = International Association of Marine\nAids to Navigation and Lighthouse Authorities\nFounded: 1957 · HQ: France\n\n2 WORLD REGIONS:\nRegion A → Europe · Africa · Asia · Australia\nRegion B → Americas · Japan · Korea · Philippines\n\nKEY DIFFERENCE:\nONLY lateral colors differ\nCardinals are identical in both regions\n\nREGION A: Port = RED\nREGION B: Port = GREEN (opposite!)",
      p2:"PART 2 — LATERAL MARKS",s1t:"Port · Starboard · Shapes · Lights · Colors",
      s2:"LATERAL MARKS = delimit the channel\n\nREGION A:\nPort → RED · cylindrical · red light\nStarboard → GREEN · conical · green light\n\nREGION B (opposite):\nPort → GREEN · cylindrical · green light\nStarboard → RED · conical · red light\n\nSHAPES (identical in both regions):\nCylindrical (flat) = port\nConical (pointed) = starboard\n\n'Red Right Returning' rule (IALA B):\nRed on right when entering = US rule",
      p3:"PART 3 — CARDINAL MARKS",s1t:"North · South · East · West · Mnemonic lights",
      s3:"CARDINALS = identical in IALA A and B\n\nCOLORS: black and yellow\nTOPMARKS: cones (directional)\nLIGHTS: quick or very quick flashing\n\nLIGHT MNEMONIC:\nNorth → Continuous (Q)\nEast → 3 (3 o'clock = East)\nSouth → 6 + long (6 o'clock = South)\nWest → 9 (9 o'clock = West)\n\nTOPMARK AIDE:\nNorth ↑↑ · South ↓↓ · East ↑↓ · West ↓↑",
      p4:"PART 4 — SPECIAL MARKS",s1t:"Isolated danger · Safe water · Special · New danger",
      s4:"4 SPECIAL MARKS:\n\nISOLATED DANGER\nBlack + red · 2 spheres · Fl(2)\nPass at distance from all sides\n\nSAFE WATER\nRed + white vertical · sphere · Morse A\nNavigable water all around\n\nSPECIAL MARK\nYellow · X (St Andrew's cross) · yellow light\nSpecial zone (military · cables · recreation)\n\nNEW DANGER\nBlue + yellow · cross · Q(5) or VQ(5)\nRecent uncharted danger",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — IALA BUOYAGE L1",
      sumP:["IALA A (Europe/Asia): port = RED · starboard = GREEN","IALA B (Americas): port = GREEN · starboard = RED (opposite!)","Cardinals identical A and B: N(continuous) · E(3) · S(6+long) · W(9)","Isolated danger: black/red · 2 spheres · Fl(2) · pass at distance all around","Safe water: red/white · red sphere · Morse A · navigable everywhere","Special mark: yellow · St Andrew's cross · any special zone","New danger: blue/yellow · Q(5) · uncharted danger","Cardinal topmarks: ↑↑ North · ↓↓ South · ↑↓ East · ↓↑ West"],
      learnedP:["IALA A and B regions · lateral color differences","Lateral marks: port/starboard · shapes/colors/lights","4 cardinals: topmarks · mnemonic lights 3·6·9","Isolated danger · Safe water · Special mark · New danger","Dalmacija case: importance of counting cardinal flashes at night"],
    },
    es:{
      badge:"🚦 Señalización y Balizamiento · Lección 1/7 · ⭐ Premium · 200 XP",
      title:"Sistema IALA — Balizamiento Marítimo",
      intro:"El mar está balizando como una carretera. Las balizas no están ahí por casualidad — cada una tiene un color, una forma, una luz y un mensaje preciso. Leerlas correctamente puede marcar la diferencia entre navegar con seguridad y embarrancar.",
      p1:"PARTE 1 — SISTEMA IALA (2 REGIONES)",s1t:"Región A (Europa/Asia) · Región B (Américas)",
      s1:"IALA · Fundada 1957 · Sede: Francia\n\n2 REGIONES MUNDIALES:\nRegión A → Europa · África · Asia · Australia\nRegión B → Américas · Japón · Corea · Filipinas\n\nDIFERENCIA CLAVE:\nSOLO difieren los colores laterales\nLos cardinales son idénticos en ambas regiones\nREGIÓN A: Babor = ROJO · REGIÓN B: Babor = VERDE (¡inverso!)",
      p2:"PARTE 2 — MARCAS LATERALES",s1t:"Babor · Estribor · Formas · Luces · Colores",
      s2:"Región A: Babor → ROJO · cilíndrica · luz roja\nEstribor → VERDE · cónica · luz verde\nRegión B (inverso): Babor → VERDE · Estribor → ROJO\nFormas: Cilíndrica (plana) = babor · Cónica (puntiaguda) = estribor",
      p3:"PARTE 3 — MARCAS CARDINALES",s1t:"Norte · Sur · Este · Oeste · Luces mnemotécnicas",
      s3:"CARDINALES idénticos en IALA A y B\nColores: negro y amarillo · Topmarks: conos\nLUCES MNEMOTÉCNICAS:\nNorte → Centelleante continuo · Este → 3\nSur → 6 + largo · Oeste → 9\nTopmarks: ↑↑ Norte · ↓↓ Sur · ↑↓ Este · ↓↑ Oeste",
      p4:"PARTE 4 — MARCAS ESPECIALES",s1t:"Peligro aislado · Aguas seguras · Especial · Nuevo peligro",
      s4:"Peligro aislado: negro/rojo · 2 esferas · Fl(2)\nAguas seguras: rojo/blanco · esfera · Morse A\nMarca especial: amarillo · X · luz amarilla\nNuevo peligro: azul/amarillo · cruz · Q(5)",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — IALA BALIZAMIENTO L1",
      sumP:["IALA A (Europa/Asia): babor = ROJO · estribor = VERDE","IALA B (Américas): babor = VERDE · estribor = ROJO (¡inverso!)","Cardinales idénticos A y B: N(continuo) · E(3) · S(6+largo) · O(9)","Peligro aislado: negro/rojo · 2 esferas · Fl(2) · pasar a distancia alrededor","Aguas seguras: rojo/blanco · esfera roja · Morse A · navegable por doquier","Marca especial: amarillo · cruz San Andrés · cualquier zona especial","Nuevo peligro: azul/amarillo · Q(5) · peligro no cartografiado","Topmarks cardinales: ↑↑ Norte · ↓↓ Sur · ↑↓ Este · ↓↑ Oeste"],
      learnedP:["Regiones IALA A y B · diferencias colores laterales","Marcas laterales: babor/estribor · formas/colores/luces","4 cardinales: topmarks · luces mnemotécnicas 3·6·9","Peligro aislado · Aguas seguras · Marca especial · Nuevo peligro","Caso Dalmacija: importancia del conteo de destellos cardinales de noche"],
    },
    pt:{
      badge:"🚦 Sinalização e Balizagem · Lição 1/7 · ⭐ Premium · 200 XP",
      title:"Sistema IALA — Balizagem Marítima",
      intro:"O mar está balizando como uma estrada. As boias não estão ali por acaso — cada uma tem uma cor, uma forma, uma luz e uma mensagem precisa. Lê-las corretamente pode fazer a diferença entre navegar com segurança e encalhar.",
      p1:"PARTE 1 — SISTEMA IALA (2 REGIÕES)",s1t:"Região A (Europa/Ásia) · Região B (Américas)",
      s1:"IALA · Fundada 1957 · Sede: França\n\n2 REGIÕES MUNDIAIS:\nRegião A → Europa · África · Ásia · Austrália\nRegião B → Américas · Japão · Coreia · Filipinas\n\nDIFERENCE CHAVE:\nAPENAS as cores laterais diferem\nOs cardinais são idênticos nas 2 regiões\nREGIÃO A: Bombordo = VERMELHO · REGIÃO B: Bombordo = VERDE (oposto!)",
      p2:"PARTE 2 — MARCAS LATERAIS",s1t:"Bombordo · Estibordo · Formas · Luzes · Cores",
      s2:"Região A: Bombordo → VERMELHO · cilíndrica · luz vermelha\nEstibordo → VERDE · cónica · luz verde\nRegião B (oposto): Bombordo → VERDE · Estibordo → VERMELHO\nFormas: Cilíndrica (plana) = bombordo · Cónica (pontiaguda) = estibordo",
      p3:"PARTE 3 — MARCAS CARDINAIS",s1t:"Norte · Sul · Este · Oeste · Luzes mnemónicas",
      s3:"CARDINAIS idênticos em IALA A e B\nCores: preto e amarelo · Topmarks: cones\nLUZES MNEMÓNICAS:\nNorte → Cintilante contínuo · Este → 3\nSul → 6 + longo · Oeste → 9\nTopmarks: ↑↑ Norte · ↓↓ Sul · ↑↓ Este · ↓↑ Oeste",
      p4:"PARTE 4 — MARCAS ESPECIAIS",s1t:"Perigo isolado · Águas seguras · Especial · Novo perigo",
      s4:"Perigo isolado: preto/vermelho · 2 esferas · Fl(2)\nÁguas seguras: vermelho/branco · esfera · Morse A\nMarca especial: amarelo · X · luz amarela\nNovo perigo: azul/amarelo · cruz · Q(5)",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — IALA BALIZAGEM L1",
      sumP:["IALA A (Europa/Ásia): bombordo = VERMELHO · estibordo = VERDE","IALA B (Américas): bombordo = VERDE · estibordo = VERMELHO (oposto!)","Cardinais idênticos A e B: N(contínuo) · E(3) · S(6+longo) · O(9)","Perigo isolado: preto/vermelho · 2 esferas · Fl(2) · passar à distância em volta","Águas seguras: vermelho/branco · esfera vermelha · Morse A · navegável em todo o lado","Marca especial: amarelo · cruz St André · qualquer zona especial","Novo perigo: azul/amarelo · Q(5) · perigo não cartografado","Topmarks cardinais: ↑↑ Norte · ↓↓ Sul · ↑↓ Este · ↓↑ Oeste"],
      learnedP:["Regiões IALA A e B · diferenças cores laterais","Marcas laterais: bombordo/estibordo · formas/cores/luzes","4 cardinais: topmarks · luzes mnemónicas 3·6·9","Perigo isolado · Águas seguras · Marca especial · Novo perigo","Caso Dalmacija: importância da contagem de clarões cardinais à noite"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonIALA({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#020d08 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.teal}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.teal,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🚦 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/7":lang==="en"?"Lesson 1/7":lang==="es"?"Lección 1/7":"Lição 1/7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.teal,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.buoyRed},${C.buoyGreen},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(10,138,108,0.15)",border:`1px solid ${C.teal}44`,fontSize:11,color:C.teal,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.teal}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="🌍" text={lc.p1} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🌍 {lang==="fr"?"RÉGIONS IALA — INTERACTIF":lang==="en"?"IALA REGIONS — INTERACTIVE":"REGIONES IALA — INTERACTIVO"}</div>
              <IALAZonesSVG lang={lang}/>
            </Card>
            <SL icon="🔴🟢" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔴🟢 {lang==="fr"?"MARQUES LATÉRALES — SIMULATEUR":lang==="en"?"LATERAL MARKS — SIMULATOR":"MARCAS LATERALES — SIMULADOR"}</div>
              <LateralMarksSVG lang={lang}/>
            </Card>
            <SL icon="🧭" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🧭 {lang==="fr"?"MARQUES CARDINALES — INTERACTIF":lang==="en"?"CARDINAL MARKS — INTERACTIVE":"MARCAS CARDINALES — INTERACTIVO"}</div>
              <CardinalMarksSVG lang={lang}/>
            </Card>
            <SL icon="⚓" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}33`}}>
              <div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚓ {lang==="fr"?"MARQUES SPÉCIALES — IDENTIFICATION":lang==="en"?"SPECIAL MARKS — IDENTIFICATION":"MARCAS ESPECIALES — IDENTIFICACIÓN"}</div>
              <SpecialMarksSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(10,138,108,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.teal,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.teal},${C.buoyGreen},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(10,138,108,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Système IALA</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 1":lang==="en"?"Lesson 1":"Lección 1"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(10,138,108,0.15)",border:`1px solid ${C.teal}55`,fontSize:14,color:C.teal,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.teal,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.teal},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(10,138,108,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 2 — FEUX & FORMES →":lang==="en"?"LESSON 2 — LIGHTS & SHAPES →":lang==="es"?"LECCIÓN 2 — LUCES Y FORMAS →":"LIÇÃO 2 — LUZES E FORMAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
