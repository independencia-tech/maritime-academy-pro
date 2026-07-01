// LessonE2_L1 — Pompes & Systemes Fluides | PART 1
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
    moduleLabel: "MACHINE — AUXILIAIRES",
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
    accidentTitle: "CAS REEL : Avarie pompe ballast — MV Celeste (2019)",
    accidentBody: "En mer du Nord, la pompe de ballast tribord d'un vraquier tombe en panne a 03h00. Le mecanicien de quart detecte un bruit de graviers et des vibrations anormales. Diagnostic immediat : cavitation severe. Cause racine : filtre d'aspiration comate a 80% apres transit en eaux vaseuses. La pression d'aspiration etait tombee a 0,3 bar (NPSH disponible inferieur au NPSH requis). Consequences : roue erodee, 3 aubes cassees, roulements hors cote. Reparation en mer impossible — navire deviateur vers Rotterdam. Cout : 48 000 EUR + 72h de retard. Lecon : inspection bi-hebdomadaire des filtres d'aspiration apres transit en zone sedimentaire.",
    summaryTitle: "Points essentiels",
    summary: [
      "Les pompes centrifuges dominent a bord : simples, robustes, debit variable selon pression",
      "Les pompes volumetriques (engrenages, pistons) sont utilisees pour l'huile et le carburant HFO",
      "La cavitation detruit les roues des pompes — maintenir NPSHd > NPSHr + 0,5 m de marge",
      "Un systeme hydraulique comprend : pompe, filtre, distributeur, verin/moteur, reservoir",
      "La loi de similarite : P proportionne a n3 — les variateurs de frequence economisent jusqu'a 50% d'energie",
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
      piston:       { name: "Pompe a piston",     desc: "Un ou plusieurs pistons alternatifs deplacent le fluide. Tres haute pression possible. Utilisee pour les systemes hydrauliques haute pression (gouvernail, treuils, stabilisateurs). Debit pulse — necessite un accumulateur pour lisser." },
      diaphragm:    { name: "Pompe a membrane",   desc: "Une membrane flexible remplace le piston. Permet de pomper des fluides corrosifs ou charges sans contact avec les pieces mecaniques. Utilisee pour les eaux usees, produits chimiques, bilge." },
    },
    hydraulicComponents: {
      reservoir:   { name: "Reservoir hydraulique", desc: "Stocke l'huile hydraulique, permet la degazeification et le refroidissement. Equipe d'un filtre de remplissage, d'un indicateur de niveau, d'un thermometre et parfois d'un echangeur de chaleur." },
      pump_h:      { name: "Pompe hydraulique",     desc: "Genere le debit et la pression. Generalement a pistons axiaux (haute pression) ou a engrenages (basse/moyenne pression). Entrainee par un moteur electrique ou le moteur principal." },
      filter:      { name: "Filtre hydraulique",    desc: "Elimine les particules du fluide hydraulique. Filtre en aspiration (grossier), filtre haute pression en refoulement (fin — 10 a 25 microns). Le colmatage est indique par un pressostat differentiel." },
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
      { q: "Qu'est-ce que le NPSH et pourquoi est-il important ?", a: "NPSH (Net Positive Suction Head) = Hauteur nette d'aspiration positive. C'est la difference entre la pression absolue en aspiration de la pompe et la pression de vapeur saturante du liquide, exprimee en metres de colonne de liquide. NPSH disponible (NPSHd) : depend de l'installation (hauteur geometrique, pertes de charge, pression atmospherique). NPSH requis (NPSHr) : caracteristique de la pompe donnee par le fabricant. Regle : NPSHd > NPSHr + marge de securite (0,5 a 1 m). Si NPSHd < NPSHr : cavitation. La cavitation detruit la pompe en heures." },
      { q: "Quelle est la difference entre une pompe auto-amorcante et une pompe non auto-amorcante ?", a: "Pompe non auto-amorcante (centrifuge) : ne peut pas aspirer de l'air. Doit etre amorcee (remplie de liquide) avant demarrage. Si la tuyauterie d'aspiration est vide ou si une poche d'air se forme, la pompe ne peut pas creer de depression suffisante. Pompe auto-amorcante (volumetrique : engrenages, pistons, vis) : peut aspirer un melange air-liquide et se vider elle-meme. Permet une installation plus flexible. La pompe centrifuge peut etre rendue auto-amorcante avec un pied de crepine et un clapet anti-retour." },
      { q: "Comment fonctionne un accumulateur hydraulique et quel est son role ?", a: "Un accumulateur hydraulique est un recipient pressurise contenant de l'huile hydraulique et du gaz (generalement azote N2) separes par un piston, une membrane ou une vessie. Fonctionnement : quand la pression augmente, l'huile comprime le gaz. Quand la pression chute (debit demande), le gaz detend et expulse l'huile. Roles a bord : absorption des pulsations de pression (pompes a pistons), fourniture instantanee d'un debit important (actionnement rapide d'un gouvernail), maintien de la pression en cas d'arret de la pompe (securite), compensation des dilatations thermiques." },
      { q: "Quels sont les differents types de garnitures d'etancheite sur une pompe centrifuge ?", a: "1. Presse-etoupe (garniture a tresse) : la plus ancienne. Un cordage en materiau tresse est comprime autour de l'arbre. Un leger suintement est normal et necessaire pour la lubrification. Simple mais maintenance reguliere. 2. Garniture mecanique (mechanical seal) : deux faces planes (fixe et tournante) en graphite/carbure de silicium maintenues en contact par un ressort. Pas de fuites normalement. Plus fiable et durable. 3. Joint a levres : pour pompes a basse pression. 4. Joint magnetique : pompes sans etancheite dynamique (fluides dangereux). Le choix depend du fluide pompe, de la pression et de la temperature." },
      { q: "Expliquez la loi de similarite des pompes (loi des puissances) pour le changement de vitesse.", a: "La loi de similarite (ou affinite) decrit l'evolution des performances d'une pompe centrifuge quand sa vitesse change : Q2/Q1 = n2/n1 (debit proportionnel a la vitesse). H2/H1 = (n2/n1)2 (hauteur proportionnelle au carre de la vitesse). P2/P1 = (n2/n1)3 (puissance proportionnelle au cube de la vitesse). Consequence pratique : reduire la vitesse d'une pompe de 20% reduit le debit de 20%, la hauteur de 36% et la puissance de 49%. C'est la base des variateurs de frequence (VFD) pour economiser l'energie — tres importants a bord pour les pompes de ballast et refroidissement." },
      { q: "Qu'est-ce que la courbe caracteristique d'une pompe et d'un reseau ?", a: "Courbe de pompe : represente la hauteur manometrique H (m) en fonction du debit Q (m3/h) pour une vitesse donnee. H decroit quand Q augmente. Point de demarrage a debit nul : hauteur maximale (Hmax). Courbe de reseau (ou systeme) : represente la pression necessaire pour faire circuler un debit Q dans le circuit. H augmente avec Q2 (pertes de charge). Forme : Hs = H statique + k x Q2. Point de fonctionnement : intersection de la courbe pompe et de la courbe reseau." },
      { q: "Quelles sont les pompes utilisees pour le ballastage et pourquoi ?", a: "Les pompes de ballast sont generalement des pompes centrifuges a grande capacite car : les debits requis sont importants (remplissage rapide), le fluide (eau de mer) est peu visqueux, la pression requise est moderee (pas de longues tuyauteries), la robustesse est primordiale (eau de mer corrosive avec particules). Caracteristiques typiques : debit 500 a 2000 m3/h, hauteur 20 a 40 m, materiaux en bronze ou acier inox. Une pompe de ballast est souvent reversible (aspiration et refoulement pouvant etre inverses)." },
      { q: "Quelles sont les pompes utilisees pour le fuel oil (HFO) et pourquoi ?", a: "Le HFO (Heavy Fuel Oil) est extremement visqueux (jusqu'a 700 cSt a temperature ambiante) et doit etre chauffe a 120-150°C pour etre pompe. Pompes utilisees : pompes a vis (screw pumps) ideales pour fluides visqueux, debit regulier, pas de degradation du fuel par turbulence. Pompes a engrenages pour faibles debits a haute pression (alimentation moteur). Caracteristiques necessaires : materiaux resistant aux temperatures elevees, etancheite adaptee au HFO chaud, possibilite de vidange complete (pas de poches)." },
      { q: "Comment diagnostiquer une garniture mecanique defectueuse sur une pompe ?", a: "Signes d'une garniture mecanique defectueuse : fuite visible au niveau du joint de l'arbre (normale : quelques gouttes/heure ; anormale : filet continu), bruit inhabituel (grincement si les faces sont en contact sec), elevation de temperature anormale au niveau du joint, vibrations excessives (faces desalignees). Causes : usure normale des faces (remplacement preventif tous les 2-3 ans), contamination du fluide (particules abrasives), choc thermique (fonctionnement a sec meme bref), mauvais alignement moteur-pompe. Maintenance : le remplacement necessite l'arret, la depose et le demontage de la pompe. Toujours remplacer le joint complet (faces + ressort + joints toriques)." },
      { q: "Qu'est-ce qu'une pompe submersible et ou est-elle utilisee a bord ?", a: "Une pompe submersible (ou pompe immergee) est une pompe dont le moteur et la pompe sont etancheifies et peuvent fonctionner immerges dans le fluide. Avantages : pas de probleme d'amorcage (toujours immergee), installation simple, economie d'espace, reduction du bruit. Utilisations a bord : pompes de cale et sentines (vider les fonds en cas d'avarie), pompes de vidange des soutes et citernes, pompes de puisard, alimentation d'eau de mer depuis un puisard bas. Inconvenients : maintenance difficile (necessite l'extraction de la pompe)." },
      { q: "Qu'est-ce qu'un ejecteur (jet pump) et comment fonctionne-t-il ?", a: "Un ejecteur est un dispositif sans pieces mobiles qui utilise l'effet Venturi pour creer une depression et aspirer un fluide. Fonctionnement : un fluide moteur (eau, vapeur) est injecte a grande vitesse dans une tuyere convergente, creant une zone de basse pression qui aspire le fluide a pomper, les deux fluides se melangent dans la chambre de melange et sont comprimes dans le diffuseur. Utilisations a bord : vidange de cales difficiles d'acces, ejection des condensats, aspiration des soutes de mazout. Avantages : pas de pieces mobiles (fiabilite maximale), peut pomper des melanges liquide-gaz." },
      { q: "Comment maintenir les pompes de ballast selon le SMS (Safety Management System) ?", a: "Entretien periodique selon le PMS (Planned Maintenance System) : Hebdomadaire : verification du niveau d'huile des paliers, controle visuel des fuites (presse-etoupe/garniture). Mensuel : verification de l'etat des roulements (vibrations, temperature), lubrification des roulements si necessaire, test de demarrage et verification du debit. Annuel : inspection et nettoyage de la roue, controle de l'usure de la roue et de la volute, controle de l'alignement moteur-pompe, remplacement preventif de la garniture d'etancheite si necessaire. Tous les 2-3 ans : revision complete (roue, volute, roulements, garniture, joints)." },
      { q: "Qu'est-ce que le coup de belier et comment le prevenir dans un circuit de pompage ?", a: "Le coup de belier est une surpression brutale causee par l'arret soudain du flux dans une tuyauterie. Se produit lors de la fermeture rapide d'une vanne ou de l'arret brusque d'une pompe. La pression peut atteindre 5 a 10 fois la pression normale, causant ruptures de tuyauteries, deformation de vannes, dommages aux garnitures. Prevention : fermeture lente des vannes (temps de fermeture > 10s pour les gros circuits), soupapes de surpression sur les collecteurs principaux, reservoirs anti-belier (air comprime), demarreurs progressifs (soft starters) pour les pompes." },
      { q: "Quelles sont les regles MARPOL applicables aux pompes de cale (bilge) ?", a: "MARPOL Annexe I regit le rejet des eaux de cale (eaux mazouteuses). Regles principales : teneur maximale en hydrocarbures pour rejet en mer : 15 ppm (parties par million). Le rejet est interdit a moins de 12 milles des cotes. L'equipement de filtration des eaux de cale (Oil Content Meter — OCM) est obligatoire sur tout navire > 400 TJB. Le journal des hydrocarbures (Oil Record Book Part I) doit consigner toutes les operations de pompage de cale. Rejet en mer interdit si : teneur > 15 ppm, navire dans une zone speciale MARPOL (Mediterranee, Mer du Nord, Antarctique), melange avec cargaison ou residus de cargaison." },
      { q: "Comment calculer la puissance absorbee par une pompe centrifuge ?", a: "La puissance absorbee par une pompe (puissance hydraulique) est : P = (rho x g x Q x H) / eta. Avec : rho = masse volumique du fluide (kg/m3) — eau de mer : 1025 kg/m3, eau douce : 1000 kg/m3. g = acceleration de la pesanteur = 9,81 m/s2. Q = debit volumique (m3/s). H = hauteur manometrique totale (m). eta = rendement de la pompe (typiquement 0,70 a 0,85 pour une centrifuge). Exemple : pompe de ballast, Q = 500 m3/h = 0,139 m3/s, H = 30 m, eta = 0,75. P = (1025 x 9,81 x 0,139 x 30) / 0,75 = 56 kW. La puissance electrique absorbee tient aussi compte du rendement du moteur (typiquement 0,92 a 0,96)." },
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
    moduleLabel: "ENGINE — AUXILIARIES",
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
    accidentTitle: "REAL CASE: Ballast pump failure — MV Celeste (2019)",
    accidentBody: "In the North Sea, the starboard ballast pump of a bulk carrier broke down at 03:00. The duty engineer detected a gravel-like noise and abnormal vibrations. Immediate diagnosis: severe cavitation. Root cause: suction filter clogged at 80% after transit through silty waters. Suction pressure had dropped to 0.3 bar (available NPSH below required NPSH). Consequences: eroded impeller, 3 broken vanes, bearings out of tolerance. Repair at sea impossible — vessel diverted to Rotterdam. Cost: EUR 48,000 + 72-hour delay. Lesson: bi-weekly suction filter inspection after transit through sediment-laden water.",
    summaryTitle: "Key Points",
    summary: [
      "Centrifugal pumps dominate on board: simple, robust, variable flow depending on pressure",
      "Positive displacement pumps (gear, piston) are used for oil and HFO fuel",
      "Cavitation destroys pump impellers — maintain NPSHa > NPSHr + 0.5 m safety margin",
      "A hydraulic system comprises: pump, filter, directional valve, actuator, reservoir",
      "Similarity law: Power proportional to n3 — VFDs save up to 50% energy",
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
      piston:       { name: "Piston pump",        desc: "One or more reciprocating pistons displace fluid. Very high pressure possible. Used for high-pressure hydraulic systems (rudder, winches, stabilisers). Pulsed flow — requires accumulator to smooth." },
      diaphragm:    { name: "Diaphragm pump",     desc: "A flexible diaphragm replaces the piston. Allows pumping of corrosive or laden fluids without contact with mechanical parts. Used for bilge water, chemicals, sewage." },
    },
    hydraulicComponents: {
      reservoir:   { name: "Hydraulic reservoir", desc: "Stores hydraulic oil, allows degassing and cooling. Equipped with a fill filter, level indicator, thermometer and sometimes a heat exchanger." },
      pump_h:      { name: "Hydraulic pump",      desc: "Generates flow and pressure. Generally axial piston (high pressure) or gear (low/medium pressure). Driven by an electric motor or main engine." },
      filter:      { name: "Hydraulic filter",    desc: "Removes particles from hydraulic fluid. Suction filter (coarse), high-pressure delivery filter (fine — 10 to 25 microns). Clogging indicated by a differential pressure switch." },
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
      { q: "What is NPSH and why is it important?", a: "NPSH (Net Positive Suction Head) is the difference between absolute pressure at the pump suction and the saturated vapour pressure of the liquid, expressed in metres of liquid column. Available NPSH (NPSHa): depends on installation (geometric height, head losses, atmospheric pressure). Required NPSH (NPSHr): pump characteristic given by manufacturer. Rule: NPSHa > NPSHr + safety margin (0.5 to 1 m). If NPSHa < NPSHr: cavitation destroys the pump in hours." },
      { q: "What is the difference between a self-priming and a non-self-priming pump?", a: "Non-self-priming (centrifugal): cannot draw air. Must be primed (filled with liquid) before starting. If suction piping is empty or an air pocket forms, the pump cannot create sufficient vacuum. Self-priming (positive displacement: gear, piston, screw): can draw an air-liquid mixture and self-empty. Allows more flexible installation. The centrifugal pump can be made self-priming with a foot valve and check valve." },
      { q: "How does a hydraulic accumulator work and what is its role?", a: "A hydraulic accumulator is a pressurised vessel containing hydraulic oil and gas (usually nitrogen N2) separated by a piston, membrane or bladder. When pressure increases, oil compresses the gas. When pressure drops, gas expands and expels oil. Roles on board: absorbing pressure pulsations (piston pumps), providing instant high flow (rapid rudder actuation), maintaining pressure on pump shutdown (safety), compensating thermal expansion." },
      { q: "What are the different types of shaft seals on a centrifugal pump?", a: "1. Stuffing box (packing gland): oldest type. Braided material compressed around shaft. Slight seepage normal for lubrication. 2. Mechanical seal: two flat faces (fixed and rotating) in graphite/silicon carbide maintained by a spring. No leaks normally. More reliable and durable. 3. Lip seal: for low-pressure pumps. 4. Magnetic seal: for pumps with no dynamic sealing (hazardous fluids). Choice depends on fluid, pressure and temperature." },
      { q: "Explain pump similarity laws (power laws) for speed change.", a: "Similarity (affinity) laws: Q2/Q1 = n2/n1 (flow proportional to speed). H2/H1 = (n2/n1)2 (head proportional to speed squared). P2/P1 = (n2/n1)3 (power proportional to speed cubed). Practical consequence: reducing pump speed by 20% reduces flow by 20%, head by 36% and power by 49%. This is the basis of VFDs (Variable Frequency Drives) for energy saving on board." },
      { q: "What are the pump and system characteristic curves?", a: "Pump curve: represents head H (m) vs flow Q (m3/h) at given speed. H decreases as Q increases. System (network) curve: represents pressure needed to circulate flow Q through the circuit. H increases with Q2 (head losses). Form: Hs = static head + k x Q2. Operating point: intersection of pump and system curves — actual operating flow and pressure." },
      { q: "What pumps are used for ballasting and why?", a: "Ballast pumps are generally large-capacity centrifugal pumps because: high flows required (rapid filling), fluid (seawater) has low viscosity, moderate pressure required, robustness essential (corrosive seawater with particles). Typical characteristics: flow 500-2000 m3/h, head 20-40 m, bronze or stainless steel materials. Often reversible for bidirectional pumping." },
      { q: "What pumps are used for fuel oil (HFO) and why?", a: "HFO is extremely viscous (up to 700 cSt at ambient temperature) and must be heated to 120-150°C for pumping. Pumps used: screw pumps (ideal for viscous fluids, smooth flow, no fuel degradation by turbulence); gear pumps (for low flows at high pressure — engine fuel supply). Must have high-temperature resistant materials and complete drainage capability." },
      { q: "How to diagnose a defective mechanical seal on a pump?", a: "Signs of defective mechanical seal: visible leak at shaft seal (normal: few drops/hour; abnormal: continuous trickle), unusual noise (squealing if faces run dry), abnormal temperature rise at seal, excessive vibration (misaligned faces). Causes: normal face wear, fluid contamination, thermal shock (even brief dry running), motor-pump misalignment. Always replace complete seal (faces + spring + O-rings)." },
      { q: "What is a submersible pump and where is it used on board?", a: "A submersible pump is a pump whose motor and pump are sealed and can operate submerged in the fluid. Advantages: no priming problem, simple installation, space saving, noise reduction. On-board uses: bilge and drain pumps (emergency drainage), tank and bunker drainage, sump pumps, seawater supply from low sumps." },
      { q: "What is an ejector (jet pump) and how does it work?", a: "An ejector is a device with no moving parts using the Venturi effect to create suction. Operation: a motive fluid (water, steam) is injected at high speed through a converging nozzle, creating a low-pressure zone that draws in the fluid to be pumped; both fluids mix in the mixing chamber and are compressed in the diffuser. On-board uses: drainage of confined spaces, condensate ejection, bunker suction. Advantage: no moving parts (maximum reliability)." },
      { q: "How to maintain ballast pumps per the SMS (Safety Management System)?", a: "Periodic maintenance per PMS: Weekly: bearing oil level check, visual leak check. Monthly: bearing condition (vibration, temperature), lubrication, start test and flow check. Annual: impeller inspection and cleaning, wear check, motor-pump alignment check, preventive seal replacement if needed. Every 2-3 years: full overhaul (impeller, volute, bearings, seal, gaskets). All interventions logged in vessel maintenance records." },
      { q: "What is water hammer and how to prevent it in a pumping circuit?", a: "Water hammer is a sudden overpressure caused by abrupt stoppage of flow in a pipeline. Occurs on rapid valve closure or sudden pump stop. Pressure can reach 5-10 times normal pressure, causing pipeline ruptures, valve deformation, seal damage. Prevention: slow valve closure (closing time > 10s for large circuits), surge relief valves on main manifolds, anti-surge vessels (compressed air), soft starters for pumps." },
      { q: "What MARPOL rules apply to bilge pumps?", a: "MARPOL Annex I governs bilge water discharge (oily water). Main rules: maximum oil content for discharge at sea: 15 ppm (parts per million). Discharge prohibited within 12 miles of coast. Bilge water filtering equipment (Oil Content Meter — OCM) mandatory on all vessels > 400 GT. Oil Record Book Part I must record all bilge pumping operations. Discharge at sea prohibited if: content > 15 ppm, vessel in MARPOL special area (Mediterranean, North Sea, Antarctic), mixture contains cargo or cargo residues." },
      { q: "How to calculate the power absorbed by a centrifugal pump?", a: "Power absorbed by a pump (hydraulic power): P = (rho x g x Q x H) / eta. Where: rho = fluid density (kg/m3) — seawater: 1025 kg/m3, fresh water: 1000 kg/m3. g = gravitational acceleration = 9.81 m/s2. Q = volumetric flow (m3/s). H = total manometric head (m). eta = pump efficiency (typically 0.70 to 0.85 for centrifugal). Example: ballast pump, Q = 500 m3/h = 0.139 m3/s, H = 30 m, eta = 0.75. P = (1025 x 9.81 x 0.139 x 30) / 0.75 = 56 kW." },
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
    moduleLabel: "MAQUINAS — AUXILIARES",
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
    accidentTitle: "CASO REAL: Averia bomba de lastre — MV Celeste (2019)",
    accidentBody: "En el Mar del Norte, la bomba de lastre de estribor de un granelero fallo a las 03:00. El oficial de maquinas de guardia detecto ruido de gravilla y vibraciones anormales. Diagnostico inmediato: cavitacion severa. Causa raiz: filtro de aspiracion colmatado al 80% tras transito por aguas fangosas. La presion de aspiracion habia caido a 0,3 bar. Consecuencias: rodete erosionado, 3 alabes rotos, cojinetes fuera de tolerancia. Reparacion en el mar imposible. Coste: 48 000 EUR + 72 horas de retraso. Leccion: inspeccion bisemanal de los filtros de aspiracion tras transito en zonas sedimentarias.",
    summaryTitle: "Puntos esenciales",
    summary: [
      "Las bombas centrifugas dominan a bordo: simples, robustas, caudal variable segun presion",
      "Las bombas volumetricas (engranajes, pistones) se usan para aceite y combustible HFO",
      "La cavitacion destruye los rodetes — mantener NPSHd > NPSHr + 0,5 m de margen",
      "Un sistema hidraulico comprende: bomba, filtro, distribuidor, actuador, deposito",
      "Ley de semejanza: Potencia proporcional a n3 — los variadores de frecuencia ahorran hasta 50% de energia",
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
      piston:       { name: "Bomba de piston",    desc: "Uno o varios pistones alternativos desplazan el fluido. Alta presion posible. Usada para sistemas hidraulicos de alta presion (timon, maquinillas, estabilizadores). Caudal pulsante — requiere acumulador." },
      diaphragm:    { name: "Bomba de membrana",  desc: "Una membrana flexible reemplaza el piston. Permite bombear fluidos corrosivos o cargados sin contacto con piezas mecanicas. Usada para aguas residuales, productos quimicos, sentinas." },
    },
    hydraulicComponents: {
      reservoir:   { name: "Deposito hidraulico", desc: "Almacena el aceite hidraulico, permite la desgasificacion y el enfriamiento. Equipado con filtro de llenado, indicador de nivel, termometro y a veces intercambiador de calor." },
      pump_h:      { name: "Bomba hidraulica",    desc: "Genera el caudal y la presion. Generalmente de pistones axiales (alta presion) o engranajes (baja/media presion). Accionada por motor electrico o motor principal." },
      filter:      { name: "Filtro hidraulico",   desc: "Elimina particulas del fluido hidraulico. Filtro de aspiracion (grueso), filtro de alta presion en descarga (fino — 10 a 25 micras). El taponamiento se indica por un presostato diferencial." },
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
      { q: "Que es el NPSH y por que es importante?", a: "NPSH (Net Positive Suction Head) = diferencia entre la presion absoluta en la aspiracion de la bomba y la presion de vapor saturado del liquido, expresada en metros de columna de liquido. NPSH disponible (NPSHd): depende de la instalacion. NPSH requerido (NPSHr): caracteristica de la bomba. Regla: NPSHd > NPSHr + margen de seguridad (0,5 a 1 m). Si NPSHd < NPSHr: cavitacion. La cavitacion destruye la bomba en horas." },
      { q: "Cual es la diferencia entre una bomba autocebante y una no autocebante?", a: "No autocebante (centrifuga): no puede aspirar aire. Debe cebarse antes del arranque. Autocebante (volumetrica): puede aspirar mezcla aire-liquido y vaciarse sola. La bomba centrifuga puede hacerse autocebante con pie de crepine y valvula de retencion." },
      { q: "Como funciona un acumulador hidraulico y cual es su papel?", a: "Recipiente presurizado con aceite hidraulico y gas (N2) separados por piston, membrana o vejiga. Al aumentar la presion, el aceite comprime el gas. Al bajar la presion, el gas expande y expulsa el aceite. Funciones: absorber pulsaciones, proporcionar caudal instantaneo, mantener presion en caso de corte de bomba." },
      { q: "Cuales son los tipos de cierre de arbol en una bomba centrifuga?", a: "1. Prensaestopas: el mas antiguo, con trenza comprimida alrededor del arbol. Pequeno goteo normal. 2. Cierre mecanico: dos caras planas en contacto por un resorte. Sin fugas normalmente. Mas fiable. 3. Labio de estanqueidad: para baja presion. 4. Cierre magnetico: para fluidos peligrosos." },
      { q: "Explique las leyes de semejanza de bombas para el cambio de velocidad.", a: "Q2/Q1 = n2/n1 (caudal proporcional a la velocidad). H2/H1 = (n2/n1)2 (altura proporcional al cuadrado). P2/P1 = (n2/n1)3 (potencia proporcional al cubo). Reducir la velocidad un 20% reduce el caudal un 20%, la altura un 36% y la potencia un 49%. Base de los variadores de frecuencia (VFD)." },
      { q: "Que son la curva caracteristica de una bomba y de una red?", a: "Curva de bomba: H (m) vs Q (m3/h). H disminuye cuando Q aumenta. Curva de red: Hs = H estatica + k x Q2. Punto de funcionamiento: interseccion de ambas curvas." },
      { q: "Que bombas se usan para el lastre y por que?", a: "Bombas centrifugas de gran capacidad: grandes caudales, agua de mar poco viscosa, presion moderada, robustez. Caudal tipico 500-2000 m3/h, altura 20-40 m, materiales en bronce o acero inoxidable." },
      { q: "Que bombas se usan para el fuel oil (HFO) y por que?", a: "El HFO es muy viscoso y debe calentarse a 120-150°C. Bombas de tornillo (fluidos viscosos, caudal regular) y engranajes (pequenos caudales alta presion). Materiales resistentes a altas temperaturas." },
      { q: "Como diagnosticar un cierre mecanico defectuoso en una bomba?", a: "Signos: fuga visible (normal: pocas gotas/hora), ruido inusual, elevacion de temperatura, vibraciones. Causas: desgaste normal, contaminacion, funcionamiento en seco, desalineacion. Mantenimiento: reemplazar el cierre completo." },
      { q: "Que es una bomba sumergible y donde se usa a bordo?", a: "Bomba con motor y bomba estancos que funcionan sumergidos. Ventajas: sin problemas de cebado, instalacion simple. Usos: sentinas, vaciado de tanques, sumideros." },
      { q: "Que es un eyector (bomba de chorro) y como funciona?", a: "Dispositivo sin piezas moviles usando el efecto Venturi. Un fluido motor crea depresion que aspira el fluido a bombear. Usos: vaciado de espacios confinados, eyeccion de condensados. Ventaja: sin piezas moviles." },
      { q: "Como mantener las bombas de lastre segun el SMS?", a: "Semanal: nivel de aceite, fugas. Mensual: rodamientos, lubricacion, prueba de arranque. Anual: inspeccion del rodete, alineacion, cierre mecanico. Cada 2-3 anos: revision completa. Todo registrado en el sistema de mantenimiento." },
      { q: "Que es el golpe de ariete y como prevenirlo?", a: "Sobrepresion brutal causada por parada brusca del flujo en una tuberia. Ocurre al cerrar rapidamente una valvula o parar bruscamente una bomba. La presion puede alcanzar 5-10 veces la presion normal, causando roturas. Prevencion: cierre lento de valvulas (tiempo de cierre > 10s), valvulas de alivio de sobrepresion, depositos anti-golpe, arrancadores progresivos." },
      { q: "Que normas MARPOL se aplican a las bombas de sentina?", a: "MARPOL Anexo I: contenido maximo en hidrocarburos para vertido en el mar: 15 ppm. Prohibido verter a menos de 12 millas de la costa. Equipo de filtracion de aguas de sentina (OCM) obligatorio en buques > 400 GT. Libro de registro de hidrocarburos Parte I: registra todas las operaciones de bombeo de sentina." },
      { q: "Como calcular la potencia absorbida por una bomba centrifuga?", a: "P = (rho x g x Q x H) / eta. Donde: rho = densidad del fluido (kg/m3). g = 9,81 m/s2. Q = caudal volumetrico (m3/s). H = altura manometrica total (m). eta = rendimiento de la bomba (0,70 a 0,85). Ejemplo: Q = 500 m3/h = 0,139 m3/s, H = 30 m, eta = 0,75, rho = 1025 kg/m3. P = (1025 x 9,81 x 0,139 x 30) / 0,75 = 56 kW." },
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
    moduleLabel: "MAQUINAS — AUXILIARES",
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
    accidentTitle: "CASO REAL: Avaria bomba de lastro — MV Celeste (2019)",
    accidentBody: "No Mar do Norte, a bomba de lastro de estibordo de um graneleiro avariou as 03h00. O oficial de maquinas de quarto detetou ruido de gravilha e vibracoes anormais. Diagnostico imediato: cavitacao severa. Causa raiz: filtro de aspiracao colmatado a 80% apos transito em aguas lodosas. A pressao de aspiracao tinha descido a 0,3 bar. Consequencias: roda erodida, 3 pas partidas, rolamentos fora de tolerancia. Reparacao no mar impossivel. Custo: 48 000 EUR + 72 horas de atraso. Licao: inspecao bissemanal dos filtros de aspiracao apos transito em zonas sedimentares.",
    summaryTitle: "Pontos essenciais",
    summary: [
      "As bombas centrifugas dominam a bordo: simples, robustas, caudal variavel conforme pressao",
      "As bombas volumetricas (engrenagens, pistoes) sao usadas para oleo e combustivel HFO",
      "A cavitacao destroi as rodas das bombas — manter NPSHd > NPSHr + 0,5 m de margem",
      "Um sistema hidraulico inclui: bomba, filtro, distribuidor, atuador, reservatorio",
      "Lei de semelhanca: Potencia proporcional a n3 — os variadores de frequencia poupam ate 50% de energia",
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
      piston:       { name: "Bomba de pistao",      desc: "Um ou mais pistoes alternativos deslocam o fluido. Alta pressao possivel. Usada para sistemas hidraulicos de alta pressao (leme, guinchos, estabilizadores). Caudal pulsante — requer acumulador." },
      diaphragm:    { name: "Bomba de diafragma",   desc: "Um diafragma flexivel substitui o pistao. Permite bombear fluidos corrosivos ou carregados sem contacto com pecas mecanicas. Usada para aguas residuais, produtos quimicos, sentina." },
    },
    hydraulicComponents: {
      reservoir:   { name: "Reservatorio hidraulico", desc: "Armazena o oleo hidraulico, permite a desgasificacao e o arrefecimento. Equipado com filtro de enchimento, indicador de nivel, termometro e as vezes permutador de calor." },
      pump_h:      { name: "Bomba hidraulica",        desc: "Gera o caudal e a pressao. Geralmente de pistoes axiais (alta pressao) ou engrenagens (baixa/media pressao). Acionada por motor eletrico ou motor principal." },
      filter:      { name: "Filtro hidraulico",       desc: "Remove particulas do fluido hidraulico. Filtro de aspiracao (grosso), filtro de alta pressao na descarga (fino — 10 a 25 microns). O entupimento e indicado por um pressostato diferencial." },
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
      { q: "O que e o NPSH e por que e importante?", a: "NPSH (Net Positive Suction Head) = diferenca entre pressao absoluta na aspiracao da bomba e pressao de vapor saturado do liquido, em metros de coluna de liquido. NPSH disponivel (NPSHd): depende da instalacao. NPSH requerido (NPSHr): caracteristica da bomba. Regra: NPSHd > NPSHr + margem de seguranca (0,5 a 1 m). Se NPSHd < NPSHr: cavitacao. A cavitacao destroi a bomba em horas." },
      { q: "Qual e a diferenca entre uma bomba autocebante e uma nao autocebante?", a: "Nao autocebante (centrifuga): nao pode aspirar ar. Deve ser cebada antes de arrancar. Autocebante (volumetrica): pode aspirar mistura ar-liquido. A bomba centrifuga pode tornar-se autocebante com pe de crivo e valvula de retencao." },
      { q: "Como funciona um acumulador hidraulico e qual e o seu papel?", a: "Recipiente pressurizado com oleo hidraulico e gas (N2) separados por pistao, membrana ou bexiga. Ao aumentar a pressao, o oleo comprime o gas. Ao baixar, o gas expande e expulsa o oleo. Funcoes: absorver pulsacoes, fornecer caudal instantaneo, manter pressao em caso de corte de bomba." },
      { q: "Quais sao os tipos de vedacao de veio numa bomba centrifuga?", a: "1. Caixa de gaxeta: mais antiga, com tranca comprimida em torno do veio. Pequena fuga normal. 2. Vedacao mecanica: duas faces planas em contacto por mola. Sem fugas normalmente. Mais fiavel. 3. Labio de vedacao: baixa pressao. 4. Vedacao magnetica: fluidos perigosos." },
      { q: "Explique as leis de semelhanca de bombas para mudanca de velocidade.", a: "Q2/Q1 = n2/n1 (caudal proporcional a velocidade). H2/H1 = (n2/n1)2 (altura proporcional ao quadrado). P2/P1 = (n2/n1)3 (potencia proporcional ao cubo). Base dos variadores de frequencia (VFD)." },
      { q: "O que sao a curva caracteristica de uma bomba e de uma rede?", a: "Curva de bomba: H (m) vs Q (m3/h). H diminui quando Q aumenta. Curva de rede: Hs = H estatica + k x Q2. Ponto de funcionamento: interseccao das duas curvas." },
      { q: "Que bombas se usam para o lastro e porquê?", a: "Bombas centrifugas de grande capacidade: caudais elevados, agua do mar pouco viscosa, pressao moderada, robustez. Caudal tipico 500-2000 m3/h, altura 20-40 m, materiais em bronze ou aco inox." },
      { q: "Que bombas se usam para o fuel oil (HFO) e porquê?", a: "O HFO e muito viscoso e deve ser aquecido a 120-150°C. Bombas de parafuso (fluidos viscosos, caudal regular) e engrenagens (pequenos caudais alta pressao). Materiais resistentes a altas temperaturas." },
      { q: "Como diagnosticar uma vedacao mecanica defeituosa numa bomba?", a: "Sinais: fuga visivel (normal: poucas gotas/hora), ruido invulgar, temperatura elevada, vibracoes. Causas: desgaste normal, contaminacao, funcionamento a seco, desalinhamento. Manutencao: substituir vedacao completa." },
      { q: "O que e uma bomba submersivel e onde se usa a bordo?", a: "Bomba com motor e bomba estanques que funcionam submersos. Vantagens: sem problemas de cebamento, instalacao simples. Usos: sentinas, esvaziamento de tanques, sumidouros." },
      { q: "O que e um ejetor (bomba de jacto) e como funciona?", a: "Dispositivo sem pecas moveis usando o efeito Venturi. Um fluido motor cria depressao que aspira o fluido a bombear. Usos: esvaziamento de espacos confinados, ejecao de condensados. Vantagem: sem pecas moveis." },
      { q: "Como manter as bombas de lastro segundo o SMS?", a: "Semanal: nivel de oleo, fugas. Mensal: rolamentos, lubrificacao, teste de arranque. Anual: inspecao da roda, alinhamento, vedacao mecanica. De 2-3 em 2-3 anos: revisao completa. Tudo registado no sistema de manutencao." },
      { q: "O que e o golpe de aríete e como preveni-lo?", a: "Sobrepressao brutal causada pela paragem brusca do fluxo numa tubagem. Ocorre ao fechar rapidamente uma valvula ou parar bruscamente uma bomba. A pressao pode atingir 5-10 vezes a pressao normal, causando rupturas. Prevencao: fecho lento de valvulas (tempo de fecho > 10s), valvulas de alivio, reservatorios anti-golpe, arrancadores progressivos." },
      { q: "Que regras MARPOL se aplicam as bombas de sentina?", a: "MARPOL Anexo I: teor maximo em hidrocarbonetos para descarga no mar: 15 ppm. Proibido descarregar a menos de 12 milhas da costa. Equipamento de filtracao de aguas de sentina (OCM) obrigatorio em navios > 400 GT. Livro de Registo de Hidrocarbonetos Parte I: regista todas as operacoes de bombagem de sentina." },
      { q: "Como calcular a potencia absorvida por uma bomba centrifuga?", a: "P = (rho x g x Q x H) / eta. Onde: rho = massa volumica do fluido (kg/m3). g = 9,81 m/s2. Q = caudal volumetrico (m3/s). H = altura manometrica total (m). eta = rendimento da bomba (0,70 a 0,85). Exemplo: Q = 500 m3/h = 0,139 m3/s, H = 30 m, eta = 0,75, rho = 1025 kg/m3. P = (1025 x 9,81 x 0,139 x 30) / 0,75 = 56 kW." },
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

// ── SVG 1 — PUMP TYPES ───────────────────────────────────────
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

// ── SVG 2 — CHARACTERISTIC CURVE ─────────────────────────────
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

// ── SVG 3 — HYDRAULIC COMPONENTS ─────────────────────────────
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

// ── SVG 4 — FAULTS ───────────────────────────────────────────
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
// LessonE2_L1 — Pompes & Systemes Fluides | PART 2

export default function LessonE2_L1({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t = T[lang] || T.fr;
  const [phase, setPhase] = useState<"content"|"quiz"|"done">("content");

  // ── CONTENT STATE ────────────────────────────────────────────
  const [exShown, setExShown] = useState<boolean[]>([false,false,false]);
  const [accOpen, setAccOpen] = useState(false);
  const [bankIdx, setBankIdx] = useState<number|null>(null);
  const [bankCur, setBankCur] = useState(0);
  const [bankAns, setBankAns] = useState(false);
  const [bankScore, setBankScore] = useState(0);
  const [bankDone, setBankDone] = useState(false);

  // ── QUIZ STATE ───────────────────────────────────────────────
  const [qCur, setQCur] = useState(0);
  const [qSel, setQSel] = useState<number|null>(null);
  const [qConf, setQConf] = useState(false);
  const [qScore, setQScore] = useState(0);

  const quiz = t.quiz;
  const bank = t.bankQuestions;
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
  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankAns(false);setBankScore(0);setBankDone(false);};
  const bankNext=()=>{
    if(bankCur+1>=bank.length){setBankDone(true);return;}
    setBankCur(c=>c+1);setBankAns(false);
  };

  // ── QUIZ LOGIC ───────────────────────────────────────────────
  const handleQConf=()=>{if(qSel===null)return;setQConf(true);if(qSel===quiz[qCur].correct)setQScore(s=>s+1);};
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
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>&#9664;</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.cyan,marginBottom:2}}>{t.moduleLabel} · L1</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.white,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
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
                <div style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:`${C.navy2}cc`,border:`1px solid ${C.blue}22`}}>{bank[bankCur].q}</div>
                <button onClick={()=>setBankAns(true)} disabled={bankAns} style={{padding:"8px 16px",borderRadius:8,fontSize:11,cursor:bankAns?"default":"pointer",background:bankAns?`${C.cyan}22`:"rgba(255,255,255,0.06)",border:`1px solid ${bankAns?C.cyan:"rgba(255,255,255,0.15)"}`,color:bankAns?C.cyan:"rgba(240,244,255,0.5)",fontFamily:"Courier New",marginBottom:bankAns?10:0}}>{bankAns?t.hideAnswer:t.showAnswer}</button>
                {bankAns&&(
                  <div>
                    <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.cyan}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{bank[bankCur].a}</div>
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
    const q=quiz[qCur];
    const isCorrect=qSel===q.correct;
    const submitLabel={fr:"Valider",en:"Submit",es:"Validar",pt:"Validar"}[lang]||"Valider";
    const nextLabel={fr:"Suivant =>",en:"Next =>",es:"Siguiente =>",pt:"Seguinte =>"}[lang]||"Suivant =>";
    return(
      <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif"}}>
        <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.cyan}33`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
            <button onClick={()=>setPhase("content")} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>&#9664;</button>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.cyan,marginBottom:2}}>{t.moduleLabel} · L1 · QUIZ</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.white}}>{t.lessonTitle}</div>
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
