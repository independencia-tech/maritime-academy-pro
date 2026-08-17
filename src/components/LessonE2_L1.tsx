// LessonE2_L1 - Pompes & Systemes Fluides | PART 1
import { useState } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  cyan:  "#00e5ff",
  blue:  "#2979ff",
  teal:  "#00bcd4",
  green: "#4caf50",
  warn:  "#ff6f00",
  red:   "#ef5350",
  navy:  "#060e1a",
  navy2: "#0a1628",
  navy3: "#0d1f3c",
  dim:   "rgba(240,244,255,0.55)",
  text:  "#e0e8ff",
  white: "#f0f4ff",
};

const T: any = {
  fr: {
    moduleLabel: "MACHINE - AUXILIAIRES",
    lessonTitle: "Pompes & Systemes Fluides",
    lessonSub:   "Centrifuges, volumetriques, hydraulique, NPSH",
    intro: "Les pompes sont omnipresentes a bord : ballast, carburant, eau de mer, eau douce, huile, cargaison. Comprendre leurs types, leur courbe caracteristique et les systemes hydrauliques associes est fondamental pour tout mecanicien marin.",
    s1title: "Types de pompes marines",
    s2title: "Courbe caracteristique et point de fonctionnement",
    s3title: "Composants d'un systeme hydraulique",
    s4title: "Defauts courants et depannage",
    s1hint:  "Selectionnez un type de pompe",
    s3hint:  "Tapez un composant pour sa description",
    s4hint:  "Selectionnez un defaut",
    exerciseTitle: "Exercices pratiques",
    showAnswer: "Voir la correction",
    hideAnswer: "Masquer",
    accidentTitle: "CAS REEL : Naufrage par voie d'eau - FV Opportune (2024, rapport MAIB)",
    accidentBody: "En 2024, le chalutier de peche Opportune a coule au large des cotes britanniques suite a une inondation rapide et incontrolable de la salle des machines. L'enquete du MAIB a etabli que la cause etait la rupture d'une tuyauterie d'eau de mer corrodee, un tube galvanise a chaud dont la duree de vie etait depassee. L'eau a envahi la salle des machines plus vite que les pompes de cale ne pouvaient l'evacuer. Les 8 membres d'equipage ont ete secourus indemnes par radeaux de sauvetage et helicopteres des garde-cotes, mais le navire n'a pas pu etre recupere et a coule. Le MAIB a rappele que l'environnement marin est tres corrosif et que la tuyauterie galvanisee a une duree de vie limitee, necessitant un plan de remplacement sur la duree d'exploitation du navire (environ 20 ans). En moyenne, plus de 7 navires de peche sont perdus chaque annee a cause d'inondations.",
    summaryTitle: "Points essentiels",
    summary: [
      "Les pompes centrifuges dominent a bord : simples, robustes, debit variable selon pression",
      "Les pompes volumetriques (engrenages, pistons) sont utilisees pour l'huile et le carburant HFO",
      "La cavitation detruit les roues des pompes - maintenir NPSHd > NPSHr + 0,5 m de marge",
      "Un systeme hydraulique comprend : pompe, filtre, distributeur, verin/moteur, reservoir",
      "La loi de similarite : P proportionne a n3 - les variateurs de frequence economisent jusqu'a 50% d'energie",
      "Inspecter les filtres d'aspiration apres chaque transit en eaux peu profondes ou sedimentaires",
    ],
    quizCTA: "COMMENCER LE QUIZ",
    bankStart: "COMMENCER =>",
    bankNext: "Question suivante =>",
    bankTrophy: "Bravo ! Banque terminee",
    bankScore: "Score banque",
    pumpTypes: {
      centrifugal: { name: "Pompe centrifuge",  desc: "La plus repandue a bord. Une roue (impeller) tourne et communique de l'energie cinetique au fluide par force centrifuge. Le fluide est ensuite converti en pression dans la volute. Avantages : simple, robuste, debit eleve, pas d'amorcage automatique. Utilisations : ballast, eau de mer, refroidissement, eau douce." },
      gear:         { name: "Pompe a engrenages", desc: "Deux engrenages en prise deplacent le fluide dans les cavites entre les dents. Debit proportionnel a la vitesse. Avantages : auto-amorcante, haute pression, adaptee aux fluides visqueux. Utilisations : huile de lubrification, fuel oil (HFO), huile hydraulique." },
      screw:        { name: "Pompe a vis",        desc: "Deux ou trois vis helicoidales engrenem et deplacent le fluide axialement. Tres silencieuse et reguliere. Utilisee pour le HFO visqueux, la cargaison sur tankers. Resiste bien aux fluides charges en particules." },
      piston:       { name: "Pompe a piston",     desc: "Un ou plusieurs pistons alternatifs deplacent le fluide. Tres haute pression possible. Utilisee pour les systemes hydrauliques haute pression (gouvernail, treuils, stabilisateurs). Debit pulse - necessite un accumulateur pour lisser." },
      diaphragm:    { name: "Pompe a membrane",   desc: "Une membrane flexible remplace le piston. Permet de pomper des fluides corrosifs ou charges sans contact avec les pieces mecaniques. Utilisee pour les eaux usees, produits chimiques, bilge." },
    },
    hydraulicComponents: {
      reservoir:   { name: "Reservoir hydraulique", desc: "Stocke l'huile hydraulique, permet la degazeification et le refroidissement. Equipe d'un filtre de remplissage, d'un indicateur de niveau, d'un thermometre et parfois d'un echangeur de chaleur." },
      pump_h:      { name: "Pompe hydraulique",     desc: "Genere le debit et la pression. Generalement a pistons axiaux (haute pression) ou a engrenages (basse/moyenne pression). Entrainee par un moteur electrique ou le moteur principal." },
      filter:      { name: "Filtre hydraulique",    desc: "Elimine les particules du fluide hydraulique. Filtre en aspiration (grossier), filtre haute pression en refoulement (fin - 10 a 25 microns). Le colmatage est indique par un pressostat differentiel." },
      valve:       { name: "Distributeur",          desc: "Dirige le fluide vers les actionneurs (verins, moteurs). Peut etre actionne manuellement, electriquement (solenoide) ou hydrauliquement. Determine le sens de mouvement des actionneurs." },
      relief:      { name: "Soupape de surete",     desc: "Limite la pression maximale du circuit. S'ouvre quand la pression depasse le seuil regle et renvoie l'huile au reservoir. Protection obligatoire contre la surpression." },
      accumulator: { name: "Accumulateur",          desc: "Stocke de l'energie hydraulique (huile sous pression + gaz azote). Permet : de lisser les pulsations, de fournir un debit instantane important, de maintenir la pression en cas de coupure de pompe (securite)." },
    },
    faults: {
      cavitation: { name: "Cavitation",            cause: "Pression d'aspiration trop basse => formation de bulles de vapeur qui implosent sur la roue. Bruit caracteristique (gravier dans la pompe). Destruction rapide de la roue.", remedy: "Verifier le filtre d'aspiration (colmate), reduire la hauteur d'aspiration, verifier les fuites d'air sur la tuyauterie d'aspiration, augmenter le NPSH disponible." },
      noflow:     { name: "Absence de debit",       cause: "Pompe non amorcee (centrifuge), sens de rotation inverse, vanne d'aspiration fermee, filtre colmate, roue obstruee ou usee.", remedy: "Amorcer la pompe, verifier le sens de rotation, ouvrir les vannes, nettoyer le filtre, inspecter la roue." },
      overheat:   { name: "Echauffement pompe",     cause: "Manque de liquide (pompe a sec), friction excessive (garniture mecanique serree), debit nul avec pompe en marche (refoulement ferme), mauvais alignement.", remedy: "Arreter immediatement si a sec, verifier la garniture mecanique, ouvrir legerement le refoulement (minimum de debit requis), verifier l'alignement moteur-pompe." },
      vibration:  { name: "Vibrations excessives",  cause: "Desequilibre de la roue (corps etranger), cavitation, usure des roulements, mauvais alignement moteur-pompe, resonance tuyauterie.", remedy: "Inspecter et nettoyer la roue, eliminer la cavitation, remplacer les roulements, realigner la pompe, verifier les supports de tuyauterie." },
    },
    exercises: [
      { q: "Expliquez la difference entre une pompe centrifuge et une pompe volumetrique. Dans quels cas prefere-t-on chaque type a bord ?", a: "Pompe centrifuge : communique de l'energie cinetique au fluide par rotation d'une roue. Debit variable selon la pression du reseau. Non auto-amorcante. Avantages : grande capacite, regularite, pas de pulsations, robustesse. Utilisee pour les grands debits a pression moderee : ballast, eau de mer, refroidissement. Pompe volumetrique : deplace un volume fixe par cycle. Debit constant quelle que soit la pression. Auto-amorcante. Avantages : haute pression, fluides visqueux. Utilisee pour HFO, huile de lubrification, systemes hydrauliques." },
      { q: "Qu'est-ce que la cavitation et quelles sont ses consequences a long terme sur une pompe centrifuge ?", a: "La cavitation se produit quand la pression en aspiration chute en dessous de la pression de vapeur saturante du liquide. Des bulles de vapeur se forment dans le liquide. Quand ces bulles atteignent une zone de haute pression (roue), elles implosent violemment. Consequences a long terme : erosion de la roue (crateres en surface), deterioration de la volute, usure acceleree des roulements, reduction progressive du debit et des performances, bruit caracteristique ressemblant a du gravier dans la pompe. La cavitation peut detruire une roue en quelques heures. Prevention : maintenir NPSHd > NPSHr." },
      { q: "Un systeme de pompage ballast presente un debit anormalement faible. Decrivez votre procedure de diagnostic.", a: "1. Verification des parametres : lire la pression d'aspiration (manometre) et de refoulement. Une pression d'aspiration trop basse indique cavitation ou filtre colmate. 2. Verification visuelle : etat de la vanne d'aspiration (ouverte ?), etat du filtre d'aspiration (indicateur colmatage ?), fuites d'air sur la tuyauterie d'aspiration. 3. Controle de la pompe : bruit anormal (cavitation = bruit de gravier), vibrations, temperature paliers. 4. Verification du moteur : sens de rotation correct, amperage moteur. 5. Nettoyage du filtre d'aspiration si colmate. 6. Si le probleme persiste : inspection de la roue (usure, obstruction), controle de la garniture mecanique." },
    ],
    bankQuestions: [
      { q: "Que se passe-t-il si le NPSH disponible (NPSHd) devient inferieur au NPSH requis (NPSHr) ?", opts: ["La pompe s'arrete automatiquement par securite","La pompe cavite : formation et implosion de bulles de vapeur","Le debit augmente au-dela de la normale","La pompe s'auto-amorce"], correct: 1, expl: "Si NPSHd < NPSHr, la pression en aspiration descend sous la pression de vapeur saturante : des bulles de vapeur se forment et implosent violemment sur la roue (cavitation), pouvant detruire la pompe en quelques heures. Regle de securite : NPSHd > NPSHr + 0,5 a 1 m de marge." },
      { q: "Quelle est la principale difference entre une pompe centrifuge et une pompe volumetrique concernant l'amorcage ?", opts: ["La centrifuge est auto-amorcante, pas la volumetrique","La volumetrique est auto-amorcante (peut aspirer un melange air-liquide), pas la centrifuge","Les deux sont auto-amorcantes","Aucune des deux n'est auto-amorcante"], correct: 1, expl: "La pompe centrifuge ne peut pas aspirer d'air et doit etre amorcee (remplie de liquide) avant demarrage. La pompe volumetrique (engrenages, vis, pistons) peut aspirer un melange air-liquide et se vider elle-meme." },
      { q: "Quel est le role principal d'un accumulateur hydraulique ?", opts: ["Filtrer les particules du fluide hydraulique","Absorber les pulsations et maintenir la pression en cas d'arret de la pompe","Limiter la pression maximale du circuit","Diriger le fluide vers les actionneurs"], correct: 1, expl: "L'accumulateur stocke de l'huile sous pression face a un gaz (azote). Il absorbe les pulsations de pression, fournit un debit instantane important et maintient la pression en cas d'arret de la pompe (securite)." },
      { q: "Quelle garniture d'etancheite de pompe centrifuge tolere un leger suintement normal ?", opts: ["La garniture mecanique","Le presse-etoupe (garniture a tresse)","Le joint magnetique","Le joint a levres"], correct: 1, expl: "Le presse-etoupe, le plus ancien, necessite un leger suintement normal pour assurer la lubrification. La garniture mecanique, plus fiable, ne doit normalement presenter aucune fuite." },
      { q: "Selon la loi de similarite des pompes, si on double la vitesse d'une pompe centrifuge, la puissance absorbee est multipliee par :", opts: ["2","4","8","16"], correct: 2, expl: "P2/P1 = (n2/n1) au cube. En doublant la vitesse, la puissance est multipliee par 2 au cube = 8. C'est pourquoi les variateurs de frequence permettent d'economiser beaucoup d'energie a faible vitesse." },
      { q: "Qu'est-ce que le point de fonctionnement d'une pompe ?", opts: ["Le debit maximal possible de la pompe","L'intersection de la courbe de la pompe et de la courbe du reseau","La pression de refoulement maximale","Le point ou le NPSH est nul"], correct: 1, expl: "Le point de fonctionnement est l'intersection entre la courbe caracteristique de la pompe (H diminue quand Q augmente) et la courbe du reseau (H augmente avec Q au carre)." },
      { q: "Pourquoi les pompes de ballast sont-elles generalement des pompes centrifuges ?", opts: ["Car elles sont auto-amorcantes","Car elles offrent un grand debit a pression moderee pour un fluide peu visqueux","Car elles sont les moins cheres du marche","Car elles necessitent moins d'entretien"], correct: 1, expl: "L'eau de mer de ballastage necessite de grands debits (500 a 2000 m3/h) a pression moderee : la pompe centrifuge, simple et robuste, est ideale pour ce profil." },
      { q: "Pourquoi une pompe a vis est-elle preferee pour le fuel oil lourd (HFO) ?", opts: ["Elle est moins chere qu'une centrifuge","Elle gere bien les fluides tres visqueux avec un debit regulier et sans turbulence","Elle ne necessite pas de chauffage du fuel","Elle fonctionne uniquement a froid"], correct: 1, expl: "Le HFO est extremement visqueux (jusqu'a 700 cSt) et doit etre chauffe a 120-150 degC. La pompe a vis gere tres bien ce type de fluide, avec un debit regulier et sans degradation par turbulence." },
      { q: "Quel signe indique une garniture mecanique defectueuse sur une pompe ?", opts: ["Un leger suintement de quelques gouttes par heure","Une fuite en filet continu et un bruit de grincement","Une temperature d'huile stable","Une pression de refoulement normale"], correct: 1, expl: "Une garniture mecanique en bon etat ne doit presenter aucune fuite notable. Une fuite continue, un grincement et une elevation de temperature au joint indiquent une usure necessitant un remplacement complet." },
      { q: "Quel est l'avantage principal d'une pompe submersible a bord ?", opts: ["Un debit plus eleve qu'une pompe centrifuge classique","Aucun probleme d'amorcage car toujours immergee","Une maintenance plus simple qu'une pompe standard","Un cout d'achat tres reduit"], correct: 1, expl: "Etant toujours immergee, la pompe submersible n'a jamais de probleme d'amorcage. Tres utilisee pour sentines et puisards, mais sa maintenance est plus difficile (extraction necessaire)." },
      { q: "Comment fonctionne un ejecteur (jet pump) ?", opts: ["Grace a une roue tournante a haute vitesse","Grace a l'effet Venturi, sans aucune piece mobile","Grace a un piston alternatif","Grace a deux engrenages en prise"], correct: 1, expl: "Un ejecteur utilise l'effet Venturi : un fluide moteur injecte a grande vitesse cree une depression qui aspire le fluide a pomper. Sans piece mobile, il offre une fiabilite maximale." },
      { q: "Dans le PMS (Planned Maintenance System), que doit-on verifier hebdomadairement sur les pompes de ballast ?", opts: ["Le remplacement complet de la roue","Le niveau d'huile des paliers et les fuites visuelles","L'alignement moteur-pompe","La revision complete de la garniture"], correct: 1, expl: "Le controle hebdomadaire porte sur le niveau d'huile des paliers et les fuites visibles. Les controles plus lourds (roulements, roue, alignement) sont mensuels ou annuels." },
      { q: "Qu'est-ce que le coup de belier et comment le prevenir ?", opts: ["Une usure lente des tuyauteries, prevenue par la peinture anticorrosion","Une surpression brutale par arret soudain du flux, prevenue par une fermeture lente des vannes","Une baisse de pression progressive, prevenue par un filtre plus fin","Une vibration constante, prevenue par un meilleur alignement"], correct: 1, expl: "Le coup de belier est une surpression brutale (5 a 10 fois la pression normale) causee par l'arret soudain du flux. Prevention : fermeture lente des vannes, soupapes de surpression, reservoirs anti-belier." },
      { q: "Quelle est la teneur maximale en hydrocarbures autorisee pour un rejet d'eau de cale en mer selon MARPOL Annexe I ?", opts: ["5 ppm","15 ppm","50 ppm","100 ppm"], correct: 1, expl: "MARPOL Annexe I fixe la limite a 15 ppm d'hydrocarbures pour tout rejet en mer, interdit par ailleurs a moins de 12 milles des cotes. Un OCM est obligatoire sur tout navire de plus de 400 TJB." },
      { q: "Quelle formule permet de calculer la puissance hydraulique absorbee par une pompe centrifuge ?", opts: ["P = rho x g x Q x H","P = rho x g x Q x H / eta","P = Q x H uniquement","P = eta / (rho x g)"], correct: 1, expl: "La puissance absorbee est P = (rho x g x Q x H) / eta, avec rho la masse volumique, g l'acceleration de la pesanteur, Q le debit, H la hauteur manometrique et eta le rendement de la pompe." },
    ],
    quiz: [
      { q: "Quel type de pompe est le plus repandu a bord pour le ballastage ?", opts: ["Pompe a pistons", "Pompe centrifuge", "Pompe a engrenages", "Pompe a vis"], correct: 1, exp: "La pompe centrifuge est la plus repandue a bord pour le ballastage car elle offre un debit eleve a pression moderee, est robuste et simple. Elle est ideale pour les grands debits d'eau de mer (500-2000 m3/h)." },
      { q: "La cavitation se produit quand :", opts: ["La pression de refoulement est trop elevee", "La pression d'aspiration descend sous la pression de vapeur du liquide", "La vitesse de rotation est trop elevee", "Le debit est trop important"], correct: 1, exp: "La cavitation se produit quand la pression absolue en aspiration chute sous la pression de vapeur saturante du liquide. Des bulles de vapeur se forment et implosent violemment sur la roue, causant erosion et vibrations." },
      { q: "Quel composant d'un circuit hydraulique limite la pression maximale ?", opts: ["Le filtre hydraulique", "L'accumulateur", "La soupape de surete", "Le distributeur"], correct: 2, exp: "La soupape de surete (relief valve) limite la pression maximale du circuit hydraulique en s'ouvrant quand la pression depasse le seuil regle et en renvoyant l'huile au reservoir. C'est une protection obligatoire." },
      { q: "Selon les lois de similarite des pompes, si on double la vitesse d'une pompe centrifuge, la puissance consommee est multipliee par :", opts: ["2", "4", "8", "16"], correct: 2, exp: "Selon la loi de similarite : P2/P1 = (n2/n1)3. Si n2 = 2 x n1 : P2 = P1 x 8. La puissance est proportionnelle au cube de la vitesse. C'est pourquoi les variateurs de frequence permettent d'economiser beaucoup d'energie." },
      { q: "Une pompe a engrenages est preferee pour pomper du fuel oil lourd (HFO) car :", opts: ["Elle a un debit plus eleve qu'une centrifuge", "Elle est auto-amorcante et adaptee aux fluides visqueux", "Elle coute moins cher", "Elle ne necessite pas d'entretien"], correct: 1, exp: "La pompe a engrenages est auto-amorcante et gere tres bien les fluides visqueux comme le HFO. Elle maintient un debit constant quelle que soit la viscosite du fluide, contrairement a la pompe centrifuge dont les performances chutent avec les fluides visqueux." },
    ],
  },

  en: {
    moduleLabel: "ENGINE - AUXILIARIES",
    lessonTitle: "Pumps & Fluid Systems",
    lessonSub:   "Centrifugal, positive displacement, hydraulics, NPSH",
    intro: "Pumps are everywhere on board: ballast, fuel, seawater, fresh water, oil, cargo. Understanding their types, characteristic curve and associated hydraulic systems is fundamental for any marine engineer.",
    s1title: "Marine Pump Types",
    s2title: "Characteristic Curve and Operating Point",
    s3title: "Hydraulic System Components",
    s4title: "Common Faults and Troubleshooting",
    s1hint:  "Select a pump type",
    s3hint:  "Tap a component for its description",
    s4hint:  "Select a fault",
    exerciseTitle: "Practice Exercises",
    showAnswer: "Show answer",
    hideAnswer: "Hide",
    accidentTitle: "REAL CASE: Flooding and loss - FV Opportune (2024, MAIB report)",
    accidentBody: "In 2024, the fishing trawler Opportune sank off the UK coast following a rapid and uncontrollable engine room flood. The MAIB investigation found the cause was the failure of corroded seawater pipework, hot-dip galvanised piping that had exceeded its service life. Water entered the engine room faster than the bilge pumps could remove it. All 8 crew members were rescued uninjured via liferafts and coastguard helicopters, but the vessel could not be recovered and was lost. The MAIB noted that the marine environment is highly corrosive and that galvanised pipework has a limited service life, requiring a replacement plan over the vessel's operating life (around 20 years). On average, more than 7 fishing vessels are lost every year due to flooding.",
    summaryTitle: "Key Points",
    summary: [
      "Centrifugal pumps dominate on board: simple, robust, variable flow depending on pressure",
      "Positive displacement pumps (gear, piston) are used for oil and HFO fuel",
      "Cavitation destroys pump impellers - maintain NPSHa > NPSHr + 0.5 m safety margin",
      "A hydraulic system comprises: pump, filter, directional valve, actuator, reservoir",
      "Similarity law: Power proportional to n3 - VFDs save up to 50% energy",
      "Inspect suction filters after every transit in shallow or sediment-laden waters",
    ],
    quizCTA: "START QUIZ",
    bankStart: "START =>",
    bankNext: "Next question =>",
    bankTrophy: "Well done! Bank completed",
    bankScore: "Bank score",
    pumpTypes: {
      centrifugal: { name: "Centrifugal pump",  desc: "Most common on board. An impeller rotates and imparts kinetic energy to the fluid by centrifugal force. The fluid is then converted to pressure in the volute. Advantages: simple, robust, high flow, not self-priming. Uses: ballast, seawater, cooling, fresh water." },
      gear:         { name: "Gear pump",          desc: "Two meshing gears displace fluid in the cavities between the teeth. Flow proportional to speed. Advantages: self-priming, high pressure, suitable for viscous fluids. Uses: lube oil, fuel oil (HFO), hydraulic oil." },
      screw:        { name: "Screw pump",         desc: "Two or three helical screws mesh and displace fluid axially. Very quiet and smooth. Used for viscous HFO, cargo on tankers. Handles particle-laden fluids well." },
      piston:       { name: "Piston pump",        desc: "One or more reciprocating pistons displace fluid. Very high pressure possible. Used for high-pressure hydraulic systems (rudder, winches, stabilisers). Pulsed flow - requires accumulator to smooth." },
      diaphragm:    { name: "Diaphragm pump",     desc: "A flexible diaphragm replaces the piston. Allows pumping of corrosive or laden fluids without contact with mechanical parts. Used for bilge water, chemicals, sewage." },
    },
    hydraulicComponents: {
      reservoir:   { name: "Hydraulic reservoir", desc: "Stores hydraulic oil, allows degassing and cooling. Equipped with a fill filter, level indicator, thermometer and sometimes a heat exchanger." },
      pump_h:      { name: "Hydraulic pump",      desc: "Generates flow and pressure. Generally axial piston (high pressure) or gear (low/medium pressure). Driven by an electric motor or main engine." },
      filter:      { name: "Hydraulic filter",    desc: "Removes particles from hydraulic fluid. Suction filter (coarse), high-pressure delivery filter (fine - 10 to 25 microns). Clogging indicated by a differential pressure switch." },
      valve:       { name: "Directional valve",   desc: "Directs fluid to actuators (cylinders, motors). Can be operated manually, electrically (solenoid) or hydraulically. Determines actuator direction of movement." },
      relief:      { name: "Relief valve",        desc: "Limits maximum circuit pressure. Opens when pressure exceeds set threshold and returns oil to reservoir. Mandatory protection against overpressure." },
      accumulator: { name: "Accumulator",         desc: "Stores hydraulic energy (oil under pressure + nitrogen gas). Allows: smoothing pulsations, providing instant high flow, maintaining pressure on pump shutdown (safety)." },
    },
    faults: {
      cavitation: { name: "Cavitation",           cause: "Suction pressure too low => vapour bubbles form and implode on the impeller. Characteristic noise (gravel in pump). Rapid impeller destruction.", remedy: "Check suction filter (clogged), reduce suction height, check for air leaks on suction piping, increase available NPSH." },
      noflow:     { name: "No flow",              cause: "Pump not primed (centrifugal), reversed rotation, suction valve closed, clogged filter, blocked or worn impeller.", remedy: "Prime the pump, check rotation direction, open valves, clean filter, inspect impeller." },
      overheat:   { name: "Pump overheating",     cause: "Lack of liquid (dry running), excessive friction (tight mechanical seal), zero flow with pump running (delivery closed), misalignment.", remedy: "Stop immediately if dry running, check mechanical seal, slightly open delivery (minimum flow required), check motor-pump alignment." },
      vibration:  { name: "Excessive vibration",  cause: "Impeller imbalance (foreign body), cavitation, bearing wear, motor-pump misalignment, piping resonance.", remedy: "Inspect and clean impeller, eliminate cavitation, replace bearings, realign pump, check piping supports." },
    },
    exercises: [
      { q: "Explain the difference between a centrifugal pump and a positive displacement pump. When is each preferred on board?", a: "Centrifugal pump: imparts kinetic energy to fluid via rotating impeller. Variable flow depending on network pressure. Not self-priming. Advantages: high capacity, smooth flow, no pulsations, robust. Used for high flows at moderate pressure: ballast, seawater, cooling. Positive displacement pump: displaces a fixed volume per cycle. Constant flow regardless of pressure. Self-priming. Advantages: high pressure, viscous fluids. Used for HFO, lube oil, hydraulic systems. On board, centrifugal for high flows, positive displacement for viscous fluids and high pressures." },
      { q: "What is cavitation and what are its long-term consequences on a centrifugal pump?", a: "Cavitation occurs when suction pressure drops below the liquid's saturated vapour pressure. Vapour bubbles form in the liquid. When these bubbles reach a high-pressure zone (impeller), they implode violently releasing considerable energy. Long-term consequences: impeller erosion (surface craters), volute deterioration, accelerated bearing wear (vibration), progressive flow and performance reduction, characteristic noise resembling gravel in the pump. Cavitation can destroy an impeller in hours. Prevention: maintain available NPSH > required NPSH." },
      { q: "A ballast pumping system shows abnormally low flow. Describe your diagnostic procedure.", a: "1. Parameter check: read suction and delivery pressure (gauges). Too low suction pressure indicates cavitation or clogged filter. 2. Visual check: suction valve state (open?), suction filter state (clog indicator?), air leaks on suction piping. 3. Pump check: abnormal noise (cavitation = gravel sound), vibrations, bearing temperature. 4. Motor check: correct rotation direction, motor amperage. 5. Clean suction filter if clogged. 6. If problem persists: impeller inspection (wear, obstruction), mechanical seal check." },
    ],
    bankQuestions: [
      { q: "What happens if the available NPSH (NPSHa) drops below the required NPSH (NPSHr)?", opts: ["The pump automatically shuts down for safety","The pump cavitates: vapour bubbles form and implode","Flow increases beyond normal","The pump becomes self-priming"], correct: 1, expl: "If NPSHa < NPSHr, suction pressure falls below the vapour pressure: bubbles form and violently implode on the impeller (cavitation), able to destroy the pump within hours. Safety rule: NPSHa > NPSHr + 0.5-1 m margin." },
      { q: "What is the key difference between a centrifugal and a positive displacement pump regarding priming?", opts: ["Centrifugal is self-priming, positive displacement is not","Positive displacement is self-priming (can draw an air-liquid mix), centrifugal is not","Both are self-priming","Neither is self-priming"], correct: 1, expl: "A centrifugal pump cannot draw air and must be primed before starting. Positive displacement pumps (gear, screw, piston) can draw an air-liquid mixture and self-empty." },
      { q: "What is the main role of a hydraulic accumulator?", opts: ["Filter particles from the hydraulic fluid","Absorb pulsations and maintain pressure if the pump stops","Limit the maximum circuit pressure","Direct fluid toward the actuators"], correct: 1, expl: "The accumulator stores oil under pressure against a gas (nitrogen). It absorbs pressure pulsations, provides instant high flow, and maintains pressure if the pump stops (safety)." },
      { q: "Which centrifugal pump seal type tolerates a slight normal seepage?", opts: ["The mechanical seal","The stuffing box (packing gland)","The magnetic seal","The lip seal"], correct: 1, expl: "The stuffing box, the oldest type, needs slight seepage for lubrication. The mechanical seal, more reliable, should show no leaks under normal operation." },
      { q: "Per pump similarity laws, if you double the speed of a centrifugal pump, absorbed power is multiplied by:", opts: ["2","4","8","16"], correct: 2, expl: "P2/P1 = (n2/n1) cubed. Doubling speed multiplies power by 2 cubed = 8. That's why variable frequency drives save so much energy at reduced speed." },
      { q: "What is a pump's operating point?", opts: ["The pump's maximum possible flow","The intersection of the pump curve and the system curve","The maximum discharge pressure","The point where NPSH is zero"], correct: 1, expl: "The operating point is the intersection of the pump's characteristic curve (H decreases as Q increases) and the system curve (H increases with Q squared)." },
      { q: "Why are ballast pumps generally centrifugal pumps?", opts: ["Because they are self-priming","Because they provide high flow at moderate pressure for a low-viscosity fluid","Because they are the cheapest on the market","Because they need less maintenance"], correct: 1, expl: "Ballasting seawater needs high flows (500-2000 m3/h) at moderate pressure: the simple, robust centrifugal pump is ideal for this profile." },
      { q: "Why is a screw pump preferred for heavy fuel oil (HFO)?", opts: ["It is cheaper than a centrifugal pump","It handles very viscous fluids well with smooth flow and no turbulence","It does not require heating the fuel","It only works when cold"], correct: 1, expl: "HFO is extremely viscous (up to 700 cSt) and must be heated to 120-150 degC. The screw pump handles this fluid very well, with smooth flow and no degradation from turbulence." },
      { q: "What sign indicates a defective mechanical seal on a pump?", opts: ["Slight seepage of a few drops per hour","A continuous leak and a squealing noise","A stable oil temperature","Normal discharge pressure"], correct: 1, expl: "A healthy mechanical seal should show no notable leak. A continuous leak, squealing, and rising temperature at the seal indicate wear requiring a full seal replacement." },
      { q: "What is the main advantage of a submersible pump on board?", opts: ["Higher flow than a standard centrifugal pump","No priming problem since it is always submerged","Simpler maintenance than a standard pump","Very low purchase cost"], correct: 1, expl: "Being always submerged, a submersible pump never has priming issues. Widely used for bilges and sumps, but maintenance is harder (requires extraction)." },
      { q: "How does an ejector (jet pump) work?", opts: ["Through a high-speed rotating impeller","Through the Venturi effect, with no moving parts","Through a reciprocating piston","Through two meshing gears"], correct: 1, expl: "An ejector uses the Venturi effect: a motive fluid injected at high speed creates a low-pressure zone that draws in the fluid to be pumped. With no moving parts, it offers maximum reliability." },
      { q: "In the PMS (Planned Maintenance System), what must be checked weekly on ballast pumps?", opts: ["Full impeller replacement","Bearing oil level and visual leak checks","Motor-pump alignment","Full seal overhaul"], correct: 1, expl: "The weekly check covers bearing oil level and visible leaks. Heavier checks (bearings, impeller, alignment) are monthly or annual." },
      { q: "What is water hammer and how is it prevented?", opts: ["Slow pipe wear, prevented by anti-corrosion paint","A sudden overpressure from abrupt flow stoppage, prevented by slow valve closure","A gradual pressure drop, prevented by a finer filter","Constant vibration, prevented by better alignment"], correct: 1, expl: "Water hammer is a sudden overpressure (5-10 times normal) caused by abrupt flow stoppage. Prevention: slow valve closure, surge relief valves, anti-surge vessels." },
      { q: "What is the maximum oil content allowed for a bilge water discharge at sea under MARPOL Annex I?", opts: ["5 ppm","15 ppm","50 ppm","100 ppm"], correct: 1, expl: "MARPOL Annex I sets the limit at 15 ppm oil content for any discharge at sea, also prohibited within 12 miles of the coast. An OCM is mandatory on all vessels over 400 GT." },
      { q: "Which formula calculates the hydraulic power absorbed by a centrifugal pump?", opts: ["P = rho x g x Q x H","P = rho x g x Q x H / eta","P = Q x H only","P = eta / (rho x g)"], correct: 1, expl: "Absorbed power is P = (rho x g x Q x H) / eta, with rho fluid density, g gravitational acceleration, Q flow rate, H total head, and eta pump efficiency." },
    ],
    quiz: [
      { q: "Which pump type is most common on board for ballasting?", opts: ["Piston pump", "Centrifugal pump", "Gear pump", "Screw pump"], correct: 1, exp: "The centrifugal pump is most common on board for ballasting as it offers high flow at moderate pressure, is robust and simple. Ideal for large seawater flows (500-2000 m3/h)." },
      { q: "Cavitation occurs when:", opts: ["Delivery pressure is too high", "Suction pressure drops below liquid vapour pressure", "Rotation speed is too high", "Flow is too high"], correct: 1, exp: "Cavitation occurs when absolute suction pressure drops below the liquid's saturated vapour pressure. Vapour bubbles form and implode violently on the impeller, causing erosion and vibration." },
      { q: "Which hydraulic circuit component limits maximum pressure?", opts: ["Hydraulic filter", "Accumulator", "Relief valve", "Directional valve"], correct: 2, exp: "The relief valve limits maximum hydraulic circuit pressure by opening when pressure exceeds the set threshold and returning oil to the reservoir. Mandatory overpressure protection." },
      { q: "Per pump similarity laws, doubling centrifugal pump speed multiplies power consumption by:", opts: ["2", "4", "8", "16"], correct: 2, exp: "Similarity law: P2/P1 = (n2/n1)3. If n2 = 2xn1: P2 = 8xP1. Power is proportional to speed cubed. This is why VFDs achieve great energy savings on board." },
      { q: "A gear pump is preferred for heavy fuel oil (HFO) because:", opts: ["It has higher flow than centrifugal", "It is self-priming and handles viscous fluids well", "It costs less", "It requires no maintenance"], correct: 1, exp: "The gear pump is self-priming and handles viscous fluids like HFO very well. It maintains constant flow regardless of fluid viscosity, unlike the centrifugal pump whose performance drops with viscous fluids." },
    ],
  },

  es: {
    moduleLabel: "MAQUINAS - AUXILIARES",
    lessonTitle: "Bombas y Sistemas de Fluidos",
    lessonSub:   "Centrifugas, volumetricas, hidraulica, NPSH",
    intro: "Las bombas estan omnipresentes a bordo: lastre, combustible, agua de mar, agua dulce, aceite, carga. Comprender sus tipos, curva caracteristica y sistemas hidraulicos asociados es fundamental para todo maquinista.",
    s1title: "Tipos de Bombas Marinas",
    s2title: "Curva Caracteristica y Punto de Funcionamiento",
    s3title: "Componentes de un Sistema Hidraulico",
    s4title: "Fallos Comunes y Resolucion",
    s1hint:  "Seleccione un tipo de bomba",
    s3hint:  "Toque un componente para su descripcion",
    s4hint:  "Seleccione un fallo",
    exerciseTitle: "Ejercicios Practicos",
    showAnswer: "Ver correccion",
    hideAnswer: "Ocultar",
    accidentTitle: "CASO REAL: Naufragio por via de agua - FV Opportune (2024, informe MAIB)",
    accidentBody: "En 2024, el arrastrero de pesca Opportune se hundio frente a la costa britanica tras una inundacion rapida e incontrolable de la sala de maquinas. La investigacion del MAIB determino que la causa fue el fallo de tuberia de agua de mar corroida, tuberia galvanizada en caliente que habia superado su vida util. El agua entro en la sala de maquinas mas rapido de lo que las bombas de sentina podian evacuarla. Los 8 tripulantes fueron rescatados ilesos mediante balsas salvavidas y helicopteros de guardacostas, pero el buque no pudo ser recuperado y se perdio. El MAIB senalo que el entorno marino es muy corrosivo y que la tuberia galvanizada tiene una vida util limitada, exigiendo un plan de sustitucion durante la vida operativa del buque (unos 20 anos). De media, mas de 7 buques pesqueros se pierden cada ano por inundacion.",
    summaryTitle: "Puntos esenciales",
    summary: [
      "Las bombas centrifugas dominan a bordo: simples, robustas, caudal variable segun presion",
      "Las bombas volumetricas (engranajes, pistones) se usan para aceite y combustible HFO",
      "La cavitacion destruye los rodetes - mantener NPSHd > NPSHr + 0,5 m de margen",
      "Un sistema hidraulico comprende: bomba, filtro, distribuidor, actuador, deposito",
      "Ley de semejanza: Potencia proporcional a n3 - los variadores de frecuencia ahorran hasta 50% de energia",
      "Inspeccionar los filtros de aspiracion tras cada transito en aguas poco profundas o sedimentarias",
    ],
    quizCTA: "COMENZAR EL QUIZ",
    bankStart: "COMENZAR =>",
    bankNext: "Siguiente pregunta =>",
    bankTrophy: "Enhorabuena! Banco completado",
    bankScore: "Puntuacion banco",
    pumpTypes: {
      centrifugal: { name: "Bomba centrifuga",  desc: "La mas extendida a bordo. Un rodete gira e imparte energia cinetica al fluido por fuerza centrifuga. El fluido se convierte en presion en la voluta. Ventajas: simple, robusta, gran caudal, no autocebante. Usos: lastre, agua de mar, refrigeracion, agua dulce." },
      gear:         { name: "Bomba de engranajes", desc: "Dos engranajes en contacto desplazan el fluido en las cavidades entre los dientes. Caudal proporcional a la velocidad. Ventajas: autocebante, alta presion, apta para fluidos viscosos. Usos: aceite de lubricacion, fuel oil (HFO), aceite hidraulico." },
      screw:        { name: "Bomba de tornillo",  desc: "Dos o tres tornillos helicoidales engranan y desplazan el fluido axialmente. Muy silenciosa y regular. Usada para HFO viscoso, carga en tanqueros. Resiste bien fluidos con particulas." },
      piston:       { name: "Bomba de piston",    desc: "Uno o varios pistones alternativos desplazan el fluido. Alta presion posible. Usada para sistemas hidraulicos de alta presion (timon, maquinillas, estabilizadores). Caudal pulsante - requiere acumulador." },
      diaphragm:    { name: "Bomba de membrana",  desc: "Una membrana flexible reemplaza el piston. Permite bombear fluidos corrosivos o cargados sin contacto con piezas mecanicas. Usada para aguas residuales, productos quimicos, sentinas." },
    },
    hydraulicComponents: {
      reservoir:   { name: "Deposito hidraulico", desc: "Almacena el aceite hidraulico, permite la desgasificacion y el enfriamiento. Equipado con filtro de llenado, indicador de nivel, termometro y a veces intercambiador de calor." },
      pump_h:      { name: "Bomba hidraulica",    desc: "Genera el caudal y la presion. Generalmente de pistones axiales (alta presion) o engranajes (baja/media presion). Accionada por motor electrico o motor principal." },
      filter:      { name: "Filtro hidraulico",   desc: "Elimina particulas del fluido hidraulico. Filtro de aspiracion (grueso), filtro de alta presion en descarga (fino - 10 a 25 micras). El taponamiento se indica por un presostato diferencial." },
      valve:       { name: "Distribuidor",        desc: "Dirige el fluido hacia los actuadores. Puede accionarse manual, electrica o hidraulicamente. Determina el sentido de movimiento de los actuadores." },
      relief:      { name: "Valvula de seguridad", desc: "Limita la presion maxima del circuito. Se abre cuando la presion supera el umbral ajustado y devuelve el aceite al deposito. Proteccion obligatoria contra sobrepresion." },
      accumulator: { name: "Acumulador",          desc: "Almacena energia hidraulica (aceite a presion + gas nitrogeno). Permite: suavizar las pulsaciones, proporcionar caudal instantaneo importante, mantener la presion en caso de corte de bomba." },
    },
    faults: {
      cavitation: { name: "Cavitacion",            cause: "Presion de aspiracion demasiado baja => formacion de burbujas de vapor que implosionan en el rodete. Ruido caracteristico (grava en la bomba). Destruccion rapida del rodete.", remedy: "Verificar el filtro de aspiracion (taponado), reducir la altura de aspiracion, verificar fugas de aire en la tuberia de aspiracion, aumentar el NPSH disponible." },
      noflow:     { name: "Ausencia de caudal",    cause: "Bomba no cebada (centrifuga), sentido de giro invertido, valvula de aspiracion cerrada, filtro taponado, rodete obstruido o desgastado.", remedy: "Cebar la bomba, verificar el sentido de giro, abrir valvulas, limpiar el filtro, inspeccionar el rodete." },
      overheat:   { name: "Sobrecalentamiento",    cause: "Falta de liquido (bomba en seco), friccion excesiva (cierre mecanico apretado), caudal nulo con bomba en marcha, desalineacion.", remedy: "Parar inmediatamente si esta en seco, verificar el cierre mecanico, abrir ligeramente la descarga, verificar la alineacion motor-bomba." },
      vibration:  { name: "Vibraciones excesivas", cause: "Desequilibrio del rodete (cuerpo extrano), cavitacion, desgaste de rodamientos, desalineacion, resonancia de tuberias.", remedy: "Inspeccionar y limpiar el rodete, eliminar la cavitacion, sustituir rodamientos, realinear la bomba, verificar los soportes de tuberia." },
    },
    exercises: [
      { q: "Explique la diferencia entre una bomba centrifuga y una bomba volumetrica. Cuando se prefiere cada tipo a bordo?", a: "Bomba centrifuga: imparte energia cinetica al fluido mediante la rotacion de un rodete. Caudal variable segun la presion de la red. No autocebante. Ventajas: gran capacidad, regularidad, sin pulsaciones, robustez. Usada para grandes caudales a presion moderada: lastre, agua de mar, refrigeracion. Bomba volumetrica: desplaza un volumen fijo por ciclo. Caudal constante independientemente de la presion. Autocebante. Ventajas: alta presion, fluidos viscosos. Usada para HFO, aceite de lubricacion, sistemas hidraulicos." },
      { q: "Que es la cavitacion y cuales son sus consecuencias a largo plazo en una bomba centrifuga?", a: "La cavitacion ocurre cuando la presion en aspiracion cae por debajo de la presion de vapor saturado del liquido. Se forman burbujas de vapor que al llegar a una zona de alta presion (rodete) implosionan violentamente. Consecuencias: erosion del rodete (crateres en superficie), deterioro de la voluta, desgaste acelerado de rodamientos, reduccion progresiva del caudal y prestaciones, ruido caracteristico como de grava. Prevencion: mantener NPSH disponible > NPSH requerido." },
      { q: "Un sistema de bombeo de lastre presenta un caudal anormalmente bajo. Describa su procedimiento de diagnostico.", a: "1. Verificacion de parametros: leer presion de aspiracion y descarga. Presion de aspiracion muy baja indica cavitacion o filtro taponado. 2. Verificacion visual: valvula de aspiracion (abierta), filtro (indicador de taponamiento), fugas de aire. 3. Control de la bomba: ruido anormal, vibraciones, temperatura cojinetes. 4. Verificacion del motor: sentido de giro correcto, amperaje. 5. Limpiar el filtro si esta taponado. 6. Si persiste: inspeccion del rodete, control del cierre mecanico." },
    ],
    bankQuestions: [
      { q: "Que ocurre si el NPSH disponible (NPSHd) baja por debajo del NPSH requerido (NPSHr)?", opts: ["La bomba se para automaticamente por seguridad","La bomba cavita: se forman burbujas de vapor que implosionan","El caudal aumenta por encima de lo normal","La bomba se autoceba"], correct: 1, expl: "Si NPSHd < NPSHr, la presion de aspiracion cae por debajo de la presion de vapor: se forman burbujas que implosionan violentamente en el rodete (cavitacion), pudiendo destruir la bomba en horas. Regla: NPSHd > NPSHr + 0,5 a 1 m de margen." },
      { q: "Cual es la diferencia clave entre una bomba centrifuga y una volumetrica respecto al cebado?", opts: ["La centrifuga es autocebante, la volumetrica no","La volumetrica es autocebante (puede aspirar mezcla aire-liquido), la centrifuga no","Ambas son autocebantes","Ninguna es autocebante"], correct: 1, expl: "La bomba centrifuga no puede aspirar aire y debe cebarse antes de arrancar. La bomba volumetrica (engranajes, tornillo, pistones) puede aspirar mezcla aire-liquido y vaciarse sola." },
      { q: "Cual es la funcion principal de un acumulador hidraulico?", opts: ["Filtrar particulas del fluido hidraulico","Absorber pulsaciones y mantener la presion si se para la bomba","Limitar la presion maxima del circuito","Dirigir el fluido hacia los actuadores"], correct: 1, expl: "El acumulador almacena aceite a presion frente a un gas (nitrogeno). Absorbe pulsaciones, proporciona caudal instantaneo elevado y mantiene la presion si se detiene la bomba." },
      { q: "Que tipo de cierre de bomba centrifuga tolera un ligero goteo normal?", opts: ["El cierre mecanico","El prensaestopas","El cierre magnetico","El labio de estanqueidad"], correct: 1, expl: "El prensaestopas, el mas antiguo, necesita un ligero goteo normal para la lubricacion. El cierre mecanico, mas fiable, no debe presentar fugas en condiciones normales." },
      { q: "Segun las leyes de semejanza, si se duplica la velocidad de una bomba centrifuga, la potencia absorbida se multiplica por:", opts: ["2","4","8","16"], correct: 2, expl: "P2/P1 = (n2/n1) al cubo. Al duplicar la velocidad, la potencia se multiplica por 2 al cubo = 8. Por eso los variadores de frecuencia ahorran mucha energia a velocidad reducida." },
      { q: "Que es el punto de funcionamiento de una bomba?", opts: ["El caudal maximo posible de la bomba","La interseccion de la curva de la bomba y la curva de la red","La presion de descarga maxima","El punto donde el NPSH es cero"], correct: 1, expl: "El punto de funcionamiento es la interseccion entre la curva caracteristica de la bomba (H disminuye al aumentar Q) y la curva de la red (H aumenta con Q al cuadrado)." },
      { q: "Por que las bombas de lastre son generalmente centrifugas?", opts: ["Porque son autocebantes","Porque ofrecen gran caudal a presion moderada para un fluido poco viscoso","Porque son las mas baratas del mercado","Porque necesitan menos mantenimiento"], correct: 1, expl: "El lastrado con agua de mar requiere grandes caudales (500 a 2000 m3/h) a presion moderada: la bomba centrifuga, simple y robusta, es ideal para este perfil." },
      { q: "Por que se prefiere una bomba de tornillo para el fuel oil pesado (HFO)?", opts: ["Es mas barata que una centrifuga","Maneja bien fluidos muy viscosos con caudal regular y sin turbulencia","No requiere calentar el combustible","Solo funciona en frio"], correct: 1, expl: "El HFO es extremadamente viscoso (hasta 700 cSt) y debe calentarse a 120-150 degC. La bomba de tornillo maneja muy bien este fluido, con caudal regular y sin degradacion por turbulencia." },
      { q: "Que senal indica un cierre mecanico defectuoso en una bomba?", opts: ["Un ligero goteo de pocas gotas por hora","Una fuga continua y un ruido de chirrido","Una temperatura de aceite estable","Una presion de descarga normal"], correct: 1, expl: "Un cierre mecanico en buen estado no debe presentar fugas notables. Una fuga continua, un chirrido y una elevacion de temperatura en el cierre indican desgaste que exige su sustitucion completa." },
      { q: "Cual es la principal ventaja de una bomba sumergible a bordo?", opts: ["Mayor caudal que una centrifuga estandar","Ningun problema de cebado al estar siempre sumergida","Mantenimiento mas simple que una bomba estandar","Coste de compra muy reducido"], correct: 1, expl: "Al estar siempre sumergida, la bomba sumergible nunca tiene problemas de cebado. Muy usada en sentinas y sumideros, pero su mantenimiento es mas dificil (requiere extraccion)." },
      { q: "Como funciona un eyector (bomba de chorro)?", opts: ["Mediante un rodete giratorio de alta velocidad","Mediante el efecto Venturi, sin piezas moviles","Mediante un piston alternativo","Mediante dos engranajes en contacto"], correct: 1, expl: "Un eyector usa el efecto Venturi: un fluido motor inyectado a alta velocidad crea una depresion que aspira el fluido a bombear. Sin piezas moviles, ofrece maxima fiabilidad." },
      { q: "En el PMS (Planned Maintenance System), que hay que revisar semanalmente en las bombas de lastre?", opts: ["La sustitucion completa del rodete","El nivel de aceite de los cojinetes y las fugas visibles","La alineacion motor-bomba","La revision completa del cierre"], correct: 1, expl: "El control semanal cubre el nivel de aceite de los cojinetes y las fugas visibles. Los controles mas exhaustivos (rodamientos, rodete, alineacion) son mensuales o anuales." },
      { q: "Que es el golpe de ariete y como se previene?", opts: ["Un desgaste lento de tuberias, prevenido con pintura anticorrosiva","Una sobrepresion brusca por parada subita del flujo, prevenida con cierre lento de valvulas","Una caida de presion progresiva, prevenida con un filtro mas fino","Una vibracion constante, prevenida con mejor alineacion"], correct: 1, expl: "El golpe de ariete es una sobrepresion brusca (5 a 10 veces la normal) causada por la parada subita del flujo. Prevencion: cierre lento de valvulas, valvulas de alivio, depositos anti-golpe." },
      { q: "Cual es el contenido maximo de hidrocarburos permitido para un vertido de agua de sentina en el mar segun MARPOL Anexo I?", opts: ["5 ppm","15 ppm","50 ppm","100 ppm"], correct: 1, expl: "MARPOL Anexo I fija el limite en 15 ppm de hidrocarburos para cualquier vertido en el mar, ademas prohibido a menos de 12 millas de la costa. Un OCM es obligatorio en buques de mas de 400 GT." },
      { q: "Que formula permite calcular la potencia hidraulica absorbida por una bomba centrifuga?", opts: ["P = rho x g x Q x H","P = rho x g x Q x H / eta","P = Q x H unicamente","P = eta / (rho x g)"], correct: 1, expl: "La potencia absorbida es P = (rho x g x Q x H) / eta, con rho la densidad del fluido, g la aceleracion de la gravedad, Q el caudal, H la altura manometrica y eta el rendimiento de la bomba." },
    ],
    quiz: [
      { q: "Que tipo de bomba es mas habitual a bordo para el lastre?", opts: ["Bomba de pistones", "Bomba centrifuga", "Bomba de engranajes", "Bomba de tornillo"], correct: 1, exp: "La bomba centrifuga es la mas habitual para el lastre: gran caudal a presion moderada, robusta y simple. Ideal para grandes caudales de agua de mar (500-2000 m3/h)." },
      { q: "La cavitacion se produce cuando:", opts: ["La presion de descarga es demasiado alta", "La presion de aspiracion baja de la presion de vapor del liquido", "La velocidad de giro es demasiado alta", "El caudal es demasiado grande"], correct: 1, exp: "La cavitacion se produce cuando la presion absoluta en aspiracion cae por debajo de la presion de vapor saturado del liquido. Las burbujas de vapor implotan violentamente en el rodete, causando erosion y vibraciones." },
      { q: "Que componente del circuito hidraulico limita la presion maxima?", opts: ["El filtro hidraulico", "El acumulador", "La valvula de seguridad", "El distribuidor"], correct: 2, exp: "La valvula de seguridad limita la presion maxima abriendose cuando supera el umbral ajustado y devolviendo el aceite al deposito. Proteccion obligatoria contra sobrepresion." },
      { q: "Segun las leyes de semejanza, si se duplica la velocidad de una bomba centrifuga, la potencia consumida se multiplica por:", opts: ["2", "4", "8", "16"], correct: 2, exp: "Ley de semejanza: P2/P1 = (n2/n1)3. Si n2 = 2 x n1: P2 = 8 x P1. La potencia es proporcional al cubo de la velocidad. Por eso los variadores de frecuencia ahorran mucha energia." },
      { q: "Se prefiere una bomba de engranajes para el fuel oil pesado (HFO) porque:", opts: ["Tiene mayor caudal que la centrifuga", "Es autocebante y apta para fluidos viscosos", "Cuesta menos", "No requiere mantenimiento"], correct: 1, exp: "La bomba de engranajes es autocebante y maneja muy bien los fluidos viscosos como el HFO. Mantiene caudal constante independientemente de la viscosidad, al contrario de la centrifuga." },
    ],
  },

  pt: {
    moduleLabel: "MAQUINAS - AUXILIARES",
    lessonTitle: "Bombas e Sistemas de Fluidos",
    lessonSub:   "Centrifugas, volumetricas, hidraulica, NPSH",
    intro: "As bombas estao omnipresentes a bordo: lastro, combustivel, agua do mar, agua doce, oleo, carga. Compreender os seus tipos, curva caracteristica e sistemas hidraulicos associados e fundamental para qualquer maquinista.",
    s1title: "Tipos de Bombas Marinhas",
    s2title: "Curva Caracteristica e Ponto de Funcionamento",
    s3title: "Componentes de um Sistema Hidraulico",
    s4title: "Avarias Comuns e Resolucao",
    s1hint:  "Selecione um tipo de bomba",
    s3hint:  "Toque num componente para a descricao",
    s4hint:  "Selecione uma avaria",
    exerciseTitle: "Exercicios Praticos",
    showAnswer: "Ver correcao",
    hideAnswer: "Ocultar",
    accidentTitle: "CASO REAL: Naufragio por entrada de agua - FV Opportune (2024, relatorio MAIB)",
    accidentBody: "Em 2024, o arrastao de pesca Opportune afundou-se ao largo da costa britanica apos uma inundacao rapida e incontrolavel da casa de maquinas. A investigacao do MAIB determinou que a causa foi a falha de tubagem de agua do mar corroida, tubagem galvanizada a quente que tinha ultrapassado a sua vida util. A agua entrou na casa de maquinas mais depressa do que as bombas de sentina conseguiam escoar. Os 8 tripulantes foram resgatados ilesos atraves de balsas salva-vidas e helicopteros da guarda costeira, mas o navio nao pode ser recuperado e perdeu-se. O MAIB assinalou que o ambiente marinho e muito corrosivo e que a tubagem galvanizada tem uma vida util limitada, exigindo um plano de substituicao ao longo da vida operacional do navio (cerca de 20 anos). Em media, mais de 7 navios de pesca sao perdidos todos os anos devido a inundacoes.",
    summaryTitle: "Pontos essenciais",
    summary: [
      "As bombas centrifugas dominam a bordo: simples, robustas, caudal variavel conforme pressao",
      "As bombas volumetricas (engrenagens, pistoes) sao usadas para oleo e combustivel HFO",
      "A cavitacao destroi as rodas das bombas - manter NPSHd > NPSHr + 0,5 m de margem",
      "Um sistema hidraulico inclui: bomba, filtro, distribuidor, atuador, reservatorio",
      "Lei de semelhanca: Potencia proporcional a n3 - os variadores de frequencia poupam ate 50% de energia",
      "Inspecionar os filtros de aspiracao apos cada transito em aguas pouco profundas ou sedimentares",
    ],
    quizCTA: "COMECAR O QUIZ",
    bankStart: "COMECAR =>",
    bankNext: "Proxima pergunta =>",
    bankTrophy: "Parabens! Banco concluido",
    bankScore: "Pontuacao banco",
    pumpTypes: {
      centrifugal: { name: "Bomba centrifuga",  desc: "A mais comum a bordo. Uma roda (impeller) roda e transmite energia cinetica ao fluido por forca centrifuga. O fluido e convertido em pressao na voluta. Vantagens: simples, robusta, caudal elevado, nao autocebante. Utilizacoes: lastro, agua do mar, refrigeracao, agua doce." },
      gear:         { name: "Bomba de engrenagens", desc: "Duas engrenagens em contacto deslocam o fluido nas cavidades entre os dentes. Caudal proporcional a velocidade. Vantagens: autocebante, alta pressao, adequada a fluidos viscosos. Utilizacoes: oleo de lubrificacao, fuel oil (HFO), oleo hidraulico." },
      screw:        { name: "Bomba de parafuso",    desc: "Dois ou tres parafusos helicoidais engrenam e deslocam o fluido axialmente. Muito silenciosa e regular. Usada para HFO viscoso, carga em petroleiros. Suporta bem fluidos com particulas." },
      piston:       { name: "Bomba de pistao",      desc: "Um ou mais pistoes alternativos deslocam o fluido. Alta pressao possivel. Usada para sistemas hidraulicos de alta pressao (leme, guinchos, estabilizadores). Caudal pulsante - requer acumulador." },
      diaphragm:    { name: "Bomba de diafragma",   desc: "Um diafragma flexivel substitui o pistao. Permite bombear fluidos corrosivos ou carregados sem contacto com pecas mecanicas. Usada para aguas residuais, produtos quimicos, sentina." },
    },
    hydraulicComponents: {
      reservoir:   { name: "Reservatorio hidraulico", desc: "Armazena o oleo hidraulico, permite a desgasificacao e o arrefecimento. Equipado com filtro de enchimento, indicador de nivel, termometro e as vezes permutador de calor." },
      pump_h:      { name: "Bomba hidraulica",        desc: "Gera o caudal e a pressao. Geralmente de pistoes axiais (alta pressao) ou engrenagens (baixa/media pressao). Acionada por motor eletrico ou motor principal." },
      filter:      { name: "Filtro hidraulico",       desc: "Remove particulas do fluido hidraulico. Filtro de aspiracao (grosso), filtro de alta pressao na descarga (fino - 10 a 25 microns). O entupimento e indicado por um pressostato diferencial." },
      valve:       { name: "Distribuidor",            desc: "Direciona o fluido para os atuadores. Pode ser acionado manual, eletrica ou hidraulicamente. Determina o sentido de movimento dos atuadores." },
      relief:      { name: "Valvula de seguranca",    desc: "Limita a pressao maxima do circuito. Abre quando a pressao excede o limiar regulado e devolve o oleo ao reservatorio. Protecao obrigatoria contra sobrepressao." },
      accumulator: { name: "Acumulador",              desc: "Armazena energia hidraulica (oleo sob pressao + gas azoto). Permite: suavizar pulsacoes, fornecer caudal instantaneo elevado, manter pressao em caso de corte de bomba." },
    },
    faults: {
      cavitation: { name: "Cavitacao",              cause: "Pressao de aspiracao demasiado baixa => bolhas de vapor formam-se e implodem na roda. Ruido caracteristico (gravilha na bomba). Destruicao rapida da roda.", remedy: "Verificar filtro de aspiracao (entupido), reduzir altura de aspiracao, verificar fugas de ar na tubagem de aspiracao, aumentar NPSH disponivel." },
      noflow:     { name: "Ausencia de caudal",     cause: "Bomba nao cebada (centrifuga), sentido de rotacao invertido, valvula de aspiracao fechada, filtro entupido, roda obstruida ou desgastada.", remedy: "Cebar a bomba, verificar sentido de rotacao, abrir valvulas, limpar filtro, inspecionar roda." },
      overheat:   { name: "Sobreaquecimento",       cause: "Falta de liquido (bomba em seco), friccao excessiva (vedacao mecanica apertada), caudal nulo com bomba em marcha, desalinhamento.", remedy: "Parar imediatamente se em seco, verificar vedacao mecanica, abrir ligeiramente a descarga, verificar alinhamento motor-bomba." },
      vibration:  { name: "Vibracoes excessivas",   cause: "Desequilibrio da roda (corpo estranho), cavitacao, desgaste dos rolamentos, desalinhamento, ressonancia de tubagens.", remedy: "Inspecionar e limpar roda, eliminar cavitacao, substituir rolamentos, realinhar bomba, verificar suportes de tubagem." },
    },
    exercises: [
      { q: "Explique a diferenca entre uma bomba centrifuga e uma bomba volumetrica. Quando se prefere cada tipo a bordo?", a: "Bomba centrifuga: transmite energia cinetica ao fluido pela rotacao de uma roda. Caudal variavel conforme a pressao da rede. Nao autocebante. Vantagens: grande capacidade, regularidade, sem pulsacoes, robustez. Usada para grandes caudais a pressao moderada. Bomba volumetrica: desloca um volume fixo por ciclo. Caudal constante independentemente da pressao. Autocebante. Vantagens: alta pressao, fluidos viscosos. Usada para HFO, oleo de lubrificacao, sistemas hidraulicos." },
      { q: "O que e a cavitacao e quais sao as suas consequencias a longo prazo numa bomba centrifuga?", a: "A cavitacao ocorre quando a pressao na aspiracao cai abaixo da pressao de vapor saturado do liquido. Formam-se bolhas de vapor que ao chegarem a uma zona de alta pressao (roda) implodem violentamente. Consequencias: erosao da roda, deterioracao da voluta, desgaste acelerado dos rolamentos, reducao progressiva do caudal e desempenho, ruido caracteristico como gravilha. Prevencao: manter NPSH disponivel > NPSH requerido." },
      { q: "Um sistema de bombagem de lastro apresenta caudal anormalmente baixo. Descreva o seu procedimento de diagnostico.", a: "1. Verificacao de parametros: ler pressao de aspiracao e descarga. Pressao de aspiracao muito baixa indica cavitacao ou filtro entupido. 2. Verificacao visual: valvula de aspiracao (aberta), filtro (indicador de entupimento), fugas de ar. 3. Controlo da bomba: ruido anormal, vibracoes, temperatura rolamentos. 4. Verificacao do motor: sentido de rotacao correto, amperagem. 5. Limpar filtro se entupido. 6. Se persiste: inspecao da roda, controlo da vedacao mecanica." },
    ],
    bankQuestions: [
      { q: "O que acontece se o NPSH disponivel (NPSHd) ficar abaixo do NPSH requerido (NPSHr)?", opts: ["A bomba para automaticamente por seguranca","A bomba cavita: formam-se bolhas de vapor que implodem","O caudal aumenta acima do normal","A bomba torna-se autocebante"], correct: 1, expl: "Se NPSHd < NPSHr, a pressao de aspiracao cai abaixo da pressao de vapor: formam-se bolhas que implodem violentamente no rotor (cavitacao), podendo destruir a bomba em horas. Regra: NPSHd > NPSHr + 0,5 a 1 m de margem." },
      { q: "Qual a diferenca chave entre uma bomba centrifuga e uma volumetrica quanto ao cebamento?", opts: ["A centrifuga e autocebante, a volumetrica nao","A volumetrica e autocebante (pode aspirar mistura ar-liquido), a centrifuga nao","Ambas sao autocebantes","Nenhuma e autocebante"], correct: 1, expl: "A bomba centrifuga nao pode aspirar ar e deve ser cebada antes de arrancar. A bomba volumetrica (engrenagens, parafuso, pistoes) pode aspirar mistura ar-liquido e esvaziar-se sozinha." },
      { q: "Qual e a funcao principal de um acumulador hidraulico?", opts: ["Filtrar particulas do fluido hidraulico","Absorver pulsacoes e manter a pressao se a bomba parar","Limitar a pressao maxima do circuito","Direcionar o fluido para os atuadores"], correct: 1, expl: "O acumulador armazena oleo sob pressao contra um gas (azoto). Absorve pulsacoes de pressao, fornece caudal instantaneo elevado e mantem a pressao se a bomba parar." },
      { q: "Que tipo de vedacao de bomba centrifuga tolera uma pequena fuga normal?", opts: ["A vedacao mecanica","A caixa de gaxeta","A vedacao magnetica","O labio de vedacao"], correct: 1, expl: "A caixa de gaxeta, a mais antiga, precisa de uma pequena fuga normal para lubrificacao. A vedacao mecanica, mais fiavel, nao deve apresentar fugas em condicoes normais." },
      { q: "Segundo as leis de semelhanca, se duplicar a velocidade de uma bomba centrifuga, a potencia absorvida e multiplicada por:", opts: ["2","4","8","16"], correct: 2, expl: "P2/P1 = (n2/n1) ao cubo. Ao duplicar a velocidade, a potencia e multiplicada por 2 ao cubo = 8. Por isso os variadores de frequencia poupam muita energia a velocidade reduzida." },
      { q: "O que e o ponto de funcionamento de uma bomba?", opts: ["O caudal maximo possivel da bomba","A interseccao da curva da bomba com a curva da rede","A pressao de descarga maxima","O ponto onde o NPSH e zero"], correct: 1, expl: "O ponto de funcionamento e a interseccao entre a curva caracteristica da bomba (H diminui quando Q aumenta) e a curva da rede (H aumenta com Q ao quadrado)." },
      { q: "Por que as bombas de lastro sao geralmente centrifugas?", opts: ["Porque sao autocebantes","Porque oferecem grande caudal a pressao moderada para um fluido pouco viscoso","Porque sao as mais baratas do mercado","Porque precisam de menos manutencao"], correct: 1, expl: "O lastro com agua do mar exige grandes caudais (500 a 2000 m3/h) a pressao moderada: a bomba centrifuga, simples e robusta, e ideal para este perfil." },
      { q: "Por que se prefere uma bomba de parafuso para o fuel oil pesado (HFO)?", opts: ["E mais barata que uma centrifuga","Lida bem com fluidos muito viscosos com caudal regular e sem turbulencia","Nao requer aquecimento do combustivel","So funciona a frio"], correct: 1, expl: "O HFO e extremamente viscoso (ate 700 cSt) e deve ser aquecido a 120-150 degC. A bomba de parafuso lida muito bem com este fluido, com caudal regular e sem degradacao por turbulencia." },
      { q: "Que sinal indica uma vedacao mecanica defeituosa numa bomba?", opts: ["Uma pequena fuga de poucas gotas por hora","Uma fuga continua e um ruido de chiado","Uma temperatura de oleo estavel","Uma pressao de descarga normal"], correct: 1, expl: "Uma vedacao mecanica em bom estado nao deve apresentar fugas notaveis. Uma fuga continua, um chiado e uma subida de temperatura na vedacao indicam desgaste que exige substituicao completa." },
      { q: "Qual e a principal vantagem de uma bomba submersivel a bordo?", opts: ["Maior caudal que uma centrifuga standard","Nenhum problema de cebamento por estar sempre submersa","Manutencao mais simples que uma bomba standard","Custo de compra muito reduzido"], correct: 1, expl: "Por estar sempre submersa, a bomba submersivel nunca tem problemas de cebamento. Muito usada em sentinas e sumidouros, mas a sua manutencao e mais dificil (requer extracao)." },
      { q: "Como funciona um ejetor (bomba de jacto)?", opts: ["Atraves de um rotor giratorio de alta velocidade","Atraves do efeito Venturi, sem pecas moveis","Atraves de um pistao alternativo","Atraves de duas engrenagens em contacto"], correct: 1, expl: "Um ejetor usa o efeito Venturi: um fluido motor injetado a alta velocidade cria uma depressao que aspira o fluido a bombear. Sem pecas moveis, oferece maxima fiabilidade." },
      { q: "No PMS (Planned Maintenance System), o que deve ser verificado semanalmente nas bombas de lastro?", opts: ["A substituicao completa do rotor","O nivel de oleo dos rolamentos e as fugas visiveis","O alinhamento motor-bomba","A revisao completa da vedacao"], correct: 1, expl: "O controlo semanal cobre o nivel de oleo dos rolamentos e as fugas visiveis. Os controlos mais pesados (rolamentos, rotor, alinhamento) sao mensais ou anuais." },
      { q: "O que e o golpe de ariete e como se previne?", opts: ["Um desgaste lento das tubagens, prevenido com tinta anticorrosiva","Uma sobrepressao brusca por paragem subita do fluxo, prevenida com fecho lento de valvulas","Uma queda de pressao gradual, prevenida com um filtro mais fino","Uma vibracao constante, prevenida com melhor alinhamento"], correct: 1, expl: "O golpe de ariete e uma sobrepressao brusca (5 a 10 vezes a normal) causada pela paragem subita do fluxo. Prevencao: fecho lento de valvulas, valvulas de alivio, reservatorios anti-golpe." },
      { q: "Qual e o teor maximo de hidrocarbonetos permitido para uma descarga de agua de sentina no mar segundo MARPOL Anexo I?", opts: ["5 ppm","15 ppm","50 ppm","100 ppm"], correct: 1, expl: "MARPOL Anexo I fixa o limite em 15 ppm de hidrocarbonetos para qualquer descarga no mar, tambem proibida a menos de 12 milhas da costa. Um OCM e obrigatorio em navios com mais de 400 GT." },
      { q: "Que formula permite calcular a potencia hidraulica absorvida por uma bomba centrifuga?", opts: ["P = rho x g x Q x H","P = rho x g x Q x H / eta","P = Q x H apenas","P = eta / (rho x g)"], correct: 1, expl: "A potencia absorvida e P = (rho x g x Q x H) / eta, com rho a massa volumica do fluido, g a aceleracao da gravidade, Q o caudal, H a altura manometrica e eta o rendimento da bomba." },
    ],
    quiz: [
      { q: "Que tipo de bomba e mais comum a bordo para o lastro?", opts: ["Bomba de pistoes", "Bomba centrifuga", "Bomba de engrenagens", "Bomba de parafuso"], correct: 1, exp: "A bomba centrifuga e a mais comum para o lastro: caudal elevado a pressao moderada, robusta e simples. Ideal para grandes caudais de agua do mar (500-2000 m3/h)." },
      { q: "A cavitacao ocorre quando:", opts: ["A pressao de descarga e demasiado alta", "A pressao de aspiracao desce abaixo da pressao de vapor do liquido", "A velocidade de rotacao e demasiado alta", "O caudal e demasiado elevado"], correct: 1, exp: "A cavitacao ocorre quando a pressao absoluta na aspiracao cai abaixo da pressao de vapor saturado do liquido. Bolhas de vapor formam-se e implodem violentamente na roda, causando erosao e vibracoes." },
      { q: "Que componente do circuito hidraulico limita a pressao maxima?", opts: ["O filtro hidraulico", "O acumulador", "A valvula de seguranca", "O distribuidor"], correct: 2, exp: "A valvula de seguranca limita a pressao maxima abrindo quando a pressao excede o limiar regulado e devolvendo o oleo ao reservatorio. Protecao obrigatoria contra sobrepressao." },
      { q: "Segundo as leis de semelhanca, duplicar a velocidade de uma bomba centrifuga multiplica a potencia consumida por:", opts: ["2", "4", "8", "16"], correct: 2, exp: "Lei de semelhanca: P2/P1 = (n2/n1)3. Se n2 = 2 x n1: P2 = 8 x P1. A potencia e proporcional ao cubo da velocidade. Por isso os variadores de frequencia permitem grande poupanca de energia." },
      { q: "Prefere-se uma bomba de engrenagens para o fuel oil pesado (HFO) porque:", opts: ["Tem maior caudal que a centrifuga", "E autocebante e adequada a fluidos viscosos", "Custa menos", "Nao requer manutencao"], correct: 1, exp: "A bomba de engrenagens e autocebante e lida muito bem com fluidos viscosos como o HFO. Mantém caudal constante independentemente da viscosidade, ao contrario da centrifuga." },
    ],
  },
};

// ── SVG 1 - PUMP TYPES ───────────────────────────────────────
function PumpTypesSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string>("centrifugal");
  const pumps = t.pumpTypes;
  const pumpColors: Record<string, string> = {
    centrifugal: C.cyan, gear: C.blue, screw: C.green,
    piston: C.warn, diaphragm: C.teal,
  };
  const pumpLabels: Record<string, Record<string, string>> = {
    fr: { centrifugal:"Centrifuge", gear:"Engrenages", screw:"Vis", piston:"Piston", diaphragm:"Membrane" },
    en: { centrifugal:"Centrifugal", gear:"Gear", screw:"Screw", piston:"Piston", diaphragm:"Diaphragm" },
    es: { centrifugal:"Centrifuga", gear:"Engranajes", screw:"Tornillo", piston:"Piston", diaphragm:"Membrana" },
    pt: { centrifugal:"Centrifuga", gear:"Engrenagens", screw:"Parafuso", piston:"Pistao", diaphragm:"Diafragma" },
  };
  const labels = pumpLabels[lang] || pumpLabels.fr;

  const pumpSVGs: Record<string, React.ReactNode> = {
    centrifugal: (
      <g>
        <ellipse cx="80" cy="80" rx="44" ry="44" fill={C.cyan} opacity={0.1} stroke={C.cyan} strokeWidth="2"/>
        {[0,60,120,180,240,300].map((a,i)=>{const r=a*Math.PI/180;return <line key={i} x1={80+8*Math.cos(r)} y1={80+8*Math.sin(r)} x2={80+30*Math.cos(r+0.4)} y2={80+30*Math.sin(r+0.4)} stroke={C.cyan} strokeWidth="3" strokeLinecap="round"/>;}) }
        <circle cx="80" cy="80" r="8" fill={C.cyan} opacity={0.6}/>
        <line x1="80" y1="36" x2="80" y2="14" stroke={C.cyan} strokeWidth="1.5"/>
        <polygon points="80,8 76,16 84,16" fill={C.cyan}/>
        <text x="80" y="6" fontSize="7" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">IN</text>
        <line x1="124" y1="80" x2="148" y2="80" stroke={C.cyan} strokeWidth="1.5"/>
        <polygon points="154,80 146,76 146,84" fill={C.cyan}/>
        <text x="157" y="83" fontSize="7" fill={C.cyan} fontFamily="Courier New">OUT</text>
        <text x="80" y="155" fontSize="8" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">CENTRIFUGAL</text>
      </g>
    ),
    gear: (
      <g>
        <rect x="30" y="45" width="100" height="70" rx="6" fill={C.blue} opacity={0.08} stroke={C.blue} strokeWidth="1.5"/>
        <circle cx="62" cy="80" r="22" fill="none" stroke={C.blue} strokeWidth="1.5" opacity={0.5}/>
        <circle cx="98" cy="80" r="22" fill="none" stroke={C.blue} strokeWidth="1.5" opacity={0.5}/>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>{const r=a*Math.PI/180;return <rect key={i} x={62+18*Math.cos(r)-3} y={80+18*Math.sin(r)-3} width="6" height="6" rx="1" fill={C.blue} opacity={0.7} transform={`rotate(${a},${62+18*Math.cos(r)},${80+18*Math.sin(r)})`}/>;}) }
        <line x1="62" y1="45" x2="62" y2="20" stroke={C.blue} strokeWidth="1.5"/>
        <polygon points="62,14 58,22 66,22" fill={C.blue}/>
        <text x="62" y="12" fontSize="7" fill={C.blue} fontFamily="Courier New" textAnchor="middle">IN</text>
        <line x1="98" y1="115" x2="98" y2="140" stroke={C.blue} strokeWidth="1.5"/>
        <polygon points="98,146 94,138 102,138" fill={C.blue}/>
        <text x="98" y="154" fontSize="7" fill={C.blue} fontFamily="Courier New" textAnchor="middle">OUT</text>
        <text x="80" y="172" fontSize="8" fill={C.blue} fontFamily="Courier New" textAnchor="middle">GEAR PUMP</text>
      </g>
    ),
    screw: (
      <g>
        <rect x="20" y="52" width="120" height="56" rx="8" fill={C.green} opacity={0.08} stroke={C.green} strokeWidth="1.5"/>
        {[0,1,2,3,4,5].map(i=>(<g key={i}><ellipse cx={32+i*18} cy="67" rx="7" ry="12" fill={C.green} opacity={0.35} stroke={C.green} strokeWidth="1"/><ellipse cx={32+i*18} cy="93" rx="7" ry="12" fill={C.green} opacity={0.25} stroke={C.green} strokeWidth="1"/></g>))}
        <line x1="20" y1="80" x2="2" y2="80" stroke={C.green} strokeWidth="1.5"/>
        <polygon points="-4,80 4,76 4,84" fill={C.green}/>
        <text x="0" y="78" fontSize="7" fill={C.green} fontFamily="Courier New" textAnchor="middle">IN</text>
        <line x1="140" y1="80" x2="158" y2="80" stroke={C.green} strokeWidth="1.5"/>
        <polygon points="164,80 156,76 156,84" fill={C.green}/>
        <text x="160" y="78" fontSize="7" fill={C.green} fontFamily="Courier New">OUT</text>
        <text x="80" y="128" fontSize="8" fill={C.green} fontFamily="Courier New" textAnchor="middle">SCREW PUMP</text>
      </g>
    ),
    piston: (
      <g>
        <rect x="40" y="35" width="80" height="90" rx="6" fill={C.warn} opacity={0.08} stroke={C.warn} strokeWidth="1.5"/>
        <rect x="58" y="50" width="44" height="55" rx="4" fill={C.navy3} stroke={C.warn} strokeWidth="1"/>
        <rect x="66" y="58" width="28" height="35" rx="3" fill={C.warn} opacity={0.35}/>
        <line x1="80" y1="93" x2="80" y2="118" stroke={C.warn} strokeWidth="3.5"/>
        <ellipse cx="80" cy="122" rx="10" ry="4" fill={C.warn} opacity={0.4}/>
        <text x="80" y="136" fontSize="7" fill={C.warn} fontFamily="Courier New" textAnchor="middle">CRANK</text>
        <line x1="80" y1="35" x2="80" y2="14" stroke={C.warn} strokeWidth="1.5"/>
        <polygon points="80,8 76,16 84,16" fill={C.warn}/>
        <text x="80" y="6" fontSize="7" fill={C.warn} fontFamily="Courier New" textAnchor="middle">HIGH-P</text>
        <text x="80" y="160" fontSize="8" fill={C.warn} fontFamily="Courier New" textAnchor="middle">PISTON PUMP</text>
      </g>
    ),
    diaphragm: (
      <g>
        <rect x="22" y="48" width="116" height="74" rx="8" fill={C.teal} opacity={0.08} stroke={C.teal} strokeWidth="1.5"/>
        <line x1="80" y1="48" x2="80" y2="122" stroke={C.teal} strokeWidth="2" strokeDasharray="4,3"/>
        <path d="M80 65 Q58 80 80 95 Q102 80 80 65Z" fill={C.teal} opacity={0.4} stroke={C.teal} strokeWidth="1.5"/>
        <line x1="22" y1="80" x2="2" y2="80" stroke={C.teal} strokeWidth="1.5"/>
        <polygon points="-4,80 4,76 4,84" fill={C.teal}/>
        <text x="0" y="78" fontSize="7" fill={C.teal} fontFamily="Courier New" textAnchor="middle">IN</text>
        <line x1="138" y1="80" x2="158" y2="80" stroke={C.teal} strokeWidth="1.5"/>
        <polygon points="164,80 156,76 156,84" fill={C.teal}/>
        <text x="160" y="78" fontSize="7" fill={C.teal} fontFamily="Courier New">OUT</text>
        <text x="80" y="148" fontSize="8" fill={C.teal} fontFamily="Courier New" textAnchor="middle">DIAPHRAGM</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.cyan}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(pumps).map(([key]:any)=>{
          const col=pumpColors[key]||C.cyan;
          return(<button key={key} onClick={()=>setSel(key)} style={{padding:"5px 9px",borderRadius:8,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{labels[key]||key}</button>);
        })}
      </div>
      <svg viewBox="0 0 170 190" style={{width:"100%",maxWidth:230,display:"block",margin:"0 auto"}}>
        {pumpSVGs[sel]}
      </svg>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${pumpColors[sel]||C.cyan}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{pumps[sel]?.name}</div>
        {pumps[sel]?.desc}
      </div>
    </div>
  );
}

// ── SVG 2 - CHARACTERISTIC CURVE ─────────────────────────────
function CharacteristicCurveSVG({ lang }: { lang: string }) {
  const [speed, setSpeed] = useState(100);
  const W=260,H=130,padL=32,padB=26,padT=10;
  const chartW=W-padL-10, chartH=H-padB-padT;
  const toX=(q:number)=>padL+(q/120)*chartW;
  const toY=(h:number)=>padT+chartH-(h/60)*chartH;
  const sr=speed/100;
  const pumpH=(q:number)=>Math.max(0,55*sr*sr-0.003*(q/sr)*(q/sr)*sr*sr);
  const sysH=(q:number)=>10+0.003*q*q;
  const pumpPts=Array.from({length:50},(_,i)=>{const q=i*2.4;return{x:toX(q),y:toY(pumpH(q))};});
  const sysPts=Array.from({length:50},(_,i)=>{const q=i*2.4;return{x:toX(q),y:toY(sysH(q))};});
  let intQ=0,intH=0;
  for(let q=0;q<120;q+=0.5){if(Math.abs(pumpH(q)-sysH(q))<2){intQ=q;intH=pumpH(q);break;}}
  const pathD=(pts:{x:number,y:number}[])=>pts.map((p,i)=>`${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
  const speedLabel={fr:"Vitesse",en:"Speed",es:"Velocidad",pt:"Velocidade"}[lang]||"Vitesse";
  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.blue}33`}}>
      <div style={{marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.dim,marginBottom:6}}>
          <span>{speedLabel}</span><span style={{color:C.cyan,fontWeight:700}}>{speed}%</span>
        </div>
        <input type="range" min={50} max={110} value={speed} onChange={e=>setSpeed(Number(e.target.value))} style={{width:"100%",accentColor:C.cyan}}/>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",display:"block"}}>
        {[0,30,60,90,120].map(q=>(<g key={q}><line x1={toX(q)} y1={padT} x2={toX(q)} y2={H-padB} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/><text x={toX(q)} y={H-5} fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="Courier New" textAnchor="middle">{q}</text></g>))}
        {[0,20,40,60].map(h=>(<g key={h}><line x1={padL} y1={toY(h)} x2={W-10} y2={toY(h)} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/><text x={padL-4} y={toY(h)+3} fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="Courier New" textAnchor="end">{h}</text></g>))}
        <line x1={padL} y1={padT} x2={padL} y2={H-padB} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <line x1={padL} y1={H-padB} x2={W-10} y2={H-padB} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <path d={pathD(pumpPts)} fill="none" stroke={C.cyan} strokeWidth="2"/>
        <path d={pathD(sysPts)} fill="none" stroke={C.blue} strokeWidth="2" strokeDasharray="5,3"/>
        {intQ>0&&<circle cx={toX(intQ)} cy={toY(intH)} r="5" fill={C.green} stroke="#fff" strokeWidth="1.5"/>}
        <text x={toX(20)} y={toY(pumpH(20))-5} fontSize="7" fill={C.cyan} fontFamily="Courier New">PUMP</text>
        <text x={toX(80)} y={toY(sysH(80))-5} fontSize="7" fill={C.blue} fontFamily="Courier New">SYSTEM</text>
        {intQ>0&&<text x={toX(intQ)+7} y={toY(intH)-5} fontSize="7" fill={C.green} fontFamily="Courier New">OP</text>}
        <text x={W/2} y={H-1} fontSize="7" fill="rgba(255,255,255,0.35)" fontFamily="Courier New" textAnchor="middle">Q (m3/h)</text>
        <text x={8} y={H/2} fontSize="7" fill="rgba(255,255,255,0.35)" fontFamily="Courier New" textAnchor="middle" transform={`rotate(-90,8,${H/2})`}>H (m)</text>
      </svg>
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <div style={{flex:1,padding:"7px 10px",borderRadius:8,background:`${C.navy3}cc`,border:`1px solid ${C.cyan}33`,textAlign:"center"}}>
          <div style={{fontSize:9,color:C.dim,fontFamily:"Courier New",marginBottom:2}}>Q oper.</div>
          <div style={{fontSize:13,fontWeight:700,color:C.cyan,fontFamily:"Courier New"}}>{intQ>0?Math.round(intQ):"--"} m3/h</div>
        </div>
        <div style={{flex:1,padding:"7px 10px",borderRadius:8,background:`${C.navy3}cc`,border:`1px solid ${C.blue}33`,textAlign:"center"}}>
          <div style={{fontSize:9,color:C.dim,fontFamily:"Courier New",marginBottom:2}}>H oper.</div>
          <div style={{fontSize:13,fontWeight:700,color:C.blue,fontFamily:"Courier New"}}>{intH>0?Math.round(intH):"--"} m</div>
        </div>
      </div>
    </div>
  );
}

// ── SVG 3 - HYDRAULIC COMPONENTS ─────────────────────────────
function HydraulicComponentsSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const comps = t.hydraulicComponents;
  const compColors: Record<string, string> = {
    reservoir: C.cyan, pump_h: C.blue, filter: C.green,
    valve: C.teal, relief: C.warn, accumulator: "#9c27b0",
  };
  const compLabels: Record<string,string> = {
    reservoir:"TANK", pump_h:"PUMP", filter:"FILT", valve:"D/V", relief:"RV", accumulator:"ACC",
  };
  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.teal}33`}}>
      <svg viewBox="0 0 280 140" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        {/* Tank */}
        <rect x="10" y="88" width="50" height="40" rx="4" fill={C.cyan} opacity={0.12} stroke={C.cyan} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="reservoir"?null:"reservoir")}/>
        <text x="35" y="110" fontSize="7" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">TANK</text>
        {/* Pump */}
        <circle cx="90" cy="98" r="18" fill={C.blue} opacity={0.12} stroke={C.blue} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="pump_h"?null:"pump_h")}/>
        <text x="90" y="101" fontSize="7" fill={C.blue} fontFamily="Courier New" textAnchor="middle">PUMP</text>
        {/* Filter */}
        <rect x="118" y="83" width="26" height="30" rx="4" fill={C.green} opacity={0.12} stroke={C.green} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="filter"?null:"filter")}/>
        <text x="131" y="101" fontSize="6" fill={C.green} fontFamily="Courier New" textAnchor="middle">FILT</text>
        {/* Relief */}
        <rect x="148" y="54" width="20" height="25" rx="3" fill={C.warn} opacity={0.12} stroke={C.warn} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="relief"?null:"relief")}/>
        <text x="158" y="69" fontSize="6" fill={C.warn} fontFamily="Courier New" textAnchor="middle">RV</text>
        {/* D/V */}
        <rect x="152" y="83" width="36" height="30" rx="4" fill={C.teal} opacity={0.12} stroke={C.teal} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="valve"?null:"valve")}/>
        <text x="170" y="101" fontSize="6" fill={C.teal} fontFamily="Courier New" textAnchor="middle">D/V</text>
        {/* Accumulator */}
        <ellipse cx="222" cy="74" rx="15" ry="25" fill="#9c27b0" opacity={0.12} stroke="#9c27b0" strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="accumulator"?null:"accumulator")}/>
        <text x="222" y="76" fontSize="6" fill="#9c27b0" fontFamily="Courier New" textAnchor="middle">ACC</text>
        {/* Actuator */}
        <rect x="232" y="83" width="40" height="30" rx="4" fill={C.dim} opacity={0.08} stroke={C.dim} strokeWidth="1.5"/>
        <text x="252" y="101" fontSize="7" fill={C.dim} fontFamily="Courier New" textAnchor="middle">ACT</text>
        {/* Lines */}
        <line x1="35" y1="88" x2="35" y2="68" stroke={C.cyan} strokeWidth="1.5"/>
        <line x1="35" y1="68" x2="72" y2="68" stroke={C.cyan} strokeWidth="1.5"/>
        <line x1="72" y1="68" x2="72" y2="98" stroke={C.cyan} strokeWidth="1.5"/>
        <line x1="108" y1="98" x2="118" y2="98" stroke={C.blue} strokeWidth="2"/>
        <line x1="144" y1="98" x2="152" y2="98" stroke={C.blue} strokeWidth="2"/>
        <line x1="148" y1="67" x2="148" y2="98" stroke={C.warn} strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="188" y1="98" x2="210" y2="98" stroke={C.blue} strokeWidth="2"/>
        <line x1="210" y1="98" x2="210" y2="74" stroke="#9c27b0" strokeWidth="1.5" strokeDasharray="3,2"/>
        <line x1="210" y1="98" x2="232" y2="98" stroke={C.blue} strokeWidth="2"/>
      </svg>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {Object.entries(comps).map(([key]:any)=>{const col=compColors[key]||C.cyan;return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{compLabels[key]||key}</button>);}) }
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${compColors[sel]||C.teal}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{comps[sel]?.name}</div>
          {comps[sel]?.desc}
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s3hint}</div>}
    </div>
  );
}

// ── SVG 4 - FAULTS ───────────────────────────────────────────
function FaultsSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const faults = t.faults;
  const faultColors: Record<string, string> = {
    cavitation: C.warn, noflow: C.cyan, overheat: C.red, vibration: C.teal,
  };
  const faultIcons: Record<string, string> = {
    cavitation:"💥", noflow:"🚫", overheat:"🌡️", vibration:"📳",
  };
  const causeLabel={fr:"Cause",en:"Cause",es:"Causa",pt:"Causa"}[lang]||"Cause";
  const remedyLabel={fr:"Remede",en:"Remedy",es:"Remedio",pt:"Remedio"}[lang]||"Remedy";
  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.warn}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {Object.entries(faults).map(([key,val]:any)=>{
          const col=faultColors[key]||C.warn;
          return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`}}>
            <div style={{fontSize:16,marginBottom:4}}>{faultIcons[key]}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,fontFamily:"Courier New"}}>{val.name}</div>
          </button>);
        })}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${faultColors[sel]||C.warn}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.warn,fontWeight:700,marginBottom:4}}>⚠️ {causeLabel}</div>
          <div style={{marginBottom:8}}>{faults[sel].cause}</div>
          <div style={{color:C.green,fontWeight:700,marginBottom:4}}>✅ {remedyLabel}</div>
          <div>{faults[sel].remedy}</div>
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}
// LessonE2_L1 - Pompes & Systemes Fluides | PART 2

export default function LessonE2_L1({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t = T[lang] || T.fr;
  const moduleFull=lang==="fr"?"Module E2 — Auxiliaires & Électricité":lang==="en"?"Module E2 — Auxiliary Systems & Electricity":lang==="es"?"Módulo E2 — Auxiliares y Electricidad":"Módulo E2 — Auxiliares e Eletricidade";
  const lessonOf=lang==="fr"?"Leçon 1/7":lang==="en"?"Lesson 1/7":lang==="es"?"Lección 1/7":"Lição 1/7";
  const badgeText=lang==="fr"?`⚙️ ${moduleFull} · Leçon 1/7 · ⭐ Premium · 200 XP`:lang==="en"?`⚙️ ${moduleFull} · Lesson 1/7 · ⭐ Premium · 200 XP`:lang==="es"?`⚙️ ${moduleFull} · Lección 1/7 · ⭐ Premium · 200 XP`:`⚙️ ${moduleFull} · Lição 1/7 · ⭐ Premium · 200 XP`;
  const [phase, setPhase] = useState<"content"|"quiz"|"done">("content");

  // ── CONTENT STATE ────────────────────────────────────────────
  const [exShown, setExShown] = useState<boolean[]>([false,false,false]);
  const [exInputs, setExInputs] = useState<string[]>(["","",""]);
  const [accOpen, setAccOpen] = useState(false);
  const [bankIdx, setBankIdx] = useState<number|null>(null);
  const [bankCur, setBankCur] = useState(0);
  const [bankSel, setBankSel] = useState<number|null>(null);
  const [bankScore, setBankScore] = useState(0);
  const [bankDone, setBankDone] = useState(false);

  // ── QUIZ STATE ───────────────────────────────────────────────
  const [qCur, setQCur] = useState(0);
  const [qSel, setQSel] = useState<number|null>(null);
  const [qConf, setQConf] = useState(false);
  const [qScore, setQScore] = useState(0);

  const quiz = t.quiz;
  const bank = t.bankQuestions;
  const [shuffledQuiz]=useState(()=>quiz.map(shuffleQuestionOptions));
  const [shuffledBank]=useState(()=>bank.map(shuffleQuestionOptions));
  const xpFinal = qScore>=5?250:qScore>=4?200:qScore>=3?150:100;
  const optColors = [C.cyan, C.blue, C.green, C.teal];

  // progress bar
  const progress = phase==="content"?60:phase==="quiz"?85:100;

  // ── SECTION WRAPPER ──────────────────────────────────────────
  const section=(icon:string,title:string,children:React.ReactNode,col=C.cyan)=>(
    <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${col}2a`}}>
      <div style={{background:`${col}14`,padding:"10px 14px",borderBottom:`1px solid ${col}1a`}}>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:col}}>{icon} {title}</span>
      </div>
      <div style={{padding:12}}>{children}</div>
    </div>
  );

  // ── BANK LOGIC ───────────────────────────────────────────────
  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankSel(null);setBankScore(0);setBankDone(false);};
  const pickBank=(i:number)=>{if(bankSel!==null)return;setBankSel(i);if(i===shuffledBank[bankCur].correct)setBankScore(s=>s+1);};
  const bankNext=()=>{
    if(bankCur+1>=bank.length){setBankDone(true);return;}
    setBankCur(c=>c+1);setBankSel(null);
  };

  // ── QUIZ LOGIC ───────────────────────────────────────────────
  const handleQConf=()=>{if(qSel===null)return;setQConf(true);if(qSel===shuffledQuiz[qCur].correct)setQScore(s=>s+1);};
  const handleQNext=()=>{
    if(qCur+1>=quiz.length){setPhase("done");if(onComplete)onComplete(xpFinal);return;}
    setQCur(c=>c+1);setQSel(null);setQConf(false);
  };

  // ══ RENDER CONTENT ═══════════════════════════════════════════
  if(phase==="content") return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif"}}>
      {/* HEADER */}
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.cyan}33`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar"}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:C.cyan,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚙️ {moduleFull}</div>
            <div style={{fontSize:11,color:"rgba(240,244,255,0.45)"}}>{lessonOf}</div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
            <span style={{padding:"2px 8px",borderRadius:6,background:"rgba(0,188,212,0.15)",border:"1px solid rgba(0,188,212,0.4)",fontSize:9,color:C.cyan,fontFamily:"'Cinzel',serif",letterSpacing:1}}>PREMIUM</span>
            <span style={{fontSize:11,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New"}}>{progress}%</span>
          </div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${C.cyan},${C.blue})`,width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>

      <div style={{padding:"20px 16px 0"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.cyan}22`,border:`1px solid ${C.cyan}55`,fontSize:11,color:C.cyan,fontWeight:700}}>{badgeText}</div>
          <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 4px"}}>{t.lessonTitle}</h1>
        </div>
      </div>

      <div style={{padding:"14px 14px 80px"}}>
        {/* Intro */}
        <div style={{fontSize:13,color:C.dim,lineHeight:1.7,marginBottom:18,fontFamily:"Courier New",padding:"12px 14px",borderRadius:12,background:`${C.navy2}88`,border:`1px solid ${C.cyan}18`}}>{t.intro}</div>

        {/* S1 */}
        {section("⚙️",t.s1title,<PumpTypesSVG lang={lang}/>,C.cyan)}
        {/* S2 */}
        {section("📈",t.s2title,<CharacteristicCurveSVG lang={lang}/>,C.blue)}
        {/* S3 */}
        {section("🔧",t.s3title,<HydraulicComponentsSVG lang={lang}/>,C.teal)}
        {/* S4 */}
        {section("⚠️",t.s4title,<FaultsSVG lang={lang}/>,C.warn)}

        {/* EXERCISES */}
        <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${C.cyan}2a`}}>
          <div style={{background:`${C.cyan}14`,padding:"10px 14px",borderBottom:`1px solid ${C.cyan}1a`}}>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.cyan}}>✏️ {t.exerciseTitle}</span>
          </div>
          <div style={{padding:12}}>
            {t.exercises.map((ex:any,i:number)=>(
              <div key={i} style={{marginBottom:12,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${C.cyan}22`,overflow:"hidden"}}>
                <div style={{padding:"12px 14px"}}>
                  <div style={{fontSize:10,color:C.cyan,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
                  <div style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>{ex.q}</div>
                </div>
                <div style={{padding:"0 14px 12px"}}>
                  <input type="text" placeholder="?" value={exInputs[i]} onChange={e=>setExInputs(p=>p.map((v,j)=>j===i?e.target.value:v))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",color:C.white,fontSize:12,fontFamily:"Courier New",marginBottom:10,boxSizing:"border-box"}}/>
                  <button onClick={()=>setExShown(p=>p.map((v,j)=>j===i?!v:v))} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:exShown[i]?`${C.cyan}22`:"rgba(255,255,255,0.06)",border:`1px solid ${exShown[i]?C.cyan:"rgba(255,255,255,0.15)"}`,color:exShown[i]?C.cyan:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{exShown[i]?t.hideAnswer:t.showAnswer}</button>
                  {exShown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.cyan}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New"}}>{ex.a}</div>}
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
            <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.blue}}>📚 {lang==="fr"?"Banque de questions":lang==="en"?"Question Bank":lang==="es"?"Banco de preguntas":"Banco de questoes"} (15)</span>
          </div>
          <div style={{padding:12}}>
            {bankIdx===null&&(
              <button onClick={startBank} style={{width:"100%",padding:"14px 0",borderRadius:12,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{t.bankStart}</button>
            )}
            {bankIdx!==null&&!bankDone&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:11,color:C.dim,fontFamily:"Courier New"}}>
                  <span>Q{bankCur+1}/{bank.length}</span>
                  <span style={{color:C.cyan}}>✦ {bankScore}</span>
                </div>
                <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:12}}>
                  <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.cyan},${C.blue})`,width:`${((bankCur)/bank.length)*100}%`,transition:"width 0.3s"}}/>
                </div>
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
                {bankSel!==null&&(
                  <div>
                    <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${bankSel===shuffledBank[bankCur].correct?C.green:C.red}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{shuffledBank[bankCur].expl}</div>
                    <button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?t.bankTrophy:t.bankNext}</button>
                  </div>
                )}
              </div>
            )}
            {bankDone&&(
              <div style={{textAlign:"center",padding:16}}>
                <div style={{fontSize:36,marginBottom:8}}>🏆</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:16,color:C.cyan,marginBottom:6}}>{t.bankTrophy}</div>
                <div style={{fontSize:13,color:C.dim,fontFamily:"Courier New"}}>{t.bankScore} : {bankScore}/{bank.length}</div>
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.cyan}44`,padding:14,marginBottom:18}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:C.cyan,letterSpacing:1,marginBottom:10}}>✦ {t.summaryTitle}</div>
          {t.summary.map((s:string,i:number)=>(
            <div key={i} style={{display:"flex",gap:8,marginBottom:7,fontSize:12,color:"rgba(240,244,255,0.78)",fontFamily:"Courier New",lineHeight:1.5}}>
              <span style={{color:C.cyan,flexShrink:0}}>✦</span><span>{s}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>⚙️ {t.quizCTA}</button>
      </div>
    </div>
  );

  // ══ RENDER QUIZ ═══════════════════════════════════════════════
  if(phase==="quiz"){
    const q=shuffledQuiz[qCur];
    const isCorrect=qSel===q.correct;
    const submitLabel={fr:"Valider",en:"Submit",es:"Validar",pt:"Validar"}[lang]||"Valider";
    const nextLabel={fr:"Suivant =>",en:"Next =>",es:"Siguiente =>",pt:"Seguinte =>"}[lang]||"Suivant =>";
    return(
      <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif"}}>
        <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.cyan}33`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
            <button onClick={()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar"}</button>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:1,color:C.cyan,marginBottom:2}}>⚙️ {moduleFull} · QUIZ</div>
              <div style={{fontSize:11,color:"rgba(240,244,255,0.45)"}}>{lessonOf}</div>
            </div>
            <span style={{fontSize:11,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New"}}>{progress}%</span>
          </div>
          <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
            <div style={{height:"100%",background:`linear-gradient(90deg,${C.cyan},${C.blue})`,width:`${progress}%`,transition:"width 0.4s"}}/>
          </div>
        </div>
        <div style={{padding:"14px 14px 40px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,fontSize:11,color:C.dim,fontFamily:"Courier New"}}>
            <span>Q{qCur+1}/{quiz.length}</span>
            <span style={{color:C.cyan}}>⭐ {qScore}/{quiz.length}</span>
          </div>
          <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:16}}>
            <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.cyan},${C.blue})`,width:`${(qCur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
          </div>
          <div style={{fontSize:14,color:C.text,lineHeight:1.6,fontFamily:"Courier New",marginBottom:18,padding:14,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${C.cyan}22`}}>{q.q}</div>
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
          {qConf&&<div style={{padding:12,borderRadius:10,marginBottom:14,background:isCorrect?"rgba(74,222,128,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${isCorrect?"#4ade80":"#ef4444"}44`,fontSize:12,color:C.text,fontFamily:"Courier New",lineHeight:1.6}}>
            <div style={{fontWeight:700,marginBottom:4,color:isCorrect?"#4ade80":"#ef4444"}}>{isCorrect?"✅ Correct !":"❌ Incorrect"}</div>{q.exp}
          </div>}
          {!qConf
            ?<button onClick={handleQConf} disabled={qSel===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:qSel!==null?`linear-gradient(135deg,${C.cyan},${C.blue})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:qSel!==null?C.navy:"rgba(240,244,255,0.25)",cursor:qSel!==null?"pointer":"default",letterSpacing:1}}>{submitLabel}</button>
            :<button onClick={handleQNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:1}}>{qCur+1>=quiz.length?"TERMINER":nextLabel}</button>
          }
        </div>
      </div>
    );
  }

  // ══ RENDER DONE ═══════════════════════════════════════════════
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 14px"}}>
      <div style={{fontSize:56,marginBottom:12}}>⚙️</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:42,fontWeight:900,color:C.cyan,marginBottom:4}}>{xpFinal}</div>
      <div style={{fontSize:12,color:C.dim,fontFamily:"Courier New",marginBottom:8}}>{lang==="fr"?"XP obtenus":lang==="en"?"XP earned":lang==="es"?"XP obtenidos":"XP obtidos"}</div>
      <div style={{fontSize:15,color:C.white,fontFamily:"Courier New",marginBottom:24}}>Score : {qScore}/{quiz.length}</div>
      <div style={{width:"100%",maxWidth:400,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.cyan}44`,padding:14,marginBottom:24}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.cyan,marginBottom:10}}>✦ {t.summaryTitle}</div>
        {t.summary.map((s:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.cyan,flexShrink:0}}>✦</span><span>{s}</span>
          </div>
        ))}
      </div>
      <button onClick={onBack} style={{width:"100%",maxWidth:400,padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>⚙️ {lang==="fr"?"RETOUR AU MODULE":lang==="en"?"BACK TO MODULE":lang==="es"?"VOLVER AL MODULO":"VOLTAR AO MODULO"}</button>
    </div>
  );
}
