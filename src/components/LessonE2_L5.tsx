// LessonE2_L5 - Tableaux electriques & Distribution | PART 1
import { useState } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

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
    moduleLabel: "MACHINE - AUXILIAIRES",
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
    accidentTitle: "CAS REEL : Explosion du filtre harmonique 11kV - Queen Mary 2 (2010, rapport MAIB)",
    accidentBody: "Le 23 septembre 2010, alors que le paquebot Queen Mary 2 naviguait au large de la Nouvelle-Angleterre, une explosion violente s'est produite dans le local du filtre harmonique 11kV lie au systeme de propulsion electrique du navire. L'explosion, causee par la defaillance d'un condensateur au sein du banc de filtrage, a genere un incendie et une importante fumee qui s'est propagee dans plusieurs zones du navire, y compris des espaces passagers. Le navire a perdu sa propulsion et son gouvernail pendant environ 30 minutes, restant a la derive le temps que l'equipage retablisse le controle du reseau electrique. Un membre du personnel a ete blesse par l'explosion. L'enquete du MAIB a identifie une defaillance electrique interne au sein du banc de condensateurs du filtre harmonique, utilise pour attenuer les harmoniques generees par les variateurs de frequence alimentant la propulsion azipod. Lecon : meme des equipements electriques auxiliaires non directement lies a la propulsion (filtres, condensateurs) peuvent, en cas de defaillance, entrainer une perte totale de propulsion et de gouverne s'ils sont mal proteges ou insuffisamment surveilles.",
    summaryTitle: "Points essentiels",
    summary: [
      "Le MSB (Main Switchboard) recoit tous les groupes et distribue vers les tableaux secondaires",
      "La selectivite garantit que seul le disjoncteur le plus proche du defaut se declenche",
      "Les cables sont classifies par section (mm2) selon l'intensite a transporter",
      "Le tableau de secours (ESB) est alimente par le groupe de secours - circuits SOLAS vitaux",
      "Les MICC (cables mineraux) resistent au feu > 1000 degC - obligatoires pour circuits vitaux SOLAS",
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
      emergency: { name: "Tableau de secours (ESB)",   desc: "Emergency Switchboard - alimente automatiquement par le groupe de secours en cas de panne du MSB. Alimente les circuits vitaux SOLAS : navigation, communication, pompes incendie, eclairage de secours." },
    },
    distribution: {
      msb: { name: "MSB - Tableau Principal",    desc: "Main Switchboard - niveau 1. Recoit les groupes, distribue vers les tableaux de zone et consommateurs importants (propulsion, gros moteurs). Tension : 440V triphase.", voltage: "440V 3phase" },
      ssb: { name: "SSB - Tableau Secondaire",   desc: "Secondary Switchboard - niveau 2. Recoit du MSB et distribue vers les panneaux de zone ou appareils. Peut reduire la tension (transformateur 440V => 220V).", voltage: "440V / 220V" },
      lp:  { name: "Panneau de distribution (LP)", desc: "Local Panel - niveau 3. Distribution finale vers les consommateurs individuels : moteurs, eclairage, chauffage. Protege par fusibles ou petits disjoncteurs MCB.", voltage: "220V / 24V" },
      esb: { name: "ESB - Tableau de Secours",   desc: "Emergency Switchboard - reseau parallele alimente par le groupe de secours. Circuits vitaux uniquement : navigation, comm, pompe incendie.", voltage: "440V 3phase" },
    },
    cables: {
      xlpe:    { name: "XLPE - Polyethylene reticule", desc: "Cable standard a bord. Isolation en polyethylene reticule resistant a 90 degC. Flexible, resistant a l'humidite. Utilise pour la majorite des circuits de puissance et controle." },
      micc:    { name: "MICC - Cable mineral",         desc: "Mineral Insulated Copper Conductor - isolation en poudre de magnesium. Resiste au feu (> 1000 degC). Obligatoire SOLAS pour circuits vitaux : alarmes incendie, eclairage de secours, pompes incendie." },
      lsf:     { name: "LSF - Faible emission fumee",  desc: "Low Smoke & Fume - gaine sans halogene. En cas d'incendie, produit peu de fumee et de gaz toxiques. Recommande dans les espaces habites et voies d'evacuation." },
      armored: { name: "Cable arme (SWA)",             desc: "Steel Wire Armoured - protection mecanique en fils d'acier. Utilise dans les zones exposees aux chocs et contraintes mecaniques (cales, ponts exterieurs, passages de cloisons)." },
    },
    selectivity: {
      main:   { name: "Disjoncteur principal (ACB)",  desc: "Dernier recours - ne se declenche que si les protections inferieures ont failli. Calibre eleve (In = 100% courant groupe). Delai intentionnel pour permettre aux disjoncteurs aval de declencher d'abord." },
      feeder: { name: "Disjoncteur de depart (MCCB)", desc: "Protege le circuit de distribution. Se declenche en cas de defaut sur le cable ou tableau alimente. Calibre inferieur au disjoncteur principal." },
      final:  { name: "Disjoncteur final (MCB)",      desc: "Protege le circuit terminal et l'appareil. Calibre le plus faible - declenche le premier en cas de defaut. Selectivite garantie si In(MCB) < In(MCCB) < In(ACB)." },
      fuse:   { name: "Fusible de protection",        desc: "Protection a action unique (fond et doit etre remplace). Plus rapide qu'un disjoncteur pour les forts courts-circuits. Utilise en protection de transformateurs et circuits sensibles." },
    },
    exercises: [
      { q: "Expliquez le principe de selectivite des protections electriques et pourquoi il est critique a bord d'un navire.", a: "La selectivite (ou discrimination) est le principe qui garantit qu'en cas de defaut electrique, seul le disjoncteur le plus proche du defaut se declenche, laissant le reste du reseau alimente. A bord, c'est critique car une coupure totale du reseau peut mettre en danger la securite (perte propulsion, navigation, pompes incendie). Pour assurer la selectivite : les disjoncteurs sont calibres en cascade (In MCB < In MCCB < In ACB) et les disjoncteurs principaux ont un delai intentionnel de declenchement pour laisser les protections aval agir d'abord." },
      { q: "Pourquoi les cables MICC sont-ils obligatoires pour certains circuits a bord ? Donnez des exemples de circuits concernes.", a: "Les cables MICC (Mineral Insulated Copper Conductor) sont obligatoires selon SOLAS pour les circuits qui doivent continuer a fonctionner en cas d'incendie a bord, car leur isolation en poudre de magnesium resiste a des temperatures superieures a 1000 degC. Circuits concernes : systemes d'alarme incendie et detection, eclairage de secours et de securite, pompes incendie et sprinklers, systemes de communication d'urgence, tableaux de secours (ESB). Sur ces circuits, l'integrite du cable en cas d'incendie est vitale pour la survie du navire et de l'equipage." },
      { q: "Comment calculer la section de cable necessaire pour alimenter un moteur de 15 kW / 440V triphase avec un facteur de puissance de 0,85 ?", a: "1. Calculer le courant : I = P / (racine(3) x U x cos phi) = 15000 / (1,732 x 440 x 0,85) = 15000 / 648 = 23,1 A. 2. Appliquer un coefficient de securite (generalement x1,25 pour moteurs) : 23,1 x 1,25 = 28,9 A. 3. Choisir la section dans les tables : pour 29 A en pose libre, une section de 6 mm2 XLPE convient (capacite ~36A). Verifier la chute de tension sur la longueur du cable (max 3-5% pour circuits de puissance). Choisir une section superieure si la chute de tension est trop elevee." },
    ],
    bankQuestions: [
      { q: "Quelle est la fonction principale du MSB (Main Switchboard) ?", opts: ["Reguler la vitesse du moteur principal","Recevoir l'energie de tous les groupes electrogenes et la distribuer a bord","Mesurer uniquement la temperature des moteurs","Stocker l'energie de secours"], correct: 1, expl: "Le MSB est le centre de distribution electrique du navire : il recoit l'energie de tous les groupes, la distribue vers les tableaux secondaires, assure la protection du reseau et permet le couplage des groupes en parallele." },
      { q: "Pourquoi certains grands navires disposent-ils de deux demi-jeux de barres separes par un coupleur (bus-tie) ?", opts: ["Pour doubler la puissance totale disponible","Pour pouvoir sectionner le reseau en deux parties independantes et faciliter la maintenance sans coupure totale","Uniquement pour respecter une norme esthetique","Pour reduire le nombre de disjoncteurs necessaires"], correct: 1, expl: "Cette disposition permet de maintenir l'alimentation d'une moitie du reseau si l'autre est defaillante, et de faciliter la maintenance d'une section sans couper l'ensemble du navire." },
      { q: "Quelle est la principale difference entre un ACB, un MCCB et un MCB ?", opts: ["Aucune difference, ce sont des synonymes","Ils se distinguent par leur calibre : ACB pour les fortes puissances, MCCB pour les departs secondaires, MCB pour les circuits terminaux","Le MCB est toujours plus puissant que l'ACB","Seul l'ACB peut proteger contre les courts-circuits"], correct: 1, expl: "L'ACB (haute puissance) protege les arrivees groupes et departs principaux, le MCCB les departs secondaires, et le MCB, calibre le plus faible, protege les circuits terminaux comme l'eclairage." },
      { q: "Ou se trouve generalement le tableau de secours (ESB) et pourquoi ?", opts: ["Dans la salle des machines principale pour un acces facile","Au-dessus de la ligne de flottaison, hors salle des machines principale, pour rester operationnel en cas de sinistre","Dans la cale a marchandises","Il n'existe pas de localisation particuliere"], correct: 1, expl: "L'ESB est situe hors de la salle des machines principale et au-dessus de la ligne de flottaison afin de rester operationnel meme si cette salle est sinistree, alimentant les circuits vitaux SOLAS." },
      { q: "Pourquoi utilise-t-on des transformateurs dans le systeme de distribution electrique a bord ?", opts: ["Uniquement pour reduire le poids des cables","Pour adapter la tension aux besoins des consommateurs (ex : 440V vers 220V)","Pour augmenter la frequence du courant","Pour remplacer les disjoncteurs"], correct: 1, expl: "Les transformateurs adaptent la tension (440V vers 220V pour l'eclairage, vers 24V DC pour les automatismes) et peuvent isoler galvaniquement certains circuits pour la securite." },
      { q: "Comment equilibre-t-on la puissance active (kW) entre plusieurs groupes couples en parallele ?", opts: ["En ajustant l'AVR de chaque groupe","En ajustant le governor de chaque groupe (admission carburant)","En modifiant la section des cables","En changeant la frequence du reseau"], correct: 1, expl: "La puissance active est ajustee via le governor de chaque groupe (admission de carburant), tandis que la puissance reactive est ajustee via l'AVR (courant d'excitation)." },
      { q: "Que represente la section d'un cable electrique et quel parametre determine-t-elle principalement ?", opts: ["La longueur totale du cable","L'aire de la section transversale du conducteur, qui determine la capacite de transport de courant","La couleur de l'isolant","Le nombre de brins toronnes uniquement"], correct: 1, expl: "La section (en mm2) determine l'ampacite du cable : plus la section est grande, plus le courant transportable est eleve, sous reserve du mode de pose et de la temperature ambiante." },
      { q: "Quelle est la limite de chute de tension generalement admise pour les circuits d'eclairage a bord ?", opts: ["10%","3%","25%","50%"], correct: 1, expl: "Les circuits d'eclairage tolerent une chute de tension maximale d'environ 3%, contre 5% pour les circuits de puissance et 2% pour les circuits de controle/signalisation." },
      { q: "Pourquoi utilise-t-on un transformateur d'isolement pour certains circuits sensibles (infirmerie, sanitaires) ?", opts: ["Pour augmenter la tension disponible","Pour isoler galvaniquement le circuit et empecher un courant de defaut de circuler via le corps humain","Pour reduire le cout d'installation","Pour ameliorer uniquement l'eclairage"], correct: 1, expl: "L'isolation galvanique du transformateur d'isolement (rapport 1:1) empeche les courants de defaut de circuler via le corps humain en cas de contact accidentel, essentiel dans les zones humides ou medicales." },
      { q: "Comment fonctionne une protection differentielle sur un alternateur ?", opts: ["Elle mesure uniquement la temperature de l'enroulement","Elle compare le courant entrant et sortant de l'enroulement et declenche si un desequilibre depasse un seuil","Elle regule automatiquement la tension de sortie","Elle limite la vitesse de rotation du rotor"], correct: 1, expl: "En fonctionnement normal, le courant entrant egale le courant sortant. Un defaut interne cree un desequilibre : quand ce courant differentiel depasse le seuil regle, le relais declenche instantanement le disjoncteur." },
      { q: "Qu'est-ce que la selectivite temporelle des protections electriques ?", opts: ["Un delai intentionnel ajoute aux disjoncteurs de niveau superieur pour laisser les protections aval declencher en premier","Un declenchement simultane de tous les disjoncteurs","Une protection qui ne fonctionne que le jour","Un reglage identique pour tous les disjoncteurs"], correct: 0, expl: "La selectivite temporelle ajoute un delai croissant selon le niveau hierarchique du disjoncteur (le MCB declenche immediatement, l'ACB attend par exemple 0,1s), garantissant que seul le disjoncteur le plus proche du defaut agit." },
      { q: "Quel type de cable est obligatoire selon SOLAS pour les circuits vitaux (alarme incendie, pompe incendie, eclairage de secours) ?", opts: ["XLPE standard","MICC (Mineral Insulated Copper Conductor), resistant a plus de 1000 degC","Cable arme SWA uniquement pour la protection mecanique","N'importe quel cable convient"], correct: 1, expl: "Le cable MICC, avec son isolation en poudre de magnesium resistant a plus de 1000 degC, est obligatoire pour les circuits qui doivent rester operationnels en cas d'incendie a bord." },
      { q: "A quoi sert le panneau de synchronisation sur le MSB ?", opts: ["A mesurer uniquement la temperature ambiante","A permettre le couplage des groupes en parallele en verifiant tension, frequence et concordance de phase","A controler la vitesse du navire","A alimenter directement l'ESB"], correct: 1, expl: "Le panneau de synchronisation (synchroscope, lampes de synchronisation, selecteur de groupe) permet de verifier les trois conditions de couplage avant de fermer le disjoncteur d'un groupe entrant." },
      { q: "Quelles verifications periodiques sont recommandees sur un MSB selon le Plan de Maintenance Preventive ?", opts: ["Aucune verification n'est necessaire si le tableau fonctionne","Releve quotidien des parametres, test mensuel des disjoncteurs, test annuel des protections et de l'isolement","Uniquement un controle visuel une fois par an","Le remplacement systematique du MSB tous les 5 ans"], correct: 1, expl: "Les verifications quotidiennes (parametres, voyants), mensuelles (declenchement disjoncteurs, resserrage connexions) et annuelles (test des protections, isolement) sont documentees dans le Plan de Maintenance Preventive." },
      { q: "Quel est le role principal de la selectivite des protections electriques a bord ?", opts: ["Reduire le cout des disjoncteurs","Garantir qu'en cas de defaut, seul le disjoncteur le plus proche du defaut se declenche, preservant l'alimentation du reste du reseau","Augmenter la puissance totale disponible","Simplifier le cablage du tableau"], correct: 1, expl: "La selectivite garantit qu'un defaut electrique n'entraine que la coupure du circuit concerne, sans priver le reste du navire d'alimentation, ce qui est critique pour la securite (propulsion, navigation, pompes incendie)." },
    ],
    quiz: [
      { q: "Quel est le role principal du MSB (Main Switchboard) ?", opts: ["Controler la vitesse du moteur principal", "Recevoir l'energie des groupes et la distribuer a bord", "Mesurer la temperature des moteurs", "Reguler la pression de la vapeur"], correct: 1, exp: "Le MSB (Main Switchboard) est le tableau principal qui recoit l'energie de tous les groupes electrogenes et la distribue a l'ensemble du navire via les tableaux secondaires et circuits de distribution." },
      { q: "Quel type de cable est obligatoire selon SOLAS pour les circuits d'alarme incendie ?", opts: ["XLPE standard", "LSF sans halogene", "MICC mineral", "SWA arme"], correct: 2, exp: "Les cables MICC (Mineral Insulated Copper Conductor) sont obligatoires SOLAS pour les circuits vitaux devant fonctionner en cas d'incendie. Leur isolation en poudre de magnesium resiste a plus de 1000 degC." },
      { q: "Pour assurer la selectivite, quelle relation doit exister entre les calibres des disjoncteurs ?", opts: ["In(ACB) < In(MCCB) < In(MCB)", "In(MCB) < In(MCCB) < In(ACB)", "Tous les disjoncteurs doivent avoir le meme calibre", "In(MCCB) = In(ACB)"], correct: 1, exp: "La selectivite exige que In(MCB) < In(MCCB) < In(ACB). Ainsi, en cas de defaut, le disjoncteur de calibre le plus faible (le plus proche du defaut) declenche le premier, laissant les circuits en amont alimentes." },
      { q: "Qu'est-ce que l'ESB (Emergency Switchboard) ?", opts: ["Le tableau de distribution secondaire", "Le tableau alimente par le groupe de secours pour les circuits vitaux SOLAS", "Le tableau de controle du moteur principal", "Le panneau de synchronisation des groupes"], correct: 1, exp: "L'ESB (Emergency Switchboard) est le tableau de secours alimente par le groupe electrogene de secours. Il alimente les circuits vitaux SOLAS (navigation, communication, pompe incendie, eclairage secours) en cas de panne du MSB." },
      { q: "Pour un moteur triphase 440V / 10 kW / cos phi = 0,85, quel est approximativement le courant nominal ?", opts: ["7,7 A", "15,4 A", "30,8 A", "46,2 A"], correct: 1, exp: "I = P / (racine(3) x U x cos phi) = 10000 / (1,732 x 440 x 0,85) = 10000 / 648 = 15,4 A. Avec le coefficient de securite moteur (x1,25) : 19,3 A. On choisira un MCCB calibre a 20A et un cable de 4mm2." },
    ],
  },

  en: {
    moduleLabel: "ENGINE - AUXILIARIES",
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
    accidentTitle: "REAL CASE: 11kV harmonic filter explosion - Queen Mary 2 (2010, MAIB report)",
    accidentBody: "On 23 September 2010, while the ocean liner Queen Mary 2 was sailing off New England, a violent explosion occurred in the 11kV harmonic filter room linked to the vessel's electric propulsion system. The explosion, caused by the failure of a capacitor within the filter bank, generated a fire and significant smoke that spread into several areas of the ship, including passenger spaces. The vessel lost propulsion and steering for about 30 minutes, remaining adrift while the crew restored control of the electrical network. One crew member was injured by the explosion. The MAIB investigation identified an internal electrical failure within the harmonic filter's capacitor bank, used to reduce harmonics generated by the variable frequency drives feeding the azipod propulsion. Lesson: even auxiliary electrical equipment not directly linked to propulsion (filters, capacitors) can, if it fails, cause total loss of propulsion and steering if poorly protected or insufficiently monitored.",
    summaryTitle: "Key Points",
    summary: [
      "The MSB (Main Switchboard) receives all generators and distributes to secondary switchboards",
      "Selectivity ensures only the breaker closest to the fault trips",
      "Cables are rated by cross-section (mm2) according to current to be carried",
      "The Emergency Switchboard (ESB) feeds SOLAS vital circuits from the emergency generator",
      "MICC cables are fire-resistant > 1000 degC - mandatory for SOLAS vital circuits",
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
      msb: { name: "MSB - Main Switchboard",      desc: "Level 1. Receives generators, distributes to zone switchboards and major consumers (propulsion, large motors). Voltage: 440V three-phase.", voltage: "440V 3phase" },
      ssb: { name: "SSB - Secondary Switchboard", desc: "Level 2. Receives from MSB and distributes to zone panels or equipment. May step down voltage (transformer 440V=>220V).", voltage: "440V / 220V" },
      lp:  { name: "Distribution Panel (LP)",     desc: "Local Panel - Level 3. Final distribution to individual consumers: motors, lighting, heating. Protected by fuses or small MCB breakers.", voltage: "220V / 24V" },
      esb: { name: "ESB - Emergency Switchboard", desc: "Parallel network fed by emergency generator. Vital circuits only: navigation, comms, fire pump.", voltage: "440V 3phase" },
    },
    cables: {
      xlpe:    { name: "XLPE - Cross-Linked Polyethylene", desc: "Standard on-board cable. Cross-linked polyethylene insulation rated to 90 degC. Flexible, moisture-resistant. Used for the majority of power and control circuits." },
      micc:    { name: "MICC - Mineral Insulated Cable",   desc: "Mineral Insulated Copper Conductor - magnesium powder insulation. Fire-resistant (>1000 degC). SOLAS mandatory for vital circuits: fire alarms, emergency lighting, fire pumps." },
      lsf:     { name: "LSF - Low Smoke & Fume",           desc: "Halogen-free sheath. In case of fire, produces little smoke and toxic gas. Recommended in occupied spaces and evacuation routes." },
      armored: { name: "Armoured Cable (SWA)",              desc: "Steel Wire Armoured - mechanical protection with steel wires. Used in areas exposed to shock and mechanical stress (holds, open decks, bulkhead penetrations)." },
    },
    selectivity: {
      main:   { name: "Main Circuit Breaker (ACB)",  desc: "Last resort - only trips if downstream protections have failed. High rating (In = 100% generator current). Intentional delay to allow downstream breakers to trip first." },
      feeder: { name: "Feeder Circuit Breaker (MCCB)", desc: "Protects the distribution circuit. Trips on fault on the cable or fed switchboard. Rating below main breaker." },
      final:  { name: "Final Circuit Breaker (MCB)", desc: "Protects the terminal circuit and equipment. Lowest rating - trips first on fault. Selectivity ensured if In(MCB) < In(MCCB) < In(ACB)." },
      fuse:   { name: "Fuse Protection",             desc: "Single-action protection (melts and must be replaced). Faster than a breaker for heavy short circuits. Used for transformer and sensitive circuit protection." },
    },
    exercises: [
      { q: "Explain the principle of protection selectivity and why it is critical on board a vessel.", a: "Selectivity (or discrimination) ensures that on an electrical fault, only the circuit breaker closest to the fault trips, leaving the rest of the network energised. On board this is critical as total power loss can endanger safety (loss of propulsion, navigation, fire pumps). To ensure selectivity: breakers are cascade-rated (In MCB < In MCCB < In ACB) and main breakers have intentional tripping delays to allow downstream protections to act first." },
      { q: "Why are MICC cables mandatory for certain circuits on board? Give examples.", a: "MICC cables are mandatory per SOLAS for circuits that must continue to function during a fire, as their magnesium powder insulation withstands temperatures above 1000 degC. Concerned circuits: fire alarm and detection systems, emergency and safety lighting, fire pumps and sprinklers, emergency communication systems, emergency switchboards. Cable integrity during a fire is vital for vessel and crew survival." },
      { q: "How do you calculate the cable cross-section needed to supply a 15 kW / 440V three-phase motor with a power factor of 0.85?", a: "1. Calculate current: I = P / (sqrt(3) x U x cos phi) = 15000 / (1.732 x 440 x 0.85) = 23.1 A. 2. Apply safety factor (x1.25 for motors): 23.1 x 1.25 = 28.9 A. 3. Select cross-section from tables: for 29 A in free air, 6 mm2 XLPE is suitable (capacity ~36A). Check voltage drop over cable length (max 3-5% for power circuits)." },
    ],
    bankQuestions: [
      { q: "What is the main function of the MSB (Main Switchboard)?", opts: ["Regulate the main engine speed","Receive power from all generating sets and distribute it around the vessel","Only measure engine temperature","Store emergency power"], correct: 1, expl: "The MSB is the vessel's electrical distribution centre: it receives power from all sets, distributes it to secondary switchboards, protects the network and allows generators to be coupled in parallel." },
      { q: "Why do some large vessels have two half-busbars separated by a coupler (bus-tie)?", opts: ["To double the total available power","To split the network into two independent sections and ease maintenance without a total shutdown","Only to meet an aesthetic standard","To reduce the number of breakers needed"], correct: 1, expl: "This arrangement keeps one half of the network supplied if the other fails, and makes it easier to maintain a section without cutting power to the whole vessel." },
      { q: "What is the main difference between an ACB, an MCCB and an MCB?", opts: ["No difference, they are synonyms","They differ by rating: ACB for high power, MCCB for secondary feeders, MCB for terminal circuits","The MCB is always more powerful than the ACB","Only the ACB can protect against short circuits"], correct: 1, expl: "The ACB (high power) protects generator incomers and main feeders, the MCCB protects secondary feeders, and the MCB, the lowest rated, protects terminal circuits such as lighting." },
      { q: "Where is the emergency switchboard (ESB) usually located, and why?", opts: ["In the main engine room for easy access","Above the waterline, outside the main engine room, to remain operational in case of a casualty","In the cargo hold","There is no specific location requirement"], correct: 1, expl: "The ESB is located outside the main engine room and above the waterline so it remains operational even if that space is affected, supplying the vital SOLAS circuits." },
      { q: "Why are transformers used in the on-board electrical distribution system?", opts: ["Only to reduce cable weight","To adapt voltage to consumer requirements (e.g. 440V to 220V)","To increase the current frequency","To replace circuit breakers"], correct: 1, expl: "Transformers adapt voltage (440V to 220V for lighting, to 24V DC for controls) and can galvanically isolate certain circuits for safety." },
      { q: "How is active power (kW) shared between several generators running in parallel?", opts: ["By adjusting each set's AVR","By adjusting each set's governor (fuel admission)","By modifying cable cross-section","By changing the network frequency"], correct: 1, expl: "Active power is adjusted via each set's governor (fuel admission), while reactive power is adjusted via the AVR (excitation current)." },
      { q: "What does a cable's cross-section represent, and what does it mainly determine?", opts: ["The cable's total length","The conductor's cross-sectional area, which determines current-carrying capacity","The colour of the insulation","Only the number of stranded wires"], correct: 1, expl: "Cross-section (in mm2) determines a cable's ampacity: the larger the section, the higher the current it can carry, subject to installation method and ambient temperature." },
      { q: "What is the generally accepted voltage drop limit for lighting circuits on board?", opts: ["10%","3%","25%","50%"], correct: 1, expl: "Lighting circuits typically tolerate a maximum voltage drop of about 3%, versus 5% for power circuits and 2% for control/signalling circuits." },
      { q: "Why is an isolation transformer used for certain sensitive circuits (sick bay, bathrooms)?", opts: ["To increase available voltage","To galvanically isolate the circuit and prevent fault current from flowing through the human body","To reduce installation cost","Only to improve lighting"], correct: 1, expl: "The isolation transformer's galvanic isolation (1:1 ratio) prevents fault currents from flowing through the human body on accidental contact, essential in wet or medical areas." },
      { q: "How does a differential protection relay work on an alternator?", opts: ["It only measures winding temperature","It compares current entering and leaving the winding and trips if an imbalance exceeds a threshold","It automatically regulates output voltage","It limits the rotor's rotation speed"], correct: 1, expl: "Under normal operation, current in equals current out. An internal fault creates an imbalance: when this differential current exceeds the set threshold, the relay instantly trips the breaker." },
      { q: "What is time selectivity in electrical protection?", opts: ["An intentional delay added to higher-level breakers so downstream protections trip first","A simultaneous trip of all breakers","A protection that only works during the day","An identical setting for all breakers"], correct: 0, expl: "Time selectivity adds an increasing delay by breaker hierarchy level (the MCB trips instantly, the ACB waits e.g. 0.1s), ensuring only the breaker closest to the fault operates." },
      { q: "Which cable type is mandatory under SOLAS for vital circuits (fire alarm, fire pump, emergency lighting)?", opts: ["Standard XLPE","MICC (Mineral Insulated Copper Conductor), resistant above 1000 degC","SWA armoured cable only for mechanical protection","Any cable will do"], correct: 1, expl: "MICC cable, with its magnesium powder insulation resistant above 1000 degC, is mandatory for circuits that must remain operational during a fire on board." },
      { q: "What is the synchronising panel on the MSB used for?", opts: ["Only measuring ambient temperature","Allowing generators to couple in parallel by checking voltage, frequency and phase concordance","Controlling the vessel's speed","Directly supplying the ESB"], correct: 1, expl: "The synchronising panel (synchroscope, synchronising lamps, generator selector) allows the three coupling conditions to be checked before closing an incoming generator's breaker." },
      { q: "What periodic checks are recommended for an MSB under the Planned Maintenance System?", opts: ["No checks are necessary if the switchboard is working","Daily parameter readings, monthly breaker testing, annual protection and insulation testing","Only a visual check once a year","Systematic MSB replacement every 5 years"], correct: 1, expl: "Daily checks (parameters, indicators), monthly checks (breaker tripping, connection tightening) and annual checks (protection testing, insulation) are documented in the Planned Maintenance System." },
      { q: "What is the main purpose of electrical protection selectivity on board?", opts: ["Reducing the cost of circuit breakers","Ensuring that in case of a fault, only the breaker closest to the fault trips, preserving supply to the rest of the network","Increasing total available power","Simplifying switchboard wiring"], correct: 1, expl: "Selectivity ensures an electrical fault only cuts off the affected circuit, without depriving the rest of the vessel of power, which is critical for safety (propulsion, navigation, fire pumps)." },
    ],
    quiz: [
      { q: "What is the main role of the MSB (Main Switchboard)?", opts: ["Control main engine speed", "Receive generator power and distribute it on board", "Measure motor temperatures", "Regulate steam pressure"], correct: 1, exp: "The MSB receives power from all generating sets and distributes it throughout the vessel via secondary switchboards and distribution circuits." },
      { q: "Which cable type is SOLAS mandatory for fire alarm circuits?", opts: ["Standard XLPE", "LSF halogen-free", "MICC mineral", "SWA armoured"], correct: 2, exp: "MICC cables are SOLAS mandatory for vital circuits that must function during a fire. Their magnesium powder insulation withstands over 1000 degC." },
      { q: "For selectivity, what relationship must exist between breaker ratings?", opts: ["In(ACB) < In(MCCB) < In(MCB)", "In(MCB) < In(MCCB) < In(ACB)", "All breakers must have the same rating", "In(MCCB) = In(ACB)"], correct: 1, exp: "Selectivity requires In(MCB) < In(MCCB) < In(ACB). Thus on a fault, the lowest-rated breaker trips first, leaving upstream circuits energised." },
      { q: "What is the ESB (Emergency Switchboard)?", opts: ["The secondary distribution switchboard", "The switchboard fed by the emergency generator for SOLAS vital circuits", "The main engine control panel", "The generator synchronising panel"], correct: 1, exp: "The ESB is fed by the emergency generator and supplies SOLAS vital circuits (navigation, communication, fire pump, emergency lighting) on MSB failure." },
      { q: "For a 440V / 10 kW / cos phi = 0.85 three-phase motor, what is the approximate nominal current?", opts: ["7.7 A", "15.4 A", "30.8 A", "46.2 A"], correct: 1, exp: "I = P / (sqrt(3) x U x cos phi) = 10000 / (1.732 x 440 x 0.85) = 15.4 A. With motor safety factor (x1.25): 19.3 A." },
    ],
  },

  es: {
    moduleLabel: "MAQUINAS - AUXILIARES",
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
    accidentTitle: "CASO REAL: Explosion del filtro armonico 11kV - Queen Mary 2 (2010, informe MAIB)",
    accidentBody: "El 23 de septiembre de 2010, mientras el transatlantico Queen Mary 2 navegaba frente a Nueva Inglaterra, se produjo una violenta explosion en la sala del filtro armonico 11kV vinculado al sistema de propulsion electrica del buque. La explosion, causada por el fallo de un condensador dentro del banco de filtrado, genero un incendio y una gran cantidad de humo que se propago a varias zonas del buque, incluyendo espacios de pasajeros. El buque perdio la propulsion y el gobierno durante unos 30 minutos, quedando a la deriva mientras la tripulacion restablecia el control de la red electrica. Un tripulante resulto herido por la explosion. La investigacion del MAIB identifico un fallo electrico interno en el banco de condensadores del filtro armonico, usado para reducir los armonicos generados por los variadores de frecuencia que alimentan la propulsion azipod. Leccion: incluso equipos electricos auxiliares no directamente vinculados a la propulsion (filtros, condensadores) pueden, si fallan, provocar una perdida total de propulsion y gobierno si estan mal protegidos o insuficientemente supervisados.",
    summaryTitle: "Puntos esenciales",
    summary: [
      "El MSB recibe todos los grupos y distribuye hacia los cuadros secundarios",
      "La selectividad garantiza que solo el disyuntor mas cercano al fallo se dispare",
      "Los cables se clasifican por seccion (mm2) segun la intensidad a transportar",
      "El cuadro de emergencia (ESB) alimenta los circuitos vitales SOLAS",
      "Los cables MICC resisten al fuego > 1000 degC - obligatorios para circuitos vitales SOLAS",
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
      msb: { name: "MSB - Cuadro Principal",    desc: "Nivel 1. Recibe los grupos, distribuye hacia cuadros de zona y grandes consumidores. Tension: 440V trifasico.", voltage: "440V 3phase" },
      ssb: { name: "SSB - Cuadro Secundario",   desc: "Nivel 2. Recibe del MSB y distribuye hacia paneles de zona o equipos. Puede reducir la tension (transformador 440V => 220V).", voltage: "440V / 220V" },
      lp:  { name: "Panel de distribucion (LP)", desc: "Nivel 3. Distribucion final hacia consumidores individuales: motores, alumbrado, calefaccion. Protegido por fusibles o pequenos disyuntores MCB.", voltage: "220V / 24V" },
      esb: { name: "ESB - Cuadro de Emergencia", desc: "Red paralela alimentada por el grupo de emergencia. Solo circuitos vitales: navegacion, comunicacion, bomba de incendios.", voltage: "440V 3phase" },
    },
    cables: {
      xlpe:    { name: "XLPE - Polietileno reticulado", desc: "Cable estandar a bordo. Aislamiento resistente a 90 degC. Flexible, resistente a la humedad. Usado en la mayoria de los circuitos de potencia y control." },
      micc:    { name: "MICC - Cable mineral",          desc: "Aislamiento en polvo de magnesio. Resistente al fuego (> 1000 degC). Obligatorio SOLAS para circuitos vitales: alarmas de incendio, alumbrado de emergencia, bombas de incendios." },
      lsf:     { name: "LSF - Baja emision de humos",  desc: "Vaina sin halogenos. En caso de incendio, produce poco humo y gases toxicos. Recomendado en espacios habitados y vias de evacuacion." },
      armored: { name: "Cable armado (SWA)",            desc: "Proteccion mecanica en alambres de acero. Usado en zonas expuestas a golpes y esfuerzos mecanicos (bodegas, cubiertas exteriores)." },
    },
    selectivity: {
      main:   { name: "Disyuntor principal (ACB)",  desc: "Ultimo recurso - solo se dispara si las protecciones inferiores han fallado. Calibre elevado. Retardo intencional para permitir a los disyuntores aguas abajo disparar primero." },
      feeder: { name: "Disyuntor de salida (MCCB)", desc: "Protege el circuito de distribucion. Se dispara en caso de fallo en el cable o cuadro alimentado. Calibre inferior al disyuntor principal." },
      final:  { name: "Disyuntor final (MCB)",      desc: "Protege el circuito terminal y el aparato. Calibre mas bajo - se dispara primero. Selectividad garantizada si In(MCB) < In(MCCB) < In(ACB)." },
      fuse:   { name: "Fusible de proteccion",      desc: "Proteccion de accion unica (funde y debe reemplazarse). Mas rapido que un disyuntor para fuertes cortocircuitos. Usado en proteccion de transformadores." },
    },
    exercises: [
      { q: "Explique el principio de selectividad de las protecciones electricas y por que es critico a bordo.", a: "La selectividad garantiza que en caso de fallo electrico, solo el disyuntor mas cercano al fallo se dispare, dejando el resto de la red alimentada. A bordo es critico porque una corte total puede poner en peligro la seguridad (perdida de propulsion, navegacion, bombas de incendios). Para asegurar la selectividad: los disyuntores se calibran en cascada (In MCB < In MCCB < In ACB) y los principales tienen retardo intencional." },
      { q: "Por que los cables MICC son obligatorios para ciertos circuitos a bordo? De ejemplos.", a: "Los cables MICC son obligatorios segun SOLAS para circuitos que deben funcionar durante un incendio, ya que su aislamiento en polvo de magnesio resiste temperaturas superiores a 1000 degC. Circuitos: alarmas de incendio, alumbrado de emergencia, bombas de incendios, comunicaciones de emergencia, cuadros de emergencia." },
      { q: "Como calcular la seccion de cable necesaria para alimentar un motor de 15 kW / 440V trifasico con cos phi = 0,85?", a: "1. Calcular corriente: I = P / (raiz(3) x U x cos phi) = 15000 / (1,732 x 440 x 0,85) = 23,1 A. 2. Aplicar coeficiente de seguridad (x1,25 para motores): 28,9 A. 3. Elegir seccion en tablas: para 29 A en montaje libre, 6 mm2 XLPE es adecuado (~36A). Verificar la caida de tension (max 3-5%)." },
    ],
    bankQuestions: [
      { q: "Cual es la funcion principal del MSB (Main Switchboard)?", opts: ["Regular la velocidad del motor principal","Recibir la energia de todos los grupos electrogenos y distribuirla a bordo","Medir unicamente la temperatura de los motores","Almacenar la energia de emergencia"], correct: 1, expl: "El MSB es el centro de distribucion electrica del buque: recibe la energia de todos los grupos, la distribuye a los cuadros secundarios, protege la red y permite acoplar los grupos en paralelo." },
      { q: "Por que algunos buques grandes tienen dos semijuegos de barras separados por un acoplador (bus-tie)?", opts: ["Para duplicar la potencia total disponible","Para poder dividir la red en dos partes independientes y facilitar el mantenimiento sin corte total","Solo por una norma estetica","Para reducir el numero de disyuntores necesarios"], correct: 1, expl: "Esta disposicion permite mantener el suministro de una mitad de la red si la otra falla, y facilita el mantenimiento de una seccion sin cortar todo el buque." },
      { q: "Cual es la principal diferencia entre un ACB, un MCCB y un MCB?", opts: ["Ninguna diferencia, son sinonimos","Se distinguen por su calibre: ACB para altas potencias, MCCB para salidas secundarias, MCB para circuitos terminales","El MCB siempre es mas potente que el ACB","Solo el ACB puede proteger contra cortocircuitos"], correct: 1, expl: "El ACB (alta potencia) protege las entradas de grupos y salidas principales, el MCCB las salidas secundarias, y el MCB, de menor calibre, protege los circuitos terminales como el alumbrado." },
      { q: "Donde suele situarse el cuadro de emergencia (ESB) y por que?", opts: ["En la sala de maquinas principal para facil acceso","Por encima de la linea de flotacion, fuera de la sala de maquinas principal, para seguir operativo en caso de siniestro","En la bodega de carga","No existe una ubicacion particular"], correct: 1, expl: "El ESB se situa fuera de la sala de maquinas principal y por encima de la linea de flotacion para seguir operativo aunque esa sala se vea afectada, alimentando los circuitos vitales SOLAS." },
      { q: "Por que se usan transformadores en el sistema de distribucion electrica a bordo?", opts: ["Solo para reducir el peso de los cables","Para adaptar la tension a las necesidades de los consumidores (ej: 440V a 220V)","Para aumentar la frecuencia de la corriente","Para sustituir a los disyuntores"], correct: 1, expl: "Los transformadores adaptan la tension (440V a 220V para alumbrado, a 24V DC para automatismos) y pueden aislar galvanicamente ciertos circuitos por seguridad." },
      { q: "Como se equilibra la potencia activa (kW) entre varios grupos acoplados en paralelo?", opts: ["Ajustando el AVR de cada grupo","Ajustando el governor de cada grupo (admision de combustible)","Modificando la seccion de los cables","Cambiando la frecuencia de la red"], correct: 1, expl: "La potencia activa se ajusta mediante el governor de cada grupo (admision de combustible), mientras que la potencia reactiva se ajusta mediante el AVR (corriente de excitacion)." },
      { q: "Que representa la seccion de un cable electrico y que parametro determina principalmente?", opts: ["La longitud total del cable","El area de la seccion transversal del conductor, que determina la capacidad de transporte de corriente","El color del aislante","Solo el numero de hilos trenzados"], correct: 1, expl: "La seccion (en mm2) determina la ampacidad del cable: cuanto mayor es la seccion, mayor es la corriente que puede transportar, segun el modo de instalacion y la temperatura ambiente." },
      { q: "Cual es el limite de caida de tension generalmente admitido para los circuitos de alumbrado a bordo?", opts: ["10%","3%","25%","50%"], correct: 1, expl: "Los circuitos de alumbrado toleran una caida de tension maxima de aproximadamente el 3%, frente al 5% de los circuitos de potencia y el 2% de los circuitos de control/senalizacion." },
      { q: "Por que se usa un transformador de aislamiento para ciertos circuitos sensibles (enfermeria, sanitarios)?", opts: ["Para aumentar la tension disponible","Para aislar galvanicamente el circuito e impedir que una corriente de fallo circule a traves del cuerpo humano","Para reducir el coste de instalacion","Solo para mejorar el alumbrado"], correct: 1, expl: "El aislamiento galvanico del transformador de aislamiento (relacion 1:1) impide que las corrientes de fallo circulen a traves del cuerpo humano en caso de contacto accidental." },
      { q: "Como funciona un rele de proteccion diferencial en un alternador?", opts: ["Solo mide la temperatura del devanado","Compara la corriente entrante y saliente del devanado y dispara si un desequilibrio supera un umbral","Regula automaticamente la tension de salida","Limita la velocidad de rotacion del rotor"], correct: 1, expl: "En funcionamiento normal, la corriente entrante iguala a la saliente. Un fallo interno crea un desequilibrio: cuando la corriente diferencial supera el umbral ajustado, el rele dispara instantaneamente el disyuntor." },
      { q: "Que es la selectividad temporal de las protecciones electricas?", opts: ["Un retardo intencional anadido a los disyuntores de nivel superior para dejar que las protecciones aguas abajo disparen primero","Un disparo simultaneo de todos los disyuntores","Una proteccion que solo funciona de dia","Un ajuste identico para todos los disyuntores"], correct: 0, expl: "La selectividad temporal anade un retardo creciente segun el nivel jerarquico del disyuntor (el MCB dispara al instante, el ACB espera por ejemplo 0,1s), garantizando que solo actue el disyuntor mas cercano al fallo." },
      { q: "Que tipo de cable es obligatorio segun SOLAS para los circuitos vitales (alarma de incendios, bomba de incendios, alumbrado de emergencia)?", opts: ["XLPE estandar","MICC (Mineral Insulated Copper Conductor), resistente a mas de 1000 degC","Cable armado SWA solo para proteccion mecanica","Cualquier cable sirve"], correct: 1, expl: "El cable MICC, con su aislamiento de polvo de magnesio resistente a mas de 1000 degC, es obligatorio para los circuitos que deben seguir operativos durante un incendio a bordo." },
      { q: "Para que sirve el panel de sincronizacion en el MSB?", opts: ["Solo para medir la temperatura ambiente","Para permitir el acoplamiento de los grupos en paralelo verificando tension, frecuencia y concordancia de fase","Para controlar la velocidad del buque","Para alimentar directamente el ESB"], correct: 1, expl: "El panel de sincronizacion (sincronoscopio, lamparas de sincronizacion, selector de grupo) permite verificar las tres condiciones de acoplamiento antes de cerrar el disyuntor de un grupo entrante." },
      { q: "Que verificaciones periodicas se recomiendan en un MSB segun el Plan de Mantenimiento Preventivo?", opts: ["Ninguna verificacion es necesaria si el cuadro funciona","Registro diario de parametros, prueba mensual de disyuntores, prueba anual de protecciones y aislamiento","Solo un control visual una vez al ano","La sustitucion sistematica del MSB cada 5 anos"], correct: 1, expl: "Las verificaciones diarias (parametros, indicadores), mensuales (disparo de disyuntores, apriete de conexiones) y anuales (prueba de protecciones, aislamiento) se documentan en el Plan de Mantenimiento Preventivo." },
      { q: "Cual es el objetivo principal de la selectividad de las protecciones electricas a bordo?", opts: ["Reducir el coste de los disyuntores","Garantizar que ante un fallo, solo el disyuntor mas cercano al fallo dispare, preservando la alimentacion del resto de la red","Aumentar la potencia total disponible","Simplificar el cableado del cuadro"], correct: 1, expl: "La selectividad garantiza que un fallo electrico solo corte el circuito afectado, sin privar al resto del buque de alimentacion, algo critico para la seguridad (propulsion, navegacion, bombas de incendio)." },
    ],
    quiz: [
      { q: "Cual es la funcion principal del MSB?", opts: ["Controlar la velocidad del motor principal", "Recibir la energia de los grupos y distribuirla a bordo", "Medir las temperaturas de los motores", "Regular la presion del vapor"], correct: 1, exp: "El MSB recibe la energia de todos los grupos electrogenos y la distribuye por todo el buque mediante cuadros secundarios y circuitos de distribucion." },
      { q: "Que tipo de cable es obligatorio segun SOLAS para los circuitos de alarma de incendios?", opts: ["XLPE estandar", "LSF sin halogenos", "MICC mineral", "SWA armado"], correct: 2, exp: "Los cables MICC son obligatorios SOLAS para circuitos vitales que deben funcionar en caso de incendio. Su aislamiento en polvo de magnesio resiste mas de 1000 degC." },
      { q: "Para asegurar la selectividad, que relacion debe existir entre los calibres?", opts: ["In(ACB) < In(MCCB) < In(MCB)", "In(MCB) < In(MCCB) < In(ACB)", "Todos iguales", "In(MCCB) = In(ACB)"], correct: 1, exp: "La selectividad exige In(MCB) < In(MCCB) < In(ACB). En caso de fallo, el disyuntor de menor calibre (mas cercano al fallo) dispara primero." },
      { q: "Que es el ESB?", opts: ["El cuadro de distribucion secundario", "El cuadro alimentado por el grupo de emergencia para circuitos vitales SOLAS", "El panel de control del motor principal", "El panel de sincronizacion"], correct: 1, exp: "El ESB es alimentado por el generador de emergencia y suministra los circuitos vitales SOLAS en caso de fallo del MSB." },
      { q: "Para un motor trifasico 440V / 10 kW / cos phi = 0,85, cual es aproximadamente la corriente nominal?", opts: ["7,7 A", "15,4 A", "30,8 A", "46,2 A"], correct: 1, exp: "I = P / (raiz(3) x U x cos phi) = 10000 / (1,732 x 440 x 0,85) = 15,4 A. Con coeficiente de seguridad (x1,25): 19,3 A." },
    ],
  },

  pt: {
    moduleLabel: "MAQUINAS - AUXILIARES",
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
    accidentTitle: "CASO REAL: Explosao do filtro harmonico 11kV - Queen Mary 2 (2010, relatorio MAIB)",
    accidentBody: "Em 23 de setembro de 2010, enquanto o transatlantico Queen Mary 2 navegava ao largo da Nova Inglaterra, ocorreu uma explosao violenta na sala do filtro harmonico 11kV ligado ao sistema de propulsao eletrica do navio. A explosao, causada pela falha de um condensador dentro do banco de filtragem, gerou um incendio e uma grande quantidade de fumo que se espalhou por varias zonas do navio, incluindo espacos de passageiros. O navio perdeu a propulsao e o governo durante cerca de 30 minutos, ficando a deriva enquanto a tripulacao restabelecia o controlo da rede eletrica. Um tripulante ficou ferido pela explosao. A investigacao do MAIB identificou uma falha eletrica interna no banco de condensadores do filtro harmonico, usado para reduzir os harmonicos gerados pelos variadores de frequencia que alimentam a propulsao azipod. Licao: mesmo equipamentos eletricos auxiliares nao diretamente ligados a propulsao (filtros, condensadores) podem, em caso de falha, provocar uma perda total de propulsao e governo se estiverem mal protegidos ou insuficientemente monitorizados.",
    summaryTitle: "Pontos essenciais",
    summary: [
      "O MSB recebe todos os grupos e distribui para os quadros secundarios",
      "A seletividade garante que apenas o disjuntor mais proximo do defeito dispara",
      "Os cabos sao classificados por seccao (mm2) segundo a corrente a transportar",
      "O quadro de emergencia (ESB) alimenta os circuitos vitais SOLAS",
      "Os cabos MICC resistem ao fogo > 1000 degC - obrigatorios para circuitos vitais SOLAS",
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
      msb: { name: "MSB - Quadro Principal",    desc: "Nivel 1. Recebe os grupos, distribui para quadros de zona e grandes consumidores. Tensao: 440V trifasico.", voltage: "440V 3phase" },
      ssb: { name: "SSB - Quadro Secundario",   desc: "Nivel 2. Recebe do MSB e distribui para paineis de zona ou equipamentos. Pode reduzir a tensao (transformador 440V => 220V).", voltage: "440V / 220V" },
      lp:  { name: "Painel de distribuicao (LP)", desc: "Nivel 3. Distribuicao final para consumidores individuais: motores, iluminacao, aquecimento. Protegido por fusiveis ou pequenos disjuntores MCB.", voltage: "220V / 24V" },
      esb: { name: "ESB - Quadro de Emergencia", desc: "Rede paralela alimentada pelo gerador de emergencia. Apenas circuitos vitais: navegacao, comunicacao, bomba de incendio.", voltage: "440V 3phase" },
    },
    cables: {
      xlpe:    { name: "XLPE - Polietileno reticulado", desc: "Cabo padrao a bordo. Isolamento resistente a 90 degC. Flexivel, resistente a humidade. Usado na maioria dos circuitos de potencia e controlo." },
      micc:    { name: "MICC - Cabo mineral",           desc: "Isolamento em po de magnesio. Resistente ao fogo (> 1000 degC). Obrigatorio SOLAS para circuitos vitais: alarmes de incendio, iluminacao de emergencia, bombas de incendio." },
      lsf:     { name: "LSF - Baixa emissao de fumos",  desc: "Bainha sem halogenos. Em caso de incendio, produz pouco fumo e gases toxicos. Recomendado em espacos habitados e vias de evacuacao." },
      armored: { name: "Cabo armado (SWA)",              desc: "Protecao mecanica em arames de aco. Usado em zonas expostas a choques e esforcos mecanicos (porous, conveses exteriores)." },
    },
    selectivity: {
      main:   { name: "Disjuntor principal (ACB)",  desc: "Ultimo recurso - so dispara se as protecoes inferiores falharam. Calibre elevado. Retardo intencional para permitir aos disjuntores a jusante disparar primeiro." },
      feeder: { name: "Disjuntor de saida (MCCB)",  desc: "Protege o circuito de distribuicao. Dispara em caso de defeito no cabo ou quadro alimentado. Calibre inferior ao disjuntor principal." },
      final:  { name: "Disjuntor final (MCB)",      desc: "Protege o circuito terminal e o equipamento. Calibre mais baixo - dispara primeiro. Seletividade garantida se In(MCB) < In(MCCB) < In(ACB)." },
      fuse:   { name: "Fusivel de protecao",        desc: "Protecao de acao unica (funde e deve ser substituido). Mais rapido que um disjuntor para fortes curto-circuitos. Usado em protecao de transformadores." },
    },
    exercises: [
      { q: "Explique o principio de seletividade das protecoes eletricas e por que e critico a bordo.", a: "A seletividade garante que em caso de defeito eletrico, apenas o disjuntor mais proximo do defeito dispara, deixando o resto da rede alimentado. A bordo e critico porque uma corte total pode por em perigo a seguranca (perda de propulsao, navegacao, bombas de incendio). Para garantir a seletividade: disjuntores calibrados em cascata (In MCB < In MCCB < In ACB) e os principais tem retardo intencional." },
      { q: "Por que os cabos MICC sao obrigatorios para certos circuitos a bordo? De exemplos.", a: "Os cabos MICC sao obrigatorios segundo o SOLAS para circuitos que devem funcionar durante um incendio, pois o isolamento em po de magnesio resiste a temperaturas superiores a 1000 degC. Circuitos: alarmes de incendio, iluminacao de emergencia, bombas de incendio, comunicacoes de emergencia, quadros de emergencia." },
      { q: "Como calcular a seccao de cabo necessaria para alimentar um motor de 15 kW / 440V trifasico com cos phi = 0,85?", a: "1. Calcular corrente: I = P / (raiz(3) x U x cos phi) = 15000 / (1,732 x 440 x 0,85) = 23,1 A. 2. Aplicar fator de seguranca (x1,25 para motores): 28,9 A. 3. Escolher seccao em tabelas: para 29 A em montagem livre, 6 mm2 XLPE e adequado (~36A). Verificar queda de tensao (max 3-5%)." },
    ],
    bankQuestions: [
      { q: "Qual e a funcao principal do MSB (Main Switchboard)?", opts: ["Regular a velocidade do motor principal","Receber a energia de todos os grupos geradores e distribui-la a bordo","Medir apenas a temperatura dos motores","Armazenar a energia de emergencia"], correct: 1, expl: "O MSB e o centro de distribuicao eletrica do navio: recebe a energia de todos os grupos, distribui para os quadros secundarios, protege a rede e permite acoplar os grupos em paralelo." },
      { q: "Por que alguns navios grandes tem dois meios-jogos de barras separados por um acoplador (bus-tie)?", opts: ["Para duplicar a potencia total disponivel","Para poder dividir a rede em duas partes independentes e facilitar a manutencao sem corte total","Apenas por uma norma estetica","Para reduzir o numero de disjuntores necessarios"], correct: 1, expl: "Esta disposicao permite manter o fornecimento a uma metade da rede se a outra falhar, e facilita a manutencao de uma seccao sem cortar todo o navio." },
      { q: "Qual e a principal diferenca entre um ACB, um MCCB e um MCB?", opts: ["Nenhuma diferenca, sao sinonimos","Distinguem-se pelo calibre: ACB para altas potencias, MCCB para saidas secundarias, MCB para circuitos terminais","O MCB e sempre mais potente que o ACB","Apenas o ACB pode proteger contra curto-circuitos"], correct: 1, expl: "O ACB (alta potencia) protege as entradas de grupos e saidas principais, o MCCB as saidas secundarias, e o MCB, de calibre mais baixo, protege os circuitos terminais como a iluminacao." },
      { q: "Onde se situa geralmente o quadro de emergencia (ESB) e porque?", opts: ["Na casa de maquinas principal para facil acesso","Acima da linha de agua, fora da casa de maquinas principal, para permanecer operacional em caso de sinistro","No porao de carga","Nao existe uma localizacao particular"], correct: 1, expl: "O ESB situa-se fora da casa de maquinas principal e acima da linha de agua para permanecer operacional mesmo se essa area for afetada, alimentando os circuitos vitais SOLAS." },
      { q: "Por que se usam transformadores no sistema de distribuicao eletrica a bordo?", opts: ["Apenas para reduzir o peso dos cabos","Para adaptar a tensao as necessidades dos consumidores (ex: 440V para 220V)","Para aumentar a frequencia da corrente","Para substituir os disjuntores"], correct: 1, expl: "Os transformadores adaptam a tensao (440V para 220V para iluminacao, para 24V DC para automatismos) e podem isolar galvanicamente certos circuitos por seguranca." },
      { q: "Como se equilibra a potencia ativa (kW) entre varios grupos acoplados em paralelo?", opts: ["Ajustando o AVR de cada grupo","Ajustando o governor de cada grupo (admissao de combustivel)","Modificando a seccao dos cabos","Mudando a frequencia da rede"], correct: 1, expl: "A potencia ativa e ajustada atraves do governor de cada grupo (admissao de combustivel), enquanto a potencia reativa e ajustada atraves do AVR (corrente de excitacao)." },
      { q: "O que representa a seccao de um cabo eletrico e que parametro determina principalmente?", opts: ["O comprimento total do cabo","A area da seccao transversal do condutor, que determina a capacidade de transporte de corrente","A cor do isolamento","Apenas o numero de fios entrancados"], correct: 1, expl: "A seccao (em mm2) determina a ampacidade do cabo: quanto maior a seccao, maior a corrente que pode transportar, conforme o modo de instalacao e a temperatura ambiente." },
      { q: "Qual e o limite de queda de tensao geralmente admitido para os circuitos de iluminacao a bordo?", opts: ["10%","3%","25%","50%"], correct: 1, expl: "Os circuitos de iluminacao toleram uma queda de tensao maxima de cerca de 3%, contra 5% para os circuitos de potencia e 2% para os circuitos de controlo/sinalizacao." },
      { q: "Por que se usa um transformador de isolamento para certos circuitos sensiveis (enfermaria, casas de banho)?", opts: ["Para aumentar a tensao disponivel","Para isolar galvanicamente o circuito e impedir que uma corrente de defeito circule atraves do corpo humano","Para reduzir o custo de instalacao","Apenas para melhorar a iluminacao"], correct: 1, expl: "O isolamento galvanico do transformador de isolamento (relacao 1:1) impede que correntes de defeito circulem atraves do corpo humano em caso de contacto acidental." },
      { q: "Como funciona um rele de protecao diferencial num alternador?", opts: ["Mede apenas a temperatura do enrolamento","Compara a corrente entrante e sainte do enrolamento e dispara se um desequilibrio exceder um limiar","Regula automaticamente a tensao de saida","Limita a velocidade de rotacao do rotor"], correct: 1, expl: "Em funcionamento normal, a corrente entrante iguala a sainte. Um defeito interno cria um desequilibrio: quando essa corrente diferencial excede o limiar regulado, o rele dispara instantaneamente o disjuntor." },
      { q: "O que e a seletividade temporal das protecoes eletricas?", opts: ["Um atraso intencional adicionado aos disjuntores de nivel superior para deixar as protecoes a jusante disparar primeiro","Um disparo simultaneo de todos os disjuntores","Uma protecao que so funciona de dia","Um ajuste identico para todos os disjuntores"], correct: 0, expl: "A seletividade temporal adiciona um atraso crescente conforme o nivel hierarquico do disjuntor (o MCB dispara instantaneamente, o ACB espera por exemplo 0,1s), garantindo que apenas o disjuntor mais proximo do defeito atue." },
      { q: "Que tipo de cabo e obrigatorio segundo o SOLAS para os circuitos vitais (alarme de incendio, bomba de incendio, iluminacao de emergencia)?", opts: ["XLPE standard","MICC (Mineral Insulated Copper Conductor), resistente a mais de 1000 degC","Cabo blindado SWA apenas para protecao mecanica","Qualquer cabo serve"], correct: 1, expl: "O cabo MICC, com o seu isolamento de po de magnesio resistente a mais de 1000 degC, e obrigatorio para os circuitos que devem permanecer operacionais durante um incendio a bordo." },
      { q: "Para que serve o painel de sincronizacao no MSB?", opts: ["Apenas para medir a temperatura ambiente","Para permitir o acoplamento dos grupos em paralelo verificando tensao, frequencia e concordancia de fase","Para controlar a velocidade do navio","Para alimentar diretamente o ESB"], correct: 1, expl: "O painel de sincronizacao (sincronoscopio, lampadas de sincronizacao, seletor de grupo) permite verificar as tres condicoes de acoplamento antes de fechar o disjuntor de um grupo entrante." },
      { q: "Que verificacoes periodicas sao recomendadas num MSB segundo o Plano de Manutencao Preventiva?", opts: ["Nenhuma verificacao e necessaria se o quadro funcionar","Registo diario de parametros, teste mensal dos disjuntores, teste anual das protecoes e do isolamento","Apenas um controlo visual uma vez por ano","A substituicao sistematica do MSB a cada 5 anos"], correct: 1, expl: "As verificacoes diarias (parametros, indicadores), mensais (disparo de disjuntores, aperto de ligacoes) e anuais (teste de protecoes, isolamento) sao documentadas no Plano de Manutencao Preventiva." },
      { q: "Qual e o objetivo principal da seletividade das protecoes eletricas a bordo?", opts: ["Reduzir o custo dos disjuntores","Garantir que, em caso de defeito, apenas o disjuntor mais proximo do defeito dispare, preservando a alimentacao do resto da rede","Aumentar a potencia total disponivel","Simplificar a cablagem do quadro"], correct: 1, expl: "A seletividade garante que um defeito eletrico corta apenas o circuito afetado, sem privar o resto do navio de alimentacao, o que e critico para a seguranca (propulsao, navegacao, bombas de incendio)." },
    ],
    quiz: [
      { q: "Qual e o papel principal do MSB?", opts: ["Controlar a velocidade do motor principal", "Receber energia dos grupos e distribui-la a bordo", "Medir temperaturas dos motores", "Regular a pressao do vapor"], correct: 1, exp: "O MSB recebe energia de todos os grupos geradores e distribui-a pelo navio atraves de quadros secundarios e circuitos de distribuicao." },
      { q: "Que tipo de cabo e obrigatorio segundo o SOLAS para circuitos de alarme de incendio?", opts: ["XLPE padrao", "LSF sem halogenos", "MICC mineral", "SWA armado"], correct: 2, exp: "Os cabos MICC sao obrigatorios SOLAS para circuitos vitais que devem funcionar durante um incendio. O isolamento em po de magnesio resiste a mais de 1000 degC." },
      { q: "Para garantir a seletividade, que relacao deve existir entre os calibres?", opts: ["In(ACB) < In(MCCB) < In(MCB)", "In(MCB) < In(MCCB) < In(ACB)", "Todos iguais", "In(MCCB) = In(ACB)"], correct: 1, exp: "A seletividade exige In(MCB) < In(MCCB) < In(ACB). Em caso de defeito, o disjuntor de menor calibre (mais proximo do defeito) dispara primeiro." },
      { q: "O que e o ESB?", opts: ["O quadro de distribuicao secundario", "O quadro alimentado pelo gerador de emergencia para circuitos vitais SOLAS", "O painel de controlo do motor principal", "O painel de sincronizacao"], correct: 1, exp: "O ESB e alimentado pelo gerador de emergencia e fornece os circuitos vitais SOLAS em caso de falha do MSB." },
      { q: "Para um motor trifasico 440V / 10 kW / cos phi = 0,85, qual e aproximadamente a corrente nominal?", opts: ["7,7 A", "15,4 A", "30,8 A", "46,2 A"], correct: 1, exp: "I = P / (raiz(3) x U x cos phi) = 10000 / (1,732 x 440 x 0,85) = 15,4 A. Com fator de seguranca (x1,25): 19,3 A." },
    ],
  },
};

// ── SVG 1 - MSB ARCHITECTURE ────────────────────────────────
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
        <text x="140" y="24" fontSize="9" fill={C.amber} fontFamily="'Cinzel',serif" textAnchor="middle">MSB - MAIN SWITCHBOARD</text>
        {/* Incoming */}
        <rect x="20" y="30" width="55" height="50" rx="4" fill={C.warn} opacity={0.14} stroke={C.warn} strokeWidth="1" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="incoming"?null:"incoming")}/>
        <text x="47" y="52" fontSize="7" fill={C.warn} fontFamily="Courier New" textAnchor="middle">GEN 1</text>
        <text x="47" y="63" fontSize="7" fill={C.warn} fontFamily="Courier New" textAnchor="middle">GEN 2</text>
        <text x="47" y="74" fontSize="6" fill={C.warn} fontFamily="Courier New" textAnchor="middle">INCOMING</text>
        {/* Busbar */}
        <rect x="20" y="90" width="240" height="12" rx="3" fill={C.amber} opacity={0.28} stroke={C.amber} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="busbar"?null:"busbar")}/>
        <text x="140" y="100" fontSize="7" fill={C.amber} fontFamily="Courier New" textAnchor="middle">L1 - L2 - L3 BUSBARS</text>
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
        <text x="204" y="152" fontSize="6" fill={C.red} fontFamily="Courier New" textAnchor="middle">ESB - SOLAS</text>
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

// ── SVG 2 - DISTRIBUTION HIERARCHY ──────────────────────────
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
        <div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{dist[sel]?.name} - {dist[sel]?.voltage}</div>
        {dist[sel]?.desc}
      </div>
    </div>
  );
}

// ── SVG 3 - CABLES ───────────────────────────────────────────
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
        <text x="80" y="152" fontSize="7" fill={C.dim} fontFamily="Courier New" textAnchor="middle">90 degC - Flexible</text>
      </g>
    ),
    micc: (
      <g>
        <circle cx="80" cy="80" r="46" fill={C.red} opacity={0.12} stroke={C.red} strokeWidth="2.5"/>
        <circle cx="80" cy="80" r="30" fill="rgba(255,255,255,0.06)" stroke={C.dim} strokeWidth="1"/>
        <text x="80" y="77" fontSize="7" fill={C.dim} fontFamily="Courier New" textAnchor="middle">MgO</text>
        <text x="80" y="88" fontSize="6" fill={C.dim} fontFamily="Courier New" textAnchor="middle">POWDER</text>
        <circle cx="80" cy="80" r="12" fill={C.warn} opacity={0.7}/>
        <text x="80" y="142" fontSize="8" fill={C.red} fontFamily="Courier New" textAnchor="middle">MICC - Fire resistant</text>
        <text x="80" y="152" fontSize="7" fill={C.dim} fontFamily="Courier New" textAnchor="middle">&gt;1000 degC - SOLAS</text>
      </g>
    ),
    lsf: (
      <g>
        <circle cx="80" cy="80" r="46" fill={C.green} opacity={0.1} stroke={C.green} strokeWidth="2"/>
        <circle cx="80" cy="80" r="32" fill={C.navy3} stroke={C.green} strokeWidth="1.5"/>
        <circle cx="80" cy="80" r="20" fill={C.amber} opacity={0.22} stroke={C.amber} strokeWidth="1"/>
        <circle cx="80" cy="80" r="10" fill={C.warn} opacity={0.5}/>
        <text x="80" y="142" fontSize="7" fill={C.green} fontFamily="Courier New" textAnchor="middle">LSF - Low Smoke</text>
        <text x="80" y="152" fontSize="6" fill={C.dim} fontFamily="Courier New" textAnchor="middle">Halogen-free sheath</text>
      </g>
    ),
    armored: (
      <g>
        <circle cx="80" cy="80" r="46" fill={C.dim} opacity={0.1} stroke={C.dim} strokeWidth="3"/>
        {Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return <line key={i} x1={80+38*Math.cos(a)} y1={80+38*Math.sin(a)} x2={80+44*Math.cos(a)} y2={80+44*Math.sin(a)} stroke={C.dim} strokeWidth="2" opacity={0.6}/>;}) }
        <circle cx="80" cy="80" r="30" fill={C.navy3} stroke={C.dim} strokeWidth="1"/>
        <circle cx="80" cy="80" r="12" fill={C.warn} opacity={0.5}/>
        <text x="80" y="142" fontSize="7" fill={C.dim} fontFamily="Courier New" textAnchor="middle">SWA - Steel Wire Armoured</text>
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

// ── SVG 4 - SELECTIVITY ──────────────────────────────────────
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
// LessonE2_L5 - Tableaux electriques & Distribution | PART 2

export default function LessonE2_L5({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t = T[lang] || T.fr;
  const moduleFull=lang==="fr"?"Module E2 — Auxiliaires & Électricité":lang==="en"?"Module E2 — Auxiliary Systems & Electricity":lang==="es"?"Módulo E2 — Auxiliares y Electricidad":"Módulo E2 — Auxiliares e Eletricidade";
  const lessonOf=lang==="fr"?"Leçon 5/7":lang==="en"?"Lesson 5/7":lang==="es"?"Lección 5/7":"Lição 5/7";
  const badgeText=lang==="fr"?`🔌 ${moduleFull} · Leçon 5/7 · ⭐ Premium · 200 XP`:lang==="en"?`🔌 ${moduleFull} · Lesson 5/7 · ⭐ Premium · 200 XP`:lang==="es"?`🔌 ${moduleFull} · Lección 5/7 · ⭐ Premium · 200 XP`:`🔌 ${moduleFull} · Lição 5/7 · ⭐ Premium · 200 XP`;
  const [phase, setPhase] = useState<"content"|"quiz"|"done">("content");
  const [exShown, setExShown] = useState<boolean[]>([false,false,false]);
  const [exInputs, setExInputs] = useState<string[]>(["","",""]);
  const [accOpen, setAccOpen] = useState(false);
  const [bankIdx, setBankIdx] = useState<number|null>(null);
  const [bankCur, setBankCur] = useState(0);
  const [bankSel, setBankSel] = useState<number|null>(null);
  const [bankScore, setBankScore] = useState(0);
  const [bankDone, setBankDone] = useState(false);
  const [qCur, setQCur] = useState(0);
  const [qSel, setQSel] = useState<number|null>(null);
  const [qConf, setQConf] = useState(false);
  const [qScore, setQScore] = useState(0);

  const quiz = t.quiz;
  const bank = t.bankQuestions;
  const [shuffledQuiz]=useState(()=>quiz.map(shuffleQuestionOptions));
  const [shuffledBank]=useState(()=>bank.map(shuffleQuestionOptions));
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

  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankSel(null);setBankScore(0);setBankDone(false);};
  const pickBank=(i:number)=>{if(bankSel!==null)return;setBankSel(i);if(i===shuffledBank[bankCur].correct)setBankScore(s=>s+1);};
  const bankNext=()=>{if(bankCur+1>=bank.length){setBankDone(true);return;}setBankCur(c=>c+1);setBankSel(null);};
  const handleQConf=()=>{if(qSel===null)return;setQConf(true);if(qSel===shuffledQuiz[qCur].correct)setQScore(s=>s+1);};
  const handleQNext=()=>{if(qCur+1>=quiz.length){setPhase("done");if(onComplete)onComplete(xpFinal);return;}setQCur(c=>c+1);setQSel(null);setQConf(false);};

  const header=(sub:string)=>(
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.amber}33`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
        <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar"}</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:10,color:C.amber,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🔌 {moduleFull}{sub?" · "+sub:""}</div>
          <div style={{fontSize:11,color:"rgba(240,244,255,0.45)"}}>{lessonOf}</div>
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
      <div style={{padding:"20px 16px 0"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.amber}22`,border:`1px solid ${C.amber}55`,fontSize:11,color:C.amber,fontWeight:700}}>{badgeText}</div>
          <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 4px"}}>{t.lessonTitle}</h1>
        </div>
      </div>
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
                  <input type="text" placeholder="?" value={exInputs[i]} onChange={e=>setExInputs(p=>p.map((v,j)=>j===i?e.target.value:v))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",color:C.white,fontSize:12,fontFamily:"Courier New",marginBottom:10,boxSizing:"border-box"}}/>
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
                <div style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:`${C.navy2}cc`,border:`1px solid ${C.blue}22`}}>{shuffledBank[bankCur].q}</div>
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
                  {shuffledBank[bankCur].opts.map((opt:string,oi:number)=>{
                    let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.12)",col="rgba(240,244,255,0.6)";
                    if(bankSel!==null){
                      if(oi===shuffledBank[bankCur].correct){bg="rgba(76,175,80,0.15)";bd=C.green;col=C.green;}
                      else if(oi===bankSel){bg="rgba(239,83,80,0.15)";bd=C.red;col=C.red;}
                    }
                    return(<button key={oi} onClick={()=>pickBank(oi)} disabled={bankSel!==null} style={{textAlign:"left",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${bd}`,background:bg,color:col,fontSize:12,fontFamily:"Courier New",cursor:bankSel===null?"pointer":"default",lineHeight:1.4}}>{opt}</button>);
                  })}
                </div>
                {bankSel!==null&&(<div><div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${bankSel===shuffledBank[bankCur].correct?C.green:C.red}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{shuffledBank[bankCur].expl}</div><button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,${C.amber},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?t.bankTrophy:t.bankNext}</button></div>)}
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

        <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.amber},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy}}>🔌 {t.quizCTA}</button>
      </div>
    </div>
  );

  // ══ QUIZ ═════════════════════════════════════════════════════
  if(phase==="quiz"){
    const q=shuffledQuiz[qCur];
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
