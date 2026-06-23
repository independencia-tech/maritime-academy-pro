// LessonSEA_L4 — Mooring Operations | PART 1
import { useState } from "react";

const C = {
  line:"#7eb8d4", cleat:"#c8a96e", bollard:"#94a3b8",
  fender:"#6dbf8a", danger:"#f97316", spring:"#e8b94f",
  breast:"#c084fc", gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  safe:"#6dbf8a",
};

const T: any = {
  fr: {
    moduleLabel:"SEAMANSHIP", lessonTitle:"Opérations d'amarrage",
    intro:"L'amarrage est l'opération qui consiste à maintenir un navire immobile contre un quai, un ponton ou un autre navire. La maîtrise des différents types de gardes, de l'utilisation des défenses et des procédures d'accostage est indispensable à tout marin.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"🔱 Schéma complet d'amarrage",
    s1hint:"👆 Tapez une ligne pour voir son rôle",
    s2title:"⚓ Procédure d'accostage",
    s2hint:"👆 Tapez une étape pour les détails",
    s3title:"🛡️ Défenses (fenders)",
    s3hint:"👆 Tapez un type de défense",
    s4title:"🔗 Équipements à quai",
    s4hint:"👆 Tapez un équipement",
    keypoints:"Points clés",
    kp:[
      "Les gardes avant et arrière empêchent le déplacement longitudinal du navire",
      "Les traversières maintiennent le navire contre le quai (mouvement transversal)",
      "Les défenses (fenders) protègent la coque du contact avec le quai",
      "Accoste toujours avec un angle faible et contre le courant si possible",
      "Le nœud d'amarrage standard : nœud de cabestan ou nœud de bitte",
    ],
    lines:{
      headLine:{ name:"Amarre de tête", desc:"Hawser going forward from the bow to the quay. Prevents the bow from moving aft. First line put ashore when coming alongside." },
      sternLine:{ name:"Amarre de queue", desc:"Hawser going aft from the stern. Prevents the stern from moving forward. Last line let go when departing." },
      forwardSpring:{ name:"Garde avant (spring avant)", desc:"Line running aft from the bow area. Prevents the ship from moving forward (surgir). Works against forward movement." },
      aftSpring:{ name:"Garde arrière (spring arrière)", desc:"Line running forward from the stern area. Prevents the ship from moving aft (culer). Essential for holding position." },
      forwardBreast:{ name:"Traversière avant", desc:"Short line running perpendicular to the ship from the bow area. Holds the bow against the quay. Works against lateral movement." },
      aftBreast:{ name:"Traversière arrière", desc:"Short line perpendicular from the stern. Holds the stern against the quay. Together with forward breast, maintains ship parallel to quay." },
    },
    steps:[
      { title:"1. Approche", desc:"Réduire la vitesse, approcher sous faible angle (10–20°). Placer les défenses. Équipe de pont prête avec les amarres." },
      { title:"2. Amarre de tête", desc:"Lancer ou porter à terre l'amarre de tête (hawse). La frapper au bollard ou taquet le plus proche de l'étrave." },
      { title:"3. Gardes", desc:"Frapper les gardes avant et arrière. Elles contrôlent le mouvement longitudinal et permettent de 'casser' le navire contre le quai." },
      { title:"4. Traversières", desc:"Frapper les traversières avant et arrière. Elles plaquent le navire contre le quai et compensent les effets de vent ou courant latéraux." },
      { title:"5. Amarre de queue", desc:"Frapper l'amarre de queue. À ce stade le navire est entièrement sécurisé. Régler toutes les amarres à tension égale." },
      { title:"6. Vérification", desc:"Vérifier que toutes les amarres sont claires, sans croisement, à tension correcte. Placer les pare-battages définitifs. Signaler 'terminé d'amarrer'." },
    ],
    fenders:{
      cylindrical:{ name:"Défense cylindrique", desc:"La plus courante. En caoutchouc ou polyéthylène. Suspendue verticalement le long du bord. Idéale pour les quais droits." },
      spherical:{ name:"Défense sphérique", desc:"Boule gonflable. Très utilisée en plaisance. S'adapte à toutes les formes de quai. Facile à manipuler." },
      foam:{ name:"Défense mousse (EVA)", desc:"Mousse EVA recouverte de polyuréthane. Insubmersible, ne perfore pas. Populaire sur les yachts de luxe." },
      panel:{ name:"Panneau de défense", desc:"Grande surface plane fixée au quai. Protège les navires qui accostent perpendiculairement (car-ferries, RoRo)." },
    },
    equipment:{
      bollard:{ name:"Bollard / Bitte d'amarrage", desc:"Poteau en acier ou fonte fixé au quai. Reçoit les boucles des amarres. Forme standard : double champignon ou en T." },
      cleat:{ name:"Taquet (cleat)", desc:"Dispositif en forme de T fixé sur le navire ou le quai. La ligne est tournée en 8 autour des cornes pour la bloquer." },
      fairlead:{ name:"Chaumard (fairlead)", desc:"Guide-câble fixé au plat-bord. Oriente les amarres vers le quai sans usure excessive. Peut être ouvert ou fermé (à linguet)." },
      capstan:{ name:"Cabestan / Treuil d'amarrage", desc:"Treuil motorisé pour virer les amarres sous tension. Indispensable sur les grands navires où les forces en jeu sont importantes." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Un navire doit accoster bâbord à quai par fort courant venant de l'arrière. Décrivez la stratégie d'approche et l'ordre de mise en place des amarres.", a:"Approcher sous faible angle (10–15°) en présentant légèrement l'étrave vers le quai. Le courant arrière aide à 'pousser' le navire contre le quai. Mettre en place d'abord la garde arrière (spring arrière) qui va bloquer le navire face au courant. Puis la traversière arrière pour plaquer la poupe. Ensuite la garde avant, puis traversière avant, puis amarres de tête et de queue. Le courant est utilisé comme outil plutôt que combattu." },
      { q:"Quelle est la différence entre une garde (spring) et une traversière (breast line), et quels mouvements chacune contrôle-t-elle ?", a:"Une garde est une amarre longitudinale oblique : la garde avant (spring avant) part de l'étrave vers l'arrière du quai et empêche le navire de surgir (avancer). La garde arrière part de la poupe vers l'avant du quai et empêche de culer. Une traversière est courte et perpendiculaire au navire — elle plaque le bord contre le quai et résiste au mouvement latéral (vent ou courant de travers). Les gardes contrôlent l'axe longitudinal ; les traversières contrôlent l'axe transversal." },
      { q:"Lors d'un appareillage par vent poussant vers le quai, comment utilise-t-on les gardes pour dégager le navire ?", a:"On garde la garde arrière (spring arrière) frappée au quai et on fait machine avant doucement — l'étrave est repoussée vers le large par l'effet de levier de la garde. Quand l'angle est suffisant (20–30°), on largue la garde, on passe en machine arrière et on appareille. Cette manœuvre s'appelle 'travailler sur la garde'. L'inverse (garde avant + machine arrière) dégage la poupe en premier." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en: {
    moduleLabel:"SEAMANSHIP", lessonTitle:"Mooring Operations",
    intro:"Mooring is the operation of securing a vessel alongside a quay, pontoon or another vessel. Mastering line types, fender use and berthing procedures is essential for every seafarer.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"🔱 Full Mooring Diagram",
    s1hint:"👆 Tap a line to see its role",
    s2title:"⚓ Berthing Procedure",
    s2hint:"👆 Tap a step for details",
    s3title:"🛡️ Fenders",
    s3hint:"👆 Tap a fender type",
    s4title:"🔗 Quay Equipment",
    s4hint:"👆 Tap a piece of equipment",
    keypoints:"Key Points",
    kp:[
      "Forward and aft springs prevent longitudinal movement of the vessel",
      "Breast lines hold the vessel against the quay (lateral movement)",
      "Fenders protect the hull from contact with the quay",
      "Always berth at a shallow angle and against the current if possible",
      "Standard mooring knots: cleat hitch or round turn and two half hitches",
    ],
    lines:{
      headLine:{ name:"Head line", desc:"Hawser going forward from the bow to the quay. Prevents the bow from moving aft. First line put ashore when coming alongside." },
      sternLine:{ name:"Stern line", desc:"Hawser going aft from the stern. Prevents the stern from moving forward. Last line let go when departing." },
      forwardSpring:{ name:"Forward spring", desc:"Line running aft from the bow area. Prevents the ship from moving forward (surging). Works against forward movement." },
      aftSpring:{ name:"Aft spring", desc:"Line running forward from the stern area. Prevents the ship from moving aft (ranging). Essential for holding position." },
      forwardBreast:{ name:"Forward breast line", desc:"Short line running perpendicular to the ship from the bow area. Holds the bow against the quay. Works against lateral movement." },
      aftBreast:{ name:"Aft breast line", desc:"Short line perpendicular from the stern. Holds the stern against the quay. Together with forward breast, maintains ship parallel to quay." },
    },
    steps:[
      { title:"1. Approach", desc:"Reduce speed, approach at shallow angle (10–20°). Position fenders. Deck crew ready with lines." },
      { title:"2. Head line", desc:"Pass or heave head line ashore. Secure to nearest bollard or cleat at the bow." },
      { title:"3. Springs", desc:"Secure forward and aft springs. They control longitudinal movement and allow the vessel to be 'breasted in' to the quay." },
      { title:"4. Breast lines", desc:"Secure forward and aft breast lines. They hold the vessel against the quay and counter lateral wind or current forces." },
      { title:"5. Stern line", desc:"Secure stern line. At this point the vessel is fully secured. Adjust all lines to equal tension." },
      { title:"6. Check", desc:"Verify all lines are clear, not crossed, at correct tension. Position final fenders. Report 'finished with mooring'." },
    ],
    fenders:{
      cylindrical:{ name:"Cylindrical fender", desc:"Most common type. Rubber or polyethylene. Hung vertically along the side. Ideal for straight quays." },
      spherical:{ name:"Spherical fender", desc:"Inflatable ball. Widely used in leisure sailing. Adapts to all quay shapes. Easy to handle." },
      foam:{ name:"Foam fender (EVA)", desc:"EVA foam with polyurethane cover. Unsinkable, non-puncture. Popular on luxury yachts." },
      panel:{ name:"Fender panel", desc:"Large flat surface fixed to quay. Protects vessels berthing perpendicular (car ferries, RoRo)." },
    },
    equipment:{
      bollard:{ name:"Bollard", desc:"Steel or cast-iron post fixed to quay. Receives mooring line eyes or bights. Standard shape: double mushroom or T-head." },
      cleat:{ name:"Cleat", desc:"T-shaped fitting on vessel or quay. Line is figure-eighted around the horns to secure it." },
      fairlead:{ name:"Fairlead", desc:"Cable guide on the rail. Directs mooring lines to quay without excessive wear. May be open or closed (with tongue)." },
      capstan:{ name:"Capstan / Mooring winch", desc:"Motorised winch for heaving lines under tension. Essential on large vessels where forces involved are significant." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"A vessel must berth port-side-to with a strong current from astern. Describe the approach strategy and order of line deployment.", a:"Approach at shallow angle (10–15°) presenting the bow slightly toward the quay. The following current helps push the vessel against the quay. Deploy the aft spring first to stop the vessel against the current. Then aft breast to hold the stern in. Then forward spring, forward breast, and finally head and stern lines. Use the current as a tool rather than fighting it." },
      { q:"What is the difference between a spring and a breast line, and what movement does each control?", a:"A spring is an oblique longitudinal line: the forward spring runs aft from the bow and prevents the vessel surging forward. The aft spring runs forward from the stern and prevents ranging astern. A breast line is short and perpendicular — it holds the vessel's side against the quay and resists lateral movement (wind or cross-current). Springs control the longitudinal axis; breast lines control the transverse axis." },
      { q:"When departing with wind pushing toward the quay, how are springs used to clear the vessel?", a:"Keep the aft spring made fast to the quay and go slow ahead — the bow is levered away from the quay. When the angle is sufficient (20–30°), let go the spring, go astern and depart. This manoeuvre is called 'working on the spring'. The reverse (forward spring + astern) clears the stern first." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es: {
    moduleLabel:"SEAMANSHIP", lessonTitle:"Operaciones de amarre",
    intro:"El amarre es la operación de mantener un buque inmóvil contra un muelle, pontón u otro buque. El dominio de los diferentes tipos de estachas, el uso de defensas y los procedimientos de atraque es indispensable para todo marinero.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔱 Diagrama completo de amarre",
    s1hint:"👆 Toca una línea para ver su función",
    s2title:"⚓ Procedimiento de atraque",
    s2hint:"👆 Toca un paso para los detalles",
    s3title:"🛡️ Defensas (fenders)",
    s3hint:"👆 Toca un tipo de defensa",
    s4title:"🔗 Equipos en el muelle",
    s4hint:"👆 Toca un equipo",
    keypoints:"Puntos clave",
    kp:[
      "Las espías de proa y popa evitan el movimiento longitudinal del buque",
      "Las traviesas mantienen el buque contra el muelle (movimiento transversal)",
      "Las defensas protegen el casco del contacto con el muelle",
      "Atracar siempre con ángulo pequeño y contra la corriente si es posible",
      "Nudos estándar de amarre: nudo de cornamusa o vuelta de escota con dos medios cotes",
    ],
    lines:{
      headLine:{ name:"Estacha de proa", desc:"Cabo que va hacia adelante desde la proa al muelle. Evita que la proa se mueva hacia popa. Primera línea que se da en tierra al atracar." },
      sternLine:{ name:"Estacha de popa", desc:"Cabo que va hacia atrás desde la popa. Evita que la popa avance. Última línea que se larga al zarpar." },
      forwardSpring:{ name:"Espía de proa (spring de proa)", desc:"Cabo que va hacia popa desde la zona de proa. Evita que el buque avance (surgir). Trabaja contra el movimiento hacia adelante." },
      aftSpring:{ name:"Espía de popa (spring de popa)", desc:"Cabo que va hacia proa desde la zona de popa. Evita que el buque vaya a popa (culear). Esencial para mantener la posición." },
      forwardBreast:{ name:"Traviesa de proa", desc:"Cabo corto perpendicular al buque desde la proa. Mantiene la proa contra el muelle. Trabaja contra el movimiento lateral." },
      aftBreast:{ name:"Traviesa de popa", desc:"Cabo corto perpendicular desde la popa. Mantiene la popa contra el muelle. Junto con la traviesa de proa, mantiene el buque paralelo al muelle." },
    },
    steps:[
      { title:"1. Aproximación", desc:"Reducir velocidad, aproximarse con ángulo pequeño (10–20°). Colocar defensas. Tripulación de cubierta lista con las estachas." },
      { title:"2. Estacha de proa", desc:"Lanzar o llevar a tierra la estacha de proa. Amarrarla al bolardo o cornamusa más cercano a la proa." },
      { title:"3. Espías", desc:"Dar las espías de proa y popa. Controlan el movimiento longitudinal y permiten 'apretar' el buque contra el muelle." },
      { title:"4. Traviesas", desc:"Dar las traviesas de proa y popa. Pegan el buque al muelle y compensan los efectos del viento o corriente lateral." },
      { title:"5. Estacha de popa", desc:"Dar la estacha de popa. En este momento el buque está completamente asegurado. Igualar la tensión de todas las estachas." },
      { title:"6. Verificación", desc:"Comprobar que todas las estachas están libres, sin cruce, con tensión correcta. Colocar defensas definitivas. Comunicar 'terminado de atracar'." },
    ],
    fenders:{
      cylindrical:{ name:"Defensa cilíndrica", desc:"La más común. De goma o polietileno. Colgada verticalmente a lo largo del costado. Ideal para muelles rectos." },
      spherical:{ name:"Defensa esférica", desc:"Bola hinchable. Muy usada en náutica de recreo. Se adapta a todas las formas de muelle. Fácil de manejar." },
      foam:{ name:"Defensa de espuma (EVA)", desc:"Espuma EVA recubierta de poliuretano. Insumergible, no se perfora. Popular en yates de lujo." },
      panel:{ name:"Panel de defensa", desc:"Gran superficie plana fijada al muelle. Protege los buques que atracan perpendicularmente (ferrys, RoRo)." },
    },
    equipment:{
      bollard:{ name:"Bolardo / Noray", desc:"Poste de acero o fundición fijado al muelle. Recibe las gazas de las estachas. Forma estándar: doble seta o en T." },
      cleat:{ name:"Cornamusa (cleat)", desc:"Dispositivo en T fijado en el buque o muelle. La línea se da en ocho alrededor de los cuernos para bloquearla." },
      fairlead:{ name:"Guiacabos (fairlead)", desc:"Guía de cable fijada en la regala. Orienta las estachas hacia el muelle sin desgaste excesivo. Puede ser abierta o cerrada." },
      capstan:{ name:"Cabestrante / Molinete de amarre", desc:"Cabrestante motorizado para cobrar estachas bajo tensión. Indispensable en grandes buques donde las fuerzas son importantes." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Un buque debe atracar a babor con fuerte corriente por la popa. Describa la estrategia de aproximación y el orden de los cabos.", a:"Aproximarse con ángulo pequeño (10–15°) presentando ligeramente la proa hacia el muelle. La corriente de popa ayuda a empujar el buque contra el muelle. Dar primero la espía de popa para frenar el buque contra la corriente. Luego la traviesa de popa para pegar la popa. Después la espía de proa, traviesa de proa, y finalmente las estachas de proa y popa. Usar la corriente como herramienta en lugar de combatirla." },
      { q:"¿Cuál es la diferencia entre una espía (spring) y una traviesa (breast line), y qué movimiento controla cada una?", a:"Una espía es un cabo longitudinal oblicuo: la espía de proa va hacia popa desde la proa y evita que el buque avance. La espía de popa va hacia proa desde la popa y evita que vaya a popa. Una traviesa es corta y perpendicular — pega el costado al muelle y resiste el movimiento lateral. Las espías controlan el eje longitudinal; las traviesas controlan el eje transversal." },
      { q:"Al zarpar con viento que empuja hacia el muelle, ¿cómo se usan las espías para separar el buque?", a:"Mantener la espía de popa dada al muelle y meter máquina avante despacio — la proa se aleja del muelle por efecto palanca. Cuando el ángulo es suficiente (20–30°), largar la espía, meter atrás y zarpar. Esta maniobra se llama 'trabajar sobre la espía'. Lo inverso (espía de proa + atrás) separa la popa primero." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt: {
    moduleLabel:"SEAMANSHIP", lessonTitle:"Operações de amarração",
    intro:"A amarração é a operação de manter um navio imóvel contra um cais, pontão ou outro navio. O domínio dos diferentes tipos de cabos, uso de defensas e procedimentos de atracação é indispensável para todo marinheiro.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔱 Diagrama completo de amarração",
    s1hint:"👆 Toque numa linha para ver o seu papel",
    s2title:"⚓ Procedimento de atracação",
    s2hint:"👆 Toque num passo para os detalhes",
    s3title:"🛡️ Defensas (fenders)",
    s3hint:"👆 Toque num tipo de defensa",
    s4title:"🔗 Equipamentos no cais",
    s4hint:"👆 Toque num equipamento",
    keypoints:"Pontos-chave",
    kp:[
      "As espreguias de vante e ré evitam o movimento longitudinal do navio",
      "As travessas mantêm o navio contra o cais (movimento transversal)",
      "As defensas protegem o casco do contacto com o cais",
      "Atracar sempre com ângulo pequeno e contra a corrente se possível",
      "Nós padrão de amarração: nó de cunho ou volta redonda com dois meios-cotes",
    ],
    lines:{
      headLine:{ name:"Amarra de vante", desc:"Cabo que vai para a vante desde a proa ao cais. Evita que a proa se mova para ré. Primeiro cabo dado em terra ao atracar." },
      sternLine:{ name:"Amarra de ré", desc:"Cabo que vai para ré desde a popa. Evita que a popa avance. Último cabo largado ao zarpar." },
      forwardSpring:{ name:"Espreguia de vante (spring de vante)", desc:"Cabo que vai para ré desde a área de proa. Evita que o navio avance (surgir). Trabalha contra o movimento para a vante." },
      aftSpring:{ name:"Espreguia de ré (spring de ré)", desc:"Cabo que vai para a vante desde a área de popa. Evita que o navio vá para ré. Essencial para manter a posição." },
      forwardBreast:{ name:"Travessa de vante", desc:"Cabo curto perpendicular ao navio desde a proa. Mantém a proa contra o cais. Trabalha contra o movimento lateral." },
      aftBreast:{ name:"Travessa de ré", desc:"Cabo curto perpendicular desde a popa. Mantém a popa contra o cais. Junto com a travessa de vante, mantém o navio paralelo ao cais." },
    },
    steps:[
      { title:"1. Aproximação", desc:"Reduzir velocidade, aproximar com ângulo pequeno (10–20°). Colocar defensas. Tripulação de convés pronta com os cabos." },
      { title:"2. Amarra de vante", desc:"Lançar ou levar em terra a amarra de vante. Fixá-la ao bolardo ou cunho mais próximo da proa." },
      { title:"3. Espreguias", desc:"Dar as espreguias de vante e ré. Controlam o movimento longitudinal e permitem 'apertar' o navio contra o cais." },
      { title:"4. Travessas", desc:"Dar as travessas de vante e ré. Colam o navio ao cais e compensam os efeitos do vento ou corrente lateral." },
      { title:"5. Amarra de ré", desc:"Dar a amarra de ré. Neste momento o navio está completamente seguro. Igualar a tensão de todos os cabos." },
      { title:"6. Verificação", desc:"Verificar que todos os cabos estão livres, sem cruzamento, com tensão correcta. Colocar defensas definitivas. Comunicar 'terminado de atracar'." },
    ],
    fenders:{
      cylindrical:{ name:"Defensa cilíndrica", desc:"A mais comum. Em borracha ou polietileno. Suspensa verticalmente ao longo do bordo. Ideal para cais retos." },
      spherical:{ name:"Defensa esférica", desc:"Bola insuflável. Muito usada em vela de recreio. Adapta-se a todas as formas de cais. Fácil de manusear." },
      foam:{ name:"Defensa de espuma (EVA)", desc:"Espuma EVA revestida de poliuretano. Insubmersível, não perfura. Popular em iates de luxo." },
      panel:{ name:"Painel de defensa", desc:"Grande superfície plana fixada ao cais. Protege navios que atracam perpendicularmente (ferries, RoRo)." },
    },
    equipment:{
      bollard:{ name:"Bolardo / Cabeço de amarração", desc:"Poste de aço ou ferro fundido fixo no cais. Recebe as gazas dos cabos. Forma padrão: duplo cogumelo ou em T." },
      cleat:{ name:"Cunho (cleat)", desc:"Dispositivo em T fixo no navio ou cais. O cabo dá-se em oito à volta das pontas para o bloquear." },
      fairlead:{ name:"Guia-cabos (fairlead)", desc:"Guia de cabo fixada na amurada. Orienta os cabos de amarração para o cais sem desgaste excessivo. Pode ser aberta ou fechada." },
      capstan:{ name:"Cabrestante / Guincho de amarração", desc:"Guincho motorizado para virar cabos sob tensão. Indispensável em grandes navios onde as forças envolvidas são significativas." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Um navio deve atracar a bombordo com forte corrente pela popa. Descreva a estratégia de aproximação e a ordem de colocação dos cabos.", a:"Aproximar com ângulo pequeno (10–15°) apresentando ligeiramente a proa para o cais. A corrente de popa ajuda a empurrar o navio contra o cais. Dar primeiro a espreguia de ré para travar o navio contra a corrente. Depois a travessa de ré para colar a popa. Depois a espreguia de vante, travessa de vante, e finalmente as amarras de vante e ré. Usar a corrente como ferramenta em vez de a combater." },
      { q:"Qual é a diferença entre uma espreguia (spring) e uma travessa (breast line), e que movimento controla cada uma?", a:"Uma espreguia é um cabo longitudinal oblíquo: a espreguia de vante vai para ré desde a proa e evita que o navio avance. A espreguia de ré vai para a vante desde a popa e evita que vá para ré. Uma travessa é curta e perpendicular — cola o bordo ao cais e resiste ao movimento lateral. As espreguias controlam o eixo longitudinal; as travessas controlam o eixo transversal." },
      { q:"Ao zarpar com vento que empurra para o cais, como se usam as espreguias para afastar o navio?", a:"Manter a espreguia de ré dada ao cais e meter máquina avante devagar — a proa afasta-se do cais por efeito de alavanca. Quando o ângulo é suficiente (20–30°), largar a espreguia, meter a ré e zarpar. Esta manobra chama-se 'trabalhar na espreguia'. O inverso (espreguia de vante + ré) afasta a popa primeiro." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — MOORING DIAGRAM ───────────────────────────────────
function MooringDiagramSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const lineKeys = Object.keys(t.lines);

  const lineColors: Record<string,string> = {
    headLine: C.line, sternLine: C.line,
    forwardSpring: C.spring, aftSpring: C.spring,
    forwardBreast: C.breast, aftBreast: C.breast,
  };

  const lineData: Record<string,{x1:number,y1:number,x2:number,y2:number}> = {
    headLine:      {x1:55, y1:80,  x2:20, y2:55},
    sternLine:     {x1:185,y1:80,  x2:220,y2:55},
    forwardSpring: {x1:60, y1:85,  x2:130,y2:115},
    aftSpring:     {x1:180,y1:85,  x2:110,y2:115},
    forwardBreast: {x1:75, y1:90,  x2:75, y2:125},
    aftBreast:     {x1:165,y1:90,  x2:165,y2:125},
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.line}33`}}>
      <div style={{fontSize:10,color:C.line,letterSpacing:2,marginBottom:8,fontFamily:"'Cinzel',serif"}}>{t.s1hint}</div>
      <svg viewBox="0 0 240 160" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        {/* Quay */}
        <rect x="10" y="115" width="220" height="20" rx="3" fill={C.navy3} stroke={C.bollard} strokeWidth="1.5"/>
        <text x="105" y="129" fontSize="8" fill={C.bollard} fontFamily="Courier New" textAnchor="middle">QUAI / QUAY</text>
        {/* Bollards */}
        {[30,80,130,180,215].map(x=>(
          <rect key={x} x={x-4} y="110" width="8" height="10" rx="2" fill={C.cleat} stroke={C.gold} strokeWidth="0.5"/>
        ))}
        {/* Vessel hull */}
        <path d="M45 65 L55 50 L185 50 L195 65 L195 100 L45 100 Z" fill={C.navy3} stroke={C.gold} strokeWidth="1.5"/>
        <text x="120" y="80" fontSize="9" fill={C.gold2} fontFamily="'Cinzel',serif" textAnchor="middle">⚓ VESSEL</text>
        {/* Mooring lines */}
        {lineKeys.map(key=>{
          const d = lineData[key];
          const color = lineColors[key];
          const active = sel === key;
          return (
            <line key={key} x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2}
              stroke={color} strokeWidth={active?3:1.5}
              strokeDasharray={key.includes("Spring")?"5,3":"none"}
              opacity={sel&&!active?0.3:1}
              style={{cursor:"pointer"}}
              onClick={()=>setSel(sel===key?null:key)}
            />
          );
        })}
        {/* Line labels */}
        <text x="12" y="48" fontSize="7" fill={C.line} fontFamily="Courier New">HEAD</text>
        <text x="190" y="48" fontSize="7" fill={C.line} fontFamily="Courier New">STERN</text>
        <text x="88" y="128" fontSize="7" fill={C.spring} fontFamily="Courier New">SPR</text>
        <text x="140" y="128" fontSize="7" fill={C.spring} fontFamily="Courier New">SPR</text>
        <text x="60" y="140" fontSize="7" fill={C.breast} fontFamily="Courier New">BRST</text>
        <text x="150" y="140" fontSize="7" fill={C.breast} fontFamily="Courier New">BRST</text>
      </svg>

      {/* Legend */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10,marginTop:4}}>
        {[{color:C.line,label:"Head/Stern"},{color:C.spring,label:"Springs",dash:true},{color:C.breast,label:"Breast lines"}].map(({color,label,dash})=>(
          <div key={label} style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:20,height:2,background:color,borderTop:dash?`2px dashed ${color}`:"none",opacity:0.9}}/>
            <span style={{fontSize:10,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{label}</span>
          </div>
        ))}
      </div>

      {/* Tap targets */}
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {lineKeys.map(key=>(
          <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
            padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${lineColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?lineColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?lineColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{t.lines[key].name}</button>
        ))}
      </div>

      {sel && (
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${lineColors[sel]}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{t.lines[sel].name}</div>
          {t.lines[sel].desc}
        </div>
      )}
    </div>
  );
}

// ── SVG 2 — BERTHING STEPS ────────────────────────────────────
function BerthingStepsSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [step, setStep] = useState(0);
  const steps = t.steps;
  const stepColors = [C.line,C.line,C.spring,C.breast,C.fender,C.gold];

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.spring}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
        {steps.map((_:any,i:number)=>(
          <button key={i} onClick={()=>setStep(i)} style={{
            width:32,height:32,borderRadius:8,fontSize:11,cursor:"pointer",fontWeight:700,
            background:step===i?`${stepColors[i]}33`:"rgba(255,255,255,0.04)",
            border:`1px solid ${step===i?stepColors[i]:"rgba(255,255,255,0.12)"}`,
            color:step===i?stepColors[i]:"rgba(240,244,255,0.4)",
          }}>{i+1}</button>
        ))}
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.06)",marginBottom:12}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.line},${C.gold})`,width:`${((step+1)/steps.length)*100}%`,transition:"width 0.3s"}}/>
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${stepColors[step]}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:stepColors[step],fontWeight:700,marginBottom:8}}>{steps[step].title}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{steps[step].desc}</div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:10,gap:8}}>
        <button disabled={step===0} onClick={()=>setStep(s=>s-1)} style={{
          flex:1,padding:"8px 0",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",
          background:"rgba(255,255,255,0.04)",color:"rgba(240,244,255,0.5)",cursor:step===0?"not-allowed":"pointer",fontSize:12,
        }}>◀</button>
        <button disabled={step===steps.length-1} onClick={()=>setStep(s=>s+1)} style={{
          flex:1,padding:"8px 0",borderRadius:10,border:`1px solid ${C.gold}44`,
          background:`${C.gold}11`,color:C.gold2,cursor:step===steps.length-1?"not-allowed":"pointer",fontSize:12,fontWeight:700,
        }}>▶</button>
      </div>
    </div>
  );
}

// ── SVG 3 — FENDERS ──────────────────────────────────────────
function FendersSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string>("cylindrical");
  const types = Object.entries(t.fenders) as [string,{name:string;desc:string}][];

  const fenderShapes: Record<string,JSX.Element> = {
    cylindrical:(
      <g>
        <rect x="55" y="30" width="50" height="120" rx="25" fill={C.fender} opacity={0.8}/>
        <rect x="65" y="40" width="30" height="100" rx="15" fill={C.fender} opacity={0.4}/>
        <line x1="80" y1="20" x2="80" y2="30" stroke={C.gold} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="80" cy="17" r="5" fill="none" stroke={C.gold} strokeWidth="2"/>
      </g>
    ),
    spherical:(
      <g>
        <circle cx="80" cy="90" r="55" fill={C.line} opacity={0.8}/>
        <circle cx="80" cy="90" r="40" fill={C.line} opacity={0.4}/>
        <line x1="80" y1="20" x2="80" y2="35" stroke={C.gold} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="80" cy="17" r="5" fill="none" stroke={C.gold} strokeWidth="2"/>
      </g>
    ),
    foam:(
      <g>
        <rect x="45" y="35" width="70" height="110" rx="20" fill={C.spring} opacity={0.8}/>
        <rect x="55" y="45" width="50" height="90" rx="15" fill={C.spring} opacity={0.4}/>
        <text x="80" y="98" fontSize="10" fill="rgba(255,255,255,0.8)" fontFamily="Courier New" textAnchor="middle">EVA</text>
        <line x1="80" y1="20" x2="80" y2="35" stroke={C.gold} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="80" cy="17" r="5" fill="none" stroke={C.gold} strokeWidth="2"/>
      </g>
    ),
    panel:(
      <g>
        <rect x="20" y="40" width="120" height="100" rx="8" fill={C.bollard} opacity={0.7}/>
        <rect x="28" y="48" width="104" height="84" rx="5" fill={C.bollard} opacity={0.4}/>
        <line x1="50" y1="25" x2="50" y2="40" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="110" y1="25" x2="110" y2="40" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="50" cy="22" r="4" fill="none" stroke={C.gold} strokeWidth="2"/>
        <circle cx="110" cy="22" r="4" fill="none" stroke={C.gold} strokeWidth="2"/>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.fender}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {types.map(([key,val])=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            padding:"5px 10px",borderRadius:8,fontSize:10,cursor:"pointer",
            background:sel===key?`${C.fender}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?C.fender:"rgba(255,255,255,0.1)"}`,
            color:sel===key?C.fender:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",
          }}>{val.name}</button>
        ))}
      </div>
      <svg viewBox="0 0 160 175" style={{width:"100%",maxWidth:200,display:"block",margin:"0 auto"}}>
        {fenderShapes[sel]}
      </svg>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${C.fender}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{t.fenders[sel].name}</div>
        {t.fenders[sel].desc}
      </div>
    </div>
  );
}

// ── SVG 4 — EQUIPMENT ────────────────────────────────────────
function EquipmentSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const items = Object.entries(t.equipment) as [string,{name:string;desc:string}][];
  const eqColors: Record<string,string> = {bollard:C.cleat,cleat:C.gold,fairlead:C.line,capstan:C.spring};

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.cleat}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {items.map(([key,val])=>{
          const col = eqColors[key]||C.line;
          return (
            <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
              padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",
              background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",
              border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,
            }}>
              <div style={{fontSize:13,fontWeight:700,color:"#f0f4ff",marginBottom:3,fontFamily:"Courier New"}}>{val.name}</div>
            </button>
          );
        })}
      </div>
      {sel && (
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${eqColors[sel]||C.line}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{t.equipment[sel].name}</div>
          {t.equipment[sel].desc}
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}

// ── CONTENT TAB ───────────────────────────────────────────────
function ContentTab({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const section = (title:string,children:React.ReactNode,color=C.line) => (
    <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${color}33`}}>
      <div style={{background:`${color}18`,padding:"10px 14px",borderBottom:`1px solid ${color}22`}}>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color}}>{title}</span>
      </div>
      <div style={{padding:12}}>{children}</div>
    </div>
  );
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontSize:13,color:"rgba(240,244,255,0.65)",lineHeight:1.7,marginBottom:18,fontFamily:"Courier New"}}>{t.intro}</div>
      {section(t.s1title,<MooringDiagramSVG lang={lang}/>,C.line)}
      {section(t.s2title,<BerthingStepsSVG lang={lang}/>,C.spring)}
      {section(t.s3title,<FendersSVG lang={lang}/>,C.fender)}
      {section(t.s4title,<EquipmentSVG lang={lang}/>,C.cleat)}
      <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.gold}44`,padding:14}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:C.gold,letterSpacing:1,marginBottom:10}}>✦ {t.keypoints}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:7,fontSize:12,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.gold,flexShrink:0}}>✦</span><span>{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PRACTICE TAB ──────────────────────────────────────────────
function PracticeTab({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [shown,setShown] = useState([false,false,false]);
  const toggle = (i:number) => setShown(p=>p.map((v,j)=>j===i?!v:v));
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,marginBottom:14}}>✏️ {t.practiceTitle}</div>
      {t.questions.map((q:any,i:number)=>(
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.line}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.line,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{
              padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",
              background:shown[i]?`${C.line}22`:"rgba(255,255,255,0.06)",
              border:`1px solid ${shown[i]?C.line:"rgba(255,255,255,0.15)"}`,
              color:shown[i]?C.line:"rgba(240,244,255,0.5)",fontFamily:"Courier New",
            }}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&(
              <div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.line}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonSEA_L4 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const banks: any = {
    fr:[
      {q:"Quelle est la différence entre une amarre de tête (head line) et une garde avant (forward spring) ?",a:"L'amarre de tête part de l'étrave vers l'avant du quai et empêche le navire de reculer (culer). La garde avant part aussi de la zone avant mais va vers l'arrière du quai — elle empêche le navire d'avancer (surgir). Ces deux lignes travaillent donc en sens opposés sur l'axe longitudinal."},
      {q:"Pourquoi est-il recommandé d'accoster contre le courant ?",a:"Accoster contre le courant permet de contrôler la vitesse d'approche : le courant freine naturellement le navire. On peut ainsi doser les forces propulsives avec précision. En accostant avec le courant, le navire est poussé contre le quai sans contrôle, ce qui risque de causer des dommages. Si accoster contre le courant est impossible, on réduit la vitesse au minimum et on utilise les amarres comme frein."},
      {q:"Qu'est-ce qu'un bollard (bitte d'amarrage) et comment doit-on y frapper une amarre ?",a:"Un bollard est un poteau en acier ou en fonte fixé au quai, avec une tête élargie pour empêcher les gazas de glisser. On frappe l'amarre en passant la gaze (boucle d'extrémité) par-dessus la tête du bollard. Si plusieurs amarres partagent le même bollard, on passe chaque nouvelle gaze par en dessous de la précédente (méthode 'chapeau de gendarme') pour permettre de larguer n'importe quelle amarre indépendamment."},
      {q:"Qu'est-ce qu'un chaumard (fairlead) et quel est son rôle ?",a:"Le chaumard est un dispositif guide-câble fixé sur le plat-bord du navire. Il oriente les amarres depuis le pont vers le quai sans friction excessive ni usure. Il peut être ouvert (simple anneau) ou fermé (avec un linguet de retenue). Sans chaumard, les amarres frotteraient sur le bordé ou la rambarde, s'userait rapidement et pourraient céder."},
      {q:"Décrivez la manœuvre de 'travailler sur la garde' (working on the spring) pour appareiller par vent de terre.",a:"Lorsque le vent pousse le navire vers le quai, on garde la garde arrière frappée au quai et on donne de la machine avant doucement. La poupe reste contre le quai (retenue par la garde) mais l'étrave s'écarte progressivement sous l'effet du couple. Quand l'angle est suffisant (20–30°), on largue la garde, on passe en marche arrière et on appareille en cap libre."},
      {q:"Quelle est la différence entre une gaze (eye) et un nœud d'amarre ?",a:"Une gaze est une boucle permanente épissée à l'extrémité d'une amarre. Elle se passe directement sur un bollard sans nœud — rapide et sûre. Un nœud est utilisé quand l'amarre n'a pas de gaze préformée, ou pour frapper sur un taquet. Les nœuds courants : nœud de cabestan (cleat hitch) sur les taquets, nœud de bitte ou deux demi-clés pour les bittes."},
      {q:"Comment positionne-t-on les défenses (fenders) lors d'un accostage ?",a:"Les défenses doivent être positionnées à la hauteur du quai (ni trop hautes ni trop basses). Pour un accostage sous angle, on concentre les défenses à l'avant car c'est la zone qui touche en premier. Pour un quai droit, on répartit les défenses uniformément sur la longueur du navire. On les suspend par le dessus avec une ligne de retenue pour éviter qu'elles ne tombent à l'eau."},
      {q:"Qu'est-ce que l'amarrage en méditerranée (Med-moor) ?",a:"Le Med-moor (ou amarrage à la méditerranéenne) consiste à mouiller l'ancre par l'avant et à reculer en poupe à quai — on amarre ensuite les amarres de poupe au quai. Cette technique est très utilisée en Méditerranée où les quais sont souvent perpendiculaires. L'ancre maintient l'étrave au large tandis que les amarres de poupe tiennent la poupe."},
      {q:"Quelles vérifications doit-on effectuer après avoir terminé d'amarrer ?",a:"1. Toutes les amarres sont frappées et à tension équilibrée. 2. Les gardes et traversières ne sont pas croisées. 3. Les défenses sont bien positionnées et ne coincent pas. 4. Les aussières de sécurité (spring de secours) sont en place si prévu. 5. Les tuyaux de descente et passerelles sont correctement positionnés. 6. Signaler au capitaine/officier de quart 'terminé d'amarrer'."},
      {q:"Qu'est-ce qu'un treuil d'amarrage (mooring winch) et quand est-il indispensable ?",a:"Le treuil d'amarrage est un cabestan motorisé permettant de virer (rentrer) les amarres sous tension sans effort humain. Il est indispensable sur les grands navires où les forces sont trop importantes pour être tenues à la main. Il dispose d'un frein automatique et d'une fonction 'auto-tension' sur certains navires modernes, qui maintient une tension constante malgré les variations de marée ou de chargement."},
      {q:"Qu'est-ce qu'une amarre de sécurité (towing spring) et quand est-elle utilisée ?",a:"Une amarre de sécurité est une amarre supplémentaire mise en place par précaution par mauvais temps ou courant fort. Elle redouble la garde la plus sollicitée. On peut aussi l'utiliser lors du passage de navires générant du remous (vagues dues au trafic dans les ports), ou lorsque les prévisions météo indiquent des conditions susceptibles de mettre les amarres sous forte tension."},
      {q:"Comment gère-t-on les variations de marée lors d'un amarrage prolongé ?",a:"Les amarres doivent être ajustées régulièrement selon le niveau de marée. À marée montante, les amarres se tendent si elles ne sont pas filées — risque de rupture. À marée descendante, elles se mettent en berne si elles ne sont pas virées — le navire peut cogner contre le quai. Soit on fait des veilles d'amarrage régulières, soit on utilise des treuils à auto-tension. On calcule l'amplitude de marée et on laisse une longueur d'amarre adaptée."},
      {q:"Qu'est-ce qu'un poste à quai et quels sont ses équipements standards ?",a:"Un poste à quai (berth) est un emplacement désigné pour l'accostage d'un navire. Équipements standards : bollards ou bittes d'amarrage à espacement régulier, chaumards et fairleads, bornes électriques (shore power), prises d'eau douce, parfois rampes d'accès (passerelles de coupée), défenses de quai fixées (panneaux de protection), signalétique d'identification du poste."},
      {q:"Quelle est la règle de priorité pour larguer les amarres à l'appareillage ?",a:"L'ordre inverse de l'amarrage : on largue d'abord les amarres qui contraignent le moins le navire, et on garde les plus importantes jusqu'à la fin. En général : 1. Traversières (pour donner du jeu latéral). 2. Amarre de tête ou de queue (selon l'appareillage envisagé). 3. Gardes restantes. 4. Dernière garde (celle qui retient le navire dans la direction souhaitée jusqu'au dernier moment)."},
      {q:"Définissez l'effet de berge (bank effect) et son impact sur la manœuvre d'accostage.",a:"L'effet de berge (ou effet de quai) se produit quand un navire navigue près d'une paroi verticale (quai, berge). La zone d'eau entre le navire et la paroi voit sa vitesse d'écoulement augmenter, créant une dépression qui attire le navire vers la paroi (effet Bernoulli). À vitesse élevée, cet effet peut rendre l'étrave ou la poupe incontrôlable. À l'accostage, on l'utilise à son avantage à faible vitesse pour attirer doucement le navire vers le quai."},
    ],
    en:[
      {q:"What is the difference between a head line and a forward spring?",a:"The head line runs forward from the bow to the quay and prevents the vessel from ranging astern. The forward spring also runs from the forward area but goes aft along the quay — it prevents the vessel from surging forward. These two lines therefore work in opposite directions on the longitudinal axis."},
      {q:"Why is it recommended to berth against the current?",a:"Berthing against the current allows control of approach speed: the current naturally brakes the vessel. Propulsive forces can be applied precisely. Berthing with the current pushes the vessel against the quay uncontrollably, risking damage. If berthing against the current is impossible, approach at minimum speed and use lines as a brake."},
      {q:"What is a bollard and how should a mooring line be secured to it?",a:"A bollard is a steel or cast-iron post fixed to the quay with an enlarged head to prevent eyes sliding off. Secure the line by passing the eye over the head. If multiple lines share a bollard, pass each new eye under the previous one ('gendarme's hat' method) so any line can be let go independently."},
      {q:"What is a fairlead and what is its role?",a:"A fairlead is a cable guide fitting on the vessel's rail. It directs mooring lines from deck to quay without excessive friction or wear. It may be open (simple ring) or closed (with a tongue). Without a fairlead, lines would chafe on the hull or rail, wear rapidly and could part."},
      {q:"Describe the 'working on the spring' manoeuvre when departing with an offshore wind.",a:"When wind pushes the vessel toward the quay, keep the aft spring made fast and go slow ahead. The stern stays against the quay (held by the spring) while the bow is progressively levered away. When the angle is sufficient (20–30°), let go the spring, go astern and depart on a free heading."},
      {q:"What is the difference between an eye and a mooring knot?",a:"An eye is a permanent spliced loop at the line end. It is placed directly over a bollard without a knot — quick and secure. A knot is used when the line has no preformed eye, or to secure to a cleat. Common knots: cleat hitch on cleats, round turn and two half-hitches on bollards."},
      {q:"How are fenders positioned when coming alongside?",a:"Fenders must be at quay height (not too high or too low). For an angled approach, concentrate fenders forward as this contacts first. For a straight quay, distribute evenly along the vessel's length. Suspend from above with a retaining line to prevent them falling overboard."},
      {q:"What is a Med-moor?",a:"Med-moor (Mediterranean mooring) involves dropping the anchor ahead and backing stern-to the quay, then securing stern lines. Widely used in the Mediterranean where quays are often perpendicular. The anchor holds the bow off while stern lines secure the stern."},
      {q:"What checks must be made after completing mooring?",a:"1. All lines made fast and evenly tensioned. 2. Springs and breast lines not crossed. 3. Fenders correctly positioned and not trapped. 4. Safety springs in place if required. 5. Gangways and shore connections correctly positioned. 6. Report to master/OOW 'finished with mooring'."},
      {q:"What is a mooring winch and when is it essential?",a:"A mooring winch is a motorised capstan for heaving lines under tension without manual effort. Essential on large vessels where forces are too great to handle manually. It has an automatic brake and some modern vessels have an 'auto-tension' function maintaining constant tension despite tidal or load changes."},
      {q:"What is a safety mooring line and when is it used?",a:"A safety mooring line is an additional line put out in bad weather or strong current. It doubles the most loaded spring. Also used when passing vessels generate wash (traffic waves in port), or when weather forecasts indicate conditions likely to put lines under high tension."},
      {q:"How are tidal variations managed during a prolonged mooring?",a:"Lines must be adjusted regularly with tidal level. At rising tide, lines tighten if not veered — risk of parting. At falling tide, they go slack if not hove in — vessel may bang against quay. Either maintain regular anchor watches or use auto-tension winches. Calculate tidal range and allow appropriate line length."},
      {q:"What is a berth and what are its standard fittings?",a:"A berth is a designated position for a vessel to come alongside. Standard fittings: bollards or bitts at regular intervals, fairleads and chocks, shore power points, freshwater connections, sometimes access ramps (gangways), fixed quay fenders (protection panels), berth identification signage."},
      {q:"What is the priority rule for letting go lines when departing?",a:"Reverse order from mooring: let go lines constraining the vessel least first, keep the most important until last. Generally: 1. Breast lines (to give lateral freedom). 2. Head or stern line (depending on intended departure). 3. Remaining springs. 4. Last spring (holding vessel in desired direction until the last moment)."},
      {q:"Define bank effect and its impact on berthing manoeuvres.",a:"Bank effect occurs when a vessel moves close to a vertical wall (quay, bank). Water between vessel and wall flows faster, creating a depression that draws the vessel toward the wall (Bernoulli effect). At high speed this can make bow or stern uncontrollable. When berthing, use it advantageously at low speed to gently draw the vessel toward the quay."},
    ],
    es:[
      {q:"¿Cuál es la diferencia entre una estacha de proa (head line) y una espía de proa (forward spring)?",a:"La estacha de proa va hacia adelante desde la proa al muelle y evita que el buque vaya a popa. La espía de proa también parte de la zona de proa pero va hacia popa del muelle — evita que el buque avance. Estas dos líneas trabajan en sentidos opuestos en el eje longitudinal."},
      {q:"¿Por qué se recomienda atracar contra la corriente?",a:"Atracar contra la corriente permite controlar la velocidad de aproximación: la corriente frena naturalmente el buque. Se pueden aplicar las fuerzas propulsivas con precisión. Atracar con la corriente empuja el buque contra el muelle sin control, con riesgo de daños. Si es imposible atracar contra la corriente, aproximarse a velocidad mínima y usar las estachas como freno."},
      {q:"¿Qué es un bolardo y cómo debe asegurarse una estacha?",a:"Un bolardo es un poste de acero o fundición fijo en el muelle con cabeza ensanchada para evitar que las gazas resbalen. Se amarla pasando la gaza por encima de la cabeza. Si varias estachas comparten el mismo bolardo, se pasa cada nueva gaza por debajo de la anterior (método 'sombrero de gendarme') para poder largar cualquier estacha independientemente."},
      {q:"¿Qué es un guiacabos (fairlead) y cuál es su función?",a:"El guiacabos es un dispositivo fijado en la regala del buque. Orienta las estachas desde cubierta al muelle sin rozamiento excesivo ni desgaste. Puede ser abierto (argolla simple) o cerrado (con linguete). Sin guiacabos, las estachas rozarían en el casco o la borda, se desgastarían rápidamente y podrían romperse."},
      {q:"Describa la maniobra de 'trabajar sobre la espía' para zarpar con viento a tierra.",a:"Con viento que empuja hacia el muelle, se mantiene la espía de popa dada al muelle y se mete máquina avante despacio. La popa queda contra el muelle (retenida por la espía) pero la proa se aleja progresivamente. Cuando el ángulo es suficiente (20–30°), se larga la espía, se mete atrás y se zarpa en rumbo libre."},
      {q:"¿Cuál es la diferencia entre una gaza y un nudo de amarre?",a:"Una gaza es una boya permanente empalmetada al extremo de una estacha. Se pasa directamente sobre el bolardo sin nudo — rápida y segura. Un nudo se usa cuando la estacha no tiene gaza preformada o para dar en la cornamusa. Nudos comunes: nudo de cornamusa en las cornamusas, vuelta de escota con dos medios cotes en bolardos."},
      {q:"¿Cómo se colocan las defensas al atracar?",a:"Las defensas deben estar a la altura del muelle (ni demasiado altas ni bajas). Para una aproximación en ángulo, concentrarlas a proa pues es la zona que toca primero. Para un muelle recto, distribuirlas uniformemente a lo largo del buque. Suspenderlas por arriba con una línea para evitar que caigan al agua."},
      {q:"¿Qué es el amarre mediterráneo (Med-moor)?",a:"El Med-moor (amarre a la mediterránea) consiste en fondear el ancla por la proa y ciar con la popa al muelle, dando luego las estachas de popa. Muy usado en el Mediterráneo donde los muelles son a menudo perpendiculares. El ancla mantiene la proa al largo mientras las estachas de popa sujetan la popa."},
      {q:"¿Qué verificaciones deben realizarse tras terminar de atracar?",a:"1. Todas las estachas amarradas y con tensión equilibrada. 2. Espías y traviesas sin cruce. 3. Defensas bien colocadas y sin quedar atrapadas. 4. Espías de seguridad colocadas si está previsto. 5. Pasarelas y conexiones de tierra correctamente posicionadas. 6. Comunicar al capitán/oficial de guardia 'terminado de atracar'."},
      {q:"¿Qué es un molinete de amarre y cuándo es indispensable?",a:"El molinete de amarre es un cabestrante motorizado para cobrar estachas bajo tensión sin esfuerzo manual. Indispensable en grandes buques donde las fuerzas son demasiado grandes para manejar a mano. Dispone de freno automático y algunos buques modernos tienen función 'auto-tensión' que mantiene tensión constante a pesar de variaciones de marea o carga."},
      {q:"¿Qué es una estacha de seguridad y cuándo se usa?",a:"Una estacha de seguridad es una línea adicional colocada por precaución con mal tiempo o corriente fuerte. Dobla la espía más cargada. También se usa cuando los buques que pasan generan remolino (olas de tráfico en los puertos), o cuando las previsiones meteorológicas indican condiciones que pueden tensar mucho las estachas."},
      {q:"¿Cómo se gestionan las variaciones de marea durante un amarre prolongado?",a:"Las estachas deben ajustarse regularmente con el nivel de marea. Con marea creciente, se tensan si no se filan — riesgo de rotura. Con marea vaciante, quedan flojas si no se cobran — el buque puede golpear contra el muelle. Se realizan guardias de amarre regulares o se usan molinetes de auto-tensión. Se calcula el rango de marea y se deja la longitud de estacha adecuada."},
      {q:"¿Qué es un puesto de atraque y cuáles son sus equipos estándar?",a:"Un puesto de atraque (berth) es un lugar designado para el atraque de un buque. Equipos estándar: bolardos o norayes a intervalos regulares, guiacabos y escobenes, tomas de corriente de tierra, conexiones de agua dulce, a veces rampas de acceso (pasarelas), defensas fijas de muelle (paneles de protección), señalización de identificación del puesto."},
      {q:"¿Cuál es la regla de prioridad para largar estachas al zarpar?",a:"Orden inverso al amarre: se largan primero las estachas que menos restringen al buque y se guardan las más importantes para el final. En general: 1. Traviesas (para dar libertad lateral). 2. Estacha de proa o popa (según la salida prevista). 3. Espías restantes. 4. Última espía (retiene el buque en la dirección deseada hasta el último momento)."},
      {q:"Defina el efecto de orilla (bank effect) y su impacto en la maniobra de atraque.",a:"El efecto de orilla ocurre cuando un buque navega cerca de una pared vertical (muelle, orilla). El agua entre el buque y la pared fluye más rápido, creando una depresión que atrae el buque hacia la pared (efecto Bernoulli). A alta velocidad puede hacer la proa o popa incontrolable. Al atracar, se usa ventajosamente a baja velocidad para atraer suavemente el buque hacia el muelle."},
    ],
    pt:[
      {q:"Qual é a diferença entre uma amarra de vante (head line) e uma espreguia de vante (forward spring)?",a:"A amarra de vante vai para a vante desde a proa ao cais e evita que o navio vá para ré. A espreguia de vante também parte da área de proa mas vai para ré ao longo do cais — evita que o navio avance. Estas duas linhas trabalham portanto em sentidos opostos no eixo longitudinal."},
      {q:"Por que é recomendado atracar contra a corrente?",a:"Atracar contra a corrente permite controlar a velocidade de aproximação: a corrente trava naturalmente o navio. As forças propulsivas podem ser aplicadas com precisão. Atracar com a corrente empurra o navio contra o cais sem controlo, com risco de danos. Se for impossível atracar contra a corrente, aproximar a velocidade mínima e usar os cabos como travão."},
      {q:"O que é um bolardo e como deve ser segura uma amarra?",a:"Um bolardo é um poste de aço ou ferro fundido fixo no cais com cabeça alargada para evitar que as gazas deslizem. Segura-se a amarra passando a gaza pela cabeça. Se várias amarras partilham o mesmo bolardo, passa-se cada nova gaza por baixo da anterior (método 'chapéu de gendarme') para poder largar qualquer amarra independentemente."},
      {q:"O que é um guia-cabos (fairlead) e qual é o seu papel?",a:"O guia-cabos é um dispositivo fixo na amurada do navio. Orienta as amarras do convés para o cais sem fricção excessiva nem desgaste. Pode ser aberto (argola simples) ou fechado (com lingueta). Sem guia-cabos, as amarras roçariam no casco ou na borda, desgastar-se-iam rapidamente e poderiam arrebentar."},
      {q:"Descreva a manobra de 'trabalhar na espreguia' para zarpar com vento de terra.",a:"Com vento que empurra para o cais, mantém-se a espreguia de ré dada ao cais e mete-se máquina avante devagar. A popa fica contra o cais (retida pela espreguia) enquanto a proa se afasta progressivamente. Quando o ângulo é suficiente (20–30°), larga-se a espreguia, mete-se a ré e zarpa-se em rumo livre."},
      {q:"Qual é a diferença entre uma gaza e um nó de amarração?",a:"Uma gaza é uma argola permanente esplicada na extremidade de um cabo. Passa-se diretamente sobre um bolardo sem nó — rápida e segura. Um nó usa-se quando o cabo não tem gaza pré-formada ou para dar num cunho. Nós comuns: nó de cunho nos cunhos, volta redonda com dois meios-cotes nos bolardos."},
      {q:"Como se posicionam as defensas ao atracar?",a:"As defensas devem estar à altura do cais (nem muito altas nem muito baixas). Para uma aproximação em ângulo, concentrá-las a vante pois é a zona que toca primeiro. Para cais reto, distribuí-las uniformemente ao longo do navio. Suspender por cima com uma linha para evitar que caiam ao mar."},
      {q:"O que é o Med-moor?",a:"O Med-moor (amarração à mediterrânea) consiste em fundear a âncora pela proa e ciar com a popa ao cais, dando depois as amarras de popa. Muito usado no Mediterrâneo onde os cais são frequentemente perpendiculares. A âncora mantém a proa ao largo enquanto as amarras de popa seguram a popa."},
      {q:"Que verificações devem ser feitas após terminar de atracar?",a:"1. Todos os cabos dados e com tensão equilibrada. 2. Espreguias e travessas sem cruzamento. 3. Defensas bem colocadas e sem ficar presas. 4. Espreguias de segurança colocadas se previsto. 5. Passadiços e ligações de terra corretamente posicionados. 6. Comunicar ao comandante/oficial de quarto 'terminado de atracar'."},
      {q:"O que é um guincho de amarração e quando é indispensável?",a:"O guincho de amarração é um cabrestante motorizado para virar cabos sob tensão sem esforço manual. Indispensável em grandes navios onde as forças são demasiado grandes para manusear manualmente. Tem travão automático e alguns navios modernos têm função 'auto-tensão' que mantém tensão constante apesar de variações de maré ou carga."},
      {q:"O que é um cabo de segurança e quando é usado?",a:"Um cabo de segurança é uma linha adicional colocada por precaução com mau tempo ou corrente forte. Duplica a espreguia mais carregada. Também se usa quando navios que passam geram reboque (ondas de tráfego nos portos), ou quando as previsões meteorológicas indicam condições que podem tensionar muito os cabos."},
      {q:"Como se gerem as variações de maré durante uma amarração prolongada?",a:"Os cabos devem ser ajustados regularmente com o nível da maré. Com maré enchente, tensam-se se não forem arriados — risco de arrebentamento. Com maré vazante, ficam frouxos se não forem virados — o navio pode bater contra o cais. Fazem-se vigias de amarração regulares ou usam-se guinchos de auto-tensão. Calcula-se a amplitude da maré e deixa-se o comprimento de cabo adequado."},
      {q:"O que é um posto de atracação e quais são os seus equipamentos padrão?",a:"Um posto de atracação (berth) é um local designado para a atracação de um navio. Equipamentos padrão: bolardos ou cabeços a intervalos regulares, guia-cabos e escovéns, tomadas de corrente de terra, ligações de água doce, às vezes rampas de acesso (passadiços), defensas fixas de cais (painéis de proteção), sinalização de identificação do posto."},
      {q:"Qual é a regra de prioridade para largar cabos ao zarpar?",a:"Ordem inversa à amarração: largam-se primeiro os cabos que menos restringem o navio e guardam-se os mais importantes para o fim. Em geral: 1. Travessas (para dar liberdade lateral). 2. Amarra de vante ou ré (conforme a saída prevista). 3. Espreguias restantes. 4. Última espreguia (retém o navio na direção desejada até ao último momento)."},
      {q:"Defina o efeito de margem (bank effect) e o seu impacto na manobra de atracação.",a:"O efeito de margem ocorre quando um navio navega perto de uma parede vertical (cais, margem). A água entre o navio e a parede flui mais rápido, criando uma depressão que atrai o navio para a parede (efeito Bernoulli). A alta velocidade pode tornar a proa ou popa incontrolável. Ao atracar, usa-se vantajosamente a baixa velocidade para atrair suavemente o navio para o cais."},
    ],
  };
  return banks[lang]||banks.fr;
}

function getQuiz(lang: string) {
  const quizzes: any = {
    fr:[
      {q:"Quelle amarre empêche le navire de surgir (avancer) alors qu'il est à quai ?",opts:["L'amarre de tête","La garde avant","La traversière avant","L'amarre de queue"],correct:1,exp:"La garde avant (forward spring) part de la zone avant vers l'arrière du quai. C'est elle qui s'oppose au mouvement d'avancement (surge) du navire. L'amarre de tête, au contraire, empêche de culer."},
      {q:"Dans quel ordre doit-on frapper les amarres lors d'un accostage standard ?",opts:["Traversières → Gardes → Tête/Queue","Tête → Gardes → Traversières → Queue","Queue → Traversières → Tête","Gardes → Tête → Queue → Traversières"],correct:1,exp:"L'ordre standard est : Tête (pour arrêter le navire) → Gardes avant et arrière (contrôle longitudinal) → Traversières (contrôle latéral) → Queue (sécurisation complète). Cet ordre garantit un contrôle progressif du navire."},
      {q:"Qu'est-ce qu'une défense (fender) ?",opts:["Un type de nœud marin","Un dispositif absorbant les chocs entre le navire et le quai","Un équipement de navigation","Une amarre de sécurité"],correct:1,exp:"Une défense est un dispositif (en caoutchouc, polyéthylène ou mousse) placé entre le flanc du navire et le quai pour absorber les chocs et protéger la coque contre les dommages dus au contact."},
      {q:"Lors de la manœuvre 'travailler sur la garde arrière', qu'est-ce qui s'écarte du quai ?",opts:["La poupe","L'étrave (bow)","Le milieu du navire","Rien — le navire reste parallèle"],correct:1,exp:"En travaillant sur la garde arrière avec machine avant, la poupe reste contre le quai (retenue par la garde) tandis que l'étrave s'éloigne progressivement sous l'effet du couple créé. C'est l'étrave qui s'écarte."},
      {q:"Comment s'appelle la technique d'amarrage en poupe à quai avec ancre par l'avant ?",opts:["Amarrage en tandem","Amarrage à couple","Amarrage méditerranéen (Med-moor)","Amarrage en nasse"],correct:2,exp:"L'amarrage méditerranéen (Med-moor) consiste à mouiller l'ancre par l'avant puis à reculer en poupe à quai. Très utilisé en Méditerranée où les places de port sont souvent perpendiculaires au quai."},
    ],
    en:[
      {q:"Which mooring line prevents the vessel from surging forward when alongside?",opts:["Head line","Forward spring","Forward breast line","Stern line"],correct:1,exp:"The forward spring runs from the forward area aft along the quay. It is the line that resists forward surge. The head line, by contrast, prevents the vessel ranging astern."},
      {q:"In what order should lines be secured during a standard berthing?",opts:["Breast lines → Springs → Head/Stern","Head → Springs → Breast lines → Stern","Stern → Breast lines → Head","Springs → Head → Stern → Breast lines"],correct:1,exp:"Standard order: Head (to stop the vessel) → Forward and aft springs (longitudinal control) → Breast lines (lateral control) → Stern (full security). This order ensures progressive control of the vessel."},
      {q:"What is a fender?",opts:["A type of nautical knot","A device absorbing shocks between vessel and quay","A navigation instrument","A safety mooring line"],correct:1,exp:"A fender is a device (rubber, polyethylene or foam) placed between the vessel's side and the quay to absorb shocks and protect the hull from damage caused by contact."},
      {q:"When 'working on the aft spring', what moves away from the quay?",opts:["The stern","The bow","The midship section","Nothing — vessel stays parallel"],correct:1,exp:"Working on the aft spring with ahead engine, the stern stays against the quay (held by the spring) while the bow progressively moves away due to the couple effect. It is the bow that swings out."},
      {q:"What is the name of the mooring technique with the stern to the quay and anchor ahead?",opts:["Tandem mooring","Alongside mooring","Mediterranean mooring (Med-moor)","Box mooring"],correct:2,exp:"Mediterranean mooring (Med-moor) involves dropping the anchor ahead then backing stern-to the quay. Widely used in the Mediterranean where berths are often perpendicular to the quay."},
    ],
    es:[
      {q:"¿Qué estacha evita que el buque avance cuando está atracado?",opts:["Estacha de proa","Espía de proa","Traviesa de proa","Estacha de popa"],correct:1,exp:"La espía de proa (forward spring) va desde la zona de proa hacia popa del muelle. Es la que resiste el movimiento de avance (surge). La estacha de proa, por el contrario, evita que el buque vaya a popa."},
      {q:"¿En qué orden deben darse las estachas en un atraque estándar?",opts:["Traviesas → Espías → Proa/Popa","Proa → Espías → Traviesas → Popa","Popa → Traviesas → Proa","Espías → Proa → Popa → Traviesas"],correct:1,exp:"Orden estándar: Proa (para parar el buque) → Espías de proa y popa (control longitudinal) → Traviesas (control lateral) → Popa (seguridad completa). Este orden garantiza un control progresivo del buque."},
      {q:"¿Qué es una defensa (fender)?",opts:["Un tipo de nudo marinero","Un dispositivo que absorbe los choques entre el buque y el muelle","Un instrumento de navegación","Una estacha de seguridad"],correct:1,exp:"Una defensa es un dispositivo (de goma, polietileno o espuma) colocado entre el costado del buque y el muelle para absorber los choques y proteger el casco de daños por contacto."},
      {q:"Al 'trabajar sobre la espía de popa', ¿qué se aleja del muelle?",opts:["La popa","La proa (bow)","El centro del buque","Nada — el buque permanece paralelo"],correct:1,exp:"Trabajando sobre la espía de popa con máquina avante, la popa permanece contra el muelle (retenida por la espía) mientras la proa se aleja progresivamente por el efecto del par creado. Es la proa la que se aleja."},
      {q:"¿Cómo se llama la técnica de amarre con la popa al muelle y el ancla por la proa?",opts:["Amarre en tándem","Amarre por el costado","Amarre mediterráneo (Med-moor)","Amarre en caja"],correct:2,exp:"El amarre mediterráneo (Med-moor) consiste en fondear el ancla por la proa y luego ciar con la popa al muelle. Muy usado en el Mediterráneo donde los puestos de amarre son a menudo perpendiculares al muelle."},
    ],
    pt:[
      {q:"Qual cabo evita que o navio avance quando está atracado?",opts:["Amarra de vante","Espreguia de vante","Travessa de vante","Amarra de ré"],correct:1,exp:"A espreguia de vante vai desde a área de proa para ré ao longo do cais. É ela que resiste ao movimento de avanço (surge). A amarra de vante, pelo contrário, evita que o navio vá para ré."},
      {q:"Por que ordem devem ser dados os cabos numa atracação padrão?",opts:["Travessas → Espreguias → Vante/Ré","Vante → Espreguias → Travessas → Ré","Ré → Travessas → Vante","Espreguias → Vante → Ré → Travessas"],correct:1,exp:"Ordem padrão: Vante (para travar o navio) → Espreguias de vante e ré (controlo longitudinal) → Travessas (controlo lateral) → Ré (segurança completa). Esta ordem garante controlo progressivo do navio."},
      {q:"O que é uma defensa (fender)?",opts:["Um tipo de nó marinheiro","Um dispositivo que absorve os choques entre o navio e o cais","Um instrumento de navegação","Um cabo de segurança"],correct:1,exp:"Uma defensa é um dispositivo (em borracha, polietileno ou espuma) colocado entre o bordo do navio e o cais para absorver os choques e proteger o casco de danos causados pelo contacto."},
      {q:"Ao 'trabalhar na espreguia de ré', o que se afasta do cais?",opts:["A popa","A proa (bow)","O meio do navio","Nada — o navio fica paralelo"],correct:1,exp:"Trabalhando na espreguia de ré com máquina avante, a popa fica contra o cais (retida pela espreguia) enquanto a proa se afasta progressivamente pelo efeito do binário criado. É a proa que se afasta."},
      {q:"Como se chama a técnica de amarração com a popa ao cais e a âncora pela proa?",opts:["Amarração em tandem","Amarração por bordo","Amarração mediterrânea (Med-moor)","Amarração em caixa"],correct:2,exp:"A amarração mediterrânea (Med-moor) consiste em fundear a âncora pela proa e depois ciar com a popa ao cais. Muito usado no Mediterrâneo onde os postos de atracação são frequentemente perpendiculares ao cais."},
    ],
  };
  return quizzes[lang]||quizzes.fr;
}

function BankTab({ lang }: { lang: string }) {
  const bank = getBank(lang);
  const [open,setOpen] = useState<number|null>(null);
  const [showAns,setShowAns] = useState<Record<number,boolean>>({});
  const L:any={fr:{title:"Banque de questions",show:"Voir la réponse",hide:"Masquer"},en:{title:"Question Bank",show:"Show answer",hide:"Hide"},es:{title:"Banco de preguntas",show:"Ver respuesta",hide:"Ocultar"},pt:{title:"Banco de questões",show:"Ver resposta",hide:"Ocultar"}};
  const l=L[lang]||L.fr;
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,marginBottom:14}}>📚 {l.title}</div>
      {bank.map((item:any,i:number)=>(
        <div key={i} style={{marginBottom:8,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${C.line}22`,overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 14px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10}}>
            <span style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.line,fontWeight:700,marginRight:6}}>Q{i+1}.</span>{item.q}</span>
            <span style={{color:C.line,fontSize:14,flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{padding:"0 14px 12px"}}>
              <button onClick={()=>setShowAns(p=>({...p,[i]:!p[i]}))} style={{padding:"6px 12px",borderRadius:8,fontSize:10,cursor:"pointer",background:showAns[i]?`${C.line}22`:"rgba(255,255,255,0.05)",border:`1px solid ${showAns[i]?C.line:"rgba(255,255,255,0.12)"}`,color:showAns[i]?C.line:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{showAns[i]?l.hide:l.show}</button>
              {showAns[i]&&<div style={{marginTop:8,padding:10,borderRadius:8,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.line}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{item.a}</div>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function QuizTab({ lang, onComplete }:{ lang:string; onComplete:(xp:number)=>void }) {
  const quiz=getQuiz(lang);
  const [cur,setCur]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [confirmed,setConfirmed]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const t=T[lang]||T.fr;
  const L:any={fr:{submit:"Valider",next:"Suivant →",finish:"Terminer",correct:"✅ Correct !",wrong:"❌ Incorrect",xpLabel:"XP obtenus",summary:"Tu as appris",retry:"Recommencer"},en:{submit:"Submit",next:"Next →",finish:"Finish",correct:"✅ Correct!",wrong:"❌ Incorrect",xpLabel:"XP earned",summary:"You learned",retry:"Retry"},es:{submit:"Validar",next:"Siguiente →",finish:"Terminar",correct:"✅ ¡Correcto!",wrong:"❌ Incorrecto",xpLabel:"XP obtenidos",summary:"Aprendiste",retry:"Reintentar"},pt:{submit:"Validar",next:"Seguinte →",finish:"Terminar",correct:"✅ Correto!",wrong:"❌ Incorreto",xpLabel:"XP obtidos",summary:"Você aprendeu",retry:"Recomeçar"}};
  const l=L[lang]||L.fr;
  const xpMap:Record<number,number>={5:200,4:180,3:120};
  const xp=xpMap[score]||60;
  const optColors=["#7eb8d4","#c8a96e","#6dbf8a","#9b59b6"];

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:36,fontWeight:900,color:C.gold2,marginBottom:4}}>{xp}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{l.xpLabel}</div>
        <div style={{marginTop:8,fontSize:14,color:"#f0f4ff",fontFamily:"Courier New"}}>Score : {score}/{quiz.length}</div>
      </div>
      <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.gold}44`,padding:14,marginBottom:16}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.gold,marginBottom:10}}>✦ {l.summary}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.gold,flexShrink:0}}>✦</span><span>{k}</span>
          </div>
        ))}
      </div>
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#c9922a,#e8b94f)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>⚓ {l.finish}</button>
      <button onClick={()=>{setCur(0);setSelected(null);setConfirmed(false);setScore(0);setDone(false);}} style={{width:"100%",padding:"12px 0",marginTop:8,border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,background:"none",color:"rgba(240,244,255,0.45)",fontSize:12,cursor:"pointer",fontFamily:"Courier New"}}>{l.retry}</button>
    </div>
  );

  const q=quiz[cur];
  const isCorrect=selected===q.correct;
  const handleConfirm=()=>{if(selected===null)return;setConfirmed(true);if(isCorrect)setScore(s=>s+1);};
  const handleNext=()=>{if(cur+1>=quiz.length){setDone(true);return;}setCur(c=>c+1);setSelected(null);setConfirmed(false);};

  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontSize:11,color:"rgba(240,244,255,0.4)",fontFamily:"Courier New"}}>Q{cur+1}/{quiz.length}</div>
        <div style={{fontSize:11,color:C.gold2,fontFamily:"Courier New"}}>⭐ {score}/{quiz.length}</div>
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.line},${C.gold})`,width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:12,borderRadius:10,background:`${C.navy2}cc`,border:`1px solid ${C.line}22`}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
        {q.opts.map((opt:string,i:number)=>{
          let border=`1px solid ${optColors[i]}44`,bg=`${optColors[i]}11`;
          if(confirmed){if(i===q.correct){border="2px solid #4ade80";bg="rgba(74,222,128,0.12)";}else if(i===selected&&!isCorrect){border="2px solid #ef4444";bg="rgba(239,68,68,0.12)";}}
          else if(selected===i){border=`2px solid ${optColors[i]}`;bg=`${optColors[i]}22`;}
          return(
            <button key={i} disabled={confirmed} onClick={()=>setSelected(i)} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:12,border,background:bg,cursor:confirmed?"default":"pointer",color:"#f0f4ff",textAlign:"left"}}>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:optColors[i],flexShrink:0}}>{String.fromCharCode(65+i)}</span>
              <span style={{fontSize:12,fontFamily:"Courier New",lineHeight:1.4}}>{opt}</span>
            </button>
          );
        })}
      </div>
      {confirmed&&<div style={{padding:10,borderRadius:10,marginBottom:12,background:isCorrect?"rgba(74,222,128,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${isCorrect?"#4ade80":"#ef4444"}44`,fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.6}}><div style={{fontWeight:700,marginBottom:4,color:isCorrect?"#4ade80":"#ef4444"}}>{isCorrect?l.correct:l.wrong}</div>{q.exp}</div>}
      {!confirmed
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?`linear-gradient(135deg,${C.line},${C.gold})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{l.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.line},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?l.finish:l.next}</button>
      }
    </div>
  );
}

export default function LessonSEA_L4({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.line}33`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.line,marginBottom:2}}>{t.moduleLabel} · L4</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0f4ff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
          </div>
          <div style={{fontSize:11,color:C.gold2,fontFamily:"Courier New",flexShrink:0}}>{progress}%</div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${C.line},${C.gold})`,width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:`${C.gold}18`,border:`1px solid ${C.gold}44`}}>
          <span style={{fontSize:12}}>⚓</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:C.gold,letterSpacing:1}}>SEAMANSHIP · PREMIUM</span>
        </div>
      </div>
      <div style={{display:"flex",padding:"10px 14px 0",gap:6,overflowX:"auto"}}>
        {t.tabs.map((label:string,i:number)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",borderRadius:10,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",background:tab===i?`${C.line}22`:"rgba(255,255,255,0.04)",border:`1px solid ${tab===i?C.line:"rgba(255,255,255,0.1)"}`,color:tab===i?C.line:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{label}</button>
        ))}
      </div>
      <div>
        {tab===0&&<ContentTab lang={lang}/>}
        {tab===1&&<PracticeTab lang={lang}/>}
        {tab===2&&<BankTab lang={lang}/>}
        {tab===3&&<QuizTab lang={lang} onComplete={(xp)=>{if(onComplete)onComplete(xp);}}/>}
      </div>
    </div>
  );
}
