// LessonE2_L4 — Generateurs & Production electrique | PART 1
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
    lessonTitle: "Generateurs & Production electrique",
    lessonSub:   "Alternateur, AVR, governor, couplage parallele",
    intro: "Un navire est une centrale electrique flottante. La production, la distribution et la protection de l'energie electrique a bord sont des competences fondamentales pour tout mecanicien ou officier de quart machine.",
    s1title: "Le groupe electrogene — anatomie",
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
    accidentTitle: "CAS REEL : Blackout total — MV Stellar (2018)",
    accidentBody: "En pleine Mer de Chine du Sud, le navire subit un blackout total a 02h15. Cause : disjoncteur principal du groupe no 1 declenche sur surcharge, le groupe no 2 en attente de maintenance, groupe no 3 non demarre. Le navire derive pendant 47 minutes sans propulsion ni gouverne. Un vraquier en approche passe a 0,8 milles. Cause racine : maintenance du groupe no 2 en navigation sans avoir demarre le no 3 comme secours. La procedure de gestion de la puissance n'etait pas respectee. Consequence : perte du controle du navire, risque d'abordage. Lecon : maintenir TOUJOURS au moins 2 sources d'energie disponibles et demarrer le generateur de secours avant toute maintenance d'un groupe principal.",
    summaryTitle: "Points essentiels",
    summary: [
      "Un navire possede 2 a 4 groupes electrogenes diesel-alternateur",
      "La tension standard a bord : 440V (triphase) pour la puissance, 220V pour l'eclairage",
      "Le couplage en parallele necessite meme tension, meme frequence (50/60 Hz) et meme phase",
      "Le disjoncteur principal (ACB) protege le reseau contre les surcharges et courts-circuits",
      "L'alternateur de secours (emergency generator) demarre automatiquement en 30s (SOLAS)",
      "Formule frequence : f = (n x p) / 60 — 1500 tr/min x 2 paires de poles = 50 Hz",
    ],
    quizCTA: "COMMENCER LE QUIZ",
    bankStart: "COMMENCER =>",
    bankNext: "Question suivante =>",
    bankTrophy: "Bravo ! Banque terminee",
    bankScore: "Score banque",
    components: {
      diesel:     { name: "Moteur diesel d'entrainement", desc: "Moteur diesel 4 temps entrainant l'alternateur. Sa vitesse de rotation (1500 ou 1800 tr/min) determine la frequence du courant produit (50 ou 60 Hz). Le regulateur de vitesse (governor) maintient la frequence constante sous charge variable." },
      alternator: { name: "Alternateur (generatrice)",    desc: "Machine tournante convertissant l'energie mecanique en energie electrique par induction electromagnetique. Produit un courant alternatif triphase. La tension est regulee par l'AVR (Automatic Voltage Regulator)." },
      avr:        { name: "AVR — Regulateur de tension",  desc: "Regule automatiquement la tension de sortie de l'alternateur en ajustant le courant d'excitation. Maintient la tension stable (±2%) malgre les variations de charge." },
      governor:   { name: "Governor — Regulateur vitesse", desc: "Maintient la vitesse de rotation du moteur diesel constante malgre les variations de charge. Indispensable pour maintenir la frequence a 50/60 Hz." },
      breaker:    { name: "Disjoncteur principal (ACB)",  desc: "Air Circuit Breaker — protege le groupe electrogene contre les surcharges, courts-circuits et inversions de phase. Se declenche automatiquement en cas de defaut." },
      bus:        { name: "Jeu de barres (busbar)",       desc: "Conducteurs de cuivre massif repartissant l'energie electrique vers tous les circuits de distribution. Point de connexion centrale de tous les groupes et consommateurs." },
    },
    couplingSteps: [
      { title: "1. Verification de la tension",    desc: "Verifier que la tension du groupe entrant est egale a la tension du reseau (±5%). Ajuster avec le rheostat d'excitation ou l'AVR." },
      { title: "2. Verification de la frequence", desc: "Verifier que la frequence du groupe entrant est identique au reseau (50 ou 60 Hz ±0,5 Hz). Ajuster avec le governor." },
      { title: "3. Verification de la phase",     desc: "Utiliser le synchroscope ou les lampes de synchronisation pour verifier que les phases sont en concordance avant le couplage." },
      { title: "4. Fermeture du disjoncteur",     desc: "Quand le synchroscope indique 12h (phases alignees), fermer le disjoncteur ACB. Le groupe est maintenant en parallele sur le reseau." },
      { title: "5. Repartition de charge",        desc: "Ajuster la charge entre les groupes en modifiant le governor (puissance active — kW) et l'AVR (puissance reactive — kVAR)." },
      { title: "6. Delestage du groupe sortant",  desc: "Transferer progressivement la charge sur le groupe restant, puis ouvrir le disjoncteur du groupe a arreter." },
    ],
    currentTypes: {
      ac3ph:     { name: "Courant alternatif triphase (440V)", desc: "Courant principal a bord. Alimente les gros consommateurs : pompes, compresseurs, treuils, propulsion. 3 phases decalees de 120°. Frequence : 50 ou 60 Hz selon le navire." },
      ac1ph:     { name: "Courant alternatif monophase (220V)", desc: "Eclairage, prises de courant, petits equipements. Derive du reseau triphase via transformateur. Disponible dans les cabines et espaces de vie." },
      dc24:      { name: "Courant continu 24V",                desc: "Systemes de controle-commande, alarmes, automatismes, communication interne. Alimente par batteries tampons rechargees en permanence. Fonctionne meme en cas de panne du reseau principal." },
      emergency: { name: "Reseau de secours (Emergency)",      desc: "Reseau alimente par le groupe electrogene de secours. Alimente les circuits vitaux : navigation, communication, pompe incendie, eclairage secours. Doit demarrer en 30 secondes selon SOLAS." },
    },
    protections: {
      overcurrent:   { name: "Protection surintensiteition (OCPS)", desc: "Declenche le disjoncteur si le courant depasse la valeur nominale. Protege cables et equipements contre la surchauffe. Reglee a 110-120% du courant nominal." },
      shortcircuit:  { name: "Protection court-circuit",           desc: "Declenche instantanement en cas de court-circuit. Le courant de court-circuit peut etre 10 a 20 fois le courant nominal. Reaction en millisecondes pour limiter les degats." },
      undervoltage:  { name: "Protection sous-tension",            desc: "Declenche si la tension chute sous un seuil critique (85% de la tension nominale). Protege les moteurs contre les demarrages a basse tension qui surchauffent les bobinages." },
      reversepower:  { name: "Protection puissance inverse",       desc: "Empeche un alternateur couple de 'motorer' (absorber de la puissance au lieu d'en produire). Evite les dommages au moteur diesel entraineur." },
      differential:  { name: "Protection differentielle",          desc: "Compare les courants entrant et sortant de l'alternateur. Tout desequilibre indique un defaut interne — declenche instantanement pour proteger l'enroulement." },
    },
    exercises: [
      { q: "Un groupe electrogene tourne a 1500 tr/min. Quelle est la frequence du courant produit et quelle formule permet de la calculer ?", a: "Frequence f = (n x p) / 60, ou n = vitesse en tr/min et p = nombre de paires de poles. Pour 1500 tr/min avec 2 paires de poles : f = (1500 x 2) / 60 = 50 Hz. Pour 60 Hz, le meme alternateur tournerait a 1800 tr/min. La frequence doit etre maintenue constante (±0,5 Hz) par le governor." },
      { q: "Lors d'un couplage en parallele, vous observez que le synchroscope tourne dans le sens antihoraire. Que devez-vous faire ?", a: "Un synchroscope tournant dans le sens antihoraire indique que le groupe entrant est trop lent (frequence trop basse). Il faut augmenter la vitesse du groupe entrant en agissant sur le governor (acceleration). Si le synchroscope tourne dans le sens horaire, le groupe est trop rapide — il faut le ralentir. On ferme le disjoncteur quand le synchroscope arrive a 12h (position midi) en ralentissant legerement." },
      { q: "Quelle est la difference entre la puissance active (kW) et la puissance reactive (kVAR) a bord d'un navire ? Quel organe controle chacune ?", a: "La puissance active (kW) est la puissance reellement consommee pour effectuer un travail mecanique. Elle est controlee par le governor du moteur diesel (admission de carburant). La puissance reactive (kVAR) est echangee entre le reseau et les charges inductives (moteurs, transformateurs) sans produire de travail utile. Elle est controlee par l'AVR (courant d'excitation de l'alternateur). Le facteur de puissance (cos phi) = kW / kVA. Un facteur de puissance de 0,8 est typique a bord." },
    ],
    bankQuestions: [
      { q: "Quelle est la formule pour calculer la frequence d'un alternateur ?", a: "f = (n x p) / 60, ou f = frequence en Hz, n = vitesse de rotation en tr/min, p = nombre de paires de poles. Exemple : alternateur a 2 paires de poles tournant a 1500 tr/min => f = (1500 x 2) / 60 = 50 Hz." },
      { q: "Quel est le role de l'AVR (Automatic Voltage Regulator) ?", a: "L'AVR regule automatiquement la tension de sortie de l'alternateur en ajustant le courant d'excitation du rotor. Quand la charge augmente et que la tension tend a chuter, l'AVR augmente le courant d'excitation pour maintenir la tension stable a ±2% de la valeur nominale." },
      { q: "Qu'est-ce que le governor et quel parametre electrique controle-t-il ?", a: "Le governor (regulateur de vitesse) maintient la vitesse de rotation du moteur diesel constante (1500 ou 1800 tr/min) malgre les variations de charge. En maintenant la vitesse constante, il maintient indirectement la FREQUENCE (50 ou 60 Hz) du courant produit." },
      { q: "Quelles sont les trois conditions necessaires pour coupler deux alternateurs en parallele ?", a: "1. Meme tension : la tension du groupe entrant doit etre egale a celle du reseau (±5%). Ajuster avec l'AVR. 2. Meme frequence : 50 Hz ou 60 Hz selon le reseau (±0,5 Hz). Ajuster avec le governor. 3. Meme phase (concordance de phase) : les ondes sinusoidales doivent etre en phase. Verifier avec le synchroscope ou les lampes de synchronisation." },
      { q: "Comment fonctionne un synchroscope et comment lit-on sa position ?", a: "Le synchroscope compare la tension et la frequence du groupe entrant par rapport au reseau. Son aiguille tourne : dans le sens horaire si le groupe entrant est TROP RAPIDE (frequence trop haute), dans le sens antihoraire si TROP LENT (frequence trop basse). On ferme le disjoncteur quand l'aiguille arrive a 12h (midi) = phases alignees, idealement avec une legere rotation horaire (legerement trop rapide) pour que le groupe prenne immediatement de la charge." },
      { q: "Quelle est la difference entre la puissance active (kW) et la puissance reactive (kVAR) ?", a: "Puissance active (kW) : puissance reellement convertie en travail mecanique ou chaleur. Controlee par le governor (carburant du moteur diesel). Puissance reactive (kVAR) : echangee entre le reseau et les charges inductives (moteurs, transformateurs) — ne produit pas de travail utile mais est necessaire a leur fonctionnement. Controlee par l'AVR (excitation de l'alternateur). Puissance apparente (kVA) = racine carree(kW2 + kVAR2). Facteur de puissance cos phi = kW/kVA." },
      { q: "Pourquoi un navire possede-t-il plusieurs groupes electrogenes ?", a: "Plusieurs raisons : Redondance et securite (si un groupe tombe en panne, les autres assurent la continuite). Adaptation a la charge (a faible charge, on n'utilise qu'un groupe et on arrete les autres pour economiser le carburant). Maintenance (un groupe peut etre arrete pour maintenance pendant que les autres fonctionnent). Le nombre et la puissance des groupes sont calcules pour couvrir 100% de la puissance maximale avec un groupe en reserve." },
      { q: "Qu'est-ce qu'un jeu de barres (busbar) et quel est son role ?", a: "Le jeu de barres est un conducteur de cuivre massif (ou aluminium) constituant le point de connexion centrale du tableau principal (MSB — Main Switchboard). Tous les groupes electrogenes s'y connectent via leurs disjoncteurs, et tous les circuits de distribution en partent. Il permet de coupler les groupes en parallele et de distribuer l'energie a l'ensemble du navire. Generalement divise en sections pouvant etre isolees." },
      { q: "Qu'est-ce que la protection de puissance inverse (reverse power protection) et pourquoi est-elle necessaire ?", a: "La protection de puissance inverse detecte quand un alternateur accouple absorbe de la puissance au lieu d'en produire (le moteur diesel s'arrete ou ralentit trop). Sans cette protection, l'alternateur fonctionnerait comme un moteur, entrainant des dommages au moteur diesel (entrainement a l'envers) et une chute de tension du reseau. Elle declenche le disjoncteur de l'alternateur defaillant." },
      { q: "Quel est le groupe electrogene de secours (emergency generator) et quelles sont ses obligations SOLAS ?", a: "Le groupe electrogene de secours est un groupe independant situe au-dessus de la ligne de flottaison (hors salle des machines principale), alimentant les equipements vitaux en cas de panne totale du reseau principal. Obligations SOLAS : demarrage automatique en 30 secondes, autonomie d'au moins 18h pour navires passagers (3h pour navires cargo), alimentation obligatoire : navigation, communication, pompe incendie, eclairage de secours, systemes de lutte contre l'incendie." },
      { q: "Comment effectue-t-on le delestage (transfert de charge) d'un groupe vers un autre ?", a: "Procedure de delestage : 1. Coupler le groupe A sur le reseau (groupe B deja en service). 2. Augmenter progressivement la charge du groupe A en agissant sur son governor (augmentation carburant => il prend de la charge active). 3. Simultanement reduire la charge du groupe B (reduction carburant). 4. Quand le groupe B est a charge nulle (ou voisine), ouvrir son disjoncteur. 5. Arreter le groupe B. Important : ne jamais couper brutalement — proceder progressivement pour eviter les a-coups de tension et frequence." },
      { q: "Quelle est la tension standard et la frequence standard a bord des navires modernes ?", a: "Tension principale : 440V triphase (courants forts — moteurs, pompes, compresseurs). Sur certains grands navires : 6,6 kV ou 11 kV. Tension secondaire : 220V monophase (eclairage, prises). Courant de commande/controle : 24V DC. Frequence : 60 Hz (navires americains, japonais, certains navires internationaux) ou 50 Hz (navires europeens). La frequence depend de la conception du navire et des equipements installes." },
      { q: "Expliquez ce qu'est un disjoncteur ACB (Air Circuit Breaker) et ses fonctions de protection.", a: "L'ACB (Air Circuit Breaker) est un disjoncteur haute puissance utilisant l'air comme milieu d'extinction de l'arc electrique. Fonctions : 1. Protection surintensie (surcharge) — declenche apres un delai si I > In. 2. Protection court-circuit — declenche instantanement si I >> In. 3. Protection sous-tension — declenche si la tension chute anormalement. 4. Protection puissance inverse — declenche si flux de puissance inverse. Peut aussi etre commande manuellement. Rearmable apres declenchement." },
      { q: "Quelle est la difference entre un court-circuit et une surcharge ?", a: "Surcharge : courant superieur au courant nominal mais inferieur au courant de court-circuit. Ex. : demarrage d'un gros moteur, accumulation de consommateurs. Entraine une surchauffe progressive. La protection surcharge declenche apres un delai (quelques secondes a minutes). Court-circuit : connexion directe entre deux phases ou phase-neutre. Courant peut atteindre 10 a 20 fois le nominal. Dommages instantanes (arc electrique, incendie). La protection court-circuit declenche en millisecondes." },
      { q: "Qu'est-ce que le facteur de puissance (cos phi) et comment l'ameliore-t-on a bord ?", a: "Le facteur de puissance cos phi = Puissance active (kW) / Puissance apparente (kVA). Varie entre 0 et 1. Un faible cos phi (< 0,7) signifie beaucoup de puissance reactive — courants eleves dans les cables et alternateurs pour une puissance utile faible. A bord, il est typiquement de 0,8. Amelioration : bancs de condensateurs (compensent la puissance reactive inductive). Ajustement de l'AVR pour repartir la puissance reactive entre les groupes couples." },
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
    moduleLabel: "ENGINE — AUXILIARIES",
    lessonTitle: "Generators & Electrical Power",
    lessonSub:   "Alternator, AVR, governor, parallel coupling",
    intro: "A vessel is a floating power station. The production, distribution and protection of electrical energy on board are fundamental skills for any engineer or engine room watchkeeper.",
    s1title: "The Generator Set — Anatomy",
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
    accidentTitle: "REAL CASE: Total blackout — MV Stellar (2018)",
    accidentBody: "In the South China Sea, the vessel suffered a total blackout at 02:15. Cause: main breaker of generator no.1 tripped on overload, generator no.2 undergoing maintenance, generator no.3 not started. The vessel drifted for 47 minutes without propulsion or steering. A bulk carrier in approach passed at 0.8 miles. Root cause: maintenance of generator no.2 while underway without having started no.3 as backup. Power management procedures were not followed. Lesson: ALWAYS maintain at least 2 available power sources and start the emergency generator before any maintenance of a main generator.",
    summaryTitle: "Key Points",
    summary: [
      "A vessel has 2 to 4 diesel-alternator generating sets",
      "Standard on-board voltage: 440V (three-phase) for power, 220V for lighting",
      "Parallel operation requires same voltage, same frequency (50/60 Hz) and same phase",
      "Main circuit breaker (ACB) protects the network against overloads and short circuits",
      "Emergency generator starts automatically within 30 seconds (SOLAS)",
      "Frequency formula: f = (n x p) / 60 — 1500 rpm x 2 pole pairs = 50 Hz",
    ],
    quizCTA: "START QUIZ",
    bankStart: "START =>",
    bankNext: "Next question =>",
    bankTrophy: "Well done! Bank completed",
    bankScore: "Bank score",
    components: {
      diesel:     { name: "Driving diesel engine",       desc: "4-stroke diesel engine driving the alternator. Its rotation speed (1500 or 1800 rpm) determines the frequency of the current produced (50 or 60 Hz). The governor maintains constant frequency under varying load." },
      alternator: { name: "Alternator (generator)",      desc: "Rotating machine converting mechanical energy into electrical energy by electromagnetic induction. Produces three-phase AC. Voltage is regulated by the AVR (Automatic Voltage Regulator)." },
      avr:        { name: "AVR — Automatic Voltage Regulator", desc: "Automatically regulates the alternator output voltage by adjusting the excitation current. Maintains stable voltage (±2%) despite load variations." },
      governor:   { name: "Governor — Speed regulator",  desc: "Maintains the diesel engine rotation speed constant despite load variations. Essential for maintaining frequency at 50/60 Hz." },
      breaker:    { name: "Main circuit breaker (ACB)",  desc: "Air Circuit Breaker — protects the generating set against overloads, short circuits and phase inversions. Trips automatically in case of fault." },
      bus:        { name: "Busbar",                      desc: "Solid copper conductors distributing electrical energy to all distribution circuits. Central connection point for all generators and consumers." },
    },
    couplingSteps: [
      { title: "1. Voltage check",           desc: "Verify that the incoming generator voltage equals the busbar voltage (±5%). Adjust with the excitation rheostat or AVR." },
      { title: "2. Frequency check",         desc: "Verify that the incoming generator frequency matches the network (50 or 60 Hz ±0.5 Hz). Adjust with the governor." },
      { title: "3. Phase check",             desc: "Use the synchroscope or synchronising lamps to verify phase concordance before closing." },
      { title: "4. Closing the breaker",     desc: "When the synchroscope indicates 12 o'clock (phases aligned), close the ACB. The generator is now running in parallel." },
      { title: "5. Load sharing",            desc: "Adjust load between generators by modifying the governor (active power — kW) and AVR (reactive power — kVAR)." },
      { title: "6. Unloading outgoing gen",  desc: "Progressively transfer load to the remaining generator, then open the breaker of the generator to be stopped." },
    ],
    currentTypes: {
      ac3ph:     { name: "Three-phase AC (440V)", desc: "Main power on board. Feeds large consumers: pumps, compressors, winches, propulsion. 3 phases 120° apart. Frequency: 50 or 60 Hz depending on vessel." },
      ac1ph:     { name: "Single-phase AC (220V)", desc: "Lighting, socket outlets, small equipment. Derived from three-phase network via transformer. Available in cabins and accommodation spaces." },
      dc24:      { name: "24V DC",                desc: "Control systems, alarms, automation, internal communications. Fed from buffer batteries continuously recharged. Functions even during main power failure." },
      emergency: { name: "Emergency network",     desc: "Network fed by the emergency generator. Feeds vital circuits: navigation, communication, fire pump, emergency lighting. Must start within 30 seconds per SOLAS." },
    },
    protections: {
      overcurrent:  { name: "Overcurrent protection (OCPS)", desc: "Trips the breaker if current exceeds nominal value. Protects cables and equipment against overheating. Set at 110-120% of nominal current." },
      shortcircuit: { name: "Short-circuit protection",      desc: "Trips instantly on short circuit. Short-circuit current can be 10 to 20 times nominal current. Millisecond reaction to limit damage." },
      undervoltage: { name: "Undervoltage protection",       desc: "Trips if voltage drops below critical threshold (85% of nominal). Protects motors against low-voltage starting which overheats windings." },
      reversepower: { name: "Reverse power protection",      desc: "Prevents a coupled alternator from 'motoring' (absorbing power instead of producing it). Avoids damage to the driving diesel engine." },
      differential: { name: "Differential protection",       desc: "Compares currents entering and leaving the alternator. Any imbalance indicates an internal fault — trips instantly to protect the winding." },
    },
    exercises: [
      { q: "A generating set runs at 1500 rpm. What is the frequency of the current produced and what formula is used?", a: "Frequency f = (n x p) / 60, where n = speed in rpm and p = number of pole pairs. For 1500 rpm with 2 pole pairs: f = (1500 x 2) / 60 = 50 Hz. For 60 Hz, the same alternator would run at 1800 rpm. Frequency must be maintained constant (±0.5 Hz) by the governor." },
      { q: "During parallel operation, you observe the synchroscope rotating anticlockwise. What should you do?", a: "An anticlockwise synchroscope indicates the incoming generator is too slow (frequency too low). Increase the incoming generator speed using the governor (accelerate). If rotating clockwise, generator is too fast — slow it down. Close the breaker when the synchroscope reaches 12 o'clock (noon position) with a slight deceleration tendency." },
      { q: "What is the difference between active power (kW) and reactive power (kVAR) on board? Which device controls each?", a: "Active power (kW) is the power actually consumed to perform mechanical work. Controlled by the diesel engine governor (fuel admission). Reactive power (kVAR) is exchanged between the network and inductive loads (motors, transformers) without producing useful work. Controlled by the AVR (alternator excitation current). Power factor (cos phi) = kW / kVA. A power factor of 0.8 is typical on board." },
    ],
    bankQuestions: [
      { q: "What is the formula for calculating alternator frequency?", a: "f = (n x p) / 60, where f = frequency in Hz, n = rotational speed in rpm, p = number of pole pairs. Example: alternator with 2 pole pairs at 1500 rpm => f = (1500 x 2) / 60 = 50 Hz." },
      { q: "What is the role of the AVR (Automatic Voltage Regulator)?", a: "The AVR automatically regulates the alternator output voltage by adjusting the rotor excitation current. When load increases and voltage tends to drop, the AVR increases excitation current to maintain stable voltage at ±2% of nominal value." },
      { q: "What is the governor and which electrical parameter does it control?", a: "The governor (speed regulator) maintains the diesel engine rotation speed constant (1500 or 1800 rpm) despite load variations. By maintaining constant speed, it indirectly maintains the FREQUENCY (50 or 60 Hz) of the current produced." },
      { q: "What are the three conditions required for parallel operation of two alternators?", a: "1. Same voltage: incoming generator voltage must equal busbar voltage (±5%). Adjust with AVR. 2. Same frequency: 50 Hz or 60 Hz (±0.5 Hz). Adjust with governor. 3. Same phase (phase concordance): sinusoidal waves must be in phase. Check with synchroscope or synchronising lamps." },
      { q: "How does a synchroscope work and how is its position read?", a: "The synchroscope compares voltage and frequency of the incoming generator against the network. Its needle rotates: clockwise if incoming generator is TOO FAST, anticlockwise if TOO SLOW. Close the breaker when needle reaches 12 o'clock = phases aligned, ideally with slight clockwise rotation so the generator immediately picks up load." },
      { q: "What is the difference between active power (kW) and reactive power (kVAR)?", a: "Active power (kW): power actually converted to mechanical work or heat. Controlled by governor (diesel engine fuel). Reactive power (kVAR): exchanged between network and inductive loads — produces no useful work but necessary for their operation. Controlled by AVR (alternator excitation). Apparent power (kVA) = sqrt(kW2 + kVAR2). Power factor cos phi = kW/kVA." },
      { q: "Why does a vessel have several generating sets?", a: "Several reasons: Redundancy and safety (if one set fails, others maintain continuity). Load adaptation (at low load, run only one set to save fuel). Maintenance (one set can be stopped for maintenance while others run). Number and power calculated to cover 100% maximum demand with one set in reserve." },
      { q: "What is a busbar and what is its role?", a: "A busbar is a solid copper (or aluminium) conductor forming the central connection point of the Main Switchboard (MSB). All generating sets connect to it via their circuit breakers, and all distribution circuits depart from it. Allows parallel operation and power distribution throughout the vessel. Generally divided into sections that can be isolated." },
      { q: "What is reverse power protection and why is it necessary?", a: "Reverse power protection detects when a coupled alternator absorbs power instead of producing it. Without this protection, the alternator would act as a motor, causing diesel engine damage (reverse driving) and voltage drop. It trips the faulty alternator's circuit breaker." },
      { q: "What is the emergency generator and what are its SOLAS requirements?", a: "The emergency generator is an independent set located above the waterline, supplying vital equipment during total main power failure. SOLAS requirements: automatic start within 30 seconds, minimum autonomy of 18 hours for passenger vessels (3 hours for cargo), mandatory supply: navigation, communication, fire pump, emergency lighting, fire-fighting systems." },
      { q: "How is load transfer from one generator to another performed?", a: "Load transfer procedure: 1. Connect generator A to network (B already running). 2. Progressively increase A's load using governor. 3. Simultaneously reduce B's load. 4. When B is at zero load, open its breaker. 5. Stop B. Important: never cut abruptly — proceed gradually to avoid voltage and frequency transients." },
      { q: "What are the standard voltage and frequency on board modern vessels?", a: "Main voltage: 440V three-phase (motors, pumps, compressors). Large vessels may use 6.6 kV or 11 kV. Secondary voltage: 220V single-phase (lighting, sockets). Control: 24V DC. Frequency: 60 Hz (US, Japanese vessels) or 50 Hz (European vessels)." },
      { q: "Explain what an ACB (Air Circuit Breaker) is and its protection functions.", a: "An ACB is a high-power circuit breaker using air as arc extinguishing medium. Functions: 1. Overcurrent (overload) protection — trips after delay if I > In. 2. Short-circuit protection — trips instantly if I >> In. 3. Undervoltage protection. 4. Reverse power protection. Can be operated manually. Re-closable after tripping." },
      { q: "What is the difference between a short circuit and an overload?", a: "Overload: current above nominal but below short-circuit current. Causes progressive overheating. Overload protection trips after a delay. Short circuit: direct connection between two phases or phase-neutral. Current can reach 10-20 times nominal. Instantaneous damage (electric arc, fire). Short-circuit protection trips in milliseconds." },
      { q: "What is the power factor (cos phi) and how is it improved on board?", a: "Power factor cos phi = Active power (kW) / Apparent power (kVA). Typically 0.8 on board. Improvement: capacitor banks (compensate inductive reactive power). AVR adjustment to share reactive power between coupled generators." },
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
    moduleLabel: "MAQUINAS — AUXILIARES",
    lessonTitle: "Generadores y Produccion electrica",
    lessonSub:   "Alternador, AVR, governor, acoplamiento en paralelo",
    intro: "Un buque es una central electrica flotante. La produccion, distribucion y proteccion de la energia electrica a bordo son competencias fundamentales para todo maquinista u oficial de guardia de maquinas.",
    s1title: "El grupo electrogeno — anatomia",
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
    accidentTitle: "CASO REAL: Apagon total — MV Stellar (2018)",
    accidentBody: "En el Mar de China Meridional, el buque sufrio un apagon total a las 02:15. Causa: disyuntor principal del grupo no 1 disparado por sobrecarga, grupo no 2 en mantenimiento, grupo no 3 no arrancado. El buque derivo 47 minutos sin propulsion ni gobierno. Un granelero en aproximacion paso a 0,8 millas. Causa raiz: mantenimiento del grupo no 2 en navegacion sin haber arrancado el no 3 como respaldo. Leccion: mantener SIEMPRE al menos 2 fuentes de energia disponibles y arrancar el generador de emergencia antes de cualquier mantenimiento de un grupo principal.",
    summaryTitle: "Puntos esenciales",
    summary: [
      "Un buque tiene de 2 a 4 grupos electrogenos diesel-alternador",
      "Tension estandar a bordo: 440V (trifasico) para potencia, 220V para alumbrado",
      "El acoplamiento en paralelo requiere misma tension, misma frecuencia (50/60 Hz) y misma fase",
      "El disyuntor principal (ACB) protege la red contra sobrecargas y cortocircuitos",
      "El generador de emergencia arranca automaticamente en 30s (SOLAS)",
      "Formula frecuencia: f = (n x p) / 60 — 1500 rpm x 2 pares de polos = 50 Hz",
    ],
    quizCTA: "COMENZAR EL QUIZ",
    bankStart: "COMENZAR =>",
    bankNext: "Siguiente pregunta =>",
    bankTrophy: "Enhorabuena! Banco completado",
    bankScore: "Puntuacion banco",
    components: {
      diesel:     { name: "Motor diesel de accionamiento", desc: "Motor diesel de 4 tiempos que acciona el alternador. Su velocidad de giro (1500 o 1800 rpm) determina la frecuencia de la corriente producida (50 o 60 Hz). El governor mantiene la frecuencia constante bajo carga variable." },
      alternator: { name: "Alternador (generador)",        desc: "Maquina giratoria que convierte energia mecanica en electrica por induccion electromagnetica. Produce corriente alterna trifasica. La tension es regulada por el AVR." },
      avr:        { name: "AVR — Regulador de tension",    desc: "Regula automaticamente la tension de salida del alternador ajustando la corriente de excitacion. Mantiene la tension estable (±2%) a pesar de las variaciones de carga." },
      governor:   { name: "Governor — Regulador velocidad", desc: "Mantiene constante la velocidad de rotacion del motor diesel a pesar de las variaciones de carga. Indispensable para mantener la frecuencia a 50/60 Hz." },
      breaker:    { name: "Disyuntor principal (ACB)",     desc: "Air Circuit Breaker — protege el grupo electrogeno contra sobrecargas, cortocircuitos e inversiones de fase. Se dispara automaticamente en caso de fallo." },
      bus:        { name: "Barras colectoras (busbar)",    desc: "Conductores de cobre macizo que distribuyen la energia electrica a todos los circuitos de distribucion. Punto de conexion central de todos los grupos y consumidores." },
    },
    couplingSteps: [
      { title: "1. Verificacion de tension",    desc: "Verificar que la tension del grupo entrante sea igual a la de la red (±5%). Ajustar con el reostato de excitacion o el AVR." },
      { title: "2. Verificacion de frecuencia", desc: "Verificar que la frecuencia del grupo entrante sea identica a la red (50 o 60 Hz ±0,5 Hz). Ajustar con el governor." },
      { title: "3. Verificacion de fase",       desc: "Usar el sincronoscopio o las lamparas de sincronizacion para verificar que las fases estan en concordancia antes del acoplamiento." },
      { title: "4. Cierre del disyuntor",       desc: "Cuando el sincronoscopio indica las 12 (fases alineadas), cerrar el disyuntor ACB. El grupo ya esta en paralelo con la red." },
      { title: "5. Reparto de carga",           desc: "Ajustar la carga entre los grupos modificando el governor (potencia activa — kW) y el AVR (potencia reactiva — kVAR)." },
      { title: "6. Descarga del grupo saliente", desc: "Transferir progresivamente la carga al grupo restante, luego abrir el disyuntor del grupo a parar." },
    ],
    currentTypes: {
      ac3ph:     { name: "Corriente alterna trifasica (440V)", desc: "Corriente principal a bordo. Alimenta grandes consumidores: bombas, compresores, maquinillas, propulsion. 3 fases desfasadas 120°. Frecuencia: 50 o 60 Hz segun el buque." },
      ac1ph:     { name: "Corriente alterna monofasica (220V)", desc: "Alumbrado, tomas de corriente, pequenos equipos. Derivada de la red trifasica mediante transformador. Disponible en camarotes y zonas de alojamiento." },
      dc24:      { name: "Corriente continua 24V",              desc: "Sistemas de control-mando, alarmas, automatismos, comunicacion interna. Alimentado por baterias tampon recargadas permanentemente. Funciona incluso en caso de fallo de la red principal." },
      emergency: { name: "Red de emergencia",                   desc: "Red alimentada por el generador de emergencia. Alimenta circuitos vitales: navegacion, comunicacion, bomba de incendios, alumbrado de emergencia. Debe arrancar en 30 segundos segun SOLAS." },
    },
    protections: {
      overcurrent:  { name: "Proteccion de sobreintensidad (OCPS)", desc: "Dispara el disyuntor si la corriente supera el valor nominal. Protege cables y equipos contra el sobrecalentamiento. Ajustada al 110-120% de la corriente nominal." },
      shortcircuit: { name: "Proteccion de cortocircuito",           desc: "Dispara instantaneamente en caso de cortocircuito. La corriente de cortocircuito puede ser 10 a 20 veces la nominal. Reaccion en milisegundos para limitar danos." },
      undervoltage: { name: "Proteccion de subtension",              desc: "Dispara si la tension cae por debajo del umbral critico (85% de la nominal). Protege los motores contra arranques a baja tension que sobrecalientan los devanados." },
      reversepower: { name: "Proteccion de potencia inversa",        desc: "Impide que un alternador acoplado 'motorice' (absorba potencia en lugar de producirla). Evita danos al motor diesel de accionamiento." },
      differential: { name: "Proteccion diferencial",               desc: "Compara las corrientes de entrada y salida del alternador. Cualquier desequilibrio indica un fallo interno — dispara instantaneamente para proteger el devanado." },
    },
    exercises: [
      { q: "Un grupo electrogeno gira a 1500 rpm. Cual es la frecuencia de la corriente producida y que formula permite calcularla?", a: "Frecuencia f = (n x p) / 60, donde n = velocidad en rpm y p = numero de pares de polos. Para 1500 rpm con 2 pares de polos: f = (1500 x 2) / 60 = 50 Hz. Para 60 Hz, el mismo alternador giraria a 1800 rpm. La frecuencia debe mantenerse constante (±0,5 Hz) por el governor." },
      { q: "Durante un acoplamiento en paralelo, observa que el sincronoscopio gira en sentido antihorario. Que debe hacer?", a: "Un sincronoscopio girando en sentido antihorario indica que el grupo entrante es demasiado lento (frecuencia demasiado baja). Hay que aumentar la velocidad del grupo entrante actuando sobre el governor (aceleracion). Si el sincronoscopio gira en sentido horario, el grupo es demasiado rapido — hay que frenarlo. Se cierra el disyuntor cuando el sincronoscopio llega a las 12 (posicion mediodia) con ligera tendencia a desacelerar." },
      { q: "Cual es la diferencia entre potencia activa (kW) y potencia reactiva (kVAR) a bordo? Que organo controla cada una?", a: "La potencia activa (kW) es la potencia realmente consumida para realizar un trabajo mecanico. Se controla con el governor del motor diesel (admision de combustible). La potencia reactiva (kVAR) se intercambia entre la red y las cargas inductivas (motores, transformadores) sin producir trabajo util. Se controla con el AVR (corriente de excitacion del alternador). Factor de potencia (cos phi) = kW / kVA. Un factor de 0,8 es tipico a bordo." },
    ],
    bankQuestions: [
      { q: "Cual es la formula para calcular la frecuencia de un alternador?", a: "f = (n x p) / 60. Ejemplo: 2 pares de polos a 1500 rpm => f = 50 Hz." },
      { q: "Cual es la funcion del AVR?", a: "Regula automaticamente la tension de salida del alternador ajustando la corriente de excitacion del rotor. Mantiene la tension estable a ±2% del valor nominal." },
      { q: "Que es el governor y que parametro electrico controla?", a: "El governor mantiene constante la velocidad de rotacion del motor diesel. Al mantener la velocidad constante, mantiene indirectamente la FRECUENCIA (50 o 60 Hz) de la corriente producida." },
      { q: "Cuales son las tres condiciones necesarias para acoplar dos alternadores en paralelo?", a: "1. Misma tension (±5%), ajustar con AVR. 2. Misma frecuencia (±0,5 Hz), ajustar con governor. 3. Misma fase, verificar con sincronoscopio o lamparas de sincronizacion." },
      { q: "Como funciona un sincronoscopio y como se lee su posicion?", a: "La aguja gira en sentido horario si el grupo es DEMASIADO RAPIDO, antihorario si DEMASIADO LENTO. Cerrar el disyuntor cuando la aguja llega a las 12 = fases alineadas." },
      { q: "Cual es la diferencia entre potencia activa (kW) y potencia reactiva (kVAR)?", a: "Potencia activa (kW): trabajo real, controlada por el governor. Potencia reactiva (kVAR): intercambiada con cargas inductivas sin trabajo util, controlada por el AVR. cos phi = kW/kVA, tipicamente 0,8 a bordo." },
      { q: "Por que un buque tiene varios grupos electrogenos?", a: "Redundancia, adaptacion a la carga, mantenimiento. Calculados para cubrir el 100% de la demanda maxima con un grupo de reserva." },
      { q: "Que son las barras colectoras y cual es su funcion?", a: "Conductores de cobre macizo formando el punto de conexion central del cuadro principal (MSB). Todos los grupos y circuitos se conectan a ellas." },
      { q: "Que es la proteccion de potencia inversa y por que es necesaria?", a: "Detecta cuando un alternador acoplado absorbe potencia en lugar de producirla. Dispara el disyuntor del alternador defectuoso para evitar danos al motor diesel." },
      { q: "Que es el generador de emergencia y cuales son sus obligaciones SOLAS?", a: "Grupo independiente sobre la linea de flotacion. Arranque automatico en 30 segundos. Autonomia minima 18h (pasajeros) o 3h (carga). Alimenta: navegacion, comunicacion, bomba de incendios, alumbrado de emergencia." },
      { q: "Como se realiza el trasvase de carga de un grupo a otro?", a: "1. Acoplar grupo A. 2. Aumentar carga de A con governor. 3. Reducir carga de B. 4. Abrir disyuntor de B. 5. Parar B. Nunca cortar bruscamente." },
      { q: "Cual es la tension estandar y la frecuencia estandar a bordo?", a: "440V trifasico (principales consumidores), 220V monofasico (alumbrado), 24V DC (control). Frecuencia: 60 Hz (americanos, japoneses) o 50 Hz (europeos)." },
      { q: "Explique que es un disyuntor ACB y sus funciones de proteccion.", a: "Disyuntor de alta potencia usando aire como medio de extincion. Funciones: sobreintensidad (con retardo), cortocircuito (instantaneo), subtension, potencia inversa. Rearmanable tras disparar." },
      { q: "Cual es la diferencia entre un cortocircuito y una sobrecarga?", a: "Sobrecarga: corriente superior a la nominal, sobrecalentamiento progresivo, disparo con retardo. Cortocircuito: conexion directa entre fases, corriente 10-20 veces la nominal, danos instantaneos, disparo en milisegundos." },
      { q: "Que es el factor de potencia (cos phi) y como se mejora a bordo?", a: "cos phi = kW/kVA. Tipicamente 0,8 a bordo. Mejora: bancos de condensadores, ajuste del AVR para repartir la potencia reactiva entre grupos acoplados." },
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
    moduleLabel: "MAQUINAS — AUXILIARES",
    lessonTitle: "Geradores e Producao eletrica",
    lessonSub:   "Alternador, AVR, governor, operacao em paralelo",
    intro: "Um navio e uma central eletrica flutuante. A producao, distribuicao e protecao da energia eletrica a bordo sao competencias fundamentais para qualquer maquinista ou oficial de quarto de maquinas.",
    s1title: "O grupo gerador — anatomia",
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
    accidentTitle: "CASO REAL: Apagao total — MV Stellar (2018)",
    accidentBody: "No Mar do Sul da China, o navio sofreu um apagao total as 02h15. Causa: disjuntor principal do grupo no 1 disparado por sobrecarga, grupo no 2 em manutencao, grupo no 3 nao arrancado. O navio derivou 47 minutos sem propulsao nem governo. Um graneleiro em aproximacao passou a 0,8 milhas. Causa raiz: manutencao do grupo no 2 em navegacao sem ter arrancado o no 3 como reserva. Licao: manter SEMPRE pelo menos 2 fontes de energia disponiveis e arrancar o gerador de emergencia antes de qualquer manutencao de um grupo principal.",
    summaryTitle: "Pontos essenciais",
    summary: [
      "Um navio tem 2 a 4 grupos geradores diesel-alternador",
      "Tensao padrao a bordo: 440V (trifasico) para potencia, 220V para iluminacao",
      "A operacao em paralelo requer mesma tensao, mesma frequencia (50/60 Hz) e mesma fase",
      "O disjuntor principal (ACB) protege a rede contra sobrecargas e curto-circuitos",
      "O gerador de emergencia arranca automaticamente em 30s (SOLAS)",
      "Formula frequencia: f = (n x p) / 60 — 1500 rpm x 2 pares de polos = 50 Hz",
    ],
    quizCTA: "COMECAR O QUIZ",
    bankStart: "COMECAR =>",
    bankNext: "Proxima pergunta =>",
    bankTrophy: "Parabens! Banco concluido",
    bankScore: "Pontuacao banco",
    components: {
      diesel:     { name: "Motor diesel de acionamento",  desc: "Motor diesel de 4 tempos que aciona o alternador. A sua velocidade de rotacao (1500 ou 1800 rpm) determina a frequencia da corrente produzida (50 ou 60 Hz). O governor mantém a frequencia constante sob carga variavel." },
      alternator: { name: "Alternador (gerador)",         desc: "Maquina rotativa que converte energia mecanica em eletrica por inducao eletromagnetica. Produz corrente alternada trifasica. A tensao e regulada pelo AVR." },
      avr:        { name: "AVR — Regulador de tensao",    desc: "Regula automaticamente a tensao de saida do alternador ajustando a corrente de excitacao. Mantem a tensao estavel (±2%) apesar das variacoes de carga." },
      governor:   { name: "Governor — Regulador velocidade", desc: "Mantem a velocidade de rotacao do motor diesel constante apesar das variacoes de carga. Indispensavel para manter a frequencia a 50/60 Hz." },
      breaker:    { name: "Disjuntor principal (ACB)",    desc: "Air Circuit Breaker — protege o grupo gerador contra sobrecargas, curto-circuitos e inversoes de fase. Dispara automaticamente em caso de defeito." },
      bus:        { name: "Barras coletoras (busbar)",    desc: "Condutores de cobre macico que distribuem a energia eletrica a todos os circuitos de distribuicao. Ponto de ligacao central de todos os grupos e consumidores." },
    },
    couplingSteps: [
      { title: "1. Verificacao de tensao",    desc: "Verificar que a tensao do grupo entrante e igual a tensao da rede (±5%). Ajustar com o reostato de excitacao ou o AVR." },
      { title: "2. Verificacao de frequencia", desc: "Verificar que a frequencia do grupo entrante e identica a da rede (50 ou 60 Hz ±0,5 Hz). Ajustar com o governor." },
      { title: "3. Verificacao de fase",      desc: "Usar o sincronoscópio ou as lampadas de sincronizacao para verificar a concordancia de fases antes do acoplamento." },
      { title: "4. Fecho do disjuntor",       desc: "Quando o sincronoscópio indica 12h (fases alinhadas), fechar o disjuntor ACB. O grupo esta agora em paralelo com a rede." },
      { title: "5. Reparticao de carga",      desc: "Ajustar a carga entre os grupos modificando o governor (potencia ativa — kW) e o AVR (potencia reativa — kVAR)." },
      { title: "6. Descarga do grupo sainte", desc: "Transferir progressivamente a carga para o grupo restante, depois abrir o disjuntor do grupo a parar." },
    ],
    currentTypes: {
      ac3ph:     { name: "Corrente alternada trifasica (440V)", desc: "Corrente principal a bordo. Alimenta grandes consumidores: bombas, compressores, guinchos, propulsao. 3 fases desfasadas 120°. Frequencia: 50 ou 60 Hz conforme o navio." },
      ac1ph:     { name: "Corrente alternada monofasica (220V)", desc: "Iluminacao, tomadas de corrente, pequenos equipamentos. Derivada da rede trifasica via transformador. Disponivel nas cabinas e espacos de alojamento." },
      dc24:      { name: "Corrente continua 24V",               desc: "Sistemas de controlo-comando, alarmes, automatismos, comunicacao interna. Alimentado por baterias tampao continuamente recarregadas. Funciona mesmo em caso de falha da rede principal." },
      emergency: { name: "Rede de emergencia",                  desc: "Rede alimentada pelo gerador de emergencia. Alimenta circuitos vitais: navegacao, comunicacao, bomba de incendio, iluminacao de emergencia. Deve arrancar em 30 segundos segundo o SOLAS." },
    },
    protections: {
      overcurrent:  { name: "Protecao de sobrecorrente (OCPS)", desc: "Dispara o disjuntor se a corrente exceder o valor nominal. Protege cabos e equipamentos contra sobreaquecimento. Regulada a 110-120% da corrente nominal." },
      shortcircuit: { name: "Protecao de curto-circuito",       desc: "Dispara instantaneamente em caso de curto-circuito. A corrente de curto-circuito pode ser 10 a 20 vezes a nominal. Reacao em milissegundos para limitar danos." },
      undervoltage: { name: "Protecao de subtensao",            desc: "Dispara se a tensao cair abaixo do limiar critico (85% da nominal). Protege os motores contra arranques a baixa tensao que sobreaquece os enrolamentos." },
      reversepower: { name: "Protecao de potencia inversa",     desc: "Impede que um alternador acoplado 'motorize' (absorva potencia em vez de a produzir). Evita danos ao motor diesel de acionamento." },
      differential: { name: "Protecao diferencial",             desc: "Compara as correntes de entrada e saida do alternador. Qualquer desequilibrio indica um defeito interno — dispara instantaneamente para proteger o enrolamento." },
    },
    exercises: [
      { q: "Um grupo gerador gira a 1500 rpm. Qual e a frequencia da corrente produzida e que formula permite calcula-la?", a: "Frequencia f = (n x p) / 60, onde n = velocidade em rpm e p = numero de pares de polos. Para 1500 rpm com 2 pares de polos: f = (1500 x 2) / 60 = 50 Hz. Para 60 Hz, o mesmo alternador giraria a 1800 rpm. A frequencia deve ser mantida constante (±0,5 Hz) pelo governor." },
      { q: "Durante uma operacao em paralelo, observa que o sincronoscópio gira no sentido anti-horario. O que deve fazer?", a: "Um sincronoscópio girando no sentido anti-horario indica que o grupo entrante e demasiado lento (frequencia demasiado baixa). Aumentar a velocidade do grupo entrante atuando no governor (aceleracao). Se girar no sentido horario, o grupo e demasiado rapido — trava-lo. Fechar o disjuntor quando o sincronoscópio chega as 12h (posicao meio-dia) com ligeira tendencia a desacelerar." },
      { q: "Qual e a diferenca entre potencia ativa (kW) e potencia reativa (kVAR) a bordo? Que orgao controla cada uma?", a: "A potencia ativa (kW) e a potencia realmente consumida para realizar trabalho mecanico. Controlada pelo governor do motor diesel (admissao de combustivel). A potencia reativa (kVAR) e trocada entre a rede e as cargas indutivas (motores, transformadores) sem produzir trabalho util. Controlada pelo AVR (corrente de excitacao do alternador). Fator de potencia (cos phi) = kW / kVA. Um fator de 0,8 e tipico a bordo." },
    ],
    bankQuestions: [
      { q: "Qual e a formula para calcular a frequencia de um alternador?", a: "f = (n x p) / 60. Exemplo: 2 pares de polos a 1500 rpm => f = 50 Hz." },
      { q: "Qual e o papel do AVR?", a: "Regula automaticamente a tensao de saida do alternador ajustando a corrente de excitacao do rotor. Mantem a tensao estavel a ±2% do valor nominal." },
      { q: "O que e o governor e que parametro eletrico controla?", a: "O governor mantem a velocidade de rotacao do motor diesel constante. Ao manter a velocidade constante, mantem indiretamente a FREQUENCIA (50 ou 60 Hz) da corrente produzida." },
      { q: "Quais sao as tres condicoes necessarias para operar dois alternadores em paralelo?", a: "1. Mesma tensao (±5%), ajustar com AVR. 2. Mesma frequencia (±0,5 Hz), ajustar com governor. 3. Mesma fase, verificar com sincronoscópio ou lampadas de sincronizacao." },
      { q: "Como funciona um sincronoscópio e como se le a sua posicao?", a: "A agulha gira no sentido horario se o grupo e DEMASIADO RAPIDO, no sentido anti-horario se DEMASIADO LENTO. Fecha o disjuntor quando a agulha chega as 12h = fases alinhadas." },
      { q: "Qual e a diferenca entre potencia ativa (kW) e potencia reativa (kVAR)?", a: "Potencia ativa (kW): trabalho real, controlada pelo governor. Potencia reativa (kVAR): trocada com cargas indutivas sem trabalho util, controlada pelo AVR. cos phi = kW/kVA, tipicamente 0,8 a bordo." },
      { q: "Por que um navio tem varios grupos geradores?", a: "Redundancia, adaptacao a carga, manutencao. Calculados para cobrir 100% da demanda maxima com um grupo de reserva." },
      { q: "O que sao as barras coletoras e qual e o seu papel?", a: "Condutores de cobre macico formando o ponto de ligacao central do Quadro Principal (MSB). Todos os grupos e circuitos ligam-se a elas." },
      { q: "O que e a protecao de potencia inversa e por que e necessaria?", a: "Deteta quando um alternador acoplado absorve potencia em vez de a produzir. Dispara o disjuntor do alternador com defeito para evitar danos ao motor diesel." },
      { q: "O que e o gerador de emergencia e quais os requisitos SOLAS?", a: "Grupo independente acima da linha de agua. Arranque automatico em 30 segundos. 18h de autonomia (passageiros) ou 3h (carga). Alimenta: navegacao, comunicacao, bomba de incendio, iluminacao de emergencia." },
      { q: "Como se realiza a transferencia de carga de um grupo para outro?", a: "1. Acoplar grupo A. 2. Aumentar carga de A com governor. 3. Reduzir carga de B. 4. Abrir disjuntor de B. 5. Parar B. Nunca cortar abruptamente." },
      { q: "Quais sao a tensao e frequencia padrao a bordo dos navios modernos?", a: "440V trifasico (principais consumidores), 220V monofasico (iluminacao), 24V DC (controlo). Frequencia: 60 Hz (EUA, Japao) ou 50 Hz (Europa)." },
      { q: "Explique o que e um disjuntor ACB e as suas funcoes de protecao.", a: "Disjuntor de alta potencia usando ar como meio de extincao de arco. Funcoes: sobrecorrente (com atraso), curto-circuito (instantaneo), subtensao, potencia inversa. Rearmaavel apos disparo." },
      { q: "Qual e a diferenca entre curto-circuito e sobrecarga?", a: "Sobrecarga: corrente acima da nominal, sobreaquecimento progressivo, disparo com atraso. Curto-circuito: ligacao direta entre fases, corrente 10-20 vezes a nominal, danos instantaneos, disparo em milissegundos." },
      { q: "O que e o fator de potencia e como se melhora a bordo?", a: "cos phi = kW/kVA. Tipicamente 0,8 a bordo. Melhora: bancos de condensadores, ajuste do AVR para repartir a potencia reativa entre grupos acoplados." },
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

// ── SVG 1 — GENERATOR ANATOMY ────────────────────────────────
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

// ── SVG 2 — PARALLEL COUPLING ────────────────────────────────
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

// ── SVG 3 — CURRENT TYPES ────────────────────────────────────
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
        <text x="80" y="70" fontSize="8" fill={C.green} fontFamily="Courier New" textAnchor="middle">24V DC — stable</text>
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

// ── SVG 4 — PROTECTIONS ──────────────────────────────────────
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
        {Object.entries(prots).map(([key,val]:any)=>{const col=protColors[key]||C.warn;return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`}}><div style={{fontSize:16,marginBottom:4}}>{protIcons[key]}</div><div style={{fontSize:10,fontWeight:700,color:C.white,fontFamily:"Courier New",lineHeight:1.4}}>{val.name.split("(")[0].split("—")[0].trim()}</div></button>);}) }
      </div>
      {sel&&(<div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${protColors[sel]||C.warn}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}><div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{prots[sel]?.name}</div>{prots[sel]?.desc}</div>)}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}
// LessonE2_L4 — Generateurs & Production electrique | PART 2

export default function LessonE2_L4({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
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

  const section=(icon:string,title:string,children:React.ReactNode,col=C.cyan)=>(
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
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.cyan}33`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
        <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>&#9664;</button>
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
                <button onClick={()=>setBankAns(true)} disabled={bankAns} style={{padding:"8px 16px",borderRadius:8,fontSize:11,cursor:bankAns?"default":"pointer",background:bankAns?`${C.cyan}22`:"rgba(255,255,255,0.06)",border:`1px solid ${bankAns?C.cyan:"rgba(255,255,255,0.15)"}`,color:bankAns?C.cyan:"rgba(240,244,255,0.5)",fontFamily:"Courier New",marginBottom:bankAns?10:0}}>{bankAns?t.hideAnswer:t.showAnswer}</button>
                {bankAns&&(<div><div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.cyan}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{bank[bankCur].a}</div><button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?t.bankTrophy:t.bankNext}</button></div>)}
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
