// LessonE3_L6 - Maintenance & Inspection chaudière | PART 1
import { useState } from "react";

const C = {
  maint:"#6dbf8a", inspect:"#4da6ff", repair:"#e8b94f",
  clean:"#c084fc", danger:"#e74c3c", safe:"#6dbf8a",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  fire:"#f97316",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE - CHAUDIÈRES",
    lessonTitle:"Maintenance & Inspection chaudière",
    intro:"La maintenance régulière d'une chaudière garantit sa fiabilité, sa sécurité et sa longévité. Les sociétés de classification imposent des inspections périodiques internes et externes. Un carnet de maintenance (PMS) bien tenu est la clé d'une chaudière en bon état.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"📅 Programme de maintenance (PMS)",
    s1hint:"👆 Tapez une fréquence",
    s2title:"🔍 Inspection interne de la chaudière",
    s2hint:"👆 Tapez un point d'inspection",
    s3title:"🧹 Nettoyage & Détartrage",
    s3hint:"👆 Tapez une méthode",
    s4title:"📋 Inspection société de classification",
    s4hint:"👆 Tapez un type d'inspection",
    keypoints:"Points clés",
    kp:[
      "L'inspection interne nécessite une mise hors service complète et refroidissement total",
      "Le détartrage chimique acide dissout le tartre - rinçage abondant obligatoire",
      "La société de classification inspecte la chaudière tous les 2,5 ans (intermédiaire) et 5 ans (spéciale)",
      "Test hydrostatique : 1,5× la pression de service pour vérifier l'intégrité",
      "Consigner toutes les opérations dans le registre de maintenance du navire",
    ],
    pms:{
      daily:{ name:"Quotidien", ops:["Vérifier niveau d'eau (2 indicateurs), purger si nécessaire","Contrôler pression et température vapeur","Inspecter brûleur : flamme, couleur fumées","Purger séparateurs et purgeurs de surface","Analyser eau chaudière (pH, O₂, conductivité)","Vérifier absence de fuites (vapeur, eau, combustible)","Consigner dans le journal machine"] },
      weekly:{ name:"Hebdomadaire", ops:["Test de levée manuelle des soupapes de sûreté","Purge de fond (bottom blow-down) du ballon","Vérifier état filtre à combustible, nettoyer si nécessaire","Tester alarmes de bas niveau d'eau (L1/L2)","Analyser eau complète (alcalinité, chlorures, dureté)","Vérifier lubrification des pompes d'alimentation","Inspecter isolation thermique des conduites vapeur"] },
      monthly:{ name:"Mensuel", ops:["Test complet des soupapes de sûreté (pression)","Calibrer manomètres (comparer au manomètre étalon)","Nettoyer gicleur du brûleur","Inspecter et nettoyer le détecteur de flamme","Vérifier l'état des purgeurs (acoustique/infrarouge)","Tester le BMS (séquences démarrage/arrêt)","Analyser les condensats récupérés"] },
      annual:{ name:"Annuel / Arrêt chaudière", ops:["Inspection interne complète (tubes, ballon, foyer)","Nettoyage chimique ou mécanique complet","Inspection et réglage des soupapes de sûreté","Remplacement gicleur brûleur et joints","Inspection et test des pressostats","Soufflage de suie de l'ECE","Rapport d'inspection pour la société de classification"] },
    },
    inspPoints:{
      tubes:{ name:"Tubes de chaudière", check:"Inspecter visuellement : corrosion par piqûres, entartrage, déformation, fissures. Mesurer l'épaisseur par ultrasons si suspicion d'amincissement. Tartre > 1mm → nettoyage chimique. Piqûres > 20% épaisseur → signaler à la société de classification.", tools:"Endoscope, marteau de sonorisation, appareil ultrasons" },
      drum:{ name:"Ballon vapeur (drum)", check:"Inspecter les surfaces internes : corrosion généralisée, piqûres, fissures aux soudures. Inspecter le séparateur vapeur/eau (état des chicanes). Nettoyer les dépôts de boue et de tartre. Inspecter les raccords (entrées/sorties).", tools:"Inspection visuelle, brosse, endoscope" },
      furnace:{ name:"Chambre de combustion (foyer)", check:"Inspecter les réfractaires (fissures, érosion, chute). Inspecter les buses et les parois refroidies. Chercher les points de surchauffe (taches brunes ou bleues sur les tubes). Inspecter les joints du brûleur.", tools:"Lampe, marteau, contrôle visuel" },
      burner:{ name:"Brûleur et gicleur", check:"Déposer et inspecter le gicleur (usure de l'orifice, colmatage partiel, angle de spray). Inspecter le corps du brûleur (encrassement, corrosion). Inspecter le registre d'air et l'état des ailettes. Vérifier l'électrode d'allumage (écartement, usure).", tools:"Micromètre, comparateur d'orifice" },
      safetyvalves:{ name:"Soupapes de sûreté", check:"Déposer et inspecter le siège (rayures, érosion). Inspecter le clapet ou le disque (déformation, usure). Remplacer les joints d'étanchéité. Recalibrer selon la pression de tarage. Tester après remontage.", tools:"Cale étalon, banc de test pression" },
      waterside:{ name:"Côté eau (waterside)", check:"Inspecter les surfaces internes pour : tartre (blanc/jaunâtre), corrosion (piqûres rouille-brun), dépôts de phosphate (blanc/gris). Tester l'adhérence du tartre (couteau ou marteau). Mesurer l'épaisseur des dépôts.", tools:"Marteau, couteau, lampe" },
    },
    cleaning:{
      chemical:{ name:"Détartrage chimique (Chemical cleaning)", desc:"Circulation d'une solution acide (acide citrique 5%, acide chlorhydrique dilué, acide sulfamique) dans le circuit eau de la chaudière pour dissoudre le tartre. Durée : 4-12 heures selon l'épaisseur des dépôts. Rinçage abondant à l'eau douce (pH neutre en sortie). Passivation finale (solution inhibitrice). Avantage : atteint toutes les surfaces sans démontage." },
      mechanical:{ name:"Nettoyage mécanique (Mechanical cleaning)", desc:"Utilisation de brosse à haute pression, de turbines rotatives ou de jets d'eau haute pression sur les surfaces accessibles. Efficace sur les dépôts durs et la corrosion. Moins efficace pour les zones inaccessibles. Souvent combiné au nettoyage chimique pour les cas sévères." },
      sootblowing:{ name:"Soufflage de suie (Soot blowing - ECE)", desc:"Injection de vapeur à haute pression (8-10 bar) sur les surfaces externes des tubes de l'ECE pour déloger les dépôts de suie et de cendres. Réalisé pendant la navigation. Fréquence : 1-2 fois par jour. Déclenché manuellement ou automatiquement. Évacuation des suies par le bas (éviter émission en mer/air)." },
      hydroblasting:{ name:"Hydroblasting (jet eau très haute pression)", desc:"Nettoyage par jet d'eau à très haute pression (500-3000 bar). Efficace sur tous types de dépôts. Utilisé pour le nettoyage du foyer, des tubes accessibles, de la chambre de combustion. Nécessite EPI spéciaux (risque de blessures graves). Réalisé par personnel qualifié uniquement." },
    },
    classInspections:{
      annual_survey:{ name:"Inspection annuelle (Annual Survey)", desc:"Inspection externe de la chaudière en service. Contrôle des soupapes de sûreté, manomètres, indicateurs de niveau. Vérification des registres de maintenance et d'analyse d'eau. Test de fonctionnement des alarmes. Réalisée par l'inspecteur de la société de classification avec l'équipage." },
      intermediate:{ name:"Inspection intermédiaire (Intermediate Survey)", desc:"Réalisée à 2,5 ans (mi-cycle). Inspection interne après mise hors service et refroidissement. Inspection des tubes, du ballon, du foyer, des soupapes. Mesures d'épaisseur si nécessaire. Test hydrostatique possible. Documentation complète fournie à la société de classification." },
      special:{ name:"Inspection spéciale (Special Survey)", desc:"Réalisée tous les 5 ans. Inspection la plus complète. Démontage des soupapes, inspection des tous les composants, mesures d'épaisseur des tubes et du ballon, test hydrostatique obligatoire (1,5× PMS), inspection par société de classification. Certificat de chaudière renouvelé." },
      hydrotest:{ name:"Test hydrostatique (Hydrostatic test)", desc:"Remplissage de la chaudière avec de l'eau (JAMAIS d'air comprimé) et pressurisation à 1,5× la pression maximale de service (PMS). Maintien de la pression pendant 30-60 minutes. Inspection de toutes les soudures et surfaces pour déceler les fuites ou déformations. Réalisé tous les 5 ans ou après réparations importantes." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Quelles précautions de sécurité faut-il prendre avant d'entrer dans une chaudière pour une inspection interne ?",
        a:"Précautions obligatoires avant entrée en chaudière (espace confiné) : 1. Mise hors service complète : arrêt du brûleur depuis au moins 24-48h (refroidissement total < 40 degC). Fermer et condamner toutes les vannes vapeur, combustible et eau d'alimentation (LOTO). 2. Dépressurisation confirmée : vérifier pression = 0 bar sur tous les manomètres. 3. Analyse de l'atmosphère intérieure : O₂ > 19,5% (minimum), < 23,5% (maximum), absence de gaz toxiques (CO < 25 ppm, HC < 10% LIE). 4. Permis de travail en espace confiné : établi et signé. 5. Ventilation active : souffler de l'air frais dans la chaudière pendant l'inspection. 6. Équipe de secours à l'extérieur : au moins une personne reste dehors en permanence avec moyen de communication. 7. EPI : harnais, casque, lampe portable ATEX. 8. Moyen d'évacuation prévu (échelle, corde)." },
      { q:"Qu'est-ce qu'un test hydrostatique sur une chaudière et pourquoi est-il nécessaire ?",
        a:"Un test hydrostatique (épreuve hydraulique) consiste à remplir la chaudière complètement d'eau froide (jamais d'air ou de vapeur - incompressibles et non explosifs) et à pressuriser jusqu'à 1,5× la pression maximale de service (PMS). Procédure : Fermer tous les raccords et bouchonner les sorties. Remplir d'eau en chassant l'air (ouvrir un robinet en hauteur jusqu'à l'eau). Monter la pression lentement (pompe d'essai) jusqu'à 1,5 × PMS. Maintenir 30-60 minutes. Inspecter toutes les surfaces, soudures et raccords. Raisons : Détecter les fissures et défauts non visibles à l'inspection visuelle. Vérifier l'intégrité des soudures après réparations. Confirmer que la chaudière peut supporter sa pression nominale. Exigence réglementaire de la société de classification (tous les 5 ans). JAMAIS avec de l'air comprimé : en cas de rupture, l'énergie libérée serait explosive." },
      { q:"Comment réaliser un détartrage chimique d'une chaudière marine ?",
        a:"Procédure de détartrage chimique : 1. Préparation : chaudière hors service et refroidie (< 40 degC), analyser les dépôts (carbonate → acide citrique, sulfate → acide chlorhydrique). 2. Inhibition : ajouter un inhibiteur de corrosion à la solution acide pour protéger le métal pendant l'attaque acide. 3. Remplissage : remplir la chaudière avec la solution acide diluée (ex : acide citrique 5%). 4. Circulation : faire circuler la solution par pompe pendant 4-12 heures (selon épaisseur du tartre). Surveiller la concentration (prélèvements périodiques). 5. Rinçage : vider et rincer abondamment à l'eau douce. Vérifier pH de l'effluent de rinçage (pH > 6,5 = rinçage complet). 6. Passivation : remplir avec solution passivante (phosphate + alcalinisant) pour protéger les surfaces nettoyées. 7. Inspection finale : inspecter les surfaces nettoyées avant remise en service. Consigner dans le registre." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE - BOILERS",
    lessonTitle:"Boiler Maintenance & Inspection",
    intro:"Regular boiler maintenance ensures reliability, safety and longevity. Classification societies require periodic internal and external inspections. A well-maintained PMS is the key to a boiler in good condition.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"📅 Maintenance Programme (PMS)",
    s1hint:"👆 Tap a frequency",
    s2title:"🔍 Internal Boiler Inspection",
    s2hint:"👆 Tap an inspection point",
    s3title:"🧹 Cleaning & Descaling",
    s3hint:"👆 Tap a method",
    s4title:"📋 Classification Society Inspection",
    s4hint:"👆 Tap an inspection type",
    keypoints:"Key Points",
    kp:[
      "Internal inspection requires complete shutdown and full cooling",
      "Chemical acid descaling dissolves scale - thorough rinsing mandatory",
      "Classification society inspects boiler every 2.5 years (intermediate) and 5 years (special)",
      "Hydrostatic test: 1.5× service pressure to verify integrity",
      "Log all operations in ship maintenance register",
    ],
    pms:{
      daily:{ name:"Daily", ops:["Check water level (2 gauges), blow down if necessary","Monitor steam pressure and temperature","Inspect burner: flame, smoke colour","Drain separators and surface steam traps","Analyse boiler water (pH, O₂, conductivity)","Check for leaks (steam, water, fuel)","Log in engine room log"] },
      weekly:{ name:"Weekly", ops:["Manual lift test of safety valves","Bottom blow-down of drum","Check fuel filter condition, clean if necessary","Test low water level alarms (L1/L2)","Full water analysis (alkalinity, chlorides, hardness)","Check feed pump lubrication","Inspect steam pipe thermal insulation"] },
      monthly:{ name:"Monthly", ops:["Full safety valve test (pressure)","Calibrate pressure gauges (compare to reference gauge)","Clean burner nozzle","Inspect and clean flame detector","Check steam trap condition (acoustic/infrared)","Test BMS (start/stop sequences)","Analyse recovered condensate"] },
      annual:{ name:"Annual / Boiler shutdown", ops:["Full internal inspection (tubes, drum, furnace)","Full chemical or mechanical cleaning","Safety valve inspection and adjustment","Replace burner nozzle and gaskets","Inspect and test pressure switches","EGE soot blowing","Inspection report for classification society"] },
    },
    inspPoints:{
      tubes:{ name:"Boiler tubes", check:"Visual inspection: pitting corrosion, scaling, deformation, cracks. Measure thickness by ultrasound if thinning suspected. Scale > 1mm → chemical cleaning. Pitting > 20% thickness → report to classification society.", tools:"Endoscope, sounding hammer, ultrasound device" },
      drum:{ name:"Steam drum", check:"Inspect internal surfaces: general corrosion, pitting, weld cracks. Inspect steam/water separator (baffle condition). Clean sludge and scale deposits. Inspect fittings (inlets/outlets).", tools:"Visual inspection, brush, endoscope" },
      furnace:{ name:"Combustion chamber (furnace)", check:"Inspect refractories (cracks, erosion, fall-out). Inspect nozzles and cooled walls. Look for overheating points (brown or blue spots on tubes). Inspect burner gaskets.", tools:"Lamp, hammer, visual check" },
      burner:{ name:"Burner and nozzle", check:"Remove and inspect nozzle (orifice wear, partial blockage, spray angle). Inspect burner body (fouling, corrosion). Inspect air register and vane condition. Check ignition electrode (gap, wear).", tools:"Micrometer, orifice comparator" },
      safetyvalves:{ name:"Safety valves", check:"Remove and inspect seat (scratches, erosion). Inspect disc or plug (deformation, wear). Replace gaskets. Recalibrate per set pressure. Test after reassembly.", tools:"Feeler gauge, pressure test bench" },
      waterside:{ name:"Waterside", check:"Inspect internal surfaces for: scale (white/yellowish), corrosion (rust-brown pitting), phosphate deposits (white/grey). Test scale adhesion (knife or hammer). Measure deposit thickness.", tools:"Hammer, knife, lamp" },
    },
    cleaning:{
      chemical:{ name:"Chemical descaling", desc:"Circulation of acid solution (5% citric acid, dilute hydrochloric acid, sulphamic acid) in boiler water circuit to dissolve scale. Duration: 4-12 hours depending on deposit thickness. Thorough freshwater rinse (neutral pH at outlet). Final passivation (inhibitor solution). Advantage: reaches all surfaces without dismantling." },
      mechanical:{ name:"Mechanical cleaning", desc:"Use of high-pressure brush, rotary turbines or high-pressure water jets on accessible surfaces. Effective on hard deposits and corrosion. Less effective for inaccessible areas. Often combined with chemical cleaning for severe cases." },
      sootblowing:{ name:"Soot blowing (EGE)", desc:"Injection of high-pressure steam (8-10 bar) on external tube surfaces of EGE to dislodge soot and ash deposits. Performed during navigation. Frequency: 1-2 times per day. Triggered manually or automatically. Soot evacuation from bottom (avoid emission to sea/air)." },
      hydroblasting:{ name:"Hydroblasting (very high pressure water jet)", desc:"Cleaning by very high pressure water jet (500-3000 bar). Effective on all deposit types. Used for furnace, accessible tube and combustion chamber cleaning. Requires special PPE (severe injury risk). Performed by qualified personnel only." },
    },
    classInspections:{
      annual_survey:{ name:"Annual Survey", desc:"External boiler inspection in service. Safety valve, gauge, water level indicator checks. Maintenance and water analysis log verification. Alarm functional testing. Carried out by classification society surveyor with crew." },
      intermediate:{ name:"Intermediate Survey", desc:"Carried out at 2.5 years (mid-cycle). Internal inspection after shutdown and cooling. Tube, drum, furnace, valve inspection. Thickness measurements if needed. Hydrostatic test possible. Full documentation provided to classification society." },
      special:{ name:"Special Survey", desc:"Carried out every 5 years. Most comprehensive inspection. Safety valve dismantling, all component inspection, tube and drum thickness measurements, mandatory hydrostatic test (1.5× MAWP), classification society inspection. Boiler certificate renewed." },
      hydrotest:{ name:"Hydrostatic test", desc:"Filling boiler with water (NEVER compressed air) and pressurising to 1.5× maximum allowable working pressure (MAWP). Maintain pressure for 30-60 minutes. Inspect all welds and surfaces for leaks or deformation. Carried out every 5 years or after major repairs." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"What safety precautions must be taken before entering a boiler for internal inspection?",
        a:"Mandatory precautions before boiler entry (confined space): 1. Complete shutdown: burner off for at least 24-48h (full cooling < 40 degC). Close and lock all steam, fuel and feed water valves (LOTO). 2. Confirmed depressurisation: verify pressure = 0 bar on all gauges. 3. Atmosphere analysis: O₂ > 19.5% (minimum), < 23.5% (maximum), no toxic gases (CO < 25 ppm, HC < 10% LEL). 4. Confined space work permit: issued and signed. 5. Active ventilation: blow fresh air into boiler during inspection. 6. Standby rescue team outside: at least one person remains outside continuously with communication means. 7. PPE: harness, helmet, portable ATEX lamp. 8. Evacuation means provided (ladder, rope)." },
      { q:"What is a hydrostatic test on a boiler and why is it necessary?",
        a:"A hydrostatic test consists of filling the boiler completely with cold water (never air or steam - incompressible and non-explosive) and pressurising to 1.5× maximum allowable working pressure (MAWP). Procedure: close all fittings and blank off outlets. Fill with water expelling air (open top cock until water). Slowly raise pressure (test pump) to 1.5 × MAWP. Maintain 30-60 minutes. Inspect all surfaces, welds and fittings. Reasons: detect cracks and defects not visible in visual inspection. Verify weld integrity after repairs. Confirm boiler can withstand nominal pressure. Classification society regulatory requirement (every 5 years). NEVER with compressed air: on rupture, released energy would be explosive." },
      { q:"How to perform chemical descaling of a marine boiler?",
        a:"Chemical descaling procedure: 1. Preparation: boiler out of service and cooled (< 40 degC), analyse deposits (carbonate → citric acid, sulphate → hydrochloric acid). 2. Inhibition: add corrosion inhibitor to acid solution to protect metal during acid attack. 3. Filling: fill boiler with dilute acid solution (e.g. 5% citric acid). 4. Circulation: circulate solution by pump for 4-12 hours (per scale thickness). Monitor concentration (periodic sampling). 5. Rinsing: drain and rinse thoroughly with fresh water. Check rinse effluent pH (pH > 6.5 = complete rinse). 6. Passivation: fill with passivating solution (phosphate + alkaliser) to protect cleaned surfaces. 7. Final inspection: inspect cleaned surfaces before return to service. Log in register." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS - CALDERAS",
    lessonTitle:"Mantenimiento & Inspección caldera",
    intro:"El mantenimiento regular de la caldera garantiza su fiabilidad, seguridad y longevidad. Las sociedades de clasificación exigen inspecciones periódicas internas y externas.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"📅 Programa de mantenimiento (PMS)",
    s1hint:"👆 Toca una frecuencia",
    s2title:"🔍 Inspección interna de la caldera",
    s2hint:"👆 Toca un punto de inspección",
    s3title:"🧹 Limpieza & Desincustación",
    s3hint:"👆 Toca un método",
    s4title:"📋 Inspección sociedad de clasificación",
    s4hint:"👆 Toca un tipo de inspección",
    keypoints:"Puntos clave",
    kp:[
      "La inspección interna requiere puesta fuera de servicio completa y enfriamiento total",
      "La desincustación química ácida disuelve las incrustaciones - enjuague abundante obligatorio",
      "La sociedad de clasificación inspecciona la caldera cada 2,5 años (intermedia) y 5 años (especial)",
      "Prueba hidrostática: 1,5× la presión de servicio para verificar la integridad",
      "Registrar todas las operaciones en el libro de mantenimiento del buque",
    ],
    pms:{
      daily:{ name:"Diario", ops:["Verificar nivel de agua (2 indicadores)","Controlar presión y temperatura de vapor","Inspeccionar quemador: llama, color del humo","Purgar separadores y purgadores de superficie","Analizar agua de caldera (pH, O₂, conductividad)","Verificar ausencia de fugas","Anotar en el diario de máquinas"] },
      weekly:{ name:"Semanal", ops:["Prueba de levantamiento manual de válvulas de seguridad","Purga de fondo del balón","Verificar filtro de combustible","Probar alarmas de bajo nivel (L1/L2)","Análisis completo del agua","Verificar lubricación de bombas de alimentación","Inspeccionar aislamiento térmico de tuberías de vapor"] },
      monthly:{ name:"Mensual", ops:["Prueba completa de válvulas de seguridad","Calibrar manómetros","Limpiar tobera del quemador","Inspeccionar detector de llama","Verificar purgadores (acústico/infrarrojo)","Probar el BMS","Analizar condensados recuperados"] },
      annual:{ name:"Anual / Parada caldera", ops:["Inspección interna completa","Limpieza química o mecánica completa","Inspección y ajuste de válvulas de seguridad","Sustitución de tobera y juntas","Inspección y prueba de presostatos","Soplado de hollín del EGE","Informe de inspección para la sociedad de clasificación"] },
    },
    inspPoints:{
      tubes:{ name:"Tubos de caldera", check:"Inspección visual: corrosión por picaduras, incrustaciones, deformación, grietas. Medir espesor por ultrasonidos si se sospecha adelgazamiento. Incrustación > 1mm → limpieza química. Picaduras > 20% espesor → notificar a la sociedad de clasificación.", tools:"Endoscopio, martillo de sonorización, aparato ultrasonidos" },
      drum:{ name:"Balón de vapor", check:"Inspeccionar superficies internas: corrosión generalizada, picaduras, grietas en soldaduras. Inspeccionar separador vapor/agua. Limpiar depósitos de lodo e incrustaciones. Inspeccionar conexiones.", tools:"Inspección visual, cepillo, endoscopio" },
      furnace:{ name:"Cámara de combustión (hogar)", check:"Inspeccionar refractarios (grietas, erosión). Buscar puntos de sobrecalentamiento (manchas marrones/azules). Inspeccionar juntas del quemador.", tools:"Lámpara, martillo, control visual" },
      burner:{ name:"Quemador y tobera", check:"Desmontar e inspeccionar tobera (desgaste, obstrucción parcial, ángulo de pulverización). Inspeccionar cuerpo del quemador. Verificar electrodo de encendido (separación, desgaste).", tools:"Micrómetro, comparador de orificio" },
      safetyvalves:{ name:"Válvulas de seguridad", check:"Desmontar e inspeccionar asiento (rayaduras, erosión). Inspeccionar disco (deformación, desgaste). Sustituir juntas. Recalibrar. Probar tras el montaje.", tools:"Calibre, banco de prueba de presión" },
      waterside:{ name:"Lado agua (waterside)", check:"Inspeccionar superficies internas: incrustaciones (blanco/amarillento), corrosión (picaduras). Probar adherencia de las incrustaciones. Medir espesor de los depósitos.", tools:"Martillo, cuchillo, lámpara" },
    },
    cleaning:{
      chemical:{ name:"Desincustación química", desc:"Circulación de solución ácida (ácido cítrico al 5%, ácido clorhídrico diluido) por el circuito de agua para disolver las incrustaciones. Duración: 4-12 horas. Enjuague abundante con agua dulce (pH neutro en la salida). Pasivación final." },
      mechanical:{ name:"Limpieza mecánica", desc:"Cepillo de alta presión, turbinas rotativas o chorros de agua a alta presión en superficies accesibles. Eficaz en depósitos duros. A menudo combinado con la limpieza química." },
      sootblowing:{ name:"Soplado de hollín (EGE)", desc:"Inyección de vapor a alta presión (8-10 bar) en las superficies externas de los tubos del EGE para eliminar depósitos de hollín. Frecuencia: 1-2 veces al día en navegación." },
      hydroblasting:{ name:"Hydroblasting (chorro agua muy alta presión)", desc:"Limpieza por chorro de agua a muy alta presión (500-3000 bar). Eficaz en todos los tipos de depósitos. Requiere EPI especiales. Solo personal cualificado." },
    },
    classInspections:{
      annual_survey:{ name:"Inspección anual", desc:"Inspección externa de la caldera en servicio. Control de válvulas, manómetros, indicadores de nivel. Verificación de registros de mantenimiento y análisis de agua. Prueba de alarmas." },
      intermediate:{ name:"Inspección intermedia (2,5 años)", desc:"Inspección interna tras puesta fuera de servicio y enfriamiento. Tubos, balón, hogar, válvulas. Medidas de espesor si es necesario. Prueba hidrostática posible." },
      special:{ name:"Inspección especial (5 años)", desc:"La más completa. Desmontaje de válvulas, inspección de todos los componentes, medidas de espesor, prueba hidrostática obligatoria (1,5× PMS). Certificado de caldera renovado." },
      hydrotest:{ name:"Prueba hidrostática", desc:"Llenado con agua (NUNCA aire comprimido) y presurización a 1,5× la PMS. Mantener 30-60 minutos. Inspeccionar todas las soldaduras y superficies. Cada 5 años o tras reparaciones importantes." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"¿Qué precauciones de seguridad hay que tomar antes de entrar en una caldera para una inspección interna?",
        a:"1. Puesta fuera de servicio completa: quemador apagado mínimo 24-48h (enfriamiento total < 40 degC). Cerrar y condenar todas las válvulas (LOTO). 2. Despresurización confirmada: verificar presión = 0 bar en todos los manómetros. 3. Análisis de la atmósfera: O₂ > 19,5%, sin gases tóxicos (CO < 25 ppm). 4. Permiso de trabajo en espacio confinado firmado. 5. Ventilación activa. 6. Equipo de rescate en el exterior. 7. EPI: arnés, casco, lámpara ATEX. 8. Medios de evacuación previstos." },
      { q:"¿Qué es una prueba hidrostática en una caldera y por qué es necesaria?",
        a:"Llenado con agua fría y presurización a 1,5× la PMS (NUNCA con aire comprimido). Mantener 30-60 minutos. Inspeccionar soldaduras y superficies. Detecta grietas y defectos no visibles visualmente. Verifica la integridad de soldaduras tras reparaciones. Exigencia reglamentaria de la sociedad de clasificación (cada 5 años). Con aire comprimido, la energía liberada en caso de rotura sería explosiva." },
      { q:"¿Cómo realizar una desincustación química de una caldera marina?",
        a:"1. Preparación: caldera fuera de servicio y enfriada (< 40 degC), analizar los depósitos. 2. Inhibición: añadir inhibidor de corrosión a la solución ácida. 3. Llenado: llenar con solución ácida diluida (ej: ácido cítrico al 5%). 4. Circulación: bombear 4-12 horas. Controlar concentración. 5. Enjuague: vaciar y enjuagar abundantemente con agua dulce (pH > 6,5). 6. Pasivación: rellenar con solución pasivante (fosfato + alcalinizante). 7. Inspección final antes de la puesta en servicio. Registrar todo." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS - CALDEIRAS",
    lessonTitle:"Manutenção & Inspeção caldeira",
    intro:"A manutenção regular da caldeira garante fiabilidade, segurança e longevidade. As sociedades de classificação exigem inspeções periódicas internas e externas.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"📅 Programa de manutenção (PMS)",
    s1hint:"👆 Toque numa frequência",
    s2title:"🔍 Inspeção interna da caldeira",
    s2hint:"👆 Toque num ponto de inspeção",
    s3title:"🧹 Limpeza & Desincustação",
    s3hint:"👆 Toque num método",
    s4title:"📋 Inspeção sociedade de classificação",
    s4hint:"👆 Toque num tipo de inspeção",
    keypoints:"Pontos-chave",
    kp:[
      "A inspeção interna requer paragem completa e arrefecimento total",
      "A desincustação química ácida dissolve as incrustações - enxaguamento abundante obrigatório",
      "A sociedade de classificação inspeciona a caldeira de 2,5 em 2,5 anos (intermédia) e de 5 em 5 anos (especial)",
      "Teste hidrostático: 1,5× a pressão de serviço para verificar a integridade",
      "Registar todas as operações no livro de manutenção do navio",
    ],
    pms:{
      daily:{ name:"Diário", ops:["Verificar nível de água (2 indicadores)","Controlar pressão e temperatura de vapor","Inspecionar queimador: chama, cor do fumo","Purgar separadores e purgadores de superfície","Analisar água de caldeira (pH, O₂, condutividade)","Verificar ausência de fugas","Registar no diário de máquinas"] },
      weekly:{ name:"Semanal", ops:["Teste de levantamento manual das válvulas de segurança","Purga de fundo do balão","Verificar filtro de combustível","Testar alarmes de baixo nível (L1/L2)","Análise completa da água","Verificar lubrificação das bombas de alimentação","Inspecionar isolamento térmico das tubagens de vapor"] },
      monthly:{ name:"Mensal", ops:["Teste completo das válvulas de segurança","Calibrar manómetros","Limpar bico do queimador","Inspecionar detetor de chama","Verificar purgadores (acústico/infravermelhos)","Testar o BMS","Analisar condensados recuperados"] },
      annual:{ name:"Anual / Paragem caldeira", ops:["Inspeção interna completa","Limpeza química ou mecânica completa","Inspeção e ajuste das válvulas de segurança","Substituição de bico e juntas","Inspeção e teste dos pressostatos","Sopro de fuligem do EGE","Relatório de inspeção para a sociedade de classificação"] },
    },
    inspPoints:{
      tubes:{ name:"Tubos de caldeira", check:"Inspeção visual: corrosão por picadas, incrustações, deformação, fissuras. Medir espessura por ultrassons se suspeita de adelgaçamento. Incrustação > 1mm → limpeza química. Picadas > 20% espessura → notificar sociedade de classificação.", tools:"Endoscópio, martelo de sonorização, aparelho ultrassons" },
      drum:{ name:"Balão de vapor", check:"Inspecionar superfícies internas: corrosão geral, picadas, fissuras nas soldaduras. Inspecionar separador vapor/água. Limpar depósitos de lama e incrustações. Inspecionar ligações.", tools:"Inspeção visual, escova, endoscópio" },
      furnace:{ name:"Câmara de combustão (forno)", check:"Inspecionar refratários (fissuras, erosão). Procurar pontos de sobreaquecimento (manchas castanhas/azuis). Inspecionar juntas do queimador.", tools:"Lâmpada, martelo, controlo visual" },
      burner:{ name:"Queimador e bico", check:"Desmontar e inspecionar bico (desgaste, obstrução parcial, ângulo de pulverização). Inspecionar corpo do queimador. Verificar elétrodo de acendimento (folga, desgaste).", tools:"Micrómetro, comparador de orifício" },
      safetyvalves:{ name:"Válvulas de segurança", check:"Desmontar e inspecionar assento (riscos, erosão). Inspecionar disco (deformação, desgaste). Substituir juntas. Recalibrar. Testar após montagem.", tools:"Calibre, banco de teste de pressão" },
      waterside:{ name:"Lado água (waterside)", check:"Inspecionar superfícies internas: incrustações (branco/amarelado), corrosão (picadas). Testar aderência das incrustações. Medir espessura dos depósitos.", tools:"Martelo, faca, lâmpada" },
    },
    cleaning:{
      chemical:{ name:"Desincustação química", desc:"Circulação de solução ácida (ácido cítrico 5%, ácido clorídrico diluído) no circuito de água para dissolver as incrustações. Duração: 4-12 horas. Enxaguamento abundante com água doce (pH neutro na saída). Passivação final." },
      mechanical:{ name:"Limpeza mecânica", desc:"Escova de alta pressão, turbinas rotativas ou jactos de água a alta pressão nas superfícies acessíveis. Eficaz em depósitos duros. Frequentemente combinado com limpeza química." },
      sootblowing:{ name:"Sopro de fuligem (EGE)", desc:"Injeção de vapor a alta pressão (8-10 bar) nas superfícies externas dos tubos do EGE para remover depósitos de fuligem. Frequência: 1-2 vezes por dia em navegação." },
      hydroblasting:{ name:"Hydroblasting (jacto água muito alta pressão)", desc:"Limpeza por jacto de água a muito alta pressão (500-3000 bar). Eficaz em todos os tipos de depósitos. Requer EPI especiais. Apenas pessoal qualificado." },
    },
    classInspections:{
      annual_survey:{ name:"Inspeção anual", desc:"Inspeção externa da caldeira em serviço. Controlo de válvulas, manómetros, indicadores de nível. Verificação de registos de manutenção e análise de água. Teste de alarmes." },
      intermediate:{ name:"Inspeção intermédia (2,5 anos)", desc:"Inspeção interna após paragem e arrefecimento. Tubos, balão, forno, válvulas. Medições de espessura se necessário. Teste hidrostático possível." },
      special:{ name:"Inspeção especial (5 anos)", desc:"A mais completa. Desmontagem de válvulas, inspeção de todos os componentes, medições de espessura, teste hidrostático obrigatório (1,5× PMS). Certificado de caldeira renovado." },
      hydrotest:{ name:"Teste hidrostático", desc:"Enchimento com água (NUNCA ar comprimido) e pressurização a 1,5× a PMS. Manter 30-60 minutos. Inspecionar todas as soldaduras e superfícies. De 5 em 5 anos ou após reparações importantes." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Que precauções de segurança devem ser tomadas antes de entrar numa caldeira para inspeção interna?",
        a:"1. Paragem completa: queimador apagado mínimo 24-48h (arrefecimento total < 40 degC). Fechar e condenar todas as válvulas (LOTO). 2. Despressurização confirmada: verificar pressão = 0 bar em todos os manómetros. 3. Análise da atmosfera: O₂ > 19,5%, sem gases tóxicos (CO < 25 ppm). 4. Licença de trabalho em espaço confinado assinada. 5. Ventilação ativa. 6. Equipa de resgate no exterior. 7. EPI: arnês, capacete, lâmpada ATEX portátil. 8. Meios de evacuação previstos." },
      { q:"O que é um teste hidrostático numa caldeira e por que é necessário?",
        a:"Enchimento com água fria e pressurização a 1,5× a PMS (NUNCA com ar comprimido). Manter 30-60 minutos. Inspecionar soldaduras e superfícies. Deteta fissuras e defeitos não visíveis visualmente. Verifica integridade de soldaduras após reparações. Exigência regulamentar da sociedade de classificação (de 5 em 5 anos). Com ar comprimido, a energia libertada em caso de rotura seria explosiva." },
      { q:"Como realizar uma desincustação química de uma caldeira marinha?",
        a:"1. Preparação: caldeira fora de serviço e arrefecida (< 40 degC), analisar depósitos. 2. Inibição: adicionar inibidor de corrosão à solução ácida. 3. Enchimento: encher com solução ácida diluída (ex: ácido cítrico 5%). 4. Circulação: bombear 4-12 horas. Controlar concentração. 5. Enxaguamento: esvaziar e enxaguar abundantemente com água doce (pH > 6,5). 6. Passivação: encher com solução passivante (fosfato + alcalinizante). 7. Inspeção final antes de retomar serviço. Registar tudo." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 - PMS ──────────────────────────────────────────────
function PMSSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("daily");
  const items = t.pms;
  const cols: Record<string,string> = {daily:C.maint,weekly:C.inspect,monthly:C.repair,annual:C.fire};
  const icons: Record<string,string> = {daily:"📅",weekly:"📆",monthly:"🔧",annual:"🔩"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.maint}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.maint}44`}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.maint,fontWeight:700,marginBottom:10}}>{icons[sel]} {items[sel].name}</div>
        {items[sel].ops.map((op:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:cols[sel]||C.maint,flexShrink:0}}>▸</span><span>{op}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SVG 2 - INSPECTION POINTS ────────────────────────────────
function InspectionSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string|null>(null);
  const items = t.inspPoints;
  const cols: Record<string,string> = {tubes:C.inspect,drum:C.maint,furnace:C.fire,burner:C.repair,safetyvalves:C.danger,waterside:C.clean};
  const icons: Record<string,string> = {tubes:"🔩",drum:"🫧",furnace:"🔥",burner:"⚙️",safetyvalves:"🔴",waterside:"💧"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.inspect}33`}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(sel===key?null:key)} style={{
            padding:"8px 4px",borderRadius:10,fontSize:12,cursor:"pointer",
            background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?cols[key]:"rgba(240,244,255,0.45)",textAlign:"center",
          }}>{icons[key]}</button>
        ))}
      </div>
      {sel&&(
        <div style={{padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.inspect}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
          <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{icons[sel]} {items[sel].name}</div>
          <div style={{marginBottom:6}}>{items[sel].check}</div>
          <div style={{fontSize:10,color:cols[sel],fontWeight:700}}>🔧 {items[sel].tools}</div>
        </div>
      )}
      {!sel&&<div style={{textAlign:"center",fontSize:11,color:"rgba(240,244,255,0.3)",padding:16}}>{t.s2hint}</div>}
    </div>
  );
}

// ── SVG 3 - CLEANING ─────────────────────────────────────────
function CleaningSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("chemical");
  const items = t.cleaning;
  const cols: Record<string,string> = {chemical:C.clean,mechanical:C.inspect,sootblowing:C.repair,hydroblasting:C.maint};
  const icons: Record<string,string> = {chemical:"🧪",mechanical:"🔧",sootblowing:"💨",hydroblasting:"💦"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.clean}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.clean}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.clean,fontWeight:700,marginBottom:8}}>{icons[sel]} {items[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 4 - CLASS INSPECTIONS ────────────────────────────────
function ClassSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("special");
  const items = t.classInspections;
  const cols: Record<string,string> = {annual_survey:C.maint,intermediate:C.inspect,special:C.fire,hydrotest:C.clean};
  const icons: Record<string,string> = {annual_survey:"📋",intermediate:"🔍",special:"⭐",hydrotest:"💧"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.fire}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.fire}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.fire,fontWeight:700,marginBottom:8}}>{icons[sel]} {items[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      </div>
    </div>
  );
}


const ACCIDENT_L6: any = {
  fr: {
    title: "CAS REEL : Explosion de chaudiere apres maintenance - CSC Rong Hai (rapport d'enquete)",
    body: "Sur le navire de charge general CSC Rong Hai, une explosion de chaudiere s'est produite en chantier naval a l'issue de travaux de maintenance, tuant un surintendant de l'armateur, un membre du personnel du chantier et deux membres d'equipage, et blessant sept autres personnes. L'enquete a etabli que la cause immediate etait l'isolement de la soupape de surete duplex pendant la remise en service de la chaudiere apres maintenance, ce qui a permis a la pression de depasser les niveaux de securite sans aucune protection active. Parmi les facteurs contributifs identifies figuraient une mauvaise communication entre les equipes, le non-respect des procedures etablies, l'absence d'un superviseur competent sur place pendant l'operation critique, et une remise en service de la chaudiere sans les verifications prealables appropriees.",
    lessons: [
      "Une soupape de surete ne doit JAMAIS etre isolee, meme temporairement et meme pendant des travaux de maintenance ou d'essai : c'est la derniere ligne de defense mecanique contre une explosion.",
      "Toute remise en service d'une chaudiere apres maintenance doit suivre une procedure ecrite et verifiee, incluant la confirmation explicite que toutes les protections (soupapes, alarmes, interverrouillages) ont ete reconnectees et sont fonctionnelles.",
      "Une communication claire entre les equipes du chantier et l'equipage du navire est essentielle : chacun doit savoir precisement quels systemes sont isoles et quand ils sont remis en service.",
      "La presence d'un superviseur competent et clairement identifie pendant les operations critiques (demarrage apres maintenance) n'est pas une formalite mais une mesure de securite active qui peut detecter une derive avant qu'elle ne devienne catastrophique.",
    ],
  },
  en: {
    title: "REAL CASE: Boiler explosion after maintenance - CSC Rong Hai (investigation report)",
    body: "On board the general cargo vessel CSC Rong Hai, a boiler explosion occurred at a shipyard following maintenance work, killing an owner's superintendent, a shipyard staff member and two crew members, and injuring seven others. The investigation found the immediate cause was the isolation of the duplex safety valve during boiler start-up after maintenance, allowing pressure to exceed safe levels with no active protection. Contributing factors identified included poor communication between teams, failure to follow established procedures, the absence of a competent supervisor on site during the critical operation, and boiler start-up without proper prior checks.",
    lessons: [
      "A safety valve must NEVER be isolated, even temporarily and even during maintenance or testing: it is the last mechanical line of defence against an explosion.",
      "Every boiler return to service after maintenance must follow a written, verified procedure, including explicit confirmation that all protections (valves, alarms, interlocks) have been reconnected and are functional.",
      "Clear communication between shipyard teams and the vessel's crew is essential: everyone must know precisely which systems are isolated and when they are returned to service.",
      "The presence of a clearly identified, competent supervisor during critical operations (start-up after maintenance) is not a formality but an active safety measure that can catch a deviation before it becomes catastrophic.",
    ],
  },
  es: {
    title: "CASO REAL: Explosion de caldera tras mantenimiento - CSC Rong Hai (informe de investigacion)",
    body: "A bordo del buque de carga general CSC Rong Hai, se produjo una explosion de caldera en un astillero tras trabajos de mantenimiento, matando a un superintendente del armador, a un miembro del personal del astillero y a dos tripulantes, e hiriendo a otras siete personas. La investigacion determino que la causa inmediata fue el aislamiento de la valvula de seguridad duplex durante la puesta en marcha de la caldera tras el mantenimiento, permitiendo que la presion superara los niveles seguros sin ninguna proteccion activa. Entre los factores contribuyentes identificados figuraban una mala comunicacion entre equipos, el incumplimiento de los procedimientos establecidos, la ausencia de un supervisor competente en el lugar durante la operacion critica, y la puesta en marcha de la caldera sin las verificaciones previas adecuadas.",
    lessons: [
      "Una valvula de seguridad nunca debe aislarse, ni siquiera temporalmente ni durante trabajos de mantenimiento o pruebas: es la ultima linea de defensa mecanica contra una explosion.",
      "Toda puesta en servicio de una caldera tras mantenimiento debe seguir un procedimiento escrito y verificado, incluyendo la confirmacion explicita de que todas las protecciones (valvulas, alarmas, enclavamientos) han sido reconectadas y son funcionales.",
      "Una comunicacion clara entre los equipos del astillero y la tripulacion del buque es esencial: todos deben saber con precision que sistemas estan aislados y cuando se ponen de nuevo en servicio.",
      "La presencia de un supervisor competente y claramente identificado durante las operaciones criticas (arranque tras mantenimiento) no es una formalidad sino una medida de seguridad activa que puede detectar una desviacion antes de que se convierta en catastrofica.",
    ],
  },
  pt: {
    title: "CASO REAL: Explosao de caldeira apos manutencao - CSC Rong Hai (relatorio de investigacao)",
    body: "A bordo do navio de carga geral CSC Rong Hai, ocorreu uma explosao de caldeira num estaleiro apos trabalhos de manutencao, matando um superintendente do armador, um membro do pessoal do estaleiro e dois tripulantes, e ferindo outras sete pessoas. A investigacao determinou que a causa imediata foi o isolamento da valvula de seguranca duplex durante o arranque da caldeira apos a manutencao, permitindo que a pressao ultrapassasse os niveis seguros sem qualquer protecao ativa. Entre os fatores contribuintes identificados estavam uma comunicacao deficiente entre equipas, o incumprimento dos procedimentos estabelecidos, a ausencia de um supervisor competente no local durante a operacao critica, e o arranque da caldeira sem as verificacoes previas adequadas.",
    lessons: [
      "Uma valvula de seguranca nunca deve ser isolada, nem mesmo temporariamente nem durante trabalhos de manutencao ou testes: e a ultima linha de defesa mecanica contra uma explosao.",
      "Todo o regresso ao servico de uma caldeira apos manutencao deve seguir um procedimento escrito e verificado, incluindo a confirmacao explicita de que todas as protecoes (valvulas, alarmes, intertravamentos) foram reconectadas e estao funcionais.",
      "Uma comunicacao clara entre as equipas do estaleiro e a tripulacao do navio e essencial: todos devem saber com precisao que sistemas estao isolados e quando sao repostos em servico.",
      "A presenca de um supervisor competente e claramente identificado durante operacoes criticas (arranque apos manutencao) nao e uma formalidade mas uma medida de seguranca ativa que pode detetar um desvio antes de se tornar catastrofico.",
    ],
  },
};

function AccidentCase({ lang }: { lang: string }) {
  const a = ACCIDENT_L6[lang] || ACCIDENT_L6.fr;
  const [open, setOpen] = useState(false);
  return (
    <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:"1px solid rgba(231,76,60,0.4)",background:"rgba(231,76,60,0.06)"}}>
      <div onClick={()=>setOpen(v=>!v)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#e74c3c",lineHeight:1.4}}>⚠ {a.title}</span>
        <span style={{color:"#e74c3c",fontSize:14,flexShrink:0}}>{open?"▲":"▼"}</span>
      </div>
      {open && (
        <div style={{padding:"0 14px 14px"}}>
          <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{a.body}</div>
          <div style={{fontSize:10,color:"#e74c3c",letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>ENSEIGNEMENTS</div>
          {a.lessons.map((l:string,i:number)=>(
            <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.5}}>
              <span style={{color:"#e74c3c",flexShrink:0}}>✓</span><span>{l}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ContentPhase({ lang, onStartQuiz }: { lang: string; onStartQuiz: ()=>void }) {
  const t = T[lang]||T.fr;
  const [shown,setShown]=useState([false,false,false]);
  const [inputs,setInputs]=useState(["","",""]);
  const toggle=(i:number)=>setShown(p=>p.map((v,j)=>j===i?!v:v));
  const section=(title:string,children:React.ReactNode,color=C.maint)=>(
    <div style={{marginBottom:18,borderRadius:14,overflow:"hidden",border:`1px solid ${color}33`}}>
      <div style={{background:`${color}18`,padding:"10px 14px",borderBottom:`1px solid ${color}22`}}>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color}}>{title}</span>
      </div>
      <div style={{padding:12}}>{children}</div>
    </div>
  );
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontSize:13,color:"rgba(240,244,255,0.65)",lineHeight:1.7,marginBottom:18,fontFamily:"Courier New"}}>{t.intro}</div>
      {section(t.s1title,<PMSSVG lang={lang}/>,C.maint)}
      {section(t.s2title,<InspectionSVG lang={lang}/>,C.inspect)}
      {section(t.s3title,<CleaningSVG lang={lang}/>,C.clean)}
      {section(t.s4title,<ClassSVG lang={lang}/>,C.fire)}
      <AccidentCase lang={lang}/>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,margin:"20px 0 14px"}}>✏️ {t.practiceTitle}</div>
      {t.questions.map((q:any,i:number)=>(
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.maint}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.maint,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <input type="text" placeholder="?" value={inputs[i]} onChange={e=>setInputs(p=>p.map((v,j)=>j===i?e.target.value:v))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",color:"#f0f4ff",fontSize:12,fontFamily:"Courier New",marginBottom:10,boxSizing:"border-box"}}/>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.maint}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.maint:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.maint:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.maint}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
      <BankTab lang={lang}/>
      <div style={{marginTop:20,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.gold}44`,padding:14}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:C.gold,letterSpacing:1,marginBottom:10}}>✦ {t.keypoints}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:7,fontSize:12,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.gold,flexShrink:0}}>✦</span><span>{k}</span>
          </div>
        ))}
      </div>
      <button onClick={onStartQuiz} style={{marginTop:20,width:"100%",padding:"16px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#6dbf8a,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>
        {lang==="fr"?"✅ COMMENCER LE QUIZ":lang==="en"?"✅ START QUIZ":lang==="es"?"✅ EMPEZAR QUIZ":"✅ COMEÇAR QUIZ"}
      </button>
    </div>
  );
}
// LessonE3_L6 - PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Quelles sont les precautions obligatoires avant d'entrer dans une chaudiere pour inspection ?",opts:["Aucune precaution particuliere n'est requise","Arret du bruleur 24-48h, condamnation des vannes (LOTO), pression a 0 bar confirmee, et analyse d'atmosphere (O2, CO)","Uniquement attendre que la chaudiere refroidisse","Porter uniquement des gants de protection"],correct:1,exp:"L'entree en chaudiere est une entree en espace confine : elle exige l'arret du bruleur (24-48h, T < 40 degC), la condamnation des vannes (LOTO), la confirmation de pression nulle, l'analyse d'atmosphere (O2 19,5-23,5%, CO < 25 ppm) et un permis de travail signe."},
      {q:"Pourquoi ne doit-on jamais utiliser d'air comprime pour un test hydrostatique de chaudiere ?",opts:["L'air comprime est trop cher a utiliser","En cas de rupture, l'energie emmagasinee dans l'air comprime se libere instantanement et provoque une explosion destructrice, contrairement a l'eau incompressible","L'air comprime endommage les soudures","Il n'y a aucune difference entre les deux methodes"],correct:1,exp:"Le test hydrostatique utilise de l'eau (incompressible) : en cas de rupture, peu d'energie est liberee (simple fuite). Avec de l'air comprime (gaz compressible), une rupture libere instantanement toute l'energie emmagasinee, causant une explosion destructrice."},
      {q:"Comment detecte-t-on l'entartrage lors d'une inspection interne de chaudiere ?",opts:["Uniquement par une analyse chimique en laboratoire externe","Par la couleur blanche/jaunatre des surfaces, un test au couteau/marteau et la mesure d'epaisseur du depot","Le tartre n'est jamais visible a l'inspection","En mesurant uniquement la pression de service"],correct:1,exp:"L'entartrage se detecte par la couleur blanche ou jaunatre caracteristique (CaCO3), un test au couteau/marteau (le tartre dur s'eclate), et la mesure d'epaisseur. Au-dela de 1mm, un nettoyage chimique est necessaire."},
      {q:"Quelles sont les principales methodes de nettoyage d'une chaudiere marine ?",opts:["Uniquement le rincage a l'eau claire","Detartrage chimique, nettoyage mecanique (brosse/hydroblasting) et soufflage de suie pour l'economiseur","Le remplacement systematique de la chaudiere","Aucune methode n'est necessaire si l'eau est traitee"],correct:1,exp:"Les methodes incluent le detartrage chimique (acide citrique ou HCl dilue), le nettoyage mecanique (brosse haute pression, hydroblasting 500-3000 bar) et le soufflage de suie (vapeur 8-10 bar) pour l'economiseur de gaz d'echappement."},
      {q:"Quel est le cycle d'inspection typique d'une chaudiere marine par la societe de classification ?",opts:["Une seule inspection a la construction du navire","Inspection annuelle externe, intermediaire interne a 2,5 ans, et speciale complete (avec test hydrostatique) a 5 ans","Une inspection tous les 10 ans uniquement","Aucune inspection reglementaire n'est requise"],correct:1,exp:"Le cycle comprend une inspection externe annuelle, une inspection interne intermediaire a 2,5 ans, et une inspection speciale complete avec test hydrostatique a 5 ans pour le renouvellement du certificat."},
      {q:"Pourquoi la passivation est-elle necessaire apres un detartrage chimique ?",opts:["Elle n'est pas necessaire, c'est une etape optionnelle","Le detartrage dissout la couche d'oxyde protectrice, exposant le metal a une corrosion immediate ; la passivation forme une nouvelle couche protectrice","Elle sert uniquement a ameliorer l'aspect esthetique des tubes","Elle remplace le traitement chimique normal de l'eau"],correct:1,exp:"Le detartrage chimique dissout aussi la couche d'oxyde protectrice. Sans passivation (solution alcaline avec inhibiteurs de corrosion), le metal expose subirait une attaque corrosive immediate. La chaudiere ne doit pas etre remise en service sans passivation."},
      {q:"Comment inspecte-t-on les soupapes de surete lors d'un arret de maintenance ?",opts:["Un simple controle visuel externe suffit","Deposer chaque soupape, inspecter siege et clapet, remplacer tous les joints, et recalibrer sur banc de test a la pression de tarage","Les soupapes de surete ne necessitent jamais d'inspection","Uniquement verifier la couleur de la soupape"],correct:1,exp:"L'inspection complete comprend la depose de chaque soupape, l'inspection du siege et du clapet, le remplacement systematique des joints (jamais de reutilisation), et le recalibrage sur banc de test a la pression de tarage specifiee."},
      {q:"Quels sont les principaux types de corrosion observables dans une chaudiere ?",opts:["Il n'existe qu'un seul type de corrosion possible","Corrosion par piqures (oxygene), corrosion acide generalisee et corrosion caustique (fissuration sous contrainte)","Uniquement la rouille superficielle sans gravite","La corrosion ne peut apparaitre que sur les soupapes"],correct:1,exp:"Les trois types principaux sont la corrosion par piqures (cavites localisees dues a l'oxygene), la corrosion acide (attaque generalisee uniforme) et la corrosion caustique (fissures fines sous contrainte, SCC)."},
      {q:"Que faut-il documenter lors de l'evaluation de l'etat general d'une chaudiere en inspection interne ?",opts:["Rien n'a besoin d'etre documente formellement","L'etat des surfaces (tartre, corrosion), l'etat des soudures, des tubes cote feu et de la structure, avec photos si possible","Uniquement la date de l'inspection","Seulement le nom de l'inspecteur"],correct:1,exp:"Il faut documenter l'etat des surfaces cote eau (tartre, corrosion), l'etat des soudures et raccords, l'etat des tubes cote feu et du refractaire, la structure, avec photos, epaisseurs mesurees et nature des depots observes."},
      {q:"Que faut-il verifier sur un gicleur de bruleur lors de son inspection mensuelle ?",opts:["Uniquement sa couleur exterieure","L'usure de l'orifice (diametre), les depots internes, l'angle de spray et l'etat du siege","Le gicleur ne necessite pas d'inspection reguliere","Uniquement le prix de remplacement"],correct:1,exp:"L'inspection mensuelle verifie l'usure de l'orifice (remplacement si > 5% du diametre nominal), les depots internes (nettoyage au solvant), l'angle de spray et l'etat du siege. Un gicleur use cause une flamme deformee et un encrassement des tubes."},
      {q:"En quoi consiste le soufflage de suie (soot blowing) sur un economiseur ECE ?",opts:["Un nettoyage manuel a la brosse metallique","Injection de vapeur haute pression (8-10 bar) par une lance rotative sur les tubes pour deloger la suie et les cendres","Un rincage a l'eau froide sous pression","Un traitement chimique des gaz d'echappement"],correct:1,exp:"Le soot blowing injecte de la vapeur haute pression (8-10 bar) via une lance rotative balayant les rangees de tubes pour deloger suie et cendres, generalement 1 a 2 fois par jour, evacuees ensuite conformement a MARPOL."},
      {q:"Quelles informations minimales doit contenir un rapport d'inspection de chaudiere ?",opts:["Uniquement la date et la signature","Identification du navire, etat des surfaces internes, mesures d'epaisseur, resultats de l'epreuve hydraulique, etat des soupapes et recommandations","Seulement le nom de la societe de classification","Aucun contenu specifique n'est exige"],correct:1,exp:"Le rapport doit inclure l'identification (navire, numero chaudiere, date), l'etat des surfaces internes (cote eau et feu), les mesures d'epaisseur, les resultats de l'epreuve hydraulique, l'etat des soupapes de surete, les travaux realises et les recommandations pour la prochaine inspection."},
      {q:"Quelle est la difference entre les intervalles de maintenance bases sur les heures de fonctionnement et ceux bases sur le calendrier dans un PMS ?",opts:["Il n'existe aucune difference pratique","Les heures de fonctionnement suivent l'usure reelle (ex: gicleur toutes les 2000h), le calendrier suit des echeances fixes (ex: inspection annuelle) independamment de l'usage","Seul le calendrier est utilise sur les chaudieres","Seules les heures de fonctionnement sont reglementaires"],correct:1,exp:"Un systeme de maintenance planifiee (PMS) combine des intervalles bases sur les heures de fonctionnement (qui suivent l'usure reelle des composants comme les gicleurs) et des intervalles calendaires fixes (comme les inspections reglementaires annuelles), independamment du temps de fonctionnement."},
      {q:"Pourquoi le refractaire (briques isolantes) du foyer d'une chaudiere doit-il etre inspecte regulierement ?",opts:["Il n'a qu'un role esthetique","Il protege la structure metallique de la chaleur directe du foyer ; sa degradation expose la coque a des temperatures dangereuses","Il ne necessite aucune inspection particuliere","Il sert uniquement a l'isolation phonique"],correct:1,exp:"Le refractaire protege la structure metallique du foyer de la chaleur directe de la flamme. Sa degradation (fissures, effritement) expose la coque metallique a des temperatures excessives, pouvant causer une deformation structurelle grave."},
      {q:"Pourquoi la conservation des documents d'historique de maintenance d'une chaudiere est-elle importante ?",opts:["Ce n'est qu'une formalite administrative sans consequence","Elle permet de tracer l'evolution de l'etat de la chaudiere dans le temps et est exigee lors des audits PSC et de classification","Les documents peuvent etre detruits apres chaque inspection","Seul le dernier rapport d'inspection doit etre conserve"],correct:1,exp:"L'historique complet de maintenance permet de tracer l'evolution de l'etat de la chaudiere (usure, reparations, remplacements) dans le temps, et constitue une exigence lors des audits du Port State Control (PSC) et des societes de classification."},
    ],
    en:[
      {q:"What mandatory precautions are required before entering a boiler for inspection?",opts:["No particular precaution is required","Burner shutdown 24-48h, valve isolation (LOTO), confirmed zero pressure, and atmosphere analysis (O2, CO)","Only wait for the boiler to cool down","Only wear protective gloves"],correct:1,exp:"Entering a boiler is a confined space entry: it requires burner shutdown (24-48h, T < 40 degC), valve lockout-tagout, confirmed zero pressure, atmosphere analysis (O2 19.5-23.5%, CO < 25 ppm) and a signed work permit."},
      {q:"Why must compressed air never be used for a boiler hydrostatic test?",opts:["Compressed air is too expensive to use","In case of rupture, energy stored in compressed air releases instantly causing a destructive explosion, unlike incompressible water","Compressed air damages the welds","There is no difference between the two methods"],correct:1,exp:"The hydrostatic test uses water (incompressible): a rupture releases little energy (simple leak). With compressed air (compressible gas), a rupture instantly releases all stored energy, causing a destructive explosion."},
      {q:"How is scale detected during an internal boiler inspection?",opts:["Only by external laboratory chemical analysis","By the white/yellowish colour of surfaces, a knife/hammer test, and deposit thickness measurement","Scale is never visible on inspection","By measuring only service pressure"],correct:1,exp:"Scale is detected by its characteristic white or yellowish colour (CaCO3), a knife/hammer test (hard scale chips off), and thickness measurement. Beyond 1mm, chemical cleaning is required."},
      {q:"What are the main cleaning methods for a marine boiler?",opts:["Only rinsing with clean water","Chemical descaling, mechanical cleaning (brush/hydroblasting) and soot blowing for the economiser","Systematic replacement of the boiler","No method is necessary if water is treated"],correct:1,exp:"Methods include chemical descaling (citric acid or diluted HCl), mechanical cleaning (high-pressure brush, hydroblasting 500-3000 bar) and soot blowing (8-10 bar steam) for the exhaust gas economiser."},
      {q:"What is the typical inspection cycle for a marine boiler by the classification society?",opts:["A single inspection at vessel construction","Annual external inspection, intermediate internal inspection at 2.5 years, and complete special inspection (with hydrostatic test) at 5 years","An inspection only every 10 years","No regulatory inspection is required"],correct:1,exp:"The cycle includes an annual external inspection, an intermediate internal inspection at 2.5 years, and a complete special inspection with hydrostatic test at 5 years for certificate renewal."},
      {q:"Why is passivation necessary after chemical descaling?",opts:["It is not necessary, it is an optional step","Descaling dissolves the protective oxide layer, exposing metal to immediate corrosion; passivation forms a new protective layer","It only improves the tubes' appearance","It replaces normal water treatment"],correct:1,exp:"Chemical descaling also dissolves the protective oxide layer. Without passivation (alkaline solution with corrosion inhibitors), the exposed metal would suffer immediate corrosive attack. The boiler must not return to service without passivation."},
      {q:"How are safety valves inspected during a maintenance shutdown?",opts:["A simple external visual check is sufficient","Remove each valve, inspect seat and disc, replace all seals, and recalibrate on a test bench at set pressure","Safety valves never require inspection","Only check the valve's colour"],correct:1,exp:"Full inspection includes removing each valve, inspecting the seat and disc, systematically replacing seals (never reused), and recalibrating on a test bench at the specified set pressure."},
      {q:"What are the main types of corrosion observable in a boiler?",opts:["There is only one possible type of corrosion","Pitting corrosion (oxygen), generalised acid corrosion, and caustic corrosion (stress corrosion cracking)","Only superficial rust with no severity","Corrosion can only appear on the valves"],correct:1,exp:"The three main types are pitting corrosion (localised cavities from oxygen), acid corrosion (uniform generalised attack) and caustic corrosion (fine stress cracks, SCC)."},
      {q:"What must be documented when assessing a boiler's general condition during internal inspection?",opts:["Nothing needs formal documentation","Surface condition (scale, corrosion), weld condition, fire-side tubes and structure, with photos if possible","Only the inspection date","Only the inspector's name"],correct:1,exp:"Must document water-side surface condition (scale, corrosion), weld and fitting condition, fire-side tube and refractory condition, structure, with photos, measured thicknesses and nature of deposits observed."},
      {q:"What must be checked on a burner nozzle during its monthly inspection?",opts:["Only its exterior colour","Orifice wear (diameter), internal deposits, spray angle and seat condition","The nozzle does not require regular inspection","Only the replacement cost"],correct:1,exp:"Monthly inspection checks orifice wear (replace if > 5% of nominal diameter), internal deposits (solvent cleaning), spray angle and seat condition. A worn nozzle causes a distorted flame and fire-side tube fouling."},
      {q:"What does soot blowing on an EGE economiser consist of?",opts:["Manual cleaning with a wire brush","High-pressure steam injection (8-10 bar) via a rotating lance on the tubes to dislodge soot and ash","Cold water rinsing under pressure","Chemical treatment of exhaust gases"],correct:1,exp:"Soot blowing injects high-pressure steam (8-10 bar) via a rotating lance sweeping across tube rows to dislodge soot and ash, generally 1-2 times a day, then disposed of per MARPOL."},
      {q:"What minimum information must a boiler inspection report contain?",opts:["Only the date and signature","Vessel identification, internal surface condition, thickness measurements, hydraulic test results, valve condition and recommendations","Only the classification society's name","No specific content is required"],correct:1,exp:"The report must include identification (vessel, boiler number, date), internal surface condition (water and fire side), thickness measurements, hydraulic test results, safety valve condition, work performed and recommendations for the next inspection."},
      {q:"What is the difference between running-hours-based and calendar-based maintenance intervals in a PMS?",opts:["There is no practical difference","Running hours follow actual wear (e.g. nozzle every 2000h), calendar follows fixed deadlines (e.g. annual inspection) regardless of usage","Only the calendar is used on boilers","Only running hours are regulatory"],correct:1,exp:"A planned maintenance system (PMS) combines running-hours-based intervals (following actual component wear such as nozzles) and fixed calendar intervals (such as regulatory annual inspections), regardless of operating time."},
      {q:"Why must the furnace refractory (insulating bricks) of a boiler be inspected regularly?",opts:["It only has an aesthetic role","It protects the metal structure from direct furnace heat; its degradation exposes the shell to dangerous temperatures","It requires no particular inspection","It only serves for sound insulation"],correct:1,exp:"The refractory protects the furnace's metal structure from direct flame heat. Its degradation (cracks, crumbling) exposes the metal shell to excessive temperatures, potentially causing serious structural deformation."},
      {q:"Why is retaining boiler maintenance history documentation important?",opts:["It is only an administrative formality with no consequence","It allows tracking the boiler's condition over time and is required during PSC and classification audits","Documents can be destroyed after each inspection","Only the latest inspection report needs to be kept"],correct:1,exp:"Complete maintenance history allows tracking the boiler's condition (wear, repairs, replacements) over time, and is a requirement during Port State Control (PSC) and classification society audits."},
    ],
    es:[
      {q:"¿Que precauciones obligatorias hay antes de entrar en una caldera para inspeccion?",opts:["No se requiere ninguna precaucion particular","Parada del quemador 24-48h, aislamiento de valvulas (LOTO), presion a 0 bar confirmada, y analisis de atmosfera (O2, CO)","Solo esperar a que la caldera se enfrie","Solo usar guantes de proteccion"],correct:1,exp:"Entrar en una caldera es una entrada en espacio confinado: exige parada del quemador (24-48h, T < 40 degC), bloqueo de valvulas (LOTO), presion nula confirmada, analisis de atmosfera (O2 19,5-23,5%, CO < 25 ppm) y un permiso de trabajo firmado."},
      {q:"¿Por que nunca se debe usar aire comprimido para una prueba hidrostatica de caldera?",opts:["El aire comprimido es demasiado caro de usar","En caso de rotura, la energia almacenada en el aire comprimido se libera instantaneamente provocando una explosion destructiva, a diferencia del agua incompresible","El aire comprimido dana las soldaduras","No hay ninguna diferencia entre ambos metodos"],correct:1,exp:"La prueba hidrostatica usa agua (incompresible): una rotura libera poca energia (simple fuga). Con aire comprimido (gas compresible), una rotura libera instantaneamente toda la energia almacenada, causando una explosion destructiva."},
      {q:"¿Como se detecta la incrustacion durante una inspeccion interna de caldera?",opts:["Solo mediante analisis quimico de laboratorio externo","Por el color blanco/amarillento de las superficies, una prueba de cuchillo/martillo, y la medicion del espesor del deposito","La incrustacion nunca es visible en la inspeccion","Midiendo solo la presion de servicio"],correct:1,exp:"La incrustacion se detecta por su color caracteristico blanco o amarillento (CaCO3), una prueba de cuchillo/martillo (la incrustacion dura se desprende), y la medicion del espesor. Por encima de 1mm, se necesita limpieza quimica."},
      {q:"¿Cuales son los principales metodos de limpieza de una caldera marina?",opts:["Solo el enjuague con agua limpia","Desincrustacion quimica, limpieza mecanica (cepillo/hidrolimpieza) y soplado de hollin para el economizador","La sustitucion sistematica de la caldera","Ningun metodo es necesario si el agua esta tratada"],correct:1,exp:"Los metodos incluyen la desincrustacion quimica (acido citrico o HCl diluido), la limpieza mecanica (cepillo de alta presion, hidrolimpieza 500-3000 bar) y el soplado de hollin (vapor 8-10 bar) para el economizador de gases de escape."},
      {q:"¿Cual es el ciclo tipico de inspeccion de una caldera marina por la sociedad de clasificacion?",opts:["Una unica inspeccion en la construccion del buque","Inspeccion externa anual, inspeccion interna intermedia a los 2,5 anos, e inspeccion especial completa (con prueba hidrostatica) a los 5 anos","Una inspeccion cada 10 anos unicamente","No se requiere ninguna inspeccion reglamentaria"],correct:1,exp:"El ciclo incluye una inspeccion externa anual, una inspeccion interna intermedia a los 2,5 anos, y una inspeccion especial completa con prueba hidrostatica a los 5 anos para la renovacion del certificado."},
      {q:"¿Por que es necesaria la pasivacion despues de una desincrustacion quimica?",opts:["No es necesaria, es un paso opcional","La desincrustacion disuelve la capa de oxido protectora, exponiendo el metal a corrosion inmediata; la pasivacion forma una nueva capa protectora","Solo sirve para mejorar el aspecto de los tubos","Sustituye al tratamiento quimico normal del agua"],correct:1,exp:"La desincrustacion quimica tambien disuelve la capa de oxido protectora. Sin pasivacion (solucion alcalina con inhibidores de corrosion), el metal expuesto sufriria un ataque corrosivo inmediato. La caldera no debe volver a servicio sin pasivacion."},
      {q:"¿Como se inspeccionan las valvulas de seguridad durante una parada de mantenimiento?",opts:["Basta un simple control visual externo","Desmontar cada valvula, inspeccionar asiento y disco, sustituir todas las juntas, y recalibrar en banco de pruebas a la presion de tarado","Las valvulas de seguridad nunca requieren inspeccion","Solo verificar el color de la valvula"],correct:1,exp:"La inspeccion completa incluye desmontar cada valvula, inspeccionar el asiento y el disco, sustituir sistematicamente las juntas (nunca reutilizar), y recalibrar en banco de pruebas a la presion de tarado especificada."},
      {q:"¿Cuales son los principales tipos de corrosion observables en una caldera?",opts:["Solo existe un tipo posible de corrosion","Corrosion por picaduras (oxigeno), corrosion acida generalizada y corrosion caustica (fisuracion bajo tension)","Solo oxido superficial sin gravedad","La corrosion solo puede aparecer en las valvulas"],correct:1,exp:"Los tres tipos principales son la corrosion por picaduras (cavidades localizadas por oxigeno), la corrosion acida (ataque generalizado uniforme) y la corrosion caustica (fisuras finas bajo tension, SCC)."},
      {q:"¿Que hay que documentar al evaluar el estado general de una caldera en inspeccion interna?",opts:["No es necesario documentar nada formalmente","El estado de las superficies (incrustacion, corrosion), el estado de las soldaduras, tubos del lado fuego y estructura, con fotos si es posible","Solo la fecha de la inspeccion","Solo el nombre del inspector"],correct:1,exp:"Hay que documentar el estado de las superficies del lado agua (incrustacion, corrosion), el estado de soldaduras y racores, el estado de los tubos del lado fuego y refractario, la estructura, con fotos, espesores medidos y naturaleza de los depositos observados."},
      {q:"¿Que hay que verificar en una tobera de quemador durante su inspeccion mensual?",opts:["Solo su color exterior","El desgaste del orificio (diametro), depositos internos, angulo de pulverizacion y estado del asiento","La tobera no requiere inspeccion regular","Solo el coste de sustitucion"],correct:1,exp:"La inspeccion mensual verifica el desgaste del orificio (sustituir si > 5% del diametro nominal), los depositos internos (limpieza con disolvente), el angulo de pulverizacion y el estado del asiento. Una tobera desgastada causa una llama deformada y ensuciamiento de tubos."},
      {q:"¿En que consiste el soplado de hollin (soot blowing) en un economizador EGE?",opts:["Una limpieza manual con cepillo metalico","Inyeccion de vapor de alta presion (8-10 bar) mediante una lanza rotativa sobre los tubos para desprender hollin y cenizas","Un enjuague con agua fria a presion","Un tratamiento quimico de los gases de escape"],correct:1,exp:"El soplado de hollin inyecta vapor de alta presion (8-10 bar) mediante una lanza rotativa que barre las filas de tubos para desprender hollin y cenizas, generalmente 1-2 veces al dia, evacuadas despues segun MARPOL."},
      {q:"¿Que informacion minima debe contener un informe de inspeccion de caldera?",opts:["Solo la fecha y la firma","Identificacion del buque, estado de las superficies internas, medidas de espesor, resultados de la prueba hidraulica, estado de las valvulas y recomendaciones","Solo el nombre de la sociedad de clasificacion","No se exige ningun contenido especifico"],correct:1,exp:"El informe debe incluir identificacion (buque, numero de caldera, fecha), estado de superficies internas (lado agua y fuego), medidas de espesor, resultados de la prueba hidraulica, estado de las valvulas de seguridad, trabajos realizados y recomendaciones para la proxima inspeccion."},
      {q:"¿Cual es la diferencia entre los intervalos de mantenimiento basados en horas de funcionamiento y los basados en calendario en un PMS?",opts:["No existe ninguna diferencia practica","Las horas de funcionamiento siguen el desgaste real (ej: tobera cada 2000h), el calendario sigue plazos fijos (ej: inspeccion anual) independientemente del uso","Solo se usa el calendario en las calderas","Solo las horas de funcionamiento son reglamentarias"],correct:1,exp:"Un sistema de mantenimiento planificado (PMS) combina intervalos basados en horas de funcionamiento (que siguen el desgaste real de componentes como las toberas) e intervalos calendarios fijos (como las inspecciones reglamentarias anuales), independientemente del tiempo de funcionamiento."},
      {q:"¿Por que debe inspeccionarse regularmente el refractario (ladrillos aislantes) del hogar de una caldera?",opts:["Solo tiene un papel estetico","Protege la estructura metalica del calor directo del hogar; su degradacion expone el casco a temperaturas peligrosas","No requiere ninguna inspeccion particular","Solo sirve para el aislamiento acustico"],correct:1,exp:"El refractario protege la estructura metalica del hogar del calor directo de la llama. Su degradacion (fisuras, desmoronamiento) expone el casco metalico a temperaturas excesivas, pudiendo causar una deformacion estructural grave."},
      {q:"¿Por que es importante conservar la documentacion del historial de mantenimiento de una caldera?",opts:["Es solo una formalidad administrativa sin consecuencias","Permite rastrear la evolucion del estado de la caldera en el tiempo y se exige en las auditorias PSC y de clasificacion","Los documentos pueden destruirse tras cada inspeccion","Solo debe conservarse el ultimo informe de inspeccion"],correct:1,exp:"El historial completo de mantenimiento permite rastrear la evolucion del estado de la caldera (desgaste, reparaciones, sustituciones) en el tiempo, y constituye una exigencia en las auditorias del Port State Control (PSC) y de las sociedades de clasificacion."},
    ],
    pt:[
      {q:"Que precaucoes obrigatorias existem antes de entrar numa caldeira para inspecao?",opts:["Nao e necessaria nenhuma precaucao particular","Paragem do queimador 24-48h, isolamento de valvulas (LOTO), pressao a 0 bar confirmada, e analise de atmosfera (O2, CO)","So esperar que a caldeira arrefeca","So usar luvas de protecao"],correct:1,exp:"Entrar numa caldeira e uma entrada em espaco confinado: exige paragem do queimador (24-48h, T < 40 degC), bloqueio de valvulas (LOTO), pressao nula confirmada, analise de atmosfera (O2 19,5-23,5%, CO < 25 ppm) e uma autorizacao de trabalho assinada."},
      {q:"Por que nunca se deve usar ar comprimido para um teste hidrostatico de caldeira?",opts:["O ar comprimido e demasiado caro de usar","Em caso de rutura, a energia armazenada no ar comprimido liberta-se instantaneamente provocando uma explosao destrutiva, ao contrario da agua incompressivel","O ar comprimido danifica as soldaduras","Nao ha diferenca nenhuma entre os dois metodos"],correct:1,exp:"O teste hidrostatico usa agua (incompressivel): uma rutura liberta pouca energia (simples fuga). Com ar comprimido (gas compressivel), uma rutura liberta instantaneamente toda a energia armazenada, causando uma explosao destrutiva."},
      {q:"Como se deteta a incrustacao durante uma inspecao interna de caldeira?",opts:["So por analise quimica de laboratorio externo","Pela cor branca/amarelada das superficies, um teste de faca/martelo, e a medicao da espessura do deposito","A incrustacao nunca e visivel na inspecao","Medindo apenas a pressao de servico"],correct:1,exp:"A incrustacao deteta-se pela sua cor caracteristica branca ou amarelada (CaCO3), um teste de faca/martelo (a incrustacao dura estala), e a medicao da espessura. Acima de 1mm, e necessaria limpeza quimica."},
      {q:"Quais sao os principais metodos de limpeza de uma caldeira marinha?",opts:["So o enxaguamento com agua limpa","Desincrustacao quimica, limpeza mecanica (escova/hidrolimpeza) e sopro de fuligem para o economizador","A substituicao sistematica da caldeira","Nenhum metodo e necessario se a agua for tratada"],correct:1,exp:"Os metodos incluem a desincrustacao quimica (acido citrico ou HCl diluido), a limpeza mecanica (escova de alta pressao, hidrolimpeza 500-3000 bar) e o sopro de fuligem (vapor 8-10 bar) para o economizador de gases de escape."},
      {q:"Qual e o ciclo tipico de inspecao de uma caldeira marinha pela sociedade classificadora?",opts:["Uma unica inspecao na construcao do navio","Inspecao externa anual, inspecao interna intermedia aos 2,5 anos, e inspecao especial completa (com teste hidrostatico) aos 5 anos","Uma inspecao apenas a cada 10 anos","Nao e exigida nenhuma inspecao regulamentar"],correct:1,exp:"O ciclo inclui uma inspecao externa anual, uma inspecao interna intermedia aos 2,5 anos, e uma inspecao especial completa com teste hidrostatico aos 5 anos para renovacao do certificado."},
      {q:"Por que e necessaria a passivacao apos uma desincrustacao quimica?",opts:["Nao e necessaria, e um passo opcional","A desincrustacao dissolve a camada de oxido protetora, expondo o metal a corrosao imediata; a passivacao forma uma nova camada protetora","So serve para melhorar o aspeto dos tubos","Substitui o tratamento quimico normal da agua"],correct:1,exp:"A desincrustacao quimica tambem dissolve a camada de oxido protetora. Sem passivacao (solucao alcalina com inibidores de corrosao), o metal exposto sofreria um ataque corrosivo imediato. A caldeira nao deve voltar ao servico sem passivacao."},
      {q:"Como se inspecionam as valvulas de seguranca durante uma paragem de manutencao?",opts:["Basta um simples controlo visual externo","Desmontar cada valvula, inspecionar assento e disco, substituir todas as juntas, e recalibrar em banco de teste na pressao de taramento","As valvulas de seguranca nunca requerem inspecao","So verificar a cor da valvula"],correct:1,exp:"A inspecao completa inclui desmontar cada valvula, inspecionar o assento e o disco, substituir sistematicamente as juntas (nunca reutilizar), e recalibrar em banco de teste na pressao de taramento especificada."},
      {q:"Quais sao os principais tipos de corrosao observaveis numa caldeira?",opts:["So existe um tipo possivel de corrosao","Corrosao por picadas (oxigenio), corrosao acida generalizada e corrosao caustica (fissuracao sob tensao)","So ferrugem superficial sem gravidade","A corrosao so pode aparecer nas valvulas"],correct:1,exp:"Os tres tipos principais sao a corrosao por picadas (cavidades localizadas por oxigenio), a corrosao acida (ataque generalizado uniforme) e a corrosao caustica (fissuras finas sob tensao, SCC)."},
      {q:"O que e preciso documentar ao avaliar o estado geral de uma caldeira em inspecao interna?",opts:["Nada precisa de ser documentado formalmente","O estado das superficies (incrustacao, corrosao), o estado das soldaduras, tubos do lado fogo e estrutura, com fotos se possivel","So a data da inspecao","So o nome do inspetor"],correct:1,exp:"E preciso documentar o estado das superficies do lado agua (incrustacao, corrosao), o estado de soldaduras e ligacoes, o estado dos tubos do lado fogo e refratario, a estrutura, com fotos, espessuras medidas e natureza dos depositos observados."},
      {q:"O que verificar num bico de queimador na sua inspecao mensal?",opts:["So a sua cor exterior","O desgaste do orificio (diametro), depositos internos, angulo de pulverizacao e estado do assento","O bico nao requer inspecao regular","So o custo de substituicao"],correct:1,exp:"A inspecao mensal verifica o desgaste do orificio (substituir se > 5% do diametro nominal), os depositos internos (limpeza com solvente), o angulo de pulverizacao e o estado do assento. Um bico desgastado causa uma chama deformada e sujidade nos tubos."},
      {q:"Em que consiste o sopro de fuligem (soot blowing) num economizador EGE?",opts:["Uma limpeza manual com escova metalica","Injecao de vapor de alta pressao (8-10 bar) atraves de uma lanca rotativa sobre os tubos para desprender fuligem e cinzas","Um enxaguamento com agua fria sob pressao","Um tratamento quimico dos gases de escape"],correct:1,exp:"O sopro de fuligem injeta vapor de alta pressao (8-10 bar) atraves de uma lanca rotativa que varre as filas de tubos para desprender fuligem e cinzas, geralmente 1-2 vezes por dia, evacuadas depois conforme a MARPOL."},
      {q:"Que informacao minima deve constar num relatorio de inspecao de caldeira?",opts:["So a data e a assinatura","Identificacao do navio, estado das superficies internas, medidas de espessura, resultados da prova hidraulica, estado das valvulas e recomendacoes","So o nome da sociedade classificadora","Nao e exigido nenhum conteudo especifico"],correct:1,exp:"O relatorio deve incluir identificacao (navio, numero da caldeira, data), estado das superficies internas (lado agua e fogo), medidas de espessura, resultados da prova hidraulica, estado das valvulas de seguranca, trabalhos realizados e recomendacoes para a proxima inspecao."},
      {q:"Qual e a diferenca entre os intervalos de manutencao baseados em horas de funcionamento e os baseados em calendario num PMS?",opts:["Nao existe nenhuma diferenca pratica","As horas de funcionamento seguem o desgaste real (ex: bico a cada 2000h), o calendario segue prazos fixos (ex: inspecao anual) independentemente do uso","So o calendario e usado nas caldeiras","So as horas de funcionamento sao regulamentares"],correct:1,exp:"Um sistema de manutencao planeada (PMS) combina intervalos baseados em horas de funcionamento (que seguem o desgaste real de componentes como os bicos) e intervalos calendaricos fixos (como as inspecoes regulamentares anuais), independentemente do tempo de funcionamento."},
      {q:"Por que o refratario (tijolos isolantes) da fornalha de uma caldeira deve ser inspecionado regularmente?",opts:["So tem um papel estetico","Protege a estrutura metalica do calor direto da fornalha; a sua degradacao expoe o casco a temperaturas perigosas","Nao requer nenhuma inspecao particular","So serve para isolamento acustico"],correct:1,exp:"O refratario protege a estrutura metalica da fornalha do calor direto da chama. A sua degradacao (fissuras, esboroamento) expoe o casco metalico a temperaturas excessivas, podendo causar uma deformacao estrutural grave."},
      {q:"Por que e importante conservar a documentacao do historico de manutencao de uma caldeira?",opts:["E apenas uma formalidade administrativa sem consequencias","Permite rastrear a evolucao do estado da caldeira ao longo do tempo e e exigida nas auditorias PSC e de classificacao","Os documentos podem ser destruidos apos cada inspecao","So deve ser conservado o ultimo relatorio de inspecao"],correct:1,exp:"O historico completo de manutencao permite rastrear a evolucao do estado da caldeira (desgaste, reparacoes, substituicoes) ao longo do tempo, e constitui uma exigencia nas auditorias do Port State Control (PSC) e das sociedades de classificacao."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"À quelle pression est réalisé le test hydrostatique d'une chaudière marine ?",opts:["Pression de service (PMS)","1,25 × PMS","1,5 × PMS","2 × PMS"],correct:2,exp:"Le test hydrostatique est réalisé à 1,5 fois la pression maximale de service (PMS). C'est la valeur réglementaire imposée par les sociétés de classification. Cette surpression permet de détecter les fissures et défauts structurels non visibles à l'inspection visuelle, sans risquer de dépasser les limites de résistance de la chaudière."},
      {q:"Quelle est la durée minimale de refroidissement d'une chaudière avant d'y entrer pour inspection ?",opts:["2-4 heures","8-12 heures","24-48 heures","7 jours"],correct:2,exp:"La chaudière doit être hors service depuis au moins 24-48 heures pour atteindre une température inférieure à 40 degC avant l'entrée en inspection. Cette durée est nécessaire pour le refroidissement complet des métaux et de l'eau résiduelle. La température doit être vérifiée avant l'entrée (thermomètre ou toucher de la paroi extérieure)."},
      {q:"Qu'est-ce que la 'passivation' après un détartrage chimique ?",opts:["Un rinçage à l'eau froide","Un traitement alcalin qui reprotège les surfaces métalliques","Un test d'étanchéité","Un traitement de la vapeur"],correct:1,exp:"La passivation est un traitement chimique alcalin (solution de phosphate ou molybdate) appliqué sur les surfaces métalliques après détartrage pour reformer une couche protectrice d'oxyde qui protège contre la corrosion. Sans passivation, les surfaces nettoyées sont vulnérables à la corrosion immédiate dès le contact avec l'eau et l'oxygène."},
      {q:"À quelle fréquence la société de classification réalise-t-elle une inspection spéciale d'une chaudière marine ?",opts:["Tous les ans","Tous les 2,5 ans","Tous les 5 ans","Tous les 10 ans"],correct:2,exp:"L'inspection spéciale (Special Survey) d'une chaudière marine est réalisée tous les 5 ans par la société de classification. C'est l'inspection la plus complète : elle comprend le démontage des soupapes, les mesures d'épaisseur, le test hydrostatique et le renouvellement du certificat de chaudière."},
      {q:"Pourquoi ne doit-on jamais utiliser d'air comprimé pour un test hydrostatique ?",opts:["L'air est trop coûteux","En cas de rupture, l'air comprimé libère une énergie explosive dangereuse","L'air corrode les parois","L'air fausse les mesures de pression"],correct:1,exp:"L'air comprimé (gaz compressible) emmagasine une grande quantité d'énergie. En cas de rupture pendant l'essai, cette énergie est libérée instantanément et de façon explosive, causant des dégâts très importants et des blessures graves. L'eau (incompressible) ne stocke pas d'énergie potentielle − en cas de rupture, il n'y a qu'une fuite d'eau sans explosion."},
    ],
    en:[
      {q:"At what pressure is a marine boiler hydrostatic test performed?",opts:["Service pressure (MAWP)","1.25 × MAWP","1.5 × MAWP","2 × MAWP"],correct:2,exp:"Hydrostatic test performed at 1.5 times maximum allowable working pressure (MAWP). This is the regulatory value imposed by classification societies. This overpressure detects cracks and structural defects not visible in visual inspection, without exceeding boiler structural limits."},
      {q:"What is the minimum cooling time for a boiler before entry for inspection?",opts:["2-4 hours","8-12 hours","24-48 hours","7 days"],correct:2,exp:"Boiler must be shut down for at least 24-48 hours to reach temperature below 40 degC before inspection entry. This time is needed for complete metal and residual water cooling. Temperature must be verified before entry (thermometer or external wall touch)."},
      {q:"What is 'passivation' after chemical descaling?",opts:["A cold water rinse","An alkaline treatment that re-protects metal surfaces","A tightness test","A steam treatment"],correct:1,exp:"Passivation is an alkaline chemical treatment (phosphate or molybdate solution) applied to metal surfaces after descaling to reform a protective oxide layer guarding against corrosion. Without passivation, cleaned surfaces are immediately vulnerable to corrosion on contact with water and oxygen."},
      {q:"How often does the classification society perform a Special Survey on a marine boiler?",opts:["Every year","Every 2.5 years","Every 5 years","Every 10 years"],correct:2,exp:"The Special Survey of a marine boiler is carried out every 5 years by the classification society. It is the most comprehensive inspection: safety valve dismantling, thickness measurements, hydrostatic test and boiler certificate renewal."},
      {q:"Why must compressed air never be used for a hydrostatic test?",opts:["Air is too expensive","On rupture, compressed air releases dangerous explosive energy","Air corrodes walls","Air falsifies pressure readings"],correct:1,exp:"Compressed air (compressible gas) stores large amounts of energy. On rupture during testing, this energy is instantly released explosively, causing major damage and serious injury. Water (incompressible) stores no potential energy − on rupture there is only a water leak without explosion."},
    ],
    es:[
      {q:"¿A qué presión se realiza la prueba hidrostática de una caldera marina?",opts:["Presión de servicio (PMS)","1,25 × PMS","1,5 × PMS","2 × PMS"],correct:2,exp:"La prueba hidrostática se realiza a 1,5 veces la presión máxima de servicio (PMS). Es el valor reglamentario de las sociedades de clasificación. Detecta grietas y defectos estructurales no visibles en la inspección visual."},
      {q:"¿Cuál es el tiempo mínimo de enfriamiento de una caldera antes de entrar para inspección?",opts:["2-4 horas","8-12 horas","24-48 horas","7 días"],correct:2,exp:"La caldera debe estar fuera de servicio al menos 24-48 horas para alcanzar una temperatura inferior a 40 degC. La temperatura debe verificarse antes de la entrada."},
      {q:"¿Qué es la 'pasivación' tras una desincustación química?",opts:["Un enjuague con agua fría","Un tratamiento alcalino que vuelve a proteger las superficies metálicas","Una prueba de estanqueidad","Un tratamiento del vapor"],correct:1,exp:"La pasivación es un tratamiento químico alcalino (fosfato o molibdato) que reforma una capa protectora de óxido en las superficies limpias. Sin pasivación, las superficies son inmediatamente vulnerables a la corrosión."},
      {q:"¿Con qué frecuencia realiza la sociedad de clasificación una inspección especial de caldera?",opts:["Cada año","Cada 2,5 años","Cada 5 años","Cada 10 años"],correct:2,exp:"La inspección especial se realiza cada 5 años. Es la más completa: desmontaje de válvulas, medidas de espesor, prueba hidrostática y renovación del certificado de caldera."},
      {q:"¿Por qué nunca usar aire comprimido en una prueba hidrostática?",opts:["El aire es muy caro","En caso de rotura el aire comprimido libera energía explosiva peligrosa","El aire corroe las paredes","El aire falsea las medidas de presión"],correct:1,exp:"El aire comprimido (gas compresible) almacena gran energía. En caso de rotura durante la prueba, se libera instantáneamente de forma explosiva → grandes daños y lesiones graves. El agua (incompresible) no almacena energía potencial → solo una fuga sin explosión."},
    ],
    pt:[
      {q:"A que pressão se realiza o teste hidrostático de uma caldeira marinha?",opts:["Pressão de serviço (PMS)","1,25 × PMS","1,5 × PMS","2 × PMS"],correct:2,exp:"O teste hidrostático realiza-se a 1,5 vezes a pressão máxima de serviço (PMS). É o valor regulamentar das sociedades de classificação. Deteta fissuras e defeitos estruturais não visíveis na inspeção visual."},
      {q:"Qual é o tempo mínimo de arrefecimento de uma caldeira antes de entrar para inspeção?",opts:["2-4 horas","8-12 horas","24-48 horas","7 dias"],correct:2,exp:"A caldeira deve estar fora de serviço pelo menos 24-48 horas para atingir temperatura abaixo de 40 degC. A temperatura deve ser verificada antes da entrada."},
      {q:"O que é a 'passivação' após desincustação química?",opts:["Um enxaguamento com água fria","Um tratamento alcalino que volta a proteger as superfícies metálicas","Um teste de estanqueidade","Um tratamento de vapor"],correct:1,exp:"A passivação é um tratamento químico alcalino (fosfato ou molibdato) que forma uma nova camada protetora de óxido nas superfícies limpas. Sem passivação, as superfícies são imediatamente vulneráveis à corrosão."},
      {q:"Com que frequência a sociedade de classificação realiza uma inspeção especial de caldeira?",opts:["Cada ano","De 2,5 em 2,5 anos","De 5 em 5 anos","De 10 em 10 anos"],correct:2,exp:"A inspeção especial realiza-se de 5 em 5 anos. É a mais completa: desmontagem de válvulas, medições de espessura, teste hidrostático e renovação do certificado de caldeira."},
      {q:"Por que nunca usar ar comprimido num teste hidrostático?",opts:["O ar é demasiado caro","Em caso de rotura o ar comprimido liberta energia explosiva perigosa","O ar corrói as paredes","O ar falseia as medições de pressão"],correct:1,exp:"O ar comprimido (gás compressível) armazena grande energia. Em caso de rotura durante o teste, liberta-se instantaneamente de forma explosiva → grandes danos e lesões graves. A água (incompressível) não armazena energia potencial → apenas uma fuga sem explosão."},
    ],
  };
  return q[lang]||q.fr;
}

function BankTab({ lang }: { lang: string }) {
  const bank=getBank(lang);
  const [bankIdx,setBankIdx]=useState<number|null>(null);
  const [bankCur,setBankCur]=useState(0);
  const [bankSel,setBankSel]=useState<number|null>(null);
  const [bankScore,setBankScore]=useState(0);
  const [bankDone,setBankDone]=useState(false);
  const L:any={fr:{title:"Banque de questions",start:"COMMENCER =>",next:"SUIVANT =>",trophy:"TERMINER"},en:{title:"Question Bank",start:"START =>",next:"NEXT =>",trophy:"FINISH"},es:{title:"Banco de preguntas",start:"COMENZAR =>",next:"SIGUIENTE =>",trophy:"TERMINAR"},pt:{title:"Banco de questões",start:"COMEÇAR =>",next:"PRÓXIMO =>",trophy:"TERMINAR"}};
  const l=L[lang]||L.fr;
  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankSel(null);setBankScore(0);setBankDone(false);};
  const pickBank=(i:number)=>{if(bankSel!==null)return;setBankSel(i);if(i===bank[bankCur].correct)setBankScore(s=>s+1);};
  const bankNext=()=>{if(bankCur+1>=bank.length){setBankDone(true);return;}setBankCur(c=>c+1);setBankSel(null);};
  return (
    <div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:"#c9922a",margin:"20px 0 14px"}}>📚 {l.title} (15)</div>
      {bankIdx===null&&!bankDone&&(
        <button onClick={startBank} style={{width:"100%",padding:"14px 0",borderRadius:12,background:`linear-gradient(135deg,#6dbf8a,#c9922a)`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:2}}>{l.start}</button>
      )}
      {bankIdx!==null&&!bankDone&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:11,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>
            <span>Q{bankCur+1}/{bank.length}</span>
            <span style={{color:"#6dbf8a"}}>✦ {bankScore}</span>
          </div>
          <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:12}}>
            <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,#6dbf8a,#c9922a)`,width:`${(bankCur/bank.length)*100}%`,transition:"width 0.3s"}}/>
          </div>
          <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:`1px solid #6dbf8a22`}}>{bank[bankCur].q}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
            {bank[bankCur].opts.map((opt:string,oi:number)=>{
              let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.12)",col="rgba(240,244,255,0.6)";
              if(bankSel!==null){
                if(oi===bank[bankCur].correct){bg="rgba(76,175,80,0.15)";bd="#4ade80";col="#4ade80";}
                else if(oi===bankSel){bg="rgba(239,68,68,0.15)";bd="#ef4444";col="#ef4444";}
              }
              return(<button key={oi} onClick={()=>pickBank(oi)} disabled={bankSel!==null} style={{textAlign:"left",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${bd}`,background:bg,color:col,fontSize:12,fontFamily:"Courier New",cursor:bankSel===null?"pointer":"default",lineHeight:1.4}}>{opt}</button>);
            })}
          </div>
          {bankSel!==null&&(
            <div>
              <div style={{padding:12,borderRadius:10,background:"rgba(13,31,60,0.8)",borderLeft:`3px solid ${bankSel===bank[bankCur].correct?"#4ade80":"#ef4444"}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{bank[bankCur].expl}</div>
              <button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,#6dbf8a,#c9922a)`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?l.trophy:l.next}</button>
            </div>
          )}
        </div>
      )}
      {bankDone&&(
        <div style={{textAlign:"center",padding:16}}>
          <div style={{fontSize:36,marginBottom:8}}>🏆</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:"#f0f4ff",marginBottom:4}}>{bankScore}/{bank.length}</div>
          <div style={{fontSize:13,color:"#e8b94f"}}>{Math.round(bankScore/bank.length*100)}%</div>
        </div>
      )}
    </div>
  );
}

function QuizTab({ lang, onComplete }:{ lang:string; onComplete:(xp:number)=>void }) {
  const quiz=getQuiz(lang);
  const [cur,setCur]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [confirmed,setConfirmed]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const t=T[lang]||T.fr;
  const L:any={fr:{submit:"Valider",next:"Suivant →",finish:"Terminer",correct:"✅ Correct !",wrong:"❌ Incorrect",xpLabel:"XP obtenus",summary:"Tu as appris",retry:"Recommencer"},en:{submit:"Submit",next:"Next →",finish:"Finish",correct:"✅ Correct!",wrong:"❌ Incorrect",xpLabel:"XP earned",summary:"You learned",retry:"Retry"},es:{submit:"Validar",next:"Siguiente →",finish:"Terminar",correct:"✅ ¡Correcto!",wrong:"❌ Incorrecto",xpLabel:"XP obtenidos",summary:"Aprendiste",retry:"Reintentar"},pt:{submit:"Validar",next:"Seguinte →",finish:"Terminar",correct:"✅ Correto!",wrong:"❌ Incorreto",xpLabel:"XP obtidos",summary:"Você aprendeu",retry:"Recomeçar"}};
  const l=L[lang]||L.fr;
  const xp=score>=5?200:score>=4?160:score>=3?120:80;
  const optColors=["#6dbf8a","#4da6ff","#e8b94f","#c084fc"];

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:42,marginBottom:8}}>🔧</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:36,fontWeight:900,color:"#e8b94f",marginBottom:4}}>{xp}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{l.xpLabel}</div>
        <div style={{marginTop:8,fontSize:14,color:"#f0f4ff",fontFamily:"Courier New"}}>Score : {score}/{quiz.length}</div>
      </div>
      <div style={{borderRadius:14,background:"rgba(10,22,40,0.8)",border:"1px solid rgba(201,146,42,0.27)",padding:14,marginBottom:16}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:"#c9922a",marginBottom:10}}>✦ {l.summary}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11,color:"rgba(240,244,255,0.7)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:"#c9922a",flexShrink:0}}>✦</span><span>{k}</span>
          </div>
        ))}
      </div>
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#6dbf8a,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>🔧 {l.finish}</button>
      <button onClick={()=>{setCur(0);setSelected(null);setConfirmed(false);setScore(0);setDone(false);}} style={{width:"100%",padding:"12px 0",marginTop:8,border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,background:"none",color:"rgba(240,244,255,0.45)",fontSize:12,cursor:"pointer",fontFamily:"Courier New"}}>{l.retry}</button>
    </div>
  );

  const q=quiz[cur];
  const isCorrect=selected===q.correct;
  const handleConfirm=()=>{if(selected===null)return;setConfirmed(true);if(isCorrect)setScore(s=>s+1);};
  const handleNext=()=>{if(cur+1>=quiz.length){setDone(true);return;}setCur(c=>c+1);setSelected(null);setConfirmed(false);};

  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontSize:11,color:"rgba(240,244,255,0.4)",fontFamily:"Courier New"}}>Q{cur+1}/{quiz.length}</div>
        <div style={{fontSize:11,color:"#e8b94f",fontFamily:"Courier New"}}>⭐ {score}/{quiz.length}</div>
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#6dbf8a,#c9922a)",width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:"1px solid rgba(109,191,138,0.15)"}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
        {q.opts.map((opt:string,i:number)=>{
          let border=`1px solid ${optColors[i]}44`,bg=`${optColors[i]}11`;
          if(confirmed){if(i===q.correct){border="2px solid #4ade80";bg="rgba(74,222,128,0.12)";}else if(i===selected&&!isCorrect){border="2px solid #ef4444";bg="rgba(239,68,68,0.12)";}}
          else if(selected===i){border=`2px solid ${optColors[i]}`;bg=`${optColors[i]}22`;}
          return(
            <button key={i} disabled={confirmed} onClick={()=>setSelected(i)} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:12,border,background:bg,cursor:confirmed?"default":"pointer",color:"#f0f4ff",textAlign:"left"}}>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:optColors[i],flexShrink:0}}>{String.fromCharCode(65+i)}</span>
              <span style={{fontSize:12,fontFamily:"Courier New",lineHeight:1.4}}>{opt}</span>
            </button>
          );
        })}
      </div>
      {confirmed&&<div style={{padding:10,borderRadius:10,marginBottom:12,background:isCorrect?"rgba(74,222,128,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${isCorrect?"#4ade80":"#ef4444"}44`,fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.6}}><div style={{fontWeight:700,marginBottom:4,color:isCorrect?"#4ade80":"#ef4444"}}>{isCorrect?l.correct:l.wrong}</div>{q.exp}</div>}
      {!confirmed
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?"linear-gradient(135deg,#6dbf8a,#c9922a)":"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{l.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:"linear-gradient(135deg,#6dbf8a,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?l.finish:l.next}</button>
      }
    </div>
  );
}

export default function LessonE3_L6({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(109,191,138,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar"}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"#6dbf8a",marginBottom:2}}>{t.moduleLabel} · L6</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0f4ff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
          </div>
          <div style={{fontSize:11,color:"#e8b94f",fontFamily:"Courier New",flexShrink:0}}>{progress}%</div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,#6dbf8a,#c9922a)",width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:"rgba(109,191,138,0.1)",border:"1px solid rgba(109,191,138,0.3)"}}>
          <span style={{fontSize:12}}>🔧</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"#6dbf8a",letterSpacing:1}}>MACHINE · CHAUDIÈRES · PREMIUM</span>
        </div>
      </div>
      <div>
        {phase==="content"&&<ContentPhase lang={lang} onStartQuiz={()=>setPhase("quiz")}/>}
        {phase==="quiz"&&<QuizTab lang={lang} onComplete={(xp)=>{setQuizDone(true);if(onComplete)onComplete(xp);}}/>}
      </div>
    </div>
  );
}
