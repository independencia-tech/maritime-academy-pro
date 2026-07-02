// LessonE2_L2 — Compresseurs & Systemes Air | PART 1
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
    accidentTitle: "CAS REEL : Explosion tuyauterie air comprime — MV Pacific Star (2017)",
    accidentBody: "Sur un porte-conteneurs en Atlantique Nord, une explosion dans la tuyauterie d'air de demarrage tue un mecanicien et blesse deux autres. Enquete : huile accumulee dans la tuyauterie suite a un separateur defaillant. A 29 bar et 180°C, le melange air-huile s'est enflamme spontanement (effet diesel). Cause racine : le purgeur automatique du separateur etait colmate depuis 6 semaines sans signalement. Les filtres separateurs n'avaient pas ete inspectes depuis 14 mois. Recommandation IMO MSC : inspection mensuelle obligatoire des separateurs d'huile, purge manuelle quotidienne des bouteilles, analyse des condensats tous les 3 mois.",
    summaryTitle: "Points essentiels",
    summary: [
      "Les bouteilles d'air de demarrage sont chargees a 25-30 bar — 12 demarrages min. (SOLAS)",
      "La compression multi-etagee avec intercooler reduit la puissance de 15-30%",
      "L'humidite et l'huile dans l'air comprime sont mortelles — purgeurs et separateurs obligatoires",
      "La soupape de surete est reglee a 10% au-dessus de la pression de service",
      "Purger systematiquement les bouteilles avant chaque demarrage du moteur principal",
      "Point de rosee air instrument < -40°C ; air de service < +3°C",
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
      intercooler: { name: "Refrigerant interetage (Intercooler)", desc: "Refroidit l'air entre les etages de compression pour ameliorer le rendement et reduire la temperature. Sans intercooler, la temperature peut depasser 300°C, detruisant les joints et les huiles." },
      aftercooler: { name: "Refrigerant final (Aftercooler)",   desc: "Refroidit l'air apres la compression finale pour condenser l'humidite. Permet d'eliminer 80-90% de l'humidite avant le secheur." },
      separator:   { name: "Separateur eau/huile",             desc: "Elimine l'eau condensee et les traces d'huile de l'air comprime. Equipe d'un purgeur automatique. Obligatoire avant les bouteilles de demarrage pour eviter les coups d'eau dans le moteur." },
      bottle:      { name: "Bouteille d'air (reservoir)",      desc: "Stocke l'air comprime. Bouteilles de demarrage : 25-30 bar, volume calcule pour 12 demarrages consecutifs (SOLAS). Equipees d'une soupape de surete, d'un manometre, d'un purgeur et d'une vanne de sectionnement." },
      dryer:       { name: "Secheur d'air",                    desc: "Elimine l'humidite residuelle par adsorption (gel de silice) ou refrigeration. Obligatoire pour les circuits d'instruments, de commandes pneumatiques. Point de rosee < -40°C requis pour l'air instrument." },
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
      { q: "Pourquoi la compression de l'air s'effectue-t-elle en plusieurs etages avec refroidissement interetage ? Quels sont les avantages ?", a: "La compression d'air en plusieurs etages avec refroidissement interetage presente plusieurs avantages essentiels : 1. Efficacite energetique : refroidir l'air entre les etages rapproche le cycle de la compression isotherme (ideale), reduisant la puissance necessaire de 15-30% par rapport a une compression adiabatique. 2. Controle de la temperature : sans refroidissement, la temperature peut depasser 300-400°C a 25 bar, detruisant les joints, les huiles et risquant l'inflammation des huiles (explosion). 3. Meilleure densite : l'air refroidi est plus dense, permettant a l'etage suivant de traiter plus de masse par cycle. 4. Duree de vie : les temperatures reduites preservent les joints, les soupapes et les segments." },
      { q: "Qu'est-ce qu'un coup d'eau dans un moteur diesel et comment l'air comprime peut-il en etre la cause ?", a: "Un coup d'eau se produit quand de l'eau penetre dans les cylindres d'un moteur diesel pendant la compression ou la combustion. L'eau etant incompressible, elle cause une surpression instantanee qui peut plier ou briser la bielle et le piston. Mecanisme via l'air comprime : si les bouteilles d'air de demarrage contiennent de l'eau condensee (defaut de purge ou de sechage), cette eau est injectee dans les cylindres lors du demarrage avec l'air. Prevention : purger systematiquement les bouteilles et separateurs avant chaque demarrage, verifier le bon fonctionnement des purgeurs automatiques, utiliser un secheur d'air efficace." },
      { q: "Quelles sont les precautions a prendre avant d'effectuer une maintenance sur un compresseur d'air a haute pression ?", a: "Precautions obligatoires (consignation LOTO) : 1. Isolation electrique : couper l'alimentation electrique du moteur et cadenasser le disjoncteur. 2. Isolement pneumatique : fermer les vannes d'isolement des bouteilles et du circuit aval, depressuriser le circuit jusqu'au compresseur. 3. Verification de la depressurisation : controler les manometres de chaque etage — pression = 0 bar. 4. Ventilation : si travail dans un espace confine, s'assurer d'une ventilation suffisante (risque d'enrichissement en O2 ou de vapeurs d'huile). 5. Mise en place de la signalisation : afficher 'En cours de maintenance — Ne pas demarrer'. 6. Attente du refroidissement. 7. Outils adaptes : utiliser uniquement des outils compatibles avec l'air comprime (pas d'outil avec residus de graisse)." },
    ],
    bankQuestions: [
      { q: "Pourquoi les bouteilles d'air de demarrage doivent-elles etre purgees avant chaque demarrage du moteur principal ?", a: "Les bouteilles d'air de demarrage doivent etre purgees avant chaque demarrage pour eliminer l'eau condensee qui s'accumule dans le fond de la bouteille. Si cette eau entre dans les cylindres du moteur principal avec l'air de demarrage, elle peut provoquer un coup d'eau : l'eau etant incompressible, la pression augmente instantanement et peut plier ou briser les bielles et pistons. La purge elimine aussi les traces d'huile provenant du compresseur. Procedure : ouvrir le robinet de purge en bas de la bouteille jusqu'a ce que seul de l'air sec sorte." },
      { q: "Quelle est la pression reglementaire des bouteilles d'air de demarrage selon SOLAS ?", a: "Selon SOLAS, les bouteilles d'air de demarrage doivent avoir une capacite suffisante pour effectuer au moins 12 demarrages consecutifs du moteur principal sans recharge. La pression de service est generalement de 25-30 bar. Chaque bouteille est equipee d'une soupape de surete reglee a 10% au-dessus de la pression de service (soit environ 27,5 a 33 bar), d'un manometre visible, d'un robinet de purge et d'une vanne de sectionnement. Les bouteilles sont soumises a des tests hydrostatiques periodiques (tous les 5 ans)." },
      { q: "Expliquez le cycle de compression d'un compresseur a pistons en deux etages.", a: "Etage 1 (Basse pression) : L'air atmospherique entre a 1 bar par le filtre d'aspiration. Le piston descend (aspiration) et monte (compression). La soupape de refoulement du 1er etage s'ouvre quand la pression atteint ~5-7 bar. L'air est envoye au refrigerant interetage (intercooler) ou sa temperature est ramenee a ~40°C. Etage 2 (Haute pression) : L'air refroidi et plus dense entre dans le cylindre HP. Le piston comprime jusqu'a 25-30 bar. L'air est refroidi dans le refrigerant final (aftercooler). L'eau condensee est separee dans le separateur avant d'atteindre la bouteille." },
      { q: "Qu'est-ce qu'un purgeur automatique et comment fonctionne-t-il sur un circuit d'air comprime ?", a: "Un purgeur automatique est un dispositif qui elimine automatiquement l'eau condensee et les impuretes d'un circuit d'air comprime sans laisser fuir l'air comprime. Types principaux : Purgeur a flotteur : un flotteur monte avec l'eau accumulee et ouvre automatiquement une vanne de purge quand un certain niveau est atteint. Purgeur electronique : declenche une ouverture temporisee (ex : toutes les 30 minutes pendant 5 secondes). Purgeur thermodynamique : utilise la difference de pression et de temperature entre l'air et le condensat. Un purgeur defaillant laisse s'accumuler l'eau, risquant le coup d'eau ou la corrosion." },
      { q: "Quelles sont les consequences d'une contamination par l'huile dans l'air de demarrage ?", a: "La contamination par l'huile dans l'air de demarrage a plusieurs consequences graves : 1. Depots dans les vannes de demarrage : l'huile brulee forme des depots carbonnes qui peuvent colmater les vannes de demarrage des cylindres, empechant leur ouverture. 2. Risque d'explosion : l'huile melangee a l'air comprime a haute temperature peut provoquer une explosion dite 'diesel' dans la tuyauterie de demarrage (le melange air-huile s'enflamme spontanement). 3. Contamination moteur : l'huile entre dans les cylindres et perturbe la combustion. Causes : usure excessive des segments de piston du compresseur, niveau d'huile trop eleve dans le carter. Prevention : filtres separateurs d'huile, surveillance de l'etat des segments." },
      { q: "Qu'est-ce que la soupape de surete d'un compresseur et a quelle pression est-elle reglee ?", a: "La soupape de surete est un dispositif de protection obligatoire qui s'ouvre automatiquement pour evacuer l'exces de pression si la pression de service est depassee. Elle protege le compresseur, les canalisations et les bouteilles contre les surpressions dangereuses. Reglage : la soupape de surete est reglee a 10% au-dessus de la pression maximale de service. Exemple : pour une bouteille de 25 bar, la soupape s'ouvre a 27,5 bar. Pour une bouteille de 30 bar, elle s'ouvre a 33 bar. La soupape doit etre testee regulierement (mensuelle/annuelle selon le PMS) et recalibree si necessaire." },
      { q: "Quelle est la difference entre l'air de demarrage et l'air de service a bord ?", a: "Air de demarrage (Starting air) : haute pression (25-30 bar), stocke dans les bouteilles principales, utilise pour demarrer le moteur principal et les gros auxiliaires. Circuit securise SOLAS (12 demarrages minimum). Purge et sechage obligatoires. Air de service (Service air / Working air) : basse pression (6-7 bar), produit par un compresseur de service independant, utilise pour les outils pneumatiques, le nettoyage, la commande des vannes automatiques. Air instrument : tres sec (point de rosee < -40°C), utilise pour les instruments de mesure pneumatiques." },
      { q: "Comment verifier l'efficacite d'un refrigerant interetage (intercooler) sur un compresseur ?", a: "Verification de l'efficacite de l'intercooler : 1. Mesure des temperatures : comparer la temperature d'entree et de sortie de l'air. Un intercooler efficace doit ramener la temperature de l'air a moins de 40-50°C au-dessus de la temperature de l'eau de refroidissement (approche thermique). 2. Mesure des pressions : la perte de charge a travers l'intercooler ne doit pas depasser 0,3 bar. 3. Controle de l'eau de refroidissement : verifier le debit et la temperature (entree et sortie). 4. Analyse de l'eau de condensat : la quantite d'eau purgee apres l'intercooler indique son efficacite de refroidissement." },
      { q: "Quels tests doit-on effectuer sur une bouteille d'air comprime et a quelle frequence ?", a: "Tests sur les bouteilles d'air comprime : Test de pression hydrostatique (tous les 5 ans) : la bouteille est remplie d'eau (pas d'air) et pressurisee a 1,5 fois la pression de service. Permet de detecter les fissures et deformations. Inspection visuelle interne (tous les 2,5 ans) : inspection endoscopique de l'interieur pour detecter la corrosion, les depots et les fissures. Verification des equipements : soupape de surete (annuelle), manometre (annuelle), robinet de purge (mensuelle). Ces tests sont obligatoires selon les reglements de la societe de classification et doivent etre documentes." },
      { q: "Qu'est-ce que le point de rosee de l'air comprime et pourquoi est-il important ?", a: "Le point de rosee est la temperature a laquelle la vapeur d'eau contenue dans l'air comprime commence a se condenser en eau liquide. Il depend de la teneur en humidite et de la pression. Un point de rosee trop eleve entraine formation d'eau liquide dans les conduites (corrosion, gel par temps froid, coup d'eau), defaillance des instruments pneumatiques (eau dans les capteurs), corrosion des bouteilles. Norme : air instrument : point de rosee < -40°C (secheur a adsorption necessaire). Air de service : point de rosee < +3°C. Mesure : hygrometre ou point de rosee-metre." },
      { q: "Comment fonctionne le demarrage pneumatique d'un moteur diesel principal ?", a: "Demarrage pneumatique du moteur principal : 1. Condition prealable : verifier que le virage au vireur a ete effectue (pas de coup d'eau), vanne d'air de demarrage principale ouverte, pression des bouteilles suffisante (min 15-17 bar selon constructeur). 2. Ordre de demarrage : l'operateur agit sur le telegraphe ou le pupitre. Le distributeur d'air de demarrage (starting air distributor) repartit l'air dans les vannes de demarrage de chaque cylindre dans l'ordre d'allumage. 3. Demarrage : l'air a 25-30 bar est injecte dans les cylindres l'un apres l'autre, faisant tourner le vilebrequin. Quand la vitesse est suffisante (~80-100 tr/min), le combustible est injecte et le moteur demarre." },
      { q: "Quelles precautions prendre lors de l'ouverture d'un circuit d'air comprime a haute pression ?", a: "Precautions obligatoires : 1. Depressurisation complete : verifier que la pression est a 0 bar sur TOUS les manometres du circuit concerne. 2. Isolement : fermer les vannes de sectionnement en amont et en aval, mettre en place des brides d'obturation si necessaire. 3. Attente du refroidissement : ne pas ouvrir un circuit chaud (brulures et risque d'auto-inflammation des huiles). 4. Utilisation d'equipements adaptes : cles dynamometriques calibrees, joints neufs (jamais reutiliser un vieux joint). 5. Controle des boulons : verifier l'etat de tous les boulons de bride (corrosion, filetage). 6. Test d'etancheite : monter progressivement en pression et verifier l'absence de fuites a chaque palier." },
      { q: "Qu'est-ce que l'effet diesel dans une tuyauterie d'air comprime et comment le prevenir ?", a: "L'effet diesel (ou auto-inflammation) se produit dans une tuyauterie d'air comprime quand un melange air-huile est comprime brusquement (par exemple lors de l'ouverture rapide d'une vanne). La temperature instantanee peut atteindre le point d'auto-inflammation de l'huile, provoquant une explosion violente dans la tuyauterie. Facteurs favorisants : huile accumulee (separateur defaillant), temperatures elevees (compresseur surchauffe), haute pression (> 20 bar). Prevention obligatoire : separation systematique de l'huile par separateurs et filtres, purge reguliere des condensats, surveillance des temperatures de compression, materiaux inoxydables dans les tuyauteries HP, utilisation d'huiles speciales 'air comprime' a haute temperature d'auto-inflammation." },
      { q: "Comment calculer le volume necessaire des bouteilles d'air de demarrage ?", a: "Calcul du volume des bouteilles d'air de demarrage (SOLAS Reg. II-1/34) : La regle SOLAS impose 12 demarrages consecutifs pour un moteur a double sens de marche (reversible) ou 6 demarrages pour un moteur a sens unique avec machine arriere a vapeur ou electrique. Formule simplifiee : V (m3) = (n x V_cyl x Pbarre_moyen) / (P_bouteille - P_min). Ou n = nombre de demarrages requis, V_cyl = cylindree totale du moteur (m3), Pbarre_moyen = pression moyenne necessaire pour demarrer (~3-5 bar), P_bouteille = pression initiale bouteille (25-30 bar), P_min = pression minimale de demarrage (15-17 bar). En pratique, les bouteilles sont calculees par le constructeur et verifiees lors des tests de mise en service." },
      { q: "Quelles sont les regles de classification ISM/SMS pour la maintenance des compresseurs d'air ?", a: "Les regles ISM/SMS pour la maintenance des compresseurs d'air incluent : 1. Planned Maintenance System (PMS) : chaque compresseur a un programme de maintenance avec intervalles definis (heures de fonctionnement ou calendaire), liste des pieces a inspecter/remplacer, procedures d'intervention documentees. 2. Oil Record Book : les operations de purge et d'entretien des separateurs d'huile doivent etre consignees (risque de rejet d'huile via le condensat). 3. Certificats d'epreuve des bouteilles (tous les 5 ans) avec societe de classification. 4. Suivi des defauts : tout defaut constate doit etre consigne dans le journal de bord technique et signale au chef mecanicien. 5. Pieces de rechange obligatoires : les societes de classification exigent un stock minimum de pieces critiques (soupapes, segments, joints) a bord." },
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
    moduleLabel: "ENGINE — AUXILIARIES",
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
    accidentTitle: "REAL CASE: Starting air line explosion — MV Pacific Star (2017)",
    accidentBody: "On a container vessel in the North Atlantic, an explosion in the starting air piping killed one engineer and injured two others. Investigation: oil accumulated in the piping from a faulty separator. At 29 bar and 180°C, the air-oil mixture auto-ignited (diesel effect). Root cause: the automatic drain on the separator had been clogged for 6 weeks without being reported. Oil separator filters had not been inspected for 14 months. IMO MSC recommendation: mandatory monthly inspection of oil separators, daily manual drainage of bottles, condensate analysis every 3 months.",
    summaryTitle: "Key Points",
    summary: [
      "Starting air bottles charged to 25-30 bar — 12 starts min. (SOLAS)",
      "Multi-stage compression with intercooler reduces power consumption by 15-30%",
      "Moisture and oil in compressed air are deadly — drains and separators are mandatory",
      "Safety valve set at 10% above service pressure",
      "Systematically drain bottles before each main engine start",
      "Instrument air dew point < -40°C; service air dew point < +3°C",
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
      intercooler: { name: "Intercooler",    desc: "Cools air between compression stages to improve efficiency and reduce temperature. Without intercooling, temperature can exceed 300°C, destroying seals and oils." },
      aftercooler: { name: "Aftercooler",    desc: "Cools air after final compression to condense moisture. Removes 80-90% of moisture before the dryer." },
      separator:   { name: "Water/oil separator", desc: "Removes condensed water and oil traces from compressed air. Equipped with automatic drain. Mandatory before starting bottles to prevent water slugs in the engine." },
      bottle:      { name: "Air bottle (reservoir)", desc: "Stores compressed air. Starting bottles: 25-30 bar, volume calculated for 12 consecutive starts (SOLAS). Equipped with safety valve, pressure gauge, drain and isolation valve." },
      dryer:       { name: "Air dryer",      desc: "Removes residual moisture by adsorption (silica gel) or refrigeration. Mandatory for instrument air circuits. Required dew point < -40°C for instrument air." },
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
      { q: "Why is air compression performed in multiple stages with interstage cooling? What are the advantages?", a: "Multi-stage compression with interstage cooling offers several key advantages: 1. Energy efficiency: cooling air between stages approximates isothermal compression (ideal), reducing required power by 15-30% vs adiabatic compression. 2. Temperature control: without cooling, temperature can exceed 300-400°C at 25 bar, destroying seals, oils and risking oil ignition (explosion). 3. Better density: cooled air is denser, allowing the next stage to process more mass per cycle. 4. Service life: reduced temperatures preserve seals, valves and rings. A 2-stage compressor with intercooler is about 15% more efficient than an equivalent single-stage." },
      { q: "What is a water slug in a diesel engine and how can compressed air cause one?", a: "A water slug occurs when water enters diesel engine cylinders during compression or combustion. Water being incompressible causes instant overpressure that can bend or break connecting rods and pistons. Compressed air mechanism: if starting air bottles contain condensed water (faulty draining or drying), this water is injected into cylinders with the starting air. The compression heat vaporises it brutally, creating hydraulic shock. Prevention: systematically drain bottles and separators before each start, verify automatic drain operation, use an effective air dryer." },
      { q: "What precautions must be taken before performing maintenance on a high-pressure air compressor?", a: "Mandatory precautions (LOTO): 1. Electrical isolation: cut motor power supply and lock out the circuit breaker. 2. Pneumatic isolation: close bottle and downstream circuit isolation valves, depressurise circuit to compressor. 3. Depressurisation verification: check each stage pressure gauge — pressure = 0 bar. 4. Ventilation: if working in confined space, ensure adequate ventilation (O2 enrichment or oil vapour risk). 5. Signage: display 'Under maintenance — Do not start'. 6. Allow cooling: do not work on a hot compressor. 7. Appropriate tools: use only tools compatible with compressed air (no tools with grease residue)." },
    ],
    bankQuestions: [
      { q: "Why must starting air bottles be drained before each main engine start?", a: "Starting air bottles must be drained before each start to remove condensed water that accumulates at the bottom. If this water enters main engine cylinders with starting air, it can cause a water slug: water being incompressible causes instant overpressure that can bend or break connecting rods and pistons. Draining also removes oil traces from the compressor. Procedure: open the drain cock at the bottle bottom until only dry air exits." },
      { q: "What is the SOLAS statutory pressure for starting air bottles?", a: "Per SOLAS, starting air bottles must have sufficient capacity for at least 12 consecutive main engine starts without recharging. Service pressure is generally 25-30 bar. Each bottle is equipped with a safety valve set at 10% above service pressure (approximately 27.5 to 33 bar), a visible pressure gauge, drain cock and isolation valve. Bottles are subject to periodic hydrostatic tests (every 5 years)." },
      { q: "Explain the compression cycle of a two-stage piston compressor.", a: "Stage 1 (Low pressure): Atmospheric air enters at 1 bar through suction filter. Piston descends (suction) and rises (compression). First-stage delivery valve opens when pressure reaches ~5-7 bar. Air is sent to intercooler where temperature is reduced to ~40°C. Stage 2 (High pressure): Cooled, denser air enters HP cylinder. Piston compresses to 25-30 bar. Air is cooled in aftercooler. Condensed water is separated before reaching the bottle." },
      { q: "What is an automatic drain and how does it work on a compressed air circuit?", a: "An automatic drain removes condensed water and impurities from a compressed air circuit without allowing compressed air to escape. Main types: Float drain: a float rises with accumulated water and automatically opens a drain valve at a set level. Electronic drain: timed opening (e.g. every 30 minutes for 5 seconds). Thermodynamic drain: uses pressure and temperature differences. A faulty drain allows water accumulation, risking water slug or corrosion." },
      { q: "What are the consequences of oil contamination in starting air?", a: "Oil contamination in starting air causes: 1. Deposits in starting valves: burned oil forms carbon deposits that can clog cylinder starting valves, preventing opening. 2. Explosion risk: oil mixed with high-temperature compressed air can cause a diesel explosion in starting piping (air-oil mixture ignites spontaneously). 3. Engine contamination: oil enters cylinders and disrupts combustion. Causes: excessive compressor piston ring wear, crankcase oil level too high. Prevention: oil separator filters, ring condition monitoring." },
      { q: "What is the compressor safety valve and at what pressure is it set?", a: "The safety valve is a mandatory protection device that automatically opens to vent excess pressure if service pressure is exceeded. It protects compressor, piping and bottles from dangerous overpressure. Setting: safety valve set at 10% above maximum service pressure. Example: 25 bar bottle opens at 27.5 bar; 30 bar bottle opens at 33 bar. Must be tested regularly (monthly/annual per PMS) and recalibrated if needed." },
      { q: "What is the difference between starting air and service air on board?", a: "Starting air: high pressure (25-30 bar), stored in main bottles, used to start main engine and large auxiliaries. SOLAS-secured circuit (minimum 12 starts). Mandatory draining and drying. Service air (working air): low pressure (6-7 bar), produced by independent service compressor, used for pneumatic tools, cleaning, automatic valve control, inflation. Instrument air: very dry and clean (dew point < -40°C), used for pneumatic measurement instruments and controllers." },
      { q: "How to check intercooler effectiveness on a compressor?", a: "Intercooler effectiveness checks: 1. Temperature measurement: compare air inlet and outlet temperatures. Effective intercooler should reduce air temperature to within 40-50°C of cooling water temperature. 2. Pressure drop: must not exceed 0.3 bar through intercooler. 3. Cooling water check: verify flow and temperature. 4. Condensate water analysis: quantity drained after intercooler indicates cooling effectiveness. A fouled intercooler (scale, oil) causes excessive second-stage temperatures." },
      { q: "What tests must be performed on compressed air bottles and how frequently?", a: "Hydrostatic pressure test (every 5 years): bottle filled with water (not air) and pressurised to 1.5x service pressure. Detects cracks and deformation. Internal visual inspection (every 2.5 years): endoscopic inspection for corrosion, deposits and cracks. Equipment checks: safety valve (annual), pressure gauge (annual), drain cock (monthly). Mandatory per classification society regulations and must be documented." },
      { q: "What is the dew point of compressed air and why is it important?", a: "The dew point is the temperature at which water vapour in compressed air begins to condense. High dew point causes liquid water in pipes (corrosion, freezing in cold weather, water slug), pneumatic instrument failure, bottle corrosion. Standards: instrument air dew point < -40°C (adsorption dryer required); service air dew point < +3°C. Measured with hygrometer or dew point meter." },
      { q: "How does pneumatic starting of a main diesel engine work?", a: "Main engine pneumatic starting: 1. Prerequisite: verify turning gear operation (no water slug), main starting air valve open, bottle pressure sufficient (min 15-17 bar per maker). 2. Start order: operator acts on telegraph or control console. Starting air distributor sequences air to each cylinder starting valve in firing order. 3. Starting: 25-30 bar air injected cylinder by cylinder, turning the crankshaft. When speed is sufficient (~80-100 rpm), fuel is injected and engine starts. 4. After start: starting valves close, bottles recharged by compressors." },
      { q: "What precautions when opening a high-pressure compressed air circuit?", a: "Mandatory precautions: 1. Full depressurisation: verify pressure = 0 bar on ALL circuit gauges. 2. Isolation: close upstream/downstream valves, fit blank flanges if needed. 3. Allow cooling: do not open hot circuits (burns and oil auto-ignition risk). 4. Appropriate equipment: calibrated torque wrenches, new gaskets (never reuse old gaskets). 5. Bolt check: inspect all flange bolts (corrosion, threading). 6. Leak test: raise pressure progressively, check for leaks at each step." },
      { q: "What is the diesel effect in compressed air piping and how to prevent it?", a: "The diesel effect (auto-ignition) occurs in compressed air piping when an air-oil mixture is suddenly compressed (e.g. rapid valve opening). Instant temperature can reach the oil auto-ignition point, causing a violent explosion in the piping. Contributing factors: accumulated oil (faulty separator), high temperatures (overheating compressor), high pressure (> 20 bar). Prevention: systematic oil separation by separators and filters, regular condensate draining, compression temperature monitoring, stainless materials in HP piping, use of special high auto-ignition temperature compressor oils." },
      { q: "How to calculate the required volume of starting air bottles?", a: "Starting air bottle volume calculation (SOLAS Reg. II-1/34): SOLAS requires 12 consecutive starts for a reversible main engine or 6 starts for a non-reversible engine with electric/steam reversing. Simplified formula: V (m3) = (n x V_cyl x P_mean) / (P_bottle - P_min). Where n = required starts, V_cyl = total engine swept volume (m3), P_mean = mean starting pressure (~3-5 bar), P_bottle = initial bottle pressure (25-30 bar), P_min = minimum starting pressure (15-17 bar). In practice, bottles are calculated by the manufacturer and verified during commissioning tests." },
      { q: "What are the ISM/SMS classification rules for air compressor maintenance?", a: "ISM/SMS rules for air compressor maintenance: 1. Planned Maintenance System (PMS): each compressor has a maintenance programme with defined intervals (running hours or calendar), list of items to inspect/replace, documented procedures. 2. Oil Record Book: oil separator drain operations must be logged (oil discharge risk via condensate). 3. Bottle test certificates (every 5 years) with classification society. 4. Defect reporting: any defect must be logged in the technical logbook and reported to chief engineer. 5. Mandatory spare parts: classification societies require minimum critical spares on board (valves, rings, seals)." },
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
    moduleLabel: "MAQUINAS — AUXILIARES",
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
    accidentTitle: "CASO REAL: Explosion tuberia aire arranque — MV Pacific Star (2017)",
    accidentBody: "En un portacontenedores en el Atlantico Norte, una explosion en la tuberia de aire de arranque mato a un maquinista e hirio a otros dos. Investigacion: aceite acumulado en la tuberia por un separador defectuoso. A 29 bar y 180°C la mezcla aire-aceite se autoinflamio. Causa raiz: el purgador automatico del separador estaba taponado desde 6 semanas sin ser comunicado. Recomendacion IMO MSC: inspeccion mensual obligatoria de separadores de aceite, purga manual diaria de botellas.",
    summaryTitle: "Puntos esenciales",
    summary: [
      "Botellas de aire de arranque cargadas a 25-30 bar — 12 arranques min. (SOLAS)",
      "La compresion multietapa con intercooler reduce la potencia un 15-30%",
      "Humedad y aceite en el aire comprimido son mortales — purgadores y separadores obligatorios",
      "Valvula de seguridad ajustada al 10% por encima de la presion de servicio",
      "Purgar sistematicamente las botellas antes de cada arranque del motor principal",
      "Punto de rocio aire instrumento < -40°C; aire de servicio < +3°C",
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
      intercooler: { name: "Refrigerante interetapa", desc: "Enfria el aire entre etapas de compresion. Sin intercooler la temperatura puede superar 300°C, destruyendo juntas y aceites." },
      aftercooler: { name: "Refrigerante final",      desc: "Enfria el aire tras la compresion final para condensar la humedad. Elimina el 80-90% de la humedad antes del secador." },
      separator:   { name: "Separador agua/aceite",  desc: "Elimina el agua condensada y trazas de aceite del aire comprimido. Equipado con purgador automatico. Obligatorio antes de las botellas de arranque." },
      bottle:      { name: "Botella de aire",         desc: "Almacena el aire comprimido. Botellas de arranque: 25-30 bar, volumen para 12 arranques consecutivos (SOLAS). Equipadas con valvula de seguridad, manometro, purgador." },
      dryer:       { name: "Secador de aire",         desc: "Elimina la humedad residual por adsorcion (gel de silice) o refrigeracion. Punto de rocio < -40°C requerido para el aire instrumento." },
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
      { q: "Por que la compresion del aire se realiza en varias etapas con enfriamiento interetapa? Cuales son las ventajas?", a: "1. Eficiencia energetica: enfriar el aire entre etapas aproxima el ciclo a la compresion isotermica, reduciendo la potencia necesaria un 15-30%. 2. Control de temperatura: sin enfriamiento, la temperatura puede superar 300-400°C a 25 bar, destruyendo los cierres y aceites con riesgo de explosion. 3. Mejor densidad: el aire enfriado es mas denso. 4. Vida util: temperaturas reducidas preservan cierres, valvulas y segmentos." },
      { q: "Que es un golpe de agua en un motor diesel y como puede causarlo el aire comprimido?", a: "Un golpe de agua se produce cuando agua entra en los cilindros durante la compresion. El agua es incompresible y causa sobrepresion instantanea que puede doblar o romper la biela. Mecanismo: si las botellas de aire de arranque contienen agua condensada (mal purgado o secado), esta agua se inyecta en los cilindros con el aire. Prevencion: purgar sistematicamente botellas y separadores antes de cada arranque, verificar los purgadores automaticos, usar secador de aire eficaz." },
      { q: "Que precauciones hay que tomar antes de realizar mantenimiento en un compresor de alta presion?", a: "Precauciones LOTO: 1. Aislamiento electrico y bloqueo del disyuntor. 2. Aislamiento neumatico: cerrar valvulas de aislamiento y despresurizar. 3. Verificacion de la despresurorizacion: controlar manometros (= 0 bar). 4. Ventilacion si espacio confinado. 5. Senalizacion: 'En mantenimiento — No arrancar'. 6. Esperar el enfriamiento. 7. Herramientas adecuadas sin restos de grasa." },
    ],
    bankQuestions: [
      { q: "Por que las botellas de aire de arranque deben purgarse antes de cada arranque del motor principal?", a: "Para eliminar el agua condensada acumulada en el fondo. Si entra en los cilindros con el aire de arranque puede causar un golpe de agua: el agua al ser incompresible provoca una sobrepresion instantanea que puede doblar o romper las bielas. La purga tambien elimina trazas de aceite." },
      { q: "Cual es la presion reglamentaria de las botellas de aire de arranque segun SOLAS?", a: "Las botellas deben tener capacidad para al menos 12 arranques consecutivos sin recargar. Presion de servicio: 25-30 bar. Cada botella lleva valvula de seguridad al 10% por encima de la presion de servicio, manometro, grifo de purga y valvula de seccionamiento. Pruebas hidrostaticas cada 5 anos." },
      { q: "Explique el ciclo de compresion de un compresor de pistones de dos etapas.", a: "Etapa 1 (BP): El aire atmosferico entra a 1 bar. El piston aspira y comprime hasta ~5-7 bar. El aire va al intercooler. Etapa 2 (AP): El aire enfriado y mas denso entra al cilindro AP. El piston comprime hasta 25-30 bar. El agua condensada se separa antes de llegar a la botella." },
      { q: "Que es un purgador automatico y como funciona en un circuito de aire comprimido?", a: "Dispositivo que elimina automaticamente el agua condensada sin dejar escapar aire. Tipos: purgador de flotador (nivel de agua activa la apertura), electronico (apertura temporizada), termodinamico. Los purgadores se colocan en los depositos intermedios, separador final y botella." },
      { q: "Cuales son las consecuencias de la contaminacion por aceite en el aire de arranque?", a: "1. Depositos en las valvulas de arranque (tapado por aceite quemado). 2. Riesgo de explosion (mezcla aire-aceite a alta temperatura). 3. Contaminacion del motor. Causas: desgaste de segmentos, nivel de aceite demasiado alto. Prevencion: filtros separadores de aceite." },
      { q: "Que es la valvula de seguridad de un compresor y a que presion se ajusta?", a: "Dispositivo de proteccion obligatorio que se abre automaticamente para evacuar el exceso de presion. Se ajusta al 10% por encima de la presion maxima de servicio. Ejemplo: botella de 25 bar se abre a 27,5 bar. Probar mensual/anualmente." },
      { q: "Cual es la diferencia entre aire de arranque y aire de servicio a bordo?", a: "Aire de arranque: alta presion (25-30 bar), botellas principales, motor principal. SOLAS (12 arranques minimo). Aire de servicio: baja presion (6-7 bar), herramientas neumaticas, limpieza, mandos. Aire instrumento: muy seco (punto de rocio < -40°C), instrumentos de medida." },
      { q: "Como verificar la eficiencia de un refrigerante interetapa (intercooler)?", a: "1. Medicion de temperaturas: el intercooler debe reducir la temperatura del aire a menos de 40-50°C por encima de la temperatura del agua de refrigeracion. 2. Caida de presion: no debe superar 0,3 bar. 3. Control del agua de refrigeracion: caudal y temperatura. 4. Cantidad de agua purgada tras el intercooler." },
      { q: "Que pruebas deben realizarse en las botellas de aire comprimido?", a: "Prueba hidrostatica (cada 5 anos): llena de agua a 1,5 veces la presion de servicio. Inspeccion visual interna (cada 2,5 anos). Verificacion de valvula de seguridad (anual), manometro (anual), grifo de purga (mensual)." },
      { q: "Que es el punto de rocio del aire comprimido y por que es importante?", a: "Temperatura a la que el vapor de agua del aire comprimido empieza a condensarse. Un punto de rocio alto causa agua liquida en tuberias (corrosion, heladas, golpes de agua) y fallo de instrumentos neumaticos. Norma: aire instrumento < -40°C; aire de servicio < +3°C." },
      { q: "Como funciona el arranque neumatico de un motor diesel principal?", a: "1. Verificar virada con virador, valvula de aire abierta, presion minima en botellas. 2. El distribuidor de aire secuencia las valvulas de arranque de cada cilindro. 3. El aire a 25-30 bar gira el ciguenal hasta la velocidad de inyeccion (~80-100 rpm). 4. Las valvulas de arranque se cierran y las botellas se recargan." },
      { q: "Que precauciones tomar al abrir un circuito de aire comprimido a alta presion?", a: "1. Despresurorizacion completa (verificar 0 bar en manometros). 2. Aislamiento con valvulas de seccionamiento. 3. Esperar el enfriamiento. 4. Herramientas calibradas, juntas nuevas. 5. Verificar todos los pernos de brida. 6. Montaje progresivo y prueba de estanqueidad." },
      { q: "Que es el efecto diesel en una tuberia de aire comprimido y como prevenirlo?", a: "Auto-inflamacion de la mezcla aire-aceite cuando es comprimida bruscamente (apertura rapida de valvula). La temperatura instantanea alcanza el punto de auto-inflamacion del aceite, provocando una explosion violenta. Prevencion: separacion sistematica del aceite, purga regular de condensados, control de temperaturas de compresion, aceites especiales de alta temperatura de auto-inflamacion." },
      { q: "Como calcular el volumen necesario de las botellas de aire de arranque?", a: "SOLAS Reg. II-1/34: 12 arranques consecutivos para motor reversible, 6 para no reversible. Formula simplificada: V (m3) = (n x V_cil x P_media) / (P_botella - P_min). Donde n = arranques requeridos, V_cil = cilindrada total del motor, P_media = presion media de arranque (~3-5 bar), P_botella = presion inicial (25-30 bar), P_min = presion minima de arranque (15-17 bar)." },
      { q: "Cuales son las reglas de clasificacion ISM/SMS para el mantenimiento de los compresores de aire?", a: "1. PMS (Planned Maintenance System): programa de mantenimiento con intervalos definidos, lista de piezas a inspeccionar/sustituir, procedimientos documentados. 2. Libro de registro de hidrocarburos: registrar operaciones de purga de separadores de aceite. 3. Certificados de prueba de botellas (cada 5 anos). 4. Comunicacion de defectos al Jefe de Maquinas. 5. Repuestos criticos obligatorios a bordo (valvulas, segmentos, juntas)." },
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
    moduleLabel: "MAQUINAS — AUXILIARES",
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
    accidentTitle: "CASO REAL: Explosao tubagem ar arranque — MV Pacific Star (2017)",
    accidentBody: "Num porta-contentores no Atlantico Norte, uma explosao na tubagem de ar de arranque matou um maquinista e feriu outros dois. Investigacao: oleo acumulado na tubagem por um separador com avaria. A 29 bar e 180°C a mistura ar-oleo auto-inflamou. Causa raiz: o purgador automatico do separador estava entupido ha 6 semanas sem ser comunicado. Recomendacao IMO MSC: inspecao mensal obrigatoria dos separadores de oleo, purga manual diaria das garrafas.",
    summaryTitle: "Pontos essenciais",
    summary: [
      "Garrafas de ar de arranque carregadas a 25-30 bar — 12 arranques min. (SOLAS)",
      "A compressao multifasica com intercooler reduz a potencia 15-30%",
      "Humidade e oleo no ar comprimido sao mortais — purgadores e separadores obrigatorios",
      "Valvula de seguranca regulada a 10% acima da pressao de servico",
      "Purgar sistematicamente as garrafas antes de cada arranque do motor principal",
      "Ponto de orvalho ar instrumento < -40°C; ar de servico < +3°C",
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
      intercooler: { name: "Arrefecedor interstadial", desc: "Arrefece o ar entre fases de compressao. Sem intercooler a temperatura pode superar 300°C, destruindo vedacoes e oleos." },
      aftercooler: { name: "Arrefecedor final",        desc: "Arrefece o ar apos a compressao final para condensar a humidade. Remove 80-90% da humidade antes do secador." },
      separator:   { name: "Separador agua/oleo",     desc: "Remove agua condensada e tracos de oleo do ar comprimido. Equipado com purgador automatico. Obrigatorio antes das garrafas de arranque." },
      bottle:      { name: "Garrafa de ar",            desc: "Armazena ar comprimido. Garrafas de arranque: 25-30 bar, volume para 12 arranques consecutivos (SOLAS). Equipadas com valvula de seguranca, manometro, purgador." },
      dryer:       { name: "Secador de ar",            desc: "Remove humidade residual por adsorcao (gel de silica) ou refrigeracao. Ponto de orvalho < -40°C requerido para o ar instrumento." },
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
      { q: "Por que a compressao do ar e realizada em varias fases com arrefecimento interstadial? Quais sao as vantagens?", a: "1. Eficiencia energetica: arrefecer o ar entre fases aproxima o ciclo da compressao isotermica, reduzindo a potencia necessaria 15-30%. 2. Controlo de temperatura: sem arrefecimento, a temperatura pode superar 300-400°C a 25 bar, destruindo vedacoes e oleos com risco de explosao. 3. Melhor densidade: o ar arrefecido e mais denso. 4. Vida util: temperaturas reduzidas preservam vedacoes, valvulas e segmentos." },
      { q: "O que e um golpe de agua num motor diesel e como pode o ar comprimido causa-lo?", a: "Um golpe de agua ocorre quando agua entra nos cilindros durante a compressao. A agua sendo incompressivel causa sobrepressao instantanea que pode dobrar ou partir a biela. Mecanismo: se as garrafas de ar de arranque contem agua condensada (ma purga ou secagem), esta agua e injetada nos cilindros com o ar. Prevencao: purgar sistematicamente garrafas e separadores antes de cada arranque, verificar purgadores automaticos, usar secador de ar eficaz." },
      { q: "Que precaucoes tomar antes de realizar manutencao num compressor de alta pressao?", a: "Precaucoes LOTO: 1. Isolamento eletrico e bloqueio do disjuntor. 2. Isolamento pneumatico: fechar valvulas e despressurizar. 3. Verificacao da despressurizacao (manometros = 0 bar). 4. Ventilacao se espaco confinado. 5. Sinalizacao: 'Em manutencao — Nao arrancar'. 6. Aguardar arrefecimento. 7. Ferramentas adequadas sem residuos de gordura." },
    ],
    bankQuestions: [
      { q: "Por que as garrafas de ar de arranque devem ser purgadas antes de cada arranque do motor principal?", a: "Para eliminar a agua condensada acumulada no fundo. Se entrar nos cilindros com o ar de arranque pode causar um golpe de agua: a agua sendo incompressivel provoca sobrepressao instantanea que pode dobrar ou partir as bielas. A purga tambem elimina tracos de oleo." },
      { q: "Qual e a pressao regulamentar das garrafas de ar de arranque segundo o SOLAS?", a: "As garrafas devem ter capacidade para pelo menos 12 arranques consecutivos sem recarregar. Pressao de servico: 25-30 bar. Cada garrafa tem valvula de seguranca a 10% acima da pressao de servico, manometro, torneira de purga e valvula de seccionamento. Testes hidrostaticos de 5 em 5 anos." },
      { q: "Explique o ciclo de compressao de um compressor de pistoes de dois estadios.", a: "Estadio 1 (BP): O ar atmosferico entra a 1 bar. O pistao aspira e comprime ate ~5-7 bar. O ar vai ao intercooler. Estadio 2 (AP): O ar arrefecido e mais denso entra no cilindro AP. O pistao comprime ate 25-30 bar. A agua condensada e separada antes de chegar a garrafa." },
      { q: "O que e um purgador automatico e como funciona num circuito de ar comprimido?", a: "Dispositivo que elimina automaticamente a agua condensada sem deixar escapar ar. Tipos: purgador de flutuador, eletronico (abertura temporizada), termodinamico. Colocados nos reservatorios intermedios, separador final e garrafa." },
      { q: "Quais sao as consequencias da contaminacao por oleo no ar de arranque?", a: "1. Depositos nas valvulas de arranque (obstrucao por oleo queimado). 2. Risco de explosao (mistura ar-oleo a alta temperatura). 3. Contaminacao do motor. Causas: desgaste de segmentos, nivel de oleo demasiado alto. Prevencao: filtros separadores de oleo." },
      { q: "O que e a valvula de seguranca de um compressor e a que pressao esta regulada?", a: "Dispositivo de protecao obrigatorio que abre automaticamente para evacuar o excesso de pressao. Regulada a 10% acima da pressao maxima de servico. Exemplo: garrafa de 25 bar abre a 27,5 bar. Testar mensal/anualmente." },
      { q: "Qual e a diferenca entre ar de arranque e ar de servico a bordo?", a: "Ar de arranque: alta pressao (25-30 bar), garrafas principais, motor principal. SOLAS (12 arranques minimo). Ar de servico: baixa pressao (6-7 bar), ferramentas pneumaticas, limpeza, comandos. Ar instrumento: muito seco (ponto de orvalho < -40°C), instrumentos de medida." },
      { q: "Como verificar a eficiencia de um arrefecedor interstadial (intercooler)?", a: "1. Medicao de temperaturas: deve reduzir a temperatura do ar a menos de 40-50°C acima da temperatura da agua de arrefecimento. 2. Queda de pressao: nao deve exceder 0,3 bar. 3. Controlo da agua de arrefecimento. 4. Quantidade de agua purgada apos o intercooler." },
      { q: "Que testes devem ser realizados nas garrafas de ar comprimido?", a: "Teste hidrostatico (de 5 em 5 anos): cheias de agua a 1,5 vezes a pressao de servico. Inspecao visual interna (de 2,5 em 2,5 anos). Verificacao da valvula de seguranca (anual), manometro (anual), torneira de purga (mensal)." },
      { q: "O que e o ponto de orvalho do ar comprimido e por que e importante?", a: "Temperatura a qual o vapor de agua do ar comprimido comeca a condensar. Ponto de orvalho alto causa agua liquida nas tubagens (corrosao, gelo, golpes de agua) e falha de instrumentos pneumaticos. Norma: ar instrumento < -40°C; ar de servico < +3°C." },
      { q: "Como funciona o arranque pneumatico de um motor diesel principal?", a: "1. Verificar viramento com virante, valvula de ar aberta, pressao minima nas garrafas. 2. O distribuidor de ar sequencia as valvulas de arranque de cada cilindro. 3. O ar a 25-30 bar roda o virabrequim ate a velocidade de injecao (~80-100 rpm). 4. As valvulas de arranque fecham e as garrafas recarregam." },
      { q: "Que precaucoes tomar ao abrir um circuito de ar comprimido a alta pressao?", a: "1. Despressurizacao completa (verificar 0 bar nos manometros). 2. Isolamento com valvulas de seccionamento. 3. Aguardar arrefecimento. 4. Ferramentas calibradas, vedantes novos. 5. Verificar todos os parafusos de flange. 6. Montagem progressiva e teste de estanqueidade." },
      { q: "O que e o efeito diesel numa tubagem de ar comprimido e como preveni-lo?", a: "Auto-inflamacao da mistura ar-oleo quando e comprimida bruscamente (abertura rapida de valvula). Temperatura instantanea atinge o ponto de auto-inflamacao do oleo, causando explosao violenta. Prevencao: separacao sistematica do oleo, purga regular de condensados, controlo de temperaturas de compressao, oleos especiais de alta temperatura de auto-inflamacao." },
      { q: "Como calcular o volume necessario das garrafas de ar de arranque?", a: "SOLAS Reg. II-1/34: 12 arranques consecutivos para motor reversivel, 6 para nao reversivel. Formula simplificada: V (m3) = (n x V_cil x P_media) / (P_garrafa - P_min). Onde n = arranques requeridos, V_cil = cilindrada total do motor, P_media = pressao media de arranque (~3-5 bar), P_garrafa = pressao inicial (25-30 bar), P_min = pressao minima de arranque (15-17 bar)." },
      { q: "Quais sao as regras de classificacao ISM/SMS para a manutencao dos compressores de ar?", a: "1. PMS: programa de manutencao com intervalos definidos, lista de pecas a inspecionar/substituir, procedimentos documentados. 2. Livro de Registo de Hidrocarbonetos: registar operacoes de purga de separadores de oleo. 3. Certificados de prova de garrafas (cada 5 anos). 4. Comunicacao de defeitos ao Chefe de Maquinas. 5. Pecas sobressalentes criticas obrigatorias a bordo (valvulas, segmentos, vedacoes)." },
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

// ── SVG 1 — COMPRESSOR TYPES ─────────────────────────────────
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
        <text x="80" y="136" fontSize="8" fill={C.green} fontFamily="Courier New" textAnchor="middle">SCREW — 13 bar max</text>
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
        <text x="80" y="140" fontSize="8" fill={C.teal} fontFamily="Courier New" textAnchor="middle">VANE — 8 bar max</text>
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

// ── SVG 2 — CIRCUIT ──────────────────────────────────────────
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

// ── SVG 3 — FAULTS ───────────────────────────────────────────
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

// ── SVG 4 — MAINTENANCE ──────────────────────────────────────
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
// LessonE2_L2 — Compresseurs & Systemes Air | PART 2

export default function LessonE2_L2({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
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

  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankAns(false);setBankScore(0);setBankDone(false);};
  const bankNext=()=>{if(bankCur+1>=bank.length){setBankDone(true);return;}setBankCur(c=>c+1);setBankAns(false);};
  const handleQConf=()=>{if(qSel===null)return;setQConf(true);if(qSel===quiz[qCur].correct)setQScore(s=>s+1);};
  const handleQNext=()=>{if(qCur+1>=quiz.length){setPhase("done");if(onComplete)onComplete(xpFinal);return;}setQCur(c=>c+1);setQSel(null);setQConf(false);};

  const header=(subtitle:string)=>(
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.cyan}33`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
        <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>&#9664;</button>
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
