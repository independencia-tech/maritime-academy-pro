import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  bg0:"#03070f", bg1:"#060e1a", bg2:"#0a1628", bg3:"#0d1f3c",
  amber:"#ffb300", amber2:"#ffd54f",
  cyan:"#00e5ff", cyan2:"#80deea",
  steel:"#455a64", steel2:"#78909c", steel3:"#b0bec5",
  green:"#00e676", green2:"#69f0ae",
  red:"#ff1744", red2:"#ff5252",
  orange:"#ff6d00", orange2:"#ff9e40",
  blue:"#2979ff", blue2:"#82b1ff",
  purple:"#c084fc", purple2:"#e879f9",
  gold:"#c9922a", gold2:"#e8b94f",
  white:"#f0f4ff", muted:"rgba(176,190,197,0.7)", dim:"rgba(176,190,197,0.35)",
  border:"rgba(201,146,42,0.22)", borderC:"rgba(0,229,255,0.18)",
  // mooring specific
  headline:"#7eb8d4", sternline:"#6dbf8a", spring:"#e8b94f",
  breast:"#c084fc", fender:"#6dbf8a", bollard:"#94a3b8", cleat:"#c8a96e",
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

// ══════════════════════════════════════
// SVG 1 — SCHEMA AMARRAGE INTERACTIF
// ══════════════════════════════════════
function MooringSchemaSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [selected, setSelected] = useState(null);

  const lines = [
    { id:"headline", color:C.headline, emoji:"🔵",
      name:lbl("Amarre de tete (Head Line)","Head Line","Cabo de Proa","Cabo de Proa"),
      x1:60,y1:72,x2:28,y2:138,
      role:lbl("Retient la PROUE vers l'avant — empeche de cacher (deriver en arriere)",
        "Holds BOW forward — prevents sternway",
        "Retiene la PROA hacia adelante — impide caer (derivar hacia atras)",
        "Retém a PROA para a frente — impede de cacar (derivar para tras)"),
      pass:lbl("Premier cabo passe a l'accostage","First line passed when coming alongside","Primer cabo pasado al atracar","Primeiro cabo passado ao atracar") },
    { id:"sternline", color:C.sternline, emoji:"🟢",
      name:lbl("Amarre de poupe (Stern Line)","Stern Line","Cabo de Popa","Cabo de Popa"),
      x1:280,y1:72,x2:310,y2:138,
      role:lbl("Retient la POUPE vers l'arriere — empeche d'avancer",
        "Holds STERN aft — prevents headway",
        "Retiene la POPA hacia atras — impide avanzar",
        "Retém a POPA para tras — impede de avançar"),
      pass:lbl("Passe en 2e apres la tete","Passed 2nd after head line","Pasado en 2o despues de la proa","Passado em 2o apos a proa") },
    { id:"springfwd", color:C.spring, emoji:"🟡",
      name:lbl("Spring avant (Fwd Spring)","Forward Spring","Spring de Proa","Spring de Proa"),
      x1:70,y1:100,x2:240,y2:138,
      role:lbl("Oblique depuis la PROUE vers l'arriere au quai — empeche l'avance",
        "Diagonal from BOW aft to quay — prevents headway",
        "Diagonal desde la PROA hacia atras al muelle — impide el avance",
        "Diagonal da PROA para tras no cais — impede o avanco"),
      pass:lbl("Utilise aussi comme pivot a l'appareillage","Also used as pivot when departing","También usado como pivote al zarpar","Também usado como pivo ao zarpar") },
    { id:"springaft", color:C.spring, emoji:"🟡",
      name:lbl("Spring arriere (Aft Spring)","After Spring","Spring de Popa","Spring de Popa"),
      x1:270,y1:100,x2:100,y2:138,
      role:lbl("Oblique depuis la POUPE vers l'avant au quai — empeche la chute (recul)",
        "Diagonal from STERN forward to quay — prevents sternway",
        "Diagonal desde la POPA hacia adelante al muelle — impide la caida",
        "Diagonal da POPA para vante no cais — impede a caca"),
      pass:lbl("Pivote a l'appareillage — dernier largue","Pivot when departing — last to let go","Pivote al zarpar — ultimo en largar","Pivo ao zarpar — ultimo a largar") },
    { id:"breastfwd", color:C.breast, emoji:"🟣",
      name:lbl("Travers avant (Fwd Breast)","Fwd Breast Line","Través de Proa","Través de Proa"),
      x1:95,y1:125,x2:90,y2:138,
      role:lbl("PERPENDICULAIRE depuis l'avant — empeche le navire de s'eloigner lateralement du quai",
        "PERPENDICULAR from forward — prevents vessel ranging off quay laterally",
        "PERPENDICULAR desde la proa — impide que el buque se separe lateralmente del muelle",
        "PERPENDICULAR da proa — impede o navio de se afastar lateralmente do cais"),
      pass:lbl("Largue en 1er a l'appareillage","First to let go at departure","Primero en largar al zarpar","Primeiro a largar ao zarpar") },
    { id:"breastaft", color:C.breast, emoji:"🟣",
      name:lbl("Travers arriere (Aft Breast)","Aft Breast Line","Través de Popa","Través de Popa"),
      x1:245,y1:125,x2:250,y2:138,
      role:lbl("PERPENDICULAIRE depuis l'arriere — retient la poupe contre le quai",
        "PERPENDICULAR from aft — holds stern against quay",
        "PERPENDICULAR desde la popa — retiene la popa contra el muelle",
        "PERPENDICULAR da popa — retém a popa contra o cais"),
      pass:lbl("Largue en 2e a l'appareillage","Second to let go at departure","Segundo en largar al zarpar","Segundo a largar ao zarpar") },
  ];

  const sel = lines.find(l => l.id === selected);
  const W = 290; const H = 165;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        {/* eau */}
        <rect x={0} y={0} width={W} height={135} fill="#020d1a"/>
        {/* quai */}
        <rect x={0} y={135} width={W} height={30} fill={C.bg3} rx="2"/>
        <text x={10} y={150} fill={C.bollard} fontSize={7} fontFamily="'Cinzel',serif" letterSpacing="1">
          {lbl("QUAI","QUAY","MUELLE","CAIS")}
        </text>
        {/* bittes sur quai */}
        {[25,80,150,210,270].map(x=>(
          <rect key={x} x={x-5} y={128} width={10} height={9} rx={2} fill={C.bollard}/>
        ))}
        {/* navire */}
        <rect x={55} y={55} width={180} height={65} rx="8" fill={C.bg2} stroke={C.gold} strokeWidth="1.5"/>
        <polygon points="55,60 38,88 55,115" fill={C.bg2} stroke={C.gold} strokeWidth="1.5"/>
        <polygon points="235,60 252,88 235,115" fill={C.bg2} stroke={C.gold} strokeWidth="1.5"/>
        <text x={145} y={93} textAnchor="middle" fill={C.steel2} fontSize={8} fontFamily="'Cinzel',serif">VESSEL</text>
        {/* defenses */}
        {[90,145,200].map(x=>(
          <ellipse key={x} cx={x} cy={127} rx={6} ry={4} fill={C.fender} opacity={0.7}/>
        ))}
        {/* amarres */}
        {lines.map(l => {
          const isSel = selected===l.id;
          const isOther = selected && !isSel;
          return (
            <g key={l.id} style={{cursor:"pointer"}} onClick={()=>setSelected(selected===l.id?null:l.id)}>
              <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke={l.color} strokeWidth={isSel?3:1.5}
                strokeDasharray={isOther?"3,3":"none"} opacity={isOther?0.2:1}/>
              {/* label milieu */}
              {isSel && (
                <text x={(l.x1+l.x2)/2} y={(l.y1+l.y2)/2-4}
                  textAnchor="middle" fontSize="6" fill={l.color} fontWeight="800">
                  {l.emoji}
                </text>
              )}
            </g>
          );
        })}
        {/* legende boutons */}
        {lines.map((l,i) => {
          const bx = 4 + (i%3)*96; const by = H-18 + Math.floor(i/3)*10;
          return (
            <g key={l.id} style={{cursor:"pointer"}} onClick={()=>setSelected(selected===l.id?null:l.id)}>
              <circle cx={bx+4} cy={by+4} r={4} fill={l.color} opacity={selected===l.id?1:0.5}/>
              <text x={bx+10} y={by+7.5} fontSize="5.5" fill={selected===l.id?l.color:C.muted}>{l.name.split("(")[0].trim()}</text>
            </g>
          );
        })}
      </svg>
      {sel ? (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:14,
          background:`${sel.color}0e`,border:`1px solid ${sel.color}44`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
            <span style={{fontSize:18}}>{sel.emoji}</span>
            <span style={{fontSize:12,fontWeight:800,color:sel.color}}>{sel.name}</span>
          </div>
          <div style={{fontSize:10,color:C.white,marginBottom:4,lineHeight:1.5}}>▸ {sel.role}</div>
          <div style={{fontSize:9,color:C.muted,fontStyle:"italic"}}>💡 {sel.pass}</div>
        </div>
      ) : (
        <div style={{marginTop:8,padding:"7px 12px",borderRadius:10,
          background:"rgba(201,146,42,0.05)",border:`1px solid ${C.border}`,
          fontSize:10,color:C.steel3,textAlign:"center"}}>
          {lbl("Toucher une amarre pour son role","Tap a mooring line for its role","Tocar un cabo para su funcion","Tocar um cabo para a sua funcao")}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — EQUIPEMENTS D'AMARRAGE
// ══════════════════════════════════════
function MooringEquipSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [selected, setSelected] = useState(null);

  const equip = [
    { id:"bollard", icon:"⬛", color:C.bollard,
      name:lbl("Bitte d'amarrage","Bollard","Noray / Bolardo","Cabeco / Bolardo"),
      desc:lbl("Piece acier en T ou double-T fixee au quai. Recoit les gazas (boucles) des amarres. Resistance : 50-200 tonnes selon taille. Element principal cote quai.",
        "T-shaped steel fitting fixed to quay. Receives mooring line eyes (bights). Strength: 50-200 tonnes depending on size. Main quayside element.",
        "Pieza de acero en T fijada al muelle. Recibe las gazas de los cabos. Resistencia: 50-200 toneladas. Principal elemento del lado muelle.",
        "Peca de aco em T fixada no cais. Recebe as gazas dos cabos. Resistencia: 50-200 toneladas. Principal elemento do lado cais."),
      tip:lbl("Toujours passer la gaza par-dessous si une bitte est deja occupee — jamais par-dessus",
        "Always pass bight from underneath if bollard already in use — never from above",
        "Siempre pasar la gaza por debajo si el bolardo ya esta ocupado",
        "Sempre passar a gaza por baixo se o cabeco ja estiver ocupado") },
    { id:"cleat", icon:"🟫", color:C.cleat,
      name:lbl("Taquet / Bitte","Cleat","Cornamusa","Cunho / Taqueio"),
      desc:lbl("Piece metallique a deux cornes fixee sur le pont navire. Permet d'affourcher les amarres rapidement. Utilise pour les petits batiments et lignes legeres.",
        "Two-horned metal fitting on vessel deck. Allows lines to be made fast quickly. Used on small craft and light lines.",
        "Pieza metalica de dos cuernos en cubierta del buque. Permite amarrar cabos rapidamente. Usada en embarcaciones pequenas.",
        "Peca metalica de dois cornos no convés do navio. Permite amarrar cabos rapidamente. Usada em embarcacoes pequenas."),
      tip:lbl("Affourcher = 8 autour des cornes — jamais de demi-cles superposees en sens unique",
        "Make fast = figure-of-8 around horns — never stacked half-hitches in one direction",
        "Amarrar = ocho alrededor de los cuernos — nunca medias vueltas superpuestas",
        "Amarrar = oito em volta dos cornos — nunca meias voltas sobrepostas") },
    { id:"fairlead", icon:"🔷", color:C.cyan2,
      name:lbl("Chaumard","Fairlead","Guiacabos / Escobén","Guia-cabos / Escoem"),
      desc:lbl("Guide-cable fixe sur le pavois ou la lisse. Oriente et protege les amarres contre l'usure au passage dans le bord. Peut etre a rouleaux ou lisse.",
        "Cable guide on bulwark or rail. Directs and protects mooring lines from chafe through the side. Can be roller type or smooth.",
        "Guia de cabos en la borda o regala. Orienta y protege los cabos del rozamiento al pasar por el costado.",
        "Guia de cabos na amurada ou balaustrada. Orienta e protege os cabos do desgaste ao passar pelo costado."),
      tip:lbl("Inspecter regulierement l'usure des chaumards — roulement grince = remplacer avant rupture amarre",
        "Inspect fairlead rollers regularly — grinding bearing = replace before line failure",
        "Inspeccionar regularmente el desgaste de los guiacabos",
        "Inspecionar regularmente o desgaste dos guias-cabos") },
    { id:"fender", icon:"🟢", color:C.fender,
      name:lbl("Defense / Pare-battage","Fender","Defensa","Defensa"),
      desc:lbl("Coussin gonflable ou caoutchouc suspendu entre navire et quai. Absorbe les chocs et protege la coque. Dimensionnement selon taille navire. Verifier pression regulierement.",
        "Inflatable or rubber cushion between vessel and quay. Absorbs shocks and protects hull. Size by vessel size. Check pressure regularly.",
        "Cojin inflable o de goma entre buque y muelle. Absorbe choques y protege el casco. Tamano segun tama buque.",
        "Almofada insuflavel ou de borracha entre navio e cais. Absorve choques e protege o casco. Dimensionamento conforme navio."),
      tip:lbl("Nombre de defenses : au minimum 3 par bord pour grands navires — positionnement : plats de borde",
        "Number of fenders: minimum 3 per side on large vessels — position: parallel to hull",
        "Numero de defensas: minimo 3 por costado en grandes buques",
        "Numero de defensas: minimo 3 por costado em grandes navios") },
    { id:"winch", icon:"🟠", color:C.orange2,
      name:lbl("Treuil d'amarrage","Mooring Winch","Molinete de Amarre","Guincho de Amarracao"),
      desc:lbl("Dispositif motorise pour raidir/choquer les amarres. Grands navires : automatique avec tension constante (auto-tension). Evite les surcharges et les relachements.",
        "Motorised device for heaving/surging mooring lines. Large vessels: automatic with constant tension (auto-tension). Avoids overloads and slackening.",
        "Dispositivo motorizado para tensar/largar cabos. Grandes buques: automatico con tension constante. Evita sobrecargas y aflojamientos.",
        "Dispositivo motorizado para tesionar/largar cabos. Grandes navios: automatico com tensao constante. Evita sobrecargas e afrouxamentos."),
      tip:lbl("Auto-tension : le treuil adapte automatiquement la tension selon la maree — verification quotidienne du frein",
        "Auto-tension: winch automatically adjusts tension with tide — daily brake check",
        "Auto-tension: el guinche adapta automaticamente la tension segun la marea",
        "Auto-tension: o guincho adapta automaticamente a tensao com a mare") },
    { id:"heaving", icon:"🪢", color:C.gold2,
      name:lbl("Aussiere / Ligne de jet","Mooring Line / Heaving Line","Amarra / Guia","Amarra / Guia"),
      desc:lbl("Aussiere : amarre principale en polyester ou nylon (elastique) ou acier (resistance). Ligne de jet : cordage leger leste d'un sac de sable pour envoyer l'aussiere a terre.",
        "Mooring line: main line in polyester or nylon (elastic) or steel (strength). Heaving line: light line weighted with a monkey's fist to throw the mooring ashore.",
        "Amarra: cabo principal en poliester o nylon (elastico) o acero (resistencia). Guia: cabo ligero lastrado para enviar la amarra a tierra.",
        "Amarra: cabo principal em poliester ou nylon (elastico) ou aco (resistencia). Guia: cabo leve lastrado para enviar a amarra a terra."),
      tip:lbl("Polyester : bon compromis resistance/elasticite — JAMAIS de noeud sur une aussiere sous tension",
        "Polyester: good strength/elasticity balance — NEVER knot a mooring line under tension",
        "Poliester: buen equilibrio resistencia/elasticidad — NUNCA hacer un nudo en amarra bajo tension",
        "Poliester: bom equilibrio resistencia/elasticidade — NUNCA fazer no numa amarra sob tensao") },
  ];

  const sel = equip.find(e => e.id === selected);
  const W = 290; const H = 100;

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:8}}>
        {equip.map(e => (
          <button key={e.id} onClick={()=>setSelected(selected===e.id?null:e.id)}
            style={{padding:"8px 4px",background:selected===e.id?`${e.color}18`:`${e.color}06`,
              border:`1px solid ${selected===e.id?e.color:`${e.color}33`}`,
              borderRadius:10,cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:16,marginBottom:3}}>{e.icon}</div>
            <div style={{fontSize:7,color:selected===e.id?e.color:C.muted,fontWeight:selected===e.id?700:400,lineHeight:1.2}}>
              {e.name.split("/")[0].trim()}
            </div>
          </button>
        ))}
      </div>
      {sel ? (
        <div style={{padding:"10px 12px",borderRadius:14,
          background:`${sel.color}0e`,border:`1px solid ${sel.color}44`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
            <span style={{fontSize:18}}>{sel.icon}</span>
            <span style={{fontSize:12,fontWeight:800,color:sel.color}}>{sel.name}</span>
          </div>
          <div style={{fontSize:10,color:C.steel3,lineHeight:1.6,marginBottom:6}}>{sel.desc}</div>
          <div style={{padding:"5px 8px",borderRadius:7,
            background:"rgba(201,146,42,0.08)",border:`1px solid ${C.border}`,
            fontSize:9,color:C.gold2}}>
            💡 {sel.tip}
          </div>
        </div>
      ) : (
        <div style={{padding:"8px 12px",borderRadius:10,
          background:"rgba(201,146,42,0.05)",border:`1px solid ${C.border}`,
          fontSize:10,color:C.steel3,textAlign:"center"}}>
          {lbl("Toucher un equipement pour les details","Tap equipment for details","Tocar un equipo para detalles","Tocar um equipamento para detalhes")}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — SEQUENCE APPAREILLAGE
// ══════════════════════════════════════
function DepartureSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [step, setStep] = useState(0);

  const steps = {
    fr:[
      {n:1,action:"Verifier machines pretes, gouvernail, helices libres",line:null,color:C.steel2,icon:"⚙️"},
      {n:2,action:"Larguer traversieres avant et arriere",line:lbl("Traversieres","Breast Lines","Traveses","Traveses"),color:C.breast,icon:"🟣"},
      {n:3,action:"Larguer amarre de tete",line:lbl("Amarre de tete","Head Line","Cabo de Proa","Cabo de Proa"),color:C.headline,icon:"🔵"},
      {n:4,action:"Larguer amarre de poupe",line:lbl("Amarre de poupe","Stern Line","Cabo de Popa","Cabo de Popa"),color:C.sternline,icon:"🟢"},
      {n:5,action:"Maintenir spring arriere — Machine avant — Pivot proa dehors",line:lbl("Spring AR = PIVOT","Aft Spring = PIVOT","Spring Popa = PIVOTE","Spring Popa = PIVO"),color:C.spring,icon:"🟡"},
      {n:6,action:"Larguer spring arriere quand la proue est degagee",line:lbl("Spring AR — LARGUE","Aft Spring — LET GO","Spring Popa — LARGAR","Spring Popa — LARGAR"),color:C.spring,icon:"🟡"},
      {n:7,action:"Larguer spring avant — Navire libre — Machine selon besoin",line:lbl("Spring AV — LARGUE","Fwd Spring — LET GO","Spring Proa — LARGAR","Spring Proa — LARGAR"),color:C.spring,icon:"✅"},
    ],
    en:[
      {n:1,action:"Check engines ready, rudder, propellers clear",line:null,color:C.steel2,icon:"⚙️"},
      {n:2,action:"Let go forward and aft breast lines",line:"Breast Lines",color:C.breast,icon:"🟣"},
      {n:3,action:"Let go head line",line:"Head Line",color:C.headline,icon:"🔵"},
      {n:4,action:"Let go stern line",line:"Stern Line",color:C.sternline,icon:"🟢"},
      {n:5,action:"Hold aft spring — Ahead engine — Swing bow out",line:"Aft Spring = PIVOT",color:C.spring,icon:"🟡"},
      {n:6,action:"Let go aft spring when bow is clear",line:"Aft Spring — LET GO",color:C.spring,icon:"🟡"},
      {n:7,action:"Let go fwd spring — Vessel free — Engine as required",line:"Fwd Spring — LET GO",color:C.spring,icon:"✅"},
    ],
    es:[
      {n:1,action:"Verificar maquinas listas, timon, helices libres",line:null,color:C.steel2,icon:"⚙️"},
      {n:2,action:"Largar traveses de proa y popa",line:"Traveses",color:C.breast,icon:"🟣"},
      {n:3,action:"Largar cabo de proa",line:"Cabo de Proa",color:C.headline,icon:"🔵"},
      {n:4,action:"Largar cabo de popa",line:"Cabo de Popa",color:C.sternline,icon:"🟢"},
      {n:5,action:"Mantener spring de popa — Maquina avante — Girar proa afuera",line:"Spring Popa = PIVOTE",color:C.spring,icon:"🟡"},
      {n:6,action:"Largar spring de popa cuando la proa este despejada",line:"Spring Popa — LARGAR",color:C.spring,icon:"🟡"},
      {n:7,action:"Largar spring de proa — Buque libre — Maquina segun necesidad",line:"Spring Proa — LARGAR",color:C.spring,icon:"✅"},
    ],
    pt:[
      {n:1,action:"Verificar maquinas prontas, leme, helices livres",line:null,color:C.steel2,icon:"⚙️"},
      {n:2,action:"Largar traveses de proa e popa",line:"Traveses",color:C.breast,icon:"🟣"},
      {n:3,action:"Largar cabo de proa",line:"Cabo de Proa",color:C.headline,icon:"🔵"},
      {n:4,action:"Largar cabo de popa",line:"Cabo de Popa",color:C.sternline,icon:"🟢"},
      {n:5,action:"Manter spring de popa — Maquina avante — Girar proa para fora",line:"Spring Popa = PIVO",color:C.spring,icon:"🟡"},
      {n:6,action:"Largar spring de popa quando a proa estiver desimpedida",line:"Spring Popa — LARGAR",color:C.spring,icon:"🟡"},
      {n:7,action:"Largar spring de proa — Navio livre — Maquina conforme necessario",line:"Spring Proa — LARGAR",color:C.spring,icon:"✅"},
    ],
  };

  const stList = steps[lang]||steps.fr;
  const cur = stList[step];
  const W = 290; const H = 28;

  return (
    <div>
      {/* barre progress */}
      <div style={{display:"flex",gap:3,marginBottom:8}}>
        {stList.map((s,i) => (
          <div key={i} onClick={()=>setStep(i)}
            style={{flex:1,height:6,borderRadius:3,cursor:"pointer",
              background:i<=step?cur.color:"rgba(255,255,255,0.08)",
              transition:"background 0.2s"}}>
          </div>
        ))}
      </div>
      {/* etape courante */}
      <div style={{padding:"12px 14px",borderRadius:14,marginBottom:10,
        background:`${cur.color}12`,border:`1px solid ${cur.color}44`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
          <div style={{width:28,height:28,borderRadius:8,
            background:cur.color,display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:9,fontWeight:800,color:C.bg0,fontFamily:"Courier New",flexShrink:0}}>
            {cur.n}/7
          </div>
          <span style={{fontSize:14}}>{cur.icon}</span>
          <span style={{fontSize:11,fontWeight:700,color:cur.color,letterSpacing:0.5,flex:1}}>{cur.action}</span>
        </div>
        {cur.line && (
          <div style={{padding:"4px 8px",borderRadius:6,
            background:`${cur.color}18`,
            fontSize:9,color:cur.color,fontWeight:800,fontFamily:"Courier New"}}>
            ▸ {cur.line}
          </div>
        )}
      </div>
      {/* navigation */}
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))}
          style={{flex:1,padding:"9px 0",background:"rgba(69,90,100,0.18)",
            border:`1px solid ${C.steel}44`,borderRadius:10,
            color:C.muted,fontSize:11,cursor:"pointer"}}>
          ← {lbl("Precedent","Previous","Anterior","Anterior")}
        </button>
        <button onClick={()=>setStep(s=>Math.min(6,s+1))}
          style={{flex:1,padding:"9px 0",
            background:step<6?"rgba(201,146,42,0.15)":"rgba(0,230,118,0.1)",
            border:`1px solid ${step<6?C.amber:C.green}44`,
            borderRadius:10,color:step<6?C.amber:C.green,fontSize:11,cursor:"pointer"}}>
          {step<6?lbl("Suivant","Next","Siguiente","Proximo")+" →":lbl("LIBRE !","FREE!","LIBRE!","LIVRE!")}
        </button>
        <button onClick={()=>setStep(0)}
          style={{padding:"9px 12px",background:"rgba(69,90,100,0.18)",
            border:`1px solid ${C.steel}44`,borderRadius:10,
            color:C.muted,fontSize:11,cursor:"pointer"}}>↺</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — DIALOGUES RADIO ACCOSTAGE + APPAREILLAGE
// ══════════════════════════════════════
function RadioDialogueSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [mode, setMode] = useState("berthing"); // berthing | departure

  const dialogues = {
    berthing:{
      fr:[
        {who:"🧭 PASSERELLE",msg:"Equipage de pont en place. Defenses a poste. Remorqueur largue. Approche babord au quai."},
        {who:"⚓ PONT AV",msg:"Pont avant pret — treuil en marche — ligne de jet prete."},
        {who:"⚓ PONT AR",msg:"Pont arriere pret — traversiere de poupe paree."},
        {who:"🧭 PASSERELLE",msg:"Envoyez la tete ! Passez la tete sur la bitte N°3."},
        {who:"⚓ PONT AV",msg:"Tete a bord — en cours de passage — tete sur bitte N°3. Commence a raidir."},
        {who:"🧭 PASSERELLE",msg:"Bien. Passez le spring avant et la traversiere avant."},
        {who:"⚓ PONT AV",msg:"Spring avant sur N°4 — traversiere avant radie."},
        {who:"🧭 PASSERELLE",msg:"Pont arriere : passez la poupe et le spring arriere."},
        {who:"⚓ PONT AR",msg:"Poupe et spring arriere sur bittes. Traversiere arriere radie."},
        {who:"🧭 PASSERELLE",msg:"Bien. Raidiссez toutes les amarres. Machine stop."},
        {who:"⚓ PONT AV",msg:"Toutes amarres avant tendues — affourches sur bittes."},
        {who:"⚓ PONT AR",msg:"Toutes amarres arriere tendues. Navire amarré tribord."},
      ],
      en:[
        {who:"🧭 BRIDGE",msg:"Deck crew in position. Fenders rigged. Tug let go. Approaching port side to quay."},
        {who:"⚓ FWD DECK",msg:"Fwd deck ready — winch running — heaving line ready."},
        {who:"⚓ AFT DECK",msg:"Aft deck ready — stern breast line ready."},
        {who:"🧭 BRIDGE",msg:"Send the head line! Pass head line to bollard No.3."},
        {who:"⚓ FWD DECK",msg:"Head line out — being passed ashore — on bollard No.3. Heaving in."},
        {who:"🧭 BRIDGE",msg:"Good. Pass fwd spring and fwd breast."},
        {who:"⚓ FWD DECK",msg:"Fwd spring on No.4 — fwd breast hauled taut."},
        {who:"🧭 BRIDGE",msg:"Aft deck: pass stern line and aft spring."},
        {who:"⚓ AFT DECK",msg:"Stern line and aft spring on bollards. Aft breast hauled taut."},
        {who:"🧭 BRIDGE",msg:"Good. Heave all lines. Stop engine."},
        {who:"⚓ FWD DECK",msg:"All fwd lines taut — made fast on bollards."},
        {who:"⚓ AFT DECK",msg:"All aft lines taut. Vessel fast port side to."},
      ],
      es:[
        {who:"🧭 PUENTE",msg:"Tripulacion en cubierta. Defensas colocadas. Remolcador suelto. Aproximacion por babor al muelle."},
        {who:"⚓ PROA",msg:"Proa lista — molinete en marcha — guia lista."},
        {who:"⚓ POPA",msg:"Popa lista — través de popa listo."},
        {who:"🧭 PUENTE",msg:"Envien el cabo de proa! Pasen la proa al bolardo N°3."},
        {who:"⚓ PROA",msg:"Cabo de proa fuera — pasando — en bolardo N°3. Virando."},
        {who:"🧭 PUENTE",msg:"Bien. Pasen spring de proa y través de proa."},
        {who:"⚓ PROA",msg:"Spring proa en N°4 — través proa tesado."},
        {who:"🧭 PUENTE",msg:"Popa: pasen cabo de popa y spring de popa."},
        {who:"⚓ POPA",msg:"Popa y spring popa en bolardos. Través popa tesado."},
        {who:"🧭 PUENTE",msg:"Bien. Tesen todos los cabos. Para maquina."},
        {who:"⚓ PROA",msg:"Todos cabos proa tesados — afirmados en bolardos."},
        {who:"⚓ POPA",msg:"Todos cabos popa tesados. Buque amarrado por babor."},
      ],
      pt:[
        {who:"🧭 PONTE",msg:"Tripulacao em convés. Defensas colocadas. Rebocador largado. Aproximacao por baborda ao cais."},
        {who:"⚓ PROA",msg:"Proa pronta — guincho em marcha — guia pronta."},
        {who:"⚓ POPA",msg:"Popa pronta — través de popa pronto."},
        {who:"🧭 PONTE",msg:"Enviem o cabo de proa! Passem a proa ao cabeco N°3."},
        {who:"⚓ PROA",msg:"Cabo de proa fora — a passar — no cabeco N°3. A virar."},
        {who:"🧭 PONTE",msg:"Bem. Passem spring de proa e través de proa."},
        {who:"⚓ PROA",msg:"Spring proa no N°4 — través proa tesado."},
        {who:"🧭 PONTE",msg:"Popa: passem cabo de popa e spring de popa."},
        {who:"⚓ POPA",msg:"Popa e spring popa nos cabecoes. Través popa tesado."},
        {who:"🧭 PONTE",msg:"Bem. Tesem todos os cabos. Para maquina."},
        {who:"⚓ PROA",msg:"Todos cabos proa tesados — amarrados nos cabecoes."},
        {who:"⚓ POPA",msg:"Todos cabos popa tesados. Navio amarrado a bombordo."},
      ],
    },
    departure:{
      fr:[
        {who:"🧭 PASSERELLE",msg:"Machine prete. Gouvernail a zero. Larguer traversieres avant et arriere."},
        {who:"⚓ PONT AV",msg:"Traversiere avant largee."},
        {who:"⚓ PONT AR",msg:"Traversiere arriere largee."},
        {who:"🧭 PASSERELLE",msg:"Larguer la tete."},
        {who:"⚓ PONT AV",msg:"Tete largee — a bord."},
        {who:"🧭 PASSERELLE",msg:"Larguer la poupe."},
        {who:"⚓ PONT AR",msg:"Poupe largee — a bord."},
        {who:"🧭 PASSERELLE",msg:"Gardez le spring arriere — machine avant lente."},
        {who:"⚓ PONT AV",msg:"Spring avant largue."},
        {who:"⚓ PONT AR",msg:"Spring arriere tenu — proa qui part dehors."},
        {who:"🧭 PASSERELLE",msg:"Bien. Larguer le spring arriere !"},
        {who:"⚓ PONT AR",msg:"Spring arriere largue — a bord — navire libre."},
        {who:"🧭 PASSERELLE",msg:"Recu. Machine selon besoin. Bonne veille."},
      ],
      en:[
        {who:"🧭 BRIDGE",msg:"Engine ready. Rudder amidships. Let go breast lines fore and aft."},
        {who:"⚓ FWD DECK",msg:"Fwd breast let go."},
        {who:"⚓ AFT DECK",msg:"Aft breast let go."},
        {who:"🧭 BRIDGE",msg:"Let go head line."},
        {who:"⚓ FWD DECK",msg:"Head line let go — inboard."},
        {who:"🧭 BRIDGE",msg:"Let go stern line."},
        {who:"⚓ AFT DECK",msg:"Stern line let go — inboard."},
        {who:"🧭 BRIDGE",msg:"Hold aft spring — slow ahead engine."},
        {who:"⚓ FWD DECK",msg:"Fwd spring let go."},
        {who:"⚓ AFT DECK",msg:"Aft spring holding — bow swinging out."},
        {who:"🧭 BRIDGE",msg:"Good. Let go aft spring!"},
        {who:"⚓ AFT DECK",msg:"Aft spring let go — inboard — vessel clear."},
        {who:"🧭 BRIDGE",msg:"Received. Engine as required. Good watch."},
      ],
      es:[
        {who:"🧭 PUENTE",msg:"Maquina lista. Timon al cero. Largar traveses de proa y popa."},
        {who:"⚓ PROA",msg:"Través de proa largado."},
        {who:"⚓ POPA",msg:"Través de popa largado."},
        {who:"🧭 PUENTE",msg:"Largar cabo de proa."},
        {who:"⚓ PROA",msg:"Cabo de proa largado — a bordo."},
        {who:"🧭 PUENTE",msg:"Largar cabo de popa."},
        {who:"⚓ POPA",msg:"Cabo de popa largado — a bordo."},
        {who:"🧭 PUENTE",msg:"Mantener spring de popa — maquina avante lento."},
        {who:"⚓ PROA",msg:"Spring de proa largado."},
        {who:"⚓ POPA",msg:"Spring de popa tenido — proa saliendo afuera."},
        {who:"🧭 PUENTE",msg:"Bien. Largar spring de popa !"},
        {who:"⚓ POPA",msg:"Spring de popa largado — a bordo — buque libre."},
        {who:"🧭 PUENTE",msg:"Recibido. Maquina segun necesidad. Buena guardia."},
      ],
      pt:[
        {who:"🧭 PONTE",msg:"Maquina pronta. Leme a zero. Largar traveses de proa e popa."},
        {who:"⚓ PROA",msg:"Través de proa largado."},
        {who:"⚓ POPA",msg:"Través de popa largado."},
        {who:"🧭 PONTE",msg:"Largar cabo de proa."},
        {who:"⚓ PROA",msg:"Cabo de proa largado — a bordo."},
        {who:"🧭 PONTE",msg:"Largar cabo de popa."},
        {who:"⚓ POPA",msg:"Cabo de popa largado — a bordo."},
        {who:"🧭 PONTE",msg:"Manter spring de popa — maquina avante lento."},
        {who:"⚓ PROA",msg:"Spring de proa largado."},
        {who:"⚓ POPA",msg:"Spring de popa mantido — proa a sair."},
        {who:"🧭 PONTE",msg:"Bem. Largar spring de popa!"},
        {who:"⚓ POPA",msg:"Spring de popa largado — a bordo — navio livre."},
        {who:"🧭 PONTE",msg:"Recebido. Maquina conforme necessario. Boa vigia."},
      ],
    },
  };

  const rad = dialogues[mode][lang] || dialogues[mode].fr;

  return (
    <div>
      {/* switch */}
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        <button onClick={()=>setMode("berthing")}
          style={{flex:1,padding:"8px 0",
            background:mode==="berthing"?"rgba(0,230,118,0.15)":"transparent",
            border:`1px solid ${mode==="berthing"?C.green:"rgba(255,255,255,0.1)"}`,
            borderRadius:10,color:mode==="berthing"?C.green:C.muted,
            fontSize:11,cursor:"pointer",fontWeight:mode==="berthing"?700:400}}>
          🚢 {lbl("Accostage","Berthing","Atraque","Atracacao")}
        </button>
        <button onClick={()=>setMode("departure")}
          style={{flex:1,padding:"8px 0",
            background:mode==="departure"?"rgba(255,179,0,0.15)":"transparent",
            border:`1px solid ${mode==="departure"?C.amber:"rgba(255,255,255,0.1)"}`,
            borderRadius:10,color:mode==="departure"?C.amber:C.muted,
            fontSize:11,cursor:"pointer",fontWeight:mode==="departure"?700:400}}>
          ⚓ {lbl("Appareillage","Departure","Salida","Partida")}
        </button>
      </div>
      <div style={{background:C.bg1,borderRadius:12,padding:"10px 12px",maxHeight:280,overflow:"auto"}}>
        {rad.map((line,i) => {
          const isBridge = line.who.includes("PASSERELLE")||line.who.includes("BRIDGE")||line.who.includes("PUENTE")||line.who.includes("PONTE");
          const isFwd = line.who.includes("AV")||line.who.includes("FWD")||line.who.includes("PROA");
          const lineColor = isBridge ? C.cyan2 : isFwd ? C.gold2 : C.green2;
          return (
            <div key={i} style={{marginBottom:8,
              display:"flex",flexDirection:"column",
              alignItems:isBridge?"flex-start":"flex-end"}}>
              <div style={{fontSize:8,color:lineColor,fontWeight:700,marginBottom:2}}>
                {line.who}
              </div>
              <div style={{maxWidth:"88%",padding:"6px 10px",borderRadius:10,
                background:isBridge?"rgba(0,229,255,0.07)":isFwd?"rgba(201,146,42,0.08)":"rgba(0,230,118,0.07)",
                border:`1px solid ${isBridge?C.borderC:isFwd?C.border:"rgba(0,230,118,0.2)"}`,
                fontSize:10,color:C.white,lineHeight:1.5}}>
                {line.msg}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);

  const qs={
    fr:[
      {id:"q1",q:"Quel cabo empèche le navire de s'éloigner latéralement du quai ?\n(Repondre : traversiere, spring ou amarre de tete)"},
      {id:"q2",q:"Dans quel ordre largue-t-on les amarres a l'appareillage ? Quel cabo reste en dernier ?\n(Repondre : traversieres d'abord puis... spring...)"},
      {id:"q3",q:"Quel cabo utilise-t-on comme PIVOT a l'appareillage ?\n(Repondre : spring avant ou spring arriere)"},
      {id:"q4",q:"Qu'est-ce que l'amarrage Med-Moor (Mediterranéen) ?\n(Repondre en 1 phrase)"},
      {id:"q5",q:"Quel est le premier cabo passé a l'accostage ?\n(Repondre : amarre de tete, spring ou traversiere)"},
    ],
    en:[
      {id:"q1",q:"Which line prevents the vessel from ranging off the quay laterally?\n(Answer: breast line, spring or head line)"},
      {id:"q2",q:"In what order are lines let go at departure? Which line stays last?\n(Answer: breast lines first then... spring...)"},
      {id:"q3",q:"Which line is used as a PIVOT when departing?\n(Answer: forward spring or aft spring)"},
      {id:"q4",q:"What is Med-Moor (Mediterranean mooring)?\n(Answer in 1 sentence)"},
      {id:"q5",q:"Which is the first line passed when coming alongside?\n(Answer: head line, spring or breast line)"},
    ],
    es:[
      {id:"q1",q:"?Que cabo impide que el buque se separe lateralmente del muelle?\n(Responder: través, spring o cabo de proa)"},
      {id:"q2",q:"?En que orden se largan los cabos al zarpar? ?Que cabo queda el ultimo?\n(Responder: traveses primero luego... spring...)"},
      {id:"q3",q:"?Que cabo se usa como PIVOTE al zarpar?\n(Responder: spring de proa o spring de popa)"},
      {id:"q4",q:"?Que es el amarre mediterraneo (Med-Moor)?\n(Responder en 1 frase)"},
      {id:"q5",q:"?Cual es el primer cabo pasado al atracar?\n(Responder: cabo de proa, spring o través)"},
    ],
    pt:[
      {id:"q1",q:"Que cabo impede o navio de se afastar lateralmente do cais?\n(Responder: través, spring ou cabo de proa)"},
      {id:"q2",q:"Em que ordem se largam os cabos ao zarpar? Que cabo fica por ultimo?\n(Responder: traveses primeiro depois... spring...)"},
      {id:"q3",q:"Que cabo e usado como PIVO ao zarpar?\n(Responder: spring de proa ou spring de popa)"},
      {id:"q4",q:"O que e a amarracao mediterranea (Med-Moor)?\n(Responder em 1 frase)"},
      {id:"q5",q:"Qual e o primeiro cabo passado ao atracar?\n(Responder: cabo de proa, spring ou través)"},
    ],
  };

  const chk=(id,val)=>{
    const v=val.trim().toLowerCase().replace(/[\s\-]/g,"");
    if(id==="q1") return v.includes("travers")||v.includes("breast");
    if(id==="q2") return v.includes("spring");
    if(id==="q3") return v.includes("arriere")||v.includes("aft")||v.includes("popa");
    if(id==="q4") return v.includes("ancre")||v.includes("anchor")||v.includes("poupe")||v.includes("stern")||v.includes("popa");
    if(id==="q5") return v.includes("tete")||v.includes("head")||v.includes("proa");
    return false;
  };

  const corrKey={
    fr:{q1:"Traversiere (breast line)",q2:"Traversieres d'abord, spring arriere en dernier (pivot)",q3:"Spring arriere",q4:"Ancre par l'avant, poupe au quai",q5:"Amarre de tete (head line)"},
    en:{q1:"Breast line",q2:"Breast lines first, aft spring last (pivot)",q3:"Aft spring",q4:"Anchor forward, stern to quay",q5:"Head line"},
    es:{q1:"Través (breast line)",q2:"Traveses primero, spring de popa el ultimo (pivote)",q3:"Spring de popa",q4:"Ancla por la proa, popa al muelle",q5:"Cabo de proa (head line)"},
    pt:{q1:"Través (breast line)",q2:"Traveses primeiro, spring de popa por ultimo (pivo)",q3:"Spring de popa",q4:"Ancora pela proa, popa ao cais",q5:"Cabo de proa (head line)"},
  };

  const expl={
    fr:"OK Q1: Traversiere — perpendiculaire au quai — empeche le navire de s'eloigner lateralement\nOK Q2: Traversieres d'abord (les moins utiles), tete, poupe, puis springs — spring arriere reste en dernier comme pivot\nOK Q3: Spring arriere — la machine avant fait pivoter la proue vers le large en gardant la poupe au quai\nOK Q4: Ancre mouille par l'avant, navire recule, poupe au quai — utilise quand l'espace est limite\nOK Q5: Amarre de tete — elle retient la proue et stabilise le navire pour passer les autres amarres",
    en:"OK Q1: Breast line — perpendicular to quay — prevents vessel ranging off laterally\nOK Q2: Breast lines first (least useful), head, stern, then springs — aft spring stays last as pivot\nOK Q3: Aft spring — ahead engine swings the bow out while holding stern to quay\nOK Q4: Anchor dropped forward, vessel backs in, stern to quay — used when space is limited\nOK Q5: Head line — holds bow and stabilises vessel to pass other lines",
    es:"OK Q1: Través — perpendicular al muelle — impide que el buque se separe lateralmente\nOK Q2: Traveses primero (menos utiles), proa, popa, luego springs — spring de popa queda el ultimo como pivote\nOK Q3: Spring de popa — maquina avante hace girar la proa hacia fuera mientras retiene la popa al muelle\nOK Q4: Ancla fondeada por la proa, buque recua, popa al muelle — cuando el espacio es limitado\nOK Q5: Cabo de proa — retiene la proa y estabiliza el buque para pasar los otros cabos",
    pt:"OK Q1: Través — perpendicular ao cais — impede o navio de se afastar lateralmente\nOK Q2: Traveses primeiro (menos uteis), proa, popa, depois springs — spring de popa fica por ultimo como pivo\nOK Q3: Spring de popa — maquina avante faz girar a proa para fora enquanto retém a popa ao cais\nOK Q4: Ancora fundeada pela proa, navio recua, popa ao cais — quando o espaco e limitado\nOK Q5: Cabo de proa — retém a proa e estabiliza o navio para passar os outros cabos",
  };

  const list=qs[lang]||qs.fr;
  const ck=corrKey[lang]||corrKey.fr;

  return (
    <div>
      <div style={{padding:"10px 14px",borderRadius:13,marginBottom:14,
        background:"rgba(201,146,42,0.07)",border:`1px solid ${C.border}`,
        fontSize:11,color:C.gold2,lineHeight:1.7}}>
        {lbl("Rappels: Traversiere=lateral | Spring arriere=pivot | Tete=1er cabo | Med-Moor=ancre+poupe",
          "Key: Breast=lateral | Aft spring=pivot | Head=1st line | Med-Moor=anchor+stern",
          "Clave: Través=lateral | Spring popa=pivote | Proa=1er cabo | Med-Moor=ancla+popa",
          "Chave: Través=lateral | Spring popa=pivo | Proa=1o cabo | Med-Moor=ancora+popa")}
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

function QuestionBank({ lang }) {
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [started,setStarted]=useState(false);
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);

  const qs=[
    {q:lbl("Quel est le role precis d'une traversiere (breast line) ?","What is the precise role of a breast line?","?Cual es el papel preciso de un través?","Qual e o papel preciso de um través?"),
      opts:[lbl("Empecher l'avance","Prevent headway","Impedir el avance","Impedir o avanco"),lbl("Retenir le navire perpendiculairement au quai — empeche l'ecartement lateral","Hold vessel perpendicular to quay — prevents lateral ranging off","Retener el buque perpendicularmente al muelle — impide la separacion lateral","Reter o navio perpendicularmente ao cais — impede o afastamento lateral"),lbl("Empecher la chute","Prevent sternway","Impedir la caida","Impedir a caca"),lbl("Guidage de la proue","Bow guidance","Guia de la proa","Guia da proa")],
      ans:1,expl:lbl("La traversiere est perpendiculaire au quai (environ 90 degres). Son unique role est d'empecher le navire de s'eloigner lateralement du quai. Elle ne controle pas le mouvement longitudinal (avance/recul). A l'appareillage, c'est la premiere largue car son role est le moins critique.","The breast line is perpendicular to the quay (about 90 degrees). Its sole role is to prevent the vessel from ranging off laterally. It does not control longitudinal movement (ahead/astern). At departure, it is let go first as its role is least critical.","El través es perpendicular al muelle (aprox. 90 grados). Su unico papel es impedir que el buque se separe lateralmente. No controla el movimiento longitudinal. Al zarpar, es el primero en largarse.","O través e perpendicular ao cais (aprox. 90 graus). Seu unico papel e impedir que o navio se afaste lateralmente. Nao controla o movimento longitudinal. Ao zarpar, e o primeiro a largar.")},
    {q:lbl("Quelle est la difference entre un spring avant et un spring arriere ?","What is the difference between a forward and aft spring?","?Cual es la diferencia entre un spring de proa y un spring de popa?","Qual e a diferenca entre um spring de proa e um spring de popa?"),
      opts:[lbl("Synonymes","Synonyms","Sinonimos","Sinonimos"),lbl("Spring AV (de proue vers l'arriere) empeche l'avance — Spring AR (de poupe vers l'avant) empeche la chute","Fwd spring (bow to aft) prevents headway — Aft spring (stern to forward) prevents sternway","Spring proa (de proa hacia popa) impide el avance — Spring popa (de popa hacia proa) impide la caida","Spring proa (da proa para tras) impede o avanco — Spring popa (da popa para vante) impede a caca"),lbl("Spring AV empeche la chute — Spring AR empeche l'avance","Fwd spring prevents sternway — Aft spring prevents headway","Spring proa impide la caida — Spring popa impide el avance","Spring proa impede a caca — Spring popa impede o avanco"),lbl("Les springs controlent le mouvement lateral","Springs control lateral movement","Los springs controlan el movimiento lateral","Os springs controlam o movimento lateral")],
      ans:1,expl:lbl("Spring avant : part de la proue vers l'arriere au quai — cree une resistance a l'avance. Spring arriere : part de la poupe vers l'avant au quai — cree une resistance a la chute (recul). Les springs sont obliques (30-45 degres) et controlent le mouvement longitudinal — complementaires des traversieres qui controlent le mouvement lateral.","Forward spring: from bow aft to quay — resists headway. Aft spring: from stern forward to quay — resists sternway. Springs are diagonal (30-45 degrees) and control longitudinal movement — complementary to breast lines which control lateral movement.","Spring proa: de la proa hacia atras al muelle — resiste el avance. Spring popa: de la popa hacia adelante — resiste la caida. Los springs son oblicuos y controlan el movimiento longitudinal.","Spring proa: da proa para tras no cais — resiste o avanco. Spring popa: da popa para vante — resiste a caca. Os springs sao obliquos e controlam o movimento longitudinal.")},
    {q:lbl("Pourquoi largue-t-on les traversieres en premier a l'appareillage ?","Why are breast lines let go first at departure?","?Por que se largan los traveses primero al zarpar?","Por que se largam os traveses primeiro ao zarpar?"),
      opts:[lbl("Parce qu'elles sont les plus courtes","Because they are shortest","Porque son los mas cortos","Porque sao os mais curtos"),lbl("Elles ne controlent que le mouvement lateral — les springs maintiennent la securite longitudinale","They only control lateral movement — springs maintain longitudinal safety","Solo controlan el movimiento lateral — los springs mantienen la seguridad longitudinal","So controlam o movimento lateral — os springs mantem a seguranca longitudinal"),lbl("Elles sont les plus usees","They are most worn","Son las mas desgastadas","Sao as mais desgastadas"),lbl("Le capitaine decide de l'ordre","Captain decides the order","El capitan decide el orden","O capitao decide a ordem")],
      ans:1,expl:lbl("Les traversieres sont largues en premier car elles ne controlent que l'ecartement lateral. En gardant les springs et les amarres de tete/poupe, le navire reste longitudinalement secuqise. Les springs (et plus tard l'un d'eux comme pivot) controlent l'avance et la chute pendant toute la manoeuvre d'appareillage.","Breast lines are let go first because they only control lateral ranging. By keeping springs and head/stern lines, the vessel remains longitudinally secure. Springs (and later one as pivot) control headway and sternway throughout the departure maneuver.","Los traveses se largan primero porque solo controlan la separacion lateral. Los springs mantienen la seguridad longitudinal durante toda la maniobra.","Os traveses largam-se primeiro porque so controlam o afastamento lateral. Os springs mantem a seguranca longitudinal durante toda a manobra.")},
    {q:lbl("Comment utilise-t-on le spring arriere comme pivot a l'appareillage ?","How is the aft spring used as pivot at departure?","?Como se usa el spring de popa como pivote al zarpar?","Como se usa o spring de popa como pivo ao zarpar?"),
      opts:[lbl("On le raccourcit","Shorten it","Se acorta","Encurta-se"),lbl("Machine avant tenue — spring AR tenu — proue pivote vers le large — largue quand proue degagee","Ahead engine held — aft spring held — bow swings to seaward — let go when bow clear","Maquina avante contenida — spring popa tenido — proa gira hacia fuera — largar cuando proa despejada","Maquina avante contida — spring popa mantido — proa gira para fora — largar quando proa livre"),lbl("On l'amarre sur une autre bitte","Make fast to another bollard","Se afirma a otro bolardo","Amarra-se a outro cabeco"),lbl("Le remorqueur le tient","Tug holds it","El remolcador lo sujeta","O rebocador o segura")],
      ans:1,expl:lbl("Technique du pivot au spring arriere : (1) Toutes amarres largue sauf spring AR. (2) Machine avant lente. (3) Le navire ne peut pas avancer (spring AR en tension). (4) La poupe est retenue au quai comme pivot. (5) La proue pivote vers le large. (6) Quand la proue est degagee du quai : 'Larguer spring AR !' (7) Navire libre — manoeuvrer.","Aft spring pivot technique: (1) All lines let go except aft spring. (2) Slow ahead engine. (3) Vessel cannot go ahead (aft spring in tension). (4) Stern held to quay as pivot. (5) Bow swings to seaward. (6) When bow is clear of quay: 'Let go aft spring!' (7) Vessel free — maneuver.","Tecnica del pivote con spring de popa: (1) Todos los cabos largados excepto spring popa. (2) Maquina avante lenta. (3) El buque no puede avanzar. (4) La popa queda como pivote. (5) La proa gira hacia fuera. (6) Cuando la proa este despejada: largar spring popa.","Tecnica do pivo com spring de popa: (1) Todos os cabos largados exceto spring popa. (2) Maquina avante lenta. (3) O navio nao pode avançar. (4) A popa fica como pivo. (5) A proa gira para fora. (6) Quando proa livre: largar spring popa.")},
    {q:lbl("Qu'est-ce que l'amarrage Mediterranean (Med-Moor) ?","What is Mediterranean mooring (Med-Moor)?","?Que es el amarre mediterraneo (Med-Moor)?","O que e a amarracao mediterranea (Med-Moor)?"),
      opts:[lbl("Amarrage avec plusieurs remorqueurs","Mooring with several tugs","Amarre con varios remolcadores","Amarracao com varios rebocadores"),lbl("Ancre mouille par l'avant, navire recule poupe au quai — limite le besoin d'espace longitudinal","Anchor dropped forward, vessel backs stern to quay — limits need for longitudinal space","Ancla fondeada por la proa, buque recua con popa al muelle — limita necesidad de espacio longitudinal","Ancora fundeada pela proa, navio recua com popa ao cais — limita necessidade de espaco longitudinal"),lbl("Amarrage avec ancres des deux cotes","Mooring with anchors on both sides","Amarre con anclas por ambos lados","Amarracao com ancoras dos dois lados"),lbl("Amarrage en pleine mer","Mooring in open sea","Amarre en alta mar","Amarracao em alto mar")],
      ans:1,expl:lbl("Le Med-Moor est courant en Mediterranee ou l'espace en port est limite. Procedure : (1) Mouillez l'ancre par l'avant. (2) Filez la chaine : scope 4:1 minimum. (3) Reculez la poupe vers le quai. (4) Passez les amarres de poupe au quai. (5) La chaine d'ancre tient la proue ecartee du quai. Avantage : occuper moins d'espace longitudinal. Risque : garreo de l'ancre sous les efforts des amarres.","Med-Moor is common in the Mediterranean where port space is limited. Procedure: (1) Drop anchor forward. (2) Veer chain: scope 4:1 minimum. (3) Back stern toward quay. (4) Pass stern lines to quay. (5) Anchor chain holds bow away from quay. Advantage: less longitudinal space needed. Risk: anchor dragging under mooring loads.","El Med-Moor es comun en el Mediterraneo donde el espacio es limitado. Procedimiento: (1) Fondear por la proa. (2) Largar cadena: scope 4:1 minimo. (3) Recuar la popa al muelle. (4) Pasar cabos de popa. (5) La cadena mantiene la proa separada del muelle.","O Med-Moor e comum no Mediterraneo. Procedimento: (1) Fundeiar pela proa. (2) Filar corrente: scope 4:1 minimo. (3) Recuar a popa ao cais. (4) Passar cabos de popa. (5) A corrente mantém a proa afastada do cais.")},
    {q:lbl("Quel est l'ordre de passage des amarres a l'accostage ?","What is the order of mooring lines when coming alongside?","?Cual es el orden de paso de cabos al atracar?","Qual e a ordem de passagem de cabos ao atracar?"),
      opts:[lbl("Traversieres d'abord","Breast lines first","Traveses primero","Traveses primeiro"),lbl("Tete en premier — puis poupe — puis springs — puis traversieres","Head line first — then stern — then springs — then breast lines","Proa primero — luego popa — luego springs — luego traveses","Proa primeiro — depois popa — depois springs — depois traveses"),lbl("Springs d'abord","Springs first","Springs primero","Springs primeiro"),lbl("L'ordre n'a pas d'importance","Order does not matter","El orden no importa","A ordem nao importa")],
      ans:1,expl:lbl("Ordre d'accostage : (1) Tete : retient la proue, stabilise le navire. (2) Poupe : symetrique de la tete. (3) Springs : bloquent l'avance et la chute. (4) Traversieres : complement lateral en fin. Logique : d'abord les amarres longitudinales pour immobiliser le navire, puis les laterales pour le rapprocher du quai.","Berthing order: (1) Head line: holds bow, stabilises vessel. (2) Stern line: symmetric to head. (3) Springs: block headway and sternway. (4) Breast lines: lateral complement at end. Logic: first longitudinal lines to immobilize, then lateral to bring vessel alongside.","Orden de atraque: (1) Proa: retiene la proa, estabiliza el buque. (2) Popa. (3) Springs. (4) Traveses. Logica: primero los cabos longitudinales para inmovilizar, luego los laterales.","Ordem de atraque: (1) Proa: retém a proa, estabiliza o navio. (2) Popa. (3) Springs. (4) Traveses. Logica: primeiro os cabos longitudinais para imobilizar, depois os laterais.")},
    {q:lbl("Qu'est-ce qu'une gaza (bight) sur une amarre ?","What is a bight on a mooring line?","?Que es una gaza en una amarra?","O que e uma gaza numa amarra?"),
      opts:[lbl("Un noeud special","A special knot","Un nudo especial","Um no especial"),lbl("Boucle terminale de l'amarre qui s'enroule sur la bitte — jamais de noeud sous tension","Terminal loop of mooring line that goes over the bollard — never knot under tension"," Gaza terminal de la amarra que se pasa al bolardo — nunca nudo bajo tension","Gaza terminal da amarra que vai ao cabeco — nunca no sob tensao"),lbl("Un raccord de cordage","A line connector","Un conector de cabo","Um conector de cabo"),lbl("L'extremite libre de l'amarre","The free end of the line","El extremo libre de la amarra","A extremidade livre da amarra")],
      ans:1,expl:lbl("La gaza est la boucle terminale de l'amarre (souvent cousue ou epissee). Elle s'enroule directement sur la bitte d'amarrage sans noeud. Regre fondamentale : ne jamais faire de noeud sur une amarre sous tension — le noeud fragilise le cable et le rend impossible a larguer en urgence. Si deux gazas sur une meme bitte : passer la deuxieme sous la premiere.","The bight/eye is the terminal loop of the mooring line (often sewn or spliced). It goes directly over the bollard without a knot. Fundamental rule: never tie a knot in a mooring line under tension — the knot weakens the line and makes it impossible to let go in emergency. If two eyes on same bollard: pass second under first.","La gaza es el ojo terminal de la amarra. Va directamente al bolardo sin nudo. Regla fundamental: nunca hacer un nudo en una amarra bajo tension. Si dos gazas en el mismo bolardo: pasar la segunda por debajo de la primera.","A gaza e o elo terminal da amarra. Vai diretamente ao cabeco sem no. Regra fundamental: nunca fazer no numa amarra sob tensao. Se duas gazas no mesmo cabeco: passar a segunda por baixo da primeira.")},
    {q:lbl("Qu'est-ce que le treuil a auto-tension (constant tension winch) ?","What is a constant tension (auto-tension) winch?","?Que es el molinete de tension constante (auto-tension)?","O que e o guincho de tensao constante (auto-tension)?"),
      opts:[lbl("Un treuil manuel","A manual winch","Un molinete manual","Um guincho manual"),lbl("Treuil motorise qui adapte automatiquement la tension de l'amarre selon la maree et les mouvements du navire","Motorised winch that automatically adjusts line tension according to tide and vessel movements","Molinete motorizado que adapta automaticamente la tension del cabo segun la marea y los movimientos del buque","Guincho motorizado que adapta automaticamente a tensao do cabo segundo a mare e os movimentos do navio"),lbl("Un treuil de secours","An emergency winch","Un molinete de emergencia","Um guincho de emergencia"),lbl("Un treuil uniquement pour les remorqueurs","A winch only for tugs","Un molinete solo para remolcadores","Um guincho apenas para rebocadores")],
      ans:1,expl:lbl("L'auto-tension (AT) maintient une tension constante predeterminee sur l'amarre independamment de la maree ou des mouvements du navire. Avantages : (1) evite les surcharges (amarre trop raidi). (2) evite les mous (amarre trop longue). (3) reduce le travail de l'equipage. Inconvenient : en cas de panne, les amarres peuvent soudainement se relacher ou se tendre.","Auto-tension (AT) maintains a preset constant tension on the mooring line regardless of tide or vessel movement. Advantages: (1) avoids overloads (line too tight). (2) avoids slack (line too loose). (3) reduces crew workload. Drawback: if it fails, lines may suddenly slacken or overtighten.","La auto-tension mantiene una tension constante predeterminada en la amarra independientemente de la marea. Ventajas: evita sobrecargas y aflojamientos, reduce trabajo tripulacion.","A auto-tension mantém uma tensao constante predeterminada na amarra independentemente da mare. Vantagens: evita sobrecargas e folgas, reduz trabalho da tripulacao.")},
    {q:lbl("Quel equipement protege les amarres de l'usure au passage dans le bord ?","What equipment protects mooring lines from chafe through the side?","?Que equipo protege las amarras del rozamiento al pasar por el costado?","Que equipamento protege as amarras do desgaste ao passar pelo costado?"),
      opts:[lbl("La bitte d'amarrage","The bollard","El bolardo","O cabeco"),lbl("Le chaumard (fairlead) — guide et protege les amarres contre l'abrasion au passage dans le pavois","The fairlead — guides and protects mooring lines from abrasion through the bulwark","El guiacabos (fairlead) — guia y protege las amarras del rozamiento al pasar por la borda","O guia-cabos (fairlead) — guia e protege as amarras da abrasao ao passar pela amurada"),lbl("Le treuil","The winch","El molinete","O guincho"),lbl("La defense","The fender","La defensa","A defensa")],
      ans:1,expl:lbl("Le chaumard (ou davier) est un guide-amarre fixe sur le pavois ou la lisse du navire. Il peut etre a rouleaux (pour les grandes amarres) ou lisse. Sans chaumard, l'amarre frotterait directement sur l'acier du pavois, s'userait rapidement et risquerait de casser. Inspection reguliere de l'etat des rouleaux obligatoire.","The fairlead (or bullseye) is a line guide fixed on the bulwark or rail. It can be roller type (for heavy lines) or smooth. Without fairlead, the mooring line would rub directly on the steel bulwark, wear quickly and risk breaking. Regular inspection of roller condition mandatory.","El guiacabos es una guia fijada en la borda del buque. Sin guiacabos, la amarra rozaria directamente con el acero de la borda y se desgastaria rapidamente.","O guia-cabos e uma guia fixada na amurada do navio. Sem guia-cabos, a amarra esfregaria diretamente no aco da amurada e desgastaria rapidamente.")},
    {q:lbl("Comment positionner les defenses (fenders) a l'accostage ?","How to position fenders when coming alongside?","?Como posicionar las defensas al atracar?","Como posicionar as defensas ao atracar?"),
      opts:[lbl("Une seule defense au centre","One fender in center","Una sola defensa en el centro","Uma so defensa ao centro"),lbl("Minimum 3 par bord — positionner aux plats de borde (zone la plus large) — verifier pression avant accostage","Minimum 3 per side — position at parallel midbody — check pressure before berthing","Minimo 3 por costado — posicionar en la zona de plata banda — verificar presion antes de atracar","Minimo 3 por costado — posicionar nos planos de borda — verificar pressao antes de atracar"),lbl("Uniquement a la proue","Only at the bow","Solo en la proa","Apenas na proa"),lbl("Les defenses sont l'affaire du quai","Fenders are the quay's concern","Las defensas son del muelle","As defensas sao do cais")],
      ans:1,expl:lbl("Positionnement des defenses : (1) Minimum 3 par bord pour les grands navires. (2) Positionner aux plats de borde (section la plus large du navire). (3) Verifier la pression des defenses gonflables avant l'accostage. (4) Les defenses doivent etre plus hautes que la ceinture du quai. (5) Pendant l'accostage, les matelots deployent les defenses supplementaires selon le contact avec le quai.","Fender positioning: (1) Minimum 3 per side on large vessels. (2) Position at parallel midbody (widest section). (3) Check inflatable fender pressure before berthing. (4) Fenders must be higher than quay coping. (5) During berthing, sailors deploy additional fenders as contact with quay develops.","Posicionamiento de defensas: (1) Minimo 3 por costado. (2) Posicionar en los planos de borda. (3) Verificar presion antes del atraque. (4) Deben ser mas altas que el canto del muelle.","Posicionamento de defensas: (1) Minimo 3 por costado. (2) Posicionar nos planos de borda. (3) Verificar pressao antes do atraque. (4) Devem ser mais altas que o bordo do cais.")},
    {q:lbl("Pourquoi ne faut-il jamais se tenir dans la boucle d'une amarre sous tension ?","Why must you never stand in the bight of a mooring line under tension?","?Por que nunca hay que pararse en la gaza de una amarra bajo tension?","Por que nunca se deve ficar no circulo de uma amarra sob tensao?"),
      opts:[lbl("Parce que l'amarre peut etre glissante","Because the line may be slippery","Porque la amarra puede ser resbaladiza","Porque a amarra pode ser escorregadia"),lbl("En cas de rupture, l'amarre fouette avec une force mortelle — zone de danger absolue","If it breaks, the line whips with deadly force — absolute danger zone","En caso de rotura, la amarra azota con fuerza mortal — zona de peligro absoluto","Em caso de rotura, a amarra chicoteia com forca letal — zona de perigo absoluta"),lbl("Cela deteriore l'amarre","It damages the line","Deteriora la amarra","Deteriora a amarra"),lbl("C'est interdit par le reglement","It is prohibited by regulation","Esta prohibido por el reglamento","E proibido pelo regulamento")],
      ans:1,expl:lbl("Une amarre sous tension contient une energie phenomenale. En cas de rupture, elle fouette a plusieurs centaines de kilometres par heure dans la direction opposee a la tension. Accidents mortels nombreux en milieu portuaire. Regles : (1) Ne jamais se tenir dans l'axe d'une amarre. (2) Ne jamais enjamber une amarre sous tension. (3) Porter EPI (casque, gilet, gants). (4) Se tenir en dehors de la boucle de sertissage.","A mooring line under tension contains phenomenal energy. If it breaks, it whips at hundreds of kilometers per hour in the opposite direction of tension. Numerous fatal accidents in port environments. Rules: (1) Never stand in the axis of a mooring line. (2) Never step over a taut mooring line. (3) Wear PPE (helmet, vest, gloves). (4) Stay outside the snap-back zone.","Una amarra bajo tension contiene una energia fenomenal. En caso de rotura, azota a cientos de km/h. Accidentes mortales frecuentes. Reglas: nunca pararse en el eje, nunca cruzar una amarra tensa.","Uma amarra sob tensao contém uma energia fenomenal. Em caso de rotura, chicoteia a centenas de km/h. Acidentes mortais frequentes. Regras: nunca ficar no eixo, nunca atravessar uma amarra tensa.")},
    {q:lbl("Qu'est-ce que le 'choquage' d'une amarre ?","What is 'surging' a mooring line?","?Que es el 'filar' una amarra?","O que e 'largar' uma amarra?"),
      opts:[lbl("Tendre l'amarre","Heaving the line taut","Tensar la amarra","Tesionar a amarra"),lbl("Laisser filer progressivement l'amarre sous controle pour l'allonger ou la larguer","Progressively paying out the line under control to lengthen or let go","Dejar largar progresivamente la amarra bajo control para alargarla o soltarla","Deixar largar progressivamente a amarra sob controlo para a comprimir ou largar"),lbl("Couper l'amarre","Cutting the line","Cortar la amarra","Cortar a amarra"),lbl("Renforcer l'amarre","Reinforcing the line","Reforzar la amarre","Reforcar a amarra")],
      ans:1,expl:lbl("Choquer = laisser filer progressivement l'amarre sous controle, en freinant avec le treuil ou le guindeau. Contraire de raidir (heave in). On choque pour : allonger une amarre en maree montante, faire plus de jeu, ou preparer le largue en urgence. Toujours choquer progressivement pour eviter un choquage brutal (fouettement).","Surging = progressively paying out the line under control, braking with winch or windlass. Opposite of heaving in. Surge to: lengthen a line on rising tide, give more slack, or prepare for emergency let-go. Always surge progressively to avoid sudden release (whipping).","Filar = largar progresivamente la amarra bajo control. Contrario de virar. Se fila para: alargar una amarra en pleamar, dar mas juego o preparar el largue. Siempre de forma progresiva.","Largar = largar progressivamente a amarra sob controlo. Contrario de virar. Larga-se para: comprimir uma amarra em mare cheia, dar mais folga ou preparar o largue. Sempre progressivamente.")},
    {q:lbl("Comment eviter que deux gazas se bloquent sur la meme bitte ?","How to prevent two mooring eyes from locking on the same bollard?","?Como evitar que dos gazas se bloqueen en el mismo bolardo?","Como evitar que duas gazas se bloqueiem no mesmo cabeco?"),
      opts:[lbl("Utiliser deux bittes differentes","Use different bollards","Usar bolardos diferentes","Usar cabecos diferentes"),lbl("Passer toujours la deuxieme gaza sous la premiere — permet de larguer n'importe quelle amarre sans bloquer l'autre","Always pass second eye under first — allows any line to be let go without blocking the other","Siempre pasar la segunda gaza por debajo de la primera — permite largar cualquier amarra sin bloquear la otra","Sempre passar a segunda gaza por baixo da primeira — permite largar qualquer amarra sem bloquear a outra"),lbl("Croiser les deux gazas","Cross the two eyes","Cruzar las dos gazas","Cruzar as duas gazas"),lbl("Il n'y a pas de probleme a superposer","No problem stacking them","No hay problema en superponerlas","Nao ha problema em sobrepo-las")],
      ans:1,expl:lbl("Technique fondamentale : quand une bitte est deja occupee, passer la deuxieme gaza sous la premiere (en passant par en dessous de la bitte). Resultat : les deux gazas peuvent etre largues independamment dans n'importe quel ordre sans se bloquer. Si on passe par-dessus, la premiere est bloquee par la deuxieme et ne peut pas etre largue.","Fundamental technique: when a bollard is already in use, pass the second eye under the first (going up through the bollard from below). Result: both eyes can be let go independently in any order without locking. If passed over the top, the first eye is blocked by the second and cannot be let go.","Tecnica fundamental: pasar la segunda gaza por debajo de la primera. Resultado: ambas gazas pueden largarse independientemente. Si se pasa por encima, la primera queda bloqueada.","Tecnica fundamental: passar a segunda gaza por baixo da primeira. Resultado: ambas as gazas podem largar-se independentemente. Se passada por cima, a primeira fica bloqueada.")},
    {q:lbl("Quelles sont les conditions meteorologiques qui necessitent un renforcement des amarres ?","What weather conditions require reinforcing mooring lines?","?Que condiciones meteorologicas requieren el refuerzo de las amarras?","Que condicoes meteorologicas requerem reforco das amarras?"),
      opts:[lbl("Uniquement le vent","Wind only","Solo el viento","Apenas o vento"),lbl("Vent fort (> force 6), houle, courant de maree fort, passage de navires rapides creant du remous","Strong wind (> force 6), swell, strong tidal current, fast vessel wash creating surge","Viento fuerte (> fuerza 6), marejada, corriente de marea fuerte, paso de buques rapidos con estela","Vento forte (> forca 6), ondulacao, corrente de mare forte, passagem de navios rapidos com esteira"),lbl("Uniquement la maree","Tide only","Solo la marea","Apenas a mare"),lbl("Les conditions n'affectent pas les amarres","Conditions don't affect moorings","Las condiciones no afectan las amarras","As condicoes nao afetam as amarras")],
      ans:1,expl:lbl("Renforcer les amarres si : (1) Vent > force 6 — ajouter des spring doublants. (2) Houle ou clapot entrant — toutes les amarres peuvent se fatiguer rapidement. (3) Fort courant de maree — amarres longitudinales a doubler. (4) Passage de navires rapides (wash) — chocs soudains. (5) Maree extremes — amarres trop courtes ou trop longues selon le sens. Regle : en cas de doute, doubler les amarres.","Reinforce mooring lines if: (1) Wind > force 6 — add doubling springs. (2) Swell or chop — all lines can fatigue quickly. (3) Strong tidal current — double longitudinal lines. (4) Fast vessel wash — sudden shocks. (5) Extreme tides — lines too short or too long. Rule: when in doubt, double up.","Reforzar amarras si: (1) Viento > fuerza 6. (2) Marejada o rizado. (3) Fuerte corriente de marea. (4) Paso de buques rapidos. (5) Mareas extremas. Regla: ante la duda, doblar las amarras.","Reforcar amarras se: (1) Vento > forca 6. (2) Ondulacao ou marola. (3) Forte corrente de mare. (4) Passagem de navios rapidos. (5) Mares extremas. Regra: na duvida, dobrar as amarras.")},
  ];

  const [shuffled]=useState(()=>qs.map(q=>shuffleQuestionOptions(q,"ans")));
  const total=qs.length;
  const handleAnswer=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===shuffled[idx].ans)setScore(s=>s+1);};
  const handleNext=()=>{if(idx===total-1){setDone(true);return;}setSel(null);setAnswered(false);setIdx(i=>i+1);};
  const handleRestart=()=>{setIdx(0);setSel(null);setAnswered(false);setScore(0);setDone(false);setStarted(false);};

  if(!started) return (
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:40,marginBottom:12}}>📝</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:C.white,marginBottom:6,letterSpacing:1}}>
        {lbl("Banque Premium","Premium Bank","Banco Premium","Banco Premium")}
      </div>
      <div style={{fontSize:12,color:C.muted,marginBottom:20}}>
        15 {lbl("questions niveau expert","expert-level questions","preguntas nivel experto","questoes nivel especialista")}
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
            {sel===q.ans?(lbl("✓ Excellente reponse !","✓ Excellent!","✓ Excelente!","✓ Excelente!"))
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
          {idx===total-1?(lbl("VOIR MON SCORE =>","SEE MY SCORE =>","VER PUNTUACION =>","VER PONTUACAO =>"))
            :(lbl("SUIVANT =>","NEXT =>","SIGUIENTE =>","PROXIMO =>"))}
        </button>
      )}
    </div>
  );
}

const QUIZ={
  fr:[
    {q:"Quel cabo empeche le navire de s'eloigner lateralement du quai ?",
      opts:["Spring avant","Traversiere (breast line)","Amarre de tete","Amarre de poupe"],
      ans:1,expl:"La traversiere est perpendiculaire au quai (90 degres). Son role exclusif est d'empecher l'ecartement lateral. Elle ne controle pas l'avance ni la chute. A l'appareillage : premiere largue car la securite longitudinale est assuree par les springs et les amarres de tete/poupe."},
    {q:"Dans la technique du pivot au spring arriere, quelle machine donne-t-on ?",
      opts:["Machine arriere","Machine avant — spring AR tenu — proue pivote vers le large","Machine stop","Alternativement avant et arriere"],
      ans:1,expl:"Technique pivot spring AR : (1) Larguer traversieres, tete, poupe. (2) Garder spring AR. (3) Machine AVANT lente. (4) Spring AR empeche l'avance — poupe reste au quai. (5) Proue pivote vers le large. (6) Larguer spring AR quand proue degagee. (7) Navire libre."},
    {q:"Quel est le premier cabo passe a l'accostage et pourquoi ?",
      opts:["Traversiere avant","Spring avant","Amarre de tete (head line) — retient la proue et stabilise","Amarre de poupe"],
      ans:2,expl:"L'amarre de tete est passee en premier car : (1) Elle retient la proue du navire. (2) Elle cree un point d'ancrage stable pour passer les autres amarres. (3) Elle empeche le navire de cacher (deriver en arriere). Une fois la tete en place, l'equipage peut passer les autres amarres en securite."},
    {q:"Qu'est-ce que le Med-Moor ?",
      opts:["Amarrage avec 2 remorqueurs","Ancre par l'avant + poupe au quai — economise l'espace longitudinal","Amarrage avec 2 ancres","Amarrage en rade"],
      ans:1,expl:"Med-Moor : ancre mouille par l'avant (scope 4:1 min), navire recule poupe au quai, amarres de poupe passees. La chaine d'ancre tient la proue ecartee du quai. Courant en Mediterranee ou l'espace en port est limite. Risque : garreo de l'ancre sous les efforts des amarres."},
    {q:"Quelle est la regle de securite absolue pour les amarres sous tension ?",
      opts:["Porter des gants uniquement","Ne jamais se tenir dans l'axe ou la boucle d'une amarre sous tension — risque de fouettement mortel","Toujours doubler les amarres","Ne jamais utiliser de treuil"],
      ans:1,expl:"En cas de rupture, une amarre sous tension fouette a plusieurs centaines de km/h avec une energie mortelle. Zone de snap-back (fouettement) = devant et derriere l'amarre dans son axe. EPI obligatoires : casque, gilet, gants. Ne jamais enjamber une amarre sous tension."},
  ],
  en:[
    {q:"Which line prevents the vessel from ranging off the quay laterally?",
      opts:["Forward spring","Breast line","Head line","Stern line"],
      ans:1,expl:"The breast line is perpendicular to the quay (90 degrees). Its exclusive role is to prevent lateral ranging off. It does not control headway or sternway. At departure: first let go because longitudinal safety is ensured by springs and head/stern lines."},
    {q:"In the aft spring pivot technique, which engine order is given?",
      opts:["Astern engine","Ahead engine — aft spring held — bow swings to seaward","Stop engine","Alternately ahead and astern"],
      ans:1,expl:"Aft spring pivot technique: (1) Let go breast lines, head, stern. (2) Hold aft spring. (3) SLOW AHEAD engine. (4) Aft spring prevents headway — stern stays at quay. (5) Bow swings to seaward. (6) Let go aft spring when bow clear. (7) Vessel free."},
    {q:"Which is the first line passed when coming alongside and why?",
      opts:["Forward breast line","Forward spring","Head line — holds bow and stabilises","Stern line"],
      ans:2,expl:"Head line is passed first because: (1) It holds the vessel's bow. (2) It creates a stable anchor point to pass other lines. (3) It prevents the vessel from making sternway. Once head line is fast, crew can safely pass remaining lines."},
    {q:"What is Med-Moor?",
      opts:["Mooring with 2 tugs","Anchor forward + stern to quay — saves longitudinal space","Mooring with 2 anchors","Open roadstead mooring"],
      ans:1,expl:"Med-Moor: anchor dropped forward (scope 4:1 min), vessel backs stern to quay, stern lines passed. Anchor chain holds bow away from quay. Common in Mediterranean where port space is limited. Risk: anchor dragging under mooring loads."},
    {q:"What is the absolute safety rule for mooring lines under tension?",
      opts:["Wear gloves only","Never stand in the axis or bight of a taut mooring line — risk of lethal whipping","Always double lines","Never use winches"],
      ans:1,expl:"If a mooring line under tension parts, it whips at hundreds of km/h with lethal energy. Snap-back zone = in front of and behind the line in its axis. Mandatory PPE: helmet, vest, gloves. Never step over a taut mooring line."},
  ],
  es:[
    {q:"?Que cabo impide que el buque se separe lateralmente del muelle?",
      opts:["Spring de proa","Través (breast line)","Cabo de proa","Cabo de popa"],
      ans:1,expl:"El través es perpendicular al muelle (90 grados). Su papel exclusivo es impedir la separacion lateral. No controla el avance ni la caida. Al zarpar: primero en largarse porque la seguridad longitudinal la dan los springs y los cabos de proa/popa."},
    {q:"En la tecnica del pivote con spring de popa, ?que maquina se da?",
      opts:["Maquina atras","Maquina avante — spring popa tenido — proa gira hacia fuera","Maquina parada","Alternativamente avante y atras"],
      ans:1,expl:"Tecnica pivote spring popa: (1) Largar traveses, proa, popa. (2) Mantener spring popa. (3) Maquina AVANTE lenta. (4) Spring popa impide el avance — popa sigue al muelle. (5) Proa gira hacia fuera. (6) Largar spring popa cuando proa despejada. (7) Buque libre."},
    {q:"?Cual es el primer cabo pasado al atracar y por que?",
      opts:["Través de proa","Spring de proa","Cabo de proa — retiene la proa y estabiliza","Cabo de popa"],
      ans:2,expl:"El cabo de proa se pasa primero porque: (1) Retiene la proa del buque. (2) Crea un punto de anclaje estable para pasar los demas cabos. (3) Impide que el buque caiga (derive hacia atras). Una vez afirmado, la tripulacion puede pasar los demas cabos con seguridad."},
    {q:"?Que es el Med-Moor?",
      opts:["Amarre con 2 remolcadores","Ancla por la proa + popa al muelle — ahorra espacio longitudinal","Amarre con 2 anclas","Amarre en rada abierta"],
      ans:1,expl:"Med-Moor: ancla fondeada por la proa (scope 4:1 min), buque recua popa al muelle, cabos de popa pasados. La cadena de ancla mantiene la proa separada del muelle. Comun en el Mediterraneo donde el espacio es limitado."},
    {q:"?Cual es la regla de seguridad absoluta para las amarras bajo tension?",
      opts:["Solo usar guantes","Nunca pararse en el eje o la gaza de una amarra tensa — riesgo de azotazo mortal","Siempre doblar las amarras","Nunca usar molinetes"],
      ans:1,expl:"Si una amarra bajo tension se rompe, azota a cientos de km/h con energia mortal. Zona de snap-back = delante y detras de la amarra en su eje. EPI obligatorios: casco, chaleco, guantes. Nunca cruzar una amarra tensa."},
  ],
  pt:[
    {q:"Que cabo impede o navio de se afastar lateralmente do cais?",
      opts:["Spring de proa","Través (breast line)","Cabo de proa","Cabo de popa"],
      ans:1,expl:"O través e perpendicular ao cais (90 graus). Seu papel exclusivo e impedir o afastamento lateral. Nao controla o avanco nem a caca. Ao zarpar: primeiro a largar porque a seguranca longitudinal e garantida pelos springs e cabos de proa/popa."},
    {q:"Na tecnica do pivo com spring de popa, que maquina se da?",
      opts:["Maquina atras","Maquina avante — spring popa mantido — proa gira para fora","Maquina parada","Alternadamente avante e atras"],
      ans:1,expl:"Tecnica pivo spring popa: (1) Largar traveses, proa, popa. (2) Manter spring popa. (3) Maquina AVANTE lenta. (4) Spring popa impede o avanco — popa fica no cais. (5) Proa gira para fora. (6) Largar spring popa quando proa livre. (7) Navio livre."},
    {q:"Qual e o primeiro cabo passado ao atracar e porquê?",
      opts:["Través de proa","Spring de proa","Cabo de proa — retém a proa e estabiliza","Cabo de popa"],
      ans:2,expl:"O cabo de proa passa-se primeiro porque: (1) Retém a proa do navio. (2) Cria um ponto de ancora estavel para passar os outros cabos. (3) Impede o navio de cacar. Uma vez amarrado, a tripulacao pode passar os restantes cabos com seguranca."},
    {q:"O que e o Med-Moor?",
      opts:["Amarracao com 2 rebocadores","Ancora pela proa + popa ao cais — poupa espaco longitudinal","Amarracao com 2 ancoras","Amarracao em rada aberta"],
      ans:1,expl:"Med-Moor: ancora fundeada pela proa (scope 4:1 min), navio recua popa ao cais, cabos de popa passados. A corrente de ancora mantém a proa afastada do cais. Comum no Mediterraneo onde o espaco e limitado."},
    {q:"Qual e a regra de seguranca absoluta para as amarras sob tensao?",
      opts:["Usar so luvas","Nunca ficar no eixo ou no circulo de uma amarra tensa — risco de chicoteamento letal","Sempre dobrar as amarras","Nunca usar guinchos"],
      ans:1,expl:"Se uma amarra sob tensao se rompe, chicoteia a centenas de km/h com energia letal. Zona de snap-back = a frente e atras da amarra no seu eixo. EPI obrigatorios: capacete, colete, luvas. Nunca atravessar uma amarra tensa."},
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

const getContent=(lang)=>{
  const d={
    fr:{
      badge:"Seamanship · Lecon 4/5 · Premium · 180 XP",
      title:"Operations d'Amarrage",
      intro:"Amarrer un navire de 200 metres dans un courant de 2 noeuds avec 20 noeuds de vent — pas d'erreur possible.\n\nCette lecon couvre les types d'amarres, les equipements, la sequence d'appareillage, et les dialogues complets passerelle-pont a l'accostage et a l'appareillage.",
      p1:"PARTIE 1 — SCHEMA AMARRAGE",s1t:"6 amarres : roles et interactions",
      s1:"6 TYPES D'AMARRES:\nAmarre de tete (Head line) : retient la PROUE — anti-chute\nAmarre de poupe (Stern line) : retient la POUPE — anti-avance\nSpring avant : oblique proue→arriere — anti-avance\nSpring arriere : oblique poupe→avant — anti-chute\nTraversiere avant : perpendiculaire — anti-ecartement lateral AV\nTraversiere arriere : perpendiculaire — anti-ecartement lateral AR\n\nORDRE D'ACCOSTAGE:\n1. Tete (stabilise la proue) → 2. Poupe → 3. Springs → 4. Traversieres\n\nORDRE D'APPAREILLAGE:\n1. Traversieres → 2. Tete → 3. Poupe → 4. Springs (spring AR = pivot en dernier)",
      p2:"PARTIE 2 — EQUIPEMENTS",s2t:"Bitte · Taquet · Chaumard · Defense · Treuil · Aussiere",
      s2:"COTE QUAI:\nBitte d'amarrage : T ou double-T acier — recoit la gaza de l'amarre\n→ 50-200 tonnes selon taille — 'Passer la gaza sous si bitte occupee'\n\nCOTE NAVIRE:\nTaquet : deux cornes — affourcher en 8 — jamais de noeud\nChaumard (fairlead) : guide-amarre — protege contre usure\nDefense : coussin entre navire et quai — min 3 par bord\nTreuil d'amarrage : auto-tension sur grands navires\nAussiere : polyester ou acier — gazas epissees\n\nSECURITE:\nJAMAIS se tenir dans l'axe d'une amarre sous tension\nJAMAIS enjamber une amarre sous tension\nEPI obligatoires : casque, gilet de sauvetage, gants",
      p3:"PARTIE 3 — SEQUENCE APPAREILLAGE",s3t:"7 etapes — pivot au spring arriere",
      s3:"SEQUENCE STANDARD D'APPAREILLAGE:\n1. Verifier machines, gouvernail, helices libres\n2. Larguer traversieres AV et AR\n3. Larguer amarre de tete\n4. Larguer amarre de poupe\n5. Machine avant — spring AR tenu = PIVOT\n6. Proue pivote vers le large\n7. Larguer spring AR quand proue degagee — navire libre\n\nMed-Moor (amarrage mediterraneen):\nAncre mouille par l'avant (scope 4:1 min)\nNavire recule — poupe au quai\nAmarres de poupe passees sur bittes\nChaine ancre = maintien proue a distance du quai\n\nBONNES PRATIQUES:\nVitesse approche < 0,3 noeud au contact\nMinimum 3 defenses par bord avant approche\nViser les eclats de lumiere entre navire et quai = jauger distance",
      p4:"PARTIE 4 — DIALOGUES RADIO",s4t:"Accostage ET Appareillage — Passerelle ↔ Pont",
      s4:"VOCABULAIRE CLE:\n'Raidir' : tendre l'amarre — 'Choquer' : laisser filer\n'Gaza' : boucle terminale de l'amarre\n'Larguer' : liberer l'amarre du quai\n'Affourcher' : assurer l'amarre sur le taquet\n'A bord' : confirmation que l'amarre est recuperee\n'Tenu' : l'amarre est sous tension et maintenue\n\nPRINCIPES DU DIALOGUE:\nPasserelle → Pont : ordres clairs et courts\nPont → Passerelle : confirmation immediate\nToujours repeter les ordres critiques\nConfirmer 'A bord' quand amarre recuperee\nSignaler toute anomalie immediatement",
      p5:"EXERCICES PRATIQUES",p6:"CAS D'ACCIDENT REEL",p7:"BANQUE — 15 QUESTIONS",
      sumT:"RESUME — LECON 4 SEAMANSHIP",
      sumP:["Traversiere : perpendiculaire — empeche l'ecartement lateral — largue en 1er","Spring arriere : pivot a l'appareillage — largue en dernier","Amarre de tete : 1er cabo passe a l'accostage — stabilise la proue","Gaza : boucle terminale — passer sous si bitte occupee — jamais de noeud sous tension","Med-Moor : ancre AV + poupe quai — scope 4:1 min — courant en Mediterranee","Ordre appareillage : traversieres → tete → poupe → springs (AR en dernier = pivot)","Securite : jamais dans l'axe d'une amarre sous tension — snap-back zone mortelle","Auto-tension : treuil adapte la tension selon maree automatiquement","Affourcher en 8 : toujours en forme de 8 sur le taquet — jamais de noeud","Dialogue radio : ordres courts — confirmation immediate — 'A bord' quand amarre rentree"],
      learnedP:["6 types d'amarres et leurs roles","Equipements : bitte, chaumard, defense, treuil","Sequence d'appareillage et pivot spring AR","Med-Moor : ancre par l'avant","Dialogues radio complets accostage + appareillage"],
    },
    en:{
      badge:"Seamanship · Lesson 4/5 · Premium · 180 XP",
      title:"Mooring Operations",
      intro:"Mooring a 200-metre vessel in a 2-knot current with 20 knots of wind — no room for error.\n\nThis lesson covers mooring line types, equipment, departure sequence, and complete bridge-deck dialogues for berthing and departure.",
      p1:"PART 1 — MOORING DIAGRAM",s1t:"6 lines: roles and interactions",
      s1:"6 MOORING LINE TYPES:\nHead line: holds BOW — prevents sternway\nStern line: holds STERN — prevents headway\nFwd spring: diagonal bow→aft — prevents headway\nAft spring: diagonal stern→fwd — prevents sternway\nFwd breast: perpendicular — prevents lateral ranging fwd\nAft breast: perpendicular — prevents lateral ranging aft\n\nBERTHING ORDER:\n1. Head (stabilises bow) → 2. Stern → 3. Springs → 4. Breasts\n\nDEPARTURE ORDER:\n1. Breasts → 2. Head → 3. Stern → 4. Springs (aft spring = pivot, last)",
      p2:"PART 2 — EQUIPMENT",s2t:"Bollard · Cleat · Fairlead · Fender · Winch · Line",
      s2:"QUAY SIDE:\nBollard: T or double-T steel — receives mooring eye\n→ 50-200 tonnes — 'Pass eye under if bollard occupied'\n\nVESSEL SIDE:\nCleat: two horns — figure-of-8 — never a knot\nFairlead: line guide — protects against chafe\nFender: cushion between vessel and quay — min 3 per side\nMooring winch: auto-tension on large vessels\nMooring line: polyester or steel — spliced eyes\n\nSAFETY:\nNEVER stand in the axis of a taut mooring line\nNEVER step over a taut mooring line\nMandatory PPE: helmet, lifejacket, gloves",
      p3:"PART 3 — DEPARTURE SEQUENCE",s3t:"7 steps — aft spring pivot",
      s3:"STANDARD DEPARTURE SEQUENCE:\n1. Check engines, rudder, propellers clear\n2. Let go fwd and aft breast lines\n3. Let go head line\n4. Let go stern line\n5. Ahead engine — hold aft spring = PIVOT\n6. Bow swings to seaward\n7. Let go aft spring when bow clear — vessel free\n\nMed-Moor (Mediterranean mooring):\nAnchor dropped forward (scope 4:1 min)\nVessel backs in — stern to quay\nStern lines passed to bollards\nAnchor chain = holds bow away from quay\n\nBEST PRACTICES:\nApproach speed < 0.3 knots at contact\nMinimum 3 fenders per side before approach\nAim for light gaps between vessel and quay = judge distance",
      p4:"PART 4 — RADIO DIALOGUES",s4t:"Berthing AND Departure — Bridge ↔ Deck",
      s4:"KEY VOCABULARY:\n'Heave in' : tighten line — 'Surge' : pay out\n'Eye/bight' : terminal loop of mooring line\n'Let go' : release line from quay\n'Make fast' : secure line on cleat\n'Inboard' : line recovered on deck\n'Holding' : line under tension and maintained\n\nDIALOGUE PRINCIPLES:\nBridge → Deck: clear and short orders\nDeck → Bridge: immediate confirmation\nAlways repeat critical orders\nConfirm 'inboard' when line retrieved\nReport any anomaly immediately",
      p5:"PRACTICAL EXERCISES",p6:"REAL ACCIDENT CASE",p7:"BANK — 15 QUESTIONS",
      sumT:"SUMMARY — SEAMANSHIP LESSON 4",
      sumP:["Breast line: perpendicular — prevents lateral ranging — let go first","Aft spring: departure pivot — let go last","Head line: first line passed when berthing — stabilises bow","Eye/bight: terminal loop — pass under if bollard occupied — never knot under tension","Med-Moor: anchor fwd + stern to quay — scope 4:1 min — common in Mediterranean","Departure order: breasts → head → stern → springs (aft spring last = pivot)","Safety: never in the axis of a taut line — snap-back zone is lethal","Auto-tension: winch adjusts tension with tide automatically","Make fast in figure-of-8: always 8-shape on cleat — never a knot","Radio dialogue: short orders — immediate confirmation — 'inboard' when line retrieved"],
      learnedP:["6 mooring line types and roles","Equipment: bollard, fairlead, fender, winch","Departure sequence and aft spring pivot","Med-Moor: anchor forward","Complete radio dialogues berthing + departure"],
    },
    es:{
      badge:"Seamanship · Leccion 4/5 · Premium · 180 XP",
      title:"Operaciones de Amarre",
      intro:"Amarrar un buque de 200 metros en una corriente de 2 nudos con 20 nudos de viento — sin margen de error.\n\nEsta leccion cubre los tipos de cabos, el equipo, la secuencia de salida y los dialogos completos puente-cubierta al atracar y al zarpar.",
      p1:"PARTE 1 — ESQUEMA DE AMARRE",s1t:"6 cabos: roles e interacciones",
      s1:"6 TIPOS DE CABOS:\nCabo de proa: retiene la PROA — anti-caida\nCabo de popa: retiene la POPA — anti-avance\nSpring de proa: diagonal proa→popa — anti-avance\nSpring de popa: diagonal popa→proa — anti-caida\nTravés de proa: perpendicular — anti-separacion proa\nTravés de popa: perpendicular — anti-separacion popa\n\nORDEN DE ATRAQUE:\n1. Proa → 2. Popa → 3. Springs → 4. Traveses\n\nORDEN DE SALIDA:\n1. Traveses → 2. Proa → 3. Popa → 4. Springs (popa=pivote, ultimo)",
      p2:"PARTE 2 — EQUIPAMIENTO",s2t:"Bolardo · Cornamusa · Guiacabos · Defensa · Guinche",
      s2:"LADO MUELLE:\nBolardo: T o doble-T acero — recibe la gaza\n→ 50-200 toneladas — 'Pasar la gaza por debajo si ocupado'\n\nLADO BUQUE:\nCornamusa: dos cuernos — en ocho — nunca nudo\nGuiacabos: guia-amarra — protege del rozamiento\nDefensa: cojin entre buque y muelle — min 3 por costado\nGuinche: auto-tension en grandes buques\n\nSEGURIDAD:\nNUNCA en el eje de una amarra tensa\nNUNCA cruzar una amarra tensa\nEPI: casco, chaleco, guantes",
      p3:"PARTE 3 — SECUENCIA DE SALIDA",s3t:"7 pasos — pivote con spring de popa",
      s3:"SECUENCIA ESTANDAR:\n1. Verificar maquinas, timon, helices\n2. Largar traveses proa y popa\n3. Largar cabo de proa\n4. Largar cabo de popa\n5. Maquina avante — spring popa = PIVOTE\n6. Proa gira hacia fuera\n7. Largar spring popa cuando proa despejada\n\nMed-Moor: ancla por la proa (scope 4:1 min) + popa al muelle",
      p4:"PARTE 4 — DIALOGOS DE RADIO",s4t:"Atraque Y Salida — Puente ↔ Cubierta",
      s4:"VOCABULARIO CLAVE:\n'Virar' : tensionar — 'Filar' : largar progresivamente\n'Gaza' : ojo terminal de la amarra — nunca nudo bajo tension\n'Largar' : soltar amarre del muelle — 'A bordo' : cabo recuperado\n\nPRINCIPIOS:\nOrdenes cortas y claras — Confirmacion inmediata\nRepetir ordenes criticas — Reportar anomalias",
      p5:"EJERCICIOS PRACTICOS",p6:"CASO REAL",p7:"BANCO — 15 PREGUNTAS",
      sumT:"RESUMEN — LECCION 4 SEAMANSHIP",
      sumP:["Través: perpendicular — anti-separacion lateral — primero en largarse","Spring de popa: pivote al zarpar — ultimo en largarse","Cabo de proa: primer cabo al atracar","Gaza: ojo terminal — pasar por debajo si bolardo ocupado — nunca nudo bajo tension","Med-Moor: ancla proa + popa muelle — scope 4:1 min","Orden zarpe: traveses → proa → popa → springs (popa=pivote)","Seguridad: nunca en eje amarra tensa — zona snap-back letal","Auto-tension: guinche adapta tension segun marea","Amarre en ocho: siempre en 8 en cornamusa — nunca nudo","Radio: ordenes cortas — confirmacion inmediata — 'a bordo' cuando cabo recogido"],
      learnedP:["6 tipos de cabos y sus roles","Equipo: bolardo, guiacabos, defensa, guinche","Secuencia de salida y pivote spring popa","Med-Moor: ancla por la proa","Dialogos radio completos atraque + salida"],
    },
    pt:{
      badge:"Seamanship · Licao 4/5 · Premium · 180 XP",
      title:"Operacoes de Amarracao",
      intro:"Amarrar um navio de 200 metros numa corrente de 2 nos com 20 nos de vento — sem margem de erro.\n\nEsta licao cobre os tipos de cabos, o equipamento, a sequencia de partida e os dialogos completos ponte-convés ao atracar e ao zarpar.",
      p1:"PARTE 1 — ESQUEMA DE AMARRACAO",s1t:"6 cabos: papeis e interacoes",
      s1:"6 TIPOS DE CABOS:\nCabo de proa: retém a PROA — anti-caca\nCabo de popa: retém a POPA — anti-avanco\nSpring de proa: diagonal proa→popa — anti-avanco\nSpring de popa: diagonal popa→vante — anti-caca\nTravés de proa: perpendicular — anti-afastamento proa\nTravés de popa: perpendicular — anti-afastamento popa\n\nORDEM DE ATRAQUE:\n1. Proa → 2. Popa → 3. Springs → 4. Traveses\n\nORDEM DE PARTIDA:\n1. Traveses → 2. Proa → 3. Popa → 4. Springs (popa=pivo, ultimo)",
      p2:"PARTE 2 — EQUIPAMENTO",s2t:"Cabeco · Cunho · Guia-cabos · Defensa · Guincho",
      s2:"LADO CAIS:\nCabeco: T ou duplo-T aco — recebe a gaza\n→ 50-200 toneladas — 'Passar a gaza por baixo se ocupado'\n\nLADO NAVIO:\nCunho: dois cornos — em oito — nunca no\nGuia-cabos: guia-amarra — protege do desgaste\nDefensa: almofada entre navio e cais — min 3 por costado\nGuincho: auto-tensao em grandes navios\n\nSEGURANCA:\nNUNCA no eixo de uma amarra tensa\nNUNCA atravessar uma amarra tensa\nEPI: capacete, colete, luvas",
      p3:"PARTE 3 — SEQUENCIA DE PARTIDA",s3t:"7 passos — pivo com spring de popa",
      s3:"SEQUENCIA PADRAO:\n1. Verificar maquinas, leme, helices\n2. Largar traveses proa e popa\n3. Largar cabo de proa\n4. Largar cabo de popa\n5. Maquina avante — spring popa = PIVO\n6. Proa gira para fora\n7. Largar spring popa quando proa livre\n\nMed-Moor: ancora pela proa (scope 4:1 min) + popa ao cais",
      p4:"PARTE 4 — DIALOGOS DE RADIO",s4t:"Atracacao E Partida — Ponte ↔ Convés",
      s4:"VOCABULARIO CHAVE:\n'Virar' : tensionar — 'Largar' : largar progressivamente\n'Gaza' : elo terminal da amarra — nunca no sob tensao\n'Largar' : soltar amarra do cais — 'A bordo' : cabo recuperado\n\nPRINCIPIOS:\nOrdens curtas e claras — Confirmacao imediata\nRepetir ordens criticas — Reportar anomalias",
      p5:"EXERCICIOS PRATICOS",p6:"CASO REAL",p7:"BANCO — 15 QUESTOES",
      sumT:"RESUMO — LICAO 4 SEAMANSHIP",
      sumP:["Través: perpendicular — anti-afastamento lateral — primeiro a largar","Spring de popa: pivo ao zarpar — ultimo a largar","Cabo de proa: primeiro cabo ao atracar","Gaza: elo terminal — passar por baixo se cabeco ocupado — nunca no sob tensao","Med-Moor: ancora proa + popa cais — scope 4:1 min","Ordem partida: traveses → proa → popa → springs (popa=pivo)","Seguranca: nunca no eixo de amarra tensa — zona snap-back letal","Auto-tensao: guincho adapta tensao com a mare","Amarra em oito: sempre em 8 no cunho — nunca no","Radio: ordens curtas — confirmacao imediata — 'a bordo' quando cabo recolhido"],
      learnedP:["6 tipos de cabos e os seus papeis","Equipamento: cabeco, guia-cabos, defensa, guincho","Sequencia de partida e pivo spring popa","Med-Moor: ancora pela proa","Dialogos radio completos atracacao + partida"],
    },
  };
  return d[lang]||d.fr;
};

function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);
  const d={
    fr:{title:"MV CMA CGM LIBRA — Port de Rotterdam (2019)",
      teaser:"Porte-conteneurs 14 000 EVP — Rupture amarre — Matelot blesse — Zone snap-back non balisee",
      what:"Lors de l'appareillage du MV CMA CGM Libra a Rotterdam, une amarre principale en polyester cede sous l'effort combine du vent (25 noeuds) et du courant de maree. L'amarre fouette violemment sur le pont et blesse gravement un matelot qui se trouvait dans la zone de snap-back. L'enquete revele que la zone de fouettement n'etait pas balisee et que le matelot n'avait pas ete informe du risque.",
      cause:"- Zone de snap-back non signalisee sur le pont\n- Matelot non informe des risques de fouettement\n- Manque de formation specifique securite amarrage\n- Amarre polyester sous forte tension sans alarme\n- Vent 25 noeuds : renforcement des amarres non effectue",
      lessons:"- Balisage obligatoire des zones de snap-back sur tous les ponts\n- Formation obligatoire : risques amarrage, EPI, zones interdites\n- Renforcer les amarres si vent > force 6\n- Inspections visuelles regulieres des amarres sous tension\n- Protocole 'zone libre' avant tout mouvement d'amarre\n- Circulaire MSC.1/Circ.1234 : directives securite amarrage IMO",
      link:"Lien L4 Amarrage : Le snap-back tue. Une amarre en polyester sous 100 tonnes de tension libere une energie equivalente a une voiture lancee a 200 km/h. La zone de securite (6m autour de l'amarre + son axe) doit toujours etre degagee avant toute action d'amarrage."},
    en:{title:"MV CMA CGM LIBRA — Port of Rotterdam (2019)",
      teaser:"14,000 TEU container ship — Mooring line parted — Sailor injured — Snap-back zone not marked",
      what:"During MV CMA CGM Libra's departure from Rotterdam, a main polyester mooring line parted under the combined load of wind (25 knots) and tidal current. The line whipped violently across the deck and seriously injured a sailor who was in the snap-back zone. The investigation revealed the snap-back zone was not marked and the sailor had not been briefed on the risk.",
      cause:"- Snap-back zone not marked on deck\n- Sailor not briefed on whipping risks\n- Lack of specific mooring safety training\n- Polyester line under high tension without alarm\n- Wind 25 knots: line reinforcement not carried out",
      lessons:"- Mandatory snap-back zone marking on all decks\n- Mandatory training: mooring risks, PPE, prohibited zones\n- Reinforce lines if wind > force 6\n- Regular visual inspections of mooring lines under tension\n- 'Clear zone' protocol before any line movement\n- MSC.1/Circ.1234: IMO mooring safety guidelines",
      link:"L4 Mooring link: Snap-back kills. A polyester mooring line under 100 tonnes of tension releases energy equivalent to a car at 200 km/h. The safety zone (6m around line + its axis) must always be clear before any mooring action."},
    es:{title:"MV CMA CGM LIBRA — Puerto de Rotterdam (2019)",
      teaser:"Portacontenedores 14.000 TEU — Rotura de amarra — Marinero herido — Zona snap-back no senalizada",
      what:"Durante la salida del MV CMA CGM Libra de Rotterdam, una amarra principal de poliester cedio bajo el esfuerzo combinado del viento (25 nudos) y la corriente de marea. La amarra azoto violentamente la cubierta e hirio gravemente a un marinero en la zona de snap-back.",
      cause:"- Zona snap-back no senalizada en cubierta\n- Marinero no informado de los riesgos de azotazo\n- Falta de formacion especifica en seguridad de amarre\n- Viento 25 nudos: refuerzo de amarras no realizado",
      lessons:"- Senalizacion obligatoria zonas snap-back en cubierta\n- Formacion obligatoria: riesgos amarre, EPI, zonas prohibidas\n- Reforzar amarras si viento > fuerza 6\n- Protocolo 'zona libre' antes de cualquier movimiento de amarre",
      link:"Vinculo L4 Amarre: El snap-back mata. Una amarra de poliester bajo 100 toneladas libera energia equivalente a un coche a 200 km/h."},
    pt:{title:"MV CMA CGM LIBRA — Porto de Roterdao (2019)",
      teaser:"Porta-contentores 14.000 TEU — Rotura de amarra — Marinheiro ferido — Zona snap-back nao sinalizada",
      what:"Durante a partida do MV CMA CGM Libra de Roterdao, uma amarra principal de poliester cedeu sob o esforco combinado do vento (25 nos) e da corrente de mare. A amarra chicoteou violentamente no convés e feriu gravemente um marinheiro na zona de snap-back.",
      cause:"- Zona snap-back nao sinalizada no convés\n- Marinheiro nao informado dos riscos de chicoteamento\n- Falta de formacao especifica em seguranca de amarracao\n- Vento 25 nos: reforco das amarras nao efetuado",
      lessons:"- Sinalizacao obrigatoria zonas snap-back em todos os conveses\n- Formacao obrigatoria: riscos amarracao, EPI, zonas proibidas\n- Reforcar amarras se vento > forca 6\n- Protocolo 'zona livre' antes de qualquer movimento de amarra",
      link:"Ligacao L4 Amarracao: O snap-back mata. Uma amarra de poliester sob 100 toneladas liberta energia equivalente a um carro a 200 km/h."},
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

export default function LessonSEA_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  useEffect(()=>{if(typeof window!=="undefined")window.__MAP_LANG__=lang;},[lang]);
  const t=T[lang]||T.fr;
  const quiz=QUIZ[lang]||QUIZ.fr;
  const lc=getContent(lang);
  const [phase,setPhase]=useState("content");
  const [quizScore,setQuizScore]=useState(0);
  const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  const trophy=getTrophy(quizScore,5);

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
              {lang==="fr"?"Lecon 4/5":lang==="en"?"Lesson 4/5":lang==="es"?"Leccion 4/5":"Licao 4/5"}
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
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.gold}44`,
              borderLeft:`3px solid ${C.gold}`,borderRadius:20,padding:"16px",marginBottom:16}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.88)",lineHeight:1.9,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </div>

            {[
              {icon:"🔵",p:lc.p1,s:lc.s1t,content:lc.s1,color:C.headline,
                svg:<MooringSchemaSVG lang={lang}/>,
                svgLabel:lang==="fr"?"SCHEMA AMARRAGE — INTERACTIF":lang==="en"?"MOORING DIAGRAM — INTERACTIVE":lang==="es"?"ESQUEMA AMARRE — INTERACTIVO":"ESQUEMA AMARRACAO — INTERATIVO"},
              {icon:"⚙️",p:lc.p2,s:lc.s2t,content:lc.s2,color:C.gold2,
                svg:<MooringEquipSVG lang={lang}/>,
                svgLabel:lang==="fr"?"EQUIPEMENTS — INTERACTIF":lang==="en"?"EQUIPMENT — INTERACTIVE":lang==="es"?"EQUIPAMIENTO — INTERACTIVO":"EQUIPAMENTO — INTERATIVO"},
              {icon:"⚓",p:lc.p3,s:lc.s3t,content:lc.s3,color:C.amber,
                svg:<DepartureSVG lang={lang}/>,
                svgLabel:lang==="fr"?"SEQUENCE APPAREILLAGE — INTERACTIF":lang==="en"?"DEPARTURE SEQUENCE — INTERACTIVE":lang==="es"?"SECUENCIA SALIDA — INTERACTIVO":"SEQUENCIA PARTIDA — INTERATIVO"},
              {icon:"📻",p:lc.p4,s:lc.s4t,content:lc.s4,color:C.cyan2,
                svg:<RadioDialogueSVG lang={lang}/>,
                svgLabel:lang==="fr"?"DIALOGUES RADIO — ACCOSTAGE & APPAREILLAGE":lang==="en"?"RADIO DIALOGUES — BERTHING & DEPARTURE":lang==="es"?"DIALOGOS RADIO — ATRAQUE & SALIDA":"DIALOGOS RADIO — ATRACACAO & PARTIDA"},
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
              <QuestionBank lang={lang}/>
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

            <button onClick={()=>setPhase("quiz")}
              style={{width:"100%",padding:"18px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${C.gold},${C.amber})`,
                fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:900,letterSpacing:2,
                color:C.bg0,cursor:"pointer",boxShadow:`0 10px 40px rgba(201,146,42,0.35)`,marginTop:4}}>
              {t.startQuiz}
            </button>
            <div style={{textAlign:"center",fontSize:11,color:C.dim,marginTop:10}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:19,fontWeight:800,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Operations d'Amarrage":lang==="en"?"Quiz — Mooring Operations":lang==="es"?"Quiz — Operaciones de Amarre":"Quiz — Operacoes de Amarracao"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · Seamanship L4</div>
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
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 22px",
                borderRadius:20,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,
                fontSize:14,color:C.gold2,fontWeight:800}}>
                +{quizScore>=4?180:quizScore===3?110:60} {t.xp} ⭐
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
            <button onClick={onComplete}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${C.gold},${C.amber})`,
                fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:900,letterSpacing:2,
                color:C.bg0,cursor:"pointer",boxShadow:`0 8px 30px rgba(201,146,42,0.3)`,marginBottom:12}}>
              {lang==="fr"?"LECON 5 — STABILITE =>":lang==="en"?"LESSON 5 — STABILITY =>":lang==="es"?"LECCION 5 — ESTABILIDAD =>":"LICAO 5 — ESTABILIDADE =>"}
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
