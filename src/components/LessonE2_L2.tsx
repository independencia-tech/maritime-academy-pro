// LessonE2_L2 - Compresseurs & Systemes Air | PART 1
import { useState } from "react";

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
    lessonTitle: "Compresseurs & Systemes Air",
    lessonSub:   "Pistons, vis, circuit HP, bouteilles SOLAS",
    intro: "L'air comprime est vital a bord : il sert au demarrage du moteur principal, aux commandes pneumatiques, aux sifflets, aux outils et a la purge des circuits. Un navire possede generalement 2 a 3 compresseurs d'air de demarrage et des bouteilles d'air a haute pression.",
    s1title: "Types de compresseurs marins",
    s2title: "Circuit d'air comprime a bord",
    s3title: "Securites et defauts courants",
    s4title: "Maintenance compresseur",
    s1hint:  "Selectionnez un type de compresseur",
    s2hint:  "Tapez un composant pour sa description",
    s3hint:  "Selectionnez un defaut",
    s4hint:  "Selectionnez une operation de maintenance",
    exerciseTitle: "Exercices pratiques",
    showAnswer: "Voir la correction",
    hideAnswer: "Masquer",
    accidentTitle: "CAS REEL : Explosion du regard de purge d'une bouteille d'air principale",
    accidentBody: "Un quatrieme mecanicien effectuait sa ronde de routine en salle des machines, incluant la purge quotidienne des bouteilles d'air principales et auxiliaires. Il a ouvert les deux robinets de purge en ligne de la bouteille principale avant, restant a proximite pour observer l'ecoulement du condensat a travers le regard de visualisation du pot de purge. Peu apres, sans aucun signe avant-coureur, le regard en verre a explose. Le mecanicien a ete retrouve grievement blesse, inconscient mais respirant encore ; il est decede environ 30 minutes plus tard malgre les premiers secours et l'intervention d'une equipe medicale heliportee. L'enquete a etabli qu'un condensat s'etait accumule pendant la nuit dans la bouteille d'air principale (environ 30 bar). A l'ouverture des robinets de purge, ce condensat a atteint le pot de purge en quantite suffisante pour couvrir l'orifice d'evacuation, provoquant une brusque montee en pression qui a fait eclater le regard en verre. La position des robinets de purge, juste derriere le regard, placait le haut du corps du mecanicien directement dans la trajectoire de l'explosion.",
    summaryTitle: "Points essentiels",
    summary: [
      "Les bouteilles d'air de demarrage sont chargees a 25-30 bar - 12 demarrages min. (SOLAS)",
      "La compression multi-etagee avec intercooler reduit la puissance de 15-30%",
      "L'humidite et l'huile dans l'air comprime sont mortelles - purgeurs et separateurs obligatoires",
      "La soupape de surete est reglee a 10% au-dessus de la pression de service",
      "Purger systematiquement les bouteilles avant chaque demarrage du moteur principal",
      "Point de rosee air instrument < -40 degC ; air de service < +3 degC",
    ],
    quizCTA: "COMMENCER LE QUIZ",
    bankStart: "COMMENCER =>",
    bankNext: "Question suivante =>",
    bankTrophy: "Bravo ! Banque terminee",
    bankScore: "Score banque",
    compTypes: {
      piston:       { name: "Compresseur a pistons (alternatif)", desc: "Le plus courant a bord. Un ou plusieurs pistons compriment l'air en plusieurs etages. Refroidissement interetage obligatoire (intercooler). Pression de sortie : 25-30 bar (demarrage) ou 6-7 bar (service). Avantages : fiable, haute pression, facile a entretenir." },
      screw:        { name: "Compresseur a vis",                  desc: "Deux rotors helicoidaux compriment l'air en continu. Debit eleve, faibles vibrations, silencieux. Pression limitee (jusqu'a 13 bar). Utilise pour l'air de service (outils, commandes). Necessite une injection d'huile pour le refroidissement et l'etancheite." },
      centrifugal:  { name: "Compresseur centrifuge (turbo)",     desc: "Comprime l'air par force centrifuge dans une roue a aubes. Tres haut debit, faibles vibrations. Utilise pour la suralimentation des moteurs diesel (turbocharger). Pas adapte aux tres hautes pressions." },
      vane:         { name: "Compresseur a palettes",             desc: "Un rotor excentre avec des palettes coulissantes comprime l'air. Compact et silencieux. Pression moderee (jusqu'a 8 bar). Utilise pour les petits circuits pneumatiques de controle et les outils legers." },
    },
    circuitComponents: {
      compressor:  { name: "Compresseur",                      desc: "Comprime l'air de la pression atmospherique a la pression de service. Generalement 2-3 compresseurs a bord : 2 compresseurs principaux pour la charge des bouteilles de demarrage, 1 compresseur de service pour l'air a basse pression." },
      intercooler: { name: "Refrigerant interetage (Intercooler)", desc: "Refroidit l'air entre les etages de compression pour ameliorer le rendement et reduire la temperature. Sans intercooler, la temperature peut depasser 300 degC, detruisant les joints et les huiles." },
      aftercooler: { name: "Refrigerant final (Aftercooler)",   desc: "Refroidit l'air apres la compression finale pour condenser l'humidite. Permet d'eliminer 80-90% de l'humidite avant le secheur." },
      separator:   { name: "Separateur eau/huile",             desc: "Elimine l'eau condensee et les traces d'huile de l'air comprime. Equipe d'un purgeur automatique. Obligatoire avant les bouteilles de demarrage pour eviter les coups d'eau dans le moteur." },
      bottle:      { name: "Bouteille d'air (reservoir)",      desc: "Stocke l'air comprime. Bouteilles de demarrage : 25-30 bar, volume calcule pour 12 demarrages consecutifs (SOLAS). Equipees d'une soupape de surete, d'un manometre, d'un purgeur et d'une vanne de sectionnement." },
      dryer:       { name: "Secheur d'air",                    desc: "Elimine l'humidite residuelle par adsorption (gel de silice) ou refrigeration. Obligatoire pour les circuits d'instruments, de commandes pneumatiques. Point de rosee < -40 degC requis pour l'air instrument." },
    },
    faults: {
      hightemp:    { name: "Temperature de refoulement trop elevee", cause: "Refrigerant interetage encrase, manque d'eau de refroidissement, soupapes de refoulement defectueuses (fuites), filtre d'aspiration colmate.", remedy: "Nettoyer le refrigerant, verifier le debit d'eau de refroidissement, controler et remplacer les soupapes, nettoyer le filtre d'aspiration." },
      lowpressure: { name: "Pression finale insuffisante",          cause: "Fuites sur le circuit, soupapes d'aspiration ou de refoulement defectueuses, segments de piston uses, filtre d'aspiration colmate.", remedy: "Controler les fuites sur le circuit, remplacer les soupapes, controler la compression a chaque etage, nettoyer ou remplacer le filtre." },
      oilcontam:   { name: "Contamination par l'huile",             cause: "Usure des segments et des gorges de piston, niveau d'huile trop eleve, temperature d'huile insuffisante (huile non vaporisee).", remedy: "Controler et remplacer les segments, ramener le niveau d'huile a la normale, verifier la temperature d'huile." },
      vibration:   { name: "Vibrations et bruits anormaux",         cause: "Soupapes defectueuses (claquements), roulements uses, corps etranger dans le cylindre, desequilibre du vilebrequin.", remedy: "Inspecter et remplacer les soupapes, remplacer les roulements, inspecter le cylindre, equilibrer ou remplacer le vilebrequin." },
    },
    maintenance: {
      daily:   { name: "Entretien quotidien",      desc: "Purger les separateurs d'eau (manuellement si pas automatique), controler le niveau d'huile carter, noter les pressions et temperatures dans le journal machine, verifier l'absence de fuites visibles." },
      weekly:  { name: "Entretien hebdomadaire",   desc: "Tester les purgeurs automatiques, verifier la temperature de l'eau de refroidissement, controler la tension des courroies (si entrainement par courroies), nettoyer le filtre d'aspiration." },
      monthly: { name: "Entretien mensuel",        desc: "Changer l'huile moteur (ou selon heures de fonctionnement), inspecter les soupapes d'aspiration et de refoulement, controler l'etat des joints, tester la soupape de surete." },
      annual:  { name: "Entretien annuel/revision",desc: "Demontage complet, mesure des jeux de pistons et cylindres, remplacement des segments, bagues et joints, nettoyage complet des refrigerants, calibrage de la soupape de surete, test de pression hydrostatique de la bouteille." },
    },
    exercises: [
      { q: "Pourquoi la compression de l'air s'effectue-t-elle en plusieurs etages avec refroidissement interetage ? Quels sont les avantages ?", a: "La compression d'air en plusieurs etages avec refroidissement interetage presente plusieurs avantages essentiels : 1. Efficacite energetique : refroidir l'air entre les etages rapproche le cycle de la compression isotherme (ideale), reduisant la puissance necessaire de 15-30% par rapport a une compression adiabatique. 2. Controle de la temperature : sans refroidissement, la temperature peut depasser 300-400 degC a 25 bar, detruisant les joints, les huiles et risquant l'inflammation des huiles (explosion). 3. Meilleure densite : l'air refroidi est plus dense, permettant a l'etage suivant de traiter plus de masse par cycle. 4. Duree de vie : les temperatures reduites preservent les joints, les soupapes et les segments." },
      { q: "Qu'est-ce qu'un coup d'eau dans un moteur diesel et comment l'air comprime peut-il en etre la cause ?", a: "Un coup d'eau se produit quand de l'eau penetre dans les cylindres d'un moteur diesel pendant la compression ou la combustion. L'eau etant incompressible, elle cause une surpression instantanee qui peut plier ou briser la bielle et le piston. Mecanisme via l'air comprime : si les bouteilles d'air de demarrage contiennent de l'eau condensee (defaut de purge ou de sechage), cette eau est injectee dans les cylindres lors du demarrage avec l'air. Prevention : purger systematiquement les bouteilles et separateurs avant chaque demarrage, verifier le bon fonctionnement des purgeurs automatiques, utiliser un secheur d'air efficace." },
      { q: "Quelles sont les precautions a prendre avant d'effectuer une maintenance sur un compresseur d'air a haute pression ?", a: "Precautions obligatoires (consignation LOTO) : 1. Isolation electrique : couper l'alimentation electrique du moteur et cadenasser le disjoncteur. 2. Isolement pneumatique : fermer les vannes d'isolement des bouteilles et du circuit aval, depressuriser le circuit jusqu'au compresseur. 3. Verification de la depressurisation : controler les manometres de chaque etage - pression = 0 bar. 4. Ventilation : si travail dans un espace confine, s'assurer d'une ventilation suffisante (risque d'enrichissement en O2 ou de vapeurs d'huile). 5. Mise en place de la signalisation : afficher 'En cours de maintenance - Ne pas demarrer'. 6. Attente du refroidissement. 7. Outils adaptes : utiliser uniquement des outils compatibles avec l'air comprime (pas d'outil avec residus de graisse)." },
    ],
    bankQuestions: [
      { q: "Pourquoi purger les bouteilles d'air de demarrage avant chaque demarrage du moteur principal ?", opts: ["Pour augmenter la pression disponible","Pour eliminer l'eau condensee et eviter un coup d'eau dans les cylindres","Pour refroidir l'air avant utilisation","Pour tester la soupape de surete"], correct: 1, expl: "L'eau condensee accumulee au fond de la bouteille peut, si elle entre dans les cylindres, provoquer un coup d'eau : incompressible, elle cree une surpression instantanee qui peut plier ou briser bielles et pistons." },
      { q: "Selon SOLAS, combien de demarrages consecutifs du moteur principal les bouteilles d'air doivent-elles permettre sans recharge ?", opts: ["6","12","20","30"], correct: 1, expl: "SOLAS impose une capacite minimale de 12 demarrages consecutifs pour un moteur reversible (6 pour un moteur a sens unique avec marche arriere vapeur/electrique), a une pression de service typique de 25-30 bar." },
      { q: "Dans un compresseur a pistons a deux etages, quel est le role du refrigerant interetage (intercooler) ?", opts: ["Augmenter la pression avant le 2e etage","Refroidir l'air pour ameliorer l'efficacite et la densite avant le 2e etage","Filtrer les particules solides","Lubrifier le piston du 2e etage"], correct: 1, expl: "Refroidir l'air entre les etages rapproche le cycle de la compression isotherme, reduit la puissance necessaire de 15 a 30% et augmente la densite de l'air traite par l'etage suivant." },
      { q: "Comment fonctionne un purgeur automatique a flotteur ?", opts: ["Il s'ouvre a intervalles de temps fixes quelle que soit la quantite d'eau","Un flotteur monte avec l'eau accumulee et ouvre la vanne de purge automatiquement","Il utilise uniquement un capteur de pression","Il fonctionne uniquement manuellement"], correct: 1, expl: "Le purgeur a flotteur declenche l'ouverture de la vanne de purge des que le niveau d'eau accumulee souleve le flotteur jusqu'a un seuil donne, evacuant l'eau sans perte d'air significative." },
      { q: "Quel est le risque principal d'une contamination par l'huile dans l'air de demarrage ?", opts: ["Une baisse de pression progressive","Un risque d'explosion (effet diesel) dans la tuyauterie de demarrage","Une augmentation du point de rosee uniquement","Aucun risque significatif"], correct: 1, expl: "L'huile melangee a l'air comprime a haute temperature peut provoquer une auto-inflammation (effet diesel) dans la tuyauterie de demarrage, en plus de colmater les vannes de demarrage par depots carbones." },
      { q: "A quelle pression est generalement reglee la soupape de surete d'une bouteille d'air comprime ?", opts: ["Egale a la pression de service","10% au-dessus de la pression maximale de service","50% au-dessus de la pression de service","Independante de la pression de service"], correct: 1, expl: "La soupape de surete s'ouvre a 10% au-dessus de la pression maximale de service : pour une bouteille de 25 bar, elle s'ouvre vers 27,5 bar ; pour 30 bar, vers 33 bar." },
      { q: "Quelle est la difference principale entre l'air de demarrage et l'air de service a bord ?", opts: ["Aucune difference, meme circuit","L'air de demarrage est haute pression (25-30 bar), l'air de service est basse pression (6-7 bar)","L'air de service sert uniquement au moteur principal","L'air de demarrage n'a pas besoin d'etre seche"], correct: 1, expl: "L'air de demarrage (25-30 bar) demarre le moteur principal via un circuit securise SOLAS. L'air de service (6-7 bar), produit separement, alimente outils pneumatiques et vannes automatiques." },
      { q: "Comment verifier l'efficacite d'un intercooler ?", opts: ["En mesurant uniquement la pression de refoulement","En comparant les temperatures d'entree/sortie d'air et en controlant la perte de charge (moins de 0,3 bar)","En verifiant le niveau d'huile du compresseur","En mesurant la vitesse de rotation du moteur"], correct: 1, expl: "Un intercooler efficace ramene la temperature de l'air a moins de 40-50 degC au-dessus de la temperature d'eau de refroidissement, avec une perte de charge inferieure a 0,3 bar." },
      { q: "A quelle frequence une bouteille d'air comprime doit-elle subir un test de pression hydrostatique ?", opts: ["Tous les ans","Tous les 5 ans","Tous les 10 ans","Jamais si elle n'a pas de fuite visible"], correct: 1, expl: "Le test hydrostatique (bouteille remplie d'eau, pressurisee a 1,5 fois la pression de service) est obligatoire tous les 5 ans pour detecter fissures et deformations, en plus de l'inspection visuelle interne tous les 2,5 ans." },
      { q: "Qu'est-ce que le point de rosee de l'air comprime ?", opts: ["La pression maximale de l'air comprime","La temperature a laquelle la vapeur d'eau commence a se condenser","La temperature de fonctionnement du compresseur","Le debit d'air produit par le compresseur"], correct: 1, expl: "Un point de rosee trop eleve entraine la formation d'eau liquide dans les conduites (corrosion, coup d'eau). L'air instrument exige un point de rosee inferieur a -40 degC, l'air de service inferieur a +3 degC." },
      { q: "Lors du demarrage pneumatique d'un moteur diesel principal, quel dispositif repartit l'air dans les cylindres dans l'ordre d'allumage ?", opts: ["Le regulateur de vitesse","Le distributeur d'air de demarrage (starting air distributor)","Le turbocompresseur","Le vireur"], correct: 1, expl: "Le distributeur d'air de demarrage repartit l'air a 25-30 bar dans les vannes de demarrage de chaque cylindre dans l'ordre d'allumage, faisant tourner le vilebrequin jusqu'a l'injection de combustible." },
      { q: "Avant d'ouvrir un circuit d'air comprime haute pression pour maintenance, que faut-il imperativement verifier ?", opts: ["Que la pompe a huile fonctionne","Que la pression est a 0 bar sur tous les manometres du circuit","Que le moteur principal est en marche","Rien de particulier si le compresseur est arrete"], correct: 1, expl: "La depressurisation complete (0 bar sur tous les manometres du circuit concerne) et l'isolement des vannes en amont/aval sont des prealables obligatoires avant toute intervention." },
      { q: "Qu'est-ce que l'effet diesel (auto-inflammation) dans une tuyauterie d'air comprime ?", opts: ["Un phenomene sans danger","Une explosion violente causee par la compression brutale d'un melange air-huile","Une simple perte de pression","Un bruit anormal du compresseur"], correct: 1, expl: "Un melange air-huile comprime brusquement peut atteindre le point d'auto-inflammation de l'huile, provoquant une explosion dans la tuyauterie. Prevention : separation systematique de l'huile, purge reguliere des condensats." },
      { q: "La regle SOLAS relative au volume des bouteilles d'air de demarrage impose typiquement :", opts: ["Aucune exigence particuliere","12 demarrages consecutifs pour un moteur reversible (ou 6 pour un moteur a sens unique avec marche arriere vapeur/electrique)","1 seul demarrage garanti","100 demarrages consecutifs"], correct: 1, expl: "SOLAS Reg. II-1/34 impose une capacite minimale de 12 demarrages pour un moteur a double sens de marche, ou 6 demarrages pour un moteur a sens unique avec machine arriere vapeur ou electrique." },
      { q: "Selon les regles ISM/SMS, que doit-on documenter pour la maintenance des compresseurs d'air ?", opts: ["Rien, la maintenance est informelle","Le Planned Maintenance System (PMS), les certificats d'epreuve des bouteilles et le suivi des defauts","Uniquement les pannes graves","Seulement les couts de reparation"], correct: 1, expl: "Le PMS documente les intervalles de maintenance, les certificats d'epreuve hydrostatique (tous les 5 ans) et le suivi de tout defaut constate, consigne au journal de bord technique." },
    ],
    quiz: [
      { q: "A quelle pression sont chargees les bouteilles d'air de demarrage du moteur principal ?", opts: ["6-7 bar", "13-15 bar", "25-30 bar", "50-60 bar"], correct: 2, exp: "Les bouteilles d'air de demarrage sont chargees a 25-30 bar pour fournir l'energie suffisante au demarrage du moteur principal. Selon SOLAS, elles doivent permettre 12 demarrages consecutifs minimum." },
      { q: "Quel est le role du refrigerant interetage (intercooler) sur un compresseur ?", opts: ["Filtrer les impuretes de l'air", "Refroidir l'air entre les etages pour ameliorer le rendement", "Separer l'eau condensee", "Augmenter la pression"], correct: 1, exp: "L'intercooler refroidit l'air entre les etages de compression. Cela ameliore le rendement (compression plus proche de l'isotherme), reduit la temperature (protection des joints et huiles) et augmente la densite de l'air entrant dans l'etage suivant." },
      { q: "Pourquoi doit-on purger les bouteilles d'air avant le demarrage du moteur principal ?", opts: ["Pour augmenter la pression disponible", "Pour eliminer l'eau condensee et eviter un coup d'eau", "Pour refroidir l'air comprime", "Pour verifier la pression"], correct: 1, exp: "Les bouteilles doivent etre purgees pour eliminer l'eau condensee accumulee. Si cette eau entre dans les cylindres avec l'air de demarrage, elle peut provoquer un coup d'eau qui brise les bielles et pistons." },
      { q: "A quel pourcentage au-dessus de la pression de service est reglee la soupape de surete d'un compresseur ?", opts: ["5%", "10%", "20%", "50%"], correct: 1, exp: "La soupape de surete est reglee a 10% au-dessus de la pression maximale de service. Pour une bouteille de 25 bar, la soupape s'ouvre a 27,5 bar. Pour 30 bar, elle s'ouvre a 33 bar." },
      { q: "Quelle est la pression typique de l'air de service utilise pour les outils et les commandes pneumatiques ?", opts: ["1 bar", "6-7 bar", "25-30 bar", "100 bar"], correct: 1, exp: "L'air de service est a 6-7 bar, produit par un compresseur de service independant. Cette pression est suffisante pour les outils pneumatiques, les commandes de vannes automatiques et le nettoyage. L'air de demarrage (25-30 bar) est distinct et reserve aux demarrages." },
    ],
  },

  en: {
    moduleLabel: "ENGINE - AUXILIARIES",
    lessonTitle: "Compressors & Air Systems",
    lessonSub:   "Pistons, screw, HP circuit, SOLAS bottles",
    intro: "Compressed air is vital on board: used for main engine starting, pneumatic controls, whistles, tools and circuit purging. A vessel typically has 2 to 3 starting air compressors and high-pressure air bottles.",
    s1title: "Marine Compressor Types",
    s2title: "On-board Compressed Air Circuit",
    s3title: "Safety Devices and Common Faults",
    s4title: "Compressor Maintenance",
    s1hint:  "Select a compressor type",
    s2hint:  "Tap a component for its description",
    s3hint:  "Select a fault",
    s4hint:  "Select a maintenance operation",
    exerciseTitle: "Practice Exercises",
    showAnswer: "Show answer",
    hideAnswer: "Hide",
    accidentTitle: "REAL CASE: Main air receiver drain pot observation glass explosion",
    accidentBody: "A fourth engineer was carrying out his routine engine room rounds, including the daily draining of the main and auxiliary air receivers. He opened the two inline drain valves of the forward main air receiver, standing close by to watch the condensate flow through the observation glass of the drain pot. Shortly afterwards, without warning, the glass exploded. The engineer was found seriously injured, unconscious but still breathing; he died about 30 minutes later despite first aid and a medevac team's intervention. The investigation found that condensate had accumulated overnight in the main air receiver (around 30 bar). When the drain valves were opened, this condensate reached the drain pot in sufficient quantity to cover the discharge orifice, causing a sudden pressure surge that shattered the observation glass. The positioning of the drain valves directly behind the glass placed the engineer's upper body in the direct path of the explosion.",
    summaryTitle: "Key Points",
    summary: [
      "Starting air bottles charged to 25-30 bar - 12 starts min. (SOLAS)",
      "Multi-stage compression with intercooler reduces power consumption by 15-30%",
      "Moisture and oil in compressed air are deadly - drains and separators are mandatory",
      "Safety valve set at 10% above service pressure",
      "Systematically drain bottles before each main engine start",
      "Instrument air dew point < -40 degC; service air dew point < +3 degC",
    ],
    quizCTA: "START QUIZ",
    bankStart: "START =>",
    bankNext: "Next question =>",
    bankTrophy: "Well done! Bank completed",
    bankScore: "Bank score",
    compTypes: {
      piston:       { name: "Piston (reciprocating) compressor", desc: "Most common on board. One or more pistons compress air in several stages. Mandatory interstage cooling (intercooler). Output pressure: 25-30 bar (starting) or 6-7 bar (service). Advantages: reliable, high pressure, easy to maintain." },
      screw:        { name: "Screw compressor",                  desc: "Two helical rotors compress air continuously. High flow, low vibration, quiet. Pressure limited (up to 13 bar). Used for service air (tools, controls). Requires oil injection for cooling and sealing." },
      centrifugal:  { name: "Centrifugal compressor (turbo)",    desc: "Compresses air by centrifugal force in a bladed wheel. Very high flow, low vibration. Used for diesel engine supercharging (turbocharger). Not suitable for very high pressures." },
      vane:         { name: "Vane compressor",                   desc: "An eccentric rotor with sliding vanes compresses air. Compact and quiet. Moderate pressure (up to 8 bar). Used for small pneumatic control circuits and light tools." },
    },
    circuitComponents: {
      compressor:  { name: "Compressor",     desc: "Compresses air from atmospheric to service pressure. Generally 2-3 on board: 2 main compressors for charging starting bottles, 1 service compressor for low-pressure air." },
      intercooler: { name: "Intercooler",    desc: "Cools air between compression stages to improve efficiency and reduce temperature. Without intercooling, temperature can exceed 300 degC, destroying seals and oils." },
      aftercooler: { name: "Aftercooler",    desc: "Cools air after final compression to condense moisture. Removes 80-90% of moisture before the dryer." },
      separator:   { name: "Water/oil separator", desc: "Removes condensed water and oil traces from compressed air. Equipped with automatic drain. Mandatory before starting bottles to prevent water slugs in the engine." },
      bottle:      { name: "Air bottle (reservoir)", desc: "Stores compressed air. Starting bottles: 25-30 bar, volume calculated for 12 consecutive starts (SOLAS). Equipped with safety valve, pressure gauge, drain and isolation valve." },
      dryer:       { name: "Air dryer",      desc: "Removes residual moisture by adsorption (silica gel) or refrigeration. Mandatory for instrument air circuits. Required dew point < -40 degC for instrument air." },
    },
    faults: {
      hightemp:    { name: "Delivery temperature too high", cause: "Fouled intercooler, insufficient cooling water, leaking delivery valves, clogged suction filter.", remedy: "Clean intercooler, check cooling water flow, inspect and replace valves, clean suction filter." },
      lowpressure: { name: "Insufficient final pressure",  cause: "Circuit leaks, defective suction or delivery valves, worn piston rings, clogged suction filter.", remedy: "Check circuit for leaks, replace valves, check compression at each stage, clean or replace filter." },
      oilcontam:   { name: "Oil contamination",            cause: "Worn piston rings and grooves, oil level too high, insufficient oil temperature.", remedy: "Check and replace rings, restore normal oil level, check oil temperature." },
      vibration:   { name: "Abnormal vibrations and noise", cause: "Defective valves (knocking), worn bearings, foreign body in cylinder, crankshaft imbalance.", remedy: "Inspect and replace valves, replace bearings, inspect cylinder, balance or replace crankshaft." },
    },
    maintenance: {
      daily:   { name: "Daily maintenance",        desc: "Drain water separators (manually if no automatic drain), check crankcase oil level, log pressures and temperatures, check for visible leaks." },
      weekly:  { name: "Weekly maintenance",       desc: "Test automatic drains, check cooling water temperature, check belt tension (if belt drive), clean suction filter." },
      monthly: { name: "Monthly maintenance",      desc: "Change engine oil (or per running hours), inspect suction and delivery valves, check seal condition, test safety valve." },
      annual:  { name: "Annual/overhaul",          desc: "Full disassembly, measure piston and cylinder clearances, replace rings, bushes and seals, full intercooler cleaning, safety valve calibration, hydrostatic pressure test of bottle." },
    },
    exercises: [
      { q: "Why is air compression performed in multiple stages with interstage cooling? What are the advantages?", a: "Multi-stage compression with interstage cooling offers several key advantages: 1. Energy efficiency: cooling air between stages approximates isothermal compression (ideal), reducing required power by 15-30% vs adiabatic compression. 2. Temperature control: without cooling, temperature can exceed 300-400 degC at 25 bar, destroying seals, oils and risking oil ignition (explosion). 3. Better density: cooled air is denser, allowing the next stage to process more mass per cycle. 4. Service life: reduced temperatures preserve seals, valves and rings. A 2-stage compressor with intercooler is about 15% more efficient than an equivalent single-stage." },
      { q: "What is a water slug in a diesel engine and how can compressed air cause one?", a: "A water slug occurs when water enters diesel engine cylinders during compression or combustion. Water being incompressible causes instant overpressure that can bend or break connecting rods and pistons. Compressed air mechanism: if starting air bottles contain condensed water (faulty draining or drying), this water is injected into cylinders with the starting air. The compression heat vaporises it brutally, creating hydraulic shock. Prevention: systematically drain bottles and separators before each start, verify automatic drain operation, use an effective air dryer." },
      { q: "What precautions must be taken before performing maintenance on a high-pressure air compressor?", a: "Mandatory precautions (LOTO): 1. Electrical isolation: cut motor power supply and lock out the circuit breaker. 2. Pneumatic isolation: close bottle and downstream circuit isolation valves, depressurise circuit to compressor. 3. Depressurisation verification: check each stage pressure gauge - pressure = 0 bar. 4. Ventilation: if working in confined space, ensure adequate ventilation (O2 enrichment or oil vapour risk). 5. Signage: display 'Under maintenance - Do not start'. 6. Allow cooling: do not work on a hot compressor. 7. Appropriate tools: use only tools compatible with compressed air (no tools with grease residue)." },
    ],
    bankQuestions: [
      { q: "Why must starting air bottles be drained before each main engine start?", opts: ["To increase available pressure","To remove condensed water and prevent a water slug in the cylinders","To cool the air before use","To test the safety valve"], correct: 1, expl: "Condensed water accumulated at the bottom of the bottle, if it enters the cylinders, can cause a water slug: being incompressible, it creates instant overpressure that can bend or break rods and pistons." },
      { q: "Per SOLAS, how many consecutive main engine starts must the starting air bottles allow without recharging?", opts: ["6","12","20","30"], correct: 1, expl: "SOLAS requires a minimum capacity of 12 consecutive starts for a reversible engine (6 for a non-reversible engine with electric/steam reversing), at a typical service pressure of 25-30 bar." },
      { q: "In a two-stage piston compressor, what is the role of the intercooler?", opts: ["Increase pressure before the second stage","Cool the air to improve efficiency and density before the second stage","Filter solid particles","Lubricate the second-stage piston"], correct: 1, expl: "Cooling the air between stages brings the cycle closer to isothermal compression, reducing required power by 15-30% and increasing the density of air processed by the next stage." },
      { q: "How does an automatic float drain work?", opts: ["It opens at fixed time intervals regardless of water quantity","A float rises with accumulated water and automatically opens the drain valve","It only uses a pressure sensor","It only works manually"], correct: 1, expl: "The float drain opens the valve as soon as accumulated water lifts the float to a set threshold, discharging water with negligible air loss." },
      { q: "What is the main risk of oil contamination in starting air?", opts: ["A gradual pressure drop","An explosion risk (diesel effect) in the starting piping","Only an increase in dew point","No significant risk"], correct: 1, expl: "Oil mixed with high-temperature compressed air can trigger auto-ignition (diesel effect) in the starting piping, on top of clogging starting valves with carbon deposits." },
      { q: "At what pressure is a compressed air bottle's safety valve typically set?", opts: ["Equal to service pressure","10% above maximum service pressure","50% above service pressure","Independent of service pressure"], correct: 1, expl: "The safety valve opens at 10% above maximum service pressure: for a 25 bar bottle it opens around 27.5 bar; for 30 bar, around 33 bar." },
      { q: "What is the main difference between starting air and service air on board?", opts: ["No difference, same circuit","Starting air is high pressure (25-30 bar), service air is low pressure (6-7 bar)","Service air is only for the main engine","Starting air does not need drying"], correct: 1, expl: "Starting air (25-30 bar) starts the main engine through a SOLAS-secured circuit. Service air (6-7 bar), produced separately, feeds pneumatic tools and automatic valves." },
      { q: "How is intercooler effectiveness checked?", opts: ["By measuring only the discharge pressure","By comparing inlet/outlet air temperatures and checking pressure drop (under 0.3 bar)","By checking the compressor oil level","By measuring engine rotation speed"], correct: 1, expl: "An effective intercooler brings the air temperature within 40-50 degC of the cooling water temperature, with a pressure drop under 0.3 bar." },
      { q: "How often must a compressed air bottle undergo a hydrostatic pressure test?", opts: ["Every year","Every 5 years","Every 10 years","Never if there is no visible leak"], correct: 1, expl: "The hydrostatic test (bottle filled with water, pressurised to 1.5x service pressure) is mandatory every 5 years to detect cracks and deformation, alongside internal visual inspection every 2.5 years." },
      { q: "What is the dew point of compressed air?", opts: ["The maximum pressure of the compressed air","The temperature at which water vapour begins to condense","The compressor's operating temperature","The compressor's air flow rate"], correct: 1, expl: "A dew point that is too high causes liquid water in pipes (corrosion, water slug). Instrument air requires a dew point below -40 degC, service air below +3 degC." },
      { q: "During pneumatic starting of a main diesel engine, which device sequences air to the cylinders in firing order?", opts: ["The speed governor","The starting air distributor","The turbocharger","The turning gear"], correct: 1, expl: "The starting air distributor sequences air at 25-30 bar to each cylinder's starting valve in firing order, turning the crankshaft until fuel injection starts the engine." },
      { q: "Before opening a high-pressure compressed air circuit for maintenance, what must be verified?", opts: ["That the oil pump is running","That pressure is 0 bar on all circuit gauges","That the main engine is running","Nothing special if the compressor is stopped"], correct: 1, expl: "Full depressurisation (0 bar on all gauges of the relevant circuit) and isolation of upstream/downstream valves are mandatory before any intervention." },
      { q: "What is the diesel effect (auto-ignition) in compressed air piping?", opts: ["A harmless phenomenon","A violent explosion caused by sudden compression of an air-oil mixture","A simple pressure loss","An abnormal compressor noise"], correct: 1, expl: "A suddenly compressed air-oil mixture can reach the oil's auto-ignition point, causing an explosion in the piping. Prevention: systematic oil separation, regular condensate draining." },
      { q: "The SOLAS rule on starting air bottle volume typically requires:", opts: ["No specific requirement","12 consecutive starts for a reversible engine (or 6 for a non-reversible engine with steam/electric reversing)","Only 1 guaranteed start","100 consecutive starts"], correct: 1, expl: "SOLAS Reg. II-1/34 requires a minimum capacity of 12 starts for a reversible engine, or 6 starts for a non-reversible engine with steam or electric astern reversing." },
      { q: "Per ISM/SMS rules, what must be documented for air compressor maintenance?", opts: ["Nothing, maintenance is informal","The Planned Maintenance System (PMS), bottle test certificates and defect tracking","Only major breakdowns","Only repair costs"], correct: 1, expl: "The PMS documents maintenance intervals, hydrostatic test certificates (every 5 years), and tracking of any defect logged in the technical logbook." },
    ],
    quiz: [
      { q: "At what pressure are main engine starting air bottles charged?", opts: ["6-7 bar", "13-15 bar", "25-30 bar", "50-60 bar"], correct: 2, exp: "Starting air bottles are charged to 25-30 bar to provide sufficient energy for main engine starting. Per SOLAS, they must allow a minimum of 12 consecutive starts." },
      { q: "What is the role of the intercooler on a compressor?", opts: ["Filter air impurities", "Cool air between stages to improve efficiency", "Separate condensed water", "Increase pressure"], correct: 1, exp: "The intercooler cools air between compression stages. This improves efficiency (compression closer to isothermal), reduces temperature (protecting seals and oils) and increases air density entering the next stage." },
      { q: "Why must air bottles be drained before main engine starting?", opts: ["To increase available pressure", "To remove condensed water and prevent water slug", "To cool the compressed air", "To check pressure"], correct: 1, exp: "Bottles must be drained to remove accumulated condensed water. If this water enters cylinders with starting air, it can cause a water slug that breaks connecting rods and pistons." },
      { q: "At what percentage above service pressure is a compressor safety valve set?", opts: ["5%", "10%", "20%", "50%"], correct: 1, exp: "The safety valve is set at 10% above maximum service pressure. For a 25 bar bottle, it opens at 27.5 bar. For 30 bar, it opens at 33 bar." },
      { q: "What is the typical pressure of service air used for tools and pneumatic controls?", opts: ["1 bar", "6-7 bar", "25-30 bar", "100 bar"], correct: 1, exp: "Service air is at 6-7 bar, produced by an independent service compressor. Sufficient for pneumatic tools, automatic valve controls and cleaning. Starting air (25-30 bar) is separate and reserved for starts." },
    ],
  },

  es: {
    moduleLabel: "MAQUINAS - AUXILIARES",
    lessonTitle: "Compresores y Sistemas de Aire",
    lessonSub:   "Pistones, tornillo, circuito AP, botellas SOLAS",
    intro: "El aire comprimido es vital a bordo: se usa para el arranque del motor principal, mandos neumaticos, silbatos, herramientas y purga de circuitos. Un buque tiene generalmente 2-3 compresores de aire de arranque y botellas de aire a alta presion.",
    s1title: "Tipos de Compresores Marinos",
    s2title: "Circuito de Aire Comprimido a Bordo",
    s3title: "Seguridades y Fallos Comunes",
    s4title: "Mantenimiento del Compresor",
    s1hint:  "Seleccione un tipo de compresor",
    s2hint:  "Toque un componente para su descripcion",
    s3hint:  "Seleccione un fallo",
    s4hint:  "Seleccione una operacion de mantenimiento",
    exerciseTitle: "Ejercicios Practicos",
    showAnswer: "Ver correccion",
    hideAnswer: "Ocultar",
    accidentTitle: "CASO REAL: Explosion del visor de purga de una botella de aire principal",
    accidentBody: "Un cuarto maquinista realizaba su ronda rutinaria en la sala de maquinas, incluyendo la purga diaria de las botellas de aire principales y auxiliares. Abrio las dos valvulas de purga en linea de la botella principal de proa, permaneciendo cerca para observar el flujo del condensado a traves del visor del bote de purga. Poco despues, sin ninguna senal previa, el visor de cristal exploto. El maquinista fue hallado gravemente herido, inconsciente pero aun respirando; fallecio unos 30 minutos despues pese a los primeros auxilios y la intervencion de un equipo medico trasladado por helicoptero. La investigacion establecio que se habia acumulado condensado durante la noche en la botella de aire principal (unos 30 bar). Al abrir las valvulas de purga, ese condensado alcanzo el bote de purga en cantidad suficiente para cubrir el orificio de evacuacion, provocando una subida brusca de presion que rompio el visor de cristal. La posicion de las valvulas de purga, justo detras del visor, situo la parte superior del cuerpo del maquinista directamente en la trayectoria de la explosion.",
    summaryTitle: "Puntos esenciales",
    summary: [
      "Botellas de aire de arranque cargadas a 25-30 bar - 12 arranques min. (SOLAS)",
      "La compresion multietapa con intercooler reduce la potencia un 15-30%",
      "Humedad y aceite en el aire comprimido son mortales - purgadores y separadores obligatorios",
      "Valvula de seguridad ajustada al 10% por encima de la presion de servicio",
      "Purgar sistematicamente las botellas antes de cada arranque del motor principal",
      "Punto de rocio aire instrumento < -40 degC; aire de servicio < +3 degC",
    ],
    quizCTA: "COMENZAR EL QUIZ",
    bankStart: "COMENZAR =>",
    bankNext: "Siguiente pregunta =>",
    bankTrophy: "Enhorabuena! Banco completado",
    bankScore: "Puntuacion banco",
    compTypes: {
      piston:       { name: "Compresor de pistones (alternativo)", desc: "El mas comun a bordo. Uno o varios pistones comprimen el aire en varias etapas. Enfriamiento interetapa obligatorio. Presion de salida: 25-30 bar (arranque) o 6-7 bar (servicio)." },
      screw:        { name: "Compresor de tornillo",               desc: "Dos rotores helicoidales comprimen el aire continuamente. Gran caudal, bajas vibraciones, silencioso. Presion limitada (hasta 13 bar). Usado para aire de servicio. Requiere inyeccion de aceite." },
      centrifugal:  { name: "Compresor centrifugo (turbo)",        desc: "Comprime el aire por fuerza centrifuga en una rueda de alabes. Muy alto caudal, bajas vibraciones. Usado para la sobrealimentacion de motores diesel." },
      vane:         { name: "Compresor de paletas",                desc: "Rotor excentrico con paletas deslizantes. Compacto y silencioso. Presion moderada (hasta 8 bar). Usado para pequenos circuitos neumaticos y herramientas ligeras." },
    },
    circuitComponents: {
      compressor:  { name: "Compresor",              desc: "Comprime el aire de la presion atmosferica a la de servicio. Generalmente 2-3 a bordo: 2 principales para cargar botellas de arranque, 1 de servicio para aire a baja presion." },
      intercooler: { name: "Refrigerante interetapa", desc: "Enfria el aire entre etapas de compresion. Sin intercooler la temperatura puede superar 300 degC, destruyendo juntas y aceites." },
      aftercooler: { name: "Refrigerante final",      desc: "Enfria el aire tras la compresion final para condensar la humedad. Elimina el 80-90% de la humedad antes del secador." },
      separator:   { name: "Separador agua/aceite",  desc: "Elimina el agua condensada y trazas de aceite del aire comprimido. Equipado con purgador automatico. Obligatorio antes de las botellas de arranque." },
      bottle:      { name: "Botella de aire",         desc: "Almacena el aire comprimido. Botellas de arranque: 25-30 bar, volumen para 12 arranques consecutivos (SOLAS). Equipadas con valvula de seguridad, manometro, purgador." },
      dryer:       { name: "Secador de aire",         desc: "Elimina la humedad residual por adsorcion (gel de silice) o refrigeracion. Punto de rocio < -40 degC requerido para el aire instrumento." },
    },
    faults: {
      hightemp:    { name: "Temperatura de descarga demasiado alta", cause: "Refrigerante interetapa sucio, falta de agua de refrigeracion, valvulas de descarga defectuosas, filtro de aspiracion taponado.", remedy: "Limpiar el refrigerante, verificar caudal de agua, inspeccionar y sustituir valvulas, limpiar el filtro." },
      lowpressure: { name: "Presion final insuficiente",              cause: "Fugas en el circuito, valvulas defectuosas, segmentos de piston desgastados, filtro taponado.", remedy: "Controlar fugas, sustituir valvulas, controlar la compresion en cada etapa, limpiar o sustituir el filtro." },
      oilcontam:   { name: "Contaminacion por aceite",               cause: "Desgaste de segmentos y ranuras, nivel de aceite demasiado alto, temperatura de aceite insuficiente.", remedy: "Controlar y sustituir los segmentos, normalizar el nivel de aceite, verificar la temperatura." },
      vibration:   { name: "Vibraciones y ruidos anormales",         cause: "Valvulas defectuosas, rodamientos desgastados, cuerpo extrano en el cilindro, desequilibrio del ciguenal.", remedy: "Inspeccionar y sustituir valvulas, sustituir rodamientos, inspeccionar cilindro." },
    },
    maintenance: {
      daily:   { name: "Mantenimiento diario",        desc: "Purgar los separadores de agua, controlar el nivel de aceite, registrar presiones y temperaturas, verificar ausencia de fugas." },
      weekly:  { name: "Mantenimiento semanal",       desc: "Probar purgadores automaticos, verificar temperatura del agua de refrigeracion, controlar la tension de correas, limpiar el filtro de aspiracion." },
      monthly: { name: "Mantenimiento mensual",       desc: "Cambiar el aceite, inspeccionar valvulas de aspiracion y descarga, controlar los cierres, probar la valvula de seguridad." },
      annual:  { name: "Mantenimiento anual/revision",desc: "Desmontaje completo, medicion de juegos, sustitucion de segmentos y cierres, limpieza de refrigerantes, calibrado de valvula de seguridad, prueba hidrostatica." },
    },
    exercises: [
      { q: "Por que la compresion del aire se realiza en varias etapas con enfriamiento interetapa? Cuales son las ventajas?", a: "1. Eficiencia energetica: enfriar el aire entre etapas aproxima el ciclo a la compresion isotermica, reduciendo la potencia necesaria un 15-30%. 2. Control de temperatura: sin enfriamiento, la temperatura puede superar 300-400 degC a 25 bar, destruyendo los cierres y aceites con riesgo de explosion. 3. Mejor densidad: el aire enfriado es mas denso. 4. Vida util: temperaturas reducidas preservan cierres, valvulas y segmentos." },
      { q: "Que es un golpe de agua en un motor diesel y como puede causarlo el aire comprimido?", a: "Un golpe de agua se produce cuando agua entra en los cilindros durante la compresion. El agua es incompresible y causa sobrepresion instantanea que puede doblar o romper la biela. Mecanismo: si las botellas de aire de arranque contienen agua condensada (mal purgado o secado), esta agua se inyecta en los cilindros con el aire. Prevencion: purgar sistematicamente botellas y separadores antes de cada arranque, verificar los purgadores automaticos, usar secador de aire eficaz." },
      { q: "Que precauciones hay que tomar antes de realizar mantenimiento en un compresor de alta presion?", a: "Precauciones LOTO: 1. Aislamiento electrico y bloqueo del disyuntor. 2. Aislamiento neumatico: cerrar valvulas de aislamiento y despresurizar. 3. Verificacion de la despresurorizacion: controlar manometros (= 0 bar). 4. Ventilacion si espacio confinado. 5. Senalizacion: 'En mantenimiento - No arrancar'. 6. Esperar el enfriamiento. 7. Herramientas adecuadas sin restos de grasa." },
    ],
    bankQuestions: [
      { q: "Por que las botellas de aire de arranque deben purgarse antes de cada arranque del motor principal?", opts: ["Para aumentar la presion disponible","Para eliminar el agua condensada y evitar un golpe de agua en los cilindros","Para enfriar el aire antes de usarlo","Para probar la valvula de seguridad"], correct: 1, expl: "El agua condensada acumulada en el fondo de la botella, si entra en los cilindros, puede causar un golpe de agua: al ser incompresible, provoca una sobrepresion instantanea que puede doblar o romper bielas y pistones." },
      { q: "Segun SOLAS, cuantos arranques consecutivos del motor principal deben permitir las botellas sin recargar?", opts: ["6","12","20","30"], correct: 1, expl: "SOLAS exige una capacidad minima de 12 arranques consecutivos para un motor reversible (6 para un motor no reversible con marcha atras a vapor/electrica), a una presion de servicio tipica de 25-30 bar." },
      { q: "En un compresor de pistones de dos etapas, cual es la funcion del intercooler?", opts: ["Aumentar la presion antes de la segunda etapa","Enfriar el aire para mejorar la eficiencia y densidad antes de la segunda etapa","Filtrar particulas solidas","Lubricar el piston de la segunda etapa"], correct: 1, expl: "Enfriar el aire entre etapas acerca el ciclo a la compresion isotermica, reduce la potencia necesaria un 15-30% y aumenta la densidad del aire procesado en la siguiente etapa." },
      { q: "Como funciona un purgador automatico de flotador?", opts: ["Se abre a intervalos fijos independientemente de la cantidad de agua","Un flotador sube con el agua acumulada y abre automaticamente la valvula de purga","Solo usa un sensor de presion","Solo funciona manualmente"], correct: 1, expl: "El purgador de flotador abre la valvula en cuanto el agua acumulada eleva el flotador hasta un nivel determinado, evacuando el agua con perdida de aire minima." },
      { q: "Cual es el principal riesgo de la contaminacion por aceite en el aire de arranque?", opts: ["Una caida de presion gradual","Un riesgo de explosion (efecto diesel) en la tuberia de arranque","Solo un aumento del punto de rocio","Ningun riesgo significativo"], correct: 1, expl: "El aceite mezclado con aire comprimido a alta temperatura puede provocar auto-inflamacion (efecto diesel) en la tuberia de arranque, ademas de tapar las valvulas de arranque con depositos de carbon." },
      { q: "A que presion se ajusta habitualmente la valvula de seguridad de una botella de aire comprimido?", opts: ["Igual a la presion de servicio","10% por encima de la presion maxima de servicio","50% por encima de la presion de servicio","Independiente de la presion de servicio"], correct: 1, expl: "La valvula de seguridad se abre al 10% por encima de la presion maxima de servicio: para una botella de 25 bar se abre hacia 27,5 bar; para 30 bar, hacia 33 bar." },
      { q: "Cual es la diferencia principal entre el aire de arranque y el aire de servicio a bordo?", opts: ["Ninguna diferencia, mismo circuito","El aire de arranque es de alta presion (25-30 bar), el de servicio de baja presion (6-7 bar)","El aire de servicio solo sirve para el motor principal","El aire de arranque no necesita secarse"], correct: 1, expl: "El aire de arranque (25-30 bar) arranca el motor principal mediante un circuito asegurado por SOLAS. El aire de servicio (6-7 bar), producido aparte, alimenta herramientas neumaticas y valvulas automaticas." },
      { q: "Como se verifica la eficiencia de un intercooler?", opts: ["Midiendo solo la presion de descarga","Comparando las temperaturas de entrada/salida y controlando la caida de presion (menos de 0,3 bar)","Verificando el nivel de aceite del compresor","Midiendo la velocidad de rotacion del motor"], correct: 1, expl: "Un intercooler eficaz reduce la temperatura del aire a menos de 40-50 degC por encima de la temperatura del agua de refrigeracion, con una caida de presion inferior a 0,3 bar." },
      { q: "Con que frecuencia debe someterse una botella de aire comprimido a una prueba de presion hidrostatica?", opts: ["Cada ano","Cada 5 anos","Cada 10 anos","Nunca si no tiene fuga visible"], correct: 1, expl: "La prueba hidrostatica (botella llena de agua, presurizada a 1,5 veces la presion de servicio) es obligatoria cada 5 anos, ademas de la inspeccion visual interna cada 2,5 anos." },
      { q: "Que es el punto de rocio del aire comprimido?", opts: ["La presion maxima del aire comprimido","La temperatura a la que el vapor de agua empieza a condensarse","La temperatura de funcionamiento del compresor","El caudal de aire producido por el compresor"], correct: 1, expl: "Un punto de rocio demasiado alto causa agua liquida en las tuberias (corrosion, golpe de agua). El aire instrumento exige un punto de rocio inferior a -40 degC, el aire de servicio inferior a +3 degC." },
      { q: "Durante el arranque neumatico de un motor diesel principal, que dispositivo secuencia el aire hacia los cilindros en orden de encendido?", opts: ["El regulador de velocidad","El distribuidor de aire de arranque","El turbocompresor","El virador"], correct: 1, expl: "El distribuidor de aire de arranque secuencia el aire a 25-30 bar hacia la valvula de arranque de cada cilindro en orden de encendido, girando el ciguenal hasta la inyeccion de combustible." },
      { q: "Antes de abrir un circuito de aire comprimido de alta presion para mantenimiento, que hay que verificar?", opts: ["Que la bomba de aceite funcione","Que la presion sea 0 bar en todos los manometros del circuito","Que el motor principal este en marcha","Nada especial si el compresor esta parado"], correct: 1, expl: "La despresurizacion completa (0 bar en todos los manometros del circuito) y el aislamiento de las valvulas aguas arriba/abajo son requisitos obligatorios antes de cualquier intervencion." },
      { q: "Que es el efecto diesel (auto-inflamacion) en una tuberia de aire comprimido?", opts: ["Un fenomeno inofensivo","Una explosion violenta causada por la compresion brusca de una mezcla aire-aceite","Una simple perdida de presion","Un ruido anormal del compresor"], correct: 1, expl: "Una mezcla aire-aceite comprimida bruscamente puede alcanzar el punto de auto-inflamacion del aceite, provocando una explosion en la tuberia. Prevencion: separacion sistematica del aceite, purga regular de condensados." },
      { q: "La norma SOLAS sobre el volumen de las botellas de aire de arranque exige tipicamente:", opts: ["Ninguna exigencia particular","12 arranques consecutivos para un motor reversible (o 6 para uno no reversible con marcha atras a vapor/electrica)","Solo 1 arranque garantizado","100 arranques consecutivos"], correct: 1, expl: "SOLAS Reg. II-1/34 exige una capacidad minima de 12 arranques para un motor reversible, o 6 arranques para un motor no reversible con marcha atras a vapor o electrica." },
      { q: "Segun las reglas ISM/SMS, que debe documentarse para el mantenimiento de los compresores de aire?", opts: ["Nada, el mantenimiento es informal","El Planned Maintenance System (PMS), los certificados de prueba de botellas y el seguimiento de defectos","Solo las averias graves","Solo los costes de reparacion"], correct: 1, expl: "El PMS documenta los intervalos de mantenimiento, los certificados de prueba hidrostatica (cada 5 anos) y el seguimiento de cualquier defecto registrado en el diario de a bordo tecnico." },
    ],
    quiz: [
      { q: "A que presion se cargan las botellas de aire de arranque del motor principal?", opts: ["6-7 bar", "13-15 bar", "25-30 bar", "50-60 bar"], correct: 2, exp: "Las botellas se cargan a 25-30 bar para proporcionar energia suficiente al arranque. Segun SOLAS, deben permitir al menos 12 arranques consecutivos." },
      { q: "Cual es la funcion del refrigerante interetapa (intercooler) en un compresor?", opts: ["Filtrar las impurezas del aire", "Enfriar el aire entre etapas para mejorar el rendimiento", "Separar el agua condensada", "Aumentar la presion"], correct: 1, exp: "El intercooler enfria el aire entre etapas de compresion. Mejora el rendimiento, reduce la temperatura (proteccion de cierres y aceites) y aumenta la densidad del aire entrante." },
      { q: "Por que hay que purgar las botellas de aire antes del arranque del motor principal?", opts: ["Para aumentar la presion disponible", "Para eliminar el agua condensada y evitar un golpe de agua", "Para enfriar el aire comprimido", "Para verificar la presion"], correct: 1, exp: "Para eliminar el agua condensada acumulada. Si entra en los cilindros con el aire de arranque, puede causar un golpe de agua que rompe bielas y pistones." },
      { q: "Al que porcentaje por encima de la presion de servicio se ajusta la valvula de seguridad?", opts: ["5%", "10%", "20%", "50%"], correct: 1, exp: "La valvula de seguridad se ajusta al 10% por encima de la presion maxima de servicio. Para 25 bar, se abre a 27,5 bar. Para 30 bar, a 33 bar." },
      { q: "Cual es la presion tipica del aire de servicio usado para herramientas y mandos neumaticos?", opts: ["1 bar", "6-7 bar", "25-30 bar", "100 bar"], correct: 1, exp: "El aire de servicio esta a 6-7 bar, producido por un compresor de servicio independiente. Suficiente para herramientas neumaticas y mandos. El aire de arranque (25-30 bar) esta reservado para los arranques." },
    ],
  },

  pt: {
    moduleLabel: "MAQUINAS - AUXILIARES",
    lessonTitle: "Compressores e Sistemas de Ar",
    lessonSub:   "Pistoes, parafuso, circuito AP, garrafas SOLAS",
    intro: "O ar comprimido e vital a bordo: usado para arranque do motor principal, comandos pneumaticos, apitos, ferramentas e purga de circuitos. Um navio tem geralmente 2-3 compressores de ar de arranque e garrafas de ar a alta pressao.",
    s1title: "Tipos de Compressores Marinhos",
    s2title: "Circuito de Ar Comprimido a Bordo",
    s3title: "Seguridades e Avarias Comuns",
    s4title: "Manutencao do Compressor",
    s1hint:  "Selecione um tipo de compressor",
    s2hint:  "Toque num componente para a descricao",
    s3hint:  "Selecione uma avaria",
    s4hint:  "Selecione uma operacao de manutencao",
    exerciseTitle: "Exercicios Praticos",
    showAnswer: "Ver correcao",
    hideAnswer: "Ocultar",
    accidentTitle: "CASO REAL: Explosao do visor de purga de uma garrafa de ar principal",
    accidentBody: "Um quarto maquinista realizava a sua ronda de rotina na casa de maquinas, incluindo a purga diaria das garrafas de ar principais e auxiliares. Abriu as duas valvulas de purga em linha da garrafa principal de vante, permanecendo perto para observar o fluxo do condensado atraves do visor do pote de purga. Pouco depois, sem qualquer sinal previo, o visor de vidro explodiu. O maquinista foi encontrado gravemente ferido, inconsciente mas ainda a respirar; morreu cerca de 30 minutos depois apesar dos primeiros socorros e da intervencao de uma equipa medica transportada por helicoptero. A investigacao determinou que se tinha acumulado condensado durante a noite na garrafa de ar principal (cerca de 30 bar). Ao abrir as valvulas de purga, esse condensado atingiu o pote de purga em quantidade suficiente para cobrir o orificio de escoamento, provocando uma subida brusca de pressao que partiu o visor de vidro. A posicao das valvulas de purga, mesmo atras do visor, colocou a parte superior do corpo do maquinista diretamente na trajetoria da explosao.",
    summaryTitle: "Pontos essenciais",
    summary: [
      "Garrafas de ar de arranque carregadas a 25-30 bar - 12 arranques min. (SOLAS)",
      "A compressao multifasica com intercooler reduz a potencia 15-30%",
      "Humidade e oleo no ar comprimido sao mortais - purgadores e separadores obrigatorios",
      "Valvula de seguranca regulada a 10% acima da pressao de servico",
      "Purgar sistematicamente as garrafas antes de cada arranque do motor principal",
      "Ponto de orvalho ar instrumento < -40 degC; ar de servico < +3 degC",
    ],
    quizCTA: "COMECAR O QUIZ",
    bankStart: "COMECAR =>",
    bankNext: "Proxima pergunta =>",
    bankTrophy: "Parabens! Banco concluido",
    bankScore: "Pontuacao banco",
    compTypes: {
      piston:       { name: "Compressor de pistoes (alternativo)", desc: "O mais comum a bordo. Um ou varios pistoes comprimem o ar em varias fases. Arrefecimento interstadial obrigatorio. Pressao de saida: 25-30 bar (arranque) ou 6-7 bar (servico)." },
      screw:        { name: "Compressor de parafuso",              desc: "Dois rotores helicoidais comprimem o ar continuamente. Caudal elevado, baixas vibracoes, silencioso. Pressao limitada (ate 13 bar). Usado para ar de servico. Requer injecao de oleo." },
      centrifugal:  { name: "Compressor centrifugo (turbo)",       desc: "Comprime o ar por forca centrifuga numa roda de pas. Caudal muito elevado, baixas vibracoes. Usado para a sobrealimentacao de motores diesel." },
      vane:         { name: "Compressor de palhetas",              desc: "Rotor excentrico com palhetas deslizantes. Compacto e silencioso. Pressao moderada (ate 8 bar). Usado para pequenos circuitos pneumaticos e ferramentas leves." },
    },
    circuitComponents: {
      compressor:  { name: "Compressor",              desc: "Comprime o ar da pressao atmosferica a de servico. Geralmente 2-3 a bordo: 2 principais para carregar garrafas de arranque, 1 de servico para ar a baixa pressao." },
      intercooler: { name: "Arrefecedor interstadial", desc: "Arrefece o ar entre fases de compressao. Sem intercooler a temperatura pode superar 300 degC, destruindo vedacoes e oleos." },
      aftercooler: { name: "Arrefecedor final",        desc: "Arrefece o ar apos a compressao final para condensar a humidade. Remove 80-90% da humidade antes do secador." },
      separator:   { name: "Separador agua/oleo",     desc: "Remove agua condensada e tracos de oleo do ar comprimido. Equipado com purgador automatico. Obrigatorio antes das garrafas de arranque." },
      bottle:      { name: "Garrafa de ar",            desc: "Armazena ar comprimido. Garrafas de arranque: 25-30 bar, volume para 12 arranques consecutivos (SOLAS). Equipadas com valvula de seguranca, manometro, purgador." },
      dryer:       { name: "Secador de ar",            desc: "Remove humidade residual por adsorcao (gel de silica) ou refrigeracao. Ponto de orvalho < -40 degC requerido para o ar instrumento." },
    },
    faults: {
      hightemp:    { name: "Temperatura de descarga demasiado elevada", cause: "Intercooler sujo, falta de agua de arrefecimento, valvulas de descarga com fugas, filtro de aspiracao entupido.", remedy: "Limpar intercooler, verificar caudal de agua, inspecionar e substituir valvulas, limpar filtro." },
      lowpressure: { name: "Pressao final insuficiente",                cause: "Fugas no circuito, valvulas deficientes, segmentos de pistao desgastados, filtro entupido.", remedy: "Controlar fugas, substituir valvulas, controlar compressao em cada fase, limpar ou substituir filtro." },
      oilcontam:   { name: "Contaminacao por oleo",                    cause: "Desgaste de segmentos e ranhuras, nivel de oleo demasiado alto, temperatura de oleo insuficiente.", remedy: "Controlar e substituir segmentos, normalizar nivel de oleo, verificar temperatura." },
      vibration:   { name: "Vibracoes e ruidos anormais",              cause: "Valvulas deficientes, rolamentos desgastados, corpo estranho no cilindro, desequilibrio do virabrequim.", remedy: "Inspecionar e substituir valvulas, substituir rolamentos, inspecionar cilindro." },
    },
    maintenance: {
      daily:   { name: "Manutencao diaria",         desc: "Purgar separadores de agua, controlar nivel de oleo, registar pressoes e temperaturas, verificar ausencia de fugas." },
      weekly:  { name: "Manutencao semanal",        desc: "Testar purgadores automaticos, verificar temperatura da agua de arrefecimento, controlar tensao das correias, limpar filtro de aspiracao." },
      monthly: { name: "Manutencao mensal",         desc: "Mudar o oleo, inspecionar valvulas de aspiracao e descarga, controlar vedacoes, testar valvula de seguranca." },
      annual:  { name: "Manutencao anual/revisao",  desc: "Desmontagem completa, medicao de folgas, substituicao de segmentos e vedacoes, limpeza de arrefecedores, calibracao da valvula de seguranca, teste hidrostatico." },
    },
    exercises: [
      { q: "Por que a compressao do ar e realizada em varias fases com arrefecimento interstadial? Quais sao as vantagens?", a: "1. Eficiencia energetica: arrefecer o ar entre fases aproxima o ciclo da compressao isotermica, reduzindo a potencia necessaria 15-30%. 2. Controlo de temperatura: sem arrefecimento, a temperatura pode superar 300-400 degC a 25 bar, destruindo vedacoes e oleos com risco de explosao. 3. Melhor densidade: o ar arrefecido e mais denso. 4. Vida util: temperaturas reduzidas preservam vedacoes, valvulas e segmentos." },
      { q: "O que e um golpe de agua num motor diesel e como pode o ar comprimido causa-lo?", a: "Um golpe de agua ocorre quando agua entra nos cilindros durante a compressao. A agua sendo incompressivel causa sobrepressao instantanea que pode dobrar ou partir a biela. Mecanismo: se as garrafas de ar de arranque contem agua condensada (ma purga ou secagem), esta agua e injetada nos cilindros com o ar. Prevencao: purgar sistematicamente garrafas e separadores antes de cada arranque, verificar purgadores automaticos, usar secador de ar eficaz." },
      { q: "Que precaucoes tomar antes de realizar manutencao num compressor de alta pressao?", a: "Precaucoes LOTO: 1. Isolamento eletrico e bloqueio do disjuntor. 2. Isolamento pneumatico: fechar valvulas e despressurizar. 3. Verificacao da despressurizacao (manometros = 0 bar). 4. Ventilacao se espaco confinado. 5. Sinalizacao: 'Em manutencao - Nao arrancar'. 6. Aguardar arrefecimento. 7. Ferramentas adequadas sem residuos de gordura." },
    ],
    bankQuestions: [
      { q: "Por que as garrafas de ar de arranque devem ser purgadas antes de cada arranque do motor principal?", opts: ["Para aumentar a pressao disponivel","Para eliminar a agua condensada e evitar um golpe de agua nos cilindros","Para arrefecer o ar antes de usar","Para testar a valvula de seguranca"], correct: 1, expl: "A agua condensada acumulada no fundo da garrafa, se entrar nos cilindros, pode causar um golpe de agua: sendo incompressivel, provoca uma sobrepressao instantanea que pode dobrar ou partir bielas e pistoes." },
      { q: "Segundo o SOLAS, quantos arranques consecutivos do motor principal as garrafas de ar devem permitir sem recarregar?", opts: ["6","12","20","30"], correct: 1, expl: "O SOLAS exige uma capacidade minima de 12 arranques consecutivos para um motor reversivel (6 para um motor nao reversivel com marcha atras a vapor/eletrica), a uma pressao de servico tipica de 25-30 bar." },
      { q: "Num compressor de pistoes de dois estadios, qual e a funcao do intercooler?", opts: ["Aumentar a pressao antes do 2o estadio","Arrefecer o ar para melhorar a eficiencia e densidade antes do 2o estadio","Filtrar particulas solidas","Lubrificar o pistao do 2o estadio"], correct: 1, expl: "Arrefecer o ar entre estadios aproxima o ciclo da compressao isotermica, reduz a potencia necessaria em 15 a 30% e aumenta a densidade do ar processado no estadio seguinte." },
      { q: "Como funciona um purgador automatico de flutuador?", opts: ["Abre a intervalos fixos independentemente da quantidade de agua","Um flutuador sobe com a agua acumulada e abre automaticamente a valvula de purga","So usa um sensor de pressao","So funciona manualmente"], correct: 1, expl: "O purgador de flutuador abre a valvula assim que a agua acumulada eleva o flutuador ate um nivel determinado, escoando a agua com perda minima de ar." },
      { q: "Qual e o principal risco da contaminacao por oleo no ar de arranque?", opts: ["Uma queda de pressao gradual","Um risco de explosao (efeito diesel) na tubagem de arranque","Apenas um aumento do ponto de orvalho","Nenhum risco significativo"], correct: 1, expl: "O oleo misturado com ar comprimido a alta temperatura pode provocar auto-inflamacao (efeito diesel) na tubagem de arranque, alem de obstruir as valvulas de arranque com depositos de carbono." },
      { q: "A que pressao e geralmente regulada a valvula de seguranca de uma garrafa de ar comprimido?", opts: ["Igual a pressao de servico","10% acima da pressao maxima de servico","50% acima da pressao de servico","Independente da pressao de servico"], correct: 1, expl: "A valvula de seguranca abre a 10% acima da pressao maxima de servico: para uma garrafa de 25 bar abre por volta de 27,5 bar; para 30 bar, por volta de 33 bar." },
      { q: "Qual e a principal diferenca entre o ar de arranque e o ar de servico a bordo?", opts: ["Nenhuma diferenca, mesmo circuito","O ar de arranque e de alta pressao (25-30 bar), o de servico e de baixa pressao (6-7 bar)","O ar de servico serve apenas para o motor principal","O ar de arranque nao precisa de ser seco"], correct: 1, expl: "O ar de arranque (25-30 bar) arranca o motor principal atraves de um circuito assegurado pelo SOLAS. O ar de servico (6-7 bar), produzido a parte, alimenta ferramentas pneumaticas e valvulas automaticas." },
      { q: "Como se verifica a eficiencia de um intercooler?", opts: ["Medindo apenas a pressao de descarga","Comparando as temperaturas de entrada/saida e controlando a queda de pressao (menos de 0,3 bar)","Verificando o nivel de oleo do compressor","Medindo a velocidade de rotacao do motor"], correct: 1, expl: "Um intercooler eficaz reduz a temperatura do ar a menos de 40-50 degC acima da temperatura da agua de arrefecimento, com uma queda de pressao inferior a 0,3 bar." },
      { q: "Com que frequencia uma garrafa de ar comprimido deve passar por um teste de pressao hidrostatico?", opts: ["Todos os anos","De 5 em 5 anos","De 10 em 10 anos","Nunca se nao tiver fuga visivel"], correct: 1, expl: "O teste hidrostatico (garrafa cheia de agua, pressurizada a 1,5 vezes a pressao de servico) e obrigatorio de 5 em 5 anos, alem da inspecao visual interna de 2,5 em 2,5 anos." },
      { q: "O que e o ponto de orvalho do ar comprimido?", opts: ["A pressao maxima do ar comprimido","A temperatura a qual o vapor de agua comeca a condensar","A temperatura de funcionamento do compressor","O caudal de ar produzido pelo compressor"], correct: 1, expl: "Um ponto de orvalho demasiado alto causa agua liquida nas tubagens (corrosao, golpe de agua). O ar instrumento exige um ponto de orvalho abaixo de -40 degC, o ar de servico abaixo de +3 degC." },
      { q: "Durante o arranque pneumatico de um motor diesel principal, que dispositivo sequencia o ar para os cilindros na ordem de ignicao?", opts: ["O regulador de velocidade","O distribuidor de ar de arranque","O turbocompressor","O virador"], correct: 1, expl: "O distribuidor de ar de arranque sequencia o ar a 25-30 bar para a valvula de arranque de cada cilindro na ordem de ignicao, rodando o virabrequim ate a injecao de combustivel." },
      { q: "Antes de abrir um circuito de ar comprimido de alta pressao para manutencao, o que deve ser verificado?", opts: ["Que a bomba de oleo esteja a funcionar","Que a pressao esteja a 0 bar em todos os manometros do circuito","Que o motor principal esteja em funcionamento","Nada de especial se o compressor estiver parado"], correct: 1, expl: "A despressurizacao completa (0 bar em todos os manometros do circuito) e o isolamento das valvulas a montante/jusante sao obrigatorios antes de qualquer intervencao." },
      { q: "O que e o efeito diesel (auto-inflamacao) numa tubagem de ar comprimido?", opts: ["Um fenomeno inofensivo","Uma explosao violenta causada pela compressao brusca de uma mistura ar-oleo","Uma simples perda de pressao","Um ruido anormal do compressor"], correct: 1, expl: "Uma mistura ar-oleo comprimida bruscamente pode atingir o ponto de auto-inflamacao do oleo, causando uma explosao na tubagem. Prevencao: separacao sistematica do oleo, purga regular de condensados." },
      { q: "A regra SOLAS sobre o volume das garrafas de ar de arranque exige tipicamente:", opts: ["Nenhuma exigencia particular","12 arranques consecutivos para motor reversivel (ou 6 para nao reversivel com marcha atras a vapor/eletrica)","Apenas 1 arranque garantido","100 arranques consecutivos"], correct: 1, expl: "O SOLAS Reg. II-1/34 exige uma capacidade minima de 12 arranques para um motor reversivel, ou 6 arranques para um motor nao reversivel com marcha atras a vapor ou eletrica." },
      { q: "Segundo as regras ISM/SMS, o que deve ser documentado para a manutencao dos compressores de ar?", opts: ["Nada, a manutencao e informal","O Planned Maintenance System (PMS), os certificados de prova das garrafas e o registo de defeitos","Apenas as avarias graves","Apenas os custos de reparacao"], correct: 1, expl: "O PMS documenta os intervalos de manutencao, os certificados de teste hidrostatico (de 5 em 5 anos) e o registo de qualquer defeito no diario de bordo tecnico." },
    ],
    quiz: [
      { q: "A que pressao sao carregadas as garrafas de ar de arranque do motor principal?", opts: ["6-7 bar", "13-15 bar", "25-30 bar", "50-60 bar"], correct: 2, exp: "As garrafas sao carregadas a 25-30 bar para fornecer energia suficiente ao arranque. Segundo o SOLAS, devem permitir pelo menos 12 arranques consecutivos." },
      { q: "Qual e o papel do arrefecedor interstadial (intercooler) num compressor?", opts: ["Filtrar impurezas do ar", "Arrefecer o ar entre estadios para melhorar o rendimento", "Separar a agua condensada", "Aumentar a pressao"], correct: 1, exp: "O intercooler arrefece o ar entre estadios de compressao. Melhora o rendimento, reduz a temperatura (protecao de vedacoes e oleos) e aumenta a densidade do ar entrante." },
      { q: "Por que se devem purgar as garrafas de ar antes do arranque do motor principal?", opts: ["Para aumentar a pressao disponivel", "Para eliminar a agua condensada e evitar um golpe de agua", "Para arrefecer o ar comprimido", "Para verificar a pressao"], correct: 1, exp: "Para eliminar a agua condensada acumulada. Se entrar nos cilindros com o ar de arranque, pode causar um golpe de agua que parte bielas e pistoes." },
      { q: "A que percentagem acima da pressao de servico esta regulada a valvula de seguranca?", opts: ["5%", "10%", "20%", "50%"], correct: 1, exp: "A valvula de seguranca esta regulada a 10% acima da pressao maxima de servico. Para 25 bar, abre a 27,5 bar. Para 30 bar, a 33 bar." },
      { q: "Qual e a pressao tipica do ar de servico usado para ferramentas e comandos pneumaticos?", opts: ["1 bar", "6-7 bar", "25-30 bar", "100 bar"], correct: 1, exp: "O ar de servico esta a 6-7 bar, produzido por um compressor de servico independente. Suficiente para ferramentas pneumaticas e comandos. O ar de arranque (25-30 bar) e distinto e reservado para arranques." },
    ],
  },
};

// ── SVG 1 - COMPRESSOR TYPES ─────────────────────────────────
function CompressorTypesSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string>("piston");
  const types = t.compTypes;
  const typeColors: Record<string,string> = { piston:C.cyan, screw:C.green, centrifugal:C.blue, vane:C.teal };
  const typeLabels: Record<string,string> = { piston:"PISTON", screw:"SCREW", centrifugal:"TURBO", vane:"VANE" };

  const svgs: Record<string, React.ReactNode> = {
    piston: (
      <g>
        <rect x="18" y="48" width="42" height="64" rx="4" fill={C.cyan} opacity={0.12} stroke={C.cyan} strokeWidth="1.5"/>
        <rect x="26" y="56" width="26" height="38" rx="2" fill={C.navy3} stroke={C.cyan} strokeWidth="1"/>
        <rect x="28" y="62" width="22" height="16" rx="2" fill={C.cyan} opacity={0.45}/>
        <line x1="39" y1="78" x2="39" y2="100" stroke={C.dim} strokeWidth="2"/>
        <text x="39" y="122" fontSize="7" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">ST.1</text>
        <rect x="70" y="62" width="22" height="32" rx="4" fill={C.green} opacity={0.18} stroke={C.green} strokeWidth="1.5"/>
        <text x="81" y="81" fontSize="6" fill={C.green} fontFamily="Courier New" textAnchor="middle">IC</text>
        <rect x="102" y="53" width="32" height="54" rx="4" fill={C.teal} opacity={0.12} stroke={C.teal} strokeWidth="1.5"/>
        <rect x="108" y="59" width="20" height="32" rx="2" fill={C.navy3} stroke={C.teal} strokeWidth="1"/>
        <rect x="110" y="65" width="16" height="14" rx="2" fill={C.teal} opacity={0.45}/>
        <line x1="118" y1="79" x2="118" y2="97" stroke={C.dim} strokeWidth="2"/>
        <text x="118" y="117" fontSize="7" fill={C.teal} fontFamily="Courier New" textAnchor="middle">ST.2</text>
        <line x1="60" y1="78" x2="70" y2="78" stroke={C.cyan} strokeWidth="1.5"/>
        <line x1="92" y1="78" x2="102" y2="78" stroke={C.teal} strokeWidth="1.5"/>
        <line x1="134" y1="78" x2="155" y2="78" stroke={C.teal} strokeWidth="2"/>
        <polygon points="161,78 153,74 153,82" fill={C.teal}/>
        <text x="156" y="76" fontSize="7" fill={C.teal} fontFamily="Courier New">25b</text>
        <text x="8" y="76" fontSize="7" fill={C.cyan} fontFamily="Courier New">1b</text>
        <text x="80" y="148" fontSize="8" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">2-STAGE PISTON</text>
      </g>
    ),
    screw: (
      <g>
        <rect x="25" y="50" width="110" height="64" rx="8" fill={C.green} opacity={0.08} stroke={C.green} strokeWidth="1.5"/>
        {[0,1,2,3,4,5].map(i=>(<g key={i}><ellipse cx={42+i*17} cy="66" rx="8" ry="13" fill={C.green} opacity={0.35} stroke={C.green} strokeWidth="1"/><ellipse cx={42+i*17} cy="96" rx="8" ry="13" fill={C.green} opacity={0.22} stroke={C.green} strokeWidth="1"/></g>))}
        <line x1="25" y1="82" x2="5" y2="82" stroke={C.green} strokeWidth="1.5"/>
        <polygon points="-1,82 7,78 7,86" fill={C.green}/>
        <text x="3" y="80" fontSize="7" fill={C.green} fontFamily="Courier New" textAnchor="middle">IN</text>
        <line x1="135" y1="82" x2="155" y2="82" stroke={C.green} strokeWidth="1.5"/>
        <polygon points="161,82 153,78 153,86" fill={C.green}/>
        <text x="157" y="80" fontSize="7" fill={C.green} fontFamily="Courier New">OUT</text>
        <text x="80" y="136" fontSize="8" fill={C.green} fontFamily="Courier New" textAnchor="middle">SCREW - 13 bar max</text>
      </g>
    ),
    centrifugal: (
      <g>
        <ellipse cx="80" cy="80" rx="46" ry="46" fill={C.blue} opacity={0.08} stroke={C.blue} strokeWidth="1.5"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>{const r=a*Math.PI/180;return <line key={i} x1={80+10*Math.cos(r)} y1={80+10*Math.sin(r)} x2={80+36*Math.cos(r+0.3)} y2={80+36*Math.sin(r+0.3)} stroke={C.blue} strokeWidth="2.5" strokeLinecap="round"/>;}) }
        <circle cx="80" cy="80" r="10" fill={C.blue} opacity={0.4}/>
        <line x1="80" y1="34" x2="80" y2="12" stroke={C.blue} strokeWidth="1.5"/>
        <polygon points="80,6 76,14 84,14" fill={C.blue}/>
        <text x="80" y="4" fontSize="7" fill={C.blue} fontFamily="Courier New" textAnchor="middle">AIR IN</text>
        <line x1="126" y1="80" x2="150" y2="80" stroke={C.blue} strokeWidth="1.5"/>
        <polygon points="156,80 148,76 148,84" fill={C.blue}/>
        <text x="152" y="78" fontSize="7" fill={C.blue} fontFamily="Courier New">BOOST</text>
        <text x="80" y="145" fontSize="8" fill={C.blue} fontFamily="Courier New" textAnchor="middle">TURBOCHARGER</text>
      </g>
    ),
    vane: (
      <g>
        <ellipse cx="80" cy="80" rx="42" ry="42" fill={C.teal} opacity={0.08} stroke={C.teal} strokeWidth="1.5"/>
        <ellipse cx="92" cy="80" rx="32" ry="32" fill={C.navy3} stroke={C.teal} strokeWidth="1"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>{const r=a*Math.PI/180;return <line key={i} x1={92+15*Math.cos(r)} y1={80+15*Math.sin(r)} x2={92+30*Math.cos(r)} y2={80+30*Math.sin(r)} stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" opacity={0.7}/>;}) }
        <line x1="38" y1="80" x2="16" y2="80" stroke={C.teal} strokeWidth="1.5"/>
        <polygon points="10,80 18,76 18,84" fill={C.teal}/>
        <text x="14" y="78" fontSize="7" fill={C.teal} fontFamily="Courier New" textAnchor="end">IN</text>
        <line x1="122" y1="80" x2="146" y2="80" stroke={C.teal} strokeWidth="1.5"/>
        <polygon points="152,80 144,76 144,84" fill={C.teal}/>
        <text x="148" y="78" fontSize="7" fill={C.teal} fontFamily="Courier New">OUT</text>
        <text x="80" y="140" fontSize="8" fill={C.teal} fontFamily="Courier New" textAnchor="middle">VANE - 8 bar max</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.cyan}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(types).map(([key]:any)=>{
          const col=typeColors[key]||C.cyan;
          return(<button key={key} onClick={()=>setSel(key)} style={{padding:"5px 9px",borderRadius:8,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{typeLabels[key]||key}</button>);
        })}
      </div>
      <svg viewBox="0 0 170 165" style={{width:"100%",maxWidth:230,display:"block",margin:"0 auto",background:`${C.navy3}55`,borderRadius:8}}>
        {svgs[sel]}
      </svg>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${typeColors[sel]||C.cyan}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{types[sel]?.name}</div>
        {types[sel]?.desc}
      </div>
    </div>
  );
}

// ── SVG 2 - CIRCUIT ──────────────────────────────────────────
function CircuitSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const comps = t.circuitComponents;
  const compColors: Record<string,string> = {
    compressor:C.cyan, intercooler:C.green, aftercooler:C.green,
    separator:C.teal, bottle:C.blue, dryer:"#9c27b0",
  };
  const compLabels: Record<string,string> = {
    compressor:"COMP", intercooler:"INTER", aftercooler:"AFTER",
    separator:"SEP", bottle:"BOTTLE", dryer:"DRYER",
  };
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.teal}33`}}>
      <svg viewBox="0 0 280 120" style={{width:"100%",maxWidth:360,display:"block",margin:"0 auto"}}>
        <circle cx="28" cy="60" r="20" fill={C.cyan} opacity={0.12} stroke={C.cyan} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="compressor"?null:"compressor")}/>
        <text x="28" y="57" fontSize="6" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">COMP</text>
        <text x="28" y="67" fontSize="6" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">25bar</text>
        <rect x="56" y="47" width="26" height="26" rx="4" fill={C.green} opacity={0.12} stroke={C.green} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="intercooler"?null:"intercooler")}/>
        <text x="69" y="63" fontSize="5" fill={C.green} fontFamily="Courier New" textAnchor="middle">INTER</text>
        <rect x="92" y="47" width="26" height="26" rx="4" fill={C.green} opacity={0.09} stroke={C.green} strokeWidth="1" strokeDasharray="3,2" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="aftercooler"?null:"aftercooler")}/>
        <text x="105" y="63" fontSize="5" fill={C.green} fontFamily="Courier New" textAnchor="middle">AFTER</text>
        <rect x="128" y="44" width="22" height="32" rx="4" fill={C.teal} opacity={0.12} stroke={C.teal} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="separator"?null:"separator")}/>
        <text x="139" y="63" fontSize="5" fill={C.teal} fontFamily="Courier New" textAnchor="middle">SEP</text>
        <rect x="160" y="47" width="22" height="26" rx="4" fill="#9c27b0" opacity={0.12} stroke="#9c27b0" strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="dryer"?null:"dryer")}/>
        <text x="171" y="63" fontSize="5" fill="#9c27b0" fontFamily="Courier New" textAnchor="middle">DRY</text>
        <ellipse cx="222" cy="60" rx="26" ry="36" fill={C.blue} opacity={0.1} stroke={C.blue} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setSel(sel==="bottle"?null:"bottle")}/>
        <text x="222" y="55" fontSize="6" fill={C.blue} fontFamily="Courier New" textAnchor="middle">AIR</text>
        <text x="222" y="65" fontSize="6" fill={C.blue} fontFamily="Courier New" textAnchor="middle">BOTTLE</text>
        <text x="222" y="75" fontSize="5" fill={C.blue} fontFamily="Courier New" textAnchor="middle">25-30b</text>
        <line x1="248" y1="60" x2="268" y2="60" stroke={C.blue} strokeWidth="2"/>
        <polygon points="274,60 266,56 266,64" fill={C.blue}/>
        <text x="270" y="54" fontSize="6" fill={C.blue} fontFamily="Courier New">ME</text>
        <line x1="48" y1="60" x2="56" y2="60" stroke={C.cyan} strokeWidth="1.5"/>
        <line x1="82" y1="60" x2="92" y2="60" stroke={C.green} strokeWidth="1.5"/>
        <line x1="118" y1="60" x2="128" y2="60" stroke={C.teal} strokeWidth="1.5"/>
        <line x1="150" y1="60" x2="160" y2="60" stroke={C.teal} strokeWidth="1.5"/>
        <line x1="182" y1="60" x2="196" y2="60" stroke={C.blue} strokeWidth="1.5"/>
        <line x1="139" y1="76" x2="139" y2="96" stroke={C.teal} strokeWidth="1" strokeDasharray="3,2"/>
        <text x="139" y="104" fontSize="5" fill={C.teal} fontFamily="Courier New" textAnchor="middle">DRAIN</text>
        <line x1="222" y1="96" x2="222" y2="108" stroke={C.blue} strokeWidth="1" strokeDasharray="3,2"/>
        <text x="222" y="115" fontSize="5" fill={C.blue} fontFamily="Courier New" textAnchor="middle">PURGE</text>
      </svg>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {Object.entries(comps).map(([key]:any)=>{const col=compColors[key]||C.cyan;return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{compLabels[key]||key}</button>);}) }
      </div>
      {sel&&(<div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${compColors[sel]||C.teal}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}><div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{comps[sel]?.name}</div>{comps[sel]?.desc}</div>)}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s2hint}</div>}
    </div>
  );
}

// ── SVG 3 - FAULTS ───────────────────────────────────────────
function FaultsSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const faults = t.faults;
  const faultColors: Record<string,string> = { hightemp:C.red, lowpressure:C.cyan, oilcontam:C.warn, vibration:C.teal };
  const faultIcons: Record<string,string> = { hightemp:"🌡️", lowpressure:"📉", oilcontam:"🛢️", vibration:"📳" };
  const causeLabel={fr:"Cause",en:"Cause",es:"Causa",pt:"Causa"}[lang]||"Cause";
  const remedyLabel={fr:"Remede",en:"Remedy",es:"Remedio",pt:"Remedio"}[lang]||"Remedy";
  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.red}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {Object.entries(faults).map(([key,val]:any)=>{const col=faultColors[key]||C.red;return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`}}><div style={{fontSize:16,marginBottom:4}}>{faultIcons[key]}</div><div style={{fontSize:11,fontWeight:700,color:C.white,fontFamily:"Courier New",lineHeight:1.4}}>{val.name}</div></button>);}) }
      </div>
      {sel&&(<div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${faultColors[sel]||C.red}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}><div style={{color:C.warn,fontWeight:700,marginBottom:4}}>⚠️ {causeLabel}</div><div style={{marginBottom:8}}>{faults[sel].cause}</div><div style={{color:C.green,fontWeight:700,marginBottom:4}}>✅ {remedyLabel}</div><div>{faults[sel].remedy}</div></div>)}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s3hint}</div>}
    </div>
  );
}

// ── SVG 4 - MAINTENANCE ──────────────────────────────────────
function MaintenanceSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string>("daily");
  const maint = t.maintenance;
  const maintColors: Record<string,string> = { daily:C.green, weekly:C.cyan, monthly:C.teal, annual:C.red };
  const icons: Record<string,string> = { daily:"📅", weekly:"📆", monthly:"🔧", annual:"🔩" };
  return(
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.teal}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        {Object.entries(maint).map(([key]:any)=>{const col=maintColors[key]||C.cyan;return(<button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New",textAlign:"center"}}><div style={{fontSize:16}}>{icons[key]}</div></button>);}) }
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${maintColors[sel]||C.cyan}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:maintColors[sel]||C.cyan,fontWeight:700,marginBottom:8}}>{icons[sel]} {maint[sel]?.name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New"}}>{maint[sel]?.desc}</div>
      </div>
    </div>
  );
}
// LessonE2_L2 - Compresseurs & Systemes Air | PART 2

export default function LessonE2_L2({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
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
  const optColors = [C.cyan, C.blue, C.green, C.teal];
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

  const header=(subtitle:string)=>(
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.cyan}33`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
        <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar"}</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.cyan,marginBottom:2}}>{t.moduleLabel} · L2 {subtitle&&"· "+subtitle}</div>
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

        {section("🔧",t.s1title,<CompressorTypesSVG lang={lang}/>,C.cyan)}
        {section("📊",t.s2title,<CircuitSVG lang={lang}/>,C.teal)}
        {section("⚠️",t.s3title,<FaultsSVG lang={lang}/>,C.red)}
        {section("🔩",t.s4title,<MaintenanceSVG lang={lang}/>,C.blue)}

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

        <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>🔧 {t.quizCTA}</button>
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
      <div style={{fontSize:56,marginBottom:12}}>🔧</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:42,fontWeight:900,color:C.cyan,marginBottom:4}}>{xpFinal}</div>
      <div style={{fontSize:12,color:C.dim,fontFamily:"Courier New",marginBottom:8}}>{lang==="fr"?"XP obtenus":lang==="en"?"XP earned":lang==="es"?"XP obtenidos":"XP obtidos"}</div>
      <div style={{fontSize:15,color:C.white,fontFamily:"Courier New",marginBottom:24}}>Score : {qScore}/{quiz.length}</div>
      <div style={{width:"100%",maxWidth:400,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.cyan}44`,padding:14,marginBottom:24}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.cyan,marginBottom:10}}>✦ {t.summaryTitle}</div>
        {t.summary.map((s:string,i:number)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.cyan,flexShrink:0}}>✦</span><span>{s}</span></div>))}
      </div>
      <button onClick={onBack} style={{width:"100%",maxWidth:400,padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>🔧 {lang==="fr"?"RETOUR AU MODULE":lang==="en"?"BACK TO MODULE":lang==="es"?"VOLVER AL MODULO":"VOLTAR AO MODULO"}</button>
    </div>
  );
}
