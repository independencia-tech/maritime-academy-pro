// LessonE2_L5 — Tableaux electriques & Distribution | PART 1
import { useState } from "react";

const C = {
  cyan:   "#00e5ff",
  blue:   "#2979ff",
  teal:   "#00bcd4",
  green:  "#4caf50",
  amber:  "#ffab00",
  warn:   "#ff6f00",
  red:    "#ef5350",
  purple: "#7c4dff",
  navy:   "#060e1a",
  navy2:  "#0a1628",
  navy3:  "#0d1f3c",
  dim:    "rgba(240,244,255,0.55)",
  text:   "#e0e8ff",
  white:  "#f0f4ff",
};

const T: any = {
  fr: {
    moduleLabel: "MACHINE — AUXILIAIRES",
    lessonTitle: "Tableaux electriques & Distribution",
    lessonSub:   "MSB, ESB, selectivite, cables MICC/XLPE",
    intro: "Le tableau electrique principal (MSB) est le coeur du reseau electrique d'un navire. Il recoit l'energie des groupes electrogenes et la distribue a tous les consommateurs. Comprendre son architecture et ses protections est essentiel pour tout mecanicien.",
    s1title: "Architecture du tableau principal (MSB)",
    s2title: "Hierarchie de distribution",
    s3title: "Types de cables et section",
    s4title: "Selectivite des protections",
    s1hint:  "Tapez une section pour voir sa description",
    s2hint:  "Selectionnez un niveau de distribution",
    s3hint:  "Selectionnez un type de cable",
    s4hint:  "Selectionnez un niveau de protection",
    exerciseTitle: "Exercices pratiques",
    showAnswer: "Voir la correction",
    hideAnswer: "Masquer",
    accidentTitle: "CAS REEL : Incendie tableau electrique — MV Atlantic Crown (2016)",
    accidentBody: "En transit Atlantique Nord, un arc electrique dans le MSB provoque un incendie du tableau principal a 22h40. Cause : connexion mal serree sur une barre de distribution soumise a des vibrations repetees, generant un arc de 4 kA. Les cables XLPE du circuit d'alarme incendie fondent dans les 2 premieres minutes — le systeme d'alarme incendie tombe avant que l'equipage soit alerte. Le feu se propage pendant 8 minutes sans detection. Bilan : 1 blesse grave, tableau MSB detruit, 5 jours d'immobilisation. Lecon : les circuits d'alarme incendie DOIVENT etre cables en MICC (resiste a 1000°C). Verification des couples de serrage tous les 6 mois obligatoire.",
    summaryTitle: "Points essentiels",
    summary: [
      "Le MSB (Main Switchboard) recoit tous les groupes et distribue vers les tableaux secondaires",
      "La selectivite garantit que seul le disjoncteur le plus proche du defaut se declenche",
      "Les cables sont classifies par section (mm2) selon l'intensite a transporter",
      "Le tableau de secours (ESB) est alimente par le groupe de secours — circuits SOLAS vitaux",
      "Les MICC (cables mineraux) resistent au feu > 1000°C — obligatoires pour circuits vitaux SOLAS",
      "Calcul du courant moteur : I = P / (racine(3) x U x cos phi)",
    ],
    quizCTA: "COMMENCER LE QUIZ",
    bankStart: "COMMENCER =>",
    bankNext: "Question suivante =>",
    bankTrophy: "Bravo ! Banque terminee",
    bankScore: "Score banque",
    sections: {
      incoming:  { name: "Arrivees groupes (Incoming)", desc: "Section recevant les arrivees de chaque groupe electrogene via son disjoncteur ACB. Chaque groupe se connecte aux jeux de barres via son propre ACB equipe de protections surintensie, court-circuit et puissance inverse." },
      busbar:    { name: "Jeux de barres (Busbars)",   desc: "Conducteurs de cuivre massif L1/L2/L3 alimentant toutes les departs. Divises en sections isolables par des coupleurs (bus-tie). Sur grands navires : deux demi-jeux de barres pour la securite." },
      feeder:    { name: "Departs (Feeders)",          desc: "Circuits de distribution vers les tableaux secondaires et consommateurs importants. Chaque depart est protege par un disjoncteur MCCB (Moulded Case Circuit Breaker) calibre selon la charge." },
      metering:  { name: "Instrumentation & Mesures",  desc: "Voltmetres, amperemetres, wattmetres, frequencemetres, cosphi-metres. Permettent de surveiller en permanence l'etat du reseau et d'equilibrer les charges entre groupes." },
      synchro:   { name: "Panneau de synchronisation", desc: "Synchroscope, lampes de synchronisation, selecteur de groupe. Permet de coupler les groupes en parallele en verifiant tension, frequence et concordance de phase." },
      emergency: { name: "Tableau de secours (ESB)",   desc: "Emergency Switchboard — alimente automatiquement par le groupe de secours en cas de panne du MSB. Alimente les circuits vitaux SOLAS : navigation, communication, pompes incendie, eclairage de secours." },
    },
    distribution: {
      msb: { name: "MSB — Tableau Principal",    desc: "Main Switchboard — niveau 1. Recoit les groupes, distribue vers les tableaux de zone et consommateurs importants (propulsion, gros moteurs). Tension : 440V triphase.", voltage: "440V 3phase" },
      ssb: { name: "SSB — Tableau Secondaire",   desc: "Secondary Switchboard — niveau 2. Recoit du MSB et distribue vers les panneaux de zone ou appareils. Peut reduire la tension (transformateur 440V => 220V).", voltage: "440V / 220V" },
      lp:  { name: "Panneau de distribution (LP)", desc: "Local Panel — niveau 3. Distribution finale vers les consommateurs individuels : moteurs, eclairage, chauffage. Protege par fusibles ou petits disjoncteurs MCB.", voltage: "220V / 24V" },
      esb: { name: "ESB — Tableau de Secours",   desc: "Emergency Switchboard — reseau parallele alimente par le groupe de secours. Circuits vitaux uniquement : navigation, comm, pompe incendie.", voltage: "440V 3phase" },
    },
    cables: {
      xlpe:    { name: "XLPE — Polyethylene reticule", desc: "Cable standard a bord. Isolation en polyethylene reticule resistant a 90°C. Flexible, resistant a l'humidite. Utilise pour la majorite des circuits de puissance et controle." },
      micc:    { name: "MICC — Cable mineral",         desc: "Mineral Insulated Copper Conductor — isolation en poudre de magnesium. Resiste au feu (> 1000°C). Obligatoire SOLAS pour circuits vitaux : alarmes incendie, eclairage de secours, pompes incendie." },
      lsf:     { name: "LSF — Faible emission fumee",  desc: "Low Smoke & Fume — gaine sans halogene. En cas d'incendie, produit peu de fumee et de gaz toxiques. Recommande dans les espaces habites et voies d'evacuation." },
      armored: { name: "Cable arme (SWA)",             desc: "Steel Wire Armoured — protection mecanique en fils d'acier. Utilise dans les zones exposees aux chocs et contraintes mecaniques (cales, ponts exterieurs, passages de cloisons)." },
    },
    selectivity: {
      main:   { name: "Disjoncteur principal (ACB)",  desc: "Dernier recours — ne se declenche que si les protections inferieures ont failli. Calibre eleve (In = 100% courant groupe). Delai intentionnel pour permettre aux disjoncteurs aval de declencher d'abord." },
      feeder: { name: "Disjoncteur de depart (MCCB)", desc: "Protege le circuit de distribution. Se declenche en cas de defaut sur le cable ou tableau alimente. Calibre inferieur au disjoncteur principal." },
      final:  { name: "Disjoncteur final (MCB)",      desc: "Protege le circuit terminal et l'appareil. Calibre le plus faible — declenche le premier en cas de defaut. Selectivite garantie si In(MCB) < In(MCCB) < In(ACB)." },
      fuse:   { name: "Fusible de protection",        desc: "Protection a action unique (fond et doit etre remplace). Plus rapide qu'un disjoncteur pour les forts courts-circuits. Utilise en protection de transformateurs et circuits sensibles." },
    },
    exercises: [
      { q: "Expliquez le principe de selectivite des protections electriques et pourquoi il est critique a bord d'un navire.", a: "La selectivite (ou discrimination) est le principe qui garantit qu'en cas de defaut electrique, seul le disjoncteur le plus proche du defaut se declenche, laissant le reste du reseau alimente. A bord, c'est critique car une coupure totale du reseau peut mettre en danger la securite (perte propulsion, navigation, pompes incendie). Pour assurer la selectivite : les disjoncteurs sont calibres en cascade (In MCB < In MCCB < In ACB) et les disjoncteurs principaux ont un delai intentionnel de declenchement pour laisser les protections aval agir d'abord." },
      { q: "Pourquoi les cables MICC sont-ils obligatoires pour certains circuits a bord ? Donnez des exemples de circuits concernes.", a: "Les cables MICC (Mineral Insulated Copper Conductor) sont obligatoires selon SOLAS pour les circuits qui doivent continuer a fonctionner en cas d'incendie a bord, car leur isolation en poudre de magnesium resiste a des temperatures superieures a 1000°C. Circuits concernes : systemes d'alarme incendie et detection, eclairage de secours et de securite, pompes incendie et sprinklers, systemes de communication d'urgence, tableaux de secours (ESB). Sur ces circuits, l'integrite du cable en cas d'incendie est vitale pour la survie du navire et de l'equipage." },
      { q: "Comment calculer la section de cable necessaire pour alimenter un moteur de 15 kW / 440V triphase avec un facteur de puissance de 0,85 ?", a: "1. Calculer le courant : I = P / (racine(3) x U x cos phi) = 15000 / (1,732 x 440 x 0,85) = 15000 / 648 = 23,1 A. 2. Appliquer un coefficient de securite (generalement x1,25 pour moteurs) : 23,1 x 1,25 = 28,9 A. 3. Choisir la section dans les tables : pour 29 A en pose libre, une section de 6 mm2 XLPE convient (capacite ~36A). Verifier la chute de tension sur la longueur du cable (max 3-5% pour circuits de puissance). Choisir une section superieure si la chute de tension est trop elevee." },
    ],
    bankQuestions: [
      { q: "Qu'est-ce que le MSB et quelles sont ses fonctions principales ?", a: "Le MSB (Main Switchboard — Tableau Principal) est le centre de distribution electrique du navire. Fonctions : recevoir l'energie de tous les groupes electrogenes, distribuer vers les tableaux secondaires et consommateurs importants, assurer la protection du reseau (disjoncteurs ACB), permettre le couplage des groupes en parallele (synchroscope), mesurer et surveiller les parametres du reseau (voltmetre, amperemetre, wattmetre, frequencemetre)." },
      { q: "Qu'est-ce qu'un jeu de barres (busbar) et pourquoi certains navires en ont-ils deux ?", a: "Le jeu de barres est un conducteur de cuivre massif constituant le point de connexion central du MSB. Certains grands navires ont deux demi-jeux de barres separes par un coupleur (bus-tie breaker). Cette disposition permet : de sectionner le reseau en deux parties independantes (securite), de maintenir l'alimentation d'une moitie si l'autre est defaillante, de faciliter la maintenance sans coupure totale." },
      { q: "Quelle est la difference entre un ACB, un MCCB et un MCB ?", a: "ACB (Air Circuit Breaker) : disjoncteur haute puissance pour les arrivees groupes et departs principaux. Calibres eleves (100A a plusieurs kA). MCCB (Moulded Case Circuit Breaker) : disjoncteur en boitier moule pour les departs secondaires. Calibres moyens (16A a 800A). MCB (Miniature Circuit Breaker) : petit disjoncteur pour circuits terminaux (eclairage, prises). Calibres faibles (1A a 125A)." },
      { q: "Qu'est-ce que l'ESB et quels circuits doit-il alimenter selon SOLAS ?", a: "L'ESB (Emergency Switchboard) est un tableau electrique independant alimente par le groupe electrogene de secours. Situe au-dessus de la ligne de flottaison et hors de la salle des machines principale. Circuits SOLAS obligatoires : feux de navigation et lanternes, radio de detresse et GMDSS, systeme d'alarme incendie, eclairage de secours (couloirs, escaliers, postes de rassemblement), pompe incendie de secours, systemes de fermeture des portes coupe-feu, commandes de ventilation de secours." },
      { q: "Pourquoi utilise-t-on des transformateurs dans le systeme de distribution electrique a bord ?", a: "Les transformateurs permettent d'adapter la tension selon les besoins des consommateurs : 440V => 220V pour l'eclairage et les appareils domestiques, 440V => 24V DC (via redresseur) pour les systemes de controle et alarmes. Ils permettent aussi d'isoler galvaniquement certains circuits (securite) et de stabiliser la tension dans des zones eloignees du MSB." },
      { q: "Comment est assure l'equilibrage des charges entre plusieurs groupes en parallele ?", a: "L'equilibrage des charges se fait en deux parties : Puissance active (kW) : ajustement du governor de chaque groupe (admission carburant). Puissance reactive (kVAR) : ajustement de l'AVR de chaque groupe (courant d'excitation). L'objectif est d'avoir un facteur de puissance identique sur chaque groupe. Un desequilibre de charge cree des courants de circulation entre groupes, pouvant causer des dommages." },
      { q: "Qu'est-ce que la section d'un cable et comment la choisit-on ?", a: "La section d'un cable (en mm2) represente l'aire de la section transversale du conducteur en cuivre. Elle determine la capacite de transport de courant (ampacite). Choix : calculer le courant nominal du circuit, appliquer les coefficients de correction (temperature ambiante, mode de pose, groupement de cables), consulter les tables de capacite de courant selon le type de cable et le mode de pose, verifier la chute de tension admissible. Sections courantes : 1,5mm2 (eclairage), 2,5mm2 (prises), 4-6mm2 (petits moteurs), 16-95mm2 (gros moteurs)." },
      { q: "Qu'est-ce que la chute de tension et quelles sont les limites admissibles a bord ?", a: "La chute de tension est la difference de tension entre le debut et la fin d'un circuit due a la resistance du cable. Formule : delta U = (2 x L x I x rho) / S, ou L = longueur (m), I = courant (A), rho = resistivite cuivre (0,0175 ohm.mm2/m), S = section (mm2). Limites a bord : circuits de puissance (moteurs) : max 5%, circuits d'eclairage : max 3%, circuits de controle/signalisation : max 2%." },
      { q: "Qu'est-ce qu'un transformateur d'isolement et pourquoi est-il utilise a bord ?", a: "Un transformateur d'isolement a le meme rapport de transformation (1:1) mais isole galvaniquement le circuit secondaire du circuit primaire. Il est utilise pour les circuits medicaux (infirmerie, bloc operatoire), les prises dans les salles de bain et sanitaires (securite electrique), certains equipements de navigation sensibles. L'isolation galvanique empeche les courants de defaut de circuler via le corps humain en cas de contact accidentel." },
      { q: "Comment fonctionne un relais de protection differentielle pour alternateur ?", a: "La protection differentielle compare le courant entrant et le courant sortant de l'enroulement de l'alternateur. En fonctionnement normal, ces courants sont egaux et le courant differentiel est nul. Si un defaut interne se produit (court-circuit d'enroulement, mise a la terre interne), une partie du courant passe par le chemin de defaut et cree un desequilibre. Quand ce courant differentiel depasse le seuil regle, le relais declenche instantanement le disjoncteur de l'alternateur." },
      { q: "Qu'est-ce que la selectivite amperemetrique et la selectivite temporelle ?", a: "Selectivite amperemetrique : basee sur la difference de calibre entre disjoncteurs. Si In(MCB) << In(MCCB), pour un courant de defaut entre les deux valeurs, seul le MCB declenche. Fonctionne bien pour les surcharges et petits courts-circuits. Selectivite temporelle : ajout d'un delai intentionnel sur les disjoncteurs de niveau superieur. Le MCCB declenche immediatement, l'ACB attend 0,1s. Combinaison des deux methodes pour une selectivite totale." },
      { q: "Quelles sont les verifications periodiques a effectuer sur un MSB ?", a: "Verifications quotidiennes : releve des parametres (tension, frequence, charge, cos phi), controle visuel des voyants et alarmes. Verifications mensuelles : test de declenchement des disjoncteurs, verification des connexions (resserrage si necessaire), nettoyage des contacts et jeux de barres. Verifications annuelles/quinquennales : test des protections (injection de courant), verification de l'isolement des circuits, calibrage des instruments de mesure. Ces verifications sont reglementees et documentees dans le Plan de Maintenance Preventive." },
    ],
    quiz: [
      { q: "Quel est le role principal du MSB (Main Switchboard) ?", opts: ["Controler la vitesse du moteur principal", "Recevoir l'energie des groupes et la distribuer a bord", "Mesurer la temperature des moteurs", "Reguler la pression de la vapeur"], correct: 1, exp: "Le MSB (Main Switchboard) est le tableau principal qui recoit l'energie de tous les groupes electrogenes et la distribue a l'ensemble du navire via les tableaux secondaires et circuits de distribution." },
      { q: "Quel type de cable est obligatoire selon SOLAS pour les circuits d'alarme incendie ?", opts: ["XLPE standard", "LSF sans halogene", "MICC mineral", "SWA arme"], correct: 2, exp: "Les cables MICC (Mineral Insulated Copper Conductor) sont obligatoires SOLAS pour les circuits vitaux devant fonctionner en cas d'incendie. Leur isolation en poudre de magnesium resiste a plus de 1000°C." },
      { q: "Pour assurer la selectivite, quelle relation doit exister entre les calibres des disjoncteurs ?", opts: ["In(ACB) < In(MCCB) < In(MCB)", "In(MCB) < In(MCCB) < In(ACB)", "Tous les disjoncteurs doivent avoir le meme calibre", "In(MCCB) = In(ACB)"], correct: 1, exp: "La selectivite exige que In(MCB) < In(MCCB) < In(ACB). Ainsi, en cas de defaut, le disjoncteur de calibre le plus faible (le plus proche du defaut) declenche le premier, laissant les circuits en amont alimentes." },
      { q: "Qu'est-ce que l'ESB (Emergency Switchboard) ?", opts: ["Le tableau de distribution secondaire", "Le tableau alimente par le groupe de secours pour les circuits vitaux SOLAS", "Le tableau de controle du moteur principal", "Le panneau de synchronisation des groupes"], correct: 1, exp: "L'ESB (Emergency Switchboard) est le tableau de secours alimente par le groupe electrogene de secours. Il alimente les circuits vitaux SOLAS (navigation, communication, pompe incendie, eclairage secours) en cas de panne du MSB." },
      { q: "Pour un moteur triphase 440V / 10 kW / cos phi = 0,85, quel est approximativement le courant nominal ?", opts: ["7,7 A", "15,4 A", "30,8 A", "46,2 A"], correct: 1, exp: "I = P / (racine(3) x U x cos phi) = 10000 / (1,732 x 440 x 0,85) = 10000 / 648 = 15,4 A. Avec le coefficient de securite moteur (x1,25) : 19,3 A. On choisira un MCCB calibre a 20A et un cable de 4mm2." },
    ],
  },

  en: {
    moduleLabel: "ENGINE — AUXILIARIES",
    lessonTitle: "Switchboards & Electrical Distribution",
    lessonSub:   "MSB, ESB, selectivity, MICC/XLPE cables",
    intro: "The Main Switchboard (MSB) is the heart of a vessel's electrical network. It receives power from generating sets and distributes it to all consumers. Understanding its architecture and protections is essential for any engineer.",
    s1title: "Main Switchboard (MSB) Architecture",
    s2title: "Distribution Hierarchy",
    s3title: "Cable Types and Cross-Section",
    s4title: "Protection Selectivity",
    s1hint:  "Tap a section to see its description",
    s2hint:  "Select a distribution level",
    s3hint:  "Select a cable type",
    s4hint:  "Select a protection level",
    exerciseTitle: "Practice Exercises",
    showAnswer: "Show answer",
    hideAnswer: "Hide",
    accidentTitle: "REAL CASE: Switchboard fire — MV Atlantic Crown (2016)",
    accidentBody: "On North Atlantic transit, an electric arc in the MSB caused a fire at 22:40. Cause: loose connection on a distribution busbar subjected to repeated vibration, generating a 4 kA arc. XLPE cables on the fire alarm circuit melted within the first 2 minutes — the fire alarm system failed before the crew was alerted. Fire spread for 8 minutes undetected. Result: 1 seriously injured, MSB destroyed, 5 days detention. Lesson: fire alarm circuits MUST be cabled in MICC (withstands 1000°C). Torque checking of connections mandatory every 6 months.",
    summaryTitle: "Key Points",
    summary: [
      "The MSB (Main Switchboard) receives all generators and distributes to secondary switchboards",
      "Selectivity ensures only the breaker closest to the fault trips",
      "Cables are rated by cross-section (mm2) according to current to be carried",
      "The Emergency Switchboard (ESB) feeds SOLAS vital circuits from the emergency generator",
      "MICC cables are fire-resistant > 1000°C — mandatory for SOLAS vital circuits",
      "Motor current formula: I = P / (sqrt(3) x U x cos phi)",
    ],
    quizCTA: "START QUIZ",
    bankStart: "START =>",
    bankNext: "Next question =>",
    bankTrophy: "Well done! Bank completed",
    bankScore: "Bank score",
    sections: {
      incoming:  { name: "Generator Incomers",       desc: "Section receiving each generator's incoming supply via its ACB circuit breaker. Each generator connects to the busbars via its own ACB equipped with overcurrent, short-circuit and reverse power protections." },
      busbar:    { name: "Busbars",                  desc: "Solid copper L1/L2/L3 conductors feeding all outgoing feeders. Divided into isolatable sections by bus-tie breakers. Large vessels: two half-busbars for safety." },
      feeder:    { name: "Feeders",                  desc: "Distribution circuits to secondary switchboards and important consumers. Each feeder protected by an MCCB (Moulded Case Circuit Breaker) rated according to load." },
      metering:  { name: "Instrumentation & Metering", desc: "Voltmeters, ammeters, wattmeters, frequency meters, power factor meters. Allow continuous monitoring of network status and load balancing between generators." },
      synchro:   { name: "Synchronising Panel",      desc: "Synchroscope, synchronising lamps, generator selector. Allows parallel coupling of generators by checking voltage, frequency and phase concordance." },
      emergency: { name: "Emergency Switchboard (ESB)", desc: "Automatically fed by emergency generator on MSB failure. Supplies SOLAS vital circuits: navigation, communication, fire pumps, emergency lighting." },
    },
    distribution: {
      msb: { name: "MSB — Main Switchboard",      desc: "Level 1. Receives generators, distributes to zone switchboards and major consumers (propulsion, large motors). Voltage: 440V three-phase.", voltage: "440V 3phase" },
      ssb: { name: "SSB — Secondary Switchboard", desc: "Level 2. Receives from MSB and distributes to zone panels or equipment. May step down voltage (transformer 440V=>220V).", voltage: "440V / 220V" },
      lp:  { name: "Distribution Panel (LP)",     desc: "Local Panel — Level 3. Final distribution to individual consumers: motors, lighting, heating. Protected by fuses or small MCB breakers.", voltage: "220V / 24V" },
      esb: { name: "ESB — Emergency Switchboard", desc: "Parallel network fed by emergency generator. Vital circuits only: navigation, comms, fire pump.", voltage: "440V 3phase" },
    },
    cables: {
      xlpe:    { name: "XLPE — Cross-Linked Polyethylene", desc: "Standard on-board cable. Cross-linked polyethylene insulation rated to 90°C. Flexible, moisture-resistant. Used for the majority of power and control circuits." },
      micc:    { name: "MICC — Mineral Insulated Cable",   desc: "Mineral Insulated Copper Conductor — magnesium powder insulation. Fire-resistant (>1000°C). SOLAS mandatory for vital circuits: fire alarms, emergency lighting, fire pumps." },
      lsf:     { name: "LSF — Low Smoke & Fume",           desc: "Halogen-free sheath. In case of fire, produces little smoke and toxic gas. Recommended in occupied spaces and evacuation routes." },
      armored: { name: "Armoured Cable (SWA)",              desc: "Steel Wire Armoured — mechanical protection with steel wires. Used in areas exposed to shock and mechanical stress (holds, open decks, bulkhead penetrations)." },
    },
    selectivity: {
      main:   { name: "Main Circuit Breaker (ACB)",  desc: "Last resort — only trips if downstream protections have failed. High rating (In = 100% generator current). Intentional delay to allow downstream breakers to trip first." },
      feeder: { name: "Feeder Circuit Breaker (MCCB)", desc: "Protects the distribution circuit. Trips on fault on the cable or fed switchboard. Rating below main breaker." },
      final:  { name: "Final Circuit Breaker (MCB)", desc: "Protects the terminal circuit and equipment. Lowest rating — trips first on fault. Selectivity ensured if In(MCB) < In(MCCB) < In(ACB)." },
      fuse:   { name: "Fuse Protection",             desc: "Single-action protection (melts and must be replaced). Faster than a breaker for heavy short circuits. Used for transformer and sensitive circuit protection." },
    },
    exercises: [
      { q: "Explain the principle of protection selectivity and why it is critical on board a vessel.", a: "Selectivity (or discrimination) ensures that on an electrical fault, only the circuit breaker closest to the fault trips, leaving the rest of the network energised. On board this is critical as total power loss can endanger safety (loss of propulsion, navigation, fire pumps). To ensure selectivity: breakers are cascade-rated (In MCB < In MCCB < In ACB) and main breakers have intentional tripping delays to allow downstream protections to act first." },
      { q: "Why are MICC cables mandatory for certain circuits on board? Give examples.", a: "MICC cables are mandatory per SOLAS for circuits that must continue to function during a fire, as their magnesium powder insulation withstands temperatures above 1000°C. Concerned circuits: fire alarm and detection systems, emergency and safety lighting, fire pumps and sprinklers, emergency communication systems, emergency switchboards. Cable integrity during a fire is vital for vessel and crew survival." },
      { q: "How do you calculate the cable cross-section needed to supply a 15 kW / 440V three-phase motor with a power factor of 0.85?", a: "1. Calculate current: I = P / (sqrt(3) x U x cos phi) = 15000 / (1.732 x 440 x 0.85) = 23.1 A. 2. Apply safety factor (x1.25 for motors): 23.1 x 1.25 = 28.9 A. 3. Select cross-section from tables: for 29 A in free air, 6 mm2 XLPE is suitable (capacity ~36A). Check voltage drop over cable length (max 3-5% for power circuits)." },
    ],
    bankQuestions: [
      { q: "What is the MSB and what are its main functions?", a: "The MSB (Main Switchboard) is the vessel's central electrical distribution point. Functions: receive power from all generating sets, distribute to secondary switchboards and major consumers, provide network protection (ACB circuit breakers), allow parallel generator coupling (synchroscope), measure and monitor network parameters." },
      { q: "What is a busbar and why do some vessels have two?", a: "A busbar is a solid copper conductor forming the MSB's central connection point. Two half-busbars allow: splitting the network into two independent sections, maintaining supply to one half if the other fails, facilitating maintenance without total shutdown." },
      { q: "What is the difference between an ACB, MCCB and MCB?", a: "ACB (Air Circuit Breaker): high-power breaker for generator incomers and main feeders. High ratings (100A to several kA). Re-closable. MCCB (Moulded Case Circuit Breaker): moulded case breaker for secondary feeders. Medium ratings (16A to 800A). MCB (Miniature Circuit Breaker): small breaker for terminal circuits. Low ratings (1A to 125A)." },
      { q: "What is the ESB and which circuits must it supply per SOLAS?", a: "The ESB (Emergency Switchboard) is an independent switchboard fed by the emergency generator. Located above the waterline and outside the main engine room. SOLAS mandatory circuits: navigation lights, distress radio and GMDSS, fire alarm system, emergency lighting, emergency fire pump, fire door closure controls, emergency ventilation controls." },
      { q: "Why are transformers used in the on-board electrical distribution system?", a: "Transformers adapt voltage to consumer requirements: 440V=>220V for lighting and domestic appliances, 440V=>24V DC (via rectifier) for control and alarm systems. They also provide galvanic isolation for certain circuits and stabilise voltage in areas remote from the MSB." },
      { q: "How is load sharing ensured between several generators running in parallel?", a: "Load sharing in two parts: Active power (kW): governor adjustment (fuel admission). If one takes more load, reduce its governor and increase the other's. Reactive power (kVAR): AVR adjustment (excitation current). Aim for identical power factor on each generator. Load imbalance creates circulating currents." },
      { q: "What is cable cross-section and how is it chosen?", a: "Cable cross-section (in mm2) determines current-carrying capacity (ampacity). Selection: calculate circuit nominal current, apply correction factors (ambient temperature, installation method, cable grouping), consult current capacity tables, check admissible voltage drop. Common sections: 1.5mm2 (lighting), 2.5mm2 (sockets), 4-6mm2 (small motors), 16-95mm2 (large motors)." },
      { q: "What is voltage drop and what are the admissible limits on board?", a: "Voltage drop is the difference in voltage between start and end of a circuit due to cable resistance. Formula: delta V = (2 x L x I x rho) / S. Limits on board: power circuits (motors): max 5%, lighting circuits: max 3%, control/signalling circuits: max 2%." },
      { q: "What is an isolation transformer and why is it used on board?", a: "An isolation transformer (1:1 ratio) galvanically isolates the secondary circuit from the primary. Used for: medical circuits (sick bay), sockets in bathrooms (electrical safety), sensitive navigation equipment. Galvanic isolation prevents fault currents from flowing through the human body." },
      { q: "How does a differential protection relay work for an alternator?", a: "Differential protection compares current entering and leaving the alternator winding. Normally equal, differential current is zero. If an internal fault occurs (winding short circuit, internal earth fault), some current takes the fault path creating an imbalance. When it exceeds the set threshold, the relay instantly trips the alternator's circuit breaker." },
      { q: "What is current selectivity and time selectivity?", a: "Current selectivity: based on rating difference between breakers. If In(MCB) << In(MCCB), for a fault current between the two values, only the MCB trips. Time selectivity: intentional delay on higher-level breakers. MCCB trips immediately, ACB waits 0.1s. Combining both methods achieves total selectivity." },
      { q: "What periodic checks should be performed on an MSB?", a: "Daily: parameter readings (voltage, frequency, load, cos phi), visual check of indicators and alarms. Monthly: breaker trip testing, connection checks (retightening), contact and busbar cleaning. Annual/5-year: protection testing (current injection), insulation check, instrument calibration. All documented in the Planned Maintenance System." },
    ],
    quiz: [
      { q: "What is the main role of the MSB (Main Switchboard)?", opts: ["Control main engine speed", "Receive generator power and distribute it on board", "Measure motor temperatures", "Regulate steam pressure"], correct: 1, exp: "The MSB receives power from all generating sets and distributes it throughout the vessel via secondary switchboards and distribution circuits." },
      { q: "Which cable type is SOLAS mandatory for fire alarm circuits?", opts: ["Standard XLPE", "LSF halogen-free", "MICC mineral", "SWA armoured"], correct: 2, exp: "MICC cables are SOLAS mandatory for vital circuits that must function during a fire. Their magnesium powder insulation withstands over 1000°C." },
      { q: "For selectivity, what relationship must exist between breaker ratings?", opts: ["In(ACB) < In(MCCB) < In(MCB)", "In(MCB) < In(MCCB) < In(ACB)", "All breakers must have the same rating", "In(MCCB) = In(ACB)"], correct: 1, exp: "Selectivity requires In(MCB) < In(MCCB) < In(ACB). Thus on a fault, the lowest-rated breaker trips first, leaving upstream circuits energised." },
      { q: "What is the ESB (Emergency Switchboard)?", opts: ["The secondary distribution switchboard", "The switchboard fed by the emergency generator for SOLAS vital circuits", "The main engine control panel", "The generator synchronising panel"], correct: 1, exp: "The ESB is fed by the emergency generator and supplies SOLAS vital circuits (navigation, communication, fire pump, emergency lighting) on MSB failure." },
      { q: "For a 440V / 10 kW / cos phi = 0.85 three-phase motor, what is the approximate nominal current?", opts: ["7.7 A", "15.4 A", "30.8 A", "46.2 A"], correct: 1, exp: "I = P / (sqrt(3) x U x cos phi) = 10000 / (1.732 x 440 x 0.85) = 15.4 A. With motor safety factor (x1.25): 19.3 A." },
    ],
  },

  es: {
    moduleLabel: "MAQUINAS — AUXILIARES",
    lessonTitle: "Cuadros electricos y Distribucion",
    lessonSub:   "MSB, ESB, selectividad, cables MICC/XLPE",
    intro: "El cuadro electrico principal (MSB) es el corazon de la red electrica de un buque. Recibe la energia de los grupos electrogenos y la distribuye a todos los consumidores. Comprender su arquitectura y protecciones es esencial para todo maquinista.",
    s1title: "Arquitectura del cuadro principal (MSB)",
    s2title: "Jerarquia de distribucion",
    s3title: "Tipos de cables y seccion",
    s4title: "Selectividad de las protecciones",
    s1hint:  "Toca una seccion para ver su descripcion",
    s2hint:  "Selecciona un nivel de distribucion",
    s3hint:  "Selecciona un tipo de cable",
    s4hint:  "Selecciona un nivel de proteccion",
    exerciseTitle: "Ejercicios Practicos",
    showAnswer: "Ver correccion",
    hideAnswer: "Ocultar",
    accidentTitle: "CASO REAL: Incendio cuadro electrico — MV Atlantic Crown (2016)",
    accidentBody: "En transito por el Atlantico Norte, un arco electrico en el MSB provoco un incendio a las 22:40. Causa: conexion mal apretada en una barra de distribucion sometida a vibraciones repetidas, generando un arco de 4 kA. Los cables XLPE del circuito de alarma de incendio fundieron en los primeros 2 minutos. El fuego se extendio durante 8 minutos sin deteccion. Resultado: 1 herido grave, MSB destruido, 5 dias de detencion. Leccion: los circuitos de alarma de incendio DEBEN cablearse con MICC (resiste 1000°C). Verificacion de pares de apriete cada 6 meses obligatoria.",
    summaryTitle: "Puntos esenciales",
    summary: [
      "El MSB recibe todos los grupos y distribuye hacia los cuadros secundarios",
      "La selectividad garantiza que solo el disyuntor mas cercano al fallo se dispare",
      "Los cables se clasifican por seccion (mm2) segun la intensidad a transportar",
      "El cuadro de emergencia (ESB) alimenta los circuitos vitales SOLAS",
      "Los cables MICC resisten al fuego > 1000°C — obligatorios para circuitos vitales SOLAS",
      "Calculo de corriente del motor: I = P / (raiz(3) x U x cos phi)",
    ],
    quizCTA: "COMENZAR EL QUIZ",
    bankStart: "COMENZAR =>",
    bankNext: "Siguiente pregunta =>",
    bankTrophy: "Enhorabuena! Banco completado",
    bankScore: "Puntuacion banco",
    sections: {
      incoming:  { name: "Entradas de grupos (Incoming)", desc: "Seccion que recibe las entradas de cada grupo electrogeno a traves de su disyuntor ACB. Cada grupo se conecta a las barras mediante su propio ACB con protecciones de sobreintensidad, cortocircuito y potencia inversa." },
      busbar:    { name: "Barras colectoras (Busbars)",   desc: "Conductores de cobre macizo L1/L2/L3 que alimentan todas las salidas. Divididas en secciones aislables mediante acopladores (bus-tie). En grandes buques: dos semijuegos de barras." },
      feeder:    { name: "Salidas (Feeders)",              desc: "Circuitos de distribucion hacia cuadros secundarios y consumidores importantes. Cada salida protegida por un MCCB calibrado segun la carga." },
      metering:  { name: "Instrumentacion y Medidas",     desc: "Voltimetros, amperimetros, vatimetros, frecuencimetros, medidores de cos phi. Permiten vigilar el estado de la red y equilibrar las cargas entre grupos." },
      synchro:   { name: "Panel de sincronizacion",       desc: "Sincronoscopio, lamparas de sincronizacion, selector de grupo. Permite el acoplamiento en paralelo verificando tension, frecuencia y concordancia de fase." },
      emergency: { name: "Cuadro de emergencia (ESB)",    desc: "Alimentado automaticamente por el grupo de emergencia en caso de fallo del MSB. Alimenta los circuitos vitales SOLAS: navegacion, comunicacion, bombas de incendios, alumbrado de emergencia." },
    },
    distribution: {
      msb: { name: "MSB — Cuadro Principal",    desc: "Nivel 1. Recibe los grupos, distribuye hacia cuadros de zona y grandes consumidores. Tension: 440V trifasico.", voltage: "440V 3phase" },
      ssb: { name: "SSB — Cuadro Secundario",   desc: "Nivel 2. Recibe del MSB y distribuye hacia paneles de zona o equipos. Puede reducir la tension (transformador 440V => 220V).", voltage: "440V / 220V" },
      lp:  { name: "Panel de distribucion (LP)", desc: "Nivel 3. Distribucion final hacia consumidores individuales: motores, alumbrado, calefaccion. Protegido por fusibles o pequenos disyuntores MCB.", voltage: "220V / 24V" },
      esb: { name: "ESB — Cuadro de Emergencia", desc: "Red paralela alimentada por el grupo de emergencia. Solo circuitos vitales: navegacion, comunicacion, bomba de incendios.", voltage: "440V 3phase" },
    },
    cables: {
      xlpe:    { name: "XLPE — Polietileno reticulado", desc: "Cable estandar a bordo. Aislamiento resistente a 90°C. Flexible, resistente a la humedad. Usado en la mayoria de los circuitos de potencia y control." },
      micc:    { name: "MICC — Cable mineral",          desc: "Aislamiento en polvo de magnesio. Resistente al fuego (> 1000°C). Obligatorio SOLAS para circuitos vitales: alarmas de incendio, alumbrado de emergencia, bombas de incendios." },
      lsf:     { name: "LSF — Baja emision de humos",  desc: "Vaina sin halogenos. En caso de incendio, produce poco humo y gases toxicos. Recomendado en espacios habitados y vias de evacuacion." },
      armored: { name: "Cable armado (SWA)",            desc: "Proteccion mecanica en alambres de acero. Usado en zonas expuestas a golpes y esfuerzos mecanicos (bodegas, cubiertas exteriores)." },
    },
    selectivity: {
      main:   { name: "Disyuntor principal (ACB)",  desc: "Ultimo recurso — solo se dispara si las protecciones inferiores han fallado. Calibre elevado. Retardo intencional para permitir a los disyuntores aguas abajo disparar primero." },
      feeder: { name: "Disyuntor de salida (MCCB)", desc: "Protege el circuito de distribucion. Se dispara en caso de fallo en el cable o cuadro alimentado. Calibre inferior al disyuntor principal." },
      final:  { name: "Disyuntor final (MCB)",      desc: "Protege el circuito terminal y el aparato. Calibre mas bajo — se dispara primero. Selectividad garantizada si In(MCB) < In(MCCB) < In(ACB)." },
      fuse:   { name: "Fusible de proteccion",      desc: "Proteccion de accion unica (funde y debe reemplazarse). Mas rapido que un disyuntor para fuertes cortocircuitos. Usado en proteccion de transformadores." },
    },
    exercises: [
      { q: "Explique el principio de selectividad de las protecciones electricas y por que es critico a bordo.", a: "La selectividad garantiza que en caso de fallo electrico, solo el disyuntor mas cercano al fallo se dispare, dejando el resto de la red alimentada. A bordo es critico porque una corte total puede poner en peligro la seguridad (perdida de propulsion, navegacion, bombas de incendios). Para asegurar la selectividad: los disyuntores se calibran en cascada (In MCB < In MCCB < In ACB) y los principales tienen retardo intencional." },
      { q: "Por que los cables MICC son obligatorios para ciertos circuitos a bordo? De ejemplos.", a: "Los cables MICC son obligatorios segun SOLAS para circuitos que deben funcionar durante un incendio, ya que su aislamiento en polvo de magnesio resiste temperaturas superiores a 1000°C. Circuitos: alarmas de incendio, alumbrado de emergencia, bombas de incendios, comunicaciones de emergencia, cuadros de emergencia." },
      { q: "Como calcular la seccion de cable necesaria para alimentar un motor de 15 kW / 440V trifasico con cos phi = 0,85?", a: "1. Calcular corriente: I = P / (raiz(3) x U x cos phi) = 15000 / (1,732 x 440 x 0,85) = 23,1 A. 2. Aplicar coeficiente de seguridad (x1,25 para motores): 28,9 A. 3. Elegir seccion en tablas: para 29 A en montaje libre, 6 mm2 XLPE es adecuado (~36A). Verificar la caida de tension (max 3-5%)." },
    ],
    bankQuestions: [
      { q: "Que es el MSB y cuales son sus funciones principales?", a: "El MSB (Main Switchboard) es el centro de distribucion electrica del buque. Funciones: recibir la energia de todos los grupos electrogenos, distribuir hacia cuadros secundarios y grandes consumidores, proteger la red (disyuntores ACB), permitir el acoplamiento de grupos en paralelo (sincronoscopio), medir y supervisar los parametros de la red." },
      { q: "Que son las barras colectoras y por que algunos buques tienen dos?", a: "Conductores de cobre macizo que forman el punto de conexion central del MSB. Dos semijuegos permiten: dividir la red en dos partes independientes, mantener el suministro de una mitad si la otra falla, facilitar el mantenimiento sin corte total." },
      { q: "Cual es la diferencia entre ACB, MCCB y MCB?", a: "ACB: disyuntor de alta potencia para entradas de grupos y salidas principales. Calibres elevados. MCCB: disyuntor en caja moldeada para salidas secundarias. Calibres medios (16A-800A). MCB: pequeno disyuntor para circuitos terminales. Calibres bajos (1A-125A)." },
      { q: "Que es el ESB y que circuitos debe alimentar segun SOLAS?", a: "El ESB (Emergency Switchboard) es un cuadro independiente alimentado por el grupo de emergencia. Circuitos SOLAS obligatorios: luces de navegacion, radio de socorro y GMDSS, alarma de incendios, alumbrado de emergencia, bomba de incendios de emergencia, controles de puertas cortafuegos, ventilacion de emergencia." },
      { q: "Por que se usan transformadores en la distribucion electrica a bordo?", a: "Para adaptar la tension: 440V => 220V para alumbrado, 440V => 24V DC para control y alarmas. Tambien para aislamiento galvanico y estabilizacion de tension en zonas alejadas del MSB." },
      { q: "Como se asegura el equilibrio de cargas entre grupos en paralelo?", a: "Potencia activa (kW): ajuste del governor. Potencia reactiva (kVAR): ajuste del AVR. El objetivo es igual factor de potencia en cada grupo. Un desequilibrio crea corrientes de circulacion entre grupos." },
      { q: "Que es la seccion de un cable y como se elige?", a: "La seccion (mm2) determina la capacidad de transporte de corriente. Eleccion: calcular corriente nominal, aplicar coeficientes de correccion, consultar tablas de capacidad, verificar caida de tension admisible." },
      { q: "Que es la caida de tension y cuales son los limites admisibles a bordo?", a: "delta U = (2 x L x I x rho) / S. Limites: circuitos de potencia max 5%, alumbrado max 3%, control max 2%." },
      { q: "Que es un transformador de aislamiento y por que se usa a bordo?", a: "Aisla galvanicamente el circuito secundario del primario. Usado en circuitos medicos, enchufes en banos y equipos de navegacion sensibles. Evita corrientes de fallo a traves del cuerpo humano." },
      { q: "Como funciona un rele de proteccion diferencial para alternador?", a: "Compara la corriente entrante y saliente del devanado. En condiciones normales son iguales. Un fallo interno crea un desequilibrio — cuando la corriente diferencial supera el umbral, el rele dispara el disyuntor instantaneamente." },
      { q: "Que es la selectividad amperimetrica y la selectividad temporal?", a: "Selectividad amperimetrica: basada en la diferencia de calibre. Selectividad temporal: retardo intencional en disyuntores de nivel superior. La combinacion de ambas logra selectividad total." },
      { q: "Que verificaciones periodicas se realizan en un MSB?", a: "Diarias: parametros, alarmas. Mensuales: disparo de disyuntores, conexiones, limpieza. Anuales: protecciones, aislamiento, calibracion de instrumentos." },
    ],
    quiz: [
      { q: "Cual es la funcion principal del MSB?", opts: ["Controlar la velocidad del motor principal", "Recibir la energia de los grupos y distribuirla a bordo", "Medir las temperaturas de los motores", "Regular la presion del vapor"], correct: 1, exp: "El MSB recibe la energia de todos los grupos electrogenos y la distribuye por todo el buque mediante cuadros secundarios y circuitos de distribucion." },
      { q: "Que tipo de cable es obligatorio segun SOLAS para los circuitos de alarma de incendios?", opts: ["XLPE estandar", "LSF sin halogenos", "MICC mineral", "SWA armado"], correct: 2, exp: "Los cables MICC son obligatorios SOLAS para circuitos vitales que deben funcionar en caso de incendio. Su aislamiento en polvo de magnesio resiste mas de 1000°C." },
      { q: "Para asegurar la selectividad, que relacion debe existir entre los calibres?", opts: ["In(ACB) < In(MCCB) < In(MCB)", "In(MCB) < In(MCCB) < In(ACB)", "Todos iguales", "In(MCCB) = In(ACB)"], correct: 1, exp: "La selectividad exige In(MCB) < In(MCCB) < In(ACB). En caso de fallo, el disyuntor de menor calibre (mas cercano al fallo) dispara primero." },
      { q: "Que es el ESB?", opts: ["El cuadro de distribucion secundario", "El cuadro alimentado por el grupo de emergencia para circuitos vitales SOLAS", "El panel de control del motor principal", "El panel de sincronizacion"], correct: 1, exp: "El ESB es alimentado por el generador de emergencia y suministra los circuitos vitales SOLAS en caso de fallo del MSB." },
      { q: "Para un motor trifasico 440V / 10 kW / cos phi = 0,85, cual es aproximadamente la corriente nominal?", opts: ["7,7 A", "15,4 A", "30,8 A", "46,2 A"], correct: 1, exp: "I = P / (raiz(3) x U x cos phi) = 10000 / (1,732 x 440 x 0,85) = 15,4 A. Con coeficiente de seguridad (x1,25): 19,3 A." },
    ],
  },

  pt: {
    moduleLabel: "MAQUINAS — AUXILIARES",
    lessonTitle: "Quadros eletricos e Distribuicao",
    lessonSub:   "MSB, ESB, seletividade, cabos MICC/XLPE",
    intro: "O quadro eletrico principal (MSB) e o coracao da rede eletrica de um navio. Recebe a energia dos grupos geradores e distribui-a a todos os consumidores. Compreender a sua arquitetura e protecoes e essencial para qualquer maquinista.",
    s1title: "Arquitetura do quadro principal (MSB)",
    s2title: "Hierarquia de distribuicao",
    s3title: "Tipos de cabos e seccao",
    s4title: "Seletividade das protecoes",
    s1hint:  "Toque numa seccao para ver a descricao",
    s2hint:  "Selecione um nivel de distribuicao",
    s3hint:  "Selecione um tipo de cabo",
    s4hint:  "Selecione um nivel de protecao",
    exerciseTitle: "Exercicios Praticos",
    showAnswer: "Ver correcao",
    hideAnswer: "Ocultar",
    accidentTitle: "CASO REAL: Incendio quadro eletrico — MV Atlantic Crown (2016)",
    accidentBody: "Em transito no Atlantico Norte, um arco eletrico no MSB provocou um incendio as 22h40. Causa: ligacao mal apertada numa barra de distribuicao sujeita a vibracoes repetidas, gerando um arco de 4 kA. Os cabos XLPE do circuito de alarme de incendio fundiram nos primeiros 2 minutos. O fogo espalhou-se durante 8 minutos sem detecao. Resultado: 1 ferido grave, MSB destruido, 5 dias de detencao. Licao: os circuitos de alarme de incendio DEVEM ser cableados em MICC (resiste a 1000°C). Verificacao dos binarios de aperto obrigatoria de 6 em 6 meses.",
    summaryTitle: "Pontos essenciais",
    summary: [
      "O MSB recebe todos os grupos e distribui para os quadros secundarios",
      "A seletividade garante que apenas o disjuntor mais proximo do defeito dispara",
      "Os cabos sao classificados por seccao (mm2) segundo a corrente a transportar",
      "O quadro de emergencia (ESB) alimenta os circuitos vitais SOLAS",
      "Os cabos MICC resistem ao fogo > 1000°C — obrigatorios para circuitos vitais SOLAS",
      "Formula corrente do motor: I = P / (raiz(3) x U x cos phi)",
    ],
    quizCTA: "COMECAR O QUIZ",
    bankStart: "COMECAR =>",
    bankNext: "Proxima pergunta =>",
    bankTrophy: "Parabens! Banco concluido",
    bankScore: "Pontuacao banco",
    sections: {
      incoming:  { name: "Entradas de grupos (Incoming)", desc: "Seccao que recebe as entradas de cada grupo gerador atraves do seu disjuntor ACB. Cada grupo liga-se as barras pelo seu proprio ACB com protecoes de sobrecorrente, curto-circuito e potencia inversa." },
      busbar:    { name: "Barras coletoras (Busbars)",    desc: "Condutores de cobre macico L1/L2/L3 que alimentam todas as saidas. Divididas em seccoes isolaveis por acopladores (bus-tie). Em grandes navios: duas meias-barras." },
      feeder:    { name: "Saidas (Feeders)",               desc: "Circuitos de distribuicao para quadros secundarios e consumidores importantes. Cada saida protegida por um MCCB calibrado segundo a carga." },
      metering:  { name: "Instrumentacao e Medicao",       desc: "Voltimetros, amperimetros, wattimetros, frequencimetros, medidores de cos phi. Permitem vigiar o estado da rede e equilibrar as cargas entre grupos." },
      synchro:   { name: "Painel de sincronizacao",        desc: "Sincronoscópio, lampadas de sincronizacao, seletor de grupo. Permite o acoplamento em paralelo verificando tensao, frequencia e concordancia de fase." },
      emergency: { name: "Quadro de emergencia (ESB)",     desc: "Alimentado automaticamente pelo gerador de emergencia em caso de falha do MSB. Alimenta circuitos vitais SOLAS: navegacao, comunicacao, bombas de incendio, iluminacao de emergencia." },
    },
    distribution: {
      msb: { name: "MSB — Quadro Principal",    desc: "Nivel 1. Recebe os grupos, distribui para quadros de zona e grandes consumidores. Tensao: 440V trifasico.", voltage: "440V 3phase" },
      ssb: { name: "SSB — Quadro Secundario",   desc: "Nivel 2. Recebe do MSB e distribui para paineis de zona ou equipamentos. Pode reduzir a tensao (transformador 440V => 220V).", voltage: "440V / 220V" },
      lp:  { name: "Painel de distribuicao (LP)", desc: "Nivel 3. Distribuicao final para consumidores individuais: motores, iluminacao, aquecimento. Protegido por fusiveis ou pequenos disjuntores MCB.", voltage: "220V / 24V" },
      esb: { name: "ESB — Quadro de Emergencia", desc: "Rede paralela alimentada pelo gerador de emergencia. Apenas circuitos vitais: navegacao, comunicacao, bomba de incendio.", voltage: "440V 3phase" },
    },
    cables: {
      xlpe:    { name: "XLPE — Polietileno reticulado", desc: "Cabo padrao a bordo. Isolamento resistente a 90°C. Flexivel, resistente a humidade. Usado na maioria dos circuitos de potencia e controlo." },
      micc:    { name: "MICC — Cabo mineral",           desc: "Isolamento em po de magnesio. Resistente ao fogo (> 1000°C). Obrigatorio SOLAS para circuitos vitais: alarmes de incendio, iluminacao de emergencia, bombas de incendio." },
      lsf:     { name: "LSF — Baixa emissao de fumos",  desc: "Bainha sem halogenos. Em caso de incendio, produz pouco fumo e gases toxicos. Recomendado em espacos habitados e vias de evacuacao." },
      armored: { name: "Cabo armado (SWA)",              desc: "Protecao mecanica em arames de aco. Usado em zonas expostas a choques e esforcos mecanicos (porous, conveses exteriores)." },
    },
    selectivity: {
      main:   { name: "Disjuntor principal (ACB)",  desc: "Ultimo recurso — so dispara se as protecoes inferiores falharam. Calibre elevado. Retardo intencional para permitir aos disjuntores a jusante disparar primeiro." },
      feeder: { name: "Disjuntor de saida (MCCB)",  desc: "Protege o circuito de distribuicao. Dispara em caso de defeito no cabo ou quadro alimentado. Calibre inferior ao disjuntor principal." },
      final:  { name: "Disjuntor final (MCB)",      desc: "Protege o circuito terminal e o equipamento. Calibre mais baixo — dispara primeiro. Seletividade garantida se In(MCB) < In(MCCB) < In(ACB)." },
      fuse:   { name: "Fusivel de protecao",        desc: "Protecao de acao unica (funde e deve ser substituido). Mais rapido que um disjuntor para fortes curto-circuitos. Usado em protecao de transformadores." },
    },
    exercises: [
      { q: "Explique o principio de seletividade das protecoes eletricas e por que e critico a bordo.", a: "A seletividade garante que em caso de defeito eletrico, apenas o disjuntor mais proximo do defeito dispara, deixando o resto da rede alimentado. A bordo e critico porque uma corte total pode por em perigo a seguranca (perda de propulsao, navegacao, bombas de incendio). Para garantir a seletividade: disjuntores calibrados em cascata (In MCB < In MCCB < In ACB) e os principais tem retardo intencional." },
      { q: "Por que os cabos MICC sao obrigatorios para certos circuitos a bordo? De exemplos.", a: "Os cabos MICC sao obrigatorios segundo o SOLAS para circuitos que devem funcionar durante um incendio, pois o isolamento em po de magnesio resiste a temperaturas superiores a 1000°C. Circuitos: alarmes de incendio, iluminacao de emergencia, bombas de incendio, comunicacoes de emergencia, quadros de emergencia." },
      { q: "Como calcular a seccao de cabo necessaria para alimentar um motor de 15 kW / 440V trifasico com cos phi = 0,85?", a: "1. Calcular corrente: I = P / (raiz(3) x U x cos phi) = 15000 / (1,732 x 440 x 0,85) = 23,1 A. 2. Aplicar fator de seguranca (x1,25 para motores): 28,9 A. 3. Escolher seccao em tabelas: para 29 A em montagem livre, 6 mm2 XLPE e adequado (~36A). Verificar queda de tensao (max 3-5%)." },
    ],
    bankQuestions: [
      { q: "O que e o MSB e quais sao as suas funcoes principais?", a: "O MSB (Main Switchboard) e o centro de distribuicao eletrica do navio. Funcoes: receber energia de todos os grupos, distribuir para quadros secundarios e grandes consumidores, proteger a rede (disjuntores ACB), permitir o acoplamento em paralelo (sincronoscópio), medir e monitorizar os parametros da rede." },
      { q: "O que sao as barras coletoras e por que alguns navios tem duas?", a: "Condutores de cobre macico formando o ponto central de ligacao do MSB. Dois meios-jogos de barras permitem: dividir a rede em duas partes independentes, manter o fornecimento a uma metade se a outra falhar, facilitar a manutencao sem corte total." },
      { q: "Qual e a diferenca entre ACB, MCCB e MCB?", a: "ACB: disjuntor de alta potencia para entradas de grupos e saidas principais. Calibres elevados. MCCB: disjuntor em caixa moldada para saidas secundarias. Calibres medios. MCB: pequeno disjuntor para circuitos terminais. Calibres baixos." },
      { q: "O que e o ESB e que circuitos deve alimentar segundo o SOLAS?", a: "O ESB e um quadro independente alimentado pelo gerador de emergencia. Circuitos obrigatorios: luzes de navegacao, radio de socorro e GMDSS, alarme de incendio, iluminacao de emergencia, bomba de incendio de emergencia, controlos de portas corta-fogo." },
      { q: "Por que se usam transformadores na distribuicao eletrica a bordo?", a: "Para adaptar a tensao: 440V => 220V para iluminacao, 440V => 24V DC para controlo e alarmes. Tambem para isolamento galvanico e estabilizacao de tensao em zonas afastadas do MSB." },
      { q: "Como se garante o equilibrio de cargas entre grupos em paralelo?", a: "Potencia ativa (kW): ajuste do governor. Potencia reativa (kVAR): ajuste do AVR. Objetivo: igual fator de potencia em cada grupo. Desequilibrio cria correntes de circulacao entre grupos." },
      { q: "O que e a seccao de um cabo e como se escolhe?", a: "A seccao (mm2) determina a capacidade de transporte de corrente. Escolha: calcular corrente nominal, aplicar fatores de correcao, consultar tabelas, verificar queda de tensao admissivel." },
      { q: "O que e a queda de tensao e quais sao os limites admissiveis a bordo?", a: "delta V = (2 x L x I x rho) / S. Limites: circuitos de potencia max 5%, iluminacao max 3%, controlo max 2%." },
      { q: "O que e um transformador de isolamento e por que se usa a bordo?", a: "Isola galvanicamente o circuito secundario do primario. Usado em circuitos medicos, tomadas em casas de banho e equipamentos de navegacao sensíveis." },
      { q: "Como funciona um rele de protecao diferencial para alternador?", a: "Compara corrente entrante e sainte do enrolamento. Defeito interno cria desequilibrio — quando corrente diferencial excede limiar, rele dispara disjuntor instantaneamente." },
      { q: "O que e seletividade corrente e seletividade temporal?", a: "Seletividade corrente: baseada na diferenca de calibre. Seletividade temporal: retardo intencional nos disjuntores de nivel superior. Combinacao de ambas garante seletividade total." },
      { q: "Que verificacoes periodicas se devem realizar no MSB?", a: "Diarias: parametros, alarmes. Mensais: disparo de disjuntores, ligacoes, limpeza. Anuais: protecoes, isolamento, calibracao de instrumentos. Tudo documentado no Sistema de Manutencao Planeada." },
    ],
    quiz: [
      { q: "Qual e o papel principal do MSB?", opts: ["Controlar a velocidade do motor principal", "Receber energia dos grupos e distribui-la a bordo", "Medir temperaturas dos motores", "Regular a pressao do vapor"], correct: 1, exp: "O MSB recebe energia de todos os grupos geradores e distribui-a pelo navio atraves de quadros secundarios e circuitos de distribuicao." },
      { q: "Que tipo de cabo e obrigatorio segundo o SOLAS para circuitos de alarme de incendio?", opts: ["XLPE padrao", "LSF sem halogenos", "MICC mineral", "SWA armado"], correct: 2, exp: "Os cabos MICC sao obrigatorios SOLAS para circuitos vitais que devem funcionar durante um incendio. O isolamento em po de magnesio resiste a mais de 1000°C." },
      { q: "Para garantir a seletividade, que relacao deve existir entre os calibres?", opts: ["In(ACB) < In(MCCB) < In(MCB)", "In(MCB) < In(MCCB) < In(ACB)", "Todos iguais", "In(MCCB) = In(ACB)"], correct: 1, exp: "A seletividade exige In(MCB) < In(MCCB) < In(ACB). Em caso de defeito, o disjuntor de menor calibre (mais proximo do defeito) dispara primeiro." },
      { q: "O que e o ESB?", opts: ["O quadro de distribuicao secundario", "O quadro alimentado pelo gerador de emergencia para circuitos vitais SOLAS", "O painel de controlo do motor principal", "O painel de sincronizacao"], correct: 1, exp: "O ESB e alimentado pelo gerador de emergencia e fornece os circuitos vitais SOLAS em caso de falha do MSB." },
      { q: "Para um motor trifasico 440V / 10 kW / cos phi = 0,85, qual e aproximadamente a corrente nominal?", opts: ["7,7 A", "15,4 A", "30,8 A", "46,2 A"], correct: 1, exp: "I = P / (raiz(3) x U x cos phi) = 10000 / (1,732 x 440 x 0,85) = 15,4 A. Com fator de seguranca (x1,25): 19,3 A." },
    ],
  },
};

// ── SVG 1 — MSB ARCHITECTURE ────────────────────────────────
function MSBArchitectureSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const sects = t.sections;
  const sectColors: Record<string,string> = {
    incoming:C.warn, busbar:C.amber, feeder:C.cyan,
    metering:C.green, synchro:C.purple, emergency:C.red,
  };
  const sectLabels: Record<string,string> = {
    incoming:"GEN IN", busbar:"BUSBAR", feeder:"FEEDERS",
    metering:"METERS", synchro:"SYNCHRO", emergency:"ESB",
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.amber}33`}}>
      <svg viewBox="0 0 280 180" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        {/* MSB border */}
        <rect x="10" y="10" width="260" height="160" rx="6" fill="none" stroke={C.amber} strokeWidth="1.5" strokeDasharray="4,3"/>
        <text x="140" y="24" fontSize="9" fill={C.amber} fontFamily="'Cinzel',serif" textAnchor="middle">MSB — MAIN SWITCHBOARD</text>
        {/* Incoming */}
        <rect x="20" y="30" width="55" height="50" rx="4" fill={C.warn} opacity={0.14} stroke={C.warn} strokeWidth="1" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="incoming"?null:"incoming")}/>
        <text x="47" y="52" fontSize="7" fill={C.warn} fontFamily="Courier New" textAnchor="middle">GEN 1</text>
        <text x="47" y="63" fontSize="7" fill={C.warn} fontFamily="Courier New" textAnchor="middle">GEN 2</text>
        <text x="47" y="74" fontSize="6" fill={C.warn} fontFamily="Courier New" textAnchor="middle">INCOMING</text>
        {/* Busbar */}
        <rect x="20" y="90" width="240" height="12" rx="3" fill={C.amber} opacity={0.28} stroke={C.amber} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="busbar"?null:"busbar")}/>
        <text x="140" y="100" fontSize="7" fill={C.amber} fontFamily="Courier New" textAnchor="middle">L1 — L2 — L3 BUSBARS</text>
        {/* Feeders */}
        <rect x="20" y="112" width="118" height="45" rx="4" fill={C.cyan} opacity={0.1} stroke={C.cyan} strokeWidth="1" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="feeder"?null:"feeder")}/>
        <text x="79" y="130" fontSize="7" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">MCCB MCCB MCCB</text>
        <text x="79" y="142" fontSize="7" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">FEEDERS</text>
        <text x="79" y="152" fontSize="6" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">SSB1 SSB2 SSB3</text>
        {/* Metering */}
        <rect x="85" y="30" width="55" height="50" rx="4" fill={C.green} opacity={0.1} stroke={C.green} strokeWidth="1" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="metering"?null:"metering")}/>
        <text x="112" y="50" fontSize="7" fill={C.green} fontFamily="Courier New" textAnchor="middle">V A W Hz</text>
        <text x="112" y="62" fontSize="6" fill={C.green} fontFamily="Courier New" textAnchor="middle">METERS</text>
        <text x="112" y="74" fontSize="6" fill={C.green} fontFamily="Courier New" textAnchor="middle">cosφ kWh</text>
        {/* Synchro */}
        <rect x="150" y="30" width="55" height="50" rx="4" fill={C.purple} opacity={0.1} stroke={C.purple} strokeWidth="1" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="synchro"?null:"synchro")}/>
        <circle cx="177" cy="52" r="14" fill="none" stroke={C.purple} strokeWidth="1"/>
        <line x1="177" y1="38" x2="177" y2="44" stroke={C.green} strokeWidth="1.5"/>
        <line x1="177" y1="52" x2="184" y2="46" stroke={C.purple} strokeWidth="1.5"/>
        <text x="177" y="72" fontSize="6" fill={C.purple} fontFamily="Courier New" textAnchor="middle">SYNCHRO</text>
        {/* ESB */}
        <rect x="148" y="112" width="112" height="45" rx="4" fill={C.red} opacity={0.1} stroke={C.red} strokeWidth="1" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="emergency"?null:"emergency")}/>
        <text x="204" y="130" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">EMERGENCY</text>
        <text x="204" y="142" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">SWITCHBOARD</text>
        <text x="204" y="152" fontSize="6" fill={C.red} fontFamily="Courier New" textAnchor="middle">ESB — SOLAS</text>
        {/* Connections from busbars */}
        {[35,79,140,193].map((x,i)=>(
          <line key={i} x1={x} y1="102" x2={x} y2="112" stroke={C.cyan} strokeWidth="1.5"/>
        ))}
      </svg>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10,marginTop:4}}>
        {Object.entries(sects).map(([key]:any)=>{const col=sectColors[key]||C.amber;return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{sectLabels[key]||key}</button>);}) }
      </div>
      {sel&&(<div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${sectColors[sel]||C.amber}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}><div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{sects[sel]?.name}</div>{sects[sel]?.desc}</div>)}
    </div>
  );
}

// ── SVG 2 — DISTRIBUTION HIERARCHY ──────────────────────────
function DistributionHierarchySVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string>("msb");
  const dist = t.distribution;
  const distColors: Record<string,string> = { msb:C.warn, ssb:C.amber, lp:C.green, esb:C.red };

  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.cyan}33`}}>
      <svg viewBox="0 0 280 160" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        {/* MSB */}
        <rect x="100" y="10" width="80" height="28" rx="5" fill={C.warn} opacity={0.18} stroke={C.warn} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel("msb")}/>
        <text x="140" y="28" fontSize="8" fill={C.warn} fontFamily="Courier New" textAnchor="middle">MSB 440V 3ph</text>
        {/* Lines */}
        <line x1="112" y1="38" x2="72" y2="65" stroke={C.amber} strokeWidth="1.5"/>
        <line x1="140" y1="38" x2="140" y2="65" stroke={C.amber} strokeWidth="1.5"/>
        <line x1="168" y1="38" x2="210" y2="65" stroke={C.red} strokeWidth="1.5" strokeDasharray="4,2"/>
        {/* SSBs */}
        <rect x="30" y="65" width="80" height="25" rx="4" fill={C.amber} opacity={0.18} stroke={C.amber} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel("ssb")}/>
        <text x="70" y="81" fontSize="7" fill={C.amber} fontFamily="Courier New" textAnchor="middle">SSB 440/220V</text>
        <rect x="100" y="65" width="80" height="25" rx="4" fill={C.amber} opacity={0.18} stroke={C.amber} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel("ssb")}/>
        <text x="140" y="81" fontSize="7" fill={C.amber} fontFamily="Courier New" textAnchor="middle">SSB 440/220V</text>
        {/* ESB */}
        <rect x="180" y="65" width="80" height="25" rx="4" fill={C.red} opacity={0.14} stroke={C.red} strokeWidth="1.5" strokeDasharray="4,2" style={{cursor:"pointer"}} onClick={()=>setSel("esb")}/>
        <text x="220" y="78" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">ESB EMERG.</text>
        {/* LP */}
        <line x1="58" y1="90" x2="50" y2="115" stroke={C.green} strokeWidth="1"/>
        <line x1="82" y1="90" x2="90" y2="115" stroke={C.green} strokeWidth="1"/>
        <line x1="122" y1="90" x2="130" y2="115" stroke={C.green} strokeWidth="1"/>
        <line x1="158" y1="90" x2="158" y2="115" stroke={C.green} strokeWidth="1"/>
        {[28,70,110,140].map((x,i)=>(<g key={i}><rect x={x} y="115" width="40" height="20" rx="3" fill={C.green} opacity={0.14} stroke={C.green} strokeWidth="1" style={{cursor:"pointer"}} onClick={()=>setSel("lp")}/><text x={x+20} y="128" fontSize="6" fill={C.green} fontFamily="Courier New" textAnchor="middle">LP 220V</text></g>))}
        {/* Generator */}
        <circle cx="140" cy="150" r="7" fill="none" stroke={C.warn} strokeWidth="1.5"/>
        <text x="140" y="154" fontSize="7" fill={C.warn} fontFamily="Courier New" textAnchor="middle">G</text>
        <line x1="140" y1="143" x2="140" y2="138" stroke={C.warn} strokeWidth="1.5"/>
      </svg>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(dist).map(([key,val]:any)=>{const col=distColors[key]||C.amber;return(<button key={key} onClick={()=>setSel(key)} style={{padding:"5px 10px",borderRadius:8,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{key.toUpperCase()} <span style={{fontSize:8,opacity:0.7}}>{val.voltage}</span></button>);}) }
      </div>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${distColors[sel]||C.cyan}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{dist[sel]?.name} — {dist[sel]?.voltage}</div>
        {dist[sel]?.desc}
      </div>
    </div>
  );
}

// ── SVG 3 — CABLES ───────────────────────────────────────────
function CablesSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string>("xlpe");
  const cables = t.cables;
  const cableColors: Record<string,string> = { xlpe:C.cyan, micc:C.red, lsf:C.green, armored:C.dim };

  const cableVisuals: Record<string, React.ReactNode> = {
    xlpe: (
      <g>
        <circle cx="80" cy="80" r="46" fill={C.cyan} opacity={0.12} stroke={C.cyan} strokeWidth="2"/>
        <circle cx="80" cy="80" r="32" fill={C.navy3} stroke={C.cyan} strokeWidth="1.5"/>
        <circle cx="80" cy="80" r="20" fill={C.amber} opacity={0.28} stroke={C.amber} strokeWidth="1"/>
        <circle cx="80" cy="80" r="10" fill={C.warn} opacity={0.6}/>
        <text x="80" y="142" fontSize="8" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">XLPE Standard</text>
        <text x="80" y="152" fontSize="7" fill={C.dim} fontFamily="Courier New" textAnchor="middle">90°C — Flexible</text>
      </g>
    ),
    micc: (
      <g>
        <circle cx="80" cy="80" r="46" fill={C.red} opacity={0.12} stroke={C.red} strokeWidth="2.5"/>
        <circle cx="80" cy="80" r="30" fill="rgba(255,255,255,0.06)" stroke={C.dim} strokeWidth="1"/>
        <text x="80" y="77" fontSize="7" fill={C.dim} fontFamily="Courier New" textAnchor="middle">MgO</text>
        <text x="80" y="88" fontSize="6" fill={C.dim} fontFamily="Courier New" textAnchor="middle">POWDER</text>
        <circle cx="80" cy="80" r="12" fill={C.warn} opacity={0.7}/>
        <text x="80" y="142" fontSize="8" fill={C.red} fontFamily="Courier New" textAnchor="middle">MICC — Fire resistant</text>
        <text x="80" y="152" fontSize="7" fill={C.dim} fontFamily="Courier New" textAnchor="middle">&gt;1000°C — SOLAS</text>
      </g>
    ),
    lsf: (
      <g>
        <circle cx="80" cy="80" r="46" fill={C.green} opacity={0.1} stroke={C.green} strokeWidth="2"/>
        <circle cx="80" cy="80" r="32" fill={C.navy3} stroke={C.green} strokeWidth="1.5"/>
        <circle cx="80" cy="80" r="20" fill={C.amber} opacity={0.22} stroke={C.amber} strokeWidth="1"/>
        <circle cx="80" cy="80" r="10" fill={C.warn} opacity={0.5}/>
        <text x="80" y="142" fontSize="7" fill={C.green} fontFamily="Courier New" textAnchor="middle">LSF — Low Smoke</text>
        <text x="80" y="152" fontSize="6" fill={C.dim} fontFamily="Courier New" textAnchor="middle">Halogen-free sheath</text>
      </g>
    ),
    armored: (
      <g>
        <circle cx="80" cy="80" r="46" fill={C.dim} opacity={0.1} stroke={C.dim} strokeWidth="3"/>
        {Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return <line key={i} x1={80+38*Math.cos(a)} y1={80+38*Math.sin(a)} x2={80+44*Math.cos(a)} y2={80+44*Math.sin(a)} stroke={C.dim} strokeWidth="2" opacity={0.6}/>;}) }
        <circle cx="80" cy="80" r="30" fill={C.navy3} stroke={C.dim} strokeWidth="1"/>
        <circle cx="80" cy="80" r="12" fill={C.warn} opacity={0.5}/>
        <text x="80" y="142" fontSize="7" fill={C.dim} fontFamily="Courier New" textAnchor="middle">SWA — Steel Wire Armoured</text>
        <text x="80" y="152" fontSize="6" fill={C.dim} fontFamily="Courier New" textAnchor="middle">Mechanical protection</text>
      </g>
    ),
  };

  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.green}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(cables).map(([key]:any)=>{const col=cableColors[key]||C.green;return(<button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"5px 4px",borderRadius:8,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New",textAlign:"center"}}>{key.toUpperCase()}</button>);}) }
      </div>
      <svg viewBox="0 0 160 160" style={{width:"100%",maxWidth:200,display:"block",margin:"0 auto",background:`${C.navy3}55`,borderRadius:8}}>
        {cableVisuals[sel]}
      </svg>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cableColors[sel]||C.green}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{cables[sel]?.name}</div>
        {cables[sel]?.desc}
      </div>
    </div>
  );
}

// ── SVG 4 — SELECTIVITY ──────────────────────────────────────
function SelectivitySVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const prots = t.selectivity;
  const protColors: Record<string,string> = { main:C.warn, feeder:C.amber, final:C.green, fuse:C.purple };
  const protLabels: Record<string,string> = { main:"ACB", feeder:"MCCB", final:"MCB", fuse:"FUSE" };

  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.warn}33`}}>
      <svg viewBox="0 0 200 160" style={{width:"100%",maxWidth:260,display:"block",margin:"0 auto"}}>
        <circle cx="100" cy="14" r="10" fill="none" stroke={C.warn} strokeWidth="1.5"/>
        <text x="100" y="18" fontSize="7" fill={C.warn} fontFamily="Courier New" textAnchor="middle">G</text>
        <line x1="100" y1="24" x2="100" y2="40" stroke={C.warn} strokeWidth="1.5"/>
        <rect x="78" y="40" width="44" height="20" rx="4" fill={C.warn} opacity={0.18} stroke={C.warn} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="main"?null:"main")}/>
        <text x="100" y="54" fontSize="7" fill={C.warn} fontFamily="Courier New" textAnchor="middle">ACB In=800A</text>
        <line x1="100" y1="60" x2="100" y2="72" stroke={C.amber} strokeWidth="1.5"/>
        <line x1="100" y1="72" x2="58" y2="72" stroke={C.amber} strokeWidth="1"/>
        <line x1="100" y1="72" x2="142" y2="72" stroke={C.amber} strokeWidth="1"/>
        {[38,120].map((x,i)=>(<g key={i}><line x1={x+20} y1="72" x2={x+20} y2="82" stroke={C.amber} strokeWidth="1.5"/><rect x={x} y="82" width="40" height="18" rx="3" fill={C.amber} opacity={0.18} stroke={C.amber} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="feeder"?null:"feeder")}/><text x={x+20} y="95" fontSize="6" fill={C.amber} fontFamily="Courier New" textAnchor="middle">MCCB 100A</text></g>))}
        {[24,54,104,134].map((x,i)=>(<g key={i}><line x1={x+10} y1="100" x2={x+10} y2="112" stroke={C.green} strokeWidth="1"/><rect x={x} y="112" width="20" height="14" rx="2" fill={C.green} opacity={0.18} stroke={C.green} strokeWidth="1" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="final"?null:"final")}/><text x={x+10} y="121" fontSize="5" fill={C.green} fontFamily="Courier New" textAnchor="middle">MCB</text><text x={x+10} y="129" fontSize="5" fill={C.green} fontFamily="Courier New" textAnchor="middle">16A</text></g>))}
        <text x="188" y="52" fontSize="7" fill={C.warn} fontFamily="Courier New">L1</text>
        <text x="188" y="93" fontSize="7" fill={C.amber} fontFamily="Courier New">L2</text>
        <text x="188" y="124" fontSize="7" fill={C.green} fontFamily="Courier New">L3</text>
        <text x="5" y="52" fontSize="6" fill={C.warn} fontFamily="Courier New">800A</text>
        <text x="5" y="93" fontSize="6" fill={C.amber} fontFamily="Courier New">100A</text>
        <text x="5" y="124" fontSize="6" fill={C.green} fontFamily="Courier New">16A</text>
      </svg>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(prots).map(([key]:any)=>{const col=protColors[key]||C.warn;return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{flex:1,padding:"5px 4px",borderRadius:8,fontSize:11,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New",textAlign:"center",fontWeight:700}}>{protLabels[key]||key}</button>);}) }
      </div>
      {sel&&(<div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${protColors[sel]||C.warn}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}><div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{prots[sel]?.name}</div>{prots[sel]?.desc}</div>)}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}
// LessonE2_L5 — Tableaux electriques & Distribution | PART 2

export default function LessonE2_L5({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t = T[lang] || T.fr;
  const [phase, setPhase] = useState<"content"|"quiz"|"done">("content");
  const [exShown, setExShown] = useState<boolean[]>([false,false,false]);
  const [accOpen, setAccOpen] = useState(false);
  const [bankIdx, setBankIdx] = useState<number|null>(null);
  const [bankCur, setBankCur] = useState(0);
  const [bankAns, setBankAns] = useState(false);
  const [bankScore, setBankScore] = useState(0);
  const [bankDone, setBankDone] = useState(false);
  const [qCur, setQCur] = useState(0);
  const [qSel, setQSel] = useState<number|null>(null);
  const [qConf, setQConf] = useState(false);
  const [qScore, setQScore] = useState(0);

  const quiz = t.quiz;
  const bank = t.bankQuestions;
  const xpFinal = qScore>=5?250:qScore>=4?200:qScore>=3?150:100;
  const optColors = [C.cyan, C.amber, C.green, C.purple];
  const progress = phase==="content"?60:phase==="quiz"?85:100;

  const section=(icon:string,title:string,children:React.ReactNode,col=C.amber)=>(
    <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${col}2a`}}>
      <div style={{background:`${col}14`,padding:"10px 14px",borderBottom:`1px solid ${col}1a`}}>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:col}}>{icon} {title}</span>
      </div>
      <div style={{padding:12}}>{children}</div>
    </div>
  );

  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankAns(false);setBankScore(0);setBankDone(false);};
  const bankNext=()=>{if(bankCur+1>=bank.length){setBankDone(true);return;}setBankCur(c=>c+1);setBankAns(false);};
  const handleQConf=()=>{if(qSel===null)return;setQConf(true);if(qSel===quiz[qCur].correct)setQScore(s=>s+1);};
  const handleQNext=()=>{if(qCur+1>=quiz.length){setPhase("done");if(onComplete)onComplete(xpFinal);return;}setQCur(c=>c+1);setQSel(null);setQConf(false);};

  const header=(sub:string)=>(
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.amber}33`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
        <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>&#9664;</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.amber,marginBottom:2}}>{t.moduleLabel} · L5{sub?" · "+sub:""}</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.white,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
          <span style={{padding:"2px 8px",borderRadius:6,background:"rgba(255,171,0,0.12)",border:"1px solid rgba(255,171,0,0.4)",fontSize:9,color:C.amber,fontFamily:"'Cinzel',serif",letterSpacing:1}}>PREMIUM</span>
          <span style={{fontSize:11,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New"}}>{progress}%</span>
        </div>
      </div>
      <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
        <div style={{height:"100%",background:`linear-gradient(90deg,${C.amber},${C.cyan})`,width:`${progress}%`,transition:"width 0.4s"}}/>
      </div>
    </div>
  );

  // ══ CONTENT ══════════════════════════════════════════════════
  if(phase==="content") return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif"}}>
      {header("")}
      <div style={{padding:"14px 14px 80px"}}>
        <div style={{fontSize:13,color:C.dim,lineHeight:1.7,marginBottom:18,fontFamily:"Courier New",padding:"12px 14px",borderRadius:12,background:`${C.navy2}88`,border:`1px solid ${C.amber}18`}}>{t.intro}</div>

        {section("🔌",t.s1title,<MSBArchitectureSVG lang={lang}/>,C.amber)}
        {section("📐",t.s2title,<DistributionHierarchySVG lang={lang}/>,C.cyan)}
        {section("🔋",t.s3title,<CablesSVG lang={lang}/>,C.green)}
        {section("⚡",t.s4title,<SelectivitySVG lang={lang}/>,C.warn)}

        {/* EXERCISES */}
        <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${C.amber}2a`}}>
          <div style={{background:`${C.amber}14`,padding:"10px 14px",borderBottom:`1px solid ${C.amber}1a`}}>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.amber}}>✏️ {t.exerciseTitle}</span>
          </div>
          <div style={{padding:12}}>
            {t.exercises.map((ex:any,i:number)=>(
              <div key={i} style={{marginBottom:12,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${C.amber}22`,overflow:"hidden"}}>
                <div style={{padding:"12px 14px"}}>
                  <div style={{fontSize:10,color:C.amber,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
                  <div style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>{ex.q}</div>
                </div>
                <div style={{padding:"0 14px 12px"}}>
                  <button onClick={()=>setExShown(p=>p.map((v,j)=>j===i?!v:v))} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:exShown[i]?`${C.amber}22`:"rgba(255,255,255,0.06)",border:`1px solid ${exShown[i]?C.amber:"rgba(255,255,255,0.15)"}`,color:exShown[i]?C.amber:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{exShown[i]?t.hideAnswer:t.showAnswer}</button>
                  {exShown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.amber}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New"}}>{ex.a}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACCIDENT CASE */}
        <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${C.red}44`}}>
          <button onClick={()=>setAccOpen(o=>!o)} style={{width:"100%",padding:"12px 14px",background:`${C.red}14`,border:"none",borderBottom:accOpen?`1px solid ${C.red}22`:"none",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.red}}>⚓ {t.accidentTitle}</span>
            <span style={{color:C.red,fontSize:14}}>{accOpen?"▲":"▼"}</span>
          </button>
          {accOpen&&<div style={{padding:"12px 14px",fontSize:12,color:C.text,lineHeight:1.7,fontFamily:"Courier New"}}>{t.accidentBody}</div>}
        </div>

        {/* QUESTION BANK */}
        <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${C.blue}33`}}>
          <div style={{background:`${C.blue}14`,padding:"10px 14px",borderBottom:`1px solid ${C.blue}1a`}}>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.blue}}>📚 {lang==="fr"?"Banque de questions":lang==="en"?"Question Bank":lang==="es"?"Banco de preguntas":"Banco de questoes"} (12)</span>
          </div>
          <div style={{padding:12}}>
            {bankIdx===null&&(<button onClick={startBank} style={{width:"100%",padding:"14px 0",borderRadius:12,background:`linear-gradient(135deg,${C.amber},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{t.bankStart}</button>)}
            {bankIdx!==null&&!bankDone&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:11,color:C.dim,fontFamily:"Courier New"}}><span>Q{bankCur+1}/{bank.length}</span><span style={{color:C.amber}}>✦ {bankScore}</span></div>
                <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:12}}><div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.amber},${C.cyan})`,width:`${(bankCur/bank.length)*100}%`,transition:"width 0.3s"}}/></div>
                <div style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:`${C.navy2}cc`,border:`1px solid ${C.blue}22`}}>{bank[bankCur].q}</div>
                <button onClick={()=>setBankAns(true)} disabled={bankAns} style={{padding:"8px 16px",borderRadius:8,fontSize:11,cursor:bankAns?"default":"pointer",background:bankAns?`${C.amber}22`:"rgba(255,255,255,0.06)",border:`1px solid ${bankAns?C.amber:"rgba(255,255,255,0.15)"}`,color:bankAns?C.amber:"rgba(240,244,255,0.5)",fontFamily:"Courier New",marginBottom:bankAns?10:0}}>{bankAns?t.hideAnswer:t.showAnswer}</button>
                {bankAns&&(<div><div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.amber}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{bank[bankCur].a}</div><button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,${C.amber},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?t.bankTrophy:t.bankNext}</button></div>)}
              </div>
            )}
            {bankDone&&(<div style={{textAlign:"center",padding:16}}><div style={{fontSize:36,marginBottom:8}}>🏆</div><div style={{fontFamily:"'Cinzel',serif",fontSize:16,color:C.amber,marginBottom:6}}>{t.bankTrophy}</div><div style={{fontSize:13,color:C.dim,fontFamily:"Courier New"}}>{t.bankScore} : {bankScore}/{bank.length}</div></div>)}
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.amber}44`,padding:14,marginBottom:18}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:C.amber,letterSpacing:1,marginBottom:10}}>✦ {t.summaryTitle}</div>
          {t.summary.map((s:string,i:number)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:7,fontSize:12,color:"rgba(240,244,255,0.78)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.amber,flexShrink:0}}>✦</span><span>{s}</span></div>))}
        </div>

        <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.amber},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>🔌 {t.quizCTA}</button>
      </div>
    </div>
  );

  // ══ QUIZ ═════════════════════════════════════════════════════
  if(phase==="quiz"){
    const q=quiz[qCur];
    const isCorrect=qSel===q.correct;
    const submitLabel={fr:"Valider",en:"Submit",es:"Validar",pt:"Validar"}[lang]||"Valider";
    const nextLabel={fr:"Suivant =>",en:"Next =>",es:"Siguiente =>",pt:"Seguinte =>"}[lang]||"Suivant =>";
    return(
      <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif"}}>
        {header("QUIZ")}
        <div style={{padding:"14px 14px 40px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,fontSize:11,color:C.dim,fontFamily:"Courier New"}}><span>Q{qCur+1}/{quiz.length}</span><span style={{color:C.amber}}>⭐ {qScore}/{quiz.length}</span></div>
          <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:16}}><div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.amber},${C.cyan})`,width:`${(qCur/quiz.length)*100}%`,transition:"width 0.4s"}}/></div>
          <div style={{fontSize:14,color:C.text,lineHeight:1.6,fontFamily:"Courier New",marginBottom:18,padding:14,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${C.amber}22`}}>{q.q}</div>
          <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:16}}>
            {q.opts.map((opt:string,i:number)=>{
              let border=`1px solid ${optColors[i%4]}44`,bg=`${optColors[i%4]}0d`;
              if(qConf){if(i===q.correct){border="2px solid #4ade80";bg="rgba(74,222,128,0.12)";}else if(i===qSel&&!isCorrect){border="2px solid #ef4444";bg="rgba(239,68,68,0.12)";}}
              else if(qSel===i){border=`2px solid ${optColors[i%4]}`;bg=`${optColors[i%4]}22`;}
              return(<button key={i} disabled={qConf} onClick={()=>setQSel(i)} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:12,border,background:bg,cursor:qConf?"default":"pointer",color:C.white,textAlign:"left"}}>
                <span style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:optColors[i%4],flexShrink:0}}>{String.fromCharCode(65+i)}</span>
                <span style={{fontSize:12,fontFamily:"Courier New",lineHeight:1.4}}>{opt}</span>
              </button>);
            })}
          </div>
          {qConf&&<div style={{padding:12,borderRadius:10,marginBottom:14,background:isCorrect?"rgba(74,222,128,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${isCorrect?"#4ade80":"#ef4444"}44`,fontSize:12,color:C.text,fontFamily:"Courier New",lineHeight:1.6}}><div style={{fontWeight:700,marginBottom:4,color:isCorrect?"#4ade80":"#ef4444"}}>{isCorrect?"✅ Correct !":"❌ Incorrect"}</div>{q.exp}</div>}
          {!qConf
            ?<button onClick={handleQConf} disabled={qSel===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:qSel!==null?`linear-gradient(135deg,${C.amber},${C.cyan})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:qSel!==null?C.navy:"rgba(240,244,255,0.25)",cursor:qSel!==null?"pointer":"default",letterSpacing:1}}>{submitLabel}</button>
            :<button onClick={handleQNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.amber},${C.cyan})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:1}}>{qCur+1>=quiz.length?"TERMINER":nextLabel}</button>
          }
        </div>
      </div>
    );
  }

  // ══ DONE ═════════════════════════════════════════════════════
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 14px"}}>
      <div style={{fontSize:56,marginBottom:12}}>🔌</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:42,fontWeight:900,color:C.amber,marginBottom:4}}>{xpFinal}</div>
      <div style={{fontSize:12,color:C.dim,fontFamily:"Courier New",marginBottom:8}}>{lang==="fr"?"XP obtenus":lang==="en"?"XP earned":lang==="es"?"XP obtenidos":"XP obtidos"}</div>
      <div style={{fontSize:15,color:C.white,fontFamily:"Courier New",marginBottom:24}}>Score : {qScore}/{quiz.length}</div>
      <div style={{width:"100%",maxWidth:400,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.amber}44`,padding:14,marginBottom:24}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.amber,marginBottom:10}}>✦ {t.summaryTitle}</div>
        {t.summary.map((s:string,i:number)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.amber,flexShrink:0}}>✦</span><span>{s}</span></div>))}
      </div>
      <button onClick={onBack} style={{width:"100%",maxWidth:400,padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.amber},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>🔌 {lang==="fr"?"RETOUR AU MODULE":lang==="en"?"BACK TO MODULE":lang==="es"?"VOLVER AL MODULO":"VOLTAR AO MODULO"}</button>
    </div>
  );
}
