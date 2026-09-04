import { useState, useEffect } from "react";
import { shuffleQuestionOptions, QuizComp, QuestionBank } from "./LessonShared";

const C = {
  bg0:"#03070f", bg1:"#060e1a", bg2:"#0a1628", bg3:"#0d1f3c",
  amber:"#ffb300", amber2:"#ffd54f",
  cyan:"#00e5ff", cyan2:"#80deea",
  steel:"#455a64", steel2:"#78909c", steel3:"#b0bec5",
  green:"#00e676", green2:"#69f0ae",
  red:"#ff1744", red2:"#ff5252",
  orange:"#ff6d00", orange2:"#ff9e40",
  blue:"#2979ff", blue2:"#82b1ff",
  teal:"#0a8a6c", teal2:"#26c6da",
  gold:"#c9922a", gold2:"#e8b94f",
  sand:"#c8a96e", rock:"#8b7355", mud:"#6b5a3e", weed:"#4a8c3f",
  anchor:"#7eb8d4", chain:"#94a3b8",
  white:"#f0f4ff", muted:"rgba(176,190,197,0.7)", dim:"rgba(176,190,197,0.35)",
  border:"rgba(201,146,42,0.22)", borderC:"rgba(0,229,255,0.18)",
};

const T = {
  fr:{ back:"◀ Retour", module:"Seamanship", quiz:"QUIZ",
    question:"Question", ofQ:"sur", correct:"✓ Bonne reponse!", wrong:"✗ Mauvaise reponse",
    expl:"Explication:", next:"SUIVANT =>", finish:"VOIR MON SCORE =>",
    startQuiz:"COMMENCER LE QUIZ", startBank:"✅ COMMENCER =>", backDash:"<= RETOUR AU DASHBOARD",
    youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz",
    showCorr:"Voir la correction", hideCorr:"Masquer", xp:"XP gagnes",
    scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚" },
  en:{ back:"◀ Back", module:"Seamanship", quiz:"QUIZ",
    question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer",
    expl:"Explanation:", next:"NEXT =>", finish:"SEE MY SCORE =>",
    startQuiz:"START QUIZ", startBank:"✅ START =>", backDash:"<= BACK TO DASHBOARD",
    youLearned:"You learned:", readFirst:"Read the content then start the quiz",
    showCorr:"Show correction", hideCorr:"Hide", xp:"XP earned",
    scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚" },
  es:{ back:"◀ Volver", module:"Seamanship", quiz:"QUIZ",
    question:"Pregunta", ofQ:"de", correct:"✓ Correcta!", wrong:"✗ Incorrecta",
    expl:"Explicacion:", next:"SIGUIENTE =>", finish:"VER PUNTUACION =>",
    startQuiz:"EMPEZAR QUIZ", startBank:"✅ EMPEZAR =>", backDash:"<= VOLVER AL PANEL",
    youLearned:"Has aprendido:", readFirst:"Lee y luego comienza",
    showCorr:"Ver correccion", hideCorr:"Ocultar", xp:"XP ganados",
    scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚" },
  pt:{ back:"◀ Voltar", module:"Seamanship", quiz:"QUIZ",
    question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada",
    expl:"Explicacao:", next:"PROXIMO =>", finish:"VER PONTUACAO =>",
    startQuiz:"COMECAR QUIZ", startBank:"✅ COMEÇAR =>", backDash:"<= VOLTAR AO PAINEL",
    youLearned:"Voce aprendeu:", readFirst:"Leia o conteudo e depois comece",
    showCorr:"Ver correcao", hideCorr:"Ocultar", xp:"XP ganhos",
    scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚" },
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
        justifyContent:"center",fontSize:19,flexShrink:0,
        boxShadow:`0 0 12px ${color}20`}}>{icon}</div>
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
// SVG 1 — TYPES D'ANCRES INTERACTIF
// ══════════════════════════════════════
function AnchorTypesSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [selected, setSelected] = useState("hall");

  const anchors = [
    { id:"hall", name:"Hall", icon:"⚓",
      usage:lbl("Standard navires marchands 1-20t","Standard merchant ships 1-20t","Estandar buques mercantes 1-20t","Padrao navios mercantes 1-20t"),
      holding:85, weight:lbl("1 à 20 tonnes","1 to 20 tons","1 a 20 toneladas","1 a 20 toneladas"),
      best:lbl("Sable, vase — bonne tenue universelle","Sand, mud — good universal holding","Arena, fango — buena retencion universal","Areia, vasa — boa retencao universal"),
      bad:lbl("Roche — risque coincement","Rock — jamming risk","Roca — riesgo de enganche","Rocha — risco de encravamento"),
      color:C.anchor },
    { id:"danforth", name:"Danforth", icon:"🔱",
      usage:lbl("Plaisance, petits navires","Leisure, small vessels","Nautica, embarcaciones pequenas","Nautica, embarcacoes pequenas"),
      holding:92, weight:lbl("5 à 100 kg","5 to 100 kg","5 a 100 kg","5 a 100 kg"),
      best:lbl("Sable — tenue exceptionnelle par rapport au poids","Sand — exceptional holding for weight","Arena — retencion excepcional para el peso","Areia — retencao excepcional para o peso"),
      bad:lbl("Roche, herbes — mauvaise penetration","Rock, weed — poor penetration","Roca, algas — mala penetracion","Rocha, ervas — ma penetracao"),
      color:C.teal2 },
    { id:"cqr", name:"CQR / Charrue", icon:"🪝",
      usage:lbl("Voiliers, plaisance hauturiere","Sailing yachts, offshore leisure","Veleros, nautica de altura","Veleiros, nautica de altura"),
      holding:88, weight:lbl("5 à 45 kg","5 to 45 kg","5 a 45 kg","5 a 45 kg"),
      best:lbl("Sable, vase, herbier — bonne penetration","Sand, mud, weed — good penetration","Arena, fango, hierba — buena penetracion","Areia, vasa, ervas — boa penetracao"),
      bad:lbl("Roche — risque de perte","Rock — loss risk","Roca — riesgo de perdida","Rocha — risco de perda"),
      color:C.amber },
    { id:"bbruce", name:"Bruce / Griffon", icon:"⚙️",
      usage:lbl("Plates-formes offshore, supply","Offshore platforms, supply vessels","Plataformas offshore, supply","Plataformas offshore, supply"),
      holding:90, weight:lbl("10 à 500 kg","10 to 500 kg","10 a 500 kg","10 a 500 kg"),
      best:lbl("Sable, vase — pose rapide automatique","Sand, mud — fast automatic setting","Arena, fango — posicion rapida automatica","Areia, vasa — posicao rapida automatica"),
      bad:lbl("Galet, roche — tenue limitee","Shingle, rock — limited holding","Canto, roca — retencion limitada","Calhaus, rocha — retencao limitada"),
      color:C.orange2 },
    { id:"grappel", name:lbl("Grappin","Grapnel","Garfio","Grapnel"), icon:"🗝️",
      usage:lbl("Dinghies, annexes, recuperation","Dinghies, tenders, recovery","Botes, auxiliares, recuperacion","Botes, auxiliares, recuperacao"),
      holding:60, weight:lbl("1 à 10 kg","1 to 10 kg","1 a 10 kg","1 a 10 kg"),
      best:lbl("Roche, debris — accroche mecanique","Rock, debris — mechanical grip","Roca, escombros — agarre mecanico","Rocha, detritos — agarre mecanico"),
      bad:lbl("Sable — glisse facilement","Sand — slides easily","Arena — desliza facilmente","Areia — desliza facilmente"),
      color:C.steel2 },
  ];

  const sel = anchors.find(a => a.id === selected);
  const W = 290; const H = 140;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        {/* eau */}
        <rect x={0} y={70} width={W} height={70} fill="rgba(41,121,255,0.08)" rx="0"/>
        <text x={W/2} y={85} textAnchor="middle" fontSize="7" fill="rgba(130,177,255,0.4)">~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~</text>
        {/* fond marin */}
        <rect x={0} y={110} width={W} height={30} fill="rgba(200,169,110,0.15)" rx="0"/>
        <text x={8} y={122} fontSize="7" fill={C.sand} opacity="0.6">S S S S S S S S S S S S S S S S S S S S S S S</text>
        {/* ancres */}
        {anchors.map((a,i) => {
          const x = 24 + i*52;
          const isSel = selected===a.id;
          return (
            <g key={a.id} style={{cursor:"pointer"}} onClick={()=>setSelected(a.id)}>
              {/* chaine */}
              {isSel && <line x1={x} y1={30} x2={x} y2={105} stroke={C.chain} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6"/>}
              {/* ancre */}
              <circle cx={x} cy={isSel?105:95} r={isSel?13:9}
                fill={isSel?`${a.color}22`:`${a.color}0a`}
                stroke={a.color} strokeWidth={isSel?2:1}/>
              <text x={x} y={isSel?109:99} textAnchor="middle" fontSize={isSel?14:11}>{a.icon}</text>
              <text x={x} y={isSel?26:20} textAnchor="middle" fontSize="7"
                fill={isSel?a.color:C.muted} fontWeight={isSel?"800":"400"}>{a.name}</text>
              {/* tenue bar */}
              {isSel && (
                <g>
                  <rect x={x-16} y={32} width={32} height={4} rx="2" fill="rgba(255,255,255,0.07)"/>
                  <rect x={x-16} y={32} width={32*a.holding/100} height={4} rx="2" fill={a.color}/>
                </g>
              )}
            </g>
          );
        })}
        <text x={W/2} y={H-4} textAnchor="middle" fontSize="6.5" fill={C.dim}>
          {lbl("Toucher une ancre","Tap an anchor","Tocar un ancla","Tocar uma ancora")}
        </text>
      </svg>
      {sel && (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:14,
          background:`${sel.color}0e`,border:`1px solid ${sel.color}44`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <span style={{fontSize:20}}>{sel.icon}</span>
            <div>
              <div style={{fontSize:13,fontWeight:800,color:sel.color}}>{sel.name}</div>
              <div style={{fontSize:9,color:C.muted}}>{sel.usage} · {sel.weight}</div>
            </div>
            <div style={{marginLeft:"auto",textAlign:"right"}}>
              <div style={{fontSize:9,color:C.muted,marginBottom:2}}>
                {lbl("Tenue","Holding","Retencion","Retencao")}
              </div>
              <div style={{fontSize:14,fontWeight:800,color:sel.color}}>{sel.holding}%</div>
            </div>
          </div>
          <div style={{fontSize:10,color:C.green2,marginBottom:3}}>✓ {sel.best}</div>
          <div style={{fontSize:10,color:C.red2}}>✗ {sel.bad}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — APPARAUX DE MOUILLAGE
// ══════════════════════════════════════
function ApparauxSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [selected, setSelected] = useState(null);

  const items = [
    { id:"guindeau", x:30, y:20, w:70, h:44, icon:"⚙️", color:C.teal2,
      label:lbl("Guindeau","Windlass","Molinete","Molinete"),
      desc:lbl("Machine electrique/hydraulique servant a virer (remonter) ou filer (laisser aller) la chaine. Commandes : poste passerelle + commande locale pont. Frein : contre-racle ou frein de gueuse. Puissance : 50-200 kW sur VLCC.",
        "Electric/hydraulic machine used to heave (bring in) or veer (pay out) the chain. Controls: bridge station + local deck control. Brake: devil's claw or band brake. Power: 50-200 kW on VLCC.",
        "Maquina electrica/hidraulica para virar (cobrar) o filar (largar) la cadena. Controles: puente + control local cubierta. Freno: garra del diablo o freno de banda. Potencia: 50-200 kW en VLCC.",
        "Maquina eletrica/hidraulica para virar (cobrar) ou filar (largar) a corrente. Controlos: ponte + controlo local convés. Travao: garra do diabo ou travao de banda. Potencia: 50-200 kW num VLCC.") },
    { id:"ecubier", x:115, y:8, w:60, h:44, icon:"🔩", color:C.anchor,
      desc:lbl("Tube en acier incurve guide la chaine entre le guindeau et l'eau. Positionne en avant du bossoir. L'ancre se loge dans l'ecubier quand elle est levee. Taille : proportionnelle au diametre de la chaine.",
        "Curved steel tube guiding the chain between the windlass and the water. Positioned forward of the hawse. The anchor rests in the hawsepipe when raised. Size: proportional to chain diameter.",
        "Tubo de acero curvo que guia la cadena entre el molinete y el agua. Posicionado a proa del escobero. El ancla descansa en el escobero cuando esta levada. Tamano: proporcional al diametro de la cadena.",
        "Tubo de aco curvo que guia a corrente entre o molinete e a agua. Posicionado a vante do escovem. A ancora repousa no escovem quando levada. Tamanho: proporcional ao diametro da corrente."),
      label:lbl("Ecubier","Hawsepipe","Escobero","Escovem") },
    { id:"chaine", x:190, y:8, w:80, h:44, icon:"⛓️", color:C.chain,
      desc:lbl("Chaine calibree en acier haute resistance. 1 ecaille = 27,5 m (standard IMO). Maillons : droit, tournant, emerillon, manille de jonction. Diametre : 50-100 mm sur grands navires. Marquage tous les 27,5 m : nombre de manilles de couleur.",
        "Calibrated high-strength steel chain. 1 shackle = 27.5 m (IMO standard). Links: straight, swivel, shackle, joining shackle. Diameter: 50-100 mm on large vessels. Marking every 27.5 m: number of colored shackles.",
        "Cadena calibrada de acero de alta resistencia. 1 grillete = 27,5 m (estandar OMI). Eslabones: recto, giratorio, emerillon, grillete de union. Diametro: 50-100 mm en grandes buques. Marcado cada 27,5 m: numero de grilletes de color.",
        "Corrente calibrada de aco de alta resistencia. 1 manilha = 27,5 m (padrao IMO). Elos: reto, giratorio, emerilhao, manilha de uniao. Diametro: 50-100 mm em grandes navios. Marcacao a cada 27,5 m: numero de manilhas coloridas."),
      label:lbl("Chaine / Ecaille","Chain / Shackle","Cadena / Grillete","Corrente / Manilha") },
    { id:"puits", x:30, y:78, w:70, h:44, icon:"🕳️", color:C.steel2,
      desc:lbl("Compartiment etanche sous le pont avant qui stocke la chaine apres virage. Le puits evite que la chaine s'etale sur le pont. Drainage : bouchon de fond. Inspection reguliere : corrosion, mazout, etancheite couvercle.",
        "Watertight compartment below the foredeck storing the chain after heaving. The chain locker prevents chain spreading on deck. Drainage: drain plug. Regular inspection: corrosion, oil, cover watertightness.",
        "Compartimento estanco bajo la cubierta de proa que almacena la cadena despues de virarla. El pocete evita que la cadena se esparza por cubierta. Drenaje: tapon de fondo. Inspeccion regular: corrosion, aceite, estanqueidad tapa.",
        "Compartimento estanque sob o convés de vante que armazena a corrente apos virar. O pocete evita que a corrente se espalhe no convés. Drenagem: tampao de fundo. Inspecao regular: corrosao, oleo, estanqueidade da tampa."),
      label:lbl("Puits a chaine","Chain locker","Pocete de cadena","Pocete de corrente") },
    { id:"bossoir", x:115, y:78, w:60, h:44, icon:"🔗", color:C.amber,
      desc:lbl("Structure metallique en proue qui supporte l'ancre hors de l'eau et guide l'ecubier. Parfois equipe d'un frein de gueuse (devil's claw) qui bloque la chaine independamment du guindeau. Essentiel pour la securite en navigation.",
        "Metal structure at the bow supporting the anchor out of the water and guiding the hawsepipe. Sometimes equipped with a devil's claw brake that locks the chain independently from the windlass. Essential for safety underway.",
        "Estructura metalica en la proa que soporta el ancla fuera del agua y guia el escobero. A veces equipado con una garra del diablo que bloquea la cadena independientemente del molinete. Esencial para la seguridad en navegacion.",
        "Estrutura metalica na proa que suporta a ancora fora da agua e guia o escovem. Por vezes equipado com uma garra do diabo que bloqueia a corrente independentemente do molinete. Essencial para a seguranca em navegacao."),
      label:lbl("Bossoir / Frein","Hawse / D-Claw","Escobero / Garra","Escovem / Garra") },
    { id:"orinque", x:190, y:78, w:80, h:44, icon:"🪢", color:C.green,
      desc:lbl("Bout leger (polypropylene flottant) reliant la couronne de l'ancre a une boue de surface. Permet de recuperer l'ancre coincee en fond rocheux en tirant par le bas. Diametre : 16-20mm. Longueur : profondeur + 20%. Obligatoire en fond rocheux.",
        "Light line (floating polypropylene) connecting the anchor crown to a surface buoy. Allows recovery of an anchor stuck in rocky bottom by pulling from below. Diameter: 16-20mm. Length: depth + 20%. Mandatory on rocky bottom.",
        "Cabo ligero (polipropileno flotante) que une la corona del ancla a una boya de superficie. Permite recuperar el ancla encallada en fondo rocoso tirando desde abajo. Diametro: 16-20mm. Longitud: profundidad + 20%. Obligatorio en fondo rocoso.",
        "Cabo leve (polipropileno flutuante) ligando a coroa da ancora a uma boia de superficie. Permite recuperar a ancora encravada em fundo rochoso puxando por baixo. Diametro: 16-20mm. Comprimento: profundidade + 20%. Obrigatorio em fundo rochoso."),
      label:lbl("Orinque / Boue","Trip line / Buoy","Orinque / Boya","Orinque / Boia") },
  ];

  const sel = items.find(i => i.id === selected);
  const W = 290; const H = 134;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        {/* titre */}
        <text x={W/2} y={12} textAnchor="middle" fontSize="7" fill={C.gold2} fontFamily="'Cinzel',serif" letterSpacing="1">
          {lbl("APPARAUX DE MOUILLAGE","ANCHORING EQUIPMENT","APARATOS DE FONDEO","APARELHOS DE FUNDEIO")}
        </text>
        {items.map(item => {
          const isSel = selected===item.id;
          return (
            <g key={item.id} style={{cursor:"pointer"}} onClick={()=>setSelected(selected===item.id?null:item.id)}>
              <rect x={item.x} y={item.y+8} width={item.w} height={item.h} rx="6"
                fill={isSel?`${item.color}18`:`${item.color}07`}
                stroke={isSel?item.color:`${item.color}44`} strokeWidth={isSel?1.8:0.9}/>
              <text x={item.x+item.w/2} y={item.y+26} textAnchor="middle" fontSize="14">{item.icon}</text>
              <text x={item.x+item.w/2} y={item.y+38} textAnchor="middle" fontSize="6"
                fill={isSel?item.color:C.muted} fontWeight={isSel?"800":"400"}>{item.label}</text>
              {isSel && <circle cx={item.x+item.w-6} cy={item.y+14} r="4" fill={C.green}/>}
            </g>
          );
        })}
      </svg>
      {sel ? (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:14,
          background:`${sel.color}0e`,border:`1px solid ${sel.color}44`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
            <span style={{fontSize:18}}>{sel.icon}</span>
            <span style={{fontSize:12,fontWeight:800,color:sel.color}}>{sel.label}</span>
          </div>
          <div style={{fontSize:10,color:C.steel3,lineHeight:1.6}}>{sel.desc}</div>
        </div>
      ) : (
        <div style={{marginTop:8,padding:"7px 12px",borderRadius:10,
          background:"rgba(201,146,42,0.05)",border:`1px solid ${C.border}`,
          fontSize:10,color:C.steel3,textAlign:"center"}}>
          {lbl("Toucher un appareil pour les details","Tap equipment for details","Tocar un aparato para detalles","Tocar um aparelho para detalhes")}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — TYPES DE FONDS
// ══════════════════════════════════════
function SeabedSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [selected, setSelected] = useState("sand");

  const beds = [
    { id:"sand", symbol:"S", label:lbl("Sable","Sand","Arena","Areia"), color:C.sand,
      holding:lbl("EXCELLENTE","EXCELLENT","EXCELENTE","EXCELENTE"), score:95,
      tip:lbl("Fond ideal : l'ancre penetrante facilement. Scope 3:1 par beau temps suffisant. Verifier regulierement car le sable peut se liquefier par forte houle.",
        "Ideal bottom: anchor penetrates easily. Scope 3:1 in fair weather sufficient. Check regularly as sand can liquefy in heavy swell.",
        "Fondo ideal: el ancla penetra facilmente. Scope 3:1 con buen tiempo suficiente. Verificar regularmente ya que la arena puede licuarse con fuerte marejada.",
        "Fundo ideal: a ancora penetra facilmente. Scope 3:1 com bom tempo suficiente. Verificar regularmente pois a areia pode liquefazer com forte ondulacao."),
      icon:"🏖️" },
    { id:"mud", symbol:"M", label:lbl("Vase / Boue","Mud","Fango","Vasa"), color:C.mud,
      holding:lbl("BONNE","GOOD","BUENA","BOA"), score:78,
      tip:lbl("Bonne tenue mais l'ancre peut etre difficile a lever (suction). Augmenter le scope de 20%. Attention a la visibilite de l'eau : turbide = fond vaseux.",
        "Good holding but anchor may be difficult to weigh (suction). Increase scope by 20%. Watch water visibility: turbid = muddy bottom.",
        "Buena retencion pero el ancla puede ser dificil de levar (succion). Aumentar el scope un 20%. Atender a la visibilidad del agua: turbia = fondo fangoso.",
        "Boa retencao mas ancora pode ser dificil de levar (succao). Aumentar scope 20%. Atencao a visibilidade da agua: turva = fundo vasoso."),
      icon:"🌊" },
    { id:"rock", symbol:"R", label:lbl("Roche","Rock","Roca","Rocha"), color:C.rock,
      holding:lbl("TRES MAUVAISE","VERY POOR","MUY MALA","MUITO MA"), score:20,
      tip:lbl("EVITER : ancre se coince dans les failles rocheuses. Si obligatoire : mouiller avec orinque obligatoirement. Scope maximum. Surveiller en permanence.",
        "AVOID: anchor jams in rock crevices. If unavoidable: anchor with trip line mandatory. Maximum scope. Monitor continuously.",
        "EVITAR: el ancla se engancha en grietas rocosas. Si es obligatorio: fondear con orinque obligatoriamente. Scope maximo. Vigilar permanentemente.",
        "EVITAR: ancora encrava em fissuras rochosas. Se inevitavel: fundeiar com orinque obrigatoriamente. Scope maximo. Vigiar permanentemente."),
      icon:"🪨" },
    { id:"weed", symbol:"Wd", label:lbl("Herbier / Posidonie","Weed / Posidonia","Hierba / Posidonia","Erva / Posidonia"), color:C.weed,
      holding:lbl("TRES MAUVAISE","VERY POOR","MUY MALA","MUITO MA"), score:15,
      tip:lbl("INTERDIT en Mediterranee : la posidonie est une espece protegee (loi 88-1261). Amende jusqu'a 150 000 euros. Utiliser les corps-morts reglementes. Reconnaitre : eau verte-brune, vegetation visible.",
        "PROHIBITED in Mediterranean: posidonia is a protected species (law 88-1261). Fine up to 150,000 euros. Use designated mooring buoys. Identify: greenish-brown water, visible vegetation.",
        "PROHIBIDO en el Mediterraneo: la posidonia es una especie protegida (ley 88-1261). Multa de hasta 150.000 euros. Usar cuerpos muertos reglamentados. Reconocer: agua verde-marron, vegetacion visible.",
        "PROIBIDO no Mediterraneo: a posidonia e uma especie protegida (lei 88-1261). Multa ate 150.000 euros. Usar corpos mortos regulamentados. Reconhecer: agua verde-castanha, vegetacao visivel."),
      icon:"🌿" },
    { id:"gravel", symbol:"G", label:lbl("Gravier / Galet","Gravel / Shingle","Grava / Canto","Gravilha / Calhaus"), color:C.steel2,
      holding:lbl("MEDIOCRE","POOR","MEDIOCRE","MEDIOCRE"), score:40,
      tip:lbl("Tenue aleatoire : les galets roulent sous l'ancre. Utiliser une ancre type Hall lourde. Scope minimum 5:1. Surveiller en permanence. Preferer une zone de sable ou vase proche.",
        "Unreliable holding: shingle rolls under the anchor. Use a heavy Hall-type anchor. Minimum scope 5:1. Monitor continuously. Prefer a nearby sand or mud area.",
        "Retencion aleatoria: los cantos ruedan bajo el ancla. Usar ancla tipo Hall pesada. Scope minimo 5:1. Vigilar permanentemente. Preferir una zona de arena o fango cercana.",
        "Retencao aleatoria: os calhaus rolam sob a ancora. Usar ancora tipo Hall pesada. Scope minimo 5:1. Vigiar permanentemente. Preferir zona de areia ou vasa proxima."),
      icon:"🪨" },
  ];

  const sel = beds.find(b => b.id === selected);
  const W = 290; const H = 90;
  const scoreColor = (s) => s >= 70 ? C.green : s >= 40 ? C.amber : C.red;

  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
        {beds.map(b => (
          <button key={b.id} onClick={()=>setSelected(b.id)}
            style={{flex:1,minWidth:48,padding:"6px 4px",
              background:selected===b.id?`${b.color}20`:"transparent",
              border:`1px solid ${selected===b.id?b.color:`${b.color}44`}`,
              borderRadius:8,cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:14}}>{b.icon}</div>
            <div style={{fontSize:7,color:selected===b.id?b.color:C.muted,fontWeight:selected===b.id?700:400,marginTop:2}}>
              {b.symbol}
            </div>
          </button>
        ))}
      </div>
      {sel && (
        <div>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            <rect width={W} height={H} fill={C.bg1} rx="8"/>
            {/* fond simulé */}
            <rect x={0} y={50} width={W} height={40} fill={`${sel.color}30`} rx="0"/>
            {sel.id==="weed" && <>
              {[20,50,80,110,140,170,200,230,260].map((x,i)=>(
                <g key={i}>
                  <line x1={x} y1={90} x2={x-5} y2={62} stroke={C.weed} strokeWidth="1.5" opacity="0.7"/>
                  <ellipse cx={x-5} cy={60} rx="4" ry="3" fill={C.weed} opacity="0.8"/>
                </g>
              ))}
            </>}
            {sel.id==="rock" && <>
              {[0,1,2,3,4,5].map(i=>(
                <polygon key={i} points={`${25+i*45},90 ${40+i*45},60 ${55+i*45},90`}
                  fill={C.rock} opacity="0.5"/>
              ))}
            </>}
            {/* ancre */}
            <text x={145} y={48} textAnchor="middle" fontSize="22">⚓</text>
            {/* tenue bar */}
            <rect x={20} y={18} width={250} height={10} rx="5" fill="rgba(255,255,255,0.07)"/>
            <rect x={20} y={18} width={250*sel.score/100} height={10} rx="5"
              fill={scoreColor(sel.score)}/>
            <text x={20} y={14} fontSize="7" fill={C.muted}>
              {lbl("Tenue","Holding","Retencion","Retencao")}
            </text>
            <text x={270} y={14} textAnchor="end" fontSize="8" fontWeight="800"
              fill={scoreColor(sel.score)}>{sel.holding}</text>
          </svg>
          <div style={{marginTop:8,padding:"8px 12px",borderRadius:12,
            background:`${sel.color}0e`,border:`1px solid ${sel.color}44`,
            fontSize:10,color:C.steel3,lineHeight:1.6}}>
            {sel.tip}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SCOPE + PROCEDURE + RADIO
// ══════════════════════════════════════
function ScopeAndProcedureSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [depth, setDepth] = useState(15);
  const [weather, setWeather] = useState("fair");
  const [showProcedure, setShowProcedure] = useState(false);
  const [showRadio, setShowRadio] = useState(false);

  const factors = { fair:3, moderate:5, fresh:6, storm:8 };
  const factor = factors[weather];
  const chainMeters = depth * factor;
  const shackles = Math.ceil(chainMeters / 27.5);
  const swingRadius = chainMeters + 60;

  const W = 290; const H = 140;
  const maxDepth = 40;
  const chainLen = Math.min(chainMeters, 200);
  const scale = 100 / maxDepth;
  const dY = Math.min(depth * scale, 100);
  const cY = Math.min(chainLen * 0.5, 110);

  const weatherColors = { fair:C.green, moderate:C.amber, fresh:C.orange, storm:C.red };
  const col = weatherColors[weather];

  const procedure = {
    fr:[
      "1. PASSERELLE → PONT : Navigateur fixe la position GPS de mouillage",
      "2. PONT : Equipe pont en place — gilets de sauvetage, casques, gants",
      "3. PONT : Frein de gueuse (devil's claw) libere, guindeau en prise",
      "4. PASSERELLE → PONT : 'Parez a mouiller tribord/babord' — Position d'approche",
      "5. PASSERELLE → PONT : Annonce 'Fond 15 metres — 5 ecailles a filer'",
      "6. PONT → PASSERELLE : 'Parez' — Ancre surplombant l'eau",
      "7. PASSERELLE → PONT : 'Mouillez !'  — Le timonier annonce : 'Ancre a l'eau'",
      "8. PONT : Filer la chaine par le frein — Annoncer chaque ecaille : '1... 2... 3...'",
      "9. PONT → PASSERELLE : 'X ecailles dehors — chaine au pic' (chaine tendue)",
      "10. PONT : Serrer le frein, engager le frein de gueuse",
      "11. PONT → PASSERELLE : 'Ancre tenue — X ecailles' — Indiquer position finale",
    ],
    en:[
      "1. BRIDGE → DECK: Navigator fixes GPS anchoring position",
      "2. DECK: Deck crew in position — life jackets, helmets, gloves",
      "3. DECK: Devil's claw released, windlass engaged",
      "4. BRIDGE → DECK: 'Standby to anchor starboard/port' — Approach position",
      "5. BRIDGE → DECK: Announces 'Depth 15 metres — 5 shackles to veer'",
      "6. DECK → BRIDGE: 'Ready' — Anchor clear of the water",
      "7. BRIDGE → DECK: 'Let go!' — Bosun announces: 'Anchor away'",
      "8. DECK: Veer chain by brake — Announce each shackle: '1... 2... 3...'",
      "9. DECK → BRIDGE: 'X shackles out — chain up and down' (chain taut)",
      "10. DECK: Apply brake, engage devil's claw",
      "11. DECK → BRIDGE: 'Anchor holding — X shackles' — Report final position",
    ],
    es:[
      "1. PUENTE → CUBIERTA: Navegante fija posicion GPS de fondeo",
      "2. CUBIERTA: Tripulacion en posicion — chalecos, cascos, guantes",
      "3. CUBIERTA: Garra del diablo liberada, molinete en marcha",
      "4. PUENTE → CUBIERTA: 'Listos para fondear estribor/babor' — Posicion de aproximacion",
      "5. PUENTE → CUBIERTA: 'Fondo 15 metros — 5 grilletes a largar'",
      "6. CUBIERTA → PUENTE: 'Listos' — Ancla sobre el agua",
      "7. PUENTE → CUBIERTA: 'Fondeen!' — Bosun anuncia: 'Ancla al agua'",
      "8. CUBIERTA: Largar cadena por el freno — Anunciar cada grillete: '1... 2... 3...'",
      "9. CUBIERTA → PUENTE: 'X grilletes fuera — cadena a pique' (cadena tensa)",
      "10. CUBIERTA: Ajustar freno, enganchar garra del diablo",
      "11. CUBIERTA → PUENTE: 'Ancla agarrada — X grilletes' — Indicar posicion final",
    ],
    pt:[
      "1. PONTE → CONVÉS: Navegador fixa posicao GPS de fundeio",
      "2. CONVÉS: Tripulacao em posicao — coletes, capacetes, luvas",
      "3. CONVÉS: Garra do diabo libertada, molinete em marcha",
      "4. PONTE → CONVÉS: 'Preparados para fundeiar BB/EB' — Posicao de aproximacao",
      "5. PONTE → CONVÉS: 'Fundo 15 metros — 5 manilhas a filar'",
      "6. CONVÉS → PONTE: 'Prontos' — Ancora sobre a agua",
      "7. PONTE → CONVÉS: 'Fundeiem!' — Contramestre anuncia: 'Ancora na agua'",
      "8. CONVÉS: Filar a corrente pelo travao — Anunciar cada manilha: '1... 2... 3...'",
      "9. CONVÉS → PONTE: 'X manilhas fora — corrente apique' (corrente tensa)",
      "10. CONVÉS: Apertar travao, engatar garra do diabo",
      "11. CONVÉS → PONTE: 'Ancora segura — X manilhas' — Indicar posicao final",
    ],
  };

  const radio = {
    fr:[
      { who:"🧭 PASSERELLE", msg:"Machine avance lente. Cap 045. Fond 15 metres." },
      { who:"⚓ PONT", msg:"Compris. Equipe en place — guindeau pret." },
      { who:"🧭 PASSERELLE", msg:"Machine stop. Legere arriere pour casser l'erre. Parez a mouiller babord." },
      { who:"⚓ PONT", msg:"Parez babord. Ancre surplombant l'eau." },
      { who:"🧭 PASSERELLE", msg:"Mouillez !" },
      { who:"⚓ PONT", msg:"Ancre a l'eau ! Une ecaille... deux ecailles... trois ecailles..." },
      { who:"⚓ PONT", msg:"Cinq ecailles dehors — chaine au pic." },
      { who:"🧭 PASSERELLE", msg:"Bien. Bloquez la chaine." },
      { who:"⚓ PONT", msg:"Chaine bloquee — frein de gueuse engage. Ancre tenue." },
      { who:"🧭 PASSERELLE", msg:"Recu. Debut de quart de mouillage. Relever toutes les 30 minutes." },
    ],
    en:[
      { who:"🧭 BRIDGE", msg:"Slow ahead. Course 045. Depth 15 metres." },
      { who:"⚓ DECK", msg:"Understood. Crew in position — windlass ready." },
      { who:"🧭 BRIDGE", msg:"Stop engine. Slight astern to check headway. Standby to let go port." },
      { who:"⚓ DECK", msg:"Standby port. Anchor clear of the water." },
      { who:"🧭 BRIDGE", msg:"Let go!" },
      { who:"⚓ DECK", msg:"Anchor away! One shackle... two shackles... three shackles..." },
      { who:"⚓ DECK", msg:"Five shackles out — chain up and down." },
      { who:"🧭 BRIDGE", msg:"Good. Secure the chain." },
      { who:"⚓ DECK", msg:"Chain secured — devil's claw engaged. Anchor holding." },
      { who:"🧭 BRIDGE", msg:"Received. Anchor watch commenced. Report every 30 minutes." },
    ],
    es:[
      { who:"🧭 PUENTE", msg:"Avante lento. Rumbo 045. Fondo 15 metros." },
      { who:"⚓ CUBIERTA", msg:"Entendido. Tripulacion en posicion — molinete listo." },
      { who:"🧭 PUENTE", msg:"Para maquina. Leve atras para cazar el impulso. Listos para fondear babor." },
      { who:"⚓ CUBIERTA", msg:"Listos babor. Ancla sobre el agua." },
      { who:"🧭 PUENTE", msg:"Fondeen !" },
      { who:"⚓ CUBIERTA", msg:"Ancla al agua! Un grillete... dos grilletes... tres grilletes..." },
      { who:"⚓ CUBIERTA", msg:"Cinco grilletes fuera — cadena a pique." },
      { who:"🧭 PUENTE", msg:"Bien. Bloqueen la cadena." },
      { who:"⚓ CUBIERTA", msg:"Cadena bloqueada — garra del diablo enganchada. Ancla agarrada." },
      { who:"🧭 PUENTE", msg:"Recibido. Inicio guardia de fondeo. Informar cada 30 minutos." },
    ],
    pt:[
      { who:"🧭 PONTE", msg:"Avante lento. Rumo 045. Fundo 15 metros." },
      { who:"⚓ CONVÉS", msg:"Entendido. Tripulacao em posicao — molinete pronto." },
      { who:"🧭 PONTE", msg:"Para maquina. Leve ré para cazar o embalo. Preparados para fundeiar BB." },
      { who:"⚓ CONVÉS", msg:"Preparados BB. Ancora sobre a agua." },
      { who:"🧭 PONTE", msg:"Fundeiem !" },
      { who:"⚓ CONVÉS", msg:"Ancora na agua! Uma manilha... duas manilhas... tres manilhas..." },
      { who:"⚓ CONVÉS", msg:"Cinco manilhas fora — corrente apique." },
      { who:"🧭 PONTE", msg:"Bem. Bloqueiem a corrente." },
      { who:"⚓ CONVÉS", msg:"Corrente bloqueada — garra do diabo engrenada. Ancora segura." },
      { who:"🧭 PONTE", msg:"Recebido. Inicio de quarto de fundeio. Reportar a cada 30 minutos." },
    ],
  };

  const proc = procedure[lang] || procedure.fr;
  const rad = radio[lang] || radio.fr;

  return (
    <div>
      {/* Calculateur scope */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        {/* eau */}
        <rect x={0} y={20} width={W} height={H-20} fill="rgba(41,121,255,0.06)"/>
        {/* navire */}
        <rect x={100} y={10} width={90} height={18} rx="4" fill="rgba(201,146,42,0.15)" stroke={C.gold} strokeWidth="1"/>
        <text x={145} y={23} textAnchor="middle" fontSize="8" fill={C.gold}>⚓ NAVIRE</text>
        {/* profondeur */}
        <line x1={80} y1={28} x2={80} y2={20+dY} stroke={C.blue2} strokeWidth="1" strokeDasharray="3,3" opacity="0.6"/>
        <text x={72} y={20+dY/2} textAnchor="end" fontSize="7" fill={C.blue2}>{depth}m</text>
        {/* chaine */}
        <path d={`M145,28 Q115,${20+dY*0.6} ${80},${20+dY}`}
          stroke={col} strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* ancre fond */}
        <text x={80} y={20+dY+4} textAnchor="middle" fontSize="14">⚓</text>
        {/* cercle evolution */}
        <ellipse cx={145} cy={20+dY*0.3} rx={Math.min(swingRadius*0.4,120)} ry={14}
          fill="none" stroke={col} strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>
        {/* valeurs */}
        <rect x={168} y={25} width={112} height={90} rx="6" fill="rgba(13,31,60,0.8)" stroke={`${col}33`} strokeWidth="1"/>
        <text x={224} y={38} textAnchor="middle" fontSize="7" fill={C.muted} letterSpacing="1">
          {lbl("CALCUL SCOPE","SCOPE CALC","CALCULO SCOPE","CALCULO SCOPE")}
        </text>
        <text x={224} y={52} textAnchor="middle" fontSize="8" fill={C.muted}>
          {lbl("Profondeur","Depth","Profundidad","Profundidade")}
        </text>
        <text x={224} y={64} textAnchor="middle" fontSize="14" fontWeight="800" fill={C.blue2} fontFamily="Courier New">
          {depth}m
        </text>
        <text x={224} y={76} textAnchor="middle" fontSize="7" fill={C.muted}>x {factor} =</text>
        <text x={224} y={90} textAnchor="middle" fontSize="14" fontWeight="800" fill={col} fontFamily="Courier New">
          {chainMeters}m
        </text>
        <text x={224} y={102} textAnchor="middle" fontSize="7" fill={C.muted}>
          {lbl("Ecailles","Shackles","Grilletes","Manilhas")}
        </text>
        <text x={224} y={113} textAnchor="middle" fontSize="13" fontWeight="800" fill={C.gold2} fontFamily="Courier New">
          {shackles}
        </text>
      </svg>
      {/* controles */}
      <div style={{display:"flex",gap:8,marginTop:8,alignItems:"center"}}>
        <div style={{flex:1}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:3}}>
            {lbl("Profondeur","Depth","Profundidad","Profundidade")}: {depth}m
          </div>
          <input type="range" min={3} max={40} value={depth} onChange={e=>setDepth(Number(e.target.value))}
            style={{width:"100%",accentColor:C.blue2}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:3}}>
            {lbl("Meteo","Weather","Tiempo","Tempo")}
          </div>
          <select value={weather} onChange={e=>setWeather(e.target.value)}
            style={{width:"100%",background:C.bg2,border:`1px solid ${C.border}`,
              borderRadius:6,color:col,padding:"4px 6px",fontSize:10}}>
            <option value="fair">{lbl("Beau temps (x3)","Fair weather (x3)","Buen tiempo (x3)","Bom tempo (x3)")}</option>
            <option value="moderate">{lbl("Moderé (x5)","Moderate (x5)","Moderado (x5)","Moderado (x5)")}</option>
            <option value="fresh">{lbl("Frais (x6)","Fresh (x6)","Fresco (x6)","Fresco (x6)")}</option>
            <option value="storm">{lbl("Tempete (x8)","Storm (x8)","Temporal (x8)","Temporal (x8)")}</option>
          </select>
        </div>
      </div>
      {/* rayon evolution */}
      <div style={{marginTop:8,padding:"6px 10px",borderRadius:8,
        background:`${col}0f`,border:`1px solid ${col}33`,
        display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:10,color:C.muted}}>
          {lbl("Rayon evolution","Swing radius","Radio evolucion","Raio evolucao")}
        </span>
        <span style={{fontSize:12,fontWeight:800,color:col,fontFamily:"Courier New"}}>
          ~{swingRadius}m
        </span>
      </div>
      {/* procedure */}
      <button onClick={()=>setShowProcedure(v=>!v)}
        style={{width:"100%",marginTop:10,padding:"10px",borderRadius:12,
          background:"rgba(201,146,42,0.1)",border:`1px solid ${C.border}`,
          color:C.gold2,fontSize:11,fontWeight:800,cursor:"pointer",textAlign:"left"}}>
        📋 {lbl("Procédure de mouillage pas à pas","Step-by-step anchoring procedure","Procedimiento de fondeo paso a paso","Procedimento de fundeio passo a passo")} {showProcedure?"▲":"▼"}
      </button>
      {showProcedure && (
        <div style={{background:C.bg1,borderRadius:10,padding:"10px 12px",marginTop:6}}>
          {proc.map((step,i) => (
            <div key={i} style={{display:"flex",gap:8,marginBottom:6,
              borderBottom:i<proc.length-1?"1px solid rgba(255,255,255,0.04)":"none",paddingBottom:4}}>
              <span style={{color:C.gold2,fontSize:10,flexShrink:0,fontWeight:700,minWidth:14}}>▸</span>
              <span style={{fontSize:10,color:C.steel3,lineHeight:1.5}}>{step}</span>
            </div>
          ))}
        </div>
      )}
      {/* radio simulation */}
      <button onClick={()=>setShowRadio(v=>!v)}
        style={{width:"100%",marginTop:8,padding:"10px",borderRadius:12,
          background:"rgba(0,229,255,0.07)",border:`1px solid ${C.borderC}`,
          color:C.cyan2,fontSize:11,fontWeight:800,cursor:"pointer",textAlign:"left"}}>
        📻 {lbl("Dialogue Passerelle ↔ Pont","Bridge ↔ Deck dialogue","Dialogo Puente ↔ Cubierta","Dialogo Ponte ↔ Convés")} {showRadio?"▲":"▼"}
      </button>
      {showRadio && (
        <div style={{background:C.bg1,borderRadius:10,padding:"10px 12px",marginTop:6}}>
          {rad.map((line,i) => {
            const isBridge = line.who.includes("PASSERELLE")||line.who.includes("BRIDGE")||line.who.includes("PUENTE")||line.who.includes("PONTE");
            return (
              <div key={i} style={{marginBottom:8,
                display:"flex",flexDirection:"column",
                alignItems:isBridge?"flex-start":"flex-end"}}>
                <div style={{fontSize:8,color:isBridge?C.cyan2:C.amber2,fontWeight:700,marginBottom:2}}>
                  {line.who}
                </div>
                <div style={{maxWidth:"85%",padding:"6px 10px",borderRadius:10,
                  background:isBridge?"rgba(0,229,255,0.08)":"rgba(255,179,0,0.08)",
                  border:`1px solid ${isBridge?C.borderC:C.border}`,
                  fontSize:10,color:C.white,lineHeight:1.5}}>
                  {line.msg}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);

  const qs = {
    fr:[
      {id:"q1",q:"Quelle est la longueur standard d'une ecaille de chaine ?\n(Repondre en metres)"},
      {id:"q2",q:"Pour un fond de 10 metres par vent force 5, combien de metres de chaine filer ?\n(Repondre en metres — scope 5:1)"},
      {id:"q3",q:"Quel fond est INTERDIT au mouillage en Mediterranee et protege par la loi ?\n(Repondre en 1 mot)"},
      {id:"q4",q:"Quel appareil sert a virer (remonter) et filer la chaine ?\n(Repondre en 1 mot)"},
      {id:"q5",q:"A quoi sert l'orinque de boue ?\n(Repondre en une phrase courte)"},
    ],
    en:[
      {id:"q1",q:"What is the standard length of one chain shackle?\n(Answer in metres)"},
      {id:"q2",q:"For 10 metres depth in force 5 wind, how many metres of chain to veer?\n(Answer in metres — scope 5:1)"},
      {id:"q3",q:"Which bottom is PROHIBITED for anchoring in the Mediterranean and protected by law?\n(Answer in 1 word)"},
      {id:"q4",q:"Which equipment is used to heave and veer the chain?\n(Answer in 1 word)"},
      {id:"q5",q:"What is the purpose of the trip line buoy?\n(Answer in one short phrase)"},
    ],
    es:[
      {id:"q1",q:"?Cual es la longitud estandar de un grillete de cadena?\n(Responder en metros)"},
      {id:"q2",q:"Para 10 metros de fondo con viento fuerza 5, ?cuantos metros de cadena largar?\n(Responder en metros — scope 5:1)"},
      {id:"q3",q:"?Que fondo esta PROHIBIDO para fondear en el Mediterraneo y protegido por la ley?\n(Responder en 1 palabra)"},
      {id:"q4",q:"?Que aparato sirve para virar (cobrar) y largar la cadena?\n(Responder en 1 palabra)"},
      {id:"q5",q:"?Para que sirve el orinque de boya?\n(Responder en una frase corta)"},
    ],
    pt:[
      {id:"q1",q:"Qual e o comprimento padrao de uma manilha de corrente?\n(Responder em metros)"},
      {id:"q2",q:"Para 10 metros de fundo com vento forca 5, quantos metros de corrente filar?\n(Responder em metros — scope 5:1)"},
      {id:"q3",q:"Que fundo e PROIBIDO para fundeiar no Mediterraneo e protegido por lei?\n(Responder em 1 palavra)"},
      {id:"q4",q:"Que aparelho serve para virar (cobrar) e filar a corrente?\n(Responder em 1 palavra)"},
      {id:"q5",q:"Para que serve o orinque de boia?\n(Responder em uma frase curta)"},
    ],
  };

  const chk=(id,val)=>{
    const v=val.trim().toLowerCase().replace(/\s/g,"");
    if(id==="q1") return v==="27.5"||v==="27,5"||v==="275"||v.includes("27");
    if(id==="q2") return v==="50"||v.includes("50m");
    if(id==="q3") return v.includes("posidon")||v.includes("herb")||v.includes("posid");
    if(id==="q4") return v.includes("guind")||v.includes("windl")||v.includes("molin");
    if(id==="q5") return v.includes("recup")||v.includes("coinc")||v.includes("roch")||v.includes("trip")||v.includes("rock")||v.includes("stuck");
    return false;
  };

  const corrKey={
    fr:{q1:"27,5 m",q2:"50 m (10 x 5)",q3:"Posidonie / Herbier",q4:"Guindeau",q5:"Recuperer l'ancre coincee en fond rocheux"},
    en:{q1:"27.5 m",q2:"50 m (10 x 5)",q3:"Posidonia / Weed",q4:"Windlass",q5:"Recover anchor stuck in rocky bottom"},
    es:{q1:"27,5 m",q2:"50 m (10 x 5)",q3:"Posidonia / Hierba",q4:"Molinete",q5:"Recuperar el ancla encallada en fondo rocoso"},
    pt:{q1:"27,5 m",q2:"50 m (10 x 5)",q3:"Posidonia / Erva",q4:"Molinete",q5:"Recuperar ancora encravada em fundo rochoso"},
  };

  const expl={
    fr:"OK Q1: 27,5 m — standard IMO. 1 ecaille = 1 shackle = 27,5 m. Chaine marquee tous les 27,5 m.\nOK Q2: 50 m — scope 5:1 pour vent force 5 : 10m x 5 = 50m = 1,82 ecaille => 2 ecailles (55m)\nOK Q3: Posidonie — plante mediterraneenne protegee (loi 88-1261). Amende 150 000 euros.\nOK Q4: Guindeau — machine electrique/hydraulique. Commandes pont et passerelle.\nOK Q5: Recuperer l'ancre coincee en fond rocheux en tirant par la couronne (par le bas).",
    en:"OK Q1: 27.5 m — IMO standard. 1 shackle = 27.5 m. Chain marked every 27.5 m.\nOK Q2: 50 m — scope 5:1 for force 5 wind: 10m x 5 = 50m = 1.82 shackles => 2 shackles (55m)\nOK Q3: Posidonia — protected Mediterranean plant (law 88-1261). Fine 150,000 euros.\nOK Q4: Windlass — electric/hydraulic machine. Deck and bridge controls.\nOK Q5: Recover anchor stuck in rocky bottom by pulling from the crown (from below).",
    es:"OK Q1: 27,5 m — estandar OMI. 1 grillete = 27,5 m. Cadena marcada cada 27,5 m.\nOK Q2: 50 m — scope 5:1 para viento fuerza 5: 10m x 5 = 50m = 1,82 grilletes => 2 grilletes (55m)\nOK Q3: Posidonia — planta mediterranea protegida (ley 88-1261). Multa 150.000 euros.\nOK Q4: Molinete — maquina electrica/hidraulica. Controles cubierta y puente.\nOK Q5: Recuperar el ancla encallada en fondo rocoso tirando desde la corona (desde abajo).",
    pt:"OK Q1: 27,5 m — padrao IMO. 1 manilha = 27,5 m. Corrente marcada a cada 27,5 m.\nOK Q2: 50 m — scope 5:1 para vento forca 5: 10m x 5 = 50m = 1,82 manilhas => 2 manilhas (55m)\nOK Q3: Posidonia — planta mediterranea protegida (lei 88-1261). Multa 150.000 euros.\nOK Q4: Molinete — maquina eletrica/hidraulica. Controlos convés e ponte.\nOK Q5: Recuperar ancora encravada em fundo rochoso puxando pela coroa (por baixo).",
  };

  const list = qs[lang]||qs.fr;
  const ck = corrKey[lang]||corrKey.fr;

  return (
    <div>
      <div style={{padding:"10px 14px",borderRadius:13,marginBottom:14,
        background:"rgba(201,146,42,0.07)",border:`1px solid ${C.border}`,
        fontSize:11,color:C.gold2,lineHeight:1.7}}>
        {lang==="fr"?"Rappels: 1 ecaille=27,5m | Scope=profondeur x facteur | Posidonie interdite | Guindeau | Orinque=fond rocheux"
        :lang==="en"?"Key: 1 shackle=27.5m | Scope=depth x factor | Posidonia banned | Windlass | Trip line=rocky bottom"
        :lang==="es"?"Clave: 1 grillete=27,5m | Scope=profundidad x factor | Posidonia prohibida | Molinete | Orinque=fondo rocoso"
        :"Chave: 1 manilha=27,5m | Scope=profundidade x fator | Posidonia proibida | Molinete | Orinque=fundo rochoso"}
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

// ══════════════════════════════════════
// QUESTION BANK — 15 QCM PREMIUM
// Restructured 2026-09-03 from the original single-array + lbl()/ans: shape
// into the standard {fr:[...],en:[...],es:[...],pt:[...]} + correct: shape
// used everywhere else in the codebase, so it can be consumed by
// examQuestionPools.ts and rendered via LessonShared's shared QuestionBank
// component. Content is unchanged question-for-question, option-for-option,
// answer-for-answer — see project memory for the validated mapping.
// 12 of these 15 questions had NO Portuguese `expl` in the source (a 3-arg
// lbl() call instead of 4) — at runtime this silently fell back to the
// French text for pt users. That pre-existing gap is replicated exactly
// here (pt expl = fr expl) rather than invented; flagged, not fixed.
// ══════════════════════════════════════
export const BANK = {
  fr: [
    {q:"Quelle est la difference principale entre une ancre Hall et une ancre Danforth ?",opts:["Hall = grands navires marchands bras articules, Danforth = plaisance grandes lames plates","Hall est plus legere","Danforth convient mieux a la roche","Elles sont identiques"],correct:0,expl:"L'ancre Hall (1-20t) est le standard des navires marchands avec des bras articules compacts. La Danforth a deux grandes lames plates orientables, bien plus legere, excellente en sable pour la plaisance. La Hall tient sur des fonds varies, la Danforth excelle specifiquement en sable."},
    {q:"Qu'est-ce que le 'scope' de mouillage ?",opts:["La profondeur du fond","Le rapport entre longueur de chaine et profondeur — scope = chaine / profondeur","Le poids de l'ancre","Le rayon du cercle d'evolution"],correct:1,expl:"Le scope = longueur de chaine filee / profondeur. Ex : 60m de chaine pour 10m de fond = scope 6:1. Un scope eleve assure un angle de traction horizontal sur l'ancre — meilleure tenue. Formule a connaitre absolument."},
    {q:"Quelle longueur de chaine faut-il filer pour 12m de fond avec vent fort (scope 6:1) ?",opts:["36 m / 1.3 ecaille","60 m / 2.2 ecailles","72 m / 2.6 ecailles","96 m / 3.5 ecailles"],correct:2,expl:"Calcul : 12m x 6 = 72m de chaine. En ecailles : 72 / 27,5 = 2,6 => 3 ecailles completes = 82,5m. En pratique on arrondit toujours au-dessus pour la securite."},
    {q:"Pourquoi la posidonie est-elle une espece protegee en Mediterranee ?",opts:["C'est une algue decorative","Plante a fleurs endemique : production O2, viveiro poissons, sequestration CO2, protegee loi 88-1261","Elle est dangereuse pour les navires","Elle indique un fond rocheux"],correct:1,expl:"La posidonie (Posidonia oceanica) est une plante a fleurs (pas une algue) endemique de la Mediterranee. Elle produit 20L d'O2/m2/jour, sert de viveiro pour les poissons et crustaces, fixe les fonds et capte le CO2. Protegee depuis 1988. Amende jusqu'a 150 000 euros si l'on y mouille."},
    {q:"Quel est le role du frein de gueuse (devil's claw) ?",opts:["Freiner le guindeau","Verrouiller mecaniquement la chaine independamment du guindeau — securite en navigation","Compter les ecailles","Guider la chaine dans l'ecubier"],correct:1,expl:"Le devil's claw (frein de gueuse) est un crochet metallique qui se verrouille sur un maillon de la chaine. Il supporte le poids de la chaine independamment du frein du guindeau. Essentiel : si le guindeau lache, le devil's claw retient la chaine. Toujours engager apres mouillage."},
    {q:"Qu'est-ce que la 'chaine au pic' ?",opts:["La chaine est dans le puits","La chaine est verticale sous le bateau — l'ancre est directement dessous, prete a tenir","La chaine est trop courte","L'ancre est a bord"],correct:1,expl:"'Chaine au pic' = la chaine est tendue verticalement sous l'ecubier, indiquant que le navire est directement au-dessus de l'ancre. C'est le signal que l'ancre va se lever. L'officier de pont l'annonce a la passerelle qui peut alors faire de la machine pour aider le levage."},
    {q:"Quelles sont les methodes de detection du garreo ?",opts:["Regarder la mer uniquement","Relevement repetes sur marques fixes + alarme GPS + vibrations chaine + surveillance embarcations voisines","Compter les ecailles","Observer la couleur de l'eau"],correct:1,expl:"Methodes de detection garreo : (1) Relever des amers fixes toutes les 30 min — si les releves changent, le navire derive. (2) Alarme GPS configuree en cercle autour du point d'ancrage. (3) Vibrations ou a-coups dans la chaine. (4) Comparer sa position aux navires voisins. Plusieurs methodes simultanees."},
    {q:"Quel fond offre la meilleure tenue pour une ancre Hall ?",opts:["Roche","Sable ou vase — meilleure penetration et adherence","Galets","Herbier"],correct:1,expl:"Le sable et la vase sont les meilleurs fonds pour une ancre Hall. En sable : l'ancre penetre rapidement et developpe une excellente resistance par friction. En vase : bonne tenue mais attention a la suction au levage. La roche, les galets et l'herbier sont a eviter."},
    {q:"A quoi correspondent les symboles S, M, R, Wd sur une carte marine ?",opts:["Signaux, Marque, Rocher, Winde","Sand (sable), Mud (vase), Rock (roche), Weed (herbier) — nature du fond","Securite, Mouillage, Rade, Vent dominant","Sondage, Marche, Rapide, Deriveur"],correct:1,expl:"Sur les cartes marines (SHOM/IHO) : S = Sand (sable), M = Mud (vase/boue), R = Rock (roche), Cy = Clay (argile), G = Gravel (gravier), Sh = Shells (coquilles), Wd = Weed (herbier/algues). Ces annotations permettent de choisir le meilleur emplacement de mouillage."},
    {q:"Qu'est-ce que le mouillage avec deux ancres ?",opts:["Une procedure d'urgence uniquement","Technique pour reduire le cercle d'evolution, tenir en courant alternatif ou renforcer la tenue par mauvais temps","Obligatoire en port","Utilisee uniquement par les voiliers"],correct:1,expl:"Le mouillage avec deux ancres est utilise pour : (1) Limiter le cercle d'evolution en espace confine — les deux ancres en V. (2) Tenir en courant alternatif (maree) — ancres dans l'axe du courant. (3) Renforcer la tenue par mauvais temps. Configuration courante : ancres deployees en V (30-60 degres entre les deux chaines)."},
    {q:"Quelle est la procedure recommandee si vous suspectez un garreo ?",opts:["Attendre que le temps s'ameliore","Verifier le garreo, filer plus de chaine, demarrer les machines en standby, preparer le depart si necessaire","Couper le moteur du guindeau","Appeler les secours immediatement"],correct:1,expl:"Procedure de garreo : (1) Confirmer le garreo par relevement et GPS. (2) Alerter le capitaine. (3) Filer plus de chaine pour augmenter la tenue. (4) Demarrer les machines pour alleger la traction sur l'ancre. (5) Si le garreo continue : lever l'ancre et se mettre en route ou changer de position. Ne jamais attendre que la situation devienne critique."},
    {q:"Que signifie 'chaine en catenary' ?",opts:["La chaine est droite et tendue","La chaine forme une courbe naturelle vers le bas — amortit les chocs et assure un tirage horizontal sur l'ancre","La chaine est enroulee","La chaine est courte"],correct:1,expl:"La catenaire est la courbe naturelle que forme la chaine entre l'ecubier et le fond sous son propre poids. Elle joue un role d'amortisseur : absorbe les chocs des vagues et du vent. Elle assure un angle de traction proche de l'horizontal sur l'ancre (meilleure tenue). Chaine tendue = pas de catenaire = mauvaise tenue = signe possible de garreo."},
    {q:"Quels criteres choisir pour un bon emplacement de mouillage ?",opts:["Uniquement la profondeur","Protection meteo, type de fond, profondeur, cercle evolution, cables sous-marins, reglementation locale","La proximite du port","La couleur de l'eau uniquement"],correct:1,expl:"Criteres de choix d'un mouillage : (1) Protection meteo — abri naturel vent/houle. (2) Fond S ou M preferentiel. (3) Profondeur adaptee au tirant d'eau + scope. (4) Espace suffisant pour le cercle d'evolution (chaine+longueur navire). (5) Absence de cables sous-marins (consulter la carte). (6) Zones de mouillage autorisees (reglementation locale, zones protegees)."},
    {q:"Qu'est-ce qu'un mouillage en rade foraine ?",opts:["Mouillage protege dans un port","Mouillage en mer ouverte sans abri naturel — precautions maximales requises","Mouillage avec deux ancres","Mouillage permanent"],correct:1,expl:"La rade foraine est un mouillage en zone exposee sans protection naturelle. Utilise pour : transbordement en mer, attente port, avitaillement ancre. Precautions : scope minimum 5:1, quart permanent, machines en standby, pret a appareiller a tout moment. Interdit par vents forts si alternative disponible."},
    {q:"Quel ordre la passerelle donne-t-elle pour declencher le mouillage ?",opts:["'Machine stop'","'Mouillez !' ou 'Let go !' — ordre definitif de lacher l'ancre","'Parez a mouiller'","'Guindeau pret'"],correct:1,expl:"La procedure est sequentielle : (1) 'Parez a mouiller' = positionnement et standby. (2) 'Parez' du pont = ancre surplombant l'eau. (3) 'MOUILLEZ !' = ordre definitif — l'ancre est lachee. Le timonier/bosco confirme 'Ancre a l'eau'. La passerelle annonce prealablement la profondeur et le nombre d'ecailles a filer."},
  ],
  en: [
    {q:"What is the main difference between a Hall and a Danforth anchor?",opts:["Hall = large merchant ships articulated arms, Danforth = leisure large flat flukes","Hall is lighter","Danforth is better on rock","They are identical"],correct:0,expl:"The Hall anchor (1-20t) is the merchant vessel standard with compact articulated arms. The Danforth has two large flat orientable flukes, much lighter, excellent in sand for leisure. The Hall holds on various bottoms, the Danforth excels specifically in sand."},
    {q:"What is the anchoring 'scope'?",opts:["The bottom depth","The ratio between chain length and depth — scope = chain / depth","The anchor weight","The swinging circle radius"],correct:1,expl:"Scope = chain length veered / depth. Ex: 60m of chain for 10m depth = scope 6:1. High scope ensures horizontal pull angle on the anchor — better holding. Formula absolutely to know."},
    {q:"How much chain to veer for 12m depth in strong wind (scope 6:1)?",opts:["36 m / 1.3 ecaille","60 m / 2.2 ecailles","72 m / 2.6 ecailles","96 m / 3.5 ecailles"],correct:2,expl:"Calculation: 12m x 6 = 72m of chain. In shackles: 72 / 27.5 = 2.6 => 3 complete shackles = 82.5m. In practice always round up for safety."},
    {q:"Why is posidonia a protected species in the Mediterranean?",opts:["It is a decorative algae","Flowering plant endemic: O2 production, fish nursery, CO2 sequestration, protected law 88-1261","It is dangerous for vessels","It indicates a rocky bottom"],correct:1,expl:"Posidonia oceanica is a flowering plant (not algae) endemic to the Mediterranean. It produces 20L of O2/m2/day, serves as nursery for fish and crustaceans, stabilizes bottoms and captures CO2. Protected since 1988. Fine up to 150,000 euros for anchoring on it."},
    {q:"What is the role of the devil's claw?",opts:["Brake the windlass","Mechanically lock the chain independently from the windlass — safety underway","Count the shackles","Guide the chain in the hawsepipe"],correct:1,expl:"The devil's claw is a metal hook that locks onto a chain link. It supports the chain weight independently from the windlass brake. Essential: if the windlass fails, the devil's claw holds the chain. Always engage after anchoring."},
    {q:"What does 'chain up and down' mean?",opts:["The chain is in the locker","The chain is vertical under the vessel — anchor is directly below, ready to hold","The chain is too short","The anchor is aboard"],correct:1,expl:"'Chain up and down' = the chain is taut vertically under the hawsepipe, indicating the vessel is directly above the anchor. This signals the anchor is about to break out. The deck officer reports to the bridge which can then use the engine to assist lifting."},
    {q:"What are the methods for detecting dragging?",opts:["Look at the sea only","Repeated bearings on fixed marks + GPS alarm + chain vibrations + monitoring neighboring vessels","Count the shackles","Observe water color"],correct:1,expl:"Dragging detection methods: (1) Take bearings on fixed marks every 30 min — if bearings change, vessel is drifting. (2) GPS alarm configured as circle around anchorage point. (3) Vibrations or jerks in the chain. (4) Compare position with neighboring vessels. Multiple simultaneous methods."},
    {q:"Which bottom offers the best holding for a Hall anchor?",opts:["Rock","Sand or mud — best penetration and grip","Shingle","Weed"],correct:1,expl:"Sand and mud are the best bottoms for a Hall anchor. In sand: anchor penetrates quickly and develops excellent resistance through friction. In mud: good holding but beware suction when weighing. Rock, shingle and weed are to be avoided."},
    {q:"What do the symbols S, M, R, Wd on a nautical chart mean?",opts:["Signals, Mark, Rock, Wind","Sand, Mud, Rock, Weed — bottom type","Safety, Anchoring, Roads, Dominant wind","Sounding, Speed, Fast, Drifter"],correct:1,expl:"On nautical charts (SHOM/IHO): S = Sand, M = Mud, R = Rock, Cy = Clay, G = Gravel, Sh = Shells, Wd = Weed. These annotations allow choosing the best anchoring location."},
    {q:"What is anchoring with two anchors?",opts:["An emergency procedure only","Technique to reduce swinging circle, hold in alternating current or reinforce holding in bad weather","Mandatory in port","Used only by sailing vessels"],correct:1,expl:"Anchoring with two anchors is used to: (1) Limit swinging circle in confined space — two anchors in V shape. (2) Hold in alternating current (tide) — anchors in current axis. (3) Reinforce holding in bad weather. Common configuration: anchors deployed in V shape (30-60 degrees between chains)."},
    {q:"What is the recommended procedure if you suspect dragging?",opts:["Wait for weather to improve","Verify dragging, veer more chain, start engines on standby, prepare to get underway if needed","Stop the windlass motor","Call rescue immediately"],correct:1,expl:"Dragging procedure: (1) Confirm dragging by bearing and GPS. (2) Alert captain. (3) Veer more chain to improve holding. (4) Start engines to reduce pull on anchor. (5) If dragging continues: weigh anchor and get underway or change position. Never wait for situation to become critical."},
    {q:"What does 'chain catenary' mean?",opts:["The chain is straight and taut","The chain forms a natural downward curve — absorbs shocks and ensures horizontal pull on the anchor","The chain is coiled","The chain is short"],correct:1,expl:"The catenary is the natural curve formed by the chain between the hawsepipe and the bottom under its own weight. It acts as a shock absorber: absorbs wave and wind shocks. It ensures a near-horizontal pull angle on the anchor (better holding). Taut chain = no catenary = poor holding = possible dragging sign."},
    {q:"What criteria to choose a good anchoring location?",opts:["Only the depth","Weather protection, bottom type, depth, swinging circle, submarine cables, local regulations","Proximity to port","Water color only"],correct:1,expl:"Criteria for choosing anchorage: (1) Weather protection — natural wind/swell shelter. (2) S or M bottom preferred. (3) Depth suited to draft + scope. (4) Sufficient space for swinging circle (chain + vessel length). (5) No submarine cables (check chart). (6) Authorized anchoring zones (local regulations, protected areas)."},
    {q:"What is an open roadstead anchorage?",opts:["Protected anchorage in a port","Anchoring in open sea without natural shelter — maximum precautions required","Two-anchor anchoring","Permanent mooring"],correct:1,expl:"Open roadstead is an anchorage in an exposed zone without natural protection. Used for: sea transhipment, port waiting, bunkering at anchor. Precautions: minimum scope 5:1, permanent watch, engines on standby, ready to get underway at any time. Prohibited in strong winds if alternative available."},
    {q:"What order does the bridge give to initiate anchoring?",opts:["'Stop engine'","'Mouiller!' or 'Let go!' — definitive order to release the anchor","'Standby to let go'","'Windlass ready'"],correct:1,expl:"The procedure is sequential: (1) 'Standby to let go' = positioning and standby. (2) 'Ready' from deck = anchor clear of water. (3) 'LET GO!' = definitive order — anchor released. The bosun confirms 'Anchor away'. Bridge announces depth and number of shackles to veer beforehand."},
  ],
  es: [
    {q:"Cual es la diferencia principal entre un ancla Hall y una Danforth?",opts:["Hall = grandes buques mercantes brazos articulados, Danforth = nautica grandes unas planas","Hall es mas ligera","Danforth es mejor en roca","Son identicas"],correct:0,expl:"El ancla Hall (1-20t) es el estandar para buques mercantes con brazos articulados compactos. La Danforth tiene dos grandes unas planas orientables, mucho mas ligera, excelente en arena para la nautica."},
    {q:"Que es el 'scope' de fondeo?",opts:["La profundidad del fondo","La relacion entre longitud de cadena y profundidad — scope = cadena / profundidad","El peso del ancla","El radio del circulo de evolucion"],correct:1,expl:"El scope = longitud de cadena largada / profundidad. Ej: 60m de cadena para 10m de fondo = scope 6:1. Un scope alto asegura un angulo de traccion horizontal sobre el ancla — mejor retencion."},
    {q:"Cuanta cadena largar para 12m de fondo con viento fuerte (scope 6:1)?",opts:["36 m / 1.3 ecaille","60 m / 2.2 ecailles","72 m / 2.6 ecailles","96 m / 3.5 ecailles"],correct:2,expl:"Calculo: 12m x 6 = 72m de cadena. En grilletes: 72 / 27,5 = 2,6 => 3 grilletes completos = 82,5m."},
    {q:"Por que la posidonia es una especie protegida en el Mediterraneo?",opts:["Es un alga decorativa","Planta con flores endemica: produccion O2, vivero peces, secuestro CO2, protegida ley 88-1261","Es peligrosa para los buques","Indica un fondo rocoso"],correct:1,expl:"La posidonia es una planta con flores (no alga) endemica del Mediterraneo. Produce 20L de O2/m2/dia, sirve de vivero para peces y crustaceos, fija los fondos y capta CO2. Protegida desde 1988."},
    {q:"Cual es el papel de la garra del diablo?",opts:["Frenar el molinete","Bloquear mecanicamente la cadena independientemente del molinete — seguridad en navegacion","Contar los grilletes","Guiar la cadena en el escobero"],correct:1,expl:"La garra del diablo es un gancho metalico que se bloquea sobre un eslabon de la cadena. Soporta el peso de la cadena independientemente del freno del molinete. Siempre engancharlo despues del fondeo."},
    {q:"Que significa 'cadena a pique'?",opts:["La cadena esta en el pocete","La cadena es vertical bajo el buque — el ancla esta directamente debajo, lista para agarrar","La cadena es demasiado corta","El ancla esta a bordo"],correct:1,expl:"'Cadena a pique' = la cadena esta tensa verticalmente bajo el escobero, indicando que el buque esta directamente sobre el ancla. Es la senal de que el ancla va a desprenderse."},
    {q:"Cuales son los metodos de deteccion del garreo?",opts:["Solo mirar el mar","Marcaciones repetidas sobre marcas fijas + alarma GPS + vibraciones cadena + vigilar embarcaciones vecinas","Contar los grilletes","Observar el color del agua"],correct:1,expl:"Metodos de deteccion garreo: (1) Marcaciones sobre amers cada 30 min. (2) Alarma GPS. (3) Vibraciones en la cadena. (4) Comparar con embarcaciones vecinas."},
    {q:"Que fondo ofrece la mejor retencion para un ancla Hall?",opts:["Roca","Arena o fango — mejor penetracion y adherencia","Canto rodado","Hierba"],correct:1,expl:"La arena y el fango son los mejores fondos para un ancla Hall. En arena: el ancla penetra rapidamente. En fango: buena retencion pero cuidado con la succion al virar."},
    {q:"A que corresponden los simbolos S, M, R, Wd en una carta nautica?",opts:["Senales, Marca, Roca, Viento","Sand (arena), Mud (fango), Rock (roca), Weed (hierba) — naturaleza del fondo","Seguridad, Fondeadero, Rada, Viento dominante","Sondeo, Marcha, Rapido, Derivador"],correct:1,expl:"En cartas nauticas (SHOM/IHO): S = Sand (arena), M = Mud (fango/lodo), R = Rock (roca), Cy = Clay (arcilla), G = Gravel (grava), Sh = Shells (conchas), Wd = Weed (hierba/algas)."},
    {q:"Que es el fondeo con dos anclas?",opts:["Un procedimiento de emergencia solo","Tecnica para reducir el circulo de evolucion, aguantar en corriente alterna o reforzar la tenencia por mal tiempo","Obligatorio en puerto","Usada solo por veleros"],correct:1,expl:"El fondeo con dos anclas se usa para: (1) Limitar el circulo de evolucion en espacio confinado. (2) Aguantar en corriente alterna. (3) Reforzar la retencion con mal tiempo."},
    {q:"Cual es el procedimiento recomendado si sospecha un garreo?",opts:["Esperar a que mejore el tiempo","Verificar garreo, largar mas cadena, arrancar maquinas en espera, prepararse para zarpar si es necesario","Parar el motor del molinete","Llamar a rescate inmediatamente"],correct:1,expl:"Procedimiento de garreo: (1) Confirmar garreo. (2) Alertar al capitan. (3) Largar mas cadena. (4) Arrancar maquinas. (5) Si continua: levar y zarpar o cambiar posicion."},
    {q:"Que significa 'cadena en catenaria'?",opts:["La cadena esta recta y tensa","La cadena forma una curva natural hacia abajo — amortigua choques y asegura un tiro horizontal sobre el ancla","La cadena esta enrollada","La cadena es corta"],correct:1,expl:"La catenaria es la curva natural que forma la cadena. Actua como amortiguador y asegura un angulo de traccion horizontal sobre el ancla. Cadena tesa = sin catenaria = posible garreo."},
    {q:"Que criterios para elegir un buen lugar de fondeo?",opts:["Solo la profundidad","Proteccion meteorologica, tipo fondo, profundidad, circulo evolucion, cables submarinos, reglamentacion local","La proximidad al puerto","Solo el color del agua"],correct:1,expl:"Criterios de eleccion de fondeadero: (1) Proteccion meteorologica. (2) Fondo S o M preferente. (3) Profundidad. (4) Espacio circulo evolucion. (5) Ausencia cables submarinos. (6) Zonas autorizadas."},
    {q:"Que es un fondeo en rada abierta?",opts:["Fondeo protegido en un puerto","Fondeo en mar abierto sin abrigo natural — precauciones maximas requeridas","Fondeo con dos anclas","Fondeo permanente"],correct:1,expl:"La rada abierta es un fondeo en zona expuesta sin proteccion natural. Precauciones: scope minimo 5:1, guardia permanente, maquinas en espera, listo para zarpar en cualquier momento."},
    {q:"Que orden da el puente para iniciar el fondeo?",opts:["'Para maquina'","'Fondeen!' o 'Let go!' — orden definitiva de soltar el ancla","'Listos para fondear'","'Molinete listo'"],correct:1,expl:"La procedura es secuencial: (1) 'Listos para fondear'. (2) 'Listos' del puente = ancla sobre el agua. (3) 'FONDEEN!' = orden definitiva. El bosun confirma 'Ancla al agua'."},
  ],
  pt: [
    {q:"Qual e a diferenca principal entre uma ancora Hall e uma Danforth?",opts:["Hall = grandes navios mercantes bracos articulados, Danforth = nautica grandes bracos planos","Hall e mais leve","Danforth e melhor em rocha","Sao identicas"],correct:0,expl:"A ancora Hall (1-20t) e o padrao dos navios mercantes com bracos articulados compactos. A Danforth tem dois grandes bracos planos orientaveis, muito mais leve, excelente em areia para a nautica."},
    {q:"O que e o 'scope' de fundeio?",opts:["A profundidade do fundo","A relacao entre comprimento de corrente e profundidade — scope = corrente / profundidade","O peso da ancora","O raio do circulo de evolucao"],correct:1,expl:"O scope = comprimento de corrente filada / profundidade. Ex: 60m de corrente para 10m de fundo = scope 6:1. Um scope elevado assegura angulo de tracao horizontal sobre a ancora — melhor retencao."},
    {q:"Quanto de corrente filar para 12m de fundo com vento forte (scope 6:1)?",opts:["36 m / 1.3 ecaille","60 m / 2.2 ecailles","72 m / 2.6 ecailles","96 m / 3.5 ecailles"],correct:2,expl:"Calculo: 12m x 6 = 72m de corrente. Em manilhas: 72 / 27,5 = 2,6 => 3 manilhas completas = 82,5m."},
    {q:"Por que a posidonia e uma especie protegida no Mediterraneo?",opts:["E uma alga decorativa","Planta com flores endemica: producao O2, viveiro peixes, sequestro CO2, protegida lei 88-1261","E perigosa para os navios","Indica um fundo rochoso"],correct:1,expl:"A posidonia (Posidonia oceanica) e uma planta a fleurs (pas une algue) endemique de la Mediterranee. Elle produit 20L d'O2/m2/jour, sert de viveiro pour les poissons et crustaces, fixe les fonds et capte le CO2. Protegee depuis 1988. Amende jusqu'a 150 000 euros si l'on y mouille."},
    {q:"Qual e o papel da garra do diabo?",opts:["Travar o molinete","Bloquear mecanicamente a corrente independentemente do molinete — seguranca em navegacao","Contar as manilhas","Guiar a corrente no escovem"],correct:1,expl:"Le devil's claw (frein de gueuse) est un crochet metallique qui se verrouille sur un maillon de la chaine. Il supporte le poids de la chaine independamment du frein du guindeau. Essentiel : si le guindeau lache, le devil's claw retient la chaine. Toujours engager apres mouillage."},
    {q:"O que significa 'corrente apique'?",opts:["A corrente esta no pocete","A corrente e vertical sob o navio — a ancora esta diretamente abaixo, pronta para agarrar","A corrente e curta demais","A ancora esta a bordo"],correct:1,expl:"'Chaine au pic' = la chaine est tendue verticalement sous l'ecubier, indiquant que le navire est directement au-dessus de l'ancre. C'est le signal que l'ancre va se lever. L'officier de pont l'annonce a la passerelle qui peut alors faire de la machine pour aider le levage."},
    {q:"Quais sao os metodos de detecao do arrasto?",opts:["Olhar apenas para o mar","Marcacoes repetidas sobre marcas fixas + alarme GPS + vibracoes corrente + vigiar embarcacoes vizinhas","Contar as manilhas","Observar a cor da agua"],correct:1,expl:"Methodes de detection garreo : (1) Relever des amers fixes toutes les 30 min — si les releves changent, le navire derive. (2) Alarme GPS configuree en cercle autour du point d'ancrage. (3) Vibrations ou a-coups dans la chaine. (4) Comparer sa position aux navires voisins. Plusieurs methodes simultanees."},
    {q:"Qual fundo oferece a melhor retencao para uma ancora Hall?",opts:["Rocha","Areia ou vasa — melhor penetracao e aderencia","Calhaus","Ervas"],correct:1,expl:"Le sable et la vase sont les meilleurs fonds pour une ancre Hall. En sable : l'ancre penetre rapidement et developpe une excellente resistance par friction. En vase : bonne tenue mais attention a la suction au levage. La roche, les galets et l'herbier sont a eviter."},
    {q:"A que correspondem os simbolos S, M, R, Wd numa carta nautica?",opts:["Sinais, Marca, Rocha, Vento","Sand (areia), Mud (vasa), Rock (rocha), Weed (ervas) — natureza do fundo","Seguranca, Fundeadouro, Rada, Vento dominante","Sondagem, Marcha, Rapido, Deriva"],correct:1,expl:"Sur les cartes marines (SHOM/IHO) : S = Sand (sable), M = Mud (vase/boue), R = Rock (roche), Cy = Clay (argile), G = Gravel (gravier), Sh = Shells (coquilles), Wd = Weed (herbier/algues). Ces annotations permettent de choisir le meilleur emplacement de mouillage."},
    {q:"O que e o fundeio com duas ancoras?",opts:["Um procedimento de emergencia apenas","Tecnica para reduzir circulo de evolucao, aguentar em corrente alternada ou reforcar retencao com mau tempo","Obrigatorio no porto","Usada apenas por veleiros"],correct:1,expl:"Le mouillage avec deux ancres est utilise pour : (1) Limiter le cercle d'evolution en espace confine — les deux ancres en V. (2) Tenir en courant alternatif (maree) — ancres dans l'axe du courant. (3) Renforcer la tenue par mauvais temps. Configuration courante : ancres deployees en V (30-60 degres entre les deux chaines)."},
    {q:"Qual e o procedimento recomendado se suspeitar de arrasto?",opts:["Esperar que o tempo melhore","Verificar arrasto, filar mais corrente, arrancar maquinas em espera, preparar para zarpar se necessario","Parar o motor do molinete","Chamar socorro imediatamente"],correct:1,expl:"Procedure de garreo : (1) Confirmer le garreo par relevement et GPS. (2) Alerter le capitaine. (3) Filer plus de chaine pour augmenter la tenue. (4) Demarrer les machines pour alleger la traction sur l'ancre. (5) Si le garreo continue : lever l'ancre et se mettre en route ou changer de position. Ne jamais attendre que la situation devienne critique."},
    {q:"O que significa 'corrente em catenaria'?",opts:["A corrente esta reta e tensa","A corrente forma uma curva natural para baixo — absorve choques e assegura tracao horizontal sobre a ancora","A corrente esta enrolada","A corrente e curta"],correct:1,expl:"La catenaire est la courbe naturelle que forme la chaine entre l'ecubier et le fond sous son propre poids. Elle joue un role d'amortisseur : absorbe les chocs des vagues et du vent. Elle assure un angle de traction proche de l'horizontal sur l'ancre (meilleure tenue). Chaine tendue = pas de catenaire = mauvaise tenue = signe possible de garreo."},
    {q:"Que criterios para escolher um bom local de fundeio?",opts:["Apenas a profundidade","Protecao meteorologica, tipo fundo, profundidade, circulo evolucao, cabos submarinos, regulamentacao local","A proximidade ao porto","Apenas a cor da agua"],correct:1,expl:"Criteres de choix d'un mouillage : (1) Protection meteo — abri naturel vent/houle. (2) Fond S ou M preferentiel. (3) Profondeur adaptee au tirant d'eau + scope. (4) Espace suffisant pour le cercle d'evolution (chaine+longueur navire). (5) Absence de cables sous-marins (consulter la carte). (6) Zones de mouillage autorisees (reglementation locale, zones protegees)."},
    {q:"O que e um fundeio em rada aberta?",opts:["Fundeio protegido num porto","Fundeio em mar aberto sem abrigo natural — precaucoes maximas necessarias","Fundeio com duas ancoras","Fundeio permanente"],correct:1,expl:"La rade foraine est un mouillage en zone exposee sans protection naturelle. Utilise pour : transbordement en mer, attente port, avitaillement ancre. Precautions : scope minimum 5:1, quart permanent, machines en standby, pret a appareiller a tout moment. Interdit par vents forts si alternative disponible."},
    {q:"Que ordem da ponte para iniciar o fundeio?",opts:["'Para maquina'","'Fundeiem!' ou 'Let go!' — ordem definitiva para largar a ancora","'Preparados para fundeiar'","'Molinete pronto'"],correct:1,expl:"La procedure est sequentielle : (1) 'Parez a mouiller' = positionnement et standby. (2) 'Parez' du pont = ancre surplombant l'eau. (3) 'MOUILLEZ !' = ordre definitif — l'ancre est lachee. Le timonier/bosco confirme 'Ancre a l'eau'. La passerelle annonce prealablement la profondeur et le nombre d'ecailles a filer."},
  ],
};

// Local QuestionBank/QuizComp components removed 2026-09-03 — now using
// LessonShared's shared components (same architecture as d1-d4/d7/L6/L7),
// consuming the exported BANK/QUIZ above/below instead of a baked-in array.

// ══════════════════════════════════════
// QUIZ DATA — 5 QCM
// ══════════════════════════════════════
export const QUIZ={
  fr:[
    {q:"Quelle est la longueur d'une ecaille de chaine et son equivalent en metres ?",
      opts:["1 ecaille = 15 m","1 ecaille = 27,5 m","1 ecaille = 30 m","1 ecaille = 50 m"],
      correct:1,expl:"1 ecaille = 27,5 metres (standard IMO). La chaine est marquee tous les 27,5m par des maillons de couleur ou des marques peintes. Calcul ecailles : longueur (m) / 27,5. Toujours arrondir au superieur pour la securite."},
    {q:"Quelle quantite de chaine filer par 8m de fond par vent moderé (force 4-5) avec scope 4:1 ?",
      opts:["16 m (0.6 ecaille)","32 m (1.2 ecaille)","40 m (1.5 ecailles)","56 m (2 ecailles)"],
      correct:1,expl:"Calcul : 8m x 4 = 32m de chaine. 32 / 27,5 = 1,16 => 2 ecailles (55m) pour la securite. La regle pratique : scope minimum 3:1 par beau temps, 4-5:1 vent moderé, 6-7:1 frais-fort, 7:1+ en tempete."},
    {q:"Pourquoi est-il interdit de mouiller sur la posidonie en Mediterranee ?",
      opts:["Elle endommage l'ancre","C'est une plante endemique protegee — amende 150 000 euros — production O2 et viveiro poissons","Elle cache les cailloux","Les cartes ne l'indiquent pas"],
      correct:1,expl:"La posidonie (Posidonia oceanica) est une plante a fleurs protegee depuis 1988 (loi 88-1261). Elle produit 20L O2/m2/jour, sert de viveiro, capte le CO2. Amende jusqu'a 150 000 euros. La reconnaitre : eau verte-brune, vegetation visible, symbole Wd sur la carte."},
    {q:"Quel est le signal du pont a la passerelle indiquant que l'ancre est directement en-dessous ?",
      opts:["'Ancre securisee'","'Chaine au pic' — la chaine est verticale, l'ancre est sous le navire","'Mouillage termine'","'Guindeau arrete'"],
      correct:1,expl:"'Chaine au pic' (ou 'Up and down') signifie que la chaine est tendue verticalement. Le navire est directement au-dessus de l'ancre qui va se lever. La passerelle peut faire de la machine AVANT pour aider le levage. Ce signal est annonco a la passerelle pour coordination."},
    {q:"Dans le dialogue de mouillage, quel ordre definitif declenche le lacher de l'ancre ?",
      opts:["'Parez a mouiller'","'Machine stop'","'MOUILLEZ !' ou 'LET GO !'","'Guindeau en marche'"],
      correct:2,expl:"La sequence : (1) 'Parez a mouiller' = preparer et positionner l'ancre. (2) 'Parez' du pont = ancre surplombant l'eau, prete. (3) 'MOUILLEZ !' = ordre definitif de lacher l'ancre. Le pont confirme 'Ancre a l'eau' et annonce chaque ecaille filee. La passerelle annonce prealablement profondeur et nombre d'ecailles."},
  ],
  en:[
    {q:"What is the length of one chain shackle and its equivalent in metres?",
      opts:["1 shackle = 15 m","1 shackle = 27.5 m","1 shackle = 30 m","1 shackle = 50 m"],
      correct:1,expl:"1 shackle = 27.5 metres (IMO standard). The chain is marked every 27.5m by colored links or painted marks. Shackle calculation: length (m) / 27.5. Always round up for safety."},
    {q:"How much chain to veer for 8m depth in moderate wind (force 4-5) with scope 4:1?",
      opts:["16 m (0.6 shackle)","32 m (1.2 shackle)","40 m (1.5 shackles)","56 m (2 shackles)"],
      correct:1,expl:"Calculation: 8m x 4 = 32m of chain. 32 / 27.5 = 1.16 => 2 shackles (55m) for safety. Practical rule: minimum scope 3:1 fair weather, 4-5:1 moderate wind, 6-7:1 fresh-strong, 7:1+ in storm."},
    {q:"Why is it prohibited to anchor on posidonia in the Mediterranean?",
      opts:["It damages the anchor","It is a protected endemic plant — 150,000 euro fine — O2 production and fish nursery","It hides rocks","Charts don't show it"],
      correct:1,expl:"Posidonia oceanica is a flowering plant protected since 1988 (law 88-1261). It produces 20L O2/m2/day, serves as nursery, captures CO2. Fine up to 150,000 euros. Identify it: greenish-brown water, visible vegetation, Wd symbol on chart."},
    {q:"What is the deck signal to the bridge indicating the anchor is directly below?",
      opts:["'Anchor secure'","'Chain up and down' — chain is vertical, anchor is below the vessel","'Anchoring complete'","'Windlass stopped'"],
      correct:1,expl:"'Chain up and down' means the chain is taut vertically. The vessel is directly above the anchor which is about to break out. The bridge can use AHEAD engine to assist lifting. This signal is reported to bridge for coordination."},
    {q:"In the anchoring dialogue, what definitive order triggers releasing the anchor?",
      opts:["'Standby to let go'","'Stop engine'","'LET GO!'","'Windlass running'"],
      correct:2,expl:"Sequence: (1) 'Standby to let go' = prepare and position anchor. (2) 'Ready' from deck = anchor clear of water. (3) 'LET GO!' = definitive order to release anchor. Deck confirms 'Anchor away' and announces each shackle veered. Bridge announces depth and shackles beforehand."},
  ],
  es:[
    {q:"?Cual es la longitud de un grillete de cadena y su equivalente en metros?",
      opts:["1 grillete = 15 m","1 grillete = 27,5 m","1 grillete = 30 m","1 grillete = 50 m"],
      correct:1,expl:"1 grillete = 27,5 metros (estandar OMI). La cadena esta marcada cada 27,5m. Calculo grilletes: longitud (m) / 27,5. Siempre redondear hacia arriba por seguridad."},
    {q:"?Cuanta cadena largar para 8m de fondo con viento moderado (fuerza 4-5) con scope 4:1?",
      opts:["16 m (0,6 grillete)","32 m (1,2 grillete)","40 m (1,5 grilletes)","56 m (2 grilletes)"],
      correct:1,expl:"Calculo: 8m x 4 = 32m de cadena. 32 / 27,5 = 1,16 => 2 grilletes (55m) por seguridad."},
    {q:"?Por que esta prohibido fondear en posidonia en el Mediterraneo?",
      opts:["Dana el ancla","Es una planta protegida — multa 150.000 euros — produccion O2 y vivero de peces","Oculta las rocas","Las cartas no la muestran"],
      correct:1,expl:"La posidonia es una planta con flores protegida desde 1988 (ley 88-1261). Produce 20L O2/m2/dia, sirve de vivero, capta CO2. Multa hasta 150.000 euros."},
    {q:"?Cual es la senal del puente a proa indicando que el ancla esta directamente abajo?",
      opts:["'Ancla asegurada'","'Cadena a pique' — cadena vertical, ancla bajo el buque","'Fondeo terminado'","'Molinete parado'"],
      correct:1,expl:"'Cadena a pique' significa que la cadena esta verticalmente tensa. El buque esta directamente sobre el ancla que va a desprenderse. El puente puede usar maquina AVANTE para ayudar el izado."},
    {q:"En el dialogo de fondeo, ?que orden definitiva desencadena el largue del ancla?",
      opts:["'Listos para fondear'","'Para maquina'","'FONDEEN!' o 'LET GO !'","'Molinete en marcha'"],
      correct:2,expl:"Secuencia: (1) 'Listos para fondear'. (2) 'Listos' desde cubierta. (3) 'FONDEEN!' = orden definitiva. Cubierta confirma 'Ancla al agua' y anuncia cada grillete largado."},
  ],
  pt:[
    {q:"Qual e o comprimento de uma manilha de corrente e o seu equivalente em metros?",
      opts:["1 manilha = 15 m","1 manilha = 27,5 m","1 manilha = 30 m","1 manilha = 50 m"],
      correct:1,expl:"1 manilha = 27,5 metros (padrao IMO). A corrente e marcada a cada 27,5m. Calculo manilhas: comprimento (m) / 27,5. Sempre arredondar para cima por seguranca."},
    {q:"Quanto de corrente filar para 8m de fundo com vento moderado (forca 4-5) com scope 4:1?",
      opts:["16 m (0,6 manilha)","32 m (1,2 manilha)","40 m (1,5 manilhas)","56 m (2 manilhas)"],
      correct:1,expl:"Calculo: 8m x 4 = 32m de corrente. 32 / 27,5 = 1,16 => 2 manilhas (55m) por seguranca."},
    {q:"Por que e proibido fundeiar em posidonia no Mediterraneo?",
      opts:["Danifica a ancora","E uma planta protegida — multa 150.000 euros — producao O2 e viveiro de peixes","Esconde as rochas","As cartas nao a mostram"],
      correct:1,expl:"A posidonia e uma planta com flores protegida desde 1988 (lei 88-1261). Produz 20L O2/m2/dia, serve de viveiro, capta CO2. Multa ate 150.000 euros."},
    {q:"Qual e o sinal do convés a ponte indicando que a ancora esta diretamente abaixo?",
      opts:["'Ancora segura'","'Corrente apique' — corrente vertical, ancora sob o navio","'Fundeio terminado'","'Molinete parado'"],
      correct:1,expl:"'Corrente apique' significa que a corrente esta tensa verticalmente. O navio esta diretamente sobre a ancora que vai desprender. A ponte pode usar maquina AVANTE para ajudar a izar."},
    {q:"No dialogo de fundeio, que ordem definitiva desencadeia a largada da ancora?",
      opts:["'Preparados para fundeiar'","'Para maquina'","'FUNDEIEM!' ou 'LET GO!'","'Molinete em marcha'"],
      correct:2,expl:"Sequencia: (1) 'Preparados para fundeiar'. (2) 'Prontos' do convés. (3) 'FUNDEIEM!' = ordem definitiva. Convés confirma 'Ancora na agua' e anuncia cada manilha filada."},
  ],
};

// ══════════════════════════════════════
// CONTENT DATA
// ══════════════════════════════════════
const getContent=(lang)=>{
  const d={
    fr:{
      badge:"Seamanship · Lecon 3/5 · Premium · 180 XP",
      title:"Mouillage & Apparaux de Mouillage",
      intro:"Une ancre de 10 tonnes peut tenir un VLCC de 300 metres. Pas par magie — par geometrie, physique et connaissance du fond.\n\nCette lecon couvre les types d'ancres, les apparaux de mouillage, les fonds marins, le calcul du scope, la procedure complete et le dialogue passerelle-pont.",
      p1:"PARTIE 1 — TYPES D'ANCRES",s1t:"Hall · Danforth · CQR · Bruce · Grappin",
      s1:"5 TYPES PRINCIPAUX:\nHall (1-20t) : standard navires marchands — tenue universelle\nDanforth : plaisance — excellente en sable — legere\nCQR/Charrue : voiliers hauturiers — bonne penetration\nBruce/Griffon : offshore — pose rapide automatique\nGrappin : dinghies, recuperation — fond rocheux\n\nCHOIX SELON LE NAVIRE:\nNavire marchand > 500t : ancre Hall obligatoire\nVoilier : CQR ou Bruce selon le fond\nPlaisance rapide : Danforth en sable\n\nCRITERES DE CHOIX:\n→ Poids du navire et de l'ancre\n→ Type de fond prevu\n→ Profondeur d'utilisation",
      p2:"PARTIE 2 — APPARAUX DE MOUILLAGE",s2t:"Guindeau · Ecubier · Chaine · Puits · Orinque",
      s2:"APPAREILLAGE COMPLET:\nGuindeau : machine elec/hydraulique — vire/file la chaine\n→ 50-200 kW sur VLCC — commande pont ET passerelle\nEcubier : tube acier guide chaine jusqu'a l'eau\nChaine calibree : 1 ecaille = 27,5 m — marquage colore\nPuits a chaine : compartiment stockage sous pont AV\nBossoir : structure support ancre — frein de gueuse\nOrinque : boue flottante — recuperation fond rocheux\n\nFREIN DE GUEUSE (devil's claw):\nCrochet metal verrouille sur maillon de chaine\nSupporte le poids independamment du guindeau\nTOUJOURS engager apres mouillage\n\nMARQUAGE CHAINE:\n1 ecaille = 27,5m — anneau rouge/blanc par ecaille",
      p3:"PARTIE 3 — TYPES DE FONDS",s3t:"Sable · Vase · Roche · Posidonie · Gravier",
      s3:"TENUE SELON LE FOND:\nSable (S) : EXCELLENTE — ancre penetre facilement\nVase (M) : BONNE — attention suction au levage\nRoche (R) : TRES MAUVAISE — risque coincement\nHerbier/Posidonie (Wd) : INTERDIT + amende 150 000 euro\nGravier (G) : MEDIOCRE — scope minimum 5:1\n\nLECTURE CARTE MARINE:\nS = Sand | M = Mud | R = Rock\nCy = Clay | G = Gravel | Sh = Shells | Wd = Weed\n\nPOSIDONIE (Posidonia oceanica):\nPlante a fleurs endemique Mediterranee (pas une algue)\nProtegee loi 88-1261 depuis 1988\n20L O2/m2/jour — viveiro poissons — carbone\nRecognaitre : eau verte-brune, vegetation visible",
      p4:"PARTIE 4 — SCOPE, PROCEDURE & DIALOGUE",s4t:"Calcul scope · Procedure · Radio passerelle-pont",
      s4:"CALCUL SCOPE:\nScope = longueur chaine / profondeur\nBeau temps (force < 4) : x3\nVent modere (force 4-5) : x4 a 5\nVent frais-fort (force 6-7) : x5 a 7\nTempete (> force 7) : x7+ ou appareiller\n\nCATENAIRE:\nCourbe naturelle de la chaine = amortisseur\nChaine tendue sans catenaire = signe de garreo\n\nCERCLE D'EVOLUTION:\nRayon = longueur chaine + longueur navire\nVerifier avant mouillage : espace suffisant\n\nGARREO : detecter par releves, GPS, vibrations chaine",
      p5:"EXERCICES PRATIQUES",p6:"CAS D'ACCIDENT REEL",p7:"BANQUE — 15 QUESTIONS",
      sumT:"RESUME — LECON 3 SEAMANSHIP",
      sumP:["1 ecaille de chaine = 27,5 m (standard IMO)","Scope = longueur chaine / profondeur — minimum 3:1 beau temps","Sable (S) et vase (M) : meilleurs fonds — Posidonie (Wd) INTERDIT","Guindeau : commande pont ET passerelle — frein de gueuse obligatoire apres mouillage","'Mouillez !' = ordre definitif passerelle — 'Ancre a l'eau' = confirmation pont","'Chaine au pic' = chaine verticale — ancre directement sous le navire","Catenaire = amortisseur — chaine tendue sans catenaire = signe de garreo","Orinque = boue flottante pour recuperer ancre coincee en fond rocheux","Garreo : confirmer par releves + GPS — filer chaine + demarrer machines","Posidonie : protegee loi 88-1261 — 20L O2/m2/j — amende 150 000 euros"],
      learnedP:["Types ancres et leurs terrains d'election","Apparaux : guindeau, ecubier, chaine, orinque","Fonds marins et tenue — posidonie interdite","Calcul scope selon profondeur et meteo","Procedure et dialogue passerelle-pont"],
    },
    en:{
      badge:"Seamanship · Lesson 3/5 · Premium · 180 XP",
      title:"Anchoring & Anchoring Equipment",
      intro:"A 10-tonne anchor can hold a 300-metre VLCC. Not by magic — by geometry, physics and knowledge of the seabed.\n\nThis lesson covers anchor types, anchoring equipment, seabed types, scope calculation, complete procedure and bridge-deck dialogue.",
      p1:"PART 1 — ANCHOR TYPES",s1t:"Hall · Danforth · CQR · Bruce · Grapnel",
      s1:"5 MAIN TYPES:\nHall (1-20t): merchant ship standard — universal holding\nDanforth: leisure — excellent in sand — lightweight\nCQR/Plow: offshore yachts — good penetration\nBruce/Claw: offshore — fast automatic setting\nGrapnel: dinghies, recovery — rocky bottom\n\nCHOICE BY VESSEL:\nMerchant vessel > 500t: Hall mandatory\nSailing yacht: CQR or Bruce by bottom type\nFast leisure: Danforth in sand\n\nCHOICE CRITERIA:\n→ Vessel and anchor weight\n→ Expected bottom type\n→ Depth of use",
      p2:"PART 2 — ANCHORING EQUIPMENT",s2t:"Windlass · Hawsepipe · Chain · Locker · Trip line",
      s2:"COMPLETE EQUIPMENT:\nWindlass: elec/hydraulic machine — heaves/veers chain\n→ 50-200 kW on VLCC — deck AND bridge control\nHawsepipe: steel tube guiding chain to water\nCalibrated chain: 1 shackle = 27.5 m — color marking\nChain locker: storage compartment under fore deck\nHawse/Bossoir: anchor support — devil's claw\nTrip line: floating buoy — rocky bottom recovery\n\nDEVIL'S CLAW:\nMetal hook locks on chain link\nSupports weight independently from windlass\nALWAYS engage after anchoring\n\nCHAIN MARKING:\n1 shackle = 27.5m — colored ring per shackle",
      p3:"PART 3 — SEABED TYPES",s3t:"Sand · Mud · Rock · Posidonia · Gravel",
      s3:"HOLDING BY BOTTOM:\nSand (S): EXCELLENT — anchor penetrates easily\nMud (M): GOOD — beware suction when weighing\nRock (R): VERY POOR — jamming risk\nWeed/Posidonia (Wd): PROHIBITED + 150,000 euro fine\nGravel (G): POOR — minimum scope 5:1\n\nCHART READING:\nS = Sand | M = Mud | R = Rock\nCy = Clay | G = Gravel | Sh = Shells | Wd = Weed\n\nPOSIDONIA (Posidonia oceanica):\nFlowering plant endemic to Mediterranean (not algae)\nProtected law 88-1261 since 1988\n20L O2/m2/day — fish nursery — carbon sink",
      p4:"PART 4 — SCOPE, PROCEDURE & DIALOGUE",s4t:"Scope calc · Procedure · Bridge-deck radio",
      s4:"SCOPE CALCULATION:\nScope = chain length / depth\nFair weather (force < 4): x3\nModerate wind (force 4-5): x4 to 5\nFresh-strong (force 6-7): x5 to 7\nStorm (> force 7): x7+ or get underway\n\nCATENARY:\nNatural chain curve = shock absorber\nTaut chain without catenary = dragging sign\n\nSWINGING CIRCLE:\nRadius = chain length + vessel length\nCheck before anchoring: sufficient space\n\nDRAGGING: detect by bearings, GPS, chain vibrations",
      p5:"PRACTICAL EXERCISES",p6:"REAL ACCIDENT CASE",p7:"BANK — 15 QUESTIONS",
      sumT:"SUMMARY — SEAMANSHIP LESSON 3",
      sumP:["1 chain shackle = 27.5 m (IMO standard)","Scope = chain length / depth — minimum 3:1 fair weather","Sand (S) and mud (M): best bottoms — Posidonia (Wd) PROHIBITED","Windlass: deck AND bridge control — devil's claw mandatory after anchoring","'Let go!' = definitive bridge order — 'Anchor away' = deck confirmation","'Chain up and down' = vertical chain — anchor directly below vessel","Catenary = shock absorber — taut chain without catenary = dragging sign","Trip line = floating buoy to recover anchor stuck in rocky bottom","Dragging: confirm by bearings + GPS — veer chain + start engines","Posidonia: protected law 88-1261 — 20L O2/m2/d — 150,000 euro fine"],
      learnedP:["Anchor types and their best bottoms","Equipment: windlass, hawsepipe, chain, trip line","Seabeds and holding — posidonia prohibited","Scope calculation by depth and weather","Procedure and bridge-deck dialogue"],
    },
    es:{
      badge:"Seamanship · Leccion 3/5 · Premium · 180 XP",
      title:"Fondeo & Aparatos de Fondeo",
      intro:"Un ancla de 10 toneladas puede mantener un VLCC de 300 metros. No por magia — por geometria, fisica y conocimiento del fondo.\n\nEsta leccion cubre los tipos de anclas, los aparatos de fondeo, los fondos marinos, el calculo del scope, el procedimiento completo y el dialogo puente-cubierta.",
      p1:"PARTE 1 — TIPOS DE ANCLAS",s1t:"Hall · Danforth · CQR · Bruce · Garfio",
      s1:"5 TIPOS PRINCIPALES:\nHall (1-20t): estandar buques mercantes — retencion universal\nDanforth: nautica — excelente en arena — ligera\nCQR/Arado: veleros de altura — buena penetracion\nBruce/Garra: offshore — posicion rapida automatica\nGarfio: botes, recuperacion — fondo rocoso",
      p2:"PARTE 2 — APARATOS DE FONDEO",s2t:"Molinete · Escobero · Cadena · Pocete · Orinque",
      s2:"EQUIPAMIENTO COMPLETO:\nMolinete: maquina elec/hidraulica — vira/larga cadena\nEscobero: tubo acero guia cadena hasta el agua\nCadena calibrada: 1 grillete = 27,5 m — marcado color\nPocete: compartimento almacenamiento bajo cubierta\nGarra del diablo: bloqueo mecanico cadena\nOrinque: boya flotante — recuperacion fondo rocoso",
      p3:"PARTE 3 — TIPOS DE FONDO",s3t:"Arena · Fango · Roca · Posidonia · Grava",
      s3:"RETENCION POR FONDO:\nArena (S): EXCELENTE | Fango (M): BUENA\nRoca (R): MUY MALA | Posidonia (Wd): PROHIBIDO + 150.000 euros\nGrava (G): MEDIOCRE — scope minimo 5:1\n\nLECTURA CARTA NAUTICA:\nS=Sand | M=Mud | R=Rock | Wd=Weed",
      p4:"PARTE 4 — SCOPE, PROCEDIMIENTO & DIALOGO",s4t:"Calculo scope · Procedimiento · Radio puente-cubierta",
      s4:"CALCULO SCOPE:\nScope = longitud cadena / profundidad\nBuen tiempo: x3 | Moderado: x4-5 | Fresco-fuerte: x5-7 | Temporal: x7+\n\nCATENARIA = amortiguador — cadena tesa = garreo\nCIRCULO EVOLUCION = longitud cadena + eslora",
      p5:"EJERCICIOS PRACTICOS",p6:"CASO REAL",p7:"BANCO — 15 PREGUNTAS",
      sumT:"RESUMEN — LECCION 3 SEAMANSHIP",
      sumP:["1 grillete = 27,5 m (estandar OMI)","Scope = longitud cadena / profundidad — minimo 3:1 buen tiempo","Arena (S) y fango (M): mejores fondos — Posidonia (Wd) PROHIBIDO","Molinete: control cubierta Y puente — garra del diablo obligatoria","'Fondeen!' = orden definitiva puente — 'Ancla al agua' = confirmacion cubierta","'Cadena a pique' = cadena vertical — ancla directamente bajo el buque","Catenaria = amortiguador — cadena tesa sin catenaria = garreo","Orinque = boya flotante para recuperar ancla enganchada en roca","Garreo: confirmar por marcaciones + GPS — largar cadena + arrancar maquinas","Posidonia: protegida ley 88-1261 — multa 150.000 euros"],
      learnedP:["Tipos de anclas y sus terrenos","Aparatos: molinete, escobero, cadena, orinque","Fondos y retencion — posidonia prohibida","Calculo scope segun profundidad y tiempo","Procedimiento y dialogo puente-cubierta"],
    },
    pt:{
      badge:"Seamanship · Licao 3/5 · Premium · 180 XP",
      title:"Fundeio & Aparelhos de Fundeio",
      intro:"Uma ancora de 10 toneladas pode segurar um VLCC de 300 metros. Nao por magia — por geometria, fisica e conhecimento do fundo.\n\nEsta licao cobre os tipos de ancora, os aparelhos de fundeio, os fundos marinhos, o calculo do scope, o procedimento completo e o dialogo ponte-convés.",
      p1:"PARTE 1 — TIPOS DE ANCORA",s1t:"Hall · Danforth · CQR · Bruce · Grapnel",
      s1:"5 TIPOS PRINCIPAIS:\nHall (1-20t): padrao navios mercantes — retencao universal\nDanforth: nautica — excelente em areia — leve\nCQR/Arado: veleiros de altura — boa penetracao\nBruce/Garra: offshore — posicao rapida automatica\nGrapnel: botes, recuperacao — fundo rochoso",
      p2:"PARTE 2 — APARELHOS DE FUNDEIO",s2t:"Molinete · Escovem · Corrente · Pocete · Orinque",
      s2:"EQUIPAMENTO COMPLETO:\nMolinete: maquina elét/hidraulica — vira/fila corrente\nEscovem: tubo aco guia corrente ate a agua\nCorrente calibrada: 1 manilha = 27,5 m — marcacao cor\nPocete: compartimento armazenamento sob convés\nGarra do diabo: bloqueio mecanico corrente\nOrinque: boia flutuante — recuperacao fundo rochoso",
      p3:"PARTE 3 — TIPOS DE FUNDO",s3t:"Areia · Vasa · Rocha · Posidonia · Gravilha",
      s3:"RETENCAO POR FUNDO:\nAreia (S): EXCELENTE | Vasa (M): BOA\nRocha (R): MUITO MA | Posidonia (Wd): PROIBIDO + 150.000 euros\nGravilha (G): MEDIOCRE — scope minimo 5:1",
      p4:"PARTE 4 — SCOPE, PROCEDIMENTO & DIALOGO",s4t:"Calculo scope · Procedimento · Radio ponte-convés",
      s4:"CALCULO SCOPE:\nScope = comprimento corrente / profundidade\nBom tempo: x3 | Moderado: x4-5 | Fresco-forte: x5-7 | Temporal: x7+\n\nCATENARIA = amortecedor — corrente tensa = arrasto\nCIRCULO EVOLUCAO = comprimento corrente + comprimento navio",
      p5:"EXERCICIOS PRATICOS",p6:"CASO REAL",p7:"BANCO — 15 QUESTOES",
      sumT:"RESUMO — LICAO 3 SEAMANSHIP",
      sumP:["1 manilha = 27,5 m (padrao IMO)","Scope = comprimento corrente / profundidade — minimo 3:1 bom tempo","Areia (S) e vasa (M): melhores fundos — Posidonia (Wd) PROIBIDO","Molinete: controlo convés E ponte — garra do diabo obrigatoria","'Fundeiem!' = ordem definitiva ponte — 'Ancora na agua' = confirmacao convés","'Corrente apique' = corrente vertical — ancora diretamente sob o navio","Catenaria = amortecedor — corrente tensa sem catenaria = arrasto","Orinque = boia flutuante para recuperar ancora encravada em rocha","Arrasto: confirmar por marcacoes + GPS — filar corrente + arrancar maquinas","Posidonia: protegida lei 88-1261 — multa 150.000 euros"],
      learnedP:["Tipos de ancora e seus terrenos","Aparelhos: molinete, escovem, corrente, orinque","Fundos e retencao — posidonia proibida","Calculo scope segundo profundidade e tempo","Procedimento e dialogo ponte-convés"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"MV PACIFIC ADVENTURER — Queensland, Australie (2009)",
      teaser:"Porte-conteneurs — Cyclone Hamish — 31 conteneurs perdus — 270 tonnes HFO deversees — Amende 25M$",
      what:"Le 11 mars 2009, le porte-conteneurs Pacific Adventurer mouille en rade de Moreton Bay (Queensland) pendant le passage du cyclone Hamish. Le mouillage est calcule avec un scope insuffisant pour les conditions extremes. Les chocs repetes des vagues provoquent le garreo. Dans la manoeuvre de fuite, 31 conteneurs de nitrate d'ammonium tombent a la mer, percent la citerne de HFO et deversent 270 tonnes en mer. La plage de Moreton Island est polluee sur 60 km.",
      cause:"- Scope insuffisant pour cyclone (scope utilise : 3:1 — requis : 7:1+)\n- Decision de rester au mouillage malgre la degradation meteorologique\n- Absence de plan d'urgence mouillage par conditions extremes\n- Arrimage conteneurs insuffisant pour conditions cycloniques\n- Retard de decision d'appareiller malgre les alertes cyclone",
      lessons:"- Scope minimum 7:1+ en conditions cycloniques — declencher l'appareillage avant le cyclone\n- Plan d'urgence mouillage : seuils de vent/houle declenchant l'appareillage\n- Arrimage conteneurs verifie pour conditions extremes\n- Ne jamais sous-estimer la degradation meteo rapide en zone cyclonique\n- AMSA (Australie) : reforme procedures mouillage en rade foraine cyclonique",
      link:"Lien L3 Mouillage : Le Pacific Adventurer illustre le danger d'un scope insuffisant et d'une decision trop tardive d'appareiller. La regla fondamentale : en cas de doute sur la meteo, appareiller AVANT le cyclone — ne jamais attendre que le garreo soit confirme."},
    en:{title:"MV PACIFIC ADVENTURER — Queensland, Australia (2009)",
      teaser:"Container ship — Cyclone Hamish — 31 containers lost — 270 tonnes HFO spilled — $25M fine",
      what:"On March 11, 2009, container ship Pacific Adventurer anchored in Moreton Bay roadstead (Queensland) during Cyclone Hamish's passage. The anchorage was calculated with insufficient scope for extreme conditions. Repeated wave shocks caused dragging. During the evasion maneuver, 31 ammonium nitrate containers fell overboard, puncturing the HFO tank and spilling 270 tonnes at sea. Moreton Island beach was polluted over 60 km.",
      cause:"- Insufficient scope for cyclone (scope used: 3:1 — required: 7:1+)\n- Decision to remain at anchor despite deteriorating weather\n- No emergency plan for extreme condition anchoring\n- Container lashing insufficient for cyclonic conditions\n- Delayed decision to get underway despite cyclone warnings",
      lessons:"- Minimum scope 7:1+ in cyclonic conditions — get underway before cyclone\n- Anchoring emergency plan: wind/swell thresholds triggering departure\n- Container lashing verified for extreme conditions\n- Never underestimate rapid weather deterioration in cyclone zone\n- AMSA (Australia): reformed anchoring procedures in cyclonic open roadstead",
      link:"L3 Anchoring Link: Pacific Adventurer illustrates the danger of insufficient scope and too-late departure decision. The fundamental rule: when in doubt about weather, get underway BEFORE the cyclone — never wait for dragging to be confirmed."},
    es:{title:"MV PACIFIC ADVENTURER — Queensland, Australia (2009)",
      teaser:"Portacontenedores — Ciclon Hamish — 31 contenedores perdidos — 270 toneladas HFO vertidas — Multa 25M$",
      what:"El 11 de marzo de 2009, el Pacific Adventurer fondeo en rada de Moreton Bay durante el ciclon Hamish. El scope era insuficiente para las condiciones extremas. El garreo provoco la perdida de 31 contenedores y el vertido de 270 toneladas de HFO.",
      cause:"- Scope insuficiente para ciclon (usado: 3:1 — requerido: 7:1+)\n- Decision de permanecer fondeado a pesar del ciclon\n- Sujeccion de contenedores insuficiente\n- Retraso en la decision de zarpar",
      lessons:"- Scope minimo 7:1+ en condiciones ciclonicas — zarpar antes del ciclon\n- Plan de emergencia fondeo con umbrales de viento/marejada\n- Nunca subestimar la rapida degradacion meteorologica en zona ciclonica",
      link:"Vinculo L3 Fondeo: El Pacific Adventurer ilustra el peligro de un scope insuficiente y una decision tardia de zarpar. Regla fundamental: ante duda meteorologica, zarpar ANTES del ciclon."},
    pt:{title:"MV PACIFIC ADVENTURER — Queensland, Australia (2009)",
      teaser:"Porta-contentores — Ciclone Hamish — 31 contentores perdidos — 270 toneladas HFO derramadas — Multa 25M$",
      what:"A 11 de marco de 2009, o Pacific Adventurer fundeou na rada de Moreton Bay durante o ciclone Hamish. O scope era insuficiente para as condicoes extremas. O arrasto provocou a perda de 31 contentores e o derrame de 270 toneladas de HFO.",
      cause:"- Scope insuficiente para ciclone (utilizado: 3:1 — necessario: 7:1+)\n- Decisao de permanecer fundeado apesar do ciclone\n- Fixacao de contentores insuficiente\n- Atraso na decisao de zarpar",
      lessons:"- Scope minimo 7:1+ em condicoes ciclonicas — zarpar antes do ciclone\n- Plano de emergencia fundeio com limiares de vento/ondulacao\n- Nunca subestimar a rapida degradacao meteorologica em zona ciclonica",
      link:"Ligacao L3 Fundeio: O Pacific Adventurer ilustra o perigo de scope insuficiente e decisao tardia de zarpar. Regra fundamental: perante duvida meteorologica, zarpar ANTES do ciclone."},
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
            {lang==="fr"?"LECONS APPRISES":lang==="en"?"LESSONS LEARNED":lang==="es"?"LECCIONES APRENDIDAS":"LICOES APRENDIDAS"}
          </div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line",marginBottom:12}}>{c.lessons}</div>
          <div style={{padding:"12px 14px",borderRadius:14,background:"rgba(255,179,0,0.08)",
            border:`1px solid ${C.amber}44`,fontSize:11,color:C.amber2,lineHeight:1.7}}>{c.link}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// MAIN EXPORT — ARCHITECTURE L1 EXACTE
// ══════════════════════════════════════
export default function LessonSEA_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
  useEffect(()=>{if(typeof window!=="undefined")window.__MAP_LANG__=lang;},[lang]);
  const t=T[lang]||T.fr;
  const quiz=QUIZ[lang]||QUIZ.fr;
  const bank=BANK[lang]||BANK.fr;
  const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);
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
      {/* HEADER */}
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
              {lang==="fr"?"Lecon 3/5":lang==="en"?"Lesson 3/5":lang==="es"?"Leccion 3/5":"Licao 3/5"}
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

      {/* SCROLL */}
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
              {icon:"⚓",p:lc.p1,s:lc.s1t,content:lc.s1,color:C.anchor,
                svg:<AnchorTypesSVG lang={lang}/>,
                svgLabel:lang==="fr"?"TYPES D'ANCRES — INTERACTIF":lang==="en"?"ANCHOR TYPES — INTERACTIVE":lang==="es"?"TIPOS DE ANCLAS — INTERACTIVO":"TIPOS DE ANCORA — INTERATIVO"},
              {icon:"⚙️",p:lc.p2,s:lc.s2t,content:lc.s2,color:C.teal2,
                svg:<ApparauxSVG lang={lang}/>,
                svgLabel:lang==="fr"?"APPARAUX — INTERACTIF":lang==="en"?"EQUIPMENT — INTERACTIVE":lang==="es"?"APARATOS — INTERACTIVO":"APARELHOS — INTERATIVO"},
              {icon:"🌊",p:lc.p3,s:lc.s3t,content:lc.s3,color:C.sand,
                svg:<SeabedSVG lang={lang}/>,
                svgLabel:lang==="fr"?"TYPES DE FONDS — INTERACTIF":lang==="en"?"SEABED TYPES — INTERACTIVE":lang==="es"?"TIPOS DE FONDO — INTERACTIVO":"TIPOS DE FUNDO — INTERATIVO"},
              {icon:"📐",p:lc.p4,s:lc.s4t,content:lc.s4,color:C.gold2,
                svg:<ScopeAndProcedureSVG lang={lang}/>,
                svgLabel:lang==="fr"?"SCOPE & PROCEDURE — INTERACTIF":lang==="en"?"SCOPE & PROCEDURE — INTERACTIVE":lang==="es"?"SCOPE & PROCEDIMIENTO — INTERACTIVO":"SCOPE & PROCEDIMENTO — INTERATIVO"},
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
              <QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/>
            </div>

            {/* RESUME */}
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
                {lang==="fr"?"Quiz — Mouillage & Apparaux":lang==="en"?"Quiz — Anchoring & Equipment":lang==="es"?"Quiz — Fondeo & Aparatos":"Quiz — Fundeio & Aparelhos"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · Seamanship L3</div>
            </div>
            <QuizComp questions={quiz} t={t}
              onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),400);}}/>
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
            <button onClick={onNext}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${C.gold},${C.amber})`,
                fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:900,letterSpacing:2,
                color:C.bg0,cursor:"pointer",boxShadow:`0 8px 30px rgba(201,146,42,0.3)`,marginBottom:12}}>
              {lang==="fr"?"LECON 4 — AMARRAGE =>":lang==="en"?"LESSON 4 — MOORING =>":lang==="es"?"LECCION 4 — AMARRE =>":"LICAO 4 — AMARRACAO =>"}
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
