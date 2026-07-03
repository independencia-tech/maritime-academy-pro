// LessonE2_L4 - Generateurs & Production electrique | PART 1
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
    moduleLabel: "MACHINE - AUXILIAIRES",
    lessonTitle: "Generateurs & Production electrique",
    lessonSub:   "Alternateur, AVR, governor, couplage parallele",
    intro: "Un navire est une centrale electrique flottante. La production, la distribution et la protection de l'energie electrique a bord sont des competences fondamentales pour tout mecanicien ou officier de quart machine.",
    s1title: "Le groupe electrogene - anatomie",
    s2title: "Couplage en parallele",
    s3title: "Types de courant a bord",
    s4title: "Protection du reseau electrique",
    s1hint:  "Tapez un composant pour sa description",
    s2hint:  "Naviguez entre les etapes du couplage",
    s3hint:  "Selectionnez un type de courant",
    s4hint:  "Selectionnez une protection",
    exerciseTitle: "Exercices pratiques",
    showAnswer: "Voir la correction",
    hideAnswer: "Masquer",
    accidentTitle: "CAS REEL : Blackout et perte de propulsion - MV Dali (Baltimore, 2024)",
    accidentBody: "Le 26 mars 2024, peu apres avoir quitte le port de Baltimore, le porte-conteneurs Dali a subi une serie de blackouts electriques en quelques minutes. Selon l'enquete du NTSB, un cable mal connecte au sein du reseau electrique du bord s'est desserre sous l'effet des vibrations, provoquant la perte d'un generateur et une chute de tension qui a fait declencher en cascade plusieurs disjoncteurs, coupant l'alimentation de la propulsion principale et du gouvernail. Prive de propulsion et de gouverne, le navire a derive et percute l'un des piliers du pont Francis Scott Key, provoquant son effondrement quasi total. Six ouvriers qui travaillaient sur le pont au moment de la collision ont perdu la vie. L'equipage a tente de reagir en basculant vers le generateur de secours et en mouillant les ancres, mais le delai de reponse du systeme electrique n'a pas permis de retablir la propulsion a temps pour eviter la collision. L'enquete a mis en evidence des defauts de maintenance electrique recurrents sur le navire. Lecon : un simple defaut de connexion electrique mal identifie peut declencher une cascade de disjoncteurs et priver un navire de toute propulsion et gouverne en quelques secondes seulement.",
    summaryTitle: "Points essentiels",
    summary: [
      "Un navire possede 2 a 4 groupes electrogenes diesel-alternateur",
      "La tension standard a bord : 440V (triphase) pour la puissance, 220V pour l'eclairage",
      "Le couplage en parallele necessite meme tension, meme frequence (50/60 Hz) et meme phase",
      "Le disjoncteur principal (ACB) protege le reseau contre les surcharges et courts-circuits",
      "L'alternateur de secours (emergency generator) demarre automatiquement en 30s (SOLAS)",
      "Formule frequence : f = (n x p) / 60 - 1500 tr/min x 2 paires de poles = 50 Hz",
    ],
    quizCTA: "COMMENCER LE QUIZ",
    bankStart: "COMMENCER =>",
    bankNext: "Question suivante =>",
    bankTrophy: "Bravo ! Banque terminee",
    bankScore: "Score banque",
    components: {
      diesel:     { name: "Moteur diesel d'entrainement", desc: "Moteur diesel 4 temps entrainant l'alternateur. Sa vitesse de rotation (1500 ou 1800 tr/min) determine la frequence du courant produit (50 ou 60 Hz). Le regulateur de vitesse (governor) maintient la frequence constante sous charge variable." },
      alternator: { name: "Alternateur (generatrice)",    desc: "Machine tournante convertissant l'energie mecanique en energie electrique par induction electromagnetique. Produit un courant alternatif triphase. La tension est regulee par l'AVR (Automatic Voltage Regulator)." },
      avr:        { name: "AVR - Regulateur de tension",  desc: "Regule automatiquement la tension de sortie de l'alternateur en ajustant le courant d'excitation. Maintient la tension stable (plus ou moins 2%) malgre les variations de charge." },
      governor:   { name: "Governor - Regulateur vitesse", desc: "Maintient la vitesse de rotation du moteur diesel constante malgre les variations de charge. Indispensable pour maintenir la frequence a 50/60 Hz." },
      breaker:    { name: "Disjoncteur principal (ACB)",  desc: "Air Circuit Breaker - protege le groupe electrogene contre les surcharges, courts-circuits et inversions de phase. Se declenche automatiquement en cas de defaut." },
      bus:        { name: "Jeu de barres (busbar)",       desc: "Conducteurs de cuivre massif repartissant l'energie electrique vers tous les circuits de distribution. Point de connexion centrale de tous les groupes et consommateurs." },
    },
    couplingSteps: [
      { title: "1. Verification de la tension",    desc: "Verifier que la tension du groupe entrant est egale a la tension du reseau (plus ou moins 5%). Ajuster avec le rheostat d'excitation ou l'AVR." },
      { title: "2. Verification de la frequence", desc: "Verifier que la frequence du groupe entrant est identique au reseau (50 ou 60 Hz plus ou moins 0,5 Hz). Ajuster avec le governor." },
      { title: "3. Verification de la phase",     desc: "Utiliser le synchroscope ou les lampes de synchronisation pour verifier que les phases sont en concordance avant le couplage." },
      { title: "4. Fermeture du disjoncteur",     desc: "Quand le synchroscope indique 12h (phases alignees), fermer le disjoncteur ACB. Le groupe est maintenant en parallele sur le reseau." },
      { title: "5. Repartition de charge",        desc: "Ajuster la charge entre les groupes en modifiant le governor (puissance active - kW) et l'AVR (puissance reactive - kVAR)." },
      { title: "6. Delestage du groupe sortant",  desc: "Transferer progressivement la charge sur le groupe restant, puis ouvrir le disjoncteur du groupe a arreter." },
    ],
    currentTypes: {
      ac3ph:     { name: "Courant alternatif triphase (440V)", desc: "Courant principal a bord. Alimente les gros consommateurs : pompes, compresseurs, treuils, propulsion. 3 phases decalees de 120 degres. Frequence : 50 ou 60 Hz selon le navire." },
      ac1ph:     { name: "Courant alternatif monophase (220V)", desc: "Eclairage, prises de courant, petits equipements. Derive du reseau triphase via transformateur. Disponible dans les cabines et espaces de vie." },
      dc24:      { name: "Courant continu 24V",                desc: "Systemes de controle-commande, alarmes, automatismes, communication interne. Alimente par batteries tampons rechargees en permanence. Fonctionne meme en cas de panne du reseau principal." },
      emergency: { name: "Reseau de secours (Emergency)",      desc: "Reseau alimente par le groupe electrogene de secours. Alimente les circuits vitaux : navigation, communication, pompe incendie, eclairage secours. Doit demarrer en 30 secondes selon SOLAS." },
    },
    protections: {
      overcurrent:   { name: "Protection surintensiteition (OCPS)", desc: "Declenche le disjoncteur si le courant depasse la valeur nominale. Protege cables et equipements contre la surchauffe. Reglee a 110-120% du courant nominal." },
      shortcircuit:  { name: "Protection court-circuit",           desc: "Declenche instantanement en cas de court-circuit. Le courant de court-circuit peut etre 10 a 20 fois le courant nominal. Reaction en millisecondes pour limiter les degats." },
      undervoltage:  { name: "Protection sous-tension",            desc: "Declenche si la tension chute sous un seuil critique (85% de la tension nominale). Protege les moteurs contre les demarrages a basse tension qui surchauffent les bobinages." },
      reversepower:  { name: "Protection puissance inverse",       desc: "Empeche un alternateur couple de 'motorer' (absorber de la puissance au lieu d'en produire). Evite les dommages au moteur diesel entraineur." },
      differential:  { name: "Protection differentielle",          desc: "Compare les courants entrant et sortant de l'alternateur. Tout desequilibre indique un defaut interne - declenche instantanement pour proteger l'enroulement." },
    },
    exercises: [
      { q: "Un groupe electrogene tourne a 1500 tr/min. Quelle est la frequence du courant produit et quelle formule permet de la calculer ?", a: "Frequence f = (n x p) / 60, ou n = vitesse en tr/min et p = nombre de paires de poles. Pour 1500 tr/min avec 2 paires de poles : f = (1500 x 2) / 60 = 50 Hz. Pour 60 Hz, le meme alternateur tournerait a 1800 tr/min. La frequence doit etre maintenue constante (plus ou moins 0,5 Hz) par le governor." },
      { q: "Lors d'un couplage en parallele, vous observez que le synchroscope tourne dans le sens antihoraire. Que devez-vous faire ?", a: "Un synchroscope tournant dans le sens antihoraire indique que le groupe entrant est trop lent (frequence trop basse). Il faut augmenter la vitesse du groupe entrant en agissant sur le governor (acceleration). Si le synchroscope tourne dans le sens horaire, le groupe est trop rapide - il faut le ralentir. On ferme le disjoncteur quand le synchroscope arrive a 12h (position midi) en ralentissant legerement." },
      { q: "Quelle est la difference entre la puissance active (kW) et la puissance reactive (kVAR) a bord d'un navire ? Quel organe controle chacune ?", a: "La puissance active (kW) est la puissance reellement consommee pour effectuer un travail mecanique. Elle est controlee par le governor du moteur diesel (admission de carburant). La puissance reactive (kVAR) est echangee entre le reseau et les charges inductives (moteurs, transformateurs) sans produire de travail utile. Elle est controlee par l'AVR (courant d'excitation de l'alternateur). Le facteur de puissance (cos phi) = kW / kVA. Un facteur de puissance de 0,8 est typique a bord." },
    ],
    bankQuestions: [
      { q: "Quelle formule permet de calculer la frequence produite par un alternateur ?", opts: ["f = n / p","f = (n x p) / 60","f = n x 60 / p","f = p / (n x 60)"], correct: 1, expl: "f = (n x p) / 60, ou n est la vitesse en tr/min et p le nombre de paires de poles. Exemple : 1500 tr/min avec 2 paires de poles donne f = (1500 x 2) / 60 = 50 Hz." },
      { q: "Quel est le role principal de l'AVR (Automatic Voltage Regulator) ?", opts: ["Maintenir la vitesse du moteur diesel constante","Reguler automatiquement la tension de sortie en ajustant le courant d'excitation","Proteger contre les courts-circuits","Synchroniser deux alternateurs"], correct: 1, expl: "L'AVR ajuste le courant d'excitation du rotor pour maintenir la tension de sortie stable a plus ou moins 2% malgre les variations de charge." },
      { q: "En maintenant la vitesse de rotation du moteur diesel constante, le governor controle indirectement :", opts: ["La tension de sortie","La frequence du courant produit","Le facteur de puissance","La puissance reactive"], correct: 1, expl: "La frequence etant directement liee a la vitesse de rotation (f = n x p / 60), le governor, en stabilisant la vitesse, maintient indirectement la frequence a 50 ou 60 Hz." },
      { q: "Quelles sont les trois conditions necessaires pour coupler deux alternateurs en parallele ?", opts: ["Meme couleur de cablage, meme fabricant, meme age","Meme tension, meme frequence, meme phase","Meme puissance nominale uniquement","Aucune condition particuliere"], correct: 1, expl: "Le couplage en parallele exige une tension identique (ajustee par l'AVR), une frequence identique (ajustee par le governor) et une concordance de phase, verifiee au synchroscope." },
      { q: "Sur un synchroscope, une rotation dans le sens horaire indique que le groupe entrant est :", opts: ["Trop lent","Trop rapide","Parfaitement synchronise","En court-circuit"], correct: 1, expl: "Un synchroscope tournant dans le sens horaire signale une frequence trop elevee (groupe trop rapide) ; dans le sens antihoraire, une frequence trop basse (groupe trop lent)." },
      { q: "Quel organe controle la puissance active (kW) produite par un groupe electrogene ?", opts: ["L'AVR","Le governor (admission de carburant)","Le disjoncteur ACB","Le jeu de barres"], correct: 1, expl: "La puissance active depend de l'admission de carburant regulee par le governor, tandis que la puissance reactive (kVAR) est controlee par l'AVR via l'excitation." },
      { q: "Pourquoi un navire possede-t-il generalement plusieurs groupes electrogenes ?", opts: ["Uniquement pour respecter une tradition maritime","Pour la redondance, l'adaptation a la charge et permettre la maintenance sans coupure","Parce qu'un seul groupe ne peut jamais produire assez de courant","Pour reduire le poids total du navire"], correct: 1, expl: "Plusieurs groupes permettent la continuite de service en cas de panne, l'adaptation du nombre de groupes en marche a la charge reelle, et la maintenance d'un groupe pendant que les autres fonctionnent." },
      { q: "Quel est le role du jeu de barres (busbar) sur le tableau principal ?", opts: ["Filtrer les harmoniques du courant","Constituer le point de connexion central ou se couplent les groupes et d'ou partent les circuits","Reguler la tension de chaque alternateur individuellement","Demarrer automatiquement le generateur de secours"], correct: 1, expl: "Le jeu de barres, conducteur de cuivre massif, est le point central du tableau principal ou se connectent tous les groupes electrogenes et d'ou partent tous les circuits de distribution." },
      { q: "Que detecte la protection de puissance inverse (reverse power) ?", opts: ["Une surtension du reseau","Un alternateur couple qui absorbe de la puissance au lieu d'en produire","Un desequilibre entre phases","Une frequence trop elevee"], correct: 1, expl: "Si le moteur diesel entraineur s'arrete ou ralentit trop, l'alternateur se met a fonctionner en moteur et absorbe de la puissance : la protection de puissance inverse detecte ce cas et declenche le disjoncteur pour proteger le moteur." },
      { q: "Selon SOLAS, en combien de temps le generateur de secours doit-il demarrer automatiquement ?", opts: ["5 secondes","45 secondes","5 minutes","1 heure"], correct: 1, expl: "SOLAS impose un demarrage automatique du generateur de secours en 45 secondes maximum apres une perte totale d'alimentation, delai couvert par les batteries d'eclairage transitoire." },
      { q: "Comment doit-on realiser le delestage (transfert de charge) entre deux groupes couples ?", opts: ["En coupant brutalement le disjoncteur du groupe a arreter des que possible","Progressivement, en augmentant la charge d'un groupe pendant qu'on reduit celle de l'autre avant l'ouverture du disjoncteur","En arretant simultanement les deux groupes","Le delestage ne concerne pas les groupes electrogenes"], correct: 1, expl: "Le transfert de charge doit etre progressif (ajustement du governor de chaque groupe) pour eviter les a-coups de tension et de frequence, avant l'ouverture du disjoncteur du groupe a l'arret." },
      { q: "Quelle est la tension principale standard utilisee a bord pour les gros consommateurs (pompes, compresseurs) ?", opts: ["24V DC","220V monophase","440V triphase","12V DC"], correct: 2, expl: "Le 440V triphase alimente les gros consommateurs (moteurs, pompes, compresseurs). Le 220V monophase sert a l'eclairage et aux prises, le 24V DC aux automatismes et alarmes." },
      { q: "Parmi les fonctions suivantes, laquelle N'EST PAS assuree par un disjoncteur ACB ?", opts: ["Protection contre les surintensites","Protection contre les courts-circuits","Regulation de la tension de sortie de l'alternateur","Protection contre la puissance inverse"], correct: 2, expl: "L'ACB protege contre surintensites, courts-circuits, sous-tension et puissance inverse, mais la regulation de la tension de sortie de l'alternateur est assuree par l'AVR, pas par le disjoncteur." },
      { q: "Quelle est la difference principale entre une surcharge et un court-circuit ?", opts: ["Aucune difference, ce sont des synonymes","La surcharge est un courant moderement superieur au nominal (declenchement temporise), le court-circuit est un courant extreme (declenchement instantane)","Le court-circuit est toujours moins dangereux qu'une surcharge","La surcharge ne peut jamais endommager les cables"], correct: 1, expl: "La surcharge (courant legerement superieur au nominal) declenche apres un delai de quelques secondes a minutes ; le court-circuit (10 a 20 fois le nominal) declenche instantanement pour limiter les degats." },
      { q: "Comment ameliore-t-on le facteur de puissance (cos phi) a bord ?", opts: ["En augmentant la vitesse du moteur diesel","Avec des bancs de condensateurs et un reglage adapte de l'AVR","En reduisant le nombre de groupes electrogenes","En augmentant systematiquement la tension du reseau"], correct: 1, expl: "Les bancs de condensateurs compensent la puissance reactive inductive, et un reglage adapte de l'AVR permet de repartir la puissance reactive entre les groupes couples, ameliorant le cos phi." },
    ],
    quiz: [
      { q: "Un alternateur tourne a 1500 tr/min avec 2 paires de poles. Quelle est la frequence produite ?", opts: ["25 Hz", "50 Hz", "60 Hz", "100 Hz"], correct: 1, exp: "f = (n x p) / 60 = (1500 x 2) / 60 = 50 Hz. Pour 60 Hz avec 2 paires de poles, il faudrait tourner a 1800 tr/min." },
      { q: "Quel organe controle la TENSION de sortie de l'alternateur ?", opts: ["Le governor", "Le disjoncteur ACB", "L'AVR (regulateur de tension)", "Le synchroscope"], correct: 2, exp: "L'AVR (Automatic Voltage Regulator) controle la tension en ajustant le courant d'excitation du rotor. Le governor controle la frequence en reglant la vitesse du moteur diesel." },
      { q: "Lors d'un couplage en parallele, le synchroscope tourne dans le sens antihoraire. Que faire ?", opts: ["Fermer immediatement le disjoncteur", "Augmenter la vitesse du groupe entrant (governor)", "Diminuer la tension du groupe entrant (AVR)", "Arreter le groupe entrant"], correct: 1, exp: "Sens antihoraire = groupe entrant trop LENT (frequence trop basse). Il faut augmenter sa vitesse avec le governor pour accelerer jusqu'a ce que la frequence corresponde au reseau." },
      { q: "Quelle est la tension triphasee standard pour les gros consommateurs a bord ?", opts: ["24V", "220V", "440V", "6600V"], correct: 2, exp: "440V triphase est la tension standard pour les gros consommateurs a bord (moteurs, pompes, compresseurs). Le 220V est utilise pour l'eclairage et les prises. Le 24V DC est pour les systemes de controle." },
      { q: "Le groupe electrogene de secours doit demarrer automatiquement en combien de secondes selon SOLAS ?", opts: ["15 secondes", "30 secondes", "60 secondes", "5 minutes"], correct: 1, exp: "SOLAS exige que le groupe electrogene de secours demarre et soit pret a alimenter les circuits vitaux en 30 secondes maximum apres la perte de la source principale." },
    ],
  },

  en: {
    moduleLabel: "ENGINE - AUXILIARIES",
    lessonTitle: "Generators & Electrical Power",
    lessonSub:   "Alternator, AVR, governor, parallel coupling",
    intro: "A vessel is a floating power station. The production, distribution and protection of electrical energy on board are fundamental skills for any engineer or engine room watchkeeper.",
    s1title: "The Generator Set - Anatomy",
    s2title: "Parallel Operation",
    s3title: "Types of Current on Board",
    s4title: "Electrical Network Protection",
    s1hint:  "Tap a component for its description",
    s2hint:  "Navigate through coupling steps",
    s3hint:  "Select a current type",
    s4hint:  "Select a protection",
    exerciseTitle: "Practice Exercises",
    showAnswer: "Show answer",
    hideAnswer: "Hide",
    accidentTitle: "REAL CASE: Blackout and loss of propulsion - MV Dali (Baltimore, 2024)",
    accidentBody: "On 26 March 2024, shortly after leaving the port of Baltimore, the container ship Dali suffered a series of electrical blackouts within minutes. According to the NTSB investigation, a loose electrical connection within the ship's power network worked free under vibration, causing the loss of a generator and a voltage dip that tripped several circuit breakers in cascade, cutting power to the main propulsion and steering gear. Without propulsion or steering, the vessel drifted and struck one of the piers of the Francis Scott Key Bridge, causing its near-total collapse. Six construction workers on the bridge at the time of the collision lost their lives. The crew attempted to respond by switching to the emergency generator and dropping anchor, but the electrical system's response time was not fast enough to restore propulsion before the collision. The investigation found recurring electrical maintenance issues on board. Lesson: a single poorly identified electrical connection fault can trigger a cascade of breaker trips and leave a vessel without any propulsion or steering within seconds.",
    summaryTitle: "Key Points",
    summary: [
      "A vessel has 2 to 4 diesel-alternator generating sets",
      "Standard on-board voltage: 440V (three-phase) for power, 220V for lighting",
      "Parallel operation requires same voltage, same frequency (50/60 Hz) and same phase",
      "Main circuit breaker (ACB) protects the network against overloads and short circuits",
      "Emergency generator starts automatically within 30 seconds (SOLAS)",
      "Frequency formula: f = (n x p) / 60 - 1500 rpm x 2 pole pairs = 50 Hz",
    ],
    quizCTA: "START QUIZ",
    bankStart: "START =>",
    bankNext: "Next question =>",
    bankTrophy: "Well done! Bank completed",
    bankScore: "Bank score",
    components: {
      diesel:     { name: "Driving diesel engine",       desc: "4-stroke diesel engine driving the alternator. Its rotation speed (1500 or 1800 rpm) determines the frequency of the current produced (50 or 60 Hz). The governor maintains constant frequency under varying load." },
      alternator: { name: "Alternator (generator)",      desc: "Rotating machine converting mechanical energy into electrical energy by electromagnetic induction. Produces three-phase AC. Voltage is regulated by the AVR (Automatic Voltage Regulator)." },
      avr:        { name: "AVR - Automatic Voltage Regulator", desc: "Automatically regulates the alternator output voltage by adjusting the excitation current. Maintains stable voltage (plus ou moins 2%) despite load variations." },
      governor:   { name: "Governor - Speed regulator",  desc: "Maintains the diesel engine rotation speed constant despite load variations. Essential for maintaining frequency at 50/60 Hz." },
      breaker:    { name: "Main circuit breaker (ACB)",  desc: "Air Circuit Breaker - protects the generating set against overloads, short circuits and phase inversions. Trips automatically in case of fault." },
      bus:        { name: "Busbar",                      desc: "Solid copper conductors distributing electrical energy to all distribution circuits. Central connection point for all generators and consumers." },
    },
    couplingSteps: [
      { title: "1. Voltage check",           desc: "Verify that the incoming generator voltage equals the busbar voltage (plus ou moins 5%). Adjust with the excitation rheostat or AVR." },
      { title: "2. Frequency check",         desc: "Verify that the incoming generator frequency matches the network (50 or 60 Hz plus ou moins 0.5 Hz). Adjust with the governor." },
      { title: "3. Phase check",             desc: "Use the synchroscope or synchronising lamps to verify phase concordance before closing." },
      { title: "4. Closing the breaker",     desc: "When the synchroscope indicates 12 o'clock (phases aligned), close the ACB. The generator is now running in parallel." },
      { title: "5. Load sharing",            desc: "Adjust load between generators by modifying the governor (active power - kW) and AVR (reactive power - kVAR)." },
      { title: "6. Unloading outgoing gen",  desc: "Progressively transfer load to the remaining generator, then open the breaker of the generator to be stopped." },
    ],
    currentTypes: {
      ac3ph:     { name: "Three-phase AC (440V)", desc: "Main power on board. Feeds large consumers: pumps, compressors, winches, propulsion. 3 phases 120 degres apart. Frequency: 50 or 60 Hz depending on vessel." },
      ac1ph:     { name: "Single-phase AC (220V)", desc: "Lighting, socket outlets, small equipment. Derived from three-phase network via transformer. Available in cabins and accommodation spaces." },
      dc24:      { name: "24V DC",                desc: "Control systems, alarms, automation, internal communications. Fed from buffer batteries continuously recharged. Functions even during main power failure." },
      emergency: { name: "Emergency network",     desc: "Network fed by the emergency generator. Feeds vital circuits: navigation, communication, fire pump, emergency lighting. Must start within 30 seconds per SOLAS." },
    },
    protections: {
      overcurrent:  { name: "Overcurrent protection (OCPS)", desc: "Trips the breaker if current exceeds nominal value. Protects cables and equipment against overheating. Set at 110-120% of nominal current." },
      shortcircuit: { name: "Short-circuit protection",      desc: "Trips instantly on short circuit. Short-circuit current can be 10 to 20 times nominal current. Millisecond reaction to limit damage." },
      undervoltage: { name: "Undervoltage protection",       desc: "Trips if voltage drops below critical threshold (85% of nominal). Protects motors against low-voltage starting which overheats windings." },
      reversepower: { name: "Reverse power protection",      desc: "Prevents a coupled alternator from 'motoring' (absorbing power instead of producing it). Avoids damage to the driving diesel engine." },
      differential: { name: "Differential protection",       desc: "Compares currents entering and leaving the alternator. Any imbalance indicates an internal fault - trips instantly to protect the winding." },
    },
    exercises: [
      { q: "A generating set runs at 1500 rpm. What is the frequency of the current produced and what formula is used?", a: "Frequency f = (n x p) / 60, where n = speed in rpm and p = number of pole pairs. For 1500 rpm with 2 pole pairs: f = (1500 x 2) / 60 = 50 Hz. For 60 Hz, the same alternator would run at 1800 rpm. Frequency must be maintained constant (plus ou moins 0.5 Hz) by the governor." },
      { q: "During parallel operation, you observe the synchroscope rotating anticlockwise. What should you do?", a: "An anticlockwise synchroscope indicates the incoming generator is too slow (frequency too low). Increase the incoming generator speed using the governor (accelerate). If rotating clockwise, generator is too fast - slow it down. Close the breaker when the synchroscope reaches 12 o'clock (noon position) with a slight deceleration tendency." },
      { q: "What is the difference between active power (kW) and reactive power (kVAR) on board? Which device controls each?", a: "Active power (kW) is the power actually consumed to perform mechanical work. Controlled by the diesel engine governor (fuel admission). Reactive power (kVAR) is exchanged between the network and inductive loads (motors, transformers) without producing useful work. Controlled by the AVR (alternator excitation current). Power factor (cos phi) = kW / kVA. A power factor of 0.8 is typical on board." },
    ],
    bankQuestions: [
      { q: "Which formula calculates the frequency produced by an alternator?", opts: ["f = n / p","f = (n x p) / 60","f = n x 60 / p","f = p / (n x 60)"], correct: 1, expl: "f = (n x p) / 60, where n is speed in rpm and p is the number of pole pairs. Example: 1500 rpm with 2 pole pairs gives f = (1500 x 2) / 60 = 50 Hz." },
      { q: "What is the main role of the AVR (Automatic Voltage Regulator)?", opts: ["Keeping the diesel engine speed constant","Automatically regulating output voltage by adjusting excitation current","Protecting against short circuits","Synchronising two alternators"], correct: 1, expl: "The AVR adjusts the rotor excitation current to keep output voltage stable within about 2% despite load variations." },
      { q: "By keeping the diesel engine speed constant, the governor indirectly controls:", opts: ["The output voltage","The frequency of the current produced","The power factor","The reactive power"], correct: 1, expl: "Since frequency is directly linked to rotation speed (f = n x p / 60), the governor, by stabilising speed, indirectly maintains frequency at 50 or 60 Hz." },
      { q: "What are the three conditions required to couple two alternators in parallel?", opts: ["Same cable colour, same manufacturer, same age","Same voltage, same frequency, same phase","Same rated power only","No specific condition"], correct: 1, expl: "Parallel coupling requires identical voltage (adjusted via the AVR), identical frequency (adjusted via the governor), and phase concordance, checked with a synchroscope." },
      { q: "On a synchroscope, a clockwise rotation indicates the incoming generator is:", opts: ["Too slow","Too fast","Perfectly synchronised","Short-circuited"], correct: 1, expl: "A synchroscope rotating clockwise signals a frequency that is too high (generator too fast); anticlockwise signals a frequency too low (generator too slow)." },
      { q: "Which component controls the active power (kW) produced by a generating set?", opts: ["The AVR","The governor (fuel admission)","The ACB circuit breaker","The busbar"], correct: 1, expl: "Active power depends on fuel admission regulated by the governor, while reactive power (kVAR) is controlled by the AVR through excitation." },
      { q: "Why does a vessel usually have several generating sets?", opts: ["Only to follow maritime tradition","For redundancy, load adaptation, and to allow maintenance without interruption","Because a single set can never produce enough current","To reduce the vessel's total weight"], correct: 1, expl: "Multiple sets provide continuity of service if one fails, allow matching the number of running sets to actual load, and permit maintenance of one set while others operate." },
      { q: "What is the role of the busbar on the main switchboard?", opts: ["Filtering current harmonics","Forming the central connection point where sets couple and circuits depart","Regulating each alternator's voltage individually","Automatically starting the emergency generator"], correct: 1, expl: "The busbar, a solid copper conductor, is the central point of the main switchboard where all generating sets connect and all distribution circuits originate." },
      { q: "What does reverse power protection detect?", opts: ["A network overvoltage","A coupled alternator absorbing power instead of producing it","A phase imbalance","A frequency that is too high"], correct: 1, expl: "If the driving diesel engine stops or slows too much, the alternator starts acting as a motor and absorbs power: reverse power protection detects this and trips the breaker to protect the engine." },
      { q: "Per SOLAS, within what time must the emergency generator start automatically?", opts: ["5 seconds","45 seconds","5 minutes","1 hour"], correct: 1, expl: "SOLAS requires the emergency generator to start automatically within 45 seconds of a total power loss, a gap covered by transitional lighting batteries." },
      { q: "How should load transfer between two coupled generators be performed?", opts: ["By abruptly opening the breaker of the set to be stopped as soon as possible","Gradually, increasing one set's load while reducing the other's before opening the breaker","By stopping both sets simultaneously","Load transfer does not apply to generating sets"], correct: 1, expl: "Load transfer must be gradual (adjusting each set's governor) to avoid voltage and frequency transients, before opening the breaker of the set being stopped." },
      { q: "What is the standard main voltage used on board for large loads (pumps, compressors)?", opts: ["24V DC","220V single-phase","440V three-phase","12V DC"], correct: 2, expl: "440V three-phase supplies large loads (motors, pumps, compressors). 220V single-phase serves lighting and sockets, and 24V DC serves controls and alarms." },
      { q: "Which of the following functions is NOT provided by an ACB circuit breaker?", opts: ["Overcurrent protection","Short-circuit protection","Regulating the alternator's output voltage","Reverse power protection"], correct: 2, expl: "The ACB protects against overcurrent, short circuit, undervoltage and reverse power, but regulating the alternator's output voltage is the AVR's job, not the breaker's." },
      { q: "What is the main difference between an overload and a short circuit?", opts: ["No difference, they are synonyms","Overload is a moderately higher-than-nominal current (delayed trip), short circuit is an extreme current (instant trip)","A short circuit is always less dangerous than an overload","An overload can never damage cables"], correct: 1, expl: "Overload (slightly above nominal current) trips after a delay of seconds to minutes; short circuit (10-20 times nominal) trips instantly to limit damage." },
      { q: "How is the power factor (cos phi) improved on board?", opts: ["By increasing the diesel engine speed","With capacitor banks and appropriate AVR adjustment","By reducing the number of generating sets","By systematically increasing network voltage"], correct: 1, expl: "Capacitor banks compensate inductive reactive power, and appropriate AVR adjustment shares reactive power between coupled sets, improving the power factor." },
    ],
    quiz: [
      { q: "An alternator runs at 1500 rpm with 2 pole pairs. What is the frequency produced?", opts: ["25 Hz", "50 Hz", "60 Hz", "100 Hz"], correct: 1, exp: "f = (n x p) / 60 = (1500 x 2) / 60 = 50 Hz. For 60 Hz with 2 pole pairs, speed would need to be 1800 rpm." },
      { q: "Which device controls the alternator output VOLTAGE?", opts: ["The governor", "The ACB circuit breaker", "The AVR (voltage regulator)", "The synchroscope"], correct: 2, exp: "The AVR controls voltage by adjusting rotor excitation current. The governor controls frequency by regulating diesel engine speed." },
      { q: "During parallel operation, the synchroscope rotates anticlockwise. What should you do?", opts: ["Close the breaker immediately", "Increase incoming generator speed (governor)", "Decrease incoming generator voltage (AVR)", "Stop the incoming generator"], correct: 1, exp: "Anticlockwise = incoming generator TOO SLOW (frequency too low). Increase its speed with the governor until frequency matches the network." },
      { q: "What is the standard three-phase voltage for large consumers on board?", opts: ["24V", "220V", "440V", "6600V"], correct: 2, exp: "440V three-phase is the standard voltage for large consumers on board (motors, pumps, compressors). 220V for lighting and sockets. 24V DC for control systems." },
      { q: "The emergency generator must start automatically within how many seconds per SOLAS?", opts: ["15 seconds", "30 seconds", "60 seconds", "5 minutes"], correct: 1, exp: "SOLAS requires the emergency generator to start and be ready to supply vital circuits within 30 seconds maximum after loss of main power." },
    ],
  },

  es: {
    moduleLabel: "MAQUINAS - AUXILIARES",
    lessonTitle: "Generadores y Produccion electrica",
    lessonSub:   "Alternador, AVR, governor, acoplamiento en paralelo",
    intro: "Un buque es una central electrica flotante. La produccion, distribucion y proteccion de la energia electrica a bordo son competencias fundamentales para todo maquinista u oficial de guardia de maquinas.",
    s1title: "El grupo electrogeno - anatomia",
    s2title: "Acoplamiento en paralelo",
    s3title: "Tipos de corriente a bordo",
    s4title: "Proteccion de la red electrica",
    s1hint:  "Toca un componente para ver su descripcion",
    s2hint:  "Navega por los pasos del acoplamiento",
    s3hint:  "Selecciona un tipo de corriente",
    s4hint:  "Selecciona una proteccion",
    exerciseTitle: "Ejercicios Practicos",
    showAnswer: "Ver correccion",
    hideAnswer: "Ocultar",
    accidentTitle: "CASO REAL: Apagon y perdida de propulsion - MV Dali (Baltimore, 2024)",
    accidentBody: "El 26 de marzo de 2024, poco despues de salir del puerto de Baltimore, el portacontenedores Dali sufrio una serie de apagones electricos en cuestion de minutos. Segun la investigacion del NTSB, una conexion electrica floja dentro de la red del buque se solto por vibraciones, causando la perdida de un generador y una caida de tension que disparo en cascada varios disyuntores, cortando la alimentacion de la propulsion principal y del gobierno. Sin propulsion ni gobierno, el buque derivo y choco contra uno de los pilares del puente Francis Scott Key, provocando su colapso casi total. Seis obreros que trabajaban en el puente en el momento de la colision perdieron la vida. La tripulacion intento reaccionar cambiando al generador de emergencia y fondeando las anclas, pero el tiempo de respuesta del sistema electrico no permitio restablecer la propulsion a tiempo para evitar la colision. La investigacion revelo defectos recurrentes de mantenimiento electrico a bordo. Leccion: un simple defecto de conexion electrica mal identificado puede desencadenar una cascada de disparos de disyuntores y dejar a un buque sin propulsion ni gobierno en cuestion de segundos.",
    summaryTitle: "Puntos esenciales",
    summary: [
      "Un buque tiene de 2 a 4 grupos electrogenos diesel-alternador",
      "Tension estandar a bordo: 440V (trifasico) para potencia, 220V para alumbrado",
      "El acoplamiento en paralelo requiere misma tension, misma frecuencia (50/60 Hz) y misma fase",
      "El disyuntor principal (ACB) protege la red contra sobrecargas y cortocircuitos",
      "El generador de emergencia arranca automaticamente en 30s (SOLAS)",
      "Formula frecuencia: f = (n x p) / 60 - 1500 rpm x 2 pares de polos = 50 Hz",
    ],
    quizCTA: "COMENZAR EL QUIZ",
    bankStart: "COMENZAR =>",
    bankNext: "Siguiente pregunta =>",
    bankTrophy: "Enhorabuena! Banco completado",
    bankScore: "Puntuacion banco",
    components: {
      diesel:     { name: "Motor diesel de accionamiento", desc: "Motor diesel de 4 tiempos que acciona el alternador. Su velocidad de giro (1500 o 1800 rpm) determina la frecuencia de la corriente producida (50 o 60 Hz). El governor mantiene la frecuencia constante bajo carga variable." },
      alternator: { name: "Alternador (generador)",        desc: "Maquina giratoria que convierte energia mecanica en electrica por induccion electromagnetica. Produce corriente alterna trifasica. La tension es regulada por el AVR." },
      avr:        { name: "AVR - Regulador de tension",    desc: "Regula automaticamente la tension de salida del alternador ajustando la corriente de excitacion. Mantiene la tension estable (plus ou moins 2%) a pesar de las variaciones de carga." },
      governor:   { name: "Governor - Regulador velocidad", desc: "Mantiene constante la velocidad de rotacion del motor diesel a pesar de las variaciones de carga. Indispensable para mantener la frecuencia a 50/60 Hz." },
      breaker:    { name: "Disyuntor principal (ACB)",     desc: "Air Circuit Breaker - protege el grupo electrogeno contra sobrecargas, cortocircuitos e inversiones de fase. Se dispara automaticamente en caso de fallo." },
      bus:        { name: "Barras colectoras (busbar)",    desc: "Conductores de cobre macizo que distribuyen la energia electrica a todos los circuitos de distribucion. Punto de conexion central de todos los grupos y consumidores." },
    },
    couplingSteps: [
      { title: "1. Verificacion de tension",    desc: "Verificar que la tension del grupo entrante sea igual a la de la red (plus ou moins 5%). Ajustar con el reostato de excitacion o el AVR." },
      { title: "2. Verificacion de frecuencia", desc: "Verificar que la frecuencia del grupo entrante sea identica a la red (50 o 60 Hz plus ou moins 0,5 Hz). Ajustar con el governor." },
      { title: "3. Verificacion de fase",       desc: "Usar el sincronoscopio o las lamparas de sincronizacion para verificar que las fases estan en concordancia antes del acoplamiento." },
      { title: "4. Cierre del disyuntor",       desc: "Cuando el sincronoscopio indica las 12 (fases alineadas), cerrar el disyuntor ACB. El grupo ya esta en paralelo con la red." },
      { title: "5. Reparto de carga",           desc: "Ajustar la carga entre los grupos modificando el governor (potencia activa - kW) y el AVR (potencia reactiva - kVAR)." },
      { title: "6. Descarga del grupo saliente", desc: "Transferir progresivamente la carga al grupo restante, luego abrir el disyuntor del grupo a parar." },
    ],
    currentTypes: {
      ac3ph:     { name: "Corriente alterna trifasica (440V)", desc: "Corriente principal a bordo. Alimenta grandes consumidores: bombas, compresores, maquinillas, propulsion. 3 fases desfasadas 120 degres. Frecuencia: 50 o 60 Hz segun el buque." },
      ac1ph:     { name: "Corriente alterna monofasica (220V)", desc: "Alumbrado, tomas de corriente, pequenos equipos. Derivada de la red trifasica mediante transformador. Disponible en camarotes y zonas de alojamiento." },
      dc24:      { name: "Corriente continua 24V",              desc: "Sistemas de control-mando, alarmas, automatismos, comunicacion interna. Alimentado por baterias tampon recargadas permanentemente. Funciona incluso en caso de fallo de la red principal." },
      emergency: { name: "Red de emergencia",                   desc: "Red alimentada por el generador de emergencia. Alimenta circuitos vitales: navegacion, comunicacion, bomba de incendios, alumbrado de emergencia. Debe arrancar en 30 segundos segun SOLAS." },
    },
    protections: {
      overcurrent:  { name: "Proteccion de sobreintensidad (OCPS)", desc: "Dispara el disyuntor si la corriente supera el valor nominal. Protege cables y equipos contra el sobrecalentamiento. Ajustada al 110-120% de la corriente nominal." },
      shortcircuit: { name: "Proteccion de cortocircuito",           desc: "Dispara instantaneamente en caso de cortocircuito. La corriente de cortocircuito puede ser 10 a 20 veces la nominal. Reaccion en milisegundos para limitar danos." },
      undervoltage: { name: "Proteccion de subtension",              desc: "Dispara si la tension cae por debajo del umbral critico (85% de la nominal). Protege los motores contra arranques a baja tension que sobrecalientan los devanados." },
      reversepower: { name: "Proteccion de potencia inversa",        desc: "Impide que un alternador acoplado 'motorice' (absorba potencia en lugar de producirla). Evita danos al motor diesel de accionamiento." },
      differential: { name: "Proteccion diferencial",               desc: "Compara las corrientes de entrada y salida del alternador. Cualquier desequilibrio indica un fallo interno - dispara instantaneamente para proteger el devanado." },
    },
    exercises: [
      { q: "Un grupo electrogeno gira a 1500 rpm. Cual es la frecuencia de la corriente producida y que formula permite calcularla?", a: "Frecuencia f = (n x p) / 60, donde n = velocidad en rpm y p = numero de pares de polos. Para 1500 rpm con 2 pares de polos: f = (1500 x 2) / 60 = 50 Hz. Para 60 Hz, el mismo alternador giraria a 1800 rpm. La frecuencia debe mantenerse constante (plus ou moins 0,5 Hz) por el governor." },
      { q: "Durante un acoplamiento en paralelo, observa que el sincronoscopio gira en sentido antihorario. Que debe hacer?", a: "Un sincronoscopio girando en sentido antihorario indica que el grupo entrante es demasiado lento (frecuencia demasiado baja). Hay que aumentar la velocidad del grupo entrante actuando sobre el governor (aceleracion). Si el sincronoscopio gira en sentido horario, el grupo es demasiado rapido - hay que frenarlo. Se cierra el disyuntor cuando el sincronoscopio llega a las 12 (posicion mediodia) con ligera tendencia a desacelerar." },
      { q: "Cual es la diferencia entre potencia activa (kW) y potencia reactiva (kVAR) a bordo? Que organo controla cada una?", a: "La potencia activa (kW) es la potencia realmente consumida para realizar un trabajo mecanico. Se controla con el governor del motor diesel (admision de combustible). La potencia reactiva (kVAR) se intercambia entre la red y las cargas inductivas (motores, transformadores) sin producir trabajo util. Se controla con el AVR (corriente de excitacion del alternador). Factor de potencia (cos phi) = kW / kVA. Un factor de 0,8 es tipico a bordo." },
    ],
    bankQuestions: [
      { q: "Que formula permite calcular la frecuencia producida por un alternador?", opts: ["f = n / p","f = (n x p) / 60","f = n x 60 / p","f = p / (n x 60)"], correct: 1, expl: "f = (n x p) / 60, donde n es la velocidad en rpm y p el numero de pares de polos. Ejemplo: 1500 rpm con 2 pares de polos da f = (1500 x 2) / 60 = 50 Hz." },
      { q: "Cual es la funcion principal del AVR (Automatic Voltage Regulator)?", opts: ["Mantener constante la velocidad del motor diesel","Regular automaticamente la tension de salida ajustando la corriente de excitacion","Proteger contra cortocircuitos","Sincronizar dos alternadores"], correct: 1, expl: "El AVR ajusta la corriente de excitacion del rotor para mantener la tension de salida estable en torno al 2% pese a las variaciones de carga." },
      { q: "Al mantener constante la velocidad de rotacion del motor diesel, el governor controla indirectamente:", opts: ["La tension de salida","La frecuencia de la corriente producida","El factor de potencia","La potencia reactiva"], correct: 1, expl: "Al estar la frecuencia directamente ligada a la velocidad de rotacion (f = n x p / 60), el governor, al estabilizar la velocidad, mantiene indirectamente la frecuencia a 50 o 60 Hz." },
      { q: "Cuales son las tres condiciones necesarias para acoplar dos alternadores en paralelo?", opts: ["Mismo color de cableado, mismo fabricante, misma antiguedad","Misma tension, misma frecuencia, misma fase","Solo la misma potencia nominal","Ninguna condicion particular"], correct: 1, expl: "El acoplamiento en paralelo exige una tension identica (ajustada con el AVR), una frecuencia identica (ajustada con el governor) y una concordancia de fase, verificada con el sincronoscopio." },
      { q: "En un sincronoscopio, una rotacion en sentido horario indica que el grupo entrante esta:", opts: ["Demasiado lento","Demasiado rapido","Perfectamente sincronizado","En cortocircuito"], correct: 1, expl: "Un sincronoscopio que gira en sentido horario indica una frecuencia demasiado alta (grupo demasiado rapido); en sentido antihorario, una frecuencia demasiado baja (grupo demasiado lento)." },
      { q: "Que organo controla la potencia activa (kW) producida por un grupo electrogeno?", opts: ["El AVR","El governor (admision de combustible)","El disyuntor ACB","Las barras colectoras"], correct: 1, expl: "La potencia activa depende de la admision de combustible regulada por el governor, mientras que la potencia reactiva (kVAR) esta controlada por el AVR mediante la excitacion." },
      { q: "Por que un buque suele tener varios grupos electrogenos?", opts: ["Solo por tradicion maritima","Por redundancia, adaptacion a la carga y para permitir el mantenimiento sin interrupcion","Porque un solo grupo nunca puede producir suficiente corriente","Para reducir el peso total del buque"], correct: 1, expl: "Varios grupos permiten continuidad de servicio si uno falla, adaptar el numero de grupos en marcha a la carga real, y realizar mantenimiento de un grupo mientras los demas funcionan." },
      { q: "Cual es la funcion de las barras colectoras (busbar) en el cuadro principal?", opts: ["Filtrar los armonicos de la corriente","Constituir el punto de conexion central donde se acoplan los grupos y de donde salen los circuitos","Regular la tension de cada alternador individualmente","Arrancar automaticamente el generador de emergencia"], correct: 1, expl: "Las barras colectoras, conductor de cobre macizo, son el punto central del cuadro principal donde se conectan todos los grupos electrogenos y de donde parten todos los circuitos de distribucion." },
      { q: "Que detecta la proteccion de potencia inversa (reverse power)?", opts: ["Una sobretension de la red","Un alternador acoplado que absorbe potencia en lugar de producirla","Un desequilibrio entre fases","Una frecuencia demasiado alta"], correct: 1, expl: "Si el motor diesel de arrastre se para o ralentiza demasiado, el alternador empieza a funcionar como motor y absorbe potencia: la proteccion de potencia inversa detecta esto y dispara el disyuntor." },
      { q: "Segun SOLAS, en cuanto tiempo debe arrancar automaticamente el generador de emergencia?", opts: ["5 segundos","45 segundos","5 minutos","1 hora"], correct: 1, expl: "SOLAS exige que el generador de emergencia arranque automaticamente en 45 segundos maximo tras una perdida total de alimentacion, intervalo cubierto por las baterias de alumbrado transitorio." },
      { q: "Como debe realizarse el trasvase de carga entre dos grupos acoplados?", opts: ["Cortando bruscamente el disyuntor del grupo a parar lo antes posible","Progresivamente, aumentando la carga de un grupo mientras se reduce la del otro antes de abrir el disyuntor","Parando simultaneamente ambos grupos","El trasvase de carga no se aplica a los grupos electrogenos"], correct: 1, expl: "El trasvase de carga debe ser progresivo (ajuste del governor de cada grupo) para evitar variaciones bruscas de tension y frecuencia, antes de abrir el disyuntor del grupo que se detiene." },
      { q: "Cual es la tension principal estandar usada a bordo para grandes consumidores (bombas, compresores)?", opts: ["24V DC","220V monofasico","440V trifasico","12V DC"], correct: 2, expl: "El 440V trifasico alimenta los grandes consumidores (motores, bombas, compresores). El 220V monofasico sirve para alumbrado y tomas, el 24V DC para automatismos y alarmas." },
      { q: "De las siguientes funciones, cual NO la realiza un disyuntor ACB?", opts: ["Proteccion contra sobreintensidades","Proteccion contra cortocircuitos","Regulacion de la tension de salida del alternador","Proteccion contra potencia inversa"], correct: 2, expl: "El ACB protege contra sobreintensidades, cortocircuitos, subtension y potencia inversa, pero la regulacion de la tension de salida del alternador la realiza el AVR, no el disyuntor." },
      { q: "Cual es la diferencia principal entre una sobrecarga y un cortocircuito?", opts: ["Ninguna diferencia, son sinonimos","La sobrecarga es una corriente moderadamente superior a la nominal (disparo con retardo), el cortocircuito es una corriente extrema (disparo instantaneo)","El cortocircuito siempre es menos peligroso que una sobrecarga","La sobrecarga nunca puede danar los cables"], correct: 1, expl: "La sobrecarga (corriente ligeramente superior a la nominal) dispara tras un retardo de segundos a minutos; el cortocircuito (10 a 20 veces la nominal) dispara instantaneamente para limitar los danos." },
      { q: "Como se mejora el factor de potencia (cos phi) a bordo?", opts: ["Aumentando la velocidad del motor diesel","Con bancos de condensadores y un ajuste adecuado del AVR","Reduciendo el numero de grupos electrogenos","Aumentando sistematicamente la tension de la red"], correct: 1, expl: "Los bancos de condensadores compensan la potencia reactiva inductiva, y un ajuste adecuado del AVR permite repartir la potencia reactiva entre los grupos acoplados, mejorando el cos phi." },
    ],
    quiz: [
      { q: "Un alternador gira a 1500 rpm con 2 pares de polos. Cual es la frecuencia producida?", opts: ["25 Hz", "50 Hz", "60 Hz", "100 Hz"], correct: 1, exp: "f = (n x p) / 60 = (1500 x 2) / 60 = 50 Hz. Para 60 Hz con 2 pares de polos, habria que girar a 1800 rpm." },
      { q: "Que organo controla la TENSION de salida del alternador?", opts: ["El governor", "El disyuntor ACB", "El AVR (regulador de tension)", "El sincronoscopio"], correct: 2, exp: "El AVR controla la tension ajustando la corriente de excitacion del rotor. El governor controla la frecuencia regulando la velocidad del motor diesel." },
      { q: "Durante un acoplamiento en paralelo, el sincronoscopio gira en sentido antihorario. Que hacer?", opts: ["Cerrar el disyuntor inmediatamente", "Aumentar la velocidad del grupo entrante (governor)", "Disminuir la tension del grupo entrante (AVR)", "Parar el grupo entrante"], correct: 1, exp: "Sentido antihorario = grupo entrante demasiado LENTO (frecuencia baja). Aumentar su velocidad con el governor hasta que la frecuencia coincida con la red." },
      { q: "Cual es la tension trifasica estandar para los grandes consumidores a bordo?", opts: ["24V", "220V", "440V", "6600V"], correct: 2, exp: "440V trifasico es la tension estandar para grandes consumidores (motores, bombas, compresores). 220V para alumbrado y tomas. 24V DC para control." },
      { q: "El generador de emergencia debe arrancar automaticamente en cuantos segundos segun SOLAS?", opts: ["15 segundos", "30 segundos", "60 segundos", "5 minutos"], correct: 1, exp: "SOLAS exige que el generador de emergencia arranque y este listo para alimentar los circuitos vitales en 30 segundos maximo tras la perdida de la fuente principal." },
    ],
  },

  pt: {
    moduleLabel: "MAQUINAS - AUXILIARES",
    lessonTitle: "Geradores e Producao eletrica",
    lessonSub:   "Alternador, AVR, governor, operacao em paralelo",
    intro: "Um navio e uma central eletrica flutuante. A producao, distribuicao e protecao da energia eletrica a bordo sao competencias fundamentais para qualquer maquinista ou oficial de quarto de maquinas.",
    s1title: "O grupo gerador - anatomia",
    s2title: "Operacao em Paralelo",
    s3title: "Tipos de Corrente a Bordo",
    s4title: "Protecao da Rede Eletrica",
    s1hint:  "Toque num componente para ver a descricao",
    s2hint:  "Navegue pelos passos do acoplamento",
    s3hint:  "Selecione um tipo de corrente",
    s4hint:  "Selecione uma protecao",
    exerciseTitle: "Exercicios Praticos",
    showAnswer: "Ver correcao",
    hideAnswer: "Ocultar",
    accidentTitle: "CASO REAL: Apagao e perda de propulsao - MV Dali (Baltimore, 2024)",
    accidentBody: "Em 26 de marco de 2024, pouco depois de deixar o porto de Baltimore, o porta-conteineres Dali sofreu uma serie de apagoes eletricos em poucos minutos. Segundo a investigacao do NTSB, uma ligacao eletrica solta dentro da rede do navio soltou-se devido a vibracao, causando a perda de um gerador e uma queda de tensao que disparou em cascata varios disjuntores, cortando a alimentacao da propulsao principal e do leme. Sem propulsao nem governo, o navio derivou e colidiu com um dos pilares da ponte Francis Scott Key, causando o seu colapso quase total. Seis operarios que trabalhavam na ponte no momento da colisao perderam a vida. A tripulacao tentou reagir mudando para o gerador de emergencia e largando as ancoras, mas o tempo de resposta do sistema eletrico nao permitiu restabelecer a propulsao a tempo de evitar a colisao. A investigacao revelou falhas recorrentes de manutencao eletrica a bordo. Licao: uma simples falha de ligacao eletrica mal identificada pode desencadear uma cascata de disparos de disjuntores e deixar um navio sem propulsao nem governo em poucos segundos.",
    summaryTitle: "Pontos essenciais",
    summary: [
      "Um navio tem 2 a 4 grupos geradores diesel-alternador",
      "Tensao padrao a bordo: 440V (trifasico) para potencia, 220V para iluminacao",
      "A operacao em paralelo requer mesma tensao, mesma frequencia (50/60 Hz) e mesma fase",
      "O disjuntor principal (ACB) protege a rede contra sobrecargas e curto-circuitos",
      "O gerador de emergencia arranca automaticamente em 30s (SOLAS)",
      "Formula frequencia: f = (n x p) / 60 - 1500 rpm x 2 pares de polos = 50 Hz",
    ],
    quizCTA: "COMECAR O QUIZ",
    bankStart: "COMECAR =>",
    bankNext: "Proxima pergunta =>",
    bankTrophy: "Parabens! Banco concluido",
    bankScore: "Pontuacao banco",
    components: {
      diesel:     { name: "Motor diesel de acionamento",  desc: "Motor diesel de 4 tempos que aciona o alternador. A sua velocidade de rotacao (1500 ou 1800 rpm) determina a frequencia da corrente produzida (50 ou 60 Hz). O governor mantém a frequencia constante sob carga variavel." },
      alternator: { name: "Alternador (gerador)",         desc: "Maquina rotativa que converte energia mecanica em eletrica por inducao eletromagnetica. Produz corrente alternada trifasica. A tensao e regulada pelo AVR." },
      avr:        { name: "AVR - Regulador de tensao",    desc: "Regula automaticamente a tensao de saida do alternador ajustando a corrente de excitacao. Mantem a tensao estavel (plus ou moins 2%) apesar das variacoes de carga." },
      governor:   { name: "Governor - Regulador velocidade", desc: "Mantem a velocidade de rotacao do motor diesel constante apesar das variacoes de carga. Indispensavel para manter a frequencia a 50/60 Hz." },
      breaker:    { name: "Disjuntor principal (ACB)",    desc: "Air Circuit Breaker - protege o grupo gerador contra sobrecargas, curto-circuitos e inversoes de fase. Dispara automaticamente em caso de defeito." },
      bus:        { name: "Barras coletoras (busbar)",    desc: "Condutores de cobre macico que distribuem a energia eletrica a todos os circuitos de distribuicao. Ponto de ligacao central de todos os grupos e consumidores." },
    },
    couplingSteps: [
      { title: "1. Verificacao de tensao",    desc: "Verificar que a tensao do grupo entrante e igual a tensao da rede (plus ou moins 5%). Ajustar com o reostato de excitacao ou o AVR." },
      { title: "2. Verificacao de frequencia", desc: "Verificar que a frequencia do grupo entrante e identica a da rede (50 ou 60 Hz plus ou moins 0,5 Hz). Ajustar com o governor." },
      { title: "3. Verificacao de fase",      desc: "Usar o sincronoscópio ou as lampadas de sincronizacao para verificar a concordancia de fases antes do acoplamento." },
      { title: "4. Fecho do disjuntor",       desc: "Quando o sincronoscópio indica 12h (fases alinhadas), fechar o disjuntor ACB. O grupo esta agora em paralelo com a rede." },
      { title: "5. Reparticao de carga",      desc: "Ajustar a carga entre os grupos modificando o governor (potencia ativa - kW) e o AVR (potencia reativa - kVAR)." },
      { title: "6. Descarga do grupo sainte", desc: "Transferir progressivamente a carga para o grupo restante, depois abrir o disjuntor do grupo a parar." },
    ],
    currentTypes: {
      ac3ph:     { name: "Corrente alternada trifasica (440V)", desc: "Corrente principal a bordo. Alimenta grandes consumidores: bombas, compressores, guinchos, propulsao. 3 fases desfasadas 120 degres. Frequencia: 50 ou 60 Hz conforme o navio." },
      ac1ph:     { name: "Corrente alternada monofasica (220V)", desc: "Iluminacao, tomadas de corrente, pequenos equipamentos. Derivada da rede trifasica via transformador. Disponivel nas cabinas e espacos de alojamento." },
      dc24:      { name: "Corrente continua 24V",               desc: "Sistemas de controlo-comando, alarmes, automatismos, comunicacao interna. Alimentado por baterias tampao continuamente recarregadas. Funciona mesmo em caso de falha da rede principal." },
      emergency: { name: "Rede de emergencia",                  desc: "Rede alimentada pelo gerador de emergencia. Alimenta circuitos vitais: navegacao, comunicacao, bomba de incendio, iluminacao de emergencia. Deve arrancar em 30 segundos segundo o SOLAS." },
    },
    protections: {
      overcurrent:  { name: "Protecao de sobrecorrente (OCPS)", desc: "Dispara o disjuntor se a corrente exceder o valor nominal. Protege cabos e equipamentos contra sobreaquecimento. Regulada a 110-120% da corrente nominal." },
      shortcircuit: { name: "Protecao de curto-circuito",       desc: "Dispara instantaneamente em caso de curto-circuito. A corrente de curto-circuito pode ser 10 a 20 vezes a nominal. Reacao em milissegundos para limitar danos." },
      undervoltage: { name: "Protecao de subtensao",            desc: "Dispara se a tensao cair abaixo do limiar critico (85% da nominal). Protege os motores contra arranques a baixa tensao que sobreaquece os enrolamentos." },
      reversepower: { name: "Protecao de potencia inversa",     desc: "Impede que um alternador acoplado 'motorize' (absorva potencia em vez de a produzir). Evita danos ao motor diesel de acionamento." },
      differential: { name: "Protecao diferencial",             desc: "Compara as correntes de entrada e saida do alternador. Qualquer desequilibrio indica um defeito interno - dispara instantaneamente para proteger o enrolamento." },
    },
    exercises: [
      { q: "Um grupo gerador gira a 1500 rpm. Qual e a frequencia da corrente produzida e que formula permite calcula-la?", a: "Frequencia f = (n x p) / 60, onde n = velocidade em rpm e p = numero de pares de polos. Para 1500 rpm com 2 pares de polos: f = (1500 x 2) / 60 = 50 Hz. Para 60 Hz, o mesmo alternador giraria a 1800 rpm. A frequencia deve ser mantida constante (plus ou moins 0,5 Hz) pelo governor." },
      { q: "Durante uma operacao em paralelo, observa que o sincronoscópio gira no sentido anti-horario. O que deve fazer?", a: "Um sincronoscópio girando no sentido anti-horario indica que o grupo entrante e demasiado lento (frequencia demasiado baixa). Aumentar a velocidade do grupo entrante atuando no governor (aceleracao). Se girar no sentido horario, o grupo e demasiado rapido - trava-lo. Fechar o disjuntor quando o sincronoscópio chega as 12h (posicao meio-dia) com ligeira tendencia a desacelerar." },
      { q: "Qual e a diferenca entre potencia ativa (kW) e potencia reativa (kVAR) a bordo? Que orgao controla cada uma?", a: "A potencia ativa (kW) e a potencia realmente consumida para realizar trabalho mecanico. Controlada pelo governor do motor diesel (admissao de combustivel). A potencia reativa (kVAR) e trocada entre a rede e as cargas indutivas (motores, transformadores) sem produzir trabalho util. Controlada pelo AVR (corrente de excitacao do alternador). Fator de potencia (cos phi) = kW / kVA. Um fator de 0,8 e tipico a bordo." },
    ],
    bankQuestions: [
      { q: "Qual formula permite calcular a frequencia produzida por um alternador?", opts: ["f = n / p","f = (n x p) / 60","f = n x 60 / p","f = p / (n x 60)"], correct: 1, expl: "f = (n x p) / 60, onde n e a velocidade em rpm e p o numero de pares de polos. Exemplo: 1500 rpm com 2 pares de polos da f = (1500 x 2) / 60 = 50 Hz." },
      { q: "Qual e o papel principal do AVR (Automatic Voltage Regulator)?", opts: ["Manter a velocidade do motor diesel constante","Regular automaticamente a tensao de saida ajustando a corrente de excitacao","Proteger contra curto-circuitos","Sincronizar dois alternadores"], correct: 1, expl: "O AVR ajusta a corrente de excitacao do rotor para manter a tensao de saida estavel em torno de 2% apesar das variacoes de carga." },
      { q: "Ao manter a velocidade de rotacao do motor diesel constante, o governor controla indiretamente:", opts: ["A tensao de saida","A frequencia da corrente produzida","O fator de potencia","A potencia reativa"], correct: 1, expl: "Estando a frequencia diretamente ligada a velocidade de rotacao (f = n x p / 60), o governor, ao estabilizar a velocidade, mantem indiretamente a frequencia a 50 ou 60 Hz." },
      { q: "Quais sao as tres condicoes necessarias para acoplar dois alternadores em paralelo?", opts: ["Mesma cor de cabo, mesmo fabricante, mesma idade","Mesma tensao, mesma frequencia, mesma fase","Apenas a mesma potencia nominal","Nenhuma condicao particular"], correct: 1, expl: "O acoplamento em paralelo exige tensao identica (ajustada com o AVR), frequencia identica (ajustada com o governor) e concordancia de fase, verificada com o sincronoscopio." },
      { q: "Num sincronoscopio, uma rotacao no sentido horario indica que o grupo entrante esta:", opts: ["Demasiado lento","Demasiado rapido","Perfeitamente sincronizado","Em curto-circuito"], correct: 1, expl: "Um sincronoscopio a girar no sentido horario indica uma frequencia demasiado alta (grupo demasiado rapido); no sentido anti-horario, uma frequencia demasiado baixa (grupo demasiado lento)." },
      { q: "Que orgao controla a potencia ativa (kW) produzida por um grupo gerador?", opts: ["O AVR","O governor (admissao de combustivel)","O disjuntor ACB","As barras coletoras"], correct: 1, expl: "A potencia ativa depende da admissao de combustivel regulada pelo governor, enquanto a potencia reativa (kVAR) e controlada pelo AVR atraves da excitacao." },
      { q: "Por que um navio geralmente tem varios grupos geradores?", opts: ["Apenas por tradicao maritima","Por redundancia, adaptacao a carga e para permitir manutencao sem interrupcao","Porque um unico grupo nunca pode produzir corrente suficiente","Para reduzir o peso total do navio"], correct: 1, expl: "Varios grupos permitem continuidade de servico se um falhar, adaptar o numero de grupos em funcionamento a carga real, e realizar manutencao de um grupo enquanto os outros funcionam." },
      { q: "Qual e o papel das barras coletoras (busbar) no quadro principal?", opts: ["Filtrar os harmonicos da corrente","Constituir o ponto de ligacao central onde os grupos se acoplam e de onde partem os circuitos","Regular a tensao de cada alternador individualmente","Arrancar automaticamente o gerador de emergencia"], correct: 1, expl: "As barras coletoras, condutor de cobre macico, sao o ponto central do quadro principal onde se ligam todos os grupos geradores e de onde partem todos os circuitos de distribuicao." },
      { q: "O que deteta a protecao de potencia inversa (reverse power)?", opts: ["Uma sobretensao da rede","Um alternador acoplado que absorve potencia em vez de a produzir","Um desequilibrio entre fases","Uma frequencia demasiado alta"], correct: 1, expl: "Se o motor diesel de arrasto parar ou abrandar demasiado, o alternador passa a funcionar como motor e absorve potencia: a protecao de potencia inversa deteta isto e dispara o disjuntor." },
      { q: "Segundo o SOLAS, em quanto tempo o gerador de emergencia deve arrancar automaticamente?", opts: ["5 segundos","45 segundos","5 minutos","1 hora"], correct: 1, expl: "O SOLAS exige que o gerador de emergencia arranque automaticamente em 45 segundos no maximo apos uma perda total de alimentacao, intervalo coberto pelas baterias de iluminacao transitoria." },
      { q: "Como deve ser realizada a transferencia de carga entre dois grupos acoplados?", opts: ["Cortando abruptamente o disjuntor do grupo a parar o mais rapido possivel","Progressivamente, aumentando a carga de um grupo enquanto se reduz a do outro antes de abrir o disjuntor","Parando simultaneamente os dois grupos","A transferencia de carga nao se aplica a grupos geradores"], correct: 1, expl: "A transferencia de carga deve ser progressiva (ajuste do governor de cada grupo) para evitar variacoes bruscas de tensao e frequencia, antes de abrir o disjuntor do grupo a parar." },
      { q: "Qual e a tensao principal padrao usada a bordo para grandes consumidores (bombas, compressores)?", opts: ["24V DC","220V monofasico","440V trifasico","12V DC"], correct: 2, expl: "O 440V trifasico alimenta os grandes consumidores (motores, bombas, compressores). O 220V monofasico serve para iluminacao e tomadas, o 24V DC para automatismos e alarmes." },
      { q: "Das funcoes seguintes, qual NAO e garantida por um disjuntor ACB?", opts: ["Protecao contra sobrecorrentes","Protecao contra curto-circuitos","Regulacao da tensao de saida do alternador","Protecao contra potencia inversa"], correct: 2, expl: "O ACB protege contra sobrecorrentes, curto-circuitos, subtensao e potencia inversa, mas a regulacao da tensao de saida do alternador e feita pelo AVR, nao pelo disjuntor." },
      { q: "Qual e a diferenca principal entre uma sobrecarga e um curto-circuito?", opts: ["Nenhuma diferenca, sao sinonimos","A sobrecarga e uma corrente moderadamente superior a nominal (disparo com atraso), o curto-circuito e uma corrente extrema (disparo instantaneo)","O curto-circuito e sempre menos perigoso que uma sobrecarga","A sobrecarga nunca pode danificar os cabos"], correct: 1, expl: "A sobrecarga (corrente ligeiramente superior a nominal) dispara apos um atraso de segundos a minutos; o curto-circuito (10 a 20 vezes a nominal) dispara instantaneamente para limitar os danos." },
      { q: "Como se melhora o fator de potencia (cos phi) a bordo?", opts: ["Aumentando a velocidade do motor diesel","Com bancos de condensadores e um ajuste adequado do AVR","Reduzindo o numero de grupos geradores","Aumentando sistematicamente a tensao da rede"], correct: 1, expl: "Os bancos de condensadores compensam a potencia reativa indutiva, e um ajuste adequado do AVR permite repartir a potencia reativa entre os grupos acoplados, melhorando o cos phi." },
    ],
    quiz: [
      { q: "Um alternador gira a 1500 rpm com 2 pares de polos. Qual e a frequencia produzida?", opts: ["25 Hz", "50 Hz", "60 Hz", "100 Hz"], correct: 1, exp: "f = (n x p) / 60 = (1500 x 2) / 60 = 50 Hz. Para 60 Hz com 2 pares de polos, seria necessario girar a 1800 rpm." },
      { q: "Que dispositivo controla a TENSAO de saida do alternador?", opts: ["O governor", "O disjuntor ACB", "O AVR (regulador de tensao)", "O sincronoscópio"], correct: 2, exp: "O AVR controla a tensao ajustando a corrente de excitacao do rotor. O governor controla a frequencia regulando a velocidade do motor diesel." },
      { q: "Durante a operacao em paralelo, o sincronoscópio gira no sentido anti-horario. O que fazer?", opts: ["Fechar o disjuntor imediatamente", "Aumentar a velocidade do grupo entrante (governor)", "Diminuir a tensao do grupo entrante (AVR)", "Parar o grupo entrante"], correct: 1, exp: "Sentido anti-horario = grupo entrante DEMASIADO LENTO (frequencia baixa). Aumentar a velocidade com o governor ate a frequencia coincidir com a rede." },
      { q: "Qual e a tensao trifasica padrao para grandes consumidores a bordo?", opts: ["24V", "220V", "440V", "6600V"], correct: 2, exp: "440V trifasico e a tensao padrao para grandes consumidores (motores, bombas, compressores). 220V para iluminacao e tomadas. 24V DC para controlo." },
      { q: "O gerador de emergencia deve arrancar automaticamente em quantos segundos segundo o SOLAS?", opts: ["15 segundos", "30 segundos", "60 segundos", "5 minutos"], correct: 1, exp: "O SOLAS exige que o gerador de emergencia arranque e esteja pronto a alimentar circuitos vitais em 30 segundos maximo apos a perda da fonte principal." },
    ],
  },
};

// ── SVG 1 - GENERATOR ANATOMY ────────────────────────────────
function GeneratorAnatomySVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const comps = t.components;
  const compColors: Record<string,string> = {
    diesel:C.warn, alternator:C.cyan, avr:C.amber,
    governor:C.green, breaker:C.red, bus:C.purple,
  };
  const compLabels: Record<string,string> = {
    diesel:"DIESEL", alternator:"ALT", avr:"AVR",
    governor:"GOV", breaker:"ACB", bus:"BUS",
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.cyan}33`}}>
      <svg viewBox="0 0 280 160" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        {/* Diesel */}
        <rect x="10" y="50" width="80" height="60" rx="6" fill={C.warn} opacity={0.18} stroke={C.warn} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="diesel"?null:"diesel")}/>
        <text x="50" y="76" fontSize="8" fill={C.warn} fontFamily="Courier New" textAnchor="middle">DIESEL</text>
        <text x="50" y="88" fontSize="8" fill={C.warn} fontFamily="Courier New" textAnchor="middle">ENGINE</text>
        {/* Governor */}
        <rect x="18" y="28" width="44" height="18" rx="4" fill={C.green} opacity={0.22} stroke={C.green} strokeWidth="1" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="governor"?null:"governor")}/>
        <text x="40" y="40" fontSize="7" fill={C.green} fontFamily="Courier New" textAnchor="middle">GOVERNOR</text>
        <line x1="40" y1="46" x2="40" y2="50" stroke={C.green} strokeWidth="1" strokeDasharray="2,2"/>
        {/* Shaft */}
        <line x1="90" y1="80" x2="120" y2="80" stroke={C.dim} strokeWidth="7" strokeLinecap="round"/>
        <text x="105" y="74" fontSize="7" fill={C.dim} fontFamily="Courier New" textAnchor="middle">SHAFT</text>
        {/* Alternator */}
        <ellipse cx="155" cy="80" rx="36" ry="31" fill={C.cyan} opacity={0.12} stroke={C.cyan} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="alternator"?null:"alternator")}/>
        <text x="155" y="76" fontSize="8" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">ALTER-</text>
        <text x="155" y="87" fontSize="8" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">NATOR</text>
        {/* AVR */}
        <rect x="128" y="18" width="54" height="18" rx="4" fill={C.amber} opacity={0.22} stroke={C.amber} strokeWidth="1" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="avr"?null:"avr")}/>
        <text x="155" y="30" fontSize="7" fill={C.amber} fontFamily="Courier New" textAnchor="middle">AVR</text>
        <line x1="155" y1="36" x2="155" y2="49" stroke={C.amber} strokeWidth="1" strokeDasharray="3,2"/>
        {/* ACB */}
        <rect x="200" y="60" width="30" height="40" rx="4" fill={C.red} opacity={0.18} stroke={C.red} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="breaker"?null:"breaker")}/>
        <text x="215" y="77" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">ACB</text>
        <text x="215" y="88" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">BKR</text>
        {/* Busbar */}
        <rect x="238" y="38" width="36" height="84" rx="4" fill={C.purple} opacity={0.14} stroke={C.purple} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="bus"?null:"bus")}/>
        <text x="256" y="78" fontSize="7" fill={C.purple} fontFamily="Courier New" textAnchor="middle">BUS</text>
        <text x="256" y="88" fontSize="7" fill={C.purple} fontFamily="Courier New" textAnchor="middle">BAR</text>
        {/* Connections */}
        <line x1="191" y1="80" x2="200" y2="80" stroke={C.cyan} strokeWidth="2"/>
        <line x1="230" y1="80" x2="238" y2="80" stroke={C.purple} strokeWidth="2"/>
        {/* 3-phase outputs */}
        {[54,80,106].map((y,i)=>(
          <g key={i}>
            <line x1="274" y1={y} x2="280" y2={y} stroke={C.purple} strokeWidth="1.5"/>
            <text x="278" y={y-3} fontSize="6" fill={C.purple} fontFamily="Courier New">L{i+1}</text>
          </g>
        ))}
      </svg>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10,marginTop:4}}>
        {Object.entries(comps).map(([key]:any)=>{const col=compColors[key]||C.cyan;return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{compLabels[key]||key}</button>);}) }
      </div>
      {sel&&(<div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${compColors[sel]||C.cyan}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}><div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{comps[sel]?.name}</div>{comps[sel]?.desc}</div>)}
    </div>
  );
}

// ── SVG 2 - PARALLEL COUPLING ────────────────────────────────
function ParallelCouplingSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [step, setStep] = useState(0);
  const steps = t.couplingSteps;
  const stepColors = [C.cyan, C.amber, C.purple, C.green, C.warn, C.teal];

  const angles = [-90,-60,-30,0,30,60];
  const angle = angles[step]||0;
  const rad = (angle-90)*Math.PI/180;
  const nx = 80+35*Math.cos(rad), ny = 50+35*Math.sin(rad);
  const needleColor = step===3?C.green:C.warn;

  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.amber}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {steps.map((_:any,i:number)=>(
          <button key={i} onClick={()=>setStep(i)} style={{width:34,height:34,borderRadius:8,fontSize:11,cursor:"pointer",fontWeight:700,background:step===i?`${stepColors[i]}33`:"rgba(255,255,255,0.04)",border:`1px solid ${step===i?stepColors[i]:"rgba(255,255,255,0.12)"}`,color:step===i?stepColors[i]:"rgba(240,244,255,0.4)"}}>{i+1}</button>
        ))}
      </div>
      <svg viewBox="0 0 160 105" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto 10px",background:`${C.navy3}55`,borderRadius:8}}>
        <circle cx="80" cy="52" r="42" fill="none" stroke={C.amber} strokeWidth="1.5" opacity={0.4}/>
        <circle cx="80" cy="52" r="5" fill={C.amber}/>
        <line x1="80" y1="12" x2="80" y2="22" stroke={C.green} strokeWidth="2.5"/>
        <text x="80" y="10" fontSize="8" fill={C.green} fontFamily="Courier New" textAnchor="middle">12h OK</text>
        <line x1="80" y1="52" x2={nx} y2={ny} stroke={needleColor} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx={nx} cy={ny} r="4" fill={needleColor}/>
        <text x="130" y="56" fontSize="7" fill={C.warn} fontFamily="Courier New">FAST</text>
        <text x="8" y="56" fontSize="7" fill={C.cyan} fontFamily="Courier New">SLOW</text>
        <text x="80" y="100" fontSize="7" fill={C.amber} fontFamily="Courier New" textAnchor="middle">SYNCHROSCOPE</text>
      </svg>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.06)",marginBottom:10}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.cyan},${C.amber})`,width:`${((step+1)/steps.length)*100}%`,transition:"width 0.3s"}}/>
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${stepColors[step]}44`,minHeight:70}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:stepColors[step],fontWeight:700,marginBottom:8}}>{steps[step]?.title}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New"}}>{steps[step]?.desc}</div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:10,gap:8}}>
        <button disabled={step===0} onClick={()=>setStep(s=>s-1)} style={{flex:1,padding:"8px 0",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",color:"rgba(240,244,255,0.5)",cursor:step===0?"not-allowed":"pointer",fontSize:12}}>&#9664;</button>
        <button disabled={step===steps.length-1} onClick={()=>setStep(s=>s+1)} style={{flex:1,padding:"8px 0",borderRadius:10,border:`1px solid ${C.amber}44`,background:`${C.amber}11`,color:C.amber,cursor:step===steps.length-1?"not-allowed":"pointer",fontSize:12,fontWeight:700}}>&#9654;</button>
      </div>
    </div>
  );
}

// ── SVG 3 - CURRENT TYPES ────────────────────────────────────
function CurrentTypesSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string>("ac3ph");
  const types = t.currentTypes;
  const typeColors: Record<string,string> = { ac3ph:C.cyan, ac1ph:C.amber, dc24:C.green, emergency:C.red };

  const waveforms: Record<string, React.ReactNode> = {
    ac3ph: (
      <g>
        {[0,1,2].map(ph=>{
          const offset=ph*(Math.PI*2/3);
          const colors=[C.cyan,"#ff6b6b",C.green];
          const pts=Array.from({length:50},(_,i)=>`${10+i*3},${50-28*Math.sin((i/50)*4*Math.PI+offset)}`).join(" ");
          return <polyline key={ph} points={pts} fill="none" stroke={colors[ph]} strokeWidth="1.5" opacity={0.85}/>;
        })}
        <text x="80" y="94" fontSize="8" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">440V / 3-phase / 50-60Hz</text>
      </g>
    ),
    ac1ph: (
      <g>
        <polyline points={Array.from({length:50},(_,i)=>`${10+i*3},${50-28*Math.sin((i/50)*4*Math.PI)}`).join(" ")} fill="none" stroke={C.amber} strokeWidth="2"/>
        <text x="80" y="94" fontSize="8" fill={C.amber} fontFamily="Courier New" textAnchor="middle">220V / 1-phase / 50-60Hz</text>
      </g>
    ),
    dc24: (
      <g>
        <line x1="10" y1="50" x2="160" y2="50" stroke={C.green} strokeWidth="2.5"/>
        <text x="80" y="70" fontSize="8" fill={C.green} fontFamily="Courier New" textAnchor="middle">24V DC - stable</text>
      </g>
    ),
    emergency: (
      <g>
        <polyline points={Array.from({length:50},(_,i)=>`${10+i*3},${50-22*Math.sin((i/50)*4*Math.PI)}`).join(" ")} fill="none" stroke={C.red} strokeWidth="2"/>
        <text x="80" y="82" fontSize="8" fill={C.red} fontFamily="Courier New" textAnchor="middle">EMERGENCY</text>
        <text x="80" y="94" fontSize="7" fill={C.red} fontFamily="Courier New" textAnchor="middle">Starts in 30s (SOLAS)</text>
      </g>
    ),
  };

  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.purple}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(types).map(([key]:any)=>{const col=typeColors[key]||C.cyan;return(<button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"5px 4px",borderRadius:8,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New",textAlign:"center"}}>{key==="ac3ph"?"3-PH":key==="ac1ph"?"1-PH":key==="dc24"?"DC 24V":"EMERG"}</button>);}) }
      </div>
      <svg viewBox="0 0 170 100" style={{width:"100%",display:"block",background:`${C.navy3}88`,borderRadius:8,marginBottom:10}}>
        {waveforms[sel]}
      </svg>
      <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${typeColors[sel]||C.purple}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{types[sel]?.name}</div>
        {types[sel]?.desc}
      </div>
    </div>
  );
}

// ── SVG 4 - PROTECTIONS ──────────────────────────────────────
function ProtectionsSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const prots = t.protections;
  const protColors: Record<string,string> = {
    overcurrent:C.warn, shortcircuit:C.red,
    undervoltage:C.amber, reversepower:C.purple, differential:C.cyan,
  };
  const protIcons: Record<string,string> = {
    overcurrent:"⚡", shortcircuit:"💥", undervoltage:"📉", reversepower:"🔄", differential:"⚖️",
  };
  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.warn}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {Object.entries(prots).map(([key,val]:any)=>{const col=protColors[key]||C.warn;return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`}}><div style={{fontSize:16,marginBottom:4}}>{protIcons[key]}</div><div style={{fontSize:10,fontWeight:700,color:C.white,fontFamily:"Courier New",lineHeight:1.4}}>{val.name.split("(")[0].split("-")[0].trim()}</div></button>);}) }
      </div>
      {sel&&(<div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${protColors[sel]||C.warn}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}><div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{prots[sel]?.name}</div>{prots[sel]?.desc}</div>)}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}
// LessonE2_L4 - Generateurs & Production electrique | PART 2

export default function LessonE2_L4({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t = T[lang] || T.fr;
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
  const xpFinal = qScore>=5?250:qScore>=4?200:qScore>=3?150:100;
  const optColors = [C.cyan, C.amber, C.green, C.purple];
  const progress = phase==="content"?60:phase==="quiz"?85:100;

  const section=(icon:string,title:string,children:React.ReactNode,col=C.cyan)=>(
    <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${col}2a`}}>
      <div style={{background:`${col}14`,padding:"10px 14px",borderBottom:`1px solid ${col}1a`}}>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:col}}>{icon} {title}</span>
      </div>
      <div style={{padding:12}}>{children}</div>
    </div>
  );

  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankSel(null);setBankScore(0);setBankDone(false);};
  const pickBank=(i:number)=>{if(bankSel!==null)return;setBankSel(i);if(i===bank[bankCur].correct)setBankScore(s=>s+1);};
  const bankNext=()=>{if(bankCur+1>=bank.length){setBankDone(true);return;}setBankCur(c=>c+1);setBankSel(null);};
  const handleQConf=()=>{if(qSel===null)return;setQConf(true);if(qSel===quiz[qCur].correct)setQScore(s=>s+1);};
  const handleQNext=()=>{if(qCur+1>=quiz.length){setPhase("done");if(onComplete)onComplete(xpFinal);return;}setQCur(c=>c+1);setQSel(null);setQConf(false);};

  const header=(sub:string)=>(
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.cyan}33`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
        <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar"}</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.cyan,marginBottom:2}}>{t.moduleLabel} · L4{sub?" · "+sub:""}</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.white,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
          <span style={{padding:"2px 8px",borderRadius:6,background:"rgba(0,229,255,0.12)",border:"1px solid rgba(0,229,255,0.35)",fontSize:9,color:C.cyan,fontFamily:"'Cinzel',serif",letterSpacing:1}}>PREMIUM</span>
          <span style={{fontSize:11,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New"}}>{progress}%</span>
        </div>
      </div>
      <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
        <div style={{height:"100%",background:`linear-gradient(90deg,${C.cyan},${C.blue})`,width:`${progress}%`,transition:"width 0.4s"}}/>
      </div>
    </div>
  );

  // ══ CONTENT ══════════════════════════════════════════════════
  if(phase==="content") return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif"}}>
      {header("")}
      <div style={{padding:"14px 14px 80px"}}>
        <div style={{fontSize:13,color:C.dim,lineHeight:1.7,marginBottom:18,fontFamily:"Courier New",padding:"12px 14px",borderRadius:12,background:`${C.navy2}88`,border:`1px solid ${C.cyan}18`}}>{t.intro}</div>

        {section("⚡",t.s1title,<GeneratorAnatomySVG lang={lang}/>,C.cyan)}
        {section("🔄",t.s2title,<ParallelCouplingSVG lang={lang}/>,C.amber)}
        {section("📊",t.s3title,<CurrentTypesSVG lang={lang}/>,C.purple)}
        {section("⚠️",t.s4title,<ProtectionsSVG lang={lang}/>,C.warn)}

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
            {bankIdx===null&&(<button onClick={startBank} style={{width:"100%",padding:"14px 0",borderRadius:12,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{t.bankStart}</button>)}
            {bankIdx!==null&&!bankDone&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:11,color:C.dim,fontFamily:"Courier New"}}><span>Q{bankCur+1}/{bank.length}</span><span style={{color:C.cyan}}>✦ {bankScore}</span></div>
                <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:12}}><div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.cyan},${C.blue})`,width:`${(bankCur/bank.length)*100}%`,transition:"width 0.3s"}}/></div>
                <div style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:`${C.navy2}cc`,border:`1px solid ${C.blue}22`}}>{bank[bankCur].q}</div>
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
                  {bank[bankCur].opts.map((opt:string,oi:number)=>{
                    let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.12)",col="rgba(240,244,255,0.6)";
                    if(bankSel!==null){
                      if(oi===bank[bankCur].correct){bg="rgba(76,175,80,0.15)";bd=C.green;col=C.green;}
                      else if(oi===bankSel){bg="rgba(239,83,80,0.15)";bd=C.red;col=C.red;}
                    }
                    return(<button key={oi} onClick={()=>pickBank(oi)} disabled={bankSel!==null} style={{textAlign:"left",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${bd}`,background:bg,color:col,fontSize:12,fontFamily:"Courier New",cursor:bankSel===null?"pointer":"default",lineHeight:1.4}}>{opt}</button>);
                  })}
                </div>
                {bankSel!==null&&(<div><div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${bankSel===bank[bankCur].correct?C.green:C.red}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{bank[bankCur].expl}</div><button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?t.bankTrophy:t.bankNext}</button></div>)}
              </div>
            )}
            {bankDone&&(<div style={{textAlign:"center",padding:16}}><div style={{fontSize:36,marginBottom:8}}>🏆</div><div style={{fontFamily:"'Cinzel',serif",fontSize:16,color:C.cyan,marginBottom:6}}>{t.bankTrophy}</div><div style={{fontSize:13,color:C.dim,fontFamily:"Courier New"}}>{t.bankScore} : {bankScore}/{bank.length}</div></div>)}
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.cyan}44`,padding:14,marginBottom:18}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:C.cyan,letterSpacing:1,marginBottom:10}}>✦ {t.summaryTitle}</div>
          {t.summary.map((s:string,i:number)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:7,fontSize:12,color:"rgba(240,244,255,0.78)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.cyan,flexShrink:0}}>✦</span><span>{s}</span></div>))}
        </div>

        <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>⚡ {t.quizCTA}</button>
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
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,fontSize:11,color:C.dim,fontFamily:"Courier New"}}><span>Q{qCur+1}/{quiz.length}</span><span style={{color:C.cyan}}>⭐ {qScore}/{quiz.length}</span></div>
          <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:16}}><div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.cyan},${C.blue})`,width:`${(qCur/quiz.length)*100}%`,transition:"width 0.4s"}}/></div>
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
          {qConf&&<div style={{padding:12,borderRadius:10,marginBottom:14,background:isCorrect?"rgba(74,222,128,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${isCorrect?"#4ade80":"#ef4444"}44`,fontSize:12,color:C.text,fontFamily:"Courier New",lineHeight:1.6}}><div style={{fontWeight:700,marginBottom:4,color:isCorrect?"#4ade80":"#ef4444"}}>{isCorrect?"✅ Correct !":"❌ Incorrect"}</div>{q.exp}</div>}
          {!qConf
            ?<button onClick={handleQConf} disabled={qSel===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:qSel!==null?`linear-gradient(135deg,${C.cyan},${C.blue})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:qSel!==null?C.navy:"rgba(240,244,255,0.25)",cursor:qSel!==null?"pointer":"default",letterSpacing:1}}>{submitLabel}</button>
            :<button onClick={handleQNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:1}}>{qCur+1>=quiz.length?"TERMINER":nextLabel}</button>
          }
        </div>
      </div>
    );
  }

  // ══ DONE ═════════════════════════════════════════════════════
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 14px"}}>
      <div style={{fontSize:56,marginBottom:12}}>⚡</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:42,fontWeight:900,color:C.cyan,marginBottom:4}}>{xpFinal}</div>
      <div style={{fontSize:12,color:C.dim,fontFamily:"Courier New",marginBottom:8}}>{lang==="fr"?"XP obtenus":lang==="en"?"XP earned":lang==="es"?"XP obtenidos":"XP obtidos"}</div>
      <div style={{fontSize:15,color:C.white,fontFamily:"Courier New",marginBottom:24}}>Score : {qScore}/{quiz.length}</div>
      <div style={{width:"100%",maxWidth:400,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.cyan}44`,padding:14,marginBottom:24}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.cyan,marginBottom:10}}>✦ {t.summaryTitle}</div>
        {t.summary.map((s:string,i:number)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.cyan,flexShrink:0}}>✦</span><span>{s}</span></div>))}
      </div>
      <button onClick={onBack} style={{width:"100%",maxWidth:400,padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>⚡ {lang==="fr"?"RETOUR AU MODULE":lang==="en"?"BACK TO MODULE":lang==="es"?"VOLVER AL MODULO":"VOLTAR AO MODULO"}</button>
    </div>
  );
}
