// LessonE2_L3 - Purificateurs & Separateurs | PART 1
import { useState } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  cyan:   "#00e5ff",
  blue:   "#2979ff",
  teal:   "#00bcd4",
  green:  "#4caf50",
  purple: "#7c4dff",
  amber:  "#ffab00",
  warn:   "#ff6f00",
  red:    "#ef5350",
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
    lessonTitle: "Purificateurs & Separateurs",
    lessonSub:   "HFO, huile LO, gravity disc, MARPOL OWS",
    intro: "Le fuel lourd (HFO) utilise par les navires contient de l'eau, des sediments et des impuretes qui doivent etre elimines avant la combustion. Les purificateurs centrifuges et separateurs jouent un role crucial dans la preparation du combustible et des huiles de lubrification.",
    s1title: "Principe de la separation centrifuge",
    s2title: "Composants d'un purificateur",
    s3title: "Parametres de reglage",
    s4title: "Defauts et alarmes",
    s1hint:  "Selectionnez un type",
    s2hint:  "Tapez un composant pour sa description",
    s3hint:  "Selectionnez un parametre",
    s4hint:  "Selectionnez un defaut",
    exerciseTitle: "Exercices pratiques",
    showAnswer: "Voir la correction",
    hideAnswer: "Masquer",
    accidentTitle: "CAS REEL : Fraude au bypass 'magic pipe' - M/V Fidelio (2003-2008, USCG/DOJ)",
    accidentBody: "En mars 2003, lors d'une inspection des garde-cotes americains a Baltimore, les inspecteurs decouvrent sous le plancher de la salle des machines du car-carrier M/V Fidelio une tuyauterie de derivation permanente (surnommee 'magic pipe') installee depuis la construction du navire, retrouvee chargee d'huile noire. Cette derivation permettait de contourner completement le separateur eau-huile (OWS) et de rejeter directement en mer les eaux de cale contaminees, une pratique utilisee depuis 1998. Le registre des hydrocarbures (Oil Record Book) etait systematiquement falsifie pour dissimuler ces rejets, l'OWS n'etant quasiment jamais utilise. Plusieurs chefs mecaniciens successifs du navire ont ete reconnus coupables devant la justice federale americaine entre 2007 et 2008 pour violation de l'Act to Prevent Pollution from Ships (APPS) et fausses declarations. L'armateur, Pacific Gulf Marine, a lui-meme plaide coupable, reconnaissant que des centaines de milliers de litres d'eaux souillees en hydrocarbures avaient ete illegalement rejetes depuis plusieurs de ses navires.",
    summaryTitle: "Points essentiels",
    summary: [
      "La separation centrifuge utilise la difference de densite entre l'huile, l'eau et les sediments",
      "Un purificateur (3 sorties) elimine l'eau et les sediments - le clarificateur (2 sorties) elimine les solides uniquement",
      "La temperature d'operation du HFO doit etre 85-98 degC pour reduire la viscosite",
      "Le gravity disc determine l'interface huile-eau - choix crucial selon la densite du carburant",
      "MARPOL limite les rejets en mer a 15 ppm - ODMCS obligatoire sur tous navires > 400 TJB",
      "Purifier l'huile de lubrification multiplie sa duree de vie par 2 a 4",
    ],
    quizCTA: "COMMENCER LE QUIZ",
    bankStart: "COMMENCER =>",
    bankNext: "Question suivante =>",
    bankTrophy: "Bravo ! Banque terminee",
    bankScore: "Score banque",
    sepTypes: {
      purifier:  { name: "Purificateur (Purifier)", desc: "Elimine a la fois l'eau et les sediments. Utilise un gravity disc pour maintenir l'interface huile-eau. Eau scellee (sealing water) requise pour creer le joint hydraulique. Utilise pour le HFO et l'huile lubrifiante fortement contamines.", outlet: "3 sorties : huile propre / eau + impuretes / boues" },
      clarifier: { name: "Clarificateur (Clarifier)", desc: "Elimine uniquement les sediments solides - pas d'eau libre. Pas de gravity disc ni d'eau scellee. Utilise quand le combustible contient peu d'eau. En pratique : souvent utilise en 2eme etage apres un purificateur.", outlet: "2 sorties : huile + eau (ensemble) / boues solides" },
    },
    components: {
      bowl:            { name: "Bol centrifuge (Bowl)",        desc: "Piece maitresse du purificateur. Tourne a tres grande vitesse (6000-10000 tr/min). Contient les disques de separation empiles. La force centrifuge y est 5000-10000 fois la gravite, permettant une separation extremement efficace." },
      discs:           { name: "Disques de separation",        desc: "Disques coniques empiles a angle (40-45 degres). Augmentent la surface de separation effective. Le liquide monte entre les disques en couches minces, permettant une separation rapide des phases. Un bol peut contenir 100-150 disques." },
      gravity_disc:    { name: "Gravity disc (deversoir)",     desc: "Anneau en acier inox a l'extremite superieure du bol qui determine la position de l'interface huile-eau. Diametre interieur critique : trop grand → eau dans la sortie huile ; trop petit → huile dans la sortie eau. Choisi selon la densite du combustible." },
      sealing_water:   { name: "Eau scellee (Sealing water)",  desc: "Eau ajoutee au debut de l'operation pour creer le joint hydraulique entre l'huile et l'eau. Sans eau scellee, l'huile passerait directement dans la chambre eau. Doit etre propre et douce (pas d'eau de mer)." },
      operating_water: { name: "Eau de manoeuvre",              desc: "Eau sous pression utilisee pour commander l'ouverture et la fermeture du fond du bol lors des ejections de boues. Haute pression (6-8 bar), declenchee automatiquement ou manuellement." },
      heater:          { name: "Rechauffeur (Heater)",          desc: "Chauffe le combustible a la temperature d'operation (85-98 degC pour HFO). Une temperature insuffisante → viscosite trop haute → mauvaise separation. Une temperature excessive → vaporisation et risque d'incendie." },
    },
    parameters: {
      temperature:  { name: "Temperature d'operation",    desc: "HFO : 85-98 degC (selon viscosite). MDO/MGO : 40-50 degC. Huile lubrifiante : 85-90 degC. La temperature reduit la viscosite, ameliorant la separation. Controlee par un thermometre et une vanne de regulation de vapeur." },
      flowrate:     { name: "Debit d'alimentation",       desc: "Debit trop eleve → temps de sejour trop court → mauvaise separation. Debit trop faible → risque de debordement. Regle entre 20-60% de la capacite nominale pour optimiser la separation." },
      backpressure: { name: "Contre-pression de sortie",  desc: "Pression a la sortie huile (0,1-0,3 bar). Si trop haute → huile refoulee dans la chambre eau. Si trop basse → aspiration d'air. Controlee par une vanne d'etranglement sur la sortie." },
      ejection:     { name: "Intervalle d'ejection boues", desc: "Duree entre deux ejections automatiques de boues. Depend de la teneur en impuretes du combustible. Typique : 30-60 minutes. Un intervalle trop long → bol surchargee → huile dans les boues (pertes)." },
    },
    faults: {
      waterinoil: { name: "Eau dans la sortie huile", cause: "Gravity disc trop large, debit trop eleve, temperature trop basse, eau scellee insuffisante, disques encresses.", remedy: "Remplacer le gravity disc par un plus petit, reduire le debit, augmenter la temperature, verifier l'eau scellee, nettoyer les disques." },
      oilinwater: { name: "Huile dans la sortie eau",  cause: "Gravity disc trop petit, joint hydraulique brise (perte d'eau scellee), debit trop faible.", remedy: "Remplacer le gravity disc par un plus grand, verifier et restaurer l'eau scellee, augmenter le debit." },
      vibration:  { name: "Vibrations excessives",     cause: "Bol desequilibre (accumulation de boues d'un cote), roulements uses, vitesse anormale.", remedy: "Ejecter les boues, nettoyer et equilibrer le bol, remplacer les roulements, verifier la vitesse." },
      hightemp:   { name: "Temperature sortie trop elevee", cause: "Vanne de vapeur bloquee ouverte, defaut du regulateur de temperature, surchauffe du rechauffeur.", remedy: "Regler la vanne de vapeur, verifier le thermometre et le regulateur, controler la pression de vapeur." },
    },
    exercises: [
      { q: "Expliquez le principe de fonctionnement d'un purificateur centrifuge pour HFO. Pourquoi la force centrifuge est-elle si efficace ?", a: "Un purificateur centrifuge fait tourner le fuel a tres grande vitesse (6000-10000 tr/min) dans un bol. La force centrifuge generee (5000 a 10000 fois la gravite) separe les composants selon leur densite : Les particules solides (sediments) les plus denses sont projetees contre la paroi exterieure du bol. L'eau (densite ~1,0) se depose a l'exterieur des disques. L'huile (densite 0,9-0,99) remonte au centre et sort par le dessus. La force centrifuge est si efficace car elle est des milliers de fois plus puissante que la gravite. Une particule de 1 micron qui mettrait des heures a sedimenter par gravite se separe en secondes dans un purificateur. Les disques empiles a 45 degres divisent le flux en couches minces, multipliant encore la surface de separation." },
      { q: "Comment choisir le bon gravity disc pour un purificateur de HFO ?", a: "Le gravity disc est choisi en fonction de la densite du combustible. Il existe des tables de selection dans le manuel du fabricant. Principe : plus la densite du HFO est elevee, plus le diametre interieur du gravity disc doit etre petit. Methode de selection : 1. Mesurer la densite du HFO a 15 degC (ex : 0,990 g/cm3). 2. Mesurer la temperature d'operation (ex : 95 degC). 3. Consulter la table de selection pour choisir le diametre correct. 4. Demarrer et verifier : si de l'eau sort avec l'huile → gravity disc trop grand. Si de l'huile sort avec l'eau → gravity disc trop petit." },
      { q: "Qu'est-ce que l'eau scellee dans un purificateur et que se passe-t-il si elle disparait pendant l'operation ?", a: "L'eau scellee (sealing water) est une couche d'eau douce qui cree le joint hydraulique entre la chambre a huile et la chambre a eau dans le bol du purificateur. Sans eau scellee, il n'y a pas de separation : l'huile passerait directement dans la chambre eau. Si l'eau scellee disparait pendant l'operation : 1. L'interface huile-eau se brise. 2. L'huile envahit la chambre eau. 3. La sortie eau devient chargee en huile (pertes importantes). 4. Le purificateur perd son efficacite. Causes de perte d'eau scellee : debit d'alimentation trop eleve, temperature trop basse, ejection accidentelle. Remede : arreter l'alimentation, reinitialiser le joint hydraulique en reinjectant l'eau scellee." },
    ],
    bankQuestions: [
      { q: "Quelle est la principale difference entre un purificateur et un clarificateur ?", opts: ["Le purificateur elimine l'eau ET les sediments grace a un gravity disc, le clarificateur elimine uniquement les sediments","Le clarificateur est toujours plus rapide que le purificateur","Le purificateur n'a que 2 sorties","Aucune difference fonctionnelle entre les deux"], correct: 0, expl: "Le purificateur utilise un gravity disc et de l'eau scellee pour separer eau et sediments (3 sorties : huile propre, eau, boues). Le clarificateur, sans gravity disc, elimine uniquement les sediments solides (2 sorties)." },
      { q: "Pourquoi chauffe-t-on le HFO a 85-98 degC avant le purificateur ?", opts: ["Pour augmenter sa densite","Pour reduire sa viscosite et ameliorer la separation","Pour le steriliser","Pour eviter la corrosion du bol"], correct: 1, expl: "A 50 degC le HFO peut avoir une viscosite de 700 cSt ; a 95 degC elle chute a 10-20 cSt. Un fluide moins visqueux se separe beaucoup plus efficacement dans le bol centrifuge." },
      { q: "Comment se declenche l'ejection des boues dans un purificateur ?", opts: ["Par ouverture manuelle uniquement, jamais automatique","Par introduction d'eau de manoeuvre sous pression (6 a 8 bar) qui ouvre le fond du bol","Par arret complet du moteur","Par augmentation de la temperature du HFO"], correct: 1, expl: "L'eau de manoeuvre a haute pression pousse le piston de fond vers le bas, ouvrant des orifices peripheriques qui ejectent centrifugalement boues et eau en quelques secondes." },
      { q: "Quel est le role du gravity disc dans un purificateur ?", opts: ["Filtrer les particules solides","Determiner la position de l'interface huile-eau selon son diametre","Chauffer le combustible","Lubrifier les roulements du bol"], correct: 1, expl: "Le gravity disc, anneau en acier inox au sommet du bol, cree un deversoir dont le diametre interieur fixe la position de l'interface huile-eau, choisi selon la densite du combustible." },
      { q: "Que se passe-t-il si le gravity disc est trop grand pour la densite du combustible ?", opts: ["De l'huile sort avec l'eau","De l'eau penetre dans la sortie huile","Le bol s'arrete automatiquement","Aucun effet notable"], correct: 1, expl: "Un gravity disc trop grand deplace l'interface trop pres du centre : l'eau penetre dans la zone huile, contaminant la sortie huile. A l'inverse, un disc trop petit cause de l'huile dans la sortie eau." },
      { q: "Quelle etape est essentielle avant de demarrer un purificateur ?", opts: ["Vider completement le bol de son eau scellee","Introduire l'eau scellee (sealing water) pour creer le joint hydraulique","Desactiver l'alarme de temperature","Retirer les disques de separation"], correct: 1, expl: "Sans eau scellee, aucun joint hydraulique ne se forme entre chambre huile et chambre eau : l'huile passerait directement dans la chambre eau des le demarrage." },
      { q: "Quelle est la consequence d'une perte d'eau scellee pendant l'operation ?", opts: ["Une amelioration de la separation","L'huile passe dans la chambre eau, causant des pertes importantes","Un arret automatique sans consequence","Une augmentation de la temperature du bol"], correct: 1, expl: "La perte d'eau scellee brise l'interface huile-eau : l'huile envahit la chambre eau et la sortie eau devient chargee en huile, entrainant des pertes importantes de combustible." },
      { q: "Selon MARPOL Annexe I, quelle est la teneur maximale en hydrocarbures autorisee pour le rejet en mer des eaux de cale ?", opts: ["5 ppm","15 ppm","50 ppm","100 ppm"], correct: 1, expl: "MARPOL Annexe I fixe la limite a 15 ppm d'hydrocarbures pour tout rejet en mer, avec des restrictions supplementaires dans les zones speciales (Mediterranee, Baltique, mer Rouge)." },
      { q: "Quel dispositif obligatoire surveille en continu la teneur en huile des effluents et declenche une alarme/arret en cas de depassement ?", opts: ["Le gravity disc","L'ODMCS (Oil Discharge Monitoring and Control System)","Le rechauffeur","La pompe d'eau de manoeuvre"], correct: 1, expl: "L'ODMCS surveille en continu la teneur en huile des rejets et declenche automatiquement une alarme et l'arret du rejet si la limite de 15 ppm est depassee." },
      { q: "Comment doit-on nettoyer les disques de separation encrasses ?", opts: ["Avec des outils metalliques pour gratter les depots","Par trempage dans un solvant adapte puis brossage doux, sans outils metalliques","En les brulant a l'incinerateur","Il n'est jamais necessaire de les nettoyer"], correct: 1, expl: "Le trempage dans un solvant (kerosene ou solution alcaline chaude) dissout les depots, suivi d'un brossage doux : les outils metalliques rayeraient les surfaces et degraderaient l'efficacite de separation." },
      { q: "Que devient le contenu du sludge tank a bord ?", opts: ["Il est rejete directement en mer","Il peut etre brule en petites quantites a l'incinerateur ou decharge dans une installation portuaire","Il est stocke indefiniment sans traitement","Il est reinjecte directement dans le moteur"], correct: 1, expl: "MARPOL interdit le rejet des boues en mer : elles sont soit brulees en petites quantites melangees au HFO, soit dechargees dans une sludge reception facility a quai, tracees dans l'Oil Record Book." },
      { q: "Comment optimiser la consommation energetique d'un purificateur ?", opts: ["En augmentant le debit au maximum en permanence","En maintenant temperature et debit optimaux et en nettoyant regulierement les disques","En desactivant les ejections de boues","En faisant fonctionner le purificateur en continu sans arret"], correct: 1, expl: "Une temperature et un debit optimaux, associes a des disques propres et un bol equilibre, permettent de reduire la consommation d'un purificateur de 30 a 40% par rapport a un appareil encrasse." },
      { q: "Une alarme de vibrations elevees sur un purificateur indique le plus souvent :", opts: ["Une temperature trop basse du HFO","Un bol desequilibre par accumulation de boues","Un exces d'eau scellee","Une pression d'huile trop faible"], correct: 1, expl: "L'accumulation de boues d'un cote du bol cree un desequilibre qui se traduit par des vibrations. L'ejection des boues et l'inspection des roulements sont les actions correctives immediates." },
      { q: "Qu'est-ce que le registre des hydrocarbures (Oil Record Book) ?", opts: ["Un simple carnet de maintenance facultatif","Un document obligatoire tracant toutes les operations impliquant des hydrocarbures (purge, transfert, rejet)","Un certificat de la societe de classification renouvele tous les 10 ans","Un manuel technique du fabricant du purificateur"], correct: 1, expl: "L'Oil Record Book est un document legal obligatoire consignant chronologiquement toutes les operations de purge, transfert et rejet d'hydrocarbures, exige par MARPOL Annexe I et controle en inspection PSC." },
      { q: "Pourquoi la separation par force centrifuge est-elle tellement plus rapide que la sedimentation par gravite ?", opts: ["Elle ne l'est pas, c'est un mythe","La force generee est des milliers de fois superieure a la gravite, separant en secondes ce qui prendrait des heures","Elle chauffe le fluide instantanement","Elle filtre mecaniquement les particules"], correct: 1, expl: "La force centrifuge dans un bol (5000 a 10000 fois la gravite) accelere considerablement la separation par densite : une particule qui sedimenterait en heures se separe en quelques secondes." },
    ],
    quiz: [
      { q: "A quelle temperature faut-il chauffer le HFO pour optimiser la separation dans un purificateur ?", opts: ["40-50 degC", "60-70 degC", "85-98 degC", "110-120 degC"], correct: 2, exp: "Le HFO doit etre chauffe a 85-98 degC pour reduire sa viscosite a 10-20 cSt, permettant une separation efficace. En dessous de cette temperature, la viscosite est trop elevee et les performances de separation chutent drastiquement." },
      { q: "Qu'est-ce que le gravity disc dans un purificateur ?", opts: ["Un filtre a particules", "Un anneau qui determine la position de l'interface huile-eau", "Un regulateur de debit", "Un amortisseur de vibrations"], correct: 1, exp: "Le gravity disc est un anneau en acier inox qui cree un deversoir a l'extremite du bol. Son diametre interieur determine la position de l'interface huile-eau. Un diametre trop grand laisse passer l'eau dans l'huile ; trop petit, l'huile passe dans l'eau." },
      { q: "Un purificateur a 3 sorties. Quelles sont-elles ?", opts: ["Huile, eau, air", "Huile propre, eau + impuretes, boues", "Huile chaude, huile froide, boues", "Entree, sortie, recirculation"], correct: 1, exp: "Un purificateur a 3 sorties : l'huile propre (sortie principale), l'eau avec les impuretes (effluent eau), et les boues (ejectees periodiquement par les orifices peripheriques du bol)." },
      { q: "Quelle est la teneur maximale en huile autorisee par MARPOL pour le rejet des eaux de cale en mer ?", opts: ["5 ppm", "15 ppm", "100 ppm", "1000 ppm"], correct: 1, exp: "MARPOL Annexe I limite la teneur en huile des eaux de cale rejetees en mer a 15 ppm maximum (a plus de 12 milles nautiques des cotes). Au-dela, ou dans les zones speciales, le rejet est totalement interdit." },
      { q: "Que se passe-t-il si le gravity disc est trop grand dans un purificateur ?", opts: ["Les boues ne sont pas ejectees", "L'eau passe dans la sortie huile", "L'huile passe dans la sortie eau", "La vitesse du bol augmente"], correct: 1, exp: "Si le gravity disc est trop grand, l'interface huile-eau se deplace trop loin vers le centre du bol. L'eau atteint la zone huile et sort avec l'huile propre → eau dans la sortie huile. Solution : remplacer par un gravity disc de plus petit diametre." },
    ],
  },

  en: {
    moduleLabel: "ENGINE - AUXILIARIES",
    lessonTitle: "Purifiers & Separators",
    lessonSub:   "HFO, lube oil, gravity disc, MARPOL OWS",
    intro: "Heavy fuel oil (HFO) used by vessels contains water, sediments and impurities that must be removed before combustion. Centrifugal purifiers and separators play a crucial role in preparing fuel and lubricating oils.",
    s1title: "Centrifugal Separation Principle",
    s2title: "Purifier Components",
    s3title: "Operating Parameters",
    s4title: "Faults and Alarms",
    s1hint:  "Select a type",
    s2hint:  "Tap a component for its description",
    s3hint:  "Select a parameter",
    s4hint:  "Select a fault",
    exerciseTitle: "Practice Exercises",
    showAnswer: "Show answer",
    hideAnswer: "Hide",
    accidentTitle: "REAL CASE: 'Magic pipe' bypass fraud - M/V Fidelio (2003-2008, USCG/DOJ)",
    accidentBody: "In March 2003, during a US Coast Guard inspection in Baltimore, inspectors discovered under the engine room deck plates of the car-carrier M/V Fidelio a permanently installed bypass pipe (nicknamed a 'magic pipe'), fitted since the ship's construction and found filled with black oil. This bypass allowed the oily water separator (OWS) to be completely circumvented, discharging contaminated bilge water directly at sea, a practice used since 1998. The Oil Record Book was systematically falsified to conceal these discharges, as the OWS was almost never actually used. Several successive chief engineers of the ship were found guilty in US federal court between 2007 and 2008 for violating the Act to Prevent Pollution from Ships (APPS) and making false statements. The operator, Pacific Gulf Marine, itself pleaded guilty, admitting that hundreds of thousands of litres of oil-contaminated water had been illegally discharged from several of its ships.",
    summaryTitle: "Key Points",
    summary: [
      "Centrifugal separation uses density differences between oil, water and sediments",
      "A purifier (3 outlets) removes water and sediments - clarifier (2 outlets) removes solids only",
      "HFO operating temperature must be 85-98 degC to reduce viscosity",
      "Gravity disc determines oil-water interface - critical choice based on fuel density",
      "MARPOL limits sea discharges to 15 ppm - ODMCS mandatory on all vessels > 400 GT",
      "Purifying lube oil multiplies its service life by 2 to 4",
    ],
    quizCTA: "START QUIZ",
    bankStart: "START =>",
    bankNext: "Next question =>",
    bankTrophy: "Well done! Bank completed",
    bankScore: "Bank score",
    sepTypes: {
      purifier:  { name: "Purifier", desc: "Removes both water and sediments. Uses a gravity disc to maintain the oil-water interface. Sealing water required to create the hydraulic seal. Used for heavily contaminated HFO and lube oil.", outlet: "3 outlets: clean oil / water + impurities / sludge" },
      clarifier: { name: "Clarifier", desc: "Removes solid sediments only - not free water. No gravity disc or sealing water. Used when fuel contains little water. In practice: often used as 2nd stage after a purifier.", outlet: "2 outlets: oil + water (together) / solid sludge" },
    },
    components: {
      bowl:            { name: "Centrifuge bowl",    desc: "Heart of the purifier. Rotates at very high speed (6000-10000 rpm). Contains stacked separation discs. Centrifugal force is 5000-10000 times gravity, enabling extremely effective separation." },
      discs:           { name: "Separation discs",   desc: "Conical stacked discs at angle (40-45 degres). Increase effective separation surface. Liquid rises between discs in thin layers enabling rapid phase separation. A bowl may contain 100-150 discs." },
      gravity_disc:    { name: "Gravity disc",       desc: "Stainless steel ring at the bowl top that determines the oil-water interface position. Critical bore diameter: too large → water in oil outlet; too small → oil in water outlet. Selected according to fuel density." },
      sealing_water:   { name: "Sealing water",      desc: "Water added at start of operation to create the hydraulic seal between oil and water. Without sealing water, oil would pass directly into the water chamber. Must be clean and fresh (not seawater)." },
      operating_water: { name: "Operating water",    desc: "Pressurised water used to control bowl bottom opening/closing during sludge ejections. High pressure (6-8 bar), triggered automatically or manually." },
      heater:          { name: "Heater",              desc: "Heats fuel to operating temperature (85-98 degC for HFO). Insufficient temperature → viscosity too high → poor separation. Excessive temperature → vaporisation and fire risk." },
    },
    parameters: {
      temperature:  { name: "Operating temperature",   desc: "HFO: 85-98 degC (depending on viscosity). MDO/MGO: 40-50 degC. Lube oil: 85-90 degC. Temperature reduces viscosity, improving separation. Controlled by thermometer and steam control valve." },
      flowrate:     { name: "Feed flow rate",          desc: "Too high → residence time too short → poor separation. Too low → overflow risk. Set between 20-60% of nominal capacity to optimise separation." },
      backpressure: { name: "Outlet back pressure",    desc: "Pressure at oil outlet (0.1-0.3 bar). Too high → oil forced into water chamber. Too low → air ingestion. Controlled by throttle valve on outlet." },
      ejection:     { name: "Sludge ejection interval", desc: "Time between automatic sludge ejections. Depends on fuel impurity content. Typical: 30-60 minutes. Too long interval → overloaded bowl → oil in sludge (losses)." },
    },
    faults: {
      waterinoil: { name: "Water in oil outlet", cause: "Gravity disc too large, flow rate too high, temperature too low, insufficient sealing water, fouled discs.", remedy: "Replace gravity disc with smaller, reduce flow, increase temperature, check sealing water, clean discs." },
      oilinwater: { name: "Oil in water outlet",  cause: "Gravity disc too small, broken hydraulic seal (sealing water loss), flow rate too low.", remedy: "Replace gravity disc with larger, check and restore sealing water, increase flow rate." },
      vibration:  { name: "Excessive vibrations", cause: "Unbalanced bowl (sludge accumulation on one side), worn bearings, abnormal speed.", remedy: "Eject sludge, clean and balance bowl, replace bearings, check speed." },
      hightemp:   { name: "Oil outlet temp too high", cause: "Steam valve stuck open, temperature regulator fault, heater overheating.", remedy: "Adjust steam valve, check thermometer and regulator, check steam pressure." },
    },
    exercises: [
      { q: "Explain the operating principle of a centrifugal HFO purifier. Why is centrifugal force so effective?", a: "A centrifugal purifier rotates fuel at very high speed (6000-10000 rpm) in a bowl. The centrifugal force generated (5000-10000 times gravity) separates components by density: solid particles (sediments) are thrown to the bowl outer wall. Water (density ~1.0) settles outside the discs. Oil (density 0.9-0.99) rises to the centre and exits from the top. Centrifugal force is so effective because it is thousands of times more powerful than gravity. A 1-micron particle that would take hours to settle by gravity separates in seconds in a purifier. The 45 degres-angled stacked discs split flow into thin layers, further multiplying separation surface." },
      { q: "How to choose the correct gravity disc for an HFO purifier?", a: "The gravity disc is chosen based on fuel density. Selection tables are in the manufacturer's manual. Principle: the higher the HFO density, the smaller the gravity disc bore must be. Selection method: 1. Measure HFO density at 15 degC (e.g. 0.990 g/cm3). 2. Measure operating temperature (e.g. 95 degC). 3. Consult selection table for correct diameter. 4. Start and verify: if water exits with oil → gravity disc too large. If oil exits with water → gravity disc too small." },
      { q: "What is sealing water in a purifier and what happens if it disappears during operation?", a: "Sealing water is a layer of fresh water that creates the hydraulic seal between the oil chamber and water chamber in the purifier bowl. Without sealing water, there is no separation: oil would pass directly into the water chamber. If sealing water disappears during operation: 1. Oil-water interface breaks. 2. Oil invades water chamber. 3. Water outlet becomes oil-laden (significant losses). 4. Purifier loses effectiveness. Causes of sealing water loss: feed rate too high, temperature too low, accidental sealing water ejection. Remedy: stop feed, reinitialise hydraulic seal by reinjecting sealing water." },
    ],
    bankQuestions: [
      { q: "What is the main difference between a purifier and a clarifier?", opts: ["The purifier removes water AND sediments using a gravity disc, the clarifier removes only sediments","The clarifier is always faster than the purifier","The purifier has only 2 outlets","No functional difference between the two"], correct: 0, expl: "The purifier uses a gravity disc and sealing water to separate water and sediments (3 outlets: clean oil, water, sludge). The clarifier, without a gravity disc, removes only solid sediments (2 outlets)." },
      { q: "Why is HFO heated to 85-98 degC before the purifier?", opts: ["To increase its density","To reduce its viscosity and improve separation","To sterilise it","To prevent bowl corrosion"], correct: 1, expl: "At 50 degC, HFO can have a viscosity of 700 cSt; at 95 degC it drops to 10-20 cSt. A less viscous fluid separates far more effectively in the centrifugal bowl." },
      { q: "How is sludge ejection triggered in a purifier?", opts: ["Only by manual opening, never automatic","By introducing operating water under pressure (6 to 8 bar) that opens the bowl bottom","By fully stopping the motor","By raising the HFO temperature"], correct: 1, expl: "High-pressure operating water pushes the bottom piston down, opening peripheral ports that centrifugally eject sludge and water within seconds." },
      { q: "What is the role of the gravity disc in a purifier?", opts: ["Filtering solid particles","Determining the oil-water interface position via its bore diameter","Heating the fuel","Lubricating the bowl bearings"], correct: 1, expl: "The gravity disc, a stainless steel ring at the bowl top, creates a weir whose bore diameter sets the oil-water interface position, chosen according to fuel density." },
      { q: "What happens if the gravity disc is too large for the fuel density?", opts: ["Oil comes out with the water","Water enters the oil outlet","The bowl stops automatically","No notable effect"], correct: 1, expl: "A gravity disc that is too large shifts the interface too far inward: water enters the oil zone, contaminating the oil outlet. Conversely, too small a disc causes oil in the water outlet." },
      { q: "What step is essential before starting a purifier?", opts: ["Fully draining the sealing water from the bowl","Introducing sealing water to create the hydraulic seal","Disabling the temperature alarm","Removing the separation discs"], correct: 1, expl: "Without sealing water, no hydraulic seal forms between oil and water chambers: oil would pass directly into the water chamber from start-up." },
      { q: "What is the consequence of sealing water loss during operation?", opts: ["Improved separation","Oil passes into the water chamber, causing significant losses","An automatic stop with no consequence","An increase in bowl temperature"], correct: 1, expl: "Sealing water loss breaks the oil-water interface: oil invades the water chamber and the water outlet becomes oil-laden, causing significant fuel losses." },
      { q: "Under MARPOL Annex I, what is the maximum oil content allowed for bilge water discharge at sea?", opts: ["5 ppm","15 ppm","50 ppm","100 ppm"], correct: 1, expl: "MARPOL Annex I sets the limit at 15 ppm oil content for any discharge at sea, with additional restrictions in special areas (Mediterranean, Baltic, Red Sea)." },
      { q: "Which mandatory device continuously monitors effluent oil content and triggers an alarm/stop if exceeded?", opts: ["The gravity disc","The ODMCS (Oil Discharge Monitoring and Control System)","The heater","The operating water pump"], correct: 1, expl: "The ODMCS continuously monitors the oil content of discharges and automatically triggers an alarm and stops discharge if the 15 ppm limit is exceeded." },
      { q: "How should fouled separation discs be cleaned?", opts: ["With metal tools to scrape off deposits","By soaking in a suitable solvent then gentle brushing, with no metal tools","By burning them in the incinerator","They never need cleaning"], correct: 1, expl: "Soaking in a solvent (kerosene or hot alkaline solution) dissolves deposits, followed by gentle brushing: metal tools would scratch the surfaces and degrade separation efficiency." },
      { q: "What happens to the sludge tank contents on board?", opts: ["It is discharged directly at sea","It can be burned in small quantities in the incinerator or discharged at a port reception facility","It is stored indefinitely without treatment","It is reinjected directly into the engine"], correct: 1, expl: "MARPOL prohibits sludge discharge at sea: it is either burned in small quantities mixed with HFO or discharged at a port sludge reception facility, tracked in the Oil Record Book." },
      { q: "How can purifier energy consumption be optimised?", opts: ["By permanently maximising flow rate","By maintaining optimal temperature and flow rate and cleaning discs regularly","By disabling sludge ejections","By running the purifier continuously without stopping"], correct: 1, expl: "Optimal temperature and flow, combined with clean discs and a balanced bowl, can reduce a purifier's energy consumption by 30-40% compared to a fouled unit." },
      { q: "A high vibration alarm on a purifier most often indicates:", opts: ["An HFO temperature that is too low","A bowl imbalanced by sludge build-up","Excess sealing water","Insufficient oil pressure"], correct: 1, expl: "Sludge accumulation on one side of the bowl creates an imbalance that shows up as vibration. Ejecting sludge and inspecting bearings are the immediate corrective actions." },
      { q: "What is the Oil Record Book?", opts: ["A simple optional maintenance logbook","A mandatory document tracking all operations involving oil (draining, transfer, discharge)","A classification society certificate renewed every 10 years","The purifier manufacturer's technical manual"], correct: 1, expl: "The Oil Record Book is a mandatory legal document chronologically recording all oil draining, transfer and discharge operations, required by MARPOL Annex I and checked during PSC inspections." },
      { q: "Why is centrifugal separation so much faster than gravity sedimentation?", opts: ["It is not, that is a myth","The force generated is thousands of times greater than gravity, separating in seconds what would take hours","It instantly heats the fluid","It mechanically filters particles"], correct: 1, expl: "Centrifugal force in the bowl (5000 to 10000 times gravity) massively accelerates density-based separation: a particle that would take hours to settle separates in seconds." },
    ],
    quiz: [
      { q: "At what temperature should HFO be heated to optimise purifier separation?", opts: ["40-50 degC", "60-70 degC", "85-98 degC", "110-120 degC"], correct: 2, exp: "HFO must be heated to 85-98 degC to reduce viscosity to 10-20 cSt, enabling effective separation. Below this temperature, viscosity is too high and separation performance drops drastically." },
      { q: "What is the gravity disc in a purifier?", opts: ["A particle filter", "A ring determining the oil-water interface position", "A flow regulator", "A vibration damper"], correct: 1, exp: "The gravity disc is a stainless steel ring creating a weir at the bowl top. Its bore diameter determines the oil-water interface position. Too large a bore allows water into the oil; too small, oil passes into the water." },
      { q: "A purifier has 3 outlets. What are they?", opts: ["Oil, water, air", "Clean oil, water + impurities, sludge", "Hot oil, cold oil, sludge", "Inlet, outlet, recirculation"], correct: 1, exp: "A purifier has 3 outlets: clean oil (main outlet), water with impurities (water effluent), and sludge (periodically ejected through bowl peripheral ports)." },
      { q: "What is the maximum oil content allowed by MARPOL for bilge water discharge at sea?", opts: ["5 ppm", "15 ppm", "100 ppm", "1000 ppm"], correct: 1, exp: "MARPOL Annex I limits oil content of bilge water discharged at sea to 15 ppm maximum (more than 12 nautical miles from coast). Beyond this, or in special areas, discharge is totally prohibited." },
      { q: "What happens if the gravity disc is too large in a purifier?", opts: ["Sludge is not ejected", "Water passes into the oil outlet", "Oil passes into the water outlet", "Bowl speed increases"], correct: 1, exp: "If the gravity disc is too large, the oil-water interface moves too far toward the bowl centre. Water reaches the oil zone and exits with clean oil → water in oil outlet. Solution: replace with smaller bore gravity disc." },
    ],
  },

  es: {
    moduleLabel: "MAQUINAS - AUXILIARES",
    lessonTitle: "Purificadores y Separadores",
    lessonSub:   "HFO, aceite LO, gravity disc, MARPOL OWS",
    intro: "El fuel oil pesado (HFO) contiene agua, sedimentos e impurezas que deben eliminarse antes de la combustion. Los purificadores centrifugos y separadores juegan un papel crucial en la preparacion del combustible y los aceites lubricantes.",
    s1title: "Principio de Separacion Centrifuga",
    s2title: "Componentes de un Purificador",
    s3title: "Parametros de Ajuste",
    s4title: "Fallos y Alarmas",
    s1hint:  "Seleccione un tipo",
    s2hint:  "Toque un componente para su descripcion",
    s3hint:  "Seleccione un parametro",
    s4hint:  "Seleccione un fallo",
    exerciseTitle: "Ejercicios Practicos",
    showAnswer: "Ver correccion",
    hideAnswer: "Ocultar",
    accidentTitle: "CASO REAL: Fraude del bypass 'magic pipe' - M/V Fidelio (2003-2008, USCG/DOJ)",
    accidentBody: "En marzo de 2003, durante una inspeccion de la guardia costera estadounidense en Baltimore, los inspectores descubrieron bajo el suelo de la sala de maquinas del buque portavehiculos M/V Fidelio una tuberia de derivacion permanente (apodada 'magic pipe'), instalada desde la construccion del buque y hallada llena de aceite negro. Esta derivacion permitia evitar completamente el separador de aguas oleosas (OWS) y verter directamente al mar las aguas de sentina contaminadas, una practica usada desde 1998. El registro de hidrocarburos (Oil Record Book) se falsificaba sistematicamente para ocultar estos vertidos, ya que el OWS casi nunca se usaba realmente. Varios jefes de maquinas sucesivos del buque fueron declarados culpables ante la justicia federal estadounidense entre 2007 y 2008 por violar la Act to Prevent Pollution from Ships (APPS) y por declaraciones falsas. El armador, Pacific Gulf Marine, tambien se declaro culpable, reconociendo que se habian vertido ilegalmente cientos de miles de litros de agua contaminada con hidrocarburos desde varios de sus buques.",
    summaryTitle: "Puntos esenciales",
    summary: [
      "La separacion centrifuga usa la diferencia de densidad entre aceite, agua y sedimentos",
      "Un purificador (3 salidas) elimina agua y sedimentos - el clarificador (2 salidas) solo solidos",
      "La temperatura de operacion del HFO debe ser 85-98 degC para reducir la viscosidad",
      "El gravity disc determina la interfaz aceite-agua - eleccion critica segun la densidad del combustible",
      "MARPOL limita los vertidos al mar a 15 ppm - ODMCS obligatorio en buques > 400 GT",
      "Purificar el aceite lubricante multiplica su vida util por 2 a 4",
    ],
    quizCTA: "COMENZAR EL QUIZ",
    bankStart: "COMENZAR =>",
    bankNext: "Siguiente pregunta =>",
    bankTrophy: "Enhorabuena! Banco completado",
    bankScore: "Puntuacion banco",
    sepTypes: {
      purifier:  { name: "Purificador (Purifier)", desc: "Elimina tanto el agua como los sedimentos. Usa un disco de gravedad para mantener la interfaz aceite-agua. Requiere agua de sellado para crear el sello hidraulico. Usado para HFO y aceite lubricante muy contaminados.", outlet: "3 salidas: aceite limpio / agua + impurezas / lodos" },
      clarifier: { name: "Clarificador (Clarifier)", desc: "Elimina solo los sedimentos solidos - no el agua libre. Sin disco de gravedad ni agua de sellado. Usado cuando el combustible tiene poca agua. En la practica: a menudo usado como 2ª etapa despues de un purificador.", outlet: "2 salidas: aceite + agua (juntos) / lodos solidos" },
    },
    components: {
      bowl:            { name: "Cuenco centrifugo (Bowl)", desc: "Pieza principal del purificador. Gira a muy alta velocidad (6000-10000 rpm). Contiene los discos de separacion apilados. La fuerza centrifuga es 5000-10000 veces la gravedad." },
      discs:           { name: "Discos de separacion",    desc: "Discos conicos apilados a 40-45 degres. Aumentan la superficie de separacion. El liquido asciende entre los discos en capas finas. Un cuenco puede contener 100-150 discos." },
      gravity_disc:    { name: "Disco de gravedad",       desc: "Anillo de acero inox que determina la posicion de la interfaz aceite-agua. Demasiado grande → agua en la salida de aceite; demasiado pequeno → aceite en la salida de agua. Se elige segun la densidad del combustible." },
      sealing_water:   { name: "Agua de sellado",         desc: "Agua anadida al inicio para crear el sello hidraulico entre aceite y agua. Sin agua de sellado, el aceite pasaria directamente a la camara de agua. Debe ser dulce y limpia." },
      operating_water: { name: "Agua de maniobra",        desc: "Agua a presion para controlar la apertura y cierre del fondo del cuenco durante las eyecciones de lodos. Alta presion (6-8 bar)." },
      heater:          { name: "Calentador (Heater)",     desc: "Calienta el combustible a la temperatura de operacion (85-98 degC para HFO). Temperatura insuficiente → viscosidad alta → mala separacion. Temperatura excesiva → vaporizacion y riesgo de incendio." },
    },
    parameters: {
      temperature:  { name: "Temperatura de operacion",   desc: "HFO: 85-98 degC. MDO/MGO: 40-50 degC. Aceite lubricante: 85-90 degC. La temperatura reduce la viscosidad mejorando la separacion." },
      flowrate:     { name: "Caudal de alimentacion",     desc: "Demasiado alto → tiempo de residencia corto → mala separacion. Demasiado bajo → riesgo de desbordamiento. Ajustar entre 20-60% de la capacidad nominal." },
      backpressure: { name: "Contrapresion de salida",    desc: "Presion en la salida de aceite (0,1-0,3 bar). Demasiado alta → aceite empujado a camara de agua. Demasiado baja → aspiracion de aire." },
      ejection:     { name: "Intervalo de eyeccion lodos", desc: "Tiempo entre eyecciones automaticas de lodos. Tipico: 30-60 minutos. Intervalo demasiado largo → cuenco sobrecargado → aceite en los lodos." },
    },
    faults: {
      waterinoil: { name: "Agua en la salida de aceite", cause: "Disco de gravedad demasiado grande, caudal muy alto, temperatura baja, agua de sellado insuficiente, discos sucios.", remedy: "Sustituir disco por uno mas pequeno, reducir caudal, aumentar temperatura, verificar agua de sellado, limpiar discos." },
      oilinwater: { name: "Aceite en la salida de agua",  cause: "Disco de gravedad demasiado pequeno, sello hidraulico roto, caudal demasiado bajo.", remedy: "Sustituir disco por uno mas grande, verificar y restaurar agua de sellado, aumentar caudal." },
      vibration:  { name: "Vibraciones excesivas",        cause: "Cuenco desequilibrado (acumulacion de lodos), rodamientos desgastados, velocidad anormal.", remedy: "Eyectar los lodos, limpiar y equilibrar el cuenco, sustituir rodamientos." },
      hightemp:   { name: "Temperatura de salida muy alta", cause: "Valvula de vapor bloqueada abierta, fallo del regulador de temperatura, sobrecalentamiento.", remedy: "Ajustar la valvula de vapor, verificar termometro y regulador, controlar la presion de vapor." },
    },
    exercises: [
      { q: "Explique el principio de funcionamiento de un purificador centrifugo para HFO. Por que la fuerza centrifuga es tan eficaz?", a: "Un purificador centrifugo hace girar el combustible a muy alta velocidad en un cuenco. La fuerza centrifuga generada (5000-10000 veces la gravedad) separa los componentes segun su densidad: los solidos se proyectan contra la pared exterior, el agua queda fuera de los discos, el aceite asciende al centro. La fuerza centrifuga es miles de veces mas potente que la gravedad. Los discos apilados a 45 degres dividen el flujo en capas finas, multiplicando la superficie de separacion." },
      { q: "Como elegir el disco de gravedad correcto para un purificador de HFO?", a: "El disco de gravedad se elige segun la densidad del combustible. Principio: a mayor densidad del HFO, menor debe ser el diametro interior del disco. Metodo: 1. Medir densidad a 15 degC. 2. Medir temperatura de operacion. 3. Consultar tabla de seleccion del fabricante. 4. Arrancar y verificar. Si agua sale con aceite → disco demasiado grande. Si aceite sale con agua → disco demasiado pequeno." },
      { q: "Que es el agua de sellado en un purificador y que sucede si desaparece durante la operacion?", a: "El agua de sellado crea el sello hidraulico entre las camaras de aceite y agua. Sin ella, el aceite pasaria directamente a la camara de agua. Si desaparece: la interfaz aceite-agua se rompe, el aceite invade la camara de agua, la salida de agua se carga en aceite. Causas: caudal demasiado alto, temperatura baja, eyeccion accidental. Remedio: parar la alimentacion y reiniciar el sello hidraulico." },
    ],
    bankQuestions: [
      { q: "Cual es la principal diferencia entre un purificador y un clarificador?", opts: ["El purificador elimina agua Y sedimentos gracias a un disco de gravedad, el clarificador solo elimina sedimentos","El clarificador siempre es mas rapido que el purificador","El purificador solo tiene 2 salidas","Ninguna diferencia funcional entre ambos"], correct: 0, expl: "El purificador usa disco de gravedad y agua de sellado para separar agua y sedimentos (3 salidas: aceite limpio, agua, lodos). El clarificador, sin disco de gravedad, elimina solo sedimentos solidos (2 salidas)." },
      { q: "Por que se calienta el HFO a 85-98 degC antes del purificador?", opts: ["Para aumentar su densidad","Para reducir su viscosidad y mejorar la separacion","Para esterilizarlo","Para evitar la corrosion del cuenco"], correct: 1, expl: "A 50 degC el HFO puede tener una viscosidad de 700 cSt; a 95 degC cae a 10-20 cSt. Un fluido menos viscoso se separa mucho mejor en el cuenco centrifugo." },
      { q: "Como se activa la eyeccion de lodos en un purificador?", opts: ["Solo por apertura manual, nunca automatica","Introduciendo agua de maniobra a presion (6 a 8 bar) que abre el fondo del cuenco","Parando completamente el motor","Aumentando la temperatura del HFO"], correct: 1, expl: "El agua de maniobra a alta presion empuja el piston de fondo hacia abajo, abriendo orificios perifericos que eyectan centrifugamente lodos y agua en segundos." },
      { q: "Cual es la funcion del disco de gravedad en un purificador?", opts: ["Filtrar particulas solidas","Determinar la posicion de la interfaz aceite-agua segun su diametro","Calentar el combustible","Lubricar los rodamientos del cuenco"], correct: 1, expl: "El disco de gravedad, anillo de acero inoxidable en la parte superior del cuenco, crea un vertedero cuyo diametro interior fija la posicion de la interfaz aceite-agua." },
      { q: "Que ocurre si el disco de gravedad es demasiado grande para la densidad del combustible?", opts: ["Sale aceite con el agua","Entra agua en la salida de aceite","El cuenco se para automaticamente","Ningun efecto notable"], correct: 1, expl: "Un disco demasiado grande desplaza la interfaz demasiado hacia el centro: el agua penetra en la zona de aceite, contaminando la salida de aceite." },
      { q: "Que paso es esencial antes de arrancar un purificador?", opts: ["Vaciar completamente el agua de sellado del cuenco","Introducir agua de sellado para crear el cierre hidraulico","Desactivar la alarma de temperatura","Retirar los discos de separacion"], correct: 1, expl: "Sin agua de sellado no se forma ningun cierre hidraulico entre las camaras de aceite y agua: el aceite pasaria directamente a la camara de agua desde el arranque." },
      { q: "Cual es la consecuencia de una perdida de agua de sellado durante la operacion?", opts: ["Una mejora de la separacion","El aceite pasa a la camara de agua, causando perdidas importantes","Una parada automatica sin consecuencias","Un aumento de la temperatura del cuenco"], correct: 1, expl: "La perdida de agua de sellado rompe la interfaz aceite-agua: el aceite invade la camara de agua y la salida de agua queda cargada de aceite, causando perdidas de combustible." },
      { q: "Segun MARPOL Anexo I, cual es el contenido maximo de hidrocarburos permitido para vertidos de agua de sentina al mar?", opts: ["5 ppm","15 ppm","50 ppm","100 ppm"], correct: 1, expl: "MARPOL Anexo I fija el limite en 15 ppm de hidrocarburos para cualquier vertido en el mar, con restricciones adicionales en zonas especiales (Mediterraneo, Baltico, Mar Rojo)." },
      { q: "Que dispositivo obligatorio vigila continuamente el contenido de aceite de los efluentes y activa una alarma/parada si se supera el limite?", opts: ["El disco de gravedad","El ODMCS (Oil Discharge Monitoring and Control System)","El calentador","La bomba de agua de maniobra"], correct: 1, expl: "El ODMCS vigila continuamente el contenido de aceite de los vertidos y activa automaticamente una alarma y la parada del vertido si se supera el limite de 15 ppm." },
      { q: "Como se deben limpiar los discos de separacion sucios?", opts: ["Con herramientas metalicas para raspar los depositos","Remojandolos en un disolvente adecuado y cepillado suave, sin herramientas metalicas","Quemandolos en el incinerador","Nunca es necesario limpiarlos"], correct: 1, expl: "El remojo en un disolvente (queroseno o solucion alcalina caliente) disuelve los depositos, seguido de cepillado suave: las herramientas metalicas rayarian las superficies." },
      { q: "Que sucede con el contenido del sludge tank a bordo?", opts: ["Se vierte directamente al mar","Puede quemarse en pequenas cantidades en el incinerador o descargarse en una instalacion portuaria","Se almacena indefinidamente sin tratamiento","Se reinyecta directamente en el motor"], correct: 1, expl: "MARPOL prohibe verter lodos al mar: se queman en pequenas cantidades mezclados con HFO o se descargan en una instalacion portuaria, registrados en el Oil Record Book." },
      { q: "Como optimizar el consumo energetico de un purificador?", opts: ["Aumentando el caudal al maximo permanentemente","Manteniendo temperatura y caudal optimos y limpiando regularmente los discos","Desactivando las eyecciones de lodos","Haciendo funcionar el purificador continuamente sin parar"], correct: 1, expl: "Una temperatura y caudal optimos, junto con discos limpios y un cuenco equilibrado, permiten reducir el consumo de un purificador un 30 a 40% respecto a uno sucio." },
      { q: "Una alarma de vibraciones altas en un purificador suele indicar:", opts: ["Una temperatura del HFO demasiado baja","Un cuenco desequilibrado por acumulacion de lodos","Un exceso de agua de sellado","Una presion de aceite demasiado baja"], correct: 1, expl: "La acumulacion de lodos en un lado del cuenco crea un desequilibrio que se traduce en vibraciones. Eyectar los lodos e inspeccionar los rodamientos son las acciones correctivas inmediatas." },
      { q: "Que es el registro de hidrocarburos (Oil Record Book)?", opts: ["Un simple cuaderno de mantenimiento opcional","Un documento obligatorio que registra todas las operaciones con hidrocarburos (purga, transferencia, vertido)","Un certificado de la sociedad de clasificacion renovado cada 10 anos","Un manual tecnico del fabricante del purificador"], correct: 1, expl: "El Oil Record Book es un documento legal obligatorio que registra cronologicamente todas las operaciones de purga, transferencia y vertido de hidrocarburos, exigido por MARPOL Anexo I." },
      { q: "Por que la separacion por fuerza centrifuga es tan rapida comparada con la sedimentacion por gravedad?", opts: ["No lo es, es un mito","La fuerza generada es miles de veces superior a la gravedad, separando en segundos lo que tardaria horas","Calienta el fluido instantaneamente","Filtra mecanicamente las particulas"], correct: 1, expl: "La fuerza centrifuga en el cuenco (5000 a 10000 veces la gravedad) acelera enormemente la separacion por densidad: una particula que sedimentaria en horas se separa en segundos." },
    ],
    quiz: [
      { q: "A que temperatura hay que calentar el HFO para optimizar la separacion en un purificador?", opts: ["40-50 degC", "60-70 degC", "85-98 degC", "110-120 degC"], correct: 2, exp: "El HFO debe calentarse a 85-98 degC para reducir su viscosidad a 10-20 cSt. Por debajo de esta temperatura, la viscosidad es demasiado alta y el rendimiento de separacion cae drasticamente." },
      { q: "Que es el disco de gravedad en un purificador?", opts: ["Un filtro de particulas", "Un anillo que determina la posicion de la interfaz aceite-agua", "Un regulador de caudal", "Un amortiguador de vibraciones"], correct: 1, exp: "El disco de gravedad es un anillo de acero inox que crea un vertedero en el cuenco. Su diametro interior determina la posicion de la interfaz aceite-agua." },
      { q: "Un purificador tiene 3 salidas. Cuales son?", opts: ["Aceite, agua, aire", "Aceite limpio, agua + impurezas, lodos", "Aceite caliente, aceite frio, lodos", "Entrada, salida, recirculacion"], correct: 1, exp: "Un purificador tiene 3 salidas: aceite limpio (salida principal), agua con impurezas (efluente agua) y lodos (eyectados periodicamente por los orificios perifericos del cuenco)." },
      { q: "Cual es el contenido maximo de aceite permitido por MARPOL para el vertido de aguas de sentina al mar?", opts: ["5 ppm", "15 ppm", "100 ppm", "1000 ppm"], correct: 1, exp: "MARPOL Anexo I limita el contenido de aceite de las aguas de sentina a 15 ppm maximo (a mas de 12 millas nauticas de la costa). En zonas especiales, el vertido esta totalmente prohibido." },
      { q: "Que ocurre si el disco de gravedad es demasiado grande?", opts: ["Los lodos no se eyectan", "El agua pasa a la salida de aceite", "El aceite pasa a la salida de agua", "La velocidad del cuenco aumenta"], correct: 1, exp: "Si el disco de gravedad es demasiado grande, la interfaz aceite-agua se desplaza demasiado hacia el centro. El agua llega a la zona de aceite y sale con el aceite limpio → agua en la salida de aceite." },
    ],
  },

  pt: {
    moduleLabel: "MAQUINAS - AUXILIARES",
    lessonTitle: "Purificadores e Separadores",
    lessonSub:   "HFO, oleo LO, gravity disc, MARPOL OWS",
    intro: "O fuel oil pesado (HFO) contem agua, sedimentos e impurezas que devem ser eliminados antes da combustao. Os purificadores centrifugos e separadores desempenham um papel crucial na preparacao do combustivel e dos oleos lubrificantes.",
    s1title: "Principio de Separacao Centrifuga",
    s2title: "Componentes de um Purificador",
    s3title: "Parametros de Regulacao",
    s4title: "Avarias e Alarmes",
    s1hint:  "Selecione um tipo",
    s2hint:  "Toque num componente para a descricao",
    s3hint:  "Selecione um parametro",
    s4hint:  "Selecione uma avaria",
    exerciseTitle: "Exercicios Praticos",
    showAnswer: "Ver correcao",
    hideAnswer: "Ocultar",
    accidentTitle: "CASO REAL: Fraude do bypass 'magic pipe' - M/V Fidelio (2003-2008, USCG/DOJ)",
    accidentBody: "Em marco de 2003, durante uma inspecao da guarda costeira americana em Baltimore, os inspetores descobriram sob o piso da casa de maquinas do navio porta-veiculos M/V Fidelio uma tubagem de derivacao permanente (apelidada de 'magic pipe'), instalada desde a construcao do navio e encontrada cheia de oleo negro. Esta derivacao permitia contornar completamente o separador de aguas oleosas (OWS) e descarregar diretamente no mar as aguas de sentina contaminadas, uma pratica usada desde 1998. O registo de hidrocarbonetos (Oil Record Book) era sistematicamente falsificado para ocultar estas descargas, ja que o OWS quase nunca era realmente usado. Varios chefes de maquinas sucessivos do navio foram considerados culpados perante a justica federal americana entre 2007 e 2008 por violacao do Act to Prevent Pollution from Ships (APPS) e falsas declaracoes. O armador, Pacific Gulf Marine, tambem se declarou culpado, reconhecendo que centenas de milhares de litros de agua contaminada com hidrocarbonetos tinham sido descarregados ilegalmente a partir de varios dos seus navios.",
    summaryTitle: "Pontos essenciais",
    summary: [
      "A separacao centrifuga usa a diferenca de densidade entre oleo, agua e sedimentos",
      "Um purificador (3 saidas) elimina agua e sedimentos - o clarificador (2 saidas) so solidos",
      "A temperatura de operacao do HFO deve ser 85-98 degC para reduzir a viscosidade",
      "O gravity disc determina a interface oleo-agua - escolha critica conforme a densidade do combustivel",
      "MARPOL limita as descargas no mar a 15 ppm - ODMCS obrigatorio em navios > 400 GT",
      "Purificar o oleo lubrificante multiplica a sua vida util por 2 a 4",
    ],
    quizCTA: "COMECAR O QUIZ",
    bankStart: "COMECAR =>",
    bankNext: "Proxima pergunta =>",
    bankTrophy: "Parabens! Banco concluido",
    bankScore: "Pontuacao banco",
    sepTypes: {
      purifier:  { name: "Purificador", desc: "Elimina tanto a agua como os sedimentos. Usa um disco de gravidade para manter a interface oleo-agua. Requer agua de vedacao para criar o selo hidraulico. Usado para HFO e oleo lubrificante muito contaminados.", outlet: "3 saidas: oleo limpo / agua + impurezas / lamas" },
      clarifier: { name: "Clarificador", desc: "Elimina apenas os sedimentos solidos - nao a agua livre. Sem disco de gravidade nem agua de vedacao. Usado quando o combustivel tem pouca agua. Na pratica: usado como 2ª fase apos um purificador.", outlet: "2 saidas: oleo + agua (juntos) / lamas solidas" },
    },
    components: {
      bowl:            { name: "Tigela centrifuga (Bowl)", desc: "Peca principal do purificador. Roda a muito alta velocidade (6000-10000 rpm). Contem os discos de separacao empilhados. A forca centrifuga e 5000-10000 vezes a gravidade." },
      discs:           { name: "Discos de separacao",     desc: "Discos conicos empilhados a 40-45 degres. Aumentam a superficie de separacao. O liquido sobe entre os discos em camadas finas. Uma tigela pode ter 100-150 discos." },
      gravity_disc:    { name: "Disco de gravidade",      desc: "Anel de aco inox que determina a posicao da interface oleo-agua. Muito grande → agua na saida de oleo; muito pequeno → oleo na saida de agua. Escolhido conforme a densidade do combustivel." },
      sealing_water:   { name: "Agua de vedacao",         desc: "Agua adicionada no inicio para criar o selo hidraulico entre oleo e agua. Sem agua de vedacao, o oleo passaria diretamente para a camara de agua. Deve ser doce e limpa." },
      operating_water: { name: "Agua de manobra",         desc: "Agua sob pressao para controlar a abertura e fecho do fundo da tigela durante as ejecoes de lamas. Alta pressao (6-8 bar)." },
      heater:          { name: "Aquecedor (Heater)",      desc: "Aquece o combustivel a temperatura de operacao (85-98 degC para HFO). Temperatura insuficiente → viscosidade alta → ma separacao. Temperatura excessiva → vaporizacao e risco de incendio." },
    },
    parameters: {
      temperature:  { name: "Temperatura de operacao",    desc: "HFO: 85-98 degC. MDO/MGO: 40-50 degC. Oleo lubrificante: 85-90 degC. A temperatura reduz a viscosidade melhorando a separacao." },
      flowrate:     { name: "Caudal de alimentacao",      desc: "Demasiado alto → tempo de permanencia curto → ma separacao. Demasiado baixo → risco de transbordo. Ajustar entre 20-60% da capacidade nominal." },
      backpressure: { name: "Contrapressao de saida",     desc: "Pressao na saida de oleo (0,1-0,3 bar). Demasiado alta → oleo empurrado para camara de agua. Demasiado baixa → aspiracao de ar." },
      ejection:     { name: "Intervalo de ejecao lamas",  desc: "Tempo entre ejecoes automaticas de lamas. Tipico: 30-60 minutos. Intervalo demasiado longo → tigela sobrecarregada → oleo nas lamas." },
    },
    faults: {
      waterinoil: { name: "Agua na saida de oleo",      cause: "Disco de gravidade muito grande, caudal muito alto, temperatura baixa, agua de vedacao insuficiente, discos sujos.", remedy: "Substituir disco por um mais pequeno, reduzir caudal, aumentar temperatura, verificar agua de vedacao, limpar discos." },
      oilinwater: { name: "Oleo na saida de agua",      cause: "Disco de gravidade muito pequeno, selo hidraulico rompido, caudal muito baixo.", remedy: "Substituir disco por um maior, verificar e restaurar agua de vedacao, aumentar caudal." },
      vibration:  { name: "Vibracoes excessivas",       cause: "Tigela desequilibrada (acumulacao de lamas), rolamentos desgastados, velocidade anormal.", remedy: "Ejetar as lamas, limpar e equilibrar a tigela, substituir rolamentos." },
      hightemp:   { name: "Temperatura de saida muito alta", cause: "Valvula de vapor bloqueada aberta, falha do regulador de temperatura, sobreaquecimento.", remedy: "Ajustar a valvula de vapor, verificar termometro e regulador, controlar pressao de vapor." },
    },
    exercises: [
      { q: "Explique o principio de funcionamento de um purificador centrifugo para HFO. Por que a forca centrifuga e tao eficaz?", a: "Um purificador centrifugo faz rodar o combustivel a muito alta velocidade numa tigela. A forca centrifuga gerada (5000-10000 vezes a gravidade) separa os componentes por densidade: os solidos sao projetados para a parede exterior, a agua deposita-se fora dos discos, o oleo sobe ao centro. A forca centrifuga e milhares de vezes mais poderosa que a gravidade. Os discos empilhados a 45 degres dividem o fluxo em camadas finas, multiplicando a superficie de separacao." },
      { q: "Como escolher o disco de gravidade correto para um purificador de HFO?", a: "O disco de gravidade e escolhido conforme a densidade do combustivel. Principio: quanto maior a densidade do HFO, menor deve ser o diametro interior. Metodo: 1. Medir densidade a 15 degC. 2. Medir temperatura de operacao. 3. Consultar tabela do fabricante. 4. Arrancar e verificar. Se agua sai com oleo → disco muito grande. Se oleo sai com agua → disco muito pequeno." },
      { q: "O que e a agua de vedacao num purificador e o que acontece se desaparecer durante a operacao?", a: "A agua de vedacao cria o selo hidraulico entre as camaras de oleo e agua. Sem ela, o oleo passaria diretamente para a camara de agua. Se desaparecer: a interface oleo-agua rompe-se, o oleo invade a camara de agua, a saida de agua fica carregada de oleo. Causas: caudal muito alto, temperatura baixa, ejecao acidental. Remedio: parar a alimentacao e reiniciar o selo hidraulico." },
    ],
    bankQuestions: [
      { q: "Qual e a principal diferenca entre um purificador e um clarificador?", opts: ["O purificador elimina agua E sedimentos gracas a um disco de gravidade, o clarificador elimina apenas sedimentos","O clarificador e sempre mais rapido que o purificador","O purificador tem apenas 2 saidas","Nenhuma diferenca funcional entre os dois"], correct: 0, expl: "O purificador usa disco de gravidade e agua de vedacao para separar agua e sedimentos (3 saidas: oleo limpo, agua, lamas). O clarificador, sem disco de gravidade, elimina apenas sedimentos solidos (2 saidas)." },
      { q: "Por que se aquece o HFO a 85-98 degC antes do purificador?", opts: ["Para aumentar a sua densidade","Para reduzir a sua viscosidade e melhorar a separacao","Para esteriliza-lo","Para evitar a corrosao da tigela"], correct: 1, expl: "A 50 degC o HFO pode ter uma viscosidade de 700 cSt; a 95 degC cai para 10-20 cSt. Um fluido menos viscoso separa-se muito melhor na tigela centrifuga." },
      { q: "Como se aciona a ejecao de lamas num purificador?", opts: ["Apenas por abertura manual, nunca automatica","Introduzindo agua de manobra sob pressao (6 a 8 bar) que abre o fundo da tigela","Parando completamente o motor","Aumentando a temperatura do HFO"], correct: 1, expl: "A agua de manobra a alta pressao empurra o pistao do fundo para baixo, abrindo orificios perifericos que ejetam centrifugamente lamas e agua em segundos." },
      { q: "Qual e a funcao do disco de gravidade num purificador?", opts: ["Filtrar particulas solidas","Determinar a posicao da interface oleo-agua conforme o seu diametro","Aquecer o combustivel","Lubrificar os rolamentos da tigela"], correct: 1, expl: "O disco de gravidade, anel de aco inoxidavel no topo da tigela, cria um vertedouro cujo diametro interior fixa a posicao da interface oleo-agua." },
      { q: "O que acontece se o disco de gravidade for demasiado grande para a densidade do combustivel?", opts: ["Sai oleo com a agua","Entra agua na saida de oleo","A tigela para automaticamente","Nenhum efeito notavel"], correct: 1, expl: "Um disco demasiado grande desloca a interface demasiado para o centro: a agua penetra na zona de oleo, contaminando a saida de oleo." },
      { q: "Que etapa e essencial antes de arrancar um purificador?", opts: ["Esvaziar completamente a agua de vedacao da tigela","Introduzir agua de vedacao para criar a vedacao hidraulica","Desativar o alarme de temperatura","Retirar os discos de separacao"], correct: 1, expl: "Sem agua de vedacao nao se forma nenhuma vedacao hidraulica entre as camaras de oleo e agua: o oleo passaria diretamente para a camara de agua desde o arranque." },
      { q: "Qual e a consequencia de uma perda de agua de vedacao durante a operacao?", opts: ["Uma melhoria da separacao","O oleo passa para a camara de agua, causando perdas importantes","Uma paragem automatica sem consequencias","Um aumento da temperatura da tigela"], correct: 1, expl: "A perda de agua de vedacao quebra a interface oleo-agua: o oleo invade a camara de agua e a saida de agua fica carregada de oleo, causando perdas de combustivel." },
      { q: "Segundo a MARPOL Anexo I, qual e o teor maximo de hidrocarbonetos permitido para descargas de agua de sentina no mar?", opts: ["5 ppm","15 ppm","50 ppm","100 ppm"], correct: 1, expl: "A MARPOL Anexo I fixa o limite em 15 ppm de hidrocarbonetos para qualquer descarga no mar, com restricoes adicionais em zonas especiais (Mediterraneo, Baltico, Mar Vermelho)." },
      { q: "Que dispositivo obrigatorio monitoriza continuamente o teor de oleo dos efluentes e aciona um alarme/paragem se ultrapassado?", opts: ["O disco de gravidade","O ODMCS (Oil Discharge Monitoring and Control System)","O aquecedor","A bomba de agua de manobra"], correct: 1, expl: "O ODMCS monitoriza continuamente o teor de oleo das descargas e aciona automaticamente um alarme e a paragem da descarga se o limite de 15 ppm for ultrapassado." },
      { q: "Como devem ser limpos os discos de separacao sujos?", opts: ["Com ferramentas metalicas para raspar os depositos","Por imersao num solvente adequado seguida de escovagem suave, sem ferramentas metalicas","Queimando-os no incinerador","Nunca e necessario limpa-los"], correct: 1, expl: "A imersao num solvente (querosene ou solucao alcalina quente) dissolve os depositos, seguida de escovagem suave: ferramentas metalicas riscariam as superficies." },
      { q: "O que acontece ao conteudo do sludge tank a bordo?", opts: ["E descarregado diretamente no mar","Pode ser queimado em pequenas quantidades no incinerador ou descarregado numa instalacao portuaria","E armazenado indefinidamente sem tratamento","E reinjetado diretamente no motor"], correct: 1, expl: "A MARPOL proibe a descarga de lamas no mar: sao queimadas em pequenas quantidades misturadas com HFO ou descarregadas numa instalacao portuaria, registadas no Oil Record Book." },
      { q: "Como otimizar o consumo energetico de um purificador?", opts: ["Aumentando o caudal ao maximo permanentemente","Mantendo temperatura e caudal otimos e limpando regularmente os discos","Desativando as ejecoes de lamas","Fazendo funcionar o purificador continuamente sem parar"], correct: 1, expl: "Uma temperatura e caudal otimos, combinados com discos limpos e uma tigela equilibrada, permitem reduzir o consumo de um purificador em 30 a 40% face a um aparelho sujo." },
      { q: "Um alarme de vibracoes elevadas num purificador indica geralmente:", opts: ["Uma temperatura do HFO demasiado baixa","Uma tigela desequilibrada por acumulacao de lamas","Um excesso de agua de vedacao","Uma pressao de oleo demasiado baixa"], correct: 1, expl: "A acumulacao de lamas de um lado da tigela cria um desequilibrio que se traduz em vibracoes. Ejetar as lamas e inspecionar os rolamentos sao as acoes corretivas imediatas." },
      { q: "O que e o registo de hidrocarbonetos (Oil Record Book)?", opts: ["Um simples caderno de manutencao facultativo","Um documento obrigatorio que regista todas as operacoes com hidrocarbonetos (purga, transferencia, descarga)","Um certificado da sociedade classificadora renovado a cada 10 anos","Um manual tecnico do fabricante do purificador"], correct: 1, expl: "O Oil Record Book e um documento legal obrigatorio que regista cronologicamente todas as operacoes de purga, transferencia e descarga de hidrocarbonetos, exigido pela MARPOL Anexo I." },
      { q: "Por que a separacao por forca centrifuga e tao mais rapida que a sedimentacao por gravidade?", opts: ["Nao e, e um mito","A forca gerada e milhares de vezes superior a gravidade, separando em segundos o que levaria horas","Aquece o fluido instantaneamente","Filtra mecanicamente as particulas"], correct: 1, expl: "A forca centrifuga na tigela (5000 a 10000 vezes a gravidade) acelera enormemente a separacao por densidade: uma particula que sedimentaria em horas separa-se em segundos." },
    ],
    quiz: [
      { q: "A que temperatura deve ser aquecido o HFO para otimizar a separacao num purificador?", opts: ["40-50 degC", "60-70 degC", "85-98 degC", "110-120 degC"], correct: 2, exp: "O HFO deve ser aquecido a 85-98 degC para reduzir a viscosidade a 10-20 cSt. Abaixo desta temperatura, a viscosidade e demasiado alta e o desempenho de separacao cai drasticamente." },
      { q: "O que e o disco de gravidade num purificador?", opts: ["Um filtro de particulas", "Um anel que determina a posicao da interface oleo-agua", "Um regulador de caudal", "Um amortecedor de vibracoes"], correct: 1, exp: "O disco de gravidade e um anel de aco inox que cria um descarregador na tigela. O seu diametro interior determina a posicao da interface oleo-agua." },
      { q: "Um purificador tem 3 saidas. Quais sao?", opts: ["Oleo, agua, ar", "Oleo limpo, agua + impurezas, lamas", "Oleo quente, oleo frio, lamas", "Entrada, saida, recirculacao"], correct: 1, exp: "Um purificador tem 3 saidas: oleo limpo (saida principal), agua com impurezas (efluente agua) e lamas (ejetadas periodicamente pelos orificios perifericos da tigela)." },
      { q: "Qual e o teor maximo de oleo permitido pelo MARPOL para a descarga de aguas de sentina no mar?", opts: ["5 ppm", "15 ppm", "100 ppm", "1000 ppm"], correct: 1, exp: "O MARPOL Anexo I limita o teor de oleo das aguas de sentina a 15 ppm maximo (a mais de 12 milhas nauticas da costa). Nas zonas especiais, a descarga e totalmente proibida." },
      { q: "O que acontece se o disco de gravidade for demasiado grande?", opts: ["As lamas nao sao ejetadas", "A agua passa para a saida de oleo", "O oleo passa para a saida de agua", "A velocidade da tigela aumenta"], correct: 1, exp: "Se o disco de gravidade for demasiado grande, a interface oleo-agua desloca-se demasiado para o centro. A agua atinge a zona de oleo e sai com o oleo limpo → agua na saida de oleo." },
    ],
  },
};

// ── SVG 1 - SEPARATION TYPES ─────────────────────────────────
function SepTypesSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string>("purifier");
  const types = t.sepTypes;
  const typeColors: Record<string,string> = { purifier: C.purple, clarifier: C.cyan };

  const svgs: Record<string, React.ReactNode> = {
    purifier: (
      <g>
        <ellipse cx="80" cy="82" rx="56" ry="66" fill={C.purple} opacity={0.08} stroke={C.purple} strokeWidth="1.5"/>
        {[55,65,75,85,95].map((y,i)=>(
          <line key={i} x1={80-36+i*2} y1={y} x2={80+36-i*2} y2={y} stroke={C.purple} strokeWidth="1.5" opacity={0.5}/>
        ))}
        <ellipse cx="80" cy="72" rx="18" ry="42" fill={C.amber} opacity={0.28}/>
        <text x="80" y="74" fontSize="7" fill={C.amber} fontFamily="Courier New" textAnchor="middle">OIL</text>
        <text x="118" y="88" fontSize="7" fill={C.teal} fontFamily="Courier New">H2O</text>
        <ellipse cx="80" cy="141" rx="36" ry="8" fill={C.dim} opacity={0.4}/>
        <text x="80" y="144" fontSize="6" fill={C.dim} fontFamily="Courier New" textAnchor="middle">SLUDGE</text>
        <ellipse cx="80" cy="30" rx="22" ry="5" fill="none" stroke={C.purple} strokeWidth="2"/>
        <text x="80" y="22" fontSize="6" fill={C.purple} fontFamily="Courier New" textAnchor="middle">GRAVITY DISC</text>
        <line x1="80" y1="16" x2="80" y2="5" stroke={C.amber} strokeWidth="2"/>
        <polygon points="80,2 76,10 84,10" fill={C.amber}/>
        <text x="80" y="1" fontSize="5" fill={C.amber} fontFamily="Courier New" textAnchor="middle">CLEAN OIL</text>
        <line x1="136" y1="82" x2="153" y2="82" stroke={C.teal} strokeWidth="2"/>
        <polygon points="159,82 151,78 151,86" fill={C.teal}/>
        <text x="155" y="79" fontSize="5" fill={C.teal} fontFamily="Courier New">WATER</text>
        <text x="80" y="162" fontSize="7" fill={C.purple} fontFamily="Courier New" textAnchor="middle">PURIFIER - 3 OUTLETS</text>
      </g>
    ),
    clarifier: (
      <g>
        <ellipse cx="80" cy="82" rx="56" ry="66" fill={C.cyan} opacity={0.08} stroke={C.cyan} strokeWidth="1.5"/>
        {[55,65,75,85,95].map((y,i)=>(
          <line key={i} x1={80-36+i*2} y1={y} x2={80+36-i*2} y2={y} stroke={C.cyan} strokeWidth="1.5" opacity={0.5}/>
        ))}
        <ellipse cx="80" cy="72" rx="42" ry="40" fill={C.cyan} opacity={0.14}/>
        <text x="80" y="68" fontSize="7" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">OIL + H2O</text>
        <text x="80" y="80" fontSize="6" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">(together)</text>
        <ellipse cx="80" cy="141" rx="36" ry="8" fill={C.dim} opacity={0.4}/>
        <text x="80" y="144" fontSize="6" fill={C.dim} fontFamily="Courier New" textAnchor="middle">SLUDGE ONLY</text>
        <text x="80" y="22" fontSize="6" fill="rgba(240,244,255,0.25)" fontFamily="Courier New" textAnchor="middle">NO GRAVITY DISC</text>
        <line x1="80" y1="16" x2="80" y2="5" stroke={C.cyan} strokeWidth="2"/>
        <polygon points="80,2 76,10 84,10" fill={C.cyan}/>
        <text x="80" y="1" fontSize="5" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">OIL+WATER</text>
        <text x="80" y="162" fontSize="7" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">CLARIFIER - 2 OUTLETS</text>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.purple}33`}}>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {Object.entries(types).map(([key]:any)=>{
          const col=typeColors[key]||C.purple;
          return(<button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:11,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New",textAlign:"center",fontWeight:sel===key?700:400}}>{key==="purifier"?"PURIFIER":"CLARIFIER"}</button>);
        })}
      </div>
      <svg viewBox="0 0 160 170" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto",background:`${C.navy3}55`,borderRadius:8}}>
        {svgs[sel]}
      </svg>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${typeColors[sel]||C.purple}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{types[sel]?.name}</div>
        <div style={{marginBottom:6}}>{types[sel]?.desc}</div>
        <div style={{fontSize:10,color:typeColors[sel],fontWeight:700}}>{types[sel]?.outlet}</div>
      </div>
    </div>
  );
}

// ── SVG 2 - COMPONENTS ───────────────────────────────────────
function ComponentsSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const comps = t.components;
  const compColors: Record<string,string> = {
    bowl:C.purple, discs:C.cyan, gravity_disc:C.amber,
    sealing_water:C.teal, operating_water:C.blue, heater:C.warn,
  };
  const compLabels: Record<string,string> = {
    bowl:"BOWL", discs:"DISCS", gravity_disc:"G.DISC",
    sealing_water:"SEAL.W", operating_water:"OP.W", heater:"HEATER",
  };
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.cyan}33`}}>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {Object.entries(comps).map(([key]:any)=>{const col=compColors[key]||C.cyan;return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"4px 8px",borderRadius:8,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{compLabels[key]||key}</button>);}) }
      </div>
      {sel&&(<div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${compColors[sel]||C.cyan}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}><div style={{color:C.cyan,fontWeight:700,marginBottom:4}}>{comps[sel]?.name}</div>{comps[sel]?.desc}</div>)}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)",padding:20}}>{t.s2hint}</div>}
    </div>
  );
}

// ── SVG 3 - PARAMETERS ───────────────────────────────────────
function ParametersSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string>("temperature");
  const params = t.parameters;
  const paramColors: Record<string,string> = { temperature:C.warn, flowrate:C.cyan, backpressure:C.purple, ejection:C.amber };
  const icons: Record<string,string> = { temperature:"🌡️", flowrate:"💧", backpressure:"📊", ejection:"⏱️" };
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.amber}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(params).map(([key]:any)=>{const col=paramColors[key]||C.amber;return(<button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:10,cursor:"pointer",background:sel===key?`${col}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`,color:sel===key?col:"rgba(240,244,255,0.45)",fontFamily:"Courier New",textAlign:"center"}}><div style={{fontSize:16}}>{icons[key]}</div></button>);}) }
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${paramColors[sel]||C.amber}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:paramColors[sel]||C.amber,fontWeight:700,marginBottom:8}}>{icons[sel]} {params[sel]?.name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New"}}>{params[sel]?.desc}</div>
      </div>
    </div>
  );
}

// ── SVG 4 - FAULTS ───────────────────────────────────────────
function FaultsSVG({ lang }: { lang: string }) {
  const t = T[lang] || T.fr;
  const [sel, setSel] = useState<string | null>(null);
  const faults = t.faults;
  const faultColors: Record<string,string> = { waterinoil:C.teal, oilinwater:C.amber, vibration:C.purple, hightemp:C.red };
  const faultIcons: Record<string,string> = { waterinoil:"💧", oilinwater:"🛢️", vibration:"📳", hightemp:"🌡️" };
  const causeLabel={fr:"Cause",en:"Cause",es:"Causa",pt:"Causa"}[lang]||"Cause";
  const remedyLabel={fr:"Remede",en:"Remedy",es:"Remedio",pt:"Remedio"}[lang]||"Remedy";
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.red}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {Object.entries(faults).map(([key,val]:any)=>{const col=faultColors[key]||C.red;return(<button key={key} onClick={()=>setSel(sel===key?null:key)} style={{padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",background:sel===key?`${col}18`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?col:"rgba(255,255,255,0.1)"}`}}><div style={{fontSize:16,marginBottom:4}}>{faultIcons[key]}</div><div style={{fontSize:11,fontWeight:700,color:C.white,fontFamily:"Courier New",lineHeight:1.4}}>{val.name}</div></button>);}) }
      </div>
      {sel&&(<div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${faultColors[sel]||C.red}44`,fontSize:12,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}><div style={{color:C.warn,fontWeight:700,marginBottom:4}}>⚠️ {causeLabel}</div><div style={{marginBottom:8}}>{faults[sel].cause}</div><div style={{color:C.green,fontWeight:700,marginBottom:4}}>✅ {remedyLabel}</div><div>{faults[sel].remedy}</div></div>)}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)"}}>{t.s4hint}</div>}
    </div>
  );
}
// LessonE2_L3 - Purificateurs & Separateurs | PART 2

export default function LessonE2_L3({ lang="fr", onBack, onComplete, onQuizScored }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; onQuizScored?:(score:number,maxScore:number)=>void; }) {
  const t = T[lang] || T.fr;
  const moduleFull=lang==="fr"?"Module E2 — Auxiliaires & Électricité":lang==="en"?"Module E2 — Auxiliary Systems & Electricity":lang==="es"?"Módulo E2 — Auxiliares y Electricidad":"Módulo E2 — Auxiliares e Eletricidade";
  const lessonOf=lang==="fr"?"Leçon 3/7":lang==="en"?"Lesson 3/7":lang==="es"?"Lección 3/7":"Lição 3/7";
  const badgeText=lang==="fr"?`🌀 ${moduleFull} · Leçon 3/7 · ⭐ Premium · 200 XP`:lang==="en"?`🌀 ${moduleFull} · Lesson 3/7 · ⭐ Premium · 200 XP`:lang==="es"?`🌀 ${moduleFull} · Lección 3/7 · ⭐ Premium · 200 XP`:`🌀 ${moduleFull} · Lição 3/7 · ⭐ Premium · 200 XP`;
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
  const optColors = [C.purple, C.cyan, C.green, C.amber];
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
  const pickBank=(i:number)=>{if(bankSel!==null)return;setBankSel(i);if(i===shuffledBank[bankCur].correct)setBankScore(s=>s+1);};
  const bankNext=()=>{if(bankCur+1>=bank.length){setBankDone(true);return;}setBankCur(c=>c+1);setBankSel(null);};
  const handleQConf=()=>{if(qSel===null)return;setQConf(true);if(qSel===shuffledQuiz[qCur].correct)setQScore(s=>s+1);};
  const handleQNext=()=>{if(qCur+1>=quiz.length){setPhase("done");if(onQuizScored)onQuizScored(qScore,quiz.length);if(onComplete)onComplete(xpFinal);return;}setQCur(c=>c+1);setQSel(null);setQConf(false);};

  const header=(sub:string)=>(
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.purple}33`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
        <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar"}</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:10,color:C.purple,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🌀 {moduleFull}{sub?" · "+sub:""}</div>
          <div style={{fontSize:11,color:"rgba(240,244,255,0.45)"}}>{lessonOf}</div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
          <span style={{padding:"2px 8px",borderRadius:6,background:"rgba(124,77,255,0.12)",border:"1px solid rgba(124,77,255,0.4)",fontSize:9,color:C.purple,fontFamily:"'Cinzel',serif",letterSpacing:1}}>PREMIUM</span>
          <span style={{fontSize:11,color:"rgba(240,244,255,0.6)",fontFamily:"Courier New"}}>{progress}%</span>
        </div>
      </div>
      <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
        <div style={{height:"100%",background:`linear-gradient(90deg,${C.purple},${C.cyan})`,width:`${progress}%`,transition:"width 0.4s"}}/>
      </div>
    </div>
  );

  // ══ CONTENT ══════════════════════════════════════════════════
  if(phase==="content") return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif"}}>
      {header("")}
      <div style={{padding:"20px 16px 0"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.purple}22`,border:`1px solid ${C.purple}55`,fontSize:11,color:C.purple,fontWeight:700}}>{badgeText}</div>
          <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 4px"}}>{t.lessonTitle}</h1>
        </div>
      </div>
      <div style={{padding:"14px 14px 80px"}}>
        <div style={{fontSize:13,color:C.dim,lineHeight:1.7,marginBottom:18,fontFamily:"Courier New",padding:"12px 14px",borderRadius:12,background:`${C.navy2}88`,border:`1px solid ${C.purple}18`}}>{t.intro}</div>

        {section("🔄",t.s1title,<SepTypesSVG lang={lang}/>,C.purple)}
        {section("⚙️",t.s2title,<ComponentsSVG lang={lang}/>,C.cyan)}
        {section("📋",t.s3title,<ParametersSVG lang={lang}/>,C.amber)}
        {section("⚠️",t.s4title,<FaultsSVG lang={lang}/>,C.red)}

        {/* EXERCISES */}
        <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${C.purple}2a`}}>
          <div style={{background:`${C.purple}14`,padding:"10px 14px",borderBottom:`1px solid ${C.purple}1a`}}>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.purple}}>✏️ {t.exerciseTitle}</span>
          </div>
          <div style={{padding:12}}>
            {t.exercises.map((ex:any,i:number)=>(
              <div key={i} style={{marginBottom:12,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${C.purple}22`,overflow:"hidden"}}>
                <div style={{padding:"12px 14px"}}>
                  <div style={{fontSize:10,color:C.purple,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
                  <div style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:"Courier New"}}>{ex.q}</div>
                </div>
                <div style={{padding:"0 14px 12px"}}>
                  <input type="text" placeholder="?" value={exInputs[i]} onChange={e=>setExInputs(p=>p.map((v,j)=>j===i?e.target.value:v))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",color:C.white,fontSize:12,fontFamily:"Courier New",marginBottom:10,boxSizing:"border-box"}}/>
                  <button onClick={()=>setExShown(p=>p.map((v,j)=>j===i?!v:v))} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:exShown[i]?`${C.purple}22`:"rgba(255,255,255,0.06)",border:`1px solid ${exShown[i]?C.purple:"rgba(255,255,255,0.15)"}`,color:exShown[i]?C.purple:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{exShown[i]?t.hideAnswer:t.showAnswer}</button>
                  {exShown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.purple}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New"}}>{ex.a}</div>}
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
            {bankIdx===null&&(<button onClick={startBank} style={{width:"100%",padding:"14px 0",borderRadius:12,background:`linear-gradient(135deg,${C.purple},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{t.bankStart}</button>)}
            {bankIdx!==null&&!bankDone&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:11,color:C.dim,fontFamily:"Courier New"}}><span>Q{bankCur+1}/{bank.length}</span><span style={{color:C.purple}}>✦ {bankScore}</span></div>
                <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:12}}><div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.purple},${C.cyan})`,width:`${(bankCur/bank.length)*100}%`,transition:"width 0.3s"}}/></div>
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
                {bankSel!==null&&(<div><div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${bankSel===shuffledBank[bankCur].correct?C.green:C.red}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{shuffledBank[bankCur].expl}</div><button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,${C.purple},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?t.bankTrophy:t.bankNext}</button></div>)}
              </div>
            )}
            {bankDone&&(<div style={{textAlign:"center",padding:16}}><div style={{fontSize:36,marginBottom:8}}>🏆</div><div style={{fontFamily:"'Cinzel',serif",fontSize:16,color:C.purple,marginBottom:6}}>{t.bankTrophy}</div><div style={{fontSize:13,color:C.dim,fontFamily:"Courier New"}}>{t.bankScore} : {bankScore}/{bank.length}</div></div>)}
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.purple}44`,padding:14,marginBottom:18}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:C.purple,letterSpacing:1,marginBottom:10}}>✦ {t.summaryTitle}</div>
          {t.summary.map((s:string,i:number)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:7,fontSize:12,color:"rgba(240,244,255,0.78)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.purple,flexShrink:0}}>✦</span><span>{s}</span></div>))}
        </div>

        <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.purple},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy}}>🔄 {t.quizCTA}</button>
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
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,fontSize:11,color:C.dim,fontFamily:"Courier New"}}><span>Q{qCur+1}/{quiz.length}</span><span style={{color:C.purple}}>⭐ {qScore}/{quiz.length}</span></div>
          <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:16}}><div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.purple},${C.cyan})`,width:`${(qCur/quiz.length)*100}%`,transition:"width 0.4s"}}/></div>
          <div style={{fontSize:14,color:C.text,lineHeight:1.6,fontFamily:"Courier New",marginBottom:18,padding:14,borderRadius:12,background:`${C.navy2}cc`,border:`1px solid ${C.purple}22`}}>{q.q}</div>
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
            ?<button onClick={handleQConf} disabled={qSel===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:qSel!==null?`linear-gradient(135deg,${C.purple},${C.cyan})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:qSel!==null?C.navy:"rgba(240,244,255,0.25)",cursor:qSel!==null?"pointer":"default",letterSpacing:1}}>{submitLabel}</button>
            :<button onClick={handleQNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.purple},${C.cyan})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:1}}>{qCur+1>=quiz.length?"TERMINER":nextLabel}</button>
          }
        </div>
      </div>
    );
  }

  // ══ DONE ═════════════════════════════════════════════════════
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.navy3},${C.navy})`,color:C.white,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 14px"}}>
      <div style={{fontSize:56,marginBottom:12}}>🔄</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:42,fontWeight:900,color:C.purple,marginBottom:4}}>{xpFinal}</div>
      <div style={{fontSize:12,color:C.dim,fontFamily:"Courier New",marginBottom:8}}>{lang==="fr"?"XP obtenus":lang==="en"?"XP earned":lang==="es"?"XP obtenidos":"XP obtidos"}</div>
      <div style={{fontSize:15,color:C.white,fontFamily:"Courier New",marginBottom:24}}>Score : {qScore}/{quiz.length}</div>
      <div style={{width:"100%",maxWidth:400,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.purple}44`,padding:14,marginBottom:24}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:C.purple,marginBottom:10}}>✦ {t.summaryTitle}</div>
        {t.summary.map((s:string,i:number)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:C.purple,flexShrink:0}}>✦</span><span>{s}</span></div>))}
      </div>
      <button onClick={onBack} style={{width:"100%",maxWidth:400,padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.purple},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>🔄 {lang==="fr"?"RETOUR AU MODULE":lang==="en"?"BACK TO MODULE":lang==="es"?"VOLVER AL MODULO":"VOLTAR AO MODULO"}</button>
    </div>
  );
}
