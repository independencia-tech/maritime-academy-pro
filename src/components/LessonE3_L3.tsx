// LessonE3_L3 - Traitement de l'eau de chaudière | PART 1
import { useState } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  water:"#4da6ff", chem:"#6dbf8a", scale:"#e8b94f",
  corr:"#f97316", safe:"#6dbf8a", danger:"#e74c3c",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  purple:"#c084fc",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE - CHAUDIÈRES",
    lessonTitle:"Traitement de l'eau de chaudière",
    intro:"La qualité de l'eau est cruciale pour la longévité d'une chaudière. Une eau mal traitée provoque entartrage, corrosion et défaillances graves. Le traitement chimique et la surveillance régulière des paramètres sont indispensables.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"💧 Problèmes liés à l'eau de chaudière",
    s1hint:"👆 Tapez un problème",
    s2title:"🧪 Produits chimiques de traitement",
    s2hint:"👆 Tapez un produit",
    s3title:"📊 Paramètres à surveiller",
    s3hint:"👆 Tapez un paramètre",
    s4title:"🔬 Procédures d'analyse & purge",
    s4hint:"👆 Tapez une procédure",
    keypoints:"Points clés",
    kp:[
      "pH cible : 10,5-11,5 pour protéger les surfaces métalliques de la corrosion",
      "Dureté nulle requise - l'eau dure forme du tartre calcaire sur les tubes",
      "L'oxygène dissous provoque une corrosion par piqûres - désoxygénation obligatoire",
      "La purge (blow-down) élimine les sels concentrés et la boue du fond",
      "Test chimique quotidien : pH, chlorures, conductivité, alcalinité",
    ],
    problems:{
      scaling:{ name:"Entartrage (Scale)", desc:"Les sels de calcium et magnésium dissous dans l'eau précipitent sous forme de carbonate et sulfate de calcium sur les parois chaudes des tubes. Le tartre est un très mauvais conducteur thermique (x50 fois moins que l'acier). 1 mm de tartre → 3-5% de perte d'efficacité. 3 mm de tartre → surchauffe des tubes → risque d'explosion. Prévention : eau adoucie (dureté = 0), traitement aux antitartres." },
      corrosion:{ name:"Corrosion", desc:"Deux types principaux : Corrosion par O2 (oxygène dissous) : l'oxygène réagit avec le fer à haute température → piqûres profondes et rapides. Corrosion acide (pH bas) : un pH < 8 dissout l'oxyde protecteur de fer → attaque généralisée. Un pH > 12 peut aussi attaquer l'acier (corrosion caustique). Prévention : désoxygénation, maintien du pH 10,5-11,5, inhibiteurs de corrosion." },
      foaming:{ name:"Moussage (Priming/Foaming)", desc:"Formation de mousse à la surface de l'eau dans le ballon vapeur, provoquant l'entraînement de gouttelettes d'eau avec la vapeur. Causé par : contamination huile, excès de sels dissous (conductivité élevée), surfactants. Conséquences : coup d'eau dans les systèmes vapeur, dépôts dans les surchauffeurs et réchauffeurs. Remède : purge de fond, réduction de la charge, traitement anti-mousse." },
      carryover:{ name:"Entraînement (Carry-over)", desc:"Gouttelettes d'eau ou vapeur humide transportées dans les conduites de vapeur. Causes : niveau d'eau trop élevé, moussage, montée en charge trop rapide. Conséquences : coups d'eau dans les machines, corrosion et dépôts dans les tuyauteries. Prévention : maintien du niveau correct, montée en charge progressive, traitement antimoussant." },
    },
    chemicals:{
      oxygen_scav:{ name:"Désoxygénant (Oxygen Scavenger)", desc:"Élimine l'oxygène dissous par réaction chimique. Types : Sulfite de sodium (Na2SO3) : 2Na2SO3 + O2 → 2Na2SO4. Économique, efficace jusqu'à 10 bar. Hydrazine (N2H4) : N2H4 + O2 → N2 + 2H2O. Pour hautes pressions, mais toxique. DEHA/Carbohydrazide : alternatives modernes non toxiques. Dosage : suffisant pour maintenir un résiduel de 0,5-2 mg/l de produit dans l'eau." },
      alkalinity:{ name:"Alcalinisant (pH control)", desc:"Maintient le pH à 10,5-11,5 pour protéger l'acier. Produits : Hydroxyde de sodium (NaOH/soude caustique) : alcalinisant puissant. Phosphate trisodique (Na3PO4) : tampon pH + précipite les sels de calcium. Morpholine : traite simultanément la chaudière et les condensats. Dosage basé sur les mesures de pH et d'alcalinité." },
      antiscale:{ name:"Antitartre (Scale inhibitor)", desc:"Empêche la précipitation des sels calcaires ou disperse les cristaux formés. Types : Agents complexants (EDTA, NTA) : séquestrent les ions calcium et magnésium. Dispersants polymères : empêchent l'adhésion des cristaux aux parois. Phosphates : précipitent le calcium en boue (non-adhérente) plutôt qu'en tartre dur." },
      antifoam:{ name:"Antimoussant (Anti-foam)", desc:"Réduit la tension superficielle de l'eau pour empêcher la formation de mousse stable. Produits à base de silicone ou d'alcools gras. Dosage faible (quelques mg/l). Utilisé quand la conductivité est élevée ou en cas de contamination par huile." },
    },
    parameters:{
      ph:{ name:"pH", desc:"Cible : 10,5-11,5. < 8,5 : corrosion acide → urgence. 8,5-10,5 : insuffisant. 10,5-11,5 : correct. > 12 : risque de corrosion caustique. Mesure : colorimétrie ou pH-mètre. Fréquence : quotidienne. Action : ajuster la dose d'alcalinisant." },
      hardness:{ name:"Dureté (TH)", desc:"Cible : 0 (eau adoucie). La dureté mesure les ions Ca2+ et Mg2+. > 0,5 degF (5 mg/l CaCO3) → risque d'entartrage. Vérifier l'adoucisseur et sa régénération. Mesure : titrimétrie EDTA. Si dureté non nulle → purge immédiate + investiguer source d'eau dure." },
      chlorides:{ name:"Chlorures (Cl-)", desc:"Cible : < 1 mg/l. Les chlorures sont corrosifs (corrosion par piqûres de l'acier inox, fissuration sous contrainte). Source : infiltration d'eau de mer, eau de condensat contaminée. > 2 mg/l → purge intensifiée. > 5 mg/l → arrêt et investigation." },
      conductivity:{ name:"Conductivité (μS/cm)", desc:"Cible : < 1000 μS/cm (voire < 500 selon type de chaudière). Indicateur global de la concentration en sels dissous. Si trop élevée → purge de fond. Corrélée au risque de moussage et d'entraînement. Mesure : conductimètre. Surveiller la tendance (augmentation = concentration en sels)." },
      oxygen:{ name:"Oxygène dissous (O2)", desc:"Cible : < 0,02 mg/l (20 ppb). Mesuré dans l'eau d'alimentation APRÈS le déaérateur. Si > 0,05 mg/l → vérifier le déaérateur, augmenter le désoxygénant. Instrument : électrode ampérométrique ou kit colorimétrique." },
      alkalinity:{ name:"Alcalinité (M-alkalinity)", desc:"Cible : 100-500 mg/l CaCO3 (selon pression). Indicateur de la capacité tampon du système. Faible → pH instable → risque de chute de pH. Trop élevée → moussage. Mesure : titrimétrie acide avec méthylorange ou phénolphtaléine." },
    },
    procedures:{
      sampling:{ name:"Prélèvement d'échantillon", desc:"Purger la vanne d'échantillonnage pendant 1-2 minutes avant de prélever (éliminer l'eau stagnante). Refroidir l'échantillon avant analyse (eau chaude = mesures faussées). Analyser immédiatement (O2 surtout s'oxyde rapidement en contact avec l'air). Consigner heure, température et résultats dans le registre." },
      blowdown:{ name:"Purge de surface (Surface blow-down)", desc:"Élimine les matières en suspension et la mousse en surface du ballon. Ouvrir lentement la vanne de purge pendant 5-15 secondes. Réaliser quand la chaudière est en charge normale (pas à l'arrêt). Fréquence : quotidienne ou selon conductivité." },
      bottomblowdown:{ name:"Purge de fond (Bottom blow-down)", desc:"Élimine les boues et sédiments accumulés au fond du ballon. Plus courte et plus violente que la purge de surface. Réaliser à faible charge (moins de perte de vapeur). Fréquence : hebdomadaire. Attention : perte d'eau et d'énergie → consigner dans le registre." },
      dosing:{ name:"Dosage chimique", desc:"Injection en continu via pompe doseuse dans la tuyauterie d'alimentation. Concentration calculée selon le débit d'eau et les résultats d'analyse. Adapter la dose après chaque analyse. Certains produits peuvent être incompatibles → ne jamais mélanger directement. Consigner les doses dans le registre de traitement." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Expliquez les deux principaux problèmes causés par une mauvaise qualité de l'eau de chaudière et leurs conséquences.",
        a:"1. Entartrage (scale) : les sels de calcium et magnésium dissous précipitent sur les parois chaudes des tubes sous forme de tartre dur. Le tartre est 50x moins conducteur thermique que l'acier. 1 mm de tartre → 3-5% de perte d'efficacité. 3 mm → surchauffe des tubes → déformation → explosion. Prévention : eau adoucie (dureté = 0), antitartres. 2. Corrosion : deux mécanismes principaux. Corrosion par oxygène dissous : O2 + Fe → rouille, piqûres profondes et rapides sur les surfaces métalliques. Corrosion acide : pH < 8,5 → dissolution de l'oxyde protecteur de fer → attaque généralisée. Les deux peuvent conduire à des perforations de tubes et des explosions." },
      { q:"Pourquoi maintient-on le pH de l'eau de chaudière entre 10,5 et 11,5 ? Que se passe-t-il en dehors de cette plage ?",
        a:"Le pH 10,5-11,5 est la zone de passivation de l'acier : à ce pH, une couche protectrice d'oxyde de fer (Fe3O4 = magnétite) se forme spontanément sur les surfaces métalliques et les protège de la corrosion. En dehors de cette plage : pH < 8,5 : corrosion acide généralisée. L'oxyde protecteur se dissout, le fer est attaqué directement. Urgence absolue → ajouter alcalinisant immédiatement. pH 8,5-10,5 : protection insuffisante → corrosion lente mais progressive. pH > 12 : corrosion caustique → NaOH concentré attaque l'acier en formant des hydrures de fer, causant des fissures. Le pH est mesuré quotidiennement et ajusté par injection d'alcalinisant (NaOH ou Na3PO4)." },
      { q:"Qu'est-ce que la purge de fond (bottom blow-down) d'une chaudière et pourquoi est-elle nécessaire ?",
        a:"La purge de fond (bottom blow-down) consiste à ouvrir une vanne en bas du ballon ou du collecteur inférieur pour évacuer les boues et sédiments accumulés. Pourquoi nécessaire : au fil du temps, les sels dissous dans l'eau précipitent sous forme de boue (phosphates de calcium, silicates, etc.) qui se déposent au fond. Ces boues : réduisent le transfert de chaleur, peuvent provoquer des points chauds, augmentent la conductivité de l'eau. Procédure : réaliser à faible charge, ouvrir la vanne rapidement (quelques secondes à 30 secondes), refermer. Fréquence : hebdomadaire ou selon résultats d'analyse. Consigner dans le registre (quantité d'eau purgée pour le bilan eau)." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE - BOILERS",
    lessonTitle:"Boiler Water Treatment",
    intro:"Water quality is crucial for boiler longevity. Poorly treated water causes scaling, corrosion and serious failures. Chemical treatment and regular parameter monitoring are essential.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"💧 Boiler Water Problems",
    s1hint:"👆 Tap a problem",
    s2title:"🧪 Treatment Chemicals",
    s2hint:"👆 Tap a chemical",
    s3title:"📊 Parameters to Monitor",
    s3hint:"👆 Tap a parameter",
    s4title:"🔬 Analysis & Blow-down Procedures",
    s4hint:"👆 Tap a procedure",
    keypoints:"Key Points",
    kp:[
      "Target pH: 10.5-11.5 to protect metal surfaces from corrosion",
      "Zero hardness required - hard water forms scale on tubes",
      "Dissolved oxygen causes pitting corrosion - mandatory de-oxygenation",
      "Blow-down removes concentrated salts and bottom sludge",
      "Daily chemical test: pH, chlorides, conductivity, alkalinity",
    ],
    problems:{
      scaling:{ name:"Scaling", desc:"Calcium and magnesium salts dissolved in water precipitate as calcium carbonate and sulphate on hot tube walls. Scale is a very poor heat conductor (50x less than steel). 1 mm scale → 3-5% efficiency loss. 3 mm scale → tube overheating → explosion risk. Prevention: softened water (hardness = 0), scale inhibitors." },
      corrosion:{ name:"Corrosion", desc:"Two main types: O2 corrosion (dissolved oxygen): oxygen reacts with iron at high temperature → deep, rapid pitting. Acid corrosion (low pH): pH < 8 dissolves iron's protective oxide → general attack. pH > 12 can also attack steel (caustic corrosion). Prevention: de-oxygenation, maintaining pH 10.5-11.5, corrosion inhibitors." },
      foaming:{ name:"Foaming/Priming", desc:"Foam formation on water surface in steam drum, causing water droplet carryover with steam. Caused by: oil contamination, excess dissolved salts (high conductivity), surfactants. Consequences: water slug in steam systems, deposits in superheaters and heaters. Remedy: bottom blow-down, load reduction, anti-foam treatment." },
      carryover:{ name:"Carry-over", desc:"Water droplets or wet steam transported into steam pipes. Causes: water level too high, foaming, too rapid load increase. Consequences: water slugs in machinery, corrosion and deposits in pipework. Prevention: correct level maintenance, progressive load increase, anti-foam treatment." },
    },
    chemicals:{
      oxygen_scav:{ name:"Oxygen Scavenger", desc:"Removes dissolved oxygen by chemical reaction. Types: Sodium sulphite (Na2SO3): 2Na2SO3 + O2 → 2Na2SO4. Economical, effective up to 10 bar. Hydrazine (N2H4): N2H4 + O2 → N2 + 2H2O. For high pressures, but toxic. DEHA/Carbohydrazide: modern non-toxic alternatives. Dosing: sufficient to maintain 0.5-2 mg/l residual in water." },
      alkalinity:{ name:"Alkalinity agent (pH control)", desc:"Maintains pH at 10.5-11.5 to protect steel. Products: Sodium hydroxide (NaOH/caustic soda): strong alkaliser. Trisodium phosphate (Na3PO4): pH buffer + precipitates calcium salts. Morpholine: simultaneously treats boiler and condensate. Dosing based on pH and alkalinity measurements." },
      antiscale:{ name:"Scale Inhibitor", desc:"Prevents calcium salt precipitation or disperses formed crystals. Types: Chelating agents (EDTA, NTA): sequester calcium and magnesium ions. Polymer dispersants: prevent crystal adhesion to walls. Phosphates: precipitate calcium as sludge (non-adherent) rather than hard scale." },
      antifoam:{ name:"Anti-foam", desc:"Reduces water surface tension to prevent stable foam formation. Silicone or fatty alcohol-based products. Low dosing (a few mg/l). Used when conductivity is high or oil contamination present." },
    },
    parameters:{
      ph:{ name:"pH", desc:"Target: 10.5-11.5. < 8.5: acid corrosion → urgent. 8.5-10.5: insufficient. 10.5-11.5: correct. > 12: caustic corrosion risk. Measurement: colorimetry or pH meter. Frequency: daily. Action: adjust alkaliser dose." },
      hardness:{ name:"Hardness (TH)", desc:"Target: 0 (softened water). Hardness measures Ca2+ and Mg2+ ions. > 0.5 degF (5 mg/l CaCO3) → scaling risk. Check softener and regeneration. Measurement: EDTA titration. If non-zero → immediate blow-down + investigate hard water source." },
      chlorides:{ name:"Chlorides (Cl-)", desc:"Target: < 1 mg/l. Chlorides are corrosive (pitting corrosion of stainless steel, stress cracking). Source: seawater ingress, contaminated condensate. > 2 mg/l → increased blow-down. > 5 mg/l → shutdown and investigation." },
      conductivity:{ name:"Conductivity (μS/cm)", desc:"Target: < 1000 μS/cm (even < 500 depending on boiler type). Global indicator of dissolved salt concentration. If too high → bottom blow-down. Correlated with foaming and carryover risk. Trend monitoring essential (increase = salt concentration)." },
      oxygen:{ name:"Dissolved oxygen (O2)", desc:"Target: < 0.02 mg/l (20 ppb). Measured in feed water AFTER de-aerator. If > 0.05 mg/l → check de-aerator, increase oxygen scavenger. Instrument: amperometric electrode or colorimetric kit." },
      alkalinity:{ name:"Alkalinity (M-alkalinity)", desc:"Target: 100-500 mg/l CaCO3 (per pressure). Buffer capacity indicator. Low → unstable pH → pH drop risk. Too high → foaming. Measurement: acid titration with methyl orange or phenolphthalein." },
    },
    procedures:{
      sampling:{ name:"Water sampling", desc:"Flush sampling valve for 1-2 minutes before sampling (remove stagnant water). Cool sample before analysis (hot water = false readings). Analyse immediately (O2 especially oxidises rapidly in air contact). Log time, temperature and results in register." },
      blowdown:{ name:"Surface blow-down", desc:"Removes suspended matter and foam from drum surface. Slowly open blow-down valve for 5-15 seconds. Perform during normal boiler load (not when stopped). Frequency: daily or per conductivity." },
      bottomblowdown:{ name:"Bottom blow-down", desc:"Removes accumulated sludge and sediment from drum bottom. Shorter and more vigorous than surface blow-down. Perform at low load (less steam loss). Frequency: weekly. Note: water and energy loss → log in register." },
      dosing:{ name:"Chemical dosing", desc:"Continuous injection via dosing pump in feed water piping. Concentration calculated per water flow and analysis results. Adjust dose after each analysis. Some products may be incompatible → never mix directly. Log doses in treatment register." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Explain the two main problems caused by poor boiler water quality and their consequences.",
        a:"1. Scaling: dissolved calcium and magnesium salts precipitate on hot tube walls as hard scale. Scale is 50x less thermally conductive than steel. 1 mm scale → 3-5% efficiency loss. 3 mm → tube overheating → deformation → explosion. Prevention: softened water (hardness = 0), scale inhibitors. 2. Corrosion: two main mechanisms. Dissolved oxygen corrosion: O2 + Fe → rust, deep rapid pitting on metal surfaces. Acid corrosion: pH < 8.5 → dissolution of iron's protective oxide → general attack. Both can lead to tube perforations and explosions." },
      { q:"Why is boiler water pH maintained between 10.5 and 11.5? What happens outside this range?",
        a:"pH 10.5-11.5 is the steel passivation zone: at this pH, a protective iron oxide layer (Fe3O4 = magnetite) spontaneously forms on metal surfaces protecting them from corrosion. Outside this range: pH < 8.5: general acid corrosion. Protective oxide dissolves, iron directly attacked. Absolute emergency → add alkaliser immediately. pH 8.5-10.5: insufficient protection → slow but progressive corrosion. pH > 12: caustic corrosion → concentrated NaOH attacks steel forming iron hydrides, causing cracks. pH measured daily and adjusted by alkaliser injection (NaOH or Na3PO4)." },
      { q:"What is boiler bottom blow-down and why is it necessary?",
        a:"Bottom blow-down consists of opening a valve at the bottom of the drum or lower header to evacuate accumulated sludge and sediment. Why necessary: over time, dissolved salts precipitate as sludge (calcium phosphates, silicates, etc.) depositing at the bottom. This sludge: reduces heat transfer, can cause hot spots, increases water conductivity. Procedure: perform at low load, open valve quickly (a few seconds to 30 seconds), close. Frequency: weekly or per analysis results. Log in register (quantity of water blown to water balance)." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS - CALDERAS",
    lessonTitle:"Tratamiento del agua de caldera",
    intro:"La calidad del agua es crucial para la longevidad de la caldera. Un agua mal tratada provoca incrustaciones, corrosión y fallos graves. El tratamiento químico y la vigilancia regular son indispensables.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"💧 Problemas del agua de caldera",
    s1hint:"👆 Toca un problema",
    s2title:"🧪 Productos químicos de tratamiento",
    s2hint:"👆 Toca un producto",
    s3title:"📊 Parámetros a vigilar",
    s3hint:"👆 Toca un parámetro",
    s4title:"🔬 Procedimientos de análisis & purga",
    s4hint:"👆 Toca un procedimiento",
    keypoints:"Puntos clave",
    kp:[
      "pH objetivo: 10,5-11,5 para proteger las superficies metálicas",
      "Dureza nula requerida - el agua dura forma incrustaciones en los tubos",
      "El oxígeno disuelto provoca corrosión por picaduras - desoxigenación obligatoria",
      "La purga (blow-down) elimina las sales concentradas y los lodos del fondo",
      "Análisis químico diario: pH, cloruros, conductividad, alcalinidad",
    ],
    problems:{
      scaling:{ name:"Incrustación (Scale)", desc:"Las sales de calcio y magnesio precipitan en las paredes calientes como carbonato y sulfato de calcio. Las incrustaciones tienen muy baja conductividad térmica (50x menos que el acero). 1 mm → 3-5% pérdida de eficiencia. 3 mm → sobrecalentamiento → riesgo de explosión. Prevención: agua ablandada, antincrustantes." },
      corrosion:{ name:"Corrosión", desc:"Dos tipos principales: Corrosión por O2: el oxígeno reacciona con el hierro → picaduras profundas y rápidas. Corrosión ácida (pH bajo): pH < 8 disuelve el óxido protector → ataque generalizado. pH > 12: corrosión cáustica. Prevención: desoxigenación, pH 10,5-11,5, inhibidores." },
      foaming:{ name:"Espumeo (Priming/Foaming)", desc:"Formación de espuma en la superficie del agua del balón → arrastre de gotitas con el vapor. Causado por: contaminación de aceite, exceso de sales disueltas, surfactantes. Consecuencias: golpes de agua, depósitos en los sobrecalentadores. Remedio: purga de fondo, reducción de carga, antiespumante." },
      carryover:{ name:"Arrastre (Carry-over)", desc:"Gotitas de agua transportadas en las tuberías de vapor. Causas: nivel de agua alto, espumeo, subida de carga rápida. Consecuencias: golpes de agua en maquinaria, corrosión en tuberías. Prevención: nivel correcto, subida de carga progresiva, antiespumante." },
    },
    chemicals:{
      oxygen_scav:{ name:"Desoxigenante (Oxygen Scavenger)", desc:"Elimina el oxígeno disuelto por reacción química. Sulfito sódico (Na2SO3): económico, eficaz hasta 10 bar. Hidrazina (N2H4): para altas presiones, tóxica. DEHA/Carbohidrazida: alternativas modernas no tóxicas. Dosis: mantener residual de 0,5-2 mg/l en el agua." },
      alkalinity:{ name:"Alcalinizante (control pH)", desc:"Mantiene pH 10,5-11,5. Hidróxido sódico (NaOH): alcalinizante potente. Fosfato trisódico (Na3PO4): tampón pH + precipita sales de calcio. Morfolina: trata caldera y condensados simultáneamente." },
      antiscale:{ name:"Antincrustante (Scale inhibitor)", desc:"Evita la precipitación de sales calcáreas. Agentes complejantes (EDTA): secuestran Ca2+ y Mg2+. Dispersantes poliméricos: evitan la adhesión de cristales. Fosfatos: precipitan el calcio en lodo (no adherente)." },
      antifoam:{ name:"Antiespumante (Anti-foam)", desc:"Reduce la tensión superficial del agua para evitar espuma estable. Base de silicona o alcoholes grasos. Dosis baja. Usado con conductividad alta o contaminación por aceite." },
    },
    parameters:{
      ph:{ name:"pH", desc:"Objetivo: 10,5-11,5. < 8,5: corrosión ácida → urgencia. 8,5-10,5: insuficiente. > 12: corrosión cáustica. Medición: colorimetría o pH-metro. Frecuencia: diaria." },
      hardness:{ name:"Dureza (TH)", desc:"Objetivo: 0 (agua ablandada). > 0,5 degF → riesgo de incrustación. Verificar el ablandador. Si dureza > 0 → purga inmediata." },
      chlorides:{ name:"Cloruros (Cl-)", desc:"Objetivo: < 1 mg/l. Corrosivos (picaduras en acero inox). Fuente: infiltración de agua de mar. > 2 mg/l → purga intensificada. > 5 mg/l → parada e investigación." },
      conductivity:{ name:"Conductividad (μS/cm)", desc:"Objetivo: < 1000 μS/cm. Indicador global de sales disueltas. Si alta → purga de fondo. Correlacionada con riesgo de espumeo." },
      oxygen:{ name:"Oxígeno disuelto (O2)", desc:"Objetivo: < 0,02 mg/l. Medido en el agua de alimentación tras el desaireador. Si > 0,05 mg/l → verificar desaireador, aumentar desoxigenante." },
      alkalinity:{ name:"Alcalinidad (M-alcalinidad)", desc:"Objetivo: 100-500 mg/l CaCO3. Baja → pH inestable. Alta → espumeo. Medición: titulación ácida." },
    },
    procedures:{
      sampling:{ name:"Toma de muestra", desc:"Purgar la válvula 1-2 minutos antes de tomar la muestra. Enfriar antes de analizar. Analizar inmediatamente. Registrar hora, temperatura y resultados." },
      blowdown:{ name:"Purga de superficie", desc:"Elimina materias en suspensión y espuma. Abrir lentamente la válvula 5-15 segundos. Realizar con carga normal. Frecuencia: diaria o según conductividad." },
      bottomblowdown:{ name:"Purga de fondo", desc:"Elimina lodos y sedimentos del fondo del balón. Más corta y violenta. Realizar a baja carga. Frecuencia: semanal. Registrar cantidad purgada." },
      dosing:{ name:"Dosificación química", desc:"Inyección continua por bomba dosificadora en la tubería de alimentación. Concentración calculada según caudal y análisis. Ajustar dosis tras cada análisis. Registrar en el libro de tratamiento." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Explique los dos principales problemas causados por una mala calidad del agua de caldera.",
        a:"1. Incrustación: las sales de Ca y Mg precipitan en las paredes calientes. Las incrustaciones tienen muy baja conductividad (50x menos que el acero). 1 mm → 3-5% pérdida. 3 mm → sobrecalentamiento → explosión. Prevención: agua ablandada, antincrustantes. 2. Corrosión: por O2 (picaduras profundas) y ácida (pH < 8,5 → ataque generalizado). Ambas pueden perforar los tubos." },
      { q:"¿Por qué el pH del agua de caldera se mantiene entre 10,5 y 11,5?",
        a:"A pH 10,5-11,5 se forma una capa protectora de óxido de hierro (Fe3O4 = magnetita) en las superficies metálicas. pH < 8,5: corrosión ácida generalizada → urgencia. pH 8,5-10,5: protección insuficiente. pH > 12: corrosión cáustica. Ajustar con alcalinizante (NaOH o Na3PO4)." },
      { q:"¿Qué es la purga de fondo y por qué es necesaria?",
        a:"Apertura de válvula en el fondo del balón para evacuar lodos y sedimentos. Necesaria porque las sales precipitan en lodo que: reduce la transferencia de calor, crea puntos calientes, aumenta la conductividad. Procedimiento: a baja carga, abrir unos segundos. Frecuencia: semanal. Registrar en el libro de mantenimiento." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS - CALDEIRAS",
    lessonTitle:"Tratamento da água de caldeira",
    intro:"A qualidade da água é crucial para a longevidade da caldeira. Água mal tratada provoca incrustações, corrosão e falhas graves. O tratamento químico e a monitorização regular são indispensáveis.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"💧 Problemas da água de caldeira",
    s1hint:"👆 Toque num problema",
    s2title:"🧪 Produtos químicos de tratamento",
    s2hint:"👆 Toque num produto",
    s3title:"📊 Parâmetros a monitorizar",
    s3hint:"👆 Toque num parâmetro",
    s4title:"🔬 Procedimentos de análise & purga",
    s4hint:"👆 Toque num procedimento",
    keypoints:"Pontos-chave",
    kp:[
      "pH objetivo: 10,5-11,5 para proteger as superfícies metálicas",
      "Dureza nula obrigatória - água dura forma incrustações nos tubos",
      "O oxigénio dissolvido provoca corrosão por picadas - desoxigenação obrigatória",
      "A purga (blow-down) elimina sais concentrados e lamas do fundo",
      "Análise química diária: pH, cloretos, condutividade, alcalinidade",
    ],
    problems:{
      scaling:{ name:"Incrustação (Scale)", desc:"Os sais de cálcio e magnésio precipitam nas paredes quentes como carbonato e sulfato de cálcio. As incrustações têm muito baixa condutividade térmica (50x menos que o aço). 1 mm → 3-5% perda de eficiência. 3 mm → sobreaquecimento → risco de explosão. Prevenção: água amolecida, inibidores de incrustação." },
      corrosion:{ name:"Corrosão", desc:"Dois tipos principais: Corrosão por O2: o oxigénio reage com o ferro → picadas profundas e rápidas. Corrosão ácida (pH baixo): pH < 8 dissolve o óxido protetor → ataque generalizado. pH > 12: corrosão cáustica. Prevenção: desoxigenação, pH 10,5-11,5, inibidores." },
      foaming:{ name:"Espumação (Priming/Foaming)", desc:"Formação de espuma na superfície da água no balão → arrastamento de gotículas com o vapor. Causado por: contaminação por óleo, excesso de sais dissolvidos, surfactantes. Consequências: golpes de água, depósitos nos sobreaquecedores. Remédio: purga de fundo, redução de carga, antiespumante." },
      carryover:{ name:"Arrastamento (Carry-over)", desc:"Gotículas de água transportadas nas tubagens de vapor. Causas: nível de água alto, espumação, subida de carga rápida. Consequências: golpes de água em maquinaria, corrosão em tubagens. Prevenção: nível correto, subida de carga progressiva, antiespumante." },
    },
    chemicals:{
      oxygen_scav:{ name:"Desoxigenante (Oxygen Scavenger)", desc:"Elimina o oxigénio dissolvido por reação química. Sulfito de sódio (Na2SO3): económico, eficaz até 10 bar. Hidrazina (N2H4): altas pressões, tóxica. DEHA/Carbohidrazida: alternativas modernas não tóxicas. Dose: manter residual de 0,5-2 mg/l na água." },
      alkalinity:{ name:"Alcalinizante (controlo pH)", desc:"Mantém pH 10,5-11,5. Hidróxido de sódio (NaOH): alcalinizante potente. Fosfato trissódico (Na3PO4): tampão pH + precipita sais de cálcio. Morfolina: trata caldeira e condensados simultaneamente." },
      antiscale:{ name:"Inibidor de incrustação", desc:"Evita a precipitação de sais calcários. Agentes quelantes (EDTA): sequestram Ca2+ e Mg2+. Dispersantes poliméricos: evitam adesão de cristais. Fosfatos: precipitam o cálcio em lama (não aderente)." },
      antifoam:{ name:"Antiespumante (Anti-foam)", desc:"Reduz a tensão superficial da água para evitar espuma estável. Base de silicone ou álcoois gordurosos. Dose baixa. Usado com condutividade alta ou contaminação por óleo." },
    },
    parameters:{
      ph:{ name:"pH", desc:"Objetivo: 10,5-11,5. < 8,5: corrosão ácida → urgência. 8,5-10,5: insuficiente. > 12: corrosão cáustica. Medição: colorimetria ou pH-metro. Frequência: diária." },
      hardness:{ name:"Dureza (TH)", desc:"Objetivo: 0 (água amolecida). > 0,5 degF → risco de incrustação. Verificar o amaciador. Se dureza > 0 → purga imediata." },
      chlorides:{ name:"Cloretos (Cl-)", desc:"Objetivo: < 1 mg/l. Corrosivos (picadas em aço inox). Fonte: infiltração de água do mar. > 2 mg/l → purga intensificada. > 5 mg/l → paragem e investigação." },
      conductivity:{ name:"Condutividade (μS/cm)", desc:"Objetivo: < 1000 μS/cm. Indicador global de sais dissolvidos. Se alta → purga de fundo. Correlacionada com risco de espumação." },
      oxygen:{ name:"Oxigénio dissolvido (O2)", desc:"Objetivo: < 0,02 mg/l. Medido na água de alimentação após o desaerador. Se > 0,05 mg/l → verificar desaerador, aumentar desoxigenante." },
      alkalinity:{ name:"Alcalinidade (M-alcalinidade)", desc:"Objetivo: 100-500 mg/l CaCO3. Baixa → pH instável. Alta → espumação. Medição: titulação ácida." },
    },
    procedures:{
      sampling:{ name:"Recolha de amostra", desc:"Purgar a válvula 1-2 minutos antes de recolher. Arrefecer antes de analisar. Analisar imediatamente. Registar hora, temperatura e resultados." },
      blowdown:{ name:"Purga de superfície", desc:"Remove matérias em suspensão e espuma. Abrir lentamente a válvula 5-15 segundos. Realizar com carga normal. Frequência: diária ou conforme condutividade." },
      bottomblowdown:{ name:"Purga de fundo", desc:"Remove lamas e sedimentos do fundo do balão. Mais curta e mais violenta. Realizar a baixa carga. Frequência: semanal. Registar quantidade purgada." },
      dosing:{ name:"Doseamento químico", desc:"Injeção contínua por bomba doseadora na tubagem de alimentação. Concentração calculada conforme caudal e análises. Ajustar dose após cada análise. Registar no livro de tratamento." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Explique os dois principais problemas causados por má qualidade da água de caldeira.",
        a:"1. Incrustação: os sais de Ca e Mg precipitam nas paredes quentes. As incrustações têm muito baixa condutividade (50x menos que o aço). 1 mm → 3-5% perda. 3 mm → sobreaquecimento → explosão. Prevenção: água amolecida, inibidores. 2. Corrosão: por O2 (picadas profundas) e ácida (pH < 8,5 → ataque generalizado). Ambas podem perfurar os tubos." },
      { q:"Por que o pH da água de caldeira é mantido entre 10,5 e 11,5?",
        a:"A pH 10,5-11,5 forma-se uma camada protetora de óxido de ferro (Fe3O4 = magnetite) nas superfícies metálicas. pH < 8,5: corrosão ácida generalizada → urgência. pH 8,5-10,5: proteção insuficiente. pH > 12: corrosão cáustica. Ajustar com alcalinizante (NaOH ou Na3PO4)." },
      { q:"O que é a purga de fundo e por que é necessária?",
        a:"Abertura de válvula no fundo do balão para evacuar lamas e sedimentos. Necessária porque os sais precipitam em lama que: reduz a transferência de calor, cria pontos quentes, aumenta a condutividade. Procedimento: a baixa carga, abrir alguns segundos. Frequência: semanal. Registar no livro de manutenção." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 - PROBLEMS ─────────────────────────────────────────
function ProblemsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("scaling");
  const items = t.problems;
  const cols: Record<string,string> = {scaling:C.scale,corrosion:C.corr,foaming:C.purple,carryover:C.water};
  const icons: Record<string,string> = {scaling:"🪨",corrosion:"⚠️",foaming:"🫧",carryover:"💧"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.scale}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.scale}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.scale,fontWeight:700,marginBottom:8}}>{icons[sel]} {items[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 2 - CHEMICALS ────────────────────────────────────────
function ChemicalsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("oxygen_scav");
  const items = t.chemicals;
  const cols: Record<string,string> = {oxygen_scav:C.chem,alkalinity:C.water,antiscale:C.scale,antifoam:C.purple};
  const icons: Record<string,string> = {oxygen_scav:"O2↓",alkalinity:"pH↑",antiscale:"🪨✗",antifoam:"🫧✗"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.chem}33`}}>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            flex:1,padding:"8px 4px",borderRadius:10,fontSize:10,cursor:"pointer",minWidth:60,
            background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?cols[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",textAlign:"center",fontWeight:700,
          }}>{icons[key]}</button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.chem}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.chem,fontWeight:700,marginBottom:8}}>{items[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 3 - PARAMETERS ───────────────────────────────────────
function ParametersSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("ph");
  const items = t.parameters;
  const cols: Record<string,string> = {ph:C.chem,hardness:C.scale,chlorides:C.corr,conductivity:C.purple,oxygen:C.water,alkalinity:C.gold2};
  const icons: Record<string,string> = {ph:"pH",hardness:"TH",chlorides:"Cl-",conductivity:"μS",oxygen:"O2",alkalinity:"Alk"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.water}33`}}>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            flex:1,padding:"7px 3px",borderRadius:10,fontSize:9,cursor:"pointer",minWidth:40,
            background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?cols[key]:"rgba(240,244,255,0.45)",
            fontFamily:"'Cinzel',serif",textAlign:"center",fontWeight:700,
          }}>{icons[key]}</button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.water}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.water,fontWeight:700,marginBottom:8}}>{icons[sel]} - {items[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 4 - PROCEDURES ───────────────────────────────────────
function ProceduresSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("sampling");
  const items = t.procedures;
  const cols: Record<string,string> = {sampling:C.water,blowdown:C.chem,bottomblowdown:C.corr,dosing:C.purple};
  const icons: Record<string,string> = {sampling:"🧫",blowdown:"💦",bottomblowdown:"⬇️",dosing:"💉"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.purple}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(items).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${cols[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?cols[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${cols[sel]||C.purple}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.purple,fontWeight:700,marginBottom:8}}>{icons[sel]} {items[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      </div>
    </div>
  );
}


const ACCIDENT_L3: any = {
  fr: {
    title: "CAS REEL : Rupture de chaudiere par corrosion - SS Norway (2003, rapport NTSB)",
    body: "Le 25 mai 2003, alors que le paquebot SS Norway venait d'accoster au port de Miami, une de ses chaudieres (numero 23) a explose, liberant environ 20 tonnes d'eau qui se sont transformees en vapeur saturee en une fraction de seconde. L'expansion a souffle des cloisons et des portes dans les zones d'habitation de l'equipage adjacentes a la salle des machines. Huit membres d'equipage ont ete tues et dix-sept autres blesses. L'enquete du NTSB a etabli que la chaudiere presentait une fissuration par fatigue etendue et des materiaux degrades. Un facteur cle etait le non-respect de la composition chimique de l'eau de chaudiere par les sous-traitants et l'armateur : du cuivre avait ete introduit de facon inappropriee, probablement pour masquer des fissures lors des inspections, tandis qu'un manque de rigueur dans le traitement de l'eau avait favorise une corrosion par piqures d'oxygene qui a progressivement affaibli la chaudiere. Des ingenieurs avaient deja exprime des inquietudes concernant les demarrages et arrets trop frequents et trop rapides imposes par le planning d'exploitation du navire.",
    lessons: [
      "Le non-respect des parametres chimiques de l'eau de chaudiere (pH, oxygene dissous, additifs) n'est jamais une simple question de maintenance : c'est un facteur direct de defaillance mecanique a long terme.",
      "Masquer ou minimiser des defauts constates lors d'inspections (fissures, corrosion) pour eviter une immobilisation transforme un probleme reparable en un risque catastrophique.",
      "Des cycles de demarrage et d'arret trop frequents et trop rapides imposent des contraintes thermiques et mecaniques cumulatives qui fragilisent une chaudiere sur le long terme.",
      "Les preoccupations exprimees par le personnel technique sur le terrain doivent etre prises au serieux et remontees formellement, car elles constituent souvent un signal d'alerte precoce.",
    ],
  },
  en: {
    title: "REAL CASE: Boiler rupture from corrosion - SS Norway (2003, NTSB report)",
    body: "On 25 May 2003, shortly after the cruise ship SS Norway had berthed at the Port of Miami, one of its boilers (No. 23) ruptured, releasing about 20 tons of water that flashed into saturated steam within a fraction of a second. The expansion blew out bulkheads and doors in crew living spaces adjacent to the boiler room. Eight crew members were killed and seventeen others injured. The NTSB investigation found the boiler had extensive fatigue cracking and deteriorated materials. A key factor was non-compliance with boiler water chemistry by contractors and the operator: copper had been inappropriately introduced, likely to mask cracks during inspections, while lax water treatment allowed oxygen pitting corrosion to progressively weaken the boiler. Engineers had already raised concerns about the overly frequent and rapid startups and shutdowns required by the vessel's operating schedule.",
    lessons: [
      "Non-compliance with boiler water chemical parameters (pH, dissolved oxygen, additives) is never a simple maintenance matter: it is a direct driver of long-term mechanical failure.",
      "Masking or downplaying defects found during inspections (cracks, corrosion) to avoid downtime turns a repairable problem into a catastrophic risk.",
      "Overly frequent and rapid start/stop cycles impose cumulative thermal and mechanical stress that weakens a boiler over time.",
      "Concerns raised by technical staff on the ground must be taken seriously and formally escalated, as they often constitute an early warning signal.",
    ],
  },
  es: {
    title: "CASO REAL: Rotura de caldera por corrosion - SS Norway (2003, informe NTSB)",
    body: "El 25 de mayo de 2003, poco despues de atracar el crucero SS Norway en el puerto de Miami, una de sus calderas (numero 23) exploto, liberando unas 20 toneladas de agua que se transformaron en vapor saturado en una fraccion de segundo. La expansion volo mamparos y puertas en zonas de alojamiento de la tripulacion adyacentes a la sala de calderas. Ocho tripulantes murieron y otros diecisiete resultaron heridos. La investigacion del NTSB determino que la caldera presentaba una fisuracion por fatiga extensa y materiales deteriorados. Un factor clave fue el incumplimiento de la composicion quimica del agua de caldera por parte de subcontratistas y el armador: se habia introducido cobre de forma inapropiada, probablemente para enmascarar fisuras durante las inspecciones, mientras que un tratamiento de agua laxo permitio una corrosion por picaduras de oxigeno que debilito progresivamente la caldera. Los ingenieros ya habian expresado preocupacion por los arranques y paradas demasiado frecuentes y rapidos exigidos por el calendario de explotacion del buque.",
    lessons: [
      "El incumplimiento de los parametros quimicos del agua de caldera (pH, oxigeno disuelto, aditivos) nunca es una simple cuestion de mantenimiento: es un factor directo de fallo mecanico a largo plazo.",
      "Enmascarar o minimizar defectos detectados en inspecciones (fisuras, corrosion) para evitar una parada convierte un problema reparable en un riesgo catastrofico.",
      "Los ciclos de arranque y parada demasiado frecuentes y rapidos imponen tensiones termicas y mecanicas acumulativas que debilitan una caldera con el tiempo.",
      "Las preocupaciones expresadas por el personal tecnico sobre el terreno deben tomarse en serio y elevarse formalmente, ya que a menudo constituyen una senal de alerta temprana.",
    ],
  },
  pt: {
    title: "CASO REAL: Rutura de caldeira por corrosao - SS Norway (2003, relatorio NTSB)",
    body: "Em 25 de maio de 2003, pouco depois de o navio de cruzeiro SS Norway atracar no porto de Miami, uma das suas caldeiras (numero 23) rebentou, libertando cerca de 20 toneladas de agua que se transformaram em vapor saturado numa fracao de segundo. A expansao arrancou anteparas e portas em zonas de alojamento da tripulacao adjacentes a casa das caldeiras. Oito tripulantes morreram e outros dezassete ficaram feridos. A investigacao do NTSB determinou que a caldeira apresentava fissuracao por fadiga extensa e materiais deteriorados. Um fator chave foi o incumprimento da composicao quimica da agua de caldeira por subcontratados e pelo armador: tinha sido introduzido cobre de forma inadequada, provavelmente para mascarar fissuras durante inspecoes, enquanto um tratamento de agua pouco rigoroso permitiu uma corrosao por picadas de oxigenio que enfraqueceu progressivamente a caldeira. Os engenheiros ja tinham manifestado preocupacao com os arranques e paragens demasiado frequentes e rapidos exigidos pelo calendario de operacao do navio.",
    lessons: [
      "O incumprimento dos parametros quimicos da agua de caldeira (pH, oxigenio dissolvido, aditivos) nunca e uma simples questao de manutencao: e um fator direto de falha mecanica a longo prazo.",
      "Mascarar ou minimizar defeitos detetados em inspecoes (fissuras, corrosao) para evitar uma paragem transforma um problema reparavel num risco catastrofico.",
      "Ciclos de arranque e paragem demasiado frequentes e rapidos impoem tensoes termicas e mecanicas cumulativas que enfraquecem uma caldeira ao longo do tempo.",
      "As preocupacoes manifestadas pelo pessoal tecnico no terreno devem ser levadas a serio e formalmente comunicadas, pois constituem muitas vezes um sinal de alerta precoce.",
    ],
  },
};

function AccidentCase({ lang }: { lang: string }) {
  const a = ACCIDENT_L3[lang] || ACCIDENT_L3.fr;
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
  const section=(title:string,children:React.ReactNode,color=C.water)=>(
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
      {section(t.s1title,<ProblemsSVG lang={lang}/>,C.scale)}
      {section(t.s2title,<ChemicalsSVG lang={lang}/>,C.chem)}
      {section(t.s3title,<ParametersSVG lang={lang}/>,C.water)}
      {section(t.s4title,<ProceduresSVG lang={lang}/>,C.purple)}
      <AccidentCase lang={lang}/>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:C.gold,margin:"20px 0 14px"}}>✏️ {t.practiceTitle}</div>
      {t.questions.map((q:any,i:number)=>(
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.water}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.water,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <input type="text" placeholder="?" value={inputs[i]} onChange={e=>setInputs(p=>p.map((v,j)=>j===i?e.target.value:v))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",color:"#f0f4ff",fontSize:12,fontFamily:"Courier New",marginBottom:10,boxSizing:"border-box"}}/>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.water}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.water:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.water:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.water}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
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
      <button onClick={onStartQuiz} style={{marginTop:20,width:"100%",padding:"16px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#4da6ff,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>
        {lang==="fr"?"✅ COMMENCER LE QUIZ":lang==="en"?"✅ START QUIZ":lang==="es"?"✅ EMPEZAR QUIZ":"✅ COMEÇAR QUIZ"}
      </button>
    </div>
  );
}
// LessonE3_L3 - PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Pourquoi l'eau d'alimentation de chaudiere doit-elle avoir une durete nulle ?",opts:["Pour ameliorer le gout de la vapeur","Le calcium et le magnesium dissous precipitent en tartre isolant sur les tubes chauds, reduisant l'echange de chaleur et risquant la rupture","La durete n'a aucun effet sur une chaudiere","Pour reduire le cout du traitement d'eau"],correct:1,exp:"Les ions calcium et magnesium precipitent a haute temperature en tartre (carbonates/sulfates), 50 fois moins conducteur que l'acier. 1mm de tartre = perte de 3-5% d'efficacite ; 3mm = risque de rupture de tube. Un adoucisseur ramene la durete a 0."},
      {q:"Comment prevenir la corrosion par oxygene dans une chaudiere ?",opts:["En ajoutant plus d'eau de mer","Par deaerateur thermique (chauffe l'eau a 100 degC) et desoxygenants chimiques (sulfite de sodium, hydrazine)","En augmentant la pression de la chaudiere","L'oxygene dissous n'est pas corrosif"],correct:1,exp:"L'oxygene dissous reagit avec le fer a haute temperature, causant des piqures profondes en heures ou jours. Prevention : deaerateur thermique (solubilite O2 nulle a 100 degC) et desoxygenants chimiques, objectif < 0,02 mg/l d'O2."},
      {q:"Quel est le role du phosphate trisodique (Na3PO4) dans le traitement de l'eau de chaudiere ?",opts:["Il sert uniquement de colorant","Il alcalinise l'eau, precipite le calcium en boue non-adherente et favorise la couche protectrice de magnetite","Il elimine uniquement les chlorures","Il n'a aucun role chimique, seulement esthetique"],correct:1,exp:"Le Na3PO4 maintient le pH a 10,5-11,5 (effet tampon), precipite le calcium en phosphate de calcium (boue eliminee par purge de fond plutot que tartre dur), et contribue a la passivation par la magnetite (Fe3O4)."},
      {q:"Quelle est la difference entre une purge de surface et une purge de fond ?",opts:["Elles sont identiques, seul le nom change","La purge de surface elimine mousse et sels en surface, la purge de fond elimine les boues accumulees au fond du ballon","La purge de fond se fait uniquement a l'arret complet","La purge de surface est plus violente que la purge de fond"],correct:1,exp:"La purge de surface (vanne en haut du ballon) elimine mousse et sels concentres en surface, quotidiennement. La purge de fond (vanne en bas) elimine les boues lourdes accumulees, plus courte et violente, hebdomadaire."},
      {q:"Quels signes indiquent un manque de desoxygenant dans une chaudiere ?",opts:["Une pression de vapeur trop elevee","Des piqures caracteristiques sur les tubes, une eau brune/rouge et un O2 superieur a 0,05 mg/l","Un niveau d'eau trop bas uniquement","Aucun signe visible avant la rupture"],correct:1,exp:"Un manque de desoxygenant se manifeste par O2 > 0,05 mg/l dans l'eau d'alimentation, des piqures profondes caracteristiques a l'inspection, et une eau de chaudiere brune/rouge (rouille en suspension)."},
      {q:"Pourquoi surveille-t-on la conductivite electrique de l'eau de chaudiere ?",opts:["Pour mesurer la temperature de l'eau","Elle indique la concentration en sels dissous ; une conductivite trop elevee augmente le risque de moussage et d'entrainement","Elle mesure uniquement le pH","Elle n'a aucune utilite pratique"],correct:1,exp:"La conductivite mesure la concentration globale en sels dissous. Une valeur trop elevee (cible < 1000 uS/cm) favorise le moussage et l'entrainement d'eau (carry-over) dans la vapeur, imposant une purge de fond et de surface."},
      {q:"Comment reconnait-on une contamination de l'eau de chaudiere par des huiles ?",opts:["Par une augmentation de la pression uniquement","Mousse persistante en surface, film irise, carbone organique total (COT) eleve et depots brun-noir","Par une baisse de la temperature de la vapeur","Il n'existe aucun moyen de le detecter"],correct:1,exp:"La contamination par huile se detecte par une mousse persistante a la surface du ballon, un film irise visible, un COT eleve, et des depots brun-noir sur les parois causant des points chauds."},
      {q:"Qu'est-ce que le priming (entrainement de vapeur) et quelles en sont les causes principales ?",opts:["Un phenomene sans consequence sur la chaudiere","Des gouttelettes d'eau entrainees avec la vapeur, causees par un niveau trop eleve, un moussage ou une montee en charge trop rapide","Une fuite d'eau de mer dans le ballon uniquement","Un defaut du bruleur"],correct:1,exp:"Le priming entraine des gouttelettes d'eau liquide avec la vapeur, cause par un niveau trop eleve, un moussage (conductivite elevee) ou une montee en charge trop brutale. Consequences : coups d'eau, depots de sels, corrosion."},
      {q:"Quelle est la procedure correcte de prelevement d'eau de chaudiere pour analyse ?",opts:["Prelever directement sans purger la vanne","Purger la vanne 1-2 minutes, prelever dans un flacon propre, refroidir immediatement et analyser rapidement","Attendre 24h avant d'analyser l'echantillon","Prelever uniquement a l'arret de la chaudiere"],correct:1,exp:"Il faut purger la vanne d'echantillonnage 1-2 minutes, prelever dans un flacon propre, refroidir immediatement (l'oxygene s'echappe et le pH change avec la temperature) et analyser rapidement pour un resultat fiable."},
      {q:"Quelle action immediate prendre si le pH de l'eau de chaudiere est mesure a 8,0 (au lieu de 10,5-11,5 normal) ?",opts:["Ne rien faire, c'est une variation normale","Confirmer avec un second test, avertir le chef mecanicien et augmenter immediatement la dose d'alcalinisant","Purger fortement la chaudiere pour diluer","Arreter definitivement la chaudiere sans investiguer"],correct:1,exp:"Un pH de 8,0 est une urgence (normal 10,5-11,5). Il faut confirmer avec un second test, avertir le chef mecanicien, augmenter la dose d'alcalinisant, et rechercher la cause (entree d'eau acide, consommation excessive)."},
      {q:"Comment fonctionne un adoucisseur d'eau a resine echangeuse d'ions ?",opts:["Il filtre uniquement les particules solides","La resine capture les ions calcium et magnesium et les echange contre des ions sodium ; elle est regeneree par une saumure de NaCl","Il chauffe l'eau pour eliminer la durete","Il ajoute du chlore pour desinfecter l'eau"],correct:1,exp:"La resine echange les ions Ca2+ et Mg2+ (durete) contre des ions Na+. Une fois saturee, elle est regeneree par une solution concentree de NaCl (saumure) qui deplace le calcium/magnesium, evacues a l'egout."},
      {q:"Quelles sont les consequences d'une teneur en chlorures trop elevee dans l'eau de chaudiere ?",opts:["Aucune consequence notable","Corrosion par piqures et fissuration sous contrainte (SCC), notamment via une infiltration d'eau de mer","Une amelioration de la conductivite thermique","Une reduction du besoin de purge"],correct:1,exp:"Les chlorures detruisent la couche passivante de l'acier inox, causant des piqures profondes et une fissuration sous contrainte (SCC). Source principale : infiltration d'eau de mer. Au-dela de 5 mg/l, arret et nettoyage chimique imposes."},
      {q:"Quelle est la difference entre le sulfite de sodium et l'hydrazine comme desoxygenants chimiques ?",opts:["Ce sont deux noms pour le meme produit","Le sulfite convient aux basses/moyennes pressions mais augmente la conductivite ; l'hydrazine convient aux hautes pressions sans laisser de residus solides mais est toxique","L'hydrazine n'a aucun usage sur les chaudieres marines","Le sulfite de sodium est toujours interdit a bord"],correct:1,exp:"Le sulfite de sodium (Na2SO3) reagit avec l'O2 en produisant des sulfates qui augmentent la conductivite, adapte aux basses/moyennes pressions. L'hydrazine, plus efficace a haute pression et sans residu solide, est toxique et necessite des precautions de manipulation strictes."},
      {q:"A quelle frequence doit-on analyser l'eau d'une chaudiere marine en exploitation normale ?",opts:["Une seule fois par an suffit","Quotidiennement pour les parametres cles (pH, conductivite, chlorures), avec des analyses completes hebdomadaires","Uniquement apres un arret complet de la chaudiere","Il n'existe aucune frequence recommandee"],correct:1,exp:"Les parametres cles (pH, conductivite, chlorures) doivent etre verifies quotidiennement en exploitation normale, avec des analyses plus completes (durete, phosphates, desoxygenant residuel) sur une base hebdomadaire."},
      {q:"Quelles sont les consequences a long terme d'un traitement chimique insuffisant de l'eau de chaudiere ?",opts:["Aucune consequence si la chaudiere est neuve","Entartrage generalise, corrosion progressive, defaillances de tubes et reduction significative de la duree de vie de la chaudiere","Une simple augmentation temporaire de la pression","Une amelioration du rendement thermique"],correct:1,exp:"Un traitement chimique insuffisant sur la duree entraine un entartrage generalise et une corrosion progressive des surfaces internes, pouvant conduire a des defaillances de tubes et reduire significativement la duree de vie de la chaudiere."},
    ],
    en:[
      {q:"Why must boiler feed water have zero hardness?",opts:["To improve steam taste","Dissolved calcium and magnesium precipitate as insulating scale on hot tubes, reducing heat exchange and risking failure","Hardness has no effect on a boiler","To reduce water treatment cost"],correct:1,exp:"Calcium and magnesium ions precipitate at high temperature as scale (carbonates/sulphates), 50 times less conductive than steel. 1mm scale = 3-5% efficiency loss; 3mm = tube failure risk. A softener reduces hardness to 0."},
      {q:"How is oxygen corrosion prevented in a boiler?",opts:["By adding more seawater","By thermal deaerator (heats water to 100 degC) and chemical scavengers (sodium sulphite, hydrazine)","By increasing boiler pressure","Dissolved oxygen is not corrosive"],correct:1,exp:"Dissolved oxygen reacts with iron at high temperature, causing deep pitting within hours or days. Prevention: thermal deaerator (zero O2 solubility at 100 degC) and chemical scavengers, target < 0.02 mg/l O2."},
      {q:"What is the role of trisodium phosphate (Na3PO4) in boiler water treatment?",opts:["It only serves as a colourant","It alkalises the water, precipitates calcium as non-adherent sludge and promotes the protective magnetite layer","It only removes chlorides","It has no chemical role, only aesthetic"],correct:1,exp:"Na3PO4 maintains pH at 10.5-11.5 (buffer effect), precipitates calcium as calcium phosphate (sludge removed by bottom blow-down rather than hard scale), and contributes to passivation via magnetite (Fe3O4)."},
      {q:"What is the difference between surface and bottom blow-down?",opts:["They are identical, only the name differs","Surface blow-down removes foam and surface salts, bottom blow-down removes sludge accumulated at the bottom of the drum","Bottom blow-down is only done at full shutdown","Surface blow-down is more vigorous than bottom blow-down"],correct:1,exp:"Surface blow-down (valve at top of drum) removes foam and concentrated surface salts, daily. Bottom blow-down (valve at bottom) removes heavy accumulated sludge, shorter and more vigorous, weekly."},
      {q:"What signs indicate a lack of oxygen scavenger in a boiler?",opts:["Excessively high steam pressure","Characteristic pitting on tubes, brown/red water and O2 above 0.05 mg/l","Only a low water level","No visible sign before failure"],correct:1,exp:"A lack of oxygen scavenger shows as O2 > 0.05 mg/l in feed water, characteristic deep pitting on inspection, and brown/red boiler water (rust in suspension)."},
      {q:"Why is boiler water electrical conductivity monitored?",opts:["To measure water temperature","It indicates dissolved salt concentration; excessive conductivity increases foaming and carry-over risk","It only measures pH","It has no practical use"],correct:1,exp:"Conductivity measures overall dissolved salt concentration. An excessive value (target < 1000 uS/cm) promotes foaming and water carry-over into steam, requiring bottom and surface blow-down."},
      {q:"How is boiler water oil contamination recognised?",opts:["Only by a pressure increase","Persistent surface foam, iridescent film, high total organic carbon (TOC) and brown-black deposits","By a drop in steam temperature","There is no way to detect it"],correct:1,exp:"Oil contamination shows as persistent foam on the drum surface, a visible iridescent film, high TOC, and brown-black deposits on walls causing hot spots."},
      {q:"What is priming (steam carry-over) and what are its main causes?",opts:["A phenomenon with no consequence on the boiler","Water droplets carried with steam, caused by too high a level, foaming or too rapid a load increase","A seawater leak into the drum only","A burner fault"],correct:1,exp:"Priming carries liquid water droplets with the steam, caused by an excessive level, foaming (high conductivity) or too abrupt a load increase. Consequences: water slug, salt deposits, corrosion."},
      {q:"What is the correct procedure for sampling boiler water for analysis?",opts:["Sample directly without purging the valve","Purge the valve 1-2 minutes, sample into a clean flask, cool immediately and analyse quickly","Wait 24h before analysing the sample","Sample only when the boiler is shut down"],correct:1,exp:"The sampling valve must be purged 1-2 minutes, sample taken into a clean flask, cooled immediately (oxygen escapes and pH changes with temperature) and analysed quickly for a reliable result."},
      {q:"What immediate action should be taken if boiler water pH reads 8.0 (instead of the normal 10.5-11.5)?",opts:["Do nothing, it is a normal variation","Confirm with a second test, notify the chief engineer and immediately increase the alkaliser dose","Heavily blow down the boiler to dilute","Permanently shut down the boiler without investigating"],correct:1,exp:"A pH of 8.0 is an emergency (normal 10.5-11.5). Confirm with a second test, notify the chief engineer, increase the alkaliser dose, and find the cause (acid water ingress, excessive consumption)."},
      {q:"How does an ion exchange resin water softener work?",opts:["It only filters solid particles","The resin captures calcium and magnesium ions and exchanges them for sodium ions; it is regenerated with NaCl brine","It heats water to eliminate hardness","It adds chlorine to disinfect the water"],correct:1,exp:"The resin exchanges Ca2+ and Mg2+ ions (hardness) for Na+ ions. Once saturated, it is regenerated with a concentrated NaCl solution (brine) that displaces calcium/magnesium, drained to waste."},
      {q:"What are the consequences of excessive chloride content in boiler water?",opts:["No notable consequence","Pitting corrosion and stress corrosion cracking (SCC), notably via seawater ingress","Improved thermal conductivity","Reduced need for blow-down"],correct:1,exp:"Chlorides destroy the passive layer on stainless steel, causing deep pitting and stress corrosion cracking (SCC). Main source: seawater ingress. Above 5 mg/l, shutdown and chemical cleaning are required."},
      {q:"What is the difference between sodium sulphite and hydrazine as chemical oxygen scavengers?",opts:["They are two names for the same product","Sulphite suits low/medium pressures but increases conductivity; hydrazine suits high pressures without leaving solid residue but is toxic","Hydrazine has no use on marine boilers","Sodium sulphite is always prohibited on board"],correct:1,exp:"Sodium sulphite (Na2SO3) reacts with O2 producing sulphates that increase conductivity, suited to low/medium pressures. Hydrazine, more effective at high pressure and leaving no solid residue, is toxic and requires strict handling precautions."},
      {q:"How often should boiler water be analysed under normal operation?",opts:["Once a year is enough","Daily for key parameters (pH, conductivity, chlorides), with full analyses weekly","Only after a complete boiler shutdown","There is no recommended frequency"],correct:1,exp:"Key parameters (pH, conductivity, chlorides) must be checked daily under normal operation, with more complete analyses (hardness, phosphates, residual scavenger) on a weekly basis."},
      {q:"What are the long-term consequences of insufficient boiler water chemical treatment?",opts:["No consequence if the boiler is new","Generalised scaling, progressive corrosion, tube failures and significantly reduced boiler lifespan","A simple temporary pressure increase","Improved thermal efficiency"],correct:1,exp:"Insufficient chemical treatment over time causes generalised scaling and progressive corrosion of internal surfaces, potentially leading to tube failures and significantly reducing the boiler's lifespan."},
    ],
    es:[
      {q:"¿Por que el agua de alimentacion de caldera debe tener dureza nula?",opts:["Para mejorar el sabor del vapor","El calcio y magnesio disueltos precipitan como incrustacion aislante en los tubos calientes, reduciendo el intercambio de calor y arriesgando la rotura","La dureza no tiene efecto en una caldera","Para reducir el coste del tratamiento de agua"],correct:1,exp:"Los iones calcio y magnesio precipitan a alta temperatura como incrustacion (carbonatos/sulfatos), 50 veces menos conductora que el acero. 1mm de incrustacion = perdida del 3-5% de eficiencia; 3mm = riesgo de rotura de tubo."},
      {q:"¿Como se previene la corrosion por oxigeno en una caldera?",opts:["Anadiendo mas agua de mar","Mediante desaireador termico (calienta el agua a 100 degC) y secuestrantes quimicos (sulfito sodico, hidrazina)","Aumentando la presion de la caldera","El oxigeno disuelto no es corrosivo"],correct:1,exp:"El oxigeno disuelto reacciona con el hierro a alta temperatura, causando picaduras profundas en horas o dias. Prevencion: desaireador termico (solubilidad de O2 nula a 100 degC) y secuestrantes quimicos, objetivo < 0,02 mg/l de O2."},
      {q:"¿Cual es el papel del fosfato trisodico (Na3PO4) en el tratamiento del agua de caldera?",opts:["Solo sirve como colorante","Alcaliniza el agua, precipita el calcio en lodo no adherente y favorece la capa protectora de magnetita","Solo elimina los cloruros","No tiene ningun papel quimico, solo estetico"],correct:1,exp:"El Na3PO4 mantiene el pH en 10,5-11,5 (efecto tampon), precipita el calcio como fosfato de calcio (lodo eliminado por purga de fondo en vez de incrustacion dura), y contribuye a la pasivacion mediante magnetita (Fe3O4)."},
      {q:"¿Cual es la diferencia entre una purga de superficie y una purga de fondo?",opts:["Son identicas, solo cambia el nombre","La purga de superficie elimina espuma y sales en superficie, la de fondo elimina lodos acumulados en el fondo del balon","La purga de fondo solo se hace con parada total","La purga de superficie es mas violenta que la de fondo"],correct:1,exp:"La purga de superficie (valvula arriba del balon) elimina espuma y sales concentradas en superficie, diariamente. La purga de fondo (valvula abajo) elimina lodos pesados acumulados, mas corta y violenta, semanal."},
      {q:"¿Que senales indican una falta de secuestrante de oxigeno en una caldera?",opts:["Una presion de vapor demasiado alta","Picaduras caracteristicas en los tubos, agua marron/rojiza y O2 superior a 0,05 mg/l","Solo un nivel de agua demasiado bajo","Ninguna senal visible antes de la rotura"],correct:1,exp:"Una falta de secuestrante de oxigeno se manifiesta con O2 > 0,05 mg/l en el agua de alimentacion, picaduras profundas caracteristicas en la inspeccion, y agua de caldera marron/rojiza (oxido en suspension)."},
      {q:"¿Por que se vigila la conductividad electrica del agua de caldera?",opts:["Para medir la temperatura del agua","Indica la concentracion de sales disueltas; una conductividad excesiva aumenta el riesgo de espumado y arrastre","Solo mide el pH","No tiene ninguna utilidad practica"],correct:1,exp:"La conductividad mide la concentracion global de sales disueltas. Un valor excesivo (objetivo < 1000 uS/cm) favorece el espumado y el arrastre de agua (carry-over) en el vapor, exigiendo purga de fondo y superficie."},
      {q:"¿Como se reconoce una contaminacion del agua de caldera por aceites?",opts:["Solo por un aumento de presion","Espuma persistente en superficie, pelicula irisada, carbono organico total (COT) elevado y depositos marron-negro","Por una caida de la temperatura del vapor","No existe forma de detectarlo"],correct:1,exp:"La contaminacion por aceite se detecta por espuma persistente en la superficie del balon, una pelicula irisada visible, un COT elevado, y depositos marron-negro en las paredes causando puntos calientes."},
      {q:"¿Que es el priming (arrastre de vapor) y cuales son sus causas principales?",opts:["Un fenomeno sin consecuencia en la caldera","Gotas de agua arrastradas con el vapor, causadas por un nivel demasiado alto, espumado o subida de carga demasiado rapida","Solo una fuga de agua de mar en el balon","Un fallo del quemador"],correct:1,exp:"El priming arrastra gotas de agua liquida con el vapor, causado por un nivel excesivo, espumado (conductividad alta) o una subida de carga demasiado brusca. Consecuencias: golpes de agua, depositos de sales, corrosion."},
      {q:"¿Cual es el procedimiento correcto para tomar una muestra de agua de caldera para analisis?",opts:["Tomar la muestra directamente sin purgar la valvula","Purgar la valvula 1-2 minutos, tomar la muestra en un frasco limpio, enfriar de inmediato y analizar rapidamente","Esperar 24h antes de analizar la muestra","Tomar la muestra solo con la caldera parada"],correct:1,exp:"Hay que purgar la valvula de muestreo 1-2 minutos, tomar la muestra en un frasco limpio, enfriar de inmediato (el oxigeno escapa y el pH cambia con la temperatura) y analizar rapidamente para un resultado fiable."},
      {q:"¿Que accion inmediata tomar si el pH del agua de caldera marca 8,0 (en vez del 10,5-11,5 normal)?",opts:["No hacer nada, es una variacion normal","Confirmar con una segunda prueba, avisar al jefe de maquinas y aumentar de inmediato la dosis de alcalinizante","Purgar fuertemente la caldera para diluir","Parar definitivamente la caldera sin investigar"],correct:1,exp:"Un pH de 8,0 es una emergencia (normal 10,5-11,5). Hay que confirmar con una segunda prueba, avisar al jefe de maquinas, aumentar la dosis de alcalinizante, y buscar la causa (entrada de agua acida, consumo excesivo)."},
      {q:"¿Como funciona un ablandador de agua de resina de intercambio ionico?",opts:["Solo filtra particulas solidas","La resina captura los iones calcio y magnesio y los intercambia por iones sodio; se regenera con salmuera de NaCl","Calienta el agua para eliminar la dureza","Anade cloro para desinfectar el agua"],correct:1,exp:"La resina intercambia los iones Ca2+ y Mg2+ (dureza) por iones Na+. Una vez saturada, se regenera con una solucion concentrada de NaCl (salmuera) que desplaza el calcio/magnesio, evacuados al desague."},
      {q:"¿Cuales son las consecuencias de un contenido excesivo de cloruros en el agua de caldera?",opts:["Ninguna consecuencia notable","Corrosion por picaduras y fisuracion bajo tension (SCC), notablemente por infiltracion de agua de mar","Una mejora de la conductividad termica","Una reduccion de la necesidad de purga"],correct:1,exp:"Los cloruros destruyen la capa pasiva del acero inoxidable, causando picaduras profundas y fisuracion bajo tension (SCC). Fuente principal: infiltracion de agua de mar. Por encima de 5 mg/l, se exige parada y limpieza quimica."},
      {q:"¿Cual es la diferencia entre el sulfito de sodio y la hidrazina como secuestrantes quimicos de oxigeno?",opts:["Son dos nombres para el mismo producto","El sulfito sirve para presiones bajas/medias pero aumenta la conductividad; la hidrazina sirve para altas presiones sin dejar residuo solido pero es toxica","La hidrazina no tiene ningun uso en calderas marinas","El sulfito de sodio siempre esta prohibido a bordo"],correct:1,exp:"El sulfito de sodio (Na2SO3) reacciona con el O2 produciendo sulfatos que aumentan la conductividad, adecuado para presiones bajas/medias. La hidrazina, mas eficaz a alta presion y sin residuo solido, es toxica y requiere precauciones estrictas de manipulacion."},
      {q:"¿Con que frecuencia debe analizarse el agua de una caldera marina en explotacion normal?",opts:["Basta con una vez al ano","Diariamente para los parametros clave (pH, conductividad, cloruros), con analisis completos semanales","Solo tras una parada completa de la caldera","No existe ninguna frecuencia recomendada"],correct:1,exp:"Los parametros clave (pH, conductividad, cloruros) deben verificarse diariamente en explotacion normal, con analisis mas completos (dureza, fosfatos, secuestrante residual) semanalmente."},
      {q:"¿Cuales son las consecuencias a largo plazo de un tratamiento quimico insuficiente del agua de caldera?",opts:["Ninguna consecuencia si la caldera es nueva","Incrustacion generalizada, corrosion progresiva, fallos de tubos y reduccion significativa de la vida util de la caldera","Un simple aumento temporal de la presion","Una mejora del rendimiento termico"],correct:1,exp:"Un tratamiento quimico insuficiente a lo largo del tiempo provoca incrustacion generalizada y corrosion progresiva de las superficies internas, pudiendo causar fallos de tubos y reducir significativamente la vida util de la caldera."},
    ],
    pt:[
      {q:"Por que a agua de alimentacao de caldeira deve ter dureza nula?",opts:["Para melhorar o sabor do vapor","O calcio e magnesio dissolvidos precipitam como incrustacao isolante nos tubos quentes, reduzindo a troca de calor e arriscando a rutura","A dureza nao tem efeito numa caldeira","Para reduzir o custo do tratamento de agua"],correct:1,exp:"Os ioes calcio e magnesio precipitam a alta temperatura como incrustacao (carbonatos/sulfatos), 50 vezes menos condutora que o aco. 1mm de incrustacao = perda de 3-5% de eficiencia; 3mm = risco de rutura de tubo."},
      {q:"Como se previne a corrosao por oxigenio numa caldeira?",opts:["Adicionando mais agua do mar","Por desaerador termico (aquece a agua a 100 degC) e sequestrantes quimicos (sulfito de sodio, hidrazina)","Aumentando a pressao da caldeira","O oxigenio dissolvido nao e corrosivo"],correct:1,exp:"O oxigenio dissolvido reage com o ferro a alta temperatura, causando picadas profundas em horas ou dias. Prevencao: desaerador termico (solubilidade de O2 nula a 100 degC) e sequestrantes quimicos, objetivo < 0,02 mg/l de O2."},
      {q:"Qual e o papel do fosfato trissodico (Na3PO4) no tratamento da agua de caldeira?",opts:["So serve como corante","Alcaliniza a agua, precipita o calcio em lama nao aderente e favorece a camada protetora de magnetite","So elimina os cloretos","Nao tem papel quimico, apenas estetico"],correct:1,exp:"O Na3PO4 mantem o pH em 10,5-11,5 (efeito tampao), precipita o calcio como fosfato de calcio (lama eliminada por purga de fundo em vez de incrustacao dura), e contribui para a passivacao via magnetite (Fe3O4)."},
      {q:"Qual e a diferenca entre uma purga de superficie e uma purga de fundo?",opts:["Sao identicas, so muda o nome","A purga de superficie elimina espuma e sais em superficie, a de fundo elimina lamas acumuladas no fundo do balao","A purga de fundo so se faz com paragem total","A purga de superficie e mais violenta que a de fundo"],correct:1,exp:"A purga de superficie (valvula no topo do balao) elimina espuma e sais concentrados em superficie, diariamente. A purga de fundo (valvula em baixo) elimina lamas pesadas acumuladas, mais curta e violenta, semanal."},
      {q:"Que sinais indicam falta de sequestrante de oxigenio numa caldeira?",opts:["Uma pressao de vapor demasiado alta","Picadas caracteristicas nos tubos, agua castanha/avermelhada e O2 superior a 0,05 mg/l","Apenas um nivel de agua demasiado baixo","Nenhum sinal visivel antes da rutura"],correct:1,exp:"Uma falta de sequestrante de oxigenio manifesta-se com O2 > 0,05 mg/l na agua de alimentacao, picadas profundas caracteristicas na inspecao, e agua de caldeira castanha/avermelhada (ferrugem em suspensao)."},
      {q:"Por que se monitoriza a condutividade eletrica da agua de caldeira?",opts:["Para medir a temperatura da agua","Indica a concentracao de sais dissolvidos; uma condutividade excessiva aumenta o risco de espuma e arrastamento","So mede o pH","Nao tem nenhuma utilidade pratica"],correct:1,exp:"A condutividade mede a concentracao global de sais dissolvidos. Um valor excessivo (objetivo < 1000 uS/cm) favorece a formacao de espuma e o arrastamento de agua (carry-over) no vapor, exigindo purga de fundo e superficie."},
      {q:"Como se reconhece uma contaminacao da agua de caldeira por oleos?",opts:["Apenas por um aumento de pressao","Espuma persistente em superficie, pelicula irisada, carbono organico total (COT) elevado e depositos castanho-preto","Por uma queda da temperatura do vapor","Nao existe forma de detetar"],correct:1,exp:"A contaminacao por oleo deteta-se por espuma persistente na superficie do balao, uma pelicula irisada visivel, um COT elevado, e depositos castanho-preto nas paredes causando pontos quentes."},
      {q:"O que e o priming (arrastamento de vapor) e quais sao as suas causas principais?",opts:["Um fenomeno sem consequencia na caldeira","Goticulas de agua arrastadas com o vapor, causadas por um nivel demasiado alto, espuma ou subida de carga demasiado rapida","Apenas uma fuga de agua do mar no balao","Uma falha do queimador"],correct:1,exp:"O priming arrasta goticulas de agua liquida com o vapor, causado por um nivel excessivo, espuma (condutividade alta) ou uma subida de carga demasiado brusca. Consequencias: golpes de agua, depositos de sais, corrosao."},
      {q:"Qual e o procedimento correto para colher uma amostra de agua de caldeira para analise?",opts:["Colher diretamente sem purgar a valvula","Purgar a valvula 1-2 minutos, colher numa garrafa limpa, arrefecer de imediato e analisar rapidamente","Esperar 24h antes de analisar a amostra","Colher apenas com a caldeira parada"],correct:1,exp:"E preciso purgar a valvula de amostragem 1-2 minutos, colher numa garrafa limpa, arrefecer de imediato (o oxigenio escapa e o pH muda com a temperatura) e analisar rapidamente para um resultado fiavel."},
      {q:"Que acao imediata tomar se o pH da agua de caldeira marcar 8,0 (em vez do 10,5-11,5 normal)?",opts:["Nao fazer nada, e uma variacao normal","Confirmar com um segundo teste, avisar o chefe de maquinas e aumentar de imediato a dose de alcalinizante","Purgar fortemente a caldeira para diluir","Parar definitivamente a caldeira sem investigar"],correct:1,exp:"Um pH de 8,0 e uma emergencia (normal 10,5-11,5). E preciso confirmar com um segundo teste, avisar o chefe de maquinas, aumentar a dose de alcalinizante, e procurar a causa (entrada de agua acida, consumo excessivo)."},
      {q:"Como funciona um amaciador de agua de resina de troca ionica?",opts:["So filtra particulas solidas","A resina captura os ioes calcio e magnesio e troca-os por ioes sodio; e regenerada com salmoura de NaCl","Aquece a agua para eliminar a dureza","Adiciona cloro para desinfetar a agua"],correct:1,exp:"A resina troca os ioes Ca2+ e Mg2+ (dureza) por ioes Na+. Uma vez saturada, e regenerada com uma solucao concentrada de NaCl (salmoura) que desloca o calcio/magnesio, evacuados para o esgoto."},
      {q:"Quais sao as consequencias de um teor excessivo de cloretos na agua de caldeira?",opts:["Nenhuma consequencia notavel","Corrosao por picadas e fissuracao sob tensao (SCC), notavelmente via infiltracao de agua do mar","Uma melhoria da condutividade termica","Uma reducao da necessidade de purga"],correct:1,exp:"Os cloretos destroem a camada passiva do aco inoxidavel, causando picadas profundas e fissuracao sob tensao (SCC). Fonte principal: infiltracao de agua do mar. Acima de 5 mg/l, exige-se paragem e limpeza quimica."},
      {q:"Qual e a diferenca entre o sulfito de sodio e a hidrazina como sequestrantes quimicos de oxigenio?",opts:["Sao dois nomes para o mesmo produto","O sulfito serve para pressoes baixas/medias mas aumenta a condutividade; a hidrazina serve para altas pressoes sem deixar residuo solido mas e toxica","A hidrazina nao tem nenhum uso em caldeiras marinhas","O sulfito de sodio esta sempre proibido a bordo"],correct:1,exp:"O sulfito de sodio (Na2SO3) reage com o O2 produzindo sulfatos que aumentam a condutividade, adequado para pressoes baixas/medias. A hidrazina, mais eficaz a alta pressao e sem residuo solido, e toxica e requer precaucoes rigorosas de manuseamento."},
      {q:"Com que frequencia deve ser analisada a agua de uma caldeira marinha em exploracao normal?",opts:["Basta uma vez por ano","Diariamente para os parametros chave (pH, condutividade, cloretos), com analises completas semanais","So apos uma paragem completa da caldeira","Nao existe nenhuma frequencia recomendada"],correct:1,exp:"Os parametros chave (pH, condutividade, cloretos) devem ser verificados diariamente em exploracao normal, com analises mais completas (dureza, fosfatos, sequestrante residual) semanalmente."},
      {q:"Quais sao as consequencias a longo prazo de um tratamento quimico insuficiente da agua de caldeira?",opts:["Nenhuma consequencia se a caldeira for nova","Incrustacao generalizada, corrosao progressiva, falhas de tubos e reducao significativa da vida util da caldeira","Um simples aumento temporario da pressao","Uma melhoria do rendimento termico"],correct:1,exp:"Um tratamento quimico insuficiente ao longo do tempo provoca incrustacao generalizada e corrosao progressiva das superficies internas, podendo causar falhas de tubos e reduzir significativamente a vida util da caldeira."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"Quel est le pH cible de l'eau d'une chaudière marine auxiliaire ?",opts:["6,5-7,5 (neutre)","8,5-9,5","10,5-11,5","12,5-13,5"],correct:2,exp:"Le pH cible de l'eau de chaudière est 10,5-11,5. À ce pH, une couche protectrice de magnétite (Fe3O4) se forme sur les surfaces métalliques. En dessous de 8,5 : corrosion acide (urgence). Au-dessus de 12 : corrosion caustique. La plage 10,5-11,5 est la zone de passivation de l'acier."},
      {q:"Quel produit chimique est utilisé pour éliminer l'oxygène dissous dans l'eau de chaudière ?",opts:["Carbonate de sodium (Na2CO3)","Sulfite de sodium (Na2SO3) ou désoxygénant","Acide chlorhydrique (HCl)","Chlore (Cl2)"],correct:1,exp:"Le sulfite de sodium (Na2SO3) ou les désoxygénants (hydrazine, DEHA) éliminent l'oxygène dissous par réaction chimique : 2Na2SO3 + O2 → 2Na2SO4. L'objectif est < 0,02 mg/l d'O2 dans l'eau d'alimentation. L'O2 dissous provoque des piqûres de corrosion profondes et rapides."},
      {q:"Pourquoi doit-on purger régulièrement une chaudière (blow-down) ?",opts:["Pour refroidir l'eau de chaudière","Pour éliminer les sels concentrés, boues et éviter le moussage","Pour augmenter la pression de vapeur","Pour vérifier le niveau d'eau"],correct:1,exp:"La purge (blow-down) est nécessaire pour éliminer les sels dissous qui se concentrent progressivement dans l'eau de chaudière (évaporation continue), les boues et sédiments qui s'accumulent au fond, et réduire la conductivité pour éviter le moussage et l'entraînement d'eau dans la vapeur."},
      {q:"Qu'indique une conductivité élevée dans l'eau de chaudière ?",opts:["L'eau est trop froide","La concentration en sels dissous est trop élevée → risque de moussage","Le pH est trop élevé","L'eau manque d'oxygène"],correct:1,exp:"Une conductivité élevée (> 1000 μS/cm) indique une concentration trop élevée en sels dissous dans l'eau. Cela favorise le moussage (foam) et l'entraînement de gouttelettes d'eau avec la vapeur (carry-over). La solution est d'effectuer une purge de fond et de surface pour diluer l'eau et réduire la conductivité."},
      {q:"Quelle est la principale conséquence de l'entartrage (scale) des tubes de chaudière ?",opts:["L'eau devient acide","La conductivité augmente","Le transfert de chaleur est réduit → surchauffe des tubes → risque d'explosion","La vapeur devient humide"],correct:2,exp:"Le tartre est 50x moins conducteur thermique que l'acier. 1 mm de tartre provoque 3-5% de perte d'efficacité. 3 mm de tartre → les tubes ne peuvent plus évacuer la chaleur correctement → surchauffe → déformation → risque d'explosion (BLEVE). C'est pourquoi la dureté de l'eau doit être nulle."},
    ],
    en:[
      {q:"What is the target pH for marine auxiliary boiler water?",opts:["6.5-7.5 (neutral)","8.5-9.5","10.5-11.5","12.5-13.5"],correct:2,exp:"Target boiler water pH is 10.5-11.5. At this pH, a protective magnetite (Fe3O4) layer forms on metal surfaces. Below 8.5: acid corrosion (emergency). Above 12: caustic corrosion. The 10.5-11.5 range is the steel passivation zone."},
      {q:"What chemical is used to remove dissolved oxygen from boiler water?",opts:["Sodium carbonate (Na2CO3)","Sodium sulphite (Na2SO3) or oxygen scavenger","Hydrochloric acid (HCl)","Chlorine (Cl2)"],correct:1,exp:"Sodium sulphite (Na2SO3) or oxygen scavengers (hydrazine, DEHA) remove dissolved oxygen by chemical reaction: 2Na2SO3 + O2 → 2Na2SO4. Target: < 0.02 mg/l O2 in feed water. Dissolved O2 causes deep, rapid pitting corrosion."},
      {q:"Why must a boiler be regularly blown down?",opts:["To cool boiler water","To remove concentrated salts, sludge and prevent foaming","To increase steam pressure","To check water level"],correct:1,exp:"Blow-down is necessary to remove dissolved salts progressively concentrating in boiler water (continuous evaporation), accumulated bottom sludge and sediment, and reduce conductivity to prevent foaming and water entrainment in steam."},
      {q:"What does high conductivity in boiler water indicate?",opts:["Water is too cold","Dissolved salt concentration too high → foaming risk","pH is too high","Water lacks oxygen"],correct:1,exp:"High conductivity (> 1000 μS/cm) indicates dissolved salt concentration too high. This promotes foaming and water droplet entrainment in steam (carry-over). Solution: bottom and surface blow-down to dilute water and reduce conductivity."},
      {q:"What is the main consequence of boiler tube scaling?",opts:["Water becomes acidic","Conductivity increases","Heat transfer reduced → tube overheating → explosion risk","Steam becomes wet"],correct:2,exp:"Scale is 50x less thermally conductive than steel. 1 mm scale causes 3-5% efficiency loss. 3 mm scale → tubes cannot dissipate heat correctly → overheating → deformation → explosion risk (BLEVE). This is why water hardness must be zero."},
    ],
    es:[
      {q:"¿Cuál es el pH objetivo del agua de una caldera auxiliar marina?",opts:["6,5-7,5 (neutro)","8,5-9,5","10,5-11,5","12,5-13,5"],correct:2,exp:"El pH objetivo es 10,5-11,5. A este pH se forma una capa protectora de magnetita. Por debajo de 8,5: corrosión ácida (urgencia). Por encima de 12: corrosión cáustica."},
      {q:"¿Qué producto elimina el oxígeno disuelto del agua de caldera?",opts:["Carbonato sódico (Na2CO3)","Sulfito sódico (Na2SO3) o desoxigenante","Ácido clorhídrico (HCl)","Cloro (Cl2)"],correct:1,exp:"El sulfito sódico (Na2SO3) o los desoxigenantes eliminan el O2 disuelto por reacción química. Objetivo: < 0,02 mg/l O2. El O2 disuelto provoca picaduras de corrosión profundas y rápidas."},
      {q:"¿Por qué hay que purgar regularmente una caldera (blow-down)?",opts:["Para enfriar el agua","Para eliminar sales concentradas, lodos y evitar espumeo","Para aumentar la presión de vapor","Para verificar el nivel de agua"],correct:1,exp:"La purga elimina sales disueltas que se concentran progresivamente, lodos acumulados en el fondo, y reduce la conductividad para evitar espumeo y arrastre de agua en el vapor."},
      {q:"¿Qué indica una conductividad alta en el agua de caldera?",opts:["El agua está demasiado fría","Concentración de sales disueltas demasiado alta → riesgo de espumeo","El pH es demasiado alto","El agua carece de oxígeno"],correct:1,exp:"Alta conductividad (> 1000 μS/cm) = concentración excesiva de sales → espumeo y arrastre (carry-over). Solución: purga de fondo y superficie."},
      {q:"¿Cuál es la principal consecuencia de las incrustaciones en los tubos de caldera?",opts:["El agua se vuelve ácida","La conductividad aumenta","El intercambio de calor disminuye → sobrecalentamiento → riesgo de explosión","El vapor se humedece"],correct:2,exp:"Las incrustaciones son 50x menos conductoras que el acero. 1 mm = 3-5% pérdida. 3 mm = riesgo de rotura de tubo (BLEVE). Por eso la dureza debe ser nula."},
    ],
    pt:[
      {q:"Qual é o pH objetivo da água de uma caldeira auxiliar marinha?",opts:["6,5-7,5 (neutro)","8,5-9,5","10,5-11,5","12,5-13,5"],correct:2,exp:"O pH objetivo é 10,5-11,5. A este pH forma-se uma camada protetora de magnetite. Abaixo de 8,5: corrosão ácida (urgência). Acima de 12: corrosão cáustica."},
      {q:"Que produto elimina o oxigénio dissolvido da água de caldeira?",opts:["Carbonato de sódio (Na2CO3)","Sulfito de sódio (Na2SO3) ou desoxigenante","Ácido clorídrico (HCl)","Cloro (Cl2)"],correct:1,exp:"O sulfito de sódio (Na2SO3) ou os desoxigenantes eliminam O2 dissolvido por reação química. Objetivo: < 0,02 mg/l O2. O O2 dissolvido provoca picadas de corrosão profundas e rápidas."},
      {q:"Por que se deve purgar regularmente uma caldeira (blow-down)?",opts:["Para arrefecer a água","Para eliminar sais concentrados, lamas e evitar espumação","Para aumentar a pressão de vapor","Para verificar o nível de água"],correct:1,exp:"A purga elimina sais dissolvidos que se concentram progressivamente, lamas acumuladas no fundo, e reduz a condutividade para evitar espumação e arrastamento no vapor."},
      {q:"O que indica alta condutividade na água de caldeira?",opts:["A água está demasiado fria","Concentração de sais dissolvidos demasiado alta → risco de espumação","O pH é demasiado alto","A água carece de oxigénio"],correct:1,exp:"Alta condutividade (> 1000 μS/cm) = concentração excessiva de sais → espumação e arrastamento. Solução: purga de fundo e superfície."},
      {q:"Qual é a principal consequência das incrustações nos tubos da caldeira?",opts:["A água torna-se ácida","A condutividade aumenta","A transferência de calor reduz → sobreaquecimento → risco de explosão","O vapor torna-se húmido"],correct:2,exp:"As incrustações são 50x menos condutoras que o aço. 1 mm = 3-5% perda. 3 mm = risco de rotura de tubo (BLEVE). Por isso a dureza deve ser nula."},
    ],
  };
  return q[lang]||q.fr;
}

function BankTab({ lang }: { lang: string }) {
  const bank=getBank(lang);
  const [shuffledBank]=useState(()=>bank.map(shuffleQuestionOptions));
  const [bankIdx,setBankIdx]=useState<number|null>(null);
  const [bankCur,setBankCur]=useState(0);
  const [bankSel,setBankSel]=useState<number|null>(null);
  const [bankScore,setBankScore]=useState(0);
  const [bankDone,setBankDone]=useState(false);
  const L:any={fr:{title:"Banque de questions",start:"COMMENCER =>",next:"SUIVANT =>",trophy:"TERMINER"},en:{title:"Question Bank",start:"START =>",next:"NEXT =>",trophy:"FINISH"},es:{title:"Banco de preguntas",start:"COMENZAR =>",next:"SIGUIENTE =>",trophy:"TERMINAR"},pt:{title:"Banco de questões",start:"COMEÇAR =>",next:"PRÓXIMO =>",trophy:"TERMINAR"}};
  const l=L[lang]||L.fr;
  const startBank=()=>{setBankIdx(0);setBankCur(0);setBankSel(null);setBankScore(0);setBankDone(false);};
  const pickBank=(i:number)=>{if(bankSel!==null)return;setBankSel(i);if(i===shuffledBank[bankCur].correct)setBankScore(s=>s+1);};
  const bankNext=()=>{if(bankCur+1>=bank.length){setBankDone(true);return;}setBankCur(c=>c+1);setBankSel(null);};
  return (
    <div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:"#c9922a",margin:"20px 0 14px"}}>📚 {l.title} (15)</div>
      {bankIdx===null&&!bankDone&&(
        <button onClick={startBank} style={{width:"100%",padding:"14px 0",borderRadius:12,background:`linear-gradient(135deg,#4da6ff,#c9922a)`,border:"none",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:2}}>{l.start}</button>
      )}
      {bankIdx!==null&&!bankDone&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:11,color:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>
            <span>Q{bankCur+1}/{bank.length}</span>
            <span style={{color:"#4da6ff"}}>✦ {bankScore}</span>
          </div>
          <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:12}}>
            <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,#4da6ff,#c9922a)`,width:`${(bankCur/bank.length)*100}%`,transition:"width 0.3s"}}/>
          </div>
          <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:12,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:`1px solid #4da6ff22`}}>{shuffledBank[bankCur].q}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
            {shuffledBank[bankCur].opts.map((opt:string,oi:number)=>{
              let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.12)",col="rgba(240,244,255,0.6)";
              if(bankSel!==null){
                if(oi===shuffledBank[bankCur].correct){bg="rgba(76,175,80,0.15)";bd="#4ade80";col="#4ade80";}
                else if(oi===bankSel){bg="rgba(239,68,68,0.15)";bd="#ef4444";col="#ef4444";}
              }
              return(<button key={oi} onClick={()=>pickBank(oi)} disabled={bankSel!==null} style={{textAlign:"left",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${bd}`,background:bg,color:col,fontSize:12,fontFamily:"Courier New",cursor:bankSel===null?"pointer":"default",lineHeight:1.4}}>{opt}</button>);
            })}
          </div>
          {bankSel!==null&&(
            <div>
              <div style={{padding:12,borderRadius:10,background:"rgba(13,31,60,0.8)",borderLeft:`3px solid ${bankSel===shuffledBank[bankCur].correct?"#4ade80":"#ef4444"}`,fontSize:12,color:"rgba(240,244,255,0.82)",lineHeight:1.7,fontFamily:"Courier New",marginBottom:10}}>{shuffledBank[bankCur].expl}</div>
              <button onClick={bankNext} style={{width:"100%",padding:"12px 0",borderRadius:12,background:`linear-gradient(135deg,#4da6ff,#c9922a)`,border:"none",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:2}}>{bankCur+1>=bank.length?l.trophy:l.next}</button>
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
  const [shuffled]=useState(()=>quiz.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [confirmed,setConfirmed]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const t=T[lang]||T.fr;
  const L:any={fr:{submit:"Valider",next:"Suivant →",finish:"Terminer",correct:"✅ Correct !",wrong:"❌ Incorrect",xpLabel:"XP obtenus",summary:"Tu as appris",retry:"Recommencer"},en:{submit:"Submit",next:"Next →",finish:"Finish",correct:"✅ Correct!",wrong:"❌ Incorrect",xpLabel:"XP earned",summary:"You learned",retry:"Retry"},es:{submit:"Validar",next:"Siguiente →",finish:"Terminar",correct:"✅ ¡Correcto!",wrong:"❌ Incorrecto",xpLabel:"XP obtenidos",summary:"Aprendiste",retry:"Reintentar"},pt:{submit:"Validar",next:"Seguinte →",finish:"Terminar",correct:"✅ Correto!",wrong:"❌ Incorreto",xpLabel:"XP obtidos",summary:"Você aprendeu",retry:"Recomeçar"}};
  const l=L[lang]||L.fr;
  const xp=score>=5?200:score>=4?160:score>=3?120:80;
  const optColors=["#4da6ff","#6dbf8a","#e8b94f","#c084fc"];

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:42,marginBottom:8}}>💧</div>
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
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#4da6ff,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>💧 {l.finish}</button>
      <button onClick={()=>{setCur(0);setSelected(null);setConfirmed(false);setScore(0);setDone(false);}} style={{width:"100%",padding:"12px 0",marginTop:8,border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,background:"none",color:"rgba(240,244,255,0.45)",fontSize:12,cursor:"pointer",fontFamily:"Courier New"}}>{l.retry}</button>
    </div>
  );

  const q=shuffled[cur];
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
        <div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#4da6ff,#c9922a)",width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:"1px solid rgba(77,166,255,0.15)"}}>{q.q}</div>
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
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?"linear-gradient(135deg,#4da6ff,#c9922a)":"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{l.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:"linear-gradient(135deg,#4da6ff,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?l.finish:l.next}</button>
      }
    </div>
  );
}

export default function LessonE3_L3({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [phase,setPhase]=useState<"content"|"quiz">("content");
  const [quizDone,setQuizDone]=useState(false);
  const progress=phase==="content"?50:quizDone?100:85;
  const backLabel=lang==="fr"?"◀ Retour":lang==="en"?"◀ Back":lang==="es"?"◀ Volver":"◀ Voltar";
  const moduleFull=lang==="fr"?"Module E3 — Chaudières":lang==="en"?"Module E3 — Boilers":lang==="es"?"Módulo E3 — Calderas":"Módulo E3 — Caldeiras";
  const lessonOf=lang==="fr"?"Leçon 3/6":lang==="en"?"Lesson 3/6":lang==="es"?"Lección 3/6":"Lição 3/6";
  const badgeText=lang==="fr"?`💧 ${moduleFull} · Leçon 3/6 · ⭐ Premium · 200 XP`:lang==="en"?`💧 ${moduleFull} · Lesson 3/6 · ⭐ Premium · 200 XP`:lang==="es"?`💧 ${moduleFull} · Lección 3/6 · ⭐ Premium · 200 XP`:`💧 ${moduleFull} · Lição 3/6 · ⭐ Premium · 200 XP`;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(77,166,255,0.22)"}}>
        <div style={{minHeight:54,display:"flex",alignItems:"center",padding:"8px 16px",gap:12}}>
          <button onClick={phase==="content"?onBack:()=>setPhase("content")} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>{backLabel}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:"#4da6ff",letterSpacing:1,fontFamily:"'Cinzel',serif"}}>💧 {moduleFull}</div>
            <div style={{fontSize:11,color:"rgba(240,244,255,0.45)"}}>{lessonOf}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:"1px solid rgba(201,146,42,0.44)",color:"#c9922a",fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:"#4da6ff",fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#4da6ff,#c9922a)",transition:"width 0.5s ease"}}/>
        </div>
      </div>
      {phase==="content"&&<div style={{padding:"20px 16px 0"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(77,166,255,0.15)",border:"1px solid rgba(77,166,255,0.44)",fontSize:11,color:"#4da6ff",fontWeight:700}}>{badgeText}</div>
          <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:"#f0f4ff",lineHeight:1.3,margin:"0 0 4px"}}>{t.lessonTitle}</h1>
        </div>
      </div>}
      <div>
        {phase==="content"&&<ContentPhase lang={lang} onStartQuiz={()=>setPhase("quiz")}/>}
        {phase==="quiz"&&<QuizTab lang={lang} onComplete={(xp)=>{setQuizDone(true);if(onComplete)onComplete(xp);}}/>}
      </div>
    </div>
  );
}
