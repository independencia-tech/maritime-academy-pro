// LexiqueMaritime.tsx — VERSION 2 — PART 1: Data + Dictionary
import { useState, useMemo } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  safe:"#6dbf8a", danger:"#f97316",
  purple:"#9b59b6", teal:"#0a8a6c",
  orange:"#e67e22", red:"#e74c3c",
};

// ── CATEGORIES ────────────────────────────────────────────────
const CATS: Record<string,{label:Record<string,string>;color:string;icon:string}> = {
  anatomie:  {label:{fr:"Anatomie",en:"Anatomy",es:"Anatomía",pt:"Anatomia"},color:"#7eb8d4",icon:"🚢"},
  navigation:{label:{fr:"Navigation",en:"Navigation",es:"Navegación",pt:"Navegação"},color:"#4da6ff",icon:"🧭"},
  amarrage:  {label:{fr:"Amarrage",en:"Mooring",es:"Amarre",pt:"Amarração"},color:"#6dbf8a",icon:"⚓"},
  ancrage:   {label:{fr:"Ancrage",en:"Anchoring",es:"Fondeo",pt:"Fundeio"},color:"#c8a96e",icon:"🔱"},
  stabilite: {label:{fr:"Stabilité",en:"Stability",es:"Estabilidad",pt:"Estabilidade"},color:"#e8b94f",icon:"⚖️"},
  cordage:   {label:{fr:"Cordages",en:"Ropes & Rigging",es:"Cabos",pt:"Cabos"},color:"#94a3b8",icon:"🪢"},
  manoeuvre: {label:{fr:"Manœuvre",en:"Manoeuvre",es:"Maniobra",pt:"Manobra"},color:"#f97316",icon:"🔄"},
  securite:  {label:{fr:"Sécurité",en:"Safety",es:"Seguridad",pt:"Segurança"},color:"#c084fc",icon:"🛟"},
  machine:   {label:{fr:"Machine",en:"Engine Room",es:"Máquinas",pt:"Máquinas"},color:"#e67e22",icon:"⚙️"},
  reglementation:{label:{fr:"Réglementation",en:"Regulations",es:"Reglamentación",pt:"Regulamentação"},color:"#e8b94f",icon:"⚖️"},
  meteorologie:{label:{fr:"Météorologie",en:"Meteorology",es:"Meteorología",pt:"Meteorologia"},color:"#0a8a6c",icon:"🌦️"},
  smcp:{label:{fr:"Communication (SMCP)",en:"Communication (SMCP)",es:"Comunicación (SMCP)",pt:"Comunicação (SMCP)"},color:"#38bdf8",icon:"📻"},
};

// ── LEXICON — 150+ TERMS ──────────────────────────────────────
// ── LEXICON ENTRY SHAPE ────────────────────────────────────────
// V1 : uniquement les champs ci-dessous marqués "V1 actif" sont utilisés par l'interface.
// Les champs suivants sont préparés pour la V2/V3 (voir vision Learning Hub) mais
// restent INACTIFS et NON PEUPLÉS en V1 — aucune dépendance vers lessonRegistry,
// rankRegistry, vesselTypeRegistry, examRegistry, badgeRegistry ou certificateRegistry
// tant que ces registries ne sont pas officiellement créés dans MAP.
// Ne pas utiliser ces champs dans le rendu tant que cette note n'est pas retirée.
interface LexiconEntry {
  // — V1 actif —
  en: string;
  fr: string;
  es: string;
  pt: string;
  cat: string;
  def_fr: string;
  def_en: string;
  def_es?: string;
  def_pt?: string;

  // — V2/V3 : préparation Learning Hub (optionnels, vides par défaut, non utilisés en V1) —
  location?: string;                 // "Où se trouve-t-il ?" — ex: "Forecastle Deck (Bow)"
  usedByRanks?: string[];             // DÉCISION ARCHITECTURALE (figée) : ce champ ne fait plus partie de
                                      // l'architecture fonctionnelle du Lexique. Le rang concerné se déduit
                                      // via lessonReferences → lessonRegistry.targetRanks (une seule source
                                      // de vérité, pas de duplication avec rankRegistry). Conservé ici vide,
                                      // uniquement pour compatibilité — ne jamais le peupler ni le consommer.
  usedDuring?: string[];              // "Utilisé pendant quelle opération ?" — ex: ["Anchoring","Emergency Anchoring"]
  vesselTypes?: string[];             // Futur vesselTypeRegistry (VesselTypeId[] au typage définitif) —
                                      // type(s) de navire concerné(s). Nécessaire car une connexion
                                      // Lexique → Ships Library peut exister indépendamment de toute leçon
                                      // (ex: "Shark Jaw" → AHTS, "Sea Painter" → Lifeboat). Vide et inactif
                                      // jusqu'à la V3 — ne pas peupler ni consommer en V1/V2.
  relatedTerms?: string[];            // Termes associés — ex: ["Windlass","Hawse Pipe","Chain Locker"]
  difficulty?: "basic" | "intermediate" | "advanced"; // Niveau pédagogique 🟢🟡🔴
  pronunciation?: string;             // IPA — ex: "/ˈbʌlkhed/"
  example?: string;                   // Phrase d'usage réel en contexte professionnel
  imageRef?: string;                  // Référence image
  svgRef?: string;                    // Référence schéma/SVG interactif
  lessonReferences?: string[];        // Futur lessonRegistry — IDs de leçons où le terme apparaît
  moduleReferences?: string[];        // Futur lessonRegistry — IDs de modules/départements
  stcwReferences?: string[];          // Références STCW associées
  searchKeywords?: string[];          // Mots-clés/synonymes pour la recherche intelligente multilingue
  synonyms?: string[];                // Synonymes ou variantes du terme
  badges?: string[];                  // Futur badgeRegistry — badges liés à ce terme
  reviewPriority?: number;            // Futur système de révision espacée
}

const LEXICON: LexiconEntry[] = [
  // ── ANATOMIE ──────────────────────────────────────────────
  {en:"Bow",fr:"Proue / Étrave",es:"Proa",pt:"Proa",cat:"anatomie",
   def_fr:"Partie avant du navire qui fend l'eau. L'étrave est la pièce structurale d'extrémité avant.",
   def_en:"Forward part of the vessel cutting through the water. The stem is the structural end piece."},
  {en:"Stern",fr:"Poupe",es:"Popa",pt:"Popa",cat:"anatomie",
   def_fr:"Partie arrière du navire, à l'opposé de la proue.",
   def_en:"Rear part of the vessel, opposite the bow."},
  {en:"Port side",fr:"Bâbord",es:"Babor",pt:"Bombordo",cat:"anatomie",
   def_fr:"Côté gauche du navire quand on regarde vers l'avant. Feux de côté : rouge.",
   def_en:"Left side of the vessel when facing forward. Side light colour: red."},
  {en:"Starboard",fr:"Tribord",es:"Estribor",pt:"Estibordo",cat:"anatomie",
   def_fr:"Côté droit du navire quand on regarde vers l'avant. Feux de côté : vert.",
   def_en:"Right side of the vessel when facing forward. Side light colour: green."},
  {en:"Keel",fr:"Quille",es:"Quilla",pt:"Quilha",cat:"anatomie",
   def_fr:"Pièce axiale longitudinale formant la colonne vertébrale du navire ; point le plus bas de la coque.",
   def_en:"Longitudinal axial member forming the vessel's backbone; lowest point of the hull."},
  {en:"Hull",fr:"Coque",es:"Casco",pt:"Casco",cat:"anatomie",
   def_fr:"Structure principale du navire comprenant le fond, les flancs (bordé) et le pont.",
   def_en:"Main structure of the vessel including the bottom, sides (shell plating) and deck."},
  {en:"Deck",fr:"Pont",es:"Cubierta",pt:"Convés",cat:"anatomie",
   def_fr:"Plancher horizontal du navire constituant chaque niveau de la structure.",
   def_en:"Horizontal floor of the vessel constituting each level of the structure."},
  {en:"Bridge",fr:"Passerelle de navigation",es:"Puente de mando",pt:"Passadiço de navegação",cat:"anatomie",
   def_fr:"Superstructure surélevée d'où le navire est commandé et navigué. Aussi appelée 'passerelle'.",
   def_en:"Elevated superstructure from which the vessel is commanded and navigated."},
  {en:"Hold",fr:"Cale",es:"Bodega",pt:"Porão",cat:"anatomie",
   def_fr:"Compartiment intérieur sous le pont principal destiné au stockage de la cargaison.",
   def_en:"Interior compartment below the main deck for cargo storage."},
  {en:"Bilge",fr:"Sentine / Cale",es:"Sentina",pt:"Sentina",cat:"anatomie",
   def_fr:"Partie la plus basse de la coque où s'accumulent les eaux de ruissellement et fuites.",
   def_en:"Lowest part of the hull where seepage and leakage water accumulates."},
  {en:"Bulkhead",fr:"Cloison",es:"Mamparo",pt:"Antepara",cat:"anatomie",
   def_fr:"Paroi verticale interne divisant le navire en compartiments — étanche ou non.",
   def_en:"Internal vertical wall dividing the vessel into compartments — watertight or not."},
  {en:"Forecastle (fo'c'sle)",fr:"Gaillard d'avant",es:"Castillo de proa",pt:"Castelo de proa",cat:"anatomie",
   def_fr:"Superstructure surélevée à l'avant où se trouvent les équipements de mouillage.",
   def_en:"Raised forward superstructure housing the anchoring equipment."},
  {en:"Poop deck",fr:"Dunette / Plage arrière",es:"Toldilla",pt:"Tombadilho",cat:"anatomie",
   def_fr:"Pont surélevé à l'arrière du navire, au-dessus de la poupe.",
   def_en:"Raised deck at the stern, above the poop."},
  {en:"Hatch",fr:"Écoutille",es:"Escotilla",pt:"Escotilha",cat:"anatomie",
   def_fr:"Ouverture rectangulaire dans le pont donnant accès aux cales ou espaces inférieurs.",
   def_en:"Rectangular opening in the deck giving access to holds or lower spaces."},
  {en:"Funnel",fr:"Cheminée",es:"Chimenea",pt:"Chaminé",cat:"anatomie",
   def_fr:"Tuyau d'évacuation des gaz d'échappement du moteur, généralement peint aux couleurs de la compagnie.",
   def_en:"Exhaust pipe for engine gases, usually painted in company colours."},
  {en:"Mast",fr:"Mât",es:"Mástil",pt:"Mastro",cat:"anatomie",
   def_fr:"Structure verticale portant les feux de navigation, antennes et équipements de signalisation.",
   def_en:"Vertical structure carrying navigation lights, antennas and signalling equipment."},
  {en:"Rudder",fr:"Gouvernail",es:"Timón",pt:"Leme",cat:"anatomie",
   def_fr:"Surface mobile à l'arrière du navire qui oriente le flux d'eau pour diriger le navire.",
   def_en:"Movable surface at the stern orienting water flow to steer the vessel."},
  {en:"Propeller",fr:"Hélice",es:"Hélice",pt:"Hélice",cat:"anatomie",
   def_fr:"Organe de propulsion rotatif convertissant l'énergie du moteur en poussée.",
   def_en:"Rotating propulsion organ converting engine power into thrust."},
  {en:"Bow thruster",fr:"Propulseur d'étrave",es:"Propulsor de proa",pt:"Propulsor de proa",cat:"anatomie",
   def_fr:"Hélice transversale dans le bulbe de l'étrave facilitant les manœuvres en port.",
   def_en:"Transverse propeller in the bow bulb aiding port manoeuvres."},
  {en:"Shaft",fr:"Ligne d'arbres",es:"Línea de ejes",pt:"Linha de veios",cat:"anatomie",
   def_fr:"Ensemble des arbres transmettant la puissance du moteur à l'hélice.",
   def_en:"Series of shafts transmitting engine power to the propeller."},
  {en:"Superstructure",fr:"Superstructure",es:"Superestructura",pt:"Superestrutura",cat:"anatomie",
   def_fr:"Ensemble des constructions au-dessus du pont principal : passerelle, cabines, cheminée.",
   def_en:"All structures above the main deck: bridge, cabins, funnel."},
  {en:"Waterline",fr:"Ligne de flottaison",es:"Línea de flotación",pt:"Linha de flutuação",cat:"anatomie",
   def_fr:"Ligne à la surface de l'eau marquant la limite entre partie immergée et émergée de la coque.",
   def_en:"Line at the water surface marking the boundary between submerged and emerged hull."},
  {en:"Hawse pipe",fr:"Écubier",es:"Escobén",pt:"Escovém",cat:"anatomie",
   def_fr:"Tube en acier traversant l'étrave par lequel passe la chaîne d'ancre. Guide la chaîne vers le pont avant.",
   def_en:"Steel tube through the bow through which the anchor chain passes to the foredeck."},
  {en:"Accommodation",fr:"Logements / Habitacle",es:"Alojamientos",pt:"Alojamentos",cat:"anatomie",
   def_fr:"Espaces de vie réservés à l'équipage : cabines, carré, cuisine, infirmerie.",
   def_en:"Living spaces reserved for crew: cabins, mess room, galley, sick bay."},
  {en:"Gangway",fr:"Passerelle d'embarquement / Coupée",es:"Pasarela de embarque",pt:"Passadiço de embarque",cat:"anatomie",
   def_fr:"Passerelle mobile reliant le navire au quai. La coupée est l'ouverture dans le flanc du navire.",
   def_en:"Movable bridge connecting vessel to quay. The entry port is the opening in the vessel's side."},

  // ── NAVIGATION ────────────────────────────────────────────
  {en:"Bearing",fr:"Relèvement",es:"Marcación",pt:"Marcação",cat:"navigation",
   def_fr:"Angle entre le nord et la direction d'un objet, mesuré en degrés (000 à 360).",
   def_en:"Angle between north and the direction of an object, measured in degrees (000 to 360)."},
  {en:"Heading",fr:"Cap",es:"Rumbo proa",pt:"Proa",cat:"navigation",
   def_fr:"Direction dans laquelle pointe l'étrave du navire, exprimée en degrés.",
   def_en:"Direction in which the bow points, expressed in degrees."},
  {en:"Course",fr:"Route",es:"Derrota / Rumbo",pt:"Rumo",cat:"navigation",
   def_fr:"Direction effective suivie par le navire sur le fond, tenant compte du courant et du vent.",
   def_en:"Actual direction followed by the vessel over the ground, accounting for current and wind."},
  {en:"Nautical mile",fr:"Mille nautique",es:"Milla náutica",pt:"Milha náutica",cat:"navigation",
   def_fr:"Unité de distance maritime = 1852 mètres, correspondant à 1 minute d'arc de latitude.",
   def_en:"Maritime distance unit = 1852 metres, corresponding to 1 arc minute of latitude."},
  {en:"Knot (speed)",fr:"Nœud",es:"Nudo",pt:"Nó",cat:"navigation",
   def_fr:"Unité de vitesse maritime = 1 mille nautique par heure (1,852 km/h).",
   def_en:"Maritime speed unit = 1 nautical mile per hour (1.852 km/h)."},
  {en:"Chart",fr:"Carte marine",es:"Carta náutica",pt:"Carta náutica",cat:"navigation",
   def_fr:"Carte spécialisée représentant les fonds marins, les dangers et les aides à la navigation.",
   def_en:"Specialised map showing seabed depths, hazards and navigation aids."},
  {en:"Latitude",fr:"Latitude",es:"Latitud",pt:"Latitude",cat:"navigation",
   def_fr:"Coordonnée angulaire nord-sud, de 0° à l'équateur à 90° aux pôles.",
   def_en:"North-south angular coordinate, from 0° at the equator to 90° at the poles."},
  {en:"Longitude",fr:"Longitude",es:"Longitud",pt:"Longitude",cat:"navigation",
   def_fr:"Coordonnée angulaire est-ouest, de 0° au méridien de Greenwich à 180°.",
   def_en:"East-west angular coordinate, from 0° at Greenwich meridian to 180°."},
  {en:"Waypoint",fr:"Point de route",es:"Punto de derrota",pt:"Ponto de rota",cat:"navigation",
   def_fr:"Position géographique définie sur la route du navire, programmée dans le GPS/ECDIS.",
   def_en:"Geographic position defined on the vessel's route, programmed in GPS/ECDIS."},
  {en:"Radar",fr:"Radar",es:"Radar",pt:"Radar",cat:"navigation",
   def_fr:"Système de détection par ondes radio permettant de localiser navires, côtes et obstacles.",
   def_en:"Radio wave detection system for locating vessels, coastlines and obstacles."},
  {en:"AIS",fr:"AIS (Système d'Identification Automatique)",es:"AIS",pt:"AIS",cat:"navigation",
   def_fr:"Transpondeur VHF échangeant automatiquement la position, vitesse et identité des navires.",
   def_en:"VHF transponder automatically exchanging position, speed and identity of vessels."},
  {en:"ECDIS",fr:"ECDIS (Système de Cartes Électroniques)",es:"ECDIS",pt:"ECDIS",cat:"navigation",
   def_fr:"Système de navigation intégrant cartes électroniques officielles, GPS et radar.",
   def_en:"Navigation system integrating official electronic charts, GPS and radar."},
  {en:"Buoy",fr:"Bouée",es:"Boya",pt:"Boia",cat:"navigation",
   def_fr:"Flotteur ancré signalant un danger, un chenal ou délimitant une zone de navigation.",
   def_en:"Anchored float marking a hazard, channel or navigation zone boundary."},
  {en:"Lighthouse",fr:"Phare",es:"Faro",pt:"Farol",cat:"navigation",
   def_fr:"Tour lumineuse fixe signalant les côtes, les dangers et les entrées de port.",
   def_en:"Fixed light tower marking coastlines, hazards and port entrances."},
  {en:"Lee side",fr:"Côté sous le vent",es:"Sotavento",pt:"Sotavento",cat:"navigation",
   def_fr:"Côté du navire ou d'une île abrité du vent dominant.",
   def_en:"Side of the vessel or island sheltered from the prevailing wind."},
  {en:"Windward",fr:"Côté au vent",es:"Barlovento",pt:"Barlavento",cat:"navigation",
   def_fr:"Côté exposé au vent, d'où vient le vent.",
   def_en:"Side exposed to the wind, from which the wind blows."},
  {en:"Line of sight (Ligne de foi)",fr:"Ligne de foi",es:"Línea de fe",pt:"Linha de fé",cat:"navigation",
   def_fr:"Ligne gravée dans le compas indiquant le cap du navire. Repère fixe aligné sur l'axe du navire.",
   def_en:"Line engraved in the compass indicating the vessel's heading. Fixed mark aligned with the vessel's axis."},
  {en:"Pilot",fr:"Pilote",es:"Práctico",pt:"Prático",cat:"navigation",
   def_fr:"Professionnel local embarqué pour guider le navire dans les eaux côtières ou portuaires.",
   def_en:"Local professional embarked to guide the vessel in coastal or port waters."},
  {en:"Tug",fr:"Remorqueur",es:"Remolcador",pt:"Rebocador",cat:"navigation",
   def_fr:"Petit navire puissant assistant les grands navires lors des manœuvres portuaires.",
   def_en:"Powerful small vessel assisting large ships during port manoeuvres."},
  {en:"Wake",fr:"Sillage",es:"Estela",pt:"Esteira",cat:"navigation",
   def_fr:"Perturbation de l'eau laissée derrière le navire en mouvement.",
   def_en:"Water disturbance left behind a moving vessel."},

  // ── AMARRAGE ──────────────────────────────────────────────
  {en:"Bollard",fr:"Bitte d'amarrage / Bollard",es:"Bolardo / Noray",pt:"Bolardo / Cabeço",cat:"amarrage",
   def_fr:"Poteau en acier ou fonte fixé au quai pour recevoir les boucles (gazas) des amarres.",
   def_en:"Steel or cast-iron post fixed to the quay to receive the eyes of mooring lines."},
  {en:"Cleat",fr:"Taquet",es:"Cornamusa",pt:"Cunho",cat:"amarrage",
   def_fr:"Dispositif en T sur lequel on tourne une amarre en huit pour la bloquer solidement.",
   def_en:"T-shaped fitting on which a line is figure-eighted to secure it firmly."},
  {en:"Fairlead",fr:"Chaumard",es:"Guiacabos",pt:"Guia-cabos",cat:"amarrage",
   def_fr:"Guide-câble fixé sur le plat-bord orientant les amarres vers le quai sans usure excessive.",
   def_en:"Cable guide on the rail directing mooring lines to the quay without excessive wear."},
  {en:"Capstan",fr:"Cabestan",es:"Cabestrante",pt:"Cabrestante",cat:"amarrage",
   def_fr:"Treuil rotatif vertical servant à virer les amarres et les chaînes sous tension.",
   def_en:"Vertical rotating winch used to heave mooring lines and chains under tension."},
  {en:"Mooring winch",fr:"Treuil d'amarrage",es:"Molinete de amarre",pt:"Guincho de amarração",cat:"amarrage",
   def_fr:"Treuil motorisé horizontal pour virer et filer les amarres. Peut avoir une fonction auto-tension.",
   def_en:"Motorised horizontal winch for heaving and veering mooring lines. May have auto-tension function."},
  {en:"Fender",fr:"Défense",es:"Defensa",pt:"Defensa",cat:"amarrage",
   def_fr:"Dispositif absorbant les chocs entre le flanc du navire et le quai ou un autre navire.",
   def_en:"Device absorbing shocks between the vessel's side and the quay or another vessel."},
  {en:"Head line",fr:"Amarre de tête",es:"Estacha de proa",pt:"Amarra de vante",cat:"amarrage",
   def_fr:"Amarre partant de l'étrave vers l'avant du quai, empêchant le navire de reculer.",
   def_en:"Line running forward from the bow, preventing the vessel ranging astern."},
  {en:"Stern line",fr:"Amarre de queue",es:"Estacha de popa",pt:"Amarra de ré",cat:"amarrage",
   def_fr:"Amarre partant de la poupe vers l'arrière du quai, empêchant la poupe d'avancer.",
   def_en:"Line running aft from the stern, preventing the stern swinging forward."},
  {en:"Spring line",fr:"Garde",es:"Espía",pt:"Espreguia",cat:"amarrage",
   def_fr:"Amarre oblique longitudinale contrôlant le mouvement avant/arrière du navire à quai.",
   def_en:"Oblique longitudinal line controlling the vessel's fore-and-aft movement when alongside."},
  {en:"Breast line",fr:"Traversière",es:"Traviesa",pt:"Travessa",cat:"amarrage",
   def_fr:"Amarre courte et perpendiculaire maintenant le bord du navire contre le quai.",
   def_en:"Short perpendicular line holding the vessel's side against the quay."},
  {en:"Mooring line / Hawser",fr:"Amarre / Aussière",es:"Estacha",pt:"Amarra",cat:"amarrage",
   def_fr:"Câble ou cordage utilisé pour amarrer un navire. L'aussière désigne une amarre de gros diamètre.",
   def_en:"Cable or rope used to moor a vessel. A hawser is a large-diameter mooring line."},
  {en:"Eye (of a line)",fr:"Gaza / Œil d'amarre",es:"Gaza",pt:"Gaza",cat:"amarrage",
   def_fr:"Boucle permanente à l'extrémité d'une amarre, passée sur un bollard sans nœud.",
   def_en:"Permanent loop at the end of a mooring line, placed over a bollard without a knot."},
  {en:"Ridoir",fr:"Ridoir",es:"Tensor",pt:"Tensor",cat:"amarrage",
   def_fr:"Dispositif à vis permettant de régler et tendre les haubans, étais ou filières.",
   def_en:"Screw device for adjusting and tensioning shrouds, stays or guard rails."},
  {en:"Shackle / Manille",fr:"Manille",es:"Grillete",pt:"Manilha",cat:"amarrage",
   def_fr:"Maillon en U fermé par un axe fileté, reliant chaînes, élingues ou amarres entre elles.",
   def_en:"U-shaped link closed by a threaded pin, connecting chains, slings or lines."},
  {en:"Bitter end",fr:"Bout-de-chaîne",es:"Firme",pt:"Retenida",cat:"amarrage",
   def_fr:"Extrémité intérieure de la chaîne d'ancre fixée au puits à chaîne. Doit toujours être sécurisée.",
   def_en:"Inboard end of the anchor chain secured inside the chain locker. Must always be secured."},
  {en:"Accommodation ladder",fr:"Échelle de coupée",es:"Escala real",pt:"Escada de portaló",cat:"amarrage",
   def_fr:"Escalier amovible fixé sur le flanc du navire pour embarquer et débarquer au mouillage ou à quai.",
   def_en:"Removable stairway fixed to the vessel's side for boarding and disembarking at anchor or alongside."},

  // ── ANCRAGE ───────────────────────────────────────────────
  {en:"Anchor",fr:"Ancre",es:"Ancla",pt:"Âncora",cat:"ancrage",
   def_fr:"Dispositif métallique immergé qui s'accroche au fond pour maintenir le navire immobile.",
   def_en:"Metal device lowered to the seabed to hold the vessel in position."},
  {en:"Anchor chain",fr:"Chaîne d'ancre",es:"Cadena del ancla",pt:"Corrente da âncora",cat:"ancrage",
   def_fr:"Chaîne en acier reliant l'ancre au navire, dont le poids contribue à la tenue par effet caténaire.",
   def_en:"Steel chain linking the anchor to the vessel; its weight aids holding through catenary effect."},
  {en:"Windlass",fr:"Guindeau",es:"Molinete",pt:"Molinete",cat:"ancrage",
   def_fr:"Treuil horizontal motorisé servant à virer (rentrer) et filer (larguer) la chaîne d'ancre.",
   def_en:"Motorised horizontal winch used to heave (take in) and veer (pay out) the anchor chain."},
  {en:"Scope",fr:"Portée de mouillage",es:"Alcance de fondeo",pt:"Alcance de fundeio",cat:"ancrage",
   def_fr:"Longueur de chaîne filée par rapport à la profondeur. Minimum 3×, optimal 5–7× par mauvais temps.",
   def_en:"Chain length paid out relative to depth. Minimum 3×, optimal 5–7× in bad weather."},
  {en:"Fluke",fr:"Patte (ancre)",es:"Uña",pt:"Garra",cat:"ancrage",
   def_fr:"Surface plate de l'ancre qui pénètre dans le fond et génère la tenue.",
   def_en:"Flat surface of the anchor that penetrates the seabed and generates holding power."},
  {en:"Shank",fr:"Verge (ancre)",es:"Caño",pt:"Haste",cat:"ancrage",
   def_fr:"Tige principale de l'ancre reliant la couronne à l'organeau.",
   def_en:"Main rod of the anchor connecting the crown to the ring."},
  {en:"Crown (anchor)",fr:"Couronne (ancre)",es:"Corona",pt:"Coroa",cat:"ancrage",
   def_fr:"Point de jonction des pattes et de la verge. Point d'attache de la ligne d'orin.",
   def_en:"Junction of flukes and shank. Attachment point of the trip line."},
  {en:"Ring (anchor)",fr:"Organeau",es:"Arganeo",pt:"Arganéu",cat:"ancrage",
   def_fr:"Anneau en tête de l'ancre auquel est frappée la chaîne ou le câblot.",
   def_en:"Ring at the head of the anchor to which the chain or rope is attached."},
  {en:"Stock (anchor)",fr:"Jas (ancre)",es:"Cepo",pt:"Cepo",cat:"ancrage",
   def_fr:"Barre transversale forçant la patte à s'orienter vers le fond. Absent sur les ancres sans jas (Hall).",
   def_en:"Crossbar forcing the fluke to orient toward the seabed. Absent on stockless anchors (Hall)."},
  {en:"Trip line",fr:"Ligne d'orin / Orin",es:"Orinque",pt:"Orinque",cat:"ancrage",
   def_fr:"Filin frappé à la couronne de l'ancre permettant de la récupérer en cas de coincement sur le fond.",
   def_en:"Line attached to the anchor crown for recovery if the anchor fouls on the seabed."},
  {en:"Dragging (anchor)",fr:"Chasser sur son ancre",es:"Garrar",pt:"Arrastar a âncora",cat:"ancrage",
   def_fr:"L'ancre perd sa tenue et dérape sur le fond — le navire dérive. Détectable par relèvements fixes.",
   def_en:"The anchor loses hold and drags across the seabed — vessel drifts. Detectable by fixed bearings."},
  {en:"Swinging room",fr:"Chasse de mouillage",es:"Zona de giro",pt:"Espaço de giro",cat:"ancrage",
   def_fr:"Cercle libre autour du point de chute de l'ancre = portée + longueur du navire.",
   def_en:"Clear circle around the anchor drop point = scope + vessel length."},
  {en:"Kedge anchor",fr:"Ancre à jet",es:"Ancla de espía",pt:"Âncora de espia",cat:"ancrage",
   def_fr:"Petite ancre secondaire utilisée pour se déséchouer ou maintenir une position particulière.",
   def_en:"Small secondary anchor used for kedging off a shoal or holding a particular position."},

  // ── STABILITÉ ─────────────────────────────────────────────
  {en:"Draft / Draught",fr:"Tirant d'eau",es:"Calado",pt:"Calado",cat:"stabilite",
   def_fr:"Distance verticale entre la ligne de flottaison et le point le plus bas de la coque.",
   def_en:"Vertical distance between the waterline and the lowest point of the hull."},
  {en:"Freeboard",fr:"Franc-bord",es:"Francobordo",pt:"Bordo livre",cat:"stabilite",
   def_fr:"Distance entre la ligne de flottaison et le pont principal. Détermine la réserve de flottabilité.",
   def_en:"Distance between the waterline and the main deck. Determines the reserve of buoyancy."},
  {en:"Trim",fr:"Assiette",es:"Asiento / Trim",pt:"Assentamento",cat:"stabilite",
   def_fr:"Différence entre le tirant d'eau arrière et avant. Assiette positive = poupe plus enfoncée.",
   def_en:"Difference between aft and forward draught. Positive trim = stern deeper."},
  {en:"Heel",fr:"Gîte",es:"Escora",pt:"Banda",cat:"stabilite",
   def_fr:"Inclinaison transversale du navire sur le côté, mesurée en degrés.",
   def_en:"Transverse inclination of the vessel to one side, measured in degrees."},
  {en:"GM (Metacentric height)",fr:"Hauteur métacentrique (GM)",es:"Altura metacéntrica (GM)",pt:"Altura metacêntrica (GM)",cat:"stabilite",
   def_fr:"Distance entre le centre de gravité G et le métacentre M. Si GM > 0, le navire est stable.",
   def_en:"Distance between centre of gravity G and metacentre M. If GM > 0, vessel is stable."},
  {en:"GZ (Righting lever)",fr:"Bras de levier redressant (GZ)",es:"Brazo adrizante (GZ)",pt:"Braço de endireitamento (GZ)",cat:"stabilite",
   def_fr:"Distance horizontale entre G et la verticale de B quand le navire est incliné. Mesure la force redressante.",
   def_en:"Horizontal distance between G and vertical through B when heeled. Measures righting force."},
  {en:"Displacement",fr:"Déplacement",es:"Desplazamiento",pt:"Deslocamento",cat:"stabilite",
   def_fr:"Poids total du navire égal au poids du volume d'eau déplacée.",
   def_en:"Total weight of the vessel equal to the weight of displaced water."},
  {en:"Deadweight (DWT)",fr:"Port en lourd (DWT)",es:"Peso muerto (DWT)",pt:"Porte em peso (DWT)",cat:"stabilite",
   def_fr:"Capacité maximale de transport = cargaison + carburant + équipage + provisions.",
   def_en:"Maximum carrying capacity = cargo + fuel + crew + stores."},
  {en:"Ballast",fr:"Ballast",es:"Lastre",pt:"Lastro",cat:"stabilite",
   def_fr:"Eau de mer pompée dans les citernes pour ajuster l'assiette, le tirant d'eau et la stabilité.",
   def_en:"Seawater pumped into tanks to adjust trim, draught and stability."},
  {en:"Plimsoll line",fr:"Ligne de charge (Plimsoll)",es:"Línea de carga (Plimsoll)",pt:"Linha de carga (Plimsoll)",cat:"stabilite",
   def_fr:"Marque légale sur la coque indiquant le tirant d'eau maximal selon la zone et la saison.",
   def_en:"Legal mark on the hull indicating maximum authorised draught by zone and season."},
  {en:"Free surface effect",fr:"Effet de surface libre",es:"Efecto de superficie libre",pt:"Efeito de superfície livre",cat:"stabilite",
   def_fr:"Réduction virtuelle de GM causée par les liquides dans les citernes partiellement remplies.",
   def_en:"Virtual reduction of GM caused by liquids in partially filled tanks."},
  {en:"Centre of gravity (G)",fr:"Centre de gravité (G)",es:"Centro de gravedad (G)",pt:"Centro de gravidade (G)",cat:"stabilite",
   def_fr:"Point d'application de la résultante de toutes les forces de gravité agissant sur le navire.",
   def_en:"Point where the resultant of all gravity forces acting on the vessel is applied."},
  {en:"Centre of buoyancy (B)",fr:"Centre de carène (B)",es:"Centro de carena (B)",pt:"Centro de carena (B)",cat:"stabilite",
   def_fr:"Centre géométrique du volume immergé. Se déplace latéralement quand le navire gîte.",
   def_en:"Geometric centre of the submerged volume. Moves laterally when the vessel heels."},

  // ── CORDAGES & GRÉEMENT ───────────────────────────────────
  {en:"Rope / Line",fr:"Cordage / Filin",es:"Cabo / Cordaje",pt:"Cabo / Cordame",cat:"cordage",
   def_fr:"Terme générique pour tout cordage à bord. 'Line' en opération, 'rope' en stock.",
   def_en:"Generic term for any cordage on board. 'Line' when in use, 'rope' when in store."},
  {en:"Hawser",fr:"Aussière",es:"Estacha",pt:"Calabrote",cat:"cordage",
   def_fr:"Gros cordage de manœuvre ou d'amarrage, généralement de plus de 24 mm de diamètre.",
   def_en:"Large manoeuvring or mooring rope, generally more than 24 mm in diameter."},
  {en:"Wire rope",fr:"Câble métallique / Câble en acier",es:"Cable metálico",pt:"Cabo de aço",cat:"cordage",
   def_fr:"Câble composé de torons de fils d'acier torsadés. Plus résistant mais moins élastique que le cordage synthétique.",
   def_en:"Cable composed of twisted steel wire strands. Stronger but less elastic than synthetic rope."},
  {en:"Splice / Épissure",fr:"Épissure",es:"Empalme",pt:"Emenda",cat:"cordage",
   def_fr:"Jonction permanente entre deux cordages ou entre les torons d'un même cordage, sans nœud.",
   def_en:"Permanent junction between two ropes or between the strands of a rope, without a knot."},
  {en:"Eye splice",fr:"Épissure en œil",es:"Empalme en gaza",pt:"Emenda em olhal",cat:"cordage",
   def_fr:"Épissure formant une boucle permanente à l'extrémité d'un cordage.",
   def_en:"Splice forming a permanent loop at the end of a rope."},
  {en:"Whipping",fr:"Surlure",es:"Ligada de cabo",pt:"Surriola",cat:"cordage",
   def_fr:"Enroulement serré de fil fin autour de l'extrémité d'un cordage pour empêcher l'effilochage.",
   def_en:"Tight wrapping of thin twine around a rope end to prevent fraying."},
  {en:"Bight",fr:"Courant (d'un cordage) / Paumelle",es:"Seno",pt:"Seio",cat:"cordage",
   def_fr:"Partie médiane d'un cordage formant une boucle ou une courbe.",
   def_en:"Middle part of a rope forming a loop or curve."},
  {en:"Standing part",fr:"Dormant",es:"Firme",pt:"Seio dormente",cat:"cordage",
   def_fr:"Partie fixe d'un cordage, non soumise au mouvement lors de la manœuvre.",
   def_en:"Fixed part of a rope, not subject to movement during the manoeuvre."},
  {en:"Running part",fr:"Courant",es:"Chicote corriente",pt:"Chicote corrente",cat:"cordage",
   def_fr:"Partie libre et mobile d'un cordage lors de la manœuvre.",
   def_en:"Free and moving part of a rope during the manoeuvre."},
  {en:"Chafing",fr:"Raguer / Ragage",es:"Rozadura",pt:"Rozamento",cat:"cordage",
   def_fr:"Usure par frottement d'un cordage sur une surface dure. À éviter avec des chaumards et défenses.",
   def_en:"Wear by friction of a rope on a hard surface. To be avoided with fairleads and fenders."},
  {en:"Heaving line",fr:"Ligne de jet",es:"Guía de lanzamiento",pt:"Linha de arremesso",cat:"cordage",
   def_fr:"Cordage léger lesté d'un sac de sable (Monkey's fist) lancé à terre pour tirer une amarre.",
   def_en:"Light rope weighted with a monkey's fist, thrown ashore to pull a heavier mooring line."},
  {en:"Messenger",fr:"Aussière de remorquage légère",es:"Guía",pt:"Guia",cat:"cordage",
   def_fr:"Cordage léger passé en premier pour guider et tirer une amarre plus lourde.",
   def_en:"Light line passed first to guide and pull a heavier mooring line."},

  // ── MANŒUVRE ──────────────────────────────────────────────
  {en:"Ahead",fr:"En avant / Avancer",es:"Avante",pt:"Avante",cat:"manoeuvre",
   def_fr:"Mouvement ou direction vers l'avant du navire ; machine avant.",
   def_en:"Movement or direction toward the bow; ahead engine."},
  {en:"Astern",fr:"En arrière / Culer",es:"Atrás / Ciar",pt:"A ré / Ciar",cat:"manoeuvre",
   def_fr:"Mouvement ou direction vers l'arrière du navire ; machine arrière. Culer = reculer.",
   def_en:"Movement or direction toward the stern; astern engine. To go astern."},
  {en:"Surge",fr:"Surgir",es:"Surgir",pt:"Surgir",cat:"manoeuvre",
   def_fr:"Mouvement involontaire du navire vers l'avant quand il est à quai, sous l'effet du courant ou du vent.",
   def_en:"Involuntary forward movement of the vessel when alongside, due to current or wind."},
  {en:"Ranging",fr:"Culer (à quai)",es:"Culear",pt:"Recuar",cat:"manoeuvre",
   def_fr:"Mouvement involontaire du navire vers l'arrière quand il est à quai.",
   def_en:"Involuntary aft movement of the vessel when alongside."},
  {en:"Hard to port",fr:"Barre toute à bâbord",es:"Todo a babor",pt:"Toda a bombordo",cat:"manoeuvre",
   def_fr:"Ordre de barre : mettre le gouvernail à fond à bâbord (la proue vire à bâbord).",
   def_en:"Helm order: put the rudder hard over to port (bow swings to port)."},
  {en:"Hard to starboard",fr:"Barre toute à tribord",es:"Todo a estribor",pt:"Toda a estibordo",cat:"manoeuvre",
   def_fr:"Ordre de barre : mettre le gouvernail à fond à tribord (la proue vire à tribord).",
   def_en:"Helm order: put the rudder hard over to starboard (bow swings to starboard)."},
  {en:"Midships",fr:"Droite (barre)",es:"Al centro",pt:"Ao centro",cat:"manoeuvre",
   def_fr:"Ordre de barre : remettre le gouvernail dans l'axe du navire.",
   def_en:"Helm order: return the rudder to the vessel's centreline."},
  {en:"Cast off",fr:"Larguer / Appareiller",es:"Largar / Zarpar",pt:"Largar / Zarpar",cat:"manoeuvre",
   def_fr:"Larguer les amarres pour appareiller. 'Cast off all lines !'",
   def_en:"Let go the mooring lines to depart. 'Cast off all lines!'"},
  {en:"Make fast",fr:"Frapper / Saisir",es:"Dar / Amarrar",pt:"Dar / Amarrar",cat:"manoeuvre",
   def_fr:"Sécuriser une amarre à un bollard, taquet ou bitte.",
   def_en:"Secure a mooring line to a bollard, cleat or bitt."},
  {en:"Veer",fr:"Filer (la chaîne)",es:"Filar",pt:"Arriar",cat:"manoeuvre",
   def_fr:"Laisser filer la chaîne d'ancre ou une amarre sous contrôle.",
   def_en:"Pay out the anchor chain or a mooring line under control."},
  {en:"Heave",fr:"Virer / Haler",es:"Cobrar / Virar",pt:"Virar / Halar",cat:"manoeuvre",
   def_fr:"Tirer une amarre ou une chaîne pour la rentrer ou la tendre.",
   def_en:"Pull in a mooring line or chain to take it in or tension it."},

  // ── SÉCURITÉ ──────────────────────────────────────────────
  {en:"SOLAS",fr:"SOLAS (Sauvegarde de la Vie en Mer)",es:"SOLAS",pt:"SOLAS",cat:"securite",
   def_fr:"Convention internationale pour la sauvegarde de la vie humaine en mer (IMO).",
   def_en:"International Convention for the Safety of Life at Sea (IMO)."},
  {en:"MARPOL",fr:"MARPOL (Prévention de la Pollution)",es:"MARPOL",pt:"MARPOL",cat:"securite",
   def_fr:"Convention internationale pour la prévention de la pollution par les navires (IMO).",
   def_en:"International Convention for the Prevention of Pollution from Ships (IMO)."},
  {en:"STCW",fr:"STCW (Formation des Gens de Mer)",es:"STCW",pt:"STCW",cat:"securite",
   def_fr:"Convention internationale sur les normes de formation, délivrance des brevets et de veille.",
   def_en:"International Convention on Standards of Training, Certification and Watchkeeping."},
  {en:"COLREG",fr:"COLREG (Règles de Collision)",es:"COLREG",pt:"COLREG",cat:"securite",
   def_fr:"Règlement international pour prévenir les abordages en mer (RIPAM).",
   def_en:"International Regulations for Preventing Collisions at Sea (COLREGs)."},
  {en:"Lifeboat",fr:"Canot de sauvetage",es:"Bote salvavidas",pt:"Bote salva-vidas",cat:"securite",
   def_fr:"Embarcation fermée et insubmersible destinée à l'évacuation du navire en détresse.",
   def_en:"Enclosed unsinkable craft for vessel evacuation in distress."},
  {en:"Life raft",fr:"Radeau de sauvetage",es:"Balsa salvavidas",pt:"Balsa salva-vidas",cat:"securite",
   def_fr:"Radeau gonflable en conteneur étanche, se déployant automatiquement en cas de naufrage.",
   def_en:"Inflatable raft in a watertight container, deploying automatically in case of sinking."},
  {en:"EPIRB",fr:"EPIRB (Radiobalise de Détresse)",es:"EPIRB",pt:"EPIRB",cat:"securite",
   def_fr:"Emergency Position Indicating Radio Beacon — balise flottante émettant en cas de naufrage.",
   def_en:"Emergency Position Indicating Radio Beacon — floating beacon transmitting in case of sinking."},
  {en:"Muster station",fr:"Point de rassemblement",es:"Punto de reunión",pt:"Ponto de reunião",cat:"securite",
   def_fr:"Lieu désigné où équipage et passagers se rassemblent lors d'une alarme d'urgence.",
   def_en:"Designated location where crew and passengers assemble during an emergency alarm."},
  {en:"Man overboard (MOB)",fr:"Homme à la mer (HAM)",es:"Hombre al agua",pt:"Homem ao mar",cat:"securite",
   def_fr:"Urgence : une personne est tombée par-dessus bord. Déclenche une procédure immédiate.",
   def_en:"Emergency: a person has fallen overboard. Triggers an immediate recovery procedure."},
  {en:"Immersion suit",fr:"Combinaison de survie / Scaphandre",es:"Traje de inmersión",pt:"Fato de imersão",cat:"securite",
   def_fr:"Combinaison étanche protégeant contre l'hypothermie en eau froide lors d'un abandon de navire.",
   def_en:"Waterproof suit protecting against hypothermia in cold water during vessel abandonment."},
  {en:"Davit",fr:"Bossoir",es:"Pescante",pt:"Guindaste de embarcação",cat:"securite",
   def_fr:"Bras métallique servant à mettre à l'eau et récupérer les embarcations de sauvetage.",
   def_en:"Metal arm used to launch and recover survival craft."},
  {en:"Fire extinguisher",fr:"Extincteur",es:"Extintor",pt:"Extintor",cat:"securite",
   def_fr:"Appareil portable projetant un agent extincteur (CO2, poudre, mousse) pour combattre un feu.",
   def_en:"Portable device projecting an extinguishing agent (CO2, powder, foam) to fight a fire."},
  {en:"GMDSS (Global Maritime Distress and Safety System)",fr:"GMDSS (Système mondial de détresse et de sécurité en mer)",es:"GMDSS (Sistema mundial de socorro y seguridad marítima)",pt:"GMDSS (Sistema mundial de socorro e segurança marítima)",cat:"securite",
   def_fr:"Ensemble international de procédures et d'équipements de communication garantissant l'alerte et le secours des navires en détresse.",
   def_en:"International set of communication procedures and equipment ensuring alert and rescue of ships in distress.",
   def_es:"Conjunto internacional de procedimientos y equipos de comunicación que garantizan la alerta y el rescate de buques en peligro.",
   def_pt:"Conjunto internacional de procedimentos e equipamentos de comunicação que garantem o alerta e o socorro de navios em perigo.",
   difficulty:"basic",relatedTerms:["SART","DSC"]},
  {en:"SART (Search and Rescue Transponder)",fr:"SART (Transpondeur de recherche et sauvetage)",es:"SART (Transpondedor de búsqueda y salvamento)",pt:"SART (Transponder de busca e salvamento)",cat:"securite",
   def_fr:"Dispositif radar embarqué sur les embarcations de sauvetage, signalant leur position aux navires et aéronefs en recherche.",
   def_en:"Radar device carried on survival craft, signaling their position to searching ships and aircraft.",
   def_es:"Dispositivo de radar llevado en las embarcaciones de supervivencia, que señala su posición a buques y aeronaves en búsqueda.",
   def_pt:"Dispositivo de radar transportado em embarcações de sobrevivência, que assinala a sua posição a navios e aeronaves em busca.",
   difficulty:"intermediate",relatedTerms:["GMDSS","HRU"]},
  {en:"HRU (Hydrostatic Release Unit)",fr:"HRU (Dispositif de largage hydrostatique)",es:"HRU (Dispositivo de liberación hidrostática)",pt:"HRU (Dispositivo de largada hidrostática)",cat:"securite",
   def_fr:"Dispositif libérant automatiquement une embarcation de sauvetage (radeau) sous la pression de l'eau si le navire coule.",
   def_en:"Device automatically releasing a survival craft (liferaft) under water pressure if the ship sinks.",
   def_es:"Dispositivo que libera automáticamente una embarcación de supervivencia (balsa) bajo la presión del agua si el buque se hunde.",
   def_pt:"Dispositivo que liberta automaticamente uma embarcação de sobrevivência (jangada) sob a pressão da água se o navio afundar.",
   difficulty:"intermediate",relatedTerms:["SART"]},
  {en:"DSC (Digital Selective Calling)",fr:"DSC (Appel sélectif numérique)",es:"DSC (Llamada selectiva digital)",pt:"DSC (Chamada seletiva digital)",cat:"securite",
   def_fr:"Technologie radio permettant l'envoi automatique d'alertes de détresse ou d'appels ciblés entre navires et stations côtières.",
   def_en:"Radio technology enabling automatic sending of distress alerts or targeted calls between ships and coastal stations.",
   def_es:"Tecnología de radio que permite el envío automático de alertas de socorro o llamadas dirigidas entre buques y estaciones costeras.",
   def_pt:"Tecnologia de rádio que permite o envio automático de alertas de perigo ou chamadas dirigidas entre navios e estações costeiras.",
   difficulty:"intermediate",relatedTerms:["GMDSS"]},
  {en:"AVPU (consciousness scale)",fr:"AVPU (échelle de conscience)",es:"AVPU (escala de conciencia)",pt:"AVPU (escala de consciência)",cat:"securite",
   def_fr:"Échelle rapide d'évaluation du niveau de conscience d'une victime : Alert, Voice, Pain, Unresponsive.",
   def_en:"Quick scale for assessing a casualty's level of consciousness: Alert, Voice, Pain, Unresponsive.",
   def_es:"Escala rápida para evaluar el nivel de conciencia de una víctima: Alerta, Voz, Dolor, No responde.",
   def_pt:"Escala rápida para avaliar o nível de consciência de uma vítima: Alerta, Voz, Dor, Sem resposta.",
   difficulty:"basic",relatedTerms:["DRABC"]},
  {en:"DRABC (first aid protocol)",fr:"DRABC (protocole de premiers secours)",es:"DRABC (protocolo de primeros auxilios)",pt:"DRABC (protocolo de primeiros socorros)",cat:"securite",
   def_fr:"Séquence d'évaluation d'urgence : Danger, Réponse, Airway (voies aériennes), Breathing (respiration), Circulation.",
   def_en:"Emergency assessment sequence: Danger, Response, Airway, Breathing, Circulation.",
   def_es:"Secuencia de evaluación de emergencia: Peligro, Respuesta, Vía aérea, Respiración, Circulación.",
   def_pt:"Sequência de avaliação de emergência: Perigo, Resposta, Via aérea, Respiração, Circulação.",
   difficulty:"basic",relatedTerms:["AVPU","CPR"]},
  {en:"MEDEVAC (medical evacuation)",fr:"MEDEVAC (évacuation médicale)",es:"MEDEVAC (evacuación médica)",pt:"MEDEVAC (evacuação médica)",cat:"securite",
   def_fr:"Évacuation d'urgence d'un blessé ou malade grave depuis un navire vers une structure médicale à terre.",
   def_en:"Emergency evacuation of a seriously injured or ill person from a ship to a medical facility ashore.",
   def_es:"Evacuación de urgencia de un herido o enfermo grave desde un buque hacia una instalación médica en tierra.",
   def_pt:"Evacuação de urgência de um ferido ou doente grave de um navio para uma instalação médica em terra.",
   difficulty:"basic",relatedTerms:["TMAS"]},
  {en:"CPR (Cardiopulmonary Resuscitation)",fr:"RCP (Réanimation cardio-pulmonaire)",es:"RCP (Reanimación cardiopulmonar)",pt:"RCP (Reanimação cardiopulmonar)",cat:"securite",
   def_fr:"Technique d'urgence combinant compressions thoraciques et ventilation pour maintenir la circulation chez une personne en arrêt cardiaque.",
   def_en:"Emergency technique combining chest compressions and ventilation to maintain circulation in a person in cardiac arrest.",
   def_es:"Técnica de urgencia que combina compresiones torácicas y ventilación para mantener la circulación en una persona en paro cardíaco.",
   def_pt:"Técnica de urgência que combina compressões torácicas e ventilação para manter a circulação numa pessoa em paragem cardíaca.",
   difficulty:"basic",relatedTerms:["AED","DRABC"]},
  {en:"AED (Automated External Defibrillator)",fr:"DAE (Défibrillateur automatisé externe)",es:"DEA (Desfibrilador externo automático)",pt:"DEA (Desfibrilhador externo automático)",cat:"securite",
   def_fr:"Appareil portable délivrant un choc électrique pour rétablir un rythme cardiaque normal en cas d'arrêt cardiaque.",
   def_en:"Portable device delivering an electric shock to restore normal heart rhythm in case of cardiac arrest.",
   def_es:"Dispositivo portátil que administra una descarga eléctrica para restablecer un ritmo cardíaco normal en caso de paro cardíaco.",
   def_pt:"Dispositivo portátil que administra um choque elétrico para restabelecer um ritmo cardíaco normal em caso de paragem cardíaca.",
   difficulty:"basic",relatedTerms:["CPR"]},
  {en:"TMAS (Telemedical Maritime Assistance Service)",fr:"TMAS (Service d'assistance médicale maritime à distance)",es:"TMAS (Servicio de asistencia médica marítima a distancia)",pt:"TMAS (Serviço de assistência médica marítima à distância)",cat:"securite",
   def_fr:"Service permettant à l'équipage d'obtenir un conseil médical à distance par un médecin, en cas de blessure ou maladie à bord.",
   def_en:"Service allowing the crew to obtain remote medical advice from a doctor, in case of injury or illness on board.",
   def_es:"Servicio que permite a la tripulación obtener asesoramiento médico a distancia de un médico, en caso de lesión o enfermedad a bordo.",
   def_pt:"Serviço que permite à tripulação obter aconselhamento médico à distância de um médico, em caso de ferimento ou doença a bordo.",
   difficulty:"intermediate",relatedTerms:["MEDEVAC"]},
  {en:"Fire triangle",fr:"Triangle du feu",es:"Triángulo del fuego",pt:"Triângulo do fogo",cat:"securite",
   def_fr:"Représentation des trois éléments nécessaires à une combustion : combustible, comburant (oxygène), chaleur.",
   def_en:"Representation of the three elements needed for combustion: fuel, oxidizer (oxygen), heat.",
   def_es:"Representación de los tres elementos necesarios para la combustión: combustible, comburente (oxígeno), calor.",
   def_pt:"Representação dos três elementos necessários à combustão: combustível, comburente (oxigénio), calor.",
   difficulty:"basic",relatedTerms:[]},
  {en:"SCBA (Self-Contained Breathing Apparatus)",fr:"ARI (Appareil respiratoire isolant)",es:"ERA (Equipo de respiración autónomo)",pt:"ARA (Aparelho respiratório autónomo)",cat:"securite",
   def_fr:"Appareil autonome fournissant de l'air respirable, utilisé pour intervenir en atmosphère toxique ou enfumée.",
   def_en:"Self-contained device supplying breathable air, used to intervene in toxic or smoke-filled atmospheres.",
   def_es:"Equipo autónomo que suministra aire respirable, utilizado para intervenir en atmósferas tóxicas o con humo.",
   def_pt:"Equipamento autónomo que fornece ar respirável, utilizado para intervir em atmosferas tóxicas ou com fumo.",
   difficulty:"intermediate",relatedTerms:["EEBD"]},
  {en:"EEBD (Emergency Escape Breathing Device)",fr:"EEBD (Appareil respiratoire d'évacuation d'urgence)",es:"EEBD (Dispositivo respiratorio de escape de emergencia)",pt:"EEBD (Dispositivo respiratório de fuga de emergência)",cat:"securite",
   def_fr:"Appareil respiratoire portable à usage unique, destiné uniquement à l'évacuation d'urgence, pas à l'intervention.",
   def_en:"Single-use portable breathing device, intended only for emergency escape, not for intervention.",
   def_es:"Dispositivo respiratorio portátil de un solo uso, destinado únicamente a la evacuación de emergencia, no a la intervención.",
   def_pt:"Dispositivo respiratório portátil de utilização única, destinado apenas à fuga de emergência, não à intervenção.",
   difficulty:"intermediate",relatedTerms:["SCBA"]},
  {en:"PPE (Personal Protective Equipment)",fr:"EPI (Équipement de protection individuelle)",es:"EPP (Equipo de protección individual)",pt:"EPI (Equipamento de proteção individual)",cat:"securite",
   def_fr:"Ensemble des équipements portés pour protéger une personne des risques liés à son activité (casque, gants, harnais, etc.).",
   def_en:"Set of equipment worn to protect a person from risks related to their activity (helmet, gloves, harness, etc.).",
   def_es:"Conjunto de equipos utilizados para proteger a una persona de los riesgos relacionados con su actividad (casco, guantes, arnés, etc.).",
   def_pt:"Conjunto de equipamentos usados para proteger uma pessoa dos riscos relacionados com a sua atividade (capacete, luvas, arnês, etc.).",
   difficulty:"basic",relatedTerms:["Permit to work"]},
  {en:"Life jacket",fr:"Gilet de sauvetage",es:"Chaleco salvavidas",pt:"Colete salva-vidas",cat:"securite",
   def_fr:"Équipement flottant individuel destiné à maintenir une personne à la surface de l'eau en cas d'urgence.",
   def_en:"Individual buoyant equipment intended to keep a person afloat in an emergency.",
   def_es:"Equipo flotante individual destinado a mantener a una persona a flote en caso de emergencia.",
   def_pt:"Equipamento flutuante individual destinado a manter uma pessoa à tona em caso de emergência.",
   difficulty:"basic",relatedTerms:["Abandon ship"]},
  {en:"Abandon ship",fr:"Abandon du navire",es:"Abandono del buque",pt:"Abandono do navio",cat:"securite",
   def_fr:"Procédure d'urgence organisant l'évacuation complète de l'équipage et des passagers vers les embarcations de sauvetage.",
   def_en:"Emergency procedure organizing the complete evacuation of crew and passengers to survival craft.",
   def_es:"Procedimiento de emergencia que organiza la evacuación completa de la tripulación y los pasajeros hacia las embarcaciones de supervivencia.",
   def_pt:"Procedimento de emergência que organiza a evacuação completa da tripulação e dos passageiros para as embarcações de sobrevivência.",
   difficulty:"intermediate",relatedTerms:["Gilet de sauvetage","Muster list"]},
  {en:"Permit to work",fr:"Permis de travail",es:"Permiso de trabajo",pt:"Permissão de trabalho",cat:"securite",
   def_fr:"Document formel autorisant une tâche à risque, exigeant une évaluation préalable des dangers et des mesures de sécurité.",
   def_en:"Formal document authorizing a hazardous task, requiring prior hazard assessment and safety measures.",
   def_es:"Documento formal que autoriza una tarea de riesgo, exigiendo una evaluación previa de los peligros y medidas de seguridad.",
   def_pt:"Documento formal que autoriza uma tarefa de risco, exigindo uma avaliação prévia dos perigos e medidas de segurança.",
   difficulty:"intermediate",relatedTerms:["Risk assessment","PPE"]},
  {en:"Risk assessment",fr:"Évaluation des risques",es:"Evaluación de riesgos",pt:"Avaliação de riscos",cat:"securite",
   def_fr:"Analyse systématique des dangers potentiels d'une tâche, avant sa réalisation, pour définir les mesures de prévention nécessaires.",
   def_en:"Systematic analysis of a task's potential hazards, before it is carried out, to define necessary preventive measures.",
   def_es:"Análisis sistemático de los peligros potenciales de una tarea, antes de realizarla, para definir las medidas preventivas necesarias.",
   def_pt:"Análise sistemática dos perigos potenciais de uma tarefa, antes da sua realização, para definir as medidas preventivas necessárias.",
   difficulty:"intermediate",relatedTerms:["Permit to work"]},
  {en:"Muster list",fr:"Liste de rassemblement",es:"Lista de zafarrancho",pt:"Lista de reunião",cat:"securite",
   def_fr:"Document affiché à bord précisant le poste, la tâche et le point de rassemblement de chaque membre d'équipage en cas d'urgence.",
   def_en:"Document displayed on board specifying each crew member's station, task, and muster point in an emergency.",
   def_es:"Documento exhibido a bordo que precisa el puesto, la tarea y el punto de reunión de cada miembro de la tripulación en caso de emergencia.",
   def_pt:"Documento afixado a bordo que especifica o posto, a tarefa e o ponto de reunião de cada membro da tripulação em caso de emergência.",
   difficulty:"basic",relatedTerms:["Abandon ship"]},

  // ── MACHINE ───────────────────────────────────────────────
  {en:"Main engine",fr:"Moteur principal",es:"Motor principal",pt:"Motor principal",cat:"machine",
   def_fr:"Moteur diesel (2T ou 4T) assurant la propulsion principale du navire.",
   def_en:"Diesel engine (2-stroke or 4-stroke) providing the vessel's main propulsion."},
  {en:"Generator",fr:"Groupe électrogène / Alternateur",es:"Generador",pt:"Gerador",cat:"machine",
   def_fr:"Moteur diesel entraînant un alternateur produisant l'électricité de bord.",
   def_en:"Diesel engine driving an alternator producing the vessel's electrical power."},
  {en:"Pump",fr:"Pompe",es:"Bomba",pt:"Bomba",cat:"machine",
   def_fr:"Dispositif mécanisant la circulation de liquides à bord : ballast, carburant, eau de mer...",
   def_en:"Device mechanising liquid circulation on board: ballast, fuel, seawater..."},
  {en:"Bilge pump",fr:"Pompe de cale",es:"Bomba de sentina",pt:"Bomba de sentina",cat:"machine",
   def_fr:"Pompe évacuant les eaux d'infiltration accumulées dans les fonds de cale.",
   def_en:"Pump evacuating infiltration water accumulated in the bilges."},
  {en:"Purifier",fr:"Purificateur / Séparateur",es:"Purificador",pt:"Purificador",cat:"machine",
   def_fr:"Centrifugeuse séparant les impuretés et l'eau du fuel lourd (HFO) avant injection moteur.",
   def_en:"Centrifuge separating impurities and water from heavy fuel oil (HFO) before engine injection."},
  {en:"Compressor",fr:"Compresseur",es:"Compresor",pt:"Compressor",cat:"machine",
   def_fr:"Machine comprimant l'air pour le démarrage du moteur principal et les outils pneumatiques.",
   def_en:"Machine compressing air for main engine starting and pneumatic tools."},
  {en:"Boiler",fr:"Chaudière",es:"Caldera",pt:"Caldeira",cat:"machine",
   def_fr:"Appareil produisant de la vapeur pour chauffer le fuel lourd, l'eau sanitaire et certains auxiliaires.",
   def_en:"Apparatus producing steam to heat heavy fuel, domestic water and some auxiliaries."},
  {en:"Fuel oil (HFO)",fr:"Fioul lourd / Mazout (HFO)",es:"Fuel pesado (HFO)",pt:"Fuelóleo pesado (HFO)",cat:"machine",
   def_fr:"Combustible visqueux utilisé par les grands moteurs marins. Doit être chauffé avant injection.",
   def_en:"Viscous fuel used by large marine engines. Must be heated before injection."},
  {en:"RPM",fr:"Tours/minute (tr/min)",es:"RPM (revoluciones por minuto)",pt:"RPM (rotações por minuto)",cat:"machine",
   def_fr:"Vitesse de rotation du moteur ou de l'hélice, exprimée en tours par minute.",
   def_en:"Rotation speed of engine or propeller, expressed in revolutions per minute."},
  {en:"Engine room",fr:"Salle des machines",es:"Sala de máquinas",pt:"Casa das máquinas",cat:"machine",
   def_fr:"Compartiment central abritant le moteur principal, les générateurs et tous les auxiliaires.",
   def_en:"Central compartment housing the main engine, generators and all auxiliaries."},
  {en:"Telegraph",fr:"Télégraphe de machine",es:"Telégrafo de máquinas",pt:"Telégrafo de máquinas",cat:"machine",
   def_fr:"Dispositif de communication entre la passerelle et la salle des machines pour les ordres de vitesse.",
   def_en:"Communication device between bridge and engine room for speed orders."},
  {en:"Dead slow ahead",fr:"Très petite vitesse avant",es:"Muy despacio avante",pt:"Muito devagar avante",cat:"machine",
   def_fr:"Ordre de vitesse le plus lent vers l'avant, juste au-dessus du seuil de manœuvrabilité.",
   def_en:"Slowest forward speed order, just above the manoeuvrability threshold."},

  // ── RÉGLEMENTATION ────────────────────────────────────────
  {en:"Flag state",fr:"État du pavillon",es:"Estado de abanderamiento",pt:"Estado de bandeira",cat:"reglementation",
   def_fr:"Pays dont le navire bat le pavillon, responsable de son contrôle et de la certification de l'équipage.",
   def_en:"Country whose flag the vessel flies, responsible for its control and crew certification."},
  {en:"Port state control (PSC)",fr:"Contrôle par l'État du port",es:"Control del Estado Rector del Puerto",pt:"Controlo do Estado do Porto",cat:"reglementation",
   def_fr:"Inspection officielle d'un navire étranger dans un port pour vérifier sa conformité aux conventions IMO.",
   def_en:"Official inspection of a foreign vessel in port to verify compliance with IMO conventions."},
  {en:"Classification society",fr:"Société de classification",es:"Sociedad clasificadora",pt:"Sociedade classificadora",cat:"reglementation",
   def_fr:"Organisme agréé (Lloyd's, Bureau Veritas, DNV...) vérifiant la conformité structurale et technique du navire.",
   def_en:"Approved body (Lloyd's, Bureau Veritas, DNV...) verifying the vessel's structural and technical compliance."},
  {en:"ISM Code",fr:"Code ISM (Gestion de la Sécurité)",es:"Código ISM",pt:"Código ISM",cat:"reglementation",
   def_fr:"Code international de gestion pour la sécurité de l'exploitation des navires et la prévention de la pollution.",
   def_en:"International management code for safe operation of ships and pollution prevention."},

  // ── MÉTÉOROLOGIE ──────────────────────────────────────────
  {en:"Isobar",fr:"Isobare",es:"Isobara",pt:"Isóbara",cat:"meteorologie",
   def_fr:"Ligne reliant les points de même pression atmosphérique sur une carte météo. Des isobares resserrées indiquent un vent fort.",
   def_en:"Line connecting points of equal atmospheric pressure on a weather chart. Tightly packed isobars indicate strong wind.",
   def_es:"Línea que une los puntos de igual presión atmosférica en una carta meteorológica. Isobaras muy juntas indican viento fuerte.",
   def_pt:"Linha que une pontos de igual pressão atmosférica numa carta meteorológica. Isóbaras muito próximas indicam vento forte.",
   difficulty:"intermediate",relatedTerms:["front chaud","front froid","carte synoptique"]},
  {en:"Warm front",fr:"Front chaud",es:"Frente cálido",pt:"Frente quente",cat:"meteorologie",
   def_fr:"Zone où une masse d'air chaud remplace progressivement une masse d'air froid. Dégradation lente, précipitations continues modérées.",
   def_en:"Zone where a warm air mass progressively replaces a cold one. Gradual deterioration, continuous moderate precipitation.",
   def_es:"Zona donde una masa de aire cálido reemplaza progresivamente a una fría. Deterioro lento, precipitación continua moderada.",
   def_pt:"Zona onde uma massa de ar quente substitui progressivamente uma fria. Deterioração lenta, precipitação contínua moderada.",
   difficulty:"intermediate",relatedTerms:["front froid","front occlus","isobare"]},
  {en:"Cold front",fr:"Front froid",es:"Frente frío",pt:"Frente fria",cat:"meteorologie",
   def_fr:"Zone où une masse d'air froid remplace rapidement une masse d'air chaud. Évolution rapide, vent qui fraîchit, grains possibles.",
   def_en:"Zone where a cold air mass rapidly replaces a warm one. Fast evolution, freshening wind, possible squalls.",
   def_es:"Zona donde una masa de aire frío reemplaza rápidamente a una cálida. Evolución rápida, viento que refresca, posibles chubascos.",
   def_pt:"Zona onde uma massa de ar frio substitui rapidamente uma quente. Evolução rápida, vento que refresca, possíveis borrascas.",
   difficulty:"intermediate",relatedTerms:["front chaud","front occlus"]},
  {en:"Occluded front",fr:"Front occlus",es:"Frente ocluido",pt:"Frente oclusa",cat:"meteorologie",
   def_fr:"Front résultant de la rencontre d'un front froid rattrapant un front chaud, combinant les caractéristiques des deux.",
   def_en:"Front resulting from a cold front catching up with a warm front, combining characteristics of both.",
   def_es:"Frente resultante del alcance de un frente frío sobre un frente cálido, combinando características de ambos.",
   def_pt:"Frente resultante do alcance de uma frente fria sobre uma quente, combinando características de ambas.",
   difficulty:"advanced",relatedTerms:["front chaud","front froid"]},
  {en:"Tropical cyclone",fr:"Cyclone tropical",es:"Ciclón tropical",pt:"Ciclone tropical",cat:"meteorologie",
   def_fr:"Système météo de grande échelle formé sur mer chaude (>26°C), structuré autour d'un œil et d'un mur de l'œil.",
   def_en:"Large-scale weather system formed over warm sea (>26°C), structured around an eye and eyewall.",
   def_es:"Sistema meteorológico de gran escala formado sobre mar cálido (>26°C), estructurado en torno a un ojo y una pared del ojo.",
   def_pt:"Sistema meteorológico de grande escala formado sobre mar quente (>26°C), estruturado em torno de um olho e parede do olho.",
   difficulty:"advanced",relatedTerms:["œil du cyclone","mur de l'œil","dangerous semicircle"]},
  {en:"Eye",fr:"Œil du cyclone",es:"Ojo del ciclón",pt:"Olho do ciclone",cat:"meteorologie",
   def_fr:"Zone centrale relativement calme d'un cyclone tropical. Les vents les plus violents ne s'y trouvent pas — ils sont dans le mur de l'œil.",
   def_en:"Relatively calm central zone of a tropical cyclone. The most violent winds are not here — they are in the eyewall.",
   def_es:"Zona central relativamente calmada de un ciclón tropical. Los vientos más violentos no están aquí — están en la pared del ojo.",
   def_pt:"Zona central relativamente calma de um ciclone tropical. Os ventos mais violentos não estão aqui — estão na parede do olho.",
   difficulty:"advanced",relatedTerms:["cyclone tropical","mur de l'œil"]},
  {en:"Eyewall",fr:"Mur de l'œil",es:"Pared del ojo",pt:"Parede do olho",cat:"meteorologie",
   def_fr:"Anneau de nuages entourant l'œil d'un cyclone tropical, où se concentrent les vents les plus violents.",
   def_en:"Ring of clouds surrounding the eye of a tropical cyclone, where the most violent winds are concentrated.",
   def_es:"Anillo de nubes que rodea el ojo de un ciclón tropical, donde se concentran los vientos más violentos.",
   def_pt:"Anel de nuvens que rodeia o olho de um ciclone tropical, onde se concentram os ventos mais violentos.",
   difficulty:"advanced",relatedTerms:["œil du cyclone","cyclone tropical"]},
  {en:"Dangerous semicircle",fr:"Semicercle dangereux",es:"Semicírculo peligroso",pt:"Semicírculo perigoso",cat:"meteorologie",
   def_fr:"Côté de la trajectoire d'un cyclone où déplacement et circulation propre se combinent, produisant des vents plus forts.",
   def_en:"Side of a cyclone's track where its movement and circulation combine, producing stronger winds.",
   def_es:"Lado de la trayectoria de un ciclón donde su desplazamiento y circulación se combinan, produciendo vientos más fuertes.",
   def_pt:"Lado da trajetória de um ciclone onde o seu deslocamento e circulação se combinam, produzindo ventos mais fortes.",
   difficulty:"advanced",relatedTerms:["navigable semicircle","cyclone tropical"]},
  {en:"Navigable semicircle",fr:"Semicercle navigable",es:"Semicírculo navegable",pt:"Semicírculo navegável",cat:"meteorologie",
   def_fr:"Côté de la trajectoire d'un cyclone où les effets s'atténuent partiellement, facilitant l'éloignement du navire.",
   def_en:"Side of a cyclone's track where effects partially cancel, making it easier for a ship to move away.",
   def_es:"Lado de la trayectoria de un ciclón donde los efectos se atenúan parcialmente, facilitando el alejamiento del buque.",
   def_pt:"Lado da trajetória de um ciclone onde os efeitos se atenuam parcialmente, facilitando o afastamento do navio.",
   difficulty:"advanced",relatedTerms:["dangerous semicircle","cyclone tropical"]},
  {en:"Synoptic chart",fr:"Carte synoptique",es:"Carta sinóptica",pt:"Carta sinótica",cat:"meteorologie",
   def_fr:"Carte représentant la situation météo générale : centres de pression, fronts, isobares.",
   def_en:"Chart representing the general weather situation: pressure centers, fronts, isobars.",
   def_es:"Carta que representa la situación meteorológica general: centros de presión, frentes, isobaras.",
   def_pt:"Carta que representa a situação meteorológica geral: centros de pressão, frentes, isóbaras.",
   difficulty:"intermediate",relatedTerms:["isobare","front chaud"]},
  {en:"Gale warning",fr:"Avis de coup de vent",es:"Aviso de temporal",pt:"Aviso de temporal",cat:"meteorologie",
   def_fr:"Message d'avertissement signalant un danger météo immédiat (vent fort), diffusé par NAVTEX ou SafetyNET.",
   def_en:"Warning message signaling immediate weather danger (strong wind), broadcast via NAVTEX or SafetyNET.",
   def_es:"Mensaje de aviso que señala un peligro meteorológico inmediato (viento fuerte), difundido por NAVTEX o SafetyNET.",
   def_pt:"Mensagem de aviso que assinala um perigo meteorológico imediato (vento forte), difundida por NAVTEX ou SafetyNET.",
   difficulty:"intermediate",relatedTerms:["NAVTEX","SafetyNET"]},
  {en:"NAVTEX",fr:"NAVTEX",es:"NAVTEX",pt:"NAVTEX",cat:"meteorologie",
   def_fr:"Moyen de diffusion automatique de messages de sécurité maritime par texte, reçu à bord dans sa zone de couverture.",
   def_en:"Means of automatic broadcast of maritime safety messages by text, received on board within its coverage area.",
   def_es:"Medio de difusión automática de mensajes de seguridad marítima por texto, recibido a bordo en su zona de cobertura.",
   def_pt:"Meio de difusão automática de mensagens de segurança marítima por texto, recebido a bordo na sua zona de cobertura.",
   difficulty:"intermediate",relatedTerms:["SafetyNET","METAREA"]},
  {en:"SafetyNET",fr:"SafetyNET",es:"SafetyNET",pt:"SafetyNET",cat:"meteorologie",
   def_fr:"Service de diffusion satellitaire de messages de sécurité maritime, complémentaire au NAVTEX pour les zones non couvertes.",
   def_en:"Satellite broadcast service for maritime safety messages, complementing NAVTEX in uncovered areas.",
   def_es:"Servicio de difusión satelital de mensajes de seguridad marítima, complementario al NAVTEX en zonas no cubiertas.",
   def_pt:"Serviço de difusão por satélite de mensagens de segurança marítima, complementar ao NAVTEX em zonas não cobertas.",
   difficulty:"intermediate",relatedTerms:["NAVTEX","METAREA"]},
  {en:"METAREA",fr:"METAREA",es:"METAREA",pt:"METAREA",cat:"meteorologie",
   def_fr:"Zone géographique de responsabilité météorologique, gérée par un service météo national désigné.",
   def_en:"Geographic area of meteorological responsibility, managed by a designated national weather service.",
   def_es:"Zona geográfica de responsabilidad meteorológica, gestionada por un servicio meteorológico nacional designado.",
   def_pt:"Zona geográfica de responsabilidade meteorológica, gerida por um serviço meteorológico nacional designado.",
   difficulty:"intermediate",relatedTerms:["NAVTEX","SafetyNET"]},

  // ── COMMUNICATION (SMCP) ──────────────────────────────────
  {en:"SOG (Speed Over Ground)",fr:"SOG (Vitesse fond)",es:"SOG (Velocidad sobre el fondo)",pt:"SOG (Velocidade sobre o fundo)",cat:"smcp",
   def_fr:"Vitesse réelle du navire par rapport au fond marin, incluant l'effet du courant. Diffère de la vitesse surface (STW).",
   def_en:"Ship's actual speed relative to the seabed, including current effect. Differs from speed through water (STW).",
   def_es:"Velocidad real del buque respecto al fondo marino, incluyendo el efecto de la corriente. Difiere de la velocidad en el agua (STW).",
   def_pt:"Velocidade real do navio em relação ao fundo marinho, incluindo o efeito da corrente. Difere da velocidade na água (STW).",
   difficulty:"intermediate",relatedTerms:["STW"]},
  {en:"STW (Speed Through Water)",fr:"STW (Vitesse surface)",es:"STW (Velocidad en el agua)",pt:"STW (Velocidade na água)",cat:"smcp",
   def_fr:"Vitesse du navire par rapport à l'eau environnante, sans tenir compte du courant. Diffère de la vitesse fond (SOG).",
   def_en:"Ship's speed relative to the surrounding water, not accounting for current. Differs from speed over ground (SOG).",
   def_es:"Velocidad del buque respecto al agua circundante, sin tener en cuenta la corriente. Difiere de la velocidad sobre el fondo (SOG).",
   def_pt:"Velocidade do navio em relação à água circundante, sem considerar a corrente. Difere da velocidade sobre o fundo (SOG).",
   difficulty:"intermediate",relatedTerms:["SOG"]},
  {en:"CPA (Closest Point of Approach)",fr:"CPA (Point de rapprochement maximal)",es:"CPA (Punto de máxima aproximación)",pt:"CPA (Ponto de maior aproximação)",cat:"smcp",
   def_fr:"Distance minimale prévue entre deux navires si leurs routes et vitesses actuelles sont maintenues.",
   def_en:"Minimum predicted distance between two ships if their current courses and speeds are maintained.",
   def_es:"Distancia mínima prevista entre dos buques si se mantienen sus rumbos y velocidades actuales.",
   def_pt:"Distância mínima prevista entre dois navios se os seus rumos e velocidades atuais forem mantidos.",
   difficulty:"intermediate",relatedTerms:["TCPA"]},
  {en:"TCPA (Time to Closest Point of Approach)",fr:"TCPA (Temps avant rapprochement maximal)",es:"TCPA (Tiempo hasta el punto de máxima aproximación)",pt:"TCPA (Tempo até ao ponto de maior aproximação)",cat:"smcp",
   def_fr:"Temps restant estimé avant que deux navires n'atteignent leur CPA, aux routes et vitesses actuelles.",
   def_en:"Estimated time remaining before two ships reach their CPA, at current courses and speeds.",
   def_es:"Tiempo estimado restante antes de que dos buques alcancen su CPA, con rumbos y velocidades actuales.",
   def_pt:"Tempo estimado restante antes de dois navios atingirem o seu CPA, aos rumos e velocidades atuais.",
   difficulty:"intermediate",relatedTerms:["CPA"]},
  {en:"VTS (Vessel Traffic Service)",fr:"VTS (Service de trafic maritime)",es:"VTS (Servicio de tráfico marítimo)",pt:"VTS (Serviço de tráfego marítimo)",cat:"smcp",
   def_fr:"Service à terre assurant la surveillance et la gestion du trafic maritime dans une zone donnée, souvent un port ou un détroit.",
   def_en:"Shore-based service monitoring and managing maritime traffic in a given area, often a port or strait.",
   def_es:"Servicio en tierra que vigila y gestiona el tráfico marítimo en una zona dada, a menudo un puerto o estrecho.",
   def_pt:"Serviço em terra que vigia e gere o tráfego marítimo numa zona dada, frequentemente um porto ou estreito.",
   difficulty:"basic",relatedTerms:["MRCC","TSS"]},
  {en:"MAYDAY",fr:"MAYDAY",es:"MAYDAY",pt:"MAYDAY",cat:"smcp",
   def_fr:"Préfixe radio international signalant une détresse : danger grave et imminent pour la vie ou le navire.",
   def_en:"International radio prefix signaling distress: grave and imminent danger to life or ship.",
   def_es:"Prefijo de radio internacional que señala socorro: peligro grave e inminente para la vida o el buque.",
   def_pt:"Prefixo de rádio internacional que assinala perigo: perigo grave e iminente para a vida ou o navio.",
   difficulty:"basic",relatedTerms:["PAN-PAN","SÉCURITÉ"]},
  {en:"PAN-PAN",fr:"PAN-PAN",es:"PAN-PAN",pt:"PAN-PAN",cat:"smcp",
   def_fr:"Préfixe radio international signalant l'urgence : situation grave mais ne mettant pas en danger immédiat la vie ou le navire.",
   def_en:"International radio prefix signaling urgency: a serious situation not posing immediate danger to life or ship.",
   def_es:"Prefijo de radio internacional que señala urgencia: situación grave sin peligro inmediato para la vida o el buque.",
   def_pt:"Prefixo de rádio internacional que assinala urgência: situação grave sem perigo imediato para a vida ou o navio.",
   difficulty:"basic",relatedTerms:["MAYDAY","SÉCURITÉ"]},
  {en:"SÉCURITÉ",fr:"SÉCURITÉ",es:"SÉCURITÉ",pt:"SÉCURITÉ",cat:"smcp",
   def_fr:"Préfixe radio international signalant un message de sécurité important : avertissement météo ou danger à la navigation.",
   def_en:"International radio prefix signaling an important safety message: weather warning or navigational hazard.",
   def_es:"Prefijo de radio internacional que señala un mensaje de seguridad importante: aviso meteorológico o peligro para la navegación.",
   def_pt:"Prefixo de rádio internacional que assinala uma mensagem de segurança importante: aviso meteorológico ou perigo para a navegação.",
   difficulty:"basic",relatedTerms:["MAYDAY","PAN-PAN"]},
  {en:"Give-way vessel",fr:"Navire non privilégié (Give-way vessel)",es:"Buque obligado a maniobrar",pt:"Navio obrigado a manobrar",cat:"smcp",
   def_fr:"Navire qui, selon les règles COLREG, doit manœuvrer pour éviter une collision avec le navire privilégié.",
   def_en:"Vessel which, under COLREG rules, must maneuver to avoid collision with the stand-on vessel.",
   def_es:"Buque que, según las reglas COLREG, debe maniobrar para evitar una colisión con el buque privilegiado.",
   def_pt:"Navio que, segundo as regras COLREG, deve manobrar para evitar uma colisão com o navio privilegiado.",
   difficulty:"intermediate",relatedTerms:["Stand-on vessel"]},
  {en:"Stand-on vessel",fr:"Navire privilégié (Stand-on vessel)",es:"Buque privilegiado",pt:"Navio privilegiado",cat:"smcp",
   def_fr:"Navire qui, selon les règles COLREG, doit maintenir son cap et sa vitesse tant que le navire non privilégié ne manœuvre pas.",
   def_en:"Vessel which, under COLREG rules, must maintain course and speed while the give-way vessel has not maneuvered.",
   def_es:"Buque que, según las reglas COLREG, debe mantener su rumbo y velocidad mientras el buque obligado no maniobre.",
   def_pt:"Navio que, segundo as regras COLREG, deve manter o seu rumo e velocidade enquanto o navio obrigado não manobrar.",
   difficulty:"intermediate",relatedTerms:["Give-way vessel"]},
  {en:"IMDG Code",fr:"Code IMDG",es:"Código IMDG",pt:"Código IMDG",cat:"smcp",
   def_fr:"Code maritime international des marchandises dangereuses, régissant leur classification, emballage et transport en mer.",
   def_en:"International Maritime Dangerous Goods Code, governing their classification, packaging, and sea transport.",
   def_es:"Código marítimo internacional de mercancías peligrosas, que rige su clasificación, embalaje y transporte por mar.",
   def_pt:"Código marítimo internacional de mercadorias perigosas, que rege a sua classificação, embalagem e transporte por mar.",
   difficulty:"intermediate",relatedTerms:["Dangerous goods"]},
  {en:"Dangerous goods",fr:"Marchandises dangereuses",es:"Mercancías peligrosas",pt:"Mercadorias perigosas",cat:"smcp",
   def_fr:"Cargaisons présentant un risque pour la sécurité, la santé ou l'environnement, classées et réglementées par le Code IMDG.",
   def_en:"Cargoes presenting a risk to safety, health, or the environment, classified and regulated under the IMDG Code.",
   def_es:"Cargas que presentan un riesgo para la seguridad, la salud o el medio ambiente, clasificadas y reguladas por el Código IMDG.",
   def_pt:"Cargas que apresentam um risco para a segurança, a saúde ou o ambiente, classificadas e regulamentadas pelo Código IMDG.",
   difficulty:"intermediate",relatedTerms:["IMDG Code"]},
  {en:"Pilot boarding",fr:"Embarquement du pilote",es:"Embarque del práctico",pt:"Embarque do prático",cat:"smcp",
   def_fr:"Opération d'embarquement ou débarquement d'un pilote maritime, encadrée par des procédures strictes de sécurité (échelle de pilote).",
   def_en:"Operation of boarding or disembarking a maritime pilot, governed by strict safety procedures (pilot ladder).",
   def_es:"Operación de embarque o desembarco de un práctico marítimo, regida por procedimientos estrictos de seguridad (escala de práctico).",
   def_pt:"Operação de embarque ou desembarque de um prático marítimo, regida por procedimentos rigorosos de segurança (escada de prático).",
   difficulty:"basic",relatedTerms:[]},
  {en:"MRCC (Maritime Rescue Co-ordination Centre)",fr:"MRCC (Centre de coordination de sauvetage maritime)",es:"MRCC (Centro de coordinación de salvamento marítimo)",pt:"MRCC (Centro de coordenação de salvamento marítimo)",cat:"smcp",
   def_fr:"Centre terrestre chargé de coordonner les opérations de recherche et de sauvetage en mer.",
   def_en:"Shore-based centre responsible for coordinating search and rescue operations at sea.",
   def_es:"Centro en tierra encargado de coordinar las operaciones de búsqueda y salvamento en el mar.",
   def_pt:"Centro em terra responsável por coordenar as operações de busca e salvamento no mar.",
   difficulty:"basic",relatedTerms:["VTS"]},
  {en:"TSS (Traffic Separation Scheme)",fr:"TSS (Dispositif de séparation du trafic)",es:"TSS (Dispositivo de separación del tráfico)",pt:"TSS (Dispositivo de separação do tráfego)",cat:"smcp",
   def_fr:"Système organisant la circulation des navires dans des zones à fort trafic, séparant les voies de navigation par direction.",
   def_en:"System organizing ship traffic in high-density areas, separating navigation lanes by direction.",
   def_es:"Sistema que organiza el tráfico de buques en zonas de alta densidad, separando las vías de navegación por dirección.",
   def_pt:"Sistema que organiza o tráfego de navios em zonas de alta densidade, separando as vias de navegação por direção.",
   difficulty:"basic",relatedTerms:["VTS"]},
];

// Sort alphabetically by English term
const SORTED_LEXICON = [...LEXICON].sort((a,b)=>a.en.localeCompare(b.en));

const T: any = {
  fr:{title:"Lexique Maritime",subtitle:"FR · EN · ES · PT",search:"Rechercher...",tabs:["📖 Dictionnaire","🃏 Flashcards","🎯 Quiz"],all:"Tous",noResults:"Aucun résultat",terms:"termes",definition:"Définition",tapReveal:"👆 Taper pour révéler",of:"sur",score:"Score",submit:"Valider",next:"Suivant →",finish:"Terminer",retry:"Recommencer",correct:"✅ Correct !",wrong:"❌ Incorrect",xpLabel:"XP obtenus",filterBy:"Catégorie"},
  en:{title:"Maritime Lexicon",subtitle:"FR · EN · ES · PT",search:"Search...",tabs:["📖 Dictionary","🃏 Flashcards","🎯 Quiz"],all:"All",noResults:"No results",terms:"terms",definition:"Definition",tapReveal:"👆 Tap to reveal",of:"of",score:"Score",submit:"Submit",next:"Next →",finish:"Finish",retry:"Retry",correct:"✅ Correct!",wrong:"❌ Incorrect",xpLabel:"XP earned",filterBy:"Category"},
  es:{title:"Léxico Marítimo",subtitle:"FR · EN · ES · PT",search:"Buscar...",tabs:["📖 Diccionario","🃏 Flashcards","🎯 Quiz"],all:"Todos",noResults:"Sin resultados",terms:"términos",definition:"Definición",tapReveal:"👆 Tocar para revelar",of:"de",score:"Puntuación",submit:"Validar",next:"Siguiente →",finish:"Terminar",retry:"Reintentar",correct:"✅ ¡Correcto!",wrong:"❌ Incorrecto",xpLabel:"XP obtenidos",filterBy:"Categoría"},
  pt:{title:"Léxico Marítimo",subtitle:"FR · EN · ES · PT",search:"Pesquisar...",tabs:["📖 Dicionário","🃏 Flashcards","🎯 Quiz"],all:"Todos",noResults:"Sem resultados",terms:"termos",definition:"Definição",tapReveal:"👆 Toque para revelar",of:"de",score:"Pontuação",submit:"Validar",next:"Seguinte →",finish:"Terminar",retry:"Recomeçar",correct:"✅ Correto!",wrong:"❌ Incorreto",xpLabel:"XP obtidos",filterBy:"Categoria"},
};

// ── DICTIONARY TAB ────────────────────────────────────────────
function DictionaryTab({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const termInLang = (item: any) => {
    if (lang==="fr") return item.fr;
    if (lang==="es") return item.es;
    if (lang==="pt") return item.pt;
    return item.en;
  };

  const filtered = useMemo(()=>{
    return SORTED_LEXICON.filter(item=>{
      const matchCat = catFilter==="all"||item.cat===catFilter;
      const q = search.toLowerCase();
      const matchSearch = !q||
        item.en.toLowerCase().includes(q)||
        item.fr.toLowerCase().includes(q)||
        item.es.toLowerCase().includes(q)||
        item.pt.toLowerCase().includes(q);
      return matchCat&&matchSearch;
    });
  },[search,catFilter]);

  const grouped = useMemo(()=>{
    const g: Record<string,typeof SORTED_LEXICON> = {};
    filtered.forEach(item=>{
      const letter = item.en[0].toUpperCase();
      if(!g[letter]) g[letter]=[];
      g[letter].push(item);
    });
    return g;
  },[filtered]);

  return (
    <div style={{padding:"12px 14px 24px"}}>
      {/* Search */}
      <div style={{position:"relative",marginBottom:10}}>
        <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"rgba(240,244,255,0.3)"}}>🔍</span>
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search}
          style={{width:"100%",padding:"11px 14px 11px 36px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:`1px solid ${C.gold}33`,color:"#f0f4ff",fontSize:13,outline:"none",fontFamily:"Courier New"}}/>
      </div>

      {/* Category filter */}
      <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:12,paddingBottom:4,scrollbarWidth:"none"}}>
        <button onClick={()=>setCatFilter("all")} style={{padding:"5px 10px",borderRadius:8,fontSize:10,cursor:"pointer",whiteSpace:"nowrap",background:catFilter==="all"?`${C.gold}22`:"rgba(255,255,255,0.04)",border:`1px solid ${catFilter==="all"?C.gold:"rgba(255,255,255,0.1)"}`,color:catFilter==="all"?C.gold:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{t.all}</button>
        {Object.entries(CATS).map(([key,val])=>(
          <button key={key} onClick={()=>setCatFilter(key)} style={{padding:"5px 10px",borderRadius:8,fontSize:10,cursor:"pointer",whiteSpace:"nowrap",background:catFilter===key?`${val.color}22`:"rgba(255,255,255,0.04)",border:`1px solid ${catFilter===key?val.color:"rgba(255,255,255,0.1)"}`,color:catFilter===key?val.color:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>
            {val.icon} {val.label[lang]||val.label.fr}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{fontSize:10,color:"rgba(240,244,255,0.3)",marginBottom:10,fontFamily:"Courier New"}}>{filtered.length} {t.terms}</div>

      {/* Grouped list */}
      {Object.keys(grouped).length===0?(
        <div style={{textAlign:"center",padding:"40px 0",color:"rgba(240,244,255,0.3)",fontSize:13}}>{t.noResults}</div>
      ):(
        Object.entries(grouped).map(([letter,items])=>(
          <div key={letter} style={{marginBottom:16}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:900,color:C.gold,marginBottom:8,paddingLeft:4}}>{letter}</div>
            {items.map(item=>{
              const catInfo=CATS[item.cat];
              const isExp=expanded===item.en;
              return (
                <div key={item.en} style={{marginBottom:6,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${isExp?(catInfo?.color||C.gold):"rgba(255,255,255,0.08)"}`,overflow:"hidden",transition:"border 0.2s"}}>
                  <button onClick={()=>setExpanded(isExp?null:item.en)} style={{width:"100%",padding:"11px 14px",background:"none",border:"none",display:"flex",alignItems:"center",gap:10,cursor:"pointer",textAlign:"left"}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:3}}>
                        <span style={{fontSize:13,fontWeight:700,color:"#f0f4ff",fontFamily:"Courier New"}}>{item.en}</span>
                        <span style={{fontSize:11,color:catInfo?.color||C.gold,fontFamily:"Courier New"}}>= {termInLang(item)}</span>
                      </div>
                      {catInfo&&<div style={{fontSize:9,padding:"1px 6px",borderRadius:6,display:"inline-block",background:`${catInfo.color}18`,border:`1px solid ${catInfo.color}33`,color:catInfo.color}}>{catInfo.icon} {catInfo.label[lang]||catInfo.label.fr}</div>}
                    </div>
                    <span style={{color:catInfo?.color||C.gold,fontSize:12,flexShrink:0}}>{isExp?"▲":"▼"}</span>
                  </button>
                  {isExp&&(
                    <div style={{padding:"0 14px 12px"}}>
                      {/* 4 languages */}
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
                        {[{flag:"🇬🇧",val:item.en},{flag:"🇫🇷",val:item.fr},{flag:"🇪🇸",val:item.es},{flag:"🇧🇷",val:item.pt}].map(({flag,val})=>(
                          <div key={flag} style={{padding:"6px 8px",borderRadius:8,background:`${C.navy3}cc`,border:"1px solid rgba(255,255,255,0.08)",fontSize:11,color:"#e0e8ff",fontFamily:"Courier New"}}>
                            <span style={{marginRight:6}}>{flag}</span>{val}
                          </div>
                        ))}
                      </div>
                      {/* Definition */}
                      <div style={{padding:10,borderRadius:8,background:`${C.navy3}cc`,borderLeft:`3px solid ${catInfo?.color||C.gold}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.6,fontFamily:"Courier New"}}>
                        {lang==="fr"?item.def_fr:item.def_en}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}

// ── FLASHCARD TAB ─────────────────────────────────────────────
function FlashcardTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [catFilter,setCatFilter]=useState("all");
  const [revealed,setRevealed]=useState(false);
  const [idx,setIdx]=useState(0);

  const deck = useMemo(()=>{
    const base=catFilter==="all"?SORTED_LEXICON:SORTED_LEXICON.filter(i=>i.cat===catFilter);
    return [...base].sort(()=>Math.random()-0.5);
  },[catFilter]);

  const card=deck[idx%deck.length];
  const catInfo=CATS[card?.cat];

  const termInLang=(item:any)=>{
    if(lang==="fr") return item.fr;
    if(lang==="es") return item.es;
    if(lang==="pt") return item.pt;
    return item.en;
  };

  const next=()=>{setIdx(i=>(i+1)%deck.length);setRevealed(false);};
  const prev=()=>{setIdx(i=>(i-1+deck.length)%deck.length);setRevealed(false);};

  return (
    <div style={{padding:"12px 14px 24px"}}>
      {/* Category filter */}
      <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:12,paddingBottom:4,scrollbarWidth:"none"}}>
        <button onClick={()=>{setCatFilter("all");setIdx(0);setRevealed(false);}} style={{padding:"5px 10px",borderRadius:8,fontSize:10,cursor:"pointer",whiteSpace:"nowrap",background:catFilter==="all"?`${C.gold}22`:"rgba(255,255,255,0.04)",border:`1px solid ${catFilter==="all"?C.gold:"rgba(255,255,255,0.1)"}`,color:catFilter==="all"?C.gold:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{t.all}</button>
        {Object.entries(CATS).map(([key,val])=>(
          <button key={key} onClick={()=>{setCatFilter(key);setIdx(0);setRevealed(false);}} style={{padding:"5px 10px",borderRadius:8,fontSize:10,cursor:"pointer",whiteSpace:"nowrap",background:catFilter===key?`${val.color}22`:"rgba(255,255,255,0.04)",border:`1px solid ${catFilter===key?val.color:"rgba(255,255,255,0.1)"}`,color:catFilter===key?val.color:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>
            {val.icon} {val.label[lang]||val.label.fr}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div style={{fontSize:11,color:"rgba(240,244,255,0.4)",textAlign:"center",marginBottom:10,fontFamily:"Courier New"}}>{(idx%deck.length)+1} {t.of} {deck.length}</div>
      <div style={{height:2,borderRadius:2,background:"rgba(255,255,255,0.06)",marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.blue2},${C.gold})`,width:`${(((idx%deck.length)+1)/deck.length)*100}%`,transition:"width 0.3s"}}/>
      </div>

      {/* Card */}
      {card&&(
        <div onClick={()=>setRevealed(r=>!r)} style={{borderRadius:18,background:revealed?`${catInfo?.color||C.gold}15`:`${C.navy2}cc`,border:`2px solid ${revealed?(catInfo?.color||C.gold):"rgba(255,255,255,0.12)"}`,padding:"28px 20px",minHeight:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.3s",textAlign:"center"}}>
          {catInfo&&<div style={{fontSize:9,padding:"2px 8px",borderRadius:8,background:`${catInfo.color}22`,border:`1px solid ${catInfo.color}44`,color:catInfo.color,marginBottom:14}}>{catInfo.icon} {catInfo.label[lang]||catInfo.label.fr}</div>}
          <div style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:"#f0f4ff",marginBottom:6}}>{card.en}</div>
          {!revealed?(
            <div style={{fontSize:12,color:"rgba(240,244,255,0.3)",fontFamily:"Courier New",marginTop:10}}>{t.tapReveal}</div>
          ):(
            <div style={{width:"100%"}}>
              <div style={{height:1,background:`${catInfo?.color||C.gold}44`,margin:"12px 0"}}/>
              <div style={{fontSize:18,fontWeight:700,color:catInfo?.color||C.gold,fontFamily:"Courier New",marginBottom:10}}>{termInLang(card)}</div>
              <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap",marginBottom:10}}>
                {[{flag:"🇬🇧",val:card.en},{flag:"🇫🇷",val:card.fr},{flag:"🇪🇸",val:card.es},{flag:"🇧🇷",val:card.pt}].map(({flag,val})=>(
                  <div key={flag} style={{fontSize:10,padding:"3px 7px",borderRadius:7,background:`${C.navy3}cc`,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New"}}>{flag} {val}</div>
                ))}
              </div>
              <div style={{fontSize:11,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New",lineHeight:1.5,padding:"0 8px"}}>{lang==="fr"?card.def_fr:card.def_en}</div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div style={{display:"flex",gap:8,marginTop:14}}>
        <button onClick={prev} style={{flex:1,padding:"12px 0",borderRadius:12,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",color:"rgba(240,244,255,0.5)",cursor:"pointer",fontSize:13}}>◀</button>
        <button onClick={next} style={{flex:2,padding:"12px 0",borderRadius:12,border:`1px solid ${C.gold}44`,background:`${C.gold}11`,color:C.gold2,cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:"'Cinzel',serif"}}>{t.next}</button>
      </div>
    </div>
  );
}
// LexiqueMaritime v2 — PART 2: Quiz (30Q) + Main

function getQuiz() {
  return [
    // ANATOMIE
    {en_term:"Bow",correct_idx:1,opts_fr:["Poupe","Proue / Étrave","Tribord","Quille"],opts_en:["Stern","Forward part of the vessel","Starboard","Keel"],opts_es:["Popa","Proa","Estribor","Quilla"],opts_pt:["Popa","Proa","Estibordo","Quilha"],exp_fr:"La proue est l'avant du navire. L'étrave est la pièce structurale d'extrémité.",exp_en:"The bow is the forward part of the vessel. The stem is the structural end piece.",cat:"anatomie"},
    {en_term:"Stern",correct_idx:0,opts_fr:["Poupe","Proue","Bâbord","Pont"],opts_en:["Rear part of the vessel","Bow","Port side","Deck"],opts_es:["Popa","Proa","Babor","Cubierta"],opts_pt:["Popa","Proa","Bombordo","Convés"],exp_fr:"La poupe est la partie arrière du navire.",exp_en:"The stern is the rear part of the vessel.",cat:"anatomie"},
    {en_term:"Port side",correct_idx:2,opts_fr:["Tribord","Proue","Bâbord","Quille"],opts_en:["Starboard","Bow","Left side (red light)","Keel"],opts_es:["Estribor","Proa","Babor","Quilla"],opts_pt:["Estibordo","Proa","Bombordo","Quilha"],exp_fr:"Bâbord = côté gauche en regardant vers l'avant. Feux rouges.",exp_en:"Port = left side facing forward. Red lights.",cat:"anatomie"},
    {en_term:"Starboard",correct_idx:3,opts_fr:["Bâbord","Poupe","Quille","Tribord"],opts_en:["Port side","Stern","Keel","Right side (green light)"],opts_es:["Babor","Popa","Quilla","Estribor"],opts_pt:["Bombordo","Popa","Quilha","Estibordo"],exp_fr:"Tribord = côté droit en regardant vers l'avant. Feux verts.",exp_en:"Starboard = right side facing forward. Green lights.",cat:"anatomie"},
    {en_term:"Keel",correct_idx:1,opts_fr:["Pont","Quille","Coque","Cloison"],opts_en:["Deck","Lowest axial structural member","Hull","Bulkhead"],opts_es:["Cubierta","Quilla","Casco","Mamparo"],opts_pt:["Convés","Quilha","Casco","Antepara"],exp_fr:"La quille est la pièce axiale longitudinale formant la colonne vertébrale du navire.",exp_en:"The keel is the longitudinal axial member forming the vessel's backbone.",cat:"anatomie"},
    {en_term:"Hawse pipe",correct_idx:2,opts_fr:["Chaumard","Taquet","Écubier","Guindeau"],opts_en:["Fairlead","Cleat","Tube through bow for anchor chain","Windlass"],opts_es:["Guiacabos","Cornamusa","Escobén","Molinete"],opts_pt:["Guia-cabos","Cunho","Escovém","Molinete"],exp_fr:"L'écubier est le tube en acier traversant l'étrave par lequel passe la chaîne d'ancre.",exp_en:"The hawse pipe is the steel tube through the bow through which the anchor chain passes.",cat:"anatomie"},
    {en_term:"Bridge",correct_idx:0,opts_fr:["Passerelle de navigation","Pont principal","Cale","Salle des machines"],opts_en:["Navigation command centre","Main deck","Hold","Engine room"],opts_es:["Puente de mando","Cubierta principal","Bodega","Sala de máquinas"],opts_pt:["Passadiço de navegação","Convés principal","Porão","Casa das máquinas"],exp_fr:"La passerelle est la superstructure surélevée d'où le navire est commandé.",exp_en:"The bridge is the elevated superstructure from which the vessel is commanded.",cat:"anatomie"},
    // AMARRAGE
    {en_term:"Bollard",correct_idx:3,opts_fr:["Taquet","Chaumard","Défense","Bitte d'amarrage"],opts_en:["Cleat","Fairlead","Fender","Steel post on quay for mooring lines"],opts_es:["Cornamusa","Guiacabos","Defensa","Bolardo / Noray"],opts_pt:["Cunho","Guia-cabos","Defensa","Bolardo / Cabeço"],exp_fr:"Le bollard (bitte d'amarrage) est un poteau en acier fixé au quai recevant les boucles des amarres.",exp_en:"A bollard is a steel post fixed to the quay receiving the eyes of mooring lines.",cat:"amarrage"},
    {en_term:"Fender",correct_idx:1,opts_fr:["Amarre","Défense","Bollard","Taquet"],opts_en:["Mooring line","Shock absorber between hull and quay","Bollard","Cleat"],opts_es:["Estacha","Defensa","Bolardo","Cornamusa"],opts_pt:["Amarra","Defensa","Bolardo","Cunho"],exp_fr:"La défense absorbe les chocs entre le flanc du navire et le quai.",exp_en:"A fender absorbs shocks between the vessel's side and the quay.",cat:"amarrage"},
    {en_term:"Spring line",correct_idx:2,opts_fr:["Traversière","Amarre de tête","Garde","Amarre de queue"],opts_en:["Breast line","Head line","Oblique line controlling fore-aft movement","Stern line"],opts_es:["Traviesa","Estacha de proa","Espía","Estacha de popa"],opts_pt:["Travessa","Amarra de vante","Espreguia","Amarra de ré"],exp_fr:"La garde est une amarre oblique longitudinale contrôlant le mouvement avant/arrière.",exp_en:"The spring line is an oblique line controlling the vessel's fore-and-aft movement.",cat:"amarrage"},
    {en_term:"Fairlead",correct_idx:0,opts_fr:["Chaumard","Taquet","Bollard","Cabestan"],opts_en:["Cable guide on the rail","Cleat","Bollard","Capstan"],opts_es:["Guiacabos","Cornamusa","Bolardo","Cabestrante"],opts_pt:["Guia-cabos","Cunho","Bolardo","Cabrestante"],exp_fr:"Le chaumard est un guide-câble fixé sur le plat-bord orientant les amarres sans usure.",exp_en:"A fairlead is a cable guide on the rail directing mooring lines without wear.",cat:"amarrage"},
    {en_term:"Shackle / Manille",correct_idx:3,opts_fr:["Ridoir","Épissure","Surlure","Manille"],opts_en:["Ridoir","Splice","Whipping","U-shaped link closed by a threaded pin"],opts_es:["Tensor","Empalme","Ligada","Grillete"],opts_pt:["Tensor","Emenda","Surriola","Manilha"],exp_fr:"La manille est un maillon en U fermé par un axe fileté, reliant chaînes et amarres.",exp_en:"A shackle is a U-shaped link closed by a threaded pin, connecting chains and lines.",cat:"amarrage"},
    {en_term:"Capstan",correct_idx:1,opts_fr:["Guindeau","Cabestan","Taquet","Chaumard"],opts_en:["Windlass","Vertical rotating winch for heaving lines","Cleat","Fairlead"],opts_es:["Molinete","Cabestrante","Cornamusa","Guiacabos"],opts_pt:["Molinete","Cabrestante","Cunho","Guia-cabos"],exp_fr:"Le cabestan est un treuil rotatif vertical servant à virer les amarres et chaînes.",exp_en:"A capstan is a vertical rotating winch used to heave mooring lines and chains.",cat:"amarrage"},
    // ANCRAGE
    {en_term:"Anchor",correct_idx:0,opts_fr:["Ancre","Amarre","Défense","Bouée"],opts_en:["Device lowered to hold the vessel","Mooring line","Fender","Buoy"],opts_es:["Ancla","Estacha","Defensa","Boya"],opts_pt:["Âncora","Amarra","Defensa","Boia"],exp_fr:"L'ancre est un dispositif métallique immergé s'accrochant au fond pour tenir le navire.",exp_en:"An anchor is a metal device lowered to hold the vessel by gripping the seabed.",cat:"ancrage"},
    {en_term:"Scope",correct_idx:2,opts_fr:["Tirant d'eau","Franc-bord","Portée de mouillage","Assiette"],opts_en:["Draft","Freeboard","Chain length vs depth ratio","Trim"],opts_es:["Calado","Francobordo","Alcance de fondeo","Asiento"],opts_pt:["Calado","Bordo livre","Alcance de fundeio","Trim"],exp_fr:"La portée de mouillage = longueur de chaîne / profondeur. Minimum 3×, optimal 5–7×.",exp_en:"Scope = chain length / depth. Minimum 3×, optimal 5–7× in bad weather.",cat:"ancrage"},
    {en_term:"Windlass",correct_idx:3,opts_fr:["Cabestan","Taquet","Chaumard","Guindeau"],opts_en:["Capstan","Cleat","Fairlead","Motorised horizontal winch for anchor chain"],opts_es:["Cabestrante","Cornamusa","Guiacabos","Molinete"],opts_pt:["Cabrestante","Cunho","Guia-cabos","Molinete"],exp_fr:"Le guindeau est un treuil horizontal motorisé pour virer et filer la chaîne d'ancre.",exp_en:"A windlass is a motorised horizontal winch for heaving and veering the anchor chain.",cat:"ancrage"},
    {en_term:"Trip line",correct_idx:1,opts_fr:["Amarre de tête","Ligne d'orin / Orin","Garde","Traversière"],opts_en:["Head line","Line on crown for recovery if fouled","Spring","Breast line"],opts_es:["Estacha de proa","Orinque","Espía","Traviesa"],opts_pt:["Amarra de vante","Orinque","Espreguia","Travessa"],exp_fr:"L'orin est un filin frappé à la couronne de l'ancre permettant de la récupérer si coincée.",exp_en:"A trip line is attached to the anchor crown for recovery if the anchor fouls.",cat:"ancrage"},
    {en_term:"Dragging (anchor)",correct_idx:0,opts_fr:["Chasser sur son ancre","Surgir","Culer","Filer la chaîne"],opts_en:["Anchor losing hold and sliding on seabed","Surging forward","Ranging astern","Veering chain"],opts_es:["Garrar","Surgir","Culear","Filar"],opts_pt:["Arrastar a âncora","Surgir","Recuar","Arriar"],exp_fr:"Chasser = l'ancre perd sa tenue et dérape. Détectable par relèvements qui changent.",exp_en:"Dragging = anchor losing hold and sliding. Detectable by changing bearings.",cat:"ancrage"},
    // STABILITE
    {en_term:"Draft / Draught",correct_idx:2,opts_fr:["Franc-bord","Assiette","Tirant d'eau","Déplacement"],opts_en:["Freeboard","Trim","Depth from waterline to keel","Displacement"],opts_es:["Francobordo","Asiento","Calado","Desplazamiento"],opts_pt:["Bordo livre","Trim","Calado","Deslocamento"],exp_fr:"Le tirant d'eau = distance verticale entre la ligne de flottaison et le point le plus bas de la coque.",exp_en:"Draft = vertical distance between waterline and lowest point of hull.",cat:"stabilite"},
    {en_term:"GM (Metacentric height)",correct_idx:3,opts_fr:["Tirant d'eau","Assiette","Déplacement","Hauteur métacentrique"],opts_en:["Draft","Trim","Displacement","Distance G to M — measures initial stability"],opts_es:["Calado","Asiento","Desplazamiento","Altura metacéntrica"],opts_pt:["Calado","Trim","Deslocamento","Altura metacêntrica GM"],exp_fr:"GM = distance entre G et M. Si GM > 0, navire stable. Si GM < 0, risque de chavirage.",exp_en:"GM = distance between G and M. If GM > 0, vessel is stable. If GM < 0, capsize risk.",cat:"stabilite"},
    {en_term:"Heel",correct_idx:1,opts_fr:["Assiette","Gîte","Tirant d'eau","Franc-bord"],opts_en:["Trim","Transverse inclination to one side","Draft","Freeboard"],opts_es:["Asiento","Escora","Calado","Francobordo"],opts_pt:["Trim","Banda","Calado","Bordo livre"],exp_fr:"La gîte est l'inclinaison transversale du navire sur le côté, mesurée en degrés.",exp_en:"Heel is the transverse inclination of the vessel to one side, measured in degrees.",cat:"stabilite"},
    {en_term:"Free surface effect",correct_idx:0,opts_fr:["Réduction de GM par liquides en citernes partielles","Gîte statique","Assiette excessive","Perte de flottabilité"],opts_en:["Virtual reduction of GM by liquids in part-filled tanks","Static heel","Excessive trim","Loss of buoyancy"],opts_es:["Reducción de GM por líquidos en tanques parciales","Escora estática","Asiento excesivo","Pérdida de flotabilidad"],opts_pt:["Redução de GM por líquidos em tanques parciais","Banda estática","Trim excessivo","Perda de flutuabilidade"],exp_fr:"L'effet de surface libre réduit virtuellement GM quand des liquides se déplacent dans les citernes partielles.",exp_en:"Free surface effect virtually reduces GM when liquids shift in partially filled tanks.",cat:"stabilite"},
    // CORDAGE
    {en_term:"Splice / Épissure",correct_idx:2,opts_fr:["Nœud","Surlure","Épissure","Amarre"],opts_en:["Knot","Whipping","Permanent junction of rope strands without a knot","Mooring line"],opts_es:["Nudo","Ligada","Empalme","Estacha"],opts_pt:["Nó","Surriola","Emenda permanente","Amarra"],exp_fr:"L'épissure est une jonction permanente entre cordages ou entre les torons, sans nœud.",exp_en:"A splice is a permanent junction between ropes or rope strands, without a knot.",cat:"cordage"},
    {en_term:"Whipping",correct_idx:3,opts_fr:["Épissure","Nœud","Courant","Surlure"],opts_en:["Splice","Knot","Running part","Tight wrapping to prevent fraying"],opts_es:["Empalme","Nudo","Seno","Ligada para evitar deshilachado"],opts_pt:["Emenda","Nó","Seio","Enrolamento para evitar desfiamento"],exp_fr:"La surlure est un enroulement serré de fil fin autour de l'extrémité d'un cordage pour éviter l'effilochage.",exp_en:"Whipping is tight wrapping of thin twine around a rope end to prevent fraying.",cat:"cordage"},
    // MANOEUVRE
    {en_term:"Astern",correct_idx:0,opts_fr:["En arrière / Culer","En avant","Tribord","Bâbord"],opts_en:["Movement toward stern / reverse","Movement forward","Starboard","Port"],opts_es:["Atrás / Ciar","Avante","Estribor","Babor"],opts_pt:["A ré / Ciar","Avante","Estibordo","Bombordo"],exp_fr:"Culer = reculer. Machine arrière. En arrière toute = full astern.",exp_en:"Astern = going backward. Reverse engine. Full astern = maximum reverse.",cat:"manoeuvre"},
    {en_term:"Cast off",correct_idx:1,opts_fr:["Frapper","Larguer les amarres","Haler","Virer"],opts_en:["Make fast","Let go all lines to depart","Heave","Veer"],opts_es:["Dar","Largar las estachas","Cobrar","Filar"],opts_pt:["Dar","Largar as amarras","Halar","Arriar"],exp_fr:"'Cast off all lines!' = larguer toutes les amarres pour appareiller.",exp_en:"'Cast off all lines!' = let go all mooring lines to depart.",cat:"manoeuvre"},
    {en_term:"Veer",correct_idx:2,opts_fr:["Virer","Haler","Filer","Frapper"],opts_en:["Heave in","Make fast","Pay out chain or line under control","Cast off"],opts_es:["Cobrar","Amarrar","Filar","Largar"],opts_pt:["Virar","Amarrar","Arriar","Largar"],exp_fr:"Filer = laisser filer la chaîne ou une amarre sous contrôle (opposé de virer).",exp_en:"Veer = pay out anchor chain or mooring line under control (opposite of heave).",cat:"manoeuvre"},
    {en_term:"Man overboard (MOB)",correct_idx:3,opts_fr:["Échouage","Abordage","Incendie","Homme à la mer"],opts_en:["Grounding","Collision","Fire","Person fallen overboard"],opts_es:["Varada","Abordaje","Incendio","Hombre al agua"],opts_pt:["Encalhe","Colisão","Incêndio","Homem ao mar"],exp_fr:"HAM (Homme à la mer) : urgence critique nécessitant une procédure de récupération immédiate.",exp_en:"MOB (Man overboard): critical emergency requiring immediate recovery procedure.",cat:"securite"},
    // NAVIGATION
    {en_term:"Line of sight (Ligne de foi)",correct_idx:0,opts_fr:["Ligne gravée dans le compas indiquant le cap","Ligne de flottaison","Ligne d'horizon","Ligne d'équateur"],opts_en:["Line engraved in compass indicating the heading","Waterline","Horizon line","Equator line"],opts_es:["Línea de fe","Línea de flotación","Línea del horizonte","Línea del ecuador"],opts_pt:["Linha de fé no compasso","Linha de flutuação","Linha do horizonte","Linha do equador"],exp_fr:"La ligne de foi est gravée dans le compas dans l'axe de la proue. Elle indique le cap du navire.",exp_en:"The line of sight is engraved in the compass along the bow axis, indicating the vessel's heading.",cat:"navigation"},
    {en_term:"Tug",correct_idx:1,opts_fr:["Pilote","Remorqueur","Baliseur","Patrouilleur"],opts_en:["Pilot","Powerful vessel assisting large ships in port","Buoy tender","Patrol boat"],opts_es:["Práctico","Remolcador","Guardaboyas","Patrullero"],opts_pt:["Prático","Rebocador","Guardabóias","Patrulheiro"],exp_fr:"Le remorqueur est un petit navire très puissant assistant les grands navires dans les manœuvres portuaires.",exp_en:"A tug is a powerful small vessel assisting large ships during port manoeuvres.",cat:"navigation"},
    {en_term:"Pilot",correct_idx:2,opts_fr:["Capitaine","Officier de quart","Pilote","Mécanicien"],opts_en:["Master","Officer of the watch","Local professional guiding vessel in port","Engineer"],opts_es:["Capitán","Oficial de guardia","Práctico","Maquinista"],opts_pt:["Capitão","Oficial de quarto","Prático","Maquinista"],exp_fr:"Le pilote est un professionnel local embarqué pour guider le navire dans les eaux portuaires.",exp_en:"A pilot is a local professional embarked to guide the vessel in port waters.",cat:"navigation"},
    // MACHINE
    {en_term:"Engine room",correct_idx:0,opts_fr:["Salle des machines","Cale","Passerelle","Soute à carburant"],opts_en:["Central compartment with main engine and auxiliaries","Hold","Bridge","Fuel bunker"],opts_es:["Sala de máquinas","Bodega","Puente","Tanque de combustible"],opts_pt:["Casa das máquinas","Porão","Passadiço","Tanque de combustível"],exp_fr:"La salle des machines abrite le moteur principal, les générateurs et tous les auxiliaires.",exp_en:"The engine room houses the main engine, generators and all auxiliaries.",cat:"machine"},
    {en_term:"Boiler",correct_idx:3,opts_fr:["Pompe","Compresseur","Purificateur","Chaudière"],opts_en:["Pump","Compressor","Purifier","Apparatus producing steam"],opts_es:["Bomba","Compresor","Purificador","Caldera"],opts_pt:["Bomba","Compressor","Purificador","Caldeira"],exp_fr:"La chaudière produit de la vapeur pour chauffer le fioul lourd, l'eau sanitaire et certains auxiliaires.",exp_en:"A boiler produces steam to heat heavy fuel, domestic water and some auxiliaries.",cat:"machine"},
  ];
}

// ── QUIZ TAB ──────────────────────────────────────────────────
function QuizTab({ lang, onComplete }: { lang: string; onComplete: (xp: number) => void }) {
  const t = T[lang]||T.fr;
  const quiz = getQuiz();
  const [cur,setCur]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [confirmed,setConfirmed]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);

  const q=quiz[cur];
  const opts=lang==="fr"?q.opts_fr:lang==="es"?q.opts_es:lang==="pt"?q.opts_pt:q.opts_en;
  const exp=lang==="fr"?q.exp_fr:q.exp_en;
  const isCorrect=selected===q.correct_idx;
  const optColors=[C.blue2,C.gold2,C.safe,C.purple];

  const handleConfirm=()=>{if(selected===null)return;setConfirmed(true);if(isCorrect)setScore(s=>s+1);};
  const handleNext=()=>{if(cur+1>=quiz.length){setDone(true);return;}setCur(c=>c+1);setSelected(null);setConfirmed(false);};

  const xp=score>=28?250:score>=24?200:score>=20?160:score>=15?120:score>=10?80:60;

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:42,marginBottom:8}}>📖</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:36,fontWeight:900,color:C.gold2,marginBottom:4}}>{xp}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{t.xpLabel}</div>
        <div style={{marginTop:8,fontSize:14,color:"#f0f4ff",fontFamily:"Courier New"}}>{t.score} : {score}/{quiz.length}</div>
      </div>
      <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.gold}44`,padding:14,marginBottom:16}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.gold,marginBottom:10}}>📖 {lang==="fr"?"Termes clés":lang==="es"?"Términos clave":lang==="pt"?"Termos-chave":"Key terms"}</div>
        {["Bow = Proue / Proa / Proa","Stern = Poupe / Popa / Popa","Port = Bâbord (rouge) / Babor / Bombordo","Starboard = Tribord (vert) / Estribor / Estibordo","Bollard = Bitte d'amarrage / Bolardo","Spring = Garde / Espía / Espreguia","Scope = Portée de mouillage (min 3×)","GM > 0 = navire stable","Hawse pipe = Écubier","MOB = Homme à la mer"].map((k,i)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:5,fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.4}}>
            <span style={{color:C.gold,flexShrink:0}}>✦</span><span>{k}</span>
          </div>
        ))}
      </div>
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#1a6fd4,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>⚓ {t.finish}</button>
      <button onClick={()=>{setCur(0);setSelected(null);setConfirmed(false);setScore(0);setDone(false);}} style={{width:"100%",padding:"12px 0",marginTop:8,border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,background:"none",color:"rgba(240,244,255,0.45)",fontSize:12,cursor:"pointer",fontFamily:"Courier New"}}>{t.retry}</button>
    </div>
  );

  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:11,color:"rgba(240,244,255,0.4)",fontFamily:"Courier New"}}>Q{cur+1}/{quiz.length}</div>
        <div style={{fontSize:11,color:C.gold2,fontFamily:"Courier New"}}>⭐ {score}/{quiz.length}</div>
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.blue2},${C.gold})`,width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>

      {/* Category pill */}
      {CATS[q.cat]&&(
        <div style={{marginBottom:10}}>
          <div style={{fontSize:9,padding:"2px 8px",borderRadius:8,display:"inline-block",background:`${CATS[q.cat].color}18`,border:`1px solid ${CATS[q.cat].color}44`,color:CATS[q.cat].color}}>{CATS[q.cat].icon} {CATS[q.cat].label[lang]||CATS[q.cat].label.fr}</div>
        </div>
      )}

      {/* Question */}
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:14,borderRadius:10,background:`${C.navy2}cc`,border:`1px solid ${C.blue2}22`,textAlign:"center"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.blue2,marginBottom:8,letterSpacing:1}}>
          {lang==="fr"?"Que signifie":lang==="es"?"¿Qué significa":lang==="pt"?"O que significa":"What does"} :
        </div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.gold2}}>{q.en_term}</div>
        <div style={{fontSize:10,color:"rgba(240,244,255,0.35)",marginTop:6,fontFamily:"Courier New"}}>
          {lang==="fr"?"Choisissez la bonne traduction / définition":lang==="es"?"Elige la traducción correcta":lang==="pt"?"Escolha a tradução correta":"Choose the correct translation / definition"}
        </div>
      </div>

      {/* Options */}
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
        {opts.map((opt:string,i:number)=>{
          let border=`1px solid ${optColors[i]}44`,bg=`${optColors[i]}11`;
          if(confirmed){if(i===q.correct_idx){border="2px solid #4ade80";bg="rgba(74,222,128,0.12)";}else if(i===selected&&!isCorrect){border="2px solid #ef4444";bg="rgba(239,68,68,0.12)";}}
          else if(selected===i){border=`2px solid ${optColors[i]}`;bg=`${optColors[i]}22`;}
          return(
            <button key={i} disabled={confirmed} onClick={()=>setSelected(i)} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderRadius:12,border,background:bg,cursor:confirmed?"default":"pointer",color:"#f0f4ff",textAlign:"left"}}>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:optColors[i],flexShrink:0}}>{String.fromCharCode(65+i)}</span>
              <span style={{fontSize:12,fontFamily:"Courier New",lineHeight:1.4}}>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {confirmed&&(
        <div style={{padding:10,borderRadius:10,marginBottom:12,background:isCorrect?"rgba(74,222,128,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${isCorrect?"#4ade80":"#ef4444"}44`,fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.6}}>
          <div style={{fontWeight:700,marginBottom:4,color:isCorrect?"#4ade80":"#ef4444"}}>{isCorrect?t.correct:t.wrong}</div>
          <div style={{marginBottom:4}}>{exp}</div>
          <div style={{fontSize:11,color:"rgba(240,244,255,0.5)"}}>🇬🇧 {q.en_term} = 🇫🇷 {q.opts_fr[q.correct_idx]} | 🇪🇸 {q.opts_es[q.correct_idx]} | 🇧🇷 {q.opts_pt[q.correct_idx]}</div>
        </div>
      )}

      {!confirmed
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?`linear-gradient(135deg,${C.blue2},${C.gold})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{t.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.blue2},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?t.finish:t.next}</button>
      }
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────
export default function LexiqueMaritime({ lang="fr", onBack, onComplete }: {
  lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void;
}) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      {/* Header */}
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.gold}33`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.gold,marginBottom:2}}>TOOLS · GRATUIT</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#f0f4ff"}}>📖 {t.title}</div>
          </div>
          <div style={{fontSize:10,color:"rgba(240,244,255,0.4)",fontFamily:"Courier New",flexShrink:0}}>{SORTED_LEXICON.length} {t.terms}</div>
        </div>
      </div>

      {/* Free badge */}
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:"rgba(30,138,74,0.15)",border:"1px solid rgba(30,138,74,0.4)"}}>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"#6dbf8a",letterSpacing:1}}>🆓 {t.subtitle} · 10 CATÉGORIES</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",padding:"10px 14px 0",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
        {t.tabs.map((label:string,i:number)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",borderRadius:10,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",background:tab===i?`${C.blue2}22`:"rgba(255,255,255,0.04)",border:`1px solid ${tab===i?C.blue2:"rgba(255,255,255,0.1)"}`,color:tab===i?C.blue2:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{label}</button>
        ))}
      </div>

      <div>
        {tab===0&&<DictionaryTab lang={lang}/>}
        {tab===1&&<FlashcardTab lang={lang}/>}
        {tab===2&&<QuizTab lang={lang} onComplete={(xp)=>{if(onComplete)onComplete(xp);}}/>}
      </div>
    </div>
  );
}
