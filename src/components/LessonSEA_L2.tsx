// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  knot:"#e8b94f", splice:"#6dbf8a", hitch:"#f97316", bend:"#38bdf8",
};

const T = {
  fr:{ back:"◀ Retour", module:"Seamanship", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Seamanship", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Seamanship", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Seamanship", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG KNOT DIAGRAMS
// ══════════════════════════════════════

// Bowline SVG
const BowlineSVG = () => (
  <svg viewBox="0 0 120 90" width="120" height="90">
    <rect width="120" height="90" fill="rgba(0,0,0,0.3)" rx="8"/>
    {/* Standing part */}
    <line x1="60" y1="5" x2="60" y2="30" stroke={C.knot} strokeWidth="3" strokeLinecap="round"/>
    {/* Loop */}
    <ellipse cx="60" cy="38" rx="14" ry="10" fill="none" stroke={C.knot} strokeWidth="3"/>
    {/* Working end going through */}
    <path d="M54,38 Q40,50 45,62 Q55,75 75,70 Q90,62 85,50 Q80,38 70,38" fill="none" stroke={C.splice} strokeWidth="3" strokeLinecap="round"/>
    {/* Arrow */}
    <text x="95" y="55" fill={C.splice} fontSize="8">↑</text>
    <text x="6" y="80" fill={C.knot} fontSize="7" fontFamily="monospace">BOWLINE</text>
  </svg>
);

// Clove Hitch SVG
const CloveHitchSVG = () => (
  <svg viewBox="0 0 120 90" width="120" height="90">
    <rect width="120" height="90" fill="rgba(0,0,0,0.3)" rx="8"/>
    {/* Vertical bar/post */}
    <rect x="50" y="5" width="20" height="80" fill="rgba(100,100,100,0.4)" rx="4"/>
    {/* First wrap */}
    <path d="M20,30 Q35,25 50,28 Q65,30 80,25 Q95,20 105,30" fill="none" stroke={C.hitch} strokeWidth="3" strokeLinecap="round"/>
    {/* Cross */}
    <line x1="50" y1="40" x2="70" y2="50" stroke={C.hitch} strokeWidth="2.5"/>
    {/* Second wrap */}
    <path d="M15,55 Q35,50 50,55 Q65,60 80,55 Q95,52 110,58" fill="none" stroke={C.hitch} strokeWidth="3" strokeLinecap="round"/>
    <text x="6" y="84" fill={C.hitch} fontSize="7" fontFamily="monospace">CLOVE HITCH</text>
  </svg>
);

// Figure Eight SVG
const FigureEightSVG = () => (
  <svg viewBox="0 0 120 90" width="120" height="90">
    <rect width="120" height="90" fill="rgba(0,0,0,0.3)" rx="8"/>
    {/* Standing part */}
    <line x1="60" y1="5" x2="60" y2="22" stroke={C.bend} strokeWidth="3" strokeLinecap="round"/>
    {/* Figure 8 shape */}
    <path d="M60,22 Q80,22 80,38 Q80,50 60,50 Q40,50 40,62 Q40,76 60,76 Q80,76 80,62" fill="none" stroke={C.bend} strokeWidth="3" strokeLinecap="round"/>
    {/* Working end */}
    <line x1="80" y1="62" x2="100" y2="78" stroke={C.bend} strokeWidth="3" strokeLinecap="round"/>
    <text x="6" y="84" fill={C.bend} fontSize="7" fontFamily="monospace">FIGURE-EIGHT</text>
  </svg>
);

// Round Turn Two Half Hitches SVG
const RoundTurnSVG = () => (
  <svg viewBox="0 0 120 90" width="120" height="90">
    <rect width="120" height="90" fill="rgba(0,0,0,0.3)" rx="8"/>
    {/* Ring */}
    <circle cx="30" cy="45" r="18" fill="none" stroke="rgba(150,150,150,0.6)" strokeWidth="4"/>
    {/* Round turn */}
    <path d="M30,27 Q55,20 70,30 Q85,40 70,55 Q55,65 30,63" fill="none" stroke={C.hitch} strokeWidth="3" strokeLinecap="round"/>
    <path d="M30,32 Q50,26 62,36" fill="none" stroke={C.hitch} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3,2"/>
    {/* Two half hitches */}
    <path d="M70,30 Q80,25 85,35 Q88,42 80,44" fill="none" stroke={C.knot} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M80,44 Q88,44 92,52 Q95,60 86,62" fill="none" stroke={C.knot} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="86" y1="62" x2="110" y2="70" stroke={C.knot} strokeWidth="2.5" strokeLinecap="round"/>
    <text x="6" y="84" fill={C.hitch} fontSize="6" fontFamily="monospace">RT+2HH</text>
  </svg>
);

// Cleat Hitch SVG
const CleatHitchSVG = () => (
  <svg viewBox="0 0 120 90" width="120" height="90">
    <rect width="120" height="90" fill="rgba(0,0,0,0.3)" rx="8"/>
    {/* Cleat shape */}
    <rect x="30" y="38" width="60" height="14" fill="rgba(120,90,50,0.5)" rx="3"/>
    <rect x="25" y="42" width="10" height="6" fill="rgba(160,120,70,0.7)" rx="2"/>
    <rect x="85" y="42" width="10" height="6" fill="rgba(160,120,70,0.7)" rx="2"/>
    {/* Figure-8 pattern around cleat */}
    <path d="M10,30 Q30,28 40,42 Q50,56 60,44 Q70,32 80,42 Q90,52 110,50" fill="none" stroke={C.knot} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M40,42 Q50,30 60,42 Q70,54 80,44" fill="none" stroke={C.gold2} strokeWidth="2" strokeLinecap="round" strokeDasharray="3,2"/>
    <text x="6" y="84" fill={C.knot} fontSize="7" fontFamily="monospace">CLEAT HITCH</text>
  </svg>
);

// Sheet Bend SVG
const SheetBendSVG = () => (
  <svg viewBox="0 0 120 90" width="120" height="90">
    <rect width="120" height="90" fill="rgba(0,0,0,0.3)" rx="8"/>
    {/* First rope - bight */}
    <path d="M10,40 Q30,30 50,40 Q60,46 50,56 Q30,66 10,56" fill="none" stroke={C.bend} strokeWidth="3.5" strokeLinecap="round"/>
    {/* Second rope through bight */}
    <path d="M80,20 Q65,28 50,38 Q42,44 50,56 Q56,62 70,58 Q90,52 110,58" fill="none" stroke={C.splice} strokeWidth="3" strokeLinecap="round"/>
    <text x="6" y="84" fill={C.bend} fontSize="7" fontFamily="monospace">SHEET BEND</text>
  </svg>
);

// Rolling Hitch SVG
const RollingHitchSVG = () => (
  <svg viewBox="0 0 120 90" width="120" height="90">
    <rect width="120" height="90" fill="rgba(0,0,0,0.3)" rx="8"/>
    {/* Horizontal spar/rope */}
    <line x1="5" y1="45" x2="115" y2="45" stroke="rgba(150,150,150,0.5)" strokeWidth="8" strokeLinecap="round"/>
    {/* Two wraps (same side) */}
    <path d="M35,20 Q55,22 55,45 Q55,68 35,70" fill="none" stroke={C.hitch} strokeWidth="3" strokeLinecap="round"/>
    <path d="M50,20 Q70,22 70,45 Q70,68 50,70" fill="none" stroke={C.hitch} strokeWidth="2.5" strokeLinecap="round"/>
    {/* Half hitch */}
    <path d="M70,30 Q85,25 90,38 Q93,50 82,54" fill="none" stroke={C.knot} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="82" y1="54" x2="110" y2="65" stroke={C.knot} strokeWidth="2.5" strokeLinecap="round"/>
    <text x="6" y="84" fill={C.hitch} fontSize="7" fontFamily="monospace">ROLLING HITCH</text>
  </svg>
);

// Reef Knot SVG
const ReefKnotSVG = () => (
  <svg viewBox="0 0 120 90" width="120" height="90">
    <rect width="120" height="90" fill="rgba(0,0,0,0.3)" rx="8"/>
    {/* Left rope */}
    <path d="M5,35 Q25,28 40,42 Q50,52 62,44 Q72,36 90,42 Q105,48 115,40" fill="none" stroke={C.bend} strokeWidth="3" strokeLinecap="round"/>
    {/* Right rope */}
    <path d="M5,55 Q20,62 35,52 Q48,44 58,52 Q70,60 85,52 Q98,44 115,52" fill="none" stroke={C.splice} strokeWidth="3" strokeLinecap="round"/>
    {/* Center interlock */}
    <ellipse cx="60" cy="48" rx="12" ry="8" fill="none" stroke={C.knot} strokeWidth="1.5" strokeDasharray="3,2"/>
    <text x="6" y="84" fill={C.bend} fontSize="7" fontFamily="monospace">REEF KNOT</text>
  </svg>
);

// ══════════════════════════════════════
// SVG 1 — KNOTS CARDS WITH DIAGRAMS
// ══════════════════════════════════════
function KnotsCardsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const knots = [
    { id:"bowline", cat:"loop", color:C.knot, icon:"🪢",
      Diagram: BowlineSVG,
      label:{fr:"Nœud de chaise (Bowline)",en:"Bowline",es:"As de guía",pt:"Nó de lais de guia"},
      strength:{fr:"70-75% de résistance",en:"70-75% strength retention",es:"70-75% de resistencia",pt:"70-75% de resistência"},
      desc:{fr:"LE NŒUD DE BASE DU MARIN\n\nUSAGES :\n→ Boucle fixe dans une aussière\n→ Attacher un homme à la mer\n→ Nœud de sauvetage (boucle autour du corps)\n→ Fixer une écoute à une voile\n→ Ligne de mouillage légère\n\nPROPRIÉTÉS :\n→ Ne se resserre PAS sous charge\n→ Se défait facilement après charge\n→ Boucle reste de taille fixe\n→ Ne glisse pas\n\nPOINT FAIBLE :\n✗ Peut se dénouer si charge latérale\n✗ Ne pas utiliser en charge alternée\n\nMOYEN MNÉMO :\n'Le lapin sort du terrier,\ntourne autour de l'arbre\net rentre dans le terrier'",
             en:"THE SAILOR'S BASIC KNOT\n\nUSES:\n→ Fixed loop in a mooring line\n→ Attaching a man overboard\n→ Rescue knot (loop around body)\n→ Attaching sheet to sail\n→ Light mooring line\n\nPROPERTIES:\n→ Does NOT tighten under load\n→ Comes undone easily after load\n→ Loop stays fixed size\n→ Does not slip\n\nWEAK POINT:\n✗ Can come undone with lateral load\n✗ Do not use under alternating load\n\nMEMORY AID:\n'The rabbit comes out of the hole,\ngoes around the tree,\nand goes back into the hole'",
             es:"EL NUDO BÁSICO DEL MARINERO\n\nUSOS:\n→ Lazo fijo en un cabo de amarre\n→ Atar a un hombre al agua\n→ Nudo de rescate (lazo alrededor del cuerpo)\n→ Atar la escota a la vela\n→ Cabo de fondeo ligero\n\nPROPIEDADES:\n→ NO se aprieta bajo carga\n→ Se deshace fácilmente después de la carga\n→ El lazo mantiene tamaño fijo\n→ No resbala\n\nRECUERSO NEMOTÉCNICO:\n'El conejo sale de la madriguera,\nda la vuelta al árbol\ny vuelve a la madriguera'",
             pt:"O NÓ BÁSICO DO MARINHEIRO\n\nUSOS:\n→ Laço fixo num cabo de amarração\n→ Prender um homem ao mar\n→ Nó de salvamento (laço em torno do corpo)\n→ Prender a escota à vela\n→ Cabo de fundeamento leve\n\nPROPRIEDADES:\n→ NÃO aperta sob carga\n→ Desata-se facilmente após carga\n→ O laço mantém tamanho fixo\n→ Não escorrega\n\nRECURSO MNEMÓNICO:\n'O coelho sai da toca,\ndá a volta à árvore\ne volta para a toca'"} },
    { id:"clovehitch", cat:"hitch", color:C.hitch, icon:"⚓",
      Diagram: CloveHitchSVG,
      label:{fr:"Demi-clef à capeler (Clove Hitch)",en:"Clove Hitch",es:"Ballestrinque",pt:"Volta do fiel"},
      strength:{fr:"60-65% de résistance",en:"60-65% strength retention",es:"60-65% de resistencia",pt:"60-65% de resistência"},
      desc:{fr:"NŒUD D'AMARRAGE RAPIDE\n\nUSAGES :\n→ Amarrage rapide à un piton, taquet ou bitte\n→ Débuter une commande (nœud de départ)\n→ Hissage de pavillon\n→ Amarrage temporaire à un poteau\n→ Attacher un fender (défense)\n\nPROPRIÉTÉS :\n→ Se fait très rapidement\n→ Tient bien sur surface cylindrique\n→ Glisse sur surface lisse sous charge asymétrique\n\nIMPORTANT :\n✗ Peut se desserrer si charge alternée\n✗ Doit être complété d'un demi-clef si charge forte\n✓ Parfait pour amarrage temporaire\n\nPOSITION CORRECTE :\nLes deux boucles doivent être\nbien serrées l'une contre l'autre",
             en:"QUICK MOORING KNOT\n\nUSES:\n→ Quick mooring to a pin, cleat, or bitt\n→ Start a lashing (starting knot)\n→ Flag hoisting\n→ Temporary mooring to a post\n→ Attaching fender (side bumper)\n\nPROPERTIES:\n→ Made very quickly\n→ Holds well on cylindrical surface\n→ Slips on smooth surface under asymmetric load\n\nIMPORTANT:\n✗ Can work loose under alternating load\n✗ Should be completed with half-hitch if heavy load\n✓ Perfect for temporary mooring\n\nCORRECT POSITION:\nBoth loops must be\nwell tightened against each other",
             es:"NUDO DE AMARRE RÁPIDO\n\nUSOS:\n→ Amarre rápido a un perno, cornamusa o bita\n→ Iniciar una trinca (nudo de inicio)\n→ Izado de banderas\n→ Amarre temporal a un poste\n→ Fijar un defensas\n\nPROPIEDADES:\n→ Se hace muy rápidamente\n→ Aguanta bien en superficie cilíndrica\n→ Resbala en superficie lisa bajo carga asimétrica\n\nIMPORTANTE:\n✗ Puede aflojarse bajo carga alternada\n✓ Perfecto para amarre temporal",
             pt:"NÓ DE AMARRAÇÃO RÁPIDA\n\nUSOS:\n→ Amarração rápida a um perno, mordente ou bita\n→ Iniciar uma trinça (nó de início)\n→ Içamento de bandeiras\n→ Amarração temporária a um poste\n→ Prender defensas\n\nPROPRIEDADES:\n→ Faz-se muito rapidamente\n→ Segura bem em superfície cilíndrica\n→ Escorrega em superfície lisa sob carga assimétrica\n\nIMPORTANTE:\n✗ Pode desapertar sob carga alternada\n✓ Perfeito para amarração temporária"} },
    { id:"figureeight", cat:"stopper", color:C.bend, icon:"8️⃣",
      Diagram: FigureEightSVG,
      label:{fr:"Nœud en huit (Figure-eight)",en:"Figure-eight knot",es:"Nudo en ocho",pt:"Nó em oito"},
      strength:{fr:"75-80% de résistance",en:"75-80% strength retention",es:"75-80% de resistencia",pt:"75-80% de resistência"},
      desc:{fr:"NŒUD D'ARRÊT UNIVERSEL\n\nUSAGES :\n→ Nœud d'arrêt en bout de cordage (empêche de passer dans une poulie)\n→ Nœud de départ pour épissure\n→ Alternative au nœud simple (plus résistant)\n→ Base du nœud de grimpe (huit de guide)\n\nPROPRIÉTÉS :\n→ Ne glisse pas sur surface lisse\n→ Plus résistant que le nœud simple (45%)\n→ Se défait plus facilement après charge\n→ Facile à identifier et vérifier visuellement\n\nAVANTAGE :\n✓ Laisse 75-80% de la résistance\n✓ Ne se bloque pas définitivement\n✓ Peut être fait avec une main\n✓ Universel — textiles et acier",
             en:"UNIVERSAL STOPPER KNOT\n\nUSES:\n→ Stopper knot at rope end (prevents passing through block)\n→ Starting knot for splice\n→ Alternative to overhand knot (stronger)\n→ Base of climbing knot (figure-eight loop)\n\nPROPERTIES:\n→ Does not slip on smooth surfaces\n→ Stronger than simple overhand (45%)\n→ Comes undone more easily after load\n→ Easy to identify and check visually\n\nADVANTAGE:\n✓ Retains 75-80% strength\n✓ Does not jam permanently\n✓ Can be tied with one hand\n✓ Universal — textile and wire",
             es:"NUDO DE TOPE UNIVERSAL\n\nUSOS:\n→ Nudo de tope en el extremo del cabo (evita pasar por una polea)\n→ Nudo de inicio para costura\n→ Alternativa al nudo simple (más resistente)\n→ Base del nudo de escalada (ocho de guía)\n\nPROPIEDADES:\n→ No resbala en superficies lisas\n→ Más resistente que el nudo simple (45%)\n→ Se deshace más fácilmente después de la carga\n→ Fácil de identificar y verificar visualmente",
             pt:"NÓ DE TOPE UNIVERSAL\n\nUSOS:\n→ Nó de tope no extremo do cabo (evita passar por uma roldana)\n→ Nó de início para costura\n→ Alternativa ao nó simples (mais resistente)\n→ Base do nó de escalada (oito de guia)\n\nPROPRIEDADES:\n→ Não escorrega em superfícies lisas\n→ Mais resistente que o nó simples (45%)\n→ Desata-se mais facilmente após carga\n→ Fácil de identificar e verificar visualmente"} },
    { id:"roundturn", cat:"hitch", color:C.hitch, icon:"🔁",
      Diagram: RoundTurnSVG,
      label:{fr:"Tour mort et deux demi-clefs (RT+2HH)",en:"Round turn & 2 half hitches",es:"Vuelta redonda y 2 medios cotes",pt:"Volta redonda e 2 meias-voltas"},
      strength:{fr:"65-70% de résistance",en:"65-70% strength retention",es:"65-70% de resistencia",pt:"65-70% de resistência"},
      desc:{fr:"NŒUD D'ATTACHE SÛRE\n\nUSAGES :\n→ Attacher une aussière à un anneau ou bouée\n→ Amarrage d'une embarcation à un poteau\n→ Attacher une élingue à un anneau fixe\n→ Fixer un fender à la main courante\n→ Ligne de remorquage légère\n\nPROPRIÉTÉS :\n→ Très sûr — le tour mort prend la charge\n→ Les deux demi-clefs sécurisent\n→ Peut être fait alors que le cordage est sous charge\n→ Se défait facilement\n\nIMPORTANT :\n'Tour mort' = faire DEUX tours complets\nautour du point d'attache\nLes deux demi-clefs doivent être\nen sens inverse l'une de l'autre",
             en:"SECURE FASTENING KNOT\n\nUSES:\n→ Attaching a mooring line to ring or buoy\n→ Mooring a small craft to a post\n→ Attaching a sling to a fixed ring\n→ Securing a fender to handrail\n→ Light towing line\n\nPROPERTIES:\n→ Very safe — round turn takes the load\n→ Two half hitches secure it\n→ Can be tied while rope is under load\n→ Comes undone easily\n\nIMPORTANT:\n'Round turn' = make TWO full turns\naround the attachment point\nThe two half hitches must be\nin opposite directions",
             es:"NUDO DE FIJACIÓN SEGURA\n\nUSOS:\n→ Atar un cabo de amarre a un anillo o boya\n→ Atracar una embarcación a un poste\n→ Atar una eslinga a un anillo fijo\n→ Fijar un defensas al pasamanos\n→ Cabo de remolque ligero\n\nPROPIEDADES:\n→ Muy seguro — la vuelta redonda toma la carga\n→ Los dos medios cotes aseguran\n→ Se puede hacer con el cabo bajo carga\n→ Se deshace fácilmente",
             pt:"NÓ DE FIXAÇÃO SEGURA\n\nUSOS:\n→ Prender um cabo de amarração a um anel ou bóia\n→ Atracar uma embarcação a um poste\n→ Prender um estropo a um anel fixo\n→ Fixar uma defensa ao corrimão\n→ Cabo de reboque leve\n\nPROPRIEDADES:\n→ Muito seguro — a volta redonda suporta a carga\n→ As duas meias-voltas asseguram\n→ Pode ser feito com o cabo sob carga\n→ Desata-se facilmente"} },
    { id:"cleathitch", cat:"hitch", color:C.gold2, icon:"🧲",
      Diagram: CleatHitchSVG,
      label:{fr:"Nœud de taquet (Cleat hitch)",en:"Cleat hitch",es:"Nudo de cornamusa",pt:"Nó de mordente"},
      strength:{fr:"Résistance maximale",en:"Maximum strength",es:"Resistencia máxima",pt:"Resistência máxima"},
      desc:{fr:"NŒUD D'AMARRAGE AU TAQUET\n\nUSAGES :\n→ Amarrage d'une aussière sur taquet de pont\n→ Fixation d'une écoute sur taquet de voilier\n→ Amarrage d'un canot sur taquet\n→ Usage quotidien le plus fréquent en port\n\nPROPRIÉTÉS :\n→ Résistance maximale (taquet, pas le cordage)\n→ Se fait très rapidement\n→ Se défait instantanément d'un geste\n→ Standard universel en marine\n\nTECHNIQUE :\n1. Tour complet sous les deux cornes\n2. Croiser en diagonale (figure-8)\n3. Demi-clef finale (sécurité)\n\nAVANTAGE CRITIQUE :\nLa partie droite (effort) part du bas\nNE JAMAIS commencer par le dessus\n= perd toute résistance",
             en:"CLEAT MOORING KNOT\n\nUSES:\n→ Mooring a line on deck cleat\n→ Securing a sheet on sailing cleat\n→ Mooring a dinghy to cleat\n→ Most frequent daily use in port\n\nPROPERTIES:\n→ Maximum strength (cleat, not rope)\n→ Made very quickly\n→ Released instantly with one motion\n→ Universal maritime standard\n\nTECHNIQUE:\n1. Full turn under both horns\n2. Cross diagonally (figure-8)\n3. Final locking half-hitch\n\nCRITICAL POINT:\nThe standing part (load) exits from below\nNEVER start from the top\n= loses all holding power",
             es:"NUDO DE CORNAMUSA\n\nUSOS:\n→ Amarre de un cabo en la cornamusa de cubierta\n→ Fijación de una escota en la cornamusa\n→ Atracar un bote a la cornamusa\n→ Uso diario más frecuente en puerto\n\nPROPIEDADES:\n→ Resistencia máxima (cornamusa, no el cabo)\n→ Se hace muy rápidamente\n→ Se suelta instantáneamente con un gesto\n→ Estándar universal en marina\n\nTÉCNICA:\n1. Vuelta completa bajo los dos cuernos\n2. Cruzar en diagonal (figura-8)\n3. Medio cote final (seguridad)",
             pt:"NÓ DE MORDENTE\n\nUSOS:\n→ Amarração de um cabo no mordente do convés\n→ Fixação de uma escota no mordente\n→ Atracar um bote ao mordente\n→ Uso diário mais frequente em porto\n\nPROPRIEDADES:\n→ Resistência máxima (mordente, não o cabo)\n→ Faz-se muito rapidamente\n→ Solta-se instantaneamente com um gesto\n→ Padrão universal na marinha\n\nTÉCNICA:\n1. Volta completa sob os dois chifres\n2. Cruzar em diagonal (figura-8)\n3. Meia-volta final (segurança)"} },
    { id:"sheetbend", cat:"bend", color:C.splice, icon:"🔀",
      Diagram: SheetBendSVG,
      label:{fr:"Nœud de tisserand (Sheet bend)",en:"Sheet bend",es:"Nudo de escota",pt:"Nó de escota"},
      strength:{fr:"50-55% de résistance",en:"50-55% strength retention",es:"50-55% de resistencia",pt:"50-55% de resistência"},
      desc:{fr:"NŒUD D'ASSEMBLAGE DE CORDAGES\n\nUSAGES :\n→ Joindre deux cordages de DIAMÈTRES DIFFÉRENTS\n→ Prolonger une aussière\n→ Attacher un filet à un cordage\n→ Joindre une touline à une aussière\n\nPROPRIÉTÉS :\n→ Fonctionne MIEUX avec diamètres différents\n→ La grosse corde forme la boucle (bright)\n→ La petite passe à travers et fait le nœud\n→ Ne pas utiliser pour deux cordages identiques (= nœud plat)\n\nVARIANTE : DOUBLE SHEET BEND\n→ Faire un double tour de la petite corde\n→ Plus sûr pour cordages mouillés\n→ Plus sûr pour grande différence de diamètre\n\n✗ Peut se défaire si charge non continue",
             en:"ROPE JOINING KNOT\n\nUSES:\n→ Join two ropes of DIFFERENT DIAMETERS\n→ Extend a mooring line\n→ Attach a net to a rope\n→ Join a heaving line to a mooring line\n\nPROPERTIES:\n→ Works BETTER with different diameters\n→ Larger rope forms the bight/loop\n→ Smaller rope passes through and ties\n→ Do not use for identical ropes (= reef knot)\n\nVARIANT: DOUBLE SHEET BEND\n→ Make double turn of smaller rope\n→ More secure for wet ropes\n→ More secure for large diameter difference\n\n✗ Can come undone if load is not continuous",
             es:"NUDO DE UNIÓN DE CABOS\n\nUSOS:\n→ Unir dos cabos de DIFERENTES DIÁMETROS\n→ Prolongar un cabo de amarre\n→ Atar una red a un cabo\n→ Unir una guía a un cabo de amarre\n\nPROPIEDADES:\n→ Funciona MEJOR con diámetros diferentes\n→ El cabo más grueso forma el seno\n→ El cabo más fino pasa por él y hace el nudo\n\nVARIANTE: ESCOTA DOBLE\n→ Dar doble vuelta con el cabo más fino\n→ Más seguro para cabos mojados",
             pt:"NÓ DE UNIÃO DE CABOS\n\nUSOS:\n→ Unir dois cabos de DIÂMETROS DIFERENTES\n→ Prolongar um cabo de amarração\n→ Prender uma rede a um cabo\n→ Unir uma guia a um cabo de amarração\n\nPROPRIEDADES:\n→ Funciona MELHOR com diâmetros diferentes\n→ O cabo mais grosso forma o seio\n→ O cabo mais fino passa por ele e faz o nó\n\nVARIANTE: ESCOTA DUPLA\n→ Dar volta dupla com o cabo mais fino\n→ Mais seguro para cabos molhados"} },
    { id:"rollinghitch", cat:"hitch", color:C.hitch, icon:"↔️",
      Diagram: RollingHitchSVG,
      label:{fr:"Nœud de cabestan (Rolling hitch)",en:"Rolling hitch",es:"Ballestrinque corredizo",pt:"Volta corredissa"},
      strength:{fr:"60-65% de résistance",en:"60-65% strength retention",es:"60-65% de resistencia",pt:"60-65% de resistência"},
      desc:{fr:"NŒUD DE TRACTION LONGITUDINALE\n\nUSAGES :\n→ Attacher un cordage à un autre cordage sous charge\n→ Soulager (décharger) une aussière tendue\n→ Frapper une remorque de secours\n→ Attacher à un espar (barre ou mât)\n→ Traction dans l'axe du cordage principal\n\nSPÉCIFICITÉ :\n→ Les DEUX premiers tours sont du MÊME CÔTÉ\n(du côté de la traction)\n→ Le troisième tour croise de l'autre côté\n→ Ne glisse PAS dans le sens de la traction\n→ Glisse facilement dans l'autre sens\n\nDIFFÉRENCE avec clove hitch :\nRolling = résiste à traction longitudinale\nClove = résiste à traction perpendiculaire",
             en:"LONGITUDINAL PULL KNOT\n\nUSES:\n→ Attach a line to another line under load\n→ Take the strain off a taut mooring line\n→ Rig an emergency towing line\n→ Attach to a spar (bar or mast)\n→ Pull along the axis of the main line\n\nSPECIFICITY:\n→ The FIRST TWO turns go on the SAME SIDE\n(the side the pull comes from)\n→ The third turn crosses the other side\n→ Does NOT slip in the direction of pull\n→ Slides easily the other way\n\nDIFFERENCE from clove hitch:\nRolling = resists longitudinal pull\nClove = resists perpendicular pull",
             es:"NUDO DE TRACCIÓN LONGITUDINAL\n\nUSOS:\n→ Atar un cabo a otro cabo bajo carga\n→ Aliviar (descargar) un cabo de amarre tenso\n→ Armar un remolque de emergencia\n→ Atar a un palo (barra o mástil)\n→ Tracción en el eje del cabo principal\n\nESPECIFICIDAD:\n→ Las DOS primeras vueltas van del MISMO LADO\n(del lado de la tracción)\n→ La tercera vuelta cruza el otro lado\n→ NO resbala en la dirección de la tracción",
             pt:"NÓ DE TRAÇÃO LONGITUDINAL\n\nUSOS:\n→ Prender um cabo a outro cabo sob carga\n→ Aliviar (descarregar) um cabo de amarração tenso\n→ Armar um reboque de emergência\n→ Prender a um pau (barra ou mastro)\n→ Tração no eixo do cabo principal\n\nESPECIFICIDADE:\n→ As DUAS primeiras voltas vão do MESMO LADO\n(do lado da tração)\n→ A terceira volta cruza o outro lado\n→ NÃO escorrega na direção da tração"} },
    { id:"reefknot", cat:"bend", color:C.bend, icon:"🎀",
      Diagram: ReefKnotSVG,
      label:{fr:"Nœud plat (Reef knot)",en:"Reef knot (Square knot)",es:"Nudo cuadrado (de rizo)",pt:"Nó chato (de rizo)"},
      strength:{fr:"45-50% de résistance",en:"45-50% strength retention",es:"45-50% de resistencia",pt:"45-50% de resistência"},
      desc:{fr:"NŒUD D'ASSEMBLAGE SIMPLE\n\nUSAGES :\n→ Prendre un ris dans la voile\n→ Fermer un sac, paquet ou bandage\n→ Assembler deux cordages de MÊME DIAMÈTRE\n→ Nœud de secours pour fixer un pansement\n\nPROPRIÉTÉS :\n→ Fonctionne UNIQUEMENT pour même diamètre\n→ Se défait facilement en tirant une extrémité\n→ Moyen mnémo : 'gauche sur droite, droite sur gauche'\n\nDANGERS IMPORTANTS :\n✗ Devient un NŒUD DE VACHE si mal fait\n✗ Ne jamais utiliser pour charges importantes\n✗ Glisse si les deux cordages sont de diamètres différents\n✗ Peut se convertir en 'nœud coulant' sous charge asymétrique\n\nIDENTIFIER UN BON NŒUD PLAT :\nLes deux boucles doivent être parallèles",
             en:"SIMPLE JOINING KNOT\n\nUSES:\n→ Reefing a sail (tying reef points)\n→ Closing a bag, parcel or bandage\n→ Joining two ropes of SAME DIAMETER\n→ Emergency knot for securing dressing\n\nPROPERTIES:\n→ ONLY works for same diameter\n→ Comes undone easily by pulling one end\n→ Memory aid: 'left over right, right over left'\n\nIMPORTANT DANGERS:\n✗ Becomes a GRANNY KNOT if done wrong\n✗ Never use for important loads\n✗ Slips if two ropes are different diameters\n✗ Can convert to a slip knot under asymmetric load\n\nIDENTIFY A GOOD REEF KNOT:\nBoth loops must be parallel",
             es:"NUDO DE UNIÓN SIMPLE\n\nUSOS:\n→ Tomar rizos en la vela\n→ Cerrar una bolsa, paquete o vendaje\n→ Unir dos cabos del MISMO DIÁMETRO\n→ Nudo de emergencia para fijar un vendaje\n\nPROPIEDADES:\n→ SOLO funciona para el mismo diámetro\n→ Se deshace fácilmente tirando de un extremo\n→ Recurso nemotécnico: 'izquierda sobre derecha, derecha sobre izquierda'\n\nPELIGROS IMPORTANTES:\n✗ Se convierte en NUDO DE ABUELA si se hace mal\n✗ Nunca usar para cargas importantes",
             pt:"NÓ DE UNIÃO SIMPLES\n\nUSOS:\n→ Tomar rizos na vela\n→ Fechar um saco, embrulho ou ligadura\n→ Unir dois cabos do MESMO DIÂMETRO\n→ Nó de emergência para fixar penso\n\nPROPRIEDADES:\n→ APENAS funciona para o mesmo diâmetro\n→ Desata-se facilmente puxando uma extremidade\n→ Recurso mnemónico: 'esquerda sobre direita, direita sobre esquerda'\n\nPERIGOS IMPORTANTES:\n✗ Torna-se um NÓ DE AVÓ se mal feito\n✗ Nunca usar para cargas importantes"} },
  ];

  const categories = {
    all:{fr:"Tous",en:"All",es:"Todos",pt:"Todos"},
    loop:{fr:"Boucles",en:"Loops",es:"Lazos",pt:"Laços"},
    hitch:{fr:"Clefs",en:"Hitches",es:"Cotes",pt:"Voltas"},
    bend:{fr:"Assemblages",en:"Bends",es:"Emplames",pt:"Emendas"},
    stopper:{fr:"Arrêts",en:"Stoppers",es:"Topes",pt:"Topes"},
  };

  const [catFilter, setCatFilter] = useState("all");
  const filtered = catFilter === "all" ? knots : knots.filter(k=>k.cat===catFilter);
  const sel_ = sel!==null ? knots.find(k=>k.id===sel) : null;

  return (
    <div>
      {/* Category filter */}
      <div style={{display:"flex",gap:5,marginBottom:10,flexWrap:"wrap"}}>
        {Object.entries(categories).map(([k,v])=>(
          <button key={k} onClick={()=>{setCatFilter(k);setSel(null);}} style={{
            padding:"5px 10px",borderRadius:20,cursor:"pointer",fontSize:9,fontWeight:700,
            background:catFilter===k?`${C.knot}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${catFilter===k?C.knot:"rgba(255,255,255,0.1)"}`,
            color:catFilter===k?C.knot:C.muted}}>
            {v[lang]||v.en}
          </button>
        ))}
      </div>
      {/* Knot grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {filtered.map((k,i)=>(
          <div key={k.id} onClick={()=>setSel(sel===k.id?null:k.id)} style={{
            padding:"8px",borderRadius:12,cursor:"pointer",
            background:sel===k.id?`${k.color}18`:"rgba(255,255,255,0.03)",
            border:`1.5px solid ${sel===k.id?k.color:"rgba(255,255,255,0.08)"}`,
            transition:"all 0.2s"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:4}}>
              <k.Diagram/>
            </div>
            <div style={{fontSize:9,fontWeight:700,color:sel===k.id?k.color:C.muted,textAlign:"center",lineHeight:1.2}}>{k.label[lang]||k.label.en}</div>
            <div style={{fontSize:8,color:k.color,textAlign:"center",marginTop:2}}>{k.strength[lang]||k.strength.en}</div>
          </div>
        ))}
      </div>
      {/* Detail panel */}
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:4}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        <div style={{fontSize:9,color:sel_.color,marginBottom:8,padding:"3px 8px",background:`${sel_.color}20`,borderRadius:8,display:"inline-block"}}>{sel_.strength[lang]||sel_.strength.en}</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — KNOT STRENGTH COMPARISON
// ══════════════════════════════════════
function KnotStrengthSVG({ lang }) {
  const data = [
    {name:{fr:"Épissure courte",en:"Short splice",es:"Costura corta",pt:"Costura curta"}, pct:95, color:C.splice},
    {name:{fr:"Épissure en œil",en:"Eye splice",es:"Costura de ojo",pt:"Costura de olho"}, pct:90, color:C.splice},
    {name:{fr:"Nœud en huit",en:"Figure-eight",es:"Nudo en ocho",pt:"Nó em oito"}, pct:78, color:C.bend},
    {name:{fr:"Nœud de chaise",en:"Bowline",es:"As de guía",pt:"Lais de guia"}, pct:72, color:C.knot},
    {name:{fr:"Tour mort+2HH",en:"Round turn+2HH",es:"V.redonda+2MC",pt:"V.redonda+2MV"}, pct:67, color:C.hitch},
    {name:{fr:"Nœud de cabestan",en:"Clove hitch",es:"Ballestrinque",pt:"V.do fiel"}, pct:62, color:C.hitch},
    {name:{fr:"Nœud de tisserand",en:"Sheet bend",es:"Nudo escota",pt:"Nó de escota"}, pct:52, color:C.bend},
    {name:{fr:"Nœud plat",en:"Reef knot",es:"N.cuadrado",pt:"Nó chato"}, pct:47, color:C.knot},
    {name:{fr:"Nœud simple",en:"Overhand knot",es:"Nudo simple",pt:"Nó simples"}, pct:45, color:C.red},
  ];

  return (
    <div>
      <div style={{fontSize:10,color:C.muted,marginBottom:8,textAlign:"center"}}>
        {lang==="fr"?"% de résistance conservée":lang==="en"?"% strength retained":lang==="es"?"% resistencia retenida":"% resistência retida"}
      </div>
      {data.map((d,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
          <div style={{fontSize:9,color:C.muted,width:90,textAlign:"right",flexShrink:0}}>{d.name[lang]||d.name.en}</div>
          <div style={{flex:1,height:16,background:"rgba(255,255,255,0.05)",borderRadius:8,overflow:"hidden",position:"relative"}}>
            <div style={{height:"100%",width:`${d.pct}%`,background:`linear-gradient(90deg,${d.color}88,${d.color})`,borderRadius:8,transition:"width 1s ease"}}/>
          </div>
          <div style={{fontSize:10,color:d.color,fontWeight:700,width:32,textAlign:"right"}}>{d.pct}%</div>
        </div>
      ))}
      <div style={{fontSize:10,color:C.gold2,marginTop:10,padding:"8px 10px",background:"rgba(201,146,42,0.08)",borderRadius:10,border:"1px solid rgba(201,146,42,0.2)"}}>
        💡 {lang==="fr"?"Règle : toujours préférer une épissure à un nœud pour les charges permanentes":lang==="en"?"Rule: always prefer a splice over a knot for permanent loads":lang==="es"?"Regla: siempre preferir una costura a un nudo para cargas permanentes":"Regra: sempre preferir uma costura a um nó para cargas permanentes"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — SPLICES GUIDE
// ══════════════════════════════════════
function SplicesGuideSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const splices = [
    { id:"eye", icon:"👁️", color:C.splice,
      label:{fr:"Épissure en œil (Eye splice)",en:"Eye splice",es:"Costura de ojo",pt:"Costura de olho"},
      strength:{fr:"90-95%",en:"90-95%",es:"90-95%",pt:"90-95%"},
      desc:{fr:"BOUCLE PERMANENTE EN BOUT DE CORDAGE\n\nCONSTRUCTION :\n1. Défaire 3-4 torons sur 15-20 cm\n2. Former la boucle de la taille désirée\n3. Rentrer chaque toron sous un toron du corps du cordage\n(dans le sens inverse de la torsion)\n4. Passer chaque toron une 2ème fois\n5. Passer chaque toron une 3ème fois\n6. Couper les brins excédentaires\n7. Chauffer (synthétiques) ou goudronner (naturels)\n\nNOMBRE DE PASSES :\n→ Cordage en chanvre : 3 passes minimum\n→ Cordage synthétique : 4-5 passes\n→ Câble acier : 5 passes minimum\n\nUSAGE :\n→ Attache permanente d'une aussière\n→ Œil sur câble de grue\n→ Boucle sur ancre\n→ Toujours utiliser une cosse !",
             en:"PERMANENT LOOP AT ROPE END\n\nCONSTRUCTION:\n1. Unlay 3-4 strands over 15-20 cm\n2. Form loop of desired size\n3. Tuck each strand under one body strand\n(against the lay direction)\n4. Pass each strand a 2nd time\n5. Pass each strand a 3rd time\n6. Cut excess tails\n7. Heat (synthetics) or tar (naturals)\n\nNUMBER OF TUCKS:\n→ Hemp rope: 3 tucks minimum\n→ Synthetic rope: 4-5 tucks\n→ Wire rope: 5 tucks minimum\n\nUSE:\n→ Permanent attachment of mooring line\n→ Eye on crane cable\n→ Loop on anchor\n→ Always use a thimble!",
             es:"LAZO PERMANENTE EN EL EXTREMO DEL CABO\n\nCONSTRUCCIÓN:\n1. Destorcer 3-4 torones 15-20 cm\n2. Formar el lazo del tamaño deseado\n3. Meter cada torón bajo un torón del cuerpo\n(en sentido contrario al colchado)\n4. Pasar cada torón 2ª vez\n5. Pasar cada torón 3ª vez\n6. Cortar las puntas sobrantes\n\nNÚMERO DE PASADAS:\n→ Cabo de cáñamo: 3 pasadas mínimo\n→ Cabo sintético: 4-5 pasadas\n→ Cable de acero: 5 pasadas mínimo",
             pt:"LAÇO PERMANENTE NO EXTREMO DO CABO\n\nCONSTRUÇÃO:\n1. Desfazer 3-4 torons em 15-20 cm\n2. Formar o laço do tamanho desejado\n3. Meter cada toron sob um toron do corpo\n(em sentido contrário à torção)\n4. Passar cada toron 2ª vez\n5. Passar cada toron 3ª vez\n6. Cortar as pontas excedentes\n\nNÚMERO DE PASSAGENS:\n→ Cabo de cânhamo: 3 passagens mínimo\n→ Cabo sintético: 4-5 passagens\n→ Cabo de aço: 5 passagens mínimo"} },
    { id:"short", icon:"🔗", color:C.knot,
      label:{fr:"Épissure courte (Short splice)",en:"Short splice",es:"Costura corta",pt:"Costura curta"},
      strength:{fr:"95%",en:"95%",es:"95%",pt:"95%"},
      desc:{fr:"JONCTION PERMANENTE DE DEUX CORDAGES\n\nCONSTRUCTION :\n1. Défaire 3-4 torons sur 20 cm chaque bout\n2. Entrelacer les torons des deux cordages\n3. Bloquer temporairement avec du ruban\n4. Rabattre chaque toron A sous un toron B\n(dans le sens inverse de la torsion)\n5. Recommencer pour les torons B sous torons A\n6. Faire 3-5 passes alternées\n7. Couper et finir\n\nIMPORTANT :\n→ Résistance maximale : 95% du cordage\n→ INCONVÉNIENT : le diamètre augmente à la jonction\n→ Ne peut PAS passer dans une poulie ou un chaumard\n→ Usage : jonction permanente sans contrainte de passage\n\nALTERNATIVE si passage requis :\nUtiliser une épissure longue (long splice) = diamètre constant",
             en:"PERMANENT JOINING OF TWO ROPES\n\nCONSTRUCTION:\n1. Unlay 3-4 strands 20cm each end\n2. Interlock strands of both ropes\n3. Temporarily secure with tape\n4. Tuck each A strand under a B strand\n(against lay direction)\n5. Repeat for B strands under A strands\n6. Make 3-5 alternating tucks\n7. Cut and finish\n\nIMPORTANT:\n→ Maximum strength: 95% of rope\n→ DISADVANTAGE: diameter increases at junction\n→ CANNOT pass through a block or fairlead\n→ Use: permanent junction without passage constraint\n\nALTERNATIVE if passage required:\nUse a long splice = constant diameter",
             es:"UNIÓN PERMANENTE DE DOS CABOS\n\nCONSTRUCCIÓN:\n1. Destorcer 3-4 torones 20cm en cada extremo\n2. Entrelazar los torones de ambos cabos\n3. Asegurar temporalmente con cinta\n4. Meter cada torón A bajo un torón B\n(en sentido contrario al colchado)\n5. Repetir para los torones B bajo torones A\n6. Hacer 3-5 pasadas alternadas\n7. Cortar y terminar\n\nIMPORTANTE:\n→ Resistencia máxima: 95% del cabo\n→ INCONVENIENTE: el diámetro aumenta en la unión\n→ NO puede pasar por una polea o escobén",
             pt:"JUNÇÃO PERMANENTE DE DOIS CABOS\n\nCONSTRUÇÃO:\n1. Desfazer 3-4 torons em 20cm em cada extremo\n2. Entrelaçar os torons dos dois cabos\n3. Segurar temporariamente com fita\n4. Meter cada toron A sob um toron B\n(em sentido contrário à torção)\n5. Repetir para os torons B sob torons A\n6. Fazer 3-5 passagens alternadas\n7. Cortar e acabar\n\nIMPORTANTE:\n→ Resistência máxima: 95% do cabo\n→ DESVANTAGEM: o diâmetro aumenta na junção\n→ NÃO pode passar por uma roldana ou escovém"} },
    { id:"back", icon:"↩️", color:C.hitch,
      label:{fr:"Épissure arrière (Back splice)",en:"Back splice",es:"Costura de coronamiento",pt:"Costura de coroa"},
      strength:{fr:"75-80%",en:"75-80%",es:"75-80%",pt:"75-80%"},
      desc:{fr:"FINITION D'EXTRÉMITÉ DE CORDAGE\n\nCONSTRUCTION :\n1. Faire un nœud de couronne (crown knot) à l'extrémité\n= chaque toron passe sur le suivant en sens horaire\n2. Rabattre les torons dans le cordage\n(en dessous et contre le sens de torsion)\n3. Faire 3-4 passes\n4. Finir et couper\n\nUSAGES :\n→ Finir proprement l'extrémité d'un cordage\n→ Alternative au whipping (surliure)\n→ Évite l'effilochage des bouts\n\nIMPORTANT :\n→ Le diamètre augmente à l'extrémité\n→ Ne peut pas passer dans un talon de poulie\n→ Pour cordage qui ne doit pas passer dans une poulie\n\nVS SURLIURE :\nSurliure = plus propre, ne grossit pas\nÉpissure arrière = plus solide, dure plus longtemps",
             en:"ROPE END FINISHING\n\nCONSTRUCTION:\n1. Make a crown knot at the end\n= each strand passes over the next clockwise\n2. Tuck strands back into the rope\n(underneath, against lay direction)\n3. Make 3-4 tucks\n4. Finish and cut\n\nUSES:\n→ Neatly finish a rope end\n→ Alternative to whipping\n→ Prevents fraying of rope ends\n\nIMPORTANT:\n→ Diameter increases at the end\n→ Cannot pass through a block sheave\n→ For rope that does not need to pass through a block\n\nVS WHIPPING:\nWhipping = neater, does not increase diameter\nBack splice = stronger, lasts longer",
             es:"ACABADO DEL EXTREMO DEL CABO\n\nCONSTRUCCIÓN:\n1. Hacer un nudo de corona en el extremo\n= cada torón pasa sobre el siguiente en sentido horario\n2. Meter los torones de vuelta en el cabo\n(por debajo y contra el colchado)\n3. Hacer 3-4 pasadas\n4. Terminar y cortar\n\nUSOS:\n→ Terminar limpiamente el extremo de un cabo\n→ Alternativa al merlado\n→ Evita el deshilachado de los extremos",
             pt:"ACABAMENTO DO EXTREMO DO CABO\n\nCONSTRUÇÃO:\n1. Fazer um nó de coroa no extremo\n= cada toron passa sobre o seguinte no sentido horário\n2. Meter os torons de volta no cabo\n(por baixo e contra a torção)\n3. Fazer 3-4 passagens\n4. Acabar e cortar\n\nUSOS:\n→ Acabar limpamente o extremo de um cabo\n→ Alternativa ao turco\n→ Evita o desfiamento das pontas"} },
  ];

  const sel_ = sel!==null ? splices.find(s=>s.id===sel) : null;
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {splices.map((s,i)=>(
          <div key={i} onClick={()=>setSel(sel===s.id?null:s.id)} style={{
            flex:1,padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18,marginBottom:3}}>{s.icon}</div>
            <div style={{fontSize:9,color:sel===s.id?s.color:C.muted,fontWeight:700,lineHeight:1.2}}>{s.label[lang]||s.label.en}</div>
            <div style={{fontSize:10,color:s.color,marginTop:3}}>{s.strength[lang]||s.strength.en}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}10`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:700,color:sel_.color,marginBottom:8}}>{sel_.icon} {sel_.label[lang]||sel_.label.en}</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — PRACTICAL SCENARIOS QUIZ
// ══════════════════════════════════════
function KnotQuizSVG({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const qs = {
    en:[
      { q:"You need to attach a mooring line to a ring on a buoy — which knot?", opts:["Reef knot","Round turn and two half hitches — safe, can be tied under load, easy to undo","Clove hitch","Bowline"], correct:1 },
      { q:"Two ropes of different diameters need to be joined — which knot?", opts:["Reef knot — only works same diameter","Sheet bend — specifically designed for different diameters","Figure-eight — stopper only","Clove hitch — for hitching only"], correct:1 },
      { q:"You need a fixed rescue loop around a person in the water — which knot?", opts:["Clove hitch — can tighten on body","Bowline — fixed loop, does not tighten, will not jam","Reef knot — both ends must be equal","Figure-eight — too small"], correct:1 },
      { q:"A mooring line needs to be quickly secured to a cleat — correct technique?", opts:["Just wrap it around","Full round turn first, then figure-eight pattern, finish with locking half hitch","Tie a bowline around the cleat","Just half hitch it"], correct:1 },
      { q:"Which knot holds better when the pull comes along the axis of the standing part?", opts:["Clove hitch — for perpendicular pull","Rolling hitch — two wraps on the pull side resist longitudinal load","Figure-eight — stopper knot only","Sheet bend — joining two ropes"], correct:1 },
    ],
    fr:[
      { q:"Vous devez attacher une aussière à un anneau de bouée — quel nœud ?", opts:["Nœud plat","Tour mort et deux demi-clefs — sûr, peut se faire sous charge, facile à défaire","Demi-clef à capeler","Nœud de chaise"], correct:1 },
      { q:"Deux cordages de diamètres différents doivent être assemblés — quel nœud ?", opts:["Nœud plat — fonctionne seulement pour même diamètre","Nœud de tisserand — conçu spécifiquement pour diamètres différents","Nœud en huit — arrêt seulement","Demi-clef à capeler — pour amarrage seulement"], correct:1 },
      { q:"Il faut une boucle de sauvetage fixe autour d'une personne à l'eau — quel nœud ?", opts:["Demi-clef — peut se resserrer sur le corps","Nœud de chaise — boucle fixe, ne se resserre pas, ne se bloque pas","Nœud plat — les deux extrémités doivent être égales","Nœud en huit — trop petit"], correct:1 },
      { q:"Une aussière doit être rapidement sécurisée sur un taquet — bonne technique ?", opts:["Juste l'enrouler","Tour complet d'abord, puis figure en 8, terminer avec demi-clef de sécurité","Faire un nœud de chaise autour du taquet","Juste une demi-clef"], correct:1 },
      { q:"Quel nœud résiste mieux quand la traction vient dans l'axe du cordage porteur ?", opts:["Demi-clef à capeler — pour traction perpendiculaire","Nœud de cabestan — deux tours du côté de la traction résistent à la charge longitudinale","Nœud en huit — nœud d'arrêt seulement","Nœud de tisserand — assembler deux cordages"], correct:1 },
    ],
    es:[
      { q:"Necesita atar un cabo de amarre a un anillo de boya — ¿qué nudo?", opts:["Nudo plano","Vuelta redonda y dos medios cotes — seguro, se puede hacer bajo carga, fácil de desatar","Ballestrinque","As de guía"], correct:1 },
      { q:"Dos cabos de diámetros diferentes necesitan unirse — ¿qué nudo?", opts:["Nudo plano — solo funciona para el mismo diámetro","Nudo de escota — diseñado específicamente para diámetros diferentes","Nudo en ocho — solo de tope","Ballestrinque — solo para amarres"], correct:1 },
      { q:"Necesita un lazo de rescate fijo alrededor de una persona en el agua — ¿qué nudo?", opts:["Ballestrinque — puede apretar en el cuerpo","As de guía — lazo fijo, no se aprieta, no se bloquea","Nudo plano — ambos extremos deben ser iguales","Nudo en ocho — demasiado pequeño"], correct:1 },
      { q:"Un cabo de amarre necesita asegurarse rápidamente en una cornamusa — ¿técnica correcta?", opts:["Solo enrollarlo","Vuelta redonda completa primero, luego patrón en ocho, terminar con medio cote de seguridad","Hacer un as de guía alrededor de la cornamusa","Solo medio cote"], correct:1 },
      { q:"¿Qué nudo aguanta mejor cuando la tracción viene a lo largo del eje del cabo portante?", opts:["Ballestrinque — para tracción perpendicular","Ballestrinque corredizo — dos vueltas en el lado de tracción resisten la carga longitudinal","Nudo en ocho — solo nudo de tope","Nudo de escota — unir dos cabos"], correct:1 },
    ],
    pt:[
      { q:"Precisa de prender um cabo de amarração a um anel de bóia — que nó?", opts:["Nó chato","Volta redonda e duas meias-voltas — seguro, pode fazer-se sob carga, fácil de desatar","Volta do fiel","Nó de lais de guia"], correct:1 },
      { q:"Dois cabos de diâmetros diferentes precisam de ser unidos — que nó?", opts:["Nó chato — apenas funciona para o mesmo diâmetro","Nó de escota — especificamente desenhado para diâmetros diferentes","Nó em oito — apenas tope","Volta do fiel — apenas para voltas"], correct:1 },
      { q:"Precisa de um laço de salvamento fixo em torno de uma pessoa na água — que nó?", opts:["Volta do fiel — pode apertar no corpo","Nó de lais de guia — laço fixo, não aperta, não bloqueia","Nó chato — ambas as extremidades devem ser iguais","Nó em oito — demasiado pequeno"], correct:1 },
      { q:"Um cabo de amarração precisa de ser rapidamente fixado num mordente — técnica correta?", opts:["Apenas enrolá-lo","Volta redonda completa primeiro, depois padrão em oito, terminar com meia-volta de segurança","Fazer um nó de lais de guia em torno do mordente","Apenas meia-volta"], correct:1 },
      { q:"Que nó resiste melhor quando a tração vem ao longo do eixo do cabo portante?", opts:["Volta do fiel — para tração perpendicular","Volta corredissa — duas voltas no lado de tração resistem à carga longitudinal","Nó em oito — apenas nó de tope","Nó de escota — unir dois cabos"], correct:1 },
    ],
  };

  const questions = qs[lang]||qs.en;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const q = shuffled[qIdx];
  const pick=(i)=>{if(ans!==null)return;setAns(i);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(qIdx<questions.length-1){setQIdx(q=>q+1);setAns(null);}else setDone(true);};

  if(done) return (
    <div style={{textAlign:"center",padding:"16px"}}>
      <div style={{fontSize:40}}>{score>=4?"🏆":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:C.white,margin:"8px 0"}}>{score}/{questions.length}</div>
      <button onClick={()=>{setDone(false);setQIdx(0);setAns(null);setScore(0);}} style={{padding:"8px 16px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer",fontSize:11}}>🔄 Retry</button>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<qIdx?C.splice:i===qIdx?C.knot:"rgba(255,255,255,0.1)"}}/>)}
      </div>
      <div style={{fontSize:12,fontWeight:700,color:C.white,marginBottom:12,lineHeight:1.5}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(ans!==null){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===ans){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:ans!==null?"default":"pointer",lineHeight:1.4}}>{opt}</button>;
        })}
      </div>
      {ans!==null&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.knot},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.navy,cursor:"pointer"}}>
        {qIdx<questions.length-1?"NEXT →":"FINISH"}
      </button>}
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
    en:[
      {id:"q1",q:"Which knot creates a fixed loop that NEVER tightens around a person?\n(Answer: 1 word)",correct:"Bowline"},
      {id:"q2",q:"An eye splice retains what percentage of rope strength?\n(Answer: number + %)",correct:"90-95%"},
      {id:"q3",q:"To join two ropes of different thicknesses, you use a ___\n(Answer: 2 words)",correct:"Sheet bend"},
    ],
    fr:[
      {id:"q1",q:"Quel nœud crée une boucle fixe qui ne se resserre JAMAIS autour d'une personne ?\n(Répondre : 1 mot)",correct:"Bowline / Nœud de chaise"},
      {id:"q2",q:"Une épissure en œil conserve quel pourcentage de la résistance du cordage ?\n(Répondre : nombre + %)",correct:"90-95%"},
      {id:"q3",q:"Pour assembler deux cordages de diamètres différents, on utilise un ___\n(Répondre : 2 mots)",correct:"Nœud de tisserand"},
    ],
    es:[
      {id:"q1",q:"¿Qué nudo crea un lazo fijo que NUNCA se aprieta alrededor de una persona?\n(Responder: 1 palabra)",correct:"As de guía / Bowline"},
      {id:"q2",q:"¿Qué porcentaje de resistencia del cabo retiene una costura de ojo?\n(Responder: número + %)",correct:"90-95%"},
      {id:"q3",q:"Para unir dos cabos de diferentes diámetros, se usa un ___\n(Responder: 2 palabras)",correct:"Nudo de escota"},
    ],
    pt:[
      {id:"q1",q:"Que nó cria um laço fixo que NUNCA aperta em torno de uma pessoa?\n(Responder: 1 palavra)",correct:"Lais de guia / Bowline"},
      {id:"q2",q:"Que percentagem de resistência do cabo retém uma costura de olho?\n(Responder: número + %)",correct:"90-95%"},
      {id:"q3",q:"Para unir dois cabos de diâmetros diferentes, usa-se um ___\n(Responder: 2 palavras)",correct:"Nó de escota"},
    ],
  };
  const list=qs[lang]||qs.en;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("bowline")||v.includes("chaise")||v.includes("guía")||v.includes("guia")||v.includes("lais");
    if(q.id==="q2") return v.includes("90")||v.includes("95");
    if(q.id==="q3") return v.includes("sheet")||v.includes("tisserand")||v.includes("escota");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.knot}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Boucle fixe = Bowline · Épissure œil = 90-95% · Diamètres différents = Nœud de tisserand":
         lang==="en"?"💡 Reminders: Fixed loop = Bowline · Eye splice = 90-95% · Different diameters = Sheet bend":
         lang==="es"?"💡 Recordatorios: Lazo fijo = As de guía · Costura de ojo = 90-95% · Diámetros diferentes = Nudo de escota":
         "💡 Lembretes: Laço fixo = Lais de guia · Costura de olho = 90-95% · Diâmetros diferentes = Nó de escota"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:13,fontFamily:"'Courier New',monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10,fontFamily:"'Courier New',monospace"}}>
        Q1: BOWLINE — the rabbit-hole knot · fixed loop · does not tighten · universal rescue knot\nQ2: 90-95% — an eye splice is the strongest terminal (vs 70% bowline knot)\nQ3: SHEET BEND — for different diameters · larger rope forms the bight · smaller passes through
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.knot}12`,border:`1px solid ${showC?C.green:C.knot}44`,color:showC?C.green:C.knot,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  en:[
    {q:"The bowline knot is best used for:",opts:["Joining two ropes of different diameters","Creating a fixed loop that does not tighten — rescue, mooring ring, sail attachment — retains 70-75% strength","Attaching a line to a cleat","Stopping a rope from running through a block"],correct:1,expl:"Bowline (nœud de chaise): the most important knot in seamanship. Creates a fixed loop that NEVER tightens under load, making it the universal rescue knot (can be put around a person). The loop stays exactly the size it was tied. Memory aid: rabbit comes out of the hole, goes around the tree, back in the hole. Retains 70-75% of rope strength. Weakness: can come undone under alternating/lateral load — always double-check the locking configuration."},
    {q:"Why is a splice always preferred over a knot for permanent connections?",opts:["Splices look better","A splice retains 90-95% of rope strength vs 50-75% for knots, because the load is distributed gradually over many strands rather than being concentrated at a sharp bend","Splices are faster to make","Splices can be undone easily"],correct:1,expl:"Splice vs knot strength comparison: a knot creates a sharp bend in the rope. At that bend, the outer fibres are compressed and the inner fibres are stretched — the stress is concentrated at one point, weakening the rope dramatically. An eye splice weaves the strands back into the rope body over 3-5 tucks, distributing the load gradually over a longer section. Result: splice = 90-95% strength retained. Bowline = 70-75%. Sheet bend = 50-55%. Figure-eight = 75-80%. Rule: for permanent or high-load connections, always splice."},
    {q:"The rolling hitch differs from the clove hitch because it:",opts:["Is stronger than clove hitch","Resists longitudinal (axial) pull along the standing part — two wraps on the load side prevent the knot from sliding, while clove hitch resists perpendicular pull only","Is made from different material","Can be used on flat surfaces"],correct:1,expl:"Rolling hitch (nœud de cabestan): specifically designed to resist pull in the direction of the standing part (longitudinal load). Key: the FIRST TWO turns both go on the SAME SIDE as the direction of pull. The third turn crosses over to lock. This prevents the knot from sliding along the rope/spar. Uses: temporarily relieve a tight mooring line, rig a towing line to an existing rope, secure to a spar under axial load. Clove hitch resists only perpendicular pull and will slide under longitudinal load."},
    {q:"When would you use a sheet bend instead of a reef knot?",opts:["When ropes are the same material","When the two ropes are of DIFFERENT diameters — the sheet bend is designed specifically for this, with the larger rope forming the bight and the smaller passing through","When you need a very strong knot","When the knot must be permanent"],correct:1,expl:"Sheet bend vs reef knot: Reef knot (nœud plat) only works reliably when the two rope diameters are identical. If different diameters: the smaller rope can slide through the larger one's bight, causing failure. Sheet bend (nœud de tisserand): specifically designed for different diameters. The LARGER rope forms the bight. The SMALLER rope passes through the bight, around the back, and under itself. The asymmetry of the construction locks the thinner rope against the thicker one. Double sheet bend (two turns of the smaller rope) for very different diameters or wet ropes."},
    {q:"When tying a cleat hitch, what is the critical first step?",opts:["Start with a figure-eight","Make a full round turn under BOTH horns of the cleat first — this provides the primary holding power. Then cross diagonally (figure-8), finish with locking half-hitch","Start from the top of the cleat","Tie a bowline first"],correct:1,expl:"Cleat hitch technique: 1. FIRST make a COMPLETE round turn under BOTH horns. This is the most critical step — the round turn provides 80% of the holding power. 2. Cross diagonally (figure-8 pattern). 3. Finish with a locking half-hitch over one horn. CRITICAL ERROR: starting from the top rather than making the round turn first — the rope can jump off the cleat under load. The standing part (load) must exit from the bottom of the cleat. The locking half-hitch should cross OVER the previous diagonal, not under it."},
  ],
  fr:[
    {q:"Le nœud de chaise est le meilleur pour :",opts:["Assembler deux cordages de diamètres différents","Créer une boucle fixe qui ne se resserre pas — sauvetage, anneau d'amarrage, attache de voile — conserve 70-75% de résistance","Attacher un cordage sur un taquet","Arrêter un cordage qui passe dans une poulie"],correct:1,expl:"Nœud de chaise (bowline) : le nœud le plus important en matelotage. Crée une boucle fixe qui ne se resserre JAMAIS sous charge, en faisant le nœud de sauvetage universel (peut être mis autour d'une personne). La boucle reste exactement à la taille à laquelle elle a été faite. Moyen mnémo : le lapin sort du terrier, fait le tour de l'arbre, rentre dans le terrier. Conserve 70-75% de la résistance du cordage. Faiblesse : peut se défaire sous charge alternée/latérale — vérifier toujours la configuration de verrouillage."},
    {q:"Pourquoi une épissure est-elle toujours préférée à un nœud pour les connexions permanentes ?",opts:["Les épissures sont plus belles","Une épissure conserve 90-95% de la résistance vs 50-75% pour les nœuds, car la charge est distribuée progressivement sur de nombreux torons plutôt que concentrée sur une courbure brusque","Les épissures sont plus rapides à faire","Les épissures se défont facilement"],correct:1,expl:"Comparaison épissure vs nœud : un nœud crée une courbure brusque dans le cordage. À cette courbure, les fibres extérieures sont comprimées et les intérieures étirées — la contrainte est concentrée en un point, fragilisant le cordage. Une épissure en œil tisse les torons dans le corps du cordage sur 3-5 passes, distribuant la charge progressivement. Résultat : épissure = 90-95% de résistance. Nœud de chaise = 70-75%. Tisserand = 50-55%. Nœud en huit = 75-80%. Règle : pour les connexions permanentes ou à forte charge, toujours épisser."},
    {q:"Le nœud de cabestan diffère de la demi-clef à capeler car il :",opts:["Est plus résistant","Résiste à la traction longitudinale (axiale) — deux tours du côté de la charge empêchent le nœud de glisser, alors que la demi-clef résiste seulement à la traction perpendiculaire","Est fait d'un matériau différent","Peut être utilisé sur des surfaces planes"],correct:1,expl:"Nœud de cabestan (rolling hitch) : conçu spécifiquement pour résister à la traction dans la direction du cordage porteur (charge longitudinale). Clé : les DEUX PREMIERS tours vont du MÊME CÔTÉ que la direction de traction. Le troisième tour croise pour bloquer. Empêche le nœud de glisser le long du cordage/espar. Usages : soulager une aussière tendue, frapper une remorque de secours, sécuriser sur un espar sous charge axiale. La demi-clef résiste seulement à la traction perpendiculaire et glissera sous charge longitudinale."},
    {q:"Quand utiliseriez-vous un nœud de tisserand plutôt qu'un nœud plat ?",opts:["Quand les cordages sont du même matériau","Quand les deux cordages sont de DIAMÈTRES DIFFÉRENTS — le nœud de tisserand est conçu spécifiquement pour cela, le plus gros cordage formant la boucle et le plus petit passant à travers","Quand il faut un nœud très résistant","Quand le nœud doit être permanent"],correct:1,expl:"Nœud de tisserand vs nœud plat : le nœud plat ne fonctionne de manière fiable que si les deux diamètres sont identiques. Si différents : le cordage plus fin peut glisser dans la boucle du plus gros, entraînant une rupture. Nœud de tisserand : conçu spécifiquement pour les diamètres différents. Le cordage LE PLUS GROS forme la boucle. Le plus fin passe dans la boucle, autour de l'arrière, et sous lui-même. Nœud de tisserand double (deux tours du cordage plus fin) pour des diamètres très différents ou cordages mouillés."},
    {q:"Pour faire un nœud de taquet, quelle est la première étape critique ?",opts:["Commencer par une figure en 8","Faire d'abord un tour complet sous LES DEUX cornes du taquet — c'est cela qui fournit la résistance principale. Puis croiser en diagonale, terminer avec une demi-clef de sécurité","Commencer par le dessus du taquet","Faire d'abord un nœud de chaise"],correct:1,expl:"Technique du nœud de taquet : 1. D'abord faire un TOUR COMPLET sous LES DEUX CORNES. C'est l'étape la plus critique — le tour fournit 80% de la résistance. 2. Croiser en diagonale (figure en 8). 3. Terminer avec une demi-clef de sécurité sur une corne. ERREUR CRITIQUE : commencer par le dessus plutôt que par le tour — le cordage peut sauter du taquet sous charge. La partie portante doit ressortir par le bas du taquet. La demi-clef doit croiser PAR-DESSUS la diagonale précédente."},
  ],
  es:[
    {q:"El as de guía es el mejor para:",opts:["Unir dos cabos de diámetros diferentes","Crear un lazo fijo que no se aprieta — rescate, anillo de amarre, unión de vela — retiene 70-75% de resistencia","Atar un cabo a una cornamusa","Detener un cabo que pasa por una polea"],correct:1,expl:"As de guía (bowline): el nudo más importante en el arte marinero. Crea un lazo fijo que NUNCA se aprieta bajo carga, convirtiéndolo en el nudo de rescate universal (se puede poner alrededor de una persona). El lazo se mantiene exactamente del tamaño en que fue atado. Retiene 70-75% de la resistencia del cabo. Debilidad: puede deshacerse bajo carga alternada/lateral — verificar siempre la configuración de bloqueo."},
    {q:"¿Por qué se prefiere siempre una costura sobre un nudo para conexiones permanentes?",opts:["Las costuras se ven mejor","Una costura retiene 90-95% de la resistencia vs 50-75% para los nudos, porque la carga se distribuye gradualmente sobre muchos torones en lugar de concentrarse en una curva brusca","Las costuras son más rápidas de hacer","Las costuras se pueden deshacer fácilmente"],correct:1,expl:"Comparación costura vs nudo: un nudo crea una curva brusca en el cabo. En esa curva, las fibras exteriores se comprimen y las interiores se estiran — el estrés se concentra en un punto, debilitando el cabo. Una costura de ojo teje los torones de nuevo en el cuerpo del cabo en 3-5 pasadas, distribuyendo la carga gradualmente. Resultado: costura = 90-95% de resistencia. As de guía = 70-75%. Nudo de escota = 50-55%. Nudo en ocho = 75-80%."},
    {q:"El ballestrinque corredizo difiere del ballestrinque porque:",opts:["Es más resistente","Resiste la tracción longitudinal (axial) — dos vueltas en el lado de la carga evitan que el nudo resbale, mientras el ballestrinque resiste solo tracción perpendicular","Está hecho de material diferente","Se puede usar en superficies planas"],correct:1,expl:"Ballestrinque corredizo (rolling hitch): diseñado específicamente para resistir la tracción en la dirección del cabo portante. Clave: las DOS PRIMERAS vueltas van del MISMO LADO que la dirección de la tracción. La tercera vuelta cruza para bloquear. Evita que el nudo resbale a lo largo del cabo/palo. Usos: aliviar temporalmente un cabo de amarre tenso, armar un remolque de emergencia. El ballestrinque resiste solo la tracción perpendicular y resbalará bajo carga longitudinal."},
    {q:"¿Cuándo usaría un nudo de escota en lugar de un nudo cuadrado?",opts:["Cuando los cabos son del mismo material","Cuando los dos cabos son de DIFERENTES DIÁMETROS — el nudo de escota está diseñado específicamente para esto, con el cabo más grueso formando el seno y el más fino pasando por él","Cuando se necesita un nudo muy resistente","Cuando el nudo debe ser permanente"],correct:1,expl:"Nudo de escota vs nudo cuadrado: el nudo cuadrado solo funciona de manera fiable cuando los dos diámetros son idénticos. Si son diferentes: el cabo más fino puede deslizarse por el seno del más grueso. Nudo de escota: diseñado específicamente para diámetros diferentes. El cabo MÁS GRUESO forma el seno. El más fino pasa por el seno, alrededor por detrás y bajo sí mismo. Escota doble para diámetros muy diferentes o cabos mojados."},
    {q:"Al hacer un nudo de cornamusa, ¿cuál es el primer paso crítico?",opts:["Empezar con una figura en ocho","Hacer primero una vuelta redonda completa bajo AMBOS cuernos de la cornamusa — esto proporciona la resistencia principal. Luego cruzar en diagonal, terminar con medio cote de seguridad","Empezar desde la parte superior de la cornamusa","Hacer primero un as de guía"],correct:1,expl:"Técnica del nudo de cornamusa: 1. Primero hacer una VUELTA COMPLETA bajo AMBOS CUERNOS. Es el paso más crítico — la vuelta proporciona el 80% de la resistencia. 2. Cruzar en diagonal (patrón en ocho). 3. Terminar con un medio cote de seguridad sobre un cuerno. ERROR CRÍTICO: empezar desde arriba en lugar de hacer la vuelta — el cabo puede saltar de la cornamusa bajo carga."},
  ],
  pt:[
    {q:"O nó de lais de guia é o melhor para:",opts:["Unir dois cabos de diâmetros diferentes","Criar um laço fixo que não aperta — salvamento, anel de amarração, fixação de vela — retém 70-75% de resistência","Prender um cabo a um mordente","Parar um cabo que passa por uma roldana"],correct:1,expl:"Nó de lais de guia (bowline): o nó mais importante na arte marinheira. Cria um laço fixo que NUNCA aperta sob carga, tornando-o o nó de salvamento universal (pode ser colocado em torno de uma pessoa). O laço mantém-se exatamente do tamanho em que foi feito. Retém 70-75% da resistência do cabo. Fraqueza: pode desfazer-se sob carga alternada/lateral — verificar sempre a configuração de bloqueio."},
    {q:"Por que se prefere sempre uma costura em vez de um nó para ligações permanentes?",opts:["As costuras ficam melhor","Uma costura retém 90-95% da resistência vs 50-75% para nós, porque a carga é distribuída gradualmente sobre muitos torons em vez de se concentrar numa curva brusca","As costuras são mais rápidas de fazer","As costuras podem ser desfeitas facilmente"],correct:1,expl:"Comparação costura vs nó: um nó cria uma curva brusca no cabo. Nessa curva, as fibras exteriores são comprimidas e as interiores esticadas — o stress concentra-se num ponto, enfraquecendo o cabo. Uma costura de olho tece os torons de volta no corpo do cabo em 3-5 passagens, distribuindo a carga gradualmente. Resultado: costura = 90-95% de resistência. Lais de guia = 70-75%. Escota = 50-55%. Oito = 75-80%."},
    {q:"A volta corredissa difere da volta do fiel porque:",opts:["É mais resistente","Resiste à tração longitudinal (axial) — duas voltas no lado da carga evitam que o nó escorregue, enquanto a volta do fiel resiste apenas à tração perpendicular","É feita de material diferente","Pode ser usada em superfícies planas"],correct:1,expl:"Volta corredissa (rolling hitch): especificamente desenhada para resistir à tração na direção do cabo portante. Chave: as DUAS PRIMEIRAS voltas vão do MESMO LADO que a direção de tração. A terceira volta cruza para bloquear. Evita que o nó escorregue ao longo do cabo/pau. Usos: aliviar temporariamente um cabo de amarração tenso, armar um reboque de emergência. A volta do fiel resiste apenas à tração perpendicular e escorregará sob carga longitudinal."},
    {q:"Quando usaria um nó de escota em vez de um nó chato?",opts:["Quando os cabos são do mesmo material","Quando os dois cabos são de DIÂMETROS DIFERENTES — o nó de escota é especificamente desenhado para isso, com o cabo mais grosso formando o seio e o mais fino passando por ele","Quando se precisa de um nó muito resistente","Quando o nó deve ser permanente"],correct:1,expl:"Nó de escota vs nó chato: o nó chato apenas funciona de forma fiável quando os dois diâmetros são idênticos. Se diferentes: o cabo mais fino pode deslizar pelo seio do mais grosso. Nó de escota: especificamente desenhado para diâmetros diferentes. O cabo MAIS GROSSO forma o seio. O mais fino passa pelo seio, à volta por trás e por baixo de si mesmo. Escota dupla para diâmetros muito diferentes ou cabos molhados."},
    {q:"Ao fazer um nó de mordente, qual é o primeiro passo crítico?",opts:["Começar com uma figura em oito","Fazer primeiro uma volta redonda completa sob AMBOS os chifres do mordente — isso fornece a resistência principal. Depois cruzar na diagonal, terminar com meia-volta de segurança","Começar pela parte superior do mordente","Fazer primeiro um nó de lais de guia"],correct:1,expl:"Técnica do nó de mordente: 1. Primeiro fazer uma VOLTA COMPLETA sob AMBOS OS CHIFRES. É o passo mais crítico — a volta fornece 80% da resistência. 2. Cruzar na diagonal (padrão em oito). 3. Terminar com uma meia-volta de segurança sobre um chifre. ERRO CRÍTICO: começar pelo cima em vez de fazer a volta — o cabo pode saltar do mordente sob carga."},
  ],
};

const BANK = {
  en:[
    {q:"What is a 'crown knot' and where is it used?",opts:["A decorative knot","A knot formed at the end of a rope by passing each strand over the next in sequence (clockwise or anti-clockwise) — used as the foundation of a back splice and monkey's fist","A joining knot","A stopper knot"],correct:1,expl:"Crown knot (nœud de couronne): formed by taking each strand and passing it over the adjacent strand (in the same rotational direction). Creates a 'crown' at the rope end. Uses: 1. Foundation of a back splice (the crown is then tucked back into the rope body). 2. Foundation of a Turk's head (decorative). 3. Base of a monkey's fist (heaving line weight). The crown knot locks the strands in position so they can then be tucked (spliced) back into the rope without unravelling. Never to be confused with the 'wall knot' which goes the opposite direction."},
    {q:"What is a 'monkey's fist' (poing de singe)?",opts:["A type of block","A heavy, round decorative knot tied around a weighted core (ball, stone) and attached to the end of a heaving line to give it weight for throwing — range up to 30m by hand","A knot for lifting","A joining knot"],correct:1,expl:"Monkey's fist (poing de singe): a spherical decorative/functional knot woven in three planes around a round core (usually a marble, rubber ball, or metal sphere). Tied at the end of a heaving line (touline). Purpose: the weight allows the heaving line to be thrown much further and more accurately than a plain rope end. Range: up to 30m by hand. After the monkey's fist arrives on shore or another vessel, the crew hauls in the heaving line which brings the heavy mooring line across. Note: some jurisdictions restrict the use of metal cores (injury risk) — check local port regulations."},
    {q:"What is 'whipping' (surliure) and why is it used?",opts:["A rope material","A binding of thin twine wound tightly around the end of a rope to prevent fraying — multiple types: common, West Country, palm and needle","A type of knot","A rope finish using heat"],correct:1,expl:"Whipping (surliure): a series of tight turns of thin twine (whipping twine, sail twine) wound around the end of a rope, preventing the strands from unravelling. Types: Common whipping (fast, not permanent), West Country whipping (more secure), Palm and needle whipping (permanent, goes through the strands — best for synthetic ropes). Alternative to back splice: whipping is neater (diameter doesn't increase) but less durable. Synthetic ropes can also be heat-sealed (melt the end with a lighter) — quick but makes the end hard and sharp. For wire rope: wire ferrules or heat-shrink tubing."},
    {q:"What is the difference between 'bight', 'loop', and 'eye'?",opts:["No difference — same thing","Bight = simple U-bend in a rope without crossing. Loop = bight where the two sides cross. Eye = permanent terminal loop (in a splice or tied)","Different materials","Different strengths"],correct:1,expl:"Rope terminology: BIGHT (sinus/coude): a simple U-shaped bend in a rope where the sides do not cross. Used in sheet bend, cleat hitch. LOOP (ganse): a bight where the two sides of the rope cross each other. The crossing can be a half-hitch, a turn for a bowline. EYE (œil): a permanent loop — either spliced (eye splice) or tied (bowline creates an eye). An eye fitted with a thimble is a 'thimble eye'. Understanding these terms is critical for reading rigging manuals, splice instructions, and maritime safety publications."},
    {q:"How do you secure a rope end on a modern synthetic rope?",opts:["Just cut it","Options: heat sealing (melt end with lighter — fast but sharp), whipping with twine (neat, durable), heat-shrink tubing, back splice (permanent, increases diameter), adhesive tape (temporary only)","Tie a reef knot","No need — synthetic ropes don't fray"],correct:1,expl:"Synthetic rope end treatment: 1. Heat sealing: touch end to flame, melt and press flat — quick but creates a sharp, hard disc that can injure hands. 2. Whipping: traditional twine binding — neat, doesn't increase diameter, durable. 3. Back splice: strongest, permanent, but increases diameter — cannot pass through a block. 4. Heat-shrink tubing: apply tubing and heat — neat and protective. 5. Adhesive tape: temporary only — not suitable for working lines. Best practice for working lines: whipping (traditional) or heat-shrink tubing (modern). Never use adhesive tape as permanent finish."},
    {q:"What is a 'Turk's head' knot and when is it used on ships?",opts:["A stopper knot","A decorative cylindrical knot woven around a spar, stanchion, or rope — used to mark positions (handhold, danger point), as fender decoration, and on wheel spokes to mark helm amidships","A joining knot","A rescue knot"],correct:1,expl:"Turk's head (tête de turc): a decorative cylindrical braid woven around an object. Construction: interweaved braid following a specific over-under pattern. Ship uses: 1. Helm position marker: a Turk's head on the helm/wheel spoke marks the midships position (when helm is amidships, the marked spoke is vertical). 2. Safety marking: on stanchions at dangerous deck areas. 3. Decoration: on fenders, trophies, bosun's materials. 4. Handhold: on tillers and handles. Made in 3×2 (three bights, two leads) to complex patterns. Traditional seamanship skill — takes significant practice to master."},
    {q:"What is a 'Prussik knot' and when is it used in maritime rescue?",opts:["A joining knot","A sliding hitch tied with a loop of rope around a larger rope — grips firmly under load but slides when load is removed — used in rope rescue systems, safety ascent/descent on lines","A stopper knot","A decorative knot"],correct:1,expl:"Prussik knot (nœud de Prussik): a friction hitch tied with a smaller loop of rope (the Prussik loop) around a larger rope. How it works: under load (e.g. body weight), the smaller loop grips the larger rope firmly. When the load is removed, the knot slides freely. Maritime uses: 1. Man-overboard recovery: attach Prussik to recovery line to hold person while other actions taken. 2. Work at height: safety backup on bosun's chair. 3. Rope rescue systems. The Prussik must be tied with a rope diameter at least 1/3 smaller than the main rope to function correctly. Modern alternatives: Gibbs ascender, rope clamp devices."},
    {q:"What is the 'half hitch' and when is it used alone vs in combination?",opts:["A permanent knot","A single turn of a rope around an object or through a loop, passing the working end under itself — NEVER used alone (insecure), but forms the basis of clove hitch (×2), rolling hitch (×3), and secures other knots","A stopper knot","A decorative knot"],correct:1,expl:"Half hitch (demi-clef): a single loop where the working end passes under the standing part. Alone: a half hitch will slide and is insecure — NEVER use alone for load-bearing applications. In combination: Clove hitch = two half hitches in the same direction around a post. Rolling hitch = three half hitches with first two on same side. Round turn + 2 half hitches = the round turn takes the load, half hitches secure. A half hitch can also be used to lock (seize) the end of other knots, e.g. adding a half hitch to the end of a bowline to prevent accidental untying."},
    {q:"What is the 'fisherman's knot' (nœud de pêcheur) and what is it used for?",opts:["A commercial fishing technique","Two overhand knots, each tied around the other rope, used to join two ropes or fishing lines of SIMILAR diameter — particularly useful for monofilament or slippery synthetic lines","A joining knot for wire","A stopper knot"],correct:1,expl:"Fisherman's knot (nœud de pêcheur / nœud anglais): tie an overhand knot in rope A around rope B. Tie an overhand knot in rope B around rope A. Pull both ends to tighten and bring knots together. The two knots jam against each other. Uses: joining monofilament lines (fishing), joining slippery synthetic lines where sheet bend might slide, emergency line joining. Strength: approximately 65-75% depending on material. Double fisherman's (Grapevine): two overhand knots each, much stronger and more secure — used in climbing for Prussik loops. Note: the fisherman's knot jams very tight under load and is difficult to undo after use."},
    {q:"What is 'long splice' (épissure longue) and why is it used instead of short splice?",opts:["A decoration","A splice that joins two ropes while maintaining the same external diameter as the original rope — each strand of one rope replaces a strand from the other over a long distance, allowing the splice to pass through blocks and fairleads","A quick temporary join","A type of eye splice"],correct:1,expl:"Long splice (épissure longue): a splice technique that joins two ropes without increasing the diameter. How it works: the strands from each rope end are unlaid over a long distance (10-15× the diameter). The strands from each rope are interleaved with those of the other. Individual strand pairs are then tapered and tucked, replacing each other gradually over the full length. Result: the joined rope has the same external diameter as the original. Can pass through blocks, fairleads, and eyes. Trade-off: strength is slightly lower than short splice (85-90%), the splice is much longer (harder to make), requires more rope length. Used when the rope must pass through running rigging blocks."},
    {q:"What is a 'stopper knot' and give three examples?",opts:["A knot to stop bleeding","A knot tied at the end of a rope to prevent it from running through a block, ring, or hole — examples: figure-eight (most common), overhand knot (weakest), diamond knot (decorative), Ashley stopper knot (largest)","A temporary knot","A lashing knot"],correct:1,expl:"Stopper knot (nœud d'arrêt): a knot tied at the end of a rope to prevent it from slipping through a hole, ring, block sheave, or fairlead. Without a stopper, a sheet or halyard can 'run away' through the block if not attended. Types: 1. Overhand knot: simplest, smallest, weakest (45%) — not recommended. 2. Figure-eight: most common, easy to check visually, retains 75-80%, easy to undo after load. 3. Diamond knot: larger, decorative. 4. Ashley stopper knot: largest, most secure, difficult to undo. Rule: always use figure-eight or better — never overhand knot alone on a working line."},
    {q:"When must you use a double sheet bend instead of a single sheet bend?",opts:["For all uses","When ropes are VERY DIFFERENT in diameter (more than 2:1 ratio), when ropes are wet or slippery, or when load is critical — the double turn of the smaller rope prevents slippage","Only for decorative purposes","Never — single sheet bend is always sufficient"],correct:1,expl:"Double sheet bend (nœud de tisserand double): add a second turn of the smaller rope through the bight before locking. When to use: 1. Large diameter difference (e.g. 10mm to 30mm rope). 2. Wet ropes — wet nylon is very slippery and single sheet bend can fail. 3. Slippery synthetic materials (polypropylene especially). 4. Heavy loads where failure would be dangerous. The extra turn doubles the friction surface, preventing the slip. Strength: double sheet bend ≈ 50% (similar to single) — the improvement is in security, not breaking strength. Alternative: use a bowline in the larger rope and attach smaller rope to the bowline eye with another bowline."},
    {q:"What is 'seizing' (ligature) in seamanship?",opts:["A type of knot","A binding of yarn or wire wound around two ropes or a rope and a fitting to hold them together — used to secure a back-spliced eye, lash running rigging, secure blocks to strops","Punishing a crew member","A type of splice"],correct:1,expl:"Seizing (ligature/surliure de fixation): thin yarn or wire wound tightly in multiple turns around two ropes or parts, binding them together. Different from whipping (which only secures a rope end). Types: Round seizing (flat parallel turns), racking seizing (figure-8 pattern between the parts), frapping turns (perpendicular turns tightening the whole). Uses: 1. Secure two parts of a strop together. 2. Close the throat of a block. 3. Secure a deadeye or thimble. 4. Lash running rigging elements together. Material: traditionally small stuff (spun yarn, marline) or galvanised wire for permanent applications. Always use the correct size of seizing relative to the rope diameter (approximately 1/6 of rope diameter)."},
    {q:"What is the 'running knot' (nœud coulant) and when is it used and NOT used?",opts:["A knot for running rigging","A knot that forms a sliding loop that tightens as load is applied — used for lassoing, temporary securing of light loads, some rescue applications. NEVER use around a person's body or neck","A permanent knot","A joining knot"],correct:1,expl:"Running knot (nœud coulant / lasso): a loop that slides freely on the standing part and tightens when the load on the eye increases. How it works: an overhand knot is tied in the bight, and the loop passes through it — as the load pulls the eye, it slides through the knot, tightening. Uses: lassoing objects (logs, mooring rings in some applications), temporary holding. CRITICAL SAFETY RULE: NEVER use a running/slip knot around a person — it can tighten around the neck or body and cause strangulation or crushing. In rescue, ALWAYS use a bowline (fixed loop). A 'noose' is a running knot intended to tighten — completely prohibited in rescue."},
  ],
  fr:[
    {q:"Qu'est-ce qu'un 'nœud de couronne' et où est-il utilisé ?",opts:["Un nœud décoratif","Un nœud formé en bout de cordage en passant chaque toron par-dessus le suivant (sens horaire ou anti-horaire) — utilisé comme base d'une épissure arrière et d'un poing de singe","Un nœud d'assemblage","Un nœud d'arrêt"],correct:1,expl:"Nœud de couronne : formé en prenant chaque toron et en le passant par-dessus le toron adjacent (dans le même sens de rotation). Crée une 'couronne' en bout de cordage. Utilisations : 1. Base d'une épissure arrière (la couronne est ensuite rentrée dans le corps du cordage). 2. Base d'une tête de turc (décoratif). 3. Base d'un poing de singe (lest de touline). Le nœud de couronne verrouille les torons en position pour qu'ils puissent être rentrés (épissés) dans le cordage sans se défaire."},
    {q:"Qu'est-ce qu'un 'poing de singe' ?",opts:["Un type de poulie","Un nœud décoratif lourd et rond, noué autour d'un cœur lesté (bille, pierre) et attaché à l'extrémité d'une touline pour lui donner du poids à lancer — portée jusqu'à 30m à la main","Un nœud de levage","Un nœud d'assemblage"],correct:1,expl:"Poing de singe : un nœud sphérique décoratif/fonctionnel tissé dans trois plans autour d'un cœur rond. Attaché à l'extrémité d'une touline. Objectif : le poids permet de lancer la touline beaucoup plus loin et avec plus de précision qu'un bout de cordage nu. Portée : jusqu'à 30m à la main. Une fois la touline arrivée à terre ou sur un autre navire, l'équipage haule la touline qui amène la lourde aussière. Remarque : certaines juridictions limitent l'utilisation de cœurs métalliques (risque de blessure)."},
    {q:"Qu'est-ce que la 'surliure' (whipping) et pourquoi est-elle utilisée ?",opts:["Un matériau de cordage","Un ligotage de fil fin enroulé serré autour de l'extrémité d'un cordage pour empêcher l'effilochage — plusieurs types : surliure simple, surliure outre-Manche, surliure à l'aiguille","Un type de nœud","Une finition au chalumeau"],correct:1,expl:"Surliure (whipping) : une série de tours serrés de fil fin (fil de surliure) enroulé autour de l'extrémité d'un cordage, empêchant les torons de s'effilocher. Types : Surliure simple (rapide, pas permanente), Surliure outre-Manche (plus sûre), Surliure à l'aiguille (permanente, passe dans les torons — meilleure pour les synthétiques). Alternative à l'épissure arrière : la surliure est plus nette (le diamètre n'augmente pas) mais moins durable. Les cordages synthétiques peuvent aussi être thermosoudés."},
    {q:"Quelle est la différence entre 'sinus', 'ganse' et 'œil' ?",opts:["Pas de différence — même chose","Sinus = simple courbe en U sans croisement. Ganse = sinus où les deux côtés se croisent. Œil = boucle permanente (épissée ou nouée)","Matériaux différents","Résistances différentes"],correct:1,expl:"Terminologie des cordages : SINUS (bight) : une simple courbe en U dans un cordage où les côtés ne se croisent pas. Utilisé dans le nœud de tisserand, le nœud de taquet. GANSE (loop) : un sinus où les deux côtés du cordage se croisent. Le croisement peut être une demi-clef, un tour pour un nœud de chaise. ŒIL (eye) : une boucle permanente — soit épissée (épissure en œil) soit nouée (le nœud de chaise crée un œil). Un œil équipé d'une cosse est un 'œil à cosse'."},
    {q:"Comment sécuriser l'extrémité d'un cordage synthétique moderne ?",opts:["Juste le couper","Options : thermosoudage (brûler le bout à la flamme — rapide mais tranchant), surliure (propre, durable), gaine thermorétractable, épissure arrière (permanente, augmente le diamètre), ruban adhésif (temporaire seulement)","Faire un nœud plat","Pas nécessaire — les cordages synthétiques ne s'effilochent pas"],correct:1,expl:"Traitement des extrémités de cordages synthétiques : 1. Thermosoudage : toucher le bout à la flamme, fondre et aplatir — rapide mais crée un disque dur et tranchant. 2. Surliure : ligature de fil traditionnel — propre, n'augmente pas le diamètre, durable. 3. Épissure arrière : la plus solide, permanente, mais augmente le diamètre. 4. Gaine thermorétractable : appliquer la gaine et chauffer. 5. Ruban adhésif : temporaire seulement. Meilleure pratique : surliure (traditionnel) ou gaine thermorétractable (moderne)."},
    {q:"Qu'est-ce qu'une 'tête de turc' et quand est-elle utilisée à bord ?",opts:["Un nœud d'arrêt","Un nœud décoratif cylindrique tissé autour d'un espar, d'un chandelier ou d'un cordage — utilisé pour marquer des positions (poignée, point de danger), comme décoration de défense, et sur les rayons de roue pour marquer la barre droite","Un nœud d'assemblage","Un nœud de sauvetage"],correct:1,expl:"Tête de turc (Turk's head) : une tresse décorative cylindrique tissée autour d'un objet. Utilisations à bord : 1. Marqueur de position de barre : une tête de turc sur le rayon de roue marque la position 'barre droite' (quand la barre est droite, le rayon marqué est vertical). 2. Marquage de sécurité : sur les chandeliers dans les zones de pont dangereuses. 3. Décoration : sur les défenses, trophées. Compétence traditionnelle de matelotage — nécessite une pratique significative pour être maîtrisée."},
    {q:"Qu'est-ce qu'un 'nœud de Prussik' et quand est-il utilisé dans le sauvetage maritime ?",opts:["Un nœud d'assemblage","Un nœud de friction noué avec une boucle de cordage autour d'un cordage plus grand — se bloque fermement sous charge mais glisse quand la charge est enlevée — utilisé dans les systèmes de sauvetage, montée/descente de sécurité","Un nœud d'arrêt","Un nœud décoratif"],correct:1,expl:"Nœud de Prussik : un nœud de friction noué avec une boucle plus petite autour d'un cordage plus grand. Fonctionnement : sous charge (poids du corps), la petite boucle saisit le cordage plus grand fermement. Quand la charge est enlevée, le nœud glisse librement. Utilisations maritimes : 1. Récupération homme à la mer : attacher le Prussik à la ligne de récupération pour retenir la personne. 2. Travail en hauteur : sécurité de chaise de gabier. La boucle Prussik doit être au moins 1/3 plus petite que le cordage principal."},
    {q:"Qu'est-ce qu'une 'demi-clef' et quand est-elle utilisée seule vs en combinaison ?",opts:["Un nœud permanent","Un simple tour d'un cordage autour d'un objet ou dans une boucle, passant le bout actif sous lui-même — JAMAIS seule (peu sûre), mais forme la base de la demi-clef à capeler (×2), du nœud de cabestan (×3), et sécurise d'autres nœuds","Un nœud d'arrêt","Un nœud décoratif"],correct:1,expl:"Demi-clef : une simple boucle où le bout actif passe sous la partie portante. Seule : une demi-clef glissera et est peu sûre — NE JAMAIS utiliser seule pour des applications portantes. En combinaison : Demi-clef à capeler = deux demi-clefs dans le même sens autour d'un poteau. Nœud de cabestan = trois demi-clefs avec les deux premières du même côté. Tour mort + 2 demi-clefs = le tour prend la charge, les demi-clefs sécurisent. Une demi-clef peut aussi être utilisée pour bloquer (saisir) d'autres nœuds."},
    {q:"Qu'est-ce que le 'nœud de pêcheur' et à quoi sert-il ?",opts:["Une technique de pêche commerciale","Deux nœuds simples, chacun noué autour de l'autre cordage, utilisés pour assembler deux cordages de DIAMÈTRE SIMILAIRE — particulièrement utile pour les fils monofilament ou les cordages synthétiques glissants","Un nœud d'assemblage pour câble","Un nœud d'arrêt"],correct:1,expl:"Nœud de pêcheur (nœud anglais) : faire un nœud simple dans le cordage A autour du cordage B. Faire un nœud simple dans le cordage B autour du cordage A. Tirer les deux extrémités pour serrer et rapprocher les nœuds. Les deux nœuds se bloquent l'un contre l'autre. Utilisations : assembler des fils monofilament, assembler des cordages synthétiques glissants où le nœud de tisserand pourrait glisser, assemblage de secours. Le double nœud de pêcheur (double filière) = beaucoup plus résistant — utilisé en escalade pour les boucles Prussik."},
    {q:"Qu'est-ce que l'épissure longue et pourquoi est-elle utilisée à la place de l'épissure courte ?",opts:["Une décoration","Une épissure qui assemble deux cordages tout en maintenant le même diamètre externe — chaque toron d'un cordage remplace un toron de l'autre sur une longue distance, permettant à l'épissure de passer dans les poulies et chaumards","Une jonction temporaire rapide","Un type d'épissure en œil"],correct:1,expl:"Épissure longue : technique d'épissure qui assemble deux cordages sans augmenter le diamètre. Fonctionnement : les torons de chaque bout sont défaits sur une longue distance (10-15× le diamètre). Les torons de chaque cordage sont entrelacés avec ceux de l'autre. Les paires de torons sont progressivement effilées et rentrées. Résultat : le cordage assemblé a le même diamètre externe que l'original. Peut passer dans les poulies, chaumards et œils. Compromis : légèrement moins résistante (85-90%), l'épissure est beaucoup plus longue."},
    {q:"Qu'est-ce qu'un 'nœud d'arrêt' et donnez trois exemples ?",opts:["Un nœud pour arrêter les saignements","Un nœud noué en bout de cordage pour l'empêcher de passer dans une poulie, anneau ou trou — exemples : nœud en huit (le plus courant), nœud simple (le plus faible), nœud en diamant (décoratif), nœud d'arrêt d'Ashley (le plus grand)","Un nœud temporaire","Un nœud de ligature"],correct:1,expl:"Nœud d'arrêt : un nœud noué en bout de cordage pour l'empêcher de glisser dans un trou, anneau, gorge de poulie ou chaumard. Sans arrêt, une écoute ou une drisse peut 'filer' dans la poulie si elle n'est pas surveillée. Types : 1. Nœud simple : le plus simple, le plus petit, le plus faible (45%) — déconseillé. 2. Nœud en huit : le plus courant, facile à vérifier visuellement, conserve 75-80%, facile à défaire. 3. Nœud en diamant : plus grand, décoratif. 4. Nœud d'arrêt d'Ashley : le plus grand, le plus sûr, difficile à défaire."},
    {q:"Quand faut-il utiliser un double nœud de tisserand à la place d'un nœud simple ?",opts:["Pour tous les usages","Quand les cordages sont de DIAMÈTRES TRÈS DIFFÉRENTS (rapport > 2:1), quand les cordages sont mouillés ou glissants, ou quand la charge est critique — le tour supplémentaire empêche le glissement","Seulement à des fins décoratives","Jamais — un seul nœud suffit toujours"],correct:1,expl:"Double nœud de tisserand : ajouter un deuxième tour du cordage plus fin dans la boucle avant de bloquer. Quand l'utiliser : 1. Grande différence de diamètre (ex. cordage 10mm sur 30mm). 2. Cordages mouillés — le nylon mouillé est très glissant. 3. Matériaux synthétiques glissants (polypropylène surtout). 4. Charges importantes. Le tour supplémentaire double la surface de friction. Alternative : faire un nœud de chaise dans le gros cordage et attacher le plus fin avec un autre nœud de chaise à la boucle."},
    {q:"Qu'est-ce qu'une 'ligature' (seizing) en matelotage ?",opts:["Un type de nœud","Un ligotage de fil ou de fil métallique enroulé autour de deux cordages ou d'un cordage et d'un accessoire pour les maintenir ensemble — utilisé pour sécuriser un œil épissé, lier le gréement courant, sécuriser des poulies sur des estropes","Punir un membre d'équipage","Un type d'épissure"],correct:1,expl:"Ligature (seizing) : fil fin ou fil métallique enroulé serré en plusieurs tours autour de deux cordages ou parties, les liant ensemble. Différent de la surliure (qui ne sécurise que le bout d'un cordage). Types : Ligature ronde (tours parallèles plats), ligature en croix (motif en 8 entre les parties), tours de frappage (tours perpendiculaires serrant l'ensemble). Utilisations : 1. Sécuriser deux parties d'un estropo. 2. Fermer la gorge d'une poulie. 3. Sécuriser une cosse ou un œil. Matériau : traditionnellement du petit matériel (fil de maline, lusin) ou fil galvanisé pour les applications permanentes."},
    {q:"Qu'est-ce que le 'nœud coulant' et quand est-il utilisé et NON utilisé ?",opts:["Un nœud pour le gréement courant","Un nœud qui forme une boucle glissante qui se resserre quand la charge est appliquée — utilisé pour le lasso, la fixation temporaire de charges légères. NE JAMAIS utiliser autour du corps ou du cou d'une personne","Un nœud permanent","Un nœud d'assemblage"],correct:1,expl:"Nœud coulant (running knot/lasso) : une boucle qui glisse librement sur la partie portante et se resserre quand la charge sur l'œil augmente. Utilisations : attraper des objets, maintien temporaire. RÈGLE DE SÉCURITÉ CRITIQUE : NE JAMAIS utiliser un nœud coulant autour d'une personne — il peut se resserrer autour du cou ou du corps et provoquer strangulation ou écrasement. En sauvetage, TOUJOURS utiliser un nœud de chaise (boucle fixe). Un 'nœud coulant' intentionnellement serrant = absolument interdit en sauvetage."},
  ],
  es:[
    {q:"¿Qué es un 'nudo de corona' y dónde se usa?",opts:["Un nudo decorativo","Un nudo formado en el extremo de un cabo pasando cada torón sobre el siguiente (en sentido horario o antihorario) — utilizado como base de una costura de coronamiento y de un puño de mono","Un nudo de unión","Un nudo de tope"],correct:1,expl:"Nudo de corona: formado tomando cada torón y pasándolo sobre el torón adyacente (en el mismo sentido de rotación). Crea una 'corona' en el extremo del cabo. Usos: 1. Base de una costura de coronamiento. 2. Base de una cabeza de turco (decorativo). 3. Base de un puño de mono (lastre de guía). El nudo de corona bloquea los torones en posición para que puedan costurarse de vuelta en el cuerpo del cabo."},
    {q:"¿Qué es un 'puño de mono'?",opts:["Un tipo de polea","Un nudo decorativo pesado y redondo atado alrededor de un núcleo lastrado (bola, piedra) y unido al extremo de una guía de amarre para darle peso para lanzar — alcance hasta 30m a mano","Un nudo de izado","Un nudo de unión"],correct:1,expl:"Puño de mono: un nudo esférico decorativo/funcional tejido en tres planos alrededor de un núcleo redondo. Atado al extremo de una guía de amarre. Objetivo: el peso permite lanzar la guía mucho más lejos y con más precisión. Alcance: hasta 30m a mano. Una vez que la guía llega a tierra, la tripulación hala la guía que trae el pesado cabo de amarre."},
    {q:"¿Qué es el 'merlado' (whipping) y por qué se usa?",opts:["Un material de cabo","Una ligadura de hilo fino enrollado apretadamente alrededor del extremo de un cabo para evitar el deshilachado — varios tipos: merlado simple, merlado Oeste del País, merlado con aguja y palma","Un tipo de nudo","Un acabado con calor"],correct:1,expl:"Merlado (whipping): una serie de vueltas apretadas de hilo fino enrollado alrededor del extremo de un cabo, evitando que los torones se deshilachen. Tipos: Merlado simple (rápido, no permanente), Merlado Oeste del País (más seguro), Merlado con aguja (permanente, atraviesa los torones). Alternativa a la costura de coronamiento: el merlado es más limpio (el diámetro no aumenta) pero menos duradero."},
    {q:"¿Cuál es la diferencia entre 'seno', 'gaza' y 'ojo'?",opts:["Sin diferencia — la misma cosa","Seno = curva simple en U sin cruzamiento. Gaza = seno donde los dos lados se cruzan. Ojo = lazo permanente (costurado o atado)","Materiales diferentes","Resistencias diferentes"],correct:1,expl:"Terminología de cabos: SENO (bight): una simple curva en U en un cabo donde los lados no se cruzan. GAZA (loop): un seno donde los dos lados del cabo se cruzan. OJO (eye): un lazo permanente — costurado (costura de ojo) o atado (el as de guía crea un ojo). Un ojo con guardacabo es un 'ojo con guardacabo'."},
    {q:"¿Cómo se asegura el extremo de un cabo sintético moderno?",opts:["Solo cortarlo","Opciones: sellado térmico (fundir el extremo con encendedor — rápido pero afilado), merlado con hilo (limpio, duradero), tubo termorretráctil, costura de coronamiento (permanente, aumenta diámetro), cinta adhesiva (solo temporal)","Hacer un nudo cuadrado","No es necesario — los cabos sintéticos no se deshilachan"],correct:1,expl:"Tratamiento de extremos de cabos sintéticos: 1. Sellado térmico: tocar el extremo a la llama, fundir y aplanar. 2. Merlado: ligadura de hilo tradicional — limpio, no aumenta el diámetro. 3. Costura de coronamiento: la más sólida, permanente, pero aumenta el diámetro. 4. Tubo termorretráctil: aplicar tubo y calentar. 5. Cinta adhesiva: solo temporal."},
    {q:"¿Qué es una 'cabeza de turco' y cuándo se usa a bordo?",opts:["Un nudo de tope","Un nudo decorativo cilíndrico tejido alrededor de un palo, candelero o cabo — se usa para marcar posiciones (asidero, punto de peligro), como decoración de defensas, y en los radios del timón para marcar la caña a cero","Un nudo de unión","Un nudo de rescate"],correct:1,expl:"Cabeza de turco (Turk's head): una trenza decorativa cilíndrica tejida alrededor de un objeto. Usos a bordo: 1. Marcador de posición del timón: una cabeza de turco en el radio de la rueda marca la posición 'caña a cero'. 2. Marcado de seguridad: en candeleros en zonas peligrosas. 3. Decoración: en defensas."},
    {q:"¿Qué es un 'nudo Prussik' y cuándo se usa en el salvamento marítimo?",opts:["Un nudo de unión","Un cote de fricción atado con un bucle de cabo alrededor de un cabo más grande — agarra firmemente bajo carga pero resbala cuando se retira la carga — usado en sistemas de rescate, ascenso/descenso de seguridad en líneas","Un nudo de tope","Un nudo decorativo"],correct:1,expl:"Nudo Prussik: un cote de fricción atado con un bucle más pequeño alrededor de un cabo más grande. Funcionamiento: bajo carga (peso corporal), el bucle más pequeño agarra el cabo más grande firmemente. Cuando se retira la carga, el nudo resbala libremente. Usos marítimos: 1. Recuperación de hombre al agua: atar el Prussik a la línea de recuperación. 2. Trabajo en altura: seguridad de silla de gabiero."},
    {q:"¿Qué es el 'medio cote' y cuándo se usa solo vs en combinación?",opts:["Un nudo permanente","Una vuelta simple de un cabo alrededor de un objeto o por un lazo, pasando el extremo activo bajo sí mismo — NUNCA usado solo (inseguro), pero forma la base del ballestrinque (×2), ballestrinque corredizo (×3), y asegura otros nudos","Un nudo de tope","Un nudo decorativo"],correct:1,expl:"Medio cote (half hitch): una vuelta simple donde el extremo activo pasa bajo la parte portante. Solo: un medio cote resbalará y es inseguro — NUNCA usar solo. En combinación: Ballestrinque = dos medios cotes en el mismo sentido. Ballestrinque corredizo = tres con los dos primeros del mismo lado. Vuelta redonda + 2 medios cotes = la vuelta soporta la carga, los medios cotes aseguran."},
    {q:"¿Qué es el 'nudo de pescador' y para qué se usa?",opts:["Una técnica de pesca comercial","Dos nudos simples, cada uno atado alrededor del otro cabo, usados para unir dos cabos de DIÁMETRO SIMILAR — particularmente útil para monofilamento o cabos sintéticos resbaladizos","Un nudo de unión para cable","Un nudo de tope"],correct:1,expl:"Nudo de pescador (nudo inglés): atar un nudo simple en el cabo A alrededor del cabo B. Atar un nudo simple en el cabo B alrededor del cabo A. Tirar de ambos extremos para apretar y unir los nudos. Los dos nudos se bloquean uno contra el otro. Usos: unir líneas de monofilamento, unir cabos sintéticos resbaladizos."},
    {q:"¿Qué es la 'costura larga' y por qué se usa en lugar de la costura corta?",opts:["Una decoración","Una costura que une dos cabos manteniendo el mismo diámetro externo — cada torón de un cabo reemplaza un torón del otro a lo largo de una distancia, permitiendo que la costura pase por poleas y escobenes","Una unión temporal rápida","Un tipo de costura de ojo"],correct:1,expl:"Costura larga (long splice): técnica de costura que une dos cabos sin aumentar el diámetro. Cómo funciona: los torones de cada extremo se destorcen a lo largo de una distancia (10-15× el diámetro). Los torones de cada cabo se entrelazan con los del otro. Las parejas de torones se estrechan y meten gradualmente. Resultado: el cabo unido tiene el mismo diámetro externo. Puede pasar por poleas, escobenes y ojos. Compensación: ligeramente menos resistente (85-90%)."},
    {q:"¿Qué es un 'nudo de tope' y dé tres ejemplos?",opts:["Un nudo para detener hemorragias","Un nudo atado en el extremo de un cabo para evitar que pase por una polea, anillo o agujero — ejemplos: nudo en ocho (más común), nudo simple (más débil), nudo diamante (decorativo), nudo de tope de Ashley (más grande)","Un nudo temporal","Un nudo de trinca"],correct:1,expl:"Nudo de tope (stopper knot): un nudo atado en el extremo de un cabo para evitar que resbale por un agujero, anillo, garganta de polea o escobén. Sin tope, una escota o driza puede 'correr' por la polea. Tipos: 1. Nudo simple: el más sencillo, el más pequeño, el más débil (45%). 2. Nudo en ocho: el más común, fácil de verificar visualmente, retiene 75-80%. 3. Nudo en diamante: más grande, decorativo. 4. Nudo de tope de Ashley: el más grande, el más seguro."},
    {q:"¿Cuándo se debe usar un nudo de escota doble en lugar de uno simple?",opts:["Para todos los usos","Cuando los cabos son de DIÁMETROS MUY DIFERENTES (proporción > 2:1), cuando los cabos están mojados o son resbaladizos, o cuando la carga es crítica — la vuelta extra evita el deslizamiento","Solo con fines decorativos","Nunca — el nudo simple siempre es suficiente"],correct:1,expl:"Nudo de escota doble: añadir una segunda vuelta del cabo más fino por el seno antes de bloquear. Cuándo usarlo: 1. Gran diferencia de diámetro. 2. Cabos mojados — el nylon mojado es muy resbaladizo. 3. Materiales sintéticos resbaladizos. 4. Cargas importantes. La vuelta extra duplica la superficie de fricción."},
    {q:"¿Qué es el 'merlado de fijación' (seizing) en el arte marinero?",opts:["Un tipo de nudo","Una ligadura de hilo o alambre enrollado alrededor de dos cabos o de un cabo y un accesorio para mantenerlos juntos — usado para asegurar un ojo costurado, trincar el aparejo, asegurar poleas en estropes","Castigar a un tripulante","Un tipo de costura"],correct:1,expl:"Merlado de fijación (seizing): hilo fino o alambre enrollado apretadamente en múltiples vueltas alrededor de dos cabos o partes, ligándolos. Diferente del merlado de extremo. Tipos: Seizing redondo (vueltas paralelas planas), seizing de trinca (patrón en ocho), vueltas de frapeo (vueltas perpendiculares). Usos: 1. Asegurar dos partes de un estropo. 2. Cerrar la garganta de una polea. 3. Asegurar un guardacabo. Material: tradicionalmente hilo pequeño o alambre galvanizado."},
    {q:"¿Qué es el 'nudo corredizo' y cuándo se usa y NO se usa?",opts:["Un nudo para el aparejo móvil","Un nudo que forma un lazo deslizante que se aprieta al aplicar la carga — usado para lazos, sujeción temporal de cargas ligeras. NUNCA usar alrededor del cuerpo o cuello de una persona","Un nudo permanente","Un nudo de unión"],correct:1,expl:"Nudo corredizo (running knot/lasso): un lazo que resbala libremente sobre la parte portante y se aprieta cuando aumenta la carga en el ojo. Usos: lazo de objetos, sujeción temporal. REGLA DE SEGURIDAD CRÍTICA: NUNCA usar alrededor de una persona — puede apretar alrededor del cuello o cuerpo causando estrangulación. En rescate, SIEMPRE usar un as de guía (lazo fijo)."},
  ],
  pt:[
    {q:"O que é um 'nó de coroa' e onde é usado?",opts:["Um nó decorativo","Um nó formado no extremo de um cabo passando cada toron sobre o seguinte (no sentido horário ou anti-horário) — usado como base de uma costura de coroa e de um punho de macaco","Um nó de união","Um nó de tope"],correct:1,expl:"Nó de coroa: formado pegando em cada toron e passando-o sobre o toron adjacente (no mesmo sentido de rotação). Cria uma 'coroa' no extremo do cabo. Usos: 1. Base de uma costura de coroa. 2. Base de uma cabeça de turco (decorativo). 3. Base de um punho de macaco (lastro de guia). O nó de coroa bloqueia os torons na posição para que possam ser costurados de volta no corpo do cabo."},
    {q:"O que é um 'punho de macaco'?",opts:["Um tipo de roldana","Um nó decorativo pesado e redondo atado em torno de um núcleo lastrado (bola, pedra) e preso à extremidade de uma guia de amarração para lhe dar peso para lançar — alcance até 30m à mão","Um nó de içamento","Um nó de união"],correct:1,expl:"Punho de macaco: um nó esférico decorativo/funcional tecido em três planos em torno de um núcleo redondo. Preso à extremidade de uma guia de amarração. Objetivo: o peso permite lançar a guia muito mais longe e com mais precisão. Alcance: até 30m à mão. Depois de a guia chegar a terra, a tripulação puxa a guia que traz o pesado cabo de amarração."},
    {q:"O que é o 'turco' (whipping) e por que é usado?",opts:["Um material de cabo","Uma ligadura de fio fino enrolado firmemente em torno da extremidade de um cabo para evitar o desfiamento — vários tipos: turco simples, turco do Oeste do País, turco com agulha e palma","Um tipo de nó","Um acabamento com calor"],correct:1,expl:"Turco (whipping): uma série de voltas apertadas de fio fino enrolado em torno da extremidade de um cabo, evitando que os torons se desfiem. Tipos: Turco simples (rápido, não permanente), Turco do Oeste do País (mais seguro), Turco com agulha (permanente, atravessa os torons). Alternativa à costura de coroa: o turco é mais limpo (o diâmetro não aumenta) mas menos durável."},
    {q:"Qual é a diferença entre 'seio', 'ganel' e 'olho'?",opts:["Sem diferença — a mesma coisa","Seio = curva simples em U sem cruzamento. Ganel = seio onde os dois lados se cruzam. Olho = laço permanente (costurado ou atado)","Materiais diferentes","Resistências diferentes"],correct:1,expl:"Terminologia de cabos: SEIO (bight): uma curva simples em U num cabo onde os lados não se cruzam. GANEL (loop): um seio onde os dois lados do cabo se cruzam. OLHO (eye): um laço permanente — costurado (costura de olho) ou atado (o nó de lais de guia cria um olho). Um olho com cosse é um 'olho com cosse'."},
    {q:"Como se assegura a extremidade de um cabo sintético moderno?",opts:["Apenas cortá-lo","Opções: selagem térmica (fundir a extremidade com isqueiro — rápido mas afiado), turco com fio (limpo, durável), tubo termorretráctil, costura de coroa (permanente, aumenta diâmetro), fita adesiva (apenas temporária)","Fazer um nó chato","Não é necessário — os cabos sintéticos não se desfiam"],correct:1,expl:"Tratamento de extremidades de cabos sintéticos: 1. Selagem térmica: tocar a extremidade na chama, fundir e aplanar. 2. Turco: ligadura de fio tradicional — limpo, não aumenta o diâmetro. 3. Costura de coroa: a mais sólida, permanente, mas aumenta o diâmetro. 4. Tubo termorretráctil: aplicar tubo e aquecer. 5. Fita adesiva: apenas temporária."},
    {q:"O que é uma 'cabeça de turco' e quando é usada a bordo?",opts:["Um nó de tope","Um nó decorativo cilíndrico tecido em torno de um pau, candeleiro ou cabo — usado para marcar posições (pega, ponto de perigo), como decoração de defensas, e nos raios do leme para marcar cana a zero","Um nó de união","Um nó de salvamento"],correct:1,expl:"Cabeça de turco (Turk's head): uma trança decorativa cilíndrica tecida em torno de um objeto. Usos a bordo: 1. Marcador de posição do leme: uma cabeça de turco no raio da roda marca a posição 'cana a zero'. 2. Marcação de segurança: em candeleiros em zonas perigosas. 3. Decoração: em defensas."},
    {q:"O que é um 'nó Prussik' e quando é usado no salvamento marítimo?",opts:["Um nó de união","Um nó de fricção atado com um laço de cabo em torno de um cabo maior — agarra firmemente sob carga mas escorrega quando a carga é removida — usado em sistemas de salvamento, subida/descida de segurança em linhas","Um nó de tope","Um nó decorativo"],correct:1,expl:"Nó Prussik: um nó de fricção atado com um laço mais pequeno em torno de um cabo maior. Funcionamento: sob carga (peso corporal), o laço mais pequeno agarra o cabo maior firmemente. Quando a carga é removida, o nó escorrega livremente. Usos marítimos: 1. Recuperação de homem ao mar: prender o Prussik à linha de recuperação. 2. Trabalho em altura: segurança de cadeira de gabineiro."},
    {q:"O que é a 'meia-volta' e quando é usada sozinha vs em combinação?",opts:["Um nó permanente","Uma volta simples de um cabo em torno de um objeto ou por um laço, passando a extremidade ativa por baixo de si mesma — NUNCA usada sozinha (insegura), mas forma a base da volta do fiel (×2), volta corredissa (×3), e assegura outros nós","Um nó de tope","Um nó decorativo"],correct:1,expl:"Meia-volta (half hitch): uma volta simples onde a extremidade ativa passa por baixo da parte portante. Sozinha: uma meia-volta escorregará e é insegura — NUNCA usar sozinha. Em combinação: Volta do fiel = duas meias-voltas no mesmo sentido. Volta corredissa = três com as duas primeiras do mesmo lado. Volta redonda + 2 meias-voltas = a volta suporta a carga, as meias-voltas asseguram."},
    {q:"O que é o 'nó de pescador' e para que é usado?",opts:["Uma técnica de pesca comercial","Dois nós simples, cada um atado em torno do outro cabo, usados para unir dois cabos de DIÂMETRO SIMILAR — particularmente útil para monofilamento ou cabos sintéticos escorregadios","Um nó de união para cabo de aço","Um nó de tope"],correct:1,expl:"Nó de pescador (nó inglês): atar um nó simples no cabo A em torno do cabo B. Atar um nó simples no cabo B em torno do cabo A. Puxar ambas as extremidades para apertar e juntar os nós. Os dois nós bloqueiam-se um contra o outro. Usos: unir linhas de monofilamento, unir cabos sintéticos escorregadios."},
    {q:"O que é a 'costura longa' e por que é usada em vez da costura curta?",opts:["Uma decoração","Uma costura que une dois cabos mantendo o mesmo diâmetro externo — cada toron de um cabo substitui um toron do outro ao longo de uma distância, permitindo que a costura passe por roldanas e escovéns","Uma junção temporária rápida","Um tipo de costura de olho"],correct:1,expl:"Costura longa (long splice): técnica de costura que une dois cabos sem aumentar o diâmetro. Como funciona: os torons de cada extremo são desfeitos ao longo de uma distância (10-15× o diâmetro). Os torons de cada cabo são entrelaçados com os do outro. Os pares de torons são progressivamente adelgaçados e metidos. Resultado: o cabo unido tem o mesmo diâmetro externo. Pode passar por roldanas, escovéns e olhos."},
    {q:"O que é um 'nó de tope' e dê três exemplos?",opts:["Um nó para parar hemorragias","Um nó atado no extremo de um cabo para evitar que passe por uma roldana, anel ou buraco — exemplos: nó em oito (mais comum), nó simples (mais fraco), nó diamante (decorativo), nó de tope de Ashley (maior)","Um nó temporário","Um nó de trinça"],correct:1,expl:"Nó de tope (stopper knot): um nó atado no extremo de um cabo para evitar que escorregue por um buraco, anel, garganta de roldana ou escovém. Sem tope, uma escota ou adriça pode 'correr' pela roldana. Tipos: 1. Nó simples: o mais simples, o mais pequeno, o mais fraco (45%). 2. Nó em oito: o mais comum, fácil de verificar visualmente, retém 75-80%. 3. Nó em diamante: maior, decorativo. 4. Nó de tope de Ashley: o maior, o mais seguro."},
    {q:"Quando se deve usar um nó de escota duplo em vez de um simples?",opts:["Para todos os usos","Quando os cabos são de DIÂMETROS MUITO DIFERENTES (rácio > 2:1), quando os cabos estão molhados ou escorregadios, ou quando a carga é crítica — a volta extra evita o deslizamento","Apenas para fins decorativos","Nunca — o simples é sempre suficiente"],correct:1,expl:"Nó de escota duplo: adicionar uma segunda volta do cabo mais fino pelo seio antes de bloquear. Quando usar: 1. Grande diferença de diâmetro. 2. Cabos molhados — o nylon molhado é muito escorregadio. 3. Materiais sintéticos escorregadios. 4. Cargas importantes. A volta extra duplica a superfície de atrito."},
    {q:"O que é a 'ligadura de fixação' (seizing) na arte marinheira?",opts:["Um tipo de nó","Uma ligadura de fio ou arame enrolado em torno de dois cabos ou de um cabo e um acessório para os manter juntos — usado para assegurar um olho costurado, trançar o aparelho, assegurar roldanas em estropos","Punir um tripulante","Um tipo de costura"],correct:1,expl:"Ligadura de fixação (seizing): fio fino ou arame enrolado firmemente em múltiplas voltas em torno de dois cabos ou partes, ligando-os. Diferente do turco (que apenas assegura a extremidade de um cabo). Tipos: Ligadura redonda (voltas paralelas planas), ligadura de trinça (padrão em oito), voltas de frapagem (voltas perpendiculares). Usos: 1. Assegurar duas partes de um estropo. 2. Fechar a garganta de uma roldana. 3. Assegurar uma cosse."},
    {q:"O que é o 'nó corredisso' e quando é usado e NÃO é usado?",opts:["Um nó para o aparelho corrente","Um nó que forma um laço deslizante que aperta quando a carga é aplicada — usado para laçar, fixação temporária de cargas ligeiras. NUNCA usar em torno do corpo ou pescoço de uma pessoa","Um nó permanente","Um nó de união"],correct:1,expl:"Nó corredisso (running knot/lasso): um laço que desliza livremente sobre a parte portante e aperta quando a carga no olho aumenta. Usos: laçar objetos, fixação temporária. REGRA DE SEGURANÇA CRÍTICA: NUNCA usar em torno de uma pessoa — pode apertar em torno do pescoço ou corpo causando estrangulamento. Em salvamento, SEMPRE usar um nó de lais de guia (laço fixo)."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.en;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else {setDone(true);if(onComplete)onComplete();}};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.knot},${C.splice})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:11,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.knot},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:10},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.3}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.knot}33,${C.splice}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:`${C.knot}15`,border:`1px solid ${C.knot}44`,fontSize:14,color:C.knot,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.knot}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.knot,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.knot:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white,fontFamily:"'Nunito',sans-serif"}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.knot},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    en:{
      badge:"🪢 Seamanship · Lesson 2/5 · ⭐ Premium · 200 XP",
      title:"Knots & Splices",
      intro:"Knots and splices are the fundamental skills of a seaman. Knowing which knot to use in which situation — and being able to tie it quickly and correctly — can save a life at sea. This lesson covers the 8 essential maritime knots with SVG diagrams, strength comparison, splicing techniques, and practical scenarios.",
      p1:"PART 1 — 8 ESSENTIAL KNOTS",
      s1:"KNOT CATEGORIES:\n\nLOOPS (boucles):\n→ Bowline: fixed loop, never tightens (rescue, mooring rings)\n\nHITCHES (clefs) — rope to object:\n→ Clove hitch: quick temporary mooring\n→ Round turn+2HH: secure attachment to rings\n→ Cleat hitch: daily mooring standard\n→ Rolling hitch: longitudinal pull resistance\n\nBENDS (assemblages) — rope to rope:\n→ Sheet bend: different diameters\n→ Reef knot: same diameter only\n\nSTOPPERS:\n→ Figure-eight: block stopper, strongest",
      p2:"PART 2 — KNOT STRENGTH COMPARISON",
      s3:"SPLICE VS KNOT:\nSplice = 90-95% · Bowline = 72% · Figure-8 = 78%\nSheet bend = 52% · Reef knot = 47%\n\nRULE: permanent load = SPLICE\nTemporary = knot acceptable",
      p3:"PART 3 — SPLICING TECHNIQUES",
      s4:"THREE ESSENTIAL SPLICES:\n\nEYE SPLICE (90-95%):\n→ Permanent loop at rope end\n→ Always use thimble\n→ 3-5 tucks (5 for wire)\n\nSHORT SPLICE (95%):\n→ Joins two ropes permanently\n→ Diameter increases at junction\n→ Cannot pass through block\n\nBACK SPLICE (75-80%):\n→ Rope end finishing\n→ Crown knot foundation\n→ Prevents fraying permanently",
      p4:"PART 4 — PRACTICAL SCENARIOS",
      s5:"CHOOSE THE RIGHT KNOT:\n→ Fixed loop around a person = BOWLINE\n→ Ring/buoy attachment = RT+2HH\n→ Cleat = CLEAT HITCH\n→ Different diameters = SHEET BEND\n→ Longitudinal pull = ROLLING HITCH\n→ Block stopper = FIGURE-EIGHT\n→ Permanent connection = SPLICE",
      p5:"🎯 EXERCISES",p6:"📝 QUESTION BANK — 15 QUESTIONS",
      sumT:"SUMMARY — KNOTS & SPLICES L2",
      sumP:["Bowline = fixed loop that NEVER tightens — universal rescue knot (70-75%)","Cleat hitch: round turn under both horns first — then figure-8 — then locking half hitch","Sheet bend for DIFFERENT diameters · Reef knot for SAME diameter only","Rolling hitch = 2 wraps same side as pull → resists longitudinal load","Eye splice 90-95% · Short splice 95% · Back splice 75-80%","Splice ALWAYS stronger than knot — prefer for permanent connections","Figure-eight = universal stopper knot (75-80%) — easy to check visually","Crown knot = base of back splice and monkey's fist"],
      learnedP:["8 essential knots with SVG diagrams and usage scenarios","Knot strength comparison: 45% to 95%","Three splice types: eye · short · back","Splice vs knot: when to use each","Practical knot selection for real maritime situations"],
    },
    fr:{
      badge:"🪢 Seamanship · Leçon 2/5 · ⭐ Premium · 200 XP",
      title:"Nœuds & Épissures",
      intro:"Les nœuds et épissures sont les compétences fondamentales du matelot. Savoir quel nœud utiliser dans quelle situation — et pouvoir le faire rapidement et correctement — peut sauver une vie en mer. Cette leçon couvre les 8 nœuds maritimes essentiels avec schémas SVG, comparaison des résistances, techniques d'épissure et scénarios pratiques.",
      p1:"PARTIE 1 — 8 NŒUDS ESSENTIELS",
      s1:"CATÉGORIES DE NŒUDS :\n\nBOUCLES (loops) :\n→ Nœud de chaise : boucle fixe, ne se resserre jamais (sauvetage, anneaux)\n\nCLEFS (hitches) — cordage sur objet :\n→ Demi-clef à capeler : amarrage rapide temporaire\n→ Tour mort+2DC : attache sûre sur anneaux\n→ Nœud de taquet : standard quotidien\n→ Nœud de cabestan : résistance traction longitudinale\n\nASSEMBLAGES (bends) — cordage sur cordage :\n→ Nœud de tisserand : diamètres différents\n→ Nœud plat : même diamètre uniquement\n\nARRÊTS :\n→ Nœud en huit : le meilleur arrêt de poulie",
      p2:"PARTIE 2 — COMPARAISON DES RÉSISTANCES",
      s3:"ÉPISSURE VS NŒUD :\nÉpissure = 90-95% · Chaise = 72% · Huit = 78%\nTisserand = 52% · Nœud plat = 47%\n\nRÈGLE : charge permanente = ÉPISSURE\nTemporaire = nœud acceptable",
      p3:"PARTIE 3 — TECHNIQUES D'ÉPISSURE",
      s4:"TROIS ÉPISSURES ESSENTIELLES :\n\nÉPISSURE EN ŒIL (90-95%) :\n→ Boucle permanente en bout de cordage\n→ Toujours utiliser une cosse\n→ 3-5 passes (5 pour câble acier)\n\nÉPISSURE COURTE (95%) :\n→ Assemble deux cordages définitivement\n→ Le diamètre augmente à la jonction\n→ Ne passe pas dans les poulies\n\nÉPISSURE ARRIÈRE (75-80%) :\n→ Finition des bouts de cordage\n→ Base : nœud de couronne\n→ Empêche l'effilochage définitivement",
      p4:"PARTIE 4 — SCÉNARIOS PRATIQUES",
      s5:"CHOISIR LE BON NŒUD :\n→ Boucle fixe autour d'une personne = NŒUD DE CHAISE\n→ Anneau/bouée = TOUR MORT+2DC\n→ Taquet = NŒUD DE TAQUET\n→ Diamètres différents = TISSERAND\n→ Traction longitudinale = CABESTAN\n→ Arrêt de poulie = NŒUD EN HUIT\n→ Connexion permanente = ÉPISSURE",
      p5:"🎯 EXERCICES",p6:"📝 BANQUE 15 QUESTIONS",
      sumT:"RÉSUMÉ — NŒUDS & ÉPISSURES L2",
      sumP:["Nœud de chaise = boucle fixe qui NE SE RESSERRE JAMAIS — nœud de sauvetage universel (70-75%)","Nœud de taquet : tour complet sous les deux cornes d'abord → figure en 8 → demi-clef de sécurité","Nœud de tisserand pour DIAMÈTRES DIFFÉRENTS · Nœud plat pour MÊME DIAMÈTRE seulement","Nœud de cabestan = 2 tours du même côté que la traction → résiste à la charge longitudinale","Épissure en œil 90-95% · Épissure courte 95% · Épissure arrière 75-80%","Épissure TOUJOURS plus résistante qu'un nœud — préférer pour les connexions permanentes","Nœud en huit = meilleur nœud d'arrêt universel (75-80%) — facile à vérifier visuellement","Nœud de couronne = base de l'épissure arrière et du poing de singe"],
      learnedP:["8 nœuds essentiels avec schémas SVG et scénarios d'usage","Comparaison résistance des nœuds : 45% à 95%","Trois types d'épissure : en œil · courte · arrière","Épissure vs nœud : quand utiliser chaque","Choix pratique de nœud pour situations maritimes réelles"],
    },
    es:{
      badge:"🪢 Seamanship · Lección 2/5 · ⭐ Premium · 200 XP",
      title:"Nudos y Costuras",
      intro:"Los nudos y costuras son las habilidades fundamentales del marinero. Saber qué nudo usar en cada situación — y poder hacerlo rápida y correctamente — puede salvar una vida en el mar. Esta lección cubre los 8 nudos marítimos esenciales con diagramas SVG, comparación de resistencias, técnicas de costura y escenarios prácticos.",
      p1:"PARTE 1 — 8 NUDOS ESENCIALES",
      s1:"CATEGORÍAS DE NUDOS:\n\nLAZOS (loops):\n→ As de guía: lazo fijo, nunca se aprieta (rescate, anillos)\n\nCOTES (hitches) — cabo sobre objeto:\n→ Ballestrinque: amarre rápido temporal\n→ V.redonda+2MC: fijación segura en anillos\n→ Nudo de cornamusa: estándar diario\n→ Ballestrinque corredizo: resistencia tracción longitudinal\n\nEMPALMES (bends) — cabo sobre cabo:\n→ Nudo de escota: diámetros diferentes\n→ Nudo cuadrado: mismo diámetro solo\n\nTOPES:\n→ Nudo en ocho: el mejor tope de polea",
      p2:"PARTE 2 — COMPARACIÓN DE RESISTENCIAS",
      s3:"COSTURA VS NUDO:\nCostura = 90-95% · As de guía = 72% · Ocho = 78%\nEscota = 52% · Cuadrado = 47%\n\nREGLA: carga permanente = COSTURA\nTemporal = nudo aceptable",
      p3:"PARTE 3 — TÉCNICAS DE COSTURA",
      s4:"TRES COSTURAS ESENCIALES:\n\nCOSTURA DE OJO (90-95%):\n→ Lazo permanente en el extremo del cabo\n→ Usar siempre guardacabo\n→ 3-5 pasadas (5 para cable de acero)\n\nCOSTURA CORTA (95%):\n→ Une dos cabos permanentemente\n→ El diámetro aumenta en la unión\n→ No puede pasar por una polea\n\nCOSTURA DE CORONAMIENTO (75-80%):\n→ Acabado del extremo del cabo\n→ Nudo de corona como base\n→ Evita el deshilachado permanentemente",
      p4:"PARTE 4 — ESCENARIOS PRÁCTICOS",
      s5:"ELEGIR EL NUDO CORRECTO:\n→ Lazo fijo alrededor de una persona = AS DE GUÍA\n→ Anillo/boya = V.REDONDA+2MC\n→ Cornamusa = NUDO DE CORNAMUSA\n→ Diámetros diferentes = ESCOTA\n→ Tracción longitudinal = CORREDIZO\n→ Tope de polea = NUDO EN OCHO\n→ Conexión permanente = COSTURA",
      p5:"🎯 EJERCICIOS",p6:"📝 BANCO 15 PREGUNTAS",
      sumT:"RESUMEN — NUDOS Y COSTURAS L2",
      sumP:["As de guía = lazo fijo que NUNCA se aprieta — nudo de rescate universal (70-75%)","Nudo de cornamusa: vuelta completa bajo ambos cuernos primero → figura en ocho → medio cote","Nudo de escota para DIÁMETROS DIFERENTES · Nudo cuadrado para MISMO DIÁMETRO solo","Ballestrinque corredizo = 2 vueltas del mismo lado que la tracción → resiste carga longitudinal","Costura de ojo 90-95% · Costura corta 95% · Costura de coronamiento 75-80%","Costura SIEMPRE más resistente que nudo — preferir para conexiones permanentes","Nudo en ocho = mejor nudo de tope universal (75-80%) — fácil de verificar visualmente","Nudo de corona = base de la costura de coronamiento y del puño de mono"],
      learnedP:["8 nudos esenciales con diagramas SVG y escenarios de uso","Comparación de resistencia de nudos: 45% a 95%","Tres tipos de costura: de ojo · corta · de coronamiento","Costura vs nudo: cuándo usar cada uno","Selección práctica de nudo para situaciones marítimas reales"],
    },
    pt:{
      badge:"🪢 Seamanship · Lição 2/5 · ⭐ Premium · 200 XP",
      title:"Nós e Costuras",
      intro:"Os nós e costuras são as competências fundamentais do marinheiro. Saber que nó usar em cada situação — e conseguir fazê-lo rápida e corretamente — pode salvar uma vida no mar. Esta lição cobre os 8 nós marítimos essenciais com diagramas SVG, comparação de resistências, técnicas de costura e cenários práticos.",
      p1:"PARTE 1 — 8 NÓS ESSENCIAIS",
      s1:"CATEGORIAS DE NÓS:\n\nLAÇOS (loops):\n→ Lais de guia: laço fixo, nunca aperta (salvamento, anéis)\n\nVOLTAS (hitches) — cabo em objeto:\n→ Volta do fiel: amarração rápida temporária\n→ V.redonda+2MV: fixação segura em anéis\n→ Nó de mordente: padrão diário\n→ Volta corredissa: resistência tração longitudinal\n\nEMENDAS (bends) — cabo em cabo:\n→ Nó de escota: diâmetros diferentes\n→ Nó chato: mesmo diâmetro apenas\n\nTOPES:\n→ Nó em oito: o melhor tope de roldana",
      p2:"PARTE 2 — COMPARAÇÃO DE RESISTÊNCIAS",
      s3:"COSTURA VS NÓ:\nCostura = 90-95% · Lais de guia = 72% · Oito = 78%\nEscota = 52% · Chato = 47%\n\nREGRA: carga permanente = COSTURA\nTemporária = nó aceitável",
      p3:"PARTE 3 — TÉCNICAS DE COSTURA",
      s4:"TRÊS COSTURAS ESSENCIAIS:\n\nCOSTURA DE OLHO (90-95%):\n→ Laço permanente no extremo do cabo\n→ Usar sempre cosse\n→ 3-5 passagens (5 para cabo de aço)\n\nCOSTURA CURTA (95%):\n→ Une dois cabos permanentemente\n→ O diâmetro aumenta na junção\n→ Não pode passar por uma roldana\n\nCOSTURA DE COROA (75-80%):\n→ Acabamento do extremo do cabo\n→ Nó de coroa como base\n→ Evita o desfiamento permanentemente",
      p4:"PARTE 4 — CENÁRIOS PRÁTICOS",
      s5:"ESCOLHER O NÓ CERTO:\n→ Laço fixo em torno de uma pessoa = LAIS DE GUIA\n→ Anel/bóia = V.REDONDA+2MV\n→ Mordente = NÓ DE MORDENTE\n→ Diâmetros diferentes = ESCOTA\n→ Tração longitudinal = VOLTA CORREDISSA\n→ Tope de roldana = NÓ EM OITO\n→ Ligação permanente = COSTURA",
      p5:"🎯 EXERCÍCIOS",p6:"📝 BANCO 15 QUESTÕES",
      sumT:"RESUMO — NÓS E COSTURAS L2",
      sumP:["Lais de guia = laço fixo que NUNCA aperta — nó de salvamento universal (70-75%)","Nó de mordente: volta completa sob ambos os chifres primeiro → figura em oito → meia-volta","Nó de escota para DIÂMETROS DIFERENTES · Nó chato para MESMO DIÂMETRO apenas","Volta corredissa = 2 voltas do mesmo lado que a tração → resiste à carga longitudinal","Costura de olho 90-95% · Costura curta 95% · Costura de coroa 75-80%","Costura SEMPRE mais resistente que nó — preferir para ligações permanentes","Nó em oito = melhor nó de tope universal (75-80%) — fácil de verificar visualmente","Nó de coroa = base da costura de coroa e do punho de macaco"],
      learnedP:["8 nós essenciais com diagramas SVG e cenários de uso","Comparação de resistência de nós: 45% a 95%","Três tipos de costura: de olho · curta · de coroa","Costura vs nó: quando usar cada um","Seleção prática de nó para situações marítimas reais"],
    },
  };
  return d[lang]||d.en;
};

export default function LessonSEA_L2({ lang="en", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.en;const quiz=QUIZ[lang]||QUIZ.en;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#060800 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.knot}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.knot,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🪢 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/5":lang==="en"?"Lesson 2/5":lang==="es"?"Lección 2/5":"Lição 2/5"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.knot,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.knot},${C.splice},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.knot}15`,border:`1px solid ${C.knot}44`,fontSize:11,color:C.knot,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.knot}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85}}>{lc.intro}</div>
            </Card>
            <SL icon="🪢" text={lc.p1} color={C.knot}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.knot}22`}}>
              <div style={{fontSize:11,color:C.knot,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🪢 {lang==="fr"?"8 NŒUDS ESSENTIELS — CLIQUER POUR DÉTAILS":lang==="en"?"8 ESSENTIAL KNOTS — TAP FOR DETAILS":lang==="es"?"8 NUDOS ESENCIALES — PULSAR PARA DETALLES":"8 NÓS ESSENCIAIS — TOQUE PARA DETALHES"}</div>
              <KnotsCardsSVG lang={lang}/>
            </Card>
            <SL icon="📊" text={lc.p2} color={C.splice}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.splice}22`}}>
              <div style={{fontSize:11,color:C.splice,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📊 {lang==="fr"?"COMPARAISON DES RÉSISTANCES":lang==="en"?"STRENGTH COMPARISON":lang==="es"?"COMPARACIÓN DE RESISTENCIAS":"COMPARAÇÃO DE RESISTÊNCIAS"}</div>
              <KnotStrengthSVG lang={lang}/>
            </Card>
            <SL icon="✂️" text={lc.p3} color={C.hitch}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.hitch}22`}}>
              <div style={{fontSize:11,color:C.hitch,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>✂️ {lang==="fr"?"GUIDE DES ÉPISSURES":lang==="en"?"SPLICES GUIDE":lang==="es"?"GUÍA DE COSTURAS":"GUIA DE COSTURAS"}</div>
              <SplicesGuideSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🎯 {lang==="fr"?"SCÉNARIOS PRATIQUES":lang==="en"?"PRACTICAL SCENARIOS":lang==="es"?"ESCENARIOS PRÁCTICOS":"CENÁRIOS PRÁTICOS"}</div>
              <KnotQuizSVG lang={lang}/>
            </Card>
            <SL icon="📝" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="📚" text={lc.p6} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>
            <Card style={{marginBottom:14,background:`${C.knot}08`,border:`1px solid ${C.knot}22`}}>
              <div style={{fontSize:11,color:C.knot,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:11,color:C.white}}><span style={{color:C.knot,fontWeight:700,fontFamily:"'Courier New',monospace"}}>✓</span>{pt}</div>)}
            </Card>
            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.knot},${C.splice},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,boxShadow:`0 10px 36px ${C.knot}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Knots & Splices</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 2":lang==="en"?"Lesson 2":lang==="es"?"Lección 2":"Lição 2"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.knot}15`,border:`1px solid ${C.knot}55`,fontSize:14,color:C.knot,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.knot,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.knot},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 8px 28px ${C.knot}33`,marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 — MOUILLAGE & ANCRES →":lang==="en"?"LESSON 3 — ANCHORING & ANCHOR TYPES →":lang==="es"?"LECCIÓN 3 — FONDEO Y TIPOS DE ANCLAS →":"LIÇÃO 3 — FUNDEAMENTO E TIPOS DE ÂNCORAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
