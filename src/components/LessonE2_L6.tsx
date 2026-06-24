// LessonE2_L6 — Échangeurs de chaleur | PART 1
import { useState } from "react";

const C = {
  heat:"#f97316", cool:"#4da6ff", plate:"#6dbf8a",
  shell:"#e8b94f", tube:"#c084fc", fouling:"#94a3b8",
  gold:"#c9922a", gold2:"#e8b94f",
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  safe:"#6dbf8a", red:"#e74c3c",
};

const T: any = {
  fr:{
    moduleLabel:"MACHINE — AUXILIAIRES",
    lessonTitle:"Échangeurs de chaleur",
    intro:"Les échangeurs de chaleur sont partout à bord : ils refroidissent les moteurs, réchauffent le fuel, régulent la température de l'huile de lubrification et permettent la récupération de chaleur des gaz d'échappement. Comprendre leur fonctionnement est essentiel pour optimiser l'efficacité énergétique du navire.",
    tabs:["📖 Contenu","✏️ Pratique","📚 Banque Q.","🎯 Quiz"],
    s1title:"🔧 Types d'échangeurs de chaleur",
    s1hint:"👆 Tapez un type pour voir ses caractéristiques",
    s2title:"🌡️ Applications à bord",
    s2hint:"👆 Tapez une application pour les détails",
    s3title:"📊 Encrassement & Performance",
    s3hint:"👆 Tapez un indicateur pour les explications",
    s4title:"🔩 Maintenance & Nettoyage",
    s4hint:"👆 Tapez une opération de maintenance",
    keypoints:"Points clés",
    kp:[
      "Les échangeurs à plaques (PHE) sont compacts et faciles à nettoyer — standard moderne",
      "Les échangeurs tubulaires (shell & tube) résistent aux hautes pressions et températures",
      "L'encrassement réduit l'efficacité et augmente la consommation d'énergie",
      "La récupération de chaleur des gaz d'échappement (ECE) améliore le rendement global du navire",
      "Le débit et la température doivent être surveillés pour détecter l'encrassement précocement",
    ],
    hxTypes:{
      plate:{ name:"Échangeur à plaques (PHE)", desc:"Plaques métalliques ondulées empilées avec joints d'étanchéité. Le fluide chaud et le fluide froid circulent en alternance entre les plaques. Avantages : compact, grande surface d'échange, facile à nettoyer (démontable), bon coefficient d'échange. Utilisé pour : refroidissement HFO, eau douce moteur, huile lubrifiante, eau sanitaire." },
      shelltube:{ name:"Échangeur tubulaire (Shell & Tube)", desc:"Faisceau de tubes dans une enveloppe cylindrique. Un fluide circule dans les tubes, l'autre autour des tubes. Avantages : robuste, haute pression et température, adaptable à tous fluides. Utilisé pour : refroidissement eau de mer (matériaux anti-corrosion), condenseurs, réchauffeurs de HFO haute pression." },
      keel:{ name:"Échangeur à quille (Keel cooler)", desc:"Serpentins montés sur la coque immergée, refroidis directement par l'eau de mer extérieure sans pompage. Avantages : pas de pompe eau de mer, très fiable, maintenance réduite. Inconvénients : moins efficace en eau chaude, risque de salissures marines. Utilisé sur remorqueurs, dragues, navires spéciaux." },
      airblast:{ name:"Refroidisseur à air (Air blast cooler)", desc:"Ventilateurs forçant l'air sur un faisceau de tubes à ailettes. Pas d'eau de refroidissement nécessaire. Utilisé pour refroidir l'huile de lubrification, l'eau douce dans les zones de mouillage ou à sec. Moins efficace par temps chaud." },
    },
    applications:{
      fw_cooler:{ name:"Refroidisseur eau douce moteur", desc:"Refroidit l'eau douce (circuit fermé) du moteur principal avec l'eau de mer (circuit ouvert). Maintient la température d'eau douce à 70-90°C. Matériaux : titane ou acier inox pour résister à la corrosion de l'eau de mer.", temp:"Eau douce : 70-90°C → Eau de mer" },
      lo_cooler:{ name:"Refroidisseur huile de lubrification", desc:"Maintient la température d'huile entre 45-55°C (entrée moteur). Une température trop haute dégrade l'huile et réduit sa viscosité. Une température trop basse augmente la viscosité et les pertes mécaniques.", temp:"Huile : 45-55°C" },
      fo_heater:{ name:"Réchauffeur fuel oil (HFO)", desc:"Chauffe le HFO de 50°C (stockage) à 120-150°C (avant injection moteur). Utilise la vapeur ou l'eau chaude comme fluide chaud. La viscosité doit être ramenée à 10-20 cSt pour une injection correcte.", temp:"HFO : 50°C → 120-150°C" },
      charge_air:{ name:"Refroidisseur air de suralimentation", desc:"Refroidit l'air comprimé par le turbocompresseur avant son admission dans les cylindres. Plus l'air est froid, plus il est dense → meilleur remplissage → meilleure combustion → plus de puissance.", temp:"Air : 200°C → 40-50°C" },
      ece:{ name:"Économiseur (ECE) — récupération chaleur gaz", desc:"Récupère la chaleur des gaz d'échappement (350-400°C) pour produire de la vapeur ou chauffer l'eau. Améliore le rendement global de 5-10%. La vapeur produite alimente les réchauffeurs de HFO, l'eau sanitaire.", temp:"Gaz éch. : 350°C → Vapeur/eau chaude" },
    },
    fouling:{
      indicator1:{ name:"Différentiel de température (ΔT)", desc:"Un échangeur propre maintient un ΔT stable (ex : eau douce en sortie à 85°C). Si la température de sortie monte progressivement avec le même débit → encrassement → le transfert de chaleur se dégrade. Surveiller et tracer dans le journal machine." },
      indicator2:{ name:"Perte de charge (ΔP)", desc:"L'encrassement réduit la section de passage et augmente la résistance hydraulique. La différence de pression entrée/sortie augmente progressivement → indicateur fiable d'encrassement. Mesurer avec des manomètres différentiels." },
      indicator3:{ name:"Coefficient d'échange global (U)", desc:"U = Q / (A × ΔTML) où Q = puissance échangée, A = surface d'échange, ΔTML = différence de température logarithmique. Un U décroissant indique un encrassement. Calculer périodiquement et comparer aux valeurs nominales du constructeur." },
      indicator4:{ name:"Débit d'eau de refroidissement", desc:"Si le débit augmente pour maintenir la même température de sortie, c'est signe que le coefficient d'échange diminue (encrassement). Surveiller les débitmètres et noter toute augmentation anormale du débit." },
    },
    maintenance:{
      chemical:{ name:"Nettoyage chimique (CIP)", desc:"Circulation d'une solution acide (acide citrique, acide chlorhydrique dilué) ou basique (soude) dans l'échangeur pour dissoudre les dépôts calcaires et biologiques. Clean In Place — sans démontage pour les PHE. Rinçage abondant obligatoire après." },
      mechanical:{ name:"Nettoyage mécanique", desc:"Démontage des plaques (PHE) ou extraction des tubes (shell & tube). Nettoyage à la brosse haute pression, au jet d'eau, ou au jet de sable. Efficace sur les dépôts durs (corrosion, biofilm épais). Inspecter simultanément l'état des plaques et des joints." },
      backflush:{ name:"Contre-lavage (Backflush)", desc:"Inversion du sens de circulation d'un fluide pour déloger les dépôts. Efficace pour les salissures biologiques légères et les particules en suspension. Peut être automatisé avec des vannes motorisées." },
      inspection:{ name:"Inspection périodique", desc:"Inspection visuelle des plaques (corrosion, érosion, fissures), des joints (vieillissement, fissures), de l'état des connexions. Mesure de l'épaisseur des plaques et des tubes par ultrasons. Documenté dans le PMS (Planned Maintenance System)." },
    },
    practiceTitle:"Exercice pratique",
    questions:[
      { q:"Expliquez la différence entre un échangeur à contre-courant et un échangeur à co-courant. Lequel est plus efficace thermiquement ?",
        a:"Échangeur à co-courant (parallèle) : les deux fluides circulent dans le même sens. La différence de température est maximale à l'entrée et minimale à la sortie. Le fluide froid ne peut jamais atteindre une température supérieure à la température de sortie du fluide chaud. Échangeur à contre-courant : les deux fluides circulent en sens opposés. La différence de température est plus uniformément répartie le long de l'échangeur. Le fluide froid peut être chauffé au-delà de la température de sortie du fluide chaud. L'échangeur à contre-courant est plus efficace thermiquement : pour la même surface d'échange et les mêmes débits, il transfère plus de chaleur. Les PHE (échangeurs à plaques) travaillent naturellement en contre-courant et en multi-passes, ce qui explique leur excellente efficacité." },
      { q:"Qu'est-ce que l'encrassement (fouling) d'un échangeur de chaleur et quelles en sont les conséquences opérationnelles ?",
        a:"L'encrassement est le dépôt progressif de matières (tartre calcaire, biofilm, corrosion, particules) sur les surfaces d'échange de chaleur. Il crée une résistance thermique supplémentaire qui s'oppose au transfert de chaleur. Conséquences opérationnelles : Réduction de l'efficacité thermique : le coefficient global d'échange U diminue → le fluide à refroidir n'est plus suffisamment refroidi → la température de sortie monte. Augmentation de la consommation énergétique : pour compenser, on augmente le débit du fluide de refroidissement (plus de pompage) ou la surface chauffante. Risque de surchauffe : si un moteur n'est plus correctement refroidi → alarme haute température → réduction de charge ou arrêt. Perte de charge accrue : les dépôts réduisent la section de passage → plus de résistance hydraulique → consommation des pompes augmente. Indicateurs d'encrassement : ΔT anormal, ΔP élevé, débit de refroidissement augmenté pour maintenir la température." },
      { q:"Comment fonctionne la récupération de chaleur des gaz d'échappement (économiseur) et quels sont ses bénéfices pour le navire ?",
        a:"L'économiseur (ECE — Exhaust Gas Economizer) est un échangeur tubulaire installé dans la cheminée, dans le flux des gaz d'échappement du moteur principal (350-400°C). L'eau circule dans les tubes et est chauffée par les gaz. Selon la conception, l'économiseur produit : de la vapeur (économiseur à vapeur) ou de l'eau chaude (économiseur à eau). Bénéfices pour le navire : Production gratuite de vapeur et d'eau chaude : réduit ou élimine le besoin de chaudière auxiliaire (fuel économisé). Réchauffage du HFO : la vapeur de l'économiseur chauffe le HFO avant le purificateur et avant l'injection — sans brûler de combustible supplémentaire. Eau sanitaire chaude. Amélioration du rendement global : un économiseur bien dimensionné peut récupérer 5-10% de la puissance du moteur, soit une économie de fuel équivalente. Réduction des émissions : moins de combustion dans la chaudière → moins de NOx et SOx." },
    ],
    showAnswer:"Voir la correction", hideAnswer:"Masquer",
  },
  en:{
    moduleLabel:"ENGINE — AUXILIARIES",
    lessonTitle:"Heat Exchangers",
    intro:"Heat exchangers are everywhere on board: they cool engines, heat fuel, regulate lube oil temperature and allow exhaust gas heat recovery. Understanding their operation is essential for optimising vessel energy efficiency.",
    tabs:["📖 Content","✏️ Practice","📚 Question Bank","🎯 Quiz"],
    s1title:"🔧 Heat Exchanger Types",
    s1hint:"👆 Tap a type to see its characteristics",
    s2title:"🌡️ On-board Applications",
    s2hint:"👆 Tap an application for details",
    s3title:"📊 Fouling & Performance",
    s3hint:"👆 Tap an indicator for explanations",
    s4title:"🔩 Maintenance & Cleaning",
    s4hint:"👆 Tap a maintenance operation",
    keypoints:"Key Points",
    kp:[
      "Plate heat exchangers (PHE) are compact and easy to clean — modern standard",
      "Shell & tube exchangers withstand high pressures and temperatures",
      "Fouling reduces efficiency and increases energy consumption",
      "Exhaust gas heat recovery (ECE) improves overall vessel efficiency",
      "Flow and temperature must be monitored to detect fouling early",
    ],
    hxTypes:{
      plate:{ name:"Plate Heat Exchanger (PHE)", desc:"Corrugated metal plates stacked with gaskets. Hot and cold fluids flow alternately between plates. Advantages: compact, large exchange surface, easy to clean (dismantable), good heat transfer coefficient. Used for: HFO cooling, engine fresh water, lube oil, domestic water." },
      shelltube:{ name:"Shell & Tube Heat Exchanger", desc:"Tube bundle inside a cylindrical shell. One fluid flows inside tubes, the other around them. Advantages: robust, high pressure and temperature, adaptable to all fluids. Used for: seawater cooling (anticorrosion materials), condensers, high-pressure HFO heaters." },
      keel:{ name:"Keel cooler", desc:"Coils mounted on the submerged hull, cooled directly by external seawater without pumping. Advantages: no seawater pump, very reliable, reduced maintenance. Disadvantages: less effective in warm water, biofouling risk. Used on tugs, dredgers, special vessels." },
      airblast:{ name:"Air blast cooler", desc:"Fans forcing air over a finned tube bundle. No cooling water needed. Used to cool lube oil, fresh water in anchorage areas or drydock. Less effective in hot weather." },
    },
    applications:{
      fw_cooler:{ name:"Main engine fresh water cooler", desc:"Cools fresh water (closed circuit) from main engine with seawater (open circuit). Maintains fresh water temperature at 70-90°C. Materials: titanium or stainless steel for seawater corrosion resistance.", temp:"Fresh water: 70-90°C → Seawater" },
      lo_cooler:{ name:"Lube oil cooler", desc:"Maintains oil temperature between 45-55°C (engine inlet). Too high → oil degradation and reduced viscosity. Too low → increased viscosity and mechanical losses.", temp:"Oil: 45-55°C" },
      fo_heater:{ name:"Fuel oil heater (HFO)", desc:"Heats HFO from 50°C (storage) to 120-150°C (before engine injection). Uses steam or hot water as heating medium. Viscosity must be reduced to 10-20 cSt for correct injection.", temp:"HFO: 50°C → 120-150°C" },
      charge_air:{ name:"Charge air cooler", desc:"Cools turbocharger-compressed air before admission into cylinders. Cooler air is denser → better cylinder filling → better combustion → more power.", temp:"Air: 200°C → 40-50°C" },
      ece:{ name:"Economiser (ECE) — exhaust gas heat recovery", desc:"Recovers heat from exhaust gases (350-400°C) to produce steam or heat water. Improves overall efficiency by 5-10%. Steam produced feeds HFO heaters, domestic water.", temp:"Exh. gas: 350°C → Steam/hot water" },
    },
    fouling:{
      indicator1:{ name:"Temperature differential (ΔT)", desc:"A clean exchanger maintains stable ΔT (e.g. fresh water outlet at 85°C). If outlet temperature progressively rises with same flow → fouling → heat transfer degrading. Monitor and log in engine room log." },
      indicator2:{ name:"Pressure drop (ΔP)", desc:"Fouling reduces flow cross-section and increases hydraulic resistance. Inlet/outlet pressure difference progressively increases → reliable fouling indicator. Measure with differential pressure gauges." },
      indicator3:{ name:"Overall heat transfer coefficient (U)", desc:"U = Q / (A × LMTD) where Q = exchanged power, A = exchange surface, LMTD = log mean temperature difference. Decreasing U indicates fouling. Calculate periodically and compare with manufacturer nominal values." },
      indicator4:{ name:"Cooling water flow rate", desc:"If flow increases to maintain same outlet temperature, the heat transfer coefficient is decreasing (fouling). Monitor flow meters and note any abnormal flow increase." },
    },
    maintenance:{
      chemical:{ name:"Chemical cleaning (CIP)", desc:"Circulation of acid (citric acid, dilute hydrochloric acid) or alkaline (caustic soda) solution to dissolve scale and biological deposits. Clean In Place — without dismantling for PHEs. Thorough rinsing mandatory after." },
      mechanical:{ name:"Mechanical cleaning", desc:"Disassembly of plates (PHE) or tube extraction (shell & tube). Cleaning with high-pressure brush, water jet or sandblasting. Effective on hard deposits (corrosion, thick biofilm). Simultaneously inspect plate and gasket condition." },
      backflush:{ name:"Backflushing", desc:"Reversing flow direction to dislodge deposits. Effective for light biological fouling and suspended particles. Can be automated with motorised valves." },
      inspection:{ name:"Periodic inspection", desc:"Visual inspection of plates (corrosion, erosion, cracks), gaskets (ageing, cracks), connection condition. Ultrasonic plate and tube thickness measurement. Documented in PMS (Planned Maintenance System)." },
    },
    practiceTitle:"Practice Exercise",
    questions:[
      { q:"Explain the difference between a counter-current and co-current heat exchanger. Which is thermally more efficient?",
        a:"Co-current (parallel flow): both fluids flow in the same direction. Temperature difference is maximum at inlet and minimum at outlet. Cold fluid can never exceed the hot fluid outlet temperature. Counter-current: fluids flow in opposite directions. Temperature difference is more uniformly distributed along the exchanger. Cold fluid can be heated above the hot fluid outlet temperature. Counter-current is thermally more efficient: for the same exchange surface and flow rates, it transfers more heat. PHEs naturally work in counter-current multi-pass configuration, explaining their excellent efficiency." },
      { q:"What is heat exchanger fouling and what are its operational consequences?",
        a:"Fouling is the progressive deposition of matter (scale, biofilm, corrosion, particles) on heat exchange surfaces. It creates additional thermal resistance opposing heat transfer. Operational consequences: Reduced thermal efficiency: overall coefficient U decreases → fluid no longer sufficiently cooled → outlet temperature rises. Increased energy consumption: to compensate, cooling fluid flow is increased (more pumping) or heating surface increased. Overheating risk: if engine no longer properly cooled → high temperature alarm → load reduction or shutdown. Increased pressure drop: deposits reduce flow section → more hydraulic resistance → pump consumption increases. Fouling indicators: abnormal ΔT, high ΔP, increased cooling flow to maintain temperature." },
      { q:"How does exhaust gas heat recovery (economiser) work and what are its benefits for the vessel?",
        a:"The economiser (ECE — Exhaust Gas Economiser) is a shell & tube exchanger installed in the funnel, in the main engine exhaust gas flow (350-400°C). Water circulates in tubes and is heated by the gases. Depending on design, the economiser produces steam (steam economiser) or hot water (water economiser). Vessel benefits: Free steam and hot water production: reduces or eliminates auxiliary boiler need (fuel saved). HFO heating: economiser steam heats HFO before purifier and injection — without burning extra fuel. Domestic hot water. Overall efficiency improvement: a well-sized economiser can recover 5-10% of engine power, equivalent fuel saving. Emission reduction: less auxiliary boiler combustion → less NOx and SOx." },
    ],
    showAnswer:"Show answer", hideAnswer:"Hide",
  },
  es:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Intercambiadores de calor",
    intro:"Los intercambiadores de calor están en todas partes a bordo: enfrían motores, calientan el combustible, regulan la temperatura del aceite lubricante y permiten la recuperación de calor de los gases de escape.",
    tabs:["📖 Contenido","✏️ Práctica","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔧 Tipos de intercambiadores de calor",
    s1hint:"👆 Toca un tipo para ver sus características",
    s2title:"🌡️ Aplicaciones a bordo",
    s2hint:"👆 Toca una aplicación para los detalles",
    s3title:"📊 Ensuciamiento & Rendimiento",
    s3hint:"👆 Toca un indicador para las explicaciones",
    s4title:"🔩 Mantenimiento & Limpieza",
    s4hint:"👆 Toca una operación de mantenimiento",
    keypoints:"Puntos clave",
    kp:[
      "Los intercambiadores de placas (PHE) son compactos y fáciles de limpiar — estándar moderno",
      "Los intercambiadores de carcasa y tubos resisten altas presiones y temperaturas",
      "El ensuciamiento reduce la eficiencia y aumenta el consumo de energía",
      "La recuperación de calor de los gases de escape (ECE) mejora el rendimiento global",
      "El caudal y la temperatura deben vigilarse para detectar el ensuciamiento precozmente",
    ],
    hxTypes:{
      plate:{ name:"Intercambiador de placas (PHE)", desc:"Placas metálicas corrugadas apiladas con juntas. Los fluidos caliente y frío circulan alternativamente entre las placas. Ventajas: compacto, gran superficie de intercambio, fácil de limpiar (desmontable). Usado para: refrigeración HFO, agua dulce motor, aceite lubricante, agua sanitaria." },
      shelltube:{ name:"Intercambiador de carcasa y tubos", desc:"Haz de tubos en una carcasa cilíndrica. Un fluido circula por los tubos, el otro alrededor. Ventajas: robusto, alta presión y temperatura, adaptable. Usado para: refrigeración con agua de mar, condensadores, calentadores de HFO de alta presión." },
      keel:{ name:"Refrigerador de quilla (Keel cooler)", desc:"Serpentines montados en el casco sumergido, refrigerados directamente por el agua del mar sin bombeo. Ventajas: sin bomba de agua de mar, muy fiable. Inconvenientes: menos eficaz en agua caliente, riesgo de incrustaciones marinas." },
      airblast:{ name:"Refrigerador de aire (Air blast)", desc:"Ventiladores que fuerzan el aire sobre un haz de tubos con aletas. Sin agua de refrigeración. Usado para enfriar aceite y agua dulce en zonas de fondeo o en seco." },
    },
    applications:{
      fw_cooler:{ name:"Refrigerador de agua dulce del motor", desc:"Enfría el agua dulce (circuito cerrado) del motor principal con agua de mar. Mantiene la temperatura a 70-90°C. Materiales: titanio o acero inox.", temp:"Agua dulce: 70-90°C → Agua de mar" },
      lo_cooler:{ name:"Refrigerador de aceite lubricante", desc:"Mantiene la temperatura del aceite entre 45-55°C. Demasiado alta → degradación del aceite. Demasiado baja → mayor viscosidad y pérdidas mecánicas.", temp:"Aceite: 45-55°C" },
      fo_heater:{ name:"Calentador de fuel oil (HFO)", desc:"Calienta el HFO de 50°C (almacenamiento) a 120-150°C (antes de la inyección). Usa vapor o agua caliente. La viscosidad debe reducirse a 10-20 cSt.", temp:"HFO: 50°C → 120-150°C" },
      charge_air:{ name:"Refrigerador de aire de carga", desc:"Enfría el aire comprimido por el turbocompresor antes de la admisión. Aire más frío → más denso → mejor llenado → mejor combustión → más potencia.", temp:"Aire: 200°C → 40-50°C" },
      ece:{ name:"Economizador (ECE) — recuperación de calor de gases", desc:"Recupera el calor de los gases de escape (350-400°C) para producir vapor o calentar agua. Mejora el rendimiento global un 5-10%.", temp:"Gases esc.: 350°C → Vapor/agua caliente" },
    },
    fouling:{
      indicator1:{ name:"Diferencial de temperatura (ΔT)", desc:"Un intercambiador limpio mantiene un ΔT estable. Si la temperatura de salida sube progresivamente con el mismo caudal → ensuciamiento. Vigilar y registrar en el diario de máquinas." },
      indicator2:{ name:"Pérdida de carga (ΔP)", desc:"El ensuciamiento reduce la sección de paso y aumenta la resistencia hidráulica. La diferencia de presión entrada/salida aumenta progresivamente → indicador fiable." },
      indicator3:{ name:"Coeficiente global de intercambio (U)", desc:"U = Q / (A × ΔTML). Un U decreciente indica ensuciamiento. Calcular periódicamente y comparar con los valores nominales del fabricante." },
      indicator4:{ name:"Caudal de agua de refrigeración", desc:"Si el caudal aumenta para mantener la misma temperatura de salida, el coeficiente de intercambio disminuye (ensuciamiento). Vigilar los caudalímetros." },
    },
    maintenance:{
      chemical:{ name:"Limpieza química (CIP)", desc:"Circulación de solución ácida o básica para disolver depósitos calcáreos y biológicos. Clean In Place — sin desmontaje para PHE. Enjuague abundante obligatorio después." },
      mechanical:{ name:"Limpieza mecánica", desc:"Desmontaje de placas (PHE) o extracción de tubos (carcasa y tubos). Limpieza con cepillo de alta presión, chorro de agua o chorro de arena. Inspeccionar placas y juntas." },
      backflush:{ name:"Contralavado (Backflush)", desc:"Inversión del sentido de circulación para eliminar depósitos. Eficaz para incrustaciones biológicas leves. Puede automatizarse con válvulas motorizadas." },
      inspection:{ name:"Inspección periódica", desc:"Inspección visual de placas, juntas y conexiones. Medición del grosor por ultrasonidos. Documentado en el PMS." },
    },
    practiceTitle:"Ejercicio práctico",
    questions:[
      { q:"Explique la diferencia entre un intercambiador a contracorriente y uno en paralelo. ¿Cuál es más eficiente térmicamente?",
        a:"Paralelo (co-corriente): ambos fluidos circulan en el mismo sentido. ΔT máxima a la entrada, mínima a la salida. El fluido frío nunca puede superar la temperatura de salida del fluido caliente. Contracorriente: los fluidos circulan en sentidos opuestos. ΔT más uniformemente repartida. El fluido frío puede calentarse por encima de la temperatura de salida del fluido caliente. El intercambiador a contracorriente es más eficiente: para la misma superficie e iguales caudales, transfiere más calor. Los PHE trabajan naturalmente a contracorriente." },
      { q:"¿Qué es el ensuciamiento de un intercambiador y cuáles son sus consecuencias operacionales?",
        a:"El ensuciamiento es el depósito progresivo de materias (incrustaciones, biofilm, corrosión) en las superficies de intercambio. Crea resistencia térmica adicional. Consecuencias: reducción del rendimiento térmico (U disminuye), mayor consumo energético (más bombeo), riesgo de sobrecalentamiento, mayor pérdida de carga. Indicadores: ΔT anormal, ΔP elevado, caudal de refrigeración aumentado." },
      { q:"¿Cómo funciona el economizador (ECE) y cuáles son sus beneficios para el buque?",
        a:"El ECE es un intercambiador de carcasa y tubos en la chimenea. Los gases de escape a 350-400°C calientan el agua que circula por los tubos, produciendo vapor o agua caliente. Beneficios: producción gratuita de vapor y agua caliente (ahorro de combustible de la caldera auxiliar), calentamiento del HFO sin combustible adicional, agua sanitaria caliente, mejora del rendimiento global 5-10%, reducción de emisiones." },
    ],
    showAnswer:"Ver corrección", hideAnswer:"Ocultar",
  },
  pt:{
    moduleLabel:"MÁQUINAS — AUXILIARES",
    lessonTitle:"Permutadores de calor",
    intro:"Os permutadores de calor estão em todo o lado a bordo: arrefecem motores, aquecem o combustível, regulam a temperatura do óleo lubrificante e permitem a recuperação de calor dos gases de escape.",
    tabs:["📖 Conteúdo","✏️ Prática","📚 Banco Q.","🎯 Quiz"],
    s1title:"🔧 Tipos de permutadores de calor",
    s1hint:"👆 Toque num tipo para ver as características",
    s2title:"🌡️ Aplicações a bordo",
    s2hint:"👆 Toque numa aplicação para os detalhes",
    s3title:"📊 Incrustação & Desempenho",
    s3hint:"👆 Toque num indicador para as explicações",
    s4title:"🔩 Manutenção & Limpeza",
    s4hint:"👆 Toque numa operação de manutenção",
    keypoints:"Pontos-chave",
    kp:[
      "Os permutadores de placas (PHE) são compactos e fáceis de limpar — padrão moderno",
      "Os permutadores de casco e tubos resistem a altas pressões e temperaturas",
      "A incrustação reduz a eficiência e aumenta o consumo de energia",
      "A recuperação de calor dos gases de escape (ECE) melhora o rendimento global",
      "O caudal e a temperatura devem ser monitorizados para detetar incrustação precocemente",
    ],
    hxTypes:{
      plate:{ name:"Permutador de placas (PHE)", desc:"Placas metálicas onduladas empilhadas com juntas. Os fluidos quente e frio circulam alternadamente entre as placas. Vantagens: compacto, grande superfície de troca, fácil de limpar (desmontável). Usado para: arrefecimento HFO, água doce motor, óleo lubrificante, água sanitária." },
      shelltube:{ name:"Permutador de casco e tubos", desc:"Feixe de tubos numa carcaça cilíndrica. Um fluido circula nos tubos, o outro à volta. Vantagens: robusto, alta pressão e temperatura, adaptável. Usado para: arrefecimento com água do mar, condensadores, aquecedores de HFO de alta pressão." },
      keel:{ name:"Arrefecedor de quilha (Keel cooler)", desc:"Serpentinas montadas no casco submerso, arrefecidas diretamente pela água do mar sem bombagem. Vantagens: sem bomba de água do mar, muito fiável. Desvantagens: menos eficaz em água quente, risco de incrustações marinhas." },
      airblast:{ name:"Arrefecedor a ar (Air blast)", desc:"Ventiladores que forçam ar sobre um feixe de tubos com alhetas. Sem água de arrefecimento. Usado para arrefecer óleo e água doce em zonas de fundeio ou doca seca." },
    },
    applications:{
      fw_cooler:{ name:"Arrefecedor de água doce do motor", desc:"Arrefece a água doce (circuito fechado) do motor principal com água do mar. Mantém temperatura a 70-90°C. Materiais: titânio ou aço inox.", temp:"Água doce: 70-90°C → Água do mar" },
      lo_cooler:{ name:"Arrefecedor de óleo lubrificante", desc:"Mantém temperatura do óleo entre 45-55°C. Demasiado alta → degradação do óleo. Demasiado baixa → maior viscosidade e perdas mecânicas.", temp:"Óleo: 45-55°C" },
      fo_heater:{ name:"Aquecedor de fuel oil (HFO)", desc:"Aquece o HFO de 50°C (armazenamento) a 120-150°C (antes da injeção). Usa vapor ou água quente. Viscosidade deve ser reduzida a 10-20 cSt.", temp:"HFO: 50°C → 120-150°C" },
      charge_air:{ name:"Arrefecedor de ar de carga", desc:"Arrefece o ar comprimido pelo turbocompressor antes da admissão. Ar mais frio → mais denso → melhor enchimento → melhor combustão → mais potência.", temp:"Ar: 200°C → 40-50°C" },
      ece:{ name:"Economizador (ECE) — recuperação de calor dos gases", desc:"Recupera o calor dos gases de escape (350-400°C) para produzir vapor ou aquecer água. Melhora o rendimento global 5-10%.", temp:"Gases esc.: 350°C → Vapor/água quente" },
    },
    fouling:{
      indicator1:{ name:"Diferencial de temperatura (ΔT)", desc:"Um permutador limpo mantém um ΔT estável. Se a temperatura de saída sobe progressivamente com o mesmo caudal → incrustação. Monitorizar e registar no diário de máquinas." },
      indicator2:{ name:"Queda de pressão (ΔP)", desc:"A incrustação reduz a secção de passagem e aumenta a resistência hidráulica. A diferença de pressão entrada/saída aumenta progressivamente → indicador fiável." },
      indicator3:{ name:"Coeficiente global de troca (U)", desc:"U = Q / (A × DTML). Um U decrescente indica incrustação. Calcular periodicamente e comparar com os valores nominais do fabricante." },
      indicator4:{ name:"Caudal de água de arrefecimento", desc:"Se o caudal aumenta para manter a mesma temperatura de saída, o coeficiente de troca diminui (incrustação). Monitorizar os caudalímetros." },
    },
    maintenance:{
      chemical:{ name:"Limpeza química (CIP)", desc:"Circulação de solução ácida ou alcalina para dissolver depósitos calcários e biológicos. Clean In Place — sem desmontagem para PHE. Enxaguamento abundante obrigatório depois." },
      mechanical:{ name:"Limpeza mecânica", desc:"Desmontagem de placas (PHE) ou extração de tubos (casco e tubos). Limpeza com escova de alta pressão, jacto de água ou jacto de areia. Inspecionar placas e juntas." },
      backflush:{ name:"Contra-lavagem (Backflush)", desc:"Inversão do sentido de circulação para eliminar depósitos. Eficaz para incrustações biológicas leves. Pode ser automatizado com válvulas motorizadas." },
      inspection:{ name:"Inspeção periódica", desc:"Inspeção visual de placas, juntas e ligações. Medição da espessura por ultrassons. Documentado no PMS." },
    },
    practiceTitle:"Exercício prático",
    questions:[
      { q:"Explique a diferença entre um permutador a contracorrente e um em paralelo. Qual é mais eficiente termicamente?",
        a:"Paralelo (co-corrente): ambos os fluidos circulam no mesmo sentido. ΔT máxima na entrada, mínima na saída. O fluido frio nunca pode superar a temperatura de saída do fluido quente. Contracorrente: os fluidos circulam em sentidos opostos. ΔT mais uniformemente distribuída. O fluido frio pode ser aquecido acima da temperatura de saída do fluido quente. O permutador a contracorrente é mais eficiente. Os PHE trabalham naturalmente em contracorrente." },
      { q:"O que é a incrustação de um permutador e quais são as suas consequências operacionais?",
        a:"A incrustação é o depósito progressivo de matérias (incrustações, biofilme, corrosão) nas superfícies de troca. Cria resistência térmica adicional. Consequências: redução do rendimento térmico (U diminui), maior consumo energético (mais bombagem), risco de sobreaquecimento, maior queda de pressão. Indicadores: ΔT anormal, ΔP elevado, caudal de arrefecimento aumentado." },
      { q:"Como funciona o economizador (ECE) e quais são os seus benefícios para o navio?",
        a:"O ECE é um permutador de casco e tubos na chaminé. Os gases de escape a 350-400°C aquecem a água que circula nos tubos, produzindo vapor ou água quente. Benefícios: produção gratuita de vapor e água quente (poupança de combustível da caldeira auxiliar), aquecimento do HFO sem combustível adicional, água sanitária quente, melhoria do rendimento global 5-10%, redução de emissões." },
    ],
    showAnswer:"Ver correção", hideAnswer:"Ocultar",
  },
};

// ── SVG 1 — HX TYPES ──────────────────────────────────────────
function HXTypesSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("plate");
  const types = t.hxTypes;
  const typeColors: Record<string,string> = {plate:C.plate,shelltube:C.shell,keel:C.cool,airblast:C.tube};

  const svgs: Record<string,JSX.Element> = {
    plate:(
      <g>
        {/* Stack of plates */}
        {[20,32,44,56,68,80].map((x,i)=>(
          <g key={i}>
            <rect x={x} y="30" width="4" height="100" rx="1"
              fill={i%2===0?C.heat:C.cool} opacity={0.6} stroke={i%2===0?C.heat:C.cool} strokeWidth="0.5"/>
          </g>
        ))}
        {/* Hot flow */}
        <line x1="10" y1="45" x2="20" y2="45" stroke={C.heat} strokeWidth="1.5"/>
        <line x1="84" y1="45" x2="100" y2="45" stroke={C.heat} strokeWidth="1.5"/>
        <text x="5" y="48" fontSize="6" fill={C.heat} fontFamily="Courier New" textAnchor="end">HOT</text>
        <text x="105" y="48" fontSize="6" fill={C.heat} fontFamily="Courier New">OUT</text>
        {/* Cold flow */}
        <line x1="84" y1="110" x2="100" y2="110" stroke={C.cool} strokeWidth="1.5"/>
        <line x1="10" y1="110" x2="20" y2="110" stroke={C.cool} strokeWidth="1.5"/>
        <text x="5" y="113" fontSize="6" fill={C.cool} fontFamily="Courier New" textAnchor="end">OUT</text>
        <text x="105" y="113" fontSize="6" fill={C.cool} fontFamily="Courier New">COLD</text>
        {/* Arrows showing counter-current */}
        <text x="55" y="15" fontSize="7" fill={C.heat} fontFamily="Courier New" textAnchor="middle">← HOT</text>
        <text x="55" y="145" fontSize="7" fill={C.cool} fontFamily="Courier New" textAnchor="middle">COLD →</text>
        <text x="55" y="158" fontSize="7" fill={C.plate} fontFamily="Courier New" textAnchor="middle">PHE — COUNTER-CURRENT</text>
      </g>
    ),
    shelltube:(
      <g>
        {/* Shell */}
        <rect x="10" y="50" width="140" height="70" rx="6" fill="none" stroke={C.shell} strokeWidth="2"/>
        {/* Tubes */}
        {[65,80,95,110].map((y,i)=>(
          <line key={i} x1="10" y1={y} x2="150" y2={y} stroke={C.tube} strokeWidth="3" opacity={0.7}/>
        ))}
        {/* Baffles */}
        {[45,85].map((x,i)=>(
          <line key={i} x1={x} y1={i%2===0?50:95} x2={x} y2={i%2===0?95:120} stroke={C.shell} strokeWidth="2" opacity={0.5}/>
        ))}
        {/* In/out shell */}
        <line x1="30" y1="50" x2="30" y2="35" stroke={C.heat} strokeWidth="1.5"/>
        <text x="30" y="32" fontSize="6" fill={C.heat} fontFamily="Courier New" textAnchor="middle">HOT IN</text>
        <line x1="120" y1="120" x2="120" y2="135" stroke={C.heat} strokeWidth="1.5"/>
        <text x="120" y="142" fontSize="6" fill={C.heat} fontFamily="Courier New" textAnchor="middle">HOT OUT</text>
        {/* In/out tubes */}
        <text x="5" y="83" fontSize="6" fill={C.tube} fontFamily="Courier New" textAnchor="end">COLD</text>
        <text x="155" y="83" fontSize="6" fill={C.tube} fontFamily="Courier New">OUT</text>
        <text x="80" y="158" fontSize="7" fill={C.shell} fontFamily="Courier New" textAnchor="middle">SHELL & TUBE</text>
      </g>
    ),
    keel:(
      <g>
        {/* Ship hull */}
        <path d="M20 60 Q80 110 140 60" fill="none" stroke={C.cool} strokeWidth="3" opacity={0.4}/>
        {/* Keel coils */}
        {[0,1,2,3].map(i=>(
          <ellipse key={i} cx={40+i*25} cy={85+i*3} rx="8" ry="12" fill="none" stroke={C.heat} strokeWidth="2"/>
        ))}
        {/* Sea water arrows */}
        <line x1="20" y1="130" x2="140" y2="130" stroke={C.cool} strokeWidth="1.5" strokeDasharray="4,3"/>
        <text x="80" y="143" fontSize="6" fill={C.cool} fontFamily="Courier New" textAnchor="middle">SEA WATER FLOW</text>
        <text x="80" y="158" fontSize="7" fill={C.cool} fontFamily="Courier New" textAnchor="middle">KEEL COOLER — no pump</text>
      </g>
    ),
    airblast:(
      <g>
        {/* Finned tubes */}
        {[30,55,80,105].map((x,i)=>(
          <g key={i}>
            <line x1={x} y1="40" x2={x} y2="120" stroke={C.heat} strokeWidth="3"/>
            {[50,65,80,95,110].map((y,j)=>(
              <line key={j} x1={x-8} y1={y} x2={x+8} y2={y} stroke={C.heat} strokeWidth="1" opacity={0.5}/>
            ))}
          </g>
        ))}
        {/* Fan */}
        <circle cx="80" cy="155" r="15" fill="none" stroke={C.tube} strokeWidth="1.5"/>
        {[0,60,120,180,240,300].map((a,i)=>{
          const r=a*Math.PI/180;
          return <line key={i} x1="80" y1="155" x2={80+14*Math.cos(r)} y2={155+14*Math.sin(r)} stroke={C.tube} strokeWidth="1.5"/>;
        })}
        {/* Air arrows */}
        {[40,70,100].map((x,i)=>(
          <line key={i} x1={x} y1="135" x2={x} y2="145" stroke={C.cool} strokeWidth="1" markerEnd="url(#arrowCool)"/>
        ))}
        <text x="80" y="20" fontSize="7" fill={C.heat} fontFamily="Courier New" textAnchor="middle">AIR BLAST COOLER</text>
        <defs><marker id="arrowCool" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.cool}/></marker></defs>
      </g>
    ),
  };

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.heat}33`}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(types).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            flex:1,padding:"7px 4px",borderRadius:10,fontSize:10,cursor:"pointer",
            background:sel===key?`${typeColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?typeColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?typeColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",textAlign:"center",
          }}>{key==="plate"?"PHE":key==="shelltube"?"S&T":key==="keel"?"KEEL":"AIR"}</button>
        ))}
      </div>
      <svg viewBox="0 0 160 170" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto",background:`${C.navy3}66`,borderRadius:8}}>
        {svgs[sel]}
      </svg>
      <div style={{marginTop:10,padding:10,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${typeColors[sel]||C.heat}44`,fontSize:12,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>
        <div style={{color:C.gold2,fontWeight:700,marginBottom:4}}>{types[sel].name}</div>
        {types[sel].desc}
      </div>
    </div>
  );
}

// ── SVG 2 — APPLICATIONS ─────────────────────────────────────
function ApplicationsSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("fw_cooler");
  const apps = t.applications;
  const appColors: Record<string,string> = {fw_cooler:C.cool,lo_cooler:C.shell,fo_heater:C.heat,charge_air:C.plate,ece:C.tube};
  const icons: Record<string,string> = {fw_cooler:"💧",lo_cooler:"🛢️",fo_heater:"🔥",charge_air:"💨",ece:"♻️"};

  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.shell}33`}}>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
        {Object.entries(apps).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{
            flex:1,padding:"7px 4px",borderRadius:10,fontSize:10,cursor:"pointer",minWidth:40,
            background:sel===key?`${appColors[key]}22`:"rgba(255,255,255,0.04)",
            border:`1px solid ${sel===key?appColors[key]:"rgba(255,255,255,0.1)"}`,
            color:sel===key?appColors[key]:"rgba(240,244,255,0.45)",
            fontFamily:"Courier New",textAlign:"center",
          }}>{icons[key]}</button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${appColors[sel]||C.shell}44`,minHeight:100}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:appColors[sel]||C.shell,fontWeight:700,marginBottom:6}}>{icons[sel]} {apps[sel].name}</div>
        <div style={{fontSize:11,color:appColors[sel],fontWeight:700,marginBottom:8,fontFamily:"Courier New"}}>🌡️ {apps[sel].temp}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{apps[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 3 — FOULING INDICATORS ────────────────────────────────
function FoulingSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("indicator1");
  const fouling = t.fouling;
  const fColors: Record<string,string> = {indicator1:C.heat,indicator2:C.cool,indicator3:C.plate,indicator4:C.shell};
  const icons: Record<string,string> = {indicator1:"🌡️",indicator2:"📊",indicator3:"📈",indicator4:"💧"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.fouling}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(fouling).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${fColors[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?fColors[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${fColors[sel]||C.fouling}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:fColors[sel]||C.fouling,fontWeight:700,marginBottom:8}}>{icons[sel]} {fouling[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{fouling[sel].desc}</div>
      </div>
    </div>
  );
}

// ── SVG 4 — MAINTENANCE ───────────────────────────────────────
function MaintenanceSVG({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const [sel,setSel] = useState<string>("chemical");
  const maint = t.maintenance;
  const mColors: Record<string,string> = {chemical:C.heat,mechanical:C.plate,backflush:C.cool,inspection:C.shell};
  const icons: Record<string,string> = {chemical:"🧪",mechanical:"🔧",backflush:"🔄",inspection:"🔍"};
  return (
    <div style={{background:`${C.navy2}cc`,borderRadius:14,padding:14,border:`1px solid ${C.plate}33`}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {Object.entries(maint).map(([key,val]:any)=>(
          <button key={key} onClick={()=>setSel(key)} style={{flex:1,padding:"8px 4px",borderRadius:10,fontSize:14,cursor:"pointer",background:sel===key?`${mColors[key]}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===key?mColors[key]:"rgba(255,255,255,0.1)"}`,textAlign:"center"}}>
            {icons[key]}
          </button>
        ))}
      </div>
      <div style={{padding:12,borderRadius:10,background:`${C.navy3}cc`,border:`1px solid ${mColors[sel]||C.plate}44`,minHeight:80}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:mColors[sel]||C.plate,fontWeight:700,marginBottom:8}}>{icons[sel]} {maint[sel].name}</div>
        <div style={{fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{maint[sel].desc}</div>
      </div>
    </div>
  );
}

// ── CONTENT TAB ───────────────────────────────────────────────
function ContentTab({ lang }: { lang: string }) {
  const t = T[lang]||T.fr;
  const section=(title:string,children:React.ReactNode,color=C.heat)=>(
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
      {section(t.s1title,<HXTypesSVG lang={lang}/>,C.heat)}
      {section(t.s2title,<ApplicationsSVG lang={lang}/>,C.shell)}
      {section(t.s3title,<FoulingSVG lang={lang}/>,C.fouling)}
      {section(t.s4title,<MaintenanceSVG lang={lang}/>,C.plate)}
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
        <div key={i} style={{marginBottom:14,borderRadius:14,background:`${C.navy2}cc`,border:`1px solid ${C.heat}33`,overflow:"hidden"}}>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.heat,letterSpacing:1,marginBottom:6,fontFamily:"'Cinzel',serif"}}>Q{i+1}</div>
            <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New"}}>{q.q}</div>
          </div>
          <div style={{padding:"0 14px 12px"}}>
            <button onClick={()=>toggle(i)} style={{padding:"7px 14px",borderRadius:8,fontSize:11,cursor:"pointer",background:shown[i]?`${C.heat}22`:"rgba(255,255,255,0.06)",border:`1px solid ${shown[i]?C.heat:"rgba(255,255,255,0.15)"}`,color:shown[i]?C.heat:"rgba(240,244,255,0.5)",fontFamily:"Courier New"}}>{shown[i]?t.hideAnswer:t.showAnswer}</button>
            {shown[i]&&<div style={{marginTop:10,padding:12,borderRadius:10,background:`${C.navy3}cc`,borderLeft:`3px solid ${C.heat}`,fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{q.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
// LessonE2_L6 — PART 2: Bank + Quiz + Main

function getBank(lang: string) {
  const b: any = {
    fr:[
      {q:"Qu'est-ce que la DTLM (Différence de Température Logarithmique Moyenne) et pourquoi l'utilise-t-on pour les échangeurs ?",a:"La DTLM (ou LMTD — Log Mean Temperature Difference) est la moyenne logarithmique des différences de température entre les deux fluides aux deux extrémités d'un échangeur. On l'utilise car dans un échangeur, la différence de température entre les fluides varie le long de l'appareil. La DTLM donne la valeur moyenne 'effective' de cette différence. Formule : DTLM = (ΔT1 - ΔT2) / ln(ΔT1/ΔT2). Utilisée dans la formule de puissance échangée : Q = U × A × DTLM, où U = coefficient global d'échange, A = surface d'échange. Un échangeur à contre-courant a toujours une DTLM supérieure à un échangeur à co-courant pour les mêmes conditions d'entrée/sortie."},
      {q:"Quels sont les matériaux utilisés pour les échangeurs en contact avec l'eau de mer et pourquoi ?",a:"L'eau de mer est très corrosive (salinité, chlorures). Matériaux utilisés : Titane : résistance exceptionnelle à la corrosion marine, léger, long service. Standard pour les PHE en contact eau de mer. Cupronickel (70/30 ou 90/10) : alliage cuivre-nickel résistant à l'eau de mer. Utilisé pour les tubulaires. Acier inoxydable 316L (Austénitique) : bonne résistance mais pas idéal en eau chaude stagnante (risque de corrosion par piqûres). Laiton naval : pour les boîtes de distribution des tubulaires. Alliages à base de nickel : pour les hautes températures. À éviter absolument : acier au carbone ordinaire (rouille rapide), aluminium (attaque chlorures). Le choix dépend de la température, vitesse de circulation et teneur en oxygène de l'eau de mer."},
      {q:"Comment fonctionne un échangeur à plaques (PHE) et quelles sont ses limites d'utilisation ?",a:"Fonctionnement : Des plaques métalliques corrugées (ondulées) sont empilées et serrées entre deux plateaux (one fixed, one mobile). Les joints d'étanchéité sur chaque plaque créent des canaux alternés pour les deux fluides. La corrugation crée une turbulence qui améliore le transfert thermique. Les passages sont en général en contre-courant. Avantages : coefficient U très élevé (2000-8000 W/m²K), compact, facile à nettoyer (démontage simple), surface ajustable (ajout/retrait de plaques). Limites : pression maximale ~25 bar (limite des joints), température maximale 200°C (limite des joints). Fluides propres ou peu chargés (risque de colmatage entre plaques). Fluides non visqueux (résistance hydraulique élevée si fluide visqueux). Risque de fuite si joints usés (maintenance des joints importante)."},
      {q:"Qu'est-ce que la résistance d'encrassement (fouling factor) et comment affecte-t-elle la conception d'un échangeur ?",a:"La résistance d'encrassement (Rf) est une résistance thermique supplémentaire ajoutée lors du calcul de conception pour tenir compte de la dégradation prévisible des surfaces d'échange au cours du temps. Elle est exprimée en m²K/W. Valeurs typiques : Eau de mer : Rf = 0,0001 m²K/W. Eau douce : Rf = 0,00017 m²K/W. HFO : Rf = 0,0002 m²K/W. Impact sur la conception : Le concepteur calcule l'échangeur avec U = 1/(1/h_hot + Rf_hot + e/λ + Rf_cold + 1/h_cold) où e/λ est la résistance de la paroi. La présence du facteur d'encrassement impose une surface d'échange plus grande que le strict minimum théorique — généralement 20-40% de surface supplémentaire. Résultat : l'échangeur neuf est 'surdimensionné' par rapport aux conditions de service, ce qui lui donne une marge opérationnelle jusqu'au prochain nettoyage."},
      {q:"Comment maintenir un PHE (échangeur à plaques) et à quelle fréquence ?",a:"Maintenance d'un PHE : Surveillance continue : surveiller ΔP entrée/sortie de chaque côté, températures entrée/sortie, détecter toute augmentation anormale de ΔP ou de température. Nettoyage chimique CIP (tous les 6-12 mois selon usage) : circuler une solution acide (acide citrique 5%) pour dissoudre le tartre, rincer à l'eau douce propre, inspecter les paramètres après. Nettoyage mécanique et inspection des joints (tous les 2-4 ans ou selon indication) : démonter entièrement (plaques, joints), nettoyer chaque plaque au jet haute pression, inspecter les plaques (corrosion, érosion, déformation), remplacer les joints élastomères vieillis (joint EPDM ou NBR selon fluide), remonter en respectant le serrage prescrit. Remplacement des joints (périodique ou si fuite) : les joints se compriment avec le temps et durcissent → fuites entre compartiments. Coût important mais indispensable."},
      {q:"Qu'est-ce qu'un économiseur de chaleur des gaz d'échappement (ECE) et comment est-il intégré dans le système du navire ?",a:"L'économiseur des gaz d'échappement (ECE — Exhaust Gas Economiser ou EGE) est un échangeur de chaleur tubulaire installé dans le circuit des gaz d'échappement du moteur principal, entre le turbocompresseur et la cheminée. Les gaz d'échappement (350-400°C) circulent à l'extérieur des tubes. L'eau de production ou l'eau de chaudière circule à l'intérieur. Il produit de la vapeur saturée (6-8 bar) ou de l'eau chaude. Intégration dans le système navire : Cette vapeur alimente les réchauffeurs de HFO (avant le purificateur et avant l'injection), le groupe vapeur pour le chauffage des locaux, la production d'eau douce (évaporateurs), les éjecteurs, les sécheurs. Bénéfices chiffrés : un moteur principal de 10 MW produit environ 1-2 MW de chaleur récupérable dans les gaz d'échappement. Sans ECE : toute cette chaleur est perdue à la cheminée. Avec ECE : économie de 150-300 kg/h de HFO pour la chaudière auxiliaire."},
      {q:"Comment détecter une fuite entre circuits dans un échangeur de chaleur ?",a:"Détection d'une fuite entre circuits : Symptômes : présence d'huile dans l'eau douce (ou inversement), présence d'eau dans l'huile lubrifiante, contamination du HFO par l'eau, pression anormale dans un circuit (si les pressions sont différentes). Tests de détection : Test de pression : mettre un circuit sous pression (air comprimé 2-3 bar) et observer si l'autre circuit se pressurise → fuite confirmée. Analyse des fluides : prélever un échantillon de chaque fluide et analyser (huile dans l'eau → test émulsion, eau dans l'huile → centrifugation). Inspection visuelle après démontage : sur un PHE, inspecter chaque plaque à la lumière — les fissures apparaissent comme des lignes sombres. Test UV : fluorescéine UV ajoutée à un circuit → détection sous UV si passage dans l'autre circuit. Sur un échangeur tubulaire : test hydrostatique tube par tube (bouchage sélectif des tubes défectueux possible)."},
      {q:"Qu'est-ce que l'effet du débit sur l'efficacité d'un échangeur de chaleur ?",a:"L'effet du débit sur l'efficacité d'un échangeur : Un débit trop faible : Nombre de Reynolds (Re = ρ×v×D/μ) trop bas → régime laminaire → coefficient d'échange h faible (mauvaise turbulence) → mauvais transfert de chaleur. Risque de dépôts et de croissance biologique (eau stagnante). Un débit trop élevé : Pertes de charge trop importantes → consommation des pompes → coût énergétique. Risque d'érosion des plaques et des tubes (vitesses excessives). Point optimal : vitesse de circulation dans les canaux d'un PHE : 0,3 à 1,5 m/s. Dans un échangeur tubulaire : 0,5 à 2 m/s dans les tubes. Cette plage assure un régime turbulent (bon transfert) sans érosion ni pertes de charge excessives."},
      {q:"Pourquoi le refroidisseur d'air de suralimentation est-il si important pour les performances du moteur ?",a:"Le refroidisseur d'air de suralimentation (charge air cooler) refroidit l'air comprimé par le turbocompresseur avant son admission dans les cylindres. Importance pour les performances : L'air chaud est moins dense (même volume = moins de masse d'air). L'air froid est plus dense (même volume = plus de masse d'air). Plus d'air = plus d'oxygène = plus de fuel peut être injecté = plus de puissance. Exemple : un air à 200°C refroidi à 45°C augmente la densité d'environ 45% → 45% de carburant supplémentaire peut être injecté → puissance augmentée. Impact sur la température des gaz d'échappement : un air bien refroidi permet une combustion plus complète et réduit la température des gaz d'échappement → moins de contraintes thermiques sur les pistons et les soupapes. Un refroidisseur d'air encrassé ou inefficace entraîne : réduction de puissance moteur, augmentation de la consommation spécifique, température gaz d'échappement plus élevée."},
      {q:"Comment fonctionne un keel cooler (refroidisseur à quille) et dans quels contextes est-il préféré ?",a:"Le keel cooler est un système de refroidissement sans eau de mer pompée. Des serpentins en cupronickel ou en acier inox sont soudés sur la coque extérieure du navire, sous la ligne de flottaison. Le fluide à refroidir (eau douce moteur, huile hydraulique) circule dans les serpentins et est refroidi directement par le contact avec l'eau de mer extérieure à travers la paroi métallique. Avantages : Pas de pompe eau de mer → moins de maintenance, pas d'échangeur en contact direct avec l'eau de mer (pas de corrosion interne), très fiable (pas de pièces mobiles), maintenance réduite. Contextes d'utilisation privilégiés : Navires évoluant en zone polaire ou arctique (eau de mer très froide → refroidissement efficace), remorqueurs et navires de servitude (navires souvent à quai → ventilation limitée), dragues (eau chargée en sable → usure des pompes eau de mer), navires à coque composite ou aluminium (évite la corrosion galvanique). Inconvénients : moins efficace en eau chaude tropicale, nécessite un nettoyage régulier des salissures marines sur les serpentins."},
      {q:"Quelles sont les précautions à prendre lors du nettoyage chimique d'un échangeur de chaleur ?",a:"Précautions lors du nettoyage chimique (CIP) : Choix du produit chimique adapté : tartre calcaire → acide citrique ou acide chlorhydrique dilué (5-10%). Dépôts biologiques (biofilm) → solution basique + biocide. Huile carbonisée → solution alcaline chaude. Compatibilité matériau : ne jamais utiliser d'acide chlorhydrique sur l'acier inox (attaque par piqûres). Vérifier la compatibilité avec les joints (NBR, EPDM). Précautions de sécurité : EPI obligatoires (lunettes, gants résistants aux acides, tablier). Travailler dans un endroit ventilé. Avoir du bicarbonate ou de la chaux pour neutralisation en cas de déversement. Séquence correcte : rinçage eau douce d'abord pour éliminer les gros dépôts, puis circulation du produit chimique (durée selon concentration et dépôts), rinçage abondant eau douce (pH de l'effluent doit être neutre). Documentation : consigner le produit utilisé, la concentration, la durée, les résultats dans le registre de maintenance. Certains produits chimiques ont des restrictions de rejet en mer (MARPOL)."},
      {q:"Comment évaluer le coefficient global d'échange (U) d'un échangeur en service ?",a:"Évaluation du coefficient U en service : 1. Relever les paramètres en fonctionnement : débits des deux fluides (m³/h), températures entrée et sortie des deux fluides (°C). 2. Calculer la puissance échangée : Q = m_dot × Cp × ΔT (en W), où m_dot = débit massique (kg/s), Cp = chaleur spécifique du fluide (J/kg·K), ΔT = différence de température (K). 3. Calculer la DTLM : ΔT1 = T_hot_in - T_cold_out, ΔT2 = T_hot_out - T_cold_in, DTLM = (ΔT1 - ΔT2) / ln(ΔT1/ΔT2). 4. Calculer U : U = Q / (A × DTLM), où A = surface d'échange (connue du constructeur). 5. Comparer U mesuré au U nominal du constructeur. Si U mesuré < 0,7 × U nominal → encrassement → nettoyage nécessaire. Cette méthode permet de planifier les nettoyages de façon préventive plutôt que curative."},
    ],
    en:[
      {q:"What is LMTD (Log Mean Temperature Difference) and why is it used for heat exchangers?",a:"LMTD is the logarithmic mean of temperature differences between the two fluids at both exchanger ends. Used because temperature difference between fluids varies along the exchanger. LMTD gives the effective average value. Formula: LMTD = (ΔT1 - ΔT2) / ln(ΔT1/ΔT2). Used in heat exchange formula: Q = U × A × LMTD. A counter-current exchanger always has higher LMTD than co-current for same inlet/outlet conditions."},
      {q:"What materials are used for heat exchangers in contact with seawater and why?",a:"Seawater is highly corrosive. Materials used: Titanium: exceptional marine corrosion resistance, light, long service. Standard for PHEs in seawater contact. Cupronickel (70/30 or 90/10): copper-nickel alloy resistant to seawater. Used for shell & tube. Stainless steel 316L: good resistance but not ideal in warm stagnant water (pitting risk). Naval brass: for shell & tube distribution boxes. Nickel-based alloys: for high temperatures. Never use: ordinary carbon steel (rapid rusting), aluminium (chloride attack). Choice depends on temperature, flow velocity and seawater oxygen content."},
      {q:"How does a PHE (plate heat exchanger) work and what are its limitations?",a:"Operation: Corrugated metal plates stacked and clamped between two frames. Gaskets on each plate create alternating channels for two fluids. Corrugation creates turbulence improving heat transfer. Generally counter-current flow. Advantages: very high U coefficient (2000-8000 W/m²K), compact, easy to clean, adjustable surface. Limitations: maximum pressure ~25 bar (gasket limit), maximum temperature 200°C (gasket limit). Clean or lightly charged fluids (clogging risk between plates). Non-viscous fluids (high hydraulic resistance with viscous fluid). Leak risk if gaskets worn."},
      {q:"What is the fouling factor and how does it affect heat exchanger design?",a:"The fouling factor (Rf) is additional thermal resistance added during design calculations to account for predictable surface degradation over time. Expressed in m²K/W. Typical values: Seawater: 0.0001; Fresh water: 0.00017; HFO: 0.0002. Design impact: designer calculates exchanger with U including fouling resistances. Presence of fouling factor requires larger exchange surface than theoretical minimum — generally 20-40% additional. Result: new exchanger is 'oversized' vs service conditions, giving operational margin until next cleaning."},
      {q:"How to maintain a PHE and at what frequency?",a:"PHE maintenance: Continuous monitoring: monitor ΔP and temperatures both sides, detect abnormal increase. Chemical CIP cleaning (every 6-12 months): circulate citric acid solution 5%, rinse with clean fresh water, check parameters after. Mechanical cleaning and gasket inspection (every 2-4 years): full disassembly, high-pressure jet cleaning each plate, inspect for corrosion/erosion, replace aged elastomer gaskets, reassemble with prescribed torque. Gasket replacement (periodic or on leak): gaskets compress and harden with time → leaks. Significant cost but essential."},
      {q:"What is an exhaust gas economiser (ECE/EGE) and how is it integrated into the vessel system?",a:"The ECE (Exhaust Gas Economiser/Economizer) is a shell & tube heat exchanger installed in the main engine exhaust gas circuit, between turbocharger and funnel. Exhaust gases (350-400°C) flow outside the tubes. Production or boiler water circulates inside. Produces saturated steam (6-8 bar) or hot water. System integration: steam feeds HFO heaters, steam heating groups, fresh water production (evaporators), ejectors, dryers. Quantified benefits: a 10 MW main engine produces ~1-2 MW recoverable heat. Without ECE: all lost up the funnel. With ECE: saves 150-300 kg/h of HFO for auxiliary boiler."},
      {q:"How to detect a leak between circuits in a heat exchanger?",a:"Leak detection symptoms: oil in fresh water (or vice versa), water in lube oil, HFO contaminated by water, abnormal pressure in one circuit. Detection tests: Pressure test: pressurise one circuit (compressed air 2-3 bar) and observe if other pressurises → leak confirmed. Fluid analysis: sample each fluid and analyse (oil in water → emulsion test, water in oil → centrifugation). Visual inspection after disassembly: on PHE, inspect each plate under light — cracks appear as dark lines. UV test: UV fluorescein added to one circuit → UV detection in other circuit. Shell & tube: hydrostatic tube-by-tube test (selective plugging of defective tubes possible)."},
      {q:"What is the effect of flow rate on heat exchanger efficiency?",a:"Flow rate effect: Too low: Reynolds number (Re = ρ×v×D/μ) too low → laminar regime → low heat transfer coefficient h → poor heat transfer. Risk of deposits and biological growth. Too high: excessive pressure drops → pump energy → cost. Risk of plate and tube erosion. Optimal range: PHE channel velocity: 0.3 to 1.5 m/s. Shell & tube tube velocity: 0.5 to 2 m/s. This range ensures turbulent regime (good transfer) without erosion or excessive pressure drop."},
      {q:"Why is the charge air cooler so important for engine performance?",a:"The charge air cooler cools turbocharger-compressed air before cylinder admission. Performance importance: Hot air is less dense (same volume = less air mass). Cold air is denser (same volume = more air mass). More air = more oxygen = more fuel can be injected = more power. Example: air at 200°C cooled to 45°C increases density ~45% → 45% more fuel can be injected → increased power. A fouled charge air cooler causes: engine power reduction, increased specific fuel consumption, higher exhaust gas temperatures."},
      {q:"How does a keel cooler work and in what contexts is it preferred?",a:"A keel cooler requires no seawater pump. Cupronickel or stainless steel coils are welded to the vessel's external hull, below the waterline. The fluid to be cooled (engine fresh water, hydraulic oil) circulates in the coils and is cooled directly by seawater contact through the metal wall. Advantages: no seawater pump, very reliable, reduced maintenance. Preferred contexts: polar/arctic vessels (very cold seawater → effective cooling), tugs (often alongside → limited ventilation), dredgers (sand-laden water → pump wear), composite/aluminium hull vessels. Disadvantages: less effective in warm tropical water, regular antifouling cleaning required."},
      {q:"What precautions when chemically cleaning a heat exchanger?",a:"CIP precautions: Correct chemical selection: scale → citric acid or dilute hydrochloric acid (5-10%). Biological deposits → alkaline + biocide. Carbonised oil → hot alkaline solution. Material compatibility: never use hydrochloric acid on stainless steel (pitting). Check gasket compatibility (NBR, EPDM). Safety precautions: mandatory PPE (goggles, acid-resistant gloves, apron). Work in ventilated area. Have bicarbonate or lime for neutralisation. Correct sequence: fresh water rinse first, then chemical circulation (duration per concentration and deposits), thorough fresh water rinse (effluent pH must be neutral). Documentation: log product, concentration, duration, results. Some chemicals have MARPOL discharge restrictions."},
      {q:"How to evaluate the overall heat transfer coefficient (U) of an in-service heat exchanger?",a:"U evaluation in service: 1. Record operating parameters: both fluid flows (m³/h), both fluid inlet and outlet temperatures (°C). 2. Calculate exchanged power: Q = m_dot × Cp × ΔT (W). 3. Calculate LMTD. 4. Calculate U = Q / (A × LMTD), where A = exchange surface (known from manufacturer). 5. Compare measured U to manufacturer nominal U. If measured U < 0.7 × nominal U → fouling → cleaning required. This method allows preventive rather than corrective cleaning planning."},
    ],
    es:[
      {q:"¿Qué es la DTLM y por qué se usa para los intercambiadores?",a:"La DTLM (Diferencia de Temperatura Logarítmica Media) es la media logarítmica de las diferencias de temperatura entre los fluidos en ambos extremos. Se usa porque la diferencia varía a lo largo del intercambiador. Fórmula: DTLM = (ΔT1-ΔT2)/ln(ΔT1/ΔT2). Usada en Q = U × A × DTLM. A contracorriente siempre tiene mayor DTLM que en paralelo."},
      {q:"¿Qué materiales se usan para intercambiadores en contacto con agua de mar?",a:"Titanio: resistencia excepcional a la corrosión marina. Estándar para PHE en contacto con agua de mar. Cuproníquel (70/30 o 90/10): aleación cobre-níquel. Acero inoxidable 316L: buena resistencia pero riesgo de picaduras en agua caliente estancada. Latón naval: cajas de distribución. Nunca usar: acero al carbono (corrosión rápida) ni aluminio (ataque por cloruros)."},
      {q:"¿Cómo funciona un PHE y cuáles son sus limitaciones?",a:"Placas corrugadas apiladas con juntas crean canales alternos para los fluidos. Ventajas: coeficiente U muy alto, compacto, fácil de limpiar, superficie ajustable. Limitaciones: presión máxima ~25 bar, temperatura máxima 200°C, fluidos limpios y poco viscosos, riesgo de fuga si las juntas están desgastadas."},
      {q:"¿Qué es el factor de ensuciamiento y cómo afecta al diseño?",a:"Resistencia térmica adicional añadida en el cálculo para considerar la degradación previsible. Valores típicos: agua de mar 0,0001 m²K/W, agua dulce 0,00017, HFO 0,0002. Impacto: requiere 20-40% más de superficie que el mínimo teórico."},
      {q:"¿Cómo mantener un PHE y con qué frecuencia?",a:"Vigilancia continua de ΔP y temperaturas. Limpieza química CIP (6-12 meses): solución ácida cítrica al 5%, enjuague con agua dulce. Limpieza mecánica e inspección de juntas (2-4 años): desmontaje completo, chorro a alta presión, sustitución de juntas. Sustitución de juntas periódica si hay fugas."},
      {q:"¿Qué es un economizador de gases de escape (ECE) y cómo se integra?",a:"Intercambiador de carcasa y tubos en la chimenea. Gases de escape (350-400°C) calientan el agua que circula en los tubos, produciendo vapor (6-8 bar). Integración: alimenta calentadores de HFO, calefacción, evaporadores, eyectores. Ahorra 150-300 kg/h de HFO para la caldera auxiliar."},
      {q:"¿Cómo detectar una fuga entre circuitos en un intercambiador?",a:"Síntomas: aceite en agua dulce, agua en aceite lubricante, HFO contaminado. Tests: presurización de un circuito con aire comprimido, análisis de fluidos, inspección visual bajo luz, test UV con fluorescéina."},
      {q:"¿Cuál es el efecto del caudal en la eficiencia de un intercambiador?",a:"Caudal muy bajo → régimen laminar → mal intercambio + riesgo de depósitos. Caudal muy alto → pérdidas de carga excesivas + erosión. Rango óptimo: 0,3-1,5 m/s en canales PHE, 0,5-2 m/s en tubos."},
      {q:"¿Por qué el refrigerador de aire de carga es tan importante para el rendimiento del motor?",a:"El aire más frío es más denso → más oxígeno → más combustible inyectable → más potencia. Ejemplo: aire a 200°C enfriado a 45°C aumenta densidad ~45% → más potencia. Un refrigerador encrasado provoca reducción de potencia y mayor consumo específico."},
      {q:"¿Cómo funciona un keel cooler y en qué contextos se prefiere?",a:"Serpentines soldados en el casco externo. El fluido circula en los serpentines y se enfría por contacto con el agua del mar. Ventajas: sin bomba de agua de mar, muy fiable. Preferido en zonas polares, remolcadores, dragas, cascos de composite. Inconveniente: menos eficaz en agua caliente tropical."},
      {q:"¿Qué precauciones tomar al limpiar químicamente un intercambiador?",a:"Elección del producto correcto. Compatibilidad con materiales (no usar HCl en acero inox). EPI obligatorios. Secuencia: enjuague previo, circulación del producto, enjuague final (pH neutro). Documentar todo. Respetar las restricciones MARPOL de vertido."},
      {q:"¿Cómo evaluar el coeficiente global de intercambio (U) en servicio?",a:"1. Registrar parámetros. 2. Calcular potencia intercambiada: Q = m_dot × Cp × ΔT. 3. Calcular DTLM. 4. U = Q / (A × DTLM). 5. Comparar con U nominal del fabricante. Si U medido < 0,7 × U nominal → limpieza necesaria."},
    ],
    pt:[
      {q:"O que é a DTML e por que se usa para permutadores?",a:"A DTML (Diferença de Temperatura Logarítmica Média) é a média logarítmica das diferenças de temperatura entre os fluidos nas duas extremidades. Fórmula: DTML = (ΔT1-ΔT2)/ln(ΔT1/ΔT2). Usada em Q = U × A × DTML. Em contracorrente a DTML é sempre superior à de co-corrente."},
      {q:"Que materiais são usados para permutadores em contacto com água do mar?",a:"Titânio: resistência excecional à corrosão marinha. Padrão para PHE em contacto com água do mar. Cuproníquel (70/30 ou 90/10): liga cobre-níquel. Aço inoxidável 316L: boa resistência mas risco de picadas em água quente estagnada. Latão naval: caixas de distribuição. Nunca usar: aço ao carbono (corrosão rápida) nem alumínio (ataque por cloretos)."},
      {q:"Como funciona um PHE e quais são as suas limitações?",a:"Placas onduladas empilhadas com juntas criam canais alternados para os fluidos. Vantagens: coeficiente U muito alto, compacto, fácil de limpar, superfície ajustável. Limitações: pressão máxima ~25 bar, temperatura máxima 200°C, fluidos limpos e pouco viscosos, risco de fuga se as juntas estiverem desgastadas."},
      {q:"O que é o fator de incrustação e como afeta o projeto?",a:"Resistência térmica adicional adicionada no cálculo para considerar a degradação previsível. Valores típicos: água do mar 0,0001 m²K/W, água doce 0,00017, HFO 0,0002. Impacto: requer 20-40% mais superfície do que o mínimo teórico."},
      {q:"Como manter um PHE e com que frequência?",a:"Monitorização contínua de ΔP e temperaturas. Limpeza química CIP (6-12 meses): solução de ácido cítrico 5%, enxaguamento com água doce. Limpeza mecânica e inspeção de juntas (2-4 anos): desmontagem completa, jacto de alta pressão, substituição de juntas. Substituição periódica de juntas se houver fugas."},
      {q:"O que é um economizador de gases de escape (ECE) e como se integra?",a:"Permutador de casco e tubos na chaminé. Gases de escape (350-400°C) aquecem a água que circula nos tubos, produzindo vapor (6-8 bar). Integração: alimenta aquecedores de HFO, aquecimento, evaporadores, ejetores. Poupa 150-300 kg/h de HFO para a caldeira auxiliar."},
      {q:"Como detetar uma fuga entre circuitos num permutador?",a:"Sintomas: óleo em água doce, água em óleo lubrificante, HFO contaminado. Testes: pressurização de um circuito com ar comprimido, análise de fluidos, inspeção visual sob luz, teste UV com fluoresceína."},
      {q:"Qual é o efeito do caudal na eficiência de um permutador?",a:"Caudal muito baixo → regime laminar → má troca + risco de depósitos. Caudal muito alto → perdas de carga excessivas + erosão. Gama ótima: 0,3-1,5 m/s nos canais PHE, 0,5-2 m/s nos tubos."},
      {q:"Por que o arrefecedor de ar de carga é tão importante para o desempenho do motor?",a:"O ar mais frio é mais denso → mais oxigénio → mais combustível injetável → mais potência. Exemplo: ar a 200°C arrefecido a 45°C aumenta densidade ~45% → mais potência. Um arrefecedor incrustado provoca redução de potência e maior consumo específico."},
      {q:"Como funciona um keel cooler e em que contextos é preferido?",a:"Serpentinas soldadas no casco externo. O fluido circula nas serpentinas e é arrefecido por contacto com a água do mar. Vantagens: sem bomba de água do mar, muito fiável. Preferido em zonas polares, rebocadores, dragas, cascos de compósito. Desvantagem: menos eficaz em água quente tropical."},
      {q:"Que precauções tomar na limpeza química de um permutador?",a:"Escolha do produto correto. Compatibilidade com materiais (não usar HCl em aço inox). EPI obrigatórios. Sequência: enxaguamento prévio, circulação do produto, enxaguamento final (pH neutro). Documentar tudo. Respeitar restrições MARPOL de descarga."},
      {q:"Como avaliar o coeficiente global de troca (U) em serviço?",a:"1. Registar parâmetros. 2. Calcular potência trocada: Q = m_dot × Cp × ΔT. 3. Calcular DTML. 4. U = Q / (A × DTML). 5. Comparar com U nominal do fabricante. Se U medido < 0,7 × U nominal → limpeza necessária."},
    ],
  };
  return b[lang]||b.fr;
}

function getQuiz(lang: string) {
  const q: any = {
    fr:[
      {q:"Quel type d'échangeur de chaleur est le plus utilisé à bord pour le refroidissement standard (eau douce, huile) ?",opts:["Échangeur tubulaire (shell & tube)","Échangeur à plaques (PHE)","Keel cooler","Refroidisseur à air"],correct:1,exp:"L'échangeur à plaques (PHE) est le standard moderne à bord pour le refroidissement de l'eau douce moteur, l'huile de lubrification et le HFO. Il est compact, efficace et facile à nettoyer par démontage des plaques."},
      {q:"Quel est le rôle d'un économiseur (ECE) sur un navire à moteur diesel ?",opts:["Refroidir le combustible avant injection","Récupérer la chaleur des gaz d'échappement pour produire vapeur ou eau chaude","Filtrer les impuretés du HFO","Compenser les vibrations du moteur"],correct:1,exp:"L'économiseur (Exhaust Gas Economiser) récupère la chaleur des gaz d'échappement (350-400°C) pour produire de la vapeur ou de l'eau chaude. Cette énergie gratuite est utilisée pour chauffer le HFO, l'eau sanitaire et d'autres circuits, améliorant le rendement global du navire de 5-10%."},
      {q:"Quel est le premier signe d'encrassement d'un échangeur de chaleur détectable sans démontage ?",opts:["L'échangeur devient bruyant","La température de sortie du fluide à refroidir augmente progressivement","La pression d'entrée chute brutalement","La couleur du fluide change"],correct:1,exp:"L'encrassement crée une résistance thermique qui réduit le transfert de chaleur. La première manifestation est une augmentation progressive de la température de sortie du fluide à refroidir (à débit constant). La perte de charge (ΔP) augmente aussi mais cela peut être plus difficile à détecter sans manomètre différentiel."},
      {q:"Pourquoi un échangeur à contre-courant est-il plus efficace qu'un échangeur à co-courant ?",opts:["Il est plus compact","Sa DTLM est plus élevée pour les mêmes conditions d'entrée/sortie","Il coûte moins cher à fabriquer","Il ne nécessite pas de maintenance"],correct:1,exp:"En contre-courant, la différence de température entre les deux fluides est mieux répartie sur toute la longueur de l'échangeur (DTLM plus élevée). Cela permet un meilleur transfert de chaleur pour la même surface d'échange. En co-courant, la différence de température s'annule progressivement et le fluide froid ne peut jamais dépasser la température de sortie du fluide chaud."},
      {q:"À quelle température doit être maintenu le HFO à l'entrée du moteur principal pour une injection correcte ?",opts:["40-50°C","80-90°C","120-150°C (viscosité 10-20 cSt)","200-250°C"],correct:2,exp:"Le HFO doit être chauffé à 120-150°C avant l'injection pour que sa viscosité soit ramenée à 10-20 cSt (centistokes). C'est la condition nécessaire pour une pulvérisation correcte dans les cylindres. La viscosité élevée du HFO froid (jusqu'à 700 cSt) empêcherait une atomisation correcte et provoquerait une mauvaise combustion."},
    ],
    en:[
      {q:"Which type of heat exchanger is most used on board for standard cooling (fresh water, oil)?",opts:["Shell & tube exchanger","Plate heat exchanger (PHE)","Keel cooler","Air blast cooler"],correct:1,exp:"The plate heat exchanger (PHE) is the modern on-board standard for cooling engine fresh water, lube oil and HFO. It is compact, efficient and easy to clean by disassembling the plates."},
      {q:"What is the role of an economiser (ECE) on a diesel-powered vessel?",opts:["Cool fuel before injection","Recover exhaust gas heat to produce steam or hot water","Filter HFO impurities","Compensate engine vibration"],correct:1,exp:"The Exhaust Gas Economiser recovers exhaust gas heat (350-400°C) to produce steam or hot water. This free energy is used to heat HFO, domestic water and other circuits, improving overall vessel efficiency by 5-10%."},
      {q:"What is the first sign of heat exchanger fouling detectable without dismantling?",opts:["The exchanger becomes noisy","The cooled fluid outlet temperature progressively rises","Inlet pressure drops suddenly","Fluid colour changes"],correct:1,exp:"Fouling creates thermal resistance reducing heat transfer. The first manifestation is a progressive rise in cooled fluid outlet temperature (at constant flow). Pressure drop (ΔP) also increases but may be harder to detect without differential gauges."},
      {q:"Why is a counter-current exchanger more efficient than a co-current one?",opts:["It is more compact","Its LMTD is higher for the same inlet/outlet conditions","It costs less to manufacture","It requires no maintenance"],correct:1,exp:"In counter-current flow, the temperature difference between fluids is better distributed along the exchanger (higher LMTD). This allows better heat transfer for the same exchange surface. In co-current flow, temperature difference progressively diminishes and cold fluid can never exceed hot fluid outlet temperature."},
      {q:"At what temperature must HFO be maintained at the main engine inlet for correct injection?",opts:["40-50°C","80-90°C","120-150°C (viscosity 10-20 cSt)","200-250°C"],correct:2,exp:"HFO must be heated to 120-150°C before injection to reduce viscosity to 10-20 cSt. This is the condition for correct atomisation in cylinders. Cold HFO's high viscosity (up to 700 cSt) would prevent correct atomisation and cause poor combustion."},
    ],
    es:[
      {q:"¿Qué tipo de intercambiador se usa más a bordo para la refrigeración estándar?",opts:["Intercambiador de carcasa y tubos","Intercambiador de placas (PHE)","Keel cooler","Refrigerador de aire"],correct:1,exp:"El intercambiador de placas (PHE) es el estándar moderno a bordo para la refrigeración del agua dulce del motor, el aceite lubricante y el HFO. Es compacto, eficiente y fácil de limpiar."},
      {q:"¿Cuál es el papel de un economizador (ECE) en un buque de motor diésel?",opts:["Enfriar el combustible antes de la inyección","Recuperar el calor de los gases de escape para producir vapor o agua caliente","Filtrar las impurezas del HFO","Compensar las vibraciones del motor"],correct:1,exp:"El economizador recupera el calor de los gases de escape (350-400°C) para producir vapor o agua caliente. Esta energía gratuita mejora el rendimiento global del buque un 5-10%."},
      {q:"¿Cuál es el primer signo de ensuciamiento de un intercambiador detectable sin desmontaje?",opts:["El intercambiador se vuelve ruidoso","La temperatura de salida del fluido a enfriar sube progresivamente","La presión de entrada cae bruscamente","El color del fluido cambia"],correct:1,exp:"El ensuciamiento crea resistencia térmica que reduce la transferencia de calor. La primera manifestación es una subida progresiva de la temperatura de salida del fluido a enfriar a caudal constante."},
      {q:"¿Por qué un intercambiador a contracorriente es más eficiente que uno en paralelo?",opts:["Es más compacto","Su DTLM es mayor para las mismas condiciones de entrada/salida","Cuesta menos fabricarlo","No requiere mantenimiento"],correct:1,exp:"En contracorriente, la diferencia de temperatura está mejor repartida (mayor DTLM), lo que permite mejor transferencia de calor para la misma superficie."},
      {q:"¿A qué temperatura debe mantenerse el HFO en la entrada del motor principal para una inyección correcta?",opts:["40-50°C","80-90°C","120-150°C (viscosidad 10-20 cSt)","200-250°C"],correct:2,exp:"El HFO debe calentarse a 120-150°C para que su viscosidad sea de 10-20 cSt, condición necesaria para una pulverización correcta en los cilindros."},
    ],
    pt:[
      {q:"Que tipo de permutador é mais usado a bordo para o arrefecimento padrão?",opts:["Permutador de casco e tubos","Permutador de placas (PHE)","Keel cooler","Arrefecedor a ar"],correct:1,exp:"O permutador de placas (PHE) é o padrão moderno a bordo para arrefecimento de água doce do motor, óleo lubrificante e HFO. É compacto, eficiente e fácil de limpar."},
      {q:"Qual é o papel de um economizador (ECE) num navio a motor diesel?",opts:["Arrefecer o combustível antes da injeção","Recuperar o calor dos gases de escape para produzir vapor ou água quente","Filtrar impurezas do HFO","Compensar as vibrações do motor"],correct:1,exp:"O economizador recupera o calor dos gases de escape (350-400°C) para produzir vapor ou água quente. Esta energia gratuita melhora o rendimento global do navio em 5-10%."},
      {q:"Qual é o primeiro sinal de incrustação de um permutador detetável sem desmontagem?",opts:["O permutador fica ruidoso","A temperatura de saída do fluido a arrefecer sobe progressivamente","A pressão de entrada cai bruscamente","A cor do fluido muda"],correct:1,exp:"A incrustação cria resistência térmica que reduz a transferência de calor. A primeira manifestação é uma subida progressiva da temperatura de saída do fluido a arrefecer a caudal constante."},
      {q:"Por que um permutador em contracorrente é mais eficiente do que em co-corrente?",opts:["É mais compacto","A sua DTML é maior para as mesmas condições de entrada/saída","Custa menos fabricar","Não requer manutenção"],correct:1,exp:"Em contracorrente, a diferença de temperatura está melhor distribuída (maior DTML), permitindo melhor transferência de calor para a mesma superfície."},
      {q:"A que temperatura deve ser mantido o HFO na entrada do motor principal para injeção correta?",opts:["40-50°C","80-90°C","120-150°C (viscosidade 10-20 cSt)","200-250°C"],correct:2,exp:"O HFO deve ser aquecido a 120-150°C para que a viscosidade seja de 10-20 cSt, condição necessária para uma pulverização correta nos cilindros."},
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
        <div key={i} style={{marginBottom:8,borderRadius:12,background:"rgba(10,22,40,0.8)",border:"1px solid rgba(249,115,22,0.15)",overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 14px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10}}>
            <span style={{fontSize:12,color:"rgba(240,244,255,0.8)",fontFamily:"Courier New",lineHeight:1.5}}><span style={{color:"#f97316",fontWeight:700,marginRight:6}}>Q{i+1}.</span>{item.q}</span>
            <span style={{color:"#f97316",fontSize:14,flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i&&(
            <div style={{padding:"0 14px 12px"}}>
              <button onClick={()=>setShowAns(p=>({...p,[i]:!p[i]}))} style={{padding:"6px 12px",borderRadius:8,fontSize:10,cursor:"pointer",background:showAns[i]?"rgba(249,115,22,0.13)":"rgba(255,255,255,0.05)",border:`1px solid ${showAns[i]?"#f97316":"rgba(255,255,255,0.12)"}`,color:showAns[i]?"#f97316":"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{showAns[i]?l.hide:l.show}</button>
              {showAns[i]&&<div style={{marginTop:8,padding:10,borderRadius:8,background:"rgba(13,31,60,0.8)",borderLeft:"3px solid #f97316",fontSize:12,color:"rgba(240,244,255,0.8)",lineHeight:1.7,fontFamily:"Courier New"}}>{item.a}</div>}
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
  const optColors=["#f97316","#4da6ff","#6dbf8a","#e8b94f"];

  if(done) return (
    <div style={{padding:"24px 14px"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:42,marginBottom:8}}>🌡️</div>
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
      <button onClick={()=>onComplete(xp)} style={{width:"100%",padding:"15px 0",border:"none",borderRadius:14,background:"linear-gradient(135deg,#f97316,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:"#060e1a",cursor:"pointer"}}>🌡️ {l.finish}</button>
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
        <div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#f97316,#c9922a)",width:`${(cur/quiz.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:"#e0e8ff",lineHeight:1.6,fontFamily:"Courier New",marginBottom:16,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:"1px solid rgba(249,115,22,0.15)"}}>{q.q}</div>
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
        ?<button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?"linear-gradient(135deg,#f97316,#c9922a)":"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?"#060e1a":"rgba(240,244,255,0.25)",cursor:selected!==null?"pointer":"default",letterSpacing:1}}>{l.submit}</button>
        :<button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:"linear-gradient(135deg,#f97316,#c9922a)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#060e1a",cursor:"pointer",letterSpacing:1}}>{cur+1>=quiz.length?l.finish:l.next}</button>
      }
    </div>
  );
}

export default function LessonE2_L6({ lang="fr", onBack, onComplete }:{ lang?:string; onBack:()=>void; onComplete?:(xp?:number)=>void; }) {
  const t=T[lang]||T.fr;
  const [tab,setTab]=useState(0);
  const progress=[25,50,75,90][tab]||25;
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d1f3c,#060e1a)",color:"#f0f4ff",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(249,115,22,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px",height:52}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"6px 12px",color:"#f0f4ff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>◀</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"#f97316",marginBottom:2}}>{t.moduleLabel} · L6</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0f4ff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.lessonTitle}</div>
          </div>
          <div style={{fontSize:11,color:"#e8b94f",fontFamily:"Courier New",flexShrink:0}}>{progress}%</div>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)"}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,#f97316,#c9922a)",width:`${progress}%`,transition:"width 0.4s"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:"rgba(249,115,22,0.1)",border:"1px solid rgba(249,115,22,0.3)"}}>
          <span style={{fontSize:12}}>🌡️</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"#f97316",letterSpacing:1}}>MACHINE · AUXILIAIRES · PREMIUM</span>
        </div>
      </div>
      <div style={{display:"flex",padding:"10px 14px 0",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
        {t.tabs.map((label:string,i:number)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"8px 12px",borderRadius:10,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",background:tab===i?"rgba(249,115,22,0.13)":"rgba(255,255,255,0.04)",border:`1px solid ${tab===i?"#f97316":"rgba(255,255,255,0.1)"}`,color:tab===i?"#f97316":"rgba(240,244,255,0.45)",fontFamily:"Courier New"}}>{label}</button>
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
