// LessonSEA_L3 — Anchoring & Anchor Types | PART 1
import { useState } from "react";

// ── PALETTE ────────────────────────────────────────────────────
const C = {
  anchor:"#7eb8d4", chain:"#94a3b8", sand:"#c8a96e",
  rock:"#8b7355", mud:"#6b5a3e", weed:"#4a8c3f",
  gold:"#c9922a", gold2:"#e8b94f", navy:"#060e1a",
  navy2:"#0a1628", navy3:"#0d1f3c",
  safe:"#6dbf8a", danger:"#f97316",
};

// ── TRANSLATIONS ───────────────────────────────────────────────
const T: any = {
  fr: {
    moduleLabel: "SEAMANSHIP",
    lessonTitle: "Mouillage & Types d'ancres",
    intro: "Le mouillage est l'une des manœuvres fondamentales du marin. Choisir la bonne ancre, calculer la portée de chaîne et évaluer le fond sont des compétences essentielles pour assurer la sécurité du navire à l'arrêt.",
    tabs: ["📖 Contenu", "✏️ Pratique", "📚 Banque Q.", "🎯 Quiz"],
    // Content sections
    s1title: "🔱 Anatomie d'une ancre",
    s1hint: "👆 Tapez une partie pour voir sa définition",
    s2title: "⚓ Types d'ancres",
    s2hint: "👆 Tapez une ancre pour comparer",
    s3title: "🔗 La chaîne et la portée",
    s3hint: "👆 Ajustez la profondeur pour calculer la portée",
    s4title: "🌊 Qualité des fonds",
    s4hint: "👆 Tapez un fond pour voir son évaluation",
    keypoints: "Points clés",
    kp: [
      "La portée minimale = 3× la profondeur ; optimale = 5–7× par mauvais temps",
      "L'ancre Hall (à pattes articulées) est la plus répandue sur les navires modernes",
      "Un bon fond de mouillage : sable, vase — mauvais : roche, algues denses",
      "Le bout-de-chaîne (bitter end) doit toujours être frappé à bord",
      "Le guideau (windlass) sert à virer et filer la chaîne",
    ],
    // Anatomy labels
    anat: {
      crown: { name: "Couronne", desc: "Point de jonction des pattes et de la verge. En cas d'ancre coincée, on tire sur la ligne d'orin fixée ici." },
      fluke: { name: "Patte (fluke)", desc: "Surface plate qui pénètre dans le fond et génère la tenue. Plus elle est large, meilleure est la tenue sur fond mou." },
      shank: { name: "Verge (shank)", desc: "Tige principale reliant la couronne à l'organeau. Sa longueur détermine le bras de levier de l'ancre." },
      ring: { name: "Organeau (ring)", desc: "Anneau de tête auquel est frappée la chaîne ou le câblot. Doit supporter la charge de mouillage totale." },
      stock: { name: "Jas (stock)", desc: "Barre transversale (absente sur les ancres sans jas) qui force la patte à s'orienter vers le fond." },
    },
    // Anchor types
    anchors: {
      hall: { name: "Ancre Hall", desc: "Ancre sans jas à pattes articulées. Standard sur la majorité des navires modernes. Excellente tenue, facile à rentrer en écubier." },
      danforth: { name: "Ancre Danforth", desc: "Pattes très larges et jas en tête. Idéale sur fond de sable ou de vase. Légère pour sa puissance de tenue." },
      cqr: { name: "Ancre CQR (Charrue)", desc: "Tête pivotante en forme de soc. Très utilisée en plaisance. Bonne tenue sur sable, moins efficace sur roche." },
      admiralty: { name: "Ancre Amirauté", desc: "Ancre classique à jas fixe. Excellente tenue sur tous les fonds mais encombrante et difficile à stocker." },
      bruce: { name: "Ancre Bruce", desc: "Ancre sans jas à trois griffes monobloc. Bonne tenue sur sable et vase. Populaire en plaisance." },
    },
    // Scope
    scopeLabel: "Profondeur",
    scopeUnit: "m",
    scopeResult: "Portée recommandée",
    scopeMin: "Minimum (×3)",
    scopeOpt: "Optimal (×5)",
    scopeStorm: "Gros temps (×7)",
    // Seabed
    beds: {
      sand: { name: "Sable 🏖️", rating: "Excellent", desc: "Meilleur fond de mouillage. L'ancre pénètre facilement et développe une forte tenue." },
      mud: { name: "Vase 🟤", rating: "Bon", desc: "Bonne tenue si la couche est épaisse. Attention aux fonds vaseux trop mous — l'ancre peut chasser." },
      rock: { name: "Roche 🪨", rating: "Mauvais", desc: "L'ancre ne pénètre pas. Risque de coincement. À éviter absolument sauf urgence." },
      weed: { name: "Algues 🌿", rating: "Médiocre", desc: "Les algues empêchent la patte de pénétrer le fond. Tenue très aléatoire." },
      gravel: { name: "Gravier ⚪", rating: "Correct", desc: "Tenue acceptable mais l'ancre peut chasser si le fond est en pente ou sous courant fort." },
    },
    // Practice
    practiceTitle: "Exercice pratique",
    questions: [
      {
        q: "Un navire mouille par 12 mètres de fond avec un fort courant annoncé. Quelle longueur de chaîne doit-il filer au minimum, et quelle longueur est recommandée ?",
        a: "Minimum : 3 × 12 = 36 m de chaîne. Recommandé par fort courant : 5 × 12 = 60 m. Par gros temps ou courant violent : 7 × 12 = 84 m. Il faut également tenir compte de la hauteur de franc-bord jusqu à l'écubier pour calculer la profondeur réelle.",
      },
      {
        q: "Vous devez mouiller sur un fond inconnu. Quels indices visuels et sur la carte marine vous permettent d'évaluer la qualité du fond avant de mouiller ?",
        a: "Sur la carte marine : les symboles de fond (S = sable, M = vase, R = roche, Wd = algues). La couleur de l'eau (eau verte-marron = fond de vase, eau claire = sable ou roche). Le comportement des autres navires au mouillage (s'ils tiennent bien, le fond est bon). La ligne de sonde (bathymétrie) pour vérifier la profondeur et la régularité du fond.",
      },
      {
        q: "Expliquez le rôle de la ligne d'orin (trip line) et dans quelle situation elle est indispensable.",
        a: "La ligne d'orin est un filin léger frappé à la couronne de l'ancre et rattaché à une bouée de surface. Elle permet de récupérer l'ancre coincée en la tirant par la couronne (sens inverse de la tenue). Elle est indispensable sur fond de roche ou encombré (épaves, câbles), où le risque de coincement est élevé. Sur fond de sable ou vase propre, elle est optionnelle.",
      },
    ],
    showAnswer: "Voir la correction",
    hideAnswer: "Masquer",
  },
  en: {
    moduleLabel: "SEAMANSHIP",
    lessonTitle: "Anchoring & Anchor Types",
    intro: "Anchoring is one of the most fundamental seamanship manoeuvres. Choosing the right anchor, calculating scope and assessing the seabed are essential skills for safe vessel holding.",
    tabs: ["📖 Content", "✏️ Practice", "📚 Question Bank", "🎯 Quiz"],
    s1title: "🔱 Anchor Anatomy",
    s1hint: "👆 Tap a part to see its definition",
    s2title: "⚓ Anchor Types",
    s2hint: "👆 Tap an anchor to compare",
    s3title: "🔗 Chain & Scope",
    s3hint: "👆 Adjust depth to calculate scope",
    s4title: "🌊 Seabed Quality",
    s4hint: "👆 Tap a seabed type to see its rating",
    keypoints: "Key Points",
    kp: [
      "Minimum scope = 3× depth; optimal = 5–7× in bad weather",
      "The Hall anchor (articulated flukes) is the most common on modern vessels",
      "Good holding ground: sand, mud — poor: rock, dense weed",
      "The bitter end must always be secured on board",
      "The windlass is used to heave and veer the chain",
    ],
    anat: {
      crown: { name: "Crown", desc: "Junction point of flukes and shank. In case of a fouled anchor, the trip line attached here allows recovery." },
      fluke: { name: "Fluke", desc: "Flat surface that penetrates the seabed and generates holding power. Wider flukes give better hold in soft ground." },
      shank: { name: "Shank", desc: "Main rod connecting the crown to the ring. Its length determines the anchor's lever arm." },
      ring: { name: "Ring", desc: "Head ring to which the chain or rope is attached. Must withstand the full anchoring load." },
      stock: { name: "Stock", desc: "Crossbar (absent on stockless anchors) that forces the fluke to orient toward the seabed." },
    },
    anchors: {
      hall: { name: "Hall Anchor", desc: "Stockless anchor with articulated flukes. Standard on most modern vessels. Excellent hold, easy to stow in hawse." },
      danforth: { name: "Danforth Anchor", desc: "Very wide flukes with head stock. Ideal on sand or mud. Light for its holding power." },
      cqr: { name: "CQR Anchor (Plough)", desc: "Pivoting plough-shaped head. Widely used in leisure sailing. Good hold on sand, less effective on rock." },
      admiralty: { name: "Admiralty Anchor", desc: "Classic anchor with fixed stock. Excellent hold on all ground but bulky and hard to stow." },
      bruce: { name: "Bruce Anchor", desc: "Stockless three-claw one-piece anchor. Good hold on sand and mud. Popular in leisure sailing." },
    },
    scopeLabel: "Depth",
    scopeUnit: "m",
    scopeResult: "Recommended scope",
    scopeMin: "Minimum (×3)",
    scopeOpt: "Optimal (×5)",
    scopeStorm: "Heavy weather (×7)",
    beds: {
      sand: { name: "Sand 🏖️", rating: "Excellent", desc: "Best anchoring ground. Anchor penetrates easily and develops strong hold." },
      mud: { name: "Mud 🟤", rating: "Good", desc: "Good hold if layer is thick. Beware very soft mud — anchor may drag." },
      rock: { name: "Rock 🪨", rating: "Poor", desc: "Anchor cannot penetrate. Risk of fouling. Avoid unless emergency." },
      weed: { name: "Weed 🌿", rating: "Mediocre", desc: "Weed prevents flukes penetrating. Very unreliable holding." },
      gravel: { name: "Gravel ⚪", rating: "Fair", desc: "Acceptable hold but anchor may drag on slope or in strong current." },
    },
    practiceTitle: "Practice Exercise",
    questions: [
      {
        q: "A vessel anchors in 12 metres depth with strong current forecast. What is the minimum chain length to veer, and what is the recommended length?",
        a: "Minimum: 3 × 12 = 36 m of chain. Recommended in strong current: 5 × 12 = 60 m. In heavy weather or violent current: 7 × 12 = 84 m. Also account for freeboard height to hawse when calculating actual depth.",
      },
      {
        q: "You need to anchor on unknown ground. What visual clues and chart information help you assess seabed quality before anchoring?",
        a: "On the chart: seabed symbols (S = sand, M = mud, R = rock, Wd = weed). Water colour (green-brown = muddy, clear = sand or rock). Behaviour of other anchored vessels (if they hold well, ground is good). Depth contours (bathymetry) to verify depth and seabed regularity.",
      },
      {
        q: "Explain the role of the trip line and in what situation it is essential.",
        a: "A trip line is a light line attached to the anchor crown and connected to a surface buoy. It allows recovery of a fouled anchor by pulling from the crown (reverse of holding direction). Essential on rocky or fouled ground (wrecks, cables). Optional on clean sand or mud.",
      },
    ],
    showAnswer: "Show answer",
    hideAnswer: "Hide",
  },
  es: {
    moduleLabel: "SEAMANSHIP",
    lessonTitle: "Fondeo & Tipos de anclas",
    intro: "El fondeo es una de las maniobras fundamentales del marinero. Elegir el ancla correcta, calcular el alcance de cadena y evaluar el fondo son habilidades esenciales para la seguridad del buque.",
    tabs: ["📖 Contenido", "✏️ Práctica", "📚 Banco Q.", "🎯 Quiz"],
    s1title: "🔱 Anatomía del ancla",
    s1hint: "👆 Toca una parte para ver su definición",
    s2title: "⚓ Tipos de anclas",
    s2hint: "👆 Toca un ancla para comparar",
    s3title: "🔗 Cadena y alcance",
    s3hint: "👆 Ajusta la profundidad para calcular el alcance",
    s4title: "🌊 Calidad del fondo",
    s4hint: "👆 Toca un tipo de fondo para ver su valoración",
    keypoints: "Puntos clave",
    kp: [
      "Alcance mínimo = 3× la profundidad; óptimo = 5–7× con mal tiempo",
      "El ancla Hall (garras articuladas) es la más común en buques modernos",
      "Buen tenedero: arena, fango — malo: roca, algas densas",
      "El firme (bitter end) debe estar siempre asegurado a bordo",
      "El molinete (windlass) sirve para virar y filar la cadena",
    ],
    anat: {
      crown: { name: "Corona", desc: "Punto de unión de las uñas y el caño. En caso de ancla encallada, la línea de orinque fijada aquí permite recuperarla." },
      fluke: { name: "Uña (fluke)", desc: "Superficie plana que penetra en el fondo y genera el agarre. Cuanto más ancha, mejor agarre en fondos blandos." },
      shank: { name: "Caño (shank)", desc: "Barra principal que une la corona al arganeo. Su longitud determina el brazo de palanca del ancla." },
      ring: { name: "Arganeo (ring)", desc: "Argolla a la que se grilletea la cadena o el cabo. Debe soportar la carga total del fondeo." },
      stock: { name: "Cepo (stock)", desc: "Barra transversal (ausente en anclas sin cepo) que obliga a la uña a orientarse hacia el fondo." },
    },
    anchors: {
      hall: { name: "Ancla Hall", desc: "Ancla sin cepo con uñas articuladas. Estándar en la mayoría de buques modernos. Excelente agarre, fácil de guindar." },
      danforth: { name: "Ancla Danforth", desc: "Uñas muy anchas con cepo en la cabeza. Ideal en arena o fango. Ligera para su poder de agarre." },
      cqr: { name: "Ancla CQR (Arado)", desc: "Cabeza giratoria en forma de reja. Muy usada en vela. Buen agarre en arena, menos eficaz en roca." },
      admiralty: { name: "Ancla Almirantazgo", desc: "Ancla clásica con cepo fijo. Excelente agarre en todo fondo pero voluminosa y difícil de estibar." },
      bruce: { name: "Ancla Bruce", desc: "Ancla sin cepo de tres garras monobloque. Buen agarre en arena y fango. Popular en náutica de recreo." },
    },
    scopeLabel: "Profundidad",
    scopeUnit: "m",
    scopeResult: "Alcance recomendado",
    scopeMin: "Mínimo (×3)",
    scopeOpt: "Óptimo (×5)",
    scopeStorm: "Mal tiempo (×7)",
    beds: {
      sand: { name: "Arena 🏖️", rating: "Excelente", desc: "Mejor tenedero. El ancla penetra fácilmente y desarrolla un fuerte agarre." },
      mud: { name: "Fango 🟤", rating: "Bueno", desc: "Buen agarre si la capa es gruesa. Cuidado con fangos muy blandos — el ancla puede garrar." },
      rock: { name: "Roca 🪨", rating: "Malo", desc: "El ancla no penetra. Riesgo de enganche. Evitar salvo urgencia." },
      weed: { name: "Algas 🌿", rating: "Mediocre", desc: "Las algas impiden la penetración de la uña. Agarre muy aleatorio." },
      gravel: { name: "Grava ⚪", rating: "Aceptable", desc: "Agarre aceptable pero el ancla puede garrar en pendiente o con corriente fuerte." },
    },
    practiceTitle: "Ejercicio práctico",
    questions: [
      {
        q: "Un buque fondea con 12 metros de fondo y se anuncia corriente fuerte. ¿Qué longitud mínima de cadena debe filar y qué longitud es recomendable?",
        a: "Mínimo: 3 × 12 = 36 m de cadena. Recomendado con corriente fuerte: 5 × 12 = 60 m. Con mal tiempo o corriente violenta: 7 × 12 = 84 m. También hay que tener en cuenta la altura del francobordo hasta el escobén para calcular la profundidad real.",
      },
      {
        q: "Debe fondear en un fondo desconocido. ¿Qué indicios visuales y de la carta náutica permiten evaluar la calidad del fondo antes de fondear?",
        a: "En la carta: símbolos de fondo (S = arena, M = fango, R = roca, Wd = algas). Color del agua (verde-marrón = fango, clara = arena o roca). Comportamiento de otros buques fondeados. Curvas batimétricas para verificar la profundidad y regularidad del fondo.",
      },
      {
        q: "Explique el papel del orinque y en qué situación es indispensable.",
        a: "El orinque es un cabo ligero fijado a la corona del ancla y unido a una boya de superficie. Permite recuperar el ancla enganchada tirando por la corona (sentido inverso al agarre). Indispensable en fondo de roca o encumbrado (pecios, cables). Opcional en arena o fango limpio.",
      },
    ],
    showAnswer: "Ver corrección",
    hideAnswer: "Ocultar",
  },
  pt: {
    moduleLabel: "SEAMANSHIP",
    lessonTitle: "Fundeio & Tipos de âncoras",
    intro: "O fundeio é uma das manobras fundamentais do marinheiro. Escolher a âncora certa, calcular o alcance da corrente e avaliar o fundo são habilidades essenciais para a segurança do navio.",
    tabs: ["📖 Conteúdo", "✏️ Prática", "📚 Banco Q.", "🎯 Quiz"],
    s1title: "🔱 Anatomia da âncora",
    s1hint: "👆 Toque numa parte para ver a definição",
    s2title: "⚓ Tipos de âncoras",
    s2hint: "👆 Toque numa âncora para comparar",
    s3title: "🔗 Corrente e alcance",
    s3hint: "👆 Ajuste a profundidade para calcular o alcance",
    s4title: "🌊 Qualidade do fundo",
    s4hint: "👆 Toque num tipo de fundo para ver a avaliação",
    keypoints: "Pontos-chave",
    kp: [
      "Alcance mínimo = 3× a profundidade; ótimo = 5–7× com mau tempo",
      "A âncora Hall (garras articuladas) é a mais comum em navios modernos",
      "Bom fundeadouro: areia, lodo — mau: rocha, algas densas",
      "A retenida (bitter end) deve estar sempre presa a bordo",
      "O molinete (windlass) serve para virar e arriar a corrente",
    ],
    anat: {
      crown: { name: "Coroa", desc: "Ponto de junção das garras e da haste. Em caso de âncora presa, a linha de orinque fixada aqui permite recuperá-la." },
      fluke: { name: "Garra (fluke)", desc: "Superfície plana que penetra no fundo e gera a resistência. Garras mais largas dão melhor fixação em fundo mole." },
      shank: { name: "Haste (shank)", desc: "Barra principal que une a coroa ao arganéu. Seu comprimento determina o braço de alavanca da âncora." },
      ring: { name: "Arganéu (ring)", desc: "Argola à qual é fixada a corrente ou o cabo. Deve suportar a carga total do fundeio." },
      stock: { name: "Cepo (stock)", desc: "Barra transversal (ausente em âncoras sem cepo) que força a garra a se orientar para o fundo." },
    },
    anchors: {
      hall: { name: "Âncora Hall", desc: "Âncora sem cepo com garras articuladas. Padrão na maioria dos navios modernos. Excelente fixação, fácil de recolher na escovém." },
      danforth: { name: "Âncora Danforth", desc: "Garras muito largas com cepo na cabeça. Ideal em areia ou lodo. Leve para sua capacidade de fixação." },
      cqr: { name: "Âncora CQR (Arado)", desc: "Cabeça giratória em forma de arado. Muito usada em vela. Boa fixação em areia, menos eficaz em rocha." },
      admiralty: { name: "Âncora do Almirantado", desc: "Âncora clássica com cepo fixo. Excelente fixação em todo tipo de fundo, mas volumosa e difícil de estivar." },
      bruce: { name: "Âncora Bruce", desc: "Âncora sem cepo de três garras monobloco. Boa fixação em areia e lodo. Popular em náutica de recreio." },
    },
    scopeLabel: "Profundidade",
    scopeUnit: "m",
    scopeResult: "Alcance recomendado",
    scopeMin: "Mínimo (×3)",
    scopeOpt: "Ótimo (×5)",
    scopeStorm: "Mau tempo (×7)",
    beds: {
      sand: { name: "Areia 🏖️", rating: "Excelente", desc: "Melhor fundeadouro. A âncora penetra facilmente e desenvolve forte fixação." },
      mud: { name: "Lodo 🟤", rating: "Bom", desc: "Boa fixação se a camada for espessa. Cuidado com lodo muito mole — a âncora pode arrastar." },
      rock: { name: "Rocha 🪨", rating: "Mau", desc: "A âncora não penetra. Risco de encalhe. Evitar salvo emergência." },
      weed: { name: "Algas 🌿", rating: "Medíocre", desc: "As algas impedem a penetração da garra. Fixação muito aleatória." },
      gravel: { name: "Cascalho ⚪", rating: "Razoável", desc: "Fixação aceitável mas a âncora pode arrastar em declive ou com corrente forte." },
    },
    practiceTitle: "Exercício prático",
    questions: [
      {
        q: "Um navio fundeia com 12 metros de fundo e corrente forte prevista. Qual o comprimento mínimo de corrente a arriar e qual o comprimento recomendado?",
        a: "Mínimo: 3 × 12 = 36 m de corrente. Recomendado com corrente forte: 5 × 12 = 60 m. Com mau tempo ou corrente violenta: 7 × 12 = 84 m. Também se deve considerar a altura do francobordo até a escovém ao calcular a profundidade real.",
      },
      {
        q: "Você precisa fundear em fundo desconhecido. Que indícios visuais e da carta náutica permitem avaliar a qualidade do fundo antes de fundear?",
        a: "Na carta: símbolos de fundo (S = areia, M = lodo, R = rocha, Wd = algas). Cor da água (verde-marrom = lodo, clara = areia ou rocha). Comportamento de outros navios fundeados. Curvas batimétricas para verificar a profundidade e regularidade do fundo.",
      },
      {
        q: "Explique o papel do orinque e em que situação é indispensável.",
        a: "O orinque é um cabo leve fixado à coroa da âncora e ligado a uma boia de superfície. Permite recuperar a âncora presa puxando pela coroa (sentido inverso à fixação). Indispensável em fundo de rocha ou encumbrado (destroços, cabos). Opcional em areia ou lodo limpo.",
      },
    ],
    showAnswer: "Ver correção",
    hideAnswer: "Ocultar",
  },
};

// ── SVG 1 — ANCHOR ANATOMY ────────────────────────────────────
function AnchorAnatomySVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [selected, setSelected] = useState<string | null>(null);
  const parts = t.anat;
  const sel = selected ? parts[selected] : null;

  const partStyle = (key: string) => ({
    cursor: "pointer",
    opacity: selected === key ? 1 : 0.75,
    transition: "opacity 0.2s",
  });

  return (
    <div style={{ background: `${C.navy2}cc`, borderRadius: 14, padding: 14, border: `1px solid ${C.anchor}33` }}>
      <div style={{ fontSize: 10, color: C.anchor, letterSpacing: 2, marginBottom: 8, fontFamily: "'Cinzel',serif" }}>{t.s1hint}</div>
      <svg viewBox="0 0 220 260" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
        {/* Stock */}
        <rect x="60" y="38" width="100" height="10" rx="4" fill={C.chain}
          style={partStyle("stock")} onClick={() => setSelected(selected === "stock" ? null : "stock")} />
        {/* Ring */}
        <circle cx="110" cy="28" r="12" fill="none" stroke={C.gold} strokeWidth="4"
          style={partStyle("ring")} onClick={() => setSelected(selected === "ring" ? null : "ring")} />
        {/* Shank */}
        <rect x="105" y="40" width="10" height="120" rx="4" fill={C.anchor}
          style={partStyle("shank")} onClick={() => setSelected(selected === "shank" ? null : "shank")} />
        {/* Crown */}
        <ellipse cx="110" cy="165" rx="18" ry="10" fill={C.gold2}
          style={partStyle("crown")} onClick={() => setSelected(selected === "crown" ? null : "crown")} />
        {/* Fluke Left */}
        <path d="M110 165 Q70 185 60 220 Q85 215 110 195" fill={C.anchor}
          style={partStyle("fluke")} onClick={() => setSelected(selected === "fluke" ? null : "fluke")} />
        {/* Fluke Right */}
        <path d="M110 165 Q150 185 160 220 Q135 215 110 195" fill={C.anchor}
          style={partStyle("fluke")} onClick={() => setSelected(selected === "fluke" ? null : "fluke")} />

        {/* Labels */}
        <text x="168" y="44" fontSize="9" fill={C.chain} fontFamily="Courier New">
          {selected === "stock" ? "▶ " : ""}{parts.stock.name}
        </text>
        <text x="128" y="25" fontSize="9" fill={C.gold} fontFamily="Courier New">
          {parts.ring.name}
        </text>
        <text x="120" y="100" fontSize="9" fill={C.anchor} fontFamily="Courier New">
          {parts.shank.name}
        </text>
        <text x="120" y="168" fontSize="9" fill={C.gold2} fontFamily="Courier New">
          {parts.crown.name}
        </text>
        <text x="52" y="230" fontSize="9" fill={C.anchor} fontFamily="Courier New">
          {parts.fluke.name}
        </text>
      </svg>

      {sel && (
        <div style={{
          marginTop: 10, padding: 12, borderRadius: 10,
          background: `${C.navy3}cc`, border: `1px solid ${C.anchor}55`,
          fontSize: 12, color: "#e0e8ff", lineHeight: 1.6, fontFamily: "Courier New",
        }}>
          <div style={{ color: C.gold2, fontWeight: 700, marginBottom: 4 }}>{sel.name}</div>
          {sel.desc}
        </div>
      )}
      {!sel && (
        <div style={{ textAlign: "center", fontSize: 11, color: "rgba(240,244,255,0.3)", marginTop: 8 }}>
          {t.s1hint}
        </div>
      )}
    </div>
  );
}

// ── SVG 2 — ANCHOR TYPES ─────────────────────────────────────
function AnchorTypesSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [selected, setSelected] = useState<string>("hall");
  const types = Object.entries(t.anchors) as [string, { name: string; desc: string }][];
  const sel = t.anchors[selected];

  const anchorShapes: Record<string, JSX.Element> = {
    hall: (
      <g>
        <circle cx="80" cy="30" r="10" fill="none" stroke={C.gold} strokeWidth="3" />
        <rect x="76" y="38" width="8" height="80" rx="3" fill={C.anchor} />
        <ellipse cx="80" cy="122" rx="14" ry="7" fill={C.gold2} />
        <path d="M80 122 Q50 138 42 165 Q62 160 80 148" fill={C.anchor} />
        <path d="M80 122 Q110 138 118 165 Q98 160 80 148" fill={C.anchor} />
      </g>
    ),
    danforth: (
      <g>
        <circle cx="80" cy="30" r="10" fill="none" stroke={C.gold} strokeWidth="3" />
        <rect x="76" y="38" width="8" height="75" rx="3" fill={C.anchor} />
        <rect x="45" y="108" width="70" height="6" rx="3" fill={C.chain} />
        <path d="M80 118 Q38 130 28 165 Q55 158 80 142" fill={C.anchor} />
        <path d="M80 118 Q122 130 132 165 Q105 158 80 142" fill={C.anchor} />
      </g>
    ),
    cqr: (
      <g>
        <circle cx="80" cy="30" r="10" fill="none" stroke={C.gold} strokeWidth="3" />
        <rect x="76" y="38" width="8" height="60" rx="3" fill={C.anchor} />
        <ellipse cx="80" cy="105" rx="10" ry="6" fill={C.gold2} />
        <path d="M80 105 Q60 120 55 155 Q75 145 80 130 Q85 145 105 155 Q100 120 80 105Z" fill={C.anchor} />
      </g>
    ),
    admiralty: (
      <g>
        <circle cx="80" cy="25" r="10" fill="none" stroke={C.gold} strokeWidth="3" />
        <rect x="76" y="33" width="8" height="100" rx="3" fill={C.anchor} />
        <rect x="38" y="125" width="84" height="7" rx="3" fill={C.chain} />
        <path d="M46 133 Q42 155 50 165 Q60 170 70 160" fill={C.anchor} />
        <path d="M114 133 Q118 155 110 165 Q100 170 90 160" fill={C.anchor} />
      </g>
    ),
    bruce: (
      <g>
        <circle cx="80" cy="30" r="10" fill="none" stroke={C.gold} strokeWidth="3" />
        <rect x="76" y="38" width="8" height="70" rx="3" fill={C.anchor} />
        <path d="M80 108 Q55 118 42 150 Q60 148 72 138 Q76 155 80 158 Q84 155 88 138 Q100 148 118 150 Q105 118 80 108Z" fill={C.anchor} />
      </g>
    ),
  };

  return (
    <div style={{ background: `${C.navy2}cc`, borderRadius: 14, padding: 14, border: `1px solid ${C.anchor}33` }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {types.map(([key, val]) => (
          <button key={key} onClick={() => setSelected(key)} style={{
            padding: "5px 10px", borderRadius: 8, fontSize: 10, cursor: "pointer",
            background: selected === key ? `${C.anchor}33` : "transparent",
            border: `1px solid ${selected === key ? C.anchor : "rgba(255,255,255,0.15)"}`,
            color: selected === key ? C.anchor : "rgba(240,244,255,0.5)",
            fontFamily: "Courier New",
          }}>{val.name}</button>
        ))}
      </div>
      <svg viewBox="0 0 160 190" style={{ width: "100%", maxWidth: 200, display: "block", margin: "0 auto" }}>
        {anchorShapes[selected]}
      </svg>
      <div style={{
        marginTop: 8, padding: 10, borderRadius: 10,
        background: `${C.navy3}cc`, border: `1px solid ${C.anchor}44`,
        fontSize: 12, color: "#e0e8ff", lineHeight: 1.6, fontFamily: "Courier New",
      }}>
        <div style={{ color: C.gold2, fontWeight: 700, marginBottom: 4 }}>{sel.name}</div>
        {sel.desc}
      </div>
    </div>
  );
}

// ── SVG 3 — SCOPE CALCULATOR ──────────────────────────────────
function ScopeCalculatorSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [depth, setDepth] = useState(10);
  const min = depth * 3;
  const opt = depth * 5;
  const storm = depth * 7;

  return (
    <div style={{ background: `${C.navy2}cc`, borderRadius: 14, padding: 14, border: `1px solid ${C.chain}33` }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(240,244,255,0.6)", marginBottom: 6 }}>
          <span>{t.scopeLabel}</span>
          <span style={{ color: C.gold2, fontWeight: 700 }}>{depth} {t.scopeUnit}</span>
        </div>
        <input type="range" min={3} max={40} value={depth}
          onChange={e => setDepth(Number(e.target.value))}
          style={{ width: "100%", accentColor: C.anchor }} />
      </div>
      <svg viewBox="0 0 280 130" style={{ width: "100%", display: "block" }}>
        {/* Water surface */}
        <line x1="10" y1="20" x2="270" y2="20" stroke={C.anchor} strokeWidth="1.5" strokeDasharray="4,3" />
        <text x="12" y="16" fontSize="8" fill={C.anchor} fontFamily="Courier New">surface</text>
        {/* Seabed */}
        <line x1="10" y1="110" x2="270" y2="110" stroke={C.sand} strokeWidth="2" />
        <text x="12" y="124" fontSize="8" fill={C.sand} fontFamily="Courier New">fond</text>
        {/* Vessel */}
        <rect x="20" y="10" width="30" height="14" rx="3" fill={C.navy3} stroke={C.gold} strokeWidth="1.5" />
        <text x="25" y="21" fontSize="8" fill={C.gold} fontFamily="Courier New">⚓</text>
        {/* Depth line */}
        <line x1="35" y1="24" x2="35" y2="108" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3,2" />
        <text x="38" y="70" fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="Courier New">{depth}m</text>
        {/* Chain lines */}
        {[
          { scope: min, color: C.danger, label: `×3 = ${min}m`, y: 95 },
          { scope: opt, color: C.safe, label: `×5 = ${opt}m`, y: 102 },
          { scope: storm, color: C.gold2, label: `×7 = ${storm}m`, y: 109 },
        ].map(({ scope, color, label, y }, i) => {
          const maxScope = storm || 1;
          const x2 = Math.min(35 + (scope / maxScope) * 200, 265);
          return (
            <g key={i}>
              <line x1="35" y1="24" x2={x2} y2={y} stroke={color} strokeWidth={i === 1 ? 2 : 1.5} strokeDasharray={i === 0 ? "4,3" : "none"} />
              <circle cx={x2} cy={y} r="4" fill={color} />
              <text x={x2 + 5} y={y + 3} fontSize="8" fill={color} fontFamily="Courier New">{label}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
        {[
          { label: t.scopeMin, val: min, color: C.danger },
          { label: t.scopeOpt, val: opt, color: C.safe },
          { label: t.scopeStorm, val: storm, color: C.gold2 },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", borderRadius: 8, background: `${C.navy3}aa`, border: `1px solid ${color}33` }}>
            <span style={{ fontSize: 11, color: "rgba(240,244,255,0.6)", fontFamily: "Courier New" }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "Courier New" }}>{val} m</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SVG 4 — SEABED QUALITY ───────────────────────────────────
function SeabedQualitySVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const beds = Object.entries(t.beds) as [string, { name: string; rating: string; desc: string }][];
  const [selected, setSelected] = useState<string | null>(null);
  const bedColors: Record<string, string> = { sand: C.sand, mud: C.mud, rock: C.rock, weed: C.weed, gravel: C.chain };
  const ratingColors: Record<string, string> = {
    "Excellent": C.safe, "Excelente": C.safe, "Excelente": C.safe,
    "Bon": C.safe, "Good": C.safe, "Bueno": C.safe, "Bom": C.safe,
    "Correct": C.anchor, "Fair": C.anchor, "Aceptable": C.anchor, "Razoável": C.anchor,
    "Médiocre": C.danger, "Mediocre": C.danger,
    "Mauvais": "#e74c3c", "Poor": "#e74c3c", "Malo": "#e74c3c", "Mau": "#e74c3c",
  };
  const sel = selected ? t.beds[selected] : null;

  return (
    <div style={{ background: `${C.navy2}cc`, borderRadius: 14, padding: 14, border: `1px solid ${C.sand}33` }}>
      <div style={{ fontSize: 10, color: C.sand, letterSpacing: 2, marginBottom: 10, fontFamily: "'Cinzel',serif" }}>{t.s4hint}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        {beds.map(([key, val]) => {
          const col = bedColors[key] || C.chain;
          const rc = ratingColors[val.rating] || C.anchor;
          return (
            <button key={key} onClick={() => setSelected(selected === key ? null : key)} style={{
              padding: "10px 8px", borderRadius: 10, cursor: "pointer", textAlign: "left",
              background: selected === key ? `${col}22` : "rgba(255,255,255,0.04)",
              border: `1px solid ${selected === key ? col : "rgba(255,255,255,0.1)"}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f0f4ff", marginBottom: 3, fontFamily: "Courier New" }}>{val.name}</div>
              <div style={{ fontSize: 10, color: rc, fontWeight: 700 }}>{val.rating}</div>
            </button>
          );
        })}
      </div>
      {sel && (
        <div style={{ padding: 10, borderRadius: 10, background: `${C.navy3}cc`, border: `1px solid ${C.sand}44`, fontSize: 12, color: "#e0e8ff", lineHeight: 1.6, fontFamily: "Courier New" }}>
          <div style={{ color: C.gold2, fontWeight: 700, marginBottom: 4 }}>{sel.name} — {sel.rating}</div>
          {sel.desc}
        </div>
      )}
    </div>
  );
}

// ── CONTENT TAB ───────────────────────────────────────────────
function ContentTab({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const section = (title: string, children: React.ReactNode, color = C.anchor) => (
    <div style={{ marginBottom: 18, borderRadius: 14, overflow: "hidden", border: `1px solid ${color}33` }}>
      <div style={{ background: `${color}18`, padding: "10px 14px", borderBottom: `1px solid ${color}22` }}>
        <span style={{ fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, color }}>{title}</span>
      </div>
      <div style={{ padding: 12 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ padding: "14px 14px 24px" }}>
      <div style={{ fontSize: 13, color: "rgba(240,244,255,0.65)", lineHeight: 1.7, marginBottom: 18, fontFamily: "Courier New" }}>
        {t.intro}
      </div>
      {section(t.s1title, <AnchorAnatomySVG lang={lang} />, C.anchor)}
      {section(t.s2title, <AnchorTypesSVG lang={lang} />, C.gold)}
      {section(t.s3title, <ScopeCalculatorSVG lang={lang} />, C.chain)}
      {section(t.s4title, <SeabedQualitySVG lang={lang} />, C.sand)}

      {/* Key Points */}
      <div style={{ borderRadius: 14, background: `${C.navy2}cc`, border: `1px solid ${C.gold}44`, padding: 14 }}>
        <div style={{ fontFamily: "'Cinzel',serif", fontSize: 12, color: C.gold, letterSpacing: 1, marginBottom: 10 }}>✦ {t.keypoints}</div>
        {t.kp.map((k: string, i: number) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 12, color: "rgba(240,244,255,0.75)", fontFamily: "Courier New", lineHeight: 1.5 }}>
            <span style={{ color: C.gold, flexShrink: 0 }}>✦</span>
            <span>{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PRACTICE TAB ──────────────────────────────────────────────
function PracticeTab({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [shown, setShown] = useState<boolean[]>([false, false, false]);
  const toggle = (i: number) => setShown(prev => prev.map((v, j) => j === i ? !v : v));

  return (
    <div style={{ padding: "14px 14px 24px" }}>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, color: C.gold, marginBottom: 14 }}>✏️ {t.practiceTitle}</div>
      {t.questions.map((q: any, i: number) => (
        <div key={i} style={{ marginBottom: 14, borderRadius: 14, background: `${C.navy2}cc`, border: `1px solid ${C.anchor}33`, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 10, color: C.anchor, letterSpacing: 1, marginBottom: 6, fontFamily: "'Cinzel',serif" }}>Q{i + 1}</div>
            <div style={{ fontSize: 13, color: "#e0e8ff", lineHeight: 1.6, fontFamily: "Courier New" }}>{q.q}</div>
          </div>
          <div style={{ padding: "0 14px 12px" }}>
            <button onClick={() => toggle(i)} style={{
              padding: "7px 14px", borderRadius: 8, fontSize: 11, cursor: "pointer",
              background: shown[i] ? `${C.anchor}22` : "rgba(255,255,255,0.06)",
              border: `1px solid ${shown[i] ? C.anchor : "rgba(255,255,255,0.15)"}`,
              color: shown[i] ? C.anchor : "rgba(240,244,255,0.5)",
              fontFamily: "Courier New",
            }}>{shown[i] ? t.hideAnswer : t.showAnswer}</button>
            {shown[i] && (
              <div style={{ marginTop: 10, padding: 12, borderRadius: 10, background: `${C.navy3}cc`, borderLeft: `3px solid ${C.anchor}`, fontSize: 12, color: "rgba(240,244,255,0.8)", lineHeight: 1.7, fontFamily: "Courier New" }}>
                {q.a}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonSEA_L3 — PART 2: Question Bank + Quiz + Main Component

function getBank(lang: string) {
  const banks: any = {
    fr: [
      { q: "Quelle est la différence entre une ancre avec jas et une ancre sans jas ?", a: "L'ancre avec jas possède une barre transversale (le jas) qui force les pattes à s'orienter perpendiculairement au fond pour pénétrer. L'ancre sans jas (type Hall) n'a pas ce jas — ses pattes sont articulées et s'orientent automatiquement. L'ancre sans jas est plus facile à stocker en écubier." },
      { q: "Qu'est-ce que l'écubier (hawse pipe) et quel est son rôle ?", a: "L'écubier est un tube en acier traversant l'étrave du navire, par lequel passe la chaîne d'ancre. Il guide la chaîne entre le pont et l'eau et permet de stocker l'ancre à fleur de coque lorsqu'elle est virée à bord." },
      { q: "Définissez la portée (scope) et expliquez pourquoi elle est critique pour la tenue au mouillage.", a: "La portée est la longueur totale de chaîne filée par rapport à la profondeur d'eau. Elle est critique car une portée insuffisante entraîne une traction quasi-verticale sur l'ancre, réduisant la tenue. Une portée suffisante permet à la chaîne de travailler horizontalement, augmentant considérablement la résistance à l'arrachement." },
      { q: "Qu'est-ce que le guideau (windlass) et comment fonctionne-t-il ?", a: "Le guideau est un treuil mécanique ou électro-hydraulique installé sur le pont avant. Il sert à virer (rentrer) et filer (larguer) la chaîne d'ancre. Il est équipé d'une barbotin (noria) dont les alvéoles s'engagent dans les maillons de la chaîne pour l'entraîner." },
      { q: "Quelle est la fonction de la ligne d'orin (trip line) ?", a: "La ligne d'orin est frappée à la couronne de l'ancre. En cas de coincement sur le fond (roche, câble, épave), on tire sur cette ligne pour extraire l'ancre par la couronne, dans le sens inverse de sa pénétration. Sans orin, une ancre coincée doit souvent être abandonnée." },
      { q: "Comment évalue-t-on la qualité d'un fond de mouillage sur une carte marine ?", a: "Les cartes marines utilisent des abréviations standardisées : S (sable / sand), M (vase / mud), R (roche / rock), G (gravier / gravel), Sh (coquilles / shells), Wd (algues / weed), Co (corail / coral). Un fond de sable ou de vase est considéré comme bon. Roche et algues sont à éviter." },
      { q: "Qu'est-ce que le bout-de-chaîne (bitter end) et pourquoi doit-il être sécurisé ?", a: "Le bout-de-chaîne est l'extrémité inférieure de la chaîne, fixée à l'intérieur du puits à chaîne (chaîne locker). Il doit toujours être frappé solidement à bord. Sans cette fixation, si toute la chaîne est filée par erreur, elle partirait par le fond avec l'ancre, entraînant une perte totale de l'équipement de mouillage." },
      { q: "Décrivez la procédure générale de mouillage d'un navire.", a: "1. Choisir le mouillage (carte, fond, abri, espace de chasse). 2. Approcher contre le vent ou le courant, vitesse réduite. 3. Stopper le navire sur la position choisie. 4. Filer l'ancre lentement (ne pas la laisser tomber en chute libre). 5. Reculer doucement pour dérouler la chaîne. 6. Filer la portée calculée. 7. Brider et vérifier la tenue (relèvements fixes)." },
      { q: "Qu'est-ce que 'chasser sur son ancre' (dragging anchor) et comment le détecte-t-on ?", a: "Chasser signifie que l'ancre perd sa tenue et dérape sur le fond. Détection : les relèvements (bearing) sur des points fixes changent progressivement — le navire dérive. Méthodes : observations visuelles régulières, GPS/AIS avec alarme de mouillage, sensation de vibration de la chaîne (signe d'ancre qui racle). Réaction : filer plus de chaîne, ou appareiller et remouiller." },
      { q: "Quelle est la différence entre une chaîne de mouillage et un câblot (anchor rope) ?", a: "La chaîne est en acier, lourde, résistante à l'abrasion sur le fond et à la corrosion. Elle amortit les chocs par son propre poids (effet caténaire). Le câblot (en nylon ou polyester) est plus léger et élastique — il absorbe les chocs par son élasticité. La chaîne est préférée sur les navires professionnels ; les plaisanciers combinent souvent chaîne courte + câblot long." },
      { q: "Comment choisit-on la position de mouillage ?", a: "Critères : abri du vent et de la houle prévisibles, profondeur compatible avec le tirant d'eau et la portée disponible, fond de bonne tenue, espace de chasse suffisant (rayon = portée + longueur du navire), absence d'obstacles sous-marins (câbles, conduites), réglementation locale (zones de mouillage autorisées), possibilité d'appareiller rapidement en cas d'urgence." },
      { q: "Qu'est-ce que la 'chasse de mouillage' et comment la calcule-t-on ?", a: "La chasse est le cercle de dérive maximal que le navire peut décrire autour du point de chute de l'ancre. Elle se calcule par : rayon de chasse = longueur de chaîne filée + longueur du navire. Ce rayon doit être totalement libre de tout obstacle (autres navires, hauts-fonds, rochers) dans toutes les directions pour permettre la rotation au vent ou au courant." },
      { q: "Quelle est la signification du code de signaux international 'Ball-Ball-Ball' (3 boules noires) ?", a: "Trois boules noires verticales signifient 'navire au mouillage' et sont affichées de jour (à la lumière blanche fixe la nuit). Elles sont requises pour tous les navires mouillés selon le COLREG règle 30. Cette marque de jour est hissée à l'avant du navire, bien visible de tous côtés." },
      { q: "Quels facteurs naturels peuvent faire chasser une ancre ?", a: "Raffale ou changement de direction du vent (le navire tire différemment sur la chaîne). Renversement de courant (même cause). Houle longue qui imprime des à-coups violents. Fond de mauvaise qualité (roche lisse, algues). Portée insuffisante. Ancre trop petite pour le desplacement du navire. Fond en pente (l'ancre tend à glisser vers le bas)." },
      { q: "Définissez le mouillage forain et le mouillage en rade.", a: "Mouillage forain : mouillage en mer ouverte, exposé, sans abri naturel — généralement temporaire et par beau temps uniquement. Mouillage en rade : mouillage dans une rade (baie ou zone délimitée), offrant un abri partiel ou total des vents et de la houle. La rade peut être naturelle (baie) ou artificielle (brise-lames, digues)." },
    ],
    en: [
      { q: "What is the difference between a stocked anchor and a stockless anchor?", a: "A stocked anchor has a crossbar (the stock) that forces the flukes to orient perpendicular to the seabed for penetration. A stockless anchor (e.g. Hall) has no stock — its flukes are articulated and self-orient. Stockless anchors are easier to stow in the hawse." },
      { q: "What is the hawse pipe and what is its role?", a: "The hawse pipe is a steel tube through the vessel's bow through which the anchor chain passes. It guides the chain between the deck and the water and allows the anchor to be stowed flush with the hull when hove in." },
      { q: "Define scope and explain why it is critical for holding at anchor.", a: "Scope is the total length of chain paid out relative to the water depth. Insufficient scope causes near-vertical pull on the anchor, reducing hold. Adequate scope lets the chain work horizontally, greatly increasing pull-out resistance." },
      { q: "What is the windlass and how does it work?", a: "The windlass is a mechanical or electro-hydraulic winch fitted on the foredeck. It is used to heave (take in) and veer (pay out) the anchor chain. It has a wildcat (gypsy) whose pockets engage the chain links to drive them." },
      { q: "What is the function of the trip line?", a: "The trip line is attached to the anchor crown. If the anchor fouls on the seabed (rock, cable, wreck), pulling the trip line extracts the anchor via the crown — opposite to its holding direction. Without a trip line, a fouled anchor often has to be abandoned." },
      { q: "How do you assess seabed quality from a nautical chart?", a: "Charts use standardised abbreviations: S (sand), M (mud), R (rock), G (gravel), Sh (shells), Wd (weed), Co (coral). Sand and mud are good holding grounds. Rock and weed should be avoided." },
      { q: "What is the bitter end and why must it be secured?", a: "The bitter end is the inboard end of the anchor chain, secured inside the chain locker. It must always be properly attached. Without this, if all chain is accidentally veered, it would run out through the hawse, losing both anchor and chain." },
      { q: "Describe the general anchoring procedure.", a: "1. Choose anchorage (chart, ground, shelter, swinging room). 2. Approach into wind or current, reduced speed. 3. Stop vessel at chosen position. 4. Veer anchor slowly (avoid free-fall). 5. Go astern gently to lay out chain. 6. Veer calculated scope. 7. Secure and check holding (fix bearings)." },
      { q: "What is a dragging anchor and how is it detected?", a: "Dragging means the anchor loses hold and slides along the seabed. Detection: fixed bearings change progressively — vessel is drifting. Methods: regular visual observations, GPS/AIS anchor alarm, chain vibration (sign of scraping). Response: veer more chain, or weigh anchor and re-anchor." },
      { q: "What is the difference between an anchor chain and an anchor rope?", a: "Chain is steel, heavy, abrasion-resistant on seabed and corrosion-resistant. It absorbs shocks through catenary effect. Rope (nylon or polyester) is lighter and elastic — it absorbs shocks through stretch. Chain is preferred on commercial vessels; leisure sailors often combine short chain + long rope." },
      { q: "How do you choose an anchoring position?", a: "Criteria: shelter from forecast wind and swell, depth compatible with draught and available scope, good holding ground, adequate swinging room (radius = scope + vessel length), no underwater obstacles (cables, pipes), local regulations, ability to depart quickly in emergency." },
      { q: "What is swinging room and how is it calculated?", a: "Swinging room is the maximum circle the vessel may describe around the anchor drop point. It is calculated as: swinging radius = chain length veered + vessel length. This radius must be completely clear of obstacles (other vessels, shoals, rocks) in all directions." },
      { q: "What is the meaning of the signal 'three black balls' displayed by day?", a: "Three black balls in a vertical line mean 'vessel at anchor' and are displayed by day (white all-round light at night). Required for all anchored vessels under COLREG Rule 30. Hoisted forward, visible from all directions." },
      { q: "What natural factors can cause an anchor to drag?", a: "Wind squall or wind direction change (different pull on chain). Current reversal (same reason). Long swell causing violent snatching. Poor seabed (smooth rock, weed). Insufficient scope. Anchor undersized for vessel displacement. Sloping seabed (anchor tends to slide downhill)." },
      { q: "Define open anchorage and roadstead.", a: "Open anchorage: anchoring in open sea, exposed, without natural shelter — generally temporary and in fair weather only. Roadstead: anchoring in a road (sheltered bay or defined area) offering partial or full protection from wind and swell. May be natural (bay) or artificial (breakwater)." },
    ],
    es: [
      { q: "¿Cuál es la diferencia entre un ancla con cepo y un ancla sin cepo?", a: "El ancla con cepo tiene una barra transversal (el cepo) que obliga a las uñas a orientarse perpendicular al fondo para penetrar. El ancla sin cepo (tipo Hall) no tiene cepo — sus uñas son articuladas y se orientan automáticamente. El ancla sin cepo es más fácil de estibar en el escobén." },
      { q: "¿Qué es el escobén y cuál es su función?", a: "El escobén es un tubo de acero que atraviesa la proa del buque por donde pasa la cadena del ancla. Guía la cadena entre la cubierta y el agua y permite estibar el ancla a ras del casco cuando está guinada." },
      { q: "Defina el alcance y explique por qué es crítico para el agarre en fondeo.", a: "El alcance es la longitud total de cadena filada con respecto a la profundidad del agua. Un alcance insuficiente provoca una tracción casi vertical sobre el ancla, reduciendo el agarre. Un alcance suficiente permite que la cadena trabaje horizontalmente, aumentando considerablemente la resistencia al arranque." },
      { q: "¿Qué es el molinete y cómo funciona?", a: "El molinete es un cabrestante mecánico o electrohidráulico instalado en la cubierta de proa. Sirve para virar (recoger) y filar (largar) la cadena del ancla. Dispone de una rueda de cadena cuyos alvéolos enganchan los eslabones para arrastrarla." },
      { q: "¿Cuál es la función del orinque?", a: "El orinque está fijado a la corona del ancla. Si el ancla queda enganchada en el fondo (roca, cable, pecio), tirar del orinque extrae el ancla por la corona, en sentido inverso a su penetración. Sin orinque, un ancla enganchada suele tener que ser abandonada." },
      { q: "¿Cómo se evalúa la calidad del fondo en una carta náutica?", a: "Las cartas usan abreviaturas estandarizadas: S (arena), M (fango), R (roca), G (grava), Sh (conchas), Wd (algas), Co (coral). La arena y el fango son buenos tenederos. La roca y las algas deben evitarse." },
      { q: "¿Qué es el firme y por qué debe estar asegurado?", a: "El firme es el extremo interior de la cadena del ancla, fijado dentro del pañol de cadena. Debe estar siempre asegurado. Sin esta fijación, si se fila toda la cadena por error, se perdería por el escobén junto con el ancla." },
      { q: "Describa el procedimiento general de fondeo.", a: "1. Elegir el fondeadero (carta, fondo, abrigo, zona de giro). 2. Aproximarse contra el viento o la corriente a velocidad reducida. 3. Detener el buque en la posición elegida. 4. Filar el ancla lentamente. 5. Ciar suavemente para extender la cadena. 6. Filar el alcance calculado. 7. Trincar y verificar el agarre (marcaciones fijas)." },
      { q: "¿Qué es garrar y cómo se detecta?", a: "Garrar significa que el ancla pierde agarre y resbala por el fondo. Detección: las marcaciones sobre puntos fijos cambian — el buque deriva. Métodos: observaciones visuales, alarma de fondeo GPS/AIS, vibración de la cadena. Respuesta: filar más cadena o levar y fondear de nuevo." },
      { q: "¿Qué diferencia hay entre una cadena de fondeo y un cabo de ancla?", a: "La cadena es de acero, pesada, resistente a la abrasión y la corrosión. Amortigua los golpes por su efecto catenario. El cabo (nylon o poliéster) es más ligero y elástico. La cadena es preferida en buques profesionales; los veleros suelen combinar cadena corta más cabo largo." },
      { q: "¿Cómo se elige la posición de fondeo?", a: "Criterios: abrigo del viento y mar previsto, profundidad compatible con el calado y el alcance disponible, buen tenedero, zona de giro suficiente (radio = alcance + eslora), ausencia de obstáculos submarinos, reglamentación local, posibilidad de zarpar rápidamente en emergencia." },
      { q: "¿Qué es la zona de giro y cómo se calcula?", a: "La zona de giro es el círculo máximo que el buque puede describir alrededor del punto de fondeo. Se calcula como: radio de giro = longitud de cadena filada + eslora del buque. Este radio debe estar completamente libre de obstáculos en todas las direcciones." },
      { q: "¿Qué significa la señal de tres bolas negras?", a: "Tres bolas negras en vertical significan 'buque fondeado' y se exhiben de día (luz blanca de todo horizonte de noche). Requeridas para todos los buques fondeados según el COLREG Regla 30. Se iza a proa, visible desde todas las direcciones." },
      { q: "¿Qué factores naturales pueden hacer garrar un ancla?", a: "Racha de viento o cambio de dirección (diferente tracción sobre la cadena). Inversión de corriente. Mar de fondo largo que provoca tirones violentos. Mal tenedero (roca lisa, algas). Alcance insuficiente. Ancla demasiado pequeña para el desplazamiento. Fondo en pendiente." },
      { q: "Defina fondeo al descubierto y fondeadero.", a: "Fondeo al descubierto: fondeo en mar abierto, expuesto, sin abrigo natural — generalmente temporal y con buen tiempo. Fondeadero: fondeo en una rada (bahía o zona delimitada) que ofrece protección parcial o total del viento y el mar. Puede ser natural o artificial." },
    ],
    pt: [
      { q: "Qual é a diferença entre uma âncora com cepo e uma âncora sem cepo?", a: "A âncora com cepo tem uma barra transversal (o cepo) que obriga as garras a se orientarem perpendicularmente ao fundo para penetrar. A âncora sem cepo (tipo Hall) não tem cepo — suas garras são articuladas e se orientam automaticamente. A âncora sem cepo é mais fácil de recolher na escovém." },
      { q: "O que é a escovém e qual é o seu papel?", a: "A escovém é um tubo de aço que atravessa a proa do navio pelo qual passa a corrente da âncora. Guia a corrente entre o convés e a água e permite estivar a âncora rente ao casco quando virada a bordo." },
      { q: "Defina alcance e explique por que é crítico para a fixação no fundeio.", a: "O alcance é o comprimento total de corrente arriada em relação à profundidade da água. Alcance insuficiente causa tração quase vertical sobre a âncora, reduzindo a fixação. Alcance adequado permite que a corrente trabalhe horizontalmente, aumentando a resistência ao arranque." },
      { q: "O que é o molinete e como funciona?", a: "O molinete é um guincho mecânico ou eletro-hidráulico instalado no convés de proa. Serve para virar (recolher) e arriar (largar) a corrente da âncora. Tem uma roda de corrente cujos alvéolos engatam nos elos para arrastá-la." },
      { q: "Qual é a função do orinque?", a: "O orinque é um cabo fino preso à coroa da âncora. Se a âncora ficar presa no fundo (rocha, cabo, destroço), puxar o orinque extrai a âncora pela coroa, no sentido inverso à sua penetração. Sem orinque, uma âncora presa muitas vezes tem de ser abandonada." },
      { q: "Como se avalia a qualidade do fundo numa carta náutica?", a: "As cartas usam abreviaturas padronizadas: S (areia), M (lodo), R (rocha), G (cascalho), Sh (conchas), Wd (algas), Co (coral). Areia e lodo são bons fundeadouros. Rocha e algas devem ser evitadas." },
      { q: "O que é a retenida e por que deve estar segura?", a: "A retenida é a extremidade interior da corrente da âncora, presa dentro do paiol de corrente. Deve estar sempre bem fixada. Sem esta fixação, se toda a corrente for arriada por engano, sairia pela escovém juntamente com a âncora." },
      { q: "Descreva o procedimento geral de fundeio.", a: "1. Escolher o fundeadouro (carta, fundo, abrigo, espaço de giro). 2. Aproximar contra o vento ou corrente a velocidade reduzida. 3. Parar o navio na posição escolhida. 4. Arriar a âncora lentamente. 5. Ciar suavemente para estender a corrente. 6. Arriar o alcance calculado. 7. Travar e verificar a fixação (marcações fixas)." },
      { q: "O que é arrastar a âncora e como se deteta?", a: "Arrastar significa que a âncora perde fixação e desliza pelo fundo. Deteção: as marcações sobre pontos fixos mudam — o navio deriva. Métodos: observações visuais, alarme de fundeio GPS/AIS, vibração da corrente. Resposta: arriar mais corrente ou levar e refundear." },
      { q: "Qual a diferença entre corrente de âncora e cabo de âncora?", a: "A corrente é de aço, pesada, resistente à abrasão e corrosão. Absorve choques pelo efeito catenário. O cabo (nylon ou poliéster) é mais leve e elástico. A corrente é preferida em navios profissionais; os veleiristas combinam frequentemente corrente curta mais cabo longo." },
      { q: "Como se escolhe a posição de fundeio?", a: "Critérios: abrigo do vento e mar previstos, profundidade compatível com o calado e alcance disponível, bom fundeadouro, espaço de giro suficiente (raio = alcance + comprimento do navio), ausência de obstáculos submarinos, regulamentação local, possibilidade de zarpar rapidamente em emergência." },
      { q: "O que é o espaço de giro e como se calcula?", a: "O espaço de giro é o círculo máximo que o navio pode descrever em torno do ponto de fundeio. Calcula-se como: raio de giro = comprimento de corrente arriada + comprimento do navio. Este raio deve estar completamente livre de obstáculos em todas as direções." },
      { q: "Qual o significado do sinal de três bolas negras?", a: "Três bolas negras na vertical significam 'navio fundeado' e são exibidas de dia (luz branca de todo o horizonte de noite). Exigidas para todos os navios fundeados pelo COLREG Regra 30. Hasteadas a vante, visíveis de todas as direções." },
      { q: "Que fatores naturais podem fazer arrastar uma âncora?", a: "Rajada de vento ou mudança de direção (tração diferente sobre a corrente). Inversão de corrente. Mar largo que provoca puxões violentos. Mau fundeadouro (rocha lisa, algas). Alcance insuficiente. Âncora pequena demais para o deslocamento. Fundo em declive." },
      { q: "Defina fundeio ao largo e fundeadouro.", a: "Fundeio ao largo: fundeio em mar aberto, exposto, sem abrigo natural — geralmente temporário e com bom tempo. Fundeadouro: fundeio numa enseada ou área delimitada que oferece proteção parcial ou total do vento e do mar. Pode ser natural ou artificial." },
    ],
  };
  return banks[lang] || banks.fr;
}

function getQuiz(lang: string) {
  const quizzes: any = {
    fr: [
      {
        q: "Un navire mouille par 15 mètres de fond par beau temps. Quelle est la portée minimale de chaîne à filer ?",
        opts: ["15 m", "30 m", "45 m", "75 m"],
        correct: 2,
        exp: "La portée minimale est de 3× la profondeur. 3 × 15 = 45 m. Par mauvais temps, on filerait 5× (75 m) ou 7× (105 m).",
      },
      {
        q: "Quel type de fond offre la meilleure tenue pour un mouillage ?",
        opts: ["Roche", "Algues denses", "Sable", "Corail"],
        correct: 2,
        exp: "Le sable est le meilleur fond de mouillage : l'ancre y pénètre facilement et développe une forte tenue. La roche empêche la pénétration et le corail/algues offrent une tenue aléatoire.",
      },
      {
        q: "Quelle est la fonction principale de la ligne d'orin ?",
        opts: ["Mesurer la profondeur", "Récupérer une ancre coincée", "Attacher le navire à un corps mort", "Amarrer au quai"],
        correct: 1,
        exp: "La ligne d'orin est frappée à la couronne de l'ancre. Elle permet de tirer l'ancre dans le sens inverse de sa tenue pour la dégager en cas de coincement sur le fond.",
      },
      {
        q: "Quelle partie de l'ancre est reliée directement à la chaîne de mouillage ?",
        opts: ["La couronne", "La patte", "La verge", "L'organeau"],
        correct: 3,
        exp: "L'organeau (ring) est l'anneau en tête de l'ancre auquel est directement frappée la chaîne ou le câblot de mouillage.",
      },
      {
        q: "Comment s'appelle l'ancre sans jas à pattes articulées, standard sur la majorité des navires modernes ?",
        opts: ["Ancre Amirauté", "Ancre CQR", "Ancre Hall", "Ancre Danforth"],
        correct: 2,
        exp: "L'ancre Hall est l'ancre sans jas à pattes articulées la plus répandue sur les navires de commerce et militaires modernes. Elle se range facilement en écubier.",
      },
    ],
    en: [
      {
        q: "A vessel anchors in 15 metres depth in fair weather. What is the minimum scope to veer?",
        opts: ["15 m", "30 m", "45 m", "75 m"],
        correct: 2,
        exp: "Minimum scope is 3× depth. 3 × 15 = 45 m. In bad weather, 5× (75 m) or 7× (105 m) would be used.",
      },
      {
        q: "Which seabed type offers the best holding ground?",
        opts: ["Rock", "Dense weed", "Sand", "Coral"],
        correct: 2,
        exp: "Sand is the best anchoring ground: the anchor penetrates easily and develops strong holding. Rock prevents penetration; coral and weed give unreliable hold.",
      },
      {
        q: "What is the main function of the trip line?",
        opts: ["Measure water depth", "Recover a fouled anchor", "Attach vessel to a mooring", "Moor at a quay"],
        correct: 1,
        exp: "The trip line is attached to the anchor crown. It allows the anchor to be pulled in reverse — opposite to its holding direction — to free it when fouled.",
      },
      {
        q: "Which part of the anchor is directly connected to the anchor chain?",
        opts: ["Crown", "Fluke", "Shank", "Ring"],
        correct: 3,
        exp: "The ring is the head loop of the anchor to which the chain or rope is directly attached.",
      },
      {
        q: "What is the name of the stockless articulated-fluke anchor standard on most modern vessels?",
        opts: ["Admiralty anchor", "CQR anchor", "Hall anchor", "Danforth anchor"],
        correct: 2,
        exp: "The Hall anchor is the most common stockless anchor with articulated flukes on modern commercial and naval vessels. It stows easily in the hawse.",
      },
    ],
    es: [
      {
        q: "Un buque fondea con 15 metros de fondo con buen tiempo. ¿Cuál es el alcance mínimo a filar?",
        opts: ["15 m", "30 m", "45 m", "75 m"],
        correct: 2,
        exp: "El alcance mínimo es 3× la profundidad. 3 × 15 = 45 m. Con mal tiempo se usaría 5× (75 m) o 7× (105 m).",
      },
      {
        q: "¿Qué tipo de fondo ofrece el mejor tenedero?",
        opts: ["Roca", "Algas densas", "Arena", "Coral"],
        correct: 2,
        exp: "La arena es el mejor tenedero: el ancla penetra fácilmente y desarrolla un fuerte agarre. La roca impide la penetración; el coral y las algas dan un agarre muy aleatorio.",
      },
      {
        q: "¿Cuál es la función principal del orinque?",
        opts: ["Medir la profundidad", "Recuperar un ancla enganchada", "Amarrar a una muerto", "Atracar al muelle"],
        correct: 1,
        exp: "El orinque está fijado a la corona del ancla. Permite tirar del ancla en sentido inverso al de su agarre para desprenderla cuando está enganchada.",
      },
      {
        q: "¿Qué parte del ancla está directamente conectada a la cadena?",
        opts: ["Corona", "Uña", "Caño", "Arganeo"],
        correct: 3,
        exp: "El arganeo es la argolla en la cabeza del ancla a la que se grilletea directamente la cadena o el cabo.",
      },
      {
        q: "¿Cómo se llama el ancla sin cepo con uñas articuladas estándar en la mayoría de los buques modernos?",
        opts: ["Ancla Almirantazgo", "Ancla CQR", "Ancla Hall", "Ancla Danforth"],
        correct: 2,
        exp: "El ancla Hall es el ancla sin cepo con uñas articuladas más extendida en los buques de comercio y militares modernos. Se estibar fácilmente en el escobén.",
      },
    ],
    pt: [
      {
        q: "Um navio fundeia com 15 metros de fundo com bom tempo. Qual é o alcance mínimo a arriar?",
        opts: ["15 m", "30 m", "45 m", "75 m"],
        correct: 2,
        exp: "O alcance mínimo é 3× a profundidade. 3 × 15 = 45 m. Com mau tempo usaria-se 5× (75 m) ou 7× (105 m).",
      },
      {
        q: "Que tipo de fundo oferece o melhor fundeadouro?",
        opts: ["Rocha", "Algas densas", "Areia", "Coral"],
        correct: 2,
        exp: "A areia é o melhor fundeadouro: a âncora penetra facilmente e desenvolve forte fixação. A rocha impede a penetração; coral e algas dão fixação muito aleatória.",
      },
      {
        q: "Qual é a função principal do orinque?",
        opts: ["Medir a profundidade", "Recuperar uma âncora presa", "Prender o navio a uma amarração", "Atracar no cais"],
        correct: 1,
        exp: "O orinque está preso à coroa da âncora. Permite puxar a âncora no sentido inverso à sua fixação para a soltar quando presa.",
      },
      {
        q: "Que parte da âncora está diretamente ligada à corrente?",
        opts: ["Coroa", "Garra", "Haste", "Arganéu"],
        correct: 3,
        exp: "O arganéu é a argola na cabeça da âncora à qual a corrente ou cabo é diretamente fixado.",
      },
      {
        q: "Como se chama a âncora sem cepo com garras articuladas padrão na maioria dos navios modernos?",
        opts: ["Âncora do Almirantado", "Âncora CQR", "Âncora Hall", "Âncora Danforth"],
        correct: 2,
        exp: "A âncora Hall é a âncora sem cepo com garras articuladas mais comum em navios comerciais e militares modernos. Recolhe-se facilmente na escovém.",
      },
    ],
  };
  return quizzes[lang] || quizzes.fr;
}

// ── QUESTION BANK TAB ─────────────────────────────────────────
function BankTab({ lang }: { lang: string }) {
  const bank = getBank(lang);
  const [open, setOpen] = useState<number | null>(null);
  const [showAns, setShowAns] = useState<Record<number, boolean>>({});
  const labels: any = {
    fr: { title: "Banque de questions", show: "Voir la réponse", hide: "Masquer" },
    en: { title: "Question Bank", show: "Show answer", hide: "Hide" },
    es: { title: "Banco de preguntas", show: "Ver respuesta", hide: "Ocultar" },
    pt: { title: "Banco de questões", show: "Ver resposta", hide: "Ocultar" },
  };
  const L = labels[lang] || labels.fr;

  return (
    <div style={{ padding: "14px 14px 24px" }}>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, color: C.gold, marginBottom: 14 }}>📚 {L.title}</div>
      {bank.map((item: any, i: number) => (
        <div key={i} style={{ marginBottom: 8, borderRadius: 12, background: `${C.navy2}cc`, border: `1px solid ${C.anchor}22`, overflow: "hidden" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{
            width: "100%", padding: "12px 14px", background: "none", border: "none",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            cursor: "pointer", textAlign: "left", gap: 10,
          }}>
            <span style={{ fontSize: 12, color: "rgba(240,244,255,0.8)", fontFamily: "Courier New", lineHeight: 1.5 }}>
              <span style={{ color: C.anchor, fontWeight: 700, marginRight: 6 }}>Q{i + 1}.</span>{item.q}
            </span>
            <span style={{ color: C.anchor, fontSize: 14, flexShrink: 0 }}>{open === i ? "▲" : "▼"}</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 14px 12px" }}>
              <button onClick={() => setShowAns(p => ({ ...p, [i]: !p[i] }))} style={{
                padding: "6px 12px", borderRadius: 8, fontSize: 10, cursor: "pointer",
                background: showAns[i] ? `${C.anchor}22` : "rgba(255,255,255,0.05)",
                border: `1px solid ${showAns[i] ? C.anchor : "rgba(255,255,255,0.12)"}`,
                color: showAns[i] ? C.anchor : "rgba(240,244,255,0.45)",
                fontFamily: "Courier New",
              }}>{showAns[i] ? L.hide : L.show}</button>
              {showAns[i] && (
                <div style={{ marginTop: 8, padding: 10, borderRadius: 8, background: `${C.navy3}cc`, borderLeft: `3px solid ${C.anchor}`, fontSize: 12, color: "rgba(240,244,255,0.8)", lineHeight: 1.7, fontFamily: "Courier New" }}>
                  {item.a}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── QUIZ TAB ──────────────────────────────────────────────────
function QuizTab({ lang, onComplete }: { lang: string; onComplete: (xp: number) => void }) {
  const quiz = getQuiz(lang);
  const [cur, setCur] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const labels: any = {
    fr: { submit: "Valider", next: "Suivant →", finish: "Terminer", correct: "✅ Correct !", wrong: "❌ Incorrect", score: "Score", xpLabel: "XP obtenus", summary: "Tu as appris", retry: "Recommencer" },
    en: { submit: "Submit", next: "Next →", finish: "Finish", correct: "✅ Correct!", wrong: "❌ Incorrect", score: "Score", xpLabel: "XP earned", summary: "You learned", retry: "Retry" },
    es: { submit: "Validar", next: "Siguiente →", finish: "Terminar", correct: "✅ ¡Correcto!", wrong: "❌ Incorrecto", score: "Puntuación", xpLabel: "XP obtenidos", summary: "Aprendiste", retry: "Reintentar" },
    pt: { submit: "Validar", next: "Seguinte →", finish: "Terminar", correct: "✅ Correto!", wrong: "❌ Incorreto", score: "Pontuação", xpLabel: "XP obtidos", summary: "Você aprendeu", retry: "Recomeçar" },
  };
  const L = labels[lang] || labels.fr;
  const t = T[lang] || T.fr;

  const xpMap: Record<number, number> = { 5: 200, 4: 180, 3: 120 };
  const xp = xpMap[score] || 60;

  if (done) {
    return (
      <div style={{ padding: "24px 14px" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 36, fontWeight: 900, color: C.gold2, marginBottom: 4 }}>{xp}</div>
          <div style={{ fontSize: 12, color: "rgba(240,244,255,0.5)", fontFamily: "Courier New" }}>{L.xpLabel}</div>
          <div style={{ marginTop: 8, fontSize: 14, color: "#f0f4ff", fontFamily: "Courier New" }}>{L.score} : {score} / {quiz.length}</div>
        </div>
        <div style={{ borderRadius: 14, background: `${C.navy2}cc`, border: `1px solid ${C.gold}44`, padding: 14, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: C.gold, marginBottom: 10 }}>✦ {L.summary}</div>
          {t.kp.map((k: string, i: number) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 11, color: "rgba(240,244,255,0.7)", fontFamily: "Courier New", lineHeight: 1.5 }}>
              <span style={{ color: C.gold, flexShrink: 0 }}>✦</span><span>{k}</span>
            </div>
          ))}
        </div>
        <button onClick={() => onComplete(xp)} style={{
          width: "100%", padding: "15px 0", border: "none", borderRadius: 14,
          background: "linear-gradient(135deg,#c9922a,#e8b94f)",
          fontFamily: "'Cinzel',serif", fontSize: 14, fontWeight: 700,
          letterSpacing: 2, color: "#060e1a", cursor: "pointer",
        }}>⚓ {L.finish}</button>
        <button onClick={() => { setCur(0); setSelected(null); setConfirmed(false); setScore(0); setDone(false); setAnswers([]); }} style={{
          width: "100%", padding: "12px 0", marginTop: 8, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14,
          background: "none", color: "rgba(240,244,255,0.45)", fontSize: 12, cursor: "pointer", fontFamily: "Courier New",
        }}>{L.retry}</button>
      </div>
    );
  }

  const q = quiz[cur];
  const isCorrect = selected === q.correct;

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    if (isCorrect) setScore(s => s + 1);
    setAnswers(p => [...p, isCorrect]);
  };

  const handleNext = () => {
    if (cur + 1 >= quiz.length) { setDone(true); return; }
    setCur(c => c + 1); setSelected(null); setConfirmed(false);
  };

  const optColors = ["#7eb8d4", "#c8a96e", "#6dbf8a", "#9b59b6"];

  return (
    <div style={{ padding: "14px 14px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "rgba(240,244,255,0.4)", fontFamily: "Courier New" }}>Q{cur + 1}/{quiz.length}</div>
        <div style={{ fontSize: 11, color: C.gold2, fontFamily: "Courier New" }}>⭐ {score}/{quiz.length}</div>
      </div>
      <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.08)", marginBottom: 14 }}>
        <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg,${C.anchor},${C.gold})`, width: `${((cur) / quiz.length) * 100}%`, transition: "width 0.4s" }} />
      </div>
      <div style={{ fontSize: 13, color: "#e0e8ff", lineHeight: 1.6, fontFamily: "Courier New", marginBottom: 16, padding: 12, borderRadius: 10, background: `${C.navy2}cc`, border: `1px solid ${C.anchor}22` }}>
        {q.q}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {q.opts.map((opt: string, i: number) => {
          let border = `1px solid ${optColors[i]}44`;
          let bg = `${optColors[i]}11`;
          if (confirmed) {
            if (i === q.correct) { border = `2px solid #4ade80`; bg = "rgba(74,222,128,0.12)"; }
            else if (i === selected && !isCorrect) { border = `2px solid #ef4444`; bg = "rgba(239,68,68,0.12)"; }
          } else if (selected === i) { border = `2px solid ${optColors[i]}`; bg = `${optColors[i]}22`; }
          return (
            <button key={i} disabled={confirmed} onClick={() => setSelected(i)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
              borderRadius: 12, border, background: bg, cursor: confirmed ? "default" : "pointer",
              color: "#f0f4ff", textAlign: "left",
            }}>
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, color: optColors[i], flexShrink: 0 }}>{String.fromCharCode(65 + i)}</span>
              <span style={{ fontSize: 12, fontFamily: "Courier New", lineHeight: 1.4 }}>{opt}</span>
            </button>
          );
        })}
      </div>
      {confirmed && (
        <div style={{ padding: 10, borderRadius: 10, marginBottom: 12, background: isCorrect ? "rgba(74,222,128,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${isCorrect ? "#4ade80" : "#ef4444"}44`, fontSize: 12, color: "rgba(240,244,255,0.8)", fontFamily: "Courier New", lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, marginBottom: 4, color: isCorrect ? "#4ade80" : "#ef4444" }}>{isCorrect ? L.correct : L.wrong}</div>
          {q.exp}
        </div>
      )}
      {!confirmed ? (
        <button onClick={handleConfirm} disabled={selected === null} style={{
          width: "100%", padding: "14px 0", border: "none", borderRadius: 12,
          background: selected !== null ? `linear-gradient(135deg,${C.anchor},${C.gold})` : "rgba(255,255,255,0.06)",
          fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700,
          color: selected !== null ? "#060e1a" : "rgba(240,244,255,0.25)",
          cursor: selected !== null ? "pointer" : "default", letterSpacing: 1,
        }}>{L.submit}</button>
      ) : (
        <button onClick={handleNext} style={{
          width: "100%", padding: "14px 0", border: "none", borderRadius: 12,
          background: `linear-gradient(135deg,${C.anchor},${C.gold})`,
          fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700,
          color: "#060e1a", cursor: "pointer", letterSpacing: 1,
        }}>{cur + 1 >= quiz.length ? L.finish : L.next}</button>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────
export default function LessonSEA_L3({ lang = "fr", onBack, onComplete }: {
  lang?: string; onBack: () => void; onComplete?: (xp?: number) => void;
}) {
  const t = T[lang] || T.fr;
  const [tab, setTab] = useState(0);
  const progress = [25, 50, 75, 90][tab] || 25;

  const handleComplete = (xp: number) => {
    if (onComplete) onComplete(xp);
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,${C.navy3},${C.navy})`, color: "#f0f4ff", fontFamily: "'Nunito',sans-serif" }}>
      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(6,14,26,0.97)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.anchor}33` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 14px", height: 52 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 12px", color: "#f0f4ff", fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>◀</button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 2, color: C.anchor, marginBottom: 2 }}>{t.moduleLabel} · L3</div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, color: "#f0f4ff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.lessonTitle}</div>
          </div>
          <div style={{ fontSize: 11, color: C.gold2, fontFamily: "Courier New", flexShrink: 0 }}>{progress}%</div>
        </div>
        <div style={{ height: 2, background: "rgba(255,255,255,0.06)" }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg,${C.anchor},${C.gold})`, width: `${progress}%`, transition: "width 0.4s" }} />
        </div>
      </div>

      {/* Premium Badge */}
      <div style={{ padding: "10px 14px 0" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 8, background: `${C.gold}18`, border: `1px solid ${C.gold}44` }}>
          <span style={{ fontSize: 12 }}>⚓</span>
          <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9, color: C.gold, letterSpacing: 1 }}>SEAMANSHIP · PREMIUM</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", padding: "10px 14px 0", gap: 6, overflowX: "auto" }}>
        {t.tabs.map((label: string, i: number) => (
          <button key={i} onClick={() => setTab(i)} style={{
            padding: "8px 12px", borderRadius: 10, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap",
            background: tab === i ? `${C.anchor}22` : "rgba(255,255,255,0.04)",
            border: `1px solid ${tab === i ? C.anchor : "rgba(255,255,255,0.1)"}`,
            color: tab === i ? C.anchor : "rgba(240,244,255,0.45)",
            fontFamily: "Courier New",
          }}>{label}</button>
        ))}
      </div>

      {/* Content */}
      <div>
        {tab === 0 && <ContentTab lang={lang} />}
        {tab === 1 && <PracticeTab lang={lang} />}
        {tab === 2 && <BankTab lang={lang} />}
        {tab === 3 && <QuizTab lang={lang} onComplete={handleComplete} />}
      </div>
    </div>
  );
}
