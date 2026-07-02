// LessonE2_L3 — Purificateurs & Separateurs | PART 1
import { useState } from "react";

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
    moduleLabel: "MACHINE — AUXILIAIRES",
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
    accidentTitle: "CAS REEL : Pollution aux hydrocarbures — MV Tropical Breeze (2020)",
    accidentBody: "Un vraquier en Mer Baltique decharge ses eaux de sentine sans passer par le separateur OWS, en desactivant manuellement le moniteur ODMCS. La concentration en hydrocarbures depasse 800 ppm (limite MARPOL : 15 ppm). Detection par drone de surveillance cotiere suedois. Sanctions : amende 2,1 M EUR, capitaine condamne a 18 mois d'emprisonnement avec sursis, navire retenu 10 jours. Cause : pression de l'armateur pour economiser du temps de traitement. Lecon : le systeme ODMCS ne doit JAMAIS etre neutralise — responsabilite penale personnelle du capitaine et chef mecanicien.",
    summaryTitle: "Points essentiels",
    summary: [
      "La separation centrifuge utilise la difference de densite entre l'huile, l'eau et les sediments",
      "Un purificateur (3 sorties) elimine l'eau et les sediments — le clarificateur (2 sorties) elimine les solides uniquement",
      "La temperature d'operation du HFO doit etre 85-98°C pour reduire la viscosite",
      "Le gravity disc determine l'interface huile-eau — choix crucial selon la densite du carburant",
      "MARPOL limite les rejets en mer a 15 ppm — ODMCS obligatoire sur tous navires > 400 TJB",
      "Purifier l'huile de lubrification multiplie sa duree de vie par 2 a 4",
    ],
    quizCTA: "COMMENCER LE QUIZ",
    bankStart: "COMMENCER =>",
    bankNext: "Question suivante =>",
    bankTrophy: "Bravo ! Banque terminee",
    bankScore: "Score banque",
    sepTypes: {
      purifier:  { name: "Purificateur (Purifier)", desc: "Elimine a la fois l'eau et les sediments. Utilise un gravity disc pour maintenir l'interface huile-eau. Eau scellee (sealing water) requise pour creer le joint hydraulique. Utilise pour le HFO et l'huile lubrifiante fortement contamines.", outlet: "3 sorties : huile propre / eau + impuretes / boues" },
      clarifier: { name: "Clarificateur (Clarifier)", desc: "Elimine uniquement les sediments solides — pas d'eau libre. Pas de gravity disc ni d'eau scellee. Utilise quand le combustible contient peu d'eau. En pratique : souvent utilise en 2eme etage apres un purificateur.", outlet: "2 sorties : huile + eau (ensemble) / boues solides" },
    },
    components: {
      bowl:            { name: "Bol centrifuge (Bowl)",        desc: "Piece maitresse du purificateur. Tourne a tres grande vitesse (6000-10000 tr/min). Contient les disques de separation empiles. La force centrifuge y est 5000-10000 fois la gravite, permettant une separation extremement efficace." },
      discs:           { name: "Disques de separation",        desc: "Disques coniques empiles a angle (40-45°). Augmentent la surface de separation effective. Le liquide monte entre les disques en couches minces, permettant une separation rapide des phases. Un bol peut contenir 100-150 disques." },
      gravity_disc:    { name: "Gravity disc (deversoir)",     desc: "Anneau en acier inox a l'extremite superieure du bol qui determine la position de l'interface huile-eau. Diametre interieur critique : trop grand → eau dans la sortie huile ; trop petit → huile dans la sortie eau. Choisi selon la densite du combustible." },
      sealing_water:   { name: "Eau scellee (Sealing water)",  desc: "Eau ajoutee au debut de l'operation pour creer le joint hydraulique entre l'huile et l'eau. Sans eau scellee, l'huile passerait directement dans la chambre eau. Doit etre propre et douce (pas d'eau de mer)." },
      operating_water: { name: "Eau de manoeuvre",              desc: "Eau sous pression utilisee pour commander l'ouverture et la fermeture du fond du bol lors des ejections de boues. Haute pression (6-8 bar), declenchee automatiquement ou manuellement." },
      heater:          { name: "Rechauffeur (Heater)",          desc: "Chauffe le combustible a la temperature d'operation (85-98°C pour HFO). Une temperature insuffisante → viscosite trop haute → mauvaise separation. Une temperature excessive → vaporisation et risque d'incendie." },
    },
    parameters: {
      temperature:  { name: "Temperature d'operation",    desc: "HFO : 85-98°C (selon viscosite). MDO/MGO : 40-50°C. Huile lubrifiante : 85-90°C. La temperature reduit la viscosite, ameliorant la separation. Controlee par un thermometre et une vanne de regulation de vapeur." },
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
      { q: "Expliquez le principe de fonctionnement d'un purificateur centrifuge pour HFO. Pourquoi la force centrifuge est-elle si efficace ?", a: "Un purificateur centrifuge fait tourner le fuel a tres grande vitesse (6000-10000 tr/min) dans un bol. La force centrifuge generee (5000 a 10000 fois la gravite) separe les composants selon leur densite : Les particules solides (sediments) les plus denses sont projetees contre la paroi exterieure du bol. L'eau (densite ~1,0) se depose a l'exterieur des disques. L'huile (densite 0,9-0,99) remonte au centre et sort par le dessus. La force centrifuge est si efficace car elle est des milliers de fois plus puissante que la gravite. Une particule de 1 micron qui mettrait des heures a sedimenter par gravite se separe en secondes dans un purificateur. Les disques empiles a 45° divisent le flux en couches minces, multipliant encore la surface de separation." },
      { q: "Comment choisir le bon gravity disc pour un purificateur de HFO ?", a: "Le gravity disc est choisi en fonction de la densite du combustible. Il existe des tables de selection dans le manuel du fabricant. Principe : plus la densite du HFO est elevee, plus le diametre interieur du gravity disc doit etre petit. Methode de selection : 1. Mesurer la densite du HFO a 15°C (ex : 0,990 g/cm3). 2. Mesurer la temperature d'operation (ex : 95°C). 3. Consulter la table de selection pour choisir le diametre correct. 4. Demarrer et verifier : si de l'eau sort avec l'huile → gravity disc trop grand. Si de l'huile sort avec l'eau → gravity disc trop petit." },
      { q: "Qu'est-ce que l'eau scellee dans un purificateur et que se passe-t-il si elle disparait pendant l'operation ?", a: "L'eau scellee (sealing water) est une couche d'eau douce qui cree le joint hydraulique entre la chambre a huile et la chambre a eau dans le bol du purificateur. Sans eau scellee, il n'y a pas de separation : l'huile passerait directement dans la chambre eau. Si l'eau scellee disparait pendant l'operation : 1. L'interface huile-eau se brise. 2. L'huile envahit la chambre eau. 3. La sortie eau devient chargee en huile (pertes importantes). 4. Le purificateur perd son efficacite. Causes de perte d'eau scellee : debit d'alimentation trop eleve, temperature trop basse, ejection accidentelle. Remede : arreter l'alimentation, reinitialiser le joint hydraulique en reinjectant l'eau scellee." },
    ],
    bankQuestions: [
      { q: "Quelle est la difference entre un purificateur et un clarificateur ?", a: "Purificateur : elimine l'eau ET les sediments. Necessite un gravity disc et une eau scellee. 3 sorties : huile propre, eau/impuretes, boues. Utilise pour le HFO et l'huile lubrifiante tres contamines. Clarificateur : elimine uniquement les sediments solides. Pas de gravity disc ni d'eau scellee. 2 sorties : huile+eau (ensemble), boues solides. Utilise quand la teneur en eau est faible ou comme 2eme etage apres purificateur." },
      { q: "Pourquoi chauffe-t-on le HFO avant le purificateur ?", a: "Le HFO est chauffe a 85-98°C avant le purificateur pour : 1. Reduire la viscosite : le HFO a 50°C peut avoir une viscosite de 700 cSt, a 95°C elle tombe a 10-20 cSt. Plus le fluide est fluide, plus la separation est efficace. 2. Ameliorer la difference de densite : a haute temperature, la difference de densite entre huile et eau est plus prononcee. 3. Prevenir le colmatage : un HFO trop visqueux peut colmater les disques de separation." },
      { q: "Comment fonctionne l'ejection des boues dans un purificateur ?", a: "L'ejection des boues (sludge discharge) est declenchee automatiquement ou manuellement selon un intervalle programme. Mecanisme : l'eau de manoeuvre (operating water) a 6-8 bar est introduite sous le fond du bol. Cette pression pousse le piston de fond vers le bas, ouvrant des orifices peripheriques. Les boues et l'eau accumulees dans la chambre exterieure sont ejectees centrifugalement en quelques secondes. Le fond se referme ensuite par ressort ou par eau de fermeture. Apres ejection, l'eau scellee est reintroduite et l'alimentation reprend progressivement." },
      { q: "Qu'est-ce que le gravity disc et pourquoi est-il si important ?", a: "Le gravity disc est un anneau en acier inox au sommet du bol qui cree un deversoir pour l'eau. Son diametre interieur determine la position de l'interface huile-eau (separatrice). Si le diametre est trop grand : l'interface se deplace trop loin vers le centre → l'eau penetre dans la zone huile → eau dans la sortie huile. Si le diametre est trop petit : l'interface se deplace trop loin vers l'exterieur → l'huile deborde dans la zone eau → huile dans la sortie eau. Choix : depend de la densite du combustible et de la temperature d'operation." },
      { q: "Quelles sont les verifications a faire avant de demarrer un purificateur ?", a: "Avant demarrage d'un purificateur : 1. Verifier le niveau d'huile des paliers et engrenages. 2. Ouvrir les vannes d'entree et de sortie. 3. Verifier la pression de l'eau de manoeuvre (6-8 bar). 4. Verifier la pression et temperature de la vapeur d'alimentation du rechauffeur. 5. S'assurer que le bon gravity disc est installe selon la densite du combustible. 6. Demarrer le moteur electrique et attendre que la vitesse soit stabilisee. 7. Introduire l'eau scellee (sealing water) pour creer le joint hydraulique. 8. Ouvrir progressivement l'alimentation en combustible. 9. Verifier les sorties : huile propre cote huile, eau claire cote eau." },
      { q: "Qu'est-ce que la 'perte d'eau scellee' et comment la detecter ?", a: "La perte d'eau scellee se produit quand l'eau creant le joint hydraulique est entrainee par le flux d'alimentation ou ejectee accidentellement avec les boues. Consequences : l'interface huile-eau disparait, l'huile passe dans la chambre eau (pertes importantes), la sortie eau devient chargee en huile. Detection : inspection visuelle de la sortie eau (normalement claire → devient trouble ou coloree), alarme de haute teneur en huile dans les effluents (si equipe d'un detecteur), reduction du debit a la sortie huile. Solution : arreter l'alimentation, rouvrir la vanne d'eau scellee, reintroduire l'eau scellee avant de reprendre." },
      { q: "Quelles sont les normes MARPOL concernant les effluents d'un separateur eau-huile de cale ?", a: "MARPOL Annexe I impose des restrictions strictes sur le rejet des eaux huileuses de sentine : Teneur en huile maximale : 15 ppm (parties par million) pour les rejets en mer (a plus de 12 milles des cotes). Le rejet est interdit dans les eaux speciales (Mediterranee, Baltique, mer Rouge...). Equipements obligatoires : OWS (Oily Water Separator) capable de traiter jusqu'a 15 ppm, dispositif de surveillance automatique de la teneur en huile (ODMCS), alarme et arret automatique si > 15 ppm, registre des hydrocarbures (Oil Record Book) pour tracer tous les rejets. Les boues doivent etre stockees et dechargees a quai." },
      { q: "Comment se fait l'entretien des disques de separation d'un purificateur ?", a: "Nettoyage des disques (a chaque revision, generalement annuelle) : 1. Arreter et demonter le bol selon la procedure du fabricant. 2. Deposer les disques empiles. 3. Trempage dans un solvant adapte (kerosene, solution alcaline chaude) pour dissoudre les depots de carbone et de gomme. 4. Nettoyage a la brosse douce — ne jamais utiliser d'outils metalliques qui raient les surfaces. 5. Rincage a l'eau claire. 6. Inspection : jeter les disques deformes, corrodes ou fissures. 7. Remontage en respectant l'ordre et le nombre de disques. L'encrassement des disques reduit la surface efficace de separation et deteriore les performances." },
      { q: "Qu'est-ce que le 'sludge tank' et quel est son role a bord ?", a: "Le sludge tank (citerne a boues) est un reservoir qui collecte les boues ejectees par les purificateurs et les residus de la separation. Contenu : boues de HFO (residus de purification), eau souillee en huile, traces de metaux et catalyseurs uses. Gestion : les boues peuvent etre melangees au HFO en petites quantites et brulees dans l'incinerateur ou retraitees a terre. MARPOL interdit le rejet des boues en mer. Elles doivent etre dechargees dans des installations portuaires (sludge reception facility). Le registre des hydrocarbures trace toutes les quantites de boues." },
      { q: "Comment optimiser la consommation d'energie d'un purificateur ?", a: "Optimisation energetique d'un purificateur : 1. Maintenir une temperature d'operation optimale. 2. Regler le debit au bon niveau. 3. Ejecter les boues a intervalles reguliers pour eviter le desequilibre du bol. 4. Verifier regulierement l'etat des roulements. 5. Optimiser la duree de fonctionnement. 6. Nettoyer regulierement les disques pour maintenir les performances. Un purificateur bien entretenu consomme 30-40% moins d'energie qu'un purificateur encresse." },
      { q: "Quelles sont les alarmes typiques d'un purificateur et leurs causes ?", a: "Alarmes typiques : Alarme temperature basse : temperature de fonctionnement insuffisante → viscosite trop haute → mauvaise separation. Verifier la vanne de vapeur et le rechauffeur. Alarme vibrations elevees : bol desequilibre (boues accumulees), roulements defectueux. Declencher une ejection, inspecter les roulements. Alarme pression eau de manoeuvre basse : pompe d'eau defectueuse, fuite. Verifier la pompe et le circuit eau. Alarme flux eau de sortie trop eleve : gravity disc inadapte ou perte d'eau scellee. Alarme moteur (surintensie) : surcharge (bol trop plein), probleme mecanique. Declencher une ejection, inspecter." },
      { q: "Pourquoi purifier l'huile de lubrification et quels sont ses benefices ?", a: "Purification de l'huile lubrifiante : L'huile de lubrification du moteur principal se contamine progressivement avec : l'eau (condensation, fuite de circuit de refroidissement), les sediments (poussiere, produits de combustion), les metaux en suspension (usure des organes moteur). Sans purification : l'huile se degrade rapidement, augmentant l'usure des paliers et cylindres, reduisant la duree de vie de l'huile. Avec purification reguliere : allongement de la duree de vie de l'huile (x2 a x4), reduction des couts de maintenance, protection des surfaces frottantes, detection precoce des anomalies. Parametres : temperature 85-90°C, debit faible (5-15% du volume par heure)." },
      { q: "Qu'est-ce que l'ODMCS et pourquoi est-il obligatoire selon MARPOL ?", a: "L'ODMCS (Oil Discharge Monitoring and Control System) est un systeme automatique de surveillance et de controle des rejets d'hydrocarbures. Fonctionnement : le systeme mesure en continu la teneur en huile de l'eau traitee par l'OWS. Si la concentration depasse 15 ppm : alarme automatique, arret automatique de la vanne de rejet en mer, ouverture automatique de la vanne de recyclage vers le sludge tank. Registre automatique : le systeme enregistre toutes les operations (concentration, debit, position GPS) et imprime un rapport. Obligatoire selon MARPOL Annexe I pour tous les navires > 400 TJB. Toute neutralisation ou fraude est un delit penal grave (ex : affaire MV Tropical Breeze, 2020)." },
      { q: "Comment calculer le debit optimal d'un purificateur HFO ?", a: "Le debit optimal d'un purificateur HFO se calcule en fonction de la capacite nominale du purificateur et de la teneur en impuretes du combustible. Principe general : utiliser 20-60% de la capacite nominale. Un debit plus faible donne une meilleure separation mais risque le debordement si le bol n'est pas ejecte assez souvent. Un debit plus eleve reduit la qualite de separation mais traite plus de combustible. Exemple : purificateur nominal 5 m3/h, combustible tres charge → utiliser 30-40% soit 1,5-2 m3/h. Debit d'alimentation en systeme duplex (1 purificateur + 1 clarificateur en serie) : adapter les debits pour que les deux fassent un traitement optimal. Ajuster selon l'analyse des effluents (eau claire en sortie eau = bon signe)." },
      { q: "Quelles sont les procedures de remise en service d'un purificateur apres arret d'urgence ?", a: "Procedure de remise en service apres arret d'urgence : 1. Identifier et corriger la cause de l'arret d'urgence (vibrations, haute temperature, surcharge). 2. Si vibrations → ejecter les boues, inspecter le bol pour equilibrage. 3. Si haute temperature → verifier le rechauffeur et la vanne de vapeur. 4. Verifier les niveaux d'huile des paliers. 5. Fermer l'alimentation en combustible. 6. Demarrer le moteur a vide et surveiller la montee en vitesse (anomalie → vibration excessive). 7. Introduire l'eau scellee apres stabilisation de la vitesse. 8. Ouvrir progressivement l'alimentation combustible. 9. Surveiller les parametres (temperature, pression, vibrations) pendant au moins 15 minutes avant de passer en mode automatique." },
    ],
    quiz: [
      { q: "A quelle temperature faut-il chauffer le HFO pour optimiser la separation dans un purificateur ?", opts: ["40-50°C", "60-70°C", "85-98°C", "110-120°C"], correct: 2, exp: "Le HFO doit etre chauffe a 85-98°C pour reduire sa viscosite a 10-20 cSt, permettant une separation efficace. En dessous de cette temperature, la viscosite est trop elevee et les performances de separation chutent drastiquement." },
      { q: "Qu'est-ce que le gravity disc dans un purificateur ?", opts: ["Un filtre a particules", "Un anneau qui determine la position de l'interface huile-eau", "Un regulateur de debit", "Un amortisseur de vibrations"], correct: 1, exp: "Le gravity disc est un anneau en acier inox qui cree un deversoir a l'extremite du bol. Son diametre interieur determine la position de l'interface huile-eau. Un diametre trop grand laisse passer l'eau dans l'huile ; trop petit, l'huile passe dans l'eau." },
      { q: "Un purificateur a 3 sorties. Quelles sont-elles ?", opts: ["Huile, eau, air", "Huile propre, eau + impuretes, boues", "Huile chaude, huile froide, boues", "Entree, sortie, recirculation"], correct: 1, exp: "Un purificateur a 3 sorties : l'huile propre (sortie principale), l'eau avec les impuretes (effluent eau), et les boues (ejectees periodiquement par les orifices peripheriques du bol)." },
      { q: "Quelle est la teneur maximale en huile autorisee par MARPOL pour le rejet des eaux de cale en mer ?", opts: ["5 ppm", "15 ppm", "100 ppm", "1000 ppm"], correct: 1, exp: "MARPOL Annexe I limite la teneur en huile des eaux de cale rejetees en mer a 15 ppm maximum (a plus de 12 milles nautiques des cotes). Au-dela, ou dans les zones speciales, le rejet est totalement interdit." },
      { q: "Que se passe-t-il si le gravity disc est trop grand dans un purificateur ?", opts: ["Les boues ne sont pas ejectees", "L'eau passe dans la sortie huile", "L'huile passe dans la sortie eau", "La vitesse du bol augmente"], correct: 1, exp: "Si le gravity disc est trop grand, l'interface huile-eau se deplace trop loin vers le centre du bol. L'eau atteint la zone huile et sort avec l'huile propre → eau dans la sortie huile. Solution : remplacer par un gravity disc de plus petit diametre." },
    ],
  },

  en: {
    moduleLabel: "ENGINE — AUXILIARIES",
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
    accidentTitle: "REAL CASE: Oil pollution — MV Tropical Breeze (2020)",
    accidentBody: "A bulk carrier in the Baltic Sea discharged bilge water without passing through the OWS separator, manually disabling the ODMCS monitor. Hydrocarbon concentration exceeded 800 ppm (MARPOL limit: 15 ppm). Detected by Swedish coastal surveillance drone. Sanctions: EUR 2.1M fine, captain sentenced to 18-month suspended prison sentence, vessel detained 10 days. Cause: operator pressure to save processing time. Lesson: the ODMCS system must NEVER be bypassed — personal criminal liability for captain and chief engineer.",
    summaryTitle: "Key Points",
    summary: [
      "Centrifugal separation uses density differences between oil, water and sediments",
      "A purifier (3 outlets) removes water and sediments — clarifier (2 outlets) removes solids only",
      "HFO operating temperature must be 85-98°C to reduce viscosity",
      "Gravity disc determines oil-water interface — critical choice based on fuel density",
      "MARPOL limits sea discharges to 15 ppm — ODMCS mandatory on all vessels > 400 GT",
      "Purifying lube oil multiplies its service life by 2 to 4",
    ],
    quizCTA: "START QUIZ",
    bankStart: "START =>",
    bankNext: "Next question =>",
    bankTrophy: "Well done! Bank completed",
    bankScore: "Bank score",
    sepTypes: {
      purifier:  { name: "Purifier", desc: "Removes both water and sediments. Uses a gravity disc to maintain the oil-water interface. Sealing water required to create the hydraulic seal. Used for heavily contaminated HFO and lube oil.", outlet: "3 outlets: clean oil / water + impurities / sludge" },
      clarifier: { name: "Clarifier", desc: "Removes solid sediments only — not free water. No gravity disc or sealing water. Used when fuel contains little water. In practice: often used as 2nd stage after a purifier.", outlet: "2 outlets: oil + water (together) / solid sludge" },
    },
    components: {
      bowl:            { name: "Centrifuge bowl",    desc: "Heart of the purifier. Rotates at very high speed (6000-10000 rpm). Contains stacked separation discs. Centrifugal force is 5000-10000 times gravity, enabling extremely effective separation." },
      discs:           { name: "Separation discs",   desc: "Conical stacked discs at angle (40-45°). Increase effective separation surface. Liquid rises between discs in thin layers enabling rapid phase separation. A bowl may contain 100-150 discs." },
      gravity_disc:    { name: "Gravity disc",       desc: "Stainless steel ring at the bowl top that determines the oil-water interface position. Critical bore diameter: too large → water in oil outlet; too small → oil in water outlet. Selected according to fuel density." },
      sealing_water:   { name: "Sealing water",      desc: "Water added at start of operation to create the hydraulic seal between oil and water. Without sealing water, oil would pass directly into the water chamber. Must be clean and fresh (not seawater)." },
      operating_water: { name: "Operating water",    desc: "Pressurised water used to control bowl bottom opening/closing during sludge ejections. High pressure (6-8 bar), triggered automatically or manually." },
      heater:          { name: "Heater",              desc: "Heats fuel to operating temperature (85-98°C for HFO). Insufficient temperature → viscosity too high → poor separation. Excessive temperature → vaporisation and fire risk." },
    },
    parameters: {
      temperature:  { name: "Operating temperature",   desc: "HFO: 85-98°C (depending on viscosity). MDO/MGO: 40-50°C. Lube oil: 85-90°C. Temperature reduces viscosity, improving separation. Controlled by thermometer and steam control valve." },
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
      { q: "Explain the operating principle of a centrifugal HFO purifier. Why is centrifugal force so effective?", a: "A centrifugal purifier rotates fuel at very high speed (6000-10000 rpm) in a bowl. The centrifugal force generated (5000-10000 times gravity) separates components by density: solid particles (sediments) are thrown to the bowl outer wall. Water (density ~1.0) settles outside the discs. Oil (density 0.9-0.99) rises to the centre and exits from the top. Centrifugal force is so effective because it is thousands of times more powerful than gravity. A 1-micron particle that would take hours to settle by gravity separates in seconds in a purifier. The 45°-angled stacked discs split flow into thin layers, further multiplying separation surface." },
      { q: "How to choose the correct gravity disc for an HFO purifier?", a: "The gravity disc is chosen based on fuel density. Selection tables are in the manufacturer's manual. Principle: the higher the HFO density, the smaller the gravity disc bore must be. Selection method: 1. Measure HFO density at 15°C (e.g. 0.990 g/cm3). 2. Measure operating temperature (e.g. 95°C). 3. Consult selection table for correct diameter. 4. Start and verify: if water exits with oil → gravity disc too large. If oil exits with water → gravity disc too small." },
      { q: "What is sealing water in a purifier and what happens if it disappears during operation?", a: "Sealing water is a layer of fresh water that creates the hydraulic seal between the oil chamber and water chamber in the purifier bowl. Without sealing water, there is no separation: oil would pass directly into the water chamber. If sealing water disappears during operation: 1. Oil-water interface breaks. 2. Oil invades water chamber. 3. Water outlet becomes oil-laden (significant losses). 4. Purifier loses effectiveness. Causes of sealing water loss: feed rate too high, temperature too low, accidental sealing water ejection. Remedy: stop feed, reinitialise hydraulic seal by reinjecting sealing water." },
    ],
    bankQuestions: [
      { q: "What is the difference between a purifier and a clarifier?", a: "Purifier: removes water AND sediments. Requires gravity disc and sealing water. 3 outlets: clean oil, water/impurities, sludge. Used for heavily contaminated HFO and lube oil. Clarifier: removes solid sediments only. No gravity disc or sealing water. 2 outlets: oil+water (together), solid sludge. Used when water content is low or as 2nd stage after purifier." },
      { q: "Why is HFO heated before the purifier?", a: "HFO is heated to 85-98°C before the purifier to: 1. Reduce viscosity: HFO at 50°C can have 700 cSt viscosity; at 95°C it drops to 10-20 cSt. Thinner fluid separates more effectively. 2. Improve density difference: at high temperature, density difference between oil and water is more pronounced. 3. Prevent fouling: overly viscous HFO can clog separation discs." },
      { q: "How does sludge ejection work in a purifier?", a: "Sludge discharge is triggered automatically or manually per a programmed interval. Mechanism: operating water at 6-8 bar is introduced under the bowl bottom. This pressure pushes the bottom piston down, opening peripheral ports. Accumulated sludge and water are centrifugally ejected in seconds. The bottom then closes by spring or closing water. After ejection, sealing water is reintroduced and feed is gradually resumed." },
      { q: "What is the gravity disc and why is it so important?", a: "The gravity disc is a stainless steel ring at the bowl top creating a weir for water. Its bore diameter determines the oil-water interface position. Too large bore: interface moves too far inward → water enters oil zone → water in oil outlet. Too small bore: interface moves too far outward → oil overflows into water zone → oil in water outlet. Selection depends on fuel density and operating temperature." },
      { q: "What checks should be made before starting a purifier?", a: "Pre-start checks: 1. Check bearing and gear oil level. 2. Open inlet and outlet valves. 3. Check operating water pressure (6-8 bar). 4. Check heater steam pressure and temperature. 5. Ensure correct gravity disc installed per fuel density. 6. Start motor and wait for stable speed. 7. Introduce sealing water to create hydraulic seal. 8. Gradually open fuel feed. 9. Check outlets: clean oil side oil, clear water side." },
      { q: "What is sealing water loss and how to detect it?", a: "Sealing water loss occurs when the hydraulic seal water is carried away by feed flow or accidentally ejected with sludge. Consequences: oil-water interface disappears, oil passes into water chamber (significant losses), water outlet becomes oil-laden. Detection: visual inspection of water outlet (normally clear → turns cloudy or coloured), high oil content alarm in effluents, reduced oil outlet flow. Solution: stop feed, reopen sealing water valve, reintroduce sealing water before resuming." },
      { q: "What are MARPOL regulations regarding bilge water separator effluents?", a: "MARPOL Annex I imposes strict restrictions on oily bilge water discharge: Maximum oil content: 15 ppm for sea discharge (more than 12 nautical miles from coast). Discharge prohibited in special areas (Mediterranean, Baltic, Red Sea...). Mandatory equipment: OWS capable of treating to 15 ppm, automatic oil content monitoring device (ODMCS), automatic alarm and stop if > 15 ppm, Oil Record Book to trace all discharges. Sludge must be stored and discharged ashore." },
      { q: "How are purifier separation discs maintained?", a: "Disc cleaning (each overhaul, generally annual): 1. Stop and dismantle bowl per manufacturer procedure. 2. Remove stacked discs. 3. Soak in appropriate solvent (kerosene, hot alkaline solution) to dissolve carbon and gum deposits. 4. Clean with soft brush — never use metal tools that scratch surfaces. 5. Rinse with clean water. 6. Inspect: discard deformed, corroded or cracked discs. 7. Reassemble respecting disc order and number. Fouled discs reduce effective separation surface and deteriorate performance." },
      { q: "What is the sludge tank and what is its role on board?", a: "The sludge tank collects sludge ejected by purifiers and separation residues. Contents: HFO sludge (purification residues), oil-contaminated water, metal traces and spent catalysts. Management: sludge can be mixed with HFO in small quantities and burned in the incinerator or reprocessed ashore. MARPOL prohibits sludge discharge at sea. Must be discharged at port reception facilities. Oil Record Book tracks all sludge quantities." },
      { q: "How to optimise purifier energy consumption?", a: "Energy optimisation: 1. Maintain optimal operating temperature. 2. Set correct flow rate. 3. Eject sludge at regular intervals to prevent bowl imbalance. 4. Check bearing condition regularly. 5. Optimise running time. 6. Clean discs regularly. A well-maintained purifier consumes 30-40% less energy than a fouled one." },
      { q: "What are typical purifier alarms and their causes?", a: "Typical alarms: Low temperature alarm: insufficient operating temperature → high viscosity → poor separation. High vibration alarm: unbalanced bowl (sludge build-up), defective bearings. Trigger ejection, inspect bearings. Low operating water pressure: defective pump, leak. High water outlet flow: wrong gravity disc or sealing water loss. Motor alarm (overcurrent): overloaded bowl, mechanical problem. Low speed alarm: drive problem." },
      { q: "Why purify lubricating oil and what are the benefits?", a: "Lube oil purification: Main engine lube oil gradually becomes contaminated with water (condensation, cooling circuit leaks), sediments (dust, combustion products) and suspended metals (engine wear). Without purification: rapid oil degradation, increased bearing and cylinder wear, reduced oil life. With regular purification: extended oil life (x2 to x4), reduced maintenance costs, friction surface protection, early anomaly detection. Parameters: 85-90°C, low flow (5-15% volume/hour)." },
      { q: "What is the ODMCS and why is it mandatory under MARPOL?", a: "The ODMCS (Oil Discharge Monitoring and Control System) is an automatic system for monitoring and controlling hydrocarbon discharges. Operation: the system continuously measures oil content of water treated by the OWS. If concentration exceeds 15 ppm: automatic alarm, automatic closure of sea discharge valve, automatic opening of recycle valve to sludge tank. Automatic log: the system records all operations (concentration, flow, GPS position) and prints a report. Mandatory under MARPOL Annex I for all vessels > 400 GT. Any bypassing or fraud is a serious criminal offence." },
      { q: "How to calculate the optimal flow rate for an HFO purifier?", a: "Optimal HFO purifier flow rate is calculated based on the purifier's nominal capacity and fuel impurity content. General principle: use 20-60% of nominal capacity. Lower flow gives better separation but risks overflow if bowl is not ejected frequently enough. Higher flow treats more fuel but reduces separation quality. Example: 5 m3/h nominal purifier, heavily loaded fuel → use 30-40% = 1.5-2 m3/h. In duplex system (1 purifier + 1 clarifier in series): adjust flows for optimal treatment by both. Adjust based on effluent analysis (clear water outlet = good sign)." },
      { q: "What are the procedures for restarting a purifier after emergency shutdown?", a: "Restart procedure after emergency shutdown: 1. Identify and correct the cause of emergency shutdown (vibrations, high temperature, overload). 2. If vibrations → eject sludge, inspect bowl for balancing. 3. If high temperature → check heater and steam valve. 4. Check bearing oil levels. 5. Close fuel feed. 6. Start motor unloaded and monitor speed build-up (abnormality → excessive vibration). 7. Introduce sealing water after speed stabilises. 8. Gradually open fuel feed. 9. Monitor parameters (temperature, pressure, vibrations) for at least 15 minutes before switching to automatic mode." },
    ],
    quiz: [
      { q: "At what temperature should HFO be heated to optimise purifier separation?", opts: ["40-50°C", "60-70°C", "85-98°C", "110-120°C"], correct: 2, exp: "HFO must be heated to 85-98°C to reduce viscosity to 10-20 cSt, enabling effective separation. Below this temperature, viscosity is too high and separation performance drops drastically." },
      { q: "What is the gravity disc in a purifier?", opts: ["A particle filter", "A ring determining the oil-water interface position", "A flow regulator", "A vibration damper"], correct: 1, exp: "The gravity disc is a stainless steel ring creating a weir at the bowl top. Its bore diameter determines the oil-water interface position. Too large a bore allows water into the oil; too small, oil passes into the water." },
      { q: "A purifier has 3 outlets. What are they?", opts: ["Oil, water, air", "Clean oil, water + impurities, sludge", "Hot oil, cold oil, sludge", "Inlet, outlet, recirculation"], correct: 1, exp: "A purifier has 3 outlets: clean oil (main outlet), water with impurities (water effluent), and sludge (periodically ejected through bowl peripheral ports)." },
      { q: "What is the maximum oil content allowed by MARPOL for bilge water discharge at sea?", opts: ["5 ppm", "15 ppm", "100 ppm", "1000 ppm"], correct: 1, exp: "MARPOL Annex I limits oil content of bilge water discharged at sea to 15 ppm maximum (more than 12 nautical miles from coast). Beyond this, or in special areas, discharge is totally prohibited." },
      { q: "What happens if the gravity disc is too large in a purifier?", opts: ["Sludge is not ejected", "Water passes into the oil outlet", "Oil passes into the water outlet", "Bowl speed increases"], correct: 1, exp: "If the gravity disc is too large, the oil-water interface moves too far toward the bowl centre. Water reaches the oil zone and exits with clean oil → water in oil outlet. Solution: replace with smaller bore gravity disc." },
    ],
  },

  es: {
    moduleLabel: "MAQUINAS — AUXILIARES",
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
    accidentTitle: "CASO REAL: Contaminacion por hidrocarburos — MV Tropical Breeze (2020)",
    accidentBody: "Un granelero en el Mar Baltico descargo aguas de sentina sin pasar por el separador OWS, desactivando manualmente el monitor ODMCS. La concentracion de hidrocarburos supero los 800 ppm (limite MARPOL: 15 ppm). Detectado por dron de vigilancia costera sueco. Sanciones: multa de 2,1 M EUR, capitan condenado a 18 meses de prision con suspension, buque retenido 10 dias. Leccion: el sistema ODMCS NO debe NUNCA ser neutralizado — responsabilidad penal personal del capitan y jefe de maquinas.",
    summaryTitle: "Puntos esenciales",
    summary: [
      "La separacion centrifuga usa la diferencia de densidad entre aceite, agua y sedimentos",
      "Un purificador (3 salidas) elimina agua y sedimentos — el clarificador (2 salidas) solo solidos",
      "La temperatura de operacion del HFO debe ser 85-98°C para reducir la viscosidad",
      "El gravity disc determina la interfaz aceite-agua — eleccion critica segun la densidad del combustible",
      "MARPOL limita los vertidos al mar a 15 ppm — ODMCS obligatorio en buques > 400 GT",
      "Purificar el aceite lubricante multiplica su vida util por 2 a 4",
    ],
    quizCTA: "COMENZAR EL QUIZ",
    bankStart: "COMENZAR =>",
    bankNext: "Siguiente pregunta =>",
    bankTrophy: "Enhorabuena! Banco completado",
    bankScore: "Puntuacion banco",
    sepTypes: {
      purifier:  { name: "Purificador (Purifier)", desc: "Elimina tanto el agua como los sedimentos. Usa un disco de gravedad para mantener la interfaz aceite-agua. Requiere agua de sellado para crear el sello hidraulico. Usado para HFO y aceite lubricante muy contaminados.", outlet: "3 salidas: aceite limpio / agua + impurezas / lodos" },
      clarifier: { name: "Clarificador (Clarifier)", desc: "Elimina solo los sedimentos solidos — no el agua libre. Sin disco de gravedad ni agua de sellado. Usado cuando el combustible tiene poca agua. En la practica: a menudo usado como 2ª etapa despues de un purificador.", outlet: "2 salidas: aceite + agua (juntos) / lodos solidos" },
    },
    components: {
      bowl:            { name: "Cuenco centrifugo (Bowl)", desc: "Pieza principal del purificador. Gira a muy alta velocidad (6000-10000 rpm). Contiene los discos de separacion apilados. La fuerza centrifuga es 5000-10000 veces la gravedad." },
      discs:           { name: "Discos de separacion",    desc: "Discos conicos apilados a 40-45°. Aumentan la superficie de separacion. El liquido asciende entre los discos en capas finas. Un cuenco puede contener 100-150 discos." },
      gravity_disc:    { name: "Disco de gravedad",       desc: "Anillo de acero inox que determina la posicion de la interfaz aceite-agua. Demasiado grande → agua en la salida de aceite; demasiado pequeno → aceite en la salida de agua. Se elige segun la densidad del combustible." },
      sealing_water:   { name: "Agua de sellado",         desc: "Agua anadida al inicio para crear el sello hidraulico entre aceite y agua. Sin agua de sellado, el aceite pasaria directamente a la camara de agua. Debe ser dulce y limpia." },
      operating_water: { name: "Agua de maniobra",        desc: "Agua a presion para controlar la apertura y cierre del fondo del cuenco durante las eyecciones de lodos. Alta presion (6-8 bar)." },
      heater:          { name: "Calentador (Heater)",     desc: "Calienta el combustible a la temperatura de operacion (85-98°C para HFO). Temperatura insuficiente → viscosidad alta → mala separacion. Temperatura excesiva → vaporizacion y riesgo de incendio." },
    },
    parameters: {
      temperature:  { name: "Temperatura de operacion",   desc: "HFO: 85-98°C. MDO/MGO: 40-50°C. Aceite lubricante: 85-90°C. La temperatura reduce la viscosidad mejorando la separacion." },
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
      { q: "Explique el principio de funcionamiento de un purificador centrifugo para HFO. Por que la fuerza centrifuga es tan eficaz?", a: "Un purificador centrifugo hace girar el combustible a muy alta velocidad en un cuenco. La fuerza centrifuga generada (5000-10000 veces la gravedad) separa los componentes segun su densidad: los solidos se proyectan contra la pared exterior, el agua queda fuera de los discos, el aceite asciende al centro. La fuerza centrifuga es miles de veces mas potente que la gravedad. Los discos apilados a 45° dividen el flujo en capas finas, multiplicando la superficie de separacion." },
      { q: "Como elegir el disco de gravedad correcto para un purificador de HFO?", a: "El disco de gravedad se elige segun la densidad del combustible. Principio: a mayor densidad del HFO, menor debe ser el diametro interior del disco. Metodo: 1. Medir densidad a 15°C. 2. Medir temperatura de operacion. 3. Consultar tabla de seleccion del fabricante. 4. Arrancar y verificar. Si agua sale con aceite → disco demasiado grande. Si aceite sale con agua → disco demasiado pequeno." },
      { q: "Que es el agua de sellado en un purificador y que sucede si desaparece durante la operacion?", a: "El agua de sellado crea el sello hidraulico entre las camaras de aceite y agua. Sin ella, el aceite pasaria directamente a la camara de agua. Si desaparece: la interfaz aceite-agua se rompe, el aceite invade la camara de agua, la salida de agua se carga en aceite. Causas: caudal demasiado alto, temperatura baja, eyeccion accidental. Remedio: parar la alimentacion y reiniciar el sello hidraulico." },
    ],
    bankQuestions: [
      { q: "Cual es la diferencia entre un purificador y un clarificador?", a: "Purificador: elimina agua Y sedimentos. Necesita disco de gravedad y agua de sellado. 3 salidas. Clarificador: elimina solo sedimentos solidos. Sin disco ni agua de sellado. 2 salidas." },
      { q: "Por que se calienta el HFO antes del purificador?", a: "Para reducir la viscosidad (a 95°C cae a 10-20 cSt), mejorar la diferencia de densidad entre aceite y agua, y prevenir el taponamiento de los discos." },
      { q: "Como funciona la eyeccion de lodos en un purificador?", a: "El agua de maniobra (6-8 bar) empuja el piston de fondo hacia abajo, abriendo orificios perifericos. Los lodos y el agua acumulados se eyectan centrifugamente en segundos. Despues se reintroduce el agua de sellado y se reanuda la alimentacion." },
      { q: "Que es el disco de gravedad y por que es tan importante?", a: "Anillo de acero inox que determina la posicion de la interfaz aceite-agua. Demasiado grande → agua en la salida de aceite. Demasiado pequeno → aceite en la salida de agua. Se elige segun la densidad del combustible." },
      { q: "Que verificaciones hacer antes de arrancar un purificador?", a: "1. Nivel de aceite de los cojinetes. 2. Abrir valvulas. 3. Presion agua de maniobra (6-8 bar). 4. Vapor del calentador. 5. Disco de gravedad correcto. 6. Arrancar motor y estabilizar velocidad. 7. Introducir agua de sellado. 8. Abrir alimentacion progresivamente. 9. Verificar salidas." },
      { q: "Que es la perdida de agua de sellado y como detectarla?", a: "Ocurre cuando el agua de sellado es arrastrada o eyectada accidentalmente. La interfaz aceite-agua desaparece y el aceite pasa a la camara de agua. Deteccion: salida de agua turbia o coloreada. Solucion: parar alimentacion, reintroducir agua de sellado." },
      { q: "Cuales son las normas MARPOL sobre los efluentes del separador de aguas oleosas?", a: "MARPOL Anexo I: maximo 15 ppm para descarga en el mar (a mas de 12 millas). Prohibido en zonas especiales. Equipos obligatorios: OWS, ODMCS, registro de hidrocarburos. Los lodos deben descargarse en instalaciones portuarias." },
      { q: "Como se realiza el mantenimiento de los discos de separacion?", a: "1. Desmontar el cuenco. 2. Extraer los discos apilados. 3. Remojo en solvente adecuado. 4. Limpiar con cepillo suave. 5. Enjuagar. 6. Inspeccionar y desechar los danados. 7. Remontar respetando el orden y numero." },
      { q: "Que es el sludge tank y cual es su funcion?", a: "Deposito que recoge los lodos eyectados por los purificadores. Los lodos no pueden verterse al mar (MARPOL). Deben descargarse en instalaciones portuarias. El registro de hidrocarburos rastrea todas las cantidades." },
      { q: "Como optimizar el consumo de energia de un purificador?", a: "Mantener temperatura optima, ajustar caudal correcto, eyectar lodos regularmente, verificar rodamientos, limpiar discos. Un purificador bien mantenido consume un 30-40% menos que uno sucio." },
      { q: "Cuales son las alarmas tipicas de un purificador?", a: "Temperatura baja (viscosidad alta), vibraciones altas (desequilibrio, rodamientos), presion agua de maniobra baja, caudal de agua de salida alto (disco inadecuado), sobreintensidad del motor, velocidad baja." },
      { q: "Por que purificar el aceite lubricante?", a: "El aceite lubricante se contamina con agua, sedimentos y metales. Sin purificacion: degradacion rapida, mayor desgaste. Con purificacion regular: vida util multiplicada por 2-4, reduccion de costes de mantenimiento." },
      { q: "Que es el ODMCS y por que es obligatorio segun MARPOL?", a: "Sistema automatico de vigilancia y control de los vertidos de hidrocarburos. Mide en continuo la concentracion en aceite del agua tratada por el OWS. Si supera 15 ppm: alarma automatica, cierre de la valvula de vertido al mar, apertura de la valvula de recirculacion. Obligatorio en buques > 400 GT. Su neutralizacion es un delito penal grave." },
      { q: "Como calcular el caudal optimo de un purificador de HFO?", a: "Usar 20-60% de la capacidad nominal. Caudal bajo: mejor separacion pero riesgo de desbordamiento si no se eyectan los lodos frecuentemente. Caudal alto: peor separacion pero mayor tratamiento. Ajustar segun el analisis de los efluentes (agua clara en la salida = buena senal)." },
      { q: "Cuales son los procedimientos de rearranque de un purificador tras parada de emergencia?", a: "1. Identificar y corregir la causa. 2. Si vibraciones → eyectar lodos, inspeccionar el cuenco. 3. Si alta temperatura → verificar calentador y valvula de vapor. 4. Verificar niveles de aceite de los cojinetes. 5. Cerrar la alimentacion. 6. Arrancar el motor en vacio. 7. Introducir agua de sellado tras estabilizacion de velocidad. 8. Abrir alimentacion progresivamente. 9. Monitorear durante al menos 15 minutos." },
    ],
    quiz: [
      { q: "A que temperatura hay que calentar el HFO para optimizar la separacion en un purificador?", opts: ["40-50°C", "60-70°C", "85-98°C", "110-120°C"], correct: 2, exp: "El HFO debe calentarse a 85-98°C para reducir su viscosidad a 10-20 cSt. Por debajo de esta temperatura, la viscosidad es demasiado alta y el rendimiento de separacion cae drasticamente." },
      { q: "Que es el disco de gravedad en un purificador?", opts: ["Un filtro de particulas", "Un anillo que determina la posicion de la interfaz aceite-agua", "Un regulador de caudal", "Un amortiguador de vibraciones"], correct: 1, exp: "El disco de gravedad es un anillo de acero inox que crea un vertedero en el cuenco. Su diametro interior determina la posicion de la interfaz aceite-agua." },
      { q: "Un purificador tiene 3 salidas. Cuales son?", opts: ["Aceite, agua, aire", "Aceite limpio, agua + impurezas, lodos", "Aceite caliente, aceite frio, lodos", "Entrada, salida, recirculacion"], correct: 1, exp: "Un purificador tiene 3 salidas: aceite limpio (salida principal), agua con impurezas (efluente agua) y lodos (eyectados periodicamente por los orificios perifericos del cuenco)." },
      { q: "Cual es el contenido maximo de aceite permitido por MARPOL para el vertido de aguas de sentina al mar?", opts: ["5 ppm", "15 ppm", "100 ppm", "1000 ppm"], correct: 1, exp: "MARPOL Anexo I limita el contenido de aceite de las aguas de sentina a 15 ppm maximo (a mas de 12 millas nauticas de la costa). En zonas especiales, el vertido esta totalmente prohibido." },
      { q: "Que ocurre si el disco de gravedad es demasiado grande?", opts: ["Los lodos no se eyectan", "El agua pasa a la salida de aceite", "El aceite pasa a la salida de agua", "La velocidad del cuenco aumenta"], correct: 1, exp: "Si el disco de gravedad es demasiado grande, la interfaz aceite-agua se desplaza demasiado hacia el centro. El agua llega a la zona de aceite y sale con el aceite limpio → agua en la salida de aceite." },
    ],
  },

  pt: {
    moduleLabel: "MAQUINAS — AUXILIARES",
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
    accidentTitle: "CASO REAL: Poluicao por hidrocarbonetos — MV Tropical Breeze (2020)",
    accidentBody: "Um graneleiro no Mar Baltico descarregou aguas de sentina sem passar pelo separador OWS, desativando manualmente o monitor ODMCS. A concentracao de hidrocarbonetos ultrapassou 800 ppm (limite MARPOL: 15 ppm). Detetado por drone de vigilancia costeira sueco. Sancoes: multa de 2,1 M EUR, capitao condenado a 18 meses de prisao com suspensao, navio detido 10 dias. Licao: o sistema ODMCS NUNCA deve ser neutralizado — responsabilidade penal pessoal do capitao e chefe de maquinas.",
    summaryTitle: "Pontos essenciais",
    summary: [
      "A separacao centrifuga usa a diferenca de densidade entre oleo, agua e sedimentos",
      "Um purificador (3 saidas) elimina agua e sedimentos — o clarificador (2 saidas) so solidos",
      "A temperatura de operacao do HFO deve ser 85-98°C para reduzir a viscosidade",
      "O gravity disc determina a interface oleo-agua — escolha critica conforme a densidade do combustivel",
      "MARPOL limita as descargas no mar a 15 ppm — ODMCS obrigatorio em navios > 400 GT",
      "Purificar o oleo lubrificante multiplica a sua vida util por 2 a 4",
    ],
    quizCTA: "COMECAR O QUIZ",
    bankStart: "COMECAR =>",
    bankNext: "Proxima pergunta =>",
    bankTrophy: "Parabens! Banco concluido",
    bankScore: "Pontuacao banco",
    sepTypes: {
      purifier:  { name: "Purificador", desc: "Elimina tanto a agua como os sedimentos. Usa um disco de gravidade para manter a interface oleo-agua. Requer agua de vedacao para criar o selo hidraulico. Usado para HFO e oleo lubrificante muito contaminados.", outlet: "3 saidas: oleo limpo / agua + impurezas / lamas" },
      clarifier: { name: "Clarificador", desc: "Elimina apenas os sedimentos solidos — nao a agua livre. Sem disco de gravidade nem agua de vedacao. Usado quando o combustivel tem pouca agua. Na pratica: usado como 2ª fase apos um purificador.", outlet: "2 saidas: oleo + agua (juntos) / lamas solidas" },
    },
    components: {
      bowl:            { name: "Tigela centrifuga (Bowl)", desc: "Peca principal do purificador. Roda a muito alta velocidade (6000-10000 rpm). Contem os discos de separacao empilhados. A forca centrifuga e 5000-10000 vezes a gravidade." },
      discs:           { name: "Discos de separacao",     desc: "Discos conicos empilhados a 40-45°. Aumentam a superficie de separacao. O liquido sobe entre os discos em camadas finas. Uma tigela pode ter 100-150 discos." },
      gravity_disc:    { name: "Disco de gravidade",      desc: "Anel de aco inox que determina a posicao da interface oleo-agua. Muito grande → agua na saida de oleo; muito pequeno → oleo na saida de agua. Escolhido conforme a densidade do combustivel." },
      sealing_water:   { name: "Agua de vedacao",         desc: "Agua adicionada no inicio para criar o selo hidraulico entre oleo e agua. Sem agua de vedacao, o oleo passaria diretamente para a camara de agua. Deve ser doce e limpa." },
      operating_water: { name: "Agua de manobra",         desc: "Agua sob pressao para controlar a abertura e fecho do fundo da tigela durante as ejecoes de lamas. Alta pressao (6-8 bar)." },
      heater:          { name: "Aquecedor (Heater)",      desc: "Aquece o combustivel a temperatura de operacao (85-98°C para HFO). Temperatura insuficiente → viscosidade alta → ma separacao. Temperatura excessiva → vaporizacao e risco de incendio." },
    },
    parameters: {
      temperature:  { name: "Temperatura de operacao",    desc: "HFO: 85-98°C. MDO/MGO: 40-50°C. Oleo lubrificante: 85-90°C. A temperatura reduz a viscosidade melhorando a separacao." },
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
      { q: "Explique o principio de funcionamento de um purificador centrifugo para HFO. Por que a forca centrifuga e tao eficaz?", a: "Um purificador centrifugo faz rodar o combustivel a muito alta velocidade numa tigela. A forca centrifuga gerada (5000-10000 vezes a gravidade) separa os componentes por densidade: os solidos sao projetados para a parede exterior, a agua deposita-se fora dos discos, o oleo sobe ao centro. A forca centrifuga e milhares de vezes mais poderosa que a gravidade. Os discos empilhados a 45° dividem o fluxo em camadas finas, multiplicando a superficie de separacao." },
      { q: "Como escolher o disco de gravidade correto para um purificador de HFO?", a: "O disco de gravidade e escolhido conforme a densidade do combustivel. Principio: quanto maior a densidade do HFO, menor deve ser o diametro interior. Metodo: 1. Medir densidade a 15°C. 2. Medir temperatura de operacao. 3. Consultar tabela do fabricante. 4. Arrancar e verificar. Se agua sai com oleo → disco muito grande. Se oleo sai com agua → disco muito pequeno." },
      { q: "O que e a agua de vedacao num purificador e o que acontece se desaparecer durante a operacao?", a: "A agua de vedacao cria o selo hidraulico entre as camaras de oleo e agua. Sem ela, o oleo passaria diretamente para a camara de agua. Se desaparecer: a interface oleo-agua rompe-se, o oleo invade a camara de agua, a saida de agua fica carregada de oleo. Causas: caudal muito alto, temperatura baixa, ejecao acidental. Remedio: parar a alimentacao e reiniciar o selo hidraulico." },
    ],
    bankQuestions: [
      { q: "Qual e a diferenca entre um purificador e um clarificador?", a: "Purificador: elimina agua E sedimentos. Necessita disco de gravidade e agua de vedacao. 3 saidas. Clarificador: elimina apenas sedimentos solidos. Sem disco nem agua de vedacao. 2 saidas." },
      { q: "Por que se aquece o HFO antes do purificador?", a: "Para reduzir a viscosidade (a 95°C cai para 10-20 cSt), melhorar a diferenca de densidade entre oleo e agua, e prevenir o entupimento dos discos." },
      { q: "Como funciona a ejecao de lamas num purificador?", a: "A agua de manobra (6-8 bar) empurra o pistao do fundo para baixo, abrindo orifficios perifericos. As lamas e a agua acumuladas sao ejetadas centrifugamente em segundos. Depois reintroduz-se a agua de vedacao e retoma-se a alimentacao." },
      { q: "O que e o disco de gravidade e por que e tao importante?", a: "Anel de aco inox que determina a posicao da interface oleo-agua. Muito grande → agua na saida de oleo. Muito pequeno → oleo na saida de agua. Escolhido conforme a densidade do combustivel." },
      { q: "Que verificacoes fazer antes de arrancar um purificador?", a: "1. Nivel de oleo dos rolamentos. 2. Abrir valvulas. 3. Pressao agua de manobra (6-8 bar). 4. Vapor do aquecedor. 5. Disco de gravidade correto. 6. Arrancar motor e estabilizar velocidade. 7. Introduzir agua de vedacao. 8. Abrir alimentacao progressivamente. 9. Verificar saidas." },
      { q: "O que e a perda de agua de vedacao e como deteta-la?", a: "Ocorre quando a agua de vedacao e arrastada ou ejetada acidentalmente. A interface oleo-agua desaparece e o oleo passa para a camara de agua. Detetacao: saida de agua turva ou colorida. Solucao: parar alimentacao, reintroduzir agua de vedacao." },
      { q: "Quais sao as normas MARPOL sobre os efluentes do separador de aguas oleosas?", a: "MARPOL Anexo I: maximo 15 ppm para descarga no mar (a mais de 12 milhas). Proibido em zonas especiais. Equipamentos obrigatorios: OWS, ODMCS, registo de hidrocarbonetos. As lamas devem ser descarregadas em instalacoes portuarias." },
      { q: "Como se realiza a manutencao dos discos de separacao?", a: "1. Desmontar a tigela. 2. Extrair os discos empilhados. 3. Imersao em solvente adequado. 4. Limpar com escova suave. 5. Enxaguar. 6. Inspecionar e descartar os danificados. 7. Remontar respeitando a ordem e numero." },
      { q: "O que e o sludge tank e qual e a sua funcao?", a: "Reservatorio que recolhe as lamas ejetadas pelos purificadores. As lamas nao podem ser descarregadas no mar (MARPOL). Devem ser descarregadas em instalacoes portuarias. O registo de hidrocarbonetos regista todas as quantidades." },
      { q: "Como otimizar o consumo de energia de um purificador?", a: "Manter temperatura otima, ajustar caudal correto, ejetar lamas regularmente, verificar rolamentos, limpar discos. Um purificador bem mantido consome 30-40% menos do que um sujo." },
      { q: "Quais sao os alarmes tipicos de um purificador?", a: "Temperatura baixa (viscosidade alta), vibracoes altas (desequilibrio, rolamentos), pressao agua de manobra baixa, caudal de agua de saida alto (disco inadequado), sobreintensidade do motor, velocidade baixa." },
      { q: "Por que purificar o oleo lubrificante?", a: "O oleo lubrificante contamina-se com agua, sedimentos e metais. Sem purificacao: degradacao rapida, maior desgaste. Com purificacao regular: vida util multiplicada por 2-4, reducao de custos de manutencao." },
      { q: "O que e o ODMCS e por que e obrigatorio segundo o MARPOL?", a: "Sistema automatico de vigilancia e controlo das descargas de hidrocarbonetos. Mede em continuo a concentracao em oleo da agua tratada pelo OWS. Se superar 15 ppm: alarme automatico, fecho da valvula de descarga no mar, abertura da valvula de recirculacao. Obrigatorio em navios > 400 GT. A sua neutralizacao e um crime grave." },
      { q: "Como calcular o caudal otimo de um purificador de HFO?", a: "Usar 20-60% da capacidade nominal. Caudal baixo: melhor separacao mas risco de transbordo se as lamas nao forem ejetadas frequentemente. Caudal alto: pior separacao mas maior tratamento. Ajustar com base na analise dos efluentes (agua clara na saida = bom sinal)." },
      { q: "Quais sao os procedimentos de rearranque de um purificador apos paragem de emergencia?", a: "1. Identificar e corrigir a causa. 2. Se vibracoes → ejetar lamas, inspecionar tigela. 3. Se alta temperatura → verificar aquecedor e valvula de vapor. 4. Verificar niveis de oleo dos rolamentos. 5. Fechar a alimentacao. 6. Arrancar o motor em vazio. 7. Introduzir agua de vedacao apos estabilizacao da velocidade. 8. Abrir alimentacao progressivamente. 9. Monitorizar durante pelo menos 15 minutos." },
    ],
    quiz: [
      { q: "A que temperatura deve ser aquecido o HFO para otimizar a separacao num purificador?", opts: ["40-50°C", "60-70°C", "85-98°C", "110-120°C"], correct: 2, exp: "O HFO deve ser aquecido a 85-98°C para reduzir a viscosidade a 10-20 cSt. Abaixo desta temperatura, a viscosidade e demasiado alta e o desempenho de separacao cai drasticamente." },
      { q: "O que e o disco de gravidade num purificador?", opts: ["Um filtro de particulas", "Um anel que determina a posicao da interface oleo-agua", "Um regulador de caudal", "Um amortecedor de vibracoes"], correct: 1, exp: "O disco de gravidade e um anel de aco inox que cria um descarregador na tigela. O seu diametro interior determina a posicao da interface oleo-agua." },
      { q: "Um purificador tem 3 saidas. Quais sao?", opts: ["Oleo, agua, ar", "Oleo limpo, agua + impurezas, lamas", "Oleo quente, oleo frio, lamas", "Entrada, saida, recirculacao"], correct: 1, exp: "Um purificador tem 3 saidas: oleo limpo (saida principal), agua com impurezas (efluente agua) e lamas (ejetadas periodicamente pelos orificios perifericos da tigela)." },
      { q: "Qual e o teor maximo de oleo permitido pelo MARPOL para a descarga de aguas de sentina no mar?", opts: ["5 ppm", "15 ppm", "100 ppm", "1000 ppm"], correct: 1, exp: "O MARPOL Anexo I limita o teor de oleo das aguas de sentina a 15 ppm maximo (a mais de 12 milhas nauticas da costa). Nas zonas especiais, a descarga e totalmente proibida." },
      { q: "O que acontece se o disco de gravidade for demasiado grande?", opts: ["As lamas nao sao ejetadas", "A agua passa para a saida de oleo", "O oleo passa para a saida de agua", "A velocidade da tigela aumenta"], correct: 1, exp: "Se o disco de gravidade for demasiado grande, a interface oleo-agua desloca-se demasiado para o centro. A agua atinge a zona de oleo e sai com o oleo limpo → agua na saida de oleo." },
    ],
  },
};

// ── SVG 1 — SEPARATION TYPES ─────────────────────────────────
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
        <text x="80" y="162" fontSize="7" fill={C.purple} fontFamily="Courier New" textAnchor="middle">PURIFIER — 3 OUTLETS</text>
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
        <text x="80" y="162" fontSize="7" fill={C.cyan} fontFamily="Courier New" textAnchor="middle">CLARIFIER — 2 OUTLETS</text>
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

// ── SVG 2 — COMPONENTS ───────────────────────────────────────
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

// ── SVG 3 — PARAMETERS ───────────────────────────────────────
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

// ── SVG 4 — FAULTS ───────────────────────────────────────────
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
// LessonE2_L3 — Purificateurs & Separateurs | PART 2

export default function LessonE2_L3({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
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

  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankAns(false);setBankScore(0);setBankDone(false);};
  const bankNext=()=>{if(bankCur+1>=bank.length){setBankDone(true);return;}setBankCur(c=>c+1);setBankAns(false);};
  const handleQConf=()=>{if(qSel===null)return;setQConf(true);if(qSel===quiz[qCur].correct)setQScore(s=>s+1);};
  const handleQNext=()=>{if(qCur+1>=quiz.length){setPhase("done");if(onComplete)onComplete(xpFinal);return;}setQCur(c=>c+1);setQSel(null);setQConf(false);};

  const header=(sub:string)=>(
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.purple}33`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
        <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>&#9664;</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:C.purple,marginBottom:2}}>{t.moduleLabel} · L3{sub?" · "+sub:""}</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.white,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
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
                <div style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:`${C.navy2}cc`,border:`1px solid ${C.blue}22`}}>{bank[bankCur].q}</div>
                <button onClick={()=>setBankAns(true)} disabled={bankAns} style={{padding:"8px 16px",borderRadius:8,fontSize:11,cursor:bankAns?"default":"pointer",background:bankAns?`${C.purple}22`:"rgba(255,255,255,0.06)",border:`1px solid ${bankAns?C.purple:"rgba(255,255,255,0.15)"}`,color:bankAns?C.purple:"rgba(240,244,255,0.5)",fontFamily:"Courier New",marginBottom:bankAns?10:0}}>{bankAns?t.hideAnswer:t.showAnswer}</button>
                {bankAns&&(<div><div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.purple}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{bank[bankCur].a}</div><button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,${C.purple},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?t.bankTrophy:t.bankNext}</button></div>)}
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

        <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"16px 0",borderRadius:14,background:`linear-gradient(135deg,${C.purple},${C.cyan})`,border:"none",fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>🔄 {t.quizCTA}</button>
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
