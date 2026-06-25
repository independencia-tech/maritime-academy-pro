// LessonE3_L3 — Traitement de l'eau de chaudière | PART 1
import { useState } from "react";

const C = {
  water:"#4da6ff", chem:"#6dbf8a", scale:"#e8b94f",
  corr:"#f97316", safe:"#6dbf8a", danger:"#e74c3c",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  purple:"#c084fc",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE — CHAUDIÈRES",
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
      "Dureté nulle requise — l'eau dure forme du tartre calcaire sur les tubes",
      "L'oxygène dissous provoque une corrosion par piqûres — désoxygénation obligatoire",
      "La purge (blow-down) élimine les sels concentrés et la boue du fond",
      "Test chimique quotidien : pH, chlorures, conductivité, alcalinité",
    ],
    problems:{
      scaling:{ name:"Entartrage (Scale)", desc:"Les sels de calcium et magnésium dissous dans l'eau précipitent sous forme de carbonate et sulfate de calcium sur les parois chaudes des tubes. Le tartre est un très mauvais conducteur thermique (x50 fois moins que l'acier). 1 mm de tartre → 3-5% de perte d'efficacité. 3 mm de tartre → surchauffe des tubes → risque d'explosion. Prévention : eau adoucie (dureté = 0), traitement aux antitartres." },
      corrosion:{ name:"Corrosion", desc:"Deux types principaux : Corrosion par O₂ (oxygène dissous) : l'oxygène réagit avec le fer à haute température → piqûres profondes et rapides. Corrosion acide (pH bas) : un pH < 8 dissout l'oxyde protecteur de fer → attaque généralisée. Un pH > 12 peut aussi attaquer l'acier (corrosion caustique). Prévention : désoxygénation, maintien du pH 10,5-11,5, inhibiteurs de corrosion." },
      foaming:{ name:"Moussage (Priming/Foaming)", desc:"Formation de mousse à la surface de l'eau dans le ballon vapeur, provoquant l'entraînement de gouttelettes d'eau avec la vapeur. Causé par : contamination huile, excès de sels dissous (conductivité élevée), surfactants. Conséquences : coup d'eau dans les systèmes vapeur, dépôts dans les surchauffeurs et réchauffeurs. Remède : purge de fond, réduction de la charge, traitement anti-mousse." },
      carryover:{ name:"Entraînement (Carry-over)", desc:"Gouttelettes d'eau ou vapeur humide transportées dans les conduites de vapeur. Causes : niveau d'eau trop élevé, moussage, montée en charge trop rapide. Conséquences : coups d'eau dans les machines, corrosion et dépôts dans les tuyauteries. Prévention : maintien du niveau correct, montée en charge progressive, traitement antimoussant." },
    },
    chemicals:{
      oxygen_scav:{ name:"Désoxygénant (Oxygen Scavenger)", desc:"Élimine l'oxygène dissous par réaction chimique. Types : Sulfite de sodium (Na₂SO₃) : 2Na₂SO₃ + O₂ → 2Na₂SO₄. Économique, efficace jusqu'à 10 bar. Hydrazine (N₂H₄) : N₂H₄ + O₂ → N₂ + 2H₂O. Pour hautes pressions, mais toxique. DEHA/Carbohydrazide : alternatives modernes non toxiques. Dosage : suffisant pour maintenir un résiduel de 0,5-2 mg/l de produit dans l'eau." },
      alkalinity:{ name:"Alcalinisant (pH control)", desc:"Maintient le pH à 10,5-11,5 pour protéger l'acier. Produits : Hydroxyde de sodium (NaOH/soude caustique) : alcalinisant puissant. Phosphate trisodique (Na₃PO₄) : tampon pH + précipite les sels de calcium. Morpholine : traite simultanément la chaudière et les condensats. Dosage basé sur les mesures de pH et d'alcalinité." },
      antiscale:{ name:"Antitartre (Scale inhibitor)", desc:"Empêche la précipitation des sels calcaires ou disperse les cristaux formés. Types : Agents complexants (EDTA, NTA) : séquestrent les ions calcium et magnésium. Dispersants polymères : empêchent l'adhésion des cristaux aux parois. Phosphates : précipitent le calcium en boue (non-adhérente) plutôt qu'en tartre dur." },
      antifoam:{ name:"Antimoussant (Anti-foam)", desc:"Réduit la tension superficielle de l'eau pour empêcher la formation de mousse stable. Produits à base de silicone ou d'alcools gras. Dosage faible (quelques mg/l). Utilisé quand la conductivité est élevée ou en cas de contamination par huile." },
    },
    parameters:{
      ph:{ name:"pH", desc:"Cible : 10,5-11,5. < 8,5 : corrosion acide → urgence. 8,5-10,5 : insuffisant. 10,5-11,5 : correct. > 12 : risque de corrosion caustique. Mesure : colorimétrie ou pH-mètre. Fréquence : quotidienne. Action : ajuster la dose d'alcalinisant." },
      hardness:{ name:"Dureté (TH)", desc:"Cible : 0 (eau adoucie). La dureté mesure les ions Ca²⁺ et Mg²⁺. > 0,5° fr (5 mg/l CaCO₃) → risque d'entartrage. Vérifier l'adoucisseur et sa régénération. Mesure : titrimétrie EDTA. Si dureté non nulle → purge immédiate + investiguer source d'eau dure." },
      chlorides:{ name:"Chlorures (Cl⁻)", desc:"Cible : < 1 mg/l. Les chlorures sont corrosifs (corrosion par piqûres de l'acier inox, fissuration sous contrainte). Source : infiltration d'eau de mer, eau de condensat contaminée. > 2 mg/l → purge intensifiée. > 5 mg/l → arrêt et investigation." },
      conductivity:{ name:"Conductivité (μS/cm)", desc:"Cible : < 1000 μS/cm (voire < 500 selon type de chaudière). Indicateur global de la concentration en sels dissous. Si trop élevée → purge de fond. Corrélée au risque de moussage et d'entraînement. Mesure : conductimètre. Surveiller la tendance (augmentation = concentration en sels)." },
      oxygen:{ name:"Oxygène dissous (O₂)", desc:"Cible : < 0,02 mg/l (20 ppb). Mesuré dans l'eau d'alimentation APRÈS le déaérateur. Si > 0,05 mg/l → vérifier le déaérateur, augmenter le désoxygénant. Instrument : électrode ampérométrique ou kit colorimétrique." },
      alkalinity:{ name:"Alcalinité (M-alkalinity)", desc:"Cible : 100-500 mg/l CaCO₃ (selon pression). Indicateur de la capacité tampon du système. Faible → pH instable → risque de chute de pH. Trop élevée → moussage. Mesure : titrimétrie acide avec méthylorange ou phénolphtaléine." },
    },
    procedures:{
      sampling:{ name:"Prélèvement d'échantillon", desc:"Purger la vanne d'échantillonnage pendant 1-2 minutes avant de prélever (éliminer l'eau stagnante). Refroidir l'échantillon avant analyse (eau chaude = mesures faussées). Analyser immédiatement (O₂ surtout s'oxyde rapidement en contact avec l'air). Consigner heure, température et résultats dans le registre." },
      blowdown:{ name:"Purge de surface (Surface blow-down)", desc:"Élimine les matières en suspension et la mousse en surface du ballon. Ouvrir lentement la vanne de purge pendant 5-15 secondes. Réaliser quand la chaudière est en charge normale (pas à l'arrêt). Fréquence : quotidienne ou selon conductivité." },
      bottomblowdown:{ name:"Purge de fond (Bottom blow-down)", desc:"Élimine les boues et sédiments accumulés au fond du ballon. Plus courte et plus violente que la purge de surface. Réaliser à faible charge (moins de perte de vapeur). Fréquence : hebdomadaire. Attention : perte d'eau et d'énergie → consigner dans le registre." },
      dosing:{ name:"Dosage chimique", desc:"Injection en continu via pompe doseuse dans la tuyauterie d'alimentation. Concentration calculée selon le débit d'eau et les résultats d'analyse. Adapter la dose après chaque analyse. Certains produits peuvent être incompatibles → ne jamais mélanger directement. Consigner les doses dans le registre de traitement." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Expliquez les deux principaux problèmes causés par une mauvaise qualité de l'eau de chaudière et leurs conséquences.",
        a:"1. Entartrage (scale) : les sels de calcium et magnésium dissous précipitent sur les parois chaudes des tubes sous forme de tartre dur. Le tartre est 50x moins conducteur thermique que l'acier. 1 mm de tartre → 3-5% de perte d'efficacité. 3 mm → surchauffe des tubes → déformation → explosion. Prévention : eau adoucie (dureté = 0), antitartres. 2. Corrosion : deux mécanismes principaux. Corrosion par oxygène dissous : O₂ + Fe → rouille, piqûres profondes et rapides sur les surfaces métalliques. Corrosion acide : pH < 8,5 → dissolution de l'oxyde protecteur de fer → attaque généralisée. Les deux peuvent conduire à des perforations de tubes et des explosions." },
      { q:"Pourquoi maintient-on le pH de l'eau de chaudière entre 10,5 et 11,5 ? Que se passe-t-il en dehors de cette plage ?",
        a:"Le pH 10,5-11,5 est la zone de passivation de l'acier : à ce pH, une couche protectrice d'oxyde de fer (Fe₃O₄ = magnétite) se forme spontanément sur les surfaces métalliques et les protège de la corrosion. En dehors de cette plage : pH < 8,5 : corrosion acide généralisée. L'oxyde protecteur se dissout, le fer est attaqué directement. Urgence absolue → ajouter alcalinisant immédiatement. pH 8,5-10,5 : protection insuffisante → corrosion lente mais progressive. pH > 12 : corrosion caustique → NaOH concentré attaque l'acier en formant des hydrures de fer, causant des fissures. Le pH est mesuré quotidiennement et ajusté par injection d'alcalinisant (NaOH ou Na₃PO₄)." },
      { q:"Qu'est-ce que la purge de fond (bottom blow-down) d'une chaudière et pourquoi est-elle nécessaire ?",
        a:"La purge de fond (bottom blow-down) consiste à ouvrir une vanne en bas du ballon ou du collecteur inférieur pour évacuer les boues et sédiments accumulés. Pourquoi nécessaire : au fil du temps, les sels dissous dans l'eau précipitent sous forme de boue (phosphates de calcium, silicates, etc.) qui se déposent au fond. Ces boues : réduisent le transfert de chaleur, peuvent provoquer des points chauds, augmentent la conductivité de l'eau. Procédure : réaliser à faible charge, ouvrir la vanne rapidement (quelques secondes à 30 secondes), refermer. Fréquence : hebdomadaire ou selon résultats d'analyse. Consigner dans le registre (quantité d'eau purgée pour le bilan eau)." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — BOILERS",
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
      "Zero hardness required — hard water forms scale on tubes",
      "Dissolved oxygen causes pitting corrosion — mandatory de-oxygenation",
      "Blow-down removes concentrated salts and bottom sludge",
      "Daily chemical test: pH, chlorides, conductivity, alkalinity",
    ],
    problems:{
      scaling:{ name:"Scaling", desc:"Calcium and magnesium salts dissolved in water precipitate as calcium carbonate and sulphate on hot tube walls. Scale is a very poor heat conductor (50x less than steel). 1 mm scale → 3-5% efficiency loss. 3 mm scale → tube overheating → explosion risk. Prevention: softened water (hardness = 0), scale inhibitors." },
      corrosion:{ name:"Corrosion", desc:"Two main types: O₂ corrosion (dissolved oxygen): oxygen reacts with iron at high temperature → deep, rapid pitting. Acid corrosion (low pH): pH < 8 dissolves iron's protective oxide → general attack. pH > 12 can also attack steel (caustic corrosion). Prevention: de-oxygenation, maintaining pH 10.5-11.5, corrosion inhibitors." },
      foaming:{ name:"Foaming/Priming", desc:"Foam formation on water surface in steam drum, causing water droplet carryover with steam. Caused by: oil contamination, excess dissolved salts (high conductivity), surfactants. Consequences: water slug in steam systems, deposits in superheaters and heaters. Remedy: bottom blow-down, load reduction, anti-foam treatment." },
      carryover:{ name:"Carry-over", desc:"Water droplets or wet steam transported into steam pipes. Causes: water level too high, foaming, too rapid load increase. Consequences: water slugs in machinery, corrosion and deposits in pipework. Prevention: correct level maintenance, progressive load increase, anti-foam treatment." },
    },
    chemicals:{
      oxygen_scav:{ name:"Oxygen Scavenger", desc:"Removes dissolved oxygen by chemical reaction. Types: Sodium sulphite (Na₂SO₃): 2Na₂SO₃ + O₂ → 2Na₂SO₄. Economical, effective up to 10 bar. Hydrazine (N₂H₄): N₂H₄ + O₂ → N₂ + 2H₂O. For high pressures, but toxic. DEHA/Carbohydrazide: modern non-toxic alternatives. Dosing: sufficient to maintain 0.5-2 mg/l residual in water." },
      alkalinity:{ name:"Alkalinity agent (pH control)", desc:"Maintains pH at 10.5-11.5 to protect steel. Products: Sodium hydroxide (NaOH/caustic soda): strong alkaliser. Trisodium phosphate (Na₃PO₄): pH buffer + precipitates calcium salts. Morpholine: simultaneously treats boiler and condensate. Dosing based on pH and alkalinity measurements." },
      antiscale:{ name:"Scale Inhibitor", desc:"Prevents calcium salt precipitation or disperses formed crystals. Types: Chelating agents (EDTA, NTA): sequester calcium and magnesium ions. Polymer dispersants: prevent crystal adhesion to walls. Phosphates: precipitate calcium as sludge (non-adherent) rather than hard scale." },
      antifoam:{ name:"Anti-foam", desc:"Reduces water surface tension to prevent stable foam formation. Silicone or fatty alcohol-based products. Low dosing (a few mg/l). Used when conductivity is high or oil contamination present." },
    },
    parameters:{
      ph:{ name:"pH", desc:"Target: 10.5-11.5. < 8.5: acid corrosion → urgent. 8.5-10.5: insufficient. 10.5-11.5: correct. > 12: caustic corrosion risk. Measurement: colorimetry or pH meter. Frequency: daily. Action: adjust alkaliser dose." },
      hardness:{ name:"Hardness (TH)", desc:"Target: 0 (softened water). Hardness measures Ca²⁺ and Mg²⁺ ions. > 0.5° fr (5 mg/l CaCO₃) → scaling risk. Check softener and regeneration. Measurement: EDTA titration. If non-zero → immediate blow-down + investigate hard water source." },
      chlorides:{ name:"Chlorides (Cl⁻)", desc:"Target: < 1 mg/l. Chlorides are corrosive (pitting corrosion of stainless steel, stress cracking). Source: seawater ingress, contaminated condensate. > 2 mg/l → increased blow-down. > 5 mg/l → shutdown and investigation." },
      conductivity:{ name:"Conductivity (μS/cm)", desc:"Target: < 1000 μS/cm (even < 500 depending on boiler type). Global indicator of dissolved salt concentration. If too high → bottom blow-down. Correlated with foaming and carryover risk. Trend monitoring essential (increase = salt concentration)." },
      oxygen:{ name:"Dissolved oxygen (O₂)", desc:"Target: < 0.02 mg/l (20 ppb). Measured in feed water AFTER de-aerator. If > 0.05 mg/l → check de-aerator, increase oxygen scavenger. Instrument: amperometric electrode or colorimetric kit." },
      alkalinity:{ name:"Alkalinity (M-alkalinity)", desc:"Target: 100-500 mg/l CaCO₃ (per pressure). Buffer capacity indicator. Low → unstable pH → pH drop risk. Too high → foaming. Measurement: acid titration with methyl orange or phenolphthalein." },
    },
    procedures:{
      sampling:{ name:"Water sampling", desc:"Flush sampling valve for 1-2 minutes before sampling (remove stagnant water). Cool sample before analysis (hot water = false readings). Analyse immediately (O₂ especially oxidises rapidly in air contact). Log time, temperature and results in register." },
      blowdown:{ name:"Surface blow-down", desc:"Removes suspended matter and foam from drum surface. Slowly open blow-down valve for 5-15 seconds. Perform during normal boiler load (not when stopped). Frequency: daily or per conductivity." },
      bottomblowdown:{ name:"Bottom blow-down", desc:"Removes accumulated sludge and sediment from drum bottom. Shorter and more vigorous than surface blow-down. Perform at low load (less steam loss). Frequency: weekly. Note: water and energy loss → log in register." },
      dosing:{ name:"Chemical dosing", desc:"Continuous injection via dosing pump in feed water piping. Concentration calculated per water flow and analysis results. Adjust dose after each analysis. Some products may be incompatible → never mix directly. Log doses in treatment register." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Explain the two main problems caused by poor boiler water quality and their consequences.",
        a:"1. Scaling: dissolved calcium and magnesium salts precipitate on hot tube walls as hard scale. Scale is 50x less thermally conductive than steel. 1 mm scale → 3-5% efficiency loss. 3 mm → tube overheating → deformation → explosion. Prevention: softened water (hardness = 0), scale inhibitors. 2. Corrosion: two main mechanisms. Dissolved oxygen corrosion: O₂ + Fe → rust, deep rapid pitting on metal surfaces. Acid corrosion: pH < 8.5 → dissolution of iron's protective oxide → general attack. Both can lead to tube perforations and explosions." },
      { q:"Why is boiler water pH maintained between 10.5 and 11.5? What happens outside this range?",
        a:"pH 10.5-11.5 is the steel passivation zone: at this pH, a protective iron oxide layer (Fe₃O₄ = magnetite) spontaneously forms on metal surfaces protecting them from corrosion. Outside this range: pH < 8.5: general acid corrosion. Protective oxide dissolves, iron directly attacked. Absolute emergency → add alkaliser immediately. pH 8.5-10.5: insufficient protection → slow but progressive corrosion. pH > 12: caustic corrosion → concentrated NaOH attacks steel forming iron hydrides, causing cracks. pH measured daily and adjusted by alkaliser injection (NaOH or Na₃PO₄)." },
      { q:"What is boiler bottom blow-down and why is it necessary?",
        a:"Bottom blow-down consists of opening a valve at the bottom of the drum or lower header to evacuate accumulated sludge and sediment. Why necessary: over time, dissolved salts precipitate as sludge (calcium phosphates, silicates, etc.) depositing at the bottom. This sludge: reduces heat transfer, can cause hot spots, increases water conductivity. Procedure: perform at low load, open valve quickly (a few seconds to 30 seconds), close. Frequency: weekly or per analysis results. Log in register (quantity of water blown to water balance)." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — CALDERAS",
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
      "Dureza nula requerida — el agua dura forma incrustaciones en los tubos",
      "El oxígeno disuelto provoca corrosión por picaduras — desoxigenación obligatoria",
      "La purga (blow-down) elimina las sales concentradas y los lodos del fondo",
      "Análisis químico diario: pH, cloruros, conductividad, alcalinidad",
    ],
    problems:{
      scaling:{ name:"Incrustación (Scale)", desc:"Las sales de calcio y magnesio precipitan en las paredes calientes como carbonato y sulfato de calcio. Las incrustaciones tienen muy baja conductividad térmica (50x menos que el acero). 1 mm → 3-5% pérdida de eficiencia. 3 mm → sobrecalentamiento → riesgo de explosión. Prevención: agua ablandada, antincrustantes." },
      corrosion:{ name:"Corrosión", desc:"Dos tipos principales: Corrosión por O₂: el oxígeno reacciona con el hierro → picaduras profundas y rápidas. Corrosión ácida (pH bajo): pH < 8 disuelve el óxido protector → ataque generalizado. pH > 12: corrosión cáustica. Prevención: desoxigenación, pH 10,5-11,5, inhibidores." },
      foaming:{ name:"Espumeo (Priming/Foaming)", desc:"Formación de espuma en la superficie del agua del balón → arrastre de gotitas con el vapor. Causado por: contaminación de aceite, exceso de sales disueltas, surfactantes. Consecuencias: golpes de agua, depósitos en los sobrecalentadores. Remedio: purga de fondo, reducción de carga, antiespumante." },
      carryover:{ name:"Arrastre (Carry-over)", desc:"Gotitas de agua transportadas en las tuberías de vapor. Causas: nivel de agua alto, espumeo, subida de carga rápida. Consecuencias: golpes de agua en maquinaria, corrosión en tuberías. Prevención: nivel correcto, subida de carga progresiva, antiespumante." },
    },
    chemicals:{
      oxygen_scav:{ name:"Desoxigenante (Oxygen Scavenger)", desc:"Elimina el oxígeno disuelto por reacción química. Sulfito sódico (Na₂SO₃): económico, eficaz hasta 10 bar. Hidrazina (N₂H₄): para altas presiones, tóxica. DEHA/Carbohidrazida: alternativas modernas no tóxicas. Dosis: mantener residual de 0,5-2 mg/l en el agua." },
      alkalinity:{ name:"Alcalinizante (control pH)", desc:"Mantiene pH 10,5-11,5. Hidróxido sódico (NaOH): alcalinizante potente. Fosfato trisódico (Na₃PO₄): tampón pH + precipita sales de calcio. Morfolina: trata caldera y condensados simultáneamente." },
      antiscale:{ name:"Antincrustante (Scale inhibitor)", desc:"Evita la precipitación de sales calcáreas. Agentes complejantes (EDTA): secuestran Ca²⁺ y Mg²⁺. Dispersantes poliméricos: evitan la adhesión de cristales. Fosfatos: precipitan el calcio en lodo (no adherente)." },
      antifoam:{ name:"Antiespumante (Anti-foam)", desc:"Reduce la tensión superficial del agua para evitar espuma estable. Base de silicona o alcoholes grasos. Dosis baja. Usado con conductividad alta o contaminación por aceite." },
    },
    parameters:{
      ph:{ name:"pH", desc:"Objetivo: 10,5-11,5. < 8,5: corrosión ácida → urgencia. 8,5-10,5: insuficiente. > 12: corrosión cáustica. Medición: colorimetría o pH-metro. Frecuencia: diaria." },
      hardness:{ name:"Dureza (TH)", desc:"Objetivo: 0 (agua ablandada). > 0,5° fr → riesgo de incrustación. Verificar el ablandador. Si dureza > 0 → purga inmediata." },
      chlorides:{ name:"Cloruros (Cl⁻)", desc:"Objetivo: < 1 mg/l. Corrosivos (picaduras en acero inox). Fuente: infiltración de agua de mar. > 2 mg/l → purga intensificada. > 5 mg/l → parada e investigación." },
      conductivity:{ name:"Conductividad (μS/cm)", desc:"Objetivo: < 1000 μS/cm. Indicador global de sales disueltas. Si alta → purga de fondo. Correlacionada con riesgo de espumeo." },
      oxygen:{ name:"Oxígeno disuelto (O₂)", desc:"Objetivo: < 0,02 mg/l. Medido en el agua de alimentación tras el desaireador. Si > 0,05 mg/l → verificar desaireador, aumentar desoxigenante." },
      alkalinity:{ name:"Alcalinidad (M-alcalinidad)", desc:"Objetivo: 100-500 mg/l CaCO₃. Baja → pH inestable. Alta → espumeo. Medición: titulación ácida." },
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
        a:"1. Incrustación: las sales de Ca y Mg precipitan en las paredes calientes. Las incrustaciones tienen muy baja conductividad (50x menos que el acero). 1 mm → 3-5% pérdida. 3 mm → sobrecalentamiento → explosión. Prevención: agua ablandada, antincrustantes. 2. Corrosión: por O₂ (picaduras profundas) y ácida (pH < 8,5 → ataque generalizado). Ambas pueden perforar los tubos." },
      { q:"¿Por qué el pH del agua de caldera se mantiene entre 10,5 y 11,5?",
        a:"A pH 10,5-11,5 se forma una capa protectora de óxido de hierro (Fe₃O₄ = magnetita) en las superficies metálicas. pH < 8,5: corrosión ácida generalizada → urgencia. pH 8,5-10,5: protección insuficiente. pH > 12: corrosión cáustica. Ajustar con alcalinizante (NaOH o Na₃PO₄)." },
      { q:"¿Qué es la purga de fondo y por qué es necesaria?",
        a:"Apertura de válvula en el fondo del balón para evacuar lodos y sedimentos. Necesaria porque las sales precipitan en lodo que: reduce la transferencia de calor, crea puntos calientes, aumenta la conductividad. Procedimiento: a baja carga, abrir unos segundos. Frecuencia: semanal. Registrar en el libro de mantenimiento." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — CALDEIRAS",
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
      "Dureza nula obrigatória — água dura forma incrustações nos tubos",
      "O oxigénio dissolvido provoca corrosão por picadas — desoxigenação obrigatória",
      "A purga (blow-down) elimina sais concentrados e lamas do fundo",
      "Análise química diária: pH, cloretos, condutividade, alcalinidade",
    ],
    problems:{
      scaling:{ name:"Incrustação (Scale)", desc:"Os sais de cálcio e magnésio precipitam nas paredes quentes como carbonato e sulfato de cálcio. As incrustações têm muito baixa condutividade térmica (50x menos que o aço). 1 mm → 3-5% perda de eficiência. 3 mm → sobreaquecimento → risco de explosão. Prevenção: água amolecida, inibidores de incrustação." },
      corrosion:{ name:"Corrosão", desc:"Dois tipos principais: Corrosão por O₂: o oxigénio reage com o ferro → picadas profundas e rápidas. Corrosão ácida (pH baixo): pH < 8 dissolve o óxido protetor → ataque generalizado. pH > 12: corrosão cáustica. Prevenção: desoxigenação, pH 10,5-11,5, inibidores." },
      foaming:{ name:"Espumação (Priming/Foaming)", desc:"Formação de espuma na superfície da água no balão → arrastamento de gotículas com o vapor. Causado por: contaminação por óleo, excesso de sais dissolvidos, surfactantes. Consequências: golpes de água, depósitos nos sobreaquecedores. Remédio: purga de fundo, redução de carga, antiespumante." },
      carryover:{ name:"Arrastamento (Carry-over)", desc:"Gotículas de água transportadas nas tubagens de vapor. Causas: nível de água alto, espumação, subida de carga rápida. Consequências: golpes de água em maquinaria, corrosão em tubagens. Prevenção: nível correto, subida de carga progressiva, antiespumante." },
    },
    chemicals:{
      oxygen_scav:{ name:"Desoxigenante (Oxygen Scavenger)", desc:"Elimina o oxigénio dissolvido por reação química. Sulfito de sódio (Na₂SO₃): económico, eficaz até 10 bar. Hidrazina (N₂H₄): altas pressões, tóxica. DEHA/Carbohidrazida: alternativas modernas não tóxicas. Dose: manter residual de 0,5-2 mg/l na água." },
      alkalinity:{ name:"Alcalinizante (controlo pH)", desc:"Mantém pH 10,5-11,5. Hidróxido de sódio (NaOH): alcalinizante potente. Fosfato trissódico (Na₃PO₄): tampão pH + precipita sais de cálcio. Morfolina: trata caldeira e condensados simultaneamente." },
      antiscale:{ name:"Inibidor de incrustação", desc:"Evita a precipitação de sais calcários. Agentes quelantes (EDTA): sequestram Ca²⁺ e Mg²⁺. Dispersantes poliméricos: evitam adesão de cristais. Fosfatos: precipitam o cálcio em lama (não aderente)." },
      antifoam:{ name:"Antiespumante (Anti-foam)", desc:"Reduz a tensão superficial da água para evitar espuma estável. Base de silicone ou álcoois gordurosos. Dose baixa. Usado com condutividade alta ou contaminação por óleo." },
    },
    parameters:{
      ph:{ name:"pH", desc:"Objetivo: 10,5-11,5. < 8,5: corrosão ácida → urgência. 8,5-10,5: insuficiente. > 12: corrosão cáustica. Medição: colorimetria ou pH-metro. Frequência: diária." },
      hardness:{ name:"Dureza (TH)", desc:"Objetivo: 0 (água amolecida). > 0,5° fr → risco de incrustação. Verificar o amaciador. Se dureza > 0 → purga imediata." },
      chlorides:{ name:"Cloretos (Cl⁻)", desc:"Objetivo: < 1 mg/l. Corrosivos (picadas em aço inox). Fonte: infiltração de água do mar. > 2 mg/l → purga intensificada. > 5 mg/l → paragem e investigação." },
      conductivity:{ name:"Condutividade (μS/cm)", desc:"Objetivo: < 1000 μS/cm. Indicador global de sais dissolvidos. Se alta → purga de fundo. Correlacionada com risco de espumação." },
      oxygen:{ name:"Oxigénio dissolvido (O₂)", desc:"Objetivo: < 0,02 mg/l. Medido na água de alimentação após o desaerador. Se > 0,05 mg/l → verificar desaerador, aumentar desoxigenante." },
      alkalinity:{ name:"Alcalinidade (M-alcalinidade)", desc:"Objetivo: 100-500 mg/l CaCO₃. Baixa → pH instável. Alta → espumação. Medição: titulação ácida." },
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
        a:"1. Incrustação: os sais de Ca e Mg precipitam nas paredes quentes. As incrustações têm muito baixa condutividade (50x menos que o aço). 1 mm → 3-5% perda. 3 mm → sobreaquecimento → explosão. Prevenção: água amolecida, inibidores. 2. Corrosão: por O₂ (picadas profundas) e ácida (pH < 8,5 → ataque generalizado). Ambas podem perfurar os tubos." },
      { q:"Por que o pH da água de caldeira é mantido entre 10,5 e 11,5?",
        a:"A pH 10,5-11,5 forma-se uma camada protetora de óxido de ferro (Fe₃O₄ = magnetite) nas superfícies metálicas. pH < 8,5: corrosão ácida generalizada → urgência. pH 8,5-10,5: proteção insuficiente. pH > 12: corrosão cáustica. Ajustar com alcalinizante (NaOH ou Na₃PO₄)." },
      { q:"O que é a purga de fundo e por que é necessária?",
        a:"Abertura de válvula no fundo do balão para evacuar lamas e sedimentos. Necessária porque os sais precipitam em lama que: reduz a transferência de calor, cria pontos quentes, aumenta a condutividade. Procedimento: a baixa carga, abrir alguns segundos. Frequência: semanal. Registar no livro de manutenção." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — PROBLEMS ─────────────────────────────────────────
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

// ── SVG 2 — CHEMICALS ────────────────────────────────────────
function ChemicalsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("oxygen_scav");
  const items = t.chemicals;
  const cols: Record<string,string> = {oxygen_scav:C.chem,alkalinity:C.water,antiscale:C.scale,antifoam:C.purple};
  const icons: Record<string,string> = {oxygen_scav:"O₂↓",alkalinity:"pH↑",antiscale:"🪨✗",antifoam:"🫧✗"};
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

// ── SVG 3 — PARAMETERS ───────────────────────────────────────
function ParametersSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("ph");
  const items = t.parameters;
  const cols: Record<string,string> = {ph:C.chem,hardness:C.scale,chlorides:C.corr,conductivity:C.purple,oxygen:C.water,alkalinity:C.gold2};
  const icons: Record<string,string> = {ph:"pH",hardness:"TH",chlorides:"Cl⁻",conductivity:"μS",oxygen:"O₂",alkalinity:"Alk"};
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
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:cols[sel]||C.water,fontWeight:700,marginBottom:8}}>{icons[sel]} — {items[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{items[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 4 — PROCEDURES ───────────────────────────────────────
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

function ContentTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
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
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.water}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.water,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.water}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.water:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.water:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.water}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE3_L3 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Pourquoi l'eau d'alimentation de chaudière doit-elle avoir une dureté nulle ?",a:"La dureté de l'eau est due aux ions calcium (Ca²⁺) et magnésium (Mg²⁺) dissous. À haute température, ces sels précipitent sur les parois chaudes des tubes sous forme de carbonates et sulfates insolubles (tartre). Le tartre est 50x moins conducteur thermique que l'acier → les tubes surchauffent. 1 mm de tartre = perte de 3-5% d'efficacité. 3 mm = risque de rupture de tube. La dureté doit être amenée à 0 par un adoucisseur à résine échangeuse d'ions avant l'entrée en chaudière."},
      {q:"Qu'est-ce que la corrosion par oxygène (O₂) et comment la prévenir ?",a:"L'oxygène dissous dans l'eau de chaudière réagit avec le fer à haute température : 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ → rouille. Cette réaction est très rapide à haute température → piqûres profondes dans les tubes en heures ou jours. Prévention : 1. Déaérateur thermique : chauffe l'eau à 100°C pour dégazer mécaniquement (solubilité O₂ = 0 à 100°C). 2. Désoxygénant chimique : Na₂SO₃ (sulfite de sodium) ou hydrazine consomment l'O₂ résiduel. Objectif : < 0,02 mg/l O₂ dans l'eau d'alimentation."},
      {q:"Expliquez le rôle du phosphate trisodique (Na₃PO₄) dans le traitement de l'eau de chaudière.",a:"Le Na₃PO₄ (phosphate trisodique) joue plusieurs rôles : 1. Alcalinisant et tampon pH : Na₃PO₄ est basique → maintient le pH à 10,5-11,5. Résiste aux variations de pH (effet tampon). 2. Précipitation du calcium : Na₃PO₄ + CaCl₂ → Ca₃(PO₄)₂ (insoluble) + NaCl. Le calcium est précipité sous forme de phosphate de calcium (boue non-adhérente) plutôt que de tartre dur. La boue est éliminée par la purge de fond. 3. Passivation : contribue à la formation de la couche protectrice de magnétite (Fe₃O₄) sur les surfaces métalliques."},
      {q:"Quelle est la différence entre une purge de surface et une purge de fond sur une chaudière ?",a:"Purge de surface (surface blow-down) : Vanne en haut du ballon vapeur (à la surface de l'eau). Élimine : mousse, huile flottante, sels concentrés en surface, matières légères en suspension. Durée : 5-15 secondes, ouvrir lentement. Fréquence : quotidienne ou selon conductivité. Purge de fond (bottom blow-down) : Vanne au bas du ballon ou du collecteur inférieur. Élimine : boues et sédiments lourds accumulés au fond. Plus courte et plus violente. Réaliser à faible charge. Fréquence : hebdomadaire. Les deux purges sont complémentaires et doivent être enregistrées dans le journal."},
      {q:"Quels sont les signes d'un manque de désoxygénant dans une chaudière ?",a:"Signes d'un manque de désoxygénant (O₂ trop élevé) : Analyse eau : O₂ > 0,05 mg/l dans l'eau d'alimentation → insuffisance de désoxygénant ou déaérateur défaillant. Visuels lors de l'inspection : piqûres caractéristiques (petites cavités profondes) sur les parois intérieures des tubes et du ballon. Couleur de l'eau de chaudière : eau brune/rouge = rouille en suspension = corrosion active. Test résiduel désoxygénant : < 0,5 mg/l de résiduel = dosage insuffisant. Actions : augmenter la dose de désoxygénant, vérifier le déaérateur (température d'eau = 100°C ?), chercher des entrées d'air dans le circuit d'eau."},
      {q:"Pourquoi la conductivité électrique est-elle surveillée dans l'eau de chaudière ?",a:"La conductivité électrique mesure la concentration globale en ions (sels dissous) dans l'eau. Plus l'eau est chargée en sels dissous, plus la conductivité est élevée. Importance pour la chaudière : Conductivité élevée = sels concentrés = risque de moussage et entraînement (carry-over) : l'eau mousse et transporte des gouttelettes dans la vapeur. Risque de dépôts dans les surchauffeurs et tuyauteries vapeur. Risque de corrosion accrue. Valeur cible : < 1000 μS/cm pour une chaudière auxiliaire standard. Action si dépassement : purge de fond + surface jusqu'à retour dans les limites. Si persistant : vérifier la qualité de l'eau d'alimentation."},
      {q:"Comment diagnostiquer une contamination de l'eau de chaudière par des huiles ?",a:"Signes de contamination par l'huile : Analyse eau : présence d'huile visible (film irisé), COT (carbone organique total) élevé. Visuel : mousse persistante à la surface du ballon, vapeur malodorante, dépôts brun-noir sur les parois. Comportement : moussage intense, entraînement de vapeur humide, perte de niveau brutale puis remontée (phénomène de siphonnage). Sources possibles : fuite de garniture sur les pompes, huile dans le condensat (fuite d'échangeur lubrifiant/vapeur), contamination du circuit d'eau douce. Conséquences : dépôts sur tubes → points chauds → surchauffe. Actions : purger intensivement, nettoyer les surfaces internes, identifier et colmater la source, traitement chimique de dégraissage."},
      {q:"Qu'est-ce que le priming (entraînement vapeur) et quelles en sont les causes ?",a:"Le priming (ou foaming carry-over) est le phénomène par lequel des gouttelettes d'eau liquide sont entraînées avec la vapeur produite par la chaudière. Causes principales : Niveau d'eau trop élevé : les gouttelettes sont proches de la prise de vapeur. Moussage : la surface de l'eau produit une mousse abondante qui déborde dans la vapeur. Montée en charge trop rapide : l'ébullition violente projette des gouttelettes. Conductivité trop élevée (sels concentrés) : favorise le moussage. Conséquences du priming : coups d'eau dans les turbines, réchauffeurs et échangeurs → dommages mécaniques, dépôts de sels dans les tuyaux de vapeur, corrosion. Remèdes : réduire la charge, purger, régler le niveau, antimoussant."},
      {q:"Quelle est la procédure de prélèvement d'eau pour analyse et pourquoi est-elle importante ?",a:"Procédure correcte de prélèvement : 1. Purger la vanne d'échantillonnage 1-2 minutes (éliminer l'eau stagnante dans la tuyauterie). 2. Prélever dans un flacon propre et sec. 3. Refroidir immédiatement (bain d'eau froide) pour arrêter les réactions chimiques et permettre une manipulation sûre. 4. Analyser rapidement (l'oxygène dissous s'échappe en quelques minutes au contact de l'air, le pH peut changer). 5. Consigner : heure, température de prélèvement, pression de la chaudière. Importance : si l'eau est trop chaude lors de l'analyse, l'O₂ s'échappe (résultat faux bas), le pH change avec la température. Un résultat faussé = traitement inadapté = risque de corrosion ou d'entartrage non détecté."},
      {q:"Quelles actions correctives prendre si le pH de l'eau de chaudière est mesuré à 8,0 ?",a:"pH 8,0 est une situation d'urgence (pH normal = 10,5-11,5). Actions immédiates : 1. Vérifier le résultat avec un 2ème test (kit différent ou pH-mètre) pour confirmer. 2. Avertir le chef mécanicien. 3. Augmenter immédiatement la dose d'alcalinisant (NaOH ou Na₃PO₄). 4. Si la chaudière est en service : réduire la charge et surveiller de près. 5. Analyser toutes les heures jusqu'au retour dans les limites. 6. Rechercher la cause de la chute de pH : entrée d'eau acide (condensats acides, eau de mer ?), consommation excessive d'alcalinité (par excès de CO₂), insuffisance de dosage. 7. Ne jamais purger fortement si le pH est bas (perte d'alcalinité restante). 8. Consigner dans le registre de traitement eau."},
      {q:"Comment fonctionne un adoucisseur d'eau à résine échangeuse d'ions et pourquoi doit-il être régénéré ?",a:"Fonctionnement : L'adoucisseur contient une résine synthétique chargée en ions sodium (Na⁺). L'eau dure passe à travers la résine : les ions Ca²⁺ et Mg²⁺ (responsables de la dureté) sont capturés par la résine et échangés contre des ions Na⁺ (non calcifiants). L'eau sortante est 'adoucie' : dureté ≈ 0. Épuisement : au fil du temps, la résine se sature en Ca²⁺ et Mg²⁺ → elle perd sa capacité d'échange → l'eau sortante redevient dure. Régénération : on fait passer une solution concentrée de NaCl (saumure) sur la résine : Na⁺ en excès déplace Ca²⁺ et Mg²⁺ qui sont évacués en égout. La résine est rechargée en Na⁺ et retrouve sa capacité. Fréquence de régénération : selon le volume traité et la dureté de l'eau brute. Test obligatoire : contrôler la dureté en sortie chaque jour."},
      {q:"Quelles sont les conséquences d'une teneur en chlorures trop élevée dans l'eau de chaudière ?",a:"Les chlorures (Cl⁻) sont très corrosifs pour les aciers inoxydables et les alliages métalliques utilisés en chaudière. Conséquences : Corrosion par piqûres (pitting) : les chlorures détruisent la couche passivante sur l'acier inox et l'alliage de cuivre → piqûres profondes. Fissuration sous contrainte (SCC — Stress Corrosion Cracking) : en présence de contraintes mécaniques, les chlorures provoquent des fissures se propageant rapidement. Sources de chlorures : infiltration d'eau de mer (principal risque), eau de condensat contaminée. Valeurs limites : < 1 mg/l : normal. 1-5 mg/l : augmenter la purge. > 5 mg/l : arrêt de la chaudière et nettoyage chimique. Prévention : vérifier l'absence de fuite d'eau de mer dans les condenseurs et refroidisseurs."},
    ],
    en:[
      {q:"Why must boiler feed water have zero hardness?",a:"Water hardness is due to dissolved calcium (Ca²⁺) and magnesium (Mg²⁺) ions. At high temperature, these salts precipitate on hot tube walls as insoluble carbonates and sulphates (scale). Scale is 50x less thermally conductive than steel → tubes overheat. 1 mm scale = 3-5% efficiency loss. 3 mm = tube failure risk. Hardness must be reduced to 0 by an ion exchange resin softener before boiler entry."},
      {q:"What is oxygen (O₂) corrosion and how to prevent it?",a:"Dissolved oxygen in boiler water reacts with iron at high temperature: 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ → rust. This reaction is very fast at high temperature → deep pitting in tubes within hours or days. Prevention: 1. Thermal de-aerator: heats water to 100°C for mechanical degassing (O₂ solubility = 0 at 100°C). 2. Chemical oxygen scavenger: Na₂SO₃ (sodium sulphite) or hydrazine consume residual O₂. Target: < 0.02 mg/l O₂ in feed water."},
      {q:"Explain the role of trisodium phosphate (Na₃PO₄) in boiler water treatment.",a:"Na₃PO₄ (trisodium phosphate) plays multiple roles: 1. Alkaliser and pH buffer: Na₃PO₄ is basic → maintains pH at 10.5-11.5. Resists pH variations. 2. Calcium precipitation: Na₃PO₄ + CaCl₂ → Ca₃(PO₄)₂ (insoluble) + NaCl. Calcium precipitated as calcium phosphate (non-adherent sludge) rather than hard scale. Sludge eliminated by bottom blow-down. 3. Passivation: contributes to formation of magnetite (Fe₃O₄) protective layer on metal surfaces."},
      {q:"What is the difference between surface and bottom blow-down on a boiler?",a:"Surface blow-down: valve at top of steam drum (at water surface). Removes: foam, floating oil, concentrated salts on surface, light suspended matter. Duration: 5-15 seconds, open slowly. Frequency: daily or per conductivity. Bottom blow-down: valve at bottom of drum or lower header. Removes: heavy sludge and sediment accumulated at bottom. Shorter and more vigorous. Perform at low load. Frequency: weekly. Both blow-downs are complementary and must be logged."},
      {q:"What are the signs of insufficient oxygen scavenger in a boiler?",a:"Signs of insufficient oxygen scavenger (O₂ too high): Water analysis: O₂ > 0.05 mg/l in feed water → insufficient scavenger or faulty de-aerator. Visual during inspection: characteristic pitting (small deep cavities) on tube and drum interior walls. Boiler water colour: brown/red water = rust in suspension = active corrosion. Scavenger residual test: < 0.5 mg/l residual = insufficient dosing. Actions: increase scavenger dose, check de-aerator (water temperature = 100°C?), look for air ingress in water circuit."},
      {q:"Why is electrical conductivity monitored in boiler water?",a:"Electrical conductivity measures overall ion (dissolved salt) concentration in water. Higher dissolved salts = higher conductivity. Importance for boiler: High conductivity = concentrated salts = foaming and carry-over risk: water foams and transports droplets into steam. Risk of deposits in superheaters and steam piping. Increased corrosion risk. Target value: < 1000 μS/cm for standard auxiliary boiler. Action if exceeded: bottom and surface blow-down until back within limits. If persistent: check feed water quality."},
      {q:"How to diagnose oil contamination of boiler water?",a:"Signs of oil contamination: Water analysis: visible oil (iridescent film), high TOC (total organic carbon). Visual: persistent foam on drum surface, malodorous steam, dark brown-black deposits on walls. Behaviour: intense foaming, wet steam carryover, sudden level drop then rise (siphoning). Possible sources: pump seal leaks, oil in condensate (lube/steam exchanger leak), fresh water circuit contamination. Consequences: tube deposits → hot spots → overheating. Actions: intensive blow-down, clean internal surfaces, identify and stop source, chemical degreasing treatment."},
      {q:"What is priming (steam carry-over) and what are its causes?",a:"Priming (foaming carry-over) is when liquid water droplets are entrained with steam produced by the boiler. Main causes: Water level too high: droplets close to steam take-off. Foaming: water surface produces abundant foam overflowing into steam. Too rapid load increase: violent boiling projects droplets. High conductivity (concentrated salts): promotes foaming. Priming consequences: water slugs in turbines, heaters and exchangers → mechanical damage, salt deposits in steam pipes, corrosion. Remedies: reduce load, blow-down, adjust level, anti-foam."},
      {q:"What is the water sampling procedure for analysis and why is it important?",a:"Correct sampling procedure: 1. Flush sampling valve 1-2 minutes (remove stagnant water in piping). 2. Sample in clean, dry flask. 3. Cool immediately (cold water bath) to stop chemical reactions and allow safe handling. 4. Analyse quickly (dissolved O₂ escapes within minutes in air contact, pH changes with temperature). 5. Log: time, sampling temperature, boiler pressure. Importance: if water too hot during analysis, O₂ escapes (false low result), pH changes with temperature. False result = incorrect treatment = undetected corrosion or scaling risk."},
      {q:"What corrective actions if boiler water pH is measured at 8.0?",a:"pH 8.0 is an emergency (normal pH = 10.5-11.5). Immediate actions: 1. Verify result with 2nd test (different kit or pH meter). 2. Notify chief engineer. 3. Immediately increase alkaliser dose (NaOH or Na₃PO₄). 4. If boiler in service: reduce load and monitor closely. 5. Analyse every hour until back within limits. 6. Find cause of pH drop: acid water ingress (acid condensate, seawater?), excess alkalinity consumption (excess CO₂), insufficient dosing. 7. Never blow-down heavily if pH is low (loss of remaining alkalinity). 8. Log in water treatment register."},
      {q:"How does an ion exchange resin softener work and why must it be regenerated?",a:"Operation: Softener contains synthetic resin loaded with sodium ions (Na⁺). Hard water passes through resin: Ca²⁺ and Mg²⁺ ions (causing hardness) are captured by resin and exchanged for Na⁺ ions (non-scaling). Outlet water is 'softened': hardness ≈ 0. Exhaustion: over time, resin saturates with Ca²⁺ and Mg²⁺ → loses exchange capacity → outlet water becomes hard again. Regeneration: concentrated NaCl solution (brine) passed through resin: excess Na⁺ displaces Ca²⁺ and Mg²⁺ which are drained. Resin recharged with Na⁺ and regains capacity. Regeneration frequency: per treated volume and raw water hardness. Mandatory test: check outlet hardness daily."},
      {q:"What are the consequences of chloride content too high in boiler water?",a:"Chlorides (Cl⁻) are very corrosive for stainless steels and metallic alloys used in boilers. Consequences: Pitting corrosion: chlorides destroy passivation layer on stainless steel and copper alloys → deep pitting. Stress Corrosion Cracking (SCC): under mechanical stress, chlorides cause rapidly propagating cracks. Chloride sources: seawater ingress (main risk), contaminated condensate. Limit values: < 1 mg/l: normal. 1-5 mg/l: increase blow-down. > 5 mg/l: boiler shutdown and chemical cleaning. Prevention: verify no seawater leak in condensers and coolers."},
    ],
    es:[
      {q:"¿Por qué el agua de alimentación de la caldera debe tener dureza nula?",a:"La dureza se debe a los iones Ca²⁺ y Mg²⁺ disueltos. A alta temperatura precipitan en las paredes calientes como incrustaciones. Las incrustaciones son 50x menos conductoras que el acero. 1 mm = 3-5% pérdida. 3 mm = riesgo de rotura de tubo. La dureza debe reducirse a 0 con un ablandador de resina intercambiadora de iones."},
      {q:"¿Qué es la corrosión por oxígeno y cómo prevenirla?",a:"El O₂ disuelto reacciona con el hierro a alta temperatura → picaduras profundas en horas. Prevención: 1. Desaireador térmico: calienta el agua a 100°C para desgazar. 2. Desoxigenante químico: Na₂SO₃ o hidrazina consumen O₂ residual. Objetivo: < 0,02 mg/l O₂."},
      {q:"Explique el papel del fosfato trisódico (Na₃PO₄) en el tratamiento del agua.",a:"1. Alcalinizante y tampón pH: mantiene pH 10,5-11,5. 2. Precipitación del calcio: Na₃PO₄ + CaCl₂ → Ca₃(PO₄)₂ (lodo no adherente) + NaCl. El lodo se elimina por purga de fondo. 3. Pasivación: contribuye a la capa protectora de magnetita."},
      {q:"¿Cuál es la diferencia entre purga de superficie y purga de fondo?",a:"Purga de superficie: válvula en la parte superior del balón. Elimina espuma, aceite, sales concentradas. 5-15 segundos. Diaria. Purga de fondo: válvula en la parte inferior. Elimina lodos y sedimentos pesados. Más corta y violenta. Semanal. Ambas son complementarias y deben registrarse."},
      {q:"¿Cuáles son los signos de un déficit de desoxigenante?",a:"O₂ > 0,05 mg/l en el agua de alimentación → desaireador defectuoso o dosis insuficiente. Picaduras en las paredes internas. Agua marrón/roja = óxido en suspensión = corrosión activa. Residual < 0,5 mg/l = dosis insuficiente."},
      {q:"¿Por qué se controla la conductividad eléctrica del agua de caldera?",a:"La conductividad mide la concentración global de sales disueltas. Alta conductividad = riesgo de espumeo y arrastre (carry-over). Objetivo: < 1000 μS/cm. Si se supera: purga de fondo + superficie. Si persiste: verificar la calidad del agua de alimentación."},
      {q:"¿Cómo diagnosticar una contaminación del agua de caldera por aceites?",a:"Espuma persistente en el balón, vapor maloliente, depósitos oscuros. Fuentes: fugas de prensaestopas, aceite en el condensado. Consecuencias: depósitos en tubos → puntos calientes. Acciones: purga intensa, limpiar superficies, identificar y sellar la fuente."},
      {q:"¿Qué es el priming (arrastre de vapor) y cuáles son sus causas?",a:"Gotitas de agua arrastradas con el vapor. Causas: nivel alto, espumeo, subida de carga rápida, alta conductividad. Consecuencias: golpes de agua en maquinaria, depósitos de sales, corrosión. Remedios: reducir carga, purgar, ajustar nivel, antiespumante."},
      {q:"¿Cuál es el procedimiento correcto de toma de muestra para análisis?",a:"1. Purgar la válvula 1-2 min. 2. Tomar en frasco limpio. 3. Enfriar inmediatamente. 4. Analizar rápidamente (O₂ se escapa en minutos). 5. Registrar hora, temperatura, presión. Un resultado erróneo = tratamiento inadecuado = riesgo no detectado."},
      {q:"¿Qué acciones correctivas tomar si el pH del agua es 8,0?",a:"pH 8,0 = urgencia. 1. Confirmar con 2º análisis. 2. Avisar al jefe de máquinas. 3. Aumentar dosis de alcalinizante. 4. Reducir carga. 5. Analizar cada hora. 6. Buscar causa. 7. No purgar fuerte (pérdida de alcalinidad). 8. Registrar."},
      {q:"¿Cómo funciona un ablandador de resina intercambiadora de iones?",a:"Resina cargada con Na⁺. El agua dura pasa → Ca²⁺ y Mg²⁺ capturados, Na⁺ liberados. Agua ablandada: dureza ≈ 0. Regeneración: solución de NaCl recarga la resina de Na⁺. Frecuencia: según volumen y dureza del agua bruta. Control diario de dureza en la salida."},
      {q:"¿Cuáles son las consecuencias de un contenido excesivo de cloruros en el agua?",a:"Los cloruros son muy corrosivos. Destruyen la capa pasivante → picaduras. Fisuración por corrosión bajo tensión (SCC). Fuente principal: infiltración de agua de mar. Límites: < 1 mg/l normal, 1-5 mg/l purgar más, > 5 mg/l parada e investigación."},
    ],
    pt:[
      {q:"Por que a água de alimentação da caldeira deve ter dureza nula?",a:"A dureza deve-se aos iões Ca²⁺ e Mg²⁺ dissolvidos. A alta temperatura precipitam nas paredes quentes como incrustações. As incrustações são 50x menos condutoras que o aço. 1 mm = 3-5% perda. 3 mm = risco de rotura de tubo. A dureza deve ser reduzida a 0 por um amaciador de resina permutadora de iões."},
      {q:"O que é a corrosão por oxigénio e como preveni-la?",a:"O O₂ dissolvido reage com o ferro a alta temperatura → picadas profundas em horas. Prevenção: 1. Desaerador térmico: aquece água a 100°C para desgazeificar. 2. Desoxigenante químico: Na₂SO₃ ou hidrazina consomem O₂ residual. Objetivo: < 0,02 mg/l O₂."},
      {q:"Explique o papel do fosfato trissódico (Na₃PO₄) no tratamento da água.",a:"1. Alcalinizante e tampão pH: mantém pH 10,5-11,5. 2. Precipitação do cálcio: Na₃PO₄ + CaCl₂ → Ca₃(PO₄)₂ (lama não aderente) + NaCl. A lama é eliminada pela purga de fundo. 3. Passivação: contribui para a camada protetora de magnetite."},
      {q:"Qual é a diferença entre purga de superfície e purga de fundo?",a:"Purga de superfície: válvula no topo do balão. Remove espuma, óleo, sais concentrados. 5-15 segundos. Diária. Purga de fundo: válvula no fundo. Remove lamas e sedimentos pesados. Mais curta e violenta. Semanal. Ambas são complementares e devem ser registadas."},
      {q:"Quais são os sinais de défice de desoxigenante?",a:"O₂ > 0,05 mg/l na água de alimentação → desaerador deficiente ou dose insuficiente. Picadas nas paredes internas. Água castanha/vermelha = óxido em suspensão = corrosão ativa. Residual < 0,5 mg/l = dose insuficiente."},
      {q:"Por que se monitoriza a condutividade elétrica da água de caldeira?",a:"A condutividade mede a concentração global de sais dissolvidos. Alta condutividade = risco de espumação e arrastamento. Objetivo: < 1000 μS/cm. Se ultrapassado: purga de fundo + superfície. Se persistir: verificar qualidade da água de alimentação."},
      {q:"Como diagnosticar contaminação da água de caldeira por óleos?",a:"Espuma persistente no balão, vapor com odor, depósitos escuros. Fontes: fugas de vedações de bombas, óleo no condensado. Consequências: depósitos nos tubos → pontos quentes. Ações: purga intensa, limpar superfícies, identificar e selar a fonte."},
      {q:"O que é o priming (arrastamento de vapor) e quais as suas causas?",a:"Gotículas de água arrastadas com o vapor. Causas: nível alto, espumação, subida de carga rápida, alta condutividade. Consequências: golpes de água em maquinaria, depósitos de sais, corrosão. Remédios: reduzir carga, purgar, ajustar nível, antiespumante."},
      {q:"Qual é o procedimento correto de recolha de amostra para análise?",a:"1. Purgar válvula 1-2 min. 2. Recolher em frasco limpo. 3. Arrefecer imediatamente. 4. Analisar rapidamente (O₂ escapa em minutos). 5. Registar hora, temperatura, pressão. Resultado errado = tratamento inadequado = risco não detetado."},
      {q:"Que ações corretivas tomar se o pH da água for 8,0?",a:"pH 8,0 = urgência. 1. Confirmar com 2ª análise. 2. Avisar o chefe de máquinas. 3. Aumentar dose de alcalinizante. 4. Reduzir carga. 5. Analisar de hora a hora. 6. Procurar causa. 7. Não purgar muito (perda de alcalinidade). 8. Registar."},
      {q:"Como funciona um amaciador de resina permutadora de iões?",a:"Resina carregada com Na⁺. A água dura passa → Ca²⁺ e Mg²⁺ capturados, Na⁺ libertados. Água amolecida: dureza ≈ 0. Regeneração: solução de NaCl recarrega a resina de Na⁺. Frequência: conforme volume e dureza da água bruta. Controlo diário da dureza na saída."},
      {q:"Quais são as consequências de teor excessivo de cloretos na água?",a:"Os cloretos são muito corrosivos. Destroem a camada passivante → picadas. Fissuração por corrosão sob tensão (SCC). Principal fonte: infiltração de água do mar. Limites: < 1 mg/l normal, 1-5 mg/l purgar mais, > 5 mg/l paragem e investigação."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"Quel est le pH cible de l'eau d'une chaudière marine auxiliaire ?",opts:["6,5-7,5 (neutre)","8,5-9,5","10,5-11,5","12,5-13,5"],correct:2,exp:"Le pH cible de l'eau de chaudière est 10,5-11,5. À ce pH, une couche protectrice de magnétite (Fe₃O₄) se forme sur les surfaces métalliques. En dessous de 8,5 : corrosion acide (urgence). Au-dessus de 12 : corrosion caustique. La plage 10,5-11,5 est la zone de passivation de l'acier."},
      {q:"Quel produit chimique est utilisé pour éliminer l'oxygène dissous dans l'eau de chaudière ?",opts:["Carbonate de sodium (Na₂CO₃)","Sulfite de sodium (Na₂SO₃) ou désoxygénant","Acide chlorhydrique (HCl)","Chlore (Cl₂)"],correct:1,exp:"Le sulfite de sodium (Na₂SO₃) ou les désoxygénants (hydrazine, DEHA) éliminent l'oxygène dissous par réaction chimique : 2Na₂SO₃ + O₂ → 2Na₂SO₄. L'objectif est < 0,02 mg/l d'O₂ dans l'eau d'alimentation. L'O₂ dissous provoque des piqûres de corrosion profondes et rapides."},
      {q:"Pourquoi doit-on purger régulièrement une chaudière (blow-down) ?",opts:["Pour refroidir l'eau de chaudière","Pour éliminer les sels concentrés, boues et éviter le moussage","Pour augmenter la pression de vapeur","Pour vérifier le niveau d'eau"],correct:1,exp:"La purge (blow-down) est nécessaire pour éliminer les sels dissous qui se concentrent progressivement dans l'eau de chaudière (évaporation continue), les boues et sédiments qui s'accumulent au fond, et réduire la conductivité pour éviter le moussage et l'entraînement d'eau dans la vapeur."},
      {q:"Qu'indique une conductivité élevée dans l'eau de chaudière ?",opts:["L'eau est trop froide","La concentration en sels dissous est trop élevée → risque de moussage","Le pH est trop élevé","L'eau manque d'oxygène"],correct:1,exp:"Une conductivité élevée (> 1000 μS/cm) indique une concentration trop élevée en sels dissous dans l'eau. Cela favorise le moussage (foam) et l'entraînement de gouttelettes d'eau avec la vapeur (carry-over). La solution est d'effectuer une purge de fond et de surface pour diluer l'eau et réduire la conductivité."},
      {q:"Quelle est la principale conséquence de l'entartrage (scale) des tubes de chaudière ?",opts:["L'eau devient acide","La conductivité augmente","Le transfert de chaleur est réduit → surchauffe des tubes → risque d'explosion","La vapeur devient humide"],correct:2,exp:"Le tartre est 50x moins conducteur thermique que l'acier. 1 mm de tartre provoque 3-5% de perte d'efficacité. 3 mm de tartre → les tubes ne peuvent plus évacuer la chaleur correctement → surchauffe → déformation → risque d'explosion (BLEVE). C'est pourquoi la dureté de l'eau doit être nulle."},
    ],
    en:[
      {q:"What is the target pH for marine auxiliary boiler water?",opts:["6.5-7.5 (neutral)","8.5-9.5","10.5-11.5","12.5-13.5"],correct:2,exp:"Target boiler water pH is 10.5-11.5. At this pH, a protective magnetite (Fe₃O₄) layer forms on metal surfaces. Below 8.5: acid corrosion (emergency). Above 12: caustic corrosion. The 10.5-11.5 range is the steel passivation zone."},
      {q:"What chemical is used to remove dissolved oxygen from boiler water?",opts:["Sodium carbonate (Na₂CO₃)","Sodium sulphite (Na₂SO₃) or oxygen scavenger","Hydrochloric acid (HCl)","Chlorine (Cl₂)"],correct:1,exp:"Sodium sulphite (Na₂SO₃) or oxygen scavengers (hydrazine, DEHA) remove dissolved oxygen by chemical reaction: 2Na₂SO₃ + O₂ → 2Na₂SO₄. Target: < 0.02 mg/l O₂ in feed water. Dissolved O₂ causes deep, rapid pitting corrosion."},
      {q:"Why must a boiler be regularly blown down?",opts:["To cool boiler water","To remove concentrated salts, sludge and prevent foaming","To increase steam pressure","To check water level"],correct:1,exp:"Blow-down is necessary to remove dissolved salts progressively concentrating in boiler water (continuous evaporation), accumulated bottom sludge and sediment, and reduce conductivity to prevent foaming and water entrainment in steam."},
      {q:"What does high conductivity in boiler water indicate?",opts:["Water is too cold","Dissolved salt concentration too high → foaming risk","pH is too high","Water lacks oxygen"],correct:1,exp:"High conductivity (> 1000 μS/cm) indicates dissolved salt concentration too high. This promotes foaming and water droplet entrainment in steam (carry-over). Solution: bottom and surface blow-down to dilute water and reduce conductivity."},
      {q:"What is the main consequence of boiler tube scaling?",opts:["Water becomes acidic","Conductivity increases","Heat transfer reduced → tube overheating → explosion risk","Steam becomes wet"],correct:2,exp:"Scale is 50x less thermally conductive than steel. 1 mm scale causes 3-5% efficiency loss. 3 mm scale → tubes cannot dissipate heat correctly → overheating → deformation → explosion risk (BLEVE). This is why water hardness must be zero."},
    ],
    es:[
      {q:"¿Cuál es el pH objetivo del agua de una caldera auxiliar marina?",opts:["6,5-7,5 (neutro)","8,5-9,5","10,5-11,5","12,5-13,5"],correct:2,exp:"El pH objetivo es 10,5-11,5. A este pH se forma una capa protectora de magnetita. Por debajo de 8,5: corrosión ácida (urgencia). Por encima de 12: corrosión cáustica."},
      {q:"¿Qué producto elimina el oxígeno disuelto del agua de caldera?",opts:["Carbonato sódico (Na₂CO₃)","Sulfito sódico (Na₂SO₃) o desoxigenante","Ácido clorhídrico (HCl)","Cloro (Cl₂)"],correct:1,exp:"El sulfito sódico (Na₂SO₃) o los desoxigenantes eliminan el O₂ disuelto por reacción química. Objetivo: < 0,02 mg/l O₂. El O₂ disuelto provoca picaduras de corrosión profundas y rápidas."},
      {q:"¿Por qué hay que purgar regularmente una caldera (blow-down)?",opts:["Para enfriar el agua","Para eliminar sales concentradas, lodos y evitar espumeo","Para aumentar la presión de vapor","Para verificar el nivel de agua"],correct:1,exp:"La purga elimina sales disueltas que se concentran progresivamente, lodos acumulados en el fondo, y reduce la conductividad para evitar espumeo y arrastre de agua en el vapor."},
      {q:"¿Qué indica una conductividad alta en el agua de caldera?",opts:["El agua está demasiado fría","Concentración de sales disueltas demasiado alta → riesgo de espumeo","El pH es demasiado alto","El agua carece de oxígeno"],correct:1,exp:"Alta conductividad (> 1000 μS/cm) = concentración excesiva de sales → espumeo y arrastre (carry-over). Solución: purga de fondo y superficie."},
      {q:"¿Cuál es la principal consecuencia de las incrustaciones en los tubos de caldera?",opts:["El agua se vuelve ácida","La conductividad aumenta","El intercambio de calor disminuye → sobrecalentamiento → riesgo de explosión","El vapor se humedece"],correct:2,exp:"Las incrustaciones son 50x menos conductoras que el acero. 1 mm = 3-5% pérdida. 3 mm = riesgo de rotura de tubo (BLEVE). Por eso la dureza debe ser nula."},
    ],
    pt:[
      {q:"Qual é o pH objetivo da água de uma caldeira auxiliar marinha?",opts:["6,5-7,5 (neutro)","8,5-9,5","10,5-11,5","12,5-13,5"],correct:2,exp:"O pH objetivo é 10,5-11,5. A este pH forma-se uma camada protetora de magnetite. Abaixo de 8,5: corrosão ácida (urgência). Acima de 12: corrosão cáustica."},
      {q:"Que produto elimina o oxigénio dissolvido da água de caldeira?",opts:["Carbonato de sódio (Na₂CO₃)","Sulfito de sódio (Na₂SO₃) ou desoxigenante","Ácido clorídrico (HCl)","Cloro (Cl₂)"],correct:1,exp:"O sulfito de sódio (Na₂SO₃) ou os desoxigenantes eliminam O₂ dissolvido por reação química. Objetivo: < 0,02 mg/l O₂. O O₂ dissolvido provoca picadas de corrosão profundas e rápidas."},
      {q:"Por que se deve purgar regularmente uma caldeira (blow-down)?",opts:["Para arrefecer a água","Para eliminar sais concentrados, lamas e evitar espumação","Para aumentar a pressão de vapor","Para verificar o nível de água"],correct:1,exp:"A purga elimina sais dissolvidos que se concentram progressivamente, lamas acumuladas no fundo, e reduz a condutividade para evitar espumação e arrastamento no vapor."},
      {q:"O que indica alta condutividade na água de caldeira?",opts:["A água está demasiado fria","Concentração de sais dissolvidos demasiado alta → risco de espumação","O pH é demasiado alto","A água carece de oxigénio"],correct:1,exp:"Alta condutividade (> 1000 μS/cm) = concentração excessiva de sais → espumação e arrastamento. Solução: purga de fundo e superfície."},
      {q:"Qual é a principal consequência das incrustações nos tubos da caldeira?",opts:["A água torna-se ácida","A condutividade aumenta","A transferência de calor reduz → sobreaquecimento → risco de explosão","O vapor torna-se húmido"],correct:2,exp:"As incrustações são 50x menos condutoras que o aço. 1 mm = 3-5% perda. 3 mm = risco de rotura de tubo (BLEVE). Por isso a dureza deve ser nula."},
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
        <div key={i} style={{marginBottom:8,borderRadius:12,background:"rgba(10,22,40,0.8)",border:"1px solid rgba(77,166,255,0.15)",overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 14px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10}}>
            <span style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:"#4da6ff",fontWeight:700,marginRight:6}}>Q{i+1}.</span>{item.q}</span>
            <span style={{color:"#4da6ff",fontSize:14,flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{padding:"0 14px 12px"}}>
              <button onClick={()=>setShowAns(p=>({...p,[i]:!p[i]}))} style={{padding:"6px 12px",borderRadius:8,fontSize:10,cursor:"pointer",background:showAns[i]?"rgba(77,166,255,0.13)":"rgba(255,255,255,0.05)",border:`1px solid ${showAns[i]?"#4da6ff":"rgba(255,255,255,0.12)"}`,color:showAns[i]?"#4da6ff":"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{showAns[i]?l.hide:l.show}</button>
              {showAns[i]&&<div style={{marginTop:8,padding:10,borderRadius:8,background:"rgba(13,31,60,0.8)",borderLeft:"3px solid #4da6ff",fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{item.a}</div>}
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
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(77,166,255,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"#4da6ff",marginBottom:2}}>{t.moduleLabel} · L3</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0f4ff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
          </div>
          <div style={{fontSize:11,color:"#e8b94f",fontFamily:"Courier New",flexShrink:0}}>{progress}%</div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,#4da6ff,#c9922a)",width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:"rgba(77,166,255,0.1)",border:"1px solid rgba(77,166,255,0.3)"}}>
          <span style={{fontSize:12}}>💧</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"#4da6ff",letterSpacing:1}}>MACHINE · CHAUDIÈRES · PREMIUM</span>
        </div>
      </div>
      <div style={{display:"flex",padding:"10px 14px 0",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
        {t.tabs.map((label:string,i:number)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",borderRadius:10,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",background:tab===i?"rgba(77,166,255,0.13)":"rgba(255,255,255,0.04)",border:`1px solid ${tab===i?"#4da6ff":"rgba(255,255,255,0.1)"}`,color:tab===i?"#4da6ff":"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{label}</button>
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
