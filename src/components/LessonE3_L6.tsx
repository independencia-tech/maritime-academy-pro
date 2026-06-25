// LessonE3_L6 — Maintenance & Inspection chaudière | PART 1
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
    moduleLabel:"MACHINE — CHAUDIÈRES",
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
      "Le détartrage chimique acide dissout le tartre — rinçage abondant obligatoire",
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
      sootblowing:{ name:"Soufflage de suie (Soot blowing — ECE)", desc:"Injection de vapeur à haute pression (8-10 bar) sur les surfaces externes des tubes de l'ECE pour déloger les dépôts de suie et de cendres. Réalisé pendant la navigation. Fréquence : 1-2 fois par jour. Déclenché manuellement ou automatiquement. Évacuation des suies par le bas (éviter émission en mer/air)." },
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
        a:"Précautions obligatoires avant entrée en chaudière (espace confiné) : 1. Mise hors service complète : arrêt du brûleur depuis au moins 24-48h (refroidissement total < 40°C). Fermer et condamner toutes les vannes vapeur, combustible et eau d'alimentation (LOTO). 2. Dépressurisation confirmée : vérifier pression = 0 bar sur tous les manomètres. 3. Analyse de l'atmosphère intérieure : O₂ > 19,5% (minimum), < 23,5% (maximum), absence de gaz toxiques (CO < 25 ppm, HC < 10% LIE). 4. Permis de travail en espace confiné : établi et signé. 5. Ventilation active : souffler de l'air frais dans la chaudière pendant l'inspection. 6. Équipe de secours à l'extérieur : au moins une personne reste dehors en permanence avec moyen de communication. 7. EPI : harnais, casque, lampe portable ATEX. 8. Moyen d'évacuation prévu (échelle, corde)." },
      { q:"Qu'est-ce qu'un test hydrostatique sur une chaudière et pourquoi est-il nécessaire ?",
        a:"Un test hydrostatique (épreuve hydraulique) consiste à remplir la chaudière complètement d'eau froide (jamais d'air ou de vapeur — incompressibles et non explosifs) et à pressuriser jusqu'à 1,5× la pression maximale de service (PMS). Procédure : Fermer tous les raccords et bouchonner les sorties. Remplir d'eau en chassant l'air (ouvrir un robinet en hauteur jusqu'à l'eau). Monter la pression lentement (pompe d'essai) jusqu'à 1,5 × PMS. Maintenir 30-60 minutes. Inspecter toutes les surfaces, soudures et raccords. Raisons : Détecter les fissures et défauts non visibles à l'inspection visuelle. Vérifier l'intégrité des soudures après réparations. Confirmer que la chaudière peut supporter sa pression nominale. Exigence réglementaire de la société de classification (tous les 5 ans). JAMAIS avec de l'air comprimé : en cas de rupture, l'énergie libérée serait explosive." },
      { q:"Comment réaliser un détartrage chimique d'une chaudière marine ?",
        a:"Procédure de détartrage chimique : 1. Préparation : chaudière hors service et refroidie (< 40°C), analyser les dépôts (carbonate → acide citrique, sulfate → acide chlorhydrique). 2. Inhibition : ajouter un inhibiteur de corrosion à la solution acide pour protéger le métal pendant l'attaque acide. 3. Remplissage : remplir la chaudière avec la solution acide diluée (ex : acide citrique 5%). 4. Circulation : faire circuler la solution par pompe pendant 4-12 heures (selon épaisseur du tartre). Surveiller la concentration (prélèvements périodiques). 5. Rinçage : vider et rincer abondamment à l'eau douce. Vérifier pH de l'effluent de rinçage (pH > 6,5 = rinçage complet). 6. Passivation : remplir avec solution passivante (phosphate + alcalinisant) pour protéger les surfaces nettoyées. 7. Inspection finale : inspecter les surfaces nettoyées avant remise en service. Consigner dans le registre." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — BOILERS",
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
      "Chemical acid descaling dissolves scale — thorough rinsing mandatory",
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
        a:"Mandatory precautions before boiler entry (confined space): 1. Complete shutdown: burner off for at least 24-48h (full cooling < 40°C). Close and lock all steam, fuel and feed water valves (LOTO). 2. Confirmed depressurisation: verify pressure = 0 bar on all gauges. 3. Atmosphere analysis: O₂ > 19.5% (minimum), < 23.5% (maximum), no toxic gases (CO < 25 ppm, HC < 10% LEL). 4. Confined space work permit: issued and signed. 5. Active ventilation: blow fresh air into boiler during inspection. 6. Standby rescue team outside: at least one person remains outside continuously with communication means. 7. PPE: harness, helmet, portable ATEX lamp. 8. Evacuation means provided (ladder, rope)." },
      { q:"What is a hydrostatic test on a boiler and why is it necessary?",
        a:"A hydrostatic test consists of filling the boiler completely with cold water (never air or steam — incompressible and non-explosive) and pressurising to 1.5× maximum allowable working pressure (MAWP). Procedure: close all fittings and blank off outlets. Fill with water expelling air (open top cock until water). Slowly raise pressure (test pump) to 1.5 × MAWP. Maintain 30-60 minutes. Inspect all surfaces, welds and fittings. Reasons: detect cracks and defects not visible in visual inspection. Verify weld integrity after repairs. Confirm boiler can withstand nominal pressure. Classification society regulatory requirement (every 5 years). NEVER with compressed air: on rupture, released energy would be explosive." },
      { q:"How to perform chemical descaling of a marine boiler?",
        a:"Chemical descaling procedure: 1. Preparation: boiler out of service and cooled (< 40°C), analyse deposits (carbonate → citric acid, sulphate → hydrochloric acid). 2. Inhibition: add corrosion inhibitor to acid solution to protect metal during acid attack. 3. Filling: fill boiler with dilute acid solution (e.g. 5% citric acid). 4. Circulation: circulate solution by pump for 4-12 hours (per scale thickness). Monitor concentration (periodic sampling). 5. Rinsing: drain and rinse thoroughly with fresh water. Check rinse effluent pH (pH > 6.5 = complete rinse). 6. Passivation: fill with passivating solution (phosphate + alkaliser) to protect cleaned surfaces. 7. Final inspection: inspect cleaned surfaces before return to service. Log in register." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — CALDERAS",
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
      "La desincustación química ácida disuelve las incrustaciones — enjuague abundante obligatorio",
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
        a:"1. Puesta fuera de servicio completa: quemador apagado mínimo 24-48h (enfriamiento total < 40°C). Cerrar y condenar todas las válvulas (LOTO). 2. Despresurización confirmada: verificar presión = 0 bar en todos los manómetros. 3. Análisis de la atmósfera: O₂ > 19,5%, sin gases tóxicos (CO < 25 ppm). 4. Permiso de trabajo en espacio confinado firmado. 5. Ventilación activa. 6. Equipo de rescate en el exterior. 7. EPI: arnés, casco, lámpara ATEX. 8. Medios de evacuación previstos." },
      { q:"¿Qué es una prueba hidrostática en una caldera y por qué es necesaria?",
        a:"Llenado con agua fría y presurización a 1,5× la PMS (NUNCA con aire comprimido). Mantener 30-60 minutos. Inspeccionar soldaduras y superficies. Detecta grietas y defectos no visibles visualmente. Verifica la integridad de soldaduras tras reparaciones. Exigencia reglamentaria de la sociedad de clasificación (cada 5 años). Con aire comprimido, la energía liberada en caso de rotura sería explosiva." },
      { q:"¿Cómo realizar una desincustación química de una caldera marina?",
        a:"1. Preparación: caldera fuera de servicio y enfriada (< 40°C), analizar los depósitos. 2. Inhibición: añadir inhibidor de corrosión a la solución ácida. 3. Llenado: llenar con solución ácida diluida (ej: ácido cítrico al 5%). 4. Circulación: bombear 4-12 horas. Controlar concentración. 5. Enjuague: vaciar y enjuagar abundantemente con agua dulce (pH > 6,5). 6. Pasivación: rellenar con solución pasivante (fosfato + alcalinizante). 7. Inspección final antes de la puesta en servicio. Registrar todo." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — CALDEIRAS",
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
      "A desincustação química ácida dissolve as incrustações — enxaguamento abundante obrigatório",
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
        a:"1. Paragem completa: queimador apagado mínimo 24-48h (arrefecimento total < 40°C). Fechar e condenar todas as válvulas (LOTO). 2. Despressurização confirmada: verificar pressão = 0 bar em todos os manómetros. 3. Análise da atmosfera: O₂ > 19,5%, sem gases tóxicos (CO < 25 ppm). 4. Licença de trabalho em espaço confinado assinada. 5. Ventilação ativa. 6. Equipa de resgate no exterior. 7. EPI: arnês, capacete, lâmpada ATEX portátil. 8. Meios de evacuação previstos." },
      { q:"O que é um teste hidrostático numa caldeira e por que é necessário?",
        a:"Enchimento com água fria e pressurização a 1,5× a PMS (NUNCA com ar comprimido). Manter 30-60 minutos. Inspecionar soldaduras e superfícies. Deteta fissuras e defeitos não visíveis visualmente. Verifica integridade de soldaduras após reparações. Exigência regulamentar da sociedade de classificação (de 5 em 5 anos). Com ar comprimido, a energia libertada em caso de rotura seria explosiva." },
      { q:"Como realizar uma desincustação química de uma caldeira marinha?",
        a:"1. Preparação: caldeira fora de serviço e arrefecida (< 40°C), analisar depósitos. 2. Inibição: adicionar inibidor de corrosão à solução ácida. 3. Enchimento: encher com solução ácida diluída (ex: ácido cítrico 5%). 4. Circulação: bombear 4-12 horas. Controlar concentração. 5. Enxaguamento: esvaziar e enxaguar abundantemente com água doce (pH > 6,5). 6. Passivação: encher com solução passivante (fosfato + alcalinizante). 7. Inspeção final antes de retomar serviço. Registar tudo." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — PMS ──────────────────────────────────────────────
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

// ── SVG 2 — INSPECTION POINTS ────────────────────────────────
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

// ── SVG 3 — CLEANING ─────────────────────────────────────────
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

// ── SVG 4 — CLASS INSPECTIONS ────────────────────────────────
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

function ContentTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
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
      <div style={{borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.gold}44`,padding:14}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:C.gold,letterSpacing:1,marginBottom:10}}>✦ {t.keypoints}</div>
        {t.kp.map((k:string,i:number)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:7,fontSize:12,color:"rgba(240,244,255,0.75)",fontFamily:"Courier New",lineHeight:1.5}}>
            <span style={{color:C.gold,flexShrink:0}}>✦</span><span>{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticeTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [shown,setShown]=useState([false,false,false]);
  const toggle=(i:number)=>setShown(p=>p.map((v,j)=>j===i?!v:v));
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,marginBottom:14}}>✏️ {t.practiceTitle}</div>
      {t.questions.map((q:any,i:number)=>(
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.maint}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.maint,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.maint}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.maint:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.maint:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.maint}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE3_L6 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Quelles sont les précautions obligatoires avant d'entrer dans une chaudière pour inspection ?",a:"Précautions espace confiné : 1. Arrêt brûleur depuis 24-48h (T < 40°C). 2. LOTO : toutes vannes fermées et condamnées. 3. Pression = 0 bar confirmée sur tous les manomètres. 4. Analyse atmosphère : O₂ entre 19,5% et 23,5%, CO < 25 ppm. 5. Permis travail espace confiné signé. 6. Ventilation active. 7. Équipe de secours extérieure en permanence. 8. EPI : harnais, casque, lampe ATEX."},
      {q:"Qu'est-ce qu'un test hydrostatique et pourquoi ne doit-on jamais utiliser de l'air comprimé ?",a:"Test hydrostatique : remplissage avec eau froide, pressurisation à 1,5× PMS, maintien 30-60 min, inspection des soudures et surfaces. Jamais d'air comprimé car : en cas de rupture, l'énergie emmagasinée dans l'air comprimé (gaz compressible) est libérée instantanément → explosion destructrice. Avec l'eau (incompressible), la rupture libère peu d'énergie → fuite sans explosion. Réalisé tous les 5 ans ou après réparations importantes."},
      {q:"Comment détecter l'entartrage dans une chaudière lors de l'inspection interne ?",a:"Inspection côté eau : couleur blanche ou jaunâtre des surfaces (CaCO₃). Test au couteau ou marteau : tartre dur = couche crissante qui s'éclate. Mesure d'épaisseur (règle, calibre d'épaisseur). > 1mm → nettoyage chimique nécessaire. Symptômes en service : augmentation de la température des gaz de fumée, réduction du rendement (mesurer la température gaz vs historique)."},
      {q:"Quelles sont les différentes méthodes de nettoyage d'une chaudière marine ?",a:"Détartrage chimique : acide citrique ou HCl dilué, circulation 4-12h, efficace sur tous les dépôts. Nettoyage mécanique : brosse haute pression, turbines, hydroblasting (500-3000 bar). Soufflage de suie (ECE) : vapeur 8-10 bar sur les tubes de l'économiseur, 1-2x/jour. Hydroblasting : jet eau très haute pression, pour dépôts tenaces et surfaces accessibles. Le choix dépend du type et de l'épaisseur des dépôts."},
      {q:"À quelle fréquence la société de classification inspecte-t-elle une chaudière marine ?",a:"Cycle d'inspection d'une chaudière (5 ans) : Annuelle : inspection externe en service (1 an). Intermédiaire : inspection interne à 2,5 ans. Spéciale : inspection complète + test hydrostatique à 5 ans → renouvellement du certificat. Entre ces inspections, l'exploitant est responsable du PMS (Planned Maintenance System) et des analyses eau. Les registres doivent être disponibles pour tout inspecteur PSC (Port State Control)."},
      {q:"Qu'est-ce que la passivation après détartrage chimique et pourquoi est-elle nécessaire ?",a:"Après détartrage chimique, les surfaces métalliques sont exposées (oxyde protecteur dissous avec le tartre). Sans passivation : attaque corrosive immédiate par l'oxygène dissous. La passivation consiste à remplir la chaudière avec une solution alcaline contenant des inhibiteurs de corrosion (phosphate trisodique, molybdate) qui forment une nouvelle couche protectrice sur les surfaces. Elle doit être faite immédiatement après le rinçage final (pH neutre confirmé). Sans passivation, la chaudière ne doit pas être remise en service."},
      {q:"Comment inspecter les soupapes de sûreté lors d'un arrêt de maintenance ?",a:"Inspection soupapes de sûreté : 1. Déposer chaque soupape. 2. Inspecter le siège : scratches, rayures, érosion par vapeur → rectifier ou remplacer. 3. Inspecter le clapet/disque : déformation, usure → remplacer. 4. Remplacer tous les joints d'étanchéité (jamais réutiliser les vieux joints). 5. Recalibrer sur banc de test à la pression de tarage spécifiée. 6. Réinstaller et test de levée manuelle sous pression. 7. Documenter les pressions de tarage mesurées dans le registre. Les soupapes hors tolérance (> ±3%) doivent être rechange ou recalibrées."},
      {q:"Quels sont les signes de corrosion dans une chaudière et comment les traiter ?",a:"Signes de corrosion : Corrosion par piqûres (O₂) : cavités localisées rouille-brun, surtout sur les surfaces horizontales et les points bas. Corrosion acide : attaque généralisée de la surface, perte de métal uniforme. Corrosion caustique : fissures fines sous contrainte (SCC). Traitement selon la gravité : Piqûres superficielles (< 10% épaisseur) : nettoyage, neutralisation, amélioration traitement eau. Piqûres profondes (10-20% épaisseur) : soudage après nettoyage et inspection. > 20% épaisseur : remplacement du tube ou section. Toujours signaler à la société de classification."},
      {q:"Comment évaluer l'état général d'une chaudière lors d'une inspection interne ?",a:"Évaluation lors de l'inspection interne : Côté eau : état des surfaces (tartre, corrosion), état des soudures (fissures ?), état des raccords (fuites passées ?). Côté feu/gaz : état des réfractaires (fissures, érosion), tubes côté feu (décoloration = surchauffe passée ?), état du brûleur et de l'électrode. Structure : déformation de la membrure, état des supports et des cavaliers de tubes. Documentation : consigner tous les constatations avec photos si possible, épaisseur mesurée, superficie de dépôts, nature de la corrosion observée. Rapport à soumettre à la société de classification lors de la prochaine inspection."},
      {q:"Que doit-on vérifier sur un gicleur de brûleur lors de son inspection mensuelle ?",a:"Inspection mensuelle du gicleur : 1. Usure de l'orifice : mesurer le diamètre avec un calibre → si > 5% au-delà du diamètre nominal → remplacer. 2. Dépôts internes : carbone, gomme → nettoyer au solvant (pas d'objet métallique). 3. Angle de spray : comparer avec le nominal (spray symétrique et conique). 4. État du siège : rayures ou érosion → remplacer. 5. Colmatage partiel : rincer à l'air comprimé et vérifier le débit. Un gicleur usé → spray asymétrique → flamme déformée → surchauffe locale → encrassement des tubes côté feu."},
      {q:"Qu'est-ce que le 'soot blowing' sur un économiseur ECE et comment est-il réalisé ?",a:"Le soot blowing (soufflage de suie) est l'injection de vapeur à haute pression (8-10 bar) sur les surfaces externes des tubes de l'économiseur de gaz d'échappement (ECE) pour déloger les dépôts de suie et de cendres provenant des gaz d'échappement du moteur. Réalisation : 1. Déclencher le soufflage (manuel ou automatique). 2. La vapeur est injectée par une lance rotative qui balaie les rangées de tubes. 3. Durée : quelques minutes par zone. 4. Les suies délogées tombent dans une trémie de collecte en bas de la cheminée. 5. Évacuation des suies à quai (MARPOL). Fréquence : 1-2 fois par jour en navigation. Indicateur de nécessité : augmentation de la température des gaz en sortie d'ECE (encrassement = moins d'échange)."},
      {q:"Quelles informations doivent figurer dans un rapport d'inspection chaudière ?",a:"Contenu minimum d'un rapport d'inspection chaudière : Identification : nom du navire, numéro de la chaudière, date de l'inspection, inspecteurs présents. État des surfaces internes : côté eau (tartre, corrosion), côté feu (encrassement, surchauffe), état des soudures. Mesures d'épaisseur : tubes (comparaison aux épaisseurs nominales et minimales admissibles). Épreuve hydraulique (si réalisée) : pression d'essai, durée, résultat. État des soupapes de sûreté : pression de tarage mesurée, état des sièges. Travaux réalisés : nettoyage, réparations, remplacement de composants. Recommandations : points à surveiller, travaux futurs préconisés. Prochaine inspection : date et type recommandés. Signature de l'inspecteur de la société de classification."},
    ],
    en:[
      {q:"What mandatory precautions are required before entering a boiler for inspection?",a:"Confined space precautions: 1. Burner off for 24-48h (T < 40°C). 2. LOTO: all valves closed and locked. 3. Pressure = 0 bar confirmed on all gauges. 4. Atmosphere analysis: O₂ between 19.5% and 23.5%, CO < 25 ppm. 5. Confined space work permit signed. 6. Active ventilation. 7. Permanent external rescue team. 8. PPE: harness, helmet, ATEX lamp."},
      {q:"What is a hydrostatic test and why must compressed air never be used?",a:"Hydrostatic test: fill with cold water, pressurise to 1.5× MAWP, hold 30-60 min, inspect welds and surfaces. Never compressed air because: on rupture, energy stored in compressed air (compressible gas) releases instantly → destructive explosion. With water (incompressible), rupture releases little energy → leak without explosion. Carried out every 5 years or after major repairs."},
      {q:"How to detect scaling in a boiler during internal inspection?",a:"Waterside inspection: white or yellowish surface colour (CaCO₃). Knife or hammer test: hard scale = crunchy layer that chips. Thickness measurement (ruler, thickness gauge). > 1mm → chemical cleaning needed. In-service symptoms: rising flue gas temperature, efficiency reduction (measure gas temperature vs history)."},
      {q:"What are the different cleaning methods for a marine boiler?",a:"Chemical descaling: citric acid or dilute HCl, circulate 4-12h, effective on all deposits. Mechanical cleaning: high-pressure brush, turbines, hydroblasting (500-3000 bar). Soot blowing (EGE): 8-10 bar steam on economiser tubes, 1-2×/day. Hydroblasting: very high pressure water jet for hard deposits and accessible surfaces. Choice depends on deposit type and thickness."},
      {q:"How often does the classification society inspect a marine boiler?",a:"Boiler inspection cycle (5 years): Annual: external inspection in service (year 1). Intermediate: internal inspection at 2.5 years. Special: full inspection + hydrostatic test at 5 years → certificate renewal. Between inspections, operator responsible for PMS and water analysis. Records must be available for any PSC inspector."},
      {q:"What is passivation after chemical descaling and why is it necessary?",a:"After chemical descaling, metal surfaces are exposed (protective oxide dissolved with scale). Without passivation: immediate corrosive attack by dissolved oxygen. Passivation consists of filling boiler with alkaline solution containing corrosion inhibitors (trisodium phosphate, molybdate) that form a new protective layer. Must be done immediately after final rinse (neutral pH confirmed). Without passivation, boiler must not be returned to service."},
      {q:"How to inspect safety valves during a maintenance shutdown?",a:"Safety valve inspection: 1. Remove each valve. 2. Inspect seat: scratches, steam erosion → machine or replace. 3. Inspect disc/plug: deformation, wear → replace. 4. Replace all gaskets (never reuse old gaskets). 5. Recalibrate on test bench at specified set pressure. 6. Reinstall and manual lift test under pressure. 7. Document measured set pressures in register. Out-of-tolerance valves (> ±3%) must be replaced or recalibrated."},
      {q:"What are the signs of corrosion in a boiler and how to treat them?",a:"Corrosion signs: Pitting corrosion (O₂): localised rust-brown cavities, especially on horizontal surfaces and low points. Acid corrosion: general surface attack, uniform metal loss. Caustic corrosion: fine stress cracking (SCC). Treatment per severity: Superficial pitting (< 10% thickness): clean, neutralise, improve water treatment. Deep pitting (10-20% thickness): welding after cleaning and inspection. > 20% thickness: tube or section replacement. Always report to classification society."},
      {q:"How to assess a boiler's general condition during internal inspection?",a:"Internal inspection assessment: Waterside: surface condition (scale, corrosion), weld condition (cracks?), fitting condition (past leaks?). Fireside/gasside: refractory condition (cracks, erosion), fire-side tubes (discolouration = past overheating?), burner and electrode condition. Structure: frame deformation, tube support and clip condition. Documentation: log all findings with photos if possible, measured thickness, deposit area, observed corrosion type. Report to submit to classification society at next inspection."},
      {q:"What to check on a burner nozzle during monthly inspection?",a:"Monthly nozzle inspection: 1. Orifice wear: measure diameter with gauge → if > 5% above nominal → replace. 2. Internal deposits: carbon, gum → clean with solvent (no metal objects). 3. Spray angle: compare to nominal (symmetrical conical spray). 4. Seat condition: scratches or erosion → replace. 5. Partial blockage: blow with compressed air and check flow. Worn nozzle → asymmetric spray → deformed flame → localised overheating → fire-side tube fouling."},
      {q:"What is soot blowing on an EGE economiser and how is it performed?",a:"Soot blowing is injection of high-pressure steam (8-10 bar) on external tube surfaces of the exhaust gas economiser (EGE) to dislodge soot and ash deposits from engine exhaust gases. Procedure: 1. Trigger blowing (manual or automatic). 2. Steam injected via rotating lance sweeping tube rows. 3. Duration: few minutes per zone. 4. Dislodged soot falls into collection hopper at funnel bottom. 5. Soot evacuation ashore (MARPOL). Frequency: 1-2 times per day at sea. Necessity indicator: rising outlet gas temperature (fouling = less heat exchange)."},
      {q:"What information must appear in a boiler inspection report?",a:"Minimum boiler inspection report content: Identification: vessel name, boiler number, inspection date, inspectors present. Internal surface condition: waterside (scale, corrosion), fireside (fouling, overheating), weld condition. Thickness measurements: tubes (vs nominal and minimum allowable). Hydraulic test (if performed): test pressure, duration, result. Safety valve condition: measured set pressure, seat condition. Work performed: cleaning, repairs, component replacement. Recommendations: points to monitor, future work recommended. Next inspection: recommended date and type. Classification society surveyor signature."},
    ],
    es:[
      {q:"¿Qué precauciones obligatorias hay antes de entrar en una caldera para inspección?",a:"Espacio confinado: 1. Quemador apagado 24-48h (T < 40°C). 2. LOTO: todas las válvulas cerradas y condenadas. 3. Presión = 0 bar en todos los manómetros. 4. Análisis atmósfera: O₂ entre 19,5% y 23,5%, CO < 25 ppm. 5. Permiso trabajo espacio confinado firmado. 6. Ventilación activa. 7. Equipo de rescate exterior permanente. 8. EPI: arnés, casco, lámpara ATEX."},
      {q:"¿Qué es una prueba hidrostática y por qué nunca usar aire comprimido?",a:"Prueba hidrostática: llenado con agua fría, presurización a 1,5× PMS, mantener 30-60 min, inspeccionar soldaduras. Nunca aire comprimido: en caso de rotura, la energía almacenada se libera instantáneamente → explosión destructiva. Con agua (incompresible) → fuga sin explosión. Cada 5 años o tras reparaciones importantes."},
      {q:"¿Cómo detectar incrustaciones en una caldera durante la inspección interna?",a:"Inspección del lado agua: color blanco o amarillento (CaCO₃). Prueba con cuchillo o martillo: incrustación dura = capa crujiente que se desportilla. Medición de espesor. > 1mm → limpieza química necesaria. Síntomas en servicio: aumento de temperatura de gases, reducción del rendimiento."},
      {q:"¿Cuáles son los métodos de limpieza de una caldera marina?",a:"Desincustación química: ácido cítrico o HCl diluido, circular 4-12h. Limpieza mecánica: cepillo de alta presión, turbinas, hydroblasting (500-3000 bar). Soplado de hollín (EGE): vapor 8-10 bar en los tubos del economizador, 1-2x/día. La elección depende del tipo y espesor de los depósitos."},
      {q:"¿Con qué frecuencia inspecciona la sociedad de clasificación una caldera marina?",a:"Ciclo de inspección (5 años): Anual: inspección externa en servicio. Intermedia: inspección interna a 2,5 años. Especial: inspección completa + prueba hidrostática a 5 años → renovación del certificado. El operador es responsable del PMS y análisis de agua entre inspecciones."},
      {q:"¿Qué es la pasivación tras la desincustación química?",a:"Tras la desincustación, las superficies metálicas quedan expuestas. Sin pasivación: ataque corrosivo inmediato por oxígeno disuelto. La pasivación consiste en rellenar con solución alcalina con inhibidores de corrosión (fosfato trisódico) que forman una nueva capa protectora. Debe hacerse inmediatamente tras el enjuague final (pH neutro confirmado)."},
      {q:"¿Cómo inspeccionar las válvulas de seguridad durante una parada de mantenimiento?",a:"1. Desmontar cada válvula. 2. Inspeccionar asiento: rayaduras, erosión → rectificar o sustituir. 3. Inspeccionar disco: deformación, desgaste → sustituir. 4. Sustituir todas las juntas. 5. Recalibrar en banco de prueba. 6. Reinstalar y prueba de levantamiento manual. 7. Documentar presiones de tarado medidas. Fuera de tolerancia (> ±3%) → sustituir o recalibrar."},
      {q:"¿Cuáles son los signos de corrosión en una caldera y cómo tratarlos?",a:"Picaduras (O₂): cavidades localizadas rojo-marrón. Corrosión ácida: ataque generalizado. Corrosión cáustica: fisuras bajo tensión (SCC). Tratamiento: picaduras superficiales (< 10%) → limpiar y mejorar tratamiento agua. Profundas (10-20%) → soldadura. > 20% → sustitución de tubo. Siempre notificar a la sociedad de clasificación."},
      {q:"¿Cómo evaluar el estado general de una caldera en una inspección interna?",a:"Lado agua: estado de superficies (incrustaciones, corrosión), soldaduras, conexiones. Lado fuego: refractarios, tubos (decoloración = sobrecalentamiento pasado), quemador. Estructura: deformaciones, soportes. Documentar con fotos, espesores medidos, naturaleza de la corrosión. Informe para la sociedad de clasificación."},
      {q:"¿Qué hay que verificar en una tobera de quemador en la inspección mensual?",a:"1. Desgaste del orificio (calibre): si > 5% del nominal → sustituir. 2. Depósitos internos (carbono, goma) → limpiar con disolvente. 3. Ángulo de pulverización: comparar con el nominal. 4. Estado del asiento: rayaduras → sustituir. 5. Obstrucción parcial → soplar con aire comprimido. Tobera desgastada → spray asimétrico → llama deformada → sobrecalentamiento local."},
      {q:"¿Qué es el 'soot blowing' en un economizador EGE y cómo se realiza?",a:"Inyección de vapor a alta presión (8-10 bar) en las superficies externas de los tubos del EGE para eliminar depósitos de hollín. 1. Activar soplado. 2. La lanza giratoria barre las filas de tubos. 3. Los hollines caen a la tolva inferior. 4. Evacuación en puerto (MARPOL). Frecuencia: 1-2x/día en navegación. Indicador: aumento de temperatura de gases en la salida del EGE."},
      {q:"¿Qué información debe figurar en un informe de inspección de caldera?",a:"Identificación del buque y caldera, fecha, inspectores. Estado de las superficies internas (lado agua y fuego). Medidas de espesor de tubos. Prueba hidrostática (si realizada). Estado de las válvulas de seguridad (presión de tarado). Trabajos realizados. Recomendaciones. Próxima inspección. Firma del inspector de la sociedad de clasificación."},
    ],
    pt:[
      {q:"Que precauções obrigatórias antes de entrar numa caldeira para inspeção?",a:"Espaço confinado: 1. Queimador apagado 24-48h (T < 40°C). 2. LOTO: todas as válvulas fechadas e condenadas. 3. Pressão = 0 bar em todos os manómetros. 4. Análise da atmosfera: O₂ entre 19,5% e 23,5%, CO < 25 ppm. 5. Licença de trabalho em espaço confinado assinada. 6. Ventilação ativa. 7. Equipa de resgate exterior permanente. 8. EPI: arnês, capacete, lâmpada ATEX."},
      {q:"O que é um teste hidrostático e por que nunca usar ar comprimido?",a:"Teste hidrostático: enchimento com água fria, pressurização a 1,5× PMS, manter 30-60 min, inspecionar soldaduras. Nunca ar comprimido: em caso de rotura, a energia armazenada liberta-se instantaneamente → explosão destrutiva. Com água (incompressível) → fuga sem explosão. De 5 em 5 anos ou após reparações importantes."},
      {q:"Como detetar incrustações numa caldeira durante a inspeção interna?",a:"Inspeção do lado água: cor branca ou amarelada (CaCO₃). Teste com faca ou martelo: incrustação dura = camada crocante que se lasca. Medição da espessura. > 1mm → limpeza química necessária. Sintomas em serviço: aumento da temperatura dos gases, redução do rendimento."},
      {q:"Quais são os métodos de limpeza de uma caldeira marinha?",a:"Desincustação química: ácido cítrico ou HCl diluído, circular 4-12h. Limpeza mecânica: escova de alta pressão, turbinas, hydroblasting (500-3000 bar). Sopro de fuligem (EGE): vapor 8-10 bar nos tubos do economizador, 1-2x/dia. A escolha depende do tipo e espessura dos depósitos."},
      {q:"Com que frequência a sociedade de classificação inspeciona uma caldeira marinha?",a:"Ciclo de inspeção (5 anos): Anual: inspeção externa em serviço. Intermédia: inspeção interna aos 2,5 anos. Especial: inspeção completa + teste hidrostático aos 5 anos → renovação do certificado. O operador é responsável pelo PMS e análises de água entre inspeções."},
      {q:"O que é a passivação após desincustação química?",a:"Após a desincustação, as superfícies metálicas ficam expostas. Sem passivação: ataque corrosivo imediato pelo oxigénio dissolvido. A passivação consiste em encher com solução alcalina com inibidores de corrosão (fosfato trissódico) que formam uma nova camada protetora. Deve ser feita imediatamente após o enxaguamento final (pH neutro confirmado)."},
      {q:"Como inspecionar as válvulas de segurança durante uma paragem de manutenção?",a:"1. Desmontar cada válvula. 2. Inspecionar assento: riscos, erosão → retificar ou substituir. 3. Inspecionar disco: deformação, desgaste → substituir. 4. Substituir todas as juntas. 5. Recalibrar em banco de teste. 6. Reinstalar e teste de levantamento manual. 7. Documentar pressões de taramento medidas. Fora de tolerância (> ±3%) → substituir ou recalibrar."},
      {q:"Quais são os sinais de corrosão numa caldeira e como tratá-los?",a:"Picadas (O₂): cavidades localizadas castanho-ferrugem. Corrosão ácida: ataque generalizado. Corrosão cáustica: fissuras sob tensão (SCC). Tratamento: picadas superficiais (< 10%) → limpar e melhorar tratamento água. Profundas (10-20%) → soldadura. > 20% → substituição de tubo. Sempre notificar sociedade de classificação."},
      {q:"Como avaliar o estado geral de uma caldeira numa inspeção interna?",a:"Lado água: estado de superfícies (incrustações, corrosão), soldaduras, ligações. Lado fogo: refratários, tubos (descoloração = sobreaquecimento passado), queimador. Estrutura: deformações, suportes. Documentar com fotos, espessuras medidas, natureza da corrosão. Relatório para sociedade de classificação."},
      {q:"O que verificar num bico de queimador na inspeção mensal?",a:"1. Desgaste do orifício (calibre): se > 5% do nominal → substituir. 2. Depósitos internos (carbono, goma) → limpar com solvente. 3. Ângulo de pulverização: comparar com nominal. 4. Estado do assento: riscos → substituir. 5. Obstrução parcial → soprar com ar comprimido. Bico desgastado → spray assimétrico → chama deformada → sobreaquecimento local."},
      {q:"O que é o 'soot blowing' num economizador EGE e como se realiza?",a:"Injeção de vapor a alta pressão (8-10 bar) nas superfícies externas dos tubos do EGE para remover depósitos de fuligem. 1. Acionar sopro. 2. A lança rotativa varre as filas de tubos. 3. As fuligens caem na tremonha inferior. 4. Evacuação em porto (MARPOL). Frequência: 1-2x/dia em navegação. Indicador: aumento de temperatura dos gases na saída do EGE."},
      {q:"Que informação deve constar num relatório de inspeção de caldeira?",a:"Identificação do navio e caldeira, data, inspetores. Estado das superfícies internas (lado água e fogo). Medições de espessura dos tubos. Teste hidrostático (se realizado). Estado das válvulas de segurança (pressão de taramento). Trabalhos realizados. Recomendações. Próxima inspeção. Assinatura do inspetor da sociedade de classificação."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"À quelle pression est réalisé le test hydrostatique d'une chaudière marine ?",opts:["Pression de service (PMS)","1,25 × PMS","1,5 × PMS","2 × PMS"],correct:2,exp:"Le test hydrostatique est réalisé à 1,5 fois la pression maximale de service (PMS). C'est la valeur réglementaire imposée par les sociétés de classification. Cette surpression permet de détecter les fissures et défauts structurels non visibles à l'inspection visuelle, sans risquer de dépasser les limites de résistance de la chaudière."},
      {q:"Quelle est la durée minimale de refroidissement d'une chaudière avant d'y entrer pour inspection ?",opts:["2-4 heures","8-12 heures","24-48 heures","7 jours"],correct:2,exp:"La chaudière doit être hors service depuis au moins 24-48 heures pour atteindre une température inférieure à 40°C avant l'entrée en inspection. Cette durée est nécessaire pour le refroidissement complet des métaux et de l'eau résiduelle. La température doit être vérifiée avant l'entrée (thermomètre ou toucher de la paroi extérieure)."},
      {q:"Qu'est-ce que la 'passivation' après un détartrage chimique ?",opts:["Un rinçage à l'eau froide","Un traitement alcalin qui reprotège les surfaces métalliques","Un test d'étanchéité","Un traitement de la vapeur"],correct:1,exp:"La passivation est un traitement chimique alcalin (solution de phosphate ou molybdate) appliqué sur les surfaces métalliques après détartrage pour reformer une couche protectrice d'oxyde qui protège contre la corrosion. Sans passivation, les surfaces nettoyées sont vulnérables à la corrosion immédiate dès le contact avec l'eau et l'oxygène."},
      {q:"À quelle fréquence la société de classification réalise-t-elle une inspection spéciale d'une chaudière marine ?",opts:["Tous les ans","Tous les 2,5 ans","Tous les 5 ans","Tous les 10 ans"],correct:2,exp:"L'inspection spéciale (Special Survey) d'une chaudière marine est réalisée tous les 5 ans par la société de classification. C'est l'inspection la plus complète : elle comprend le démontage des soupapes, les mesures d'épaisseur, le test hydrostatique et le renouvellement du certificat de chaudière."},
      {q:"Pourquoi ne doit-on jamais utiliser d'air comprimé pour un test hydrostatique ?",opts:["L'air est trop coûteux","En cas de rupture, l'air comprimé libère une énergie explosive dangereuse","L'air corrode les parois","L'air fausse les mesures de pression"],correct:1,exp:"L'air comprimé (gaz compressible) emmagasine une grande quantité d'énergie. En cas de rupture pendant l'essai, cette énergie est libérée instantanément et de façon explosive, causant des dégâts très importants et des blessures graves. L'eau (incompressible) ne stocke pas d'énergie potentielle − en cas de rupture, il n'y a qu'une fuite d'eau sans explosion."},
    ],
    en:[
      {q:"At what pressure is a marine boiler hydrostatic test performed?",opts:["Service pressure (MAWP)","1.25 × MAWP","1.5 × MAWP","2 × MAWP"],correct:2,exp:"Hydrostatic test performed at 1.5 times maximum allowable working pressure (MAWP). This is the regulatory value imposed by classification societies. This overpressure detects cracks and structural defects not visible in visual inspection, without exceeding boiler structural limits."},
      {q:"What is the minimum cooling time for a boiler before entry for inspection?",opts:["2-4 hours","8-12 hours","24-48 hours","7 days"],correct:2,exp:"Boiler must be shut down for at least 24-48 hours to reach temperature below 40°C before inspection entry. This time is needed for complete metal and residual water cooling. Temperature must be verified before entry (thermometer or external wall touch)."},
      {q:"What is 'passivation' after chemical descaling?",opts:["A cold water rinse","An alkaline treatment that re-protects metal surfaces","A tightness test","A steam treatment"],correct:1,exp:"Passivation is an alkaline chemical treatment (phosphate or molybdate solution) applied to metal surfaces after descaling to reform a protective oxide layer guarding against corrosion. Without passivation, cleaned surfaces are immediately vulnerable to corrosion on contact with water and oxygen."},
      {q:"How often does the classification society perform a Special Survey on a marine boiler?",opts:["Every year","Every 2.5 years","Every 5 years","Every 10 years"],correct:2,exp:"The Special Survey of a marine boiler is carried out every 5 years by the classification society. It is the most comprehensive inspection: safety valve dismantling, thickness measurements, hydrostatic test and boiler certificate renewal."},
      {q:"Why must compressed air never be used for a hydrostatic test?",opts:["Air is too expensive","On rupture, compressed air releases dangerous explosive energy","Air corrodes walls","Air falsifies pressure readings"],correct:1,exp:"Compressed air (compressible gas) stores large amounts of energy. On rupture during testing, this energy is instantly released explosively, causing major damage and serious injury. Water (incompressible) stores no potential energy − on rupture there is only a water leak without explosion."},
    ],
    es:[
      {q:"¿A qué presión se realiza la prueba hidrostática de una caldera marina?",opts:["Presión de servicio (PMS)","1,25 × PMS","1,5 × PMS","2 × PMS"],correct:2,exp:"La prueba hidrostática se realiza a 1,5 veces la presión máxima de servicio (PMS). Es el valor reglamentario de las sociedades de clasificación. Detecta grietas y defectos estructurales no visibles en la inspección visual."},
      {q:"¿Cuál es el tiempo mínimo de enfriamiento de una caldera antes de entrar para inspección?",opts:["2-4 horas","8-12 horas","24-48 horas","7 días"],correct:2,exp:"La caldera debe estar fuera de servicio al menos 24-48 horas para alcanzar una temperatura inferior a 40°C. La temperatura debe verificarse antes de la entrada."},
      {q:"¿Qué es la 'pasivación' tras una desincustación química?",opts:["Un enjuague con agua fría","Un tratamiento alcalino que vuelve a proteger las superficies metálicas","Una prueba de estanqueidad","Un tratamiento del vapor"],correct:1,exp:"La pasivación es un tratamiento químico alcalino (fosfato o molibdato) que reforma una capa protectora de óxido en las superficies limpias. Sin pasivación, las superficies son inmediatamente vulnerables a la corrosión."},
      {q:"¿Con qué frecuencia realiza la sociedad de clasificación una inspección especial de caldera?",opts:["Cada año","Cada 2,5 años","Cada 5 años","Cada 10 años"],correct:2,exp:"La inspección especial se realiza cada 5 años. Es la más completa: desmontaje de válvulas, medidas de espesor, prueba hidrostática y renovación del certificado de caldera."},
      {q:"¿Por qué nunca usar aire comprimido en una prueba hidrostática?",opts:["El aire es muy caro","En caso de rotura el aire comprimido libera energía explosiva peligrosa","El aire corroe las paredes","El aire falsea las medidas de presión"],correct:1,exp:"El aire comprimido (gas compresible) almacena gran energía. En caso de rotura durante la prueba, se libera instantáneamente de forma explosiva → grandes daños y lesiones graves. El agua (incompresible) no almacena energía potencial → solo una fuga sin explosión."},
    ],
    pt:[
      {q:"A que pressão se realiza o teste hidrostático de uma caldeira marinha?",opts:["Pressão de serviço (PMS)","1,25 × PMS","1,5 × PMS","2 × PMS"],correct:2,exp:"O teste hidrostático realiza-se a 1,5 vezes a pressão máxima de serviço (PMS). É o valor regulamentar das sociedades de classificação. Deteta fissuras e defeitos estruturais não visíveis na inspeção visual."},
      {q:"Qual é o tempo mínimo de arrefecimento de uma caldeira antes de entrar para inspeção?",opts:["2-4 horas","8-12 horas","24-48 horas","7 dias"],correct:2,exp:"A caldeira deve estar fora de serviço pelo menos 24-48 horas para atingir temperatura abaixo de 40°C. A temperatura deve ser verificada antes da entrada."},
      {q:"O que é a 'passivação' após desincustação química?",opts:["Um enxaguamento com água fria","Um tratamento alcalino que volta a proteger as superfícies metálicas","Um teste de estanqueidade","Um tratamento de vapor"],correct:1,exp:"A passivação é um tratamento químico alcalino (fosfato ou molibdato) que forma uma nova camada protetora de óxido nas superfícies limpas. Sem passivação, as superfícies são imediatamente vulneráveis à corrosão."},
      {q:"Com que frequência a sociedade de classificação realiza uma inspeção especial de caldeira?",opts:["Cada ano","De 2,5 em 2,5 anos","De 5 em 5 anos","De 10 em 10 anos"],correct:2,exp:"A inspeção especial realiza-se de 5 em 5 anos. É a mais completa: desmontagem de válvulas, medições de espessura, teste hidrostático e renovação do certificado de caldeira."},
      {q:"Por que nunca usar ar comprimido num teste hidrostático?",opts:["O ar é demasiado caro","Em caso de rotura o ar comprimido liberta energia explosiva perigosa","O ar corrói as paredes","O ar falseia as medições de pressão"],correct:1,exp:"O ar comprimido (gás compressível) armazena grande energia. Em caso de rotura durante o teste, liberta-se instantaneamente de forma explosiva → grandes danos e lesões graves. A água (incompressível) não armazena energia potencial → apenas uma fuga sem explosão."},
    ],
  };
  return q[lang]||q.fr;
}

function BankTab({ lang }: { lang: string }) {
  const bank=getBank(lang);
  const [open,setOpen]=useState<number|null>(null);
  const [showAns,setShowAns]=useState<Record<number,boolean>>({});
  const L:any={fr:{title:"Banque de questions",show:"Voir la réponse",hide:"Masquer"},en:{title:"Question Bank",show:"Show answer",hide:"Hide"},es:{title:"Banco de preguntas",show:"Ver respuesta",hide:"Ocultar"},pt:{title:"Banco de questões",show:"Ver resposta",hide:"Ocultar"}};
  const l=L[lang]||L.fr;
  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:"#c9922a",marginBottom:14}}>📚 {l.title}</div>
      {bank.map((item:any,i:number)=>(
        <div key={i} style={{marginBottom:8,borderRadius:12,background:"rgba(10,22,40,0.8)",border:"1px solid rgba(109,191,138,0.15)",overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 14px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10}}>
            <span style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:"#6dbf8a",fontWeight:700,marginRight:6}}>Q{i+1}.</span>{item.q}</span>
            <span style={{color:"#6dbf8a",fontSize:14,flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{padding:"0 14px 12px"}}>
              <button onClick={()=>setShowAns(p=>({...p,[i]:!p[i]}))} style={{padding:"6px 12px",borderRadius:8,fontSize:10,cursor:"pointer",background:showAns[i]?"rgba(109,191,138,0.13)":"rgba(255,255,255,0.05)",border:`1px solid ${showAns[i]?"#6dbf8a":"rgba(255,255,255,0.12)"}`,color:showAns[i]?"#6dbf8a":"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{showAns[i]?l.hide:l.show}</button>
              {showAns[i]&&<div style={{marginTop:8,padding:10,borderRadius:8,background:"rgba(13,31,60,0.8)",borderLeft:"3px solid #6dbf8a",fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{item.a}</div>}
            </div>
          )}
        </div>
      ))}
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
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(109,191,138,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
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
      <div style={{display:"flex",padding:"10px 14px 0",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
        {t.tabs.map((label:string,i:number)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",borderRadius:10,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",background:tab===i?"rgba(109,191,138,0.13)":"rgba(255,255,255,0.04)",border:`1px solid ${tab===i?"#6dbf8a":"rgba(255,255,255,0.1)"}`,color:tab===i?"#6dbf8a":"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{label}</button>
        ))}
      </div>
      <div>
        {tab===0&&<ContentTab lang={lang}/>}
        {tab===1&&<PracticeTab lang={lang}/>}
        {tab===2&&<BankTab lang={lang}/>}
        {tab===3&&<QuizTab lang={lang} onComplete={(xp)=>{if(onComplete)onComplete(xp);}}/>}
      </div>
    </div>
  );
}
